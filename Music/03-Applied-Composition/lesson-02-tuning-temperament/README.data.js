// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: Music/03-Applied-Composition/lesson-02-tuning-temperament/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 02 — Hệ điều âm & tuning (Tuning & Temperament)

> **Tầng 3 — Applied & Composition · Bài 2/8**

Piano có 88 phím. Nhưng tại sao chúng được "chỉnh" theo cách hiện nay chứ không phải theo cách nào khác? Bài này trả lời câu hỏi đó: âm nhạc phương Tây đã trải qua một cuộc "thỏa hiệp" kéo dài hàng thế kỷ giữa **độ trong sáng của hợp âm** và **tính linh hoạt giữa các điệu**. Kết quả là hệ **equal temperament (12-TET)** mà mọi cây piano hiện đại đang dùng — một hệ thống không hề "hoàn hảo" về mặt âm học, nhưng lại **hoàn hảo về mặt thực dụng**.

## Mục tiêu học tập

Sau bài này, bạn có thể:

- Giải thích **just intonation** (luật thuần) và tại sao các quãng thuần nghe "sạch" hơn equal temperament.
- Tính **cents** cho một quãng bất kỳ từ tỷ lệ tần số: \`cents = 1200·log₂(tỷ lệ)\`.
- Mô tả **Pythagorean comma** (lệch ~23.46 cents) và tại sao nó buộc phải có sự thỏa hiệp.
- So sánh độ lệch cents của quãng 5, quãng 3 trưởng, quãng 4 giữa ET và luật thuần.
- Hiểu vì sao **12-TET** là điểm thỏa hiệp lịch sử tốt nhất.

## Kiến thức tiền đề

- Công thức \`f = 440·2^(n/12)\` và cents → [Lesson 01 — Âm thanh & cao độ](../../01-Fundamentals/lesson-01-sound-pitch/)
- Quãng (interval) và số nửa cung → [Lesson 04 — Quãng nhạc](../../01-Fundamentals/lesson-04-intervals/) *(đang biên soạn)*
- Vòng quãng 5 → [Lesson 08 — Ký hiệu hóa & vòng quãng 5](../../01-Fundamentals/lesson-08-key-signatures-circle/) *(đang biên soạn)*
- Âm sắc & bội âm → [Lesson 01 — Âm sắc & bội âm](../lesson-01-timbre-harmonics/)

---

## 1. Just intonation — luật thuần

> 💡 **Trực giác.** Khi hai nốt có tỷ lệ tần số đơn giản — như 2:1 hay 3:2 — các chu kỳ sóng của chúng khớp nhau rất đều đặn. Tai nghe chúng là một khối "trong sáng", không bị "ẩu" (beating). Đó chính là bí quyết của luật thuần.

**Just intonation (JI)**, còn gọi là **luật thuần** hoặc **Pythagorean tuning** (ở dạng cổ nhất), là hệ thống định nghĩa mỗi quãng bằng một **tỷ lệ số nguyên** của tần số.

### 1.1 Các quãng cơ bản trong luật thuần

| Quãng | Tên | Tỷ lệ JI | Ví dụ (từ A4 = 440 Hz) |
|-------|-----|-----------|------------------------|
| Octave | Quãng 8 đúng | **2:1** | A4 = 440 → A5 = 880 Hz |
| Quãng 5 đúng | Perfect 5th | **3:2** | A4 = 440 → E5 = 660 Hz |
| Quãng 4 đúng | Perfect 4th | **4:3** | A4 = 440 → D5 = 586.67 Hz |
| Quãng 3 trưởng | Major 3rd | **5:4** | A4 = 440 → C♯5 = 550 Hz |
| Quãng 6 trưởng | Major 6th | **5:3** | A4 = 440 → F♯5 = 733.33 Hz |

**(a) Tại sao tỷ lệ số nguyên nghe "sạch"?** Khi hai tần số có tỷ lệ \`p:q\` với \`p\`, \`q\` nhỏ, sóng tổng hợp lặp lại sau mỗi \`q\` chu kỳ của nốt cao hơn (hoặc \`p\` chu kỳ của nốt thấp hơn). Lặp lại đều đặn → não nhận ra pattern → nghe "hòa âm". Nếu tỷ lệ là số vô tỷ (như trong equal temperament), sóng không bao giờ lặp lại hoàn hảo — tạo ra **beating** (rung nhẹ về cường độ).

**(b) Walk-through số cụ thể — quãng 5 thuần 3:2:**

Nốt gốc A4 = 440 Hz. Nốt trên: \`440 × (3/2) = 660 Hz\`.

- Chu kỳ A4: \`T₁ = 1/440 ≈ 2.273 ms\`
- Chu kỳ E5 JI: \`T₂ = 1/660 ≈ 1.515 ms\`
- Sau 2 chu kỳ A4 = 4.545 ms, E5 đã hoàn thành đúng **3 chu kỳ** (3 × 1.515 = 4.545 ms ✓)
- Sóng tổng hợp lặp lại sau mỗi 4.545 ms → rất "khớp", không beating.

**(c) So sánh với Equal Temperament:**

E5 trong 12-TET (7 nửa cung): \`f = 440 × 2^(7/12) = 440 × 1.49831 = 659.26 Hz\`

- JI: 660.00 Hz · ET: 659.26 Hz · Lệch: 660.00 − 659.26 = 0.74 Hz
- Tai cảm nhận lệch này qua **beating** ở tốc độ ~0.74 lần/giây (rất nhẹ)

> ⚠ **Lỗi thường gặp: nghĩ luật thuần "đúng" còn ET "sai".** Không đúng. Cả hai đều "đúng" theo tiêu chí riêng. JI tối ưu độ trong sáng của hợp âm *trong một điệu cụ thể*. ET tối ưu tính linh hoạt *giữa tất cả các điệu*. Không có hệ nào vừa tối ưu cả hai — đó chính là nội dung của bài này.

> ❓ **Câu hỏi tự nhiên của người đọc.**
> - *"Nhạc cụ nào vẫn dùng JI ngày nay?"* — Giọng người khi hát bè tự nhiên, đàn bầu khi chỉnh nốt bằng cách nghe. Kèn đồng không có van (natural horn) chỉ phát được dãy bội âm tự nhiên — vốn là JI.
> - *"Beating nghe như thế nào?"* — Như tiếng "wah-wah-wah" rất chậm khi hai cây đàn không cùng tần số. Thợ chỉnh đàn dùng beating để so chuẩn: khi hai dây không còn beating, tức là chúng khớp hoàn toàn.
> - *"Tỷ lệ 3:2 từ đâu ra?"* — Từ dãy bội âm tự nhiên. Khi gảy dây đàn, nó rung ở tần số gốc \`f\` và đồng thời ở \`2f\`, \`3f\`, \`4f\`... Tỷ lệ \`3:2\` xuất hiện giữa bội âm thứ 3 (\`3f\`) và bội âm thứ 2 (\`2f\`) — hoàn toàn tự nhiên.

> 🔁 **Dừng lại tự kiểm tra.**
> Nốt gốc C4 = 261.63 Hz. Tính tần số của quãng 3 trưởng JI (tỷ lệ 5:4) từ C4.
> <details><summary>Đáp án</summary>
>
> \`261.63 × (5/4) = 261.63 × 1.25 = 327.04 Hz\`. Đó là E4 theo luật thuần. E4 trong ET: \`440 × 2^(−5/12) = 329.63 Hz\`. Lệch 327.04 vs 329.63 = 2.59 Hz ≈ **13.7 cents** — rõ ràng tai người nghe thấy.
> </details>

> 📝 **Tóm tắt mục 1.**
> - Just intonation = quãng nhạc = tỷ lệ số nguyên đơn giản.
> - Tỷ lệ đơn giản → sóng khớp đều → không (hoặc ít) beating → nghe "sạch".
> - Các quãng cơ bản: Octave 2:1, Q5 3:2, Q4 4:3, Q3 trưởng 5:4.

---

## 2. Vấn đề: Pythagorean comma

> 💡 **Trực giác.** Vẽ một vòng tròn bằng cách bước mỗi bước dài "quãng 5". Sau đúng 12 bước, bạn đáng lẽ phải về đúng chỗ xuất phát — nhưng trong luật thuần, bạn về một chỗ **lệch một chút**. Khoảng lệch đó gọi là Pythagorean comma.

### 2.1 Bài toán "đóng vòng quãng 5"

Chồng 12 quãng 5 thuần (mỗi quãng ×3/2) phải đi qua 7 octave (×2^7) để về lại cùng tên nốt. Nhưng:

$$\\left(\\frac{3}{2}\\right)^{12} = \\frac{3^{12}}{2^{12}} = \\frac{531441}{4096} = 129.746...$$

$$2^7 = 128$$

Hai con số **không bằng nhau**: \`129.746... ≠ 128\`.

### 2.2 Pythagorean comma = bao nhiêu?

$$\\text{Pythagorean comma} = \\frac{(3/2)^{12}}{2^7} = \\frac{129.746...}{128} = 1.013643...$$

Tính bằng cents:

$$\\text{cents} = 1200 \\cdot \\log_2(1.013643) = 1200 \\cdot 0.019550 = \\mathbf{23.46 \\text{ cents}}$$

> ⚠ **Con số này quan trọng:** 23.46 cents ≈ gần ¼ nửa cung. Tai người hoàn toàn nghe được sự lệch này (ngưỡng nghe khoảng 5–10 cents). Nghĩa là: nếu bạn chỉnh đàn hoàn toàn theo JI cho tất cả 12 quãng 5, **nốt cao nhất sẽ lệch ~24 cents so với nơi nó "đáng phải về"**.

### 2.3 Walk-through số đầy đủ — 12 quãng 5 thuần

Bắt đầu từ C4 = 261.63 Hz, chồng 12 quãng 5 thuần (×3/2), giảm octave mỗi khi vượt quá 2× nốt đầu:

| Bước | Quãng 5 từ | Đến (×3/2) | Điều chỉnh octave | Tần số ≈ |
|------|-----------|-----------|-------------------|-----------|
| 0 | C4 | — | — | 261.63 Hz |
| 1 | G4 | 392.44 | — | 392.44 Hz |
| 2 | D5 | 588.66 | ÷2 → D4 | 294.33 Hz |
| 3 | A4 | 441.49 | — | 441.49 Hz |
| 4 | E5 | 662.24 | ÷2 → E4 | 331.12 Hz |
| 5 | B4 | 496.67 | — | 496.67 Hz |
| 6 | F♯4 | 373.97* | — | 373.97 Hz |
| 7 | C♯5 | 560.95 | ÷2 → C♯4 | 280.48 Hz |
| 8 | G♯4 | 420.71 | — | 420.71 Hz |
| 9 | D♯5 | 631.06 | ÷2 → D♯4 | 315.53 Hz |
| 10 | A♯4 | 473.30 | — | 473.30 Hz |
| 11 | F5 | 709.95 | ÷2 → F4 | 354.97 Hz |
| 12 | **C5 (JI)** | 532.46 | ÷2 → **C4** | **266.23 Hz** |

**Kết quả:** C4 theo vòng quãng 5 JI = **266.23 Hz**, trong khi C4 thật = **261.63 Hz**.

$$\\text{Lệch} = 1200 \\cdot \\log_2\\!\\left(\\frac{266.23}{261.63}\\right) = 1200 \\cdot \\log_2(1.01759) = 1200 \\cdot 0.02527 \\approx 23.46 \\text{ cents} \\checkmark$$

Kết quả khớp với Pythagorean comma đã tính ở trên ✓.

*(\\*F♯ ở bước 6 thực ra nằm giữa 2 octave — tôi giữ trong octave 4 để tiện theo dõi.)*

### 2.4 Hậu quả thực tế

Nếu nhạc cụ phím (organ, harpsichord, piano) được chỉnh theo JI hoàn toàn:

- Mọi hợp âm trong **điệu gốc** nghe rất "sạch".
- Nhưng **điệu khác** (chuyển điệu) sẽ nghe lạc âm — vì Pythagorean comma bị tích lũy.
- Đặc biệt, một quãng 5 trong vòng 12 quãng phải bị "hy sinh" để gánh toàn bộ 23.46 cents lệch — quãng đó gọi là **wolf fifth** (quãng 5 sói), nghe rất tệ (~35 cents lệch!).

> ❓ **Câu hỏi tự nhiên của người đọc.**
> - *"Nhạc cụ không phím (đàn violin, giọng người) có bị ảnh hưởng không?"* — Không. Vì chúng có thể điều chỉnh tần số liên tục — người chơi violin tự nhiên nghe và chỉnh mỗi nốt. Vấn đề chỉ xảy ra với nhạc cụ có nốt **cố định** (fixed-pitch instruments).
> - *"Vì sao đúng 12 bước mới về gần?"* — Vì 12 là số mà \`(3/2)^12\` gần \`2^7\` nhất trong các số nguyên nhỏ. Thử 5 bước: \`(3/2)^5 = 7.594\` vs \`2^2 = 4\` — lệch quá xa. Thử 7 bước: \`(3/2)^7 = 17.086\` vs \`2^4 = 16\` — lệch 91 cents. Thử 12 bước: lệch 23.46 cents — tốt hơn nhiều!

> 🔁 **Dừng lại tự kiểm tra.**
> Chồng 7 quãng 5 thuần thay vì 12, kết quả so với 4 octave lệch bao nhiêu cents?
> <details><summary>Đáp án</summary>
>
> \`(3/2)^7 = 2187/128 = 17.0859\`. 4 octave = \`2^4 = 16\`. Tỷ lệ: \`17.0859/16 = 1.0679\`. Cents: \`1200·log₂(1.0679) = 1200·0.09416 = 113 cents\` — lệch hơn 1 nửa cung! Quá lớn để dùng.
> </details>

> 📝 **Tóm tắt mục 2.**
> - Chồng 12 quãng 5 thuần (3/2) lệch 7 octave (2^7) một lượng = Pythagorean comma ≈ 23.46 cents.
> - Lệch này đủ lớn để tai nghe thấy rõ.
> - Hậu quả: không thể vừa thuần vừa chơi được mọi điệu trên nhạc cụ phím.

---

## 3. Equal Temperament (12-TET) — hệ điều hòa đều

> 💡 **Trực giác.** Giải pháp: thay vì để một quãng 5 "chịu" toàn bộ 23.46 cents lệch, hãy **chia đều khoản nợ** cho cả 12 quãng 5. Mỗi quãng 5 chỉ lệch 23.46/12 ≈ 2 cents — tai gần như không nghe thấy.

### 3.1 Định nghĩa

**Equal temperament (ET)**, hay **12-TET** (12-tone equal temperament), chia octave thành **12 nửa cung hoàn toàn bằng nhau** về mặt tỷ lệ logarit. Mỗi nửa cung nhân tần số với:

$$r = 2^{1/12} \\approx 1.059463$$

Hệ quả: \`r^{12} = 2^{12/12} = 2\` — 12 bước đúng bằng 1 octave ✓

### 3.2 So sánh ET vs JI — bảng đầy đủ

| Quãng | Nửa cung | Tỷ lệ JI | Cents JI | Cents ET | Lệch (ET − JI) |
|-------|:---:|---------|:---:|:---:|:---:|
| Quãng 1 (unison) | 0 | 1:1 | 0 | 0 | **0 cents** |
| Nửa cung (minor 2nd) | 1 | 16:15 | 111.73 | 100 | −11.73 cents |
| Quãng 2 trưởng | 2 | 9:8 | 203.91 | 200 | −3.91 cents |
| Quãng 3 thứ | 3 | 6:5 | 315.64 | 300 | −15.64 cents |
| **Quãng 3 trưởng** | **4** | **5:4** | **386.31** | **400** | **+13.69 cents** |
| Quãng 4 đúng | 5 | 4:3 | 498.04 | 500 | +1.96 cents |
| Tritone | 6 | 45:32 | 590.22 | 600 | +9.78 cents |
| **Quãng 5 đúng** | **7** | **3:2** | **701.96** | **700** | **−1.96 cents** |
| Quãng 6 thứ | 8 | 8:5 | 813.69 | 800 | −13.69 cents |
| **Quãng 6 trưởng** | **9** | **5:3** | **884.36** | **900** | **+15.64 cents** |
| Quãng 7 thứ | 10 | 7:4* | 968.83 | 1000 | +31.17 cents |
| Quãng 7 trưởng | 11 | 15:8 | 1088.27 | 1100 | +11.73 cents |
| Octave | 12 | 2:1 | 1200 | 1200 | **0 cents** |

*(\\*7:4 = "harmonic seventh", nghe rất khác với quãng 7 thứ thông thường.)*

### 3.3 Walk-through chi tiết cho 4 quãng quan trọng nhất

**Quãng 5 (Q5):**
- JI: \`3/2 = 1.5\` → cents = \`1200·log₂(1.5) = 1200·0.58496 = 701.96 cents\`
- ET (7 nửa cung): \`2^(7/12) = 1.49831\` → cents = \`700 cents\` (định nghĩa)
- Lệch: **−1.96 cents** (ET thấp hơn JI 1.96 cents)
- Beating ở A4-E5: |660.00 − 659.26| ≈ **0.74 Hz** → wah-wah 0.74 lần/giây

**Quãng 3 trưởng (Q3+):**
- JI: \`5/4 = 1.25\` → cents = \`1200·log₂(1.25) = 1200·0.32193 = 386.31 cents\`
- ET (4 nửa cung): \`2^(4/12) = 2^(1/3) = 1.25992\` → cents = \`400 cents\`
- Lệch: **+13.69 cents** (ET cao hơn JI 13.69 cents)
- Beating ở A4-C♯5: \`440×1.25992=554.37\` vs \`440×1.25=550.00\` → lệch 4.37 Hz → beating rõ

**Quãng 4 (Q4):**
- JI: \`4/3 = 1.33333\` → cents = \`1200·log₂(4/3) = 1200·0.41504 = 498.04 cents\`
- ET (5 nửa cung): \`2^(5/12) = 1.33484\` → cents = \`500 cents\`
- Lệch: **+1.96 cents** (ET cao hơn JI 1.96 cents, đối xứng với Q5)
- Beating ở A4-D5: \`440×1.33484=587.33\` vs \`440×1.33333=586.67\` → lệch 0.66 Hz → rất nhẹ

**Octave:**
- JI = ET = \`2:1 = 1200 cents\` → **lệch 0 cents** (ET bảo toàn octave hoàn hảo)
- Đây là lý do ET hoạt động: octave không bị hi sinh, chỉ các quãng trong octave bị điều chỉnh.

> ⚠ **Lỗi thường gặp: tưởng quãng 5 trong ET là "xấu" vì lệch 2 cents.** Không đúng. Tai người chỉ bắt đầu nghe lệch rõ ở ~5 cents (phụ thuộc nhạc cụ và bối cảnh). Quãng 5 lệch 2 cents là gần như không nghe thấy — đó là lý do ET "thành công". Trái lại, quãng 3 trưởng lệch 13.7 cents là nghe được, đặc biệt trên nhạc cụ dài âm như organ.

> ❓ **Câu hỏi tự nhiên của người đọc.**
> - *"Hợp âm piano nghe 'chua' hơn giọng hát — vì sao?"* — Vì giọng hát tự động hướng về JI (hát theo tai), còn piano dùng ET. Quãng 3 trưởng lệch 13.7 cents tạo beating ~4-5 lần/giây ở tầm trung — rõ ràng, nhưng piano đã "thiết kế" cho người nghe quen với nó.
> - *"Các hệ nào khác đã được thử trước ET?"* — Nhiều: **Meantone temperament** (tối ưu quãng 3 trưởng nhưng wolf fifth tệ hơn), **Well temperament** (Bach dùng — mỗi điệu có màu sắc riêng), **53-TET** (53 nửa cung/octave — gần JI hơn nhưng phức tạp). ET chiến thắng vì đơn giản và công bằng.
> - *"Có hệ điều âm nào tốt hơn 12-TET không?"* — Tùy mục đích. **31-TET** xấp xỉ quãng 3 trưởng JI tốt hơn nhiều; **53-TET** xấp xỉ gần như mọi quãng JI. Nhưng cả hai yêu cầu nhạc cụ phức tạp hơn nhiều.

> 🔁 **Dừng lại tự kiểm tra.**
> Tính tần số E5 trong ET và trong JI (từ A4 = 440 Hz). Tính beating.
> <details><summary>Đáp án</summary>
>
> ET: \`440 × 2^(7/12) = 440 × 1.49831 = 659.26 Hz\`. JI: \`440 × 3/2 = 660.00 Hz\`. Beating = |660.00 − 659.26| = **0.74 Hz** — khoảng 1 lần rung/giây, rất nhẹ.
> </details>

> 📝 **Tóm tắt mục 3.**
> - ET chia octave thành 12 bước bằng nhau (×\`2^(1/12)\` mỗi bước).
> - Quãng 5: lệch −1.96 cents (gần như không nghe thấy).
> - Quãng 3 trưởng: lệch +13.69 cents (nghe được rõ, nhưng đã quen).
> - Octave: lệch 0 cents (hoàn hảo).

---

## 4. Vì sao 12? — Con số thỏa hiệp tốt nhất

> 💡 **Trực giác.** Nếu bạn muốn chia octave thành N bước bằng nhau mà quãng 5 vẫn gần thuần — bạn cần N sao cho \`(2^(k/N))\` gần \`3/2\` với \`k\` nguyên nhỏ. 12 là N nhỏ nhất thỏa mãn điều kiện này đủ tốt.

### 4.1 Kiểm tra các N khác nhau

| N (nửa cung/octave) | Quãng 5 tốt nhất (k/N ≈ log₂(3/2)=0.585) | Cents lệch vs Q5 JI |
|:---:|---|:---:|
| 5 | k=3: \`2^(3/5)=1.516\` → 720 cents | −18 cents (tệ) |
| 7 | k=4: \`2^(4/7)=1.486\` → 686 cents | +16 cents (tệ) |
| 12 | k=7: \`2^(7/12)=1.498\` → 700 cents | **−2 cents** (rất tốt) |
| 19 | k=11: \`2^(11/19)=1.495\` → 694.7 cents | +7.2 cents |
| 31 | k=18: \`2^(18/31)=1.4993\` → 696.8 cents | **+5.1 cents** (tốt, nhưng N lớn) |
| 53 | k=31: \`2^(31/53)≈1.4999\` → 701.9 cents | **−0.1 cents** (gần hoàn hảo, N rất lớn) |

12 là số nhỏ nhất cho quãng 5 sát JI đến mức tai khó phân biệt (< 5 cents), và đủ nhiều nốt để tạo giai điệu phong phú.

### 4.2 Vì sao không chọn N lớn hơn?

- **N = 53**: Q5 gần hoàn hảo, nhưng đàn piano 53 nốt/octave = 53 × 7 = 371 phím trắng + đen. Không thực tế.
- **N = 31**: Tốt hơn 12 về Q3+, nhưng nhạc cụ phức tạp hơn nhiều. Đã được thử — không phổ biến.
- **N = 12**: Đủ sát JI cho Q5, nhạc cụ phím đơn giản, ký pháp nhạc quen thuộc. **Thắng về mặt thực dụng lịch sử.**

> 📝 **Tóm tắt mục 4.**
> - 12 là N nhỏ nhất cho quãng 5 ET sát JI < 5 cents.
> - N lớn hơn (31, 53) cho kết quả tốt hơn về âm học nhưng không thực tế.
> - 12-TET chiến thắng do thỏa hiệp tốt giữa âm học và thực dụng.

---

## 5. Lịch sử — từ Pythagorean đến 12-TET

- **Pythagoras (~500 TCN)**: Xây dựng thang âm từ quãng 5 thuần (3:2) và octave (2:1). Hoạt động tốt trong một số điệu nhưng Q3 trưởng = \`81/64 ≈ 407.8 cents\` (lệch 21.5 cents so với JI 386 cents) — nghe rất "cứng".
- **Thế kỷ 15–16**: Người ta khám phá **just intonation đầy đủ** (5-limit JI) với Q3 thuần 5:4. Đẹp hơn nhưng vẫn có wolf fifth.
- **Meantone temperament (thế kỷ 16)**: Tối ưu Q3 trưởng (gần 386 cents), hi sinh wolf fifth nặng hơn. Dùng phổ biến thời Baroque.
- **Well temperament (thế kỷ 17–18)**: Bach viết *Das Wohltemperierte Klavier* để minh họa có thể chơi ở mọi 24 điệu — mỗi điệu có màu sắc riêng (điệu C trưởng "trong sáng", F♯ trưởng "bí ẩn").
- **Equal temperament (thế kỷ 19)**: Dần thay thế well temperament khi sản xuất đàn piano công nghiệp cần chuẩn thống nhất. Đến cuối thế kỷ 19, ET là chuẩn toàn cầu.

---

## Bài tập

1. **(Tính cents JI)** Quãng 6 thứ JI có tỷ lệ 8:5. Tính số cents. So sánh với ET (8 nửa cung = 800 cents) và cho biết độ lệch.

2. **(Pythagorean comma)** Bắt đầu từ D4 = 293.66 Hz. Chồng 3 quãng 5 thuần liên tiếp (×3/2 mỗi lần), giảm octave khi cần để nằm trong khoảng 220–440 Hz. Kết quả là nốt gì theo ET? Tần số JI vs ET lệch bao nhiêu Hz?

3. **(So sánh hệ thống)** Ở meantone temperament, Q5 được chỉnh xuống còn 696.58 cents (thay vì 700 cents ET hay 701.96 cents JI). Q3 trưởng kết quả là bao nhiêu cents? (Gợi ý: trong meantone, Q3 trưởng = 4 × Q5 − 2 × octave, tính bằng cents.)

4. **(Beating)** Hợp âm C trưởng (C4-E4-G4) trong ET: C4=261.63 Hz, E4=329.63 Hz, G4=392.00 Hz. Tính E4 và G4 theo JI (từ C4). Tính tần số beating của từng cặp (ET vs JI).

5. **(Thiết kế hệ điều âm)** Bạn muốn thiết kế một hệ N-TET sao cho quãng 4 đúng (JI: 4/3, = 498.04 cents) sát nhất có thể. Với N = 12, 19, 31, 53, tìm k tốt nhất và độ lệch cents cho từng N.

---

## Lời giải chi tiết

**Bài 1.** Tỷ lệ 8:5:
\`cents = 1200·log₂(8/5) = 1200·log₂(1.6) = 1200·0.67807 = 813.69 cents\`.
ET: 800 cents. Lệch: \`800 − 813.69 = −13.69 cents\` (ET thấp hơn JI 13.69 cents).
Lưu ý: đây là đối xứng với Q3 trưởng (+13.69 cents) — bởi vì quãng 6 thứ = octave − Q3 trưởng.

**Bài 2.** D4 = 293.66 Hz. Chồng 3 quãng 5 thuần:
- Bước 1: \`293.66 × 3/2 = 440.49 Hz\` — quá 440, ÷2: \`220.25 Hz\` (A3 theo JI, A3 ET = 220.00 Hz)
- Bước 2: \`220.25 × 3/2 = 330.37 Hz\` (E4 theo JI, E4 ET = 329.63 Hz)
- Bước 3: \`330.37 × 3/2 = 495.56 Hz\` — quá, ÷2: \`247.78 Hz\` (B3 theo JI, B3 ET = 246.94 Hz)

Nốt B3 JI = 247.78 Hz vs ET = 246.94 Hz. Lệch = 0.84 Hz.
Cents lệch: \`1200·log₂(247.78/246.94) = 1200·0.00494 = 5.92 cents\`.

**Bài 3.** Meantone: Q5 = 696.58 cents. Q3 trưởng = 4 × Q5 − 2 × octave:
\`4 × 696.58 − 2 × 1200 = 2786.32 − 2400 = 386.32 cents\`.
Đây là 386.32 cents ≈ 386.31 cents JI (5:4) ✓ — meantone hi sinh Q5 để đạt Q3 trưởng hoàn hảo!
So với ET (400 cents): meantone Q3 trưởng tốt hơn ET 13.68 cents.

**Bài 4.** C trưởng hợp âm (từ C4 = 261.63 Hz):
- E4 JI: \`261.63 × 5/4 = 327.04 Hz\`. ET: 329.63 Hz. Beating: |329.63 − 327.04| = **2.59 Hz** (nhẹ, ~3 lần/giây)
- G4 JI: \`261.63 × 3/2 = 392.45 Hz\`. ET: 392.00 Hz. Beating: |392.00 − 392.45| = **0.45 Hz** (rất nhẹ)
- E4-G4 JI: \`392.45/327.04 = 1.2001 ≈ 6:5\` (Q3 thứ thuần). ET: \`392.00/329.63 = 1.1892\`. Nhỏ nhưng cả tổ hợp hợp âm ET beating phức tạp hơn.

Nhận xét: hợp âm piano beating ở E4 rõ hơn G4 — đúng với thực tế Q3+ lệch nhiều hơn Q5.

**Bài 5.** Q4 JI = 498.04 cents. Tìm k/N ≈ 498.04/1200 = 0.41503:

| N | k tốt nhất (k/N gần 0.41503) | Cents = 1200·k/N | Lệch vs JI |
|:---:|:---:|:---:|:---:|
| 12 | k=5: 5/12=0.4167 | 500.00 cents | **+1.96 cents** |
| 19 | k=8: 8/19=0.4211 | 505.26 cents | +7.22 cents |
| 31 | k=13: 13/31=0.4194 | 503.23 cents | +5.19 cents |
| 53 | k=22: 22/53=0.4151 | 498.11 cents | **+0.07 cents** (gần hoàn hảo!) |

Nhận xét: N=12 cho Q4 chỉ lệch 1.96 cents — rất tốt. N=53 gần hoàn hảo nhưng cực kỳ phức tạp.

---

## Code & Minh họa

- 🎹 [visualization.html](./visualization.html) — **Nghe và so sánh Just Intonation vs Equal Temperament** trực tiếp: phát hợp âm theo cả hai hệ, biểu đồ cents lệch, và demo Pythagorean comma chồng 12 quãng 5. **🔊 Bật loa để nghe sự khác biệt.**

---

## Bài tiếp theo

→ **Lesson 03 — Giai điệu & motif**: cách xây giai điệu từ các nốt, motif là gì, và các nguyên tắc phát triển giai điệu trong sáng tác. *(Đang biên soạn.)*

[⬆ Về Applied & Composition](../index.html) · [🏠 Trang chính Music](../../index.html)
`;
