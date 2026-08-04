// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: Animation/01-Principles/lesson-03-anticipation-followthrough/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 03 — Lấy đà & Quán tính (Anticipation & Follow-through)

> Hai nguyên tắc "đóng khung" một hành động: **lấy đà (anticipation)** báo trước và tích lực *trước* khi hành động; **quán tính/nối tiếp (follow-through)** giải phóng lực đó *sau* khi hành động chính đã xong. Thiếu chúng, chuyển động trông như bị "cắt dán" — bật ra và tắt phụt.

## Mục tiêu học tập

- Định nghĩa được **anticipation** và biết đặt nó vào đâu trong một hành động (đá, ném, nhảy, đấm).
- Định nghĩa được **follow-through** và **overlapping action (chuyển động chồng lấn)**, phân biệt hai khái niệm gần nhau này.
- Nắm cơ chế **overshoot → settle (vọt quá → lắng lại)** khi một vật dừng, mô hình hoá bằng dao động tắt dần.
- Dựng được **timing bằng số frame cụ thể** cho một cú nhảy ở 24fps: bao nhiêu frame lấy đà, bao nhiêu frame nối tiếp.

## Kiến thức tiền đề

- **Lesson 01 — Timing & Spacing**: khoảng cách giữa các frame quyết định cảm giác nhanh/chậm. Lấy đà và nối tiếp *chính là* thao tác trên spacing.
- **Lesson 02 — Squash & Stretch** ([../lesson-02-squash-stretch/](../lesson-02-squash-stretch/)): khi khuỵu gối lấy đà, cơ thể **squash**; khi bật lên, cơ thể **stretch**. Hai nguyên tắc ăn khớp nhau.

---

## 1. Bức tranh lớn — vì sao chuyển động "thẳng đơ" trông sai

> 💡 **Trực giác.** Hình dung bạn sắp ném một quả bóng thật xa. Cơ thể bạn có tự nhiên bổ nhào thẳng tay ra trước không? Không. Bạn **kéo tay ra sau** (lấy đà), rồi mới quăng. Và sau khi bóng rời tay, cánh tay bạn **không phanh khựng** ngay — nó **vung tiếp qua thân người** rồi mới chậm lại (nối tiếp). Đời thực đầy hai pha này vì cơ thể có **khối lượng**, và khối lượng thì không thể tăng tốc hay dừng lại tức thời.

Một chuyển động do người mới làm thường trông "giả" vì nó vi phạm đúng hai điều trên:

- **Không có pha ngược trước hành động** → hành động *nổ ra từ hư không*. Mắt người xem chưa kịp chuẩn bị đã thấy nó kết thúc → khó **đọc (readability)**.
- **Không có pha lắng sau hành động** → vật *dừng phụt như tắt công tắc*. Không vật thật nào có khối lượng lại dừng kiểu đó.

> Cả hai nguyên tắc đều là hệ quả của một sự thật vật lý: **vật có khối lượng cần thời gian để đổi vận tốc**. Lấy đà là "lấy trớn để tăng tốc", nối tiếp là "chạy trớn để giảm tốc". Chúng ta không mô phỏng vật lý chính xác — ta **cường điệu** nó vừa đủ để mắt tin.

> ❓ **Câu hỏi tự nhiên của người đọc.**
> - *"Đây là hai nguyên tắc hay một?"* → Hai nguyên tắc riêng trong "12 nguyên tắc hoạt hình" của Disney, nhưng luôn đi cặp: một cái mở đầu, một cái kết thúc cùng một hành động. Học chung một bài vì chúng đối xứng nhau qua "hành động chính".
> - *"Có phải chuyển động nào cũng cần cả hai?"* → Không. Một cái liếc mắt nhẹ gần như không cần. Nhưng mọi hành động **dứt khoát, có lực** (đấm, nhảy, đá, vung kiếm) đều cần — càng mạnh càng cần cường điệu.

📝 **Tóm tắt mục 1.**
- Chuyển động "giả" thường thiếu pha *trước* (lấy đà) và pha *sau* (lắng lại).
- Gốc rễ là vật lý: khối lượng không đổi vận tốc tức thời.
- Hoạt hình **cường điệu** hai pha đó cho dễ đọc và đáng tin.

---

## 2. Anticipation — Lấy đà

**(a) Là gì.** Một **chuyển động ngược chiều, biên độ nhỏ**, đặt *ngay trước* hành động chính. Trước khi nhảy lên → khuỵu gối xuống. Trước khi ném về phía trước → kéo tay ra sau. Trước khi chạy sang phải → nghiêng người sang trái một nhịp.

**(b) Vì sao cần.** Hai lý do tách bạch:
1. **Báo trước cho người xem (telegraph).** Pha ngược làm mắt biết "sắp có gì đó xảy ra và xảy ra ở đâu". Không có nó, hành động chính đến quá bất ngờ, người xem *bỏ lỡ* — kém readability.
2. **Tích lực (windup).** Kéo dãn cơ/lò xo trước khi bung. Càng lấy đà sâu, hành động chính bung ra càng nhìn mạnh.

**(c) Ví dụ số cụ thể** (≥ 4, đa dạng — quy chiếu ở **24fps**, tức 1 frame ≈ 42ms):

| Hành động chính | Pha lấy đà (ngược) | Frame lấy đà | Frame hành động | Tỷ lệ đà : hành động |
|-----------------|--------------------|-------------:|----------------:|:--------------------:|
| Nhảy lên cao | Khuỵu gối, hạ hông ~24px xuống | 5 | 4 | ~1.25 : 1 |
| Ném bóng về trước | Kéo cẳng tay ra sau ~40° | 6 | 2 | 3 : 1 |
| Đấm thẳng | Rút vai + nắm đấm về sau ~30px | 3 | 1 | 3 : 1 |
| Nhân vật phóng chạy | Co người, nghiêng về sau 1 nhịp | 4 | 3 | ~1.3 : 1 |

Đọc bảng: hành động càng **nhanh và bùng nổ** (đấm, ném) thì pha lấy đà càng *dài tương đối* so với chính hành động — vì cú đấm chỉ vài frame, phải có đà đủ để mắt kịp đăng ký. Cú nhảy chậm hơn nên tỷ lệ cân bằng hơn.

> ⚠ **Lỗi thường gặp.** *"Lấy đà cùng chiều với hành động cho nhanh."* **Sai** — lấy đà phải **ngược chiều**. Muốn nhân vật lao lên thì trước hết cho nó *xuống*; muốn ném ra trước thì kéo *ra sau*. Nếu pha chuẩn bị cùng chiều, nó không còn là "lấy đà" mà chỉ là kéo dài hành động → mất hiệu ứng bung.

> ⚠ **Lỗi thường gặp #2.** Lấy đà **quá lâu** cho một hành động nhỏ → nhân vật trông do dự, "diễn lố". Đà phải **tỷ lệ** với lực của hành động: liếc mắt cần 1 frame đà, cú nhảy xa cần 5–6 frame.

> 🔁 **Dừng lại tự kiểm tra.**
> 1. Nhân vật sắp **đá bóng sang phải**. Pha lấy đà nên di chuyển chân theo hướng nào?
> 2. Ở 24fps, một cú vung búa mạnh nên có pha lấy đà khoảng bao nhiêu frame để mắt kịp đọc — 1 hay 5?
>
> <details><summary>Đáp án</summary>
>
> 1. Kéo chân **ra sau (sang trái)** rồi mới đá sang phải — ngược chiều hành động.
> 2. Khoảng **5 frame** (≈0.2s). 1 frame quá nhanh, người xem không kịp thấy pha chuẩn bị → cú vung "nổ ra từ hư không".
> </details>

📝 **Tóm tắt mục 2.**
- Anticipation = chuyển động **ngược chiều, nhỏ**, đặt **trước** hành động chính.
- Hai công dụng: **báo trước** (readability) + **tích lực** (windup).
- Ngược chiều, và **tỷ lệ** với độ mạnh của hành động; đừng diễn lố.

---

## 3. Follow-through & Overlapping action — Quán tính & Nối tiếp

Đây là "đầu bên kia" của hành động: cái gì xảy ra *sau* khi phần chính đã đạt đích.

### 3.1 Follow-through (nối tiếp / quán tính)

**(a) Là gì.** Các bộ phận **tiếp tục chuyển động** theo quán tính sau khi lực chính đã ngừng, gồm hai biểu hiện:
- **Overshoot rồi settle (vọt quá rồi lắng lại):** phần chính không dừng đúng vị trí đích ngay lần đầu — nó *vọt quá* một chút rồi dao động tắt dần về đích. Nhân vật phanh gấp → thân người *chúi tới trước* rồi bật lại.
- **Trailing parts (phần phụ bị kéo theo):** tóc, áo choàng, đuôi, tai thỏ... tiếp tục bay khi cơ thể đã dừng.

**(b) Vì sao cần.** Cùng lý do vật lý với lấy đà, nhưng ở pha giảm tốc: khối lượng cần **thời gian để dừng**. Cắt phụt = vật không có khối lượng = trông giả. Follow-through "trả lại" động lượng cho mắt.

### 3.2 Overlapping action (chuyển động chồng lấn)

**(a) Là gì.** Các bộ phận khác nhau **không đạt đích cùng lúc** — chúng lệch pha nhau. Khi thân người đã dừng, cánh tay còn đang tới; khi tay dừng, bàn tay và ngón còn theo sau.

**(b) Phân biệt với follow-through.** Đây là chỗ hay nhầm:
- **Follow-through**: một bộ phận **tiếp tục** sau khi lực ngừng (chiều thời gian: *sau*).
- **Overlapping**: nhiều bộ phận **lệch pha** với nhau (chiều không gian/cơ thể: *bộ phận này chậm hơn bộ phận kia*).

Chúng thường xuất hiện cùng nhau nên gộp một bài, nhưng là hai ý riêng.

**(c) Ví dụ số cụ thể** (≥ 4):

| Tình huống | Bộ phận chính | Phần nối tiếp / chồng lấn | Độ trễ / overshoot |
|------------|---------------|---------------------------|--------------------|
| Ném bóng xong | Cánh tay dừng vung | Bàn tay + cổ tay vung tiếp qua thân | trễ ~3 frame |
| Nhân vật phanh gấp khi chạy | Chân dừng | Thân **chúi tới** rồi bật lại | overshoot ~12% biên độ, lắng trong ~4 frame |
| Quay đầu nhìn nhanh | Đầu dừng ở hướng mới | Đuôi tóc / khăn quàng đuổi theo | trễ ~4–5 frame |
| Đáp đất sau cú nhảy | Thân chạm đất, squash | Thân **nảy lên** overshoot rồi settle; ăng-ten/tóc dao động | overshoot ~14px rồi tắt dần |

**Cơ chế overshoot → settle bằng số.** Mô hình một phần dừng lại như **dao động tắt dần**:

$$y(f) = A\\,e^{-k f}\\cos(\\omega f)$$

trong đó $f$ là số frame tính từ lúc chạm đích, $A$ là biên độ vọt đầu tiên, $k$ là hệ số tắt. Đặc điểm dễ dùng tay: **mỗi lần vọt qua chỉ bằng ~35% lần trước** (ratio ≈ 0.35). Ví dụ với $A = 14$px:

- Vọt lần 1 (lên): **+14px**
- Vọt lần 2 (xuống): $0.35 \\times 14 = \\mathbf{-4.9 \\approx -5}$px ✓
- Vọt lần 3 (lên): $0.35 \\times 5 = \\mathbf{+1.75 \\approx +2}$px ✓
- Lắng về **0** sau đó.

Chuỗi 14 → −5 → +2 → 0 gói gọn trong ~4 frame chính là "cảm giác nảy rồi đứng yên" mà mắt tin. Đây là lý do một vật dừng đẹp **không bao giờ** dừng ở đúng vị trí ngay frame đầu.

> ❓ **Câu hỏi tự nhiên của người đọc.**
> - *"Overshoot bao nhiêu là đủ?"* → Thường 10–15% biên độ hành động cho vật cứng (thân người phanh gấp); vật mềm/nhẹ (tóc, vải) vọt nhiều hơn và lắng lâu hơn.
> - *"Vật nặng và vật nhẹ nối tiếp khác nhau chỗ nào?"* → Vật nặng: overshoot nhỏ, tắt nhanh ($k$ lớn). Vật nhẹ/lỏng: overshoot lớn, dao động nhiều nhịp mới tắt ($k$ nhỏ). Cùng công thức, đổi $A$ và $k$.
> - *"Tại sao tóc lại trễ so với đầu?"* → Tóc không được cơ điều khiển trực tiếp; nó chỉ bị kéo theo qua chân tóc → luôn **đến sau** — đó chính là overlapping.

> ⚠ **Lỗi thường gặp.** Cho **mọi bộ phận dừng cùng một frame**. Kết quả: nhân vật "đóng băng" cứng đơ. Đúng ra thân dừng trước, tay dừng sau vài frame, tóc dừng sau cùng — mỗi lớp lệch nhau vài frame.

> 🔁 **Dừng lại tự kiểm tra.**
> 1. Một vật phanh gấp với overshoot đầu $A = 20$px, ratio 0.35. Ba lần vọt đầu là bao nhiêu?
> 2. Đâu là follow-through, đâu là overlapping: (i) áo choàng bay tiếp khi người đã đứng yên; (ii) tay dừng sau thân 3 frame?
>
> <details><summary>Đáp án</summary>
>
> 1. $20 \\to 0.35\\times20=7 \\to 0.35\\times7=2.45\\approx2.5$px → chuỗi **20 → −7 → +2.5 → 0**.
> 2. (i) là **follow-through** (một bộ phận tiếp tục sau khi lực ngừng); (ii) là **overlapping** (hai bộ phận lệch pha nhau). Câu (i) cũng mang tính chồng lấn với thân, nhưng điểm nhấn "tiếp tục sau khi dừng" là follow-through.
> </details>

📝 **Tóm tắt mục 3.**
- **Follow-through**: bộ phận tiếp tục sau khi lực ngừng → **overshoot rồi settle**, và phần phụ (tóc/vải) bay tiếp.
- **Overlapping**: các bộ phận **lệch pha**, không dừng cùng lúc.
- Overshoot mô hình bằng **dao động tắt dần**, ratio ~0.35/lần vọt; vật nặng tắt nhanh, vật nhẹ tắt chậm.

---

## 4. Walk-through bằng số — dựng timing một cú nhảy ở 24fps

Gộp cả ba nguyên tắc (lấy đà + squash/stretch từ [Lesson 02](../lesson-02-squash-stretch/) + nối tiếp) vào **một chu kỳ nhảy 30 frame**. Quy ước: $y$ = độ cao tâm thân so với tư thế đứng (mặt đất tham chiếu 0, lên là dương).

| Pha | Frame | $y$ (px) | Ghi chú |
|-----|:-----:|---------:|---------|
| **Lấy đà** | 1 | −6 | bắt đầu khuỵu, squash nhẹ |
| | 3 | −18 | hạ hông sâu hơn |
| | 5 | −24 | **sâu nhất** — tích lực, thân bè ra (squash) |
| **Bật lên** | 6 | −10 | duỗi chân, thân kéo dài (stretch) |
| | 8 | +48 | tăng tốc, spacing lớn |
| | 11 | +104 | vẫn lên nhưng chậm dần |
| | 14 | +130 | **đỉnh** — spacing nhỏ nhất (treo) |
| **Rơi** | 17 | +96 | rơi, spacing tăng dần (nhanh dần) |
| | 20 | +40 | |
| | 22 | 0 | chạm đất |
| **Tiếp đất** | 23 | −10 | **squash** ép xuống khi chạm |
| **Nối tiếp** | 25 | **+14** | thân **vọt quá** (overshoot lên) |
| | 27 | **−5** | vọt ngược (−0.35×14) |
| | 29 | **+2** | vọt lần 3 (0.35×5) |
| | 30 | 0 | **lắng** về tư thế đứng |

Ba nhận xét nối vào các bài khác:
- **Spacing ở đỉnh nhỏ nhất** (frame 11→14 chỉ +26px trong 3 frame) tạo cảm giác *treo lơ lửng* — đây là "ease" quanh đỉnh, sẽ học kỹ ở [Lesson 04 — Ease In/Out](../lesson-04-ease-in-out/).
- **Frame 5 sâu nhất của đà** dùng chung cơ chế squash với [Lesson 02](../lesson-02-squash-stretch/): khuỵu → bè ngang; bật → kéo dọc.
- **Frame 25–30** là follow-through: chuỗi overshoot **14 → −5 → +2 → 0** đúng ratio 0.35 đã tính ở mục 3.

> 💡 **Trực giác về spacing.** Số frame không đổi (30), nhưng *khoảng cách giữa các frame* thay đổi tạo toàn bộ cảm giác: đà xuống chậm, bật lên nhanh, treo ở đỉnh, rơi nhanh dần, rồi rung lắng. Hoạt hình là nghệ thuật **phân bố khoảng cách theo thời gian**.

---

## 5. Bài tập

**Bài 1 (nhận diện).** Với mỗi mô tả, cho biết nó minh hoạ **anticipation**, **follow-through**, hay **overlapping action**:
- (a) Trước khi con mèo phóng đi, nó rùn thấp người xuống một nhịp.
- (b) Cô gái quay đầu nhìn nhanh sang trái; đuôi tóc đuổi theo và đến muộn 4 frame.
- (c) Vận động viên ném lao; sau khi lao rời tay, cả cánh tay tiếp tục vung xuống qua hông.
- (d) Nhân vật đang chạy thì phanh gấp, thân chúi tới trước rồi bật ngược lại vài nhịp mới đứng yên.

**Bài 2 (timing).** Ở **24fps**, thiết kế một cú **đấm thẳng** dứt khoát gồm: lấy đà + tiếp xúc (contact) + nối tiếp. Cho: lấy đà 3 frame, tiếp xúc 1 frame, nối tiếp (tay vung tiếp rồi thu về) 4 frame.
- (a) Tổng cú đấm dài bao nhiêu frame? Bao nhiêu giây?
- (b) Nếu muốn cú đấm trông **nặng và mạnh hơn**, nên tăng hay giảm frame lấy đà? Vì sao?

**Bài 3 (overshoot bằng số).** Một cánh cửa bị đẩy mạnh, đóng sập vào khung rồi rung. Overshoot lần đầu $A = 24$px, ratio mỗi lần vọt = 0.35.
- (a) Tính ba lần vọt đầu tiên (kèm dấu).
- (b) Sau bao nhiêu lần vọt thì biên độ còn dưới 1px (coi như đã lắng)?

**Bài 4 (vận dụng / sửa lỗi).** Một bạn mới làm animation cho quả bóng nảy: bóng đang bay ngang thì **dừng phựt tại chỗ** đúng một frame, không đà không lắng. Chỉ ra **hai nguyên tắc** đang thiếu và mô tả cụ thể phải thêm gì (kèm hướng và số frame gợi ý).

---

## 6. Lời giải chi tiết

**Bài 1.**
- (a) **Anticipation** — chuyển động ngược (rùn thấp) *trước* hành động chính (phóng đi).
- (b) **Overlapping action** — đuôi tóc lệch pha, đến sau đầu 4 frame.
- (c) **Follow-through** — cánh tay tiếp tục vung *sau* khi lực ném đã ngừng.
- (d) **Follow-through** (dạng overshoot → settle) — thân vọt quá vị trí dừng rồi dao động tắt dần. (Nếu tay/tóc còn lệch pha với thân thì đồng thời có overlapping.)

**Bài 2.**
- (a) Cách tiếp cận: cộng frame ba pha. Tổng $= 3 + 1 + 4 = \\mathbf{8}$ frame. Ở 24fps: $8 / 24 = 0.33\\overline{3}$s $\\approx \\mathbf{0.33}$s (một phần ba giây).
- (b) **Tăng** frame lấy đà (ví dụ 3 → 5). Lý do: pha lấy đà dài hơn = tích lực nhiều hơn và cho mắt thêm thời gian đăng ký sức nặng → cú đấm bung ra trông mạnh và "nặng" hơn. (Kèm theo có thể tăng squash/stretch ở contact.) Ngược lại, cắt ngắn đà làm cú đấm nhẹ, "hụt".

**Bài 3.** Dùng ratio 0.35 (verify cả hai vế mỗi bước):
- (a)
  - Vọt 1: **+24**px.
  - Vọt 2: $0.35 \\times 24 = 8.4$px → **−8.4** (ngược chiều).
  - Vọt 3: $0.35 \\times 8.4 = 2.94$px → **+2.94 ≈ +3**.
  - Chuỗi: **24 → −8.4 → +3 → …**
- (b) Tìm $n$ sao cho $24 \\times 0.35^{\\,n} < 1$.
  - $n=1: 24\\times0.35 = 8.4$
  - $n=2: 8.4\\times0.35 = 2.94$
  - $n=3: 2.94\\times0.35 = 1.03$ (vẫn ≥ 1)
  - $n=4: 1.03\\times0.35 = 0.36 < 1$ ✓
  - Vậy sau **4 lần vọt** biên độ tụt xuống dưới 1px → coi như đã lắng.

**Bài 4.** Đang thiếu **anticipation** và **follow-through**.
- Thiếu **anticipation**: bóng đổi hướng/dừng mà không có pha chuẩn bị. Thêm: trước khi dừng, có thể cho bóng **squash nhẹ theo hướng đang bay** 1–2 frame báo hiệu sắp phanh (với vật thật thì thường là lấy đà cho *bật lại*, không cho *dừng chết*).
- Thiếu **follow-through (overshoot → settle)**: quả bóng có khối lượng không thể dừng phựt. Thêm: khi chạm đích, cho bóng **squash** khi ép vào (1 frame), rồi **overshoot** dao động tắt dần — ví dụ biến dạng/vị trí vọt **+8 → −3 → +1 → 0** trong ~4 frame (ratio ~0.35). Nếu bóng lăn tới rồi dừng thì vẫn nên trườn thêm chút quán tính chứ không dừng ở đúng frame chạm.
- Kết quả: từ "tắt công tắc" thành một cú dừng có sức nặng, đọc được.

> 📝 **Tóm tắt bài học.**
> - **Anticipation** (lấy đà): pha **ngược chiều, nhỏ, trước** hành động → báo trước + tích lực. Tỷ lệ với độ mạnh.
> - **Follow-through** (nối tiếp): sau hành động, phần chính **overshoot rồi settle**; phần phụ (tóc/vải) bay tiếp.
> - **Overlapping**: các bộ phận **lệch pha**, không dừng cùng lúc.
> - Overshoot ≈ **dao động tắt dần**, ratio ~0.35/lần vọt; vật nặng tắt nhanh, vật nhẹ tắt chậm.
> - Ở 24fps: cú nhảy điển hình ~5 frame đà, ~4 frame lắng — cái gì cũng phải có "vào" và "ra".

---

## Bài tiếp theo

**[Lesson 04 — Ease In/Out (Slow In & Slow Out)](../lesson-04-ease-in-out/)**: vì sao spacing dày ở giữa, thưa ở hai đầu làm chuyển động "có gia tốc". Cảm giác *treo ở đỉnh* trong cú nhảy của bài này chính là ease quanh điểm dừng — bài sau mổ xẻ đúng cơ chế đó.

Minh hoạ tương tác: [visualization.html](./visualization.html) — chạy hai nhân vật nhảy **cạnh nhau**, bật/tắt riêng **lấy đà** và **nối tiếp** để thấy trực tiếp hành động trở nên dễ đọc và tự nhiên hơn thế nào.
`;
