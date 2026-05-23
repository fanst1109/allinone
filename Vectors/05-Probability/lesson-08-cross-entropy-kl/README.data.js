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

1. **Định nghĩa được entropy \`H(p)\`** — đơn vị bit/nat, hiểu vì sao phân phối
   đều có entropy max và phân phối lệch có entropy thấp.
2. **Tính được cross-entropy \`H(p, q)\`** từ định nghĩa, hiểu nó là "chi phí mã
   hóa sample từ \`p\` khi dùng code tối ưu cho \`q\`".
3. **Tính được KL divergence \`D_KL(p || q)\`**, hiểu vì sao nó ≥ 0 và vì sao
   **không đối xứng** (\`D_KL(p||q) ≠ D_KL(q||p)\`).
4. **Dẫn được cross-entropy loss** trong classification từ MLE — hiểu vì sao
   "minimize log loss" tương đương "maximize likelihood".
5. **Hiểu binary cross-entropy** (BCE) cho binary classification và categorical
   cross-entropy cho multi-class.
6. **Tính được loss của LLM** ở mức next-token prediction, biết perplexity là
   \`exp(cross-entropy)\` và đọc được "GPT-3 perplexity ≈ 20" nghĩa là gì.
7. **Phân biệt JSD vs KL** — biết khi nào dùng JSD (symmetric, dùng trong GAN).

## Kiến thức tiền đề

- [Lesson 07 — MLE](../lesson-07-mle/) — bài này dẫn cross-entropy TRỰC TIẾP từ
  MLE. Bạn cần nắm "log-likelihood = Σ log p(x_i | θ)".
- [Algebra Lesson 04 — Powers, roots, logs](../../01-Algebra/lesson-04-powers-roots-logs/)
  — đặc biệt tính chất \`log(ab) = log a + log b\` và \`log(1/x) = -log x\`. Bài
  này dùng log khắp nơi.
- [Calculus Lesson 08 — Integrals](../../03-Calculus/lesson-08-integrals/) — cho
  phiên bản liên tục \`H(p) = -∫ p(x) log p(x) dx\`.
- [Probability Lesson 03 — Discrete random variables](../lesson-03-discrete-rv/)
  — PMF, expectation \`E[f(X)] = Σ p(x) f(x)\`.
- [Probability Lesson 06 — Expectation, variance](../lesson-06-expectation-variance/)
  — entropy = \`E_p[-log p(X)]\`, một dạng expectation đặc biệt.

> 💡 **Trực giác mở bài.** Tưởng tượng bạn cần gửi tin nhắn mỗi ngày báo
> "hôm nay trời nắng / mưa / có bão" qua một kênh truyền tin tốn tiền theo
> số bit. Nếu trời ở Sài Gòn (90% nắng, 9% mưa, 1% bão), bạn nên dùng code
> **ngắn** cho "nắng" và code dài cho "bão". Entropy đo "số bit tối thiểu
> trung bình" để gửi. Cross-entropy đo "số bit thực tế bạn dùng nếu bạn
> nghĩ phân phối là \`q\` (vd 33-33-33) trong khi thực tế là \`p\` (90-9-1)".
> KL đo "bạn lãng phí bao nhiêu bit vì hiểu sai phân phối". Cả bài này
> là làm rõ 3 đại lượng trên bằng số.

---

## 1. Entropy \`H(p)\`

### 1.1. Định nghĩa

Cho biến ngẫu nhiên rời rạc \`X\` nhận giá trị trong tập \`X = {x_1, ..., x_n}\`
với PMF \`p(x_i)\`. **Entropy** của \`X\` (hay của phân phối \`p\`) là:

\`\`\`
H(p) = -Σ_i p(x_i) log p(x_i)
     = E_p[-log p(X)]
\`\`\`

- Nếu \`log\` là \`log_2\` → đơn vị **bit** (Shannon).
- Nếu \`log\` là \`ln\` (cơ số \`e\`) → đơn vị **nat**.
- Nếu \`log\` là \`log_{10}\` → đơn vị **dit/hartley** (ít gặp).

**Quy ước:** \`0 · log 0 = 0\` (giới hạn \`lim_{p→0} p log p = 0\` — xem
[Calculus Lesson 04 — Limits](../../03-Calculus/lesson-04-limits/) nếu cần).

> 💡 **Trực giác.** Đại lượng \`-log p(x)\` là "lượng thông tin" (information
> content / surprisal) khi quan sát được sự kiện \`x\`. Sự kiện hiếm (p nhỏ)
> → surprisal cao; sự kiện gần chắc chắn (p ≈ 1) → surprisal ≈ 0. Entropy
> là **trung bình** của surprisal theo chính phân phối \`p\`.

### 1.2. Walk-through ≥ 4 ví dụ số (dùng log₂, đơn vị bit)

**Ví dụ 1 — Đồng xu fair \`p = (0.5, 0.5)\`.**

\`\`\`
H = -(0.5 · log₂ 0.5 + 0.5 · log₂ 0.5)
  = -(0.5 · (-1) + 0.5 · (-1))
  = -(-0.5 - 0.5)
  = 1 bit
\`\`\`

→ Cần đúng 1 bit để mã hóa kết quả (vd "H = 0, T = 1"). Đây là **entropy
tối đa** với biến ngẫu nhiên 2 outcome.

**Ví dụ 2 — Đồng xu lệch nhẹ \`p = (0.9, 0.1)\`.**

\`\`\`
log₂ 0.9 ≈ -0.152
log₂ 0.1 ≈ -3.322
H = -(0.9 · (-0.152) + 0.1 · (-3.322))
  = -(-0.137 - 0.332)
  = 0.469 bit
\`\`\`

→ Vì kết quả "khá đoán được" (90% là H), trung bình chỉ cần ~0.469 bit.
Nghe vô lý ("không thể truyền nửa bit") nhưng đúng khi gửi **dãy nhiều
lần** và mã hóa khối (xem mã Huffman, arithmetic coding).

**Ví dụ 3 — Đồng xu siêu lệch \`p = (0.99, 0.01)\`.**

\`\`\`
log₂ 0.99 ≈ -0.0145
log₂ 0.01 ≈ -6.6439
H = -(0.99 · (-0.0145) + 0.01 · (-6.6439))
  = -(-0.01435 - 0.06644)
  = 0.0808 bit
\`\`\`

→ Cực nhỏ vì gần như chắc chắn là H. Verify chiều ngược: nếu \`p = (1, 0)\`
thì \`H = 0\` (không có bất định gì hết).

**Ví dụ 4 — Phân phối đều 8 outcome \`p = (1/8, ..., 1/8)\`.**

\`\`\`
H = -Σ (1/8) log₂(1/8)
  = -8 · (1/8) · (-3)
  = 3 bit
\`\`\`

→ Khớp trực giác: 8 outcome cần \`log₂ 8 = 3\` bit để mã hóa (3 bit nhị phân
là đủ định danh 8 giá trị).

**Ví dụ 5 — Phân phối không đều 4 outcome \`p = (0.5, 0.25, 0.125, 0.125)\`.**

\`\`\`
log₂ 0.5    = -1
log₂ 0.25   = -2
log₂ 0.125  = -3
H = -(0.5·(-1) + 0.25·(-2) + 0.125·(-3) + 0.125·(-3))
  = -(-0.5 - 0.5 - 0.375 - 0.375)
  = 1.75 bit
\`\`\`

→ Thấp hơn \`log₂ 4 = 2\` bit (uniform). Huffman code optimal:
\`A=0, B=10, C=110, D=111\` cho độ dài trung bình đúng 1.75 bit/ký tự ✓.

### 1.3. Tính chất quan trọng

1. **\`H(p) ≥ 0\`**, với \`H(p) = 0\` ⇔ \`p\` deterministic (\`p(x*) = 1\` cho một
   \`x*\` nào đó).
2. **\`H(p) ≤ log n\`** với \`n = |X|\`, dấu bằng ⇔ \`p\` uniform. (Chứng minh
   ngắn ở §4.4 dùng Jensen.)
3. **Cộng tính cho biến độc lập:** \`H(X, Y) = H(X) + H(Y)\` nếu \`X ⊥ Y\`.

> ❓ **Câu hỏi tự nhiên.**
>
> - *"Sao lại là \`log\`?"* — vì ta muốn entropy của 2 biến độc lập = tổng
>   entropy. Mà số outcome ghép = tích, nên cần hàm biến tích thành tổng:
>   chỉ có \`log\`.
> - *"Đơn vị bit có nghĩa gì cho phân phối liên tục?"* — phân phối liên
>   tục dùng **differential entropy** \`h(p) = -∫ p(x) log p(x) dx\`, đơn
>   vị "nat" nếu \`log = ln\`. Có thể âm (vd Gaussian σ nhỏ). Khác với
>   entropy rời rạc về bản chất — không "đếm bit" được nữa.
> - *"Phân phối đều có entropy max — chứng minh sao?"* — xem §4.4
>   (chứng minh \`D_KL ≥ 0\` rồi áp vào \`q = uniform\`).

> 🔁 **Tự kiểm tra.**
> 1. Tính \`H\` cho \`p = (0.7, 0.2, 0.1)\` đơn vị bit.
> 2. Phân phối nào trong 3 outcome có entropy max? Tính giá trị max.
>
> <details><summary>Đáp án</summary>
>
> 1. \`H = -(0.7 log₂ 0.7 + 0.2 log₂ 0.2 + 0.1 log₂ 0.1)\`
>    \`= -(0.7·(-0.515) + 0.2·(-2.322) + 0.1·(-3.322))\`
>    \`= -(-0.360 - 0.464 - 0.332) = 1.157 bit\`.
> 2. Uniform \`(1/3, 1/3, 1/3)\` → \`H = log₂ 3 ≈ 1.585 bit\`.
>
> </details>

> 📝 **Tóm tắt §1.**
> - \`H(p) = -Σ p log p\` đo độ bất định, đơn vị bit (log₂) hoặc nat (ln).
> - Phân phối đều → entropy max \`= log n\`. Phân phối deterministic → 0.
> - \`-log p(x)\` = "surprisal", entropy = expectation của surprisal.

---

## 2. Cross-entropy \`H(p, q)\`

### 2.1. Định nghĩa

Cho 2 phân phối \`p, q\` trên cùng tập \`X\`:

\`\`\`
H(p, q) = -Σ_x p(x) log q(x)
        = E_p[-log q(X)]
\`\`\`

So với entropy \`H(p) = E_p[-log p(X)]\`, chỉ khác chỗ **dùng \`q\` để tính
surprisal nhưng vẫn lấy trung bình theo \`p\`**.

> 💡 **Trực giác.** Bạn tin phân phối là \`q\` nên thiết kế code tối ưu cho
> \`q\` (sự kiện được \`q\` cho là có xác suất cao → code ngắn). Nhưng dữ liệu
> thật sinh từ \`p\`. Trung bình số bit bạn dùng là \`H(p, q)\`. Nếu \`q = p\`,
> bạn đang dùng đúng code tối ưu → tốn ít nhất, \`H(p, q) = H(p)\`. Nếu \`q\`
> sai (vd nghĩ "bão 33%" trong khi thực tế "bão 1%"), bạn tốn hơn — đó là
> chênh lệch chính KL sẽ đo ở §4.

### 2.2. Walk-through số

**Ví dụ 1.** \`p = (0.9, 0.1)\`, \`q = (0.5, 0.5)\` (bạn tưởng fair).

\`\`\`
H(p, q) = -(0.9 log₂ 0.5 + 0.1 log₂ 0.5)
        = -(0.9·(-1) + 0.1·(-1))
        = 1 bit
\`\`\`

Trong khi \`H(p) ≈ 0.469\`. Bạn lãng phí \`1 - 0.469 = 0.531\` bit/sample
vì hiểu sai phân phối (đây chính là \`D_KL(p || q)\`).

**Ví dụ 2.** \`p = (0.9, 0.1)\`, \`q = (0.9, 0.1)\` (chuẩn).

\`\`\`
H(p, q) = -(0.9·(-0.152) + 0.1·(-3.322))
        = 0.469 bit = H(p) ✓
\`\`\`

Không lãng phí gì.

**Ví dụ 3.** \`p = (0.9, 0.1)\`, \`q = (0.1, 0.9)\` (đảo ngược, sai nặng).

\`\`\`
log₂ 0.1 ≈ -3.322
log₂ 0.9 ≈ -0.152
H(p, q) = -(0.9·(-3.322) + 0.1·(-0.152))
        = -(-2.990 - 0.0152)
        = 3.005 bit
\`\`\`

Rất lớn — chứng tỏ thiết kế code dựa trên \`q\` sai lệch nghiêm trọng làm
bạn tốn tới 3 bit cho mỗi quan sát, thay vì 0.469 lý thuyết tối ưu.

**Ví dụ 4 — 3 outcome.** \`p = (0.7, 0.2, 0.1)\`, \`q = (1/3, 1/3, 1/3)\`.

\`\`\`
log₂(1/3) ≈ -1.585
H(p, q) = -((0.7 + 0.2 + 0.1)·(-1.585))
        = 1.585 bit = log₂ 3
\`\`\`

→ Trên uniform \`q\`, \`H(p, q)\` luôn \`= log n\`. Trong khi \`H(p) ≈ 1.157\`
(xem §1.3 tự kiểm tra). KL = \`1.585 - 1.157 = 0.428\` bit.

### 2.3. Tính chất

1. **\`H(p, q) ≥ H(p)\`** (Gibbs' inequality), đẳng thức ⇔ \`q = p\`. Chứng
   minh ở §4.4 (cùng với \`D_KL ≥ 0\`).
2. **Không đối xứng:** \`H(p, q) ≠ H(q, p)\` nói chung. Ví dụ:
   \`H(p, q)\` ở ví dụ 4 = 1.585 bit; còn \`H(q, p) = -Σ (1/3) log p\` =
   \`-(1/3)(log 0.7 + log 0.2 + log 0.1) = -(1/3)(-0.515 -2.322 -3.322)\`
   \`≈ 2.053 bit\`. **Khác hẳn.**
3. **Với one-hot \`p\`** (vd \`p = (0, 1, 0)\`): \`H(p, q) = -log q(class)\`.
   Đây chính là cross-entropy loss của classification (xem §5).

> ⚠ **Lỗi thường gặp.**
> - Gọi \`H(p, q)\` là "khoảng cách". Không phải — không đối xứng, và
>   \`H(p, p) = H(p) ≠ 0\`. Khoảng cách phải dùng KL (vẫn không thực sự là
>   metric — xem §4.5).
> - Quên dấu \`-\`. Vì \`log q ≤ 0\` (với \`q ≤ 1\`), bỏ dấu \`-\` sẽ ra số âm,
>   sai trái dấu.
> - Hoán đổi vai trò \`p, q\`. Convention: **biến ngẫu nhiên thật sinh từ
>   \`p\`**, **model dự đoán \`q\`**. Trong loss = \`H(p, q)\`, \`p\` là target
>   thật (one-hot), \`q\` là model output.

> 📝 **Tóm tắt §2.**
> - \`H(p, q) = -Σ p log q\` = "chi phí trung bình mã hóa sample từ \`p\` khi
>   dùng code thiết kế cho \`q\`".
> - \`H(p, q) ≥ H(p)\`, dấu bằng ⇔ \`q = p\`.
> - Loss classification = \`H(p, q)\` với \`p\` one-hot.

---

## 3. KL divergence — bản đầy đủ

### 3.1. Định nghĩa

\`\`\`
D_KL(p || q) = Σ_x p(x) log[p(x) / q(x)]
             = Σ_x p(x) [log p(x) - log q(x)]
             = -H(p) + H(p, q)
             = H(p, q) - H(p)
\`\`\`

> 💡 **Trực giác cốt lõi.** KL = "số bit lãng phí" khi bạn nghĩ phân phối
> là \`q\` nhưng thực tế là \`p\`. Đo bằng đơn vị bit (log₂) hoặc nat (ln).

### 3.2. Walk-through tính KL cho 2 Bernoulli

**Setup.** \`p = Bernoulli(0.5)\` (fair), \`q = Bernoulli(0.9)\` (lệch về 0).

\`D_KL(p || q) = p(0) log[p(0)/q(0)] + p(1) log[p(1)/q(1)]\`

\`\`\`
D_KL(p || q) = 0.5 log₂(0.5/0.9) + 0.5 log₂(0.5/0.1)
             = 0.5 log₂(5/9)      + 0.5 log₂(5)
             = 0.5·(-0.848)       + 0.5·(2.322)
             = -0.424 + 1.161
             = 0.737 bit
\`\`\`

Verify bằng \`H(p, q) - H(p)\`:

\`\`\`
H(p, q) = -(0.5 log₂ 0.9 + 0.5 log₂ 0.1)
        = -(0.5·(-0.152) + 0.5·(-3.322))
        = -(-0.0760 - 1.661)
        = 1.737 bit
H(p) = 1 bit  (fair coin)
D_KL = 1.737 - 1 = 0.737 bit ✓
\`\`\`

### 3.3. Không đối xứng — walk-through chiều ngược

\`D_KL(q || p)\` với cùng \`q = (0.9, 0.1)\`, \`p = (0.5, 0.5)\`:

\`\`\`
D_KL(q || p) = 0.9 log₂(0.9/0.5) + 0.1 log₂(0.1/0.5)
             = 0.9 log₂(1.8)     + 0.1 log₂(0.2)
             = 0.9·(0.848)       + 0.1·(-2.322)
             = 0.763 - 0.232
             = 0.531 bit
\`\`\`

**Khác hẳn \`D_KL(p || q) = 0.737\`.** Tổng quát:

\`\`\`
D_KL(p || q) ≠ D_KL(q || p)
\`\`\`

→ KL **không phải metric** (không đối xứng, không thỏa bất đẳng thức tam
giác). Chỉ là **divergence** — "lệch bao xa", có hướng.

### 3.4. Diễn giải 2 chiều

- **\`D_KL(p || q)\`** — *forward KL* / *M-projection*. Penalize khi \`q\`
  gán **xác suất thấp** ở nơi \`p\` có **xác suất cao** (vì \`p(x)/q(x)\` lớn).
  Hệ quả: tối ưu \`q\` để minimize \`D_KL(p || q)\` → \`q\` phải **bao trùm**
  (mode-covering) hết \`p\`, kể cả vùng \`p\` nhỏ.
- **\`D_KL(q || p)\`** — *reverse KL* / *I-projection*. Penalize khi \`q\`
  gán **xác suất cao** ở nơi \`p\` có **xác suất thấp** (vì \`q\` "đến đó"
  và bị \`log(q/p)\` lớn). Hệ quả: tối ưu \`q\` để minimize \`D_KL(q || p)\`
  → \`q\` **chui vào** một mode lớn của \`p\` (mode-seeking).

Hai cách dùng quan trọng:
- **MLE / cross-entropy loss** → minimize \`D_KL(p_data || q_θ)\` ⇒ forward
  KL, mode-covering. Khi \`p_data\` đa mode, model trung bình hóa
  (vd Gaussian fit bimodal → ra Gaussian rộng nằm giữa).
- **Variational inference (VAE, ELBO)** → minimize \`D_KL(q_θ || p)\`
  ⇒ reverse KL, mode-seeking. VAE q chỉ "khoanh" 1 mode, miss các mode khác.

> ❓ **Câu hỏi tự nhiên.**
>
> - *"KL có phải khoảng cách không?"* — **Không.** Không đối xứng + không
>   thỏa bất đẳng thức tam giác. Là divergence (đo "lệch", có hướng).
>   Nếu cần khoảng cách thực sự symmetric, dùng JSD (§9) hoặc Wasserstein.
> - *"KL có giới hạn trên không?"* — **Không.** Nếu \`q(x) = 0\` ở đâu mà
>   \`p(x) > 0\`, thì \`log[p/q] = ∞\`, KL = +∞. Đây là lý do trong ML phải
>   **clip** prediction (vd cộng \`ε = 1e-7\` vào \`q\`).
> - *"Đơn vị bit hay nat?"* — tùy log. Toán ML thường dùng \`ln\`, đơn vị
>   nat. Information theory thường log₂, đơn vị bit. Chuyển đổi:
>   \`1 nat = log₂ e ≈ 1.443 bit\`.

### 3.5. Tính chất

1. **\`D_KL(p || q) ≥ 0\`**, dấu bằng ⇔ \`p = q\` (Gibbs' inequality).
2. **Không đối xứng** (đã thấy).
3. **Vô hạn** khi \`q(x) = 0, p(x) > 0\`.
4. **Bất biến dưới phép biến đổi 1-1 của biến** — nếu \`Y = f(X)\` với
   \`f\` bijection, \`D_KL(p_Y || q_Y) = D_KL(p_X || q_X)\`.
5. **Cộng tính cho biến độc lập:** với \`p = p_1 ⊗ p_2\`, \`q = q_1 ⊗ q_2\`,
   \`D_KL(p || q) = D_KL(p_1 || q_1) + D_KL(p_2 || q_2)\`.

### 3.6. Chứng minh \`D_KL(p || q) ≥ 0\` (Gibbs' inequality)

Dùng bất đẳng thức log: \`ln x ≤ x - 1\` với mọi \`x > 0\`, đẳng thức ⇔ \`x = 1\`.

Suy ra \`-ln x ≥ 1 - x\`, hay \`ln(1/x) ≥ 1 - x\`.

Tính \`D_KL\` đơn vị nat:

\`\`\`
D_KL(p || q) = Σ p(x) ln[p(x)/q(x)]
             = -Σ p(x) ln[q(x)/p(x)]
             ≥ -Σ p(x) [q(x)/p(x) - 1]   (áp ln x ≤ x − 1 với x = q/p, đổi dấu)
             = -Σ q(x) + Σ p(x)
             = -1 + 1
             = 0.
\`\`\`

Dấu bằng ở **mỗi** \`x\` ⇔ \`q(x)/p(x) = 1\`, tức \`q = p\`. □

> Bước nào cũng có verify được — không có "dễ thấy". Tip: bất đẳng thức
> \`ln x ≤ x - 1\` chứng minh bằng cách xét hàm \`f(x) = x - 1 - ln x\`, có
> \`f'(x) = 1 - 1/x\`, \`f'(1) = 0\`, \`f''(x) = 1/x² > 0\` → cực tiểu tại \`x = 1\`,
> \`f(1) = 0\`, nên \`f(x) ≥ 0\` với mọi \`x > 0\`.

> 🔁 **Tự kiểm tra.**
> 1. Tính \`D_KL(p || q)\` cho \`p = (0.5, 0.5)\`, \`q = (0.25, 0.75)\`.
> 2. Tính \`D_KL(q || p)\` cùng cặp. So sánh.
>
> <details><summary>Đáp án</summary>
>
> 1. \`D_KL(p||q) = 0.5 log₂(0.5/0.25) + 0.5 log₂(0.5/0.75)\`
>    \`= 0.5·1 + 0.5·log₂(2/3)\`
>    \`= 0.5 + 0.5·(-0.585) = 0.5 - 0.293 = 0.208 bit\`.
> 2. \`D_KL(q||p) = 0.25 log₂(0.25/0.5) + 0.75 log₂(0.75/0.5)\`
>    \`= 0.25·(-1) + 0.75·log₂(1.5) = -0.25 + 0.75·0.585\`
>    \`= -0.25 + 0.439 = 0.189 bit\`. Khác chiều đầu → không đối xứng ✓.
>
> </details>

> 📝 **Tóm tắt §3.**
> - \`D_KL(p||q) = Σ p log(p/q) = H(p,q) - H(p) ≥ 0\`.
> - Không đối xứng, không bị chặn trên, không phải metric.
> - Forward KL = mode-covering (dùng trong MLE). Reverse KL = mode-seeking
>   (dùng trong VAE).

---

## 4. Liên hệ chi tiết H, H(p,q), KL

Bộ ba đại lượng có công thức gọn:

\`\`\`
H(p, q) = H(p) + D_KL(p || q)
\`\`\`

Suy ra:
- Cố định \`p\`, **minimize \`H(p, q)\` theo \`q\`** ⇔ **minimize \`D_KL(p || q)\`**
  (vì \`H(p)\` không phụ thuộc \`q\`).
- Đây là lý do trong training, loss thường viết là cross-entropy thay vì
  KL — kết quả tối ưu y hệt.

### 4.1. Bảng so sánh trên 1 ví dụ

Lấy \`p = (0.9, 0.1)\`, thử các \`q\` khác nhau:

| \`q\`             | \`H(p, q)\` (bit) | \`H(p)\` | \`D_KL(p \\|\\| q)\` |
|-----------------|-----------------|--------|-----------------|
| \`(0.9, 0.1)\`    | 0.469           | 0.469  | 0.000           |
| \`(0.8, 0.2)\`    | 0.522           | 0.469  | 0.053           |
| \`(0.5, 0.5)\`    | 1.000           | 0.469  | 0.531           |
| \`(0.1, 0.9)\`    | 3.005           | 0.469  | 2.536           |
| \`(0.99, 0.01)\`  | 0.677           | 0.469  | 0.208           |

Chú ý: \`H(p, p) = H(p)\`, mọi \`q ≠ p\` đều cho \`H(p, q) > H(p)\`. KL = 0 ⇔ \`q = p\`.

### 4.2. Hệ quả "entropy max của uniform"

Áp \`D_KL(p || u) ≥ 0\` với \`u = uniform\` trên \`n\` outcome:

\`\`\`
D_KL(p || u) = Σ p(x) log[p(x) / (1/n)]
             = Σ p(x) [log p(x) + log n]
             = -H(p) + log n  ≥ 0
⇒ H(p) ≤ log n.
\`\`\`

Dấu bằng ⇔ \`p = u\` (uniform). □

### 4.3. Liên hệ với mutual information (preview)

Mutual information đo "X và Y cho biết bao nhiêu về nhau":

\`\`\`
I(X; Y) = D_KL(p(x, y) || p(x) p(y))
        = H(X) + H(Y) - H(X, Y)   (với H(X,Y) là joint entropy, không phải cross)
\`\`\`

\`I(X; Y) ≥ 0\`, \`= 0\` ⇔ \`X ⊥ Y\`. Bài sau (Tầng 6) dùng MI để dẫn
contrastive loss (CLIP).

> 📝 **Tóm tắt §4.**
> - \`H(p, q) = H(p) + D_KL(p || q)\`.
> - Minimize cross-entropy ≡ minimize KL (khi \`p\` cố định).
> - \`H(p) ≤ log n\` (uniform có entropy max) — chứng minh dùng \`D_KL ≥ 0\`.

---

## 5. Cross-entropy loss trong classification

### 5.1. Setup

Phân loại có \`K\` lớp. Với mẫu \`(x, y)\`:
- \`y\` ∈ \`{1, ..., K}\` là class thật.
- Encode thành **one-hot**: \`p_y = e_y = (0, ..., 0, 1, 0, ..., 0)\` (vị
  trí thứ \`y\` = 1).
- Model output \`q = (q_1, ..., q_K)\` (sau softmax), \`Σ q_k = 1\`, \`q_k ≥ 0\`.

**Loss** trên một mẫu:

\`\`\`
L(x, y) = H(p_y, q) = -Σ_k p_y[k] log q_k = -log q_y
\`\`\`

(Chỉ còn một số hạng vì \`p_y\` one-hot.)

Trên toàn batch \`N\` mẫu:

\`\`\`
L = -(1/N) Σ_i log q_{y_i}
\`\`\`

### 5.2. Walk-through số

Giả sử 3-class, \`y = 2\` (class 2). One-hot \`p = (0, 1, 0)\`.

**Trường hợp A — model dự đúng mạnh:** \`q = (0.05, 0.9, 0.05)\`.

\`\`\`
L = -log 0.9 ≈ -(-0.1054) = 0.1054 nat
  ≈ 0.152 bit
\`\`\`

**Trường hợp B — model dự đúng nhẹ:** \`q = (0.3, 0.4, 0.3)\`.

\`\`\`
L = -log 0.4 ≈ 0.916 nat ≈ 1.322 bit
\`\`\`

**Trường hợp C — model dự sai nặng:** \`q = (0.85, 0.1, 0.05)\`.

\`\`\`
L = -log 0.1 ≈ 2.303 nat ≈ 3.322 bit
\`\`\`

**Trường hợp D — model "uniform" (chưa học gì):** \`q = (1/3, 1/3, 1/3)\`.

\`\`\`
L = -log(1/3) ≈ 1.099 nat ≈ 1.585 bit
\`\`\`

→ Loss random baseline trên \`K = 3\` lớp là \`log K = log 3\`. Trên \`K = 10\`
(MNIST) baseline = \`log 10 ≈ 2.303 nat ≈ 3.322 bit\`. Khi training, loss
nên giảm xuống dưới \`log K\` rất nhanh nếu model có signal.

### 5.3. Binary cross-entropy (BCE)

Trường hợp \`K = 2\` đặc biệt: gọi \`p = q_1\` (xác suất class 1), \`y ∈ {0, 1}\`:

\`\`\`
L(x, y) = -[y log p + (1 - y) log(1 - p)]
\`\`\`

- Nếu \`y = 1\`: \`L = -log p\`. p càng gần 1 → loss càng nhỏ.
- Nếu \`y = 0\`: \`L = -log(1 - p)\`. p càng gần 0 → loss càng nhỏ.

**Ví dụ:** \`y = 1\`, \`p = 0.95\` → \`L = -log 0.95 ≈ 0.0513\` nat. Còn \`y = 1\`,
\`p = 0.05\` → \`L = -log 0.05 ≈ 2.996\` nat (phạt nặng).

> 💡 **Hình dung.** Nhìn đồ thị \`-log p\` trên \`(0, 1]\`: tại \`p = 1\`, loss = 0;
> tại \`p → 0\`, loss → ∞. **Bất đối xứng cực mạnh** — model "rất tự tin sai"
> bị phạt rất nặng. Đây là lý do BCE/CE phản ánh tốt cảm giác "confidence
> calibration".

### 5.4. Vì sao cross-entropy thay vì MSE cho classification?

Một câu hỏi rất tự nhiên: tại sao không dùng \`(q_y - 1)² + Σ_{k≠y} q_k²\` (MSE)?

3 lý do:

1. **Gradient không bị bão hòa (saturate) ở sai mạnh.** Với softmax
   output, đạo hàm của CE theo logits cực kỳ gọn: \`∂L/∂z_k = q_k - p_k\`.
   Khi sai, gradient vẫn lớn → learning nhanh. MSE qua softmax có gradient
   bị nhân thêm \`q(1-q)\` → bão hòa khi \`q\` gần 0 hoặc 1.
2. **Phù hợp với MLE.** CE = -log likelihood của categorical distribution
   (xem §6) → có nền tảng xác suất chặt chẽ.
3. **Phân tán xác suất sai bị phạt mạnh** (do \`log p\` đi xuống \`-∞\`),
   tránh việc model "đứng giữa" mãi mãi.

> ⚠ **Lỗi thường gặp.**
> - **\`log(0) = -∞\` → NaN loss.** Khi \`q_y = 0\` do underflow/softmax sai,
>   loss vô hạn. Solution: clip — \`log(max(q, ε))\` với \`ε = 1e-7\`. Hoặc
>   dùng \`log_softmax\` trực tiếp (numerically stable).
> - **Áp CE lên logits trực tiếp (chưa softmax).** Thư viện thường có
>   \`CrossEntropyLoss(logits, labels)\` — đã bao gồm log_softmax bên trong.
>   Nếu tự softmax rồi truyền vào, sẽ double-softmax → sai.
> - **One-hot vs index.** PyTorch nhận label dạng **index** (\`tensor(2)\`),
>   không phải one-hot. Tự tay one-hot rồi nhân lại ổn, nhưng phí.

> 📝 **Tóm tắt §5.**
> - One-hot true \`p\` → \`L = -log q_{class_true}\`.
> - BCE = phiên bản 2-class. \`K = 10\` baseline = \`log 10 ≈ 2.303 nat\`.
> - Cross-entropy có gradient tốt + phù hợp MLE → chuẩn cho classification.

---

## 6. Liên hệ MLE → cross-entropy

Đây là cầu nối quan trọng. [Lesson 07](../lesson-07-mle/) đã dạy MLE:
chọn \`θ\` maximize log-likelihood. Bài này show: với data discrete, MLE
**tương đương** minimize cross-entropy giữa data distribution và model.

### 6.1. Dẫn dắt

Cho dataset \`D = {(x_i, y_i)}_{i=1}^N\`. Gọi \`p_data(x, y)\` là phân phối
thực nghiệm (empirical):

\`\`\`
p_data(x, y) = (1/N) Σ_i 𝟙{x_i = x, y_i = y}
\`\`\`

Model \`q_θ(y | x)\` được train bằng MLE:

\`\`\`
θ_MLE = argmax_θ Σ_i log q_θ(y_i | x_i)
      = argmax_θ N · E_{p_data}[log q_θ(Y | X)]
      = argmin_θ -E_{p_data}[log q_θ(Y | X)]
      = argmin_θ H(p_data, q_θ)        (conditional cross-entropy)
\`\`\`

→ **Minimize cross-entropy ≡ MLE.** Tương đương:

\`\`\`
θ_MLE = argmin_θ D_KL(p_data || q_θ)
\`\`\`

(Vì \`H(p_data, q_θ) = H(p_data) + D_KL(p_data || q_θ)\`, và \`H(p_data)\`
không phụ thuộc \`θ\`.)

### 6.2. Walk-through MNIST

- \`N\` ảnh, mỗi ảnh có label \`y ∈ {0, ..., 9}\`.
- Model neural net cho \`q_θ(y | x)\` = softmax 10 logits.
- Mỗi ảnh đóng góp loss \`-log q_θ(y_i | x_i)\`.
- Batch loss = trung bình ⇒ minimize batch loss ≈ minimize KL với
  empirical distribution.

Cụ thể: epoch 0 (random init), batch loss ≈ \`log 10 ≈ 2.303\`. Sau khi
train, MNIST đạt loss ~0.05 nat → tương đương \`q_θ(y_true | x) ≈ exp(-0.05)
≈ 0.95\` (model tự tin 95% vào class đúng trung bình).

### 6.3. Regression và cross-entropy

Với Gaussian likelihood (regression \`y | x ~ N(μ_θ(x), σ²)\`):

\`\`\`
-log q_θ(y | x) = (1/2)·log(2πσ²) + (y - μ_θ(x))² / (2σ²)
\`\`\`

→ Minimize negative log-likelihood ≡ minimize MSE (loại bỏ hằng số). Vậy
**MSE cho regression = cross-entropy ngầm** (cross-entropy với Gaussian
model). Cùng một framework MLE.

> 📝 **Tóm tắt §6.**
> - MLE ≡ minimize \`D_KL(p_data || q_θ)\` ≡ minimize cross-entropy.
> - Classification → CE loss. Regression với Gaussian → MSE loss. Cùng MLE.

---

## 7. LLM training: next-token prediction

### 7.1. Cấu trúc loss

Cho sequence token \`(t_1, t_2, ..., t_T)\`. LLM autoregressive output ở
position \`t\` là phân phối \`q_θ(· | t_{<t})\` trên toàn vocab cỡ \`V\`
(GPT-2: V=50257, Llama 3: V≈128000).

Loss trên 1 sequence:

\`\`\`
L = -(1/T) Σ_{t=1}^T log q_θ(t_t | t_{<t})
\`\`\`

Trên batch \`B\` sequence, lấy trung bình. Đây là **per-token cross-entropy**.

### 7.2. Walk-through 1 câu nhỏ

Câu input: \`"Hello world"\` được tokenize thành 2 token: \`[t_1=15496, t_2=995]\`
(giả lập như GPT-2 BPE).

Khi train, model nhận \`[BOS, t_1]\` và phải predict \`t_2\`:
- Position 0: input BOS → predict \`t_1 = 15496\`. Loss = \`-log q_θ(15496 | BOS)\`.
- Position 1: input \`[BOS, t_1]\` → predict \`t_2 = 995\`. Loss = \`-log q_θ(995 | BOS, t_1)\`.

Giả sử model gán \`q_θ(15496|BOS) = 0.001\` (1/1000 — chưa học), và
\`q_θ(995|BOS, t_1) = 0.05\` (đã đoán được phần nào vì "world" hay đi sau
"Hello"):

\`\`\`
L_1 = -log 0.001 ≈ 6.908 nat
L_2 = -log 0.05  ≈ 2.996 nat
L_avg = (6.908 + 2.996) / 2 = 4.952 nat
\`\`\`

Sau khi train tốt:
- \`q_θ(15496|BOS) = 0.01\` → L_1 = 4.605
- \`q_θ(995|Hello) = 0.7\` → L_2 = 0.357
- L_avg = 2.481 nat

Càng train, càng giảm. Sàn lý thuyết = entropy của tiếng Anh tự nhiên
(≈ 1.4 nat/token theo Shannon).

### 7.3. Cross-entropy ở level sequence

\`\`\`
L = E_{t_{1:T} ~ p_data} [-(1/T) Σ log q_θ(t_t | t_{<t})]
  = (1/T) Σ H(p_data(t_t | t_{<t}), q_θ(t_t | t_{<t}))
\`\`\`

Vẫn là cross-entropy, chỉ là **average over positions + conditional on
context**. Frameworks (PyTorch, JAX) cài đặt y hệt, chỉ flatten:
\`loss = F.cross_entropy(logits.view(-1, V), targets.view(-1))\`.

> 📝 **Tóm tắt §7.**
> - LLM loss = per-token cross-entropy averaged over positions.
> - Mỗi position là 1 classification trên \`V\` (vocab size).
> - Train tốt = loss giảm dần về entropy thật của ngôn ngữ.

---

## 8. Perplexity

### 8.1. Định nghĩa

\`\`\`
Perplexity(q) = exp(H(p_data, q))   (nếu log = ln, H đơn vị nat)
              = 2^{H_bit(p_data, q)}  (nếu log = log₂, đơn vị bit)
\`\`\`

Trong thực hành LLM: \`PPL = exp(avg_per_token_loss)\`.

### 8.2. Trực giác — "số token tương đương model lưỡng lự"

Nếu PPL = \`k\`, model "lưỡng lự" như đang chọn đều giữa \`k\` token. Một
cách hình dung:

- PPL = 1 → model dự đoán tuyệt đối chính xác mỗi token (loss = 0). Cực
  hiếm — chỉ với data có entropy = 0.
- PPL = \`V\` (vocab size) → model gán đều, hoàn toàn random.
- Mọi giá trị trung gian = "n tokens equivalent".

### 8.3. Walk-through số

Giả sử vocab \`V = 4\` (siêu nhỏ — chỉ minh hoạ). Phân phối thật mỗi
position là \`p = (0.7, 0.1, 0.1, 0.1)\`.

**Model A (fair):** \`q_A = (0.25, 0.25, 0.25, 0.25)\`.

\`\`\`
H(p, q_A) = -Σ p log q_A
          = -log 0.25 (vì Σ p = 1)
          = ln 4 = 1.386 nat
PPL_A = exp(1.386) = 4 ✓
\`\`\`

→ Model A "không biết gì" → PPL = vocab size.

**Model B (concentrated, sai chỗ):** \`q_B = (0.1, 0.7, 0.1, 0.1)\`.

\`\`\`
H(p, q_B) = -(0.7 ln 0.1 + 0.1 ln 0.7 + 0.1 ln 0.1 + 0.1 ln 0.1)
          = -(0.7·(-2.303) + 0.1·(-0.357) + 0.1·(-2.303) + 0.1·(-2.303))
          = -(-1.612 - 0.0357 - 0.230 - 0.230)
          = 2.108 nat
PPL_B = exp(2.108) ≈ 8.23
\`\`\`

→ Tệ hơn cả random! "Tự tin sai" bị phạt nặng.

**Model C (concentrated, đúng chỗ):** \`q_C = (0.7, 0.1, 0.1, 0.1)\`.

\`\`\`
H(p, q_C) = H(p) (= q so q_C = p)
          = -(0.7 ln 0.7 + 3·0.1 ln 0.1)
          = -(0.7·(-0.357) + 3·0.1·(-2.303))
          = -(-0.250 - 0.691)
          = 0.941 nat
PPL_C = exp(0.941) ≈ 2.563
\`\`\`

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
> - *"PPL tăng có nghĩa model tệ hơn không?"* — đúng (PPL = exp(loss),
>   monotonic). Nhưng có thể PPL thấp mà generation kém (perplexity ≠
>   chất lượng cảm nhận). Cần thêm eval (HumanEval, MMLU, win rate).

> 📝 **Tóm tắt §8.**
> - PPL = \`exp(cross_entropy)\`.
> - PPL = 1 lý tưởng, PPL = V hoàn toàn random.
> - Chỉ so sánh PPL trong cùng tokenizer + dataset.

---

## 9. Jensen-Shannon divergence

### 9.1. Định nghĩa

\`\`\`
m = (p + q) / 2
JSD(p, q) = (1/2) D_KL(p || m) + (1/2) D_KL(q || m)
\`\`\`

### 9.2. Tính chất

1. **Đối xứng:** \`JSD(p, q) = JSD(q, p)\`.
2. **Bị chặn:** \`0 ≤ JSD ≤ log 2\` (với log nat) hoặc \`≤ 1\` (với log₂).
3. \`JSD = 0\` ⇔ \`p = q\`.
4. **\`√JSD\` là metric thực sự** (thỏa cả 3 tiên đề khoảng cách).
5. **Không bao giờ vô hạn** — vì \`m(x) ≥ p(x)/2 > 0\` bất cứ chỗ nào
   \`p(x) > 0\` (tương tự \`q\`), nên các log không bùng nổ.

### 9.3. Ví dụ số

\`p = (0.9, 0.1)\`, \`q = (0.1, 0.9)\`. (Vốn \`D_KL(p||q) = 0.9 log(9) + 0.1 log(1/9)\`,
nat: \`0.9·2.197 + 0.1·(-2.197) = 1.758\` nat — rất lớn.)

\`\`\`
m = ((0.9+0.1)/2, (0.1+0.9)/2) = (0.5, 0.5)
D_KL(p || m) = 0.9 log(0.9/0.5) + 0.1 log(0.1/0.5)
             = 0.9 log 1.8 + 0.1 log 0.2
             = 0.9·0.588 + 0.1·(-1.609)
             = 0.529 - 0.161 = 0.368 nat
D_KL(q || m) = 0.1 log(0.1/0.5) + 0.9 log(0.9/0.5)
             = giống vì p ↔ q symmetric quanh m = 0.368 nat
JSD(p, q) = 0.5·0.368 + 0.5·0.368 = 0.368 nat
          ≈ 0.532 bit
\`\`\`

(Tối đa lý thuyết = \`log 2 ≈ 0.693\` nat = 1 bit, khi \`p, q\` có support
hoàn toàn rời nhau.)

### 9.4. Dùng ở đâu

- **GAN** (Goodfellow 2014) — generator minimize JSD(p_data, p_gen) thực
  ra ngầm. Sau này WGAN chuyển sang Wasserstein vì JSD saturate khi 2
  phân phối rời nhau.
- **t-SNE / embedding evaluation** — đo "khoảng cách phân phối" symmetric.
- **Information retrieval** — so sánh document distribution.

> 📝 **Tóm tắt §9.**
> - JSD = symmetric KL, bị chặn \`≤ log 2\`.
> - Không vô hạn (an toàn hơn KL).
> - \`√JSD\` là metric thực sự.

---

## 10. Tổng hợp câu hỏi tự nhiên (callout ❓)

> ❓ **Câu hỏi 1: Tại sao cross-entropy chứ không MSE cho classification?**
>
> Đã trả lời §5.4. Tóm lại: (a) gradient tốt qua softmax (\`q - p\`,
> không bão hòa); (b) phù hợp MLE — CE = -log likelihood của categorical;
> (c) phạt nặng "tự tin sai" đúng tinh thần.

> ❓ **Câu hỏi 2: KL có phải khoảng cách (metric) không?**
>
> Đã trả lời §3.4. Không — không đối xứng + không tam giác. Dùng JSD
> hoặc Wasserstein nếu cần metric thực sự.

> ❓ **Câu hỏi 3: Khi target = uniform, cross-entropy là gì?**
>
> \`H(uniform, q) = -Σ (1/n) log q_k = -(1/n) Σ log q_k\`. Đây là **trung
> bình hình học âm** của các \`q_k\`. Đặc biệt: nếu thêm constraint \`Σ q_k = 1\`,
> bài toán argmin theo \`q\` (\`p\` fixed uniform) → \`q = uniform\`. Đây là
> "regularization với uniform target" trong **label smoothing**: thay vì
> one-hot, target dùng \`p̃ = (1-ε) e_y + ε · (1/K)·1\` — kết hợp uniform với
> one-hot, giúp model bớt overconfident.

> ❓ **Câu hỏi 4: Vì sao log trong information có thể đổi cơ số tùy ý?**
>
> Vì đổi cơ số chỉ thay đổi đơn vị (bit ↔ nat ↔ dit). Mọi tính chất
> (\`H ≥ 0\`, \`D_KL ≥ 0\`, Gibbs) đều không phụ thuộc cơ số. Trong ML chọn
> \`ln\` (nat) cho gọn về đạo hàm; trong info theory chọn \`log₂\` (bit).

> ❓ **Câu hỏi 5: Per-token loss vs sequence loss của LLM khác nhau thế nào?**
>
> Per-token loss = \`-log q(t_t | context)\` ở mỗi position. Sequence loss =
> tổng/trung bình theo position. Báo cáo paper hay dùng **per-token NLL**
> để dễ so sánh giữa các sequence độ dài khác nhau.

---

## 11. Lỗi thường gặp (⚠ tổng hợp)

> ⚠ **Lỗi 1: \`log(0) = -∞\` → NaN.**
> Khi \`q\` có entry bằng 0 (do softmax underflow hoặc model predict
> tuyệt đối), log → ∞, loss → NaN, gradient → NaN, model "die". Fix:
> - Clip: \`q_safe = max(q, ε)\` với \`ε = 1e-7\` đến \`1e-12\`.
> - Hoặc dùng \`log_softmax\` trực tiếp (numerically stable: \`log_softmax(z) =
>   z - logsumexp(z)\`).
> - PyTorch \`F.cross_entropy(logits, target)\` đã handle tự động.

> ⚠ **Lỗi 2: Quên dấu minus.**
> Nhiều người viết \`H(p, q) = Σ p log q\` thay vì \`-Σ p log q\`. Vì
> \`log q ≤ 0\` (do \`q ≤ 1\`), bỏ minus → loss âm, optimizer push về \`-∞\`,
> sai hướng tối ưu.

> ⚠ **Lỗi 3: Nhầm chiều KL.**
> \`D_KL(p || q)\` ≠ \`D_KL(q || p)\`. Trong MLE/cross-entropy training, chuẩn là
> \`D_KL(p_data || q_model)\` (forward). Variational inference / VAE dùng
> \`D_KL(q_θ || p)\` (reverse, vì \`p\` là posterior khó tính). Nhầm chiều
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

Tính \`H\` (đơn vị bit) cho mỗi phân phối:
- (a) \`p = (0.5, 0.5)\`.
- (b) \`p = (0.25, 0.25, 0.25, 0.25)\`.
- (c) \`p = (0.5, 0.25, 0.125, 0.125)\`.
- (d) \`p = (0.4, 0.3, 0.2, 0.1)\`.

### Bài 2 (cross-entropy)

Cho \`p = (0.6, 0.3, 0.1)\`. Tính \`H(p, q)\` cho:
- (a) \`q = (1/3, 1/3, 1/3)\`.
- (b) \`q = (0.6, 0.3, 0.1)\`.
- (c) \`q = (0.1, 0.3, 0.6)\` (đảo).

Phân tích nào lớn nhất / nhỏ nhất?

### Bài 3 (KL không đối xứng)

Cho \`p = (0.7, 0.3)\`, \`q = (0.3, 0.7)\`.
- Tính \`D_KL(p || q)\` và \`D_KL(q || p)\`.
- Tính \`JSD(p, q)\`.
- So sánh cả ba.

### Bài 4 (cross-entropy loss classification)

Bài toán 4-class. True label \`y = 1\` (index 1, one-hot \`(0, 1, 0, 0)\`).
Tính loss với mỗi model output:
- (a) \`q = (0.1, 0.7, 0.1, 0.1)\`.
- (b) \`q = (0.25, 0.25, 0.25, 0.25)\`.
- (c) \`q = (0.7, 0.1, 0.1, 0.1)\`.
- (d) \`q = (0.01, 0.01, 0.97, 0.01)\`.

Sắp xếp từ tốt → tệ.

### Bài 5 (perplexity)

Một LLM trên test set có per-token loss = 2.5 nat.
- (a) Tính perplexity.
- (b) Nếu vocab size \`V = 50000\`, model "fair" có PPL bao nhiêu?
- (c) Model hiện tại tốt hơn random bao nhiêu lần?

### Bài 6 (label smoothing)

Label smoothing thay one-hot \`p\` bằng \`p̃ = (1 - ε) e_y + ε · (1/K) · 1\`
(với \`K = 10\` lớp, \`ε = 0.1\`).
- (a) Viết \`p̃\` cụ thể khi \`y = 3\`.
- (b) Tính \`H(p̃, q)\` cho \`q = (0.05, ..., 0.05, 0.55, 0.05, ..., 0.05)\` (giá
  trị 0.55 ở index 3, 0.05 ở các index khác — tổng = 0.55 + 9·0.05 = 1.0).
- (c) So sánh với loss khi không có smoothing.

---

## 13. Lời giải chi tiết

### Lời giải bài 1

Dùng log₂.

- (a) \`H = -(0.5·(-1) + 0.5·(-1)) = 1 bit\`. ✓
- (b) \`H = -4·(0.25·(-2)) = 2 bit\` (uniform trên 4 outcome → \`log 4 = 2\`).
- (c) \`H = -(0.5·(-1) + 0.25·(-2) + 0.125·(-3) + 0.125·(-3))\`
  \`= -(-0.5 - 0.5 - 0.375 - 0.375) = 1.75 bit\`. Huffman code dài
  trung bình đúng 1.75 bit.
- (d) \`log₂ 0.4 ≈ -1.322\`, \`log₂ 0.3 ≈ -1.737\`, \`log₂ 0.2 ≈ -2.322\`,
  \`log₂ 0.1 ≈ -3.322\`.
  \`H = -(0.4·(-1.322) + 0.3·(-1.737) + 0.2·(-2.322) + 0.1·(-3.322))\`
  \`= -(-0.5288 - 0.5211 - 0.4644 - 0.3322)\`
  \`= 1.8465 bit\`.

**Sanity check:** entropy giảm dần từ (b) > (d) > (c) > (a) — không, sai. Sắp
lại: (a)=1, (c)=1.75, (d)=1.846, (b)=2. Entropy max ở uniform (b), thấp nhất
ở binary fair (vì chỉ có 2 outcome).

### Lời giải bài 2

\`p = (0.6, 0.3, 0.1)\`. \`H(p) = -(0.6 log 0.6 + 0.3 log 0.3 + 0.1 log 0.1)\`.
Tính: \`0.6 log₂ 0.6 = 0.6·(-0.737) = -0.442\`; \`0.3 log₂ 0.3 = 0.3·(-1.737)
= -0.521\`; \`0.1 log₂ 0.1 = 0.1·(-3.322) = -0.332\`. Tổng \`H(p) = 1.295\` bit.

- (a) \`q = uniform\`. \`H(p, q) = -Σ p log(1/3) = log₂ 3 = 1.585 bit\`.
  KL = \`1.585 - 1.295 = 0.290 bit\`.
- (b) \`q = p\`. \`H(p, q) = H(p) = 1.295 bit\`. KL = 0.
- (c) \`q = (0.1, 0.3, 0.6)\`. \`H(p, q) = -(0.6 log 0.1 + 0.3 log 0.3 + 0.1 log 0.6)\`
  \`= -(0.6·(-3.322) + 0.3·(-1.737) + 0.1·(-0.737))\`
  \`= -(-1.993 - 0.521 - 0.0737)\`
  \`= 2.588 bit\`. KL = \`2.588 - 1.295 = 1.293 bit\`.

**Lớn nhất: (c)** (model sai chiều). **Nhỏ nhất: (b)**. (a) ở giữa.

### Lời giải bài 3

\`p = (0.7, 0.3)\`, \`q = (0.3, 0.7)\` — đối xứng quanh \`(0.5, 0.5)\`.

**KL forward:**
\`\`\`
D_KL(p || q) = 0.7 log₂(0.7/0.3) + 0.3 log₂(0.3/0.7)
             = 0.7 log₂(7/3)     + 0.3 log₂(3/7)
             = 0.7·1.222         + 0.3·(-1.222)
             = 0.855 - 0.367
             = 0.488 bit
\`\`\`

**KL reverse:**
\`\`\`
D_KL(q || p) = 0.3 log₂(0.3/0.7) + 0.7 log₂(0.7/0.3)
             = 0.3·(-1.222)      + 0.7·1.222
             = -0.367 + 0.855
             = 0.488 bit
\`\`\`

(Trong trường hợp đặc biệt này KL hai chiều bằng nhau do \`p, q\` swap
symmetric với nhau quanh uniform.)

**JSD:**
\`m = (0.5, 0.5)\`.
\`\`\`
D_KL(p || m) = 0.7 log₂(0.7/0.5) + 0.3 log₂(0.3/0.5)
             = 0.7·0.485         + 0.3·(-0.737)
             = 0.340 - 0.221
             = 0.119 bit
D_KL(q || m) = 0.3 log₂(0.3/0.5) + 0.7 log₂(0.7/0.5)
             = 0.119 bit          (đối xứng)
JSD = 0.5·0.119 + 0.5·0.119 = 0.119 bit
\`\`\`

**Quan sát:** \`JSD = 0.119 < 0.488 = D_KL\` (cả hai chiều). JSD luôn nhỏ hơn
hoặc bằng KL (\`JSD ≤ (D_KL(p||q) + D_KL(q||p))/2 / 2\` — bị "softened" qua
trung gian \`m\`).

### Lời giải bài 4

True class index = 1. Loss = \`-log₂ q[1]\`.

- (a) \`q[1] = 0.7\` → \`L = -log₂ 0.7 = 0.515 bit\`.
- (b) \`q[1] = 0.25\` → \`L = -log₂ 0.25 = 2 bit\` (= \`log K = log 4\`,
  random baseline).
- (c) \`q[1] = 0.1\` → \`L = -log₂ 0.1 = 3.322 bit\`.
- (d) \`q[1] = 0.01\` → \`L = -log₂ 0.01 = 6.644 bit\`.

**Sắp xếp tốt → tệ:** (a) < (b) < (c) < (d). (d) cực tệ vì "tự tin sai".

### Lời giải bài 5

- (a) \`PPL = exp(2.5) ≈ 12.18\`.
- (b) Fair model gán \`1/V\` cho mọi token → cross-entropy = \`ln V = ln 50000
  ≈ 10.82\` nat → PPL = 50000 (= V).
- (c) Tỉ lệ \`PPL_random / PPL_model = 50000 / 12.18 ≈ 4106 lần\`. Model
  "lưỡng lự" ít hơn random hơn 4000 lần.

### Lời giải bài 6

\`K = 10\`, \`ε = 0.1\`, \`y = 3\`.

- (a) Vị trí \`y = 3\` có \`p̃[3] = (1 - 0.1) + 0.1·(1/10) = 0.9 + 0.01 = 0.91\`.
  Các vị trí khác: \`p̃[k] = 0.1·(1/10) = 0.01\`. Vector: \`(0.01, 0.01, 0.01,
  0.91, 0.01, 0.01, 0.01, 0.01, 0.01, 0.01)\`. Verify tổng: \`0.91 + 9·0.01 = 1 ✓\`.
- (b) \`q[3] = 0.55\`, các vị trí khác = 0.05.
  \`\`\`
  H(p̃, q) = -Σ p̃[k] log₂ q[k]
          = -(0.91·log₂ 0.55 + 9·0.01·log₂ 0.05)
          = -(0.91·(-0.862) + 0.09·(-4.322))
          = -(-0.785 - 0.389)
          = 1.174 bit
  \`\`\`
- (c) Không smoothing: \`H(e_3, q) = -log₂ 0.55 = 0.862 bit\`. Loss
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
