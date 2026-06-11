// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: SoftwareEngineering/02-Design-Quality/lesson-04-design-patterns/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 04 — Design patterns (mẫu thiết kế GoF)

## Mục tiêu

- Hiểu **design pattern là gì**: một giải pháp *tái sử dụng* đã được kiểm chứng cho một bài toán thiết kế *lặp đi lặp lại* — và **không phải** đoạn code copy-paste.
- Nắm ba nhóm pattern kinh điển của **GoF** (Gang of Four): **Creational** (khởi tạo), **Structural** (cấu trúc), **Behavioral** (hành vi).
- Với mỗi pattern tiêu biểu, trả lời được: **nó giải vấn đề gì**, **dùng thế nào**, và quan trọng nhất — **khi nào KHÔNG nên dùng**.
- Tránh được **pattern-itis** (lạm dụng pattern): pattern là *công cụ*, không phải *mục tiêu*. Ưu tiên giải pháp đơn giản nhất chạy được.

## Kiến thức tiền đề

- [Lesson 02 — Nguyên lý thiết kế (SOLID, KISS, YAGNI, DRY)](../lesson-02-design-principles/) — pattern là cách *hiện thực hóa* các nguyên lý này; nhiều pattern sinh ra để thỏa Open/Closed và Dependency Inversion.
- [Lesson 03 — Coupling & cohesion](../lesson-03-coupling-cohesion/) — gần như mọi pattern đều nhằm **giảm coupling** (nới lỏng phụ thuộc) hoặc **tăng cohesion** (gom trách nhiệm). Hiểu hai đại lượng này là điều kiện để hiểu *vì sao* một pattern tốt.
- [Programming — Design patterns trong Go](../../../Programming/lesson-39-design-patterns-go/) — cách **hiện thực** các pattern bằng cú pháp Go cụ thể (interface, struct, closure).

> 💡 **Ranh giới bài này vs bài Programming.** Bài [Programming/lesson-39](../../../Programming/lesson-39-design-patterns-go/) trả lời câu hỏi *"viết pattern này bằng Go ra sao?"* — cú pháp, idiom, code chạy được. Bài **này** trả lời câu hỏi *cao hơn một tầng*, **độc lập ngôn ngữ**: *"vấn đề thiết kế nào sinh ra pattern này? khi nào nên rút nó ra khỏi hộp đồ nghề, khi nào nên để yên?"*. Một lập trình viên Java, Python hay Go đều gặp cùng những bài toán đó — pattern là *từ vựng chung* để bàn về giải pháp. Học khái niệm ở đây, học cú pháp ở bài Programming.

---

## 1. Design pattern là gì — và không là gì

💡 **Trực giác.** Hãy nghĩ tới **mẫu nhà của kiến trúc sư**. Khi xây nhà, không ai phát minh lại "cầu thang" hay "mái dốc thoát nước" mỗi lần — đó là các *mẫu* đã được chứng minh, có tên gọi, ai cũng hiểu. Design pattern trong phần mềm cũng vậy: khi nhiều người độc lập gặp **cùng một bài toán thiết kế** và đi tới **cùng một dạng giải pháp**, ta đặt tên cho dạng giải pháp đó. Lần sau gặp lại, không cần nghĩ lại từ đầu — chỉ cần nói "dùng Strategy ở đây" là cả nhóm hiểu.

**Định nghĩa.** Một *design pattern* gồm 3 phần:

- **(a) Là gì** — một mô tả *trừu tượng* về cách tổ chức các class/object để giải một bài toán thiết kế lặp lại. Nó mô tả *vai trò* và *quan hệ* giữa các thành phần, không phải code cụ thể.
- **(b) Vì sao tồn tại** — để (1) **tái sử dụng kinh nghiệm** thay vì mỗi người tự mò; (2) tạo **từ vựng chung** ("đây là Observer") giúp giao tiếp nhanh; (3) hướng tới các thiết kế **dễ mở rộng, ít coupling** đã được kiểm chứng qua thời gian.
- **(c) Ví dụ trực giác.** Pattern **Strategy**: "tôi cần đổi *thuật toán* lúc chạy". Mô tả trừu tượng: tách thuật toán ra sau một interface, client giữ một tham chiếu tới interface đó. Ở Go là \`interface\`, ở Java là \`interface\`, ở Python có thể là một hàm truyền vào — *cùng một ý tưởng*, ba cách viết.

> ⚠ **Pattern KHÔNG phải là code copy-paste.** Đây là hiểu lầm tai hại nhất. Pattern là *khuôn mẫu tư duy*, không phải một file \`Strategy.go\` bạn dán vào dự án. Hai hiện thực của cùng pattern có thể trông rất khác nhau tùy ngôn ngữ và ngữ cảnh. Nếu bạn đang "copy code mẫu rồi sửa tên", bạn đang dùng sai. Đọc *vấn đề* mà pattern giải, rồi tự dựng giải pháp khớp ngữ cảnh của mình.

> ❓ **"Vậy pattern khác gì với một thư viện hay framework?"** Thư viện là *code có sẵn* bạn gọi (\`sort.Sort(...)\`). Pattern là *ý tưởng tổ chức* bạn tự hiện thực. Một framework có thể *dùng* nhiều pattern bên trong (vd middleware HTTP dùng Decorator), nhưng bản thân pattern không phải thứ bạn \`import\`.

> ⚠ **Pattern-itis — bệnh lạm dụng pattern.** Người mới học pattern thường mắc bệnh "có búa thì thấy gì cũng là đinh": nhét Factory, Singleton, Observer vào mọi chỗ kể cả khi một hàm 5 dòng là đủ. Hậu quả: code phình to, nhiều tầng gián tiếp (indirection) vô nghĩa, khó đọc hơn cả khi không có pattern. **Pattern thêm vào một cái giá: độ phức tạp.** Chỉ "trả" cái giá đó khi bài toán *thật sự* cần sự linh hoạt mà pattern mang lại (nối tiếp KISS/YAGNI ở [Lesson 02](../lesson-02-design-principles/)).

> 🔁 **Dừng lại tự kiểm tra.** Một đồng nghiệp nói "tôi đã *cài đặt pattern Singleton* bằng cách copy file \`singleton.go\` từ dự án cũ sang". Cách diễn đạt này sai ở đâu?
> <details><summary>Đáp án</summary>Sai ở chỗ coi pattern như <b>một file code dán được</b>. Singleton là <i>ý tưởng</i> "đảm bảo chỉ có một instance và cho điểm truy cập toàn cục". Hiện thực đúng tùy ngữ cảnh — ở Go thường là một biến package-level + <code>sync.Once</code>, hoàn toàn không cần "file singleton.go". Hơn nữa Singleton là pattern nên cân nhắc kỹ (xem mục 3) — copy mù sẽ kéo theo cả nhược điểm của nó.</details>

📝 **Tóm tắt mục 1.** Design pattern = giải pháp *trừu tượng, tái sử dụng* cho bài toán thiết kế lặp lại + *từ vựng chung* để giao tiếp. **Không** phải code copy-paste, **không** phải thư viện. Mỗi pattern thêm một cái giá là độ phức tạp — chỉ dùng khi bài toán thực sự đòi hỏi (cảnh giác pattern-itis).

---

## 2. Ba nhóm GoF — bản đồ tổng quan

💡 **Trực giác.** "Gang of Four" (GoF — bốn tác giả cuốn *Design Patterns*, 1994) chia 23 pattern gốc thành ba nhóm theo **câu hỏi mà nhóm đó trả lời**:

| Nhóm | Câu hỏi cốt lõi | Lo về việc | Pattern tiêu biểu |
|------|-----------------|------------|-------------------|
| **Creational** (Khởi tạo) | *Tạo object thế nào* cho linh hoạt, giấu chi tiết khởi tạo? | Quá trình \`new\` | Factory Method, Builder, Singleton, Abstract Factory, Prototype |
| **Structural** (Cấu trúc) | *Lắp ghép* class/object thành cấu trúc lớn ra sao? | Quan hệ "có-một" giữa các phần | Adapter, Decorator, Facade, Composite, Proxy |
| **Behavioral** (Hành vi) | Các object *giao tiếp & phân chia trách nhiệm* thế nào? | Luồng điều khiển & tương tác | Strategy, Observer, Template Method, Command, State |

> 💡 **Cách nhớ.** *Creational* = lúc **sinh ra** object. *Structural* = lúc **lắp** chúng lại. *Behavioral* = lúc chúng **làm việc & nói chuyện** với nhau. Mỗi pattern là một câu trả lời cho một biến thể của một trong ba câu hỏi đó.

> ❓ **"Phải học hết 23 pattern không?"** Không. Trong thực tế, chừng 8–10 pattern xuất hiện *thường xuyên*; số còn lại hiếm hoặc đã được ngôn ngữ/framework hiện đại hấp thụ (vd Go có closure → ít cần Command "thủ công"). Bài này chọn 2–3 pattern *đáng giá nhất* mỗi nhóm. Học sâu vài cái quan trọng hơn lướt qua cả 23.

📝 **Tóm tắt mục 2.** GoF chia pattern theo việc chúng lo: **Creational** (tạo object), **Structural** (lắp object), **Behavioral** (object giao tiếp). Đừng cố học hết 23 — nắm vững nhóm pattern hay gặp.

---

## 3. Creational — kiểm soát việc tạo object

### 3.1 Factory Method — tách "quyết định tạo cái gì" khỏi "dùng nó"

💡 **Vấn đề cụ thể.** Bạn viết module xuất báo cáo. Code rải rác \`report := &PDFReport{}\` ở khắp nơi. Hôm sau sếp muốn thêm \`CSVReport\`, \`HTMLReport\`, và chọn loại theo cấu hình runtime. Nếu giữ \`new PDFReport()\` cứng (hard-code), bạn phải sửa \`if/else\` ở **mọi chỗ** đang tạo report → vi phạm Open/Closed.

**Pattern giải thế nào.** Đưa việc *quyết định tạo loại nào* vào một hàm/method "factory" trả về **interface chung**. Client chỉ phụ thuộc interface \`Report\`, không biết class cụ thể.

\`\`\`
            ┌─────────────┐
client ───► │  Report     │  (interface: Render())
            └─────────────┘
                  ▲   ▲   ▲
        PDFReport─┘   │   └─HTMLReport
                  CSVReport
              ▲
   NewReport(kind) ──► trả về một trong số đó
\`\`\`

\`\`\`go
type Report interface { Render() []byte }

// Factory: client chỉ gọi cái này, không "new" trực tiếp
func NewReport(kind string) (Report, error) {
    switch kind {
    case "pdf":  return &PDFReport{}, nil
    case "csv":  return &CSVReport{}, nil
    default:     return nil, fmt.Errorf("loại không hỗ trợ: %s", kind)
    }
}
// Thêm loại mới = thêm 1 case + 1 struct. Client KHÔNG đổi.
\`\`\`

⚠ **Khi nào KHÔNG nên dùng.** Khi chỉ có **một** loại object và không có dấu hiệu sẽ thêm loại. Lúc đó \`&PDFReport{}\` trực tiếp rõ ràng hơn — factory chỉ thêm một tầng gián tiếp thừa. YAGNI: đừng dựng factory "phòng xa" cho loại thứ hai chưa tồn tại.

### 3.2 Builder — dựng object phức tạp từng bước

💡 **Vấn đề cụ thể.** Một \`HTTPRequest\` có 10 tham số: URL (bắt buộc), method, headers, body, timeout, retries... Constructor \`NewRequest(url, method, headers, body, timeout, retries, ...)\` dài dằng dặc, gọi xong không ai đọc nổi \`NewRequest("...", "GET", nil, nil, 30, 3, true, false)\` — số \`true/false\` cuối là gì? (gọi là **telescoping constructor** anti-pattern).

**Pattern giải thế nào.** Tách việc dựng object thành **chuỗi bước có tên**, mỗi bước set một phần, kết thúc bằng \`.Build()\`:

\`\`\`go
req := NewRequestBuilder("https://api.example.com").
    Method("POST").
    Header("Authorization", "Bearer x").
    Timeout(30 * time.Second).
    Retries(3).
    Build()
// Đọc rõ từng thứ là gì; phần không set dùng mặc định.
\`\`\`

⚠ **Khi nào KHÔNG nên dùng.** Object chỉ có 2–3 trường đơn giản → constructor thường hoặc struct literal \`Foo{A: 1, B: 2}\` (Go có named fields) đã đủ rõ. Builder chỉ đáng khi *nhiều* tham số tùy chọn + cần validate trước khi tạo. Trong Go, "functional options" thường thay Builder gọn hơn.

### 3.3 Singleton — chỉ một instance duy nhất (DÙNG THẬN TRỌNG)

💡 **Vấn đề cụ thể.** Một connection pool tới database nên có **đúng một** instance dùng chung toàn ứng dụng — tạo nhiều pool sẽ lãng phí kết nối và sai logic.

**Pattern giải thế nào.** Đảm bảo class chỉ có một instance + cung cấp điểm truy cập toàn cục. Trong Go, idiom an toàn với goroutine:

\`\`\`go
var (
    instance *Pool
    once     sync.Once
)
func GetPool() *Pool {
    once.Do(func() { instance = newPool() }) // chỉ chạy đúng 1 lần
    return instance
}
\`\`\`

> ⚠ **Singleton bị xem là "anti-pattern" trong nhiều trường hợp — cảnh báo mạnh.** Lý do:
> - Nó là **biến toàn cục trá hình** → tạo coupling ẩn: bất kỳ code nào cũng gọi được, khó biết ai phụ thuộc ai (ngược với [Lesson 03 — giảm coupling](../lesson-03-coupling-cohesion/)).
> - **Khó test**: không thay được bằng mock/fake vì truy cập trực tiếp toàn cục, không inject qua tham số.
> - Trạng thái dùng chung dễ gây bug đồng thời (concurrency).
>
> **Thay thế ưu tiên:** *dependency injection* — tạo instance một lần ở \`main()\` rồi **truyền nó vào** các thành phần cần (qua tham số/constructor). Vẫn "một instance" nhưng không có truy cập toàn cục ngầm, và test thay được dễ dàng.

⚠ **Khi nào KHÔNG nên dùng.** Gần như luôn cân nhắc DI trước. Chỉ dùng Singleton khi tính "một-instance" là *bất biến tuyệt đối* của domain và DI gây phiền phức không tương xứng (vd logger toàn cục đơn giản).

> 🔁 **Dừng lại tự kiểm tra.** Bạn cần một \`ConfigLoader\` đọc file cấu hình một lần lúc khởi động rồi dùng khắp nơi. Singleton hay DI?
> <details><summary>Đáp án</summary><b>DI</b> trong hầu hết trường hợp: tải config ở <code>main()</code>, lưu vào một struct, rồi <i>truyền</i> config (hoặc các giá trị nó chứa) vào những thành phần cần. Như vậy test có thể truyền config giả, và phụ thuộc của mỗi thành phần <i>hiện rõ</i> trên chữ ký hàm — không có truy cập toàn cục ngầm. Singleton chỉ làm coupling khó nhìn hơn.</details>

📝 **Tóm tắt mục 3.** Creational kiểm soát việc tạo object. **Factory Method** tách "quyết định tạo gì" khỏi "dùng nó" (Open/Closed). **Builder** dựng object nhiều tham số từng bước, đọc được. **Singleton** đảm bảo một instance — nhưng *cảnh giác*, thường nên thay bằng dependency injection.

---

## 4. Structural — lắp ghép object thành cấu trúc lớn

### 4.1 Adapter — làm hai interface không khớp nói chuyện được

💡 **Vấn đề cụ thể.** Code của bạn gọi \`PaymentGateway.Charge(amount)\`. Nay tích hợp một thư viện thanh toán bên thứ ba chỉ có \`stripe.CreateCharge(cents int64, currency string)\` — *chữ ký khác hẳn*. Bạn không sửa được code thư viện, mà cũng không muốn sửa toàn bộ code đang gọi \`Charge\`.

**Pattern giải thế nào.** Viết một lớp **adapter** "bọc" thư viện và *trình bày* nó dưới interface mà code bạn mong đợi:

\`\`\`
client ──► PaymentGateway (interface bạn định nghĩa)
                  ▲
          StripeAdapter ──► gọi stripe.CreateCharge(...)
          (chuyển amount→cents, USD→"usd")
\`\`\`

\`\`\`go
type StripeAdapter struct{ client *stripe.Client }
func (a *StripeAdapter) Charge(amount float64) error {
    cents := int64(amount * 100)          // chuyển đổi cho khớp
    return a.client.CreateCharge(cents, "usd")
}
\`\`\`

⚠ **Khi nào KHÔNG nên dùng.** Khi bạn *kiểm soát được* cả hai phía interface — lúc đó nên sửa cho khớp trực tiếp thay vì thêm lớp adapter. Adapter dành cho mã *không sửa được* (thư viện ngoài, hệ thống cũ).

### 4.2 Decorator — thêm hành vi mà không sửa class gốc

💡 **Vấn đề cụ thể.** Bạn có một \`http.Handler\` xử lý request. Muốn thêm *logging*, rồi *rate-limit*, rồi *gzip nén*. Nếu nhét hết vào handler gốc → nó phình to, vi phạm Single Responsibility, và muốn bật/tắt từng thứ thì phải sửa code.

**Pattern giải thế nào.** Mỗi tính năng phụ là một lớp **bọc** quanh đối tượng, *cùng interface*, làm thêm việc của mình rồi gọi tiếp lớp bên trong. Xếp chồng tùy ý:

\`\`\`
gzip( rateLimit( logging( handler ) ) )
 │        │          │         └ xử lý chính
 │        │          └ ghi log
 │        └ giới hạn tần suất
 └ nén response
\`\`\`

\`\`\`go
func Logging(next http.Handler) http.Handler {
    return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
        log.Println(r.Method, r.URL)
        next.ServeHTTP(w, r) // gọi tiếp lớp trong
    })
}
// handler = Gzip(RateLimit(Logging(core)))  ← xếp chồng linh hoạt
\`\`\`

Đây chính là *middleware* — Decorator là pattern nền của hầu hết middleware HTTP.

⚠ **Khi nào KHÔNG nên dùng.** Khi chỉ có một hành vi phụ cố định, không bao giờ tổ hợp/đổi thứ tự → cứ viết thẳng vào hàm. Decorator chồng quá nhiều lớp cũng làm khó debug (stack trace dài), nên đừng lạm dụng.

### 4.3 Facade — một cửa đơn giản che hệ thống con phức tạp

💡 **Vấn đề cụ thể.** Để "đặt hàng", client phải gọi \`inventory.Check()\`, \`payment.Charge()\`, \`shipping.Schedule()\`, \`email.SendConfirm()\` đúng thứ tự, đúng cách. Mọi nơi đặt hàng phải lặp lại chuỗi này → dễ sai, coupling cao với 4 hệ thống con.

**Pattern giải thế nào.** Cung cấp **một interface đơn giản** (\`OrderFacade.PlaceOrder(...)\`) che giấu sự phức tạp bên trong:

\`\`\`go
func (f *OrderFacade) PlaceOrder(o Order) error {
    if err := f.inventory.Check(o); err != nil { return err }
    if err := f.payment.Charge(o); err != nil { return err }
    f.shipping.Schedule(o)
    f.email.SendConfirm(o)
    return nil
}
// client chỉ gọi PlaceOrder — không biết 4 hệ thống con bên trong.
\`\`\`

⚠ **Khi nào KHÔNG nên dùng.** Khi hệ thống con vốn đã đơn giản (1–2 lời gọi) → facade chỉ thêm tầng vô nghĩa. Cũng tránh facade "Chúa" gom *mọi* thứ vào một class khổng lồ (god object) — đó lại là cohesion thấp.

> 🔁 **Dừng lại tự kiểm tra.** Phân biệt Adapter, Decorator, Facade — cả ba đều "bọc" một thứ khác. Điểm khác nhau cốt lõi là gì?
> <details><summary>Đáp án</summary><b>Mục đích khác nhau:</b> <b>Adapter</b> đổi <i>hình dạng interface</i> (làm cái không khớp thành khớp) — interface ra ≠ interface vào. <b>Decorator</b> <i>giữ nguyên interface</i> nhưng <i>thêm hành vi</i>, xếp chồng được. <b>Facade</b> tạo một interface <i>mới, đơn giản hơn</i> che một <i>tập</i> nhiều thành phần phức tạp. Tóm: Adapter = "khớp lại", Decorator = "thêm vào", Facade = "đơn giản hóa nhiều thứ thành một".</details>

📝 **Tóm tắt mục 4.** Structural lắp object thành cấu trúc. **Adapter** làm hai interface không khớp nói chuyện được. **Decorator** thêm hành vi xếp chồng mà không sửa gốc (nền của middleware). **Facade** che một hệ con phức tạp sau một cửa đơn giản.

---

## 5. Behavioral — object giao tiếp & phân chia trách nhiệm

### 5.1 Strategy — đổi thuật toán lúc chạy

💡 **Vấn đề cụ thể.** Hàm tính phí ship có nhiều cách: theo khoảng cách, theo trọng lượng, đồng giá, miễn phí cho VIP. Nếu viết một hàm \`calcShipping\` với chuỗi \`if/else/switch\` khổng lồ → mỗi lần thêm cách tính phải sửa hàm đó (vi phạm Open/Closed), và không đổi được cách tính lúc chạy theo từng khách.

**Pattern giải thế nào.** Tách *mỗi thuật toán* ra sau một interface chung; client giữ một tham chiếu và *đổi được lúc chạy*:

\`\`\`go
type ShippingStrategy interface { Cost(o Order) float64 }

type ByWeight struct{}
func (ByWeight) Cost(o Order) float64 { return o.Weight * 2.5 }
type FlatRate struct{}
func (FlatRate) Cost(o Order) float64 { return 30 }

type Cart struct{ strategy ShippingStrategy }
func (c *Cart) SetStrategy(s ShippingStrategy) { c.strategy = s } // đổi runtime
func (c *Cart) Ship(o Order) float64           { return c.strategy.Cost(o) }
// Thêm cách tính = thêm 1 struct. Cart KHÔNG đổi.
\`\`\`

⚠ **Khi nào KHÔNG nên dùng.** Khi chỉ có một thuật toán và không có dấu hiệu sẽ thêm → một hàm thường là đủ. Trong Go, nếu strategy chỉ là một hàm đơn lẻ, có thể truyền thẳng \`func(Order) float64\` thay vì dựng cả interface (Strategy "nhẹ").

### 5.2 Observer — thông báo cho nhiều thứ khi có sự kiện

💡 **Vấn đề cụ thể.** Khi đơn hàng chuyển sang "đã thanh toán", cần: gửi email, cập nhật kho, ghi analytics, thông báo cho admin. Nếu \`Order.MarkPaid()\` tự gọi cả 4 → nó coupling chặt với 4 module, thêm việc mới phải sửa lại nó mỗi lần.

**Pattern giải thế nào.** Đối tượng *subject* giữ danh sách *observer* đăng ký; khi sự kiện xảy ra, nó *phát* (notify) cho tất cả mà **không cần biết** chúng là ai:

\`\`\`go
type Observer interface { OnPaid(o Order) }
type Order struct{ observers []Observer }
func (o *Order) Subscribe(ob Observer) { o.observers = append(o.observers, ob) }
func (o *Order) MarkPaid() {
    // ... logic thanh toán ...
    for _, ob := range o.observers { ob.OnPaid(*o) } // phát cho tất cả
}
// Thêm phản ứng mới = đăng ký thêm observer. Order KHÔNG đổi.
\`\`\`

⚠ **Khi nào KHÔNG nên dùng.** Khi chỉ có một "người nghe" cố định → gọi thẳng đơn giản hơn. Observer cũng dễ tạo luồng điều khiển *khó lần theo* (sự kiện kích sự kiện), nên cẩn thận khi chuỗi notify sâu. Ở quy mô lớn, message queue / event bus thường thay thế.

### 5.3 Template Method — cố định khung, để con điền chỗ trống

💡 **Vấn đề cụ thể.** Quy trình import dữ liệu luôn có *khung* giống nhau: mở file → đọc → *parse* → validate → lưu. Nhưng bước *parse* khác nhau giữa CSV, JSON, XML. Nếu copy cả quy trình cho mỗi định dạng → trùng lặp 80% code, sửa khung một chỗ phải sửa khắp nơi.

**Pattern giải thế nào.** Định nghĩa **khung thuật toán** (template) ở một chỗ, để các bước *thay đổi* thành "lỗ trống" cho phần cụ thể điền vào. Trong ngôn ngữ OOP cổ điển dùng abstract method; trong Go thường dựng bằng cách *truyền hàm parse* vào khung:

\`\`\`go
// Khung cố định — chỉ bước parse là tham số hóa
func Import(r io.Reader, parse func([]byte) ([]Row, error)) error {
    data, _ := io.ReadAll(r)
    rows, err := parse(data)        // ← chỗ trống do client điền
    if err != nil { return err }
    if err := validate(rows); err != nil { return err }
    return save(rows)
}
Import(csvFile, parseCSV)   // dùng lại khung, đổi parse
Import(jsonFile, parseJSON)
\`\`\`

⚠ **Khi nào KHÔNG nên dùng.** Khi các "biến thể" thực ra khác nhau quá nhiều, ép chung một khung làm khung đầy điều kiện đặc biệt → lúc đó tách hẳn ra rõ hơn. Template Method (kiểu kế thừa cổ điển) cũng tạo coupling chặt cha-con; trong Go ưu tiên *truyền hàm* (composition) như trên.

> 🔁 **Dừng lại tự kiểm tra.** Strategy và Template Method đều cho phép "đổi một phần hành vi". Khác nhau ở đâu?
> <details><summary>Đáp án</summary><b>Strategy</b> đổi <i>toàn bộ một thuật toán</i>, chọn được <i>lúc chạy</i> (đổi đối tượng strategy). <b>Template Method</b> giữ <i>khung cố định</i>, chỉ cho biến đổi <i>một vài bước</i> bên trong, thường <i>cố định lúc dựng</i> chứ ít đổi runtime. Tóm: Strategy = thay cả công thức; Template Method = giữ công thức, đổi vài nguyên liệu.</details>

📝 **Tóm tắt mục 5.** Behavioral lo cách object giao tiếp. **Strategy** đổi cả thuật toán lúc chạy. **Observer** phát sự kiện cho nhiều người nghe mà không coupling. **Template Method** cố định khung, để phần cụ thể điền các bước biến đổi.

---

## 6. Khi nào dùng — và anti-pattern

💡 **Trực giác.** Pattern là **hộp đồ nghề**, không phải bản thiết kế. Thợ giỏi không khoe "tôi đã dùng cả 10 dụng cụ" — họ dùng *đúng* dụng cụ cho *đúng* việc, và nhiều khi việc đơn giản chỉ cần tay không. Dùng pattern vì pattern là **lái xe nhìn vào hộp số chứ không nhìn đường**.

**Quy trình quyết định lành mạnh:**

1. **Bắt đầu bằng giải pháp đơn giản nhất** chạy được (KISS). Một hàm, một struct — đừng vội.
2. **Chờ "đau" lặp lại.** Khi bạn *thực sự* phải sửa cùng một chỗ nhiều lần vì lý do giống nhau (thêm loại report thứ 3, thêm cách tính ship thứ 4...) — đó là tín hiệu một pattern *có thể* giúp.
3. **Khớp đau với pattern**, không khớp ngược. Hỏi "vấn đề tôi đang gặp là gì?" rồi tìm pattern giải nó — đừng hỏi "tôi muốn dùng pattern nào?".
4. **Trả giá có ý thức.** Mỗi pattern thêm độ phức tạp/gián tiếp. Chỉ "mua" khi lợi (linh hoạt, ít sửa về sau) *vượt* chi phí (khó đọc hơn bây giờ).

> ⚠ **Các anti-pattern quanh việc dùng pattern.**
> - **Pattern-itis / Golden hammer**: nhét pattern vào mọi chỗ. Hậu quả là *over-engineering* — code phức tạp hơn cần thiết, vi phạm thẳng [YAGNI](../lesson-02-design-principles/).
> - **Premature abstraction**: dựng Factory/Strategy cho "loại thứ hai" *chưa tồn tại*. Trừu tượng hóa quá sớm khóa bạn vào một thiết kế sai trước khi đủ thông tin.
> - **Cargo-cult pattern**: dùng pattern vì "ai cũng dùng" mà không hiểu vấn đề nó giải → thường dùng sai chỗ.
> - **Singleton tràn lan**: biến mọi service thành global → coupling ẩn, khó test (mục 3.3).

> ❓ **"Vậy có khi nào nên thêm pattern *trước* khi đau không?"** Hiếm, nhưng có: khi bạn *chắc chắn* (không phải "đoán") rằng sự thay đổi sẽ tới — vd đang viết một thư viện công khai mà người dùng *sẽ* cần cắm thuật toán riêng (Strategy là hợp lý từ đầu). Khác biệt then chốt: dựa trên *yêu cầu đã biết*, không phải *phỏng đoán "biết đâu"*. "Biết đâu sau này cần" chính là định nghĩa của YAGNI.

> 🔁 **Dừng lại tự kiểm tra.** Một dev mới đọc xong sách GoF, bắt đầu dự án bằng cách dựng AbstractFactory + Strategy + Observer cho một CRUD app 3 màn hình. Nhận xét?
> <details><summary>Đáp án</summary>Đây là <b>over-engineering / pattern-itis</b> điển hình: thêm pattern dựa trên phỏng đoán chứ không phải đau thực tế. CRUD 3 màn hình gần như chắc chắn không cần các tầng trừu tượng đó — chúng làm code khó đọc, khó sửa hơn, vi phạm KISS &amp; YAGNI. Đúng ra: viết đơn giản trước, <i>refactor sang pattern khi và chỉ khi</i> một nhu cầu linh hoạt cụ thể xuất hiện (xem <a href="../lesson-05-refactoring-tech-debt/">Lesson 05 — Refactoring</a>).</details>

📝 **Tóm tắt mục 6.** Pattern là *công cụ*, không phải *mục tiêu*. Bắt đầu đơn giản (KISS), thêm pattern khi *đau lặp lại thực sự* (không phải phỏng đoán — YAGNI), và chỉ "mua" khi lợi vượt chi phí phức tạp. Cảnh giác pattern-itis, premature abstraction, cargo-cult, Singleton tràn lan.

---

## 7. Bài tập

1. Một bạn nói "design pattern là đoạn code mẫu mình copy vào dự án". Chỉ ra **hai** điểm sai trong cách hiểu này.
2. Phân loại các pattern sau vào ba nhóm GoF (Creational / Structural / Behavioral): Builder, Decorator, Observer, Singleton, Adapter, Strategy.
3. Với mỗi tình huống, nêu pattern phù hợp nhất và giải thích *vấn đề* nó giải:
   - (a) Tích hợp một SDK thanh toán bên thứ ba có chữ ký hàm khác hẳn interface code bạn đang dùng.
   - (b) Cần đổi thuật toán nén (gzip / brotli / none) theo cấu hình từng request lúc chạy.
   - (c) Khi user đăng ký xong, cần đồng thời: gửi email chào mừng, tạo profile, ghi analytics — và sẽ còn thêm phản ứng nữa trong tương lai.
4. Bạn được giao viết app TODO list cá nhân (thêm/sửa/xóa/đánh dấu xong). Một đồng nghiệp đề nghị "dùng AbstractFactory cho việc tạo Task và Strategy cho việc sắp xếp". Bạn có đồng ý không? Lập luận theo KISS/YAGNI.
5. Giải thích vì sao **Singleton** thường bị xem là anti-pattern, và nêu giải pháp thay thế cùng lý do nó tốt hơn.
6. (Nâng cao) Adapter, Decorator và Facade đều "bọc" object khác. Cho một ví dụ cụ thể cho **mỗi** pattern và chỉ rõ *mục đích* khác nhau của ba cái.

## Lời giải chi tiết

**Bài 1.** Hai điểm sai: (1) Pattern **không phải code** mà là *mô tả trừu tượng* về cách tổ chức class/object — hai hiện thực cùng một pattern ở hai ngôn ngữ trông rất khác nhau. (2) Bạn không thể "copy vào" — bạn phải *hiểu vấn đề pattern giải* rồi tự dựng giải pháp khớp ngữ cảnh của mình. Copy mù còn kéo theo cả nhược điểm của pattern (vd Singleton) vào chỗ không cần.

**Bài 2.**
- **Creational**: Builder, Singleton (đều lo việc *tạo* object).
- **Structural**: Decorator, Adapter (đều lo việc *lắp/bọc* object).
- **Behavioral**: Observer, Strategy (đều lo việc object *giao tiếp & phân chia hành vi*).

**Bài 3.**
- (a) **Adapter** — vấn đề: hai interface không khớp, và bạn *không sửa được* SDK. Adapter bọc SDK, trình bày nó dưới interface code bạn mong đợi (chuyển đổi tham số, kiểu).
- (b) **Strategy** — vấn đề: nhiều thuật toán cùng "vai trò" (nén) cần *đổi lúc chạy* theo cấu hình. Tách mỗi thuật toán sau interface \`Compressor\`, đổi đối tượng strategy theo request. Tránh \`switch\` khổng lồ và thỏa Open/Closed.
- (c) **Observer** — vấn đề: một sự kiện ("user đăng ký") cần kích nhiều phản ứng độc lập, *và sẽ thêm nữa*. Subject (đăng ký) phát sự kiện cho các observer đã đăng ký mà không coupling với từng cái; thêm phản ứng mới = đăng ký thêm observer, không sửa code đăng ký.

**Bài 4.** **Không đồng ý.** App TODO cá nhân là CRUD nhỏ, đơn giản — đây là **over-engineering / pattern-itis**. AbstractFactory cho việc tạo \`Task\` (chỉ có *một* loại Task) là tầng trừu tượng thừa; Strategy cho sắp xếp khi chỉ cần \`sort.Slice\` với một hàm so sánh là lãng phí. Theo **KISS**: dùng struct \`Task\` thường + slice + hàm sort chuẩn. Theo **YAGNI**: chưa có nhu cầu thực tế nào về nhiều loại Task hay nhiều chiến lược sắp xếp có thể đổi runtime → đừng dựng sẵn. *Nếu* sau này thật sự cần (vd thêm 5 kiểu sắp xếp đổi runtime), hãy **refactor** sang Strategy lúc đó (Lesson 05).

**Bài 5.** Singleton bị xem là anti-pattern vì: (1) **biến toàn cục trá hình** → coupling ẩn, bất kỳ code nào cũng gọi được nên khó biết ai phụ thuộc gì; (2) **khó test** — không inject mock/fake được vì truy cập trực tiếp toàn cục; (3) trạng thái dùng chung dễ gây bug **đồng thời**. **Thay thế: dependency injection** — tạo instance một lần ở \`main()\` rồi *truyền* vào các thành phần cần qua tham số/constructor. Tốt hơn vì: phụ thuộc *hiện rõ* trên chữ ký hàm (không ngầm), test thay được dễ dàng (truyền fake vào), và không còn truy cập toàn cục ẩn.

**Bài 6.**
- **Adapter** — ví dụ: bọc \`stripe.CreateCharge(cents, currency)\` thành \`PaymentGateway.Charge(amount)\`. *Mục đích*: **đổi hình dạng interface** cho khớp (interface ra ≠ interface vào).
- **Decorator** — ví dụ: \`Logging(RateLimit(handler))\` cho HTTP middleware. *Mục đích*: **giữ nguyên interface** nhưng *thêm hành vi*, xếp chồng được nhiều lớp.
- **Facade** — ví dụ: \`OrderFacade.PlaceOrder()\` che 4 lời gọi \`inventory/payment/shipping/email\`. *Mục đích*: tạo **một interface mới đơn giản hơn** che một *tập* nhiều thành phần phức tạp.

Tóm: Adapter = "khớp lại hình dạng", Decorator = "thêm hành vi (cùng hình dạng)", Facade = "gom nhiều thứ thành một cửa đơn giản".

---

## 8. Code & Minh họa

- [visualization.html](./visualization.html) — 3 mô-đun tương tác: (1) **thư viện pattern** — bấm từng pattern để xem vấn đề nó giải + sơ đồ + ví dụ ngắn; (2) **quiz chọn pattern cho tình huống** — đọc tình huống, chọn pattern đúng, nhận giải thích; (3) **Strategy demo** — đổi thuật toán tính phí ship lúc chạy và xem kết quả thay đổi tức thì.
- Để xem cách **hiện thực** các pattern này bằng cú pháp Go cụ thể: [Programming — Design patterns trong Go](../../../Programming/lesson-39-design-patterns-go/).

## 9. Bài tiếp theo

- [Lesson 05 — Refactoring & nợ kỹ thuật](../lesson-05-refactoring-tech-debt/) — cách *tiến hóa* code đơn giản sang pattern khi nhu cầu thực sự xuất hiện (đúng quy trình "đơn giản trước, pattern khi đau"), và cách quản lý nợ kỹ thuật tích lũy.
`;
