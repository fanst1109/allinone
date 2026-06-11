// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: SoftwareEngineering/02-Design-Quality/lesson-01-clean-code-code-smells/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 01 — Clean code & code smells

## Mục tiêu

- Hiểu **clean code** (code sạch) là gì và **vì sao** nó quan trọng: code được *đọc* nhiều hơn *viết*, code sạch giảm chi phí bảo trì dài hạn.
- Biết cách **đặt tên có ý nghĩa** cho biến và hàm — tên là tài liệu rẻ nhất và hiệu quả nhất.
- Viết **hàm nhỏ, làm một việc**, ít tham số, tránh side effect ẩn.
- Nhận diện các **code smell** (mùi code) phổ biến: long function, large class, duplicated code, magic number, deep nesting, long parameter list, dead code — và cách khử mỗi loại.
- Dùng **comment** đúng chỗ: giải thích *vì sao* chứ không phải *cái gì*.

## Kiến thức tiền đề

- Đã từng đọc code của người khác trong **code review** và thấy có đoạn khó hiểu — xem [Lesson 05 — Code review](../../01-Foundations/lesson-05-code-review/). Clean code chính là thứ làm review nhanh và dễ.
- Hiểu rằng phần lớn chi phí một phần mềm nằm ở **giai đoạn bảo trì**, không phải lúc viết lần đầu — xem [Lesson 01 — SDLC & vai trò kỹ sư](../../01-Foundations/lesson-01-sdlc-vai-tro-ky-su/) (đường cong chi phí, vòng đời nhiều năm).
- Biết đọc code Go cơ bản (đủ để theo các ví dụ before/after).

> 💡 **Vì sao tầng này (Design & Quality) bắt đầu bằng clean code?** Trước khi bàn nguyên lý thiết kế lớn (SOLID, coupling/cohesion, design pattern), phải vững nền: code *trong từng hàm* phải đọc được đã. Clean code là "vệ sinh cá nhân" của lập trình — không hào nhoáng nhưng bỏ qua thì cả hệ thống bốc mùi.

---

## 1. Clean code là gì & vì sao cần

💡 **Trực giác.** Hãy tưởng tượng code như một bài viết để lại cho đồng nghiệp (và cho chính bạn 6 tháng sau, lúc đã quên sạch). Clean code là bài viết mà người đọc *hiểu ngay* không cần dừng lại giải mã. Code bẩn là bài viết đầy từ viết tắt riêng, câu cụt, không dấu chấm câu — chạy thì vẫn chạy, nhưng mỗi lần sửa là một lần khổ.

**Một sự thật ít người để ý:** code được **đọc nhiều hơn viết rất nhiều lần**. Bạn viết một hàm trong 10 phút, nhưng nó sẽ bị đọc đi đọc lại hàng chục lần trong nhiều năm — mỗi khi ai đó sửa bug gần đó, thêm tính năng, hay review. Tỷ lệ đọc:viết thường được ước lượng cỡ **10:1 hoặc hơn**. Vì vậy tối ưu cho *người đọc* gần như luôn thắng tối ưu cho *người viết*.

\`\`\`go
// ❌ Bẩn: chạy đúng nhưng phải dừng lại "giải mã"
func p(d []int) int {
    r := 0
    for _, x := range d {
        if x > 0 {
            r += x
        }
    }
    return r
}

// ✅ Sạch: đọc một lần là hiểu ý định
func sumPositive(numbers []int) int {
    total := 0
    for _, n := range numbers {
        if n > 0 {
            total += n
        }
    }
    return total
}
\`\`\`

Hai hàm **giống hệt nhau về hành vi**. Khác biệt duy nhất là cái thứ hai *nói cho bạn biết nó làm gì* — và đó chính là toàn bộ giá trị của clean code.

> ❓ **"Clean code có làm chậm tốc độ ra tính năng không?"** Ngược lại. Nhanh lúc đầu (code ẩu) nhưng chậm dần vì mỗi thay đổi sau đều phải lội qua bùn. Clean code chậm hơn vài phút *bây giờ* để nhanh hơn nhiều giờ *về sau*. Đây là cùng nguyên lý "phát hiện/sửa sớm rẻ hơn muộn" ở [đường cong chi phí SDLC](../../01-Foundations/lesson-01-sdlc-vai-tro-ky-su/).

> ❓ **"Clean code có phải là viết thật ngắn / dùng ít dòng nhất?"** Không. Ngắn không bằng *rõ*. Một dòng \`r += d[i]\` ngắn hơn nhưng tệ hơn \`total += numbers[i]\`. Mục tiêu là **dễ hiểu**, không phải dòng tối thiểu.

> ⚠ **Lỗi thường gặp.** "Code này chỉ mình tao đọc nên viết sao cũng được." Sai — *bạn của 6 tháng sau* cũng là người khác. Và phần lớn code "tạm" lại sống rất lâu trong production.

> 🔁 **Dừng lại tự kiểm tra.** Vì sao tối ưu cho người đọc thường thắng tối ưu cho người viết?
> <details><summary>Đáp án</summary>Vì code được đọc nhiều lần hơn viết (cỡ 10:1+). Tiết kiệm 5 phút lúc viết bằng cách viết khó hiểu sẽ khiến mỗi lần đọc về sau tốn thêm thời gian — nhân lên hàng chục lần thành lỗ to. Tổng chi phí vòng đời mới là thứ cần tối ưu.</details>

📝 **Tóm tắt mục 1.** Clean code = code mà người đọc hiểu ngay, không phải code chạy được hay ngắn nhất. Vì code được đọc nhiều hơn viết, đầu tư cho sự rõ ràng giảm chi phí bảo trì dài hạn.

---

## 2. Đặt tên có ý nghĩa

💡 **Trực giác.** Tên là **tài liệu rẻ nhất** bạn có. Một cái tên tốt thay thế cho cả một dòng comment. Đọc \`daysUntilExpiry\` không cần giải thích gì thêm; đọc \`d\` thì phải đi tìm xem \`d\` là gì.

**Nguyên tắc đặt tên tốt:**

| Nguyên tắc | Tệ | Tốt |
|------------|-----|------|
| Tên *tiết lộ ý định* | \`d\` | \`elapsedDays\` |
| Tránh viết tắt tối nghĩa | \`genYmdHis()\` | \`generateTimestamp()\` |
| Tên *phát âm được* | \`xsqlrec\` | \`customerRecord\` |
| Tránh số "ma" trong tên | \`data2\`, \`tmp\` | \`validatedOrders\`, \`pendingOrder\` |
| Hàm = động từ, biến = danh từ | \`func active()\` (?) | \`func isActive() bool\` |
| Boolean như câu hỏi | \`flag\` | \`isEmpty\`, \`hasPermission\` |

\`\`\`go
// ❌ Trước: phải đoán mọi thứ
func calc(l []float64, t float64) float64 {
    s := 0.0
    for _, e := range l {
        if e > t {
            s += e
        }
    }
    return s
}

// ✅ Sau: tên kể nguyên câu chuyện
func sumAboveThreshold(amounts []float64, threshold float64) float64 {
    total := 0.0
    for _, amount := range amounts {
        if amount > threshold {
            total += amount
        }
    }
    return total
}
\`\`\`

Sau khi đặt tên tốt, lời gọi hàm tự đọc được như tiếng Anh: \`sumAboveThreshold(prices, 100.0)\` — "tính tổng các giá trên 100".

> ❓ **"Tên dài thế có lười gõ không?"** Editor hiện đại có autocomplete — bạn gõ vài ký tự là xong. Cái giá của tên dài (vài lần gõ) nhỏ xíu so với cái lợi (mỗi lần đọc đều hiểu ngay). Đừng tiết kiệm ký tự bằng cách đánh đổi sự rõ ràng.

> ⚠ **Lỗi thường gặp.** Đặt tên *kiểu dữ liệu* thay vì *ý nghĩa*: \`strName\`, \`intCount\`, \`listUsers\`. Kiểu đã có trong khai báo rồi (\`name string\`), nhồi vào tên là thừa. Đặt tên theo *vai trò nghiệp vụ*: \`activeUsers\`, \`retryCount\`.

> ⚠ **Lỗi thường gặp.** Tên gây hiểu nhầm: biến tên \`userList\` nhưng thực ra là một \`map\`, hay \`accounts\` nhưng chỉ chứa *một* account. Tên phải khớp với thứ nó thật sự là.

> 🔁 **Dừng lại tự kiểm tra.** Tên nào tốt hơn cho biến đếm số lần thử lại đăng nhập thất bại: \`n\`, \`cnt\`, \`failedLoginAttempts\`? Vì sao?
> <details><summary>Đáp án</summary><code>failedLoginAttempts</code>. Nó tiết lộ <i>ý định</i> (đếm cái gì, trong ngữ cảnh nào) mà không cần comment. <code>n</code>/<code>cnt</code> buộc người đọc đi tìm ngữ cảnh ở chỗ khác — tốn thời gian và dễ hiểu sai.</details>

📝 **Tóm tắt mục 2.** Tên tốt tiết lộ ý định, phát âm được, không viết tắt tối nghĩa, không nhồi kiểu dữ liệu. Hàm là động từ, biến là danh từ, boolean là câu hỏi (\`is/has\`). Tên là tài liệu rẻ nhất.

---

## 3. Hàm nhỏ, làm một việc

💡 **Trực giác.** Một hàm tốt giống một câu trong văn bản: nói *một* ý, ngắn gọn, đọc xong hiểu liền. Hàm dài làm 5 việc giống một câu dài 10 dòng nối bằng "rồi", "sau đó", "à mà còn" — đọc tới cuối đã quên đầu.

**Ba quy tắc cốt lõi:**

1. **Làm một việc** (Single Responsibility ở mức hàm). Nếu mô tả hàm phải dùng chữ "và", nó đang làm nhiều việc.
2. **Ngắn.** Hàm vừa lọt một màn hình (lý tưởng < 20 dòng) dễ đọc hơn hàm phải scroll.
3. **Ít tham số.** 0–2 tham số là lý tưởng; ≥ 4 là dấu hiệu cần gom thành struct hoặc tách hàm.

\`\`\`go
// ❌ Trước: một hàm làm validate + tính + lưu + gửi mail
func processOrder(o Order) error {
    if o.Total <= 0 {
        return errors.New("invalid total")
    }
    if len(o.Items) == 0 {
        return errors.New("empty order")
    }
    tax := o.Total * 0.1
    o.Total += tax
    db.Save(o)                    // side effect
    mailer.Send(o.Email, "...")   // side effect ẩn — tên hàm không hé lộ là có gửi mail!
    return nil
}

// ✅ Sau: mỗi hàm một việc, lời gọi đọc như mục lục
func processOrder(o Order) error {
    if err := validateOrder(o); err != nil {
        return err
    }
    o = applyTax(o)
    if err := saveOrder(o); err != nil {
        return err
    }
    return notifyCustomer(o)
}

func validateOrder(o Order) error { /* ... */ }
func applyTax(o Order) Order       { /* ... */ }
func saveOrder(o Order) error      { /* ... */ }
func notifyCustomer(o Order) error { /* ... */ }
\`\`\`

**Side effect ẩn** là tác dụng phụ mà tên hàm không hé lộ. Một hàm tên \`getUser()\` mà *âm thầm ghi log vào DB* hoặc *sửa biến toàn cục* là cái bẫy: người gọi tưởng chỉ đọc, hóa ra có ghi. Hàm nên hoặc *trả về giá trị* (query), hoặc *thay đổi trạng thái* (command) — và tên phải nói rõ nó làm gì.

> ❓ **"Tách thành nhiều hàm nhỏ thì phải nhảy qua nhảy lại đọc, không mệt hơn à?"** Không, nếu *đặt tên tốt*. Với tên rõ, bạn đọc \`processOrder\` thấy \`validateOrder → applyTax → saveOrder → notifyCustomer\` là hiểu toàn bộ luồng *mà không cần* mở từng hàm. Chỉ khi cần chi tiết mới đào sâu. Đó là tóm tắt ở mọi cấp độ.

> ⚠ **Lỗi thường gặp.** Tham số boolean để "đổi chế độ": \`render(true)\` — đọc lời gọi không biết \`true\` nghĩa gì. Dấu hiệu hàm làm *hai* việc. Tách thành \`renderCompact()\` và \`renderFull()\`.

> ⚠ **Lỗi thường gặp.** Tách hàm vô tội vạ tới mức mỗi hàm 1 dòng, gọi lòng vòng — đó là over-engineering. Tách theo *ý nghĩa* (một việc rõ ràng), không theo số dòng máy móc.

> 🔁 **Dừng lại tự kiểm tra.** Hàm \`func saveAndEmail(u User)\` có mùi gì?
> <details><summary>Đáp án</summary>Tên có chữ "And" → hàm làm <b>hai việc</b> (lưu + gửi mail). Vi phạm "làm một việc". Tách thành <code>save(u)</code> và <code>sendWelcomeEmail(u)</code>, để người gọi tự quyết định gọi cái nào — linh hoạt hơn và tên không nói dối.</details>

📝 **Tóm tắt mục 3.** Hàm tốt: làm một việc, ngắn, ít tham số (0–2 lý tưởng), không có side effect ẩn. Tên có chữ "and" hoặc tham số boolean đổi chế độ là dấu hiệu hàm làm quá nhiều.

---

## 4. Code smells phổ biến

💡 **Trực giác.** Code smell (mùi code) là dấu hiệu *bề mặt* gợi ý có vấn đề *sâu hơn* — như mùi khét trong bếp: chưa chắc cháy nhà, nhưng nên đi kiểm tra. Smell **không phải bug** (code vẫn chạy), nhưng là chỗ khó sửa, dễ sinh bug về sau. Học nhận diện smell = học "ngửi" ra chỗ cần [refactor](../lesson-05-refactoring-tech-debt/).

Dưới đây là 7 smell hay gặp nhất, mỗi cái một ví dụ ngắn:

| Smell | Dấu hiệu | Cách khử |
|-------|----------|----------|
| **Long function** | Hàm dài hàng trăm dòng | Tách (extract) thành hàm con có tên |
| **Large class** | Class ôm quá nhiều trách nhiệm | Tách class theo trách nhiệm |
| **Duplicated code** | Cùng một đoạn copy-paste nhiều nơi | Gom vào một hàm/khối dùng chung (DRY) |
| **Magic number** | Số/chuỗi "trần" không tên | Đặt thành hằng có tên |
| **Deep nesting** | \`if\` lồng \`if\` lồng \`if\`... | Early return (guard clause) |
| **Long parameter list** | Hàm 5+ tham số | Gom thành struct |
| **Dead code** | Code không bao giờ chạy | Xóa (git nhớ giùm bạn) |

**Magic number** — số trần không rõ ý nghĩa:

\`\`\`go
// ❌ 86400 là gì? 0.1 là gì?
if now-lastSeen > 86400 { ... }
total := price * 1.1

// ✅ Đặt tên cho ý nghĩa
const secondsPerDay = 86400
const vatRate = 0.1
if now-lastSeen > secondsPerDay { ... }
total := price * (1 + vatRate)
\`\`\`

**Deep nesting** → **early return** (guard clause):

\`\`\`go
// ❌ Lồng sâu, "mũi tên" đẩy logic chính vào trong cùng
func handle(r *Request) error {
    if r != nil {
        if r.User != nil {
            if r.User.Active {
                // logic thật ở đây, thụt 3 cấp
                return doWork(r)
            }
        }
    }
    return errNoAccess
}

// ✅ Guard clause: loại trường hợp xấu sớm, logic chính ở cấp ngoài cùng
func handle(r *Request) error {
    if r == nil || r.User == nil {
        return errBadRequest
    }
    if !r.User.Active {
        return errNoAccess
    }
    return doWork(r)
}
\`\`\`

**Long parameter list** → gom struct:

\`\`\`go
// ❌ 6 tham số — gọi xong không nhớ thứ tự
func createUser(name, email, phone, addr, city string, age int) { ... }
createUser("An", "an@x.vn", "090...", "123 Lê Lợi", "HCM", 30) // đâu là phone, đâu là addr?

// ✅ Struct: gọi rõ ràng, dễ thêm trường
type UserInfo struct {
    Name, Email, Phone, Address, City string
    Age                               int
}
func createUser(info UserInfo) { ... }
\`\`\`

**Duplicated code** → gom (DRY — Don't Repeat Yourself):

\`\`\`go
// ❌ Cùng công thức tính giá có thuế, lặp 3 nơi → sửa 1 chỗ quên 2 chỗ
priceA := a.Base * 1.1
priceB := b.Base * 1.1

// ✅ Một nguồn sự thật
func withVAT(base float64) float64 { return base * (1 + vatRate) }
priceA := withVAT(a.Base)
priceB := withVAT(b.Base)
\`\`\`

> ❓ **"Smell thì phải sửa ngay không?"** Không phải lúc nào cũng vậy. Smell là *gợi ý xem xét*, không phải lệnh. Cân nhắc: đoạn này có hay bị sửa không? Có gây bug không? Nếu là code ổn định, ít đụng tới thì có thể để đó. Sửa khi bạn *đang đi qua* nó (xem nguyên tắc boy-scout mục 6).

> ❓ **"Duplicated code lúc nào cũng xấu?"** Phần lớn xấu, nhưng có "trùng giả": hai đoạn *trông giống* nhưng *thay đổi vì lý do khác nhau*. Gộp vội hai thứ độc lập tạo ra coupling sai (ép dính nhau). Quy tắc thực dụng: trùng lần thứ ba mới gom (rule of three).

> ⚠ **Lỗi thường gặp.** Để **dead code** lại "để dành phòng khi cần" và comment nó ra. Đừng — git lưu lại lịch sử rồi. Code comment-out làm rối, gây nhiễu khi đọc và tìm kiếm.

> 🔁 **Dừng lại tự kiểm tra.** Đoạn \`if user.Role == 2 { grantAdmin() }\` có smell gì, sửa thế nào?
> <details><summary>Đáp án</summary><b>Magic number</b> — <code>2</code> nghĩa là gì? Đặt hằng có tên: <code>const RoleAdmin = 2</code> rồi viết <code>if user.Role == RoleAdmin</code>. Người đọc hiểu ngay không phải đi tra bảng mã vai trò.</details>

📝 **Tóm tắt mục 4.** Smell = dấu hiệu bề mặt của vấn đề sâu hơn (không phải bug). 7 smell hay gặp: long function, large class, duplicated code, magic number, deep nesting, long parameter list, dead code. Mỗi smell có cách khử chuẩn — nhận diện được là bước đầu để refactor.

---

## 5. Comment: khi nào nên, khi nào không

💡 **Trực giác.** Comment tốt giống chú thích bên lề một bản đồ — giải thích thứ bản thân bản đồ không nói được ("đường này hay tắc giờ tan tầm"). Comment tệ là viết lại y nguyên thứ đã thấy ("đây là một con đường") — thừa và mau lỗi thời. Quy tắc vàng: **comment giải thích *vì sao*, code tự nói *cái gì*.**

\`\`\`go
// ❌ Comment thừa: lặp lại y nguyên code
i++ // tăng i lên 1
total = price * qty // tính tổng bằng giá nhân số lượng

// ❌ Comment chữa cho tên dở — hãy sửa TÊN, đừng thêm comment
d := 30 // số ngày trước khi hết hạn

// ✅ Sửa bằng tên, bỏ comment
daysUntilExpiry := 30

// ✅ Comment "vì sao" — thông tin không nằm trong code
// Dùng timeout 3s vì API đối tác hay treo >2s vào giờ cao điểm (sự cố #1421).
client.Timeout = 3 * time.Second

// ✅ Cảnh báo hậu quả không hiển nhiên
// CHÚ Ý: thứ tự quan trọng — phải khóa mutex TRƯỚC khi đọc cache, tránh race.
\`\`\`

**Khi nào comment hữu ích:**
- Giải thích *quyết định* và *bối cảnh* (vì sao chọn cách này, vì sao có magic number nghiệp vụ này).
- Cảnh báo hậu quả (\`// gọi hàm này sẽ xóa dữ liệu vĩnh viễn\`).
- TODO/FIXME có ngữ cảnh (\`// TODO: bỏ workaround khi lib X vá bug #88\`).
- Doc-comment cho API công khai (godoc).

**Khi nào KHÔNG nên comment:**
- Lặp lại điều code đã nói rõ.
- Để chữa cho tên/cấu trúc dở → hãy sửa code.
- Comment-out code chết → xóa đi.

> ❓ **"Vậy comment càng ít càng tốt?"** Không hẳn — mục tiêu là *đúng loại* comment. Comment "vì sao" rất quý và nên có. Comment "cái gì" thì thường là dấu hiệu code chưa đủ rõ — sửa code thay vì thêm comment.

> ⚠ **Lỗi thường gặp.** Comment lỗi thời còn *tệ hơn không có*: code đã đổi nhưng comment vẫn nói cũ → đánh lừa người đọc. Code không nói dối, comment thì có thể. Vì vậy ưu tiên để *code tự giải thích*.

> 🔁 **Dừng lại tự kiểm tra.** Comment nào đáng giữ: (a) \`// loop qua danh sách user\`, (b) \`// retry tối đa 5 lần vì payment gateway thỉnh thoảng trả 503 tạm thời\`?
> <details><summary>Đáp án</summary>(b). Nó giải thích <i>vì sao</i> chọn con số 5 và bối cảnh nghiệp vụ (gateway trả 503) — thông tin không có trong code. (a) chỉ lặp lại điều vòng <code>for</code> đã nói rõ → thừa, nên xóa.</details>

📝 **Tóm tắt mục 5.** Comment tốt giải thích *vì sao* (quyết định, bối cảnh, cảnh báo), không lặp lại *cái gì*. Đừng dùng comment để chữa tên dở hay giữ code chết — sửa/xóa code. Comment lỗi thời tệ hơn không có.

---

## 6. Nguyên tắc boy-scout & nối tới refactoring

💡 **Trực giác.** Quy tắc của hướng đạo sinh (boy-scout rule): *"luôn rời khỏi khu cắm trại sạch hơn lúc bạn đến."* Áp vào code: mỗi lần *đi qua* một file để sửa gì đó, dọn dẹp một chút — đổi một tên dở, gom một đoạn trùng, thêm một guard clause. Không cần đại tu; chỉ tốt hơn một chút.

Vì sao nguyên tắc nhỏ này lại mạnh? Vì code mục đi **từng chút một** — không ai cố ý viết một class 2000 dòng, nó *tích tụ* từ những "thêm tí cho xong". Boy-scout rule chống lại sự tích tụ đó bằng những cải thiện nhỏ liên tục, **không cần xin một sprint riêng để "dọn code"** (thứ mà sếp hiếm khi duyệt).

\`\`\`
Không boy-scout:  sạch → +bẩn → +bẩn → +bẩn → ... → không cứu nổi → phải viết lại
Có boy-scout:     sạch → +bẩn,−bẩn → +bẩn,−bẩn → ... → giữ ổn định lâu dài
\`\`\`

Khi việc dọn dẹp lớn hơn "đi qua dọn tí" — ví dụ tách một class quá to, đổi cấu trúc nhiều file — đó là **refactoring** có chủ đích: cải thiện cấu trúc code *mà không đổi hành vi*. Cùng họ với việc trả **nợ kỹ thuật** (technical debt). Sẽ học kỹ ở [Lesson 05 — Refactoring & tech debt](../lesson-05-refactoring-tech-debt/).

> ❓ **"Dọn code lúc đang sửa bug có làm review khó hơn không (lẫn lộn 2 thứ)?"** Có rủi ro đó. Thực hành tốt: tách cleanup vào **commit riêng** với cùng PR, hoặc PR riêng nếu cleanup lớn — để reviewer phân biệt "sửa bug" và "dọn dẹp". Đừng trộn refactor lớn vào commit fix bug.

> ⚠ **Lỗi thường gặp.** Lấy boy-scout làm cớ để refactor *toàn bộ* file trong một PR fix bug nhỏ → PR phình to, khó review, dễ lọt lỗi. Boy-scout là *cải thiện nhỏ*, không phải đại tu trá hình.

> 🔁 **Dừng lại tự kiểm tra.** Bạn vào sửa một bug trong hàm 200 dòng và thấy một magic number \`0.1\` gần đó. Theo boy-scout rule nên làm gì?
> <details><summary>Đáp án</summary>Đặt nó thành hằng có tên (vd <code>const vatRate = 0.1</code>) — một cải thiện nhỏ, an toàn, ngay tại chỗ. Nhưng <i>không</i> ôm việc tách cả hàm 200 dòng trong PR fix bug này — việc lớn đó để một refactoring riêng.</details>

📝 **Tóm tắt mục 6.** Boy-scout rule = mỗi lần đi qua, để code sạch hơn một chút. Chống code mục tích tụ bằng cải thiện nhỏ liên tục. Việc dọn lớn hơn = refactoring có chủ đích (Lesson 05). Tách cleanup khỏi fix bug để review dễ.

---

## 7. Bài tập

1. Đặt lại tên cho 4 biến/hàm sau cho có ý nghĩa, giải thích lý do mỗi cái: \`n\` (số sản phẩm còn trong kho), \`flag\` (người dùng đã xác thực email chưa), \`func proc(x)\` (hàm chuẩn hóa chuỗi email về chữ thường), \`tmp\` (danh sách đơn hàng đã lọc hợp lệ).
2. Hàm dưới có những smell gì? Liệt kê và nêu cách khử:
   \`\`\`go
   func f(a int, b int, c int, d int, e int) int {
       r := 0
       if a > 0 {
           if b > 0 {
               r = a*b + 100
           }
       }
       return r
   }
   \`\`\`
3. Viết lại đoạn deep nesting sau bằng guard clause (early return):
   \`\`\`go
   func pay(o *Order) error {
       if o != nil {
           if o.Paid == false {
               if o.Total > 0 {
                   return charge(o)
               }
           }
       }
       return errCannotPay
   }
   \`\`\`
4. Đoạn nào *nên* có comment, đoạn nào *không*? Giải thích:
   (a) \`count++ // tăng count\`
   (b) \`// Sắp xếp giảm dần để item mới nhất hiện trước trên feed\`
   (c) \`price := base * 1.08 // nhân 1.08\`
5. Cho class \`OrderManager\` đang làm: validate đơn, tính giá, lưu DB, gửi email xác nhận, xuất PDF hóa đơn, ghi log audit. Đây là smell gì? Đề xuất cách tách (kể tên các thành phần mới).

## Lời giải chi tiết

**Bài 1.** Tên nên *tiết lộ ý định nghiệp vụ*:
- \`n\` → \`stockQuantity\` (hoặc \`unitsInStock\`). Lý do: nói rõ đếm cái gì; \`n\` buộc người đọc đi tìm ngữ cảnh.
- \`flag\` → \`isEmailVerified\`. Lý do: boolean nên là *câu hỏi* (\`is/has\`) và nói rõ cờ này về cái gì.
- \`func proc(x)\` → \`func normalizeEmail(email string) string\`. Lý do: hàm là *động từ* nói hành động; \`proc\` quá chung chung.
- \`tmp\` → \`validOrders\`. Lý do: \`tmp\` không tiết lộ gì; tên mới cho biết đây là đơn *đã lọc hợp lệ*.

**Bài 2.** Smell:
- **Long parameter list** (5 tham số cùng kiểu, không nhớ thứ tự) → gom struct, vd \`type Params struct{ A,B,C,D,E int }\` hoặc đặt tên có ý nghĩa nếu là một khái niệm chung.
- **Deep nesting** (\`if\` lồng \`if\`) → guard clause: \`if a <= 0 || b <= 0 { return 0 }\`.
- **Dead code / tham số thừa**: \`c\`, \`d\`, \`e\` không hề được dùng → xóa khỏi chữ ký hàm.
- **Magic number** \`100\` → đặt hằng có tên nếu mang ý nghĩa nghiệp vụ (vd \`const baseFee = 100\`).
- **Tên vô nghĩa** (\`f\`, \`a\`, \`b\`, \`r\`) → đặt tên theo ý nghĩa.
   Bản sạch:
   \`\`\`go
   const baseFee = 100
   func computeScore(width, height int) int {
       if width <= 0 || height <= 0 {
           return 0
       }
       return width*height + baseFee
   }
   \`\`\`

**Bài 3.** Guard clause loại trường hợp xấu sớm, đưa logic chính ra ngoài cùng:
\`\`\`go
func pay(o *Order) error {
    if o == nil || o.Paid || o.Total <= 0 {
        return errCannotPay
    }
    return charge(o)
}
\`\`\`
Lưu ý: gộp ba điều kiện loại trừ thành một guard. \`o.Paid == false\` viết gọn \`!o.Paid\` (hoặc giữ \`o.Paid\` trong nhánh loại). Logic chính \`charge(o)\` giờ ở cấp ngoài cùng, dễ đọc.

**Bài 4.**
- (a) **Không nên** — lặp lại y nguyên điều \`count++\` đã nói. Comment "cái gì". Xóa.
- (b) **Nên giữ** — giải thích *vì sao* sắp xếp giảm dần (để item mới nhất hiện trước). Đây là bối cảnh nghiệp vụ không có trong code. Comment "vì sao".
- (c) **Không nên như đang viết** — \`// nhân 1.08\` chỉ lặp lại phép tính. Nhưng *con số 1.08* là magic number cần giải thích. Sửa thành: đặt hằng \`const taxRate = 0.08\` và (nếu cần) comment "vì sao" — vd \`// Thuế bang California 8%\`. Tức là chuyển từ comment "cái gì" sang đặt tên + comment "vì sao".

**Bài 5.** Đây là **Large class** (God class) — một class ôm quá nhiều trách nhiệm không liên quan: nghiệp vụ (validate, tính giá), hạ tầng (lưu DB), giao tiếp (email), xuất bản (PDF), vận hành (audit log). Tách theo *trách nhiệm đơn*:
- \`OrderValidator\` — kiểm tra hợp lệ đơn.
- \`PriceCalculator\` — tính giá/thuế.
- \`OrderRepository\` — lưu/đọc DB.
- \`EmailNotifier\` — gửi email xác nhận.
- \`InvoicePDFGenerator\` — xuất PDF.
- \`AuditLogger\` — ghi log.
   \`OrderManager\` (hoặc một \`OrderService\` mỏng) chỉ còn *điều phối* các thành phần này theo đúng luồng, không tự làm chi tiết. Mỗi class giờ nhỏ, một việc, dễ test riêng. (Đây là tiền đề của Single Responsibility — sẽ học sâu ở [Lesson 02 — Nguyên lý thiết kế](../lesson-02-nguyen-ly-thiet-ke/).)

---

## 8. Code & Minh họa

- [visualization.html](./visualization.html) — 3 mô-đun tương tác: (1) **Code smell detector** — hiện một đoạn code, bấm vào dòng bạn nghĩ có smell để xem tên smell + cách sửa; (2) **Before/After toggle** — bật/tắt để thấy cùng đoạn code trước và sau khi đặt tên tốt + tách hàm; (3) **Quiz "tên nào tốt hơn"** — chọn tên rõ nghĩa hơn trong từng cặp, nhận giải thích.

## 9. Bài tiếp theo

- [Lesson 02 — Nguyên lý thiết kế](../lesson-02-nguyen-ly-thiet-ke/) — từ code sạch *trong* hàm tiến lên các nguyên lý thiết kế *giữa* các thành phần (SOLID, DRY, KISS, YAGNI).
- Liên quan: [Lesson 05 — Refactoring & tech debt](../lesson-05-refactoring-tech-debt/) — cách cải thiện cấu trúc code có hệ thống mà không đổi hành vi; nối tiếp nguyên tắc boy-scout ở mục 6.
`;
