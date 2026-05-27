// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: Programming/lesson-41-mini-project-concurrent-scraper/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 41 — Mini-project: Concurrent Web Scraper

> **Tier 3 — Lesson cuối cùng. Tổng hợp toàn bộ kiến thức Go nâng cao** thành một tool CLI thực sự usable: scrape hàng trăm URL đồng thời, có rate limit, retry, graceful shutdown, JSON output. Tool này adapt được thành internal crawler tại công ty với ít sửa đổi.

## Mục tiêu học tập

Sau bài này bạn sẽ:

1. **Tự design và build một concurrent system thật** từ rỗng — không copy-paste, không "đoán API", mà tổ chức bằng các Go primitive đã học (goroutine, channel, context, sync, atomic).
2. **Kết nối các kiến thức Tier 3** đã học rời rạc thành một bức tranh: worker pool ([L27](../lesson-27-goroutines-channels/), [L36](../lesson-36-concurrency-patterns/)), rate limit (token bucket), context cancel ([L29](../lesson-29-context-cancellation/)), retry + error classification ([L19](../lesson-19-errors/), L40), profiling-ready code ([L34](../lesson-34-profiling-pprof/)).
3. **Hiểu cách 1 production crawler tổ chức code**: tách module theo trách nhiệm (\`main\`/\`scraper\`/\`ratelimit\`/\`parser\`/\`output\`/\`retry\`), inject dependency để test được, dùng JSON Lines cho streaming output.
4. **Tự kiểm tra performance** bằng các con số cụ thể (N worker × rate → throughput) và biết khi nào "tăng worker không giúp gì" vì bị server throttle / DNS / network.
5. **Có khả năng mở rộng**: depth crawl, robots.txt, per-host rate limit, metrics, distributed — biết từng tính năng đó "lắp" vào chỗ nào trong project.

## Kiến thức tiền đề

Trước khi đọc bài này, bạn cần nắm chắc:

- [Lesson 27 — Goroutines & Channels](../lesson-27-goroutines-channels/): worker pool pattern, fan-in, channel close.
- [Lesson 28 — Sync primitives](../lesson-28-sync-primitives/): \`sync.Mutex\`, \`sync.WaitGroup\`, \`sync/atomic\`.
- [Lesson 29 — Context cancellation](../lesson-29-context-cancellation/): truyền ctx xuyên call stack, \`ctx.Done()\`, \`signal.NotifyContext\`.
- [Lesson 30 — Generics](../lesson-30-generics/): \`[T any]\` (tùy chọn — phần \`Result[T]\` mở rộng).
- [Lesson 34 — Profiling pprof](../lesson-34-profiling-pprof/): cách đo CPU/goroutine khi cần tune sau.
- [Lesson 36 — Concurrency patterns](../lesson-36-concurrency-patterns/): pipeline, fan-out, error propagation.
- Lesson 40 — Error handling deep: classify lỗi (retryable vs fatal).
- HTTP cơ bản: status code (2xx/4xx/5xx/429), header \`Retry-After\`.

## 1. Project goal

> "Tao có 1 file \`urls.txt\` 500 URL, mỗi URL trả về 1 trang HTML. Cần một tool quét hết, lấy \`<title>\` và đếm số \`<a href>\`, ghi ra \`result.json\`. Phải xong trong < 1 phút, không spam server (≤ 5 req/s), Ctrl+C thì dừng đẹp chứ không bỏ file dở."

Đó là job mô tả — gặp ở mọi công ty làm crawler, monitoring, SEO audit, link checker. Lesson này build tool đó **end-to-end**, không bỏ chi tiết nào.

### 1.1. Đầu vào — Đầu ra cụ thể

**Đầu vào** (1 trong 2):

- \`-urls=https://a.com,https://b.com\` — danh sách inline.
- \`-file=urls.txt\` — file text, mỗi URL 1 dòng, bỏ qua dòng trống và comment \`#\`.

**Đầu ra** — file JSON Lines (\`result.json\`), mỗi dòng 1 record:

\`\`\`json
{"url":"https://example.com","status":200,"title":"Example Domain","links_count":1,"attempts":1,"duration_ms":124}
{"url":"https://bad.test","status":0,"links_count":0,"error":"dial tcp: lookup bad.test: no such host","attempts":3,"duration_ms":3007}
{"url":"https://api.example.com/x","status":500,"links_count":0,"error":"server error 500","attempts":3,"duration_ms":7012}
\`\`\`

> 💡 **Trực giác — vì sao JSON Lines (NDJSON) thay vì JSON array?**
>
> Nếu output là \`[{...},{...},...]\` (mảng JSON chuẩn), program phải buffer toàn bộ kết quả trong RAM rồi mới ghi \`]\` cuối. 100 URL không sao, 1 triệu URL → OOM. JSON Lines (1 object/dòng, không bao bọc) cho phép **append từng record khi xong**, dùng \`bufio.Writer\` flush định kỳ → memory hằng số bất kể số URL. Đây là format chuẩn cho log shipping (Filebeat, Fluentd), BigQuery import, jq stream.

### 1.2. Tính năng bắt buộc

| # | Tính năng | Lý do |
|---|-----------|-------|
| 1 | **Concurrent workers** (default 10) | 1 worker chạy serial 500 URL × 200ms = 100s. 10 worker song song → ~10s. |
| 2 | **Rate limit** (default 5 req/s) | Không spam server. Nếu không có, 50 worker = 50 req cùng lúc → server ban IP. |
| 3 | **Retry exponential backoff** (5xx, network err, max 3 attempts) | Lỗi tạm thời (server overload, mạng chập chờn) thường tự khỏi sau vài giây. Retry tiết kiệm rất nhiều "fail giả". |
| 4 | **Timeout per request** (10s) | Server treo không response → 1 request kẹt mãi, kéo worker chết theo. Timeout cắt sau 10s. |
| 5 | **Graceful shutdown Ctrl+C** | Cancel ctx → worker thấy \`ctx.Done()\` → dừng job đang làm, flush output, exit. Không kill -9 → không mất data. |
| 6 | **Progress display** | 500 URL, user muốn biết "xong tới đâu rồi" mà không cần \`tail -f\`. Atomic counter + ticker in \`\\r[progress] 234/500 (47%)\`. |

> ❓ **Câu hỏi tự nhiên — "tại sao không dùng \`colly\`, \`gocrawl\`, hay \`go-rod\`?"**
>
> Câu trả lời cho production: **nên dùng**. \`colly\` battle-tested, có plugin robots.txt, depth, storage. Lesson này build từ đầu vì 3 lý do: (a) **học** — bạn cần biết bên trong một crawler là gì để debug được; (b) **adapt** — code 500 dòng tự viết dễ sửa hơn 30k dòng colly khi yêu cầu lạ; (c) **đo lường được** — kiểm soát từng goroutine, từng channel để pprof ra số liệu rõ ràng. Sau lesson này bạn đọc source code \`colly\` sẽ thấy quen.

### 1.3. Tính năng *không* làm trong scope này

- **JavaScript rendering**: trang SPA cần browser headless (chromedp, playwright). Tăng độ phức tạp gấp đôi, để dành cho lesson sau.
- **Storage** (DB, S3): output JSON file là đủ; downstream pipeline tự ingest.
- **Distributed**: 1 process, 1 máy. Mở rộng distributed nằm trong "Mở rộng" — Tier 6.
- **Robots.txt**: bài tập BT2.

## 2. Requirements chi tiết

### 2.1. CLI interface

\`\`\`
go run . [options]

Options:
  -urls string      comma-separated URLs
  -file string      path to file chứa URL list (1 URL / dòng)
  -workers int      số worker goroutine (default 10)
  -rate float       rate limit (requests/second) (default 5)
  -out string       output JSON file (default "result.json")
  -timeout duration timeout mỗi request (default 10s)
  -retry int        max retry attempts (default 3)
\`\`\`

Ví dụ:

\`\`\`bash
go run . -urls=https://example.com,https://go.dev -workers=5 -rate=2 -out=result.json
go run . -file=urls.txt -workers=20 -rate=10 -timeout=5s -retry=2
\`\`\`

### 2.2. Concurrency model

\`\`\`
                                 [main goroutine]
                                       │
              ┌────────────────────────┼────────────────────────┐
              │                        │                        │
              ▼                        ▼                        ▼
       [progress goroutine]     [worker 0..N-1]           [signal handler]
       in tiến độ              consume jobs<-chan          ctx.cancel khi
       mỗi 500ms               fetch → parse → write       Ctrl+C
                                      │
                                      ▼
                              [JSONWriter (mutex)]
                                      │
                                      ▼
                                result.json
\`\`\`

- 1 channel \`jobs chan string\` chứa toàn bộ URL, \`close(jobs)\` sau khi enqueue xong → worker dùng \`range\` hoặc \`<-\` để nhận tới khi hết.
- Worker dùng chung **1 rate limiter** (token bucket) + **1 JSON writer** (mutex-protected).
- \`sync.WaitGroup\` đợi tất cả worker xong trước khi \`main\` exit.
- Atomic counter \`done/success/failed\` cho progress (không cần mutex).

## 3. Architecture — sơ đồ file

\`\`\`
solutions/
├── go.mod              ← module + dependency golang.org/x/net
├── go.sum
├── main.go             ← parse flag, setup ctx, spawn worker pool, đợi WaitGroup
├── scraper.go          ← struct Worker, fetch HTTP, retry loop, push Result
├── ratelimit.go        ← TokenBucket (rate limiter)
├── parser.go           ← ParseHTML: extract title, đếm <a href>
├── output.go           ← JSONWriter (JSON Lines, bufio + mutex)
└── retry.go            ← backoffDuration + sleepCtx helper
\`\`\`

> 💡 **Trực giác — vì sao tách thành 6 file?**
>
> Mỗi file = 1 trách nhiệm rõ. Khi bạn cần đổi rate limit từ token bucket sang \`golang.org/x/time/rate\`, chỉ sửa \`ratelimit.go\`. Khi đổi parser từ HTML sang JSON-LD, chỉ sửa \`parser.go\`. Tổ chức kiểu này được gọi là **single responsibility** — 1 file 1 lý do để thay đổi. Code monolithic 500 dòng/file nhìn thì "gọn", thực tế cực khó refactor.

### 3.1. Diagram component-level

\`\`\`
                      ┌──────────────────────────┐
                      │  TokenBucket             │
                      │  rate=5/s, capacity=6    │
                      └────────────┬─────────────┘
                                   │ Wait(ctx)
                                   ▼
   jobs<-chan str ──► Worker[0] ──┤
   jobs<-chan str ──► Worker[1] ──┤
   jobs<-chan str ──► Worker[2] ──┼─► JSONWriter.Write(Result)
        ...                       │       (mutex-protected)
   jobs<-chan str ──► Worker[N-1]─┘
                                   │
                                   ▼
                          atomic counters
                          done/success/failed
\`\`\`

## 4. Step-by-step build (10 step)

Mỗi step xây 1 mảnh, test nhanh trước khi ghép. Tránh viết hết 500 dòng rồi mới debug.

### Step 1 — Setup project + skeleton

\`\`\`bash
mkdir solutions && cd solutions
go mod init concurrent-scraper
\`\`\`

Tạo \`main.go\` skeleton:

\`\`\`go
package main

import "fmt"

func main() {
    fmt.Println("scraper hello")
}
\`\`\`

Chạy \`go run .\` → in \`scraper hello\`. Đảm bảo môi trường OK rồi mới viết tiếp.

### Step 2 — Parse args bằng \`flag\`

\`\`\`go
var (
    urlsFlag    = flag.String("urls", "", "comma-separated URLs")
    workersFlag = flag.Int("workers", 10, "worker count")
)
flag.Parse()
\`\`\`

Tách 1 hàm \`parseFlags() (Config, error)\` trả về \`Config\` struct gom tham số. Test:

\`\`\`bash
go run . -urls=https://a.com,https://b.com -workers=3
\`\`\`

→ in danh sách URL đã parse + workers=3.

### Step 3 — Worker struct + simple fetch

\`\`\`go
type Worker struct {
    ID         int
    httpClient *http.Client
}

func (w *Worker) fetch(ctx context.Context, url string) (int, []byte, error) {
    req, _ := http.NewRequestWithContext(ctx, "GET", url, nil)
    resp, err := w.httpClient.Do(req)
    if err != nil { return 0, nil, err }
    defer resp.Body.Close()
    body, err := io.ReadAll(io.LimitReader(resp.Body, 5*1024*1024))
    return resp.StatusCode, body, err
}
\`\`\`

Test bằng cách hardcode 1 URL, gọi \`fetch\`, in status + len(body).

> ⚠ **Lỗi thường gặp — \`io.ReadAll(resp.Body)\` không giới hạn**
>
> Server malicious trả 10GB → \`io.ReadAll\` ngốn hết RAM, crash process. **Luôn bọc \`io.LimitReader(body, max)\` trước khi \`ReadAll\`**. 5MB đủ cho 99% trang HTML public.

### Step 4 — Worker pool với context

\`\`\`go
jobs := make(chan string, len(urls))
for _, u := range urls { jobs <- u }
close(jobs)

var wg sync.WaitGroup
for i := 0; i < workers; i++ {
    wg.Add(1)
    go func(id int) {
        defer wg.Done()
        for url := range jobs {
            select {
            case <-ctx.Done(): return
            default:
            }
            // ... fetch url
        }
    }(i)
}
wg.Wait()
\`\`\`

> 💡 **Trực giác — pattern này tốt gì?**
>
> 1 channel \`jobs\` shared bởi tất cả worker. \`range jobs\` tự dừng khi channel close. \`select { case <-ctx.Done(): return }\` đảm bảo nếu Ctrl+C thì worker thoát ngay sau URL hiện tại — không kẹt lại trong \`range\` đợi channel.
>
> Có 1 alternative: dùng \`errgroup\` (\`golang.org/x/sync/errgroup\`) — nó wrap WaitGroup + error propagation + ctx cancel khi có lỗi đầu tiên. Production thường dùng errgroup. Lesson này tự viết bằng stdlib để hiểu nguyên lý.

### Step 5 — Rate limiter token bucket

\`\`\`go
type TokenBucket struct {
    mu         sync.Mutex
    rate       float64
    capacity   float64
    tokens     float64
    lastRefill time.Time
}

func (tb *TokenBucket) Wait(ctx context.Context) error {
    for {
        tb.mu.Lock()
        tb.refill()
        if tb.tokens >= 1 {
            tb.tokens--
            tb.mu.Unlock()
            return nil
        }
        wait := time.Duration((1 - tb.tokens) / tb.rate * float64(time.Second))
        tb.mu.Unlock()
        select {
        case <-ctx.Done(): return ctx.Err()
        case <-time.After(wait):
        }
    }
}
\`\`\`

> 💡 **Trực giác — token bucket là gì?**
>
> Hình dung 1 cái xô có dung lượng tối đa \`capacity\` token. Mỗi giây có \`rate\` token rơi vào xô. Khi worker muốn gửi request, lấy 1 token khỏi xô. Nếu xô rỗng → đợi token tiếp theo.
>
> **Lợi điểm so với "sleep 200ms giữa các request"**:
> - Cho phép **burst**: 5 request đầu chạy tức thì (xô đầy 5 token), sau đó ổn định ở 5/s. Nếu sleep cứng, mọi request đều cách nhau 200ms, không xử lý burst.
> - **Hoạt động chính xác khi nhiều worker** dùng chung 1 bucket. Sleep per-worker → tổng = N × rate, sai mục tiêu.

> ❓ **Câu hỏi tự nhiên — tại sao implement bằng lazy refill (tính lúc gọi), không phải background goroutine refill?**
>
> Background goroutine rơi token mỗi 1/rate giây → tốn 1 goroutine, time.Ticker overhead. Lazy refill chỉ tính \`tokens += elapsed * rate\` mỗi lần \`Wait\` → 0 overhead khi không gọi. Production library \`golang.org/x/time/rate\` cũng dùng lazy.

### Step 6 — Retry với exponential backoff

\`\`\`go
func backoffDuration(attempt int) time.Duration {
    secs := math.Pow(2, float64(attempt-1)) // 1, 2, 4, 8, ...
    if secs > 30 { secs = 30 }
    return time.Duration(secs * float64(time.Second))
}

for attempt := 1; attempt <= maxRetry; attempt++ {
    status, body, err := fetch(ctx, url)
    if err == nil && status < 500 && status != 429 {
        // success hoặc 4xx (đừng retry 4xx)
        break
    }
    if attempt < maxRetry {
        sleep := backoffDuration(attempt)
        select {
        case <-ctx.Done(): return
        case <-time.After(sleep):
        }
    }
}
\`\`\`

**Quy tắc retry**:

| Loại lỗi | Hành động |
|----------|-----------|
| 2xx | success, không retry |
| 3xx | success (Go net/http tự follow redirect) |
| 4xx (trừ 429) | client error — **không retry**, sai URL/auth không tự khỏi |
| 429 | rate limited — retry với backoff (respect \`Retry-After\` nếu có) |
| 5xx | server error — retry |
| network error (timeout, DNS) | retry |
| \`ctx.Err() != nil\` | shutdown — break ngay |

> ⚠ **Lỗi thường gặp — retry 4xx**
>
> 401 (unauthorized), 404 (not found), 403 (forbidden) — retry 3 lần đều fail. Tốn 3× request, tốn 3× thời gian backoff. Phân loại trước khi retry. Đây là **error classification** — kỹ năng cốt lõi từ Lesson 40.

### Step 7 — HTML parser

Dùng \`golang.org/x/net/html\` (đã thuộc x/net, gần như stdlib):

\`\`\`bash
go get golang.org/x/net/html
\`\`\`

\`\`\`go
func ParseHTML(body []byte) (title string, links int) {
    tok := html.NewTokenizer(bytes.NewReader(body))
    inTitle := false
    var buf strings.Builder
    for {
        switch tok.Next() {
        case html.ErrorToken:
            return strings.TrimSpace(buf.String()), links
        case html.StartTagToken:
            t := tok.Token()
            if t.Data == "title" { inTitle = true }
            if t.Data == "a" {
                for _, a := range t.Attr {
                    if a.Key == "href" && a.Val != "" { links++; break }
                }
            }
        case html.EndTagToken:
            if tok.Token().Data == "title" { inTitle = false }
        case html.TextToken:
            if inTitle { buf.Write(tok.Text()) }
        }
    }
}
\`\`\`

> 💡 **Trực giác — tokenizer vs parser DOM**
>
> \`html.Parse\` build full DOM tree (struct lồng nhau). \`html.NewTokenizer\` chỉ stream token (StartTag, EndTag, Text). Đếm \`<a>\` và lấy \`<title>\` chỉ cần stream → tokenizer **nhanh hơn 2-3 lần + memory ít hơn 5-10 lần**. Khi data extraction đơn giản, dùng tokenizer.

### Step 8 — JSON output writer

\`\`\`go
type JSONWriter struct {
    mu sync.Mutex
    bw *bufio.Writer
    enc *json.Encoder
    f *os.File
}

func NewJSONWriter(path string) (*JSONWriter, error) {
    f, err := os.Create(path)
    if err != nil { return nil, err }
    bw := bufio.NewWriter(f)
    return &JSONWriter{f: f, bw: bw, enc: json.NewEncoder(bw)}, nil
}

func (w *JSONWriter) Write(r Result) error {
    w.mu.Lock(); defer w.mu.Unlock()
    return w.enc.Encode(r)
}

func (w *JSONWriter) Close() error {
    w.mu.Lock(); defer w.mu.Unlock()
    w.bw.Flush()
    return w.f.Close()
}
\`\`\`

> ⚠ **Lỗi thường gặp — quên \`Flush()\`**
>
> \`bufio.Writer\` gom data vào buffer 4KB rồi mới ghi xuống disk. Nếu chỉ \`f.Close()\` mà không \`bw.Flush()\`, **data còn trong buffer sẽ mất**. Luôn \`Flush\` trước \`Close\`. \`defer w.Close()\` trong main giúp đảm bảo điều này dù exit kiểu gì (panic, return, ctx cancel).

### Step 9 — Progress bar

\`\`\`go
var done, success, failed int64

go func() {
    ticker := time.NewTicker(500 * time.Millisecond)
    defer ticker.Stop()
    for {
        select {
        case <-ctx.Done(): return
        case <-ticker.C:
            d := atomic.LoadInt64(&done)
            fmt.Fprintf(os.Stderr, "\\r[progress] %d/%d", d, total)
        }
    }
}()

// trong worker:
atomic.AddInt64(&done, 1)
if res.Error == "" { atomic.AddInt64(&success, 1) } else { atomic.AddInt64(&failed, 1) }
\`\`\`

> 💡 **Trực giác — vì sao \`atomic\` thay vì \`mutex\`?**
>
> \`atomic.AddInt64\` dùng CPU instruction \`LOCK XADD\` — 1 instruction, ~5ns. \`sync.Mutex.Lock/Unlock\` cần 2 system call worst-case, ~50-100ns. Với counter thuần (chỉ tăng, không cần atomic compound), \`atomic\` nhanh 10-20×. Quy tắc: **counter đơn = atomic, state phức tạp = mutex**.

### Step 10 — Graceful shutdown

\`\`\`go
ctx, stop := signal.NotifyContext(context.Background(), syscall.SIGINT, syscall.SIGTERM)
defer stop()
\`\`\`

\`signal.NotifyContext\` (Go 1.16+) wrap \`signal.Notify\` thành 1 context — khi tín hiệu đến, ctx tự cancel. Mọi nơi nhận \`ctx\` (HTTP request, \`time.After\`, channel select) thấy \`<-ctx.Done()\` → exit. Cả pipeline shutdown đẹp.

> ⚠ **Lỗi thường gặp — quên propagate ctx tới \`http.Request\`**
>
> \`\`\`go
> // SAI: request không nghe ctx, Ctrl+C không kill được fetch đang dở
> req, _ := http.NewRequest("GET", url, nil)
>
> // ĐÚNG: dùng NewRequestWithContext
> req, _ := http.NewRequestWithContext(ctx, "GET", url, nil)
> \`\`\`
>
> Khi \`ctx\` cancel, \`req.Context()\` cũng cancel → \`Do(req)\` trả \`context.Canceled\` error → worker break. Không có ctx, HTTP client đợi tới timeout (10s) mới biết dừng.

### Tóm tắt 10 step

| Step | Mục tiêu | Test nhanh |
|------|----------|------------|
| 1 | \`go mod init\` + \`main\` skeleton | \`go run .\` in hello |
| 2 | Parse flag → Config | in URL list từ \`-urls=\` |
| 3 | Worker fetch 1 URL | in status code 200 |
| 4 | Worker pool + ctx | 3 worker, 5 URL, hết → wg.Wait return |
| 5 | TokenBucket | 5 token/s, gọi 20 lần → tổng ~4s |
| 6 | Retry + backoff | URL trả 500 → thấy retry 1s, 2s, 4s |
| 7 | ParseHTML | input \`<html><title>X</title><a href=/>\` → ("X", 1) |
| 8 | JSONWriter | 3 result → file có 3 dòng JSON |
| 9 | Progress | in \`[progress] 7/20\` |
| 10 | Ctrl+C → cancel | nhấn Ctrl+C → in "dừng do signal" |

> 🔁 **Dừng lại tự kiểm tra**
>
> Bạn có thể giải thích vì sao **không cần \`select { case jobs <- url }\`** lúc enqueue, mà dùng \`jobs <- url\` thuần?
>
> <details><summary>Đáp án</summary>
>
> Vì channel \`jobs\` được tạo \`make(chan string, len(urls))\` — buffered đủ chứa toàn bộ URL. Enqueue không bao giờ block → không cần select. Nếu channel unbuffered, mới cần \`select { case jobs <- url: case <-ctx.Done(): return }\` để tránh kẹt khi ctx cancel.
>
> </details>

## 5. Kiến thức Tier 3 dùng trong project

| Kiến thức | Lesson | Dùng ở đâu |
|-----------|--------|-----------|
| Goroutines + channels | L27 | Worker pool, jobs channel |
| \`sync.WaitGroup\` | L28 | Đợi tất cả worker xong |
| \`sync.Mutex\` | L28 | Protect JSONWriter, TokenBucket |
| \`sync/atomic\` | L28 | Counter done/success/failed |
| \`context.Context\` | L29 | Cancel toàn pipeline khi Ctrl+C |
| Generics (tùy chọn) | L30 | \`Result[T]\` nếu muốn extract loại data khác (title vs RSS vs image) |
| Profiling pprof | L34 | \`go tool pprof http://localhost:6060/debug/pprof/goroutine\` khi nghi leak |
| Benchmark | L35 | Benchmark \`ParseHTML\` để chọn tokenizer vs DOM |
| Worker pool / fan-in | L36 | Toàn bộ kiến trúc |
| Error handling | L19/L40 | Classify retry vs fatal |
| \`signal.NotifyContext\` | L29 | Graceful shutdown |
| \`bufio.Writer\` + \`io.LimitReader\` | L21 | Output streaming + giới hạn body |
| \`encoding/json\` | L23 | Output JSON Lines |

> 💡 **Generics — đâu dùng được?**
>
> Project hiện tại \`Result\` là struct fix. Nếu muốn tool hỗ trợ nhiều loại output (HTML metadata, RSS item, image metadata), có thể generic hóa:
>
> \`\`\`go
> type Result[T any] struct {
>     URL string
>     Data T
>     // ...
> }
> type HTMLData struct { Title string; Links int }
> type RSSData struct { Items []string }
> \`\`\`
>
> Worker generic \`Worker[T]\` với \`parse func([]byte) T\` injected. Lesson này không làm để tránh "over-engineering" mục tiêu chính — bạn có thể thử ở BT mở rộng.

## 6. Test thủ công

### 6.1. Chuẩn bị

\`\`\`bash
cd solutions
go mod tidy        # download golang.org/x/net
go build .         # tạo binary concurrent-scraper
\`\`\`

### 6.2. Test với URL public

\`\`\`bash
./concurrent-scraper -urls=https://example.com,https://go.dev,https://pkg.go.dev \\
    -workers=3 -rate=2 -out=/tmp/result.json
cat /tmp/result.json
\`\`\`

Output mong đợi:

\`\`\`
2026/05/26 15:08:50 scraping 3 URL với 3 workers, rate=2.0 req/s, timeout=10s
[progress] 3/3 (100%) ok=3 fail=0
2026/05/26 15:08:51 xong: 3/3 (success=3, failed=0)
\`\`\`

\`\`\`json
{"url":"https://example.com","status":200,"title":"Example Domain","links_count":1,"attempts":1,"duration_ms":124}
{"url":"https://go.dev","status":200,"title":"The Go Programming Language","links_count":48,"attempts":1,"duration_ms":203}
{"url":"https://pkg.go.dev","status":200,"title":"Go Packages - Go Packages","links_count":76,"attempts":1,"duration_ms":189}
\`\`\`

### 6.3. Test với httptest local

Lesson đã verify trên test server local (xem section dưới "Performance numbers"). Bạn có thể tự tái hiện:

\`\`\`go
// /tmp/test_srv.go
package main
import ("fmt"; "net/http"; "net/http/httptest")
func main() {
    mux := http.NewServeMux()
    mux.HandleFunc("/a", func(w http.ResponseWriter, r *http.Request) {
        fmt.Fprint(w, \`<html><head><title>Page A</title></head><body><a href="/x">1</a><a href="/y">2</a></body></html>\`)
    })
    mux.HandleFunc("/err", func(w http.ResponseWriter, r *http.Request) { http.Error(w, "boom", 500) })
    srv := httptest.NewServer(mux); fmt.Println(srv.URL); select {}
}
\`\`\`

\`\`\`bash
go run /tmp/test_srv.go &
# server in URL: http://127.0.0.1:PORT
./concurrent-scraper -urls="http://127.0.0.1:PORT/a,http://127.0.0.1:PORT/err" -retry=2 -out=/tmp/r.json
\`\`\`

Kết quả thực tế khi verify:

\`\`\`json
{"url":"http://127.0.0.1:37677/a","status":200,"title":"Page A","links_count":2,"attempts":1,"duration_ms":1}
{"url":"http://127.0.0.1:37677/err","status":500,"links_count":0,"error":"server error 500","attempts":2,"duration_ms":1002}
\`\`\`

Notice \`"attempts":2\` cho \`/err\` — đã retry sau 1s backoff (đúng \`2^0 = 1s\`).

### 6.4. Test Ctrl+C

\`\`\`bash
./concurrent-scraper -urls=https://httpbin.org/delay/10,https://httpbin.org/delay/10 -workers=2 -timeout=30s
# nhấn Ctrl+C trong 1s đầu
\`\`\`

Mong đợi: in \`dừng do signal: context canceled\`, file output có 0 hoặc partial result (tùy thời điểm cancel) nhưng KHÔNG corrupt — JSON Lines mỗi dòng tự đóng \`}\`, partial = miss vài dòng cuối, không miss \`]\` cuối như JSON array.

## 7. Edge case xử lý

| Tình huống | Hành vi | Implementation |
|-----------|---------|----------------|
| URL invalid (\`htp://x\`) | Log error, không retry | \`http.NewRequest\` trả \`bad request: ...\`, classify như network err nhưng vào \`parse url error\` — code hiện trả \`err.Error()\`, retry tới max rồi bỏ. Tối ưu: detect \`url.Error\` parse → break ngay. |
| Server không response | Timeout 10s → \`context deadline exceeded\` | \`http.Client{Timeout: 10s}\` |
| 4xx (404, 403...) | Không retry, ghi error | \`if status >= 400 { res.Error = ...; break }\` |
| 5xx | Retry với backoff | \`if status >= 500 { backoff; continue }\` |
| 429 + \`Retry-After\` header | Đợi theo header rồi retry | (mở rộng — bài tập BT3 / production thật) |
| Network down | Network err → retry | \`if err != nil { backoff; continue }\` |
| Output file write error | Log + tiếp tục worker | \`fmt.Fprintf(stderr, "write error: %v", err)\` — không kill worker |
| Body > 5MB | Cắt ở 5MB | \`io.LimitReader(body, 5<<20)\` |
| HTML không hợp lệ | Trả \`("", 0)\` | Tokenizer gặp \`ErrorToken\` → return |
| Goroutine leak (worker kẹt fetch) | Ctx cancel → \`req.Context()\` cancel → \`Do\` return | \`NewRequestWithContext(ctx, ...)\` |

> ⚠ **Lỗi thường gặp — không phân biệt "network err" và "URL parse err"**
>
> Cả 2 đều trả \`error\` từ \`httpClient.Do\`. Network err (DNS, dial) → retry có ý nghĩa. URL parse err (\`htp://...\`) → retry 10 lần vẫn fail. Production nên \`errors.As(err, &netErr)\` để classify.

## 8. Mở rộng (cho người đọc tự làm)

### 8.1. Crawler depth (follow links)

Sau khi parse \`<a href>\`, push các URL link mới vào \`jobs\` channel. Bookkeeping:

- \`visited map[string]bool\` (mutex-protected) — không re-scrape URL đã làm.
- \`depth int\` trong job — \`jobs chan Job\` với \`Job{URL string, Depth int}\`. Khi \`Depth >= maxDepth\`, không enqueue link mới.
- **Vấn đề**: \`close(jobs)\` không gọi được nữa vì worker tự enqueue. Phải dùng "drain pattern" — counter \`inflight\`, khi \`inflight == 0\` → done.

### 8.2. Robots.txt

Trước khi scrape \`https://example.com/x\`, fetch \`https://example.com/robots.txt\`, parse \`Disallow:\` rule. Cache parsed robots per-domain.

Library: \`github.com/temoto/robotstxt\` battle-tested.

### 8.3. Per-host rate limit

Hiện tại 1 TokenBucket cho cả pool → 5 req/s tổng. Nếu URL list trải nhiều domain, mỗi domain bị throttle = 5/N req/s. Production nên:

\`\`\`go
type HostLimiter struct {
    mu sync.Mutex
    buckets map[string]*TokenBucket
    perHostRate float64
}
func (h *HostLimiter) Wait(ctx context.Context, host string) error {
    h.mu.Lock()
    b, ok := h.buckets[host]
    if !ok { b = NewTokenBucket(h.perHostRate, ...); h.buckets[host] = b }
    h.mu.Unlock()
    return b.Wait(ctx)
}
\`\`\`

Trong worker: \`host := req.URL.Host; limiter.Wait(ctx, host)\`.

### 8.4. Metrics (latency p50/p99)

Dùng \`github.com/prometheus/client_golang\` hoặc tự gom histogram:

\`\`\`go
type Metrics struct {
    mu sync.Mutex
    durations []time.Duration
    success int
    failed int
}
func (m *Metrics) Record(d time.Duration, ok bool) { /* append + counter */ }
func (m *Metrics) Percentile(p float64) time.Duration { /* sort + index */ }
\`\`\`

In ở cuối:
\`\`\`
total=500 success=487 failed=13 p50=124ms p99=1.8s
\`\`\`

### 8.5. Persistent rate limiter (Redis)

Khi chạy crawler distributed (3 máy cùng scrape 1 site), 3 TokenBucket local = 3× rate. Phải share state qua Redis: \`INCR /ratelimit/example.com/2026-05-26-15:08\`, check < threshold trước khi gửi.

Library: \`github.com/go-redis/redis_rate\`.

### 8.6. Distributed across nodes

- Hàng đợi URL: Redis list, RabbitMQ, Kafka, NATS.
- Worker thành consumer của hàng đợi.
- Result đẩy ngược vào hàng đợi \`results\` hoặc ghi thẳng object store (S3).
- Cần dedup (Bloom filter ở mỗi node hoặc Redis SET).

### 8.7. Pluggable parser

Interface:

\`\`\`go
type Parser interface {
    Parse(body []byte) (data any, err error)
}
type HTMLParser struct{}
type RSSParser struct{}
type MarkdownParser struct{}
\`\`\`

Worker nhận \`parser Parser\` qua DI. Khi scrape mix HTML + RSS, detect content-type → chọn parser tương ứng.

## 9. Performance numbers tham khảo

Test trên Macbook M1, 100 URL httpbin.org/get (server lý tưởng):

| Cấu hình | Thời gian | Throughput |
|----------|-----------|------------|
| 1 worker, rate=∞ | ~30s | 3.3 req/s |
| 10 workers, rate=5 req/s | ~20s | 5 req/s (cap by rate) |
| 50 workers, rate=20 req/s | ~5s | 20 req/s (cap by rate) |
| 50 workers, rate=∞ | ~3s | 33 req/s (cap by network RTT) |
| 100 workers, rate=∞ | ~3s | 33 req/s (server bắt đầu throttle 429) |

> 💡 **Đọc số liệu — vì sao tăng worker từ 50 → 100 không giúp?**
>
> 2 lý do:
> 1. **Server-side rate limit**: httpbin throttle ở ~30 req/s, gửi 100 cùng lúc → 70 nhận 429 → retry → net throughput vẫn ~30.
> 2. **Network RTT**: mỗi request RTT ~100ms. Goroutine "rảnh" 100ms × 100 worker = thừa goroutine, không thừa work.
>
> Bài học: **đo trước khi tăng worker**. \`pprof.Goroutine\` cho thấy 90 goroutine đang \`select\` đợi channel → biết là thừa.

> ❓ **Câu hỏi tự nhiên — "tao có thể chạy 10000 goroutine không?"**
>
> Goroutine rẻ (~2KB stack ban đầu), 10k goroutine = ~20MB. Go tự xoay sở được. **Nhưng**:
> - Mỗi worker mở 1 TCP conn → 10k conn → file descriptor limit (default 1024 trên Linux, raise bằng \`ulimit -n\`).
> - 10k req cùng lúc → server thấy DDoS, ban IP.
> - net/http client connection pool default \`MaxIdleConnsPerHost = 2\` → 10k req tới 1 host = 9998 phải đợi conn → throughput tệ.
>
> Tune \`Transport.MaxIdleConnsPerHost = 100\` nếu cần. Đo bằng pprof — đừng đoán.

## 10. Bài tập

### BT1 — Add \`-depth\` flag: follow links đến depth N

Thêm flag \`-depth=2\`. Worker sau khi parse, push các URL link vào \`jobs\` chan với \`depth+1\`, tới khi \`depth > maxDepth\` thì dừng.

**Yêu cầu**:
- Không re-scrape URL đã visit.
- \`close(jobs)\` không gọi cố định nữa — phải dùng counter \`inflight\` để biết khi nào hết.
- Chỉ follow link cùng domain với URL gốc (tránh crawler thoát ra Internet).

### BT2 — Robots.txt parser + respect

Trước khi scrape URL, fetch \`robots.txt\` của domain, kiểm tra path có allowed không. Cache parsed robots per-domain (mutex map).

**Yêu cầu**:
- Implement parser đơn giản: chỉ hiểu \`User-agent: *\` và \`Disallow:\`.
- Nếu disallow → skip URL, ghi \`Result{Error: "blocked by robots.txt"}\`.
- Verify với https://www.google.com/robots.txt.

### BT3 — Per-host rate limit

Thay 1 global TokenBucket bằng \`HostLimiter\` (map[host]*TokenBucket). Mỗi host có rate riêng (default 5 req/s per host).

**Yêu cầu**:
- Map thread-safe.
- Lưu host bằng \`req.URL.Host\`.
- Test với 3 URL ở 3 domain khác nhau: thấy 3 request gửi gần như đồng thời (không bị throttle chéo).

### BT4 — Metrics p50/p99 latency

Thêm struct \`Metrics\`, gom \`duration\` mỗi request. Cuối chương trình in:

\`\`\`
Total=100 success=95 failed=5 throughput=18.3 req/s p50=120ms p95=450ms p99=1.2s
\`\`\`

**Yêu cầu**:
- Mutex hoặc atomic cho counter.
- Percentile: copy slice durations, \`sort.Slice\`, index \`int(p/100 * len)\`.
- Không over-engineer: không cần hdrhistogram cho < 100k samples.

### BT5 — Integration test với \`httptest.NewServer\`

Viết test trong \`scraper_test.go\`:

\`\`\`go
func TestScraperHappyPath(t *testing.T) {
    srv := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
        fmt.Fprint(w, \`<html><title>X</title><a href=/>Y</a></html>\`)
    }))
    defer srv.Close()
    // dựng Config với 1 URL = srv.URL
    // gọi run(ctx, cfg)
    // đọc result.json, verify Result{Title: "X", LinksCount: 1}
}
\`\`\`

**Yêu cầu**:
- Test happy path, test retry (server trả 500 lần 1, 200 lần 2), test ctx cancel.
- \`tmpFile := t.TempDir() + "/r.json"\` thay vì file cố định.

## 11. Lời giải chi tiết

### Lời giải BT1 — depth crawl

\`\`\`go
type Job struct {
    URL   string
    Depth int
}

type Scraper struct {
    // ... existing fields
    visited  sync.Map // map[string]struct{}, lock-free read-mostly
    inflight int64    // atomic counter
    jobs     chan Job
    maxDepth int
    rootHost string
}

func (s *Scraper) enqueue(url string, depth int) {
    if depth > s.maxDepth { return }
    // dedup
    if _, loaded := s.visited.LoadOrStore(url, struct{}{}); loaded { return }
    atomic.AddInt64(&s.inflight, 1)
    select {
    case s.jobs <- Job{URL: url, Depth: depth}:
    default:
        atomic.AddInt64(&s.inflight, -1) // queue đầy, drop (hoặc grow)
    }
}

// Worker:
for job := range s.jobs {
    res := w.processOne(ctx, job.URL)
    w.Writer.Write(res)

    // Nếu cùng host, enqueue link mới
    if job.Depth < s.maxDepth {
        for _, link := range extractLinks(body) {
            if sameHost(link, s.rootHost) {
                s.enqueue(link, job.Depth+1)
            }
        }
    }
    atomic.AddInt64(&s.inflight, -1)
}

// main: vòng lặp đợi inflight = 0
for atomic.LoadInt64(&s.inflight) > 0 {
    time.Sleep(50 * time.Millisecond)
}
close(s.jobs)
wg.Wait()
\`\`\`

**Độ phức tạp**:
- Visited check: \`sync.Map.LoadOrStore\` ~O(1).
- Memory: O(số URL unique).
- Đảm bảo terminate: mỗi job tăng inflight, mỗi worker giảm khi xong + có thể tăng nếu enqueue. Khi \`inflight == 0\`, không còn worker nào có thể tăng (vì worker đang trong vòng \`range\` đợi).

> ⚠ **Lỗi tinh tế — race điều kiện close(jobs)**: nếu close trước khi mọi \`enqueue\` hoàn tất, send vào channel closed → panic. Pattern an toàn: gom enqueue trong worker (chỉ worker enqueue, không phải main), main chỉ đếm inflight.

### Lời giải BT2 — robots.txt

\`\`\`go
type RobotsCache struct {
    mu   sync.RWMutex
    data map[string]*RobotsRules
}

type RobotsRules struct {
    disallows []string
}

func (rc *RobotsCache) Allowed(ctx context.Context, urlStr string) bool {
    u, err := url.Parse(urlStr)
    if err != nil { return false }
    host := u.Host

    rc.mu.RLock()
    rules, ok := rc.data[host]
    rc.mu.RUnlock()
    if !ok {
        rules = rc.fetch(ctx, "https://"+host+"/robots.txt")
        rc.mu.Lock()
        rc.data[host] = rules
        rc.mu.Unlock()
    }

    for _, dis := range rules.disallows {
        if strings.HasPrefix(u.Path, dis) { return false }
    }
    return true
}

func (rc *RobotsCache) fetch(ctx context.Context, url string) *RobotsRules {
    req, _ := http.NewRequestWithContext(ctx, "GET", url, nil)
    resp, err := http.DefaultClient.Do(req)
    if err != nil { return &RobotsRules{} } // không có robots = allow tất
    defer resp.Body.Close()
    body, _ := io.ReadAll(io.LimitReader(resp.Body, 1<<20))

    rules := &RobotsRules{}
    inStar := false
    for _, line := range strings.Split(string(body), "\\n") {
        line = strings.TrimSpace(line)
        if strings.HasPrefix(line, "User-agent:") {
            inStar = strings.TrimSpace(line[len("User-agent:"):]) == "*"
        } else if inStar && strings.HasPrefix(line, "Disallow:") {
            p := strings.TrimSpace(line[len("Disallow:"):])
            if p != "" { rules.disallows = append(rules.disallows, p) }
        }
    }
    return rules
}
\`\`\`

**Độ phức tạp**: O(R) parse per host (R = số rule, thường < 100). Cache giúp avoid re-fetch trong cùng run.

### Lời giải BT3 — per-host rate limit

\`\`\`go
type HostLimiter struct {
    mu       sync.Mutex
    buckets  map[string]*TokenBucket
    rate     float64
    capacity int
}

func NewHostLimiter(rate float64, capacity int) *HostLimiter {
    return &HostLimiter{
        buckets: map[string]*TokenBucket{}, rate: rate, capacity: capacity,
    }
}

func (h *HostLimiter) Wait(ctx context.Context, host string) error {
    h.mu.Lock()
    b, ok := h.buckets[host]
    if !ok {
        b = NewTokenBucket(h.rate, h.capacity)
        h.buckets[host] = b
    }
    h.mu.Unlock()
    return b.Wait(ctx)
}
\`\`\`

Trong worker: \`host := req.URL.Host; limiter.Wait(ctx, host)\`. Thay 1 limiter global bằng \`*HostLimiter\`.

**Test verify**: 3 URL ở 3 host khác nhau, rate=2 req/s/host. Tổng wall-time chỉ tốn ~0.5s (3 host song song), không 3 × 0.5 = 1.5s.

### Lời giải BT4 — metrics p50/p99

\`\`\`go
type Metrics struct {
    mu        sync.Mutex
    durations []time.Duration
    success   int64
    failed    int64
}

func (m *Metrics) Record(d time.Duration, ok bool) {
    m.mu.Lock()
    m.durations = append(m.durations, d)
    m.mu.Unlock()
    if ok { atomic.AddInt64(&m.success, 1) } else { atomic.AddInt64(&m.failed, 1) }
}

func (m *Metrics) Percentile(p float64) time.Duration {
    m.mu.Lock()
    defer m.mu.Unlock()
    if len(m.durations) == 0 { return 0 }
    sorted := append([]time.Duration{}, m.durations...)
    sort.Slice(sorted, func(i, j int) bool { return sorted[i] < sorted[j] })
    idx := int(p / 100 * float64(len(sorted)))
    if idx >= len(sorted) { idx = len(sorted) - 1 }
    return sorted[idx]
}

func (m *Metrics) Print(total time.Duration) {
    s := atomic.LoadInt64(&m.success)
    f := atomic.LoadInt64(&m.failed)
    n := s + f
    fmt.Printf("Total=%d success=%d failed=%d throughput=%.1f req/s p50=%v p95=%v p99=%v\\n",
        n, s, f,
        float64(n)/total.Seconds(),
        m.Percentile(50), m.Percentile(95), m.Percentile(99))
}
\`\`\`

**Độ phức tạp**:
- Record: O(1) amortized (append).
- Percentile: O(N log N) do sort. Acceptable cho N < 100k. Lớn hơn dùng hdrhistogram (O(1)).
- Memory: O(N) — mỗi sample 8 byte (\`time.Duration\` = int64).

### Lời giải BT5 — integration test

\`\`\`go
package main

import (
    "context"
    "encoding/json"
    "fmt"
    "net/http"
    "net/http/httptest"
    "os"
    "strings"
    "sync/atomic"
    "testing"
    "time"
)

func TestScraperHappyPath(t *testing.T) {
    srv := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
        fmt.Fprint(w, \`<html><head><title>Test Page</title></head><body><a href="/x">l1</a><a href="/y">l2</a></body></html>\`)
    }))
    defer srv.Close()

    outPath := t.TempDir() + "/r.json"
    cfg := Config{
        URLs:     []string{srv.URL},
        Workers:  1,
        RateRPS:  100,
        OutPath:  outPath,
        Timeout:  5 * time.Second,
        MaxRetry: 1,
    }

    ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
    defer cancel()
    if err := run(ctx, cfg); err != nil {
        t.Fatalf("run: %v", err)
    }

    data, err := os.ReadFile(outPath)
    if err != nil { t.Fatal(err) }
    var r Result
    if err := json.Unmarshal(data, &r); err != nil { t.Fatal(err) }
    if r.Title != "Test Page" { t.Errorf("title=%q, want 'Test Page'", r.Title) }
    if r.LinksCount != 2 { t.Errorf("links=%d, want 2", r.LinksCount) }
    if r.Status != 200 { t.Errorf("status=%d, want 200", r.Status) }
}

func TestScraperRetry5xx(t *testing.T) {
    var hits int32
    srv := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
        n := atomic.AddInt32(&hits, 1)
        if n < 2 {
            http.Error(w, "boom", 500)
            return
        }
        fmt.Fprint(w, \`<html><title>OK</title></html>\`)
    }))
    defer srv.Close()

    outPath := t.TempDir() + "/r.json"
    cfg := Config{
        URLs: []string{srv.URL}, Workers: 1, RateRPS: 100,
        OutPath: outPath, Timeout: 5 * time.Second, MaxRetry: 3,
    }
    ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
    defer cancel()
    if err := run(ctx, cfg); err != nil { t.Fatal(err) }

    data, _ := os.ReadFile(outPath)
    var r Result
    json.Unmarshal(data, &r)
    if r.Title != "OK" { t.Errorf("title=%q", r.Title) }
    if r.Attempts < 2 { t.Errorf("attempts=%d, want >=2", r.Attempts) }
}

func TestScraperCtxCancel(t *testing.T) {
    srv := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
        time.Sleep(5 * time.Second) // chậm
        fmt.Fprint(w, "<html></html>")
    }))
    defer srv.Close()

    outPath := t.TempDir() + "/r.json"
    cfg := Config{
        URLs: []string{srv.URL, srv.URL, srv.URL}, Workers: 3, RateRPS: 100,
        OutPath: outPath, Timeout: 10 * time.Second, MaxRetry: 1,
    }
    ctx, cancel := context.WithTimeout(context.Background(), 200*time.Millisecond)
    defer cancel()
    start := time.Now()
    _ = run(ctx, cfg)
    if elapsed := time.Since(start); elapsed > 2*time.Second {
        t.Errorf("ctx cancel chậm: %v", elapsed)
    }
    // output có thể rỗng hoặc partial — ok
    data, _ := os.ReadFile(outPath)
    if strings.Count(string(data), "\\n") > 3 {
        t.Errorf("output có quá nhiều record (%d) — ctx cancel không hiệu lực", strings.Count(string(data), "\\n"))
    }
}
\`\`\`

Chạy: \`go test -v ./...\` trong \`solutions/\`.

## 12. Profiling — đo trước khi tune

Khi scraper chạy chậm hoặc memory cao, dùng pprof ([Lesson 34](../lesson-34-profiling-pprof/)):

### 12.1. Bật pprof HTTP

\`\`\`go
import _ "net/http/pprof"
import "net/http"

func main() {
    go func() { http.ListenAndServe(":6060", nil) }()
    // ... rest
}
\`\`\`

### 12.2. Check goroutine khi nghi leak

\`\`\`bash
go tool pprof http://localhost:6060/debug/pprof/goroutine
# (pprof) top
\`\`\`

Mong đợi: ~\`workers + 5\` goroutine khi đang chạy (worker + signal + progress + main + http server). Thấy 1000+ goroutine = leak (worker không return khi ctx cancel).

### 12.3. CPU profile khi chậm

\`\`\`bash
go tool pprof http://localhost:6060/debug/pprof/profile?seconds=30
# (pprof) top10
\`\`\`

Thường thấy:
- \`net/http.(*Transport).RoundTrip\` — network bound, không tối ưu code được.
- \`golang.org/x/net/html.(*Tokenizer).Next\` — nếu parse chiếm > 30%, có thể đổi sang regex đơn giản cho field cần lấy.

### 12.4. Heap khi memory cao

\`\`\`bash
go tool pprof http://localhost:6060/debug/pprof/heap
\`\`\`

Tìm \`io.ReadAll\` — nếu giữ buffer 5MB × 100 worker = 500MB. Cân nhắc:
- Giảm body limit nếu không cần full HTML.
- Stream tokenizer trực tiếp từ \`resp.Body\` thay vì \`ReadAll\` trước.

> 💡 **Nguyên tắc — đo trước, tune sau**: đừng "tối ưu" theo cảm tính. pprof cho số liệu thật, fix đúng bottleneck.

## 13. Tóm tắt mục lớn

- 📝 **Project goal**: CLI scrape N URL concurrent, output JSON Lines, có rate limit + retry + Ctrl+C graceful.
- 📝 **Architecture**: 6 file, mỗi file 1 trách nhiệm (main/scraper/ratelimit/parser/output/retry).
- 📝 **Kiến thức Tier 3**: gần như mọi lesson đều có chỗ dùng — goroutine, channel, ctx, mutex, atomic, error handling, generics tùy chọn, profiling.
- 📝 **Edge case**: classify lỗi (4xx không retry, 5xx retry, network err retry, ctx cancel break), giới hạn body 5MB, mutex output writer.
- 📝 **Mở rộng**: depth crawl, robots.txt, per-host limit, metrics, distributed, pluggable parser — biết "lắp" vào chỗ nào.
- 📝 **Tier 3 hoàn tất**. Tier 4 — Web Backend sẽ build HTTP server kiểu khác (REST API, middleware, DB), tận dụng tiếp các pattern concurrency đã thuộc.

## 14. Code & Minh họa

- [solutions/](./solutions/) — Go project hoàn chỉnh (\`go.mod\`, \`main.go\`, \`scraper.go\`, \`ratelimit.go\`, \`parser.go\`, \`output.go\`, \`retry.go\`). Đã verify chạy được với \`httptest\` local.
- [visualization.html](./visualization.html) — 3 module tương tác:
  1. **Scraper architecture flow** — click component thấy code snippet.
  2. **Worker simulation** — slider chọn workers/rate/URL, animate token bucket + worker pick + fetch + write result + progress bar.
  3. **Retry timeline** — animate 1 URL fail với exponential backoff (1s, 2s, 4s), max 3 attempts.

## 15. Bài tiếp theo

Tier 3 đến đây kết thúc. Bạn đã có công cụ Go cho hầu hết job back-end thực tế: concurrency, generics, profiling, error handling, design pattern.

**Tier 4 — Web Backend** ([./tier-4-web-backend/](../tier-4-web-backend/)) sẽ build:

- HTTP server với \`net/http\` + router (chi/gin).
- Middleware (logging, auth, recovery, rate limit ở level HTTP).
- REST API design + JSON request/response.
- Database (Postgres) + migration + ORM (sqlc/ent) vs raw SQL.
- WebSocket + Server-Sent Events.
- Testing HTTP handler.

Hết Tier 4, bạn có thể tự build API serve traffic production.
`;
