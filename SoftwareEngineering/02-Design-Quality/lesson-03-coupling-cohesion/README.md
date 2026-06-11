# Lesson 03 — Coupling & cohesion (khớp nối & gắn kết)

## Mục tiêu

- Hiểu **mô-đun** (module) là gì và vì sao mọi hệ thống tốt đều được chia thành các mô-đun có ranh giới rõ ràng.
- Định nghĩa và phân biệt **coupling** (khớp nối — mức phụ thuộc *giữa* các mô-đun) với **cohesion** (gắn kết — mức các phần *bên trong* một mô-đun thuộc về nhau).
- Nắm **thang coupling** từ chặt tới lỏng (content → common → control → stamp → data) và **thang cohesion** từ tệ tới tốt (coincidental → functional), kèm ví dụ code cụ thể.
- Hiểu vì sao mục tiêu thiết kế là **"low coupling, high cohesion"** (khớp nối lỏng, gắn kết cao) — và mối liên hệ với SOLID.
- Biết các kỹ thuật giảm coupling thực chiến: **interface**, **dependency injection** (tiêm phụ thuộc), **event** — qua ví dụ before/after.
- Biết cách *đo* khớp nối thô bằng **fan-in / fan-out**.

## Kiến thức tiền đề

- Đã học [Lesson 02 — Nguyên lý thiết kế (SOLID)](../lesson-02-design-principles/) — đặc biệt **Single Responsibility** và **Dependency Inversion**. Bài này là góc nhìn "đo lường" cho chính những nguyên lý đó: SRP đẩy cohesion lên, DIP kéo coupling xuống.
- Đã quen [Lesson 01 — Clean Code & code smells](../lesson-01-clean-code-code-smells/) (các "mùi" code thường bắt nguồn từ coupling chặt / cohesion thấp).
- Biết đọc code Go cơ bản (struct, interface, method).

> 💡 **Vì sao tách thành một bài riêng, không gộp vào SOLID?** SOLID là *năm nguyên lý* (cách viết). Coupling & cohesion là *hai thước đo* (cách đánh giá): cho ta một thang điểm để nói "thiết kế này tốt/tệ ở đâu" mà không cần thuộc lòng nguyên lý nào. Hai khái niệm này có từ thập niên 1970 (Larry Constantine) — cũ hơn SOLID nhưng vẫn là *nền tảng* của mọi nguyên lý thiết kế sau này.

---

## 1. Trực giác: hệ thống = các hộp + dây nối

💡 **Trực giác.** Hình dung phần mềm như một bảng mạch điện tử: mỗi **hộp** (mô-đun: package, class, hàm, service) làm một việc; các **dây nối** (dependency: hộp A gọi hộp B, dùng dữ liệu của B...) liên kết chúng. Hai câu hỏi cốt lõi của thiết kế:

- **Coupling** — *giữa* các hộp có bao nhiêu dây, và dây "to" cỡ nào? (ít dây, dây "mảnh" = tốt)
- **Cohesion** — *bên trong* một hộp, các linh kiện có thực sự thuộc về nhau không, hay nhét bừa? (thuộc về nhau = tốt)

Mục tiêu vàng của thiết kế mô-đun:

> **Low coupling, high cohesion** — ít dây nối giữa các hộp, mỗi hộp gắn kết chặt bên trong.

💡 **Vì sao cặp đôi này quan trọng?** Vì nó quyết định **chi phí thay đổi**. Khi sửa một hộp:
- **Coupling thấp** → ít dây ra ngoài → sửa hộp này ít làm hỏng hộp khác (đổi cục bộ, không lan).
- **Cohesion cao** → mọi thứ liên quan nằm gọn một chỗ → biết *đi đâu* để sửa, không phải lục 5 file.

Ví dụ cụ thể: một hệ `Đặt hàng` chia thành 3 mô-đun gắn kết cao, nối với nhau bằng dây "mảnh":

```
[ GiỏHàng ] --(addItem, total)--> [ ĐơnHàng ] --(charge)--> [ ThanhToán ]
```

Đổi cổng thanh toán (Stripe → VNPay) chỉ động vào hộp `ThanhToán`; `GiỏHàng` và `ĐơnHàng` không biết và không cần biết. Đó là low coupling đang "trả công".

> ⚠ **Lỗi thường gặp.** Nghĩ "ít file = đơn giản = tốt". Không. Một file `utils.go` 3000 dòng chứa đủ thứ (parse ngày, gọi DB, format tiền, gửi mail) là **cohesion cực thấp** dù chỉ một file. Đơn giản thật sự là *mỗi hộp một việc rõ ràng*, không phải *gộp tất cả vào một hộp*.

> 🔁 **Dừng lại tự kiểm tra.** Một hàm `processOrder()` vừa kiểm tra tồn kho, vừa tính giá, vừa ghi log ra file, vừa gửi email xác nhận. Hàm này cohesion cao hay thấp? Vì sao?
> <details><summary>Đáp án</summary>Cohesion <b>thấp</b>. Nó trộn bốn trách nhiệm không cùng "lý do thay đổi": logic nghiệp vụ (tồn kho, giá), hạ tầng (ghi log), và giao tiếp (email). Đổi format email lẽ ra không nên đụng vào hàm xử lý đơn. Tách thành các mô-đun riêng → cohesion cao hơn, đúng tinh thần Single Responsibility.</details>

📝 **Tóm tắt mục 1.** Hệ thống = hộp (mô-đun) + dây (dependency). Mục tiêu: **low coupling** (ít dây nối giữa hộp) + **high cohesion** (mỗi hộp gắn kết chặt). Cả hai cùng giảm **chi phí thay đổi**.

---

## 2. Coupling (khớp nối) — mức phụ thuộc giữa các mô-đun

💡 **Trực giác.** Coupling là độ "dính" giữa hai mô-đun: nếu sửa A mà *buộc* phải sửa B, thì A và B coupling chặt. Hình dung hai toa tàu: nối bằng móc xích lỏng (mỗi toa tự đi đường vòng được) khác hẳn hàn cứng dính nhau (động một toa là cả khối rung).

**Định nghĩa.** *Coupling* là mức độ một mô-đun **biết về** và **phụ thuộc vào** chi tiết bên trong của mô-đun khác. Càng phụ thuộc vào *chi tiết nội bộ* (thay vì một giao kèo ổn định) thì càng chặt.

### Thang coupling — từ CHẶT (xấu) tới LỎNG (tốt)

| Loại | Mức | A phụ thuộc vào gì của B | Ví dụ |
|------|-----|--------------------------|-------|
| **Content** | Chặt nhất ❌ | Sửa thẳng dữ liệu/nội bộ của B | A ghi đè biến private của B, "thò tay" vào ruột B |
| **Common** | Rất chặt | Cùng chia sẻ trạng thái global | A và B cùng đọc/ghi một biến global `currentUser` |
| **Control** | Chặt | A truyền "cờ điều khiển" bảo B *cách* chạy | `render(data, mode=2)` — A phải biết `mode=2` nghĩa gì trong B |
| **Stamp** | Vừa | A truyền cả struct lớn dù B chỉ cần 1 field | `sendMail(user)` nhưng `sendMail` chỉ dùng `user.Email` |
| **Data** | Lỏng nhất ✅ | A chỉ truyền đúng dữ liệu B cần qua tham số | `sendMail(email string)` — giao kèo tối thiểu, rõ ràng |

**Ví dụ số/code cụ thể cho từng loại.**

**(a) Content coupling** (tệ nhất):
```go
// A thò tay sửa thẳng field nội bộ của B → cực kỳ giòn
b := &Counter{}
b.internalValue = 42        // ❌ truy cập "ruột" của B
b.buffer[3] = 'x'           // ❌ phụ thuộc cấu trúc bộ nhớ của B
```
Đổi tên `internalValue` hoặc đổi `buffer` thành slice khác → A vỡ ngay. A và B dính như keo.

**(b) Common coupling** (global dùng chung):
```go
var CurrentUser *User   // biến global

func login(u *User)  { CurrentUser = u }       // module Auth ghi
func chargeOrder()   { bill(CurrentUser.ID) }  // module Billing đọc
```
Bất kỳ ai sửa `CurrentUser` ở đâu cũng ảnh hưởng tất cả. Khó test (phải set global trước), khó chạy song song.

**(c) Control coupling** (truyền cờ điều khiển):
```go
// A phải BIẾT mode=2 nghĩa là gì bên trong report() → coupling vào logic nội bộ B
report(data, 2)   // 2 = "xuất PDF"? ai nhớ nổi
```
Tốt hơn: tách hàm rõ nghĩa `reportPDF(data)`, `reportCSV(data)` — A không cần biết "cờ" của B.

**(d) Stamp coupling** (truyền dư dữ liệu):
```go
func sendWelcome(u User) {   // nhận cả User (20 field)
    smtp.Send(u.Email, "Welcome")   // nhưng chỉ dùng Email
}
```
Hàm "bị buộc" biết về cả struct `User`. Đổi `User` → có thể phải đụng `sendWelcome`. Sửa: `sendWelcome(email string)`.

**(e) Data coupling** (lỏng nhất, mục tiêu):
```go
func sendWelcome(email string) {   // chỉ nhận đúng thứ cần
    smtp.Send(email, "Welcome")
}
```
Giao kèo tối thiểu: A đưa B đúng dữ liệu B cần, không hơn. Đổi struct `User` không ảnh hưởng `sendWelcome`.

> ❓ **Câu hỏi tự nhiên của người đọc.**
> - *"Vậy coupling = xấu, phải loại bỏ hết?"* — Không. **Không có coupling = không có hệ thống** (các hộp phải nối nhau mới làm việc được). Mục tiêu là *giảm xuống loại lỏng nhất đủ dùng* (data coupling), không phải về 0.
> - *"Stamp coupling có gì sai, truyền cả object cho tiện mà?"* — Tiện lúc viết, đắt lúc đổi: hàm "biết" về struct lớn nên ràng buộc lan rộng, và khó test (phải dựng cả `User` đầy đủ chỉ để test gửi mail).
> - *"Làm sao biết mình đang ở loại nào?"* — Hỏi: "Nếu B đổi *chi tiết nội bộ*, A có phải đổi không?" Phải đổi nhiều → chặt; không đổi → lỏng.

> ⚠ **Lỗi thường gặp.** Lẫn **control coupling** với data: truyền một boolean `silent=true` nghe như "data", nhưng nếu B *rẽ nhánh hành vi* theo nó thì đó là **control coupling** — A đang điều khiển luồng bên trong B. Dấu hiệu: tham số tên `mode`, `flag`, `type`, `isXxx` mà bên trong B có `if param == ...`.

> 🔁 **Dừng lại tự kiểm tra.** `applyDiscount(order, true)` với `true` nghĩa là "khách VIP". Đây là coupling loại gì, và sửa thế nào?
> <details><summary>Đáp án</summary><b>Control coupling</b> — `true` là cờ điều khiển, người gọi phải nhớ "true = VIP" và `applyDiscount` rẽ nhánh theo nó. Sửa: hoặc tách hàm rõ nghĩa (<code>applyVipDiscount(order)</code>), hoặc truyền dữ liệu thay vì cờ (<code>applyDiscount(order, rate float64)</code> — người gọi quyết định rate, B chỉ áp dụng → thành data coupling).</details>

📝 **Tóm tắt mục 2.** Coupling = mức A phụ thuộc chi tiết nội bộ của B. Thang từ chặt→lỏng: **content > common > control > stamp > data**. Mục tiêu: hạ về **data coupling** (giao kèo tối thiểu qua tham số rõ ràng). Coupling chặt làm thay đổi lan rộng và khó test.

---

## 3. Cohesion (gắn kết) — mức các phần trong một mô-đun thuộc về nhau

💡 **Trực giác.** Cohesion trả lời: "Những thứ trong một hộp có thực sự *cùng một nhiệm vụ* không?" Hình dung ngăn kéo nhà bếp: một ngăn chỉ đựng dao-thớt (cohesion cao — đều là "đồ cắt thái") khác hẳn một ngăn "linh tinh" đựng dao, pin, hóa đơn, dây sạc (cohesion thấp — chẳng liên quan gì nhau).

**Định nghĩa.** *Cohesion* là mức độ các thành phần (hàm, field, dòng code) bên trong **một** mô-đun cùng phục vụ **một mục đích rõ ràng**. Cohesion cao = mô-đun làm *một việc* và làm trọn vẹn.

### Thang cohesion — từ TỆ (thấp) tới TỐT (cao)

| Mức | Loại | Các phần nhóm với nhau vì... | Ví dụ |
|-----|------|------------------------------|-------|
| Tệ ❌ | **Coincidental** (ngẫu nhiên) | ...chẳng vì lý do gì | `utils.go`: parse ngày + gọi DB + format tiền |
| | **Logical** (luận lý) | ...cùng "loại" nhưng việc khác nhau | `IO.handle(type)` gộp đọc file + đọc mạng + đọc bàn phím |
| | **Temporal** (thời điểm) | ...chạy cùng *lúc* | `init()` khởi tạo log + mở DB + đọc config (chỉ chung "lúc khởi động") |
| | **Procedural** (thủ tục) | ...chạy theo cùng *trình tự* | "bước 1, bước 2, bước 3" nhưng dữ liệu chẳng liên quan |
| | **Communicational** (giao tiếp) | ...cùng thao tác trên *một dữ liệu* | nhóm hàm cùng đọc/ghi một record đơn hàng |
| Tốt ✅ | **Functional** (chức năng) | ...cùng góp vào *đúng một nhiệm vụ* | `module TaxCalculator` chỉ tính thuế, mọi hàm phục vụ việc đó |

**Ví dụ code: từ cohesion thấp lên cao.**

Cohesion **thấp** (coincidental) — một struct ôm đủ thứ không liên quan:
```go
type Helper struct{}

func (Helper) ParseDate(s string) time.Time { /* ... */ }
func (Helper) SaveUserToDB(u User)          { /* ... */ }
func (Helper) FormatMoney(c int) string     { /* ... */ }
func (Helper) SendSMS(phone, msg string)    { /* ... */ }
// 4 trách nhiệm chẳng dính dáng → "ngăn kéo linh tinh"
```

Cohesion **cao** (functional) — tách theo nhiệm vụ:
```go
type DateParser struct{}     // chỉ lo ngày tháng
func (DateParser) Parse(s string) (time.Time, error) { /* ... */ }
func (DateParser) Format(t time.Time) string         { /* ... */ }

type Money struct{}          // chỉ lo tiền tệ
func (Money) Format(cents int) string                { /* ... */ }
func (Money) Add(a, b int) int                       { /* ... */ }
// Mỗi hộp một nhiệm vụ → biết đi đâu để sửa, dễ test, dễ tái dùng
```

> ❓ **Câu hỏi tự nhiên của người đọc.**
> - *"Functional và communicational khác nhau ở đâu?"* — Communicational: các hàm chung *một dữ liệu* nhưng có thể làm việc khác nhau trên đó. Functional: các hàm chung *một nhiệm vụ trừu tượng* (vd "tính thuế") — đây là mức cao nhất ta nhắm tới.
> - *"Temporal cohesion (gom theo lúc chạy) có gì sai? `init()` gom hết cho gọn mà."* — Sai ở chỗ "chạy cùng lúc" không phải "thuộc về nhau". Khi cần đổi cách mở DB, bạn phải lội vào `init()` chung với log & config — dễ vỡ chéo. Tách ra mỗi việc một chỗ.
> - *"Cohesion cao nghĩa là chia càng nhỏ càng tốt?"* — Không. Chia *quá* nhỏ (mỗi hàm một file vô nghĩa) làm tăng *coupling* (nhiều dây nối hơn). Cohesion cao là **một nhiệm vụ trọn vẹn một chỗ** — không to quá, không vụn quá.

> ⚠ **Lỗi thường gặp.** Đặt tên hộp kiểu `Manager`, `Util`, `Helper`, `Common`, `Misc` thường là dấu hiệu cohesion thấp: tên mơ hồ vì *bên trong cũng mơ hồ*. Nếu phải dùng chữ "and" để mô tả một mô-đun ("nó xử lý đơn hàng *and* gửi mail *and* ghi log") → cohesion đang thấp.

> 🔁 **Dừng lại tự kiểm tra.** Một package `account` có các hàm: `Login`, `Logout`, `ResetPassword`, `ExportSalesReportToExcel`. Hàm nào phá cohesion?
> <details><summary>Đáp án</summary><code>ExportSalesReportToExcel</code>. Ba hàm đầu cùng nhiệm vụ "quản lý phiên đăng nhập" (functional cohesion). Hàm xuất báo cáo bán hàng thuộc nhiệm vụ khác hẳn → nên nằm ở package <code>report</code>. Để nó ở đây kéo cohesion của <code>account</code> xuống và tạo coupling thừa (account phải biết về Excel).</details>

📝 **Tóm tắt mục 3.** Cohesion = mức các phần trong một mô-đun thuộc về *cùng một nhiệm vụ*. Thang từ thấp→cao: **coincidental → logical → temporal → procedural → communicational → functional**. Nhắm tới **functional cohesion**. Tên mơ hồ (`Util`, `Manager`) và chữ "and" trong mô tả là cờ đỏ.

---

## 4. Quan hệ với SOLID

💡 **Trực giác.** Coupling & cohesion là *thước đo*; SOLID là *cách đạt được số đo tốt*. Hai nguyên lý SOLID gắn trực tiếp với cặp đôi này.

### 4.1 Single Responsibility ↔ Cohesion

**Single Responsibility Principle (SRP)** — "một class chỉ có một lý do để thay đổi" — chính là **cách nâng cohesion**. Mỗi mô-đun một trách nhiệm → các phần bên trong cùng phục vụ trách nhiệm đó → functional cohesion.

```go
// Vi phạm SRP → cohesion thấp: 2 lý do thay đổi (định dạng báo cáo & cách lưu)
type Report struct{}
func (Report) Format() string { /* đổi khi yêu cầu trình bày đổi */ }
func (Report) SaveToDisk()    { /* đổi khi cách lưu trữ đổi */ }

// Tuân SRP → cohesion cao: mỗi hộp một lý do thay đổi
type ReportFormatter struct{}
func (ReportFormatter) Format() string { /* chỉ định dạng */ }
type ReportStore struct{}
func (ReportStore) Save(r string) { /* chỉ lưu trữ */ }
```

### 4.2 Dependency Inversion ↔ Coupling

**Dependency Inversion Principle (DIP)** — "phụ thuộc vào abstraction, không vào concrete" — chính là **cách hạ coupling**. Thay vì A phụ thuộc *chi tiết* của B (coupling chặt), A phụ thuộc một **interface** (giao kèo ổn định) — đổi B không đụng A. (Đã học ở [Lesson 02 §DIP](../lesson-02-design-principles/).)

```go
// Coupling chặt: OrderService dán cứng vào StripeClient cụ thể
type OrderService struct { stripe *StripeClient }   // đổi cổng → sửa ở đây

// DIP → coupling lỏng: phụ thuộc interface, không phụ thuộc Stripe cụ thể
type PaymentGateway interface { Charge(amount int) error }
type OrderService struct { gw PaymentGateway }       // đổi cổng → KHÔNG đụng OrderService
```

| Nguyên lý SOLID | Tác động lên thước đo |
|-----------------|------------------------|
| **S**ingle Responsibility | ↑ Cohesion (mỗi mô-đun một nhiệm vụ) |
| **O**pen/Closed | ↓ Coupling (mở rộng qua abstraction, không sửa cái cũ) |
| **L**iskov Substitution | giữ coupling *an toàn* khi thay thế qua interface |
| **I**nterface Segregation | ↓ Coupling (interface nhỏ → bớt phụ thuộc thừa, kiểu stamp) |
| **D**ependency Inversion | ↓ Coupling (phụ thuộc abstraction, không concrete) |

> ❓ **"Vậy chỉ cần thuộc coupling/cohesion là đủ, khỏi học SOLID?"** Hai cái bổ trợ: coupling/cohesion cho bạn *biết khi nào* thiết kế tệ (chẩn đoán); SOLID cho bạn *công cụ cụ thể* để chữa (đơn thuốc). Biết "bệnh nhân sốt" (coupling cao) chưa đủ — cần biết "kê thuốc gì" (DIP, interface).

📝 **Tóm tắt mục 4.** SRP là cách nâng **cohesion**; DIP, ISP, OCP là cách hạ **coupling**. Coupling/cohesion = chẩn đoán; SOLID = đơn thuốc. Chúng nói cùng một câu chuyện ở hai mức trừu tượng.

---

## 5. Kỹ thuật giảm coupling — interface, DI, event (before/after)

💡 **Trực giác.** Ba "móc nối lỏng" thông dụng nhất để cắt dây cứng giữa các hộp.

### 5.1 Interface — phụ thuộc vào "hình dạng", không vào "danh tính"

**Before** (coupling chặt: dán cứng kiểu cụ thể):
```go
type NotificationService struct {
    emailer *SmtpEmailer   // ❗ buộc cứng vào SMTP
}
func (n *NotificationService) Notify(msg string) {
    n.emailer.SendViaSmtp(msg)
}
// Muốn đổi sang Slack? Phải sửa thẳng NotificationService.
```

**After** (coupling lỏng: phụ thuộc interface):
```go
type Notifier interface { Send(msg string) error }   // giao kèo

type NotificationService struct { notifier Notifier }
func (n *NotificationService) Notify(msg string) { n.notifier.Send(msg) }

// SmtpNotifier, SlackNotifier... đều thỏa Notifier → cắm vào không sửa Service
```

### 5.2 Dependency Injection (tiêm phụ thuộc) — đưa phụ thuộc từ ngoài vào

**Before** (mô-đun tự *tạo* phụ thuộc → biết quá nhiều):
```go
func NewOrderService() *OrderService {
    return &OrderService{ gw: NewStripeClient("sk_live_...") }  // ❗ tự dựng Stripe
}
// OrderService dính vào: cách khởi tạo Stripe + secret key + chính Stripe.
// Test thì sao? Buộc gọi Stripe thật.
```

**After** (nhận phụ thuộc qua tham số — "tiêm" từ ngoài):
```go
func NewOrderService(gw PaymentGateway) *OrderService {
    return &OrderService{ gw: gw }   // nhận sẵn, không tự dựng
}
// Production: NewOrderService(realStripe)
// Test:       NewOrderService(fakeGateway)   ← test dễ, không gọi mạng
```
DI hạ coupling vì mô-đun *không còn biết cách dựng* phụ thuộc, chỉ biết *dùng* nó qua interface.

### 5.3 Event — A không biết B tồn tại

**Before** (A gọi thẳng B, C, D → A "biết" cả ba):
```go
func PlaceOrder(o Order) {
    saveOrder(o)
    emailer.Send(o.Email, "...")    // A biết về email
    inventory.Reduce(o.Items)       // A biết về kho
    analytics.Track("order", o)     // A biết về analytics
}
// Thêm "cộng điểm thưởng"? Lại sửa PlaceOrder.
```

**After** (A phát *sự kiện*, ai quan tâm tự đăng ký lắng nghe):
```go
func PlaceOrder(o Order) {
    saveOrder(o)
    bus.Publish(OrderPlaced{Order: o})   // A chỉ "thông báo", không biết ai nghe
}
// emailer, inventory, analytics, loyalty... tự Subscribe(OrderPlaced).
// Thêm tính năng mới = thêm một subscriber, KHÔNG đụng PlaceOrder.
```
Event đẩy coupling xuống mức thấp nhất: bên phát và bên nhận *không tham chiếu trực tiếp* nhau, chỉ chung một "hình dạng sự kiện".

> ⚠ **Lỗi thường gặp.** Lạm dụng event biến hệ thống thành "ai gọi ai chẳng biết" — khó lần dấu luồng (debug ác mộng). Event tốt cho *fan-out nhiều người nghe & không cần kết quả ngay* (gửi mail, analytics); luồng nghiệp vụ cần đồng bộ & rõ ràng thì gọi trực tiếp/qua interface vẫn hơn. Lỏng coupling không miễn phí — đổi bằng độ khó truy vết.

> 🔁 **Dừng lại tự kiểm tra.** Bạn muốn `OrderService` test được mà không gọi Stripe thật. Kỹ thuật nào ở trên giải quyết, và vì sao?
> <details><summary>Đáp án</summary><b>Interface + Dependency Injection</b>. Định nghĩa <code>PaymentGateway</code> interface; production tiêm <code>StripeClient</code> thật, test tiêm <code>fakeGateway</code> (luôn trả thành công). Vì <code>OrderService</code> chỉ phụ thuộc interface và nhận phụ thuộc từ ngoài, nó không "biết" Stripe → thay bằng fake trong test thoải mái.</details>

📝 **Tóm tắt mục 5.** Hạ coupling bằng: **interface** (phụ thuộc hình dạng, không danh tính), **DI** (tiêm phụ thuộc từ ngoài → dễ test), **event** (bên phát không biết bên nhận → fan-out lỏng nhất). Mỗi kỹ thuật đánh đổi: lỏng hơn nhưng có thể khó truy vết hơn — dùng đúng chỗ.

---

## 6. Đo lường thô: fan-in / fan-out

💡 **Trực giác.** Muốn "đo" coupling nhanh, đếm dây nối tại mỗi hộp:

- **Fan-out** của A = số mô-đun mà **A phụ thuộc vào** (A gọi/dùng bao nhiêu hộp khác). Fan-out cao → A "biết quá nhiều" → khó hiểu, dễ vỡ khi mấy hộp kia đổi.
- **Fan-in** của A = số mô-đun **phụ thuộc vào A** (bao nhiêu hộp gọi A). Fan-in cao → A là điểm chung quan trọng → đổi A ảnh hưởng rộng (cần ổn định, test kỹ).

**Ví dụ số cụ thể.** Một hệ 5 mô-đun, dây phụ thuộc:
```
Cart    → Order
Order   → Payment, Inventory
Report  → Order, Payment, Inventory
```

| Mô-đun | Fan-out (gọi ai) | Fan-in (ai gọi mình) | Nhận xét |
|--------|:---:|:---:|----------|
| Cart | 1 (Order) | 0 | gọn |
| Order | 2 (Payment, Inventory) | 2 (Cart, Report) | trung tâm — cần ổn định |
| Payment | 0 | 2 (Order, Report) | "lá" được tái dùng |
| Inventory | 0 | 2 (Order, Report) | "lá" được tái dùng |
| **Report** | **3** (Order, Payment, Inventory) | **0** | **fan-out cao → cờ đỏ** |

Đọc bảng: `Report` có **fan-out = 3** — nó "thò tay" vào ba mô-đun. Đây là điểm coupling cao đáng xem lại (có thể `Report` đang lấn việc của người khác; cân nhắc cho nó nhận dữ liệu đã tổng hợp thay vì tự gọi cả ba).

> ❓ **"Fan-in cao là xấu?"** Không hẳn. Fan-in cao nghĩa là mô-đun *được tái sử dụng nhiều* (tốt!) — nhưng cũng nghĩa là *đổi nó rủi ro cao*. Nguyên tắc: mô-đun fan-in cao nên là **abstraction ổn định** (interface, util thuần) — đổi hiếm, test kỹ. Ngược lại, fan-out cao gần như luôn là cờ đỏ: mô-đun phụ thuộc quá nhiều thứ.

> ⚠ **Lỗi thường gặp.** Coi fan-in/fan-out là chân lý tuyệt đối. Chúng chỉ là *thước đo thô* (đếm số dây, không đo "độ to" của dây). Một fan-out = 1 nhưng là **content coupling** (mục 2) còn tệ hơn fan-out = 3 toàn **data coupling**. Dùng số để *chỉ chỗ đáng xem*, rồi nhìn *loại* coupling để kết luận.

📝 **Tóm tắt mục 6.** **Fan-out** = A phụ thuộc bao nhiêu hộp (cao = cờ đỏ, A biết quá nhiều). **Fan-in** = bao nhiêu hộp phụ thuộc A (cao = tái dùng nhiều nhưng đổi rủi ro → cần ổn định). Đây là thước đo *thô* để chỉ chỗ; vẫn phải nhìn *loại* coupling để kết luận.

---

## 7. Bài tập

1. Cho hàm `printReport(report, format)` với `format` là số: `1` = in màn hình, `2` = xuất PDF, `3` = gửi email. Đây là loại coupling nào? Vì sao tệ, và sửa thế nào?

2. Một package `commons` chứa: `HashPassword`, `ConnectDatabase`, `ParseCSV`, `ValidateEmail`, `RenderHTMLTemplate`. Đánh giá cohesion của package này (mức nào trong thang), và đề xuất tách lại.

3. Phân loại coupling cho mỗi đoạn sau:
   - (a) `func tax(amount float64) float64` — chỉ nhận số tiền, trả về thuế.
   - (b) `func notify(u *User)` nhưng bên trong chỉ dùng `u.Email`.
   - (c) Hai module cùng đọc/ghi biến global `var Config map[string]string`.

4. Cho đoạn coupling chặt sau, viết lại theo **interface + dependency injection** để `OrderProcessor` test được mà không cần gửi mail thật:
   ```go
   type OrderProcessor struct{}
   func (p *OrderProcessor) Process(o Order) {
       saveToDB(o)
       smtp.SendMail(o.Email, "Đơn của bạn đã được xử lý")
   }
   ```

5. Một hệ có các phụ thuộc: `UI → Service`, `Service → Repo`, `Service → Mailer`, `Service → Logger`, `Service → Cache`. Tính **fan-out** của `Service` và nêu nhận xét. Đề xuất một cách giảm.

6. (Mở rộng) Giải thích vì sao "low coupling" và "high cohesion" thường **đi cùng nhau**: nâng cohesion của một mô-đun thường kéo coupling tổng thể xuống thế nào?

## Lời giải chi tiết

**Bài 1.** Đây là **control coupling** — `format` là một *cờ điều khiển* bảo `printReport` *cách* chạy, và người gọi phải nhớ "2 = PDF". Tệ vì: (1) khó đọc (số ma thuật), (2) người gọi bị buộc biết logic nội bộ của hàm, (3) thêm định dạng mới phải sửa `if/switch` bên trong. **Sửa:** tách thành các hàm rõ nghĩa — `printToScreen(report)`, `exportPDF(report)`, `emailReport(report)` — mỗi hàm một việc, không còn cờ. Hoặc, nếu cần đa hình, truyền một interface `Renderer` (người gọi chọn implementation) → chuyển thành **data coupling** + dùng đa hình.

**Bài 2.** Cohesion **coincidental (ngẫu nhiên)** — mức thấp nhất: các hàm gom vào `commons` chẳng vì lý do nào ngoài "không biết để đâu". Bằng chứng: `HashPassword` (bảo mật), `ConnectDatabase` (hạ tầng), `ParseCSV` (định dạng dữ liệu), `ValidateEmail` (kiểm tra), `RenderHTMLTemplate` (view) — năm nhiệm vụ khác hẳn nhau. **Tách lại theo nhiệm vụ (functional cohesion):**
- `security` → `HashPassword`, `ValidateEmail` (hoặc `validation` riêng cho email)
- `database` → `ConnectDatabase`
- `csv` → `ParseCSV`
- `view`/`template` → `RenderHTMLTemplate`

Tên `commons`/`utils` là cờ đỏ kinh điển cho cohesion thấp.

**Bài 3.**
- (a) **Data coupling** (lỏng nhất ✅) — chỉ truyền đúng dữ liệu cần (`amount`) qua tham số, trả về kết quả. Giao kèo tối thiểu.
- (b) **Stamp coupling** — truyền cả struct `*User` dù chỉ dùng `Email`. Sửa thành `notify(email string)` để hạ về data coupling.
- (c) **Common coupling** — hai module chia sẻ trạng thái global `Config`. Bất kỳ ai ghi `Config` đều ảnh hưởng cả hai; khó test, khó song song. Sửa: truyền `Config` qua tham số / inject, không dùng global.

**Bài 4.** Định nghĩa interface cho phần "gửi mail", tiêm vào qua constructor:
```go
// 1. Giao kèo
type Mailer interface { Send(to, body string) error }

// 2. Phụ thuộc interface, nhận từ ngoài (DI)
type OrderProcessor struct {
    db     DB        // tương tự, interface cho lưu trữ
    mailer Mailer
}
func NewOrderProcessor(db DB, m Mailer) *OrderProcessor {
    return &OrderProcessor{db: db, mailer: m}
}
func (p *OrderProcessor) Process(o Order) error {
    if err := p.db.Save(o); err != nil { return err }
    return p.mailer.Send(o.Email, "Đơn của bạn đã được xử lý")
}

// 3. Production: NewOrderProcessor(realDB, smtpMailer{})
// 4. Test: dùng fake không gửi thật
type fakeMailer struct{ sent []string }
func (f *fakeMailer) Send(to, body string) error { f.sent = append(f.sent, to); return nil }
// → test kiểm f.sent có đúng email không, KHÔNG gọi SMTP thật.
```
Nhờ interface + DI: `OrderProcessor` không còn biết về `smtp` cụ thể → coupling lỏng, test dễ.

**Bài 5.** **Fan-out của `Service` = 4** (Repo, Mailer, Logger, Cache). Nhận xét: fan-out cao → `Service` "biết quá nhiều", là điểm dễ vỡ (đổi bất kỳ trong 4 cái đều có thể đụng `Service`) và khó hiểu/khó test (phải dựng 4 phụ thuộc). **Giảm:**
- Đẩy việc *phụ* (Logger, Mailer) ra ngoài luồng chính bằng **event** — `Service` phát sự kiện, Logger/Mailer tự lắng nghe → fan-out giảm còn 2 (Repo, Cache).
- Hoặc gom Repo+Cache sau một interface `Store` (cache là chi tiết của tầng lưu trữ) → `Service` chỉ thấy một `Store`.
- Đảm bảo cả 4 phụ thuộc đều qua **interface** (DIP) để dù còn nhiều dây thì mỗi dây cũng "mảnh" (data coupling), không phải content coupling.

**Bài 6.** Nâng cohesion = gom mọi thứ *thuộc một nhiệm vụ* vào một mô-đun và đẩy thứ *không thuộc* ra ngoài. Hệ quả lên coupling:
- Khi một mô-đun *làm trọn một việc*, nó **ít phải gọi ra ngoài** để mượn logic lạc chỗ → fan-out giảm → coupling giảm.
- Ranh giới rõ ràng (mỗi hộp một nhiệm vụ) khiến các dây nối còn lại đi qua **giao kèo rõ** (data coupling) thay vì "thò tay" lung tung (content/common coupling).
- Ngược lại, cohesion thấp (một hộp ôm nhiều việc) buộc nó *chạm vào* nhiều mô-đun khác để làm hết mọi việc → coupling cao.

Vì thế hai mục tiêu củng cố lẫn nhau: chia hệ thống theo *nhiệm vụ* (high cohesion) tự nhiên tạo ra ranh giới gọn với *ít dây mảnh* (low coupling). Đây là lý do hai thước đo luôn đi kèm trong cùng một câu khẩu hiệu.

---

## 8. Code & Minh họa

- [visualization.html](./visualization.html) — 3 mô-đun tương tác:
  1. **Sơ đồ mô-đun (SVG)**: bấm để thêm/bớt dây nối giữa các hộp, xem chỉ số coupling (số dây) và fan-in/fan-out cập nhật trực tiếp — thấy "low coupling" là ít dây thế nào.
  2. **Toggle cohesion một class**: bật/tắt giữa phiên bản cohesion thấp (một `Helper` ôm đủ việc) và cao (tách theo nhiệm vụ), so sánh trực quan.
  3. **Quiz phân loại coupling**: cho một đoạn mô tả, chọn đúng loại (content/common/control/stamp/data) và xem giải thích.

## 9. Bài tiếp theo

- [Lesson 04 — Design patterns](../lesson-04-design-patterns/) — các "khuôn mẫu" lặp lại để đạt low coupling/high cohesion (Strategy, Observer, Factory... chính là interface/DI/event được đóng gói thành mẫu).
- Ôn lại nền: [Lesson 02 — Nguyên lý thiết kế (SOLID)](../lesson-02-design-principles/) (SRP ↔ cohesion, DIP ↔ coupling).
- Liên quan: [Lesson 05 — Refactoring & nợ kỹ thuật](../lesson-05-refactoring-tech-debt/) — coupling chặt/cohesion thấp tích tụ thành nợ kỹ thuật ra sao.
