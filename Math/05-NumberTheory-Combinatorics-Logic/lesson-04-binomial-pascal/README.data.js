// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: Math/05-NumberTheory-Combinatorics-Logic/lesson-04-binomial-pascal/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 04 — Nhị thức Newton & Tam giác Pascal

## Mục tiêu

- Hiểu **nhị thức Newton**: $(a + b)^n = \\sum C(n,k) \\cdot a^{n-k} \\cdot b^k$.
- Đọc tam giác Pascal — quan hệ với $C(n, k)$.
- Áp dụng vào tính nhanh và đồng nhất thức.

## Kiến thức tiền đề

- [Lesson 03 — Tổ hợp](../lesson-03-permutations-combinations/).

---

## 1. Nhị thức Newton (Binomial Theorem)

🎯 **Phát biểu**:

$$\\begin{aligned}
(a + b)^n &= \\sum_{k=0}^{n} C(n, k) \\cdot a^{n-k} \\cdot b^k \\\\
&= C(n,0) \\cdot a^n + C(n,1) \\cdot a^{n-1} \\cdot b + \\ldots + C(n,n) \\cdot b^n
\\end{aligned}$$

💡 **Ví dụ $n = 3$**:

$$\\begin{aligned}
(a + b)^3 &= C(3,0)a^3 + C(3,1)a^2 b + C(3,2)ab^2 + C(3,3)b^3 \\\\
&= a^3 + 3a^2 b + 3ab^2 + b^3
\\end{aligned}$$

**Tổng quát $n = 4$**: $(a+b)^4 = a^4 + 4a^3 b + 6a^2 b^2 + 4ab^3 + b^4$.

❓ **Vì sao $C(n, k)$ xuất hiện?** Vì khi khai triển $(a+b)(a+b)\\ldots(a+b)$ $n$ lần, mỗi số hạng = chọn $b$ từ $k$ thừa số và $a$ từ $n-k$ thừa số. **Có đúng $C(n, k)$ cách chọn**.

> 📐 **Định nghĩa đầy đủ — Nhị thức Newton**
>
> **(a) Là gì**: Công thức khai triển $(a+b)^n$ thành 1 tổng $n+1$ số hạng, với **hệ số là $C(n,k)$** từ tam giác Pascal. Tổng quát hoá từ $(a+b)^2 = a^2+2ab+b^2$ (mọi người biết) lên mọi bậc $n$.
>
> **(b) Vì sao cần**: Không có công thức này, khai triển $(a+b)^{10}$ phải nhân 10 lần — vô cùng phiền. Newton cho công thức đóng. Quan trọng hơn — hệ số $C(n,k)$ liên kết đại số ↔ tổ hợp, cho phép giải bài đại số bằng đếm. Ứng dụng: nhị thức xác suất $P(X=k) = C(n,k) \\cdot p^k \\cdot (1-p)^{n-k}$, khai triển Taylor (mở rộng cho $n$ không nguyên qua chuỗi), số tập con ($2^n = \\sum C(n,k)$ lấy $a=b=1$), ước lượng $(1+x)^n \\approx 1+nx$ khi $x$ nhỏ (mở rộng đầu tiên).
>
> **(c) Ví dụ số**: $(a+b)^3 = 1 \\cdot a^3 + 3 \\cdot a^2 b + 3 \\cdot ab^2 + 1 \\cdot b^3$ (hệ số tầng 3 Pascal: 1,3,3,1). $(x+1)^5 = x^5 + 5x^4 + 10x^3 + 10x^2 + 5x + 1$. Tính $(1.01)^{10} \\approx 1 + 10 \\cdot 0.01 + 45 \\cdot 0.0001 + \\ldots \\approx 1.10462$ (máy tính: 1.10462 ✓). Hệ số $x^3$ trong $(2x-3)^7 = C(7,4) \\cdot (2x)^3 \\cdot (-3)^4 = 35 \\cdot 8 \\cdot 81 = $ **22,680**. $\\sum_{k=0}^{n} C(n,k) = (1+1)^n = $ **$2^n$** = số tập con tập $n$ phần tử ✓.

⚠ **Lỗi thường gặp — quên hệ số của a, b khi chúng không phải biến đơn**. Trong $(2x - 3)^7$, số hạng tổng quát là $C(7,k) \\cdot (2x)^{7-k} \\cdot (-3)^k$ — phải nâng cả $2$ và $-3$ lên lũy thừa, KHÔNG chỉ lấy $C(7,k) \\cdot x^{7-k}$. Phản ví dụ: hệ số $x^7$ trong $(2x-3)^7$ là $C(7,0) \\cdot 2^7 \\cdot (-3)^0 = 128$, KHÔNG phải 1.

🔁 **Dừng lại tự kiểm tra**

1. Khai triển $(a+b)^2$ bằng nhị thức, đối chiếu hằng đẳng thức quen.
2. Tính tổng các hệ số trong khai triển $(a+b)^4$ (gợi ý: cho $a = b = 1$).

<details><summary>Đáp án</summary>

1. $C(2,0)a^2 + C(2,1)ab + C(2,2)b^2 = a^2 + 2ab + b^2$ ✓ (đúng hằng đẳng thức).
2. $(1+1)^4 = 2^4 = 16$ ($= 1+4+6+4+1$).

</details>

### 📝 Tóm tắt mục 1

- $(a+b)^n = \\sum C(n,k) \\cdot a^{n-k} \\cdot b^k$; hệ số $= C(n,k)$ (tầng $n$ Pascal).
- Số hạng tổng quát: nâng **cả hệ số lẫn biến** lên lũy thừa.
- $\\sum C(n,k) = 2^n$ (cho $a=b=1$) = số tập con.

---

## 2. Tam giác Pascal

💡 **Trực giác / Hình dung**: tam giác Pascal là "máy tính hệ số" — mỗi số bằng tổng 2 số đỡ nó phía trên, như giọt nước rơi xuống tách đôi. Không cần công thức giai thừa, chỉ cần cộng dần từng tầng là ra mọi \`C(n,k)\`.

\`\`\`
Tầng 0:                    1
Tầng 1:                  1   1
Tầng 2:                1   2   1
Tầng 3:              1   3   3   1
Tầng 4:            1   4   6   4   1
Tầng 5:          1   5  10  10   5   1
Tầng 6:        1   6  15  20  15   6   1
\`\`\`

**Quy tắc**: mỗi số = tổng 2 số phía trên (Pascal).

⟶ **Tầng $n$** chứa các $C(n, 0), C(n, 1), \\ldots, C(n, n)$.

### Tính chất

| Tính chất | Công thức | Ví dụ |
|-----------|-----------|-------|
| Đối xứng | $C(n,k) = C(n, n-k)$ | $C(5,2) = C(5,3) = 10$ |
| Pascal | $C(n,k) = C(n-1,k-1) + C(n-1,k)$ | $C(5,2) = C(4,1)+C(4,2) = 4+6$ |
| Tổng hàng | $\\sum C(n,k) = 2^n$ | $1+5+10+10+5+1 = 32 = 2^5$ |
| Tổng dấu xen | $\\sum (-1)^k \\cdot C(n,k) = 0$ ($n \\ge 1$) | $1-3+3-1 = 0$ |

❓ **Câu hỏi tự nhiên của người đọc**

- *"Vì sao mỗi số = tổng 2 số trên (Pascal)?"* Vì $C(n,k) = C(n-1,k-1) + C(n-1,k)$: chọn $k$ từ $n$ vật = (chọn $k-1$ từ $n-1$, kèm vật cuối) + (chọn $k$ từ $n-1$, bỏ vật cuối). Verify: $C(5,2) = C(4,1)+C(4,2) = 4+6 = 10$ ✓.
- *"Vì sao tổng dấu xen kẽ = 0?"* Đặt $a = 1, b = -1$ vào nhị thức: $(1-1)^n = 0^n = 0 = \\sum(-1)^k C(n,k)$. Verify tầng 3: $1-3+3-1 = 0$ ✓.

⚠ **Lỗi thường gặp — đánh số tầng/cột bắt đầu từ 1 thay vì 0**. Tầng trên cùng là **tầng 0** (chỉ có số 1 $= C(0,0)$); trong mỗi tầng, vị trí trái nhất là **cột 0**. Phản ví dụ: số thứ 3 (từ trái, đếm từ 0 → vị trí 2) ở tầng 5 là $C(5,2) = 10$, KHÔNG phải $C(5,3)$.

🔁 **Dừng lại tự kiểm tra**

1. Viết tầng 7 của tam giác Pascal.
2. Tổng các số ở tầng 6 bằng bao nhiêu?

<details><summary>Đáp án</summary>

1. Tầng 6 là \`1 6 15 20 15 6 1\` → tầng 7: \`1 7 21 35 35 21 7 1\` (cộng cặp kề).
2. $2^6 = 64$ ($= 1+6+15+20+15+6+1$).

</details>

### 📝 Tóm tắt mục 2

- Tầng $n$ chứa $C(n,0),\\ldots,C(n,n)$; mỗi số = tổng 2 số trên (Pascal).
- Đánh số tầng và cột **từ 0**.
- Tổng tầng $= 2^n$; tổng dấu xen kẽ = 0 ($n \\ge 1$).

---

## 3. Ví dụ áp dụng

### 3.1. Tính nhanh (a + b)^n

**Ví dụ**: $(x + 2)^5$.
- Hệ số: 1, 5, 10, 10, 5, 1.
- $= x^5 + 5x^4 \\cdot 2 + 10x^3 \\cdot 4 + 10x^2 \\cdot 8 + 5x \\cdot 16 + 32$.
- $= $ **$x^5 + 10x^4 + 40x^3 + 80x^2 + 80x + 32$**.

### 3.2. Tìm hệ số cụ thể

**Bài**: Hệ số của $x^3$ trong khai triển $(1 + x)^{10}$.
- $C(10, 3) = $ **120**.

**Bài**: Hệ số của $x^4$ trong $(2x - 3)^7$.
- Số hạng tổng quát: $C(7, k) \\cdot (2x)^{7-k} \\cdot (-3)^k$.
- Lũy thừa của $x$ là $7-k$. Đặt $7-k = 4$ → $k = 3$.
- Hệ số: $C(7, 3) \\cdot 2^4 \\cdot (-3)^3 = 35 \\cdot 16 \\cdot (-27) = $ **-15,120**.

### 3.3. Số tập con

**Câu hỏi**: Tập $n$ phần tử có bao nhiêu tập con?
- Tổng $C(n, 0) + C(n, 1) + \\ldots + C(n, n) = $ **$2^n$**.

**Ví dụ**: Tập $\\{1, 2, 3, 4\\}$ có **$2^4 = 16$** tập con.

💡 **Trực giác / Hình dung tìm hệ số**: để tìm hệ số của $x^m$, viết số hạng tổng quát $C(n,k) \\cdot (\\text{phần } x)^{\\ldots} \\cdot (\\text{phần còn lại})^k$, rồi giải bậc của $x$ bằng $m$ để tìm $k$. Như "tra bảng" — chọn đúng số hạng cần.

❓ **Câu hỏi tự nhiên của người đọc**

- *"Tìm hệ số $x^4$ trong $(2x-3)^7$, vì sao đặt $7-k = 4$?"* Số hạng tổng quát $C(7,k) \\cdot (2x)^{7-k} \\cdot (-3)^k$ có bậc $x$ là $7-k$. Muốn bậc 4 → $7-k = 4 \\to k = 3$. Rồi tính hệ số $= C(7,3) \\cdot 2^4 \\cdot (-3)^3 = 35 \\cdot 16 \\cdot (-27) = -15120$.
- *"Số tập con KỂ tập rỗng hay không?"* $2^n$ ĐÃ tính cả tập rỗng và tập đầy đủ. Muốn bỏ tập rỗng: $2^n - 1$. Vd tập 5 phần tử: 32 tập con, 31 tập khác rỗng.

⚠ **Lỗi thường gặp**: tìm hệ số nhưng quên phần lũy thừa của hằng số. Phản ví dụ: hệ số $x^4$ trong $(2x-3)^7$ KHÔNG phải $C(7,3) = 35$ — phải nhân thêm $2^4 \\cdot (-3)^3$.

🔁 **Dừng lại tự kiểm tra**

1. Hệ số của $x^2$ trong $(1+x)^6$.
2. Số tập con khác rỗng của tập 4 phần tử.

<details><summary>Đáp án</summary>

1. $C(6,2) = 15$.
2. $2^4 - 1 = 15$.

</details>

### 📝 Tóm tắt mục 3

- Tính nhanh $(a+b)^n$ bằng hệ số Pascal tầng $n$.
- Tìm hệ số $x^m$: viết số hạng tổng quát, giải bậc $x = m$, **nhân cả hằng số**.
- Số tập con của tập $n = 2^n$ (gồm rỗng); khác rỗng $= 2^n - 1$.

---

## 4. Tổng quát hóa — Khai triển đa thức

💡 **Trực giác / Hình dung**: nhị thức Newton chia $n$ thừa số thành 2 "rổ" ($a$ hoặc $b$); đa thức (multinomial) chia thành **nhiều rổ** ($a, b, c$...). Hệ số $n!/(i!j!k!)$ = số cách chia $n$ vật vào các rổ kích thước $i, j, k$ — đúng tinh thần "chọn nhóm" của tổ hợp.

**Đa thức $(a + b + c)^n$** (đa thức tổng quát Newton):

$$(a + b + c)^n = \\sum_{i+j+k=n} \\frac{n!}{i! \\cdot j! \\cdot k!} \\cdot a^i \\cdot b^j \\cdot c^k$$

trong đó **$n!/(i! \\cdot j! \\cdot k!)$** = hệ số đa thức (multinomial coefficient).

**4 ví dụ số đa dạng**:
- $(a+b+c)^2 = a^2+b^2+c^2 + 2ab+2bc+2ca$ (hệ số $2 = 2!/(1!1!0!)$).
- Hệ số $a^2 bc$ trong $(a+b+c)^4 = 4!/(2!1!1!) = 24/2 = 12$.
- Hệ số $a^3$ trong $(a+b+c)^3 = 3!/(3!0!0!) = 1$.
- Tổng tất cả hệ số $(a+b+c)^n$ cho $a=b=c=1 = 3^n$ (vd $n=2$ → $9 = 1+1+1+2+2+2$ ✓).

❓ **Câu hỏi tự nhiên của người đọc**

- *"Khi nào dùng multinomial thay binomial?"* Khi có $\\ge 3$ hạng tử trong ngoặc. $(a+b)^n$ dùng $C(n,k)$; $(a+b+c)^n$ dùng $n!/(i!j!k!)$.
- *"Số số hạng phân biệt trong $(a+b+c)^n$ là bao nhiêu?"* Bằng số nghiệm nguyên không âm của $i+j+k = n$, tức tổ hợp lặp $C(n+2, 2)$. Vd $n=2$ → $C(4,2) = 6$ số hạng ($a^2,b^2,c^2,ab,bc,ca$) ✓.

⚠ **Lỗi thường gặp**: quên hệ số chéo ($2ab$...) khi khai triển $(a+b+c)^2$. Phản ví dụ: $(a+b+c)^2 \\neq a^2+b^2+c^2$ — thiếu $2ab+2bc+2ca$. Kiểm số: $(1+1+1)^2 = 9$, còn $1+1+1 = 3 \\neq 9$.

🔁 **Dừng lại tự kiểm tra**

1. Hệ số của $a^2 b$ trong $(a+b)^3$ (dùng binomial).
2. Hệ số của $xyz$ trong $(x+y+z)^3$.

<details><summary>Đáp án</summary>

1. $C(3,1) = 3$ (số hạng $C(3,1)a^2 b$).
2. $3!/(1!1!1!) = 6$.

</details>

### 📝 Tóm tắt mục 4

- Đa thức: $(a+b+c)^n = \\sum [n!/(i!j!k!)] a^i b^j c^k$, tổng $i+j+k = n$.
- Hệ số multinomial = số cách chia $n$ vật vào các rổ $i, j, k$.
- Tổng mọi hệ số $= (\\text{số hạng tử})^n$ khi cho tất cả biến $= 1$.

---

## 5. Bài tập

### Bài tập

**Bài 1**: Khai triển $(x + 1)^6$.

**Bài 2**: Tìm hệ số $x^5$ trong $(2x + 1)^8$.

**Bài 3**: Tính tổng $1 + 7 + 21 + 35 + 35 + 21 + 7 + 1$.

**Bài 4**: Số tập con khác rỗng của tập 5 phần tử.

**Bài 5**: Chứng minh $C(n+1, k) = C(n, k-1) + C(n, k)$ bằng đại số.

### Lời giải

**Bài 1**: Hệ số Pascal tầng 6: 1, 6, 15, 20, 15, 6, 1 → **$x^6 + 6x^5 + 15x^4 + 20x^3 + 15x^2 + 6x + 1$**.

**Bài 2**: Số hạng tổng quát $C(8,k) \\cdot (2x)^{8-k}$. Đặt $8-k = 5$ → $k = 3$. Hệ số $= C(8,3) \\cdot 2^5 = 56 \\cdot 32 = $ **1,792**.

**Bài 3**: $= \\sum C(7, k)$, $k=0..7 = $ **$2^7 = 128$**.

**Bài 4**: $2^5 - 1 = $ **31** (trừ tập rỗng).

**Bài 5**:  
- $C(n, k-1) + C(n, k) = n!/((k-1)!(n-k+1)!) + n!/(k!(n-k)!)$.
- Quy đồng $k!(n-k+1)!$: $= n! \\cdot k/(k!(n-k+1)!) + n! \\cdot (n-k+1)/(k!(n-k+1)!) = n! \\cdot (k + n-k+1)/(k!(n-k+1)!) = n! \\cdot (n+1)/(k!(n-k+1)!)$.
- $= (n+1)!/(k!(n+1-k)!) = C(n+1, k)$. □

---

## 6. Bài tiếp theo

[Lesson 05 — Dirichlet & bù trừ](../lesson-05-pigeonhole-inclusion-exclusion/).

## 📝 Tổng kết

1. **Nhị thức Newton**: $(a+b)^n = \\sum C(n,k) \\cdot a^{n-k} \\cdot b^k$.
2. **Pascal** mỗi số = 2 số phía trên. Tầng $n$ chứa $C(n,0)\\ldots C(n,n)$.
3. **Đối xứng**: $C(n,k) = C(n,n-k)$.
4. **Tổng hàng**: $\\sum C(n,k) = 2^n$ = số tập con của tập $n$.
5. **Tìm hệ số** trong khai triển: viết số hạng tổng quát, giải bậc cần tìm.
`;
