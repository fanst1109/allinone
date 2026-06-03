# Lesson 08 — Capstone: Phân tích & Sáng tác

> **Tầng 3 — Applied & Composition · Bài 8/8**

Đây là bài **tổng kết toàn lĩnh vực Music**. Sau 23 bài trải qua 3 tầng — từ âm vật lý (tần số, octave), qua hòa âm (hợp âm, cadence, chức năng T-S-D), đến ứng dụng (giai điệu, hình thức, đối âm, jazz) — bài này gom tất cả lại thành **một quy trình sáng tác 8 ô nhịp hoàn chỉnh**. Bạn sẽ không chỉ hiểu lý thuyết mà còn tự tay tạo ra một đoạn nhạc ngắn, phân tích nó bằng số La Mã và chức năng hòa âm, rồi nghe thành phẩm ngay trong trình duyệt.

> 💡 **Vì sao cần bài Capstone?** Mỗi bài trước giải quyết một mảng riêng. Nhưng sáng tác thật sự đòi hỏi quyết định đồng thời: chọn điệu, chọn tiến trình, viết giai điệu, đặt nhịp, định hình thức — tất cả phải ăn khớp. Bài này luyện tư duy tích hợp đó.

## Mục tiêu học tập

Sau bài này, bạn có thể:

- Thiết kế một đoạn nhạc 8 ô nhịp từ điểm khởi đầu trống, đi theo quy trình từng bước.
- Chọn tiến trình hợp âm diatonic kết thúc bằng cadence hợp lý.
- Viết giai điệu dùng nốt trong gam, phát triển từ một motif ngắn.
- Phân tích đoạn nhạc bằng số La Mã (I, IV, V...) và chức năng (T, S, D).
- Sử dụng "Xưởng sáng tác mini" trong visualization để nghe thành phẩm.

## Kiến thức tiền đề

Bài này tổng hợp toàn bộ lĩnh vực. Các bài cốt lõi cần ôn:

- **Gam trưởng/thứ**: [`../../01-Fundamentals/lesson-05-major-scale/`](../../01-Fundamentals/lesson-05-major-scale/) — 7 nốt diatonic, công thức bước.
- **Hợp âm theo bậc (diatonic chords)**: [`../../02-Harmony/lesson-03-diatonic-chords/`](../../02-Harmony/lesson-03-diatonic-chords/) — 7 hợp âm I–VII, chất lượng (M/m/dim).
- **Tiến trình & kết (progressions & cadences)**: [`../../02-Harmony/lesson-04-progressions-cadences/`](../../02-Harmony/lesson-04-progressions-cadences/) — authentic, half, deceptive cadence.
- **Phân tích chức năng (functional analysis)**: [`../../02-Harmony/lesson-08-functional-analysis/`](../../02-Harmony/lesson-08-functional-analysis/) — T-S-D, tensions & resolutions.
- **Giai điệu & motif**: [`../lesson-03-melody-motif/`](../lesson-03-melody-motif/) — câu hỏi–đáp, mô tiến, phát triển motif.
- **Hình thức âm nhạc (musical form)**: [`../lesson-05-musical-form/`](../lesson-05-musical-form/) — a-a'-b-a, câu-đoạn, binary/ternary.

---

## 1. Bước 1 — Chọn điệu và nhịp

> 💡 **Trực giác.** Điệu (key) là "nhà" của đoạn nhạc — mọi nốt và hợp âm đều xoay quanh nốt chủ (tonic). Nhịp (meter) là mạch đập đều đặn xác định cảm giác "nặng-nhẹ" mỗi ô nhịp.

### 1.1 Chọn điệu

Người mới bắt đầu nên chọn **C trưởng** (không có dấu thăng/giáng) hoặc **G trưởng** (1 dấu thăng). Sau khi quen quy trình, chuyển sang điệu thứ (a thứ, e thứ) hoặc các điệu khác.

**Gam C trưởng**: C – D – E – F – G – A – B – (C)
**Gam G trưởng**: G – A – B – C – D – E – F♯ – (G)
**Gam F trưởng**: F – G – A – B♭ – C – D – E – (F)

### 1.2 Chọn nhịp và tempo

| Nhịp | Cảm giác | Nhịp mạnh |
|------|----------|-----------|
| 4/4 | Đi đều, phổ biến nhất | Phách 1 và 3 |
| 3/4 | Nhảy waltz, nhịp nhàng | Phách 1 |
| 6/8 | Lắc lư, duyên dáng | Phách 1 và 4 |

**Ví dụ capstone này dùng**: C trưởng, nhịp 4/4, tempo = 100 BPM (moderato).

> ❓ **Câu hỏi tự nhiên.**
> - *"Có phải chọn ngay từ đầu không?"* — Có, vì điệu xác định 7 hợp âm diatonic bạn sẽ dùng ở bước 2. Thay đổi điệu giữa chừng đồng nghĩa viết lại gần hết.
> - *"Nếu muốn điệu thứ thì sao?"* — Dùng gam thứ tự nhiên (natural minor). Ví dụ a thứ = A–B–C–D–E–F–G. Hợp âm diatonic của a thứ: i–ii°–III–iv–v–VI–VII.

> 📝 **Tóm tắt mục 1.** Chọn điệu trước khi làm gì khác. C trưởng là điểm khởi đầu lý tưởng. Nhịp 4/4 phổ biến và dễ cảm nhận nhất.

---

## 2. Bước 2 — Chọn tiến trình hợp âm diatonic

> 💡 **Trực giác.** Tiến trình hợp âm là "bộ xương" của đoạn nhạc — nó quyết định cảm xúc hành trình từ bất ổn đến ổn định, từ câu hỏi đến câu trả lời. Giai điệu sẽ "ngồi lên" bộ xương này.

### 2.1 Bảy hợp âm diatonic của C trưởng

| Bậc | Số La Mã | Hợp âm | Chất lượng | Chức năng |
|-----|----------|--------|------------|-----------|
| 1 | **I** | C major (C–E–G) | Major | **T** (Tonic — ổn định) |
| 2 | ii | D minor (D–F–A) | minor | **S** (Subdominant — chuẩn bị) |
| 3 | iii | E minor (E–G–B) | minor | T (thay thế tonic) |
| 4 | **IV** | F major (F–A–C) | Major | **S** (Subdominant) |
| 5 | **V** | G major (G–B–D) | Major | **D** (Dominant — căng thẳng) |
| 6 | vi | A minor (A–C–E) | minor | T (thay thế tonic) |
| 7 | vii° | B diminished (B–D–F) | dim | D (thay thế dominant) |

### 2.2 Các tiến trình phổ biến

**Tiến trình I–IV–V–I** (Tonic–Subdominant–Dominant–Tonic): cổ điển nhất, kết authentic V→I.

**Tiến trình I–vi–IV–V**: phổ biến trong pop ("50s progression"), kết half cadence hoặc authentic.

**Tiến trình I–vi–ii–V**: jazz flavor nhẹ, hướng đến kết authentic.

**Tiến trình I–IV–vi–V**: biến thể của pop progression.

### 2.3 Tiến trình ví dụ capstone (8 ô nhịp)

| Ô nhịp | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 |
|--------|---|---|---|---|---|---|---|---|
| Hợp âm | **C** | **Am** | **F** | **G** | **C** | **F** | **G** | **C** |
| Số La Mã | I | vi | IV | V | I | IV | V | I |
| Chức năng | T | T | S | D | T | S | D | T |

Tiến trình này chia 2 câu 4 ô nhịp giống nhau về cấu trúc chức năng (T–T–S–D) nhưng câu 2 thay vi bằng lặp lại hành trình S–D–T để kết dứt khoát hơn. Ô nhịp 7→8 là **authentic cadence** (G→C = V→I).

> ⚠ **Lỗi thường gặp.** Đặt V (dominant) ngay trước ô nhịp 1 hoặc cuối đoạn mà không giải quyết về I → đoạn nhạc "treo lơ lửng", không có điểm kết. Luôn kiểm tra: đoạn kết cuối cùng có phải V→I (authentic) hoặc IV→I (plagal) không?

> ❓ **Câu hỏi tự nhiên.**
> - *"Có thể dùng hợp âm bậc ii hoặc vii° không?"* — Được. ii thay IV (cùng chức năng S), vii° thay V (cùng chức năng D). Nhưng với đoạn ngắn 8 ô, I/IV/V/vi là đủ.
> - *"Tiến trình có cố định không hay đổi giữa chừng?"* — Có thể thay đổi trong câu 2 để tạo tương phản. Đây là bước phát triển tự nhiên sau khi nắm được khuôn cơ bản.

> 🔁 **Dừng lại tự kiểm tra.**
> Cho gam G trưởng, hợp âm bậc IV là gì và thuộc chức năng nào?
> <details><summary>Đáp án</summary>
>
> Gam G trưởng: G–A–B–C–D–E–F♯. Bậc IV = C major (C–E–G). Chức năng: **S** (Subdominant). Nhận xét: hợp âm IV của G trưởng chính là hợp âm I của C trưởng — đây là lý do C và G hay xuất hiện cùng nhau (circle of fifths).
> </details>

> 📝 **Tóm tắt mục 2.** 7 hợp âm diatonic chia 3 nhóm chức năng T-S-D. Tiến trình tốt thường đi theo vòng T→S→D→T. Đoạn kết phải có cadence rõ ràng, thường là V→I.

---

## 3. Bước 3 — Viết giai điệu

> 💡 **Trực giác.** Giai điệu là "giọng hát" bên trên nền hợp âm. Nó có cuộc sống riêng — lên xuống, nghỉ ngơi, căng thẳng — nhưng phải "ăn ý" với hợp âm bên dưới. Điều đó có nghĩa: nốt giai điệu thường là **nốt của hợp âm đang đệm** (chord tones), hoặc **nốt đi qua** (passing tones) nằm trong gam.

### 3.1 Nguyên tắc viết giai điệu

**Nguyên tắc 1 — Dùng nốt trong gam**: Mọi nốt giai điệu trong C trưởng phải là C–D–E–F–G–A–B (7 nốt diatonic). Tránh nốt ngoài gam ở giai đoạn đầu.

**Nguyên tắc 2 — Nhấn mạnh chord tones**: Ở phách mạnh (phách 1 và 3 trong 4/4), ưu tiên nốt của hợp âm đang đệm. Ví dụ: nếu ô nhịp đang là hợp âm C (C–E–G), phách 1 nên là C, E, hoặc G.

**Nguyên tắc 3 — Bước đi mượt (stepwise motion)**: Di chuyển theo bước (2 nốt liền nhau trong gam) nhiều hơn nhảy quãng xa (interval leap). Bước đi: C→D, D→E, E→F... Nhảy quãng: C→G, E→C...

**Nguyên tắc 4 — Đường nét (contour)**: Giai điệu nên có hình cong đẹp — lên đỉnh rồi xuống, hoặc arch shape. Tránh cứ đi lên mãi hoặc đứng yên một chỗ.

**Nguyên tắc 5 — Phát triển motif**: Bắt đầu bằng một motif 3–4 nốt, rồi lặp lại/biến tấu trong câu 2 (mô tiến — sequencing, đảo ngược, mở rộng).

### 3.2 Giai điệu ví dụ capstone (8 ô nhịp, C trưởng)

Mỗi ô nhịp 4/4 có 4 phách. Ghi theo phách:

| Ô | Hợp âm | Phách 1 | Phách 2 | Phách 3 | Phách 4 |
|---|--------|---------|---------|---------|---------|
| 1 | C (I) | **E5** | D5 | **C5** | D5 |
| 2 | Am (vi) | **E5** | F5 | **E5** | D5 |
| 3 | F (IV) | **C5** | D5 | **E5** | F5 |
| 4 | G (V) | **G5** | F5 | **E5** | D5 |
| 5 | C (I) | **E5** | D5 | **C5** | B4 |
| 6 | F (IV) | **A4** | B4 | **C5** | D5 |
| 7 | G (V) | **B4** | C5 | **D5** | C5 |
| 8 | C (I) | **C5** | G4 | **E4** | C4 |

**Phân tích giai điệu:**
- Motif gốc (ô 1): E5–D5–C5–D5 (4 nốt, hình cung xuống-lên).
- Ô 2: biến thể — giữ E5 nhưng lên F5 rồi quay về (phát triển lên).
- Ô 4: đỉnh G5 — điểm cao nhất (climax) của câu 1 ngay trên hợp âm V (tạo căng thẳng).
- Ô 8: kết về C5→G4→E4→C4 — arpeggio xuống tonic, cảm giác kết thúc dứt khoát.

> ⚠ **Lỗi thường gặp — "phá" hợp âm.** Nếu ô nhịp là G major (G–B–D) nhưng giai điệu đặt nốt F♮ (nốt ngoài hợp âm G) vào phách mạnh, âm thanh sẽ "xung đột" mạnh. F♮ có thể dùng làm passing tone ngắn ở phách yếu, nhưng phách 1 nên là G, B, hoặc D.

> ❓ **Câu hỏi tự nhiên.**
> - *"Nốt passing tone là gì?"* — Nốt không thuộc hợp âm, nằm giữa 2 chord tone, đi theo bước. Ví dụ: hợp âm C (C–E–G), đi C–D–E: nốt D là passing tone — nó "lướt qua" từ C đến E, không tạo xung đột vì thời gian ngắn và ở phách yếu.
> - *"Giai điệu phải đúng nốt chord tone 100% không?"* — Không. Quy tắc thực tế: phách mạnh (1,3) nên là chord tone hoặc nốt gam gần; phách yếu (2,4) linh hoạt hơn, passing tone được phép.

> 🔁 **Dừng lại tự kiểm tra.**
> Ô nhịp có hợp âm Am (A–C–E). Giai điệu đặt nốt B4 vào phách 1. B4 có phải chord tone không? Điều gì xảy ra?
> <details><summary>Đáp án</summary>
>
> B4 không phải chord tone của Am (Am = A–C–E, không có B). Đặt B vào phách 1 tạo **âm va chạm (dissonance)** — không hẳn là sai, nhưng sẽ nghe "căng" và đòi hỏi giải quyết ngay phách tiếp theo về A, C, hoặc E. Nếu muốn an toàn: dùng A4, C5, hoặc E5 cho phách 1; để B4 ở phách yếu (phách 2 hoặc 4).
> </details>

> 📝 **Tóm tắt mục 3.** Giai điệu tốt: dùng nốt gam, nhấn chord tones ở phách mạnh, di chuyển mượt, phát triển từ motif ngắn. Đường nét (lên-xuống-đỉnh-về) tạo cảm xúc tự nhiên.

---

## 4. Bước 4 — Chọn tiết tấu

> 💡 **Trực giác.** Tiết tấu là nhịp đập của giai điệu — cùng một chuỗi cao độ nhưng đổi tiết tấu sẽ nghe hoàn toàn khác. Một giai điệu cân bằng giữa nốt dài (nghỉ ngơi) và nốt ngắn (chuyển động).

### 4.1 Các giá trị nốt cơ bản (trong 4/4)

| Nốt | Giá trị | Số phách chiếm |
|-----|---------|----------------|
| Nốt tròn (whole note) | 4 phách | Cả ô nhịp |
| Nốt trắng (half note) | 2 phách | Nửa ô nhịp |
| Nốt đen (quarter note) | 1 phách | 1 phách |
| Nốt móc đơn (eighth note) | 1/2 phách | Nửa phách |

### 4.2 Chiến lược tiết tấu cho 8 ô nhịp

**Câu 1 (ô 1–4)**: Dùng nốt đen chủ yếu (4 nốt/ô) — ổn định, rõ ràng, dễ cảm nhận.

**Câu 2 (ô 5–8)**: Trộn nốt đen và nốt móc đơn — tạo tương phản, cảm giác chuyển động hơn. Ô kết (ô 8) dùng nốt trắng hoặc trắng có dấu chấm để cảm giác "thở" khi về tonic.

**Ví dụ capstone**: giai điệu ở mục 3 dùng hoàn toàn nốt đen (4 phách/ô = 4 nốt/ô) — đây là cách đơn giản nhất để tập trung vào cao độ trước, tiết tấu sau.

> ⚠ **Lỗi thường gặp.** Dùng quá nhiều nốt móc đơn liên tục từ đầu đến cuối → giai điệu mất điểm nhấn, nghe "chạy loạn". Quy tắc kinh nghiệm: câu kết (câu 2) nên có ít nhất 1 nốt dài (trắng) ở ô cuối để báo hiệu kết thúc.

> 📝 **Tóm tắt mục 4.** Nốt đen 4/ô = cách đơn giản nhất để bắt đầu. Thêm tương phản bằng nốt móc đơn ở câu 2. Ô kết dùng nốt dài để "thở".

---

## 5. Bước 5 — Chọn hình thức

> 💡 **Trực giác.** Hình thức là "bản đồ" của đoạn nhạc — nó xác định phần nào lặp lại, phần nào là mới, và phần nào là biến thể. Nghe nhạc mà không có hình thức là nghe một chuỗi ý tưởng không liên kết.

### 5.1 Hình thức 8 ô nhịp

Với 8 ô nhịp, 2 hình thức đơn giản nhất:

**Hình thức câu hỏi–đáp (antecedent–consequent)**: 2 câu 4 ô, câu 1 kết mở (half cadence IV→V hoặc V), câu 2 kết đóng (authentic V→I).

**Hình thức a–a' (lặp có biến thể)**: Câu 2 lặp lại câu 1 nhưng thay đổi phần kết (câu 1 kết mở → câu 2 kết đóng).

**Hình thức a–b (tương phản)**: Câu 2 hoàn toàn khác câu 1 về hướng giai điệu, tạo tương phản rõ rệt.

### 5.2 Ví dụ capstone dùng hình thức nào?

Ví dụ ở mục 2–3 dùng **câu hỏi–đáp** với **a–a' variation**:
- Câu 1 (ô 1–4): T–T–S–D — kết ở D (ô 4 = hợp âm G), tương đương half cadence.
- Câu 2 (ô 5–8): T–S–D–T — kết authentic V→I (ô 7→8 = G→C).

Câu 2 lặp lại chức năng T–S–D nhưng bỏ vi, thêm ô S–D bổ sung, và kết mạnh hơn → hình thức a–a'.

> ❓ **Câu hỏi tự nhiên.**
> - *"8 ô nhịp có đủ để gọi là một 'bài'?"* — 8 ô nhịp là một **period** (đoạn nhạc) — đủ để có ý nghĩa hoàn chỉnh. Bài hát pop thường gồm nhiều period (verse, chorus, bridge). Ở đây ta tập trung hoàn thiện 1 period trước.
> - *"Hình thức a-b-a (ba đoạn) có phù hợp với 8 ô không?"* — Thường không, vì mỗi đoạn cần đủ ô để phát triển. a-b-a phù hợp hơn với 16–32 ô nhịp (ví dụ ternary form).

> 📝 **Tóm tắt mục 5.** 8 ô nhịp = 1 period gồm 2 câu 4 ô. Hình thức câu hỏi–đáp (kết mở → kết đóng) là lựa chọn tự nhiên và rõ ràng nhất cho người mới.

---

## 6. Bước 6 — Phân tích lại bằng số La Mã và chức năng T-S-D

> 💡 **Trực giác.** Sau khi sáng tác, "đọc lại" đoạn nhạc của mình bằng ngôn ngữ hòa âm là bước trưởng thành. Nó giúp bạn thấy tại sao đoạn nhạc "hay" hoặc "chưa hay", và biết cần sửa gì. Đây cũng là kỹ năng cần thiết để phân tích nhạc của người khác.

### 6.1 Quy trình phân tích

**Bước A — Xác định điệu**: Nhìn vào nốt cuối cùng của giai điệu và hợp âm kết cuối. Ví dụ: kết về C major → điệu C trưởng.

**Bước B — Đánh số La Mã**: Đếm bậc của từng hợp âm trong gam. C = I, F = IV, G = V, Am = vi...

**Bước C — Gán chức năng**: T = I, iii, vi; S = II, IV; D = V, vii°.

**Bước D — Kiểm tra cadence**: Hai ô nhịp cuối là gì? V→I = authentic (mạnh nhất); IV→I = plagal (nhẹ hơn); I→V = half (mở); V→vi = deceptive (lừa).

**Bước E — Đánh giá mạch chức năng**: Đoạn nhạc có đi đúng hướng T→S→D→T không? Có điểm "kẹt" (D→S ngược chiều) không?

### 6.2 Phân tích đầy đủ ví dụ capstone

| Ô | Hợp âm | Số La Mã | Chức năng | Ghi chú |
|---|--------|----------|-----------|---------|
| 1 | C | I | T | Khai mở, ổn định |
| 2 | Am | vi | T | Thay thế I, thêm màu sắc |
| 3 | F | IV | S | Chuyển sang chuẩn bị |
| 4 | G | V | D | Căng thẳng — half cadence |
| 5 | C | I | T | Giải quyết về tonic — bắt đầu câu 2 |
| 6 | F | IV | S | Subdominant lần 2 |
| 7 | G | V | D | Căng thẳng lần 2 — mạnh hơn vì không bị "đệm" bởi vi |
| 8 | C | I | T | **Authentic cadence** V→I — kết đóng hoàn toàn |

**Nhận xét phân tích:**
- Mạch chức năng câu 1: T–T–S–D → tạo hướng đi rõ, nhưng kết ở D (mở).
- Mạch chức năng câu 2: T–S–D–T → hoàn chỉnh chu trình, kết đóng.
- Không có chuyển động D→S (sẽ nghe "lùi"), không có D liên tiếp (sẽ nghe "dập xăng").
- Kết authentic (G→C) ở ô 7→8 là điểm kết dứt khoát nhất trong hệ thống hòa âm tây phương.

> ⚠ **Lỗi thường gặp — phân tích nhầm bậc.** Trong a thứ (a minor), hợp âm bậc I là Am (không phải A major). Số La Mã viết thường (i, iv, v) = hợp âm thứ; viết hoa (I, IV, V) = hợp âm trưởng. Nhớ: chất lượng hợp âm phụ thuộc vào gam, không phải bạn chọn.

> ❓ **Câu hỏi tự nhiên.**
> - *"Phân tích số La Mã có tùy thuộc vào điệu không?"* — Hoàn toàn. Cùng hợp âm C major nhưng trong điệu C trưởng là I, trong điệu G trưởng là IV, trong điệu F trưởng là V. Số La Mã là vị trí tương đối, không phải tên hợp âm tuyệt đối.
> - *"Nếu đoạn nhạc có hợp âm ngoài diatonic thì sao?"* — Đó là mượn hợp âm (modal mixture) hoặc hợp âm chuyển điệu (modulation) — kiến thức ở [Lesson 06 — Modulation](../../02-Harmony/lesson-06-modulation/).

> 🔁 **Dừng lại tự kiểm tra.**
> Cho tiến trình: Am–F–C–G (lặp lại). Phân tích bằng số La Mã trong điệu C trưởng và gán chức năng T-S-D.
> <details><summary>Đáp án</summary>
>
> Am = vi (T), F = IV (S), C = I (T), G = V (D). Mạch chức năng: T–S–T–D (rồi lặp lại). Nhận xét: T–S–T là cách "lui về" tonic trước khi đẩy lên D — không sai nhưng ít "đà" hơn T–S–D liên tiếp. Tiến trình này phổ biến trong pop (ví dụ "Let Her Go" — Passenger, "Someone Like You" — Adele).
> </details>

> 📝 **Tóm tắt mục 6.** Phân tích = xác định điệu → đánh số La Mã → gán chức năng → kiểm tra cadence → đánh giá mạch T-S-D. Đây là kỹ năng đọc nhạc "ngược" — từ âm thanh ra lý thuyết.

---

## 7. Ví dụ sáng tác hoàn chỉnh — 8 ô nhịp C trưởng

Tổng hợp tất cả 6 bước vào một ví dụ đầy đủ để người học nghe và bắt chước.

### 7.1 Thông số tổng quát

- **Điệu**: C trưởng (C major)
- **Nhịp**: 4/4 — 4 phách/ô nhịp
- **Tempo**: 100 BPM (moderato)
- **Hình thức**: Câu hỏi–đáp (antecedent–consequent), a–a' variation

### 7.2 Tiến trình hợp âm đầy đủ

```
Ô 1: C major  (I)    — T
Ô 2: A minor  (vi)   — T
Ô 3: F major  (IV)   — S
Ô 4: G major  (V)    — D   [half cadence — câu hỏi]
Ô 5: C major  (I)    — T
Ô 6: F major  (IV)   — S
Ô 7: G major  (V)    — D
Ô 8: C major  (I)    — T   [authentic cadence — câu trả lời]
```

### 7.3 Giai điệu từng ô (4 nốt/ô nhịp = 4 phách nốt đen)

```
Ô 1 [C]:  E5 – D5 – C5 – D5      motif gốc: xuống-lên
Ô 2 [Am]: E5 – F5 – E5 – D5      biến thể: lên-xuống
Ô 3 [F]:  C5 – D5 – E5 – F5      stepwise lên đến F5
Ô 4 [G]:  G5 – F5 – E5 – D5      climax G5 — stepwise xuống
Ô 5 [C]:  E5 – D5 – C5 – B4      motif a' — thêm B4 xuống
Ô 6 [F]:  A4 – B4 – C5 – D5      stepwise lên, nối sang câu kết
Ô 7 [G]:  B4 – C5 – D5 – C5      B4 = leading tone của G (cảm âm)
Ô 8 [C]:  C5 – G4 – E4 – C4      arpeggio xuống tonic — kết dứt khoát
```

### 7.4 Phân tích hòa âm

- **Ô 1–2**: Tonic kép (I–vi) — ổn định, giới thiệu.
- **Ô 3–4**: S→D — tạo đà hướng về kết, nhưng câu 1 dừng ở D (G major) = half cadence.
- **Ô 5**: Tonic trở lại — câu trả lời bắt đầu.
- **Ô 6–7**: S→D lần 2 — mạnh hơn vì ô 7 có B4 (cảm âm, leading tone) trong giai điệu, tăng sức hút về C.
- **Ô 8**: Tonic — authentic cadence G→C hoàn chỉnh. Arpeggio C5→G4→E4→C4 xác nhận điệu C trưởng dứt khoát.

> 💡 **Vì sao đoạn này "hay"?** Ba yếu tố kết hợp: (1) mạch chức năng T–S–D cân bằng, không "kẹt"; (2) giai điệu có đỉnh (G5 ô 4) và hạ nhiệt dần về ô 8; (3) kết authentic V→I rõ ràng với leading tone B4 trong giai điệu tăng sức hút. Mỗi yếu tố một mình chỉ là quy tắc — kết hợp lại thành âm nhạc.

### 7.5 Nghe ví dụ này

Mở [visualization.html](./visualization.html), nhấn **"Nạp ví dụ mẫu"** rồi **"▶ Phát cả bài"** để nghe giai điệu + đệm hợp âm cùng lúc. 🔊

---

## 8. Bài tập

**Bài 1.** Sáng tác tiến trình hợp âm 8 ô nhịp trong điệu G trưởng. Yêu cầu: phải có ít nhất một hợp âm S (bậc IV hoặc ii), một hợp âm D (bậc V), và kết bằng authentic cadence V→I. Phân tích bằng số La Mã và chức năng T-S-D.

**Bài 2.** Phân tích đoạn nhạc sau (điệu C trưởng):
Tiến trình: C – G – Am – F – C – G – F – C
Đánh số La Mã, gán chức năng T-S-D, nhận xét cadence ở ô 7→8.

**Bài 3.** Cho giai điệu và hợp âm sau (ô nhịp 3, hợp âm G major):
Giai điệu phách 1: **F♯4**, phách 2: G4, phách 3: **A4**, phách 4: B4.
Các nốt nào là chord tones của G major? Nốt nào là passing tone? Phách 1 có F♯4 đúng nguyên tắc không?

**Bài 4.** Viết câu trả lời (câu 2, ô 5–8) cho câu hỏi sau (câu 1, ô 1–4 trong C trưởng):
```
Ô 1 [C]: G4–A4–B4–C5
Ô 2 [Am]: E5–D5–C5–B4
Ô 3 [F]: A4–G4–F4–E4
Ô 4 [G]: D4–E4–F4–G4   (kết mở, kết ở bậc V)
```
Câu 2 phải kết authentic (V→I), giai điệu kết thúc bằng nốt C. Viết tiến trình + giai điệu + phân tích.

**Bài 5.** Nghe một đoạn nhạc quen thuộc (bài hát bạn biết) và phân tích: (a) điệu gì? (b) tiến trình 4 ô đầu là gì (số La Mã)? (c) kết đoạn đầu là loại cadence nào? Đây là bài tập mở — không có đáp án duy nhất.

---

## Lời giải chi tiết

**Bài 1 — Lời giải mẫu (G trưởng)**

Gam G trưởng: G–A–B–C–D–E–F♯.
Hợp âm diatonic: I=G, ii=Am, iii=Bm, IV=C, V=D, vi=Em, vii°=F♯°.

**Tiến trình mẫu:**

| Ô | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 |
|---|---|---|---|---|---|---|---|---|
| Hợp âm | G | Em | C | D | G | C | D | G |
| Số La Mã | I | vi | IV | V | I | IV | V | I |
| Chức năng | T | T | S | D | T | S | D | T |

Nhận xét: Mạch T–T–S–D–T–S–D–T hoàn toàn hợp lý. Ô 7→8 (D→G) = authentic cadence trong G trưởng. Cấu trúc giống hệt ví dụ capstone trong C trưởng — chứng tỏ quy trình T-S-D di chuyển được giữa các điệu mà không thay đổi cấu trúc.

**Giai điệu mẫu (G trưởng, 4 phách nốt đen/ô):**
```
Ô 1 [G]:  B4–A4–G4–A4
Ô 2 [Em]: B4–C5–B4–A4
Ô 3 [C]:  G4–A4–B4–C5
Ô 4 [D]:  D5–C5–B4–A4   [half cadence]
Ô 5 [G]:  B4–A4–G4–F#4
Ô 6 [C]:  E4–F#4–G4–A4
Ô 7 [D]:  C5–B4–A4–C5
Ô 8 [G]:  B4–D5–G4–G4   [authentic cadence D→G]
```

---

**Bài 2 — Phân tích**

Tiến trình: C–G–Am–F–C–G–F–C trong C trưởng.

| Ô | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 |
|---|---|---|---|---|---|---|---|---|
| Số La Mã | I | V | vi | IV | I | V | IV | I |
| Chức năng | T | D | T | S | T | D | S | T |

**Nhận xét cadence ô 7→8**: IV→I (F→C) = **plagal cadence** (kết biến — "Amen cadence"). Nghe nhẹ nhàng, ít dứt khoát hơn authentic cadence V→I.

**Nhận xét mạch chức năng**: Tiến trình có điểm không thông thường ở ô 2→3 (D→T) và ô 5→6 (T→D). Thứ tự T–D–T–S–T–D–S–T là hơi "không tuần tự" so với T→S→D→T cổ điển, nhưng V→vi (ô 6→3 trong câu 1) là **deceptive cadence** — tạo bất ngờ thú vị. Đây là tiến trình phổ biến trong nhạc rock/pop.

---

**Bài 3 — Chord tones và passing tones**

G major = G–B–D.

- Phách 1: **F♯4** — KHÔNG phải chord tone của G major (G major không có F♯ trong hợp âm, dù F♯ có trong gam G trưởng). Đặt F♯ ở phách mạnh tạo dissonance nhẹ. Tuy nhiên F♯ là **leading tone** (cảm âm) của G — nốt có sức hút mạnh về G. Đặt F♯4 phách 1 rồi G4 phách 2 tạo hiệu ứng "giải quyết" ngay trong ô — kỹ thuật này gọi là **appoggiatura** (nốt tựa). Không phải sai, nhưng cần ý thức rõ.
- Phách 2: G4 — chord tone của G major ✓ (root).
- Phách 3: **A4** — KHÔNG phải chord tone (A không có trong G–B–D). Ở phách 3 (phách mạnh thứ 2 trong 4/4) — tương tự phách 1, tạo dissonance nhẹ. A4 → B4 (phách 4) là passing tone nếu A4 đi theo bước.
- Phách 4: B4 — chord tone của G major ✓ (third).

**Kết luận**: Phách 1 có F♯4 — không phải chord tone nhưng là leading tone, tạo appoggiatura về G4. Chấp nhận được nếu ý thức rõ. Phách 3 A4 là passing tone (A→B). Chỉ phách 2 (G4) và phách 4 (B4) là chord tone thuần.

---

**Bài 4 — Câu trả lời mẫu**

Câu 1 đã cho kết ở D (ô 4, hợp âm G dominant). Câu 2 cần kết V→I (G→C).

**Tiến trình câu 2:** C–F–G–C (I–IV–V–I = T–S–D–T).

**Giai điệu câu 2:**
```
Ô 5 [C]: E5–D5–C5–B4    (gương câu 1 nhưng xuống B4)
Ô 6 [F]: A4–B4–C5–D5    (stepwise lên — chuẩn bị leo lên)
Ô 7 [G]: E5–D5–B4–D5    (chord tones G: G/B/D — chọn B4 làm leading tone)
Ô 8 [C]: C5–E5–G4–C4    (arpeggio C major về tonic — kết đóng)
```

**Phân tích**: Ô 8 kết bằng C4 (root của tonic) — dứt khoát nhất. Leading tone B4 ở ô 7 phách 3 tạo sức hút về C5. Authentic cadence G→C hoàn thành.

---

## Code & Minh họa

- 🎹 [visualization.html](./visualization.html) — **Xưởng sáng tác mini**: chọn điệu, xếp tiến trình hợp âm, đặt nốt giai điệu trên piano-roll, phát cả bài với đệm hợp âm đồng thời. Có nút "Nạp ví dụ mẫu" để nghe ngay đoạn nhạc C trưởng ở mục 7. **🔊 Bật loa.**

> Bài Capstone không kèm `solutions.go` vì sáng tác âm nhạc là kỹ năng sáng tạo — trải nghiệm tốt nhất là qua giao diện tương tác, không phải code Go đứng yên.

---

## Kết thúc lĩnh vực Music

### Những gì bạn đã học qua 3 tầng

**Tầng 1 — Fundamentals (8 bài)**
Nền tảng vật lý và ký hiệu: âm thanh là sóng tần số, 12 nốt equal temperament, tên nốt và bàn phím, ký hiệu nốt và hàng kẻ, khoảng cách (interval), gam trưởng (whole-half pattern), gam thứ và các mode, nhịp và phách, hóa biểu và vòng quãng 5.

**Tầng 2 — Harmony (8 bài)**
Hòa âm và cấu trúc: hợp âm 3 nốt (triad), hợp âm 7, hợp âm theo bậc diatonic và số La Mã, tiến trình và cadence, đảo thế và dẫn giọng, chuyển điệu (modulation), hợp âm mở rộng (7th/9th/sus), phân tích chức năng T-S-D.

**Tầng 3 — Applied & Composition (8 bài)**
Ứng dụng thực tế: âm sắc và harmonics, temperament và tuning, giai điệu và motif, nhịp nâng cao (polyrhythm, groove), hình thức âm nhạc, đối âm (counterpoint), jazz và blues (blues scale, ii-V-I, modal jazz), và bài Capstone này.

### Đi tiếp từ đây

**Hòa âm cổ điển nâng cao**: Học các kỹ thuật hòa âm của thế kỷ 18–19 — Schenkerian analysis, chromaticism (hóa âm màu), Neapolitan chord, augmented sixth chords. Sách tham khảo: *Tonal Harmony* (Kostka & Payne).

**Jazz nâng cao**: Từ ii-V-I cơ bản mở rộng sang substitution (tritone sub), chord-scale theory, reharmonization. Sách: *The Jazz Theory Book* (Mark Levine).

**Sản xuất nhạc số (Music Production)**: Dùng DAW (Digital Audio Workstation — Ableton Live, Logic Pro, FL Studio) để biến lý thuyết thành âm nhạc thật với nhiều nhạc cụ ảo và hiệu ứng.

**Phân tích tác phẩm**: Chọn một bản nhạc yêu thích và phân tích toàn bộ — hình thức, tiến trình, motif, cadence. Đây là cách học nhanh nhất khi đã có nền tảng.

---

[⬆ Về Applied & Composition](../index.html) · [🏠 Trang chính Music](../../index.html)
