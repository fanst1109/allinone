// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: Programming/lesson-48-websocket-streaming/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 48 — WebSocket & Streaming (Real-time Web)

> Tier 4 · Bài 7/12 — sau khi đã có HTTP ([L42](../lesson-42-http-net-deep/)), REST ([L43](../lesson-43-rest-api-design/)),
> auth ([L46](../lesson-46-authentication-jwt/)) và TLS ([L47](../lesson-47-tls-crypto-basics/)), bài này trả lời
> câu hỏi: **"Server đang chạy HTTP request/response, làm sao đẩy event xuống client real-time?"** —
> 3 lựa chọn (long polling, SSE, WebSocket), khi nào dùng cái nào, và viết được handler thật bằng \`net/http\`.

## Mục tiêu học tập

Sau bài này, bạn sẽ:

1. Hiểu **vì sao HTTP request/response không hợp** với chat / notification / live dashboard, và cần "push từ server → client".
2. Cài đặt được **long polling** bằng stdlib (không lib), biết hạn chế thực tế (latency, blocking goroutine, idle timeout).
3. Cài đặt được **Server-Sent Events (SSE)** đúng chuẩn: header \`text/event-stream\`, format \`data: ...\\n\\n\`, \`Flush()\` ngay sau mỗi event.
4. Hiểu **WebSocket protocol**: upgrade từ HTTP/1.1 bằng \`Connection: Upgrade\` + \`Upgrade: websocket\`, response \`101 Switching Protocols\`, sau đó full-duplex frame.
5. So sánh được 3 cơ chế trên 5 trục: hướng (uni/bi), protocol, auto-reconnect, binary support, friendly với proxy/firewall.
6. Biết 3 lib WebSocket phổ biến cho Go (\`x/net/websocket\`, \`gorilla/websocket\`, \`nhooyr.io/websocket\`) và lý do chọn \`nhooyr\` cho code mới.
7. Cài đặt được **chat broadcast hub-and-spoke**: \`Hub\` quản lý map client, register/unregister/broadcast qua channel, mỗi client 2 goroutine read/write.
8. Tránh được ≥ 5 pitfall thực tế: leak connection, blocking writer, thiếu heartbeat, CORS Origin, SSE limit 6 connection/origin.
9. Biết cách **scale** real-time service (sticky session, Redis pub/sub) và xử lý **auth** khi WebSocket không gửi header sau handshake.

## Kiến thức tiền đề

- [Lesson 21 — IO & Streaming](../lesson-21-io-streaming/) (\`io.Writer\`, \`Flush\`, buffered IO).
- [Lesson 27 — Goroutines & Channels](../lesson-27-goroutines-channels/) (chat hub viết bằng channels).
- [Lesson 28 — Sync Primitives](../lesson-28-sync-primitives/) (\`sync.Mutex\` bảo vệ map clients).
- [Lesson 29 — Context Cancellation](../lesson-29-context-cancellation/) (đóng connection theo context).
- [Lesson 42 — net/http Deep](../lesson-42-http-net-deep/) (\`http.Handler\`, \`http.Flusher\`, \`http.Hijacker\`).
- [Lesson 46 — Authentication & JWT](../lesson-46-authentication-jwt/) (auth qua query param / first message).

---

## 1. Vấn đề: HTTP request/response không phù hợp cho real-time

### 1.1 Mô hình "client kéo, server không tự nói"

HTTP cổ điển — client gửi 1 request, server trả 1 response, **kết thúc**. Connection có thể keep-alive
(TCP còn mở), nhưng **server không có quyền chủ động ghi data xuống** nếu client không hỏi.

\`\`\`
Client: GET /messages → 
Server:                ← {messages: [...]}   (kết thúc, không nói gì nữa)
\`\`\`

Đặt vấn đề thực tế — bạn xây **chat app**. Bob vừa gõ tin nhắn gửi Alice. Server đã nhận. **Làm sao
Alice biết** mà không phải tự bấm F5?

> 💡 **Trực giác.** HTTP giống **gọi điện hỏi đáp**: bạn hỏi mới nghe được trả lời. Real-time cần
> giống **đài phát thanh** hoặc **bộ đàm**: server muốn nói lúc nào thì nói, client có cái loa luôn bật.

### 1.2 Ba cách "đảo chiều" data flow

| Cách | Cơ chế | Trông như |
|------|--------|-----------|
| **Long polling** | Client hỏi, server **giữ kết nối** đến khi có event hoặc timeout, rồi trả lời. Client hỏi lại ngay. | "Đợi sẵn rồi mới trả lời, xong hỏi lại" |
| **SSE** | Server giữ một HTTP response **không đóng**, mỗi khi có event thì ghi vào body và \`Flush()\`. | "Server đọc thơ một chiều, client chỉ nghe" |
| **WebSocket** | Sau handshake HTTP, hai bên **bỏ HTTP**, chuyển sang frame-based protocol full-duplex trên cùng TCP. | "HTTP chỉ là cái cửa, vào trong nói tự do" |

> ❓ **"Tại sao không dùng raw TCP?"** — Bạn dùng được, nhưng raw TCP không qua được port 80/443
> mặc định của firewall doanh nghiệp, không tự đi qua HTTP proxy, không tận dụng được TLS infrastructure đã có.
> WebSocket sinh ra **chính để chui qua firewall HTTP** bằng cách giả vờ là HTTP request lúc đầu.

### 1.3 Câu hỏi tự nhiên trước khi đi vào chi tiết

- "Tôi đang dùng REST API, có cần WebSocket không?" → Nếu không có event server-pushed → KHÔNG. Phí tài nguyên.
- "WebSocket có thay được REST không?" → Không, hai bài toán khác nhau. WebSocket cho **streaming/push**;
  REST cho **CRUD**. Hầu hết app production dùng cả hai.
- "Long polling còn ai dùng năm 2026?" → Có, dùng làm **fallback** khi WebSocket bị firewall block.
  Một số legacy stack (vd Facebook chat thời 2010) chạy long polling rất hiệu quả.

---

## 2. Long Polling — cơ chế đơn giản nhất

### 2.1 Cách hoạt động (step-by-step)

Giả sử client muốn nhận message mới của room "general":

1. Client: \`GET /poll?room=general&since=42\` (số 42 là ID message cuối cùng đã thấy).
2. Server check: có message nào ID > 42 không?
   - **Có** → trả về ngay {messages: [...], lastID: 47}.
   - **Không** → server **không trả lời**, giữ goroutine block, đợi.
3. Khi có người post message mới → server signal goroutine đang đợi → trả response.
4. Nếu đợi 30s vẫn không có event → trả \`{messages: [], lastID: 42}\` (timeout).
5. Client nhận response → lưu lastID mới → ngay lập tức gọi GET tiếp.

\`\`\`
Client:   GET /poll?since=42 ──────────────────► (server hold 8s)
                                                  ◄── 200 OK {msgs:[...], lastID:45}
Client:   GET /poll?since=45 ──────────────────► (server hold 30s, timeout)
                                                  ◄── 200 OK {msgs:[], lastID:45}
Client:   GET /poll?since=45 ──────────────────► (server hold 2s)
                                                  ◄── 200 OK {msgs:[...], lastID:46}
\`\`\`

### 2.2 Code skeleton (stdlib, không lib)

\`\`\`go
type pollResult struct {
    Messages []Message \`json:"messages"\`
    LastID   int64     \`json:"lastID"\`
}

// In-memory event bus đơn giản: mỗi room có 1 channel (broadcast bằng cách
// close channel cũ + tạo channel mới).
var (
    mu      sync.RWMutex
    notify  = make(chan struct{})  // close để signal "có event mới"
    store   []Message
)

func longPollHandler(w http.ResponseWriter, r *http.Request) {
    since, _ := strconv.ParseInt(r.URL.Query().Get("since"), 10, 64)

    // 1. Snapshot ngay: có event mới sẵn?
    if msgs := messagesAfter(since); len(msgs) > 0 {
        json.NewEncoder(w).Encode(pollResult{msgs, msgs[len(msgs)-1].ID})
        return
    }

    // 2. Đăng ký listener và đợi tối đa 30s (hoặc client huỷ)
    mu.RLock()
    n := notify
    mu.RUnlock()

    select {
    case <-n:  // có người broadcast → channel bị close
        msgs := messagesAfter(since)
        json.NewEncoder(w).Encode(pollResult{msgs, latestID()})
    case <-time.After(30 * time.Second):
        json.NewEncoder(w).Encode(pollResult{nil, since})  // timeout, empty
    case <-r.Context().Done():
        return  // client đóng connection
    }
}

func postMessage(m Message) {
    mu.Lock()
    store = append(store, m)
    close(notify)             // wake tất cả listener
    notify = make(chan struct{})  // chuẩn bị listener mới
    mu.Unlock()
}
\`\`\`

### 2.3 Pros / Cons

**Pros:**
- Dùng HTTP — qua được mọi proxy/firewall.
- Không cần lib, không cần config đặc biệt.
- Client code đơn giản: \`fetch()\` trong vòng lặp.

**Cons:**
- **Latency**: trung bình 1 RTT giữa "có event" và "client thấy" + 1 RTT setup connection mới.
- **Server resource**: mỗi client đang đợi = 1 goroutine + 1 TCP socket idle. Goroutine rẻ
  nhưng socket fd có giới hạn (~ 1M trên Linux đã tune).
- **Header overhead**: mỗi vòng polling là 1 HTTP request mới — gửi lại cookie, JWT, user-agent...
  Với 10k client polling 30s/lần → ~330 req/s chỉ cho overhead.

> ⚠ **Lỗi thường gặp.** Quên \`r.Context().Done()\` → khi client tab đóng, goroutine vẫn block.
> Mỗi client đóng/mở tab = 1 goroutine zombie nằm đợi 30s. Sau 1h chạy → vài chục nghìn goroutine
> rác. Phải \`select { case <-r.Context().Done(): return }\`.

> 🔁 **Tự kiểm tra.** Nếu server có 1000 client đang long-poll và 1 sự kiện duy nhất xảy ra,
> server sẽ trả về cho bao nhiêu client?
> <details><summary>Đáp án</summary>Tất cả 1000 client cùng wake (close(notify) wake mọi receiver),
> mỗi client check \`messagesAfter(since)\` → tất cả đều thấy message mới → trả cho cả 1000.
> Thunder herd: 1000 response cùng lúc, 1000 request mới ngay sau. Đây là lý do production dùng
> SSE/WebSocket thay cho long polling.</details>

---

## 3. Server-Sent Events (SSE) — server-to-client streaming chuẩn HTTP

### 3.1 Định nghĩa cụ thể

**SSE là gì** — một HTTP response **không bao giờ kết thúc**, server liên tục ghi event vào body
và \`Flush()\` để client nhận ngay. Content-Type là \`text/event-stream\`.

**Vì sao tồn tại** — long polling tốn 1 RTT cho mỗi event vì phải mở connection mới. SSE giữ
luôn 1 connection cho mọi event → 0 RTT setup. Vẫn là HTTP nên qua firewall, vẫn có header
\`Authorization\`, vẫn có TLS — không cần protocol mới.

**Ví dụ trực giác bằng số** — server gửi stock price mỗi 100ms:

\`\`\`
HTTP/1.1 200 OK
Content-Type: text/event-stream
Cache-Control: no-cache
Connection: keep-alive

data: {"symbol":"AAPL","price":192.4}
                                      ◄── client EventSource onmessage fire
data: {"symbol":"AAPL","price":192.5}
                                      ◄── onmessage fire
data: {"symbol":"AAPL","price":192.3}
                                      ◄── onmessage fire
... (connection vẫn mở, có thể vĩnh viễn)
\`\`\`

Mỗi event = một dòng \`data: <payload>\\n\` + một dòng trống \`\\n\`.

### 3.2 Format đầy đủ của một event

\`\`\`
id: 42                  ← optional, dùng cho reconnect (gửi lên qua Last-Event-ID)
event: priceUpdate      ← optional, event type, client lắng nghe bằng addEventListener('priceUpdate', ...)
retry: 3000             ← optional, client reconnect sau 3000ms nếu disconnect
data: {"price":192.5}   ← bắt buộc, có thể có nhiều dòng data:
data: line2 of payload
                        ← dòng trống đóng event
\`\`\`

### 3.3 Handler Go (stdlib)

\`\`\`go
func sseHandler(w http.ResponseWriter, r *http.Request) {
    flusher, ok := w.(http.Flusher)
    if !ok {
        http.Error(w, "streaming unsupported", http.StatusInternalServerError)
        return
    }

    w.Header().Set("Content-Type", "text/event-stream")
    w.Header().Set("Cache-Control", "no-cache")
    w.Header().Set("Connection", "keep-alive")
    w.Header().Set("Access-Control-Allow-Origin", "*")  // nếu cross-origin

    ticker := time.NewTicker(1 * time.Second)
    defer ticker.Stop()

    for {
        select {
        case t := <-ticker.C:
            fmt.Fprintf(w, "data: %s\\n\\n", t.Format(time.RFC3339))
            flusher.Flush()  // BẮT BUỘC — không có dòng này client không nhận
        case <-r.Context().Done():
            return
        }
    }
}
\`\`\`

### 3.4 Client browser (EventSource API)

\`\`\`js
const es = new EventSource('/sse');
es.onmessage = (e) => {
    console.log('event:', e.data);
};
es.onerror = (e) => {
    console.error('connection lost, browser will auto-reconnect');
};
\`\`\`

**Auto-reconnect** là tính năng built-in: nếu connection drop, browser tự kết nối lại sau
~3000ms (configurable bằng \`retry:\` field). Gửi luôn header \`Last-Event-ID\` để server resume từ event đó.

### 3.5 Pros / Cons

**Pros:**
- HTTP standard → qua proxy/firewall/TLS không cần config.
- Auto-reconnect ở browser (không phải tự code).
- Format text rất dễ debug — \`curl http://server/sse\` thấy ngay event.
- Server-side đơn giản, dùng được stdlib \`net/http\`.

**Cons:**
- **Server → client only** (unidirectional). Client muốn gửi gì lên server phải dùng REST song song.
- **Browser limit 6 SSE connection per origin** trên HTTP/1.1. Vd mở 7 tab cùng app → tab thứ 7
  kẹt vì hết quota. HTTP/2 giải quyết bằng multiplexing (1 TCP carry nhiều stream) nhưng cần config server.
- Không gửi được binary (text only, phải base64).
- Một số corporate proxy buffer response → SSE bị delay nhiều giây. Workaround: gửi heartbeat
  comment \`:keepalive\\n\\n\` định kỳ để giữ buffer flush.

> ❓ **"SSE khác long polling chỗ nào?"** — Long polling: mỗi event = 1 HTTP request mới (1 RTT
> setup + headers). SSE: 1 HTTP request giữ mãi, mọi event chia sẻ chung connection (0 RTT
> setup). Latency SSE thấp hơn rõ rệt, nhất là khi event nhiều.

---

## 4. WebSocket — full-duplex thật sự

### 4.1 Handshake: HTTP đóng vai khởi đầu

WebSocket KHÔNG phải protocol mới hoàn toàn — nó **upgrade từ HTTP**. Client gửi request đặc biệt:

\`\`\`
GET /ws HTTP/1.1
Host: example.com
Upgrade: websocket
Connection: Upgrade
Sec-WebSocket-Key: dGhlIHNhbXBsZSBub25jZQ==
Sec-WebSocket-Version: 13
Origin: http://example.com
\`\`\`

Server đồng ý, trả:

\`\`\`
HTTP/1.1 101 Switching Protocols
Upgrade: websocket
Connection: Upgrade
Sec-WebSocket-Accept: s3pPLMBiTxaQ9kYGzzhZRbK+xOo=
\`\`\`

**Sec-WebSocket-Accept** = \`base64(SHA1(client_key + "258EAFA5-E914-47DA-95CA-C5AB0DC85B11"))\`.
Magic string cố định trong RFC 6455 — chỉ để chứng minh server biết protocol, chống caching proxy.

Sau status \`101\`, hai bên **bỏ HTTP** trên cùng TCP connection đó, chuyển sang **WebSocket frame format**:

\`\`\`
 0                   1                   2                   3
 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1
+-+-+-+-+-------+-+-------------+-------------------------------+
|F|R|R|R| opcode|M| Payload len |    Extended payload length    |
|I|S|S|S|  (4)  |A|     (7)     |             (16/64)           |
|N|V|V|V|       |S|             |   (if payload len==126/127)   |
| |1|2|3|       |K|             |                               |
+-+-+-+-+-------+-+-------------+ - - - - - - - - - - - - - - - +
|     Extended payload length continued, if payload len == 127  |
+ - - - - - - - - - - - - - - - +-------------------------------+
|                               |Masking-key, if MASK set to 1  |
+-------------------------------+-------------------------------+
|    Masking-key (continued)    |          Payload Data         |
+-------------------------------- - - - - - - - - - - - - - - - +
:                     Payload Data continued ...                :
+ - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - +
|                     Payload Data continued ...                |
+---------------------------------------------------------------+
\`\`\`

Opcode quan trọng: \`0x1\` (text frame), \`0x2\` (binary frame), \`0x8\` (close), \`0x9\` (ping), \`0xA\` (pong).

> 💡 **Trực giác.** Handshake giống **đi qua cửa kiểm an sân bay**: dùng giấy tờ HTTP để vào.
> Sau khi qua cửa, bạn ở trong khu vực miễn thuế — di chuyển tự do, không phải show giấy tờ nữa.

### 4.2 Vì sao có handshake HTTP mà không dùng TCP thẳng

3 lý do thực tế:

1. **Đi qua HTTP proxy** đã có sẵn ở doanh nghiệp/ISP. Raw TCP port khác 80/443 hay bị block.
2. **Dùng chung port 443** với HTTPS — admin không phải mở port mới.
3. **Tái dùng auth/cookie/TLS** sẵn có từ HTTP.

### 4.3 Pros / Cons

**Pros:**
- **Full-duplex**: client và server cùng gửi đồng thời, không cần chờ lượt.
- Latency thấp nhất (sau handshake không có HTTP header nữa, mỗi frame chỉ ~2-6 byte overhead).
- Binary native (no base64).
- Một connection cho cả 2 chiều → không bị limit 6/origin như SSE.

**Cons:**
- Phức tạp hơn: cần lib, cần xử lý heartbeat, reconnect tự code.
- Không cache được (vì không phải HTTP response).
- Khó load balance hơn (sticky session).
- Một số corporate firewall vẫn block (kể cả qua 443), phải có **fallback** sang SSE/long polling.

---

## 5. So sánh 3 cơ chế

| Tiêu chí | Long Polling | SSE | WebSocket |
|----------|--------------|-----|-----------|
| **Hướng** | Server → client (mỗi lần 1 response) | Server → client (stream) | **Full-duplex** |
| **Protocol** | HTTP request/response | HTTP response stream | HTTP handshake → WS frames |
| **Auto-reconnect** | Tự code | **Built-in browser EventSource** | Tự code |
| **Binary** | Phải base64 | Phải base64 | **Native** |
| **Friendly với proxy/firewall** | ★★★★★ | ★★★★ | ★★★ |
| **Latency event delivery** | ~RTT × 2 | ~RTT | ~RTT (lower) |
| **Server resource per client** | Cao (mỗi event 1 req) | Thấp (1 connection giữ mãi) | Thấp (1 connection giữ mãi) |
| **Header overhead** | Cao (mỗi req gửi lại header) | Thấp (chỉ header lần đầu) | Thấp (frame overhead 2-6 byte) |
| **Browser limit per origin** | 6 (HTTP/1.1) | 6 (HTTP/1.1) | Không có (~practically) |
| **Khi nào dùng** | Fallback, legacy | Notification, dashboard, news feed | Chat, game, collab, trading |

> ❓ **"Tại sao Slack chọn WebSocket mà Twitter chọn SSE?"** — Slack cần client gửi typing indicator,
> read receipt, presence ping liên tục lên server → cần full-duplex → WebSocket. Twitter timeline
> chỉ cần server push tweet xuống, client không gửi gì qua channel này (việc post tweet đi qua
> REST riêng) → SSE đủ, và dễ scale hơn nhờ vẫn là HTTP.

> 📝 **Tóm tắt mục 5.**
> - 3 cơ chế giải cùng 1 bài toán nhưng đánh đổi khác nhau.
> - Long polling = compatibility cao, latency cao, server resource cao.
> - SSE = HTTP, auto-reconnect, unidirectional.
> - WebSocket = full-duplex, binary, phức tạp hơn để vận hành.

---

## 6. WebSocket library cho Go

Stdlib **không có** WebSocket trong \`net/http\`. Có 3 lib chính:

| Lib | Quality | Status | Ghi chú |
|-----|---------|--------|---------|
| \`golang.org/x/net/websocket\` | "Bán chính thức" của Go team | **Deprecated**, không phát triển | Tránh dùng — thiếu nhiều feature (compression, hijack proper) |
| \`github.com/gorilla/websocket\` | De-facto standard 2014-2022 | **Archived** 2023, fork tiếp tục | Code mature, nhiều ví dụ trên Internet |
| \`nhooyr.io/websocket\` (giờ là \`github.com/coder/websocket\`) | Modern, context-aware, ít allocation | **Active** | Khuyến nghị cho code mới |

**Đặc điểm \`nhooyr/coder/websocket\`:**
- API context-first: \`Accept(w, r, opts)\`, \`Read(ctx, ...)\`, \`Write(ctx, ...)\` — tích hợp tốt với cancellation.
- Helper JSON ngay trong package phụ \`wsjson\` — không phải tự encode/decode.
- Concurrent-safe write (gorilla yêu cầu mutex tự quản).
- Tự xử lý ping/pong heartbeat khi \`SetReadLimit\` hoặc \`SetReadDeadline\`.

### 6.1 Handler skeleton với \`coder/websocket\`

\`\`\`go
import (
    "github.com/coder/websocket"
    "github.com/coder/websocket/wsjson"
)

type Message struct {
    Type string \`json:"type"\`
    Body string \`json:"body"\`
}

func wsHandler(w http.ResponseWriter, r *http.Request) {
    c, err := websocket.Accept(w, r, &websocket.AcceptOptions{
        OriginPatterns: []string{"example.com"},  // CORS-like check
    })
    if err != nil {
        log.Printf("ws accept: %v", err)
        return
    }
    defer c.Close(websocket.StatusInternalError, "")

    ctx := r.Context()
    for {
        var msg Message
        if err := wsjson.Read(ctx, c, &msg); err != nil {
            log.Printf("read: %v", err)
            return  // client đóng hoặc lỗi
        }

        // Echo lại với suffix
        resp := Message{Type: "echo", Body: msg.Body + " 🙂"}
        if err := wsjson.Write(ctx, c, resp); err != nil {
            return
        }
    }

    c.Close(websocket.StatusNormalClosure, "")
}
\`\`\`

> ⚠ **Pitfall — Origin check.** Nếu không truyền \`OriginPatterns\`, lib mặc định CHỈ chấp nhận
> request từ cùng origin với server. Test bằng \`wscat\` hay file local sẽ failed với
> "request Origin not authorized". Đặt \`InsecureSkipVerify: true\` chỉ cho dev — production
> phải whitelist origin cụ thể.

---

## 7. Chat Broadcast Pattern — Hub-and-Spoke

### 7.1 Vấn đề: nhiều client, broadcast cho tất cả

Bob gõ "hello" trong room "general" → 50 client khác trong room đó phải nhận. Mỗi client là
1 goroutine read + 1 connection. Làm sao goroutine A "biết về" connection của 49 goroutine khác?

**Sai lầm phổ biến**: dùng \`sync.Map\` chứa tất cả connection, mỗi khi nhận message thì iterate
gọi \`c.Write()\` trực tiếp. Vấn đề:

- \`Write\` blocking → 1 client chậm sẽ block cả vòng iterate → các client khác delay theo.
- Race condition khi 1 client disconnect đúng lúc đang iterate.
- Phải tự quản mutex cho mỗi connection (gorilla) — phức tạp.

**Đáp án**: pattern **hub-and-spoke** — 1 goroutine "hub" sở hữu state, các goroutine "spoke"
(mỗi client 2 cái: read và write) chỉ giao tiếp với hub qua channel.

### 7.2 Cấu trúc

\`\`\`go
type Client struct {
    conn  *websocket.Conn
    send  chan []byte  // buffered, hub đẩy vào
    hub   *Hub
}

type Hub struct {
    clients    map[*Client]bool
    register   chan *Client
    unregister chan *Client
    broadcast  chan []byte
}

func (h *Hub) Run() {
    for {
        select {
        case c := <-h.register:
            h.clients[c] = true
        case c := <-h.unregister:
            if _, ok := h.clients[c]; ok {
                delete(h.clients, c)
                close(c.send)
            }
        case msg := <-h.broadcast:
            for c := range h.clients {
                select {
                case c.send <- msg:
                default:
                    // buffer đầy → client quá chậm → drop
                    close(c.send)
                    delete(h.clients, c)
                }
            }
        }
    }
}
\`\`\`

Quan sát: **chỉ goroutine Hub đụng vào \`h.clients\`** → không cần mutex. Mọi thay đổi đi qua
channel. Đây là idiom Go "share memory by communicating".

### 7.3 Reader / Writer goroutine cho mỗi client

\`\`\`go
func (c *Client) readLoop(ctx context.Context) {
    defer func() {
        c.hub.unregister <- c
        c.conn.Close(websocket.StatusNormalClosure, "")
    }()
    for {
        _, data, err := c.conn.Read(ctx)
        if err != nil {
            return
        }
        c.hub.broadcast <- data
    }
}

func (c *Client) writeLoop(ctx context.Context) {
    ticker := time.NewTicker(30 * time.Second)
    defer ticker.Stop()
    for {
        select {
        case msg, ok := <-c.send:
            if !ok {
                c.conn.Close(websocket.StatusNormalClosure, "")
                return
            }
            if err := c.conn.Write(ctx, websocket.MessageText, msg); err != nil {
                return
            }
        case <-ticker.C:
            // heartbeat ping
            ctx2, cancel := context.WithTimeout(ctx, 5*time.Second)
            err := c.conn.Ping(ctx2)
            cancel()
            if err != nil {
                return  // dead connection
            }
        case <-ctx.Done():
            return
        }
    }
}
\`\`\`

> 💡 **Trực giác Hub-and-Spoke.** Hub là **bưu điện trung tâm**. Mỗi client có 2 nhân viên:
> 1 chạy ra đọc thư đến (readLoop, gọi \`Read\`), 1 đứng đợi giao thư (writeLoop, đọc từ \`send\` channel).
> Khi 1 thư cần phát cho cả thị trấn, ai đó gửi vào \`broadcast\` channel; nhân viên bưu điện
> trung tâm (Hub.Run) phân thư vào ô từng client; mỗi nhân viên writeLoop lấy từ ô của mình và đi giao.

### 7.4 Drop slow client thay vì block

Channel \`send\` được khai báo **buffered** (vd \`make(chan []byte, 16)\`):

- Hub đẩy bằng \`select { case c.send <- msg: default: drop }\` — không block hub.
- Client xử lý chậm → buffer đầy → hub drop client (đóng connection).

Logic này quan trọng: **một client chậm không được phép làm chậm toàn hệ thống**.

> ⚠ **Pitfall — blocking writer chain.** Code naive: hub iterate và gọi trực tiếp \`c.conn.Write()\` →
> nếu 1 client mạng chậm, write block 30s → tất cả client khác delay theo. Phải tách writer
> thành goroutine riêng, dùng buffered channel làm cushion.

---

## 8. SSE Handler đầy đủ (production-ready)

\`\`\`go
func sseHandler(w http.ResponseWriter, r *http.Request) {
    flusher, ok := w.(http.Flusher)
    if !ok {
        http.Error(w, "streaming unsupported", 500)
        return
    }

    w.Header().Set("Content-Type", "text/event-stream")
    w.Header().Set("Cache-Control", "no-cache")
    w.Header().Set("Connection", "keep-alive")
    w.Header().Set("X-Accel-Buffering", "no")  // tell nginx không buffer

    // Subscribe vào event bus
    ch := bus.Subscribe()
    defer bus.Unsubscribe(ch)

    // Heartbeat 15s — giữ connection sống qua proxy
    heartbeat := time.NewTicker(15 * time.Second)
    defer heartbeat.Stop()

    // Last-Event-ID để client resume
    lastID := r.Header.Get("Last-Event-ID")
    if lastID != "" {
        // resend events từ lastID
        for _, ev := range bus.EventsAfter(lastID) {
            writeSSE(w, ev.ID, ev.Type, ev.Data)
        }
        flusher.Flush()
    }

    for {
        select {
        case ev := <-ch:
            writeSSE(w, ev.ID, ev.Type, ev.Data)
            flusher.Flush()
        case <-heartbeat.C:
            fmt.Fprint(w, ":keepalive\\n\\n")  // comment line, browser ignore
            flusher.Flush()
        case <-r.Context().Done():
            return
        }
    }
}

func writeSSE(w io.Writer, id, evType, data string) {
    if id != "" {
        fmt.Fprintf(w, "id: %s\\n", id)
    }
    if evType != "" {
        fmt.Fprintf(w, "event: %s\\n", evType)
    }
    // Nếu data có nhiều dòng, mỗi dòng phải prefix \`data: \`
    for _, line := range strings.Split(data, "\\n") {
        fmt.Fprintf(w, "data: %s\\n", line)
    }
    fmt.Fprint(w, "\\n")  // dòng trống đóng event
}
\`\`\`

---

## 9. Khi nào chọn cái nào — quyết định cây

\`\`\`
Bạn cần CLIENT gửi data lên server (qua channel này)?
├── CÓ
│   └── → WebSocket (chat, game, collab editor, trading)
└── KHÔNG
    └── Bạn cần broadcast cho NHIỀU client?
        ├── CÓ + browser-only client
        │   └── → SSE (notification, dashboard, news feed, stock price)
        └── CÓ + cần qua firewall khắt khe / legacy client
            └── → Long polling
\`\`\`

Ví dụ thực tế:

| App | Use case | Lựa chọn | Lý do |
|-----|----------|----------|-------|
| Slack/Discord | Chat, presence, typing | WebSocket | Cần client gửi nhiều event lên server |
| GitHub PR live update | Comment, status, review | SSE | Server push 1 chiều, browser cần |
| Bitcoin trading | Order book real-time + place order | WebSocket | Latency thấp + bidirectional |
| Email notification dropdown | "Bạn có 3 thông báo mới" | SSE | 1 chiều, ít event/giây |
| Gitlab CI log streaming | Tail log file của job | SSE | 1 chiều, text |
| Multiplayer FPS game | Position sync 60fps | WebSocket binary | Latency + binary frame |

---

## 10. Authentication — vấn đề riêng của WebSocket

### 10.1 Vì sao WebSocket khó auth hơn HTTP

HTTP request — mỗi request gửi header \`Authorization: Bearer ...\` → middleware verify, set
\`r.Context()\`. WebSocket — chỉ **handshake** ban đầu có HTTP header. **Sau khi upgrade, frame
không có header** → không thể "gửi token mỗi message".

### 10.2 Ba cách auth phổ biến

**(a) Token qua query param** (đơn giản nhất, dùng nhiều)

\`\`\`
GET /ws?token=eyJhbGciOi... HTTP/1.1
\`\`\`

Server verify trong handshake handler:

\`\`\`go
func wsHandler(w http.ResponseWriter, r *http.Request) {
    token := r.URL.Query().Get("token")
    user, err := verifyJWT(token)
    if err != nil {
        http.Error(w, "unauthorized", 401)
        return
    }
    c, _ := websocket.Accept(w, r, nil)
    // ... user đã xác thực
}
\`\`\`

⚠ **Nhược điểm**: token đi vào query → bị log ở proxy/nginx access log → leak. Workaround:
dùng one-time ticket (server cấp ticket từ endpoint HTTPS, ticket chỉ dùng 1 lần, expire 30s).

**(b) First message authenticate**

\`\`\`
1. Client connect (no auth).
2. Server: gửi \`{"type":"hello"}\`, đặt timer 5s.
3. Client gửi \`{"type":"auth","token":"eyJ..."}\`.
4. Server verify → set authenticated flag → tiếp tục.
5. Nếu 5s không có auth message → close.
\`\`\`

Sạch (không leak token vào log), nhưng phức tạp hơn — server cần stateful FSM cho mỗi connection.

**(c) Subprotocol header** (chuẩn nhưng ít dùng)

\`\`\`
GET /ws HTTP/1.1
Sec-WebSocket-Protocol: bearer.eyJhbGciOi...
\`\`\`

Đứng đắn về mặt protocol nhưng JavaScript \`WebSocket\` API hỗ trợ kém việc gửi raw header,
cuối cùng vẫn phải nhét token vào subprotocol — không thực sự hơn (a).

> 💡 **Trực giác.** WebSocket auth giống **vé vào sân vận động**: kiểm vé 1 lần khi vào cửa
> (handshake), bên trong không hỏi lại. Nếu bạn cần thu hồi vé giữa chừng (ban user), phải **đóng
> connection** — không có cách "vô hiệu hoá token" cho connection đang sống.

---

## 11. Heartbeat / Ping-Pong — phát hiện connection chết

### 11.1 Vấn đề: TCP không nói cho bạn biết khi nào client biến mất

Wifi rớt sóng, laptop bị suspend, NAT timeout — connection "vẫn mở" về mặt OS nhưng đối tác không
bao giờ trả lời nữa. Server không biết, vẫn giữ socket, vẫn buffer message gửi cho client đã chết.
Sau 6 tiếng, vài nghìn ghost connection.

### 11.2 Giải pháp: ping định kỳ

**WebSocket built-in** — opcode \`0x9\` (ping) / \`0xA\` (pong). Spec yêu cầu peer nhận ping phải
trả pong "ngay lập tức". Logic:

\`\`\`go
func writeLoop(c *websocket.Conn) {
    ticker := time.NewTicker(30 * time.Second)
    for range ticker.C {
        ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
        if err := c.Ping(ctx); err != nil {
            cancel()
            return  // không nhận pong trong 10s → connection chết
        }
        cancel()
    }
}
\`\`\`

**SSE** không có ping built-in. Workaround: server gửi comment line \`:keepalive\\n\\n\` định kỳ.
Browser ignore (event không fire), nhưng TCP byte truyền qua → giữ NAT/proxy không timeout.

### 11.3 Vì sao 30s là con số chuẩn

- AWS ALB idle timeout default = **60s**.
- Nginx idle timeout default = **75s**.
- Mobile carrier NAT thường timeout 60-300s.

→ Heartbeat 30s đảm bảo có hoạt động dưới mọi ngưỡng phổ biến. Không nên < 15s (lãng phí pin
mobile, băng thông), không nên > 50s (rủi ro idle timeout).

> ⚠ **Pitfall.** Quên heartbeat → connection ngủ ngon trong 1 tiếng, sau đó proxy đóng âm thầm,
> server không biết, client gửi message và "im lìm chờ ACK" mãi.

---

## 12. Scaling Real-Time Service

### 12.1 Tình huống: nhiều server node

Bạn có 4 node Go behind load balancer. Bob connect vào node 1, Alice connect vào node 2. Bob
gửi message → node 1 nhận. Làm sao node 2 biết để push xuống Alice?

\`\`\`
Bob ──► LB ──► Node 1 ───?───► Node 2 ◄── LB ◄── Alice
\`\`\`

### 12.2 Hai vấn đề phải giải

**Vấn đề 1 — Sticky session**: WebSocket là stateful, mỗi connection thuộc 1 node. Nếu LB
random-route → request HTTP handshake có thể đến node A, request reconnect có thể đến node B
(không có state). Giải pháp: cấu hình LB sticky (theo IP hoặc cookie).

**Vấn đề 2 — Cross-node broadcast**: cần 1 cơ chế để node 1 nói cho mọi node khác. **Redis
Pub/Sub** là pattern phổ biến nhất:

\`\`\`go
// Khi nhận message từ Bob ở node 1
hub.broadcastLocal(msg)             // gửi cho client local
redis.Publish("chat:room1", msg)    // gửi cho node khác

// Node 2 subscribe
go func() {
    for m := range redis.Subscribe("chat:room1") {
        hub.broadcastLocal(m)        // gửi cho client local của node 2
    }
}()
\`\`\`

Trade-off: thêm 1 dependency (Redis), thêm latency ~1ms cross-node. Đổi lại scale ra N node.

**Alternative**: Kafka (persistent, replay được), NATS (lightweight, optimized cho pub/sub).

### 12.3 Số connection tối đa trên 1 Go server

Goroutine: ~2KB stack mỗi cái → 1 triệu connection = 2GB RAM cho goroutine. Khả thi.

File descriptor: default Linux 1024 → phải \`ulimit -n 1000000\`.

Ephemeral port: hết port outbound khi server cần connect đến DB/Redis (~28k port available
per IP). Solution: nhiều IP, hoặc connection pool đến backend.

> ❓ **"100k client cùng connect đến 1 server có khả thi không?"** — Có, có công ty Go đã chạy
> 1M connection trên 1 server (kèm kernel tuning). Nhưng broadcast 1M client mất ~1s ngay cả
> khi mỗi \`Write\` chỉ 1µs → trong production thường shard ra nhiều node để latency thấp hơn.

---

## 13. Common Pitfalls — danh sách tổng kết

| # | Pitfall | Hậu quả | Cách tránh |
|---|---------|---------|-----------|
| 1 | Quên \`defer c.Close()\` | Connection leak, fd leak | Luôn \`defer c.Close(StatusInternalError, "")\` |
| 2 | Blocking \`Write\` trong hub broadcast | 1 client chậm làm chậm cả hệ | Buffered channel + drop slow client |
| 3 | Không có heartbeat | Connection ngủ → ghost client | Ping mỗi 30s, deadline 10s nhận pong |
| 4 | Không check Origin header | CSWSH attack (cross-site WebSocket hijacking) | Whitelist origin trong \`AcceptOptions\` |
| 5 | Token qua query param ghi vào log | JWT leak | One-time ticket / first-message auth |
| 6 | SSE quên \`Flush()\` | Client không nhận event đến khi buffer đầy | Gọi \`flusher.Flush()\` sau mỗi event |
| 7 | SSE qua nginx default | Buffer làm event đến chậm vài giây | Header \`X-Accel-Buffering: no\` |
| 8 | Long polling không check \`ctx.Done()\` | Goroutine zombie khi client đóng tab | \`select { case <-r.Context().Done(): return }\` |
| 9 | Mở > 6 SSE connection cùng origin | Connection thứ 7 bị block | Multiplex qua 1 connection / HTTP/2 |
| 10 | Broadcast lock cả map khi iterate | Contention, performance kém | Hub goroutine sở hữu map, không share |

---

## 14. Bài tập

> Mọi bài đều có **lời giải chi tiết** ở mục bên dưới.

### Bài tập 1 — SSE endpoint phát timestamp mỗi 1s

Viết handler \`/sse/time\` trả về timestamp mỗi giây dưới dạng SSE event. Test bằng \`curl -N localhost:8080/sse/time\`.

### Bài tập 2 — WebSocket echo server

Dùng \`coder/websocket\`. Client gửi message → server trả lại message đó với prefix \`"echo: "\`.
Đóng connection sau khi nhận 5 message.

### Bài tập 3 — Chat broadcast với hub

Cài đặt hub-and-spoke. Nhiều client connect đến \`/ws\`. Mỗi message client gửi → broadcast cho
tất cả client khác (KHÔNG echo lại cho người gửi).

### Bài tập 4 — Long polling đơn giản

Endpoint \`/poll?since=<ID>\` trả về tất cả message có ID > since. Nếu chưa có, block đến 20s
hoặc đến khi có message mới. Endpoint \`/post\` thêm message mới.

### Bài tập 5 — WebSocket với auth (token query param)

Verify token "secret123" trước khi accept. Nếu sai → trả 401 và không upgrade.

### Bài tập 6 — Heartbeat ping/pong detect dead client

Writer goroutine ping mỗi 5s, deadline 2s. Nếu fail → log "client X timed out" và đóng connection.

---

## 15. Lời giải chi tiết

### Lời giải Bài 1 — SSE timestamp

\`\`\`go
func sseTimeHandler(w http.ResponseWriter, r *http.Request) {
    flusher, ok := w.(http.Flusher)
    if !ok {
        http.Error(w, "streaming unsupported", 500)
        return
    }
    w.Header().Set("Content-Type", "text/event-stream")
    w.Header().Set("Cache-Control", "no-cache")
    w.Header().Set("Connection", "keep-alive")

    ticker := time.NewTicker(1 * time.Second)
    defer ticker.Stop()

    for {
        select {
        case t := <-ticker.C:
            fmt.Fprintf(w, "data: %s\\n\\n", t.Format(time.RFC3339))
            flusher.Flush()
        case <-r.Context().Done():
            return
        }
    }
}
\`\`\`

**Cách tiếp cận:**
1. Assert \`http.Flusher\` — nếu server đứng sau handler không hỗ trợ (vd HTTP/2 unbuffered chưa khả dụng), báo 500 sớm.
2. Set 3 header bắt buộc cho SSE.
3. Vòng lặp \`ticker\` + \`select\` để bắt cả ticker tick và client disconnect (\`r.Context().Done()\`).
4. Mỗi tick: ghi \`data: <timestamp>\\n\\n\` rồi \`Flush()\` — không có Flush thì byte nằm trong buffer net/http, client không nhận đến khi buffer đầy.

**Test:**
\`\`\`
$ curl -N http://localhost:8080/sse/time
data: 2026-05-26T10:00:01+07:00

data: 2026-05-26T10:00:02+07:00

...
\`\`\`

### Lời giải Bài 2 — WebSocket echo (5 messages then close)

\`\`\`go
func wsEchoHandler(w http.ResponseWriter, r *http.Request) {
    c, err := websocket.Accept(w, r, &websocket.AcceptOptions{
        InsecureSkipVerify: true,  // dev only
    })
    if err != nil {
        log.Printf("accept: %v", err)
        return
    }
    defer c.Close(websocket.StatusInternalError, "")

    ctx := r.Context()
    for i := 0; i < 5; i++ {
        _, data, err := c.Read(ctx)
        if err != nil {
            return
        }
        reply := append([]byte("echo: "), data...)
        if err := c.Write(ctx, websocket.MessageText, reply); err != nil {
            return
        }
    }
    c.Close(websocket.StatusNormalClosure, "limit reached")
}
\`\`\`

**Cách tiếp cận:**
1. \`Accept\` thực hiện handshake. \`InsecureSkipVerify: true\` để test cross-origin (production phải dùng \`OriginPatterns\`).
2. Vòng \`for\` cố định 5 lần. \`Read\` block đến khi có frame.
3. \`Write\` với opcode \`MessageText\` (UTF-8). Nếu gửi \`MessageBinary\` thì client browser nhận \`Blob\`.
4. Sau 5 message → \`Close\` với status code \`1000\` (Normal Closure) + reason.

**Độ phức tạp:** $O(N)$ message, mỗi message $O(K)$ cho K = kích thước payload.

### Lời giải Bài 3 — Chat broadcast (hub-and-spoke)

Xem \`solutions.go\` cho code đầy đủ. Cấu trúc:

- \`Hub\`: goroutine duy nhất sở hữu \`map[*Client]bool\`.
- 3 channels: \`register\`, \`unregister\`, \`broadcast\`.
- Mỗi client: 1 goroutine \`readLoop\` (gọi \`c.conn.Read\`, push vào \`hub.broadcast\`), 1 goroutine \`writeLoop\` (đọc từ \`c.send\`, gọi \`c.conn.Write\`).
- Khi broadcast: hub iterate map và \`select\` non-blocking gửi vào \`c.send\`. Nếu \`default\` (buffer đầy) → drop client.

**Lưu ý không echo cho người gửi:** thêm field \`sender *Client\` vào message, hub skip khi \`c == sender\`:

\`\`\`go
type Broadcast struct { data []byte; from *Client }

case b := <-h.broadcast:
    for c := range h.clients {
        if c == b.from { continue }
        select { case c.send <- b.data: default: ... }
    }
\`\`\`

**Độ phức tạp broadcast:** $O(N)$ với N = số client. Trên 10k client + message 200 byte ≈ 2ms.

### Lời giải Bài 4 — Long polling

\`\`\`go
type store struct {
    mu     sync.RWMutex
    msgs   []string
    notify chan struct{}
}

func (s *store) post(msg string) {
    s.mu.Lock()
    s.msgs = append(s.msgs, msg)
    close(s.notify)
    s.notify = make(chan struct{})
    s.mu.Unlock()
}

func (s *store) poll(ctx context.Context, since int) ([]string, int, error) {
    s.mu.RLock()
    if len(s.msgs) > since {
        out := append([]string(nil), s.msgs[since:]...)
        n := len(s.msgs)
        s.mu.RUnlock()
        return out, n, nil
    }
    ch := s.notify
    s.mu.RUnlock()

    select {
    case <-ch:
        s.mu.RLock()
        out := append([]string(nil), s.msgs[since:]...)
        n := len(s.msgs)
        s.mu.RUnlock()
        return out, n, nil
    case <-time.After(20 * time.Second):
        return nil, since, nil
    case <-ctx.Done():
        return nil, since, ctx.Err()
    }
}
\`\`\`

**Cách tiếp cận:**
1. \`notify\` là \`chan struct{}\` — đóng channel để wake mọi listener cùng lúc. Sau khi đóng, tạo channel mới cho lần sau.
2. \`poll\`: trước tiên snapshot dưới \`RLock\` xem có message mới sẵn không (fast path).
3. Nếu chưa, lưu reference channel hiện tại, \`RUnlock\`, rồi block trên 3 nhánh \`select\`.
4. Trả về \`since\` mới (chính là \`len(s.msgs)\` tại thời điểm trả).

**Pitfall đã tránh:** không giữ \`RLock\` khi block — sẽ deadlock với \`post\`. Lấy reference \`notify\` ra biến local rồi \`RUnlock\` trước khi \`select\`.

### Lời giải Bài 5 — WebSocket với auth

\`\`\`go
func wsAuthHandler(w http.ResponseWriter, r *http.Request) {
    token := r.URL.Query().Get("token")
    if token != "secret123" {
        http.Error(w, "unauthorized", http.StatusUnauthorized)
        return  // không Accept → handshake không hoàn thành
    }
    c, err := websocket.Accept(w, r, &websocket.AcceptOptions{InsecureSkipVerify: true})
    if err != nil { return }
    defer c.Close(websocket.StatusInternalError, "")

    // ... phần authenticated logic
}
\`\`\`

**Cách tiếp cận:**
1. Kiểm tra query param **trước** \`Accept\`. Nếu dùng \`r.Header.Get("Authorization")\` thì JavaScript \`WebSocket\` API không gửi header được.
2. \`http.Error\` trả 401 — client thấy handshake fail với status 401 (vì WebSocket chưa upgrade). Trong browser: \`ws.onerror\` fire.
3. Production: tránh \`secret123\` cứng — verify JWT, kiểm tra exp, scope. Token nên là **one-time ticket** (server cấp qua HTTPS endpoint, dùng 1 lần).

**Test:**
\`\`\`bash
$ wscat -c "ws://localhost:8080/ws?token=secret123"      # OK
$ wscat -c "ws://localhost:8080/ws?token=wrong"          # 401
\`\`\`

### Lời giải Bài 6 — Heartbeat ping/pong

\`\`\`go
func wsHandlerWithHeartbeat(w http.ResponseWriter, r *http.Request) {
    c, _ := websocket.Accept(w, r, &websocket.AcceptOptions{InsecureSkipVerify: true})
    defer c.Close(websocket.StatusInternalError, "")

    clientID := r.RemoteAddr
    ctx, cancel := context.WithCancel(r.Context())
    defer cancel()

    // Reader goroutine
    go func() {
        defer cancel()
        for {
            if _, _, err := c.Read(ctx); err != nil { return }
        }
    }()

    // Writer goroutine với heartbeat
    ticker := time.NewTicker(5 * time.Second)
    defer ticker.Stop()
    for {
        select {
        case <-ticker.C:
            pingCtx, pingCancel := context.WithTimeout(ctx, 2*time.Second)
            err := c.Ping(pingCtx)
            pingCancel()
            if err != nil {
                log.Printf("client %s timed out: %v", clientID, err)
                return
            }
        case <-ctx.Done():
            return
        }
    }
}
\`\`\`

**Cách tiếp cận:**
1. \`c.Ping(ctx)\` gửi opcode \`0x9\`, đợi pong (\`0xA\`) trong timeout ctx. \`coder/websocket\` xử lý pong matching tự động.
2. Nếu client mạng chết hoặc tab suspend → pong không đến trong 2s → \`err != nil\` → log + return → \`defer c.Close()\` đóng connection.
3. Reader goroutine cần thiết để gọi \`Read\` (lib xử lý pong tự động trong \`Read\` loop).
4. \`context.WithCancel\` cho phép reader fail → cancel ctx → writer thoát.

**Độ phức tạp:** mỗi ping 1 frame 2 byte. Overhead heartbeat 5s = 0.4 byte/s — nhỏ.

---

## 16. Code & Minh hoạ

- File code: [solutions.go](./solutions.go) — chạy \`go run solutions.go\` mở server ở \`:8080\`.
  - \`/sse/time\` — SSE timestamp (Bài 1).
  - \`/longpoll/poll\`, \`/longpoll/post\` — long polling (Bài 4).
  - \`/ws/echo\`, \`/ws/chat\`, \`/ws/auth\`, \`/ws/heartbeat\` — các WebSocket handler. **Lưu ý**:
    để giữ code biên dịch chỉ với stdlib, các handler WebSocket dùng \`golang.org/x/net/websocket\`
    (deprecated nhưng vào stdlib-ish được). Code reference với \`coder/websocket\` đặt trong
    comment vì cần \`go get\` lib ngoài.
- File minh hoạ: [visualization.html](./visualization.html) — 3 module:
  1. So sánh animation message-flow Long polling / SSE / WebSocket.
  2. WebSocket handshake step-by-step (HTTP request → 101 → frame mode).
  3. Chat broadcast — multiple client cùng lúc, send message, broadcast.

---

## Bài tiếp theo

- [Lesson 49 — gRPC & Protobuf](../lesson-49-grpc-protobuf/) — protocol RPC trên HTTP/2,
  unary + 4 kiểu streaming (server-streaming gần giống SSE, bidirectional giống WebSocket
  nhưng strongly-typed bằng \`.proto\`).
- [Lesson 36 — Concurrency Patterns](../lesson-36-concurrency-patterns/) — ôn lại hub-and-spoke
  ở góc abstract hơn (fan-out, fan-in, worker pool).

## Tham khảo

- [RFC 6455 — The WebSocket Protocol](https://datatracker.ietf.org/doc/html/rfc6455).
- [WHATWG — Server-Sent Events](https://html.spec.whatwg.org/multipage/server-sent-events.html).
- [coder/websocket README](https://github.com/coder/websocket).
- [Gorilla WebSocket — chat example](https://github.com/gorilla/websocket/tree/master/examples/chat) — gốc của pattern hub-and-spoke trong Go ecosystem.
`;
