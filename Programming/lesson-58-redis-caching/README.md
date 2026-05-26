# Lesson 58 — Redis & Caching Strategies

> Tier 5 (Database & Storage) · Lesson 58 · Tiền đề: [Lesson 54 — SQL & database/sql](../lesson-54-sql-database-sql/), [Lesson 52 — Rate Limiting](../lesson-52-rate-limiting-circuit-breaker/), [Lesson 27 — Goroutines & Channels](../lesson-27-goroutines-channels/).

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Hiểu **vì sao cần cache** và đo được lợi ích bằng con số (latency, load DB).
- Biết **Redis** là gì, các **kiểu dữ liệu** (data structure) của nó và use case từng cái.
- Dùng client `github.com/redis/go-redis/v9` để nói chuyện với Redis từ Go.
- Cài đặt 4 **caching pattern**: cache-aside, write-through, write-behind, read-through.
- Hiểu **TTL / eviction**, **cache invalidation**, và 3 cơn ác mộng kinh điển: **cache stampede**, **hot key**, **stale data**.
- Dùng Redis làm **distributed lock**, **rate limiter**, **pub/sub**.
- Chọn đúng **persistence** (RDB vs AOF) và tránh coi Redis như primary DB.

---

## 1. Vì sao cache — và lợi ích cụ thể bằng con số

> 💡 **Trực giác.** Hình dung quán cà phê: mỗi lần khách gọi "cà phê sữa", barista chạy xuống kho lấy nguyên liệu (DB) rồi pha. Nếu quán pha sẵn vài ly "best-seller" để ngay quầy (cache), khách lấy ngay — nhanh hơn nhiều, và kho đỡ bị giẫm chân. Cache = bản sao dữ liệu đặt ở chỗ **gần** và **nhanh** hơn nguồn gốc.

Cache giải quyết 2 vấn đề cùng lúc:

1. **Giảm latency** — đọc từ RAM (Redis) nhanh hơn đọc từ disk-backed DB hàng chục đến hàng trăm lần.
2. **Giảm load DB** — request lặp lại không đập vào DB, nên DB có thể phục vụ nhiều user hơn với cùng phần cứng.

### 1.1 Con số thực tế

Giả sử 1 query đọc profile user:

| Nguồn | Latency điển hình |
|-------|-------------------|
| Postgres (index hit, cùng datacenter) | **~10 ms** |
| Redis (in-memory, cùng mạng) | **~0.1–0.5 ms** |
| Local in-process cache (RAM tiến trình) | **~0.001 ms** (1 µs) |

Cache Redis nhanh hơn DB khoảng **20–100 lần**. Walk-through bằng số:

- Trang chủ load 1 profile + 5 query phụ = 6 query × 10 ms = **60 ms** chỉ riêng DB.
- Nếu 5/6 query hit cache Redis (0.2 ms): `10 + 5×0.2 = 11 ms` → giảm ~**82%** thời gian.

### 1.2 Load DB

Giả sử endpoint nhận **10 000 req/s**, mỗi req cần 1 query profile.

- **Không cache:** DB nhận 10 000 query/s. Nếu DB max ~5 000 query/s → **quá tải, sập**.
- **Cache hit rate 95%:** DB chỉ nhận `10 000 × 5% = 500 query/s`. Thừa sức.

> ❓ **Câu hỏi tự nhiên.**
> - *"Cache hit rate bao nhiêu là tốt?"* — Tùy domain, nhưng > 90% là mục tiêu thường gặp cho dữ liệu đọc-nhiều-ghi-ít. Dưới 50% nghĩa là cache gần như vô dụng (xem BT6).
> - *"Cache có làm dữ liệu sai không?"* — Có rủi ro **stale** (cũ). Toàn bộ mục 7–8 nói về chuyện này.

> 📝 **Tóm tắt mục 1.** Cache đổi một chút phức tạp (đồng bộ, invalidation) lấy hai thứ lớn: **latency thấp hơn 20–100×** và **load DB giảm theo hit rate**. Đáng làm khi đọc-nhiều-ghi-ít.

---

## 2. Redis là gì

**Redis** (REmote DIctionary Server) là một **in-memory key-value store**: toàn bộ dữ liệu nằm trong RAM nên truy cập cực nhanh. Khác với một `map[string]string` thường:

- **Mạng (networked):** nhiều tiến trình / nhiều server cùng truy cập 1 Redis → chia sẻ cache giữa các instance của service.
- **Cấu trúc dữ liệu phong phú:** không chỉ string mà còn hash, list, set, sorted set, bitmap, stream... (mục 3).
- **Single-threaded cho command:** mỗi lệnh chạy nguyên tử (atomic), không cần lock từ phía bạn cho từng lệnh.
- **Persistence tùy chọn:** có thể ghi xuống disk (RDB/AOF — mục 13) để không mất sạch khi restart.
- **TTL built-in:** mỗi key có thể tự hết hạn (mục 6).

> 💡 **Trực giác.** Redis = "một `map` khổng lồ, dùng chung qua mạng, biết tự xóa entry hết hạn, và có sẵn vài kiểu collection thông minh". Vì single-threaded nên `INCR` không bao giờ race — đây là lý do nó hợp làm counter / lock / rate limiter.

> ⚠ **Lỗi thường gặp.** Coi Redis là **primary database**. Mặc định Redis ưu tiên tốc độ hơn độ bền: nếu cấu hình persistence lỏng, một lần crash có thể mất vài giây dữ liệu gần nhất. Redis hợp làm **cache / dữ liệu phụ trợ / dữ liệu tái tạo được**, không phải nơi duy nhất giữ sự thật (source of truth).

---

## 3. Redis data structures — mỗi cái một use case

Sức mạnh của Redis nằm ở việc value không chỉ là string. Chọn đúng structure = code gọn + nhanh.

### 3.1 String — counter, cache value

Value là một chuỗi bytes (tối đa 512MB). Đây là kiểu cơ bản nhất.

```
SET user:42:name "Alice"
GET user:42:name            -> "Alice"
INCR page:home:views        -> 1, 2, 3, ...   (atomic counter)
SET session:abc "{...json}" EX 3600
```

- **Use case:** cache nguyên một object đã serialize (JSON), đếm view, lưu session token.

### 3.2 Hash — object có nhiều field

Một key chứa nhiều cặp field→value, giống `map[string]string` lồng bên trong.

```
HSET user:42 name "Alice" age "30" city "Hanoi"
HGET user:42 age            -> "30"
HGETALL user:42             -> name Alice age 30 city Hanoi
HINCRBY user:42 age 1       -> 31
```

- **Use case:** cache object mà bạn muốn cập nhật / đọc **từng field** mà không phải nạp lại cả object. Tiết kiệm hơn lưu cả JSON khi chỉ đổi 1 field.

### 3.3 List — queue, timeline

Danh sách có thứ tự, thêm/xóa hai đầu rất nhanh (linked list).

```
LPUSH queue:jobs "job1"     # đẩy vào đầu
RPUSH timeline:42 "post99"  # đẩy vào cuối
LRANGE timeline:42 0 9      # lấy 10 phần tử đầu
BRPOP queue:jobs 5          # blocking pop — chờ tối đa 5s (job queue đơn giản)
```

- **Use case:** hàng đợi công việc (job queue), timeline / feed gần đây (giữ N item mới nhất bằng `LPUSH` + `LTRIM`).

### 3.4 Set — phần tử duy nhất, tag

Tập hợp không trùng lặp, không thứ tự.

```
SADD post:1:tags "go" "redis" "cache"
SISMEMBER post:1:tags "go"  -> 1 (có)
SADD online:users 42
SCARD online:users          -> số user online
SINTER post:1:tags post:2:tags   # tag chung giữa 2 post
```

- **Use case:** tag, tập user online, kiểm tra membership ("user này đã like chưa?"), phép giao/hợp giữa các tập.

### 3.5 Sorted Set (ZSet) — leaderboard, rate limit sliding window

Set mà mỗi phần tử có một **score** (số), tự sắp xếp theo score.

```
ZADD leaderboard 1500 "alice" 1200 "bob" 1800 "carol"
ZREVRANGE leaderboard 0 9 WITHSCORES   # top 10 điểm cao nhất
ZRANK leaderboard "bob"                 # hạng của bob
ZINCRBY leaderboard 50 "bob"            # cộng 50 điểm cho bob
```

- **Use case:** **leaderboard** (xếp hạng theo điểm), **sliding-window rate limit** (score = timestamp, xóa entry cũ rồi đếm — xem mục 11), lịch event theo thời gian.

### 3.6 Bitmap — đếm/đánh dấu trên bit

Dùng string nhưng thao tác từng bit. Rất tiết kiệm bộ nhớ cho "có/không" theo id.

```
SETBIT active:2026-05-26 42 1   # user 42 active hôm nay
GETBIT active:2026-05-26 42     -> 1
BITCOUNT active:2026-05-26      # bao nhiêu user active hôm nay
```

- **Use case:** daily active users, feature flag theo user id, attendance. 1 triệu user chỉ tốn ~125KB.

### 3.7 HyperLogLog — đếm xấp xỉ số phần tử duy nhất

Đếm số phần tử **distinct** với sai số ~0.81%, chỉ tốn ~12KB bất kể số lượng.

```
PFADD visitors:home "ip1" "ip2" "ip3"
PFCOUNT visitors:home           # ước lượng số IP duy nhất
```

- **Use case:** đếm unique visitor / unique search khi không cần con số chính xác tuyệt đối. So với Set (lưu hết phần tử), HLL tiết kiệm bộ nhớ khủng khiếp.

### 3.8 Stream — log append-only, persistent

Hàng đợi message bền (persistent) có consumer group, giống Kafka thu nhỏ.

```
XADD events * type "login" user "42"
XREAD COUNT 10 STREAMS events 0
XREADGROUP GROUP g1 c1 COUNT 10 STREAMS events >
```

- **Use case:** event sourcing, message queue cần lưu lại và replay được (khác Pub/Sub ở mục 12 — Pub/Sub không lưu).

> 🔁 **Dừng lại tự kiểm tra.**
> 1. Muốn làm bảng xếp hạng game top-100 theo điểm, dùng structure nào?
> 2. Muốn đếm số IP duy nhất truy cập trang hôm nay, chấp nhận sai số nhỏ, tiết kiệm RAM?
>
> <details><summary>Đáp án</summary>
>
> 1. **Sorted Set** — `ZADD` để cập nhật điểm, `ZREVRANGE 0 99` lấy top 100. Tự sắp xếp.
> 2. **HyperLogLog** — `PFADD` + `PFCOUNT`, sai số ~0.81%, chỉ ~12KB.
> </details>

> 📝 **Tóm tắt mục 3.** String (value/counter) · Hash (object field) · List (queue/timeline) · Set (unique/tag) · Sorted Set (leaderboard/rate limit) · Bitmap (đánh dấu theo id) · HyperLogLog (đếm xấp xỉ) · Stream (event log bền). Chọn structure theo **thao tác** bạn cần, không phải theo "dữ liệu trông giống gì".

---

## 4. Go client — `go-redis`

Thư viện phổ biến nhất: `github.com/redis/go-redis/v9`.

```bash
go get github.com/redis/go-redis/v9
```

```go
import (
    "context"
    "time"

    "github.com/redis/go-redis/v9"
)

func newClient() *redis.Client {
    return redis.NewClient(&redis.Options{
        Addr:         "localhost:6379",
        Password:     "",
        DB:           0,
        PoolSize:     20,              // số connection trong pool
        DialTimeout:  2 * time.Second,
        ReadTimeout:  500 * time.Millisecond,
        WriteTimeout: 500 * time.Millisecond,
    })
}

func demo(ctx context.Context, rdb *redis.Client) error {
    // SET với TTL 1 giờ
    if err := rdb.Set(ctx, "user:42:name", "Alice", time.Hour).Err(); err != nil {
        return err
    }
    // GET — phân biệt "key không tồn tại" với lỗi thật
    val, err := rdb.Get(ctx, "user:42:name").Result()
    if err == redis.Nil {
        // cache miss — key không tồn tại
        return nil
    } else if err != nil {
        return err // lỗi mạng / Redis
    }
    _ = val
    return nil
}
```

> ⚠ **Lỗi thường gặp.** Quên xử lý `redis.Nil`. `Get` trả về `err == redis.Nil` khi **key không tồn tại** — đây là cache miss bình thường, KHÔNG phải lỗi. Coi nó là lỗi → log rác hoặc trả 500 cho user.

`go-redis` hỗ trợ pipeline (gộp nhiều lệnh 1 round-trip), transaction (`TxPipeline` / `WATCH`), pub/sub, và cluster mode.

---

## 5. Caching patterns — 4 cách phổ biến

> 💡 **Trực giác.** Câu hỏi cốt lõi: **ai chịu trách nhiệm điền cache và khi nào?** Bốn pattern dưới đây trả lời khác nhau.

### 5.1 Cache-aside (lazy loading) — phổ biến nhất

Ứng dụng tự quản lý cache. Khi đọc:

```
1. Đọc cache theo key.
2. HIT  -> trả về luôn.
3. MISS -> đọc DB -> ghi kết quả vào cache (SET, kèm TTL) -> trả về.
```

Khi ghi: cập nhật DB, rồi **xóa** (invalidate) key trong cache.

```go
func GetUser(ctx context.Context, rdb *redis.Client, db *DB, id int) (*User, error) {
    key := fmt.Sprintf("user:%d", id)

    // 1. thử cache
    data, err := rdb.Get(ctx, key).Bytes()
    if err == nil {
        var u User
        json.Unmarshal(data, &u)
        return &u, nil // HIT
    }
    if err != redis.Nil {
        return nil, err // lỗi Redis thật — tùy chọn: fallback xuống DB
    }

    // 2. MISS -> đọc DB
    u, err := db.GetUser(ctx, id)
    if err != nil {
        return nil, err
    }

    // 3. populate cache (TTL 10 phút)
    b, _ := json.Marshal(u)
    rdb.Set(ctx, key, b, 10*time.Minute)
    return u, nil
}
```

- **Ưu:** đơn giản, chỉ cache thứ thực sự được đọc (lazy). Cache fail thì vẫn đọc được DB.
- **Nhược:** lần đọc đầu luôn miss (cold start); có cửa sổ stale giữa lúc DB đổi và cache bị xóa.

### 5.2 Write-through — ghi cache + DB cùng lúc

Mọi ghi đi qua một lớp duy nhất, lớp đó ghi **cả DB cả cache** trước khi trả về.

```
write -> ghi DB -> ghi cache (cùng giá trị) -> trả OK
```

- **Ưu:** cache luôn fresh ngay sau write; đọc sau write chắc chắn hit.
- **Nhược:** mỗi write tốn thêm thời gian ghi cache; cache có thể chứa dữ liệu chẳng bao giờ được đọc (lãng phí RAM).

### 5.3 Write-behind (write-back) — ghi cache trước, flush DB sau

```
write -> ghi cache ngay -> trả OK -> (async) gom batch -> ghi DB sau
```

- **Ưu:** write latency cực thấp (chỉ chạm RAM); gộp được nhiều write thành 1 batch ghi DB.
- **Nhược:** **rủi ro mất dữ liệu** nếu crash trước khi flush; phức tạp; thứ tự ghi DB khó đảm bảo. Dùng cho counter / metric chấp nhận mất một ít.

### 5.4 Read-through — thư viện cache tự load từ DB

Giống cache-aside nhưng logic "miss → load DB → fill" nằm trong **lớp cache library**, không phải code ứng dụng. App chỉ gọi `cache.Get(key)`, library tự lo phần còn lại.

- **Ưu:** code ứng dụng sạch, logic cache tập trung một chỗ.
- **Nhược:** cần một abstraction / library hỗ trợ; ít linh hoạt hơn khi mỗi loại key cần logic load khác nhau.

> ❓ **Câu hỏi tự nhiên.** *"Mặc định nên dùng cái nào?"* → **Cache-aside**. Nó đơn giản, chịu lỗi tốt (Redis chết vẫn chạy được nhờ DB), và phù hợp 90% trường hợp đọc-nhiều. Chỉ chuyển sang write-through/behind khi có lý do cụ thể (đọc-ngay-sau-ghi nhiều, hoặc write quá nhanh).

> 📝 **Tóm tắt mục 5.** Cache-aside (app tự lo, lazy, default) · write-through (fresh, tốn write) · write-behind (nhanh, rủi ro mất) · read-through (library tự load). Chọn theo tỉ lệ đọc/ghi và yêu cầu tươi của dữ liệu.

---

## 6. TTL & expiration — không bao giờ để cache sống mãi

**TTL** (Time To Live) = thời gian sống của key. Hết hạn → Redis tự xóa.

```
SET key value EX 3600     # sống 3600 giây (1 giờ)
SET key value PX 500      # 500 mili-giây
EXPIRE key 60             # đặt/đổi TTL = 60s cho key đã có
TTL key                   # còn bao nhiêu giây (-1 = không có TTL, -2 = không tồn tại)
PERSIST key               # bỏ TTL — sống vĩnh viễn (cẩn thận!)
```

### 6.1 Eviction policy — khi RAM đầy

Redis có `maxmemory`. Khi đầy, nó **evict** (đuổi) key theo `maxmemory-policy`:

| Policy | Hành vi |
|--------|---------|
| `noeviction` | Không đuổi, trả lỗi khi ghi (mặc định cho DB-mode) |
| `allkeys-lru` | Đuổi key **ít dùng gần đây nhất** (Least Recently Used) — phổ biến cho cache |
| `allkeys-lfu` | Đuổi key **ít được dùng nhất** (Least Frequently Used) |
| `volatile-lru` | Như LRU nhưng chỉ trong các key **có TTL** |
| `allkeys-random` | Đuổi ngẫu nhiên |

> 💡 **LRU vs LFU.** LRU nhìn "lần cuối dùng là khi nào" — key vừa dùng thì an toàn. LFU nhìn "tổng số lần dùng" — key dùng nhiều thì an toàn dù lâu rồi mới chạm. LFU tốt hơn khi có "key nóng dài hạn" lẫn "key vừa quét một lần rồi bỏ".

> ⚠ **Lỗi thường gặp.** Đặt **TTL = 0 / không TTL** rồi quên đi → key sống vĩnh viễn. Nếu dữ liệu nguồn đổi mà không ai xóa key, cache phục vụ giá trị **cũ mãi mãi (stale forever)**. Quy tắc: **mọi key cache nên có TTL**, kể cả khi bạn cũng invalidate chủ động — TTL là lưới an toàn cuối cùng.

---

## 7. Cache invalidation — một trong "2 hard problems"

> Có câu đùa nổi tiếng của Phil Karlton: *"Trong khoa học máy tính chỉ có 2 việc khó: **cache invalidation**, đặt tên, và off-by-one error."*

**Invalidation** = làm cache mất hiệu lực khi dữ liệu nguồn đổi, để lần đọc sau lấy giá trị mới. Ba chiến lược:

### 7.1 TTL-based (hết hạn tự nhiên)

Không xóa chủ động, để key tự hết hạn. Đơn giản nhất.

- **Ưu:** không cần biết khi nào data đổi.
- **Nhược:** cửa sổ stale = TTL. Đặt TTL 1h → user có thể thấy dữ liệu cũ tới 1 giờ.

### 7.2 Explicit delete (write-time invalidation)

Khi ghi DB, **xóa** key cache tương ứng: `DEL user:42`. Lần đọc sau miss → nạp lại từ DB.

- **Ưu:** stale window gần như bằng 0.
- **Nhược:** phải biết chính xác key nào cần xóa; với dữ liệu phái sinh (list, aggregate) có thể có nhiều key liên quan → dễ sót.

### 7.3 Versioned key (key có phiên bản)

Đính số version vào key. Đổi data → tăng version → key cũ "mồ côi", tự hết hạn theo TTL.

```
GET user:42:v7          # version hiện tại lưu ở user:42:ver
# khi update: INCR user:42:ver  -> 8, từ giờ đọc user:42:v8 (miss -> nạp mới)
```

- **Ưu:** không cần `DEL` từng key phái sinh; "đổi version = vô hiệu mọi cache liên quan".
- **Nhược:** key cũ chiếm RAM tới khi TTL hết; cần chỗ lưu version.

> ❓ **Câu hỏi tự nhiên.** *"Nên xóa cache rồi ghi DB, hay ghi DB rồi xóa cache?"* → **Ghi DB trước, rồi xóa cache** (cache-aside chuẩn). Nếu xóa cache trước, một read xen vào có thể nạp lại giá trị **cũ** từ DB (chưa kịp ghi) → cache stale ngay. Vẫn còn race hiếm; để chắc hơn dùng TTL ngắn làm lưới an toàn.

> 📝 **Tóm tắt mục 7.** TTL (đơn giản, stale tới hạn) · explicit delete (tươi, dễ sót key phái sinh) · versioned key (vô hiệu hàng loạt, tốn RAM tạm). Thực tế thường **kết hợp**: explicit delete + TTL ngắn dự phòng.

---

## 8. Cache stampede (thundering herd) — cơn bão giẫm đạp

> 💡 **Trực giác.** Một key nóng (vd trang chủ) đang được 1000 request/s đọc, tất cả đều HIT. Đúng lúc key đó **hết hạn**. Trong tích tắc, cả 1000 request cùng MISS, cùng lao xuống DB hỏi đúng một thứ → DB nhận 1000 query giống hệt nhau cùng lúc → **quá tải, sập**. Đây là **cache stampede** (hay *thundering herd*, *dog-piling*).

### 8.1 Walk-through bằng số

- Bình thường: 1000 req/s, hit rate 99.9% → DB nhận ~1 query/s. DB nhàn.
- Key hết hạn lúc `t=0`: trong ~10ms (thời gian 1 query DB), 1000 req tới đều miss → **1000 query/s** đập DB cùng lúc, toàn bộ tính lại cùng một giá trị. DB CPU vọt 100% → request chậm → càng nhiều request dồn → sập dây chuyền.

### 8.2 Ba cách chống

**(a) Lock / singleflight — chỉ 1 request fetch.**
Khi miss, request đầu tiên giành được "quyền fetch" (lock), tự đi DB; các request khác **chờ** kết quả của nó thay vì cùng đi DB.

Trong Go có sẵn `golang.org/x/sync/singleflight`:

```go
import "golang.org/x/sync/singleflight"

var group singleflight.Group

func getUserSF(ctx context.Context, id int) (*User, error) {
    key := fmt.Sprintf("user:%d", id)
    v, err, _ := group.Do(key, func() (any, error) {
        // chỉ MỘT goroutine vào đây cho cùng key tại một thời điểm
        return loadFromDB(ctx, id) // các caller khác share kết quả này
    })
    if err != nil {
        return nil, err
    }
    return v.(*User), nil
}
```

1000 request cùng miss key `user:42` → chỉ **1** query DB, 999 request còn lại chờ và dùng chung kết quả. (Trên nhiều instance, dùng Redis `SET NX` làm lock toàn cục — mục 10.)

**(b) Probabilistic early expiration.**
Trước khi TTL hết, mỗi request có **xác suất nhỏ** tự nguyện làm mới cache sớm. Xác suất tăng dần khi gần hết hạn → một request lẻ làm mới trước, các request khác vẫn hit giá trị cũ → không bao giờ có khoảnh khắc tất cả cùng miss. (Thuật toán XFetch.)

**(c) Stale-while-revalidate.**
Khi key hết hạn, vẫn **trả giá trị cũ** cho request, đồng thời kích hoạt **một** goroutine nền đi làm mới. User không phải chờ DB; chỉ chấp nhận stale rất ngắn.

> ⚠ **Lỗi thường gặp.** Không hề xử lý stampede, để mọi key cache đắt-tiền hết hạn cùng lúc. Cách đơn giản giảm nhẹ: thêm **jitter** vào TTL (`TTL = 600s + random(0..60s)`) để các key không hết hạn đồng loạt.

> 📝 **Tóm tắt mục 8.** Stampede = nhiều request cùng miss một key nóng → DB sập. Chống bằng singleflight/lock (1 fetch), early expiration xác suất, hoặc stale-while-revalidate. Luôn thêm jitter vào TTL.

---

## 9. Hot key problem — một key quá nóng

**Hot key** = một key bị đọc/ghi với tần suất cực cao (vd item flash-sale, profile của người nổi tiếng). Vì Redis shard theo key, **một key luôn nằm trên một node** → node đó quá tải dù cụm Redis còn rảnh.

Giải pháp:

- **Local cache (in-process):** cache thêm một lớp ngay trong RAM tiến trình (vd `bigcache`, hoặc `map` + TTL). Đọc hot key thì hit local, không chạm Redis. Lớp này nhanh nhất (µs) nhưng mỗi instance một bản → khó invalidate đồng bộ → chỉ dùng TTL ngắn (vài giây).
- **Replica đọc:** đọc hot key từ nhiều Redis replica để chia tải đọc.
- **Key splitting:** tách hot key thành nhiều shadow key (`hot:0`..`hot:9`), request chọn ngẫu nhiên một cái → phân tán qua nhiều node.

> ❓ **Câu hỏi tự nhiên.** *"Làm sao biết mình có hot key?"* → Dùng `redis-cli --hotkeys` (cần LFU), hoặc theo dõi metric per-key. Một node Redis CPU cao bất thường trong khi các node khác nhàn = dấu hiệu hot key.

---

## 10. Distributed lock với Redis — `SET NX`

Khi nhiều instance cùng muốn làm **đúng một việc một lần** (vd gửi 1 email, xử lý 1 job), cần khóa phân tán.

```
SET lock:job:123 <random-token> NX EX 10
```

- `NX` = chỉ set nếu key **chưa tồn tại** → ai set được là người giành lock.
- `EX 10` = lock tự hết sau 10s → tránh deadlock nếu owner crash mà chưa trả lock.
- `<random-token>` = giá trị duy nhất của riêng owner, dùng khi mở lock để **chỉ owner mới mở được**.

Mở lock an toàn (so token rồi mới `DEL`) phải dùng Lua script để atomic:

```lua
if redis.call("GET", KEYS[1]) == ARGV[1] then
    return redis.call("DEL", KEYS[1])
else
    return 0
end
```

Trong Go (`go-redis`):

```go
token := uuid.NewString()
ok, _ := rdb.SetNX(ctx, "lock:job:123", token, 10*time.Second).Result()
if !ok {
    return // người khác đang giữ lock
}
defer unlockScript.Run(ctx, rdb, []string{"lock:job:123"}, token)
// ... làm việc độc quyền ...
```

> ⚠ **Caveat (Redlock).** Lock đơn-node có thể sai nếu owner bị pause (GC, network) lâu hơn TTL → lock hết hạn, người khác giành lock, rồi owner cũ "tỉnh dậy" tưởng mình vẫn giữ. Redis có **Redlock** (lock trên nhiều node độc lập) nhưng vẫn gây tranh cãi về tính đúng đắn. Quy tắc: **đừng dùng Redis lock cho việc đòi correctness tuyệt đối** (vd chuyển tiền) — dùng cho best-effort dedup/coordination, và thiết kế thao tác **idempotent** để chạy 2 lần không sao.

---

## 11. Rate limiting với Redis

(Đã đụng ở [Lesson 52](../lesson-52-rate-limiting-circuit-breaker/); đây là cách làm **phân tán** bằng Redis.)

### 11.1 Fixed window — INCR + EXPIRE

```go
key := fmt.Sprintf("rl:%s:%d", userID, time.Now().Unix()/60) // cửa sổ 1 phút
n, _ := rdb.Incr(ctx, key).Result()
if n == 1 {
    rdb.Expire(ctx, key, time.Minute) // chỉ set TTL ở lần đầu
}
if n > 100 {
    return errTooMany // quá 100 req/phút
}
```

- Đơn giản, nhưng có lỗi "biên cửa sổ": 100 req cuối phút này + 100 req đầu phút sau = 200 req trong ~vài giây.

### 11.2 Sliding window — Sorted Set

Dùng ZSet với score = timestamp; mỗi request thêm 1 entry, xóa entry cũ hơn cửa sổ, rồi đếm.

```go
now := time.Now().UnixNano()
windowStart := now - int64(time.Minute)
pipe := rdb.TxPipeline()
pipe.ZRemRangeByScore(ctx, key, "0", fmt.Sprint(windowStart)) // bỏ entry cũ
pipe.ZAdd(ctx, key, redis.Z{Score: float64(now), Member: now})
count := pipe.ZCard(ctx, key)
pipe.Expire(ctx, key, time.Minute)
pipe.Exec(ctx)
if count.Val() > 100 {
    return errTooMany
}
```

- Chính xác hơn fixed window (không có lỗi biên), tốn RAM hơn (lưu từng timestamp).

---

## 12. Pub/Sub — message real-time

Redis có cơ chế publish/subscribe: publisher gửi message vào **channel**, mọi subscriber đang nghe channel đó nhận được.

```
SUBSCRIBE news        # subscriber nghe channel "news"
PUBLISH news "hello"  # publisher gửi -> mọi subscriber nhận "hello"
```

```go
sub := rdb.Subscribe(ctx, "news")
for msg := range sub.Channel() {
    fmt.Println("got:", msg.Payload)
}
```

- **Use case:** cache invalidation đa-instance ("user 42 đổi rồi, ai cache thì xóa đi"), chat đơn giản, notification realtime.

> ⚠ **Lỗi thường gặp.** Coi Pub/Sub như message queue đáng tin. Pub/Sub là **fire-and-forget, KHÔNG persistent**: subscriber không online lúc publish thì **mất luôn** message đó. Cần lưu lại / replay / consumer group → dùng **Stream** (mục 3.8) hoặc một MQ thật (Kafka/NATS — Tier 6).

---

## 13. Persistence — RDB vs AOF

Redis có thể ghi dữ liệu xuống disk để không mất sạch khi restart. Hai cơ chế:

| | **RDB** (snapshot) | **AOF** (append-only file) |
|---|---|---|
| Cách hoạt động | Chụp toàn bộ dataset thành 1 file `.rdb` theo chu kỳ | Ghi **mọi lệnh ghi** vào log, replay khi khởi động |
| Khôi phục | Nhanh (load 1 file binary) | Chậm hơn (replay log) |
| Mất dữ liệu khi crash | Mất tới chu kỳ snapshot gần nhất (vd vài phút) | Rất ít — tùy `fsync` (mỗi lệnh / mỗi giây) |
| Kích thước file | Nhỏ, gọn | Lớn hơn (cần rewrite định kỳ để gọn) |
| Ảnh hưởng hiệu năng | Fork tốn RAM lúc snapshot | Ghi liên tục, fsync mỗi giây là cân bằng tốt |

> 💡 **Trực giác.** RDB = "ảnh chụp gia đình mỗi cuối tuần" — gọn, nhưng mất các thay đổi giữa hai lần chụp. AOF = "nhật ký ghi từng việc" — đầy đủ hơn, file to hơn. Thực tế production thường **bật cả hai**: AOF cho độ bền, RDB cho backup/restore nhanh.

> ❓ **Câu hỏi tự nhiên.** *"Cache thì cần persistence không?"* → Nếu Redis chỉ làm cache (dữ liệu tái tạo được từ DB), restart mất cache cũng chỉ gây cold start (hit rate tụt tạm thời). Nhiều team **tắt persistence** cho Redis-cache thuần để nhanh hơn. Bật khi Redis giữ dữ liệu khó tái tạo (session, rate-limit state).

---

## 14. Common pitfalls — tổng hợp

| Pitfall | Hậu quả | Cách tránh |
|---------|---------|------------|
| **Không handle cache stampede** | DB sập khi key nóng hết hạn | singleflight/lock + TTL jitter (mục 8) |
| **TTL = 0 / không TTL** | Stale forever, RAM phình | Mọi cache key có TTL; PERSIST chỉ khi cố ý |
| **Cache object quá to** | Tốn RAM + băng thông mạng mỗi lần GET | Cache field cần thiết (Hash) hoặc tách nhỏ |
| **Không invalidate** | Phục vụ dữ liệu cũ sau khi DB đổi | Explicit delete khi ghi + TTL dự phòng (mục 7) |
| **Coi Redis như primary DB** | Mất dữ liệu khi crash | Redis là cache/phụ trợ; source of truth ở DB bền |
| **Không phát hiện hot key** | 1 node Redis quá tải | Monitor per-key; local cache / split key (mục 9) |
| **Quên `redis.Nil`** | Log rác, trả 500 cho cache miss | `if err == redis.Nil { /* miss */ }` |
| **Pub/Sub làm queue** | Mất message khi subscriber offline | Dùng Stream / MQ thật (mục 12) |

> 📝 **Tóm tắt mục 14.** Phần lớn sự cố cache không phải "cache chậm" mà là **stale data**, **stampede**, **hot key**, và **dùng sai công cụ** (Pub/Sub làm queue, Redis làm DB chính). Thiết kế cache = thiết kế cả chiến lược invalidation và đường thoát khi cache fail.

---

## 15. Bài tập

> Mỗi bài có **Lời giải chi tiết** ở mục 16. Tự làm trước rồi đối chiếu.

- **BT1.** Cài `getUserByID` theo pattern **cache-aside**: kiểm tra cache → miss thì đọc DB → populate cache có TTL. Phân biệt cache miss với lỗi Redis.
- **BT2.** Cài `updateUser` theo **write-through**: ghi DB và cache cùng lúc, đảm bảo đọc-sau-ghi luôn hit và đúng giá trị mới.
- **BT3.** Cài cơ chế chống **cache stampede** dùng `singleflight`: 1000 goroutine cùng đọc một key vừa hết hạn → chỉ đúng 1 lần đọc DB.
- **BT4.** Cài **leaderboard** top-10 bằng Sorted Set: thêm/cập nhật điểm, lấy top 10 kèm hạng.
- **BT5.** Cài **distributed lock** bằng `SET NX EX` để chống xử lý trùng (double-process) một job; chỉ owner mới mở được lock.
- **BT6.** **Chẩn đoán:** một service có cache hit rate chỉ **30%** (quá thấp). Liệt kê các nguyên nhân khả dĩ và cách sửa.

---

## 16. Lời giải chi tiết

### Lời giải BT1 — cache-aside cho `getUserByID`

**Cách tiếp cận.** Ba bước kinh điển: GET cache → nếu `redis.Nil` thì đọc DB → SET cache có TTL. Lỗi Redis (khác `Nil`) nên fallback xuống DB chứ không trả lỗi cho user (cache là tối ưu, không phải bắt buộc).

```go
func getUserByID(ctx context.Context, rdb *redis.Client, db *DB, id int) (*User, error) {
    key := fmt.Sprintf("user:%d", id)

    data, err := rdb.Get(ctx, key).Bytes()
    switch {
    case err == nil: // HIT
        var u User
        if e := json.Unmarshal(data, &u); e == nil {
            return &u, nil
        }
        // cache hỏng -> coi như miss, đọc lại DB
    case err == redis.Nil: // MISS — bình thường
    default: // lỗi Redis thật -> log + fallback DB, đừng chặn user
        log.Printf("redis get %s: %v", key, err)
    }

    // MISS / lỗi cache -> đọc DB
    u, err := db.GetUser(ctx, id)
    if err != nil {
        return nil, err
    }

    // populate (best-effort, lỗi cache không chặn response)
    if b, e := json.Marshal(u); e == nil {
        rdb.Set(ctx, key, b, 10*time.Minute) // luôn có TTL
    }
    return u, nil
}
```

**Điểm mấu chốt.** (1) Phân biệt `redis.Nil` (miss) với lỗi thật. (2) Luôn đặt TTL. (3) Cache là best-effort — lỗi cache không được làm hỏng request.

### Lời giải BT2 — write-through update

**Cách tiếp cận.** Ghi DB trước (đảm bảo source of truth đúng), rồi ghi cache cùng giá trị mới. Nếu ghi DB lỗi thì không đụng cache. Nếu ghi cache lỗi, tệ nhất là một lần miss sau đó (chấp nhận được).

```go
func updateUser(ctx context.Context, rdb *redis.Client, db *DB, u *User) error {
    // 1. source of truth trước
    if err := db.UpdateUser(ctx, u); err != nil {
        return err
    }
    // 2. ghi cache giá trị mới (write-through) -> đọc-sau-ghi sẽ HIT đúng
    key := fmt.Sprintf("user:%d", u.ID)
    if b, err := json.Marshal(u); err == nil {
        rdb.Set(ctx, key, b, 10*time.Minute)
    }
    return nil
}
```

**So với cache-aside-invalidate.** Cache-aside chuẩn sẽ `rdb.Del(key)` (lần đọc sau nạp lại). Write-through ghi luôn giá trị mới → đọc-sau-ghi hit ngay, không tốn một lần miss. Đánh đổi: tốn write nếu giá trị đó hiếm khi được đọc lại.

### Lời giải BT3 — chống stampede với `singleflight`

**Cách tiếp cận.** Bọc thao tác "đọc DB rồi điền cache" trong `singleflight.Group.Do(key, ...)`. Nhiều goroutine cùng key → chỉ 1 thực thi hàm, phần còn lại chờ và share kết quả.

```go
var sf singleflight.Group

func getUserAntiStampede(ctx context.Context, rdb *redis.Client, db *DB, id int) (*User, error) {
    key := fmt.Sprintf("user:%d", id)

    if data, err := rdb.Get(ctx, key).Bytes(); err == nil {
        var u User
        json.Unmarshal(data, &u)
        return &u, nil // HIT — không vào singleflight
    }

    // MISS -> chỉ MỘT goroutine cho mỗi key đi DB
    v, err, _ := sf.Do(key, func() (any, error) {
        // double-check: có thể một goroutine khác đã điền cache trong lúc ta chờ lock
        if data, e := rdb.Get(ctx, key).Bytes(); e == nil {
            var u User
            json.Unmarshal(data, &u)
            return &u, nil
        }
        u, e := db.GetUser(ctx, id) // chỉ chạy 1 lần
        if e != nil {
            return nil, e
        }
        if b, me := json.Marshal(u); me == nil {
            rdb.Set(ctx, key, b, 10*time.Minute)
        }
        return u, nil
    })
    if err != nil {
        return nil, err
    }
    return v.(*User), nil
}
```

**Kết quả.** 1000 goroutine cùng miss `user:42` → đúng **1** query DB. `singleflight` đảm bảo duy nhất 1 lần gọi hàm cho mỗi key đang in-flight; các caller khác nhận lại cùng `(v, err)`. Trên nhiều process, thay `singleflight` bằng Redis `SET NX` lock toàn cục (BT5).

### Lời giải BT4 — leaderboard top-10 với Sorted Set

**Cách tiếp cận.** `ZADD` cập nhật điểm (set giá trị mới, không cộng dồn). Lấy top dùng `ZREVRANGE 0 9 WITHSCORES` (cao→thấp). Hạng dùng `ZREVRANK`.

```go
func setScore(ctx context.Context, rdb *redis.Client, player string, score float64) error {
    return rdb.ZAdd(ctx, "leaderboard", redis.Z{Score: score, Member: player}).Err()
}

func addScore(ctx context.Context, rdb *redis.Client, player string, delta float64) error {
    return rdb.ZIncrBy(ctx, "leaderboard", delta, player).Err() // cộng dồn
}

func top10(ctx context.Context, rdb *redis.Client) ([]redis.Z, error) {
    return rdb.ZRevRangeWithScores(ctx, "leaderboard", 0, 9).Result()
}

func rankOf(ctx context.Context, rdb *redis.Client, player string) (int64, error) {
    r, err := rdb.ZRevRank(ctx, "leaderboard", player).Result()
    if err != nil {
        return 0, err
    }
    return r + 1, nil // ZRevRank đếm từ 0 -> +1 thành hạng 1-based
}
```

**Vì sao Sorted Set?** Mọi thao tác đều `O(log N)`: cập nhật điểm, lấy top K, tìm hạng. Tự sắp xếp, không cần `ORDER BY` quét cả bảng. Đây là use case kinh điển.

### Lời giải BT5 — distributed lock chống double-process

**Cách tiếp cận.** Giành lock bằng `SET key token NX EX 10`. Token là chuỗi ngẫu nhiên duy nhất của owner. Mở lock bằng Lua so token trước khi `DEL` (atomic) để không lỡ xóa lock của người khác (trường hợp lock của ta đã hết hạn và người khác đã giành).

```go
var unlock = redis.NewScript(`
if redis.call("GET", KEYS[1]) == ARGV[1] then
    return redis.call("DEL", KEYS[1])
else
    return 0
end`)

func processJobOnce(ctx context.Context, rdb *redis.Client, jobID string, work func()) (bool, error) {
    key := "lock:job:" + jobID
    token := uuid.NewString()

    ok, err := rdb.SetNX(ctx, key, token, 10*time.Second).Result()
    if err != nil {
        return false, err
    }
    if !ok {
        return false, nil // người khác đang xử lý -> bỏ qua (idempotent)
    }
    defer unlock.Run(ctx, rdb, []string{key}, token)

    work() // chỉ owner chạy
    return true, nil
}
```

**Điểm mấu chốt.** (1) `NX` đảm bảo chỉ 1 owner. (2) `EX 10` tránh deadlock khi owner crash. (3) Token + Lua mở an toàn. (4) Vì lock có thể hết hạn sớm dưới GC pause, thiết kế `work()` **idempotent** để chạy 2 lần vẫn đúng — đừng phụ thuộc lock cho correctness tuyệt đối.

### Lời giải BT6 — chẩn đoán hit rate 30%

**Cách tiếp cận.** Hit rate thấp nghĩa là cache hiếm khi phục vụ được. Lần lượt soi từng nguyên nhân khả dĩ:

| Nguyên nhân | Dấu hiệu | Cách sửa |
|-------------|----------|----------|
| **TTL quá ngắn** | Key hết hạn trước khi được đọc lại | Tăng TTL; thêm jitter |
| **Key không nhất quán** (thiếu chuẩn hóa: `User:42` vs `user:42`, query param thừa) | Cùng dữ liệu nhưng nhiều key khác nhau → luôn miss | Chuẩn hóa key (lowercase, sort param, bỏ field không liên quan) |
| **Cache bị evict sớm** (`maxmemory` nhỏ, LRU đuổi liên tục) | `evicted_keys` cao trong `INFO stats` | Tăng RAM; cache ít object hơn / object nhỏ hơn |
| **Ghi xóa cache quá tay** (mỗi write `DEL` nhiều key, hoặc flush cả namespace) | Hit tụt mỗi lần có write | Invalidate đúng key cần, đừng over-invalidate |
| **Dữ liệu vốn ít lặp lại** (mỗi request một key duy nhất) | Bản chất truy cập không có locality | Cache không hợp; cân nhắc bỏ hoặc cache ở mức khác |
| **Cold start / vừa deploy** | Hit thấp ngay sau restart rồi hồi phục | Warm-up cache lúc khởi động cho key nóng đã biết |
| **Cache write thất bại lặng lẽ** | `SET` lỗi nhưng code nuốt lỗi | Log lỗi SET; kiểm tra kết nối / quyền ghi |

**Quy trình chẩn đoán cụ thể:**
1. Xem `INFO stats`: `keyspace_hits` / `keyspace_misses` → xác nhận hit rate. `evicted_keys`, `expired_keys` cao bất thường?
2. Lấy mẫu các key thực tế (`MONITOR` trong vài giây, hoặc log key ở app) → có bị phân mảnh do thiếu chuẩn hóa không?
3. Kiểm tra TTL trung bình vs khoảng cách giữa hai lần đọc cùng key.
4. Đối chiếu thời điểm hit tụt với deploy / spike write.

**Ví dụ kết luận thường gặp:** key gắn kèm `requestID` hoặc timestamp nên **mỗi request một key mới** → 0% reuse → fix bằng cách bỏ phần biến thiên khỏi key. Hoặc TTL = 5s trong khi cùng user chỉ ghé lại sau ~30s → tăng TTL lên vài phút.

---

## 17. Code & Minh họa

- **[solutions.go](./solutions.go)** — cache in-memory mô phỏng Redis (có TTL), cài cache-aside, write-through, chống stampede bằng `singleflight`, leaderboard sorted-set, và lock đơn giản. Comment tiếng Việt. Chạy: `go run solutions.go`. Mỗi hàm có comment tham chiếu lệnh `go-redis` thật.
- **[visualization.html](./visualization.html)** — 3 module tương tác: (1) **cache-aside flow** animate hit nhanh vs miss (DB + populate); (2) **cache stampede** 1000 request cùng miss, so sánh có / không singleflight; (3) **Redis data structure picker** — chọn use case → gợi ý structure phù hợp.

---

## 18. Bài tiếp theo

➡ **[Lesson 59 — NoSQL & MongoDB](../lesson-59-nosql-mongodb/)** — document model, embed vs reference, khi nào NoSQL phù hợp, CAP trade-off.

Tham khảo:
- Redis docs — data types, eviction, persistence.
- `github.com/redis/go-redis` — Go client chính thức.
- `golang.org/x/sync/singleflight` — chống stampede in-process.
