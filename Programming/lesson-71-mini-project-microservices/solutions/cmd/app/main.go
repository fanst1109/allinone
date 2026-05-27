// Command app — chạy 3 microservice (order, payment, inventory) trong MỘT
// process, giao tiếp qua message bus in-memory, và điều phối transaction phân
// tán "đặt hàng" bằng saga orchestrator.
//
// Đây là demo CLI: chạy 2 kịch bản (thành công + thất bại->bồi hoàn) và in ra
// luồng event để quan sát. Trong production mỗi service sẽ là một process/pod
// riêng, bus là NATS/Kafka, nhưng kiến trúc (interface, event, saga) giữ nguyên.
//
// Chạy:
//
//	cd solutions && go run ./cmd/app
package main

import (
	"fmt"
	"strings"

	"microservices/internal/bus"
	"microservices/internal/inventory"
	"microservices/internal/order"
	"microservices/internal/payment"
	"microservices/internal/saga"
)

func main() {
	// --- Khởi tạo hạ tầng dùng chung ---
	b := bus.New()

	// Log mọi event ra màn hình (quan sát luồng giao tiếp giữa các service).
	for _, topic := range []string{
		"order.created", "inventory.reserved", "payment.charged", "order.confirm",
		"inventory.released", "payment.refunded", "order.cancel",
	} {
		b.Subscribe(topic, func(e bus.Event) error {
			fmt.Printf("  [bus] %-20s trace=%s id=%s\n", e.Topic, e.TraceID, e.ID)
			return nil
		})
	}

	// --- Khởi tạo 3 service độc lập ---
	orders := order.New(b)
	payments := payment.New()
	inv := inventory.New(map[string]int{"BOOK-GO": 5}) // chỉ còn 5 cuốn

	orch := saga.New(b, orders, payments, inv, saga.DefaultConfig())

	// === KỊCH BẢN 1: đặt hàng thành công ===
	fmt.Println(strings.Repeat("=", 60))
	fmt.Println("KỊCH BẢN 1 — Đặt hàng thành công (đủ hàng, thanh toán OK)")
	fmt.Println(strings.Repeat("=", 60))
	o1 := &order.Order{ID: "ord-1", SKU: "BOOK-GO", Qty: 2, Amount: 200}
	r1 := orch.PlaceOrder(o1, nil)
	b.Wait()
	printResult(r1, orders, inv, payments)

	// === KỊCH BẢN 2: hết hàng -> saga bồi hoàn ===
	fmt.Println()
	fmt.Println(strings.Repeat("=", 60))
	fmt.Println("KỊCH BẢN 2 — Hết hàng (cần 10 nhưng chỉ còn 3) -> COMPENSATE")
	fmt.Println(strings.Repeat("=", 60))
	o2 := &order.Order{ID: "ord-2", SKU: "BOOK-GO", Qty: 10, Amount: 1000}
	r2 := orch.PlaceOrder(o2, nil)
	b.Wait()
	printResult(r2, orders, inv, payments)

	// === KỊCH BẢN 3: payment bị từ chối -> bồi hoàn inventory ===
	fmt.Println()
	fmt.Println(strings.Repeat("=", 60))
	fmt.Println("KỊCH BẢN 3 — Payment bị từ chối (amount=0) -> release inventory")
	fmt.Println(strings.Repeat("=", 60))
	o3 := &order.Order{ID: "ord-3", SKU: "BOOK-GO", Qty: 1, Amount: 0} // amount<=0 => bị từ chối
	r3 := orch.PlaceOrder(o3, nil)
	b.Wait()
	printResult(r3, orders, inv, payments)
}

func printResult(r saga.Result, os *order.Service, inv *inventory.Service, ps *payment.Service) {
	fmt.Printf("\n  Kết quả: success=%v failedStep=%q\n", r.Success, r.FailedStep)
	fmt.Printf("  Forward đã chạy : %v\n", r.Forward)
	if len(r.Compensated) > 0 {
		fmt.Printf("  Bồi hoàn (ngược): %v\n", r.Compensated)
	}
	if o, ok := os.Get(r.OrderID); ok {
		fmt.Printf("  Trạng thái order: %s\n", o.Status)
	}
	fmt.Printf("  Tồn kho BOOK-GO còn lại: %d\n", inv.Stock("BOOK-GO"))
	if c, ok := ps.Get(r.OrderID); ok {
		fmt.Printf("  Payment: amount=%d refunded=%v\n", c.Amount, c.Refunded)
	} else {
		fmt.Printf("  Payment: (không có charge)\n")
	}
}
