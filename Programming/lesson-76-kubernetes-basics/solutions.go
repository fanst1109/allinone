// solutions.go — Lesson 76: Kubernetes Basics cho Go developer
//
// File này minh họa một HTTP server "K8s-ready" theo đúng các yêu cầu mà
// Kubernetes đặt ra cho một workload chạy trong Pod:
//
//   1. /healthz  — liveness probe. Trả 200 khi process còn "sống" (event loop
//                  chưa kẹt). Nếu fail liên tục, kubelet RESTART container.
//   2. /readyz   — readiness probe. Trả 200 chỉ khi app SẴN SÀNG nhận traffic.
//                  Khi nhận SIGTERM ta lật cờ này về "not ready" để K8s gỡ Pod
//                  khỏi Service endpoints TRƯỚC khi đóng server → zero-downtime.
//   3. Graceful shutdown khi nhận SIGTERM: ngừng nhận request mới, chờ request
//      đang chạy xong trong terminationGracePeriodSeconds rồi mới thoát.
//   4. Cấu hình đọc hoàn toàn từ ENV (12-factor app): không hardcode.
//
// Chạy thử local (không cần K8s):
//
//   PORT=8080 SHUTDOWN_GRACE=10s go run solutions.go
//   curl localhost:8080/healthz   # ok
//   curl localhost:8080/readyz    # ready
//   curl localhost:8080/          # Hello
//   # Ctrl-C (gửi SIGINT, xử lý giống SIGTERM) → quan sát log graceful shutdown
//
// Tất cả comment bằng tiếng Việt để phục vụ việc học.

package main

import (
	"context"
	"errors"
	"fmt"
	"log"
	"net/http"
	"os"
	"os/signal"
	"strconv"
	"sync"
	"sync/atomic"
	"syscall"
	"time"
)

// ----------------------------------------------------------------------------
// 1. Config — đọc từ ENV (12-factor: "Store config in the environment")
// ----------------------------------------------------------------------------

// Config gom toàn bộ tham số runtime. KHÔNG hardcode trong code.
// Trong K8s các giá trị này đến từ ConfigMap (envFrom/env) hoặc Secret.
type Config struct {
	Port          string        // PORT — cổng HTTP server lắng nghe
	AppName       string        // APP_NAME — tên service, dùng trong log/response
	ShutdownGrace time.Duration // SHUTDOWN_GRACE — thời gian tối đa chờ drain request
	StartupDelay  time.Duration // STARTUP_DELAY — giả lập app warm-up chậm (test startup probe)
	DBHost        string        // DB_HOST — ví dụ config không nhạy cảm (ConfigMap)
	DBPassword    string        // DB_PASSWORD — ví dụ secret (Secret), KHÔNG log ra
}

// getEnv đọc biến môi trường, trả về giá trị mặc định nếu chưa set.
func getEnv(key, def string) string {
	if v, ok := os.LookupEnv(key); ok && v != "" {
		return v
	}
	return def
}

// getEnvDuration đọc một duration từ ENV (vd "10s", "500ms").
func getEnvDuration(key string, def time.Duration) time.Duration {
	if v, ok := os.LookupEnv(key); ok && v != "" {
		if d, err := time.ParseDuration(v); err == nil {
			return d
		}
		log.Printf("WARN: %s=%q không phải duration hợp lệ, dùng mặc định %s", key, v, def)
	}
	return def
}

// LoadConfig dựng Config từ ENV. Đây là điểm DUY NHẤT đọc os.Getenv —
// phần còn lại của app chỉ phụ thuộc vào struct Config (dễ test).
func LoadConfig() Config {
	return Config{
		Port:          getEnv("PORT", "8080"),
		AppName:       getEnv("APP_NAME", "go-k8s-demo"),
		ShutdownGrace: getEnvDuration("SHUTDOWN_GRACE", 10*time.Second),
		StartupDelay:  getEnvDuration("STARTUP_DELAY", 0),
		DBHost:        getEnv("DB_HOST", "postgres.default.svc.cluster.local"),
		DBPassword:    getEnv("DB_PASSWORD", ""), // KHÔNG có default cho secret
	}
}

// ----------------------------------------------------------------------------
// 2. Health state — chia sẻ giữa các handler probe
// ----------------------------------------------------------------------------

// HealthState lưu trạng thái sống/sẵn-sàng của app.
//
//   - live  : process còn chạy bình thường (liveness). Fail → kubelet restart.
//   - ready : sẵn sàng nhận traffic (readiness). Fail → gỡ khỏi Service endpoints
//     nhưng KHÔNG restart. Đây là cờ ta lật khi nhận SIGTERM.
//
// Dùng atomic.Bool để probe handler (chạy trên goroutine riêng của net/http)
// đọc/ghi an toàn mà không cần mutex.
type HealthState struct {
	live  atomic.Bool
	ready atomic.Bool
}

func NewHealthState() *HealthState {
	h := &HealthState{}
	h.live.Store(true)   // sống ngay khi khởi tạo
	h.ready.Store(false) // CHƯA sẵn sàng — phải warm-up xong mới bật
	return h
}

func (h *HealthState) SetReady(v bool) { h.ready.Store(v) }
func (h *HealthState) SetLive(v bool)  { h.live.Store(v) }
func (h *HealthState) IsReady() bool   { return h.ready.Load() }
func (h *HealthState) IsLive() bool    { return h.live.Load() }

// ----------------------------------------------------------------------------
// 3. HTTP handlers
// ----------------------------------------------------------------------------

// livenessHandler phục vụ /healthz.
//
// Nguyên tắc liveness: chỉ kiểm tra những thứ mà RESTART có thể chữa được
// (deadlock, goroutine leak làm kẹt). KHÔNG kiểm tra dependency ngoài (DB,
// cache) — nếu DB sập mà liveness fail thì K8s restart vô ích, gây restart loop.
func livenessHandler(h *HealthState) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		if h.IsLive() {
			w.WriteHeader(http.StatusOK)
			_, _ = fmt.Fprintln(w, "ok")
			return
		}
		w.WriteHeader(http.StatusServiceUnavailable)
		_, _ = fmt.Fprintln(w, "not live")
	}
}

// readinessHandler phục vụ /readyz.
//
// Nguyên tắc readiness: kiểm tra app đã warm-up xong VÀ các dependency thiết
// yếu (DB, cache) có sẵn không. Khi nhận SIGTERM, ta lật cờ ready=false để
// K8s gỡ Pod khỏi Service endpoints — traffic mới ngừng đến trước khi ta đóng.
func readinessHandler(h *HealthState) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		if h.IsReady() {
			w.WriteHeader(http.StatusOK)
			_, _ = fmt.Fprintln(w, "ready")
			return
		}
		w.WriteHeader(http.StatusServiceUnavailable)
		_, _ = fmt.Fprintln(w, "not ready")
	}
}

// rootHandler là "business logic" giả lập — trả lời chào kèm tên service.
// Có sleep nhỏ để minh họa request đang-chạy lúc shutdown (graceful drain).
func rootHandler(cfg Config) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		// Giả lập xử lý mất ~200ms — đủ để thấy graceful shutdown chờ nó xong.
		time.Sleep(200 * time.Millisecond)
		host, _ := os.Hostname() // trong K8s = tên Pod
		_, _ = fmt.Fprintf(w, "Hello từ %s (pod=%s, db=%s)\n", cfg.AppName, host, cfg.DBHost)
	}
}

// ----------------------------------------------------------------------------
// 4. Warm-up — giả lập app khởi động chậm (test startup probe)
// ----------------------------------------------------------------------------

// warmUp giả lập quá trình khởi tạo: load cache, kết nối DB, prefetch...
// Sau khi xong mới bật ready=true. Trong K8s, startupProbe bảo vệ giai đoạn này:
// liveness/readiness chỉ bắt đầu chạy SAU khi startupProbe pass.
func warmUp(cfg Config, h *HealthState) {
	if cfg.StartupDelay > 0 {
		log.Printf("warm-up: chờ %s (giả lập kết nối DB %s...)", cfg.StartupDelay, cfg.DBHost)
		time.Sleep(cfg.StartupDelay)
	}
	h.SetReady(true)
	log.Printf("warm-up xong → readyz=200, bắt đầu nhận traffic")
}

// ----------------------------------------------------------------------------
// 5. main — wiring + graceful shutdown
// ----------------------------------------------------------------------------

func main() {
	cfg := LoadConfig()
	log.SetFlags(log.LstdFlags | log.Lmsgprefix)
	log.SetPrefix(fmt.Sprintf("[%s] ", cfg.AppName))

	// 12-factor: log ra STDOUT/STDERR, KHÔNG ghi file. K8s thu log từ stdout.
	// In config (CHE password — không bao giờ log secret nguyên văn).
	log.Printf("khởi động: port=%s grace=%s db_host=%s db_password=%s",
		cfg.Port, cfg.ShutdownGrace, cfg.DBHost, maskSecret(cfg.DBPassword))

	health := NewHealthState()

	mux := http.NewServeMux()
	mux.HandleFunc("/healthz", livenessHandler(health)) // liveness
	mux.HandleFunc("/readyz", readinessHandler(health)) // readiness
	mux.HandleFunc("/", rootHandler(cfg))               // business

	srv := &http.Server{
		Addr:    ":" + cfg.Port,
		Handler: mux,
		// Đặt timeout để tránh slow-loris và để liveness phản ánh đúng tình trạng.
		ReadHeaderTimeout: 5 * time.Second,
	}

	// Warm-up chạy nền; xong thì bật readiness.
	go warmUp(cfg, health)

	// Lắng nghe SIGTERM (K8s gửi khi xóa Pod) và SIGINT (Ctrl-C khi dev local).
	ctx, stop := signal.NotifyContext(context.Background(), syscall.SIGTERM, syscall.SIGINT)
	defer stop()

	// Goroutine chạy server. Lỗi (trừ ErrServerClosed lúc shutdown) → fatal.
	serverErr := make(chan error, 1)
	go func() {
		log.Printf("HTTP server lắng nghe trên %s", srv.Addr)
		if err := srv.ListenAndServe(); err != nil && !errors.Is(err, http.ErrServerClosed) {
			serverErr <- err
		}
	}()

	// Chờ một trong hai: signal shutdown hoặc server chết bất thường.
	select {
	case err := <-serverErr:
		log.Fatalf("server lỗi: %v", err)
	case <-ctx.Done():
		log.Printf("nhận tín hiệu shutdown — bắt đầu graceful shutdown")
	}

	gracefulShutdown(srv, health, cfg.ShutdownGrace)
	log.Printf("đã thoát sạch")
}

// gracefulShutdown thực hiện trình tự đóng đúng chuẩn K8s:
//
//  1. Lật readyz=false → K8s gỡ Pod khỏi Service endpoints (traffic MỚI ngừng đến).
//  2. Chờ một nhịp ngắn để kube-proxy trên các node cập nhật endpoint
//     (endpoint propagation không tức thời — đây là nguồn drop request phổ biến).
//  3. Gọi srv.Shutdown(ctx): ngừng nhận kết nối mới, chờ request đang chạy xong
//     trong giới hạn grace. Quá hạn → context hủy → đóng cưỡng bức.
func gracefulShutdown(srv *http.Server, health *HealthState, grace time.Duration) {
	// Bước 1: báo "không sẵn sàng" để bị gỡ khỏi load balancer.
	health.SetReady(false)
	log.Printf("readyz → 503 (gỡ khỏi Service endpoints)")

	// Bước 2: chờ kube-proxy cập nhật (mô phỏng preStop sleep). Lấy ~1/5 grace,
	// tối đa 2s — đủ cho đa số cluster propagate endpoint.
	propagation := grace / 5
	if propagation > 2*time.Second {
		propagation = 2 * time.Second
	}
	if propagation > 0 {
		log.Printf("chờ %s cho endpoint propagation...", propagation)
		time.Sleep(propagation)
	}

	// Bước 3: drain các request đang chạy.
	ctx, cancel := context.WithTimeout(context.Background(), grace)
	defer cancel()

	log.Printf("drain request đang chạy (tối đa %s)...", grace)
	if err := srv.Shutdown(ctx); err != nil {
		// Quá hạn grace mà vẫn còn request → đóng cưỡng bức.
		log.Printf("WARN: hết grace, đóng cưỡng bức: %v", err)
		_ = srv.Close()
	}
}

// maskSecret che giá trị nhạy cảm khi log (không bao giờ in nguyên văn).
func maskSecret(s string) string {
	if s == "" {
		return "(empty)"
	}
	return "***(" + strconv.Itoa(len(s)) + " chars)"
}

// ----------------------------------------------------------------------------
// 6. Mô phỏng "kubelet" — minh họa cơ chế probe gây restart / gỡ-LB (offline)
// ----------------------------------------------------------------------------
//
// Phần dưới KHÔNG chạy trong main; nó tồn tại để minh họa bằng code logic mà
// kubelet áp dụng, hữu ích cho việc học. Có thể gọi từ test hoặc đọc để hiểu.

// ProbeConfig mô tả cấu hình một probe (giống YAML livenessProbe/readinessProbe).
type ProbeConfig struct {
	PeriodSeconds    int // chu kỳ gọi probe
	FailureThreshold int // số lần fail liên tiếp trước khi hành động
	SuccessThreshold int // số lần ok liên tiếp để coi là khỏe lại
}

// ProbeRunner mô phỏng kubelet chạy probe và đếm fail/success liên tiếp.
type ProbeRunner struct {
	cfg        ProbeConfig
	mu         sync.Mutex
	failStreak int
	okStreak   int
}

func NewProbeRunner(cfg ProbeConfig) *ProbeRunner { return &ProbeRunner{cfg: cfg} }

// Record nạp 1 kết quả probe. Trả về (shouldAct=true) khi vượt ngưỡng:
//   - với liveness: shouldAct=true nghĩa là RESTART container.
//   - với readiness: shouldAct=true nghĩa là GỠ khỏi Service endpoints.
func (p *ProbeRunner) Record(ok bool) (shouldAct bool) {
	p.mu.Lock()
	defer p.mu.Unlock()
	if ok {
		p.okStreak++
		p.failStreak = 0
		return false
	}
	p.failStreak++
	p.okStreak = 0
	return p.failStreak >= p.cfg.FailureThreshold
}

// ----------------------------------------------------------------------------
// 7. Demo offline cho ProbeRunner (in ra để học, không cần cluster)
// ----------------------------------------------------------------------------

// DemoProbe minh họa: liveness fail 3 lần liên tiếp (FailureThreshold=3) →
// kubelet restart. Gọi thủ công nếu muốn xem; main không gọi để không nhiễu log.
func DemoProbe() {
	runner := NewProbeRunner(ProbeConfig{PeriodSeconds: 10, FailureThreshold: 3, SuccessThreshold: 1})
	results := []bool{true, true, false, false, false} // fail 3 lần cuối
	for i, ok := range results {
		act := runner.Record(ok)
		status := "OK"
		if !ok {
			status = "FAIL"
		}
		fmt.Printf("probe #%d = %s, restart? %v\n", i+1, status, act)
	}
}
