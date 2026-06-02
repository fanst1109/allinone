// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: Music/01-Fundamentals/lesson-07-rhythm-meter/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 07 — Nhịp & tiết tấu (Rhythm & Meter)

> **Tầng 1 — Fundamentals · Bài 7/8**

Mọi âm thanh đều có **cao độ** — điều đó ta đã biết từ Lesson 01. Nhưng âm nhạc không chỉ là nốt cao hay thấp; nó còn được tổ chức **theo thời gian**. Bài này trả lời câu hỏi: *làm sao nhạc sĩ biết chơi nốt vào lúc nào, dài bao lâu, và đâu là phách mạnh/phách nhẹ?* — Toàn bộ bí mật nằm ở **nhịp (meter)** và **tiết tấu (rhythm)**.

## Mục tiêu học tập

Sau bài này, bạn có thể:

- Giải thích phách (beat) là gì và tính thời lượng một phách từ BPM: \`duration = 60 / BPM\` giây.
- Đọc số chỉ nhịp (time signature): số trên = số phách/ô, số dưới = loại nốt làm 1 phách.
- Phân biệt nhịp đơn (simple) và nhịp kép (compound) qua cách chia phách.
- Xác định phách mạnh/phách nhẹ trong 4/4, 3/4, 2/4, 6/8.
- Kiểm tra tổng trường độ trong một ô nhịp có khớp số chỉ nhịp không.
- Nhận biết đảo phách (syncopation) sơ lược.

## Kiến thức tiền đề

- Trường độ nốt (nốt tròn, trắng, đen, móc đơn, móc kép…) → xem [\`../lesson-03-staff-notation/\`](../lesson-03-staff-notation/)
- Tên nốt & bàn phím → [\`../lesson-02-note-names/\`](../lesson-02-note-names/)
- Khuông nhạc & ký hiệu → [\`../lesson-03-staff-notation/\`](../lesson-03-staff-notation/)

---

## 1. Phách (beat) & Tempo

### 1.1 Phách là gì?

> 💡 **Trực giác.** Khi bạn vỗ tay theo bài hát hoặc gõ chân theo nhạc, bạn đang đánh **phách** (beat). Phách là đơn vị nhịp đập đều đặn của âm nhạc — giống như nhịp tim: đều, liên tục, có thể nhanh hoặc chậm nhưng luôn đều.

**Phách (beat)** là đơn vị nhịp đập cơ bản của âm nhạc. Mỗi phách tương ứng với một khoảng thời gian bằng nhau, liên tục nối tiếp nhau từ đầu đến cuối bài.

**(a) Là gì.** Phách đo **thời gian** — không phải cao độ. Một phách có thể có nốt nhạc, có thể im lặng (dấu lặng), nhưng thời gian trôi qua vẫn đúng bằng một phách.

**(b) Vì sao cần.** Nếu không có phách, nhạc sĩ không biết chơi nốt vào lúc nào. Phách là "đồng hồ" chung cho mọi người trong ban nhạc — kể cả khi không có nhạc cụ gõ nhịp, mỗi người tự nghe và giữ phách trong đầu.

**(c) Ví dụ cụ thể.**

| Bài / Thể loại | Cảm giác phách |
|---|---|
| Waltz (Luân vũ) | vỗ: *mạnh – nhẹ – nhẹ – mạnh – nhẹ – nhẹ…* (3 phách/nhóm) |
| March (Hành khúc) | vỗ: *mạnh – nhẹ – mạnh – nhẹ…* (2 phách/nhóm) |
| Rock, Pop | vỗ: *1 – 2 – 3 – 4 – 1 – 2 – 3 – 4…* (4 phách/nhóm) |

---

### 1.2 Tempo — tốc độ của phách

> 💡 **Trực giác.** Cùng một bài hát có thể đánh nhanh hay chậm tùy người hát. "Tốc độ" đó chính là **tempo**: chơi càng nhanh → phách ngắn lại; chơi càng chậm → phách kéo dài ra.

**Tempo** là **tốc độ phách**, đo bằng **BPM (beats per minute)** — số phách trong một phút.

#### Công thức thiết yếu

$$\\text{Thời lượng 1 phách (giây)} = \\frac{60}{\\text{BPM}}$$

**Walk-through bằng số thật (≥ 4 ví dụ):**

| BPM | Tính | Thời lượng 1 phách | Ghi chú |
|:---:|---|:---:|---|
| **60 BPM** | 60 ÷ 60 = **1.000 s** | 1.000 giây | Andante — chậm, uy nghi |
| **80 BPM** | 60 ÷ 80 = **0.750 s** | 0.750 giây | Moderato — vừa phải |
| **120 BPM** | 60 ÷ 120 = **0.500 s** | 0.500 giây | Allegro — nhanh; 2 phách/giây |
| **180 BPM** | 60 ÷ 180 = **0.333 s** | 0.333 giây | Presto — rất nhanh |
| **200 BPM** | 60 ÷ 200 = **0.300 s** | 0.300 giây | Metal/extreme — cực nhanh |

Kiểm chứng ngược: 120 BPM × 0.5 s = 60 s ✓ (60 giây = 1 phút).

> ⚠ **Lỗi thường gặp: lẫn BPM với số nốt mỗi giây.** 120 BPM *không phải* "120 nốt mỗi giây" — đó là 120 **phách** mỗi phút, tức 2 phách mỗi giây. Mỗi phách có thể chứa nhiều nốt (móc kép, chùm nốt) hoặc chỉ một nốt dài.

> ❓ **Câu hỏi tự nhiên của người đọc.**
> - *"Nhạc có thể thay đổi tempo trong bài không?"* — Có. Kỹ thuật *ritardando* (rit.) = chậm dần; *accelerando* (accel.) = nhanh dần. Thậm chí *rubato* cho phép nhạc sĩ co giãn tempo tự do trong một đoạn.
> - *"Metronome là gì?"* — Thiết bị (cơ học hoặc kỹ thuật số) tạo tiếng "tick" đều đặn theo BPM đặt sẵn, giúp nhạc sĩ luyện đúng tempo. Viz dưới đây có metronome thật để bạn thử.

> 🔁 **Dừng lại tự kiểm tra.** Một bài có tempo 90 BPM. Mỗi phách kéo dài bao nhiêu giây?
>
> <details><summary>Đáp án</summary>
>
> 60 ÷ 90 = **0.667 giây** (= 2/3 giây). Kiểm chứng: 90 × 0.667 ≈ 60 ✓.
> </details>

> 📝 **Tóm tắt mục 1.**
> - Phách (beat) = đơn vị nhịp đập đều của âm nhạc.
> - Tempo = tốc độ phách, đo bằng BPM (phách/phút).
> - Công thức vàng: **thời lượng 1 phách = 60 / BPM giây**.
> - 60 BPM = 1 phách/giây; 120 BPM = 2 phách/giây.

---

## 2. Ô nhịp & Số chỉ nhịp (Time Signature)

### 2.1 Ô nhịp (Measure/Bar)

> 💡 **Trực giác.** Khi đọc sách, văn bản được chia thành đoạn để dễ đọc. Trong nhạc, các phách được gom thành nhóm đều đặn gọi là **ô nhịp (measure/bar)**. Một ô nhịp tương tự như một "nhịp thở" của bài nhạc.

**Ô nhịp (measure/bar)** là nhóm cố định một số phách, được phân cách bằng **vạch nhịp (barline)** — đường dọc kẻ ngang khuông nhạc. Phách đầu tiên của mỗi ô nhịp thường là phách **mạnh nhất**.

Mỗi ô nhịp phải chứa tổng trường độ đúng bằng quy định — không thừa, không thiếu. Đây là quy tắc bắt buộc.

---

### 2.2 Số chỉ nhịp (Time Signature)

Số chỉ nhịp xuất hiện ở đầu bài (sau khóa nhạc), trông như một phân số:

$$\\frac{\\text{số TRÊN}}{\\text{số DƯỚI}}$$

**Số TRÊN** = **bao nhiêu phách** trong mỗi ô nhịp.

**Số DƯỚI** = **loại nốt** làm đơn vị 1 phách:

| Số dưới | Loại nốt | Trường độ tương đối |
|:---:|---|---|
| **2** | Nốt trắng (half note) | = 2 nốt đen |
| **4** | Nốt đen (quarter note) | = 1 phách cơ bản |
| **8** | Móc đơn (eighth note) | = ½ nốt đen |

> 💡 **Trực giác cho số dưới.** Nghĩ như phân số của nốt tròn: nốt đen = 1/4 nốt tròn → số dưới là 4. Móc đơn = 1/8 nốt tròn → số dưới là 8.

**Ví dụ số cụ thể (≥ 4 loại nhịp):**

| Số chỉ nhịp | Đọc là | Ý nghĩa | Ví dụ thể loại |
|:---:|---|---|---|
| **4/4** | "bốn – tư" | 4 nốt đen mỗi ô | Pop, rock, hầu hết bài phổ thông |
| **3/4** | "ba – tư" | 3 nốt đen mỗi ô | Waltz (luân vũ), mazurka |
| **2/4** | "hai – tư" | 2 nốt đen mỗi ô | March (hành khúc), polka |
| **6/8** | "sáu – tám" | 6 móc đơn mỗi ô | Barcarolle, nhiều bài dân ca |
| **3/8** | "ba – tám" | 3 móc đơn mỗi ô | Scherzo nhanh |
| **2/2** | "hai – hai" (cut time) | 2 nốt trắng mỗi ô | March nhanh, fugue |

> ⚠ **Lỗi thường gặp: nghĩ số dưới nói về "số phách nhỏ".** Không đúng. Số dưới nói về **loại nốt** bằng 1 phách, không nói "chia phách thành bao nhiêu phần". Ví dụ 6/8 có **6** móc đơn nhưng không phải "6 phách" theo nghĩa ta cảm nhận — xem mục 3 về nhịp kép.

> ❓ **Câu hỏi tự nhiên của người đọc.**
> - *"4/4 và 2/2 có bằng nhau không?"* — Về toán học mỗi ô nhịp đều chứa 1 nốt tròn. Nhưng 4/4 nhấn mạnh *4 phách đen* trong khi 2/2 (cut time) cảm nhận là *2 phách trắng* nhanh — phách của 2/2 dài gấp đôi.
> - *"4/4 có ký hiệu nào đặc biệt không?"* — Có. 4/4 thường viết tắt là chữ **C** (common time). 2/2 viết tắt là **₵** (cut time, C có gạch ngang).

> 🔁 **Dừng lại tự kiểm tra.** Nhịp 3/8 có bao nhiêu móc đơn trong một ô? Nếu tempo = 120 BPM (móc đơn = 1 phách), mỗi ô kéo dài bao lâu?
>
> <details><summary>Đáp án</summary>
>
> 3/8 → **3 móc đơn** mỗi ô. Nếu BPM = 120 (mỗi phách = móc đơn = 0.5 s), mỗi ô = 3 × 0.5 = **1.5 giây**.
> </details>

> 📝 **Tóm tắt mục 2.**
> - Ô nhịp = nhóm phách cố định, ngăn bởi vạch nhịp.
> - Số chỉ nhịp = [số phách] / [loại nốt = 1 phách].
> - Số dưới 4 = nốt đen, 8 = móc đơn, 2 = nốt trắng.
> - Tổng trường độ trong ô nhịp phải khớp chính xác số chỉ nhịp.

---

## 3. Nhịp đơn & Nhịp kép (Simple & Compound Meter)

### 3.1 Nhịp đơn (Simple Meter)

> 💡 **Trực giác.** "Đơn" vì mỗi phách chia thành **2 phần bằng nhau** — đơn giản, tự nhiên như vỗ tay đôi. Nghĩ đến cách đếm: *"1 – và – 2 – và – 3 – và – 4 – và"* trong 4/4.

**Nhịp đơn** là nhịp mà mỗi phách chia thành **2 phần bằng nhau** (subdivision = 2).

Các nhịp đơn phổ biến:

| Nhịp | Phách/ô | Chia phách | Mẫu |
|:---:|:---:|---|---|
| **2/4** | 2 | 2 + 2 | *mạnh – nhẹ* |
| **3/4** | 3 | 2 + 2 + 2 | *mạnh – nhẹ – nhẹ* |
| **4/4** | 4 | 2+2+2+2 | *mạnh – nhẹ – vừa – nhẹ* |

**Kiểm tra tổng trường độ (walk-through số thật):**

Nhịp **4/4**: mỗi ô = 4 nốt đen. Kiểm tra các cách lấp đầy:

- 1 nốt tròn (= 4 đen): 4/4 = 4 ✓
- 1 nốt trắng + 2 nốt đen: 2 + 1 + 1 = 4 ✓
- 4 nốt đen: 1+1+1+1 = 4 ✓
- 1 nốt trắng + 1 nốt đen + 2 móc đơn: 2 + 1 + 0.5 + 0.5 = 4 ✓
- 8 móc đơn: 0.5×8 = 4 ✓

Phân số theo nốt tròn: 1/2 + 1/4 + 1/4 = **4/4** ✓ (mọi trường hợp đều bằng 1 nốt tròn).

Nhịp **3/4**: mỗi ô = 3 nốt đen.

- 1 nốt trắng chấm (= 3 đen): 3 ✓
- 3 nốt đen: 1+1+1 = 3 ✓
- 1 nốt trắng + 1 nốt đen: 2 + 1 = 3 ✓
- 6 móc đơn: 0.5×6 = 3 ✓

> ⚠ **Lỗi thường gặp: bỏ quên trường độ của dấu lặng.** Dấu lặng **cũng chiếm thời gian** — dấu lặng đen = 1 phách, dấu lặng trắng = 2 phách. Bỏ sót chúng khi đếm sẽ làm ô nhịp bị thiếu.

---

### 3.2 Nhịp kép (Compound Meter)

> 💡 **Trực giác.** "Kép" vì mỗi phách **cảm nhận được** (tactus) thực ra gộp **3 móc đơn** lại — nghe như "vỗ 3" thay vì "vỗ 2". Waltz Ireland, barcarolle, nhiều bài hát ru có cảm giác đu đưa nhẹ nhàng theo 3 — đó là đặc trưng của nhịp kép.

**Nhịp kép** là nhịp mà mỗi phách chia thành **3 phần bằng nhau** (subdivision = 3). Phách thực sự là **nốt đen chấm** (= 3 móc đơn).

Cách nhận biết nhịp kép: số trên là **6, 9, 12** → chia cho 3 → số phách cảm nhận thực tế.

| Nhịp | Móc đơn/ô | Phách "cảm nhận" | Mỗi phách | Mẫu |
|:---:|:---:|:---:|---|---|
| **6/8** | 6 | **2** phách lớn | nốt đen chấm (3 móc) | *MẠNH–nhẹ–nhẹ – mạnh–nhẹ–nhẹ* |
| **9/8** | 9 | **3** phách lớn | nốt đen chấm | Waltz kép |
| **12/8** | 12 | **4** phách lớn | nốt đen chấm | Blues, ballad chậm |

**Walk-through 6/8 với số cụ thể:**

6/8 = 6 móc đơn/ô. Nhưng ta cảm nhận **2 phách lớn**:
- Phách 1: móc đơn 1–2–3 (= nốt đen chấm, trị giá 3 móc đơn)
- Phách 2: móc đơn 4–5–6 (= nốt đen chấm, trị giá 3 móc đơn)
- Tổng: 3 + 3 = 6 móc đơn ✓

Nếu tempo ghi "♩. = 60" (nốt đen chấm = 60 BPM), thời lượng 1 phách = 60/60 = 1 giây; 1 móc đơn = 1/3 giây.

> ⚠ **Lỗi thường gặp: đếm 6/8 như 6 phách.** Sai — nghe 6/8 như "1–2–3–4–5–6" sẽ mất cảm giác uyển chuyển. Đúng phải đếm "1–và–a–2–và–a" (2 phách, mỗi phách chia 3).

> ❓ **Câu hỏi tự nhiên của người đọc.**
> - *"Làm sao phân biệt 3/4 và 6/8 khi cả hai đều có 6 móc đơn mỗi ô?"* — Chia subdivision: 3/4 cảm nhận 3 phách đôi (1–và–2–và–3–và); 6/8 cảm nhận 2 phách ba (1–và–a–2–và–a). Nghe nhạc: 3/4 có "3 bước waltz" đều nhau; 6/8 có "chao đưa" 2 nhịp.
> - *"12/8 nghe như thế nào?"* — 4 phách lớn, mỗi phách chia 3. Rất nhiều bài blues chậm và ballad rock dùng 12/8 vì cảm giác "lắc đầu" 3 của nó.

> 🔁 **Dừng lại tự kiểm tra.** Nhịp 9/8 có bao nhiêu phách cảm nhận thực? Mỗi phách là loại nốt gì?
>
> <details><summary>Đáp án</summary>
>
> 9/8 → 9 ÷ 3 = **3 phách** cảm nhận thực. Mỗi phách = **nốt đen chấm** (3 móc đơn). Giống 3/4 nhưng mỗi phách chia 3 thay vì 2.
> </details>

> 📝 **Tóm tắt mục 3.**
> - Nhịp đơn: phách chia 2 (2/4, 3/4, 4/4).
> - Nhịp kép: phách chia 3 (6/8, 9/8, 12/8); số trên là bội của 3.
> - 6/8 = 2 phách lớn, mỗi phách = nốt đen chấm (3 móc đơn).
> - Phân biệt 3/4 và 6/8: cảm subdivision (2 vs 3).

---

## 4. Phách mạnh & Phách nhẹ (Strong & Weak Beats)

> 💡 **Trực giác.** Trong bất kỳ nhóm phách nào, phách đầu tiên luôn "nặng" hơn — nhạc sĩ tự nhiên nhấn mạnh hơn. Đây là lý do bạn có thể nhận ra "phách 1" khi nghe nhạc: nó nổi bật hơn phách 2, 3, 4.

### Quy tắc nhấn cơ bản

| Nhịp | Phách mạnh | Phách vừa | Phách nhẹ |
|:---:|---|---|---|
| **2/4** | 1 | — | 2 |
| **3/4** | 1 | — | 2, 3 |
| **4/4** | 1, (3 vừa) | 3 | 2, 4 |
| **6/8** | 1 (phách lớn 1) | — | 4 (phách lớn 2) |

**Walk-through 4/4:**

- Phách 1: **Mạnh** (downbeat — nhấn nhất)
- Phách 2: Nhẹ
- Phách 3: **Vừa** (weaker downbeat — mạnh thứ 2)
- Phách 4: Nhẹ (nhẹ nhất, chuẩn bị cho phách 1 của ô tiếp theo)

Đếm to: "**1** – 2 – **3** – 4 – **1** – 2 – **3** – 4…" — phách 1 to nhất, phách 3 to vừa.

**Walk-through 3/4 (Waltz):**

- Phách 1: **Mạnh** (BƯỚC lên)
- Phách 2: Nhẹ (bước phụ 1)
- Phách 3: Nhẹ (bước phụ 2)

Cảm nhận: **ĐI – bước – bước** (điển hình waltz).

> ⚠ **Lỗi thường gặp: nhấn phách 2 và 4 trong nhạc pop/rock.** Đây là kỹ thuật **backbeat** cố ý — nhạc sĩ *cố ý* đánh mạnh phách 2 và 4 để tạo groove. Đây không mâu thuẫn với lý thuyết: phách 2, 4 vẫn là "nhẹ theo lý thuyết" nhưng nhạc cụ nhấn mạnh (trống snare ở phách 2 & 4 trong rock) để tạo hiệu ứng ngược kỳ vọng — đó chính là phần thú vị của pop/rock.

> 📝 **Tóm tắt mục 4.**
> - Phách 1 luôn là phách mạnh nhất trong ô nhịp.
> - 4/4: mạnh–nhẹ–vừa–nhẹ; 3/4: mạnh–nhẹ–nhẹ; 2/4: mạnh–nhẹ.
> - Backbeat (nhấn phách 2 & 4) là kỹ thuật chủ ý trong pop/rock, không phải lỗi.

---

## 5. Đảo phách (Syncopation)

> 💡 **Trực giác.** Thay vì nhấn vào phách mạnh, bạn đột ngột nhấn vào phách yếu hoặc giữa phách. Nghe như "trật bánh" nhưng theo cách thú vị — tạo cảm giác bất ngờ, groove. Jazz, reggae, funk đặc biệt dùng nhiều đảo phách.

**Đảo phách (syncopation)** là kỹ thuật nhấn âm thanh vào **phách yếu** hoặc **phần yếu của phách** (offbeat) thay vì phách mạnh theo quy tắc.

**Ví dụ đơn giản trong 4/4:**

Không đảo phách: nhấn phách **1** – 2 – **3** – 4

Có đảo phách: chơi nốt bắt đầu vào **"và"** của phách 2 (nửa sau phách 2), giữ qua phách 3 → phách 3 bị "nuốt" vào nốt đang kéo dài từ offbeat.

**Ví dụ số thực tế:** Bài "Clocks" (Coldplay), "Billie Jean" (Michael Jackson) đều dùng nhịp điệu lệch khỏi phách mạnh để tạo groove đặc trưng.

> ❓ **Câu hỏi tự nhiên của người đọc.**
> - *"Đảo phách có khó chơi không?"* — Với người mới, khó. Vì não tự động muốn nhấn phách mạnh. Luyện bằng metronome: giữ "tick" ở phách chính, chơi nốt vào offbeat.
> - *"Syncopation có khác với rubato không?"* — Có. Rubato co giãn tempo tự do (nhanh/chậm). Syncopation giữ tempo chính xác nhưng dịch chuyển điểm nhấn trong khung thời gian đó.

> 📝 **Tóm tắt mục 5.**
> - Đảo phách = nhấn vào phách yếu / offbeat thay vì phách mạnh.
> - Tạo groove, bất ngờ — không phải lỗi, là kỹ thuật có chủ đích.
> - Jazz, funk, reggae, pop/rock dùng đảo phách nhiều.

---

## 6. Bài tập

**Bài 1 — Tính thời lượng phách.**
Bài hát có tempo 90 BPM, nhịp 4/4. Hỏi:
- (a) Mỗi phách (nốt đen) kéo dài bao nhiêu giây?
- (b) Một ô nhịp đầy đủ kéo dài bao nhiêu giây?
- (c) Một nốt trắng trong bài này kéo dài bao nhiêu giây?

**Bài 2 — Đọc số chỉ nhịp.**
Cho các số chỉ nhịp: **3/4**, **6/8**, **2/2**, **12/8**. Với mỗi loại, ghi:
- Số phách cảm nhận thực tế mỗi ô.
- Loại nốt làm 1 phách cảm nhận.
- Nhịp đơn hay nhịp kép.

**Bài 3 — Kiểm tra ô nhịp.**
Nhịp 4/4. Kiểm tra từng ô nhịp sau có hợp lệ không (tổng = 4 nốt đen):
- (a) nốt trắng + nốt đen + 2 móc đơn
- (b) nốt tròn + nốt đen
- (c) 3 nốt đen chấm
- (d) 4 nốt đen + dấu lặng đen
- (e) nốt trắng chấm + nốt đen

**Bài 4 — Nhịp kép.**
Nhịp 6/8, tempo ♩. = 72 BPM (nốt đen chấm = 1 phách).
- (a) Mỗi phách lớn kéo dài bao nhiêu giây?
- (b) Mỗi móc đơn kéo dài bao nhiêu giây?
- (c) Một ô nhịp đầy đủ kéo dài bao nhiêu giây?

**Bài 5 — Phách mạnh/nhẹ.**
Đánh dấu (M = mạnh, V = vừa, N = nhẹ) cho từng phách:
- (a) Nhịp 3/4: phách 1, 2, 3.
- (b) Nhịp 4/4: phách 1, 2, 3, 4.
- (c) Nhịp 2/4: phách 1, 2.

---

## Lời giải chi tiết

**Bài 1.**

*(a)* Thời lượng 1 phách = 60 ÷ BPM = 60 ÷ 90 = **0.667 giây** (= 2/3 giây).

*(b)* Nhịp 4/4 → 4 phách/ô. Một ô = 4 × 0.667 = **2.667 giây** (= 8/3 giây).

*(c)* Nốt trắng = 2 phách đen. Thời lượng = 2 × 0.667 = **1.333 giây** (= 4/3 giây).

Cách tiếp cận tổng quát: nốt trắng luôn = 2 × (thời lượng nốt đen), bất kể BPM.

---

**Bài 2.**

| Nhịp | Phách cảm nhận | Nốt làm phách | Loại |
|:---:|:---:|---|---|
| 3/4 | 3 | Nốt đen | Đơn |
| 6/8 | 2 (= 6÷3) | Nốt đen chấm | Kép |
| 2/2 | 2 | Nốt trắng | Đơn |
| 12/8 | 4 (= 12÷3) | Nốt đen chấm | Kép |

Quy tắc nhanh: số trên là bội của 3 AND ≥ 6 → nhịp kép; còn lại → nhịp đơn.

---

**Bài 3.**

Quy đổi về nốt đen (nốt trắng = 2, móc đơn = 0.5, đen chấm = 1.5):

*(a)* 2 + 1 + 0.5 + 0.5 = **4 ✓** hợp lệ.

*(b)* 4 + 1 = **5 ✗** quá nhiều 1 phách — ô nhịp bị thừa.

*(c)* 1.5 + 1.5 + 1.5 = **4.5 ✗** thừa nửa phách — không vừa khít.

*(d)* 1+1+1+1+1 = **5 ✗** thừa. (Kể cả dấu lặng, vẫn chiếm thời gian.)

*(e)* 3 + 1 = **4 ✓** hợp lệ. (Nốt trắng chấm = 3 phách đen, + 1 đen = 4.)

---

**Bài 4.**

*(a)* Thời lượng 1 phách lớn (nốt đen chấm) = 60 ÷ 72 = **0.833 giây** (= 5/6 giây).

*(b)* Mỗi phách lớn = 3 móc đơn → 1 móc đơn = 0.833 ÷ 3 = **0.278 giây** (= 5/18 giây).

*(c)* 6/8 có 2 phách lớn/ô → 1 ô = 2 × 0.833 = **1.667 giây** (= 5/3 giây).

Kiểm chứng: 6 móc đơn × 0.278 s = 1.667 s ✓.

---

**Bài 5.**

*(a)* 3/4: phách **1 = M**, 2 = N, 3 = N.

*(b)* 4/4: phách **1 = M**, 2 = N, **3 = V**, 4 = N.

*(c)* 2/4: phách **1 = M**, 2 = N.

Quy tắc chung: phách 1 luôn mạnh nhất; trong 4/4 phách 3 có nhấn thứ hai (vừa).

---

## Code & Minh họa

- 🎹 [visualization.html](./visualization.html) — **Metronome tương tác**: điều chỉnh BPM + số chỉ nhịp, nghe tick phách mạnh/nhẹ phân biệt bằng âm thanh, đèn LED sáng theo phách. **Trình tạo tiết tấu**: xếp chuỗi nốt vào 1 ô nhịp, kiểm tra tổng hợp lệ, rồi phát nghe. Hiển thị thời lượng phách theo công thức 60/BPM. **🔊 Bật loa để nghe.**

> Lĩnh vực âm nhạc minh họa tốt nhất bằng âm thanh tương tác nên bài này không kèm \`solutions.go\` — toàn bộ tính toán đã có trong viz và phần lời giải ở trên.

---

## Bài tiếp theo

→ **Lesson 08 — Bộ khóa & Vòng quãng 5**: vì sao có 15 bộ khóa, vòng quãng 5 (circle of fifths) là gì, và cách dùng nó để nhớ số dấu thăng/giáng. *(Đang biên soạn.)*

[⬆ Về tầng Fundamentals](../index.html) · [🏠 Trang chính Music](../../index.html)
`;
