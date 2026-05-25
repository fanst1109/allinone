# Lesson 03 — Biến ngẫu nhiên rời rạc (Discrete Random Variables)

Từ Lesson 01-02 ta đã quen với **biến cố** và **xác suất có điều kiện**. Nhưng trong thực tế ta hiếm khi quan tâm trực tiếp tới "biến cố trừu tượng" — ta quan tâm tới **con số**: bao nhiêu lần thành công, mất bao lâu, có bao nhiêu khách hàng. Bài này dạy bạn công cụ chính để mô hình hoá các con số đó: **biến ngẫu nhiên** và các **phân phối rời rạc kinh điển** (Bernoulli, Binomial, Geometric, Poisson).

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Hiểu **biến ngẫu nhiên (random variable)** đúng như nó là: một *hàm* từ không gian mẫu Ω sang ℝ — không phải "biến" theo nghĩa lập trình.
- Phân biệt **rời rạc (discrete)** vs **liên tục (continuous)** ở mức trực giác và mức hình thức.
- Tính được **PMF** (Probability Mass Function) cho 4 phân phối rời rạc kinh điển: **Bernoulli, Binomial, Geometric, Poisson**.
- Đọc và vẽ được **CDF** (Cumulative Distribution Function) dạng bậc thang.
- Hiểu **cầu nối Binomial → Poisson** khi n lớn, p nhỏ, np = λ.
- Liên hệ tới ML: sigmoid là Bernoulli, softmax là Categorical/Multinomial, sampling là cách máy "rút" một mẫu từ phân phối.

## Kiến thức tiền đề

- [Lesson 01 — Xác suất cơ bản](../lesson-01-probability-basics/) — Ω, biến cố, tiên đề Kolmogorov, tổ hợp C(n,k).
- [Lesson 02 — Xác suất có điều kiện + Bayes](../lesson-02-conditional-bayes/) — đặc biệt là **độc lập (independence)** vì Binomial = tổng n Bernoulli **độc lập**.
- [Algebra Lesson 03 — Lũy thừa và logarit](../../01-Algebra/lesson-03-exponents-logarithms/) — vì Poisson có `e^(-λ)`.
- [Calculus Lesson 08 — Tích phân và e](../../03-Calculus/lesson-08-integral-and-e/) — vì số Euler `e ≈ 2.71828` xuất hiện trong Poisson.

---

## 1. Vấn đề mở bài — vì sao ta cần "biến ngẫu nhiên"?

### 1.1. 💡 Trực giác — vì sao "biến cố" thôi là không đủ

Trong Lesson 01-02 ta nói về **biến cố**: "trời mưa", "xúc xắc ra số chẵn", "spam". Nhưng trong thực tế ta thường hỏi **bằng con số**:

- "Tung đồng xu **10 lần**, được mấy mặt ngửa?" → đáp án là một số nguyên 0, 1, 2, ..., 10.
- "Gửi 1000 email, có **bao nhiêu** bị mark spam?"
- "Trong **1 giờ**, có bao nhiêu khách bước vào quán?"
- "Phải đợi **bao lâu** đến lần thử nghiệm vaccine thành công đầu tiên?"

Ta cần một cách *gán cho mỗi outcome ω ∈ Ω một con số*. Đối tượng làm việc đó gọi là **biến ngẫu nhiên (random variable)** — viết tắt là **RV**.

> ❓ **Câu hỏi tự nhiên ngay**: tại sao gọi là "biến" — nó là biến số như x, y trong toán phổ thông hả?
>
> **Không.** Mặc dù viết bằng chữ X, Y, Z (thường viết hoa), **biến ngẫu nhiên KHÔNG phải biến số** — nó là **một hàm**. Nó nhận đầu vào là kết quả thí nghiệm ω và trả ra một số. Tên "biến ngẫu nhiên" là di sản lịch sử và hơi gây hiểu nhầm; hiểu đúng "RV = một hàm Ω → ℝ" sẽ giúp bạn tránh nhiều bẫy về sau.

### 1.2. Vấn đề cụ thể — "tung 10 đồng xu, P(được 7 ngửa) = ?"

Đặt vấn đề: tung 10 đồng xu công bằng. Tính xác suất *được đúng 7 mặt ngửa*.

- **Cách Lesson 01 (đếm thuần)**: Ω có `2^10 = 1024` outcome (mỗi đồng xu 2 trạng thái). Số outcome có đúng 7 ngửa = `C(10, 7) = 120`. Vậy P = `120 / 1024 ≈ 0.1172`.
- **Cách Lesson 03 (RV + phân phối)**: gọi X = số mặt ngửa trong 10 lần tung. Khi đó X ~ **Binomial(n=10, p=0.5)**. Tra/ tính công thức Binomial: `P(X=7) = C(10,7) · 0.5^7 · 0.5^3 = 120 · 1/128 · 1/8 = 120/1024 ≈ 0.1172`.

Hai cách cho cùng kết quả — không lạ. Nhưng cách thứ hai **mở rộng được**: cùng công thức trả lời được "tung 1000 đồng xu, được 543 ngửa", "gửi 1000 email với p_spam = 0.02, có 18 bị mark spam"... mà không cần đếm `2^1000` outcome.

> 📝 **Tóm tắt mục 1**: RV là một **hàm** Ω → ℝ. Nó cho phép ta nói về "con số" liên quan tới thí nghiệm ngẫu nhiên — và do đó dùng các công cụ giải tích/đại số quen thuộc, thay vì chỉ đếm.

---

## 2. Biến ngẫu nhiên — định nghĩa hình thức

### 2.1. 💡 Trực giác

Tung 1 đồng xu hai lần. Ω = {HH, HT, TH, TT}. Gọi X = số mặt ngửa. Khi đó X là một quy tắc gán:

| ω (outcome) | X(ω) |
|---|---|
| HH | 2 |
| HT | 1 |
| TH | 1 |
| TT | 0 |

X "ăn" ω và "nhả" số. Không có gì huyền bí. RV chính là quy tắc gán này.

### 2.2. Định nghĩa hình thức

> **Định nghĩa**. Cho không gian xác suất (Ω, ℱ, P). Một **biến ngẫu nhiên** là một hàm
>
> $$X : \Omega \to \mathbb{R}$$
>
> sao cho với mọi giá trị thực x, tập `{ω ∈ Ω : X(ω) ≤ x}` thuộc ℱ (tức là *đo được*).

Điều kiện đo được nghe đáng sợ, nhưng với mọi ví dụ trong bài này (Ω hữu hạn hoặc đếm được) nó luôn thoả mãn. Bạn có thể bỏ qua điều kiện này khi học, miễn nhớ: **RV = một hàm**.

### 2.3. Ký hiệu quan trọng — viết tắt

Trong văn xuôi xác suất, ta viết tắt rất nhiều. Phải làm quen ngay:

| Viết | Nghĩa đầy đủ |
|---|---|
| `P(X = 5)` | `P({ω ∈ Ω : X(ω) = 5})` |
| `P(X ≤ 3)` | `P({ω ∈ Ω : X(ω) ≤ 3})` |
| `P(2 ≤ X < 7)` | `P({ω ∈ Ω : 2 ≤ X(ω) < 7})` |
| `P(X ∈ A)` (A ⊆ ℝ) | `P({ω ∈ Ω : X(ω) ∈ A})` |

Cách viết tắt này giấu ω đi. Khi học mới, hãy "dịch ngược" về ω để khỏi nhầm.

### 2.4. Rời rạc vs Liên tục

| Tiêu chí | Rời rạc | Liên tục |
|---|---|---|
| Tập giá trị X(Ω) | Hữu hạn hoặc đếm được | Khoảng số thực (không đếm được) |
| Ví dụ | Số mặt ngửa, số xe, số khách | Chiều cao, thời gian, nhiệt độ |
| Đặc trưng phân phối | **PMF** p(x) = P(X = x) | **PDF** f(x) (xem Lesson 04) |
| P(X = x đơn lẻ) | Có thể > 0 | **Bằng 0** với mọi x đơn lẻ |
| Tính tổng / tích phân | Σ | ∫ |

Bài này tập trung **rời rạc**. Liên tục sẽ ở Lesson 04.

### 2.5. ❓ Câu hỏi tự nhiên

- *"Hai biến ngẫu nhiên khác nhau có thể có cùng phân phối không?"* — **Có**. Ví dụ X = số mặt ngửa khi tung đồng xu, Y = số nắng trong 1 lần dự báo thời tiết (mưa/nắng đồng xác suất). X và Y khác nhau (định nghĩa trên Ω khác nhau) nhưng cùng phân phối Bernoulli(0.5).
- *"Một RV có cần ăn toàn bộ Ω không?"* — **Có**, theo định nghĩa. Nhưng nhiều ω có thể được ánh xạ vào cùng giá trị x; điều đó hoàn toàn ổn (như HT và TH cùng cho X = 1).
- *"X(ω) có nhất định phải là số nguyên?"* — **Không**. RV nói chung nhận giá trị thực. RV **rời rạc** chỉ cần tập giá trị đếm được — có thể là {1/2, 1/3, 1/4, ...}.

### 2.6. 🔁 Dừng lại tự kiểm tra

Tung 1 xúc xắc, gọi Y = (mặt xúc xắc) mod 2. Liệt kê toàn bộ ánh xạ Y(ω) với ω ∈ {1, 2, 3, 4, 5, 6} và tính `P(Y = 0)`, `P(Y = 1)`.

<details>
<summary>Đáp án</summary>

Y(1)=1, Y(2)=0, Y(3)=1, Y(4)=0, Y(5)=1, Y(6)=0.

`P(Y = 0) = P({2, 4, 6}) = 3/6 = 1/2`. `P(Y = 1) = 1/2`. Vậy Y ~ Bernoulli(0.5).

</details>

📝 **Tóm tắt mục 2**:

- RV là **hàm** Ω → ℝ.
- Ký hiệu `P(X = x)` là viết tắt của `P({ω : X(ω) = x})`.
- Rời rạc: tập giá trị đếm được; đặc trưng bởi PMF.
- Hai RV có thể trùng phân phối dù định nghĩa khác nhau.

---

## 3. PMF — Probability Mass Function

### 3.1. 💡 Trực giác

"Mass" = khối lượng. PMF là cách *phân bổ khối lượng xác suất 1.0* lên các giá trị có thể của X. Tưởng tượng bạn có **1kg cát** và phải rải hết lên các cọc x = 0, 1, 2, ... — PMF p(x) là *bao nhiêu cát ở cọc x*.

### 3.2. Định nghĩa

> Với X là RV rời rạc, **PMF** là hàm
>
> $$p_X(x) = P(X = x), \quad x \in \mathbb{R}.$$

Hai tính chất bắt buộc của PMF:

1. **Không âm**: `p_X(x) ≥ 0` với mọi x.
2. **Tổng bằng 1**: `Σ_x p_X(x) = 1`, tổng lấy trên mọi x mà p(x) > 0 (gọi là **support** của X).

Nếu một hàm vi phạm 2 điều này → không phải PMF hợp lệ.

### 3.3. Walk-through 4 ví dụ cụ thể

**Ví dụ 1 — Tung 1 đồng xu công bằng.** Gọi X = 1 nếu ngửa, 0 nếu sấp.

| x | p(x) |
|---|---|
| 0 | 0.5 |
| 1 | 0.5 |

Kiểm tra: 0.5 + 0.5 = 1 ✓. Cả hai ≥ 0 ✓. Đây là phân phối **Bernoulli(0.5)**.

**Ví dụ 2 — Tung 1 xúc xắc đồng xác suất.** Gọi X = mặt xúc xắc.

| x | 1 | 2 | 3 | 4 | 5 | 6 |
|---|---|---|---|---|---|---|
| p(x) | 1/6 | 1/6 | 1/6 | 1/6 | 1/6 | 1/6 |

Tổng = 6 · 1/6 = 1 ✓. Đây là **Uniform(1, 6)** rời rạc.

**Ví dụ 3 — Tung 2 đồng xu, đếm số ngửa.** Ω = {HH, HT, TH, TT}, X = số ngửa.

| x | Outcomes | p(x) |
|---|---|---|
| 0 | TT | 1/4 |
| 1 | HT, TH | 2/4 |
| 2 | HH | 1/4 |

Tổng = 1/4 + 2/4 + 1/4 = 1 ✓.

**Ví dụ 4 — Một hàm KHÔNG phải PMF.** `q(0) = 0.3, q(1) = 0.4, q(2) = 0.4`.

Tổng = 0.3 + 0.4 + 0.4 = 1.1 ≠ 1 → KHÔNG hợp lệ. Hoặc `q(0) = 0.5, q(1) = -0.1, q(2) = 0.6`: tổng = 1 nhưng có giá trị âm → KHÔNG hợp lệ.

### 3.4. PMF bằng đồ thị — biểu đồ "thanh" (stem plot)

Cách vẽ PMF rời rạc: với mỗi x trong support, vẽ **một thanh dọc** cao bằng p(x) tại điểm x. Giữa các điểm — KHÔNG có gì (xác suất bằng 0). Đây là khác biệt rất rõ với PDF của RV liên tục (đường cong trơn).

```
p(x)
 |
0.4 |        █
0.3 |        █     █
0.2 |  █     █     █     █
0.1 |  █     █     █     █
 0  +--+-----+-----+-----+-----> x
    0  1     2     3     4
```

### 3.5. ❓ Câu hỏi tự nhiên

- *"P(X = x) có thể bằng 1 không?"* — **Có**, đó là RV "thoái hoá" (degenerate). Ví dụ X ≡ 5 (luôn bằng 5). PMF: p(5) = 1, p(x) = 0 ngoài 5.
- *"PMF có thể có vô hạn điểm support không?"* — **Có**, miễn là tổng hội tụ về 1. Ví dụ Geometric, Poisson đều có support {0, 1, 2, ...}.
- *"Tại sao gọi là 'mass' chứ không phải 'density'?"* — Vì khối lượng "tập trung" tại các điểm rời rạc, không "trải" liên tục như PDF. PDF mới gọi là density.

### 3.6. ⚠ Lỗi thường gặp

- Quên ràng buộc `Σ p(x) = 1` → đề xuất một "phân phối" tự chế nhưng không hợp lệ.
- Nhầm p(x) với P(X ≤ x). p(x) là PMF (giá trị tại điểm); P(X ≤ x) là CDF (tích luỹ tới x).
- Viết p(x) cho RV liên tục — sai. Liên tục dùng PDF f(x); P(X = x) luôn = 0.

### 3.7. 🔁 Dừng lại tự kiểm tra

Cho RV X có PMF: p(1) = 0.1, p(2) = 0.2, p(3) = c, p(4) = 0.3. Tìm c và tính `P(X ≤ 2)`, `P(X > 2)`.

<details>
<summary>Đáp án</summary>

Vì `0.1 + 0.2 + c + 0.3 = 1` → c = 0.4.

`P(X ≤ 2) = p(1) + p(2) = 0.1 + 0.2 = 0.3`.

`P(X > 2) = p(3) + p(4) = 0.4 + 0.3 = 0.7`. Kiểm tra: 0.3 + 0.7 = 1 ✓.

</details>

📝 **Tóm tắt mục 3**:

- PMF: `p_X(x) = P(X = x)`.
- Hai điều kiện: ≥ 0 và Σ = 1.
- Đồ thị PMF là biểu đồ thanh (stem) — không phải đường cong liên tục.

---

## 4. Phân phối Bernoulli — Ber(p)

### 4.1. 💡 Trực giác — đồng xu lệch

Bernoulli là **mẹ của mọi phân phối rời rạc**. Mô hình: tung **một** đồng xu lệch, xác suất ngửa = p (không nhất thiết 0.5).

- X = 1 nếu **thành công** (ngửa, hoặc bất cứ outcome "tốt" ta định nghĩa) — xác suất p.
- X = 0 nếu **thất bại** — xác suất 1 - p (thường ký hiệu q).

Ứng dụng đời thực: kết quả của bất cứ phép thử nhị phân nào — kit thử nhanh dương/âm tính, email spam/ham, click/không click quảng cáo, vaccine có/không tác dụng phụ.

### 4.2. PMF

> **Ber(p)**, p ∈ [0, 1]:
>
> $$p_X(0) = 1 - p, \qquad p_X(1) = p.$$
>
> Gọn lại: `p_X(x) = p^x · (1-p)^(1-x)` với x ∈ {0, 1}.

Công thức gọn nhìn lạ nhưng kiểm tra dễ: thay x = 1 → `p^1 · (1-p)^0 = p`; thay x = 0 → `p^0 · (1-p)^1 = 1-p`. ✓

### 4.3. Walk-through — kit thử nhanh có độ chính xác 95%

Một kit thử nhanh COVID có độ nhạy 95% (test đúng dương khi bệnh nhân thực sự dương). Một bệnh nhân dương đã biết → kit báo. Gọi X = 1 nếu kit báo dương, 0 nếu báo âm.

- X ~ Bernoulli(0.95).
- p(1) = 0.95, p(0) = 0.05.
- Kiểm tra: 0.95 + 0.05 = 1 ✓.

### 4.4. Kỳ vọng và phương sai (preview — sẽ chứng minh ở Lesson 06)

| Đại lượng | Công thức |
|---|---|
| Kỳ vọng E[X] | p |
| Phương sai Var(X) | p(1 - p) |

Walk-through: với p = 0.95: E[X] = 0.95 (trung bình thì kết quả gần 1). Var = 0.95 · 0.05 = 0.0475. Với p = 0.5: Var = 0.25 (cực đại — đồng xu công bằng "khó đoán" nhất).

### 4.5. ⚠ Lỗi thường gặp

- Quên rằng X chỉ nhận 2 giá trị 0 và 1. Nếu ai đó nói "X ~ Ber(p), tính P(X = 2)" — đó là 0.
- Nhầm p với 1-p. Quy ước: p luôn là xác suất **thành công** (X = 1). Khi đọc đề, xác định rõ "thành công" là sự kiện nào.

### 4.6. 🔁 Dừng lại tự kiểm tra

Một email có xác suất 0.02 bị mark spam. Gọi X = 1 nếu spam, 0 nếu ham. X có phân phối gì? Tính p(0), p(1).

<details>
<summary>Đáp án</summary>

X ~ Bernoulli(0.02). p(1) = 0.02, p(0) = 0.98.

</details>

📝 **Tóm tắt mục 4**:

- Ber(p): X ∈ {0, 1}, p(1) = p.
- Mô hình hoá mọi phép thử nhị phân (thành công/thất bại).
- E[X] = p, Var = p(1-p), cực đại tại p = 0.5.

---

## 5. Phân phối Binomial — Bin(n, p)

### 5.1. 💡 Trực giác — n đồng xu độc lập, đếm số thành công

Binomial = "tung Bernoulli **n lần độc lập** rồi đếm thành công".

- Phép thử: n lần Bernoulli(p) độc lập (cùng p).
- X = số lần thành công.
- X ∈ {0, 1, 2, ..., n}.

Ứng dụng: gửi 1000 email, đếm số bị mark spam. Tung 10 đồng xu, đếm số ngửa. Làm test có 50 câu trắc nghiệm, đoán bừa — đếm số câu đúng.

### 5.2. Dẫn PMF từ trực giác

Muốn có đúng **k** thành công trong **n** lần thử. Một cấu hình cụ thể (ví dụ "thành công ở lần 1, 3, 7, ..." rồi thất bại ở các lần còn lại) có xác suất:

`p^k · (1-p)^(n-k)`

vì n lần thử **độc lập**, xác suất nhân nhau. Số cấu hình như vậy = số cách chọn k vị trí trong n vị trí = `C(n, k)`. Cộng lại:

> **Bin(n, p)**, n ∈ ℕ, p ∈ [0, 1]:
>
> $$P(X = k) = \binom{n}{k} p^k (1-p)^{n-k}, \quad k = 0, 1, \dots, n.$$

### 5.3. Walk-through 4 ví dụ

**VD1 — Tung 3 đồng xu công bằng, đếm số ngửa.** n = 3, p = 0.5.

| k | C(3,k) | p^k | (1-p)^(n-k) | P(X=k) |
|---|---|---|---|---|
| 0 | 1 | 1 | 0.125 | 1/8 = 0.125 |
| 1 | 3 | 0.5 | 0.25 | 3/8 = 0.375 |
| 2 | 3 | 0.25 | 0.5 | 3/8 = 0.375 |
| 3 | 1 | 0.125 | 1 | 1/8 = 0.125 |

Tổng = 0.125 + 0.375 + 0.375 + 0.125 = 1 ✓.

**VD2 — Tung 10 đồng xu, P(X = 7).** n = 10, p = 0.5, k = 7.

`P(X = 7) = C(10, 7) · 0.5^7 · 0.5^3 = 120 · 0.5^10 = 120 / 1024 ≈ 0.1172`.

(Khớp với mục 1.2.)

**VD3 — 1000 email, p_spam = 0.02, P(X ≤ 30 bị spam).** n = 1000, p = 0.02.

Đây phải cộng `Σ_{k=0}^{30} C(1000, k) · 0.02^k · 0.98^(1000-k)`. Tính tay không xong — máy tính ra ≈ 0.978. Mục 9 sẽ chỉ cách xấp xỉ bằng Poisson với λ = np = 20.

**VD4 — 50 câu trắc nghiệm 4 đáp án, đoán bừa, P(X ≥ 30 đúng).** n = 50, p = 0.25.

E[X] = np = 12.5. Để được 30 trên 12.5 trung bình là rất hiếm. Tính máy: P(X ≥ 30) ≈ 4.7 × 10⁻⁸ — gần như không có khả năng. (Đây là intuition về vì sao "đoán bừa" không qua được bài thi nghiêm).

### 5.4. Kiểm tra tổng = 1 (định lý nhị thức)

Để PMF Binomial hợp lệ, cần `Σ_{k=0}^n C(n,k) p^k (1-p)^(n-k) = 1`. Đây chính là **định lý nhị thức**:

`(a + b)^n = Σ_{k=0}^n C(n,k) a^k b^(n-k)`.

Thay a = p, b = 1-p: vế phải = (p + (1-p))^n = 1^n = 1 ✓.

### 5.5. Kỳ vọng và phương sai (preview)

| Đại lượng | Bin(n, p) |
|---|---|
| E[X] | np |
| Var(X) | np(1-p) |

Trực giác: vì X = X₁ + X₂ + ... + Xₙ (tổng n Bernoulli độc lập), nên E[X] = n · E[X_i] = np (tính tuyến tính kỳ vọng — Lesson 06). Var cũng cộng được vì độc lập.

### 5.6. ❓ Câu hỏi tự nhiên

- *"Bin(1, p) = Ber(p) phải không?"* — **Đúng**. Tung 1 lần Bernoulli và đếm số thành công thì kết quả y hệt Bernoulli.
- *"Nếu n lần thử KHÔNG độc lập, có còn Binomial?"* — **Không**. Ví dụ rút 5 lá bài không hoàn (không trả lại) → đếm số con J — đây là **Hypergeometric**, không phải Binomial.
- *"Nếu các phép thử độc lập nhưng p khác nhau (lần 1 p=0.3, lần 2 p=0.5...)?"* — Đây là **Poisson-Binomial** (tên kỳ lạ nhưng có thật). Trong bài này ta chỉ học p cố định.
- *"Khi n quá lớn, công thức không tính được — sao đây?"* — Dùng xấp xỉ Poisson (mục 9) hoặc Gaussian (Lesson 05).

### 5.7. ⚠ Lỗi thường gặp

- **Nhầm C(n, k) với P(n, k)** (hoán vị có thứ tự). Binomial dùng tổ hợp (không thứ tự) vì ta chỉ đếm "có bao nhiêu thành công", không quan tâm chúng xảy ra ở lần thứ mấy.
- **Quên điều kiện độc lập**. Nếu các lần thử có ảnh hưởng nhau (rút không hoàn, học sinh hỏi bài nhau...) thì không phải Binomial.
- **Đảo p và 1-p**. Luôn xác định rõ "thành công" trước khi viết công thức.
- Quên rằng `0^0 = 1` quy ước trong công thức Binomial. Khi p = 0, k = 0 thì `0^0 · 1^n = 1`, đúng.

### 5.8. 🔁 Dừng lại tự kiểm tra

Câu hỏi 1: Một đồng xu lệch ngửa với xác suất 0.6. Tung 5 lần. Tính `P(đúng 3 lần ngửa)`.

<details>
<summary>Đáp án</summary>

X ~ Bin(5, 0.6). `P(X = 3) = C(5,3) · 0.6^3 · 0.4^2 = 10 · 0.216 · 0.16 = 0.3456`.

</details>

Câu hỏi 2: Cùng đồng xu trên, P(ít nhất 1 lần ngửa trong 5 lần).

<details>
<summary>Đáp án</summary>

P(X ≥ 1) = 1 - P(X = 0) = 1 - C(5,0) · 0.6^0 · 0.4^5 = 1 - 0.01024 = 0.98976.

</details>

📝 **Tóm tắt mục 5**:

- Bin(n, p) = tổng n Bernoulli(p) **độc lập**.
- `P(X = k) = C(n,k) p^k (1-p)^(n-k)`.
- E = np, Var = np(1-p).
- Cần kiểm tra: cùng p và độc lập.

---

## 6. Phân phối hình học — Geometric Geo(p)

### 6.1. 💡 Trực giác — "đợi đến lần thành công đầu tiên"

Hình dung: bạn tung 1 đồng xu lệch (P(ngửa) = p) **liên tục** cho đến khi **được ngửa lần đầu**. Câu hỏi: bạn phải tung mấy lần?

- Lần 1 ngửa luôn → X = 1, xác suất p.
- Lần 1 sấp, lần 2 ngửa → X = 2, xác suất (1-p)·p.
- Lần 1, 2 sấp, lần 3 ngửa → X = 3, xác suất (1-p)²·p.
- ...

### 6.2. PMF

> **Geo(p)** (theo quy ước "đếm lần tung đến và bao gồm lần thành công đầu tiên"), p ∈ (0, 1]:
>
> $$P(X = k) = (1-p)^{k-1} \cdot p, \quad k = 1, 2, 3, \dots$$

⚠ **Cảnh báo quy ước**: có **2 quy ước** Geometric trong các sách:

| Quy ước | Hỗ trợ | PMF |
|---|---|---|
| (A) Đếm tổng số lần tung đến và bao gồm lần thành công đầu | k = 1, 2, 3, ... | (1-p)^(k-1) · p |
| (B) Đếm số lần **thất bại** trước lần thành công đầu | k = 0, 1, 2, ... | (1-p)^k · p |

Hai quy ước lệch nhau 1 đơn vị. Bài này dùng quy ước (A). Khi đọc bài khác (Python `numpy.random.geometric` dùng (A), `scipy.stats.geom` dùng (A), nhưng nhiều sách Mỹ dùng (B)) — luôn check.

### 6.3. Tổng PMF = 1 (kiểm tra)

`Σ_{k=1}^∞ (1-p)^(k-1) · p = p · Σ_{k=0}^∞ (1-p)^k = p · 1/(1-(1-p)) = p · 1/p = 1 ✓`.

(Dùng tổng cấp số nhân vô hạn `Σ r^k = 1/(1-r)` khi |r| < 1.)

### 6.4. Walk-through — chơi xổ số, p = 0.01

Giả sử mỗi vé xổ số xác suất trúng = 0.01 độc lập. X = số vé phải mua đến khi trúng lần đầu.

| k | P(X = k) | Diễn giải |
|---|---|---|
| 1 | 0.01 | Vé đầu trúng luôn |
| 2 | 0.99 · 0.01 = 0.0099 | Vé 1 trượt, vé 2 trúng |
| 10 | 0.99^9 · 0.01 ≈ 0.00914 | |
| 100 | 0.99^99 · 0.01 ≈ 0.003697 | |
| 200 | 0.99^199 · 0.01 ≈ 0.001362 | |

E[X] = 1/p = 100 (trung bình phải mua 100 vé để trúng 1 lần — chứng minh ở Lesson 06).

### 6.5. Tính chất "không có ký ức" (memoryless)

Một tính chất rất đặc biệt của Geometric:

> `P(X > m + n | X > m) = P(X > n)`

Nghĩa là: nếu đã mua 50 vé chưa trúng, xác suất phải mua thêm ít nhất 10 vé nữa = xác suất một người mới bắt đầu phải mua ít nhất 10 vé. **Quá khứ không quan trọng**.

Walk-through: p = 0.1. P(X > 3) = (1-p)^3 = 0.729. P(X > 5 | X > 2) = P(X > 5)/P(X > 2) = 0.9^5 / 0.9^2 = 0.9^3 = 0.729. ✓

Điều này phản trực giác mạnh — nhiều người tin "đã trượt nhiều thì khả năng trúng lần sau cao hơn" (gambler's fallacy). Không phải. Vé tiếp theo vẫn p = 0.01 độc lập.

### 6.6. ❓ Câu hỏi tự nhiên

- *"Nếu p = 0 thì sao?"* — Mãi không thành công. X = ∞ (không xác định trong ℝ). Quy ước p > 0.
- *"Geometric khác Binomial chỗ nào?"* — Bin cố định n, đếm thành công. Geo cố định thành công = 1, đếm n. Hai cái "đối ngẫu".
- *"Có phân phối nào đợi đến thành công thứ r không?"* — Có, **Negative Binomial** (vượt khỏi bài này).

### 6.7. ⚠ Lỗi thường gặp

- Quên đề cập quy ước A/B → đáp án lệch 1.
- Áp dụng memoryless cho RV không có tính chất này (như Binomial — nhớ rõ số thử còn lại).

### 6.8. 🔁 Dừng lại tự kiểm tra

Một quảng cáo Facebook có CTR = 5%. Bạn show liên tục cho người dùng cho đến khi có click đầu tiên. Tính P(cần đúng 10 lần show).

<details>
<summary>Đáp án</summary>

X ~ Geo(0.05). `P(X = 10) = 0.95^9 · 0.05 ≈ 0.6302 · 0.05 ≈ 0.0315`.

</details>

📝 **Tóm tắt mục 6**:

- Geo(p) = đợi đến thành công đầu tiên.
- `P(X = k) = (1-p)^(k-1) · p`.
- E[X] = 1/p.
- Memoryless: không phụ thuộc quá khứ.

---

## 7. Phân phối Poisson — Poi(λ)

### 7.1. 💡 Trực giác — "đếm số sự kiện trong một khoảng"

Poisson mô hình hoá **số sự kiện hiếm xảy ra trong một khoảng cố định** (thời gian / không gian), với điều kiện:

- Các sự kiện độc lập.
- Tần suất trung bình (rate) λ cố định.
- Trong một khoảng đủ nhỏ, xác suất nhiều hơn 1 sự kiện là bỏ qua được.

Ứng dụng:

- Số xe qua một đoạn cầu trong 1 phút (trung bình λ = 3 xe/phút).
- Số cuộc gọi tới tổng đài trong 1 giờ.
- Số email spam nhận được trong 1 ngày.
- Số sao mới phát hiện trong 1 đêm quan sát thiên văn.
- Số mutation trong một đoạn DNA cố định.

### 7.2. PMF

> **Poi(λ)**, λ > 0:
>
> $$P(X = k) = \frac{e^{-\lambda} \lambda^k}{k!}, \quad k = 0, 1, 2, \dots$$

Support là **toàn bộ số nguyên không âm** — không có chặn trên. Khác Binomial (chặn n) và Bernoulli (chỉ {0,1}).

### 7.3. Kiểm tra tổng = 1

`Σ_{k=0}^∞ e^(-λ) λ^k / k! = e^(-λ) · Σ_{k=0}^∞ λ^k / k! = e^(-λ) · e^λ = 1 ✓`.

(Dùng chuỗi Taylor của hàm mũ `e^x = Σ x^k/k!`.)

### 7.4. Walk-through — số xe qua cầu, λ = 3 xe/phút

Một đoạn cầu trung bình có 3 xe/phút đi qua. Trong 1 phút bất kỳ:

| k | e^-3 · 3^k / k! | Giá trị |
|---|---|---|
| 0 | e^-3 · 1 / 1 | 0.0498 |
| 1 | e^-3 · 3 / 1 | 0.1494 |
| 2 | e^-3 · 9 / 2 | 0.2240 |
| 3 | e^-3 · 27 / 6 | 0.2240 |
| 4 | e^-3 · 81 / 24 | 0.1680 |
| 5 | e^-3 · 243 / 120 | 0.1008 |
| 6 | e^-3 · 729 / 720 | 0.0504 |
| 7 | | 0.0216 |
| 8 | | 0.0081 |
| ≥9 | | 0.0038 |

Tổng ≈ 1.0000 ✓ (sai số làm tròn).

Nhận xét: mode (giá trị nhiều khả năng nhất) ≈ ⌊λ⌋ = 3 hoặc ⌊λ⌋ + 1. Đây là chung cho Poisson.

### 7.5. Walk-through 2 — email spam, λ = 20 spam/ngày

Bạn trung bình nhận 20 email spam/ngày. P(hôm nay nhận đúng 25)?

`P(X = 25) = e^-20 · 20^25 / 25!`

Tính từng phần:
- 20^25 ≈ 3.355 × 10^32
- 25! ≈ 1.551 × 10^25
- e^-20 ≈ 2.061 × 10^-9

`P = 2.061·10^-9 · 3.355·10^32 / 1.551·10^25 ≈ 4.460 × 10^-2 ≈ 0.0446`.

Tức xác suất ≈ 4.5%. P(X ≤ 20) ≈ 0.559 (về quá nửa thì ≤ trung bình).

### 7.6. Kỳ vọng và phương sai (preview)

| Đại lượng | Poi(λ) |
|---|---|
| E[X] | λ |
| Var(X) | λ |

**Đặc trưng**: kỳ vọng = phương sai = λ. Điều này độc nhất với Poisson — nếu data thực có E ≈ Var thì khả năng cao là Poisson. Nếu Var > E nhiều (overdispersion) → cần Negative Binomial.

### 7.7. ❓ Câu hỏi tự nhiên

- *"Đơn vị của λ?"* — Cùng đơn vị với "số sự kiện trong khoảng". Nếu λ = 3 xe/phút thì với 10 phút, dùng λ' = 30. Poisson "scale" được theo thời gian.
- *"Phải kiểm tra điều kiện gì để dùng Poisson?"* — Các sự kiện độc lập + tần suất ổn định. Nếu có chu kỳ (giờ cao điểm vs giờ thấp điểm) → cần model phức tạp hơn.
- *"Poisson và Bernoulli có liên hệ không?"* — Có, qua Binomial (mục 9).

### 7.8. ⚠ Lỗi thường gặp

- Quên `e^(-λ)` (chỉ viết λ^k / k!) → tổng không = 1.
- Tính `k!` sai khi k lớn (vd `25! = 15511210043330985984000000` rất dễ tràn số). Trong code, dùng log:
  `log P = -λ + k · log λ - log(k!)`, rồi exp ngược.
- Nhầm λ với p. λ là **tần suất tuyệt đối**, không phải xác suất. λ có thể > 1 (vd λ = 20). p luôn ≤ 1.

### 7.9. 🔁 Dừng lại tự kiểm tra

Một website trung bình 5 lỗi 500 mỗi giờ. Tính P(trong 1 giờ tới có 0 lỗi).

<details>
<summary>Đáp án</summary>

X ~ Poi(5). `P(X = 0) = e^-5 · 5^0 / 0! = e^-5 ≈ 0.00674` ≈ 0.67%.

(Tức 99.33% là có ít nhất 1 lỗi — bạn nên dậy sớm.)

</details>

📝 **Tóm tắt mục 7**:

- Poi(λ): số sự kiện trong khoảng cố định.
- `P(X = k) = e^-λ · λ^k / k!`.
- E = Var = λ.
- Support: {0, 1, 2, ...} (không chặn trên).

---

## 8. CDF — Cumulative Distribution Function

### 8.1. 💡 Trực giác

PMF cho biết khối lượng *tại* từng x. CDF cho biết khối lượng **tích luỹ** từ -∞ tới x.

> $$F_X(x) = P(X \le x) = \sum_{t \le x} p_X(t).$$

Hình dung: PMF là từng cọc rời rạc. CDF là *quãng đường tích luỹ đi từ trái sang phải* — mỗi khi gặp một cọc, CDF "nhảy bậc" thêm chiều cao bằng p(x). Giữa các cọc, CDF *phẳng* (vì không có khối lượng).

### 8.2. Walk-through — tung 2 đồng xu, X = số ngửa

PMF (đã có ở mục 3.3):

| x | 0 | 1 | 2 |
|---|---|---|---|
| p(x) | 0.25 | 0.5 | 0.25 |

CDF:

| x | F(x) | Diễn giải |
|---|---|---|
| x < 0 | 0 | Chưa gặp cọc nào |
| 0 ≤ x < 1 | 0.25 | Đã qua cọc 0, chưa qua cọc 1 |
| 1 ≤ x < 2 | 0.75 | Đã qua cọc 0 và 1 |
| x ≥ 2 | 1 | Đã qua hết |

Vẽ:

```
F(x)
 1.0 +-----------●━━━━━━━
     |           |
 0.75|     ●━━━━━╋
     |     |
 0.25|━━━━━╋
     |     |
 0.0 ●━━━━━
     +-----+-----+-----+--→ x
     -1    0     1     2
```

(● = mép kín, ━ = đoạn liên tục, ╋ = giao điểm)

Chú ý: CDF **liên tục bên phải** (right-continuous) — tại x = 1, F(1) = 0.75 (lấy giá trị "đỉnh nhảy"), không phải 0.25.

### 8.3. Tính chất của CDF

1. **Đơn điệu không giảm**: x₁ ≤ x₂ → F(x₁) ≤ F(x₂).
2. **Giới hạn**: `lim_{x→-∞} F(x) = 0`, `lim_{x→+∞} F(x) = 1`.
3. **Liên tục bên phải**: `lim_{ε↘0} F(x+ε) = F(x)`.
4. **Bước nhảy tại x = giá trị support**: `F(x) - F(x⁻) = p(x)`.

Tính chất 4 cực hữu ích: nếu có CDF, bạn lấy *độ cao bước nhảy* → ra PMF. Hai cái tương đương về thông tin.

### 8.4. Walk-through CDF của Poisson(3)

Từ PMF ở mục 7.4:

| x | p(x) | F(x) = p(0)+...+p(x) |
|---|---|---|
| 0 | 0.0498 | 0.0498 |
| 1 | 0.1494 | 0.1992 |
| 2 | 0.2240 | 0.4232 |
| 3 | 0.2240 | 0.6472 |
| 4 | 0.1680 | 0.8152 |
| 5 | 0.1008 | 0.9160 |
| 6 | 0.0504 | 0.9664 |
| 7 | 0.0216 | 0.9880 |
| 8 | 0.0081 | 0.9961 |

Đọc: "Xác suất ≤ 5 xe qua cầu trong 1 phút" = F(5) = 0.9160 = 91.6%.

### 8.5. Dùng CDF để tính xác suất khoảng

- `P(X ≤ a) = F(a)`.
- `P(X < a) = F(a⁻) = F(a) - p(a)` (cẩn thận với rời rạc).
- `P(X > a) = 1 - F(a)`.
- `P(a < X ≤ b) = F(b) - F(a)`.
- `P(a ≤ X ≤ b) = F(b) - F(a⁻) = F(b) - F(a) + p(a)`.

Walk-through: Poi(3), P(2 ≤ X ≤ 5) = F(5) - F(1) = 0.9160 - 0.1992 = 0.7168.

### 8.6. ❓ Câu hỏi tự nhiên

- *"Sao quan tâm tới CDF khi đã có PMF?"* — Vì CDF tổng quát hoá được cho cả RV liên tục (Lesson 04). PDF không định nghĩa được khi X có "khối lượng" tại một điểm cụ thể, nhưng CDF luôn tồn tại. CDF là *ngôn ngữ chung* giữa rời rạc và liên tục.
- *"Tại sao CDF liên tục bên phải, không phải bên trái?"* — Quy ước. Vì định nghĩa P(X ≤ x) lấy dấu "≤" (bao gồm), nên tại bước nhảy, F lấy giá trị cao hơn. Nếu ai định nghĩa F(x) = P(X < x) thì liên tục bên trái — rất hiếm.
- *"CDF có nghịch đảo không?"* — Có, gọi là **quantile function** (hàm phân vị). F⁻¹(0.95) = "giá trị mà 95% phân phối nằm dưới nó". Dùng để sinh mẫu (sampling) bằng phương pháp inverse-transform.

### 8.7. ⚠ Lỗi thường gặp

- Cộng PMF không bao gồm endpoint cần thiết. P(X ≤ 5) bao gồm X = 5; P(X < 5) thì không.
- Tin rằng `F(a) - F(b)` (khi a < b) → âm. CDF không giảm nên thứ tự phải là F(b) - F(a).
- Vẽ CDF như đường cong liên tục dù X rời rạc → sai. CDF của RV rời rạc là **hàm bậc thang**.

### 8.8. 🔁 Dừng lại tự kiểm tra

X ~ Bin(5, 0.5). Tính F(3) = P(X ≤ 3).

<details>
<summary>Đáp án</summary>

p(0) = C(5,0)·0.5^5 = 1/32
p(1) = C(5,1)·0.5^5 = 5/32
p(2) = C(5,2)·0.5^5 = 10/32
p(3) = C(5,3)·0.5^5 = 10/32

F(3) = (1 + 5 + 10 + 10) / 32 = 26/32 = 0.8125.

</details>

📝 **Tóm tắt mục 8**:

- `F(x) = P(X ≤ x)` — hàm tích luỹ.
- Bậc thang với RV rời rạc.
- Độ cao bước nhảy tại x = p(x).
- CDF luôn tồn tại và đơn điệu không giảm; PMF có thể tái tạo từ CDF.

---

## 9. Liên hệ Bernoulli — Binomial — Poisson

### 9.1. 💡 Bức tranh chung

Ba phân phối này không phải 3 thực thể độc lập — chúng nằm trên **một chuỗi**:

```
Bernoulli   →   Binomial   →   Poisson
1 phép thử      n phép thử      n → ∞, p → 0, np = λ
```

- Bernoulli(p) = Bin(1, p).
- Binomial(n, p) = tổng n Bernoulli(p) độc lập.
- Poisson(λ) = giới hạn Binomial khi n lớn cực, p nhỏ cực, sao cho np = λ giữ nguyên.

### 9.2. Chứng minh giới hạn Binomial → Poisson

Cho λ cố định. Đặt n lớn, p = λ/n. Tính `P(X = k)` cho X ~ Bin(n, λ/n):

`P(X = k) = C(n, k) · (λ/n)^k · (1 - λ/n)^(n-k)`

Phân tích từng phần khi n → ∞:

- `C(n,k) = n!/(k!(n-k)!) = n(n-1)···(n-k+1) / k!`. Với k cố định, n → ∞: tử ≈ n^k. Vậy `C(n,k) ≈ n^k / k!`.
- `(λ/n)^k = λ^k / n^k`.
- `(1 - λ/n)^n → e^(-λ)` (giới hạn quen thuộc — xem Calculus Lesson 08).
- `(1 - λ/n)^(-k) → 1` (vì λ/n → 0, k cố định).

Ghép lại:

`P(X = k) ≈ (n^k / k!) · (λ^k / n^k) · e^(-λ) · 1 = λ^k · e^(-λ) / k!`.

Đây chính là PMF Poisson(λ). ∎

### 9.3. Walk-through — kiểm chứng bằng số

Lấy λ = 2. So sánh PMF Bin(n, 2/n) với Poi(2) cho k = 3:

| n | p = 2/n | C(n,3)·p^3·(1-p)^(n-3) | Poi(2), P(X=3) |
|---|---|---|---|
| 10 | 0.2 | 10·1·8 / 1000 · 0.8^7 = 0.2013 | 0.1804 |
| 100 | 0.02 | C(100,3)·0.02^3·0.98^97 = 0.1823 | 0.1804 |
| 1000 | 0.002 | 0.1806 | 0.1804 |
| 10000 | 0.0002 | 0.1804 | 0.1804 |

Khi n tăng, Binomial hội tụ về Poisson rất nhanh.

### 9.4. Khi nào dùng xấp xỉ Poisson?

Quy tắc thực tế (rule-of-thumb):

- **n ≥ 50** và **p ≤ 0.05** (hoặc np ≤ 10).
- Dấu hiệu: tính C(n,k) tay không xong vì n lớn, p nhỏ — đổi sang Poisson(np).

Ví dụ trở lại VD3 mục 5.3: n = 1000, p = 0.02, np = 20. P(X ≤ 30) ≈ P(Y ≤ 30) với Y ~ Poi(20) ≈ 0.987. So với Bin exact ≈ 0.978 — sai số nhỏ, nhưng tính dễ hơn nhiều.

### 9.5. ❓ Câu hỏi tự nhiên

- *"Tại sao p phải nhỏ?"* — Poisson mô hình "sự kiện hiếm". Nếu p lớn (vd 0.5), từng sự kiện không còn hiếm → Poisson không xấp xỉ tốt. Lúc này dùng Gaussian (Lesson 05) thay.
- *"Có hệ thức Poisson → cái gì không?"* — Poisson là một trong những "phân phối Stable" qua phép cộng: Poi(λ₁) + Poi(λ₂) (độc lập) = Poi(λ₁ + λ₂). Binomial thì không "cộng được" trừ khi cùng p.

📝 **Tóm tắt mục 9**:

- Ber → Bin → Poi là một chuỗi giới hạn.
- Bin(n,p) ≈ Poi(np) khi n lớn, p nhỏ.
- Dùng xấp xỉ Poisson khi n lớn để tránh tính C(n,k) cồng kềnh.

---

## 10. Liên hệ tới ML

### 10.1. Bernoulli là output của **binary classification**

Một mô hình phân loại nhị phân (spam/ham, ung thư/không) thường output **xác suất** `p = σ(z)` với σ là sigmoid và z là logit. Chính p này là tham số của **Bernoulli(p)**:

- Nhãn thật y ∈ {0, 1} là một mẫu rút từ Ber(p).
- Loss = **negative log-likelihood (NLL) của Bernoulli** = `-y log p - (1-y) log(1-p)` = **binary cross-entropy**.

Cross-entropy chính là MLE cho Bernoulli — sẽ chứng minh ở [Lesson 07 — MLE](../lesson-07-mle/) và [Lesson 08 — Cross-entropy + KL](../lesson-08-cross-entropy-kl/).

### 10.2. Multinomial/Categorical là output của **multi-class classification**

Mở rộng Bernoulli sang K ≥ 3 lớp: phân phối **Categorical** (đôi khi gọi sai là Multinomial). Mô hình output vector xác suất `(p₁, ..., p_K)` với Σ p_i = 1 — đây chính là **softmax(z)**.

- Nhãn thật y ∈ {1, ..., K} là một mẫu rút từ Cat(p).
- Loss = **cross-entropy K-class** = `-Σ_i 1[y = i] log p_i = -log p_y`.

Mọi LLM (như GPT) output một Categorical trên *vocabulary 50k token* tại mỗi vị trí — chính là softmax cuối cùng. Train LLM ≈ MLE trên rất nhiều phân phối Categorical.

### 10.3. Sampling từ phân phối — dropout, augmentation, generative models

Trong khi inference, ta thường **rút mẫu** từ phân phối:

- **Dropout**: mỗi neuron có Bernoulli(p) bật/tắt. Output mỗi forward pass khác nhau (do sampling).
- **Augmentation**: rút ngẫu nhiên xoay/lật ảnh từ một phân phối các phép biến đổi → Categorical.
- **Generative sampling**: với LLM, sau khi softmax ra phân phối Cat trên vocab, *rút* một token theo phân phối đó (greedy = lấy argmax, beam search, top-k, top-p... đều là các chiến lược sampling khác nhau).

### 10.4. Poisson trong ML

- **Poisson regression**: khi target là **đếm** (số click, số bán hàng, số booking), GLM với link log → Poisson likelihood.
- **Mô hình hoá số token / số event**: trong NLP, số lần xuất hiện của một từ trong tài liệu thường được mô hình hoá bằng Poisson.

### 10.5. Geometric trong ML

Ít gặp trực tiếp, nhưng:

- Reinforcement learning có "discount factor γ" — phân phối kỳ vọng thời gian sống của một episode thường là Geometric.
- A/B testing: "khi nào cuộc thí nghiệm đủ data" — phân phối đợi thường liên quan Geo.

### 10.6. ❓ Câu hỏi tự nhiên

- *"Output của model có chắc là một phân phối hợp lệ không?"* — Sigmoid và softmax có thiết kế **bắt buộc** output ∈ (0, 1) và tổng = 1. Đó là lý do hai hàm này được chọn — chúng *bảo đảm* output là PMF/PDF hợp lệ.
- *"Cross-entropy với MLE liên quan gì?"* — Tối đa hoá log-likelihood ⇔ tối thiểu hoá negative log-likelihood ⇔ tối thiểu hoá cross-entropy. Ba cách nói cùng một thứ. Chứng minh ở Lesson 07, 08.

📝 **Tóm tắt mục 10**:

- Binary classification ↔ Bernoulli ↔ sigmoid + BCE.
- Multi-class ↔ Categorical ↔ softmax + cross-entropy.
- LLM = chuỗi Categorical trên vocab; sampling = rút token.
- Poisson dùng cho target dạng đếm.

---

## 11. Q&A tổng hợp

### 11.1. Bernoulli vs Binomial khác gì?

Một câu — **Bernoulli là 1 lần thử, Binomial là n lần thử**.

| Tiêu chí | Bernoulli(p) | Binomial(n, p) |
|---|---|---|
| Số phép thử | 1 | n |
| Tập giá trị | {0, 1} | {0, 1, ..., n} |
| Quan hệ | Bin(1, p) ≡ Ber(p) | Bin(n, p) = X₁ + ... + Xₙ với Xᵢ ~ Ber(p) độc lập |
| Câu hỏi điển hình | "Có thành công không?" | "Có bao nhiêu thành công?" |

### 11.2. Sample space của Bin(n, p) lớn cỡ nào?

Sample space ban đầu (trên các kết quả từng phép thử) có `2^n` outcome (mỗi phép thử 2 trạng thái) — vd n=10 → 1024 outcome, n=100 → 1.27 × 10^30. Tuy nhiên **giá trị** của X chỉ chạy trong {0, 1, ..., n} → n+1 giá trị. Đây là sức mạnh của RV: nó *thu gọn* không gian khổng lồ thành một biến số.

### 11.3. Khi nào dùng phân phối nào?

| Câu hỏi đặt ra | Phân phối |
|---|---|
| 1 phép thử nhị phân | Bernoulli |
| n phép thử độc lập, đếm thành công | Binomial |
| Đợi đến thành công đầu tiên | Geometric |
| Đếm sự kiện hiếm trong khoảng cố định | Poisson |
| Chọn 1 trong K khả năng (vd token) | Categorical |
| Đợi đến thành công thứ r | Negative Binomial (ngoài bài) |
| Lấy mẫu không hoàn lại từ tập hữu hạn | Hypergeometric (ngoài bài) |

### 11.4. Có RV nào không có PMF không?

Có — RV **liên tục** (Lesson 04) không có PMF (vì P(X = x đơn lẻ) = 0). RV "trộn" (mixed) cũng có thể không có PMF thuần. Đó là lý do CDF tổng quát hơn.

### 11.5. Hai RV có thể có cùng phân phối nhưng không bằng nhau không?

Có. Tung 2 đồng xu *khác nhau*: X = đồng A, Y = đồng B. X ~ Ber(0.5), Y ~ Ber(0.5) — cùng phân phối. Nhưng cùng một lần tung, có thể X = 1 và Y = 0 → X ≠ Y. Phân biệt:

- **Cùng phân phối (equal in distribution)**: kí hiệu `X =_d Y`.
- **Bằng nhau hầu chắc chắn (almost surely equal)**: `P(X = Y) = 1`.

---

## 12. ⚠ Tổng hợp lỗi thường gặp

1. **Nhầm C(n, k) với P(n, k)**.
   - C(n, k) = chọn không thứ tự = `n!/(k!(n-k)!)`.
   - P(n, k) = hoán vị có thứ tự = `n!/(n-k)!`.
   - C(5,2) = 10; P(5,2) = 20. Binomial dùng C.

2. **Quên điều kiện độc lập của Binomial**.
   - Rút 5 lá bài không hoàn → không độc lập → KHÔNG phải Binomial (là Hypergeometric).

3. **Nhầm quy ước Geometric (A) vs (B)**.
   - Đọc kỹ định nghĩa support của sách / thư viện trước khi áp công thức.

4. **Quên e^(-λ) trong Poisson**.
   - `P(X = 0)` luôn = `e^(-λ)`, KHÔNG = 0.

5. **Áp Poisson khi p không nhỏ**.
   - Bin(100, 0.5) ≈ Poi(50)? Sai số rất lớn. Trường hợp này dùng Gaussian.

6. **Dùng PMF cho RV liên tục**.
   - Liên tục không có PMF. P(X = x) = 0 với mọi x. Dùng PDF.

7. **Vẽ CDF rời rạc thành đường cong trơn**.
   - Phải là bậc thang. Đầu bậc kín ●, đoạn ngang thì là `━`.

8. **Quên `0! = 1`** khi tính Poisson cho k = 0 → chia cho 0 ảo.

9. **Tính `n!` cho n lớn** trong code → tràn số. Dùng log-space.

10. **Sample space khổng lồ** → tưởng RV cũng khổng lồ. RV thu gọn thành tập giá trị nhỏ hơn nhiều.

---

## 13. Bài tập

### Bài 1 — PMF từ phép thử

Tung 1 xúc xắc công bằng 2 lần độc lập. Đặt X = max(D₁, D₂) trong đó D_i là mặt xúc xắc lần i. Lập bảng PMF của X.

### Bài 2 — Bernoulli và độc lập

Hai đồng xu lệch khác nhau: A có P(ngửa) = 0.6, B có P(ngửa) = 0.7. Tung độc lập. Đặt X = 1 nếu **cả hai** ra ngửa, 0 nếu khác. X có phải Bernoulli không? Nếu phải, tìm p.

### Bài 3 — Binomial cụ thể

Một dây chuyền sản xuất có tỉ lệ lỗi 3%. Lấy ngẫu nhiên 50 sản phẩm. Tính P(có đúng 2 sản phẩm lỗi). Sau đó dùng xấp xỉ Poisson và so sánh.

### Bài 4 — Geometric trong A/B testing

Một button có CTR = 4%. Một user được show button liên tục cho đến khi click. Tính:
(a) Xác suất click ngay lần đầu.
(b) Xác suất phải show ≥ 50 lần mới có click.
(c) Trung bình bao nhiêu lần show?

### Bài 5 — Poisson tính nhanh

Một trạm radio nhận trung bình 12 cuộc gọi/giờ. Tính:
(a) P(trong 1 giờ có đúng 10 cuộc gọi).
(b) P(trong 30 phút có 0 cuộc gọi).
(c) P(trong 1 giờ có ≥ 15 cuộc gọi).

### Bài 6 — CDF và PMF

Cho F(x) là CDF của RV X rời rạc với:

```
F(x) = 0     nếu x < 1
F(x) = 0.2   nếu 1 ≤ x < 3
F(x) = 0.5   nếu 3 ≤ x < 5
F(x) = 0.9   nếu 5 ≤ x < 7
F(x) = 1     nếu x ≥ 7
```

(a) Tìm PMF của X.
(b) Tính P(3 < X ≤ 6).
(c) Tính P(X = 5).

---

## 14. Lời giải chi tiết

### Lời giải bài 1

Ω có 36 outcome đồng xác suất. Giá trị X = max ∈ {1, 2, 3, 4, 5, 6}.

Đếm số outcome với max = m: là outcome có max(D₁, D₂) = m. Tách:
- Đúng 1 trong 2 = m, cái còn lại < m: 2 · (m-1) cách.
- Cả 2 = m: 1 cách.
- Tổng: 2(m-1) + 1 = 2m - 1.

| x | 1 | 2 | 3 | 4 | 5 | 6 |
|---|---|---|---|---|---|---|
| #outcome | 1 | 3 | 5 | 7 | 9 | 11 |
| p(x) | 1/36 | 3/36 | 5/36 | 7/36 | 9/36 | 11/36 |

Kiểm tra: 1 + 3 + 5 + 7 + 9 + 11 = 36 ✓.

### Lời giải bài 2

P(X = 1) = P(A ngửa **và** B ngửa) = 0.6 · 0.7 = 0.42 (độc lập).
P(X = 0) = 1 - 0.42 = 0.58.

X chỉ nhận 2 giá trị → là Bernoulli. p = 0.42.

### Lời giải bài 3

**Cách Binomial exact**: X ~ Bin(50, 0.03).

`P(X = 2) = C(50, 2) · 0.03² · 0.97⁴⁸ = 1225 · 0.0009 · 0.97⁴⁸`.

Tính 0.97⁴⁸: log(0.97) ≈ -0.03046; 48 · log(0.97) ≈ -1.462; 0.97⁴⁸ ≈ e^(-1.462) ≈ 0.2317.

`P(X = 2) ≈ 1225 · 0.0009 · 0.2317 ≈ 0.2555`.

**Cách Poisson xấp xỉ**: λ = np = 1.5. `P(Y = 2) = e^-1.5 · 1.5² / 2! = 0.2231 · 2.25 / 2 = 0.2510`.

So sánh: 0.2555 vs 0.2510 — sai số ~0.4%, xấp xỉ rất tốt vì p = 0.03 đủ nhỏ.

### Lời giải bài 4

X ~ Geo(0.04).

(a) P(X = 1) = 0.04.

(b) P(X ≥ 50) = `Σ_{k=50}^∞ 0.96^(k-1) · 0.04 = 0.96^49 · 0.04 · Σ_{j=0}^∞ 0.96^j = 0.96^49`.

Tính 0.96^49: log(0.96) ≈ -0.04082; 49 · log(0.96) ≈ -2.000; 0.96^49 ≈ e^(-2) ≈ 0.1353.

Vậy P(X ≥ 50) ≈ 13.5%.

(c) E[X] = 1/p = 1/0.04 = 25 lần show trung bình.

### Lời giải bài 5

(a) λ = 12. `P(X = 10) = e^-12 · 12^10 / 10!`.
- 12^10 ≈ 6.192 × 10^10.
- 10! = 3,628,800.
- e^-12 ≈ 6.144 × 10^-6.
- P ≈ 6.144·10^-6 · 6.192·10^10 / 3.629·10^6 ≈ 0.1048.

(b) Trong 30 phút, λ' = 12/2 = 6. `P(X = 0) = e^-6 ≈ 0.00248` ≈ 0.25%.

(c) λ = 12. P(X ≥ 15) = 1 - P(X ≤ 14) = 1 - F(14).

Tính F(14) bằng cách cộng PMF từ k = 0 đến 14:
- p(0) = 6.14·10⁻⁶
- p(1) = 7.37·10⁻⁵
- p(2) = 4.42·10⁻⁴
- ... (chạy số) ...
- F(14) ≈ 0.7720.

P(X ≥ 15) ≈ 0.228, tức 22.8%.

### Lời giải bài 6

(a) PMF lấy từ độ cao bước nhảy của CDF tại các điểm support:
- p(1) = F(1) - F(1⁻) = 0.2 - 0 = 0.2.
- p(3) = F(3) - F(3⁻) = 0.5 - 0.2 = 0.3.
- p(5) = F(5) - F(5⁻) = 0.9 - 0.5 = 0.4.
- p(7) = F(7) - F(7⁻) = 1 - 0.9 = 0.1.

Kiểm tra: 0.2 + 0.3 + 0.4 + 0.1 = 1 ✓.

(b) `P(3 < X ≤ 6) = F(6) - F(3) = 0.9 - 0.5 = 0.4`.

(Chú ý: F(6) = 0.9 vì 5 ≤ 6 < 7.)

(c) P(X = 5) = p(5) = 0.4.

---

## 15. Liên kết và tài liệu tham khảo

### Bài tiếp theo

- **Lesson 04** — [Biến ngẫu nhiên liên tục](../lesson-04-continuous-rv/): chuyển từ PMF sang PDF, từ tổng sang tích phân.
- **Lesson 05** — [Phân phối Gaussian](../lesson-05-normal-distribution/): phân phối liên tục quan trọng nhất, là giới hạn của Binomial khi n lớn (CLT).
- **Lesson 06** — [Kỳ vọng và phương sai](../lesson-06-expectation-variance/): chứng minh các công thức E và Var của Bernoulli/Binomial/Poisson đã preview trong bài này.
- **Lesson 07** — [MLE](../lesson-07-mle/): dùng PMF để fit tham số của phân phối.
- **Lesson 08** — [Cross-entropy + KL](../lesson-08-cross-entropy-kl/): NLL của Bernoulli và Categorical chính là loss của classification.

### Bài liền kề

- **Lesson 01** — [Xác suất cơ bản](../lesson-01-probability-basics/): tổ hợp, không gian mẫu.
- **Lesson 02** — [Xác suất có điều kiện + Bayes](../lesson-02-conditional-bayes/): độc lập (điều kiện cần cho Binomial).

### Liên hệ ngang sang Tier khác

- [Algebra Lesson 03 — Exponents & logs](../../01-Algebra/lesson-03-exponents-logarithms/) — vì Poisson chứa e^(-λ).
- [Calculus Lesson 08 — Tích phân và e](../../03-Calculus/lesson-08-integral-and-e/) — giới hạn `(1 - λ/n)^n → e^(-λ)`.

### Sách tham khảo

- *Introduction to Probability* — Blitzstein & Hwang (chương 3-4 cho RV và phân phối rời rạc) — đọc nếu muốn nhiều ví dụ và bài tập.
- *Probability and Statistics for Engineers and Scientists* — Walpole — chuẩn hệ Mỹ, nhiều bảng tra.
- *MIT 6.041 lecture notes* — Bertsekas & Tsitsiklis — bố cục rõ, miễn phí online.

[← Lesson 02](../lesson-02-conditional-bayes/) | [Trang chính tầng Probability](../) | [Lesson 04 →](../lesson-04-continuous-rv/)
