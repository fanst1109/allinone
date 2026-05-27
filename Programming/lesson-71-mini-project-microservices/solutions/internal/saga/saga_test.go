package saga

import (
	"testing"
	"time"

	"microservices/internal/bus"
	"microservices/internal/inventory"
	"microservices/internal/order"
	"microservices/internal/payment"
)

// setup dựng đủ 3 service + bus + orchestrator cho test.
func setup(t *testing.T, stock int) (*bus.Bus, *order.Service, *payment.Service, *inventory.Service, *Orchestrator) {
	t.Helper()
	b := bus.New()
	os := order.New(b)
	ps := payment.New()
	is := inventory.New(map[string]int{"SKU1": stock})
	cfg := DefaultConfig()
	cfg.BaseBackoff = time.Millisecond // test chạy nhanh
	orch := New(b, os, ps, is, cfg)
	return b, os, ps, is, orch
}

// TestSagaSuccess: đủ hàng + thanh toán OK => order CONFIRMED, kho giảm, đã charge.
func TestSagaSuccess(t *testing.T) {
	b, os, ps, is, orch := setup(t, 10)
	ord := &order.Order{ID: "o1", SKU: "SKU1", Qty: 3, Amount: 300}

	res := orch.PlaceOrder(ord, nil)
	b.Wait()

	if !res.Success {
		t.Fatalf("mong saga thành công, nhưng fail ở %q", res.FailedStep)
	}
	wantForward := []string{"CreateOrder", "ReserveInventory", "ChargePayment", "ConfirmOrder"}
	if len(res.Forward) != len(wantForward) {
		t.Fatalf("forward = %v, mong %v", res.Forward, wantForward)
	}
	if o, _ := os.Get("o1"); o.Status != order.StatusConfirmed {
		t.Errorf("trạng thái order = %s, mong CONFIRMED", o.Status)
	}
	if got := is.Stock("SKU1"); got != 7 {
		t.Errorf("tồn kho = %d, mong 7 (10-3)", got)
	}
	if c, ok := ps.Get("o1"); !ok || c.Amount != 300 || c.Refunded {
		t.Errorf("charge = %+v, mong amount=300 refunded=false", c)
	}
}

// TestSagaCompensateOnOutOfStock: thiếu hàng => fail ngay ReserveInventory,
// chỉ CreateOrder cần bồi hoàn (CancelOrder). Kho không đổi, không charge.
func TestSagaCompensateOnOutOfStock(t *testing.T) {
	b, os, ps, is, orch := setup(t, 2)
	ord := &order.Order{ID: "o2", SKU: "SKU1", Qty: 5, Amount: 500} // cần 5 > còn 2

	res := orch.PlaceOrder(ord, nil)
	b.Wait()

	if res.Success {
		t.Fatal("mong saga thất bại do hết hàng")
	}
	if res.FailedStep != "ReserveInventory" {
		t.Errorf("failedStep = %q, mong ReserveInventory", res.FailedStep)
	}
	if o, _ := os.Get("o2"); o.Status != order.StatusCancelled {
		t.Errorf("trạng thái order = %s, mong CANCELLED", o.Status)
	}
	if got := is.Stock("SKU1"); got != 2 {
		t.Errorf("tồn kho = %d, mong giữ nguyên 2", got)
	}
	if _, ok := ps.Get("o2"); ok {
		t.Error("không nên có charge khi reserve thất bại")
	}
}

// TestSagaCompensateOnPaymentFail: hàng đủ nhưng payment từ chối (amount<=0)
// => fail ở ChargePayment, bồi hoàn release inventory + cancel order.
func TestSagaCompensateOnPaymentFail(t *testing.T) {
	b, os, ps, is, orch := setup(t, 10)
	ord := &order.Order{ID: "o3", SKU: "SKU1", Qty: 4, Amount: 0} // amount<=0 => từ chối

	res := orch.PlaceOrder(ord, nil)
	b.Wait()

	if res.Success {
		t.Fatal("mong saga thất bại do payment từ chối")
	}
	if res.FailedStep != "ChargePayment" {
		t.Errorf("failedStep = %q, mong ChargePayment", res.FailedStep)
	}
	// Bồi hoàn ngược: ReserveInventory rồi CreateOrder.
	if len(res.Compensated) != 2 {
		t.Errorf("compensated = %v, mong 2 bước", res.Compensated)
	}
	if got := is.Stock("SKU1"); got != 10 {
		t.Errorf("tồn kho = %d, mong trả về 10 sau release", got)
	}
	if o, _ := os.Get("o3"); o.Status != order.StatusCancelled {
		t.Errorf("trạng thái order = %s, mong CANCELLED", o.Status)
	}
	if _, ok := ps.Get("o3"); ok {
		t.Error("payment từ chối => không nên có charge")
	}
}

// TestRetryTransient: bước inventory fail tạm thời 1 lần rồi thành công nhờ retry (BT4).
func TestRetryTransient(t *testing.T) {
	b, os, _, is, orch := setup(t, 10)
	ord := &order.Order{ID: "o4", SKU: "SKU1", Qty: 1, Amount: 100}

	// ReserveInventory cố tình fail tạm thời 1 lần đầu.
	res := orch.PlaceOrder(ord, map[string]int{"ReserveInventory": 1})
	b.Wait()

	if !res.Success {
		t.Fatalf("mong thành công sau retry, fail ở %q", res.FailedStep)
	}
	if o, _ := os.Get("o4"); o.Status != order.StatusConfirmed {
		t.Errorf("trạng thái = %s, mong CONFIRMED", o.Status)
	}
	if got := is.Stock("SKU1"); got != 9 {
		t.Errorf("tồn kho = %d, mong 9", got)
	}
}

// TestRetryExhausted: lỗi tạm thời nhiều hơn MaxRetries => saga fail + bồi hoàn (BT4).
func TestRetryExhausted(t *testing.T) {
	b, os, _, is, orch := setup(t, 10)
	ord := &order.Order{ID: "o5", SKU: "SKU1", Qty: 1, Amount: 100}

	// MaxRetries=2 (3 lần thử). Fail 5 lần => cạn retry.
	res := orch.PlaceOrder(ord, map[string]int{"ReserveInventory": 5})
	b.Wait()

	if res.Success {
		t.Fatal("mong fail khi cạn retry")
	}
	if got := is.Stock("SKU1"); got != 10 {
		t.Errorf("tồn kho = %d, mong giữ nguyên 10", got)
	}
	if o, _ := os.Get("o5"); o.Status != order.StatusCancelled {
		t.Errorf("trạng thái = %s, mong CANCELLED", o.Status)
	}
}
