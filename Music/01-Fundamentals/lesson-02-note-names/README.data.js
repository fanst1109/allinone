// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: Music/01-Fundamentals/lesson-02-note-names/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 02 — Tên nốt & bàn phím piano

> **Tầng 1 — Fundamentals · Bài 2/8**

Bài này trả lời câu hỏi: **tại sao piano có 88 phím nhưng chỉ có 7 tên chữ cái?** Ta sẽ thấy hệ thống tên nốt A–B–C–D–E–F–G là "bản đồ" của 7 phím trắng trong mỗi octave, còn 5 phím đen ở giữa được đặt tên bằng dấu thăng (♯) hoặc giáng (♭). Hiểu bàn phím piano là nền tảng để đọc khuông nhạc, xây hợp âm và phân tích giai điệu.

## Mục tiêu học tập

Sau bài này, bạn có thể:

- Gọi tên đúng 12 nốt trong một octave (7 phím trắng + 5 phím đen).
- Xác định vị trí bất kỳ nốt nào trên bàn phím chỉ bằng quy tắc nhóm phím đen 2–3.
- Giải thích dấu hóa: thăng (♯), giáng (♭), bình (♮) và cách chúng dịch chuyển cao độ.
- Nhận biết và liệt kê các cặp nốt **enharmonic** (cùng phím, khác tên).
- Đọc được ký hiệu **scientific pitch notation** (C4, A4, B3…) và biết đô giữa = C4.
- Xác định cặp nửa cung tự nhiên (E–F và B–C) và phân biệt với nguyên cung.

## Kiến thức tiền đề

- Khái niệm **nửa cung (semitone / half step)** và **công thức tần số** \`f = 440·2^(n/12)\` → xem [\`lesson-01-sound-pitch\`](../lesson-01-sound-pitch/).
- Bài này **không yêu cầu** biết đọc khuông nhạc — đó là nội dung của Lesson 03.

---

## 1. Bảy tên chữ cái và bàn phím

> 💡 **Trực giác.** Tưởng tượng bàn phím piano là một cái thang gác lặp đi lặp lại: mỗi tầng có 7 bậc (A B C D E F G), xong lại về bậc 1 ở tầng trên. Tầng ấy chính là **octave**. 7 bậc = 7 phím trắng; các phím đen nằm *giữa* một số bậc như ô cửa sổ trên mỗi bậc.

Nhạc phương Tây đặt tên nốt bằng **7 chữ cái**: A · B · C · D · E · F · G, rồi lặp lại. 7 chữ này tương ứng với **7 phím trắng** trong một octave. Sau G lại đến A — nhưng A ở octave cao hơn (tần số gấp đôi).

**Thứ tự trên bàn phím (từ trái sang phải, thấp lên cao):**

\`\`\`
C – D – E – F – G – A – B – C – D – E – F – G – A – B – ...
\`\`\`

Lưu ý: octave **bắt đầu từ C**, không phải A. Vì vậy dãy một octave đầy đủ là: C → D → E → F → G → A → B → (C kế tiếp).

**Ví dụ 4 nốt C trong các octave:**

| Tên | Tần số | Vị trí trên piano |
|-----|--------|-------------------|
| C2 | 65.41 Hz | rất trầm (phía trái) |
| C4 | 261.63 Hz | "đô giữa" — trung tâm bàn phím |
| C5 | 523.25 Hz | một octave trên đô giữa |
| C6 | 1046.5 Hz | khá cao |

> ⚠ **Lỗi thường gặp: nhầm thứ tự chữ cái.** Nhiều người nghĩ bàn phím bắt đầu từ A, hoặc thứ tự là A–B–C–D–E–F–G đọc từ trái. Thực ra **phím trắng thấp nhất của piano chuẩn là A0**, nhưng **octave luôn bắt đầu từ C**. Ví dụ: bàn phím 88 phím bắt đầu từ A0, nhưng C1 là ba phím tiếp theo (A0→B0→C1). Thứ tự tuyến tính trên bàn phím là: …A B **C D E F G A B C D E F G**… (C luôn "mở đầu octave").

> ❓ **Câu hỏi tự nhiên của người đọc.**
> - *"Vì sao có đúng 7 chữ cái, không phải 12 cho mỗi nốt?"* — Hệ thống chữ cái xuất phát từ 7 nốt của **gam (scale) Tây phương truyền thống** (gam đô trưởng: C D E F G A B). 5 nốt còn lại (phím đen) được gắn tên dẫn xuất bằng dấu ♯/♭ — xem mục 3.
> - *"Thứ tự A B C D E F G hay C D E F G A B?"* — Về mặt chữ cái thì A đứng đầu bảng chữ, nhưng về âm nhạc, **C là nốt "gốc" của octave** vì gam đô trưởng là gam không có dấu hóa nào (toàn phím trắng). Octave "C4" tính từ C4 đến B4 (rồi C5).

> 📝 **Tóm tắt mục 1.**
> - 7 tên: C D E F G A B — tương ứng 7 phím trắng, lặp mỗi octave.
> - Octave bắt đầu từ C, kết thúc ở B trước C kế tiếp.
> - Piano 88 phím dùng octave 0–7 (và một ít phím octave 8).

---

## 2. Mốc định vị: nhóm phím đen 2 và 3

> 💡 **Trực giác.** Nhìn bàn phím từ xa: phím đen mọc thành từng cụm — cụm 2 phím xen kẽ với cụm 3 phím. Cụm 2 giống chữ "II", cụm 3 giống chữ "III". Quy luật này **lặp đi lặp lại hoàn toàn đều đặn** và là "GPS" giúp bạn định vị mọi nốt mà không cần nhìn nhãn.

Nhìn một phím trắng, bạn chỉ cần nhớ:

- **C luôn ở ngay bên trái cụm 2 phím đen.**
- **F luôn ở ngay bên trái cụm 3 phím đen.**

Từ đó suy ra hết:

| Phím trắng | Vị trí nhận dạng |
|-----------|-----------------|
| **C** | Trái cụm 2 phím đen |
| D | Giữa 2 phím đen (cụm 2) |
| **E** | Phải cụm 2 phím đen |
| **F** | Trái cụm 3 phím đen |
| G | Phím đen đầu / giữa cụm 3 |
| A | Phím đen giữa / cuối cụm 3 |
| **B** | Phải cụm 3 phím đen |

**Ví dụ nhận dạng nhanh (4 trường hợp):**

1. Nhìn thấy cụm 2 phím đen → phím trắng bên trái là **C**, bên phải là **E**.
2. Nhìn thấy cụm 3 phím đen → phím trắng bên trái là **F**, bên phải là **B**.
3. Phím trắng nằm *giữa* cụm 2 → là **D**.
4. Phím trắng ở giữa cụm 3 (kẹp giữa 2 phím đen) → là **G** (đứng trước A, A đứng trước B).

> 🔁 **Dừng lại tự kiểm tra.**
> Nhìn vào bàn phím thật (hoặc viz), tìm ngay:
> 1. Tìm C4 ("đô giữa") bằng cụm 2 phím đen.
> 2. Phím trắng nằm ngay phải cụm 3 phím đen là gì?
>
> <details><summary>Đáp án</summary>
>
> 1. C4 nằm ngay bên **trái** cụm 2 phím đen gần giữa bàn phím (trên đàn piano thật có nhãn "middle C" hoặc gần đó).
> 2. Ngay bên phải cụm 3 phím đen là **B**.
> </details>

> 📝 **Tóm tắt mục 2.**
> - Cụm 2 phím đen: C (trái) – D (giữa) – E (phải).
> - Cụm 3 phím đen: F (trái) – G – A – B (phải).
> - Hai quy tắc vàng: "C trái cụm 2" và "F trái cụm 3".

---

## 3. Dấu hóa: ♯ thăng, ♭ giáng, ♮ bình

> 💡 **Trực giác.** Hình dung thang âm C D E F G A B là thang gỗ có 7 bậc. Dấu thăng (♯) như một chiếc nêm đặt dưới bậc, nâng nó lên **nửa bậc**. Dấu giáng (♭) như móc kéo bậc xuống **nửa bậc**. Kết quả: bạn bước đến một "nửa bậc" nằm *giữa* hai bậc — đó chính là phím đen!

- **Thăng (♯ — sharp)**: nâng nốt lên **1 nửa cung (half step)**. Ví dụ: C♯ cao hơn C một nửa cung, nằm trên phím đen ngay phải C.
- **Giáng (♭ — flat)**: hạ nốt xuống **1 nửa cung**. Ví dụ: D♭ thấp hơn D một nửa cung, nằm trên phím đen ngay trái D.
- **Bình (♮ — natural)**: **hủy bỏ** dấu ♯ hoặc ♭ đang có hiệu lực, trở về nốt tự nhiên (phím trắng).

**Ví dụ 4 dấu hóa cụ thể:**

| Tên nốt | Mô tả | Vị trí |
|---------|-------|--------|
| F♯ (F thăng) | F + nửa cung lên | Phím đen nằm giữa F và G |
| B♭ (B giáng) | B − nửa cung xuống | Phím đen nằm giữa A và B |
| E♯ (E thăng) | E + nửa cung lên | Chính là phím trắng F (!) |
| C♭ (C giáng) | C − nửa cung xuống | Chính là phím trắng B (!) |

Hai dòng cuối là trường hợp đặc biệt — E♯ và F là cùng một phím. Xem chi tiết ở mục 4.

> ⚠ **Lỗi thường gặp: nghĩ dấu ♯/♭ chỉ dành cho phím đen.** Sai! E♯ = F, B♯ = C, F♭ = E, C♭ = B — đây là **phím trắng** nhưng vẫn có tên với dấu hóa. Trong nhiều bài bản, ký hiệu E♯ hoặc C♭ xuất hiện vì lý do lý thuyết (giữ cho gam có đúng 7 tên khác nhau), dù chúng chơi trên phím trắng.

> ❓ **Câu hỏi tự nhiên của người đọc.**
> - *"Dấu hóa trong bản nhạc có hiệu lực bao lâu?"* — Trong ký âm pháp, một dấu hóa đặt trước nốt **có hiệu lực cho đến hết ô nhịp đó** (và hủy khi gặp dấu ♮ hoặc ô nhịp mới). Đây là quy tắc của khuông nhạc — sẽ học ở Lesson 03.
> - *"Có thể có dấu "kép" không?"* — Có: **𝄪 (double sharp)** nâng 2 nửa cung (=1 nguyên cung), **𝄫 (double flat)** hạ 2 nửa cung. Chúng xuất hiện trong lý thuyết hòa âm nâng cao (ít dùng trong thực tế cơ bản).

> 📝 **Tóm tắt mục 3.**
> - ♯ tăng 1 nửa cung lên; ♭ hạ 1 nửa cung; ♮ hủy dấu hóa.
> - Phần lớn phím đen có tên kép (C♯ hoặc D♭), một số phím trắng cũng dùng dấu hóa (E♯=F, B♯=C...).

---

## 4. Half step và whole step — E–F và B–C đặc biệt

> 💡 **Trực giác.** Trên bàn phím, hai phím sát nhau (không có gì ở giữa) cách nhau 1 nửa cung. Hầu hết các cặp phím trắng liền kề đều có phím đen xen giữa — nên chúng cách nhau **1 nguyên cung (whole step)**. Nhưng hai cặp **E–F** và **B–C** thì *không* có phím đen ở giữa — nên chúng chỉ cách nhau **1 nửa cung**.

**12 nửa cung trong một octave (C4→C5):**

\`\`\`
C  C♯/D♭  D  D♯/E♭  E  F  F♯/G♭  G  G♯/A♭  A  A♯/B♭  B  C
|  1        |  1        | 0.5 |  1        |  1        |  1        | 0.5 |
\`\`\`

*(Số bên dưới: khoảng cách theo nguyên cung — 0.5 = nửa cung, 1 = nguyên cung)*

**Ví dụ đếm nửa cung cụ thể (≥ 4):**

1. **C → D**: qua C♯ → 2 nửa cung = 1 nguyên cung.
2. **E → F**: **không qua phím đen** → 1 nửa cung (half step).
3. **B → C**: **không qua phím đen** → 1 nửa cung (half step).
4. **C → E**: C→C♯→D→D♯→E → 4 nửa cung = 2 nguyên cung.
5. **F → G**: F→F♯→G → 2 nửa cung = 1 nguyên cung.

**Quy tắc nhớ nhanh: "EF và BC không có phím đen"**

Trong 7 cặp phím trắng liền kề (C–D, D–E, E–F, F–G, G–A, A–B, B–C):
- **5 cặp** có phím đen ở giữa → cách nhau **1 nguyên cung** (C–D, D–E, F–G, G–A, A–B).
- **2 cặp** không có phím đen ở giữa → cách nhau **1 nửa cung** (E–F, B–C).

> ⚠ **Lỗi thường gặp: nghĩ mọi cặp phím trắng liền kề đều cách nhau 1 nguyên cung.** Sai! E–F và B–C chỉ cách nhau nửa cung — đây là hai "bẫy" phổ biến nhất khiến người mới bị sai khi xây gam hay hợp âm. Ví dụ phản chứng: E4 = 329.63 Hz, F4 = 349.23 Hz; hiệu tần số = 19.6 Hz ≈ 1 nửa cung; trong khi C4→D4: 261.63→293.66 Hz, hiệu = 32 Hz ≈ 2 nửa cung (gấp đôi).

> 🔁 **Dừng lại tự kiểm tra.** Liệt kê tất cả các cặp phím trắng liền kề là **nửa cung** (half step) trong một octave từ C đến B.
> <details><summary>Đáp án</summary>
>
> Chỉ có **2 cặp**: **E–F** và **B–C**. Tất cả các cặp phím trắng liền kề khác đều là nguyên cung (whole step).
> </details>

> 📝 **Tóm tắt mục 4.**
> - Half step (nửa cung): khoảng cách nhỏ nhất trên bàn phím — hai phím liền kề nhau.
> - Whole step (nguyên cung): = 2 nửa cung.
> - E–F và B–C là 2 cặp phím trắng cách nhau nửa cung (không có phím đen xen giữa).

---

## 5. Enharmonic — cùng phím, khác tên

> 💡 **Trực giác.** Địa chỉ "Đường Lê Lợi số 5" và "Tòa nhà ABC, tầng trệt" có thể trỏ tới cùng một căn phòng. Tương tự, C♯ và D♭ là hai *tên khác nhau* cho **cùng một phím đen** — âm thanh phát ra hoàn toàn giống nhau. Ta gọi đó là **cặp enharmonic**.

**5 cặp enharmonic của phím đen:**

| Tên thăng | Tên giáng | Vị trí |
|-----------|-----------|--------|
| C♯ | D♭ | Phím đen giữa C và D |
| D♯ | E♭ | Phím đen giữa D và E |
| F♯ | G♭ | Phím đen giữa F và G |
| G♯ | A♭ | Phím đen giữa G và A |
| A♯ | B♭ | Phím đen giữa A và B |

**Enharmonic của phím trắng (ít phổ biến hơn, nhưng quan trọng về lý thuyết):**

| Tên 1 | Tên 2 | Ghi chú |
|-------|-------|---------|
| E♯ | F | E + nửa cung = F |
| B♯ | C | B + nửa cung = C |
| F♭ | E | F − nửa cung = E |
| C♭ | B | C − nửa cung = B |

**Vì sao có hai tên?** Trong lý thuyết hòa âm, chọn tên nốt phụ thuộc vào **bối cảnh gam**. Ví dụ:
- Gam D♭ trưởng dùng D♭ (không dùng C♯) để giữ cho gam có đúng 7 tên chữ cái khác nhau.
- Gam B trưởng dùng A♯ (không phải B♭) vì B♭ sẽ trùng tên với chính nốt gốc B.

> ⚠ **Lỗi thường gặp: nghĩ enharmonic là "sai tên".** Không có tên nào sai — cả hai đều chính xác trong bối cảnh phù hợp. Nhạc lý chọn tên nốt dựa trên gam và chức năng hòa âm, không phải tùy tiện.

> ❓ **Câu hỏi tự nhiên của người đọc.**
> - *"Trên nhạc cụ dây và kèn, enharmonic có thực sự cùng cao độ không?"* — Không hẳn! Trên nhạc cụ **equal temperament** (piano, gitar fret) thì C♯ = D♭ hoàn toàn. Nhưng trên nhạc cụ **just intonation** (violon kéo tự do, bè hát a cappella), C♯ và D♭ hơi khác tần số nhau (~20 cents). Bài này dùng equal temperament (12-TET).
> - *"Tại sao lại cần enharmonic nếu âm nghe y hệt nhau?"* — Vì ký âm pháp có quy tắc: mỗi nốt trong gam phải có tên chữ cái khác nhau. Gam F# major có F# G# A# B C# D# E# — phải viết E# thay vì F để tránh trùng tên F ở đầu gam.

> 🔁 **Dừng lại tự kiểm tra.** Nốt nào là enharmonic với D♯?
> <details><summary>Đáp án</summary>
>
> **E♭** (E giáng). D♯ = D + nửa cung lên; E♭ = E − nửa cung xuống; cả hai đều trỏ tới phím đen nằm giữa D và E.
> </details>

> 📝 **Tóm tắt mục 5.**
> - Enharmonic = hai tên khác nhau, cùng một phím (cùng tần số trong 12-TET).
> - 5 phím đen mỗi octave đều có tên kép (♯ và ♭).
> - 4 phím trắng đặc biệt: E♯=F, B♯=C, F♭=E, C♭=B.

---

## 6. Scientific Pitch Notation — số octave

> 💡 **Trực giác.** Chỉ nói "nốt A" là chưa đủ — cần biết "A nào" vì có A2, A3, A4, A5 với tần số khác nhau. Scientific pitch notation (SPN) gắn số octave vào sau tên nốt để phân biệt, giống như địa chỉ cần tên đường lẫn số nhà.

**Quy tắc SPN:**
- Tên nốt + số octave. Ví dụ: **C4, A4, F♯3, B♭5**.
- Octave đánh số tăng dần từ thấp đến cao.
- **Octave bắt đầu từ C và kết thúc ở B**: C4 → D4 → E4 → F4 → G4 → A4 → B4 → **C5** (bắt đầu octave mới).
- **C4 = "đô giữa" (middle C)** — quy ước quốc tế, nằm gần giữa bàn phím piano 88 phím.

**Ví dụ số cụ thể (≥ 4):**

| Tên | Tần số | Ghi chú |
|-----|--------|---------|
| **A4** | **440.00 Hz** | Nốt chuẩn quốc tế (concert pitch, ISO 16) |
| **C4** | 261.63 Hz | "Đô giữa" (middle C) — MIDI 60 |
| B3 | 246.94 Hz | Ngay dưới C4 (B là nốt cuối octave 3) |
| C5 | 523.25 Hz | C4 × 2 — octave trên đô giữa |
| F♯4 | 369.99 Hz | F thăng, octave 4 |
| B♭2 | 116.54 Hz | B giáng, octave 2 |

**Ranh giới octave:**

\`\`\`
… A3 – B3 – C4 – D4 – E4 – F4 – G4 – A4 – B4 – C5 – D5 – …
         ↑                                          ↑
   kết thúc octave 3                        bắt đầu octave 5
\`\`\`

Lưu ý: A3 và A4 ở **khác** octave dù tên chữ cái giống nhau. Ranh giới nằm giữa B3 và C4, không phải giữa A3 và A4.

> ⚠ **Lỗi thường gặp: nghĩ octave thay đổi sau A (vì A là đầu bảng chữ cái).** Sai! Octave đổi số sau B → C, không phải sau A. Ví dụ: B3 → C4 (số tăng); A4 → B4 → C5 (số tăng sau B).

> ❓ **Câu hỏi tự nhiên của người đọc.**
> - *"C4 = middle C vì sao gọi là 'giữa'?"* — Vì nó nằm gần chính giữa của bàn phím piano 88 phím (phím thứ 40 từ trái), và trong khuông nhạc nó nằm trên một đường kẻ phụ ngay giữa hai khuông treble và bass — "giữa" theo cả nghĩa vật lý lẫn lý thuyết.
> - *"Piano 88 phím đi từ đâu tới đâu?"* — A0 (27.50 Hz) đến C8 (4186 Hz). Tổng cộng 7 octave đầy đủ (A0 đến A7) cộng thêm 3 phím nữa lên đến C8.

> 🔁 **Dừng lại tự kiểm tra.**
> 1. Nốt nào là ngay trước C5 (thấp hơn một nửa cung)?
> 2. Tên đầy đủ của nốt "A" trong octave có C4?
>
> <details><summary>Đáp án</summary>
>
> 1. Ngay trước C5 (thấp hơn 1 nửa cung) là **B4** (phím trắng) — không phải B♭4 hay C♭5.
> 2. Octave chứa C4 là octave 4, nên nốt "A" trong octave đó là **A4** (= 440 Hz).
> </details>

> 📝 **Tóm tắt mục 6.**
> - SPN = tên nốt + số octave (C4, A4, B♭3...).
> - Octave đổi số sau B→C (không phải A→B).
> - C4 = đô giữa = 261.63 Hz = MIDI 60.
> - A4 = 440 Hz = nốt chuẩn quốc tế.

---

## Bài tập

1. **Nhận dạng phím.** Trên bàn phím piano, phím trắng nằm ngay bên phải cụm 2 phím đen là phím gì? Phím trắng nằm giữa (kẹp bởi 2 phím đen) của cụm 3 là gì?

2. **Đếm nửa cung.** Đếm số nửa cung giữa các cặp sau:
   - (a) C4 → G4
   - (b) E4 → A4
   - (c) B3 → F4

3. **Dấu hóa.** Nốt D♭4 là enharmonic với nốt nào? Hai nốt đó cách nhau bao nhiêu nửa cung? Tần số của chúng là bao nhiêu (dùng \`f = 440·2^(n/12)\`, n tính từ A4)?

4. **Scientific pitch notation.** Xác định số octave cho các nốt sau:
   - Nốt A có tần số 110 Hz → A?
   - Nốt C có tần số 523.25 Hz → C?
   - Nốt ngay dưới (thấp hơn 1 nửa cung) C5 là gì (tên đầy đủ SPN)?

5. **Half step vs whole step.** Liệt kê TẤT CẢ các khoảng di chuyển trong dãy C – D – E – F – G – A – B – C (octave kế tiếp) và ghi rõ từng bước là half step hay whole step. Tổng cộng bao nhiêu half step? Tổng cộng bao nhiêu whole step?

---

## Lời giải chi tiết

**Bài 1.**

- Nhóm 2 phím đen: phím trắng **bên trái** = C, phím **giữa** = D, phím **bên phải** = E. → Ngay bên phải cụm 2 phím đen là **E**.
- Nhóm 3 phím đen: phím trắng **bên trái** = F, giữa-phần đầu = G, **kẹp giữa 2 phím đen** = A (kẹp bởi phím đen thứ 2 và thứ 3 của cụm 3), bên phải = B. → Phím trắng kẹp bởi 2 phím đen trong cụm 3 là **A**.

**Bài 2.**

(a) C4 → G4: đếm C→C♯→D→D♯→E→F→F♯→G = **7 nửa cung** (quãng 5 đúng).

(b) E4 → A4: đếm E→F→F♯→G→G♯→A = **5 nửa cung** (quãng 4 đúng).

(c) B3 → F4: đếm B→C→C♯→D→D♯→E→F = **6 nửa cung** (quãng 3 tăng / tritone).

**Bài 3.**

D♭4 (D giáng) là enharmonic với **C♯4** (C thăng) — cùng phím đen nằm giữa C4 và D4.

Hai nốt enharmonic **không cách nhau nửa cung nào** — chúng là CÙNG MỘT PHÍM → khoảng cách = **0 nửa cung** (unison).

Tần số: n của C♯4 từ A4 = −8 (đếm xuống: A→G♯→G→F♯→F→E→D♯→D→C♯ = 8 bước).
\`f = 440 · 2^(−8/12) = 440 · 2^(−0.6667) = 440 · 0.6300 = \`**\`277.18 Hz\`**.

(Kiểm tra: bảng tần số chuẩn cho C♯4 / D♭4 ≈ 277.18 Hz ✓)

**Bài 4.**

- A có tần số 110 Hz = A4/4 = A4·(1/4) = xuống 2 octave → **A2**. (Kiểm tra: 110 × 2 = 220 Hz = A3; 220 × 2 = 440 Hz = A4 ✓ → A2 = 110 Hz.)
- C có tần số 523.25 Hz = C4 × 2 = C4 lên 1 octave → **C5**. (261.63 × 2 = 523.26 Hz ≈ 523.25 ✓)
- Ngay dưới C5 (thấp 1 nửa cung): octave của C5 là 5, và nốt ngay trước C5 phải là nốt cuối octave 4 → **B4**. (B4 = 493.88 Hz; C5 = 523.25 Hz; hiệu tương ứng đúng 1 nửa cung.)

**Bài 5.**

| Bước | Loại khoảng | Lý do |
|------|------------|-------|
| C → D | **Whole step** (1 nguyên cung) | Có C♯ ở giữa |
| D → E | **Whole step** | Có D♯ ở giữa |
| E → F | **Half step** (1 nửa cung) | Không có phím đen giữa E và F |
| F → G | **Whole step** | Có F♯ ở giữa |
| G → A | **Whole step** | Có G♯ ở giữa |
| A → B | **Whole step** | Có A♯ ở giữa |
| B → C (kế) | **Half step** | Không có phím đen giữa B và C |

Tổng: **2 half step** + **5 whole step** = 2×1 + 5×2 = **12 nửa cung** = 1 octave ✓.

(Đây chính là cấu trúc của gam đô trưởng: W–W–H–W–W–W–H, sẽ học kỹ ở Lesson 05.)

---

## Code & Minh họa

- 🎹 [visualization.html](./visualization.html) — bàn phím piano C4→C5 **bấm ra tiếng**, toggle 4 chế độ tên nốt (chữ cái / thăng / giáng / enharmonic), bộ đố ngẫu nhiên đoán tên phím, và minh họa half-step vs whole-step. **🔊 Bật loa để nghe.**

> Lĩnh vực âm nhạc minh họa tốt nhất bằng âm thanh tương tác nên bài này không kèm \`solutions.go\` — toàn bộ tính toán có trong viz và phần lời giải ở trên.

---

## Bài tiếp theo

→ **Lesson 03 — Khuông nhạc & ký âm**: cách viết nốt nhạc lên khuông 5 dòng kẻ, khóa Sol, khóa Fa, và đọc được vị trí nốt. *(Đang biên soạn.)*

[⬆ Về tầng Fundamentals](../index.html) · [🏠 Trang chính Music](../../index.html)
`;
