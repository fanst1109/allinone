package bus

import (
	"sync"
	"testing"
)

// TestPubSubFanout: nhiều subscriber trên cùng topic đều nhận event.
func TestPubSubFanout(t *testing.T) {
	b := New()
	var mu sync.Mutex
	got := 0
	for i := 0; i < 3; i++ {
		b.Subscribe("t", func(Event) error { mu.Lock(); got++; mu.Unlock(); return nil })
	}
	b.Publish(Event{ID: "e1", Topic: "t"})
	b.Wait()
	if got != 3 {
		t.Errorf("got %d lần gọi, mong 3 (fan-out)", got)
	}
}

// TestDedupIdempotency: cùng event ID giao 2 lần => consumer chỉ xử lý 1 lần (L62, BT3).
func TestDedupIdempotency(t *testing.T) {
	b := New()
	d := NewDedup()
	var mu sync.Mutex
	processed := 0

	b.Subscribe("order.created", func(e Event) error {
		if d.Seen(e.ID) {
			return nil // event lặp -> bỏ qua
		}
		mu.Lock()
		processed++
		mu.Unlock()
		return nil
	})

	dup := Event{ID: "evt-dup", Topic: "order.created"}
	b.Publish(dup)
	b.Publish(dup) // giao lại CÙNG event (at-least-once)
	b.Publish(dup)
	b.Wait()

	if processed != 1 {
		t.Errorf("processed = %d, mong 1 (idempotent dedup)", processed)
	}
}

// TestLog ghi lại mọi event đã publish.
func TestLog(t *testing.T) {
	b := New()
	b.Publish(Event{ID: "a", Topic: "x"})
	b.Publish(Event{ID: "b", Topic: "y"})
	b.Wait()
	if n := len(b.Log()); n != 2 {
		t.Errorf("log len = %d, mong 2", n)
	}
}
