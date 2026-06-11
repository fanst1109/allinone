// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: SoftwareEngineering/01-Foundations/lesson-02-agile-scrum-kanban/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 02 — Agile, Scrum & Kanban

## Mục tiêu

- Hiểu **Agile** là một *tư duy* (mindset) chứ không phải một quy trình cứng — và vì sao nó ra đời để chữa điểm đau của Waterfall.
- Nắm vững **Tuyên ngôn Agile** (Agile Manifesto): 4 giá trị cốt lõi và ý nghĩa thực tế của chúng.
- Hiểu **Scrum** như một *framework*: ba vai trò, ba artefact, năm sự kiện — và một Sprint thực sự diễn ra thế nào.
- Hiểu **Kanban**: luồng liên tục, bảng cột, và vì sao **giới hạn WIP** (Work In Progress) giúp xong việc nhanh hơn.
- Biết **khi nào dùng Scrum, khi nào dùng Kanban** — và đo tiến độ bằng **velocity** & **burndown chart**.

## Kiến thức tiền đề

- [Lesson 01 — Vòng đời phần mềm (SDLC) & vai trò kỹ sư](../lesson-01-sdlc-vai-tro-ky-su/) — đặc biệt **mục 4 (mô hình lặp & tăng dần)** và **mục 6 (vai trò trong nhóm)**. Bài này cụ thể hóa "mô hình lặp" thành cách làm việc nhóm hằng ngày.
- Không cần kinh nghiệm quản lý dự án trước.

> 💡 **Nối tiếp Lesson 01.** Ở Lesson 01 ta thấy *mô hình lặp* (iterative) giảm rủi ro "làm sai thứ" bằng cách giao bản chạy được sau mỗi vòng ngắn — nhưng đó mới là *nguyên lý*. Agile/Scrum/Kanban trả lời câu hỏi thực hành: "vòng lặp dài bao lâu? ai họp với ai? thẻ việc đi đâu? đo tiến độ bằng gì?". Đây là phần "làm thật" của ý tưởng lặp.

---

## 1. Tuyên ngôn Agile — tư duy, không phải thủ tục

💡 **Trực giác.** Hình dung hai cách dẫn đường tới một thành phố lạ: (a) in sẵn lộ trình cứng từ nhà, gặp đường tắc cũng đi theo bản in; (b) dùng GPS cập nhật liên tục, gặp tắc thì đổi đường ngay. Waterfall là (a) — lập kế hoạch một lần rồi bám cứng. Agile là (b) — vẫn có đích, nhưng *liên tục điều chỉnh đường đi* theo thông tin mới (phản hồi khách, thực tế kỹ thuật).

Năm 2001, 17 người làm phần mềm họp và viết ra **Agile Manifesto** — bốn cặp giá trị. Mỗi cặp nói "ta **coi trọng cả hai vế**, nhưng khi phải chọn, **vế trái quan trọng hơn**":

| Coi trọng hơn | … hơn là | Nghĩa thực tế |
|---------------|----------|----------------|
| **Cá nhân & tương tác** | quy trình & công cụ | Một cuộc nói chuyện 5 phút thường giải quyết tốt hơn một email + biểu mẫu |
| **Phần mềm chạy được** | tài liệu chi tiết toàn diện | Bản demo dùng được nói lên nhiều hơn 50 trang đặc tả chưa kiểm chứng |
| **Cộng tác với khách hàng** | đàm phán hợp đồng | Cùng khách điều chỉnh sản phẩm > cãi nhau "điều khoản này không có trong hợp đồng" |
| **Phản hồi với thay đổi** | bám theo kế hoạch | Yêu cầu đổi giữa chừng là chuyện thường — đón nhận, đừng coi là "phá kế hoạch" |

**Ví dụ cụ thể.** Đội làm app giao đồ ăn. Tuần 3, một quán đối tác báo họ cần hiển thị "món hết hàng theo thời gian thực". Tư duy Waterfall: "không có trong đặc tả ký đầu dự án, làm sau". Tư duy Agile: "đây là phản hồi giá trị từ thực tế → đưa vào backlog, ưu tiên cho sprint tới, vì nó ảnh hưởng trực tiếp tới trải nghiệm người dùng". Kết quả: sản phẩm bám sát nhu cầu thật thay vì bám sát một bản kế hoạch đã lỗi thời.

Ngoài 4 giá trị còn có **12 nguyên tắc**, nhưng tinh thần gói trong một câu: **giao giá trị sớm và liên tục, đón nhận thay đổi, giữ nhịp bền vững, để nhóm tự tổ chức.**

> ❓ **"Agile = không cần tài liệu, không cần kế hoạch?"** Không — đây là hiểu lầm phổ biến nhất. Manifesto nói coi trọng vế trái **hơn** vế phải, *không phải bỏ vế phải*. Agile vẫn có kế hoạch (chỉ là kế hoạch ngắn hạn, cập nhật thường xuyên), vẫn có tài liệu (chỉ là vừa đủ, không thừa). "Không tài liệu, không kế hoạch" là **cao bồi**, không phải Agile.

> ⚠ **Lỗi thường gặp.** Coi Agile là "một quy trình có các bước cố định phải làm theo". Agile là *tư duy*; Scrum và Kanban mới là các *framework cụ thể* hiện thực tư duy đó. Nói "chúng tôi làm Agile" mà thực ra chỉ là họp đứng mỗi sáng còn lại y hệt Waterfall — đó là "Agile giả" (cargo-cult Agile).

> 🔁 **Dừng lại tự kiểm tra.** Một đội tự hào "chúng tôi rất Agile" nhưng từ chối mọi thay đổi yêu cầu sau khi sprint đã chốt phạm vi đầu dự án 6 tháng, viện cớ "kế hoạch là kế hoạch". Họ vi phạm giá trị nào?
> <details><summary>Đáp án</summary>Giá trị thứ 4 — <b>"Phản hồi với thay đổi hơn là bám theo kế hoạch"</b>. Khóa cứng phạm vi 6 tháng và từ chối thay đổi chính là tư duy Waterfall. Agile chia thành các vòng ngắn (sprint) chính để có thể đổi hướng mỗi vòng với chi phí thấp.</details>

📝 **Tóm tắt mục 1.** Agile là **tư duy**: coi trọng con người, phần mềm chạy được, cộng tác với khách và phản hồi với thay đổi hơn là quy trình cứng, tài liệu thừa, hợp đồng và kế hoạch bất biến. Nó *cụ thể hóa* mô hình lặp của Lesson 01. Scrum/Kanban là các framework hiện thực tư duy này.

---

## 2. Scrum — framework cho vòng lặp có nhịp

💡 **Trực giác.** Scrum giống một đội thể thao chạy theo *hiệp* (sprint): mỗi hiệp có thời lượng cố định, đầu hiệp họp bàn chiến thuật, mỗi ngày điểm danh nhanh xem ai kẹt chỗ nào, cuối hiệp tổng kết kết quả rồi rút kinh nghiệm cho hiệp sau. Nhịp đều đặn này tạo *kỷ luật* mà vẫn linh hoạt giữa các hiệp.

**Sprint là gì?** Là một khoảng thời gian **cố định** (thường **2 tuần**, có thể 1–4 tuần) trong đó nhóm cam kết hoàn thành một số hạng mục và cho ra một **Increment** (bản tăng dần) chạy được. Cố định độ dài là điểm mấu chốt: nhịp đều giúp dự đoán được tiến độ.

**Ví dụ một Sprint 2 tuần cụ thể (app đặt phòng khách sạn):**
- **Thứ Hai tuần 1 — Sprint Planning (2 giờ):** nhóm chọn từ Product Backlog ra 5 hạng mục cho sprint: "tìm phòng theo ngày", "xem chi tiết phòng", "thêm vào giỏ", "đăng nhập Google", "trang lịch sử đặt phòng". Tổng ước lượng 21 điểm.
- **Mỗi sáng (9h00) — Daily Standup (15 phút):** mỗi người trả lời 3 câu: hôm qua làm gì, hôm nay làm gì, có gì cản trở. Ai kẹt thì Scrum Master gỡ.
- **Hết tuần 2, thứ Năm — Sprint Review (1 giờ):** demo 4 hạng mục đã xong cho Product Owner & bên liên quan, lấy phản hồi.
- **Thứ Sáu — Retrospective (1 giờ):** nhóm tự hỏi "lần này cái gì tốt, cái gì dở, lần sau cải thiện gì?" (vd: "ước lượng quá lạc quan, sprint tới lấy ít hạng mục hơn").

### 2.1 Ba vai trò (Roles)

| Vai trò | Lo việc gì | Một câu chốt |
|---------|------------|--------------|
| **Product Owner (PO)** | Quyết định *làm gì* & *ưu tiên gì* — sở hữu & sắp xếp Product Backlog theo giá trị kinh doanh | "Cái gì đáng làm trước?" |
| **Scrum Master (SM)** | *Phục vụ* nhóm: gỡ cản trở, bảo vệ nhóm khỏi nhiễu, đảm bảo Scrum được tuân thủ. **Không phải sếp** | "Làm sao để nhóm chạy trơn?" |
| **Development Team** | *Tự tổ chức* để biến hạng mục thành Increment chạy được. Đa năng (dev, test, design trong một nhóm) | "Làm như thế nào?" |

(Nối tiếp [Lesson 01 — mục 6 vai trò](../lesson-01-sdlc-vai-tro-ky-su/): PO ≈ Product Manager, Dev Team gồm Software Engineer + QA.)

### 2.2 Ba artefact (sản phẩm tạo tác)

- **Product Backlog:** danh sách *mọi* thứ muốn làm cho sản phẩm, sắp theo ưu tiên (PO sở hữu). Sống động — thêm/bớt/đổi thứ tự liên tục. Ví dụ: 47 hạng mục, từ "đăng nhập" tới "gợi ý phòng bằng AI".
- **Sprint Backlog:** *tập con* của Product Backlog mà nhóm cam kết làm trong sprint hiện tại + kế hoạch để hoàn thành. Ví dụ: 5 hạng mục, 21 điểm ở trên.
- **Increment:** kết quả chạy được, **đạt "Definition of Done"** (đã code + test + tích hợp) sau mỗi sprint. Có thể release hoặc không, nhưng phải *thực sự dùng được*.

### 2.3 Năm sự kiện (Events / Ceremonies)

| Sự kiện | Khi nào | Mục đích | Thời lượng (sprint 2 tuần) |
|---------|---------|----------|----------------------------|
| **Sprint** | Khung bao quanh | Container chứa mọi sự kiện khác | 2 tuần |
| **Sprint Planning** | Đầu sprint | Chọn hạng mục & lập kế hoạch | ~2–4 giờ |
| **Daily Standup** | Mỗi ngày | Đồng bộ nhanh, lộ cản trở | 15 phút |
| **Sprint Review** | Cuối sprint | Demo Increment, lấy phản hồi | ~1–2 giờ |
| **Retrospective** | Sau Review | Cải tiến *cách làm việc* của nhóm | ~1 giờ |

> ❓ **"Scrum Master có phải là sếp/quản lý nhóm không?"** Không. SM là **người phục vụ** (servant leader): không giao việc, không đánh giá nhân sự, không quyết phạm vi. Việc của SM là *gỡ vật cản* (vd: "DB staging hỏng, tôi liên hệ DevOps fix ngay") và *bảo vệ nhóm* khỏi bị chen việc ngoài sprint. PO quyết *làm gì*, Dev Team quyết *làm thế nào*, SM lo *để cả hai chạy trơn*.

> ⚠ **Lỗi thường gặp.** (1) Biến **Daily Standup** thành buổi báo cáo cho sếp dài 45 phút — sai, nó là 15 phút để *nhóm tự đồng bộ*, ai cần bàn sâu thì tách ra sau. (2) Bỏ **Retrospective** vì "bận quá" — đây là sự kiện *cải tiến chính*; bỏ nó thì nhóm lặp lại cùng lỗi mãi. (3) Đổi phạm vi sprint giữa chừng — phạm vi *trong* một sprint nên ổn định; thay đổi đợi sprint sau.

> 🔁 **Dừng lại tự kiểm tra.** Sắp các từ sau vào đúng nhóm (Role / Artefact / Event): Product Owner, Sprint Backlog, Daily Standup, Increment, Retrospective, Scrum Master.
> <details><summary>Đáp án</summary><b>Role</b>: Product Owner, Scrum Master. <b>Artefact</b>: Sprint Backlog, Increment. <b>Event</b>: Daily Standup, Retrospective. (Mẹo nhớ: Role = người; Artefact = thứ tạo ra/danh sách; Event = buổi họp/khung thời gian.)</details>

📝 **Tóm tắt mục 2.** Scrum = framework lặp **có nhịp cố định** (Sprint, thường 2 tuần). **3 vai trò** (PO quyết làm gì, SM phục vụ/gỡ cản, Dev Team tự tổ chức), **3 artefact** (Product Backlog → Sprint Backlog → Increment), **5 sự kiện** (Sprint, Planning, Daily, Review, Retro). Cuối mỗi sprint phải có Increment chạy được.

---

## 3. Kanban — luồng liên tục & giới hạn WIP

💡 **Trực giác.** Kanban giống một quầy pha chế: thay vì chia ngày thành "ca cố định" như Scrum, đồ uống chảy *liên tục* qua các trạm — gọi món → pha → giao. Quy tắc sống còn của quán: **mỗi nhân viên chỉ làm tối đa N ly cùng lúc**. Ôm 10 ly dở dang thì ly nào cũng chậm, khách nào cũng cáu. Làm xong từng ly rồi mới nhận ly mới thì khách *cầm được đồ uống sớm hơn*. Đó chính là tinh thần **giới hạn WIP**.

Kanban (tiếng Nhật: "bảng hiệu") tập trung vào **luồng liên tục**, không chia sprint. Công cụ trung tâm là **bảng Kanban** với các cột thể hiện trạng thái công việc:

\`\`\`
┌──────────┬───────────────┬──────────┐
│  To Do   │  In Progress  │   Done   │
│          │   (WIP ≤ 3)   │          │
├──────────┼───────────────┼──────────┤
│ [Thẻ E]  │ [Thẻ B]       │ [Thẻ A]  │
│ [Thẻ F]  │ [Thẻ C]       │          │
│ [Thẻ G]  │ [Thẻ D]       │          │
└──────────┴───────────────┴──────────┘
\`\`\`

Mỗi **thẻ** (card) là một hạng mục công việc; nó *kéo* từ trái sang phải khi tiến triển. Giới hạn **WIP** ghi trên đầu cột: "In Progress ≤ 3" nghĩa là không được có quá 3 thẻ đang làm dở cùng lúc.

### 3.1 Vì sao giới hạn WIP giúp xong việc *nhanh hơn* — ví dụ số

Giả sử mỗi việc cần **4 ngày-công** để hoàn thành, một người làm.

**Cách A — ôm 5 việc song song** (không giới hạn WIP): để "trông có vẻ bận", người này nhảy qua lại giữa 5 việc, mỗi việc làm một chút. Do liên tục *chuyển ngữ cảnh* (context switching — phải nhớ lại đang làm gì) và việc chỉ "xong" khi làm đủ 4 ngày-công, cả 5 việc cùng *gần xong* nhưng **chưa việc nào xong** cho tới tận cuối:

| Mốc | Cách A (WIP=5) | Cách B (WIP=1, làm xong từng việc) |
|------|----------------|-------------------------------------|
| Ngày 4 | 0 việc xong (cả 5 đang dở ~20%) | **Việc 1 XONG** → giao được ngay |
| Ngày 8 | 0 việc xong | **Việc 2 XONG** |
| Ngày 12 | 0 việc xong | **Việc 3 XONG** |
| Ngày ~20+ | 5 việc xong *cùng lúc* (còn cộng phí context switch) | Việc 5 XONG |

**Kết luận bằng số:** với cách B, việc đầu tiên *tạo ra giá trị* ở **ngày 4**; với cách A phải chờ tới gần cuối mới có *bất cứ thứ gì* hoàn chỉnh. Thời gian trung bình một việc nằm trên bảng (gọi là **lead time**) ở cách B ngắn hơn hẳn. Giới hạn WIP buộc nhóm **làm xong rồi mới nhận thêm** → giá trị tới tay người dùng sớm và đều hơn.

> ❓ **"Giới hạn WIP nghe như làm chậm lại — ép người ta không được nhận nhiều việc?"** Đúng là *cảm giác* chậm vì ai cũng tưởng "làm nhiều thứ cùng lúc = năng suất". Nhưng năng suất thật đo bằng **việc HOÀN THÀNH**, không phải việc *đang làm dở*. WIP thấp → ít context switching, ít việc nửa vời, *throughput* (số việc xong mỗi tuần) thực ra **cao hơn**. Một bonus: khi cột "In Progress" đã đầy giới hạn, cả nhóm tự động xúm vào gỡ thẻ đang kẹt thay vì mỗi người ôm việc riêng — lộ ra nút thắt cổ chai (bottleneck).

> ⚠ **Lỗi thường gặp.** (1) Đặt giới hạn WIP quá cao (vd =10 cho nhóm 3 người) → vô nghĩa, vì chẳng bao giờ chạm trần. (2) Coi Kanban là "bảng To-Do đẹp" mà *bỏ giới hạn WIP* — mất hẳn lợi ích chính. (3) Lén "giấu" việc dở để né giới hạn → tự lừa mình.

> 🔁 **Dừng lại tự kiểm tra.** Nhóm 3 người, cột In Progress đang có đúng 3 thẻ (WIP=3, đã chạm trần). Một thẻ kẹt vì chờ API bên ngoài. Theo tinh thần Kanban, nên làm gì: (a) nhận thêm thẻ mới từ To Do để khỏi "rảnh", hay (b) cả nhóm xúm gỡ thẻ đang kẹt?
> <details><summary>Đáp án</summary>(b). Giới hạn WIP đã chạm trần nên <b>không kéo thêm thẻ mới</b> — đó chính là mục đích của WIP. Việc đúng là cùng nhau gỡ thẻ kẹt (vd: tạm mock API, hoặc đổi người gọi điện cho đối tác). Kanban biến "thẻ kẹt" thành vấn đề của <i>cả nhóm</i>, không phải của riêng người ôm thẻ.</details>

📝 **Tóm tắt mục 3.** Kanban = **luồng liên tục** (không sprint), trực quan hóa công việc bằng **bảng cột** (To Do / In Progress / Done), và **giới hạn WIP** mỗi cột. Giới hạn WIP buộc *làm xong rồi mới nhận mới* → giảm context switching, giá trị tới tay người dùng sớm và đều hơn, lộ ra bottleneck.

---

## 4. Scrum vs Kanban — chọn cái nào?

💡 **Trực giác.** Scrum là chạy *cự ly có vạch* — mỗi 2 tuần một vạch đích, dồn sức về vạch rồi nghỉ lấy đà. Kanban là chạy *đường dài liên tục* — không vạch giữa chừng, chỉ giữ nhịp đều và không ôm quá nhiều cùng lúc. Cả hai đều là cách hiện thực tư duy Agile (mục 1).

| Tiêu chí | **Scrum** | **Kanban** |
|----------|-----------|------------|
| Nhịp | Sprint cố định (thường 2 tuần) | Luồng liên tục, không sprint |
| Vai trò bắt buộc | PO, Scrum Master, Dev Team | Không bắt buộc vai trò mới |
| Cam kết | Theo *sprint* (chốt phạm vi đầu sprint) | Theo *từng thẻ*, kéo khi sẵn sàng |
| Đổi ưu tiên | Đợi sprint sau (trong sprint nên ổn định) | Bất cứ lúc nào (kéo thẻ mới vào To Do) |
| Giới hạn công việc | Qua dung lượng (capacity) của sprint | Qua **giới hạn WIP** mỗi cột |
| Sự kiện cố định | 5 ceremony (Planning, Daily, Review, Retro…) | Không bắt buộc; review theo nhịp tự chọn |
| Đo tiến độ | Velocity, burndown chart | Lead time, throughput, cumulative flow |

**Khi nào dùng cái nào (heuristic thực tế):**
- **Dùng Scrum** khi: làm sản phẩm có thể chia thành lát cắt rõ ràng, ưu tiên *tương đối ổn định* trong 2 tuần, nhóm muốn nhịp đều và mốc dự đoán được. Ví dụ: phát triển tính năng mới cho một sản phẩm SaaS.
- **Dùng Kanban** khi: công việc *tới liên tục & khó đoán*, ưu tiên đổi *thường xuyên*, cần phản hồi nhanh từng việc. Ví dụ: đội **support/bug-fix**, đội vận hành (ops), hoặc nhóm xử lý ticket nội bộ — không hợp với việc "chốt cứng 2 tuần".

> ❓ **"Có thể kết hợp cả hai không?"** Có — gọi là **Scrumban**. Giữ nhịp & một số ceremony của Scrum (vd Retro, Planning nhẹ) nhưng dùng bảng + giới hạn WIP của Kanban để quản luồng. Nhiều đội thật chạy biến thể lai như vậy. Quan trọng là *hiểu mục đích từng thực hành* rồi chọn cho phù hợp, đừng theo giáo điều.

> ⚠ **Lỗi thường gặp.** Chọn framework theo "mốt" thay vì theo bản chất công việc. Đội support bị ép chạy Scrum sprint 2 tuần sẽ khổ vì bug khẩn không đợi hết sprint; đội làm sản phẩm dùng Kanban thuần không sprint có thể thiếu nhịp demo/đồng bộ đều đặn. Chọn theo *tính chất luồng việc*, không theo tên gọi.

> 🔁 **Dừng lại tự kiểm tra.** Một đội nhận yêu cầu sửa lỗi từ khách *bất cứ lúc nào trong ngày*, mỗi việc kích thước khác nhau, ưu tiên đổi liên tục theo mức độ khẩn. Scrum hay Kanban hợp hơn?
> <details><summary>Đáp án</summary><b>Kanban</b>. Việc tới liên tục & không đoán trước, ưu tiên đổi thường xuyên — đúng điểm mạnh của luồng liên tục + giới hạn WIP. Ép vào sprint 2 tuần sẽ vướng vì không thể "đợi sprint sau" với một bug khẩn.</details>

📝 **Tóm tắt mục 4.** Scrum = nhịp sprint cố định + vai trò + ceremony, hợp với phát triển sản phẩm có ưu tiên tương đối ổn định. Kanban = luồng liên tục + giới hạn WIP, hợp với việc tới liên tục/đổi ưu tiên thường xuyên (support, ops). **Scrumban** = lai cả hai. Chọn theo *bản chất luồng việc*, không theo mốt.

---

## 5. Velocity & Burndown — đo tiến độ sprint bằng số

💡 **Trực giác.** Velocity giống "tốc độ trung bình" của một người chạy bộ: biết bạn chạy ~10km mỗi buổi thì dự được tuần này chạy được bao nhiêu. Burndown chart giống đồng hồ đếm ngược lượng việc còn lại trong sprint — nhìn đường dốc xuống là biết "kịp về đích" hay "đang trễ".

**Story point là gì?** Là đơn vị *tương đối* ước lượng độ lớn (công sức + độ phức tạp + rủi ro) của một hạng mục — **không phải giờ**. Thường dùng dãy Fibonacci (1, 2, 3, 5, 8, 13…) vì việc càng lớn càng khó ước lượng chính xác. Ví dụ: "đăng nhập email" = 3 điểm, "tích hợp thanh toán" = 8 điểm.

**Velocity** = tổng số story point nhóm *hoàn thành* (đạt Definition of Done) trong một sprint. Đo qua vài sprint để có trung bình:

| Sprint | Điểm hoàn thành |
|:------:|:---------------:|
| 1 | 18 |
| 2 | 22 |
| 3 | 20 |

→ Velocity trung bình ≈ **(18+22+20)/3 = 20 điểm/sprint**. Dùng để *dự báo*: nếu còn 100 điểm trong backlog → cần khoảng **100 / 20 = 5 sprint** ≈ 10 tuần. Đây là cách Agile trả lời "khi nào xong?" mà không cần "khóa cứng kế hoạch".

**Burndown chart** = đồ thị *điểm còn lại* theo từng ngày trong sprint. Trục Y = điểm còn lại, trục X = ngày. Đường lý tưởng dốc thẳng từ tổng điểm về 0 ở ngày cuối. Đường thực tế cho biết nhóm đang nhanh hay chậm so với lý tưởng:

\`\`\`
Điểm
 còn  21 ●╲                        (đường lý tưởng: ╲ thẳng về 0)
 lại     ╲ ●●                       (đường thực tế: ●)
      ~10  ╲   ●●●                  → nằm TRÊN đường lý tưởng = đang TRỄ
           ╲      ●●
        0   ╲________●____________
            D1  D3  D5  D7  D9  D10 (ngày)
\`\`\`

- Đường thực tế **nằm trên** đường lý tưởng → còn nhiều việc hơn dự kiến → *đang trễ*, cần điều chỉnh (cắt phạm vi, gỡ cản trở).
- **Nằm dưới** → đang nhanh hơn, có thể kéo thêm việc.
- **Đi ngang** vài ngày → việc bị kẹt, không thẻ nào "xong".

> ❓ **"Velocity của đội A là 40, đội B là 20 — đội A giỏi gấp đôi?"** **Không.** Story point là *tương đối trong từng đội* — đội A có thể chỉ định nghĩa "1 điểm" nhỏ hơn đội B. So sánh velocity *giữa các đội* là vô nghĩa và còn nguy hiểm (đẩy đội thổi phồng điểm). Velocity chỉ dùng để **một đội dự báo chính nó** qua thời gian.

> ⚠ **Lỗi thường gặp.** (1) Dùng velocity làm *chỉ tiêu thi đua* ("sprint sau phải tăng 25%!") → nhóm thổi phồng story point, số liệu mất ý nghĩa. (2) Đếm cả việc *làm dở* vào velocity — chỉ tính việc *đạt Done*. (3) Tưởng story point = giờ và quy đổi cứng "1 điểm = 4 giờ" — mất hẳn tính tương đối.

> 🔁 **Dừng lại tự kiểm tra.** Sprint 2 tuần (10 ngày làm việc), nhận 20 điểm. Đến hết ngày 5 mới hoàn thành 4 điểm (còn 16). Burndown đang nói gì? Nên làm gì?
> <details><summary>Đáp án</summary>Lý tưởng hết ngày 5 (nửa sprint) nên còn ~10 điểm, nhưng thực tế còn <b>16</b> → đường thực tế nằm <b>trên</b> đường lý tưởng → <b>đang trễ rõ rệt</b>. Hành động: nêu ngay ở Daily Standup, tìm vật cản đang làm chậm, và bàn với PO <b>cắt bớt phạm vi sprint</b> (bỏ hạng mục ưu tiên thấp) thay vì "cố nhồi" rồi giao đồ kém chất lượng.</details>

📝 **Tóm tắt mục 5.** **Story point** = ước lượng *tương đối* độ lớn (không phải giờ). **Velocity** = điểm *hoàn thành* mỗi sprint, dùng để một đội *dự báo chính nó* (không so sánh giữa đội). **Burndown** = điểm còn lại theo ngày: trên đường lý tưởng = trễ, dưới = nhanh, ngang = kẹt.

---

## 6. Bài tập

1. Với mỗi giá trị trong Agile Manifesto, cho **một tình huống thực tế** thể hiện việc "coi trọng vế trái hơn vế phải".
2. Phân loại các thuật ngữ sau vào đúng nhóm **Role / Artefact / Event**: Sprint Review, Product Backlog, Development Team, Increment, Scrum Master, Sprint Planning.
3. Nhóm 4 người, mỗi việc cần ~3 ngày-công. So sánh số việc *hoàn thành* sau 9 ngày giữa: (a) mỗi người ôm 4 việc song song (WIP cao), (b) làm xong từng việc rồi mới nhận mới (WIP=1/người). Giải thích vì sao chênh lệch.
4. Một đội vận hành (ops) nhận sự cố & ticket nội bộ *bất kỳ lúc nào*, ưu tiên đổi liên tục. Nên dùng Scrum hay Kanban? Nêu **2 lý do** dựa trên bản chất công việc.
5. Một đội có velocity 3 sprint gần nhất là 25, 30, 20 (điểm/sprint, sprint 2 tuần). Product Backlog còn 165 điểm. Ước lượng cần bao nhiêu sprint và bao nhiêu tuần để xong? Nêu một giả định khiến ước lượng này có thể sai.
6. Giải thích vì sao **không nên** so sánh velocity giữa hai đội khác nhau để đánh giá đội nào "làm việc tốt hơn".

## Lời giải chi tiết

**Bài 1.** (Mỗi tình huống chỉ là một ví dụ hợp lý.)
- *Cá nhân & tương tác > quy trình & công cụ:* thay vì bắt mọi câu hỏi phải mở ticket qua công cụ, dev gặp trực tiếp PO 5 phút làm rõ yêu cầu mơ hồ — nhanh và đúng hơn.
- *Phần mềm chạy được > tài liệu toàn diện:* cuối sprint demo một bản đăng nhập *thật chạy được* cho khách thay vì nộp 30 trang đặc tả mô tả nó.
- *Cộng tác với khách > đàm phán hợp đồng:* khách muốn đổi luồng thanh toán giữa dự án; thay vì cãi "không có trong hợp đồng", nhóm cùng khách điều chỉnh backlog vì thay đổi đó tăng giá trị.
- *Phản hồi với thay đổi > bám kế hoạch:* phát hiện đối thủ ra tính năng mới, nhóm đưa hạng mục đối ứng vào sprint tới thay vì cứng nhắc theo roadmap lập từ 6 tháng trước.

**Bài 2.** **Role:** Development Team, Scrum Master. **Artefact:** Product Backlog, Increment. **Event:** Sprint Review, Sprint Planning. (Mẹo: Role = người/nhóm; Artefact = thứ được tạo ra/danh sách; Event = buổi họp hoặc khung thời gian.)

**Bài 3.** Mỗi việc cần 3 ngày-công, nhóm 4 người = 4 ngày-công/ngày (1 người làm 1 ngày-công/ngày).
- **(b) WIP=1/người, làm xong từng việc:** mỗi người xong 1 việc sau mỗi 3 ngày. Sau 9 ngày, mỗi người xong 9/3 = 3 việc → **4 người × 3 = 12 việc hoàn thành**, và việc đầu tiên đã xong ngay ngày 3.
- **(a) WIP cao, mỗi người ôm 4 việc song song:** tổng năng lực vẫn là 4 ngày-công/ngày, nhưng vì rải đều trên nhiều việc dở dang, sau 9 ngày phần lớn việc *gần xong nhưng chưa xong*; cộng thêm chi phí **context switching** (quên ngữ cảnh, làm lại) nên số việc *thực sự hoàn thành* **ít hơn hẳn 12** — và nhiều việc cùng dở tới tận cuối mới xong, lead time dài.
- **Vì sao chênh:** năng lực tổng như nhau, nhưng "xong" chỉ tính khi *đủ 3 ngày-công cho một việc*. Làm tuần tự đạt mốc "xong" sớm và đều; làm song song trì hoãn mọi mốc "xong" về cuối + mất công chuyển ngữ cảnh. Đây chính là lý do giới hạn WIP (mục 3).

**Bài 4.** Dùng **Kanban**. Hai lý do: (1) *Công việc tới liên tục & không đoán trước* — sự cố/ticket không xếp gọn vào "phạm vi chốt đầu sprint"; luồng liên tục của Kanban hợp hơn. (2) *Ưu tiên đổi thường xuyên* — Kanban cho kéo thẻ ưu tiên mới vào bất cứ lúc nào, trong khi Scrum khuyến nghị giữ phạm vi ổn định trong sprint nên một sự cố khẩn sẽ phá nhịp. (Bonus: giới hạn WIP giúp đội không bị quá tải khi nhiều sự cố dồn cùng lúc, và lộ bottleneck.)

**Bài 5.** Velocity trung bình = (25+30+20)/3 = **25 điểm/sprint**. Số sprint cần = 165 / 25 = **6.6 → làm tròn lên 7 sprint**. Mỗi sprint 2 tuần → **7 × 2 = 14 tuần**. *Giả định có thể sai:* (a) phạm vi backlog *không đổi* — thực tế thường phát sinh thêm hạng mục; (b) velocity *giữ ổn định* — có thể tụt do nghỉ lễ, người nghỉ, việc khó hơn; (c) không có *kỹ thuật nợ/ rủi ro* lớn làm chậm. Vì vậy ước lượng này là *dự báo*, nên cập nhật lại sau mỗi sprint, không phải cam kết cứng.

**Bài 6.** Vì **story point là đơn vị tương đối, định nghĩa riêng trong từng đội**. Đội A có thể quy "1 điểm" cho một việc mà đội B gọi là "3 điểm" — nên velocity 40 (A) so với 20 (B) *không* nói A làm gấp đôi. So sánh giữa đội còn **phản tác dụng**: tạo áp lực khiến đội "thổi phồng" story point để con số đẹp hơn, làm hỏng giá trị dự báo của chính velocity. Velocity chỉ có ý nghĩa khi **một đội so với chính nó qua thời gian** để dự báo và phát hiện xu hướng.

---

## 7. Code & Minh họa

- [visualization.html](./visualization.html) — 3 mô-đun tương tác: (1) **bảng Kanban** kéo/bấm thẻ qua các cột với giới hạn WIP cảnh báo khi vượt, (2) **mô phỏng một Sprint Scrum** — chọn item từ backlog vào sprint rồi "chạy" để xem burndown giảm, (3) **quiz** phân biệt Role / Artefact / Event trong Scrum.

## 8. Bài tiếp theo

- [Lesson 03 — Yêu cầu & đặc tả](../lesson-03-yeu-cau-dac-ta/) — đi sâu vào giai đoạn *Yêu cầu* của SDLC: viết user story, acceptance criteria, làm rõ nhu cầu mơ hồ (chính là thứ "đổ" vào Product Backlog của Scrum).
- Quay lại nền tảng: [Lesson 01 — SDLC & vai trò kỹ sư](../lesson-01-sdlc-vai-tro-ky-su/) (mô hình lặp & vai trò nhóm).
- Xem [trang chính lĩnh vực](../../index.html) để thấy lộ trình đầy đủ.
`;
