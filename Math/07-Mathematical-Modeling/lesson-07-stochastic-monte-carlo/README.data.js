// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: Math/07-Mathematical-Modeling/lesson-07-stochastic-monte-carlo/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 07 — Mô hình ngẫu nhiên (Monte Carlo, Markov)

## Mục tiêu

- Khi hệ có **yếu tố ngẫu nhiên**, mô hình hóa bằng xác suất thay vì phương trình tất định.
- **Mô phỏng Monte Carlo**: ước lượng đại lượng khó tính bằng lấy mẫu ngẫu nhiên; tốc độ hội tụ $\\sim 1/\\sqrt{N}$.
- **Xích Markov (Markov chain)**: tương lai chỉ phụ thuộc hiện tại; ma trận chuyển; **phân phối dừng (stationary)**.
- Biết khi nào chọn mô hình ngẫu nhiên thay vì tất định.

## Kiến thức tiền đề

- [Lesson 01 — Chu trình mô hình hóa](../lesson-01-modeling-cycle/).
- [T6 L08 — Xác suất & thống kê](../../06-Advanced/lesson-08-probability-statistics/); [T6 L01 — ma trận](../../06-Advanced/lesson-01-vectors-matrices/).
- Liên kết: [Vectors/05-Probability](../../../Vectors/), [AI-ML](../../../AI-ML/).

---

## 1. Mô hình tất định vs ngẫu nhiên

💡 **Trực giác.** Các mô hình trước (ODE, LP) đều **tất định**: cùng đầu vào → cùng đầu ra chính xác. Nhưng nhiều hệ có *may rủi*: tung xúc xắc, khách đến quán theo giờ ngẫu nhiên, giá cổ phiếu dao động. Mô hình **ngẫu nhiên (stochastic)** mô tả *phân phối* các kết cục thay vì một con số duy nhất.

> 📐 **Định nghĩa đầy đủ — Mô hình ngẫu nhiên**
>
> **(a) Là gì**: Mô hình trong đó (một phần) đầu ra là **biến ngẫu nhiên** — chạy lại cho kết quả khác nhau, nhưng tuân theo một phân phối xác suất. Ta quan tâm các đại lượng tổng hợp: kỳ vọng, phương sai, xác suất vượt ngưỡng.
>
> **(b) Vì sao cần**: Khi nguồn bất định là *bản chất* (lượng tử, đông người, thị trường) chứ không phải do ta thiếu thông tin, mô hình tất định cho dự báo "giả chính xác". Mô hình ngẫu nhiên trả lời đúng câu hỏi thực: *"khả năng xảy ra bao nhiêu?"*, *"trung bình và độ dao động ra sao?"*.
>
> **(c) Ví dụ số**: Hàng đợi quán cà phê — số khách/giờ $\\sim$ Poisson($\\lambda=30$). Tất định nói "30 khách"; ngẫu nhiên nói "trung bình 30, nhưng có giờ 22, giờ 41; xác suất $> 40$ khách $\\approx 3\\%$" → giúp quyết định số nhân viên dự phòng. Tung 2 xúc xắc: tổng từ 2–12, mỗi giá trị một xác suất (7 hay nhất, $1/6$).

### 1.1. Bốn ví dụ mô hình ngẫu nhiên thực tế

Để thấy "ngẫu nhiên là bản chất" không phải chuyện trừu tượng, dưới đây là 4 hệ thực tế mà mô hình tất định cho dự báo "giả chính xác", buộc phải dùng mô hình ngẫu nhiên:

1. **Rủi ro tài chính (giá cổ phiếu / quyền chọn).** Giá ngày mai chịu vô số cú sốc tin tức không đoán trước. Mô hình chuẩn: **chuyển động Brown hình học (geometric Brownian motion)** $S_{t+1} = S_t \\cdot \\exp(\\mu \\Delta t + \\sigma \\sqrt{\\Delta t}\\, Z)$ với $Z \\sim N(0,1)$. Chạy Monte Carlo $10^4$ kịch bản → ước lượng **VaR (Value at Risk)**: "95% khả năng không lỗ quá $X$ đồng". Một con số tất định "giá = 102" che giấu hoàn toàn rủi ro.

2. **Hàng đợi (quán cà phê, tổng đài, server web).** Khách đến theo tiến trình Poisson (số khách/giờ ngẫu nhiên), thời gian phục vụ ngẫu nhiên. Câu hỏi thực: *"xác suất khách phải chờ $> 5$ phút là bao nhiêu? Cần mấy quầy để giữ dưới 5%?"* — chỉ trả lời được bằng mô hình ngẫu nhiên (lý thuyết hàng đợi $M/M/c$ hoặc mô phỏng).

3. **Lan truyền dịch bệnh.** Số người một ca lây cho người khác (số sinh sản $R_0$) dao động; ở giai đoạn đầu ít ca, **may rủi** quyết định bùng phát hay tắt. Mô hình tất định SIR cho một đường cong trơn; mô hình ngẫu nhiên (stochastic SIR) cho biết *xác suất dập tắt sớm* — điều mà ODE không nói được.

4. **Mô phỏng vật lý hạt / phóng xạ.** Một nguyên tử phóng xạ phân rã *khi nào* là biến cố ngẫu nhiên (phân phối mũ); một neutron tán xạ theo góc ngẫu nhiên. Lò phản ứng và lá chắn bức xạ được thiết kế bằng mô phỏng Monte Carlo theo dõi *hàng triệu* hạt — đây chính là bài toán Monte Carlo được phát minh cho (dự án Manhattan, 1940s).

💡 **Trực giác chung của cả 4 ví dụ.** Khi nguồn bất định là *bản chất* (đông cá thể tương tác, lượng tử, thị trường) chứ không do ta thiếu dữ liệu, "thêm đo đạc" không xóa được bất định. Câu trả lời đúng không phải *một số*, mà là *một phân phối* + các đại lượng rủi ro (xác suất vượt ngưỡng, phân vị).

❓ **Câu hỏi tự nhiên của người đọc**

- *"Tất định và ngẫu nhiên loại trừ nhau à?"* Không. Phần lớn mô hình thực có **cả hai**: phần xu hướng tất định ($\\mu \\Delta t$ — độ trôi) + phần nhiễu ngẫu nhiên ($\\sigma \\sqrt{\\Delta t}\\, Z$). Giá cổ phiếu ở trên là ví dụ: trôi lên trung bình + dao động ngẫu nhiên quanh đó.
- *"Sao không cứ chạy mô hình tất định nhiều lần với đầu vào hơi khác nhau?"* Đó *chính là* tinh thần mô phỏng ngẫu nhiên — nhưng phải sinh đầu vào theo *đúng phân phối* của nguồn bất định, rồi tổng hợp thành phân phối kết cục, chứ không chọn vài giá trị tùy tiện.

🔁 **Dừng lại tự kiểm tra**

1. Một xưởng dự báo "tháng sau bán đúng 1000 sản phẩm" rồi đặt nguyên liệu cho đúng 1000. Vì sao đây là tư duy tất định nguy hiểm? Mô hình ngẫu nhiên giúp gì?

<details><summary>Đáp án</summary>

Nhu cầu thực dao động (có tháng 850, có tháng 1180). Đặt đúng 1000: nếu nhu cầu 1180 → thiếu hàng, mất doanh thu; nếu 850 → tồn kho. Mô hình ngẫu nhiên mô tả nhu cầu bằng *phân phối* (vd trung bình 1000, độ lệch chuẩn 120) → tính được "đặt 1150 thì xác suất thiếu hàng chỉ ~10%", giúp chọn mức tồn kho an toàn theo rủi ro chấp nhận được.

</details>

📝 **Tóm tắt mục 1**: mô hình ngẫu nhiên mô tả *phân phối* kết cục; dùng khi bất định là bản chất hệ. Bốn lĩnh vực điển hình: tài chính (VaR), hàng đợi, dịch tễ, vật lý hạt. Nhiều mô hình ghép phần trôi tất định + nhiễu ngẫu nhiên.

---

## 2. Mô phỏng Monte Carlo

💡 **Trực giác — đếm bằng cách gieo ngẫu nhiên.** Khó tính một đại lượng bằng công thức? Hãy **lấy mẫu ngẫu nhiên thật nhiều** rồi đếm tỉ lệ. Như ước lượng diện tích hồ bằng cách ném đá ngẫu nhiên vào sân chứa hồ và đếm tỉ lệ đá rơi xuống nước.

> 📐 **Định nghĩa đầy đủ — Phương pháp Monte Carlo**
>
> **(a) Là gì**: Ước lượng một đại lượng (diện tích, tích phân, xác suất, kỳ vọng) bằng cách sinh nhiều mẫu ngẫu nhiên và lấy trung bình/tỉ lệ. Tên đặt theo sòng bạc Monte Carlo (yếu tố may rủi).
>
> **(b) Vì sao cần**: Nhiều bài *không có công thức đóng* hoặc *quá nhiều chiều* để tích phân giải tích (vd định giá quyền chọn tài chính 50 biến, mô phỏng va chạm hạt). Monte Carlo chỉ cần *sinh mẫu được* là ước lượng được, bất kể độ phức tạp — và sai số giảm đều $\\sim 1/\\sqrt{N}$ *bất kể số chiều* (ưu thế lớn so với lưới).
>
> **(c) Ví dụ số — ước lượng $\\pi$**: Gieo điểm ngẫu nhiên đều trong hình vuông $[0,1] \\times [0,1]$. Phần tư hình tròn bán kính 1 có diện tích $\\pi/4$. Tỉ lệ điểm rơi *trong* cung ($x^2+y^2 \\le 1$) $\\approx \\pi/4$ → **$\\pi \\approx 4 \\cdot ($số trong $/$ tổng$)$**. Với $N = 1000$, giả sử 785 điểm trong → $\\pi \\approx 4 \\cdot 0.785 = $ **3.14**. $N = 10^6$ → thường sát $3.141 \\pm 0.002$.

### 2.1. Walk-through ước lượng π bằng ném điểm — từng bước

Đây là "Hello World" của Monte Carlo. Ý tưởng: diện tích biết tỉ lệ, đếm điểm để ước lượng diện tích.

**Thiết lập hình học.** Hình vuông $[0,1]\\times[0,1]$ có diện tích $= 1$. Phần tư cung tròn bán kính 1, tâm gốc, là tập điểm thỏa $x^2 + y^2 \\le 1$ — diện tích $= \\tfrac{1}{4}\\pi r^2 = \\tfrac{\\pi}{4} \\approx 0.7854$. Vậy nếu gieo điểm **đều** khắp hình vuông:

$$\\frac{\\text{số điểm trong cung}}{\\text{tổng số điểm}} \\approx \\frac{\\text{diện tích cung}}{\\text{diện tích vuông}} = \\frac{\\pi/4}{1} = \\frac{\\pi}{4} \\quad\\Rightarrow\\quad \\pi \\approx 4 \\cdot \\frac{\\text{trong}}{\\text{tổng}}.$$

**Mô phỏng tay 10 điểm** (mỗi điểm là cặp $(x, y)$ với $x, y$ lấy ngẫu nhiên trong $[0,1]$). Tính $x^2 + y^2$, đánh dấu "trong" nếu $\\le 1$:

| # | $x$ | $y$ | $x^2+y^2$ | $\\le 1$? |
|---|-----|-----|-----------|----------|
| 1 | 0.21 | 0.34 | 0.160 | trong ✓ |
| 2 | 0.91 | 0.77 | 1.421 | ngoài ✗ |
| 3 | 0.45 | 0.12 | 0.217 | trong ✓ |
| 4 | 0.83 | 0.61 | 1.061 | ngoài ✗ |
| 5 | 0.07 | 0.95 | 0.907 | trong ✓ |
| 6 | 0.55 | 0.49 | 0.543 | trong ✓ |
| 7 | 0.99 | 0.40 | 1.140 | ngoài ✗ |
| 8 | 0.30 | 0.71 | 0.594 | trong ✓ |
| 9 | 0.68 | 0.66 | 0.898 | trong ✓ |
| 10 | 0.88 | 0.52 | 1.044 | ngoài ✗ |

Đếm: **7 trong / 10 tổng** → $\\pi \\approx 4 \\cdot \\tfrac{7}{10} = $ **2.8**. Sai nhiều — vì $N=10$ quá nhỏ (sai số $\\sim 1/\\sqrt{10} \\approx 0.32$). Nhưng cơ chế đã rõ; tăng $N$ thì hội tụ.

**Hình dung ASCII** (điểm \`o\` = trong cung, \`x\` = ngoài cung; đường cong là $x^2+y^2=1$):

\`\`\`
 y=1 +-----------------------+
     | x      x       x   x  |   x : ngoài cung (góc trên-phải)
     |    x      x   x       |
     |  o   \`--.    x    x   |
     | o  o     \`-.     x    |   cung tròn x²+y²=1
     |  o   o     \`-.   x    |   uốn từ (1,0) lên (0,1)
     | o  o   o      \`-.  x  |
     |o  o  o    o      \`-.  |   o : trong cung (góc dưới-trái)
 y=0 +-----------------------+
     x=0                   x=1
\`\`\`

Tỉ lệ vùng \`o\` (dưới đường cong) so với cả ô vuông $\\to \\pi/4$.

**Hội tụ khi tăng N** (giá trị minh họa một lần chạy điển hình; mỗi lần chạy số khác chút):

| $N$ | số trong (≈) | ước lượng $\\pi$ | sai lệch so với 3.14159 |
|-----|--------------|-----------------|--------------------------|
| 10 | 7 | 2.80 | 0.342 |
| 100 | 81 | 3.24 | 0.098 |
| 1 000 | 793 | 3.172 | 0.030 |
| 10 000 | 7 870 | 3.148 | 0.006 |
| 100 000 | 78 580 | 3.1432 | 0.0016 |
| 1 000 000 | 785 100 | 3.1404 | 0.0012 |

Quan sát: mỗi lần $N$ tăng $\\times 100$, sai lệch giảm khoảng $\\times 10$ — đúng quy luật $1/\\sqrt{N}$ ($\\sqrt{100}=10$).

**Tốc độ hội tụ**: sai số $\\sim$ **$1/\\sqrt{N}$**. Muốn giảm sai số 10 lần phải tăng $N$ **100 lần**. Chậm, nhưng *không phụ thuộc số chiều* — đó là lý do Monte Carlo vô địch ở bài nhiều chiều.

### 2.2. Sinh số ngẫu nhiên — viên gạch nền

💡 **Trực giác.** Monte Carlo cần "tung xúc xắc" rất nhiều lần. Máy tính không có ngẫu nhiên thật; nó dùng **bộ sinh số giả ngẫu nhiên (pseudo-random number generator, PRNG)** — một công thức tất định cho ra dãy số *trông như* ngẫu nhiên, đều trong $[0,1)$.

> 📐 **Định nghĩa — số giả ngẫu nhiên & seed**
>
> **(a) Là gì**: PRNG là hàm $u_{n+1} = g(u_n)$ sinh dãy $u_1, u_2, \\ldots \\in [0,1)$ phân phối đều, độc lập thống kê (qua các kiểm định). **Seed** là giá trị khởi đầu $u_0$.
>
> **(b) Vì sao cần**: Mọi phân phối khác đều xây từ "đều trên $[0,1)$". Vd để được biến cố xác suất $p$: lấy $u$, nếu $u < p$ thì "xảy ra". Để được điểm đều trong hình vuông: lấy 2 số $u_1, u_2$ làm $(x,y)$. **Seed** cho phép *tái lập* (reproducibility): cùng seed → cùng dãy → cùng kết quả, để debug và kiểm chứng.
>
> **(c) Ví dụ số (LCG đồ chơi)**: $u_{n+1} = (5 u_n + 3) \\bmod 16$, seed $u_0 = 7$. Dãy: $7 \\to (35+3)\\bmod 16 = 38\\bmod 16 = 6 \\to (30+3)\\bmod 16 = 33\\bmod 16 = 1 \\to (5+3)=8 \\to (40+3)=43\\bmod 16 = 11 \\to \\ldots$ Chia cho 16 → $0.4375, 0.375, 0.0625, 0.5, 0.6875, \\ldots$ — trông "lộn xộn" dù sinh bằng công thức tất định.

⚠ **Toy example — cảnh báo.** LCG modulo 16 ở trên **chỉ để minh họa**, tuyệt đối không dùng thật: chu kỳ chỉ 16 (số lặp lại sau 16 bước), tương quan mạnh, fail mọi kiểm định ngẫu nhiên. Production dùng **Mersenne Twister** hoặc **PCG/xoshiro** (chu kỳ $\\ge 2^{128}$). Trong Go: gói \`math/rand\` (cho mô phỏng) hoặc \`crypto/rand\` (cho bảo mật); luôn đặt seed rõ ràng khi cần tái lập.

❓ **Câu hỏi tự nhiên của người đọc**

- *"Chạy lại ra số khác, vậy có đáng tin?"* Mỗi lần chạy là một *ước lượng* có sai số ngẫu nhiên; trung bình của nhiều mẫu hội tụ về giá trị thật (luật số lớn). Báo kết quả phải kèm *khoảng tin cậy* (vd $3.14 \\pm 0.05$), không phải một số trần trụi.
- *"Vì sao sai số $\\sim 1/\\sqrt{N}$ mà không phải $1/N$?"* Vì sai số của trung bình mẫu $=$ độ lệch chuẩn $/ \\sqrt{N}$ (định lý giới hạn trung tâm — [T6 L08](../../06-Advanced/lesson-08-probability-statistics/)). Đây là quy luật phổ quát của lấy mẫu.

⚠ **Ba lỗi thường gặp khi dùng Monte Carlo**

**Lỗi 1 — tưởng thêm điểm là chính xác tuyến tính.** Gấp đôi $N$ *không* giảm nửa sai số (chỉ giảm hệ số $1/\\sqrt{2} \\approx 0.71$). Đừng kỳ vọng độ chính xác cao từ $N$ nhỏ; và luôn dùng bộ sinh số ngẫu nhiên tốt + báo sai số. Verify: từ $N=100$ sang $N=200$, sai số kỳ vọng $\\sim 1/\\sqrt{N}$ đi từ $0.10$ xuống $0.071$, không phải $0.05$.

**Lỗi 2 — $N$ nhỏ rồi tin một con số.** Với $N=10$ ước lượng $\\pi$ có thể ra $2.8$ hoặc $3.6$ tùy may rủi (sai số $\\sim 0.32$). Đọc một kết quả $N$ nhỏ như sự thật là sai lầm phổ biến nhất. Quy tắc: luôn báo *khoảng tin cậy*, và tăng $N$ tới khi sai số ước lượng đủ nhỏ cho mục đích.

**Lỗi 3 — mẫu không độc lập / seed cố định nhầm.** Nếu các mẫu bị tương quan (PRNG xấu, hoặc vô tình tái dùng cùng số), luật số lớn *không* áp dụng đúng → sai số không giảm như $1/\\sqrt{N}$ dù $N$ lớn. Ngược lại, cố định seed là *tốt* để tái lập, nhưng đừng báo cáo *một* lần chạy seed cố định như thể đó là kết quả tổng quát — hãy chạy nhiều seed để thấy dao động.

🔁 **Dừng lại tự kiểm tra**

1. Monte Carlo ước lượng $\\pi$: gieo 2000 điểm, 1561 rơi trong cung. Ước lượng $\\pi$?

<details><summary>Đáp án</summary>

$\\pi \\approx 4 \\cdot (1561/2000) = 4 \\cdot 0.7805 = $ **3.122**. (Gần 3.14; sai lệch do $N$ hữu hạn — tăng $N$ để sát hơn.)

</details>

### 2.3. Tích phân Monte Carlo — walk-through

💡 **Trực giác.** Tính $\\int_a^b f(x)\\,dx$ là tìm *diện tích dưới đường cong*. Một tích phân $= (b-a) \\times$ (giá trị trung bình của $f$ trên $[a,b]$). Mà giá trị trung bình thì... ước lượng được bằng cách **lấy mẫu $f$ tại các điểm ngẫu nhiên rồi lấy trung bình** — đúng tinh thần "thử nhiều lần rồi lấy trung bình".

> 📐 **Công thức ước lượng tích phân Monte Carlo**
>
> $$\\int_a^b f(x)\\,dx \\;\\approx\\; (b-a)\\cdot\\frac{1}{N}\\sum_{i=1}^{N} f(x_i),\\qquad x_i \\sim \\text{Uniform}[a,b].$$
>
> Lý do: $\\frac{1}{N}\\sum f(x_i) \\to E[f(X)] = \\frac{1}{b-a}\\int_a^b f(x)\\,dx$ (luật số lớn), nhân $(b-a)$ ra tích phân.

**Ví dụ — ước lượng $\\int_0^1 x^2\\,dx$** (đáp án đúng đã biết để đối chiếu: $\\left[\\tfrac{x^3}{3}\\right]_0^1 = \\tfrac{1}{3} \\approx 0.3333$).

Lấy 8 điểm $x_i$ ngẫu nhiên trong $[0,1]$, tính $f(x_i) = x_i^2$:

| $i$ | $x_i$ | $f(x_i)=x_i^2$ |
|-----|-------|----------------|
| 1 | 0.12 | 0.0144 |
| 2 | 0.88 | 0.7744 |
| 3 | 0.41 | 0.1681 |
| 4 | 0.67 | 0.4489 |
| 5 | 0.29 | 0.0841 |
| 6 | 0.95 | 0.9025 |
| 7 | 0.53 | 0.2809 |
| 8 | 0.34 | 0.1156 |

Tổng $= 0.0144+0.7744+0.1681+0.4489+0.0841+0.9025+0.2809+0.1156 = 2.7889$. Trung bình $= 2.7889/8 = 0.3486$. Nhân $(b-a)=1$ → ước lượng $\\int_0^1 x^2\\,dx \\approx$ **0.349**. So với 0.3333 → sai $\\approx 0.016$ với chỉ $N=8$ (sai số kỳ vọng $\\sim 1/\\sqrt{8}\\approx 0.35$ trên thang $f$, nhưng vì $f$ ít dao động nên thực tế nhỏ hơn).

**Sai số giảm theo $1/\\sqrt{N}$** (một lần chạy điển hình, đối chiếu đáp án 0.33333):

| $N$ | ước lượng $\\int_0^1 x^2$ | sai lệch $\\lvert\\text{ước lượng}-1/3\\rvert$ |
|-----|---------------------------|-----|
| 8 | 0.3486 | 0.0153 |
| 100 | 0.3411 | 0.0078 |
| 1 000 | 0.3357 | 0.0024 |
| 10 000 | 0.33408 | 0.00075 |
| 100 000 | 0.333566 | 0.00023 |

Mỗi lần $N \\times 100$, sai lệch $\\div 10$ — lại đúng $1/\\sqrt{N}$.

❓ **Câu hỏi tự nhiên.** *"Tích phân 1 biến đã có công thức / hình thang nhanh hơn, sao dùng Monte Carlo?"* Đúng — với 1–3 chiều, lưới (Simpson, hình thang) chính xác hơn. **Ưu thế Monte Carlo lộ ra khi nhiều chiều**: tích phân 20 chiều bằng lưới $10$ điểm/chiều cần $10^{20}$ điểm (bất khả thi), còn Monte Carlo vẫn chỉ cần $N$ mẫu với sai số $1/\\sqrt{N}$ *bất kể số chiều*. Đó là lý do định giá quyền chọn nhiều tài sản, vật lý hạt, đồ họa (path tracing) đều dùng Monte Carlo.

🔁 **Dừng lại tự kiểm tra**

1. Dùng 4 điểm $x = 0.2, 0.5, 0.7, 0.9$ ước lượng $\\int_0^1 x^2\\,dx$ (coi như mẫu). Kết quả?

<details><summary>Đáp án</summary>

$f$-values: $0.04, 0.25, 0.49, 0.81$. Tổng $=1.59$, trung bình $=0.3975$, $\\times(b-a)=1 \\to$ ước lượng $\\approx$ **0.398**. (So 0.333 — lệch khá vì $N=4$ nhỏ và 3/4 điểm nằm ở nửa phải nơi $x^2$ lớn.)

</details>

### 📝 Tóm tắt mục 2

- Monte Carlo: ước lượng bằng lấy mẫu ngẫu nhiên + trung bình/tỉ lệ (vd $\\pi \\approx 4 \\cdot$ tỉ lệ trong cung).
- Sinh số dựa trên PRNG (đều $[0,1)$) + seed để tái lập; toy LCG chỉ minh họa, thật dùng Mersenne Twister/PCG.
- Tích phân Monte Carlo: $\\int_a^b f \\approx (b-a)\\cdot\\overline{f(x_i)}$ với $x_i$ đều trên $[a,b]$.
- Sai số $\\sim 1/\\sqrt{N}$ (giảm 10 lần cần $\\times 100$ mẫu), nhưng *không phụ thuộc số chiều* → mạnh ở bài nhiều chiều.
- Báo kết quả kèm khoảng tin cậy; cẩn thận $N$ nhỏ, mẫu phải độc lập.

---

## 3. Bước đi ngẫu nhiên (random walk)

💡 **Trực giác — người say đi loạng choạng.** Một người say đứng ở cột đèn (vị trí 0), mỗi bước đi *trái* hoặc *phải* với xác suất bằng nhau, không nhớ bước trước. Sau nhiều bước anh ta ở đâu? Trung bình vẫn ở 0 (không thiên lệch), nhưng *độ tản* ra xa tăng dần — đây là **bước đi ngẫu nhiên (random walk)**, nền tảng của khuếch tán, giá cổ phiếu, và cả tính Markov ở mục sau.

> 📐 **Định nghĩa — random walk 1D đối xứng**
>
> **(a) Là gì**: Vị trí $S_n = X_1 + X_2 + \\cdots + X_n$ với mỗi bước $X_i = +1$ (xác suất $1/2$) hoặc $-1$ (xác suất $1/2$), độc lập. $S_0 = 0$.
>
> **(b) Vì sao quan trọng**: Là mô hình rời rạc đơn giản nhất của chuyển động ngẫu nhiên; giới hạn liên tục của nó là **chuyển động Brown** — nền của tài chính (giá cổ phiếu), vật lý (khuếch tán phân tử), sinh học (đường đi của vi khuẩn).
>
> **(c) Tính chất số học**: $E[S_n] = 0$ (đối xứng, không trôi). Phương sai $\\text{Var}(S_n) = n$ (vì $n$ bước độc lập, mỗi bước phương sai 1). Độ lệch chuẩn $= \\sqrt{n}$ → "khoảng cách điển hình tới gốc" tăng theo **$\\sqrt{n}$**, không phải $n$. (Lại gặp $\\sqrt{\\,}$ — cùng gốc với sai số $1/\\sqrt{N}$ của Monte Carlo: đều là độ tản của tổng biến độc lập.)

**Walk-through một quỹ đạo 10 bước.** Tung đồng xu: H = sang phải $(+1)$, T = sang trái $(-1)$. Dãy tung: \`H H T H T T H H H T\`.

| bước $n$ | tung | $X_n$ | vị trí $S_n$ |
|----------|------|-------|--------------|
| 1 | H | +1 | +1 |
| 2 | H | +1 | +2 |
| 3 | T | −1 | +1 |
| 4 | H | +1 | +2 |
| 5 | T | −1 | +1 |
| 6 | T | −1 | 0 |
| 7 | H | +1 | +1 |
| 8 | H | +1 | +2 |
| 9 | H | +1 | +3 |
| 10 | T | −1 | +2 |

Kết thúc ở $S_{10} = +2$. (Lý thuyết: $E[S_{10}]=0$, độ lệch chuẩn $=\\sqrt{10}\\approx 3.16$ — kết quả $+2$ hoàn toàn nằm trong khoảng điển hình.)

**Hình dung ASCII quỹ đạo** (trục dọc = vị trí, trục ngang = bước; \`*\` = vị trí tại mỗi bước):

\`\`\`
 pos
 +3 |                    *
 +2 |    *     *      *     *
 +1 | *     *     *  *
  0 *-----------*----------------  bước →
 -1 |
    0  1  2  3  4  5  6  7  8  9 10
\`\`\`

**Vì sao "tản ra theo $\\sqrt{n}$" chứ không $n$?** Vì các bước $+1/-1$ ngẫu nhiên *triệt tiêu một phần* nhau — không cộng dồn cùng chiều. Walk-through phương sai: mỗi $X_i$ có $E[X_i]=0$, $\\text{Var}(X_i)=E[X_i^2]-0 = 1$. Do độc lập, $\\text{Var}(S_n)=\\sum_{i=1}^n \\text{Var}(X_i) = n$ → độ lệch chuẩn $\\sqrt{n}$. Số: sau $n=100$ bước, vị trí điển hình $\\approx \\pm 10$ (không phải $\\pm 100$); sau $n=10000$ bước $\\approx \\pm 100$.

❓ **Câu hỏi tự nhiên của người đọc**

- *"Người say có chắc quay về gốc không?"* Trong 1D và 2D, random walk đối xứng **chắc chắn** quay về gốc vô số lần (recurrent). Nhưng trong 3D thì *không* — xác suất quay về chỉ ~34% (định lý Pólya: "người say tìm được đường về, chim say thì lạc luôn").
- *"Liên hệ giá cổ phiếu thế nào?"* Mô hình "random walk của giá" nói thay đổi giá mỗi ngày gần như độc lập, khó dự đoán hướng — nền của giả thuyết thị trường hiệu quả. Thêm độ trôi $\\mu$ thành random walk có xu hướng (giống GBM ở mục 1.1).

⚠ **Lỗi thường gặp.** Tưởng "đi 100 bước thì lạc xa ~100 đơn vị". Sai — vì các bước triệt tiêu nhau, độ tản chỉ $\\sim\\sqrt{100}=10$. Nhầm lẫn $n$ với $\\sqrt{n}$ ở đây là lỗi kinh điển.

🔁 **Dừng lại tự kiểm tra**

1. Random walk 1D, sau 400 bước, "khoảng cách điển hình" tới gốc cỡ bao nhiêu? Sau 1600 bước thì gấp mấy lần?

<details><summary>Đáp án</summary>

$\\sqrt{400}=20$ đơn vị. Sau 1600 bước: $\\sqrt{1600}=40$ → **gấp 2 lần** (dù số bước gấp 4) — vì độ tản theo $\\sqrt{n}$, gấp 4 số bước chỉ gấp 2 độ tản.

</details>

### 📝 Tóm tắt mục 3

- Random walk 1D: $S_n = \\sum X_i$, mỗi bước $\\pm 1$ đều nhau; $E[S_n]=0$, độ tản $\\sim\\sqrt{n}$.
- Giới hạn liên tục = chuyển động Brown; nền của khuếch tán, giá cổ phiếu, hàng đợi.
- Recurrent ở 1D/2D (chắc quay về gốc), không ở 3D; lỗi hay gặp: nhầm độ tản $n$ thay vì $\\sqrt{n}$.

---

## 4. Xích Markov

💡 **Trực giác — tương lai chỉ nhìn hiện tại.** Thời tiết mai phụ thuộc thời tiết *hôm nay*, không cần nhớ cả tháng trước. Trò chơi cờ tỉ phú: ô kế phụ thuộc ô hiện tại + xúc xắc. "Không trí nhớ" này gọi là **tính Markov**, cho phép mô tả hệ chỉ bằng *xác suất chuyển giữa các trạng thái*.

> 📐 **Định nghĩa đầy đủ — Xích Markov & ma trận chuyển**
>
> **(a) Là gì**: Một hệ có hữu hạn **trạng thái**; mỗi bước, hệ chuyển sang trạng thái khác theo **xác suất chuyển** chỉ phụ thuộc trạng thái *hiện tại* (không phụ thuộc quá khứ). Gom thành **ma trận chuyển $P$** với $P[i][j] = $ xác suất từ $i$ sang $j$ (mỗi hàng cộng $= 1$).
>
> **(b) Vì sao cần**: Mô hình hóa gọn các hệ chuyển trạng thái: thời tiết, hành vi khách hàng (trung thành/rời bỏ), xếp hạng trang web (PageRank), sinh văn bản. Tính Markov làm bài toán *giải được*: hành vi dài hạn quy về đại số ma trận.
>
> **(c) Ví dụ số — thời tiết**: 2 trạng thái Nắng (N), Mưa (M). Nếu hôm nay Nắng: mai Nắng 0.8, Mưa 0.2. Nếu hôm nay Mưa: mai Nắng 0.4, Mưa 0.6.
> > $P = \\begin{bmatrix} 0.8 & 0.2 \\\\ 0.4 & 0.6 \\end{bmatrix}$. Hôm nay Nắng (phân phối $[1, 0]$) → mai $[0.8, 0.2]$ → ngày kia $[0.8 \\cdot 0.8+0.2 \\cdot 0.4, \\ldots] = [0.72, 0.28]$ → ...

> 📐 **Phân phối dừng (stationary)**: vector $\\pi$ thỏa **$\\pi \\cdot P = \\pi$** (và $\\sum \\pi = 1$) — phân phối *không đổi* qua các bước, tỉ lệ thời gian dài hạn ở mỗi trạng thái.

**Walk-through tìm phân phối dừng** (thời tiết trên): $\\pi = (\\pi_N, \\pi_M)$, $\\pi \\cdot P = \\pi$:
- $\\pi_N = 0.8 \\cdot \\pi_N + 0.4 \\cdot \\pi_M$ (cột Nắng).
- Cùng $\\pi_N + \\pi_M = 1 \\to \\pi_M = 1 - \\pi_N$.
- $\\pi_N = 0.8\\pi_N + 0.4(1 - \\pi_N) = 0.8\\pi_N + 0.4 - 0.4\\pi_N = 0.4\\pi_N + 0.4 \\to 0.6\\pi_N = 0.4 \\to$ **$\\pi_N = 2/3 \\approx 0.667$**, $\\pi_M = $ **$1/3$**.

→ Dài hạn: ~67% ngày nắng, 33% mưa, *bất kể* hôm nay thế nào.

❓ **Câu hỏi tự nhiên của người đọc**

- *"Phân phối dừng có phụ thuộc trạng thái ban đầu không?"* Với xích "đẹp" (mọi trạng thái tới được nhau, không tuần hoàn cứng), **không** — mọi khởi đầu đều hội tụ về cùng $\\pi$. Đó là lý do $\\pi$ gọi là "dừng/cân bằng": hệ quên dần điều kiện đầu.
- *"Liên hệ với điểm cân bằng ở L03?"* Tương tự: $\\pi$ là "điểm cân bằng" của hệ phân phối; nhưng đây là cân bằng *thống kê* (tỉ lệ thời gian), không phải một giá trị tất định.
- *"Tính $\\pi$ bằng ma trận thế nào?"* $\\pi$ là **vector riêng trái** của $P$ ứng với trị riêng 1 ([T6 L03](../../06-Advanced/lesson-03-eigenvalues-eigenvectors/)) — nối với đại số tuyến tính.

⚠ **Lỗi thường gặp — lẫn hàng/cột của ma trận chuyển, hoặc hàng không cộng $= 1$.** Quy ước phổ biến: hàng $i = $ "từ trạng thái $i$", các cột là "tới", mỗi *hàng* cộng $= 1$. Sai quy ước → nhân ma trận sai chiều. Luôn kiểm mỗi hàng tổng $= 1$.

🔁 **Dừng lại tự kiểm tra**

1. Khách hàng: trung thành (T)/rời (R). $P(T \\to T) = 0.9$, $P(R \\to T) = 0.5$. Tìm phân phối dừng.

<details><summary>Đáp án</summary>

$P(T \\to R) = 0.1$, $P(R \\to R) = 0.5$. $\\pi_T = 0.9\\pi_T + 0.5\\pi_R$, $\\pi_T + \\pi_R = 1 \\to \\pi_T = 0.9\\pi_T + 0.5(1-\\pi_T) = 0.4\\pi_T + 0.5 \\to 0.6\\pi_T = 0.5 \\to$ **$\\pi_T = 5/6 \\approx 0.833$**, $\\pi_R = 1/6$. Dài hạn ~83% khách ở trạng thái trung thành.

</details>

### 📝 Tóm tắt mục 4

- Xích Markov: hữu hạn trạng thái, chuyển theo xác suất chỉ phụ thuộc *hiện tại* (tính Markov); ma trận $P$, mỗi hàng cộng $= 1$.
- Phân phối dừng $\\pi$: $\\pi \\cdot P = \\pi$, $\\sum \\pi = 1$ — tỉ lệ thời gian dài hạn, độc lập điều kiện đầu (xích đẹp).
- $\\pi = $ vector riêng trái của $P$ ứng trị riêng 1.

---

## 5. Khi nào dùng mô hình ngẫu nhiên?

- **Bất định là bản chất** (may rủi, đông cá thể, lượng tử) → ngẫu nhiên. Hệ trơn, lặp lại được → tất định (ODE/LP).
- **Không có công thức đóng / quá nhiều chiều** → Monte Carlo.
- **Hệ chuyển trạng thái, "không trí nhớ"** → Markov.
- Nhiều khi **kết hợp**: mô phỏng Monte Carlo *trên* một xích Markov (vd MCMC trong thống kê Bayes — [AI-ML](../../../AI-ML/)).

📝 **Tóm tắt mục 5**: chọn ngẫu nhiên khi bất định là bản chất; Monte Carlo cho bài nhiều chiều/không công thức; Markov cho hệ chuyển trạng thái không trí nhớ.

---

## 6. Bài tập

**Bài 1.** Monte Carlo ước lượng $\\pi$ gieo 5000 điểm, 3920 trong cung. Ước lượng $\\pi$ và nhận xét sai lệch.

**Bài 2.** Muốn giảm sai số Monte Carlo còn $1/5$, phải tăng số mẫu $N$ lên bao nhiêu lần? Vì sao?

**Bài 3.** Ma trận chuyển 2 trạng thái A, B: $P(A \\to A) = 0.7$, $P(B \\to A) = 0.2$. Viết đủ ma trận $P$ (kiểm hàng cộng $= 1$).

**Bài 4.** Tìm phân phối dừng của xích ở Bài 3.

**Bài 5.** Một bạn mô hình giá cổ phiếu ngày mai bằng một ODE tất định và tuyên bố "dự báo chính xác". Vì sao đây là lựa chọn mô hình sai? Nên dùng loại mô hình nào?

**Bài 6.** Tích phân Monte Carlo: dùng 5 điểm $x = 0.1, 0.3, 0.5, 0.7, 0.9$ ước lượng $\\int_0^1 x^2\\,dx$. So với đáp án đúng $1/3$.

**Bài 7.** Random walk 1D đối xứng. (a) Sau 900 bước, "khoảng cách điển hình" tới gốc cỡ bao nhiêu? (b) Muốn độ tản gấp 3 lần so với 900 bước, cần bao nhiêu bước?

**Bài 8.** Một PRNG cho dãy đều $u_1=0.62, u_2=0.18, u_3=0.95, u_4=0.40$. Dùng quy tắc "biến cố xảy ra nếu $u < 0.3$" để mô phỏng 4 lần thử một biến cố xác suất $0.3$. Mấy lần "xảy ra"? Vì sao tỉ lệ quan sát ($\\,?/4$) lệch khỏi $0.3$?

---

## 7. Lời giải chi tiết

**Bài 1.** $\\pi \\approx 4 \\cdot (3920/5000) = 4 \\cdot 0.784 = $ **3.136**. Sai lệch so với 3.1416 $\\approx 0.006$ (~0.2%) — hợp lý với $N = 5000$ (sai số kỳ vọng $\\sim 1/\\sqrt{5000} \\approx 0.014$ trên tỉ lệ, $\\times 4$ cho $\\pi$). Tăng $N$ để sát hơn.

**Bài 2.** Sai số $\\sim 1/\\sqrt{N}$. Muốn sai số $\\times (1/5)$ → cần $\\sqrt{N} \\times 5$ → **$N \\times 25$ lần**. (Hội tụ $1/\\sqrt{N}$ nên giảm sai số tuyến tính đòi tăng mẫu theo bình phương.)

**Bài 3.** $P(A \\to B) = 1 - 0.7 = 0.3$; $P(B \\to B) = 1 - 0.2 = 0.8$. → **$P = \\begin{bmatrix} 0.7 & 0.3 \\\\ 0.2 & 0.8 \\end{bmatrix}$**. Kiểm: hàng 1: $0.7+0.3 = 1$ ✓; hàng 2: $0.2+0.8 = 1$ ✓.

**Bài 4.** $\\pi_A = 0.7\\pi_A + 0.2\\pi_B$; $\\pi_A + \\pi_B = 1 \\to \\pi_A = 0.7\\pi_A + 0.2(1-\\pi_A) = 0.5\\pi_A + 0.2 \\to 0.5\\pi_A = 0.2 \\to$ **$\\pi_A = 0.4$**, $\\pi_B = $ **0.6**. (Kiểm: $\\pi \\cdot P = [0.4 \\cdot 0.7+0.6 \\cdot 0.2, \\ 0.4 \\cdot 0.3+0.6 \\cdot 0.8] = [0.28+0.12, \\ 0.12+0.48] = [0.4, 0.6] = \\pi$ ✓.)

**Bài 5.** Giá cổ phiếu chịu vô số cú sốc thông tin ngẫu nhiên — bất định là *bản chất*, không phải do thiếu dữ liệu. ODE tất định cho ra *một* quỹ đạo "chính xác giả", che giấu rủi ro thật. Nên dùng **mô hình ngẫu nhiên** (vd chuyển động Brown hình học / mô phỏng Monte Carlo nhiều kịch bản) để ước lượng *phân phối* giá ngày mai và rủi ro (xác suất giảm $> X\\%$), thay vì một con số.

**Bài 6.** $f(x)=x^2$ tại 5 điểm: $0.01, 0.09, 0.25, 0.49, 0.81$. Tổng $=1.65$, trung bình $=1.65/5 = 0.33$. Nhân $(b-a)=1 \\to$ ước lượng **0.33**. So đáp án đúng $1/3 \\approx 0.3333$ → sai $\\approx 0.003$ (rất sát, vì 5 điểm này trải đều khắp $[0,1]$ — gần như cầu phương đều, may mắn hơn mẫu ngẫu nhiên thực).

**Bài 7.** (a) Độ tản $\\sim\\sqrt{n}=\\sqrt{900}=$ **30 đơn vị**. (b) Muốn $\\sqrt{n'}=3\\times 30 = 90 \\Rightarrow n' = 90^2 = $ **8100 bước** (gấp 9 lần 900, vì độ tản theo $\\sqrt{n}$ → gấp 3 độ tản cần gấp $3^2=9$ số bước).

**Bài 8.** Áp quy tắc $u<0.3$: $u_1=0.62$ → không; $u_2=0.18 < 0.3$ → **xảy ra**; $u_3=0.95$ → không; $u_4=0.40$ → không. Vậy **1 lần xảy ra trên 4** → tỉ lệ quan sát $1/4 = 0.25$. Lệch khỏi $0.3$ vì $N=4$ quá nhỏ — sai số lấy mẫu $\\sim 1/\\sqrt{4}=0.5$ trên thang tỉ lệ là rất lớn. Tăng $N$ (vd $10^4$ số) thì tỉ lệ "xảy ra" hội tụ về $0.3$ (luật số lớn). Đây chính là cơ chế nền của Monte Carlo: tỉ lệ mẫu $\\to$ xác suất thật khi $N$ lớn.

---

## 8. Bài tiếp theo

[Lesson 08 — Capstone: dự án mô hình hóa end-to-end](../lesson-08-capstone-modeling-project/): phối hợp mọi công cụ (L01–L07) trên một bài toán thực, đi trọn chu trình.

## 📝 Tổng kết

1. **Mô hình ngẫu nhiên** mô tả *phân phối* kết cục; dùng khi bất định là bản chất (tài chính/VaR, hàng đợi, dịch tễ, vật lý hạt). Nhiều mô hình ghép trôi tất định + nhiễu ngẫu nhiên.
2. **Monte Carlo**: lấy mẫu ngẫu nhiên + trung bình/tỉ lệ; sai số $\\sim 1/\\sqrt{N}$, mạnh ở nhiều chiều ($\\pi \\approx 4 \\cdot$ tỉ lệ trong cung; $\\int_a^b f \\approx (b-a)\\overline{f(x_i)}$). Cần PRNG + seed; cẩn thận $N$ nhỏ và độc lập mẫu.
3. **Random walk**: $S_n=\\sum X_i$, $E[S_n]=0$, độ tản $\\sim\\sqrt{n}$ — giới hạn liên tục là chuyển động Brown (nền của khuếch tán, giá cổ phiếu).
4. **Xích Markov**: tương lai chỉ phụ thuộc hiện tại; ma trận $P$ (hàng cộng $= 1$); phân phối dừng $\\pi \\cdot P = \\pi$ độc lập điều kiện đầu.
5. Chọn ngẫu nhiên/tất định theo bản chất bất định; có thể kết hợp (MCMC = Monte Carlo trên xích Markov).
`;
