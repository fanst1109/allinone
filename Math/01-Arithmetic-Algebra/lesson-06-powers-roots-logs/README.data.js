// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: Math/01-Arithmetic-Algebra/lesson-06-powers-roots-logs/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 06 — Lũy thừa, căn, logarit

## Mục tiêu

- Hiểu **lũy thừa** $a^n$ và mở rộng cho mũ âm, mũ hữu tỉ, mũ thực.
- Hiểu **căn bậc n** là gì và liên hệ với lũy thừa: $\\sqrt[n]{a} = a^{1/n}$.
- Hiểu **logarit** — phép ngược của lũy thừa: $\\log_b(x)$ = "b mũ mấy bằng x".
- Áp dụng 5 quy luật log cơ bản và **đổi cơ số**.
- **Chứng minh được** mỗi quy luật mũ/log từ định nghĩa, không chỉ học thuộc.
- Biết vì sao log xuất hiện khắp nơi: Big-O chia-để-trị, số bit, Richter/dB/pH, entropy & loss ML.

## Kiến thức tiền đề

- [Lesson 02 — Biểu thức đại số](../lesson-02-algebraic-expressions/).
- Khái niệm "phép tính ngược": trừ ngược cộng, chia ngược nhân. Bài này thêm hai phép ngược mới của lũy thừa: **căn** (giải cơ số) và **logarit** (giải số mũ).

> **Ghi nhớ chính của cả bài**: lũy thừa, căn, log là **ba góc nhìn của cùng một phép biến đổi**, không phải ba chủ đề rời.
>
> Cho $b^x = y$ với ba ô: cơ số $b$, số mũ $x$, kết quả $y$. Bịt một ô lại rồi đi tìm:
> - Biết $b$ và $x$, hỏi $y$ → **lũy thừa**: $y = b^x$. (Vd $2^3 = 8$.)
> - Biết $b$ và $y$, hỏi $x$ → **logarit**: $x = \\log_b(y)$. (Vd $\\log_2(8) = 3$.)
> - Biết $x$ và $y$, hỏi $b$ → **căn**: $b = \\sqrt[x]{y} = y^{1/x}$. (Vd $\\sqrt[3]{8} = 2$.)
>
> Cùng một bộ ba số $(2, 3, 8)$ — chỉ khác nhau ở chỗ ẩn số nằm ở ô nào.

---

## 1. Lũy thừa (Power)

### 1.1. Định nghĩa

💡 **Trực giác / Hình dung**: lũy thừa là "phép nhân của phép nhân". Nếu phép nhân $5 \\times 3$ là cách viết gọn "cộng 5 ba lần" ($5+5+5$), thì lũy thừa $5^3$ là cách viết gọn "nhân 5 ba lần" ($5\\cdot 5\\cdot 5$). Số mũ đếm **số lần lặp phép nhân**, không phải kết quả.

**Lũy thừa $a^n$ với n nguyên dương** = nhân a với chính nó n lần:

$$a^n = a \\cdot a \\cdot a \\cdot \\ldots \\cdot a \\quad (n \\text{ lần})$$

💡 **Là gì**: viết gọn phép nhân lặp lại. $a$ gọi là **cơ số (base)**, $n$ gọi là **số mũ (exponent)**.

**6 ví dụ số đa dạng**:
- Cơ số dương, mũ dương: $2^5 = 2\\cdot 2\\cdot 2\\cdot 2\\cdot 2 = 32$.
- Cơ số âm, mũ chẵn: $(-3)^2 = (-3)\\cdot(-3) = 9$ (kết quả **dương**).
- Cơ số âm, mũ lẻ: $(-3)^3 = (-3)\\cdot(-3)\\cdot(-3) = -27$ (kết quả **âm**).
- Cơ số phân số: $(2/3)^3 = 8/27$.
- Cơ số > 10, mũ nhỏ: $10^6 = 1\\,000\\,000$ (1 triệu).
- Mũ 1: $7^1 = 7$ (nhân $7$ "một lần" là chính nó).

**Quy tắc dấu**: cơ số âm + mũ **chẵn** = dương; cơ số âm + mũ **lẻ** = âm. (Mỗi cặp dấu âm triệt tiêu thành dương; số dấu âm lẻ thì còn dư một dấu âm.)

**Lũy thừa "bùng nổ" nhanh thế nào?** — cảm giác cụ thể (đối lập với hàm tuyến tính $2n$):

| $n$ | $2^n$ | $10^n$ | tuyến tính $2n$ |
|-----|-------|--------|-----------------|
| $1$ | $2$ | $10$ | $2$ |
| $5$ | $32$ | $100\\,000$ | $10$ |
| $10$ | $1\\,024$ | $10$ tỷ | $20$ |
| $20$ | $\\approx 1$ triệu | $10^{20}$ | $40$ |
| $30$ | $\\approx 1$ tỷ | $10^{30}$ | $60$ |

Khi $n = 30$, hàm tuyến tính mới tới $60$, còn $2^n$ đã $\\approx 1$ tỷ. Đây là lý do thuật toán $O(2^n)$ **không chạy nổi** với $n > 30$ — và (ở chiều ngược) lý do $\\log$ ở mục 3 lại "rẻ như cho".

**Mở rộng**:
- **$a^0 = 1$** (mọi $a \\neq 0$). Tại sao? Vì $a^n / a^n = 1 = a^{n-n} = a^0$.
- **$a^{-n} = 1/a^n$**. Tại sao? Vì cần $a^n \\cdot a^{-n} = a^0 = 1$ → $a^{-n} = 1/a^n$.
- **$a^{1/n} = \\sqrt[n]{a}$** (căn bậc n).
- **$a^{p/q} = (a^p)^{1/q} = \\sqrt[q]{a^p}$**.

### 1.2. 6 quy luật lũy thừa

$$\\begin{aligned}
&1.\\ a^m \\cdot a^n = a^{m+n} \\\\
&2.\\ a^m / a^n = a^{m-n} \\\\
&3.\\ (a^m)^n = a^{mn} \\\\
&4.\\ (ab)^n = a^n \\cdot b^n \\\\
&5.\\ (a/b)^n = a^n / b^n \\\\
&6.\\ a^0 = 1
\\end{aligned}$$

### 1.3. Verify từng quy luật bằng số thật (cả 2 vế)

Đừng học thuộc — hãy kiểm tra. Mỗi luật tính **riêng từng vế** rồi so:

| Quy luật | Vế trái (tính trực tiếp) | Vế phải (theo luật) | Khớp? |
|----------|--------------------------|----------------------|:----:|
| $a^m\\cdot a^n = a^{m+n}$ | $2^3\\cdot 2^4 = 8\\cdot 16 = 128$ | $2^7 = 128$ | ✓ |
| $a^m/a^n = a^{m-n}$ | $3^5/3^2 = 243/9 = 27$ | $3^3 = 27$ | ✓ |
| $(a^m)^n = a^{mn}$ | $(2^2)^3 = 4^3 = 64$ | $2^6 = 64$ | ✓ |
| $(ab)^n = a^n\\cdot b^n$ | $(2\\cdot 5)^3 = 10^3 = 1000$ | $2^3\\cdot 5^3 = 8\\cdot 125 = 1000$ | ✓ |
| $(a/b)^n = a^n/b^n$ | $(6/2)^2 = 3^2 = 9$ | $6^2/2^2 = 36/4 = 9$ | ✓ |
| $a^0 = 1$ | $5^3/5^3 = 125/125 = 1$ | $5^0 = 1$ | ✓ |

❓ **Câu hỏi tự nhiên của người đọc**

- *"$a^0 = 1$ có vẻ tùy tiện — vì sao mũ 0 lại ra 1, không phải 0?"* Vì để luật $a^m/a^n = a^{m-n}$ còn đúng khi $m = n$: $a^3/a^3 = 1$ ở vế trái, mà vế phải $a^{3-3} = a^0$. Hai cái phải bằng nhau → buộc $a^0 = 1$. Đây là **định nghĩa được chọn để giữ luật nhất quán**, không phải quy ước vô cớ.
- *"$a^{-n}$ nghĩa là gì? 'nhân âm lần' vô lý mà?"* Đúng, không thể "nhân $-2$ lần". $a^{-n}$ được **định nghĩa** $= 1/a^n$ để luật $a^m\\cdot a^n = a^{m+n}$ còn đúng với mũ âm: cần $a^n\\cdot a^{-n} = a^0 = 1$, suy ra $a^{-n} = 1/a^n$. Vd $2^{-3} = 1/8$.
- *"$0^0$ bằng mấy?"* Đây là dạng **không xác định** (gây tranh cãi): theo $a^0=1$ thì $= 1$, nhưng theo $0^n=0$ thì $= 0$. Trong đại số/tổ hợp thường quy ước $0^0 = 1$; trong giải tích để là dạng vô định.

### 1.3b. Chứng minh từng quy luật từ định nghĩa (không chỉ verify)

Verify bằng số ở 1.3 cho thấy luật **đúng trên một ví dụ**; chứng minh dưới đây cho thấy **vì sao luôn đúng** với mọi $m, n$. Tất cả chỉ dùng định nghĩa "nhân lặp" và tính kết hợp/giao hoán của phép nhân — không có bước nào "dễ thấy".

**Luật 1 — $a^m\\cdot a^n = a^{m+n}$** (với $m, n$ nguyên dương):

$$\\begin{aligned}
a^m \\cdot a^n &= \\underbrace{(a\\cdots a)}_{m\\text{ thừa số}} \\cdot \\underbrace{(a\\cdots a)}_{n\\text{ thừa số}} &&\\text{(định nghĩa)} \\\\
&= \\underbrace{a\\cdot a\\cdots a}_{(m+n)\\text{ thừa số}} &&\\text{(gộp lại, tổng số thừa số} = m+n) \\\\
&= a^{m+n}
\\end{aligned}$$

Verify lại: $2^3\\cdot 2^4$ = "3 thừa số 2" × "4 thừa số 2" = "7 thừa số 2" = $2^7$. Số: $8\\cdot 16 = 128 = 2^7$ ✓.

**Luật 3 — $(a^m)^n = a^{mn}$**: $(a^m)^n$ nghĩa là nhân $a^m$ với chính nó $n$ lần. Mỗi $a^m$ có $m$ thừa số $a$, có $n$ cái như vậy → tổng $m\\cdot n$ thừa số $a$:

$$(a^m)^n = \\underbrace{a^m \\cdot a^m \\cdots a^m}_{n\\text{ lần}} = a^{\\overbrace{m + m + \\cdots + m}^{n\\text{ lần}}} = a^{mn}$$

Verify: $(2^2)^3 = 4^3 = 64$; $2^{2\\cdot 3} = 2^6 = 64$ ✓.

**Luật 4 — $(ab)^n = a^n b^n$**: viết $n$ thừa số $(ab)$ rồi đổi chỗ (phép nhân giao hoán) gom hết $a$ về một bên, $b$ về một bên:

$$(ab)^n = \\underbrace{(ab)(ab)\\cdots(ab)}_{n} = \\underbrace{(a\\cdots a)}_{n}\\cdot\\underbrace{(b\\cdots b)}_{n} = a^n b^n$$

Verify: $(2\\cdot 5)^3 = 10^3 = 1000$; $2^3\\cdot 5^3 = 8\\cdot 125 = 1000$ ✓.

**Luật 2 — $a^m/a^n = a^{m-n}$** (với $m > n$, $a\\neq 0$): tử có $m$ thừa số $a$, mẫu có $n$ thừa số $a$. Triệt tiêu $n$ thừa số chung, còn dư $m - n$:

$$\\frac{a^m}{a^n} = \\frac{\\overbrace{a\\cdots a}^{m}}{\\underbrace{a\\cdots a}_{n}} = \\underbrace{a\\cdots a}_{m-n} = a^{m-n}$$

Verify: $3^5/3^2 = 243/9 = 27$; $3^{5-2} = 3^3 = 27$ ✓. Khi $m = n$, vế phải là $a^0$ — đây chính là cái neo định nghĩa $a^0 = 1$ (xem dưới).

**Vì sao $a^0 = 1$ và $a^{-n} = 1/a^n$ — dãy đếm ngược.** Mỗi lần giảm số mũ đi 1 = **chia cho $a$**. Đi tiếp qua 0 xuống âm rất tự nhiên:

$$\\begin{aligned}
2^3 &= 8 \\\\
2^2 &= 8/2 = 4 \\\\
2^1 &= 4/2 = 2 \\\\
2^0 &= 2/2 = 1 \\qquad\\leftarrow \\text{buộc } a^0 = 1 \\text{ để giữ quy luật} \\\\
2^{-1} &= 1/2 = 0.5 \\\\
2^{-2} &= 0.5/2 = 0.25 = 1/2^2 \\\\
2^{-3} &= 0.25/2 = 0.125 = 1/2^3
\\end{aligned}$$

Số mũ âm không "lạ" — chỉ là dãy chia tiếp tục. Verify $a^{-n} = 1/a^n$ qua luật 2: $2^2/2^5 = 4/32 = 1/8$, mà $2^{2-5} = 2^{-3}$ → $2^{-3} = 1/8 = 1/2^3$ ✓.

### 1.4. Ví dụ tổng hợp

- $2^3 = 8$
- $2^{-2} = 1/2^2 = 1/4$
- $8^{1/3} = \\sqrt[3]{8} = 2$ (căn bậc 3 của 8)
- $(2^3)^4 = 2^{12} = 4096$
- $27^{2/3} = (\\sqrt[3]{27})^2 = 3^2 = 9$ (mũ phân số: lấy căn rồi nâng mũ)
- $(1/2)^{-3} = 2^3 = 8$ (mũ âm của phân số → lật ngược rồi nâng)

⚠ **Lỗi thường gặp với lũy thừa** (4 cái bẫy kinh điển, mỗi cái kèm phản ví dụ số):

- **$a^m + a^n \\neq a^{m+n}$**. Cộng không gộp được như nhân. $2^3 + 2^4 = 8 + 16 = 24$, **không** phải $2^7 = 128$.
- **$(a+b)^n \\neq a^n + b^n$**. $(3+4)^2 = 7^2 = 49$, **không** phải $3^2 + 4^2 = 9 + 16 = 25$. Đúng là $(a+b)^2 = a^2 + 2ab + b^2$.
- **$(a^m)^n \\neq a^{m+n}$** (nhầm luật 3 với luật 1). $(2^2)^3 = 4^3 = 64 = 2^6$ (nhân mũ), **không** phải $2^{2+3} = 2^5 = 32$.
- **$-2^2 \\neq (-2)^2$**. $(-2)^2 = 4$ (bình phương của $-2$), còn $-2^2 = -(2^2) = -4$ (lấy âm của $2^2$ — lũy thừa ưu tiên trước dấu âm).

❓ **Câu hỏi tự nhiên — "Số mũ vô tỉ như $2^\\pi$ nghĩa là gì? Nhân $2$ với chính nó $\\pi$ lần kiểu gì?"** Không "nhân $\\pi$ lần" được. Ta định nghĩa $2^\\pi$ bằng **giới hạn** của dãy mũ hữu tỉ tiến về $\\pi$:

$$2^3 = 8,\\quad 2^{3.1}\\approx 8.574,\\quad 2^{3.14}\\approx 8.815,\\quad 2^{3.1415}\\approx 8.824,\\quad \\ldots \\to 2^\\pi\\approx 8.8250$$

Dãy hội tụ về một số cụ thể; mọi quy luật lũy thừa vẫn giữ. Đó là vẻ đẹp: lũy thừa "mở rộng liên tục" từ số nguyên ra **mọi số thực**.

🔁 **Dừng lại tự kiểm tra**

1. Tính $5^{-2}$ và $(-2)^4$.
2. Rút gọn $x^7\\cdot x^{-3}$.

<details><summary>Đáp án</summary>

1. $5^{-2} = 1/25 = 0.04$; $(-2)^4 = 16$ (mũ chẵn → dương).
2. $x^7\\cdot x^{-3} = x^{7+(-3)} = x^4$.

</details>

### 📝 Tóm tắt mục 1

- $a^n$ = nhân $a$ với chính nó $n$ lần; $a$ là cơ số, $n$ là số mũ.
- Mở rộng nhất quán: $a^0 = 1$, $a^{-n} = 1/a^n$, $a^{1/n} = \\sqrt[n]{a}$, $a^{p/q} = \\sqrt[q]{a^p}$.
- 6 quy luật đều verify được bằng số — không cần học vẹt.

---

## 2. Căn bậc n

### 2.1. Định nghĩa

💡 **Trực giác / Hình dung**: căn là **phép ngược của lũy thừa**. Lũy thừa hỏi "nhân $b$ với chính nó $n$ lần ra bao nhiêu?"; căn hỏi ngược lại "**số nào** nhân với chính nó $n$ lần thì ra $a$?". Vd $2^3 = 8$ thì $\\sqrt[3]{8} = 2$.

**$\\sqrt[n]{a}$** = số b sao cho $b^n = a$.

- $\\sqrt{a} = a^{1/2}$ (căn bậc 2 — viết tắt).
- $\\sqrt[3]{a} = a^{1/3}$.

**6 ví dụ số đa dạng**:
- $\\sqrt{49} = 7$ (vì $7^2 = 49$).
- $\\sqrt[3]{64} = 4$ (vì $4^3 = 64$).
- $\\sqrt{1/4} = 1/2$ (căn của phân số).
- $\\sqrt[5]{32} = 2$ (vì $2^5 = 32$).
- $\\sqrt[3]{-8} = -2$ (vì $(-2)^3 = -8$ — căn bậc **lẻ** của số âm có nghĩa).
- $\\sqrt[4]{16} = 2$ (vì $2^4 = 16$; nhưng $-2$ cũng cho $16$ — căn bậc chẵn quy ước lấy nhánh không âm, xem ⚠ bên dưới).

**Vì sao $a^{1/n}$ chính là căn bậc $n$?** Từ luật 3: $(a^{1/n})^n = a^{(1/n)\\cdot n} = a^1 = a$. Tức số $a^{1/n}$ khi nâng lên mũ $n$ thì ra $a$ — đúng định nghĩa căn bậc $n$. Verify: $(8^{1/3})^3 = 8^{(1/3)\\cdot 3} = 8^1 = 8$, và quả thật $\\sqrt[3]{8} = 2$ với $2^3 = 8$ ✓.

### 2.2. Tính chất

- $\\sqrt[n]{ab} = \\sqrt[n]{a} \\cdot \\sqrt[n]{b}$.
- $\\sqrt[n]{a/b} = \\sqrt[n]{a} / \\sqrt[n]{b}$.

**Vì sao phân phối qua nhân?** Vì căn là lũy thừa mũ $1/n$, mà luật 4 nói $(ab)^{1/n} = a^{1/n}\\cdot b^{1/n}$, tức $\\sqrt[n]{ab} = \\sqrt[n]{a}\\cdot\\sqrt[n]{b}$. Căn thừa kế tính phân phối từ lũy thừa.

**Verify cả 2 vế (3 ví dụ)**:
- $\\sqrt{4\\cdot 9}$: VT $= \\sqrt{36} = 6$; VP $= \\sqrt{4}\\cdot\\sqrt{9} = 2\\cdot 3 = 6$ ✓.
- $\\sqrt{2\\cdot 8}$: VT $= \\sqrt{16} = 4$; VP $= \\sqrt{2}\\cdot\\sqrt{8} = \\sqrt{2}\\cdot 2\\sqrt{2} = 2\\cdot 2 = 4$ ✓.
- $\\sqrt[3]{8/27}$: VT $= \\sqrt[3]{8/27} = 2/3$; VP $= \\sqrt[3]{8}/\\sqrt[3]{27} = 2/3$ ✓.

### 2.2b. Đơn giản hóa căn — tách thừa số chính phương

Khi gặp căn của số lớn, tách ra một **thừa số là số chính phương** (hoặc lũy thừa $n$) rồi đưa ra ngoài:

$$\\sqrt{72} = \\sqrt{36\\cdot 2} = \\sqrt{36}\\cdot\\sqrt{2} = 6\\sqrt{2}$$

Thêm 3 ví dụ: $\\sqrt{48} = \\sqrt{16\\cdot 3} = 4\\sqrt{3}$; $\\sqrt{50} = \\sqrt{25\\cdot 2} = 5\\sqrt{2}$; $\\sqrt[3]{54} = \\sqrt[3]{27\\cdot 2} = 3\\sqrt[3]{2}$. Kiểm chứng số: $6\\sqrt{2}\\approx 6\\cdot 1.414 = 8.485$, và $\\sqrt{72}\\approx 8.485$ ✓.

⚠ **Lỗi thường gặp 1 — $\\sqrt{a^2} = |a|$, KHÔNG phải $a$**. Căn bậc chẵn luôn trả về giá trị **không âm**. Vd $\\sqrt{(-3)^2} = \\sqrt{9} = 3 = |-3|$, **không** phải $-3$. Đây là lý do khi giải $x^2 = 9$ ta được $x = \\pm 3$, nhưng $\\sqrt{9}$ thì chỉ bằng $3$.

⚠ **Lỗi thường gặp 2 — $\\sqrt{a+b} \\neq \\sqrt{a} + \\sqrt{b}$**. Phản ví dụ: $\\sqrt{9+16} = \\sqrt{25} = 5$, nhưng $\\sqrt{9} + \\sqrt{16} = 3 + 4 = 7$. $5 \\neq 7$. Căn **không** "phân phối" qua phép cộng (chỉ qua nhân/chia).

❓ **Câu hỏi tự nhiên của người đọc**

- *"Căn bậc chẵn của số âm có không?"* Trong $\\mathbb{R}$ thì **không** (vd $\\sqrt{-4}$ không có nghiệm thực, vì không số thực nào bình phương ra âm). Phải lên số phức (Tier 03) mới có. Nhưng căn bậc **lẻ** của số âm thì có: $\\sqrt[3]{-8} = -2$ vì $(-2)^3 = -8$.
- *"$a^{p/q}$ nên lấy căn trước hay nâng mũ trước?"* Kết quả như nhau, nhưng **lấy căn trước thường dễ tính hơn**: $27^{2/3} = (\\sqrt[3]{27})^2 = 3^2 = 9$ gọn hơn $\\sqrt[3]{27^2} = \\sqrt[3]{729} = 9$.

🔁 **Dừng lại tự kiểm tra**

1. $\\sqrt{(-5)^2} = ?$
2. $\\sqrt{16 + 9} = ?$ (cẩn thận!)

<details><summary>Đáp án</summary>

1. $\\sqrt{25} = 5$ ($= |-5|$, không phải $-5$).
2. $\\sqrt{25} = 5$. Bẫy: KHÔNG phải $\\sqrt{16} + \\sqrt{9} = 4 + 3 = 7$.

</details>

### 📝 Tóm tắt mục 2

- $\\sqrt[n]{a} = b \\iff b^n = a$; tương đương $a^{1/n}$.
- Phân phối qua **nhân/chia** ($\\sqrt[n]{ab} = \\sqrt[n]{a}\\cdot\\sqrt[n]{b}$), **KHÔNG** qua cộng/trừ.
- $\\sqrt{a^2} = |a|$; căn bậc chẵn của số âm vô nghiệm trong $\\mathbb{R}$.

---

## 3. Logarit

### 3.1. Định nghĩa

💡 **Trực giác / Hình dung**: log trả lời câu hỏi **"bao nhiêu lần nhân?"**. Bạn có 1, nhân với $b$ mãi cho tới khi đạt $x$ — log đếm số lần nhân đó. Vd nhân đôi ($b=2$) từ 1: $1\\to 2\\to 4\\to 8$, đến 8 mất 3 lần → $\\log_2(8) = 3$. Cách hình dung khác: với cơ số 10, $\\log_{10}(x) \\approx$ **"số chữ số của x trừ 1"** — $\\log_{10}(1000) = 3$ (1000 có 4 chữ số). Mũ làm số **phình to**, log **nén** nó lại về thang đo dễ đọc.

**$\\log_b(x)$** = "b mũ mấy bằng x":

$$\\log_b(x) = y \\iff b^y = x$$

💡 **Là gì**: phép ngược của lũy thừa. Nếu mũ "tăng nhanh" → log "tăng chậm" (biến nhân thành cộng).

**Log và căn là hai cách "đảo" cùng phép lũy thừa** — chỉ khác chỗ ẩn nằm ở đâu:

| Phép gốc | Đảo để giải số mũ $x$ | Đảo để giải cơ số $b$ |
|----------|-----------------------|-----------------------|
| $b^x = y$ | $x = \\log_b(y)$ ← **log** | $b = \\sqrt[x]{y} = y^{1/x}$ ← **căn** |

**6 ví dụ số đa dạng** (đọc xuôi theo định nghĩa $b^y = x$):
- $\\log_2(16) = 4$ vì $2^4 = 16$.
- $\\log_5(1) = 0$ vì $5^0 = 1$ (log của 1 luôn $= 0$, mọi cơ số).
- $\\log_{10}(0.01) = -2$ vì $10^{-2} = 0.01$ (log của số $< 1$ thì **âm**).
- $\\log_9(3) = 1/2$ vì $9^{1/2} = 3$ (kết quả phân số).
- $\\log_3(81) = 4$ vì $3^4 = 81$.
- $\\log_b(b) = 1$ vì $b^1 = b$ (log của chính cơ số luôn $= 1$).

**Vì sao quan trọng?** Vì:
- Biểu diễn số rất lớn/nhỏ ($10^{80}$ vs log $= 80$).
- Biến nhân → cộng (đặc biệt hữu ích trước máy tính, vẫn quan trọng).
- Tăng trưởng/giảm theo cấp số nhân (dân số, lãi kép, phóng xạ).
- Trong ML: loss function, entropy đều dùng log.

### 3.2. Cơ số phổ biến

- **$\\log_{10}(x)$** = "log thập phân", viết gọn **$\\log(x)$**. Dùng cho *order of magnitude*, Richter, decibel, pH.
- **$\\log_e(x)$** = "log tự nhiên", viết gọn **$\\ln(x)$**. $e \\approx 2.71828$. Dùng trong giải tích và ML loss.
- **$\\log_2(x)$** = log nhị phân, dùng nhiều trong CS (binary search, độ sâu cây, entropy bit).

⚠ **Lưu ý lập trình**: trong Go, \`math.Log(x)\` là **$\\ln$** (cơ số $e$), KHÔNG phải $\\log_{10}$. Muốn log thập phân/nhị phân dùng \`math.Log10\`, \`math.Log2\`.

### 3.2b. Bảng $\\log_2$ phải thuộc + ASCII đồ thị

$\\log_2$ dùng nhiều nhất trong CS. Nhìn bảng tới khi thuộc:

| $x$ | $1$ | $2$ | $4$ | $8$ | $16$ | $32$ | $64$ | $128$ | $256$ | $1024$ | $\\approx 10^6$ | $\\approx 10^9$ |
|-----|-----|-----|-----|-----|------|------|------|-------|-------|--------|----------------|----------------|
| $\\log_2(x)$ | $0$ | $1$ | $2$ | $3$ | $4$ | $5$ | $6$ | $7$ | $8$ | $10$ | $20$ | $30$ |

**Nhận xét cốt lõi**: $x$ **gấp đôi** thì $\\log_2(x)$ chỉ tăng **+1**. Log tăng theo *bậc nhân* của input, không theo lượng cộng. Đồ thị: hàm mũ phóng lên trời, log "bò" gần như nằm ngang:

\`\`\`
y
↑
30│                                                  · y = x (tuyến tính, phóng lên)
  │                                       ·
20│                            ·
  │                  ·
  │           ·                              ━━━━━━━ log₂(x)
10│      ·                       ━━━━━━━━━━━━
  │   ·             ━━━━━━━━━━━━
 5│ ·     ━━━━━━━━━━
  │·━━━━━━
 0└──────┬────────┬────────┬────────┬────────┬──────→ x
  1     64      256     1024     16K     1 triệu
\`\`\`

- $x = 1 \\to \\log_2 = 0$; $x = 1024 \\to \\log_2 = 10$; $x = 1$ triệu $\\to \\log_2 = 20$; $x = 1$ tỷ $\\to \\log_2 = 30$.
- Để log nhích từ $10$ lên $20$, $x$ phải đi từ $1024$ lên $1$ triệu (gấp ~1000 lần).

→ Đây là lý do thuật toán $O(\\log n)$ "nhanh như cho": kể cả $n = 1$ tỷ, log chỉ là $30$. So với mục 1 (mũ "bùng nổ"), log là chiều ngược — "nén" số khổng lồ về thang nhỏ đọc được.

#### Walk-through: tính nhẩm $\\log_2(1000)$

Hỏi: $2$ mũ mấy bằng $1000$? Tra quanh $1000$: $2^9 = 512 < 1000 < 1024 = 2^{10}$. Nên $\\log_2(1000)$ nằm giữa $9$ và $10$, sát $10$ (vì $1024$ rất gần $1000$). Chính xác qua đổi cơ số: $\\log_2(1000) = \\log_{10}(1000)/\\log_{10}(2) = 3/0.30103 \\approx 9.97$ ✓.

### 3.3. 5 quy luật log

$$\\begin{aligned}
&1.\\ \\log_b(xy) = \\log_b(x) + \\log_b(y) && (\\text{nhân} \\to \\text{cộng}) \\\\
&2.\\ \\log_b(x/y) = \\log_b(x) - \\log_b(y) && (\\text{chia} \\to \\text{trừ}) \\\\
&3.\\ \\log_b(x^n) = n \\cdot \\log_b(x) && (\\text{mũ} \\to \\text{nhân}) \\\\
&4.\\ \\log_b(1) = 0 && (\\text{vì } b^0 = 1) \\\\
&5.\\ \\log_b(b) = 1 && (\\text{vì } b^1 = b)
\\end{aligned}$$

**Vì sao nhân lại thành cộng?** Vì log là mũ ngược, mà mũ thì "$a^m\\cdot a^n = a^{m+n}$" (nhân cơ số = cộng mũ). Lấy log hai vế của $b^x\\cdot b^y = b^{x+y}$ ra đúng luật 1. Log "kế thừa" việc cộng từ số mũ.

#### Chứng minh luật 1, 2, 3 từ định nghĩa (mỗi bước rõ ràng)

Đặt $u = \\log_b(x)$ và $v = \\log_b(y)$. Theo định nghĩa: $b^u = x$ và $b^v = y$.

**Luật 1 — $\\log_b(xy) = \\log_b x + \\log_b y$**:

$$\\begin{aligned}
xy &= b^u\\cdot b^v &&\\text{(thay } x = b^u,\\ y = b^v) \\\\
&= b^{u+v} &&\\text{(quy luật lũy thừa 1)} \\\\
\\Rightarrow \\log_b(xy) &= u + v = \\log_b x + \\log_b y &&\\text{(lấy } \\log_b \\text{ hai vế)}
\\end{aligned}$$

**Luật 2 — $\\log_b(x/y) = \\log_b x - \\log_b y$**: cùng cách, $x/y = b^u/b^v = b^{u-v}$ (luật lũy thừa 2) → $\\log_b(x/y) = u - v$.

**Luật 3 — $\\log_b(x^n) = n\\log_b x$**: $x^n = (b^u)^n = b^{un}$ (luật lũy thừa 3) → $\\log_b(x^n) = un = n\\log_b x$.

→ Cả ba luật log chỉ là **ba luật lũy thừa nhìn ngược lại**. Học một bộ, được cả hai.

### 3.4. Verify từng quy luật log bằng số thật (cả 2 vế)

| Quy luật | Vế trái | Vế phải | Khớp? |
|----------|---------|---------|:----:|
| $\\log(xy)=\\log x+\\log y$ | $\\log_2(4\\cdot 8) = \\log_2(32) = 5$ | $\\log_2 4 + \\log_2 8 = 2+3 = 5$ | ✓ |
| $\\log(x/y)=\\log x-\\log y$ | $\\log_2(32/4) = \\log_2(8) = 3$ | $\\log_2 32 - \\log_2 4 = 5-2 = 3$ | ✓ |
| $\\log(x^n)=n\\cdot\\log x$ | $\\log_2(8^3) = \\log_2(512) = 9$ | $3\\cdot\\log_2 8 = 3\\cdot 3 = 9$ | ✓ |
| $\\log_b(1)=0$ | $\\log_7(1) = 0$ | $0$ | ✓ |
| $\\log_b(b)=1$ | $\\log_7(7) = 1$ | $1$ | ✓ |

**Đổi cơ số (luật 4)**: $\\log_b(x) = \\dfrac{\\log_c(x)}{\\log_c(b)}$ — chia cho $\\log$ cơ số $c$ **bất kỳ**, miễn cùng cơ số trên và dưới. Thường lấy $c = e$ (dùng $\\ln$) hoặc $c = 10$.

**Chứng minh đổi cơ số**: đặt $y = \\log_b(x)$, tức $b^y = x$. Lấy $\\log_c$ hai vế: $\\log_c(b^y) = \\log_c(x)$ → $y\\log_c(b) = \\log_c(x)$ (luật 3) → $y = \\log_c(x)/\\log_c(b)$.

**Verify đổi cơ số (3 ví dụ, cả 2 vế)**:
- $\\log_2(8)$ phải $= 3$. Qua ln: $\\ln 8/\\ln 2 = 2.0794/0.6931 = 3.0000$ ✓.
- $\\log_9(81)$ phải $= 2$ (vì $9^2 = 81$). Qua $\\log_{10}$: $\\log_{10}81/\\log_{10}9 = 1.9085/0.9542 = 2.0000$ ✓.
- $\\log_2(10)$ (không tra bảng được): $\\ln 10/\\ln 2 = 2.3026/0.6931 \\approx 3.3219$. Kiểm: $2^{3.32}\\approx 9.98\\approx 10$ ✓.

Hữu ích vì máy tính/thư viện chỉ có nút $\\ln$ và $\\log_{10}$; muốn $\\log_2$ hay $\\log_b$ bất kỳ thì đổi cơ số.

⚠ **Lỗi thường gặp — lỗi #1 của người học log**: $\\log(x + y) \\neq \\log x + \\log y$. Log chỉ biến **nhân** thành cộng, **không phải cộng** thành cộng. Phản ví dụ: $\\log_{10}(10 + 90) = \\log_{10}(100) = 2$, nhưng $\\log_{10}(10) + \\log_{10}(90) = 1 + 1.954 = 2.954$. $2 \\neq 2.954$. Tương tự $\\log(x-y) \\neq \\log x - \\log y$.

⚠ **Lỗi thường gặp — log của số $\\le 0$ không xác định**. $\\log_b(0)$ và $\\log_b(\\text{số âm})$ **vô nghĩa** trong $\\mathbb{R}$: không số mũ thực nào làm $b^y$ ra 0 hay ra số âm (vì $b^y > 0$ luôn với $b > 0$). Khi giải phương trình log, luôn kiểm tra **điều kiện đối số $> 0$**. (Chính xác hơn: $\\log_b(x)\\to -\\infty$ khi $x\\to 0^+$, nên đôi khi viết $\\log(0) = -\\infty$.)

⚠ **Lỗi thường gặp — $\\log(x^2) \\neq (\\log x)^2$**. Đúng là $\\log(x^2) = 2\\log x$ (luật 3). Phản ví dụ: $\\log_{10}(100) = 2$, nhưng $(\\log_{10}10)^2 = 1^2 = 1$. $2\\neq 1$.

⚠ **Lỗi thường gặp — $\\log(1/x) \\neq 1/\\log x$**. Đúng là $\\log(1/x) = -\\log x$ (luật 2 với tử $= 1$). Phản ví dụ: $\\log_{10}(1/100) = -2$, nhưng $1/\\log_{10}(100) = 1/2 = 0.5$. Khác hẳn.

⚠ **Lỗi thường gặp — $\\dfrac{\\log x}{\\log y} \\neq \\log\\dfrac{x}{y}$**. $\\log(x/y) = \\log x - \\log y$ (HIỆU). Còn $\\log x/\\log y$ chính là **đổi cơ số** $\\log_y(x)$ — một thứ hoàn toàn khác.

❓ **Câu hỏi tự nhiên của người đọc**

- *"Cơ số log có thể là 1 không?"* **Không**. $\\log_1(x)$ vô nghĩa vì $1^y = 1$ với mọi $y$ → không bao giờ ra $x \\neq 1$. Cơ số phải $b > 0$ và $b \\neq 1$.
- *"Vì sao $e \\approx 2.718$ lại là cơ số 'tự nhiên'?"* Vì hàm $e^x$ có đạo hàm bằng chính nó (học ở Tier 04 — Calculus), khiến mọi công thức tăng trưởng/giải tích gọn nhất khi dùng cơ số $e$. "Tự nhiên" = xuất hiện tự nhiên trong toán giải tích, không phải do con người chọn cho tiện.
- *"Tính $\\log_2(10)$ mà máy không có nút $\\log_2$ thì sao?"* Dùng đổi cơ số: $\\log_2(10) = \\log_{10}(10)/\\log_{10}(2) = 1/0.301 \\approx 3.32$.

### 3.5. Ví dụ tổng hợp

- $\\log_2(8) = 3$ (vì $2^3 = 8$).
- $\\log_{10}(100) = 2$.
- $\\ln(e) = 1$.
- $\\log_2(1024) = 10$ (vì $2^{10} = 1024$).
- $\\log(2 \\times 50) = \\log(2) + \\log(50) \\approx 0.301 + 1.699 = 2$ ✓.
- $\\log_3(1/9) = -2$ (vì $3^{-2} = 1/9$).

🔁 **Dừng lại tự kiểm tra**

1. $\\log_2(64) = ?$
2. Đúng hay sai: $\\log(8) = \\log(5) + \\log(3)$?
3. $\\log_5(0.2) = ?$

<details><summary>Đáp án</summary>

1. $6$ (vì $2^6 = 64$).
2. **Sai**. $\\log(5)+\\log(3) = \\log(5\\cdot 3) = \\log(15)$, không phải $\\log(8)$. (Bẫy cộng→cộng.)
3. $0.2 = 1/5 = 5^{-1}$ → $\\log_5(0.2) = -1$.

</details>

### 📝 Tóm tắt mục 3

- $\\log_b(x) = y \\iff b^y = x$; log đếm "số lần nhân cơ số".
- 5 quy luật đều verify được; cốt lõi: **nhân→cộng, chia→trừ, mũ→nhân**.
- Cạm bẫy chí mạng: $\\log(x+y) \\neq \\log x + \\log y$; đối số phải $> 0$; cơ số $b > 0, b \\neq 1$.

---

## 4. Vì sao lũy thừa, căn, log xuất hiện khắp nơi

💡 Ba phép này không phải bài tập sách giáo khoa cho vui — chúng là **ngôn ngữ của tăng trưởng và độ lớn**. Vài chỗ gặp lại:

**Tăng trưởng theo cấp số nhân** (lũy thừa). Dân số, lãi kép, vi khuẩn, phóng xạ đều dạng $N(t) = N_0\\cdot r^t$. Lãi kép $5\\%$/năm: sau $t$ năm vốn nhân $1.05^t$. Sau 14 năm: $1.05^{14}\\approx 1.98$ → gần gấp đôi (quy tắc 72: $72/5\\approx 14.4$ năm gấp đôi).

**Thời gian = log của quy mô**. Câu hỏi ngược "**bao lâu** để đạt mục tiêu?" luôn ra log. Vi khuẩn nhân đôi mỗi giờ, hỏi mấy giờ để từ 1 lên 1 triệu con: $2^t = 10^6 \\Rightarrow t = \\log_2(10^6)\\approx 20$ giờ.

**Big-O của chia-để-trị** ($\\log_2$). Binary search trên $n$ phần tử cắt đôi mỗi bước → số bước $\\approx \\log_2 n$. Với $n = 1$ tỷ: chỉ ~30 bước. Độ sâu cây nhị phân cân bằng $n$ nút cũng $\\approx\\log_2 n$.

**Số chữ số / số bit** (log). Số $N$ có $\\lfloor\\log_{10}N\\rfloor + 1$ chữ số thập phân, và cần $\\lceil\\log_2 N\\rceil$ bit để mã hóa. Vd $N = 1000$: $\\log_{10}1000 = 3$ → 4 chữ số; $\\lceil\\log_2 1000\\rceil = 10$ bit.

**Thang đo nén log** (log₁₀). Richter (động đất), decibel (âm thanh), pH (hóa học) đều là $\\log_{10}$ — mỗi bậc = gấp 10 lần. Động đất 7 độ mạnh gấp $10^{7-5} = 100$ lần độ 5.

**ML và xác suất** ($\\ln$). Cross-entropy loss, log-likelihood, entropy $H = -\\sum p\\log p$ đều dùng log — vì log biến **tích xác suất** (rất nhỏ, dễ tràn số) thành **tổng** ổn định. Sẽ gặp lại sâu ở [Tier 05 — Probability](../../../Vectors/05-Probability/) (nếu học nhánh Vectors).

📝 **Chốt**: lũy thừa = "to nhanh"; log = "thời gian/độ lớn"; căn = "đảo theo bậc". Hễ thấy tăng trưởng nhân, chia đôi, hay đo số chữ số — là gặp bộ ba này.

---

## 5. Bài tập

### Bài tập

**Bài 1**: Rút gọn: a) $2^3 \\cdot 2^5$, b) $(3^2)^4$, c) $4^{1/2}$.

**Bài 2**: Tính: a) $\\log_2(32)$, b) $\\log_{10}(1/1000)$, c) $\\log(2) + \\log(5)$.

**Bài 3**: Giải $2^x = 64$.

**Bài 4**: Giải $\\log_3(x) = 4$.

**Bài 5**: Số tế bào vi khuẩn nhân đôi mỗi giờ. Ban đầu 100 con. Tính số con sau 10 giờ, và sau bao nhiêu giờ thì có 1 triệu con?

**Bài 6**: Đơn giản hóa: a) $\\sqrt{50}$, b) $\\sqrt{(-7)^2}$, c) $27^{2/3}$.

**Bài 7**: Đúng hay sai (giải thích bằng phản ví dụ số): a) $\\log(x+y) = \\log x + \\log y$; b) $\\sqrt{a+b} = \\sqrt{a} + \\sqrt{b}$; c) $(a^m)^n = a^{m+n}$.

**Bài 8**: Tính $\\log_2(100)$ bằng đổi cơ số (cho $\\ln 100\\approx 4.605$, $\\ln 2\\approx 0.693$). Nó nằm giữa hai số nguyên nào?

### Lời giải

**Bài 1**: 
- $2^3\\cdot 2^5 = 2^8 = $ **256**.
- $(3^2)^4 = 3^8 = $ **6561**.
- $4^{1/2} = \\sqrt{4} = $ **2**.

**Bài 2**:
- $\\log_2(32) = 5$ (vì $32 = 2^5$).
- $\\log_{10}(1/1000) = \\log_{10}(10^{-3}) = $ **$-3$**.
- $\\log(2) + \\log(5) = \\log(10) = $ **1**.

**Bài 3**: $64 = 2^6$ → x = **6**. Hoặc $x = \\log_2(64) = 6$.

**Bài 4**: $x = 3^4 = $ **81**.

**Bài 5**: 
- $N(t) = 100 \\cdot 2^t$.
- $N(10) = 100 \\cdot 1024 = $ **102,400 con**.
- $100 \\cdot 2^t = 10^6$ → $2^t = 10^4$ → $t = \\log_2(10^4) = 4 \\cdot \\log_2(10) \\approx 4 \\cdot 3.32 = $ **13.3 giờ**.

**Bài 6**:
- $\\sqrt{50} = \\sqrt{25\\cdot 2} = 5\\sqrt{2}\\approx 7.07$.
- $\\sqrt{(-7)^2} = \\sqrt{49} = 7 = |-7|$ (KHÔNG phải $-7$).
- $27^{2/3} = (\\sqrt[3]{27})^2 = 3^2 = $ **9** (căn trước, mũ sau).

**Bài 7**: Cả ba đều **SAI**.
- a) $\\log_{10}(10+90) = \\log_{10}(100) = 2$, nhưng $\\log_{10}10 + \\log_{10}90 = 1 + 1.954 = 2.954$. Log biến **nhân** thành cộng, không phải cộng thành cộng.
- b) $\\sqrt{9+16} = \\sqrt{25} = 5$, nhưng $\\sqrt{9}+\\sqrt{16} = 3+4 = 7$. Căn phân phối qua nhân/chia, KHÔNG qua cộng.
- c) $(2^2)^3 = 4^3 = 64 = 2^6$ (nhân mũ), nhưng $2^{2+3} = 2^5 = 32$. Lũy thừa của lũy thừa = **nhân** mũ, không cộng.

**Bài 8**: $\\log_2(100) = \\ln 100/\\ln 2 = 4.605/0.693 \\approx $ **6.64**. Nằm giữa $6$ và $7$ vì $2^6 = 64 < 100 < 128 = 2^7$.

---

## 6. Bài tiếp theo

[Lesson 07 — Hàm số](../lesson-07-functions-intro/).

## 📝 Tổng kết

1. **Một bộ ba**: $b^x = y$ — biết $b,x$ hỏi $y$ là **lũy thừa**; biết $b,y$ hỏi $x$ là **log**; biết $x,y$ hỏi $b$ là **căn**.
2. **Lũy thừa $a^n$**: nhân lặp, "bùng nổ" nhanh. 6 quy luật **chứng minh được từ định nghĩa**, không học vẹt. Mở rộng nhất quán: $a^0 = 1$, $a^{-n} = 1/a^n$, $a^{1/n} = \\sqrt[n]{a}$, $a^\\pi$ qua giới hạn.
3. **Căn $\\sqrt[n]{a} = a^{1/n}$**: phép ngược theo bậc. Phân phối qua nhân/chia, KHÔNG qua cộng/trừ. $\\sqrt{a^2} = |a|$.
4. **$\\log_b(x)$**: phép ngược theo số mũ; tăng cực chậm ($x$ gấp đôi → $\\log_2$ tăng +1). 5 luật là 5 luật lũy thừa nhìn ngược; đổi cơ số $\\log_b x = \\log_c x/\\log_c b$.
5. **Cạm bẫy**: $a^m+a^n\\neq a^{m+n}$, $(a+b)^n\\neq a^n+b^n$, $\\log(x+y)\\neq\\log x+\\log y$, $\\sqrt{a+b}\\neq\\sqrt a+\\sqrt b$, $\\log(x^2)\\neq(\\log x)^2$.
6. **Ứng dụng**: tăng trưởng, lãi kép, phóng xạ; Big-O chia-để-trị, số bit/chữ số; Richter/dB/pH; entropy & loss ML.
`;
