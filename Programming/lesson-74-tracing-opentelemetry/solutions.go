// solutions.go — Mini distributed-tracer thuần Go cho Lesson 74.
//
// Mục tiêu: minh hoạ CƠ CHẾ của distributed tracing mà KHÔNG cần import
// OpenTelemetry thật. Mỗi khối có comment trỏ tới API OTel tương ứng để
// bạn nối kiến thức sang code production.
//
// Bao gồm:
//   - Sinh TraceID (128-bit) / SpanID (64-bit) ngẫu nhiên, in hex.
//   - Span có parent/child, attributes, events, status.
//   - Propagation NỘI-PROCESS qua context.Context (giống OTel: ctx mang span).
//   - Propagation CROSS-PROCESS qua header W3C `traceparent` (inject/extract).
//   - Export waterfall dạng JSON + vẽ ASCII.
//   - 4 ví dụ tương ứng BT1, BT5, BT6 và 1 demo waterfall đầy đủ.
//
// Chạy:  go run solutions.go
package main

import (
	"context"
	"crypto/rand"
	"encoding/hex"
	"encoding/json"
	"fmt"
	"sort"
	"strings"
	"sync"
	"time"
)

// ============================================================================
// 1. ID — TraceID (16 byte) và SpanID (8 byte)
//    OTel thật: trace.TraceID là [16]byte, trace.SpanID là [8]byte; SDK sinh
//    bằng IDGenerator (mặc định randomIDGenerator dùng crypto/rand).
// ============================================================================

// TraceID: 128-bit, duy nhất TOÀN CỤC (qua mọi service). Vì sao 16 byte? Để
// gần như không thể trùng giữa hàng tỉ request — xem README mục 2.3.
type TraceID [16]byte

// SpanID: 64-bit, chỉ cần duy nhất TRONG một trace nên 8 byte là dư.
type SpanID [8]byte

func (t TraceID) String() string { return hex.EncodeToString(t[:]) }
func (s SpanID) String() string  { return hex.EncodeToString(s[:]) }

// IsZero: TraceID/SpanID rỗng (toàn 0) = "không hợp lệ" — giống SpanContext
// rỗng mà OTel trả về khi ctx không có span.
func (t TraceID) IsZero() bool { return t == TraceID{} }
func (s SpanID) IsZero() bool  { return s == SpanID{} }

func newTraceID() TraceID {
	var t TraceID
	_, _ = rand.Read(t[:]) // crypto/rand: nguồn ngẫu nhiên mạnh
	return t
}

func newSpanID() SpanID {
	var s SpanID
	_, _ = rand.Read(s[:])
	return s
}

// ============================================================================
// 2. SpanContext — "tấm danh thiếp" bất biến truyền qua ranh giới service.
//    OTel thật: trace.SpanContext { TraceID, SpanID, TraceFlags, ... }.
//    Đây là phần tối thiểu được serialize vào header traceparent.
// ============================================================================

type SpanContext struct {
	TraceID TraceID
	SpanID  SpanID
	Sampled bool // bit thấp nhất của trace-flags trong traceparent
}

func (sc SpanContext) IsValid() bool {
	return !sc.TraceID.IsZero() && !sc.SpanID.IsZero()
}

// ============================================================================
// 3. Span — một operation đơn lẻ. Sống trong process, chứa toàn bộ dữ liệu.
//    OTel thật: trace.Span (interface) + sdktrace.recordingSpan.
// ============================================================================

type Status int

const (
	StatusUnset Status = iota // mặc định, backend coi như OK
	StatusOk                  // chủ động đánh dấu OK (ít dùng)
	StatusError               // operation thất bại
)

func (s Status) String() string {
	switch s {
	case StatusOk:
		return "Ok"
	case StatusError:
		return "Error"
	default:
		return "Unset"
	}
}

// Event — mốc thời gian có tên BÊN TRONG span (timestamped).
// OTel thật: span.AddEvent(name, trace.WithAttributes(...)).
type Event struct {
	Name  string            `json:"name"`
	OffMs int64             `json:"offset_ms"` // ms tính từ lúc span start
	Attrs map[string]string `json:"attrs,omitempty"`
}

type Span struct {
	tracer *Tracer

	Name         string            `json:"name"`
	TraceID      TraceID           `json:"-"`
	SpanID       SpanID            `json:"-"`
	ParentSpanID SpanID            `json:"-"`
	Start        time.Time         `json:"-"`
	End          time.Time         `json:"-"`
	Attrs        map[string]string `json:"attrs,omitempty"`
	Events       []Event           `json:"events,omitempty"`
	StatusCode   Status            `json:"-"`
	StatusMsg    string            `json:"status_msg,omitempty"`

	ended bool
}

// SetAttribute — gắn key-value mô tả span (README mục 5.1).
// OTel thật: span.SetAttributes(attribute.String(k, v)).
func (sp *Span) SetAttribute(k, v string) *Span {
	if sp.Attrs == nil {
		sp.Attrs = map[string]string{}
	}
	sp.Attrs[k] = v
	return sp
}

// AddEvent — đánh dấu một mốc thời gian trong span (README mục 5.2).
func (sp *Span) AddEvent(name string, attrs map[string]string) *Span {
	off := time.Since(sp.Start).Milliseconds()
	sp.Events = append(sp.Events, Event{Name: name, OffMs: off, Attrs: attrs})
	return sp
}

// SetStatus — đặt trạng thái kết thúc (README mục 6). 5xx → Error, 4xx → Unset.
func (sp *Span) SetStatus(code Status, msg string) *Span {
	sp.StatusCode = code
	sp.StatusMsg = msg
	return sp
}

// RecordError — ghi lỗi dạng event "exception" + set status Error.
// OTel thật: span.RecordError(err); span.SetStatus(codes.Error, msg).
func (sp *Span) RecordError(err error) *Span {
	sp.AddEvent("exception", map[string]string{"message": err.Error()})
	sp.SetStatus(StatusError, err.Error())
	return sp
}

// EndAt / End — kết thúc span. OTel thật: span.End().
func (sp *Span) EndAt(t time.Time) {
	if sp.ended {
		return
	}
	sp.End = t
	sp.ended = true
}
func (sp *Span) Finish() { sp.EndAt(time.Now()) }

func (sp *Span) DurationMs() int64 {
	return sp.End.Sub(sp.Start).Milliseconds()
}

// ============================================================================
// 4. Tracer + TracerProvider — factory tạo span, thu thập span đã ghi.
//    OTel thật: TracerProvider (config SDK) -> Tracer (otel.Tracer("svc")).
// ============================================================================

type Tracer struct {
	mu      sync.Mutex
	service string
	spans   []*Span // "exporter" trong nhà: gom tất cả span đã tạo
	clock   func() time.Time
}

func NewTracer(service string) *Tracer {
	return &Tracer{service: service, clock: time.Now}
}

// ctxKey — kiểu riêng để cất Span trong context (tránh đụng key người khác).
// OTel thật: context được dùng làm carrier cho span hiện hành.
type ctxKey struct{}

// SpanFromContext — lấy span hiện hành từ ctx (giống trace.SpanFromContext).
func SpanFromContext(ctx context.Context) *Span {
	sp, _ := ctx.Value(ctxKey{}).(*Span)
	return sp
}

// SpanContextFromContext — lấy "danh thiếp" từ ctx (giống trace.SpanContextFromContext).
// Nếu không có span → trả SpanContext rỗng (IsValid()==false). Dùng cho BT5.
func SpanContextFromContext(ctx context.Context) SpanContext {
	if sp := SpanFromContext(ctx); sp != nil {
		return SpanContext{TraceID: sp.TraceID, SpanID: sp.SpanID, Sampled: true}
	}
	return SpanContext{}
}

// Start — tạo span mới làm CON của span hiện hành trong ctx, trả về ctx MỚI
// chứa span con. ĐÂY là propagation nội-process: ai nhận ctx mới sẽ thấy span
// con này làm cha. Quy tắc sống còn (README mục 11): luôn truyền ctx trả về.
//
// OTel thật: ctx, span := tracer.Start(ctx, name)
func (t *Tracer) Start(ctx context.Context, name string) (context.Context, *Span) {
	return t.startAt(ctx, name, t.clock())
}

func (t *Tracer) startAt(ctx context.Context, name string, start time.Time) (context.Context, *Span) {
	sp := &Span{tracer: t, Name: name, SpanID: newSpanID(), Start: start, StatusCode: StatusUnset}

	if parent := SpanFromContext(ctx); parent != nil {
		// Có cha trong ctx → kế thừa trace_id, nối parent_span_id.
		sp.TraceID = parent.TraceID
		sp.ParentSpanID = parent.SpanID
	} else if rsc := remoteFromContext(ctx); rsc.IsValid() {
		// Không có cha nội-process, nhưng ctx mang SpanContext REMOTE (từ
		// traceparent đã extract). Span này nối vào trace của service kia.
		sp.TraceID = rsc.TraceID
		sp.ParentSpanID = rsc.SpanID
	} else {
		// Không cha nào → đây là ROOT span: sinh trace_id mới.
		sp.TraceID = newTraceID()
	}

	t.mu.Lock()
	t.spans = append(t.spans, sp)
	t.mu.Unlock()

	return context.WithValue(ctx, ctxKey{}, sp), sp
}

// ============================================================================
// 5. Cross-process propagation — W3C traceparent (README mục 4).
//    OTel thật: propagation.TraceContext{} với Inject/Extract trên carrier.
//    Format: version-traceid-parentid-flags
//            00-<32hex>-<16hex>-<01|00>
// ============================================================================

// HTTPCarrier — giả lập header HTTP (map key->value).
type HTTPCarrier map[string]string

// Inject — ghi traceparent từ span hiện hành trong ctx vào header gửi đi.
// parent_id = span_id HIỆN TẠI (không phải root) — sai chỗ này cây bị phẳng.
func Inject(ctx context.Context, carrier HTTPCarrier) {
	sp := SpanFromContext(ctx)
	if sp == nil {
		return // không có span → không có gì để inject (sẽ gây trace đứt!)
	}
	flags := "00"
	if SpanContextFromContext(ctx).Sampled {
		flags = "01"
	}
	carrier["traceparent"] = fmt.Sprintf("00-%s-%s-%s",
		sp.TraceID.String(), sp.SpanID.String(), flags)
}

type remoteKey struct{}

// remoteFromContext — đọc SpanContext remote đã extract ra trước đó.
func remoteFromContext(ctx context.Context) SpanContext {
	sc, _ := ctx.Value(remoteKey{}).(SpanContext)
	return sc
}

// Extract — đọc traceparent từ header NHẬN về, đặt SpanContext remote vào ctx.
// Span tiếp theo tạo bởi tracer.Start sẽ nối vào trace đó (xem startAt).
func Extract(ctx context.Context, carrier HTTPCarrier) context.Context {
	tp, ok := carrier["traceparent"]
	if !ok {
		return ctx // KHÔNG có header → service này tạo trace MỚI (trace đứt!)
	}
	sc, ok := parseTraceparent(tp)
	if !ok {
		return ctx
	}
	return context.WithValue(ctx, remoteKey{}, sc)
}

func parseTraceparent(tp string) (SpanContext, bool) {
	parts := strings.Split(tp, "-")
	if len(parts) != 4 {
		return SpanContext{}, false
	}
	tidB, err1 := hex.DecodeString(parts[1])
	sidB, err2 := hex.DecodeString(parts[2])
	if err1 != nil || err2 != nil || len(tidB) != 16 || len(sidB) != 8 {
		return SpanContext{}, false
	}
	var sc SpanContext
	copy(sc.TraceID[:], tidB)
	copy(sc.SpanID[:], sidB)
	sc.Sampled = len(parts[3]) == 2 && parts[3][1] == '1' // bit thấp nhất
	return sc, true
}

// ============================================================================
// 6. Export — JSON + waterfall ASCII (README mục 12).
//    OTel thật: exporter OTLP/Jaeger; ở đây ta tự render để xem ngay.
// ============================================================================

// spanJSON — bản phẳng để in JSON đẹp (TraceID/SpanID đổi sang hex string).
type spanJSON struct {
	Name         string            `json:"name"`
	TraceID      string            `json:"trace_id"`
	SpanID       string            `json:"span_id"`
	ParentSpanID string            `json:"parent_span_id,omitempty"`
	StartMs      int64             `json:"start_ms"`
	DurationMs   int64             `json:"duration_ms"`
	Status       string            `json:"status"`
	Attrs        map[string]string `json:"attrs,omitempty"`
	Events       []Event           `json:"events,omitempty"`
}

// ExportJSON — in tất cả span dạng JSON, lấy mốc 0 là start nhỏ nhất.
func (t *Tracer) ExportJSON() string {
	t.mu.Lock()
	defer t.mu.Unlock()
	if len(t.spans) == 0 {
		return "[]"
	}
	base := t.spans[0].Start
	for _, sp := range t.spans {
		if sp.Start.Before(base) {
			base = sp.Start
		}
	}
	out := make([]spanJSON, 0, len(t.spans))
	for _, sp := range t.spans {
		sj := spanJSON{
			Name:       sp.Name,
			TraceID:    sp.TraceID.String(),
			SpanID:     sp.SpanID.String(),
			StartMs:    sp.Start.Sub(base).Milliseconds(),
			DurationMs: sp.DurationMs(),
			Status:     sp.StatusCode.String(),
			Attrs:      sp.Attrs,
			Events:     sp.Events,
		}
		if !sp.ParentSpanID.IsZero() {
			sj.ParentSpanID = sp.ParentSpanID.String()
		}
		out = append(out, sj)
	}
	b, _ := json.MarshalIndent(out, "", "  ")
	return string(b)
}

// PrintWaterfall — vẽ waterfall ASCII: thanh theo thời gian, con thụt vào cha.
func (t *Tracer) PrintWaterfall() {
	t.mu.Lock()
	spans := append([]*Span(nil), t.spans...)
	t.mu.Unlock()
	if len(spans) == 0 {
		return
	}

	// Mốc 0 + tổng độ rộng = span dài nhất tính từ base.
	base := spans[0].Start
	for _, sp := range spans {
		if sp.Start.Before(base) {
			base = sp.Start
		}
	}
	var totalMs int64 = 1
	for _, sp := range spans {
		if e := sp.End.Sub(base).Milliseconds(); e > totalMs {
			totalMs = e
		}
	}

	// children[parentID] = các con; roots = span không cha.
	children := map[string][]*Span{}
	var roots []*Span
	for _, sp := range spans {
		if sp.ParentSpanID.IsZero() {
			roots = append(roots, sp)
		} else {
			pid := sp.ParentSpanID.String()
			children[pid] = append(children[pid], sp)
		}
	}
	sortByStart := func(ss []*Span) {
		sort.SliceStable(ss, func(i, j int) bool { return ss[i].Start.Before(ss[j].Start) })
	}
	sortByStart(roots)

	const width = 56
	var draw func(sp *Span, depth int)
	draw = func(sp *Span, depth int) {
		startOff := sp.Start.Sub(base).Milliseconds()
		lead := int(startOff * width / totalMs)
		barLen := int(sp.DurationMs() * width / totalMs)
		if barLen < 1 {
			barLen = 1
		}
		if lead > width {
			lead = width
		}
		if lead+barLen > width {
			barLen = width - lead
		}
		// Dựng bar theo SỐ Ô (rune), pad đuôi để mọi dòng thẳng cột.
		bar := strings.Repeat(" ", lead) +
			strings.Repeat("█", barLen) +
			strings.Repeat(" ", width-lead-barLen)

		mark := ""
		if sp.StatusCode == StatusError {
			mark = " ⚠ERROR"
		}
		fmt.Printf("|%s| %s%s (%dms)%s\n",
			bar, strings.Repeat("  ", depth), sp.Name, sp.DurationMs(), mark)

		kids := children[sp.SpanID.String()]
		sortByStart(kids)
		for _, k := range kids {
			draw(k, depth+1)
		}
	}
	fmt.Printf("0ms%sx%dms\n", strings.Repeat(" ", width-6), totalMs)
	for _, r := range roots {
		draw(r, 0)
	}
}

// fakeWork — "ngủ" giả lập latency để waterfall có bề rộng thật.
func fakeWork(ms int64) { time.Sleep(time.Duration(ms) * time.Millisecond) }

// ============================================================================
// VÍ DỤ
// ============================================================================

// exampleWaterfall — demo đầy đủ: POST /checkout qua 4 "service" trong-process,
// nối thành cây span, có 1 span Error (bank-api), rồi export JSON + waterfall.
func exampleWaterfall() {
	fmt.Println("================ DEMO 1 — Trace waterfall (POST /checkout) ================")
	tr := NewTracer("checkout")
	ctx := context.Background()

	ctx, root := tr.Start(ctx, "POST /checkout")
	root.SetAttribute("http.method", "POST").SetAttribute("http.route", "/checkout")

	// validate order (con của root)
	_, v := tr.Start(ctx, "validate order")
	fakeWork(40)
	v.Finish()

	// charge payment -> POST bank-api (lồng 2 cấp, bank lỗi timeout)
	cctx, charge := tr.Start(ctx, "charge payment")
	_, bank := tr.Start(cctx, "POST bank-api")
	bank.SetAttribute("http.status_code", "504")
	fakeWork(120)
	bank.RecordError(fmt.Errorf("deadline exceeded after 2s")) // 5xx -> Error
	bank.Finish()
	charge.Finish()

	// reserve stock -> UPDATE inventory (tuần tự sau charge)
	rctx, reserve := tr.Start(ctx, "reserve stock")
	_, inv := tr.Start(rctx, "UPDATE inventory")
	fakeWork(30)
	inv.Finish()
	reserve.Finish()

	root.Finish()

	tr.PrintWaterfall()
	fmt.Println("\n-- JSON export (rút gọn timing) --")
	fmt.Println(tr.ExportJSON())
	fmt.Println()
}

// exampleBT1 — BT1: 3 span lồng nhau handler->service->db với mốc cố định,
// in cây + duration + self time. Dùng startAt với mốc giả để số khớp README.
func exampleBT1() {
	fmt.Println("================ BT1 — Trace 3 span lồng nhau ================")
	tr := NewTracer("orders")
	t0 := time.Unix(0, 0)
	ctx := context.Background()

	ctx, h := tr.startAt(ctx, "GET /order/42 (handler)", t0.Add(0*time.Millisecond))
	ctx, s := tr.startAt(ctx, "service.GetOrder", t0.Add(10*time.Millisecond))
	_, d := tr.startAt(ctx, "db.Query", t0.Add(30*time.Millisecond))
	d.EndAt(t0.Add(150 * time.Millisecond))
	s.EndAt(t0.Add(170 * time.Millisecond))
	h.EndAt(t0.Add(180 * time.Millisecond))

	fmt.Printf("trace_id chung: %s\n", h.TraceID)
	for _, sp := range []*Span{h, s, d} {
		parent := "∅ (root)"
		if !sp.ParentSpanID.IsZero() {
			parent = sp.ParentSpanID.String()
		}
		fmt.Printf("  span_id=%s parent=%-18s %-26s duration=%dms\n",
			sp.SpanID, parent, sp.Name, sp.DurationMs())
	}
	// self time = duration - tổng duration con trực tiếp
	fmt.Printf("self time: handler=%dms  service=%dms  db=%dms (tổng=%dms = root)\n\n",
		h.DurationMs()-s.DurationMs(),
		s.DurationMs()-d.DurationMs(),
		d.DurationMs(),
		(h.DurationMs()-s.DurationMs())+(s.DurationMs()-d.DurationMs())+d.DurationMs())
}

// exampleBT5 — BT5: logger nhúng trace_id/span_id từ ctx; không có span -> degrade.
func exampleBT5() {
	fmt.Println("================ BT5 — Link trace_id vào log ================")
	tr := NewTracer("orders")

	logWithTrace := func(ctx context.Context, msg string) {
		sc := SpanContextFromContext(ctx) // giống trace.SpanContextFromContext
		if sc.IsValid() {
			fmt.Printf("  level=info msg=%-22q trace_id=%s span_id=%s\n", msg, sc.TraceID, sc.SpanID)
		} else {
			// Không có span -> KHÔNG panic, chỉ thiếu trace_id (degrade gracefully).
			fmt.Printf("  level=info msg=%-22q (no trace context)\n", msg)
		}
	}

	logWithTrace(context.Background(), "before span") // chưa có span
	ctx, sp := tr.Start(context.Background(), "handle-request")
	logWithTrace(ctx, "inside span") // có trace_id/span_id
	sp.Finish()
	fmt.Println()
}

// exampleBT6 — BT6: span mồ côi (quên propagate) vs đã fix (inject/extract).
func exampleBT6() {
	fmt.Println("================ BT6 — Span mồ côi vs đã fix ================")

	// --- CA HỎNG: order gọi payment nhưng KHÔNG inject/extract traceparent.
	fmt.Println("[CA HỎNG] order không truyền traceparent sang payment:")
	order := NewTracer("order")
	payment := NewTracer("payment")
	octx, oSpan := order.Start(context.Background(), "order.Checkout")
	_ = octx
	// payment nhận context.Background() RỖNG -> tạo trace MỚI -> mồ côi.
	_, pSpan := payment.Start(context.Background(), "payment.Charge")
	fmt.Printf("  order.trace_id   = %s\n", oSpan.TraceID)
	fmt.Printf("  payment.trace_id = %s  <- KHÁC nhau => trace ĐỨT!\n\n", pSpan.TraceID)

	// --- CA ĐÃ FIX: inject ở order (client), extract ở payment (server).
	fmt.Println("[ĐÃ FIX] order inject traceparent -> payment extract:")
	order2 := NewTracer("order")
	payment2 := NewTracer("payment")
	o2ctx, o2 := order2.Start(context.Background(), "order.Checkout")

	carrier := HTTPCarrier{}
	Inject(o2ctx, carrier) // client ghi header
	fmt.Printf("  header gửi đi: traceparent: %s\n", carrier["traceparent"])

	pctx := Extract(context.Background(), carrier) // server đọc header
	_, p2 := payment2.Start(pctx, "payment.Charge")
	fmt.Printf("  order.trace_id   = %s\n", o2.TraceID)
	fmt.Printf("  payment.trace_id = %s  <- GIỐNG nhau => trace liền mạch\n", p2.TraceID)
	fmt.Printf("  payment.parent   = %s  (= order.span_id %s)\n",
		p2.ParentSpanID, o2.SpanID)
	fmt.Println()
}

func main() {
	exampleWaterfall()
	exampleBT1()
	exampleBT5()
	exampleBT6()
}
