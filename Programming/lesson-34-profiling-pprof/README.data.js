// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: Programming/lesson-34-profiling-pprof/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 34 — Profiling với \`pprof\`: tìm bottleneck thật, đừng đoán

> Tier 3 · Go Advanced · Lesson 34
> Tiền đề: [L26 — Testing basics](../lesson-26-testing-basics/), [L27 — Goroutines & Channels](../lesson-27-goroutines-channels/), [L33 — Memory & GC](../lesson-33-memory-gc/)
> Bài tiếp theo: [L35 — Benchmark & Optimization](../lesson-35-benchmark-optimization/)

## Mục tiêu học tập

Sau bài này, bạn sẽ biết:

- Khi nào nên (và không nên) optimize — vì sao **measure** quan trọng hơn intuition.
- 5 loại profile mà Go runtime cung cấp: **CPU, heap, goroutine, block, mutex**, mỗi loại đo cái gì.
- Ba cách collect profile: qua \`go test\`, qua \`net/http/pprof\` (live), và qua \`runtime/pprof\` (manual).
- Cách đọc output \`pprof\`: \`top10\`, \`list\`, \`peek\`, \`web\`, **flamegraph** trong UI HTTP.
- Phân biệt \`flat\` vs \`cum\`, \`inuse\` vs \`alloc\` — hai cặp khái niệm hay bị nhầm nhất.
- Workflow chuẩn để optimize 1 endpoint từ 200ms → 50ms (case study đi xuyên suốt bài).
- Common bottleneck pattern (regex compile lặp, JSON marshal trong loop, mutex contention, allocation lớn) và cách fix.
- \`continuous profiling\` trong production (Pyroscope, Datadog) và \`go tool trace\` cho scheduler-level visibility.

---

## 1. Vì sao phải profile — "Premature optimization is the root of all evil"

> 💡 **Trực giác — đoán mù vs đo thật**
> Bạn có một HTTP endpoint chạy chậm: 200ms/request, khách than. Phản xạ tự nhiên: "chắc do JSON marshal", "chắc do regex", "chắc do DB". Ba lý do trên có thể **đều đúng**, nhưng **chỉ 1 cái đang ăn 80% thời gian**. Nếu bạn đoán sai cái nào là thủ phạm, bạn refactor 2 tuần mà endpoint vẫn 180ms.
>
> Profile là **camera quan sát** xem CPU thật sự bỏ thời gian ở đâu. Không profile = tối ưu trong bóng tối.

Câu nói nổi tiếng của Donald Knuth:

> "Premature optimization is the root of all evil — yet we should not pass up our opportunities in that critical 3%."

Đọc full sẽ thấy ý ông không phải "đừng tối ưu", mà là: **đừng tối ưu khi chưa biết 3% critical đó ở đâu**. Profile chính là thứ tìm ra 3% đó.

### 1.1 Quy tắc 80/20 trong performance

Trong hầu hết chương trình thật:

- **~80% thời gian** chạy trong **~20% code** (thường còn cực đoan hơn: 95% / 5%).
- Function quan trọng = function được gọi nhiều lần **HOẶC** function gọi 1 lần nhưng tốn lâu.
- Tối ưu code chạy 1ms/ngày = vô nghĩa. Tối ưu function chạy 100ms × 1000 lần/giây = đáng giá.

> ❓ **Câu hỏi tự nhiên: "Sao không cứ tối ưu hết cho chắc?"**
>
> Vì tối ưu code có cost: thường khiến code **khó đọc hơn** (vd: thay slice gọn bằng pool buffer phức tạp, inline thay vì function gọn). Bạn chỉ "trả" sự khó đọc đó cho phần code thật sự nóng. Code lạnh giữ nguyên cho dễ maintain.

### 1.2 Ví dụ cụ thể: dạng bottleneck thật

| Tình huống | Đoán mù | Profile chỉ ra | Bài học |
|---|---|---|---|
| API trả JSON 200ms | "Marshal chậm" | 70% time trong \`regexp.MustCompile\` (compile lại regex mỗi request) | Move compile ra \`var\` package-level → 30ms |
| Memory grow vô hạn | "Object leak" | Goroutine count tăng monotonic — goroutine leak | Add \`ctx\` cancel cho goroutine |
| CPU 100% nhưng tốc độ chậm | "Tính toán nặng" | 40% time trong GC sweep — quá nhiều alloc | Sync.Pool cho buffer reuse |
| Endpoint chậm intermittent | "DB chậm" | Block profile show 80% chờ mutex | Đổi sang RWMutex hoặc shard |

Không cái nào trong cột "Profile chỉ ra" là kết luận có thể đạt được bằng **đoán**.

> ⚠ **Lỗi thường gặp**: optimize cold path. Nếu một function chiếm 1% CPU time, dù bạn tối ưu nó nhanh 10× thì tổng cũng chỉ giảm 0.9% — gần như không đo được. **Luôn tối ưu top-of-list trước.**

---

## 2. Năm loại profile Go runtime cung cấp

Go runtime ghi lại nhiều "góc nhìn" khác nhau về chương trình. Mỗi profile trả lời một câu hỏi cụ thể:

| Profile | Câu hỏi nó trả lời | Khi nào dùng |
|---|---|---|
| **CPU** | "Function nào ăn nhiều CPU nhất?" | Service chạy hot CPU, request slow |
| **Heap** | "Memory đang/đã được alloc ở đâu?" | RSS cao, GC frequency cao |
| **Goroutine** | "Tôi đang có bao nhiêu goroutine, chúng đứng ở đâu?" | Goroutine leak, deadlock |
| **Block** | "Goroutine bỏ thời gian chờ gì lâu nhất?" | Latency cao, throughput thấp |
| **Mutex** | "Mutex nào đang bị tranh chấp?" | Mutex contention, scaling vấn đề khi tăng core |

### 2.1 CPU profile — sampling-based

CPU profile **không phải** tracing (record mọi function call). Nó là **sampling**: cứ ~10ms (100Hz mặc định) runtime "chụp" stack trace của mọi OS thread đang chạy Go code. Sau N giây, tổng hợp → function nào xuất hiện trong nhiều sample → function đó tốn nhiều CPU.

> 💡 **Trực giác**: tưởng tượng bạn đi camera time-lapse trong nhà máy, chụp 1 ảnh mỗi 10ms. Sau 30s bạn có 3000 ảnh. Đếm số ảnh có công nhân ở dây chuyền A vs dây chuyền B → biết dây chuyền nào "bận" hơn. Đây chính là CPU sampling.

**Hệ quả của sampling:**
- Function chạy < 10ms thường xuyên có thể bị **bỏ sót** giữa 2 sample.
- Function chạy lâu (> 1s tổng) sẽ rất chính xác.
- Sampling overhead **rất thấp** (~5%) → an toàn chạy production.

### 2.2 Heap profile — snapshot allocation

Heap profile có 4 view, hay nhầm:

| View | Đo | Ý nghĩa |
|---|---|---|
| \`inuse_space\` | Bytes đang live trong heap | "Bây giờ tôi giữ bao nhiêu RAM?" |
| \`inuse_objects\` | Số object đang live | Phát hiện "1 triệu object nhỏ" vs "1 object lớn" |
| \`alloc_space\` | Tổng bytes đã alloc từ start (kể cả đã GC) | Đo GC pressure |
| \`alloc_objects\` | Tổng object đã alloc từ start | Tương tự |

> ⚠ **Lỗi cực phổ biến: nhầm \`inuse\` với \`alloc\`.**
>
> Bạn thấy \`alloc_space\` 500GB → hoảng. Nhưng \`inuse_space\` chỉ 200MB → bình thường. Nghĩa là chương trình "tạo và quẳng" rất nhiều object → GC chạy nhiều → CPU phí. Đây là **throwaway allocation pattern**, không phải memory leak.
>
> Ngược lại: \`inuse_space\` 8GB liên tục tăng → leak thật.

### 2.3 Goroutine profile — snapshot tất cả goroutine

Đơn giản nhất: list ra mọi goroutine đang sống + stack trace của chúng.

Dùng để:
- Đếm goroutine. Nếu count tăng monotonic theo thời gian → **leak**.
- Tìm goroutine đang stuck ở \`<-ch\` không bao giờ receive → deadlock partial.

### 2.4 Block profile — chờ gì

Block profile đo thời gian goroutine **không chạy** vì phải chờ:
- Channel receive/send blocked.
- Mutex lock blocked.
- \`sync.WaitGroup.Wait\`.
- \`select\` không có case nào ready.

**Phải enable trước khi dùng** (mặc định off vì có overhead):

\`\`\`go
runtime.SetBlockProfileRate(1) // sample mọi block event
// hoặc SetBlockProfileRate(10000) = sample blocks ≥ 10µs (nhẹ hơn)
\`\`\`

### 2.5 Mutex profile — contention

Đo thời gian goroutine **chờ** lấy mutex (không phải thời gian giữ mutex).

Enable:

\`\`\`go
runtime.SetMutexProfileFraction(1) // sample 1/1 mutex blocking events
\`\`\`

> 📝 **Tóm tắt mục 2**
> - 5 profile = 5 góc nhìn. Mỗi loại trả lời 1 câu hỏi khác nhau, đừng dùng nhầm.
> - CPU là sampling-based, overhead thấp → safe cho prod.
> - Heap có 4 view, phân biệt **inuse** (snapshot) vs **alloc** (tích lũy).
> - Goroutine profile bắt leak.
> - Block/mutex profile mặc định **off**, phải \`Set...Rate(N)\` trước.

---

## 3. Cách collect profile — ba con đường

### 3.1 Via \`go test\` — đơn giản nhất, dùng khi có benchmark

\`\`\`bash
# CPU + heap profile khi chạy benchmark
go test -bench=. -benchmem \\
        -cpuprofile=cpu.out \\
        -memprofile=mem.out \\
        -blockprofile=block.out \\
        -mutexprofile=mutex.out

# Phân tích
go tool pprof cpu.out
\`\`\`

Pros: tự động, có sẵn benchmark đi kèm.
Cons: chỉ profile benchmark workload — có thể không giống prod traffic.

### 3.2 Via \`net/http/pprof\` — live, dùng cho service đang chạy

\`\`\`go
package main

import (
    "log"
    "net/http"
    _ "net/http/pprof"  // import phụ register handler vào DefaultServeMux
)

func main() {
    // Mở pprof endpoint trên port riêng (KHÔNG dùng chung với traffic chính)
    go func() {
        log.Println(http.ListenAndServe("localhost:6060", nil))
    }()

    // Phần code chính của bạn ở đây...
    runMyService()
}
\`\`\`

Truy cập \`http://localhost:6060/debug/pprof/\` sẽ thấy menu:

\`\`\`
/debug/pprof/             — index
/debug/pprof/profile      — CPU profile, ?seconds=30 (default 30)
/debug/pprof/heap         — heap snapshot
/debug/pprof/goroutine    — goroutine stack dump
/debug/pprof/block        — block profile
/debug/pprof/mutex        — mutex profile
/debug/pprof/allocs       — alloc profile (như heap nhưng alloc view)
/debug/pprof/cmdline      — command line args
/debug/pprof/trace        — execution trace, ?seconds=N
\`\`\`

Collect 30s CPU profile từ service đang chạy:

\`\`\`bash
go tool pprof http://localhost:6060/debug/pprof/profile?seconds=30
\`\`\`

Lấy heap snapshot ngay lập tức:

\`\`\`bash
go tool pprof http://localhost:6060/debug/pprof/heap
\`\`\`

> ⚠ **Bảo mật**: \`net/http/pprof\` expose stack trace + memory layout. **KHÔNG** mở public. Bind \`localhost:6060\` only, hoặc gate sau auth. Vụ leak \`pprof\` public từng làm lộ secret trong stack trace.

### 3.3 Via \`runtime/pprof\` — manual, fine-grained control

Khi bạn muốn profile **đúng** một đoạn code, không phải toàn process:

\`\`\`go
package main

import (
    "log"
    "os"
    "runtime/pprof"
)

func main() {
    f, err := os.Create("cpu.out")
    if err != nil {
        log.Fatal(err)
    }
    defer f.Close()

    if err := pprof.StartCPUProfile(f); err != nil {
        log.Fatal(err)
    }
    defer pprof.StopCPUProfile()

    // Code cần profile
    doExpensiveWork()
}
\`\`\`

Pros: chính xác về thời gian profile.
Cons: phải sửa code, phải redeploy. Production thường dùng \`net/http/pprof\` thay vì cái này.

> 📝 **Tóm tắt mục 3**
> - Test workload → \`go test -cpuprofile\`.
> - Live service → \`_ "net/http/pprof"\` rồi \`pprof http://...\`.
> - Đoạn cụ thể → \`runtime/pprof.StartCPUProfile\`.

---

## 4. Phân tích — \`go tool pprof\` interactive

Sau khi có file \`cpu.out\`:

\`\`\`bash
go tool pprof cpu.out
\`\`\`

Bạn vào shell pprof. Vài lệnh thiết yếu:

### 4.1 \`top10\` — top 10 function theo flat time

\`\`\`
(pprof) top10
Showing nodes accounting for 4.32s, 86.40% of 5.00s total
Dropped 23 nodes (cum <= 0.025s)
      flat  flat%   sum%        cum   cum%
     1.80s 36.00% 36.00%      1.85s 37.00%  regexp.(*Regexp).doMatch
     0.70s 14.00% 50.00%      0.70s 14.00%  runtime.memmove
     0.50s 10.00% 60.00%      2.40s 48.00%  api.HandleSearch
     0.40s  8.00% 68.00%      0.40s  8.00%  encoding/json.Marshal
     0.30s  6.00% 74.00%      0.30s  6.00%  runtime.scanobject
     0.25s  5.00% 79.00%      0.25s  5.00%  syscall.read
     0.15s  3.00% 82.00%      0.15s  3.00%  bytes.IndexByte
     0.10s  2.00% 84.00%      0.10s  2.00%  runtime.mallocgc
     0.07s  1.40% 85.40%      0.07s  1.40%  net/url.Parse
     0.05s  1.00% 86.40%      2.45s 49.00%  net/http.serverHandler.ServeHTTP
\`\`\`

**Hai cột quan trọng nhất:**

- **\`flat\`**: thời gian **trực tiếp** trong function đó (không tính callees).
- **\`cum\`** (cumulative): thời gian trong function + tất cả function nó gọi.

**Cách đọc:**
- \`regexp.(*Regexp).doMatch\` flat 36% → đây tự nó chạy 36% time → **hot leaf**, optimize trực tiếp được.
- \`api.HandleSearch\` flat 10% nhưng **cum 48%** → bản thân nó không nặng, nhưng nó gọi những thứ nặng (regex, json) → optimize phải đi xuống callees.
- \`runtime.memmove\` flat 14% → copy bytes nhiều → có thể do slice grow, string concat.

### 4.2 \`top10 -cum\` — sort theo cum

\`\`\`
(pprof) top10 -cum
\`\`\`

Cho thấy "stack root" — entry points tốn time nhiều. Thường top sẽ là \`main\`, \`http.ServeHTTP\`, các handler.

### 4.3 \`list <FuncName>\` — xem từng dòng

\`\`\`
(pprof) list HandleSearch
ROUTINE ======================== api.HandleSearch
     500ms      2.40s (flat, cum) 48.00% of Total
         .          .     12: func HandleSearch(w http.ResponseWriter, r *http.Request) {
         .          .     13:     q := r.URL.Query().Get("q")
      10ms       10ms     14:     re := regexp.MustCompile(\`\\b\` + q + \`\\b\`)   ← HOT LINE
     1.80s      1.85s     15:     matches := re.FindAllString(corpus, -1)     ← HOT LINE
         .          .     16:
      10ms      400ms     17:     data, _ := json.Marshal(matches)
         .          .     18:     w.Write(data)
         .          .     19: }
\`\`\`

→ Thấy ngay 2 dòng nóng: regex compile (10ms × N requests) và \`FindAllString\` (1.8s). Fix: move \`regexp.MustCompile\` ra package-level \`var\`.

### 4.4 \`web\` — SVG call graph

\`\`\`
(pprof) web
\`\`\`

Sinh file SVG mở trong browser, mỗi node = 1 function, edge = call. Node lớn = tốn nhiều thời gian. Hữu ích cho code chưa quen.

### 4.5 \`peek\` — annotated function

\`\`\`
(pprof) peek HandleSearch
\`\`\`

Show callers và callees của function, kèm thời gian.

### 4.6 Web UI — flamegraph

\`\`\`bash
go tool pprof -http=:8080 cpu.out
\`\`\`

Mở browser \`http://localhost:8080\`. Có menu **Flame Graph (cumulative)**:

\`\`\`
[============== main ===============]
        [======= ServeHTTP ========]
              [=== HandleSearch ===]
                  [== doMatch ==]   [ Marshal ]
\`\`\`

- **Width = thời gian.** Block rộng = tốn lâu.
- **Stack growth từ trên xuống.** Trên cùng là root, dưới là leaf đang chạy thật.
- **Tall stack = recursion deep hoặc nhiều layer.**
- **Wide leaf block ở đáy = bottleneck đáng tối ưu nhất.**

> 💡 **Trực giác**: tưởng flamegraph là cross-section của thời gian. Lát cắt ngang ở mỗi độ sâu nói "tại depth N, các function nào đang chạy". Function nào "rộng" ở đáy = lá nóng nhất.

> 📝 **Tóm tắt mục 4**
> - \`top10\` xem flat (hot leaf) và cum (entry point).
> - \`list FuncName\` zoom vào từng line.
> - \`web\` cho call graph SVG.
> - \`pprof -http=:8080\` mở UI có flamegraph — pattern hay nhất cho phân tích trực quan.

---

## 5. Đọc \`top10\` — bài tập intuition

Cho output:

\`\`\`
      flat  flat%   sum%        cum   cum%
     2.40s 40.00% 40.00%      2.42s 40.33%  strings.Builder.grow
     1.20s 20.00% 60.00%      3.60s 60.00%  api.buildResponse
     0.60s 10.00% 70.00%      0.60s 10.00%  runtime.memmove
     0.40s  6.67% 76.67%      0.40s  6.67%  runtime.mallocgc
     0.30s  5.00% 81.67%      6.00s 100.0%  main.main
\`\`\`

**Câu hỏi**: bottleneck ở đâu?

**Phân tích**:
- \`strings.Builder.grow\` flat 40% — Builder phải grow buffer rất nhiều → ai đó append vào Builder mà không \`Grow()\` trước.
- \`api.buildResponse\` cum 60%, flat 20% → đây là caller chính. Flat 20% nghĩa là bản thân nó cũng có work, nhưng phần lớn time (40%) chui xuống Builder.grow.
- \`runtime.memmove\` 10% — Builder.grow alloc buffer mới rồi copy → tốn memmove.
- \`mallocgc\` 6.67% — allocation pressure cao.

**Diagnosis**: \`buildResponse\` build string bằng nhiều \`WriteString\` mà không pre-allocate. Fix: \`builder.Grow(estimatedSize)\` ở đầu, hoặc dùng \`bytes.Buffer\` với capacity ban đầu.

> ❓ **Câu hỏi tự nhiên**: nếu flat \`runtime.memmove\` 10% mà cum cũng 10%, sao biết caller là Builder?
>
> → dùng \`peek runtime.memmove\` để xem callers, hoặc \`web\` để thấy edge từ \`Builder.grow\` → \`memmove\`.

---

## 6. Flamegraph reading — đọc 1 hình thật

Hình dung flamegraph dưới (mô tả text):

\`\`\`
                       main.main (6.0s, 100%)
                              │
                ┌─────────────┴──────────────┐
                ▼                            ▼
       http.ServeHTTP (4.5s)        background.Worker (1.5s)
                │
        api.HandleSearch (4.5s)
                │
    ┌───────────┼──────────────────┐
    ▼           ▼                  ▼
regexp.        json.            db.Query
doMatch       Marshal           (0.3s)
(3.0s)        (1.2s)
\`\`\`

**Quan sát**:
- \`doMatch\` rộng nhất ở leaf depth → **bottleneck #1**.
- \`Marshal\` rộng thứ hai → **bottleneck #2**.
- \`db.Query\` mỏng (0.3s) → DB không phải vấn đề.
- \`background.Worker\` 1.5s nhưng song song với request handler — không ảnh hưởng request latency.

**Action**: tối ưu regex matching trước (cache pattern, đổi sang \`Contains\` nếu không cần regex), rồi tới JSON (custom marshaler / \`easyjson\`).

> ⚠ **Pitfall**: đừng nhìn vào "tall stack" mà hoảng. Stack cao chỉ có nghĩa nhiều layer function call — không tự thân chậm. **Width** mới là chỉ số time.

---

## 7. Heap profile — đọc đúng giữa inuse và alloc

Ví dụ output:

\`\`\`
$ go tool pprof -alloc_space http://localhost:6060/debug/pprof/heap
(pprof) top
Showing nodes accounting for 480GB, 96% of 500GB total
      flat  flat%   sum%        cum   cum%
     320GB 64.00% 64.00%      320GB 64.00%  encoding/json.Marshal
      80GB 16.00% 80.00%       80GB 16.00%  bytes.Buffer.grow
      50GB 10.00% 90.00%       50GB 10.00%  strings.(*Builder).grow
      30GB  6.00% 96.00%       30GB  6.00%  fmt.Sprintf
\`\`\`

Đọc: chương trình **đã alloc tổng 500GB** từ lúc start. Nghe khủng khiếp, nhưng inuse có thể chỉ 200MB. **Vấn đề thật ở đây không phải leak mà là GC pressure**.

Bây giờ thử \`inuse_space\`:

\`\`\`
$ go tool pprof -inuse_space http://localhost:6060/debug/pprof/heap
(pprof) top
Showing nodes accounting for 195MB, 97% of 200MB total
      flat  flat%   sum%        cum   cum%
     150MB 75.00% 75.00%      150MB 75.00%  cache.entries
      30MB 15.00% 90.00%       30MB 15.00%  api.sessionPool
      15MB  7.50% 97.50%       15MB  7.50%  log.Buffer
\`\`\`

OK, đang giữ 200MB, phần lớn là cache. Hợp lý.

**Diagnosis**: high alloc + low inuse → throwaway pattern. Fix: dùng \`sync.Pool\` cho \`bytes.Buffer\` và \`strings.Builder\` thay vì alloc mới mỗi request.

> 💡 **Trực giác inuse vs alloc**: tưởng tượng nhà hàng. \`inuse\` = số đĩa đang trên bàn. \`alloc\` = tổng số đĩa đã rửa từ lúc mở quán. Đĩa 1000 cái/ngày trên bàn liên tục = bận, không phải leak. Đĩa 10 cái trên bàn ngày càng nhiều mà không bao giờ rửa = leak.

---

## 8. Goroutine profile — bắt leak

Goroutine leak là khi bạn \`go func()\` rồi quên cách dừng nó. Sau N giờ, goroutine count tăng monotonic → memory tăng → process crash hoặc swap.

\`\`\`
$ curl http://localhost:6060/debug/pprof/goroutine?debug=1
goroutine profile: total 10847
2451 @ 0x... 0x... runtime.gopark
#   0x4a3e2c    runtime.chanrecv1
#   0x6f8a1d    worker.(*Pool).processJob
#   0x6f8b4e    worker.(*Pool).Start.func1

5210 @ 0x... runtime.gopark
#   ...        runtime.netpollblock
#   ...        net.(*TCPConn).Read
#   ...        api.handleWebsocket

...
\`\`\`

Đọc: 2451 goroutine kẹt ở \`chanrecv1\` trong \`processJob\` — chờ channel send không bao giờ tới. Đây là leak.

**Test thủ công**: snapshot goroutine 2 lần cách nhau 1 phút, so sánh count.

\`\`\`bash
curl -s http://localhost:6060/debug/pprof/goroutine?debug=1 | head -1
# goroutine profile: total 1247
sleep 60
curl -s http://localhost:6060/debug/pprof/goroutine?debug=1 | head -1
# goroutine profile: total 1389  ← tăng → leak
\`\`\`

Nếu count ổn định ở mức cao (vd 5000) nhưng **không tăng** → không leak, chỉ pool lớn.

---

## 9. Block profile — đo wait time

\`\`\`go
import "runtime"

func init() {
    runtime.SetBlockProfileRate(1) // sample mọi block event
}
\`\`\`

Sau đó:

\`\`\`bash
go tool pprof http://localhost:6060/debug/pprof/block
(pprof) top
      flat  flat%   sum%        cum   cum%
     45.2s 60.00% 60.00%      45.2s 60.00%  sync.(*Mutex).Lock
     22.6s 30.00% 90.00%      22.6s 30.00%  runtime.chanrecv
      7.5s 10.00% 100.0%       7.5s 100.0%  sync.(*WaitGroup).Wait
\`\`\`

→ 60% wait time là ở mutex. Mutex profile sẽ chỉ rõ mutex nào.

> ⚠ Block profile có overhead. Đừng để \`SetBlockProfileRate(1)\` permanent trong prod nếu QPS cao — dùng rate cao hơn (vd 10000 = chỉ sample blocks ≥ 10µs).

---

## 10. Mutex profile — tìm contention

\`\`\`go
func init() {
    runtime.SetMutexProfileFraction(1) // 1 = sample mọi lần mutex unlock cho thấy contention
}
\`\`\`

\`\`\`bash
go tool pprof http://localhost:6060/debug/pprof/mutex
(pprof) list
ROUTINE ======================== cache.(*Cache).Get
      0      45s (flat, cum) 100%
                .         .   42: func (c *Cache) Get(k string) (Value, bool) {
                .       45s   43:     c.mu.Lock()      ← contention!
                .         .   44:     defer c.mu.Unlock()
                .         .   45:     v, ok := c.data[k]
                .         .   46:     return v, ok
                .         .   47: }
\`\`\`

Cache đang dùng \`Mutex\` cho mọi \`Get\`. 45 giây waste trong contention. Fix:
- \`sync.RWMutex\` (read concurrent, write exclusive).
- Sharding: 16 maps, mỗi map có mutex riêng, dùng hash key chọn shard.
- \`sync.Map\` (cho pattern read-heavy với keys ổn định).

---

## 11. Case study — optimize 1 endpoint từ 200ms → 50ms

Đây là workflow chuẩn, áp dụng cho mọi optimization task.

### Bước 1 — setup pprof

\`\`\`go
import _ "net/http/pprof"
go http.ListenAndServe("localhost:6060", nil)
\`\`\`

### Bước 2 — load test reproducible

Dùng \`k6\` hoặc \`wrk\`:

\`\`\`bash
wrk -t4 -c100 -d30s --latency http://localhost:8080/api/search?q=foo
\`\`\`

Output:

\`\`\`
Latency: avg 198ms, p99 412ms
Req/sec: 502
\`\`\`

### Bước 3 — collect CPU profile khi peak

\`\`\`bash
go tool pprof -seconds=30 http://localhost:6060/debug/pprof/profile
\`\`\`

### Bước 4 — \`top10\` identify hot functions

\`\`\`
(pprof) top10
     flat  flat%   sum%        cum   cum%
    2.10s 35.00% 35.00%      2.20s 36.67%  regexp.MustCompile
    1.50s 25.00% 60.00%      4.50s 75.00%  api.HandleSearch
    0.80s 13.33% 73.33%      0.80s 13.33%  encoding/json.Marshal
    0.40s  6.67% 80.00%      0.40s  6.67%  bytes.Buffer.WriteString
\`\`\`

→ \`regexp.MustCompile\` flat 35% → đang compile regex mỗi request!

### Bước 5 — \`list\` xem dòng nào

\`\`\`
(pprof) list HandleSearch
         .          .   34: func HandleSearch(w http.ResponseWriter, r *http.Request) {
      10ms       10ms   35:   q := r.URL.Query().Get("q")
     2.10s      2.10s   36:   re := regexp.MustCompile(\`(?i)\\b\` + q + \`\\b\`)  ← FIX
         .       1.5s   37:   matches := re.FindAllString(corpus, -1)
         .       0.8s   38:   data, _ := json.Marshal(matches)
         .          .   39:   w.Write(data)
         .          .   40: }
\`\`\`

### Bước 6 — fix

\`\`\`go
// Move compile ra package-level cho pattern cố định.
// Nếu query thay đổi mỗi request, cache theo q:
var regexCache sync.Map

func compileQuery(q string) *regexp.Regexp {
    if v, ok := regexCache.Load(q); ok {
        return v.(*regexp.Regexp)
    }
    re := regexp.MustCompile(\`(?i)\\b\` + regexp.QuoteMeta(q) + \`\\b\`)
    regexCache.Store(q, re)
    return re
}
\`\`\`

Còn JSON marshal: dùng \`sync.Pool\` cho \`bytes.Buffer\`:

\`\`\`go
var bufPool = sync.Pool{New: func() any { return new(bytes.Buffer) }}

func writeJSON(w io.Writer, v any) error {
    buf := bufPool.Get().(*bytes.Buffer)
    buf.Reset()
    defer bufPool.Put(buf)

    enc := json.NewEncoder(buf)
    if err := enc.Encode(v); err != nil { return err }
    _, err := w.Write(buf.Bytes())
    return err
}
\`\`\`

### Bước 7 — rerun, đo improvement

\`\`\`bash
wrk -t4 -c100 -d30s --latency http://localhost:8080/api/search?q=foo
\`\`\`

\`\`\`
Latency: avg 47ms, p99 88ms        ← từ 198ms → 47ms (-76%)
Req/sec: 2104                       ← từ 502 → 2104 (+4.2×)
\`\`\`

Run lại profile để confirm regex không còn ở top:

\`\`\`
(pprof) top10
     flat  flat%   sum%        cum   cum%
    0.60s 30.00% 30.00%      0.60s 30.00%  regexp.doMatch
    0.40s 20.00% 50.00%      0.80s 40.00%  bytes.Buffer.WriteString
    ...
\`\`\`

Compile đã biến mất, giờ \`doMatch\` ở top — đây là work thực sự cần thiết. Nếu vẫn muốn cải thiện thêm: cache results theo \`q\`, hoặc dùng inverted index.

> 📝 **Workflow chuẩn**: Setup → Load → Collect → Top → List → Fix → Rerun → Repeat. Mỗi vòng giảm 1 bottleneck.

---

## 12. Common bottleneck pattern

Những pattern thường gặp khi profile Go service:

### 12.1 Regex compile trong hot path

\`\`\`go
// BAD
func match(s, pattern string) bool {
    re := regexp.MustCompile(pattern)   // compile mỗi call
    return re.MatchString(s)
}

// GOOD
var re = regexp.MustCompile(\`...\`)      // compile 1 lần lúc start
func match(s string) bool { return re.MatchString(s) }
\`\`\`

### 12.2 JSON marshal lặp đi lặp lại trong loop

\`\`\`go
// BAD
for _, item := range items {
    data, _ := json.Marshal(item)
    publish(data)
}

// GOOD — pool buffer + streaming
buf := bufPool.Get().(*bytes.Buffer)
defer bufPool.Put(buf)
enc := json.NewEncoder(buf)
for _, item := range items {
    buf.Reset()
    enc.Encode(item)
    publish(buf.Bytes())
}
\`\`\`

### 12.3 Excessive logging

\`log.Printf\` mỗi request × 10000 QPS = log lock contention + I/O. Fix:
- Dùng async logger (zap, zerolog).
- Sampling: log 1/100 request normal, 100% error.

### 12.4 Mutex contention trên cache global

\`\`\`go
// BAD — 1 mutex cho toàn cache
type Cache struct { mu sync.Mutex; m map[string]V }

// GOOD — shard 16 ways
type Cache struct {
    shards [16]struct {
        mu sync.RWMutex
        m  map[string]V
    }
}
func (c *Cache) shard(k string) *struct{...} {
    return &c.shards[fnv32(k)%16]
}
\`\`\`

### 12.5 String concat trong loop

\`\`\`go
// BAD — O(n²)
s := ""
for _, x := range parts { s += x }

// GOOD — strings.Builder với Grow
var b strings.Builder
b.Grow(estimateSize)
for _, x := range parts { b.WriteString(x) }
return b.String()
\`\`\`

### 12.6 Allocation lớn không pool

\`bytes.Buffer\`, \`bufio.Reader/Writer\`, scratch slice — pool lại bằng \`sync.Pool\`. (Xem L33.)

---

## 13. Continuous profiling trong production

Pprof một-lần là tốt cho debug. Nhưng production có vấn đề **intermittent** (chỉ chậm lúc traffic peak, 1 ngày 1 lần). Bạn không thể "đoán" lúc nào chạy \`pprof\`.

**Continuous profiling** = chạy pprof liên tục với rate thấp, push profile về central store, query theo time/tag.

Tools:

| Tool | Mô hình | Hosted/self-host |
|---|---|---|
| **Pyroscope** (Grafana) | Push từ agent, query qua Grafana | Cả hai |
| **Datadog Continuous Profiler** | Push qua DD agent | Hosted |
| **Google Cloud Profiler** | Push qua GCP SDK | Hosted (GCP only) |
| **Parca** | OSS, pull model | Self-host |

Setup Pyroscope cho Go (vd):

\`\`\`go
import "github.com/grafana/pyroscope-go"

func main() {
    pyroscope.Start(pyroscope.Config{
        ApplicationName: "my-service",
        ServerAddress:   "http://pyroscope:4040",
        ProfileTypes: []pyroscope.ProfileType{
            pyroscope.ProfileCPU,
            pyroscope.ProfileAllocObjects,
            pyroscope.ProfileAllocSpace,
            pyroscope.ProfileInuseObjects,
            pyroscope.ProfileInuseSpace,
        },
    })
    runServer()
}
\`\`\`

Agent collect profile mỗi 10s, push lên server. Bạn có thể query "flamegraph lúc 03:42 hôm qua khi p99 latency spike".

**Overhead**: thường < 2% CPU vì sampling rate thấp.

---

## 14. \`go tool trace\` — sâu hơn pprof

\`pprof\` cho biết "function nào tốn time". \`trace\` cho biết **goroutine làm gì, lúc nào, trên core nào, chờ gì** — chi tiết hơn rất nhiều.

\`\`\`bash
go test -trace=trace.out -bench=. -benchtime=10x
go tool trace trace.out
\`\`\`

Browser mở UI tab có:

- **Goroutine analysis**: timeline mỗi goroutine.
- **Scheduler latency**: thời gian goroutine chờ chạy.
- **GC**: lúc nào GC chạy, dừng bao lâu.
- **Network blocking**: lúc nào goroutine block trên I/O.
- **Syscalls**: thời gian trong syscall.

**Khi nào dùng trace thay pprof:**
- Latency tail (p99 cao) trong khi avg ổn.
- Goroutine scheduling vấn đề (starve, runqueue depth cao).
- GC pause ảnh hưởng request.

> ⚠ Trace file rất lớn (vài MB cho vài giây) và UI nặng. Chỉ dùng cho debug specific issue, không phải continuous monitoring.

---

## 15. Common pitfall — sai lầm hay gặp

1. **Profile dev environment khác prod**. Laptop 8 core SSD ≠ prod 16 core EBS. Bottleneck dev có thể không tồn tại trên prod và ngược lại. Luôn profile **environment giống prod** hoặc prod thật.

2. **Optimize cold path**. Function chiếm 1% CPU → tối ưu 10× = giảm 0.9% tổng. Vô nghĩa. **Luôn tối ưu top-of-list.**

3. **Quên enable block/mutex profile rate**. Mặc định \`BlockProfileRate=0\` và \`MutexProfileFraction=0\` → profile rỗng → tưởng không có contention. Phải \`Set...\` trước.

4. **Nhầm \`inuse\` với \`alloc\`**. Đã giải thích ở §7.

5. **Profile khi load thấp**. Profile lúc 1 QPS sẽ không show bottleneck vốn chỉ xuất hiện ở 1000 QPS. Phải load test trước khi profile.

6. **Tin top1 mù quáng**. Top1 đôi khi là \`runtime.gopark\` (goroutine scheduling) hoặc \`syscall.Read\` (network I/O) — đó là I/O wait, không phải code bạn cần tối ưu. Phải hiểu context.

7. **Không re-profile sau fix**. Fix bottleneck #1 → bottleneck #2 từ chỗ chiếm 10% có thể trở thành 60% mới. Phải profile lại để biết next target.

8. **Optimize micro mà bỏ qua algorithmic**. Tối ưu 1 function chậm 10× không bằng đổi từ $O(n^2)$ sang $O(n \\log n)$. **Luôn xem algorithm trước.**

---

## Bài tập

### BT1 — Identify bottleneck từ \`top10\`

Cho output:

\`\`\`
      flat  flat%   sum%        cum   cum%
     3.20s 53.33% 53.33%      3.25s 54.17%  fmt.Sprintf
     0.90s 15.00% 68.33%      4.20s 70.00%  api.logRequest
     0.60s 10.00% 78.33%      0.60s 10.00%  runtime.mallocgc
     0.30s  5.00% 83.33%      0.30s  5.00%  syscall.write
     0.20s  3.33% 86.67%      0.20s  3.33%  runtime.scanobject
\`\`\`

Hỏi:
1. Hot leaf là function nào, tại sao?
2. Caller chính của hot leaf là gì?
3. Đề xuất fix.

### BT2 — Predict CPU profile shape

Cho code:

\`\`\`go
func A() {
    for i := 0; i < 1_000_000; i++ {
        B(i)
    }
}
func B(i int) {
    if i%100 == 0 {
        C() // 1% lần gọi
    } else {
        D() // 99% lần gọi
    }
}
func C() { time.Sleep(1 * time.Millisecond) } // sleep, không tốn CPU
func D() { _ = mathOp() } // tính toán ~100ns
\`\`\`

Hỏi: trong CPU profile, top10 sẽ trông như nào? \`A\`, \`B\`, \`C\`, \`D\` thứ tự ra sao?

### BT3 — Setup \`http/pprof\` cho HTTP service

Cho service:

\`\`\`go
package main

import (
    "log"
    "net/http"
)

func main() {
    http.HandleFunc("/api", apiHandler)
    log.Fatal(http.ListenAndServe(":8080", nil))
}

func apiHandler(w http.ResponseWriter, r *http.Request) { /*...*/ }
\`\`\`

Yêu cầu:
1. Thêm pprof endpoint trên port 6060 (không lẫn với traffic chính).
2. Liệt kê các URL bạn có thể truy cập sau khi setup.
3. Lệnh curl/pprof để lấy CPU profile 30 giây.

### BT4 — Find goroutine leak

Cho goroutine profile snapshot (lúc T=0):

\`\`\`
goroutine profile: total 245
50 @ chanrecv1 → worker.processJob
40 @ netpollblock → http.Server.Serve
30 @ select → worker.dispatch
...
\`\`\`

Lúc T=10 phút:

\`\`\`
goroutine profile: total 5847
4520 @ chanrecv1 → worker.processJob   ← tăng dữ
40 @ netpollblock → http.Server.Serve
35 @ select → worker.dispatch
...
\`\`\`

Hỏi:
1. Đâu là leak?
2. Cho code worker dưới, fix:

\`\`\`go
func (p *Pool) Submit(job Job) {
    go p.processJob(job)
}

func (p *Pool) processJob(job Job) {
    result := <-job.responseCh  // ← chờ ai đó gửi vào
    log.Println(result)
}
\`\`\`

### BT5 — Optimize string concat: bench → profile → fix → bench again

Cho code:

\`\`\`go
func BuildReport(items []string) string {
    s := ""
    for _, item := range items {
        s += "[" + item + "]\\n"
    }
    return s
}
\`\`\`

Yêu cầu:
1. Viết benchmark \`BenchmarkBuildReport\` với 10000 items.
2. Predict CPU profile sẽ show gì.
3. Đề xuất 2 fix khác nhau.
4. Predict speedup mỗi fix.

### BT6 — Đọc flamegraph

Cho mô tả flamegraph (text):

\`\`\`
main.main (10s, 100%)
└── http.serverHandler.ServeHTTP (9.5s)
    └── api.HandlePayment (9.5s)
        ├── validatePayload (0.5s)
        ├── computeFee (8.0s)        ← block rộng nhất
        │   └── math.Pow (7.5s)
        └── persistTransaction (1.0s)
            └── sql.Exec (1.0s)
\`\`\`

Hỏi:
1. Bottleneck là gì?
2. Vì sao block \`math.Pow\` rộng?
3. Nếu tối ưu \`validatePayload\` 100× nhanh hơn, request giảm bao nhiêu?

---

## Lời giải chi tiết

### Lời giải BT1

1. **Hot leaf**: \`fmt.Sprintf\` — flat 53% và flat ≈ cum (3.20 ≈ 3.25) → nó tự thân tốn 53% time, không phải do callees. Đây là **leaf**.
2. **Caller chính**: \`api.logRequest\` — cum 70%, flat 15%. Cum cao hơn flat nhiều → phần lớn time của \`logRequest\` tiêu ở callees, mà callee chính (top trong tree) là \`fmt.Sprintf\`. Khả năng cao \`logRequest\` dùng \`Sprintf\` để format log mỗi request.
3. **Fix**:
   - Thay \`fmt.Sprintf\` bằng \`strconv\` hoặc string concat đơn giản nếu format không phức tạp (\`strconv.Itoa(n)\` nhanh hơn \`Sprintf("%d", n)\` ~3-5×).
   - Dùng structured logger (zap, zerolog) — chúng tránh format string runtime.
   - Sampling log: log 1/100 request thay vì 100%.
   - Pool buffer cho log line: dùng \`sync.Pool\` chứa \`[]byte\` để build log.

   Expected improvement: nếu \`logRequest\` từ 4.2s → 0.5s thì tổng giảm ~62%.

### Lời giải BT2

CPU profile sẽ show **D** chiếm gần như toàn bộ flat time, vì:
- \`C\` gọi \`time.Sleep\` → goroutine **không chạy CPU** trong lúc sleep → sleep không tính vào CPU profile (sleep chỉ xuất hiện trong block profile).
- \`D\` chạy \`mathOp\` ~100ns × 990,000 lần ≈ 99ms — chiếm hầu hết CPU.
- \`B\` flat thấp (chỉ là if/else), cum cao (vì call D).
- \`A\` flat ~0, cum bao trùm B và D.

Thứ tự top10 (theo flat):
\`\`\`
D      ~95% flat (leaf, runs all the CPU work)
B       ~3% flat (if + dispatch)
A       ~1% flat
C       ~0% flat (sleep ≠ CPU)
\`\`\`

→ Bài học: **sleep/wait không xuất hiện trong CPU profile**. Cần block profile cho I/O-bound code.

### Lời giải BT3

\`\`\`go
package main

import (
    "log"
    "net/http"
    _ "net/http/pprof" // (1) import phụ → register handler vào DefaultServeMux
)

func main() {
    // (2) Mở pprof trên port riêng, bind localhost — KHÔNG public
    go func() {
        log.Println(http.ListenAndServe("localhost:6060", nil))
    }()

    // Lưu ý: không dùng DefaultServeMux cho main traffic vì pprof đã ở đó.
    mux := http.NewServeMux()
    mux.HandleFunc("/api", apiHandler)
    log.Fatal(http.ListenAndServe(":8080", mux))
}
\`\`\`

**URL có sẵn**:
- \`http://localhost:6060/debug/pprof/\` — index
- \`http://localhost:6060/debug/pprof/profile?seconds=30\` — CPU
- \`http://localhost:6060/debug/pprof/heap\` — heap snapshot
- \`http://localhost:6060/debug/pprof/goroutine\` — goroutine
- \`http://localhost:6060/debug/pprof/block\`
- \`http://localhost:6060/debug/pprof/mutex\`
- \`http://localhost:6060/debug/pprof/trace?seconds=5\` — execution trace
- \`http://localhost:6060/debug/pprof/allocs\`

**Collect CPU 30s**:

\`\`\`bash
go tool pprof http://localhost:6060/debug/pprof/profile?seconds=30
# hoặc lưu thẳng file:
curl -o cpu.out http://localhost:6060/debug/pprof/profile?seconds=30
go tool pprof -http=:8081 cpu.out  # mở UI flamegraph
\`\`\`

### Lời giải BT4

1. **Leak**: 4520 goroutine kẹt ở \`chanrecv1\` trong \`worker.processJob\`. Từ 50 → 4520 sau 10 phút = +447/phút. Mỗi \`Submit\` tạo goroutine mới mà không ai gửi vào \`job.responseCh\` → goroutine chờ forever.

2. **Fix** (3 phương án):

   **Phương án A — context cancel:**
   \`\`\`go
   func (p *Pool) Submit(ctx context.Context, job Job) {
       go p.processJob(ctx, job)
   }

   func (p *Pool) processJob(ctx context.Context, job Job) {
       select {
       case result := <-job.responseCh:
           log.Println(result)
       case <-ctx.Done():
           return  // cleanup khi ctx hủy
       }
   }
   \`\`\`

   **Phương án B — timeout:**
   \`\`\`go
   func (p *Pool) processJob(job Job) {
       select {
       case result := <-job.responseCh:
           log.Println(result)
       case <-time.After(30 * time.Second):
           log.Println("timeout, abandoning")
           return
       }
   }
   \`\`\`

   **Phương án C — bounded worker pool** (tốt nhất cho throughput):
   \`\`\`go
   type Pool struct {
       jobs chan Job
       wg   sync.WaitGroup
   }
   func NewPool(n int) *Pool {
       p := &Pool{jobs: make(chan Job, 100)}
       for i := 0; i < n; i++ {
           p.wg.Add(1)
           go p.worker()
       }
       return p
   }
   func (p *Pool) worker() {
       defer p.wg.Done()
       for j := range p.jobs {
           process(j)
       }
   }
   \`\`\`

### Lời giải BT5

1. **Benchmark**:
   \`\`\`go
   func BenchmarkBuildReport(b *testing.B) {
       items := make([]string, 10000)
       for i := range items { items[i] = "item" }
       b.ResetTimer()
       for i := 0; i < b.N; i++ { _ = BuildReport(items) }
   }
   \`\`\`

2. **CPU profile sẽ show**:
   - \`runtime.concatstrings\` hoặc \`runtime.growslice\` chiếm > 60% flat.
   - \`runtime.mallocgc\` chiếm 10-20%.
   - \`runtime.memmove\` cao (do copy buffer khi grow).
   - Đây là $O(n^2)$ — mỗi \`s += x\` copy toàn bộ \`s\` hiện tại sang buffer mới.

3. **Fix**:

   **Fix 1 — \`strings.Builder\` với \`Grow\`**:
   \`\`\`go
   func BuildReport(items []string) string {
       var b strings.Builder
       b.Grow(len(items) * 8) // estimate size
       for _, item := range items {
           b.WriteByte('[')
           b.WriteString(item)
           b.WriteString("]\\n")
       }
       return b.String()
   }
   \`\`\`

   **Fix 2 — \`bytes.Buffer\` với pre-alloc**:
   \`\`\`go
   func BuildReport(items []string) string {
       buf := bytes.NewBuffer(make([]byte, 0, len(items)*8))
       for _, item := range items {
           buf.WriteByte('[')
           buf.WriteString(item)
           buf.WriteString("]\\n")
       }
       return buf.String()
   }
   \`\`\`

4. **Speedup**:
   - Original $O(n^2)$: với n=10000, ~50ms/op, ~500MB alloc.
   - Fix 1 với Grow: ~150µs/op, ~100KB alloc → **~300× nhanh hơn**, **~5000× ít alloc**.
   - Fix 2: tương tự fix 1.
   - Không pre-allocate (chỉ \`var b strings.Builder\`): vẫn nhanh ~50× vì avoid string copy, nhưng có grow.

### Lời giải BT6

1. **Bottleneck**: \`computeFee\` chiếm 8s/9.5s ≈ 84% time, trong đó \`math.Pow\` 7.5s là leaf nóng nhất.

2. **Vì sao \`math.Pow\` rộng**: nó là leaf chiếm 7.5s thực sự chạy CPU. \`math.Pow\` tính exponential bằng \`exp(b·log(a))\` — đắt. Khả năng cao \`computeFee\` đang gọi \`Pow\` trong loop với base/exp cố định (vd \`math.Pow(1.05, n)\` tính lãi suất).

   **Fix**:
   - Nếu base hoặc exp là integer nhỏ, dùng nhân tay: \`x*x*x\` thay vì \`Pow(x,3)\`.
   - Nếu exp cố định, precompute table.
   - Nếu công thức cho phép, dùng \`bits.Len()\`, \`math.Log2\`.

3. **Nếu \`validatePayload\` từ 0.5s → 0.005s** (100× nhanh hơn):
   - Saving: 0.495s
   - Tổng từ 9.5s → ~9s → giảm 5%.
   - Latency request giảm 5% — không đáng kể.

   → **Bài học**: tối ưu \`computeFee\` (84%) trước, không phải \`validatePayload\` (5%). Đây là minh chứng cho "đừng tối ưu cold path".

---

## Code & Minh họa

- [\`solutions.go\`](./solutions.go) — HTTP server với \`net/http/pprof\`, ba hot function (slow string concat, regex compile lặp, JSON marshal), goroutine leak intentional + detection. Comment tiếng Việt. Hướng dẫn chạy + thao tác pprof trong file.
- [\`visualization.html\`](./visualization.html) — 3 module tương tác:
  1. **Flamegraph reader** — flamegraph SVG mock với 8 function block. Click để xem flat/cum, highlight bottleneck.
  2. **pprof top10 simulator** — bảng 10 function, sort theo flat/cum, demonstrate cách identify hot path.
  3. **Optimization journey** — slider chọn step (1-5), thấy before/after profile mỗi fix và speedup tổng.

## Bài tiếp theo

L35 — [Benchmark & Optimization](../lesson-35-benchmark-optimization/): \`testing.B\`, \`benchstat\`, \`b.ReportAllocs()\`, đo improvement một cách khoa học, common micro-benchmark pitfall. Profile + benchmark = cặp đôi.
`;
