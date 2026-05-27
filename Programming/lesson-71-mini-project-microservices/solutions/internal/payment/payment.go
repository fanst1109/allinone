// Package payment — Payment Service.
//
// Trách nhiệm:
//   - Charge: trừ tiền (giả lập) cho một order.
//   - Refund: hoàn tiền (bước BỒI HOÀN của saga khi bước sau thất bại).
//
// Quy ước test: Charge thất bại nếu Amount <= 0 (mô phỏng thẻ bị từ chối) —
// để minh hoạ nhánh failure của saga.
//
// Idempotency (L62): mỗi lệnh charge/refund mang một idempotencyKey (chính là
// orderID ở đây). Charge cùng key 2 lần chỉ trừ tiền một lần; Refund tương tự.
package payment

import (
	"fmt"
	"sync"
)

// Charge là một bản ghi giao dịch đã trừ tiền.
type Charge struct {
	OrderID  string
	Amount   int
	Refunded bool
}

// Service mô phỏng cổng thanh toán, lưu trạng thái trong bộ nhớ.
type Service struct {
	mu      sync.Mutex
	charges map[string]*Charge // idempotencyKey (orderID) -> charge
}

// New tạo Payment Service rỗng.
func New() *Service {
	return &Service{charges: make(map[string]*Charge)}
}

// Charge trừ tiền cho order. Idempotent theo orderID: gọi lại với cùng orderID
// trả về charge cũ, không trừ thêm lần nữa.
//
// Trả về lỗi nếu amount <= 0 (giả lập thanh toán bị từ chối).
func (s *Service) Charge(orderID string, amount int) (*Charge, error) {
	s.mu.Lock()
	defer s.mu.Unlock()

	if c, ok := s.charges[orderID]; ok {
		return c, nil // đã charge trước đó -> idempotent
	}
	if amount <= 0 {
		return nil, fmt.Errorf("payment bị từ chối cho order %s (amount=%d)", orderID, amount)
	}
	c := &Charge{OrderID: orderID, Amount: amount}
	s.charges[orderID] = c
	return c, nil
}

// Refund hoàn tiền cho order (bồi hoàn). Idempotent: refund 2 lần cùng orderID
// chỉ đánh dấu Refunded một lần. Không có charge => coi như no-op (an toàn khi
// saga bồi hoàn một bước payment chưa từng chạy).
func (s *Service) Refund(orderID string) error {
	s.mu.Lock()
	defer s.mu.Unlock()
	c, ok := s.charges[orderID]
	if !ok {
		return nil // chưa charge -> không cần hoàn
	}
	c.Refunded = true
	return nil
}

// Get trả về charge theo orderID (kèm cờ tồn tại) — dùng để inspect khi test.
func (s *Service) Get(orderID string) (*Charge, bool) {
	s.mu.Lock()
	defer s.mu.Unlock()
	c, ok := s.charges[orderID]
	return c, ok
}
