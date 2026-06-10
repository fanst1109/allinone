# Lesson 07 — Hàm mũ và hàm log (exponential & logarithm functions)

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Hiểu định nghĩa và đặc tính của hàm mũ $f(x) = a^x$ và hàm log $f(x) = \log_a(x)$.
- Biết vì sao **cơ số $e \approx 2.71828$** lại đặc biệt — không phải con số ngẫu nhiên.
- Hình dung được **tốc độ tăng** của hàm mũ so với polynomial, và vì sao log tăng cực chậm.
- Biết khi nào nên vẽ ở **log scale** thay vì linear scale.
- Hiểu mối quan hệ ngược giữa $e^x$ và $\ln x$, và vì sao ML/AI dùng cặp này khắp nơi (sigmoid, softmax, cross-entropy, log-likelihood).
- Cài được `sigmoid` và `softmax` ổn định số bằng Go.

## Kiến thức tiền đề

- [Lesson 04 — Lũy thừa, căn, logarit](../lesson-04-powers-roots-logs/): nắm vững $a^n$, $\log_a(x)$ và các quy tắc.
- [Lesson 06 — Hàm bậc 1 và bậc 2](../lesson-06-linear-quadratic/): hiểu khái niệm hàm, đồ thị, đỉnh, giao điểm.

Bài này gắn $a^n$ thành một **hàm liên tục** $a^x$ (cho $x$ là số thực bất kỳ, không chỉ số nguyên) và nâng $\log$ thành công cụ phân tích dữ liệu.

---

## PHẦN A — Hàm mũ (exponential function)

### A.1. Định nghĩa

**Trực giác trước hết — "đường tăng/giảm nhanh kinh khủng"**.

Hãy hình dung 3 đường cong cùng xuất phát từ điểm thấp:

- **Đường thẳng** $y = x$ (bậc 1): tăng đều đều, mỗi bước $+1$.
- **Parabol** $y = x^2$ (bậc 2): tăng nhanh hơn, mỗi bước cong lên.
- **Hàm mũ** $y = 2^x$: tăng *gấp đôi mỗi bước*. Sau vài bước nó *bứt khỏi* parabol một cách không thể đuổi kịp.

Cụ thể bằng số $2^x$ so với $x$ và $x^2$:

| $x$ | $x$ (bậc 1) | $x^2$ (bậc 2) | $2^x$ (mũ) |
|---|---:|---:|---:|
| 0 | 0 | 0 | **1** |
| 1 | 1 | 1 | **2** |
| 2 | 2 | 4 | **4** |
| 5 | 5 | 25 | **32** |
| 10 | 10 | 100 | **1 024** |
| 20 | 20 | 400 | **1 048 576** ($\approx 10^6$) |
| 30 | 30 | 900 | **1 073 741 824** ($\approx 10^9$) |

Đọc bảng: ở $x = 2$, parabol đang dẫn (4 > 4). Ở $x = 5$, parabol vẫn còn dẫn (25 ~ 32). Ở $x = 10$, mũ vượt hẳn (1024 vs 100). Ở $x = 30$, mũ là **1 tỷ**, parabol mới 900 — chênh **1 triệu lần**.

**Truyền thuyết hạt thóc trên bàn cờ**. Vua Ấn Độ thưởng nhà phát minh cờ vua: ô 1 đặt 1 hạt thóc, ô 2 đặt 2, ô 3 đặt 4, ô 4 đặt 8, ..., ô $k$ đặt $2^{k-1}$ hạt. Vua nghĩ "vài bao thóc là cùng". Tính thử:

- Ô 10: $2^9 = 512$ hạt — vẫn nắm tay.
- Ô 20: $2^{19} \approx 524\,288$ hạt — nửa triệu, mấy chục cân.
- Ô 32: $2^{31} \approx 2.15 \cdot 10^9$ hạt — 2 tỷ, vài chục container.
- Ô 64 (ô cuối): $2^{63} \approx 9.2 \cdot 10^{18}$ hạt — **nhiều hơn toàn bộ sản lượng thóc cả lịch sử loài người cộng lại**.

Tổng toàn bàn cờ: $2^{64} - 1 \approx 1.8 \cdot 10^{19}$ hạt. Vua phá sản vì không hiểu **exponential**. Đây là sức mạnh của hàm mũ — và là lý do bạn cần học bài này.

---

Cho $a > 0,\ a \neq 1$, hàm mũ cơ số $a$ được định nghĩa là:

$$f(x) = a^x$$

Điểm cốt lõi: **biến $x$ ở vị trí số mũ**, còn cơ số $a$ cố định. Đây là điểm khác hẳn hàm bậc 1 ($ax + b$) hay bậc 2 ($ax^2 + bx + c$) — ở đó $x$ nằm ở vị trí cơ số, số mũ cố định.

| Hàm | Vị trí của $x$ | Ví dụ |
|---|---|---|
| Bậc 1 | trong cơ số, mũ = 1 | $3x + 5$ |
| Bậc 2 | trong cơ số, mũ = 2 | $2x^2 + x$ |
| Bậc k | trong cơ số, mũ = k cố định | $x^5$ |
| **Mũ** | **trong số mũ**, cơ số cố định | $2^x$, $e^x$, $10^x$ |

Vì sao loại trừ $a = 1$? Vì $1^x = 1$ với mọi $x$ — thành hằng số, không thú vị.
Vì sao loại trừ $a \leq 0$? Vì $(-2)^{0.5} = \sqrt{-2}$ không phải số thực; $0^{-1} = 1/0$ không xác định. Loại trừ cho gọn miền xác định.

**🔁 Dừng lại tự kiểm tra**:
- Bạn có thể nói nhanh $2^{10} = ?$, $2^{20} \approx ?$ không? (Đáp: $1024 \approx 10^3$, $10^6$.)
- Tại sao parabol thua mũ dù lúc đầu thắng? (Đáp: mỗi bước parabol *cộng* thêm, mũ *nhân* lên — nhân thì nhanh hơn cộng dài hạn.)
- Nếu bạn dồn hết thóc thế giới ($\approx 750$ triệu tấn $\approx 10^{16}$ hạt) lên bàn cờ, đặt được tới ô bao nhiêu? (Đáp: $2^k \approx 10^{16} \to k \approx 53$. Tức tới ô 54 là phá sản rồi.)

### A.2. Đặc tính

Với $a > 1$ (vd $a = 2, e, 10$):

- **Luôn dương**: $a^x > 0$ với mọi $x \in \mathbb{R}$. Không bao giờ chạm 0 hay xuống âm.
- **Tăng nghiêm ngặt**: $x$ lớn hơn $\to$ $a^x$ lớn hơn.
- **Đi qua điểm $(0, 1)$**: vì $a^0 = 1$ với mọi $a$.
- **Tiệm cận với trục Ox khi $x \to -\infty$**: $2^{-10} = 1/1024 \approx 0.001$, $2^{-30} \approx 10^{-9}$ — về rất gần 0 nhưng không bao giờ chạm.
- **Bùng nổ khi $x \to +\infty$**: $2^{10} \approx 10^3$, $2^{30} \approx 10^9$, $2^{60} \approx 10^{18}$.

Với $0 < a < 1$ (vd $a = 0.5$):

- Vẫn luôn dương, đi qua $(0, 1)$, nhưng **giảm** khi $x$ tăng.
- Tiệm cận với Ox khi $x \to +\infty$ (ngược lại với trường hợp $a > 1$).
- Đây thực ra là cùng một họ: $(1/2)^x = 2^{-x}$. Đảo dấu mũ thì ngang bằng đảo cơ số $a \leftrightarrow 1/a$.

**Bảng so sánh hai trường hợp** — $2^x$ (tăng) vs $0.5^x = 2^{-x}$ (giảm):

| $x$ | $2^x$ | $0.5^x$ |
|---:|---:|---:|
| -3 | 0.125 | 8 |
| -1 | 0.5 | 2 |
| 0 | 1 | 1 |
| 1 | 2 | 0.5 |
| 3 | 8 | 0.125 |
| 5 | 32 | 0.03125 |

Quan sát: hàng nào cũng có $2^x \cdot 0.5^x = 1$. Đó là vì $2^x \cdot (1/2)^x = (2 \cdot 1/2)^x = 1^x = 1$. Hai đồ thị là *gương* của nhau qua trục $y$ — phản chiếu, không phải hai họ khác.

### A.3. Cơ số đặc biệt e ≈ 2.71828

**Motivation — sao chọn `e`? Lãi kép liên tục.**

$e$ không phải con số tự nhiên rơi từ trên trời. Nó được phát hiện từ một bài toán rất đời thường: lãi kép liên tục.

**Walk-through compound interest** — giả sử bạn gửi `100 triệu`, lãi `100%/năm` (lãi rất cao để thấy rõ hiệu ứng):

- **Gộp 1 lần/năm**: cuối năm có $100 \cdot (1 + 1) = 200$ triệu. Vốn nhân 2 lần.
- **Gộp 2 lần/năm** (mỗi 6 tháng cộng 50% lãi):
  - Sau 6 tháng: $100 \cdot (1 + 0.5) = 150$.
  - Sau 12 tháng: $150 \cdot 1.5 = 225$. Tức $100 \cdot (1 + 1/2)^2 = 225$ triệu. Vốn nhân 2.25.
- **Gộp 12 lần/năm** (mỗi tháng cộng $100/12 \approx 8.33\%$):
  - $100 \cdot (1 + 1/12)^{12} \approx 100 \cdot 2.6130 \approx 261.30$ triệu. Vốn nhân 2.613.
- **Gộp 365 lần** (mỗi ngày):
  - $100 \cdot (1 + 1/365)^{365} \approx 100 \cdot 2.7146 \approx 271.46$ triệu. Vốn nhân 2.7146.
- **Gộp 8 760 lần** (mỗi giờ): vốn nhân $\approx 2.71813$.
- **Gộp $\infty$ lần** (mỗi nano-giây, mỗi đơn vị thời gian nhỏ nhất): hội tụ về một số cố định $e \approx 2.71828$ — vốn nhân $100 \cdot e \approx 271.83$ triệu.

Tức **lãi gộp liên tục với 100% lãi suất thì vốn nhân lên đúng $e$ lần sau 1 năm**. Không phải 3, không phải 4, mà là $e \approx 2.71828\ldots$

Đây là **định nghĩa "lãi kép liên tục" của $e$**. Tổng quát hóa: nếu lãi $r$/năm gộp liên tục trong $t$ năm, vốn nhân lên $e^{rt}$ lần.

---

Câu hỏi tự nhiên: tại sao toán/khoa học/ML đều dùng $e$ mà không phải $2$ hay $10$?

**Trực giác**: $e$ là cơ số duy nhất mà hàm $f(x) = a^x$ có đạo hàm bằng chính nó. Nghĩa là **độ dốc của $e^x$ tại mọi điểm $x$ đúng bằng giá trị $e^x$ tại điểm đó**:

$$(e^x)' = e^x$$

Tại $x = 0$: $e^0 = 1$, độ dốc = 1.
Tại $x = 1$: $e^1 \approx 2.718$, độ dốc cũng $\approx 2.718$.

Đây là tính chất khiến $e$ xuất hiện tự nhiên trong mọi bài toán liên quan đến **tốc độ thay đổi tỷ lệ với giá trị hiện tại** — lãi kép liên tục, dân số, phân rã phóng xạ, mạch RC, etc.

**Định nghĩa hình thức 1 — qua giới hạn**:

$$e = \lim_{n \to \infty} \left(1 + \frac{1}{n}\right)^n$$

Đến từ bài toán lãi kép: nếu lãi `100%/năm` chia thành $n$ kỳ, mỗi kỳ $1/n$, ta có $\left(1 + \frac{1}{n}\right)^n$. Khi $n \to \infty$ (lãi gộp liên tục), số ấy tiến về $e$.

Tính cụ thể cho vài giá trị $n$:

| $n$ | $\left(1 + \frac{1}{n}\right)^n$ |
|---|---|
| 1 | $(1 + 1)^1 = 2$ |
| 2 | $(1.5)^2 = 2.25$ |
| 5 | $(1.2)^5 \approx 2.488$ |
| 10 | $(1.1)^{10} \approx 2.594$ |
| 100 | $(1.01)^{100} \approx 2.7048$ |
| 1 000 | $\approx 2.7169$ |
| 10 000 | $\approx 2.71815$ |
| 100 000 | $\approx 2.71827$ |
| $\infty$ | $e \approx 2.7182818\ldots$ |

Hội tụ nhưng chậm.

**Định nghĩa hình thức 2 — qua chuỗi** (không bắt buộc thuộc, chỉ giới thiệu):

$$e = \sum_{k=0}^{\infty} \frac{1}{k!} = 1 + 1 + \frac{1}{2} + \frac{1}{6} + \frac{1}{24} + \cdots$$

Tính 5 số hạng đầu: $1 + 1 + 0.5 + 0.1667 + 0.0417 = 2.7083$. 10 số hạng đầu cho 7 chữ số đúng. Chuỗi này hội tụ rất nhanh — chính nó là cách máy tính thực sự tính $e^x$.

**Câu hỏi tự nhiên**: nếu $e \approx 2.718$ thì sao không dùng luôn $2$? Câu trả lời: dùng được, nhưng đạo hàm của $2^x$ không phải $2^x$ mà là $2^x \cdot \ln 2 \approx 0.693 \cdot 2^x$. Mỗi lần đạo hàm sinh thêm hằng số rác. Chọn $e$ để các công thức gọn nhất.

---

**❓ Một loạt câu hỏi tự nhiên cần đóng ngay**:

**Q1: "Sao đạo hàm của $e^x$ lại là chính nó? Có hàm nào khác có tính chất ấy không?"**

Trực giác: hàm $f(x) = a^x$ có một tính chất đẹp — *đạo hàm tỷ lệ với chính nó*: $(a^x)' = a^x \cdot \ln(a)$. Hằng số tỷ lệ là $\ln(a)$. Nếu ta chọn cơ số sao cho $\ln(a) = 1$, thì hằng số đó biến mất và $(a^x)' = a^x$. Giải $\ln(a) = 1$ ra $a = e$. Tức **$e$ được định nghĩa chính là cơ số làm cho đạo hàm = chính nó**.

Có hàm khác có tính chất "đạo hàm = chính nó" không? Có — họ hàm $f(x) = C \cdot e^x$ (mọi hằng số nhân với $e^x$) đều có $f'(x) = C \cdot e^x = f(x)$. Đây là **nghiệm tổng quát của phương trình vi phân $y' = y$** — bài toán "tốc độ thay đổi bằng giá trị hiện tại" mà rất nhiều hiện tượng tự nhiên thỏa (dân số khi chưa chạm trần, lãi kép, phân rã phóng xạ, mạch RC...). Đó là vì sao $e$ xuất hiện khắp nơi trong khoa học.

**Q2: "Sao chọn cơ số $e$ mà không phải $2$ hay $10$ trong ML/toán?"**

Ba lý do thực dụng:

1. **Đạo hàm gọn nhất**: $(e^x)' = e^x$, $(\ln x)' = 1/x$. Với cơ số khác, mọi đạo hàm và tích phân kéo theo hằng số $\ln a$ rác.
2. **Chuỗi Taylor gọn**: $e^x = 1 + x + \frac{x^2}{2!} + \frac{x^3}{3!} + \cdots$ — không có hệ số rác. Cơ số khác phải dùng $a^x = e^{x \ln a}$, lại thêm bước trung gian.
3. **Tự nhiên trong xác suất**: phân phối Gauss, Poisson, Exponential, Boltzmann... đều có $e$ trong công thức vì chúng xuất phát từ giả thiết "tốc độ biến đổi tỷ lệ với giá trị".

Cơ số 2 thì có chỗ dùng (CS — đếm bit, entropy đo bằng bit). Cơ số 10 thì có chỗ dùng (kỹ thuật — dB, pH, Richter, đo lường đời thường). Cơ số $e$ thì dùng ở chỗ có giải tích (đạo hàm, tích phân, ODE) — tức gần như mọi nơi trong ML/khoa học định lượng.

**Q3: "Hàm $e^x$ và $2^x$ đều là exp — khác nhau ở đâu thực tế?"**

Cả hai cùng *họ* exponential. Khác nhau chỉ là **tốc độ**:

- $2^x$ tăng *gấp đôi* sau mỗi đơn vị $x$. "Doubling time" = 1.
- $e^x$ tăng *gấp $e \approx 2.72$* sau mỗi đơn vị $x$. "e-folding time" = 1.

Quan hệ trực tiếp: $2^x = e^{x \cdot \ln 2} \approx e^{0.693 x}$. Tức $2^x$ chậm hơn $e^x$ (vì $0.693 < 1$). Tại $x = 10$: $2^{10} = 1024$, $e^{10} \approx 22\,026$ — $e^x$ lớn hơn ~21 lần.

Thực tế dùng:
- **$2^x$**: tự nhiên trong CS (số bit, số node của cây nhị phân đầy, độ phức tạp $O(2^n)$).
- **$e^x$**: tự nhiên trong toán liên tục, ML (sigmoid, softmax, Gaussian), vật lý (phân rã, mạch RC), tài chính (lãi liên tục).

Cùng dạng đường cong, chỉ co giãn theo trục $x$. Nhìn ở log scale (xem B.5), cả hai đều là đường thẳng — chỉ khác hệ số góc.

**🔁 Dừng lại tự kiểm tra**:
- Bạn có giải thích được vì sao $e$ xuất hiện trong công thức lãi kép liên tục mà không phải $2$ hay $3$? (Đáp: vì $\left(1 + \frac{1}{n}\right)^n \to e$ khi $n \to \infty$, đây là giới hạn tự nhiên của bài toán "chia nhỏ vô hạn".)
- Tại sao $(2^x)'$ không bằng $2^x$? (Đáp: vì $(a^x)' = a^x \cdot \ln a$. Chỉ khi $\ln a = 1$ (tức $a = e$) thì hệ số mới triệt tiêu.)
- Đoán nhanh: $e^5$ lớn cỡ bao nhiêu? (Gợi ý: $e \approx 2.72$, $e^2 \approx 7.4$, $e^5 = e^2 \cdot e^2 \cdot e \approx 7.4 \cdot 7.4 \cdot 2.72 \approx 149$.)

### A.4. Tốc độ tăng — exponential thắng mọi polynomial

So sánh $x^2$, $x^3$, $2^x$, $e^x$ tại các giá trị $x$:

| $x$ | $x^2$ | $x^3$ | $2^x$ | $e^x$ |
|---|---|---|---|---|
| 1 | 1 | 1 | 2 | 2.72 |
| 5 | 25 | 125 | 32 | 148.4 |
| 10 | 100 | 1 000 | 1 024 | 22 026 |
| 20 | 400 | 8 000 | 1 048 576 | $\approx 4.85 \cdot 10^8$ |
| 50 | 2 500 | 125 000 | $\approx 10^{15}$ | $\approx 5.18 \cdot 10^{21}$ |

Quan sát:

- Tại $x = 5$, $x^3 = 125$ còn lớn hơn $2^x = 32$. Polynomial đang dẫn.
- Tại $x = 10$, $2^x = 1024$ đã vượt $x^3 = 1000$. Exponential bắt đầu thắng.
- Tại $x = 20$, $2^x \approx 10^6$ còn $x^3 = 8000$ — exponential bỏ xa.
- Tại $x = 50$, khoảng cách là $10^{11}$ lần.

**Định lý nền tảng** (sẽ chứng minh ở tầng Calculus): với mọi hằng số $k > 0$ và mọi $a > 1$,

$$\lim_{x \to +\infty} \frac{x^k}{a^x} = 0$$

Diễn dịch: **bất kể polynomial bậc bao nhiêu, exponential luôn vượt mặt khi $x$ đủ lớn**.

**Hệ quả thực tế trong CS**: thuật toán có độ phức tạp $O(2^n)$ (vd duyệt mọi subset của $n$ phần tử) sẽ **luôn** tệ hơn $O(n^k)$ cho mọi $k$ cố định, khi $n$ đủ lớn. Cụ thể:

- Sắp xếp 100 phần tử bằng $O(n^2)$: ~10 000 phép.
- Duyệt mọi subset của 100 phần tử bằng $O(2^n)$: $2^{100} \approx 1.27 \cdot 10^{30}$ phép — máy nhanh nhất hành tinh cũng không kịp trước khi vũ trụ kết thúc.

Đây là vì sao "exponential blowup" là từ khóa đáng sợ trong tối ưu hóa và NP-hardness.

### A.5. Ứng dụng

**(a) Lãi kép (compound interest)** — gốc gác lịch sử của $e$.

- Gửi $P$ triệu, lãi $r$/năm, gộp 1 lần/năm, sau $t$ năm: $A = P(1 + r)^t$.
- Nếu gộp $n$ lần/năm: $A = P\left(1 + \frac{r}{n}\right)^{nt}$.
- Gộp liên tục ($n \to \infty$): $A = P \cdot e^{rt}$.

Vd $P = 100,\ r = 0.05,\ t = 30$:
- Discrete (gộp 1 lần/năm): $100 \cdot 1.05^{30} \approx 432.19$.
- Continuous: $100 \cdot e^{0.05 \cdot 30} = 100 \cdot e^{1.5} \approx 448.17$.
Chênh ~16 triệu — không nhiều, nhưng càng nhiều kỳ thì kết quả càng gần $e^{rt}$.

**(b) Tăng trưởng dân số / lan truyền dịch bệnh**: trong giai đoạn đầu, khi chưa chạm trần tài nguyên / miễn dịch cộng đồng, số ca nhiễm tăng theo $N_0 \cdot e^{kt}$. Đây là vì sao dịch bệnh "vô hại" trong tuần 1 lại "kinh hoàng" trong tuần 6 — đường cong cùng một dạng, chỉ là bạn đang ở khúc nào.

**(c) Phân rã (decay)** — ngược dấu của tăng trưởng:

$$N(t) = N_0 \cdot e^{-\lambda t}$$

$\lambda > 0$ là hằng số phân rã. Chu kỳ bán rã $T_{1/2}$ là thời gian để $N$ giảm còn nửa:

$$\frac{N_0}{2} = N_0 \cdot e^{-\lambda T_{1/2}} \quad\to\quad T_{1/2} = \frac{\ln 2}{\lambda} \approx \frac{0.693}{\lambda}$$

Vd Carbon-14 có $T_{1/2} \approx 5730$ năm — đó là cơ sở của radiocarbon dating.

**(d) Trong Machine Learning**:

- **Sigmoid** $\sigma(x) = \dfrac{1}{1 + e^{-x}}$: ép giá trị thực bất kỳ về khoảng $(0, 1)$, dùng làm xác suất. Cốt lõi của logistic regression và là activation function cũ của neural network.
  - $\sigma(0) = 0.5$, $\sigma(-\infty) \to 0$, $\sigma(+\infty) \to 1$.
- **Softmax** $\text{softmax}(x_i) = \dfrac{e^{x_i}}{\sum_j e^{x_j}}$: chuẩn hóa vector số thực thành phân phối xác suất (mỗi phần tử $\in (0, 1)$, tổng = 1). Dùng ở lớp cuối mọi mô hình phân loại nhiều lớp.
- **Logistic regression**: kết hợp linear + sigmoid + log-likelihood loss.

Tất cả đều quay quanh $e^x$. Vì sao? Vì đạo hàm gọn, vì kết quả luôn dương (chia ra xác suất hợp lệ), vì tính chất "small wins, big wins" của exponential (logit chênh 1 $\to$ xác suất chênh $\approx e$ lần).

**🔁 Dừng lại tự kiểm tra**:
- Trong công thức lãi kép liên tục $A = P \cdot e^{rt}$, nếu $r = 0$ (không có lãi), $A$ bằng bao nhiêu? (Đáp: $P \cdot e^0 = P \cdot 1 = P$ — vốn không đổi. Hợp lý ✓.)
- Carbon-14 phân rã với $\lambda = \ln 2 / 5730 \approx 1.21 \cdot 10^{-4}$ /năm. Sau 11 460 năm (2 chu kỳ bán rã), còn lại bao nhiêu %? (Đáp: $e^{-\lambda \cdot 11460} = e^{-2 \ln 2} = e^{\ln(1/4)} = 1/4 = 25\%$.)
- Một city có dân số `1 triệu`, tăng `2%/năm` gộp liên tục. Sau 35 năm? (Đáp: $1\,000\,000 \cdot e^{0.02 \cdot 35} = 1\,000\,000 \cdot e^{0.7} \approx 1\,000\,000 \cdot 2.014 \approx 2.01$ triệu. Quy tắc 70: $70/2 = 35$ năm để gấp đôi — kiểm chứng ✓.)

---

## PHẦN B — Hàm logarit (logarithm function)

### B.1. Định nghĩa

$\log_a(x)$ là **hàm ngược** của $a^x$:

$$y = \log_a(x) \iff a^y = x$$

Diễn dịch: "$\log_a$ của $x$" trả lời câu hỏi *"phải nâng $a$ lên lũy thừa bao nhiêu để được $x$?"*

Vì là hàm ngược, đồ thị $y = \log_a(x)$ chính là đồ thị $y = a^x$ **lật qua đường $y = x$**. Mọi điểm $(p, q)$ trên đồ thị mũ tương ứng $(q, p)$ trên đồ thị log.

### B.2. Đặc tính

- **Domain**: $x > 0$. Không có $\log$ của 0 hay số âm trong số thực — vì $a^y$ không bao giờ bằng số $\leq 0$.
- **Range**: tất cả $\mathbb{R}$. Có thể là số âm (vd $\log_2(0.25) = -2$), số 0 ($\log_a(1) = 0$), hay rất lớn.
- **Đi qua $(1, 0)$**: $\log_a(1) = 0$ vì $a^0 = 1$.
- **Đi qua $(a, 1)$**: $\log_a(a) = 1$ vì $a^1 = a$.
- **Tăng** nếu $a > 1$, **giảm** nếu $0 < a < 1$ — chậm hơn bất kỳ polynomial nào.
- **Tiệm cận với trục Oy** khi $x \to 0^+$: $\log_2(0.001) \approx -10$, $\log_2(10^{-9}) \approx -30$.

**Bảng giá trị log cụ thể** — để bắt được trực giác:

| $x$ | $\log_2(x)$ | Diễn dịch |
|---:|---:|---|
| 0.001 | -9.97 | $x = 10^{-3}$, $\log_2$ hơi nhỏ hơn -10 vì $2^{10} = 1024 \approx 10^3$ |
| 0.5 | -1 | $2^{-1} = 0.5$ |
| 1 | 0 | $2^0 = 1$ |
| 2 | 1 | $2^1 = 2$ |
| 8 | 3 | $2^3 = 8$ |
| 1024 | 10 | $2^{10} = 1024$ |

**🔁 Dừng lại tự kiểm tra**:
- Vì sao $\log_a(1) = 0$ không phụ thuộc cơ số $a$? (Đáp: vì $a^0 = 1$ với mọi $a$ — luôn đúng.)
- $\log_2(-4) = ?$ (Đáp: không tồn tại — $2^y$ luôn dương, không bao giờ ra $-4$.)
- Nếu $\log_2(x) = 20$, $x = ?$ (Đáp: $x = 2^{20} = 1\,048\,576 \approx 10^6$.)

### B.3. Ba log đặc biệt

| Ký hiệu | Cơ số | Tên | Dùng nhiều ở đâu |
|---|---|---|---|
| $\ln x$ | $e$ | log tự nhiên | Toán, ML, mọi nơi có đạo hàm |
| $\log x$ | 10 | log thập phân | Khoa học, kỹ thuật (dB, pH, Richter) |
| $\log_2 x$ | 2 | log nhị phân | Computer Science (độ phức tạp, entropy bit) |

Quy ước viết tắt khác nhau theo ngành — sách toán phổ thông $\log$ thường $= \log_{10}$, trong ML/CS $\log$ thường $= \ln$. Khi đọc paper, kiểm tra context.

**Đổi cơ số** (từ Lesson 04):

$$\log_a(x) = \frac{\ln(x)}{\ln(a)}$$

Nên thực ra ba log trên chỉ khác nhau bởi một hằng số nhân:
- $\log_2(x) = \dfrac{\ln(x)}{\ln(2)} \approx \dfrac{\ln(x)}{0.693} \approx 1.4427 \cdot \ln(x)$
- $\log_{10}(x) = \dfrac{\ln(x)}{\ln(10)} \approx \dfrac{\ln(x)}{2.303} \approx 0.4343 \cdot \ln(x)$

**Bảng đối chiếu $e^x$ ↔ $\ln(x)$** — vì hai hàm là ngược nhau, mỗi cặp $(x, e^x)$ ở cột trái tương ứng $(e^x, x)$ ở cột phải:

| $x$ | $e^x$ | | $x$ | $\ln(x)$ |
|---:|---:|---|---:|---:|
| -2 | 0.1353 | | 0.1353 | -2 |
| -1 | 0.3679 | | 0.3679 | -1 |
| 0 | 1 | | 1 | 0 |
| 0.5 | 1.6487 | | 1.6487 | 0.5 |
| 1 | 2.7183 | | 2.7183 | 1 |
| 2 | 7.389 | | 7.389 | 2 |
| 5 | 148.41 | | 148.41 | 5 |

Đọc bảng: ở hàng "$x = 1$, $e^x \approx 2.72$" (trái) thì ở hàng cùng dòng có "$x \approx 2.72$, $\ln(x) = 1$" (phải). Đây chính là tính chất $\ln(e^x) = x$ minh họa bằng số — mọi giá trị trên đường $y = e^x$ đảo qua đường $y = x$ thì rơi đúng vào đường $y = \ln(x)$.

**Tại sao đa số công thức ML viết bằng $\ln$ chứ không phải $\log_2$ hay $\log_{10}$?**

Lý do duy nhất nhưng cực mạnh: **đạo hàm đẹp nhất**.

| Hàm | Đạo hàm | Hệ số rác |
|---|---|---|
| $(e^x)'$ | $e^x$ | không có |
| $(\ln x)'$ | $1/x$ | không có |
| $(2^x)'$ | $2^x \cdot \ln 2$ | $\ln 2 \approx 0.693$ |
| $(\log_2 x)'$ | $\dfrac{1}{x \cdot \ln 2}$ | $1/\ln 2 \approx 1.4427$ |
| $(10^x)'$ | $10^x \cdot \ln 10$ | $\ln 10 \approx 2.303$ |
| $(\log_{10} x)'$ | $\dfrac{1}{x \cdot \ln 10}$ | $1/\ln 10 \approx 0.4343$ |

Mọi cơ số khác $e$ đều kéo theo một hằng số $\ln a$ lủng lẳng trong đạo hàm. Khi tính gradient (Tầng 3 Calculus) hay propagate qua nhiều lớp neural network, các hằng số này tích lũy thành rác làm công thức rối. Chọn $e$ (và $\ln$) để đạo hàm gọn nhất → mọi paper ML mặc định viết $\log = \ln$ (gọi là *natural log* — log "tự nhiên" theo nghĩa "không có hệ số rác").

**🔁 Dừng lại tự kiểm tra**:
- Nếu $\ln(7.389) = ?$ thì $e^{?} = 7.389$? (Đáp: cả hai đều = 2.)
- Vì sao $(\log_2 x)' = \dfrac{1}{x \cdot \ln 2}$ mà không phải $\dfrac{1}{x \cdot \log_2 e}$? (Đáp: hai cái này bằng nhau — $\log_2 e = 1/\ln 2$. Chỉ là cách viết khác.)
- Nếu bạn thay mọi $\ln$ trong cross-entropy bằng $\log_2$, loss có đổi không? (Đáp: đổi *giá trị* — nhân với hằng số $1/\ln 2$. Nhưng *cực tiểu* không đổi $\to$ gradient descent hội tụ về cùng nghiệm. Chỉ là số khác nhau.)

### B.4. Tốc độ tăng — log tăng cực chậm

| $x$ | $\log_2(x)$ | $\log_{10}(x)$ | $\ln(x)$ |
|---|---|---|---|
| 1 | 0 | 0 | 0 |
| 10 | 3.32 | 1 | 2.30 |
| 100 | 6.64 | 2 | 4.61 |
| 1 000 | 9.97 | 3 | 6.91 |
| 10 000 | 13.29 | 4 | 9.21 |
| 1 000 000 | 19.93 | 6 | 13.82 |
| 1 000 000 000 (1 tỷ) | 29.90 | 9 | 20.72 |

Quan sát: từ 1 tới 1 tỷ — $x$ nhân lên $10^9$ lần, $\log_2(x)$ chỉ tăng từ 0 lên ~30.

**Hệ quả CS**: binary search trên mảng 1 tỷ phần tử chỉ cần ~30 phép so sánh. Đó là vì mỗi bước cắt nửa, sau $k$ bước còn $n / 2^k$ phần tử — giải $n / 2^k = 1$ ta được $k = \log_2(n)$.

Tương tự: cây cân bằng (AVL, Red-Black, B-tree) lưu $n$ phần tử có chiều cao $O(\log n)$. Tra cứu trên 1 tỷ key ở B-tree với fanout 100 cao $\log_{100}(10^9) \approx 4.5$ — đọc đĩa 5 lần là xong.

**Bảng so sánh tốc độ tăng đầy đủ** — tất cả các tốc độ thường gặp trong CS/toán đặt cạnh nhau:

| $x$ | $\log_2(x)$ | $x$ | $x \cdot \log_2(x)$ | $x^2$ | $x^3$ | $2^x$ | $e^x$ |
|---:|---:|---:|---:|---:|---:|---:|---:|
| 1 | 0 | 1 | 0 | 1 | 1 | 2 | 2.72 |
| 5 | 2.32 | 5 | 11.6 | 25 | 125 | 32 | 148.4 |
| 10 | 3.32 | 10 | 33.2 | 100 | 1 000 | 1 024 | 22 026 |
| 50 | 5.64 | 50 | 282 | 2 500 | 125 000 | $\approx 1.13 \cdot 10^{15}$ | $\approx 5.18 \cdot 10^{21}$ |
| 100 | 6.64 | 100 | 664 | 10 000 | $10^6$ | $\approx 1.27 \cdot 10^{30}$ | $\approx 2.69 \cdot 10^{43}$ |
| 500 | 8.97 | 500 | 4 483 | 250 000 | $1.25 \cdot 10^8$ | $\approx 3.27 \cdot 10^{150}$ | $\approx 1.40 \cdot 10^{217}$ |
| 1 000 | 9.97 | 1 000 | 9 966 | $10^6$ | $10^9$ | $\approx 1.07 \cdot 10^{301}$ | $\approx 10^{434}$ |

Đọc bảng:
- $\log$ tăng *kinh khủng chậm*: 1 → 1 000 chỉ làm $\log_2$ tăng từ 0 → 10.
- $x \cdot \log x$ chỉ nhỉnh hơn $x$ rất ít — đó là vì sao thuật toán $O(n \log n)$ (merge sort, heap sort, FFT) coi như "gần tuyến tính" trong thực tế.
- $x^2$ vs $x^3$ chênh nhiều ở $x$ lớn, nhưng cả hai vẫn là *tép riu* so với $2^x$.
- $2^x$ và $e^x$ cùng họ exp, vẫn cách nhau $\approx 10^{133}$ lần ở $x = 1000$.

**ASCII bar chart so sánh tại x = 20** — minh họa trực quan độ chênh khổng lồ. Scale: mỗi ký tự `█` đại diện ~1 đơn vị cho cột nhỏ, và scale động cho cột lớn.

```
Tại x = 20:

log₂(20) ≈ 4.3
█████    (4.3 đơn vị)

20
████████████████████   (20 đơn vị)

20·log₂(20) ≈ 86.4
█ scale ×4 → █████████████████████   (86.4 → ~22 ký tự, mỗi ký tự = 4)

20² = 400
█ scale ×20 → ████████████████████   (400 → 20 ký tự, mỗi ký tự = 20)

20³ = 8 000
█ scale ×400 → ████████████████████   (8 000 → 20 ký tự, mỗi ký tự = 400)

2^20 ≈ 1 048 576 (~10⁶)
█ scale ×52 429 → ████████████████████   (10⁶ → 20 ký tự, mỗi ký tự = 52 429)

e^20 ≈ 485 165 195 (~4.85·10⁸)
█ scale ×24 258 260 → ████████████████████   (4.85·10⁸ → 20 ký tự)
```

Nếu cố vẽ tất cả ở **cùng scale tuyến tính**, các cột bé hơn $e^{20}$ bị bóp về 0 — đây chính là lý do phải vẽ ở **log scale** (mục B.5 ngay sau). Ở log scale, mỗi bar có chiều dài tỷ lệ với $\log$ của giá trị → các cột trở thành bậc thang đều, dễ so sánh.

**🔁 Dừng lại tự kiểm tra**:
- Sắp xếp nhanh tốc độ tăng (chậm → nhanh): $\log x$, $x$, $x \log x$, $x^2$, $x^3$, $2^x$, $e^x$.
- Tại $x = 100$, $x^3 = 10^6$ mà $2^x \approx 10^{30}$ — chênh $10^{24}$ lần. Vẫn cùng input, sao chênh kinh thế? (Đáp: vì $2^x$ thắng *bất kỳ* polynomial khi $x$ đủ lớn — định lý nền tảng đã nêu ở A.4.)
- Một file 1GB $= 10^9$ byte. Số bit cần để đánh số mọi byte $= \log_2(10^9) \approx 30$ bit. Số bit cần để đánh số mọi *cách sắp xếp* $10^9$ byte $= \log_2(10^9!) \approx 10^9 \cdot \log_2(10^9) \approx 3 \cdot 10^{10}$ bit. (Áp dụng $n \log n$ của Stirling.)

**🔁 Dừng lại tự kiểm tra**:
- Trong một mảng đã sort 1 triệu phần tử, binary search dùng tối đa bao nhiêu phép so sánh? (Đáp: $\lceil \log_2(10^6) \rceil = 20$. Cụ thể $2^{19} = 524\,288 < 10^6 < 2^{20} = 1\,048\,576$.)
- Nếu thuật toán mỗi bước cắt input còn 1/3 (thay vì 1/2), độ phức tạp là gì? (Đáp: $O(\log_3 n)$ — vẫn $O(\log n)$ vì các log chỉ khác nhau hệ số.)
- Vì sao $O(n \log n)$ được coi là "gần tuyến tính"? (Đáp: tại $n = 10^9$, $\log n \approx 30$ — chỉ chậm hơn $n$ tuyến tính 30 lần, không phải mức "đại nhảy vọt" của $n^2$ hay $2^n$.)

### B.5. Log scale plot — vì sao đôi khi vẽ ở log scale

Dữ liệu **trải nhiều order of magnitude** (vd thu nhập từ 1 nghìn → 1 tỷ, dân số từ 100 → 10 tỷ, tần số âm thanh từ 20 Hz → 20 000 Hz):

- **Linear scale**: số nhỏ "biến mất". 1, 10, 100 ở cạnh $10^9$ thì xem như 0.
- **Log scale**: mỗi tick là một bội cố định (vd 1, 10, 100, 1000, ...). Mọi quy mô đều thấy được.

Cụ thể: vẽ thu nhập 5 người `{1k, 10k, 100k, 1M, 1B}` ở linear scale → 4 cột đầu lùn tịt, cột cuối ngất ngưởng. Ở log scale → 5 cột đều bậc thang, dễ so sánh.

**Khi nào dùng**: data lệch (skewed), phổ tần số, biểu đồ tăng trưởng dài hạn, dây vẽ thuật toán $O(n)$ vs $O(\log n)$ vs $O(n^2)$.

**Quy ước**: trục đánh dấu $10^0, 10^1, 10^2, 10^3, \ldots$; giữa các tick không phải tỷ lệ tuyến tính. Nếu data có giá trị 0 hoặc âm, log scale không vẽ được — phải shift hoặc dùng symlog.

**Minh họa cụ thể** — vẽ thu nhập 5 người ở hai scale:

```
Linear scale (mỗi ký tự = 50M):
1k       | (lùn tịt — không thấy)
10k      | (vẫn lùn — không thấy)
100k     | (vẫn không thấy)
1M       | ▏ (chỉ 1/50 đơn vị, gần như mất)
1B       | ████████████████████ (20 đơn vị = 1B)

Log scale (mỗi ký tự = 1 bậc 10):
1k       | ███ (10³)
10k      | ████ (10⁴)
100k     | █████ (10⁵)
1M       | ██████ (10⁶)
1B       | █████████ (10⁹)
```

Ở linear scale, bốn cột đầu *biến mất* — đẩy cả phân phối về một điểm gần 0. Ở log scale, các cột thành bậc thang đều nhau — dễ so sánh ngay rằng "thu nhập gấp 10 lần" giữa các tầng.

**Hai loại biểu đồ log thường gặp**:

1. **Semi-log** (trục y log, x linear): vẽ tăng trưởng theo thời gian. Đường cong exp $y = e^{kt}$ thành đường thẳng $\log y = k \cdot t + \text{const}$ — dễ ước lượng $k$.
2. **Log-log** (cả hai trục log): vẽ power law $y = x^k$. Thành đường thẳng $\log y = k \cdot \log x$ — slope $= k$, dễ phát hiện power law.

Ví dụ thực tế: Moore's law (số transistor gấp đôi mỗi 2 năm) vẽ semi-log thấy đường thẳng dài 50 năm — bằng chứng exp growth.

### B.6. ⚠ Lỗi thường gặp với exp/log

Bốn cái bẫy mà người mới (và cả người cũ khi vội) hay mắc — đọc kỹ một lần để khỏi mắc lại:

**Lỗi 1: Tính $e^{x+y}$ thành $e^x + e^y$.**

$$\begin{aligned}
\text{SAI:} \quad & e^{x+y} = e^x + e^y \\
\text{ĐÚNG:} \quad & e^{x+y} = e^x \cdot e^y
\end{aligned}$$

Kiểm bằng số cụ thể: $x = 1, y = 1$. $e^{1+1} = e^2 \approx 7.389$. Trong khi $e^1 + e^1 \approx 5.437$ (sai) còn $e^1 \cdot e^1 \approx 7.389$ (đúng). Nhớ quy tắc: "cộng trong mũ → nhân ngoài mũ".

**Lỗi 2: Quên domain $\ln(x)$ chỉ định nghĩa với $x > 0$.**

$$\begin{aligned}
& \ln(0) \to -\infty \quad (\text{không phải số}) \\
& \ln(-3) \to \text{undefined trong số thực}
\end{aligned}$$

Trong code, `math.Log(0) = -Inf` (Go), `math.Log(-1) = NaN`. Hậu quả thực tế: viết cross-entropy $-\sum_i y_i \log(p_i)$, nếu $p_i = 0$ đúng vào class có nhãn $y_i = 1$, loss $= +\infty$ → gradient sập. **Fix**: clamp $p_i = \max(p_i, 10^{-12})$ trước khi $\log$.

**Lỗi 3: Áp dụng quy luật $\log(xy) = \log(x) + \log(y)$ cho $\log(x+y)$.**

$$\begin{aligned}
\text{SAI:} \quad & \log(x + y) = \log(x) + \log(y) \\
\text{ĐÚNG:} \quad & \log(x + y) \;\;\text{— không có công thức gọn, để nguyên!}
\end{aligned}$$

$\log$ biến *tích* thành tổng, không phải *tổng* thành tổng. Kiểm: $\log(2 + 3) = \log(5) \approx 0.699$. $\log(2) + \log(3) \approx 0.301 + 0.477 = 0.778$ ($= \log(6)$, không phải $\log(5)$).

**Lỗi 4: Lẫn lộn $\ln$ và $\log_{10}$.**

Trong sách phổ thông Việt Nam, $\log$ thường $= \log_{10}$. Trong ML/CS paper, $\log$ thường $= \ln$. Cùng ký hiệu nhưng chênh nhau hệ số $\ln 10 \approx 2.303$. Kiểm bằng cách: tính $\log(e)$ — nếu kết quả = 1 thì là $\ln$, nếu $\approx 0.4343$ thì là $\log_{10}$.

**Lỗi 5 (bonus): Áp $e^x$ cho $x$ lớn không trừ max — overflow.**

$e^{1000}$ vượt `float64` max ($\approx 1.8 \cdot 10^{308}$) → `+Inf`, sau đó `Inf/Inf = NaN`. Xảy ra trong softmax nếu logit rộng (vd LM head 50k tokens, logit có thể đạt 30-50). **Fix**: luôn trừ $\max(\text{logits})$ trước khi exp (xem C.3.b).

**🔁 Dừng lại tự kiểm tra**:
- $e^3 \cdot e^4 = ?$ (Đáp: $e^7$, vì cộng số mũ.)
- $\ln(e^5 \cdot e^2) = ?$ (Đáp: 7, vì $\ln(e^7) = 7$.)
- Cho $p = 0.0001$, viết $-\log(p)$ ra số. (Đáp: $-\log(10^{-4}) \approx 9.21$ nếu là $\ln$, hoặc $4$ nếu là $\log_{10}$. Đa số ML dùng $\ln$ → 9.21.)

### B.7. 💡 Trực giác — exp và log trong đời sống

**Exp = "tăng theo cấp số nhân"** — chuỗi nhân lên đều đặn.

Ví dụ đời sống thấy được ngay:
- **Lan truyền dịch**: nếu mỗi người nhiễm lây cho trung bình $R = 2$ người khác trong 1 chu kỳ, sau 10 chu kỳ số ca $= 1 \cdot 2^{10} = 1\,024$. Sau 20 chu kỳ $\approx 10^6$ (1 triệu). Đó là vì sao "ca đầu tiên" và "đợt sóng đầu tiên" cách nhau vài tuần là chuyện thường — đường cong exp bằng phẳng ở đầu rồi vọt lên.
- **Subscriber kênh YouTube**: tuần đầu 100 sub, mỗi tuần tăng 10%. Sau 1 năm (52 tuần): $100 \cdot 1.1^{52} \approx 100 \cdot 142 \approx 14\,200$. Sau 2 năm: $100 \cdot 1.1^{104} \approx 2\,030\,000$. Đó là vì sao "kênh nhỏ" và "kênh triệu sub" chỉ cách nhau 2 năm — nếu duy trì được growth rate.
- **Lãi kép cá nhân**: gửi 100 triệu, lãi 7%/năm (gộp). Sau 30 năm: $100 \cdot 1.07^{30} \approx 761$ triệu. Sau 60 năm (cả đời): $100 \cdot 1.07^{60} \approx 5.79$ tỷ. Đó là vì sao Buffett bắt đầu đầu tư từ 10 tuổi — *thời gian là vũ khí của exp*.

Trong mọi ví dụ trên, đường cong giai đoạn đầu nhìn như "không có gì" (flat), rồi đột ngột vọt lên. Đó là đặc trưng của exp — đừng nhầm "flat ban đầu" là "không tăng trưởng".

**Log = "đếm số chữ số"** — chính xác hơn là "đếm bậc/độ lớn".

Ví dụ:
- Số `1 000 000` có 7 chữ số. $\log_{10}(1\,000\,000) = 6$. Tức $\log_{10}(N) = $ (số chữ số của $N$) $- 1$. Tổng quát: số chữ số của $N$ (trong cơ số 10) $= \lfloor \log_{10}(N) \rfloor + 1$.
- Mật khẩu 12 ký tự (mỗi ký tự 95 lựa chọn): không gian $= 95^{12} \approx 5.4 \cdot 10^{23}$. Để đoán brute force, cần thử trung bình một nửa số đó. Số bit entropy $= \log_2(95^{12}) \approx 12 \cdot \log_2(95) \approx 12 \cdot 6.57 \approx 79$ bit. Tức "cần 79 bit thông tin để chỉ định password này".
- Tiếng động: $\text{dB} = 10 \cdot \log_{10}(I / I_0)$. Vì sao dùng log? Vì tai người cảm nhận **tỷ lệ** chứ không phải hiệu chênh. Tăng từ 60 dB → 70 dB (gấp 10 lần cường độ) thấy "to gấp đôi" — tỷ lệ chứ không phải cộng.

Trực giác chung: **log nén những con số khổng lồ về thang nhỏ con người hiểu được**. Từ $1$ tới $1$ tỷ là $10^9$ lần — quá khổng lồ. Lấy $\log_{10}$ xuống thành $0 \to 9$ — trực giác bắt được liền.

**Cặp đôi exp/log = "phóng to/thu nhỏ" giữa hai thế giới**:
- Thế giới gốc: addition và multiplication.
- Thế giới log: multiplication trở thành addition ($\log(xy) = \log x + \log y$), exponentiation trở thành multiplication ($\log(x^k) = k \log x$).
- Log giúp người (và máy tính) làm việc với số khổng lồ bằng cách dịch về thang nhỏ. Exp đưa kết quả trở lại thang gốc.

**🔁 Dừng lại tự kiểm tra**:
- Một file 4GB có khoảng bao nhiêu bit? (Đáp: $4 \cdot 10^9 \cdot 8 \approx 3.2 \cdot 10^{10}$ bit. Số chữ số $= \log_{10}(3.2 \cdot 10^{10}) \approx 10$ → 11 chữ số.)
- Nếu mỗi ngày tài khoản của bạn tăng 1%, sau bao lâu nhân đôi? (Áp dụng $1.01^t = 2$ → $t = \ln 2 / \ln 1.01 \approx 0.693 / 0.00995 \approx 69.7$ ngày. Quy tắc "70" trong tài chính: $70/r = $ thời gian double với lãi $r\%$.)
- Vì sao quy tắc 70 lại là 70 mà không phải 100? (Đáp: vì $\ln 2 \approx 0.693 \approx 0.70$. Quy tắc 70 là approximation của $\ln 2 / r$.)

---

## PHẦN C — Mối quan hệ và ứng dụng ML

### C.1. eˣ và ln x là hàm ngược

$$\begin{aligned}
e^{\ln x} &= x \quad (\text{với } x > 0) \\
\ln(e^x) &= x \quad (\text{với mọi } x \in \mathbb{R})
\end{aligned}$$

Đây không phải mẹo — đây là định nghĩa: $\ln$ được dựng ra để là hàm ngược của $e^x$.

Hệ quả thường dùng: chuyển nhân thành cộng, mũ thành nhân.

$$\begin{aligned}
\ln(a \cdot b) &= \ln a + \ln b \\
\ln(a^b) &= b \cdot \ln a \\
e^{a + b} &= e^a \cdot e^b \\
e^{a \cdot b} &= (e^a)^b
\end{aligned}$$

**Ứng dụng trong ML**: log-likelihood. Nếu xác suất quan sát $n$ mẫu độc lập là tích $p_1 \cdot p_2 \cdots p_n$ — số rất nhỏ (vd $10^{-300}$), máy tính underflow về 0. Lấy log:

$$\log(p_1 \cdot p_2 \cdots p_n) = \log p_1 + \log p_2 + \cdots + \log p_n$$

Tổng các log là số âm vừa phải (vd -700), tính được trơn tru. Mọi MLE / Bayesian inference thực tế đều làm trong log-space.

### C.2. Đạo hàm — giới thiệu, chi tiết ở Tầng 3 Calculus

$$\begin{aligned}
(e^x)' &= e^x && (\text{đạo hàm chính nó — duy nhất } e \text{ mới có}) \\
(\ln x)' &= \frac{1}{x} && (\text{với } x > 0) \\
(a^x)' &= a^x \cdot \ln a \\
(\log_a x)' &= \frac{1}{x \cdot \ln a}
\end{aligned}$$

Quan sát: $(\ln x)' = 1/x$ — đạo hàm ra một hàm "đơn giản hơn" $\ln$. Chính vì vậy $\ln$ xuất hiện ở mọi nơi: bất kỳ khi nào cần tính $\int \frac{1}{x}\, dx$, ra $\ln |x|$.

### C.3. Vì sao ML dùng e / ln nhiều

**(a) Sigmoid và logistic regression**

$$\sigma(x) = \frac{1}{1 + e^{-x}}$$

Đạo hàm có dạng cực gọn:

$$\sigma'(x) = \sigma(x) \cdot (1 - \sigma(x))$$

Không cần tính lại từ đầu — chỉ cần giá trị $\sigma(x)$ hiện có là ra đạo hàm. Đây là vì sao logistic regression train được hiệu quả bằng gradient descent.

**Walk-through từng bước — sigmoid trông như thế nào?**

Tính bằng số cho 5 điểm tiêu biểu:

| $x$ | $e^{-x}$ | $1 + e^{-x}$ | $\sigma(x) = \dfrac{1}{1+e^{-x}}$ |
|---:|---:|---:|---:|
| -5 | 148.41 | 149.41 | **0.00669** |
| -2 | 7.389 | 8.389 | **0.11920** |
| 0 | 1 | 2 | **0.50000** |
| 2 | 0.1353 | 1.1353 | **0.88080** |
| 5 | 0.00674 | 1.00674 | **0.99331** |

Vẽ ASCII đồ thị sigmoid (trục y từ 0 đến 1, mỗi `█` ≈ 0.05):

```
   x  |  σ(x)    | bar (0 ────────────────── 1)
  ----|----------|------------------------------
  -5  | 0.0067   | ▏                           |
  -4  | 0.0180   | ▎                           |
  -3  | 0.0474   | █                           |
  -2  | 0.1192   | ██▍                         |
  -1  | 0.2689   | █████▍                      |
   0  | 0.5000   | ██████████                  |
   1  | 0.7311   | ██████████████▌             |
   2  | 0.8808   | █████████████████▌          |
   3  | 0.9526   | ███████████████████         |
   4  | 0.9820   | ███████████████████▋        |
   5  | 0.9933   | ███████████████████▊        |
```

**Vì sao gọi là "S-shape"?**

Đồ thị có 3 đặc điểm hình S:
- **Asymptote dưới**: khi $x \to -\infty$, $e^{-x} \to +\infty$ nên $\sigma(x) \to 1/\infty = 0$. Sàn = 0 (không bao giờ chạm).
- **Asymptote trên**: khi $x \to +\infty$, $e^{-x} \to 0$ nên $\sigma(x) \to 1/1 = 1$. Trần = 1 (không bao giờ chạm).
- **Điểm giữa**: tại $x = 0$, $\sigma(0) = 1/(1+1) = 0.5$. Đường cong đi qua đúng giữa, đối xứng tâm.

Hình dung: hai đường ngang $y = 0$ và $y = 1$, đường cong "bơi" từ trái sang phải, mượt và tăng đơn điệu, đi qua $(0, 0.5)$. Khúc giữa $x \in [-2, 2]$ dốc; ngoài $x \in (-\infty, -5) \cup (5, +\infty)$ gần như nằm ngang. Đó là chữ "S" nằm ngang.

**Ứng dụng — logistic regression**

Tại sao squash bất kỳ số thực về $(0, 1)$? Vì ta muốn output là **xác suất** — phải nằm trong $[0, 1]$. Linear regression cho ra số thực bất kỳ ($-\infty$ tới $+\infty$). Bọc thêm sigmoid → output luôn là xác suất hợp lệ.

**Walk-through cụ thể** — model dự đoán "khả năng email là spam":

1. Linear layer cho logit $z = w \cdot x + b = 2.5$ (số thực, không có ý nghĩa xác suất trực tiếp).
2. Áp sigmoid: $\sigma(2.5) = \dfrac{1}{1 + e^{-2.5}} = \dfrac{1}{1 + 0.0821} = \dfrac{1}{1.0821} \approx 0.924$.
3. Diễn dịch: model dự đoán email này là spam với **xác suất 92.4%**.

Nếu logit $z = -1.2$: $\sigma(-1.2) = \dfrac{1}{1+e^{1.2}} = \dfrac{1}{1+3.32} \approx 0.231$ → "23.1% spam, 76.9% ham".

Quy tắc thực dụng:
- $z = 0$ → $\sigma = 0.5$ (model phân vân).
- $z > 0$ → $\sigma > 0.5$ (nghiêng về "yes").
- $z < 0$ → $\sigma < 0.5$ (nghiêng về "no").
- $|z| > 5$ → gần như chắc chắn ($\sigma \approx 0.99$ hoặc $0.01$).

**🔁 Dừng lại tự kiểm tra**:
- $\sigma(3) = ?$ (gợi ý: $e^{-3} \approx 0.0498$, $\sigma(3) \approx 1/1.0498 \approx 0.953$.)
- Nếu logit dương rất lớn (vd $z = 100$), $\sigma(z) \approx ?$ (Đáp: $\approx 1$. $e^{-100} \approx 0$ nên $\sigma \approx 1/1 = 1$. Cảnh báo: số trong code thường rơi vào `1.0` chứ không phải `0.99999...` — mất precision.)
- Kiểm chứng $\sigma'(0)$: theo công thức $\sigma(0) \cdot (1-\sigma(0)) = 0.5 \cdot 0.5 = 0.25$ — đây là độ dốc max của sigmoid (tại $x=0$).

**(b) Softmax — phân loại nhiều lớp**

Với vector logit $(z_1, z_2, \ldots, z_K)$:

$$\text{softmax}(z_i) = \frac{e^{z_i}}{\sum_j e^{z_j}}$$

Tính chất:
- Mỗi $\text{softmax}(z_i) \in (0, 1)$ (vì exponential dương, mẫu là tổng dương lớn hơn tử).
- $\sum_i \text{softmax}(z_i) = 1$ (mẫu chính là tổng tử).
- → Là phân phối xác suất hợp lệ.

**Walk-through chi tiết — softmax với logits $[2, 1, 0]$**:

*Bước 1: tính exponential từng phần tử.*

$$\begin{aligned}
e^2 &= 7.389 \\
e^1 &= 2.718 \\
e^0 &= 1.000
\end{aligned}$$

*Bước 2: tính tổng (denominator).*

$$\text{sum} = 7.389 + 2.718 + 1.000 = 11.107$$

*Bước 3: chia từng exp cho tổng.*

$$\begin{aligned}
\text{softmax}[0] &= 7.389 / 11.107 \approx 0.665 \\
\text{softmax}[1] &= 2.718 / 11.107 \approx 0.245 \\
\text{softmax}[2] &= 1.000 / 11.107 \approx 0.090
\end{aligned}$$

*Kiểm tra*: tổng $= 0.665 + 0.245 + 0.090 = 1.000$ ✓. Mỗi phần tử $\in (0, 1)$ ✓. Phân phối xác suất hợp lệ.

Diễn dịch: model "tin" class 0 với 66.5%, class 1 với 24.5%, class 2 với 9.0%. Logit chênh nhau 1 đơn vị (2→1→0) → xác suất chênh nhau hệ số $e \approx 2.72$ lần ($0.665 / 0.245 \approx 2.72$, $0.245 / 0.090 \approx 2.72$). Đó là quy luật quan trọng của softmax: **mỗi đơn vị logit = nhân/chia xác suất tỷ đối cho $e$**.

**Lưu ý ổn định số** — đây là pattern phải nhớ: nếu $z_i$ lớn (vd 1000), $e^{1000}$ overflow → NaN. Trick: trừ max trước:

$$\begin{aligned}
m &= \max(z) \\
\text{softmax}(z_i) &= \frac{e^{z_i - m}}{\sum_j e^{z_j - m}}
\end{aligned}$$

Kết quả không đổi (do cả tử/mẫu cùng chia $e^m$) nhưng mọi $z_i - m \leq 0$, exponential nằm trong $(0, 1]$, không overflow.

**Walk-through trick trừ max** — vẫn $\text{logits} = [2, 1, 0]$:

*Bước 1: tìm max.* $m = 2$.

*Bước 2: trừ max.* $[2, 1, 0] - 2 = [0, -1, -2]$.

*Bước 3: tính exp.*

$$\begin{aligned}
e^0 &= 1.000 \\
e^{-1} &= 0.368 \\
e^{-2} &= 0.135
\end{aligned}$$

Mọi giá trị giờ $\in (0, 1]$, không overflow.

*Bước 4: tổng.* $1.000 + 0.368 + 0.135 = 1.503$.

*Bước 5: chia.*

$$\begin{aligned}
\text{softmax}[0] &= 1.000 / 1.503 \approx 0.665 \\
\text{softmax}[1] &= 0.368 / 1.503 \approx 0.245 \\
\text{softmax}[2] &= 0.135 / 1.503 \approx 0.090
\end{aligned}$$

**Cùng kết quả** với cách thẳng ở trên ✓.

**Tại sao trừ max OK về mặt toán?**

Tổng quát: $\text{softmax}(z) = \text{softmax}(z + c)$ với mọi hằng số $c$ áp dụng cho mọi phần tử. Chứng minh:

$$\begin{aligned}
\text{softmax}(z_i + c) &= \frac{e^{z_i + c}}{\sum_j e^{z_j + c}} \\
&= \frac{e^c \cdot e^{z_i}}{e^c \cdot \sum_j e^{z_j}} \\
&= \frac{e^{z_i}}{\sum_j e^{z_j}} \\
&= \text{softmax}(z_i)
\end{aligned}$$

$e^c$ ở tử và mẫu triệt tiêu. Chọn $c = -\max(z)$ để mọi $z_i + c \leq 0$, exp luôn $\leq 1$, đảm bảo không overflow. Đây là pattern bắt buộc trong mọi implementation softmax thực tế (PyTorch, TensorFlow, JAX đều làm thế).

**Trường hợp cực đoan**: nếu logits $= [1000, 999, 998]$, không trừ max thì $e^{1000} = \text{Inf}$ → kết quả `NaN`. Trừ max → $[0, -1, -2]$ → vẫn ra $[0.665, 0.245, 0.090]$ đẹp đẽ.

**🔁 Dừng lại tự kiểm tra**:
- Nếu mọi logit bằng nhau (vd $[5, 5, 5]$), softmax ra gì? (Đáp: $[1/3, 1/3, 1/3]$ — uniform distribution, model "không biết".)
- Nếu logits $[10, 0, 0]$, softmax xấp xỉ gì? (Đáp: $e^{10} \approx 22\,026$, hai cái còn lại = 1. Tổng $\approx 22\,028$. softmax $\approx [0.9999, 4.5 \cdot 10^{-5}, 4.5 \cdot 10^{-5}]$ — model "rất chắc class 0".)
- Vì sao output cuối cùng có thể không tổng đúng $1.0$ mà chỉ $\approx 1.0$ (vd $0.99998$)? (Đáp: do làm tròn float — $1.5032$ chỉ là 4 chữ số. Trong float64 chính xác hơn nhưng vẫn có lỗi $\approx 10^{-16}$.)

**(c) Cross-entropy loss** — kết nối log và xác suất

Với phân loại $K$ lớp, ground truth one-hot $y$ và dự đoán $p$ (qua softmax):

$$H(y, p) = - \sum_i y_i \cdot \log(p_i)$$

Trong đó $y = (y_1, y_2, \ldots, y_K)$ là **one-hot label** — vector toàn 0 trừ đúng một vị trí = 1, đó là class đúng.

Nếu $y$ one-hot — chỉ một $y_i = 1$, còn lại = 0 — thì:

$$H(y, p) = - \log(p_{\text{correct}})$$

Tức **chỉ phụ thuộc xác suất model gán cho class đúng**.

**Walk-through cụ thể** — tiếp tục ví dụ softmax $\text{logits} = [2, 1, 0]$ → $p = [0.665, 0.245, 0.090]$.

*Trường hợp 1: true label = class 0* (model dự đoán đúng class top).

$y = [1, 0, 0]$. Cross-entropy:

$$\begin{aligned}
H &= -(1 \cdot \log(0.665) + 0 \cdot \log(0.245) + 0 \cdot \log(0.090)) \\
&= -\log(0.665) \\
&= -(-0.408) \\
&= 0.408
\end{aligned}$$

Loss $= 0.408$ — không tệ nhưng chưa lý tưởng. Model có "nghi ngờ" class 1 (xác suất 24.5%).

*Trường hợp 2: model rất chắc và đúng.*

Giả sử $p = [0.99, 0.005, 0.005]$, $y = [1, 0, 0]$:

$$H = -\log(0.99) \approx -(-0.01005) \approx 0.01$$

Loss $= 0.01$ — rất nhỏ. Model "tự tin đúng" → phần thưởng (loss thấp).

*Trường hợp 3: model rất chắc nhưng sai.*

$p = [0.005, 0.005, 0.99]$, $y = [1, 0, 0]$ (true là class 0 nhưng model gán 99% cho class 2):

$$H = -\log(0.005) \approx -(-5.298) \approx 5.30$$

Loss $= 5.30$ — lớn gấp $\approx 530$ lần trường hợp đúng. Model "tự tin sai" bị phạt cực gắt.

*Trường hợp 4: model phân vân (uniform).*

$p = [1/3, 1/3, 1/3]$, $y = [1, 0, 0]$:

$$H = -\log(1/3) = \log(3) \approx 1.099$$

Loss $= 1.099$ — đây là baseline "model đoán mò" cho 3 lớp. Nói chung baseline $= \log(K)$ với $K$ lớp.

*Trường hợp 5: model tự tin sai 100%.*

$p = [0, 0, 1]$ (model gán 0% cho class đúng), $y = [1, 0, 0]$:

$$H = -\log(0) = +\infty$$

Loss = vô cực — đây là vì sao trong code phải clamp $p \geq 10^{-12}$ trước khi $\log$. Nếu không, một sample sai cũng đẩy training run sụp đổ với gradient `Inf/NaN`.

**Tóm lược hành vi cross-entropy**:

| Xác suất $p$ model gán cho class đúng | Cross-entropy loss |
|---:|---:|
| 1.0 (chắc + đúng) | 0 |
| 0.99 | 0.01 |
| 0.9 | 0.105 |
| 0.5 | 0.693 |
| $1/K$ (đoán mò $K$ lớp) | $\log(K)$ |
| 0.01 | 4.605 |
| 0.001 | 6.908 |
| 0 | $+\infty$ |

**Trực giác**: cross-entropy "đo độ ngạc nhiên" — nếu model gán xác suất cao cho điều thật sự xảy ra, không bị "ngạc nhiên" (loss nhỏ). Nếu gán xác suất thấp, "ngạc nhiên lớn" (loss cao). Sẽ học sâu ở Tầng 5 (Information Theory).

**(d) Entropy, KL divergence** — nền của information theory:

$$\begin{aligned}
H(p) &= - \sum_i p_i \cdot \log(p_i) && (\text{entropy của phân phối } p) \\
\text{KL}(p \,\|\, q) &= \sum_i p_i \cdot \log\!\left(\frac{p_i}{q_i}\right) && (\text{khoảng cách Kullback-Leibler})
\end{aligned}$$

$\log$ ở đây vẫn là $\ln$ (hoặc $\log_2$ nếu đo bằng bit). Lý do dùng log: nó biến tích thành tổng (giả thiết độc lập → entropy cộng được).

---

## Tóm tắt — những gì cần nhớ sau bài này

**1. Hàm mũ $a^x$ — tăng khủng khiếp nhanh.**
- Biến nằm ở số mũ, cơ số cố định.
- $a > 1$ → tăng nghiêm ngặt, luôn dương, đi qua $(0, 1)$.
- Thắng mọi polynomial khi $x$ đủ lớn.
- Truyền thuyết hạt thóc bàn cờ minh họa sức mạnh exp.

**2. $e \approx 2.71828$ đặc biệt vì:**
- Là cơ số duy nhất mà $(e^x)' = e^x$ (đạo hàm = chính nó).
- Xuất hiện tự nhiên từ lãi kép liên tục: $\left(1 + \frac{1}{n}\right)^n \to e$.
- Mọi công thức ML viết bằng $\ln$ ($= \log_e$) để đạo hàm gọn.

**3. Hàm log $\log_a(x)$ = ngược của $a^x$:**
- Domain $x > 0$, range $\mathbb{R}$.
- Tăng cực chậm — $\log_2(1 \text{ tỷ}) \approx 30$.
- Là nền của $O(\log n)$ trong CS (binary search, balanced tree).

**4. Tốc độ tăng (chậm → nhanh):**

$$\log x \;<\; x \;<\; x \log x \;<\; x^2 \;<\; x^3 \;<\; 2^x \;<\; e^x$$

**5. Sigmoid $\sigma(x) = \dfrac{1}{1+e^{-x}}$:**
- Squash số thực bất kỳ → $(0, 1)$.
- S-shape: asymptote 0 và 1, qua $(0, 0.5)$.
- Dùng cho logistic regression — diễn dịch output thành xác suất.
- Đạo hàm gọn: $\sigma' = \sigma(1-\sigma)$.

**6. Softmax — chuẩn hóa vector logit thành phân phối xác suất:**
- $\text{softmax}(z_i) = \dfrac{e^{z_i}}{\sum_j e^{z_j}}$.
- Mỗi phần tử $\in (0, 1)$, tổng = 1.
- **Luôn trừ max trước khi exp** để tránh overflow.
- Logit chênh 1 đơn vị → xác suất tỷ đối chênh $e \approx 2.72$ lần.

**7. Cross-entropy $H(y, p) = -\sum_i y_i \log(p_i)$:**
- Với $y$ one-hot, rút gọn thành $-\log(p_{\text{correct}})$.
- Model tự tin đúng → loss nhỏ. Tự tin sai → loss khổng lồ.
- Phải clamp $p \geq 10^{-12}$ để tránh $\log(0) = -\infty$.

**8. Bốn cái bẫy phải tránh:**
- $e^{x+y} \neq e^x + e^y$ (đúng: $e^x \cdot e^y$).
- $\ln(x)$ chỉ định nghĩa với $x > 0$.
- $\log(x+y) \neq \log x + \log y$.
- Lẫn lộn $\ln$ ($= \log_e$) và $\log_{10}$ — paper ML mặc định là $\ln$.

**9. Trực giác đời sống:**
- Exp = "tăng theo cấp số nhân" (dịch bệnh, subscriber, lãi kép).
- Log = "đếm độ lớn" (số chữ số, entropy bit, dB, pH).
- Cặp đôi exp/log = phóng to/thu nhỏ giữa hai thang đo.

**10. Lý do ML dùng $e$/$\ln$ khắp nơi:**
- Đạo hàm gọn ($(e^x)' = e^x$, $(\ln x)' = 1/x$).
- Xuất hiện tự nhiên trong xác suất (Gaussian, Poisson, Exponential).
- Biến tích thành tổng (log-likelihood) → tránh underflow trên máy.

---

## Bài tập

### Bài 1 — Giá trị cơ bản

Tính (ước lượng nếu cần): $e^0$, $e^1$, $e^2$, $\ln(1)$, $\ln(e)$, $\ln(e^5)$, $\ln(0)$.

### Bài 2 — Sắp xếp tốc độ tăng

Tại $x = 20$, sắp xếp các giá trị sau theo thứ tự **tăng dần**:

$20$, $20^2$, $2^{20}$, $e^{20}$, $20 \cdot \ln(20)$, $\log_2(20)$.

### Bài 3 — Sigmoid

Cho $\sigma(x) = \dfrac{1}{1 + e^{-x}}$. Tính (làm tròn 4 chữ số):

$\sigma(0)$, $\sigma(1)$, $\sigma(-1)$, $\sigma(10)$, $\sigma(-10)$.

Range của sigmoid là gì? Sigmoid có đối xứng qua điểm nào không?

### Bài 4 — Softmax 3 lớp

Cho $\text{logits} = [2, 1, 0]$. Tính $\text{softmax}(\text{logits})$ — ba xác suất. Tổng = ? Lớp nào xác suất cao nhất?

### Bài 5 — Lãi kép

Gửi $P = 100$ triệu, lãi $r = 5\%$/năm. Tính số tiền sau 1, 5, 10, 30 năm theo hai công thức:

- Discrete (gộp 1 lần/năm): $A = P \cdot (1 + r)^t$
- Continuous: $A = P \cdot e^{rt}$

So sánh hai kết quả tại $t = 30$.

### Bài 6 — Code Go

Viết các hàm:

1. `sigmoid(x float64) float64`.
2. `softmax(logits []float64) []float64` — implementation **ổn định số** bằng cách trừ max.
3. Demo: sinh 1000 datapoint (mỗi datapoint là 3 logit float ngẫu nhiên trong `[-10, 10]`). Áp softmax cho từng datapoint. In min/max của tất cả giá trị softmax và kiểm tra tổng từng vector = 1 (sai số ≤ `1e-9`). In min/max của `sigmoid` áp lên 1000 input ngẫu nhiên.

---

## Lời giải chi tiết

### Lời giải bài 1

| Biểu thức | Giá trị | Lý do |
|---|---|---|
| $e^0$ | 1 | mọi cơ số mũ 0 đều = 1 |
| $e^1$ | $e \approx 2.71828$ | định nghĩa |
| $e^2$ | $\approx 7.389$ | $e \cdot e \approx 2.718^2$ |
| $\ln(1)$ | 0 | $e^0 = 1$ |
| $\ln(e)$ | 1 | $e^1 = e$ |
| $\ln(e^5)$ | 5 | $\ln(e^x) = x$ (hàm ngược) |
| $\ln(0)$ | **undefined** ($\to -\infty$) | không tồn tại $y$ nào để $e^y = 0$; khi $x \to 0^+$ thì $\ln x \to -\infty$ |

Lưu ý $\ln(0)$ không phải số — trong code Go, `math.Log(0) = -Inf`. Tránh truyền 0 hoặc số âm vào $\ln$ trong tính toán thực tế (vd cross-entropy: phải clamp xác suất tối thiểu là $10^{-12}$).

### Lời giải bài 2

Tính từng giá trị tại $x = 20$:

| Biểu thức | Giá trị |
|---|---|
| $\log_2(20)$ | $\approx 4.32$ |
| $20$ | 20 |
| $20 \cdot \ln(20)$ | $20 \cdot 2.996 \approx 59.91$ |
| $20^2$ | 400 |
| $2^{20}$ | $1\,048\,576$ ($\approx 10^6$) |
| $e^{20}$ | $\approx 4.85 \cdot 10^8$ |

**Thứ tự tăng dần**: $\log_2(20) < 20 < 20 \cdot \ln(20) < 20^2 < 2^{20} < e^{20}$.

Quan sát: tại $x = 20$, $e^x$ đã thắng $2^x$ khoảng ~463 lần — chỉ vì cơ số $e \approx 2.72 > 2$, và khoảng cách bị mũ hóa lên.

### Lời giải bài 3

$\sigma(x) = \dfrac{1}{1 + e^{-x}}$:

| $x$ | $e^{-x}$ | $\sigma(x)$ |
|---|---|---|
| 0 | 1 | $1/2 =$ **0.5** |
| 1 | 0.368 | $1/1.368 \approx$ **0.7311** |
| -1 | 2.718 | $1/3.718 \approx$ **0.2689** |
| 10 | $\approx 4.54 \cdot 10^{-5}$ | $\approx$ **0.99995** |
| -10 | $\approx 22\,026$ | $\approx$ **0.0000454** |

**Range**: $(0, 1)$ — không bao giờ đạt 0 hay 1 chính xác (chỉ tiệm cận).

**Đối xứng**: qua điểm $(0, 0.5)$. Cụ thể $\sigma(-x) = 1 - \sigma(x)$. Kiểm: $\sigma(1) + \sigma(-1) = 0.7311 + 0.2689 = 1$. ✓

### Lời giải bài 4

$\text{logits} = [2, 1, 0]$. Để ổn định số, trừ max = 2:

$$\begin{aligned}
\text{adjusted} &= [0, -1, -2] \\
\text{exps} &= [e^0, e^{-1}, e^{-2}] = [1,\ 0.3679,\ 0.1353] \\
\text{sum} &= 1 + 0.3679 + 0.1353 = 1.5032 \\
\text{softmax} &= [1/1.5032,\ 0.3679/1.5032,\ 0.1353/1.5032] \\
&= [0.6652,\ 0.2447,\ 0.0900]
\end{aligned}$$

- Tổng $= 0.6652 + 0.2447 + 0.0900 = 0.9999 \approx 1$ ✓ (chênh 0.0001 do làm tròn).
- Lớp 0 (logit 2) xác suất cao nhất.

Quan sát: logit chênh nhau 1 đơn vị, xác suất tương ứng chênh nhau hệ số $e \approx 2.72$ lần. Đó là "small logit difference = big probability difference" của softmax.

### Lời giải bài 5

$P = 100$, $r = 0.05$.

| $t$ (năm) | Discrete $100 \cdot 1.05^t$ | Continuous $100 \cdot e^{0.05t}$ | Chênh |
|---|---|---|---|
| 1 | 105.00 | $100 \cdot e^{0.05} \approx 105.13$ | 0.13 |
| 5 | $100 \cdot 1.05^5 \approx 127.63$ | $100 \cdot e^{0.25} \approx 128.40$ | 0.78 |
| 10 | $100 \cdot 1.05^{10} \approx 162.89$ | $100 \cdot e^{0.5} \approx 164.87$ | 1.98 |
| 30 | $100 \cdot 1.05^{30} \approx 432.19$ | $100 \cdot e^{1.5} \approx 448.17$ | 15.98 |

Continuous luôn lớn hơn discrete (lãi gộp dày hơn). Chênh càng tăng theo $t$ và $r$. Tỷ lệ: $e^r / (1 + r) \approx e^{0.05} / 1.05 \approx 1.00127$ mỗi năm — tức continuous nhanh hơn ~0.127%/năm.

### Lời giải bài 6

Xem file [solutions.go](./solutions.go). Tóm tắt approach:

**`sigmoid`**: tính trực tiếp, nhưng dùng `math.Exp` cẩn thận. Với $x$ rất âm, $e^{-x}$ overflow → trả về 0; thực tế Go xử lý hợp lý (`Inf`, rồi `1/(1+Inf) = 0`), nhưng nên kiểm.

**`softmax` ổn định số**:
1. Tìm $m = \max(\text{logits})$.
2. Tính $\exp(z_i - m)$ cho từng phần tử (mọi giá trị này nằm trong $(0, 1]$).
3. Tổng các giá trị đó.
4. Chia mỗi cái cho tổng.

Vì sao trừ max được phép: $\dfrac{e^{z_i}}{\sum_j e^{z_j}} = \dfrac{e^{z_i}/e^m}{\sum_j e^{z_j}/e^m} = \dfrac{e^{z_i - m}}{\sum_j e^{z_j - m}}$. Cùng giá trị, tránh overflow.

**Độ phức tạp**: `softmax` $O(K)$ ($K$ = số lớp). Sigmoid $O(1)$.

**Kết quả demo** (sẽ in ra khi chạy `go run solutions.go`):
- Min/max sigmoid áp lên 1000 input random $\in [-10, 10]$: gần $(0, 1)$.
- Mọi tổng softmax 3-vector: $1.0 \pm 10^{-12}$.

---

## Tiếp theo

- File code: [solutions.go](./solutions.go)
- Minh họa tương tác: [visualization.html](./visualization.html)
- Bài trước: [Lesson 06 — Hàm bậc 1 và bậc 2](../lesson-06-linear-quadratic/)
- Bài sau: [Lesson 08 — Hệ phương trình tuyến tính](../lesson-08-linear-systems/)
- Quay lại lộ trình Algebra: [Tầng 1 Algebra](../)
