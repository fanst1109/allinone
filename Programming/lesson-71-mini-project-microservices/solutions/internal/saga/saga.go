// Package saga — Saga Orchestrator cho transaction phân tán "đặt hàng" (L66).
//
// Vấn đề: "đặt hàng" trải qua 3 service (order, inventory, payment) không dùng
// chung một database => KHÔNG có ACID 2-phase-commit dễ dàng. Saga giải quyết
// bằng chuỗi giao dịch cục bộ, mỗi bước có MỘT hành động BỒI HOÀN (compensation)
// để "hoàn tác" nếu một bước sau thất bại.
//
// Luồng thành công (forward):
//
//	CreateOrder -> ReserveInventory -> ChargePayment -> ConfirmOrder
//
// Khi một bước thất bại, orchestrator chạy NGƯỢC các compensation của những
// bước ĐÃ thành công trước đó:
//
//	ReleaseInventory, RefundPayment, CancelOrder
//
// Đặc tính sản xuất được mô phỏng:
//   - Idempotency (L62): mỗi event mang ID; consumer dedup.
//   - Event-driven (L65): các bước phát event lên bus để service khác/khán giả quan sát.
//   - Timeout cho mỗi bước (BT2): bước treo quá Timeout => coi như fail => bồi hoàn.
//   - Retry + backoff (BT4): lỗi tạm thời được thử lại trước khi tuyên bố fail.
//   - Trace ID (BT5): correlation ID xuyên suốt mọi event của một saga.
package saga

import (
	"context"
	"fmt"
	"time"

	"microservices/internal/bus"
	"microservices/internal/inventory"
	"microservices/internal/order"
	"microservices/internal/payment"
)

// Step là một bước forward + hành động bồi hoàn của nó.
type Step struct {
	Name       string                          // tên bước (để log)
	Action     func(ctx context.Context) error // hành động tiến
	Compensate func(ctx context.Context) error // hành động lùi (hoàn tác)
}

// Config tinh chỉnh hành vi của orchestrator.
type Config struct {
	StepTimeout time.Duration // BT2: thời gian tối đa cho mỗi bước
	MaxRetries  int           // BT4: số lần thử lại cho lỗi tạm thời
	BaseBackoff time.Duration // BT4: backoff cơ sở (nhân đôi mỗi lần)
}

// DefaultConfig là cấu hình hợp lý cho demo/test (nhanh).
func DefaultConfig() Config {
	return Config{
		StepTimeout: 5 * time.Second,
		MaxRetries:  2,
		BaseBackoff: 10 * time.Millisecond,
	}
}

// Orchestrator điều phối saga place-order trên 3 service qua bus.
type Orchestrator struct {
	bus       *bus.Bus
	orders    *order.Service
	payments  *payment.Service
	inventory *inventory.Service
	cfg       Config
	seq       int // bộ đếm để sinh event ID ổn định
}

// New tạo orchestrator.
func New(b *bus.Bus, os *order.Service, ps *payment.Service, is *inventory.Service, cfg Config) *Orchestrator {
	return &Orchestrator{bus: b, orders: os, payments: ps, inventory: is, cfg: cfg}
}

// Result tóm tắt kết quả chạy saga.
type Result struct {
	OrderID     string
	Success     bool
	FailedStep  string   // bước gây fail (rỗng nếu thành công)
	Forward     []string // các bước forward đã chạy xong
	Compensated []string // các bước bồi hoàn đã chạy (theo thứ tự thực thi)
	TraceID     string
}

// PlaceOrder chạy saga đặt hàng cho một order đã có (ở trạng thái PENDING).
//
// transientFails: map[stepName]count — số lần ĐẦU mà bước đó cố tình fail tạm
// thời (để demo retry/backoff). Truyền nil nếu không mô phỏng lỗi tạm thời.
func (o *Orchestrator) PlaceOrder(ord *order.Order, transientFails map[string]int) Result {
	traceID := fmt.Sprintf("trace-%s", ord.ID) // BT5: correlation ID cho cả saga
	res := Result{OrderID: ord.ID, TraceID: traceID}

	// Định nghĩa các bước forward + compensation tương ứng.
	steps := []Step{
		{
			Name: "CreateOrder",
			Action: func(ctx context.Context) error {
				o.orders.Create(ord)
				o.emit(traceID, "order.created", ord.ID, map[string]any{"orderID": ord.ID})
				return nil
			},
			// Bồi hoàn của CreateOrder = CancelOrder: phát order.cancel.
			Compensate: func(ctx context.Context) error {
				o.emit(traceID, "order.cancel", ord.ID, map[string]any{"orderID": ord.ID})
				return nil
			},
		},
		{
			Name: "ReserveInventory",
			Action: func(ctx context.Context) error {
				if err := o.inventory.Reserve(ord.ID, ord.SKU, ord.Qty); err != nil {
					return err
				}
				o.emit(traceID, "inventory.reserved", ord.ID, map[string]any{"orderID": ord.ID, "sku": ord.SKU, "qty": ord.Qty})
				return nil
			},
			Compensate: func(ctx context.Context) error {
				err := o.inventory.Release(ord.ID)
				o.emit(traceID, "inventory.released", ord.ID, map[string]any{"orderID": ord.ID})
				return err
			},
		},
		{
			Name: "ChargePayment",
			Action: func(ctx context.Context) error {
				if _, err := o.payments.Charge(ord.ID, ord.Amount); err != nil {
					return err
				}
				o.emit(traceID, "payment.charged", ord.ID, map[string]any{"orderID": ord.ID, "amount": ord.Amount})
				return nil
			},
			Compensate: func(ctx context.Context) error {
				err := o.payments.Refund(ord.ID)
				o.emit(traceID, "payment.refunded", ord.ID, map[string]any{"orderID": ord.ID})
				return err
			},
		},
		{
			Name: "ConfirmOrder",
			Action: func(ctx context.Context) error {
				o.emit(traceID, "order.confirm", ord.ID, map[string]any{"orderID": ord.ID})
				return nil
			},
			// ConfirmOrder là bước cuối — nếu nó chạy xong nghĩa là saga thành
			// công, không cần bồi hoàn. Để no-op cho an toàn.
			Compensate: func(ctx context.Context) error { return nil },
		},
	}

	// Chạy forward, nhớ lại các bước đã xong để bồi hoàn nếu cần.
	var done []Step
	for _, st := range steps {
		err := o.runWithRetry(st, transientFails)
		if err != nil {
			// Bước này fail => bồi hoàn các bước ĐÃ xong theo thứ tự NGƯỢC.
			res.FailedStep = st.Name
			res.Compensated = o.compensate(done)
			res.Success = false
			return res
		}
		done = append(done, st)
		res.Forward = append(res.Forward, st.Name)
	}

	res.Success = true
	return res
}

// runWithRetry chạy Action của một bước với timeout (BT2) + retry/backoff (BT4).
func (o *Orchestrator) runWithRetry(st Step, transientFails map[string]int) error {
	var lastErr error
	for attempt := 0; attempt <= o.cfg.MaxRetries; attempt++ {
		// BT4: mô phỏng lỗi tạm thời — bước fail count lần đầu rồi mới thành công.
		if transientFails != nil && transientFails[st.Name] > 0 {
			transientFails[st.Name]--
			lastErr = fmt.Errorf("lỗi tạm thời ở %s (còn %d lần)", st.Name, transientFails[st.Name])
			o.backoff(attempt)
			continue
		}

		// BT2: bọc Action trong timeout. Action treo quá StepTimeout => fail.
		ctx, cancel := context.WithTimeout(context.Background(), o.cfg.StepTimeout)
		errCh := make(chan error, 1)
		go func() { errCh <- st.Action(ctx) }()

		select {
		case err := <-errCh:
			cancel()
			if err == nil {
				return nil // bước thành công
			}
			// Lỗi nghiệp vụ (hết hàng, payment từ chối) => KHÔNG retry, fail luôn.
			return err
		case <-ctx.Done():
			cancel()
			lastErr = fmt.Errorf("bước %s timeout sau %s", st.Name, o.cfg.StepTimeout)
			o.backoff(attempt)
		}
	}
	return lastErr
}

// backoff ngủ theo cấp số nhân (exponential backoff) trước lần retry kế tiếp.
func (o *Orchestrator) backoff(attempt int) {
	d := o.cfg.BaseBackoff * (1 << attempt) // base * 2^attempt
	time.Sleep(d)
}

// compensate chạy Compensate của các bước ĐÃ thành công theo thứ tự NGƯỢC.
// Trả về danh sách tên bước đã bồi hoàn (theo thứ tự thực thi).
func (o *Orchestrator) compensate(done []Step) []string {
	var names []string
	for i := len(done) - 1; i >= 0; i-- {
		st := done[i]
		ctx, cancel := context.WithTimeout(context.Background(), o.cfg.StepTimeout)
		_ = st.Compensate(ctx) // bồi hoàn phải idempotent & "best effort"
		cancel()
		names = append(names, st.Name)
	}
	return names
}

// emit phát một event lên bus với ID duy nhất + trace ID (BT5).
func (o *Orchestrator) emit(traceID, topic, orderID string, payload map[string]any) {
	o.seq++
	o.bus.Publish(bus.Event{
		ID:      fmt.Sprintf("%s-%s-%d", traceID, topic, o.seq),
		Topic:   topic,
		TraceID: traceID,
		Payload: payload,
	})
}
