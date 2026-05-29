// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: Astronomy/02-StarsGalaxies/lesson-03-hr-diagram/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 03 — Biểu đồ Hertzsprung–Russell (H-R Diagram)

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Hiểu **phân loại quang phổ OBAFGKM** xếp sao theo nhiệt độ (nóng → lạnh).
- Đọc được **biểu đồ H-R**: trục ngang = nhiệt độ/lớp phổ (đảo chiều), trục đứng = độ trưng.
- Nhận diện các **vùng** trên biểu đồ: dải chính (main sequence), sao khổng lồ (giant), siêu khổng lồ (supergiant), lùn trắng (white dwarf).
- Hiểu **quan hệ khối lượng–độ trưng** trên dải chính: \`L ∝ M^3.5\`.
- Đặt được các sao thật (Mặt Trời, Sirius A, Betelgeuse...) vào đúng vùng.

## Kiến thức tiền đề

- **Bức xạ vật đen, Wien, Stefan–Boltzmann** — [Lesson 01](../lesson-01-radiation-spectra/): màu ↔ nhiệt độ, \`L = 4πR²σT⁴\`.
- **Độ trưng L & cấp tuyệt đối M** — [Lesson 02](../lesson-02-measuring-stars/): trục đứng của biểu đồ.

---

## 1. Phân loại quang phổ OBAFGKM

> 💡 **Trực giác / Hình dung.** Đầu thế kỷ 20, người ta chụp phổ hàng nghìn sao và xếp chúng thành các "lớp" theo dáng vạch hấp thụ. Sau mới hiểu: các lớp đó thực ra xếp theo **nhiệt độ bề mặt**. Một câu nhớ kinh điển: **"Oh, Be A Fine Girl/Guy, Kiss Me"** — O B A F G K M, từ nóng nhất đến lạnh nhất.

**Định nghĩa (3 phần):**

- **(a) Là gì** — **Lớp phổ (spectral class)** là nhóm phân loại sao theo *các vạch hấp thụ* nổi bật trong phổ, mà bản chất phản ánh **nhiệt độ bề mặt**. Bảy lớp chính: **O, B, A, F, G, K, M**, mỗi lớp chia nhỏ 0–9 (G2 nóng hơn G3...).
- **(b) Vì sao tồn tại / cần** — Vạch hấp thụ nào xuất hiện phụ thuộc nhiệt độ (quá nóng thì hydro bị ion hóa hết → vạch H yếu; quá lạnh thì hiện vạch phân tử). Phân loại phổ là cách *đo nhiệt độ* mà không cần đo trực tiếp \`λ_max\`, và là trục ngang của biểu đồ H-R.
- **(c) Ví dụ trực giác bằng số** — Lớp O: T > 30000 K (xanh); G (Mặt Trời): ~5800 K (vàng); M: ~3000 K (đỏ).

**Bảng 7 lớp (số liệu thật):**

| Lớp | Nhiệt độ bề mặt (K) | Màu | Vạch nổi bật | Ví dụ |
|---|---|---|---|---|
| **O** | 30000–50000 | Xanh | Heli ion hóa | Sao Mintaka |
| **B** | 10000–30000 | Xanh-trắng | Heli trung hòa | Rigel, Spica |
| **A** | 7500–10000 | Trắng | Hydro mạnh nhất | Sirius A, Vega |
| **F** | 6000–7500 | Trắng-vàng | Kim loại + H | Procyon |
| **G** | 5200–6000 | Vàng | Canxi ion hóa | **Mặt Trời**, α Cen A |
| **K** | 3700–5200 | Cam | Kim loại trung hòa | Arcturus, Aldebaran |
| **M** | 2400–3700 | Đỏ | Phân tử (TiO) | Betelgeuse, Proxima |

> ⚠ **Lỗi thường gặp.** Tưởng thứ tự OBAFGKM theo bảng chữ cái logic. Thực ra nó là *di sản lịch sử*: ban đầu xếp theo độ mạnh vạch hydro (A, B, C...), sau sắp lại theo nhiệt độ và bỏ bớt lớp → còn lại trật tự "lộn xộn" này. Cứ học thuộc câu thần chú.

> 🔁 **Dừng lại tự kiểm tra.** Một sao lớp K nóng hơn hay lạnh hơn một sao lớp A?
> <details><summary>Đáp án</summary>**Lạnh hơn.** Thứ tự nóng→lạnh là O B A F G K M; K đứng sau A nên lạnh hơn (A ~7500–10000 K, K ~3700–5200 K).</details>

---

## 2. Cấu trúc biểu đồ H-R

> 💡 **Trực giác.** Xếp mỗi sao thành một chấm: trục ngang = nhiệt độ (hoặc lớp phổ), trục đứng = độ trưng. Bạn sẽ không thấy chấm rải đều khắp nơi — chúng **tụ thành vài dải và vùng rõ rệt**, như dân cư tụ thành thành phố chứ không rải đều mặt đất. Đó là phát hiện vĩ đại của Hertzsprung và Russell (~1910).

**Quy ước trục (rất quan trọng):**

- **Trục ngang**: nhiệt độ T (hoặc lớp phổ O→M), **tăng từ PHẢI sang TRÁI** (nóng bên trái). Đây là quy ước lịch sử "lộn ngược".
- **Trục đứng**: độ trưng L (theo \`L/L☉\`, thang logarit), hoặc cấp tuyệt đối M (số nhỏ = sáng = lên trên).

**Định nghĩa các vùng (mỗi vùng 3 phần a/b/c):**

### 2.1 Dải chính (Main Sequence)

- **(a) Là gì** — Một dải chéo từ góc trên-trái (nóng, sáng) xuống góc dưới-phải (lạnh, mờ), nơi **~90% các sao** đang sống.
- **(b) Vì sao tồn tại** — Đây là sao đang **đốt hydro thành heli ở lõi** (Lesson 04). Vị trí trên dải chỉ phụ thuộc **khối lượng**: nặng → nóng, sáng, ở trên-trái; nhẹ → lạnh, mờ, ở dưới-phải.
- **(c) Ví dụ** — Mặt Trời (G2, ~1 L☉) nằm giữa dải; Sirius A (A1, ~25 L☉) ở trên-trái; sao lùn đỏ M (~0.01 L☉) ở dưới-phải.

### 2.2 Sao khổng lồ & siêu khổng lồ (Giants & Supergiants)

- **(a) Là gì** — Vùng **trên-phải**: sao **lạnh** (đỏ) nhưng **rất sáng**. Khổng lồ ~10–100 R☉; siêu khổng lồ ~100–1000 R☉.
- **(b) Vì sao tồn tại** — Theo \`L = 4πR²σT⁴\`, một sao lạnh chỉ sáng được nếu **bán kính cực lớn** (R² bù cho T⁴ nhỏ). Đó là sao đã rời dải chính, phồng to ở cuối đời (Lesson 05).
- **(c) Ví dụ** — Betelgeuse (M, siêu khổng lồ đỏ, ~100000 L☉, R ~ 900 R☉); Aldebaran (K, khổng lồ, ~400 L☉).

### 2.3 Lùn trắng (White Dwarfs)

- **(a) Là gì** — Vùng **dưới-trái**: sao **rất nóng** (trắng-xanh) nhưng **rất mờ**.
- **(b) Vì sao tồn tại** — Theo Stefan–Boltzmann, nóng mà mờ ⇒ **bán kính tí hon** (~0.01 R☉, cỡ Trái Đất). Đó là lõi trơ còn lại sau khi sao như Mặt Trời chết (Lesson 05).
- **(c) Ví dụ** — Sirius B (lùn trắng đồng hành của Sirius A, T~25000 K nhưng chỉ ~0.03 L☉).

**Walk-through đặt sao bằng số thật** (dùng \`L/L☉ = (R/R☉)²(T/T☉)⁴\` từ Lesson 01):

| Sao | Lớp | T (K) | R/R☉ | L/L☉ (tính) | Vùng |
|---|---|---|---|---|---|
| Mặt Trời | G2 | 5778 | 1 | 1²×1⁴ = **1** | Dải chính (giữa) |
| Sirius A | A1 | 9940 | 1.71 | 1.71²×(9940/5778)⁴ ≈ **25.6** | Dải chính (trên-trái) |
| Betelgeuse | M2 | 3500 | 900 | 900²×(3500/5778)⁴ ≈ **1.1×10⁵** | Siêu khổng lồ (trên-phải) |
| Sirius B | DA | 25000 | 0.0084 | 0.0084²×(25000/5778)⁴ ≈ **0.025** | Lùn trắng (dưới-trái) |

Kiểm chứng Betelgeuse: \`(3500/5778)⁴ = 0.6058⁴ = 0.1347\`; \`900² = 810000\`; tích \`= 810000×0.1347 ≈ 1.09×10⁵\` ✓.

> ❓ **Câu hỏi tự nhiên của người đọc.**
> - *"Vì sao trục nhiệt độ lại lộn ngược (nóng bên trái)?"* — Di sản lịch sử: ban đầu vẽ theo lớp phổ O→M từ trái sang phải, mà O nóng nhất → tình cờ thành "nóng bên trái". Giờ giữ nguyên cho thống nhất.
> - *"Hai sao cùng nhiệt độ sao lại ở 2 chỗ khác nhau?"* — Vì khác **bán kính** → khác độ trưng. Cùng T, sao to (khổng lồ) ở trên, sao nhỏ (lùn) ở dưới. H-R thực ra "ẩn" thông tin bán kính theo đường chéo (đường R không đổi chạy chéo).
> - *"Chấm trên H-R có di chuyển không?"* — Có, nhưng **rất chậm** theo thang đời sao (triệu–tỉ năm). Một sao "đi" trên H-R khi tiến hóa (Lesson 04–05). Tại một thời điểm, một sao là một chấm cố định.

> ⚠ **Lỗi thường gặp.** Nghĩ H-R là "ảnh chụp đường đi của một sao". Sai — H-R là **ảnh chụp một quần thể** nhiều sao khác nhau tại cùng thời điểm. Đường tiến hóa của *một* sao là một quỹ đạo riêng vẽ chồng lên đó.

> 🔁 **Dừng lại tự kiểm tra.** Một sao rất nóng (T = 20000 K) nhưng độ trưng chỉ 0.01 L☉. Nó nằm ở vùng nào, và bán kính cỡ bao nhiêu?
> <details><summary>Đáp án</summary>Vùng **lùn trắng** (dưới-trái: nóng mà mờ). Bán kính: \`0.01 = (R/R☉)²(20000/5778)⁴ = (R/R☉)²×143.6\` → \`(R/R☉)² = 6.96e−5\` → \`R/R☉ ≈ 0.0083\` (cỡ Trái Đất).</details>

---

## 3. Quan hệ khối lượng–độ trưng (Mass–Luminosity)

> 💡 **Trực giác.** Trên dải chính, sao càng nặng càng "đốt nhiên liệu" dữ dội (lõi nén mạnh, nóng hơn) → sáng hơn *rất nhiều*. Không phải tỉ lệ thẳng — gấp đôi khối lượng làm sáng hơn cả chục lần.

**Định nghĩa (3 phần):**

- **(a) Là gì** — Với sao dải chính, độ trưng tăng nhanh theo khối lượng: \`L/L☉ ≈ (M/M☉)^3.5\` (số mũ ~3 đến ~4 tùy dải khối lượng; ta dùng 3.5).
- **(b) Vì sao cần** — Cho phép suy **khối lượng** (rất khó đo trực tiếp) từ **độ trưng** (đo được). Cũng là chìa khóa tính tuổi thọ sao ở Lesson 04.
- **(c) Ví dụ trực giác bằng số** — Sao 2 M☉ sáng \`2^3.5 ≈ 11.3\` lần Mặt Trời; sao 0.5 M☉ chỉ sáng \`0.5^3.5 ≈ 0.088\` lần.

**Walk-through số thật (verify):**

1. **M = 10 M☉:**
   \`\`\`
   L/L☉ = 10^3.5 = 3162
   \`\`\`
   → sao 10 lần khối lượng sáng hơn ~3000 lần. (Khớp bậc độ lớn cho sao lớp B.)

2. **M = 0.5 M☉ (lùn đỏ):**
   \`\`\`
   L/L☉ = 0.5^3.5 = 0.088
   \`\`\`
   → chỉ sáng ~9% Mặt Trời. Verify: \`0.5^3.5 = 2^(−3.5) = 1/11.3 = 0.0884\` ✓.

3. **M = 1 M☉:** \`1^3.5 = 1\` → đúng Mặt Trời (mốc chuẩn). ✓

4. **Kiểm tra ngược:** sao có \`L = 100 L☉\`. Khối lượng?
   \`\`\`
   M/M☉ = 100^(1/3.5) = 10^(2/3.5) = 10^0.571 = 3.7
   \`\`\`
   → khoảng 3.7 M☉.

> ❓ **Câu hỏi tự nhiên.** *"Vì sao mũ ~3.5 chứ không phải 1?"* — Vì sao nặng nén lõi mạnh hơn → nhiệt độ lõi cao hơn → tốc độ nhiệt hạch *cực kỳ nhạy* với nhiệt độ → công suất tăng vọt. Hệ quả nghịch lý: sao nặng có *nhiều* nhiên liệu nhưng đốt *quá nhanh* nên sống *ngắn* hơn (Lesson 04).

> 🔁 **Dừng lại tự kiểm tra.** Sao 4 M☉ sáng gấp mấy lần Mặt Trời (dải chính)?
> <details><summary>Đáp án</summary>\`L/L☉ = 4^3.5 = (2²)^3.5 = 2⁷ = 128\` lần.</details>

---

## 4. Tóm tắt

> 📝 **Tóm tắt toàn bài.**
> - **OBAFGKM**: lớp phổ theo nhiệt độ, O nóng nhất (xanh) → M lạnh nhất (đỏ). Mặt Trời là G2.
> - **Biểu đồ H-R**: trục ngang T (nóng bên TRÁI), trục đứng L (log). Sao tụ thành vùng.
> - **4 vùng**: dải chính (chéo, đốt H, ~90% sao); khổng lồ/siêu khổng lồ (trên-phải: lạnh mà sáng → to); lùn trắng (dưới-trái: nóng mà mờ → tí hon).
> - **Khối lượng–độ trưng**: \`L/L☉ ≈ (M/M☉)^3.5\`; nặng → sáng vọt → sống ngắn.
> - H-R là ảnh chụp **một quần thể**, không phải đường đi của một sao.

---

## Bài tập

1. **Xếp nhiệt độ.** Sắp các lớp phổ B, M, G, A theo nhiệt độ giảm dần. Lớp nào màu đỏ, lớp nào xanh?

2. **Đặt sao vào vùng.** Cho 3 sao: (a) T=4000 K, L=300 L☉; (b) T=15000 K, L=0.01 L☉; (c) T=6000 K, L=1 L☉. Mỗi sao thuộc vùng nào của H-R? Giải thích bằng \`L = 4πR²σT⁴\`.

3. **Suy bán kính từ H-R.** Sao (a) ở bài 2 (T=4000 K, L=300 L☉). Tính \`R/R☉\`.

4. **Khối lượng–độ trưng.** Một sao dải chính có \`M = 5 M☉\`. Tính độ trưng \`L/L☉\`.

5. **Ngược lại.** Một sao dải chính sáng 1000 L☉. Ước lượng khối lượng theo \`L ∝ M^3.5\`.

---

## Lời giải chi tiết

### Bài 1 — Xếp nhiệt độ

Thứ tự nóng→lạnh tổng quát: O B A F G K M. Trong các lớp đã cho:
**B (xanh-trắng) > A (trắng) > G (vàng) > M (đỏ)**.
- **B**: nóng nhất (10000–30000 K), **màu xanh-trắng**.
- **M**: lạnh nhất (~3000 K), **màu đỏ**.

### Bài 2 — Đặt sao vào vùng

- **(a) T=4000 K, L=300 L☉**: lạnh mà rất sáng ⇒ phải to ⇒ **khổng lồ đỏ** (trên-phải). (Lớp K/M.)
- **(b) T=15000 K, L=0.01 L☉**: nóng mà rất mờ ⇒ phải tí hon ⇒ **lùn trắng** (dưới-trái).
- **(c) T=6000 K, L=1 L☉**: gần đúng Mặt Trời ⇒ **dải chính** (lớp G, giữa dải).

Lý do chung: với cùng L, vị trí T quyết định R qua \`L = 4πR²σT⁴\`. Lạnh+sáng → R lớn; nóng+mờ → R nhỏ.

### Bài 3 — Suy bán kính (sao khổng lồ đỏ)

Dùng \`L/L☉ = (R/R☉)²(T/T☉)⁴\`, giải R:
\`\`\`
(R/R☉)² = (L/L☉) / (T/T☉)⁴ = 300 / (4000/5778)⁴
(4000/5778)⁴ = 0.6923⁴ = 0.2297
(R/R☉)² = 300 / 0.2297 = 1306
R/R☉ = √1306 ≈ 36.1
\`\`\`
→ bán kính ~**36 lần** Mặt Trời — đúng cỡ một sao khổng lồ.

### Bài 4 — Khối lượng–độ trưng

\`\`\`
L/L☉ = (M/M☉)^3.5 = 5^3.5
log: 3.5 × log(5) = 3.5 × 0.699 = 2.447
L/L☉ = 10^2.447 ≈ 280
\`\`\`
→ sao 5 M☉ sáng ~**280 lần** Mặt Trời.

### Bài 5 — Ngược lại

\`\`\`
M/M☉ = (L/L☉)^(1/3.5) = 1000^(1/3.5)
log: (1/3.5) × log(1000) = (1/3.5) × 3 = 0.857
M/M☉ = 10^0.857 ≈ 7.2
\`\`\`
→ khối lượng ~**7 M☉**. Verify: \`7.2^3.5 = 10^(3.5×0.857) = 10^3.0 = 1000\` ✓.

---

## Code & Minh họa

- **Visualization tương tác**: [visualization.html](./visualization.html) — gồm:
  - **Biểu đồ H-R tương tác**: kéo slider **nhiệt độ T** và **độ trưng L** → chấm sao di chuyển trên biểu đồ; tự **phân loại lớp phổ** (OBAFGKM), tô màu theo lớp, và báo **vùng** (dải chính / khổng lồ / lùn trắng) cùng bán kính suy ra. Có sẵn các sao thật bấm là nhảy tới.
  - **Mass–Luminosity calculator**: nhập \`M/M☉\` → ra \`L/L☉ = M^3.5\` (và ngược lại), minh họa "nặng → sáng vọt".

---

## Bài tiếp theo

→ [Lesson 04 — Vòng đời sao](../lesson-04-star-life/): vì sao sao nằm trên dải chính (cân bằng thủy tĩnh), nhiệt hạch H→He, và vì sao sao nặng sống ngắn (\`t ∝ M/L ∝ M^−2.5\`). Ta dùng lại **quan hệ khối lượng–độ trưng** của bài này.

**Tham khảo chéo:** Stefan–Boltzmann & Wien → [Lesson 01](../lesson-01-radiation-spectra/); độ trưng & cấp tuyệt đối → [Lesson 02](../lesson-02-measuring-stars/).
`;
