// Package main — lời giải Lesson 01: Tư duy như nhà kinh tế.
//
// Cách chạy:
//
//	go run solutions.go
package main

import (
	"fmt"
	"sort"
)

// ============================================================================
// 1. Chi phí cơ hội (Opportunity Cost)
// ============================================================================

// Option mô tả một phương án quyết định với giá trị kỳ vọng.
type Option struct {
	Name  string
	Value float64 // giá trị quy ra tiền (hoặc utility)
}

// OpportunityCost tính chi phí cơ hội của việc chọn `chosen` trong danh sách
// các phương án khả thi. Chi phí cơ hội = giá trị của phương án TỐT NHẤT
// trong số các phương án còn lại (không phải tổng).
//
// Trả về (chi phí cơ hội, tên phương án bị bỏ tốt nhất). Nếu chỉ có 1 phương án
// → chi phí cơ hội = 0.
func OpportunityCost(options []Option, chosenName string) (float64, string) {
	best := -1.0
	bestName := ""
	for _, o := range options {
		if o.Name == chosenName {
			continue
		}
		if o.Value > best {
			best = o.Value
			bestName = o.Name
		}
	}
	if best < 0 {
		return 0, ""
	}
	return best, bestName
}

// EconomicProfit = lãi kế toán − chi phí cơ hội.
// Đây là con số nhà kinh tế dùng để quyết định, không phải lãi kế toán.
func EconomicProfit(accountingProfit, opportunityCost float64) float64 {
	return accountingProfit - opportunityCost
}

// ============================================================================
// 2. PPF — Đường giới hạn khả năng sản xuất
// ============================================================================

// LinearPPF mô tả PPF tuyến tính với 2 hàng hóa A, B.
// hours = tổng giờ làm việc; ratesA, ratesB = năng suất (đơn vị/giờ).
type LinearPPF struct {
	Hours  float64
	RateA  float64 // đơn vị A / giờ
	RateB  float64 // đơn vị B / giờ
}

// Feasible kiểm tra tổ hợp (a, b) có khả thi không.
// Khả thi ⟺ giờ cần ≤ tổng giờ.
func (p LinearPPF) Feasible(a, b float64) bool {
	hoursNeeded := a/p.RateA + b/p.RateB
	return hoursNeeded <= p.Hours+1e-9
}

// OnFrontier kiểm tra tổ hợp (a, b) NẰM TRÊN đường PPF (dùng hết nguồn lực).
func (p LinearPPF) OnFrontier(a, b float64) bool {
	hoursNeeded := a/p.RateA + b/p.RateB
	return abs(hoursNeeded-p.Hours) < 1e-9
}

// TradeOffRate trả về tỉ lệ đánh đổi: 1 đơn vị A = bao nhiêu đơn vị B.
// = (giờ cho 1 đơn vị A) × (B/giờ) = (1/RateA) × RateB.
func (p LinearPPF) TradeOffRate() float64 {
	return p.RateB / p.RateA
}

func abs(x float64) float64 {
	if x < 0 {
		return -x
	}
	return x
}

// ============================================================================
// 3. Tư duy biên (Marginal Thinking)
// ============================================================================

// MarginalBenefit/Cost tại đơn vị thứ n.
type MarginalSchedule struct {
	MB []float64 // MB[i] = lợi ích biên của đơn vị thứ (i+1)
	MC []float64 // MC[i] = chi phí biên của đơn vị thứ (i+1)
}

// OptimalQuantity trả về số lượng tối ưu theo quy tắc:
// làm tiếp khi MB > MC, dừng khi MB <= MC.
//
// Trả về (số đơn vị tối ưu, tổng lãi). Số đơn vị tối ưu là số lớn nhất n sao cho
// MB[n-1] >= MC[n-1]. Nếu MB[0] < MC[0] ngay từ đầu → tối ưu = 0.
func (s MarginalSchedule) OptimalQuantity() (int, float64) {
	if len(s.MB) != len(s.MC) {
		panic("MB và MC phải có cùng độ dài")
	}
	optimal := 0
	totalProfit := 0.0
	for i := range s.MB {
		marginalProfit := s.MB[i] - s.MC[i]
		if marginalProfit >= 0 {
			optimal = i + 1
			totalProfit += marginalProfit
		} else {
			break
		}
	}
	return optimal, totalProfit
}

// ============================================================================
// 4. Phân bổ thời gian tối ưu (Bài tập 2)
// ============================================================================

// Activity mô tả một hoạt động với bảng MB giảm dần theo giờ.
type Activity struct {
	Name string
	MB   []float64 // MB[i] = tiện ích biên của giờ thứ (i+1)
}

// AllocateHours phân bổ `totalHours` giờ cho các hoạt động theo nguyên tắc:
// mỗi giờ phân bổ cho hoạt động có MB cao nhất hiện tại (greedy biên).
//
// Trả về (phân bổ map[tên]số giờ, tổng tiện ích).
func AllocateHours(activities []Activity, totalHours int) (map[string]int, float64) {
	allocation := make(map[string]int)
	hoursUsed := make([]int, len(activities))
	totalUtility := 0.0

	for h := 0; h < totalHours; h++ {
		// Tìm hoạt động có MB cao nhất tại giờ tiếp theo của nó
		bestIdx := -1
		bestMB := -1e18
		for i, a := range activities {
			next := hoursUsed[i]
			if next >= len(a.MB) {
				continue // hết bảng MB
			}
			if a.MB[next] > bestMB {
				bestMB = a.MB[next]
				bestIdx = i
			}
		}
		if bestIdx < 0 || bestMB <= 0 {
			break // không còn hoạt động có MB dương
		}
		hoursUsed[bestIdx]++
		totalUtility += bestMB
	}
	for i, a := range activities {
		if hoursUsed[i] > 0 {
			allocation[a.Name] = hoursUsed[i]
		}
	}
	return allocation, totalUtility
}

// ============================================================================
// 5. Demo
// ============================================================================

func main() {
	fmt.Println("=== Lesson 01 — Tư duy như nhà kinh tế ===")

	// --- 1. Chi phí cơ hội ---
	fmt.Println("\n[1] Chi phí cơ hội của đi học đại học")
	options := []Option{
		{Name: "DaiHoc", Value: -120 - 384}, // học phí + thu nhập bỏ qua (triệu)
		{Name: "DiLam", Value: 384},          // 4 năm × 12 tháng × 8tr
		{Name: "TuHoc+DiLam", Value: 384 - 20},
	}
	cost, lostOpt := OpportunityCost(options, "DaiHoc")
	fmt.Printf("  Chi phí cơ hội của 'Đại học' = %.0f triệu (so với '%s')\n", cost, lostOpt)
	fmt.Printf("  Tổng chi phí thật của 4 năm đại học = 120 + 384 = 504 triệu\n")

	// Lãi kế toán vs lãi kinh tế
	fmt.Println("\n[1b] Quán cà phê — lãi kế toán vs lãi kinh tế")
	accProfit := 100.0     // triệu/năm
	oppCost := 30.0 * 12.0 // 360 triệu (lương bỏ qua)
	econProfit := EconomicProfit(accProfit, oppCost)
	fmt.Printf("  Lãi kế toán: %.0f triệu. Chi phí cơ hội: %.0f triệu\n", accProfit, oppCost)
	fmt.Printf("  → Lãi kinh tế: %.0f triệu (âm = về kinh tế, lỗ)\n", econProfit)

	// --- 2. PPF ---
	fmt.Println("\n[2] PPF của nông dân (8 giờ, gạo 4kg/giờ, rau 6kg/giờ)")
	ppf := LinearPPF{Hours: 8, RateA: 4, RateB: 6}
	fmt.Printf("  Tỉ lệ đánh đổi: 1kg gạo = %.2fkg rau\n", ppf.TradeOffRate())
	fmt.Println("  Các tổ hợp khả thi (in trên PPF nếu dùng hết 8 giờ):")
	for h := 0; h <= 8; h += 2 {
		a := float64(h) * ppf.RateA
		b := float64(8-h) * ppf.RateB
		fmt.Printf("    %d giờ gạo + %d giờ rau → (%.0f kg gạo, %.0f kg rau)\n", h, 8-h, a, b)
	}
	tests := [][3]float64{{20, 12, 0}, {16, 18, 0}, {16, 24, 0}, {30, 30, 0}}
	for _, t := range tests {
		fmt.Printf("  (%g gạo, %g rau): khả thi=%v, đúng trên PPF=%v\n",
			t[0], t[1], ppf.Feasible(t[0], t[1]), ppf.OnFrontier(t[0], t[1]))
	}

	// --- 3. Tư duy biên ---
	fmt.Println("\n[3] Quán cà phê tuyển nhân viên (Ví dụ §4.2)")
	schedule := MarginalSchedule{
		MB: []float64{800, 600, 400, 200, 100}, // doanh thu biên
		MC: []float64{300, 300, 300, 300, 300}, // lương biên
	}
	q, profit := schedule.OptimalQuantity()
	fmt.Printf("  Số nhân viên tối ưu: %d. Tổng lãi biên: %.0fk\n", q, profit)

	// Khi lương giảm còn 150k
	schedule2 := MarginalSchedule{
		MB: []float64{800, 600, 400, 200, 100},
		MC: []float64{150, 150, 150, 150, 150},
	}
	q2, profit2 := schedule2.OptimalQuantity()
	fmt.Printf("  Lương giảm còn 150k: tối ưu = %d, tổng lãi biên = %.0fk\n", q2, profit2)

	// --- 4. Phân bổ thời gian (Bài tập 2) ---
	fmt.Println("\n[4] Phân bổ 4 giờ tối ưu (Bài tập 2)")
	activities := []Activity{
		{Name: "Học", MB: []float64{2.0, 1.5, 1.0, 0.5}},
		{Name: "Gym", MB: []float64{5.0, 3.0, 1.0, 0.0}},
		{Name: "Đọc", MB: []float64{3.0, 2.5, 2.0, 1.5}},
	}
	alloc, totalU := AllocateHours(activities, 4)
	names := make([]string, 0, len(alloc))
	for n := range alloc {
		names = append(names, n)
	}
	sort.Strings(names)
	for _, n := range names {
		fmt.Printf("  %s: %d giờ\n", n, alloc[n])
	}
	fmt.Printf("  Tổng tiện ích: %.1f\n", totalU)
}
