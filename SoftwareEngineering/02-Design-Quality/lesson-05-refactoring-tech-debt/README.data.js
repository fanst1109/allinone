// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: SoftwareEngineering/02-Design-Quality/lesson-05-refactoring-tech-debt/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 05 — Refactoring & nợ kỹ thuật

## Mục tiêu

- Hiểu chính xác **refactoring** là gì: cải thiện *cấu trúc* code mà **không đổi hành vi** bên ngoài — và vì sao "không đổi hành vi" là ràng buộc cốt lõi.
- Thuộc lòng và áp dụng được các **phép refactor cơ bản**: Extract Function, Rename, Inline, Extract Variable, Replace Magic Number, Guard Clause — mỗi phép có ví dụ before/after.
- Nắm **quy trình refactor an toàn**: bước nhỏ, chạy test sau mỗi bước, commit thường xuyên.
- Hiểu ẩn dụ **nợ kỹ thuật** (technical debt): vì sao "vay nhanh" làm tốc độ phát triển chậm dần (trả "lãi"), và cách **phân loại** nợ.
- Biết **khi nào trả nợ, khi nào KHÔNG refactor** — đánh đổi với deadline.

## Kiến thức tiền đề

- [Lesson 01 — Clean Code & Code Smells](../lesson-01-clean-code-code-smells/) — **code smell là tín hiệu cần refactor**. Refactoring chính là hành động chữa các smell đã học ở đó (hàm quá dài, magic number, tên mơ hồ...).
- [Foundations · Lesson 05 — Code Review](../../01-Foundations/lesson-05-code-review/) — review là nơi smell bị phát hiện và nợ kỹ thuật được ghi nhận; refactor thường được đề xuất ngay trong review.
- Đã viết được hàm/biến cơ bản (bất kỳ ngôn ngữ nào; ví dụ ở đây dùng Go).

> 💡 **Vì sao refactor và nợ kỹ thuật học chung một bài?** Vì chúng là hai mặt của một đồng xu: **nợ kỹ thuật** là cái *tích lũy* khi ta để code mục đi; **refactoring** là cái *trả nợ* đó. Hiểu nợ mà không biết refactor thì chỉ biết lo; biết refactor mà không hiểu nợ thì không biết *khi nào* đáng làm.

---

## 1. Refactoring là gì — và "không đổi hành vi" nghĩa là gì

💡 **Trực giác.** Tưởng tượng một căn phòng đồ đạc bừa bộn nhưng *vẫn ở được*. Refactoring là dọn dẹp: kê lại bàn ghế, dán nhãn ngăn kéo, vứt rác — **căn phòng vẫn là căn phòng đó**, vẫn dùng được như cũ, chỉ là giờ tìm đồ nhanh hơn, ai vào cũng hiểu. Bạn **không** xây thêm phòng mới (đó là thêm tính năng), cũng **không** sửa cái cửa bị kẹt (đó là sửa lỗi).

**Định nghĩa (Martin Fowler).** Refactoring = thay đổi cấu trúc bên trong của code để **dễ hiểu hơn và rẻ hơn khi sửa**, mà **không thay đổi hành vi quan sát được từ bên ngoài**.

Ba việc khác nhau, đừng trộn:

| Hoạt động | Đổi hành vi bên ngoài? | Đổi cấu trúc bên trong? |
|-----------|:----------------------:|:------------------------:|
| **Refactoring** | ❌ Không | ✅ Có |
| **Thêm tính năng** | ✅ Có (thêm mới) | ✅ Có |
| **Sửa lỗi** | ✅ Có (sửa cái sai) | ✅ Có |

"Hành vi quan sát được" = với cùng input, hàm trả cùng output; cùng side-effect (ghi DB, gọi API) như trước. Người dùng/code gọi nó **không nhận ra gì khác**.

**Ví dụ before/after** — cùng input cho cùng output, chỉ cấu trúc đổi:

\`\`\`go
// BEFORE — đúng nhưng khó đọc
func price(q int, p float64) float64 {
    return q*p*(1-0.1) // 0.1 là cái gì??
}

// AFTER — hành vi y hệt, đọc hiểu ngay
const discountRate = 0.1
func price(quantity int, unitPrice float64) float64 {
    subtotal := float64(quantity) * unitPrice
    return subtotal * (1 - discountRate)
}
\`\`\`

Với \`q=10, p=5.0\`: cả hai trả \`45.0\`. Hành vi giống hệt — đây là refactor hợp lệ.

### 1.1 Vì sao PHẢI có test trước khi refactor

💡 **Trực giác.** Refactor là "phẫu thuật khi tỉnh": bạn động dao vào code đang chạy. Bộ **test** là máy đo nhịp tim — sau mỗi nhát dao, nó báo "bệnh nhân còn sống" (hành vi chưa đổi). Không có test = phẫu thuật bịt mắt: bạn *nghĩ* mình không đổi hành vi, nhưng không có gì xác nhận.

Vì ràng buộc cốt lõi của refactor là "không đổi hành vi", ta cần một cách *kiểm chứng* điều đó. Test tự động làm đúng việc này: chạy trước → xanh; refactor; chạy lại → vẫn xanh ⇒ hành vi được giữ. Cách xây bộ test này sẽ học kỹ ở [Lesson 06 — Chiến lược kiểm thử](../lesson-06-testing-strategy/).

> ⚠ **Lỗi thường gặp.** "Code đơn giản quá, không cần test, tôi nhìn là biết đúng." Refactor thủ công rất dễ trượt tay (đổi \`<\` thành \`<=\`, quên một nhánh \`else\`). Mắt người không bắt được mọi hồi quy (regression). Nếu chưa có test, **viết test trước** (gọi là "characterization test" — test chụp lại hành vi hiện tại) rồi mới refactor.

> ❓ **Câu hỏi tự nhiên.**
> - *"Refactor có làm chương trình chạy nhanh hơn không?"* — Không nhất thiết. Mục tiêu của refactor là *dễ đọc, dễ sửa*; tối ưu tốc độ là việc khác (và nên đo trước khi tối ưu). Đôi khi code rõ ràng lại chậm hơn chút — thường không đáng lo.
> - *"Đổi tên biến cũng tính là refactor à?"* — Có. Rename là một phép refactor (mục 2). Nó không đổi hành vi nhưng làm code dễ hiểu hơn nhiều.

> 🔁 **Dừng lại tự kiểm tra.** Một dev sửa hàm \`calcTax\` để nó trả về số tiền thuế *làm tròn đến đồng* thay vì để lẻ xu như trước. Đây có phải refactoring không?
> <details><summary>Đáp án</summary><b>Không</b>. Với cùng input, output đã <i>khác</i> (45.7 → 46). Hành vi quan sát được đã đổi ⇒ đây là <b>sửa logic / đổi tính năng</b>, không phải refactor. Nếu gọi nhầm là "refactor" thì test cũ sẽ đỏ và ta tưởng mình làm hỏng — thực ra là ta đã đổi hành vi.</details>

📝 **Tóm tắt mục 1.** Refactoring = cải thiện cấu trúc code **mà không đổi hành vi bên ngoài** (cùng input → cùng output & side-effect). Vì ràng buộc đó, **phải có test** để xác nhận hành vi không đổi sau mỗi thay đổi. Đừng lẫn refactor với sửa lỗi / thêm tính năng.

---

## 2. Các phép refactor cơ bản

💡 **Trực giác.** Giống như nấu ăn có vài "thao tác chuẩn" (thái hạt lựu, phi thơm, đảo đều), refactor có một bộ phép nhỏ, đặt tên rõ, ai cũng hiểu. Mỗi phép là một biến đổi *an toàn* và *đảo ngược được*. Dưới đây là 6 phép dùng nhiều nhất.

### 2.1 Extract Function (Tách hàm)

Lấy một đoạn code đang làm một việc rõ ràng, đưa ra thành hàm riêng có tên mô tả việc đó.

\`\`\`go
// BEFORE — một hàm làm quá nhiều việc
func printReceipt(order Order) {
    total := 0.0
    for _, it := range order.Items {
        total += it.Price * float64(it.Qty)
    }
    fmt.Printf("Tong: %.2f\\n", total)
    fmt.Printf("Khach: %s\\n", order.Customer)
}

// AFTER — tách phần tính tổng ra, tên nói rõ ý
func calcTotal(items []Item) float64 {
    total := 0.0
    for _, it := range items {
        total += it.Price * float64(it.Qty)
    }
    return total
}
func printReceipt(order Order) {
    fmt.Printf("Tong: %.2f\\n", calcTotal(order.Items))
    fmt.Printf("Khach: %s\\n", order.Customer)
}
\`\`\`

Lợi ích: \`calcTotal\` có thể test riêng, tái dùng, và \`printReceipt\` đọc như câu văn.

### 2.2 Rename (Đổi tên)

Đổi tên biến/hàm mơ hồ thành tên nói rõ ý nghĩa.

\`\`\`go
// BEFORE
func f(d int) int { return d * 86400 } // d là gì? 86400 là gì?

// AFTER
func daysToSeconds(days int) int {
    const secondsPerDay = 86400
    return days * secondsPerDay
}
\`\`\`

### 2.3 Inline (Nội tuyến — phép ngược của Extract)

Khi một hàm/biến trung gian *không* làm code rõ hơn (chỉ thêm một lớp vô ích), gỡ nó đi.

\`\`\`go
// BEFORE — biến trung gian thừa, không thêm ý nghĩa
func isAdult(age int) bool {
    result := age >= 18
    return result
}

// AFTER
func isAdult(age int) bool {
    return age >= 18
}
\`\`\`

> ⚠ Inline và Extract là hai chiều ngược nhau. Đừng tách quá đà thành chục hàm một dòng — đó là "over-engineering". Tách khi đoạn code *có một ý nghĩa độc lập đáng đặt tên*, inline khi lớp trung gian *che* ý nghĩa.

### 2.4 Extract Variable (Tách biến giải thích)

Đặt tên cho một biểu thức con phức tạp để nó tự giải thích.

\`\`\`go
// BEFORE — điều kiện dày đặc, khó đọc
if order.Total > 1000 && order.Customer.Years > 2 && !order.Customer.Banned {
    applyVIP(order)
}

// AFTER — mỗi điều kiện có tên
isBigOrder := order.Total > 1000
isLoyal := order.Customer.Years > 2
isActive := !order.Customer.Banned
if isBigOrder && isLoyal && isActive {
    applyVIP(order)
}
\`\`\`

### 2.5 Replace Magic Number (Thay số ma thuật bằng hằng số đặt tên)

"Magic number" = con số xuất hiện trần trụi trong code, không rõ ý nghĩa.

\`\`\`go
// BEFORE
if temp > 37.5 { alert() } // 37.5 là gì?

// AFTER
const feverThresholdC = 37.5 // ngưỡng sốt, độ C
if temp > feverThresholdC { alert() }
\`\`\`

Lợi ích kép: code tự giải thích, và khi ngưỡng đổi chỉ sửa **một chỗ**.

### 2.6 Guard Clause (Mệnh đề chặn — làm phẳng if lồng)

Thay vì lồng nhiều \`if\` sâu, *thoát sớm* các trường hợp biên ở đầu hàm.

\`\`\`go
// BEFORE — if lồng sâu, "mũi tên" (arrow anti-pattern)
func discount(c *Customer) float64 {
    if c != nil {
        if c.Active {
            if c.Years > 5 {
                return 0.2
            }
        }
    }
    return 0
}

// AFTER — guard clause, đường chính nằm phẳng ở cuối
func discount(c *Customer) float64 {
    if c == nil { return 0 }
    if !c.Active { return 0 }
    if c.Years <= 5 { return 0 }
    return 0.2
}
\`\`\`

> ❓ **"Nhiều \`return\` thế có xấu không?"** Với guard clause thì *không* — ngược lại, nó làm rõ "các trường hợp loại trừ" ngay đầu hàm, để logic chính không bị thụt sâu. Mỗi guard trả lời "vì sao thoát sớm".

> 🔁 **Dừng lại tự kiểm tra.** Bạn thấy đoạn \`if status == 3 { ... }\` lặp lại, \`3\` không rõ nghĩa. Nên dùng phép refactor nào?
> <details><summary>Đáp án</summary><b>Replace Magic Number</b>: đặt <code>const statusShipped = 3</code> rồi thay mọi <code>3</code> bằng <code>statusShipped</code>. Code tự giải thích và đổi giá trị chỉ sửa một nơi.</details>

📝 **Tóm tắt mục 2.** Bộ phép cơ bản: **Extract Function** (tách việc thành hàm), **Rename** (tên rõ nghĩa), **Inline** (gỡ lớp thừa), **Extract Variable** (đặt tên biểu thức), **Replace Magic Number** (số → hằng đặt tên), **Guard Clause** (thoát sớm, làm phẳng if). Mỗi phép nhỏ, an toàn, đảo ngược được — và **không đổi hành vi**.

---

## 3. Quy trình refactor an toàn

💡 **Trực giác.** Như leo núi có dây bảo hiểm: bạn không nhảy một bước dài, mà bước ngắn, mỗi bước **móc dây** (chạy test) trước khi bước tiếp. Nếu trượt, bạn chỉ rơi lại bước trước, không lăn xuống chân núi.

Quy trình chuẩn:

1. **Đảm bảo có test xanh** cho vùng code sắp sửa (nếu chưa có → viết characterization test trước).
2. **Một phép refactor nhỏ** (đúng một biến đổi ở mục 2).
3. **Chạy lại toàn bộ test.** Xanh ⇒ tiếp; đỏ ⇒ *hoàn tác ngay* bước vừa rồi (đừng cố "sửa cho xanh").
4. **Commit** (hoặc lưu một mốc) khi test xanh.
5. Lặp lại 2–4 cho tới khi code đủ sạch.

\`\`\`
[test xanh] → refactor nhỏ → [chạy test]
                   ↑              │
                   │   xanh? ─yes─┤→ commit → bước kế
                   │              │
                   └──── no ──────┘  (hoàn tác, thử cách khác)
\`\`\`

> ⚠ **Lỗi thường gặp.** "Refactor một phát cả file rồi mới chạy test." Khi test đỏ, bạn **không biết** bước nào gây hỏng vì đã đổi 20 chỗ. Bước càng to → debug càng đau. Nguyên tắc vàng: **mỗi lần một thay đổi nhỏ, test ngay**.

> ⚠ **Lỗi thường gặp #2.** Trộn refactor với thêm tính năng *trong cùng một commit*. Khi review/khi có bug, không ai phân biệt được "cấu trúc đổi" với "hành vi đổi". Tách hai loại commit riêng (Kent Beck gọi là "two hats" — đội mũ refactor *hoặc* mũ thêm tính năng, không cả hai cùng lúc).

> 🔁 **Dừng lại tự kiểm tra.** Sau một phép Extract Function, bạn chạy test thì 2 test đỏ. Nên làm gì?
> <details><summary>Đáp án</summary><b>Hoàn tác (revert) bước vừa rồi ngay</b>, trở về trạng thái test xanh, rồi xem lại phép tách. Đỏ nghĩa là bạn đã <i>vô tình đổi hành vi</i> (vd quên truyền tham số, sai phạm vi biến). Đừng "vá cho xanh" trên nền đang hỏng — dễ giấu lỗi sâu hơn.</details>

📝 **Tóm tắt mục 3.** Refactor an toàn = vòng lặp **bước nhỏ → chạy test → commit nếu xanh, hoàn tác nếu đỏ**. Không gộp nhiều phép trước khi test; không trộn refactor với thêm tính năng trong một commit.

---

## 4. Nợ kỹ thuật (technical debt) là gì

💡 **Trực giác — ẩn dụ vay nợ.** Ward Cunningham ví code "làm vội cho kịp" như **vay tiền**: bạn có ngay thứ mình cần (giao hàng đúng hẹn), nhưng từ đó về sau mỗi lần đụng vào code bẩn ấy bạn phải trả thêm thời gian — đó là **lãi**. Nếu không "trả gốc" (refactor), lãi cứ tích: tốc độ phát triển chậm dần, đến lúc mỗi thay đổi nhỏ cũng mất cả ngày.

**Định nghĩa.** *Nợ kỹ thuật* = chi phí ngầm trong tương lai mà ta gánh khi chọn một giải pháp **nhanh nhưng không sạch** thay vì một giải pháp **đúng nhưng tốn công hơn** ở hiện tại.

**Ví dụ số minh họa "lãi".** Một module có nợ kỹ thuật khiến mỗi tính năng mới mất thêm thời gian vì phải lách qua code rối:

| Tháng | Không trả nợ — thời gian/tính năng | Trả nợ (refactor) tháng 2 |
|:-----:|:----------------------------------:|:-------------------------:|
| 1 | 2 ngày | 2 ngày |
| 2 | 3 ngày | 2 ngày + **3 ngày refactor** = 5 ngày |
| 3 | 4 ngày | 2 ngày |
| 4 | 5 ngày | 2 ngày |
| 5 | 6 ngày | 2 ngày |
| **Tổng** | **20 ngày** | **13 ngày** |

Cột trái: "lãi" tăng đều (mỗi tháng thêm 1 ngày vì code ngày càng rối). Cột phải: bỏ 3 ngày "trả gốc" ở tháng 2, sau đó tốc độ ổn định ⇒ **tiết kiệm 7 ngày** sau 5 tháng. Đây chính là lý do để nợ tích lũy thì *càng để lâu càng đắt*.

> 💡 Lưu ý: lãi không phải lúc nào cũng tăng tuyến tính như bảng (toy example để dễ hình dung). Thực tế có khi tăng nhanh hơn (mỗi chỗ bẩn kéo thêm chỗ bẩn khác), có khi gần như không tăng nếu vùng code đó không ai đụng tới nữa.

### 4.1 Phân loại nợ kỹ thuật (ma trận Fowler)

Không phải nợ nào cũng xấu. Fowler chia theo hai trục: **cố ý / vô ý** và **thận trọng / liều lĩnh**.

| | **Thận trọng** (prudent) | **Liều lĩnh** (reckless) |
|---|---|---|
| **Cố ý** (deliberate) | "Phải ship tuần này, ghi nợ lại để dọn sau" — có kế hoạch trả | "Không có thời gian cho thiết kế" — vay mà không tính |
| **Vô ý** (inadvertent) | "Giờ mới biết lẽ ra nên thiết kế khác" — học được sau khi làm | "Layering là gì?" — không biết mình đang tạo nợ |

- **Cố ý + thận trọng**: nợ *tốt* — quyết định kinh doanh hợp lý, miễn là có ghi lại và có kế hoạch trả.
- **Liều lĩnh + vô ý**: nguy hiểm nhất — đội không biết mình đang đào hố cho chính mình.

> ❓ **Câu hỏi tự nhiên.**
> - *"Vậy mọi nợ kỹ thuật đều phải tránh à?"* — Không. Vay nợ *cố ý, thận trọng* để ra mắt sản phẩm sớm và kiểm chứng thị trường thường là quyết định đúng — *nếu* bạn ghi lại và trả sau. Cái phải tránh là nợ *liều lĩnh / vô ý*.
> - *"Nợ kỹ thuật khác bug chỗ nào?"* — Bug = code chạy *sai*. Nợ kỹ thuật = code chạy *đúng* nhưng *khó sửa/khó hiểu*. Code đầy nợ vẫn có thể không có bug nào — cho tới khi bạn phải đổi nó.

> 🔁 **Dừng lại tự kiểm tra.** Đội quyết định bỏ qua viết test cho một tính năng phụ vì deadline gấp, ghi lại trong backlog "thêm test cho module X" và lên lịch sprint sau. Đây là loại nợ nào?
> <details><summary>Đáp án</summary><b>Cố ý + thận trọng</b> (deliberate + prudent). Họ <i>biết</i> đang vay (cố ý), <i>có ghi lại và có kế hoạch trả</i> (thận trọng). Đây là loại nợ chấp nhận được. Nếu họ vay mà <i>không</i> ghi lại, không định trả thì thành <i>liều lĩnh</i>.</details>

📝 **Tóm tắt mục 4.** Nợ kỹ thuật = chi phí tương lai khi chọn giải pháp nhanh-mà-bẩn; "lãi" = tốc độ phát triển chậm dần. Không trả → tích lũy, càng để lâu càng đắt (ví dụ: 20 ngày vs 13 ngày). Phân loại theo trục cố-ý/vô-ý × thận-trọng/liều-lĩnh; nợ *cố ý + thận trọng* là chấp nhận được, *liều lĩnh + vô ý* là nguy hiểm.

---

## 5. Quản lý nợ kỹ thuật — khi nào trả, đánh đổi với deadline

💡 **Trực giác.** Như nợ tài chính: bạn không trả hết mọi khoản ngay, cũng không lờ mãi. Bạn ưu tiên trả khoản **lãi cao** (vùng code đụng vào thường xuyên) và có thể để khoản **lãi thấp** (code ổn định, ít sửa) trả sau hoặc không bao giờ.

Nguyên tắc quyết định *khi nào trả nợ*:

1. **Trả nợ ở nơi bạn đang làm** — quy tắc "Boy Scout": *để code sạch hơn lúc bạn đến*. Đang sửa module X thì dọn ngay phần bẩn cản trở, đừng mở chiến dịch refactor toàn hệ thống.
2. **Ưu tiên theo lãi suất × tần suất đụng.** Vùng code vừa bẩn vừa *hay phải sửa* = lãi cao nhất → trả trước. Vùng bẩn nhưng *không ai đụng* = lãi gần 0 → kệ.
3. **Đừng để nợ vượt "ngưỡng phá sản".** Khi mỗi tính năng nhỏ cũng mất hàng tuần, đội mất khả năng giao hàng — phải dừng lại trả nợ tập trung.

**Đánh đổi với deadline.** Đây là nối tiếp [đường cong chi phí sửa lỗi ở Foundations Lesson 01](../../01-Foundations/lesson-01-sdlc-engineer-role/): cũng giống lỗi bắt muộn đắt hơn bắt sớm, **nợ trả muộn đắt hơn trả sớm**. Ship sớm bằng cách vay nợ *cố ý + thận trọng* có thể đúng về kinh doanh — nhưng phải ghi nợ vào backlog và lên lịch trả, nếu không "lãi" sẽ ăn mòn mọi tốc độ tương lai.

> ⚠ **Lỗi thường gặp.** "Tuần sau rảnh tôi sẽ refactor cả hệ thống." *Big-bang refactor* (dừng mọi tính năng để dọn dẹp lớn) hiếm khi được duyệt và rủi ro cao (đổi quá nhiều, dễ vỡ). Cách bền vững là **trả dần, liên tục, ngay trong luồng công việc** (mục 1, Boy Scout rule).

> ❓ **"Làm sao thuyết phục sếp/PO cho thời gian trả nợ?"** Dùng ngôn ngữ kinh doanh, không nói "code xấu". Nói: *"module này khiến mỗi tính năng chậm thêm ~1 ngày/tháng; bỏ 3 ngày refactor giờ sẽ tiết kiệm ~7 ngày trong 5 tháng tới"* (như bảng mục 4). Lượng hóa lãi → đánh đổi rõ ràng.

> 🔁 **Dừng lại tự kiểm tra.** Có hai vùng code đều bẩn: vùng A là engine thanh toán sửa gần như mỗi sprint; vùng B là script di trú dữ liệu chạy một lần năm ngoái, sẽ không bao giờ chạy lại. Nên refactor vùng nào trước?
> <details><summary>Đáp án</summary><b>Vùng A</b>. Lãi = mức bẩn × tần suất đụng. A hay sửa ⇒ lãi cao, trả nợ ở đây tiết kiệm nhiều nhất. B không ai đụng nữa ⇒ lãi ~0, refactor nó là lãng phí công sức (dù code xấu). "Code xấu" một mình không phải lý do refactor — phải có ai đó <i>phải đọc/sửa</i> nó.</details>

📝 **Tóm tắt mục 5.** Quản lý nợ = trả *dần* và *có chọn lọc*: ưu tiên vùng lãi cao (bẩn × hay-sửa), dọn ngay nơi đang làm (Boy Scout rule), tránh big-bang refactor. Đánh đổi với deadline: vay *cố ý + thận trọng* và ghi backlog là chấp nhận được; trả muộn đắt hơn trả sớm (cùng quy luật đường cong chi phí).

---

## 6. Khi nào KHÔNG refactor

💡 **Trực giác.** Không phải code xấu nào cũng đáng dọn. Một góc kho chứa đồ bụi bặm nhưng đã niêm phong, không ai vào — dọn nó là phí công.

Các trường hợp nên **dừng tay**:

- **Code sắp bị xóa / thay thế.** Sắp viết lại module thì refactor nó là vứt công.
- **Code ổn định, không ai đụng.** Lãi ~0 (mục 5) — để yên.
- **Chưa có test và không kịp viết test, lại đang sửa khẩn cấp production.** Refactor lúc này rủi ro cao; ưu tiên dập lửa trước, ghi nợ lại để dọn sau khi có test.
- **Bạn không *hiểu* code đủ rõ.** Refactor code mình chưa nắm dễ vô tình đổi hành vi. Hiểu trước (đọc, viết characterization test) đã, rồi mới dọn.
- **Sát deadline cứng và refactor không cần cho tính năng đang làm.** Đội mũ "thêm tính năng" cho xong việc; ghi nợ, đội mũ "refactor" sau.

> ⚠ Đừng dùng các lý do này làm cái cớ *không bao giờ* refactor. Chúng là ngoại lệ có điều kiện, không phải giấy phép để code mục mãi.

📝 **Tóm tắt mục 6.** KHÔNG refactor khi: code sắp xóa, code ổn định không ai đụng, đang dập lửa production mà chưa có test, chưa hiểu code, hoặc sát deadline cứng (ghi nợ rồi dọn sau). Đây là ngoại lệ có điều kiện — không phải cái cớ để lười dọn mãi.

---

## 7. Bài tập

1. **Phân loại hoạt động.** Với mỗi việc sau, cho biết là *refactoring*, *sửa lỗi*, hay *thêm tính năng*: (a) đổi tên biến \`x\` thành \`totalPrice\`; (b) sửa hàm trả \`-1\` thành trả \`0\` khi không tìm thấy; (c) thêm nút "Xuất PDF"; (d) tách 50 dòng trong \`main\` thành 3 hàm con; (e) đổi công thức tính thuế từ 8% sang 10%.

2. **Áp phép refactor.** Đoạn code sau có những smell gì, và mỗi smell dùng phép refactor nào?
   \`\`\`go
   func p(o Order) {
       if o.t > 100 {
           if o.vip {
               fmt.Println(o.t * 0.9)
           }
       }
   }
   \`\`\`

3. **Refactor Guard Clause.** Viết lại hàm sau bằng guard clause (giữ nguyên hành vi):
   \`\`\`go
   func canVote(p *Person) bool {
       if p != nil {
           if p.Age >= 18 {
               if p.Citizen {
                   return true
               }
           }
       }
       return false
   }
   \`\`\`

4. **Tính "lãi" nợ kỹ thuật.** Module Y khiến mỗi tính năng mất thêm 1 ngày so với chuẩn, và đội làm 2 tính năng/tháng trên module đó. Một refactor tốn 4 ngày sẽ xóa hoàn toàn phần "thêm 1 ngày" này. Sau bao nhiêu tháng thì việc refactor *hòa vốn*? Sau 6 tháng tiết kiệm được bao nhiêu ngày?

5. **Phân loại nợ.** Với mỗi tình huống, xác định ô trong ma trận Fowler (cố-ý/vô-ý × thận-trọng/liều-lĩnh): (a) "Deadline gấp, hardcode tạm cái này, tôi tạo ticket dọn sprint sau"; (b) đội junior copy-paste khắp nơi vì chưa biết về hàm dùng chung; (c) "Kệ thiết kế, cứ code cho xong, không có thời gian"; (d) sau 6 tháng đội nhận ra cấu trúc dữ liệu chọn ban đầu không hợp, lẽ ra nên dùng map.

6. **Quyết định refactor.** Bạn có 2 ngày trống. Có 3 vùng code bẩn: (A) engine giá — sửa mỗi sprint, chưa có test; (B) trang "Giới thiệu" tĩnh — không đổi 1 năm nay; (C) module legacy sắp bị thay bằng hệ thống mới quý tới. Nên dùng 2 ngày đó thế nào? Giải thích theo nguyên tắc mục 5–6.

## Lời giải chi tiết

**Bài 1.**
- (a) **Refactoring** — Rename, không đổi hành vi.
- (b) **Sửa lỗi** — output đổi (-1 → 0), hành vi quan sát được thay đổi.
- (c) **Thêm tính năng** — thêm hành vi mới.
- (d) **Refactoring** — Extract Function, cùng input → cùng output.
- (e) **Thêm tính năng / đổi yêu cầu** — kết quả tính thuế đổi ⇒ hành vi đổi, không phải refactor.

Mấu chốt: hỏi "*với cùng input, output/side-effect có đổi không?*" Đổi ⇒ không phải refactor.

**Bài 2.** Các smell và phép chữa:
- **Tên mơ hồ** \`p\`, \`o\`, \`o.t\` → **Rename** thành \`printDiscountedTotal\`, \`order\`, \`order.Total\`.
- **Magic number** \`100\` và \`0.9\` → **Replace Magic Number**: \`const vipThreshold = 100\`, \`const vipDiscount = 0.1\` (rồi \`* (1 - vipDiscount)\`).
- **If lồng sâu** → **Guard Clause**.

   Sau refactor (hành vi giữ nguyên):
   \`\`\`go
   const vipThreshold = 100
   const vipDiscount = 0.1
   func printDiscountedTotal(order Order) {
       if order.Total <= vipThreshold { return }
       if !order.vip { return }
       fmt.Println(order.Total * (1 - vipDiscount))
   }
   \`\`\`

**Bài 3.** Áp guard clause — đảo điều kiện và thoát sớm:
\`\`\`go
func canVote(p *Person) bool {
    if p == nil { return false }
    if p.Age < 18 { return false }
    if !p.Citizen { return false }
    return true
}
\`\`\`
Kiểm chứng tương đương: \`canVote\` chỉ trả \`true\` khi \`p != nil && p.Age >= 18 && p.Citizen\` — y hệt bản gốc. Với \`p=nil\` → \`false\`; \`Age=17\` → \`false\`; đủ điều kiện → \`true\`. Hành vi giữ nguyên, độ sâu lồng giảm từ 3 xuống 0.

**Bài 4.** "Lãi" mỗi tháng = 1 ngày/tính năng × 2 tính năng = **2 ngày/tháng**. Refactor tốn 4 ngày.
- **Hòa vốn**: 4 ngày ÷ 2 ngày/tháng = **2 tháng**. Sau 2 tháng, số ngày tiết kiệm bằng đúng chi phí refactor.
- **Sau 6 tháng**: nếu *không* refactor, tốn 2 × 6 = 12 ngày lãi. Nếu refactor: tốn 4 ngày (refactor) + 0 ngày lãi = 4 ngày. Tiết kiệm = 12 − 4 = **8 ngày**.

**Bài 5.** Theo ma trận Fowler:
- (a) **Cố ý + thận trọng** — biết đang vay, có ghi ticket & lịch trả.
- (b) **Vô ý + liều lĩnh** — không biết mình đang tạo nợ (chưa biết DRY/hàm dùng chung).
- (c) **Cố ý + liều lĩnh** — biết bỏ thiết kế nhưng không có kế hoạch trả, vay bừa.
- (d) **Vô ý + thận trọng** — không thể biết trước, là cái học được sau khi làm; đội có năng lực nhận ra và sửa.

**Bài 6.** Dùng 2 ngày cho **vùng A (engine giá)**, và *trước hết viết test cho A*. Lý do:
- A có **lãi cao nhất**: bẩn × sửa-mỗi-sprint (mục 5, ưu tiên lãi × tần suất). Trả nợ ở đây tiết kiệm nhiều nhất.
- A **chưa có test** → bước đầu là viết characterization test (mục 1.1), rồi refactor an toàn theo vòng lặp bước-nhỏ (mục 3).
- **Không** đụng B: code tĩnh, 1 năm không đổi ⇒ lãi ~0, refactor là phí công (mục 6).
- **Không** đụng C: sắp bị thay quý tới ⇒ refactor code sắp xóa là vứt công (mục 6).

---

## 8. Code & Minh họa

- [visualization.html](./visualization.html) — 3 mô-đun tương tác:
  1. **Refactor từng bước**: bắt đầu từ một hàm xấu, bấm lần lượt áp các phép refactor (Replace Magic Number, Guard Clause, Extract Function, Rename) → thấy code sạch dần, **dải test luôn xanh** sau mỗi bước.
  2. **Lãi nợ kỹ thuật**: kéo slider thời gian (tháng) và bật/tắt "trả nợ" → biểu đồ SVG so sánh tốc độ phát triển (ngày/tính năng) khi để nợ tích lũy vs khi refactor sớm.
  3. **Nhận diện phép refactor**: cho một đoạn code có smell, chọn phép refactor phù hợp, nhận phản hồi đúng/sai.

## 9. Bài tiếp theo

- [Lesson 06 — Chiến lược kiểm thử](../lesson-06-testing-strategy/) — xây dựng bộ test (đơn vị, tích hợp...) làm "lưới an toàn" cho refactor: chính bộ test này là thứ xác nhận "hành vi không đổi" ở mục 1.1.
- Ôn lại: [Lesson 01 — Clean Code & Code Smells](../lesson-01-clean-code-code-smells/) — các smell là *tín hiệu* refactor; bài này là *hành động* chữa chúng.
`;
