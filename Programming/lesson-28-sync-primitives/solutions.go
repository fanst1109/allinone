// Lesson 28 — Sync Primitives: solutions.go
//
// Chạy: `go run solutions.go`
// Detect race: `go run -race solutions.go`
//
// File này gom lời giải 6 bài tập + demo các sync primitive.
package main

import (
	"bytes"
	"fmt"
	"runtime"
	"sync"
	"sync/atomic"
	"time"
)

// ============================================================
// BT1 — Concurrent counter: Unsafe, Mutex, Atomic
// ============================================================

// UnsafeCounter: KHÔNG thread-safe — dùng để minh hoạ race.
type UnsafeCounter struct{ n int }

func (c *UnsafeCounter) Inc()       { c.n++ }
func (c *UnsafeCounter) Value() int { return c.n }

// MutexCounter: dùng sync.Mutex bảo vệ.
type MutexCounter struct {
	mu sync.Mutex
	n  int
}

func (c *MutexCounter) Inc() {
	c.mu.Lock()
	defer c.mu.Unlock()
	c.n++
}

func (c *MutexCounter) Value() int {
	c.mu.Lock()
	defer c.mu.Unlock()
	return c.n
}

// AtomicCounter: dùng sync/atomic (API mới Go 1.19+).
type AtomicCounter struct{ n atomic.Int64 }

func (c *AtomicCounter) Inc()         { c.n.Add(1) }
func (c *AtomicCounter) Value() int64 { return c.n.Load() }

// hammer chạy fn n lần trên k goroutine song song.
func hammer(k, perGoroutine int, fn func()) time.Duration {
	var wg sync.WaitGroup
	start := time.Now()
	for i := 0; i < k; i++ {
		wg.Add(1)
		go func() {
			defer wg.Done()
			for j := 0; j < perGoroutine; j++ {
				fn()
			}
		}()
	}
	wg.Wait()
	return time.Since(start)
}

func bt1CompareCounters() {
	fmt.Println("\n=== BT1 — Counter: Unsafe vs Mutex vs Atomic ===")
	const k = 10
	const per = 100_000
	expected := k * per

	uc := &UnsafeCounter{}
	tu := hammer(k, per, uc.Inc)
	fmt.Printf("Unsafe : n=%-7d expected=%d  time=%v  (kết quả SAI do race)\n",
		uc.Value(), expected, tu)

	mc := &MutexCounter{}
	tm := hammer(k, per, mc.Inc)
	fmt.Printf("Mutex  : n=%-7d expected=%d  time=%v\n", mc.Value(), expected, tm)

	ac := &AtomicCounter{}
	ta := hammer(k, per, ac.Inc)
	fmt.Printf("Atomic : n=%-7d expected=%d  time=%v\n", ac.Value(), expected, ta)
}

// ============================================================
// BT2 — Concurrent cache với RWMutex + double-check
// ============================================================

type Cache struct {
	mu   sync.RWMutex
	data map[string]string
}

func NewCache() *Cache {
	return &Cache{data: make(map[string]string)}
}

// Get trả về value cho key. Nếu chưa có → gọi fetch để load.
// Pattern double-check: RLock fast path, Lock + recheck slow path.
func (c *Cache) Get(key string, fetch func(string) string) string {
	// Fast path: thử RLock trước.
	c.mu.RLock()
	if v, ok := c.data[key]; ok {
		c.mu.RUnlock()
		return v
	}
	c.mu.RUnlock()

	// Slow path: cần ghi → Lock thật.
	c.mu.Lock()
	defer c.mu.Unlock()
	// Re-check: giữa RUnlock và Lock, goroutine khác có thể đã fetch.
	if v, ok := c.data[key]; ok {
		return v
	}
	v := fetch(key)
	c.data[key] = v
	return v
}

func bt2CacheDemo() {
	fmt.Println("\n=== BT2 — Concurrent cache với RWMutex ===")
	c := NewCache()
	fetchCalls := atomic.Int64{}
	fetch := func(k string) string {
		fetchCalls.Add(1)
		time.Sleep(5 * time.Millisecond) // giả lập IO
		return "value-of-" + k
	}

	var wg sync.WaitGroup
	keys := []string{"alice", "bob", "alice", "charlie", "bob", "alice"}
	for _, k := range keys {
		wg.Add(1)
		go func(key string) {
			defer wg.Done()
			c.Get(key, fetch)
		}(k)
	}
	wg.Wait()

	fmt.Printf("Cache có %d keys, fetch gọi %d lần (6 request, chỉ 3 unique key)\n",
		len(c.data), fetchCalls.Load())
	// Lưu ý: nếu 2 goroutine cùng key chạy đồng thời, fetch có thể gọi 2 lần.
	// Để strict 1 lần per key dùng singleflight.
}

// ============================================================
// BT3 — Singleton DB dùng sync.Once
// ============================================================

// Giả lập DB connection (không thật sự mở DB).
type FakeDB struct {
	openedAt time.Time
	id       int
}

var (
	dbOnce  sync.Once
	dbInst  *FakeDB
	openCnt atomic.Int64
)

// GetDB trả về *FakeDB, dù gọi từ nhiều goroutine, FakeDB chỉ tạo 1 lần.
func GetDB() *FakeDB {
	dbOnce.Do(func() {
		openCnt.Add(1)
		time.Sleep(10 * time.Millisecond) // giả lập kết nối chậm
		dbInst = &FakeDB{
			openedAt: time.Now(),
			id:       42,
		}
	})
	return dbInst
}

func bt3SingletonDemo() {
	fmt.Println("\n=== BT3 — Singleton DB với sync.Once ===")
	var wg sync.WaitGroup
	for i := 0; i < 50; i++ {
		wg.Add(1)
		go func() {
			defer wg.Done()
			db := GetDB()
			_ = db
		}()
	}
	wg.Wait()
	fmt.Printf("50 goroutine cùng gọi GetDB(), số lần thật sự khởi tạo: %d\n", openCnt.Load())
}

// ============================================================
// BT4 — Fix race condition: Stats counter
// ============================================================

// Phiên bản dùng Mutex.
type StatsMutex struct {
	mu       sync.Mutex
	requests int
	errors   int
}

func (s *StatsMutex) IncReq() { s.mu.Lock(); s.requests++; s.mu.Unlock() }
func (s *StatsMutex) IncErr() { s.mu.Lock(); s.errors++; s.mu.Unlock() }

// Phiên bản dùng Atomic.
type StatsAtomic struct {
	requests atomic.Int64
	errors   atomic.Int64
}

func bt4FixRace() {
	fmt.Println("\n=== BT4 — Fix race condition: Stats ===")

	// Version mutex
	var sm StatsMutex
	var wg sync.WaitGroup
	for i := 0; i < 1000; i++ {
		wg.Add(1)
		go func(i int) {
			defer wg.Done()
			sm.IncReq()
			if i%10 == 0 {
				sm.IncErr()
			}
		}(i)
	}
	wg.Wait()
	fmt.Printf("Mutex : req=%d err=%d (mong 1000/100)\n", sm.requests, sm.errors)

	// Version atomic
	var sa StatsAtomic
	for i := 0; i < 1000; i++ {
		wg.Add(1)
		go func(i int) {
			defer wg.Done()
			sa.requests.Add(1)
			if i%10 == 0 {
				sa.errors.Add(1)
			}
		}(i)
	}
	wg.Wait()
	fmt.Printf("Atomic: req=%d err=%d (mong 1000/100)\n",
		sa.requests.Load(), sa.errors.Load())
}

// ============================================================
// BT5 — Worker pool dùng WaitGroup + channel
// ============================================================

func fetchURL(u string) string {
	// Giả lập IO ngẫu nhiên.
	time.Sleep(1 * time.Millisecond)
	return "OK-" + u
}

func workerPool(urls []string, nWorkers int) []string {
	jobs := make(chan string, len(urls))
	results := make(chan string, len(urls))

	var wg sync.WaitGroup
	for w := 0; w < nWorkers; w++ {
		wg.Add(1)
		go func(id int) {
			defer wg.Done()
			for u := range jobs {
				results <- fmt.Sprintf("[w%d] %s", id, fetchURL(u))
			}
		}(w)
	}

	for _, u := range urls {
		jobs <- u
	}
	close(jobs)

	// Goroutine riêng đóng results khi mọi worker done.
	go func() {
		wg.Wait()
		close(results)
	}()

	out := make([]string, 0, len(urls))
	for r := range results {
		out = append(out, r)
	}
	return out
}

func bt5WorkerPoolDemo() {
	fmt.Println("\n=== BT5 — Worker pool với WaitGroup ===")
	urls := make([]string, 20)
	for i := range urls {
		urls[i] = fmt.Sprintf("url-%02d", i)
	}
	res := workerPool(urls, 5)
	fmt.Printf("Fetched %d urls, 5 workers. First 3: %v ...\n", len(res), res[:3])
}

// ============================================================
// BT6 — Buffer pool: sync.Pool vs new mỗi lần
// ============================================================

var bufPool = sync.Pool{
	New: func() any { return new(bytes.Buffer) },
}

func newEach(n int) (allocs uint64) {
	var ms1, ms2 runtime.MemStats
	runtime.GC()
	runtime.ReadMemStats(&ms1)
	for i := 0; i < n; i++ {
		buf := new(bytes.Buffer)
		buf.WriteString("hello world ")
		buf.WriteString("of buffer pool")
		_ = buf.String()
	}
	runtime.ReadMemStats(&ms2)
	return ms2.Mallocs - ms1.Mallocs
}

func withPool(n int) (allocs uint64) {
	var ms1, ms2 runtime.MemStats
	runtime.GC()
	runtime.ReadMemStats(&ms1)
	for i := 0; i < n; i++ {
		buf := bufPool.Get().(*bytes.Buffer)
		buf.WriteString("hello world ")
		buf.WriteString("of buffer pool")
		_ = buf.String()
		buf.Reset() // QUAN TRỌNG: reset trước khi Put
		bufPool.Put(buf)
	}
	runtime.ReadMemStats(&ms2)
	return ms2.Mallocs - ms1.Mallocs
}

func bt6PoolDemo() {
	fmt.Println("\n=== BT6 — Buffer pool ===")
	const n = 10_000
	a1 := newEach(n)
	a2 := withPool(n)
	fmt.Printf("new()    : %d allocs cho %d iteration\n", a1, n)
	fmt.Printf("sync.Pool: %d allocs cho %d iteration\n", a2, n)
	if a2 > 0 {
		fmt.Printf("Pool giảm allocation %.1fx\n", float64(a1)/float64(a2))
	}
}

// ============================================================
// Demo bổ sung: race-y code (chạy với -race để thấy cảnh báo)
// ============================================================

func raceDemo() {
	fmt.Println("\n=== Race demo (chạy với `go run -race solutions.go` để thấy cảnh báo) ===")
	var n int
	var wg sync.WaitGroup
	for i := 0; i < 100; i++ {
		wg.Add(1)
		go func() {
			defer wg.Done()
			// n++ là race với chính nó từ goroutine khác.
			// CHÚ Ý: dòng dưới CỐ Ý có race để minh hoạ.
			// Bỏ comment khi muốn xem race detector cảnh báo:
			// n++
			_ = n
		}()
	}
	wg.Wait()
	fmt.Printf("(uncomment dòng `n++` trong source để thấy race detector phát hiện)\n")
}

// ============================================================
// Demo sync.Map — concurrent map có sẵn stdlib
// ============================================================

func syncMapDemo() {
	fmt.Println("\n=== sync.Map demo ===")
	var m sync.Map
	m.Store("alice", 1)
	m.Store("bob", 2)
	m.LoadOrStore("alice", 99) // không ghi đè vì đã có
	v, _ := m.Load("alice")
	fmt.Printf("alice = %v (vẫn 1, LoadOrStore không ghi đè)\n", v)

	count := 0
	m.Range(func(k, v any) bool {
		count++
		return true
	})
	fmt.Printf("Số key trong map: %d\n", count)
}

// ============================================================
// main — chạy tất cả demo
// ============================================================

func main() {
	bt1CompareCounters()
	bt2CacheDemo()
	bt3SingletonDemo()
	bt4FixRace()
	bt5WorkerPoolDemo()
	bt6PoolDemo()
	raceDemo()
	syncMapDemo()

	fmt.Println("\nDone. Thử chạy lại với `go run -race solutions.go` để bật race detector.")
}
