// Lesson 70 — Service Mesh (Introduction)
//
// LƯU Ý QUAN TRỌNG:
//
//	Thực tế một service mesh là Envoy (sidecar proxy, data plane) + Istiod
//	(control plane) chạy trên Kubernetes, cấu hình hoàn toàn bằng YAML
//	(VirtualService, DestinationRule, PeerAuthentication...). KHÔNG ai viết
//	service mesh bằng tay trong app code.
//
//	File Go này CHỈ MÔ PHỎNG CONCEPT để học: ta dựng một "sidecar proxy"
//	bằng Go đứng giữa app và remote service, tự lo retry / timeout /
//	circuit breaker / mTLS-mock / weighted routing (canary) / fault injection.
//	Mục tiêu là thấy rõ "những thứ mesh làm hộ bạn" chứ không phải reimplement Envoy.
//
// Chạy demo:  go run solutions.go
// Biên dịch:  go build   (chỉ cần standard library, Go 1.21+).
//
// Toàn bộ comment bằng tiếng Việt để hỗ trợ học.
package main

import (
	"errors"
	"fmt"
	"math/rand"
	"sync"
	"time"
)

// ============================================================================
// 0. Mô hình hoá "remote service" (upstream)
// ============================================================================

// Backend mô phỏng một service đích (vd payment-service phiên bản v1 / v2).
// failRate: xác suất request lỗi. latency: thời gian xử lý cơ bản.
// extraDelay: độ trễ bị "tiêm" thêm (fault injection).
type Backend struct {
	name       string
	version    string
	failRate   float64
	latency    time.Duration
	extraDelay time.Duration // do fault injection thêm vào
	mu         sync.Mutex
	hits       int
}

// Handle mô phỏng việc backend xử lý 1 request.
func (b *Backend) Handle(req string) (string, time.Duration, error) {
	b.mu.Lock()
	b.hits++
	b.mu.Unlock()

	total := b.latency + b.extraDelay
	time.Sleep(total)

	if rand.Float64() < b.failRate {
		return "", total, fmt.Errorf("%s(%s): internal error", b.name, b.version)
	}
	return fmt.Sprintf("OK from %s(%s) [req=%s]", b.name, b.version, req), total, nil
}

func (b *Backend) Hits() int {
	b.mu.Lock()
	defer b.mu.Unlock()
	return b.hits
}

// ============================================================================
// 1. mTLS-mock — xác thực hai chiều giữa hai sidecar
// ============================================================================
//
// Thực tế: Envoy ↔ Envoy bắt tay mutual TLS, cert do Istiod cấp (SPIFFE ID),
// tự rotate ~24h. App KHÔNG biết gì về cert. Ở đây ta mô phỏng "danh tính"
// của mỗi sidecar bằng một chuỗi và kiểm tra hai chiều.

type Identity struct {
	spiffeID string // vd: spiffe://cluster.local/ns/default/sa/checkout
	cert     string // mock certificate (thực tế là X.509 do Istiod ký)
}

// mtlsHandshake mô phỏng bắt tay mTLS: cả client lẫn server cùng trình cert,
// cùng verify đối phương qua "CA" (ở đây chỉ check prefix spiffe hợp lệ).
func mtlsHandshake(client, server Identity) error {
	verify := func(id Identity) error {
		if id.cert == "" {
			return errors.New("không có certificate")
		}
		if len(id.spiffeID) < len("spiffe://") || id.spiffeID[:9] != "spiffe://" {
			return fmt.Errorf("SPIFFE ID không hợp lệ: %q", id.spiffeID)
		}
		return nil
	}
	if err := verify(server); err != nil { // client verify server
		return fmt.Errorf("client từ chối server: %w", err)
	}
	if err := verify(client); err != nil { // server verify client (mutual!)
		return fmt.Errorf("server từ chối client: %w", err)
	}
	return nil
}

// ============================================================================
// 2. Circuit breaker (Closed / Open / Half-Open)
// ============================================================================
//
// Thực tế là config trong Istio DestinationRule (outlierDetection). Ở đây
// cài state machine tối giản để thấy ý tưởng: lỗi liên tiếp → Open (chặn nhanh),
// sau cooldown → Half-Open (thử 1 phát), thành công → Closed lại.

type breakerState int

const (
	closedState breakerState = iota
	openState
	halfOpenState
)

func (s breakerState) String() string {
	switch s {
	case closedState:
		return "CLOSED"
	case openState:
		return "OPEN"
	default:
		return "HALF-OPEN"
	}
}

type CircuitBreaker struct {
	mu        sync.Mutex
	state     breakerState
	failCount int
	threshold int           // số lỗi liên tiếp để mở
	cooldown  time.Duration // thời gian chờ trước khi Half-Open
	openedAt  time.Time
}

func NewCircuitBreaker(threshold int, cooldown time.Duration) *CircuitBreaker {
	return &CircuitBreaker{state: closedState, threshold: threshold, cooldown: cooldown}
}

// Allow trả về true nếu request được phép đi qua.
func (cb *CircuitBreaker) Allow() bool {
	cb.mu.Lock()
	defer cb.mu.Unlock()
	if cb.state == openState && time.Since(cb.openedAt) >= cb.cooldown {
		cb.state = halfOpenState // hết cooldown → cho thử 1 phát
	}
	return cb.state != openState
}

func (cb *CircuitBreaker) onSuccess() {
	cb.mu.Lock()
	defer cb.mu.Unlock()
	cb.failCount = 0
	cb.state = closedState
}

func (cb *CircuitBreaker) onFailure() {
	cb.mu.Lock()
	defer cb.mu.Unlock()
	if cb.state == halfOpenState {
		cb.state = openState // thử lại vẫn lỗi → mở tiếp
		cb.openedAt = time.Now()
		return
	}
	cb.failCount++
	if cb.failCount >= cb.threshold {
		cb.state = openState
		cb.openedAt = time.Now()
	}
}

func (cb *CircuitBreaker) State() breakerState {
	cb.mu.Lock()
	defer cb.mu.Unlock()
	return cb.state
}

// ============================================================================
// 3. Weighted router — traffic shifting / canary
// ============================================================================
//
// Thực tế: Istio VirtualService với route weights (90/10). Ở đây ta chọn
// backend theo trọng số bằng random có trọng số.

type WeightedRoute struct {
	backend *Backend
	weight  int // tổng các weight nên = 100 cho dễ đọc, nhưng không bắt buộc
}

type Router struct {
	routes []WeightedRoute
}

func (r *Router) pick() *Backend {
	total := 0
	for _, rt := range r.routes {
		total += rt.weight
	}
	if total == 0 {
		return r.routes[0].backend
	}
	n := rand.Intn(total)
	for _, rt := range r.routes {
		if n < rt.weight {
			return rt.backend
		}
		n -= rt.weight
	}
	return r.routes[len(r.routes)-1].backend
}

// ============================================================================
// 4. Sidecar proxy — trái tim của bài học
// ============================================================================
//
// App KHÔNG gọi remote trực tiếp. App gọi sidecar (localhost). Sidecar lo HẾT:
//   1. mTLS handshake với sidecar bên kia.
//   2. Weighted routing (chọn v1/v2 — canary).
//   3. Timeout cho mỗi lần thử.
//   4. Retry với số lần cấu hình được.
//   5. Circuit breaker — chặn nhanh khi upstream sập.
//   6. Thu thập metric (observability) — số request, lỗi, p-latency thô.
//
// Tất cả những thứ trên trong mesh thật là CONFIG, không phải code app.

type SidecarConfig struct {
	timeout     time.Duration
	maxRetries  int
	cbThreshold int
	cbCooldown  time.Duration
}

type Metrics struct {
	mu        sync.Mutex
	requests  int
	successes int
	failures  int
	retries   int
	cbRejects int
	totalLat  time.Duration
}

func (m *Metrics) record(success bool, lat time.Duration) {
	m.mu.Lock()
	defer m.mu.Unlock()
	m.requests++
	m.totalLat += lat
	if success {
		m.successes++
	} else {
		m.failures++
	}
}

func (m *Metrics) String() string {
	m.mu.Lock()
	defer m.mu.Unlock()
	avg := time.Duration(0)
	if m.requests > 0 {
		avg = m.totalLat / time.Duration(m.requests)
	}
	return fmt.Sprintf("requests=%d ok=%d fail=%d retries=%d cbRejects=%d avgLat=%s",
		m.requests, m.successes, m.failures, m.retries, m.cbRejects, avg.Round(time.Millisecond))
}

type Sidecar struct {
	identity Identity
	cfg      SidecarConfig
	router   *Router
	breaker  *CircuitBreaker
	metrics  *Metrics
	// danh tính sidecar phía upstream (để mTLS-mock)
	peer Identity
}

func NewSidecar(id, peer Identity, cfg SidecarConfig, router *Router) *Sidecar {
	return &Sidecar{
		identity: id,
		peer:     peer,
		cfg:      cfg,
		router:   router,
		breaker:  NewCircuitBreaker(cfg.cbThreshold, cfg.cbCooldown),
		metrics:  &Metrics{},
	}
}

// callWithTimeout chạy backend.Handle trong goroutine + select timeout.
func (s *Sidecar) callWithTimeout(b *Backend, req string) (string, time.Duration, error) {
	type result struct {
		msg string
		lat time.Duration
		err error
	}
	ch := make(chan result, 1)
	start := time.Now()
	go func() {
		msg, lat, err := b.Handle(req)
		ch <- result{msg, lat, err}
	}()
	select {
	case r := <-ch:
		return r.msg, r.lat, r.err
	case <-time.After(s.cfg.timeout):
		return "", time.Since(start), fmt.Errorf("timeout sau %s", s.cfg.timeout)
	}
}

// Send là điểm vào: app gọi hàm này (tưởng tượng nó là localhost:15001).
func (s *Sidecar) Send(req string) (string, error) {
	// (5) Circuit breaker: chặn nhanh nếu đang OPEN.
	if !s.breaker.Allow() {
		s.metrics.mu.Lock()
		s.metrics.cbRejects++
		s.metrics.mu.Unlock()
		return "", fmt.Errorf("circuit breaker OPEN — chặn nhanh, không gọi upstream")
	}

	// (1) mTLS handshake giữa hai sidecar (làm 1 lần / connection trong thực tế).
	if err := mtlsHandshake(s.identity, s.peer); err != nil {
		return "", fmt.Errorf("mTLS thất bại: %w", err)
	}

	// (2) Chọn backend theo trọng số (canary).
	var lastErr error
	overallStart := time.Now()
	attempts := s.cfg.maxRetries + 1
	for attempt := 1; attempt <= attempts; attempt++ {
		backend := s.router.pick()
		// (3)+(4) timeout cho từng lần thử.
		msg, _, err := s.callWithTimeout(backend, req)
		if err == nil {
			s.breaker.onSuccess()
			s.metrics.record(true, time.Since(overallStart))
			return msg, nil
		}
		lastErr = err
		s.breaker.onFailure()
		if attempt < attempts {
			s.metrics.mu.Lock()
			s.metrics.retries++
			s.metrics.mu.Unlock()
		}
	}
	s.metrics.record(false, time.Since(overallStart))
	return "", fmt.Errorf("hết %d lần thử: %w", attempts, lastErr)
}

// ============================================================================
// DEMO
// ============================================================================

func banner(title string) {
	fmt.Printf("\n========== %s ==========\n", title)
}

func main() {
	rand.Seed(time.Now().UnixNano())

	// Hai backend: checkout-service phiên bản v1 (ổn định) và v2 (canary, lỗi nhiều hơn).
	v1 := &Backend{name: "checkout", version: "v1", failRate: 0.0, latency: 20 * time.Millisecond}
	v2 := &Backend{name: "checkout", version: "v2", failRate: 0.0, latency: 25 * time.Millisecond}

	// Danh tính mTLS của hai sidecar.
	clientID := Identity{spiffeID: "spiffe://cluster.local/ns/default/sa/cart", cert: "cart-cert"}
	serverID := Identity{spiffeID: "spiffe://cluster.local/ns/default/sa/checkout", cert: "checkout-cert"}

	cfg := SidecarConfig{
		timeout:     200 * time.Millisecond,
		maxRetries:  2,
		cbThreshold: 3,
		cbCooldown:  300 * time.Millisecond,
	}

	// ----- DEMO 1: sidecar cơ bản + mTLS + observability -----
	banner("DEMO 1: Sidecar proxy + mTLS + metrics (100% v1)")
	router1 := &Router{routes: []WeightedRoute{{v1, 100}}}
	sc1 := NewSidecar(clientID, serverID, cfg, router1)
	for i := 0; i < 5; i++ {
		msg, err := sc1.Send(fmt.Sprintf("order-%d", i))
		if err != nil {
			fmt.Println("  ✗", err)
		} else {
			fmt.Println("  ✓", msg)
		}
	}
	fmt.Println("  metrics:", sc1.metrics)
	fmt.Println("  → App chỉ gọi sc1.Send(); mTLS + metric đều do sidecar lo, app không viết dòng nào.")

	// ----- DEMO 2: traffic shifting / canary 90% v1, 10% v2 -----
	banner("DEMO 2: Canary traffic shifting (90% v1 / 10% v2)")
	v1.mu.Lock()
	v1.hits = 0
	v1.mu.Unlock()
	v2.mu.Lock()
	v2.hits = 0
	v2.mu.Unlock()
	router2 := &Router{routes: []WeightedRoute{{v1, 90}, {v2, 10}}}
	sc2 := NewSidecar(clientID, serverID, cfg, router2)
	for i := 0; i < 100; i++ {
		_, _ = sc2.Send(fmt.Sprintf("o-%d", i))
	}
	fmt.Printf("  v1 nhận %d request, v2 nhận %d request (mong đợi ~90/10)\n", v1.Hits(), v2.Hits())
	fmt.Println("  → Tăng dần weight v2 (10→50→100) chính là canary deploy — đổi YAML, không deploy lại app.")

	// ----- DEMO 3: fault injection → retry + timeout -----
	banner("DEMO 3: Fault injection (tiêm delay 500ms) → timeout + retry")
	faulty := &Backend{name: "checkout", version: "v1", failRate: 0.0,
		latency: 20 * time.Millisecond, extraDelay: 500 * time.Millisecond} // > timeout 200ms
	router3 := &Router{routes: []WeightedRoute{{faulty, 100}}}
	sc3 := NewSidecar(clientID, serverID, cfg, router3)
	msg, err := sc3.Send("test-resilience")
	if err != nil {
		fmt.Println("  ✗ kết quả:", err)
	} else {
		fmt.Println("  ✓", msg)
	}
	fmt.Println("  metrics:", sc3.metrics)
	fmt.Println("  → Tiêm 500ms > timeout 200ms: mọi lần thử đều timeout, retry cũng vô ích → lộ ra app chưa chịu nổi.")

	// ----- DEMO 4: circuit breaker -----
	banner("DEMO 4: Circuit breaker — upstream sập, breaker mở để chặn nhanh")
	dead := &Backend{name: "checkout", version: "v1", failRate: 1.0, latency: 10 * time.Millisecond}
	router4 := &Router{routes: []WeightedRoute{{dead, 100}}}
	cfg4 := cfg
	cfg4.maxRetries = 0 // tắt retry cho dễ quan sát breaker
	sc4 := NewSidecar(clientID, serverID, cfg4, router4)
	for i := 0; i < 6; i++ {
		_, err := sc4.Send(fmt.Sprintf("r-%d", i))
		fmt.Printf("  req %d → breaker=%s err=%v\n", i, sc4.breaker.State(), err)
	}
	fmt.Println("  metrics:", sc4.metrics)
	fmt.Println("  → Sau 3 lỗi liên tiếp breaker OPEN: request sau bị chặn ngay, không lãng phí gọi service đã chết.")

	// ----- DEMO 5: mTLS thất bại (client không có cert) -----
	banner("DEMO 5: mTLS từ chối — client thiếu certificate")
	badClient := Identity{spiffeID: "spiffe://cluster.local/ns/default/sa/attacker", cert: ""}
	sc5 := NewSidecar(badClient, serverID, cfg, &Router{routes: []WeightedRoute{{v1, 100}}})
	_, err = sc5.Send("hack")
	fmt.Println("  kết quả:", err)
	fmt.Println("  → Không cert hợp lệ → sidecar từ chối. mTLS zero-trust do mesh ép, app không cần biết.")

	fmt.Println("\n(Nhắc lại: đây là MÔ PHỎNG concept. Thực tế là Envoy + Istiod + YAML, không phải Go.)")
}
