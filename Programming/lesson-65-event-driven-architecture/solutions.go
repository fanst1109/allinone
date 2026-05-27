// Lesson 65 — Event-Driven Architecture
//
// File này minh họa 4 thứ, tất cả in-memory (không cần DB/Kafka thật):
//  1. Event bus in-memory (pub/sub, broadcast tới nhiều handler).
//  2. Outbox pattern: "transaction" gói ghi order + ghi outbox atomic,
//     cộng một poller publish các dòng outbox chưa publish.
//  3. Idempotent consumer: dedup theo eventID để xử lý at-least-once an toàn.
//  4. Choreography demo: order -> payment -> inventory, các service tự
//     react với event mà không có nhạc trưởng.
//
// Chạy:  go run solutions.go
//
// Lưu ý: đây là MÔ PHỎNG để học. DB thật, broker thật phức tạp hơn nhiều;
// ở đây ta dùng map + mutex + goroutine để thấy rõ cơ chế.
package main

import (
	"encoding/json"
	"fmt"
	"sync"
	"time"
)

// ============================================================================
// 1. EVENT BUS IN-MEMORY
// ============================================================================

// Event là một "sự thật đã xảy ra". Type ở thì quá khứ (OrderCreated...).
type Event struct {
	ID      string // idempotency key — ổn định, dùng để dedup
	Type    string // vd "OrderCreated", "PaymentCharged"
	Payload []byte // JSON state-transfer của event
}

// Handler là hàm xử lý một event. Trả error để bus biết có cần retry không.
type Handler func(Event) error

// EventBus: pub/sub in-memory, broadcast tới mọi handler đăng ký theo type.
type EventBus struct {
	mu       sync.Mutex
	handlers map[string][]Handler // eventType -> danh sách handler
}

func NewEventBus() *EventBus {
	return &EventBus{handlers: make(map[string][]Handler)}
}

// Subscribe đăng ký handler cho một loại event (loose coupling: producer
// không biết ai subscribe).
func (b *EventBus) Subscribe(eventType string, h Handler) {
	b.mu.Lock()
	defer b.mu.Unlock()
	b.handlers[eventType] = append(b.handlers[eventType], h)
}

// Publish broadcast event tới mọi handler. Nếu handler lỗi -> retry tối đa 3
// lần (mô phỏng at-least-once: cùng một event có thể chạy handler nhiều lần).
func (b *EventBus) Publish(ev Event) {
	b.mu.Lock()
	hs := append([]Handler(nil), b.handlers[ev.Type]...)
	b.mu.Unlock()

	for _, h := range hs {
		const maxRetry = 3
		for attempt := 1; attempt <= maxRetry; attempt++ {
			if err := h(ev); err != nil {
				fmt.Printf("    [bus] handler lỗi (%s, lần %d): %v\n", ev.Type, attempt, err)
				if attempt == maxRetry {
					fmt.Printf("    [bus] -> đẩy event %s vào DEAD LETTER QUEUE\n", ev.ID)
				}
				continue
			}
			break // thành công
		}
	}
}

// ============================================================================
// 2. OUTBOX PATTERN
// ============================================================================

// Order là dữ liệu nghiệp vụ.
type Order struct {
	ID     string  `json:"orderId"`
	UserID int     `json:"userId"`
	Total  float64 `json:"total"`
}

// OutboxRow: một event chờ publish, nằm CÙNG "database" với orders.
type OutboxRow struct {
	ID        string
	EventType string
	Payload   []byte
	Published bool
}

// FakeDB mô phỏng một database có transaction. orders và outbox nằm CÙNG DB,
// nên ta có thể commit cả hai atomic.
type FakeDB struct {
	mu     sync.Mutex
	orders map[string]Order
	outbox []*OutboxRow
}

func NewFakeDB() *FakeDB {
	return &FakeDB{orders: make(map[string]Order)}
}

// Tx là một transaction: gom các thao tác lại, chỉ áp dụng khi Commit.
// Nếu không Commit (vd crash) thì mọi thao tác bị bỏ — atomic.
type Tx struct {
	db     *FakeDB
	orders []Order
	outbox []*OutboxRow
	done   bool
}

func (db *FakeDB) Begin() *Tx { return &Tx{db: db} }

func (t *Tx) SaveOrder(o Order)        { t.orders = append(t.orders, o) }
func (t *Tx) AddOutbox(row *OutboxRow) { t.outbox = append(t.outbox, row) }

// Commit áp dụng TẤT CẢ thao tác cùng lúc dưới một lock -> atomic.
func (t *Tx) Commit() {
	if t.done {
		return
	}
	t.db.mu.Lock()
	defer t.db.mu.Unlock()
	for _, o := range t.orders {
		t.db.orders[o.ID] = o
	}
	t.db.outbox = append(t.db.outbox, t.outbox...)
	t.done = true
}

// CreateOrder: ghi order + ghi outbox trong CÙNG transaction -> atomic.
// Đây là lời giải BT2: không còn cảnh "order có nhưng event mất".
func (db *FakeDB) CreateOrder(o Order) {
	tx := db.Begin()

	tx.SaveOrder(o) // (1) ghi order

	payload, _ := json.Marshal(o)
	tx.AddOutbox(&OutboxRow{ // (2) ghi event vào outbox — CÙNG tx
		ID:        "evt-" + o.ID,
		EventType: "OrderCreated",
		Payload:   payload,
	})

	tx.Commit() // (1)+(2) cùng commit hoặc cùng bỏ
	fmt.Printf("  [db] đã COMMIT order %s + outbox OrderCreated (atomic)\n", o.ID)
}

// Poller: tiến trình riêng đọc outbox chưa publish -> publish lên bus ->
// đánh dấu published=true. Nếu crash sau publish trước update -> publish lại
// (at-least-once) -> consumer phải idempotent.
func (db *FakeDB) PollOnce(bus *EventBus) int {
	db.mu.Lock()
	var pending []*OutboxRow
	for _, row := range db.outbox {
		if !row.Published {
			pending = append(pending, row)
		}
	}
	db.mu.Unlock()

	for _, row := range pending {
		fmt.Printf("  [poller] publish %s (event %s)\n", row.EventType, row.ID)
		bus.Publish(Event{ID: row.ID, Type: row.EventType, Payload: row.Payload})
		db.mu.Lock()
		row.Published = true // đánh dấu sau khi publish
		db.mu.Unlock()
	}
	return len(pending)
}

// ============================================================================
// 3. IDEMPOTENT CONSUMER (dedup)
// ============================================================================

// IdempotentStore lưu các eventID đã xử lý để dedup (mô phỏng bảng
// processed_events). Thread-safe.
type IdempotentStore struct {
	mu        sync.Mutex
	processed map[string]bool
}

func NewIdempotentStore() *IdempotentStore {
	return &IdempotentStore{processed: make(map[string]bool)}
}

// Do chạy fn ĐÚNG MỘT LẦN cho mỗi eventID, kể cả khi được gọi nhiều lần
// (at-least-once). Trả về true nếu thực sự chạy, false nếu đã xử lý trước đó.
func (s *IdempotentStore) Do(eventID string, fn func()) bool {
	s.mu.Lock()
	defer s.mu.Unlock()
	if s.processed[eventID] {
		return false // đã xử lý -> bỏ qua (dedup)
	}
	fn()                        // nghiệp vụ
	s.processed[eventID] = true // ghi dấu — cùng "transaction" (cùng lock)
	return true
}

// ============================================================================
// 4. CHOREOGRAPHY DEMO: order -> payment -> inventory
//    Mỗi service tự subscribe event và phát event mới. Không có orchestrator.
// ============================================================================

// PaymentService nghe OrderCreated -> charge -> phát PaymentCharged.
type PaymentService struct {
	bus     *EventBus
	dedup   *IdempotentStore
	charged map[string]bool
}

func NewPaymentService(bus *EventBus) *PaymentService {
	p := &PaymentService{bus: bus, dedup: NewIdempotentStore(), charged: map[string]bool{}}
	bus.Subscribe("OrderCreated", p.onOrderCreated)
	return p
}

func (p *PaymentService) onOrderCreated(ev Event) error {
	ran := p.dedup.Do(ev.ID, func() {
		var o Order
		_ = json.Unmarshal(ev.Payload, &o)
		p.charged[o.ID] = true
		fmt.Printf("  [payment] charge order %s số tiền %.2f -> phát PaymentCharged\n", o.ID, o.Total)
		// phát event mới: choreography tự chảy tới inventory
		p.bus.Publish(Event{ID: "pay-" + o.ID, Type: "PaymentCharged", Payload: ev.Payload})
	})
	if !ran {
		fmt.Printf("  [payment] event %s đã xử lý trước đó -> BỎ QUA (idempotent)\n", ev.ID)
	}
	return nil
}

// InventoryService nghe PaymentCharged -> reserve stock.
type InventoryService struct {
	dedup    *IdempotentStore
	reserved map[string]bool
}

func NewInventoryService(bus *EventBus) *InventoryService {
	i := &InventoryService{dedup: NewIdempotentStore(), reserved: map[string]bool{}}
	bus.Subscribe("PaymentCharged", i.onPaymentCharged)
	return i
}

func (i *InventoryService) onPaymentCharged(ev Event) error {
	ran := i.dedup.Do(ev.ID, func() {
		var o Order
		_ = json.Unmarshal(ev.Payload, &o)
		i.reserved[o.ID] = true
		fmt.Printf("  [inventory] reserve stock cho order %s -> StockReserved\n", o.ID)
	})
	if !ran {
		fmt.Printf("  [inventory] event %s đã xử lý -> BỎ QUA (idempotent)\n", ev.ID)
	}
	return nil
}

// ============================================================================
// MAIN — chạy lần lượt các demo
// ============================================================================

func main() {
	fmt.Println("=== Lesson 65 — Event-Driven Architecture (demo) ===")

	bus := NewEventBus()
	db := NewFakeDB()

	// Đăng ký choreography: payment + inventory tự react.
	NewPaymentService(bus)
	NewInventoryService(bus)

	// --- Demo 1: Outbox + Choreography ---
	fmt.Println("\n--- Demo 1: Outbox pattern + Choreography ---")
	fmt.Println("Tạo 2 order (ghi DB + outbox atomic):")
	db.CreateOrder(Order{ID: "1001", UserID: 42, Total: 250})
	db.CreateOrder(Order{ID: "1002", UserID: 7, Total: 99.5})

	fmt.Println("\nPoller chạy -> publish outbox -> choreography tự chảy:")
	n := db.PollOnce(bus)
	fmt.Printf("=> Poller đã publish %d event.\n", n)

	// --- Demo 2: At-least-once + idempotent consumer ---
	fmt.Println("\n--- Demo 2: Poller chạy LẠI (mô phỏng crash trước khi update published) ---")
	fmt.Println("Giả lập: poller publish lại cùng các event (at-least-once):")
	// Reset cờ published để mô phỏng poller lần trước crash sau publish.
	db.mu.Lock()
	for _, row := range db.outbox {
		row.Published = false
	}
	db.mu.Unlock()
	db.PollOnce(bus)
	fmt.Println("=> Nhờ idempotent consumer, payment/inventory KHÔNG xử lý lại.")

	// --- Demo 3: kiểm chứng trạng thái cuối ---
	fmt.Println("\n--- Demo 3: Trạng thái cuối ---")
	db.mu.Lock()
	fmt.Printf("Orders trong DB: %d\n", len(db.orders))
	pub, unpub := 0, 0
	for _, r := range db.outbox {
		if r.Published {
			pub++
		} else {
			unpub++
		}
	}
	db.mu.Unlock()
	fmt.Printf("Outbox: %d đã publish, %d chưa publish\n", pub, unpub)

	// --- Demo 4: Dead letter (handler luôn lỗi) ---
	fmt.Println("\n--- Demo 4: Poison event -> retry -> dead letter ---")
	bus2 := NewEventBus()
	bus2.Subscribe("BadEvent", func(ev Event) error {
		return fmt.Errorf("data hỏng, không xử lý được")
	})
	bus2.Publish(Event{ID: "bad-1", Type: "BadEvent"})

	fmt.Println("\n=== Hết demo ===")
	_ = time.Now // giữ import time nếu cần mở rộng
}
