// solutions.go — Lesson 66: Saga Pattern (orchestration)
//
// Demo một saga orchestrator tối giản nhưng đầy đủ cơ chế:
//   - State machine chạy chuỗi step (forward), persist state sau mỗi bước.
//   - Mỗi step có compensation (semantic undo); fail giữa chừng -> bù NGƯỢC chiều.
//   - Step VÀ compensation đều IDEMPOTENT (retry an toàn, không trừ/hoàn 2 lần).
//   - State persistence in-memory (mô phỏng DB) để minh họa recover.
//
// Chạy:  go run solutions.go
//
// Lưu ý: đây là engine minh họa để HIỂU cơ chế, không phải để dùng production
// (production nên dùng Temporal / Step Functions / outbox + Kafka — xem README).
package main

import (
	"errors"
	"fmt"
	"sort"
)

// ---------------------------------------------------------------------------
// 1) State store in-memory — mô phỏng bảng saga_state trong DB bền
// ---------------------------------------------------------------------------

// SagaState là bản ghi trạng thái của một saga, lưu xuống "DB" sau mỗi bước
// để orchestrator có thể recover sau crash.
type SagaState struct {
	SagaID         string
	CurrentStep    string
	Status         string // RUNNING | COMPENSATING | DONE | ABORTED
	CompletedSteps []string
}

// StateStore là kho lưu state. Ở đây là map in-memory; production là DB.
type StateStore struct {
	data map[string]SagaState
}

func NewStateStore() *StateStore {
	return &StateStore{data: make(map[string]SagaState)}
}

// Save persist state. In ra để thấy rõ "ghi xuống DB" sau mỗi bước.
func (s *StateStore) Save(st SagaState) {
	cp := st
	cp.CompletedSteps = append([]string(nil), st.CompletedSteps...) // copy slice
	s.data[st.SagaID] = cp
	fmt.Printf("   [state] saga=%s step=%-18s status=%-12s done=%v\n",
		st.SagaID, st.CurrentStep, st.Status, st.CompletedSteps)
}

func (s *StateStore) Load(sagaID string) (SagaState, bool) {
	st, ok := s.data[sagaID]
	return st, ok
}

// ---------------------------------------------------------------------------
// 2) Các service phía dưới (Order / Payment / Inventory) — đều IDEMPOTENT
// ---------------------------------------------------------------------------

// OrderService giữ trạng thái order. CreateOrder/CancelOrder idempotent.
type OrderService struct {
	orders map[string]string // sagaID -> status (PENDING | CANCELLED)
}

func NewOrderService() *OrderService { return &OrderService{orders: map[string]string{}} }

func (o *OrderService) CreateOrder(sagaID string) error {
	if o.orders[sagaID] == "PENDING" { // đã tạo rồi -> no-op (idempotent)
		fmt.Printf("   [order] CreateOrder(%s) đã tồn tại -> no-op\n", sagaID)
		return nil
	}
	o.orders[sagaID] = "PENDING"
	fmt.Printf("   [order] CreateOrder(%s) -> PENDING\n", sagaID)
	return nil
}

func (o *OrderService) CancelOrder(sagaID string) error { // compensation, idempotent
	if o.orders[sagaID] == "CANCELLED" {
		fmt.Printf("   [order] CancelOrder(%s) đã CANCELLED -> no-op\n", sagaID)
		return nil
	}
	o.orders[sagaID] = "CANCELLED"
	fmt.Printf("   [order] CancelOrder(%s) -> CANCELLED\n", sagaID)
	return nil
}

// PaymentService trừ/hoàn tiền. Idempotent qua tập key đã xử lý.
type PaymentService struct {
	balance  int             // số dư khách (giả lập)
	charged  map[string]bool // sagaID -> đã charge?
	refunded map[string]bool
}

func NewPaymentService(balance int) *PaymentService {
	return &PaymentService{balance: balance, charged: map[string]bool{}, refunded: map[string]bool{}}
}

func (p *PaymentService) ReservePayment(sagaID string, amount int) error {
	if p.charged[sagaID] { // idempotent: charge rồi -> no-op
		fmt.Printf("   [pay] ReservePayment(%s) đã charge -> no-op\n", sagaID)
		return nil
	}
	if p.balance < amount {
		return fmt.Errorf("số dư không đủ (%d < %d)", p.balance, amount)
	}
	p.balance -= amount
	p.charged[sagaID] = true
	fmt.Printf("   [pay] ReservePayment(%s) charge %d -> balance=%d\n", sagaID, amount, p.balance)
	return nil
}

func (p *PaymentService) RefundPayment(sagaID string, amount int) error { // compensation, idempotent
	if !p.charged[sagaID] { // chưa charge thì không có gì để hoàn
		fmt.Printf("   [pay] RefundPayment(%s) chưa từng charge -> no-op\n", sagaID)
		return nil
	}
	if p.refunded[sagaID] { // idempotent: đã hoàn rồi -> no-op (tránh hoàn 2 lần)
		fmt.Printf("   [pay] RefundPayment(%s) đã refund -> no-op\n", sagaID)
		return nil
	}
	p.balance += amount
	p.refunded[sagaID] = true
	fmt.Printf("   [pay] RefundPayment(%s) +%d -> balance=%d\n", sagaID, amount, p.balance)
	return nil
}

// InventoryService giữ kho. Có thể ép fail để demo compensation.
type InventoryService struct {
	qty      int
	reserved map[string]bool // sagaID -> đã giữ?
	failNext bool            // ép ReserveInventory fail (mô phỏng hết hàng)
}

func NewInventoryService(qty int) *InventoryService {
	return &InventoryService{qty: qty, reserved: map[string]bool{}}
}

func (inv *InventoryService) ReserveInventory(sagaID string) error {
	if inv.reserved[sagaID] { // idempotent
		fmt.Printf("   [inv] ReserveInventory(%s) đã giữ -> no-op\n", sagaID)
		return nil
	}
	if inv.failNext {
		return errors.New("OUT_OF_STOCK")
	}
	if inv.qty <= 0 {
		return errors.New("OUT_OF_STOCK")
	}
	inv.qty--
	inv.reserved[sagaID] = true
	fmt.Printf("   [inv] ReserveInventory(%s) -> qty=%d\n", sagaID, inv.qty)
	return nil
}

func (inv *InventoryService) ReleaseInventory(sagaID string) error { // compensation, idempotent
	if !inv.reserved[sagaID] {
		fmt.Printf("   [inv] ReleaseInventory(%s) chưa giữ -> no-op\n", sagaID)
		return nil
	}
	inv.qty++
	inv.reserved[sagaID] = false
	fmt.Printf("   [inv] ReleaseInventory(%s) -> qty=%d\n", sagaID, inv.qty)
	return nil
}

// ---------------------------------------------------------------------------
// 3) Saga engine — orchestration state machine
// ---------------------------------------------------------------------------

// Step là một bước của saga: hành động Do + compensation Undo.
type Step struct {
	Name string
	Do   func(sagaID string) error // local transaction
	Undo func(sagaID string) error // compensating transaction (semantic undo)
}

// Orchestrator chạy các step, persist state, bù ngược khi fail.
type Orchestrator struct {
	store *StateStore
}

// retry gọi fn tối đa n lần — minh họa forward recovery / retry compensation.
// (Bỏ qua backoff thật cho gọn; ý tưởng là compensation idempotent nên retry an toàn.)
func retry(n int, fn func() error) error {
	var err error
	for i := 0; i < n; i++ {
		if err = fn(); err == nil {
			return nil
		}
		fmt.Printf("   [retry] lần %d thất bại: %v\n", i+1, err)
	}
	return err
}

// Run chạy saga forward; nếu một step fail thì bù NGƯỢC các step đã xong.
func (or *Orchestrator) Run(sagaID string, steps []Step) error {
	st := SagaState{SagaID: sagaID, Status: "RUNNING"}
	completed := []int{} // index các step đã thành công

	for i, step := range steps {
		st.CurrentStep = step.Name
		st.Status = "RUNNING"
		st.CompletedSteps = names(steps, completed)
		or.store.Save(st) // persist TRƯỚC khi call (để recover biết đang ở đâu)

		if err := step.Do(sagaID); err != nil {
			fmt.Printf(">> Step %q FAIL: %v -> bắt đầu compensate ngược\n", step.Name, err)
			or.compensate(sagaID, steps, completed, &st)
			st.Status = "ABORTED"
			st.CompletedSteps = names(steps, completed)
			or.store.Save(st)
			return fmt.Errorf("saga %s aborted tại %q: %w", sagaID, step.Name, err)
		}
		completed = append(completed, i)
		st.CompletedSteps = names(steps, completed)
		or.store.Save(st) // persist SAU khi step xong (cập nhật completedSteps)
	}

	st.CurrentStep = ""
	st.Status = "DONE"
	st.CompletedSteps = names(steps, completed)
	or.store.Save(st)
	return nil
}

// compensate chạy Undo của các step đã hoàn thành, theo thứ tự NGƯỢC.
func (or *Orchestrator) compensate(sagaID string, steps []Step, completed []int, st *SagaState) {
	st.Status = "COMPENSATING"
	for j := len(completed) - 1; j >= 0; j-- {
		idx := completed[j]
		step := steps[idx]
		st.CurrentStep = "COMP_" + step.Name
		or.store.Save(*st)
		// compensation idempotent -> retry an toàn (BT4)
		if err := retry(3, func() error { return step.Undo(sagaID) }); err != nil {
			fmt.Printf("   [!!] compensation %q vẫn FAIL sau retry -> cần manual intervention\n", step.Name)
		}
	}
}

// names trả về tên các step theo danh sách index đã hoàn thành.
func names(steps []Step, idx []int) []string {
	out := make([]string, 0, len(idx))
	for _, i := range idx {
		out = append(out, steps[i].Name)
	}
	return out
}

// ---------------------------------------------------------------------------
// 4) Lắp ráp order saga + demo
// ---------------------------------------------------------------------------

// buildOrderSaga tạo 3 step: CreateOrder -> ReservePayment -> ReserveInventory.
func buildOrderSaga(o *OrderService, p *PaymentService, inv *InventoryService, amount int) []Step {
	return []Step{
		{
			Name: "CreateOrder",
			Do:   func(id string) error { return o.CreateOrder(id) },
			Undo: func(id string) error { return o.CancelOrder(id) },
		},
		{
			Name: "ReservePayment",
			Do:   func(id string) error { return p.ReservePayment(id, amount) },
			Undo: func(id string) error { return p.RefundPayment(id, amount) },
		},
		{
			Name: "ReserveInventory",
			Do:   func(id string) error { return inv.ReserveInventory(id) },
			Undo: func(id string) error { return inv.ReleaseInventory(id) },
		},
	}
}

func main() {
	fmt.Println("================ DEMO 1: Order saga THÀNH CÔNG ================")
	{
		o := NewOrderService()
		p := NewPaymentService(500)
		inv := NewInventoryService(3)
		or := &Orchestrator{store: NewStateStore()}

		steps := buildOrderSaga(o, p, inv, 100)
		err := or.Run("saga-success", steps)
		fmt.Printf(">> Kết quả: err=%v | balance khách=%d | kho còn=%d\n", err, p.balance, inv.qty)
	}

	fmt.Println("\n========= DEMO 2: Inventory FAIL -> compensate ngược =========")
	{
		o := NewOrderService()
		p := NewPaymentService(500)
		inv := NewInventoryService(3)
		inv.failNext = true // ép hết hàng ở bước ReserveInventory

		or := &Orchestrator{store: NewStateStore()}
		steps := buildOrderSaga(o, p, inv, 100)
		err := or.Run("saga-fail", steps)

		// Sau khi compensate: tiền phải được HOÀN (balance về 500), kho không đổi.
		fmt.Printf(">> Kết quả: err=%v\n", err)
		fmt.Printf(">> balance khách=%d (đã hoàn về 500?) | kho còn=%d | order=%s\n",
			p.balance, inv.qty, o.orders["saga-fail"])
	}

	fmt.Println("\n===== DEMO 3: Idempotency — chạy lại step đã xong (retry) =====")
	{
		p := NewPaymentService(500)
		// charge 100 ba lần với cùng sagaID -> chỉ trừ 1 lần
		for i := 1; i <= 3; i++ {
			_ = p.ReservePayment("saga-idem", 100)
		}
		fmt.Printf(">> Sau 3 lần ReservePayment(100): balance=%d (mong đợi 400)\n", p.balance)

		// refund hai lần -> chỉ hoàn 1 lần
		_ = p.RefundPayment("saga-idem", 100)
		_ = p.RefundPayment("saga-idem", 100)
		fmt.Printf(">> Sau 2 lần RefundPayment(100): balance=%d (mong đợi 500)\n", p.balance)
	}

	fmt.Println("\n===== DEMO 4: Recover từ state đã persist (mô phỏng crash) =====")
	{
		store := NewStateStore()
		// Giả lập state đã ghi trước khi crash: đã xong CreateOrder + ReservePayment.
		store.Save(SagaState{
			SagaID:         "saga-recover",
			CurrentStep:    "ReservePayment",
			Status:         "RUNNING",
			CompletedSteps: []string{"CreateOrder", "ReservePayment"},
		})
		st, _ := store.Load("saga-recover")
		fmt.Printf(">> Khởi động lại, đọc state: status=%s, đã xong=%v\n", st.Status, st.CompletedSteps)
		remaining := allSteps()
		done := map[string]bool{}
		for _, s := range st.CompletedSteps {
			done[s] = true
		}
		var todo []string
		for _, s := range remaining {
			if !done[s] {
				todo = append(todo, s)
			}
		}
		sort.Strings(st.CompletedSteps)
		fmt.Printf(">> Cần tiếp tục (forward) từ các bước chưa làm: %v\n", todo)
		fmt.Println(">> Nhờ idempotency, gọi lại bước đã làm cũng an toàn.")
	}
}

// allSteps liệt kê tên đầy đủ các bước của order saga (cho demo recover).
func allSteps() []string {
	return []string{"CreateOrder", "ReservePayment", "ReserveInventory"}
}
