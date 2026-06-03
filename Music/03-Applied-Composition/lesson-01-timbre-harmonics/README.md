# Lesson 01 — Âm sắc & chuỗi bội âm (Timbre & Harmonics)

> **Tầng 3 — Applied & Composition · Bài 1/8**

Bài này trả lời câu hỏi: **vì sao cùng một nốt A4 (440 Hz) nhưng sáo nghe khác violin, và cả hai lại khác giọng người?** Câu trả lời không nằm ở tần số (đó là cao độ, giống nhau), mà nằm ở cái mà vật lý học gọi là **chuỗi bội âm** (harmonic series) — một cây đàn rung đồng thời hàng chục tần số, và tỷ lệ cường độ của chúng vẽ nên "màu sắc" của âm. Hiểu bội âm là hiểu gốc rễ của âm sắc, của hòa âm thuận tai, và của mọi kỹ thuật tổng hợp âm thanh hiện đại.

## Mục tiêu học tập

Sau bài này, bạn có thể:

- Định nghĩa âm sắc (timbre) và giải thích vì sao cùng cao độ lại nghe khác nhau.
- Mô tả chuỗi bội âm: f₁, 2f, 3f, 4f, 5f... và tính tần số cụ thể.
- Đọc quan hệ nhạc lý của các bội âm (octave, quãng 5, quãng 3 trưởng...).
- Giải thích lý do quãng "thuận tai" (2:1, 3:2, 5:4) nghe thuận: chúng xuất hiện sớm trong chuỗi bội âm.
- Nhận biết dạng sóng (sine, square, sawtooth, triangle) và bội âm tương ứng.
- Hiểu sơ lược bao hình ADSR ảnh hưởng nhận diện nhạc cụ như thế nào.

## Kiến thức tiền đề

- Sóng, tần số, biên độ — [Fundamentals Lesson 01: Âm thanh & cao độ](../../01-Fundamentals/lesson-01-sound-pitch/README.md)
- Quãng nhạc & tỷ lệ tần số — [Fundamentals Lesson 04: Quãng nhạc](../../01-Fundamentals/lesson-04-intervals/README.md)
- (Tuỳ chọn) Khái niệm sóng cơ học — [Physics/01-Mechanics](../../../Physics/01-Mechanics/)
- (Tuỳ chọn) Chuỗi Fourier — [Math/03-Trig-Complex](../../../Math/03-Trig-Complex/)

---

## 1. Âm sắc (Timbre) — "màu sắc" của âm

> 💡 **Trực giác.** Hãy tưởng tượng hai người cùng hét "A" theo một cao độ: một người giọng trầm ấm, một người giọng cao the thé. Tần số có thể bằng nhau — nhưng tai bạn nhận ra ngay. Thứ bạn đang nhận ra không phải cao độ (pitch) mà là **màu âm** (tone color / timbre). Đây là thứ khiến mỗi nhạc cụ có "tiếng riêng".

**(a) Timbre là gì.** Âm sắc (timbre) là đặc tính chủ quan của âm thanh cho phép phân biệt hai âm có **cùng cao độ và cùng độ to** nhưng khác nguồn phát. Không phải cao hơn/thấp hơn (pitch), không phải to/nhỏ (loudness) — mà là "màu". Vật lý học định nghĩa timbre thông qua **phổ tần số (frequency spectrum)** của âm: cấu trúc nào các tần số thành phần và biên độ tương đối của chúng.

**(b) Vì sao cần khái niệm này.** Nếu âm thanh chỉ là tần số + biên độ, thì một chiếc còi và một chiếc violin phát cùng nốt A4 phải nghe giống hệt. Thực tế không thế. Ta cần timbre để mô tả và phân tích tại sao chúng khác nhau — và sau đó có thể tái tạo, thiết kế âm thanh (sound design).

**(c) Ba yếu tố vật lý tạo timbre:**

1. **Phổ bội âm (harmonic spectrum)** — thành phần và biên độ của các bội âm (xem mục 2).
2. **Bao hình ADSR** — cách âm tăng, duy trì, tắt (xem mục 5).
3. **Dao động phi tuyến (inharmonics)** — tiếng vang, tiếng gõ, tiếng thở... (ngoài phạm vi bài này).

> ❓ **Câu hỏi tự nhiên của người đọc.**
> - *"Timbre có đo được bằng số không?"* — Được, bằng phân tích phổ (FFT): vẽ biên độ theo từng tần số. Mỗi nhạc cụ có "dấu tay phổ" đặc trưng, có thể nhận dạng tự động.
> - *"Tai người nhạy với timbre hơn pitch không?"* — Khác nhau. Phân biệt cao độ cần luyện tập (ear training). Nhận diện timbre thì gần như mọi người làm được ngay — bạn phân biệt giọng mẹ và giọng giáo viên chỉ sau 1 giây mà không cần nhạc cụ.

> 📝 **Tóm tắt mục 1.**
> - Timbre = "màu sắc" của âm, phân biệt nguồn phát khi cùng cao độ và độ to.
> - Quyết định bởi phổ bội âm, bao hình ADSR, và inharmonics.
> - Có thể đo và tái tạo bằng kỹ thuật tổng hợp âm thanh.

---

## 2. Chuỗi bội âm (Harmonic Series)

> 💡 **Trực giác.** Khi bạn gảy một dây đàn guitar, dây không chỉ rung theo **một** tần số. Nó rung theo **nhiều kiểu cùng lúc**: rung toàn dây (nốt chính), rung nửa dây hai đầu (bội âm 2), rung một phần ba dây (bội âm 3)... Tất cả cộng lại tạo âm bạn nghe. Biên độ của từng kiểu rung quyết định âm sắc.

### 2.1 Định nghĩa chính thức

Một nguồn rung tuần hoàn với tần số cơ bản **f₁** (fundamental) phát đồng thời một họ tần số:

| Bội âm (harmonic) | Tần số | Tên gọi |
|:-:|:-:|:-:|
| 1 | f₁ | Fundamental (âm cơ bản) |
| 2 | 2·f₁ | 1st overtone / 2nd harmonic |
| 3 | 3·f₁ | 2nd overtone / 3rd harmonic |
| 4 | 4·f₁ | 3rd overtone / 4th harmonic |
| 5 | 5·f₁ | 4th overtone / 5th harmonic |
| 6 | 6·f₁ | 5th overtone / 6th harmonic |
| ... | ... | ... |

**Chú ý thuật ngữ:** "harmonic n" = bội âm thứ n = n·f₁. "Overtone n" = bội âm thứ (n+1). Thuật ngữ "overtone" đếm từ 1 (bội âm đầu tiên **ngoài** fundamental), còn "harmonic" đếm từ 1 (bao gồm cả fundamental).

> ⚠ **Lỗi thường gặp: nhầm "overtone 1" = fundamental.** Overtone 1 = harmonic 2 = tần số 2f₁. Fundamental không phải overtone. Khi đọc tài liệu, cần kiểm tra tác giả đang đếm theo hệ nào.

### 2.2 Ví dụ số cụ thể — f₁ = 100 Hz

| Harmonic | Tần số | Nốt nhạc gần nhất | Quan hệ với f₁ |
|:-:|:-:|:-:|:-:|
| 1 | 100 Hz | G2 | Âm cơ bản |
| 2 | 200 Hz | G3 | Octave trên (tỷ lệ 2:1) |
| 3 | 300 Hz | D4 | Octave + quãng 5 đúng |
| 4 | 400 Hz | G4 | 2 octave (tỷ lệ 4:1) |
| 5 | 500 Hz | B4 | 2 octave + quãng 3 trưởng (xấp xỉ) |
| 6 | 600 Hz | D5 | 2 octave + quãng 5 đúng |
| 7 | 700 Hz | F5 | 2 octave + quãng 7 thứ (hơi phẳng) |
| 8 | 800 Hz | G5 | 3 octave (tỷ lệ 8:1) |

**Walk-through bộ số: f₁ = 110 Hz (A2 — dây guitar trầm buông)**

- H1: 110 Hz → A2 (fundamental, nghe được là A)
- H2: 220 Hz → A3 (lên 1 octave, tỷ lệ 2:1 = octave ✓)
- H3: 330 Hz → E4 (lên 1 octave + quãng 5; tỷ lệ 3:2 từ H2 ≈ quãng 5 thuần)
- H4: 440 Hz → A4 (lên 2 octave; tỷ lệ 4:1)
- H5: 550 Hz → C♯5 (lên 2 octave + quãng 3 trưởng; tỷ lệ 5:4 ≈ quãng 3 thuần)
- H6: 660 Hz → E5 (lên 2 octave + quãng 5; tỷ lệ 3:2 từ H4)
- H7: 770 Hz → G5 (ước tính; bội âm 7 không khớp hoàn toàn hệ equal temperament)
- H8: 880 Hz → A5 (lên 3 octave; tỷ lệ 8:1)

> 🔁 **Dừng lại tự kiểm tra.** f₁ = 200 Hz. Tính tần số bội âm H3, H5, H6. Chúng tương ứng quãng nhạc nào so với f₁?
>
> <details><summary>Đáp án</summary>
>
> - H3 = 3 × 200 = **600 Hz** — octave + quãng 5 đúng trên f₁ (tỷ lệ 3:1 so với f₁, hoặc 3:2 so với H2 = octave của f₁).
> - H5 = 5 × 200 = **1000 Hz** — 2 octave + quãng 3 trưởng (tỷ lệ 5:4 từ H4 = 800 Hz).
> - H6 = 6 × 200 = **1200 Hz** — 2 octave + quãng 5 (tỷ lệ 3:2 từ H4 = 800 Hz).
> </details>

---

## 3. Tại sao bội âm giải thích hòa âm thuận tai?

> 💡 **Trực giác.** Bạn có thắc mắc tại sao quãng 5 (C–G) nghe thuận hơn quãng 7 (C–B)? Câu trả lời nằm trong chuỗi bội âm. Khi hai nốt có tỷ lệ tần số đơn giản (2:1, 3:2, 5:4...), các bội âm của chúng **trùng lặp nhiều** — tai nhận ra sự khớp đó là "hòa" (consonance). Tỷ lệ phức tạp → ít trùng → "chát" (dissonance).

**(a) Lý do hình thức.** Hai nốt với tần số f_A và f_B:
- Bội âm của A: f_A, 2f_A, 3f_A, 4f_A...
- Bội âm của B: f_B, 2f_B, 3f_B, 4f_B...

Nếu tỷ lệ f_A : f_B = p : q (với p, q nguyên nhỏ), hai chuỗi sẽ có nhiều giá trị chung → âm thanh ổn định và "hòa".

**(b) Ví dụ số cụ thể — 4 quãng, kiểm tra từng cái:**

**Quãng 8 (octave) — tỷ lệ 2:1:**
- Nốt C4 (262 Hz) + C5 (524 Hz).
- Bội âm C4: 262, 524, 786, 1048, 1310...
- Bội âm C5: 524, 1048, 1572...
- Trùng tại: 524, 1048, 1572... (mỗi bội âm của C5 trùng với bội âm của C4) → **hoàn toàn hòa**, tai gần như nghe như một nốt.

**Quãng 5 đúng — tỷ lệ 3:2:**
- C4 (262 Hz) + G4 (392 Hz). Tỷ lệ 392/262 ≈ 1.496 ≈ 3/2.
- Bội âm C4: 262, 524, **786**, 1048, 1310, **1572**...
- Bội âm G4: 392, **786**, 1178, **1572**...
- Trùng tại: H3 của C4 = H2 của G4 (786 Hz), rồi H6/H4 (1572 Hz)... → **rất hòa**.

**Quãng 3 trưởng — tỷ lệ 5:4:**
- C4 (262 Hz) + E4 (330 Hz). Tỷ lệ 330/262 ≈ 1.26 ≈ 5/4.
- Bội âm C4: 262, 524, 786, 1048, **1310**...
- Bội âm E4: 330, 660, 990, **1320**, 1650...
- Trùng tại: H5 của C4 ≈ H4 của E4 (1310 ≈ 1320 — xấp xỉ, do equal temperament). Vẫn hòa nhưng ít trùng hơn quãng 5.

**Quãng 7 thứ (minor 7th) — tỷ lệ phức tạp:**
- C4 (262 Hz) + B♭4 (466 Hz). Tỷ lệ 466/262 ≈ 1.78 ≈ 16/9.
- Bội âm ít trùng nhau trong tầm nghe → **nghe "căng thẳng"**, cần giải quyết.

> ❓ **Câu hỏi tự nhiên của người đọc.**
> - *"Nếu bội âm trùng là thuận tai, vì sao nhạc hiện đại dùng nhiều quãng chát?"* — Vì "căng thẳng → giải quyết" (tension → resolution) là động lực của âm nhạc. Chát không phải sai — nó là năng lượng chờ được giải phóng.
> - *"Tỷ lệ 3:2 và 2:1 ở trên là tỷ lệ 'thuần' (just intonation), không phải equal temperament. Có sai không?"* — Không sai về nguyên lý; equal temperament *xấp xỉ* các tỷ lệ đó. Sai số nhỏ (quãng 5 lệch ~2 cents) nhưng cho phép chơi ở mọi giọng không lệch. Chi tiết ở [Lesson 02 — Hệ điều âm](../lesson-02-tuning-temperament/).

> 📝 **Tóm tắt mục 3.**
> - Tỷ lệ tần số đơn giản (2:1, 3:2, 5:4) → bội âm trùng nhiều → thuận tai.
> - Tỷ lệ phức tạp → ít trùng → chát, tạo "căng".
> - Đây là lý do chuỗi bội âm "dự đoán" hệ thống hòa âm phương Tây.

---

## 4. Dạng sóng & cấu trúc bội âm

> 💡 **Trực giác.** Toán học Fourier nói rằng **mọi sóng tuần hoàn đều có thể phân tích thành tổng các sóng sine**. Khác nhau ở chỗ: chỉ có harmonic nào, biên độ bao nhiêu. Bốn dạng sóng cơ bản sau là ví dụ "sạch" về điều này.

### 4.1 Sóng sine (sine wave) — âm thuần

Chỉ có **duy nhất 1 harmonic** (fundamental f₁, biên độ 1). Không có bội âm nào khác.

- Nghe: âm "thuần", "nhạt", giống còi điện tử đơn giản.
- Nhạc cụ gần nhất: sáo bẻ nhẹ nhàng ở octave cao, giọng hát whistle.
- Công thức: `y(t) = sin(2π·f₁·t)`

### 4.2 Sóng vuông (square wave) — chỉ bội lẻ

Chỉ có các **harmonic lẻ**: H1, H3, H5, H7... với biên độ lần lượt 1, 1/3, 1/5, 1/7...

- Công thức: `y(t) = Σ (1/(2k−1))·sin(2π·(2k−1)·f₁·t)` với k = 1, 2, 3...
- **Walk-through bằng số (f₁ = 100 Hz):** thành phần: 100 Hz (biên độ 1.000), 300 Hz (0.333), 500 Hz (0.200), 700 Hz (0.143), 900 Hz (0.111)... Không có 200, 400, 600, 800 Hz.
- Nghe: âm "đục", "mũi", gần tiếng kèn clarinet (mặt vật lý do cột khí dạng ống đơn).

### 4.3 Sóng cưa (sawtooth wave) — đủ mọi bội âm

Có **tất cả harmonics**: H1, H2, H3, H4... với biên độ 1, 1/2, 1/3, 1/4...

- Công thức: `y(t) = Σ (1/n)·sin(2π·n·f₁·t)` với n = 1, 2, 3...
- **Walk-through bằng số (f₁ = 100 Hz):** 100 Hz (1.000), 200 Hz (0.500), 300 Hz (0.333), 400 Hz (0.250), 500 Hz (0.200)... Mọi bội số đều có.
- Nghe: âm "sáng", "kim loại", giàu âm sắc. Gần tiếng violin cung kéo, kèn đồng.

### 4.4 Sóng tam giác (triangle wave) — bội lẻ giảm nhanh

Chỉ bội **lẻ** như square, nhưng biên độ giảm nhanh hơn: 1, 1/9, 1/25, 1/49... (chia cho bình phương).

- Công thức: `y(t) = Σ (±1/(2k−1)²)·sin(2π·(2k−1)·f₁·t)` với dấu xen kẽ.
- **Walk-through (f₁ = 100 Hz):** 100 Hz (1.000), 300 Hz (0.111), 500 Hz (0.040), 700 Hz (0.020)... Rất ít năng lượng ở các bội âm cao.
- Nghe: gần sine hơn square, âm "ngọt" hơn square nhưng vẫn rõ ràng hơn sine thuần.

> ⚠ **Lỗi thường gặp: nghĩ dạng sóng = nhạc cụ thật.** Sine/square/saw/triangle là các mô hình lý thuyết và được dùng trong synthesizer (nhạc cụ điện tử). Nhạc cụ acoustic (đàn dây, hơi, gõ) có phổ phức tạp hơn nhiều, bao gồm cả inharmonic partials (tần số không phải bội số nguyên của f₁), và thay đổi theo thời gian. Tuy nhiên các dạng sóng đơn giản này là nền tảng để hiểu synthesizer và thiết kế âm thanh.

> 🔁 **Dừng lại tự kiểm tra.** Một âm thanh có phổ: 200 Hz, 400 Hz, 600 Hz, 800 Hz, 1000 Hz với biên độ 1, 1/2, 1/3, 1/4, 1/5. Đây là dạng sóng gì? f₁ là bao nhiêu?
>
> <details><summary>Đáp án</summary>
>
> Các tần số là bội số nguyên của 200 Hz và đủ cả bội lẻ lẫn bội chẵn, biên độ 1/n → đây là **sawtooth wave** với **f₁ = 200 Hz**.
> </details>

> 📝 **Tóm tắt mục 4.**
> - Sine = 1 harmonic (thuần). Square = bội lẻ, biên độ 1/n. Sawtooth = mọi bội, biên độ 1/n. Triangle = bội lẻ, biên độ 1/n².
> - Mọi sóng tuần hoàn = tổng các sóng sine (định lý Fourier).
> - Dạng sóng đơn giản là nền tảng của synthesizer hiện đại.

---

## 5. Bao hình ADSR — yếu tố thời gian của timbre

> 💡 **Trực giác.** Bịt mắt và nghe ai đó bấm piano — bạn nhận ra ngay. Không chỉ vì phổ tần số, mà còn vì **cách âm bắt đầu và kết thúc**: tiếng piano nổi nhanh rồi tắt dần. Đây là bao hình (envelope) — hình dạng biên độ theo thời gian.

**ADSR** là mô hình bốn giai đoạn phổ biến nhất:

| Giai đoạn | Tên | Mô tả | Ví dụ |
|:-:|:-:|:-:|:-:|
| **A** | Attack (Khởi) | Thời gian biên độ tăng từ 0 đến đỉnh | Piano: ~2ms; Violin: ~50–200ms |
| **D** | Decay (Giảm) | Thời gian biên độ giảm từ đỉnh xuống sustain | Piano: nhanh; Kèn: gần như 0 |
| **S** | Sustain (Duy trì) | Mức biên độ giữ trong khi giữ phím/kéo cung | Violin: cao; Piano: giảm dần |
| **R** | Release (Nhả) | Thời gian tắt sau khi buông phím | Cồng/chuông: rất dài; Staccato: ngắn |

**Ví dụ so sánh ba nhạc cụ:**

- **Piano:** Attack rất nhanh (2–5 ms), Decay nhanh, Sustain thấp và giảm dần, Release ngắn. → Âm "đánh" và tắt.
- **Violin:** Attack chậm (cung lướt 50–200 ms), Sustain cao và ổn định, Release chậm. → Âm "hát", có thể kéo dài.
- **Tiếng gõ trống:** Attack cực nhanh (<1 ms), Sustain = 0, Release phụ thuộc vào độ vang phòng. → Âm "đét".

> ❓ **Câu hỏi tự nhiên của người đọc.**
> - *"Nếu đảo ngược một file âm thanh (phát từ cuối về đầu), nhạc cụ còn nhận ra được không?"* — Thường không. Phổ tần số giống nhau, nhưng attack/release bị đảo → tiếng piano phát ngược có attack mềm và release đột ngột — tai không nhận ra đó là piano nữa. Đây là bằng chứng ADSR ảnh hưởng nhận diện nhạc cụ độc lập với phổ.
> - *"ADSR có liên quan gì đến synthesizer?"* — Rất nhiều. Hầu hết synthesizer có bộ điều chỉnh ADSR cho cả biên độ tổng và cho từng modulation riêng. Kéo Attack dài → âm nhạt dần vào; kéo Release dài → âm vang vọng.

> 📝 **Tóm tắt mục 5.**
> - ADSR = Attack / Decay / Sustain / Release — hình dạng biên độ theo thời gian.
> - Ảnh hưởng nhận diện nhạc cụ mạnh như phổ bội âm, thậm chí độc lập với nó.
> - Synthesizer cho phép điều chỉnh ADSR tự do để tạo timbre mới.

---

## 6. Tổng hợp âm cộng (Additive Synthesis)

Nếu mọi âm = tổng các sine (Fourier), thì ta có thể **xây dựng âm sắc từ đầu** bằng cách cộng các sine với tần số và biên độ chọn sẵn. Đây là nguyên lý **additive synthesis** (tổng hợp âm cộng).

**Ví dụ: tái tạo gần đúng sawtooth f₁ = 220 Hz:**

| Harmonic | Tần số | Biên độ |
|:-:|:-:|:-:|
| 1 | 220 Hz | 1.000 |
| 2 | 440 Hz | 0.500 |
| 3 | 660 Hz | 0.333 |
| 4 | 880 Hz | 0.250 |
| 5 | 1100 Hz | 0.200 |
| 6 | 1320 Hz | 0.167 |
| 7 | 1540 Hz | 0.143 |
| 8 | 1760 Hz | 0.125 |

Tổng 8 harmonics trên nghe đã gần giống sawtooth. Thêm nhiều harmonic hơn → càng gần. Giữ lại chỉ H1 → sine thuần.

**Ứng dụng thực tế:** Đây là cách organ điện tử Hammond hoạt động — 9 drawbar, mỗi cái điều chỉnh biên độ của một harmonic (16', 8', 4', 2 2/3', 2', 1 3/5', 1 1/3', 1', tương ứng H1..H8). Kéo drawbar = thay đổi phổ = thay đổi timbre.

> 🔁 **Dừng lại tự kiểm tra.** Bạn chỉ bật H1 và H3 của f₁ = 300 Hz với biên độ bằng nhau. Âm thanh đó gần với dạng sóng nào nhất? Tần số nào có mặt?
>
> <details><summary>Đáp án</summary>
>
> Chỉ có harmonic lẻ (H1, H3) → **gần với square wave** (nhưng chưa đủ — square cần vô hạn bội lẻ). Tần số: **300 Hz và 900 Hz**.
> </details>

---

## Bài tập

**Bài 1.** Dây guitar chuẩn có f₁ = 82.41 Hz (nốt E2). Tính tần số của các bội âm H2, H3, H4, H5, H6. Bội âm nào gần với nốt E3 (164.81 Hz), B3 (246.94 Hz), E4 (329.63 Hz) nhất?

**Bài 2.** Một âm có phổ: 150 Hz, 300 Hz, 450 Hz, 600 Hz với biên độ 1, 0.5, 0.33, 0.25. Đây là dạng sóng gì? f₁ là bao nhiêu Hz?

**Bài 3.** Một âm có phổ: 250 Hz, 750 Hz, 1250 Hz với biên độ 1, 0.111, 0.040. Đây là dạng sóng gì? Tại sao chỉ có 3 harmonic?

**Bài 4.** Giải thích bằng ngôn ngữ chuỗi bội âm: vì sao hợp âm C trưởng (C–E–G) nghe "thuận" hơn hợp âm C–F♯–B?

**Bài 5.** Một synthesizer bật H1 = 220 Hz, H2 = 440 Hz, H3 = 660 Hz với biên độ 1, 0.4, 0.2. Tính tổng biên độ đóng góp vào tần số 440 Hz (đây là bội âm mấy?). Nếu thêm H4 = 880 Hz với biên độ 0.1, âm sắc sẽ thay đổi theo hướng nào (sáng hơn hay tối hơn)?

---

## Lời giải chi tiết

**Bài 1.**

- f₁ = 82.41 Hz (E2).
- H2 = 2 × 82.41 = **164.82 Hz** ≈ E3 (164.81 Hz) ✓ — khớp hoàn toàn (sai lệch < 0.01 Hz).
- H3 = 3 × 82.41 = **247.23 Hz** ≈ B3 (246.94 Hz) ✓ — sai lệch 0.29 Hz, tương đương ~2 cents. Đây là quãng 5 đúng của E (E–B là quãng 5).
- H4 = 4 × 82.41 = **329.64 Hz** ≈ E4 (329.63 Hz) ✓ — khớp hoàn toàn (sai lệch < 0.01 Hz). H4 = 2 octave.
- H5 = 5 × 82.41 = **412.05 Hz** — gần G♯4/A♭4 (415.30 Hz) nhưng lệch ~12 cents.
- H6 = 6 × 82.41 = **494.46 Hz** ≈ B4 (493.88 Hz) ✓ — sai lệch ~2 cents. H6 = 2 octave + quãng 5.

**Cách tiếp cận:** H2 = octave, H4 = 2 octave luôn khớp chính xác. H3, H6 = quãng 5 (xấp xỉ, lệch ~2 cents do equal temperament vs just intonation). H5 lệch nhiều nhất — bội âm 5 tương ứng quãng 3 trưởng "thuần" (386 cents) so với equal temperament (400 cents), lệch 14 cents.

---

**Bài 2.**

- Các tần số: 150, 300, 450, 600 Hz = bội số nguyên của 150 Hz → f₁ = **150 Hz**.
- Có cả bội lẻ (150, 450) lẫn bội chẵn (300, 600) → không phải square/triangle.
- Biên độ theo 1/n (1, 1/2, 1/3, 1/4) → đây là **sawtooth wave**.
- Kiểm tra: H1=1/1=1.000 ✓, H2=1/2=0.500 ✓, H3=1/3=0.333 ✓, H4=1/4=0.250 ✓.

---

**Bài 3.**

- Tần số: 250, 750, 1250 Hz = 250 × 1, 250 × 3, 250 × 5 → bội lẻ của f₁ = **250 Hz**.
- Biên độ: 1, 0.111 = 1/9, 0.040 = 1/25 → giảm theo 1/n² (1/1², 1/3², 1/5²).
- Đây là **triangle wave**. Chỉ có 3 harmonic vì: (a) chỉ lấy H1, H3, H5 (bội lẻ), và (b) biên độ 1/n² giảm rất nhanh nên H7 trở đi có biên độ 1/49 ≈ 0.02 — rất nhỏ, đã bị bỏ qua hoặc dưới ngưỡng nghe.

---

**Bài 4.**

- **C–E–G (C trưởng):** Tỷ lệ tần số gần với C:E:G ≈ 4:5:6 (just intonation, xấp xỉ).
  - C–E: tỷ lệ 5:4 → H5 của C = H4 của E → bội âm trùng nhiều.
  - C–G: tỷ lệ 3:2 → H3 của C = H2 của G → bội âm trùng nhiều.
  - E–G: tỷ lệ 6:5 → cũng có bội âm trùng.
  - Kết quả: ba nốt chia sẻ nhiều bội âm chung → **rất thuận tai**.

- **C–F♯–B:** Tỷ lệ tần số phức tạp, không xấp xỉ phân số đơn giản.
  - C–F♯: tritone (45:32 ≈ 1.406); C–B: major 7th (15:8 ≈ 1.875).
  - Rất ít bội âm chung → **chát, căng thẳng**, cần giải quyết.

---

**Bài 5.**

- H2 = 440 Hz → đây là **bội âm số 2** (harmonic 2) của 220 Hz.
- Biên độ tại 440 Hz: **0.4** (từ cài đặt H2).
- Nếu thêm H4 = 880 Hz (biên độ 0.1): thêm năng lượng ở tần số cao → âm sắc **sáng hơn** (brighter). Nguyên tắc: càng nhiều harmonic cao biên độ, âm càng "kim loại", "sáng", "sắc nét". Bớt harmonic cao → âm "ấm", "mượt", "tối" hơn.

---

## Code & Minh họa

- 🔊 [visualization.html](./visualization.html) — **Bật loa để nghe.** Ba công cụ tương tác:
  1. **Xưởng bội âm (Additive Synth):** 8 slider biên độ harmonic → nghe âm sắc thay đổi + thấy dạng sóng tổng theo thời gian thực.
  2. **So sánh dạng sóng:** sine / square / sawtooth / triangle — phát tiếng thật + mô tả bội âm.
  3. **Bảng bội âm:** nhập f₁ tự do, xem tần số + nhãn nhạc lý của H1..H12.

---

## Bài tiếp theo

→ **[Lesson 02 — Hệ điều âm (Tuning & Temperament)](../lesson-02-tuning-temperament/visualization.html):** tại sao piano dùng equal temperament thay vì tỷ lệ thuần (just intonation), và sai số đó ảnh hưởng ra sao đến âm nhạc thực tế.

[⬆ Về Applied & Composition](../index.html) · [🏠 Trang chính Music](../../index.html)
