// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: Music/01-Fundamentals/lesson-05-major-scale/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 05 — Gam trưởng (Major Scale)

> **Tầng 1 — Fundamentals · Bài 5/8**

Đây là bài học nền tảng nhất của hòa âm: **gam trưởng** là bộ xương của hầu hết âm nhạc phương Tây — từ bài hát thiếu nhi, nhạc pop, nhạc cổ điển, cho đến jazz và rock. Hiểu gam trưởng là hiểu *ngôn ngữ* mà âm nhạc đang nói. Bài này xây từng bước: từ công thức khoảng cách, verify bằng số, đến tên bậc và ý nghĩa từng bậc.

## Mục tiêu học tập

Sau bài này, bạn có thể:

- Phát biểu công thức gam trưởng: **T–T–½–T–T–T–½** (còn gọi là 2-2-1-2-2-2-1 nửa cung).
- Dựng gam trưởng từ bất kỳ nốt gốc nào bằng cách áp công thức, verify từng bước.
- Gọi tên 7 bậc của gam (tonic, supertonic, mediant...) và solfège tương ứng.
- Giải thích vì sao gam C trưởng chỉ dùng phím trắng, và vì sao G trưởng cần F♯.
- Nhận biết nốt nào bị sai khi nhìn vào một chuỗi nốt tự xưng là "gam trưởng".

## Kiến thức tiền đề

- **Tên 12 nốt, phím đen/trắng trên piano** → [Lesson 02 — Tên nốt & bàn phím](../lesson-02-note-names/).
- **Nửa cung (semitone) và nguyên cung (whole tone)** → [Lesson 04 — Quãng (Intervals)](../lesson-04-intervals/).

---

## 1. Gam là gì? — Bộ 7 nốt theo "công thức khoảng cách"

> 💡 **Trực giác.** Hãy tưởng tượng bạn muốn làm một bài thơ nhưng chỉ được dùng 7 trong 26 chữ cái — và bộ 7 chữ cái đó được chọn theo một quy tắc cụ thể để chúng "hòa hợp" nhau. Gam (scale) cũng vậy: từ 12 nốt trong một octave, ta chọn 7 nốt theo *công thức khoảng cách*, và bộ 7 nốt đó tạo ra một "màu sắc" đặc trưng cho mọi bản nhạc viết trên nó.

**(a) Là gì.** Gam trưởng (major scale) là một chuỗi **7 nốt phân biệt** (+ nốt thứ 8 là nốt gốc lặp lại ở octave trên) được sắp xếp theo **công thức khoảng cách cố định**:

$$\\text{T} - \\text{T} - \\tfrac{1}{2} - \\text{T} - \\text{T} - \\text{T} - \\tfrac{1}{2}$$

Trong đó:
- **T (Tone = Whole step)** = nguyên cung = **2 nửa cung (semitone)**.
- **½ (Semitone = Half step)** = nửa cung = **1 nửa cung**.

Dạng số: \`2 – 2 – 1 – 2 – 2 – 2 – 1\` nửa cung (tổng = 12 ✓ = 1 octave).

**(b) Vì sao tồn tại.** Không phải công thức tùy tiện — bộ khoảng cách T-T-½-T-T-T-½ tạo ra một tập hợp tần số có nhiều tỷ lệ "hài hòa" với nhau (gần các số nguyên đơn giản như 3:2, 5:4...). Tai người cảm nhận bộ này là "vui, sáng, ổn định". Đây là cơ sở vật lý-tâm lý học âm thanh — ta sẽ phân tích kỹ ở Tầng 2 (Hòa âm).

> ❓ **Câu hỏi tự nhiên của người đọc.**
> - *"Tại sao lại 7 nốt, không phải 5 hay 8?"* — 7 nốt là lựa chọn lịch sử và tâm lý. Nhiều nền văn hóa dùng 5 (pentatonic). 7 cho đủ màu sắc hòa âm trong khi không quá đông đúc để tai bị "bội thực".
> - *"Gam và điệu thức (mode) khác nhau thế nào?"* — Gam là tập hợp nốt; điệu thức là *điểm bắt đầu* trên tập đó. Sẽ học ở [Lesson 06](../lesson-06-minor-scales-modes/).

---

## 2. Dựng gam C trưởng — ví dụ cổ điển

> 💡 **Trực giác.** Piano có 7 phím trắng lặp lại: C D E F G A B. Hóa ra bộ 7 phím trắng này CHÍNH XÁC là gam C trưởng — và đây không phải ngẫu nhiên: piano được thiết kế để gam C nằm hoàn toàn trên phím trắng, phần còn lại thêm dấu thăng/giáng.

Áp công thức từ nốt **C** (bất kỳ octave, ví dụ C4):

| Bước | Từ | Khoảng | Đến | Nửa cung kiểm tra |
|------|----|---------|-----|-------------------|
| 1 | C | T (+2) | **D** | C→C♯=1, C♯→D=1 → 2 ✓ |
| 2 | D | T (+2) | **E** | D→D♯=1, D♯→E=1 → 2 ✓ |
| 3 | E | ½ (+1) | **F** | E→F=1 (không có phím đen giữa) ✓ |
| 4 | F | T (+2) | **G** | F→F♯=1, F♯→G=1 → 2 ✓ |
| 5 | G | T (+2) | **A** | G→G♯=1, G♯→A=1 → 2 ✓ |
| 6 | A | T (+2) | **B** | A→A♯=1, A♯→B=1 → 2 ✓ |
| 7 | B | ½ (+1) | **C** | B→C=1 (không có phím đen giữa) ✓ |

**Kết quả: C – D – E – F – G – A – B – C**

Tổng nửa cung: 2+2+1+2+2+2+1 = **12** = 1 octave ✓. Toàn phím trắng, không dấu thăng/giáng.

> ⚠ **Lỗi thường gặp: nhầm E→F và B→C là "nguyên cung".** Trên piano, giữa E và F *không có phím đen* — chúng chỉ cách nhau 1 nửa cung (half step), không phải nguyên cung. Tương tự B và C. Đây là điểm mà nhiều người học piano giai đoạn đầu hay nhầm.

> 🔁 **Dừng lại tự kiểm tra.** Gam C trưởng có bao nhiêu nửa cung từ C4 đến C5?
> <details><summary>Đáp án</summary>
>
> 12 nửa cung (= 1 octave). Cộng lại: 2+2+1+2+2+2+1 = 12 ✓.
> </details>

> 📝 **Tóm tắt mục 2.** C trưởng = C D E F G A B C. Toàn phím trắng. Hai chỗ "½" là E→F và B→C vì không có phím đen giữa chúng.

---

## 3. Dựng gam G trưởng — xuất hiện dấu thăng đầu tiên

Áp công thức từ nốt **G**:

| Bước | Từ | Khoảng | Đến | Kiểm tra |
|------|----|---------|-----|----------|
| 1 | G | T (+2) | **A** | G→G♯→A = 2 ✓ |
| 2 | A | T (+2) | **B** | A→A♯→B = 2 ✓ |
| 3 | B | ½ (+1) | **C** | B→C = 1 ✓ |
| 4 | C | T (+2) | **D** | C→C♯→D = 2 ✓ |
| 5 | D | T (+2) | **E** | D→D♯→E = 2 ✓ |
| 6 | E | T (+2) | **F♯** | E→F=1, F→F♯=1 → E→F♯ = 2 ✓ |
| 7 | F♯ | ½ (+1) | **G** | F♯→G = 1 ✓ |

**Kết quả: G – A – B – C – D – E – F♯ – G** (1 dấu thăng: F♯)

> 💡 **Vì sao F♯ chứ không phải F?** Ở bước 6, ta cần nguyên cung từ E. E→F chỉ là nửa cung → quá gần. Ta phải lên thêm 1 bước nữa thành F♯ để đủ nguyên cung. Nếu ta để F (không thăng), khoảng E→F chỉ là ½ thay vì T → phá vỡ công thức → không còn là gam trưởng nữa.

> 🔁 **Dừng lại tự kiểm tra.** Nếu dùng F thay vì F♯ trong gam G, bước 6 sẽ sai thế nào?
> <details><summary>Đáp án</summary>
>
> E→F = 1 nửa cung, nhưng bước 6 yêu cầu T = 2 nửa cung. Thiếu 1 nửa cung → khoảng quá hẹp → công thức bị phá vỡ ở bước 6 (½ thay vì T).
> </details>

> 📝 **Tóm tắt mục 3.** G trưởng có 1 dấu thăng: F♯. Lý do: để bước 6 (E→?) là nguyên cung, phải chọn F♯ thay vì F.

---

## 4. Dựng gam F trưởng — xuất hiện dấu giáng đầu tiên

Áp công thức từ nốt **F**:

| Bước | Từ | Khoảng | Đến | Kiểm tra |
|------|----|---------|-----|----------|
| 1 | F | T (+2) | **G** | F→F♯→G = 2 ✓ |
| 2 | G | T (+2) | **A** | G→G♯→A = 2 ✓ |
| 3 | A | ½ (+1) | **B♭** | A→B♭ = 1 ✓ |
| 4 | B♭ | T (+2) | **C** | B♭→B=1, B→C=1 → B♭→C = 2 ✓ |
| 5 | C | T (+2) | **D** | C→C♯→D = 2 ✓ |
| 6 | D | T (+2) | **E** | D→D♯→E = 2 ✓ |
| 7 | E | ½ (+1) | **F** | E→F = 1 ✓ |

**Kết quả: F – G – A – B♭ – C – D – E – F** (1 dấu giáng: B♭)

> 💡 **Vì sao B♭ chứ không phải B?** Ở bước 3, ta cần nửa cung từ A. A→B♭ = 1 nửa cung ✓. Nếu dùng B (không giáng), A→B = 2 nửa cung → quá xa, phá công thức bước 3 (T thay vì ½).

> ⚠ **Quy tắc tên nốt trong gam.** Mỗi gam phải dùng đủ **7 chữ cái khác nhau** (A B C D E F G), mỗi chữ cái đúng một lần. Vì thế ta phải gọi là B♭ (chữ B với dấu giáng) chứ không gọi là A♯ (dù A♯ = B♭ về tần số), vì trong gam F ta đã dùng chữ A ở bước 1.

> 📝 **Tóm tắt mục 4.** F trưởng có 1 dấu giáng: B♭. Lý do: bước 3 (A→?) cần nửa cung, và A♯ đã đổi tên thành B♭ để giữ 7 chữ cái khác nhau.

---

## 5. Dựng gam D trưởng — 2 dấu thăng

Áp công thức từ nốt **D**:

| Bước | Từ | Khoảng | Đến | Kiểm tra |
|------|----|---------|-----|----------|
| 1 | D | T (+2) | **E** | D→D♯→E = 2 ✓ |
| 2 | E | T (+2) | **F♯** | E→F=1, F→F♯=1 → 2 ✓ |
| 3 | F♯ | ½ (+1) | **G** | F♯→G = 1 ✓ |
| 4 | G | T (+2) | **A** | G→G♯→A = 2 ✓ |
| 5 | A | T (+2) | **B** | A→A♯→B = 2 ✓ |
| 6 | B | T (+2) | **C♯** | B→C=1, C→C♯=1 → B→C♯ = 2 ✓ |
| 7 | C♯ | ½ (+1) | **D** | C♯→D = 1 ✓ |

**Kết quả: D – E – F♯ – G – A – B – C♯ – D** (2 dấu thăng: F♯, C♯)

> 💡 **Nhận xét pattern.** Mỗi khi ta bắt đầu gam trưởng từ bậc V của gam hiện tại (gam G bắt từ V của C, gam D bắt từ V của G), ta thêm đúng 1 dấu thăng mới. Đây là nền tảng của **Vòng quãng 5 (Circle of Fifths)** — sẽ học ở [Lesson 08](../lesson-08-key-signatures-circle/).

> 🔁 **Dừng lại tự kiểm tra.** Dựng gam A trưởng (từ A). Có bao nhiêu dấu thăng?
> <details><summary>Đáp án</summary>
>
> A – B – C♯ – D – E – F♯ – G♯ – A. Có **3 dấu thăng**: C♯, F♯, G♯.
>
> Kiểm tra: A→B(2)✓, B→C♯(2)✓, C♯→D(1)✓, D→E(2)✓, E→F♯(2)✓, F♯→G♯(2)✓, G♯→A(1)✓.
> </details>

> 📝 **Tóm tắt mục 5.** D trưởng = D E F♯ G A B C♯ D. 2 dấu thăng. Pattern: mỗi gam mới bắt từ bậc V → thêm 1 thăng mới.

---

## 6. Bậc của gam — tên và vai trò

> 💡 **Trực giác.** Trong một vương quốc, không phải ai cũng bình đẳng: có vua, hoàng hậu, các quan. Trong gam trưởng, 7 nốt cũng có "vai trò" khác nhau — vua là nốt gốc (tonic), còn các nốt khác tạo sức căng và giải tỏa xung quanh nó.

| Bậc | Số La Mã | Tên tiếng Anh | Tên tiếng Việt | Solfège | Ví dụ (C trưởng) |
|-----|----------|--------------|----------------|---------|-----------------|
| 1 | I | Tonic | Chủ âm | Do | C |
| 2 | II | Supertonic | Thượng chủ âm | Re | D |
| 3 | III | Mediant | Trung âm | Mi | E |
| 4 | IV | Subdominant | Hạ át âm | Fa | F |
| 5 | V | Dominant | Át âm | Sol | G |
| 6 | VI | Submediant | Thứ âm | La | A |
| 7 | VII | Leading tone | Cảm âm / Dẫn âm | Ti (Si) | B |

**(a) Tonic (I) — "trung tâm hấp dẫn":** Nốt mà gam và bài nhạc cảm thấy "ổn định", muốn "về" đây. Gam C trưởng → tonic là C; gam G trưởng → tonic là G.

**(b) Dominant (V) — "sức căng cần giải tỏa":** Bậc 5 cách tonic một quãng 5 đúng (7 nửa cung). Hợp âm V thường "căng" và cần giải về I — đây là chuyển động cơ bản nhất trong hòa âm (V→I, gọi là cadence hoàn toàn).

**(c) Leading tone (VII) — "bước dẫn về nhà":** Chỉ cách tonic 1 nửa cung (B→C trong gam C). Tai cảm thấy VII "muốn" leo lên I — đó là lý do tên "leading tone" (dẫn âm). Đây là một trong những lực hút mạnh nhất trong âm nhạc phương Tây.

**(d) Subdominant (IV) — "đệm nền":** Bậc 4 cách tonic 2.5 tone (5 nửa cung). Hợp âm IV thường tạo cảm giác "rộng ra, phiêu diêu" trước khi về V hoặc I. Chuỗi I→IV→V→I là nền tảng blues và rock cổ điển.

> ❓ **Câu hỏi tự nhiên của người đọc.**
> - *"Solfège 'Do-Re-Mi' có phải lúc nào cũng là C-D-E không?"* — Không nhất thiết. Có hai hệ: *Fixed Do* (Do = C cố định, dùng ở nhiều nước châu Á và châu Âu) và *Movable Do* (Do = tonic của gam hiện tại). Bài này dùng *Movable Do* để linh hoạt với mọi gam.
> - *"Bậc VII có tên là 'leading tone' nhưng trong gam thứ thì sao?"* — Gam thứ tự nhiên (natural minor) có bậc VII thấp hơn 1 nửa cung → gọi là *subtonic*, không còn "dẫn" về I nữa. Sẽ học ở [Lesson 06](../lesson-06-minor-scales-modes/).

> 🔁 **Dừng lại tự kiểm tra.** Trong gam G trưởng (G A B C D E F♯), nốt nào là dominant? Nốt nào là leading tone?
> <details><summary>Đáp án</summary>
>
> - Dominant (bậc V) = **D** (đếm: G=1, A=2, B=3, C=4, D=5).
> - Leading tone (bậc VII) = **F♯** (đếm: G=1,..., F♯=7). F♯ cách G 1 nửa cung ↑ → đúng là "leading tone" dẫn về G.
> </details>

> 📝 **Tóm tắt mục 6.** 7 bậc gam có tên và vai trò riêng. Quan trọng nhất: I (tonic = trung tâm), V (dominant = sức căng), VII (leading tone = dẫn về I). Solfège movable: Do=I, Re=II, Mi=III, Fa=IV, Sol=V, La=VI, Ti=VII.

---

## 7. Tổng hợp ≥ 4 ví dụ gam trưởng

Để củng cố, dưới đây là bảng verify 4 gam bằng công thức 2-2-1-2-2-2-1:

| Gam | Nốt 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | Dấu hóa |
|-----|-------|---|---|---|---|---|---|---|---------|
| **C trưởng** | C | D | E | F | G | A | B | C | Không dấu |
| **G trưởng** | G | A | B | C | D | E | F♯ | G | 1♯ (F♯) |
| **D trưởng** | D | E | F♯ | G | A | B | C♯ | D | 2♯ (F♯, C♯) |
| **A trưởng** | A | B | C♯ | D | E | F♯ | G♯ | A | 3♯ (F♯, C♯, G♯) |
| **F trưởng** | F | G | A | B♭ | C | D | E | F | 1♭ (B♭) |
| **B♭ trưởng** | B♭ | C | D | E♭ | F | G | A | B♭ | 2♭ (B♭, E♭) |

**Verify B♭ trưởng** (ví dụ mở rộng — kiểm từng bước):

| Bước | Từ | Khoảng | Đến | Kiểm tra nửa cung |
|------|----|---------|-----|-------------------|
| 1 | B♭ | T (+2) | **C** | B♭→B=1, B→C=1 → 2 ✓ |
| 2 | C | T (+2) | **D** | C→C♯=1, C♯→D=1 → 2 ✓ |
| 3 | D | ½ (+1) | **E♭** | D→E♭=1 (E♭=D♯) ✓ |
| 4 | E♭ | T (+2) | **F** | E♭→E=1, E→F=1 → 2 ✓ |
| 5 | F | T (+2) | **G** | F→F♯=1, F♯→G=1 → 2 ✓ |
| 6 | G | T (+2) | **A** | G→G♯=1, G♯→A=1 → 2 ✓ |
| 7 | A | ½ (+1) | **B♭** | A→B♭=1 ✓ |

B♭ trưởng = B♭ C D E♭ F G A B♭. 2 dấu giáng: B♭ và E♭. Công thức đúng ✓.

> ⚠ **Lỗi phổ biến khi dùng enharmonic sai tên.** Trong gam B♭ trưởng, bậc 3 phải tên là **D** (chữ D với không dấu), bậc 4 là **E♭** — không được viết bậc 4 là D♯ dù D♯ = E♭ về tần số. Lý do: gam phải dùng đủ 7 chữ cái A-G, mỗi chữ đúng một lần. D♯ sẽ bị trùng chữ D.

---

## 8. Bài tập

**Bài 1.** Dựng gam **E trưởng** từ nốt E. Viết ra 7 nốt + 1 nốt octave, verify từng bước theo công thức 2-2-1-2-2-2-1.

**Bài 2.** Xác định nốt **sai** trong chuỗi sau tự xưng là "gam A trưởng":
A – B – C – D – E – F♯ – G♯ – A
Nốt nào sai? Phải là nốt gì?

**Bài 3.** Cho gam **F♯ trưởng** (bắt từ F♯). Áp công thức và tìm 7 nốt. (Gợi ý: bạn sẽ cần nhiều dấu thăng — hãy dùng tên chữ cái A-G, mỗi chữ đúng một lần.)

**Bài 4.** Gam **B♭ trưởng** có leading tone là nốt gì? Giải thích vì sao nốt đó là "dẫn âm".

**Bài 5.** Trong gam **D trưởng** (D E F♯ G A B C♯), hãy tìm tonic, dominant, subdominant và viết solfège tương ứng (theo movable do).

---

## Lời giải chi tiết

**Bài 1 — Gam E trưởng:**

Áp công thức 2-2-1-2-2-2-1 từ E:

| Bước | Từ | +nc | Đến | Kiểm tra |
|------|----|-----|-----|----------|
| 1 | E | +2 | **F♯** | E→F=1, F→F♯=1 → 2 ✓ |
| 2 | F♯ | +2 | **G♯** | F♯→G=1, G→G♯=1 → 2 ✓ |
| 3 | G♯ | +1 | **A** | G♯→A = 1 ✓ |
| 4 | A | +2 | **B** | A→A♯=1, A♯→B=1 → 2 ✓ |
| 5 | B | +2 | **C♯** | B→C=1, C→C♯=1 → 2 ✓ |
| 6 | C♯ | +2 | **D♯** | C♯→D=1, D→D♯=1 → 2 ✓ |
| 7 | D♯ | +1 | **E** | D♯→E = 1 ✓ |

**E trưởng = E – F♯ – G♯ – A – B – C♯ – D♯ – E** (4 dấu thăng: F♯, G♯, C♯, D♯).

Độ phức tạp: O(1) — đây là thao tác đếm bậc, không phụ thuộc vào số lượng nốt.

---

**Bài 2 — Tìm nốt sai trong "gam A trưởng":**

Chuỗi cho: A – B – **C** – D – E – F♯ – G♯ – A

Dựng gam A trưởng đúng: A – B – C♯ – D – E – F♯ – G♯ – A.

Kiểm tra bước 2 (B→C): B→C = 1 nửa cung, nhưng công thức yêu cầu T = 2 nửa cung. **C sai, phải là C♯**.

Lý do: bước 2 (bậc II→III) trong công thức là T (+2), nên từ B cần lên 2 nửa cung → B+2 = C♯, không phải C.

---

**Bài 3 — Gam F♯ trưởng:**

Áp công thức từ F♯:

| Bước | Từ | +nc | Đến | Kiểm tra |
|------|----|-----|-----|----------|
| 1 | F♯ | +2 | **G♯** | F♯→G=1, G→G♯=1 → 2 ✓ |
| 2 | G♯ | +2 | **A♯** | G♯→A=1, A→A♯=1 → 2 ✓ |
| 3 | A♯ | +1 | **B** | A♯→B = 1 ✓ |
| 4 | B | +2 | **C♯** | B→C=1, C→C♯=1 → 2 ✓ |
| 5 | C♯ | +2 | **D♯** | C♯→D=1, D→D♯=1 → 2 ✓ |
| 6 | D♯ | +2 | **E♯** | D♯→E=1, E→F=1, nhưng E♯ = F trên phím → D♯→E♯ = 2 ✓ |
| 7 | E♯ | +1 | **F♯** | E♯→F♯ = F→F♯ = 1 ✓ |

**F♯ trưởng = F♯ – G♯ – A♯ – B – C♯ – D♯ – E♯ – F♯** (6 dấu thăng).

*Lưu ý:* E♯ = F về âm thanh (enharmonic), nhưng ta phải viết E♯ để giữ đủ 7 chữ cái: F-G-A-B-C-D-E. Không thể viết F vì F♯ đã dùng chữ F ở vị trí 1.

---

**Bài 4 — Leading tone của B♭ trưởng:**

B♭ trưởng = B♭ – C – D – E♭ – F – G – A – B♭.

Bậc VII = **A**. A là leading tone vì:
- A cách B♭ đúng **1 nửa cung** (A→B♭ = 1).
- Nốt A "muốn" leo lên nửa cung về B♭ (tonic) → tạo cảm giác "chưa xong, cần về nhà".
- Đây là tính chất định nghĩa của leading tone: luôn cách tonic đúng 1 nửa cung phía dưới.

---

**Bài 5 — Bậc và solfège trong gam D trưởng:**

D trưởng = D – E – F♯ – G – A – B – C♯.

| Vai trò | Bậc | Nốt | Solfège |
|---------|-----|-----|---------|
| **Tonic** | I | **D** | Do |
| Supertonic | II | E | Re |
| Mediant | III | F♯ | Mi |
| **Subdominant** | IV | **G** | Fa |
| **Dominant** | V | **A** | Sol |
| Submediant | VI | B | La |
| Leading tone | VII | C♯ | Ti |

- Tonic = **D** (trung tâm hấp dẫn, nơi bài nhạc "ổn định").
- Dominant = **A** (bậc V, cách D 7 nửa cung = quãng 5 đúng, tạo sức căng cần giải về D).
- Subdominant = **G** (bậc IV, tạo cảm giác "phiêu" trước khi về A hoặc D).

---

## Code & Minh họa

- 🎹 [visualization.html](./visualization.html) — Xưởng gam trưởng tương tác: chọn nốt gốc → xem gam tô sáng trên bàn phím piano, công thức T-T-½ hiển thị từng bước, phát gam đi lên/xuống. Bấm từng phím trong gam để nghe. **🔊 Bật loa để nghe.**

---

## Bài tiếp theo

→ **[Lesson 06 — Gam thứ & điệu thức (Minor Scales & Modes)](../lesson-06-minor-scales-modes/)**: gam thứ tự nhiên, hòa thanh, giai điệu và 7 chế độ (mode) của gam diatonic.

[⬆ Về tầng Fundamentals](../index.html) · [🏠 Trang chính Music](../../index.html)
`;
