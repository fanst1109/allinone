// Package analytics chứa CLICK WORKER — consumer của ClickQueue. Nó nhận
// Click event ở background và TỔNG HỢP (aggregate) thành read model Stats.
// Đây là phía "ghi" trong tách CQRS nhẹ (Lesson 67) và là consumer trong
// kiến trúc event-driven (Lesson 65).
//
// Worker cũng đóng vai trò StatsStore (read model) cho usecase GetStats:
// nó lưu số liệu đã tổng hợp trong bộ nhớ và trả snapshot khi được hỏi.
// Production: worker sẽ ghi vào Postgres/ClickHouse, còn StatsStore đọc từ đó
// — vẫn tách interface để swap được.
package analytics

import (
	"context"
	"sort"
	"sync"

	"urlshortener/internal/domain"
)

// codeAgg là số liệu tổng hợp cho MỘT code.
type codeAgg struct {
	total     int
	byDay     map[string]int  // "YYYY-MM-DD" -> count
	byRef     map[string]int  // referrer -> count
	uniqueIPs map[string]bool // tập IP đã thấy (cho BT5 — unique visitors)
}

func newCodeAgg() *codeAgg {
	return &codeAgg{
		byDay:     make(map[string]int),
		byRef:     make(map[string]int),
		uniqueIPs: make(map[string]bool),
	}
}

// Worker tiêu thụ click event và giữ read model trong bộ nhớ.
type Worker struct {
	events <-chan domain.Click

	mu   sync.RWMutex
	aggs map[string]*codeAgg

	done chan struct{} // đóng khi worker dừng hẳn (cho graceful shutdown)
	// processed đếm tổng event đã xử lý — hữu ích cho test/metrics.
	processed int
}

// NewWorker nhận channel sự kiện (từ memory.ClickQueue.Events()).
func NewWorker(events <-chan domain.Click) *Worker {
	return &Worker{
		events: events,
		aggs:   make(map[string]*codeAgg),
		done:   make(chan struct{}),
	}
}

// Run chạy vòng lặp tiêu thụ cho tới khi channel đóng (queue.Close()) hoặc
// ctx bị hủy. Gọi trong một goroutine: `go w.Run(ctx)`.
func (w *Worker) Run(ctx context.Context) {
	defer close(w.done)
	for {
		select {
		case <-ctx.Done():
			return
		case c, ok := <-w.events:
			if !ok {
				return // channel đã đóng -> drain xong, dừng
			}
			w.apply(c)
		}
	}
}

// apply cập nhật read model cho một click event. Đây là toàn bộ "logic
// aggregate": tăng tổng, tăng theo ngày, theo referrer, ghi nhận IP unique.
func (w *Worker) apply(c domain.Click) {
	w.mu.Lock()
	defer w.mu.Unlock()

	a, ok := w.aggs[c.Code]
	if !ok {
		a = newCodeAgg()
		w.aggs[c.Code] = a
	}
	a.total++
	a.byDay[domain.DayKey(c.Timestamp)]++
	if c.Referrer != "" {
		a.byRef[c.Referrer]++
	}
	if c.IP != "" {
		a.uniqueIPs[c.IP] = true
	}
	w.processed++
}

// Wait chặn cho tới khi worker dừng hẳn (channel đóng + drain xong).
func (w *Worker) Wait() { <-w.done }

// Processed trả tổng số event đã xử lý (test/metrics).
func (w *Worker) Processed() int {
	w.mu.RLock()
	defer w.mu.RUnlock()
	return w.processed
}

// --- Worker đồng thời là StatsStore (đọc read model) ---

// Snapshot trả về Stats đã tổng hợp cho code (thỏa usecase.StatsStore).
// nil nếu chưa có click nào cho code đó.
func (w *Worker) Snapshot(_ context.Context, code string) (*domain.Stats, error) {
	w.mu.RLock()
	defer w.mu.RUnlock()

	a, ok := w.aggs[code]
	if !ok {
		return nil, nil
	}

	// Copy clicks_by_day (tránh lộ map nội bộ ra ngoài).
	byDay := make(map[string]int, len(a.byDay))
	for k, v := range a.byDay {
		byDay[k] = v
	}

	// Sắp xếp top referrers giảm dần theo count (tie-break theo tên cho ổn định).
	tops := make([]domain.ReferrerStat, 0, len(a.byRef))
	for ref, cnt := range a.byRef {
		tops = append(tops, domain.ReferrerStat{Referrer: ref, Count: cnt})
	}
	sort.Slice(tops, func(i, j int) bool {
		if tops[i].Count != tops[j].Count {
			return tops[i].Count > tops[j].Count
		}
		return tops[i].Referrer < tops[j].Referrer
	})

	return &domain.Stats{
		Code:         code,
		TotalClicks:  a.total,
		ClicksByDay:  byDay,
		TopReferrers: tops,
	}, nil
}

// UniqueVisitors trả số IP duy nhất cho code (BT5).
func (w *Worker) UniqueVisitors(code string) int {
	w.mu.RLock()
	defer w.mu.RUnlock()
	if a, ok := w.aggs[code]; ok {
		return len(a.uniqueIPs)
	}
	return 0
}
