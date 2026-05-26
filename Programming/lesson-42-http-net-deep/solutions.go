// Lesson 42 — net/http Deep: solutions.go
//
// File này tổng hợp lời giải cho 6 bài tập trong README:
//   BT1 — Server 3 endpoint JSON in/out
//   BT2 — Middleware chain Logger + Recover + RequestID
//   BT3 — HTTP client với timeout, retry on 5xx
//   BT4 — Signed cookie với HMAC
//   BT5 — CORS middleware đầy đủ
//   BT6 — Reverse proxy 2 upstream round-robin
//
// Chạy: go run solutions.go
//   - Server chính lên cổng :8080 với toàn bộ middleware chain
//   - Endpoint /demo-client gọi nội bộ tới /users để minh hoạ client retry
//   - Endpoint /panic để demo Recover
//   - Endpoint /set-cookie và /read-cookie để demo signed cookie
//
//go:build ignore

package main

import (
	"bytes"
	"context"
	"crypto/hmac"
	"crypto/rand"
	"crypto/sha256"
	"encoding/hex"
	"encoding/json"
	"errors"
	"fmt"
	"io"
	"log"
	mathrand "math/rand"
	"net/http"
	"net/http/httputil"
	"net/url"
	"runtime/debug"
	"strings"
	"sync"
	"sync/atomic"
	"time"
)

// ============================================================================
// In-memory "DB" cho BT1
// ============================================================================

type User struct {
	ID   int    `json:"id"`
	Name string `json:"name"`
	Age  int    `json:"age"`
}

type userStore struct {
	mu     sync.Mutex
	users  []User
	nextID int
}

func newUserStore() *userStore {
	return &userStore{
		users:  []User{{ID: 1, Name: "alice", Age: 30}, {ID: 2, Name: "bob", Age: 25}},
		nextID: 3,
	}
}

func (s *userStore) list() []User {
	s.mu.Lock()
	defer s.mu.Unlock()
	out := make([]User, len(s.users))
	copy(out, s.users)
	return out
}

func (s *userStore) create(name string, age int) User {
	s.mu.Lock()
	defer s.mu.Unlock()
	u := User{ID: s.nextID, Name: name, Age: age}
	s.nextID++
	s.users = append(s.users, u)
	return u
}

// ============================================================================
// Helper: ghi JSON response. Set Content-Type TRƯỚC WriteHeader.
// ============================================================================

func writeJSON(w http.ResponseWriter, status int, v any) {
	w.Header().Set("Content-Type", "application/json; charset=utf-8")
	w.WriteHeader(status)
	_ = json.NewEncoder(w).Encode(v)
}

// ============================================================================
// BT1 — Handler cho 3 endpoint
// ============================================================================

func rootHandler(w http.ResponseWriter, r *http.Request) {
	writeJSON(w, http.StatusOK, map[string]string{
		"service": "users",
		"version": "1.0",
	})
}

func listUsersHandler(store *userStore) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		writeJSON(w, http.StatusOK, store.list())
	}
}

func createUserHandler(store *userStore) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		// Giới hạn body 1MB chống OOM
		r.Body = http.MaxBytesReader(w, r.Body, 1<<20)

		var in struct {
			Name string `json:"name"`
			Age  int    `json:"age"`
		}
		if err := json.NewDecoder(r.Body).Decode(&in); err != nil {
			writeJSON(w, http.StatusBadRequest, map[string]string{"error": "bad json"})
			return
		}
		// Validate input
		name := strings.TrimSpace(in.Name)
		if name == "" || in.Age < 0 || in.Age > 150 {
			writeJSON(w, http.StatusUnprocessableEntity, map[string]string{
				"error": "name không được rỗng; age phải trong [0, 150]",
			})
			return
		}
		u := store.create(name, in.Age)
		w.Header().Set("Location", fmt.Sprintf("/users/%d", u.ID))
		writeJSON(w, http.StatusCreated, u)
	}
}

// Demo path param Go 1.22+
func getUserHandler(store *userStore) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		id := r.PathValue("id")
		for _, u := range store.list() {
			if fmt.Sprintf("%d", u.ID) == id {
				writeJSON(w, http.StatusOK, u)
				return
			}
		}
		writeJSON(w, http.StatusNotFound, map[string]string{"error": "user not found"})
	}
}

// Endpoint cố tình panic để demo Recover middleware
func panicHandler(w http.ResponseWriter, r *http.Request) {
	panic("boom — demo cho Recover middleware")
}

// ============================================================================
// BT2 — Middleware chain
// ============================================================================

// statusRW wrap ResponseWriter để bắt status code Logger ghi log.
type statusRW struct {
	http.ResponseWriter
	status int
	bytes  int
}

func (s *statusRW) WriteHeader(code int) {
	s.status = code
	s.ResponseWriter.WriteHeader(code)
}

func (s *statusRW) Write(b []byte) (int, error) {
	// Nếu handler Write trực tiếp mà không gọi WriteHeader, mặc định là 200.
	if s.status == 0 {
		s.status = http.StatusOK
	}
	n, err := s.ResponseWriter.Write(b)
	s.bytes += n
	return n, err
}

// ctxKey để tránh va chạm với key context của lib khác.
type ctxKey string

const reqIDKey ctxKey = "reqID"

// RequestID middleware: gen ID nếu client chưa gửi, set vào header response + context.
func RequestID(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		id := r.Header.Get("X-Request-ID")
		if id == "" {
			buf := make([]byte, 4)
			_, _ = rand.Read(buf)
			id = "req_" + hex.EncodeToString(buf)
		}
		w.Header().Set("X-Request-ID", id)
		ctx := context.WithValue(r.Context(), reqIDKey, id)
		next.ServeHTTP(w, r.WithContext(ctx))
	})
}

// Recover middleware: bắt panic, trả 500, log stack.
func Recover(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		defer func() {
			if rec := recover(); rec != nil {
				log.Printf("PANIC %v\n%s", rec, debug.Stack())
				// Header chỉ set được nếu chưa WriteHeader. Cố gắng best-effort.
				w.Header().Set("Content-Type", "application/json")
				w.WriteHeader(http.StatusInternalServerError)
				_, _ = w.Write([]byte(`{"error":"internal error"}`))
			}
		}()
		next.ServeHTTP(w, r)
	})
}

// Logger middleware: log method, path, status, duration. Phải wrap ResponseWriter.
func Logger(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		start := time.Now()
		srw := &statusRW{ResponseWriter: w}
		next.ServeHTTP(srw, r)
		reqID, _ := r.Context().Value(reqIDKey).(string)
		log.Printf("[%s] %s %s → %d %dB in %s",
			reqID, r.Method, r.URL.Path, srw.status, srw.bytes, time.Since(start))
	})
}

// Chain compose nhiều middleware. Thứ tự: middleware đầu tiên ngoài cùng.
//   Chain(h, Logger, Recover, RequestID) == Logger(Recover(RequestID(h)))
func Chain(h http.Handler, mws ...func(http.Handler) http.Handler) http.Handler {
	for i := len(mws) - 1; i >= 0; i-- {
		h = mws[i](h)
	}
	return h
}

// ============================================================================
// BT3 — HTTP client với retry on 5xx + jitter
// ============================================================================

// Fetch GET url với timeout + retry. Tôn trọng ctx cancel.
func Fetch(ctx context.Context, client *http.Client, u string) ([]byte, error) {
	const maxAttempts = 3
	var lastErr error

	for attempt := 1; attempt <= maxAttempts; attempt++ {
		req, err := http.NewRequestWithContext(ctx, http.MethodGet, u, nil)
		if err != nil {
			return nil, err
		}
		resp, err := client.Do(req)
		if err == nil && resp.StatusCode < 500 {
			defer resp.Body.Close()
			if resp.StatusCode >= 400 {
				body, _ := io.ReadAll(resp.Body)
				return nil, fmt.Errorf("client error %d: %s", resp.StatusCode, string(body))
			}
			return io.ReadAll(resp.Body)
		}
		// Đóng body nếu có để không leak FD
		if resp != nil {
			resp.Body.Close()
			lastErr = fmt.Errorf("status %d", resp.StatusCode)
		} else {
			lastErr = err
		}
		// Backoff với jitter
		backoff := time.Duration(100*(1<<attempt)) * time.Millisecond
		jitter := time.Duration(mathrand.Int63n(int64(backoff) / 2))
		select {
		case <-time.After(backoff + jitter):
		case <-ctx.Done():
			return nil, ctx.Err()
		}
	}
	return nil, fmt.Errorf("after %d attempts: %w", maxAttempts, lastErr)
}

// ============================================================================
// BT4 — Signed cookie với HMAC
// ============================================================================

func signValue(name, val, secret string) string {
	mac := hmac.New(sha256.New, []byte(secret))
	mac.Write([]byte(name + "|" + val))
	return hex.EncodeToString(mac.Sum(nil))
}

// SetSignedCookie set cookie với value đã sign HMAC.
func SetSignedCookie(w http.ResponseWriter, name, val, secret string) {
	sig := signValue(name, val, secret)
	http.SetCookie(w, &http.Cookie{
		Name:     name,
		Value:    val + "|" + sig,
		Path:     "/",
		HttpOnly: true,
		SameSite: http.SameSiteLaxMode,
		MaxAge:   3600,
		// Secure: true,  // bật khi chạy HTTPS thật
	})
}

// GetSignedCookie đọc + verify cookie. Trả lỗi nếu sig sai (giả mạo).
func GetSignedCookie(r *http.Request, name, secret string) (string, error) {
	c, err := r.Cookie(name)
	if err != nil {
		return "", err
	}
	parts := strings.SplitN(c.Value, "|", 2)
	if len(parts) != 2 {
		return "", errors.New("malformed cookie")
	}
	val, gotSig := parts[0], parts[1]
	wantSig := signValue(name, val, secret)
	// hmac.Equal — constant time, chống timing attack
	if !hmac.Equal([]byte(gotSig), []byte(wantSig)) {
		return "", errors.New("bad signature")
	}
	return val, nil
}

// ============================================================================
// BT5 — CORS middleware
// ============================================================================

// CORS middleware. Echo Origin nếu hợp lệ (không dùng "*" vì cần credentials).
func CORS(allowedOrigins []string) func(http.Handler) http.Handler {
	allowed := make(map[string]bool, len(allowedOrigins))
	for _, o := range allowedOrigins {
		allowed[o] = true
	}
	return func(next http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			origin := r.Header.Get("Origin")
			if origin != "" && allowed[origin] {
				w.Header().Set("Access-Control-Allow-Origin", origin)
				w.Header().Set("Vary", "Origin")
				w.Header().Set("Access-Control-Allow-Credentials", "true")
			}
			// Preflight
			if r.Method == http.MethodOptions {
				w.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE, OPTIONS")
				w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Request-ID")
				w.Header().Set("Access-Control-Max-Age", "86400")
				w.WriteHeader(http.StatusNoContent)
				return
			}
			next.ServeHTTP(w, r)
		})
	}
}

// ============================================================================
// BT6 — Reverse proxy 2 upstream round-robin
// ============================================================================

type roundRobinProxy struct {
	upstreams []*url.URL
	proxies   []*httputil.ReverseProxy
	counter   uint64
}

func newRoundRobinProxy(urls ...string) (*roundRobinProxy, error) {
	rr := &roundRobinProxy{}
	for _, raw := range urls {
		u, err := url.Parse(raw)
		if err != nil {
			return nil, err
		}
		rr.upstreams = append(rr.upstreams, u)
		// Tạo proxy MỘT lần để reuse connection pool
		rr.proxies = append(rr.proxies, httputil.NewSingleHostReverseProxy(u))
	}
	return rr, nil
}

func (rr *roundRobinProxy) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	idx := int(atomic.AddUint64(&rr.counter, 1)-1) % len(rr.proxies)
	log.Printf("[proxy] %s %s → %s", r.Method, r.URL.Path, rr.upstreams[idx])
	rr.proxies[idx].ServeHTTP(w, r)
}

// ============================================================================
// Setup mux + chain middleware + start server
// ============================================================================

const cookieSecret = "demo-secret-do-not-use-in-prod"

func setupServer() http.Handler {
	store := newUserStore()
	mux := http.NewServeMux()

	mux.HandleFunc("GET /", rootHandler)
	mux.HandleFunc("GET /health", func(w http.ResponseWriter, r *http.Request) {
		w.Write([]byte("ok\n"))
	})
	mux.HandleFunc("GET /users", listUsersHandler(store))
	mux.HandleFunc("POST /users", createUserHandler(store))
	mux.HandleFunc("GET /users/{id}", getUserHandler(store))
	mux.HandleFunc("GET /panic", panicHandler)

	// Demo signed cookie
	mux.HandleFunc("GET /set-cookie", func(w http.ResponseWriter, r *http.Request) {
		val := r.URL.Query().Get("v")
		if val == "" {
			val = "alice"
		}
		SetSignedCookie(w, "session", val, cookieSecret)
		writeJSON(w, http.StatusOK, map[string]string{"set": val})
	})
	mux.HandleFunc("GET /read-cookie", func(w http.ResponseWriter, r *http.Request) {
		v, err := GetSignedCookie(r, "session", cookieSecret)
		if err != nil {
			writeJSON(w, http.StatusUnauthorized, map[string]string{"error": err.Error()})
			return
		}
		writeJSON(w, http.StatusOK, map[string]string{"value": v})
	})

	// Demo client retry: tự gọi /flaky bên trong
	mux.HandleFunc("GET /flaky", flakyHandler())
	mux.HandleFunc("GET /demo-client", func(w http.ResponseWriter, r *http.Request) {
		client := &http.Client{Timeout: 5 * time.Second}
		body, err := Fetch(r.Context(), client, "http://"+r.Host+"/flaky")
		if err != nil {
			writeJSON(w, http.StatusBadGateway, map[string]string{"error": err.Error()})
			return
		}
		writeJSON(w, http.StatusOK, map[string]string{"upstream_body": string(body)})
	})

	// Chain middleware: Logger ngoài cùng, Recover sát handler.
	// Thứ tự execution: Logger.before → Recover.before → RequestID.before → handler → ngược lại.
	return Chain(
		mux,
		CORS([]string{"http://localhost:3000", "https://app.example.com"}),
		Logger,
		Recover,
		RequestID,
	)
}

// flakyHandler trả 503 hai lần đầu, lần thứ 3 trả 200. Demo cho retry client.
func flakyHandler() http.HandlerFunc {
	var n uint64
	return func(w http.ResponseWriter, r *http.Request) {
		c := atomic.AddUint64(&n, 1)
		if c%3 != 0 {
			w.Header().Set("Retry-After", "1")
			writeJSON(w, http.StatusServiceUnavailable, map[string]string{
				"error":   "tạm down",
				"attempt": fmt.Sprintf("%d", c),
			})
			return
		}
		writeJSON(w, http.StatusOK, map[string]string{
			"ok":      "true",
			"attempt": fmt.Sprintf("%d", c),
		})
	}
}

// runDemoClient minh hoạ client với custom Transport + retry, gọi server vừa start.
func runDemoClient(serverAddr string) {
	time.Sleep(500 * time.Millisecond) // chờ server lên

	client := &http.Client{
		Timeout: 5 * time.Second,
		Transport: &http.Transport{
			MaxIdleConns:        10,
			MaxIdleConnsPerHost: 5,
			IdleConnTimeout:     30 * time.Second,
		},
	}

	// Test POST /users
	body := bytes.NewReader([]byte(`{"name":"charlie","age":28}`))
	req, _ := http.NewRequest(http.MethodPost, "http://"+serverAddr+"/users", body)
	req.Header.Set("Content-Type", "application/json")
	resp, err := client.Do(req)
	if err != nil {
		log.Printf("[demo-client] POST /users error: %v", err)
		return
	}
	respBody, _ := io.ReadAll(resp.Body)
	resp.Body.Close()
	log.Printf("[demo-client] POST /users → %d %s", resp.StatusCode, strings.TrimSpace(string(respBody)))

	// Test retry với /flaky
	data, err := Fetch(context.Background(), client, "http://"+serverAddr+"/flaky")
	if err != nil {
		log.Printf("[demo-client] /flaky after retry: %v", err)
	} else {
		log.Printf("[demo-client] /flaky retry success: %s", strings.TrimSpace(string(data)))
	}
}

// runReverseProxyDemo start một reverse proxy round-robin trên cổng 9000.
// Trỏ tới 2 upstream giả lập (cổng 9001, 9002 — không có server thật chạy,
// mục đích chỉ minh hoạ code build được và setup đúng).
func setupReverseProxy() *http.Server {
	rr, _ := newRoundRobinProxy("http://localhost:9001", "http://localhost:9002")
	return &http.Server{
		Addr:    ":9000",
		Handler: rr,
	}
}

func main() {
	const addr = ":8080"

	server := &http.Server{
		Addr:              addr,
		Handler:           setupServer(),
		ReadTimeout:       5 * time.Second,
		ReadHeaderTimeout: 2 * time.Second,
		WriteTimeout:      10 * time.Second,
		IdleTimeout:       120 * time.Second,
	}

	// Demo client chạy song song với server
	go runDemoClient(addr)

	log.Printf("L42 demo server lên cổng %s", addr)
	log.Printf("Thử: curl localhost:8080/health")
	log.Printf("     curl localhost:8080/users")
	log.Printf("     curl -X POST -d '{\"name\":\"x\",\"age\":30}' -H 'Content-Type: application/json' localhost:8080/users")
	log.Printf("     curl -v localhost:8080/panic           (Recover demo)")
	log.Printf("     curl -v localhost:8080/set-cookie?v=test")
	log.Printf("     curl -v --cookie 'session=test|<sig>' localhost:8080/read-cookie")

	if err := server.ListenAndServe(); err != nil && !errors.Is(err, http.ErrServerClosed) {
		log.Fatal(err)
	}
}
