// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: Math/01-Arithmetic-Algebra/lesson-06-powers-roots-logs/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 06 — Lũy thừa, căn, logarit

## Mục tiêu

- Hiểu **lũy thừa** $a^n$ và mở rộng cho mũ âm, mũ hữu tỉ, mũ thực.
- Hiểu **căn bậc n** là gì và liên hệ với lũy thừa: $\\sqrt[n]{a} = a^{1/n}$.
- Hiểu **logarit** — phép ngược của lũy thừa: $\\log_b(x)$ = "b mũ mấy bằng x".
- Áp dụng 5 quy luật log cơ bản.

## Kiến thức tiền đề

- [Lesson 02 — Biểu thức đại số](../lesson-02-algebraic-expressions/).

---

## 1. Lũy thừa (Power)

### 1.1. Định nghĩa

💡 **Trực giác / Hình dung**: lũy thừa là "phép nhân của phép nhân". Nếu phép nhân $5 \\times 3$ là cách viết gọn "cộng 5 ba lần" ($5+5+5$), thì lũy thừa $5^3$ là cách viết gọn "nhân 5 ba lần" ($5\\cdot 5\\cdot 5$). Số mũ đếm **số lần lặp phép nhân**, không phải kết quả.

**Lũy thừa $a^n$ với n nguyên dương** = nhân a với chính nó n lần:

$$a^n = a \\cdot a \\cdot a \\cdot \\ldots \\cdot a \\quad (n \\text{ lần})$$

💡 **Là gì**: viết gọn phép nhân lặp lại. $a$ gọi là **cơ số (base)**, $n$ gọi là **số mũ (exponent)**.

**4 ví dụ số đa dạng**:
- Cơ số dương, mũ dương: $2^5 = 2\\cdot 2\\cdot 2\\cdot 2\\cdot 2 = 32$.
- Cơ số âm, mũ chẵn: $(-3)^2 = (-3)\\cdot(-3) = 9$ (kết quả **dương**).
- Cơ số âm, mũ lẻ: $(-3)^3 = (-3)\\cdot(-3)\\cdot(-3) = -27$ (kết quả **âm**).
- Cơ số phân số: $(2/3)^3 = 8/27$.

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

### 1.4. Ví dụ tổng hợp

- $2^3 = 8$
- $2^{-2} = 1/2^2 = 1/4$
- $8^{1/3} = \\sqrt[3]{8} = 2$ (căn bậc 3 của 8)
- $(2^3)^4 = 2^{12} = 4096$
- $27^{2/3} = (\\sqrt[3]{27})^2 = 3^2 = 9$ (mũ phân số: lấy căn rồi nâng mũ)
- $(1/2)^{-3} = 2^3 = 8$ (mũ âm của phân số → lật ngược rồi nâng)

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

**4 ví dụ số đa dạng**:
- $\\sqrt{49} = 7$ (vì $7^2 = 49$).
- $\\sqrt[3]{64} = 4$ (vì $4^3 = 64$).
- $\\sqrt{1/4} = 1/2$ (căn của phân số).
- $\\sqrt[5]{32} = 2$ (vì $2^5 = 32$).

### 2.2. Tính chất

- $\\sqrt[n]{ab} = \\sqrt[n]{a} \\cdot \\sqrt[n]{b}$.
- $\\sqrt[n]{a/b} = \\sqrt[n]{a} / \\sqrt[n]{b}$.

**Verify**: $\\sqrt{4\\cdot 9} = \\sqrt{36} = 6$, và $\\sqrt{4}\\cdot\\sqrt{9} = 2\\cdot 3 = 6$ ✓. $\\sqrt[3]{8/27} = 2/3$, và $\\sqrt[3]{8}/\\sqrt[3]{27} = 2/3$ ✓.

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

**4 ví dụ số đa dạng** (đọc xuôi theo định nghĩa $b^y = x$):
- $\\log_2(16) = 4$ vì $2^4 = 16$.
- $\\log_5(1) = 0$ vì $5^0 = 1$ (log của 1 luôn $= 0$, mọi cơ số).
- $\\log_{10}(0.01) = -2$ vì $10^{-2} = 0.01$ (log của số $< 1$ thì **âm**).
- $\\log_9(3) = 1/2$ vì $9^{1/2} = 3$ (kết quả phân số).

**Vì sao quan trọng?** Vì:
- Biểu diễn số rất lớn/nhỏ ($10^{80}$ vs log $= 80$).
- Biến nhân → cộng (đặc biệt hữu ích trước máy tính, vẫn quan trọng).
- Tăng trưởng/giảm theo cấp số nhân (dân số, lãi kép, phóng xạ).
- Trong ML: loss function, entropy đều dùng log.

### 3.2. Cơ số phổ biến

- **$\\log_{10}(x)$** = "log thập phân", viết gọn **$\\log(x)$**.
- **$\\log_e(x)$** = "log tự nhiên", viết gọn **$\\ln(x)$**. $e \\approx 2.718$.
- **$\\log_2(x)$** = log nhị phân, dùng nhiều trong CS.

### 3.3. 5 quy luật log

$$\\begin{aligned}
&1.\\ \\log_b(xy) = \\log_b(x) + \\log_b(y) && (\\text{nhân} \\to \\text{cộng}) \\\\
&2.\\ \\log_b(x/y) = \\log_b(x) - \\log_b(y) && (\\text{chia} \\to \\text{trừ}) \\\\
&3.\\ \\log_b(x^n) = n \\cdot \\log_b(x) && (\\text{mũ} \\to \\text{nhân}) \\\\
&4.\\ \\log_b(1) = 0 && (\\text{vì } b^0 = 1) \\\\
&5.\\ \\log_b(b) = 1 && (\\text{vì } b^1 = b)
\\end{aligned}$$

**Vì sao nhân lại thành cộng?** Vì log là mũ ngược, mà mũ thì "$a^m\\cdot a^n = a^{m+n}$" (nhân cơ số = cộng mũ). Lấy log hai vế của $b^x\\cdot b^y = b^{x+y}$ ra đúng luật 1. Log "kế thừa" việc cộng từ số mũ.

### 3.4. Verify từng quy luật log bằng số thật (cả 2 vế)

| Quy luật | Vế trái | Vế phải | Khớp? |
|----------|---------|---------|:----:|
| $\\log(xy)=\\log x+\\log y$ | $\\log_2(4\\cdot 8) = \\log_2(32) = 5$ | $\\log_2 4 + \\log_2 8 = 2+3 = 5$ | ✓ |
| $\\log(x/y)=\\log x-\\log y$ | $\\log_2(32/4) = \\log_2(8) = 3$ | $\\log_2 32 - \\log_2 4 = 5-2 = 3$ | ✓ |
| $\\log(x^n)=n\\cdot\\log x$ | $\\log_2(8^3) = \\log_2(512) = 9$ | $3\\cdot\\log_2 8 = 3\\cdot 3 = 9$ | ✓ |
| $\\log_b(1)=0$ | $\\log_7(1) = 0$ | $0$ | ✓ |
| $\\log_b(b)=1$ | $\\log_7(7) = 1$ | $1$ | ✓ |

**Đổi cơ số**: $\\log_b(x) = \\ln(x) / \\ln(b)$ (hoặc chia cho $\\log$ cơ số nào cũng được, miễn cùng cơ số trên/dưới).

**Verify đổi cơ số**: $\\log_2(8)$ đáng ra $= 3$. Tính qua ln: $\\ln(8)/\\ln(2) = 2.0794/0.6931 = 3.0000$ ✓. Hữu ích vì máy tính chỉ có nút $\\ln$ và $\\log_{10}$, muốn $\\log_2$ phải đổi cơ số.

⚠ **Lỗi thường gặp — lỗi #1 của người học log**: $\\log(x + y) \\neq \\log x + \\log y$. Log chỉ biến **nhân** thành cộng, **không phải cộng** thành cộng. Phản ví dụ: $\\log_{10}(10 + 90) = \\log_{10}(100) = 2$, nhưng $\\log_{10}(10) + \\log_{10}(90) = 1 + 1.954 = 2.954$. $2 \\neq 2.954$. Tương tự $\\log(x-y) \\neq \\log x - \\log y$.

⚠ **Lỗi thường gặp — log của số $\\le 0$ không xác định**. $\\log_b(0)$ và $\\log_b(\\text{số âm})$ **vô nghĩa** trong $\\mathbb{R}$: không số mũ thực nào làm $b^y$ ra 0 hay ra số âm (vì $b^y > 0$ luôn với $b > 0$). Khi giải phương trình log, luôn kiểm tra **điều kiện đối số $> 0$**.

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

## 4. Bài tập

### Bài tập

**Bài 1**: Rút gọn: a) $2^3 \\cdot 2^5$, b) $(3^2)^4$, c) $4^{1/2}$.

**Bài 2**: Tính: a) $\\log_2(32)$, b) $\\log_{10}(1/1000)$, c) $\\log(2) + \\log(5)$.

**Bài 3**: Giải $2^x = 64$.

**Bài 4**: Giải $\\log_3(x) = 4$.

**Bài 5**: Số tế bào vi khuẩn nhân đôi mỗi giờ. Ban đầu 100 con. Tính số con sau 10 giờ, và sau bao nhiêu giờ thì có 1 triệu con?

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

---

## 5. Bài tiếp theo

[Lesson 07 — Hàm số](../lesson-07-functions-intro/).

## 📝 Tổng kết

1. **Lũy thừa $a^n$**: mở rộng cho mọi mũ thực. 6 quy luật cơ bản.
2. **Căn $\\sqrt[n]{a} = a^{1/n}$**.
3. **$\\log_b(x)$**: phép ngược của lũy thừa. $\\log(xy) = \\log x + \\log y$, $\\log(x^n) = n \\log x$.
4. **Ứng dụng**: tăng trưởng, lãi kép, phóng xạ, entropy, loss function ML.
`;
