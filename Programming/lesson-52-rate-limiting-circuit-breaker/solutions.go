// Lesson 52 — Rate Limiting & Circuit Breaker
//
// File này cài đặt thủ công (không dùng thư viện ngoài) các pattern cốt lõi:
//   - TokenBucket   : token bucket với lazy refill, concurrent-safe (BT1).
//   - LeakyBucket   : leaky bucket — output đều, drop khi queue đầy (mục 3.2).
//   - FixedWindow   : fixed window counter, reset mỗi window (mục 3.3).
//   - Breaker       : circuit breaker state machine Closed/Open/Half-Open (BT4).
//   - UserLimiter   : middleware rate limit theo từng key (per-IP / per-user) (BT5).
//
// Chạy demo:  go run solutions.go
// Biên dịch:  go build (cần Go 1.21+).
//
// Toàn bộ comment bằng tiếng Việt để hỗ trợ học.
package main

import (
	"fmt"
	"math"
	"net"
	"net/http"
	"strconv"
	"sync"
	"time"
)

// =============================================================================
// 1. TOKEN BUCKET — "rổ token nạp đều, mỗi request nhặt 1 token"
// =============================================================================
//
// Ý tưởng "lazy refill": KHÔNG chạy goroutine timer riêng. Mỗi lần Allow() được
// gọi, ta tính số token cần nạp thêm dựa trên thời gian đã trôi qua kể từ lần
// refill trước (elapsed × refillRate), giới hạn không vượt capacity.
//
//	tokens = min(capacity, tokens + elapsed * refillRate)
//
// Ưu điểm: O(1) mỗi request, O(1) bộ nhớ, không tốn goroutine.
type TokenBucket struct {
	mu         sync.Mutex
	capacity   float64   // B — sức chứa tối đa (cho phép burst tới B request)
	tokens     float64   // số token hiện có (float để refill mượt theo thời gian)
	refillRate float64   // R — số token nạp thêm mỗi giây
	lastRefill time.Time // mốc thời gian của lần refill gần nhất
}

// NewTokenBucket tạo bucket khởi đầu ĐẦY (đủ capacity token) để cho phép burst ngay.
func NewTokenBucket(capacity int, refillRate float64) *TokenBucket {
	return &TokenBucket{
		capacity:   float64(capacity),
		tokens:     float64(capacity),
		refillRate: refillRate,
		lastRefill: time.Now(),
	}
}

// Allow trả về true nếu còn token (và trừ 1 token), false nếu rổ rỗng.
// Concurrent-safe nhờ mutex. Không block — fail fast cho HTTP handler.
func (b *TokenBucket) Allow() bool {
	return b.AllowN(1)
}

// AllowN tiêu thụ n token cùng lúc (vd: streaming tính theo byte → n = số byte).
func (b *TokenBucket) AllowN(n float64) bool {
	b.mu.Lock()
	defer b.mu.Unlock()

	now := time.Now()
	// Lazy refill: nạp token tương ứng thời gian đã trôi qua.
	elapsed := now.Sub(b.lastRefill).Seconds()
	b.tokens = math.Min(b.capacity, b.tokens+elapsed*b.refillRate)
	b.lastRefill = now

	if b.tokens >= n {
		b.tokens -= n
		return true
	}
	return false
}

// Tokens trả về số token hiện tại (sau khi refill) — dùng cho header X-RateLimit-Remaining.
func (b *TokenBucket) Tokens() float64 {
	b.mu.Lock()
	defer b.mu.Unlock()
	now := time.Now()
	elapsed := now.Sub(b.lastRefill).Seconds()
	b.tokens = math.Min(b.capacity, b.tokens+elapsed*b.refillRate)
	b.lastRefill = now
	return b.tokens
}

// =============================================================================
// 2. LEAKY BUCKET — "xô có lỗ rò, đầu ra đều đặn"
// =============================================================================
//
// Khác token bucket: request VÀO bất kỳ lúc nào, nhưng OUTPUT luôn đều R/giây.
// Ở đây mô hình hoá bằng "mức nước" trong xô:
//   - Mỗi request thêm 1 đơn vị nước vào xô.
//   - Nước rò ra với tốc độ leakRate/giây (lazy: tính theo elapsed như refill).
//   - Xô đầy (>= capacity) → request bị DROP.
//
// Đây là dạng "leaky bucket as a meter" — phổ biến và O(1), không cần queue thật.
type LeakyBucket struct {
	mu       sync.Mutex
	capacity float64   // kích thước xô (số request tối đa đang chờ rò)
	water    float64   // mức nước hiện tại
	leakRate float64   // tốc độ rò (request/giây) = output rate
	lastLeak time.Time // mốc thời gian rò gần nhất
}

func NewLeakyBucket(capacity int, leakRate float64) *LeakyBucket {
	return &LeakyBucket{
		capacity: float64(capacity),
		water:    0, // xô bắt đầu rỗng
		leakRate: leakRate,
		lastLeak: time.Now(),
	}
}

// Allow: rò bớt nước theo thời gian, rồi thử thêm 1 đơn vị. Nếu tràn → drop.
func (lb *LeakyBucket) Allow() bool {
	lb.mu.Lock()
	defer lb.mu.Unlock()

	now := time.Now()
	elapsed := now.Sub(lb.lastLeak).Seconds()
	// Rò bớt nước (không âm).
	lb.water = math.Max(0, lb.water-elapsed*lb.leakRate)
	lb.lastLeak = now

	// Còn chỗ trong xô → nhận request (thêm 1 nước).
	if lb.water+1 <= lb.capacity {
		lb.water++
		return true
	}
	return false // xô đầy → drop
}

// =============================================================================
// 3. FIXED WINDOW COUNTER — "đếm trong từng cửa sổ N giây"
// =============================================================================
//
// Mỗi window dài `window` thời gian. Trong 1 window: đếm số request, vượt limit
// thì deny. Sang window mới → reset count về 0.
//
// Đơn giản nhất nhưng có lỗ hổng "boundary attack" (xem mục 3.3 README):
// 2 burst ở 2 đầu ranh giới window có thể đạt 2× limit trong 1 khoảng sliding.
type FixedWindow struct {
	mu          sync.Mutex
	limit       int
	window      time.Duration
	count       int
	windowStart time.Time
}

func NewFixedWindow(limit int, window time.Duration) *FixedWindow {
	return &FixedWindow{
		limit:       limit,
		window:      window,
		windowStart: time.Now(),
	}
}

func (fw *FixedWindow) Allow() bool {
	fw.mu.Lock()
	defer fw.mu.Unlock()

	now := time.Now()
	// Đã sang window mới? Reset.
	if now.Sub(fw.windowStart) >= fw.window {
		fw.count = 0
		// Căn windowStart về mốc window hiện tại (tránh trôi dần do xử lý trễ).
		fw.windowStart = now
	}
	if fw.count < fw.limit {
		fw.count++
		return true
	}
	return false
}

// =============================================================================
// 4. CIRCUIT BREAKER — state machine Closed / Open / Half-Open
// =============================================================================
//
// Mục đích: chống cascading failure. Khi downstream fail liên tục → "cắt mạch"
// (Open) để fail fast, không gọi downstream nữa. Sau cooldown thử lại 1 probe
// (Half-Open): thành công → Closed, thất bại → Open trở lại.
type State int

const (
	StateClosed   State = iota // cho mọi request qua, đếm fail
	StateOpen                  // reject ngay, không gọi downstream
	StateHalfOpen              // cho đúng 1 probe đi qua để test recovery
)

func (s State) String() string {
	switch s {
	case StateClosed:
		return "CLOSED"
	case StateOpen:
		return "OPEN"
	case StateHalfOpen:
		return "HALF-OPEN"
	}
	return "UNKNOWN"
}

type Breaker struct {
	mu              sync.Mutex
	state           State
	failures        int           // số fail liên tiếp ở trạng thái Closed
	failThreshold   int           // ngưỡng fail liên tiếp → trip sang Open
	cooldown        time.Duration // thời gian ở Open trước khi cho probe
	lastOpenedAt    time.Time     // mốc lúc chuyển sang Open (tính cooldown)
	halfOpenProbing bool          // đã có 1 probe đang chạy ở Half-Open chưa
}

func NewBreaker(failThreshold int, cooldown time.Duration) *Breaker {
	return &Breaker{
		state:         StateClosed,
		failThreshold: failThreshold,
		cooldown:      cooldown,
	}
}

// Allow quyết định có cho request đi xuống downstream hay không.
//   - Closed   : luôn cho qua.
//   - Open      : hết cooldown → chuyển Half-Open & cho 1 probe; chưa hết → từ chối.
//   - Half-Open : chỉ cho đúng 1 probe, các request khác bị từ chối.
func (b *Breaker) Allow() bool {
	b.mu.Lock()
	defer b.mu.Unlock()

	switch b.state {
	case StateClosed:
		return true

	case StateOpen:
		if time.Since(b.lastOpenedAt) >= b.cooldown {
			// Hết cooldown → mở thử (Half-Open).
			b.state = StateHalfOpen
			b.halfOpenProbing = false
			// fallthrough sang nhánh Half-Open để cấp probe ngay.
		} else {
			return false
		}
		fallthrough

	case StateHalfOpen:
		if b.halfOpenProbing {
			return false // đã có probe đang chạy → chặn các request còn lại
		}
		b.halfOpenProbing = true
		return true
	}
	return false
}

// OnResult báo kết quả của 1 request đã được Allow() cho qua.
//   - ok == true  : thành công → reset fail; nếu đang Half-Open → đóng mạch (Closed).
//   - ok == false : thất bại → nếu Half-Open thì mở lại Open; nếu Closed thì
//     tăng fail, vượt ngưỡng → Open.
func (b *Breaker) OnResult(ok bool) {
	b.mu.Lock()
	defer b.mu.Unlock()

	if ok {
		b.failures = 0
		if b.state == StateHalfOpen {
			b.state = StateClosed
		}
		b.halfOpenProbing = false
		return
	}

	// Trường hợp fail:
	if b.state == StateHalfOpen {
		// Probe thất bại → quay lại Open, reset cooldown.
		b.state = StateOpen
		b.lastOpenedAt = time.Now()
		b.halfOpenProbing = false
		return
	}
	b.failures++
	if b.failures >= b.failThreshold {
		b.state = StateOpen
		b.lastOpenedAt = time.Now()
	}
}

// State trả về trạng thái hiện tại (dùng cho metric circuit_state).
func (b *Breaker) State() State {
	b.mu.Lock()
	defer b.mu.Unlock()
	return b.state
}

// =============================================================================
// 5. HTTP MIDDLEWARE — rate limit theo key (per-IP hoặc per-user)
// =============================================================================
//
// UserLimiter giữ một TokenBucket riêng cho mỗi key. Key có thể là IP (per-IP)
// hoặc userID (per-user) tuỳ hàm keyFn truyền vào.
type UserLimiter struct {
	mu       sync.Mutex
	buckets  map[string]*TokenBucket
	capacity int
	rate     float64                      // token/giây = limit / window
	keyFn    func(r *http.Request) string // trích key từ request
}

// NewUserLimiter: limit request trong mỗi window cho mỗi key.
// keyFn quyết định limit "theo ai" (per-IP hay per-user).
func NewUserLimiter(limit int, window time.Duration, keyFn func(*http.Request) string) *UserLimiter {
	return &UserLimiter{
		buckets:  make(map[string]*TokenBucket),
		capacity: limit,
		rate:     float64(limit) / window.Seconds(),
		keyFn:    keyFn,
	}
}

// get lấy (hoặc tạo) bucket cho 1 key. Thread-safe.
func (l *UserLimiter) get(key string) *TokenBucket {
	l.mu.Lock()
	defer l.mu.Unlock()
	if b, ok := l.buckets[key]; ok {
		return b
	}
	b := NewTokenBucket(l.capacity, l.rate)
	l.buckets[key] = b
	return b
}

// Middleware bọc handler, từ chối (429) khi key vượt limit, kèm các header chuẩn.
func (l *UserLimiter) Middleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		key := l.keyFn(r)
		if key == "" {
			key = "anonymous"
		}
		b := l.get(key)

		// Đặt header X-RateLimit-* ở MỌI response để client biết quota còn lại.
		remaining := int(b.Tokens())
		w.Header().Set("X-RateLimit-Limit", strconv.Itoa(l.capacity))

		if !b.Allow() {
			retryAfter := int(1.0/l.rate) + 1 // số giây xấp xỉ tới khi có 1 token
			w.Header().Set("Retry-After", strconv.Itoa(retryAfter))
			w.Header().Set("X-RateLimit-Remaining", "0")
			w.Header().Set("Content-Type", "application/json")
			w.WriteHeader(http.StatusTooManyRequests)
			fmt.Fprintf(w,
				`{"error":"rate_limited","message":"Quá số request cho phép.","retry_after_seconds":%d}`,
				retryAfter)
			return
		}
		w.Header().Set("X-RateLimit-Remaining", strconv.Itoa(remaining))
		next.ServeHTTP(w, r)
	})
}

// clientIP trích IP của client (bỏ port). Dùng cho rate limit per-IP ở edge.
// Lưu ý: nếu sau proxy/CDN thì nên đọc X-Forwarded-For (đã verify) thay vì RemoteAddr.
func clientIP(r *http.Request) string {
	host, _, err := net.SplitHostPort(r.RemoteAddr)
	if err != nil {
		return r.RemoteAddr
	}
	return host
}

// =============================================================================
// DEMO — chạy bằng `go run solutions.go`
// =============================================================================

func demoTokenBucket() {
	fmt.Println("=== Token Bucket (B=5, R=2/s) — gọi 3 lần/giây trong 4 giây ===")
	b := NewTokenBucket(5, 2)
	for sec := 0; sec < 4; sec++ {
		results := make([]string, 0, 3)
		for i := 0; i < 3; i++ {
			if b.Allow() {
				results = append(results, "✓")
			} else {
				results = append(results, "✗")
			}
		}
		fmt.Printf("  giây %d: %v  (tokens còn ~%.2f)\n", sec, results, b.Tokens())
		time.Sleep(time.Second)
	}
}

func demoLeakyBucket() {
	fmt.Println("\n=== Leaky Bucket (cap=5, leak=2/s) — burst 8 request tức thì ===")
	lb := NewLeakyBucket(5, 2)
	allowed := 0
	for i := 1; i <= 8; i++ {
		ok := lb.Allow()
		if ok {
			allowed++
		}
		fmt.Printf("  req #%d: %v\n", i, mapOK(ok))
	}
	fmt.Printf("  → cho qua %d / 8 (phần còn lại drop vì xô đầy)\n", allowed)
}

func demoFixedWindow() {
	fmt.Println("\n=== Fixed Window (limit=3, window=1s) — gửi 5 req trong window đầu ===")
	fw := NewFixedWindow(3, time.Second)
	for i := 1; i <= 5; i++ {
		fmt.Printf("  req #%d: %v\n", i, mapOK(fw.Allow()))
	}
	fmt.Println("  ...chờ sang window mới (1.1s)...")
	time.Sleep(1100 * time.Millisecond)
	fmt.Printf("  req #6 (window mới): %v\n", mapOK(fw.Allow()))
}

func demoBreaker() {
	fmt.Println("\n=== Circuit Breaker (threshold=3, cooldown=1s) ===")
	b := NewBreaker(3, time.Second)

	report := func(label string) {
		fmt.Printf("  %-34s state=%s\n", label, b.State())
	}

	// 2 success → vẫn Closed.
	for i := 0; i < 2; i++ {
		b.Allow()
		b.OnResult(true)
	}
	report("sau 2 success:")

	// 3 fail liên tiếp → Open.
	for i := 0; i < 3; i++ {
		b.Allow()
		b.OnResult(false)
	}
	report("sau 3 fail liên tiếp:")

	// Trong Open: Allow() phải trả false.
	fmt.Printf("  %-34s allow=%v\n", "Open → request mới:", b.Allow())

	// Chờ hết cooldown → probe success → Closed.
	time.Sleep(1100 * time.Millisecond)
	probe := b.Allow() // Half-Open probe
	fmt.Printf("  %-34s allow=%v\n", "hết cooldown → probe:", probe)
	b.OnResult(true)
	report("probe success:")

	// Trip lại rồi probe fail → Open.
	for i := 0; i < 3; i++ {
		b.Allow()
		b.OnResult(false)
	}
	time.Sleep(1100 * time.Millisecond)
	b.Allow()
	b.OnResult(false)
	report("probe fail:")
}

func demoMiddleware() {
	fmt.Println("\n=== Middleware per-IP (limit=3 / 10s) — gọi 5 lần từ cùng 1 IP ===")
	limiter := NewUserLimiter(3, 10*time.Second, clientIP)
	handler := limiter.Middleware(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.WriteHeader(http.StatusOK)
		fmt.Fprint(w, "OK")
	}))

	for i := 1; i <= 5; i++ {
		rec := &statusRecorder{header: make(http.Header), status: 200}
		req, _ := http.NewRequest("GET", "/", nil)
		req.RemoteAddr = "203.0.113.7:54321" // cùng 1 IP
		handler.ServeHTTP(rec, req)
		fmt.Printf("  req #%d → %d  (X-RateLimit-Remaining=%s, Retry-After=%s)\n",
			i, rec.status,
			rec.header.Get("X-RateLimit-Remaining"),
			rec.header.Get("Retry-After"))
	}
}

// statusRecorder — ResponseWriter tối giản để demo middleware không cần server thật.
type statusRecorder struct {
	header http.Header
	status int
}

func (s *statusRecorder) Header() http.Header         { return s.header }
func (s *statusRecorder) Write(b []byte) (int, error) { return len(b), nil }
func (s *statusRecorder) WriteHeader(code int)        { s.status = code }

func mapOK(ok bool) string {
	if ok {
		return "✓ allow"
	}
	return "✗ deny"
}

func main() {
	demoTokenBucket()
	demoLeakyBucket()
	demoFixedWindow()
	demoBreaker()
	demoMiddleware()
}
