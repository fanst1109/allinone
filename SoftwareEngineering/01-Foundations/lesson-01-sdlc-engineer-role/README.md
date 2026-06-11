# Lesson 01 — Vòng đời phần mềm (SDLC) & vai trò kỹ sư

## Mục tiêu

- Phân biệt **viết code** (programming) với **kỹ thuật phần mềm** (software engineering): vì sao một dự án thật cần kỷ luật, quy trình, cộng tác — không chỉ là gõ ra code chạy được.
- Nắm 6 giai đoạn của **vòng đời phát triển phần mềm** (SDLC — Software Development Life Cycle) và việc gì xảy ra ở mỗi giai đoạn.
- So sánh hai họ mô hình quy trình: **Waterfall** (tuần tự) vs **Iterative/Incremental** (lặp tăng dần) — khi nào dùng cái nào.
- Hiểu **đường cong chi phí sửa lỗi**: vì sao một lỗi phát hiện muộn đắt hơn gấp bội.

## Kiến thức tiền đề

- Biết lập trình cơ bản (đã viết được chương trình nhỏ). Tham khảo [Programming — tư duy lập trình](../../../Programming/lesson-01-thinking-like-programmer/).
- Không cần kiến thức quản lý dự án trước.

> 💡 **Vì sao có lĩnh vực này, tách khỏi `Programming`?** `Programming` dạy *viết code bằng Go* — cú pháp, kiểu dữ liệu, thuật toán. `SoftwareEngineering` dạy *làm phần mềm thật cùng người khác*: hứng yêu cầu mơ hồ từ khách, chia việc cho nhóm, giữ code không mục theo thời gian, triển khai an toàn. Một người code giỏi mà không có kỷ luật kỹ thuật vẫn tạo ra hệ thống không ai bảo trì nổi sau 6 tháng.

---

## 1. "Code chạy được" ≠ "phần mềm tốt"

💡 **Trực giác.** So với xây nhà: ai cũng đóng được một cái chòi (1 người, 1 ngày, không bản vẽ). Nhưng xây một chung cư 20 tầng cần bản vẽ, đội thợ phối hợp, kiểm định an toàn, bảo trì. Phần mềm cũng vậy — một script 50 dòng khác hẳn một hệ thống 500.000 dòng do 30 người duy trì suốt 10 năm.

Khác biệt cốt lõi giữa *code cá nhân* và *phần mềm kỹ thuật*:

| Tiêu chí | Script cá nhân | Phần mềm kỹ thuật |
|----------|----------------|-------------------|
| Người đọc code | Chỉ mình bạn, ngay bây giờ | Cả nhóm + chính bạn 1 năm sau |
| Yêu cầu | Trong đầu bạn | Phải đặc tả, thống nhất với khách |
| Lỗi | Tự chịu | Ảnh hưởng người dùng / tiền bạc |
| Thay đổi | Viết lại từ đầu cũng được | Phải sửa an toàn, không phá thứ đang chạy |
| Vòng đời | Vài giờ | Nhiều năm, qua nhiều người |

> ❓ **"Vậy software engineering có phải chỉ là 'thủ tục giấy tờ' làm chậm việc?"** Không. Mục tiêu của nó là **giảm chi phí dài hạn**, không phải thêm nghi thức. Mỗi thực hành (test, review, tài liệu) tồn tại để trả lời một rủi ro cụ thể: "sửa chỗ này có làm hỏng chỗ kia không?", "người mới vào hiểu hệ thống thế nào?". Bỏ qua chúng = trả nợ với lãi suất cao về sau (xem [Tier 02 — nợ kỹ thuật](../../README.md)).

📝 **Tóm tắt mục 1.** Kỹ thuật phần mềm = làm cho phần mềm **đúng, bền, sửa được, cộng tác được** ở quy mô và thời gian dài — không chỉ "chạy lần đầu". Quy mô và tuổi thọ là thứ biến "code" thành "kỹ thuật".

---

## 2. SDLC — sáu giai đoạn của một vòng đời

💡 **Trực giác.** SDLC là "công thức nấu ăn" tổng quát cho việc làm phần mềm: từ lúc nghe khách nói "tôi muốn..." đến lúc hệ thống chạy và được bảo trì. Mọi mô hình quy trình (Waterfall, Agile...) chỉ khác nhau ở **thứ tự** và **nhịp lặp** của các giai đoạn này, chứ các giai đoạn thì luôn có.

| # | Giai đoạn | Câu hỏi trả lời | Sản phẩm đầu ra |
|---|-----------|-----------------|-----------------|
| 1 | **Yêu cầu** (Requirements) | Cần xây *cái gì*, cho *ai*? | Tài liệu đặc tả, user story |
| 2 | **Thiết kế** (Design) | Xây *như thế nào*? | Kiến trúc, sơ đồ, hợp đồng API |
| 3 | **Hiện thực** (Implementation) | Viết code | Mã nguồn |
| 4 | **Kiểm thử** (Testing) | Nó có *đúng* không? | Báo cáo test, bug đã sửa |
| 5 | **Triển khai** (Deployment) | Đưa tới người dùng | Bản chạy thật (production) |
| 6 | **Bảo trì** (Maintenance) | Sửa lỗi & tiến hóa | Bản vá, tính năng mới |

> ⚠ **Lỗi thường gặp.** Người mới hay nhảy thẳng từ giai đoạn 1 sang 3 ("nghe xong là code luôn"), bỏ qua **thiết kế** và xem nhẹ **yêu cầu**. Hậu quả: xây xong mới phát hiện hiểu sai nhu cầu, hoặc kiến trúc không mở rộng được → đập đi làm lại. Phần mềm thất bại phần lớn vì *làm sai thứ* (sai yêu cầu), không phải *làm sai cách* (bug code).

> 🔁 **Dừng lại tự kiểm tra.** Một bạn dev nhận yêu cầu "làm chức năng tìm kiếm sản phẩm" rồi code ngay trong 2 ngày. Tuần sau khách bảo "tôi cần tìm cả theo nhà cung cấp và lọc theo khoảng giá nữa". Giai đoạn nào đã bị làm hời hợt?
> <details><summary>Đáp án</summary>Giai đoạn 1 — <b>Yêu cầu</b>. "Tìm kiếm" là mô tả mơ hồ; chưa làm rõ tìm theo trường nào, có lọc/sắp xếp không. Bỏ công làm rõ yêu cầu trước sẽ rẻ hơn nhiều so với code lại. Sẽ học kỹ ở <a href="../lesson-03-requirements-spec/">Lesson 03 — Yêu cầu & đặc tả</a>.</details>

📝 **Tóm tắt mục 2.** SDLC = 6 giai đoạn: Yêu cầu → Thiết kế → Hiện thực → Kiểm thử → Triển khai → Bảo trì. Các mô hình quy trình khác nhau ở *nhịp lặp* qua sáu giai đoạn này.

---

## 3. Mô hình Waterfall — tuần tự, một chiều

💡 **Trực giác.** Waterfall ("thác nước") làm xong hẳn một giai đoạn rồi mới sang giai đoạn sau, như nước chỉ chảy xuôi xuống. Hoàn tất toàn bộ yêu cầu → toàn bộ thiết kế → toàn bộ code → toàn bộ test → release một lần.

```
Yêu cầu ──► Thiết kế ──► Hiện thực ──► Kiểm thử ──► Triển khai ──► Bảo trì
  (xong)      (xong)        (xong)        (xong)         (xong)
```

**Ưu điểm:** rõ ràng, dễ quản lý mốc & hợp đồng, hợp với dự án **yêu cầu cố định và đã hiểu rõ** (vd phần mềm điều khiển thiết bị y tế theo chuẩn pháp lý).

**Nhược điểm:** giả định "biết hết yêu cầu từ đầu" — hiếm khi đúng. Khách chỉ thấy sản phẩm ở *cuối*, lúc đó sửa hướng đi thì rất đắt.

> ❓ **"Waterfall lỗi thời rồi, học làm gì?"** Vẫn cần hiểu vì hai lý do: (1) nhiều ngữ cảnh thật (hợp đồng cố định, hệ thống an toàn-tính-mạng, phần cứng) vẫn dùng nó hoặc biến thể; (2) hiểu *vì sao* Waterfall đau ở đâu mới hiểu *vì sao* Agile ra đời để chữa (xem [Lesson 02](../lesson-02-agile-scrum-kanban/)).

📝 **Tóm tắt mục 3.** Waterfall = tuần tự một chiều, mỗi giai đoạn xong hẳn mới sang bước kế. Tốt khi yêu cầu cố định & rõ; rủi ro cao khi yêu cầu còn mơ hồ hoặc dễ đổi.

---

## 4. Mô hình lặp & tăng dần (Iterative / Incremental)

💡 **Trực giác.** Thay vì xây cả tòa nhà rồi mới cho xem, ta xây **một phòng hoàn chỉnh**, cho khách dùng thử, lấy phản hồi, rồi xây phòng tiếp. Mỗi vòng lặp (iteration) đi qua *tất cả* các giai đoạn SDLC nhưng cho **một lát cắt nhỏ** của hệ thống, và cho ra một bản chạy được.

```
Vòng 1: [YC→TK→Code→Test→Giao]  → bản v0.1 (đăng nhập)
Vòng 2: [YC→TK→Code→Test→Giao]  → bản v0.2 (+ giỏ hàng)
Vòng 3: [YC→TK→Code→Test→Giao]  → bản v0.3 (+ thanh toán)
          ... mỗi vòng đều giao được thứ dùng được ...
```

- **Iterative** (lặp): mỗi vòng *cải thiện* thứ đã có (làm tinh hơn).
- **Incremental** (tăng dần): mỗi vòng *thêm* tính năng mới.
- Thực tế thường kết hợp cả hai — đây chính là nền của **Agile** (Lesson 02).

> ⚠ **Lỗi thường gặp.** "Lặp" **không phải** là "chia code thành nhiều phần rồi cuối cùng mới ghép & test". Đặc trưng cốt lõi là mỗi vòng cho ra **một bản chạy được, giao được** — để lấy phản hồi sớm. Nếu cuối cùng mới có thứ chạy được thì đó vẫn là Waterfall trá hình.

> 🔁 **Dừng lại tự kiểm tra.** Vì sao mô hình lặp giảm rủi ro "làm sai thứ khách cần" so với Waterfall?
> <details><summary>Đáp án</summary>Vì khách được thấy & dùng bản chạy thật <b>sau mỗi vòng ngắn</b>, nên hiểu lầm về yêu cầu lộ ra sớm — khi sửa còn rẻ. Waterfall chỉ cho khách thấy ở cuối, lúc sai thì sửa rất đắt (xem mục 5).</details>

📝 **Tóm tắt mục 4.** Lặp & tăng dần = chia hệ thống thành các lát cắt nhỏ, mỗi vòng đi hết SDLC và **giao được một bản chạy**. Lấy phản hồi sớm → giảm rủi ro làm sai. Đây là nền của Agile.

---

## 5. Đường cong chi phí sửa lỗi — vì sao "phát hiện sớm" là vàng

💡 **Trực giác.** Một lỗi giống vết nứt trong móng nhà: phát hiện lúc đổ móng thì trám vài phút; phát hiện khi nhà đã xây xong thì phải đập tường, đào lại. Lỗi phần mềm cũng đắt dần theo giai đoạn vì càng muộn càng nhiều thứ đã *xây dựa trên* nó.

Số liệu kinh điển (Boehm) — chi phí *tương đối* để sửa **cùng một lỗi** tùy giai đoạn phát hiện:

| Phát hiện ở giai đoạn | Chi phí tương đối |
|-----------------------|:-----------------:|
| Yêu cầu | 1× |
| Thiết kế | ~3–6× |
| Hiện thực (code) | ~10× |
| Kiểm thử | ~15–40× |
| Sau khi lên production | ~30–100× |

**Ví dụ số cụ thể.** Một hiểu lầm yêu cầu ("ngày sinh nhập theo dd/mm hay mm/dd?"):
- Bắt ở giai đoạn yêu cầu: hỏi lại khách 1 câu — *5 phút*.
- Bắt khi đã code & test: sửa code + sửa test + review lại — *vài giờ*.
- Bắt sau khi lên production: dữ liệu hàng nghìn user đã lưu sai định dạng → phải viết script di trú dữ liệu, thông báo, có thể bồi thường — *nhiều ngày + rủi ro uy tín*.

> ❓ **"Con số 100× có thật không, hay phóng đại?"** Tỷ lệ chính xác tùy loại dự án và gây tranh luận, nhưng **xu hướng tăng mạnh theo giai đoạn** thì nhất quán qua nhiều nghiên cứu. Bài học rút ra không phải con số cụ thể mà là nguyên lý: **đầu tư vào phát hiện sớm** (làm rõ yêu cầu, review thiết kế, test tự động) gần như luôn rẻ hơn sửa muộn.

> ⚠ **Lỗi thường gặp.** "Để sau hẵng test / hẵng làm rõ" nghe như tiết kiệm thời gian *bây giờ*, nhưng thực ra là **vay nợ với lãi cắt cổ** — chi phí dồn về cuối lớn hơn nhiều.

> 🔁 **Dừng lại tự kiểm tra.** Đội A bỏ 2 ngày viết test tự động trước khi release; đội B bỏ qua để release sớm 2 ngày, sau đó tốn 6 ngày sửa lỗi production rải rác trong tháng. Ai "nhanh" hơn?
> <details><summary>Đáp án</summary>Đội A. B "nhanh" 2 ngày trước mắt nhưng tốn thêm 6 ngày sau + rủi ro uy tín — tổng đắt hơn. Đây chính là đường cong chi phí: lỗi bắt muộn (production) đắt hơn bắt sớm (trước release) nhiều lần.</details>

📝 **Tóm tắt mục 5.** Chi phí sửa cùng một lỗi tăng vọt theo giai đoạn phát hiện (1× → tới 30–100× ở production). Hệ quả thực hành: ưu tiên **phát hiện sớm** — làm rõ yêu cầu, review, test tự động — vì nó rẻ hơn nhiều so với sửa muộn.

---

## 6. Vai trò trong một nhóm kỹ thuật

💡 **Trực giác.** Phần mềm thật hiếm khi do một người làm. Hiểu các vai trò giúp bạn biết "ai trả lời câu hỏi gì" và mình khớp vào đâu.

| Vai trò | Lo việc gì |
|---------|------------|
| **Product Owner / Manager** | *Cái gì* & *vì sao* — ưu tiên tính năng theo giá trị kinh doanh |
| **Software Engineer / Developer** | *Như thế nào* — thiết kế & viết code, test |
| **Tech Lead / Architect** | Định hướng kỹ thuật, kiến trúc, chuẩn chung |
| **QA / Tester** | Kiểm thử, đảm bảo chất lượng |
| **DevOps / SRE** | Hạ tầng, CI/CD, vận hành, độ tin cậy (xem Tier 03) |
| **Designer (UX/UI)** | Trải nghiệm & giao diện người dùng |

> ❓ **"Là dev thì chỉ cần code, kệ mấy vai trò kia?"** Không nên. Dev hiểu góc nhìn Product thì code đúng thứ cần; hiểu QA thì viết code dễ test; hiểu DevOps thì viết code dễ triển khai & giám sát. Kỹ sư giỏi là người *cộng tác xuyên vai trò*, không phải "thợ code" đơn lẻ.

📝 **Tóm tắt mục 6.** Phần mềm là nỗ lực nhóm với nhiều vai trò (Product, Dev, Lead, QA, DevOps, Designer). Hiểu các vai trò xung quanh giúp bạn cộng tác hiệu quả và viết code phù hợp với cả vòng đời.

---

## 7. Bài tập

1. Liệt kê 6 giai đoạn SDLC theo đúng thứ tự và nêu *một câu hỏi* mỗi giai đoạn trả lời.
2. Một startup làm app gọi xe, thị trường thay đổi nhanh, chưa chắc tính năng nào người dùng thích. Nên chọn Waterfall hay mô hình lặp? Vì sao?
3. Một lỗi "tính sai thuế VAT" được phát hiện. Ước lượng (định tính) chi phí sửa nếu bắt ở (a) giai đoạn yêu cầu, (b) sau khi đã lên production và chạy 3 tháng. Giải thích chênh lệch.
4. Phân biệt "iterative" và "incremental" bằng một ví dụ cụ thể về một app ghi chú.
5. Bạn là dev được giao "làm trang dashboard". Nêu 3 câu hỏi bạn nên hỏi *trước khi* code (giai đoạn nào?).

## Lời giải chi tiết

**Bài 1.** (1) Yêu cầu — "xây *cái gì*, cho *ai*?"; (2) Thiết kế — "xây *như thế nào*?"; (3) Hiện thực — "viết code thế nào cho đúng thiết kế?"; (4) Kiểm thử — "nó có *đúng* không?"; (5) Triển khai — "đưa tới người dùng ra sao?"; (6) Bảo trì — "sửa lỗi & thêm tính năng thế nào?".

**Bài 2.** Chọn **mô hình lặp** (tiến tới Agile). Lý do: yêu cầu *chưa rõ và dễ đổi* — đúng điểm yếu chí mạng của Waterfall. Mô hình lặp cho ra bản chạy sớm, thu phản hồi người dùng thật mỗi vòng ngắn, đổi hướng khi cần với chi phí thấp. Waterfall sẽ "khóa cứng" yêu cầu sai từ đầu và chỉ phát hiện ở cuối.

**Bài 3.** (a) Giai đoạn yêu cầu: chỉ là sửa một dòng đặc tả/công thức trước khi code — vài phút, gần như miễn phí. (b) Sau 3 tháng production: hàng loạt hóa đơn đã xuất sai thuế → phải sửa code, viết script tính lại & điều chỉnh dữ liệu cũ, thông báo khách, có thể liên quan pháp lý/kế toán — tốn nhiều ngày và rủi ro uy tín/pháp lý. Chênh lệch do càng muộn càng nhiều thứ đã *phụ thuộc* vào phần sai (đường cong chi phí mục 5).

**Bài 4.** App ghi chú. *Incremental* (tăng dần — thêm tính năng mới mỗi vòng): vòng 1 chỉ tạo/xem note; vòng 2 thêm tìm kiếm; vòng 3 thêm đồng bộ đám mây. *Iterative* (lặp — cải thiện cái đã có): vòng 1 tìm kiếm khớp chính xác; vòng 2 cải thiện thành tìm gần đúng; vòng 3 thêm xếp hạng kết quả. Thực tế kết hợp: vừa thêm tính năng vừa làm tinh tính năng cũ.

**Bài 5.** Đây là giai đoạn **Yêu cầu** (làm rõ trước khi code). Ba câu hỏi ví dụ: (1) "Dashboard này cho *ai* dùng và họ cần *quyết định gì* từ nó?" (mục đích); (2) "Cần hiển thị *chỉ số* nào, cập nhật *thời gian thực* hay theo ngày?" (phạm vi dữ liệu); (3) "Có cần lọc/xuất báo cáo/phân quyền xem không?" (ràng buộc & tính năng phụ). Hỏi trước giúp tránh code sai thứ — rẻ hơn sửa sau.

---

## 8. Code & Minh họa

- [visualization.html](./visualization.html) — 3 mô-đun tương tác: (1) so sánh Waterfall vs Lặp trên cùng một dự án (xem khi nào khách thấy sản phẩm & rủi ro lộ ra), (2) đường cong chi phí sửa lỗi (kéo giai đoạn phát hiện, xem chi phí nhảy), (3) ghép giai đoạn SDLC đúng thứ tự.

## 9. Bài tiếp theo

- [Lesson 02 — Agile, Scrum & Kanban](../lesson-02-agile-scrum-kanban/) — cụ thể hóa mô hình lặp thành quy trình làm việc nhóm hằng ngày.
- Liên quan: vai trò DevOps & vận hành sẽ học ở Tier 03 (Kiến trúc & vận hành) — xem [trang chính lĩnh vực](../../index.html).
