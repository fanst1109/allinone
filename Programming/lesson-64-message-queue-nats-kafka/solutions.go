// Lesson 64 — Message Queue (Kafka / NATS / RabbitMQ)
//
// File này implement một MESSAGE BROKER in-memory bằng Go THUẦN để hiểu cơ chế
// bên trong Kafka/NATS, KHÔNG cần broker server:
//
//   1. Topic + Partition      : append-only log, mỗi partition đánh offset tăng dần.
//   2. Partition key routing   : partition = hash(key) mod N  -> cùng key cùng partition (ordering).
//   3. Consumer group + rebalance : chia partition cho consumer trong group (parallelism).
//   4. Offset commit            : commit SAU process = at-least-once; commit TRƯỚC = at-most-once.
//   5. Idempotent consumer      : dedup bằng message ID + dedup store (vì at-least-once).
//   6. Dead Letter Queue (DLQ)  : message fail quá retry limit -> DLQ (tránh poison message block).
//
// Mục đích HỌC: thấy rõ các khái niệm. Production bạn dùng client thật:
//   - Kafka  : github.com/segmentio/kafka-go  hoặc github.com/confluentinc/confluent-kafka-go
//   - NATS   : github.com/nats-io/nats.go      (Core NATS + JetStream)
//   - RabbitMQ: github.com/rabbitmq/amqp091-go
// (xem các comment "// >>> Kafka thật:" rải trong file để đối chiếu).
//
// Chạy:  go run solutions.go
package main

import (
	"fmt"
	"hash/fnv"
	"sort"
	"strings"
)

// ===========================================================================
// 1. MESSAGE & PARTITION (append-only log)
// ===========================================================================

// Message: đơn vị dữ liệu. ID dùng cho dedup (idempotent consumer).
// Key dùng để chọn partition (ordering). Value là payload.
type Message struct {
	ID    string // duy nhất, dùng dedup
	Key   string // partition key -> cùng key cùng partition
	Value string
}

// Partition: một log chỉ-thêm (append-only). offset = index trong slice.
// >>> Kafka thật: mỗi partition là file segment trên đĩa, message bất biến.
type Partition struct {
	log []Message // log[i] có offset = i
}

func (p *Partition) append(m Message) int {
	offset := len(p.log)
	p.log = append(p.log, m)
	return offset // offset được gán cho message vừa thêm
}

// ===========================================================================
// 2. TOPIC — gồm N partition, route theo key
// ===========================================================================

type Topic struct {
	name       string
	partitions []*Partition
}

func NewTopic(name string, numPartitions int) *Topic {
	t := &Topic{name: name}
	for i := 0; i < numPartitions; i++ {
		t.partitions = append(t.partitions, &Partition{})
	}
	return t
}

// partitionFor: công thức Kafka mặc định -> partition = hash(key) mod N.
// Cùng key  -> cùng partition -> message giữ ĐÚNG THỨ TỰ trong partition đó.
// Key rỗng  -> rải tròn (ở đây dùng hash chuỗi rỗng, vẫn ổn định).
func (t *Topic) partitionFor(key string) int {
	h := fnv.New32a()
	_, _ = h.Write([]byte(key))
	return int(h.Sum32()) % len(t.partitions)
}

// Produce: append message vào partition tương ứng, trả (partition, offset).
// >>> Kafka thật: producer.Send(); confluent-kafka-go Produce().
func (t *Topic) Produce(m Message) (int, int) {
	pi := t.partitionFor(m.Key)
	off := t.partitions[pi].append(m)
	return pi, off
}

// ===========================================================================
// 3. CONSUMER GROUP + REBALANCE
// ===========================================================================
//
// Trong CÙNG một group: mỗi partition gán cho ĐÚNG 1 consumer (chia tải = queue).
// NHIỀU group trên cùng topic: mỗi group nhận đầy đủ mọi message (pub/sub).
// Số consumer hữu ích trong 1 group <= số partition (dư consumer -> idle).

type ConsumerGroup struct {
	id     string
	topic  *Topic
	offset map[int]int // partition -> offset KẾ TIẾP sẽ đọc (committed offset)
}

func NewConsumerGroup(id string, t *Topic) *ConsumerGroup {
	off := make(map[int]int)
	for i := range t.partitions {
		off[i] = 0 // bắt đầu từ đầu log (như auto.offset.reset=earliest)
	}
	return &ConsumerGroup{id: id, topic: t, offset: off}
}

// assign: rebalance — chia partition cho `numConsumers` consumer theo round-robin.
// Trả về map[consumerIndex] -> []partition. consumer dư (vượt số partition) bị idle.
// >>> Kafka thật: dùng RangeAssignor/RoundRobin/CooperativeSticky; rebalance khi
//     consumer join/leave. Trong lúc rebalance, consumption tạm dừng.
func (g *ConsumerGroup) assign(numConsumers int) map[int][]int {
	res := make(map[int][]int)
	for ci := 0; ci < numConsumers; ci++ {
		res[ci] = nil // đảm bảo consumer dư xuất hiện với danh sách rỗng (idle)
	}
	for pi := range g.topic.partitions {
		ci := pi % numConsumers // round-robin partition -> consumer
		res[ci] = append(res[ci], pi)
	}
	return res
}

// ===========================================================================
// 4. OFFSET COMMIT — quyết định delivery guarantee
// ===========================================================================
//
// commit SAU process  -> at-least-once (crash giữa chừng -> xử lý lại -> TRÙNG)
// commit TRƯỚC process -> at-most-once  (crash giữa chừng -> bỏ qua    -> MẤT)

// Handler xử lý message, trả error nếu fail.
type Handler func(Message) error

// poll: lấy các message CHƯA đọc của 1 partition (từ committed offset tới hết log).
func (g *ConsumerGroup) poll(partition int) []Message {
	p := g.topic.partitions[partition]
	from := g.offset[partition]
	if from >= len(p.log) {
		return nil
	}
	return p.log[from:]
}

// commit: ghi nhận đã xử lý tới offset `nextOffset` (offset KẾ TIẾP sẽ đọc).
func (g *ConsumerGroup) commit(partition, nextOffset int) {
	g.offset[partition] = nextOffset
}

// Lag: tổng (latest offset - committed offset) trên mọi partition.
// Lag tăng dần = consumer chậm hơn producer (mục 10 README) -> cần monitor.
func (g *ConsumerGroup) Lag() int {
	total := 0
	for pi, p := range g.topic.partitions {
		total += len(p.log) - g.offset[pi]
	}
	return total
}

// consumeAtLeastOnce: xử lý 1 partition kiểu at-least-once (commit SAU process).
// Nếu handler fail ở message thứ k -> dừng, KHÔNG commit message lỗi (sẽ thử lại).
func (g *ConsumerGroup) consumeAtLeastOnce(partition int, h Handler) {
	msgs := g.poll(partition)
	base := g.offset[partition]
	for i, m := range msgs {
		if err := h(m); err != nil {
			// không commit message lỗi này -> lần poll sau đọc lại từ đây
			g.commit(partition, base+i)
			return
		}
		g.commit(partition, base+i+1) // commit SAU khi process OK
	}
}

// ===========================================================================
// 5. IDEMPOTENT CONSUMER — dedup bằng message ID (vì at-least-once)
// ===========================================================================
//
// >>> Production: dedup store phải BỀN (DB/Redis có TTL), KHÔNG chỉ in-memory,
//     vì consumer restart sẽ mất state in-memory -> lại xử lý trùng.

type DedupStore struct {
	seen map[string]bool // ID đã xử lý
}

func NewDedupStore() *DedupStore { return &DedupStore{seen: map[string]bool{}} }

func (d *DedupStore) Seen(id string) bool { return d.seen[id] }
func (d *DedupStore) Mark(id string)      { d.seen[id] = true }

// makeIdempotent: bọc một handler "thật" thành idempotent. Duplicate (cùng ID
// đã xử lý) bị bỏ qua -> side-effect chỉ chạy ĐÚNG 1 lần dù nhận nhiều lần.
func makeIdempotent(store *DedupStore, real Handler) Handler {
	return func(m Message) error {
		if store.Seen(m.ID) {
			fmt.Printf("    [idempotent] msg %s đã xử lý -> BỎ QUA (không trùng)\n", m.ID)
			return nil
		}
		if err := real(m); err != nil {
			return err // chưa Mark -> sẽ thử lại
		}
		store.Mark(m.ID) // lý tưởng: cùng transaction với side-effect
		return nil
	}
}

// ===========================================================================
// 6. DEAD LETTER QUEUE (DLQ) + retry limit
// ===========================================================================
//
// Message fail quá maxRetries -> đẩy sang DLQ, commit offset chính (KHÔNG block).
// Tránh poison message kẹt đầu partition làm block mọi message sau (head-of-line).

type DLQConsumer struct {
	topic      *Topic
	partition  int
	offset     int            // offset kế tiếp ở topic chính
	retries    map[string]int // messageID -> số lần đã fail
	maxRetries int
	dlq        []Message // "topic" DLQ in-memory
}

func NewDLQConsumer(t *Topic, partition, maxRetries int) *DLQConsumer {
	return &DLQConsumer{
		topic: t, partition: partition,
		retries: map[string]int{}, maxRetries: maxRetries,
	}
}

// runOnce: thử xử lý các message còn lại; với mỗi message fail:
//   - chưa vượt limit -> KHÔNG commit, dừng để thử lại (giữ thứ tự).
//   - vượt limit       -> đẩy DLQ, commit (đi tiếp message kế).
//
// Để demo hội tụ, ta lặp tới khi không tiến triển thêm được.
func (c *DLQConsumer) run(h Handler) {
	p := c.topic.partitions[c.partition]
	for c.offset < len(p.log) {
		m := p.log[c.offset]
		err := h(m)
		if err == nil {
			fmt.Printf("    [ok ] offset %d msg %s\n", c.offset, m.ID)
			c.offset++
			continue
		}
		c.retries[m.ID]++
		if c.retries[m.ID] <= c.maxRetries {
			fmt.Printf("    [retry %d/%d] offset %d msg %s fail: %v\n",
				c.retries[m.ID], c.maxRetries, c.offset, m.ID, err)
			// không tăng offset -> thử lại message này (giữ ordering)
			continue
		}
		// vượt limit -> DLQ + commit để KHÔNG block partition
		fmt.Printf("    [DLQ] offset %d msg %s vượt %d lần -> đẩy DLQ, đi tiếp\n",
			c.offset, m.ID, c.maxRetries)
		c.dlq = append(c.dlq, m)
		c.offset++
	}
}

// ===========================================================================
// DEMO
// ===========================================================================

func section(title string) {
	fmt.Println("\n" + strings.Repeat("=", 64))
	fmt.Println(title)
	fmt.Println(strings.Repeat("=", 64))
}

func main() {
	// --- DEMO 1: partition routing + ordering theo key ---------------------
	section("DEMO 1 — Partition routing: cùng key -> cùng partition (ordering)")
	t := NewTopic("orders", 3)
	events := []Message{
		{ID: "e1", Key: "A100", Value: "OrderCreated"},
		{ID: "e2", Key: "A100", Value: "PaymentReceived"},
		{ID: "e3", Key: "A100", Value: "OrderShipped"},
		{ID: "e4", Key: "B200", Value: "OrderCreated"},
		{ID: "e5", Key: "B200", Value: "PaymentReceived"},
	}
	for _, m := range events {
		pi, off := t.Produce(m)
		fmt.Printf("  key=%-5s -> partition %d (offset %d)  %s\n", m.Key, pi, off, m.Value)
	}
	fmt.Println("  => mọi event cùng order (cùng key) vào cùng partition -> đọc đúng thứ tự.")

	// --- DEMO 2: consumer group rebalance ----------------------------------
	section("DEMO 2 — Consumer group rebalance (chia partition cho consumer)")
	g := NewConsumerGroup("billing", t)
	for _, n := range []int{1, 2, 3, 4} {
		assign := g.assign(n)
		var idx []int
		for ci := range assign {
			idx = append(idx, ci)
		}
		sort.Ints(idx)
		fmt.Printf("  group có %d consumer:\n", n)
		for _, ci := range idx {
			parts := assign[ci]
			if len(parts) == 0 {
				fmt.Printf("    consumer C%d -> (idle, không partition)\n", ci+1)
			} else {
				fmt.Printf("    consumer C%d -> partition %v\n", ci+1, parts)
			}
		}
	}
	fmt.Println("  => số consumer hữu ích <= số partition (3). C4 idle khi có 4 consumer.")

	// --- DEMO 3: at-least-once + idempotent consumer (xử lý duplicate) ------
	section("DEMO 3 — At-least-once + idempotent consumer (duplicate vô hại)")
	pay := NewTopic("payments", 1)
	// Cố ý gửi e1 HAI lần (mô phỏng redeliver do at-least-once).
	for _, m := range []Message{
		{ID: "tx-1", Key: "u1", Value: "trừ 100k"},
		{ID: "tx-1", Key: "u1", Value: "trừ 100k"}, // DUPLICATE
		{ID: "tx-2", Key: "u1", Value: "trừ 50k"},
	} {
		pay.Produce(m)
	}
	balance := 1000 // 1000k
	store := NewDedupStore()
	handler := makeIdempotent(store, func(m Message) error {
		amt := 0
		switch m.Value {
		case "trừ 100k":
			amt = 100
		case "trừ 50k":
			amt = 50
		}
		balance -= amt
		fmt.Printf("    [process] %s: trừ %dk -> balance=%dk\n", m.ID, amt, balance)
		return nil
	})
	gp := NewConsumerGroup("wallet", pay)
	gp.consumeAtLeastOnce(0, handler)
	fmt.Printf("  => balance cuối = %dk (đúng: 1000-100-50=850, tx-1 trùng KHÔNG trừ 2 lần)\n", balance)

	// --- DEMO 4: DLQ với retry limit (poison message) ----------------------
	section("DEMO 4 — DLQ: message luôn-fail -> retry rồi DLQ, KHÔNG block partition")
	pt := NewTopic("jobs", 1)
	for _, m := range []Message{
		{ID: "j1", Key: "k", Value: "ok"},
		{ID: "j2", Key: "k", Value: "POISON"}, // luôn fail
		{ID: "j3", Key: "k", Value: "ok"},     // bị block nếu không có DLQ
	} {
		pt.Produce(m)
	}
	dc := NewDLQConsumer(pt, 0, 3)
	dc.run(func(m Message) error {
		if m.Value == "POISON" {
			return fmt.Errorf("không xử lý được")
		}
		return nil
	})
	fmt.Printf("  => DLQ chứa %d message: ", len(dc.dlq))
	for _, m := range dc.dlq {
		fmt.Printf("%s ", m.ID)
	}
	fmt.Println("\n  => j3 (sau poison) VẪN được xử lý nhờ poison đã chuyển sang DLQ.")

	// --- DEMO 5: consumer lag ----------------------------------------------
	section("DEMO 5 — Consumer lag (producer bỏ xa consumer)")
	lt := NewTopic("events", 1)
	for i := 0; i < 10; i++ {
		lt.Produce(Message{ID: fmt.Sprintf("m%d", i), Key: "k", Value: "x"})
	}
	lg := NewConsumerGroup("slow", lt)
	fmt.Printf("  producer ghi 10 msg, consumer chưa đọc -> lag = %d\n", lg.Lag())
	lg.commit(0, 4) // giả sử đã xử lý 4 message
	fmt.Printf("  consumer xử lý 4 msg -> lag = %d (còn tụt lại %d)\n", lg.Lag(), lg.Lag())
	fmt.Println("  => lag tăng dần = nguy hiểm: phải scale consumer/partition + monitor.")
}
