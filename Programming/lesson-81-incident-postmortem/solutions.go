// Lesson 81 — Incident Management & Postmortem
// solutions.go — minh họa bằng code Go cho các khái niệm chính của bài.
//
// Bốn công cụ:
//  1. Error budget calculator — từ SLO → downtime cho phép + tình trạng budget.
//  2. SLI tracker — tính availability / error rate từ counter (good/total/5xx).
//  3. Incident severity classifier — gán SEV1..SEV4 từ tác động.
//  4. MTTR calculator — tính MTTR/MTBF/availability từ danh sách incident.
//
// Chạy: go run solutions.go
package main

import (
	"fmt"
	"sort"
	"time"
)

// ============================================================================
// 1. ERROR BUDGET CALCULATOR
// ============================================================================

// minutesInMonth: số phút trong 1 tháng quy ước 30 ngày.
const minutesInMonth = 30 * 24 * 60 // = 43200

// errorBudgetMinutes trả về downtime cho phép (phút/tháng) ứng với một SLO.
// Công thức: downtime = (1 − SLO) × tổng thời gian.
// Ví dụ: SLO 0.999 → (1 − 0.999) × 43200 = 43.2 phút.
func errorBudgetMinutes(slo float64) float64 {
	return (1 - slo) * minutesInMonth
}

// BudgetStatus mô tả tình trạng error budget tại một thời điểm.
type BudgetStatus struct {
	SLO           float64 // mục tiêu, ví dụ 0.999
	BudgetMinutes float64 // tổng budget downtime (phút/tháng)
	UsedMinutes   float64 // đã tiêu bao nhiêu phút downtime
	RemainingMin  float64 // còn lại (có thể âm nếu vượt)
	RemainingPct  float64 // phần trăm còn lại (có thể âm)
	Frozen        bool    // true nếu cạn budget → freeze feature
}

// evaluateBudget tính tình trạng budget dựa trên SLO và downtime đã dùng.
// Khi RemainingMin <= 0 → Frozen = true (dừng ship feature, focus reliability).
func evaluateBudget(slo, usedMinutes float64) BudgetStatus {
	budget := errorBudgetMinutes(slo)
	remaining := budget - usedMinutes
	var pct float64
	if budget > 0 {
		pct = remaining / budget * 100
	}
	return BudgetStatus{
		SLO:           slo,
		BudgetMinutes: budget,
		UsedMinutes:   usedMinutes,
		RemainingMin:  remaining,
		RemainingPct:  pct,
		Frozen:        remaining <= 0,
	}
}

// burnRate tính "tốc độ đốt budget" so với mức tiêu đều.
// usedMinutes trong elapsed (phút thực) so với budget trải đều cả tháng.
// Trả về số lần nhanh hơn mức bình thường (vd 10 = đốt nhanh gấp 10×).
func burnRate(slo, usedMinutes, elapsedMinutes float64) float64 {
	budget := errorBudgetMinutes(slo)
	if budget <= 0 || elapsedMinutes <= 0 {
		return 0
	}
	// mức tiêu đều: budget phân bổ tuyến tính theo thời gian đã trôi.
	expectedUse := budget * (elapsedMinutes / minutesInMonth)
	if expectedUse <= 0 {
		return 0
	}
	return usedMinutes / expectedUse
}

// ============================================================================
// 2. SLI TRACKER
// ============================================================================

// SLITracker đếm số liệu thô để tính các SLI theo kiểu request-based.
type SLITracker struct {
	Total        int64 // tổng request
	ServerErrors int64 // số request 5xx (lỗi phía server)
	FastRequests int64 // số request nhanh hơn ngưỡng latency
}

// Record ghi nhận 1 request: isServerError = trả 5xx, isFast = dưới ngưỡng latency.
func (t *SLITracker) Record(isServerError, isFast bool) {
	t.Total++
	if isServerError {
		t.ServerErrors++
	}
	if isFast {
		t.FastRequests++
	}
}

// Availability = (request không-5xx) / tổng. Trả về tỷ lệ [0..1].
func (t *SLITracker) Availability() float64 {
	if t.Total == 0 {
		return 1 // chưa có traffic coi như 100%
	}
	good := t.Total - t.ServerErrors
	return float64(good) / float64(t.Total)
}

// ErrorRate = 5xx / tổng. Trả về tỷ lệ [0..1].
func (t *SLITracker) ErrorRate() float64 {
	if t.Total == 0 {
		return 0
	}
	return float64(t.ServerErrors) / float64(t.Total)
}

// LatencySLI = (request nhanh) / tổng. Trả về tỷ lệ [0..1].
func (t *SLITracker) LatencySLI() float64 {
	if t.Total == 0 {
		return 1
	}
	return float64(t.FastRequests) / float64(t.Total)
}

// MeetsSLO kiểm tra availability hiện tại có đạt SLO không.
func (t *SLITracker) MeetsSLO(slo float64) bool {
	return t.Availability() >= slo
}

// ============================================================================
// 3. INCIDENT SEVERITY CLASSIFIER
// ============================================================================

// Severity là mức nghiêm trọng của incident.
type Severity int

const (
	SEV4 Severity = iota + 1 // tối thiểu / cosmetic
	SEV3                     // hạn chế, có workaround
	SEV2                     // suy giảm nghiêm trọng
	SEV1                     // mất toàn bộ / mất data / bảo mật
)

func (s Severity) String() string {
	switch s {
	case SEV1:
		return "SEV1"
	case SEV2:
		return "SEV2"
	case SEV3:
		return "SEV3"
	default:
		return "SEV4"
	}
}

// ResponseTime trả về thời gian phản hồi mục tiêu tương ứng severity.
func (s Severity) ResponseTime() time.Duration {
	switch s {
	case SEV1:
		return 5 * time.Minute
	case SEV2:
		return 30 * time.Minute
	case SEV3:
		return 4 * time.Hour
	default:
		return 72 * time.Hour // backlog
	}
}

// IncidentImpact mô tả tác động dùng để phân loại severity.
type IncidentImpact struct {
	TotalOutage   bool    // mất dịch vụ toàn bộ
	DataLoss      bool    // mất dữ liệu hoặc rò rỉ bảo mật
	AffectedUsers float64 // tỷ lệ user ảnh hưởng [0..1]
	HasWorkaround bool    // có cách lách tạm không
	RevenueImpact bool    // ảnh hưởng doanh thu trực tiếp (vd thanh toán)
}

// classifySeverity gán severity từ tác động. Quy tắc: khi nghi ngờ, chọn cao hơn.
func classifySeverity(im IncidentImpact) Severity {
	// SEV1: mất toàn bộ, mất data, hoặc đụng doanh thu với diện rộng.
	if im.TotalOutage || im.DataLoss || (im.RevenueImpact && im.AffectedUsers >= 0.1) {
		return SEV1
	}
	// SEV2: ảnh hưởng diện rộng không có workaround, hoặc doanh thu diện hẹp.
	if (im.AffectedUsers >= 0.2 && !im.HasWorkaround) || im.RevenueImpact {
		return SEV2
	}
	// SEV3: tác động hạn chế nhưng có workaround / diện hẹp.
	if im.AffectedUsers >= 0.05 {
		return SEV3
	}
	// còn lại: cosmetic / tối thiểu.
	return SEV4
}

// ============================================================================
// 4. MTTR / MTBF CALCULATOR
// ============================================================================

// Incident ghi lại một sự cố với thời điểm bắt đầu và thời lượng downtime.
type Incident struct {
	Start    time.Time
	Downtime time.Duration
}

// ReliabilityStats gom các chỉ số tin cậy tính được.
type ReliabilityStats struct {
	Count         int
	TotalDowntime time.Duration
	MTTR          time.Duration // trung bình thời gian khôi phục mỗi incident
	MTBF          time.Duration // trung bình thời gian giữa hai fail
	Availability  float64       // MTBF / (MTBF + MTTR)
}

// computeReliability tính MTTR/MTBF/availability từ danh sách incident trong
// một cửa sổ thời gian (window, ví dụ 30 ngày).
func computeReliability(incidents []Incident, window time.Duration) ReliabilityStats {
	n := len(incidents)
	if n == 0 {
		return ReliabilityStats{Availability: 1}
	}

	var total time.Duration
	for _, in := range incidents {
		total += in.Downtime
	}

	// MTTR = tổng downtime / số incident.
	mttr := total / time.Duration(n)

	// MTBF ≈ (thời gian khỏe mạnh) / số fail = (window − total downtime) / n.
	uptime := window - total
	if uptime < 0 {
		uptime = 0
	}
	mtbf := uptime / time.Duration(n)

	// Availability ≈ MTBF / (MTBF + MTTR).
	var avail float64
	if mtbf+mttr > 0 {
		avail = float64(mtbf) / float64(mtbf+mttr)
	}

	return ReliabilityStats{
		Count:         n,
		TotalDowntime: total,
		MTTR:          mttr,
		MTBF:          mtbf,
		Availability:  avail,
	}
}

// fiveWhys mô phỏng một chuỗi 5 Whys: mỗi phần tử là (câu hỏi, trả lời).
// Trả về root cause = câu trả lời cuối cùng.
func fiveWhys(chain [][2]string) string {
	if len(chain) == 0 {
		return ""
	}
	return chain[len(chain)-1][1]
}

// ============================================================================
// DEMO
// ============================================================================

func main() {
	fmt.Println("=== 1. Error budget calculator ===")
	for _, slo := range []float64{0.99, 0.999, 0.9995, 0.9999, 0.99999} {
		fmt.Printf("SLO %.3f%% → downtime cho phép %.2f phút/tháng\n",
			slo*100, errorBudgetMinutes(slo))
	}
	// Tình trạng budget: SLO 99.9% (43.2 phút), đã tiêu 30 phút.
	st := evaluateBudget(0.999, 30)
	fmt.Printf("\nBudget SLO 99.9%%: tổng %.1f phút, đã dùng %.0f, còn %.1f phút (%.0f%%), frozen=%v\n",
		st.BudgetMinutes, st.UsedMinutes, st.RemainingMin, st.RemainingPct, st.Frozen)
	// Vượt budget → freeze.
	st2 := evaluateBudget(0.999, 50)
	fmt.Printf("Budget SLO 99.9%%: đã dùng 50 → còn %.1f phút, frozen=%v (freeze feature!)\n",
		st2.RemainingMin, st2.Frozen)
	// Burn rate: tiêu 20 phút chỉ trong 60 phút thực.
	fmt.Printf("Burn rate (20 phút trong 1h thực): %.1f× mức bình thường\n",
		burnRate(0.999, 20, 60))

	fmt.Println("\n=== 2. SLI tracker ===")
	tr := &SLITracker{}
	// Mô phỏng 10.000 request: 15 lỗi 5xx, 9700 nhanh < ngưỡng.
	for i := 0; i < 10000; i++ {
		isErr := i < 15
		isFast := i < 9700
		tr.Record(isErr, isFast)
	}
	fmt.Printf("Total=%d, 5xx=%d\n", tr.Total, tr.ServerErrors)
	fmt.Printf("Availability = %.4f%% | ErrorRate = %.4f%% | LatencySLI = %.2f%%\n",
		tr.Availability()*100, tr.ErrorRate()*100, tr.LatencySLI()*100)
	fmt.Printf("Đạt SLO 99.9%%? %v\n", tr.MeetsSLO(0.999))

	fmt.Println("\n=== 3. Incident severity classifier ===")
	cases := []struct {
		name   string
		impact IncidentImpact
	}{
		{"Toàn bộ API trả 500", IncidentImpact{TotalOutage: true}},
		{"Rò rỉ dữ liệu user", IncidentImpact{DataLoss: true}},
		{"Thanh toán lỗi 12% giao dịch", IncidentImpact{RevenueImpact: true, AffectedUsers: 0.12}},
		{"1 region down, 30% user, không workaround", IncidentImpact{AffectedUsers: 0.30}},
		{"Feature phụ lỗi, 6% user, có workaround", IncidentImpact{AffectedUsers: 0.06, HasWorkaround: true}},
		{"Typo UI", IncidentImpact{AffectedUsers: 0.01, HasWorkaround: true}},
	}
	for _, c := range cases {
		sev := classifySeverity(c.impact)
		fmt.Printf("%-45s → %s (response ≤ %v)\n", c.name, sev, sev.ResponseTime())
	}

	fmt.Println("\n=== 4. MTTR / MTBF calculator ===")
	now := time.Now()
	incidents := []Incident{
		{Start: now.Add(-20 * 24 * time.Hour), Downtime: 12 * time.Minute},
		{Start: now.Add(-15 * 24 * time.Hour), Downtime: 8 * time.Minute},
		{Start: now.Add(-8 * 24 * time.Hour), Downtime: 25 * time.Minute},
		{Start: now.Add(-2 * 24 * time.Hour), Downtime: 15 * time.Minute},
	}
	// Sắp xếp theo thời gian (minh họa — không bắt buộc cho công thức).
	sort.Slice(incidents, func(i, j int) bool {
		return incidents[i].Start.Before(incidents[j].Start)
	})
	stats := computeReliability(incidents, 30*24*time.Hour)
	fmt.Printf("Số incident=%d, tổng downtime=%v\n", stats.Count, stats.TotalDowntime)
	fmt.Printf("MTTR=%v, MTBF=%v\n", stats.MTTR.Round(time.Minute), stats.MTBF.Round(time.Minute))
	fmt.Printf("Availability ≈ %.4f%%\n", stats.Availability*100)

	// So sánh: nếu giảm MTTR xuống 5 phút mỗi incident (rollback tự động).
	fast := make([]Incident, len(incidents))
	for i := range incidents {
		fast[i] = Incident{Start: incidents[i].Start, Downtime: 5 * time.Minute}
	}
	statsFast := computeReliability(fast, 30*24*time.Hour)
	fmt.Printf("Nếu MTTR=5 phút → availability ≈ %.4f%% (recover nhanh thắng)\n",
		statsFast.Availability*100)

	fmt.Println("\n=== 5Whys (root cause) ===")
	chain := [][2]string{
		{"Tại sao API 500?", "handler panic do con trỏ nil"},
		{"Tại sao nil?", "response thanh toán thiếu trường amount, không kiểm tra"},
		{"Tại sao không kiểm tra?", "giả định service luôn trả đủ trường"},
		{"Tại sao giả định lọt review/test?", "không có test cho response khuyết"},
		{"Tại sao không có test đó?", "thiếu chuẩn validate mọi external response"},
	}
	fmt.Printf("Root cause: %s\n", fiveWhys(chain))
}
