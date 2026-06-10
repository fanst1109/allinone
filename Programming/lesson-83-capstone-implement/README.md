# Lesson 83 — Capstone (2/3): Implement Phase — URL Shortener có Analytics

> Đây là **phần code chính** của capstone 3 bài. Bài này biến bản thiết kế ở Lesson 82 thành một **service Go chạy được, có test** — đường rút gọn, đường redirect (cache-first + click bất đồng bộ), và đường thống kê.

## Mục tiêu học tập

Học xong bài này, bạn sẽ:

- Dựng một service backend hoàn chỉnh theo **clean architecture** (domain → usecase → adapter), nơi mọi dependency trỏ vào trong.
- Hiện thực **cache-aside** cho đường redirect (Redis-style) và **async click pipeline** (queue + worker) để hot path không bị I/O analytics làm chậm.
- Viết **driven port** (Repository, Cache, ClickQueue, StatsStore) bằng in-memory rồi thấy rõ vì sao có thể swap sang Postgres/Redis/Kafka mà không sửa usecase.
- Sinh short code bằng **base62** (counter vs random), so sánh trade-off.
- Bọc service bằng **middleware** (request ID, structured log, recover, rate limit) và trả lỗi theo **RFC 7807**.
- Viết **unit test với mock** cho usecase và **integration test** end-to-end (httptest: shorten → redirect → stats), xác minh click async **eventually counted**.

## Kiến thức tiền đề

Bài này gom rất nhiều thứ đã học. Nếu chỗ nào quên, mở lại:

- [Lesson 79 — Clean Architecture](../lesson-79-clean-architecture-go/) — cấu trúc domain/usecase/adapter, dependency inversion. **Bắt buộc đọc trước.**
- [Lesson 82 — Capstone Design](../lesson-82-capstone-design/) — bản thiết kế ta đang hiện thực.
- [Lesson 43 — REST API Design](../lesson-43-rest-api-design/) — endpoint, status code.
- [Lesson 58 — Redis Caching](../lesson-58-redis-caching/) — cache-aside pattern.
- [Lesson 65 — Event-Driven Architecture](../lesson-65-event-driven-architecture/) — emit event, consumer.
- [Lesson 52 — Rate Limiting](../lesson-52-rate-limiting-circuit-breaker/) — token bucket.
- [Lesson 40 — Error Handling Deep](../lesson-40-error-handling-deep/) — RFC 7807 problem+json.
- [Lesson 38 — Mocking](../lesson-38-mocking-test-doubles/) — test double cho usecase.
- [Lesson 51 — Graceful Shutdown](../lesson-51-graceful-shutdown/) — tắt sạch khi nhận signal.
- [Lesson 72 — Structured Logging](../lesson-72-structured-logging/) — slog JSON.

Code lời giải đầy đủ: [solutions/](./solutions/) — chạy `cd solutions && go build ./... && go test ./...`.
Minh họa tương tác: [visualization.html](./visualization.html).

---

## 1. Recap design → giờ implement

Ở [Lesson 82](../lesson-82-capstone-design/) ta đã chốt thiết kế. Tóm tắt SPEC để bài này tự đứng được:

**API (3 endpoint):**

| Method | Path | Mô tả |
|--------|------|-------|
| `POST` | `/api/shorten` | body `{"url":"..."}` → `{"code","short_url"}` |
| `GET`  | `/{code}` | 302 redirect tới URL gốc, **emit click event ASYNC** |
| `GET`  | `/api/stats/{code}` | `{"code","url","total_clicks","clicks_by_day","top_referrers"}` |

**Storage (thiết kế production):** Postgres làm nguồn sự thật (bảng `urls`), Redis làm cache đọc nhanh. **NHƯNG môi trường học không có DB server**, nên ta hiện thực **in-memory** cho từng interface (Repository, Cache, Queue, StatsStore). Điểm mấu chốt: **kiến trúc vẫn production-ready** — mỗi adapter in-memory thỏa đúng một port (interface) do usecase định nghĩa, nên swap sang Postgres/Redis thật chỉ là viết struct mới và sửa **composition root**, không đụng usecase/domain.

**Queue:** click event đi qua một Go channel có buffer; một worker goroutine tiêu thụ và aggregate. Production: thay channel bằng Kafka/NATS/Redis Streams.

**Architecture:** clean architecture như [Lesson 79](../lesson-79-clean-architecture-go/) — domain ở lõi, usecase orchestrate, adapter ở biên.

**Code generation:** base62, 7 ký tự (random) hoặc counter.

> 💡 **Trực giác — vì sao tách 3 đường này khác hẳn nhau?**
>
> Hình dung một quán cà phê:
> - `POST /api/shorten` = **khách order** (ghi sổ, hiếm, chấp nhận chậm vài chục ms).
> - `GET /{code}` = **rót cà phê cho khách quen** (cực nhiều, phải nhanh — đây là *hot path*).
> - `GET /api/stats` = **chủ quán xem báo cáo cuối ngày** (thi thoảng, không cần realtime tuyệt đối).
>
> Nếu mỗi lần rót cà phê (redirect) lại dừng để ghi vào sổ thống kê (analytics), khách phải chờ → hỏng trải nghiệm. Giải pháp: rót xong **ném mẩu giấy "vừa rót 1 ly" vào hộp** (queue) rồi phục vụ khách tiếp; cuối buổi có người gom hộp lại đếm (worker). Đó chính là **async click**.

> ❓ **Câu hỏi tự nhiên của người đọc**
>
> - *"Không có Postgres/Redis thật thì học có ý nghĩa gì?"* — Có. Cái khó của backend không phải gõ lệnh SQL, mà là **phân tầng đúng** để khi đổi hạ tầng không phải viết lại logic. In-memory cho phép ta tập trung vào cấu trúc; phần kết nối DB thật chỉ là một adapter khác.
> - *"In-memory thì mất hết dữ liệu khi restart?"* — Đúng, đây là điểm yếu đã biết của bản học tập. Production dùng Postgres để bền. Ta comment rõ chỗ nào cần thay.
> - *"Vì sao chia capstone thành 3 bài (Design → Implement → Deploy)?"* — Phản ánh đúng vòng đời một dự án thật: nghĩ kỹ trước (L82), code có test (L83 — bài này), rồi đóng gói + quan sát (L84). Trộn cả ba vào một bài sẽ quá tải và che mất ranh giới giữa "quyết định thiết kế" và "chi tiết hiện thực".

### 1.1 Quy ước đặt tên & non-functional requirements

Để bài tự đứng được, chốt thêm vài quyết định đã có từ L82:

- **Code length:** mặc định 7 ký tự base62. Lý do số: 62⁷ ≈ 3.5×10¹² mã — đủ cho hàng nghìn tỷ URL, trong khi vẫn ngắn gọn để gõ/chia sẻ. (So sánh: 6 ký tự = 62⁶ ≈ 5.7×10¹⁰; 8 ký tự = 2.2×10¹⁴ — thừa.)
- **Redirect là 302 (Found), không phải 301 (Moved Permanently).** Vì sao? 301 bị trình duyệt **cache vĩnh viễn** → lần sau client đi thẳng URL gốc, **không gọi lại server ta** → mất click analytics. 302 buộc client hỏi lại server mỗi lần → đếm được click. Trade-off: 302 tốn round-trip hơn nhưng đó là cái giá để có analytics.
- **Idempotency:** `POST /api/shorten` cùng một URL hai lần sẽ tạo **hai code khác nhau** (bản đơn giản). Production có thể dedup (cùng URL → cùng code) nhưng phức tạp hơn (cần index theo URL gốc) — để dành cho phần mở rộng.

> ⚠ **Lỗi thường gặp — dùng 301 cho URL shortener có analytics:** đây là bẫy kinh điển. Bạn deploy xong, thấy redirect chạy, nhưng `total_clicks` đứng yên sau lần đầu vì trình duyệt cache 301. Luôn dùng 302 (hoặc 307) khi cần đếm click.

---

## 2. Project structure (clean architecture)

```
solutions/
├── go.mod                          ← module "urlshortener", stdlib only
├── cmd/server/main.go              ← composition root (wire + graceful shutdown)
├── internal/
│   ├── domain/                     ← TẦNG TRONG CÙNG, không import gì hạ tầng
│   │   ├── url.go                  ← entity URL + business rule (validURL, IsExpired)
│   │   └── click.go                ← entity Click + read model Stats
│   ├── usecase/                    ← application logic + ĐỊNH NGHĨA port
│   │   ├── ports.go                ← URLRepository, Cache, ClickQueue, StatsStore, Clock
│   │   ├── shorten.go              ← ShortenUsecase
│   │   ├── redirect.go             ← RedirectUsecase (cache-aside + async click)
│   │   └── stats.go                ← StatsUsecase
│   └── adapter/
│       ├── http/                   ← DRIVING adapter (nhận HTTP, gọi usecase)
│       │   ├── handler.go          ← handlers + DTO + RFC 7807
│       │   └── middleware.go       ← requestID, logger, recover, rate limit
│       ├── memory/                 ← DRIVEN adapter (in-memory impl của port)
│       │   ├── url_repo.go         ← URLRepository (map + mutex)
│       │   ├── cache.go            ← Cache (map + TTL)
│       │   └── queue.go            ← ClickQueue (Go channel)
│       └── analytics/
│           └── worker.go           ← consume queue, aggregate, đồng thời là StatsStore
└── pkg/
    ├── base62/base62.go            ← code generation
    └── observability/observability.go ← log/metrics/trace stub (full ở L84)
```

**Quy tắc phụ thuộc (dependency rule):** mũi tên import luôn trỏ **vào trong**.

```
adapter/http ──┐
adapter/memory ─┼──► usecase ──► domain
adapter/analytics┘                  ▲
cmd/server ───────────────────────────┘ (chỉ composition root biết tất cả)
```

`domain` không import bất cứ thứ gì của ta. `usecase` chỉ import `domain` và `pkg/base62`. `adapter/*` import `usecase` + `domain`. **`cmd/server` là nơi DUY NHẤT biết về implementation cụ thể** — đó là nơi quyết định "dùng in-memory hay Postgres".

> 💡 **Trực giác — vì sao usecase tự định nghĩa interface, không phải DB?**
>
> Thông thường người ta nghĩ "DB có sẵn các hàm, usecase gọi vào". Clean arch lật ngược: **usecase tuyên bố nó CẦN GÌ** (một `URLRepository` có `Save/FindByCode`), rồi tầng DB phải *chiều theo*. Giống như bạn thuê thợ: bạn ra yêu cầu (interface), thợ nào cũng được miễn làm đúng yêu cầu (implement). Đổi thợ (Postgres → MongoDB) không cần đổi yêu cầu.

> 🔁 **Dừng lại tự kiểm tra**
>
> 1. File nào được phép import `database/sql` hay `redis`?
> 2. Nếu `domain/url.go` import `usecase`, điều gì sai?
>
> <details><summary>Đáp án</summary>
>
> 1. Chỉ `adapter/memory` (hoặc `adapter/postgres` sau này) và `cmd/server`. Usecase và domain **tuyệt đối không**.
> 2. Vi phạm dependency rule — domain là tầng trong cùng, không được biết về tầng ngoài. Sẽ tạo import cycle và khiến domain phụ thuộc application logic.
> </details>

---

## 3. Step-by-step build (12 bước)

Thứ tự build theo **từ trong ra ngoài**: domain trước (không phụ thuộc ai), rồi port, rồi adapter, cuối cùng wire.

### Bước 1 — Domain entity (`internal/domain/url.go`, `click.go`)

Entity `URL` chứa `Code`, `Original`, `CreatedAt`, `ExpiresAt`. Business rule sống ở đây:

```go
func NewURL(code, original string, createdAt time.Time) (*URL, error) {
    if !validURL(original) {       // rule: chỉ http/https có host
        return nil, ErrInvalidURL
    }
    if strings.TrimSpace(code) == "" {
        return nil, ErrInvalidCode
    }
    return &URL{Code: code, Original: original, CreatedAt: createdAt}, nil
}

func (u *URL) IsExpired(now time.Time) bool {
    return u.ExpiresAt != nil && now.After(*u.ExpiresAt)
}
```

`validURL` là rule miền — **mọi đường vào** (HTTP, batch, CLI) đều bị ràng buộc cùng quy tắc này vì tất cả phải qua `NewURL`.

Bốn ví dụ cụ thể của `validURL`:

| Input | Kết quả | Vì sao |
|-------|---------|--------|
| `https://go.dev` | hợp lệ | scheme https + host go.dev |
| `http://example.com/a?b=1` | hợp lệ | scheme http + host |
| `ftp://host` | KHÔNG | scheme không phải http/https |
| `not a url` | KHÔNG | thiếu scheme và host |

`Click` là event (`Code`, `Referrer`, `IP`, `Timestamp`). `Stats` là read model (`TotalClicks`, `ClicksByDay`, `TopReferrers`).

> ⚠ **Lỗi thường gặp**
>
> Để validate URL ở tầng handler (HTTP) thay vì domain. Hậu quả: thêm một entry point mới (vd batch import) là quên validate → URL rác lọt vào DB. Rule miền phải ở **domain**, không phải adapter.

### Bước 2 — Ports (`internal/usecase/ports.go`)

Usecase định nghĩa 4 driven port + 1 Clock:

```go
type URLRepository interface {
    Save(ctx context.Context, u *domain.URL) error
    FindByCode(ctx context.Context, code string) (*domain.URL, error)
    Exists(ctx context.Context, code string) (bool, error)
    NextID(ctx context.Context) (uint64, error)
}
type Cache interface {
    GetURL(ctx context.Context, code string) (original string, ok bool)
    SetURL(ctx context.Context, code, original string, ttl time.Duration)
}
type ClickQueue interface { Enqueue(c domain.Click) }
type StatsStore interface { Snapshot(ctx context.Context, code string) (*domain.Stats, error) }
```

`Clock` trừu tượng hóa `time.Now()` để test xác định (không phụ thuộc giờ thật).

### Bước 3 — base62 (`pkg/base62/base62.go`)

Hai chiến lược sinh code, **walk-through bằng số thật**:

**Counter → Encode.** Lấy số nguyên tăng dần, encode base62.
- `Encode(125)`: `125 / 62 = 2 dư 1` → ký tự `alphabet[1]='1'`; `2 / 62 = 0 dư 2` → `alphabet[2]='2'`; ghép ngược = `"21"`. Kiểm tra: `2*62 + 1 = 125` ✓.
- `Encode(62)` = `"10"` (`1*62 + 0`). `Encode(61)` = `"z"`. `Encode(0)` = `"0"`.

**Random.** `base62.Random(7)` → 7 ký tự `[0-9A-Za-z]` từ `crypto/rand`.

Bảng so sánh trade-off:

| Tiêu chí | Counter | Random |
|----------|---------|--------|
| Trùng (collision) | không bao giờ | hiếm, phải kiểm tra |
| Lộ thứ tự | có (đoán được URL kế) | không |
| Cần counter tập trung | có (DB sequence/Redis) | không |
| Code đầu tiên | rất ngắn (`"1"`, `"2"`...) | luôn 7 ký tự |

> ❓ **Tính hash/encode có đắt không?** Không — chia lấy dư vài lần, $O(\log_{62} n)$. Với `crypto/rand` thì chi phí chính là đọc entropy, vẫn rất nhỏ so với I/O mạng của redirect.
>
> ❓ **Random 7 ký tự thì xác suất trùng bao nhiêu?** Không gian = 62⁷ ≈ 3.5×10¹². Với 1 triệu URL, xác suất một code mới trùng ≈ 10⁶/3.5×10¹² ≈ 0.00003%. Ta vẫn `Exists()` kiểm tra để chắc chắn.

### Bước 4 — URLRepository in-memory (`adapter/memory/url_repo.go`)

`map[string]*domain.URL` + `sync.RWMutex` + `atomic.Uint64` cho `NextID`. **Copy entity khi Save/Find** để caller không giữ con trỏ rồi sửa ngầm state trong store.

```go
func (r *URLRepository) Save(_ context.Context, u *domain.URL) error {
    r.mu.Lock(); defer r.mu.Unlock()
    cp := *u                  // copy: tránh aliasing
    r.byCode[u.Code] = &cp
    return nil
}
```

> ⚠ **Lỗi thường gặp:** lưu thẳng con trỏ `u` vào map. Sau đó caller sửa `u.Original` → state trong store bị đổi theo mà repo không hề biết. Luôn copy ở biên.

### Bước 5 — Cache in-memory (`adapter/memory/cache.go`)

`map[string]cacheItem` với `expiresAt`. Hỗ trợ TTL bằng **lazy eviction**: khi `GetURL` thấy entry hết hạn thì xóa và trả miss. Production: Redis `GET`/`SETEX`.

### Bước 6 — ClickQueue in-memory (`adapter/memory/queue.go`)

Go channel có buffer. `Enqueue` **non-blocking** bằng `select` + `default`:

```go
func (q *ClickQueue) Enqueue(c domain.Click) {
    select {
    case q.ch <- c:        // gửi được
    default:               // buffer đầy -> DROP, không chặn redirect
        q.dropped++
    }
}
```

> 💡 **Trực giác:** đây là "best effort analytics". Thà mất vài event thống kê còn hơn để redirect (hot path) bị chặn vì hộp đếm đầy. Trade-off có chủ đích — comment rõ trong code. Production có thể dùng backpressure khác (Kafka có disk buffer lớn).

### Bước 7 — ShortenUsecase (`usecase/shorten.go`)

```go
func (uc *ShortenUsecase) Shorten(ctx context.Context, original string) (*domain.URL, error) {
    code, err := uc.generateCode(ctx)        // counter hoặc random+collision check
    if err != nil { return nil, err }
    u, err := domain.NewURL(code, original, uc.clock.Now())  // domain validate
    if err != nil { return nil, err }
    if err := uc.repo.Save(ctx, u); err != nil { return nil, err }
    if uc.cache != nil { uc.cache.SetURL(ctx, u.Code, u.Original, 0) } // warm cache
    return u, nil
}
```

**Warm cache ngay sau Save** → lần redirect đầu tiên đã hit cache. `generateCode` với random sẽ retry tối đa 5 lần nếu trùng.

### Bước 8 — RedirectUsecase: cache-first + async click (`usecase/redirect.go`)

Đây là **trái tim của bài**. Hai đặc tính:

```go
func (uc *RedirectUsecase) Resolve(ctx context.Context, code, referrer, ip string) (string, error) {
    now := uc.clock.Now()

    // (1) CACHE-FIRST
    if uc.cache != nil {
        if original, ok := uc.cache.GetURL(ctx, code); ok {
            uc.emitClick(code, referrer, ip, now)   // emit dù hit
            return original, nil
        }
    }
    // (2) CACHE MISS -> nguồn sự thật
    u, err := uc.repo.FindByCode(ctx, code)
    if err != nil { return "", err }
    if u.IsExpired(now) { return "", domain.ErrURLExpired }
    if uc.cache != nil { uc.cache.SetURL(ctx, u.Code, u.Original, cacheTTL) } // populate
    uc.emitClick(code, referrer, ip, now)
    return u.Original, nil
}

func (uc *RedirectUsecase) emitClick(code, referrer, ip string, t time.Time) {
    if uc.queue == nil { return }
    uc.queue.Enqueue(domain.Click{Code: code, Referrer: referrer, IP: ip, Timestamp: t})
}
```

`emitClick` là **fire-and-forget**: redirect KHÔNG chờ analytics. Chi tiết mục 4 và 5.

### Bước 9 — StatsUsecase (`usecase/stats.go`)

Đọc read model từ `StatsStore` (do worker aggregate). Tách "ghi" (worker) khỏi "đọc" (stats query) — CQRS nhẹ ([Lesson 67](../lesson-67-cqrs-event-sourcing/)). Xác minh code tồn tại trước (để trả 404 đúng), gắn URL gốc vào read model.

### Bước 10 — HTTP handlers (`adapter/http/handler.go`)

Driving adapter. Định nghĩa **driving port nhỏ** (`Shortener`, `Resolver`, `Statser`) để test với mock. DTO tách khỏi domain. Route:

```go
mux.HandleFunc("POST /api/shorten", h.shorten)
mux.HandleFunc("GET /api/stats/{code}", h.stats)
mux.HandleFunc("GET /healthz", h.health)
mux.HandleFunc("GET /{code}", h.redirect)   // đăng ký SAU /api/...
```

> ⚠ **Lỗi thường gặp — route nuốt nhầm:** nếu `GET /{code}` đăng ký trước `GET /api/stats/{code}`, request `/api/stats/abc` có thể bị match nhầm thành `code="api"`... May là `net/http` ServeMux (Go 1.22+) ưu tiên pattern cụ thể hơn, nhưng vẫn nên đăng ký rõ ràng để dễ đọc.

`clientIP` lấy IP client đúng cách sau reverse proxy:

```go
func clientIP(r *http.Request) string {
    if xff := r.Header.Get("X-Forwarded-For"); xff != "" {
        if i := strings.IndexByte(xff, ','); i >= 0 {
            return strings.TrimSpace(xff[:i])   // "client, proxy1" -> "client"
        }
        return strings.TrimSpace(xff)
    }
    host := r.RemoteAddr                          // "1.2.3.4:5678"
    if i := strings.LastIndexByte(host, ':'); i >= 0 { host = host[:i] }
    return host                                   // "1.2.3.4"
}
```

> ❓ *"Vì sao không tin thẳng `RemoteAddr`?"* — Sau reverse proxy (nginx, load balancer), `RemoteAddr` là IP của *proxy*, không phải client. Proxy đặt IP thật vào header `X-Forwarded-For`. **Cảnh báo bảo mật:** client có thể giả mạo `X-Forwarded-For` nếu không có proxy tin cậy ở trước — production phải cấu hình proxy ghi đè header này, đừng tin mù.

### Bước 11 — Middleware (`adapter/http/middleware.go`)

4 middleware, bọc theo thứ tự `RequestID → Logger → Recover → RateLimit`. Chi tiết mục 7.

### Bước 12 — Wire main (`cmd/server/main.go`)

Composition root: tạo adapter in-memory → start worker goroutine → wire usecase → bọc middleware → chạy server → graceful shutdown. Chi tiết mục cuối.

> 📝 **Tóm tắt mục 3:** Build từ trong ra ngoài. Domain (rule) → ports (interface usecase cần) → adapter in-memory (impl) → usecase (orchestrate) → http (biên) → wire. Mỗi tầng chỉ biết tầng trong nó.

---

## 4. Cache-aside cho redirect (liên kết L58)

**Cache-aside** (còn gọi *lazy loading*): ứng dụng tự quản lý cache, không phải DB tự đẩy.

Luồng đọc của `Resolve`:

```
GET /{code}
   │
   ▼
[1] cache.GetURL(code) ──hit──► trả original (NHANH, ~µs)
   │ miss
   ▼
[2] repo.FindByCode(code) ──not found──► 404
   │ found
   ▼
[3] cache.SetURL(code, original, TTL)   ← POPULATE
   │
   ▼
   trả original
```

Walk-through bằng số cụ thể với code `abc1234` → `https://go.dev`:

| Lần redirect | cache | repo | Hành động | Độ trễ tương đối |
|:---:|:---:|:---:|---|:---:|
| 1 (sau shorten) | hit* | — | trả luôn (đã warm ở Shorten) | ~1µs |
| 2 | hit | — | trả luôn | ~1µs |
| ... | hit | — | trả luôn | ~1µs |
| (sau khi cache hết TTL) | miss | hit | đọc repo, populate lại | ~ms (production: round-trip DB) |

\* Ở bài này `Shorten` đã warm cache nên lần đầu cũng hit. Nếu một instance khác (không warm) nhận redirect đầu tiên thì sẽ miss → populate.

> 💡 **Trực giác:** cache giống như cuốn sổ tay để trên bàn. Tra số điện thoại hay dùng thì chép vào sổ tay (cache); lần sau khỏi vào kho hồ sơ (DB). Nếu sổ tay chưa có (miss), vào kho lấy rồi **chép vào sổ tay** (populate) cho lần sau.

> ❓ **Câu hỏi tự nhiên**
>
> - *"URL gốc bị đổi thì cache stale không?"* — URL shortener gần như **không bao giờ đổi mapping** (code → URL là bất biến). Nên cache rất an toàn, TTL có thể dài. Nếu cho phép sửa URL thì phải invalidate cache khi update.
> - *"TTL để bao lâu?"* — Ở đây 10 phút cho entry populate, và 0 (vĩnh viễn) cho entry warm lúc tạo. Production cân theo memory của Redis.
> - *"Vì sao emit click cả khi hit cache?"* — Vì click cần được đếm bất kể URL lấy từ đâu. Cache chỉ tối ưu việc *tra URL gốc*, không liên quan analytics.

> 🔁 **Tự kiểm tra:** sau lần redirect đầu tiên (cache miss), nếu DB sập, redirect lần 2 còn chạy được không?
>
> <details><summary>Đáp án</summary>Còn — vì lần 1 đã populate cache. Lần 2 hit cache, không chạm DB. Đây chính là giá trị của cache: che chắn cho nguồn sự thật khi traffic cao.</details>

### 4.1 Cache-aside vs các pattern khác

Cache-aside không phải pattern caching duy nhất. So sánh ngắn để hiểu vì sao ta chọn nó:

| Pattern | Ai ghi cache | Phù hợp |
|---------|--------------|---------|
| **Cache-aside** (ta dùng) | ứng dụng (lazy, khi miss) | đọc nhiều ghi ít, mapping bất biến (đúng URL shortener) |
| Write-through | ghi cache + DB đồng thời mỗi lần write | cần cache luôn fresh, chấp nhận write chậm |
| Write-behind | ghi cache trước, flush DB sau (async) | write cực nhiều, chấp nhận rủi ro mất dữ liệu |
| Read-through | thư viện cache tự load từ DB khi miss | muốn giấu logic load khỏi app |

URL shortener: mapping `code → URL` **gần như bất biến** (tạo một lần, đọc hàng triệu lần, hiếm khi sửa). Cache-aside là lựa chọn tự nhiên: đơn giản, lazy, không cần đồng bộ phức tạp.

### 4.2 Tính toán hiệu quả cache bằng số thật

Giả sử 100 URL "hot" chiếm 90% traffic, cache hit rate đạt 90%. DB round-trip 5ms, cache (Redis) round-trip 0.5ms. Với 10.000 redirect/s:

- Không cache: 10.000 × 5ms công việc DB = quá tải (DB chỉ chịu ~vài nghìn query/s).
- Có cache 90% hit: 9.000 req × 0.5ms (cache) + 1.000 req × 5ms (DB miss) → DB chỉ còn 1.000 query/s, **giảm 90% tải DB**. Độ trễ trung bình: `0.9×0.5 + 0.1×5 = 0.95ms` thay vì 5ms — **nhanh ~5 lần**.

Đó là lý do cache không phải "tối ưu cho vui" mà là điều kiện sống còn của hot path.

---

## 5. Async click: redirect → channel → worker (liên kết L65)

Đường redirect **emit** một `Click` event vào queue rồi trả ngay. Một **worker goroutine** tiêu thụ và aggregate ở background. Redirect **không bao giờ chờ** việc ghi thống kê.

```
       REDIRECT (hot path)                 BACKGROUND (worker)
       ┌──────────────────┐                ┌─────────────────────┐
GET ──►│ Resolve()        │                │ for c := range chan │
/code  │  tra URL (cache) │                │   apply(c):         │
       │  emitClick() ────┼──► [ channel ]─┼──►  total++         │
       │  return 302      │     (buffer)   │     byDay[d]++      │
       └──────────────────┘                │     byRef[r]++      │
         ↑ KHÔNG chờ worker                │     uniqueIPs[ip]   │
                                           └─────────────────────┘
```

**Vì sao non-blocking quan trọng?** Giả sử aggregate phải ghi vào Postgres analytics (5ms/lần). Nếu redirect chờ → mỗi redirect +5ms. Với 10k redirect/s, đó là thảm họa. Tách async → redirect chỉ tốn ~1µs để đẩy vào channel.

Code worker (`adapter/analytics/worker.go`):

```go
func (w *Worker) Run(ctx context.Context) {
    defer close(w.done)
    for {
        select {
        case <-ctx.Done():
            return
        case c, ok := <-w.events:
            if !ok { return }      // channel đóng -> drain xong, dừng
            w.apply(c)             // aggregate
        }
    }
}
```

> 💡 **Trực giác (nhắc lại từ mục 1):** redirect là người pha chế, click event là mẩu giấy ném vào hộp, worker là người cuối ca gom hộp đếm. Người pha chế không bao giờ dừng để đếm.

> ❓ **Câu hỏi tự nhiên**
>
> - *"Channel đầy thì sao?"* — `Enqueue` dùng `select`+`default` nên **drop** thay vì chặn. Có counter `dropped` để quan sát. Best-effort analytics.
> - *"Server tắt thì event trong channel mất?"* — Có nguy cơ. Graceful shutdown (mục cuối) **đóng queue và `worker.Wait()`** để drain hết event còn lại trước khi thoát. Production với Kafka thì event đã bền trên disk broker.
> - *"Worker chết thì sao?"* — In-memory: cả process chung số phận. Production: worker là service riêng, queue là Kafka → worker restart đọc tiếp từ offset cũ.

> ⚠ **Lỗi thường gặp — block trong emit:** nếu `Enqueue` dùng `q.ch <- c` (không có `default`) và worker chậm → channel đầy → redirect **bị chặn**. Mất toàn bộ lợi ích async. Phải non-blocking ở hot path.

> 🔁 **Tự kiểm tra:** trong integration test, sau khi redirect 3 lần, nếu gọi stats *ngay lập tức* mà chưa flush queue, total_clicks có chắc bằng 3 không?
>
> <details><summary>Đáp án</summary>**Không chắc** — vì worker xử lý async, có thể chưa kịp apply hết 3 event. Đây là bản chất *eventual consistency*. Test phải **flush** (đóng queue + `worker.Wait()`) để đảm bảo worker đã drain xong rồi mới assert. Đó là lý do `flush()` tồn tại trong integration test.</details>

---

## 6. Stats aggregation

Worker giữ một map `code → codeAgg`, mỗi `codeAgg` gồm:

```go
type codeAgg struct {
    total     int
    byDay     map[string]int  // "2026-05-27" -> count
    byRef     map[string]int  // "https://twitter.com" -> count
    uniqueIPs map[string]bool // tập IP (cho BT5)
}
```

`apply(click)` cập nhật cả 4 trường. `Snapshot(code)` build read model `Stats`, **sắp xếp top referrers giảm dần theo count** (tie-break theo tên cho ổn định/deterministic):

```go
sort.Slice(tops, func(i, j int) bool {
    if tops[i].Count != tops[j].Count { return tops[i].Count > tops[j].Count }
    return tops[i].Referrer < tops[j].Referrer
})
```

Walk-through với 3 click cho `abc` (2 twitter, 1 google), 2 IP unique:

| Field | Giá trị sau aggregate |
|-------|----------------------|
| `total` | 3 |
| `byDay["2026-05-27"]` | 3 |
| `byRef` | `{twitter: 2, google: 1}` |
| top_referrers (sorted) | `[{twitter, 2}, {google, 1}]` |
| unique visitors | 2 |

JSON response của `GET /api/stats/abc`:

```json
{
  "code": "abc",
  "url": "https://go.dev/doc",
  "total_clicks": 3,
  "clicks_by_day": { "2026-05-27": 3 },
  "top_referrers": [
    { "referrer": "https://twitter.com", "count": 2 },
    { "referrer": "https://google.com", "count": 1 }
  ]
}
```

> 📝 **Tóm tắt mục 4-6:** Redirect = cache-aside (đọc nhanh) + emit click async (không chặn). Worker = consumer aggregate thành read model. Stats = đọc read model (tách ghi/đọc). Eventual consistency: stats có thể trễ chút so với redirect, đổi lại redirect cực nhanh.

---

## 7. Middleware (liên kết L52, L72)

Bọc theo thứ tự (ngoài → trong): **RequestID → Logger → Recover → RateLimit → handler**.

```go
root := adapterhttp.Chain(
    handler.Routes(),
    adapterhttp.RequestID(),       // gắn X-Request-ID
    adapterhttp.Logger(log),       // log JSON mỗi request
    adapterhttp.Recover(log),      // bắt panic -> 500
    adapterhttp.RateLimit(100, 200), // 100 rps, burst 200 theo IP
)
```

`Chain(h, A, B, C)` = `A(B(C(h)))`: request đi qua A trước.

| Middleware | Vai trò | Liên kết |
|-----------|---------|----------|
| **RequestID** | gắn ID duy nhất mỗi request (header + context), để truy vết log | chuẩn bị tracing [L74](../lesson-74-tracing-opentelemetry/) |
| **Logger** | log structured JSON: method, path, status, duration, request_id | [L72](../lesson-72-structured-logging/) |
| **Recover** | `recover()` panic trong handler → trả 500 thay vì crash | — |
| **RateLimit** | token bucket theo IP | [L52](../lesson-52-rate-limiting-circuit-breaker/) |

**Token bucket** (mục `allow`): mỗi IP một bucket `capacity` token, hồi `rate` token/giây. Mỗi request trừ 1 token; hết token → 429.

Walk-through: `rate=100/s`, `capacity=200`. IP mới có bucket đầy 200. Bắn 200 request liền (burst) → tiêu hết. Request thứ 201 trong cùng giây → 429. Chờ 0.5s → hồi `0.5*100 = 50` token → bắn được 50 request nữa.

Code `allow` chi tiết (token bucket):

```go
func (rl *rateLimiter) allow(ip string) bool {
    rl.mu.Lock(); defer rl.mu.Unlock()
    now := time.Now()
    b, ok := rl.buckets[ip]
    if !ok {                                  // IP mới -> bucket đầy
        rl.buckets[ip] = &bucket{tokens: rl.capacity - 1, last: now}
        return true
    }
    elapsed := now.Sub(b.last).Seconds()
    b.tokens += elapsed * rl.rate             // hồi token theo thời gian
    if b.tokens > rl.capacity { b.tokens = rl.capacity }  // không vượt trần
    b.last = now
    if b.tokens >= 1 { b.tokens--; return true }
    return false
}
```

Bảng mô phỏng 5 request liên tiếp của một IP (`rate=2/s`, `capacity=3`):

| Request | Thời điểm (s) | Token hồi thêm | Token sau hồi | Đủ? | Token còn | Kết quả |
|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| 1 | 0.0 | — (mới) | 3 → 2 | ✓ | 2 | 200 |
| 2 | 0.1 | 0.1×2=0.2 | 2.2 | ✓ | 1.2 | 200 |
| 3 | 0.2 | 0.2 | 1.4 | ✓ | 0.4 | 200 |
| 4 | 0.3 | 0.2 | 0.6 | ✗ | 0.6 | **429** |
| 5 | 1.0 | 0.7×2=1.4 | 2.0 | ✓ | 1.0 | 200 |

> ❓ *"Token bucket khác leaky bucket / fixed window chỗ nào?"* — Token bucket cho phép **burst** (tiêu nhanh capacity token) rồi giới hạn rate trung bình. Fixed window (đếm request trong mỗi giây, reset đầu giây) bị "biên giây": 200 request cuối giây này + 200 đầu giây sau = 400 trong 1s thật. Token bucket mượt hơn vì hồi liên tục. Xem lại [L52](../lesson-52-rate-limiting-circuit-breaker/).

> ⚠ **Lỗi thường gặp:** đặt Recover *ngoài* Logger. Khi đó panic xảy ra trong handler, Logger không kịp ghi log request (vì panic phá ngang). Đặt Recover *trong* (gần handler hơn) để nó bắt panic trước, còn Logger vẫn ghi được dòng log với status 500. Trong bài này Recover nằm sau Logger trong chain → Logger bọc ngoài Recover → Logger vẫn chạy `next.ServeHTTP` xong mới log; vì Recover đã trả 500 nên log ghi đúng 500.

---

## 8. Error handling: RFC 7807 (liên kết L40)

Mọi lỗi trả về dạng `application/problem+json`:

```go
type problemDetail struct {
    Type   string `json:"type"`   // "/errors/not-found"
    Title  string `json:"title"`  // "không tìm thấy short code"
    Status int    `json:"status"` // 404
}
```

`writeDomainErr` map sentinel error của domain sang HTTP status:

| Domain error | HTTP status | type |
|--------------|:-----------:|------|
| `ErrURLNotFound` | 404 | `not-found` |
| `ErrURLExpired` | 410 Gone | `expired` |
| `ErrCodeTaken` | 409 Conflict | `code-taken` |
| `ErrInvalidURL` / `ErrInvalidCode` | 400 | `invalid-input` |
| (khác) | 500 | `internal` |

Ví dụ response cho `GET /khongtontai`:

```json
{ "type": "/errors/not-found", "title": "không tìm thấy short code", "status": 404 }
```

> 💡 **Trực giác — vì sao RFC 7807?** Thay vì mỗi service tự bịa format lỗi (`{"err":...}`, `{"message":...}`, `{"error":{"code":...}}`), RFC 7807 chuẩn hóa một hình dạng (`type/title/status/detail`). Client parse một kiểu cho mọi service. `type` là định danh máy đọc được; `title` là mô tả người đọc.

> ⚠ **Lỗi thường gặp:** việc *dịch* lỗi miền sang HTTP status là trách nhiệm của **adapter**, không phải domain. Domain chỉ biết `ErrURLNotFound`; nó không biết (và không nên biết) "404". Nếu domain return số 404, nó đã rò rỉ kiến thức HTTP vào lõi.

---

## 9. Test: unit (mock) + integration (httptest)

### Unit test usecase với mock (L38)

Mỗi usecase test với mock implement port. Ví dụ `RedirectUsecase` với `mockCache`/`mockQueue`:

```go
func TestRedirect_CacheMiss_PopulatesAndEmits(t *testing.T) {
    repo := newMockRepo(); cache := newMockCache(); queue := &mockQueue{}
    u, _ := domain.NewURL("abc1234", "https://go.dev", time.Now())
    _ = repo.Save(context.Background(), u)

    uc := NewRedirect(repo, cache, queue, fixedClock{time.Now()})
    got, _ := uc.Resolve(context.Background(), "abc1234", "https://twitter.com", "1.2.3.4")

    // assert: URL đúng, cache được populate 1 lần, click emit 1 lần
    if cache.setCalls != 1 { t.Error(...) }
    if queue.count() != 1 { t.Error(...) }
}
```

`fixedClock` cho thời gian xác định. Mock cho phép test **mọi nhánh** kể cả lỗi (`repo.saveErr`).

### Integration test end-to-end (httptest)

Wire hệ thống thật (in-memory) sau `httptest.Server`, chạy luồng **shorten → redirect × 3 → flush → stats**:

```go
ts := newTestSystem(t)              // wire đầy đủ + worker chạy
// 1. POST /api/shorten -> 201, lấy code
// 2. GET /{code} x3 với Referer twitter -> 302 + Location
// 3. ts.flush()                    // đóng queue + worker.Wait() -> drain xong
// 4. GET /api/stats/{code} -> total_clicks == 3, top_referrers[0] == twitter:3
```

> ❓ **Vì sao cần `flush()` trong integration test?** Vì click được đếm **async**. Nếu assert stats ngay sau redirect, worker có thể chưa apply xong → flaky test. `flush()` = `queue.Close()` + `worker.Wait()` đảm bảo worker đã drain hết event. Đây chính là cách xác minh "click **eventually** counted" mà không cần `sleep` (sleep là anti-pattern, flaky).

Kết quả thật khi chạy:

```
ok  urlshortener/cmd/server              0.015s
ok  urlshortener/internal/adapter/analytics  0.005s
ok  urlshortener/internal/usecase        0.006s
ok  urlshortener/pkg/base62              0.005s
```

`go test -race ./...` cũng **PASS** — không có data race dù có goroutine worker + nhiều mutex.

---

## 10. cURL examples

Chạy server: `cd solutions && go run ./cmd/server` (mặc định `:8080`).

```bash
# 1. Rút gọn
curl -s -X POST localhost:8080/api/shorten \
  -H 'Content-Type: application/json' \
  -d '{"url":"https://go.dev/doc"}'
# -> {"code":"aZ3kP9x","short_url":"http://localhost:8080/aZ3kP9x"}

# 1b. Custom alias (BT1)
curl -s -X POST localhost:8080/api/shorten \
  -H 'Content-Type: application/json' \
  -d '{"url":"https://go.dev","alias":"golang"}'
# -> {"code":"golang","short_url":"http://localhost:8080/golang"}

# 2. Redirect (xem header 302, không follow)
curl -si localhost:8080/aZ3kP9x -H 'Referer: https://twitter.com' | head -5
# -> HTTP/1.1 302 Found
#    Location: https://go.dev/doc

# 3. Stats
curl -s localhost:8080/api/stats/aZ3kP9x
# -> {"code":"aZ3kP9x","url":"https://go.dev/doc","total_clicks":1,
#     "clicks_by_day":{"2026-05-27":1},
#     "top_referrers":[{"referrer":"https://twitter.com","count":1}]}

# 4. Lỗi RFC 7807
curl -s localhost:8080/khongtontai
# -> {"type":"/errors/not-found","title":"không tìm thấy short code","status":404}

# 5. Health
curl -s localhost:8080/healthz   # -> {"status":"ok"}
```

---

## 11. Kiến thức tích hợp — capstone gom những tier nào

Capstone này "ráp" kiến thức từ nhiều tier:

| Tier | Khái niệm | Áp dụng ở đâu trong bài |
|------|-----------|------------------------|
| **T4 — Web Backend** | REST API, status code, JSON | 3 endpoint, DTO, 302/404/409/410 |
| **T5 — Data** | cache-aside, TTL | `RedirectUsecase` cache-first, populate |
| **T6 — Distributed** | queue, event-driven, CQRS nhẹ | async click, worker consumer, tách read/write |
| **T7 — Production** | clean arch, structured log, graceful shutdown, rate limit, RFC 7807 | toàn bộ cấu trúc + middleware + main |

Đây là điểm của capstone: không học khái niệm mới, mà **thấy chúng phối hợp** trong một service thật.

---

## 12. Chuẩn bị deploy (L84)

Bài này dừng ở "chạy được trên máy + test pass". [Lesson 84](../lesson-84-capstone-deploy-observe/) sẽ:

- Đóng gói **Docker multi-stage** ([L75](../lesson-75-docker-multistage/)) — build binary tĩnh, image nhỏ.
- Thêm **Prometheus metrics** thật ([L73](../lesson-73-metrics-prometheus/)) — thay stub trong `pkg/observability`.
- Thêm **OpenTelemetry tracing** ([L74](../lesson-74-tracing-opentelemetry/)) — dùng request ID đã có làm trace ID.
- (Tùy chọn) swap in-memory → Postgres + Redis thật, minh họa rằng **chỉ sửa composition root**.
- Triển khai và quan sát.

`pkg/observability/observability.go` hiện chỉ có `NewLogger` + stub `RecordRedirect`/`RecordShorten` — chừa chỗ để L84 nối metrics thật vào, không phải sửa usecase.

### 12.1 Composition root & graceful shutdown (L51)

`cmd/server/main.go` là nơi DUY NHẤT biết implementation cụ thể. Trình tự:

```go
// (1) wire driven adapter (in-memory)
repo := memory.NewURLRepository()
cache := memory.NewCache()
queue := memory.NewClickQueue(1024)

// (2) start worker (consumer)
worker := analytics.NewWorker(queue.Events())
workerCtx, stopWorker := context.WithCancel(context.Background())
go worker.Run(workerCtx)

// (3) wire usecase (tiêm port vào)
shortenUC  := usecase.NewShorten(repo, cache, usecase.SystemClock, false)
redirectUC := usecase.NewRedirect(repo, cache, queue, usecase.SystemClock)
statsUC    := usecase.NewStats(repo, worker)   // worker đóng vai StatsStore

// (4) wire HTTP + middleware, (5) chạy server goroutine, (6) chờ signal...
```

**Graceful shutdown** đúng thứ tự khi nhận SIGINT/SIGTERM:

```go
<-quit                                   // chờ Ctrl-C / SIGTERM
srv.Shutdown(ctx)                        // (a) ngừng nhận request mới, chờ request đang xử lý xong
queue.Close()                            // (b) đóng channel -> worker drain event còn lại
worker.Wait()                            // (c) chờ worker xử lý hết rồi mới thoát
```

> ⚠ **Lỗi thường gặp — đóng queue trước khi shutdown server:** nếu `queue.Close()` chạy trước `srv.Shutdown()`, một request redirect đang dở có thể `Enqueue` vào channel đã đóng → **panic** (`send on closed channel`). Đúng thứ tự: tắt server trước (không còn redirect nào emit nữa), rồi mới đóng queue.

> 💡 **Trực giác — vì sao worker cũng đóng vai StatsStore?** Trong bản in-memory, dữ liệu aggregate nằm ngay trong worker. Production tách ra: worker ghi vào Postgres/ClickHouse, còn một adapter `PostgresStatsStore` đọc từ đó. Cả hai đều thỏa interface `StatsStore` — usecase không phân biệt. Đây lại là minh chứng "swap được".

> 🔁 **Tự kiểm tra:** nếu bỏ `worker.Wait()` trong shutdown, hậu quả gì?
>
> <details><summary>Đáp án</summary>Các click event còn trong channel chưa được aggregate sẽ mất khi process thoát. `worker.Wait()` đảm bảo drain hết. Trong test, đây cũng chính là cơ chế `flush()` dùng để xác minh click đã được đếm trước khi assert.</details>

> 📝 **Tóm tắt mục 12:** Composition root wire tất cả; chỉ nó biết "in-memory hay Postgres". Graceful shutdown theo thứ tự server → queue → worker để không mất event và không panic. Observability hiện là stub, L84 thay bằng metrics/trace thật mà không đụng usecase.

---

## Bài tập

> Tất cả bài tập đều có **Lời giải chi tiết** ở mục dưới. Phần lớn đã có "móc" sẵn trong code (alias, expiration, unique IP) để bạn mở rộng dễ.

**BT1 — Custom alias.** Cho phép user chọn code thay vì random: `POST /api/shorten` với body `{"url":"...","alias":"mylink"}`. Nếu alias đã tồn tại → 409. (Gợi ý: `ShortenWithAlias` đã có sẵn — hãy đọc và viết test.)

**BT2 — URL expiration (TTL).** Thêm field `ttl_seconds` vào request shorten; URL hết hạn → `GET /{code}` trả 410 Gone. (Gợi ý: `URL.ExpiresAt` và `IsExpired` đã có.)

**BT3 — Rate limit per user.** Hiện rate limit theo IP. Sửa để limit theo **API key** (header `X-API-Key`) thay vì IP, mỗi key một quota riêng.

**BT4 — Bulk shorten API.** `POST /api/shorten/bulk` nhận `{"urls":["...","..."]}` → trả mảng `[{"code","short_url"}, ...]`. Một URL lỗi không làm hỏng cả batch.

**BT5 — Unique visitors.** Bổ sung `unique_visitors` vào stats: số IP duy nhất đã click code đó (dedup by IP). (Gợi ý: `codeAgg.uniqueIPs` và `Worker.UniqueVisitors` đã có.)

---

## Lời giải chi tiết

### BT1 — Custom alias

**Cách tiếp cận:** đường rút gọn đã sẵn 2 nhánh trong handler:

```go
if in.Alias != "" {
    u, err = h.shortener.ShortenWithAlias(r.Context(), in.URL, in.Alias)
} else {
    u, err = h.shortener.Shorten(r.Context(), in.URL)
}
```

`ShortenWithAlias` (usecase) kiểm tra trùng:

```go
exists, err := uc.repo.Exists(ctx, alias)
if exists { return nil, domain.ErrCodeTaken }   // -> handler map 409
```

`writeDomainErr` đã map `ErrCodeTaken` → 409. **Độ phức tạp:** $O(1)$ (map lookup). Test xác minh: tạo alias `"dup"` lần 1 OK, lần 2 trả `ErrCodeTaken` (xem `TestShortenWithAlias_Taken`).

Mở rộng nên làm thêm: validate alias chỉ chứa `[0-9A-Za-z_-]`, độ dài 3–30, không trùng các path reserved (`api`, `healthz`). Thêm vào `domain.NewURL` hoặc một hàm `validAlias`.

### BT2 — URL expiration (TTL)

**Cách tiếp cận:** thêm `TTLSeconds int` vào `shortenReq`. Trong usecase, sau khi tạo `URL`, set `ExpiresAt`:

```go
if ttl > 0 {
    exp := uc.clock.Now().Add(time.Duration(ttl) * time.Second)
    u.ExpiresAt = &exp
}
```

`RedirectUsecase.Resolve` đã kiểm tra:

```go
if u.IsExpired(now) { return "", domain.ErrURLExpired }   // -> 410 Gone
```

**Lưu ý cache:** entry hết hạn vẫn có thể nằm trong cache. Hai cách xử lý: (a) cache TTL ≤ URL TTL (cache tự evict trước); (b) kiểm tra `ExpiresAt` cả khi hit cache (cache phải lưu thêm `ExpiresAt`, không chỉ `original`). Đơn giản nhất: set cache TTL = thời gian còn lại của URL. **Độ phức tạp:** $O(1)$. Test: tạo URL với `ExpiresAt` quá khứ → `Resolve` trả `ErrURLExpired` (xem `TestRedirect_Expired`).

### BT3 — Rate limit per user (API key)

**Cách tiếp cận:** trong `RateLimit` middleware, đổi key của bucket từ `clientIP(r)` sang API key:

```go
func RateLimitByKey(rps, capacity float64) Middleware {
    rl := &rateLimiter{buckets: map[string]*bucket{}, rate: rps, capacity: capacity}
    return func(next http.Handler) http.Handler {
        return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
            key := r.Header.Get("X-API-Key")
            if key == "" { key = "anon:" + clientIP(r) }  // fallback theo IP
            if !rl.allow(key) {
                writeProblem(w, http.StatusTooManyRequests, "rate-limited", "Quá nhiều yêu cầu")
                return
            }
            next.ServeHTTP(w, r)
        })
    }
}
```

Logic token bucket (`allow`) không đổi — chỉ đổi *key*. Có thể cho mỗi tier API key một quota khác bằng cách map `key → (rate, capacity)`. **Độ phức tạp:** $O(1)$/request. **Lưu ý:** in-memory bucket không chia sẻ giữa nhiều instance. Production dùng Redis (INCR + EXPIRE) để rate limit phân tán.

### BT4 — Bulk shorten

**Cách tiếp cận:** endpoint mới, xử lý từng URL độc lập, **một lỗi không làm hỏng batch**:

```go
func (h *Handler) shortenBulk(w http.ResponseWriter, r *http.Request) {
    var in struct{ URLs []string `json:"urls"` }
    json.NewDecoder(r.Body).Decode(&in)

    type item struct {
        Code     string `json:"code,omitempty"`
        ShortURL string `json:"short_url,omitempty"`
        Error    string `json:"error,omitempty"`
    }
    out := make([]item, 0, len(in.URLs))
    for _, raw := range in.URLs {
        u, err := h.shortener.Shorten(r.Context(), raw)
        if err != nil {
            out = append(out, item{Error: err.Error()})   // ghi lỗi, không dừng
            continue
        }
        out = append(out, item{Code: u.Code, ShortURL: h.baseURL + "/" + u.Code})
    }
    writeJSON(w, http.StatusOK, map[string]any{"results": out})
}
```

**Độ phức tạp:** $O(n)$ với n = số URL. **Nên có giới hạn** `len(in.URLs) <= 100` (trả 400 nếu vượt) để tránh request quá lớn. Có thể song song hóa bằng goroutine + `errgroup` nếu cần (nhưng repo in-memory đã rất nhanh nên tuần tự là đủ).

### BT5 — Unique visitors

**Cách tiếp cận:** worker đã track `uniqueIPs map[string]bool` trong `codeAgg`. Thêm vào read model:

1. Trong `domain.Stats` thêm field `UniqueVisitors int`.
2. Trong `Worker.Snapshot`, set `s.UniqueVisitors = len(a.uniqueIPs)`.
3. Trong `statsResp` (handler) thêm `unique_visitors`.

`Worker.UniqueVisitors(code)` đã trả `len(a.uniqueIPs)`. Test `TestWorker_Aggregate` xác minh: 3 click từ 2 IP → unique = 2.

**Độ phức tạp:** $O(1)$ khi đọc (`len(map)`), $O(1)$ khi ghi (set vào map). **Lưu ý production:** set IP trong memory tốn RAM nếu nhiều IP. Production dùng **HyperLogLog** (Redis `PFADD`/`PFCOUNT`) — ước lượng unique count với sai số ~2% nhưng tốn cố định ~12KB/code thay vì O(số IP). Đây là trade-off chính xác đổi lấy bộ nhớ.

---

## Code & Minh họa

- Lời giải code đầy đủ: [solutions/](./solutions/) — `cd solutions && go build ./... && go test ./...` (cả `-race`) PASS.
- Minh họa tương tác: [visualization.html](./visualization.html) — 3 module: kiến trúc clickable, request flow (shorten/redirect/stats), async click pipeline.

---

## Bài tiếp theo

- ⬅ [Lesson 82 — Capstone Design](../lesson-82-capstone-design/)
- ➡ [Lesson 84 — Capstone Deploy & Observe](../lesson-84-capstone-deploy-observe/) — Docker, metrics, tracing, triển khai.

> 📝 **Tóm tắt cả bài:** Một URL shortener production-ready theo clean architecture. Redirect = cache-aside + emit click async (không chặn). Worker aggregate thành read model. Stats đọc read model (CQRS nhẹ). Middleware lo cross-cutting (log, recover, rate limit, request ID). Lỗi theo RFC 7807. Port in-memory swap được sang Postgres/Redis/Kafka chỉ bằng sửa composition root. Test: unit với mock + integration end-to-end, flush queue để xác minh click eventually counted.
