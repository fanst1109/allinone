// Package main minh hoạ các design pattern idiomatic trong Go cho Lesson 39.
//
// Chạy:  go run solutions.go
//
// Mỗi phần được tổ chức thành section riêng để dễ đọc. Hàm main() ở cuối file
// chạy demo cho từng pattern.
package main

import (
	"bytes"
	"compress/gzip"
	"context"
	"errors"
	"fmt"
	"io"
	"log"
	"net/http"
	"net/http/httptest"
	"strings"
	"sync"
	"time"
)

// ============================================================================
// 1. Functional Options Pattern
// ============================================================================
//
// Server có nhiều cấu hình tuỳ chọn. Thay vì constructor "ngộp" tham số, ta
// định nghĩa mỗi tuỳ chọn là một function biến đổi Server.

type Server struct {
	host         string
	port         int
	tls          bool
	certFile     string
	keyFile      string
	readTimeout  time.Duration
	writeTimeout time.Duration
	maxConns     int
	logger       *log.Logger
}

// Option là một biến đổi áp lên Server trong quá trình build.
type Option func(*Server)

// WithHost cấu hình địa chỉ bind.
func WithHost(h string) Option { return func(s *Server) { s.host = h } }

// WithPort cấu hình cổng lắng nghe.
func WithPort(p int) Option { return func(s *Server) { s.port = p } }

// WithTLS bật TLS với cặp cert/key.
func WithTLS(certFile, keyFile string) Option {
	return func(s *Server) {
		s.tls = true
		s.certFile = certFile
		s.keyFile = keyFile
	}
}

// WithReadTimeout cấu hình thời gian đọc tối đa cho mỗi request.
func WithReadTimeout(d time.Duration) Option { return func(s *Server) { s.readTimeout = d } }

// WithMaxConns giới hạn số kết nối đồng thời.
func WithMaxConns(n int) Option { return func(s *Server) { s.maxConns = n } }

// WithLogger inject logger custom.
func WithLogger(l *log.Logger) Option { return func(s *Server) { s.logger = l } }

// NewServer build Server với default tốt + áp option theo thứ tự.
func NewServer(opts ...Option) *Server {
	s := &Server{
		host:         "0.0.0.0",
		port:         8080,
		readTimeout:  5 * time.Second,
		writeTimeout: 5 * time.Second,
		maxConns:     100,
		logger:       log.Default(),
	}
	for _, o := range opts {
		o(s)
	}
	return s
}

func (s *Server) String() string {
	return fmt.Sprintf("Server{host=%s, port=%d, tls=%v, readTimeout=%s, maxConns=%d}",
		s.host, s.port, s.tls, s.readTimeout, s.maxConns)
}

// ============================================================================
// 2. Middleware Chain (Decorator)
// ============================================================================
//
// Middleware bao gói http.Handler thành http.Handler — cho phép compose theo
// thứ tự từ ngoài vào trong.

// Middleware là một decorator chuyển handler "ruột" thành handler "ngoài".
type Middleware func(http.Handler) http.Handler

// Logger ghi log method + path + duration mỗi request.
func Logger(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		start := time.Now()
		log.Printf("→ %s %s", r.Method, r.URL.Path)
		next.ServeHTTP(w, r)
		log.Printf("← %s %s (%s)", r.Method, r.URL.Path, time.Since(start))
	})
}

// Auth từ chối request thiếu header Authorization.
func Auth(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		if r.Header.Get("Authorization") == "" {
			http.Error(w, "unauthorized", http.StatusUnauthorized)
			return
		}
		next.ServeHTTP(w, r)
	})
}

// Recover bắt panic trong chain, trả 500.
func Recover(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		defer func() {
			if rec := recover(); rec != nil {
				log.Printf("panic: %v", rec)
				http.Error(w, "internal server error", http.StatusInternalServerError)
			}
		}()
		next.ServeHTTP(w, r)
	})
}

// Chain compose nhiều middleware. Chain(h, A, B, C) = A(B(C(h))).
func Chain(h http.Handler, mws ...Middleware) http.Handler {
	for i := len(mws) - 1; i >= 0; i-- {
		h = mws[i](h)
	}
	return h
}

// ============================================================================
// 3. Pub-Sub Broker với channel
// ============================================================================
//
// Broker generic giữ map subscriber → channel. Publish gửi event tới mọi sub
// theo non-blocking select (drop nếu sub đầy buffer).

// Broker quản lý đăng ký và phát event tới nhiều subscriber.
type Broker[T any] struct {
	mu   sync.Mutex
	subs map[int]chan T
	next int
}

// NewBroker tạo broker rỗng.
func NewBroker[T any]() *Broker[T] {
	return &Broker[T]{subs: make(map[int]chan T)}
}

// Subscribe trả về channel nhận event và hàm unsub (idempotent).
func (b *Broker[T]) Subscribe(buf int) (<-chan T, func()) {
	b.mu.Lock()
	defer b.mu.Unlock()
	id := b.next
	b.next++
	ch := make(chan T, buf)
	b.subs[id] = ch
	unsub := func() {
		b.mu.Lock()
		defer b.mu.Unlock()
		if c, ok := b.subs[id]; ok {
			delete(b.subs, id)
			close(c)
		}
	}
	return ch, unsub
}

// Publish gửi event tới mọi sub. Sub đầy buffer → drop event đó (không block).
func (b *Broker[T]) Publish(ev T) {
	b.mu.Lock()
	defer b.mu.Unlock()
	for _, ch := range b.subs {
		select {
		case ch <- ev:
		default: // subscriber chậm → drop
		}
	}
}

// ============================================================================
// 4. Repository Pattern
// ============================================================================
//
// UserRepo là interface abstract persistence. Production: PostgresUserRepo
// (stub trong demo). Test: InMemoryUserRepo dùng map + mutex.

// User là entity domain.
type User struct {
	ID        uint64
	Email     string
	CreatedAt time.Time
}

// ErrUserNotFound là sentinel error cho not-found.
var ErrUserNotFound = errors.New("user not found")

// UserRepo abstract chỗ data sống.
type UserRepo interface {
	GetByID(ctx context.Context, id uint64) (*User, error)
	Save(ctx context.Context, u *User) error
	Delete(ctx context.Context, id uint64) error
}

// InMemoryUserRepo dùng cho test — không cần DB.
type InMemoryUserRepo struct {
	mu    sync.Mutex
	store map[uint64]*User
}

// NewInMemoryUserRepo khởi tạo repo rỗng.
func NewInMemoryUserRepo() *InMemoryUserRepo {
	return &InMemoryUserRepo{store: make(map[uint64]*User)}
}

func (r *InMemoryUserRepo) GetByID(_ context.Context, id uint64) (*User, error) {
	r.mu.Lock()
	defer r.mu.Unlock()
	u, ok := r.store[id]
	if !ok {
		return nil, ErrUserNotFound
	}
	return u, nil
}

func (r *InMemoryUserRepo) Save(_ context.Context, u *User) error {
	r.mu.Lock()
	defer r.mu.Unlock()
	r.store[u.ID] = u
	return nil
}

func (r *InMemoryUserRepo) Delete(_ context.Context, id uint64) error {
	r.mu.Lock()
	defer r.mu.Unlock()
	delete(r.store, id)
	return nil
}

// UserService chứa business logic, phụ thuộc interface UserRepo.
type UserService struct {
	repo UserRepo
	nextID uint64
}

// NewUserService factory.
func NewUserService(r UserRepo) *UserService { return &UserService{repo: r} }

// Register tạo user mới sau khi validate email.
func (s *UserService) Register(ctx context.Context, email string) (*User, error) {
	if !strings.Contains(email, "@") {
		return nil, fmt.Errorf("invalid email: %q", email)
	}
	s.nextID++
	u := &User{
		ID:        s.nextID,
		Email:     strings.ToLower(email),
		CreatedAt: time.Now().UTC(),
	}
	if err := s.repo.Save(ctx, u); err != nil {
		return nil, fmt.Errorf("save user: %w", err)
	}
	return u, nil
}

// ============================================================================
// 5. Strategy Pattern: Compressor
// ============================================================================
//
// Compressor interface định nghĩa contract. Multiple impl swap được runtime.

// Compressor nén byte slice. Name() để log / chọn extension file.
type Compressor interface {
	Compress(src []byte) ([]byte, error)
	Name() string
}

// GzipCompressor dùng compress/gzip.
type GzipCompressor struct{ Level int }

func (g GzipCompressor) Compress(src []byte) ([]byte, error) {
	var buf bytes.Buffer
	gw, err := gzip.NewWriterLevel(&buf, g.Level)
	if err != nil {
		return nil, err
	}
	if _, err := gw.Write(src); err != nil {
		return nil, err
	}
	if err := gw.Close(); err != nil {
		return nil, err
	}
	return buf.Bytes(), nil
}
func (GzipCompressor) Name() string { return "gzip" }

// NoOpCompressor không nén — debug, hoặc khi data đã nén sẵn.
type NoOpCompressor struct{}

func (NoOpCompressor) Compress(src []byte) ([]byte, error) {
	out := make([]byte, len(src))
	copy(out, src)
	return out, nil
}
func (NoOpCompressor) Name() string { return "none" }

// SaveBlob phụ thuộc interface, không phải concrete.
func SaveBlob(c Compressor, data []byte) (string, []byte, error) {
	out, err := c.Compress(data)
	if err != nil {
		return "", nil, err
	}
	return c.Name(), out, nil
}

// ============================================================================
// 6. Singleton với sync.Once
// ============================================================================
//
// DB-like resource init lazy + thread-safe.

type fakeDB struct{ url string }

var (
	dbOnce sync.Once
	dbInst *fakeDB
)

// GetDB trả singleton DB, init đúng 1 lần kể cả nhiều goroutine cùng gọi.
func GetDB() *fakeDB {
	dbOnce.Do(func() {
		dbInst = &fakeDB{url: "postgres://localhost/app"}
		// trong production: sql.Open(...), gọi Ping, ...
	})
	return dbInst
}

// ============================================================================
// 7. Null Object
// ============================================================================

// Logger interface cho service (tách biệt với log.Logger của stdlib).
type AppLogger interface {
	Info(msg string)
	Error(msg string, err error)
}

// StdLogger in ra stdout (impl production).
type StdLogger struct{}

func (StdLogger) Info(m string)             { fmt.Println("[INFO]", m) }
func (StdLogger) Error(m string, err error) { fmt.Println("[ERR ]", m, err) }

// NoOpLogger không làm gì — dùng làm default thay vì để nil.
type NoOpLogger struct{}

func (NoOpLogger) Info(string)             {}
func (NoOpLogger) Error(string, error)     {}

// ============================================================================
// Demo trong main()
// ============================================================================

func main() {
	fmt.Println("=== 1. Functional Options ===")
	s1 := NewServer()
	s2 := NewServer(WithPort(9090), WithTLS("cert.pem", "key.pem"), WithMaxConns(500))
	fmt.Println("default:", s1)
	fmt.Println("custom :", s2)

	fmt.Println("\n=== 2. Middleware Chain ===")
	demoMiddleware()

	fmt.Println("\n=== 3. Pub-Sub Broker ===")
	demoBroker()

	fmt.Println("\n=== 4. Repository ===")
	demoRepository()

	fmt.Println("\n=== 5. Strategy (Compressor) ===")
	demoStrategy()

	fmt.Println("\n=== 6. Singleton sync.Once ===")
	db1 := GetDB()
	db2 := GetDB()
	fmt.Println("db1 == db2:", db1 == db2, "url=", db1.url)

	fmt.Println("\n=== 7. Null Object ===")
	useLogger(StdLogger{})
	useLogger(NoOpLogger{}) // không in gì
	fmt.Println("(NoOpLogger không in dòng nào ở trên — đó là điểm)")
}

func demoMiddleware() {
	base := http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.WriteHeader(http.StatusOK)
		_, _ = io.WriteString(w, "ok")
	})
	handler := Chain(base, Recover, Logger, Auth)

	// (a) success
	r1 := httptest.NewRequest("GET", "/users", nil)
	r1.Header.Set("Authorization", "Bearer token")
	w1 := httptest.NewRecorder()
	handler.ServeHTTP(w1, r1)
	fmt.Printf("[success] status=%d body=%q\n", w1.Code, w1.Body.String())

	// (b) no token
	r2 := httptest.NewRequest("GET", "/users", nil)
	w2 := httptest.NewRecorder()
	handler.ServeHTTP(w2, r2)
	fmt.Printf("[no auth] status=%d body=%q\n", w2.Code, strings.TrimSpace(w2.Body.String()))

	// (c) panic in handler
	panicBase := http.HandlerFunc(func(http.ResponseWriter, *http.Request) {
		panic("boom")
	})
	handler2 := Chain(panicBase, Recover, Logger, Auth)
	r3 := httptest.NewRequest("GET", "/x", nil)
	r3.Header.Set("Authorization", "Bearer t")
	w3 := httptest.NewRecorder()
	handler2.ServeHTTP(w3, r3)
	fmt.Printf("[panic]   status=%d body=%q\n", w3.Code, strings.TrimSpace(w3.Body.String()))
}

func demoBroker() {
	b := NewBroker[string]()
	c1, unsub1 := b.Subscribe(4)
	c2, _ := b.Subscribe(4)

	var wg sync.WaitGroup
	wg.Add(2)
	go func() {
		defer wg.Done()
		for ev := range c1 {
			fmt.Println("  sub1 ←", ev)
		}
		fmt.Println("  sub1 closed")
	}()
	go func() {
		defer wg.Done()
		for ev := range c2 {
			fmt.Println("  sub2 ←", ev)
		}
		fmt.Println("  sub2 closed")
	}()

	b.Publish("login")
	b.Publish("checkout")
	time.Sleep(20 * time.Millisecond)
	unsub1() // sub1 đóng
	b.Publish("logout")
	time.Sleep(20 * time.Millisecond)

	// Đóng sub2 bằng cách tự gọi unsub thật → đơn giản hoá: dùng pattern bên trong Subscribe
	// Để demo gọn, tạo unsub2 lại bằng cách subscribe và lấy unsub mới sẽ phức tạp;
	// thay vào đó chỉ wait một lúc rồi return.
	// Trong code thực, lưu cả 2 unsub và gọi.
	// Ở đây nhường lại cho gc khi process exit (test thôi).
	_ = c2
}

func demoRepository() {
	ctx := context.Background()
	repo := NewInMemoryUserRepo()
	svc := NewUserService(repo)

	u, err := svc.Register(ctx, "alice@example.com")
	if err != nil {
		fmt.Println("register err:", err)
		return
	}
	fmt.Printf("registered: id=%d email=%s\n", u.ID, u.Email)

	got, err := repo.GetByID(ctx, u.ID)
	if err != nil {
		fmt.Println("getbyid err:", err)
		return
	}
	fmt.Printf("fetched   : id=%d email=%s\n", got.ID, got.Email)

	// Try invalid email
	if _, err := svc.Register(ctx, "no-at-sign"); err != nil {
		fmt.Println("validate :", err)
	}

	// not found
	if _, err := repo.GetByID(ctx, 999); errors.Is(err, ErrUserNotFound) {
		fmt.Println("not found : ErrUserNotFound (đúng như mong đợi)")
	}
}

func demoStrategy() {
	data := []byte(strings.Repeat("hello world ", 200)) // ~2400 bytes lặp lại

	for _, c := range []Compressor{
		GzipCompressor{Level: gzip.BestSpeed},
		GzipCompressor{Level: gzip.BestCompression},
		NoOpCompressor{},
	} {
		name, out, err := SaveBlob(c, data)
		if err != nil {
			fmt.Printf("[%s] err: %v\n", name, err)
			continue
		}
		ratio := float64(len(out)) / float64(len(data)) * 100
		fmt.Printf("[%-4s] in=%d bytes  out=%d bytes  (%.1f%%)\n", name, len(data), len(out), ratio)
	}
}

func useLogger(l AppLogger) {
	l.Info("starting operation")
	l.Error("something failed", errors.New("oops"))
}
