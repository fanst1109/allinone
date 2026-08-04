// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: Animation/03-Character-Staging/lesson-12-pose-to-shot/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 12 — Từ pose đến shot hoàn chỉnh (Pose-to-Pose & Straight-Ahead)

> **Bài cuối của lĩnh vực Animation.** Mười một bài trước dạy từng nguyên lý *rời rạc*. Bài này là **capstone**: ghép tất cả lại thành một cú nhảy sống động, và trả lời câu hỏi thực chiến của mọi animator — *"bắt đầu dựng một shot từ đâu, theo thứ tự nào?"*

## Mục tiêu học tập

- Phân biệt hai **phương pháp dựng** một chuỗi chuyển động: **Pose-to-pose** (vẽ các pose mấu chốt trước, nội suy sau) và **Straight-ahead** (vẽ liên tục frame này tới frame kia) — biết *khi nào* dùng cái nào.
- Hiểu bộ ba **Key (pose mấu chốt) → Breakdown (pose trung gian) → Inbetween (frame điền)** và tính được **tỉ lệ key/inbetween** của một shot bằng số.
- Phân biệt hai **chế độ review nội suy**: **Stepped** (giữ pose, nhảy bậc thang) dùng khi *blocking*, và **Spline** (đường cong mượt) dùng khi *polish*.
- Ghép **cả 12 nguyên lý** đã học thành một shot duy nhất và thấy rõ *đóng góp riêng của từng nguyên lý* — tắt hết thì máy móc, bật hết thì sống động.

## Kiến thức tiền đề

Bài này *tổng hợp* nên giả định bạn đã nắm các viên gạch:

- **Timing & spacing** — [Lesson 01](../../01-Principles/lesson-01-timing-spacing/) (số frame ↔ thời gian, spacing = gia tốc).
- **Squash & stretch** — [Lesson 02](../../01-Principles/lesson-02-squash-stretch/) (co giãn để bán vật liệu và lực).
- **Slow in / slow out (ease)** — [Lesson 04](../../01-Principles/lesson-04-ease-in-out/) (vào chậm ra chậm).
- **Cường điệu & sức hút** — [Lesson 11](../lesson-11-exaggeration-appeal/) (exaggeration & appeal).

Nếu quên bất kỳ khái niệm nào, mở lại bài tương ứng — bài này *dùng* chúng chứ không dạy lại từ đầu.

---

## 1. Bức tranh lớn: từ 12 viên gạch rời đến MỘT shot

> 💡 **Trực giác.** Học 12 nguyên lý giống như học 12 loại gia vị. Biết từng loại chưa đủ để nấu một món — bạn còn cần **công thức**: cho gì trước, gì sau, nêm bao nhiêu. Một *shot* hoàn chỉnh cũng vậy: nó không phải "12 nguyên lý cộng lại", mà là một **quy trình** ghép chúng theo đúng thứ tự và liều lượng. Bài này chính là công thức đó.

Một **shot** (đoạn hoạt hình liền mạch, thường 1–3 giây) được dựng qua bốn tầng câu hỏi:

$$\\text{shot} = \\underbrace{\\text{phương pháp dựng}}_{\\text{pose-to-pose / straight-ahead}} \\;+\\; \\underbrace{\\text{key/breakdown/inbetween}}_{\\text{giải phẫu bên trong}} \\;+\\; \\underbrace{\\text{chế độ review}}_{\\text{stepped / spline}} \\;+\\; \\underbrace{\\text{12 nguyên lý}}_{\\text{gia vị}}$$

Bốn mục tiếp theo mổ xẻ từng tầng. Cuối cùng, mục 5 ghép tất cả vào **một cú nhảy qua chướng ngại** — và bạn sẽ tự bật/tắt từng nguyên lý trong [visualization.html](./visualization.html) để thấy mỗi cái đóng góp gì.

---

## 2. Hai phương pháp dựng: Pose-to-pose vs Straight-ahead

Đây là **nguyên lý số 4** trong 12 nguyên lý Disney — và là hai *triết lý dựng* đối lập.

### 2.1 Pose-to-pose (vẽ theo pose mấu chốt)

**(a) Là gì.** Vẽ trước các **pose mấu chốt (key poses)** — những khoảnh khắc *quan trọng nhất* của hành động (điểm bắt đầu, điểm cực trị, điểm kết) — rồi mới điền các frame trung gian **giữa** chúng.

**(b) Vì sao cần.** Để **kiểm soát** timing, bố cục và tỉ lệ *trước khi* tốn công vẽ hàng chục frame. Bạn duyệt được toàn shot qua vài pose; sai thì sửa pose, chưa mất gì. Hợp với **hành động có kế hoạch**: diễn xuất (acting), lip-sync, một cú đấm đã biết đích.

**(c) Ví dụ số cụ thể.** Cú nhảy 1 giây @ 24 fps = **25 hình** (frame 0…24). Chọn **6 key**:

| Key | Frame | Pose | Vai trò |
|:---:|:-----:|------|---------|
| K1 | 0 | đứng thẳng, thả lỏng | điểm bắt đầu |
| K2 | 4 | cúi sâu nhất, dồn về sau | **anticipation** (cực trị 1) |
| K3 | 8 | bật khỏi đất, người vươn dài | takeoff (cực trị 2) |
| K4 | 14 | đỉnh cung, treo lơ lửng | apex (cực trị 3) |
| K5 | 20 | chạm đất, bẹp xuống | impact (cực trị 4) |
| K6 | 24 | đứng lại, ổn định | điểm kết |

6 key này *một mình* đã kể trọn câu chuyện. 19 frame còn lại chỉ là "đi lại giữa các pose".

### 2.2 Straight-ahead (vẽ liên tục)

**(a) Là gì.** Vẽ **tuần tự** frame 1 → 2 → 3 → … từ đầu tới cuối, không lên kế hoạch pose trước. Mỗi frame "đẻ" ra frame kế tiếp theo cảm hứng.

**(b) Vì sao cần.** Cho **năng lượng tự nhiên và bất ngờ**: lửa, khói, nước, tóc bay, một pha té ngã hỗn loạn. Những thứ *chảy* và *không đoán trước* trông giả nếu ép vào key cứng nhắc.

**(c) Cái giá phải trả.** Vẽ tới frame 20 mới phát hiện nhân vật **trôi** khỏi vị trí dự định, tỉ lệ **phình to** dần, hoặc timing lố mất nửa giây → sửa thì phải vẽ lại cả chuỗi. Khó kiểm soát là bản chất, không phải lỗi tay nghề.

### 2.3 So sánh trực diện

| Tiêu chí | Pose-to-pose | Straight-ahead |
|----------|--------------|----------------|
| Trình tự | key trước → inbetween sau | frame 1→2→3… liên tục |
| Kiểm soát timing/tỉ lệ | **cao** | thấp (dễ trôi/phình) |
| Cảm giác | chắc chắn, có chủ đích | tự nhiên, bất ngờ, "sống" |
| Rủi ro | có thể thành **cứng/máy móc** nếu inbetween máy làm | mất kiểm soát, khó sửa |
| Hợp với | diễn xuất, hành động **có kế hoạch** | lửa/khói/nước, hỗn loạn, **ngẫu hứng** |

> ❓ **Câu hỏi tự nhiên của người đọc.**
> - *"Phải chọn đúng MỘT cái cho cả shot à?"* → Không. Thực tế **kết hợp**: dựng khung nhân vật bằng pose-to-pose (kiểm soát), rồi làm tóc/áo/khói *chồng lên* bằng straight-ahead (tự nhiên). Đây là cách sản xuất hiện đại làm.
> - *"Máy tính (After Effects, Blender) làm kiểu nào?"* → Về bản chất là **pose-to-pose**: bạn đặt keyframe, máy nội suy inbetween. Straight-ahead thuần là "vẽ tay từng frame" — vẫn dùng cho hiệu ứng khó nội suy.
> - *"Straight-ahead xịn hơn vì tự nhiên hơn?"* → Không có cái "xịn hơn". Diễn xuất một câu thoại mà làm straight-ahead thì gần như chắc chắn trôi timing và lệch khẩu hình. Chọn theo *tính chất hành động*, không theo sở thích.

> ⚠ **Lỗi thường gặp.** *"Pose-to-pose = luôn mượt, straight-ahead = luôn sống."* Sai cả hai vế. Pose-to-pose mà inbetween nội suy tuyến tính (spacing đều) sẽ **cứng như robot** — đúng cái lỗi ở [Lesson 01](../../01-Principles/lesson-01-timing-spacing/). Còn straight-ahead cẩu thả thì thành **rung giật vô nghĩa**, không phải "sống". Chất lượng nằm ở *tay nghề*, không ở phương pháp.

> 🔁 **Dừng lại tự kiểm tra.** Bạn cần làm: (1) nhân vật nói "Xin chào" đúng khẩu hình; (2) một tia lửa bắn ra từ pháo hoa. Mỗi cái nên dùng phương pháp nào?
>
> <details><summary>Đáp án</summary>
>
> (1) **Pose-to-pose** — lời thoại có kế hoạch, phải khớp timing âm thanh và khẩu hình từng âm; cần kiểm soát chặt. (2) **Straight-ahead** — tia lửa chảy hỗn loạn, không đoán trước; vẽ liên tục cho tự nhiên. Nếu ép tia lửa vào key sẽ trông giả và máy móc.
> </details>

---

## 3. Giải phẫu pose-to-pose: Key → Breakdown → Inbetween

Bên trong một shot pose-to-pose có **ba hạng frame**, phân vai rõ ràng.

**(a) Là gì.**

- **Key (pose mấu chốt / extreme):** các pose *quan trọng nhất* — điểm cực trị của hành động (cúi sâu nhất, vươn dài nhất, đỉnh cung). Chúng định *câu chuyện* và *timing*.
- **Breakdown (pose trung gian có chủ đích):** pose nằm *giữa* hai key nhưng **không phải trung điểm máy móc** — nó quyết định hành động đi *đường nào* từ key này sang key kia (bám cung nào, có overshoot không). Đây là nơi animator "gài" arc và sự sống.
- **Inbetween (frame điền):** các frame còn lại, chỉ việc *lấp khoảng trống* giữa key và breakdown. Máy tính hoặc trợ lý làm được vì không cần quyết định nghệ thuật.

**(b) Vì sao tách ba hạng.** Vì công sức và giá trị nghệ thuật *rất khác nhau*. 6 key + 3 breakdown quyết định 90% chất lượng shot; 16 inbetween còn lại là lao động cơ học. Tách ra để **dồn sức vào chỗ đáng**, và biết chỗ nào giao cho máy/trợ lý được.

**(c) Ví dụ số — tỉ lệ key/inbetween của bốn shot khác nhau** (@ 24 fps):

| Shot | Thời lượng | Tổng frame | Key | Breakdown | Inbetween | Tỉ lệ key : tổng |
|------|:----------:|:----------:|:---:|:---------:|:---------:|:----------------:|
| Cú đấm nhanh | 0.25 s | 6 | 2 | 1 | 3 | 2 : 6 ≈ **33%** |
| Cú nhảy (bài này) | 1.0 s | 25 | 6 | 3 | 16 | 6 : 25 = **24%** |
| Vẫy tay chào | 0.5 s | 12 | 3 | 2 | 7 | 3 : 12 = **25%** |
| Vươn vai chậm | 2.0 s | 48 | 4 | 3 | 41 | 4 : 48 ≈ **8%** |

Nhận xét: hành động **càng nhanh, tỉ lệ key càng cao** (cú đấm 33% vì mỗi frame đều đắt giá); hành động **càng chậm/đơn giản, càng nhiều inbetween** (vươn vai chỉ 8% key — phần lớn là điền mượt).

> 💡 **Trực giác về breakdown.** Hai key: tay ở *dưới* (K1) và tay *giơ cao* (K2). Nếu inbetween máy nối thẳng, tay đi **đường thẳng** — vô hồn. Một **breakdown** đặt tay hơi *vòng ra ngoài* ở giữa sẽ ép cả chuyển động bám **cung tròn** (nguyên lý Arc). Breakdown chính là chỗ animator "vẽ đường cho arc và ease chui vào".

> ⚠ **Lỗi thường gặp.** Coi inbetween là *trung điểm hình học* của hai key. Trung điểm đều = spacing đều = robot. Đúng ra, phân bố inbetween phải **theo ease**: dồn frame về gần key khi vào/ra chậm. Ví dụ giữa K3 (takeoff) và K4 (apex), inbetween phải **chụm dần về phía apex** để có *hang time* — xem [Lesson 04](../../01-Principles/lesson-04-ease-in-out/).

> 🔁 **Dừng lại tự kiểm tra.** Một shot 0.5 s @ 24 fps có 4 key. Nếu tỉ lệ key nên rơi khoảng 25–30% cho hành động vừa, số key này *hợp lý* không? Còn bao nhiêu frame là inbetween/breakdown?
>
> <details><summary>Đáp án</summary>
>
> 0.5 s @ 24 fps = 12 frame. 4 key / 12 = **33%** — hơi cao cho hành động "vừa", gợi ý đây là hành động khá nhanh/dứt khoát (như vẫy tay mạnh). Còn lại **12 − 4 = 8 frame** cho breakdown + inbetween. Nếu muốn mượt hơn, giảm còn 3 key (25%).
> </details>

---

## 4. Spline vs Stepped — hai chế độ review nội suy

Khi đã có key, phần mềm hỏi bạn: *nối các key bằng cách nào để xem?* Hai chế độ, dùng ở **hai giai đoạn khác nhau**.

**(a) Là gì.**

- **Stepped (bậc thang):** mỗi key được **giữ nguyên** cho tới đúng frame của key kế tiếp, rồi **nhảy phắt** sang pose mới. Không có inbetween — đồ thị vị trí là **bậc thang**.
- **Spline (đường cong):** các key được nối bằng **đường cong mượt** (Bézier/Hermite), máy tự sinh inbetween có ease. Đồ thị vị trí là **đường cong liên tục**.

**(b) Vì sao cần cả hai — và theo thứ tự.** Đây là điểm mấu chốt của quy trình:

1. **Blocking bằng Stepped trước.** Vì stepped *không* có nội suy, bạn thấy **thuần túy pose và timing** — key có đọc được không? Nhịp có đúng không? Đường cong mượt của spline sẽ **đánh lừa** mắt, che các pose yếu. Stepped phơi bày mọi lỗi timing/pose.
2. **Chuyển sang Spline để polish.** Khi pose đã chắc, bật spline để máy nối mượt, rồi tinh chỉnh ease/arc.

**(c) Ví dụ số — cùng 3 key, hai chế độ hiển thị.** Key: frame 0 → x=0 px; frame 6 → x=180 px; frame 12 → x=240 px.

| Frame | 0 | 2 | 4 | 6 | 8 | 10 | 12 |
|:-----:|:-:|:-:|:-:|:-:|:-:|:--:|:--:|
| **Stepped** (giữ pose) | 0 | 0 | 0 | 180 | 180 | 180 | 240 |
| **Spline** (nối mượt, ease) | 0 | 45 | 110 | 180 | 213 | 232 | 240 |

- Stepped: giá trị **đứng yên** rồi *nhảy* 0 → 180 → 240 tại đúng frame key. Bạn chỉ đọc **pose và thời điểm**, không bị chuyển động ru ngủ.
- Spline: giá trị **bò mượt** qua các frame, có ease (spacing hẹp lúc đầu 0→45, rộng ở giữa 110→180 rồi hẹp lại 232→240) — đúng chuyển động thật.

> 💡 **Trực giác.** Stepped giống xem **truyện tranh** (khung hình rời, đọc pose); Spline giống xem **phim** (chuyển động liền mạch). Bạn *biên tập kịch bản* trên truyện tranh trước, rồi mới *quay phim*. Sửa pose ở giai đoạn phim thì tốn gấp bội.

> ❓ **Câu hỏi tự nhiên của người đọc.**
> - *"Sao không làm spline luôn cho nhanh?"* → Vì spline mượt che lỗi. Một pose xấu trong spline vẫn "trôi qua êm", bạn không nhận ra tới lúc render. Stepped ép bạn nhìn thẳng từng pose.
> - *"Stepped có phải là 'on twos/threes' không?"* → Không hẳn. "On twos" là *cách chiếu* (1 bản vẽ cho 2 frame) áp dụng cả khi đã mượt; Stepped là *chế độ review* giữ pose tới tận key sau. Khác mục đích.

> 🔁 **Dừng lại tự kiểm tra.** Đạo diễn xem bản blocking và nói *"pose đỉnh (apex) chưa đủ cao và tới trễ nửa nhịp"*. Bạn nên đang ở chế độ nào, và sửa gì?
>
> <details><summary>Đáp án</summary>
>
> Đang ở **Stepped** (giai đoạn blocking — đó là lúc duyệt pose/timing). Sửa: nâng giá trị y của key apex (cao hơn) và **dời frame** của key apex sớm lại nửa nhịp. Vì đang stepped, sửa key là đủ — chưa tốn công spline/inbetween nào.
> </details>

---

## 5. Ghép tất cả: một cú nhảy qua chướng ngại (walk-through capstone)

Giờ ghép **cả 12 nguyên lý** vào một hành động: nhân vật (một quả bóng có chỏm) **nhảy qua một cái hộp**. Ta dựng pose-to-pose (6 key ở mục 2.1) rồi *phủ* từng nguyên lý lên.

Bảng dưới cho thấy **mỗi nguyên lý đóng góp gì** — và điều gì mất đi khi tắt nó:

| Nguyên lý | Áp vào cú nhảy | Tắt đi thì… |
|-----------|----------------|-------------|
| **Anticipation** (lấy đà) | Cúi sâu + dồn về sau ở K2 trước khi bật | Bật *đột ngột* từ tư thế đứng — như bị giật dây, không có "nạp lực" |
| **Squash & stretch** (co giãn) | Nén khi cúi & khi chạm đất, kéo dài lúc bay nhanh | Quả bóng **cứng đơ**, không truyền được vật liệu và lực |
| **Slow in / out** (ease) | Bật nhanh rời đất, chậm dần ở đỉnh (*hang time*), nhanh dần khi rơi | Bay với **tốc độ đều** — máy móc, mất cảm giác trọng lực |
| **Arc** (cung) | Quỹ đạo bay là **parabol** cong, không phải đường gấp khúc | Đi theo **hình tam giác nhọn** — gãy gợn, phi vật lý |
| **Follow-through / overlap** (quán tính theo sau) | Chỏm đầu *trễ* theo thân; chạm đất xong còn **nảy dư** rồi mới yên | Dừng **khựng** tức thì — không có quán tính, như đồ vật chết |
| **Exaggeration** (cường điệu) | Đẩy độ cao, độ nén, độ vươn *quá* mức thực để đọc rõ hơn | Đúng vật lý nhưng **nhạt**, thiếu sức hút (xem [L11](../lesson-11-exaggeration-appeal/)) |

> 💡 **Trực giác cộng dồn.** Mỗi nguyên lý là một *lớp*. Tắt hết: quả bóng trượt qua hộp bằng đường thẳng, tốc độ đều, cứng đơ — trông như **con trỏ chuột** bị kéo, không phải sinh vật. Bật dần từng lớp, bạn *thấy* nó "thức dậy": có sức nặng (ease + squash), có ý định (anticipation), có sự sống (arc + follow-through), có duyên (exaggeration). Đó chính là "illusion of life".

**Ví dụ số — hai frame apex, tắt vs bật ease** (cú nhảy 25 frame, đỉnh ở frame 14). *Hang time* là số frame mà bóng ở trong vùng "gần đỉnh" (≥ 90% độ cao tối đa):

| Chế độ | Frame trong vùng ≥90% đỉnh | Hang time @ 24 fps | Cảm giác |
|--------|:--------------------------:|:------------------:|----------|
| **Tắt ease** (spacing đều) | frame 13–15 → **3 frame** | 3/24 ≈ 0.13 s | lướt qua đỉnh, không "treo" |
| **Bật ease** (dồn về đỉnh) | frame 11–17 → **7 frame** | 7/24 ≈ 0.29 s | **treo lơ lửng**, kịch tính |

Bật ease làm bóng ở gần đỉnh **lâu hơn 2.3 lần** (0.29 vs 0.13 s) *mà không đổi tổng thời lượng shot* — đúng bản chất "spacing tạo cảm giác, timing giữ nguyên" từ [Lesson 01](../../01-Principles/lesson-01-timing-spacing/).

> 🔁 **Dừng lại tự kiểm tra.** Trong viz, bạn tắt **hết** nguyên lý rồi bấm Play. Mô tả chuyển động sẽ trông thế nào? Rồi bật **riêng** Arc + Ease — khác gì?
>
> <details><summary>Đáp án</summary>
>
> **Tắt hết:** bóng đi theo **đường gấp khúc nhọn** (không arc), **tốc độ đều** (không ease), **cứng đơ** (không squash), **bật/dừng đột ngột** (không anticipation/follow-through) — máy móc như hình học động. **Bật Arc + Ease:** quỹ đạo thành **parabol cong** và có **hang time** ở đỉnh → đã ra dáng "một cú nhảy", dù vẫn còn cứng vì thiếu squash và thiếu lấy đà. Đây là lý do arc + ease thường là hai lớp *đầu tiên* nên bật.
> </details>

> 📝 **Tóm tắt mục 5.**
> - Một shot = **phương pháp dựng** × **giải phẫu key/inbetween** × **chế độ review** × **12 nguyên lý** phủ lên.
> - Mỗi nguyên lý là một *lớp* đóng góp riêng; tắt hết = máy móc, bật hết = sống động.
> - Ease + arc là hai lớp "biến hình học thành chuyển động"; anticipation + follow-through + squash là ba lớp "thổi hồn"; exaggeration là lớp "tăng duyên".

---

## 6. Bài tập

**Bài 1 (chọn phương pháp).** Với mỗi hành động, chọn Pose-to-pose hay Straight-ahead và giải thích một câu:
a) Nhân vật gật đầu đồng ý theo lời thoại.
b) Một cột khói bốc lên từ ống khói.
c) Cú đá xoáy 720° đã lên storyboard chi tiết.
d) Nước bắn tung tóe khi ném đá xuống ao.

**Bài 2 (tính tỉ lệ key).** Một shot **nhảy lộn** dài **1.5 giây** @ 24 fps. Bạn định 5 key và 4 breakdown.
a) Tổng số frame là bao nhiêu?
b) Số inbetween còn lại là bao nhiêu?
c) Tỉ lệ key : tổng là bao nhiêu phần trăm? So với cú đấm (33%) và vươn vai (8%) ở mục 3, hành động này thuộc "nhóm nhanh" hay "nhóm chậm"?

**Bài 3 (spline vs stepped).** Hai key: frame 0 → y=0; frame 10 → y=200 (px). Ở giữa cần **ease-in** (vào chậm, $p(t)=200\\,t^2$ với $t=\\text{frame}/10$).
a) Trong chế độ **Stepped**, giá trị y ở frame 4 và frame 8 là bao nhiêu?
b) Trong chế độ **Spline (ease-in)**, giá trị y ở frame 4 và frame 8 là bao nhiêu?
c) Ở giai đoạn blocking, nên xem chế độ nào để kiểm tra "key frame 10 có đúng vị trí đỉnh không"? Vì sao?

**Bài 4 (đóng góp nguyên lý).** Trong viz, làm cú nhảy với **chỉ** Squash & Stretch bật (mọi cái khác tắt). Dự đoán: chuyển động sẽ *thiếu* điều gì rõ nhất? Rồi bật thêm Anticipation — mô tả khác biệt.

---

## 7. Lời giải chi tiết

**Bài 1.**
- a) **Pose-to-pose** — gật đầu bám lời thoại, phải khớp timing âm thanh; cần kiểm soát pose và nhịp.
- b) **Straight-ahead** — khói *chảy* liên tục, không đoán trước; vẽ tuần tự cho tự nhiên.
- c) **Pose-to-pose** — cú đá đã có storyboard = *có kế hoạch*, biết trước các pose cực trị; kiểm soát tỉ lệ vòng xoay.
- d) **Straight-ahead** — nước bắn hỗn loạn, mỗi giọt một đường; ép vào key sẽ giả.

  *Nguyên tắc chung:* hành động **có kế hoạch / cần khớp timing** → pose-to-pose; hành động **chảy / ngẫu hứng / hỗn loạn** → straight-ahead.

**Bài 2.**
- a) Tổng frame $= \\text{fps} \\times \\text{giây} = 24 \\times 1.5 = \\mathbf{36}$ frame.
- b) Inbetween $= 36 - (\\text{key} + \\text{breakdown}) = 36 - (5 + 4) = \\mathbf{27}$ frame.
- c) Tỉ lệ key : tổng $= 5 / 36 \\approx \\mathbf{14\\%}$. Nằm giữa vươn vai (8%, chậm) và vẫy tay (25%, vừa) → thiên về **nhóm chậm/nhiều inbetween**, hợp với một cú lộn có pha bay dài cần điền mượt.

**Bài 3.** Dùng $p(t) = 200\\,t^2$, $t = \\text{frame}/10$.
- a) **Stepped** giữ pose của key trước cho tới key sau. Key duy nhất ở đầu là frame 0 (y=0), giữ tới ngay trước frame 10. Vậy frame 4 → $\\mathbf{0}$; frame 8 → $\\mathbf{0}$. (Nhảy lên 200 đúng tại frame 10.)
- b) **Spline (ease-in):**
  - frame 4: $t = 0.4 \\Rightarrow p = 200 \\times 0.4^2 = 200 \\times 0.16 = \\mathbf{32}$ px.
  - frame 8: $t = 0.8 \\Rightarrow p = 200 \\times 0.8^2 = 200 \\times 0.64 = \\mathbf{128}$ px.
  
  Kiểm chứng ease-in: nửa thời gian đầu (frame 0→5) đi được $200\\times0.5^2=50$ px (25%), nửa sau đi 150 px (75%) → **tăng tốc**, đúng "vào chậm".
- c) Xem **Stepped**. Vì stepped phơi bày *thuần* vị trí key mà không có đường cong mượt ru mắt — bạn kiểm tra ngay "frame 10 có đúng đỉnh y=200 không" mà không bị nội suy đánh lừa. Spline sẽ làm mọi thứ trông "ổn" kể cả khi key đặt sai.

**Bài 4.** (dự đoán hợp lý)
- Chỉ **Squash & Stretch**: quả bóng *biết* nén/giãn nhưng vẫn đi **đường gấp khúc** (thiếu arc), **tốc độ đều** (thiếu ease), **bật đột ngột** (thiếu anticipation). Thiếu rõ nhất: **không có "lấy đà"** và **không có hang time** — nó co giãn nhưng chuyển động vẫn máy móc, như một quả bóng cao su bị *máy* ném theo đường thẳng đều.
- Bật thêm **Anticipation**: xuất hiện pha **cúi nạp lực** trước khi bật → cú nhảy có "ý định", đọc được *chủ đích* của nhân vật. Kết hợp squash (nén lúc cúi) + anticipation cho ra một cái *lấy đà đàn hồi* thuyết phục — hai nguyên lý này bổ trợ nhau chặt chẽ.

> 📝 **Tóm tắt bài học.**
> - **Pose-to-pose** = key trước, inbetween sau → kiểm soát tốt, hợp hành động *có kế hoạch*. **Straight-ahead** = vẽ liên tục → tự nhiên/bất ngờ, hợp *lửa/khói/nước/hỗn loạn*, nhưng khó kiểm soát tỉ lệ. Thực tế **kết hợp** cả hai.
> - **Key → Breakdown → Inbetween:** key kể chuyện & định timing; breakdown gài arc/ease; inbetween chỉ điền. Tỉ lệ key càng cao khi hành động càng nhanh.
> - **Stepped** (blocking) phơi bày pose/timing; **Spline** (polish) nối mượt. Luôn *blocking stepped trước, spline sau*.
> - Một shot = ghép **12 nguyên lý** thành *lớp*: tắt hết = máy móc, bật hết = sống động. Ease + arc biến hình học thành chuyển động; anticipation + squash + follow-through thổi hồn; exaggeration tăng duyên.

---

## Kết thúc — hoàn thành lĩnh vực Animation 🎬

Đây là **bài cuối cùng** của lĩnh vực Animation. Từ [Lesson 01](../../01-Principles/lesson-01-timing-spacing/) — nơi bạn học rằng mọi chuyển động chỉ gói trong hai núm *timing* và *spacing* — tới bài này, bạn đã đi hết **12 nguyên lý kinh điển của Disney** và biết cách **ghép chúng thành một shot hoàn chỉnh**.

### Tổng kết 12 nguyên lý — lộ trình bạn vừa đi

| # | Nguyên lý (Anh — Việt) | Ý một câu | Học ở |
|:-:|------------------------|-----------|-------|
| 1 | **Squash & Stretch** — Co giãn | Nén/giãn để bán vật liệu và lực | [Nhánh I · L02](../../01-Principles/lesson-02-squash-stretch/) |
| 2 | **Anticipation** — Lấy đà | Nạp lực ngược hướng trước khi hành động | Nhánh I |
| 3 | **Staging** — Dàn cảnh | Bố cục rõ để mắt đọc đúng ý chính | Nhánh III |
| 4 | **Straight Ahead & Pose to Pose** — Vẽ tuần tự & theo pose | Hai phương pháp dựng shot | **Bài này (L12)** |
| 5 | **Follow-through & Overlap** — Quán tính theo sau & chồng lấp | Bộ phận rời trễ theo, không dừng cùng lúc | Nhánh II |
| 6 | **Slow In & Slow Out** — Vào chậm & ra chậm (ease) | Spacing dồn hai đầu → chuyển động thật | [Nhánh I · L04](../../01-Principles/lesson-04-ease-in-out/) |
| 7 | **Arc** — Cung chuyển động | Vật sống đi theo cung, không đường thẳng | Nhánh II |
| 8 | **Secondary Action** — Hành động phụ | Cử chỉ phụ tô đậm hành động chính | Nhánh II |
| 9 | **Timing** — Nhịp | Số frame quyết định tốc độ & trọng lượng | [Nhánh I · L01](../../01-Principles/lesson-01-timing-spacing/) |
| 10 | **Exaggeration** — Cường điệu | Đẩy quá thực để đọc rõ & có lực | [Nhánh III · L11](../lesson-11-exaggeration-appeal/) |
| 11 | **Solid Drawing** — Vẽ có khối | Giữ thể tích & phối cảnh nhất quán | Nhánh III |
| 12 | **Appeal** — Sức hút | Nhân vật có duyên, dễ đọc, cuốn mắt | [Nhánh III · L11](../lesson-11-exaggeration-appeal/) |

> 💡 12 nguyên lý không phải 12 quy tắc rời — chúng là **một ngôn ngữ**. Bài cuối này dạy *ngữ pháp* ghép chúng lại: dựng bằng pose-to-pose, review bằng stepped→spline, rồi phủ từng nguyên lý thành lớp cho tới khi hình vẽ "thức dậy".

Xem lại toàn bộ **lộ trình 12 bài** ở [trang chính Animation](../../index.html).

### Cùng nhóm Nghệ thuật — đi tiếp

Animation là một trong ba trụ của nhóm **Nghệ thuật**. Nếu thích cách "một tham số → một cảm nhận thay đổi", hai lĩnh vực chị em cũng dựng theo tinh thần đó:

- 🎵 [**Music**](../../../Music/index.html) — cao độ, nhịp, hòa âm: chuyển động của *âm thanh* theo thời gian (rất gần với timing/spacing bạn vừa học).
- 🎨 [**VisualArt**](../../../VisualArt/index.html) — màu sắc, bố cục, phối cảnh: nền tảng *hình khối tĩnh* mà "Solid Drawing" (nguyên lý #11) dựa vào.

Và [**GameDev**](../../../GameDev/index.html) áp dụng cùng những chuyển động này bằng *vật lý thời gian thực* thay vì vẽ tay.

Minh họa tương tác: [visualization.html](./visualization.html) — bật/tắt từng nguyên lý trên một cú nhảy, đổi pose-to-pose ↔ straight-ahead và spline ↔ stepped, bấm **Play** để tận mắt thấy: tắt hết = cứng máy móc, bật hết = mượt & sống động.
`;
