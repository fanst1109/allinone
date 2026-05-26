// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: Programming/lesson-05-why-go-philosophy/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 05 — Vì sao Go? Triết lý ngôn ngữ và "Hello, Go!"

> **Tier 0 — Lesson cuối.** Đây là lesson chốt giai đoạn nền tảng. Sau bài này, bạn sẽ:
> 1. Hiểu **vì sao** Go ra đời, nó giải bài toán nào của Google.
> 2. Nắm **triết lý** xuyên suốt Go: "simplicity over cleverness".
> 3. So sánh **trung thực** Go với C++/Java/Python/Rust — biết khi nào nên (và không nên) dùng Go.
> 4. Cài Go, chạy được **hello world đầu tiên**, hiểu từng dòng đang làm gì.
> 5. Biết roadmap Tier 1 — 12 lesson tiếp theo sẽ học gì.

## Mục tiêu học tập

- Kể được tối thiểu 3 vấn đề kỹ thuật của Google năm 2007 đã dẫn tới Go.
- Liệt kê được 5 quyết định thiết kế đặc biệt của Go (compile single binary, GC, static type + inference, concurrency first-class, error as value).
- Cho một use case bất kỳ, **chọn được ngôn ngữ phù hợp** và giải thích lý do (không "Go cho mọi thứ").
- Cài Go trên máy mình, verify bằng \`go version\`, chạy \`go run hello.go\`.
- Hiểu vai trò 3 file Go thường gặp: \`main.go\`, \`go.mod\`, \`_test.go\`.

## Tiền đề

- [Lesson 01 — Tư duy lập trình](../lesson-01-thinking-like-programmer/) — decompose, trace, abstraction.
- [Lesson 02 — Môi trường & Git](../lesson-02-dev-environment-git/) — đã có shell, editor, git hoạt động.
- [Lesson 03 — Command line](../lesson-03-command-line-mastery/) — chạy được lệnh trong terminal.
- [Lesson 04 — Đọc code & Debug](../lesson-04-reading-code-debugging/) — biết đọc một file code lạ.

Không cần biết Go trước. Không cần biết ngôn ngữ lập trình nào khác — nếu bạn từng đụng vào bất kỳ ngôn ngữ nào (kể cả Python học sinh học, JavaScript copy từ blog), đủ.

---

## 1. Lịch sử Go — sinh ra để giải bài toán gì?

### 💡 Trực giác — bối cảnh Google 2007

Hình dung bạn đang làm ở Google năm 2007. Codebase C++ khổng lồ, hàng chục triệu dòng. Mỗi lần đổi 1 file \`.cc\`, hệ thống build phải **đọc lại hàng nghìn header file** (đặc tính của C/C++: include là copy-paste text). Một build "không lớn lắm" mất **30-45 phút**. Build cả Search/Ads system: vài tiếng. Dev gõ enter rồi đi pha cà phê, đi họp, về vẫn chưa xong.

Cùng lúc, máy chủ đang chuyển sang **multi-core** (Intel/AMD chạy đua từ năm 2005). C++ và Java đều có thread, nhưng API rườm rà (\`pthread_create\`, \`Thread.start\`, lock-mutex tay), dễ deadlock. Dev viết concurrent code đúng được là chuyện hiếm.

Câu hỏi của 3 ông Robert Griesemer + Rob Pike + Ken Thompson (Sept 2007, một cuộc nói chuyện trong lúc chờ C++ build):

> *"Liệu có thể có một ngôn ngữ vừa **gõ nhanh như Python**, vừa **chạy gần như C**, lại làm cho **concurrent code không khổ sở**?"*

Đó là khởi đầu của Go.

### 1.1 Timeline

| Năm | Sự kiện |
|----:|---------|
| **2007** | Griesemer, Pike, Thompson bàn về ngôn ngữ mới tại Google. |
| **2009** | Go được **open source** (gpl-style license, sau đổi BSD). |
| **2012** | **Go 1.0** — cam kết backward compatibility (Go 1.x code chạy không sửa). |
| **2015** | Go 1.5 — compiler self-hosted (viết bằng Go), GC concurrent. |
| **2018** | **Go 1.11 — modules** (\`go.mod\`, không cần \`GOPATH\` nữa). |
| **2022** | **Go 1.18 — generics** (sau 12 năm dev cộng đồng đòi). |
| **2024+** | Go 1.22, 1.23 — range-over-func, range-over-int, performance/tooling cải thiện liên tục. |

### 1.2 Ba "bài toán Google" mà Go giải

1. **Build chậm**. C++ template + header dày đặc → build 30+ phút. Go: file \`.go\` được biên dịch độc lập, không có header. Project Go cỡ vài chục nghìn dòng build trong **vài giây**.

2. **Dev mới không học nổi C++ nhanh**. Spec C++ ~1300 trang, đầy cạm bẫy (memory, undefined behavior). Google muốn dev junior productive sau vài tuần. Go: spec ~80 trang, 25 keyword, "đọc 1 ngày hiểu cơ bản, viết được sau 1 tuần".

3. **Concurrency là pain**. C++/Java thread API thấp tầng. Go: **goroutine** (lightweight, mở 1 triệu cái cũng được) + **channel** (truyền message giữa goroutine) làm first-class trong ngôn ngữ.

### 1.3 Ai đang dùng Go (2024)?

| Hệ thống | Mục đích | Vì sao chọn Go |
|----------|----------|----------------|
| **Kubernetes** | Container orchestrator | Concurrency (control loop chạy hàng nghìn watcher), deploy 1 binary |
| **Docker** | Container runtime | Single binary, CLI nhanh, static-link không cần dependency hệ thống |
| **Terraform** | Infra-as-code | Cross-compile dễ (1 lệnh build cho mọi OS), single binary |
| **Prometheus** | Metrics & monitoring | Concurrency + GC ổn định cho long-running scrape |
| **etcd** | Distributed KV store | Raft consensus, goroutine cho replicate, low-latency |
| **Caddy** | Web server | Cấu hình đơn giản, TLS auto, deploy 1 file |
| **CockroachDB, TiDB** | Distributed SQL | Concurrency cho distributed transaction |
| **gRPC, GitHub CLI, Hugo, Vault** | ... | Cùng lý do |

> **Quan sát**: Go thống trị mảng **cloud-native / infrastructure**. Không phải ngẫu nhiên — đó chính là mảng mà bài toán "build nhanh, deploy gọn, concurrent" có giá trị cao nhất.

### 📝 Tóm tắt mục 1

- Go ra đời (2007) tại Google để giải **3 nỗi đau**: build C++ chậm, dev junior khó tiếp cận, concurrency khó viết đúng.
- Mốc lớn: 2009 open source, 2012 v1.0, 2018 modules, 2022 generics.
- Là ngôn ngữ chủ đạo của thế hệ infra cloud-native (Kubernetes, Docker, Terraform, Prometheus…).

---

## 2. Triết lý Go — "Simplicity over cleverness"

### 💡 Trực giác

Hầu hết ngôn ngữ phát triển theo hướng "thêm tính năng mới, càng mạnh càng tốt". Go đi ngược: **đặt câu hỏi "có thể bỏ tính năng nào đi mà vẫn đủ dùng không?"** trước khi thêm.

Rob Pike nói:
> *"It must be possible to write large programs in Go without surprises."*  (Phải viết được chương trình lớn mà không gặp chuyện bất ngờ.)

Hệ quả: code Go của người mới và người 5 năm kinh nghiệm **trông gần giống nhau**. Không có "magic", không có operator overload, không có hierarchy class 7 tầng. Mở bất kỳ codebase Go nào → đọc được trong ngày đầu.

### 2.1 Spec ngắn

| Ngôn ngữ | Số trang spec (xấp xỉ) | Số keyword |
|----------|:-:|:-:|
| **Go** | **~80** | **25** |
| C | ~550 | 32 |
| Java | ~800 | ~50 |
| C# | ~700+ | ~80 |
| C++ | ~1300+ | ~95 |
| Rust | ~600+ (book) + reference | ~50 |

**Walk-through bằng số**: 25 keyword Go là \`break continue defer else for fallthrough func go goto if import interface map package range return select struct switch type var const chan case default\`. Đếm: 25. Spec [https://go.dev/ref/spec](https://go.dev/ref/spec) thật sự ngắn — đọc 1 buổi tối là hết.

### 2.2 "One way to do it"

Trong nhiều ngôn ngữ, có 5-7 cách viết \`for\` loop. Trong Go: **chỉ có một cái \`for\`**, không có \`while\`, không có \`do-while\`:

\`\`\`go
for i := 0; i < 10; i++ { ... }      // C-style
for x < 100 { ... }                  // while-style
for { ... }                          // infinite
for k, v := range m { ... }          // range
\`\`\`

Tất cả đều dùng từ khóa \`for\`. Đọc code Go bạn không cần đoán "đây là while hay for hay foreach?" — chỉ có 1 loại.

### 2.3 \`gofmt\` — không tranh cãi format

Go đi kèm 1 lệnh \`gofmt\`. Chạy nó, code của bạn được format **đúng 1 kiểu chuẩn** — tab vs space, vị trí brace, độ thụt lề… tất cả không thương lượng. Hệ quả: không ai code review về format nữa. Mọi cuộc tranh luận "tab hay space, brace cùng dòng hay dòng dưới" đều **tự động kết thúc**.

### 2.4 Composition over inheritance

Go **không có** \`class\`, không có \`extends\`. Thay vào đó:

- \`struct\` chứa data.
- \`interface\` định nghĩa hành vi.
- Một type "implement" interface bằng cách **có đủ method** với đúng signature (duck typing tĩnh).

Ví dụ:

\`\`\`go
type Animal interface {
    Sound() string
}

type Dog struct{ Name string }
func (d Dog) Sound() string { return "Woof" }

type Cat struct{ Name string }
func (c Cat) Sound() string { return "Meow" }
\`\`\`

\`Dog\` và \`Cat\` đều là \`Animal\` — không cần \`class Dog extends Animal\`, không cần \`implements\`. Compiler tự suy ra. (Sẽ học sâu ở Tier 2 Lesson 01.)

### ❓ Câu hỏi tự nhiên

**Q: "Ngôn ngữ ít tính năng vậy có yếu không? Tôi mất tính năng gì so với Java/C++?"**

A: Bạn mất:
- Inheritance (kế thừa class). Bù: interface + composition mạnh không kém, đôi khi gọn hơn.
- Method/operator overloading. Bù: chỉ có 1 cách gọi, đọc code rõ ngay.
- Try/catch exception. Bù: error là value, handle tường minh từng chỗ.
- Trước 2022 không có generics; nay đã có nhưng cố ý "ít magic" hơn Java/C#.

**Q: "Vậy tôi viết code lớn (vài trăm nghìn dòng) có chịu nổi với ít abstraction thế không?"**

A: Có. Kubernetes ~2 triệu dòng Go. Docker, Terraform, etcd đều hàng trăm nghìn dòng. Kinh nghiệm cho thấy: ngôn ngữ **ít magic + format chuẩn + interface gọn** scale lên codebase lớn còn dễ hơn ngôn ngữ "đầy đủ tính năng" — vì ai cũng đọc được code của người khác.

### 📝 Tóm tắt mục 2

- Triết lý: **đơn giản > thông minh**, đọc code không bất ngờ.
- Spec ngắn (~80 trang), 25 keyword, 1 cách viết loop.
- \`gofmt\` chuẩn hoá format → không tranh cãi.
- Không có class/inheritance — dùng struct + interface (composition).

---

## 3. 5 quyết định thiết kế đặc biệt của Go

### 3.1 Compile to single binary

\`go build\` của bạn ra **1 file executable** (không cần JVM, không cần Python interpreter, không cần \`node_modules\`). Mọi dependency được **static link** vào binary đó (mặc định). Deploy = copy 1 file.

**Ví dụ số cụ thể**:
- Hello world Go build ra binary ~**2 MB** (chứa cả runtime + GC).
- Đem file đó copy sang server Linux, \`chmod +x\`, chạy. Không cài gì khác.
- So sánh: hello world Java cần JRE ~**70-200 MB**. Python cần interpreter + venv + pip install.

⚠ **Lỗi thường gặp**: tưởng "single binary = chỉ Go mới có" — sai. Rust, C, C++ đều ra binary. Nhưng Rust/C/C++ thường **dynamic link libc** mặc định → vẫn phụ thuộc hệ thống. Go **static link mọi thứ trừ libc** (và có thể \`CGO_ENABLED=0\` để static cả libc). Đó là khác biệt thực tế khi deploy.

### 3.2 Garbage collected

Go tự quản lý bộ nhớ — bạn không gọi \`malloc\`/\`free\` (như C), không gọi \`new\`/\`delete\` (như C++). Khi 1 object không còn ai tham chiếu, **GC** tự thu hồi.

**Ví dụ số cụ thể**:
- Go GC mặc định mục tiêu **pause < 1 ms** mỗi lần collect (thực tế thường < 500 µs trên app web bình thường).
- Java G1GC pause cỡ vài ms - vài chục ms (tuning tốt thì < 5 ms).
- Manual memory (C/C++): 0 ms pause, nhưng đổi lại bằng nguy cơ bug memory.

⚠ **Lỗi thường gặp**: "GC chậm" — đó là quan niệm cũ. Go GC từ 1.5 (2015) đã concurrent + sub-millisecond, đủ cho hầu hết workload kể cả low-latency service. Chỉ mảng cực kỳ nhạy (high-frequency trading, game engine 144fps) mới gặp giới hạn này.

### 3.3 Static typing + type inference

Type **được kiểm tra ở compile time** (như Java, C++), nhưng **cú pháp gọn** (không phải viết type 2 lần như Java).

**Ví dụ so sánh**:

\`\`\`java
// Java
int count = 10;
String name = "Alice";
List<Integer> nums = new ArrayList<Integer>();
\`\`\`

\`\`\`go
// Go — type tự suy luận từ giá trị
count := 10
name  := "Alice"
nums  := []int{}
\`\`\`

\`:=\` là "khai báo + gán + suy type". Compiler thấy \`10\` → biết là \`int\`; thấy \`"Alice"\` → biết là \`string\`. Vẫn type-safe (gán \`count = "hello"\` sau đó sẽ compile error), nhưng viết gọn như Python.

### 3.4 Concurrency là first-class

Hầu hết ngôn ngữ: thread/async là thư viện thêm (\`pthread\`, \`java.util.concurrent\`, \`asyncio\`). Go: \`go\`, \`chan\`, \`select\` là **keyword**.

\`\`\`go
go doSomething()         // chạy doSomething() trong goroutine mới
ch := make(chan int)     // tạo channel int
ch <- 42                 // gửi 42 vào channel
x := <-ch                // nhận từ channel
\`\`\`

**Walk-through bằng số**: goroutine có stack ban đầu **~2 KB** (so với thread OS ~1-8 MB). Mở **1 triệu goroutine** trên 1 máy laptop là chuyện thực hiện được. Mở 1 triệu OS thread? Không khả thi — RAM sẽ chết.

Sẽ học sâu ở Tier 2-3. Ở đây chỉ cần biết: Go làm concurrency thành chuyện **bình thường, không phải kỹ năng nâng cao**.

### 3.5 No exceptions — error as value

Go **không có** \`try/catch\`. Lỗi được trả về như giá trị thường:

\`\`\`go
data, err := os.ReadFile("config.json")
if err != nil {
    // xử lý lỗi
    return err
}
// dùng data
\`\`\`

**Walk-through**: \`os.ReadFile\` trả 2 giá trị — \`data []byte\` và \`err error\`. Nếu file thiếu, \`err\` khác \`nil\`. Bạn **buộc phải nhìn thấy \`err\`** trong code (không "ẩn" như exception bay xuyên 10 tầng stack).

⚠ **Lỗi thường gặp**:
- *"Verbose quá, viết \`if err != nil\` 100 lần"* — đúng, đây là điểm gây tranh cãi nhất của Go. Đổi lại: bạn biết **chính xác chỗ nào có thể lỗi**, không bị "exception ẩn" làm crash production lúc 2h sáng.
- *"Quên check \`err\`"* — \`go vet\` và linter (\`golangci-lint\`) sẽ bắt. CI nên bật.

### ❓ Câu hỏi tự nhiên

**Q: "Trong 5 cái trên, cái nào là quyết định gây tranh cãi nhất?"**

A: Error handling (3.5). Nhiều dev đến từ Java/Python phàn nàn verbose. Go team từ chối thay đổi suốt 10 năm. Đến Go 1.13 mới thêm \`errors.Is/As/Unwrap\` để compose error, nhưng vẫn giữ pattern \`if err != nil\`. Tới Go 1.22+, các proposal "try" liên tục bị reject. Đây là **quyết định triết lý**, không phải bỏ sót.

**Q: "Còn \`panic\`/\`recover\` thì sao?"**

A: Có, nhưng dùng cho lỗi **không thể recover ở mức ngữ nghĩa thường** (vd index out of range, nil pointer dereference). Code app bình thường **không** dùng panic làm control flow. Đây là khác biệt căn bản với exception trong Java.

### 📝 Tóm tắt mục 3

- Single binary — deploy 1 file.
- GC sub-millisecond — không lo memory bug, vẫn đủ nhanh cho hầu hết workload.
- Static type + \`:=\` — an toàn như Java, gõ gọn như Python.
- \`go\`/\`chan\`/\`select\` first-class — concurrency thành chuyện thường ngày.
- Error là value — verbose nhưng rõ, không "ẩn" như exception.

---

## 4. So sánh thực tế với 4 ngôn ngữ khác

> Mục tiêu: **không fan-boy**. Mỗi ngôn ngữ giỏi ở mảng nào, Go yếu ở mảng nào — đánh giá thẳng.

### 4.1 Go vs C/C++

| Tiêu chí | Go | C/C++ |
|----------|----|-------|
| Build speed | **Rất nhanh** (vài giây cho project trung) | Chậm (template + header bloat) |
| Runtime perf | Tốt (~70-90% so với C đa số case) | **Tốt nhất** (giới hạn phần cứng) |
| Memory safety | An toàn (GC + no pointer arithmetic) | **Dễ bug** (segfault, UAF, leak) |
| Control mức thấp | Hạn chế (không SIMD intrinsic dễ, không inline ASM thuận tiện) | **Toàn quyền** |
| Productivity dev | **Cao** | Thấp (debug memory tốn thời gian) |

- **Chọn Go**: backend service, CLI tool, infrastructure tool, distributed system. Vd Docker, Kubernetes — không cần squeeze 100% perf.
- **Chọn C/C++**: game engine (Unreal, Unity Engine), browser engine, OS kernel, embedded firmware, high-frequency trading, hot loop của database engine.

**Ví dụ thực tế**: Postgres viết C (1986 — Go chưa tồn tại, và nay nếu viết lại cũng vẫn C vì cần cực hạn perf). CockroachDB (database tương tự Postgres về API) viết Go — chọn Go vì ưu tiên distributed/cloud-native hơn raw single-node perf.

### 4.2 Go vs Java

| Tiêu chí | Go | Java |
|----------|----|------|
| Build speed | **Rất nhanh** | Trung bình (Gradle/Maven nặng) |
| Runtime perf | Tốt | **Tốt** (JIT mature, sau warm-up) |
| Startup time | **Tức thì** (~5-50 ms) | Chậm (~500 ms - vài giây JVM) |
| Memory footprint | **Nhỏ** | Lớn (JVM overhead) |
| Deploy | **1 binary** | JAR + JRE, hoặc fat-jar lớn |
| Ecosystem | Đang lớn | **Khổng lồ** (Spring, Hibernate, Kafka client native, Hadoop, Spark…) |
| Generics maturity | Mới (2022) | **Trưởng thành** (2004) |
| GC | Low-latency tốt hơn | Tunable, có nhiều GC (G1, ZGC, Shenandoah) |

- **Chọn Go**: cloud-native, microservice cần khởi động nhanh, serverless function, CLI/tooling. Vd Kubernetes — không thể start container mất 5s warm-up JVM.
- **Chọn Java**: enterprise legacy đã có sẵn Spring, Big Data (Spark, Hadoop, Flink — ecosystem JVM gốc), Android backend, hệ thống cần ORM/transaction framework phức tạp.

### 4.3 Go vs Python

| Tiêu chí | Go | Python |
|----------|----|--------|
| Runtime perf | **Nhanh 10-100x** | Chậm (interpreted, GIL) |
| Type safety | Static, compile-time | Dynamic (mypy tùy chọn) |
| Concurrency | Goroutine + channel | GIL cản đa luồng, asyncio rối |
| Learning curve | Dễ | **Dễ hơn nữa** |
| Ecosystem | Backend/infra mạnh | **Vô địch** data/AI/ML (NumPy, pandas, PyTorch, sklearn) |
| Deploy | **1 binary** | venv + pip + requirements.txt + dockerize |
| Scripting nhanh | Cần \`go run\`, không repl mặc định | **Repl tức thì**, prototype 5 phút |

- **Chọn Go**: production backend service, hot path API, data pipeline cần throughput.
- **Chọn Python**: ML training, data analysis, automation script ngắn, Jupyter notebook, glue code đầu prototype.

**Ví dụ thực tế**: Instagram backend (Django/Python) — chấp nhận trả giá perf để dev nhanh. Dropbox bắt đầu Python, sau viết lại các service hot path bằng Go.

### 4.4 Go vs Rust

| Tiêu chí | Go | Rust |
|----------|----|------|
| Memory safety | An toàn (GC) | **An toàn nhất** (compile-time, no GC) |
| Runtime perf | Tốt | **Tốt nhất** (ngang C/C++) |
| Learning curve | **Dễ** (1 tuần productive) | Dốc (borrow checker, lifetime — vài tháng) |
| Boilerplate | Ít | Nhiều (\`.unwrap()\`, \`Result<>\`, lifetime annotations) |
| Compile speed | **Nhanh** | Chậm (LLVM + monomorphization) |
| GC pause | Có (sub-ms) | **Không có** |
| Concurrency | Goroutine + channel | async/await + ownership đảm bảo data race-free |
| Ecosystem | Backend/infra | System programming, WebAssembly, crypto, embedded |

- **Chọn Go**: ship nhanh, team mix level, backend service, infra tool, không cần perf cực đại.
- **Chọn Rust**: cần perf tối đa và không chấp nhận GC pause (game engine, OS, browser, embedded, blockchain hot path), library/SDK cấp thấp.

**Ví dụ thực tế**: Firecracker (microVM của AWS Lambda) viết Rust — cần perf + an toàn không có pause. Kubernetes viết Go — ship nhanh, control loop nhiều, perf đủ dùng.

### 4.5 Bảng tổng hợp — 6 trục

Thang **1 (yếu) → 5 (mạnh)**:

| | Go | Rust | Python | Java | C++ |
|---|:-:|:-:|:-:|:-:|:-:|
| Compile speed | **5** | 2 | N/A (interp) | 3 | 1 |
| Runtime perf | 4 | **5** | 1 | 4 | **5** |
| Learning curve | 4 | 1 | **5** | 3 | 1 |
| Ecosystem (general) | 3 | 3 | **5** | **5** | 4 |
| Concurrency UX | **5** | 4 | 1 | 3 | 2 |
| Memory safety | 4 | **5** | 4 (no manual mem, có ref leak) | 4 | 1 |

(Diễn giải: Go cân bằng 4-5 mọi trục trừ ecosystem; Rust cực đại perf + safety nhưng learning curve dốc; Python học siêu dễ + ecosystem khổng lồ nhưng perf yếu; Java/C++ ngược nhau ở compile/perf.)

### 📝 Tóm tắt mục 4

- **Go vs C/C++**: Go thắng productivity + safety, C/C++ thắng raw perf + control.
- **Go vs Java**: Go thắng startup + deploy + concurrency UX, Java thắng ecosystem + maturity.
- **Go vs Python**: Go thắng perf + type safety, Python thắng ML/data + tốc độ prototype.
- **Go vs Rust**: Go thắng learning curve + ship speed, Rust thắng perf + zero GC.

---

## 5. Khi nào KHÔNG nên chọn Go

Trung thực — Go không phải búa vạn năng:

1. **GUI desktop app**. Go yếu mảng này. Bindings (\`Fyne\`, \`Wails\`, \`gioui\`) tồn tại nhưng ecosystem mỏng. Nếu cần GUI: Electron (JS/TS), Tauri (Rust + web), Qt (C++), Swift/Kotlin (native).

2. **ML/AI training**. Python độc tôn vì PyTorch/TensorFlow/JAX gốc Python. Go có bindings (Gorgonia, TF-Go) nhưng dùng cho **inference** thì được, **training** thì đừng. Quy ước thực tế: train bằng Python, export model, serve bằng Go.

3. **Game engine với latency cực thấp**. GC pause sub-ms vẫn là pause. Game 144fps có ngân sách 6.9 ms/frame — không muốn GC ăn vào. C++/Rust hợp hơn. (Go vẫn dùng được cho game server backend, không phải game engine.)

4. **Mobile native**. Go có \`gomobile\` nhưng ecosystem hạn chế. iOS dùng Swift, Android dùng Kotlin. Cross-platform: Flutter (Dart) hoặc React Native (JS/TS) phổ biến hơn.

5. **Hệ thống cần SIMD intrinsics nặng / inline assembly thường xuyên**. Go có ASM nhưng khó dùng so với C/Rust. Hot loop của codec, crypto primitive — thường vẫn viết C/ASM rồi gọi từ Go.

6. **Microcontroller / embedded RAM siêu thấp**. TinyGo có hỗ trợ nhưng giới hạn. Nếu chip có 8 KB RAM thì C vẫn là lựa chọn mặc định.

### ⚠ Lỗi thường gặp

- *"Tôi học Go xong sẽ dùng Go cho mọi thứ"* — sai. Mỗi ngôn ngữ có chỗ. Mục tiêu là biết **chọn đúng**, không phải biết 1 ngôn ngữ.
- *"Go chậm hơn Java vì có GC"* — không hẳn. Hai GC khác kiến trúc; Go GC tối ưu latency, Java G1 tối ưu throughput. Tuỳ workload.

---

## 6. Cài đặt Go

### 6.1 Cài đặt theo OS

**macOS**:
\`\`\`bash
brew install go
\`\`\`

**Ubuntu/Debian**:
\`\`\`bash
sudo apt update
sudo apt install golang-go
\`\`\`

⚠ Apt repo thường có version cũ (vd Ubuntu 22.04 LTS có Go 1.18). Nếu cần Go mới: download từ [go.dev/dl](https://go.dev/dl/) hoặc dùng [\`g\`](https://github.com/stefanmaric/g) (Go version manager).

**Windows**:
- Tải installer MSI từ [go.dev/dl](https://go.dev/dl/), chạy. Hoặc dùng \`winget install GoLang.Go\`.

**Generic (mọi Linux)**:
\`\`\`bash
wget https://go.dev/dl/go1.22.0.linux-amd64.tar.gz
sudo rm -rf /usr/local/go
sudo tar -C /usr/local -xzf go1.22.0.linux-amd64.tar.gz
echo 'export PATH=$PATH:/usr/local/go/bin' >> ~/.bashrc
source ~/.bashrc
\`\`\`

### 6.2 Verify cài đặt

\`\`\`bash
go version
# Output mong đợi:
# go version go1.22.0 linux/amd64
\`\`\`

Nếu báo \`command not found\` → \`PATH\` chưa có \`go\`. Check bằng \`which go\` và sửa \`~/.bashrc\` / \`~/.zshrc\`.

### 6.3 \`GOPATH\` cũ vs Go modules mới

**Trước 2018** (Go < 1.11): code phải nằm trong \`$GOPATH/src/github.com/<user>/<repo>/\`. Không free-form. Đau đầu.

**Từ Go 1.11+ (modules)**: code nằm **bất kỳ đâu**. Trong thư mục project chỉ cần có file \`go.mod\`. Quên \`GOPATH\` đi.

> Sẽ học kỹ ở [Lesson 06 — Hello World & Go modules](../tier-1-basic/lesson-01-hello-world-modules/). Ở đây chỉ cần biết: **tạo project mới = \`go mod init <tên>\`**.

---

## 7. Hello world đầu tiên

### 7.1 Code

Tạo file \`hello.go\`:

\`\`\`go
package main

import "fmt"

func main() {
    fmt.Println("Xin chào, Go!")
}
\`\`\`

### 7.2 Giải thích từng dòng (chưa cần sâu)

| Dòng | Ý nghĩa |
|------|---------|
| \`package main\` | File này thuộc **package** tên \`main\`. Tên \`main\` đặc biệt — cho compiler biết "đây là file executable, không phải library". Mọi file Go phải bắt đầu bằng \`package <tên>\`. |
| \`import "fmt"\` | Import package \`fmt\` (format I/O) — chứa \`Println\`, \`Printf\`, \`Scan\`, … \`fmt\` thuộc standard library. |
| \`func main() {\` | Khai báo hàm \`main\` — entry point của program. Khi chạy, Go gọi \`main()\` đầu tiên. Hàm không nhận tham số, không return. |
| \`fmt.Println(...)\` | Gọi hàm \`Println\` trong package \`fmt\`. In ra stdout + tự xuống dòng. |
| \`}\` | Đóng hàm. Brace **phải cùng dòng** với \`func\` (yêu cầu \`gofmt\`). |

⚠ **Lỗi thường gặp**:
- Đặt \`{\` xuống dòng mới sau \`func main()\` — sẽ bị compile error. Đặc thù Go: brace mở **phải** cùng dòng.
- Quên \`import "fmt"\` mà gọi \`fmt.Println\` → "undefined: fmt".
- Đặt \`package main\` ở giữa file → "expected 'package'". \`package\` phải là **dòng code đầu tiên** (sau comment nếu có).

### 7.3 Chạy

\`\`\`bash
go run hello.go
\`\`\`

Output:
\`\`\`
Xin chào, Go!
\`\`\`

\`go run\` = **compile + chạy trong 1 lệnh**, không lưu binary lại.

### 7.4 Build binary

\`\`\`bash
go build hello.go
ls -lh hello
# -rwxr-xr-x  1 user  staff  1.8M hello
./hello
# Xin chào, Go!
\`\`\`

\`go build\` tạo ra **file executable \`hello\`** (Windows: \`hello.exe\`). Cross-compile sang OS khác:

\`\`\`bash
GOOS=linux GOARCH=amd64 go build hello.go     # build Linux từ Mac
GOOS=windows GOARCH=amd64 go build hello.go   # build Windows từ Mac
\`\`\`

### ❓ Câu hỏi tự nhiên

**Q: "1.8 MB cho 1 hello world? Sao to thế?"**

A: Binary Go chứa **toàn bộ Go runtime** (scheduler goroutine, GC, một phần stdlib). Đó là cái giá của "single binary, no dependency". Strip thì còn ~1.4 MB. Cũng có thể dùng UPX để nén xuống ~600 KB. Project lớn hơn thì overhead này ngày càng "loãng" — Kubernetes API server ~120 MB chứ không phải 100x của hello world.

**Q: "Tôi có thể đặt tên file khác \`hello.go\` không?"**

A: Có. Tên file không quan trọng. Chỉ **\`package main\` + \`func main()\`** mới quan trọng. Đặt \`app.go\`, \`cmd.go\`, \`xinchao.go\` — đều chạy.

---

## 8. Hello world phiên bản 2 — nhận tên từ argument

Tạo file \`hello2.go\`:

\`\`\`go
package main

import (
    "fmt"
    "os"
)

func main() {
    name := "bạn"
    if len(os.Args) > 1 {
        name = os.Args[1]
    }
    fmt.Printf("Xin chào, %s!\\n", name)
}
\`\`\`

Chạy:
\`\`\`bash
go run hello2.go              # → Xin chào, bạn!
go run hello2.go Alice        # → Xin chào, Alice!
go run hello2.go "Nguyễn Văn A"   # → Xin chào, Nguyễn Văn A!
\`\`\`

### Giải thích nhanh (sẽ học sâu ở Tier 1)

- \`import ( "fmt"; "os" )\` — import nhiều package trong 1 block. Cú pháp gọn.
- \`os.Args\` — slice (mảng động) của string. \`os.Args[0]\` là tên chương trình, \`os.Args[1]\` là argument đầu tiên người dùng truyền, v.v.
- \`len(os.Args) > 1\` — check có argument không. Nếu không, dùng default \`"bạn"\`.
- \`name := "bạn"\` — \`:=\` khai báo + suy type. Compiler thấy \`"bạn"\` → biết là \`string\`.
- \`fmt.Printf("...\\n", name)\` — \`%s\` thay bằng giá trị \`name\`. \`\\n\` xuống dòng (Printf không tự xuống dòng).

> **Đây là tease** — \`slice\`, \`string\`, \`fmt.Printf\` format verb, \`if\` syntax sẽ được học kỹ ở Tier 1 (Lesson 02-04). Mục tiêu hiện tại: thấy code Go có thể "làm việc thật" được, không chỉ in 1 dòng.

---

## 9. 3 file Go bạn sẽ gặp

| File | Mục đích |
|------|----------|
| **\`main.go\`** (hoặc tên bất kỳ) | File chứa \`package main\` + \`func main()\`. Một project có thể có **nhiều file** thuộc cùng package — không cần gộp 1 file. |
| **\`go.mod\`** | File khai báo **module** (tương đương \`package.json\` Node, \`Cargo.toml\` Rust, \`pyproject.toml\` Python). Chứa: tên module, version Go yêu cầu, dependency. Tạo bằng \`go mod init <tên-module>\`. |
| **\`*_test.go\`** | File test. Bất kỳ file nào tên kết thúc \`_test.go\` được \`go test\` nhận diện. Hàm test đặt tên \`func TestXxx(t *testing.T)\`. Học kỹ ở Tier 2 Lesson 06. |

Ví dụ \`go.mod\` tối thiểu:

\`\`\`
module github.com/myuser/hello

go 1.22
\`\`\`

Project lớn sẽ có thêm \`require\` block liệt kê dependency (sẽ thấy ở Tier 1 L01).

---

## 10. Ứng dụng thực tế — Vì sao Docker dùng Go?

Docker khởi đầu (2013) bằng **Python** (dotCloud — công ty mẹ của Docker — vốn là platform Python). Sau ~6 tháng họ **viết lại bằng Go**. Lý do:

1. **Single binary** — Docker daemon + CLI là 1-2 file, không cần cài Python + venv + dependency trên mọi máy người dùng.
2. **Concurrency** — Docker phải watch nhiều container, signal, network event đồng thời. Goroutine + channel viết tự nhiên hơn \`asyncio\` Python (lúc đó còn non).
3. **Static type catch bug compile time** — codebase lớn lên nhanh, type Python bị khó kiểm soát.
4. **Cross-compile** — 1 lệnh build cho Linux/Mac/Windows. Phù hợp tool cần chạy mọi nơi.
5. **Perf** — start container, parse JSON config, network namespace setup, đều nhanh hơn nhiều.

Đây là **case study lặp lại** trong nhiều công ty: **prototype Python → production Go** khi service trưởng thành. (Không phải luật cứng — ngược chiều cũng có: từ Java sang Go vì latency/footprint.)

---

## 11. Roadmap Tier 1 — sắp tới học gì

Sau lesson này, vào **Tier 1 (Go Basic)** — 12 lesson:

| # | Lesson | Bạn sẽ học |
|---:|--------|------------|
| **L01** | Hello world & Go modules | \`go mod init\`, \`go run\`, \`go build\`, cấu trúc 1 project Go. |
| **L02** | Biến, hằng, kiểu dữ liệu | \`var\`, \`const\`, \`int/string/bool/float\`, \`:=\`, type conversion. |
| **L03** | Toán tử & biểu thức | Arithmetic, logical, bitwise, precedence, \`iota\`. |
| **L04** | Control flow — if & switch | \`if-else\`, \`switch\` (Go switch khác C — không cần \`break\`). |
| **L05** | Vòng lặp — for | Chỉ có \`for\`, dùng cho mọi trường hợp. \`range\`. |
| **L06** | Function | \`func\`, multiple return, named return, variadic, closure cơ bản. |
| **L07** | Array & Slice | Slice là cốt lõi Go — capacity, append, copy, gotcha. |
| **L08** | Map | \`map[K]V\`, lookup, iterate, delete, "comma ok" idiom. |
| **L09** | String & byte/rune | UTF-8, \`len\` vs \`utf8.RuneCountInString\`, byte vs rune. |
| **L10** | Pointer | \`&\`, \`*\`, vì sao Go có pointer nhưng không có pointer arithmetic. |
| **L11** | Struct | \`type X struct\`, method receiver, value vs pointer receiver. |
| **L12** | Mini-project: CLI todo app | Ráp tất cả lại — viết 1 CLI quản lý todo lưu file JSON. |

Tier 2 (Intermediate) sẽ tiếp tục với: interface, error idioms, IO, JSON, testing, package, và concurrency cơ bản (goroutine + channel).

---

## 12. Bài tập

### Bài tập 1 — Cài đặt và verify

Cài Go lên máy bạn theo mục 6. Sau đó:
1. Mở terminal, chạy \`go version\`. Copy output.
2. Chạy \`go env GOROOT GOPATH GOOS GOARCH\`. Ghi lại từng giá trị.
3. Viết 1 câu giải thích mỗi giá trị.

### Bài tập 2 — Hello world

Tạo thư mục \`~/learn-go/hello/\`. Trong đó:
1. Tạo file \`hello.go\` đúng theo mục 7.1. Chạy \`go run hello.go\`.
2. Sửa thành "Xin chào, **<tên của bạn>**!". Chạy lại.
3. Chạy \`go build hello.go\`. Đo size binary bằng \`ls -lh hello\`. Chạy \`./hello\`. Ghi lại size.
4. Bonus: chạy \`go build -ldflags="-s -w" hello.go\`, đo lại size, so sánh.

### Bài tập 3 — Cái nào compile được?

Cho 4 đoạn code Go. **Không chạy \`go run\`** — dự đoán cái nào compile được, cái nào lỗi, và **lỗi gì**.

**Đoạn A**:
\`\`\`go
package main
import "fmt"
func main() {
    fmt.Println("Hi")
}
\`\`\`

**Đoạn B**:
\`\`\`go
package main
func main()
{
    fmt.Println("Hi")
}
\`\`\`

**Đoạn C**:
\`\`\`go
package main
import "fmt"
func main() {
    fmt.Println("Hi")
    name := "Alice"
}
\`\`\`

**Đoạn D**:
\`\`\`go
package main
import "fmt"
func Main() {
    fmt.Println("Hi")
}
\`\`\`

Trả lời: với mỗi đoạn — "Compile được ✓" hoặc "Lỗi: <mô tả>".

### Bài tập 4 — Chọn ngôn ngữ cho 5 use case

Với mỗi use case, **chọn ngôn ngữ phù hợp nhất** từ {Go, Rust, Python, Java, C++} và viết **1 câu lý do**:

1. Game 3D indie cần chạy 60 fps trên laptop tầm trung, deadline 18 tháng, team 4 người.
2. Microservice xử lý 50k request/giây, latency p99 < 50 ms, cần deploy nhanh trên Kubernetes.
3. Script ETL: đọc 200 GB CSV, làm sạch, ghi vào Postgres + S3. Chạy nightly.
4. Mobile app iOS quản lý tài chính cá nhân, có UI animation phức tạp.
5. Kernel module Linux để bắt packet ở network layer.

### Bài tập 5 — Đọc tin tức (case study)

Đọc đoạn dưới đây (anonymized, lấy ý từ một bài blog kỹ thuật thật):

> *"Năm 2014, công ty X có service chạy 4 năm bằng Python. Service quản lý ~50k workload mỗi giây, codebase 80k dòng, 30 dev. Khi traffic tăng 10x, latency p99 vọt lên 800ms, memory footprint 12GB/instance. Họ viết lại bằng Go trong 8 tháng. Sau khi rollout: latency p99 còn 70ms, memory 1.8GB/instance, codebase còn 45k dòng. Build CI từ 9 phút xuống 40 giây. Tuy nhiên team mất 3 tháng đầu để học idiom Go và tái cấu trúc một số chỗ Python rất 'dynamic'."*

Trả lời ngắn:
1. Trong 5 quyết định thiết kế ở mục 3, **những cái nào** đóng góp vào kết quả trên? (Ít nhất 3.)
2. **"3 tháng đầu để học idiom Go"** — bạn đoán họ vướng nhất chỗ nào? (Hint: Python idiom nào Go không có?)
3. Nếu thay Go bằng **Rust**, kết quả có khác không? Liệt kê 1 lợi thế và 1 bất lợi của Rust trong context này.

---

## 13. Lời giải chi tiết

### Giải BT1

\`go version\` ra dạng:
\`\`\`
go version go1.22.0 linux/amd64
\`\`\`

Phân tích: tên \`go\` + version \`1.22.0\` + OS \`linux\` + arch \`amd64\`.

\`go env\`:
- \`GOROOT\` — nơi Go SDK được cài (vd \`/usr/local/go\`). Chứa stdlib + toolchain.
- \`GOPATH\` — workspace cũ (vd \`~/go\`). Từ Go modules trở đi, ít dùng cho code project, nhưng \`~/go/bin\` vẫn là nơi \`go install\` đặt binary tool.
- \`GOOS\` — OS hiện tại (\`linux\`, \`darwin\`, \`windows\`). Đổi giá trị khi cross-compile.
- \`GOARCH\` — kiến trúc CPU (\`amd64\`, \`arm64\`, …).

### Giải BT2

Code đúng:
\`\`\`go
package main
import "fmt"
func main() {
    fmt.Println("Xin chào, Duy!")
}
\`\`\`

\`ls -lh hello\` thường ra **~1.8 MB** trên Linux amd64.

Sau khi strip với \`-ldflags="-s -w"\`:
- \`-s\`: bỏ symbol table.
- \`-w\`: bỏ DWARF debug info.
- Kết quả: thường giảm còn **~1.3 MB**. Trade-off: stack trace không có tên hàm dễ đọc khi crash.

### Giải BT3

| Đoạn | Kết quả | Lý do |
|------|---------|-------|
| **A** | ✓ Compile được. | Đúng cú pháp chuẩn. |
| **B** | ✗ **\`syntax error: unexpected semicolon or newline before {\`** | Go yêu cầu \`{\` cùng dòng với \`func\`. Quy tắc cứng — đây là chỗ Go khác C/Java. |
| **C** | ✗ **\`name declared but not used\`** | Go cấm khai báo biến mà không dùng. Phải dùng \`name\` hoặc đổi thành \`_ = "Alice"\`. (Quy tắc này gây tranh cãi nhiều, nhưng giúp giữ code sạch.) |
| **D** | ✗ **\`function main is undeclared in the main package\`** (link error) | Entry point bắt buộc viết thường: \`main\`, không phải \`Main\`. Go case-sensitive, và quy ước **viết hoa = export ra ngoài package**, viết thường = nội bộ. \`main\` phải viết thường. |

### Giải BT4

1. **Game 3D indie 60 fps** → **C++** (Unity/Unreal/Godot dùng C++ làm engine, tooling sẵn, GC pause không phù hợp game realtime). Rust cũng được nhưng ecosystem game engine còn mỏng (Bevy đang lên nhưng chưa mature so với Unity).

2. **Microservice 50k req/s, p99 < 50ms, K8s** → **Go**. Đây đúng là sweet spot: startup nhanh (k8s scale up/down liên tục), GC sub-ms đủ cho p99 < 50ms, single binary deploy gọn.

3. **ETL 200 GB CSV nightly** → **Python** (pandas/Polars + sqlalchemy + boto3 — ecosystem ETL Python chín nhất). Nếu cần perf hơn: **Go** với worker pool. Trade-off: Python dev nhanh, Go chạy nhanh.

4. **iOS mobile app** → **Swift** (native iOS, UI animation tốt nhất với SwiftUI/UIKit). Có thể React Native/Flutter nếu cần cross-platform, nhưng "UI phức tạp" nghiêng về native.

5. **Linux kernel module** → **C**. Kernel Linux viết C, kernel module bắt buộc phải C (gần đây Rust cũng được merge từ 6.1, nhưng C vẫn là chuẩn). Go không thể vì có runtime + GC — chạy được trong user space, không trong kernel.

### Giải BT5

**Câu 1** — quyết định nào đóng góp:
- **(3.1) Single binary** → deploy nhanh, k8s rollout đơn giản.
- **(3.2) GC + (3.3) static type** → giảm memory footprint (Python dynamic + ref counting + cycle GC nặng) và bug runtime.
- **(3.4) Concurrency first-class** → 50k workload/s xử lý bằng goroutine pool tự nhiên hơn asyncio.
- **(3.5) Error as value** → 30 dev codebase phình to, error tường minh giúp giảm bug "swallow exception".

Build CI từ 9 phút → 40s là do **compile speed** của Go (mục 1.2 #1 — chính bài toán Google).

**Câu 2** — "3 tháng học idiom":
- Pattern Python "duck typing thuần dynamic" — gán bất kỳ field nào lúc runtime — không có ở Go.
- Decorator / metaclass / monkey-patch của Python — Go không có.
- Exception → phải đổi sang \`if err != nil\` từng chỗ, refactor control flow.
- List comprehension, generator → phải viết for loop tường minh.
- Trước Go 1.18, không có generic → code "framework" phải dùng interface{} + type assertion, hoặc code-gen.

**Câu 3** — nếu chọn Rust:
- **Lợi thế**: 0 GC pause → p99 còn thấp hơn nữa, có thể đạt p99 < 20ms; memory footprint nhỏ hơn (~1.2GB thay vì 1.8GB).
- **Bất lợi**: 8 tháng viết lại + 3 tháng học idiom Go → có thể thành **18+ tháng** với Rust vì borrow checker. Team Python cũ vào Rust dốc hơn vào Go nhiều. Risk delivery cao.

---

## 14. Code & Minh họa

- File code minh họa: [\`solutions.go\`](./solutions.go) — chứa cả 2 phiên bản hello world có thể chạy được.
- File minh họa tương tác: [\`visualization.html\`](./visualization.html) — gồm 3 module:
  - **Language Comparison** — chọn 2 ngôn ngữ, so sánh 6 trục bằng bar chart SVG.
  - **Hello World Playground** — chọn variant, "run" mô phỏng output.
  - **Use Case Matcher** — click vào use case, match với ngôn ngữ phù hợp + giải thích.

Chạy \`solutions.go\`:
\`\`\`bash
cd Programming/lesson-05-why-go-philosophy
go run solutions.go              # → chạy demo 1 và demo 2 lần lượt
go run solutions.go Alice        # → demo 2 lấy "Alice" làm tên
\`\`\`

---

## 15. Kết thúc Tier 0 — bạn đã có gì?

Sau 5 lesson Tier 0:
- ✅ Tư duy lập trình (decompose, trace, abstraction).
- ✅ Môi trường dev + Git.
- ✅ Command line.
- ✅ Đọc & debug code.
- ✅ Hiểu Go là gì, vì sao nó tồn tại, viết được hello world.

**Bước tiếp theo**: [Tier 1 — Go Basic](../tier-1-basic/index.html) → bắt đầu với [L01 — Hello World & Go Modules](../tier-1-basic/lesson-01-hello-world-modules/) (sẽ thực sự setup \`go mod\`, tổ chức project, viết test đầu tiên).

🔁 **Trước khi sang Tier 1, tự kiểm tra**:

1. Bạn có giải thích được trong 2 phút "vì sao Google làm Go" cho 1 người không học IT không?
   <details><summary>Đáp án</summary>
   Build C++ chậm, dev mới khó học, concurrency khó. Go giải cả 3.
   </details>

2. Khi bạn cần viết 1 web scraper crawl 100 trang để phân tích data, bạn chọn Go hay Python? Vì sao?
   <details><summary>Đáp án</summary>
   Python — quick prototype + ecosystem scraping (requests, BS4, scrapy) + pandas để analyze data. Go là overkill nếu chỉ chạy 1 lần.
   </details>

3. Hello world Go ra binary 1.8MB — bạn có thấy đó là vấn đề không?
   <details><summary>Đáp án</summary>
   Tùy ngữ cảnh. Với laptop dev / server, 1.8MB không là gì. Với embedded chip 8MB flash, đó là vấn đề lớn. Hầu hết use case Go (backend service, CLI) — không phải vấn đề.
   </details>
`;
