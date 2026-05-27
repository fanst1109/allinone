// Package order — Order Service.
//
// Trách nhiệm:
//   - Tạo order (Create) với trạng thái PENDING.
//   - Theo dõi vòng đời: PENDING -> CONFIRMED hoặc PENDING -> CANCELLED.
//   - Lắng nghe event bus để confirm/cancel theo quyết định của saga.
//
// Đây là một service ĐỘC LẬP: nó chỉ giữ store riêng và giao tiếp ra ngoài
// qua event bus. Order không gọi trực tiếp Payment hay Inventory.
package order

import (
	"fmt"
	"sync"

	"microservices/internal/bus"
)

// Status là trạng thái vòng đời của một order.
type Status string

const (
	StatusPending   Status = "PENDING"   // vừa tạo, saga chưa hoàn tất
	StatusConfirmed Status = "CONFIRMED" // saga thành công
	StatusCancelled Status = "CANCELLED" // saga thất bại -> đã bồi hoàn
)

// Order là một đơn hàng.
type Order struct {
	ID     string
	SKU    string // mã sản phẩm
	Qty    int    // số lượng
	Amount int    // số tiền (đơn vị nhỏ nhất, ví dụ cent) cần thanh toán
	Status Status
}

// Service quản lý vòng đời order trong bộ nhớ.
type Service struct {
	mu    sync.RWMutex
	store map[string]*Order
	bus   *bus.Bus
	dedup *bus.Dedup // idempotency cho các event mà order tiêu thụ
}

// New tạo Order Service và đăng ký các handler event lên bus.
func New(b *bus.Bus) *Service {
	s := &Service{
		store: make(map[string]*Order),
		bus:   b,
		dedup: bus.NewDedup(),
	}
	// Order phản ứng với quyết định cuối của saga.
	b.Subscribe("order.confirm", s.onConfirm)
	b.Subscribe("order.cancel", s.onCancel)
	return s
}

// Create lưu một order mới ở trạng thái PENDING. Trả về order vừa tạo.
func (s *Service) Create(o *Order) *Order {
	s.mu.Lock()
	defer s.mu.Unlock()
	o.Status = StatusPending
	s.store[o.ID] = o
	return o
}

// Get trả về order theo id (kèm cờ tồn tại).
func (s *Service) Get(id string) (*Order, bool) {
	s.mu.RLock()
	defer s.mu.RUnlock()
	o, ok := s.store[id]
	return o, ok
}

// onConfirm: saga báo order thành công => chuyển CONFIRMED (idempotent).
func (s *Service) onConfirm(e bus.Event) error {
	if s.dedup.Seen(e.ID) {
		return nil // event lặp -> bỏ qua
	}
	return s.setStatus(e.Payload["orderID"].(string), StatusConfirmed)
}

// onCancel: saga báo thất bại => chuyển CANCELLED (idempotent).
func (s *Service) onCancel(e bus.Event) error {
	if s.dedup.Seen(e.ID) {
		return nil
	}
	return s.setStatus(e.Payload["orderID"].(string), StatusCancelled)
}

func (s *Service) setStatus(id string, st Status) error {
	s.mu.Lock()
	defer s.mu.Unlock()
	o, ok := s.store[id]
	if !ok {
		return fmt.Errorf("order %s không tồn tại", id)
	}
	o.Status = st
	return nil
}
