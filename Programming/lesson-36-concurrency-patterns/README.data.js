// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: Programming/lesson-36-concurrency-patterns/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 36 — Concurrency Patterns nâng cao

> Tier 3 · Advanced Go · Prerequisite: L27 (goroutine + channel), L28 (sync primitives), L29 (context)

## Mục tiêu học tập

Sau lesson này, bạn sẽ:

- Biết khi nào dùng **worker pool** thay vì spawn vô tội vạ goroutine, và cách chọn số worker.
- Hiểu pattern **fan-out / fan-in** và **pipeline** đa stage, biết cách propagate cancel qua toàn bộ pipeline.
- Dùng **semaphore (channel buffered)** để giới hạn concurrency thay vì viết tay mutex + counter.
- Dùng \`golang.org/x/sync/errgroup\` để wait nhóm goroutine và bắt error đầu tiên — thay thế cho \`sync.WaitGroup\` thủ công.
- Dùng \`singleflight\` để dedupe các request cùng key (cache stampede protection).
- Cài đặt **rate limiter token bucket** và **circuit breaker** ở mức nguyên lý, biết khi nào dùng library production.
- Viết **graceful shutdown** đúng chuẩn: nhận signal, cancel root context, wait worker với timeout.
- Tránh các pitfall kinh điển: quên close result channel, quên \`defer cancel()\`, dùng \`WaitGroup\` style với errgroup.

## Kiến thức tiền đề

- [Lesson 27 — Goroutines & Channels](../lesson-27-goroutines-channels/) — \`go\`, \`chan\`, \`select\`, \`close\`.
- [Lesson 28 — Sync primitives](../lesson-28-sync-primitives/) — \`sync.WaitGroup\`, \`sync.Mutex\`, \`sync.Once\`.
- [Lesson 29 — Context](../lesson-29-context-cancellation/) — \`context.WithCancel\`, \`WithTimeout\`, cancel propagation.

---

## 1. Vì sao "patterns"? — công cụ không bằng công thức

Go cho bạn **bộ ba công cụ concurrency rất gọn**: \`goroutine\` để spawn task, \`channel\` để truyền dữ liệu giữa task,
\`sync\` cho các đồng bộ low-level. Ba thứ này, mỗi cái học không khó. Vấn đề bắt đầu khi bạn phải **composition**:

- Crawler 1 triệu URL — spawn 1 triệu goroutine? Không. Cần worker pool.
- Một service nhận request → query 3 microservice song song, hợp kết quả. WaitGroup? Không bắt được error. errgroup.
- Background job mỗi 5 phút sync data — nếu service shutdown giữa chừng? Graceful shutdown + context.

> 💡 **Trực giác** — Tier 1 dạy bạn "chữ cái" (\`goroutine\`, \`chan\`). Tier 3 dạy bạn "ngữ pháp" (worker pool, pipeline,
> fan-in, errgroup). Cũng giống như học từ vựng tiếng Anh xong thì học idiom: không phải kiến thức mới, mà là **composition pattern**.

Bài này gom các pattern hay gặp nhất trong production Go code, kèm ví dụ thực tế:

| Pattern | Bài toán giải | Ví dụ thực tế |
|---------|---------------|---------------|
| Worker Pool | Process N job với worker giới hạn | Web crawler, batch image resize |
| Fan-out / Fan-in | Split work → merge result | Map-reduce style aggregation |
| Pipeline | Chuỗi stage transform data | ETL: read → parse → enrich → write |
| Semaphore | Limit concurrent ops | Max 10 HTTP request đồng thời |
| errgroup | Wait + first-error | Microservice fan-out call |
| singleflight | Dedupe same request | Cache miss stampede |
| Rate limiter | Throttle ops/s | Public API quota |
| Circuit breaker | Fail-fast unstable dep | Gọi service flaky |
| Graceful shutdown | Cleanup khi SIGTERM | Mọi long-running service |

📝 **Tóm tắt mục 1**: 3 công cụ (\`go\`, \`chan\`, \`sync\`) là chữ cái — pattern là ngữ pháp. Production Go đa số là composition của ~10 pattern dưới đây.

---

## 2. Worker Pool — N worker tiêu thụ job từ queue

### 2.1 Trực giác

> 💡 **Hình dung** — Tưởng tượng nhà hàng có 1000 đơn order đến cùng lúc. Bạn không thuê 1000 đầu bếp. Bạn có
> 5 đầu bếp (worker), đơn xếp vào hàng đợi (job channel). Mỗi đầu bếp xong 1 món thì lấy đơn tiếp theo. Đó là worker pool.

Cấu trúc:

\`\`\`
producer ──► jobs (chan Job) ──► [worker 1, worker 2, ..., worker N] ──► results (chan Result)
\`\`\`

- **\`jobs\`** channel chứa job chờ xử lý.
- **N goroutine worker** cùng \`range jobs\`, ai rảnh nhận job đó (Go runtime tự balance).
- **\`results\`** channel collect output (nếu cần).

### 2.2 Code đầy đủ với context cancel

\`\`\`go
type Job struct{ ID int; Payload string }
type Result struct{ JobID int; Output string; Err error }

func worker(ctx context.Context, id int, jobs <-chan Job, results chan<- Result) {
    for {
        select {
        case <-ctx.Done():
            // Parent cancel — worker thoát ngay, không cố process nốt.
            return
        case job, ok := <-jobs:
            if !ok {
                return // jobs channel đã close, không còn job → exit.
            }
            // Process job (giả lập I/O 50ms).
            select {
            case <-time.After(50 * time.Millisecond):
            case <-ctx.Done():
                return
            }
            results <- Result{JobID: job.ID, Output: "done: " + job.Payload}
        }
    }
}

func runPool(ctx context.Context, numWorkers int, jobs []Job) []Result {
    jobCh := make(chan Job)
    resultCh := make(chan Result, len(jobs))

    var wg sync.WaitGroup
    for i := 0; i < numWorkers; i++ {
        wg.Add(1)
        go func(id int) {
            defer wg.Done()
            worker(ctx, id, jobCh, resultCh)
        }(i)
    }

    // Producer: feed jobs.
    go func() {
        defer close(jobCh) // QUAN TRỌNG: đóng để worker biết hết job.
        for _, j := range jobs {
            select {
            case <-ctx.Done():
                return
            case jobCh <- j:
            }
        }
    }()

    // Close resultCh sau khi mọi worker xong — pattern "wait then close".
    go func() {
        wg.Wait()
        close(resultCh)
    }()

    var out []Result
    for r := range resultCh {
        out = append(out, r)
    }
    return out
}
\`\`\`

### 2.3 Chọn số worker bao nhiêu?

| Loại workload | Số worker đề xuất | Lý do |
|---------------|-------------------|-------|
| **CPU-bound** (hash, encrypt, image processing) | \`runtime.NumCPU()\` | Spawn thêm chỉ context-switch, không nhanh hơn. |
| **I/O-bound** (HTTP, DB) | 50 – 500 | Goroutine block trên I/O, nhiều worker cùng chờ song song được. |
| **Mixed** | Đo bằng \`pprof\` (xem L34) | Không có công thức universal. |

> ❓ **Câu hỏi tự nhiên**:
>
> - *"Vì sao không spawn 1 goroutine cho mỗi job?"* — Goroutine rẻ (~2KB stack) nhưng không miễn phí.
>   1 triệu URL × 1 goroutine = 2GB chỉ riêng stack, chưa kể OS file descriptor cho HTTP connection.
>   Worker pool bounded resource usage.
> - *"Có cần \`mutex\` để protect \`results\` channel không?"* — Không. Channel **đã** thread-safe. Đó là lý do
>   Go bảo "communicate by sharing memory" — channel = sync primitive.
> - *"Nếu 1 worker panic thì sao?"* — Cả pool die. Production phải có \`defer recover()\` trong worker, hoặc
>   wrap mỗi job trong goroutine con isolate.

> ⚠ **Pitfall**: Quên \`close(jobCh)\` → worker \`for range jobCh\` block mãi mãi → goroutine leak.

🔁 **Tự kiểm tra**: Nếu bạn có 1000 job, 4 worker, mỗi job 100ms — tổng thời gian ước lượng?

<details>
<summary>Đáp án</summary>

\`1000 × 100ms / 4 worker = 25s\` (lý tưởng). Thực tế lâu hơn chút do context switch, channel overhead.

</details>

📝 **Tóm tắt mục 2**: Worker pool = \`jobs\` channel + N goroutine \`range jobs\`. Số worker theo loại load. Luôn \`close(jobs)\` khi producer xong, dùng \`WaitGroup\` rồi \`close(results)\`.

---

## 3. Fan-out / Fan-in

### 3.1 Fan-out — 1 producer → N consumer

\`\`\`
       ┌─► worker 1 ─┐
input ─┼─► worker 2 ─┼─► (gộp)
       └─► worker N ─┘
\`\`\`

Cách làm: producer gửi vào 1 channel, N worker cùng \`range\` channel đó. Đây chính là **worker pool** ở mục 2,
gọi tên khác.

### 3.2 Fan-in — N producer → 1 consumer

\`\`\`
src 1 ─┐
src 2 ─┼─► merge ─► output
src 3 ─┘
\`\`\`

Khi nào cần: bạn có nhiều stream độc lập (vd 3 server log) và muốn process tổng hợp.

Code mẫu (merge 3 channel int):

\`\`\`go
func fanIn(ctx context.Context, srcs ...<-chan int) <-chan int {
    out := make(chan int)
    var wg sync.WaitGroup
    wg.Add(len(srcs))
    for _, src := range srcs {
        go func(c <-chan int) {
            defer wg.Done()
            for v := range c {
                select {
                case out <- v:
                case <-ctx.Done():
                    return
                }
            }
        }(src)
    }
    go func() {
        wg.Wait()
        close(out) // tất cả source đóng → đóng out.
    }()
    return out
}
\`\`\`

> ⚠ **Pitfall**: Quên \`close(out)\` → consumer \`range out\` không bao giờ thoát.

### 3.3 Walk-through bằng số

Cho 3 source phát 5 số (1..5, 10..14, 100..104). Sau \`fanIn\`:

\`\`\`
out có 15 phần tử, thứ tự interleave không xác định:
  ví dụ: 1, 10, 100, 2, 11, 101, 3, 12, ...
  hoặc:  100, 1, 10, 101, 2, ...
\`\`\`

Thứ tự **không deterministic** — Go runtime schedule goroutine theo ý nó. Nếu cần thứ tự, cần buffering + sort ở consumer.

📝 **Tóm tắt mục 3**: Fan-out = 1 → N (chính là worker pool). Fan-in = N → 1 (merge). Pattern wait-then-close để tránh leak channel.

---

## 4. Pipeline — chuỗi stage transform

### 4.1 Mô hình

\`\`\`
gen ──► stage 1 (parse) ──► stage 2 (transform) ──► stage 3 (write)
       chan A              chan B                  chan C
\`\`\`

Mỗi stage:
- Là 1 goroutine (hoặc nhóm goroutine — fan-out trong stage).
- Có 1 input channel, 1 output channel.
- Đóng output channel khi input close + đã flush xong.

### 4.2 Ví dụ: gen → square → sum

\`\`\`go
func gen(ctx context.Context, nums ...int) <-chan int {
    out := make(chan int)
    go func() {
        defer close(out)
        for _, n := range nums {
            select {
            case out <- n:
            case <-ctx.Done():
                return
            }
        }
    }()
    return out
}

func square(ctx context.Context, in <-chan int) <-chan int {
    out := make(chan int)
    go func() {
        defer close(out)
        for n := range in {
            select {
            case out <- n * n:
            case <-ctx.Done():
                return
            }
        }
    }()
    return out
}

// Stage cuối (sum) không phải pipeline stage thực sự — nó consume thôi.
func sumAll(in <-chan int) int {
    s := 0
    for v := range in {
        s += v
    }
    return s
}

// Sử dụng:
//   ctx, cancel := context.WithCancel(context.Background())
//   defer cancel()
//   nums := gen(ctx, 1, 2, 3, 4, 5)
//   squared := square(ctx, nums)
//   total := sumAll(squared)   // 1+4+9+16+25 = 55
\`\`\`

### 4.3 Cancel propagation

Khi gọi \`cancel()\` từ ngoài:
- \`gen\` thấy \`ctx.Done()\` → return → \`close(out)\`.
- \`square\` đang \`range in\` thấy in đóng → loop kết thúc → \`close(out)\`.
- \`sumAll\` thấy in đóng → return giá trị partial.

Toàn pipeline dừng đúng cách, **không goroutine leak**.

> ❓ **Câu hỏi**: "Tại sao mỗi stage cần check \`ctx.Done()\` riêng nếu cancel đã lan qua channel close?"
>
> Vì stage có thể **block** ở \`out <- value\` (consumer chậm). Nếu không có \`select ctx.Done\`, stage đó treo mãi mãi.
> Channel close không tự "unblock" goroutine đang send.

### 4.4 Ví dụ thực tế — ETL log processing

\`\`\`
Stage 1: read log file (1 goroutine)
Stage 2: parse JSON line (N goroutine fan-out để parallelize CPU)
Stage 3: enrich với IP geolocation (M goroutine, gọi GeoIP API)
Stage 4: write vào ClickHouse (1 goroutine, batch insert)
\`\`\`

Mỗi stage có thể fan-out worker riêng. Backpressure: nếu stage 4 chậm, channel out của stage 3 đầy, stage 3 block,
lan ngược về stage 1. Tự nhiên throttle nguồn đọc.

📝 **Tóm tắt mục 4**: Pipeline = chuỗi stage qua channel. Mỗi stage phải check \`ctx.Done()\` ở cả receive và send để hỗ trợ cancel.

---

## 5. Semaphore — channel buffered cap N

### 5.1 Trực giác

> 💡 **Hình dung** — Bãi gửi xe có 10 chỗ. Mỗi xe vào lấy 1 thẻ. Hết thẻ thì chờ. Xe ra trả thẻ. Channel
> buffered cap 10 hoạt động y hệt: gửi 1 token vào = lấy 1 slot, nhận ra = trả slot.

### 5.2 Code

\`\`\`go
sem := make(chan struct{}, 10) // tối đa 10 ops đồng thời

for _, url := range urls {
    sem <- struct{}{} // acquire — block nếu đã đủ 10
    go func(u string) {
        defer func() { <-sem }() // release
        fetch(u)
    }(url)
}
\`\`\`

\`struct{}\` empty struct = 0 byte, dùng làm "tín hiệu" thuần.

### 5.3 So sánh với worker pool

| | Semaphore | Worker pool |
|-|-----------|-------------|
| Số goroutine | = số job (spawn-on-demand) | Cố định N |
| Goroutine reuse | Không | Có |
| Overhead | Spawn mỗi job | Reuse |
| Khi nào dùng | Job ít, ngắn, đơn giản | Job nhiều, lifetime dài |

> ❓ **"Vậy dùng cái nào?"**: Có < 100 job với chỉ 1 lần chạy → semaphore. Long-running service process job liên tục → worker pool.

### 5.4 Walk-through

100 HTTP request, semaphore cap 10, mỗi request 200ms:

- t=0: spawn 10 goroutine (acquire 10 token). 90 còn lại block ở \`sem <- struct{}{}\`.
- t=200ms: 10 goroutine xong, release 10 token. 10 goroutine kế tiếp acquire.
- ...
- Tổng thời gian: \`100 / 10 × 200ms = 2s\`.

📝 **Tóm tắt mục 5**: Channel buffered N = semaphore N. \`sem <- struct{}{}\` acquire, \`<-sem\` release. Pattern đơn giản hơn \`sync\` cho limit concurrency.

---

## 6. \`golang.org/x/sync/errgroup\` — wait + first-error

### 6.1 Vấn đề với \`sync.WaitGroup\`

\`\`\`go
var wg sync.WaitGroup
for _, url := range urls {
    wg.Add(1)
    go func(u string) {
        defer wg.Done()
        if err := fetch(u); err != nil {
            // Làm gì? Lưu vào slice? Race condition.
            // log.Print? Lost error chính.
        }
    }(url)
}
wg.Wait() // Không biết có lỗi không.
\`\`\`

\`WaitGroup\` không trả error. Bạn phải tự collect vào slice + mutex, vẫn không biết "lỗi nào trước".

### 6.2 Giải pháp: \`errgroup\`

\`\`\`go
import "golang.org/x/sync/errgroup"

g, ctx := errgroup.WithContext(context.Background())
for _, url := range urls {
    url := url // capture loop variable (Go < 1.22)
    g.Go(func() error {
        return fetch(ctx, url) // ctx tự cancel khi có error đầu tiên
    })
}
if err := g.Wait(); err != nil {
    log.Printf("fetch failed: %v", err)
    return
}
\`\`\`

Tính năng:
- \`g.Wait()\` chờ mọi goroutine xong, trả error đầu tiên (nếu có).
- \`errgroup.WithContext\` trả về ctx **tự cancel khi có goroutine return error** → các goroutine khác qua \`ctx\` cũng dừng được.
- Idiomatic Go cho "do N thing concurrent, fail fast".

### 6.3 Ví dụ thực tế — microservice aggregation

\`\`\`go
type Page struct {
    User    User
    Posts   []Post
    Friends []User
}

func loadPage(ctx context.Context, userID int) (*Page, error) {
    var page Page
    g, ctx := errgroup.WithContext(ctx)
    g.Go(func() error {
        u, err := getUser(ctx, userID)
        page.User = u
        return err
    })
    g.Go(func() error {
        p, err := getPosts(ctx, userID)
        page.Posts = p
        return err
    })
    g.Go(func() error {
        f, err := getFriends(ctx, userID)
        page.Friends = f
        return err
    })
    if err := g.Wait(); err != nil {
        return nil, err
    }
    return &page, nil
}
\`\`\`

3 RPC chạy song song. Bất kỳ 1 fail → 2 cái còn lại bị cancel qua ctx → return error luôn, không lãng phí.

> ⚠ **Pitfall**: Ghi vào \`page.User\` từ goroutine **không cần mutex** vì 3 field khác nhau (no race on same memory).
> Nhưng nếu append vào cùng \`slice\` thì PHẢI có mutex.

### 6.4 \`g.SetLimit(n)\` (Go 1.20+)

\`\`\`go
g.SetLimit(10) // tối đa 10 goroutine concurrent — errgroup tích hợp sẵn semaphore
\`\`\`

📝 **Tóm tắt mục 6**: \`errgroup\` = \`WaitGroup\` + error + ctx cancel. Dùng cho "do N thing, fail fast" — pattern phổ biến nhất trong microservice.

---

## 7. \`x/sync/singleflight\` — dedupe same request

### 7.1 Vấn đề: cache stampede

> 💡 **Hình dung** — Hot key trong cache hết hạn lúc 10:00. 1000 request đến cùng lúc 10:00:01, tất cả miss cache,
> tất cả gọi DB. DB sập. Đây là "thundering herd" / cache stampede.

### 7.2 Giải pháp: singleflight

\`\`\`go
import "golang.org/x/sync/singleflight"

var sf singleflight.Group

func getUser(id int) (User, error) {
    key := fmt.Sprintf("user:%d", id)
    v, err, _ := sf.Do(key, func() (interface{}, error) {
        // Hàm này CHỈ chạy 1 lần kể cả 1000 caller cùng gọi với key này.
        return db.QueryUser(id)
    })
    if err != nil {
        return User{}, err
    }
    return v.(User), nil
}
\`\`\`

\`sf.Do(key, fn)\`:
- Nếu chưa có ai đang chạy \`fn\` cho key này → chạy, lưu vào map.
- Nếu đã có người chạy → block chờ, **dùng chung kết quả**.
- Sau khi \`fn\` xong, xóa khỏi map (lần sau key này gọi lại sẽ chạy \`fn\` mới).

### 7.3 Walk-through: 100 request cùng key

\`\`\`
t=0:    req1 gọi sf.Do("user:42", queryDB) → bắt đầu chạy queryDB.
t=0.01: req2..req100 gọi sf.Do("user:42", ...) → thấy đang có người chạy → đứng chờ.
t=200ms: queryDB return User{...}. sf phát kết quả cho req1..req100.
\`\`\`

DB chỉ thấy **1 query** (không phải 100).

### 7.4 Khi nào KHÔNG dùng

- Khi mỗi caller cần dữ liệu **riêng** (vd: gắn user-specific token). Singleflight share kết quả → mọi caller nhận giống nhau.
- Khi function có side-effect không idempotent (vd: trừ tiền, gửi email).

📝 **Tóm tắt mục 7**: Singleflight dedupe các call cùng key. 1 lần DB query phục vụ N caller. Cứu DB khỏi cache stampede.

---

## 8. Rate limiting — token bucket

### 8.1 Trực giác

> 💡 **Hình dung** — Vòi nước nhỏ giọt vào xô. Xô có sức chứa B token. Mỗi giọt = 1 token, tốc độ R giọt/s.
> Mỗi request lấy 1 token; xô rỗng = chờ. Đây là token bucket.

Tham số:
- **R** (rate): token sinh ra / giây.
- **B** (burst): sức chứa xô. Cho phép spike ngắn lên đến B request.

### 8.2 Dùng \`golang.org/x/time/rate\`

\`\`\`go
import "golang.org/x/time/rate"

limiter := rate.NewLimiter(rate.Limit(10), 5) // 10 ops/s, burst 5

for _, url := range urls {
    if err := limiter.Wait(ctx); err != nil { // block đến khi có token
        return err
    }
    go fetch(url)
}
\`\`\`

\`Wait(ctx)\`: block đến khi có 1 token; nếu ctx cancel trước, return error.

Các method khác:
- \`limiter.Allow()\` — non-blocking, true nếu có token, false nếu không.
- \`limiter.Reserve()\` — book token cho future, trả về thời gian phải chờ.

### 8.3 Walk-through

\`rate.NewLimiter(rate.Limit(10), 5)\`:
- t=0: bucket có 5 token (đầy burst).
- 5 request đầu: dùng hết burst, qua ngay.
- Request 6: bucket rỗng. Chờ \`100ms\` (1/10s) để có 1 token mới.
- Request 7: chờ thêm 100ms.
- ...

Steady state: 10 ops/s. Burst capacity dùng cho traffic spike ngắn.

### 8.4 Ví dụ thực tế — public API client

Bên thứ ba giới hạn 100 req/min = 1.67 ops/s, burst 10:

\`\`\`go
limiter := rate.NewLimiter(rate.Every(600*time.Millisecond), 10)
\`\`\`

\`rate.Every(600ms)\` = 1 token / 600ms = 1.67 ops/s.

📝 **Tóm tắt mục 8**: Token bucket = rate R + burst B. \`rate.NewLimiter\` + \`Wait(ctx)\`. Pattern chuẩn cho throttle outbound call.

---

## 9. Circuit breaker — fail fast khi downstream sập

### 9.1 Vấn đề

Service A gọi service B. B sập (timeout). A vẫn cứ gọi B mỗi request → A tích lũy goroutine block → A cũng sập.

### 9.2 State machine

\`\`\`
        success threshold
   ┌───────────────────────┐
   │                       │
   ▼                       │
┌────────┐  fail rate   ┌──────┐  test request fail   ┌────────────┐
│ Closed │ ───────────► │ Open │ ───────────────────► │ (back Open) │
│ (pass) │              │(fail │ ◄─────────────────── │             │
│        │              │ fast)│   test request ok    │  Half-open  │
└────────┘              └──────┘ ───────────────────► │             │
   ▲                                                   └─────┬───────┘
   │                                                         │
   └──────────────  successful requests in half-open  ◄──────┘
\`\`\`

- **Closed**: bình thường, mọi request đi qua.
- **Open**: B đã được coi là sập. Mọi request **fail ngay không gọi B** (fail fast). Tiết kiệm tài nguyên A.
- **Half-open**: sau timeout (vd 30s), cho phép vài request test. Nếu success → về Closed. Fail → quay lại Open.

### 9.3 Code với \`sony/gobreaker\`

\`\`\`go
import "github.com/sony/gobreaker"

cb := gobreaker.NewCircuitBreaker(gobreaker.Settings{
    Name:        "service-B",
    MaxRequests: 3,                  // half-open: cho 3 request test
    Interval:    10 * time.Second,   // window đếm fail
    Timeout:     30 * time.Second,   // open → half-open sau 30s
    ReadyToTrip: func(counts gobreaker.Counts) bool {
        return counts.ConsecutiveFailures > 5
    },
})

result, err := cb.Execute(func() (interface{}, error) {
    return callServiceB()
})
if errors.Is(err, gobreaker.ErrOpenState) {
    // Circuit đang Open → có thể return cached, hoặc default
    return fallback()
}
\`\`\`

### 9.4 Khi nào dùng

- Gọi external service không ổn định (third-party API, microservice khác trong mesh).
- Database connection pool có thể bão hòa.

KHÔNG dùng circuit breaker cho:
- In-process call (không có lợi).
- Service chỉ có 1 nguồn fail-safe (vd primary DB không có replica).

📝 **Tóm tắt mục 9**: 3 state (Closed → Open → Half-open). Fail rate cao → trip → fail fast. Sau timeout → thử lại. Dùng cho gọi service flaky.

---

## 10. Producer-consumer với backpressure

### 10.1 Backpressure là gì

> 💡 Producer phát 1000 item/s, consumer xử 100 item/s. Buffer giữa hai bên có giới hạn → đầy → producer **bị block**.
> Đây là backpressure: chậm nhất quy định nhịp. Không bị OOM vì queue không bùng nổ.

### 10.2 Cài đặt qua buffered channel

\`\`\`go
queue := make(chan Item, 1000) // buffer 1000 item

// Producer
go func() {
    for item := range source {
        queue <- item // block khi queue đầy
    }
    close(queue)
}()

// Consumer
for item := range queue {
    process(item) // chậm
}
\`\`\`

Khi consumer chậm, queue đầy 1000, producer block ở \`queue <-\`. Producer không thể "ngập" hệ thống.

### 10.3 Buffer cỡ nào?

| Buffer | Hành vi |
|--------|---------|
| 0 (unbuffered) | Synchronous handoff. Producer block tới khi consumer ready. |
| Nhỏ (10-100) | Smooth ra spike ngắn. Producer/consumer tightly coupled. |
| Lớn (10k+) | Tolerate spike dài. Risk: trễ phản ánh slowness của consumer. |
| Vô hạn (slice + mutex) | KHÔNG dùng — OOM tiềm tàng. |

### 10.4 Signal slow consumer

Track buffer fill ratio để alert:

\`\`\`go
go func() {
    ticker := time.NewTicker(1 * time.Second)
    defer ticker.Stop()
    for range ticker.C {
        fill := float64(len(queue)) / float64(cap(queue))
        if fill > 0.8 {
            log.Warnf("queue 80%% full — consumer too slow")
        }
    }
}()
\`\`\`

📝 **Tóm tắt mục 10**: Buffered channel cap hữu hạn = backpressure tự nhiên. Producer block khi consumer chậm. Monitor \`len(queue)/cap(queue)\` để alert.

---

## 11. Cancel chain với context

Quy tắc vàng:

1. **Mọi function long-running nhận \`ctx context.Context\` làm tham số đầu tiên.**
2. **Khi spawn goroutine con, truyền ctx xuống.**
3. **Mỗi loop / blocking op, \`select\` thêm \`case <-ctx.Done(): return\`.**

\`\`\`go
func process(ctx context.Context, items []Item) error {
    for _, it := range items {
        select {
        case <-ctx.Done():
            return ctx.Err()
        default:
        }
        if err := doWork(ctx, it); err != nil { // truyền ctx
            return err
        }
    }
    return nil
}
\`\`\`

Khi root cancel: ctx của process cũng done → vòng lặp break → doWork ngắt qua ctx → toàn tree dừng.

> ⚠ **Pitfall siêu phổ biến**:
>
> \`\`\`go
> ctx, _ := context.WithCancel(parent) // BỎ cancel!
> \`\`\`
>
> Không gọi \`cancel()\` → goroutine của ctx này không bao giờ được giải phóng → leak. Linter \`govet\` cảnh báo.
> Đúng:
>
> \`\`\`go
> ctx, cancel := context.WithCancel(parent)
> defer cancel()
> \`\`\`

Xem lại [L29](../lesson-29-context-cancellation/) cho chi tiết context tree.

📝 **Tóm tắt mục 11**: Truyền ctx khắp nơi, \`defer cancel()\` luôn, mỗi blocking op check \`ctx.Done()\`. Pattern này CỨU app khỏi goroutine leak.

---

## 12. Graceful shutdown

### 12.1 Vấn đề

Service đang process 1000 job, OS gửi SIGTERM (vd K8s rolling update). Nếu service exit ngay → 1000 job mất.
Graceful: stop nhận job mới, chờ 1000 job hiện tại xong (hoặc đến deadline), rồi mới exit.

### 12.2 Pattern

\`\`\`go
func main() {
    ctx, cancel := signal.NotifyContext(context.Background(), os.Interrupt, syscall.SIGTERM)
    defer cancel()

    // Khởi động HTTP server và worker với ctx này.
    srv := &http.Server{Addr: ":8080", Handler: mux}
    go func() {
        if err := srv.ListenAndServe(); !errors.Is(err, http.ErrServerClosed) {
            log.Fatal(err)
        }
    }()

    workerDone := startWorkers(ctx)

    <-ctx.Done() // chờ signal
    log.Println("shutdown signal received")

    // Graceful: cho HTTP server 5s để finish in-flight request.
    shutdownCtx, shutdownCancel := context.WithTimeout(context.Background(), 5*time.Second)
    defer shutdownCancel()
    if err := srv.Shutdown(shutdownCtx); err != nil {
        log.Printf("forced shutdown: %v", err)
    }

    // Chờ worker thoát (cũng với timeout).
    select {
    case <-workerDone:
        log.Println("workers done")
    case <-time.After(5 * time.Second):
        log.Println("worker shutdown timeout")
    }
}
\`\`\`

\`signal.NotifyContext\` (Go 1.16+) tự cancel ctx khi nhận signal — gọn hơn \`signal.Notify(ch, ...)\` + select.

### 12.3 Walk-through

\`\`\`
t=0:    service chạy, nhận request bình thường.
t=10:   K8s gửi SIGTERM.
t=10:   ctx.Done() fired. main thoát <-ctx.Done().
t=10:   srv.Shutdown(shutdownCtx) bắt đầu:
        - Đóng listener (không accept connection mới).
        - Cho in-flight handler tối đa 5s để return.
t=12:   Tất cả handler xong → Shutdown return.
t=12:   Wait worker → done sau 1s.
t=13:   main exit clean.
\`\`\`

Nếu in-flight quá lâu (> 5s): \`Shutdown\` return \`context deadline exceeded\`, force close. Mất 1 phần job nhưng tốt hơn mất tất cả.

📝 **Tóm tắt mục 12**: \`signal.NotifyContext\` → cancel root → \`srv.Shutdown(timeoutCtx)\` → wait worker. Pattern chuẩn cho production service.

---

## 13. Common pitfall

| Lỗi | Triệu chứng | Sửa |
|-----|-------------|-----|
| Worker pool quên \`close(results)\` | Consumer \`for range results\` treo | \`go func(){ wg.Wait(); close(results) }()\` |
| Dùng \`WaitGroup\` thay errgroup | Lỗi bị nuốt, không biết caller nào fail | Thay bằng errgroup |
| Quên \`defer cancel()\` | Goroutine leak, dần dần OOM | \`ctx, cancel := ...; defer cancel()\` |
| Channel deadlock khi consumer panic | Producer block mãi ở \`out <-\` | \`defer recover()\` ở consumer hoặc dùng \`select ctx.Done()\` ở producer |
| Spawn 1 goroutine / 1M item | Memory blow up | Worker pool / semaphore |
| Pipeline stage thiếu \`select ctx.Done\` ở send | Cancel không lan, goroutine leak | Mọi \`out <-\` bọc \`select\` với \`<-ctx.Done()\` |
| Singleflight cho non-idempotent op | Side effect chỉ chạy 1 lần, các caller khác nghĩ đã chạy | Đừng dùng singleflight, gọi trực tiếp |
| \`for _, x := range xs { go func(){ use(x) }() }\` (Go < 1.22) | Tất cả goroutine dùng cùng 1 \`x\` (last) | \`x := x\` capture, hoặc Go 1.22+ tự fix |
| Rate limit dùng \`time.Sleep(100ms)\` | Không xử lý burst, không thread-safe | Dùng \`rate.Limiter\` |

---

## Bài tập

### BT1 — Generic Worker Pool

Cài đặt \`func RunPool[J any, R any](ctx context.Context, n int, jobs []J, work func(context.Context, J) R) []R\`.

Yêu cầu:
- Generic Job type \`J\`, Result type \`R\`.
- N worker goroutine.
- Context cancel: cancel → return ngay với kết quả partial.
- Thứ tự result không cần khớp jobs.

### BT2 — Pipeline gen → square → sum

Cài đặt pipeline 3 stage:
- \`gen(ctx, 1..10)\` → channel int
- \`square\` → channel int (n²)
- \`sumAll\` → int

Test:
1. Chạy hoàn chỉnh: kết quả = \`1+4+9+...+100 = 385\`.
2. Cancel ctx sau 1ms → kết quả partial < 385, không leak goroutine.

### BT3 — Fan-in 5 channel

Cài đặt \`merge(ctx, c1, c2, ..., c5 <-chan int) <-chan int\` merge 5 channel int thành 1.

Test: mỗi source phát 100 số, kết quả gồm 500 số, mọi giá trị unique đều có mặt.

### BT4 — Rate-limited HTTP request

100 URL, limit 10 ops/s burst 5. Đo tổng thời gian, verify ~ 10s.

Cài đặt bằng \`golang.org/x/time/rate\` (hoặc tự cài đơn giản bằng \`time.Tick\`).

### BT5 — errgroup fetch 10 URL

Dùng \`errgroup.Group\` fetch 10 URL concurrent. Nếu 1 URL fail (giả lập bằng \`errors.New\`), các URL còn lại bị cancel qua ctx, \`g.Wait()\` trả error.

### BT6 — Singleflight đếm DB call

Simulate 100 caller gọi \`getUser(42)\` cùng lúc. Counter \`dbCalls\` đếm số lần thực sự query DB. Verify \`dbCalls == 1\`.

### BT7 — Graceful shutdown HTTP server

HTTP server có 1 endpoint \`/slow\` sleep 3s rồi return.

- Start server.
- Sau 100ms, gửi 1 request \`/slow\` (background).
- Sau 200ms, trigger shutdown (gọi cancel root ctx).
- Server.Shutdown với timeout 5s.
- Verify: request \`/slow\` vẫn return 200 (in-flight được đợi), server thoát sau ~3s.

---

## Lời giải chi tiết

### Lời giải BT1 — Generic Worker Pool

\`\`\`go
func RunPool[J any, R any](
    ctx context.Context,
    n int,
    jobs []J,
    work func(context.Context, J) R,
) []R {
    jobCh := make(chan J)
    resultCh := make(chan R, len(jobs))

    var wg sync.WaitGroup
    for i := 0; i < n; i++ {
        wg.Add(1)
        go func() {
            defer wg.Done()
            for {
                select {
                case <-ctx.Done():
                    return
                case j, ok := <-jobCh:
                    if !ok {
                        return
                    }
                    select {
                    case <-ctx.Done():
                        return
                    case resultCh <- work(ctx, j):
                    }
                }
            }
        }()
    }

    go func() {
        defer close(jobCh)
        for _, j := range jobs {
            select {
            case <-ctx.Done():
                return
            case jobCh <- j:
            }
        }
    }()

    go func() { wg.Wait(); close(resultCh) }()

    var out []R
    for r := range resultCh {
        out = append(out, r)
    }
    return out
}
\`\`\`

**Giải thích step-by-step**:

1. **Tạo 2 channel**: \`jobCh\` (unbuffered — backpressure tự nhiên), \`resultCh\` (buffered = len(jobs) để worker không bị block khi producer chậm collect).
2. **Spawn N worker**: mỗi worker \`select\` 2 case — ctx cancel hoặc nhận job. Worker xong job thì gửi result, vẫn \`select ctx.Done\` ở \`resultCh <- ...\` để hỗ trợ cancel khi consumer chậm.
3. **Producer goroutine**: feed jobs vào jobCh, có ctx-aware send, đóng jobCh sau khi xong.
4. **Closer goroutine**: chờ mọi worker \`wg.Done()\` rồi đóng resultCh. Consumer \`for range resultCh\` tự thoát.
5. **Consumer**: collect mọi result. Khi ctx cancel, partial results vẫn có trong out.

**Độ phức tạp**: O(jobs / n) wall-clock với work cost không đổi.

### Lời giải BT2 — Pipeline

\`\`\`go
func gen(ctx context.Context, nums ...int) <-chan int {
    out := make(chan int)
    go func() {
        defer close(out)
        for _, n := range nums {
            select {
            case <-ctx.Done():
                return
            case out <- n:
            }
        }
    }()
    return out
}

func square(ctx context.Context, in <-chan int) <-chan int {
    out := make(chan int)
    go func() {
        defer close(out)
        for n := range in {
            select {
            case <-ctx.Done():
                return
            case out <- n * n:
            }
        }
    }()
    return out
}

func sumAll(in <-chan int) int {
    s := 0
    for n := range in {
        s += n
    }
    return s
}

// Run full:
//   ctx, cancel := context.WithCancel(context.Background())
//   defer cancel()
//   result := sumAll(square(ctx, gen(ctx, 1,2,3,4,5,6,7,8,9,10)))
//   // 385

// Cancel test:
//   ctx, cancel := context.WithTimeout(context.Background(), 1*time.Millisecond)
//   defer cancel()
//   // result < 385, không leak goroutine
\`\`\`

**Verify cancel không leak**: chạy \`runtime.NumGoroutine()\` trước và sau pipeline. Nếu pipeline đã cleanup, số goroutine không tăng.

### Lời giải BT3 — Fan-in

\`\`\`go
func merge(ctx context.Context, srcs ...<-chan int) <-chan int {
    out := make(chan int)
    var wg sync.WaitGroup
    wg.Add(len(srcs))
    for _, src := range srcs {
        go func(c <-chan int) {
            defer wg.Done()
            for v := range c {
                select {
                case <-ctx.Done():
                    return
                case out <- v:
                }
            }
        }(src)
    }
    go func() { wg.Wait(); close(out) }()
    return out
}
\`\`\`

**Walk-through**: Mỗi source có 1 goroutine \`range\` riêng. Khi source close → goroutine thoát → wg.Done. Khi mọi source xong → close out → consumer \`range out\` thoát.

### Lời giải BT4 — Rate-limited HTTP

\`\`\`go
func rateLimited(ctx context.Context, urls []string, ratePerSec float64, burst int) []string {
    // Token bucket đơn giản — không cần lib ngoài.
    tokens := make(chan struct{}, burst)
    // Fill burst.
    for i := 0; i < burst; i++ {
        tokens <- struct{}{}
    }
    // Refill mỗi (1/rate) giây.
    interval := time.Duration(float64(time.Second) / ratePerSec)
    go func() {
        ticker := time.NewTicker(interval)
        defer ticker.Stop()
        for {
            select {
            case <-ctx.Done():
                return
            case <-ticker.C:
                select {
                case tokens <- struct{}{}: // refill 1 token, drop nếu đầy
                default:
                }
            }
        }
    }()

    var results []string
    var mu sync.Mutex
    var wg sync.WaitGroup
    for _, u := range urls {
        select {
        case <-ctx.Done():
            return results
        case <-tokens:
        }
        wg.Add(1)
        go func(u string) {
            defer wg.Done()
            // simulate HTTP fetch
            time.Sleep(10 * time.Millisecond)
            mu.Lock()
            results = append(results, "fetched:"+u)
            mu.Unlock()
        }(u)
    }
    wg.Wait()
    return results
}
\`\`\`

**Verify time**: với 100 URL, rate 10 ops/s, burst 5 — burst xử 5 ngay, 95 còn lại cần \`95/10 = 9.5s\`. Tổng ~9.5–10s.

### Lời giải BT5 — errgroup fetch 10 URL

\`\`\`go
// Pseudocode (errgroup không có trong stdlib, cần go get golang.org/x/sync):
import "golang.org/x/sync/errgroup"

func fetchAll(parent context.Context, urls []string) error {
    g, ctx := errgroup.WithContext(parent)
    for _, u := range urls {
        u := u
        g.Go(func() error {
            return fakeFetch(ctx, u)
        })
    }
    return g.Wait()
}

func fakeFetch(ctx context.Context, url string) error {
    if strings.Contains(url, "broken") {
        return errors.New("404: " + url)
    }
    select {
    case <-time.After(50 * time.Millisecond):
        return nil
    case <-ctx.Done():
        return ctx.Err()
    }
}
\`\`\`

Test: gọi với \`["a", "b", "broken", "d", ...]\`. \`g.Wait()\` trả \`404: broken\`. Các URL khác bị cancel qua ctx ngay khi "broken" fail.

### Lời giải BT6 — Singleflight

\`\`\`go
import "golang.org/x/sync/singleflight"

var (
    sf       singleflight.Group
    dbCalls  int64
)

func getUser(id int) (string, error) {
    key := fmt.Sprintf("user:%d", id)
    v, err, _ := sf.Do(key, func() (interface{}, error) {
        atomic.AddInt64(&dbCalls, 1)
        time.Sleep(100 * time.Millisecond) // simulate DB
        return fmt.Sprintf("user_%d_data", id), nil
    })
    if err != nil {
        return "", err
    }
    return v.(string), nil
}

// Test:
//   var wg sync.WaitGroup
//   for i := 0; i < 100; i++ {
//       wg.Add(1)
//       go func() { defer wg.Done(); getUser(42) }()
//   }
//   wg.Wait()
//   // atomic.LoadInt64(&dbCalls) == 1
\`\`\`

**Walk-through**: 100 goroutine cùng gọi \`sf.Do("user:42", ...)\`. Goroutine đầu tiên (race winner) chạy fn, 99 cái còn lại block ở \`sf.Do\`. Sau 100ms, fn return, 100 caller cùng nhận giá trị. \`dbCalls\` increment đúng 1 lần.

### Lời giải BT7 — Graceful shutdown

\`\`\`go
func runGracefulServer() {
    mux := http.NewServeMux()
    mux.HandleFunc("/slow", func(w http.ResponseWriter, r *http.Request) {
        select {
        case <-time.After(3 * time.Second):
            w.Write([]byte("slow done\\n"))
        case <-r.Context().Done():
            // request cancelled
        }
    })
    srv := &http.Server{Addr: ":8080", Handler: mux}

    serverErr := make(chan error, 1)
    go func() {
        if err := srv.ListenAndServe(); !errors.Is(err, http.ErrServerClosed) {
            serverErr <- err
        }
    }()

    // Sau 100ms, gửi request /slow (background)
    go func() {
        time.Sleep(100 * time.Millisecond)
        resp, err := http.Get("http://localhost:8080/slow")
        if err != nil {
            log.Printf("client error: %v", err)
            return
        }
        defer resp.Body.Close()
        log.Printf("client got status %d", resp.StatusCode)
    }()

    // Sau 200ms, trigger shutdown
    time.Sleep(200 * time.Millisecond)
    log.Println("triggering shutdown...")

    shutdownCtx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
    defer cancel()
    if err := srv.Shutdown(shutdownCtx); err != nil {
        log.Printf("shutdown error: %v", err)
    } else {
        log.Println("shutdown clean")
    }
}
\`\`\`

**Verify**: client request lúc t=100ms vào handler, sleep 3s. Shutdown gọi lúc t=200ms với timeout 5s. Shutdown chờ in-flight handler xong (~2.8s nữa). Handler return status 200 lúc t=3.1s. Shutdown return clean.

Nếu thay timeout = \`1*time.Second\`: Shutdown return \`context deadline exceeded\` ở t=1.2s, handler chưa xong → request bị drop.

---

## Code & Minh họa

- [solutions.go](./solutions.go) — tất cả pattern, biên dịch được, chạy \`go run solutions.go\`.
- [visualization.html](./visualization.html) — 3 module tương tác: Worker pool simulator, Pipeline visualizer, Rate limiter token bucket.

---

## Bài tiếp theo

- [Lesson 37 — Advanced Testing](../lesson-37-advanced-testing/) — testing concurrent code, race detector, fuzz testing, table-driven nâng cao.

## Tham khảo

- [Go Concurrency Patterns — Rob Pike](https://www.youtube.com/watch?v=f6kdp27TYZs) (talk gốc 2012, vẫn cập nhật).
- [pkg.go.dev/golang.org/x/sync](https://pkg.go.dev/golang.org/x/sync) — errgroup, singleflight, semaphore.
- [pkg.go.dev/golang.org/x/time/rate](https://pkg.go.dev/golang.org/x/time/rate) — rate limiter.
- [github.com/sony/gobreaker](https://github.com/sony/gobreaker) — circuit breaker.
- [Concurrency in Go — Katherine Cox-Buday, O'Reilly](https://www.oreilly.com/library/view/concurrency-in-go/9781491941294/) — sách chi tiết nhất.
`;
