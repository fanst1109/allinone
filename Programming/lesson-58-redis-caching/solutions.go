// Lesson 58 — Redis & Caching Strategies
//
// File này KHÔNG cần Redis thật và KHÔNG cần thư viện ngoài: nó mô phỏng một
// cache key-value in-memory có TTL (giống Redis thu nhỏ) bằng stdlib, rồi cài
// các pattern caching cốt lõi của bài học để chạy/biên dịch được ngay:
//
//   - memCache       : cache in-memory có TTL + eviction đơn giản, concurrent-safe.
//     Mỗi method có comment tham chiếu lệnh Redis / go-redis thật.
//   - cacheAside     : pattern cache-aside (lazy loading) — BT1.
//   - writeThrough   : pattern write-through (ghi DB + cache) — BT2.
//   - singleflight   : chống cache stampede (1 fetch cho N caller cùng key) — BT3.
//   - sortedSet      : leaderboard top-K bằng sorted set — BT4.
//   - tryLock/unlock : distributed lock kiểu SET NX EX (mô phỏng 1 node) — BT5.
//
// Chạy demo:  go run solutions.go
// Biên dịch:  go build           (cần Go 1.21+; chỉ dùng stdlib)
//
// Toàn bộ comment bằng tiếng Việt để hỗ trợ học.
package main

import (
	"errors"
	"fmt"
	"sort"
	"sync"
	"time"
)

// ===========================================================================
// 0. fakeDB — "database" giả, đếm số lần bị query để minh hoạ cache giảm load.
// ===========================================================================

// User là object ta cache (tương đương 1 row trong bảng users).
type User struct {
	ID   int
	Name string
	Age  int
}

// fakeDB mô phỏng một database thật: query có "độ trễ" và đếm số lần bị gọi.
type fakeDB struct {
	mu      sync.Mutex
	rows    map[int]User
	queries int // đếm số lần thực sự chạm DB — chỉ số để kiểm chứng cache
}

func newDB() *fakeDB {
	return &fakeDB{rows: map[int]User{
		42: {ID: 42, Name: "Alice", Age: 30},
		7:  {ID: 7, Name: "Bob", Age: 25},
	}}
}

// GetUser mô phỏng SELECT ... WHERE id = ?  (chậm hơn cache nhiều lần).
func (db *fakeDB) GetUser(id int) (User, error) {
	db.mu.Lock()
	db.queries++
	db.mu.Unlock()
	time.Sleep(10 * time.Millisecond) // giả lập latency DB ~10ms (xem README mục 1)
	u, ok := db.rows[id]
	if !ok {
		return User{}, errNotFound
	}
	return u, nil
}

// UpdateUser mô phỏng UPDATE users SET ... WHERE id = ?
func (db *fakeDB) UpdateUser(u User) error {
	db.mu.Lock()
	defer db.mu.Unlock()
	db.rows[u.ID] = u
	return nil
}

func (db *fakeDB) queryCount() int {
	db.mu.Lock()
	defer db.mu.Unlock()
	return db.queries
}

var errNotFound = errors.New("not found")

// ===========================================================================
// 1. memCache — Redis thu nhỏ: key-value có TTL, concurrent-safe.
//    Thay cho *redis.Client trong code thật.
// ===========================================================================

type entry struct {
	value     string
	expiresAt time.Time // zero = không TTL (sống mãi — tránh dùng, xem README mục 6)
}

type memCache struct {
	mu   sync.Mutex
	data map[string]entry

	hits   int // đếm cache hit
	misses int // đếm cache miss
}

func newCache() *memCache { return &memCache{data: map[string]entry{}} }

// errCacheMiss tương đương redis.Nil trong go-redis: "key không tồn tại",
// KHÔNG phải lỗi thật. Code thật: if err == redis.Nil { /* miss */ }
var errCacheMiss = errors.New("cache miss")

// Get tương đương:  val, err := rdb.Get(ctx, key).Result()
func (c *memCache) Get(key string) (string, error) {
	c.mu.Lock()
	defer c.mu.Unlock()
	e, ok := c.data[key]
	if !ok {
		c.misses++
		return "", errCacheMiss
	}
	// kiểm tra hết hạn (Redis tự làm phần này — ta phải tự kiểm tra lazy)
	if !e.expiresAt.IsZero() && time.Now().After(e.expiresAt) {
		delete(c.data, key)
		c.misses++
		return "", errCacheMiss
	}
	c.hits++
	return e.value, nil
}

// Set tương đương:  rdb.Set(ctx, key, val, ttl)   ->  SET key val EX <ttl>
// ttl == 0 nghĩa là không hết hạn (giống Redis); README mục 6 cảnh báo nên
// LUÔN đặt TTL cho cache key.
func (c *memCache) Set(key, val string, ttl time.Duration) {
	c.mu.Lock()
	defer c.mu.Unlock()
	var exp time.Time
	if ttl > 0 {
		exp = time.Now().Add(ttl)
	}
	c.data[key] = entry{value: val, expiresAt: exp}
}

// Del tương đương:  rdb.Del(ctx, key)   ->  DEL key   (dùng để invalidate)
func (c *memCache) Del(key string) {
	c.mu.Lock()
	defer c.mu.Unlock()
	delete(c.data, key)
}

// hitRate trả về tỉ lệ hit để minh hoạ chẩn đoán ở BT6.
func (c *memCache) hitRate() float64 {
	c.mu.Lock()
	defer c.mu.Unlock()
	total := c.hits + c.misses
	if total == 0 {
		return 0
	}
	return float64(c.hits) / float64(total)
}

// ===========================================================================
// 2. Serialize đơn giản (thay cho json.Marshal/Unmarshal cho gọn demo).
//    Code thật: b, _ := json.Marshal(u); rdb.Set(...); json.Unmarshal(b, &u)
// ===========================================================================

func encode(u User) string { return fmt.Sprintf("%d|%s|%d", u.ID, u.Name, u.Age) }

// decode tách chuỗi "id|name|age". Demo này thay cho json.Unmarshal.
func decode(s string) User {
	var u User
	parts := splitPipe(s)
	if len(parts) == 3 {
		fmt.Sscanf(parts[0], "%d", &u.ID)
		u.Name = parts[1]
		fmt.Sscanf(parts[2], "%d", &u.Age)
	}
	return u
}

func splitPipe(s string) []string {
	out := []string{}
	cur := ""
	for _, r := range s {
		if r == '|' {
			out = append(out, cur)
			cur = ""
			continue
		}
		cur += string(r)
	}
	out = append(out, cur)
	return out
}

func userKey(id int) string { return fmt.Sprintf("user:%d", id) }

// ===========================================================================
// 3. BT1 — Cache-aside (lazy loading): cache -> miss -> DB -> populate.
// ===========================================================================

func cacheAside(c *memCache, db *fakeDB, id int) (User, error) {
	key := userKey(id)

	// 1. thử cache
	if s, err := c.Get(key); err == nil {
		return decode(s), nil // HIT
	} else if !errors.Is(err, errCacheMiss) {
		// lỗi cache THẬT (không phải miss) -> fallback DB, không chặn user.
		// Code thật: if err != redis.Nil { log.Print(err) }
	}

	// 2. MISS -> đọc DB (source of truth)
	u, err := db.GetUser(id)
	if err != nil {
		return User{}, err
	}

	// 3. populate cache, LUÔN có TTL
	c.Set(key, encode(u), 10*time.Minute)
	return u, nil
}

// ===========================================================================
// 4. BT2 — Write-through: ghi DB trước (source of truth), rồi ghi cache
//    cùng giá trị mới -> đọc-sau-ghi chắc chắn HIT đúng.
// ===========================================================================

func writeThrough(c *memCache, db *fakeDB, u User) error {
	if err := db.UpdateUser(u); err != nil { // 1. DB trước
		return err
	}
	c.Set(userKey(u.ID), encode(u), 10*time.Minute) // 2. cache cùng giá trị mới
	return nil
}

// ===========================================================================
// 5. BT3 — Chống cache stampede bằng singleflight tự cài.
//
//    singleflight đảm bảo: với cùng một key đang "in-flight", chỉ MỘT
//    goroutine thực thi hàm fetch; các caller khác chờ và dùng chung kết quả.
//    Code thật dùng:  golang.org/x/sync/singleflight (group.Do(key, fn)).
//    Ở đây tự cài để file biên dịch được mà không cần thư viện ngoài.
// ===========================================================================

type call struct {
	wg  sync.WaitGroup
	val any
	err error
}

type sfGroup struct {
	mu sync.Mutex
	m  map[string]*call
}

func newSF() *sfGroup { return &sfGroup{m: map[string]*call{}} }

// Do: nếu key đang được fetch bởi goroutine khác -> chờ; ngược lại tự fetch.
func (g *sfGroup) Do(key string, fn func() (any, error)) (any, error) {
	g.mu.Lock()
	if c, ok := g.m[key]; ok {
		g.mu.Unlock()
		c.wg.Wait() // chờ goroutine đang fetch
		return c.val, c.err
	}
	c := new(call)
	c.wg.Add(1)
	g.m[key] = c
	g.mu.Unlock()

	c.val, c.err = fn() // chỉ 1 goroutine vào đây cho mỗi key

	g.mu.Lock()
	delete(g.m, key)
	g.mu.Unlock()
	c.wg.Done()
	return c.val, c.err
}

func getAntiStampede(c *memCache, db *fakeDB, sf *sfGroup, id int) (User, error) {
	key := userKey(id)
	if s, err := c.Get(key); err == nil {
		return decode(s), nil // HIT — không vào singleflight
	}

	// MISS -> chỉ 1 goroutine mỗi key đi DB
	v, err := sf.Do(key, func() (any, error) {
		// double-check: có thể goroutine khác đã điền cache trong lúc ta chờ
		if s, e := c.Get(key); e == nil {
			return decode(s), nil
		}
		u, e := db.GetUser(id) // chỉ chạy đúng 1 lần cho N caller
		if e != nil {
			return nil, e
		}
		c.Set(key, encode(u), 10*time.Minute)
		return u, nil
	})
	if err != nil {
		return User{}, err
	}
	return v.(User), nil
}

// ===========================================================================
// 6. BT4 — Leaderboard top-K bằng sorted set (mô phỏng ZSet của Redis).
//    Code thật: rdb.ZAdd / ZIncrBy / ZRevRangeWithScores / ZRevRank.
// ===========================================================================

type sortedSet struct {
	mu     sync.Mutex
	scores map[string]float64
}

func newSortedSet() *sortedSet { return &sortedSet{scores: map[string]float64{}} }

// ZAdd: set điểm (ghi đè). Redis: ZADD leaderboard score member
func (z *sortedSet) ZAdd(member string, score float64) {
	z.mu.Lock()
	defer z.mu.Unlock()
	z.scores[member] = score
}

// ZIncrBy: cộng dồn điểm. Redis: ZINCRBY leaderboard delta member
func (z *sortedSet) ZIncrBy(member string, delta float64) {
	z.mu.Lock()
	defer z.mu.Unlock()
	z.scores[member] += delta
}

type rankEntry struct {
	Member string
	Score  float64
}

// TopK: K phần tử điểm cao nhất. Redis: ZREVRANGE leaderboard 0 K-1 WITHSCORES
func (z *sortedSet) TopK(k int) []rankEntry {
	z.mu.Lock()
	defer z.mu.Unlock()
	all := make([]rankEntry, 0, len(z.scores))
	for m, s := range z.scores {
		all = append(all, rankEntry{m, s})
	}
	sort.Slice(all, func(i, j int) bool {
		if all[i].Score != all[j].Score {
			return all[i].Score > all[j].Score // điểm cao trước
		}
		return all[i].Member < all[j].Member // tie-break ổn định
	})
	if k > len(all) {
		k = len(all)
	}
	return all[:k]
}

// Rank: hạng 1-based của member. Redis: ZREVRANK + 1
func (z *sortedSet) Rank(member string) (int, bool) {
	top := z.TopK(len(z.scores))
	for i, e := range top {
		if e.Member == member {
			return i + 1, true
		}
	}
	return 0, false
}

// ===========================================================================
// 7. BT5 — Distributed lock kiểu SET NX EX (mô phỏng 1 node Redis).
//    Code thật: rdb.SetNX(ctx, key, token, ttl); mở bằng Lua so token + DEL.
// ===========================================================================

// tryLock trả về true nếu giành được lock. token định danh owner.
// Tương đương: SET key token NX EX <ttl>
func (c *memCache) tryLock(key, token string, ttl time.Duration) bool {
	c.mu.Lock()
	defer c.mu.Unlock()
	if e, ok := c.data[key]; ok {
		if e.expiresAt.IsZero() || time.Now().Before(e.expiresAt) {
			return false // đang có người giữ lock
		}
		// lock cũ đã hết hạn -> coi như trống
	}
	c.data[key] = entry{value: token, expiresAt: time.Now().Add(ttl)}
	return true
}

// unlock chỉ xoá nếu token khớp (chỉ owner mới mở được).
// Tương đương Lua: if GET(key) == token then DEL(key) end
func (c *memCache) unlock(key, token string) bool {
	c.mu.Lock()
	defer c.mu.Unlock()
	if e, ok := c.data[key]; ok && e.value == token {
		delete(c.data, key)
		return true
	}
	return false
}

// processJobOnce: chỉ owner giành được lock mới chạy work(); người khác bỏ qua.
func processJobOnce(c *memCache, jobID, token string, work func()) bool {
	key := "lock:job:" + jobID
	if !c.tryLock(key, token, 10*time.Second) {
		return false // đã có người xử lý
	}
	defer c.unlock(key, token)
	work()
	return true
}

// ===========================================================================
// 8. main — demo từng bài tập, in kết quả để kiểm chứng.
// ===========================================================================

func main() {
	fmt.Println("=== Lesson 58 — Redis & Caching demo ===")

	// ---- BT1: cache-aside ----
	fmt.Println("\n[BT1] Cache-aside:")
	c := newCache()
	db := newDB()
	u1, _ := cacheAside(c, db, 42) // MISS -> DB
	u2, _ := cacheAside(c, db, 42) // HIT  -> cache
	fmt.Printf("  đọc 2 lần user 42 = %v / %v\n", u1, u2)
	fmt.Printf("  số query DB = %d (chỉ 1 dù đọc 2 lần) | hit rate = %.0f%%\n",
		db.queryCount(), c.hitRate()*100)

	// ---- BT2: write-through ----
	fmt.Println("\n[BT2] Write-through:")
	writeThrough(c, db, User{ID: 42, Name: "Alice2", Age: 31})
	u3, _ := cacheAside(c, db, 42) // HIT ngay, đã là giá trị mới
	fmt.Printf("  sau update, đọc lại = %v (HIT, giá trị mới, không thêm query DB)\n", u3)
	fmt.Printf("  số query DB vẫn = %d\n", db.queryCount())

	// ---- BT3: chống cache stampede ----
	fmt.Println("\n[BT3] Chống cache stampede (1000 goroutine cùng miss):")
	c2 := newCache()
	db2 := newDB()
	sf := newSF()
	var wg sync.WaitGroup
	for i := 0; i < 1000; i++ {
		wg.Add(1)
		go func() {
			defer wg.Done()
			getAntiStampede(c2, db2, sf, 7)
		}()
	}
	wg.Wait()
	fmt.Printf("  1000 request cùng miss user 7 -> số query DB = %d (kỳ vọng = 1)\n", db2.queryCount())

	// So sánh: KHÔNG dùng singleflight thì sẽ nhiều query hơn nhiều.
	c3 := newCache()
	db3 := newDB()
	var wg2 sync.WaitGroup
	for i := 0; i < 1000; i++ {
		wg2.Add(1)
		go func() {
			defer wg2.Done()
			cacheAside(c3, db3, 7) // không chống stampede
		}()
	}
	wg2.Wait()
	fmt.Printf("  cùng vậy nhưng KHÔNG singleflight -> số query DB = %d (nhiều hơn -> stampede)\n", db3.queryCount())

	// ---- BT4: leaderboard ----
	fmt.Println("\n[BT4] Leaderboard (Sorted Set):")
	lb := newSortedSet()
	lb.ZAdd("alice", 1500)
	lb.ZAdd("bob", 1200)
	lb.ZAdd("carol", 1800)
	lb.ZIncrBy("bob", 700) // bob +700 -> 1900
	fmt.Println("  Top 10:")
	for i, e := range lb.TopK(10) {
		fmt.Printf("    #%d %-6s %.0f\n", i+1, e.Member, e.Score)
	}
	if r, ok := lb.Rank("alice"); ok {
		fmt.Printf("  hạng của alice = %d\n", r)
	}

	// ---- BT5: distributed lock ----
	fmt.Println("\n[BT5] Distributed lock (SET NX) chống double-process:")
	c4 := newCache()
	var runs int
	var rmu sync.Mutex
	var wg3 sync.WaitGroup
	for i := 0; i < 5; i++ { // 5 worker cùng giành 1 job
		wg3.Add(1)
		go func(id int) {
			defer wg3.Done()
			token := fmt.Sprintf("worker-%d", id)
			ok := processJobOnce(c4, "send-email-123", token, func() {
				rmu.Lock()
				runs++
				rmu.Unlock()
				time.Sleep(20 * time.Millisecond) // giữ lock khi đang làm
			})
			if ok {
				fmt.Printf("  %s giành được lock và xử lý job\n", token)
			}
		}(i)
	}
	wg3.Wait()
	fmt.Printf("  job thực sự chạy %d lần (kỳ vọng = 1)\n", runs)

	fmt.Println("\nXong. Xem README.md để biết cách map sang go-redis thật.")
}
