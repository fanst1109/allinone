// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: Biology/03-Physiology-Ecology/lesson-06-ecology-populations/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 06 — Sinh thái quần thể

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Hiểu **quần thể sinh thái (population)** là gì, phân biệt nó với "quần thể di truyền (genetic population)" đã học ở Tầng 2.
- Liệt kê và tính được các **đặc trưng quần thể**: kích thước (N), mật độ (D), phân bố không gian, cấu trúc tuổi, tỉ lệ giới, **tỉ lệ sinh (b)**, **tỉ lệ tử (d)**, **nhập cư (i)**, **xuất cư (e)**, và **tốc độ tăng trưởng riêng (r)**.
- Phân biệt hai mô hình tăng trưởng cơ bản: **cấp số nhân (exponential)** \`dN/dt = rN\` cho ra đường J và **logistic** \`dN/dt = rN(1 − N/K)\` cho ra đường S, với **sức chứa môi trường (carrying capacity) K**.
- Chứng minh được "tốc độ tăng trưởng đạt cực đại khi N = K/2" và áp dụng vào bài toán khai thác bền vững.
- Phân biệt **chiến lược sinh sản r-selection vs K-selection** với ví dụ thực tế.
- Đọc được **dao động Lotka–Volterra** giữa loài ăn thịt và loài bị săn (linh miêu × thỏ).

## Kiến thức tiền đề

- **Quần thể & tần số allele** ở góc nhìn di truyền — [\`Biology/02-Genetics-Evolution/lesson-06-population-genetics\`](../../02-Genetics-Evolution/lesson-06-population-genetics/). Bài đó nhìn quần thể như "bể gene"; bài này nhìn nó như "tập hợp cá thể có sinh-tử-nhập-xuất".
- **Tăng trưởng theo cấp số nhân 2ⁿ** đã gặp ở phân chia tế bào — [\`Biology/01-Molecules-Cells/lesson-07-cell-cycle-mitosis\`](../../01-Molecules-Cells/lesson-07-cell-cycle-mitosis/). Vi khuẩn nhân đôi sau mỗi 20 phút là ví dụ cổ điển của \`dN/dt = rN\`.
- **Hàm mũ \`e^x\` và đạo hàm** — ai chưa quen có thể đọc lại \`Math/Calculus/lesson-04-exponential\` (không bắt buộc; bài này nhắc lại công thức cần dùng).

---

## 1. Quần thể sinh thái là gì?

### 💡 Trực giác / Hình dung

Hãy nghĩ về một **đàn cá rô** trong một cái ao làng. Tất cả đều là **cùng một loài**, **cùng sống trong ao** (cùng khu vực địa lý), và **cùng tồn tại tại thời điểm bạn đang quan sát**. Đó là một quần thể. Cá rô ao bên cạnh là một quần thể *khác* — dù cùng loài — vì hai đàn không trộn lẫn hằng ngày. Sinh thái học nhìn quần thể như một "thực thể đang thở": có sinh, có chết, có nhập, có xuất, có tăng có giảm theo mùa.

### 1.1. Định nghĩa hình thức

**Quần thể sinh thái (ecological population)** = tập hợp các cá thể **cùng loài (same species)**, **sống trong cùng một khu vực (same area)**, **tại cùng một thời điểm (same time)**, và có khả năng giao phối với nhau (cùng vốn gene).

Ba yếu tố "cùng" này không phải lúc nào cũng rạch ròi — đôi khi ranh giới khu vực do nhà sinh thái học tự định nghĩa cho tiện nghiên cứu (vd "quần thể cá rô của ao A"). Đây là khác biệt cốt lõi với "quần xã (community)" — quần xã gồm **nhiều loài** chung sống trong cùng khu vực.

### 1.2. Phân biệt với "quần thể" ở Tầng 2 (di truyền)

Ở [\`02-Genetics-Evolution/lesson-06\`](../../02-Genetics-Evolution/lesson-06-population-genetics/), quần thể được nhìn như **một bể gene (gene pool)** — quan tâm tần số allele, định luật Hardy–Weinberg, chọn lọc tự nhiên. Ở Tầng 3 này, ta nhìn cùng tập hợp đó như **một tập hợp đếm được các cá thể** — quan tâm N tăng/giảm theo thời gian. Hai góc nhìn bổ sung, không mâu thuẫn.

### 📝 Tóm tắt mục 1

- Quần thể sinh thái = cùng loài + cùng khu vực + cùng thời điểm.
- Khác quần xã (nhiều loài) và khác quần thể di truyền (góc nhìn bể gene).
- Là đối tượng nghiên cứu trung tâm của bài: ta sẽ đo, mô hình hóa, dự báo nó.

---

## 2. Đặc trưng cơ bản của quần thể

### 💡 Trực giác / Hình dung

Muốn "khám sức khỏe" một quần thể, nhà sinh thái học đo 5-6 chỉ số như bác sĩ đo huyết áp, nhịp tim, nhiệt độ. Mỗi chỉ số trả lời một câu hỏi khác nhau: "có bao nhiêu con?" (kích thước), "chen chúc ra sao?" (mật độ), "nằm rải hay tụm?" (phân bố), "trẻ hay già?" (cấu trúc tuổi), "đẻ nhanh hay chết nhanh?" (b vs d).

### 2.1. Kích thước (N) và mật độ (D)

- **Kích thước quần thể (population size, N)** = tổng số cá thể. Ví dụ ao có 1,200 con cá rô → N = 1,200.
- **Mật độ (density, D)** = số cá thể trên đơn vị diện tích (hoặc thể tích): \`D = N / S\`.

**Bốn ví dụ số:**

| Quần thể | N | Diện tích S | D = N/S |
|----------|---|-------------|---------|
| Cá rô ao A | 1,200 | 400 m² | **3 con/m²** |
| Bồ câu trong khuôn viên trường | 80 | 2 ha = 20,000 m² | **0.004 con/m²** = 4 con/1000 m² |
| Tảo trong hồ nuôi | 5×10⁹ | 1 m³ | **5×10⁹ tế bào/m³** |
| Người Việt Nam (2024) | 100×10⁶ | 331,000 km² | **≈ 302 người/km²** |

### 2.2. Phân bố không gian (spatial distribution)

Ba kiểu phân bố — câu hỏi "các cá thể nằm rải đều, ngẫu nhiên, hay tụm lại?".

| Kiểu | Khi nào xuất hiện | Ví dụ |
|------|-------------------|-------|
| **Đều (uniform)** | có cạnh tranh mạnh, lãnh thổ rõ | chim cánh cụt làm tổ; cây thông trồng theo hàng |
| **Ngẫu nhiên (random)** | môi trường đồng đều, không tương tác | cây bồ công anh nảy mầm từ hạt bay theo gió |
| **Cụm (clumped)** | có nguồn lực tập trung, sống bầy đàn | đàn cá, đàn voi quanh hồ nước, nấm mọc thành đám |

Trong tự nhiên, **phân bố cụm là phổ biến nhất** vì tài nguyên (nước, thức ăn, nơi trú) hiếm khi phân bố đều.

### 2.3. Cấu trúc tuổi (age structure) và tháp dân số

Quần thể chia thành 3 nhóm tuổi: **trước sinh sản (pre-reproductive)**, **đang sinh sản (reproductive)**, **sau sinh sản (post-reproductive)**.

Vẽ ngang ba khối này thành "tháp dân số (population pyramid)" → đoán xu hướng tương lai:

- **Tháp đáy rộng** (nhiều trẻ) → quần thể **đang tăng nhanh** (vd Việt Nam thập niên 1980, châu Phi hiện nay).
- **Tháp cân đối** (3 khối gần bằng nhau) → **ổn định** (vd Pháp, Mỹ).
- **Tháp đáy hẹp, đỉnh rộng** (nhiều già) → **đang giảm** (vd Nhật Bản, Hàn Quốc hiện nay).

### 2.4. Tỉ lệ giới (sex ratio)

Tỉ lệ đực:cái. Ở đa số loài có tính chia giới, tỉ lệ này gần 1:1 (do cơ chế xác định giới tính). Tuy nhiên thực tế bị lệch do tuổi thọ khác nhau, di cư, ... Ví dụ ở người Việt Nam khi sinh: ~110 trai/100 gái (lệch do can thiệp xã hội).

### 2.5. Bốn nguồn thay đổi N: b, d, i, e

Trong khoảng thời gian Δt, N thay đổi bằng cách:

- **Sinh (births, B)** → N tăng.
- **Tử (deaths, D)** → N giảm.
- **Nhập cư (immigration, I)** → N tăng.
- **Xuất cư (emigration, E)** → N giảm.

Cân bằng: **ΔN = B − D + I − E**.

Khi chia cho N (số trung bình trong kỳ) ta có **tỉ lệ riêng**: \`b = B/N\`, \`d = D/N\`, \`i = I/N\`, \`e = E/N\`. Định nghĩa **tốc độ tăng trưởng riêng tức thời (intrinsic rate of increase)**:

$$r = (b - d) + (i - e)$$

Nếu xét quần thể "kín" (không có nhập/xuất cư): \`r = b − d\`.

**Bốn ví dụ số:**

1. Quần thể có b = 0.30/năm, d = 0.10/năm, i = e = 0 → **r = 0.20/năm** (tăng 20%/năm).
2. b = 0.05/năm, d = 0.05/năm, i = 0, e = 0 → **r = 0** (ổn định).
3. b = 0.04/năm, d = 0.08/năm, i = 0, e = 0 → **r = −0.04/năm** (giảm 4%/năm).
4. b = 0.10, d = 0.05, i = 0.02, e = 0.04 → **r = 0.05 − 0.02 = 0.03/năm**.

### ❓ Câu hỏi tự nhiên của người đọc

**Q: Vì sao đo r mà không đo "số con tăng" trực tiếp?**
A: Vì r là **tỉ lệ** (per-capita rate), nó **chuẩn hóa theo kích thước hiện tại**. Quần thể 100 con tăng thêm 10 con/năm và quần thể 10,000 con tăng thêm 1,000 con/năm có cùng \`r = 0.1/năm\` — đặc trưng sinh học giống nhau, dù số tuyệt đối khác hẳn. r cho phép so sánh các quần thể có quy mô khác nhau.

**Q: r là số dương luôn à?**
A: Không. r > 0 → tăng (đường J/S đi lên). r = 0 → ổn định. r < 0 → giảm (nguy cơ tuyệt chủng nếu kéo dài).

### 🔁 Dừng lại tự kiểm tra

1. Quần thể chuột có 500 con sống trên 100 m². Tính mật độ.
2. Trong 1 năm, quần thể nai có 200 con sinh ra, 80 con chết, 30 con đi nơi khác, 10 con từ nơi khác đến. ΔN trong năm bằng bao nhiêu?

<details>
<summary>Đáp án</summary>

1. D = 500 / 100 = **5 chuột/m²**.
2. ΔN = B − D + I − E = 200 − 80 + 10 − 30 = **+100** (quần thể tăng 100 con).

</details>

### 📝 Tóm tắt mục 2

- 5 đặc trưng chính: kích thước N, mật độ D = N/S, phân bố (đều/ngẫu nhiên/cụm), cấu trúc tuổi, tỉ lệ giới.
- 4 nguồn thay đổi: sinh (B), tử (D), nhập (I), xuất (E) → ΔN = B − D + I − E.
- Tốc độ tăng trưởng riêng: r = (b − d) + (i − e). r dương → tăng, âm → giảm.

---

## 3. Mô hình tăng trưởng cấp số nhân (Exponential, đường J)

### 💡 Trực giác / Hình dung

Hình dung một cặp vi khuẩn nhân đôi sau mỗi 20 phút. Cứ mỗi vòng, số lượng tăng gấp đôi: 2 → 4 → 8 → 16 → ... Sau 10 vòng đã có 1,024 con; sau 20 vòng (~7 giờ) đã hơn 1 triệu. Không có yếu tố hãm phanh nào — đây là tăng trưởng **cấp số nhân (exponential)** thuần. Đồ thị có dạng **chữ J** vểnh lên cao vô tận. Trong tự nhiên kiểu tăng này chỉ kéo dài được rất ngắn — ngay sau đó tài nguyên cạn → mô hình thực phải chuyển sang logistic (§4).

### 3.1. Phương trình

Khi quần thể tăng trưởng **không giới hạn** (môi trường lý tưởng: vô hạn thức ăn, không có kẻ thù, không bệnh):

$$\\frac{dN}{dt} = r \\cdot N$$

Nghiệm là hàm mũ:

$$N(t) = N_0 \\cdot e^{r \\cdot t}$$

Trong đó \`N₀\` là kích thước ban đầu (tại t = 0), \`r\` là tốc độ tăng trưởng riêng (per-capita), \`e ≈ 2.71828\`.

### 3.2. Bốn ví dụ số (BẮT BUỘC tính cụ thể)

**Ví dụ 1 — vi khuẩn r = 0.5/giờ, N₀ = 100:**

| t (giờ) | r·t | e^(r·t) | N(t) = 100·e^(r·t) |
|---------|-----|---------|--------------------|
| 0 | 0 | 1 | **100** |
| 2 | 1 | 2.718 | **272** |
| 4 | 2 | 7.389 | **739** |
| 10 | 5 | 148.41 | **14,841** |
| 20 | 10 | 22,026 | **2.20 × 10⁶** |

Quan sát: từ t = 10 đến t = 20 (chỉ 10 giờ tiếp theo) tăng từ 15k lên 2.2 triệu — tăng gấp **148 lần**. Đó là sức mạnh khủng khiếp của cấp số nhân.

**Ví dụ 2 — thỏ ở Úc, r ≈ 0.6/năm, N₀ = 24** (24 con thỏ châu Âu được thả năm 1859). Sau 50 năm (1909) nếu không giới hạn:
N(50) = 24 · e^(0.6×50) = 24 · e³⁰ ≈ 24 · 1.07×10¹³ ≈ **2.57 × 10¹⁴ con thỏ**. Tất nhiên đây là tính lý thuyết — Úc không đủ chỗ cho 257 nghìn tỷ con. Thực tế đã tăng đến ~600 triệu rồi bị hãm bởi K (xem §4).

**Ví dụ 3 — thời gian gấp đôi (doubling time)**: từ \`N(t) = 2N₀\` ⇒ \`e^(r·t) = 2\` ⇒ \`r·t = ln 2 ≈ 0.693\` ⇒ \`t_double = 0.693 / r\`. Với r = 0.5/giờ: \`t_double = 0.693/0.5 ≈ 1.39 giờ\`. Với dân số người r ≈ 0.011/năm: \`t_double ≈ 63 năm\` (giải thích vì sao dân số Việt Nam mất ~63 năm để gấp đôi).

**Ví dụ 4 — r âm (suy giảm)**: voi rừng r = −0.02/năm, N₀ = 500. Sau 30 năm: \`N(30) = 500·e^(−0.6) = 500·0.549 ≈ 274 con\`. Quần thể **giảm gần một nửa** trong 30 năm — đây là tốc độ suy giảm nguy hiểm với loài lớn.

### ⚠ Lỗi thường gặp

- **Nhầm "cấp số nhân" với "tăng nhanh"**: cấp số nhân là **tăng theo TỈ LỆ % không đổi**, có thể rất chậm lúc đầu nhưng nhanh khủng khiếp về sau. Vi khuẩn tăng từ 100 → 272 trong 2 giờ trông không có gì, nhưng từ 14k → 2.2 triệu trong 10 giờ là khủng khiếp.
- **Cho rằng cấp số nhân duy trì mãi**: KHÔNG — mọi môi trường thực đều có giới hạn (thức ăn, không gian, oxy). Cấp số nhân chỉ là pha **đầu** của tăng trưởng. Sau đó phải chuyển sang logistic.
- **Tính N(t) bằng \`N₀ · r^t\`** (số mũ tự nhiên \`r\` thay vì \`e^(r·t)\`): SAI. Công thức đúng dùng \`e^(r·t)\`. Cũng có công thức rời rạc \`N_{k+1} = N_k · λ\` với \`λ = e^r\` (tỉ lệ tăng mỗi đơn vị thời gian) — đó là dạng khác, dùng khi tính theo bước thời gian rời rạc (vd theo năm).

### ❓ Câu hỏi tự nhiên của người đọc

**Q: Cấp số nhân có thật sự xảy ra trong tự nhiên?**
A: Có nhưng ngắn. Vi khuẩn mới cấy vào môi trường giàu dưỡng chất, thỏ mới được thả vào lục địa mới (Úc 1859), tảo nở hoa khi sông giàu nitrate — đều là pha cấp số nhân. Chỉ kéo dài đến khi tài nguyên bắt đầu cạn.

**Q: Vì sao dùng \`e\` mà không dùng \`2\`?**
A: Vì \`e\` xuất hiện tự nhiên khi giải phương trình vi phân \`dN/dt = rN\`. Nếu dùng cơ số 2 phải viết \`N(t) = N₀ · 2^(t/t_double)\` — biến đổi qua lại bằng \`2 = e^(ln 2)\`, kết quả như nhau. \`e\` chỉ gọn hơn về mặt toán.

### 🔁 Dừng lại tự kiểm tra

Một quần thể nấm men có r = 0.4/giờ, N₀ = 50. Tính N sau 5 giờ và sau 10 giờ. Tỉ số \`N(10)/N(5)\` bằng bao nhiêu? Nó nói gì về tăng trưởng cấp số nhân?

<details>
<summary>Đáp án</summary>

- N(5) = 50 · e^(0.4·5) = 50 · e² = 50 · 7.389 ≈ **369**.
- N(10) = 50 · e^(0.4·10) = 50 · e⁴ = 50 · 54.60 ≈ **2,730**.
- Tỉ số N(10)/N(5) = 2,730 / 369 ≈ **7.39 = e²**.

Tăng trưởng cấp số nhân có tính chất **"tỉ số phụ thuộc vào khoảng thời gian, không phụ thuộc vào thời điểm bắt đầu"**: mỗi 5 giờ trôi qua, quần thể được nhân với cùng một hệ số e² ≈ 7.39, bất kể là từ giờ 0→5, 5→10, hay 100→105.

</details>

### 📝 Tóm tắt mục 3

- Cấp số nhân: \`dN/dt = rN\` ⇒ \`N(t) = N₀ · e^(r·t)\`. Đồ thị J.
- Thời gian gấp đôi \`t_double = ln 2 / r ≈ 0.693/r\`.
- Là mô hình lý tưởng, không bền vững. Chỉ mô tả pha đầu khi tài nguyên còn dồi dào.

---

## 4. Mô hình logistic (đường S) và sức chứa K

### 💡 Trực giác / Hình dung

Đường J không thực tế — không có ao nào chứa nổi 2.57 × 10¹⁴ con thỏ. Mọi môi trường có **trần** — gọi là **sức chứa (carrying capacity), K**. Khi N nhỏ so với K, quần thể chưa thấy giới hạn → tăng như cấp số nhân. Khi N tiến gần K, tài nguyên cạn dần, cạnh tranh tăng, tỉ lệ tử tăng → tăng trưởng chậm lại. Khi N = K, sinh = tử → tăng trưởng dừng. Đồ thị có dạng **chữ S (sigmoid)**: dốc lên rồi cong xuống và phẳng dần ở mức K.

### 4.1. Phương trình logistic

$$\\frac{dN}{dt} = r \\cdot N \\cdot \\left(1 - \\frac{N}{K}\\right)$$

Có thể đọc là: "tốc độ tăng cấp số nhân \`rN\` được nhân với hệ số kìm hãm \`(1 − N/K)\`".

- Khi \`N ≪ K\`: \`N/K ≈ 0\` → \`(1 − N/K) ≈ 1\` → \`dN/dt ≈ rN\` (gần cấp số nhân).
- Khi \`N = K/2\`: \`(1 − 1/2) = 1/2\` → \`dN/dt = rN/2\`.
- Khi \`N = K\`: \`(1 − 1) = 0\` → \`dN/dt = 0\` (dừng tăng).
- Khi \`N > K\` (do quá tải tạm thời): \`(1 − N/K) < 0\` → \`dN/dt < 0\` (giảm về K).

### 4.2. Bốn ví dụ số

**Ví dụ 1 — K = 1000, r = 0.1/đơn vị thời gian, tại N = 200:**

dN/dt = 0.1 · 200 · (1 − 200/1000) = 0.1 · 200 · 0.8 = **16 cá thể/đơn vị thời gian**.

**Ví dụ 2 — Cùng K, r; tại N = 500 (chính giữa K)**:

dN/dt = 0.1 · 500 · (1 − 500/1000) = 0.1 · 500 · 0.5 = **25 cá thể/đơn vị thời gian** (cao hơn ví dụ 1, dù N gần K hơn).

**Ví dụ 3 — Cùng K, r; tại N = 900 (gần K):**

dN/dt = 0.1 · 900 · (1 − 900/1000) = 0.1 · 900 · 0.1 = **9 cá thể/đơn vị thời gian** (chậm hẳn).

**Ví dụ 4 — N vượt K (N = 1200, quá tải):**

dN/dt = 0.1 · 1200 · (1 − 1200/1000) = 0.1 · 1200 · (−0.2) = **−24/đơn vị thời gian** (quần thể GIẢM về K).

So sánh 3 trường hợp N = 200, 500, 900 với cùng K, r:

| N | (1 − N/K) | dN/dt |
|---|-----------|-------|
| 200 | 0.8 | 16 |
| 500 | **0.5** | **25 (max)** |
| 900 | 0.1 | 9 |

→ Tốc độ tăng đạt **cực đại tại N = K/2**.

### 4.3. Vì sao N = K/2 cho dN/dt cực đại? (chứng minh)

Coi \`dN/dt = f(N) = r · N · (1 − N/K) = r·N − r·N²/K\`. Đạo hàm theo N:

$$\\frac{df}{dN} = r - \\frac{2rN}{K}$$

Đặt bằng 0: \`r = 2rN/K\` ⇒ \`N = K/2\`. Giá trị cực đại:

$$\\left.\\frac{dN}{dt}\\right|_{N=K/2} = r \\cdot \\frac{K}{2} \\cdot \\frac{1}{2} = \\frac{rK}{4}$$

Với K = 1000, r = 0.1: dN/dt max = 0.1 · 1000 / 4 = **25** (khớp ví dụ 2).

### 4.4. Ứng dụng — khai thác bền vững (maximum sustainable yield)

Nếu đánh cá quá nhanh → N giảm xuống dưới K/2 → tốc độ phục hồi chậm → cạn kiệt. Nếu để N tự nhiên gần K → tăng trưởng cũng chậm. **Khai thác tối ưu là giữ N = K/2** — quần thể tự tái tạo nhanh nhất, ta lấy bằng đúng \`rK/4\` mỗi đơn vị thời gian thì N không đổi.

Ví dụ: hồ cá có K = 10,000 con, r = 0.5/năm. Mức đánh bắt bền vững tối đa = 0.5 × 10,000 / 4 = **1,250 con/năm**, với điều kiện giữ đàn cá ở N ≈ 5,000.

### ⚠ Lỗi thường gặp

- **Coi K là hằng số tuyệt đối**: K không phải con số "trời cho". K thay đổi theo điều kiện môi trường — mưa nhiều → cây tốt → K cao; hạn hán → K giảm. Mất rừng làm K giảm; bảo tồn nâng K.
- **Nhầm logistic = cấp số nhân nhanh hơn**: ngược lại, logistic **chậm hơn** ở mọi N > 0 (vì \`(1 − N/K) < 1\`). Logistic = cấp số nhân có yếu tố hãm.
- **Quên dấu khi N > K**: khi quá tải, \`(1 − N/K)\` âm → \`dN/dt\` âm → giảm. Đây là cách logistic tự "kéo" N về K.
- **Nhầm N = K/2 là "ngưỡng nguy hiểm"**: không, đó là điểm tốc độ tăng max, là điểm **tốt nhất** cho khai thác. Ngưỡng nguy hiểm là khi N quá nhỏ, không phải K/2.

### ❓ Câu hỏi tự nhiên của người đọc

**Q: Đường S có "lật ngược" không nếu r âm?**
A: Có. Khi r < 0 (vd ô nhiễm nặng), logistic suy biến thành cấp số nhân suy giảm; N → 0. Đường S đẹp đẽ chỉ xuất hiện khi r > 0.

**Q: Thực tế N có chạm K rồi đứng yên không?**
A: Hiếm. Quần thể thực dao động quanh K — lúc trên, lúc dưới — do nhiễu môi trường, dịch bệnh, mùa. Mô hình logistic là **trung bình dài hạn**.

### 🔁 Dừng lại tự kiểm tra

Hồ cá rô có K = 4,000 con, r = 0.2/năm.

1. Hiện tại có 800 con. Tốc độ tăng dN/dt = ?
2. Mức đánh bắt bền vững tối đa là bao nhiêu con/năm? Khi đó N = ?

<details>
<summary>Đáp án</summary>

1. dN/dt = 0.2 · 800 · (1 − 800/4000) = 0.2 · 800 · 0.8 = **128 con/năm**.
2. dN/dt_max = rK/4 = 0.2 · 4000 / 4 = **200 con/năm**, đạt khi N = K/2 = **2,000 con**.

</details>

### 📝 Tóm tắt mục 4

- Logistic: \`dN/dt = rN(1 − N/K)\`, đồ thị S. K = sức chứa.
- Tốc độ tăng cực đại tại N = K/2, giá trị dN/dt_max = rK/4.
- Khi N > K → dN/dt < 0 → quần thể tự điều chỉnh về K.
- K không phải hằng số tuyệt đối — thay đổi theo môi trường.

---

## 5. Chiến lược sinh sản: r-selection vs K-selection

### 💡 Trực giác / Hình dung

Tự nhiên có hai "chiến lược kinh doanh con cái" trái ngược. **r-selection**: đẻ thật nhiều, đầu tư ít, hi vọng vài đứa sống sót — như startup tung sản phẩm rẻ, số lượng lớn, bù lại tỉ lệ thất bại cao. **K-selection**: đẻ ít, đầu tư cực sâu vào mỗi đứa — như hãng xa xỉ làm sản phẩm thủ công, số ít nhưng từng cái phải hoàn hảo.

### 5.1. Bảng so sánh

| Đặc điểm | r-selection | K-selection |
|----------|-------------|-------------|
| Số con mỗi lứa | rất nhiều (10² – 10⁶) | ít (1–10) |
| Đầu tư mỗi con | thấp (không chăm) | cao (chăm sóc kéo dài) |
| Tuổi thọ | ngắn | dài |
| Tuổi thành thục sinh dục | sớm | muộn |
| Kích thước cơ thể | nhỏ | lớn |
| Khả năng sống sót con non | thấp | cao |
| Mức N tự nhiên | dao động mạnh quanh K | gần K, ổn định |
| Môi trường ưa | biến động, khắc nghiệt | ổn định |

### 5.2. Bốn ví dụ thực tế

1. **Ruồi giấm (Drosophila)** — r-strategist: 1 lần đẻ ~100 trứng, đời sống ~30 ngày, không chăm con. r ≈ 0.3/ngày.
2. **Cá hồi (salmon)** — r: đẻ vài nghìn trứng, hầu hết bị ăn, chỉ vài cá thể về sông sinh sản.
3. **Voi châu Phi** — K-strategist: thai 22 tháng, 1 con/lứa, mẹ chăm 5-10 năm, tuổi thọ ~60 năm. r ≈ 0.05/năm.
4. **Con người** — K cực đoan: thường 1 con/lứa, đầu tư 18-25 năm, tuổi thọ ~75 năm. Là loài K-selected điển hình nhất.

### ❓ Câu hỏi tự nhiên của người đọc

**Q: Có loài "ở giữa" không?**
A: Có. r vs K là phổ liên tục, không phải hai hộp tách biệt. Chuột là r-strategist nhẹ (đẻ 6-10 con/lứa, sống vài năm); chim là K-strategist nhẹ (vài trứng, chăm con). Hầu hết loài nằm đâu đó giữa.

**Q: Có lựa chọn nào tốt hơn?**
A: Không tuyệt đối. r-selection thắng ở môi trường biến động (thiên tai, mùa khô khắc nghiệt) vì nhanh hồi phục. K-selection thắng ở môi trường ổn định (rừng nhiệt đới ổn định triệu năm) vì cạnh tranh chất lượng quan trọng hơn số lượng.

### 📝 Tóm tắt mục 5

- r-selection: nhiều con, đầu tư ít, tuổi thọ ngắn (côn trùng, cá đẻ trứng).
- K-selection: ít con, đầu tư nhiều, tuổi thọ dài (voi, người).
- Hai chiến lược phù hợp với hai kiểu môi trường khác nhau, không có "tốt hơn".

---

## 6. Biến động quần thể và dao động Lotka–Volterra

### 💡 Trực giác / Hình dung

Quan sát dài hạn quần thể linh miêu (lynx) và thỏ rừng (snowshoe hare) ở Canada (từ sổ lông thú của công ty Hudson's Bay, 1845–1935) cho thấy hai đường gợn sóng **lệch pha**: thỏ tăng → vài năm sau linh miêu tăng (vì có nhiều mồi) → linh miêu ăn nhiều thỏ → thỏ giảm → vài năm sau linh miêu cũng giảm (vì thiếu mồi) → thỏ phục hồi → linh miêu phục hồi... Chu kỳ ~10 năm.

### 6.1. Mô hình Lotka–Volterra (đơn giản)

Gọi \`H\` = số thỏ (hare, con mồi), \`L\` = số linh miêu (lynx, kẻ săn):

$$\\frac{dH}{dt} = a \\cdot H - b \\cdot H \\cdot L$$

$$\\frac{dL}{dt} = c \\cdot b \\cdot H \\cdot L - d \\cdot L$$

- \`a\` = tỉ lệ sinh của thỏ khi không có linh miêu.
- \`b\` = tốc độ linh miêu ăn thỏ (tỉ lệ thuận với H·L).
- \`c\` = hiệu suất chuyển thỏ ăn được thành linh miêu mới (~0.1).
- \`d\` = tỉ lệ tử của linh miêu khi không có thỏ.

Hệ này không có nghiệm tăng/giảm đơn điệu — nó **dao động tuần hoàn** quanh điểm cân bằng \`(H*, L*) = (d / (c·b), a / b)\`.

### 6.2. Ví dụ số

Lấy a = 0.5/năm, b = 0.02/(thỏ·năm), c = 0.1, d = 0.3/năm:
- Điểm cân bằng: H* = 0.3 / (0.1 · 0.02) = **150 thỏ**, L* = 0.5 / 0.02 = **25 linh miêu**.
- Khởi đầu (H₀, L₀) = (200, 30) → quỹ đạo xoáy quanh (150, 25), chu kỳ ~10 năm.

### 6.3. Các kiểu biến động trong tự nhiên

1. **Dao động theo mùa**: số ruồi tăng vào hè, giảm vào đông; cá hồi đông đúc tháng 9-10. Không có chu kỳ năm thật, chỉ là phản ứng theo nhiệt độ/mùa.
2. **Dao động chu kỳ nhiều năm**: linh miêu × thỏ ~10 năm, chuột lemming ~3-4 năm.
3. **Bùng nổ rồi sụp đổ (boom-bust)**: tảo nở hoa, châu chấu, sâu róm — N tăng cực nhanh khi điều kiện thuận, rồi sụp đổ do hết thức ăn hoặc dịch.
4. **Dao động không tuần hoàn (chaotic)**: nhiều quần thể nhỏ chịu nhiễu mạnh, không có chu kỳ rõ.

### ⚠ Lỗi thường gặp

- **Cho rằng tăng giảm bất kỳ là chu kỳ**: cần phải có **tính lặp lại** mới gọi là chu kỳ. Dao động ngẫu nhiên không phải chu kỳ.
- **Nhầm Lotka–Volterra với logistic**: logistic mô tả 1 quần thể trong môi trường giới hạn; Lotka–Volterra mô tả 2 quần thể tương tác (kẻ săn × con mồi).

### 📝 Tóm tắt mục 6

- Quần thể tự nhiên hiếm khi đứng yên — luôn có dao động.
- Lotka–Volterra: 2 phương trình ghép, cho dao động tuần hoàn giữa kẻ săn và con mồi.
- Linh miêu × thỏ ~10 năm là minh chứng kinh điển.

---

## 7. Bài tập + Lời giải chi tiết

### Bài tập

**Bài 1**: Quần thể chim trên đảo có 600 cá thể trên diện tích 12 km². Trong 1 năm: 90 con sinh, 45 con chết, 5 con bay đến từ đảo khác, 10 con bay đi. Tính: (a) mật độ ban đầu; (b) ΔN trong năm; (c) tỉ lệ tăng trưởng r ≈ ΔN/N₀.

**Bài 2**: Vi khuẩn có r = 0.7/giờ, N₀ = 50. (a) Viết công thức N(t). (b) Tính N(3), N(6), N(12). (c) Tính thời gian để N gấp đôi.

**Bài 3**: Hồ nuôi cá có K = 8,000 con, r = 0.4/năm. Khi quần thể có 2,000 con và khi có 6,000 con: tính dN/dt từng trường hợp và giải thích con số.

**Bài 4**: Cùng hồ ở Bài 3, tìm mức đánh bắt bền vững tối đa (số cá/năm) và kích thước quần thể tương ứng.

**Bài 5**: Một quần thể côn trùng tăng từ 100 cá thể (t = 0) lên 500 cá thể (t = 4 giờ). Giả thiết tăng cấp số nhân. (a) Tính r. (b) Khi nào quần thể đạt 10,000?

**Bài 6**: Liệt kê 4 đặc điểm phân biệt loài r-selected với loài K-selected; cho 1 ví dụ mỗi loại không nằm trong các ví dụ đã có ở §5.

### Lời giải

**Bài 1**:
- (a) D = N/S = 600 / 12 = **50 chim/km²**.
- (b) ΔN = B − D + I − E = 90 − 45 + 5 − 10 = **+40 cá thể/năm**.
- (c) r ≈ ΔN / N₀ = 40 / 600 = **0.0667/năm**, tức ~6.67%/năm. (Đây là xấp xỉ rời rạc; r chính xác trong mô hình liên tục là \`ln(640/600) ≈ 0.0645/năm\`, hai cách cho kết quả gần nhau khi r nhỏ.)

**Bài 2**:
- (a) \`N(t) = 50 · e^(0.7·t)\`.
- (b)
  - N(3) = 50 · e^(2.1) = 50 · 8.166 ≈ **408**.
  - N(6) = 50 · e^(4.2) = 50 · 66.69 ≈ **3,335**.
  - N(12) = 50 · e^(8.4) = 50 · 4,447 ≈ **222,300**.
- (c) \`t_double = ln 2 / r = 0.693 / 0.7 ≈ **0.99 giờ**\` (khoảng 59 phút).

**Bài 3** (K = 8,000, r = 0.4):
- Tại N = 2,000: dN/dt = 0.4 · 2,000 · (1 − 2,000/8,000) = 0.4 · 2,000 · 0.75 = **600 con/năm**.
- Tại N = 6,000: dN/dt = 0.4 · 6,000 · (1 − 6,000/8,000) = 0.4 · 6,000 · 0.25 = **600 con/năm**.

Hai giá trị bằng nhau — đó là vì N = 2,000 và N = 6,000 đối xứng quanh N = K/2 = 4,000. Tại N = K/2: dN/dt_max = 0.4 · 8,000 / 4 = **800 con/năm**.

**Bài 4**: Mức đánh bắt bền vững tối đa = dN/dt_max = rK/4 = 0.4 · 8,000 / 4 = **800 con/năm**, giữ N ở **K/2 = 4,000 con**. Nếu đánh > 800 con/năm → N giảm dần → tốc độ phục hồi cũng giảm → cạn kiệt. Nếu đánh < 800 con/năm với N ở 4,000 → quần thể sẽ tăng và sản lượng đánh bắt thực giảm hiệu quả.

**Bài 5**:
- (a) 500 = 100 · e^(r·4) ⇒ e^(4r) = 5 ⇒ 4r = ln 5 ≈ 1.609 ⇒ r ≈ **0.402/giờ**.
- (b) 10,000 = 100 · e^(0.402·t) ⇒ e^(0.402·t) = 100 ⇒ 0.402·t = ln 100 ≈ 4.605 ⇒ t ≈ **11.45 giờ**.

**Bài 6**: 4 đặc điểm phân biệt:

| Đặc điểm | r-selected | K-selected |
|----------|-----------|-----------|
| Số con/lứa | rất nhiều | ít |
| Đầu tư chăm sóc | thấp | cao |
| Tuổi thọ | ngắn | dài |
| Kích thước cơ thể | nhỏ | lớn |

Ví dụ mới: r — **giun đất (đẻ kén hàng trăm trứng, sống vài năm, không chăm con)**; K — **cá voi xanh (1 con/2-3 năm, mang thai 11 tháng, mẹ nuôi 6-8 tháng, sống ~80 năm)**.

---

## Liên kết và bài tiếp theo

- **Bài tiếp theo trong Biology**: [Lesson 07 — Hệ sinh thái & dòng năng lượng](../lesson-07-ecosystems-energy-flow/) — vượt ra ngoài 1 quần thể, nhìn cả cộng đồng nhiều loài và dòng năng lượng giữa các bậc dinh dưỡng.
- **Tham chiếu Tầng 2**: [Sinh học quần thể — Hardy-Weinberg](../../02-Genetics-Evolution/lesson-06-population-genetics/) — cùng "quần thể" nhưng nhìn từ tần số allele.
- **Tham chiếu Tầng 1**: [Chu kỳ tế bào](../../01-Molecules-Cells/lesson-07-cell-cycle-mitosis/) — gốc của tăng trưởng cấp số nhân (2ⁿ).
- **Liên kết Math**: hàm mũ \`e^(r·t)\` và phương trình vi phân tách biến \`dN/dt = rN\` — \`Math/Calculus/lesson-04-exponential\`.
- **Visualization**: [visualization.html](./visualization.html) — đồ thị J vs S, máy tính logistic, so sánh r-K, dao động Lotka–Volterra.

---

## 📝 Tổng kết Lesson 06

1. **Quần thể sinh thái** = cùng loài + cùng khu vực + cùng thời điểm. Đặc trưng bởi N, mật độ D = N/S, phân bố (đều/ngẫu nhiên/cụm), cấu trúc tuổi, tỉ lệ giới.
2. **4 nguồn thay đổi**: ΔN = B − D + I − E; tốc độ riêng \`r = (b − d) + (i − e)\`.
3. **Cấp số nhân (J)**: \`N(t) = N₀ · e^(r·t)\`. Đẹp về toán, chỉ đúng trong pha đầu khi tài nguyên dồi dào. Thời gian gấp đôi \`t_double = ln 2 / r\`.
4. **Logistic (S)**: \`dN/dt = rN(1 − N/K)\`. K = sức chứa. Tốc độ cực đại tại N = K/2, giá trị \`dN/dt_max = rK/4\`. Mức khai thác bền vững = rK/4 với N giữ ở K/2.
5. **r-selection vs K-selection**: hai chiến lược sinh sản đối lập — đẻ nhiều/đầu tư ít vs đẻ ít/đầu tư nhiều. Phù hợp với hai kiểu môi trường khác nhau.
6. **Dao động**: quần thể tự nhiên hiếm khi đứng yên. Mô hình Lotka–Volterra (kẻ săn × con mồi) cho dao động tuần hoàn; linh miêu × thỏ ~10 năm là kinh điển.

**Tiếp theo**: [Lesson 07 — Hệ sinh thái & dòng năng lượng](../lesson-07-ecosystems-energy-flow/)
`;
