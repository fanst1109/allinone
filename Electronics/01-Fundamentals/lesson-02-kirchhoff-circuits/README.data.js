// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: Electronics/01-Fundamentals/lesson-02-kirchhoff-circuits/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 02 — Mạch & Định luật Kirchhoff

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Phân biệt các thành phần cơ bản của mạch điện: nguồn, dây dẫn, tải, nút (node), nhánh (branch), vòng (loop).
- Tính điện trở tương đương cho mạch nối tiếp và song song.
- Áp dụng **định luật dòng Kirchhoff (KCL)** — bảo toàn điện tích tại một nút.
- Áp dụng **định luật áp Kirchhoff (KVL)** — bảo toàn năng lượng quanh một vòng kín.
- Giải được mạch hỗn hợp (nối tiếp + song song) từng bước bằng số thật.

## Kiến thức tiền đề

- [Lesson 01 — Điện áp, Dòng điện & Điện trở](../lesson-01-voltage-current-resistance/) — định luật Ohm ($V = I \\cdot R$), đơn vị V, A, Ω.

---

## 1. Mạch điện là gì?

### 1.1. Định nghĩa và các thành phần

💡 **Trực giác**: Hãy hình dung mạch điện như hệ thống ống nước. **Nguồn điện** (pin, ắc quy) giống bơm nước — tạo ra áp lực (điện áp) đẩy dòng chảy. **Dây dẫn** là ống dẫn nước. **Tải** (điện trở, bóng đèn, motor) là chỗ "tiêu thụ" năng lượng — như vòi nước hay turbine.

Một mạch điện gồm:

| Thành phần | Ký hiệu | Vai trò |
|------------|---------|---------|
| **Nguồn điện** (source) | pin / ắc quy / nguồn DC | Cung cấp năng lượng, duy trì điện áp $V$ |
| **Dây dẫn** (wire) | đường thẳng | Kết nối các phần tử — lý tưởng là $R = 0$ |
| **Tải** (load) | điện trở, bóng đèn... | Tiêu thụ năng lượng theo định luật Ohm |
| **Nút** (node) | điểm giao | Chỗ 2 hay nhiều nhánh gặp nhau |
| **Nhánh** (branch) | đoạn nối giữa 2 nút | Chứa 1 phần tử (R, nguồn, ...) |
| **Vòng** (loop) | đường khép kín | Đường đi qua các nút rồi quay lại điểm xuất phát |

### 1.2. Mạch kín và mạch hở

- **Mạch kín** (closed circuit): có đường dẫn liên tục từ cực dương qua tải về cực âm — dòng điện chạy được.
- **Mạch hở** (open circuit): đường dẫn bị đứt đoạn (công tắc ngắt, dây đứt) — dòng điện bằng 0, điện áp toàn bộ nguồn "rơi" vào chỗ hở.
- **Ngắn mạch** (short circuit): dây dẫn nối thẳng hai cực nguồn không qua tải — $R \\approx 0$, dòng cực lớn, nguy hiểm cháy nổ.

❓ **Câu hỏi tự nhiên của người đọc**:

*"Mạch hở thì điện áp ở đâu?"* — Điện áp nguồn vẫn tồn tại. Toàn bộ $V_{\\text{nguồn}}$ "nằm" trên khoảng hở (như áp lực bơm khi van đóng — áp vẫn có, chỉ không có dòng chảy).

*"Dây dẫn lý tưởng $R = 0$ có thật không?"* — Không hoàn toàn. Thực tế dây đồng có điện trở rất nhỏ (~17 µΩ·mm²/m). Trong mạch điện tử thông thường, điện trở dây nhỏ hơn nhiều so với tải → bỏ qua an toàn.

📝 **Tóm tắt mục 1**:
- Mạch điện = nguồn + dây dẫn + tải, tổ chức qua các nút, nhánh, vòng.
- Mạch kín: dòng chạy được. Mạch hở: $I = 0$, toàn bộ $V$ rơi vào chỗ hở. Ngắn mạch: $R \\approx 0$, $I$ cực lớn → nguy hiểm.

---

## 2. Điện trở nối tiếp (Series)

### 2.1. Định nghĩa và công thức

💡 **Trực giác**: Nối tiếp giống ống nước nối đầu đuôi nhau — nước (dòng điện) phải đi qua từng đoạn ống lần lượt, cùng một lưu lượng (dòng), nhưng mỗi đoạn "hao" một lượng áp suất (điện áp) khác nhau.

Khi các điện trở nối tiếp, **cùng một dòng $I$ chạy qua tất cả**, và:

$$R_{\\text{tđ}} = R_1 + R_2 + R_3 + \\dots + R_n$$

Điện áp chia theo từng điện trở (tỉ lệ thuận với $R$):

$$V_1 = I \\cdot R_1, \\qquad V_2 = I \\cdot R_2, \\qquad \\dots \\qquad V_n = I \\cdot R_n$$

$$V_{\\text{tổng}} = V_1 + V_2 + \\dots + V_n$$

### 2.2. Bốn ví dụ số

**Ví dụ 1 — 2 điện trở**: $R_1 = 100$ Ω, $R_2 = 200$ Ω, $V = 12$ V.
- $R_{\\text{tđ}} = 100 + 200 =$ **300 Ω**.
- $I = V / R_{\\text{tđ}} = 12 / 300 =$ **0.04 A = 40 mA**.
- $V_1 = 0.04 \\times 100 =$ **4 V**; $V_2 = 0.04 \\times 200 =$ **8 V**. Kiểm tra: $4 + 8 = 12$ V ✓.

**Ví dụ 2 — 3 điện trở bằng nhau**: $R_1 = R_2 = R_3 = 150$ Ω, $V = 9$ V.
- $R_{\\text{tđ}} = 150 + 150 + 150 =$ **450 Ω**.
- $I = 9 / 450 =$ **20 mA**.
- Mỗi điện trở chịu $V = 0.02 \\times 150 =$ **3 V** (áp chia đều vì $R$ bằng nhau). $3 \\times 3 = 9$ V ✓.

**Ví dụ 3 — Điện trở khác nhau**: $R_1 = 47$ Ω, $R_2 = 100$ Ω, $R_3 = 220$ Ω, $V = 5$ V.
- $R_{\\text{tđ}} = 47 + 100 + 220 =$ **367 Ω**.
- $I = 5 / 367 \\approx$ **13.6 mA**.
- $V_1 \\approx 0.0136 \\times 47 \\approx$ **0.64 V**; $V_2 \\approx$ **1.36 V**; $V_3 \\approx$ **2.99 V**. Tổng $\\approx 5$ V ✓.

**Ví dụ 4 — Bóng đèn và điện trở bảo vệ**: LED cần 2 V / 20 mA, nguồn 5 V → cần điện trở hạn dòng $R$ nối tiếp.
- Điện áp trên $R = 5 - 2 = 3$ V.
- $R = V_R / I = 3 / 0.02 =$ **150 Ω** (chọn 150 Ω hoặc 180 Ω gần nhất theo chuẩn E24).

⚠ **Lỗi thường gặp**: Tính tổng $R$ nối tiếp rồi quên nhân với $I$ đúng. Nhớ: $I = V_{\\text{nguồn}} / R_{\\text{tđ}}$ (không phải $V$ của từng $R$ chia từng $R$).

🔁 **Dừng lại tự kiểm tra**:
Ba điện trở $R_1 = 10$ Ω, $R_2 = 20$ Ω, $R_3 = 30$ Ω nối tiếp với nguồn 12 V. Tính $I$ và $V$ trên mỗi $R$.

<details>
<summary>Đáp án</summary>

$R_{\\text{tđ}} = 10 + 20 + 30 = 60$ Ω. $I = 12/60 = 0.2$ A = 200 mA.
$V_1 = 0.2 \\times 10 = 2$ V; $V_2 = 0.2 \\times 20 = 4$ V; $V_3 = 0.2 \\times 30 = 6$ V. Kiểm tra: $2+4+6 = 12$ V ✓.

</details>

📝 **Tóm tắt mục 2**:
- Nối tiếp: $R_{\\text{tđ}} = R_1 + R_2 + \\dots$ Luôn lớn hơn $R$ thành phần lớn nhất.
- Cùng dòng $I = V / R_{\\text{tđ}}$ chạy qua tất cả.
- Áp chia tỉ lệ thuận $R$: $R$ lớn hơn → áp lớn hơn.

---

## 3. Điện trở song song (Parallel)

### 3.1. Định nghĩa và công thức

💡 **Trực giác**: Song song giống nhiều ống nước chạy cùng một lúc từ bể chứa về — cùng áp lực (điện áp) hai đầu, nhưng mỗi ống chảy riêng một lưu lượng (dòng). Thêm ống → tổng sức cản giảm → tổng dòng tăng.

Khi các điện trở song song, **cùng một điện áp $V$ đặt lên tất cả**, và:

$$\\frac{1}{R_{\\text{tđ}}} = \\frac{1}{R_1} + \\frac{1}{R_2} + \\frac{1}{R_3} + \\dots + \\frac{1}{R_n}$$

Dòng chia tỉ lệ nghịch với $R$ ($R$ nhỏ hơn → dòng lớn hơn):

$$I_1 = \\frac{V}{R_1}, \\qquad I_2 = \\frac{V}{R_2}, \\qquad \\dots \\qquad I_n = \\frac{V}{R_n}$$

$$I_{\\text{tổng}} = I_1 + I_2 + \\dots + I_n$$

**Công thức cho 2 điện trở** (đặc biệt hữu ích):

$$R_{\\text{tđ}} = \\frac{R_1 \\cdot R_2}{R_1 + R_2}$$

### 3.2. Bốn ví dụ số

**Ví dụ 1 — 2 điện trở bằng nhau**: $R_1 = R_2 = 100$ Ω, $V = 12$ V.
- $R_{\\text{tđ}} = (100 \\times 100) / (100 + 100) = 10000 / 200 =$ **50 Ω** (đúng một nửa).
- $I_{\\text{tổng}} = 12 / 50 =$ **240 mA**.
- $I_1 = I_2 = 12 / 100 = 120$ mA. Kiểm tra: $120 + 120 = 240$ mA ✓.

**Ví dụ 2 — 2 điện trở khác nhau**: $R_1 = 60$ Ω, $R_2 = 40$ Ω, $V = 12$ V.
- $R_{\\text{tđ}} = (60 \\times 40) / (60 + 40) = 2400 / 100 =$ **24 Ω**.
- $I_{\\text{tổng}} = 12 / 24 =$ **500 mA**.
- $I_1 = 12/60 = 200$ mA; $I_2 = 12/40 = 300$ mA. Kiểm tra: $200 + 300 = 500$ mA ✓.
- Lưu ý: $R_2 = 40$ Ω nhỏ hơn → $I_2 = 300$ mA lớn hơn $I_1 = 200$ mA.

**Ví dụ 3 — 3 điện trở song song**: $R_1 = 12$ Ω, $R_2 = 6$ Ω, $R_3 = 4$ Ω, $V = 12$ V.
- $1/R_{\\text{tđ}} = 1/12 + 1/6 + 1/4 = 1/12 + 2/12 + 3/12 = 6/12 = 1/2$.
- $R_{\\text{tđ}} =$ **2 Ω** (rất nhỏ so với $R$ nhỏ nhất = 4 Ω).
- $I_{\\text{tổng}} = 12 / 2 =$ **6 A**.
- $I_1 = 12/12 = 1$ A; $I_2 = 12/6 = 2$ A; $I_3 = 12/4 = 3$ A. Kiểm tra: $1+2+3 = 6$ A ✓.

**Ví dụ 4 — Ứng dụng thực tế**: 3 bóng đèn 60 W / 220 V mắc song song trong nhà.
- Mỗi bóng: $R = V^2/P = 220^2/60 \\approx$ **807 Ω**.
- $R_{\\text{tđ}} = 807 / 3 \\approx$ **269 Ω**.
- Tắt 1 bóng: 2 bóng còn lại vẫn hoạt động bình thường (cùng $V = 220$ V). Đây là lý do đèn trong nhà mắc song song.

❓ **Câu hỏi tự nhiên của người đọc**:

*"$R_{\\text{tđ}}$ song song có thể lớn hơn $R$ nhỏ nhất không?"* — Không bao giờ. $R_{\\text{tđ}}$ song song **luôn nhỏ hơn điện trở nhỏ nhất** trong nhóm. Thêm bất kỳ nhánh nào — dù lớn đến đâu — cũng tạo thêm đường cho dòng chảy, nên $R_{\\text{tđ}}$ chỉ giảm.

*"Tại sao không ghi nhớ công thức tổng quát mà dùng công thức 2 điện trở?"* — Trong thực tế mạch điện tử, gặp song song 2 điện trở là phổ biến nhất. Với 3 trở trở lên, thường dùng $1/R_{\\text{tđ}} = \\sum (1/R_i)$ hoặc tính từng cặp.

⚠ **Lỗi thường gặp**: Quên đảo ngược sau khi cộng $1/R$. Bước: tính $1/R_{\\text{tđ}}$ trước → rồi mới lấy nghịch đảo để ra $R_{\\text{tđ}}$.

🔁 **Dừng lại tự kiểm tra**:
$R_1 = 30$ Ω và $R_2 = ?$ mắc song song để $R_{\\text{tđ}} = 20$ Ω. Tìm $R_2$.

<details>
<summary>Đáp án</summary>

Dùng công thức 2 trở: $R_{\\text{tđ}} = R_1 R_2/(R_1+R_2)$ → $20 = 30 \\cdot R_2/(30+R_2)$.
$20(30+R_2) = 30 \\cdot R_2$ → $600 + 20 R_2 = 30 R_2$ → $600 = 10 R_2$ → **R₂ = 60 Ω**.
Kiểm tra: $30 \\times 60/(30+60) = 1800/90 = 20$ Ω ✓.

</details>

📝 **Tóm tắt mục 3**:
- Song song: $1/R_{\\text{tđ}} = 1/R_1 + 1/R_2 + \\dots$ $R_{\\text{tđ}}$ luôn nhỏ hơn $R$ nhỏ nhất.
- Công thức 2 trở: $R_{\\text{tđ}} = R_1 R_2/(R_1+R_2)$.
- Cùng điện áp $V$ hai đầu; dòng chia tỉ lệ nghịch $R$.

---

## 4. Định luật dòng Kirchhoff (KCL — Kirchhoff's Current Law)

### 4.1. Phát biểu chính xác

**Tổng đại số các dòng điện tại một nút bằng 0. Tương đương: tổng dòng vào nút = tổng dòng ra khỏi nút.**

$$\\sum I_{\\text{vào}} = \\sum I_{\\text{ra}}$$

💡 **Trực giác**: KCL là bảo toàn điện tích. Dòng điện là điện tích chuyển động mỗi giây. Tại một nút, điện tích không thể "tích tụ" hay "biến mất" — bao nhiêu điện tích đến thì bấy nhiêu phải đi đi.

**Vì sao cần KCL?** Khi mạch có nhiều nhánh, không rõ dòng trong từng nhánh bằng bao nhiêu. KCL cho ta phương trình tại mỗi nút để tính các dòng ẩn.

### 4.2. Ví dụ số tại một nút

Tại nút A, có 4 nhánh:
- $I_1 = 3$ A đi vào.
- $I_2 = 5$ A đi vào.
- $I_3 = ?$ đi ra.
- $I_4 = 2$ A đi ra.

Áp dụng KCL: $I_1 + I_2 = I_3 + I_4$ → $3 + 5 = I_3 + 2$ → **I₃ = 6 A**.

**Xác minh chiều dòng**: KCL đúng bất kể chiều dòng thật. Nếu ta giả sử sai chiều ($I_3$ ra nhưng thật ra vào), kết quả sẽ ra số âm — và đó là dấu hiệu để đảo chiều.

### 4.3. Walk-through thêm — nút có 5 nhánh

Nút B: $I_1 = 1$ mA vào, $I_2 = 4$ mA vào, $I_3 = 2$ mA ra, $I_4 = ?$ ra, $I_5 = 0.5$ mA ra.

KCL: $1 + 4 = 2 + I_4 + 0.5$ → $5 = 2.5 + I_4$ → **I₄ = 2.5 mA** (đi ra).

❓ **Câu hỏi tự nhiên của người đọc**:

*"KCL áp dụng cho cả DC và AC không?"* — Có, KCL là định luật cơ bản, áp dụng cho cả dòng một chiều (DC) lẫn xoay chiều (AC). Với AC, dòng là dạng sóng nhưng tại bất kỳ thời điểm nào, tổng dòng vào vẫn bằng tổng dòng ra.

📝 **Tóm tắt mục 4**:
- KCL: $\\sum I_{\\text{vào}} = \\sum I_{\\text{ra}}$ tại mỗi nút.
- Cơ sở: bảo toàn điện tích.
- Nếu giả sử chiều sai → kết quả âm → đảo chiều lại.

---

## 5. Định luật áp Kirchhoff (KVL — Kirchhoff's Voltage Law)

### 5.1. Phát biểu chính xác

**Tổng đại số tất cả điện áp trên một vòng kín bằng 0.**

$$\\sum V = 0 \\qquad \\text{(đi vòng quanh một loop)}$$

Quy ước dấu: khi đi theo chiều quy ước (ví dụ chiều kim đồng hồ):
- Qua nguồn từ cực âm → cực dương: $+V$ (tăng điện áp).
- Qua điện trở theo chiều dòng chạy: $-I \\cdot R$ (giảm điện áp — "rơi áp").
- Qua điện trở ngược chiều dòng: $+I \\cdot R$.

💡 **Trực giác**: KVL là bảo toàn năng lượng. Đi một vòng kín thì trở về điểm xuất phát — năng lượng thu được phải bằng năng lượng tiêu thụ. Như leo núi rồi về chỗ cũ: tổng độ cao tăng và giảm = 0.

**Vì sao cần KVL?** Cho ta phương trình về điện áp trong vòng — phối hợp với KCL để giải được mọi mạch điện phức tạp.

### 5.2. Walk-through một vòng đơn

Mạch: nguồn $V_s = 10$ V nối tiếp $R_1 = 100$ Ω và $R_2 = 150$ Ω. Dòng $I$ chạy theo chiều kim đồng hồ.

Đi vòng theo chiều kim đồng hồ, bắt đầu từ cực âm nguồn:

$$\\begin{aligned}
+V_s - I \\cdot R_1 - I \\cdot R_2 &= 0 \\\\
+10 - I \\cdot 100 - I \\cdot 150 &= 0 \\\\
10 &= 250 \\cdot I \\\\
I = 10/250 &= 0.04 \\text{ A} = 40 \\text{ mA}
\\end{aligned}$$

Điện áp từng phần tử: $V_{R_1} = 0.04 \\times 100 = 4$ V; $V_{R_2} = 0.04 \\times 150 = 6$ V.

Kiểm tra KVL: $10 - 4 - 6 = 0$ ✓.

### 5.3. KVL với nhiều vòng — mạch có 2 nguồn

Mạch vòng duy nhất: $V_1 = 12$ V (nguồn thứ nhất), $V_2 = 4$ V (nguồn thứ hai, cùng chiều với nhau), $R = 40$ Ω.

Đi vòng: $+V_1 + V_2 - I \\cdot R = 0$ → $12 + 4 = 40I$ → $I = 16/40 =$ **0.4 A**.

Nếu 2 nguồn ngược chiều: $+V_1 - V_2 - I \\cdot R = 0$ → $12 - 4 = 40I$ → $I = 8/40 =$ **0.2 A**.

⚠ **Lỗi thường gặp**: Nhầm dấu khi qua nguồn. Nhớ: qua nguồn từ (+) → (−) khi đi vòng → $-V$ (điện áp giảm, như đi lên điện thế thấp đến cao là sai chiều). Cách nhớ: luôn đi theo chiều từ "(−) vào (+) ra" để cộng dương.

🔁 **Dừng lại tự kiểm tra**:
Vòng kín: nguồn 9 V, $R_1 = 30$ Ω, $R_2 = 60$ Ω. Tính $I$ và $V_{R_1}$, $V_{R_2}$.

<details>
<summary>Đáp án</summary>

KVL: $9 - I \\cdot 30 - I \\cdot 60 = 0$ → $9 = 90I$ → $I = 0.1$ A = 100 mA.
$V_{R_1} = 0.1 \\times 30 = 3$ V; $V_{R_2} = 0.1 \\times 60 = 6$ V. Kiểm tra: $3 + 6 = 9$ V ✓.

</details>

📝 **Tóm tắt mục 5**:
- KVL: $\\sum V = 0$ quanh một vòng kín.
- Cơ sở: bảo toàn năng lượng.
- Qua nguồn (−)→(+): cộng $V$. Qua điện trở theo chiều $I$: trừ $I \\cdot R$.

---

## 6. Walk-through giải mạch hỗn hợp

### 6.1. Bài toán

Cho mạch: nguồn $V_s = 24$ V, $R_1 = 40$ Ω nối tiếp với cụm song song gồm $R_2 = 60$ Ω và $R_3 = 120$ Ω.

Hỏi: dòng tổng $I_{\\text{tổng}}$, điện áp $V_{R_1}$, điện áp $V_{\\text{song song}}$, dòng qua $R_2$ và $R_3$.

### 6.2. Bước 1 — Tính R song song của R₂ và R₃

$$R_{23} = \\frac{R_2 \\cdot R_3}{R_2 + R_3} = \\frac{60 \\times 120}{60 + 120} = \\frac{7200}{180} = 40 \\text{ Ω}$$

### 6.3. Bước 2 — Tính R tương đương toàn mạch

$$R_{\\text{tđ}} = R_1 + R_{23} = 40 + 40 = 80 \\text{ Ω}$$

### 6.4. Bước 3 — Tính dòng tổng (dùng định luật Ohm)

$$I_{\\text{tổng}} = \\frac{V_s}{R_{\\text{tđ}}} = \\frac{24}{80} = 0.3 \\text{ A} = 300 \\text{ mA}$$

### 6.5. Bước 4 — Tính điện áp từng phần

$$V_{R_1} = I_{\\text{tổng}} \\times R_1 = 0.3 \\times 40 = 12 \\text{ V}$$

$$V_{\\text{song song}} = I_{\\text{tổng}} \\times R_{23} = 0.3 \\times 40 = 12 \\text{ V}$$

Kiểm tra KVL: $V_{R_1} + V_{\\text{song song}} = 12 + 12 = 24$ V $= V_s$ ✓.

### 6.6. Bước 5 — Tính dòng trong nhánh song song (KCL)

Cùng áp $V_{\\text{song song}} = 12$ V đặt lên $R_2$ và $R_3$:

$$I_2 = \\frac{V_{\\text{song song}}}{R_2} = \\frac{12}{60} = 0.2 \\text{ A} = 200 \\text{ mA}$$

$$I_3 = \\frac{V_{\\text{song song}}}{R_3} = \\frac{12}{120} = 0.1 \\text{ A} = 100 \\text{ mA}$$

Kiểm tra KCL tại nút phân nhánh: $I_2 + I_3 = 200 + 100 = 300$ mA $= I_{\\text{tổng}}$ ✓.

### 6.7. Bảng tổng kết

| Phần tử | R (Ω) | V (V) | I (mA) |
|---------|-------|-------|--------|
| $R_1$ (nối tiếp) | 40 | 12 | 300 |
| $R_2$ (song song) | 60 | 12 | 200 |
| $R_3$ (song song) | 120 | 12 | 100 |
| Toàn mạch | 80 | 24 | 300 |

📝 **Tóm tắt mục 6**:
- Giải mạch hỗn hợp: rút gọn dần (song song trước → nối tiếp sau) để tìm $R_{\\text{tđ}}$.
- Tính $I_{\\text{tổng}}$ từ $V_s / R_{\\text{tđ}}$, rồi "mở rộng" lại từng bước để tìm $V$ và $I$ từng nhánh.
- Dùng KCL và KVL để kiểm tra — nếu không khớp, có lỗi tính.

---

## 7. Bài tập + Lời giải chi tiết

### Bài tập

**Bài 1**: $R_1 = 220$ Ω và $R_2 = 330$ Ω nối tiếp với nguồn 12 V. Tính $R_{\\text{tđ}}$, dòng tổng, điện áp trên mỗi điện trở.

**Bài 2**: $R_1 = 100$ Ω và $R_2 = 150$ Ω mắc song song với nguồn 6 V. Tính $R_{\\text{tđ}}$, dòng qua mỗi nhánh, dòng tổng.

**Bài 3**: Tại một nút trong mạch: $I_1 = 8$ mA vào, $I_2 = 3$ mA vào, $I_3 = 5$ mA ra. Tìm $I_4$ (đi ra hay vào?) và giá trị của nó.

**Bài 4**: Vòng kín: $V_s = 15$ V, $R_1 = 100$ Ω, $R_2 = 200$ Ω, $R_3 = 200$ Ω mắc nối tiếp. Tính $I$ và điện áp từng điện trở. Kiểm tra KVL.

**Bài 5**: Mạch hỗn hợp: $V_s = 30$ V, $R_1 = 30$ Ω nối tiếp với cụm song song $R_2 = 60$ Ω và $R_3 = 60$ Ω. Tính $I_{\\text{tổng}}$, $V_{R_1}$, $V$ trên cụm song song, $I_2$, $I_3$.

**Bài 6**: Hai điện trở $R_1 = 1$ kΩ và $R_2$ mắc song song, $R_{\\text{tđ}} = 400$ Ω. Tìm $R_2$.

### Lời giải chi tiết

**Bài 1**:

Bước 1 — $R_{\\text{tđ}} = 220 + 330 =$ **550 Ω**.

Bước 2 — $I = V / R_{\\text{tđ}} = 12 / 550 \\approx$ **21.8 mA**.

Bước 3 — $V_{R_1} = 0.0218 \\times 220 \\approx$ **4.8 V**; $V_{R_2} = 0.0218 \\times 330 \\approx$ **7.2 V**.

Kiểm tra: $4.8 + 7.2 = 12$ V ✓.

---

**Bài 2**:

Bước 1 — $R_{\\text{tđ}} = (100 \\times 150) / (100 + 150) = 15000 / 250 =$ **60 Ω**.

Bước 2 — $I_1 = 6/100 =$ **60 mA**; $I_2 = 6/150 =$ **40 mA**.

Bước 3 — $I_{\\text{tổng}} = 60 + 40 =$ **100 mA**.

Kiểm tra: $I_{\\text{tổng}} = V / R_{\\text{tđ}} = 6 / 60 = 100$ mA ✓.

---

**Bài 3**:

KCL: $\\sum I_{\\text{vào}} = \\sum I_{\\text{ra}}$ → $8 + 3 = 5 + I_4$ → $11 = 5 + I_4$ → **I₄ = 6 mA đi ra**.

Kiểm tra: dòng vào $= 8 + 3 = 11$ mA; dòng ra $= 5 + 6 = 11$ mA ✓.

---

**Bài 4**:

Bước 1 — $R_{\\text{tđ}} = 100 + 200 + 200 =$ **500 Ω**.

Bước 2 — $I = 15 / 500 =$ **30 mA**.

Bước 3 — $V_{R_1} = 0.03 \\times 100 =$ **3 V**; $V_{R_2} = 0.03 \\times 200 =$ **6 V**; $V_{R_3} = 0.03 \\times 200 =$ **6 V**.

KVL: $15 - 3 - 6 - 6 = 0$ ✓.

---

**Bài 5**:

Bước 1 — Cụm song song $R_{23} = (60 \\times 60)/(60 + 60) = 3600/120 =$ **30 Ω**.

Bước 2 — $R_{\\text{tđ}} = R_1 + R_{23} = 30 + 30 =$ **60 Ω**.

Bước 3 — $I_{\\text{tổng}} = 30 / 60 =$ **0.5 A = 500 mA**.

Bước 4 — $V_{R_1} = 0.5 \\times 30 =$ **15 V**; $V_{\\text{song song}} = 0.5 \\times 30 =$ **15 V**.

Kiểm tra KVL: $15 + 15 = 30$ V ✓.

Bước 5 — $I_2 = I_3 = 15 / 60 =$ **250 mA** (vì $R_2 = R_3$, dòng chia đều).

Kiểm tra KCL: $250 + 250 = 500$ mA $= I_{\\text{tổng}}$ ✓.

---

**Bài 6**:

Dùng công thức 2 trở: $R_{\\text{tđ}} = R_1 R_2/(R_1+R_2)$ → $400 = 1000 \\cdot R_2/(1000+R_2)$.

$400(1000+R_2) = 1000 R_2$ → $400000 + 400 R_2 = 1000 R_2$ → $400000 = 600 R_2$ → **R₂ = 667 Ω** (≈ 680 Ω chuẩn E24).

Kiểm tra: $1000 \\times 667/(1000+667) = 667000/1667 \\approx 400$ Ω ✓.

---

## 8. Liên kết và bài tiếp theo

- **Bài tiền đề**: [Lesson 01 — Điện áp, Dòng điện & Điện trở](../lesson-01-voltage-current-resistance/) — định luật Ohm, đơn vị V/A/Ω.
- **Bài tiếp theo**: [Lesson 03 — Điện trở & Mạch phân áp](../lesson-03-resistors-divider/) — mạch phân áp (voltage divider), ứng dụng với cảm biến.

---

## 📝 Tổng kết Lesson 02

1. **Mạch điện = nguồn + tải + dây dẫn**, tổ chức qua nút (node), nhánh (branch), vòng (loop). Mạch kín → dòng chạy; mạch hở → $I = 0$.
2. **Nối tiếp**: $R_{\\text{tđ}} = R_1+R_2+\\dots$ (tổng); cùng $I$, áp chia theo $R$.
3. **Song song**: $1/R_{\\text{tđ}} = 1/R_1+1/R_2+\\dots$ (dùng $R_1 R_2/(R_1+R_2)$ cho 2 trở); cùng $V$, dòng chia ngược $R$.
4. **KCL** — bảo toàn điện tích tại nút: $\\sum I_{\\text{vào}} = \\sum I_{\\text{ra}}$.
5. **KVL** — bảo toàn năng lượng quanh vòng kín: $\\sum V = 0$.
6. **Giải mạch hỗn hợp**: rút gọn song song → nối tiếp → tìm $I_{\\text{tổng}}$ → mở rộng lại → dùng KCL+KVL kiểm tra.

**Tiếp theo**: [Lesson 03 — Điện trở & Mạch phân áp](../lesson-03-resistors-divider/)
`;
