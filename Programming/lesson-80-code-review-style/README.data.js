// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: Programming/lesson-80-code-review-style/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 80 — Code Review & Go Style

> Tier 7 — Production / DevOps / SWE · Bài 9/10

Code review là nơi chất lượng của một codebase thực sự được quyết định. Một dòng code được viết một lần nhưng được đọc hàng trăm lần — bởi chính bạn 6 tháng sau, bởi đồng nghiệp mới vào, bởi người fix bug lúc 2 giờ sáng. Lesson này dạy cách viết Go *idiomatic* (đúng "phong cách" cộng đồng Go), cách review code của người khác cho hữu ích, và — quan trọng không kém — cách *nhận* review mà không tự ái.

## Mục tiêu học tập

Sau bài này bạn sẽ:

1. Giải thích được **vì sao** code review tồn tại (không chỉ "bắt bug").
2. Áp dụng các nguyên tắc **Effective Go** — đặc biệt "clear is better than clever".
3. Đặt tên (naming) đúng quy ước Go: package, exported, biến, interface; tránh stutter.
4. Viết error handling đúng phong cách: early return, wrap context, không panic bừa.
5. Viết comment có giá trị (giải thích WHY) thay vì comment hiển nhiên (WHAT).
6. Dùng \`gofmt\`/\`goimports\` và \`golangci-lint\` để tự động hóa phần "tranh cãi format".
7. Chạy một checklist review Go đầy đủ và nhận diện code smell.
8. Cư xử đúng mực khi review: phân biệt blocking vs nit, suggest thay vì command.
9. Viết PR nhỏ, mô tả rõ, self-review trước khi nhờ người khác.
10. Biết **khi nào** được phép phá rule — và phải document lý do.

## Kiến thức tiền đề

- [Lesson 19 — Errors](../lesson-19-errors/) và [Lesson 40 — Error Handling Deep](../lesson-40-error-handling-deep/): nền tảng cho phần error style.
- [Lesson 20 — Packages & Modules](../lesson-20-packages-modules/): hiểu package thì naming package mới có nghĩa.
- [Lesson 26 — Testing Basics](../lesson-26-testing-basics/) và [Lesson 37 — Advanced Testing](../lesson-37-advanced-testing/): review luôn hỏi "test cover chưa?".
- [Lesson 79 — Clean Architecture Go](../lesson-79-clean-architecture-go/): code smell "god struct" liên quan tới layering.

---

## 1. Vì sao có code review?

> 💡 **Trực giác.** Hãy tưởng tượng một nhà bếp nhà hàng. Không đầu bếp nào tự bê món của mình thẳng ra cho khách. Luôn có một người (head chef) nếm thử, kiểm tra trình bày, độ chín trước khi món rời bếp. Code review chính là bước "nếm thử" đó — nhưng giá trị lớn nhất không phải "bắt món dở", mà là **cả bếp dần nấu giống nhau**.

Nhiều người nghĩ code review chỉ để bắt bug. Bắt bug là *một* lợi ích, không phải lợi ích duy nhất — và thường không phải lợi ích lớn nhất. Bốn lý do code review tồn tại:

1. **Catch bug sớm.** Một bug bị bắt ở review tốn vài phút. Cũng bug đó lọt ra production tốn hàng giờ điều tra + downtime + niềm tin của khách. Chi phí sửa bug tăng theo cấp số nhân theo "khoảng cách" tới production.

2. **Chia sẻ kiến thức (knowledge sharing).** Khi B review code của A, B học được phần codebase mà A đụng tới. Nếu A nghỉ phép, B vẫn sửa được. Đây là cách giảm "bus factor" (số người mà nếu bị xe buýt tông thì dự án sập).

3. **Tính nhất quán (consistency).** Một codebase mà mỗi file một phong cách thì đọc rất mệt. Review ép codebase hội tụ về một phong cách chung — dễ đọc, dễ bảo trì.

4. **Mentorship.** Review là kênh dạy nhau tự nhiên nhất. Junior học idiom từ comment của senior; senior cũng học góc nhìn mới từ junior.

> ❓ **Câu hỏi tự nhiên.**
> - *"Review chậm tiến độ không?"* — Có, vài giờ tới một ngày. Nhưng so với chi phí một bug production hoặc một module không ai ngoài tác giả hiểu, đây là khoản đầu tư rẻ.
> - *"Tôi tự test kỹ rồi, cần review không?"* — Cần. Bạn không thấy lỗi của chính mình vì bạn đọc code "như mình *định* viết", không phải "như nó *thật sự* viết". Mắt thứ hai thấy điều mắt thứ nhất bỏ qua.

**Câu thần chú phải nhớ:** *Code is read far more often than it is written.* Tối ưu cho người đọc, không cho người viết.

> 📝 **Tóm tắt mục 1.**
> - Review không chỉ bắt bug — còn chia sẻ kiến thức, giữ nhất quán, mentor.
> - Bug bắt sớm rẻ hơn bug bắt muộn theo cấp số nhân.
> - Code đọc nhiều hơn viết → tối ưu cho người đọc.

---

## 2. Effective Go — triết lý

Go được thiết kế quanh một ý tưởng trung tâm: **simplicity**. Tài liệu chính thức [Effective Go](https://go.dev/doc/effective_go) và các "Go proverbs" của Rob Pike đều xoay quanh việc giảm độ phức tạp cho người đọc.

Ba nguyên tắc nền tảng:

- **Simplicity.** Ít tính năng ngôn ngữ, ít cách làm một việc. Go cố tình không có ternary \`?:\`, không có \`while\`, không có overload — để code mọi người viết ra trông giống nhau.
- **Readability.** Code phải đọc tuyến tính như văn xuôi. Early return giảm nesting. Tên rõ giảm chú thích.
- **"Clear is better than clever."** Một dòng "thông minh" tiết kiệm 3 dòng nhưng mất 10 phút để hiểu là một khoản nợ, không phải thành tích.

> 💡 **Trực giác về "clear vs clever".** Code clever giống một câu đố. Lần đầu giải thấy "wow". Lần thứ 50 phải giải lại lúc đang debug thì thấy "tại sao mình lại tự hành mình thế này". Người đọc tương lai (gồm chính bạn) sẽ luôn nhiều hơn 1 lần.

Ví dụ cụ thể — đếm số phần tử dương:

\`\`\`go
// ❌ Clever: gộp mọi thứ vào một biểu thức, dùng map[bool]int để né if.
n := 0
for _, v := range xs { n += map[bool]int{true: 1, false: 0}[v > 0] }

// ✅ Clear: ai đọc cũng hiểu ngay, compiler cũng tối ưu tốt hơn.
n := 0
for _, v := range xs {
    if v > 0 {
        n++
    }
}
\`\`\`

> ⚠ **Lỗi thường gặp.** Tưởng "ít dòng = tốt". Mục tiêu là *ít độ phức tạp cho người đọc*, không phải ít ký tự. Dòng clever ở trên còn cấp phát một map mới mỗi vòng lặp — vừa khó đọc vừa chậm.

> 🔁 **Dừng lại tự kiểm tra.** Đoạn nào "thông minh" nhất bạn từng viết tuần này? Nếu đồng nghiệp phải hỏi bạn nó làm gì, đó là tín hiệu cần viết lại cho rõ.
> <details><summary>Gợi ý đánh giá</summary>Tiêu chí: một dev cùng team, đọc đoạn đó <strong>không có bạn ngồi cạnh giải thích</strong>, trong 30 giây có hiểu không? Nếu không → viết lại rõ hơn.</details>

> 📝 **Tóm tắt mục 2.** Simplicity, readability, "clear is better than clever". Ít dòng không phải mục tiêu; ít độ phức tạp cho người đọc mới là.

---

## 3. Naming — quy ước Go

Đặt tên là 80% của việc viết code đọc được. Go có quy ước rõ ràng, không tuỳ tiện.

### 3.1 Package name

- **Ngắn, viết thường, không underscore, không mixedCaps.** \`http\`, \`json\`, \`bytes\`, \`strconv\`.
- **Không** \`httpUtil\`, \`string_helpers\`, \`myJSONLib\`.
- Tên package là *prefix* cho mọi thứ bên trong, nên đừng lặp lại nó trong tên hàm/type (xem stutter ở 3.5).

| ❌ Sai | ✅ Đúng | Lý do |
|--------|---------|-------|
| \`package httpUtil\` | \`package http\` | mixedCaps, "Util" vô nghĩa |
| \`package string_helpers\` | \`package strings\` | underscore không idiomatic |
| \`package commonUtils\` | tách theo chức năng | "common/util" là tên rác, gom mọi thứ |
| \`package models\` | \`package user\` (theo domain) | "models" là layer-name, không nói gì về nội dung |

### 3.2 Identifier exported (viết hoa) cần doc comment

- Bất kỳ identifier viết hoa chữ cái đầu (\`User\`, \`Parse\`, \`MaxSize\`) là **public** — phần của API.
- Mọi identifier exported **phải** có doc comment, bắt đầu bằng chính tên đó:

\`\`\`go
// Parse reads a config file at path and returns the parsed Config.
// It returns an error if the file is missing or malformed.
func Parse(path string) (*Config, error) { ... }
\`\`\`

\`golint\`/\`revive\` sẽ cảnh báo nếu thiếu. Doc comment bắt đầu bằng tên để \`go doc\` và godoc render đẹp ("Parse reads...").

### 3.3 Biến — độ dài theo scope

Đây là điểm khác Java/Python nhiều nhất. Trong Go, **độ dài tên tỉ lệ nghịch với scope**:

- Scope nhỏ (vài dòng): tên ngắn. \`i\` cho index, \`r\` cho reader, \`w\` cho writer, \`b\` cho buffer/bytes, \`err\` cho error.
- Scope lớn (biến package-level, hoặc dùng xuyên cả hàm dài): tên mô tả. \`requestTimeout\`, \`activeConnections\`.

\`\`\`go
// ✅ Idiomatic: scope nhỏ → tên ngắn.
for i, v := range items {
    sum += v.price * float64(i)
}

// ❌ Quá dài cho scope nhỏ, gây nhiễu.
for itemIndex, itemValue := range items {
    accumulatedSum += itemValue.price * float64(itemIndex)
}
\`\`\`

> 💡 **Trực giác.** Tên dài là để "định vị từ xa". Trong một vòng \`for\` 3 dòng, mắt bạn thấy \`i\` ngay cạnh nơi nó dùng — không cần mô tả. Một biến package-level dùng cách đó 200 dòng thì cần \`maxRetryCount\` để khỏi phải cuộn lên tìm định nghĩa.

### 3.4 Interface — hậu tố \`-er\`

Interface một method thường đặt tên = method + \`er\`:

- \`Reader\` (method \`Read\`), \`Writer\` (\`Write\`), \`Closer\` (\`Close\`), \`Stringer\` (\`String\`), \`Formatter\`.
- Interface nhiều method: tên theo vai trò (\`http.Handler\`, \`sort.Interface\`).

\`\`\`go
type Reader interface {
    Read(p []byte) (n int, err error)
}
\`\`\`

### 3.5 Stutter — đừng lặp tên package

Vì gọi \`pkg.Name\`, đừng nhét tên package vào tên type/func:

| ❌ Stutter | ✅ Đúng |
|-----------|---------|
| \`http.HTTPServer\` | \`http.Server\` |
| \`json.JSONEncoder\` | \`json.Encoder\` |
| \`user.UserService\` | \`user.Service\` |
| \`errors.ErrorList\` | \`errors.List\` |

> ⚠ **Lỗi thường gặp.** Viết \`user.NewUserService()\`. Đúng là \`user.NewService()\`, gọi ra \`user.Service\` — không lặp "user".

> ❓ **Câu hỏi tự nhiên.**
> - *"4 ví dụ naming đủ chưa? cho thêm."* — \`i\`/\`idx\` (index), \`s\`/\`str\` (string), \`ctx\` (context.Context), \`db\` (*sql.DB), \`tx\` (transaction), \`buf\` (buffer), \`n\` (count/length). Các viết tắt này là *quy ước cộng đồng*, không phải viết tắt tuỳ tiện — đừng đặt \`c\` cho count (dễ nhầm context).
> - *"Tên hằng số viết sao?"* — \`MaxRetries\`, \`DefaultTimeout\` (mixedCaps), KHÔNG \`MAX_RETRIES\` (đó là phong cách C, không phải Go).

> 🔁 **Dừng lại tự kiểm tra.** \`package authentication\` có hàm tạo \`AuthenticationManager\`. Sửa thành idiomatic.
> <details><summary>Đáp án</summary>Package nên là <code>auth</code>; type là <code>auth.Manager</code>; hàm tạo <code>auth.NewManager()</code>. Tránh stutter và package name dài.</details>

> 📝 **Tóm tắt mục 3.**
> - Package: ngắn, lowercase, không underscore, không "Util".
> - Exported = public = phải có doc comment bắt đầu bằng tên.
> - Biến: scope nhỏ tên ngắn (\`i\`, \`r\`), scope lớn tên mô tả.
> - Interface 1 method: hậu tố \`-er\`.
> - Tránh stutter: \`http.Server\`, không \`http.HTTPServer\`.

---

## 4. Error handling style

Go không có exception. Lỗi là giá trị. Phong cách xử lý lỗi idiomatic:

### 4.1 Early return — kiểm tra lỗi rồi return ngay

\`\`\`go
// ✅ Idiomatic: happy path nằm ở lề trái, không nesting.
func load(path string) (*Config, error) {
    f, err := os.Open(path)
    if err != nil {
        return nil, fmt.Errorf("open config: %w", err)
    }
    defer f.Close()

    cfg, err := parse(f)
    if err != nil {
        return nil, fmt.Errorf("parse config: %w", err)
    }
    return cfg, nil
}
\`\`\`

So với phong cách "else lồng nhau" (xem code smell 9.3), early return giữ luồng chính thẳng tắp.

### 4.2 Wrap lỗi với context bằng \`%w\`

\`fmt.Errorf("...: %w", err)\` *bọc* lỗi gốc — giữ được chuỗi nguyên nhân để \`errors.Is\`/\`errors.As\` truy ngược (xem [Lesson 40](../lesson-40-error-handling-deep/)).

\`\`\`go
// ✅ Có context: biết lỗi xảy ra ở đâu trong chuỗi gọi.
return fmt.Errorf("fetch user %d: %w", id, err)
// Output: "fetch user 42: connection refused"

// ❌ Mất context: chỉ thấy "connection refused", không biết ở đâu.
return err
\`\`\`

> ⚠ **Lỗi thường gặp.** Dùng \`%v\` thay \`%w\` khi muốn giữ chain. \`%v\` chỉ in chuỗi, *cắt đứt* khả năng \`errors.Is\`. Dùng \`%w\` khi muốn unwrap được; \`%v\` khi cố ý không cho unwrap.

### 4.3 Không panic cho lỗi bình thường

- \`panic\` chỉ cho lỗi **lập trình không thể phục hồi** (nil pointer do bug, invariant bị phá) — hoặc lúc khởi tạo (\`regexp.MustCompile\` ở package-level).
- Lỗi *có thể xảy ra trong vận hành* (file không có, network lỗi, input sai) → trả error, **không panic**.

\`\`\`go
// ❌ panic cho lỗi vận hành → crash cả server vì 1 request lỗi.
func handler(w http.ResponseWriter, r *http.Request) {
    data, err := readBody(r)
    if err != nil {
        panic(err) // SAI
    }
}

// ✅ trả lỗi qua HTTP, server vẫn sống.
func handler(w http.ResponseWriter, r *http.Request) {
    data, err := readBody(r)
    if err != nil {
        http.Error(w, "bad request", http.StatusBadRequest)
        return
    }
    _ = data
}
\`\`\`

> ❓ **Câu hỏi tự nhiên.** *"Bao giờ thì \`_ = err\` (bỏ qua lỗi) được chấp nhận?"* — Hiếm. Khi lỗi *thật sự* không quan trọng (vd \`w.Write\` trong handler khi client đã ngắt) và bạn **để comment giải thích**. \`errcheck\` sẽ cảnh báo mọi lỗi bị bỏ — bỏ qua phải cố ý và có lý do.

> 📝 **Tóm tắt mục 4.** Early return giữ happy path ở lề trái. Wrap lỗi bằng \`%w\` để giữ context và unwrap được. Panic chỉ cho bug/khởi tạo, không cho lỗi vận hành.

---

## 5. Comments — WHY, không WHAT

Comment tốt giải thích **vì sao**, không **làm gì** (code đã tự nói "làm gì").

\`\`\`go
// ❌ Comment hiển nhiên — lặp lại code, vô giá trị.
i++ // tăng i lên 1
count = 0 // gán count bằng 0

// ✅ Comment giải thích WHY — thông tin không có trong code.
// Retry 3 lần vì upstream API thỉnh thoảng trả 503 trong lúc deploy rolling.
const maxRetries = 3

// HACK: phải sleep 100ms vì driver v1.2 có race khi reconnect quá nhanh.
// Bỏ được khi nâng lên v1.3+. Theo dõi: JIRA-1234.
time.Sleep(100 * time.Millisecond)
\`\`\`

Quy tắc:

- **Exported** → bắt buộc doc comment, bắt đầu bằng tên (mục 3.2).
- **Code khó hiểu vì lý do bên ngoài** (workaround, business rule lạ, quyết định trade-off) → comment WHY.
- **Code hiển nhiên** → KHÔNG comment. Comment thừa làm nhiễu và dễ lỗi thời (code đổi, comment quên đổi).

> ⚠ **Lỗi thường gặp.** Comment "what" bị bỏ quên khi code đổi → trở thành *thông tin sai*, tệ hơn không có comment. Comment "why" ít lỗi thời hơn vì lý do thường còn nguyên.

> 📝 **Tóm tắt mục 5.** Giải thích WHY (lý do, trade-off, workaround), không WHAT. Exported phải có doc comment. Đừng comment điều hiển nhiên.

---

## 6. gofmt / goimports — đừng tranh cãi format

\`gofmt\` là một trong những quyết định thiên tài của Go: **một format chuẩn duy nhất, không cấu hình.**

- \`gofmt\` format code (indent bằng tab, dấu cách, vị trí ngoặc) — chuẩn hoá tự động.
- \`goimports\` = \`gofmt\` + tự thêm/xoá import, sắp xếp nhóm import.

Hệ quả: **không còn tranh cãi "ngoặc xuống dòng hay không", "2 space hay 4 space".** Máy quyết. Toàn cộng đồng Go viết giống nhau.

\`\`\`bash
gofmt -w .          # format toàn bộ, ghi đè file
goimports -w .      # format + sửa import
go fmt ./...        # gọi gofmt qua go tool
\`\`\`

> 💡 **Trực giác.** Trong nhiều ngôn ngữ, "format war" tiêu tốn vô số giờ review. Go chặn đứng nó bằng cách bỏ lựa chọn đi. Không có lựa chọn = không có gì để cãi. Hãy bật "format on save" trong editor và quên format đi mãi mãi.

> ⚠ **Lỗi thường gặp.** Review comment "thêm dấu cách ở đây", "xuống dòng chỗ kia" — đó là việc của \`gofmt\`, không phải của reviewer. Nếu CI có bước \`gofmt -l\` (list file chưa format) thì những comment này biến mất hoàn toàn.

> 📝 **Tóm tắt mục 6.** \`gofmt\`/\`goimports\` chuẩn hoá format tự động, không cấu hình. Bật format-on-save, đưa \`gofmt -l\` vào CI, đừng review về format.

---

## 7. golangci-lint — meta-linter

\`golangci-lint\` chạy *nhiều* linter cùng lúc, nhanh, có cache. Các linter quan trọng:

| Linter | Bắt cái gì |
|--------|-----------|
| \`govet\` | lỗi đáng ngờ: printf format sai, copy mutex, unreachable code |
| \`staticcheck\` | bộ luật lớn nhất: dead code, dùng API sai, simplification |
| \`errcheck\` | lỗi bị bỏ qua không xử lý (\`f.Close()\` không check) |
| \`ineffassign\` | gán giá trị rồi không bao giờ dùng |
| \`gocyclo\` | hàm có độ phức tạp cyclomatic quá cao (quá nhiều nhánh) |
| \`gosec\` | vấn đề bảo mật (SQL injection, hardcoded credential) |
| \`revive\` | thay thế \`golint\`: naming, doc comment |

Cấu hình ví dụ \`.golangci.yml\`:

\`\`\`yaml
linters:
  enable:
    - govet
    - staticcheck
    - errcheck
    - ineffassign
    - gocyclo
linters-settings:
  gocyclo:
    min-complexity: 15
\`\`\`

Đưa \`golangci-lint run\` vào CI ([Lesson 77](../lesson-77-ci-cd-pipeline/)) → mọi PR phải "green" trước khi merge. Linter bắt phần lớn lỗi cơ học, để review tập trung vào *logic* và *thiết kế*.

> 📝 **Tóm tắt mục 7.** \`golangci-lint\` gom nhiều linter (vet, staticcheck, errcheck...). Chạy trong CI để tự động chặn lỗi cơ học, giải phóng người review cho phần logic.

---

## 8. Checklist review Go

Khi review một PR Go, chạy qua checklist này. (Linter đã lo phần cơ học; đây là phần cần *mắt người*.)

1. **Error được xử lý chưa?** Mọi \`err\` được check hoặc cố ý bỏ (có comment)? Wrap đủ context chưa?
2. **Goroutine leak?** Mỗi \`go func()\` có đường thoát chưa? Có dùng \`context\` để hủy chưa? Channel có ai đọc/đóng không?
3. **Mutex bị copy?** Struct chứa \`sync.Mutex\` mà bị truyền *by value* (không phải pointer) → copy mutex → bug race. \`govet\` bắt được phần lớn.
4. **Race condition?** Biến chia sẻ giữa goroutine có được bảo vệ (mutex/channel) chưa? Đã chạy \`go test -race\` chưa?
5. **Nil check slice/map?** Đọc map nil OK (trả zero value) nhưng *ghi* map nil → panic. Slice nil append được nhưng index thì panic.
6. **\`defer Close()\`?** Mọi resource (file, conn, rows, response body) mở ra có \`defer Close()\` ngay sau khi mở chưa?
7. **Magic number → const?** Số "ma thuật" (3, 100, 8080) rải rác → đặt tên thành const.
8. **Test cover edge case?** Test có cover empty input, nil, giá trị biên, lỗi không? Không chỉ happy path.

\`\`\`go
// ⚠ Mutex copy — bug kinh điển.
type Counter struct {
    mu sync.Mutex
    n  int
}
func (c Counter) Inc() { c.mu.Lock(); c.n++; c.mu.Unlock() } // ❌ receiver by value → copy mutex
func (c *Counter) Inc() { c.mu.Lock(); c.n++; c.mu.Unlock() } // ✅ pointer receiver
\`\`\`

> ❓ **Câu hỏi tự nhiên.** *"Map nil đọc được, sao ghi lại panic?"* — Map nil là "chưa có bảng băm nào được cấp phát". Đọc thì Go trả zero value an toàn. Ghi thì cần bảng để đặt vào → không có bảng → panic. Luôn \`m := make(map[K]V)\` trước khi ghi.

> 📝 **Tóm tắt mục 8.** Checklist: error handled, goroutine leak/context, mutex copy/race, nil slice-map, defer Close, magic number→const, test edge case.

---

## 9. Code smell — mùi của code xấu

"Code smell" là dấu hiệu code *có thể* cần refactor (không chắc chắn sai, nhưng đáng nghi).

### 9.1 Function quá dài (> ~50 dòng)

Hàm dài thường làm nhiều việc → khó hiểu, khó test. Tách thành các hàm nhỏ tên rõ. (Xem BT2.)

### 9.2 Quá nhiều tham số (> 4)

\`\`\`go
// ❌ Khó nhớ thứ tự, dễ truyền nhầm.
func NewServer(host string, port int, timeout time.Duration, maxConn int, tls bool, logLevel string) *Server

// ✅ Gom vào struct config — gọi rõ ràng, dễ thêm field.
type Config struct {
    Host     string
    Port     int
    Timeout  time.Duration
    MaxConn  int
    TLS      bool
    LogLevel string
}
func NewServer(cfg Config) *Server
\`\`\`

### 9.3 Nested quá sâu (> 3 tầng)

\`\`\`go
// ❌ Nesting sâu — phải đọc xuôi rồi ngược để hiểu điều kiện.
func process(u *User) error {
    if u != nil {
        if u.Active {
            if u.Balance > 0 {
                return charge(u)
            } else {
                return errZeroBalance
            }
        } else {
            return errInactive
        }
    }
    return errNilUser
}

// ✅ Early return (guard clause) — mỗi điều kiện loại trừ ngay, happy path ở cuối lề trái.
func process(u *User) error {
    if u == nil {
        return errNilUser
    }
    if !u.Active {
        return errInactive
    }
    if u.Balance <= 0 {
        return errZeroBalance
    }
    return charge(u)
}
\`\`\`

### 9.4 Duplicate (vi phạm DRY)

Cùng một đoạn logic copy-paste ở nhiều nơi → sửa một chỗ quên chỗ khác. Tách thành hàm dùng chung. (Nhưng xem Go proverb ở mục 13 — *một chút copy còn hơn một chút dependency*; đừng abstract quá sớm.)

### 9.5 God struct / God package

Một struct/package "biết mọi thứ, làm mọi thứ" — vài chục field, hàng chục method không liên quan. Dấu hiệu thiếu phân tách trách nhiệm. Tách theo domain (liên hệ [Lesson 79 — Clean Architecture](../lesson-79-clean-architecture-go/)).

> 🔁 **Dừng lại tự kiểm tra.** Hàm \`func handle(r *http.Request) error\` của bạn dài 90 dòng và có 4 tầng \`if\`. Hai smell nào? Cách sửa?
> <details><summary>Đáp án</summary>(1) Function quá dài (9.1) → tách validate/process/respond thành hàm riêng. (2) Nested sâu (9.3) → early return. Hai cái thường đi cùng nhau.</details>

> 📝 **Tóm tắt mục 9.** Smell: hàm dài (>50), nhiều param (>4 → struct), nested sâu (>3 → early return), duplicate (DRY), god struct/package. Smell là *gợi ý nghi ngờ*, không phải luật cứng.

---

## 10. Review etiquette — cư xử khi review

Review là tương tác giữa người với người. Kỹ thuật đúng nhưng thái độ sai vẫn phá team.

1. **Comment trên *code*, không trên *người*.** Viết "this function could return early" (về code), KHÔNG "you wrote this wrong" (về người). Dùng "this/the function", tránh "you".

2. **Phân biệt blocking vs nit.** *Blocking*: lỗi/thiết kế phải sửa trước khi merge (bug, race, security). *Nit (nitpick)*: ý kiến nhỏ, không bắt buộc — đánh dấu rõ \`nit:\`.

   \`\`\`
   blocking: this leaks a goroutine if ctx is cancelled — need a done channel.
   nit: could rename \`tmp\` to \`parsed\` for clarity (non-blocking).
   \`\`\`

3. **Suggest, không command.** "What do you think about extracting this into a helper?" thay vì "Extract this." Người viết hiểu code của họ nhất; reviewer gợi ý, không ra lệnh.

4. **Approve khi *good enough*, không cần *perfect*.** Mục tiêu là code đủ tốt để merge an toàn, không phải hoàn hảo tuyệt đối. Cầu toàn → PR kẹt → team chậm. Nếu chỉ còn nit, approve và để tác giả tự quyết.

> 💡 **Trực giác.** Review giống góp ý bản nháp của đồng nghiệp, không phải chấm thi. Giọng điệu quyết định người ta học được hay phòng thủ. "We" thay "you", "could/might" thay "must" (trừ blocking thật).

> ⚠ **Lỗi thường gặp.** Reviewer block PR chỉ vì một nit ("tôi thích tên khác"). Đây là lạm quyền. Nit không được block — nếu thấy *cần* sửa thì nâng lên blocking và giải thích vì sao.

> 📝 **Tóm tắt mục 10.** Comment về code không về người ("the function" không "you"). Đánh dấu blocking vs nit. Suggest không command. Approve khi đủ tốt.

---

## 11. PR best practices

PR (Pull Request) là đơn vị review. PR tốt → review nhanh, ít bug lọt.

1. **PR nhỏ.** 200 dòng dễ review kỹ; 2000 dòng thì người ta lướt và rubber-stamp. Tách feature lớn thành nhiều PR nhỏ tuần tự.
2. **Mô tả rõ.** PR description trả lời: *làm gì* (what), *vì sao* (why), *test thế nào* (how to test). Link issue/ticket liên quan.
3. **Self-review trước.** Đọc lại diff của chính mình trước khi gán reviewer — bắt được debug log quên xoá, file thừa, comment TODO.
4. **CI green.** Đừng nhờ review khi build đỏ. Reviewer không nên là người phát hiện test fail — CI làm việc đó.

Mẫu PR description tốt (xem BT5):

\`\`\`markdown
## What
Thêm rate limiting cho endpoint /api/login (10 req/phút/IP).

## Why
Bị brute-force login tuần trước (xem INC-204). Rate limit chặn dò mật khẩu.

## How to test
- \`go test ./internal/ratelimit/...\`
- curl 11 lần trong 1 phút → request thứ 11 trả 429.

## Notes
- Dùng token bucket in-memory; sẽ chuyển Redis ở PR sau cho multi-instance.
\`\`\`

> 📝 **Tóm tắt mục 11.** PR nhỏ, mô tả What/Why/How-to-test, self-review trước, CI green trước khi nhờ người.

---

## 12. Khi nào được phá rule?

Quy ước là mặc định tốt, không phải luật bất biến. Được phá khi **có lý do và document lý do**:

1. **Performance critical.** Sau khi *đo* (profiling, [Lesson 34](../lesson-34-profiling-pprof/)), một đoạn hot-path cần viết "kém đẹp" để nhanh (tránh cấp phát, unroll loop). → comment giải thích + benchmark chứng minh.
2. **Generated code.** Code do \`protoc\`, \`stringer\`, \`mockgen\` sinh ra không cần theo style người (và không nên sửa tay). Đánh dấu \`// Code generated ... DO NOT EDIT.\` để linter và reviewer bỏ qua.
3. **External constraint.** API của thư viện ngoài ép một tên/chữ ký không idiomatic; tương thích format file cũ; ràng buộc protocol. → comment nêu ràng buộc.

> ⚠ **Lỗi thường gặp.** Phá rule mà *không* document → người sau tưởng là lỗi, "sửa lại cho đẹp", và phá performance/tương thích. Quy tắc vàng: **phá rule thì để lại dấu vết giải thích vì sao.**

> 📝 **Tóm tắt mục 12.** Được phá rule khi: performance đã đo, generated code, ràng buộc ngoài. Luôn document lý do — nếu không, sẽ bị "sửa cho đẹp" và vỡ.

---

## 13. Go proverbs (Rob Pike)

[Go proverbs](https://go-proverbs.github.io/) là tập câu ngắn cô đọng triết lý Go. Vài câu hay gặp trong review:

- **"Clear is better than clever."** — Đã bàn ở mục 2.
- **"A little copying is better than a little dependency."** — Copy 3 dòng còn hơn kéo về một thư viện nặng chỉ để dùng 3 dòng đó. Dependency có chi phí ẩn (version, security, maintenance).
- **"Don't communicate by sharing memory; share memory by communicating."** — Ưu tiên channel (truyền dữ liệu qua message) hơn là biến chung + mutex. (Liên hệ [Lesson 27](../lesson-27-goroutines-channels/).)
- **"The bigger the interface, the weaker the abstraction."** — Interface nhỏ (1-2 method) mạnh và dễ implement; interface to khó dùng.
- **"errors are values."** — Lỗi là giá trị bình thường, xử lý như mọi giá trị khác (so sánh, wrap, truyền), không phải cơ chế ngoại lệ.
- **"Make the zero value useful."** — Thiết kế struct sao cho giá trị zero (\`var b bytes.Buffer\`) dùng được ngay, không cần constructor.

> ❓ **Câu hỏi tự nhiên.** *"'Một chút copy còn hơn dependency' có mâu thuẫn với DRY (9.4) không?"* — Không hẳn. DRY chống *duplicate logic phức tạp dễ lệch nhau*. Proverb chống *abstract hoá sớm/kéo dependency cho thứ tầm thường*. Cân bằng: copy thứ nhỏ và ổn định; tách thứ phức tạp và hay đổi.

> 📝 **Tóm tắt mục 13.** Proverbs cô đọng triết lý: clear>clever, copy nhỏ>dependency, channel>shared memory, interface nhỏ mạnh hơn, errors là values, zero value hữu ích.

---

## 14. Common pitfall của *review* (lỗi của người review)

Không chỉ code có pitfall — bản thân quá trình review cũng có:

- **Bikeshedding.** Tranh cãi dài về thứ tầm thường (màu nút, tên biến cỏn con) trong khi bỏ qua thiết kế lớn. Tên gọi từ ẩn dụ "ai cũng góp ý được màu nhà để xe vì ai cũng hiểu, nhưng không ai dám bàn lò phản ứng hạt nhân". Chống lại: timebox nit, ưu tiên vấn đề lớn.
- **Rubber-stamp.** Approve mà không thực sự đọc ("LGTM" trong 30 giây cho PR 1500 dòng). Vô dụng — bỏ lỡ mọi giá trị của review. Chống lại: PR nhỏ, dành đủ thời gian, hỏi câu hỏi thật.
- **Quá khắt khe.** Block PR vì nit, đòi hỏi hoàn hảo. Làm chậm team, gây ức chế. Chống lại: chỉ block khi *thật sự* blocking; nit thì non-blocking.
- **PR khổng lồ khó review.** Đây là lỗi *của người mở PR* nhưng làm hỏng review. PR 3000 dòng → không ai review nổi → rubber-stamp. Chống lại: tách PR nhỏ (mục 11).

> 💡 **Trực giác.** Hai cực đều xấu: review *quá lỏng* (rubber-stamp) bỏ lọt bug; review *quá chặt* (bikeshedding/khắt khe) giết tốc độ team. Review tốt nằm ở giữa: nghiêm với điều quan trọng, thoáng với điều nhỏ.

> 📝 **Tóm tắt mục 14.** Pitfall review: bikeshedding (cãi vặt), rubber-stamp (approve mù), quá khắt khe (block vì nit), PR khổng lồ. Cân bằng: chặt với lớn, thoáng với nhỏ.

---

## 15. Ứng dụng thực tế trong phần mềm

> 💡 **Code review là nơi kiến thức lan truyền và bug bị chặn trước production — kỹ năng review tốt quan trọng ngang kỹ năng code.**

| Thực hành | Vì sao |
|-----------|--------|
| **Tự động hóa nit** (lint/fmt/CI) | Đừng tốn review cho format → \`gofmt\`/\`golangci-lint\` lo |
| **Review logic, không style** | Người tập trung vào đúng đắn/thiết kế/edge case |
| **PR nhỏ** | <400 dòng → review kỹ; PR khổng lồ = approve mù |
| **Comment mang tính xây dựng** | "Cân nhắc X vì Y" thay vì "sai rồi" |
| **Conventional Commits** | Lịch sử git đọc được, tự sinh changelog |

### 15.1. Ví dụ cụ thể — vì sao PR nhỏ + lint tự động

PR 2000 dòng → reviewer mệt, approve qua loa, bug lọt. PR 200 dòng → review kỹ từng dòng, bắt được bug thật. Và đừng để reviewer tranh luận "tab hay space", "đặt dấu phẩy đâu" — **\`gofmt\` + \`golangci-lint\` trong CI** tự sửa/chặn → review dành cho thứ máy không làm được: *logic đúng không? edge case? thiết kế hợp lý? đặt tên rõ?*. Google/Go team: format không phải chủ đề review (đã chuẩn hóa bằng tool). Đây là cách review tạo giá trị thật thay vì cãi nhau vặt.

> 💡 **Review là dạy + học hai chiều, không phải gác cổng quyền lực.** (1) Comment giải thích **vì sao** ("dùng \`errors.Is\` ở đây vì lỗi có thể bị wrap" + link) → reviewee học, lần sau tự làm đúng. (2) Phân biệt **phải sửa** (bug, bảo mật) với **gợi ý** (nit, prefer) — đánh dấu rõ để không block PR vì ý kiến cá nhân. (3) Review sớm + nhanh (đừng để PR chờ ngày) → không chặn đồng đội. (4) Người viết: PR nhỏ, mô tả rõ "làm gì, vì sao, test sao" → reviewer hiểu nhanh. Văn hóa review tốt = codebase tốt + team học nhanh.

### 15.2. 📝 Tóm tắt mục 15

- **Tự động hóa style/nit** (gofmt + golangci-lint + CI) → review dành cho logic/thiết kế/edge case/bảo mật.
- **PR nhỏ** (<400 dòng) → review kỹ, bắt bug thật; PR khổng lồ = approve mù.
- Review = dạy+học hai chiều: comment "vì sao", phân biệt phải-sửa vs gợi-ý, review nhanh không chặn team.

## Bài tập

> Tất cả bài tập đều có lời giải chi tiết ở mục kế tiếp. Code minh hoạ chạy được ở [solutions.go](./solutions.go); trực quan tương tác ở [visualization.html](./visualization.html).

**BT1.** Review đoạn code sau, chỉ ra **5 issue** và viết lại bản fix:

\`\`\`go
package main
import ("fmt"; "os")
func ReadData(FileName string) []byte {
    f, _ := os.Open(FileName)
    data := make([]byte, 1024)
    n, _ := f.Read(data)
    if n > 0 {
        if data[0] == '{' {
            if len(data) > 10 {
                fmt.Println("json")
            }
        }
    }
    return data[:n]
}
\`\`\`

**BT2.** Refactor hàm ~80 dòng làm 3 việc (validate → tính toán → format output) thành các hàm nhỏ. (Đề đầy đủ ở lời giải.)

**BT3.** Sửa naming cho idiomatic:

\`\`\`go
package userManagement
type UserManagerService struct{ DB_Connection *sql.DB }
func (s *UserManagerService) GetUserByUserId(theUserId int) (*User, error)
type IUserReader interface { ReadUser() }
\`\`\`

**BT4.** Phân loại 6 review comment sau thành **blocking** hay **nit**:
1. "This goroutine leaks if the context is cancelled — no done signal."
2. "Prefer \`parsed\` over \`tmp\` for this variable name."
3. "SQL query is built with string concat → injection risk."
4. "Extra blank line here."
5. "Map written without \`make\` → will panic on first write."
6. "Could group these two imports together."

**BT5.** Viết một PR description tốt cho feature: *thêm endpoint \`GET /healthz\` trả về trạng thái DB connection*.

**BT6.** Cho 3 tình huống, giải thích **được phép phá** gofmt/lint rule không và vì sao:
1. Một hàm hot-path trong parser, profiling cho thấy chiếm 40% CPU, viết lại bằng vòng lặp xấu nhưng nhanh hơn 3x.
2. File \`user.pb.go\` do \`protoc\` sinh, \`golint\` than phiền thiếu doc comment.
3. Tên biến \`l\` (chữ L thường) cho một logger ở package-level dùng xuyên 300 dòng.

---

## Lời giải chi tiết

### Lời giải BT1 — 5 issue

| # | Issue | Loại | Vì sao sai |
|---|-------|------|-----------|
| 1 | \`f, _ := os.Open(...)\` | error ignored | nếu mở thất bại, \`f\` nil → \`f.Read\` panic. \`errcheck\` bắt. |
| 2 | \`n, _ := f.Read(...)\` | error ignored | Read lỗi không biết; dữ liệu có thể không đầy đủ. |
| 3 | thiếu \`defer f.Close()\` | resource leak | file handle không bao giờ đóng → rò rỉ FD. |
| 4 | \`FileName\`, không return error | naming + signature | param viết hoa (giống exported, sai); hàm "có thể lỗi" mà không trả \`error\`. |
| 5 | \`1024\` magic + nested 3 tầng | magic number + deep nesting | \`1024\` nên thành const; 3 tầng \`if\` nên gộp bằng \`&&\` hoặc early return. |

Bản fix idiomatic:

\`\`\`go
package main

import (
    "fmt"
    "os"
)

const readBufSize = 1024 // (5) magic number → const, đặt tên có nghĩa

// ReadData reads up to readBufSize bytes from path and reports whether
// the content looks like JSON. (4) doc comment + trả error.
func ReadData(path string) ([]byte, error) { // (4) tên param thường, trả error
    f, err := os.Open(path) // (1) check error
    if err != nil {
        return nil, fmt.Errorf("open %s: %w", path, err)
    }
    defer f.Close() // (3) defer Close ngay sau khi mở

    buf := make([]byte, readBufSize)
    n, err := f.Read(buf) // (2) check error
    if err != nil {
        return nil, fmt.Errorf("read %s: %w", path, err)
    }

    // (5) early return thay 3 tầng if lồng nhau
    if n > 10 && buf[0] == '{' {
        fmt.Println("json")
    }
    return buf[:n], nil
}
\`\`\`

### Lời giải BT2 — refactor hàm dài

Đề: hàm \`Report\` nhận đơn hàng, (1) validate, (2) tính tổng + thuế + giảm giá, (3) format chuỗi báo cáo — tất cả trong một hàm ~80 dòng. Cách tiếp cận: mỗi việc một hàm, hàm gốc chỉ điều phối.

\`\`\`go
func validateOrder(o Order) error {
    if len(o.Items) == 0 {
        return errors.New("order has no items")
    }
    for i, it := range o.Items {
        if it.Price < 0 || it.Qty <= 0 {
            return fmt.Errorf("item %d invalid: price=%v qty=%v", i, it.Price, it.Qty)
        }
    }
    return nil
}

func computeTotals(o Order) Totals {
    var sub float64
    for _, it := range o.Items {
        sub += it.Price * float64(it.Qty)
    }
    discount := sub * o.DiscountRate
    taxable := sub - discount
    return Totals{Subtotal: sub, Discount: discount, Tax: taxable * taxRate, Grand: taxable * (1 + taxRate)}
}

func formatReport(o Order, t Totals) string {
    var b strings.Builder
    fmt.Fprintf(&b, "Order %s\\n", o.ID)
    fmt.Fprintf(&b, "  Subtotal: %.2f\\n", t.Subtotal)
    fmt.Fprintf(&b, "  Discount: %.2f\\n", t.Discount)
    fmt.Fprintf(&b, "  Tax:      %.2f\\n", t.Tax)
    fmt.Fprintf(&b, "  Total:    %.2f\\n", t.Grand)
    return b.String()
}

// Report giờ chỉ điều phối — đọc như mục lục, mỗi bước rõ ràng.
func Report(o Order) (string, error) {
    if err := validateOrder(o); err != nil {
        return "", fmt.Errorf("validate: %w", err)
    }
    totals := computeTotals(o)
    return formatReport(o, totals), nil
}
\`\`\`

Lợi ích: mỗi hàm con **test riêng được** (\`computeTotals\` không cần file/IO), tên hàm tự tài liệu, \`Report\` đọc như mục lục.

### Lời giải BT3 — naming idiomatic

\`\`\`go
// ❌ Trước
package userManagement // mixedCaps, dài
type UserManagerService struct{ DB_Connection *sql.DB } // stutter + underscore + "Manager/Service" thừa
func (s *UserManagerService) GetUserByUserId(theUserId int) (*User, error) // stutter "User"x3, "theUserId" dài
type IUserReader interface { ReadUser() } // tiền tố "I" kiểu C#/Java, không idiomatic
\`\`\`

\`\`\`go
// ✅ Sau
package user                       // ngắn, lowercase
type Service struct{ db *sql.DB }  // dùng là user.Service; field thường \`db\`
func (s *Service) ByID(id int) (*User, error) // gọi user.Service.ByID; param ngắn \`id\`
type Reader interface{ Read() (*User, error) } // bỏ tiền tố I; hậu tố -er
\`\`\`

Sửa: (1) package \`user\`; (2) bỏ stutter → \`Service\`, \`ByID\`; (3) field \`db\` thường; (4) param \`id\` ngắn cho scope nhỏ; (5) bỏ tiền tố \`I\`, dùng hậu tố \`-er\`.

### Lời giải BT4 — phân loại blocking vs nit

| # | Comment | Loại | Lý do |
|---|---------|------|-------|
| 1 | goroutine leak nếu ctx cancel | **blocking** | leak tài nguyên → memory grow → bug production thật |
| 2 | đổi tên \`tmp\` → \`parsed\` | **nit** | làm rõ hơn, không ảnh hưởng đúng/sai |
| 3 | SQL string concat → injection | **blocking** | lỗ hổng bảo mật nghiêm trọng |
| 4 | thừa một dòng trống | **nit** (thật ra \`gofmt\` lo) | format, không nên là comment người |
| 5 | map ghi không \`make\` → panic | **blocking** | crash runtime — bug chắc chắn |
| 6 | gộp 2 import | **nit** (\`goimports\` lo) | format tự động hoá |

Quy tắc: **blocking** = đúng/sai, an toàn, bảo mật, leak. **nit** = phong cách, tên gọi, format (mà thường công cụ tự lo: #4, #6).

### Lời giải BT5 — PR description mẫu

\`\`\`markdown
## What
Thêm endpoint \`GET /healthz\` trả 200 nếu service khỏe (ping được DB), 503 nếu không.

## Why
Kubernetes liveness/readiness probe (Lesson 76) cần một endpoint để biết pod
đã sẵn sàng nhận traffic chưa. Hiện chưa có → k8s không phân biệt được pod
đang khởi động vs pod chết.

## How to test
- \`go test ./internal/health/...\`
- Chạy local, \`curl localhost:8080/healthz\` → \`{"status":"ok"}\` 200.
- Tắt DB, \`curl\` lại → \`{"status":"db unreachable"}\` 503.

## Notes
- Ping DB có timeout 2s để probe không treo.
- Chưa check Redis ở PR này — sẽ thêm khi tích hợp cache (PR sau).
\`\`\`

Đủ 4 phần: What (làm gì), Why (vì sao cần), How to test (kiểm chứng), Notes (giới hạn/follow-up).

### Lời giải BT6 — khi nào phá rule

1. **Hot-path nhanh hơn 3x sau khi đo** → **ĐƯỢC phá**, nhưng phải: (a) có benchmark chứng minh trong PR, (b) comment giải thích "viết kiểu này vì hot-path, xem BenchmarkX". Có dữ liệu + document → hợp lệ. Phá *mà không đo* thì không được — đó là premature optimization.
2. **\`user.pb.go\` thiếu doc comment** → **không cần sửa, và phải exclude khỏi lint**. Generated code có header \`// Code generated ... DO NOT EDIT.\`; cấu hình \`golangci-lint\` bỏ qua file generated. Sửa tay là sai (lần generate sau sẽ mất).
3. **Biến \`l\` cho logger dùng xuyên 300 dòng** → **KHÔNG được phá**. Đây là scope lớn → cần tên mô tả (\`logger\` hoặc \`log\`). \`l\` chỉ hợp cho scope vài dòng. Đây là vi phạm rule naming *không* chính đáng — sửa thành \`logger\`.

Kết luận: phá rule hợp lệ cần **lý do thật + bằng chứng + document** (case 1, 2). Phá vì lười hoặc thói quen (case 3) thì không.

---

## Tổng kết

- Code review tồn tại để bắt bug *sớm*, chia sẻ kiến thức, giữ nhất quán, mentor — không chỉ bắt bug.
- Triết lý Go: clear > clever. Tối ưu cho người đọc.
- Naming: package ngắn lowercase, exported có doc comment, biến theo scope, interface \`-er\`, tránh stutter.
- Error: early return, wrap \`%w\`, không panic cho lỗi vận hành.
- Tự động hoá: \`gofmt\`/\`goimports\` (format), \`golangci-lint\` (lỗi cơ học) → để mắt người lo logic.
- Etiquette: comment về code không về người, blocking vs nit, suggest không command, approve khi đủ tốt.
- PR nhỏ, mô tả rõ, self-review, CI green.
- Phá rule được — nhưng phải có lý do và document.

## Bài tiếp theo

→ [Lesson 81 — Incident & Postmortem](../lesson-81-incident-postmortem/): khi code đã lên production và *vẫn* có sự cố — on-call, blameless postmortem, root cause (5 whys), SLO/SLI/error budget.

## Tham khảo

- [Effective Go](https://go.dev/doc/effective_go)
- [Go Code Review Comments (wiki)](https://go.dev/wiki/CodeReviewComments)
- [Go Proverbs — Rob Pike](https://go-proverbs.github.io/)
- [Google Engineering Practices — Code Review](https://google.github.io/eng-practices/review/)
- [golangci-lint](https://golangci-lint.run/)
`;
