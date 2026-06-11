# Lesson 02 — Nguyên lý thiết kế (SOLID, DRY, KISS, YAGNI)

## Mục tiêu

- Hiểu **vì sao cần nguyên lý thiết kế**: chúng tồn tại để **giảm chi phí thay đổi** code theo thời gian, không phải để "code cho đẹp".
- Nắm 5 nguyên lý **SOLID** — với mỗi nguyên lý: tên đầy đủ, định nghĩa, một đoạn code *vi phạm* và cách *sửa*.
- Nắm 3 nguyên lý nền tảng: **DRY** (Don't Repeat Yourself), **KISS** (Keep It Simple), **YAGNI** (You Aren't Gonna Need It).
- Biết **mặt trái** của từng nguyên lý khi áp dụng quá đà (DRY tạo phụ thuộc giả, KISS bị viện cớ để code cẩu thả).
- Biết cân nhắc khi các nguyên lý **mâu thuẫn** với nhau.

## Kiến thức tiền đề

- Đã đọc [Lesson 01 — Clean code & code smells](../lesson-01-clean-code-code-smells/) — biết "code smell" là gì và vì sao code khó đọc/khó sửa lại tốn tiền.
- Biết lập trình hướng đối tượng cơ bản: `interface`, struct/class, kế thừa/lồng ghép (composition). Ví dụ ở bài này dùng Go.
- Không cần biết design pattern trước — patterns là *công cụ* hiện thực các nguyên lý này, học sau ở [Lesson 04](../lesson-04-design-patterns/).

> 💡 **Nguyên lý vs pattern vs smell — phân biệt nhanh.** *Code smell* (Lesson 01) là **triệu chứng** ("hàm này dài 300 dòng"). *Nguyên lý thiết kế* (bài này) là **mục tiêu/giá trị** cần hướng tới ("mỗi đơn vị một lý do thay đổi"). *Design pattern* ([Lesson 04](../lesson-04-design-patterns/)) là **giải pháp mẫu** đã được kiểm chứng để đạt nguyên lý đó. Thứ tự tư duy: thấy smell → nhớ nguyên lý bị vi phạm → (có thể) dùng pattern để sửa.

---

## 1. Vì sao cần nguyên lý thiết kế — giảm chi phí thay đổi

💡 **Trực giác.** Hãy hình dung tủ quần áo. Nếu vứt tất cả vào một ngăn (áo, quần, tất, đồ mùa đông lẫn lộn), lấy ra mặc thì *vẫn được* — nhưng mỗi lần tìm một cái áo bạn phải lục tung cả tủ, và thêm đồ mới thì càng rối. Sắp xếp theo ngăn (mỗi ngăn một loại) tốn công *lúc đầu* nhưng mỗi lần dùng sau đó đều nhanh. Code cũng vậy: nguyên lý thiết kế là cách "sắp ngăn" để **lần sửa sau rẻ hơn**.

Trong [Lesson 01 của Tier Foundations](../../../01-Foundations/lesson-01-sdlc-engineer-role/) ta đã thấy: phần mềm sống nhiều năm và **phần lớn chi phí nằm ở giai đoạn bảo trì** — tức là *sửa code đã có*. Một thiết kế tốt không làm chương trình chạy nhanh hơn; nó làm **lần thay đổi tiếp theo rẻ hơn**.

**Ví dụ số cụ thể — cùng một yêu cầu thay đổi, hai thiết kế:**

Yêu cầu mới: "Thêm hình thức thanh toán Momo bên cạnh thẻ tín dụng."

| | Thiết kế xấu (mọi thứ trong 1 hàm `if/else`) | Thiết kế tốt (mỗi cổng thanh toán 1 struct, chung 1 interface) |
|---|---|---|
| Số file phải sửa | 1 file 800 dòng, sửa giữa khối `if/else` rối | Thêm 1 file mới `momo.go` (~40 dòng) |
| Rủi ro phá tính năng cũ | Cao — đụng vào code thẻ tín dụng đang chạy | Gần như 0 — không động code cũ |
| Thời gian + review | ~1 ngày, review khó vì khối lớn | ~1 giờ, review 1 file nhỏ |

Cùng một tính năng, chi phí chênh nhau cả chục lần — **đó là cái nguyên lý thiết kế mua cho bạn.**

> ❓ **"Vậy cứ áp dụng càng nhiều nguyên lý càng tốt?"** Không. Nguyên lý có **chi phí trả trước** (thêm abstraction, thêm file, code dài hơn lúc đầu). Chúng đáng giá khi code **sẽ thay đổi**. Với một script chạy một lần rồi vứt, áp SOLID đầy đủ là lãng phí — đây chính là lý do có KISS và YAGNI để *kéo ngược lại* (mục 4, 5). Nguyên lý là *dao*, không phải *luật*: dùng đúng chỗ.

> ⚠ **Lỗi thường gặp.** Coi nguyên lý là mục tiêu tự thân ("phải DRY bằng mọi giá", "phải tách interface cho mọi class"). Mục tiêu thật là **giảm chi phí thay đổi**. Nếu một lần áp dụng nguyên lý làm code *khó hiểu hơn* mà chẳng giảm chi phí gì, đó là dấu hiệu áp sai.

> 🔁 **Dừng lại tự kiểm tra.** Hai đoạn code cùng chạy đúng và cùng tốc độ. Đoạn A là một hàm 500 dòng; đoạn B chia thành 12 hàm nhỏ có tên rõ. Về mặt *hiệu năng* chúng như nhau — vậy thiết kế tốt mua cho ta cái gì?
> <details><summary>Đáp án</summary>Mua <b>chi phí thay đổi thấp</b>: dễ đọc, dễ tìm chỗ sửa, dễ test từng phần, dễ thêm tính năng mà không phá phần khác. Lợi ích của thiết kế tốt hiện ra ở <i>lần sửa thứ hai, thứ ba…</i>, không phải ở lần chạy đầu.</details>

📝 **Tóm tắt mục 1.** Nguyên lý thiết kế tồn tại để **giảm chi phí thay đổi** trong vòng đời dài của phần mềm, không phải để code đẹp hay chạy nhanh. Chúng có chi phí trả trước, nên chỉ "lời" khi code sẽ còn được sửa — và phải cân bằng với KISS/YAGNI.

---

## 2. SOLID — 5 nguyên lý hướng đối tượng

💡 **Trực giác.** SOLID là 5 chữ cái đầu của 5 nguyên lý (Robert C. Martin tổng hợp) giúp code hướng đối tượng **dễ mở rộng mà không phải sửa thứ đang chạy**. Một câu thần chú gói gọn cả 5: *"mỗi thứ làm đúng một việc, và phụ thuộc vào hợp đồng (interface) chứ không vào chi tiết cụ thể."*

| Chữ | Tên đầy đủ | Một câu cốt lõi |
|---|---|---|
| **S** | Single Responsibility | Mỗi đơn vị chỉ có **một lý do để thay đổi** |
| **O** | Open/Closed | **Mở** để mở rộng, **đóng** để sửa đổi |
| **L** | Liskov Substitution | Lớp con phải **thay thế được** lớp cha mà không vỡ |
| **I** | Interface Segregation | **Nhiều interface nhỏ** tốt hơn một interface to |
| **D** | Dependency Inversion | Phụ thuộc vào **trừu tượng**, không vào cụ thể |

### 2.1 S — Single Responsibility Principle (Trách nhiệm đơn)

**Định nghĩa.** Một module/struct/hàm nên có **đúng một lý do để thay đổi** — tức là chỉ phục vụ một "tác nhân" (một nhóm lý do nghiệp vụ).

💡 **Hình dung.** Một con dao Thụy Sĩ gắn 20 chức năng nghe tiện, nhưng khi cái kéo hỏng bạn phải mang cả con dao đi sửa, và dễ làm gãy thứ khác. Tách riêng kéo, dao, tua-vít thì hỏng cái nào thay cái đó.

```go
// ❌ VI PHẠM: struct Report ôm 3 trách nhiệm khác nhau
type Report struct{ data []Row }

func (r *Report) Calculate() float64 { /* tính toán nghiệp vụ */ }
func (r *Report) RenderHTML() string { /* định dạng hiển thị */ }
func (r *Report) SaveToDisk(path string) error { /* I/O lưu file */ }
```

`Report` thay đổi vì 3 lý do độc lập: công thức tính đổi, giao diện HTML đổi, cách lưu trữ đổi (file → S3). Mỗi lần sửa một thứ đều có nguy cơ đụng hai thứ kia.

```go
// ✅ SỬA: tách theo trách nhiệm
type Report struct{ data []Row }
func (r *Report) Calculate() float64 { /* chỉ nghiệp vụ tính toán */ }

type HTMLRenderer struct{}
func (h HTMLRenderer) Render(r *Report) string { /* chỉ hiển thị */ }

type FileStore struct{}
func (f FileStore) Save(path string, content string) error { /* chỉ I/O */ }
```

> ⚠ **Lỗi thường gặp.** Hiểu nhầm "một trách nhiệm" = "một hàm" hoặc "một việc kỹ thuật". Thước đo đúng là **lý do thay đổi / tác nhân**: nếu hai phần code thay đổi vì hai lý do nghiệp vụ khác nhau (bộ phận kế toán đổi công thức vs bộ phận marketing đổi giao diện), chúng nên tách ra.

### 2.2 O — Open/Closed Principle (Đóng/Mở)

**Định nghĩa.** Một đơn vị nên **mở cho mở rộng** (thêm hành vi mới) nhưng **đóng với sửa đổi** (không phải sửa code cũ đang chạy). Cách đạt: thêm hành vi bằng cách *thêm code mới*, không phải *sửa code đã có*.

```go
// ❌ VI PHẠM: thêm loại hình mới phải SỬA hàm cũ
func Area(shapeType string, a, b float64) float64 {
    if shapeType == "rect" {
        return a * b
    } else if shapeType == "circle" {
        return 3.14159 * a * a
    }
    // muốn thêm "triangle" → phải mở hàm này ra sửa, rủi ro phá rect/circle
    return 0
}
```

```go
// ✅ SỬA: định nghĩa interface, mỗi hình tự khai báo Area()
type Shape interface{ Area() float64 }

type Rect struct{ W, H float64 }
func (r Rect) Area() float64 { return r.W * r.H }

type Circle struct{ R float64 }
func (c Circle) Area() float64 { return 3.14159 * c.R * c.R }

// Thêm Triangle = THÊM struct mới, KHÔNG đụng Rect/Circle:
type Triangle struct{ Base, Height float64 }
func (t Triangle) Area() float64 { return 0.5 * t.Base * t.Height }
```

> ❓ **"Đóng với sửa đổi thì sửa bug làm sao?"** Open/Closed nói về **thêm hành vi mới** (loại hình mới, cổng thanh toán mới) — việc đó nên làm bằng cách thêm code. Sửa bug trong logic *hiện có* thì tất nhiên vẫn phải sửa code đó; nguyên lý không cấm. Mục tiêu là: thêm một biến thể mới không buộc bạn chọc vào và mạo hiểm các biến thể cũ.

### 2.3 L — Liskov Substitution Principle (Thay thế Liskov)

**Định nghĩa.** Nếu `S` là kiểu con của `T`, thì mọi chỗ dùng `T` phải **thay bằng `S` mà chương trình vẫn đúng**. Lớp con không được phá vỡ "hợp đồng" mà lớp cha hứa.

💡 **Hình dung.** "Hình vuông là hình chữ nhật" đúng trong toán nhưng sai trong code: nếu `setWidth` của hình chữ nhật chỉ đổi chiều rộng, mà hình vuông buộc đổi cả hai cạnh, thì đoạn code "đặt rộng=5, cao=4, kỳ vọng diện tích=20" sẽ vỡ khi truyền vào hình vuông (nó cho 16). Vi phạm vì lớp con *không thay thế được* lớp cha.

```go
// ❌ VI PHẠM: Penguin là Bird nhưng không bay được
type Bird interface{ Fly() }

type Sparrow struct{}
func (s Sparrow) Fly() { /* bay bình thường */ }

type Penguin struct{}
func (p Penguin) Fly() { panic("chim cánh cụt không bay!") } // phá hợp đồng

func MakeItFly(b Bird) { b.Fly() } // truyền Penguin vào → crash
```

```go
// ✅ SỬA: tách hợp đồng "bay" khỏi "là chim"
type Bird interface{ Eat() }
type Flyer interface{ Fly() }

type Sparrow struct{}
func (s Sparrow) Eat() {}
func (s Sparrow) Fly() {} // Sparrow vừa là Bird vừa là Flyer

type Penguin struct{}
func (p Penguin) Eat() {} // Penguin chỉ là Bird, không hứa Fly()

func MakeItFly(f Flyer) { f.Fly() } // chỉ nhận Flyer → không thể truyền Penguin
```

> ⚠ **Lỗi thường gặp.** Dấu hiệu vi phạm Liskov rõ nhất: lớp con **ném exception/panic** ở method kế thừa, hoặc kiểm tra kiểu (`if x is Penguin`) trước khi gọi. Cả hai nghĩa là "lớp con này không thật sự thay thế được lớp cha" — nên tách lại hợp đồng (thường dẫn tới nguyên lý **I** bên dưới).

### 2.4 I — Interface Segregation Principle (Phân tách interface)

**Định nghĩa.** Không nên buộc một client phụ thuộc vào những method nó **không dùng**. Nhiều interface **nhỏ và chuyên biệt** tốt hơn một interface to "tất-cả-trong-một".

```go
// ❌ VI PHẠM: interface "béo" buộc mọi máy in phải cài đủ 3 việc
type Machine interface {
    Print(doc string)
    Scan(doc string)
    Fax(doc string)
}

// Máy in giá rẻ chỉ in được, nhưng vẫn buộc phải khai báo Scan/Fax:
type CheapPrinter struct{}
func (c CheapPrinter) Print(d string) {}
func (c CheapPrinter) Scan(d string)  { panic("không hỗ trợ") } // thừa & nguy hiểm
func (c CheapPrinter) Fax(d string)   { panic("không hỗ trợ") }
```

```go
// ✅ SỬA: tách thành các interface nhỏ, ghép khi cần
type Printer interface{ Print(doc string) }
type Scanner interface{ Scan(doc string) }
type Faxer   interface{ Fax(doc string) }

type CheapPrinter struct{}
func (c CheapPrinter) Print(d string) {} // chỉ cài đúng thứ nó làm được

// Máy đa năng ghép nhiều interface:
type AllInOne struct{}
func (a AllInOne) Print(d string) {}
func (a AllInOne) Scan(d string)  {}
func (a AllInOne) Fax(d string)   {}
```

> 💡 **Liên hệ với L.** Ví dụ Penguin (mục 2.3) sửa đúng bằng cách *tách interface* `Flyer` khỏi `Bird` — đó chính là **Interface Segregation**. L và I thường đi cùng nhau: tách interface nhỏ giúp lớp con chỉ hứa đúng thứ nó làm được, nhờ đó không vi phạm Liskov.

### 2.5 D — Dependency Inversion Principle (Đảo phụ thuộc)

**Định nghĩa.** Module cấp cao **không nên phụ thuộc** vào module cấp thấp; cả hai nên phụ thuộc vào **trừu tượng (interface)**. Tức là: code nghiệp vụ phụ thuộc vào *hợp đồng*, không vào *implementation cụ thể*.

💡 **Hình dung.** Ổ cắm điện trên tường là một *interface* chuẩn. Cái đèn không cần biết điện đến từ thủy điện, điện mặt trời hay máy phát — nó chỉ phụ thuộc vào "ổ cắm chuẩn". Đổi nguồn điện không cần đổi đèn. Code cũng nên cắm vào "ổ cắm" (interface), không hàn cứng vào "nhà máy điện" (lớp cụ thể).

```go
// ❌ VI PHẠM: OrderService tự tạo & hàn cứng vào MySQL cụ thể
type MySQLDB struct{}
func (m MySQLDB) Save(o Order) {}

type OrderService struct {
    db MySQLDB // phụ thuộc trực tiếp vào lớp cụ thể
}
func NewOrderService() *OrderService {
    return &OrderService{db: MySQLDB{}} // tự tạo → không thay/không test được
}
```

```go
// ✅ SỬA: phụ thuộc vào interface, nhận implementation từ ngoài (inject)
type Store interface{ Save(o Order) } // trừu tượng

type MySQLDB struct{}
func (m MySQLDB) Save(o Order) {}

type OrderService struct {
    db Store // phụ thuộc vào HỢP ĐỒNG, không vào MySQL
}
func NewOrderService(db Store) *OrderService { // inject từ ngoài
    return &OrderService{db: db}
}

// Lúc test: truyền store giả; lúc đổi DB: truyền PostgresDB — KHÔNG sửa OrderService.
```

> ❓ **"Đảo phụ thuộc" đảo cái gì?** Bình thường code cấp cao (nghiệp vụ) "gọi xuống" code cấp thấp (DB) nên phụ thuộc chĩa từ cao → thấp. Sau khi đặt interface ở giữa, *cả hai* cùng phụ thuộc vào interface — và interface thuộc về tầng nghiệp vụ. Hướng phụ thuộc với chi tiết kỹ thuật giờ chĩa *vào trong* (về phía nghiệp vụ), nên gọi là "đảo". Đây là nền của test bằng mock và của Clean Architecture (Tier sau).

> 🔁 **Dừng lại tự kiểm tra.** Bạn thấy đoạn code: một class `if customerType == "vip" {...} else if customerType == "normal" {...} else if ...`, và mỗi lần thêm hạng khách phải mở hàm này ra sửa. Nguyên lý nào bị vi phạm rõ nhất, và sửa thế nào?
> <details><summary>Đáp án</summary><b>Open/Closed (O)</b>: thêm loại khách mới buộc sửa code cũ. Sửa: định nghĩa interface <code>CustomerPolicy</code> với method <code>Discount()</code>, mỗi hạng khách là một struct cài interface đó; thêm hạng mới = thêm struct, không đụng hàm cũ. (Cũng liên quan D nếu chỗ dùng nhận qua interface.)</details>

📝 **Tóm tắt mục 2.** SOLID = **S** (một lý do thay đổi) · **O** (thêm hành vi bằng code mới, không sửa code cũ) · **L** (lớp con thay thế được lớp cha) · **I** (interface nhỏ, chuyên biệt) · **D** (phụ thuộc vào interface, inject từ ngoài). Năm nguyên lý đan vào nhau: I+L thường đi cùng, O thường đạt nhờ D.

---

## 3. DRY — Don't Repeat Yourself (Đừng lặp lại chính mình)

💡 **Trực giác.** Nếu công thức tính thuế nằm rải rác ở 7 chỗ trong code, ngày luật thuế đổi bạn phải nhớ sửa đủ 7 chỗ — sót một chỗ là sinh bug. DRY nói: **mỗi mẩu kiến thức nên có một biểu diễn duy nhất, có thẩm quyền** trong hệ thống. Sửa một chỗ, đúng mọi nơi.

```go
// ❌ VI PHẠM: công thức thuế lặp ở nhiều chỗ
func priceWithTaxA(p float64) float64 { return p + p*0.1 }   // chỗ A
func priceWithTaxB(p float64) float64 { return p * 1.1 }     // chỗ B (còn dễ sai khác)
// ... và 5 chỗ khác hardcode 0.1
```

```go
// ✅ SỬA: gom kiến thức "thuế suất" về một nguồn duy nhất
const TaxRate = 0.10
func ApplyTax(p float64) float64 { return p + p*TaxRate }
// Luật đổi thuế 10% → 8%? Sửa đúng MỘT dòng.
```

> ⚠ **Cảnh báo: DRY quá đà tạo "trùng lặp giả" (false DRY).** Hai đoạn code *trông giống nhau* chưa chắc là *cùng một kiến thức*. Nếu gom chúng lại, ngày một bên cần đổi mà bên kia thì không, bạn lại phải tách ra — và việc tách thường khó hơn việc lặp ban đầu.
>
> ```go
> // Hai validate "trông giống" nhưng là HAI quy tắc nghiệp vụ khác nhau:
> func validateUsername(s string) bool { return len(s) >= 3 && len(s) <= 20 }
> func validatePassword(s string) bool { return len(s) >= 3 && len(s) <= 20 }
> // Gom thành validateLength(3,20) → ngày sau password đổi min=8 còn username giữ 3,
> // bạn phải tách lại. Đây là trùng lặp NGẪU NHIÊN, không nên DRY.
> ```
>
> Quy tắc thực dụng: **DRY theo *kiến thức/quy tắc nghiệp vụ*, không theo *hình thức chữ giống nhau*.** Câu hỏi đúng không phải "hai đoạn này có giống nhau không?" mà "hai đoạn này có *thay đổi cùng nhau vì cùng một lý do* không?".

> ❓ **"Rule of three" là gì?** Một kinh nghiệm phổ biến: đừng vội trừu tượng hóa khi mới thấy code lặp **lần thứ hai** — chờ tới **lần thứ ba** mới gom. Vì sau ba lần bạn đã thấy đủ ngữ cảnh để biết phần nào *thật sự* chung, phần nào chỉ tình cờ giống.

> 🔁 **Dừng lại tự kiểm tra.** Bạn thấy hai hàm format ngày tháng giống hệt nhau từng ký tự, một dùng cho hóa đơn, một cho email marketing. Có nên gom làm một không?
> <details><summary>Đáp án</summary>Tùy: hỏi "chúng có đổi cùng nhau vì cùng lý do không?". Nếu cả hai luôn phải hiển thị ngày theo đúng một chuẩn của công ty → gom (DRY thật). Nếu định dạng hóa đơn bị ràng buộc pháp lý còn email được tự do đổi theo marketing → đừng gom (trùng lặp ngẫu nhiên, gom sẽ tạo phụ thuộc giả giữa hai bộ phận không liên quan).</details>

📝 **Tóm tắt mục 3.** DRY = mỗi *kiến thức/quy tắc nghiệp vụ* chỉ có **một nguồn duy nhất**, sửa một chỗ đúng mọi nơi. Nhưng đừng DRY theo chữ giống nhau — trùng lặp *ngẫu nhiên* gom lại tạo phụ thuộc giả. DRY theo "thay đổi cùng nhau vì cùng lý do".

---

## 4. KISS — Keep It Simple, Stupid (Giữ cho đơn giản)

💡 **Trực giác.** Để cắt một lát bánh mì, bạn cần con dao — không cần thiết kế một dây chuyền cắt tự động lập trình được. KISS nói: **chọn giải pháp đơn giản nhất giải quyết được vấn đề hiện tại**. Code đơn giản dễ đọc, dễ sửa, ít bug hơn — phức tạp là kẻ thù của bảo trì.

```go
// ❌ OVER-ENGINEERING: chỉ cần kiểm tra số chẵn mà dựng cả "framework"
type NumberClassifier interface{ Classify(n int) string }
type EvenOddStrategy struct{}
func (e EvenOddStrategy) Classify(n int) string {
    if n%2 == 0 { return "even" }
    return "odd"
}
type ClassifierFactory struct{}
func (f ClassifierFactory) Create(kind string) NumberClassifier { /* ... */ return EvenOddStrategy{} }
// ...rồi dùng: factory.Create("evenodd").Classify(n) == "even"
```

```go
// ✅ KISS: yêu cầu là "n có chẵn không" → một dòng là đủ
func IsEven(n int) bool { return n%2 == 0 }
```

> ⚠ **Cảnh báo: KISS không phải cái cớ để code cẩu thả.** "Đơn giản" nghĩa là **không phức tạp hơn mức cần thiết** — không phải "viết ẩu cho nhanh", "đặt tên `x`, `tmp`", hay "nhét tất cả vào một hàm cho gọn". Một hàm 500 dòng *trông* "đơn giản" vì không có abstraction, nhưng nó *phức tạp về nhận thức* (khó hiểu, khó sửa). Đơn giản đo bằng **dễ hiểu/dễ sửa**, không phải "ít file/ít dòng".

> ❓ **"KISS với O (Open/Closed) chẳng phải mâu thuẫn? O bảo thêm abstraction, KISS bảo đừng."** Đúng là có lực kéo ngược nhau, và đó là điểm tinh tế. Cách hòa giải: thêm abstraction **khi đã có nhu cầu thật** (đã có ≥2 loại hình thật, hoặc chắc chắn sắp có), không thêm vì *tưởng tượng* sẽ cần. KISS + YAGNI ghìm không cho over-engineer; O xuất hiện đúng lúc nhu cầu mở rộng là thật. Xem mục 6.

> 🔁 **Dừng lại tự kiểm tra.** Một dev viết hệ thống config đọc được từ file, biến môi trường, database, và API từ xa — "để linh hoạt" — trong khi dự án chỉ đang đọc config từ một file YAML duy nhất. Vi phạm nguyên lý nào?
> <details><summary>Đáp án</summary>Vi phạm <b>KISS</b> (giải pháp phức tạp hơn vấn đề) và <b>YAGNI</b> (xây 3 nguồn config chưa ai cần — mục 5). Giải pháp KISS: đọc từ file YAML, đóng gói sau một hàm <code>LoadConfig()</code>; khi nào *thật sự* cần nguồn khác thì mở rộng (lúc đó nhu cầu là thật, áp O hợp lý).</details>

📝 **Tóm tắt mục 4.** KISS = chọn giải pháp **đơn giản nhất đủ giải quyết vấn đề hiện tại**; phức tạp là kẻ thù của bảo trì. "Đơn giản" = dễ hiểu/dễ sửa, **không** phải code ẩu hay ít dòng bằng mọi giá.

---

## 5. YAGNI — You Aren't Gonna Need It (Bạn sẽ không cần nó đâu)

💡 **Trực giác.** Đừng đóng sẵn cái kệ cho bộ sưu tập đĩa than mà bạn *dự định* sẽ mua "sau này" — phần lớn "sau này" không tới, và cái kệ chỉ chiếm chỗ, vướng víu. YAGNI nói: **đừng xây tính năng/khả năng cho đến khi thật sự cần**. Code chưa-cần vẫn tốn chi phí: viết, test, bảo trì, và *cản trở* việc thay đổi hướng đi.

```go
// ❌ VI PHẠM YAGNI: thêm hàng loạt tham số "phòng khi cần sau"
func SendEmail(
    to, subject, body string,
    cc, bcc []string,          // chưa ai dùng
    priority int,              // chưa ai dùng
    scheduledAt *time.Time,    // chưa ai dùng
    retryPolicy *RetryConfig,  // chưa ai dùng
    template string,           // chưa ai dùng
) error { /* ... */ }
// Mọi nơi gọi đều phải truyền nil/0 → API rối, khó test, khó đổi.
```

```go
// ✅ YAGNI: chỉ làm đúng thứ hôm nay cần — gửi một email đơn giản
func SendEmail(to, subject, body string) error { /* ... */ }
// Ngày thật sự cần cc/lập lịch → thêm lúc đó (lúc đó cũng biết CHÍNH XÁC cần gì).
```

> ⚠ **Lỗi thường gặp.** Lẫn lộn YAGNI với "không cần thiết kế / không cần nghĩ trước". YAGNI nhắm vào **tính năng và khả năng đầu cơ** ("biết đâu sau này cần đa ngôn ngữ / cần plugin / cần microservice"). Nó **không** xui bạn bỏ qua thiết kế tốt cho thứ *đang* làm, cũng không bảo viết code không thể mở rộng. Ranh giới: *không xây thứ chưa có yêu cầu*, nhưng *vẫn giữ code sạch để dễ thêm khi yêu cầu tới*.

> ❓ **"Nhưng thêm sau thì tốn refactor, làm sẵn chẳng phải rẻ hơn?"** Thường là ngược lại. Lý do: (1) phần lớn tính năng đầu cơ **không bao giờ được dùng** → chi phí xây + test + bảo trì là lãng phí thuần; (2) khi *thật sự* cần, bạn hiểu yêu cầu rõ hơn nhiều so với lúc đoán mò, nên làm đúng ngay; (3) code thừa làm hệ thống nặng và khó đổi hướng. Chi phí refactor một codebase *sạch* khi nhu cầu đến thường nhỏ hơn chi phí gánh code thừa suốt thời gian chờ.

> 🔁 **Dừng lại tự kiểm tra.** Khách yêu cầu một blog hiển thị bài viết tiếng Việt. Dev quyết định ngay từ đầu dựng hệ thống đa ngôn ngữ (i18n) đầy đủ "vì sau này có thể ra tiếng Anh". Đúng hay sai theo YAGNI? Khi nào thì hợp lý?
> <details><summary>Đáp án</summary><b>Sai theo YAGNI</b> nếu đa ngôn ngữ chỉ là phỏng đoán — tốn công xây i18n mà có thể không bao giờ dùng. <b>Hợp lý</b> nếu đã có yêu cầu/kế hoạch <i>cụ thể, gần</i> (vd "quý sau ra mắt bản tiếng Anh, đã ký hợp đồng"). Ranh giới là <i>nhu cầu thật và gần</i> vs <i>phỏng đoán xa</i>.</details>

📝 **Tóm tắt mục 5.** YAGNI = **không xây thứ chưa có yêu cầu thật**; tính năng đầu cơ phần lớn không dùng nhưng vẫn tốn chi phí và cản trở thay đổi. YAGNI nhắm vào *tính năng thừa*, không phải *thiết kế tốt* cho thứ đang làm.

---

## 6. Khi các nguyên lý mâu thuẫn — cân nhắc thế nào

💡 **Trực giác.** Nguyên lý là các *lực kéo* theo hướng khác nhau, không phải luật tuyệt đối. SOLID/DRY kéo về phía *trừu tượng & linh hoạt*; KISS/YAGNI kéo về phía *đơn giản & làm đúng thứ cần ngay*. Kỹ năng thiết kế tốt là **cân bằng các lực này theo ngữ cảnh**, không phải tuân thủ máy móc một phía.

Các xung đột điển hình và cách hòa giải:

| Mâu thuẫn | Cách cân nhắc |
|---|---|
| **DRY vs đơn giản** | Hai đoạn giống nhau nhưng gom lại tạo abstraction rối hơn cả lặp → ưu tiên KISS, chấp nhận lặp. Hỏi "có cùng lý do thay đổi không?". |
| **Open/Closed vs YAGNI** | Đừng thêm interface/abstraction cho biến thể *tưởng tượng*. Chờ tới khi có ≥2 biến thể thật (rule of three) rồi mới mở. |
| **SOLID (nhiều lớp nhỏ) vs KISS** | Tách quá nhỏ → "lasagna code" hàng chục file cho một việc đơn giản, cũng khó hiểu. Tách tới mức *đủ rõ trách nhiệm*, không hơn. |

**Nguyên tắc trọng tài (tie-breaker):** khi phân vân, quay về câu hỏi gốc ở mục 1 — *"lựa chọn nào làm lần thay đổi tiếp theo rẻ hơn?"* — và mặc định nghiêng về **đơn giản** (KISS/YAGNI). Lý do: thêm abstraction *sau* khi nhu cầu rõ thì dễ; gỡ abstraction thừa *đã ăn sâu* thì khó. Dễ thêm hơn dễ gỡ → khởi đầu đơn giản an toàn hơn.

> ⚠ **Lỗi thường gặp.** Tranh cãi "nguyên lý X đúng hay nguyên lý Y đúng" như thể chỉ một cái thắng. Không nguyên lý nào "thắng" tuyệt đối — chúng là công cụ cho các tình huống khác nhau. Câu hỏi đúng luôn là: *trong ngữ cảnh cụ thể này, lựa chọn nào giảm chi phí dài hạn nhiều nhất?*

> 🔁 **Dừng lại tự kiểm tra.** Một dev nói: "Tôi đã DRY-hóa nên gom 3 đoạn validate giống nhau vào một hàm có 5 tham số cờ (flag) bật/tắt từng quy tắc." Code giờ DRY hơn nhưng khó đọc hơn hẳn. Đánh giá?
> <details><summary>Đáp án</summary>Đây là DRY <i>thắng sai</i> KISS. Một hàm với 5 cờ điều khiển hành vi là dấu hiệu trộn nhiều trách nhiệm (vi phạm cả <b>S</b>). Nếu ba validate đổi vì những lý do khác nhau → đó là trùng lặp ngẫu nhiên, nên <i>để lặp</i> cho đơn giản, hoặc chỉ gom phần <i>thật sự</i> chung. Mục tiêu là chi phí thay đổi thấp, không phải "ít dòng lặp".</details>

📝 **Tóm tắt mục 6.** Nguyên lý là *lực kéo*, không phải luật: SOLID/DRY kéo về linh hoạt, KISS/YAGNI kéo về đơn giản. Khi mâu thuẫn, hỏi "lựa chọn nào làm lần sửa sau rẻ nhất?" và mặc định nghiêng về đơn giản — vì *thêm* abstraction dễ hơn *gỡ* abstraction thừa.

---

## 7. Bài tập

1. Với mỗi chữ trong SOLID, viết tên đầy đủ và **một câu** mô tả cốt lõi. Sau đó cho biết hai chữ nào thường đi cùng nhau và vì sao.
2. Đoạn code dưới vi phạm nguyên lý SOLID nào? Viết lại cho đúng (pseudocode hoặc Go):
   ```go
   func ProcessPayment(method string, amount float64) {
       if method == "card" { /* xử lý thẻ */ }
       else if method == "paypal" { /* xử lý paypal */ }
       // thêm "momo" phải sửa hàm này
   }
   ```
3. Hai hàm `validateEmail` và `validatePhone` tình cờ có 4 dòng đầu giống nhau (đều trim khoảng trắng và kiểm tra rỗng). Một đồng nghiệp đòi gom chúng "cho DRY". Bạn đồng ý hay không? Đặt câu hỏi quyết định.
4. Một dev mới được giao viết hàm "tính tổng một mảng số nguyên" và nộp code gồm: một interface `Aggregator`, một `SumStrategy`, một `AggregatorFactory` và 3 file. Đây là vi phạm nguyên lý nào? Viết phiên bản KISS.
5. Sản phẩm hiện chỉ lưu file lên ổ đĩa local. PM nói "có thể sang năm sẽ cần lưu lên cả AWS S3 và Google Cloud, làm sẵn đi cho khỏi sửa". Theo YAGNI thì nên làm gì? Trường hợp nào đề nghị của PM lại hợp lý?
6. (Tổng hợp) Cho tình huống: bạn thấy 3 đoạn code gửi thông báo (email, SMS, push) lặp ~70% logic. Nêu cách áp dụng đồng thời SOLID + DRY mà vẫn tôn trọng KISS/YAGNI. Khi nào bạn *không* nên trừu tượng hóa?

## Lời giải chi tiết

**Bài 1.** **S** — Single Responsibility: mỗi đơn vị chỉ một lý do để thay đổi. **O** — Open/Closed: mở để mở rộng, đóng với sửa đổi. **L** — Liskov Substitution: lớp con thay thế được lớp cha mà không phá hợp đồng. **I** — Interface Segregation: nhiều interface nhỏ chuyên biệt hơn một interface to. **D** — Dependency Inversion: phụ thuộc vào trừu tượng (interface), không vào lớp cụ thể.
Hai chữ đi cùng nhau: **L và I** — khi tách interface nhỏ (I), mỗi lớp con chỉ hứa đúng thứ nó làm được, nhờ đó không phải ném panic ở method không hỗ trợ → không vi phạm L. (Ngoài ra **O thường đạt nhờ D**: thêm biến thể mới qua interface = mở rộng không sửa code cũ.)

**Bài 2.** Vi phạm **Open/Closed (O)**: thêm phương thức thanh toán mới buộc sửa hàm `ProcessPayment` đang chạy → rủi ro phá `card`/`paypal`. Sửa bằng interface:
```go
type PaymentMethod interface{ Pay(amount float64) error }

type CardPayment struct{}
func (c CardPayment) Pay(a float64) error { /* xử lý thẻ */ return nil }

type PaypalPayment struct{}
func (p PaypalPayment) Pay(a float64) error { /* xử lý paypal */ return nil }

// Thêm Momo = THÊM struct mới, không đụng hàm cũ:
type MomoPayment struct{}
func (m MomoPayment) Pay(a float64) error { /* xử lý momo */ return nil }

func ProcessPayment(method PaymentMethod, amount float64) error {
    return method.Pay(amount) // không còn if/else theo string
}
```
(Cũng áp dụng **D**: `ProcessPayment` phụ thuộc vào interface `PaymentMethod`, không vào lớp cụ thể.)

**Bài 3.** **Không vội đồng ý.** Câu hỏi quyết định: *"Hai validate này có thay đổi cùng nhau vì cùng một lý do không?"* — và *"phần giống nhau là kiến thức nghiệp vụ chung hay chỉ tình cờ trùng?"*. 4 dòng đầu (trim + check rỗng) là tiền-xử-lý chung vô hại, có thể gom thành một helper `normalizeInput()`. Nhưng *đừng* gom toàn bộ `validateEmail`/`validatePhone` làm một, vì luật email và luật phone là hai quy tắc nghiệp vụ độc lập — gom sẽ tạo trùng lặp giả. Kết luận: gom phần *thật sự* chung (chuẩn hóa input), giữ riêng phần đặc thù.

**Bài 4.** Vi phạm **KISS** (giải pháp phức tạp hơn vấn đề) và **YAGNI** (dựng factory/strategy cho nhu cầu chưa tồn tại). Phiên bản KISS:
```go
func Sum(nums []int) int {
    total := 0
    for _, n := range nums { total += n }
    return total
}
```
Một hàm là đủ. Chỉ khi *thật sự* xuất hiện nhu cầu nhiều kiểu tổng hợp khác nhau (sum, average, max… cần thay nhau lúc chạy) mới cân nhắc abstraction — lúc đó nhu cầu là thật.

**Bài 5.** Theo **YAGNI**, **không xây sẵn** S3/GCloud khi chưa có yêu cầu chắc chắn. Nhưng vẫn áp **D** ở mức nhẹ: đặt một interface `FileStore { Save(...) }`, hiện chỉ cài `LocalDiskStore`. Như vậy code nghiệp vụ không hàn cứng vào ổ đĩa, *và* không phải xây 3 implementation thừa. Khi nào đề nghị của PM hợp lý: nếu việc lên S3 là **kế hoạch chắc chắn, gần** (đã có quyết định, ngày ra mắt, ràng buộc hợp đồng) — lúc đó nhu cầu là thật, làm sớm hợp lý. Ranh giới: *nhu cầu thật & gần* vs *phỏng đoán "có thể sang năm"*.

**Bài 6.** Áp dụng:
- **DRY + SOLID**: định nghĩa interface `Notifier { Send(msg Message) error }`; ba struct `EmailNotifier`, `SMSNotifier`, `PushNotifier` cài interface đó (mỗi cái = một trách nhiệm — **S**); phần ~70% logic chung (dựng nội dung, ghi log, xử lý lỗi) gom vào một helper hoặc một struct cơ sở mà ba notifier cùng dùng (**DRY** theo kiến thức thật chung). Thêm kênh mới (vd Zalo) = thêm struct, không sửa code cũ (**O**), và nơi gọi nhận `Notifier` qua interface (**D**).
- **Tôn trọng KISS/YAGNI**: chỉ gom phần *thật sự* chung và *thật sự* sẽ thay đổi cùng nhau; đừng tạo lớp cơ sở khổng lồ với chục cờ cấu hình. **Khi nào KHÔNG nên trừu tượng hóa**: nếu hiện chỉ có *một* kênh (vd chỉ email) và không có dấu hiệu sắp thêm — thì một hàm `SendEmail` đơn giản là đủ (YAGNI), interface `Notifier` chỉ là phức tạp thừa cho tới khi xuất hiện kênh thứ hai thật.

---

## 8. Code & Minh họa

- [visualization.html](./visualization.html) — 3 mô-đun tương tác: (1) **thẻ SOLID** — bấm mỗi nguyên lý để xem code *vi phạm* vs *đã sửa* cạnh nhau; (2) **quiz "đoán nguyên lý bị vi phạm"** — đọc đoạn code, chọn nguyên lý đúng, có giải thích; (3) **toggle Over-engineered ↔ KISS** — so sánh trực quan giải pháp phức tạp thừa với giải pháp đơn giản đủ dùng.

## 9. Bài tiếp theo

- [Lesson 03 — Coupling & Cohesion](../lesson-03-coupling-cohesion/) — hai thước đo định lượng cho "thiết kế tốt": các nguyên lý ở bài này (đặc biệt S và D) chính là cách *giảm coupling, tăng cohesion*.
- [Lesson 04 — Design Patterns](../lesson-04-design-patterns/) — các *giải pháp mẫu* (Strategy, Factory, Adapter…) là công cụ cụ thể để hiện thực SOLID/DRY mà ta vừa học.
- Liên quan: vì sao "phát hiện sớm & sửa rẻ" lại quan trọng — xem [Foundations — SDLC & đường cong chi phí sửa lỗi](../../../01-Foundations/lesson-01-sdlc-engineer-role/).
