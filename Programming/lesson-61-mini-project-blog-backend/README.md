# Lesson 61 — Mini-project: Blog Backend (tổng kết Tier 5)

> **Đây là LESSON CUỐI của Tier 5 (Database & Storage).** Mục tiêu: gom toàn bộ
> kiến thức tầng lưu trữ đã học — quan hệ (Postgres), giao dịch (transaction),
> migration, cache (Redis), full-text search — vào MỘT project chạy được: một
> REST API backend cho blog.

## Mục tiêu học tập (learning objectives)

Sau bài này bạn sẽ:

1. Lắp ráp một backend hoàn chỉnh với **storage layer nhiều tầng**: relational
   storage + cache + search index + migration, mỗi tầng tách qua **interface**.
2. Hiểu vì sao thiết kế **interface-based** cho phép **swap** in-memory ↔
   Postgres/Redis/Elasticsearch mà không sửa logic nghiệp vụ.
3. Triển khai **cache-aside** (L58) đúng cách: đọc cache → miss → storage →
   populate; và **invalidate** cache khi dữ liệu đổi.
4. Triển khai **full-text search** bằng **inverted index** + xếp hạng **TF-IDF**
   (L60).
5. Dùng **transaction** (L56) để giữ tính **atomic** khi một thao tác chạm nhiều
   bảng (tạo comment + tăng comment_count).
6. Chạy **migration** theo version (L57) lúc khởi động.

## Kiến thức tiền đề (prerequisites)

| Lesson | Khái niệm dùng lại trong project |
|--------|----------------------------------|
| [L54 — SQL & database/sql](../lesson-54-sql-database-sql/) | Mẫu CRUD, `ErrNoRows`/`ErrNotFound`, query → row → struct |
| [L55 — ORM vs raw](../lesson-55-orm-vs-raw/) | Repository pattern, tách persistence khỏi domain |
| [L56 — Transactions & Isolation](../lesson-56-transactions-isolation/) | `BEGIN`/`COMMIT`/`ROLLBACK`, atomic multi-table write |
| L57 — Migrations | Schema version tracker, migration idempotent |
| [L58 — Redis caching](../lesson-58-redis-caching/) | Cache-aside, TTL, cache invalidation |
| L60 — Search & Elasticsearch | Inverted index, tokenize, TF-IDF ranking |

> **Lưu ý môi trường.** Sandbox này **không có** Postgres/Redis/Elasticsearch
> server. Vì vậy mỗi tầng được cài đặt **IN-MEMORY**. NHƯNG — và đây là điểm cốt
> lõi của bài — **kiến trúc giống production**: mọi tầng nấp sau một interface,
> nên đổi sang DB thật chỉ là viết một implementation khác rồi inject vào, **không
> sửa một dòng nào** ở tầng service/handler. Mục 8 (Mở rộng) chỉ rõ cách swap.

---

## 1. Project goal & features

### 1.1 Trực giác — đây là cái gì?

> 💡 **Hình dung.** Hãy tưởng tượng bạn vận hành một blog có hàng nghìn bài viết
> và lượng đọc lớn. Một request "xem bài viết #42" không thể mỗi lần đều xuống ổ
> cứng database — quá chậm và quá tải. Bạn cần một "kệ sách phía trước quầy"
> (cache) giữ sẵn các bài hay đọc. Khi ai đó tìm "redis cache", bạn không thể
> đọc từng bài rồi so khớp — bạn cần một "mục lục ngược" (inverted index) ánh xạ
> *từ khoá → danh sách bài chứa nó*. Và khi ai đó bình luận, bạn phải tăng đếm
> comment **cùng lúc** với việc lưu comment, không được nửa vời (transaction).
>
> Project này lắp đủ 4 mảnh đó vào một backend chạy được.

### 1.2 Features

- **CRUD bài viết (post)**: tạo, đọc, sửa, xoá.
- **List có phân trang** (`page`, `per_page`) + **lọc theo tag**.
- **Get một bài viết qua cache-aside** (đọc nhanh từ cache, miss thì xuống storage).
- **Full-text search** trên tiêu đề + nội dung, **xếp hạng theo độ liên quan**
  (TF-IDF).
- **Comment** với transaction (tạo comment + tăng `comment_count` atomic).
- **Faceted count**: đếm số bài theo từng tag.
- **Migration**: nâng schema theo version lúc khởi động.

### 1.3 Tại sao là blog?

Blog là domain "kinh điển" cho việc dạy storage vì nó đụng tới **đủ** các vấn đề:
quan hệ 1-nhiều (post → comments), đọc nhiều hơn ghi (read-heavy → cần cache),
tìm kiếm văn bản (→ cần search), và thay đổi schema theo thời gian (→ migration).

---

## 2. Endpoints

| Method & path | Mô tả | Tầng storage liên quan |
|---------------|-------|------------------------|
| `POST /posts` | Tạo bài viết | storage (write) + search (index) |
| `GET /posts` | List + phân trang + `?tag=` | storage (read) |
| `GET /posts/search?q=...` | Full-text search xếp hạng | search (inverted index) + storage |
| `GET /posts/{id}` | Get 1 bài (cache-aside) | cache → storage |
| `PUT /posts/{id}` | Sửa bài | storage + search re-index + cache invalidate |
| `DELETE /posts/{id}` | Xoá bài | storage + search + cache |
| `POST /posts/{id}/comments` | Thêm comment (transaction) | storage (tx) + cache invalidate |
| `POST /posts/{id}/view` | Tăng lượt xem | storage + cache invalidate |
| `GET /facets` | Đếm số bài theo tag | storage |

> ❓ **Câu hỏi tự nhiên.**
> - *"Vì sao `GET /posts/{id}` qua cache mà `PUT`/`POST comment` lại không?"*
>   Vì cache chỉ giúp **đọc**. Khi **ghi**, ta phải đảm bảo cache không còn giữ
>   bản cũ → nên ta **xoá** key (invalidate), không phải đọc qua cache.
> - *"Vì sao search trả về cả `score`?"* Để client (và bạn khi học) thấy bài nào
>   liên quan hơn bài nào — đây chính là điểm "ranking" của search engine thật.

---

## 3. Architecture

```
cmd/server/main.go        ← khởi động: tạo 4 tầng, chạy migration, wire service, nghe HTTP
internal/
  model/                  ← entity dùng chung (Post, Comment, DTO) — package "lá", không phụ thuộc ai
  post/                   ← domain bài viết
    model.go              ← type alias trỏ về model (post.Post = model.Post)
    service.go            ← LOGIC nghiệp vụ: cache-aside, index, transaction, invalidation
    handler.go            ← lớp HTTP: request → service → JSON
  storage/                ← Repository interface + MemoryRepository (mô phỏng Postgres)
    memory.go             ← CRUD + List/pagination + TagFacets + WithTx (transaction)
  cache/                  ← Cache interface + MemoryCache (mô phỏng Redis, có TTL)
    memory.go             ← Get/Set/Delete + lazy expiration + Stats(hit/miss)
  search/                 ← Index interface + InvertedIndex (mô phỏng Elasticsearch)
    index.go              ← tokenize + posting list + TF-IDF Search
  migration/              ← Migrator (schema version tracker)
    migrate.go            ← Register + Up (chạy migration tăng dần, idempotent)
```

### 3.1 Sơ đồ phụ thuộc (dependency direction)

```
            handler ──► service ──► (interfaces)
                                      │
              ┌───────────────┬───────┴────────┬──────────────┐
              ▼               ▼                ▼              ▼
      storage.Repository  cache.Cache   search.Index   migration.Migrator
              │               │                │
        MemoryRepository  MemoryCache    InvertedIndex
              └───────────────┴────────────────┘
                          │
                  internal/model (entity)
```

> 💡 **Trực giác về hướng phụ thuộc.** Mũi tên luôn chỉ từ "cụ thể" về "trừu
> tượng": `service` phụ thuộc *interface* chứ không phụ thuộc *MemoryRepository*.
> Đây là **Dependency Inversion** — service không quan tâm bên dưới là memory hay
> Postgres. Đổi backend = đổi cái được inject, service đứng yên.

> ⚠ **Lỗi thường gặp — import cycle.** Nếu bạn đặt struct `Post` trong package
> `post`, thì `storage` (cần biết `Post` để lưu) phải `import "post"`. Nhưng
> `post` lại `import "storage"` (service gọi repo) → **vòng lặp import**, Go từ
> chối biên dịch. Cách sửa chuẩn (đã dùng trong project): tách entity ra package
> **lá** `internal/model` mà ai cũng import được, không import ngược lại ai. Trong
> `post/model.go` ta khai báo `type Post = model.Post` (type **alias**) để code
> vẫn viết tự nhiên `post.Post`.

### 3.2 Vì sao chia nhỏ ra nhiều package mà không gộp một file?

> 💡 **Hình dung.** Một backend giống một nhà bếp nhà hàng. Nếu nhét tất cả —
> nhận order, nấu, rửa bát, kế toán — vào một người, người đó vừa quá tải vừa
> không thay thế được. Tách vai trò ra: bồi bàn (handler) chỉ nhận/trả; đầu bếp
> (service) chỉ lo logic; kho (storage), tủ lạnh nhanh (cache), mục lục (search)
> mỗi cái một việc. Thay đầu bếp không phải xây lại kho.

Bốn lý do cụ thể:

1. **Thay backend không sửa logic.** `service` chỉ thấy `storage.Repository`. Đổi
   memory → Postgres = thêm một file impl, không đụng `service.go`.
2. **Test cô lập.** Test service có thể inject memory impl (nhanh, không cần DB)
   trong khi production dùng Postgres. Đây chính là cách `service_test.go` chạy.
3. **Ranh giới rõ ràng.** Khi đọc code, bạn biết ngay logic cache-aside nằm ở
   `service`, không lẫn vào handler hay storage.
4. **Chống import cycle** (mục 3.1) — tự nhiên có khi package có hướng phụ thuộc rõ.

### 3.3 Bảng đối chiếu: in-memory ↔ production thật

| Khái niệm | Bản memory trong project | Production thật |
|-----------|--------------------------|-----------------|
| Lưu trữ | `map[int64]*Post` + `RWMutex` | Postgres + B-tree index |
| "Một dòng query" | `clonePost(p)` trả bản sao | Postgres trả row mới mỗi `Scan` |
| `ErrNotFound` | sentinel error | `sql.ErrNoRows` |
| Transaction | snapshot + lock toàn cục | MVCC + WAL, lock theo hàng |
| Cache | `map[string]entry` + lazy expiry | Redis + eviction policy (LRU/LFU) |
| TTL | so `time.Now()` lúc Get | Redis tự xoá nền + passive expiry |
| Search | `map[term][]posting`, TF-IDF | Elasticsearch, analyzer, BM25 |
| Migration | version trong RAM | bảng `schema_migrations` + DDL thật |

> ❓ **"Vậy học bản memory có phí không?"** Không. *Cơ chế* (cache-aside, TF-IDF,
> rollback, version migration) giống hệt. Cái khác chỉ là *cách hiện thực hoá hạ
> tầng* — và đó đúng là thứ interface giấu đi để bạn thay sau.

---

## 4. Step-by-step build (10 bước)

Dưới đây là trình tự dựng project từ con số 0. Mỗi bước tương ứng một file.

### Bước 1 — `internal/model`: định nghĩa entity dùng chung

Đặt `Post`, `Comment` và các DTO (`CreatePostInput`, `ListParams`, `PageResult`,
`SearchHit`) vào package lá. Lý do tách ra: tránh import cycle (mục 3.1).

```go
type Post struct {
    ID    int64    `json:"id"`
    Title string   `json:"title"`
    Body  string   `json:"body"`
    Tags  []string `json:"tags"`
    Views int64    `json:"views"`      // thêm sau qua migration v3 (BT5)
    CreatedAt, UpdatedAt time.Time
}
```

### Bước 2 — `storage`: interface `Repository` + impl in-memory

Định nghĩa **hợp đồng** trước, impl sau:

```go
type Repository interface {
    CreatePost(ctx, *model.Post) (*model.Post, error)
    GetPost(ctx, id int64) (*model.Post, error)
    UpdatePost(ctx, *model.Post) (*model.Post, error)
    DeletePost(ctx, id int64) error
    ListPosts(ctx, params model.ListParams) ([]*model.Post, int, error)
    TagFacets(ctx) map[string]int
    WithTx(ctx, fn func(tx Tx) error) error   // transaction
}
```

`MemoryRepository` dùng `map[int64]*Post` + `sync.RWMutex`. **Quan trọng**: mọi
hàm trả về `clonePost(p)` (bản sao sâu), không trả con trỏ tới dữ liệu trong
store — giống Postgres trả về *dòng mới* mỗi query, tránh caller sửa lén dữ liệu.

### Bước 3 — `cache`: interface `Cache` + impl in-memory có TTL

```go
type Cache interface {
    Get(key string) ([]byte, bool)
    Set(key string, value []byte, ttl time.Duration)
    Delete(key string)
    Stats() (hits, misses int64)
}
```

Value là `[]byte` (giống Redis lưu bytes); service tự encode JSON. TTL dùng
**lazy expiration**: kiểm tra hết hạn lúc `Get` (giống Redis passive expiry).

### Bước 4 — `search`: inverted index + TF-IDF

```go
type Index interface {
    AddOrUpdate(docID int64, text string)
    Remove(docID int64)
    Search(query string) []Result   // []{DocID, Score} xếp theo Score giảm
}
```

`InvertedIndex` giữ `map[term][]posting`, mỗi posting là `{docID, tf}`. Mục 6.3
walk-through cách tính điểm.

### Bước 5 — `migration`: version tracker

```go
m := migration.New()
m.Register(Migration{Version: 1, Name: "create_posts", Up: ...})
m.Register(Migration{Version: 2, Name: "create_comments", Up: ...})
m.Register(Migration{Version: 3, Name: "add_views_column", Up: ...})
m.Up()   // chạy mọi migration có Version > current, tăng dần
```

`Up()` **idempotent**: chạy lần hai không làm gì (vì `current` đã = version cao
nhất).

### Bước 6 — `post/service.go`: lắp ráp logic

Service nhận 3 dependency qua **interface** trong constructor:

```go
func NewService(repo storage.Repository, c cache.Cache, ix search.Index) *Service
```

Đây là nơi cache-aside, indexing, transaction, invalidation được nối lại (mục 6).

### Bước 7 — `post/handler.go`: lớp HTTP

Dùng router method-aware của Go 1.22 (`mux.HandleFunc("GET /posts/{id}", ...)`)
và `r.PathValue("id")`. Handler chỉ parse request → gọi service → `writeJSON`.
Mapping error → HTTP status nằm ở `writeErr` (NotFound→404, Validation→400).

### Bước 8 — `cmd/server/main.go`: khởi động

Tạo 4 tầng → chạy migration → wire service → seed dữ liệu demo → `ListenAndServe`.
Port lấy từ env `PORT` (mặc định 8080) để tiện đổi khi cổng bận.

### Bước 9 — Test

`internal/post/service_test.go` phủ: cache-aside hit/miss, TTL expiry, update
invalidate, search ranking, transaction (commit + rollback), pagination, tag
filter/facets, views. `internal/migration/migrate_test.go` phủ migration order +
idempotency.

### Bước 10 — Verify

```bash
cd solutions
go build ./...
go test ./...
```

---

## 5. Kiến thức Tier 5 dùng trong project

| Tier 5 lesson | Áp dụng ở đâu trong project |
|---------------|------------------------------|
| **L54 — SQL pattern** | `Repository` mô phỏng query → row; `ErrNotFound` ↔ `sql.ErrNoRows`; mọi method nhận `context.Context` đầu tiên (đúng style `database/sql`). |
| **L56 — Transaction** | `WithTx(ctx, fn)` mô phỏng `BEGIN/COMMIT/ROLLBACK`. `AddComment` chạy trong tx để "tạo comment + tăng count" là atomic (BT1). |
| **L57 — Migration** | `migration.Migrator` chạy v1→v3 lúc khởi động, idempotent. Cột `views` được "thêm" ở v3 (BT5). |
| **L58 — Cache-aside** | `Service.Get` đọc cache → miss → storage → populate; `Update/Delete/AddComment/IncrementViews` đều `cache.Delete` để invalidate. |
| **L60 — Search inverted index** | `search.InvertedIndex` tokenize + posting list + TF-IDF ranking. `Create/Update` index lại, `Delete` gỡ index. |

### 5.1 Một request đi qua bao nhiêu tầng?

Để thấy các lesson Tier 5 "nói chuyện" với nhau thế nào, theo dấu `GET /posts/3`
khi cache trống:

```
HTTP request
  └─ handler.get          (L43 REST design — parse path, gọi service)
       └─ service.Get      (L58 cache-aside — điều phối)
            ├─ cache.Get   (L58 Redis — MISS)
            ├─ repo.GetPost (L54 SQL — đọc storage)
            └─ cache.Set   (L58 — populate với TTL)
  └─ handler writeJSON     (L23 JSON encoding — trả 200)
```

Một request đọc đụng **3 tầng** (handler → service → cache/storage). Một request
ghi comment đụng **thêm transaction** (L56). Đó là vì sao project này là bài tổng
kết: không khái niệm Tier 5 nào "đứng một mình", tất cả ráp lại trong một luồng.

---

## 6. Flow chính (walk-through bằng số cụ thể)

### 6.1 Create post → write storage + index search

```
POST /posts {"title":"Redis cache strategies","body":"Cache-aside ...","tags":["redis","cache"]}

service.Create:
  1. validate: title không rỗng ✓
  2. repo.CreatePost  → gán id=3, created_at, lưu vào map
  3. index.AddOrUpdate(3, "Redis cache strategies Cache-aside ...")
       → tokenize → các term {redis, cache, strategies, ...}
       → mỗi term thêm posting {docID:3, tf:...}
  4. (không invalidate cache vì id=3 chưa từng được cache)
  → trả 201 Created + post
```

> **Vì sao index NGAY lúc tạo, không index lúc search?** Vì search phải nhanh.
> Nếu mỗi lần search mới quét toàn bộ bài để khớp từ → $O(N \times \text{độ dài bài})$ mỗi
> query. Index sẵn lúc ghi → search chỉ tra map → $O(\text{số bài chứa term})$. Đây là
> đánh đổi kinh điển: trả giá lúc **ghi** (ít) để **đọc** rẻ (nhiều).

### 6.2 Get post → cache-aside (cache → miss → storage → populate)

Giả sử cache đang trống, ta `GET /posts/3` hai lần:

```
Lần 1 (CACHE MISS):
  cache.Get("post:3")        → (nil, false)   [misses=1]
  repo.GetPost(3)            → đọc storage, lấy post
  json.Marshal(post)         → raw bytes
  cache.Set("post:3", raw, 5m)   ← POPULATE cache
  → trả post

Lần 2 (CACHE HIT):
  cache.Get("post:3")        → (raw, true)    [hits=1]
  json.Unmarshal(raw)        → post
  → trả post (KHÔNG chạm storage)
```

Sau hai lần: `hits=1, misses=1`. Test `TestCacheAsideHitMiss` kiểm tra đúng con
số này.

> ❓ **Câu hỏi tự nhiên.**
> - *"TTL hết thì sao?"* Lần `Get` sau khi quá 5 phút → `cache.Get` thấy hết hạn
>   → xoá key, trả miss → đọc storage lại → populate lại. Test `TestCacheTTLExpiry`
>   dùng đồng hồ giả lập (không sleep) để kiểm tra điều này.
> - *"Update rồi mà cache còn bản cũ thì sao?"* Đó chính là BT2. Service `Update`
>   gọi `cache.Delete("post:id")` ngay sau khi ghi storage → lần `Get` kế tiếp
>   miss → nạp bản mới. Nếu **quên** dòng `Delete` này, client sẽ đọc bản cũ tới
>   khi TTL hết — bug kinh điển của cache.

### 6.3 Search → inverted index + TF-IDF

Corpus seed có 4 bài (N = 4). Giả sử các posting cho term `redis`:

```
index["redis"] = [ {docID:3, tf:1} ]      ← chỉ bài 3 chứa "redis", df=1
```

Query `redis`:

```
N = 4 (tổng số bài)
term "redis": df = 1 (số bài chứa)
idf = ln(1 + N/(1+df)) = ln(1 + 4/2) = ln(3) = 1.0986
score(doc3) = tf(=1) × idf(=1.0986) = 1.0986
```

Đó đúng là `score: 1.0986122886681096` mà cURL trả về ở mục 7. Bây giờ so sánh
hai bài cùng chứa một term hiếm và một term phổ biến:

```
term "database": df = 2 (bài 2 và bài 4 đều có) → idf = ln(1 + 4/3) = ln(2.333) = 0.8473
term "redis"   : df = 1                          → idf = ln(3)        = 1.0986
```

> 💡 **Trực giác TF-IDF.** *TF* (term frequency) = "bài này nhắc từ đó bao nhiêu
> lần" — nhắc nhiều → liên quan hơn. *IDF* (inverse document frequency) = "từ này
> hiếm cỡ nào trong toàn corpus" — từ hiếm (như "redis", chỉ 1 bài) **mang nhiều
> thông tin** hơn từ phổ biến (như "database", 2 bài), nên được đánh trọng số cao
> hơn (1.0986 > 0.8473). Điểm cuối = Σ (tf × idf) trên các term của query.

> ⚠ **Toy example — cảnh báo.** Tokenizer ở đây tối giản: lowercase + cắt theo
> ký tự không-chữ-số. **Không** có stemming (search "running" sẽ KHÔNG khớp
> "run"), **không** stopword (từ "the", "là" vẫn được index), **không** xử lý
> dấu tiếng Việt tốt. Production (Elasticsearch) dùng analyzer phức tạp hơn nhiều.
> Đây là phiên bản đủ để hiểu *cơ chế*, không phải để chạy thật.

### 6.4 List → pagination

```
GET /posts?page=1&per_page=2

repo.ListPosts:
  1. thu thập tất cả post (lọc tag nếu có ?tag=)
  2. sort: created_at DESC, id DESC  (mới nhất trước)
  3. total = len(all) = 4
  4. start = (1-1)*2 = 0, end = 0+2 = 2 → trả all[0:2]
  → {items:[...2 bài...], page:1, per_page:2, total:4}
```

`page=3, per_page=2` với 4 bài: `start = 4 ≥ total` → trả `items:[]` rỗng (không
panic). Edge case này được test ở `TestListPagination`.

> 🔁 **Dừng lại tự kiểm tra.**
> 1. Với 5 bài, `per_page=2`, trang 3 có bao nhiêu item?
> 2. Vì sao `Get` qua cache nhưng `List` thì không?
>
> <details><summary>Đáp án</summary>
>
> 1. `start = (3-1)*2 = 4`, `end = min(6, 5) = 5` → `all[4:5]` = **1 item**.
> 2. Cache key dạng `post:id` cache *một* bài. List trả *tập* bài thay đổi liên
>    tục (thêm/xoá/sửa bài nào cũng làm danh sách khác đi) → cache list rất khó
>    invalidate đúng, lợi bất cập hại. Production thường chỉ cache từng entity,
>    hoặc cache list với TTL ngắn chấp nhận hơi cũ. Ở đây ta không cache list.
>
> </details>

### 6.5 Đo lợi ích cache bằng số

Giả sử đọc storage tốn 10ms (query Postgres), đọc cache tốn 0.2ms (Redis), và
một bài hot được đọc 1000 lần trong khoảng TTL 5 phút.

```
Không cache:  1000 × 10ms          = 10 000 ms = 10 giây tổng I/O DB
Có cache:     1 × 10ms  (miss đầu)  +  999 × 0.2ms (hit)
            = 10ms + 199.8ms        ≈ 210 ms
```

→ Cache cắt ~98% thời gian I/O cho bài hot, và quan trọng hơn: **gánh nặng rời
khỏi database** (999/1000 request không chạm DB). Đó là vì sao read-heavy system
gần như luôn có một tầng cache. `cache.Stats()` trong project cho bạn đếm thật số
hit/miss để quan sát tỉ lệ này.

> ⚠ **Lỗi thường gặp — cache một thứ hay đổi.** Đừng cache `List` hay `Search`
> theo cùng cách như entity. Chúng phụ thuộc *toàn tập* dữ liệu: thêm/xoá *bất kỳ*
> bài nào cũng có thể làm kết quả khác đi → key nào cần invalidate? Rất khó trả
> lời đúng. Quy tắc an toàn: chỉ cache entity đơn (`post:id`), còn list/search
> hoặc không cache, hoặc cache TTL ngắn chấp nhận hơi cũ.

> 📝 **Tóm tắt mục 6.**
> - **Create**: write storage → index search (index sẵn để search nhanh).
> - **Get**: cache-aside — cache → miss → storage → populate.
> - **Update/Delete/Comment/View**: ghi storage → (re)index → **invalidate** cache.
> - **Search**: tra inverted index → tính TF-IDF → nạp post từ storage → xếp hạng.
> - **List**: lọc tag → sort → LIMIT/OFFSET; không qua cache.
> - Cache cắt phần lớn I/O DB cho dữ liệu hot, nhưng chỉ an toàn với entity đơn.

---

## 7. cURL test examples

Khởi động server (port mặc định 8080, đổi qua `PORT`):

```bash
cd solutions
go run ./cmd/server
# hoặc đổi cổng: PORT=18099 go run ./cmd/server
```

```bash
# List (phân trang)
curl -s "localhost:8080/posts?per_page=2" | jq

# Search — trả về kèm score TF-IDF
curl -s "localhost:8080/posts/search?q=redis" | jq
# → {"hits":[{"post":{...},"score":1.0986122886681096}],"query":"redis"}

# Create
curl -s -X POST localhost:8080/posts \
  -d '{"title":"new post about go generics","body":"go generics great","tags":["go"]}' | jq

# Get (cache-aside — gọi 2 lần, lần 2 lấy từ cache)
curl -s localhost:8080/posts/1 | jq
curl -s localhost:8080/posts/1 | jq

# Update (invalidate cache — BT2)
curl -s -X PUT localhost:8080/posts/1 \
  -d '{"title":"Go concurrency updated","body":"new body","tags":["go"]}' | jq

# Comment (transaction — BT1, trả về comment_count)
curl -s -X POST localhost:8080/posts/1/comments \
  -d '{"author":"alice","body":"hay quá"}' | jq
# → {"comment":{...},"comment_count":1}

# Tăng lượt xem (BT5)
curl -s -X POST localhost:8080/posts/2/view | jq

# Lọc theo tag (BT4)
curl -s "localhost:8080/posts?tag=database" | jq

# Faceted count (BT4)
curl -s localhost:8080/facets | jq
# → {"cache":1,"concurrency":1,"database":2,"go":2,"postgres":1,"redis":1,"search":1}
```

> Nếu chưa có `jq`, bỏ `| jq` đi vẫn xem được JSON thô.

---

## 8. Mở rộng: swap memory → real backend

Đây là phần "trả lời câu hỏi mở bài": *"in-memory thì có gì giống production?"*

### 8.1 Swap storage → Postgres

Viết một struct mới thoả `storage.Repository`:

```go
type PostgresRepository struct{ db *sql.DB }

func (r *PostgresRepository) GetPost(ctx context.Context, id int64) (*model.Post, error) {
    var p model.Post
    err := r.db.QueryRowContext(ctx,
        `SELECT id,title,body,tags,views,created_at,updated_at FROM posts WHERE id=$1`, id).
        Scan(&p.ID, &p.Title, &p.Body, pq.Array(&p.Tags), &p.Views, &p.CreatedAt, &p.UpdatedAt)
    if errors.Is(err, sql.ErrNoRows) { return nil, storage.ErrNotFound }
    return &p, err
}

func (r *PostgresRepository) WithTx(ctx context.Context, fn func(tx storage.Tx) error) error {
    sqlTx, err := r.db.BeginTx(ctx, nil)
    if err != nil { return err }
    if err := fn(&pgTx{sqlTx}); err != nil {
        sqlTx.Rollback(); return err          // ROLLBACK thật
    }
    return sqlTx.Commit()                      // COMMIT thật
}
```

Rồi ở `main.go`: `repo := storage.NewPostgresRepository(db)`. **Service không
đổi.** Đó là toàn bộ lợi ích của interface.

### 8.2 Swap cache → Redis

Impl `cache.Cache` bằng `github.com/redis/go-redis/v9`:

```go
func (c *RedisCache) Get(key string) ([]byte, bool) {
    b, err := c.rdb.Get(ctx, key).Bytes()
    if err == redis.Nil { return nil, false }
    return b, err == nil
}
func (c *RedisCache) Set(key string, v []byte, ttl time.Duration) {
    c.rdb.Set(ctx, key, v, ttl)   // Redis tự xử lý TTL/eviction
}
```

### 8.3 Swap search → Elasticsearch

Impl `search.Index` gọi ES bulk API để index, `_search` với `multi_match` để
query. ES tự lo tokenize/analyzer/ranking (BM25 — bản nâng cấp của TF-IDF).

### 8.4 Đồng bộ nâng cao

- **CDC (Change Data Capture)**: thay vì service tự gọi `index.AddOrUpdate` sau
  mỗi ghi (dễ quên/lệch), dùng CDC (vd Debezium) đọc WAL của Postgres rồi đẩy
  thay đổi sang ES. Storage và search **decouple** hoàn toàn.
- **Read replica**: tách read/write — write vào primary, read từ replica để chịu
  tải đọc. Repository có thể giữ hai `*sql.DB` (writer/reader) và route theo loại
  thao tác.
- **Cache stampede**: khi một key hot hết hạn cùng lúc nhiều request cùng miss và
  cùng xuống DB. Khắc phục: single-flight (chỉ 1 request đi nạp, các request khác
  chờ) hoặc TTL jitter.

---

### 8.5 Những cái bẫy storage thường gặp (để tránh)

| Cái bẫy | Hậu quả | Cách tránh (project này làm gì) |
|---------|---------|----------------------------------|
| Quên invalidate cache sau ghi | Stale read tới khi TTL hết | Mọi đường ghi gọi `cache.Delete` |
| Trả con trỏ vào store nội bộ | Caller sửa lén dữ liệu "thật" | `clonePost` trả bản sao sâu |
| Index lúc search thay vì lúc ghi | Search chậm $O(N \times \text{len})$ mỗi query | `Create/Update` index sẵn |
| Multi-table write không tx | Comment có nhưng count sai | `AddComment` chạy trong `WithTx` |
| Migration chạy lại gây hỏng | Cộng đôi / lỗi DDL | `Up()` idempotent theo version |
| Import cycle entity ↔ storage | Không biên dịch được | Entity ở package lá `model` |

> 🔁 **Dừng lại tự kiểm tra.** Trong 6 cái bẫy trên, cái nào "tự khỏi" sau một
> khoảng thời gian nên khó tái hiện nhất khi debug?
>
> <details><summary>Đáp án</summary>
>
> "Quên invalidate cache" — vì sau khi TTL (5 phút) hết, cache miss và nạp lại
> bản đúng, nên lỗi biến mất. Lúc bạn ngồi debug thì nó đã hết hạn → "không tái
> hiện được". Đây là lý do cache bug nổi tiếng khó chịu.
>
> </details>

---

## 9. Bài tập (mở rộng project)

> Tất cả 5 bài tập dưới đây **đã được cài đặt sẵn** trong `solutions/` (để
> project chạy hoàn chỉnh). Hãy thử **tự làm lại** trước khi đọc lời giải: xoá
> phần liên quan rồi tự viết, hoặc thêm tính năng tương tự.

### BT1 — Add comment với transaction
Thêm endpoint `POST /posts/{id}/comments` sao cho việc **tạo comment** và **tăng
`comment_count`** của post là **atomic**: nếu một trong hai lỗi thì cả hai không
xảy ra (rollback).

### BT2 — Cache invalidation đúng khi update post
Đảm bảo sau `PUT /posts/{id}`, lần `GET /posts/{id}` kế tiếp trả về **bản mới**,
không phải bản cũ còn trong cache.

### BT3 — Search với relevance ranking (TF-IDF)
Khi search nhiều bài cùng khớp, sắp theo **độ liên quan**: bài nhắc từ khoá nhiều
hơn và từ khoá hiếm hơn phải xếp trên.

### BT4 — Tag filter + faceted count
Cho phép `GET /posts?tag=go` lọc theo tag, và `GET /facets` đếm số bài theo mỗi
tag (phục vụ thanh điều hướng "lọc theo chủ đề").

### BT5 — Migration thêm cột "views" + backfill
Thêm migration v3 đưa cột `views` vào schema, và endpoint `POST /posts/{id}/view`
tăng lượt xem.

---

## 10. Lời giải chi tiết

### Lời giải BT1 — Comment trong transaction

**Cách tiếp cận.** "Atomic nhiều bảng" = phải nằm trong **một** transaction. Ta
mở rộng `Repository` thêm `WithTx(ctx, fn)`: hàm `fn` nhận một `Tx` thao tác trên
**snapshot** dữ liệu; nếu `fn` trả error → bỏ snapshot (rollback), ngược lại →
áp snapshot vào store chính (commit).

**Cài đặt (memory).** `WithTx` giữ write-lock suốt giao dịch (mô phỏng
SERIALIZABLE — đơn giản hoá), chụp bản sao `posts/comments/commentCount`, chạy
`fn`:

```go
func (s *Service) AddComment(ctx, postID int64, author, body string) (*Comment, int, error) {
    if strings.TrimSpace(body) == "" {
        return nil, 0, fmt.Errorf("%w: comment body bắt buộc", ErrValidation)
    }
    var created *Comment; var count int
    err := s.repo.WithTx(ctx, func(tx storage.Tx) error {
        if _, err := tx.GetPost(postID); err != nil { return err }  // post phải tồn tại
        out, err := tx.AddComment(&Comment{PostID: postID, Author: author, Body: body})
        if err != nil { return err }                                // tx tự tăng count
        created = out; count = tx.CommentCount(postID)
        return nil
    })
    if err != nil { return nil, 0, err }   // mọi lỗi → rollback, count không đổi
    s.cache.Delete(cacheKey(postID))       // comment mới → invalidate cache post
    return created, count, nil
}
```

`tx.AddComment` vừa thêm comment vừa `commentCount[postID]++` trong **cùng**
snapshot → khi commit cả hai cùng vào, khi rollback cả hai cùng biến mất → atomic.

**Verify.** `TestAddCommentTransaction` (count 1→2), `TestAddCommentRollback`
(post 999 không tồn tại → lỗi → state không đổi).

**Độ phức tạp.** Snapshot $O(\text{số bản ghi})$ mỗi giao dịch (vì copy). Postgres thật
không copy toàn bộ — nó dùng MVCC + WAL. Đây là điểm "toy" cần biết: bản memory
trả giá copy để đơn giản, production dùng cơ chế hiệu quả hơn.

### Lời giải BT2 — Cache invalidation khi update

**Cách tiếp cận.** Cache-aside có một quy tắc bất biến: **mọi đường ghi thay đổi
một entity đều phải xoá cache key của entity đó.** Trong project, các đường ghi
là `Update`, `Delete`, `AddComment`, `IncrementViews` — tất cả đều gọi
`s.cache.Delete(cacheKey(id))`.

```go
func (s *Service) Update(ctx, id int64, in UpdatePostInput) (*Post, error) {
    cur, err := s.repo.GetPost(ctx, id)            // đọc thẳng storage (giữ Views)
    if err != nil { return nil, err }
    cur.Title, cur.Body, cur.Tags = in.Title, in.Body, in.Tags
    updated, err := s.repo.UpdatePost(ctx, cur)
    if err != nil { return nil, err }
    s.index.AddOrUpdate(updated.ID, updated.Title+" "+updated.Body)  // re-index
    s.cache.Delete(cacheKey(id))                   // ★ INVALIDATE
    return updated, nil
}
```

> ⚠ Nếu **quên** dòng `Delete`: client gọi `Get` sẽ nhận bản cũ từ cache cho tới
> khi TTL (5 phút) hết — "stale read". Đây là một trong những bug khó debug nhất
> vì nó "tự khỏi" sau TTL nên khó tái hiện.

**Vì sao xoá (delete) chứ không ghi đè (write-through)?** Xoá đơn giản và an
toàn: lần đọc sau tự nạp bản mới nhất từ storage. Write-through (ghi cả cache lẫn
DB cùng lúc) phức tạp hơn và dễ lệch nếu một bên lỗi. Với read-heavy blog, "xoá
rồi để miss nạp lại" là chuẩn.

**Verify.** `TestUpdateInvalidatesCache`: tạo post → Get (nạp cache) → Update →
Get phải trả title mới.

### Lời giải BT3 — TF-IDF ranking

**Cách tiếp cận.** Xem mục 6.3 cho trực giác. Công thức:

```
idf(term) = ln(1 + N / (1 + df))      N = tổng số doc, df = số doc chứa term
score(doc) = Σ_{term ∈ query}  tf(term, doc) × idf(term)
```

**Cài đặt** (`search/index.go`): với mỗi term **khác nhau** trong query (khử
trùng để không cộng idf hai lần), tra posting list, cộng `tf × idf` vào điểm của
mỗi doc, rồi sort giảm dần (tie-break theo docID để ổn định).

```go
idf := math.Log(1 + n/(1+df))
for _, p := range plist { scores[p.docID] += float64(p.tf) * idf }
```

**Walk-through số** (4 doc, query "redis"): `df=1 → idf=ln(3)=1.0986`,
`score=1×1.0986=1.0986`. Nếu một bài nhắc "redis" 2 lần thì `score=2×1.0986=
2.1972` → xếp trên bài nhắc 1 lần. Đây đúng là điều `TestSearchRanking` kiểm tra.

**Edge case.** Query rỗng → trả `nil`. Term không có trong corpus → bỏ qua (không
đóng góp điểm). Cả hai test ở `TestSearchEmptyAndMiss`.

**Độ phức tạp.** Search = $O(\Sigma \text{ độ dài posting list của các term trong query})$ — chỉ
chạm các doc thực sự chứa term, không quét toàn corpus. Đó là sức mạnh của
inverted index.

### Lời giải BT4 — Tag filter + faceted count

**Cách tiếp cận.** Lọc tag = `WHERE $tag = ANY(tags)` trong Postgres. Memory impl
duyệt post, giữ lại post có chứa tag:

```go
for _, p := range r.posts {
    if params.Tag != "" && !hasTag(p, params.Tag) { continue }
    all = append(all, clonePost(p))
}
```

Faceted count = `GROUP BY tag` — đếm số post theo mỗi tag:

```go
func (r *MemoryRepository) TagFacets(ctx) map[string]int {
    facets := map[string]int{}
    for _, p := range r.posts { for _, t := range p.Tags { facets[t]++ } }
    return facets
}
```

**Verify.** `TestTagFilterAndFacets`: 3 post (go,db / go / db) → lọc `go` ra 2,
facet `{go:2, db:2}`.

**Lưu ý production.** Lọc/facet bằng cách duyệt toàn bảng là $O(N)$ — chấp nhận với
blog nhỏ. Postgres thật dùng GIN index trên cột mảng `tags` để lọc nhanh; facet
quy mô lớn thường tính sẵn (materialized) hoặc để Elasticsearch aggregation lo.

### Lời giải BT5 — Migration thêm cột "views" + backfill

**Cách tiếp cận.** Trong project, cột `views` được "thêm" qua migration v3 (đăng
ký ở `main.go`). Với memory store, cột đã có sẵn trong struct `Post` (mặc định 0
= backfill ngầm). Với Postgres thật, migration v3 sẽ là:

```sql
ALTER TABLE posts ADD COLUMN views BIGINT NOT NULL DEFAULT 0;  -- backfill = DEFAULT 0
```

Endpoint tăng view:

```go
func (s *Service) IncrementViews(ctx, id int64) (*Post, error) {
    cur, err := s.repo.GetPost(ctx, id); if err != nil { return nil, err }
    cur.Views++
    updated, err := s.repo.UpdatePost(ctx, cur); if err != nil { return nil, err }
    s.cache.Delete(cacheKey(id))   // views đổi → invalidate
    return updated, nil
}
```

**Migration idempotent.** `Migrator.Up()` chỉ chạy migration có `Version >
current`. Khởi động lần hai → `current=3` đã = max → không chạy lại. Test
`TestMigratorUp` kiểm tra cả thứ tự (1→2→3) lẫn idempotency (chạy lần hai không
làm gì).

> 🔁 **Dừng lại tự kiểm tra.**
> 1. Vì sao `IncrementViews` đọc thẳng storage chứ không qua cache?
> 2. Migration v3 chạy hai lần có làm `views` bị cộng đôi không?
>
> <details><summary>Đáp án</summary>
>
> 1. Vì ta cần bản gốc chính xác để `++` rồi ghi lại; đọc qua cache có thể lấy
>    bản cũ → ghi đè sai. Đường **ghi** luôn dựa trên storage, không dựa cache.
> 2. Không. `ADD COLUMN ... DEFAULT 0` chỉ chạy một lần (vì `current` đã ≥ 3 sau
>    lần đầu). Đó là toàn bộ ý nghĩa của "migration idempotent theo version".
>
> </details>

---

## 11. Code & Minh họa

- Mã nguồn project: [`solutions/`](./solutions/) — chạy `cd solutions && go build ./... && go test ./...`.
- Khởi động server: `cd solutions && go run ./cmd/server` (đổi cổng: `PORT=18099 go run ./cmd/server`).
- Minh họa tương tác: [`visualization.html`](./visualization.html) — 3 module:
  kiến trúc clickable, request flow (create + cache-aside), search demo có ranking.

---

## Kết thúc Tier 5

Bạn vừa hoàn thành **Tier 5 — Database & Storage**. Project này gom toàn bộ:
relational storage + transaction (L54, L56), migration (L57), cache-aside (L58),
full-text search (L60) — sau một interface sạch sẽ swap được sang Postgres /
Redis / Elasticsearch thật.

**Tiếp theo:** [Tier 6 — Distributed Systems →](../tier-6-distributed/index.html)
— khi một server không còn đủ: nhiều node, nhất quán, message queue, consensus.
