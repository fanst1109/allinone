// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: Music/01-Fundamentals/lesson-04-intervals/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 04 — Quãng (Intervals)

> **Tầng 1 — Fundamentals · Bài 4/8**

Nếu cao độ là "vị trí" của một nốt trên thang âm, thì **quãng (interval)** là "khoảng cách" giữa hai vị trí đó. Quãng là ngôn ngữ cơ bản để mô tả giai điệu và hợp âm: bài này trả lời câu hỏi — khi nói "C lên E là quãng 3 trưởng", con số **3** và chữ **trưởng** có nghĩa chính xác là gì, tính từ đâu, và vì sao một số quãng nghe "thuận" còn số khác nghe "căng thẳng"?

## Mục tiêu học tập

Sau bài này, bạn có thể:

- Xác định **số** của một quãng bằng cách đếm tên chữ cái (bao gồm cả hai đầu).
- Tính **số nửa cung** của 13 loại quãng trong một octave.
- Phân biệt chất **đúng / trưởng / thứ / tăng / giảm** và quy tắc biến đổi chất.
- Giải thích vì sao một số quãng nghe **thuận** (consonant) và số khác nghe **nghịch** (dissonant) qua tỷ lệ tần số đơn giản.
- Thực hiện phép **đảo quãng** (inversion): đổi số và đổi chất.

## Kiến thức tiền đề

- Tên 12 nốt, thăng/giáng, enharmonic → [Lesson 02 — Tên nốt & bàn phím](../lesson-02-note-names/).
- Khuông nhạc, khóa Sol, vị trí nốt trên dòng/khe → [Lesson 03 — Khuông nhạc & ký hiệu](../lesson-03-staff-notation/).
- Tần số, octave (tỷ lệ 2:1), công thức \`f = 440·2^(n/12)\`, cents → [Lesson 01 — Âm thanh & cao độ](../lesson-01-sound-pitch/).

---

## 1. Quãng là gì?

> 💡 **Trực giác.** Hãy hình dung thang âm như một cái thang. Mỗi bậc thang là một nốt. "Quãng" đơn giản là: bạn đứng ở bậc nào, và bước lên (hay xuống) bao nhiêu bậc? Nếu đứng ở bậc C và lên 3 bậc (C → D → E), bạn vừa bước qua một **quãng 3**. Con số 3 đếm cả điểm xuất phát lẫn điểm đến.

**Quãng (interval)** là khoảng cách cao độ giữa hai nốt, được mô tả bằng hai thành phần:

1. **Số (number / size)**: đếm tên chữ cái từ nốt thấp đến nốt cao, **tính cả hai đầu**. Ví dụ C→E: đếm C(1)–D(2)–E(3) → **quãng 3**.
2. **Chất (quality)**: phân biệt các quãng cùng số nhưng số nửa cung khác nhau — trưởng, thứ, đúng, tăng, giảm.

> ⚠ **Lỗi thường gặp — quên tính cả hai đầu.** Nhiều người đếm C→E là "2 bước" (C→D rồi D→E) nên kết luận là quãng 2. Đúng phải là: đếm TÊN nốt bao gồm điểm đầu: C=1, D=2, E=3 → **quãng 3**. Quy tắc: "Số quãng = số chữ cái xuất hiện trong chuỗi đếm."

**4 ví dụ đếm số quãng:**

| Từ | Đến | Chuỗi đếm | Số quãng |
|----|-----|-----------|----------|
| C | G | C(1)–D(2)–E(3)–F(4)–G(5) | **5** |
| D | F | D(1)–E(2)–F(3) | **3** |
| E | B | E(1)–F(2)–G(3)–A(4)–B(5) | **5** |
| G | G (cao hơn) | G(1)–A(2)–B(3)–C(4)–D(5)–E(6)–F(7)–G(8) | **8** |

> ❓ **Câu hỏi tự nhiên của người đọc.**
> - *"Vì sao đếm cả điểm đầu? Nghe có vẻ tùy tiện."* — Đây là quy ước lịch sử từ thời Trung Cổ — người ta đếm theo nhịp "do-re-mi-fa-sol" (1-2-3-4-5), bắt đầu bằng "do = 1". Khác với đếm khoảng cách kiến trúc. Nhờ quy ước này, tên quãng khớp với tên bậc thang âm (quãng 3 = bậc 3 của gam).
> - *"Thăng/giáng có ảnh hưởng đến số quãng không?"* — **Không.** C→E và C→E♭ đều là quãng 3 (cùng số chữ cái). Thăng/giáng chỉ thay đổi **chất** (trưởng → thứ), không thay đổi số.

> 📝 **Tóm tắt mục 1.** Quãng = khoảng cách cao độ. Số quãng = đếm tên nốt bao gồm cả hai đầu. Thăng/giáng không ảnh hưởng số quãng.

---

## 2. Số nửa cung và chất của quãng

### 2.1 Bảng 13 quãng trong một octave

> 💡 **Trực giác.** Một octave có 12 nửa cung. Từ C4 lên C5, ta có thể "dừng lại" ở 12 vị trí khác nhau — mỗi vị trí là một loại quãng khác nhau cả về "bước đếm tên chữ cái" lẫn "âm thanh". Cộng thêm quãng 1 (hai nốt giống nhau), ta có tổng cộng 13 loại.

| Tên quãng | Ký hiệu | Số nửa cung | Ví dụ (từ C) |
|-----------|---------|:-----------:|--------------|
| Quãng 1 đúng (Unison) | P1 | 0 | C–C |
| Quãng 2 thứ (Minor 2nd) | m2 | 1 | C–D♭ |
| Quãng 2 trưởng (Major 2nd) | M2 | 2 | C–D |
| Quãng 3 thứ (Minor 3rd) | m3 | 3 | C–E♭ |
| Quãng 3 trưởng (Major 3rd) | M3 | 4 | C–E |
| Quãng 4 đúng (Perfect 4th) | P4 | 5 | C–F |
| Quãng tăng 4 / giảm 5 (Tritone) | A4/d5 | 6 | C–F♯ |
| Quãng 5 đúng (Perfect 5th) | P5 | 7 | C–G |
| Quãng 6 thứ (Minor 6th) | m6 | 8 | C–A♭ |
| Quãng 6 trưởng (Major 6th) | M6 | 9 | C–A |
| Quãng 7 thứ (Minor 7th) | m7 | 10 | C–B♭ |
| Quãng 7 trưởng (Major 7th) | M7 | 11 | C–B |
| Quãng 8 đúng (Octave) | P8 | 12 | C–C' |

**Walk-through 4 ví dụ — tính số nửa cung thực tế:**

1. **C → E (M3):** C→C♯(1)→D(2)→D♯(3)→E(4) = **4 nửa cung** ✓
2. **C → G (P5):** C→C♯(1)→D(2)→D♯(3)→E(4)→F(5)→F♯(6)→G(7) = **7 nửa cung** ✓
3. **D → F (m3):** D→D♯(1)→E(2)→F(3) = **3 nửa cung** ✓
4. **G → D' (P5 từ G):** G→G♯(1)→A(2)→A♯(3)→B(4)→C(5)→C♯(6)→D(7) = **7 nửa cung** ✓

### 2.2 Quy tắc chất: Đúng, Trưởng, Thứ, Tăng, Giảm

Quãng 1, 4, 5, 8 chỉ có dạng **đúng (perfect)** — không có "trưởng" hay "thứ". Quãng 2, 3, 6, 7 có dạng **trưởng (major)** và **thứ (minor)**.

Biến đổi chất bằng cách thay đổi số nửa cung:

| Biến đổi | Công thức | Ví dụ |
|----------|-----------|-------|
| Đúng + 1 nửa cung | → Tăng (Augmented, A) | P5 + 1 = A5 (8 nửa cung) |
| Đúng − 1 nửa cung | → Giảm (Diminished, d) | P5 − 1 = d5 (6 nửa cung = tritone) |
| Trưởng + 1 nửa cung | → Tăng (A) | M3 + 1 = A3 (5 nửa cung) |
| Trưởng − 1 nửa cung | → Thứ (m) | M3 − 1 = m3 (3 nửa cung) |
| Thứ − 1 nửa cung | → Giảm (d) | m3 − 1 = d3 (2 nửa cung) |

> ⚠ **Lỗi thường gặp — nhầm "tăng" với "trưởng".** Quãng tăng 4 (A4, 6 nửa cung) và quãng 4 trưởng là hai thứ KHÁC NHAU — thực ra không có "quãng 4 trưởng"; quãng 4 chỉ có đúng (5 nửa cung) và tăng (6) hoặc giảm (4). Quy tắc: số 1, 4, 5, 8 không dùng "trưởng/thứ"; số 2, 3, 6, 7 không dùng "đúng".

> ❓ **Câu hỏi tự nhiên của người đọc.**
> - *"Tritone là gì và vì sao có tên đặc biệt?"* — Tritone = 3 cung (whole tones) = 6 nửa cung, nằm đúng giữa octave. Nó vừa là quãng tăng 4 (A4: F→B) vừa là quãng giảm 5 (d5: B→F). Âm thanh cực kỳ căng thẳng — thời Trung Cổ gọi là *diabolus in musica* (quỷ trong âm nhạc), bị cấm trong nhạc nhà thờ. Ngày nay dùng nhiều trong nhạc jazz và metal để tạo độ căng.
> - *"E → F♭ và E → E là cùng số nửa cung (0 và 1) nhưng khác tên quãng sao?"* — Đúng. E→F♭ là m2 theo tên chữ cái (E=1, F=2, số quãng = 2), dù F♭ = E trên piano. Đây là trường hợp **enharmonic interval** — cùng âm thanh, khác tên. Sự khác nhau tên quan trọng trong phân tích hòa âm.

> 🔁 **Dừng lại tự kiểm tra.**
> 1. Từ A đến C (ở trên) là quãng mấy, và bao nhiêu nửa cung?
> 2. Từ G đến F là quãng mấy, và là chất gì?
>
> <details><summary>Đáp án</summary>
>
> 1. A(1)–B(2)–C(3) → **quãng 3**. A→A♯(1)→B(2)→C(3) → **3 nửa cung** → quãng 3 thứ (m3).
> 2. G(1)–A(2)–B(3)–C(4)–D(5)–E(6)–F(7) → **quãng 7**. G→G♯(1)→A(2)→A♯(3)→B(4)→C(5)→C♯(6)→D(7)→D♯(8)→E(9)→F(10) → **10 nửa cung** → quãng 7 thứ (m7).
> </details>

> 📝 **Tóm tắt mục 2.** 13 loại quãng từ 0–12 nửa cung. Quãng 1/4/5/8: chỉ đúng (± 1 → tăng/giảm). Quãng 2/3/6/7: trưởng/thứ (± 1 → tăng/giảm). Tritone = 6 nửa cung, nằm giữa octave, căng thẳng nhất.

---

## 3. Thuận và nghịch — tỷ lệ tần số

> 💡 **Trực giác.** Khi hai nốt phát cùng lúc, tai nghe "thuận" hay "nghịch" phụ thuộc vào sóng âm của chúng có "khớp nhau" thường xuyên không. Nếu tỷ lệ tần số là **số nguyên đơn giản** (2:1, 3:2, 4:3...), sóng lặp lại cùng nhau sớm → não cảm nhận "hòa hợp". Tỷ lệ càng phức tạp (89:79) → sóng va chạm liên tục → "căng thẳng".

**Bảng thuận – nghịch với tỷ lệ tần số (hệ just intonation):**

| Quãng | Nửa cung | Tỷ lệ thuần (just) | Cents thuần | Cảm giác |
|-------|:--------:|:------------------:|:-----------:|----------|
| P8 (octave) | 12 | 2:1 | 1200 | Thuận hoàn hảo |
| P5 | 7 | 3:2 | 701.96 | Thuận hoàn hảo |
| P4 | 5 | 4:3 | 498.04 | Thuận hoàn hảo |
| M3 | 4 | 5:4 | 386.31 | Thuận không hoàn hảo |
| m3 | 3 | 6:5 | 315.64 | Thuận không hoàn hảo |
| M6 | 9 | 5:3 | 884.36 | Thuận không hoàn hảo |
| m6 | 8 | 8:5 | 813.69 | Thuận không hoàn hảo |
| M2 | 2 | 9:8 | 203.91 | Trung gian / nghịch nhẹ |
| m7 | 10 | 16:9 | 996.09 | Nghịch |
| M7 | 11 | 15:8 | 1088.27 | Nghịch |
| m2 | 1 | 16:15 | 111.73 | Nghịch mạnh |
| Tritone | 6 | 45:32 | 590.22 | Nghịch cực mạnh |

> ⚠ **Cảnh báo quan trọng — Just intonation vs Equal temperament.** Bảng trên dùng **hệ thuần (just intonation)** — tỷ lệ số nguyên "đẹp". Đàn piano hiện đại dùng **equal temperament (ET)**: mỗi nửa cung = ×2^(1/12), tất cả quãng (trừ octave) đều **xấp xỉ** tỷ lệ thuần, không chính xác tuyệt đối. Ví dụ:
> - P5 thuần = 701.96 cents; ET = 700 cents → lệch **1.96 cents** (tai khó nghe, chấp nhận được).
> - M3 thuần = 386.31 cents; ET = 400 cents → lệch **13.69 cents** (nghe được — lý do hợp âm trưởng trên piano "hơi chua" so với hát bè thuần). Đây là toy-example-to-production: đừng dùng tỷ lệ thuần để tính tần số piano thật.

**Walk-through tính cents từ tỷ lệ — verify 4 quãng:**

1. **P5 (3:2):** \`cents = 1200·log₂(3/2) = 1200·log₂(1.5) = 1200·0.58496 = **701.96 cents**\`. Quãng 5 ET = 700 cents, lệch 1.96 cents ✓
2. **M3 (5:4):** \`cents = 1200·log₂(5/4) = 1200·log₂(1.25) = 1200·0.32193 = **386.31 cents**\`. Quãng 3 trưởng ET = 400 cents, lệch 13.69 cents ✓
3. **P4 (4:3):** \`cents = 1200·log₂(4/3) = 1200·log₂(1.3333) = 1200·0.41504 = **498.04 cents**\`. ET = 500 cents, lệch 1.96 cents ✓
4. **m3 (6:5):** \`cents = 1200·log₂(6/5) = 1200·log₂(1.2) = 1200·0.26303 = **315.64 cents**\`. ET = 300 cents, lệch 15.64 cents ✓

> ❓ **Câu hỏi tự nhiên của người đọc.**
> - *"Nếu ET "sai" so với just intonation, vì sao cả thế giới dùng ET?"* — Vì ET cho phép chơi bất kỳ bộ điệu (key) nào trên cùng một cây đàn mà độ lệch đều như nhau (xấp xỉ nhau). Just intonation "đúng" trong một key cụ thể nhưng nghe lạc trong các key khác. ET là sự thỏa hiệp thực dụng.
> - *"Nghịch có nghĩa là "sai" hay "xấu" không?"* — Không. Nghịch tạo ra cảm giác căng thẳng cần "giải phóng" — đây là động lực của âm nhạc. Không có nghịch thì nhạc nhạt nhẽo. Ví dụ: tritone trong hợp âm dominant 7 tạo căng thẳng dẫn đến tonic — đây là cơ chế cốt lõi của hòa âm Tây phương.

> 🔁 **Dừng lại tự kiểm tra.** P5 thuần có tỷ lệ 3:2. Tính cents. Độ lệch so với ET (700 cents) là bao nhiêu?
> <details><summary>Đáp án</summary>
>
> \`1200·log₂(3/2) = 1200·0.58496 = 701.96 cents\`. Lệch so với ET: \`701.96 − 700 = 1.96 cents\`. Tai người thường không nhận ra độ lệch này trong bối cảnh nhạc phức tạp.
> </details>

> 📝 **Tóm tắt mục 3.** Tỷ lệ tần số đơn giản → thuận. Tỷ lệ phức tạp → nghịch. Piano ET xấp xỉ tỷ lệ just — M3 lệch 13.7 cents (nghe được), P5 lệch 2 cents (khó nghe). Nghịch không xấu — là động lực âm nhạc.

---

## 4. Đảo quãng (Inversion)

> 💡 **Trực giác.** Hãy tưởng tượng bạn cầm một cái thước gỗ (quãng). Đảo quãng = lật ngược cái thước: nốt dưới bay lên cao một octave (hoặc nốt trên xuống thấp). Kết quả: hai nốt vẫn đó nhưng vai trò đổi chỗ. Khoảng cách mới = 1 octave (12 nửa cung) trừ đi khoảng cách cũ.

**Hai quy tắc đảo quãng:**

1. **Số:** số quãng gốc + số quãng đảo = **9** (ví dụ: quãng 3 đảo thành quãng 6, vì 3 + 6 = 9; quãng 2 đảo thành quãng 7, vì 2 + 7 = 9).
2. **Chất:** trưởng ↔ thứ; tăng ↔ giảm; đúng ↔ đúng; tritone ↔ tritone.
3. **Nửa cung:** nửa cung gốc + nửa cung đảo = **12** (tổng luôn = 1 octave).

**Walk-through 4 ví dụ đảo quãng (verify cả 3 quy tắc):**

| Quãng gốc | Số nửa cung | Đảo (9 − số) | Chất đảo | Nửa cung đảo | Verify 12 |
|-----------|:-----------:|:------------:|:--------:|:------------:|:---------:|
| M3 (C–E) | 4 | 9−3 = 6 → quãng **6** | Trưởng→**Thứ** → m6 | 12−4 = **8** | 4+8=12 ✓ |
| P5 (C–G) | 7 | 9−5 = 4 → quãng **4** | Đúng→**Đúng** → P4 | 12−7 = **5** | 7+5=12 ✓ |
| m2 (E–F) | 1 | 9−2 = 7 → quãng **7** | Thứ→**Trưởng** → M7 | 12−1 = **11** | 1+11=12 ✓ |
| M6 (C–A) | 9 | 9−6 = 3 → quãng **3** | Trưởng→**Thứ** → m3 | 12−9 = **3** | 9+3=12 ✓ |

**Ví dụ số đầy đủ — M3: C–E đảo thành m6: E–C**

- Quãng gốc: C4 (261.63 Hz) → E4 (329.63 Hz). Số nửa cung = 4, là M3.
- Đảo: lấy E4 làm nốt gốc, C5 (523.25 Hz) là nốt cao. E4→C5 = 8 nửa cung.
- Tên đảo: số = 9−3 = 6, chất = thứ → **m6 (E–C)** ✓
- Tỷ lệ tần số: M3 just = 5:4; m6 just = 8:5. Nhân lại: (5/4)·(8/5) = 8/4 = **2:1 = 1 octave** ✓

> ⚠ **Lỗi thường gặp — quên "= 9, không phải = 8".** Nhiều người nghĩ "tổng bằng 8 (một octave)" nhưng thực ra tổng **số** = 9. Lý do: số quãng được đếm theo cách "inclusive" (tính cả hai đầu), nên khi ghép hai quãng lại, đầu giữa bị đếm 2 lần → bù lại bằng −1. Ví dụ: quãng 3 (C-D-E) + quãng 6 (E-F-G-A-B-C) ghép lại: C đến C = 8 nốt, nhưng 3+6=9 vì E ở giữa đếm 2 lần.

> ❓ **Câu hỏi tự nhiên của người đọc.**
> - *"Tritone đảo thành gì?"* — Tritone (A4 = 6 nửa cung) đảo thành d5 (cũng 6 nửa cung), vì 12−6=6. Số quãng: 9−4=5, chất: tăng→giảm → d5. Nhưng A4 và d5 là enharmonic (cùng âm thanh trên piano) → tritone là quãng duy nhất **đảo thành chính nó về âm thanh**.
> - *"Đảo quãng dùng để làm gì trong thực tế?"* — Dùng nhiều trong chuyển đảo hợp âm (chord inversion) và viết bè (voice leading). Hiểu đảo quãng giúp bạn nhận ra rằng P5 (C–G) và P4 (G–C) là "cùng một quãng" nhìn từ hai hướng.

> 🔁 **Dừng lại tự kiểm tra.** Quãng M7 (nửa cung = 11) đảo thành quãng gì?
> <details><summary>Đáp án</summary>
>
> Số: 9−7=2 → quãng 2. Chất: trưởng → thứ → **m2**. Nửa cung: 12−11=1 → m2 = 1 nửa cung ✓.
> </details>

> 📝 **Tóm tắt mục 4.** Đảo quãng: số + số đảo = 9; nửa cung + nửa cung đảo = 12; chất: trưởng↔thứ, tăng↔giảm, đúng↔đúng. Tritone đảo thành tritone.

---

## 5. Bài tập

1. **Xác định quãng.** Đếm số và số nửa cung: từ **D đến A**. Tên đầy đủ là gì?
2. **Tính tỷ lệ tần số.** Nốt A4 = 440 Hz. Nốt cao hơn A4 đúng một P5 (7 nửa cung) là nốt gì và bao nhiêu Hz? Kiểm tra: tỷ lệ có xấp xỉ 3:2 không?
3. **Tính cents.** P5 just intonation có tỷ lệ 3:2. Tính cents. So sánh với ET (700 cents). Lệch bao nhiêu?
4. **Đảo quãng.** Quãng m6 (A–F, 8 nửa cung) đảo thành quãng gì? Verify số + số đảo = 9 và nửa cung + nửa cung đảo = 12.
5. **Phân loại nghịch/thuận.** Trong danh sách sau, phân loại mỗi quãng là thuận hoàn hảo / thuận không hoàn hảo / nghịch: P8, m2, M3, tritone, P5, M7.

---

## Lời giải chi tiết

**Bài 1.** Đếm tên chữ cái D→A: D(1)–E(2)–F(3)–G(4)–A(5) → **số quãng = 5**.
Tính nửa cung từ D đến A: D→D♯(1)→E(2)→F(3)→F♯(4)→G(5)→G♯(6)→A(7) → **7 nửa cung**.
Tra bảng: 5 chữ cái + 7 nửa cung → **P5 (Quãng 5 đúng)**. ✓

**Bài 2.** P5 = 7 nửa cung. Từ A4 (n=0), n = +7.
\`f = 440·2^(7/12) = 440·2^0.58333 = 440·1.49831 = **659.26 Hz\`**.
Đây là nốt gì? \`midi = 69 + 7 = 76\`. 76 mod 12 = 4 = E; octave = floor(76/12)−1 = 5 → **E5**.
Kiểm tra tỷ lệ: 659.26/440 = 1.4983 ≈ **1.5 = 3:2** ✓ (lệch 0.11% — ET xấp xỉ sát).

**Bài 3.** \`cents = 1200·log₂(3/2)\`.
\`log₂(1.5) = ln(1.5)/ln(2) = 0.40546/0.69315 = 0.58496\`.
\`cents = 1200 × 0.58496 = **701.96 cents\`**.
So với ET = 700 cents: lệch **1.96 cents** — rất nhỏ, tai người khó phân biệt trong bối cảnh nhạc thực.

**Bài 4.** m6 có số = 6, nửa cung = 8.
- Số đảo: 9 − 6 = **3** → quãng 3.
- Chất đảo: thứ → **trưởng** → M3.
- Nửa cung đảo: 12 − 8 = **4** → M3 = 4 nửa cung ✓.
- Verify: 6 + 3 = 9 ✓; 8 + 4 = 12 ✓.
- Kết luận: m6 đảo thành **M3** (từ F4 lên A4, hoặc từ A lên C♯/D♭).

**Bài 5.**

| Quãng | Tỷ lệ | Phân loại |
|-------|-------|-----------|
| P8 | 2:1 | **Thuận hoàn hảo** |
| m2 | 16:15 | **Nghịch mạnh** |
| M3 | 5:4 | **Thuận không hoàn hảo** |
| Tritone | 45:32 | **Nghịch cực mạnh** |
| P5 | 3:2 | **Thuận hoàn hảo** |
| M7 | 15:8 | **Nghịch** |

---

## Code & Minh họa

- 🎹 [visualization.html](./visualization.html) — **Xưởng quãng**: chọn nốt gốc + loại quãng → nghe melodic và harmonic, thấy số nửa cung + tỷ lệ tần số + cents. Thước thuận–nghịch trực quan. Công cụ đảo quãng. **🔊 Bật loa để nghe.**

---

## Bài tiếp theo

→ **Lesson 05 — Gam trưởng (Major Scale)**: xây dựng gam từ chuỗi quãng (T-T-S-T-T-T-S), ý nghĩa của 7 bậc, và vì sao gam C trưởng chỉ dùng phím trắng.

[⬆ Về tầng Fundamentals](../index.html) · [🏠 Trang chính Music](../../index.html)
`;
