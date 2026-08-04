# Lesson 02 — Nén & Giãn (Squash & Stretch)

> Nguyên tắc **số 1** của hoạt hình: vật sống thì **biến dạng**. Nén dẹt khi va chạm, kéo dài khi lao nhanh — nhưng **thể tích phải giữ nguyên** (rộng × cao ≈ hằng số).

## Mục tiêu học tập

- Hiểu **squash (nén)** và **stretch (giãn)** là gì, xảy ra khi nào (va chạm → nén, tăng tốc → giãn).
- Nắm **luật bảo toàn thể tích**: khi nén dọc thì phình ngang, khi giãn dọc thì thóp ngang, sao cho **rộng × cao ≈ const** — kèm ví dụ số verify.
- Giải thích vì sao **quên bảo toàn thể tích** làm vật trông như "phình to / teo nhỏ" (sai).
- Đọc **độ squash như thước đo độ cứng vật liệu**: bi sắt nén ~0%, bóng cao su nén ~40–50%.

## Kiến thức tiền đề

- [Lesson 01 — Timing & Spacing (Nhịp & Khoảng cách)](../lesson-01-timing-spacing/): *spacing* (khoảng cách giữa các frame) chính là **tốc độ**. Bài này nối tiếp: spacing càng lớn ⇒ vật đi càng nhanh ⇒ càng **stretch** nhiều.
- Chỉ cần số học nhân/chia.

---

## 1. Nguyên tắc #1: vì sao vật phải biến dạng?

> 💡 **Trực giác.** Cầm một quả bóng cao su ném xuống sàn: lúc chạm đất nó **bẹp xuống** một nhịp rồi mới bật lên; lúc lao xuống thật nhanh mắt ta thấy nó **hơi dài ra** theo hướng bay. Không có vật thật nào cứng đơ như viên bi lý tưởng — mọi thứ có khối lượng đều **hấp thụ lực bằng cách đổi hình dạng**. Hoạt hình bắt chước điều đó để nhân vật trông có *sức nặng* và *sự sống*, thay vì như một khối gỗ trượt trên màn hình.

**Squash & Stretch** là nguyên tắc đầu tiên trong 12 nguyên tắc hoạt hình cổ điển (Disney, Frank Thomas & Ollie Johnston). Nó phục vụ 3 mục đích:

1. **Truyền sức nặng và độ cứng** — mức độ biến dạng cho biết vật *mềm hay cứng* (xem mục 4).
2. **Nhấn gia tốc** — vật giãn khi tăng tốc, nén khi phanh/va chạm → cảm giác lực rõ ràng.
3. **Chống "giật hình" (strobing)** — khi vật bay quá nhanh, giữa 2 frame nó "nhảy" một quãng xa và mắt thấy đứt đoạn. Kéo dài vật theo hướng bay giúp **bắc cầu** khoảng trống đó → chuyển động mượt. Đây chính là hệ quả của *spacing lớn = nhanh* đã học ở [Lesson 01](../lesson-01-timing-spacing/).

---

## 2. Squash và Stretch là gì — định nghĩa đầy đủ

### 2.1 Stretch (Giãn)

**(a) Là gì.** Vật **kéo dài ra theo hướng chuyển động** khi đi nhanh / đang tăng tốc. Quả bóng rơi nhanh sẽ dài theo phương thẳng đứng.

**(b) Vì sao cần.** Vừa diễn tả tốc độ (nhanh = dài), vừa chống strobing (bắc cầu giữa các frame). Không stretch → vật nhanh trông "nhảy cóc", cứng và thiếu lực.

**(c) Ví dụ số.** Bóng nghỉ tròn đường kính $D = 60$. Khi bay nhanh, chọn **hệ số giãn dọc** $k = 1.5$:
- Cao $H = D \cdot k = 60 \times 1.5 = 90$.
- Rộng $W = D / k = 60 / 1.5 = 40$ (thóp lại để giữ thể tích).

### 2.2 Squash (Nén)

**(a) Là gì.** Vật **bẹp lại theo hướng va chạm/lực nén** khi chạm đất, bị đè, hoặc dừng đột ngột. Quả bóng lúc tiếp đất bẹp dẹt xuống.

**(b) Vì sao cần.** Diễn tả *cú va chạm* và *sự đàn hồi*: vật hấp thụ lực rồi bật lại. Không squash → cú chạm đất "vô hồn", như hòn đá rơi.

**(c) Ví dụ số.** Cùng bóng $D = 60$. Lúc chạm đất mạnh, $k = 0.5$ (nén còn nửa chiều cao):
- Cao $H = 60 \times 0.5 = 30$.
- Rộng $W = 60 / 0.5 = 120$ (phình ngang gấp đôi).

> 💡 **Nhớ nhanh:** $k > 1$ → **stretch** (cao lên, thon lại). $k < 1$ → **squash** (thấp xuống, bè ra). $k = 1$ → tròn, nghỉ.

---

## 3. Luật bảo toàn thể tích — rộng × cao = hằng số

> 💡 **Trực giác.** Quả bóng làm bằng lượng vật chất cố định. Nắn nó dẹt xuống thì phần vật chất đó phải **tràn ra hai bên** — như nắn một cục đất nặn: ép dẹt thì nó bè ngang ra, kéo dài thì nó thon lại. Tổng "lượng" (thể tích) không tự sinh ra hay mất đi.

Trên màn hình 2D, ta xấp xỉ thể tích bằng **diện tích bóng của vật** — dùng luật gọn:

$$\text{rộng} \times \text{cao} \approx \text{hằng số}$$

Với hệ số giãn dọc $k$ và đường kính nghỉ $D$:

$$H = D \cdot k, \qquad W = \frac{D}{k} \quad\Rightarrow\quad W \times H = \frac{D}{k}\cdot D k = D^2 \; (\text{không phụ thuộc } k)$$

**Ví dụ số — verify $W \times H = D^2 = 60^2 = 3600$** (đủ 5 trường hợp, cả nén lẫn giãn):

| Trạng thái | $k$ | Rộng $W = D/k$ | Cao $H = D\cdot k$ | $W \times H$ |
|------------|:---:|:---:|:---:|:---:|
| Giãn mạnh (bay nhanh) | 1.5 | 40 | 90 | $40 \times 90 = 3600$ ✓ |
| Giãn nhẹ | 1.2 | 50 | 72 | $50 \times 72 = 3600$ ✓ |
| Nghỉ (tròn) | 1.0 | 60 | 60 | $60 \times 60 = 3600$ ✓ |
| Nén nhẹ | 0.75 | 80 | 45 | $80 \times 45 = 3600$ ✓ |
| Nén mạnh (chạm đất) | 0.5 | 120 | 30 | $120 \times 30 = 3600$ ✓ |

Đọc bảng theo chiều dọc: **$H$ tăng thì $W$ giảm đúng bằng tỉ lệ nghịch** — đó là "vật chất tràn ngang khi bị kéo cao, thóp lại khi bị nén thấp".

> ⚠ **Lỗi thường gặp — quên bảo toàn thể tích.** Người mới thường chỉ đổi **một** chiều: nén cho thấp xuống nhưng **quên nới rộng**, hoặc kéo cao lên nhưng **quên thóp lại**. Hậu quả — diện tích đổi → bóng như **phình to** hoặc **teo nhỏ**:
>
> | Sai | $W$ | $H$ | $W \times H$ | Trông ra sao |
> |-----|:---:|:---:|:---:|------|
> | Giãn nhưng giữ nguyên rộng | 60 | 90 | 5400 (+50%) | Bóng **phình to**, như nở ra |
> | Nén nhưng giữ nguyên rộng | 60 | 30 | 1800 (−50%) | Bóng **teo nhỏ**, như xì hơi |
>
> So với chuẩn 3600: cả hai đều đổi "khối lượng" giữa các frame → mắt thấy vật *sai vật lý*. Toggle **Bảo toàn thể tích: TẮT** trong minh họa để thấy tận mắt.

> ❓ **Câu hỏi tự nhiên của người đọc.**
> - *"Sao dùng rộng × cao chứ không phải diện tích hình tròn/ellipse?"* → Vì đây là quy ước làm việc của animator: giữ **khung bao (bounding box)** rộng × cao không đổi là đủ để mắt tin. Diện tích ellipse $\pi \cdot \frac{W}{2}\cdot\frac{H}{2}$ cũng tỉ lệ với $W\times H$, nên kết luận y hệt.
> - *"Thể tích thật (3D) có giữ y như 2D không?"* → Gần đúng. Trong 3D, kéo cao gấp $k$ thì **hai** chiều ngang mỗi chiều thóp $1/\sqrt{k}$ (để $\sqrt{k}\cdot\sqrt{k}\cdot k$... giữ thể tích). Nhưng khi vẽ 2D ta chỉ thấy một mặt, nên luật rộng × cao là xấp xỉ chuẩn và đủ dùng.
> - *"Có phải mọi vật đều squash/stretch?"* → Về nguyên tắc có, nhưng **mức độ** khác nhau tùy vật liệu — xem mục 4.

---

## 4. Độ squash = thước đo độ cứng vật liệu

> 💡 **Trực giác.** Thả một viên **bi sắt** và một quả **bóng cao su** cùng độ cao. Lúc chạm đất: bi sắt gần như không đổi hình (rất cứng), còn bóng cao su bẹp dí rồi bật cao (rất mềm/đàn hồi). **Nén được bao nhiêu = mềm bấy nhiêu.** Chính con số squash "nói" cho khán giả biết vật làm bằng gì mà không cần chú thích.

Gọi **độ nén tối đa lúc chạm đất** là $X$ (phần trăm chiều cao mất đi), khi đó $k = 1 - X$ và rộng nới ra $W = D/k$ (bảo toàn, $D = 60$):

| Vật liệu | Nén $X$ | $k = 1-X$ | Cao $H$ | Rộng $W = D/k$ | $W \times H$ |
|----------|:---:|:---:|:---:|:---:|:---:|
| Bi sắt / thép | ~2% | 0.98 | 58.8 | 61.2 | ≈ 3600 ✓ |
| Nhựa cứng | ~15% | 0.85 | 51.0 | 70.6 | ≈ 3600 ✓ |
| Bóng tennis | ~20% | 0.80 | 48.0 | 75.0 | 3600 ✓ |
| Bóng cao su | ~40% | 0.60 | 36.0 | 100.0 | 3600 ✓ |
| Bóng nước / rất mềm | ~55% | 0.45 | 27.0 | 133.3 | ≈ 3600 ✓ |

Chú ý: **bảo toàn thể tích vẫn giữ nguyên** cho mọi vật liệu — chỉ **biên độ** biến dạng khác nhau. Bi sắt biến dạng ~0 nên nhìn gần như tròn suốt; bóng nước bẹp dí. Trong minh họa, kéo slider **Độ squash** từ trái (bi sắt) sang phải (bóng nước) để thấy cùng một cú nảy nhưng "chất liệu" đổi hẳn.

> 🔁 **Dừng lại tự kiểm tra.**
> 1. Bóng $D = 50$ nén lúc chạm đất còn cao $H = 30$. Rộng $W$ phải là bao nhiêu để bảo toàn thể tích?
> 2. Hai bóng cùng $D$ thả cùng độ cao: bóng A chạm đất cao 49, bóng B chạm đất cao 30. Bóng nào **mềm hơn**? Vì sao?
>
> <details><summary>Đáp án</summary>
>
> 1. $W \times H = D^2 = 2500 \Rightarrow W = 2500 / 30 = 83.3$. (Nén thấp gần nửa nên phải phình ngang rất nhiều.)
> 2. **Bóng B mềm hơn** — nó nén nhiều hơn (mất 40% chiều cao so với 2% của A). Nén càng nhiều = vật liệu càng đàn hồi/mềm.
> </details>

---

## 5. Bài tập

**Bài 1 (cơ bản).** Bóng nghỉ tròn đường kính $D = 40$. Khi bay nhanh nó giãn cao thành $H = 60$. Hỏi chiều rộng $W$ phải bằng bao nhiêu để **bảo toàn thể tích**?

**Bài 2 (nén).** Bóng $D = 48$ chạm đất nén còn cao $H = 24$. Tính $W$ cần thiết để bảo toàn, và verify lại $W \times H$.

**Bài 3 (độ cứng).** Hai bóng cùng đường kính $D = 50$ thả từ cùng độ cao. Lúc chạm đất: bóng A (thép) cao 49, bóng B (cao su) cao 30. Tính $W$ mỗi bóng (bảo toàn), rồi cho biết bóng nào mềm hơn và giải thích.

**Bài 4 (lỗi sai).** Một animator nén bóng $D = 50$ còn **40% chiều cao** nhưng **quên nới rộng** (giữ nguyên $W = 50$). Tính diện tích bóng trước và sau khi nén, phần trăm "thể tích" bị mất, và mô tả bóng trông thế nào. Nếu làm đúng thì $W$ phải là bao nhiêu?

---

## 6. Lời giải chi tiết

**Bài 1.** Cách tiếp cận: bảo toàn nghĩa là $W \times H = D^2$.
- $D^2 = 40 \times 40 = 1600$.
- $W = 1600 / H = 1600 / 60 = \mathbf{26.7}$.
- Kiểm tra: $26.7 \times 60 \approx 1600$ ✓. Bóng cao gấp 1.5 lần thì rộng thóp còn khoảng $2/3$.

**Bài 2.** Cách tiếp cận như trên.
- $D^2 = 48 \times 48 = 2304$.
- $W = 2304 / 24 = \mathbf{96}$.
- Verify: $24 \times 96 = 2304 = 48^2$ ✓. Nén còn nửa chiều cao ($k = 0.5$) thì rộng nở gấp đôi.

**Bài 3.** Cách tiếp cận: tính $W = D^2 / H$ cho từng bóng rồi so biên độ nén.
- $D^2 = 2500$.
- Bóng A: $W_A = 2500 / 49 = \mathbf{51.0}$ — gần như tròn (nén ~2%).
- Bóng B: $W_B = 2500 / 30 = \mathbf{83.3}$ — bè hẳn ra (nén ~40%).
- **Bóng B mềm hơn**: nó biến dạng nhiều hơn hẳn. Độ nén lớn ⇔ vật liệu đàn hồi/mềm; bóng A cứng nên gần như giữ hình tròn.

**Bài 4.** Cách tiếp cận: so diện tích khung bao trước/sau; đúng phải giữ $W \times H$ không đổi.
- Trước (nghỉ): diện tích $= 50 \times 50 = 2500$.
- Sau (sai — nén 40% chiều cao, $H = 50 \times 0.6 = 30$, giữ $W = 50$): diện tích $= 50 \times 30 = 1500$.
- Mất $(2500 - 1500)/2500 = \mathbf{40\%}$ "thể tích". Bóng trông như **xì hơi / teo nhỏ** — mất khối lượng giữa các frame, sai vật lý.
- Làm đúng: giữ $W \times H = 2500 \Rightarrow W = 2500 / 30 = \mathbf{83.3}$ (phình ngang bù lại). Khi đó diện tích trở về 2500, bóng chỉ *đổi hình dạng* chứ không *đổi khối lượng*.

> 📝 **Tóm tắt bài học.**
> - **Squash** (nén, $k<1$: thấp & bè) khi va chạm; **Stretch** (giãn, $k>1$: cao & thon) khi tăng tốc — nguyên tắc #1 tạo sức nặng, nhấn lực, chống strobing.
> - **Bảo toàn thể tích**: $W = D/k,\ H = D\cdot k \Rightarrow W \times H = D^2$ luôn không đổi. Nén dọc ⇒ phình ngang, và ngược lại.
> - **Quên bảo toàn** ⇒ diện tích đổi ⇒ bóng "phình to / teo nhỏ", sai vật lý.
> - **Biên độ squash = độ cứng vật liệu**: bi sắt ~2%, bóng cao su ~40–50%. Luật bảo toàn không đổi, chỉ biên độ đổi.

---

## Bài tiếp theo

**[Lesson 03 — Lấy đà & Quán tính (Anticipation & Follow-through)](../lesson-03-anticipation-followthrough/)**: trước khi bung một chuyển động lớn, nhân vật *lấy đà* ngược lại; sau khi dừng, các bộ phận vẫn *trôi theo quán tính* — cặp nguyên tắc làm động tác đáng tin.

Minh họa tương tác: [visualization.html](./visualization.html) — quả bóng nảy squash khi chạm đất, stretch khi bay nhanh; chỉnh **độ squash** và bật/tắt **bảo toàn thể tích** để thấy khác biệt.
