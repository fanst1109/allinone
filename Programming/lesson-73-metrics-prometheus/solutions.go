// solutions.go — Lesson 73: Metrics & Prometheus
//
// File này cài đặt MỘT bản mô phỏng thuần Go của các kiểu metric Prometheus
// (Counter / Gauge / Histogram) có hỗ trợ labels, render ra exposition text
// format, và một HTTP middleware để instrument handler.
//
// MỤC ĐÍCH: học cơ chế bên trong. Trong production bạn KHÔNG tự viết phần này —
// dùng github.com/prometheus/client_golang. Mỗi chỗ tương ứng có comment
// "// client_golang:" chỉ ra API thật.
//
// Chạy:  go run solutions.go
//   - In ra exposition format mô phỏng.
//   - Demo Counter/Gauge/Histogram + labels.
//   - Demo tính quantile từ buckets (walk-through mục 13 của README).
//   - Demo middleware instrument qua vài request giả lập.
//
// Comment tiếng Việt để học.

package main

import (
	"fmt"
	"math/rand"
	"sort"
	"strings"
	"sync"
	"time"
)

// ===========================================================================
// 1. LABELS — khóa nhận dạng một time-series
// ===========================================================================

// Labels là tập cặp key="value". Mỗi tổ hợp label = một series riêng.
// client_golang: bạn không thao tác trực tiếp Labels mà gọi .WithLabelValues(...).
type Labels map[string]string

// key sinh chuỗi định danh ổn định cho một tổ hợp label (đã sort theo key)
// để dùng làm khóa map. Đây là gốc rễ của "cardinality": mỗi key duy nhất =
// một series tốn bộ nhớ.
func (l Labels) key() string {
	if len(l) == 0 {
		return ""
	}
	keys := make([]string, 0, len(l))
	for k := range l {
		keys = append(keys, k)
	}
	sort.Strings(keys)
	var b strings.Builder
	for i, k := range keys {
		if i > 0 {
			b.WriteByte(',')
		}
		fmt.Fprintf(&b, "%s=%q", k, l[k])
	}
	return b.String()
}

// ===========================================================================
// 2. COUNTER — chỉ tăng (monotonic)
// ===========================================================================

// counterChild là một series con của CounterVec ứng với 1 tổ hợp label.
type counterChild struct {
	mu     sync.Mutex
	value  float64
	labels Labels
}

func (c *counterChild) Inc() { c.Add(1) }
func (c *counterChild) Add(v float64) { // counter không cho Add âm
	if v < 0 {
		panic("counter: không được Add giá trị âm")
	}
	c.mu.Lock()
	c.value += v
	c.mu.Unlock()
}

// CounterVec = counter có labels. client_golang: prometheus.NewCounterVec(...).
type CounterVec struct {
	name     string
	help     string
	labelKey []string // tên các label, vd ["method","status"]
	mu       sync.Mutex
	children map[string]*counterChild
}

func NewCounterVec(name, help string, labelKeys ...string) *CounterVec {
	return &CounterVec{
		name: name, help: help, labelKey: labelKeys,
		children: map[string]*counterChild{},
	}
}

// WithLabelValues chọn (hoặc tạo) series con theo thứ tự labelKey.
// client_golang: counterVec.WithLabelValues("GET","200").Inc()
func (cv *CounterVec) WithLabelValues(values ...string) *counterChild {
	if len(values) != len(cv.labelKey) {
		panic(fmt.Sprintf("counter %s: cần %d label, nhận %d",
			cv.name, len(cv.labelKey), len(values)))
	}
	lbl := Labels{}
	for i, k := range cv.labelKey {
		lbl[k] = values[i]
	}
	k := lbl.key()
	cv.mu.Lock()
	defer cv.mu.Unlock()
	if ch, ok := cv.children[k]; ok {
		return ch
	}
	ch := &counterChild{labels: lbl}
	cv.children[k] = ch
	return ch
}

// ===========================================================================
// 3. GAUGE — lên xuống tự do
// ===========================================================================

// Gauge (không label cho gọn) — client_golang: prometheus.NewGauge(...).
type Gauge struct {
	name, help string
	mu         sync.Mutex
	value      float64
}

func NewGauge(name, help string) *Gauge { return &Gauge{name: name, help: help} }
func (g *Gauge) Set(v float64)          { g.mu.Lock(); g.value = v; g.mu.Unlock() }
func (g *Gauge) Inc()                   { g.Add(1) }
func (g *Gauge) Dec()                   { g.Add(-1) } // gauge GIẢM được (khác counter)
func (g *Gauge) Add(v float64)          { g.mu.Lock(); g.value += v; g.mu.Unlock() }

// ===========================================================================
// 4. HISTOGRAM — phân phối qua buckets tích lũy
// ===========================================================================

// histogramChild là một series con của HistogramVec.
type histogramChild struct {
	mu     sync.Mutex
	bounds []float64 // cận trên các bucket (le), tăng dần, KHÔNG gồm +Inf
	counts []uint64  // counts[i] = số quan sát ≤ bounds[i] (chưa tích lũy)
	infCnt uint64    // số quan sát > bound cuối (rơi vào +Inf)
	sum    float64
	count  uint64
	labels Labels
}

// Observe đưa một giá trị vào histogram: tăng count của bucket nhỏ nhất chứa nó.
// client_golang: hist.WithLabelValues(...).Observe(seconds)
func (h *histogramChild) Observe(v float64) {
	h.mu.Lock()
	defer h.mu.Unlock()
	h.sum += v
	h.count++
	// tìm bucket đầu tiên có bound >= v
	placed := false
	for i, b := range h.bounds {
		if v <= b {
			h.counts[i]++
			placed = true
			break
		}
	}
	if !placed {
		h.infCnt++ // lớn hơn mọi bound → +Inf
	}
}

// cumulative trả về count tích lũy theo từng bound (giống _bucket{le=...}).
func (h *histogramChild) cumulative() (bounds []float64, cum []uint64, total uint64) {
	h.mu.Lock()
	defer h.mu.Unlock()
	var running uint64
	for i, b := range h.bounds {
		running += h.counts[i]
		bounds = append(bounds, b)
		cum = append(cum, running)
	}
	running += h.infCnt
	return bounds, cum, running
}

// quantile tính p (vd 0.99) từ buckets bằng NỘI SUY TUYẾN TÍNH — đúng thuật
// toán histogram_quantile của Prometheus (xem walk-through README mục 13).
func (h *histogramChild) quantile(p float64) float64 {
	bounds, cum, total := h.cumulative()
	if total == 0 {
		return 0
	}
	rank := p * float64(total) // vị trí mục tiêu
	prevCum := 0.0
	prevBound := 0.0
	for i, b := range bounds {
		if float64(cum[i]) >= rank {
			// quantile nằm trong bucket (prevBound, b]
			inBucket := float64(cum[i]) - prevCum // số quan sát trong bucket
			if inBucket == 0 {
				return b
			}
			frac := (rank - prevCum) / inBucket
			return prevBound + frac*(b-prevBound)
		}
		prevCum = float64(cum[i])
		prevBound = b
	}
	// rank vượt bound cuối → nằm trong bucket +Inf, trả bound lớn nhất
	if len(bounds) > 0 {
		return bounds[len(bounds)-1]
	}
	return 0
}

// HistogramVec = histogram có labels.
type HistogramVec struct {
	name, help string
	labelKey   []string
	buckets    []float64
	mu         sync.Mutex
	children   map[string]*histogramChild
}

func NewHistogramVec(name, help string, buckets []float64, labelKeys ...string) *HistogramVec {
	sort.Float64s(buckets)
	return &HistogramVec{
		name: name, help: help, buckets: buckets, labelKey: labelKeys,
		children: map[string]*histogramChild{},
	}
}

func (hv *HistogramVec) WithLabelValues(values ...string) *histogramChild {
	if len(values) != len(hv.labelKey) {
		panic(fmt.Sprintf("histogram %s: cần %d label, nhận %d",
			hv.name, len(hv.labelKey), len(values)))
	}
	lbl := Labels{}
	for i, k := range hv.labelKey {
		lbl[k] = values[i]
	}
	k := lbl.key()
	hv.mu.Lock()
	defer hv.mu.Unlock()
	if ch, ok := hv.children[k]; ok {
		return ch
	}
	ch := &histogramChild{
		bounds: append([]float64(nil), hv.buckets...),
		counts: make([]uint64, len(hv.buckets)),
		labels: lbl,
	}
	hv.children[k] = ch
	return ch
}

// ===========================================================================
// 5. REGISTRY + EXPOSITION FORMAT (text)
// ===========================================================================

// Registry gom các metric để render. client_golang: prometheus.DefaultRegisterer
// + promhttp.Handler() lo phần render text này.
type Registry struct {
	counters   []*CounterVec
	gauges     []*Gauge
	histograms []*HistogramVec
}

func (r *Registry) RegisterCounter(c *CounterVec)     { r.counters = append(r.counters, c) }
func (r *Registry) RegisterGauge(g *Gauge)            { r.gauges = append(r.gauges, g) }
func (r *Registry) RegisterHistogram(h *HistogramVec) { r.histograms = append(r.histograms, h) }

// fmtLabels render {k="v",...} với key đã sort cho ổn định.
func fmtLabels(l Labels, extra ...string) string {
	pairs := []string{}
	keys := make([]string, 0, len(l))
	for k := range l {
		keys = append(keys, k)
	}
	sort.Strings(keys)
	for _, k := range keys {
		pairs = append(pairs, fmt.Sprintf("%s=%q", k, l[k]))
	}
	pairs = append(pairs, extra...) // vd le="0.5"
	if len(pairs) == 0 {
		return ""
	}
	return "{" + strings.Join(pairs, ",") + "}"
}

// Gather render toàn bộ registry ra text exposition format (mục 6 README).
func (r *Registry) Gather() string {
	var b strings.Builder

	for _, c := range r.counters {
		fmt.Fprintf(&b, "# HELP %s %s\n", c.name, c.help)
		fmt.Fprintf(&b, "# TYPE %s counter\n", c.name)
		// sort children theo key để output ổn định
		keys := make([]string, 0, len(c.children))
		for k := range c.children {
			keys = append(keys, k)
		}
		sort.Strings(keys)
		for _, k := range keys {
			ch := c.children[k]
			fmt.Fprintf(&b, "%s%s %g\n", c.name, fmtLabels(ch.labels), ch.value)
		}
	}

	for _, g := range r.gauges {
		fmt.Fprintf(&b, "# HELP %s %s\n", g.name, g.help)
		fmt.Fprintf(&b, "# TYPE %s gauge\n", g.name)
		fmt.Fprintf(&b, "%s %g\n", g.name, g.value)
	}

	for _, h := range r.histograms {
		fmt.Fprintf(&b, "# HELP %s %s\n", h.name, h.help)
		fmt.Fprintf(&b, "# TYPE %s histogram\n", h.name)
		keys := make([]string, 0, len(h.children))
		for k := range h.children {
			keys = append(keys, k)
		}
		sort.Strings(keys)
		for _, k := range keys {
			ch := h.children[k]
			bounds, cum, total := ch.cumulative()
			for i, bd := range bounds {
				fmt.Fprintf(&b, "%s_bucket%s %d\n",
					h.name, fmtLabels(ch.labels, fmt.Sprintf("le=%q", trimFloat(bd))), cum[i])
			}
			fmt.Fprintf(&b, "%s_bucket%s %d\n",
				h.name, fmtLabels(ch.labels, `le="+Inf"`), total)
			fmt.Fprintf(&b, "%s_sum%s %g\n", h.name, fmtLabels(ch.labels), ch.sum)
			fmt.Fprintf(&b, "%s_count%s %d\n", h.name, fmtLabels(ch.labels), total)
		}
	}
	return b.String()
}

// trimFloat in số le gọn (0.005 thay vì 0.005000).
func trimFloat(f float64) string { return fmt.Sprintf("%g", f) }

// ===========================================================================
// 6. HTTP MIDDLEWARE INSTRUMENT (mô phỏng — không cần net/http)
// ===========================================================================
//
// Mô phỏng request để minh họa BT1: counter + histogram + in-flight gauge.
// client_golang thật: dùng promhttp + middleware bọc http.Handler (xem README BT1).

type metricsSet struct {
	reqTotal *CounterVec
	reqDur   *HistogramVec
	inFlight *Gauge
}

func newMetrics(reg *Registry) *metricsSet {
	m := &metricsSet{
		reqTotal: NewCounterVec("http_requests_total",
			"Tổng request theo method, status.", "method", "status"),
		reqDur: NewHistogramVec("http_request_duration_seconds",
			"Latency HTTP (giây).",
			[]float64{0.005, 0.01, 0.025, 0.05, 0.1, 0.25, 0.5, 1}, "method"),
		inFlight: NewGauge("http_in_flight_requests", "Request đang xử lý."),
	}
	reg.RegisterCounter(m.reqTotal)
	reg.RegisterHistogram(m.reqDur)
	reg.RegisterGauge(m.inFlight)
	return m
}

// handleRequest mô phỏng instrument 1 request: tăng in-flight, xử lý (mất
// `latency` giây), rồi ghi counter + histogram. Tương ứng middleware ở BT1.
func (m *metricsSet) handleRequest(method, status string, latencySec float64) {
	m.inFlight.Inc()
	// defer trong vòng lặp demo không hợp; ta giả lập "xong" bằng Dec ngay sau.
	m.reqTotal.WithLabelValues(method, status).Inc()
	m.reqDur.WithLabelValues(method).Observe(latencySec)
	m.inFlight.Dec()
}

// ===========================================================================
// 7. DEMO
// ===========================================================================

func main() {
	reg := &Registry{}
	m := newMetrics(reg)

	fmt.Println("=== Demo 1: instrument request giả lập ===")
	// Sinh traffic: phần lớn 200 nhanh, lác đác 500 chậm.
	rand.Seed(1)
	for i := 0; i < 1000; i++ {
		method := "GET"
		status := "200"
		// latency: phần lớn quanh 5–50ms, đuôi vài request chậm.
		lat := 0.005 + rand.Float64()*0.04
		if rand.Float64() < 0.03 { // 3% lỗi 500, chậm hơn
			status = "500"
			lat = 0.2 + rand.Float64()*0.6
		}
		m.handleRequest(method, status, lat)
	}
	// vài POST
	for i := 0; i < 100; i++ {
		m.handleRequest("POST", "201", 0.01+rand.Float64()*0.03)
	}

	fmt.Println("\n=== Demo 2: exposition format (/metrics) ===")
	fmt.Println(reg.Gather())

	fmt.Println("=== Demo 3: quantile từ histogram (server-side) ===")
	getHist := m.reqDur.WithLabelValues("GET")
	for _, p := range []float64{0.5, 0.9, 0.99} {
		fmt.Printf("GET p%2.0f latency ≈ %.4f s (%.1f ms)\n",
			p*100, getHist.quantile(p), getHist.quantile(p)*1000)
	}

	fmt.Println("\n=== Demo 4: walk-through quantile README mục 13 ===")
	// Tái hiện bảng: le=0.01→20, 0.05→60, 0.1→85, 0.5→98, +Inf→100.
	demo := &histogramChild{
		bounds: []float64{0.01, 0.05, 0.1, 0.5},
		counts: make([]uint64, 4),
	}
	// nạp đúng 100 quan sát phân bố theo bảng (count KHÔNG tích lũy):
	//   ≤0.01:20, (0.01,0.05]:40, (0.05,0.1]:25, (0.1,0.5]:13, >0.5:2
	feed := func(child *histogramChild, v float64, n int) {
		for i := 0; i < n; i++ {
			child.Observe(v)
		}
	}
	feed(demo, 0.008, 20)
	feed(demo, 0.03, 40)
	feed(demo, 0.07, 25)
	feed(demo, 0.3, 13)
	feed(demo, 0.8, 2)
	_, cum, total := demo.cumulative()
	fmt.Printf("cumulative buckets: %v  total=%d\n", cum, total)
	fmt.Printf("p50 ≈ %.4f s  (README tính tay ≈ 0.04)\n", demo.quantile(0.5))
	fmt.Printf("p90 ≈ %.4f s  (README tính tay ≈ 0.254)\n", demo.quantile(0.9))

	fmt.Println("\n=== Demo 5: cardinality cảnh báo ===")
	method, status, endpoint := 4, 5, 10
	fmt.Printf("method×status×endpoint = %d×%d×%d = %d series (OK)\n",
		method, status, endpoint, method*status*endpoint)
	fmt.Printf("thêm user_id (1tr) → %d×%d×%d×1_000_000 = %d series (NỔ)\n",
		method, status, endpoint, method*status*endpoint*1_000_000)

	_ = time.Now // giữ import time nếu cần mở rộng demo theo thời gian thực
}
