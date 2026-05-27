// Lesson 67 — CQRS & Event Sourcing
//
// File này mô phỏng (in-memory) một hệ Event Sourcing tối giản để CHẠY ĐƯỢC
// mà không cần hạ tầng ngoài. Bao gồm:
//   - Event store append-only (Append / Load / LoadFrom).
//   - Aggregate Account: apply event, replay để dựng state.
//   - Snapshot: lưu state tại checkpoint, load nhanh không replay từ đầu.
//   - Projection: dựng read model (lịch sử giao dịch) từ event stream.
//   - CQRS cho Order: tách write model (validate) khỏi read model (denormalized).
//   - Event versioning: upcaster nâng event v1 -> v2.
//
// CHẠY: go run solutions.go
//
// LƯU Ý: trong hệ thống thật, event store thường là DB chuyên dụng
// (EventStoreDB) hoặc một bảng SQL append-only; projection chạy bất đồng bộ
// qua message bus (Kafka/NATS). Ở đây ta làm in-memory cho dễ học.

package main

import (
	"errors"
	"fmt"
)

// ============================================================================
// 1. EVENT — đơn vị bất biến, mô tả việc ĐÃ xảy ra (thì quá khứ)
// ============================================================================

// Event là marker interface cho mọi event.
type Event interface{ isEvent() }

// Các event của aggregate Account.
type AccountOpened struct{ Owner string }
type Deposited struct {
	Amount   int
	Currency string // có ở schema v2
}
type Withdrew struct{ Amount int }

// DepositedV1 — schema CŨ (v1), chỉ có Amount, KHÔNG có Currency.
// Mô phỏng event đã ghi trong store từ trước khi nâng cấp schema.
type DepositedV1 struct{ Amount int }

func (AccountOpened) isEvent() {}
func (Deposited) isEvent()     {}
func (Withdrew) isEvent()      {}
func (DepositedV1) isEvent()   {}

// ============================================================================
// 2. EVENT STORE — append-only, immutable, ordered per aggregate
// ============================================================================

// storedEvent gắn event với version (thứ tự trong stream của aggregate).
type storedEvent struct {
	version int
	event   Event
}

// EventStore in-memory: map aggregateID -> chuỗi event theo thứ tự.
type EventStore struct {
	streams map[string][]storedEvent
}

func NewEventStore() *EventStore {
	return &EventStore{streams: make(map[string][]storedEvent)}
}

// Append: thêm event vào CUỐI stream. expectedVersion là optimistic
// concurrency — nếu version hiện tại khác kỳ vọng, ai đó vừa ghi -> từ chối.
func (s *EventStore) Append(id string, events []Event, expectedVersion int) error {
	cur := len(s.streams[id])
	if cur != expectedVersion {
		return fmt.Errorf("xung đột version: store=%d, kỳ vọng=%d", cur, expectedVersion)
	}
	for _, e := range events {
		cur++
		s.streams[id] = append(s.streams[id], storedEvent{version: cur, event: e})
	}
	return nil
}

// Load: đọc TẤT CẢ event của aggregate, theo đúng thứ tự (đã upcast).
func (s *EventStore) Load(id string) []Event {
	return s.LoadFrom(id, 0)
}

// LoadFrom: đọc event SAU một version cho trước (dùng cùng snapshot).
// Mọi event được upcast về schema mới nhất trước khi trả ra.
func (s *EventStore) LoadFrom(id string, fromVersion int) []Event {
	var out []Event
	for _, se := range s.streams[id] {
		if se.version > fromVersion {
			out = append(out, upcast(se.event)) // upcast LÚC LOAD
		}
	}
	return out
}

// CurrentVersion: số event hiện có trong stream (= version cuối).
func (s *EventStore) CurrentVersion(id string) int {
	return len(s.streams[id])
}

// ============================================================================
// 3. UPCASTER — event versioning: nâng schema cũ lên mới LÚC ĐỌC
// ============================================================================

// upcast nâng DepositedV1 (không có Currency) lên Deposited v2 (mặc định VND).
// Event v2 giữ nguyên. Store KHÔNG bị sửa — chỉ biến đổi lúc đọc.
func upcast(e Event) Event {
	if v1, ok := e.(DepositedV1); ok {
		return Deposited{Amount: v1.Amount, Currency: "VND"}
	}
	return e
}

// ============================================================================
// 4. AGGREGATE Account — apply event, replay để dựng state
// ============================================================================

type Account struct {
	Owner   string
	Balance int
	Version int // số event đã apply
}

// apply: hàm THUẦN (state, event) -> state. KHÔNG validate, KHÔNG I/O.
// Validate là việc của command handler TRƯỚC khi sinh event.
func (a Account) apply(e Event) Account {
	switch ev := e.(type) {
	case AccountOpened:
		a.Owner = ev.Owner
		a.Balance = 0
	case Deposited:
		a.Balance += ev.Amount
	case Withdrew:
		a.Balance -= ev.Amount
	}
	a.Version++
	return a
}

// replay: fold toàn bộ event từ state rỗng. state = events.reduce(apply).
func replay(events []Event) Account {
	var acc Account
	for _, e := range events {
		acc = acc.apply(e)
	}
	return acc
}

// ============================================================================
// 5. COMMAND HANDLER — nơi VALIDATE business rule rồi sinh event
// ============================================================================

// deposit: command nạp tiền. Luôn hợp lệ nếu amount > 0.
func deposit(store *EventStore, id string, amount int) error {
	if amount <= 0 {
		return errors.New("số tiền nạp phải > 0")
	}
	v := store.CurrentVersion(id)
	return store.Append(id, []Event{Deposited{Amount: amount, Currency: "VND"}}, v)
}

// withdraw: command rút tiền. VALIDATE số dư đủ TRƯỚC khi sinh event.
func withdraw(store *EventStore, id string, amount int) error {
	if amount <= 0 {
		return errors.New("số tiền rút phải > 0")
	}
	// Dựng state hiện tại để kiểm tra business rule.
	acc := replay(store.Load(id))
	if acc.Balance < amount {
		return fmt.Errorf("số dư không đủ: có %d, rút %d", acc.Balance, amount)
	}
	v := store.CurrentVersion(id)
	return store.Append(id, []Event{Withdrew{Amount: amount}}, v)
}

// ============================================================================
// 6. SNAPSHOT — lưu state tại checkpoint, load nhanh không replay từ đầu
// ============================================================================

type Snapshot struct {
	Version int
	State   Account
}

// SnapshotStore in-memory: aggregateID -> snapshot gần nhất.
type SnapshotStore struct {
	snaps map[string]Snapshot
}

func NewSnapshotStore() *SnapshotStore { return &SnapshotStore{snaps: make(map[string]Snapshot)} }

func (ss *SnapshotStore) Save(id string, snap Snapshot) { ss.snaps[id] = snap }
func (ss *SnapshotStore) Latest(id string) (Snapshot, bool) {
	s, ok := ss.snaps[id]
	return s, ok
}

// maybeSnapshot: tạo snapshot mỗi `every` event (vd 100).
func maybeSnapshot(store *EventStore, ss *SnapshotStore, id string, every int) {
	v := store.CurrentVersion(id)
	if v > 0 && v%every == 0 {
		ss.Save(id, Snapshot{Version: v, State: replay(store.Load(id))})
	}
}

// loadWithSnapshot: dựng state nhanh — bắt đầu từ snapshot gần nhất rồi chỉ
// replay event SAU đó. Trả về state và SỐ event đã replay (để minh hoạ chi phí).
func loadWithSnapshot(store *EventStore, ss *SnapshotStore, id string) (Account, int) {
	var acc Account
	from := 0
	if snap, ok := ss.Latest(id); ok {
		acc = snap.State
		from = snap.Version
	}
	events := store.LoadFrom(id, from)
	for _, e := range events {
		acc = acc.apply(e)
	}
	return acc, len(events)
}

// ============================================================================
// 7. PROJECTION — dựng read model (denormalized) từ event stream
// ============================================================================

// TxRow — read model "lịch sử giao dịch". Balance tính sẵn cho từng dòng.
type TxRow struct {
	Seq     int
	Type    string
	Amount  int
	Balance int // số dư SAU giao dịch
}

// projectHistory: chiếu event stream thành []TxRow để hiển thị thẳng lên UI.
func projectHistory(events []Event) []TxRow {
	var rows []TxRow
	balance := 0
	for i, e := range events {
		switch ev := e.(type) {
		case Deposited:
			balance += ev.Amount
			rows = append(rows, TxRow{i, "deposit", ev.Amount, balance})
		case Withdrew:
			balance -= ev.Amount
			rows = append(rows, TxRow{i, "withdraw", ev.Amount, balance})
		}
	}
	return rows
}

// Stats — projection KHÁC trên CÙNG stream (multiple read model).
type Stats struct{ TotalIn, TotalOut, TxCount int }

func projectStats(events []Event) Stats {
	var s Stats
	for _, e := range events {
		switch ev := e.(type) {
		case Deposited:
			s.TotalIn += ev.Amount
			s.TxCount++
		case Withdrew:
			s.TotalOut += ev.Amount
			s.TxCount++
		}
	}
	return s
}

// ============================================================================
// 8. CQRS cho Order — tách write model (validate) khỏi read model (denormalized)
// ============================================================================

// --- WRITE SIDE ---
type Item struct {
	Name  string
	Price int
	Qty   int
}
type Order struct {
	ID       string
	Customer string
	Items    []Item
	Status   string
}
type PlaceOrder struct {
	ID       string
	Customer string
	Items    []Item
}

// handlePlaceOrder: command handler — VALIDATE business rule rồi mới ghi.
func handlePlaceOrder(cmd PlaceOrder, writeStore map[string]Order) error {
	if len(cmd.Items) == 0 {
		return errors.New("đơn hàng phải có ít nhất 1 item")
	}
	total := 0
	for _, it := range cmd.Items {
		total += it.Price * it.Qty
	}
	if total <= 0 {
		return errors.New("tổng đơn phải > 0")
	}
	writeStore[cmd.ID] = Order{cmd.ID, cmd.Customer, cmd.Items, "placed"}
	return nil
}

// --- READ SIDE ---
type OrderSummary struct {
	OrderID      string
	CustomerName string
	TotalAmount  int
	ItemCount    int
	Status       string
}

// projectSummary: write model -> read model denormalized (gom sẵn tổng/số lượng).
func projectSummary(o Order) OrderSummary {
	total, count := 0, 0
	for _, it := range o.Items {
		total += it.Price * it.Qty
		count += it.Qty
	}
	return OrderSummary{o.ID, o.Customer, total, count, o.Status}
}

// ============================================================================
// DEMO
// ============================================================================

func main() {
	fmt.Println("=== Lesson 67 — CQRS & Event Sourcing ===")

	store := NewEventStore()
	const acc = "acc-1"

	// --- Mở tài khoản + giao dịch (qua command handler có validate) ---
	store.Append(acc, []Event{AccountOpened{Owner: "Alice"}}, 0)
	must(deposit(store, acc, 50))
	must(deposit(store, acc, 70))
	must(withdraw(store, acc, 20))

	// --- (BT1) Replay để dựng balance ---
	state := replay(store.Load(acc))
	fmt.Println("\n[1] Replay event stream:")
	fmt.Printf("    %s — balance = %d (version %d)\n", state.Owner, state.Balance, state.Version)
	fmt.Printf("    Kỳ vọng balance = 100 -> %v\n", state.Balance == 100)

	// --- Thử rút quá số dư: command bị TỪ CHỐI, KHÔNG sinh event ---
	if err := withdraw(store, acc, 1000); err != nil {
		fmt.Printf("    Rút 1000 bị từ chối: %v (không event nào được ghi)\n", err)
	}

	// --- (BT3) Projection: lịch sử giao dịch + thống kê (cùng 1 stream) ---
	fmt.Println("\n[3] Projection — read model lịch sử giao dịch:")
	for _, r := range projectHistory(store.Load(acc)) {
		fmt.Printf("    #%d %-8s %4d -> balance %d\n", r.Seq, r.Type, r.Amount, r.Balance)
	}
	st := projectStats(store.Load(acc))
	fmt.Printf("    Stats (projection khác): in=%d out=%d count=%d\n", st.TotalIn, st.TotalOut, st.TxCount)

	// --- (BT2) Snapshot mỗi 100 event trên stream dài ---
	fmt.Println("\n[2] Snapshot mỗi 100 event:")
	big := NewEventStore()
	snaps := NewSnapshotStore()
	const big1 = "big-1"
	big.Append(big1, []Event{AccountOpened{Owner: "Bob"}}, 0)
	maybeSnapshot(big, snaps, big1, 100)
	for i := 0; i < 249; i++ { // tổng cộng 250 event (1 open + 249 deposit)
		big.Append(big1, []Event{Deposited{Amount: 1, Currency: "VND"}}, big.CurrentVersion(big1))
		maybeSnapshot(big, snaps, big1, 100)
	}
	total := big.CurrentVersion(big1)
	accBig, replayed := loadWithSnapshot(big, snaps, big1)
	snap, _ := snaps.Latest(big1)
	fmt.Printf("    Tổng %d event, snapshot gần nhất tại version %d\n", total, snap.Version)
	fmt.Printf("    Đọc bằng snapshot: chỉ replay %d event (thay vì %d), balance = %d\n",
		replayed, total, accBig.Balance)

	// --- (BT5) Event versioning: store có cả v1 lẫn v2, upcast lúc load ---
	fmt.Println("\n[5] Event versioning — upcaster v1 -> v2:")
	ver := NewEventStore()
	const verAcc = "ver-1"
	ver.Append(verAcc, []Event{AccountOpened{Owner: "Carol"}}, 0)
	// Ghi 1 event SCHEMA CŨ (v1) — như đã nằm sẵn trong store từ trước.
	ver.streams[verAcc] = append(ver.streams[verAcc],
		storedEvent{version: 2, event: DepositedV1{Amount: 50}})
	// Ghi 1 event schema mới (v2).
	ver.Append(verAcc, []Event{Deposited{Amount: 70, Currency: "USD"}}, 2)
	loaded := ver.Load(verAcc) // tự upcast
	for _, e := range loaded {
		if d, ok := e.(Deposited); ok {
			fmt.Printf("    Deposited{Amount:%d, Currency:%q} (đã upcast nếu cần)\n", d.Amount, d.Currency)
		}
	}
	fmt.Printf("    Replay (cùng 1 apply cho cả v1+v2): balance = %d\n", replay(loaded).Balance)

	// --- (BT4) CQRS cho Order: write validate vs read denormalized ---
	fmt.Println("\n[4] CQRS cho Order:")
	writeStore := make(map[string]Order)
	if err := handlePlaceOrder(PlaceOrder{ID: "ord-1", Customer: "Alice",
		Items: []Item{{"Sách", 120, 2}, {"Bút", 15, 3}}}, writeStore); err != nil {
		fmt.Println("    Lỗi:", err)
	}
	// Command không hợp lệ bị từ chối ở write side.
	if err := handlePlaceOrder(PlaceOrder{ID: "ord-2", Customer: "Bob", Items: nil}, writeStore); err != nil {
		fmt.Printf("    Đơn rỗng bị từ chối: %v\n", err)
	}
	sum := projectSummary(writeStore["ord-1"])
	fmt.Printf("    Read model: %s | khách=%s | tổng=%d | %d món | %s\n",
		sum.OrderID, sum.CustomerName, sum.TotalAmount, sum.ItemCount, sum.Status)

	fmt.Println("\n=== Hết ===")
}

// must: panic nếu command thất bại (chỉ dùng cho demo).
func must(err error) {
	if err != nil {
		panic(err)
	}
}
