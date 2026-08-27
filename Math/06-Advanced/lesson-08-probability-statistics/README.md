# Lesson 08 — Xác suất & Thống kê

## Mục tiêu

- Hiểu **xác suất**: định nghĩa, tính chất, công thức Bayes.
- **Biến ngẫu nhiên**, kỳ vọng, phương sai.
- **Phân phối quan trọng**: nhị thức, chuẩn (normal), Poisson.
- Thống kê mô tả: trung bình, độ lệch chuẩn.

## Kiến thức tiền đề

- [T5 L03 — Tổ hợp](../../05-NumberTheory-Combinatorics-Logic/lesson-03-permutations-combinations/), [T6 L05 — Tích phân](../lesson-05-multiple-integrals/).

---

## 1. Xác suất — Khái niệm cơ bản

💡 **Trực giác / Hình dung**: xác suất = **tỉ lệ dài hạn**. Tung xúc xắc 1 lần không đoán được, nhưng tung 6000 lần thì mặt 6 xuất hiện $\sim 1000$ lần → tỉ lệ $\sim 1/6$. $P(A)$ = "phần thưởng kỳ vọng nếu lặp lại vô số lần". Với kết quả đều khả năng, $P$ = đếm trường hợp thuận lợi / tổng trường hợp.

**Định nghĩa cổ điển**: $P(A)$ = số kết quả thuận lợi / tổng số kết quả (đều khả năng).

**4 ví dụ số đa dạng** (tung 1 xúc xắc):
- $P(\text{ra } 6) = 1/6 \approx 0.167$.
- $P(\text{ra số chẵn}) = 3/6 = \mathbf{1/2}$ (mặt 2,4,6).
- $P(\text{ra} \le 4) = 4/6 = \mathbf{2/3}$.
- $P(\text{ra } 7) = 0/6 = \mathbf{0}$ (biến cố bất khả thi); $P(\text{ra} \le 6) = 6/6 = \mathbf{1}$ (chắc chắn).

### Tính chất

- $0 \le P(A) \le 1$.
- $P(\varnothing) = 0$, $P(\Omega) = 1$.
- $P(A \cup B) = P(A) + P(B) - P(A \cap B)$.
- $P(A^c) = 1 - P(A)$.

### Xác suất có điều kiện

$$P(A \mid B) = \frac{P(A \cap B)}{P(B)}$$

"Xác suất A xảy ra biết rằng B đã xảy ra."

**Ví dụ**: Tung 2 xúc xắc, biết tổng là 7. Xác suất 1 con ra 6?
- $B = \{\text{tổng} = 7\} = \{(1,6), (2,5), (3,4), (4,3), (5,2), (6,1)\}$. $|B| = 6$.
- $A \cap B = \{(1,6), (6,1)\}$. $|A\cap B| = 2$.
- $P(A\mid B) = 2/6 = \mathbf{1/3}$.

### Định lý Bayes

$$P(A \mid B) = \frac{P(B \mid A)\cdot P(A)}{P(B)}$$

⟶ Cốt lõi của AI, ML, học máy "Naïve Bayes Classifier".

> 📐 **Định nghĩa đầy đủ — Định lý Bayes**
>
> **(a) Là gì**: 1 công thức để **đảo ngược** xác suất có điều kiện. Cho $P(B\mid A)$, tính $P(A\mid B)$. Công thức: $P(A\mid B) = P(B\mid A)\cdot P(A)/P(B)$. Diễn dịch: $P(A)$ là **prior** (xác suất ban đầu A), $P(B\mid A)$ là **likelihood** (B có khả năng xảy ra khi A đúng), $P(A\mid B)$ là **posterior** (cập nhật xác suất A sau khi quan sát B).
>
> **(b) Vì sao cần**: Vì cuộc sống đầy bài toán "ngược": biết triệu chứng, suy bệnh. Biết test dương, suy thật sự bị bệnh. Biết email có từ "khuyến mãi", suy spam hay không. Định lý Bayes là **cốt lõi của**: chẩn đoán y khoa (test screening), classifier ML (Naive Bayes — lọc spam), suy luận Bayes (Bayesian statistics), thị giác máy tính (object recognition), tự lái xe (cảm biến noisy + map → vị trí). Quan trọng: kết quả Bayes thường **phản trực giác** — bệnh hiếm gặp + test 99% chính xác → người test dương chỉ $\sim 50\%$ thật sự bị bệnh.
>
> **(c) Ví dụ số**: Bệnh hiếm 1% dân số. Test 99% chính xác (cả 2 hướng). Test dương — xác suất thật sự bị bệnh? $P(B) = 0.01$, $P(D^+\mid B) = 0.99$, $P(D^+\mid B^c) = 0.01$. $P(D^+) = 0.99\cdot 0.01 + 0.01\cdot 0.99 = 0.0198$. $P(B\mid D^+) = 0.99\cdot 0.01/0.0198 = \mathbf{0.5}$ (chỉ 50%!). Phản trực giác. Túi 3 đồng xu: 2 cân, 1 lệch (đầu xuất hiện 90%). Chọn 1 cái và tung được đầu — xác suất đó là đồng lệch? $P(L\mid H) = \frac{0.9\cdot 1/3}{0.9\cdot 1/3 + 0.5\cdot 2/3} = 0.3/0.6333 \approx \mathbf{0.474}$.

❓ **Câu hỏi tự nhiên của người đọc**

- *"Xung khắc (mutually exclusive) khác độc lập (independent) thế nào?"* **Xung khắc**: không xảy ra cùng lúc, $P(A\cap B) = 0$ (vd xúc xắc ra 1 và ra 2). **Độc lập**: biến cố này không ảnh hưởng cái kia, $P(A\cap B) = P(A)\cdot P(B)$ (vd 2 lần tung). Hai khái niệm khác hẳn — biến cố xung khắc (có xác suất $> 0$) KHÔNG độc lập.
- *"$P(A\mid B)$ có bằng $P(B\mid A)$ không?"* Nói chung **không**. Đó là lý do cần Bayes để chuyển đổi. Vd $P(\text{test dương} \mid \text{bệnh}) = 99\%$ nhưng $P(\text{bệnh} \mid \text{test dương}) = 50\%$.

⚠ **Lỗi thường gặp — cộng xác suất khi 2 biến cố không xung khắc**. $P(A\cup B) = P(A) + P(B) - P(A\cap B)$; chỉ bỏ được $P(A\cap B)$ khi xung khắc. Phản ví dụ: tung xúc xắc, $A$ = chẵn ($1/2$), $B = \ge 4$ ($1/2$). $P(A\cup B) \neq 1/2+1/2 = 1$; đúng là $1/2 + 1/2 - P(\text{chẵn và} \ge 4 = \{4,6\}) = 1 - 2/6 = \mathbf{2/3}$.

🔁 **Dừng lại tự kiểm tra**

1. Tung 2 xúc xắc. $P(\text{tổng} = 7)$?
2. $P(A) = 0.3$, $P(B) = 0.4$, $A$ và $B$ độc lập. $P(A\cap B)$?

<details><summary>Đáp án</summary>

1. Có 6 cách ra tổng 7 trên 36 → $6/36 = \mathbf{1/6}$.
2. Độc lập → $P(A\cap B) = 0.3\cdot 0.4 = \mathbf{0.12}$.

</details>

### 📝 Tóm tắt mục 1

- $P(A)$ = thuận lợi/tổng (đều khả năng) = tỉ lệ dài hạn; $0 \le P \le 1$.
- $P(A\cup B) = P(A)+P(B)-P(A\cap B)$; xung khắc ($P(A\cap B)=0$) $\neq$ độc lập ($P(A\cap B)=P(A)P(B)$).
- Bayes đảo $P(A\mid B) \leftrightarrow P(B\mid A)$; kết quả thường phản trực giác (bệnh hiếm).

---

## 2. Biến ngẫu nhiên (Random Variable)

💡 **Trực giác / Hình dung**: biến ngẫu nhiên = "gắn 1 con số cho mỗi kết quả ngẫu nhiên". Kỳ vọng $E[X]$ = giá trị trung bình nếu lặp vô số lần (tâm của phân phối). Phương sai = mức "tản mát" quanh trung bình: nhỏ = các giá trị xúm gần trung bình, lớn = trải rộng. Hình dung 2 lớp cùng điểm trung bình 7, nhưng 1 lớp ai cũng 6-8 (phương sai nhỏ), lớp kia có cả 2 lẫn 10 (phương sai lớn).

**Biến ngẫu nhiên $X$** = "kết quả" của 1 thí nghiệm, được biểu diễn bằng số.

**Ví dụ**: Tung 2 xúc xắc. $X$ = tổng → $X \in \{2, 3, \dots, 12\}$.

### Hàm phân phối

- **Rời rạc**: $P(X = k)$ cho từng $k$.
- **Liên tục**: hàm mật độ $f(x)$, $P(a \le X \le b) = \int_a^b f(x)\,dx$.

### Kỳ vọng & phương sai

**Kỳ vọng ($E[X]$)** = giá trị "trung bình":

$$\begin{aligned}
\text{Rời rạc:} \quad E[X] &= \sum k\cdot P(X=k) \\
\text{Liên tục:} \quad E[X] &= \int x\cdot f(x)\,dx
\end{aligned}$$

**Phương sai ($\operatorname{Var}(X)$)** = "độ phân tán":

$$\operatorname{Var}(X) = E[(X - \mu)^2] = E[X^2] - (E[X])^2$$

**Độ lệch chuẩn**: $\sigma = \sqrt{\operatorname{Var}}$.

💡 **Trực giác sâu hơn — $E[X]$ là "trung bình dài hạn", $\operatorname{Var}$ là "độ phân tán"**

> Hình dung trò chơi: tung xúc xắc 1 lần, ăn số tiền bằng số chấm. Chơi **600 lần**. Mỗi mặt xuất hiện trung bình $600/6 = 100$ lần → tổng tiền $\approx 100\cdot(1+2+3+4+5+6) = 100\cdot 21 = 2100$ → trung bình mỗi ván $2100/600 = \mathbf{3.5}$. Đó **chính là** $E[X]$ — **trung bình dài hạn** sau vô số lần lặp, KHÔNG phải giá trị dễ ra nhất (mọi mặt đều khả năng như nhau). $E[X]$ là **trọng tâm** của phân phối: cắt giấy theo hình PMF rồi đặt lên cạnh dao, điểm cân bằng là $E[X]$.
>
> $\operatorname{Var}$ đo **độ phân tán** quanh trọng tâm: trung bình của **bình phương** khoảng cách từ $X$ tới $\mu$. Hai phân phối cùng $E[X]$ vẫn có thể khác hẳn độ tản — biểu đồ "gầy cao" (tụ sát $\mu$, Var nhỏ) so với "lùn rộng" (trải xa $\mu$, Var lớn):
>
> ```
> Var nhỏ (xúm quanh μ=5)        Var lớn (trải xa μ=5)
>          █                         █     █
>        █ █ █                       █  █  █
>      █ █ █ █ █                   █ █  █  █ █
>   ───┴─┴─┴─┴─┴───              ──┴─┴──┴──┴─┴──
>   1 3 5 7 9                    1 3 5 7 9
>   ↑ tụ quanh μ, σ ≈ 1.3        ↑ trải rộng, σ ≈ 3.0
> ```

**Walk-through 1 — Xúc xắc 6 mặt** ($X$ = số chấm, mỗi mặt $1/6$):

$$\begin{aligned}
E[X] &= 1\cdot\tfrac16 + 2\cdot\tfrac16 + 3\cdot\tfrac16 + 4\cdot\tfrac16 + 5\cdot\tfrac16 + 6\cdot\tfrac16 = \frac{1+2+3+4+5+6}{6} = \frac{21}{6} = \mathbf{3.5} \\
E[X^2] &= \frac{1^2+2^2+3^2+4^2+5^2+6^2}{6} = \frac{1+4+9+16+25+36}{6} = \frac{91}{6} \approx 15.17 \\
\operatorname{Var}(X) &= E[X^2] - (E[X])^2 = \frac{91}{6} - \left(\frac72\right)^2 = \frac{182}{12} - \frac{147}{12} = \frac{35}{12} \approx \mathbf{2.917} \\
\sigma &= \sqrt{35/12} \approx \mathbf{1.71}
\end{aligned}$$

**Walk-through 2 — Bernoulli($p$)** ($X = 1$ xác suất $p$, $X = 0$ xác suất $1-p$ — phép thử "có/không"):

$$\begin{aligned}
E[X] &= 1\cdot p + 0\cdot(1-p) = \mathbf{p} \\
E[X^2] &= 1^2\cdot p + 0^2\cdot(1-p) = p \quad(\text{vì } 0^2 = 0,\ 1^2 = 1) \\
\operatorname{Var}(X) &= E[X^2] - (E[X])^2 = p - p^2 = \mathbf{p(1-p)}
\end{aligned}$$

Kiểm: $p = 0.5$ (xu cân) → $\operatorname{Var} = 0.25$ (lớn nhất, bất định nhất); $p = 0$ hoặc $1$ → $\operatorname{Var} = 0$ (kết quả chắc chắn, không tản). Trực giác đúng: xu cân khó đoán nhất.

**Walk-through 3 — Binomial($n,p$)** (đếm số thành công trong $n$ lần Bernoulli độc lập). Dùng **tuyến tính của kỳ vọng** ($E[X+Y] = E[X]+E[Y]$, luôn đúng): viết $X = X_1 + \dots + X_n$ với mỗi $X_i \sim \text{Bernoulli}(p)$:

$$E[X] = E[X_1] + \dots + E[X_n] = \underbrace{p + p + \dots + p}_{n} = \mathbf{np}$$

Tương tự (các $X_i$ độc lập nên phương sai cộng được): $\operatorname{Var}(X) = \sum \operatorname{Var}(X_i) = n\cdot p(1-p) = \mathbf{np(1-p)}$. Verify số với $n=10, p=0.4$: $E[X] = 4$, $\operatorname{Var} = 10\cdot0.4\cdot0.6 = \mathbf{2.4}$, $\sigma \approx 1.55$.

**Walk-through 4 — Biến hai giá trị bất đối xứng** ($X = 100$ xác suất $0.1$, $X = 0$ xác suất $0.9$ — vé số):

$$\begin{aligned}
E[X] &= 100\cdot 0.1 + 0\cdot 0.9 = \mathbf{10} \\
E[X^2] &= 100^2\cdot 0.1 + 0 = 1000 \\
\operatorname{Var}(X) &= 1000 - 10^2 = \mathbf{900},\quad \sigma = \mathbf{30}
\end{aligned}$$

$\sigma = 30$ lớn gấp 3 lần $E[X] = 10$ → phân phối rất "bấp bênh" (hầu hết ván ăn 0, hiếm khi ăn 100). Đây là dấu hiệu rủi ro cao điển hình.

❓ **Câu hỏi tự nhiên của người đọc**

- *"$E[X] = 3.5$ nhưng xúc xắc đâu có mặt 3.5?"* Kỳ vọng là **trung bình lý thuyết**, không cần là 1 giá trị thực tế. Nó là tâm cân bằng của phân phối, đạt được khi lặp vô số lần.
- *"Vì sao $\operatorname{Var} = E[X^2] - (E[X])^2$, không phải $(E[X^2] - E[X])^2$?"* Đây là công thức rút gọn của $E[(X-\mu)^2]$. Khai triển từng bước (dùng tuyến tính của $E$, với $\mu = E[X]$ là hằng số):
$$\begin{aligned}
E[(X-\mu)^2] &= E[X^2 - 2\mu X + \mu^2] \\
&= E[X^2] - 2\mu\,E[X] + \mu^2 \quad(\text{tuyến tính}) \\
&= E[X^2] - 2\mu^2 + \mu^2 = E[X^2] - \mu^2
\end{aligned}$$
Không bước nào "lươn lẹo" — mỗi dòng chỉ dùng $E[aX+b] = aE[X]+b$ và $E[X] = \mu$. Đừng nhầm thứ tự.
- *"Vì sao dùng bình phương, không dùng trị tuyệt đối $E[|X-\mu|]$?"* Bình phương **khả vi mượt** (dễ làm giải tích, dễ ráp vào hồi quy/MLE), còn $|X-\mu|$ không khả vi tại $0$. Bình phương cũng "phạt nặng" giá trị xa $\mu$ — phù hợp nhiều ứng dụng.

⚠ **Lỗi thường gặp — tính $E[X^2]$ bằng $(E[X])^2$**. $E[X^2] \neq (E[X])^2$ (trừ khi $X$ là hằng số). Phản ví dụ xúc xắc: $E[X^2] = 91/6 \approx 15.17$ nhưng $(E[X])^2 = 3.5^2 = 12.25$ — khác nhau, hiệu của chúng **chính là** phương sai $35/12 \approx 2.917$ ($\ge 0$ luôn, vì $\operatorname{Var} \ge 0$).

⚠ **Lỗi thường gặp — nhầm xác suất với mật độ ở biến liên tục**. Với biến **liên tục**, $f(x)$ là **mật độ** chứ KHÔNG phải xác suất: $f(x)$ có thể $> 1$ (vd $\text{Uniform}(0, 0.5)$ có $f = 2$), và $P(X = x_0) = 0$ tại mọi điểm. Chỉ **diện tích** $\int_a^b f\,dx$ mới là xác suất. Phản ví dụ: $f(x) = 2$ trên $[0, 0.5]$ → $f(0.3) = 2$ không phải "xác suất 200%", mà $P(0.1 \le X \le 0.3) = \int_{0.1}^{0.3} 2\,dx = 0.4$.

⚠ **Lỗi thường gặp — $E[g(X)] \neq g(E[X])$ khi $g$ phi tuyến**. Vd $E[X^2] \neq (E[X])^2$; tổng quát $E[1/X] \neq 1/E[X]$, $E[\sqrt{X}] \neq \sqrt{E[X]}$. Chỉ đúng khi $g$ tuyến tính ($g(x) = ax + b$). Đúng phải tính $E[g(X)] = \sum g(k)\,P(X=k)$ — lấy $g$ của TỪNG giá trị rồi mới lấy trung bình. Phản ví dụ xúc xắc: $E[X^2] = 15.17$ nhưng $(E[X])^2 = 12.25$.

🔁 **Dừng lại tự kiểm tra**

1. $X$ nhận giá trị 0 (xác suất 0.5) và 10 (xác suất 0.5). Tính $E[X]$ và $\operatorname{Var}(X)$.
2. Xúc xắc 4 mặt đều $\{1,2,3,4\}$. Tính $E[X]$, $E[X^2]$, $\operatorname{Var}(X)$.
3. $Y = 3X + 5$ với $X$ ở câu 1. Tính $E[Y]$ và $\operatorname{Var}(Y)$ (dùng $E[aX+b] = aE[X]+b$, $\operatorname{Var}(aX+b) = a^2\operatorname{Var}(X)$).

<details><summary>Đáp án</summary>

1. $E[X] = 0\cdot 0.5 + 10\cdot 0.5 = \mathbf{5}$. $E[X^2] = 0\cdot 0.5 + 100\cdot 0.5 = 50$. $\operatorname{Var} = 50 - 25 = \mathbf{25}$, $\sigma = 5$.
2. $E[X] = (1+2+3+4)/4 = \mathbf{2.5}$; $E[X^2] = (1+4+9+16)/4 = 30/4 = 7.5$; $\operatorname{Var} = 7.5 - 2.5^2 = 7.5 - 6.25 = \mathbf{1.25}$. (Verify công thức xúc xắc đều $n$ mặt: $\operatorname{Var} = (n^2-1)/12 = (16-1)/12 = 15/12 = 1.25$ ✓.)
3. $E[Y] = 3\cdot 5 + 5 = \mathbf{20}$; $\operatorname{Var}(Y) = 3^2\cdot 25 = \mathbf{225}$ (dịch $+5$ KHÔNG đổi độ tản, scale $\times 3$ → phương sai $\times 9$).

</details>

### 📝 Tóm tắt mục 2

- Biến ngẫu nhiên gắn số cho kết quả; rời rạc ($P(X=k)$) hoặc liên tục (mật độ $f$).
- $E[X]$ = trung bình lý thuyết; $\operatorname{Var}(X) = E[X^2] - (E[X])^2$ = độ tản mát; $\sigma = \sqrt{\operatorname{Var}}$.
- $E[X^2] \neq (E[X])^2$; kỳ vọng không nhất thiết là giá trị thực tế.

---

## 3. Phân phối Nhị thức (Binomial)

💡 **Trực giác / Hình dung**: lặp 1 phép thử "có/không" (tung xu, đậu/rớt) $n$ lần độc lập, đếm số lần "có". $\binom{n}{k}$ đếm số cách chọn $k$ vị trí thành công trong $n$ lần; $p^k$ là xác suất $k$ lần thành công đó; $(1-p)^{n-k}$ là xác suất các lần còn lại thất bại. Nhân lại ra xác suất đúng $k$ thành công.

🎯 **Thí nghiệm**: lặp $n$ lần Bernoulli (mỗi lần xác suất thành công $p$). $X$ = số lần thành công.

$$P(X = k) = \binom{n}{k}\cdot p^k\cdot (1-p)^{n-k}$$

**Kỳ vọng**: $E[X] = \mathbf{n\cdot p}$. Phương sai: $\operatorname{Var}(X) = \mathbf{n\cdot p\cdot (1-p)}$.

**Ví dụ**: Tung 10 đồng xu công bằng. Số mặt ngửa $X \sim \text{Binomial}(10, 0.5)$.
- $P(X = 5) = \binom{10}{5}\cdot(0.5)^{10} = 252/1024 \approx 0.246$.
- $E[X] = 5$. $\sigma = \sqrt{2.5} \approx 1.58$.

**Verify $E[X] = np$ bằng số** ($n=3$, $p=0.5$, tung 3 xu): các xác suất $P(X=0..3) = 1/8, 3/8, 3/8, 1/8$. $E[X] = 0\cdot 1/8 + 1\cdot 3/8 + 2\cdot 3/8 + 3\cdot 1/8 = (0+3+6+3)/8 = 12/8 = \mathbf{1.5} = 3\cdot 0.5 = np$ ✓.

**Verify $\operatorname{Var}(X) = np(1-p)$ bằng cùng ví dụ** ($n=3$, $p=0.5$):
$$\begin{aligned}
E[X^2] &= 0^2\cdot\tfrac18 + 1^2\cdot\tfrac38 + 2^2\cdot\tfrac38 + 3^2\cdot\tfrac18 = \frac{0 + 3 + 12 + 9}{8} = \frac{24}{8} = 3 \\
\operatorname{Var}(X) &= E[X^2] - (E[X])^2 = 3 - 1.5^2 = 3 - 2.25 = \mathbf{0.75} \\
np(1-p) &= 3\cdot 0.5\cdot 0.5 = 0.75 \ \checkmark
\end{aligned}$$

**Vì sao công thức đúng — Binomial là tổng các Bernoulli**: $X = X_1 + \dots + X_n$ với $X_i \sim \text{Bernoulli}(p)$ độc lập. Mỗi $X_i$ có $E[X_i] = p$, $\operatorname{Var}(X_i) = p(1-p)$ (đã chứng minh ở mục 2). Tuyến tính cho $E[X] = np$; độc lập cho $\operatorname{Var}(X) = \sum\operatorname{Var}(X_i) = np(1-p)$ — không cần liệt kê $2^n$ kết quả.

❓ **Câu hỏi tự nhiên của người đọc**

- *"Vì sao $E[X] = np$ hợp lý?"* Mỗi lần thử đóng góp trung bình $p$ thành công; $n$ lần → $np$. Vd tung 10 xu, mỗi xu 0.5 mặt ngửa kỳ vọng → trung bình 5 mặt ngửa.
- *"Khi nào dùng nhị thức?"* Khi: số lần thử **cố định** ($n$), mỗi lần **độc lập**, xác suất **không đổi** ($p$), chỉ 2 kết quả. Vi phạm 1 điều (vd rút bài không hoàn lại → không độc lập) thì không dùng được.

⚠ **Lỗi thường gặp — quên hệ số $\binom{n}{k}$**. $P(X=k)$ phải nhân $\binom{n}{k}$ vì có nhiều **thứ tự** cho $k$ thành công. Phản ví dụ: tung 2 xu, $P(\text{đúng 1 ngửa}) = \binom{2}{1}\cdot 0.5\cdot 0.5 = 2\cdot 0.25 = \mathbf{0.5}$, KHÔNG phải $0.5\cdot 0.5 = 0.25$ (bỏ $\binom{2}{1}$ quên 2 thứ tự HT và TH).

🔁 **Dừng lại tự kiểm tra**

1. Tung 4 đồng xu công bằng. $P(\text{đúng 2 mặt ngửa})$?

<details><summary>Đáp án</summary>

$\binom{4}{2}\cdot(0.5)^4 = 6\cdot(1/16) = 6/16 = \mathbf{3/8} = 0.375$.

</details>

### 📝 Tóm tắt mục 3

- Binomial: $n$ lần thử độc lập, xác suất $p$ cố định, đếm số thành công.
- $P(X=k) = \binom{n}{k}\cdot p^k\cdot (1-p)^{n-k}$; $E[X] = np$, $\operatorname{Var} = np(1-p)$.
- Đừng quên hệ số $\binom{n}{k}$ (đếm thứ tự).

---

## 4. Phân phối Chuẩn (Normal / Gaussian)

💡 **Trực giác / Hình dung**: phân phối chuẩn = "đường cong hình chuông" đối xứng. Hầu hết giá trị tụ quanh trung bình $\mu$, càng xa càng hiếm. Quy tắc 68-95-99.7: như "vòng tròn đồng tâm" quanh $\mu$ — 1 độ lệch chuẩn ôm 68%, 2 ôm 95%, 3 ôm 99.7%. Xuất hiện khắp nơi vì tổng nhiều yếu tố ngẫu nhiên nhỏ → luôn ra hình chuông (CLT).

🎯 **Liên tục, hàm mật độ**:

$$f(x) = \frac{1}{\sigma\sqrt{2\pi}}\cdot e^{-\frac{(x-\mu)^2}{2\sigma^2}}$$

Hai tham số: $\mu$ (trung bình), $\sigma$ (độ lệch chuẩn).

**Đặc trưng**:
- Đối xứng quanh $\mu$.
- $\sim 68\%$ nằm trong $[\mu-\sigma, \mu+\sigma]$.
- $\sim 95\%$ trong $[\mu-2\sigma, \mu+2\sigma]$.
- $\sim 99.7\%$ trong $[\mu-3\sigma, \mu+3\sigma]$.

**Đường chuông + quy tắc 68-95-99.7** (mỗi mốc là một bội $\sigma$ cách $\mu$):

<svg viewBox="0 0 600 305" style="max-width:600px;width:100%;height:auto;display:block;margin:14px auto;background:#f8fafc;border-radius:8px" role="img" aria-label="Đường chuông chuẩn với các mốc μ ± σ, μ ± 2σ, μ ± 3σ và quy tắc 68-95-99.7">
  <defs><marker id="ar23" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#1a202c"/></marker><marker id="ar23b" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#1d4ed8"/></marker></defs>
  <path d="M 90.0,198.5 L 95.2,198.2 L 100.5,197.7 L 105.8,197.2 L 111.0,196.6 L 116.2,195.8 L 121.5,194.9 L 126.8,193.8 L 132.0,192.6 L 137.2,191.2 L 142.5,189.5 L 147.8,187.6 L 153.0,185.5 L 158.2,183.1 L 163.5,180.3 L 168.8,177.3 L 174.0,173.9 L 179.2,170.3 L 184.5,166.3 L 189.8,161.9 L 195.0,157.3 L 200.2,152.3 L 205.5,147.1 L 210.8,141.6 L 216.0,135.9 L 221.2,130.1 L 226.5,124.1 L 231.8,118.2 L 237.0,112.2 L 242.2,106.3 L 247.5,100.6 L 252.8,95.2 L 258.0,90.0 L 263.2,85.3 L 268.5,81.0 L 273.8,77.3 L 279.0,74.1 L 284.2,71.6 L 289.5,69.8 L 294.8,68.7 L 300.0,68.3 L 305.2,68.7 L 310.5,69.8 L 315.8,71.6 L 321.0,74.1 L 326.2,77.3 L 331.5,81.0 L 336.8,85.3 L 342.0,90.0 L 347.2,95.2 L 352.5,100.6 L 357.8,106.3 L 363.0,112.2 L 368.2,118.2 L 373.5,124.1 L 378.8,130.1 L 384.0,135.9 L 389.2,141.6 L 394.5,147.1 L 399.8,152.3 L 405.0,157.3 L 410.2,161.9 L 415.5,166.3 L 420.8,170.3 L 426.0,173.9 L 431.2,177.3 L 436.5,180.3 L 441.8,183.1 L 447.0,185.5 L 452.2,187.6 L 457.5,189.5 L 462.8,191.2 L 468.0,192.6 L 473.2,193.8 L 478.5,194.9 L 483.8,195.8 L 489.0,196.6 L 494.2,197.2 L 499.5,197.7 L 504.8,198.2 L 510.0,198.5 L 510.0,200.0 L 90.0,200.0 Z" fill="#93c5fd" stroke="#93c5fd" stroke-width="0" fill-opacity="0.35" stroke-linejoin="round"/>
  <path d="M 160.0,182.2 L 163.5,180.3 L 167.0,178.3 L 170.5,176.2 L 174.0,173.9 L 177.5,171.5 L 181.0,169.0 L 184.5,166.3 L 188.0,163.4 L 191.5,160.4 L 195.0,157.3 L 198.5,154.0 L 202.0,150.6 L 205.5,147.1 L 209.0,143.4 L 212.5,139.7 L 216.0,135.9 L 219.5,132.0 L 223.0,128.1 L 226.5,124.1 L 230.0,120.1 L 233.5,116.2 L 237.0,112.2 L 240.5,108.3 L 244.0,104.4 L 247.5,100.6 L 251.0,97.0 L 254.5,93.4 L 258.0,90.0 L 261.5,86.8 L 265.0,83.8 L 268.5,81.0 L 272.0,78.5 L 275.5,76.2 L 279.0,74.1 L 282.5,72.4 L 286.0,71.0 L 289.5,69.8 L 293.0,69.0 L 296.5,68.5 L 300.0,68.3 L 303.5,68.5 L 307.0,69.0 L 310.5,69.8 L 314.0,71.0 L 317.5,72.4 L 321.0,74.1 L 324.5,76.2 L 328.0,78.5 L 331.5,81.0 L 335.0,83.8 L 338.5,86.8 L 342.0,90.0 L 345.5,93.4 L 349.0,97.0 L 352.5,100.6 L 356.0,104.4 L 359.5,108.3 L 363.0,112.2 L 366.5,116.2 L 370.0,120.1 L 373.5,124.1 L 377.0,128.1 L 380.5,132.0 L 384.0,135.9 L 387.5,139.7 L 391.0,143.4 L 394.5,147.1 L 398.0,150.6 L 401.5,154.0 L 405.0,157.3 L 408.5,160.4 L 412.0,163.4 L 415.5,166.3 L 419.0,169.0 L 422.5,171.5 L 426.0,173.9 L 429.5,176.2 L 433.0,178.3 L 436.5,180.3 L 440.0,182.2 L 440.0,200.0 L 160.0,200.0 Z" fill="#60a5fa" stroke="#60a5fa" stroke-width="0" fill-opacity="0.4" stroke-linejoin="round"/>
  <path d="M 230.0,120.1 L 231.8,118.2 L 233.5,116.2 L 235.2,114.2 L 237.0,112.2 L 238.8,110.2 L 240.5,108.3 L 242.2,106.3 L 244.0,104.4 L 245.8,102.5 L 247.5,100.6 L 249.2,98.8 L 251.0,97.0 L 252.8,95.2 L 254.5,93.4 L 256.2,91.7 L 258.0,90.0 L 259.8,88.4 L 261.5,86.8 L 263.2,85.3 L 265.0,83.8 L 266.8,82.4 L 268.5,81.0 L 270.2,79.7 L 272.0,78.5 L 273.8,77.3 L 275.5,76.2 L 277.2,75.1 L 279.0,74.1 L 280.8,73.2 L 282.5,72.4 L 284.2,71.6 L 286.0,71.0 L 287.8,70.3 L 289.5,69.8 L 291.2,69.4 L 293.0,69.0 L 294.8,68.7 L 296.5,68.5 L 298.2,68.4 L 300.0,68.3 L 301.8,68.4 L 303.5,68.5 L 305.2,68.7 L 307.0,69.0 L 308.8,69.4 L 310.5,69.8 L 312.2,70.3 L 314.0,71.0 L 315.8,71.6 L 317.5,72.4 L 319.2,73.2 L 321.0,74.1 L 322.8,75.1 L 324.5,76.2 L 326.2,77.3 L 328.0,78.5 L 329.8,79.7 L 331.5,81.0 L 333.2,82.4 L 335.0,83.8 L 336.8,85.3 L 338.5,86.8 L 340.2,88.4 L 342.0,90.0 L 343.8,91.7 L 345.5,93.4 L 347.2,95.2 L 349.0,97.0 L 350.8,98.8 L 352.5,100.6 L 354.2,102.5 L 356.0,104.4 L 357.8,106.3 L 359.5,108.3 L 361.2,110.2 L 363.0,112.2 L 364.8,114.2 L 366.5,116.2 L 368.2,118.2 L 370.0,120.1 L 370.0,200.0 L 230.0,200.0 Z" fill="#1d4ed8" stroke="#1d4ed8" stroke-width="0" fill-opacity="0.45" stroke-linejoin="round"/>
  <line x1="6.0" y1="200.0" x2="594.0" y2="200.0" stroke="#1a202c" stroke-width="1.5"/>
  <path d="M 13.0,200.0 L 16.6,200.0 L 20.2,200.0 L 23.8,199.9 L 27.4,199.9 L 30.9,199.9 L 34.5,199.9 L 38.1,199.9 L 41.7,199.9 L 45.3,199.8 L 48.9,199.8 L 52.5,199.7 L 56.1,199.7 L 59.6,199.6 L 63.2,199.6 L 66.8,199.5 L 70.4,199.4 L 74.0,199.3 L 77.6,199.2 L 81.2,199.0 L 84.8,198.8 L 88.3,198.6 L 91.9,198.4 L 95.5,198.2 L 99.1,197.9 L 102.7,197.5 L 106.3,197.1 L 109.9,196.7 L 113.4,196.2 L 117.0,195.7 L 120.6,195.1 L 124.2,194.4 L 127.8,193.6 L 131.4,192.8 L 135.0,191.8 L 138.6,190.8 L 142.2,189.6 L 145.7,188.4 L 149.3,187.0 L 152.9,185.5 L 156.5,183.9 L 160.1,182.1 L 163.7,180.2 L 167.3,178.2 L 170.9,176.0 L 174.4,173.7 L 178.0,171.2 L 181.6,168.5 L 185.2,165.7 L 188.8,162.7 L 192.4,159.6 L 196.0,156.4 L 199.6,153.0 L 203.1,149.5 L 206.7,145.8 L 210.3,142.1 L 213.9,138.2 L 217.5,134.3 L 221.1,130.3 L 224.7,126.2 L 228.2,122.1 L 231.8,118.1 L 235.4,114.0 L 239.0,109.9 L 242.6,105.9 L 246.2,102.0 L 249.8,98.2 L 253.4,94.6 L 256.9,91.0 L 260.5,87.7 L 264.1,84.6 L 267.7,81.6 L 271.3,79.0 L 274.9,76.6 L 278.5,74.4 L 282.1,72.6 L 285.6,71.1 L 289.2,69.9 L 292.8,69.0 L 296.4,68.5 L 300.0,68.3 L 303.6,68.5 L 307.2,69.0 L 310.8,69.9 L 314.4,71.1 L 317.9,72.6 L 321.5,74.4 L 325.1,76.6 L 328.7,79.0 L 332.3,81.6 L 335.9,84.6 L 339.5,87.7 L 343.1,91.0 L 346.6,94.6 L 350.2,98.2 L 353.8,102.0 L 357.4,105.9 L 361.0,109.9 L 364.6,114.0 L 368.2,118.1 L 371.7,122.1 L 375.3,126.2 L 378.9,130.3 L 382.5,134.3 L 386.1,138.2 L 389.7,142.1 L 393.3,145.8 L 396.9,149.5 L 400.4,153.0 L 404.0,156.4 L 407.6,159.6 L 411.2,162.7 L 414.8,165.7 L 418.4,168.5 L 422.0,171.2 L 425.6,173.7 L 429.1,176.0 L 432.7,178.2 L 436.3,180.2 L 439.9,182.1 L 443.5,183.9 L 447.1,185.5 L 450.7,187.0 L 454.3,188.4 L 457.9,189.6 L 461.4,190.8 L 465.0,191.8 L 468.6,192.8 L 472.2,193.6 L 475.8,194.4 L 479.4,195.1 L 483.0,195.7 L 486.5,196.2 L 490.1,196.7 L 493.7,197.1 L 497.3,197.5 L 500.9,197.9 L 504.5,198.2 L 508.1,198.4 L 511.7,198.6 L 515.2,198.8 L 518.8,199.0 L 522.4,199.2 L 526.0,199.3 L 529.6,199.4 L 533.2,199.5 L 536.8,199.6 L 540.4,199.6 L 543.9,199.7 L 547.5,199.7 L 551.1,199.8 L 554.7,199.8 L 558.3,199.9 L 561.9,199.9 L 565.5,199.9 L 569.1,199.9 L 572.6,199.9 L 576.2,199.9 L 579.8,200.0 L 583.4,200.0 L 587.0,200.0" fill="none" stroke="#1a202c" stroke-width="2.5" stroke-linejoin="round"/>
  <line x1="90.0" y1="196.0" x2="90.0" y2="204.0" stroke="#1a202c" stroke-width="1.5"/>
  <text x="90.0" y="218.0" fill="#475569" font-size="12" text-anchor="middle" font-weight="700">μ−3σ</text>
  <line x1="160.0" y1="196.0" x2="160.0" y2="204.0" stroke="#1a202c" stroke-width="1.5"/>
  <text x="160.0" y="218.0" fill="#475569" font-size="12" text-anchor="middle" font-weight="700">μ−2σ</text>
  <line x1="230.0" y1="196.0" x2="230.0" y2="204.0" stroke="#1a202c" stroke-width="1.5"/>
  <text x="230.0" y="218.0" fill="#475569" font-size="12" text-anchor="middle" font-weight="700">μ−σ</text>
  <line x1="300.0" y1="196.0" x2="300.0" y2="204.0" stroke="#1a202c" stroke-width="1.5"/>
  <text x="300.0" y="218.0" fill="#475569" font-size="12" text-anchor="middle" font-weight="700">μ</text>
  <line x1="370.0" y1="196.0" x2="370.0" y2="204.0" stroke="#1a202c" stroke-width="1.5"/>
  <text x="370.0" y="218.0" fill="#475569" font-size="12" text-anchor="middle" font-weight="700">μ+σ</text>
  <line x1="440.0" y1="196.0" x2="440.0" y2="204.0" stroke="#1a202c" stroke-width="1.5"/>
  <text x="440.0" y="218.0" fill="#475569" font-size="12" text-anchor="middle" font-weight="700">μ+2σ</text>
  <line x1="510.0" y1="196.0" x2="510.0" y2="204.0" stroke="#1a202c" stroke-width="1.5"/>
  <text x="510.0" y="218.0" fill="#475569" font-size="12" text-anchor="middle" font-weight="700">μ+3σ</text>
  <line x1="300.0" y1="200.0" x2="300.0" y2="68.3" stroke="#94a3b8" stroke-width="1.2" stroke-dasharray="4 3"/>
  <text x="308.0" y="64.3" fill="#475569" font-size="11" text-anchor="start">đỉnh tại μ (dày nhất)</text>
  <line x1="230.0" y1="245.0" x2="370.0" y2="245.0" stroke="#1d4ed8" stroke-width="1.5" marker-end="url(#ar23b)"/>
  <line x1="370.0" y1="245.0" x2="230.0" y2="245.0" stroke="#1d4ed8" stroke-width="1.5" marker-end="url(#ar23b)"/>
  <rect x="235.0" y="236.0" width="130.0" height="16.0" rx="4" fill="#f8fafc" fill-opacity="1" stroke="none" stroke-width="0"/>
  <text x="300.0" y="249.0" fill="#1d4ed8" font-size="11" text-anchor="middle" font-weight="700">68% trong μ ± 1σ</text>
  <line x1="160.0" y1="268.0" x2="440.0" y2="268.0" stroke="#1d4ed8" stroke-width="1.5" marker-end="url(#ar23b)"/>
  <line x1="440.0" y1="268.0" x2="160.0" y2="268.0" stroke="#1d4ed8" stroke-width="1.5" marker-end="url(#ar23b)"/>
  <rect x="235.0" y="259.0" width="130.0" height="16.0" rx="4" fill="#f8fafc" fill-opacity="1" stroke="none" stroke-width="0"/>
  <text x="300.0" y="272.0" fill="#1d4ed8" font-size="11" text-anchor="middle" font-weight="700">95% trong μ ± 2σ</text>
  <line x1="90.0" y1="291.0" x2="510.0" y2="291.0" stroke="#1d4ed8" stroke-width="1.5" marker-end="url(#ar23b)"/>
  <line x1="510.0" y1="291.0" x2="90.0" y2="291.0" stroke="#1d4ed8" stroke-width="1.5" marker-end="url(#ar23b)"/>
  <rect x="235.0" y="282.0" width="130.0" height="16.0" rx="4" fill="#f8fafc" fill-opacity="1" stroke="none" stroke-width="0"/>
  <text x="300.0" y="295.0" fill="#1d4ed8" font-size="11" text-anchor="middle" font-weight="700">99.7% trong μ ± 3σ</text>
</svg>

Mỗi đuôi ngoài $3\sigma$ chỉ còn $\sim 0.15\%$ → biến cố "$> 3\sigma$" cực hiếm (cơ sở của khái niệm "six sigma" trong kiểm soát chất lượng).

💡 **Vì sao chuẩn quan trọng? — Định lý giới hạn trung tâm (CLT)**

> **CLT**: lấy **trung bình** (hoặc tổng) của $n$ biến ngẫu nhiên **độc lập, cùng phân phối** với kỳ vọng $\mu$ và phương sai $\sigma^2$. Khi $n$ lớn, phân phối của trung bình mẫu $\bar{X}$ **tiến về chuẩn** $N\!\left(\mu, \dfrac{\sigma^2}{n}\right)$ — bất kể phân phối gốc xấu xí thế nào (lệch, rời rạc, nhiều đỉnh).
>
> **Minh họa bằng tung xúc xắc**: 1 con xúc xắc cho phân phối **đều** (phẳng lì, không phải chuông):
> ```
>  1 con xúc xắc — đều phẳng       Tổng 5 con — đã thành chuông
>  █ █ █ █ █ █                            ▁▃▅█▇▅▃▁
>  █ █ █ █ █ █                          ▁▃▅███████▅▃▁
>  █ █ █ █ █ █                        ▁▃▅███████████▅▃▁
>  ─┴─┴─┴─┴─┴─┴─                    ───┴─────┴─────┴───
>  1 2 3 4 5 6                       5  ...  17.5 ... 30
> ```
> Tổng 1 con: phẳng. Tổng 2 con: tam giác (đỉnh ở 7). Tổng 5 con: đã ra hình chuông rõ. Đây là lý do chiều cao, IQ, lỗi đo lường, điểm thi... đều ~chuẩn: chúng là **tổng nhiều yếu tố ngẫu nhiên nhỏ** (gen, dinh dưỡng, môi trường...).
>
> **Hệ quả thực tế**: sai số chuẩn của trung bình mẫu là $\sigma/\sqrt{n}$ — gấp 4 lần cỡ mẫu thì giảm sai số một nửa (vì $\sqrt{4} = 2$). Đây là nền của ước lượng và kiểm định ở mục 6.

**4 ví dụ áp dụng quy tắc 68-95-99.7** (IQ $\sim N(100, 15^2)$, $\mu=100$, $\sigma=15$):
- $P(85 \le \text{IQ} \le 115) = P(\mu-\sigma \le X \le \mu+\sigma) = \mathbf{68\%}$.
- $P(70 \le \text{IQ} \le 130) = P(\mu-2\sigma \le X \le \mu+2\sigma) = \mathbf{95\%}$.
- $P(\text{IQ} > 130) = (100\% - 95\%)/2 = \mathbf{2.5\%}$ (1 đuôi phải của $2\sigma$).
- $P(\text{IQ} > 100) = \mathbf{50\%}$ (đối xứng quanh $\mu$).

#### z-score và chuẩn hóa về $N(0,1)$

💡 **Trực giác**: z-score trả lời câu "$x$ cách trung bình **bao nhiêu độ lệch chuẩn**?". Nó biến mọi phân phối chuẩn về cùng một thước đo $N(0,1)$ (chuẩn tắc) để tra bảng / so sánh.

$$z = \frac{x - \mu}{\sigma}$$

**Walk-through z-score (3 ví dụ trên cùng phân phối IQ $N(100, 15^2)$)**:

- $x = 130 \to z = (130-100)/15 = 30/15 = \mathbf{2}$ → "trên trung bình đúng $2\sigma$" → top $2.5\%$.
- $x = 92.5 \to z = (92.5-100)/15 = -7.5/15 = \mathbf{-0.5}$ → "dưới trung bình nửa $\sigma$".
- $x = 145 \to z = (145-100)/15 = 45/15 = \mathbf{3}$ → đúng $3\sigma$, top $0.15\%$ — cực hiếm.

**Walk-through đầy đủ với tra bảng** — *"Điểm thi $\sim N(70, 8^2)$. Bao nhiêu % học sinh được trên 82 điểm?"*:

$$\begin{aligned}
z &= \frac{82 - 70}{8} = \frac{12}{8} = 1.5 \\
P(X > 82) &= P(Z > 1.5) = 1 - \Phi(1.5)
\end{aligned}$$

Tra bảng chuẩn tắc (hàm phân phối tích lũy $\Phi$): $\Phi(1.5) \approx 0.9332$ → $P(X > 82) = 1 - 0.9332 = \mathbf{0.0668} \approx 6.7\%$. Vài giá trị $\Phi$ hay dùng để ghi nhớ:

| $z$ | $\Phi(z) = P(Z \le z)$ | Ý nghĩa |
|-----|------------------------|---------|
| $0$ | $0.5000$ | đúng trung bình |
| $1$ | $0.8413$ | (khớp $68\%$: $2\times0.8413 - 1 = 0.6826$) |
| $1.5$ | $0.9332$ | dùng ở ví dụ trên |
| $1.96$ | $0.9750$ | mốc $95\%$ hai đuôi (kiểm định) |
| $2$ | $0.9772$ | (khớp $95\%$: $2\times0.9772 - 1 = 0.9544$) |
| $3$ | $0.9987$ | (khớp $99.7\%$) |

❓ **Câu hỏi tự nhiên của người đọc**

- *"$P(X = \text{giá trị cụ thể})$ bằng bao nhiêu?"* Với phân phối **liên tục**, $P(X = 1\text{ điểm}) = \mathbf{0}$ (diện tích bề rộng 0). Chỉ tính được $P(a \le X \le b)$ = diện tích dưới đường cong. Khác hẳn rời rạc.
- *"z-score là gì?"* $z = \frac{x - \mu}{\sigma}$ = "cách $\mu$ bao nhiêu độ lệch chuẩn". Chuẩn hóa về $N(0,1)$ để tra bảng. Vd $x = 130$, $\mu=100$, $\sigma=15 \to z = 2$.

⚠ **Lỗi thường gặp — chia đôi sai khi tính xác suất 1 đuôi**. $P(X > \mu+2\sigma) = (1 - 0.95)/2 = 2.5\%$, KHÔNG phải 5%. Vùng 5% là **cả 2 đuôi** ngoài $2\sigma$; mỗi đuôi 2.5%. Quên chia đôi → sai gấp 2.

🔁 **Dừng lại tự kiểm tra**

1. $X \sim N(50, 10^2)$. $P(40 \le X \le 60)$?
2. $P(X < 30)$?
3. Chiều cao nam $\sim N(170, 6^2)$ cm. Tính z-score của người cao 182 cm. Người đó thuộc nhóm bao nhiêu % cao nhất (dùng quy tắc 68-95-99.7)?

<details><summary>Đáp án</summary>

1. $40 = \mu-\sigma$, $60 = \mu+\sigma$ → **68%**.
2. $30 = \mu-2\sigma$. $P(X < \mu-2\sigma) = (1-0.95)/2 = \mathbf{2.5\%}$.
3. $z = (182-170)/6 = 12/6 = \mathbf{2}$. $P(X > \mu+2\sigma) = (1-0.95)/2 = \mathbf{2.5\%}$ → thuộc nhóm $2.5\%$ cao nhất.

</details>

### 📝 Tóm tắt mục 4

- Chuẩn $N(\mu,\sigma)$: hình chuông đối xứng quanh $\mu$; xuất hiện khắp nơi nhờ CLT (tổng nhiều yếu tố ngẫu nhiên nhỏ → chuông).
- Quy tắc 68-95-99.7 cho $[\mu\pm\sigma]$, $[\mu\pm2\sigma]$, $[\mu\pm3\sigma]$; ngoài $3\sigma$ chỉ $\sim0.15\%$ mỗi đuôi.
- Liên tục → $P(\text{điểm}) = 0$; tính $P$ khoảng = diện tích; nhớ chia đôi cho 1 đuôi.
- z-score $z = \frac{x-\mu}{\sigma}$ = "cách $\mu$ bao nhiêu $\sigma$"; chuẩn hóa về $N(0,1)$ để tra bảng $\Phi$ ($\Phi(1.96) = 0.975$ → mốc $95\%$).
- CLT: $\bar{X} \to N(\mu, \sigma^2/n)$; sai số chuẩn $\sigma/\sqrt{n}$ giảm theo $\sqrt{n}$.

---

## 5. Phân phối Poisson

💡 **Trực giác / Hình dung**: đếm số lần 1 sự kiện hiếm xảy ra trong 1 khoảng (thời gian/không gian) khi trung bình là $\lambda$. Như "binomial với $n$ rất lớn, $p$ rất nhỏ, $np = \lambda$ ổn định". Vd tổng đài: mỗi mili-giây xác suất có cuộc gọi cực nhỏ, nhưng cả phút có $\sim\lambda$ cuộc.

🎯 **Đếm sự kiện hiếm** trong khoảng thời gian / không gian.

$$P(X = k) = e^{-\lambda}\cdot \frac{\lambda^k}{k!}$$

$\lambda$ = "tốc độ" (số trung bình).

**Ví dụ + verify** ($\lambda = 2$ cuộc gọi/phút):
- $P(X=0) = e^{-2}\cdot 2^0/0! = e^{-2} \approx \mathbf{0.135}$ (không cuộc nào).
- $P(X=1) = e^{-2}\cdot 2^1/1! = 2e^{-2} \approx \mathbf{0.271}$.
- $P(X=2) = e^{-2}\cdot 2^2/2! = 2e^{-2} \approx \mathbf{0.271}$.
- Kiểm tổng: $P(0)+P(1)+P(2)+\dots = e^{-2}(1+2+2+\dots) = e^{-2}\cdot e^2 = 1$ ✓ (chuỗi Taylor của $e^2$).

$\mathbf{E[X] = \operatorname{Var}(X) = \lambda}$.

**Walk-through — Poisson xấp xỉ Binomial** (khi $n$ lớn, $p$ nhỏ, $\lambda = np$): nhà máy làm $n = 1000$ sản phẩm, mỗi cái lỗi với $p = 0.002$. Số lỗi $X$. Dùng Binomial chính xác thì $\binom{1000}{k}$ rất khó tính; dùng Poisson với $\lambda = np = 1000\cdot 0.002 = 2$:
$$\begin{aligned}
P(X = 0) &= e^{-2}\cdot\frac{2^0}{0!} = e^{-2} \approx \mathbf{0.135} \quad(\text{Binomial: } 0.998^{1000} \approx 0.135\ \checkmark) \\
P(X = 3) &= e^{-2}\cdot\frac{2^3}{3!} = e^{-2}\cdot\frac{8}{6} \approx \mathbf{0.180}
\end{aligned}$$
Khớp Binomial tới 3 chữ số — đó là lý do Poisson gọi là "luật số nhỏ" (law of rare events).

❓ **Câu hỏi tự nhiên của người đọc**

- *"Vì sao kỳ vọng = phương sai = $\lambda$?"* Đặc trưng riêng của Poisson. Khác chuẩn ($\mu$, $\sigma$ độc lập) — Poisson chỉ 1 tham số $\lambda$ điều khiển cả tâm lẫn độ tản. $\sigma = \sqrt{\lambda}$.
- *"Khi nào dùng Poisson thay binomial?"* Khi $n$ lớn, $p$ nhỏ, không biết rõ $n$ nhưng biết tốc độ $\lambda$ (vd số tai nạn/năm, số lỗi/trang). $\lambda = n\cdot p$.

⚠ **Lỗi thường gặp — quên $e^{-\lambda}$ hoặc dùng sai $\lambda$ cho khoảng khác**. Nếu $\lambda = 2$/phút mà hỏi trong 3 phút thì $\lambda' = 6$ (nhân theo khoảng). Phản ví dụ: tính $P$ trong 3 phút mà vẫn dùng $\lambda = 2$ → sai (phải đổi $\lambda = 6$).

🔁 **Dừng lại tự kiểm tra**

1. $\lambda = 3$ lỗi/trang. $P(1\text{ trang có 0 lỗi})$?

<details><summary>Đáp án</summary>

$P(X=0) = e^{-3}\cdot 3^0/0! = e^{-3} \approx \mathbf{0.0498}$ ($\sim 5\%$).

</details>

### 📝 Tóm tắt mục 5

- Poisson đếm sự kiện hiếm với tốc độ $\lambda$: $P(X=k) = e^{-\lambda}\cdot\lambda^k/k!$.
- $E[X] = \operatorname{Var}(X) = \lambda$ (1 tham số điều khiển cả tâm và tản); $\sigma = \sqrt{\lambda}$.
- Đổi $\lambda$ theo khoảng ($\lambda' = \lambda \times$ số khoảng); đừng quên $e^{-\lambda}$.

---

## 6. Thống kê mô tả

💡 **Trực giác / Hình dung**: thống kê mô tả "tóm tắt 1 đống số" bằng vài con số then chốt. Trung bình = "điểm cân bằng" (kéo về phía giá trị lớn). Trung vị = "giá trị chính giữa" (chia đôi số quan sát). Độ lệch chuẩn = "khoảng cách trung bình tới tâm". Khi dữ liệu lệch (vài giá trị cực lớn), trung bình và trung vị **tách nhau**.

Cho mẫu $n$ quan sát $x_1, \dots, x_n$:

- **Trung bình**: $\bar{x} = \frac{x_1 + \dots + x_n}{n}$.
- **Phương sai mẫu**: $s^2 = \dfrac{\sum(x_i - \bar{x})^2}{n-1}$.
- **Độ lệch chuẩn**: $s = \sqrt{s^2}$.
- **Trung vị**: giá trị giữa khi sắp xếp.
- **Mode**: giá trị xuất hiện nhiều nhất.

**Walk-through 1 bằng số** (mẫu: 2, 4, 4, 6, 9 — đã sắp xếp, $n = 5$):
- Trung bình $\bar{x} = (2+4+4+6+9)/5 = 25/5 = \mathbf{5}$.
- Trung vị = giá trị giữa khi sắp xếp = $\mathbf{4}$ (vị trí thứ 3, vì $n$ lẻ).
- Mode = $\mathbf{4}$ (xuất hiện 2 lần).
- Phương sai mẫu, tính từng số hạng $(x_i - \bar{x})^2$: $(2-5)^2 = 9$, $(4-5)^2 = 1$, $(4-5)^2 = 1$, $(6-5)^2 = 1$, $(9-5)^2 = 16$:
$$s^2 = \frac{9+1+1+1+16}{5-1} = \frac{28}{4} = \mathbf{7}; \quad s = \sqrt{7} \approx \mathbf{2.65}$$

**Walk-through 2 — cỡ mẫu chẵn** (điểm thi: 5, 7, 7, 8, 9, 10 — $n = 6$):
- $\bar{x} = (5+7+7+8+9+10)/6 = 46/6 \approx \mathbf{7.67}$.
- Trung vị: $n$ chẵn → trung bình **2 giá trị giữa** (vị trí 3 và 4) $= (7+8)/2 = \mathbf{7.5}$.
- Mode $= \mathbf{7}$ (xuất hiện 2 lần).
- $s^2 = \frac{(5-7.67)^2 + 2(7-7.67)^2 + (8-7.67)^2 + (9-7.67)^2 + (10-7.67)^2}{5} = \frac{7.13 + 0.90 + 0.11 + 1.78 + 5.44}{5} = \frac{15.33}{5} \approx \mathbf{3.07}$; $s \approx 1.75$.

**Histogram của Walk-through 2** (mỗi ô = 1 quan sát):

<svg viewBox="0 0 440 225" style="max-width:440px;width:100%;height:auto;display:block;margin:14px auto;background:#f8fafc;border-radius:8px" role="img" aria-label="Histogram 6 quan sát 5, 7, 7, 8, 9, 10: mỗi ô một quan sát; mode = 7, trung vị 7.5, max = 10">
  <defs><marker id="ar24" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#1a202c"/></marker></defs>
  <line x1="30.0" y1="170.0" x2="402.0" y2="170.0" stroke="#1a202c" stroke-width="1.5"/>
  <rect x="42.0" y="120.0" width="36.0" height="48.0" rx="3" fill="#93c5fd" fill-opacity="0.8" stroke="#1d4ed8" stroke-width="1.5"/>
  <text x="60.0" y="188.0" fill="#1a202c" font-size="13" text-anchor="middle" font-weight="700">5</text>
  <text x="60.0" y="206.0" fill="#475569" font-size="11" text-anchor="middle">đếm: 1</text>
  <text x="120.0" y="188.0" fill="#1a202c" font-size="13" text-anchor="middle" font-weight="700">6</text>
  <text x="120.0" y="206.0" fill="#475569" font-size="11" text-anchor="middle">đếm: 0</text>
  <rect x="162.0" y="120.0" width="36.0" height="48.0" rx="3" fill="#fca5a5" fill-opacity="0.8" stroke="#dc2626" stroke-width="1.5"/>
  <rect x="162.0" y="70.0" width="36.0" height="48.0" rx="3" fill="#fca5a5" fill-opacity="0.8" stroke="#dc2626" stroke-width="1.5"/>
  <text x="180.0" y="188.0" fill="#1a202c" font-size="13" text-anchor="middle" font-weight="700">7</text>
  <text x="180.0" y="206.0" fill="#475569" font-size="11" text-anchor="middle">đếm: 2</text>
  <rect x="222.0" y="120.0" width="36.0" height="48.0" rx="3" fill="#93c5fd" fill-opacity="0.8" stroke="#1d4ed8" stroke-width="1.5"/>
  <text x="240.0" y="188.0" fill="#1a202c" font-size="13" text-anchor="middle" font-weight="700">8</text>
  <text x="240.0" y="206.0" fill="#475569" font-size="11" text-anchor="middle">đếm: 1</text>
  <rect x="282.0" y="120.0" width="36.0" height="48.0" rx="3" fill="#93c5fd" fill-opacity="0.8" stroke="#1d4ed8" stroke-width="1.5"/>
  <text x="300.0" y="188.0" fill="#1a202c" font-size="13" text-anchor="middle" font-weight="700">9</text>
  <text x="300.0" y="206.0" fill="#475569" font-size="11" text-anchor="middle">đếm: 1</text>
  <rect x="342.0" y="120.0" width="36.0" height="48.0" rx="3" fill="#93c5fd" fill-opacity="0.8" stroke="#1d4ed8" stroke-width="1.5"/>
  <text x="360.0" y="188.0" fill="#1a202c" font-size="13" text-anchor="middle" font-weight="700">10</text>
  <text x="360.0" y="206.0" fill="#475569" font-size="11" text-anchor="middle">đếm: 1</text>
  <text x="180.0" y="60.0" fill="#dc2626" font-size="12" text-anchor="middle" font-weight="700">mode = 7 (2 lần)</text>
  <text x="360.0" y="110.0" fill="#475569" font-size="11" text-anchor="middle">max = 10</text>
  <line x1="210.0" y1="170.0" x2="210.0" y2="50.0" stroke="#15803d" stroke-width="2" stroke-dasharray="5 3"/>
  <text x="210.0" y="44.0" fill="#15803d" font-size="12" text-anchor="middle" font-weight="700">trung vị 7.5 (giữa 7 và 8)</text>
  <text x="20.0" y="20.0" fill="#475569" font-size="12" text-anchor="start">histogram: mỗi ô = 1 quan sát</text>
</svg>

**Walk-through 3 — dữ liệu phân tán nhiều** so với Walk-through 1 (cùng trung bình nhưng tản hơn — mẫu: 1, 3, 5, 7, 9, $n = 5$):
- $\bar{x} = (1+3+5+7+9)/5 = 25/5 = \mathbf{5}$ (trùng trung bình Walk-through 1).
- $s^2 = \frac{(1-5)^2+(3-5)^2+(5-5)^2+(7-5)^2+(9-5)^2}{4} = \frac{16+4+0+4+16}{4} = \frac{40}{4} = \mathbf{10}$; $s \approx 3.16$.

So sánh: cùng $\bar{x} = 5$ nhưng $s = 3.16 > 2.65$ → mẫu này "trải rộng" hơn. Đúng minh họa: **trung bình không nói gì về độ phân tán — phải xem $s$**.

⚠ **Trung bình $\neq$ Trung vị** khi dữ liệu lệch (skewed). Phản ví dụ: lương $\{10, 12, 14, 15, 200\}$ (triệu). Trung bình $= 251/5 = 50.2$; trung vị $= 14$. 1 giá trị cực lớn kéo trung bình lệch hẳn — trung vị mô tả "người điển hình" tốt hơn.

❓ **Câu hỏi tự nhiên của người đọc**

- *"Vì sao phương sai mẫu chia $(n-1)$ chứ không $n$?"* Vì dùng $\bar{x}$ (tính từ chính mẫu) làm "tâm" khiến tổng bình phương hơi nhỏ đi (thiên lệch). Chia $(n-1)$ thay vì $n$ **hiệu chỉnh** thiên lệch (gọi là hiệu chỉnh Bessel). Phương sai **tổng thể** thì chia $n$.
- *"Khi nào dùng trung vị thay trung bình?"* Khi dữ liệu lệch hoặc có giá trị ngoại lai (lương, giá nhà). Trung vị "miễn nhiễm" với vài giá trị cực trị.

🔁 **Dừng lại tự kiểm tra**

1. Mẫu: 1, 3, 5, 7. Tính trung bình và trung vị.

<details><summary>Đáp án</summary>

Trung bình $= (1+3+5+7)/4 = \mathbf{4}$. Trung vị = trung bình 2 giá trị giữa (3 và 5) $= \mathbf{4}$. (Dữ liệu đối xứng → trùng nhau.)

</details>

### 6.5 Ước lượng & kiểm định giả thuyết (cơ bản)

💡 **Trực giác**: ta không đo được cả **tổng thể** (population), chỉ lấy được 1 **mẫu** (sample). Câu hỏi: từ mẫu, suy ra gì về tổng thể? Hai việc cốt lõi — **ước lượng** (estimate một con số chưa biết, vd $\mu$) và **kiểm định** (hypothesis test — kiểm tra một tuyên bố, vd "thuốc này có hiệu quả không?").

**Khoảng tin cậy (confidence interval) cho trung bình** — nhờ CLT, $\bar{x}$ ~ chuẩn quanh $\mu$ với độ lệch chuẩn $s/\sqrt{n}$ (gọi là **sai số chuẩn**, standard error). Khoảng tin cậy $95\%$:

$$\bar{x} \pm 1.96\cdot \frac{s}{\sqrt{n}}$$

(con số $1.96$ chính là z-score ứng với $95\%$ hai đuôi — xem bảng $\Phi$ ở mục 4.)

**Walk-through**: đo chiều cao $n = 100$ người, $\bar{x} = 170$ cm, $s = 8$ cm. Sai số chuẩn $= 8/\sqrt{100} = 8/10 = 0.8$. Khoảng tin cậy $95\%$:

$$170 \pm 1.96\cdot 0.8 = 170 \pm 1.568 = [\mathbf{168.43},\ \mathbf{171.57}]\ \text{cm}$$

Diễn dịch: "ta tin $95\%$ rằng trung bình thật của tổng thể nằm trong khoảng này". Tăng $n$ lên $400$ → sai số chuẩn $= 8/20 = 0.4$ → khoảng hẹp một nửa (gấp 4 cỡ mẫu mới hẹp một nửa, vì $\sqrt{4} = 2$).

**Kiểm định giả thuyết — khung 4 bước**:
1. **Giả thuyết không** $H_0$ (mặc định, "không có gì xảy ra") và **đối thuyết** $H_1$. Vd $H_0$: "đồng xu cân, $p = 0.5$"; $H_1$: "$p \neq 0.5$".
2. **Thống kê kiểm định** — đo dữ liệu lệch khỏi $H_0$ bao xa, đơn vị $\sigma$ (thường là z hoặc t).
3. **p-value** = $P(\text{quan sát lệch ít nhất bằng dữ liệu thực} \mid H_0 \text{ đúng})$.
4. So với mức ý nghĩa $\alpha$ (thường $0.05$): nếu $p < \alpha$ → **bác bỏ $H_0$**; ngược lại → chưa đủ bằng chứng bác bỏ.

**Walk-through**: tung xu $100$ lần, ra $63$ mặt ngửa. Xu có cân không? Dưới $H_0$ ($p = 0.5$): $\mu = np = 50$, $\sigma = \sqrt{np(1-p)} = \sqrt{25} = 5$. z-score của quan sát:

$$z = \frac{63 - 50}{5} = \frac{13}{5} = 2.6$$

$z = 2.6$ vượt mốc $1.96$ → p-value $< 0.05$ (cụ thể $P(|Z| > 2.6) \approx 0.0093$) → **bác bỏ $H_0$**: có bằng chứng xu lệch.

⚠ **Lỗi thường gặp — hiểu sai p-value**. p-value KHÔNG phải "xác suất $H_0$ đúng". Nó là xác suất thấy dữ liệu **cực đoan như vậy NẾU $H_0$ đúng**. Bác bỏ $H_0$ ở $\alpha = 0.05$ vẫn có $5\%$ khả năng bác nhầm (sai lầm loại I). "Không bác bỏ" cũng KHÔNG có nghĩa "$H_0$ đúng" — chỉ là chưa đủ bằng chứng.

❓ **Câu hỏi tự nhiên**: *"Vì sao $1.96$ chứ không phải $2$?"* $2$ là số tròn của quy tắc 68-95-99.7 (gần đúng). Giá trị **chính xác** cho $95\%$ hai đuôi là $z = 1.96$ (vì $\Phi(1.96) = 0.975$, mỗi đuôi $2.5\%$). Dùng $2$ là xấp xỉ tiện nhẩm; báo cáo chính thức dùng $1.96$.

### 📝 Tóm tắt mục 6

- Trung bình (điểm cân bằng), trung vị (giá trị giữa), mode (hay gặp nhất).
- Phương sai mẫu chia $(n-1)$ (hiệu chỉnh Bessel); tổng thể chia $n$.
- Dữ liệu lệch/ngoại lai → trung vị mô tả tốt hơn trung bình; cùng trung bình vẫn khác độ tản ($s$).
- Ước lượng: khoảng tin cậy $\bar{x} \pm 1.96\,s/\sqrt{n}$; kiểm định: tính z/t, so p-value với $\alpha$; p-value $\neq P(H_0)$.

---

## 7. Bài tập

### Bài tập

**Bài 1**: Tung 1 xúc xắc 6 mặt. Tính kỳ vọng $X$.

**Bài 2**: Tung 5 đồng xu công bằng. $P(\text{ra đúng 3 mặt ngửa})$?

**Bài 3**: Trong 1000 lần tung xúc xắc, ước lượng số lần ra 6.

**Bài 4**: $X \sim N(100, 15^2)$. $P(85 \le X \le 115)$?

**Bài 5**: 1 bệnh hiếm, 1% dân số mắc. Test có độ chính xác 99% (cả 2 hướng). 1 người test dương — xác suất thật sự bị bệnh?

**Bài 6**: Điểm thi $\sim N(70, 8^2)$. Tính z-score của 86 điểm và $P(X > 86)$ (dùng quy tắc 68-95-99.7).

**Bài 7**: Mẫu chi tiêu (triệu): 3, 5, 5, 6, 11. Tính trung bình, trung vị, mode và độ lệch chuẩn mẫu $s$.

**Bài 8**: Đo $n = 64$ sản phẩm, $\bar{x} = 250$ g, $s = 16$ g. Tính khoảng tin cậy $95\%$ cho trọng lượng trung bình thật.

**Bài 9**: Một nhà sản xuất tuyên bố $\le 5\%$ sản phẩm lỗi. Kiểm $200$ sản phẩm, thấy $16$ lỗi. Với $H_0$: tỉ lệ lỗi $= 5\%$, tính z-score và kết luận ở $\alpha = 0.05$.

### Lời giải

**Bài 1**: $E[X] = \sum k\cdot(1/6) = (1+2+3+4+5+6)/6 = \mathbf{3.5}$.

**Bài 2**: $X \sim \text{Bin}(5, 0.5)$. $P(X=3) = \binom{5}{3}\cdot(0.5)^5 = 10/32 = \mathbf{5/16}$.

**Bài 3**: $E[Y] = n\cdot p = 1000\cdot(1/6) \approx \mathbf{167}$.

**Bài 4**: $\mu = 100$, $\sigma = 15$. $115 = \mu+\sigma$, $85 = \mu-\sigma$. → $\sim\mathbf{68\%}$.

**Bài 5** (Bayes — bài toán nổi tiếng):
- $A$ = bị bệnh, $B$ = test dương.
- $P(A) = 0.01$, $P(A^c) = 0.99$.
- $P(B\mid A) = 0.99$, $P(B\mid A^c) = 0.01$.
- $P(B) = P(B\mid A)\cdot P(A) + P(B\mid A^c)\cdot P(A^c) = 0.99\cdot 0.01 + 0.01\cdot 0.99 = 0.0198$.
- $P(A\mid B) = 0.99\cdot 0.01 / 0.0198 = \mathbf{0.5}$.

⟶ **Bất ngờ**: dù test 99% chính xác, xác suất thật sự bị bệnh khi test dương chỉ **50%**. Vì bệnh hiếm. Đây là bài học quan trọng về Bayes.

**Bài 6**: $\mu = 70$, $\sigma = 8$. $z = (86-70)/8 = 16/8 = \mathbf{2}$. $86 = \mu + 2\sigma$ → $P(X > 86) = (1-0.95)/2 = \mathbf{2.5\%}$.

**Bài 7**: Sắp xếp: 3, 5, 5, 6, 11 ($n = 5$).
- Trung bình $\bar{x} = (3+5+5+6+11)/5 = 30/5 = \mathbf{6}$.
- Trung vị = vị trí giữa (thứ 3) $= \mathbf{5}$.
- Mode $= \mathbf{5}$ (xuất hiện 2 lần).
- $s^2 = \frac{(3-6)^2 + (5-6)^2 + (5-6)^2 + (6-6)^2 + (11-6)^2}{5-1} = \frac{9+1+1+0+25}{4} = \frac{36}{4} = 9$; $s = \mathbf{3}$.
- Lưu ý: trung bình $6 >$ trung vị $5$ vì giá trị $11$ kéo lệch phải (dữ liệu skew phải).

**Bài 8**: Sai số chuẩn $= s/\sqrt{n} = 16/\sqrt{64} = 16/8 = 2$. Khoảng tin cậy $95\%$:
$$250 \pm 1.96\cdot 2 = 250 \pm 3.92 = [\mathbf{246.08},\ \mathbf{253.92}]\ \text{g}$$

**Bài 9**: Dưới $H_0$ ($p = 0.05$, $n = 200$): $\mu = np = 10$ lỗi, $\sigma = \sqrt{np(1-p)} = \sqrt{200\cdot0.05\cdot0.95} = \sqrt{9.5} \approx 3.082$. Quan sát $16$ lỗi:
$$z = \frac{16 - 10}{3.082} \approx \mathbf{1.95}$$
$z \approx 1.95 < 1.96$ (mốc một đuôi/hai đuôi $5\%$). Sát ngưỡng nhưng **chưa vượt** → ở $\alpha = 0.05$ **chưa đủ bằng chứng bác bỏ** tuyên bố $\le 5\%$ lỗi (kết quả "ranh giới" — nên lấy thêm mẫu). Nếu kiểm một phía $H_1: p > 0.05$ thì p-value $\approx P(Z > 1.95) \approx 0.026 < 0.05$ → **bác bỏ**; chọn một phía/hai phía phải quyết trước khi xem dữ liệu.

---

## 8. 🎉 HOÀN THÀNH MATH (48/48)!

```
✅ Tier 1 — Arithmetic & Algebra (8/8)
✅ Tier 2 — Geometry (8/8)
✅ Tier 3 — Trig & Complex (8/8)
✅ Tier 4 — Calculus 1-var (8/8)
✅ Tier 5 — NT, Combinatorics, Logic (8/8)
✅ Tier 6 — Advanced (8/8)
```

## 📝 Tổng kết Tier 6

1. **Vector & ma trận**: ngôn ngữ tuyến tính tính.
2. **Định thức**: tỉ lệ phóng đại diện tích. Khả nghịch $\iff \det \neq 0$.
3. **Trị riêng**: hướng "bất biến" của ma trận. Cốt lõi PCA.
4. **Hàm nhiều biến**: gradient, Hessian, cực trị 2D.
5. **Tích phân kép/bội**: thể tích, khối lượng.
6. **Chuỗi & Taylor**: xấp xỉ hàm bằng đa thức.
7. **ODE**: ngôn ngữ của khoa học (dao động, tăng trưởng, phóng xạ).
8. **XS-TK**: từ tung xúc xắc đến Bayes, AI/ML.

---

🎉 **Math complete!** Tiếp theo, bạn có thể đi sâu vào các lĩnh vực ứng dụng: [Vectors (AI/ML)](../../../Vectors/), [Physics](../../../Physics/), [Chemistry](../../../Chemistry/).
