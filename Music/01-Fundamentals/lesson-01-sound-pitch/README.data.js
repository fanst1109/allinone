// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: Music/01-Fundamentals/lesson-01-sound-pitch/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 01 — Âm thanh & cao độ (Sound & Pitch)

> **Tầng 1 — Fundamentals · Bài 1/8**

Bài mở đầu trả lời câu hỏi gốc rễ nhất của âm nhạc: **một "nốt" thực ra là gì?** Ta sẽ thấy nốt nhạc không phải khái niệm trừu tượng mà là một con số đo được — tần số, tính bằng Hz — và toàn bộ hệ thống 12 nốt của piano hiện đại sinh ra từ một công thức toán đơn giản: \`f = 440·2^(n/12)\`.

## Mục tiêu học tập

Sau bài này, bạn có thể:

- Giải thích âm thanh là sóng áp suất, và cao độ (pitch) tương ứng với tần số (frequency) ra sao.
- Hiểu vì sao octave = gấp đôi tần số và vì sao hai nốt cách nhau 1 octave nghe "giống nhau".
- Tính tần số của bất kỳ nốt nào bằng công thức \`f = 440·2^(n/12)\` (với \`n\` = số nửa cung tính từ A4).
- Đo khoảng cách cao độ bằng **cents** (\`cents = 1200·log₂(f₂/f₁)\`).
- Phân biệt cao độ (pitch) với độ to (loudness) và âm sắc (timbre).

## Kiến thức tiền đề

- Lũy thừa với số mũ hữu tỷ và logarit cơ số 2 → ôn ở [\`Math/01-Arithmetic-Algebra\`](../../../Math/01-Arithmetic-Algebra/).
- Khái niệm sóng và dao động (không bắt buộc) → [\`Physics/01-Mechanics/lesson-08\`](../../../Physics/01-Mechanics/).

---

## 1. Âm thanh là gì?

> 💡 **Trực giác.** Vỗ tay một cái: bàn tay đẩy các phân tử không khí dồn lại thành một vùng "đặc", vùng đặc đó lan ra mọi hướng như gợn sóng khi ném đá xuống ao. Tai bạn cảm nhận những đợt "đặc – loãng" nối tiếp của áp suất không khí — đó chính là âm thanh.

Âm thanh là **sóng áp suất** lan truyền trong môi trường (không khí, nước, kim loại...). Một nguồn rung (dây đàn, màng loa, dây thanh quản) đẩy các phân tử môi trường dao động qua lại quanh vị trí cân bằng, tạo ra các vùng nén (áp suất cao) và giãn (áp suất thấp) xen kẽ.

Hai đại lượng mô tả sóng âm:

- **Tần số (frequency)** \`f\`: số chu kỳ dao động mỗi giây, đơn vị **hertz (Hz)**. \`1 Hz = 1 dao động/giây\`. Tần số quyết định **cao độ** ta nghe được.
- **Biên độ (amplitude)** \`A\`: độ "mạnh" của dao động (áp suất chênh lệch lớn hay nhỏ). Biên độ quyết định **độ to** (loudness), không liên quan đến cao độ.

Tai người nghe được khoảng **20 Hz đến 20 000 Hz** (20 kHz). Dưới 20 Hz là hạ âm (infrasound), trên 20 kHz là siêu âm (ultrasound) — ta không nghe được nhưng nhiều loài vật thì có.

> 📝 **Tóm tắt mục 1.**
> - Âm thanh = sóng áp suất do vật rung tạo ra.
> - Tần số (Hz) = số dao động/giây → quyết định cao độ.
> - Biên độ → quyết định độ to, độc lập với cao độ.
> - Tai người: ~20 Hz – 20 kHz.

---

## 2. Cao độ = tần số

**(a) Là gì.** Cao độ (pitch) là cảm nhận "cao – thấp" của một âm. Về mặt vật lý, cao độ tương ứng trực tiếp với **tần số**: tần số càng lớn → nghe càng "cao"; tần số càng nhỏ → nghe càng "trầm".

**(b) Vì sao cần khái niệm này.** Để nói về âm nhạc một cách chính xác, ta cần một con số thay cho mô tả mơ hồ "cao/thấp". Tần số (Hz) cho phép đo, so sánh và tái tạo chính xác một nốt trên bất kỳ nhạc cụ nào.

**(c) Ví dụ số cụ thể.** Một số tần số tham chiếu (làm tròn):

| Nốt | Tần số | Ghi chú |
|-----|--------|---------|
| A2 | 110 Hz | trầm (dây đàn guitar buông gần trầm nhất) |
| A3 | 220 Hz | |
| **A4** | **440 Hz** | **nốt chuẩn quốc tế** (concert pitch) |
| C4 | 261.63 Hz | "đô giữa" (middle C) |
| A5 | 880 Hz | cao |
| C8 | 4186 Hz | phím cao nhất của piano |

> ⚠ **Lỗi thường gặp: lẫn cao độ với độ to.** Vặn loa to lên *không* làm nốt cao hơn — đó là tăng **biên độ** (to hơn), tần số không đổi nên cao độ giữ nguyên. Tương tự, một nốt trầm vẫn là trầm dù chơi rất mạnh.

> ❓ **Câu hỏi tự nhiên của người đọc.**
> - *"Vì sao chọn đúng 440 Hz cho nốt A?"* — Đây là quy ước (ISO 16, năm 1955); trước đó mỗi dàn nhạc chỉnh khác nhau (415–445 Hz). 440 Hz chỉ là điểm neo được đồng thuận, không "thiêng liêng".
> - *"Nốt cùng tên ở các quãng tám khác nhau có phải cùng tần số?"* — Không. A2, A3, A4, A5 đều tên "A" nhưng tần số khác nhau (110, 220, 440, 880). Vì sao chúng cùng tên → mục 3.

---

## 3. Octave — gấp đôi tần số (tỷ lệ 2:1)

> 💡 **Trực giác.** Hát "Do" thấp rồi "Do" cao — bạn cảm thấy đó là *cùng một nốt* ở hai độ cao khác nhau. Hiện tượng này (gọi là *octave equivalence*) xảy ra vì tần số nốt cao **gấp đúng 2 lần** nốt thấp. Sóng của chúng khớp nhau lại sau mỗi chu kỳ của nốt thấp → tai gộp chúng thành "cùng màu".

**Octave (quãng tám)** là khoảng giữa hai cao độ có tỷ lệ tần số **2:1**. Tăng 1 octave = nhân đôi tần số; giảm 1 octave = chia đôi.

**Ví dụ số (≥ 4):**

- A4 = 440 Hz → A5 = 440 × 2 = **880 Hz** (lên 1 octave).
- A4 = 440 Hz → A3 = 440 ÷ 2 = **220 Hz** (xuống 1 octave).
- A3 = 220 Hz → A2 = 220 ÷ 2 = **110 Hz**.
- C4 = 261.63 Hz → C5 = 261.63 × 2 = **523.25 Hz**.
- C4 = 261.63 Hz → C6 = 261.63 × 2 × 2 = **1046.5 Hz** (lên 2 octave = ×4).

Đây là lý do A2, A3, A4, A5 cùng tên "A": chúng cách nhau các bội số nguyên của octave (×2, ×4...), nên nghe như "cùng một nốt" lặp lại.

> 🔁 **Dừng lại tự kiểm tra.**
> 1. Nốt E4 = 329.63 Hz. E5 là bao nhiêu Hz?
> 2. Một nốt có tần số 100 Hz. Nốt thấp hơn nó 1 octave là bao nhiêu?
>
> <details><summary>Đáp án</summary>
>
> 1. E5 = 329.63 × 2 = **659.26 Hz**.
> 2. 100 ÷ 2 = **50 Hz**.
> </details>

> 📝 **Tóm tắt mục 3.** Octave = tỷ lệ tần số 2:1. Cùng tên nốt ở các octave khác nhau vì tần số là bội ×2 của nhau → tai nghe "tương đương".

---

## 4. Chia octave thành 12 — công thức cao độ

Âm nhạc phương Tây chia mỗi octave thành **12 bước bằng nhau**, gọi là **nửa cung (semitone / half step)**. 12 bước này là 12 nốt: C, C♯, D, D♯, E, F, F♯, G, G♯, A, A♯, B — rồi lặp lại ở octave kế tiếp.

> 💡 **Trực giác: "bằng nhau" theo nghĩa nào?** Không phải bằng nhau về *hiệu* tần số, mà bằng nhau về *tỷ lệ*. Mỗi nửa cung nhân tần số với cùng một hệ số. Vì 12 bước phải nhân lại đúng thành ×2 (một octave), hệ số mỗi bước là \`2^(1/12)\`.

**Hệ số một nửa cung:**

$$r = 2^{1/12} \\approx 1.059463$$

Kiểm chứng: nhân 12 lần \`(2^{1/12})^{12} = 2^{12/12} = 2^1 = 2\` ✓ — đúng bằng một octave.

### Công thức tần số tổng quát

$$f(n) = 440 \\cdot 2^{n/12}$$

trong đó \`n\` = **số nửa cung tính từ A4** (A4 ứng với \`n = 0\`). \`n > 0\` cao hơn A4, \`n < 0\` thấp hơn.

**Walk-through bằng số thật (verify từng nốt):**

| Nốt | \`n\` (nửa cung từ A4) | Tính \`440·2^(n/12)\` | Kết quả |
|-----|:---:|---|:---:|
| A4 | 0 | \`440 · 2^0 = 440 · 1\` | **440.00 Hz** ✓ |
| A♯4 | +1 | \`440 · 2^(1/12) = 440 · 1.05946\` | **466.16 Hz** |
| C5 | +3 | \`440 · 2^(3/12) = 440 · 1.18921\` | **523.25 Hz** ✓ (C5) |
| A5 | +12 | \`440 · 2^(12/12) = 440 · 2\` | **880.00 Hz** ✓ (octave) |
| G4 | −2 | \`440 · 2^(−2/12) = 440 · 0.89090\` | **392.00 Hz** ✓ (G4) |
| E4 | −5 | \`440 · 2^(−5/12) = 440 · 0.74915\` | **329.63 Hz** ✓ (E4) |
| C4 | −9 | \`440 · 2^(−9/12) = 440 · 0.59460\` | **261.63 Hz** ✓ (middle C) |

Bảy giá trị trên khớp với bảng tần số chuẩn ở mục 2 — công thức tự nó tái tạo mọi nốt trên piano.

> ⚠ **Lỗi thường gặp: nghĩ các nốt cách nhau "hiệu" tần số bằng nhau.** Sai. Từ A4→A♯4 chênh \`466.16 − 440 = 26.16 Hz\`, nhưng từ A5→A♯5 chênh \`932.33 − 880 = 52.33 Hz\` — gấp đôi! Khoảng cách *theo Hz* tăng dần khi lên cao, nhưng *tỷ lệ* (×1.05946) thì luôn như nhau. Tai cảm nhận theo tỷ lệ, không theo hiệu.

> ❓ **Câu hỏi tự nhiên của người đọc.**
> - *"Vì sao đúng 12 nốt, không phải 10 hay 19?"* — 12 là con số khiến nhiều quãng *xấp xỉ* các tỷ lệ số nguyên đẹp (quãng 5 ≈ 3:2) rất sát. Ta sẽ phân tích kỹ ở [Tầng 3 — tuning](../../03-Applied-Composition/).
> - *"Trong code/nhạc cụ điện tử có phải tự tính \`2^(n/12)\` không?"* — Thường dùng chuẩn **MIDI**: mỗi nốt là một số nguyên (A4 = 69, C4 = 60), rồi đổi sang Hz bằng \`f = 440·2^((m−69)/12)\`. Bài tập 4 làm rõ.

> 📝 **Tóm tắt mục 4.** 12 nửa cung/octave, mỗi bước ×\`2^(1/12)\`≈1.0595. Tần số bất kỳ nốt nào: \`f = 440·2^(n/12)\`, \`n\` đếm nửa cung từ A4.

---

## 5. Cents — đo cao độ bằng logarit

**(a) Là gì.** **Cent** là đơn vị nhỏ để đo khoảng cách cao độ: **1 nửa cung = 100 cents**, nên **1 octave = 1200 cents**. Công thức đo khoảng giữa hai tần số:

$$\\text{cents} = 1200 \\cdot \\log_2\\!\\left(\\frac{f_2}{f_1}\\right)$$

**(b) Vì sao cần.** Vì tai cảm nhận cao độ theo *tỷ lệ* (logarit), không theo hiệu. Nói "lệch 5 Hz" vô nghĩa nếu không biết đang ở vùng trầm hay cao. Cents chuẩn hóa: "lệch 10 cents" luôn nghe lệch như nhau ở mọi octave. Đây là đơn vị thợ chỉnh đàn và app tuner dùng.

**(c) Ví dụ số cụ thể (≥ 4):**

- 1 octave: \`f₂/f₁ = 880/440 = 2\` → \`1200·log₂(2) = 1200·1 = 1200 cents\` ✓
- 1 nửa cung: \`f₂/f₁ = 466.16/440 = 1.05946\` → \`1200·log₂(1.05946) = 1200·0.08333 = 100 cents\` ✓
- Quãng 5 đúng (equal temperament, 7 nửa cung): \`700 cents\`. Còn quãng 5 "thuần" tỷ lệ 3:2: \`1200·log₂(1.5) = 701.96 cents\` → lệch ≈ **2 cents** (tai khó phân biệt).
- Quãng 3 trưởng equal temperament (4 nửa cung) = \`400 cents\`; quãng 3 thuần 5:4 = \`1200·log₂(1.25) = 386.31 cents\` → lệch ≈ **−13.7 cents** (nghe được rõ — lý do hợp âm trên piano "hơi chua" so với hát bè thuần).

> 🔁 **Dừng lại tự kiểm tra.** Hai tần số 440 Hz và 442 Hz lệch bao nhiêu cents?
> <details><summary>Đáp án</summary>
>
> \`1200·log₂(442/440) = 1200·log₂(1.004545) = 1200·0.006547 = 7.86 cents\`. Lệch ~8 cents — đủ để một tai nhạy nhận ra hai cây đàn "phô" nhau.
> </details>

> 📝 **Tóm tắt mục 5.** Cents = thước logarit cho cao độ. 100 cents = 1 nửa cung, 1200 = 1 octave. \`cents = 1200·log₂(f₂/f₁)\`.

---

## 6. Bài tập

1. **Tính tần số.** Nốt D5 cách A4 \`+5\` nửa cung. Tính tần số D5 theo \`f = 440·2^(n/12)\`.
2. **Đi xuống octave.** Nốt cao nhất piano C8 = 4186 Hz. Hỏi C4 (thấp hơn 4 octave) bao nhiêu Hz? Đối chiếu với bảng mục 2.
3. **Đếm nửa cung ngược.** Một nốt có tần số 392.00 Hz. Hỏi nó cách A4 bao nhiêu nửa cung và là nốt gì?
4. **MIDI → Hz.** Chuẩn MIDI đặt A4 = số 69. Tần số một nốt MIDI \`m\` là \`f = 440·2^((m−69)/12)\`. Tính tần số của MIDI 60 (middle C) và xác nhận đó là C4.
5. **Cents.** Hai dây đàn rung ở 330 Hz và 327 Hz. Chúng lệch nhau bao nhiêu cents?

---

## Lời giải chi tiết

**Bài 1.** \`n = +5\`:
\`f = 440·2^(5/12) = 440·2^(0.41667) = 440·1.33484 = \`**\`587.33 Hz\`**. (Đúng bằng D5 trong bảng tần số chuẩn.)

**Bài 2.** Xuống 4 octave = chia đôi 4 lần = chia cho \`2^4 = 16\`:
\`4186 ÷ 16 = \`**\`261.6 Hz\`** ≈ 261.63 Hz = C4 (middle C) trong bảng mục 2 ✓. Cách tiếp cận: mỗi octave là ×2 về tần số, nên \`n\` octave là ×\`2^n\`; đi xuống thì chia.

**Bài 3.** Giải ngược từ \`392 = 440·2^(n/12)\`:
\`2^(n/12) = 392/440 = 0.89091\` → \`n/12 = log₂(0.89091) = −0.16667\` → \`n = −2\`.
Vậy nốt cách A4 **2 nửa cung xuống**. Đếm xuống từ A: A → G♯ → G. Đó là nốt **G4**. ✓ (khớp bảng mục 4).

**Bài 4.** \`m = 60\`:
\`f = 440·2^((60−69)/12) = 440·2^(−9/12) = 440·2^(−0.75) = 440·0.59460 = \`**\`261.63 Hz\`**.
Đây đúng là tần số C4 (middle C) ở mục 2 → MIDI 60 = C4 ✓. (Ghi nhớ tiện: C4 = 60, A4 = 69, hiệu đúng bằng 9 nửa cung như mục 4.)

**Bài 5.** \`cents = 1200·log₂(330/327) = 1200·log₂(1.009174) = 1200·0.013176 = \`**\`15.8 cents\`**.
Cách tiếp cận: dùng đổi cơ số \`log₂(x) = ln(x)/ln(2)\`. Lệch ~16 cents là khá nhiều — hai dây nghe "phô" rõ, cần chỉnh.

---

## Code & Minh họa

- 🎹 [visualization.html](./visualization.html) — bàn phím piano **bấm ra tiếng** (Web Audio API), máy tính tần số \`f = 440·2^(n/12)\`, bộ trượt tần số hiển thị nốt gần nhất + độ lệch cents, và minh họa octave 2:1. **Bật loa để nghe.**

> Lĩnh vực âm nhạc minh họa tốt nhất bằng âm thanh tương tác nên bài này không kèm \`solutions.go\` — toàn bộ tính toán đã có trong viz và phần lời giải ở trên.

---

## Bài tiếp theo

→ **Lesson 02 — Tên nốt & bàn phím piano**: vì sao có 12 nốt nhưng chỉ 7 tên chữ cái, thăng/giáng hoạt động ra sao, và enharmonic (C♯ = D♭) là gì. *(Đang biên soạn.)*

[⬆ Về tầng Fundamentals](../index.html) · [🏠 Trang chính Music](../../index.html)
`;
