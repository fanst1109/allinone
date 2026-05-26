// Package main — Demo router stdlib Go 1.22+ cho Lesson 44.
//
// File này CHỈ DÙNG `net/http` (stdlib) — biên dịch không cần thêm
// dependency. Lý do: mọi pattern dưới đây đều áp dụng được cho chi/gin/echo
// (chỉ khác cú pháp). Khi cần dùng external framework, comment chỉ rõ
// "trong chi viết là...", "trong gin viết là...".
//
// Build & run:
//
//	cd Programming/lesson-44-routing-frameworks
//	go run solutions.go
//	# sau đó thử:
//	curl http://localhost:8080/health
//	curl http://localhost:8080/v1/users/42
//	curl -X POST http://localhost:8080/v1/users -d '{"name":"Alice","email":"a@x.io"}'
//	curl http://localhost:8080/v2/users/42
package main

import (
	"context"
	"encoding/json"
	"fmt"
	"log"
	"math"
	"net/http"
	"strconv"
	"strings"
	"sync"
	"time"
)

// -----------------------------------------------------------------------------
// Domain types
// -----------------------------------------------------------------------------

type User struct {
	ID    int    `json:"id"`
	Name  string `json:"name"`
	Email string `json:"email"`
}

// store giả lập DB in-memory — đủ để demo.
var (
	storeMu sync.Mutex
	store   = map[int]*User{
		1:  {ID: 1, Name: "Alice", Email: "alice@example.com"},
		42: {ID: 42, Name: "Bob", Email: "bob@example.com"},
	}
	nextID = 100
)

// -----------------------------------------------------------------------------
// Middleware — pattern chuẩn `func(http.Handler) http.Handler`.
// chi 100% tương thích pattern này. gin/echo/fiber dùng custom Context khác.
// -----------------------------------------------------------------------------

// loggerMW ghi log mỗi request và đo thời gian xử lý.
// Tương đương:
//
//	chi: r.Use(middleware.Logger)
//	gin: r.Use(gin.Logger())  (đã include trong gin.Default())
func loggerMW(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		start := time.Now()
		// Wrap ResponseWriter để bắt status code (mặc định 200 nếu không gọi WriteHeader)
		rw := &statusRecorder{ResponseWriter: w, status: http.StatusOK}
		next.ServeHTTP(rw, r)
		log.Printf("%s %s -> %d (%v)", r.Method, r.URL.Path, rw.status, time.Since(start))
	})
}

type statusRecorder struct {
	http.ResponseWriter
	status int
}

func (sr *statusRecorder) WriteHeader(code int) {
	sr.status = code
	sr.ResponseWriter.WriteHeader(code)
}

// recoverMW bắt panic, log stack, trả 500.
// Tương đương:
//
//	chi: r.Use(middleware.Recoverer)
//	gin: gin.Recovery() (default)
func recoverMW(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		defer func() {
			if rec := recover(); rec != nil {
				log.Printf("PANIC: %v", rec)
				http.Error(w, "internal error", http.StatusInternalServerError)
			}
		}()
		next.ServeHTTP(w, r)
	})
}

// authMW kiểm tra header `Authorization: Bearer <token>`.
// Demo đơn giản: token "secret" coi là hợp lệ.
//
//	chi: r.Use(authMW)            (giống y hệt)
//	gin: r.Use(func(c *gin.Context){ if ... { c.AbortWithStatusJSON(401, ...); return }; c.Next() })
func authMW(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		auth := r.Header.Get("Authorization")
		if auth != "Bearer secret" {
			http.Error(w, "unauthorized", http.StatusUnauthorized)
			return
		}
		next.ServeHTTP(w, r)
	})
}

// rateLimitMW — token bucket per-IP.
// Mỗi giây nạp `rps` token, mỗi request lấy 1 token, hết → 429.
//
// Production: dùng `golang.org/x/time/rate` hoặc redis-based để share state
// giữa nhiều instance.
func rateLimitMW(rps float64) func(http.Handler) http.Handler {
	type bucket struct {
		tokens float64
		last   time.Time
	}
	var mu sync.Mutex
	buckets := map[string]*bucket{}

	return func(next http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			ip := strings.Split(r.RemoteAddr, ":")[0]
			mu.Lock()
			b, ok := buckets[ip]
			if !ok {
				b = &bucket{tokens: rps, last: time.Now()}
				buckets[ip] = b
			}
			elapsed := time.Since(b.last).Seconds()
			b.tokens = math.Min(rps, b.tokens+elapsed*rps)
			b.last = time.Now()
			if b.tokens < 1 {
				mu.Unlock()
				w.Header().Set("Retry-After", "1")
				http.Error(w, "rate limit", http.StatusTooManyRequests)
				return
			}
			b.tokens--
			mu.Unlock()
			next.ServeHTTP(w, r)
		})
	}
}

// chain compose nhiều middleware lại — đơn giản hoá cú pháp.
// Sau khi có chain, ta viết:
//
//	mux.Handle("GET /users/{id}", chain(getUser, loggerMW, recoverMW, authMW))
//
// trong chi syntax: r.Use(loggerMW, recoverMW, authMW); r.Get(...)
func chain(h http.Handler, mws ...func(http.Handler) http.Handler) http.Handler {
	// Áp dụng ngược: middleware đầu tiên ở danh sách = ngoài cùng (chạy đầu tiên)
	for i := len(mws) - 1; i >= 0; i-- {
		h = mws[i](h)
	}
	return h
}

// -----------------------------------------------------------------------------
// Sub-router pattern — Go 1.22+ ServeMux KHÔNG hỗ trợ nested Route(),
// nhưng ta có thể tự "mount" 1 mux con dưới prefix bằng `http.StripPrefix`.
// -----------------------------------------------------------------------------

// v1Routes trả về sub-mux cho /v1/* — response gọn (chỉ id+name).
//
//	Tương đương chi: r.Route("/v1", func(r chi.Router) { ... })
func v1Routes() http.Handler {
	mux := http.NewServeMux()
	mux.HandleFunc("GET /users/{id}", v1GetUser)
	mux.HandleFunc("POST /users", v1CreateUser)
	return mux
}

// v2Routes — response đầy đủ (id, name, email).
func v2Routes() http.Handler {
	mux := http.NewServeMux()
	mux.HandleFunc("GET /users/{id}", v2GetUser)
	mux.HandleFunc("POST /users", v2CreateUser)
	return mux
}

// -----------------------------------------------------------------------------
// Handlers
// -----------------------------------------------------------------------------

func health(w http.ResponseWriter, r *http.Request) {
	writeJSON(w, http.StatusOK, map[string]string{"status": "ok"})
}

// v1GetUser trả response v1: chỉ {id, name}.
//
//	Tương đương chi: chi.URLParam(r, "id")
//	Tương đương gin: c.Param("id")
func v1GetUser(w http.ResponseWriter, r *http.Request) {
	idStr := r.PathValue("id") // Go 1.22+ path param
	id, err := strconv.Atoi(idStr)
	if err != nil {
		writeJSON(w, http.StatusBadRequest, map[string]string{"error": "bad id"})
		return
	}
	storeMu.Lock()
	u, ok := store[id]
	storeMu.Unlock()
	if !ok {
		writeJSON(w, http.StatusNotFound, map[string]string{"error": "not found"})
		return
	}
	writeJSON(w, http.StatusOK, map[string]any{
		"id":   u.ID,
		"name": u.Name,
	})
}

// v2GetUser trả full struct (có email).
func v2GetUser(w http.ResponseWriter, r *http.Request) {
	idStr := r.PathValue("id")
	id, err := strconv.Atoi(idStr)
	if err != nil {
		writeJSON(w, http.StatusBadRequest, map[string]string{"error": "bad id"})
		return
	}
	storeMu.Lock()
	u, ok := store[id]
	storeMu.Unlock()
	if !ok {
		writeJSON(w, http.StatusNotFound, map[string]string{"error": "not found"})
		return
	}
	writeJSON(w, http.StatusOK, u)
}

func v1CreateUser(w http.ResponseWriter, r *http.Request) {
	var in User
	if err := json.NewDecoder(r.Body).Decode(&in); err != nil {
		writeJSON(w, http.StatusBadRequest, map[string]string{"error": "bad json"})
		return
	}
	// Validation thủ công — tương đương `binding:"required"` của gin.
	if in.Name == "" {
		writeJSON(w, http.StatusUnprocessableEntity, map[string]string{"error": "name required"})
		return
	}
	storeMu.Lock()
	in.ID = nextID
	nextID++
	store[in.ID] = &in
	storeMu.Unlock()
	writeJSON(w, http.StatusCreated, map[string]any{"id": in.ID, "name": in.Name})
}

func v2CreateUser(w http.ResponseWriter, r *http.Request) {
	var in User
	if err := json.NewDecoder(r.Body).Decode(&in); err != nil {
		writeJSON(w, http.StatusBadRequest, map[string]string{"error": "bad json"})
		return
	}
	if in.Name == "" || in.Email == "" {
		writeJSON(w, http.StatusUnprocessableEntity, map[string]string{"error": "name+email required"})
		return
	}
	storeMu.Lock()
	in.ID = nextID
	nextID++
	store[in.ID] = &in
	storeMu.Unlock()
	writeJSON(w, http.StatusCreated, in)
}

// -----------------------------------------------------------------------------
// Per-route middleware — pattern "loadUser" set vào context
// -----------------------------------------------------------------------------

type ctxKey string

const userCtxKey ctxKey = "user"

func loadUserMW(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		idStr := r.PathValue("id")
		id, err := strconv.Atoi(idStr)
		if err != nil {
			http.Error(w, "bad id", http.StatusBadRequest)
			return
		}
		storeMu.Lock()
		u, ok := store[id]
		storeMu.Unlock()
		if !ok {
			http.Error(w, "user not found", http.StatusNotFound)
			return
		}
		ctx := context.WithValue(r.Context(), userCtxKey, u)
		next.ServeHTTP(w, r.WithContext(ctx))
	})
}

// getUserCtx demo: handler lấy user từ context (do loadUserMW set sẵn).
func getUserCtx(w http.ResponseWriter, r *http.Request) {
	u, ok := r.Context().Value(userCtxKey).(*User)
	if !ok {
		http.Error(w, "user not in ctx", http.StatusInternalServerError)
		return
	}
	writeJSON(w, http.StatusOK, u)
}

// -----------------------------------------------------------------------------
// Helpers
// -----------------------------------------------------------------------------

func writeJSON(w http.ResponseWriter, status int, v any) {
	w.Header().Set("Content-Type", "application/json; charset=utf-8")
	w.WriteHeader(status)
	_ = json.NewEncoder(w).Encode(v)
}

// -----------------------------------------------------------------------------
// main — wire toàn bộ router
// -----------------------------------------------------------------------------

func main() {
	root := http.NewServeMux()

	// Public — không cần auth
	root.HandleFunc("GET /health", health)

	// Sub-router /v1/* và /v2/* — mount qua StripPrefix
	root.Handle("/v1/", http.StripPrefix("/v1", v1Routes()))
	root.Handle("/v2/", http.StripPrefix("/v2", v2Routes()))

	// Route dùng per-route middleware: GET /me/{id} có loadUserMW
	root.Handle("GET /me/{id}", chain(http.HandlerFunc(getUserCtx), loadUserMW))

	// Route protected — cần auth
	root.Handle("GET /admin/users/{id}", chain(http.HandlerFunc(v2GetUser),
		authMW))

	// Global middleware chain — bọc ngoài cùng
	// Thứ tự: logger (outermost) -> recover -> rateLimit -> root
	handler := chain(root,
		loggerMW,
		recoverMW,
		rateLimitMW(100), // 100 req/s/IP
	)

	addr := ":8080"
	fmt.Printf("listening on %s\n", addr)
	fmt.Println("  GET  /health                       — public")
	fmt.Println("  GET  /v1/users/{id}                — v1 response (id+name)")
	fmt.Println("  POST /v1/users                     — create user")
	fmt.Println("  GET  /v2/users/{id}                — v2 response (full)")
	fmt.Println("  POST /v2/users                     — create user")
	fmt.Println("  GET  /me/{id}                      — load user vào context")
	fmt.Println("  GET  /admin/users/{id}             — yêu cầu Authorization: Bearer secret")

	if err := http.ListenAndServe(addr, handler); err != nil {
		log.Fatal(err)
	}
}
