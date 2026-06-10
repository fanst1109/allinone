// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: Vectors/05-Probability/lesson-08-cross-entropy-kl/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 08 — Cross-entropy + KL divergence

> Tầng 5 — Probability · Lesson 08 (bài CUỐI Tầng 5)
> Loss function trung tâm của classification và LLM. Bắt đầu từ "entropy là gì",
> đi qua cross-entropy, KL divergence, rồi ráp vào loss của neural network và
> perplexity của ngôn ngữ.

## Mục tiêu học tập

Sau bài này bạn sẽ:

1. **Định nghĩa được entropy $H(p)$** — đơn vị bit/nat, hiểu vì sao phân phối
   đều có entropy max và phân phối lệch có entropy thấp.
2. **Tính được cross-entropy $H(p, q)$** từ định nghĩa, hiểu nó là "chi phí mã
   hóa sample từ $p$ khi dùng code tối ưu cho $q$".
3. **Tính được KL divergence $D_{KL}(p \\parallel q)$**, hiểu vì sao nó $\\geq 0$ và vì sao
   **không đối xứng** ($D_{KL}(p \\parallel q) \\neq D_{KL}(q \\parallel p)$).
4. **Dẫn được cross-entropy loss** trong classification từ MLE — hiểu vì sao
   "minimize log loss" tương đương "maximize likelihood".
5. **Hiểu binary cross-entropy** (BCE) cho binary classification và categorical
   cross-entropy cho multi-class.
6. **Tính được loss của LLM** ở mức next-token prediction, biết perplexity là
   $\\exp(\\text{cross-entropy})$ và đọc được "GPT-3 perplexity ≈ 20" nghĩa là gì.
7. **Phân biệt JSD vs KL** — biết khi nào dùng JSD (symmetric, dùng trong GAN).

## Kiến thức tiền đề

- [Lesson 07 — MLE](../lesson-07-mle/) — bài này dẫn cross-entropy TRỰC TIẾP từ
  MLE. Bạn cần nắm "log-likelihood = $\\sum_i \\log p(x_i \\mid \\theta)$".
- [Algebra Lesson 04 — Powers, roots, logs](../../01-Algebra/lesson-04-powers-roots-logs/)
  — đặc biệt tính chất $\\log(ab) = \\log a + \\log b$ và $\\log(1/x) = -\\log x$. Bài
  này dùng log khắp nơi.
- [Calculus Lesson 08 — Integrals](../../03-Calculus/lesson-08-integrals/) — cho
  phiên bản liên tục $H(p) = -\\int p(x) \\log p(x)\\, dx$.
- [Probability Lesson 03 — Discrete random variables](../lesson-03-discrete-rv/)
  — PMF, expectation $E[f(X)] = \\sum_x p(x) f(x)$.
- [Probability Lesson 06 — Expectation, variance](../lesson-06-expectation-variance/)
  — entropy $= E_p[-\\log p(X)]$, một dạng expectation đặc biệt.

> 💡 **Trực giác mở bài.** Tưởng tượng bạn cần gửi tin nhắn mỗi ngày báo
> "hôm nay trời nắng / mưa / có bão" qua một kênh truyền tin tốn tiền theo
> số bit. Nếu trời ở Sài Gòn (90% nắng, 9% mưa, 1% bão), bạn nên dùng code
> **ngắn** cho "nắng" và code dài cho "bão". Entropy đo "số bit tối thiểu
> trung bình" để gửi. Cross-entropy đo "số bit thực tế bạn dùng nếu bạn
> nghĩ phân phối là $q$ (vd 33-33-33) trong khi thực tế là $p$ (90-9-1)".
> KL đo "bạn lãng phí bao nhiêu bit vì hiểu sai phân phối". Cả bài này
> là làm rõ 3 đại lượng trên bằng số.

---

## 1. Entropy \`H(p)\`

### 1.1. Định nghĩa

Cho biến ngẫu nhiên rời rạc $X$ nhận giá trị trong tập $\\mathcal{X} = \\{x_1, \\dots, x_n\\}$
với PMF $p(x_i)$. **Entropy** của $X$ (hay của phân phối $p$) là:

$$\\begin{aligned}
H(p) &= -\\sum_i p(x_i) \\log p(x_i) \\\\
     &= E_p[-\\log p(X)]
\\end{aligned}$$

- Nếu $\\log$ là $\\log_2$ → đơn vị **bit** (Shannon).
- Nếu $\\log$ là $\\ln$ (cơ số $e$) → đơn vị **nat**.
- Nếu $\\log$ là $\\log_{10}$ → đơn vị **dit/hartley** (ít gặp).

**Quy ước:** $0 \\cdot \\log 0 = 0$ (giới hạn $\\lim_{p \\to 0} p \\log p = 0$ — xem
[Calculus Lesson 04 — Limits](../../03-Calculus/lesson-04-limits/) nếu cần).

> 💡 **Trực giác.** Đại lượng $-\\log p(x)$ là "lượng thông tin" (information
> content / surprisal) khi quan sát được sự kiện $x$. Sự kiện hiếm ($p$ nhỏ)
> → surprisal cao; sự kiện gần chắc chắn ($p \\approx 1$) → surprisal ≈ 0. Entropy
> là **trung bình** của surprisal theo chính phân phối $p$.

### 1.2. Walk-through ≥ 4 ví dụ số (dùng log₂, đơn vị bit)

**Ví dụ 1 — Đồng xu fair $p = (0.5, 0.5)$.**

$$\\begin{aligned}
H &= -(0.5 \\cdot \\log_2 0.5 + 0.5 \\cdot \\log_2 0.5) \\\\
  &= -(0.5 \\cdot (-1) + 0.5 \\cdot (-1)) \\\\
  &= -(-0.5 - 0.5) \\\\
  &= 1 \\text{ bit}
\\end{aligned}$$

→ Cần đúng 1 bit để mã hóa kết quả (vd "H = 0, T = 1"). Đây là **entropy
tối đa** với biến ngẫu nhiên 2 outcome.

**Ví dụ 2 — Đồng xu lệch nhẹ $p = (0.9, 0.1)$.**

$$\\begin{aligned}
\\log_2 0.9 &\\approx -0.152 \\\\
\\log_2 0.1 &\\approx -3.322 \\\\
H &= -(0.9 \\cdot (-0.152) + 0.1 \\cdot (-3.322)) \\\\
  &= -(-0.137 - 0.332) \\\\
  &= 0.469 \\text{ bit}
\\end{aligned}$$

→ Vì kết quả "khá đoán được" (90% là H), trung bình chỉ cần ~0.469 bit.
Nghe vô lý ("không thể truyền nửa bit") nhưng đúng khi gửi **dãy nhiều
lần** và mã hóa khối (xem mã Huffman, arithmetic coding).

**Ví dụ 3 — Đồng xu siêu lệch $p = (0.99, 0.01)$.**

$$\\begin{aligned}
\\log_2 0.99 &\\approx -0.0145 \\\\
\\log_2 0.01 &\\approx -6.6439 \\\\
H &= -(0.99 \\cdot (-0.0145) + 0.01 \\cdot (-6.6439)) \\\\
  &= -(-0.01435 - 0.06644) \\\\
  &= 0.0808 \\text{ bit}
\\end{aligned}$$

→ Cực nhỏ vì gần như chắc chắn là H. Verify chiều ngược: nếu $p = (1, 0)$
thì $H = 0$ (không có bất định gì hết).

**Ví dụ 4 — Phân phối đều 8 outcome $p = (1/8, \\dots, 1/8)$.**

$$\\begin{aligned}
H &= -\\sum (1/8) \\log_2(1/8) \\\\
  &= -8 \\cdot (1/8) \\cdot (-3) \\\\
  &= 3 \\text{ bit}
\\end{aligned}$$

→ Khớp trực giác: 8 outcome cần $\\log_2 8 = 3$ bit để mã hóa (3 bit nhị phân
là đủ định danh 8 giá trị).

**Ví dụ 5 — Phân phối không đều 4 outcome $p = (0.5, 0.25, 0.125, 0.125)$.**

$$\\begin{aligned}
\\log_2 0.5 &= -1 \\\\
\\log_2 0.25 &= -2 \\\\
\\log_2 0.125 &= -3 \\\\
H &= -(0.5 \\cdot (-1) + 0.25 \\cdot (-2) + 0.125 \\cdot (-3) + 0.125 \\cdot (-3)) \\\\
  &= -(-0.5 - 0.5 - 0.375 - 0.375) \\\\
  &= 1.75 \\text{ bit}
\\end{aligned}$$

→ Thấp hơn $\\log_2 4 = 2$ bit (uniform). Huffman code optimal:
$A=0, B=10, C=110, D=111$ cho độ dài trung bình đúng 1.75 bit/ký tự ✓.

### 1.3. Tính chất quan trọng

1. **$H(p) \\geq 0$**, với $H(p) = 0$ ⇔ $p$ deterministic ($p(x^*) = 1$ cho một
   $x^*$ nào đó).
2. **$H(p) \\leq \\log n$** với $n = |\\mathcal{X}|$, dấu bằng ⇔ $p$ uniform. (Chứng minh
   ngắn ở §4.4 dùng Jensen.)
3. **Cộng tính cho biến độc lập:** $H(X, Y) = H(X) + H(Y)$ nếu $X \\perp Y$.

> ❓ **Câu hỏi tự nhiên.**
>
> - *"Sao lại là $\\log$?"* — vì ta muốn entropy của 2 biến độc lập = tổng
>   entropy. Mà số outcome ghép = tích, nên cần hàm biến tích thành tổng:
>   chỉ có $\\log$.
> - *"Đơn vị bit có nghĩa gì cho phân phối liên tục?"* — phân phối liên
>   tục dùng **differential entropy** $h(p) = -\\int p(x) \\log p(x)\\, dx$, đơn
>   vị "nat" nếu $\\log = \\ln$. Có thể âm (vd Gaussian $\\sigma$ nhỏ). Khác với
>   entropy rời rạc về bản chất — không "đếm bit" được nữa.
> - *"Phân phối đều có entropy max — chứng minh sao?"* — xem §4.4
>   (chứng minh $D_{KL} \\geq 0$ rồi áp vào $q = $ uniform).

> 🔁 **Tự kiểm tra.**
> 1. Tính $H$ cho $p = (0.7, 0.2, 0.1)$ đơn vị bit.
> 2. Phân phối nào trong 3 outcome có entropy max? Tính giá trị max.
>
> <details><summary>Đáp án</summary>
>
> 1. $$\\begin{aligned}
>    H &= -(0.7 \\log_2 0.7 + 0.2 \\log_2 0.2 + 0.1 \\log_2 0.1) \\\\
>      &= -(0.7 \\cdot (-0.515) + 0.2 \\cdot (-2.322) + 0.1 \\cdot (-3.322)) \\\\
>      &= -(-0.360 - 0.464 - 0.332) = 1.157 \\text{ bit}
>    \\end{aligned}$$
> 2. Uniform $(1/3, 1/3, 1/3)$ → $H = \\log_2 3 \\approx 1.585$ bit.
>
> </details>

> 📝 **Tóm tắt §1.**
> - $H(p) = -\\sum p \\log p$ đo độ bất định, đơn vị bit ($\\log_2$) hoặc nat ($\\ln$).
> - Phân phối đều → entropy max $= \\log n$. Phân phối deterministic → 0.
> - $-\\log p(x)$ = "surprisal", entropy = expectation của surprisal.

---

## 2. Cross-entropy \`H(p, q)\`

### 2.1. Định nghĩa

Cho 2 phân phối $p, q$ trên cùng tập $\\mathcal{X}$:

$$\\begin{aligned}
H(p, q) &= -\\sum_x p(x) \\log q(x) \\\\
        &= E_p[-\\log q(X)]
\\end{aligned}$$

So với entropy $H(p) = E_p[-\\log p(X)]$, chỉ khác chỗ **dùng $q$ để tính
surprisal nhưng vẫn lấy trung bình theo $p$**.

> 💡 **Trực giác.** Bạn tin phân phối là $q$ nên thiết kế code tối ưu cho
> $q$ (sự kiện được $q$ cho là có xác suất cao → code ngắn). Nhưng dữ liệu
> thật sinh từ $p$. Trung bình số bit bạn dùng là $H(p, q)$. Nếu $q = p$,
> bạn đang dùng đúng code tối ưu → tốn ít nhất, $H(p, q) = H(p)$. Nếu $q$
> sai (vd nghĩ "bão 33%" trong khi thực tế "bão 1%"), bạn tốn hơn — đó là
> chênh lệch chính KL sẽ đo ở §4.

### 2.2. Walk-through số

**Ví dụ 1.** $p = (0.9, 0.1)$, $q = (0.5, 0.5)$ (bạn tưởng fair).

$$\\begin{aligned}
H(p, q) &= -(0.9 \\log_2 0.5 + 0.1 \\log_2 0.5) \\\\
        &= -(0.9 \\cdot (-1) + 0.1 \\cdot (-1)) \\\\
        &= 1 \\text{ bit}
\\end{aligned}$$

Trong khi $H(p) \\approx 0.469$. Bạn lãng phí $1 - 0.469 = 0.531$ bit/sample
vì hiểu sai phân phối (đây chính là $D_{KL}(p \\parallel q)$).

**Ví dụ 2.** $p = (0.9, 0.1)$, $q = (0.9, 0.1)$ (chuẩn).

$$\\begin{aligned}
H(p, q) &= -(0.9 \\cdot (-0.152) + 0.1 \\cdot (-3.322)) \\\\
        &= 0.469 \\text{ bit} = H(p) \\checkmark
\\end{aligned}$$

Không lãng phí gì.

**Ví dụ 3.** $p = (0.9, 0.1)$, $q = (0.1, 0.9)$ (đảo ngược, sai nặng).

$$\\begin{aligned}
\\log_2 0.1 &\\approx -3.322 \\\\
\\log_2 0.9 &\\approx -0.152 \\\\
H(p, q) &= -(0.9 \\cdot (-3.322) + 0.1 \\cdot (-0.152)) \\\\
        &= -(-2.990 - 0.0152) \\\\
        &= 3.005 \\text{ bit}
\\end{aligned}$$

Rất lớn — chứng tỏ thiết kế code dựa trên $q$ sai lệch nghiêm trọng làm
bạn tốn tới 3 bit cho mỗi quan sát, thay vì 0.469 lý thuyết tối ưu.

**Ví dụ 4 — 3 outcome.** $p = (0.7, 0.2, 0.1)$, $q = (1/3, 1/3, 1/3)$.

$$\\begin{aligned}
\\log_2(1/3) &\\approx -1.585 \\\\
H(p, q) &= -((0.7 + 0.2 + 0.1) \\cdot (-1.585)) \\\\
        &= 1.585 \\text{ bit} = \\log_2 3
\\end{aligned}$$

→ Trên uniform $q$, $H(p, q)$ luôn $= \\log n$. Trong khi $H(p) \\approx 1.157$
(xem §1.3 tự kiểm tra). KL $= 1.585 - 1.157 = 0.428$ bit.

### 2.3. Tính chất

1. **$H(p, q) \\geq H(p)$** (Gibbs' inequality), đẳng thức ⇔ $q = p$. Chứng
   minh ở §4.4 (cùng với $D_{KL} \\geq 0$).
2. **Không đối xứng:** $H(p, q) \\neq H(q, p)$ nói chung. Ví dụ:
   $H(p, q)$ ở ví dụ 4 $= 1.585$ bit; còn
   $$H(q, p) = -\\sum (1/3) \\log p = -(1/3)(\\log 0.7 + \\log 0.2 + \\log 0.1) = -(1/3)(-0.515 - 2.322 - 3.322) \\approx 2.053 \\text{ bit}.$$
   **Khác hẳn.**
3. **Với one-hot $p$** (vd $p = (0, 1, 0)$): $H(p, q) = -\\log q(\\text{class})$.
   Đây chính là cross-entropy loss của classification (xem §5).

> ⚠ **Lỗi thường gặp.**
> - Gọi $H(p, q)$ là "khoảng cách". Không phải — không đối xứng, và
>   $H(p, p) = H(p) \\neq 0$. Khoảng cách phải dùng KL (vẫn không thực sự là
>   metric — xem §4.5).
> - Quên dấu $-$. Vì $\\log q \\leq 0$ (với $q \\leq 1$), bỏ dấu $-$ sẽ ra số âm,
>   sai trái dấu.
> - Hoán đổi vai trò $p, q$. Convention: **biến ngẫu nhiên thật sinh từ
>   $p$**, **model dự đoán $q$**. Trong loss $= H(p, q)$, $p$ là target
>   thật (one-hot), $q$ là model output.

> 📝 **Tóm tắt §2.**
> - $H(p, q) = -\\sum p \\log q$ = "chi phí trung bình mã hóa sample từ $p$ khi
>   dùng code thiết kế cho $q$".
> - $H(p, q) \\geq H(p)$, dấu bằng ⇔ $q = p$.
> - Loss classification $= H(p, q)$ với $p$ one-hot.

---

## 3. KL divergence — bản đầy đủ

### 3.1. Định nghĩa

$$\\begin{aligned}
D_{KL}(p \\parallel q) &= \\sum_x p(x) \\log\\frac{p(x)}{q(x)} \\\\
             &= \\sum_x p(x) [\\log p(x) - \\log q(x)] \\\\
             &= -H(p) + H(p, q) \\\\
             &= H(p, q) - H(p)
\\end{aligned}$$

> 💡 **Trực giác cốt lõi.** KL = "số bit lãng phí" khi bạn nghĩ phân phối
> là $q$ nhưng thực tế là $p$. Đo bằng đơn vị bit ($\\log_2$) hoặc nat ($\\ln$).

### 3.2. Walk-through tính KL cho 2 Bernoulli

**Setup.** $p = \\text{Bernoulli}(0.5)$ (fair), $q = \\text{Bernoulli}(0.9)$ (lệch về 0).

$$D_{KL}(p \\parallel q) = p(0) \\log\\frac{p(0)}{q(0)} + p(1) \\log\\frac{p(1)}{q(1)}$$

$$\\begin{aligned}
D_{KL}(p \\parallel q) &= 0.5 \\log_2(0.5/0.9) + 0.5 \\log_2(0.5/0.1) \\\\
             &= 0.5 \\log_2(5/9) + 0.5 \\log_2(5) \\\\
             &= 0.5 \\cdot (-0.848) + 0.5 \\cdot (2.322) \\\\
             &= -0.424 + 1.161 \\\\
             &= 0.737 \\text{ bit}
\\end{aligned}$$

Verify bằng $H(p, q) - H(p)$:

$$\\begin{aligned}
H(p, q) &= -(0.5 \\log_2 0.9 + 0.5 \\log_2 0.1) \\\\
        &= -(0.5 \\cdot (-0.152) + 0.5 \\cdot (-3.322)) \\\\
        &= -(-0.0760 - 1.661) \\\\
        &= 1.737 \\text{ bit} \\\\
H(p) &= 1 \\text{ bit} \\quad (\\text{fair coin}) \\\\
D_{KL} &= 1.737 - 1 = 0.737 \\text{ bit} \\checkmark
\\end{aligned}$$

### 3.3. Không đối xứng — walk-through chiều ngược

$D_{KL}(q \\parallel p)$ với cùng $q = (0.9, 0.1)$, $p = (0.5, 0.5)$:

$$\\begin{aligned}
D_{KL}(q \\parallel p) &= 0.9 \\log_2(0.9/0.5) + 0.1 \\log_2(0.1/0.5) \\\\
             &= 0.9 \\log_2(1.8) + 0.1 \\log_2(0.2) \\\\
             &= 0.9 \\cdot (0.848) + 0.1 \\cdot (-2.322) \\\\
             &= 0.763 - 0.232 \\\\
             &= 0.531 \\text{ bit}
\\end{aligned}$$

**Khác hẳn $D_{KL}(p \\parallel q) = 0.737$.** Tổng quát:

$$D_{KL}(p \\parallel q) \\neq D_{KL}(q \\parallel p)$$

→ KL **không phải metric** (không đối xứng, không thỏa bất đẳng thức tam
giác). Chỉ là **divergence** — "lệch bao xa", có hướng.

### 3.4. Diễn giải 2 chiều

- **$D_{KL}(p \\parallel q)$** — *forward KL* / *M-projection*. Penalize khi $q$
  gán **xác suất thấp** ở nơi $p$ có **xác suất cao** (vì $p(x)/q(x)$ lớn).
  Hệ quả: tối ưu $q$ để minimize $D_{KL}(p \\parallel q)$ → $q$ phải **bao trùm**
  (mode-covering) hết $p$, kể cả vùng $p$ nhỏ.
- **$D_{KL}(q \\parallel p)$** — *reverse KL* / *I-projection*. Penalize khi $q$
  gán **xác suất cao** ở nơi $p$ có **xác suất thấp** (vì $q$ "đến đó"
  và bị $\\log(q/p)$ lớn). Hệ quả: tối ưu $q$ để minimize $D_{KL}(q \\parallel p)$
  → $q$ **chui vào** một mode lớn của $p$ (mode-seeking).

Hai cách dùng quan trọng:
- **MLE / cross-entropy loss** → minimize $D_{KL}(p_{\\text{data}} \\parallel q_\\theta)$ ⇒ forward
  KL, mode-covering. Khi $p_{\\text{data}}$ đa mode, model trung bình hóa
  (vd Gaussian fit bimodal → ra Gaussian rộng nằm giữa).
- **Variational inference (VAE, ELBO)** → minimize $D_{KL}(q_\\theta \\parallel p)$
  ⇒ reverse KL, mode-seeking. VAE $q$ chỉ "khoanh" 1 mode, miss các mode khác.

> ❓ **Câu hỏi tự nhiên.**
>
> - *"KL có phải khoảng cách không?"* — **Không.** Không đối xứng + không
>   thỏa bất đẳng thức tam giác. Là divergence (đo "lệch", có hướng).
>   Nếu cần khoảng cách thực sự symmetric, dùng JSD (§9) hoặc Wasserstein.
> - *"KL có giới hạn trên không?"* — **Không.** Nếu $q(x) = 0$ ở đâu mà
>   $p(x) > 0$, thì $\\log\\frac{p}{q} = \\infty$, KL $= +\\infty$. Đây là lý do trong ML phải
>   **clip** prediction (vd cộng $\\varepsilon = 10^{-7}$ vào $q$).
> - *"Đơn vị bit hay nat?"* — tùy log. Toán ML thường dùng $\\ln$, đơn vị
>   nat. Information theory thường $\\log_2$, đơn vị bit. Chuyển đổi:
>   $1 \\text{ nat} = \\log_2 e \\approx 1.443 \\text{ bit}$.

### 3.5. Tính chất

1. **$D_{KL}(p \\parallel q) \\geq 0$**, dấu bằng ⇔ $p = q$ (Gibbs' inequality).
2. **Không đối xứng** (đã thấy).
3. **Vô hạn** khi $q(x) = 0, p(x) > 0$.
4. **Bất biến dưới phép biến đổi 1-1 của biến** — nếu $Y = f(X)$ với
   $f$ bijection, $D_{KL}(p_Y \\parallel q_Y) = D_{KL}(p_X \\parallel q_X)$.
5. **Cộng tính cho biến độc lập:** với $p = p_1 \\otimes p_2$, $q = q_1 \\otimes q_2$,
   $D_{KL}(p \\parallel q) = D_{KL}(p_1 \\parallel q_1) + D_{KL}(p_2 \\parallel q_2)$.

### 3.6. Chứng minh $D_{KL}(p \\parallel q) \\geq 0$ (Gibbs' inequality)

Dùng bất đẳng thức log: $\\ln x \\leq x - 1$ với mọi $x > 0$, đẳng thức ⇔ $x = 1$.

Suy ra $-\\ln x \\geq 1 - x$, hay $\\ln(1/x) \\geq 1 - x$.

Tính $D_{KL}$ đơn vị nat:

$$\\begin{aligned}
D_{KL}(p \\parallel q) &= \\sum p(x) \\ln\\frac{p(x)}{q(x)} \\\\
             &= -\\sum p(x) \\ln\\frac{q(x)}{p(x)} \\\\
             &\\geq -\\sum p(x) \\left[\\frac{q(x)}{p(x)} - 1\\right] \\quad (\\text{áp } \\ln x \\leq x - 1 \\text{ với } x = q/p, \\text{ đổi dấu}) \\\\
             &= -\\sum q(x) + \\sum p(x) \\\\
             &= -1 + 1 \\\\
             &= 0.
\\end{aligned}$$

Dấu bằng ở **mỗi** $x$ ⇔ $q(x)/p(x) = 1$, tức $q = p$. □

> Bước nào cũng có verify được — không có "dễ thấy". Tip: bất đẳng thức
> $\\ln x \\leq x - 1$ chứng minh bằng cách xét hàm $f(x) = x - 1 - \\ln x$, có
> $f'(x) = 1 - 1/x$, $f'(1) = 0$, $f''(x) = 1/x^2 > 0$ → cực tiểu tại $x = 1$,
> $f(1) = 0$, nên $f(x) \\geq 0$ với mọi $x > 0$.

> 🔁 **Tự kiểm tra.**
> 1. Tính $D_{KL}(p \\parallel q)$ cho $p = (0.5, 0.5)$, $q = (0.25, 0.75)$.
> 2. Tính $D_{KL}(q \\parallel p)$ cùng cặp. So sánh.
>
> <details><summary>Đáp án</summary>
>
> 1. $$\\begin{aligned}
>    D_{KL}(p \\parallel q) &= 0.5 \\log_2(0.5/0.25) + 0.5 \\log_2(0.5/0.75) \\\\
>    &= 0.5 \\cdot 1 + 0.5 \\cdot \\log_2(2/3) \\\\
>    &= 0.5 + 0.5 \\cdot (-0.585) = 0.5 - 0.293 = 0.208 \\text{ bit}
>    \\end{aligned}$$
> 2. $$\\begin{aligned}
>    D_{KL}(q \\parallel p) &= 0.25 \\log_2(0.25/0.5) + 0.75 \\log_2(0.75/0.5) \\\\
>    &= 0.25 \\cdot (-1) + 0.75 \\cdot \\log_2(1.5) = -0.25 + 0.75 \\cdot 0.585 \\\\
>    &= -0.25 + 0.439 = 0.189 \\text{ bit}
>    \\end{aligned}$$
>    Khác chiều đầu → không đối xứng ✓.
>
> </details>

> 📝 **Tóm tắt §3.**
> - $D_{KL}(p \\parallel q) = \\sum p \\log\\frac{p}{q} = H(p,q) - H(p) \\geq 0$.
> - Không đối xứng, không bị chặn trên, không phải metric.
> - Forward KL = mode-covering (dùng trong MLE). Reverse KL = mode-seeking
>   (dùng trong VAE).

---

## 4. Liên hệ chi tiết H, H(p,q), KL

Bộ ba đại lượng có công thức gọn:

$$H(p, q) = H(p) + D_{KL}(p \\parallel q)$$

Suy ra:
- Cố định $p$, **minimize $H(p, q)$ theo $q$** ⇔ **minimize $D_{KL}(p \\parallel q)$**
  (vì $H(p)$ không phụ thuộc $q$).
- Đây là lý do trong training, loss thường viết là cross-entropy thay vì
  KL — kết quả tối ưu y hệt.

### 4.1. Bảng so sánh trên 1 ví dụ

Lấy $p = (0.9, 0.1)$, thử các $q$ khác nhau:

| $q$             | $H(p, q)$ (bit) | $H(p)$ | $D_{KL}(p \\parallel q)$ |
|-----------------|-----------------|--------|-----------------|
| $(0.9, 0.1)$    | 0.469           | 0.469  | 0.000           |
| $(0.8, 0.2)$    | 0.522           | 0.469  | 0.053           |
| $(0.5, 0.5)$    | 1.000           | 0.469  | 0.531           |
| $(0.1, 0.9)$    | 3.005           | 0.469  | 2.536           |
| $(0.99, 0.01)$  | 0.677           | 0.469  | 0.208           |

Chú ý: $H(p, p) = H(p)$, mọi $q \\neq p$ đều cho $H(p, q) > H(p)$. KL $= 0$ ⇔ $q = p$.

### 4.2. Hệ quả "entropy max của uniform"

Áp $D_{KL}(p \\parallel u) \\geq 0$ với $u = $ uniform trên $n$ outcome:

$$\\begin{aligned}
D_{KL}(p \\parallel u) &= \\sum p(x) \\log\\frac{p(x)}{1/n} \\\\
             &= \\sum p(x) [\\log p(x) + \\log n] \\\\
             &= -H(p) + \\log n \\geq 0 \\\\
\\Rightarrow H(p) &\\leq \\log n.
\\end{aligned}$$

Dấu bằng ⇔ $p = u$ (uniform). □

### 4.3. Liên hệ với mutual information (preview)

Mutual information đo "X và Y cho biết bao nhiêu về nhau":

$$\\begin{aligned}
I(X; Y) &= D_{KL}(p(x, y) \\parallel p(x) p(y)) \\\\
        &= H(X) + H(Y) - H(X, Y)
\\end{aligned}$$

(với $H(X, Y)$ là joint entropy, không phải cross). Ta có
$I(X; Y) \\geq 0$, $= 0$ ⇔ $X \\perp Y$. Bài sau (Tầng 6) dùng MI để dẫn
contrastive loss (CLIP).

> 📝 **Tóm tắt §4.**
> - $H(p, q) = H(p) + D_{KL}(p \\parallel q)$.
> - Minimize cross-entropy ≡ minimize KL (khi $p$ cố định).
> - $H(p) \\leq \\log n$ (uniform có entropy max) — chứng minh dùng $D_{KL} \\geq 0$.

---

## 5. Cross-entropy loss trong classification

### 5.1. Setup

Phân loại có $K$ lớp. Với mẫu $(x, y)$:
- $y \\in \\{1, \\dots, K\\}$ là class thật.
- Encode thành **one-hot**: $p_y = e_y = (0, \\dots, 0, 1, 0, \\dots, 0)$ (vị
  trí thứ $y = 1$).
- Model output $q = (q_1, \\dots, q_K)$ (sau softmax), $\\sum_k q_k = 1$, $q_k \\geq 0$.

**Loss** trên một mẫu:

$$L(x, y) = H(p_y, q) = -\\sum_k p_y[k] \\log q_k = -\\log q_y$$

(Chỉ còn một số hạng vì $p_y$ one-hot.)

Trên toàn batch $N$ mẫu:

$$L = -\\frac{1}{N} \\sum_i \\log q_{y_i}$$

### 5.2. Walk-through số

Giả sử 3-class, $y = 2$ (class 2). One-hot $p = (0, 1, 0)$.

**Trường hợp A — model dự đúng mạnh:** $q = (0.05, 0.9, 0.05)$.

$$\\begin{aligned}
L &= -\\log 0.9 \\approx -(-0.1054) = 0.1054 \\text{ nat} \\\\
  &\\approx 0.152 \\text{ bit}
\\end{aligned}$$

**Trường hợp B — model dự đúng nhẹ:** $q = (0.3, 0.4, 0.3)$.

$$L = -\\log 0.4 \\approx 0.916 \\text{ nat} \\approx 1.322 \\text{ bit}$$

**Trường hợp C — model dự sai nặng:** $q = (0.85, 0.1, 0.05)$.

$$L = -\\log 0.1 \\approx 2.303 \\text{ nat} \\approx 3.322 \\text{ bit}$$

**Trường hợp D — model "uniform" (chưa học gì):** $q = (1/3, 1/3, 1/3)$.

$$L = -\\log(1/3) \\approx 1.099 \\text{ nat} \\approx 1.585 \\text{ bit}$$

→ Loss random baseline trên $K = 3$ lớp là $\\log K = \\log 3$. Trên $K = 10$
(MNIST) baseline $= \\log 10 \\approx 2.303 \\text{ nat} \\approx 3.322 \\text{ bit}$. Khi training, loss
nên giảm xuống dưới $\\log K$ rất nhanh nếu model có signal.

### 5.3. Binary cross-entropy (BCE)

Trường hợp $K = 2$ đặc biệt: gọi $p = q_1$ (xác suất class 1), $y \\in \\{0, 1\\}$:

$$L(x, y) = -[y \\log p + (1 - y) \\log(1 - p)]$$

- Nếu $y = 1$: $L = -\\log p$. $p$ càng gần 1 → loss càng nhỏ.
- Nếu $y = 0$: $L = -\\log(1 - p)$. $p$ càng gần 0 → loss càng nhỏ.

**Ví dụ:** $y = 1$, $p = 0.95$ → $L = -\\log 0.95 \\approx 0.0513$ nat. Còn $y = 1$,
$p = 0.05$ → $L = -\\log 0.05 \\approx 2.996$ nat (phạt nặng).

> 💡 **Hình dung.** Nhìn đồ thị $-\\log p$ trên $(0, 1]$: tại $p = 1$, loss $= 0$;
> tại $p \\to 0$, loss $\\to \\infty$. **Bất đối xứng cực mạnh** — model "rất tự tin sai"
> bị phạt rất nặng. Đây là lý do BCE/CE phản ánh tốt cảm giác "confidence
> calibration".

### 5.4. Vì sao cross-entropy thay vì MSE cho classification?

Một câu hỏi rất tự nhiên: tại sao không dùng $(q_y - 1)^2 + \\sum_{k \\neq y} q_k^2$ (MSE)?

3 lý do:

1. **Gradient không bị bão hòa (saturate) ở sai mạnh.** Với softmax
   output, đạo hàm của CE theo logits cực kỳ gọn: $\\frac{\\partial L}{\\partial z_k} = q_k - p_k$.
   Khi sai, gradient vẫn lớn → learning nhanh. MSE qua softmax có gradient
   bị nhân thêm $q(1-q)$ → bão hòa khi $q$ gần 0 hoặc 1.
2. **Phù hợp với MLE.** CE $= -\\log$ likelihood của categorical distribution
   (xem §6) → có nền tảng xác suất chặt chẽ.
3. **Phân tán xác suất sai bị phạt mạnh** (do $\\log p$ đi xuống $-\\infty$),
   tránh việc model "đứng giữa" mãi mãi.

> ⚠ **Lỗi thường gặp.**
> - **$\\log(0) = -\\infty$ → NaN loss.** Khi $q_y = 0$ do underflow/softmax sai,
>   loss vô hạn. Solution: clip — $\\log(\\max(q, \\varepsilon))$ với $\\varepsilon = 10^{-7}$. Hoặc
>   dùng \`log_softmax\` trực tiếp (numerically stable).
> - **Áp CE lên logits trực tiếp (chưa softmax).** Thư viện thường có
>   \`CrossEntropyLoss(logits, labels)\` — đã bao gồm log_softmax bên trong.
>   Nếu tự softmax rồi truyền vào, sẽ double-softmax → sai.
> - **One-hot vs index.** PyTorch nhận label dạng **index** (\`tensor(2)\`),
>   không phải one-hot. Tự tay one-hot rồi nhân lại ổn, nhưng phí.

> 📝 **Tóm tắt §5.**
> - One-hot true $p$ → $L = -\\log q_{\\text{class true}}$.
> - BCE = phiên bản 2-class. $K = 10$ baseline $= \\log 10 \\approx 2.303$ nat.
> - Cross-entropy có gradient tốt + phù hợp MLE → chuẩn cho classification.

---

## 6. Liên hệ MLE → cross-entropy

Đây là cầu nối quan trọng. [Lesson 07](../lesson-07-mle/) đã dạy MLE:
chọn $\\theta$ maximize log-likelihood. Bài này show: với data discrete, MLE
**tương đương** minimize cross-entropy giữa data distribution và model.

### 6.1. Dẫn dắt

Cho dataset $D = \\{(x_i, y_i)\\}_{i=1}^N$. Gọi $p_{\\text{data}}(x, y)$ là phân phối
thực nghiệm (empirical):

$$p_{\\text{data}}(x, y) = \\frac{1}{N} \\sum_i \\mathbb{1}\\{x_i = x, y_i = y\\}$$

Model $q_\\theta(y \\mid x)$ được train bằng MLE:

$$\\begin{aligned}
\\theta_{\\text{MLE}} &= \\arg\\max_\\theta \\sum_i \\log q_\\theta(y_i \\mid x_i) \\\\
      &= \\arg\\max_\\theta N \\cdot E_{p_{\\text{data}}}[\\log q_\\theta(Y \\mid X)] \\\\
      &= \\arg\\min_\\theta -E_{p_{\\text{data}}}[\\log q_\\theta(Y \\mid X)] \\\\
      &= \\arg\\min_\\theta H(p_{\\text{data}}, q_\\theta) \\quad (\\text{conditional cross-entropy})
\\end{aligned}$$

→ **Minimize cross-entropy ≡ MLE.** Tương đương:

$$\\theta_{\\text{MLE}} = \\arg\\min_\\theta D_{KL}(p_{\\text{data}} \\parallel q_\\theta)$$

(Vì $H(p_{\\text{data}}, q_\\theta) = H(p_{\\text{data}}) + D_{KL}(p_{\\text{data}} \\parallel q_\\theta)$, và $H(p_{\\text{data}})$
không phụ thuộc $\\theta$.)

### 6.2. Walk-through MNIST

- $N$ ảnh, mỗi ảnh có label $y \\in \\{0, \\dots, 9\\}$.
- Model neural net cho $q_\\theta(y \\mid x) = $ softmax 10 logits.
- Mỗi ảnh đóng góp loss $-\\log q_\\theta(y_i \\mid x_i)$.
- Batch loss = trung bình ⇒ minimize batch loss ≈ minimize KL với
  empirical distribution.

Cụ thể: epoch 0 (random init), batch loss $\\approx \\log 10 \\approx 2.303$. Sau khi
train, MNIST đạt loss ~0.05 nat → tương đương $q_\\theta(y_{\\text{true}} \\mid x) \\approx \\exp(-0.05) \\approx 0.95$ (model tự tin 95% vào class đúng trung bình).

### 6.3. Regression và cross-entropy

Với Gaussian likelihood (regression $y \\mid x \\sim N(\\mu_\\theta(x), \\sigma^2)$):

$$-\\log q_\\theta(y \\mid x) = \\frac{1}{2} \\log(2\\pi\\sigma^2) + \\frac{(y - \\mu_\\theta(x))^2}{2\\sigma^2}$$

→ Minimize negative log-likelihood ≡ minimize MSE (loại bỏ hằng số). Vậy
**MSE cho regression = cross-entropy ngầm** (cross-entropy với Gaussian
model). Cùng một framework MLE.

> 📝 **Tóm tắt §6.**
> - MLE ≡ minimize $D_{KL}(p_{\\text{data}} \\parallel q_\\theta)$ ≡ minimize cross-entropy.
> - Classification → CE loss. Regression với Gaussian → MSE loss. Cùng MLE.

---

## 7. LLM training: next-token prediction

### 7.1. Cấu trúc loss

Cho sequence token $(t_1, t_2, \\dots, t_T)$. LLM autoregressive output ở
position $t$ là phân phối $q_\\theta(\\cdot \\mid t_{<t})$ trên toàn vocab cỡ $V$
(GPT-2: $V = 50257$, Llama 3: $V \\approx 128000$).

Loss trên 1 sequence:

$$L = -\\frac{1}{T} \\sum_{t=1}^T \\log q_\\theta(t_t \\mid t_{<t})$$

Trên batch $B$ sequence, lấy trung bình. Đây là **per-token cross-entropy**.

### 7.2. Walk-through 1 câu nhỏ

Câu input: \`"Hello world"\` được tokenize thành 2 token: $[t_1 = 15496, t_2 = 995]$
(giả lập như GPT-2 BPE).

Khi train, model nhận $[\\text{BOS}, t_1]$ và phải predict $t_2$:
- Position 0: input BOS → predict $t_1 = 15496$. Loss $= -\\log q_\\theta(15496 \\mid \\text{BOS})$.
- Position 1: input $[\\text{BOS}, t_1]$ → predict $t_2 = 995$. Loss $= -\\log q_\\theta(995 \\mid \\text{BOS}, t_1)$.

Giả sử model gán $q_\\theta(15496 \\mid \\text{BOS}) = 0.001$ (1/1000 — chưa học), và
$q_\\theta(995 \\mid \\text{BOS}, t_1) = 0.05$ (đã đoán được phần nào vì "world" hay đi sau
"Hello"):

$$\\begin{aligned}
L_1 &= -\\log 0.001 \\approx 6.908 \\text{ nat} \\\\
L_2 &= -\\log 0.05 \\approx 2.996 \\text{ nat} \\\\
L_{\\text{avg}} &= (6.908 + 2.996) / 2 = 4.952 \\text{ nat}
\\end{aligned}$$

Sau khi train tốt:
- $q_\\theta(15496 \\mid \\text{BOS}) = 0.01$ → $L_1 = 4.605$
- $q_\\theta(995 \\mid \\text{Hello}) = 0.7$ → $L_2 = 0.357$
- $L_{\\text{avg}} = 2.481$ nat

Càng train, càng giảm. Sàn lý thuyết = entropy của tiếng Anh tự nhiên
(≈ 1.4 nat/token theo Shannon).

### 7.3. Cross-entropy ở level sequence

$$\\begin{aligned}
L &= E_{t_{1:T} \\sim p_{\\text{data}}} \\left[-\\frac{1}{T} \\sum \\log q_\\theta(t_t \\mid t_{<t})\\right] \\\\
  &= \\frac{1}{T} \\sum H(p_{\\text{data}}(t_t \\mid t_{<t}), q_\\theta(t_t \\mid t_{<t}))
\\end{aligned}$$

Vẫn là cross-entropy, chỉ là **average over positions + conditional on
context**. Frameworks (PyTorch, JAX) cài đặt y hệt, chỉ flatten:
\`loss = F.cross_entropy(logits.view(-1, V), targets.view(-1))\`.

> 📝 **Tóm tắt §7.**
> - LLM loss = per-token cross-entropy averaged over positions.
> - Mỗi position là 1 classification trên $V$ (vocab size).
> - Train tốt = loss giảm dần về entropy thật của ngôn ngữ.

---

## 8. Perplexity

### 8.1. Định nghĩa

$$\\begin{aligned}
\\text{Perplexity}(q) &= \\exp(H(p_{\\text{data}}, q)) \\quad (\\text{nếu } \\log = \\ln, H \\text{ đơn vị nat}) \\\\
              &= 2^{H_{\\text{bit}}(p_{\\text{data}}, q)} \\quad (\\text{nếu } \\log = \\log_2, \\text{đơn vị bit})
\\end{aligned}$$

Trong thực hành LLM: $\\text{PPL} = \\exp(\\text{avg per-token loss})$.

### 8.2. Trực giác — "số token tương đương model lưỡng lự"

Nếu PPL $= k$, model "lưỡng lự" như đang chọn đều giữa $k$ token. Một
cách hình dung:

- PPL $= 1$ → model dự đoán tuyệt đối chính xác mỗi token (loss $= 0$). Cực
  hiếm — chỉ với data có entropy $= 0$.
- PPL $= V$ (vocab size) → model gán đều, hoàn toàn random.
- Mọi giá trị trung gian = "n tokens equivalent".

### 8.3. Walk-through số

Giả sử vocab $V = 4$ (siêu nhỏ — chỉ minh hoạ). Phân phối thật mỗi
position là $p = (0.7, 0.1, 0.1, 0.1)$.

**Model A (fair):** $q_A = (0.25, 0.25, 0.25, 0.25)$.

$$\\begin{aligned}
H(p, q_A) &= -\\sum p \\log q_A \\\\
          &= -\\log 0.25 \\quad (\\text{vì } \\textstyle\\sum p = 1) \\\\
          &= \\ln 4 = 1.386 \\text{ nat} \\\\
\\text{PPL}_A &= \\exp(1.386) = 4 \\checkmark
\\end{aligned}$$

→ Model A "không biết gì" → PPL = vocab size.

**Model B (concentrated, sai chỗ):** $q_B = (0.1, 0.7, 0.1, 0.1)$.

$$\\begin{aligned}
H(p, q_B) &= -(0.7 \\ln 0.1 + 0.1 \\ln 0.7 + 0.1 \\ln 0.1 + 0.1 \\ln 0.1) \\\\
          &= -(0.7 \\cdot (-2.303) + 0.1 \\cdot (-0.357) + 0.1 \\cdot (-2.303) + 0.1 \\cdot (-2.303)) \\\\
          &= -(-1.612 - 0.0357 - 0.230 - 0.230) \\\\
          &= 2.108 \\text{ nat} \\\\
\\text{PPL}_B &= \\exp(2.108) \\approx 8.23
\\end{aligned}$$

→ Tệ hơn cả random! "Tự tin sai" bị phạt nặng.

**Model C (concentrated, đúng chỗ):** $q_C = (0.7, 0.1, 0.1, 0.1)$.

$$\\begin{aligned}
H(p, q_C) &= H(p) \\quad (\\text{vì } q_C = p) \\\\
          &= -(0.7 \\ln 0.7 + 3 \\cdot 0.1 \\ln 0.1) \\\\
          &= -(0.7 \\cdot (-0.357) + 3 \\cdot 0.1 \\cdot (-2.303)) \\\\
          &= -(-0.250 - 0.691) \\\\
          &= 0.941 \\text{ nat} \\\\
\\text{PPL}_C &= \\exp(0.941) \\approx 2.563
\\end{aligned}$$

→ Cực tốt: tương đương "lưỡng lự giữa 2.56 token". Đây là sàn lý thuyết.

### 8.4. Số liệu thực tế

| Model            | Dataset                | PPL (per-token, nat→PPL) |
|------------------|------------------------|--------------------------|
| GPT-2 small      | WikiText-103           | ≈ 29                     |
| GPT-2 XL         | WikiText-103           | ≈ 18                     |
| GPT-3 175B       | WikiText (zero-shot)   | ≈ 20                     |
| Llama 2 7B       | WikiText               | ≈ 9                      |
| Llama 2 70B      | WikiText               | ≈ 5.5                    |
| Human reference  | English text (Shannon) | ≈ 4–10 (1.4 nat/char ~  |
|                  |                        |  PPL_char ≈ 4 với log e) |

> ❓ **Câu hỏi tự nhiên.**
>
> - *"PPL bao nhiêu là tốt?"* — phụ thuộc tokenizer (BPE 50k khác từ
>   tokenizer 32k) và dataset. Chỉ so sánh trong **cùng setup**. GPT-3
>   PPL=20 trên WikiText khá tốt thời 2020; Llama 3 hiện ~5-6 cùng dataset.
> - *"Sao không dùng accuracy?"* — vì next-token prediction có nhiều
>   token "hợp lý" cùng lúc. Accuracy chỉ đếm exact match, không phản ánh
>   "model tự tin tới đâu". PPL/CE mượt hơn.
> - *"PPL tăng có nghĩa model tệ hơn không?"* — đúng ($\\text{PPL} = \\exp(\\text{loss})$,
>   monotonic). Nhưng có thể PPL thấp mà generation kém (perplexity ≠
>   chất lượng cảm nhận). Cần thêm eval (HumanEval, MMLU, win rate).

> 📝 **Tóm tắt §8.**
> - PPL $= \\exp(\\text{cross-entropy})$.
> - PPL $= 1$ lý tưởng, PPL $= V$ hoàn toàn random.
> - Chỉ so sánh PPL trong cùng tokenizer + dataset.

---

## 9. Jensen-Shannon divergence

### 9.1. Định nghĩa

$$\\begin{aligned}
m &= (p + q) / 2 \\\\
\\text{JSD}(p, q) &= \\frac{1}{2} D_{KL}(p \\parallel m) + \\frac{1}{2} D_{KL}(q \\parallel m)
\\end{aligned}$$

### 9.2. Tính chất

1. **Đối xứng:** $\\text{JSD}(p, q) = \\text{JSD}(q, p)$.
2. **Bị chặn:** $0 \\leq \\text{JSD} \\leq \\log 2$ (với log nat) hoặc $\\leq 1$ (với $\\log_2$).
3. $\\text{JSD} = 0$ ⇔ $p = q$.
4. **$\\sqrt{\\text{JSD}}$ là metric thực sự** (thỏa cả 3 tiên đề khoảng cách).
5. **Không bao giờ vô hạn** — vì $m(x) \\geq p(x)/2 > 0$ bất cứ chỗ nào
   $p(x) > 0$ (tương tự $q$), nên các log không bùng nổ.

### 9.3. Ví dụ số

$p = (0.9, 0.1)$, $q = (0.1, 0.9)$. (Vốn $D_{KL}(p \\parallel q) = 0.9 \\log(9) + 0.1 \\log(1/9)$,
nat: $0.9 \\cdot 2.197 + 0.1 \\cdot (-2.197) = 1.758$ nat — rất lớn.)

$$\\begin{aligned}
m &= ((0.9 + 0.1)/2, (0.1 + 0.9)/2) = (0.5, 0.5) \\\\
D_{KL}(p \\parallel m) &= 0.9 \\log(0.9/0.5) + 0.1 \\log(0.1/0.5) \\\\
             &= 0.9 \\log 1.8 + 0.1 \\log 0.2 \\\\
             &= 0.9 \\cdot 0.588 + 0.1 \\cdot (-1.609) \\\\
             &= 0.529 - 0.161 = 0.368 \\text{ nat} \\\\
D_{KL}(q \\parallel m) &= 0.1 \\log(0.1/0.5) + 0.9 \\log(0.9/0.5) = 0.368 \\text{ nat} \\quad (\\text{do } p \\leftrightarrow q \\text{ symmetric quanh } m) \\\\
\\text{JSD}(p, q) &= 0.5 \\cdot 0.368 + 0.5 \\cdot 0.368 = 0.368 \\text{ nat} \\\\
          &\\approx 0.532 \\text{ bit}
\\end{aligned}$$

(Tối đa lý thuyết $= \\log 2 \\approx 0.693$ nat $= 1$ bit, khi $p, q$ có support
hoàn toàn rời nhau.)

### 9.4. Dùng ở đâu

- **GAN** (Goodfellow 2014) — generator minimize $\\text{JSD}(p_{\\text{data}}, p_{\\text{gen}})$ thực
  ra ngầm. Sau này WGAN chuyển sang Wasserstein vì JSD saturate khi 2
  phân phối rời nhau.
- **t-SNE / embedding evaluation** — đo "khoảng cách phân phối" symmetric.
- **Information retrieval** — so sánh document distribution.

> 📝 **Tóm tắt §9.**
> - JSD = symmetric KL, bị chặn $\\leq \\log 2$.
> - Không vô hạn (an toàn hơn KL).
> - $\\sqrt{\\text{JSD}}$ là metric thực sự.

---

## 10. Tổng hợp câu hỏi tự nhiên (callout ❓)

> ❓ **Câu hỏi 1: Tại sao cross-entropy chứ không MSE cho classification?**
>
> Đã trả lời §5.4. Tóm lại: (a) gradient tốt qua softmax ($q - p$,
> không bão hòa); (b) phù hợp MLE — CE $= -\\log$ likelihood của categorical;
> (c) phạt nặng "tự tin sai" đúng tinh thần.

> ❓ **Câu hỏi 2: KL có phải khoảng cách (metric) không?**
>
> Đã trả lời §3.4. Không — không đối xứng + không tam giác. Dùng JSD
> hoặc Wasserstein nếu cần metric thực sự.

> ❓ **Câu hỏi 3: Khi target = uniform, cross-entropy là gì?**
>
> $H(\\text{uniform}, q) = -\\sum (1/n) \\log q_k = -(1/n) \\sum \\log q_k$. Đây là **trung
> bình hình học âm** của các $q_k$. Đặc biệt: nếu thêm constraint $\\sum q_k = 1$,
> bài toán argmin theo $q$ ($p$ fixed uniform) → $q = $ uniform. Đây là
> "regularization với uniform target" trong **label smoothing**: thay vì
> one-hot, target dùng $\\tilde{p} = (1 - \\varepsilon) e_y + \\varepsilon \\cdot (1/K) \\cdot \\mathbf{1}$ — kết hợp uniform với
> one-hot, giúp model bớt overconfident.

> ❓ **Câu hỏi 4: Vì sao log trong information có thể đổi cơ số tùy ý?**
>
> Vì đổi cơ số chỉ thay đổi đơn vị (bit ↔ nat ↔ dit). Mọi tính chất
> ($H \\geq 0$, $D_{KL} \\geq 0$, Gibbs) đều không phụ thuộc cơ số. Trong ML chọn
> $\\ln$ (nat) cho gọn về đạo hàm; trong info theory chọn $\\log_2$ (bit).

> ❓ **Câu hỏi 5: Per-token loss vs sequence loss của LLM khác nhau thế nào?**
>
> Per-token loss $= -\\log q(t_t \\mid \\text{context})$ ở mỗi position. Sequence loss =
> tổng/trung bình theo position. Báo cáo paper hay dùng **per-token NLL**
> để dễ so sánh giữa các sequence độ dài khác nhau.

---

## 11. Lỗi thường gặp (⚠ tổng hợp)

> ⚠ **Lỗi 1: $\\log(0) = -\\infty$ → NaN.**
> Khi $q$ có entry bằng 0 (do softmax underflow hoặc model predict
> tuyệt đối), $\\log \\to \\infty$, loss → NaN, gradient → NaN, model "die". Fix:
> - Clip: $q_{\\text{safe}} = \\max(q, \\varepsilon)$ với $\\varepsilon = 10^{-7}$ đến $10^{-12}$.
> - Hoặc dùng \`log_softmax\` trực tiếp (numerically stable: $\\text{log\\_softmax}(z) = z - \\text{logsumexp}(z)$).
> - PyTorch \`F.cross_entropy(logits, target)\` đã handle tự động.

> ⚠ **Lỗi 2: Quên dấu minus.**
> Nhiều người viết $H(p, q) = \\sum p \\log q$ thay vì $-\\sum p \\log q$. Vì
> $\\log q \\leq 0$ (do $q \\leq 1$), bỏ minus → loss âm, optimizer push về $-\\infty$,
> sai hướng tối ưu.

> ⚠ **Lỗi 3: Nhầm chiều KL.**
> $D_{KL}(p \\parallel q) \\neq D_{KL}(q \\parallel p)$. Trong MLE/cross-entropy training, chuẩn là
> $D_{KL}(p_{\\text{data}} \\parallel q_{\\text{model}})$ (forward). Variational inference / VAE dùng
> $D_{KL}(q_\\theta \\parallel p)$ (reverse, vì $p$ là posterior khó tính). Nhầm chiều
> → behavior khác hẳn (mode-covering vs mode-seeking).

> ⚠ **Lỗi 4: Double softmax.**
> Một số framework \`CrossEntropyLoss\` nhận **logits** (pre-softmax). Nếu
> tự softmax rồi nhúng vào, sẽ thành \`softmax(softmax(z))\` — sai. Hoặc
> dùng \`NLLLoss(log_softmax(z), target)\` — ổn.

> ⚠ **Lỗi 5: One-hot vs index.**
> PyTorch \`F.cross_entropy(logits, targets)\` nhận \`targets\` dạng **int**
> class index. TensorFlow \`categorical_crossentropy\` nhận one-hot, còn
> \`sparse_categorical_crossentropy\` nhận index. Đọc docs cẩn thận.

> ⚠ **Lỗi 6: So sánh PPL khác tokenizer.**
> GPT-2 (BPE 50k) PPL=20 ≠ Llama (BPE 32k) PPL=20 trên cùng text.
> Tokenizer ảnh hưởng số token → ảnh hưởng per-token loss. Chỉ so sánh
> trong cùng setup.

---

## 12. Bài tập

### Bài 1 (entropy)

Tính $H$ (đơn vị bit) cho mỗi phân phối:
- (a) $p = (0.5, 0.5)$.
- (b) $p = (0.25, 0.25, 0.25, 0.25)$.
- (c) $p = (0.5, 0.25, 0.125, 0.125)$.
- (d) $p = (0.4, 0.3, 0.2, 0.1)$.

### Bài 2 (cross-entropy)

Cho $p = (0.6, 0.3, 0.1)$. Tính $H(p, q)$ cho:
- (a) $q = (1/3, 1/3, 1/3)$.
- (b) $q = (0.6, 0.3, 0.1)$.
- (c) $q = (0.1, 0.3, 0.6)$ (đảo).

Phân tích nào lớn nhất / nhỏ nhất?

### Bài 3 (KL không đối xứng)

Cho $p = (0.7, 0.3)$, $q = (0.3, 0.7)$.
- Tính $D_{KL}(p \\parallel q)$ và $D_{KL}(q \\parallel p)$.
- Tính $\\text{JSD}(p, q)$.
- So sánh cả ba.

### Bài 4 (cross-entropy loss classification)

Bài toán 4-class. True label $y = 1$ (index 1, one-hot $(0, 1, 0, 0)$).
Tính loss với mỗi model output:
- (a) $q = (0.1, 0.7, 0.1, 0.1)$.
- (b) $q = (0.25, 0.25, 0.25, 0.25)$.
- (c) $q = (0.7, 0.1, 0.1, 0.1)$.
- (d) $q = (0.01, 0.01, 0.97, 0.01)$.

Sắp xếp từ tốt → tệ.

### Bài 5 (perplexity)

Một LLM trên test set có per-token loss $= 2.5$ nat.
- (a) Tính perplexity.
- (b) Nếu vocab size $V = 50000$, model "fair" có PPL bao nhiêu?
- (c) Model hiện tại tốt hơn random bao nhiêu lần?

### Bài 6 (label smoothing)

Label smoothing thay one-hot $p$ bằng $\\tilde{p} = (1 - \\varepsilon) e_y + \\varepsilon \\cdot (1/K) \\cdot \\mathbf{1}$
(với $K = 10$ lớp, $\\varepsilon = 0.1$).
- (a) Viết $\\tilde{p}$ cụ thể khi $y = 3$.
- (b) Tính $H(\\tilde{p}, q)$ cho $q = (0.05, \\dots, 0.05, 0.55, 0.05, \\dots, 0.05)$ (giá
  trị 0.55 ở index 3, 0.05 ở các index khác — tổng $= 0.55 + 9 \\cdot 0.05 = 1.0$).
- (c) So sánh với loss khi không có smoothing.

---

## 13. Lời giải chi tiết

### Lời giải bài 1

Dùng $\\log_2$.

- (a) $H = -(0.5 \\cdot (-1) + 0.5 \\cdot (-1)) = 1$ bit. ✓
- (b) $H = -4 \\cdot (0.25 \\cdot (-2)) = 2$ bit (uniform trên 4 outcome → $\\log 4 = 2$).
- (c) $$\\begin{aligned}
  H &= -(0.5 \\cdot (-1) + 0.25 \\cdot (-2) + 0.125 \\cdot (-3) + 0.125 \\cdot (-3)) \\\\
    &= -(-0.5 - 0.5 - 0.375 - 0.375) = 1.75 \\text{ bit}
  \\end{aligned}$$
  Huffman code dài trung bình đúng 1.75 bit.
- (d) $\\log_2 0.4 \\approx -1.322$, $\\log_2 0.3 \\approx -1.737$, $\\log_2 0.2 \\approx -2.322$,
  $\\log_2 0.1 \\approx -3.322$.
  $$\\begin{aligned}
  H &= -(0.4 \\cdot (-1.322) + 0.3 \\cdot (-1.737) + 0.2 \\cdot (-2.322) + 0.1 \\cdot (-3.322)) \\\\
    &= -(-0.5288 - 0.5211 - 0.4644 - 0.3322) \\\\
    &= 1.8465 \\text{ bit}
  \\end{aligned}$$

**Sanity check:** sắp lại: (a)=1, (c)=1.75, (d)=1.846, (b)=2. Entropy max ở uniform (b), thấp nhất
ở binary fair (vì chỉ có 2 outcome).

### Lời giải bài 2

$p = (0.6, 0.3, 0.1)$. $H(p) = -(0.6 \\log 0.6 + 0.3 \\log 0.3 + 0.1 \\log 0.1)$.
Tính: $0.6 \\log_2 0.6 = 0.6 \\cdot (-0.737) = -0.442$; $0.3 \\log_2 0.3 = 0.3 \\cdot (-1.737) = -0.521$; $0.1 \\log_2 0.1 = 0.1 \\cdot (-3.322) = -0.332$. Tổng $H(p) = 1.295$ bit.

- (a) $q = $ uniform. $H(p, q) = -\\sum p \\log(1/3) = \\log_2 3 = 1.585$ bit.
  KL $= 1.585 - 1.295 = 0.290$ bit.
- (b) $q = p$. $H(p, q) = H(p) = 1.295$ bit. KL $= 0$.
- (c) $q = (0.1, 0.3, 0.6)$.
  $$\\begin{aligned}
  H(p, q) &= -(0.6 \\log 0.1 + 0.3 \\log 0.3 + 0.1 \\log 0.6) \\\\
  &= -(0.6 \\cdot (-3.322) + 0.3 \\cdot (-1.737) + 0.1 \\cdot (-0.737)) \\\\
  &= -(-1.993 - 0.521 - 0.0737) \\\\
  &= 2.588 \\text{ bit}
  \\end{aligned}$$
  KL $= 2.588 - 1.295 = 1.293$ bit.

**Lớn nhất: (c)** (model sai chiều). **Nhỏ nhất: (b)**. (a) ở giữa.

### Lời giải bài 3

$p = (0.7, 0.3)$, $q = (0.3, 0.7)$ — đối xứng quanh $(0.5, 0.5)$.

**KL forward:**

$$\\begin{aligned}
D_{KL}(p \\parallel q) &= 0.7 \\log_2(0.7/0.3) + 0.3 \\log_2(0.3/0.7) \\\\
             &= 0.7 \\log_2(7/3) + 0.3 \\log_2(3/7) \\\\
             &= 0.7 \\cdot 1.222 + 0.3 \\cdot (-1.222) \\\\
             &= 0.855 - 0.367 \\\\
             &= 0.488 \\text{ bit}
\\end{aligned}$$

**KL reverse:**

$$\\begin{aligned}
D_{KL}(q \\parallel p) &= 0.3 \\log_2(0.3/0.7) + 0.7 \\log_2(0.7/0.3) \\\\
             &= 0.3 \\cdot (-1.222) + 0.7 \\cdot 1.222 \\\\
             &= -0.367 + 0.855 \\\\
             &= 0.488 \\text{ bit}
\\end{aligned}$$

(Trong trường hợp đặc biệt này KL hai chiều bằng nhau do $p, q$ swap
symmetric với nhau quanh uniform.)

**JSD:** $m = (0.5, 0.5)$.

$$\\begin{aligned}
D_{KL}(p \\parallel m) &= 0.7 \\log_2(0.7/0.5) + 0.3 \\log_2(0.3/0.5) \\\\
             &= 0.7 \\cdot 0.485 + 0.3 \\cdot (-0.737) \\\\
             &= 0.340 - 0.221 \\\\
             &= 0.119 \\text{ bit} \\\\
D_{KL}(q \\parallel m) &= 0.3 \\log_2(0.3/0.5) + 0.7 \\log_2(0.7/0.5) = 0.119 \\text{ bit} \\quad (\\text{đối xứng}) \\\\
\\text{JSD} &= 0.5 \\cdot 0.119 + 0.5 \\cdot 0.119 = 0.119 \\text{ bit}
\\end{aligned}$$

**Quan sát:** $\\text{JSD} = 0.119 < 0.488 = D_{KL}$ (cả hai chiều). JSD luôn nhỏ hơn
hoặc bằng KL — bị "softened" qua trung gian $m$.

### Lời giải bài 4

True class index = 1. Loss $= -\\log_2 q[1]$.

- (a) $q[1] = 0.7$ → $L = -\\log_2 0.7 = 0.515$ bit.
- (b) $q[1] = 0.25$ → $L = -\\log_2 0.25 = 2$ bit ($= \\log K = \\log 4$,
  random baseline).
- (c) $q[1] = 0.1$ → $L = -\\log_2 0.1 = 3.322$ bit.
- (d) $q[1] = 0.01$ → $L = -\\log_2 0.01 = 6.644$ bit.

**Sắp xếp tốt → tệ:** (a) < (b) < (c) < (d). (d) cực tệ vì "tự tin sai".

### Lời giải bài 5

- (a) $\\text{PPL} = \\exp(2.5) \\approx 12.18$.
- (b) Fair model gán $1/V$ cho mọi token → cross-entropy $= \\ln V = \\ln 50000 \\approx 10.82$ nat → PPL $= 50000$ ($= V$).
- (c) Tỉ lệ $\\text{PPL}_{\\text{random}} / \\text{PPL}_{\\text{model}} = 50000 / 12.18 \\approx 4106$ lần. Model
  "lưỡng lự" ít hơn random hơn 4000 lần.

### Lời giải bài 6

$K = 10$, $\\varepsilon = 0.1$, $y = 3$.

- (a) Vị trí $y = 3$ có $\\tilde{p}[3] = (1 - 0.1) + 0.1 \\cdot (1/10) = 0.9 + 0.01 = 0.91$.
  Các vị trí khác: $\\tilde{p}[k] = 0.1 \\cdot (1/10) = 0.01$. Vector: $(0.01, 0.01, 0.01, 0.91, 0.01, 0.01, 0.01, 0.01, 0.01, 0.01)$. Verify tổng: $0.91 + 9 \\cdot 0.01 = 1$ ✓.
- (b) $q[3] = 0.55$, các vị trí khác $= 0.05$.
  $$\\begin{aligned}
  H(\\tilde{p}, q) &= -\\sum \\tilde{p}[k] \\log_2 q[k] \\\\
          &= -(0.91 \\cdot \\log_2 0.55 + 9 \\cdot 0.01 \\cdot \\log_2 0.05) \\\\
          &= -(0.91 \\cdot (-0.862) + 0.09 \\cdot (-4.322)) \\\\
          &= -(-0.785 - 0.389) \\\\
          &= 1.174 \\text{ bit}
  \\end{aligned}$$
- (c) Không smoothing: $H(e_3, q) = -\\log_2 0.55 = 0.862$ bit. Loss
  smoothing **cao hơn** một chút (1.174 vs 0.862) — vì thêm "spread" làm
  loss khó về 0 ngay cả khi model predict đúng class chính. Đó là cách
  smoothing **giảm overconfidence**.

---

## 14. Hết Tầng 5 — chuyển sang Tầng 6

Bạn đã hoàn thành **Tầng 5 — Probability**. Toàn bộ nền cho ML training:
- Lesson 01–02: xác suất + Bayes.
- Lesson 03–05: random variable rời rạc / liên tục / Gaussian.
- Lesson 06: expectation, variance, covariance.
- Lesson 07: MLE.
- Lesson 08 (bài này): cross-entropy + KL — **loss function chuẩn của ML**.

### Sang Tầng 6 — AI/ML

Tầng 6 ráp 5 tầng trước thành thuật toán ML thật:
- **Linear regression** (gradient descent + MSE = MLE Gaussian).
- **Logistic regression** (softmax + cross-entropy = MLE categorical).
- **Neural network** (chain rule + backprop từ Tầng 3 Calculus).
- **Embedding** (vector từ Tầng 4 Linear Algebra).
- **Attention + Transformer** (RoPE từ Tầng 2 Trig + matrix từ Tầng 4).
- **RAG, CLIP** — ứng dụng cuối.

Mọi công cụ đều đã sẵn. Cross-entropy bạn vừa học sẽ xuất hiện ở **mọi
loss của classification + LLM** trong Tầng 6.

### Liên kết nhanh

- ← [Lesson 07 — MLE](../lesson-07-mle/)
- 🏠 [Trang chính Tầng 5](../index.html)
- → Tầng 6 — AI/ML (sắp ra mắt)
- 📐 [Visualization Lesson 08](./visualization.html) — entropy explorer,
  KL comparator, classification demo, perplexity visualizer.
`;
