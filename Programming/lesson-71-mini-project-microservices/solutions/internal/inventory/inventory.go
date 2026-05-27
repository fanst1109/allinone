// Package inventory — Inventory Service.
//
// Trách nhiệm:
//   - Reserve: giữ chỗ (trừ tồn kho) cho một order khi đặt hàng.
//   - Release: trả lại tồn kho (bước BỒI HOÀN khi bước sau của saga thất bại).
//
// Reserve thất bại nếu không đủ hàng — đây chính là điểm kích hoạt nhánh
// failure + compensate của saga trong demo.
//
// Idempotency (L62): mỗi reservation gắn với orderID. Reserve cùng orderID 2
// lần chỉ trừ kho một lần; Release tương tự.
package inventory

import (
	"fmt"
	"sync"
)

// Service quản lý tồn kho theo SKU, trong bộ nhớ.
type Service struct {
	mu       sync.Mutex
	stock    map[string]int  // sku -> số lượng còn lại
	reserved map[string]resv // orderID -> phần đã giữ (để release đúng lượng & idempotent)
}

type resv struct {
	sku string
	qty int
}

// New tạo Inventory Service với tồn kho ban đầu cho từng SKU.
func New(initial map[string]int) *Service {
	stock := make(map[string]int, len(initial))
	for k, v := range initial {
		stock[k] = v
	}
	return &Service{
		stock:    stock,
		reserved: make(map[string]resv),
	}
}

// Reserve giữ qty đơn vị của sku cho order. Idempotent theo orderID: gọi lại
// với cùng orderID không trừ thêm.
//
// Trả về lỗi nếu không đủ tồn kho => saga sẽ chuyển sang bồi hoàn.
func (s *Service) Reserve(orderID, sku string, qty int) error {
	s.mu.Lock()
	defer s.mu.Unlock()

	if _, ok := s.reserved[orderID]; ok {
		return nil // đã giữ chỗ trước đó -> idempotent
	}
	if s.stock[sku] < qty {
		return fmt.Errorf("không đủ tồn kho cho %s: cần %d, còn %d", sku, qty, s.stock[sku])
	}
	s.stock[sku] -= qty
	s.reserved[orderID] = resv{sku: sku, qty: qty}
	return nil
}

// Release trả tồn kho đã giữ cho order. Idempotent: release 2 lần cùng orderID
// chỉ cộng kho lại một lần. Chưa từng reserve => no-op an toàn.
func (s *Service) Release(orderID string) error {
	s.mu.Lock()
	defer s.mu.Unlock()
	r, ok := s.reserved[orderID]
	if !ok {
		return nil // không có gì để trả
	}
	s.stock[r.sku] += r.qty
	delete(s.reserved, orderID)
	return nil
}

// Stock trả về tồn kho hiện tại của sku — dùng để inspect khi test.
func (s *Service) Stock(sku string) int {
	s.mu.Lock()
	defer s.mu.Unlock()
	return s.stock[sku]
}
