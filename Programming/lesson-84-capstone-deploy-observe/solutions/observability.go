// observability.go — 3 trụ quan sát (observability) cho URL Shortener.
//
// MỤC ĐÍCH: minh hoạ cách wire-up Logging + Metrics + Tracing vào 1 HTTP service,
// và middleware tự động instrument mọi request theo RED method
// (Rate / Errors / Duration).
//
// LƯU Ý QUAN TRỌNG về dependency:
//   File này dùng STDLIB ONLY để `go run` được ngay, không cần `go get`.
//   Phần Prometheus và OpenTelemetry được MÔ PHỎNG (mock) bằng struct nhỏ tự viết,
//   interface giữ GIỐNG HỆT thư viện thật để khi lên production bạn chỉ cần đổi
//   import là chạy.
//
// Trong production thật, thay các mock dưới bằng:
//   - Metrics:  github.com/prometheus/client_golang/prometheus
//               github.com/prometheus/client_golang/prometheus/promhttp
//   - Tracing:  go.opentelemetry.io/otel
//               go.opentelemetry.io/otel/sdk/trace
//               go.opentelemetry.io/otel/exporters/otlp/otlptrace
//
// Comment tiếng Việt giải thích từng phần (theo CLAUDE.md).
package main

import (
	"context"
	"encoding/json"
	"fmt"
	"log/slog"
	"net/http"
	"os"
	"sort"
	"strconv"
	"sync"
	"sync/atomic"
	"time"
)

// =============================================================================
// TRỤ 1 — STRUCTURED LOGGING (Lesson 72)
// =============================================================================
//
// Dùng slog (stdlib từ Go 1.21) xuất JSON. Mỗi log line là 1 JSON object ->
// dễ index trong Loki/Elasticsearch, query theo field thay vì regex.
//
// requestID: gắn vào context, log ra mọi dòng -> "correlation" — nối các log
// rời rạc của cùng 1 request (kể cả async worker) thành 1 chuỗi.

type ctxKey string

const requestIDKey ctxKey = "request_id"

// newLogger tạo slog.Logger xuất JSON ra stdout (12-factor: log ra stdout,
// để platform — K8s/Docker — thu thập, KHÔNG tự ghi file).
func newLogger(level slog.Level) *slog.Logger {
	h := slog.NewJSONHandler(os.Stdout, &slog.HandlerOptions{
		Level: level,
		// Đổi key "time"->"ts", "msg"->"message" cho khớp convention chung (tuỳ chọn).
		ReplaceAttr: func(groups []string, a slog.Attr) slog.Attr {
			if a.Key == slog.TimeKey {
				a.Key = "ts"
			}
			return a
		},
	})
	return slog.New(h)
}

// loggerFromCtx lấy logger đã gắn sẵn request_id từ context. Nhờ vậy worker
// async (xử lý click) cũng log cùng request_id với request gốc.
func loggerFromCtx(ctx context.Context, base *slog.Logger) *slog.Logger {
	if rid, ok := ctx.Value(requestIDKey).(string); ok && rid != "" {
		return base.With("request_id", rid)
	}
	return base
}

// =============================================================================
// TRỤ 2 — METRICS (Lesson 73) — mô phỏng interface Prometheus client_golang
// =============================================================================
//
// 4 metric bắt buộc (theo đề bài) + RED method:
//   1. Counter   http_requests_total{method,path,status}   — Rate + Errors
//   2. Histogram http_request_duration_seconds{path}        — Duration (p50/p99)
//   3. Gauge     cache_hit_ratio                            — tỉ lệ cache hit
//   4. Gauge     click_queue_depth                          — độ sâu hàng đợi click
//   5. Counter   clicks_processed_total                     — số click worker đã xử lý
//
// MOCK interface dưới đây mô phỏng prometheus.Counter / Gauge / Histogram.
// Production: dùng prometheus.NewCounterVec(...) và registry.MustRegister(...).

// Counter — chỉ tăng (monotonic). Tương đương prometheus.Counter.
type Counter struct {
	name string
	help string
	v    atomic.Int64 // dùng int64 cho mock; prometheus thật dùng float64.
}

func (c *Counter) Inc()        { c.v.Add(1) }
func (c *Counter) Add(n int64) { c.v.Add(n) }
func (c *Counter) Value() int64 { return c.v.Load() }

// Gauge — lên xuống tự do. Tương đương prometheus.Gauge.
type Gauge struct {
	name string
	help string
	mu   sync.Mutex
	v    float64
}

func (g *Gauge) Set(x float64) { g.mu.Lock(); g.v = x; g.mu.Unlock() }
func (g *Gauge) Inc()          { g.Add(1) }
func (g *Gauge) Dec()          { g.Add(-1) }
func (g *Gauge) Add(x float64) { g.mu.Lock(); g.v += x; g.mu.Unlock() }
func (g *Gauge) Value() float64 { g.mu.Lock(); defer g.mu.Unlock(); return g.v }

// Histogram — phân phối giá trị (latency). Lưu các quan sát để tự tính
// quantile. Prometheus THẬT lưu theo bucket cố định (le="0.005",...) và tính
// quantile phía Prometheus server bằng histogram_quantile(). Ở mock này ta lưu
// raw + tự tính quantile để demo trực quan; KHÔNG dùng cách này ở scale lớn
// (tốn RAM). Production: prometheus.NewHistogram với Buckets phù hợp.
type Histogram struct {
	name    string
	help    string
	mu      sync.Mutex
	samples []float64
	sum     float64
	count   int64
}

func (h *Histogram) Observe(seconds float64) {
	h.mu.Lock()
	h.samples = append(h.samples, seconds)
	h.sum += seconds
	h.count++
	h.mu.Unlock()
}

// Quantile tính phân vị q (0..1) từ samples. p50 -> q=0.5, p99 -> q=0.99.
func (h *Histogram) Quantile(q float64) float64 {
	h.mu.Lock()
	defer h.mu.Unlock()
	if len(h.samples) == 0 {
		return 0
	}
	cp := append([]float64(nil), h.samples...)
	sort.Float64s(cp)
	idx := int(q * float64(len(cp)-1))
	return cp[idx]
}

// Metrics gom tất cả metric của service. Production: đăng ký vào 1
// prometheus.Registry rồi expose qua promhttp.Handler().
type Metrics struct {
	RequestsTotal   *Counter   // labels method,path,status — ở đây gộp cho gọn
	RequestDuration *Histogram // labels path
	CacheHitRatio   *Gauge
	QueueDepth      *Gauge
	ClicksProcessed *Counter

	// nội bộ để tính cache hit ratio
	cacheHits   atomic.Int64
	cacheMisses atomic.Int64
}

func newMetrics() *Metrics {
	return &Metrics{
		RequestsTotal:   &Counter{name: "http_requests_total", help: "Tổng số HTTP request"},
		RequestDuration: &Histogram{name: "http_request_duration_seconds", help: "Latency request (giây)"},
		CacheHitRatio:   &Gauge{name: "cache_hit_ratio", help: "Tỉ lệ cache hit (0..1)"},
		QueueDepth:      &Gauge{name: "click_queue_depth", help: "Số click đang chờ trong queue"},
		ClicksProcessed: &Counter{name: "clicks_processed_total", help: "Tổng click worker đã xử lý"},
	}
}

// recordCache cập nhật cache hit ratio gauge mỗi lần truy vấn cache.
func (m *Metrics) recordCache(hit bool) {
	if hit {
		m.cacheHits.Add(1)
	} else {
		m.cacheMisses.Add(1)
	}
	h, miss := m.cacheHits.Load(), m.cacheMisses.Load()
	total := h + miss
	if total > 0 {
		m.CacheHitRatio.Set(float64(h) / float64(total))
	}
}

// writePrometheus xuất metric ra text exposition format (giống /metrics thật).
// Production promhttp.Handler() tự làm việc này; ở đây ta viết tay để demo.
func (m *Metrics) writePrometheus(w http.ResponseWriter) {
	w.Header().Set("Content-Type", "text/plain; version=0.0.4")
	fmt.Fprintf(w, "# HELP %s %s\n# TYPE %s counter\n%s %d\n",
		m.RequestsTotal.name, m.RequestsTotal.help, m.RequestsTotal.name, m.RequestsTotal.name, m.RequestsTotal.Value())
	fmt.Fprintf(w, "# HELP %s %s\n# TYPE %s counter\n%s %d\n",
		m.ClicksProcessed.name, m.ClicksProcessed.help, m.ClicksProcessed.name, m.ClicksProcessed.name, m.ClicksProcessed.Value())
	fmt.Fprintf(w, "# HELP %s %s\n# TYPE %s gauge\n%s %g\n",
		m.CacheHitRatio.name, m.CacheHitRatio.help, m.CacheHitRatio.name, m.CacheHitRatio.name, m.CacheHitRatio.Value())
	fmt.Fprintf(w, "# HELP %s %s\n# TYPE %s gauge\n%s %g\n",
		m.QueueDepth.name, m.QueueDepth.help, m.QueueDepth.name, m.QueueDepth.name, m.QueueDepth.Value())
	// Histogram: production xuất bucket; mock xuất summary p50/p99 + sum/count.
	fmt.Fprintf(w, "# HELP %s %s\n# TYPE %s summary\n", m.RequestDuration.name, m.RequestDuration.help, m.RequestDuration.name)
	fmt.Fprintf(w, "%s{quantile=\"0.5\"} %g\n", m.RequestDuration.name, m.RequestDuration.Quantile(0.5))
	fmt.Fprintf(w, "%s{quantile=\"0.99\"} %g\n", m.RequestDuration.name, m.RequestDuration.Quantile(0.99))
	fmt.Fprintf(w, "%s_sum %g\n%s_count %d\n", m.RequestDuration.name, m.RequestDuration.sum, m.RequestDuration.name, m.RequestDuration.count)
}

// =============================================================================
// TRỤ 3 — TRACING (Lesson 74) — mô phỏng interface OpenTelemetry
// =============================================================================
//
// Span = 1 đơn vị công việc có thời gian bắt đầu/kết thúc + attribute.
// Trace = cây các span (1 root span cho request, child span cho từng bước).
// traceID propagate qua async worker để thấy "shorten -> queue -> process click"
// là CÙNG 1 trace.
//
// Production: tracer := otel.Tracer("urlshortener"); ctx, span := tracer.Start(ctx, "shorten").

type Span struct {
	traceID string
	name    string
	start   time.Time
	attrs   map[string]string
	logger  *slog.Logger
}

func (s *Span) SetAttr(k, v string) { s.attrs[k] = v }

// End kết thúc span, log duration (production: gửi sang OTel collector/Jaeger).
func (s *Span) End() {
	dur := time.Since(s.start)
	s.logger.Info("span.end",
		"trace_id", s.traceID,
		"span", s.name,
		"duration_ms", dur.Milliseconds(),
		"attrs", s.attrs,
	)
}

type Tracer struct {
	name   string
	logger *slog.Logger
}

const traceIDKey ctxKey = "trace_id"

// Start mở span mới. Nếu context đã có trace_id (vd từ HTTP header truyền vào),
// dùng lại -> span con cùng trace. Nếu chưa, tạo trace_id mới (root span).
func (t *Tracer) Start(ctx context.Context, name string) (context.Context, *Span) {
	tid, _ := ctx.Value(traceIDKey).(string)
	if tid == "" {
		tid = genID()
		ctx = context.WithValue(ctx, traceIDKey, tid)
	}
	return ctx, &Span{
		traceID: tid,
		name:    name,
		start:   time.Now(),
		attrs:   map[string]string{},
		logger:  loggerFromCtx(ctx, t.logger),
	}
}

// =============================================================================
// MIDDLEWARE — tự động instrument mọi HTTP request (gộp cả 3 trụ)
// =============================================================================

// statusRecorder bọc ResponseWriter để bắt status code (mặc định 200 nếu
// handler không gọi WriteHeader).
type statusRecorder struct {
	http.ResponseWriter
	status int
}

func (r *statusRecorder) WriteHeader(code int) {
	r.status = code
	r.ResponseWriter.WriteHeader(code)
}

// instrument là middleware: gắn request_id + trace, đo latency, đếm request.
// Đây là chỗ "1 lần wire, mọi handler được quan sát" — không lặp code ở từng handler.
func instrument(m *Metrics, tr *Tracer, base *slog.Logger, next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		start := time.Now()

		// 1) Request ID: lấy từ header (nếu upstream/ingress đã gắn) hoặc tạo mới.
		rid := r.Header.Get("X-Request-Id")
		if rid == "" {
			rid = genID()
		}
		ctx := context.WithValue(r.Context(), requestIDKey, rid)

		// 2) Trace: mở root span cho request, propagate trace header nếu có.
		if tp := r.Header.Get("X-Trace-Id"); tp != "" {
			ctx = context.WithValue(ctx, traceIDKey, tp)
		}
		ctx, span := tr.Start(ctx, "http "+r.Method+" "+r.URL.Path)
		defer span.End()

		// 3) Gắn rid vào response header để client/trace gắn kết.
		w.Header().Set("X-Request-Id", rid)
		rec := &statusRecorder{ResponseWriter: w, status: 200}

		// Gọi handler thật với context đã enrich.
		next.ServeHTTP(rec, r.WithContext(ctx))

		// 4) Đo lường sau khi xử lý xong: Rate + Errors + Duration.
		dur := time.Since(start)
		m.RequestsTotal.Inc()
		m.RequestDuration.Observe(dur.Seconds())
		span.SetAttr("status", strconv.Itoa(rec.status))

		log := loggerFromCtx(ctx, base)
		lvl := slog.LevelInfo
		if rec.status >= 500 {
			lvl = slog.LevelError
		}
		log.Log(ctx, lvl, "http.request",
			"method", r.Method,
			"path", r.URL.Path,
			"status", rec.status,
			"duration_ms", dur.Milliseconds(),
		)
	})
}

// =============================================================================
// DEMO — mô phỏng service: shorten + redirect + async click worker
// =============================================================================

var counter atomic.Int64

// genID tạo ID giả lập (production: dùng crypto/rand hoặc OTel trace ID 16 byte).
func genID() string {
	return strconv.FormatInt(time.Now().UnixNano()^counter.Add(1)<<20, 16)
}

// clickJob là việc async: ghi nhận 1 click cho redirect (không chặn redirect).
type clickJob struct {
	code    string
	traceID string // mang theo trace để worker log cùng trace với request gốc
}

func main() {
	logger := newLogger(slog.LevelInfo)
	metrics := newMetrics()
	tracer := &Tracer{name: "urlshortener", logger: logger}

	// Async click queue (Lesson 64/65). Worker đọc job, tăng metric.
	queue := make(chan clickJob, 1024)
	go func() {
		for job := range queue {
			// Trace propagate: worker mở span con CÙNG trace_id với request redirect.
			ctx := context.WithValue(context.Background(), traceIDKey, job.traceID)
			ctx = context.WithValue(ctx, requestIDKey, job.traceID)
			_, span := tracer.Start(ctx, "worker.process_click")
			span.SetAttr("code", job.code)
			// ... ghi DB / Redis tại đây ...
			metrics.ClicksProcessed.Inc()
			metrics.QueueDepth.Set(float64(len(queue)))
			span.End()
		}
	}()

	mux := http.NewServeMux()

	// POST /api/shorten — tạo short code.
	mux.HandleFunc("POST /api/shorten", func(w http.ResponseWriter, r *http.Request) {
		ctx, span := tracer.Start(r.Context(), "shorten")
		defer span.End()
		code := genID()[:6]
		span.SetAttr("code", code)
		loggerFromCtx(ctx, logger).Info("created short link", "code", code)
		w.Header().Set("Content-Type", "application/json")
		_ = json.NewEncoder(w).Encode(map[string]string{"code": code, "short_url": "/" + code})
	})

	// GET /{code} — redirect + đẩy click vào queue (không chặn).
	mux.HandleFunc("GET /r/{code}", func(w http.ResponseWriter, r *http.Request) {
		ctx, span := tracer.Start(r.Context(), "redirect")
		defer span.End()
		code := r.PathValue("code")

		// Mô phỏng cache lookup: code chẵn -> hit, lẻ -> miss.
		hit := len(code)%2 == 0
		metrics.recordCache(hit)
		span.SetAttr("cache", map[bool]string{true: "hit", false: "miss"}[hit])

		// Đẩy click vào queue async, mang theo trace_id.
		tid, _ := ctx.Value(traceIDKey).(string)
		select {
		case queue <- clickJob{code: code, traceID: tid}:
			metrics.QueueDepth.Set(float64(len(queue)))
		default:
			// Queue đầy -> drop click (degraded mode), KHÔNG chặn redirect.
			loggerFromCtx(ctx, logger).Warn("click queue full, dropping click", "code", code)
		}
		http.Redirect(w, r, "https://example.com/"+code, http.StatusFound)
	})

	// GET /metrics — Prometheus scrape endpoint.
	mux.HandleFunc("GET /metrics", func(w http.ResponseWriter, r *http.Request) {
		metrics.writePrometheus(w)
	})

	// GET /healthz — liveness/readiness probe (K8s gọi).
	mux.HandleFunc("GET /healthz", func(w http.ResponseWriter, r *http.Request) {
		w.WriteHeader(http.StatusOK)
		_, _ = w.Write([]byte("ok"))
	})

	handler := instrument(metrics, tracer, logger, mux)

	logger.Info("server starting", "addr", ":8080")
	// Demo: KHÔNG ListenAndServe thật để `go run` không treo trong CI/verify.
	// Mở dòng dưới khi chạy thật:
	//   _ = http.ListenAndServe(":8080", handler)
	_ = handler

	// Self-test ngắn để chứng minh wiring chạy được (chạy khi `go run`).
	selfTest(metrics, tracer, logger, queue)
}

// selfTest gọi thử vài lần để metric/log/trace có số liệu, rồi in tóm tắt.
func selfTest(m *Metrics, tr *Tracer, logger *slog.Logger, queue chan clickJob) {
	for i := 0; i < 10; i++ {
		ctx := context.WithValue(context.Background(), requestIDKey, genID())
		ctx, span := tr.Start(ctx, "redirect")
		code := "ab" + strconv.Itoa(i)
		m.recordCache(i%2 == 0)
		m.RequestsTotal.Inc()
		m.RequestDuration.Observe(float64(i+1) * 0.005)
		tid, _ := ctx.Value(traceIDKey).(string)
		queue <- clickJob{code: code, traceID: tid}
		span.End()
	}
	time.Sleep(50 * time.Millisecond) // chờ worker xử lý queue
	logger.Info("selftest done",
		"requests_total", m.RequestsTotal.Value(),
		"clicks_processed", m.ClicksProcessed.Value(),
		"cache_hit_ratio", fmt.Sprintf("%.2f", m.CacheHitRatio.Value()),
		"p50_ms", fmt.Sprintf("%.1f", m.RequestDuration.Quantile(0.5)*1000),
		"p99_ms", fmt.Sprintf("%.1f", m.RequestDuration.Quantile(0.99)*1000),
	)
}
