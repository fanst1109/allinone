package memory

import (
	"urlshortener/internal/domain"
)

// ClickQueue là bản in-memory của usecase.ClickQueue, hiện thực bằng
// Go channel có buffer. Production: thay bằng Kafka/NATS/Redis Streams
// producer — interface Enqueue giữ nguyên.
//
// Enqueue được thiết kế NON-BLOCKING: nếu buffer đầy thì DROP event thay vì
// chặn đường redirect (hot path không được phép chậm vì analytics). Đây là
// trade-off có chủ đích — analytics "best effort", mất vài event không sao;
// redirect nhanh mới quan trọng. (Production có thể dùng backpressure khác.)
type ClickQueue struct {
	ch      chan domain.Click
	dropped int64 // đếm số event bị drop khi buffer đầy (quan sát được)
}

// NewClickQueue tạo queue với buffer size cho trước.
func NewClickQueue(buffer int) *ClickQueue {
	if buffer <= 0 {
		buffer = 1024
	}
	return &ClickQueue{ch: make(chan domain.Click, buffer)}
}

// Enqueue gửi event không chặn. Buffer đầy -> drop (đếm lại để quan sát).
func (q *ClickQueue) Enqueue(c domain.Click) {
	select {
	case q.ch <- c:
		// gửi thành công
	default:
		// buffer đầy -> drop, không block redirect
		q.dropped++
	}
}

// Events trả về channel để worker tiêu thụ (consumer side).
func (q *ClickQueue) Events() <-chan domain.Click { return q.ch }

// Close đóng channel — báo worker dừng (graceful shutdown).
func (q *ClickQueue) Close() { close(q.ch) }

// Dropped trả số event đã bị drop (phục vụ metrics/test).
func (q *ClickQueue) Dropped() int64 { return q.dropped }
