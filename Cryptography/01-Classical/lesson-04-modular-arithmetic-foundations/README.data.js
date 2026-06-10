// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: Cryptography/01-Classical/lesson-04-modular-arithmetic-foundations/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 04: Modular Arithmetic Foundations

> **Tầng 1 — Classical Cryptography · Cryptography**

## Mục tiêu học tập

1. Nắm vững phép toán modular: cộng, nhân, phân phối — chuẩn bị cho RSA.
2. Tính gcd bằng Euclidean algorithm từng bước.
3. Tìm modular inverse bằng Extended Euclidean algorithm.
4. Hiểu Fermat's little theorem và Euler's theorem.
5. Tính lũy thừa modular nhanh (square-and-multiply) trong O(log k).

## Kiến thức tiền đề

- Phép chia có dư: $a = bq + r$ ($0 \\le r < b$).
- Số nguyên tố (prime), ước số chung (common divisor).
- Tham khảo [\`../../../Math/01-Arithmetic-Algebra/\`](../../../Math/01-Arithmetic-Algebra/) nếu cần ôn.
- [Lesson 03: OTP](../lesson-03-one-time-pad-perfect-secrecy/README.md) — đã xong Classical Cryptography phần cipher.

---

## 1. Phép toán Modular

> 💡 **Trực giác**: Phép mod giống đồng hồ. Đồng hồ 12 tiếng: sau 11 giờ, thêm 3 giờ = 2 giờ (không phải 14). Tương tự, $a \\bmod n$ là "phần dư sau khi chia cho $n$" — luôn nằm trong $\\{0, 1, \\dots, n-1\\}$.

### 1.1 Định nghĩa và tính chất

**$a \\bmod n$** = phần dư khi chia $a$ cho $n$:

$$a \\bmod n = a - n \\cdot \\lfloor a/n \\rfloor$$

Tính chất phân phối (closure properties):

$$\\begin{aligned}
(a + b) \\bmod n &= ((a \\bmod n) + (b \\bmod n)) \\bmod n\\\\
(a \\times b) \\bmod n &= ((a \\bmod n) \\times (b \\bmod n)) \\bmod n
\\end{aligned}$$

Hai số $a$, $b$ được gọi là **congruent modulo n**, ký hiệu $a \\equiv b \\pmod{n}$, nếu $n \\mid (a - b)$.

### 1.2 Walk-through 5 ví dụ số thật

**Ví dụ 1 — Phép cộng mod 12:**

$$(17 + 8) \\bmod 12 = 25 \\bmod 12 = 25 - 12 \\cdot 2 = 25 - 24 = 1$$

Kiểm tra: $(17 \\bmod 12) = 5$; $(8 \\bmod 12) = 8$; $(5 + 8) \\bmod 12 = 13 \\bmod 12 = 1$ ✓

**Ví dụ 2 — Phép nhân mod 7:**

$$(5 \\times 6) \\bmod 7 = 30 \\bmod 7 = 30 - 7 \\cdot 4 = 30 - 28 = 2$$

Kiểm tra: $(5 \\bmod 7)=5$; $(6 \\bmod 7)=6$; $(5 \\times 6) \\bmod 7 = 30 \\bmod 7 = 2$ ✓

**Ví dụ 3 — Lũy thừa mod 13 (nhỏ):**

$$3^5 \\bmod 13 = 243 \\bmod 13 = 243 - 13 \\cdot 18 = 243 - 234 = 9$$

**Ví dụ 4 — Số âm mod:**

$$\\begin{aligned}
(-7) \\bmod 26 &= (-7 + 26) = 19 \\quad \\text{(vì } -7 - 26 \\cdot (-1) = -7 + 26 = 19)\\\\
(-3) \\bmod 5 &= (-3 + 5) = 2 \\quad \\text{(vì } -3 - 5 \\cdot (-1) = -3 + 5 = 2)
\\end{aligned}$$

**Ví dụ 5 — Liên kết Caesar:**

$$\\begin{aligned}
&\\text{Encrypt Z } (=25) \\text{ với } k=3: (25 + 3) \\bmod 26 = 28 \\bmod 26 = 2 = C\\\\
&\\text{Decrypt D } (=3) \\text{ với } k=3: (3 - 3 + 26) \\bmod 26 = 26 \\bmod 26 = 0 = A
\\end{aligned}$$

> ⚠ **Lỗi thường gặp trong lập trình**: Nhiều ngôn ngữ (C, Java, Python) trả về số âm cho phép mod với số âm: \`-7 % 26 = -7\` trong C. Phải tự xử lý: \`((a % n) + n) % n\` để luôn ra số dương.

> ❓ **Câu hỏi tự nhiên**:
> - *"Tại sao mod quan trọng cho crypto?"* — RSA, Diffie-Hellman đều tính $a^e \\bmod n$. AES dùng $\\mathrm{GF}(2^8)$ là phép tính trên trường hữu hạn với mod. Vigenère là cộng mod 26. Crypto = toán học số học.
> - *"$a \\bmod n$ có thể là số âm không?"* — Theo định nghĩa toán học, $a \\bmod n \\in \\{0, \\dots, n-1\\}$, luôn không âm. Nhưng cẩn thận với implementation ngôn ngữ lập trình.

---

## 2. GCD và Euclidean Algorithm

> 💡 **Trực giác**: $\\gcd(a, b)$ = "số lớn nhất chia hết cả $a$ và $b$". Euclidean algorithm dựa vào tính chất: nếu $a = b \\cdot q + r$, thì mọi ước chung của $a$ và $b$ cũng là ước chung của $b$ và $r$. Cứ "thay $(a,b)$ bằng $(b, r)$" $\\to r$ giảm dần $\\to$ cuối cùng $r = 0 \\to \\gcd = b$ lúc đó.

### 2.1 Euclidean Algorithm

$$\\begin{aligned}
\\gcd(a, b) &= \\gcd(b, a \\bmod b) \\quad \\text{với } b > 0\\\\
\\gcd(a, 0) &= a
\\end{aligned}$$

**Ví dụ 1 — $\\gcd(35, 15)$:**

$$\\begin{aligned}
\\gcd(35, 15) &: 35 = 2 \\cdot 15 + 5 \\Rightarrow \\gcd(35,15) = \\gcd(15, 5)\\\\
\\gcd(15, 5) &: 15 = 3 \\cdot 5 + 0 \\Rightarrow \\gcd(15,5) = \\gcd(5, 0)\\\\
\\gcd(5, 0) &: = 5\\\\
&\\Rightarrow \\gcd(35, 15) = 5
\\end{aligned}$$

Verify: $35 = 5 \\cdot 7$, $15 = 5 \\cdot 3 \\to \\gcd = 5$ ✓

**Ví dụ 2 — $\\gcd(252, 105)$:**

$$\\begin{aligned}
\\gcd(252, 105) &: 252 = 2 \\cdot 105 + 42 \\Rightarrow \\gcd(252,105) = \\gcd(105, 42)\\\\
\\gcd(105, 42) &: 105 = 2 \\cdot 42 + 21 \\Rightarrow \\gcd(105,42) = \\gcd(42, 21)\\\\
\\gcd(42, 21) &: 42 = 2 \\cdot 21 + 0 \\Rightarrow \\gcd(42,21) = 21\\\\
&\\Rightarrow \\gcd(252, 105) = 21
\\end{aligned}$$

Verify: $252 = 21 \\cdot 12$, $105 = 21 \\cdot 5 \\to \\gcd = 21$ ✓

**Ví dụ 3 — $\\gcd(17, 5)$ (17 prime, 5 prime, coprime):**

$$\\begin{aligned}
\\gcd(17, 5) &: 17 = 3 \\cdot 5 + 2 \\Rightarrow \\gcd(17,5) = \\gcd(5, 2)\\\\
\\gcd(5, 2) &: 5 = 2 \\cdot 2 + 1 \\Rightarrow \\gcd(5,2) = \\gcd(2, 1)\\\\
\\gcd(2, 1) &: 2 = 2 \\cdot 1 + 0 \\Rightarrow \\gcd(2,1) = 1\\\\
&\\Rightarrow \\gcd(17, 5) = 1 \\quad \\text{(coprime)}
\\end{aligned}$$

> ⚠ **Tại sao GCD quan trọng cho crypto**: Trong RSA, cần $\\gcd(e, \\varphi(n)) = 1$ để $e$ có inverse mod $\\varphi(n)$. Trong mọi modular inverse, điều kiện $\\gcd(a, n) = 1$ là bắt buộc — nếu không tồn tại inverse.

---

## 3. Extended Euclidean Algorithm — Modular Inverse

> 💡 **Trực giác**: Extended Euclidean không chỉ tính $\\gcd(a, b)$ mà còn tìm hệ số $s, t$ sao cho $a \\cdot s + b \\cdot t = \\gcd(a, b)$. Khi $\\gcd(a, n) = 1$, ta có $a \\cdot s + n \\cdot t = 1$, tức là $a \\cdot s \\equiv 1 \\pmod{n} \\to s$ là modular inverse của $a \\bmod n$.

### 3.1 Định nghĩa modular inverse

**$a^{-1} \\bmod n$** là số $x$ sao cho $a \\cdot x \\equiv 1 \\pmod{n}$.

Tồn tại khi và chỉ khi $\\gcd(a, n) = 1$. Nếu $\\gcd(a, n) > 1 \\to$ không tồn tại inverse.

**Ví dụ 1 — Tìm $7^{-1} \\bmod 26$:**

Chạy Extended Euclidean cho $(7, 26)$:

$$\\begin{aligned}
\\text{Bước 1}&: 26 = 3 \\cdot 7 + 5 \\Rightarrow 5 = 26 - 3 \\cdot 7\\\\
\\text{Bước 2}&: 7 = 1 \\cdot 5 + 2 \\Rightarrow 2 = 7 - 1 \\cdot 5\\\\
\\text{Bước 3}&: 5 = 2 \\cdot 2 + 1 \\Rightarrow 1 = 5 - 2 \\cdot 2\\\\
\\text{Bước 4}&: 2 = 2 \\cdot 1 + 0 \\Rightarrow \\text{done, } \\gcd = 1
\\end{aligned}$$

Back-substitute:

$$\\begin{aligned}
1 &= 5 - 2 \\cdot 2\\\\
&= 5 - 2 \\cdot (7 - 1 \\cdot 5)\\\\
&= 5 - 2 \\cdot 7 + 2 \\cdot 5\\\\
&= 3 \\cdot 5 - 2 \\cdot 7\\\\
&= 3 \\cdot (26 - 3 \\cdot 7) - 2 \\cdot 7\\\\
&= 3 \\cdot 26 - 9 \\cdot 7 - 2 \\cdot 7\\\\
&= 3 \\cdot 26 - 11 \\cdot 7\\\\
&= (-11) \\cdot 7 + 3 \\cdot 26
\\end{aligned}$$

$$\\begin{aligned}
&\\Rightarrow 7 \\cdot (-11) + 26 \\cdot 3 = 1\\\\
&\\Rightarrow 7^{-1} \\equiv -11 \\equiv -11 + 26 = 15 \\pmod{26}
\\end{aligned}$$

Verify: $7 \\times 15 = 105 = 4 \\cdot 26 + 1 \\equiv 1 \\pmod{26}$ ✓

**Ví dụ 2 — Tìm $3^{-1} \\bmod 11$:**

$$\\begin{aligned}
11 &= 3 \\cdot 3 + 2 \\Rightarrow 2 = 11 - 3 \\cdot 3\\\\
3 &= 1 \\cdot 2 + 1 \\Rightarrow 1 = 3 - 1 \\cdot 2\\\\
2 &= 2 \\cdot 1 + 0 \\Rightarrow \\gcd = 1
\\end{aligned}$$

Back-sub: $1 = 3 - 1 \\cdot 2 = 3 - 1 \\cdot (11 - 3 \\cdot 3) = 4 \\cdot 3 - 1 \\cdot 11 \\Rightarrow 3^{-1} \\equiv 4 \\pmod{11}$

Verify: $3 \\times 4 = 12 \\equiv 1 \\pmod{11}$ ✓

**Ví dụ 3 — Không tồn tại inverse: $4^{-1} \\bmod 6$:**

$$\\gcd(4, 6) = 2 \\ne 1 \\to 4^{-1} \\bmod 6 \\text{ không tồn tại!}$$

**Ví dụ 4 — Tìm $17^{-1} \\bmod 100$:**

$$\\begin{aligned}
100 &= 5 \\cdot 17 + 15 \\Rightarrow 15 = 100 - 5 \\cdot 17\\\\
17 &= 1 \\cdot 15 + 2 \\Rightarrow 2 = 17 - 1 \\cdot 15\\\\
15 &= 7 \\cdot 2 + 1 \\Rightarrow 1 = 15 - 7 \\cdot 2\\\\
2 &= 2 \\cdot 1 + 0 \\Rightarrow \\gcd = 1
\\end{aligned}$$

Back-sub:

$$\\begin{aligned}
1 &= 15 - 7 \\cdot 2\\\\
&= 15 - 7 \\cdot (17 - 15) = 8 \\cdot 15 - 7 \\cdot 17\\\\
&= 8 \\cdot (100 - 5 \\cdot 17) - 7 \\cdot 17 = 8 \\cdot 100 - 40 \\cdot 17 - 7 \\cdot 17\\\\
&= 8 \\cdot 100 - 47 \\cdot 17\\\\
&\\Rightarrow 17^{-1} \\equiv -47 \\equiv -47 + 100 = 53 \\pmod{100}
\\end{aligned}$$

Verify: $17 \\times 53 = 901 = 9 \\cdot 100 + 1 \\equiv 1 \\pmod{100}$ ✓

> ❓ **Câu hỏi tự nhiên**:
> - *"Modular inverse dùng ở đâu trong crypto?"* — RSA decrypt: $d = e^{-1} \\bmod \\varphi(n)$. Affine cipher: decrypt cần $a^{-1} \\bmod 26$. Diffie-Hellman: tính $d$ từ public $e$. Mọi nơi cần "chia" trong arithmetic modular.
> - *"Có cách tính inverse nhanh hơn không?"* — Extended Euclidean là $O(\\log n)$ — chuẩn nhất. Với $p$ là số nguyên tố: Fermat's little theorem cho $a^{-1} \\equiv a^{p-2} \\bmod p$ — đơn giản hơn để lập trình nhưng chậm hơn một chút.

---

## 4. Fermat's Little Theorem & Euler's Theorem

### 4.1 Fermat's Little Theorem

**Định lý** (Pierre de Fermat, 1640): Nếu $p$ là số nguyên tố và $\\gcd(a, p) = 1$:

$$a^{p-1} \\equiv 1 \\pmod{p}$$

**Ví dụ 1 — Verify $2^6 \\bmod 7$:**

$p=7$, $a=2$. Fermat: $2^6 \\equiv 1 \\pmod{7}$.

$$\\begin{aligned}
2^1 &= 2\\\\
2^2 &= 4\\\\
2^3 &= 8 \\bmod 7 = 1\\\\
2^6 &= (2^3)^2 = 1^2 = 1 \\pmod{7} \\checkmark
\\end{aligned}$$

**Ví dụ 2 — Tính $3^{100} \\bmod 101$ (101 là nguyên tố):**

$p = 101$, $a = 3$. Fermat: $3^{100} \\equiv 1 \\pmod{101}$.

$$3^{100} \\bmod 101 = 1$$

**Ví dụ 3 — Fermat dùng tính inverse: $7^{-1} \\bmod 11$ (11 nguyên tố):**

$a^{-1} \\equiv a^{p-2} \\pmod{p}$ khi $p$ prime.

$$7^{-1} \\bmod 11 = 7^{11-2} \\bmod 11 = 7^9 \\bmod 11$$

$$\\begin{aligned}
7^1 &= 7\\\\
7^2 &= 49 \\bmod 11 = 5\\\\
7^4 &= 5^2 = 25 \\bmod 11 = 3\\\\
7^8 &= 3^2 = 9 \\bmod 11\\\\
7^9 &= 7^8 \\cdot 7^1 = 9 \\cdot 7 = 63 \\bmod 11 = 8 \\quad (63 = 5 \\cdot 11 + 8)
\\end{aligned}$$

Verify: $7 \\times 8 = 56 = 5 \\cdot 11 + 1 \\equiv 1 \\pmod{11}$ ✓

### 4.2 Euler's Totient Function φ(n)

**Định nghĩa**: $\\varphi(n)$ = số lượng số nguyên trong $\\{1, \\dots, n\\}$ mà coprime với $n$.

**Công thức:**
- $\\varphi(p) = p - 1$ ($p$ nguyên tố, mọi số từ 1 đến $p-1$ đều coprime với $p$)
- $\\varphi(p \\cdot q) = (p-1)(q-1)$ ($p, q$ nguyên tố, $p \\ne q$)
- $\\varphi(p^k) = p^k - p^{k-1} = p^{k-1}(p-1)$
- Multiplicative: $\\varphi(m \\cdot n) = \\varphi(m) \\cdot \\varphi(n)$ nếu $\\gcd(m, n) = 1$

**Ví dụ 1 — $\\varphi(7) = 6$**: 7 nguyên tố $\\to \\varphi(7) = 7-1 = 6$. Các số $\\{1,2,3,4,5,6\\}$ đều coprime với 7.

**Ví dụ 2 — $\\varphi(15)$:**

$15 = 3 \\cdot 5$. $\\varphi(15) = \\varphi(3) \\cdot \\varphi(5) = 2 \\cdot 4 = 8$.

Verify: $\\{1,2,4,7,8,11,13,14\\}$ coprime với 15 $\\to$ 8 số ✓

**Ví dụ 3 — $\\varphi(12)$:**

$12 = 4 \\cdot 3 = 2^2 \\cdot 3$. $\\varphi(12) = \\varphi(4) \\cdot \\varphi(3) = 2 \\cdot 2 = 4$.

Verify: $\\{1,5,7,11\\}$ coprime với 12 $\\to$ 4 số ✓

**Ví dụ 4 — $\\varphi(n)$ trong RSA**: $p=11$, $q=13$ (hai nguyên tố nhỏ).

$$\\begin{aligned}
n &= 11 \\cdot 13 = 143\\\\
\\varphi(n) &= (11-1)(13-1) = 10 \\cdot 12 = 120
\\end{aligned}$$

### 4.3 Euler's Theorem (tổng quát Fermat)

**Định lý** (Euler, 1736): Nếu $\\gcd(a, n) = 1$:

$$a^{\\varphi(n)} \\equiv 1 \\pmod{n}$$

Khi $n = p$ là nguyên tố: $\\varphi(p) = p-1 \\to$ Euler's theorem = Fermat's little theorem.

**Ví dụ — Verify $2^{\\varphi(15)} \\bmod 15$:**

$\\varphi(15) = 8$. Euler: $2^8 \\equiv 1 \\pmod{15}$.

$2^8 = 256$. $256 \\bmod 15$: $256 = 17 \\cdot 15 + 1 \\to 256 \\bmod 15 = 1$ ✓

**Ví dụ — Tính $3^{100} \\bmod 10$ ($\\varphi(10) = 4$):**

$\\varphi(10) = \\varphi(2) \\cdot \\varphi(5) = 1 \\cdot 4 = 4$. $\\gcd(3,10)=1 \\to$ Euler: $3^4 \\equiv 1 \\pmod{10}$.

$100 = 25 \\cdot 4 + 0 \\to 3^{100} = (3^4)^{25} \\equiv 1^{25} = 1 \\pmod{10}$

> 📝 **Ý nghĩa trong RSA**: Euler's theorem là cơ sở của RSA. Với $n = p \\cdot q$, $\\varphi(n) = (p-1)(q-1)$: nếu $e \\cdot d \\equiv 1 \\pmod{\\varphi(n)}$, thì với mọi $m$: $(m^e)^d = m^{ed} \\equiv m^{1 + k \\cdot \\varphi(n)} = m \\cdot (m^{\\varphi(n)})^k \\equiv m \\cdot 1 = m \\pmod{n}$. Đây chính là cơ chế RSA encrypt $\\to$ decrypt.

> 🔁 **Dừng lại tự kiểm tra**:
>
> **Câu 1**: $\\gcd(48, 18) = ?$
> <details><summary>Đáp án</summary>
> $48 = 2 \\cdot 18 + 12$; $18 = 1 \\cdot 12 + 6$; $12 = 2 \\cdot 6 + 0 \\to \\gcd = 6$. Verify: $48 = 6 \\cdot 8$, $18 = 6 \\cdot 3$ ✓
> </details>
>
> **Câu 2**: $5^{-1} \\bmod 7 = ?$
> <details><summary>Đáp án</summary>
> $\\gcd(5,7)=1$. Extend: $7 = 1 \\cdot 5 + 2$; $5 = 2 \\cdot 2 + 1$. Back: $1 = 5 - 2 \\cdot 2 = 5 - 2 \\cdot (7-5) = 3 \\cdot 5 - 2 \\cdot 7 \\to 5^{-1} \\equiv 3 \\pmod{7}$. Verify: $5 \\cdot 3 = 15 \\equiv 1 \\pmod{7}$ ✓. Hoặc Fermat: $5^{7-2} = 5^5 = 3125$; $3125 \\bmod 7 = 3125 - 446 \\cdot 7 = 3125 - 3122 = 3$ ✓
> </details>

---

## 5. Fast Exponentiation — Square-and-Multiply

> 💡 **Trực giác**: Tính $a^k \\bmod n$ bằng cách nhân $k$ lần là $O(k)$ — quá chậm khi $k$ lớn (RSA dùng $k \\sim 2^{2048}$). Square-and-multiply khai thác biểu diễn nhị phân của $k$: thay vì nhân $k$ lần, ta chỉ cần $O(\\log k)$ bước bằng cách square (bình phương) và nhân khi bit = 1.

### 5.1 Thuật toán

Viết $k$ ở dạng nhị phân: $k = b_t b_{t-1} \\dots b_1 b_0$ (MSB trước).

\`\`\`
result = 1
base = a mod n
for bit b từ MSB đến LSB:
    result = result^2 mod n          // square
    if b == 1:
        result = result * base mod n  // multiply
return result
\`\`\`

### 5.2 Walk-through $7^{13} \\bmod 100$

$k = 13 = 1101_2$ (binary: $8+4+1 = 13$, có bits 3,2,0 = 1).

\`\`\`
base = 7 mod 100 = 7
result = 1

Bit 3 (MSB = 1):
  result = 1^2 mod 100 = 1        (square)
  result = 1 * 7 mod 100 = 7      (multiply, bit=1)

Bit 2 (= 1):
  result = 7^2 mod 100 = 49       (square)
  result = 49 * 7 mod 100 = 343 mod 100 = 43   (multiply, bit=1)

Bit 1 (= 0):
  result = 43^2 mod 100 = 1849 mod 100 = 49    (square)
  (bit=0, không multiply)

Bit 0 (LSB = 1):
  result = 49^2 mod 100 = 2401 mod 100 = 1     (square)
  result = 1 * 7 mod 100 = 7                    (multiply, bit=1)

→ 7^13 mod 100 = 7
\`\`\`

Verify: $7^1=7$, $7^2=49$, $7^4=49^2=2401 \\bmod 100=1$, $7^8=1^2=1$, $7^{13}=7^8 \\cdot 7^4 \\cdot 7^1=1 \\cdot 1 \\cdot 7=7 \\pmod{100}$ ✓

**Ví dụ 2 — $3^{19} \\bmod 7$ ($p=7$ prime, verify Fermat):**

$k = 19 = 10011_2$.

\`\`\`
base = 3
result = 1

Bit 4 (MSB=1): sq→1; mul→3
Bit 3 (=0):    sq→3^2=9 mod 7=2; no mul
Bit 2 (=0):    sq→2^2=4 mod 7=4; no mul
Bit 1 (=1):    sq→4^2=16 mod 7=2; mul→2·3=6 mod 7=6
Bit 0 (=1):    sq→6^2=36 mod 7=1; mul→1·3=3 mod 7=3

→ 3^19 mod 7 = 3
\`\`\`

Cross-check: Fermat: $3^6 \\equiv 1 \\pmod{7}$. $19 = 3 \\cdot 6 + 1$. $3^{19} = (3^6)^3 \\cdot 3^1 = 1 \\cdot 3 = 3 \\pmod{7}$ ✓

**Ví dụ 3 — RSA-style: $17^5 \\bmod 143$ ($143 = 11 \\cdot 13$):**

$k = 5 = 101_2$.

\`\`\`
base = 17
Bit 2 (=1): sq→1; mul→17
Bit 1 (=0): sq→17^2=289 mod 143=289-2·143=3; no mul
Bit 0 (=1): sq→3^2=9; mul→9·17=153 mod 143=10

→ 17^5 mod 143 = 10
\`\`\`

Verify: $17^2=289=2 \\cdot 143+3 \\to 3$; $17^4=3^2=9$; $17^5=9 \\cdot 17=153=143+10 \\to 10$ ✓

> ⚠ **Tại sao không dùng \`pow(a, k) % n\` trong code?**: Vì $a^k$ có thể cực kỳ lớn trước khi mod — với $k=2048$ bits, $a^k$ là số có hàng triệu chữ số. Square-and-multiply luôn giữ intermediate result $< n^2 \\to$ số nhỏ, overflow-safe.

> ❓ **Câu hỏi tự nhiên**:
> - *"Tại sao RSA cần $k$ lớn đến vậy?"* — Nếu $k$ nhỏ ($e$ nhỏ như $e=3$ trong RSA), có các tấn công đặc biệt. RSA tiêu chuẩn dùng $e=65537$ ($= 2^{16}+1$, có dạng nhị phân 10000000000000001 $\\to$ rất ít bit 1 $\\to$ fast exp).
> - *"Độ phức tạp $O(\\log k)$ có nghĩa gì với $k = 2^{2048}$?"* — $\\log_2(2^{2048}) = 2048$ bước. Mỗi bước là một phép nhân modular. Trên máy tính hiện đại: milliseconds.

> 📝 **Tóm tắt**:
> - Modular arithmetic: phép cộng/nhân phân phối qua mod. Số âm: thêm $n$ trước mod.
> - Euclidean: $\\gcd(a,b) = \\gcd(b, a \\bmod b)$; dừng khi $b=0$.
> - Extended Euclidean: tìm $s,t$ với $as+bt=\\gcd(a,b)$. Khi $\\gcd=1$: $a^{-1} \\equiv s \\pmod{n}$.
> - Fermat: $a^{p-1} \\equiv 1 \\pmod{p}$ với $p$ prime, $\\gcd(a,p)=1$.
> - Euler: $a^{\\varphi(n)} \\equiv 1 \\pmod{n}$; $\\varphi(pq)=(p-1)(q-1)$. Nền tảng RSA.
> - Fast exp: $O(\\log k)$ bằng square-and-multiply theo binary $k$.

---

## 6. Bài tập

**Bài 1**: Tính $\\gcd(120, 84)$ bằng Euclidean algorithm. Viết từng bước.

**Bài 2**: Tìm $11^{-1} \\bmod 26$ bằng Extended Euclidean. Verify kết quả.

**Bài 3**: Tính $\\varphi(20)$ và verify bằng cách liệt kê tất cả số coprime với 20 trong $\\{1, \\dots, 20\\}$.

**Bài 4**: Dùng fast exponentiation, tính $5^{22} \\bmod 23$ (23 là nguyên tố). Trước tiên dùng Fermat's little theorem để rút gọn, rồi xác nhận bằng square-and-multiply.

---

## 7. Lời giải chi tiết

### Bài 1 — gcd(120, 84)

$$\\begin{aligned}
\\gcd(120, 84) &: 120 = 1 \\cdot 84 + 36 \\Rightarrow \\gcd(120,84) = \\gcd(84, 36)\\\\
\\gcd(84, 36) &: 84 = 2 \\cdot 36 + 12 \\Rightarrow \\gcd(84,36) = \\gcd(36, 12)\\\\
\\gcd(36, 12) &: 36 = 3 \\cdot 12 + 0 \\Rightarrow \\gcd(36,12) = 12\\\\
&\\Rightarrow \\gcd(120, 84) = 12
\\end{aligned}$$

Verify: $120 = 12 \\cdot 10$, $84 = 12 \\cdot 7$ ✓

### Bài 2 — 11⁻¹ mod 26

Euclidean:

$$\\begin{aligned}
26 &= 2 \\cdot 11 + 4 \\Rightarrow 4 = 26 - 2 \\cdot 11\\\\
11 &= 2 \\cdot 4 + 3 \\Rightarrow 3 = 11 - 2 \\cdot 4\\\\
4 &= 1 \\cdot 3 + 1 \\Rightarrow 1 = 4 - 1 \\cdot 3\\\\
3 &= 3 \\cdot 1 + 0 \\Rightarrow \\gcd = 1
\\end{aligned}$$

Back-substitute:

$$\\begin{aligned}
1 &= 4 - 1 \\cdot 3\\\\
&= 4 - 1 \\cdot (11 - 2 \\cdot 4) = 3 \\cdot 4 - 1 \\cdot 11\\\\
&= 3 \\cdot (26 - 2 \\cdot 11) - 1 \\cdot 11 = 3 \\cdot 26 - 6 \\cdot 11 - 1 \\cdot 11\\\\
&= 3 \\cdot 26 - 7 \\cdot 11\\\\
&\\Rightarrow 11^{-1} \\equiv -7 \\equiv -7 + 26 = 19 \\pmod{26}
\\end{aligned}$$

Verify: $11 \\times 19 = 209 = 8 \\cdot 26 + 1 \\to 209 \\bmod 26 = 1$ ✓

### Bài 3 — φ(20)

$20 = 4 \\cdot 5 = 2^2 \\cdot 5$.

$$\\varphi(20) = \\varphi(4) \\cdot \\varphi(5) = (4-2)(5-1) = 2 \\cdot 4 = 8$$

Liệt kê: $\\{1,3,7,9,11,13,17,19\\}$ — 8 số, mỗi số đều coprime với 20 (không chia hết cho 2 và 5). ✓

### Bài 4 — 5^22 mod 23

23 là nguyên tố, $\\gcd(5,23)=1$. Fermat: $5^{22} \\equiv 1 \\pmod{23}$.

Trực tiếp: $22 = 23-1 \\to 5^{22} \\bmod 23 =$ **1**.

Verify bằng fast exp: $22 = 10110_2$.

\`\`\`
base = 5, result = 1
Bit 4 (=1): sq→1; mul→5
Bit 3 (=0): sq→5^2=25 mod 23=2; no mul
Bit 2 (=1): sq→2^2=4; mul→4·5=20
Bit 1 (=1): sq→20^2=400 mod 23: 400/23=17 dư 9 → 9; mul→9·5=45 mod 23=45-23=22
Bit 0 (=0): sq→22^2=484 mod 23: 484=21·23+1 → 1; no mul

→ 5^22 mod 23 = 1 ✓
\`\`\`

---

## Bài tiếp theo

[T2-L01: Block Ciphers & AES](../../02-ModernSymmetric/lesson-01-block-ciphers-aes/visualization.html) — Tầng 2 Modern Symmetric: SPN, AES-128 round function (SubBytes, ShiftRows, MixColumns, AddRoundKey). Modular arithmetic ở tầng này (đặc biệt φ(n), inverse) sẽ dùng trực tiếp trong Tầng 3 RSA.

## Tham khảo

- *Cryptography Engineering* — Ferguson, Schneier, Kohno (Appendix A: Math)
- *Serious Cryptography* — Aumasson (Chapter 9: RSA prerequisites)
- *Applied Cryptography* — Schneier (Chapter 11)
- Knuth, D.E. *The Art of Computer Programming, Vol. 2* (Section 4.5: Euclidean algorithm)
- [\`../../../Math/01-Arithmetic-Algebra/\`](../../../Math/01-Arithmetic-Algebra/) — Xem thêm về số nguyên tố và modular.
- [visualization.html](./visualization.html)
`;
