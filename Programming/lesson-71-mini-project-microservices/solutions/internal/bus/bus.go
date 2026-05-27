// Package bus — message bus IN-MEMORY mô phỏng một broker (NATS/Kafka thu nhỏ).
//
// Mục tiêu: cho 3 service (order, payment, inventory) và saga orchestrator
// giao tiếp qua EVENT thay vì gọi hàm trực tiếp. Kiến trúc giống production:
//   - Publisher không biết ai là consumer (loose coupling).
//   - Mỗi event có ID duy nhất => consumer tự dedup (idempotency, xem L62).
//   - At-least-once delivery: bus CÓ THỂ giao một event nhiều lần (ở đây ta
//     mô phỏng bằng cách cho publish lặp / replay), nên consumer BẮT BUỘC
//     phải idempotent.
//
// Trong production đây sẽ là client của NATS JetStream / Kafka. Ở đây ta dùng
// channel + goroutine để chạy được mà không cần infra.
package bus

import (
	"sync"
	"time"
)

// Event là đơn vị thông điệp chạy trên bus.
type Event struct {
	ID      string         // ID duy nhất của event — dùng để dedup phía consumer
	Topic   string         // chủ đề (ví dụ "order.created", "inventory.reserved")
	TraceID string         // correlation ID xuyên suốt một saga (distributed tracing, BT5)
	Payload map[string]any // dữ liệu kèm theo (số tiền, sku, qty, ...)
	Time    time.Time      // thời điểm phát
}

// Handler xử lý một event. Trả về error để báo thất bại (bus sẽ ghi log).
type Handler func(Event) error

// Bus là một message bus in-memory hỗ trợ pub/sub nhiều subscriber mỗi topic.
//
// Đặc tính:
//   - Bất đồng bộ: mỗi event được giao cho subscriber qua một goroutine + queue,
//     giống broker thật (publisher không bị block bởi consumer chậm).
//   - Có log mọi event để test/quan sát.
type Bus struct {
	mu          sync.RWMutex
	subscribers map[string][]Handler // topic -> danh sách handler
	log         []Event              // lịch sử mọi event đã publish (để inspect khi test)
	wg          sync.WaitGroup       // chờ mọi delivery goroutine xong
}

// New tạo một bus rỗng.
func New() *Bus {
	return &Bus{
		subscribers: make(map[string][]Handler),
	}
}

// Subscribe đăng ký handler cho một topic. Nhiều handler trên cùng topic
// đều được gọi (fan-out).
func (b *Bus) Subscribe(topic string, h Handler) {
	b.mu.Lock()
	defer b.mu.Unlock()
	b.subscribers[topic] = append(b.subscribers[topic], h)
}

// Publish phát một event tới mọi subscriber của topic.
//
// Delivery là bất đồng bộ: ta copy danh sách handler dưới lock rồi gọi trong
// goroutine để publisher không bị block. Lỗi handler chỉ được nuốt (log lại),
// giống broker thật — việc retry/compensate là trách nhiệm của tầng trên (saga).
func (b *Bus) Publish(e Event) {
	if e.Time.IsZero() {
		e.Time = time.Now()
	}

	b.mu.Lock()
	b.log = append(b.log, e)
	handlers := make([]Handler, len(b.subscribers[e.Topic]))
	copy(handlers, b.subscribers[e.Topic])
	b.mu.Unlock()

	for _, h := range handlers {
		h := h
		b.wg.Add(1)
		go func() {
			defer b.wg.Done()
			_ = h(e) // lỗi do tầng trên xử lý; bus chỉ là đường ống
		}()
	}
}

// Wait chờ mọi delivery goroutine đang chạy kết thúc. Hữu ích trong test để
// đảm bảo các handler bất đồng bộ đã chạy xong trước khi assert.
func (b *Bus) Wait() {
	b.wg.Wait()
}

// Log trả về bản sao lịch sử event đã publish (đọc-chỉ, an toàn cho test).
func (b *Bus) Log() []Event {
	b.mu.RLock()
	defer b.mu.RUnlock()
	out := make([]Event, len(b.log))
	copy(out, b.log)
	return out
}

// Dedup là helper idempotency dùng chung cho mọi consumer.
//
// Ý tưởng (L62 — idempotency): với at-least-once delivery, cùng một event ID
// có thể tới nhiều lần. Consumer gọi Seen(id): nếu đã thấy => bỏ qua, đảm bảo
// side-effect chỉ xảy ra đúng MỘT lần.
type Dedup struct {
	mu   sync.Mutex
	seen map[string]bool
}

// NewDedup tạo bộ lọc dedup rỗng.
func NewDedup() *Dedup {
	return &Dedup{seen: make(map[string]bool)}
}

// Seen trả về true nếu id ĐÃ được xử lý trước đó. Nếu chưa, nó đánh dấu là đã
// thấy và trả về false. Như vậy lần đầu => false (hãy xử lý), lần sau => true.
func (d *Dedup) Seen(id string) bool {
	d.mu.Lock()
	defer d.mu.Unlock()
	if d.seen[id] {
		return true
	}
	d.seen[id] = true
	return false
}
