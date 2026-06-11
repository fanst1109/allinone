// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: SoftwareEngineering/03-Architecture-Delivery/lesson-01-kien-truc-phan-mem/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 01 — Kiến trúc phần mềm

## Mục tiêu

- Hiểu **kiến trúc phần mềm** (software architecture) là gì: những quyết định cấu trúc *lớn, khó đổi về sau*, và phân biệt nó với **thiết kế chi tiết** (detailed design).
- Nắm vững các **kiểu kiến trúc** (architectural styles) phổ biến: **phân tầng** (layered), **lục giác / cổng & bộ chuyển đổi** (hexagonal / ports & adapters), **khối đơn vs vi dịch vụ** (monolith vs microservices), **hướng sự kiện** (event-driven) — sơ đồ, ưu/nhược, khi nào dùng.
- Biết **cách chọn kiến trúc** dựa trên **yêu cầu phi chức năng** (non-functional requirements), và vì sao phải tránh **over-engineering** (vẽ vời quá mức).

## Kiến thức tiền đề

- **Độ phụ thuộc & độ gắn kết** (coupling/cohesion) ở mức module — kiến trúc chính là coupling/cohesion ở **mức hệ thống**. Xem [Lesson 03 — Coupling & Cohesion](../../02-Design-Quality/lesson-03-coupling-cohesion/).
- **Nguyên lý thiết kế** (SOLID, DIP...) — nền tảng để hiểu vì sao hexagonal "đảo ngược phụ thuộc". Xem [Lesson 02 — Nguyên lý thiết kế](../../02-Design-Quality/lesson-02-nguyen-ly-thiet-ke/).
- Đã từng viết một ứng dụng có nhiều module (web + database) là đủ.

> 💡 **Kiến trúc khác thiết kế chi tiết ở quy mô của hậu quả.** Đặt tên một hàm sai → đổi trong 30 giây. Chọn microservices cho một đội 3 người → trả giá hằng ngày suốt nhiều năm. Kiến trúc là tập hợp các quyết định mà **chi phí thay đổi cao nhất**, nên đáng để cân nhắc kỹ trước.

---

## 1. Kiến trúc phần mềm là gì?

💡 **Trực giác.** Kiến trúc giống *bản vẽ kết cấu* của một tòa nhà: nó quyết định có bao nhiêu tầng, móng đặt ở đâu, hệ thống điện-nước đi theo trục nào. Bạn có thể sơn lại tường, đổi rèm cửa (thiết kế chi tiết) dễ dàng — nhưng dời cầu thang hay thêm tầng (kiến trúc) thì phải đập đi xây lại. Kiến trúc phần mềm cũng vậy: là tập **quyết định cấu trúc lớn, khó đảo ngược**.

**Định nghĩa.** Kiến trúc phần mềm là tập các **quyết định về cấu trúc** của hệ thống: chia hệ thống thành những **thành phần** (component) nào, chúng **giao tiếp** ra sao, dữ liệu **chảy** theo hướng nào, và những **ràng buộc** nào áp lên toàn hệ thống. Đặc trưng phân biệt: đây là những quyết định **đắt để thay đổi về sau**.

**Phân biệt kiến trúc với thiết kế chi tiết** — bằng 4 ví dụ cụ thể:

| Câu hỏi | Thuộc về | Vì sao |
|---------|----------|--------|
| "Hệ thống là 1 tiến trình hay 8 service gọi nhau qua HTTP?" | **Kiến trúc** | Đổi sau = viết lại cách triển khai, mạng, dữ liệu |
| "Lõi nghiệp vụ có được phép gọi thẳng thư viện database không?" | **Kiến trúc** | Quy tắc phụ thuộc áp cho cả hệ thống |
| "Hàm \`tinhGiamGia\` nhận \`float64\` hay \`decimal\`?" | **Thiết kế chi tiết** | Đổi trong một file, vài phút |
| "Vòng lặp này nên dùng \`for\` hay \`map\`?" | **Thiết kế chi tiết** | Cục bộ, không ảnh hưởng ai khác |

> ❓ **"Vậy ranh giới chính xác giữa kiến trúc và thiết kế ở đâu?"** Không có vạch kẻ tuyệt đối — đó là một *phổ*. Một quy tắc thực dụng (theo Martin Fowler): **kiến trúc là những thứ mà người giàu kinh nghiệm thấy *quan trọng và khó đổi*.** Nếu một quyết định mà sửa sai sau này tốn hàng tuần và ảnh hưởng nhiều đội → coi nó là kiến trúc, cân nhắc kỹ. Nếu sửa trong một buổi chiều → cứ để code dạy bạn.

> ⚠ **Lỗi thường gặp.** "Vẽ kiến trúc thật hoành tráng ngay từ ngày đầu rồi mới code." Kiến trúc *quá chi tiết quá sớm* khóa cứng những giả định mà bạn chưa kiểm chứng. Quyết định kiến trúc tốt là quyết định **trì hoãn được những gì có thể trì hoãn** — chỉ chốt sớm những thứ thực sự khó đảo ngược. (Đây là mầm của over-engineering, xem mục 6.)

> 🔁 **Dừng lại tự kiểm tra.** "Chúng ta sẽ lưu password bằng bcrypt với cost factor 12" — kiến trúc hay thiết kế chi tiết?
> <details><summary>Đáp án</summary><b>Thiết kế chi tiết</b> (gần như). Đổi cost factor hay thuật toán hash là cục bộ trong module xác thực, không phá vỡ cấu trúc hệ thống. Còn "có một service xác thực riêng hay nhúng trong app" thì mới là <b>kiến trúc</b>. Lưu ý: <i>việc chọn lưu password ở đâu, mã hóa hay không</i> mới chạm tới mức kiến trúc/bảo mật toàn hệ thống.</details>

📝 **Tóm tắt mục 1.** Kiến trúc = các quyết định cấu trúc **lớn, khó đảo ngược** (chia thành phần, giao tiếp, ràng buộc toàn cục). Thiết kế chi tiết = các lựa chọn **cục bộ, dễ đổi**. Ranh giới là phổ liên tục; phán đoán bằng "đổi sai sau này đắt bao nhiêu".

---

## 2. Kiến trúc phân tầng (Layered Architecture)

💡 **Trực giác.** Như một nhà hàng: khách (presentation) gọi món với phục vụ; phục vụ chuyển cho bếp (business) nấu theo công thức; bếp lấy nguyên liệu từ kho (data). Mỗi tầng *chỉ nói chuyện với tầng ngay dưới*, không ai nhảy cóc. Khách không tự vào kho lấy đồ.

Kiểu kiến trúc phổ biến nhất. Hệ thống chia thành các **tầng** xếp chồng, mỗi tầng một trách nhiệm, và **chỉ phụ thuộc xuống dưới**:

\`\`\`
┌─────────────────────────────────────┐
│  Presentation (UI / API controller)  │  ← nhận request, trả response
├─────────────────────────────────────┤
│  Business (logic nghiệp vụ, service)  │  ← quy tắc, tính toán
├─────────────────────────────────────┤
│  Data (repository, DB, ORM)           │  ← lưu / đọc dữ liệu
└─────────────────────────────────────┘
        Phụ thuộc chỉ chảy XUỐNG
\`\`\`

**Ví dụ tình huống — đặt một đơn hàng:**
1. \`OrderController\` (presentation) nhận \`POST /orders\`, parse JSON.
2. Gọi \`OrderService.placeOrder()\` (business) — kiểm tra tồn kho, tính tổng tiền, áp khuyến mãi.
3. Business gọi \`OrderRepository.save()\` (data) — ghi vào PostgreSQL.
4. Kết quả chảy ngược lên, controller trả \`201 Created\`.

**Ưu điểm:** dễ hiểu, ai cũng quen; tách trách nhiệm rõ; đổi UI (web → mobile API) không đụng tầng business; dễ phân công đội theo tầng.

**Nhược điểm:**
- Dễ rơi vào **anemic domain** — logic nghiệp vụ tràn vào controller hoặc "chảy nhão" qua nhiều tầng.
- Tầng business thường **phụ thuộc thẳng vào tầng data** (gọi trực tiếp ORM/DB) → khó test business nếu không có DB thật, và khó đổi DB. Mục 3 chữa đúng điểm này.

> ❓ **"Tầng business có được phép gọi thẳng tầng presentation không?"** Không. Phụ thuộc chỉ chảy **một chiều xuống dưới**. Nếu business cần "thông báo cho UI", nó *trả dữ liệu lên* hoặc phát một sự kiện (mục 5), chứ không gọi ngược lên. Vi phạm chiều phụ thuộc = tạo vòng lặp coupling, phá vỡ lợi ích của phân tầng (nhắc lại [coupling/cohesion](../../02-Design-Quality/lesson-03-coupling-cohesion/)).

> ⚠ **Lỗi thường gặp.** "Tầng" không phải là "thư mục". Tạo 3 thư mục \`presentation/ business/ data/\` rồi vẫn để controller gọi thẳng SQL = phân tầng *hình thức*, không có ràng buộc thật. Phân tầng chỉ có giá trị khi **chiều phụ thuộc được ép tuân thủ** (qua review, qua công cụ, qua interface).

> 🔁 **Dừng lại tự kiểm tra.** Bạn muốn đổi từ PostgreSQL sang MongoDB. Trong kiến trúc phân tầng "thuần", việc này dễ hay khó?
> <details><summary>Đáp án</summary>Thường <b>khó hơn mong đợi</b>, vì tầng business gọi thẳng API của tầng data (ORM cụ thể). Câu lệnh, kiểu dữ liệu, transaction lẫn vào logic nghiệp vụ. Để dễ đổi, cần <b>đảo ngược phụ thuộc</b>: business chỉ phụ thuộc một <i>interface</i> trừu tượng, data hiện thực interface đó — đây chính là ý tưởng của hexagonal (mục 3).</details>

📝 **Tóm tắt mục 2.** Phân tầng = chồng các tầng Presentation → Business → Data, phụ thuộc chỉ chảy xuống. Đơn giản, quen thuộc, tách trách nhiệm tốt; nhưng business hay dính chặt vào data nên khó test/đổi hạ tầng.

---

## 3. Kiến trúc lục giác (Hexagonal / Ports & Adapters)

💡 **Trực giác.** Hãy hình dung **lõi nghiệp vụ** như một con chip xử lý đặt giữa, còn mọi thứ bên ngoài (database, web, hàng đợi tin nhắn, dịch vụ thanh toán) là *thiết bị cắm vào* qua các cổng chuẩn — giống cổng USB. Lõi không cần biết đầu kia cắm cái gì; nó chỉ biết "cổng lưu đơn hàng". Bạn thay ổ cứng bằng USB, lõi không đổi.

**Vấn đề cần giải.** Trong phân tầng thuần, lõi nghiệp vụ phụ thuộc *xuống* hạ tầng (DB, framework). Hexagonal **đảo chiều phụ thuộc** (Dependency Inversion — xem [nguyên lý thiết kế](../../02-Design-Quality/lesson-02-nguyen-ly-thiet-ke/)): hạ tầng phụ thuộc *vào* lõi, không ngược lại.

- **Port (cổng):** một **interface** do lõi định nghĩa — mô tả *cái lõi cần* hoặc *cái lõi cung cấp*, bằng ngôn ngữ nghiệp vụ. Ví dụ: \`OrderRepository\` (lưu/đọc đơn), \`PaymentGateway\` (thu tiền).
- **Adapter (bộ chuyển đổi):** một hiện thực cụ thể của port, sống ở *vòng ngoài*. Ví dụ: \`PostgresOrderRepository\`, \`StripePaymentGateway\`, \`HttpOrderController\`.

\`\`\`
            ┌──────────────────────────────┐
   HTTP  ──►│  Adapter   ┌────────────┐     │
   (web)    │  (driving) │   LÕI       │     │
            │            │  NGHIỆP VỤ  │ Port│──► Adapter ──► PostgreSQL
   CLI   ──►│            │ (domain +   │(out)│   (driven)
            │            │  use case)  │     │──► Adapter ──► Stripe
            │            └────────────┘     │
            └──────────────────────────────┘
   Adapter ngoài phụ thuộc VÀO Port của lõi (mũi tên hướng vào trong)
\`\`\`

**Vì sao dễ test?** Lõi chỉ biết *interface* \`PaymentGateway\`, không biết Stripe. Khi viết unit test, ta cắm một **adapter giả** (\`FakePaymentGateway\` trả về "thành công" tức thì) thay cho Stripe thật. Test chạy **không cần mạng, không cần thẻ thật, mili-giây** mà vẫn kiểm tra đúng logic "đơn được đánh dấu đã-thanh-toán khi gateway trả OK".

**Ví dụ Go (rút gọn):**
\`\`\`go
// Port — lõi định nghĩa, lõi sở hữu
type OrderRepository interface {
    Save(o Order) error
    FindByID(id string) (Order, error)
}

// Use case (lõi) — chỉ phụ thuộc interface, KHÔNG import gói postgres
type PlaceOrder struct{ repo OrderRepository }
func (p PlaceOrder) Run(o Order) error { /* logic nghiệp vụ */ return p.repo.Save(o) }

// Adapter — vòng ngoài, hiện thực port
type PostgresOrderRepo struct{ db *sql.DB }
func (r PostgresOrderRepo) Save(o Order) error { /* INSERT ... */ return nil }
func (r PostgresOrderRepo) FindByID(id string) (Order, error) { /* SELECT ... */ }

// Test — cắm fake, không cần DB
type FakeRepo struct{ saved []Order }
func (f *FakeRepo) Save(o Order) error { f.saved = append(f.saved, o); return nil }
\`\`\`

**Ưu điểm:** lõi nghiệp vụ **độc lập với hạ tầng** → test nhanh, đổi DB/framework không đụng logic, biên giới rõ ràng. **Nhược điểm:** nhiều interface & lớp hơn → *boilerplate*; với CRUD đơn giản là thừa thãi (over-engineering — mục 6).

> ❓ **"Khác gì phân tầng đâu, vẫn 3 lớp?"** Khác ở **chiều phụ thuộc**. Phân tầng: business → data (lõi phụ thuộc hạ tầng). Hexagonal: data → business (hạ tầng phụ thuộc lõi, qua port do lõi định nghĩa). Sự đảo chiều này là điều khiến lõi *test được mà không cần hạ tầng* — thứ phân tầng thuần không cho.

> ⚠ **Lỗi thường gặp.** Định nghĩa port ở *tầng hạ tầng* (vd interface nằm trong gói \`repository\`) rồi để lõi import nó. Sai chiều — khi đó lõi vẫn phụ thuộc hạ tầng. **Port phải do lõi sở hữu**, đặt cạnh use case; adapter ở ngoài import vào lõi.

> 🔁 **Dừng lại tự kiểm tra.** Vì sao đặt interface \`PaymentGateway\` trong gói lõi (chứ không trong gói \`stripe\`) lại quan trọng?
> <details><summary>Đáp án</summary>Vì như vậy <b>lõi không import gói <code>stripe</code></b> — phụ thuộc chỉ chảy từ ngoài vào trong. Nếu interface nằm trong gói <code>stripe</code> và lõi import nó, lõi lại dính vào hạ tầng: đổi sang PayPal phải sửa lõi, và test phải kéo theo gói stripe. Đặt port trong lõi = đảo ngược phụ thuộc đúng nghĩa.</details>

📝 **Tóm tắt mục 3.** Hexagonal tách **lõi nghiệp vụ** khỏi hạ tầng qua **port (interface lõi sở hữu)** và **adapter (hiện thực bên ngoài)**. Đảo chiều phụ thuộc (ngoài → trong) → lõi test được không cần DB/mạng. Đổi lại: nhiều lớp/boilerplate, thừa cho ứng dụng CRUD đơn giản.

---

## 4. Monolith vs Microservices

💡 **Trực giác.** **Monolith** (khối đơn) như một căn nhà lớn: mọi phòng dưới một mái, đi lại giữa các phòng tức thì (gọi hàm trong cùng tiến trình). **Microservices** (vi dịch vụ) như một khu phố nhiều nhà riêng: mỗi nhà tự chủ, nhưng muốn nói chuyện phải đi ra đường, gọi điện (gọi qua mạng) — linh hoạt hơn nhưng phối hợp phức tạp hơn nhiều.

- **Monolith:** toàn bộ ứng dụng là **một đơn vị triển khai** (một tiến trình, một codebase, thường một database). Các module gọi nhau bằng *lời gọi hàm trong bộ nhớ*.
- **Microservices:** hệ thống chia thành **nhiều service nhỏ, độc lập triển khai**, mỗi service một trách nhiệm nghiệp vụ và (lý tưởng) một database riêng. Giao tiếp qua **mạng** (HTTP/REST, gRPC, hoặc message queue).

\`\`\`
   MONOLITH                          MICROSERVICES
 ┌───────────────┐          ┌────────┐  HTTP/  ┌────────┐
 │ ┌─────┐┌─────┐│          │ Order  │ ◄─────► │Payment │
 │ │Order││Pay  ││          │  svc   │  gRPC   │  svc   │
 │ └─────┘└─────┘│          └───┬────┘         └───┬────┘
 │ ┌─────┐┌─────┐│              │ DB-A             │ DB-B
 │ │User ││Ship ││          ┌───┴────┐         ┌───┴────┐
 │ └─────┘└─────┘│          │ User   │         │Shipping│
 │   1 database  │          │  svc   │         │  svc   │
 └───────────────┘          └────────┘         └────────┘
  1 tiến trình, gọi hàm     N tiến trình, gọi qua mạng
\`\`\`

**Bảng so sánh:**

| Tiêu chí | Monolith | Microservices |
|----------|----------|---------------|
| Triển khai | Một lần, toàn bộ | Từng service độc lập |
| Gọi nội bộ | Hàm trong bộ nhớ (nhanh, tin cậy) | Qua mạng (chậm hơn, có thể *fail*) |
| Mở rộng (scale) | Nhân bản cả khối | Scale riêng service nóng |
| Đội ngũ | Hợp đội nhỏ, 1 codebase | Hợp nhiều đội tự chủ song song |
| Dữ liệu | 1 DB, transaction dễ | DB riêng, transaction phân tán (khó) |
| Gỡ lỗi | Stack trace một chỗ | Trace xuyên nhiều service (cần tracing) |
| Hạ tầng vận hành | Đơn giản | Phức tạp (service discovery, mạng, CI/CD ×N) |
| Sai một chỗ | Có thể sập cả app | Cô lập được, nhưng lỗi mạng/cascade mới |

**Khi nào dùng cái nào?**
- **Bắt đầu bằng Monolith** (đặc biệt startup / sản phẩm mới): đơn giản, nhanh, đủ tốt cho hầu hết quy mô. Một monolith *tổ chức tốt theo module* ("modular monolith") đi được rất xa.
- **Chuyển sang Microservices khi có lý do thật:** (a) đội ngũ quá lớn, nhiều nhóm dẫm chân nhau trên một codebase; (b) các phần có nhu cầu **scale rất khác nhau** (vd: tìm kiếm cần 50 máy, thanh toán cần 2); (c) cần **cô lập lỗi / tuân thủ** giữa các miền nghiệp vụ.

> ⚠ **Microservices KHÔNG miễn phí.** Bạn đánh đổi *độ phức tạp trong code* lấy *độ phức tạp trong vận hành & mạng*: lời gọi mạng có thể chậm, timeout, mất gói; transaction xuyên service trở thành **eventual consistency** (mục 5); cần service discovery, log/trace tập trung, CI/CD cho N service, versioning hợp đồng API. Nhiều đội tách microservices quá sớm rồi *gánh chi phí phân tán mà chưa hưởng lợi ích nào* — "distributed monolith" là kết cục tệ nhất: vừa khó vận hành như microservices vừa coupling chặt như monolith.

> ❓ **"Microservices có làm hệ thống nhanh hơn không?"** Thường là **không** — gọi hàm trong bộ nhớ nhanh cỡ nano-giây, gọi qua mạng cỡ mili-giây (chậm hơn ~1000 lần) và có thể thất bại. Microservices đổi lấy **khả năng scale độc lập, tự chủ đội ngũ, cô lập lỗi**, chứ không phải tốc độ một request. Nếu mục tiêu chỉ là "nhanh hơn", microservices là lựa chọn sai.

> 🔁 **Dừng lại tự kiểm tra.** Một đội 4 người làm sản phẩm mới, chưa rõ tính năng nào trụ lại. Họ định chia ngay thành 12 microservices "cho hiện đại". Khuyên gì?
> <details><summary>Đáp án</summary>Khuyên <b>bắt đầu bằng monolith (modular monolith)</b>. Đội nhỏ + yêu cầu chưa ổn định = đúng điểm yếu của microservices: chi phí vận hành 12 service, transaction phân tán, CI/CD ×12 sẽ bóp nghẹt 4 người, trong khi <i>chưa có</i> nhu cầu scale độc lập hay nhiều đội. Tách service sau, khi biên giới nghiệp vụ đã rõ và có lý do thật.</details>

📝 **Tóm tắt mục 4.** Monolith = một đơn vị triển khai, gọi hàm trong bộ nhớ — đơn giản, mặc định nên bắt đầu từ đây. Microservices = nhiều service độc lập, gọi qua mạng — đổi độ phức tạp code lấy độ phức tạp vận hành + eventual consistency. Chỉ tách khi có lý do thật (đội lớn, scale lệch, cô lập lỗi); microservices không miễn phí và không tự làm nhanh hơn.

---

## 5. Kiến trúc hướng sự kiện (Event-Driven Architecture)

💡 **Trực giác.** Thay vì A *gọi* B và đứng chờ B làm xong (đồng bộ, như gọi điện chờ máy), A chỉ **phát một thông báo** "đơn hàng đã đặt" lên một bảng tin chung rồi đi tiếp; ai quan tâm thì tự đọc và xử lý (bất đồng bộ, như đăng tin lên nhóm chat). A không cần biết *ai* nghe, *bao nhiêu* người nghe.

- **Sự kiện (event):** một sự thật đã xảy ra trong quá khứ, vd \`OrderPlaced\`, \`PaymentReceived\`. Producer (bên phát) *không biết* consumer (bên nhận) là ai.
- **Message queue / broker** (Kafka, RabbitMQ, SQS): trung gian lưu trữ và chuyển sự kiện, **tách rời** (decouple) producer khỏi consumer cả về *thời gian* lẫn *danh tính*.

\`\`\`
                          ┌─► [Inventory svc]  (trừ kho)
 [Order svc] ──OrderPlaced──►│ MESSAGE   ┌─► [Email svc]  (gửi mail xác nhận)
   (producer)              └─► QUEUE  ──►├─► [Analytics]  (ghi thống kê)
                                          └─► [Shipping]   (tạo phiếu giao)
        Producer phát 1 sự kiện → nhiều consumer xử lý độc lập, bất đồng bộ
\`\`\`

**Ví dụ tình huống.** Khách đặt hàng. Service Order chỉ làm *một việc*: lưu đơn + phát \`OrderPlaced\`. Bốn việc còn lại (trừ kho, gửi mail, ghi analytics, tạo phiếu giao) do bốn consumer tự xử lý khi rảnh. Thêm tính năng mới ("tích điểm thưởng") = thêm một consumer mới *nghe cùng sự kiện*, **không sửa Order service**.

**Ưu điểm:** tách rời mạnh (producer/consumer phát triển độc lập); chịu tải tốt (queue đệm lúc cao điểm); dễ mở rộng tính năng (thêm consumer); một consumer chết không kéo cả luồng theo.

**Nhược điểm:** khó suy luận **luồng tổng thể** (không có một stack trace tuyến tính); **gỡ lỗi khó** (cần tracing xuyên sự kiện); và quan trọng nhất — **eventual consistency**.

**Eventual consistency là gì (và vì sao tồn tại)?** Vì các consumer xử lý *bất đồng bộ*, có một khoảng thời gian ngắn hệ thống **chưa nhất quán**: đơn đã được tạo nhưng kho *chưa kịp* trừ, mail *chưa kịp* gửi. Sau một lúc (mili-giây tới giây) mọi thứ hội tụ về đúng — "*eventual*" (rốt cuộc) consistency, đối lập với "*strong*" consistency (nhất quán tức thì như transaction trong một DB). 

> 💡 **Ví dụ số cụ thể về eventual consistency.** Tại \`t=0ms\` khách đặt đơn #1001, Order service trả \`201 Created\` ngay. Tại \`t=0ms\` kho hàng *vẫn hiển thị* còn 5 cái (chưa trừ). Tại \`t=120ms\` Inventory consumer xử lý xong \`OrderPlaced\` → kho còn 4. Trong khoảng \`0–120ms\`, một truy vấn tồn kho thấy **5** dù đơn đã đặt. Hệ thống *rốt cuộc* đúng, nhưng không *tức thì* đúng. Thiết kế phải chấp nhận và xử lý cửa sổ này (vd: đặt chỗ tạm, idempotency).

> ❓ **"Eventual consistency có phải là 'dữ liệu sai' không?"** Không hẳn — dữ liệu *sẽ đúng*, chỉ là không *ngay lập tức*. Vấn đề là **chấp nhận được không** cho nghiệp vụ đó. "Số like trên bài đăng" trễ vài giây → không sao. "Số dư tài khoản ngân hàng khi rút tiền" trễ → tuyệt đối không, phải strong consistency. Chọn event-driven = chọn đánh đổi này một cách *có ý thức*.

> ⚠ **Lỗi thường gặp.** Dùng event-driven cho nghiệp vụ *bắt buộc nhất quán tức thì* (chuyển tiền, giữ chỗ duy nhất) mà không xử lý. Eventual consistency mở ra cửa sổ cho double-spend, oversell. Nếu cần atomic, hoặc giữ trong một transaction (monolith/1 DB), hoặc dùng saga + bù trừ có chủ đích — không "phát sự kiện rồi hy vọng".

> 🔁 **Dừng lại tự kiểm tra.** Vì sao thêm tính năng "tích điểm thưởng khi đặt hàng" trong kiến trúc event-driven lại *không* phải sửa Order service?
> <details><summary>Đáp án</summary>Vì Order service chỉ <b>phát sự kiện <code>OrderPlaced</code></b> và không biết ai nghe. Tính năng tích điểm chỉ cần thêm một <b>consumer mới</b> đăng ký nghe cùng sự kiện đó và tự xử lý. Producer không thay đổi → đây chính là lợi ích "tách rời" của event-driven (đối lập với việc Order phải <i>gọi thẳng</i> service tích điểm trong kiểu đồng bộ).</details>

📝 **Tóm tắt mục 5.** Event-driven = producer phát **sự kiện** lên **message queue**, nhiều consumer xử lý **bất đồng bộ, độc lập**. Tách rời mạnh, dễ mở rộng, chịu tải; đổi lại khó suy luận luồng, khó debug, và **eventual consistency** — dữ liệu *rốt cuộc* đúng chứ không *tức thì*. Tránh cho nghiệp vụ cần nhất quán mạnh.

---

## 6. Cách chọn kiến trúc — theo yêu cầu phi chức năng, tránh over-engineering

💡 **Trực giác.** Không có kiến trúc "tốt nhất" tuyệt đối, chỉ có kiến trúc **phù hợp nhất với ràng buộc của bạn**. Như chọn phương tiện đi lại: đi chợ gần thì xe đạp; chở 30 tấn hàng xuyên quốc gia thì xe tải. Chọn xe tải để đi chợ = over-engineering (lãng phí, cồng kềnh); chọn xe đạp chở 30 tấn = under-engineering (không kham nổi).

**Kiến trúc được lái bởi yêu cầu phi chức năng** (non-functional requirements — NFR), không phải bởi tính năng. Tính năng nói *hệ thống làm gì*; NFR nói *làm tốt đến mức nào*. Xem lại [Lesson 03 — Yêu cầu & đặc tả](../../01-Foundations/lesson-03-yeu-cau-dac-ta/) để phân biệt chức năng vs phi chức năng.

**Bảng: NFR nào dẫn tới lựa chọn kiến trúc nào (ví dụ):**

| Yêu cầu phi chức năng | Câu hỏi cụ thể | Gợi ý kiến trúc |
|-----------------------|----------------|-----------------|
| **Khả năng test (testability)** | Test logic không cần DB/mạng? | Hexagonal (port/adapter) |
| **Khả năng mở rộng (scalability)** lệch | Một phần chịu tải gấp 50 lần phần khác? | Tách microservice phần nóng |
| **Tự chủ đội ngũ** | Nhiều đội phát triển song song không dẫm chân? | Microservices theo biên giới đội |
| **Độ trễ thấp, giao dịch atomic** | Chuyển tiền phải nhất quán tức thì? | Monolith / 1 DB, strong consistency |
| **Chịu đỉnh tải, xử lý nền** | Cao điểm gấp 100 lần, việc làm được trễ? | Event-driven + message queue |
| **Đơn giản, đội nhỏ, chưa rõ yêu cầu** | Cần đi nhanh, dễ đổi hướng? | Modular monolith |

**Quy trình chọn (thực dụng):**
1. **Liệt kê NFR ưu tiên** — không thể tối ưu tất cả; chọn 2–3 cái quan trọng nhất (vd: "đi nhanh + dễ test" cho startup).
2. **Chọn kiến trúc đơn giản nhất thỏa NFR đó.** Mặc định nghiêng về phương án rẻ/đơn giản hơn.
3. **Để các quyết định khó-đảo-ngược lại sau** khi có thể — giữ đường rút (vd dùng port/adapter để dễ đổi DB sau, nhưng vẫn là monolith).

> ⚠ **Over-engineering — lỗi kinh điển.** Áp dụng microservices + event-driven + hexagonal đầy đủ cho một app CRUD 5 màn hình, 100 người dùng. Hậu quả: 2 tuần dựng hạ tầng cho thứ lẽ ra 2 ngày; mỗi tính năng nhỏ phải sờ 5 service; đội kiệt sức vì vận hành. **Độ phức tạp kiến trúc phải tương xứng độ phức tạp bài toán.** Khi nghi ngờ → chọn đơn giản hơn; nâng cấp khi *thực sự đau*, vì kiến trúc đơn giản dễ tiến hóa hơn kiến trúc phức tạp sai chỗ.

> ❓ **"Vậy không bao giờ nên 'chuẩn bị cho tương lai' à?"** Có, nhưng phân biệt: **chuẩn bị rẻ** (giữ biên giới module rõ, đặt interface ở chỗ dễ đổi) thì nên — nó *mở cửa* mà không tốn kém. **Chuẩn bị đắt** (dựng 12 service cho "sau này scale") thì không — bạn trả chi phí *ngay bây giờ* cho một tương lai *có thể không tới*. Nguyên tắc YAGNI ("You Aren't Gonna Need It") áp cho cả kiến trúc.

> 🔁 **Dừng lại tự kiểm tra.** Sếp nói "Netflix dùng microservices nên ta cũng phải dùng". Phản biện thế nào?
> <details><summary>Đáp án</summary>Netflix có <b>hàng nghìn kỹ sư, hàng trăm triệu người dùng, nhu cầu scale cực lớn và lệch</b> — microservices giải đúng <i>vấn đề của họ</i>. Kiến trúc phải lái bởi <b>NFR của chính ta</b>, không phải sao chép công ty khác. Nếu ta là đội 5 người, 1000 user, copy microservices = gánh chi phí phân tán mà không có lợi ích tương ứng (over-engineering). Câu hỏi đúng: "<i>ràng buộc của ta</i> là gì?", không phải "<i>người nổi tiếng</i> dùng gì?".</details>

📝 **Tóm tắt mục 6.** Không có kiến trúc tốt nhất tuyệt đối — chọn theo **yêu cầu phi chức năng** (testability, scalability, nhất quán, tự chủ đội...). Liệt kê 2–3 NFR ưu tiên → chọn kiến trúc *đơn giản nhất* thỏa chúng → trì hoãn quyết định khó-đảo-ngược. **Tránh over-engineering**: độ phức tạp kiến trúc phải tương xứng độ phức tạp bài toán; "đơn giản hơn" là lựa chọn mặc định an toàn.

---

## 7. Bài tập

1. Phân loại mỗi quyết định sau là **kiến trúc** hay **thiết kế chi tiết**, giải thích ngắn: (a) "Dùng microservices hay monolith?"; (b) "Đặt tên biến \`n\` hay \`count\`?"; (c) "Lõi nghiệp vụ có được import gói database không?"; (d) "Hàm sắp xếp dùng quicksort hay mergesort?".

2. Một hệ thống thương mại điện tử đang là monolith. Phần **tìm kiếm sản phẩm** chịu tải gấp 40 lần phần **quản lý đơn hàng** vào giờ cao điểm, và đội tìm kiếm muốn deploy độc lập 5 lần/ngày. Có nên tách tìm kiếm thành microservice riêng không? Vì sao? Nêu **một** chi phí phải trả khi tách.

3. Giải thích vì sao kiến trúc **hexagonal** giúp test lõi nghiệp vụ *không cần database thật*, trong khi kiến trúc **phân tầng thuần** thường không. Chỉ rõ điểm khác biệt về **chiều phụ thuộc**.

4. Một app chuyển tiền giữa hai tài khoản đề xuất dùng **event-driven** (phát sự kiện \`MoneyTransferred\`, các service tự xử lý bất đồng bộ). Nêu rủi ro cụ thể của lựa chọn này và đề xuất hướng xử lý.

5. Một đội 3 người làm MVP cho ý tưởng startup chưa được kiểm chứng, đề xuất kiến trúc: 10 microservices + Kafka + hexagonal đầy đủ mỗi service. Đánh giá đề xuất và đưa ra kiến trúc bạn khuyến nghị kèm lý do (theo NFR).

6. Cho một hệ bán vé sự kiện: mỗi vé chỉ được bán cho **đúng một** người (không được oversell). Giữa **strong consistency** và **eventual consistency**, chọn cái nào cho thao tác "giữ vé"? Vì sao?

## Lời giải chi tiết

**Bài 1.** (a) **Kiến trúc** — quyết định cấu trúc lớn, đổi sau cực đắt (viết lại triển khai, mạng, dữ liệu). (b) **Thiết kế chi tiết** — cục bộ, đổi tên một biến trong vài giây, không ảnh hưởng ai. (c) **Kiến trúc** — đây là một *ràng buộc về chiều phụ thuộc* áp cho toàn hệ thống (chính là quy tắc hexagonal); vi phạm nó phá vỡ khả năng test/đổi hạ tầng. (d) **Thiết kế chi tiết** — lựa chọn thuật toán cục bộ trong một hàm, đổi không lộ ra ngoài.

**Bài 2.** **Nên tách** tìm kiếm thành service riêng, vì *hai* NFR thật sự xuất hiện: (1) **scale lệch** — tìm kiếm cần gấp 40 lần tài nguyên; tách ra để scale riêng phần nóng thay vì nhân bản cả monolith (lãng phí). (2) **tự chủ deploy** — đội tìm kiếm muốn deploy 5 lần/ngày độc lập. Đây đúng là các lý do *chính đáng* để dùng microservice (mục 4). **Một chi phí phải trả:** giao tiếp giữa tìm kiếm và phần còn lại giờ qua **mạng** (chậm hơn, có thể fail/timeout), cần xử lý lỗi mạng, có thể phải đồng bộ/sao chép dữ liệu sản phẩm sang service tìm kiếm (eventual consistency), và thêm hạ tầng vận hành (CI/CD, monitoring riêng). (Chấp nhận chi phí này vì lợi ích scale + tự chủ là *thật*.)

**Bài 3.** Khác biệt nằm ở **chiều phụ thuộc**. *Phân tầng thuần*: tầng business **phụ thuộc xuống** tầng data — gọi thẳng ORM/SQL cụ thể; muốn test business phải có DB thật (hoặc DB trong bộ nhớ phức tạp). *Hexagonal*: business chỉ phụ thuộc một **port (interface) do chính lõi định nghĩa và sở hữu**; adapter database (vòng ngoài) **phụ thuộc vào** lõi qua interface đó. Vì lõi chỉ biết interface, khi test ta cắm một **adapter giả** (fake/mock) hiện thực interface đó, trả dữ liệu trong bộ nhớ → test chạy không cần DB, nhanh, ổn định. Tóm lại: hexagonal **đảo ngược chiều phụ thuộc** (ngoài → trong) nên cô lập được lõi để test; phân tầng thuần để lõi dính chặt vào hạ tầng.

**Bài 4.** **Rủi ro:** chuyển tiền cần **nhất quán mạnh & atomic** — trừ tài khoản A và cộng tài khoản B phải xảy ra *cùng nhau hoặc không gì cả*. Event-driven bất đồng bộ tạo cửa sổ **eventual consistency**: có khoảnh khắc tiền đã trừ A nhưng *chưa* cộng B (hoặc ngược lại), hoặc sự kiện bị xử lý hai lần → double credit. Cũng có rủi ro mất sự kiện. **Hướng xử lý:** (1) đơn giản nhất — giữ thao tác chuyển tiền trong **một transaction của một database** (strong consistency), tức không tách bất đồng bộ phần lõi này. (2) Nếu buộc phải phân tán — dùng **saga pattern** với bước **bù trừ** (compensating transaction): nếu cộng B thất bại thì hoàn lại A; kèm **idempotency key** để xử lý lại sự kiện không gây cộng/trừ trùng. Không "phát sự kiện rồi hy vọng".

**Bài 5.** Đề xuất là **over-engineering nghiêm trọng**. Bối cảnh: đội 3 người, MVP, ý tưởng *chưa kiểm chứng* → NFR ưu tiên là **đi nhanh + dễ đổi hướng**, *không* phải scale hay tự chủ nhiều đội (chưa có nhiều đội, chưa có tải). 10 microservices + Kafka + hexagonal đầy đủ sẽ: tốn phần lớn thời gian dựng hạ tầng thay vì kiểm chứng ý tưởng; mỗi thay đổi phải sờ nhiều service; 3 người không kham nổi vận hành. **Khuyến nghị: modular monolith** — một codebase/một tiến trình/một DB, *chia module rõ ràng* theo nghiệp vụ, có thể đặt interface ở vài biên giới quan trọng (chuẩn bị *rẻ*) để dễ tách sau. Lý do theo NFR: thỏa "đi nhanh + dễ đổi" với chi phí thấp nhất; tách microservice *sau* khi ý tưởng được kiểm chứng và biên giới nghiệp vụ rõ.

**Bài 6.** Chọn **strong consistency** cho thao tác "giữ vé". Vì yêu cầu nghiệp vụ là **không được oversell** — mỗi vé bán cho *đúng một* người, đây là ràng buộc *bất biến tức thì*. Eventual consistency mở ra cửa sổ thời gian hai người *cùng thấy vé còn trống* rồi *cùng mua* → bán trùng (double-sell). Strong consistency (vd dùng transaction + khóa hàng/\`SELECT ... FOR UPDATE\`, hoặc thao tác atomic giảm tồn kho có điều kiện) đảm bảo chỉ một giao dịch thành công. Đây là trường hợp "số dư/tồn kho duy nhất" ở mục 5: nhất quán tức thì là bắt buộc, không đánh đổi được.

---

## 8. Code & Minh họa

- [visualization.html](./visualization.html) — 3 mô-đun tương tác:
  1. **Monolith vs Microservices** — bật/tắt giữa hai sơ đồ SVG, hiện trade-off (gọi hàm vs gọi mạng, 1 DB vs N DB, vận hành).
  2. **Layered architecture** — click từng tầng (Presentation / Business / Data) để xem vai trò và chiều phụ thuộc.
  3. **Quiz chọn kiến trúc** — đọc tình huống, chọn kiến trúc phù hợp, nhận giải thích theo yêu cầu phi chức năng.

## 9. Bài tiếp theo

- [Lesson 02 — Thiết kế API](../lesson-02-thiet-ke-api/) — khi đã chọn cấu trúc lớn, bước tiếp là thiết kế **hợp đồng giao tiếp** giữa các thành phần/service.
- Liên quan ngược: [Coupling & Cohesion](../../02-Design-Quality/lesson-03-coupling-cohesion/) (kiến trúc là coupling/cohesion mức hệ thống), [Nguyên lý thiết kế](../../02-Design-Quality/lesson-02-nguyen-ly-thiet-ke/) (DIP là nền của hexagonal), [Yêu cầu & đặc tả](../../01-Foundations/lesson-03-yeu-cau-dac-ta/) (NFR lái lựa chọn kiến trúc).
`;
