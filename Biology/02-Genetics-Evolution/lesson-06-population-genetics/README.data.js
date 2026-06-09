// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: Biology/02-Genetics-Evolution/lesson-06-population-genetics/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 06 — Di truyền quần thể

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Phân biệt **tần số allele (allele frequency)**, **tần số kiểu gen (genotype frequency)** và **tần số kiểu hình (phenotype frequency)** — đếm và tính được từ dữ liệu thật.
- Phát biểu và áp dụng **định luật Hardy–Weinberg (HW)**: $p^2 + 2pq + q^2 = 1$, đi kèm $p + q = 1$ cho 2 allele.
- Liệt kê đủ **5 điều kiện cân bằng HW** (không đột biến, không di-nhập gen, không chọn lọc, giao phối ngẫu nhiên, quần thể vô cùng lớn) và nói được vì sao thiếu 1 điều kiện là phá vỡ cân bằng.
- Vận dụng HW từ **tần số kiểu hình lặn** ($q^2$) → suy ra $q$, $p$, và **tần số người mang gen lặn dị hợp** $2pq$ (ứng dụng dịch tễ bệnh di truyền lặn).
- **Kiểm tra một quần thể có ở trạng thái HW không** bằng cách so sánh kiểu gen quan sát với dự đoán $p^2$, $2pq$, $q^2$.
- Mô phỏng **sự thay đổi tần số allele** qua nhiều thế hệ khi 1 điều kiện bị phá vỡ (vd chọn lọc loại bỏ aa).

## Kiến thức tiền đề

- Allele, kiểu gen, kiểu hình, đồng hợp/dị hợp, trội/lặn — [\`Lesson 01 — Di truyền Mendel\`](../lesson-01-mendelian-genetics/).
- Đột biến là nguồn allele mới của quần thể — [\`Lesson 05 — Đột biến & công nghệ gen\`](../lesson-05-mutation-biotech/).
- Tỉ lệ phần trăm và xác suất cơ bản (đặc biệt $(p+q)^2 = p^2 + 2pq + q^2$ — hằng đẳng thức bình phương một tổng).

---

## 1. Quần thể và vốn gen — đối tượng nghiên cứu

### 💡 Trực giác / Hình dung

Trước đây Mendel cho ta xem **một phép lai** (Aa × Aa). Bây giờ thử zoom out: lấy **cả một làng 10,000 người** — mỗi người 2 allele cho một gen → có 20,000 "viên đá" allele trộn lẫn trong "hồ" chung. Di truyền quần thể nghiên cứu hồ đó: tỉ lệ các viên đá, và tỉ lệ ấy thay đổi thế nào qua các thế hệ.

### 1.1. Định nghĩa

- **Quần thể (population)**: nhóm các cá thể **cùng loài**, **sống cùng một khu vực địa lý**, có thể **giao phối sinh sản với nhau** tạo thế hệ con hữu thụ.
- **Vốn gen (gene pool)**: tập hợp **tất cả allele** của tất cả các gen trong quần thể tại một thời điểm. Đây là "hồ allele" nói ở trên.
- **Di truyền quần thể (population genetics)**: ngành nghiên cứu tần số allele/kiểu gen trong vốn gen và cách chúng biến đổi.

### 1.2. Ví dụ minh họa

Một quần thể chuột 100 con, gen lông màu có 2 allele: **A** (lông đen, trội) và **a** (lông xám, lặn).

- Mỗi chuột có 2 allele → **tổng allele trong vốn gen = 200**.
- 3 kiểu gen có thể: **AA** (đen đồng hợp), **Aa** (đen dị hợp), **aa** (xám đồng hợp).
- 2 kiểu hình: đen (AA + Aa) và xám (aa).

### ❓ Câu hỏi tự nhiên của người đọc

**Q: Vì sao không đếm từng cá thể mà phải đếm allele?**
A: Vì **chọn lọc và đột biến tác động lên allele**, không tác động trực tiếp lên cá thể — một cá thể chỉ là "xe chở" 2 allele tạm thời. Sang thế hệ sau, cha mẹ tan rã, allele tái tổ hợp vào con cháu. Theo dõi allele giúp ta dự đoán quần thể tiến hóa thế nào.

**Q: Quần thể khác với "loài" hay "cộng đồng" thế nào?**
A: **Loài** rộng hơn — gồm mọi cá thể có thể giao phối hữu thụ trên toàn cầu. **Quần thể** là một **lát cắt địa phương** của loài (vd "đàn chuột làng X"). **Cộng đồng sinh thái (community)** lại rộng hơn quần thể — gồm nhiều loài cùng sống một nơi.

### 📝 Tóm tắt mục 1

- Quần thể = nhóm cùng loài, cùng khu vực, giao phối được với nhau.
- Vốn gen = tổng allele của quần thể. 100 cá thể lưỡng bội → 200 allele/gen.
- Di truyền quần thể đếm allele và kiểu gen, không chỉ đếm cá thể.

---

## 2. Tần số allele và tần số kiểu gen — định nghĩa và cách tính

### 💡 Trực giác / Hình dung

Tưởng tượng đổ 200 viên bi vào một cái rổ: 120 viên đỏ (A) và 80 viên xanh (a). **Tần số allele** đơn giản là **tỉ lệ mỗi màu**: đỏ $120/200 = 0{,}6$ và xanh $80/200 = 0{,}4$. Còn **tần số kiểu gen** là tỉ lệ các "cặp" được ghép từ rổ đó vào từng cá thể (AA, Aa, aa).

### 2.1. Định nghĩa hình thức

Với gen có 2 allele A và a:

- $p$ = tần số allele A = (số allele A trong vốn gen) / (tổng allele).
- $q$ = tần số allele a = (số allele a trong vốn gen) / (tổng allele).
- Vì chỉ có 2 allele: $p + q = 1$.

Tần số kiểu gen — với 3 kiểu AA, Aa, aa, gọi tần số lần lượt là D, H, R (Dominant homozygous, Heterozygous, Recessive homozygous):

- $D + H + R = 1$.

Cách quy đổi từ kiểu gen sang allele:

$$p = D + \\frac{H}{2} \\qquad q = R + \\frac{H}{2}$$

Vì mỗi cá thể AA đóng góp 2 allele A, mỗi cá thể Aa đóng góp 1 A + 1 a, mỗi aa đóng góp 2 a.

### 2.2. Bốn ví dụ số cụ thể

**Ví dụ 1 — Đếm từ kiểu gen (100 cá thể)**: 36 AA, 48 Aa, 16 aa.

- Tổng allele = $100 \\times 2 = 200$.
- Số allele A = $2 \\times 36 + 1 \\times 48 = 72 + 48 = \\textbf{120}$. Số a = $2 \\times 16 + 48 = 32 + 48 = \\textbf{80}$.
- $p = 120/200 = \\textbf{0,6}$, $q = 80/200 = \\textbf{0,4}$. Kiểm tra $p + q = 1$ ✓.
- Cách 2 (qua tần số kiểu gen): $D = 36/100 = 0{,}36$, $H = 0{,}48$, $R = 0{,}16$. $p = 0{,}36 + 0{,}48/2 = 0{,}36 + 0{,}24 = \\textbf{0,6}$ ✓.

**Ví dụ 2 — Đếm từ kiểu gen (400 cá thể)**: 64 AA, 192 Aa, 144 aa.

- $D = 64/400 = 0{,}16$, $H = 192/400 = 0{,}48$, $R = 144/400 = 0{,}36$.
- $p = 0{,}16 + 0{,}48/2 = 0{,}16 + 0{,}24 = \\textbf{0,40}$.
- $q = 0{,}36 + 0{,}24 = \\textbf{0,60}$. Kiểm tra: $0{,}40 + 0{,}60 = 1$ ✓.

**Ví dụ 3 — Quần thể chỉ có 2 kiểu gen**: 200 cá thể, gồm 50 AA và 150 Aa (không có aa).

- $D = 0{,}25$, $H = 0{,}75$, $R = 0$.
- $p = 0{,}25 + 0{,}75/2 = 0{,}25 + 0{,}375 = \\textbf{0,625}$.
- $q = 0 + 0{,}375 = \\textbf{0,375}$. Kiểm tra: $0{,}625 + 0{,}375 = 1$ ✓.

**Ví dụ 4 — Quần thể đơn hình**: 1000 cá thể đều là aa (toàn bộ kiểu hình lặn).

- $p = 0$, $q = \\textbf{1}$. Vốn gen chỉ chứa allele a — gen này **đã cố định (fixed)** trong quần thể.

### 2.3. Phân biệt 3 loại "tần số"

| Tần số | Tính từ | Ví dụ (ở ví dụ 1) |
|--------|---------|-------------------|
| **Tần số allele** | đếm allele riêng lẻ | $p = 0{,}6$, $q = 0{,}4$ |
| **Tần số kiểu gen** | đếm cá thể theo kiểu gen | $D = 0{,}36$, $H = 0{,}48$, $R = 0{,}16$ |
| **Tần số kiểu hình** | đếm cá thể theo kiểu hình | đen (AA + Aa) $= 0{,}84$; xám (aa) $= 0{,}16$ |

### ⚠ Lỗi thường gặp

- **Lẫn tần số allele với tần số kiểu hình**: thấy 16% cá thể xám rồi kết luận "$q = 0{,}16$" — sai. 16% là **tần số kiểu hình lặn**, tức $q^2$, không phải $q$. Đúng phải lấy căn: $q = \\sqrt{0{,}16} = 0{,}4$. Đây là nhầm lẫn phổ biến nhất; xem §4.
- **Quên dị hợp đóng góp cả 2 allele**: chỉ cộng "2×AA + 2×aa" rồi chia → bỏ sót Aa. Mỗi Aa cho 1 A và 1 a, không phải 0.
- **Coi $p + q \\neq 1$**: với gen 2 allele luôn $p + q = 1$; nếu tính ra $p + q = 1{,}1$ hay $0{,}9$ → đã tính sai ở bước nào đó.

### 🔁 Dừng lại tự kiểm tra

1. Một quần thể 500 cá thể: 180 AA, 240 Aa, 80 aa. Tính p và q.
2. Cách 1 (đếm allele trực tiếp) và Cách 2 (qua D, H, R) ra cùng đáp án không?

<details>
<summary>Đáp án</summary>

1. Tổng allele = 1000. Số A = $2 \\times 180 + 240 = 360 + 240 = 600$. Số a = $2 \\times 80 + 240 = 160 + 240 = 400$. $p = 600/1000 = \\textbf{0,6}$; $q = \\textbf{0,4}$.
2. $D = 180/500 = 0{,}36$, $H = 240/500 = 0{,}48$, $R = 80/500 = 0{,}16$. $p = 0{,}36 + 0{,}48/2 = \\textbf{0,6}$ ✓. Hai cách phải luôn ra cùng kết quả, vì chúng chỉ là 2 cách viết của cùng một phép đếm.
</details>

### 📝 Tóm tắt mục 2

- $p + q = 1$ (gen 2 allele); $D + H + R = 1$ (3 kiểu gen).
- Quy đổi: $p = D + H/2$; $q = R + H/2$.
- Phân biệt 3 loại tần số: allele (mỗi viên đá), kiểu gen (mỗi cá thể), kiểu hình (mỗi biểu hiện).

---

## 3. Định luật Hardy–Weinberg

### 💡 Trực giác / Hình dung

Nếu rổ allele có 60% đỏ và 40% xanh, và ta **bốc ngẫu nhiên 2 viên** ghép thành 1 cặp (= 1 cá thể), xác suất các cặp là bao nhiêu?

- Cặp **đỏ–đỏ**: 0.6 × 0.6 = **0.36** = p².
- Cặp **xanh–xanh**: 0.4 × 0.4 = **0.16** = q².
- Cặp **một đỏ một xanh**: 0.6 × 0.4 + 0.4 × 0.6 = **0.48** = 2pq (×2 vì có 2 thứ tự bốc).

Tổng = 0.36 + 0.48 + 0.16 = 1 ✓. Đây chính là HW: **kiểu gen ở thế hệ con = tích các tần số allele đã bốc ngẫu nhiên**.

### 3.1. Phát biểu (Hardy 1908, Weinberg 1908)

Nếu một quần thể đáp ứng đủ **5 điều kiện** (§3.3), thì tần số allele giữ nguyên qua các thế hệ, và tần số kiểu gen tuân theo:

$$\\underbrace{p^2}_{AA} + \\underbrace{2pq}_{Aa} + \\underbrace{q^2}_{aa} = 1$$

- $p^2$ = tần số AA (đồng hợp trội).
- $2pq$ = tần số Aa (dị hợp). Hệ số 2 vì có 2 cách bốc cặp dị hợp (A trước rồi a, hoặc a trước rồi A).
- $q^2$ = tần số aa (đồng hợp lặn).
- Phương trình này chính là khai triển $(p + q)^2 = 1$.

Trạng thái này gọi là **cân bằng Hardy–Weinberg (HW equilibrium)**. Hệ quả quan trọng: **tiến hóa = sự thay đổi tần số allele qua thế hệ** → nếu HW thì quần thể **không tiến hóa** với gen đó.

### 3.2. Ví dụ số minh họa định luật

**Ví dụ 1** — p = 0.6, q = 0.4. HW dự đoán:
- p² = 0.36 → 36% cá thể AA.
- 2pq = 2 × 0.6 × 0.4 = 0.48 → 48% cá thể Aa.
- q² = 0.16 → 16% cá thể aa.
- Tổng 0.36 + 0.48 + 0.16 = 1 ✓.

**Ví dụ 2** — p = 0.9, q = 0.1. HW:
- p² = 0.81 (81% AA), 2pq = 0.18 (18% Aa), q² = 0.01 (1% aa).
- Lưu ý: dù aa chỉ 1%, **tần số người mang gen lặn dị hợp (Aa) cao gấp 18 lần** kiểu hình lặn (aa).

**Ví dụ 3** — p = 0.5, q = 0.5. HW:
- p² = 0.25, 2pq = 0.50, q² = 0.25.
- Khi q càng gần 0.5 thì tỉ lệ dị hợp 2pq càng cao (đạt cực đại 0.5 tại q = 0.5).

**Ví dụ 4** — p = 0.99, q = 0.01. HW:
- p² = 0.9801, 2pq ≈ 0.0198, q² = 0.0001.
- Bệnh lặn cực hiếm (1/10,000) nhưng **~2% dân số là carrier** — số người mang gen lặn lớn hơn rất nhiều so với số người mắc bệnh.

### 3.3. Năm điều kiện của cân bằng HW

| # | Điều kiện | Bị phá vỡ → |
|---|-----------|-------------|
| 1 | Quần thể **vô cùng lớn** (N → ∞) | **Phiêu bạt di truyền (genetic drift)** — biến động ngẫu nhiên do mẫu nhỏ. |
| 2 | **Giao phối ngẫu nhiên (random mating)** | Giao phối có chọn lọc / cận huyết → tần số kiểu gen lệch khỏi p², 2pq, q² (dù p, q vẫn không đổi). |
| 3 | **Không đột biến** (A ↔ a) | Tần số allele dịch chuyển theo tốc độ đột biến. |
| 4 | **Không di-nhập gen (no migration)** | Cá thể vào/ra mang allele theo → thay đổi p, q. |
| 5 | **Không chọn lọc tự nhiên (no selection)** | Một số kiểu gen sống sót/sinh sản nhiều hơn → tần số allele đổi qua thế hệ. |

Trong tự nhiên, **không quần thể thật nào đáp ứng đủ 5 điều kiện** — HW là một **mô hình null (giả thuyết không)**. Nó hữu ích vì:

- Cho **mốc so sánh**: nếu quần thể quan sát không khớp HW → có ít nhất 1 cơ chế tiến hóa đang hoạt động.
- Cho **ước lượng nhanh** trong nhiều tình huống ổn định (vd dịch tễ học bệnh di truyền).

### ❓ Câu hỏi tự nhiên của người đọc

**Q: Vì sao công thức HW lại đúng là khai triển \`(p + q)²\`?**
A: Vì khi giao phối ngẫu nhiên, mỗi cá thể con nhận 1 allele từ mẹ (xác suất A là p, a là q) và 1 từ bố (cũng p, q). Hai sự kiện độc lập → xác suất kiểu gen là tích → đúng quy luật bình phương một tổng \`(p + q)(p + q) = p² + 2pq + q²\`.

**Q: Hệ số 2 trong 2pq từ đâu?**
A: Có 2 cách tạo Aa: "lấy A từ mẹ rồi a từ bố" (xác suất p × q) hoặc "lấy a từ mẹ rồi A từ bố" (xác suất q × p). Cộng lại = 2pq. AA và aa không nhân 2 vì chỉ có 1 cách (A,A) hoặc (a,a).

**Q: HW đúng ngay từ thế hệ đầu hay phải qua nhiều thế hệ?**
A: Nếu xuất phát từ quần thể **chưa cân bằng** (vd kiểu gen ban đầu không khớp p², 2pq, q²), **chỉ cần 1 thế hệ giao phối ngẫu nhiên là đạt cân bằng**. Sau đó nó duy trì mãi (miễn 5 điều kiện vẫn đúng). Đây là một kết quả mạnh — không cần thời gian dài.

### ⚠ Lỗi thường gặp

- **Tưởng "HW = quần thể không tiến hóa là điều bình thường"**: ngược lại, HW là **trường hợp đặc biệt lý tưởng**. Trong tự nhiên, hầu hết quần thể luôn lệch HW vì chọn lọc/đột biến/drift đang xảy ra.
- **Lẫn p² với p**: p = 0.6 → p² = 0.36, không phải 0.6. Đây là lỗi cơ học hay gặp khi vội.
- **Áp HW khi quần thể quá nhỏ**: với N = 20-30 cá thể, drift rất mạnh, HW không phù hợp. HW hợp lý khi N ≥ vài trăm.

### 🔁 Dừng lại tự kiểm tra

1. p = 0.7, q = 0.3. Tính 3 tần số kiểu gen theo HW.
2. Nếu 5 điều kiện HW đều thỏa mãn, sau 10 thế hệ giao phối ngẫu nhiên, tần số allele A có đổi không?

<details>
<summary>Đáp án</summary>

1. p² = 0.49, 2pq = 2 × 0.7 × 0.3 = 0.42, q² = 0.09. Kiểm tra 0.49 + 0.42 + 0.09 = 1 ✓.
2. Không. Đó chính là nội dung của định luật HW: tần số allele **giữ nguyên** qua mọi thế hệ khi đủ 5 điều kiện.
</details>

### 📝 Tóm tắt mục 3

- \`p² + 2pq + q² = 1\` chính là khai triển \`(p + q)²\` — hệ quả của giao phối ngẫu nhiên.
- 5 điều kiện: N lớn, giao phối ngẫu nhiên, không đột biến, không di-nhập gen, không chọn lọc.
- HW là **mô hình null** — quần thể thực hiếm khi thỏa đủ, nhưng dùng làm mốc so sánh và ước lượng dịch tễ.

---

## 4. Ứng dụng: từ q² ước lượng tần số người mang gen lặn (carrier)

### 💡 Trực giác / Hình dung

Trong y học, ta thường **đếm được người mắc bệnh** (kiểu hình lặn, kiểu gen aa) nhưng **không xác định được ai là carrier** (Aa) vì họ không có triệu chứng. HW cho phép **suy ngược**: biết q² (= tần số mắc bệnh) → khai căn ra q → tính 2pq (= carrier). Đây là ứng dụng kinh điển nhất của HW.

### 4.1. Công thức "suy ngược"

Bắt đầu từ tần số kiểu hình lặn $f(aa) = q^2$ quan sát được. Các bước:

$$\\begin{aligned}
q &= \\sqrt{q^2} \\\\
p &= 1 - q \\\\
2pq &= 2 \\times p \\times q && \\text{(tần số carrier dị hợp)} \\\\
p^2 &= (1 - q)^2 && \\text{(tần số đồng hợp trội, không bệnh, không carrier)}
\\end{aligned}$$

### 4.2. Bốn ví dụ số y học

**Ví dụ 1 — Phenylketonuria (PKU)**, bệnh lặn về chuyển hóa phenylalanine. Tần số mắc ~1/10,000.

- q² = 1/10,000 = 0.0001 → **q = 0.01**.
- p = 1 − 0.01 = **0.99**.
- 2pq = 2 × 0.99 × 0.01 = **0.0198** → ~1.98% dân số (1/51) là **carrier**.
- p² = 0.9801 → 98.01% không mang gen lặn.
- **Diễn giải**: cứ 10,000 người chỉ 1 người bệnh, nhưng **gần 200 người là carrier** — ẩn trong cộng đồng. Tư vấn di truyền tiền hôn nhân tập trung vào nhóm này.

**Ví dụ 2 — Bệnh giả định q² = 0.04** (4% mắc):

- q = √0.04 = **0.2**.
- p = 0.8.
- 2pq = 2 × 0.8 × 0.2 = **0.32** → 32% dân số là carrier.
- p² = 0.64.
- **Lưu ý**: bệnh càng phổ biến thì tỉ lệ carrier càng cao tương đối (32% ở đây), trong khi PKU (rất hiếm) chỉ có ~2% carrier.

**Ví dụ 3 — Bệnh giả định q² = 0.0025** (1/400):

- q = √0.0025 = **0.05**.
- p = 0.95.
- 2pq = 2 × 0.95 × 0.05 = **0.095** → 9.5% dân số là carrier.
- Tỉ lệ carrier/người-bệnh = 0.095/0.0025 = **38 lần**.

**Ví dụ 4 — Hồng cầu hình liềm (vùng dịch tễ Tây Phi)**, q² ~ 0.01:

- q = 0.1, p = 0.9.
- 2pq = 0.18 → **18% dân số là carrier**.
- p² = 0.81.
- **Diễn giải**: tần số carrier cao bất thường — vì ở vùng sốt rét, kiểu gen **Aa có lợi** (chống sốt rét tốt hơn cả AA và aa). Đây là ví dụ **chọn lọc cân bằng (balancing selection)** giữ q ở mức cao, sẽ học sâu ở Lesson 07.

### 4.3. Quan hệ chìa khóa: carrier/người-bệnh

Khi q nhỏ (bệnh hiếm), tỉ lệ carrier/người-bệnh = 2pq / q² = **2p/q ≈ 2/q** (vì p ≈ 1).

| q² (tần số bệnh) | q | Carrier 2pq | Tỉ lệ carrier/bệnh ≈ 2/q |
|------------------|---|-------------|--------------------------|
| 1/100 (0.01) | 0.1 | 0.18 | ~18 |
| 1/10,000 (10⁻⁴) | 0.01 | 0.0198 | ~198 |
| 1/1,000,000 (10⁻⁶) | 0.001 | ~0.002 | ~2000 |

**Quy luật**: bệnh càng hiếm thì **càng nhiều người mang gen lặn ẩn so với người bệnh** — đây là lý do tư vấn di truyền quan trọng kể cả với bệnh "hiếm".

### ⚠ Lỗi thường gặp

- **Lấy q = q² (quên căn bậc 2)**: thấy 1% bệnh → kết luận q = 0.01 → tính carrier = 2 × 0.99 × 0.01 = 0.0198 ≈ 2%. **Đúng phải là** q² = 0.01 → q = 0.1 → carrier 18%. Sai số 9 lần. Đây là sai lầm số 1 của HW.
- **Áp HW khi bệnh có chọn lọc mạnh**: nếu bệnh lặn gây chết trước tuổi sinh sản (vd Tay-Sachs), q² quan sát phản ánh tần số khi sinh, không phải tần số ổn định. Vẫn dùng được nhưng cần thận trọng.
- **Tưởng carrier cũng có triệu chứng**: theo định nghĩa, carrier (Aa) **không biểu hiện kiểu hình lặn** vì có 1 allele A trội che. Họ chỉ "ẩn mang" gen lặn để truyền cho con.

### 🔁 Dừng lại tự kiểm tra

1. Một bệnh lặn có tần số mắc 1/2500. Ước lượng tần số carrier 2pq.
2. Nếu q² = 0.16, tính p², 2pq.

<details>
<summary>Đáp án</summary>

1. q² = 1/2500 = 0.0004 → q = √0.0004 = 0.02. p = 0.98. 2pq = 2 × 0.98 × 0.02 = **0.0392** → ~3.92% (1/25.5) dân số là carrier.
2. q² = 0.16 → q = 0.4 → p = 0.6. p² = 0.36, 2pq = 2 × 0.6 × 0.4 = 0.48. Kiểm tra: 0.36 + 0.48 + 0.16 = 1 ✓.
</details>

### 📝 Tóm tắt mục 4

- Từ q² (tần số bệnh) → q = √q² → p = 1−q → 2pq (carrier).
- Bệnh càng hiếm thì carrier càng đông tương đối: tỉ lệ carrier/bệnh ≈ 2/q.
- Sai lầm phổ biến nhất: lấy q = q² thay vì q = √q² — luôn nhớ khai căn.

---

## 5. Kiểm tra một quần thể có cân bằng HW không

### 💡 Trực giác / Hình dung

HW là mô hình **dự đoán**. Để kiểm tra một quần thể thực có ở HW không, ta:

1. Đếm kiểu gen quan sát → tính p, q theo §2.
2. Tính p², 2pq, q² **dự đoán** từ p, q vừa có.
3. So sánh với số liệu **quan sát**. Nếu khớp gần → có thể đang ở HW; nếu lệch nhiều → có yếu tố tiến hóa.

### 5.1. Quy trình tính

**Bước 1 — đếm allele**: từ số AA, Aa, aa quan sát, tính p và q (xem §2).

**Bước 2 — dự đoán HW**: nếu HW thì kỳ vọng số cá thể mỗi kiểu gen là:

$$\\begin{aligned}
E(AA) &= p^2 \\times N \\\\
E(Aa) &= 2pq \\times N \\\\
E(aa) &= q^2 \\times N
\\end{aligned}$$

($N$ = tổng số cá thể).

**Bước 3 — so sánh**: nếu Observed ≈ Expected → khớp HW. Lệch nhiều → có thể là chọn lọc, giao phối có chọn lọc, di-nhập gen…

(Kiểm định thống kê chính thức: dùng **χ² (chi-square)** — không bắt buộc trong bài này, chỉ so sánh trực giác.)

### 5.2. Bốn ví dụ số

**Ví dụ 1 — Khớp HW**: N = 100; quan sát 36 AA, 48 Aa, 16 aa.

- p = (2×36 + 48)/200 = 120/200 = 0.6. q = 0.4.
- Dự đoán HW: p²N = 0.36 × 100 = 36, 2pq × N = 0.48 × 100 = 48, q²N = 0.16 × 100 = 16.
- **Khớp hoàn hảo** — quần thể này ở (hoặc rất gần) HW.

**Ví dụ 2 — Thiếu dị hợp**: N = 100; quan sát 50 AA, 20 Aa, 30 aa.

- p = (100 + 20)/200 = 0.6. q = 0.4.
- Dự đoán HW: 36 AA, 48 Aa, 16 aa.
- Quan sát có **20 Aa** trong khi kỳ vọng 48 → **thiếu dị hợp**.
- Nguyên nhân khả dĩ: cận huyết (inbreeding) hoặc giao phối đồng kiểu — không phải HW.

**Ví dụ 3 — Thừa dị hợp**: N = 200; quan sát 50 AA, 130 Aa, 20 aa.

- p = (100 + 130)/400 = 230/400 = 0.575. q = 0.425.
- Dự đoán HW: p² ≈ 0.331 → 66.2 AA; 2pq ≈ 0.489 → 97.8 Aa; q² ≈ 0.181 → 36.1 aa.
- Quan sát 130 Aa trong khi kỳ vọng ~98 → **thừa dị hợp** → có thể chọn lọc ưu tiên dị hợp (như sickle cell vùng sốt rét).

**Ví dụ 4 — Đã cố định một allele**: N = 500; quan sát 500 AA, 0 Aa, 0 aa.

- p = 1, q = 0. Dự đoán HW: 500 AA, 0 Aa, 0 aa. Khớp.
- Nhưng đây là trường hợp "tầm thường" — allele a đã biến mất. Quần thể vẫn ở HW (trivial) nhưng đã **cố định** allele A.

### ⚠ Lỗi thường gặp

- **Lấy p, q theo HW lý thuyết thay vì từ dữ liệu**: bước 1 phải tính p, q **từ chính dữ liệu quan sát**, không phải gán bừa. Sau đó mới so sánh.
- **Kết luận "không HW" chỉ vì lệch nhỏ**: lệch chút có thể do mẫu nhỏ — cần kiểm định χ² mới chắc chắn. Trực giác chỉ là gợi ý ban đầu.

### 🔁 Dừng lại tự kiểm tra

Một quần thể 1000 cá thể: 250 AA, 500 Aa, 250 aa. Tính p, q, dự đoán HW, và quan sát có khớp không?

<details>
<summary>Đáp án</summary>

p = (500 + 500)/2000 = 0.5. q = 0.5. Dự đoán HW: p²×1000 = 250 AA, 2pq×1000 = 500 Aa, q²×1000 = 250 aa. **Khớp hoàn toàn** — quần thể này đang ở HW.
</details>

### 📝 Tóm tắt mục 5

- Kiểm tra HW: tính p, q từ dữ liệu → so sánh kiểu gen quan sát với p²·N, 2pq·N, q²·N.
- Thiếu dị hợp gợi ý cận huyết; thừa dị hợp gợi ý chọn lọc cân bằng.
- Lệch nhỏ chưa kết luận được — cần χ²; lệch lớn rõ ràng là có cơ chế tiến hóa.

---

## 6. Phá vỡ điều kiện: chọn lọc làm thay đổi tần số allele

### 💡 Trực giác / Hình dung

Tưởng tượng cùng rổ 200 viên đá: 60% đỏ, 40% xanh. Mỗi thế hệ ta **loại bỏ ngẫu nhiên 50% viên xanh** trước khi cho phối giống. Sau vài thế hệ, đỏ sẽ chiếm đa số; xanh dần biến mất. Đó chính là **chọn lọc** chống allele lặn.

### 6.1. Mô hình chọn lọc đơn giản chống aa

Giả sử aa có **hệ số chọn lọc s** (= phần fitness bị mất). s = 1 → aa **chết hoàn toàn** trước sinh sản (lethal). s = 0 → không chọn lọc (HW).

Sau 1 thế hệ chọn lọc chống aa hoàn toàn ($s = 1$), tần số allele a thế hệ kế tiếp:

$$q_{n+1} = \\dfrac{q_n}{1 + q_n}$$

(Công thức rút ra từ: cá thể aa biến mất → chỉ tính $p^2$ AA và $2pq$ Aa khi tạo thế hệ kế.)

### 6.2. Bốn ví dụ số

**Ví dụ 1 — Khởi đầu q = 0.5, s = 1 (aa lethal)**:

- Thế hệ 0: q = 0.5.
- Thế hệ 1: q = 0.5 / (1 + 0.5) = 0.5/1.5 = **0.333**.
- Thế hệ 2: q = 0.333 / 1.333 = **0.25**.
- Thế hệ 3: q = 0.25 / 1.25 = **0.20**.
- Thế hệ 5: q ≈ 0.143; thế hệ 10: q ≈ 0.083; thế hệ 100: q ≈ 0.0099.
- **Nhận xét**: q giảm rất **chậm dần** vì khi q nhỏ, hầu hết allele a "trốn" trong Aa carrier → không bị chọn lọc loại.

**Ví dụ 2 — Khởi đầu q = 0.1, s = 1**:

- Thế hệ 1: q = 0.1 / 1.1 ≈ **0.0909**.
- Thế hệ 10: q ≈ 0.05.
- Thế hệ 100: q ≈ 0.0099. (Quy luật xấp xỉ: với q nhỏ, q_n ≈ q_0 / (1 + n·q_0).)

**Ví dụ 3 — Khởi đầu q = 0.9, s = 1**:

- Thế hệ 1: q = 0.9 / 1.9 ≈ **0.474**.
- Thế hệ 2: q ≈ 0.321.
- Thế hệ 5: q ≈ 0.155.
- **Giảm nhanh ban đầu** (vì khi q lớn, nhiều aa bị loại) rồi **chậm lại**.

**Ví dụ 4 — Sau 1 thế hệ bị di-nhập gen**: quần thể gốc p = 0.6, q = 0.4 nhận 10% cá thể nhập cư có p = 1 (toàn AA).

- Tần số mới: p' = 0.9 × 0.6 + 0.1 × 1 = 0.54 + 0.10 = **0.64**.
- q' = 1 − 0.64 = **0.36**. p, q thay đổi ngay trong 1 thế hệ → phá HW. (Đây là minh họa điều kiện 4.)

### ❓ Câu hỏi tự nhiên của người đọc

**Q: Vì sao không loại bỏ được hoàn toàn allele lặn dù s = 1?**
A: Vì khi q nhỏ, hầu hết allele a trú ngụ trong **carrier Aa** — kiểu hình bình thường, không bị loại. Chọn lọc chỉ "thấy" được aa (qua kiểu hình lặn). Đây là lý do bệnh lặn hiếm vẫn tồn tại qua nhiều thế hệ trong dân số người.

**Q: Đột biến A → a có thể "bù lại" cho chọn lọc loại aa không?**
A: Có. Cân bằng **đột biến–chọn lọc (mutation–selection balance)** giữ q ở mức rất thấp nhưng không 0: $q_{eq} \\approx \\sqrt{\\mu/s}$, với μ = tốc độ đột biến (~10⁻⁶ tới 10⁻⁸/gen/thế hệ). Ví dụ μ = 10⁻⁶, s = 1: $q_{eq} \\approx 0{,}001$ — bệnh lặn lethal giữ tần số ~1/10⁶ trong dân số do đột biến mới phát sinh.

### ⚠ Lỗi thường gặp

- **Nghĩ "1 thế hệ chọn lọc xóa sạch allele lặn"**: hoàn toàn sai. Loại aa rất chậm khi q nhỏ. Ngay cả với s = 1 (lethal), cần ~100 thế hệ để giảm q từ 0.5 xuống ~0.01.
- **Quên rằng dị hợp Aa là "kho dự trữ" allele lặn**: hầu hết allele a nằm ở đây khi q nhỏ.

### 🔁 Dừng lại tự kiểm tra

Khởi đầu q = 0.4, s = 1 (aa chết trước sinh sản). Tính q sau 2 thế hệ.

<details>
<summary>Đáp án</summary>

Thế hệ 1: q = 0.4 / (1 + 0.4) = 0.4 / 1.4 ≈ **0.2857**.
Thế hệ 2: q = 0.2857 / (1 + 0.2857) = 0.2857 / 1.2857 ≈ **0.2222** (= 2/9 chính xác).
</details>

### 📝 Tóm tắt mục 6

- Phá 1 điều kiện HW → tần số allele thay đổi qua thế hệ → **quần thể tiến hóa**.
- Chọn lọc chống aa với $s = 1$: $q_{n+1} = \\dfrac{q_n}{1 + q_n}$. Giảm nhanh khi q lớn, rất chậm khi q nhỏ.
- Di-nhập gen có thể đổi p, q ngay trong 1 thế hệ.
- Đột biến + chọn lọc → cân bằng $q_{eq} \\approx \\sqrt{\\mu/s}$, giải thích vì sao bệnh lặn lethal vẫn tồn tại.

---

## 7. Bài tập + Lời giải chi tiết

### Bài tập

**Bài 1**: Một quần thể 200 cá thể: 98 AA, 84 Aa, 18 aa. Tính tần số allele A (p) và a (q). Quần thể có ở trạng thái HW không?

**Bài 2**: Bệnh xơ nang (cystic fibrosis, lặn) có tần số mắc ở người da trắng châu Âu ~1/2500. Ước lượng:
(a) tần số allele lặn q;
(b) tần số người mang gen lặn (carrier) 2pq;
(c) tỉ lệ carrier so với người mắc bệnh.

**Bài 3**: Một quần thể bướm: 64% mắt đỏ (kiểu hình lặn) và 36% mắt nâu (kiểu hình trội). Giả sử HW. Tính tần số 3 kiểu gen.

**Bài 4**: Hai quần thể chuột:
- Quần thể X: p = 0.7, q = 0.3.
- Quần thể Y: p = 0.4, q = 0.6.

Trộn 2 quần thể với tỉ lệ 1:1 (cùng kích thước). Tính p, q của quần thể hỗn hợp ngay sau trộn. Sau 1 thế hệ giao phối ngẫu nhiên, tần số 3 kiểu gen là bao nhiêu?

**Bài 5**: Một quần thể có q ban đầu = 0.5. Chọn lọc loại bỏ hoàn toàn aa (s = 1) qua các thế hệ. Tính q ở các thế hệ 1, 2, 3, 4, 5.

**Bài 6** (nâng cao): Bệnh giả định có tần số carrier 2pq = 0.18. Tính q² (tần số người bệnh). Có 2 giá trị q có thể thỏa mãn 2pq = 0.18 không? Giải thích.

### Lời giải

**Bài 1**:
- Tổng allele = 400. Số A = 2×98 + 84 = 196 + 84 = 280. Số a = 2×18 + 84 = 36 + 84 = 120.
- **p = 280/400 = 0.7**; **q = 120/400 = 0.3**.
- Dự đoán HW: p² × 200 = 0.49 × 200 = **98 AA**; 2pq × 200 = 0.42 × 200 = **84 Aa**; q² × 200 = 0.09 × 200 = **18 aa**.
- Quan sát: 98, 84, 18 — **khớp hoàn hảo** dự đoán HW → quần thể này đang ở trạng thái cân bằng HW.

**Bài 2**:
- (a) q² = 1/2500 = 0.0004 → **q = √0.0004 = 0.02**.
- (b) p = 0.98. **2pq = 2 × 0.98 × 0.02 = 0.0392** → **~3.92% dân số là carrier** (~1/25.5).
- (c) Tỉ lệ carrier / người bệnh = 0.0392 / 0.0004 = **98 lần**. (Áp dụng quy luật xấp xỉ 2/q = 2/0.02 = 100, gần với 98 — chính xác hơn khi tính bằng 2(1−q)/q.)

**Bài 3**:
- Kiểu hình lặn (mắt đỏ) = q² = 0.64 → **q = 0.8**, p = 0.2.
- Tần số kiểu gen:
  - p² = 0.04 → 4% AA (mắt nâu đồng hợp).
  - 2pq = 2 × 0.2 × 0.8 = 0.32 → 32% Aa (mắt nâu dị hợp).
  - q² = 0.64 → 64% aa (mắt đỏ).
- Kiểm tra tổng = 0.04 + 0.32 + 0.64 = 1 ✓.
- Lưu ý: trong 36% mắt nâu, chỉ 4% là AA "thuần", còn 32% là carrier mang gen đỏ.

**Bài 4**:
- Sau khi trộn (kích thước bằng nhau): tần số allele hỗn hợp = trung bình:
  - **p_hỗn = (0.7 + 0.4)/2 = 0.55**; q_hỗn = 0.45.
- Ngay sau trộn, quần thể **chưa ở HW** (vì tần số kiểu gen là trộn của 2 quần thể, không phải p², 2pq, q²).
- Sau 1 thế hệ giao phối ngẫu nhiên (giả sử các điều kiện khác của HW thỏa), kiểu gen đạt HW:
  - p² = 0.3025 → 30.25% AA.
  - 2pq = 2 × 0.55 × 0.45 = 0.495 → 49.5% Aa.
  - q² = 0.2025 → 20.25% aa.
- Đây minh họa kết quả mạnh: **chỉ 1 thế hệ giao phối ngẫu nhiên là đủ để đưa quần thể về HW** (giả định 5 điều kiện thỏa).

**Bài 5**: Áp dụng $q_{n+1} = \\dfrac{q_n}{1 + q_n}$.
- Thế hệ 0: q = 0.5.
- Thế hệ 1: q = 0.5 / 1.5 = **0.3333**.
- Thế hệ 2: q = 0.3333 / 1.3333 = **0.25**.
- Thế hệ 3: q = 0.25 / 1.25 = **0.20**.
- Thế hệ 4: q = 0.20 / 1.20 ≈ **0.1667**.
- Thế hệ 5: q = 0.1667 / 1.1667 ≈ **0.1429** (= 1/7).
- Quy luật chính xác: $q_n = \\dfrac{1}{n + 2}$ khi $q_0 = 0{,}5$. Kiểm tra: n=3 → 1/5 = 0.20 ✓; n=5 → 1/7 ≈ 0.1429 ✓.

**Bài 6**:
- Giải phương trình $2pq = 2q(1 - q) = 0{,}18$ → $q(1 - q) = 0{,}09$ → $q - q^2 = 0{,}09$ → $q^2 - q + 0{,}09 = 0$.
- Áp dụng công thức nghiệm bậc 2: $q = \\dfrac{1 \\pm \\sqrt{1 - 0{,}36}}{2} = \\dfrac{1 \\pm \\sqrt{0{,}64}}{2} = \\dfrac{1 \\pm 0{,}8}{2}$.
- → $q_1 = 0{,}9$ hoặc $q_2 = 0{,}1$.
- **Có 2 giá trị q hợp lệ**, vì 2pq là hàm đối xứng quanh q = 0.5 (đỉnh tại 2pq = 0.5 khi q = 0.5).
- q = 0.1 → q² = **0.01** (bệnh hiếm, 1% mắc).
- q = 0.9 → q² = **0.81** (bệnh "ngược" — đa số dân mắc, allele a trội về số lượng).
- Trong thực tế y học, ta chọn **q = 0.1** vì bệnh di truyền lặn thường có tần số thấp; nhưng về toán học, cả 2 đều thỏa định luật HW.

---

## 8. Liên kết và bài tiếp theo

- **Bài tiếp theo trong Tầng 2**: [Lesson 07 — Chọn lọc tự nhiên](../lesson-07-natural-selection/) — sẽ đào sâu cơ chế chọn lọc (giải thích các hệ số s, kiểu chọn lọc định hướng/cân bằng/đa dạng hóa, fitness).
- **Liên kết ngược**:
  - [Lesson 01 — Di truyền Mendel](../lesson-01-mendelian-genetics/) — allele, kiểu gen, kiểu hình, phép lai Aa × Aa cho tỉ lệ 1:2:1 chính là HW ở quy mô 1 phép lai.
  - [Lesson 05 — Đột biến & công nghệ gen](../lesson-05-mutation-biotech/) — đột biến là nguồn allele mới, làm thay đổi q theo tốc độ μ → giải thích cân bằng đột biến–chọn lọc.
- **Sẽ học sâu**: [Lesson 08 — Hình thành loài & phát sinh chủng loại](../lesson-08-speciation-phylogeny/) — khi 2 quần thể của cùng loài tách rời (không di-nhập gen), tần số allele trôi theo các hướng khác nhau → có thể hình thành 2 loài mới.
- **Đọc thêm**: [visualization.html](./visualization.html) — 4 công cụ tương tác (HW calculator, reverse calculator, kiểm tra HW từ kiểu gen, mô phỏng chọn lọc qua thế hệ).

---

## 📝 Tổng kết Lesson 06

1. **Quần thể** = nhóm cùng loài, cùng khu vực, giao phối được với nhau; **vốn gen** = tất cả allele trong quần thể.
2. **Tần số allele** p, q với $p + q = 1$ (gen 2 allele); cách tính: $p = D + \\frac{H}{2}$.
3. **Định luật HW**: $p^2 + 2pq + q^2 = 1$ — khai triển $(p + q)^2$; đạt được sau 1 thế hệ giao phối ngẫu nhiên.
4. **5 điều kiện HW**: N → ∞, giao phối ngẫu nhiên, không đột biến, không di-nhập gen, không chọn lọc. Hầu hết quần thể thực không thỏa đủ → HW là **mô hình null**.
5. **Suy ngược từ q²**: $q = \\sqrt{q^2}$ → p → 2pq. Bệnh càng hiếm thì carrier càng đông tương đối (tỉ lệ $\\approx 2/q$).
6. **Kiểm tra HW**: so sánh số kiểu gen quan sát với $p^2 N$, $2pq \\cdot N$, $q^2 N$. Lệch → có cơ chế tiến hóa.
7. **Phá HW = tiến hóa**: chọn lọc chống aa ($s=1$) cho $q_{n+1} = \\dfrac{q_n}{1+q_n}$ — giảm chậm dần vì allele a "trốn" trong carrier.

**Tiếp theo**: [Lesson 07 — Chọn lọc tự nhiên](../lesson-07-natural-selection/) — vào sâu cơ chế đã làm vỡ HW ở mục 6.
`;
