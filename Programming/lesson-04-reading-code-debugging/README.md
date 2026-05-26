# Lesson 04 — Đọc code & Debug

> "Code is read much more often than it is written." — *Guido van Rossum, tác giả Python.*
> Bạn sẽ dành 10 phần đời lập trình viên để **đọc**, chỉ 1 phần để **viết**. Vậy mà trường lớp gần như không dạy đọc code. Lesson này lấp đúng khoảng đó — cộng thêm debugging, kỹ năng định nghĩa lại trình độ "senior".

## Mục tiêu học tập

Sau lesson này bạn sẽ:

- Biết quy trình **đọc một codebase lạ** không bị lạc (top-down, không line-by-line).
- Dùng được công cụ đọc code: Go to Definition, Find References, `grep`/`rg`, godoc.
- Đọc được **spec / RFC / godoc** mà không sợ — biết `MUST` / `SHOULD` / `MAY` khác nhau ra sao.
- Định nghĩa được "debug là gì" — và vì sao bug 99% là do **mental model sai**, không phải compiler buggy.
- Nắm **5 nguyên tắc debug** + 5 kỹ thuật từ print đến debugger đến `git bisect`.
- Đọc được **stack trace Go** từ trên xuống, biết panic xảy ra ở đâu.
- Có bộ **heuristic tìm bug nhanh**: off-by-one, nil, race, encoding, timezone, cache stale.
- Biết khi nào **xin trợ giúp** đúng cách thay vì cắm đầu một mình.

## Kiến thức tiền đề

- [Lesson 01 — Tư duy lập trình](../lesson-01-thinking-like-programmer/README.md): decompose, pattern matching.
- [Lesson 02 — Dev env & Git](../lesson-02-dev-environment-git/README.md): `git log`, `git diff` — sẽ dùng cho `git bisect`.
- [Lesson 03 — Command Line](../lesson-03-command-line-mastery/README.md): `grep`, `rg`, pipe — đọc code từ CLI.

> 💡 **Lesson này KHÔNG dạy syntax Go.** Code snippet Go chỉ minh hoạ. Từ Lesson 05 ([Vì sao Go?](../lesson-05-why-go-philosophy/README.md)) bạn mới bắt đầu chạm syntax.

---

## 1. Đọc code lạ — kỹ năng quan trọng hơn viết code

### 1.1 Một câu chuyện thật

Tuần đầu vào job mới. Tech lead chỉ cho bạn repo `payment-service`, 487 file Go, 142 nghìn dòng. Ticket đầu tiên: *"Khi user đổi phương thức thanh toán giữa chừng, charge bị double. Fix nó."*

Bạn mở `main.go` ra đọc từ dòng 1. 20 phút sau, mới đọc tới dòng 200 của file. Còn 141.800 dòng. Bug ở đâu? Không biết.

Đây là **cách đọc sai**. Cách đúng dưới đây sẽ giúp bạn xử lý ticket đó trong 2 tiếng thay vì 2 tuần.

### 1.2 Vì sao đọc code khó

- **Code phản ánh business logic thật**, không phải textbook gọn ghẽ. Có hàng tá edge case, retry, feature flag, hack lịch sử.
- **Quy mô**: codebase production có 100k → 1M+ dòng. Đọc tuần tự là bất khả thi.
- **Cross-cutting**: 1 request đi qua 5-10 layer (handler → service → repo → DB → cache → MQ → ...).
- **Tên hàm không nói hết**: `ProcessPayment` có thể nghĩa là 50 thứ khác nhau.

### 1.3 Ba cách đọc SAI phổ biến

| Cách sai | Hậu quả |
|----------|---------|
| **Lướt qua, scroll nhanh** | Cảm giác "đọc rồi" nhưng không nhớ gì. Tới lúc cần thông tin thì không tìm lại được. |
| **Đọc line-by-line từ trên xuống** | Đốt thời gian vào setup code, init, helper. Không bao giờ tới được core logic. |
| **Chỉ đọc comment** | Comment thường lỗi thời (stale) — comment nói A, code làm B. Tin code, không tin comment. |

> ⚠ **Lỗi thường gặp**: nghĩ "đọc kỹ" là đọc từng dòng. Đọc kỹ thật ra là **biết bỏ qua 95% và đào sâu 5% quan trọng**.

### 1.4 Quy trình đọc codebase mới — TOP-DOWN, 5 bước

Đây là quy trình áp dụng khi bạn lần đầu mở 1 codebase Go nào đó:

```
┌─────────────────────────────────────────────────────────────┐
│ Bước 1: Đọc README + go.mod                                 │
│   → biết project làm gì, dùng thư viện gì                   │
├─────────────────────────────────────────────────────────────┤
│ Bước 2: Tìm entry point                                     │
│   → `cmd/<service>/main.go` hoặc `main.go` ở root           │
├─────────────────────────────────────────────────────────────┤
│ Bước 3: Trace 1 happy path                                  │
│   → vd "POST /users" — từ HTTP handler → service → DB       │
├─────────────────────────────────────────────────────────────┤
│ Bước 4: Vẽ sơ đồ component                                  │
│   → trên giấy, không cần đẹp. Box = service, mũi tên = call│
├─────────────────────────────────────────────────────────────┤
│ Bước 5: Đào sâu component cần thay đổi                      │
│   → giờ mới đọc line-by-line vùng nhỏ này thôi              │
└─────────────────────────────────────────────────────────────┘
```

**Áp dụng vào ticket "charge double" ở 1.1:**

1. README → biết đây là service charge thẻ qua Stripe. `go.mod` có `github.com/stripe/stripe-go`.
2. Entry point: `cmd/payment/main.go` → setup HTTP server, route `/charge`.
3. Trace happy path "user charge": `handlers/charge.go` → `service/charge.go` → `repo/payment.go` + `external/stripe.go`.
4. Vẽ ra: Handler → Service → (Stripe + DB). Service có cache user payment method.
5. Vào sâu `service/charge.go` — phát hiện: khi user đổi method, cache invalidate **sau** khi đã charge bằng method cũ → charge thêm lần nữa bằng method mới ở retry. Đó là bug.

Từ 142k dòng → tới bug trong vài tiếng. Đó là sức mạnh top-down.

> 💡 **Trực giác**: đọc code giống đọc một thành phố lạ. Không ai đọc từng ngõ. Bạn xem bản đồ tổng (README), tìm trung tâm (entry point), đi 1 trục chính (happy path), rồi mới khám phá khu cần đến.

> ❓ **Câu hỏi tự nhiên của người đọc**
> - *"Vẽ sơ đồ trên giấy có cần đẹp không?"* — Không. Box vuông méo cũng được. Mục đích là **bộ nhớ làm việc** của bạn, không phải tài liệu.
> - *"Happy path là gì khi project không có HTTP, ví dụ CLI tool?"* — Happy path = use case chính bình thường. Vd `git clone` → từ `cmd/git/clone.go` → fetch refs → write objects. Vẫn áp dụng được.
> - *"Bao giờ thì đọc test?"* — Đọc test **trước khi đọc implementation** rất hữu ích — test mô tả "code này LÀM CÁI GÌ" tốt hơn nhiều so với comment.

> 📝 **Tóm tắt mục 1**
> - Dev đọc code 10x nhiều hơn viết.
> - 3 cách sai: lướt, line-by-line, chỉ đọc comment.
> - Top-down 5 bước: README → entry → happy path → sơ đồ → đào sâu.
> - Test là tài liệu chính xác nhất, vì nó **chạy được**.

---

## 2. Công cụ đọc code

### 2.1 VS Code — IDE phổ thông nhất

Bốn lệnh **bắt buộc thuộc**:

| Thao tác | Phím tắt | Khi nào dùng |
|----------|----------|--------------|
| Go to Definition | `F12` (hoặc Ctrl+Click) | Thấy `processOrder(...)` được gọi, muốn xem code thật |
| Find All References | `Shift+F12` | Thấy hàm `UpdateUser`, muốn biết những chỗ nào gọi nó |
| Symbol search (toàn project) | `Ctrl+T` | Muốn tìm hàm tên `Validate*` ở khắp repo |
| Outline view | `Ctrl+Shift+O` | Mở 1 file 800 dòng, muốn xem có những hàm gì |

> ⚠ **Lỗi thường gặp**: cài VS Code rồi đọc code bằng cuộn chuột. Không dùng `F12` = mất 80% giá trị của IDE.

**Tip**: với Go, cài extension `golang.go` (chính thức) — gọi `gopls` (language server) để mọi lệnh trên hoạt động chính xác cả với generic, interface.

### 2.2 grep / ripgrep — đọc code từ CLI

Khi không có IDE (ssh vào server, đọc trên CI, hoặc đơn giản nhanh hơn):

```bash
# Tìm tất cả chỗ định nghĩa hàm tên ProcessOrder
rg 'func ProcessOrder' --type go

# Tìm chỗ nào gọi nó
rg '\.ProcessOrder\(' --type go

# Tìm theo regex: hàm trả về error
rg 'func \w+\([^)]*\) error' --type go

# Tìm chuỗi log lạ trong codebase
rg "charge failed" --type go -n
```

`rg` (ripgrep) nhanh hơn `grep` 10-100 lần trên repo lớn, tự ignore `.gitignore`, default UTF-8.

> 💡 **Tip thực chiến**: tìm chỗ thả lỗi mà không biết file nào, copy y nguyên message lỗi quăng vào `rg`. 90% lần thấy chỗ phát ra log ngay.

### 2.3 godoc / pkg.go.dev — đọc Go standard library

Mọi package Go (std lib + bên thứ ba public) đều có doc auto-gen tại `https://pkg.go.dev/<package>`.

Ví dụ: `https://pkg.go.dev/strings#SplitN`

Cấu trúc trang godoc:
- **Overview**: package làm gì.
- **Index**: liệt kê constant, var, type, func.
- **Func signature**: `func SplitN(s, sep string, n int) []string`.
- **Doc text**: viết bởi tác giả package.
- **Example**: code minh hoạ chạy được (Go testable example).
- **Link `▾ Source`** → mở source code thực.

> 💡 **Thói quen vàng**: gặp lỗi/hành vi lạ → **đọc godoc của hàm liên quan TRƯỚC khi google**. 70% câu trả lời nằm thẳng trong godoc.

### 2.4 Công cụ nâng cao (advanced)

- **Tree-sitter / AST viewer**: parse code thành cây cú pháp, lập trình query trên đó. Dùng khi cần làm mass-refactor.
- **Sourcegraph** (web tool): code search liên-repo, "xem hàm này được gọi từ những repo nào".
- **`go doc <pkg> <symbol>`** từ CLI: in nhanh doc của 1 symbol, không cần mở browser.

```bash
$ go doc strings.SplitN
package strings // import "strings"

func SplitN(s, sep string, n int) []string
    SplitN slices s into substrings separated by sep and returns a slice of the
    substrings between those separators.
    ...
```

> 🔁 **Dừng lại tự kiểm tra**
>
> Q1: Bạn vừa thấy gọi `s.Charge(ctx, amount)`. Để xem code thật của `Charge`, phím nào trong VS Code?
> <details><summary>Đáp án</summary>`F12` — Go to Definition. Hoặc Ctrl+Click vào tên hàm.</details>
>
> Q2: Muốn biết hàm `UpdateUser` được gọi ở bao nhiêu chỗ?
> <details><summary>Đáp án</summary>`Shift+F12` — Find All References. Trên CLI: `rg '\.UpdateUser\(' --type go`.</details>

> 📝 **Tóm tắt mục 2**
> - VS Code: thuộc `F12`, `Shift+F12`, `Ctrl+T`, `Ctrl+Shift+O`.
> - `rg` nhanh, default tốt — dùng khi không có IDE.
> - godoc luôn là điểm xuất phát khi gặp lỗi liên quan std lib.

---

## 3. Đọc spec / RFC / tài liệu

### 3.1 RFC là gì

**RFC = Request For Comments**, là tài liệu chuẩn do **IETF** (Internet Engineering Task Force) phát hành. Tên gọi gây hiểu nhầm — nó **không phải bản nháp**, mà là **chuẩn chính thức** (sau khi được publish thì gần như cố định).

Ví dụ RFC quan trọng:
- **RFC 9110**: HTTP Semantics (định nghĩa method, status code, header).
- **RFC 7519**: JWT (JSON Web Token).
- **RFC 5321**: SMTP (email).
- **RFC 6749**: OAuth 2.0.
- **RFC 8259**: JSON.

Khi nào đọc RFC? Khi bạn implement client/server cho protocol đó, hoặc khi tài liệu của thư viện không đủ → fallback về spec gốc.

### 3.2 MUST / SHOULD / MAY — RFC 2119

RFC 2119 chuẩn hoá ngôn ngữ quy chuẩn:

| Từ khoá | Nghĩa | Ví dụ |
|---------|-------|-------|
| **MUST / SHALL / REQUIRED** | Bắt buộc tuyệt đối. Vi phạm = sai spec. | "Server MUST return 400 if header `Host` is missing." |
| **MUST NOT / SHALL NOT** | Cấm tuyệt đối. | "A response MUST NOT include a `Content-Length` and `Transfer-Encoding: chunked` simultaneously." |
| **SHOULD / RECOMMENDED** | Nên — nhưng có thể bỏ nếu có lý do chính đáng. | "Implementations SHOULD support gzip." |
| **SHOULD NOT** | Tránh — trừ khi có lý do chính đáng. | "Clients SHOULD NOT cache responses with `Cache-Control: no-store`." |
| **MAY / OPTIONAL** | Tuỳ chọn. Cả 2 hướng đều hợp lệ. | "Server MAY return 503 if overloaded." |

> ⚠ **Lỗi thường gặp**: đọc nhanh không phân biệt `SHOULD` với `MUST`. Sau đó debug 3 ngày vì server đối phương implement đúng `SHOULD` (mà bạn assume là `MUST`).

### 3.3 Cấu trúc đọc godoc Go std lib

Lấy `strings.SplitN` làm ví dụ:

```
func SplitN(s, sep string, n int) []string

SplitN slices s into substrings separated by sep and returns a slice of
the substrings between those separators.

The count determines the number of substrings to return:

  n > 0: at most n substrings; the last substring will be the unsplit remainder.
  n == 0: the result is nil (zero substrings)
  n < 0: all substrings

Edge cases for s and sep (for example, empty strings) are handled as
described in the documentation for Split.
```

Cách đọc:
1. **Signature**: tên, tham số, trả về. `SplitN(s, sep string, n int) []string`.
2. **Mô tả ngắn dòng 1**: chia chuỗi.
3. **Phần liệt kê edge case** (`n > 0`, `n == 0`, `n < 0`): đây là vùng **bug-rich** — đọc kỹ.
4. **Link tới `Split` cho edge case empty string**: follow link, đừng giả định.

> 💡 **Quy tắc thép**: gặp hàm trả về collection (slice, map, channel), luôn hỏi 3 câu trước khi dùng:
> 1. Khi input rỗng, trả về `nil` hay `[]`?
> 2. Trả về có giữ tham chiếu tới input không (có aliasing không)?
> 3. Order có ổn định không?
>
> Godoc trả lời 3 câu đó, nếu bạn đọc.

> ❓ **Câu hỏi tự nhiên của người đọc**
> - *"RFC dày, đọc cả không?"* — Không. Đọc Abstract + Section "Terminology" + Section liên quan ticket bạn đang làm. Ví dụ implement caching → đọc Section 5 của RFC 9111.
> - *"Khi nào không cần đọc spec?"* — Khi đã có thư viện uy tín wrap sẵn (vd `net/http` Go đã implement RFC 9110, bạn không cần đọc lại trừ khi debug edge case kỳ lạ).

> 📝 **Tóm tắt mục 3**
> - RFC = chuẩn IETF, không phải nháp.
> - Phân biệt `MUST` / `SHOULD` / `MAY` (RFC 2119) — sống chết là ở đây.
> - Godoc Go là điểm đầu tiên khi nghi behavior, không phải Google.

---

## 4. Debug — định nghĩa lại

### 4.1 Debug là gì?

**Định nghĩa**: Debug là quá trình **thu hẹp khoảng cách giữa "code thực sự làm cái này" và "tôi nghĩ code đang làm cái kia"**.

> 💡 **Trực giác**: Bug = **mental model sai**. Compiler hiếm khi sai (đã được hàng triệu người dùng test). Bạn sai. Chấp nhận điều này → debug đỡ đau khổ 90%.

### 4.2 Vì sao mental model sai?

- Bạn assume `len(nil_slice) == 0` (đúng, Go cho).
- Nhưng bạn cũng assume `nil_slice[0]` chỉ panic — không nghĩ nó còn ảnh hưởng nil check khác.
- Hoặc: nghĩ `map` trong Go zero-init là `{}`. Sai — zero value của map là `nil`, ghi vào sẽ panic.

Bug = chỗ assumption gãy. Debug = đi tìm assumption gãy đó.

### 4.3 Ba định luật vô hình

1. **Compiler không buggy** (cho code mọi người bình thường viết).
2. **Network không "tự dưng" chậm** — luôn có lý do, dù khó tìm.
3. **Code chạy đúng hôm qua + không sửa gì + hôm nay sai** → có sửa gì đó (env, dep, data, time). Tìm nó.

> ⚠ Mỗi khi bạn nghĩ "thư viện X buggy", xác suất 99% là bạn dùng sai. Trước khi report bug cho upstream, viết minimal reproduction. Quá trình viết MR thường tự lộ ra bug ở phía bạn.

---

## 5. Năm nguyên tắc debug

### 5.1 Tin số liệu, không tin trực giác

Bạn `fmt.Println("x =", x)` → in ra `x = 5`.
Bạn: *"Không thể nào, đoạn trên phải gán x = 10."*
**Sai**. `x = 5`. Đó là sự thật. Tìm vì sao, đừng phủ nhận số liệu.

Mẹo: nếu bạn cảm thấy "không thể nào", đó là dấu hiệu mental model của bạn đang gãy ở chỗ đó. **Đào đúng vào điểm đó**.

### 5.2 Cô lập (bisect)

Bug ở đâu trong 500 dòng? Đừng đọc cả 500 dòng. **Bisect**:

- Print biến ở dòng 250. Có sai không?
  - Có → bug nằm 1–250.
  - Không → bug nằm 251–500.
- Chia đôi tiếp. Mỗi lần halve, sau 9 bước log₂(500) ≈ 9 bạn tới sát bug.

Áp dụng cho cả **code** lẫn **lịch sử commit** (sẽ học `git bisect` ở mục 6.4).

### 5.3 Tái hiện trước, sửa sau

**Bug không tái hiện được = không debug được.** Tìm "công thức tái hiện" trước khi sửa:

- "Khi user A login lúc 10h sáng + clear cookie + click button B 2 lần liên tiếp → trang lỗi."

Một khi tái hiện ổn định, bug đã 50% chết.

### 5.4 Đổi 1 biến một lúc

Tệ: đổi cả 3 chỗ rồi bug hết → bạn không biết cái nào fix.
Tốt: đổi chỗ 1 → test. Không hết → revert, đổi chỗ 2. Cứ thế.

Lý do: nếu 2 trong 3 chỗ là "fix sai" (vô tình che bug), bạn sẽ mất chúng khi refactor sau này.

### 5.5 Hỏi "vì sao", không phải "cái gì"

| Câu hỏi tệ | Câu hỏi tốt |
|------------|-------------|
| "Bug ở đâu?" | "Vì sao biến này lại có giá trị này?" |
| "Sửa thế nào?" | "Vì sao logic này đang chạy?" |

"Vì sao" dẫn tới gốc. "Cái gì" chỉ vá ngọn. Có **kỹ thuật 5 Whys** (hỏi "vì sao" 5 lần liên tiếp) — mỗi lần đẩy thêm 1 tầng nguyên nhân.

> 📝 **Tóm tắt mục 5**
> 1. Tin số liệu, không tin trực giác.
> 2. Bisect — đừng đọc tuần tự.
> 3. Tái hiện trước, sửa sau.
> 4. Đổi 1 biến 1 lúc.
> 5. Hỏi "vì sao", không phải "cái gì".

---

## 6. Kỹ thuật debug — từ đơn giản đến nâng cao

### 6.1 Print debugging — vẫn là vua

**Đừng coi thường**. Linus Torvalds — tác giả Linux + Git — dùng print debug. Cá nhân bạn cũng nên.

```go
func processOrder(o Order) error {
    fmt.Printf("[processOrder] entry: order=%+v\n", o)
    if err := validate(o); err != nil {
        fmt.Printf("[processOrder] validate failed: %v\n", err)
        return err
    }
    fmt.Printf("[processOrder] validated, charging…\n")
    return charge(o)
}
```

Mẹo:
- **Dùng `%+v`** trong Go để in struct gồm tên field: `order={ID:42 Amount:100 ...}`.
- **Prefix dễ tìm**: `[processOrder]` → sau khi xong, `grep '[processOrder]'` để bỏ hết.
- **In cả "trước" và "sau"** điểm nghi ngờ → biết bug nằm bên nào.

> ⚠ **Lỗi thường gặp**: print thiếu newline → log dính nhau, đọc không ra. Luôn `\n` hoặc dùng `Println`.

### 6.2 Logging có level

Khi project lớn, print thẳng `stdout` không scale. Dùng logger có level:

| Level | Khi nào dùng | Ví dụ |
|-------|--------------|-------|
| `DEBUG` | Chi tiết chỉ bật khi điều tra | "cache key = users:42" |
| `INFO` | Sự kiện bình thường, ai cũng nên thấy | "server started on :8080" |
| `WARN` | Bất thường nhưng chưa lỗi | "retry attempt 2/3" |
| `ERROR` | Lỗi rõ ràng | "charge failed: insufficient funds" |
| `FATAL` | Lỗi không cứu được, app exit | "cannot bind port: address in use" |

Trong production, thường bật mặc định `INFO`. Khi điều tra, tạm bật `DEBUG`.

### 6.3 Debugger (Delve cho Go)

**Delve** = debugger chính thức cho Go. Tích hợp trong VS Code (extension `golang.go`) hoặc dùng CLI `dlv`.

Khái niệm cốt lõi:

| Thao tác | Nghĩa | Khi nào dùng |
|----------|-------|--------------|
| **Breakpoint** | Pause chạy tại dòng X | Đặt ở chỗ nghi ngờ trước khi chạy |
| **Step Over** (F10) | Chạy dòng hiện tại, nhảy sang dòng kế | Khi không quan tâm chi tiết bên trong hàm con |
| **Step Into** (F11) | Nhảy vào trong hàm con | Khi nghi bug ở hàm con |
| **Step Out** (Shift+F11) | Chạy tới khi out khỏi hàm hiện tại | Khi đã thấy đủ, muốn về caller |
| **Inspect var** | Xem giá trị biến tại điểm dừng | Trả lời "x đang là gì?" |
| **Watch** | Theo dõi biểu thức tự cập nhật mỗi lần step | "tôi muốn biết `len(cache)` thay đổi thế nào" |
| **Conditional breakpoint** | Chỉ pause khi điều kiện đúng | Trace bug chỉ xảy ra với `userID == 42` |

> 💡 **Khi nào debugger > print?**
> - Bug **khó tái hiện** (xảy ra 1/100 lần) → đặt conditional breakpoint, không cần restart liên tục.
> - Code **phức tạp đa tầng** — print 50 chỗ rồi rối → debugger step thấy luồng rõ.
> - Cần **xem giá trị nhiều biến** tại 1 thời điểm — debugger inspect cả scope.

> ❓ **Khi nào print > debugger?**
> - Code chạy trên prod (không attach debugger được) → log là cách duy nhất.
> - Hiện tượng cần **nhiều run** để pattern lộ ra (vd flaky test) → log thu rồi phân tích.
> - Bạn đang là người mới, chưa thuộc debugger → print là 80% hiệu năng cho 5% effort.

### 6.4 Bisect bằng Git

Khi nào dùng? *"Tuần trước feature X chạy đúng. Hôm nay bug. Có 87 commit từ đó. Commit nào gây ra?"*

```bash
git bisect start
git bisect bad                       # commit HEAD hiện tại có bug
git bisect good v1.4.0               # commit cũ này chắc chắn không có bug
# Git checkout 1 commit ở giữa
# Bạn test commit đó:
git bisect bad     # nếu commit này CÓ bug
# hoặc
git bisect good    # nếu commit này KHÔNG có bug
# Git binary search tiếp tục…
# Sau log₂(N) bước, in ra commit thủ phạm
git bisect reset                     # quay lại HEAD
```

Với 87 commit, mất tối đa `ceil(log₂(87)) = 7` lần test.

> 💡 **Tự động hoá**: nếu có 1 script test xác định bug hay không, dùng `git bisect run ./test.sh` — Git tự chạy bisect không cần bạn click.

### 6.5 Postmortem từ log / stack trace

Khi bug xảy ra trên prod và không tái hiện ngay được, postmortem từ log là duy nhất. Kỹ năng: đọc stack trace nhanh.

---

## 7. Đọc stack trace Go

### 7.1 Một stack trace mẫu

```
panic: runtime error: invalid memory address or nil pointer dereference
[signal SIGSEGV: segmentation violation code=0x1 addr=0x0 pc=0x49b3a4]

goroutine 1 [running]:
example.com/app/service.(*ChargeService).Charge(0x0, {0xc0000a4060, 0x5})
        /app/service/charge.go:42 +0x24
example.com/app/handlers.HandleCharge({0x5a3920, 0xc0000ae000}, 0xc0000c8000)
        /app/handlers/charge.go:18 +0x9c
net/http.HandlerFunc.ServeHTTP(...)
        /usr/local/go/src/net/http/server.go:2122
net/http.(*ServeMux).ServeHTTP(0xc000086020, {0x5a3920, 0xc0000ae000}, 0xc0000c8000)
        /usr/local/go/src/net/http/server.go:2500 +0x149
```

### 7.2 Đọc từng dòng

| Dòng | Ý nghĩa |
|------|---------|
| `panic: runtime error: invalid memory address or nil pointer dereference` | Loại panic — **nil pointer**. Có cái gì đó `nil` mà bị dereference (`.field` hoặc `*ptr`). |
| `[signal SIGSEGV ...]` | Tín hiệu kernel khi truy cập địa chỉ vô hiệu. Bỏ qua, không đọc cho người. |
| `goroutine 1 [running]` | Panic xảy ra ở goroutine 1 (goroutine `main`). |
| `example.com/app/service.(*ChargeService).Charge(0x0, ...)` | **CHÍNH LÀ CHỖ PANIC**. Hàm `Charge` của `*ChargeService`. Tham số đầu là `0x0` → receiver `*ChargeService` đang `nil`. |
| `/app/service/charge.go:42 +0x24` | File + dòng + offset. Mở file này, dòng 42 — bug ở đó. |
| Dòng tiếp `HandleCharge` ở `/app/handlers/charge.go:18` | **Caller** — chỗ gọi `Charge`. Đây là nơi `nil` được truyền. |
| Dòng `net/http.HandlerFunc.ServeHTTP` | Stack tiếp tục ngược ra — runtime HTTP của Go. |

> 💡 **Quy tắc đọc stack trace**:
> 1. **Dòng panic** = mô tả lỗi.
> 2. **Dòng frame đầu sau goroutine** = chỗ panic xảy ra (line `+0xNN` chính là dòng code của bạn).
> 3. **Các dòng tiếp** = caller chain, đọc từ trên xuống = đi từ "trong" ra "ngoài".

### 7.3 Ba pattern panic Go thường gặp

#### Pattern A: nil pointer dereference

```
panic: runtime error: invalid memory address or nil pointer dereference
```

**Nguyên nhân điển hình**:
```go
var s *ChargeService           // s == nil
s.Charge(amount)               // PANIC khi truy cập method receiver
```

**Fix**: check nil trước, hoặc đảm bảo init.

#### Pattern B: index out of range

```
panic: runtime error: index out of range [3] with length 3
```

**Nguyên nhân điển hình**:
```go
a := []int{10, 20, 30}
fmt.Println(a[3])             // index 3, len=3 → max idx = 2
```

**Fix**: dùng `if i < len(a)` hoặc range loop.

#### Pattern C: concurrent map writes

```
fatal error: concurrent map writes
```

**Nguyên nhân**: 2 goroutine write vào cùng `map` không có lock.

**Fix**: dùng `sync.RWMutex`, hoặc `sync.Map`, hoặc channel + 1 goroutine owner.

> 🔁 **Dừng lại tự kiểm tra**
>
> Stack trace ngắn này — bug ở dòng nào file nào?
> ```
> panic: runtime error: index out of range [10] with length 5
>
> goroutine 1 [running]:
> main.findItem(...)
>         /app/main.go:27 +0x80
> main.main()
>         /app/main.go:15 +0x50
> ```
> <details><summary>Đáp án</summary>Panic xảy ra ở <code>/app/main.go:27</code> trong hàm <code>findItem</code>. Có 1 slice <code>len=5</code> nhưng access index <code>10</code>. <code>main</code> ở dòng 15 chỉ là caller.</details>

> 📝 **Tóm tắt mục 7**
> - Stack trace đọc từ trên xuống: dòng đầu sau goroutine = chỗ panic, dòng tiếp = caller chain.
> - 3 pattern: nil ptr, index OOR, concurrent map writes — thuộc 3 pattern này bạn debug 70% panic Go.

---

## 8. Heuristic tìm bug nhanh

Khi gặp bug lạ, "ngó qua" 6 nguồn này trước — chiếm 80% bug thực tế:

| Heuristic | Cách check | Hỏi mình |
|-----------|------------|----------|
| **Off-by-one** | Đọc `for i := 0; i < n; i++` vs `<= n` | Loop có chạy đúng số lần? Điều kiện `<`/`<=` đúng chưa? |
| **Nil / empty** | Check input rỗng, struct chưa init, map chưa make | Hàm có handle input `nil`, `""`, `[]`? |
| **Race condition** | `go run -race ./...` hoặc `go test -race` | Có 2+ goroutine truy cập cùng 1 biến không lock? |
| **Encoding** | Print `len(s)` và `[]byte(s)`, check UTF-8 | Chuỗi có ký tự non-ASCII? Có escape `\n` `\t` sai? |
| **Timezone** | Print `t.Location()` và `t.UTC()` | UTC vs local? DB lưu UTC, app hiển thị +07? |
| **Cache stale** | Clear Redis, restart, hard refresh browser | Có bị cache cũ làm sai hiện tượng test? |

> 💡 **Race detector**: Go có flag built-in `-race` (compile time). Khi nghi race, **luôn luôn** chạy:
> ```bash
> go test -race ./...
> go run -race main.go
> ```
> Cost ~2x CPU + ~5x memory, nhưng phát hiện 99% race ngay tại runtime.

### Ví dụ off-by-one phổ biến

```go
// Bug: loop chạy n+1 lần thay vì n
for i := 0; i <= n; i++ {   // dùng <= thay vì <
    a[i] = i               // khi i == n → index out of range
}
```

```go
// Bug: copy thiếu 1 phần tử
copy(dst, src[1:])  // bỏ phần tử 0 — có thể chủ ý, có thể bug
```

> ⚠ **Pattern lừa nhất**: timezone. Code chạy đúng dev (local timezone +07), bug ở CI/prod (UTC). Luôn dùng `time.UTC()` ở backend, format theo timezone chỉ ở presentation layer.

> 📝 **Tóm tắt mục 8**
> - 6 heuristic: off-by-one, nil/empty, race, encoding, timezone, cache stale.
> - Race → bật `-race`. Timezone → backend UTC.

---

## 9. Rubber duck debugging

### 9.1 Là gì?

Bạn đặt 1 **con vịt cao su** (hoặc bất kỳ vật vô tri nào) lên bàn. Khi gặp bug, **giải thích vấn đề cho con vịt** — bằng lời, ngôn ngữ tự nhiên, từ đầu.

50% thời gian, **trong lúc giải thích, bạn tự nhận ra bug** trước khi tới câu "vịt ơi cứu tôi".

### 9.2 Vì sao hiệu quả?

Khi bạn **đọc thầm** code, não bỏ qua những chỗ "có vẻ đúng". Khi bạn **phát biểu thành lời**:

- Mỗi giả định ngầm bị bắt phải nói ra → bộc lộ assumption sai.
- Buộc decompose vấn đề (input → process → output) → thấy chỗ logic hở.
- Tốc độ đầu chậm xuống bằng tốc độ miệng → não phát hiện nhảy logic.

### 9.3 Cách dùng

1. Nêu vấn đề: *"Tôi gọi API charge, mong đợi trả 200, nhưng nhận 500."*
2. Mô tả input đã dùng: *"Body là `{user_id:42, amount:100}`."*
3. Mô tả code đường đi: *"Handler nhận → gọi `Charge()` → vào `validate()` → ..."*
4. Đến chỗ giả định: *"Ở đây tôi giả định `user` đã được load từ DB. Nhưng… ờ khoan, tôi không thấy code load user. Repo chỉ có `FindByID`, không gọi…"* — bingo.

> 💡 Đồng nghiệp cũng đóng vai vịt được. Tới hỏi 1 senior, vừa kể tới giữa thì *"à, tôi hiểu rồi, cảm ơn"* — đã xảy ra với 90% lập trình viên. Đó là rubber duck thay vịt bằng người.

---

## 10. Khi nào nên xin trợ giúp

### 10.1 Quy tắc 30 phút

**Sau 30 phút stuck không tiến triển → hỏi.**

- Trước 30': bạn còn ý tưởng, đang khám phá. Hỏi sớm = phụ thuộc, không học.
- Sau 30': bạn đang xoay tròn. Tiếp tục một mình = phí thời gian, dễ frustrate.

### 10.2 Format câu hỏi đúng

**Tệ**:
> "Code tôi lỗi, ai giúp được không?" (kèm screenshot toàn bộ file)

**Tốt**:
> "Tôi đang implement charge endpoint. Khi POST /charge với body `{user_id:42, amount:100}`, expect status 200 nhưng nhận 500.
>
> **Đã thử**:
> 1. Print log → thấy `user == nil` ở dòng `service/charge.go:42`.
> 2. Check DB → user 42 có tồn tại.
> 3. Đọc `repo.FindByID` → có vẻ return đúng `user, nil`.
>
> **Mong đợi**: user không nil sau FindByID.
> **Quan sát**: user vẫn nil.
> **Nghi**: cache wrapper ở layer trên có invalidate sai?"

Format này gọi là **STAR** (Situation, Task, Action, Result) hoặc **XY format**. Bạn cho người giúp **đủ context để giúp nhanh**, mà không phải hỏi lại 10 câu.

### 10.3 Nên hỏi ở đâu

- **Đồng nghiệp gần nhất** (chat, gặp trực tiếp) — luôn ưu tiên: hiểu codebase, context của bạn.
- **Stack Overflow / GitHub Discussions** — câu hỏi technical generic, ngôn ngữ tiếng Anh, đầy đủ MR (minimal reproduction).
- **Issue tracker của thư viện** — chỉ khi nghi bug của thư viện, kèm MR ngắn (~30 dòng).

> ⚠ **Đừng làm**: copy 500 dòng code dán vào chat. Người giúp không có 1 tiếng đọc. Trích đoạn 10-30 dòng, đủ tái hiện.

> 📝 **Tóm tắt mục 10**
> - Stuck > 30 phút → hỏi.
> - Format: tôi đã thử X/Y/Z, thấy A/B, expect C, nghi D.
> - Không bao giờ "code tôi lỗi gì".

---

## 11. Bài tập

### Bài 1 — Trace request flow trong codebase Go nhỏ

Bạn vừa clone repo `payment-api`. Cấu trúc:

```
payment-api/
├── go.mod                           (module example.com/payment)
├── cmd/
│   └── server/
│       └── main.go                  (init logger, DB, router; start HTTP)
├── internal/
│   ├── handlers/
│   │   ├── charge.go                (HandleCharge)
│   │   └── refund.go                (HandleRefund)
│   ├── service/
│   │   └── charge.go                (ChargeService.Charge)
│   ├── repo/
│   │   └── payment.go               (PaymentRepo.SaveTransaction)
│   └── external/
│       └── stripe.go                (StripeClient.Charge)
```

Ticket: *"POST /v1/charge đôi khi trả 500 không rõ nguyên nhân."*

**Yêu cầu**:
- Đâu là entry point? Mở file nào trước?
- Đề xuất trình tự 4 file đọc tiếp, kèm lý do.

### Bài 2 — Đọc stack trace

```
panic: runtime error: invalid memory address or nil pointer dereference
[signal SIGSEGV: segmentation violation code=0x1 addr=0x10 pc=0x4a2b1c]

goroutine 12 [running]:
example.com/blog/post.(*PostService).Publish(0xc0000b0020, 0x0)
        /app/post/service.go:58 +0x3c
example.com/blog/handlers.PublishPost({0x5a3920, 0xc0000ae000}, 0xc0000c8000)
        /app/handlers/post.go:24 +0x88
net/http.HandlerFunc.ServeHTTP(...)
        /usr/local/go/src/net/http/server.go:2122
```

**Yêu cầu**: loại panic gì? Bug ở file nào, dòng nào? Tham số `0x0` ở `Publish` có ý nghĩa gì?

### Bài 3 — Bisect simulation

Bạn có 20 commit từ `v1.0.0` (good) đến `HEAD` (bad). Bug introduce ở commit số 13 (đếm từ 1). Mô tả các bước bisect, ghi commit Git suggest và kết quả good/bad tại mỗi bước.

Hỏi thêm: mất tối đa bao nhiêu bước? Thực tế ở trường hợp này mất bao nhiêu?

### Bài 4 — Debug off-by-one

```go
// Lấy n phần tử cuối cùng của slice a (giả sử n <= len(a))
func lastN(a []int, n int) []int {
    result := make([]int, n)
    for i := 0; i <= n; i++ {
        result[i] = a[len(a)-n+i]
    }
    return result
}
```

Có 1 bug. Tìm và sửa. Giải thích vì sao panic.

### Bài 5 — Đọc godoc Go std lib

Doc của `strings.SplitN`:
> `func SplitN(s, sep string, n int) []string`
>
> SplitN slices s into substrings separated by sep and returns a slice of the substrings between those separators.
>
> The count determines the number of substrings to return:
> - `n > 0`: at most n substrings; the last substring will be the unsplit remainder.
> - `n == 0`: the result is nil (zero substrings)
> - `n < 0`: all substrings

Trả lời:
1. `SplitN("a,b,c,d", ",", 2)` trả về gì?
2. `SplitN("a,b,c", ",", 0)` trả về gì?
3. `SplitN("a,b,c", ",", -1)` khác với `Split("a,b,c", ",")` như thế nào? (gợi ý: đọc thêm godoc của `Split`)

### Bài 6 — Tình huống prod

Hôm nay deploy version mới. Sau 10 phút, người dùng báo: *"API /products trả thông tin sai — tên sản phẩm bị trộn giữa các sản phẩm."*

Hệt 5 thứ bạn check theo thứ tự ưu tiên, kèm lý do tại sao thứ đó đứng trước.

---

## 12. Lời giải chi tiết

### Bài 1

**Entry point**: `cmd/server/main.go` — luôn là `cmd/<service>/main.go` cho project Go theo layout chuẩn. Đó là chỗ HTTP server start, route map, dependency wire.

**Trình tự đọc**:

1. `cmd/server/main.go` — xem router map: route `/v1/charge` được wire tới handler nào? (giả định map tới `handlers.HandleCharge`).
2. `internal/handlers/charge.go` — đọc `HandleCharge`: parse request → gọi `service.ChargeService.Charge(...)`. Đây là layer mỏng, rất nhanh.
3. `internal/service/charge.go` — đọc `Charge`. Logic chính: validate → gọi `repo.PaymentRepo.SaveTransaction(...)` và `external.StripeClient.Charge(...)`. Đây là vùng nghi 500.
4. `internal/external/stripe.go` — `StripeClient.Charge` gọi Stripe API. Có thể 500 là do timeout hoặc Stripe trả error mà code không handle.
5. (Bonus) `internal/repo/payment.go` — nếu nghi DB, đọc `SaveTransaction`. Thường check sau khi loại trừ Stripe.

> Mục đích trình tự: đi theo happy path, **không** đào sâu helper / config ngay từ đầu.

### Bài 2

- **Loại panic**: `nil pointer dereference`.
- **Bug ở**: `/app/post/service.go:58` trong hàm `(*PostService).Publish`. Đây là frame đầu sau `goroutine N [running]`.
- **`0x0` ở `Publish(0xc0000b0020, 0x0)`**: tham số đầu là receiver `*PostService` (`0xc0000b0020` — có giá trị, OK). **Tham số thứ hai là `0x0` → đó là `nil`**. Nghĩa là caller (`PublishPost` ở `handlers/post.go:24`) đã truyền `nil` cho 1 pointer parameter của `Publish` (vd `*PostInput`). Trong `Publish`, code chắc đã dereference nó (`.something`) → SIGSEGV.

**Cách fix**: ở `Publish`, check tham số != nil đầu hàm và return error sớm; hoặc ở `PublishPost`, kiểm tra body parse có ra nil không.

### Bài 3

Có 20 commit (good = v1.0.0 trước commit 1; bad = HEAD = commit 20). Bug introduce ở commit **13**. Git bisect binary search trên khoảng `[1, 20]`.

| Bước | Khoảng nghi | Commit Git pick (giữa) | Test thấy bug? | Kết quả gửi Git |
|------|-------------|------------------------|----------------|-----------------|
| 1 | 1..20 | 10 | Không (10 < 13) | `git bisect good` |
| 2 | 11..20 | 15 | Có (15 ≥ 13) | `git bisect bad` |
| 3 | 11..14 | 12 | Không (12 < 13) | `git bisect good` |
| 4 | 13..14 | 13 | Có | `git bisect bad` |
| 5 | 13..13 → Git in: **first bad commit = 13** | — | — | — |

**Tối đa**: `ceil(log₂(20)) = 5` bước.
**Thực tế ở case này**: 4 lần test (bước 5 là Git tự kết luận).

### Bài 4

**Bug**: `for i := 0; i <= n; i++` chạy `n+1` lần. Trong khi `result := make([]int, n)` chỉ có `n` slot (index 0..n-1). Khi `i == n`, `result[i]` = `result[n]` → **index out of range**.

**Fix**:
```go
for i := 0; i < n; i++ {     // đổi <= thành <
    result[i] = a[len(a)-n+i]
}
```

Heuristic: thấy `make([]T, n)` thì loop chạy `i := 0; i < n; i++`, không bao giờ `<= n`.

### Bài 5

1. `SplitN("a,b,c,d", ",", 2)` → `["a", "b,c,d"]`.
   Lý do: `n > 0` nghĩa là **tối đa n substring; phần cuối là phần còn lại chưa split**. Cắt đúng 1 lần (n-1=1 lần cắt), trả về 2 phần.

2. `SplitN("a,b,c", ",", 0)` → `nil` (slice rỗng).
   Lý do: `n == 0` → "the result is nil".

3. `SplitN("a,b,c", ",", -1)` và `Split("a,b,c", ",")` → cùng kết quả `["a", "b", "c"]`.
   Lý do: với `n < 0`, `SplitN` cắt tất cả → bằng với `Split` (xem godoc Split: "It is equivalent to SplitN with a count of -1").

### Bài 6

**Thứ tự check, từ rẻ nhất / khả thi nhất**:

1. **Đọc log lỗi/warning** ở khoảng 10 phút quanh thời điểm bắt đầu báo. Rẻ nhất, nhiều khi đã có stack trace chỉ chính xác.
2. **Diff với version trước**: `git diff vN-1..vN -- internal/handlers/products.go`. Bug mới deploy = bug do code mới. Lớp handlers/service `products` đầu tiên đáng xem.
3. **Kiểm tra cache**: triệu chứng "thông tin trộn lẫn giữa sản phẩm" rất đặc trưng cache. Có thể cache key bị share giữa các product (vd cache key thiếu product ID). Check Redis hoặc memory cache.
4. **Race condition**: nếu service mới deploy có thay đổi concurrent code (goroutine cập nhật product), chạy `go test -race ./...`. Triệu chứng "trộn" thường là race ghi vào shared struct.
5. **Schema/migration**: version mới có migration không? Có thể column thay đổi nhưng code đọc theo position cũ. Check migration logs.

**Có thể rollback ngay không?** Nên — sau khi capture log đủ, rollback restore cho user, debug tiếp ở staging.

---

## 13. Code & Minh hoạ

Lesson này không có `solutions.go`. Mở `visualization.html` để chơi 3 module tương tác:
- **Codebase explorer** — click qua các file để trace happy path 1 request.
- **Stack trace decoder** — click từng dòng stack trace, xem giải thích.
- **Bisect simulator** — chơi `git bisect` trên 20 commit.

[▶ visualization.html](./visualization.html)

---

## 14. Bài tiếp theo

→ [Lesson 05 — Vì sao Go? (Triết lý)](../lesson-05-why-go-philosophy/README.md) — bắt đầu chạm code Go thực sự.

## Tham khảo

- [The Programmer's Brain — Felienne Hermans](https://www.manning.com/books/the-programmers-brain) — sách về cách đọc code dưới góc nhìn neuroscience.
- [Effective Go — Errors](https://go.dev/doc/effective_go#errors) — Go-specific error practice.
- [Debugging Go with Delve](https://github.com/go-delve/delve/tree/master/Documentation) — tài liệu chính thức.
- [RFC 2119 — Key words for use in RFCs](https://www.rfc-editor.org/rfc/rfc2119) — `MUST` / `SHOULD` / `MAY`.
