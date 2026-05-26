// Lesson 48 — WebSocket & Streaming (Real-time Web)
//
// File này CHỈ dùng standard library (net/http, bufio, sync, time, context...) —
// KHÔNG import lib ngoài. Mục tiêu: minh hoạ 3 cơ chế real-time mà stdlib làm được
// trực tiếp:
//
//   1. Server-Sent Events (SSE)  — text/event-stream + http.Flusher (Bài 1).
//   2. Long polling              — hold request đến khi có event hoặc timeout (Bài 4).
//   3. Hub broadcast pattern     — map[client]chan + register/unregister/broadcast,
//                                  ở đây dùng SSE làm transport để chạy được bằng stdlib.
//
// WebSocket (Bài 2, 3, 5, 6) cần frame protocol RFC 6455 — phức tạp để viết tay,
// production dùng lib `coder/websocket` (xem block comment "WEBSOCKET REFERENCE"
// ở cuối file). Vì user yêu cầu chỉ stdlib, phần WebSocket để dưới dạng reference
// trong comment, KHÔNG biên dịch vào binary này.
//
// Chạy:   go run solutions.go      → server lắng nghe ở :8080
// Test:   curl -N localhost:8080/sse/time
//         curl localhost:8080/longpoll/poll?since=0   (terminal 1)
//         curl -X POST localhost:8080/longpoll/post -d "hello"  (terminal 2)
//         mở http://localhost:8080/ trong browser để xem chat broadcast SSE.

package main

import (
	"bufio"
	"context"
	"fmt"
	"log"
	"net"
	"net/http"
	"strconv"
	"strings"
	"sync"
	"time"
)

// ============================================================================
// BÀI 1 — SSE: phát timestamp mỗi 1 giây
// ============================================================================
//
// SSE = một HTTP response KHÔNG bao giờ đóng. Server liên tục ghi
// "data: <payload>\n\n" rồi Flush() để đẩy byte xuống client ngay lập tức.
// Content-Type bắt buộc là text/event-stream.

func sseTimeHandler(w http.ResponseWriter, r *http.Request) {
	// http.ResponseWriter mặc định BUFFER output. Để stream được, ta cần
	// ép kiểu sang http.Flusher và gọi Flush() sau mỗi event — nếu không,
	// byte nằm trong buffer net/http, client không nhận đến khi buffer đầy.
	flusher, ok := w.(http.Flusher)
	if !ok {
		http.Error(w, "streaming unsupported", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "text/event-stream")
	w.Header().Set("Cache-Control", "no-cache")
	w.Header().Set("Connection", "keep-alive")
	w.Header().Set("X-Accel-Buffering", "no") // báo nginx đừng buffer

	ticker := time.NewTicker(1 * time.Second)
	defer ticker.Stop()

	for {
		select {
		case t := <-ticker.C:
			// Mỗi event = "data: <nội dung>\n" + một dòng trống "\n".
			fmt.Fprintf(w, "data: %s\n\n", t.Format(time.RFC3339))
			flusher.Flush() // BẮT BUỘC
		case <-r.Context().Done():
			// Client đóng tab / huỷ request → thoát, giải phóng goroutine.
			return
		}
	}
}

// writeSSE viết một event SSE đầy đủ (id / event / data nhiều dòng) ra w rồi Flush.
// Format đầy đủ: "id: N\n", "event: type\n", mỗi dòng payload "data: ...\n",
// kết thúc bằng một dòng trống "\n".
func writeSSE(w http.ResponseWriter, flusher http.Flusher, id, evType, data string) {
	if id != "" {
		fmt.Fprintf(w, "id: %s\n", id)
	}
	if evType != "" {
		fmt.Fprintf(w, "event: %s\n", evType)
	}
	// Nếu data có nhiều dòng, MỖI dòng phải prefix "data: ".
	for _, line := range strings.Split(data, "\n") {
		fmt.Fprintf(w, "data: %s\n", line)
	}
	fmt.Fprint(w, "\n") // dòng trống đóng event
	flusher.Flush()
}

// ============================================================================
// BÀI 4 — Long polling: hold request đến khi có message mới hoặc timeout
// ============================================================================
//
// Cơ chế "đảo chiều" data flow đơn giản nhất: client GET /poll?since=N,
// server giữ kết nối (block goroutine) đến khi có message ID > N hoặc 20s timeout.

type messageStore struct {
	mu     sync.RWMutex
	msgs   []string      // index 0-based; msgs[i] có "ID" logic = i+1
	notify chan struct{} // đóng channel này để WAKE mọi listener cùng lúc
}

func newMessageStore() *messageStore {
	return &messageStore{notify: make(chan struct{})}
}

// post thêm message mới và wake tất cả goroutine đang long-poll.
func (s *messageStore) post(msg string) {
	s.mu.Lock()
	s.msgs = append(s.msgs, msg)
	// Đóng channel hiện tại = broadcast tới mọi receiver đang <-notify.
	// Sau đó tạo channel mới cho lứa listener tiếp theo.
	close(s.notify)
	s.notify = make(chan struct{})
	s.mu.Unlock()
}

// poll trả về các message có index >= since. Nếu chưa có, block đến 20s
// hoặc đến khi post() wake lên, hoặc đến khi client huỷ (ctx.Done()).
func (s *messageStore) poll(ctx context.Context, since int) (out []string, newSince int) {
	// Fast path: snapshot xem đã có message mới sẵn chưa.
	s.mu.RLock()
	if len(s.msgs) > since {
		out = append([]string(nil), s.msgs[since:]...)
		newSince = len(s.msgs)
		s.mu.RUnlock()
		return out, newSince
	}
	// Chưa có → lấy reference channel notify ra biến local rồi NHẢ lock.
	// QUAN TRỌNG: KHÔNG giữ RLock khi block, nếu không sẽ deadlock với post().
	ch := s.notify
	s.mu.RUnlock()

	select {
	case <-ch: // có người post → channel bị close
		s.mu.RLock()
		out = append([]string(nil), s.msgs[since:]...)
		newSince = len(s.msgs)
		s.mu.RUnlock()
		return out, newSince
	case <-time.After(20 * time.Second):
		return nil, since // timeout → trả rỗng, giữ nguyên since
	case <-ctx.Done():
		return nil, since // client đóng tab
	}
}

func makeLongPollHandlers(store *messageStore) (poll, post http.HandlerFunc) {
	poll = func(w http.ResponseWriter, r *http.Request) {
		since, _ := strconv.Atoi(r.URL.Query().Get("since"))
		msgs, newSince := store.poll(r.Context(), since)
		// Trả JSON thủ công (không cần encoding/json cho ví dụ tối giản).
		w.Header().Set("Content-Type", "application/json")
		var b strings.Builder
		b.WriteString(`{"messages":[`)
		for i, m := range msgs {
			if i > 0 {
				b.WriteString(",")
			}
			b.WriteString(strconv.Quote(m))
		}
		fmt.Fprintf(&b, `],"since":%d}`, newSince)
		fmt.Fprint(w, b.String())
	}

	post = func(w http.ResponseWriter, r *http.Request) {
		buf := make([]byte, 1024)
		n, _ := r.Body.Read(buf)
		msg := strings.TrimSpace(string(buf[:n]))
		if msg == "" {
			msg = r.URL.Query().Get("msg")
		}
		store.post(msg)
		fmt.Fprintf(w, "posted: %q\n", msg)
	}
	return poll, post
}

// ============================================================================
// BÀI 3 — Hub broadcast pattern (hub-and-spoke)
// ============================================================================
//
// Bài toán: nhiều client, 1 client gửi message → broadcast cho tất cả.
// Sai lầm: dùng map[conn] rồi iterate gọi Write() trực tiếp — 1 client chậm
// block cả vòng iterate.
//
// Đúng: 1 goroutine "Hub" SỞ HỮU map clients. Các client chỉ giao tiếp với hub
// qua channel (register / unregister / broadcast). Chỉ Hub đụng vào map →
// KHÔNG cần mutex. Đây là idiom Go "share memory by communicating".
//
// Ở đây mỗi "client" là một SSE connection (để chạy được bằng stdlib).
// Với WebSocket, cấu trúc Hub Y HỆT — chỉ khác c.send được writeLoop ghi ra
// websocket.Conn thay vì SSE writer (xem WEBSOCKET REFERENCE cuối file).

type sseClient struct {
	send chan string // buffered — hub đẩy message vào đây
	id   int
}

type Hub struct {
	clients    map[*sseClient]bool
	register   chan *sseClient
	unregister chan *sseClient
	broadcast  chan string
	nextID     int
}

func newHub() *Hub {
	return &Hub{
		clients:    make(map[*sseClient]bool),
		register:   make(chan *sseClient),
		unregister: make(chan *sseClient),
		broadcast:  make(chan string),
	}
}

// Run là vòng lặp duy nhất sở hữu state. Chạy trong 1 goroutine riêng.
func (h *Hub) Run() {
	for {
		select {
		case c := <-h.register:
			h.clients[c] = true
			log.Printf("[hub] client #%d joined (tổng: %d)", c.id, len(h.clients))

		case c := <-h.unregister:
			if _, ok := h.clients[c]; ok {
				delete(h.clients, c)
				close(c.send) // báo writeLoop của client đó dừng
				log.Printf("[hub] client #%d left (còn: %d)", c.id, len(h.clients))
			}

		case msg := <-h.broadcast:
			for c := range h.clients {
				select {
				case c.send <- msg:
					// gửi thành công
				default:
					// Buffer đầy → client quá chậm → DROP để không block hub.
					// "Một client chậm không được phép làm chậm toàn hệ thống."
					close(c.send)
					delete(h.clients, c)
					log.Printf("[hub] dropped client #%d (chậm)", c.id)
				}
			}
		}
	}
}

// hubSSEHandler: mỗi client connect tới đây sẽ giữ một SSE stream.
// readLoop của SSE = không có (SSE 1 chiều); client gửi message qua POST /chat/send.
func (h *Hub) sseHandler(w http.ResponseWriter, r *http.Request) {
	flusher, ok := w.(http.Flusher)
	if !ok {
		http.Error(w, "streaming unsupported", http.StatusInternalServerError)
		return
	}
	w.Header().Set("Content-Type", "text/event-stream")
	w.Header().Set("Cache-Control", "no-cache")
	w.Header().Set("Connection", "keep-alive")
	w.Header().Set("X-Accel-Buffering", "no")

	h.nextID++ // chỉ Run() nên đụng state, nhưng nextID gán trước register cho đơn giản demo
	c := &sseClient{send: make(chan string, 16), id: h.nextID}
	h.register <- c
	defer func() { h.unregister <- c }()

	// "writeLoop": đọc từ c.send, ghi ra SSE, Flush. Kèm heartbeat 15s.
	heartbeat := time.NewTicker(15 * time.Second)
	defer heartbeat.Stop()

	fmt.Fprintf(w, "data: 🟢 bạn là client #%d\n\n", c.id)
	flusher.Flush()

	for {
		select {
		case msg, alive := <-c.send:
			if !alive {
				return // hub đã close(c.send) → client bị unregister/drop
			}
			writeSSE(w, flusher, "", "", msg)
		case <-heartbeat.C:
			fmt.Fprint(w, ":keepalive\n\n") // comment line, browser bỏ qua
			flusher.Flush()
		case <-r.Context().Done():
			return // client đóng tab
		}
	}
}

func (h *Hub) sendHandler(w http.ResponseWriter, r *http.Request) {
	buf := make([]byte, 2048)
	n, _ := r.Body.Read(buf)
	msg := strings.TrimSpace(string(buf[:n]))
	if msg == "" {
		msg = r.URL.Query().Get("msg")
	}
	if msg != "" {
		h.broadcast <- msg // hub phát cho mọi client
	}
	w.WriteHeader(http.StatusNoContent)
}

// ============================================================================
// BÀI 5 (minh hoạ stdlib) — Hijack connection để kiểm tra handshake thủ công
// ============================================================================
//
// http.Hijacker cho phép "chiếm" raw TCP conn khỏi net/http server. Đây CHÍNH
// là cơ chế mà lib WebSocket dùng để rời bỏ HTTP sau status 101. Dưới đây minh
// hoạ đọc handshake header bằng bufio (không hoàn thiện thành WebSocket thật,
// chỉ cho thấy điểm "thoát khỏi HTTP" trông như thế nào).

func handshakeInspectHandler(w http.ResponseWriter, r *http.Request) {
	// Kiểm tra các header upgrade WebSocket.
	if !strings.EqualFold(r.Header.Get("Upgrade"), "websocket") {
		fmt.Fprintf(w, "Không phải WebSocket upgrade. Headers cần:\n"+
			"  Upgrade: websocket\n  Connection: Upgrade\n"+
			"  Sec-WebSocket-Key: <base64 16 byte>\n  Sec-WebSocket-Version: 13\n")
		return
	}

	hj, ok := w.(http.Hijacker)
	if !ok {
		http.Error(w, "hijack unsupported", http.StatusInternalServerError)
		return
	}
	conn, brw, err := hj.Hijack()
	if err != nil {
		return
	}
	defer conn.Close()

	// Sau khi Hijack, ta tự ghi raw bytes — net/http không quản nữa.
	// Production: tính Sec-WebSocket-Accept = base64(SHA1(key + GUID)) rồi
	// chuyển sang frame protocol. Ở đây chỉ trả 101 rồi đóng để minh hoạ.
	_ = brw // bufio.ReadWriter — đọc/ghi raw từ đây
	demonstrateRaw101(conn)
}

// demonstrateRaw101 ghi raw response 101 (KHÔNG đầy đủ — thiếu Sec-WebSocket-Accept
// thật, nên client browser sẽ từ chối; chỉ minh hoạ "thoát HTTP").
func demonstrateRaw101(conn net.Conn) {
	bw := bufio.NewWriter(conn)
	fmt.Fprint(bw, "HTTP/1.1 101 Switching Protocols\r\n")
	fmt.Fprint(bw, "Upgrade: websocket\r\n")
	fmt.Fprint(bw, "Connection: Upgrade\r\n")
	fmt.Fprint(bw, "\r\n")
	bw.Flush()
	// Từ đây trở đi sẽ là WebSocket frames — cần parse opcode/mask/payload.
}

// ============================================================================
// main — đăng ký route, mở :8080
// ============================================================================

func main() {
	mux := http.NewServeMux()

	// Bài 1 — SSE timestamp
	mux.HandleFunc("/sse/time", sseTimeHandler)

	// Bài 4 — Long polling
	store := newMessageStore()
	poll, post := makeLongPollHandlers(store)
	mux.HandleFunc("/longpoll/poll", poll)
	mux.HandleFunc("/longpoll/post", post)

	// Bài 3 — Hub broadcast (SSE transport)
	hub := newHub()
	go hub.Run()
	mux.HandleFunc("/chat/stream", hub.sseHandler)
	mux.HandleFunc("/chat/send", hub.sendHandler)

	// Minh hoạ handshake / hijack
	mux.HandleFunc("/ws/handshake", handshakeInspectHandler)

	// Trang chat tối giản để test broadcast bằng browser.
	mux.HandleFunc("/", indexPage)

	log.Println("listening on http://localhost:8080")
	log.Println("  GET  /sse/time            — SSE timestamp mỗi 1s")
	log.Println("  GET  /longpoll/poll?since=0  — long poll")
	log.Println("  POST /longpoll/post (body)   — post message")
	log.Println("  GET  /chat/stream         — hub broadcast SSE stream")
	log.Println("  POST /chat/send?msg=...   — broadcast message")
	log.Fatal(http.ListenAndServe(":8080", mux))
}

func indexPage(w http.ResponseWriter, r *http.Request) {
	if r.URL.Path != "/" {
		http.NotFound(w, r)
		return
	}
	w.Header().Set("Content-Type", "text/html; charset=utf-8")
	fmt.Fprint(w, `<!doctype html><meta charset=utf-8>
<title>L48 Chat broadcast demo</title>
<h2>Hub broadcast (SSE) — mở nhiều tab để thử</h2>
<input id=msg placeholder="gõ message..." style="width:300px">
<button onclick="send()">Gửi</button>
<pre id=log style="background:#111;color:#0f0;padding:10px;height:300px;overflow:auto"></pre>
<script>
const log = document.getElementById('log');
const es = new EventSource('/chat/stream');
es.onmessage = e => { log.textContent += e.data + "\n"; log.scrollTop = log.scrollHeight; };
es.onerror = () => { log.textContent += "[mất kết nối, browser tự reconnect]\n"; };
function send() {
  const m = document.getElementById('msg');
  fetch('/chat/send?msg=' + encodeURIComponent(m.value), {method:'POST'});
  m.value = '';
}
document.getElementById('msg').addEventListener('keydown', e => { if (e.key==='Enter') send(); });
</script>`)
}

/*
============================================================================
WEBSOCKET REFERENCE — cần lib ngoài `github.com/coder/websocket` (KHÔNG stdlib)
============================================================================

Stdlib net/http KHÔNG có WebSocket. Frame protocol RFC 6455 (mask 4 byte XOR,
opcode, payload length 7/16/64-bit, ping/pong) phức tạp để viết tay an toàn.
Production dùng lib. Dưới đây là code reference KHÔNG biên dịch vào file này.

----- Bài 2: Echo server (đóng sau 5 message) -----

	import "github.com/coder/websocket"

	func wsEchoHandler(w http.ResponseWriter, r *http.Request) {
		c, err := websocket.Accept(w, r, &websocket.AcceptOptions{
			InsecureSkipVerify: true, // dev only
		})
		if err != nil { return }
		defer c.Close(websocket.StatusInternalError, "")

		ctx := r.Context()
		for i := 0; i < 5; i++ {
			_, data, err := c.Read(ctx)
			if err != nil { return }
			reply := append([]byte("echo: "), data...)
			if err := c.Write(ctx, websocket.MessageText, reply); err != nil { return }
		}
		c.Close(websocket.StatusNormalClosure, "limit reached")
	}

----- Bài 3: Chat hub với WebSocket (cấu trúc Hub Y HỆT phần SSE ở trên) -----

	type Client struct {
		conn *websocket.Conn
		send chan []byte
		hub  *Hub
	}

	func (c *Client) readLoop(ctx context.Context) {
		defer func() { c.hub.unregister <- c }()
		for {
			_, data, err := c.conn.Read(ctx)
			if err != nil { return }
			c.hub.broadcast <- data
		}
	}

	func (c *Client) writeLoop(ctx context.Context) {
		ticker := time.NewTicker(30 * time.Second)
		defer ticker.Stop()
		for {
			select {
			case msg, ok := <-c.send:
				if !ok { c.conn.Close(websocket.StatusNormalClosure, ""); return }
				if err := c.conn.Write(ctx, websocket.MessageText, msg); err != nil { return }
			case <-ticker.C:
				ctx2, cancel := context.WithTimeout(ctx, 5*time.Second)
				err := c.conn.Ping(ctx2); cancel()
				if err != nil { return }
			case <-ctx.Done():
				return
			}
		}
	}

----- Bài 5: Auth bằng token query param -----

	func wsAuthHandler(w http.ResponseWriter, r *http.Request) {
		if r.URL.Query().Get("token") != "secret123" {
			http.Error(w, "unauthorized", http.StatusUnauthorized)
			return // KHÔNG Accept → handshake fail với 401
		}
		c, _ := websocket.Accept(w, r, &websocket.AcceptOptions{InsecureSkipVerify: true})
		defer c.Close(websocket.StatusInternalError, "")
		// ... authenticated
	}

----- Bài 6: Heartbeat ping/pong detect dead client -----

	ticker := time.NewTicker(5 * time.Second)
	for range ticker.C {
		pingCtx, cancel := context.WithTimeout(ctx, 2*time.Second)
		err := c.Ping(pingCtx); cancel()
		if err != nil {
			log.Printf("client %s timed out: %v", clientID, err)
			return
		}
	}
*/
