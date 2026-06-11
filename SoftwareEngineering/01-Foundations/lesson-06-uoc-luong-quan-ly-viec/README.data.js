// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: SoftwareEngineering/01-Foundations/lesson-06-uoc-luong-quan-ly-viec/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 06 — Ước lượng & quản lý công việc

## Mục tiêu

- Hiểu **vì sao ước lượng phần mềm khó** — vì phần mềm gần như luôn là việc *chưa từng làm y hệt*, cộng với **thiên lệch lạc quan** (planning fallacy) khiến ta luôn ước quá ngắn.
- Nắm **story point** và tư duy **ước lượng tương đối** (so sánh việc với việc) — vì sao nó ổn định hơn ước "giờ tuyệt đối", và vì sao dùng **dãy Fibonacci** (1, 2, 3, 5, 8, 13).
- Biết kỹ thuật **Planning Poker** để cả nhóm ước lượng đồng thuận mà tránh **mỏ neo** (anchoring).
- Đo **velocity** (số point hoàn thành mỗi sprint) và dùng nó để **dự báo** còn bao nhiêu sprint nữa.
- Đọc **burndown / burnup chart**, nhận ra dấu hiệu trễ; nối với **board / backlog** (Kanban) đã học ở Lesson 02.
- Tránh các **bẫy kinh điển**: ép deadline bằng cách cắt test, định luật Hofstadter, và định luật Brooks ("thêm người vào dự án trễ làm nó trễ hơn").

## Kiến thức tiền đề

- [Lesson 05 — Code review](../lesson-05-code-review/) — review là một phần công việc phải *ước lượng vào* (một story chưa "xong" khi chưa review xong).
- [Lesson 02 — Agile, Scrum & Kanban](../lesson-02-agile-scrum-kanban/) — bài này dùng lại các khái niệm **sprint**, **backlog**, **board** từ Scrum/Kanban. Nếu chưa rõ "sprint là gì", đọc lại Lesson 02 trước.
- Không cần kiến thức thống kê hay quản lý dự án trước.

> 💡 **Vì sao "ước lượng" lại là một kỹ năng kỹ thuật, không phải việc của riêng quản lý?** Vì người *làm* việc mới biết việc đó khó tới đâu. Ước lượng tồi → cam kết tồi → đội làm overtime, cắt test, chất lượng tụt (nối thẳng đường cong chi phí ở [Lesson 01](../lesson-01-sdlc-vai-tro-ky-su/)). Một kỹ sư biết ước lượng *trung thực và có phương pháp* bảo vệ được cả tiến độ lẫn chất lượng.

---

## 1. Vì sao ước lượng phần mềm khó

💡 **Trực giác.** Ước thời gian đi từ nhà tới chỗ làm thì dễ — vì bạn đã đi *hàng trăm lần*, có dữ liệu thật. Còn phần mềm: nếu một tính năng đã có code y hệt thì bạn đã *copy* nó rồi, đâu cần làm lại. Nghĩa là mỗi việc đáng ước lượng gần như luôn là **việc chưa từng làm đúng y như vậy** — không có "lần trước" để dựa vào.

Hai nguồn gốc của sai số:

1. **Bất định nội tại (không biết hết).** Khi ước, bạn chưa biết hết: API của bên thứ ba có quirk gì, dữ liệu thật có ca biên nào, refactor sẽ kéo theo bao nhiêu chỗ. Ước lượng là dự đoán *trước khi* khám phá.
2. **Thiên lệch lạc quan — planning fallacy.** Con người có xu hướng tưởng tượng kịch bản "mọi thứ trôi chảy" và bỏ quên thời gian cho lỗi, gián đoạn, họp, review. Đây là thiên lệch *có hệ thống* (luôn lệch về phía ngắn), không phải lỗi ngẫu nhiên.

**Ví dụ số cụ thể.** Bạn ước "thêm nút xuất CSV — **2 ngày**". Thực tế:

| Việc phát sinh | Thời gian |
|----------------|-----------|
| Code chính (đúng như tưởng tượng) | 1.0 ngày |
| Ký tự tiếng Việt bị lỗi encoding, phải xử lý UTF-8 BOM | 0.5 ngày |
| Dữ liệu có dòng null làm crash, thêm validation | 0.5 ngày |
| Viết test + sửa theo code review | 1.0 ngày |
| Họp standup + trả lời câu hỏi việc khác | 1.0 ngày |
| **Tổng thực tế** | **5 ngày** |

Ước 2 → thực 5 không phải vì bạn "dở", mà vì bạn ước phần *đã hình dung được* (1 ngày code) và bỏ quên phần *chưa hình dung được* (mọi thứ còn lại).

> ⚠ **Lỗi thường gặp.** Ước lượng bằng cách *chỉ* tưởng tượng "happy path" rồi nhân đôi cho chắc. Nhân đôi một con số đã thiếu nền tảng vẫn ra con số thiếu nền tảng. Cách tốt hơn (mục 2-4): ước *tương đối* dựa trên việc tương tự đã làm, rồi để **velocity thật** hiệu chỉnh.

> ❓ **Câu hỏi tự nhiên của người đọc.**
> - *"Vậy ước lượng vô ích à?"* — Không. Mục tiêu không phải đúng tuyệt đối, mà là **đủ tốt để lập kế hoạch và phát hiện sớm khi lệch**. Một ước lượng có phương pháp + theo dõi velocity tốt hơn nhiều so với "đoán đại".
> - *"Sao không cứ ước thật rộng cho an toàn?"* — Ước quá rộng cũng có giá: công việc giãn nở lấp đầy thời gian cho phép (định luật Parkinson), và cam kết lỏng lẻo khiến không ai tin con số. Ta cần ước *trung thực*, không phải *bi quan*.

> 🔁 **Dừng lại tự kiểm tra.** Vì sao ước lượng việc lái xe đi làm dễ hơn nhiều so với ước lượng một tính năng phần mềm?
> <details><summary>Đáp án</summary>Vì lái xe là việc <b>đã lặp lại hàng trăm lần</b> với dữ liệu thật → sai số nhỏ. Tính năng phần mềm gần như luôn là việc <b>chưa từng làm y hệt</b> (nếu giống hệt thì đã copy lại), cộng <b>thiên lệch lạc quan</b> khiến ta bỏ quên thời gian cho lỗi, họp, review. Bất định cao + thiên lệch có hệ thống = ước lượng khó.</details>

📝 **Tóm tắt mục 1.** Ước lượng phần mềm khó vì (1) mỗi việc đáng làm gần như luôn mới → bất định cao, và (2) **planning fallacy** khiến ta lệch *có hệ thống* về phía ngắn. Mục tiêu không phải đúng tuyệt đối mà là đủ tốt để lập kế hoạch và phát hiện lệch sớm.

---

## 2. Story point & ước lượng tương đối

💡 **Trực giác.** Hỏi bạn "quả dưa hấu nặng bao nhiêu *gram*?" — khó, dễ sai cả trăm gram. Nhưng hỏi "quả dưa hấu nặng *gấp mấy lần* quả táo?" — bạn trả lời "khoảng 10 lần" nhanh và khá chắc. Não người ước **tương đối** (so sánh) giỏi hơn ước **tuyệt đối** nhiều. Story point khai thác đúng điểm mạnh này.

**Story point** là một con số *không thứ nguyên* thể hiện **độ lớn tổng hợp** của một việc — gộp cả *công sức*, *độ phức tạp* và *độ bất định* — **so tương đối** với các việc khác, **không phải số giờ**.

**Vì sao tương đối tốt hơn giờ tuyệt đối:**

| | Ước bằng giờ tuyệt đối | Ước bằng story point (tương đối) |
|---|---|---|
| Phụ thuộc người | Dev nhanh ước 4h, dev mới ước 12h cho *cùng* việc | Cùng nhìn "việc này gấp đôi việc kia" → point giống nhau |
| Áp lực tâm lý | "8 giờ" thành cam kết cứng, sai là thấy có lỗi | Point trừu tượng, dễ nói thẳng về độ khó |
| Hiệu chỉnh | Phải đoán lại giờ mỗi lần | **Velocity** tự quy đổi point → thời gian thực (mục 4) |

**Vì sao dùng dãy Fibonacci (1, 2, 3, 5, 8, 13, 21…):** khoảng cách giữa các số *giãn dần*. Lý do: việc càng lớn thì ta càng *không phân biệt nổi* "13 hay 14" — sự bất định lớn hơn cả khoảng cách 1 đơn vị. Fibonacci buộc phải chọn 8 hoặc 13 chứ không có 9, 10, 11, 12 — tránh tranh cãi giả về độ chính xác mà ta không thực sự có. Một việc to hơn 13 nên được **chẻ nhỏ** thay vì gán 20.

**Ví dụ cụ thể — gán point cho một "việc neo" rồi so phần còn lại:**

Chọn một việc nhỏ ai cũng hiểu làm **mốc = 2 point**: *"Thêm trường 'số điện thoại' vào form đăng ký (có validate)"*.

| Task | So với mốc | Point |
|------|-----------|:-----:|
| Sửa nhãn nút từ "Lưu" thành "Cập nhật" | nhỏ hơn mốc nhiều, gần như không bất định | **1** |
| Thêm trường "số điện thoại" (mốc) | — | **2** |
| Thêm bộ lọc theo ngày cho danh sách đơn hàng | gấp ~1.5 lần mốc, có chút logic | **3** |
| Tích hợp đăng nhập Google (OAuth) | nhiều bước, có bất định về API ngoài | **8** |
| Xây trang dashboard báo cáo realtime | rất lớn + nhiều ẩn số → nên chẻ nhỏ | **13** (cờ "to quá, tách ra") |

Lưu ý: ta *không* nói "OAuth tốn 16 giờ". Ta nói "OAuth lớn cỡ gấp 4 lần việc mốc". Bao nhiêu giờ thì để velocity trả lời.

> ⚠ **Lỗi thường gặp.** Coi "1 point = 1 giờ" (hoặc "= 1 ngày"). Làm vậy là vứt bỏ toàn bộ lợi ích: point lập tức biến thành giờ trá hình, mang lại mọi nhược điểm của ước tuyệt đối. Point **chỉ có nghĩa khi so với nhau** trong cùng một đội.

> ❓ **Câu hỏi tự nhiên của người đọc.**
> - *"Point của đội này so được với đội kia không?"* — Không. 8 point của đội A và đội B là hai thước đo khác nhau (như hai cây thước chia vạch khác nhau). Đừng dùng point để so sánh năng suất giữa các đội.
> - *"Tại sao gộp cả công sức lẫn bất định vào một số?"* — Vì cái khiến việc "lâu" thường chính là *bất định* (phải dò, phải sửa). Một việc ít code nhưng nhiều ẩn số vẫn nên point cao.

> 🔁 **Dừng lại tự kiểm tra.** Đội đặt mốc 2 point = "thêm một trường form đơn giản". Có task "viết lại toàn bộ module thanh toán, đụng 12 file, tích hợp cổng mới". Nên gán mấy point?
> <details><summary>Đáp án</summary>Đây là việc <b>quá lớn và nhiều ẩn số</b> — gán 13 (hoặc 21) chủ yếu là tín hiệu "<b>to quá, phải chẻ nhỏ</b>" chứ không phải con số đáng tin. Nên tách thành các story con (vd: "tích hợp cổng — sandbox", "di trú dữ liệu cũ", "xử lý hoàn tiền"...) rồi ước riêng từng cái. Story càng to, sai số ước lượng càng lớn — Fibonacci nhắc ta điều đó bằng khoảng cách giãn dần.</details>

📝 **Tóm tắt mục 2.** Story point đo **độ lớn tương đối** (công sức + phức tạp + bất định), không phải giờ. Tương đối ổn định hơn tuyệt đối vì não ước so sánh giỏi hơn ước con số. Dãy **Fibonacci** giãn dần phản ánh việc càng to thì ước càng kém chính xác — buộc chẻ nhỏ thay vì giả vờ chính xác.

---

## 3. Planning Poker — ước lượng nhóm đồng thuận

💡 **Trực giác.** Nếu trong cuộc họp người *senior* hoặc *sếp* nói trước "việc này chắc 3 point thôi", mọi người sau đó có xu hướng nói theo — gọi là **mỏ neo (anchoring)**: con số đầu tiên neo giữ suy nghĩ của cả nhóm. Planning Poker chữa đúng điều này bằng cách bắt mọi người **chọn đồng thời, giấu kín** trước khi lộ.

**Các bước Planning Poker:**

1. Mỗi thành viên có bộ thẻ Fibonacci (1, 2, 3, 5, 8, 13, …).
2. Product Owner đọc một story; nhóm hỏi cho rõ (clarify) — *chưa* nói số.
3. **Tất cả chọn thẻ úp xuống cùng lúc** (giấu lựa chọn). Đây là bước chống mỏ neo.
4. **Lật đồng thời.** Nếu mọi người trùng → chốt point đó.
5. Nếu **lệch nhau** (vd người 3, người 13) → *người thấp nhất và cao nhất giải thích lý do*. Người ước 3 có thể biết "đã có sẵn thư viện làm việc này"; người ước 13 có thể thấy "phải xử lý ca biên dữ liệu cũ". **Sự lệch chính là giá trị lớn nhất** — nó lôi ra thông tin mà người kia chưa biết.
6. **Bỏ thẻ lại lần nữa.** Lặp tới khi hội tụ (thường 2-3 vòng).

**Ví dụ cụ thể — một vòng cho story "tích hợp đăng nhập Google":**

| Thành viên | Vòng 1 | Lý do |
|-----------|:------:|-------|
| An (đã làm OAuth lần trước) | 3 | "Có thư viện sẵn, copy cấu hình cũ" |
| Bình | 8 | "Lo phần xử lý token hết hạn & refresh" |
| Chi | 5 | — |
| **Sau thảo luận** | | An không biết dự án này yêu cầu refresh token; Bình không biết có thư viện sẵn |
| **Vòng 2 — hội tụ** | **5** | Cả ba chốt 5 sau khi gộp thông tin |

Điểm mấu chốt: nếu An nói trước "3 thôi" rồi cả nhóm gật, thông tin "phải xử lý refresh token" của Bình sẽ *không bao giờ lộ ra* — và đội sẽ cam kết hụt.

> ⚠ **Lỗi thường gặp.** (1) Lấy **trung bình** các con số ((3+8+5)/3 = 5.3 → 5) thay vì thảo luận — làm vậy là bỏ phí thông tin đằng sau sự lệch. (2) Để người to tiếng/cấp cao nói số trước. (3) Biến thảo luận thành tranh cãi ai đúng — mục tiêu là *gộp thông tin*, không phải thắng thua.

> ❓ **Câu hỏi tự nhiên của người đọc.**
> - *"Mất thời gian họp poker có đáng không?"* — Đáng cho story còn mơ hồ: việc lộ giả định sai sớm rẻ hơn nhiều việc làm hụt rồi sửa. Story rõ ràng/nhỏ có thể chốt nhanh, không cần đủ vòng.
> - *"Nếu mãi không hội tụ?"* — Thường là dấu hiệu story chưa đủ rõ hoặc quá to → tách nhỏ hoặc làm rõ yêu cầu trước ([Lesson 03](../lesson-03-yeu-cau-dac-ta/)).

> 🔁 **Dừng lại tự kiểm tra.** Vì sao mọi người chọn thẻ *đồng thời và giấu kín* thay vì lần lượt nói số?
> <details><summary>Đáp án</summary>Để chống <b>mỏ neo (anchoring)</b>: nếu nói lần lượt, con số đầu tiên (nhất là từ người senior/sếp) sẽ neo giữ suy nghĩ cả nhóm, mọi người gật theo. Chọn đồng thời giữ cho mỗi đánh giá <b>độc lập</b> → sự lệch giữa các con số mới lộ ra, và chính sự lệch đó kéo ra thông tin/giả định mà từng người chưa biết.</details>

📝 **Tóm tắt mục 3.** Planning Poker = chọn thẻ Fibonacci **đồng thời, giấu kín**, lật cùng lúc, ai cao/thấp nhất giải thích, lặp tới hội tụ. Mục tiêu cốt lõi: chống **mỏ neo** và **gộp thông tin** giữa người biết nhiều/ít về việc, không phải lấy trung bình.

---

## 4. Velocity & dự báo

💡 **Trực giác.** Bạn không cần biết "1 point bằng mấy giờ" — chỉ cần biết **đội này thường làm xong bao nhiêu point mỗi sprint**. Đó là **velocity**. Giống như biết một đoàn tàu đi được ~80 km mỗi giờ, bạn dự đoán được khi nào tới đích mà không cần tính từng vòng bánh xe.

**Định nghĩa.** **Velocity** = tổng story point của các story **hoàn thành** (đúng "definition of done", gồm cả test + review) trong một sprint. Đo *thực tế*, không phải mục tiêu.

**Vì sao velocity quan trọng:** nó là cây cầu duy nhất biến point (trừu tượng) thành **thời gian thực**. Point cho biết *việc to cỡ nào*; velocity cho biết *đội tiêu hóa point nhanh cỡ nào*; chia ra → số sprint còn lại.

**Walk-through dự báo bằng số cụ thể:**

Giả sử velocity 4 sprint vừa qua: **18, 22, 19, 21** point.

$$
\\text{velocity trung bình} = \\frac{18 + 22 + 19 + 21}{4} = \\frac{80}{4} = 20 \\text{ point/sprint}
$$

Backlog còn lại = **80 point**. Số sprint cần:

$$
\\frac{80 \\text{ point}}{20 \\text{ point/sprint}} = 4 \\text{ sprint}
$$

Nếu mỗi sprint dài 2 tuần → còn **~8 tuần**. Verify: 4 sprint × 20 point = 80 point = đúng backlog ✓.

**Dùng khoảng (range), không một số:** velocity dao động (18–22). Nên dự báo *bi quan ↔ lạc quan*:

- Lạc quan (velocity cao nhất = 22): 80 / 22 ≈ **3.6 → 4 sprint**.
- Bi quan (velocity thấp nhất = 18): 80 / 18 ≈ **4.4 → 5 sprint**.
- → Nói với khách: **"khoảng 4-5 sprint (8-10 tuần)"**, không nói "đúng 8 tuần".

> ⚠ **Lỗi thường gặp.** (1) Lấy velocity của *sprint tốt nhất* làm chuẩn dự báo → luôn hứa hụt. (2) Đếm point của story *làm dở dang* vào velocity — chỉ đếm story đã **done** hẳn. (3) Tăng point lên để "velocity nhìn đẹp" (point inflation) — tự lừa mình, dự báo càng sai.

> ❓ **Câu hỏi tự nhiên của người đọc.**
> - *"Đội mới chưa có lịch sử thì lấy velocity đâu?"* — Vài sprint đầu cứ ước & cam kết thận trọng; sau 3 sprint đã có dữ liệu thật để hiệu chỉnh. Velocity là thứ *học được theo thời gian*.
> - *"Backlog thêm việc mới giữa chừng thì sao?"* — Dự báo phải tính lại: cộng point mới vào tử số. Đây là lý do dự báo cần cập nhật mỗi sprint, không phải đặt một lần.

> 🔁 **Dừng lại tự kiểm tra.** Velocity 3 sprint: 15, 25, 20. Backlog còn 90 point. Dự báo (khoảng) còn mấy sprint?
> <details><summary>Đáp án</summary>Trung bình = (15+25+20)/3 = 60/3 = <b>20 point/sprint</b> → 90/20 = <b>4.5 → 5 sprint</b> (kế hoạch trung tâm). Khoảng: bi quan 90/15 = 6 sprint; lạc quan 90/25 = 3.6 → 4 sprint. Báo cáo: <b>"khoảng 4-6 sprint"</b>. Lưu ý sprint thứ nhất chỉ 15 — nếu đó là sprint khởi động bất thường, có thể loại khỏi trung bình; nếu là dao động bình thường thì giữ.</details>

📝 **Tóm tắt mục 4.** Velocity = point **done** mỗi sprint (thực tế, không phải mục tiêu). Dự báo: \`số sprint = backlog / velocity_trung_bình\`. Luôn báo cáo bằng **khoảng** (dùng velocity thấp nhất–cao nhất) và **cập nhật mỗi sprint**, không hứa một con số cứng.

---

## 5. Theo dõi tiến độ — burndown, burnup & board

💡 **Trực giác.** Velocity cho dự báo *tổng thể*; còn *trong* một sprint, ta cần biết "đang đúng hướng hay sắp trễ" để xử lý kịp. **Burndown chart** là cái đồng hồ đếm ngược trực quan cho điều đó.

### 5.1 Burndown chart — đọc thế nào

**Burndown** vẽ *số point còn lại* theo thời gian, giảm dần về 0 vào cuối sprint.

- **Đường lý tưởng (ideal):** đường thẳng nối "đầu sprint = toàn bộ point" tới "cuối sprint = 0". Vd sprint 10 ngày, 20 point → mỗi ngày nên "đốt" 2 point.
- **Đường thực tế (actual):** point còn lại *thật* mỗi ngày.

**Dấu hiệu đọc được:**

| Đường thực tế so với lý tưởng | Nghĩa là |
|-------------------------------|----------|
| Nằm **trên** đường lý tưởng | **Chậm** — còn nhiều point hơn dự kiến, nguy cơ trễ |
| Nằm **dưới** đường lý tưởng | Nhanh hơn kế hoạch (có thể nhận thêm việc) |
| **Phẳng ngang** nhiều ngày | Bị kẹt — không story nào "done" (thường do story quá to hoặc bị block) |
| **Đi lên** (point tăng) | Backlog bị thêm việc giữa sprint (scope creep) |

**Ví dụ số cụ thể.** Sprint 10 ngày, 20 point. Ngày thứ 5, đường lý tưởng nói "còn 10 point". Thực tế còn **16 point** → đang chậm: trong 5 ngày qua chỉ đốt 4 point (≈0.8/ngày) trong khi cần 2/ngày. Để kịp, 5 ngày còn lại phải đốt 16/5 ≈ 3.2 point/ngày — gấp 4 lần nhịp đang chạy. Tín hiệu rõ: phải cắt scope hoặc gỡ block *ngay*, đừng đợi tới cuối sprint.

### 5.2 Burnup chart — bù điểm yếu của burndown

**Burnup** vẽ *hai* đường: (1) point **đã hoàn thành** (đi lên) và (2) **tổng phạm vi** (scope, đường trần). Ưu điểm so với burndown: khi backlog bị thêm việc, ở burndown bạn chỉ thấy đường "không giảm" và *tưởng* đội chậm; ở burnup bạn thấy rõ **đường trần dâng lên** → biết ngay là do *thêm việc* chứ không phải đội ì.

### 5.3 Board & backlog — nối lại Kanban (Lesson 02)

Burndown/burnup là *biểu đồ tổng*; còn việc *từng thẻ đang ở đâu* thì nhìn trên **board** (To Do / Doing / Done) đã học ở [Lesson 02](../lesson-02-agile-scrum-kanban/). Hai công cụ bổ trợ:

- **Board**: trạng thái *từng* việc, thấy ngay cái gì đang kẹt ở "Doing" quá lâu.
- **Burndown/burnup**: bức tranh *tổng* của cả sprint, thấy xu hướng.
- **Backlog**: kho việc *chưa* vào sprint, đã ưu tiên — nguồn để tính dự báo (mục 4).

> ⚠ **Lỗi thường gặp.** Nhìn burndown phẳng vài ngày rồi mới hốt hoảng vào ngày cuối. Burndown có giá trị *khi đọc mỗi ngày* để can thiệp sớm; đọc vào ngày cuối thì nó chỉ là cáo phó, không cứu được sprint.

> ❓ **Câu hỏi tự nhiên của người đọc.**
> - *"Burndown đẹp có nghĩa chất lượng tốt?"* — Không. Burndown chỉ đo *point đã đốt*, không đo chất lượng. Một đội cắt test để "done" nhanh vẫn có burndown đẹp nhưng đang tích nợ (xem mục 6).
> - *"Board và burndown chọn cái nào?"* — Cả hai, chúng trả lời câu hỏi khác nhau: board = "việc *này* ở đâu?", burndown = "cả sprint có kịp không?".

> 🔁 **Dừng lại tự kiểm tra.** Burndown của một sprint nằm *trên* đường lý tưởng suốt 7/10 ngày rồi tụt thẳng đứng về 0 đúng ngày cuối. Khả năng cao đã xảy ra chuyện gì?
> <details><summary>Đáp án</summary>Nhiều story bị giữ ở trạng thái "gần xong" rồi <b>đồng loạt đánh dấu done vào ngày cuối</b> — thường vì story quá to (không đốt được dần) hoặc đội dồn việc cuối sprint, có thể kèm cắt test/review để kịp. Burndown "phẳng rồi rơi" là cảnh báo: nên chẻ story nhỏ hơn để tiến độ phản ánh trung thực mỗi ngày, và kiểm tra xem "done" có thật là done (đã test + review) không.</details>

📝 **Tóm tắt mục 5.** **Burndown** = point còn lại theo thời gian (trên đường lý tưởng = chậm; phẳng = kẹt). **Burnup** thêm đường scope nên phân biệt được "chậm" với "bị thêm việc". **Board** cho trạng thái từng việc; **backlog** là nguồn dự báo. Đọc *mỗi ngày* để can thiệp sớm, không phải để khám nghiệm cuối sprint.

---

## 6. Bẫy thường gặp khi quản lý tiến độ

💡 **Trực giác.** Phần lớn dự án trễ không phải vì một cú sốc lớn, mà vì những bẫy *nhỏ và quen thuộc* lặp lại. Biết tên chúng giúp nhận ra sớm.

### 6.1 Ép deadline bằng cách cắt test

Khi trễ, cám dỗ lớn nhất là "tạm bỏ test cho kịp". Nhưng cắt test không *xóa* việc — nó **đẩy lỗi về sau**, đúng [đường cong chi phí Lesson 01](../lesson-01-sdlc-vai-tro-ky-su/): lỗi bắt ở production đắt gấp hàng chục lần bắt sớm.

**Ví dụ số.** Cắt 2 ngày test để release đúng hạn → tháng sau tốn 6 ngày sửa lỗi production rải rác + mất uy tín. "Tiết kiệm" 2 ngày trước mắt, trả 6 ngày sau = lỗ ròng. Burndown đẹp nhưng nợ kỹ thuật dâng.

### 6.2 Định luật Hofstadter

> *"Việc gì cũng lâu hơn bạn tưởng, **kể cả khi bạn đã tính tới định luật Hofstadter**."*

Ý nghĩa thực hành: thiên lệch lạc quan (mục 1) bền bỉ tới mức ngay cả khi *biết* mình hay ước thiếu và cố bù vào, ta *vẫn* thường thiếu. Hệ quả: đừng tin một ước lượng "đã cộng buffer rồi"; hãy tin **velocity đo từ thực tế**.

### 6.3 Định luật Brooks — "thêm người vào dự án trễ làm nó trễ hơn"

Trực giác sai: dự án trễ → thuê thêm người → xong nhanh hơn. Thực tế (Fred Brooks, *The Mythical Man-Month*): thêm người vào dự án *đang trễ* thường làm nó **trễ thêm**, vì:

1. Người mới cần thời gian **học hệ thống** (ramp-up) — và người *cũ* phải dừng việc để kèm họ.
2. **Chi phí giao tiếp tăng theo bình phương**: $n$ người có $\\frac{n(n-1)}{2}$ kênh liên lạc. Từ 3 người (3 kênh) lên 6 người → $\\frac{6 \\cdot 5}{2} = 15$ kênh: gấp 5 lần, không phải gấp đôi.
3. Có việc **không chia nhỏ được** ("9 bà mẹ không đẻ ra 1 em bé trong 1 tháng").

**Ví dụ số.** Đội 3 người đang trễ. Thêm 3 người mới: 2 tuần đầu, 3 người cũ mất ~30% thời gian kèm cặp, 3 người mới năng suất ~20%. Tổng sản lượng 2 tuần đó *thấp hơn* khi chỉ có 3 người — dự án trễ thêm trước khi (may ra) nhanh lên.

> ⚠ **Lỗi thường gặp.** Phản xạ "trễ thì thêm người". Cách đúng khi trễ: **cắt phạm vi (scope)** — giao ít tính năng hơn nhưng đúng hạn và đủ chất lượng — thường tốt hơn nhồi người hay cắt test.

> ❓ **Câu hỏi tự nhiên của người đọc.** *"Vậy không bao giờ được thêm người à?"* — Có lúc nên, nhưng phải **sớm** (đầu dự án, còn thời gian ramp-up) và tính tới chi phí giao tiếp; thêm người vào *cuối* dự án trễ mới là cái bẫy Brooks cảnh báo.

> 🔁 **Dừng lại tự kiểm tra.** Dự án còn 1 tuần thì trễ rõ. Sếp đề xuất (a) thêm 4 dev mới, (b) cắt test để kịp, (c) cắt 2 tính năng ít quan trọng giao sau. Chọn gì, vì sao?
> <details><summary>Đáp án</summary><b>(c) cắt scope</b>. (a) vướng <b>định luật Brooks</b> — 1 tuần không đủ để người mới ramp-up, lại kéo người cũ đi kèm → trễ thêm. (b) cắt test đẩy lỗi về production, đắt gấp bội (<b>đường cong chi phí</b>) và hạ uy tín. (c) giao ít tính năng hơn nhưng <b>đúng hạn và đủ chất lượng</b> phần đã giao, phần còn lại đưa sang sprint sau — bảo toàn cả tiến độ lẫn chất lượng.</details>

📝 **Tóm tắt mục 6.** Ba bẫy kinh điển: **cắt test** (đẩy lỗi về production, đắt hơn — nối đường cong chi phí L01); **Hofstadter** (luôn lâu hơn tưởng, kể cả khi đã đề phòng → tin velocity hơn tin buffer); **Brooks** (thêm người vào dự án trễ làm nó trễ hơn do ramp-up + giao tiếp $\\frac{n(n-1)}{2}$). Khi trễ, **cắt scope** thường là lựa chọn lành mạnh nhất.

---

## 7. Bài tập

1. **Dự báo cơ bản.** Velocity 4 sprint gần nhất: 24, 26, 22, 28 point. Backlog còn 130 point. Tính velocity trung bình và dự báo số sprint còn lại (cho cả khoảng bi quan–lạc quan). Nếu mỗi sprint 2 tuần, ước khoảng thời gian.
2. **Gán story point tương đối.** Lấy mốc **2 point** = "thêm một trường vào form (có validate)". Gán point (chọn từ 1, 2, 3, 5, 8, 13) cho: (a) đổi màu nút theo theme; (b) thêm phân trang cho danh sách; (c) tích hợp thanh toán qua cổng ngoài lần đầu; (d) viết lại toàn bộ module báo cáo realtime. Giải thích mỗi lựa chọn.
3. **Chỉ ra sai lầm trong kế hoạch.** Một PM viết: *"Đội làm được tới 30 point ở sprint tốt nhất, nên ta cứ tính velocity = 30. Backlog 150 point = đúng 5 sprint = 10 tuần, cam kết chắc chắn với khách ngày đó. Nếu lỡ trễ thì tuần cuối thêm 3 dev và bỏ bớt test cho kịp."* Chỉ ra **ít nhất 3** sai lầm và sửa lại.
4. **Đọc burndown.** Sprint 10 ngày, 30 point. Hết ngày 6, còn lại 21 point. (a) Đường lý tưởng nói còn bao nhiêu point ở ngày 6? (b) Đội đang nhanh hay chậm? (c) 4 ngày còn lại phải đốt bao nhiêu point/ngày để kịp, so với nhịp lý tưởng?
5. **Planning Poker.** Trong một vòng cho story X, ba thành viên chọn 2, 3, 13. (a) Vì sao *không* nên chốt ngay bằng trung bình ≈ 6? (b) Nên làm gì tiếp theo? (c) Vì sao việc người ước 13 giải thích lý do lại có giá trị?

## Lời giải chi tiết

**Bài 1.** Trung bình = (24+26+22+28)/4 = 100/4 = **25 point/sprint**. Dự báo trung tâm: 130/25 = 5.2 → **6 sprint** (làm tròn lên vì không có "0.2 sprint"). Khoảng: lạc quan dùng velocity cao nhất 28 → 130/28 ≈ 4.6 → **5 sprint**; bi quan dùng thấp nhất 22 → 130/22 ≈ 5.9 → **6 sprint**. Vậy báo cáo **"khoảng 5-6 sprint"**, mỗi sprint 2 tuần → **~10-12 tuần**. Không hứa "đúng 10.4 tuần".

**Bài 2.** (Point có thể lệch 1 bậc tùy đội, miễn *lý do tương đối* hợp lý.)
- (a) Đổi màu nút theo theme → nhỏ hơn mốc, gần như không bất định → **1**.
- (b) Thêm phân trang cho danh sách → lớn hơn mốc chút, có logic offset/limit + sửa UI → **3**.
- (c) Tích hợp thanh toán qua cổng ngoài lần đầu → nhiều bước, *bất định cao* (API ngoài, xử lý lỗi, sandbox→production, hoàn tiền) → **8**.
- (d) Viết lại toàn bộ module báo cáo realtime → quá lớn + rất nhiều ẩn số → **13**, nhưng con số này chủ yếu là cờ "**to quá, phải chẻ nhỏ**" trước khi làm, không phải ước đáng tin.
Lưu ý: tất cả gán *so với mốc*, không quy ra giờ.

**Bài 3.** Ít nhất 3 sai lầm:
1. **Dùng velocity sprint tốt nhất (30) làm chuẩn** → luôn hứa hụt. Sửa: dùng velocity *trung bình* và báo cáo bằng *khoảng* (bi quan–lạc quan).
2. **Cam kết một ngày "chắc chắn"** cho việc bất định → vi phạm chính bản chất ước lượng + định luật Hofstadter. Sửa: cam kết khoảng, cập nhật mỗi sprint theo velocity thật.
3. **"Trễ thì thêm 3 dev tuần cuối"** → định luật Brooks: ramp-up + giao tiếp $\\frac{n(n-1)}{2}$ làm trễ *thêm*. Sửa: khi trễ thì **cắt scope**, không nhồi người vào phút chót.
4. **"Bỏ bớt test cho kịp"** → đẩy lỗi về production, đắt gấp bội (đường cong chi phí L01) + hạ uy tín. Sửa: giữ test, giảm phạm vi tính năng thay vì giảm chất lượng.

**Bài 4.** (a) Sprint 30 point / 10 ngày = 3 point/ngày lý tưởng. Sau 6 ngày nên còn 30 − 6×3 = 30 − 18 = **12 point**. (b) Thực tế còn **21 point** > 12 → đang nằm *trên* đường lý tưởng → **chậm**. (Trong 6 ngày chỉ đốt 30−21 = 9 point ≈ 1.5/ngày, dưới nhịp 3/ngày.) (c) 4 ngày còn lại phải đốt 21/4 ≈ **5.25 point/ngày**, so với nhịp lý tưởng 3/ngày → phải làm gấp ~1.75 lần. Tín hiệu: cần cắt scope hoặc gỡ block *ngay*, đừng đợi cuối sprint.

**Bài 5.** (a) Không chốt bằng trung bình ≈ 6 vì sự **lệch lớn (2 vs 13)** cho thấy các thành viên đang *nhìn việc khác nhau* — có người thấy đơn giản, có người thấy ẩn số lớn. Trung bình *che giấu* mâu thuẫn đó thay vì giải quyết, dễ chốt một con số không ai thực sự tin. (b) Nên cho **người thấp nhất (2) và cao nhất (13) giải thích lý do**, gộp thông tin, rồi **bỏ thẻ lại** (lặp tới hội tụ). (c) Người ước 13 thường đang thấy một **ẩn số/ca biên** mà người ước 2 chưa biết (vd "phải di trú dữ liệu cũ", "API ngoài hay lỗi"). Để họ giải thích sẽ *kéo thông tin đó ra ánh sáng* — nếu bỏ qua, đội sẽ cam kết hụt đúng chỗ rủi ro nhất.

---

## 8. Code & Minh họa

- [visualization.html](./visualization.html) — 3 mô-đun tương tác: (1) **Story point tương đối** — kéo/chọn task lên thang Fibonacci so với một việc mốc; (2) **Burndown & dự báo** — chỉnh backlog và velocity, xem đường burndown vẽ bằng SVG và số sprint dự báo (kèm khoảng); (3) **Planning Poker mô phỏng** — nhiều "thành viên" chọn point lệch nhau, lật bài, thảo luận, hội tụ qua các vòng.

## 9. Bài tiếp theo

🎉 **Bạn vừa hoàn thành Tier 01 — Nền tảng kỹ thuật phần mềm!** Chặng đường đã đi qua:

| Lesson | Chủ đề | Câu hỏi cốt lõi đã trả lời |
|--------|--------|----------------------------|
| [01](../lesson-01-sdlc-vai-tro-ky-su/) | SDLC & vai trò kỹ sư | Làm phần mềm *thật* khác viết code thế nào? |
| [02](../lesson-02-agile-scrum-kanban/) | Agile, Scrum & Kanban | Làm việc theo *nhịp lặp* trong nhóm ra sao? |
| [03](../lesson-03-yeu-cau-dac-ta/) | Yêu cầu & đặc tả | Làm sao biết phải xây *đúng cái gì*? |
| [04](../lesson-04-git-workflow-team/) | Git workflow nhóm | Nhiều người sửa cùng codebase mà không giẫm chân? |
| [05](../lesson-05-code-review/) | Code review | Giữ chất lượng & chia sẻ hiểu biết qua review? |
| **06** | **Ước lượng & quản lý việc** | **Lên kế hoạch & theo dõi tiến độ trung thực thế nào?** |

Bạn đã có đủ nền *quy trình & cộng tác* để làm việc trong một nhóm phần mềm thật.

**Bước tiếp — Tier 02: Thiết kế & chất lượng.** Tier 01 trả lời "*làm phần mềm cùng người khác như thế nào*"; Tier 02 sẽ đi sâu vào "*viết code tốt như thế nào*": **clean code** (code dễ đọc), **SOLID** (nguyên tắc thiết kế hướng đối tượng), **design patterns** (mẫu thiết kế tái dụng), **refactoring** (cải thiện code không đổi hành vi) và **kiểm thử** (testing có hệ thống). Đây chính là nơi đường cong chi phí ở Lesson 01 và "định nghĩa done" ở bài này được hiện thực hóa thành kỹ thuật cụ thể.

- Xem toàn bộ lộ trình và mở Tier 02 tại [trang chính lĩnh vực](../../index.html).
`;
