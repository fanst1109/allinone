# Lesson 03 — Yêu cầu & đặc tả (Requirements)

## Mục tiêu

- Phân biệt **yêu cầu chức năng** (functional requirement) và **yêu cầu phi chức năng** (non-functional requirement) — biết phần mềm phải *làm gì* so với phải *làm tốt đến mức nào*.
- Hiểu vì sao **yêu cầu mơ hồ** là nguồn gốc thất bại phổ biến nhất, và cách biến một câu mơ hồ thành **tiêu chí đo được** (testable).
- Viết được **user story** theo mẫu chuẩn "Là <ai>, tôi muốn <gì>, để <mục đích gì>".
- Viết được **acceptance criteria** (tiêu chí chấp nhận) theo mẫu **Given/When/Then**.
- Nhận diện **đặc điểm của một yêu cầu tốt**: rõ ràng, đo được, khả thi, không mâu thuẫn, có thể truy vết.
- Dùng **MoSCoW** (Must / Should / Could / Won't) để ưu tiên yêu cầu khi nguồn lực có hạn.

## Kiến thức tiền đề

- [Lesson 01 — Vòng đời phần mềm (SDLC) & vai trò kỹ sư](../lesson-01-sdlc-engineer-role/) — đặc biệt là **giai đoạn 1 "Yêu cầu"** trong SDLC: bài này đào sâu chính giai đoạn đó. Nhắc lại: giai đoạn Yêu cầu trả lời câu hỏi *"xây cái gì, cho ai?"* và sản phẩm đầu ra là tài liệu đặc tả + user story. Đường cong chi phí sửa lỗi (mục 5 của Lesson 01) cho thấy lỗi yêu cầu bắt sớm rẻ hơn bắt muộn tới 30–100 lần — đó là lý do bài này quan trọng.
- [Lesson 02 — Agile, Scrum & Kanban](../lesson-02-agile-scrum-kanban/) — user story và acceptance criteria là "đơn vị công việc" của backlog trong Scrum; bài này giải thích cách *viết* chúng cho tốt.
- Không cần kiến thức kỹ thuật nâng cao; chỉ cần đã từng dùng một app phần mềm bất kỳ.

> 💡 **Vì sao "yêu cầu" lại là một kỹ năng riêng, không phải chuyện hiển nhiên?** Vì khách hàng nói bằng ngôn ngữ đời thường ("tôi muốn hệ thống nhanh và dễ dùng"), còn kỹ sư cần một đặc tả *đủ chính xác để code và để kiểm thử*. Khoảng cách giữa hai thứ đó chính là nơi đa số dự án trượt chân. Làm rõ yêu cầu là việc *dịch* nhu cầu mơ hồ thành thứ đo được — và đó là một nghề.

---

## 1. Yêu cầu chức năng vs phi chức năng

💡 **Trực giác.** Hình dung mua một chiếc xe. *Chức năng*: "xe phải chạy được, phanh được, bật được đèn" — những việc xe **làm**. *Phi chức năng*: "tăng tốc 0→100 trong 8 giây, tiêu thụ <6L/100km, chạy êm dưới 70dB" — những việc đó xe làm **tốt đến mức nào**. Hai chiếc xe cùng "chạy được" nhưng một chiếc đạt chuẩn an toàn, một chiếc thì không.

**Yêu cầu chức năng (functional requirement)** — mô tả *hành vi* hệ thống: nhận đầu vào gì, làm gì, trả ra gì. Trả lời "hệ thống **làm** gì?".

Bốn ví dụ (app thương mại điện tử):
1. Người dùng có thể đăng ký tài khoản bằng email và mật khẩu.
2. Người dùng có thể thêm sản phẩm vào giỏ hàng.
3. Hệ thống gửi email xác nhận sau khi đặt hàng thành công.
4. Quản trị viên có thể xem danh sách đơn hàng của một ngày.

**Yêu cầu phi chức năng (non-functional requirement, NFR)** — mô tả *chất lượng / ràng buộc* của hệ thống: nhanh đến đâu, an toàn ra sao, chịu tải bao nhiêu. Trả lời "hệ thống làm việc đó **tốt đến mức nào**?". Còn gọi là **thuộc tính chất lượng** (quality attributes) hay "the -ilities" (reliability, scalability, usability...).

Bốn ví dụ (cùng app trên):
1. **Hiệu năng (performance):** trang sản phẩm phải tải xong trong **dưới 2 giây** ở kết nối 4G.
2. **Bảo mật (security):** mật khẩu phải được lưu dưới dạng băm (hash) bcrypt, không bao giờ lưu plaintext.
3. **Khả dụng / sẵn sàng (availability):** hệ thống đạt **uptime ≥ 99.9%** mỗi tháng (tối đa ~43 phút gián đoạn).
4. **Khả mở rộng (scalability):** chịu được **10.000 người dùng đồng thời** trong giờ cao điểm mà không suy giảm quá 20% tốc độ.

> ❓ **Câu hỏi tự nhiên của người đọc.**
> - *"NFR không phải tính năng, sao phải quan tâm?"* Vì NFR thường là thứ quyết định *thành bại* khi lên production. Một app "đủ tính năng" nhưng tải trang 10 giây sẽ mất khách; một app lưu mật khẩu plaintext sẽ bị kiện khi lộ dữ liệu. NFR thường khó sửa muộn (phải đổi kiến trúc), nên cần xác định *sớm*.
> - *"Làm sao biết một yêu cầu là chức năng hay phi chức năng?"* Hỏi: "đây là *việc hệ thống làm* hay *mức độ làm tốt một việc*?". "Cho phép thanh toán" = chức năng. "Thanh toán phải hoàn tất trong 3 giây" = phi chức năng (gắn lên cùng chức năng đó).

⚠ **Lỗi thường gặp.** Chỉ liệt kê yêu cầu chức năng rồi quên hẳn NFR. Hậu quả: code chạy đúng trong demo (1 người dùng) nhưng sập khi có 1.000 người thật, hoặc bị từ chối kiểm định bảo mật. NFR phải được viết ra *cùng lúc* với chức năng, không phải "để sau tính".

> 🔁 **Dừng lại tự kiểm tra.** Phân loại các yêu cầu sau là chức năng (F) hay phi chức năng (NF): (a) "Người dùng có thể đặt lại mật khẩu qua email"; (b) "API phản hồi trong dưới 200ms ở 95% request"; (c) "Hỗ trợ tiếng Việt và tiếng Anh"; (d) "Dữ liệu được mã hóa khi truyền (HTTPS)".
> <details><summary>Đáp án</summary>(a) <b>F</b> — một việc hệ thống làm. (b) <b>NF</b> — hiệu năng, mức độ nhanh. (c) thường xem là <b>F</b> (tính năng đa ngôn ngữ) nhưng có thể coi là NF nếu phát biểu dạng ràng buộc "mọi text hiển thị phải hỗ trợ i18n". (d) <b>NF</b> — bảo mật. Lưu ý (c): ranh giới đôi khi mờ, điều quan trọng là *viết ra được* chứ không phải tranh cãi nhãn.</details>

📝 **Tóm tắt mục 1.** Yêu cầu **chức năng** = hệ thống *làm gì* (hành vi); yêu cầu **phi chức năng** = hệ thống làm *tốt đến mức nào* (hiệu năng, bảo mật, khả dụng, khả mở rộng). Cả hai phải được viết ra sớm — NFR đặc biệt khó sửa muộn.

---

## 2. Vì sao yêu cầu mơ hồ là nguồn gốc thất bại

💡 **Trực giác.** Một yêu cầu mơ hồ giống như đặt taxi mà chỉ nói "chở tôi đi chỗ nào đó đẹp đẹp". Mỗi người hiểu một kiểu: tài xế chở ra biển, bạn lại muốn lên núi. Khi yêu cầu không đo được, *mỗi người trong nhóm tự lấp khoảng trống bằng giả định riêng* — và các giả định đó mâu thuẫn nhau, lộ ra muộn, lúc sửa thì đắt (đường cong chi phí, [Lesson 01 mục 5](../lesson-01-sdlc-engineer-role/)).

Câu mơ hồ kinh điển: **"Hệ thống phải nhanh."**

Vì sao tệ:
- *Nhanh* là bao nhiêu? 1 giây? 5 giây? Với thao tác nào — tải trang, tìm kiếm, xuất báo cáo?
- Đo ở đâu — máy lập trình viên (mạng nội bộ, dữ liệu nhỏ) hay người dùng thật (4G, dữ liệu lớn)?
- Không có con số → **không ai biết khi nào thì "xong"**, và QA không thể viết test để kiểm chứng.

**Làm rõ thành tiêu chí đo được:**

> "**95% request tải trang danh sách sản phẩm phải hoàn tất trong dưới 2 giây**, đo ở phía người dùng (client) trên kết nối 4G, với danh mục 10.000 sản phẩm."

Giờ thì: có con số (2s), có phân vị (95%), có điều kiện đo (4G, client-side), có quy mô dữ liệu (10.000 sp). QA viết được test, dev biết khi nào đạt.

Vài câu mơ hồ khác và bản làm rõ:

| Mơ hồ | Làm rõ (đo được) |
|-------|------------------|
| "Giao diện phải thân thiện" | "Người dùng mới hoàn tất đặt đơn hàng đầu tiên trong ≤ 3 phút mà không cần hướng dẫn." |
| "Hệ thống phải ổn định" | "Uptime ≥ 99.9%/tháng; không quá 1 sự cố nghiêm trọng/quý." |
| "Tìm kiếm phải tốt" | "Tìm theo tên + nhà cung cấp; trả kết quả trong <500ms; có gợi ý khi gõ ≥ 2 ký tự." |
| "Bảo mật cao" | "Mật khẩu băm bcrypt; khóa tài khoản sau 5 lần đăng nhập sai; phiên hết hạn sau 30 phút." |

> ❓ **Câu hỏi tự nhiên của người đọc.**
> - *"Khách thường nói mơ hồ — chẳng lẽ bắt họ viết chuẩn?"* Không bắt khách viết; **việc của kỹ sư là hỏi lại để làm rõ**. Mẫu câu hỏi vàng: "Khi anh nói 'nhanh', cụ thể là bao nhiêu giây, cho thao tác nào?". Mỗi câu hỏi sớm tiết kiệm hàng ngày sửa muộn.
> - *"Đo được nghĩa là phải có số?"* Không nhất thiết là số tuyệt đối, nhưng phải **kiểm chứng được đúng/sai một cách khách quan**. "Hoàn tất trong ≤ 3 phút" đo được; "thân thiện" thì không.

⚠ **Lỗi thường gặp.** Dùng các tính từ "co giãn" mà không định lượng: *nhanh, dễ dùng, ổn định, an toàn, đẹp, hiện đại, trực quan*. Mỗi lần gặp một tính từ như vậy trong đặc tả, hãy coi đó là **cờ đỏ** và hỏi "đo bằng gì?".

> 🔁 **Dừng lại tự kiểm tra.** Làm rõ câu mơ hồ: "Báo cáo phải xuất nhanh." Cần thêm thông tin gì?
> <details><summary>Đáp án</summary>Cần: (1) *nhanh* là bao nhiêu giây (vd "< 10s"); (2) báo cáo *kích thước nào* (vd "với 50.000 dòng dữ liệu"); (3) *định dạng* gì (PDF/Excel/CSV); (4) đo ở đâu. Ví dụ làm rõ: "Xuất báo cáo doanh thu 50.000 dòng ra Excel trong dưới 10 giây."</details>

📝 **Tóm tắt mục 2.** Yêu cầu mơ hồ khiến mỗi người hiểu một kiểu → sai lộ ra muộn → sửa đắt. Mọi tính từ co giãn (nhanh, dễ dùng, ổn định) là cờ đỏ — phải làm rõ thành **tiêu chí đo được** (có con số / điều kiện / kiểm chứng khách quan).

---

## 3. User story — đơn vị mô tả yêu cầu

💡 **Trực giác.** Thay vì viết một đặc tả kỹ thuật khô khan ("hệ thống phải có endpoint POST /cart"), user story kể một *câu chuyện ngắn từ góc nhìn người dùng*: ai cần gì, để làm gì. Nó giữ cho cả nhóm luôn nhớ "ta đang giải quyết nhu cầu thật của ai", không lạc vào kỹ thuật thuần.

Mẫu chuẩn:

> **Là** <vai trò / loại người dùng>, **tôi muốn** <một hành động / khả năng>, **để** <đạt được mục đích / giá trị gì>.

Ba phần và vì sao quan trọng:
- **Là <ai>** — xác định *vai trò*, vì cùng một tính năng có thể khác nhau với khách, admin, khách vãng lai.
- **tôi muốn <gì>** — *hành động* cụ thể người dùng làm.
- **để <mục đích>** — *lý do / giá trị*. Đây là phần hay bị bỏ nhất nhưng quan trọng nhất: nó cho biết *vì sao* cần tính năng, giúp ưu tiên và đôi khi gợi ra giải pháp tốt hơn.

**Ví dụ — nhiều story cho một app đặt món ăn:**

1. **Là** thực khách, **tôi muốn** lọc nhà hàng theo loại món (Việt, Nhật, chay...), **để** nhanh chóng tìm thứ mình thèm.
2. **Là** thực khách, **tôi muốn** lưu địa chỉ giao hàng thường dùng, **để** không phải nhập lại mỗi lần đặt.
3. **Là** thực khách, **tôi muốn** theo dõi tài xế trên bản đồ thời gian thực, **để** biết khi nào món tới mà chủ động.
4. **Là** chủ nhà hàng, **tôi muốn** tạm ẩn món hết hàng, **để** khách không đặt món tôi không phục vụ được.
5. **Là** tài xế, **tôi muốn** nhận thông báo đơn mới kèm khoảng cách, **để** quyết định có nhận đơn hay không.

> ❓ **Câu hỏi tự nhiên của người đọc.**
> - *"User story có phải là đặc tả đầy đủ không?"* Không. Story là *lời nhắc về một cuộc trò chuyện*, không phải tài liệu chi tiết. Chi tiết "đúng/sai thế nào" nằm ở **acceptance criteria** (mục 4). Story trả lời *cái gì + vì sao*; acceptance criteria trả lời *khi nào coi là xong*.
> - *"Phần 'để...' có bắt buộc không?"* Rất nên có. Nếu không viết được phần "để", có thể tính năng đó *không thực sự cần*. Nó cũng là cách kiểm tra giá trị.

⚠ **Lỗi thường gặp.** Viết story theo góc nhìn *kỹ thuật* thay vì *người dùng*: "Là hệ thống, tôi muốn có một bảng `orders`, để lưu đơn." Sai — "hệ thống" và "bảng orders" là chi tiết hiện thực, không phải nhu cầu người dùng. Story phải bắt đầu từ một *con người* có mục đích.

> 🔁 **Dừng lại tự kiểm tra.** Viết một user story cho tính năng "đổi mật khẩu" của một app ngân hàng.
> <details><summary>Đáp án</summary>"<b>Là</b> chủ tài khoản, <b>tôi muốn</b> đổi mật khẩu đăng nhập, <b>để</b> giữ tài khoản an toàn khi nghi ngờ mật khẩu cũ bị lộ." Lưu ý phần "để" làm rõ giá trị bảo mật — gợi ý rằng tính năng nên kèm yêu cầu xác thực lại / thông báo cho người dùng.</details>

📝 **Tóm tắt mục 3.** User story = mô tả yêu cầu từ góc nhìn người dùng theo mẫu **"Là <ai>, tôi muốn <gì>, để <mục đích>"**. Phần "để" (giá trị) quan trọng nhất nhưng hay bị bỏ. Story là lời nhắc trò chuyện, *cái gì + vì sao*; chi tiết "xong khi nào" thuộc về acceptance criteria.

---

## 4. Acceptance criteria — khi nào coi là "xong"

💡 **Trực giác.** Acceptance criteria (tiêu chí chấp nhận) là *bản hợp đồng kiểm tra*: danh sách điều kiện cụ thể để cả nhóm — dev, QA, product — thống nhất "tính năng này coi như hoàn thành khi và chỉ khi...". Nó biến một story (kể chuyện) thành các tình huống *kiểm chứng được đúng/sai*.

Mẫu phổ biến nhất là **Given / When / Then** (Cho trước / Khi / Thì):

> **Given** (Cho trước) <bối cảnh / trạng thái ban đầu>
> **When** (Khi) <hành động xảy ra>
> **Then** (Thì) <kết quả mong đợi>

**Ví dụ 1 — cho story "đăng nhập":**

Story: *Là người dùng, tôi muốn đăng nhập bằng email + mật khẩu, để truy cập tài khoản của mình.*

Acceptance criteria:
- **Given** người dùng đã có tài khoản hợp lệ
  **When** họ nhập đúng email và mật khẩu rồi bấm "Đăng nhập"
  **Then** hệ thống chuyển tới trang chủ và hiển thị tên người dùng.
- **Given** người dùng nhập sai mật khẩu
  **When** bấm "Đăng nhập"
  **Then** hiển thị thông báo "Email hoặc mật khẩu không đúng" và *không* tiết lộ email có tồn tại hay không.
- **Given** người dùng nhập sai mật khẩu **5 lần liên tiếp**
  **When** thử đăng nhập lần thứ 6
  **Then** tài khoản bị khóa tạm thời 15 phút và gửi email cảnh báo.

**Ví dụ 2 — cho story "lọc nhà hàng theo loại món":**

- **Given** đang ở màn hình danh sách nhà hàng
  **When** người dùng chọn bộ lọc "Món chay"
  **Then** chỉ hiển thị các nhà hàng có ít nhất một món chay, sắp theo khoảng cách gần nhất.
- **Given** không có nhà hàng nào khớp bộ lọc
  **When** áp dụng bộ lọc
  **Then** hiển thị thông báo "Không tìm thấy nhà hàng phù hợp" kèm nút "Xóa bộ lọc".

> ❓ **Câu hỏi tự nhiên của người đọc.**
> - *"Acceptance criteria khác test case thế nào?"* Acceptance criteria là *điều kiện chấp nhận viết bằng ngôn ngữ nghiệp vụ* (ai cũng đọc hiểu, kể cả product/khách). Test case là *kịch bản kỹ thuật cụ thể* QA viết để kiểm. Một acceptance criterion thường sinh ra nhiều test case. Mẫu Given/When/Then cũng là nền của **BDD** (Behavior-Driven Development) và cú pháp Gherkin trong công cụ như Cucumber.
> - *"Phải liệt kê hết mọi trường hợp à?"* Tập trung vào các *đường đi chính* + *các ca biên/lỗi quan trọng* (sai mật khẩu, rỗng, quá tải). Không cần liệt kê mọi tổ hợp — chỉ những ca làm thay đổi hành vi.

⚠ **Lỗi thường gặp.** Viết acceptance criteria mơ hồ không kém yêu cầu gốc: "Then đăng nhập thành công" (thành công *trông như thế nào*?). Phải cụ thể hóa kết quả quan sát được: "chuyển tới trang chủ, hiển thị tên, tạo phiên hết hạn sau 30 phút".

> 🔁 **Dừng lại tự kiểm tra.** Viết một acceptance criterion (Given/When/Then) cho story "thêm sản phẩm vào giỏ hàng".
> <details><summary>Đáp án</summary><b>Given</b> sản phẩm còn hàng và người dùng đang xem trang sản phẩm; <b>When</b> bấm "Thêm vào giỏ"; <b>Then</b> số lượng trên biểu tượng giỏ tăng thêm 1 và hiển thị thông báo "Đã thêm vào giỏ". Có thể thêm ca biên: <b>Given</b> sản phẩm hết hàng → <b>Then</b> nút "Thêm vào giỏ" bị vô hiệu hóa và hiện "Hết hàng".</details>

📝 **Tóm tắt mục 4.** Acceptance criteria = điều kiện cụ thể để coi một story là "xong", thường viết theo **Given / When / Then**. Phải kiểm chứng đúng/sai khách quan, phủ cả đường đi chính lẫn ca biên/lỗi quan trọng. Là cầu nối giữa story (cái gì) và test case (kiểm thế nào).

---

## 5. Đặc điểm của một yêu cầu tốt

💡 **Trực giác.** Một yêu cầu tốt giống một mũi tên chỉ đường rõ ràng: ai đọc cũng hiểu cùng một hướng, đi tới được, và sau này quay lại còn truy ra "vì sao có cái này". Năm đặc điểm dưới là bộ lọc để loại bỏ yêu cầu "có cũng như không".

| Đặc điểm | Nghĩa | Ví dụ phản chứng (yêu cầu xấu) | Sửa thành tốt |
|----------|-------|-------------------------------|---------------|
| **Rõ ràng** (clear, không nhập nhằng) | Chỉ hiểu được một cách | "Hệ thống xử lý đơn hàng *kịp thời*." | "Đơn hàng được chuyển sang trạng thái 'Đang xử lý' trong ≤ 1 phút sau khi thanh toán thành công." |
| **Đo được / kiểm thử được** (testable) | Kiểm chứng đúng/sai khách quan | "Giao diện phải đẹp." | "Người dùng mới hoàn tất đặt đơn trong ≤ 3 phút (đo qua usability test với 5 người)." |
| **Khả thi** (feasible) | Làm được với công nghệ & nguồn lực hiện có | "Dự đoán chính xác 100% sản phẩm khách sẽ mua tháng sau." | "Gợi ý 5 sản phẩm dựa trên lịch sử mua, đo bằng tỷ lệ click ≥ 10%." |
| **Không mâu thuẫn** (consistent) | Không đối chọi yêu cầu khác | "Mọi thao tác phải xác nhận 2 bước" + "Đặt hàng phải xong trong 1 chạm." | Thống nhất: "Thao tác *nhạy cảm* (thanh toán, xóa tài khoản) cần xác nhận; thao tác thường thì không." |
| **Có thể truy vết** (traceable) | Lần ngược được tới nguồn (story/khách) và xuôi tới code/test | "Thêm nút màu xanh ở góc." (vì sao? cho ai?) | "Story #142: thêm nút 'Đặt lại đơn cũ' cho khách thân thiết để tăng tỷ lệ mua lại." |

> ❓ **Câu hỏi tự nhiên của người đọc.**
> - *"Truy vết (traceable) để làm gì cho phức tạp?"* Vì khi sửa/xóa một tính năng sau này, bạn cần biết *nó phục vụ ai và vì sao* (truy ngược lên story/khách), và *code/test nào liên quan* (truy xuôi xuống). Không truy vết được → không dám động vào vì sợ phá thứ khác. Trong thực tế, gắn ID story vào commit/PR và test là cách truy vết đơn giản.
> - *"Khả thi thì ai chẳng biết, sao thành tiêu chí?"* Vì khách hay yêu cầu thứ bất khả thi mà *nghe có vẻ hợp lý* ("dự đoán chính xác", "hỗ trợ mọi định dạng file", "0 lỗi"). Kỹ sư phải nhận ra và thương lượng lại thành mục tiêu khả thi, đo được.

⚠ **Lỗi thường gặp.** Yêu cầu *mâu thuẫn ngầm*: hai yêu cầu riêng lẻ đều hợp lý nhưng không thể cùng thỏa. Ví dụ "tải trang phải < 1s" + "trang chủ hiển thị 200 sản phẩm kèm ảnh độ phân giải cao" có thể chọi nhau. Phải phát hiện sớm và thương lượng (vd phân trang, lazy-load ảnh).

> 🔁 **Dừng lại tự kiểm tra.** Yêu cầu "Hệ thống phải hỗ trợ nhiều người dùng cùng lúc" vi phạm đặc điểm nào, và sửa thế nào?
> <details><summary>Đáp án</summary>Vi phạm <b>đo được/rõ ràng</b>: "nhiều" là bao nhiêu? Sửa: "Hệ thống chịu được <b>5.000 người dùng đồng thời</b> với thời gian phản hồi trung bình <b>≤ 1s</b> ở 95% request." Giờ QA viết được test tải (load test) để kiểm chứng.</details>

📝 **Tóm tắt mục 5.** Yêu cầu tốt = **rõ ràng** + **đo được** + **khả thi** + **không mâu thuẫn** + **truy vết được**. Mỗi đặc điểm có một ví dụ phản chứng dễ nhận ra; bộ lọc này loại bỏ yêu cầu mơ hồ trước khi chúng gây hại ở giai đoạn sau.

---

## 6. MoSCoW — ưu tiên khi không thể làm hết

💡 **Trực giác.** Khi có 50 yêu cầu nhưng chỉ đủ thời gian cho 20, bạn cần *cách thống nhất xem cái nào trước*. MoSCoW chia yêu cầu thành 4 nhóm ưu tiên — như sắp hành lý vào vali có hạn: thứ *bắt buộc* (hộ chiếu) bỏ trước, thứ *giá như có* (sách đọc) bỏ sau nếu còn chỗ.

Bốn nhóm (các chữ M-o-S-C-o-W):

| Nhóm | Nghĩa | Diễn giải |
|------|-------|-----------|
| **Must have** | *Bắt buộc* | Không có thì sản phẩm vô dụng / không release được. Vd: "đăng nhập", "thanh toán". |
| **Should have** | *Nên có* | Quan trọng nhưng không sống-còn cho lần release này; có cách tạm thay thế. Vd: "đặt lại mật khẩu qua email" (tạm thời có thể nhờ admin reset). |
| **Could have** | *Có thì tốt* | Tốt nếu còn nguồn lực; bỏ được mà không đau. Vd: "đổi giao diện sáng/tối". |
| **Won't have (this time)** | *Lần này chưa* | Đã thống nhất *không làm trong phạm vi/đợt này* (có thể làm sau). Vd: "tích hợp đăng nhập bằng vân tay" — để bản sau. |

**Ví dụ — MVP (sản phẩm khả dụng tối thiểu) cho app đặt món, đợt release đầu:**
- **Must:** xem danh sách nhà hàng, xem menu, đặt đơn, thanh toán, theo dõi trạng thái đơn.
- **Should:** lưu địa chỉ thường dùng, lọc theo loại món, đánh giá nhà hàng.
- **Could:** chế độ tối, danh sách yêu thích, mã giảm giá.
- **Won't (lần này):** đặt bàn tại chỗ, chương trình tích điểm, đăng nhập sinh trắc học.

> ❓ **Câu hỏi tự nhiên của người đọc.**
> - *"Vì sao 'Won't' lại được viết ra — sao không bỏ lơ?"* Vì viết ra "lần này không làm X" giúp *quản lý kỳ vọng* và tránh tranh cãi giữa chừng ("sao chưa thấy tính năng Y?"). Nó là một quyết định *minh bạch*, không phải lãng quên.
> - *"Tất cả đều quan trọng, sao chọn được Must?"* Mẹo: hỏi "nếu bỏ cái này, sản phẩm còn release được & dùng được không?". Nếu *không* → Must. Nếu *vẫn được, chỉ kém tiện* → Should/Could. Nguyên tắc: số "Must" nên đủ nhỏ để chắc chắn làm xong trong đợt.

⚠ **Lỗi thường gặp.** Gán *mọi thứ* là "Must" vì "cái gì cũng quan trọng". Khi mọi thứ là Must thì ưu tiên trở nên vô nghĩa và nhóm sẽ chạy theo deadline mà bỏ chất lượng. MoSCoW chỉ hữu ích khi *dám* xếp một số thứ xuống Should/Could/Won't.

> 🔁 **Dừng lại tự kiểm tra.** Cho app ghi chú đơn giản, đợt 1. Xếp 4 yêu cầu sau vào MoSCoW: (a) tạo/sửa/xóa note; (b) đồng bộ đám mây; (c) đổi font chữ; (d) chia sẻ note cho người khác.
> <details><summary>Đáp án</summary>(a) <b>Must</b> — không có thì app vô nghĩa. (b) <b>Should</b> — rất hữu ích nhưng đợt 1 có thể lưu cục bộ trước. (c) <b>Could</b> — bỏ được, chỉ là tiện nghi. (d) <b>Won't (lần này)</b> — tính năng phức tạp (phân quyền, mời người dùng), để đợt sau. Lưu ý: cách xếp có thể khác tùy mục tiêu sản phẩm — quan trọng là *lý do* xếp.</details>

📝 **Tóm tắt mục 6.** MoSCoW = 4 nhóm ưu tiên **Must / Should / Could / Won't (this time)**. Giúp nhóm thống nhất làm gì trước khi nguồn lực có hạn. Bí quyết: số Must phải nhỏ; "Won't" cần viết ra để quản lý kỳ vọng; đừng gán mọi thứ là Must.

---

## 7. Bài tập

1. Phân loại các yêu cầu sau thành **chức năng (F)** hay **phi chức năng (NF)**, và với NF nêu thuộc tính chất lượng (hiệu năng / bảo mật / khả dụng / khả mở rộng):
   (a) "Người dùng có thể tải lên ảnh đại diện."
   (b) "Ảnh tải lên được nén để mỗi ảnh ≤ 200KB."
   (c) "Hệ thống chịu được 50.000 lượt truy cập/ngày."
   (d) "Mọi yêu cầu mạng phải qua HTTPS."
   (e) "Admin có thể khóa tài khoản người dùng."

2. Câu yêu cầu sau **mơ hồ**: *"Trang chủ phải tải nhanh và hiển thị nhiều thông tin."* Viết lại thành (các) yêu cầu **đo được**, chỉ ra mâu thuẫn tiềm ẩn nếu có.

3. Viết **2 user story** (đúng mẫu "Là... tôi muốn... để...") cho một app **đặt vé xem phim**, mỗi story cho một vai trò khác nhau.

4. Cho user story: *"Là khách hàng, tôi muốn hủy đơn hàng chưa giao, để lấy lại tiền khi đổi ý."* Viết **acceptance criteria** theo mẫu Given/When/Then, gồm ít nhất 1 đường đi chính và 1 ca biên/lỗi.

5. Câu yêu cầu sau vi phạm những đặc điểm nào của "yêu cầu tốt" và sửa lại: *"Hệ thống phải an toàn, dễ dùng, và xử lý nhanh tất cả mọi thứ."*

6. Bạn xây MVP cho một app **học từ vựng tiếng Anh** (đợt 1). Liệt kê ít nhất 6 yêu cầu và xếp chúng vào **MoSCoW**, giải thích ngắn gọn lý do mỗi nhóm.

## Lời giải chi tiết

**Bài 1.** (a) **F** — một việc hệ thống làm. (b) **NF** (hiệu năng / ràng buộc dung lượng) — quy định mức độ, gắn lên chức năng tải ảnh. (c) **NF** (khả mở rộng / chịu tải). (d) **NF** (bảo mật). (e) **F** — hành vi của hệ thống cho vai trò admin. Nhận xét: F mô tả *việc làm*, NF mô tả *làm tốt đến mức nào* hoặc *ràng buộc*.

**Bài 2.** Câu gốc trộn hai yêu cầu và đều mơ hồ. Tách + làm rõ:
- **NF hiệu năng:** "Trang chủ tải xong (Largest Contentful Paint) trong **≤ 2 giây** ở kết nối 4G, đo phía client."
- **F nội dung:** "Trang chủ hiển thị: thanh tìm kiếm, 8 danh mục nổi bật, 12 sản phẩm gợi ý."
- **Mâu thuẫn tiềm ẩn:** "tải nhanh" vs "hiển thị nhiều thông tin" có thể chọi nhau (nhiều ảnh → tải chậm). Cách hòa giải: lazy-load ảnh ngoài màn hình đầu, nén ảnh, phân trang/cuộn vô hạn — để vừa đủ nội dung ban đầu vừa giữ tốc độ. Đây chính là minh họa đặc điểm **không mâu thuẫn** (mục 5).

**Bài 3.** Ví dụ (vai trò khác nhau):
- "**Là** khán giả, **tôi muốn** chọn ghế trên sơ đồ phòng chiếu, **để** ngồi đúng chỗ mình thích và biết trước tầm nhìn."
- "**Là** quản lý rạp, **tôi muốn** xem báo cáo số vé bán theo suất chiếu, **để** điều chỉnh lịch chiếu cho phim đang hút khách."
(Một story khác hợp lệ: "Là khán giả, tôi muốn thanh toán bằng ví điện tử, để đặt vé nhanh không cần nhập thẻ.")

**Bài 4.** Acceptance criteria cho "hủy đơn chưa giao":
- **Given** đơn hàng đang ở trạng thái "Chưa giao" và thuộc về người dùng đang đăng nhập
  **When** người dùng bấm "Hủy đơn" và xác nhận
  **Then** đơn chuyển sang trạng thái "Đã hủy", hệ thống khởi tạo hoàn tiền về phương thức thanh toán gốc và gửi email xác nhận hủy.
- *(Ca biên — đơn đã giao)* **Given** đơn đã ở trạng thái "Đang giao" hoặc "Đã giao"
  **When** người dùng thử hủy
  **Then** nút "Hủy đơn" bị vô hiệu hóa và hiển thị "Không thể hủy đơn đã giao; vui lòng liên hệ hỗ trợ."
- *(Ca lỗi — hoàn tiền thất bại)* **Given** việc hủy hợp lệ **When** cổng thanh toán trả lỗi hoàn tiền **Then** đơn vẫn chuyển "Đã hủy" nhưng tạo một yêu cầu hoàn tiền thủ công cho bộ phận hỗ trợ và thông báo người dùng "Hoàn tiền đang được xử lý".

**Bài 5.** Vi phạm:
- **Rõ ràng / đo được:** "an toàn", "dễ dùng", "nhanh" đều là tính từ co giãn không định lượng.
- **Khả thi:** "tất cả mọi thứ" là phạm vi vô hạn, bất khả thi.
- **(Gián tiếp) không mâu thuẫn:** gom quá nhiều mục tiêu vào một câu dễ che giấu xung đột (an toàn cao thường thêm bước → giảm "nhanh"/"dễ dùng").
Sửa thành nhiều yêu cầu tách bạch, đo được, ví dụ:
- "Mật khẩu băm bcrypt; phiên hết hạn sau 30 phút (bảo mật)."
- "Người dùng mới hoàn tất thao tác chính trong ≤ 3 phút không cần hướng dẫn (khả dụng)."
- "95% thao tác phổ biến phản hồi < 1 giây (hiệu năng)."

**Bài 6.** Ví dụ MVP app học từ vựng (đợt 1):
- **Must:** (1) tạo/xem danh sách từ vựng; (2) học flashcard (lật thẻ xem nghĩa); (3) đánh dấu từ đã thuộc / chưa thuộc. → Không có 3 cái này thì app không có lý do tồn tại.
- **Should:** (4) phát âm từ (audio); (5) ôn tập theo lịch lặp lại ngắt quãng (spaced repetition). → Rất tăng giá trị học, nhưng đợt 1 có thể ôn thủ công trước.
- **Could:** (6) chủ đề giao diện sáng/tối; (7) thống kê tiến độ theo tuần. → Tốt nếu còn thời gian.
- **Won't (lần này):** (8) thi đấu với bạn bè; (9) đồng bộ nhiều thiết bị. → Phức tạp (mạng, tài khoản), để đợt sau. Lý do xếp: Must là lõi không thể thiếu; Should tăng hiệu quả học nhưng có cách tạm; Could là tiện nghi; Won't được ghi rõ để quản lý kỳ vọng.

---

## 8. Code & Minh họa

- [visualization.html](./visualization.html) — 3 mô-đun tương tác: (1) **User story builder** — chọn vai trò / mong muốn / mục đích từ dropdown rồi ghép thành câu story chuẩn; (2) **Phân loại F vs NF** — bấm phân loại từng yêu cầu là chức năng hay phi chức năng, chấm đúng/sai; (3) **Làm rõ yêu cầu mơ hồ** — cho một câu mơ hồ, chọn phiên bản đo được tốt nhất trong các lựa chọn.

## 9. Bài tiếp theo

- [Lesson 04 — Git workflow cho nhóm](../lesson-04-git-workflow-team/) — khi đã có yêu cầu rõ ràng và chia thành story, nhóm cần một quy trình cộng tác trên code; bài sau giới thiệu Git workflow để nhiều người cùng làm mà không giẫm chân nhau.
- Liên quan: acceptance criteria (Given/When/Then) sẽ gặp lại khi viết **test tự động** ở Tier kiểm thử — xem [trang chính lĩnh vực](../../index.html).
