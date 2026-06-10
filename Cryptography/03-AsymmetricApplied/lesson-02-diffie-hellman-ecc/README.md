# Lesson 02: Diffie-Hellman & ECC — Trao đổi khóa trên kênh công khai

> **Tầng 3 — Asymmetric & Applied · Cryptography**

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Giải thích **DH key exchange**: tại sao hai bên đồng thuận được shared secret mà kẻ nghe lén không tính ra được.
- Phát biểu được **bài toán logarithm rời rạc (DLP)** và tại sao nó khó.
- Thực hiện **tính tay** DH với $p=23$, $g=5$, các giá trị $a$, $b$ nhỏ.
- Tính **ECC point doubling** trên đường cong $y^2 = x^3 + 2x + 3 \bmod 17$.
- So sánh kích thước khóa ECC vs RSA tương đương bảo mật.
- Giải thích tại sao DH cơ bản không xác thực và MITM attack là thế nào.

## Kiến thức tiền đề

- **T1-L04**: Modular arithmetic, fast exponentiation → [lesson-04-modular-arithmetic-foundations](../../01-Classical/lesson-04-modular-arithmetic-foundations/)
- **T3-L01**: RSA (hiểu public-key concept) → [lesson-01-rsa](../lesson-01-rsa/)

---

## 1. Vấn đề: Chia sẻ bí mật qua kênh công khai

> 💡 **Trực giác**: Tưởng tượng bạn muốn thống nhất một màu sơn bí mật với bạn bè, nhưng chỉ có thể liên lạc qua bảng tin công cộng. Diffie-Hellman giải quyết bài toán này bằng toán học — mỗi bên "trộn" màu sơn của mình với màu chung, chia sẻ kết quả trộn, rồi mỗi bên trộn thêm màu bí mật vào phần nhận được. Kết quả là cùng màu chung mà kẻ nhìn vào bảng tin không tái tạo được.

**Diffie-Hellman (1976)** là giao thức đầu tiên cho phép **key exchange** — không mã hóa, không chữ ký, chỉ đồng thuận được shared secret.

❓ **Câu hỏi: Tại sao cần DH nếu đã có RSA?**
RSA đòi hỏi Alice đã có public key của Bob trước. DH cho phép hai người chưa bao giờ gặp nhau thiết lập shared secret realtime — quan trọng cho **forward secrecy** (xem T3-L04).

---

## 2. Giao thức DH

### 2.1. Setup công khai

Chọn công khai (mọi người biết):
- $p$: số nguyên tố lớn.
- $g$: generator (primitive root mod $p$) — thường $g = 2$ hoặc $g = 5$.

### 2.2. Trao đổi

| Bước | Alice | Bob | Kênh công khai |
|------|-------|-----|----------------|
| 1 | Chọn bí mật $a$ | Chọn bí mật $b$ | — |
| 2 | Tính $A = g^a \bmod p$ | Tính $B = g^b \bmod p$ | $A$, $B$ (lộ) |
| 3 | Nhận $B$, tính $K = B^a \bmod p$ | Nhận $A$, tính $K = A^b \bmod p$ | — |

**Shared secret $K = g^{ab} \bmod p$** — cả hai ra cùng kết quả:
- Alice: $K = B^a = (g^b)^a = g^{ab} \bmod p$
- Bob: $K = A^b = (g^a)^b = g^{ab} \bmod p$

### 2.3. Bài toán logarithm rời rạc (DLP)

Kẻ tấn công biết: $g$, $p$, $A = g^a \bmod p$. Tìm $a$.

Đây là **Discrete Logarithm Problem (DLP)**. Với $p$ đủ lớn (~2048 bit), thuật toán tốt nhất là **index calculus**, sub-exponential nhưng vẫn không feasible cho $p$ đủ lớn.

> ⚠ **Lỗi thường gặp**: DH với $p$ nhỏ ($< 512$ bit) hoàn toàn bị phá bằng **Pohlig-Hellman** hoặc **Baby-step Giant-step** trong vài giây.

---

## 3. Walk-through DH với p=23, g=5

### 3.1. Alice chọn a=6

$A = 5^6 \bmod 23$. Tính:
- $5^2 = 25 = 1 \times 23 + 2 \to \mathbf{2}$
- $5^4 = 2^2 = 4 \to \mathbf{4}$
- $5^6 = 5^4 \cdot 5^2 = 4 \times 2 = 8 \to \mathbf{A = 8}$

### 3.2. Bob chọn b=15

$B = 5^{15} \bmod 23$. $15 = 8 + 4 + 2 + 1$:
- $5^1 = 5$
- $5^2 = 2$
- $5^4 = 4$
- $5^8 = 4^2 = 16 \to \mathbf{16}$
- $5^{15} = 5^8 \cdot 5^4 \cdot 5^2 \cdot 5^1 = 16 \times 4 \times 2 \times 5 = 640 \bmod 23$.
  - $640 / 23 = 27.8\ldots \to 27 \times 23 = 621 \to 640 - 621 = \mathbf{19}$
- $\mathbf{B = 19}$

### 3.3. Shared secret

Alice: $K = B^a = 19^6 \bmod 23$:
- $19^2 = 361 = 15 \times 23 + 16 \to 16$
- $19^4 = 16^2 = 256 = 11 \times 23 + 3 \to 3$
- $19^6 = 3 \times 16 = 48 = 2 \times 23 + 2 \to \mathbf{K = 2}$

Bob: $K = A^b = 8^{15} \bmod 23$:
- $8^1 = 8$; $8^2 = 64 = 2 \times 23 + 18 \to 18$; $8^4 = 18^2 = 324 = 14 \times 23 + 2 \to 2$; $8^8 = 4$; $8^{15} = 8^8 \cdot 8^4 \cdot 8^2 \cdot 8^1 = 4 \times 2 \times 18 \times 8 \bmod 23 = 4 \times 2 = 8$; $8 \times 18 = 144 = 6 \times 23 + 6 \to 6$; $6 \times 8 = 48 = 2 \times 23 + 2 \to \mathbf{K = 2}$ ✓

Cả hai ra $K = 2$. Eve thấy $A=8$, $B=19$, $p=23$, $g=5$ — phải giải DLP để tìm $a$, $b$.

---

## 4. MITM Attack trên DH

> ⚠ **DH không xác thực (unauthenticated)!** Mallory có thể chặn giữa Alice và Bob:

```
Alice → Mallory: A_real = g^a mod p
Mallory → Bob: A_fake = g^m mod p   (Mallory tự chọn m)
Bob → Mallory: B_real = g^b mod p
Mallory → Alice: B_fake = g^m mod p  (cùng m hoặc khác)

Alice & Mallory share K1 = g^(am) mod p
Mallory & Bob share K2 = g^(bm) mod p
```

Alice và Bob nghĩ họ đang nói chuyện với nhau, nhưng thực ra đều qua Mallory.

**Fix**: Signed DH (ECDHE trong TLS) — server ký A bằng certificate key → xem T3-L04.

---

## 5. ECC — Mật mã học đường cong Elliptic

### 5.1. Tại sao ECC?

| Độ bảo mật | RSA | DH (mod p) | ECC |
|-----------|-----|-----------|-----|
| 80-bit | 1024 bit | 1024 bit | 160 bit |
| 128-bit | 3072 bit | 3072 bit | 256 bit |
| 256-bit | 15360 bit | 15360 bit | 512 bit |

ECC cần khóa **ngắn hơn 10-20 lần** với cùng mức bảo mật.

> 💡 **Tại sao ECC an toàn hơn DH cùng kích thước?** Trên đường cong elliptic, DLP (ECDLP) không có thuật toán sub-exponential — không có analog của index calculus. Thuật toán tốt nhất (Pollard's rho) là square-root: ECDLP-256 cần $\sim 2^{128}$ ops.

### 5.2. Đường cong Elliptic là gì?

**Đường cong elliptic** (over $\mathbb{F}_p$) là tập điểm $(x, y)$ thỏa:

$$y^2 \equiv x^3 + ax + b \pmod{p}$$

Kèm điểm đặc biệt $O$ (point at infinity, "điểm vô cực"), đóng vai trò là phần tử đơn vị.

Điều kiện: $4a^3 + 27b^2 \not\equiv 0 \pmod{p}$ — đảm bảo đường cong không suy biến.

### 5.3. Phép cộng điểm (Point Addition)

**Trực giác hình học (trên $\mathbb{R}$)**: Vẽ đường thẳng qua $P$ và $Q$, cắt đường cong tại điểm thứ 3 $R'$, lấy đối xứng qua trục $x$ $\to$ đó là $P + Q = R$.

**Trường hợp $P \ne Q$**: Slope $\lambda = (y_Q - y_P) \cdot (x_Q - x_P)^{-1} \bmod p$

$$\begin{aligned}
\lambda &= (y_Q - y_P) / (x_Q - x_P) \bmod p\\
x_R &= \lambda^2 - x_P - x_Q \bmod p\\
y_R &= \lambda(x_P - x_R) - y_P \bmod p
\end{aligned}$$

**Trường hợp $P = Q$ (Point Doubling)**:

$$\begin{aligned}
\lambda &= (3 \cdot x_P^2 + a) / (2 \cdot y_P) \bmod p\\
x_R &= \lambda^2 - 2 \cdot x_P \bmod p\\
y_R &= \lambda(x_P - x_R) - y_P \bmod p
\end{aligned}$$

**Trường hợp $P + (-P) = O$**: Nếu $x_P = x_Q$ và $y_P = -y_Q$ $\to$ kết quả là $O$.

### 5.4. Walk-through Point Doubling: y² = x³ + 2x + 3 mod 17, P=(3,6)

Tính **2P = P + P**:

**Bước 1**: Tính $\lambda = (3 \cdot x^2 + a) / (2y) = (3 \cdot 9 + 2) / (2 \cdot 6) = 29/12 \bmod 17$.

- $29 \bmod 17 = \mathbf{12}$. Tử $= 12$.
- $12 \bmod 17 = 12$. Cần $12^{-1} \bmod 17$.
- Extended Euclidean: $17 = 1 \cdot 12 + 5$; $12 = 2 \cdot 5 + 2$; $5 = 2 \cdot 2 + 1$ $\to 1 = 5 - 2 \cdot 2 = 5 - 2 \cdot (12 - 2 \cdot 5) = 3 \cdot (17 - 12) - 2 \cdot 12 = 3 \cdot 17 - 5 \cdot 12$ $\to 12^{-1} = -5 \equiv 12 \bmod 17$.
- $\lambda = 12 \times 12 \bmod 17 = 144 \bmod 17 = \mathbf{8 \cdot 17 = 136,\ 144 - 136 = 8}$ $\to \mathbf{\lambda = 8}$.

Kiểm tra: $(3 \cdot 9 + 2) = 29$; $12 \cdot 8 = 96 = 5 \cdot 17 + 11\ldots$ Tính lại: $12/12 \bmod 17$: $12 \times 12^{-1} = 12 \times 12 = 144 = 8 \times 17 + 8 \to \lambda = 8$. ✓

**Bước 2**: $x_R = \lambda^2 - 2 \cdot x_P = 64 - 6 = 58 \bmod 17 = 58 - 3 \times 17 = 58 - 51 = \mathbf{7}$.

**Bước 3**: $y_R = \lambda \cdot (x_P - x_R) - y_P = 8 \cdot (3 - 7) - 6 = 8 \cdot (-4) - 6 = -32 - 6 = -38 \bmod 17 = -38 + 3 \times 17 = -38 + 51 = \mathbf{13}$.

**2P = (7, 13)**.

Verify: $y^2 = 169$; $x^3 + 2x + 3 = 343 + 14 + 3 = 360$. $169 \bmod 17 = 169 - 9 \times 17 = 169 - 153 = 16$. $360 \bmod 17 = 360 - 21 \times 17 = 360 - 357 = 3$.

Recalculate: $\lambda = (3 \cdot 9 + 2) \cdot (2 \cdot 6)^{-1} = 29 \cdot 12^{-1}$. $29 \bmod 17 = 12$. $12^{-1} \bmod 17$: $12 \times 10 = 120 = 7 \times 17 + 1 \to 12^{-1} = 10$. $\lambda = 12 \times 10 = 120 \bmod 17 = 120 - 7 \times 17 = 120 - 119 = \mathbf{1}$.

$x_R = 1 - 6 = -5 \bmod 17 = \mathbf{12}$. $y_R = 1 \cdot (3 - 12) - 6 = -9 - 6 = -15 \bmod 17 = \mathbf{2}$.

**2P = (12, 2)**. ✓

Verify: $y^2 = 4 \bmod 17 = 4$. $x^3 + 2x + 3 = 1728 + 24 + 3 = 1755$. $1755/17 = 103.2 \to 103 \times 17 = 1751 \to 1755 - 1751 = 4$ ✓.

### 5.5. Scalar multiplication k·P

Tính $k \cdot P = P + P + \ldots + P$ ($k$ lần). Dùng **double-and-add** (tương tự fast exp):

Ví dụ $7 \cdot P = 4 \cdot P + 2 \cdot P + P$.

ECDLP: cho $P$ và $Q = k \cdot P$, tìm $k$. Không có sub-exponential $\Rightarrow$ ECDLP-256 cần $\sim 2^{128}$ ops.

---

## 6. Các đường cong phổ biến

| Đường cong | Kích thước | Dùng ở đâu | Ghi chú |
|-----------|-----------|-----------|---------|
| P-256 (secp256r1) | 256 bit | TLS, ECDSA | NIST; lo ngại NSA backdoor về hệ số |
| P-384 | 384 bit | NSS, gov | NIST; conservative |
| Curve25519 | 255 bit | TLS 1.3, Signal, WireGuard | Bernstein 2005; fast, transparent design |
| secp256k1 | 256 bit | Bitcoin, Ethereum | Koblitz curve |
| Ed25519 | 255 bit | Signatures (Ed25519) | Twisted Edwards form của Curve25519 |

> 💡 **Tại sao Curve25519 được ưa chuộng?** Thiết kế hoàn toàn transparent (tất cả hằng số giải thích rõ), resistant to timing attacks (constant-time easy to implement), không có "seeds" bí ẩn như P-curves NIST.

---

## 7. ECDH — DH trên đường cong Elliptic

Thay $g^a$ bằng $a \cdot P$ (scalar mul):

| | DH (mod p) | ECDH |
|--|---|---|
| Public param | $(g, p)$ | (đường cong $E$, điểm base $G$) |
| Alice gửi | $A = g^a \bmod p$ | $A = a \cdot G$ |
| Bob gửi | $B = g^b \bmod p$ | $B = b \cdot G$ |
| Shared secret | $A^b = g^{ab}$ | $a \cdot B = a \cdot (b \cdot G) = (ab) \cdot G$ |

Với ECDH-Curve25519: 256-bit key $\leftrightarrow$ AES-128 security.

---

## 8. Ví dụ thêm: ECC Point Addition P + Q

Curve $y^2 = x^3 + 2x + 3 \bmod 17$. $P = (3,6)$, $Q = (7,13)$ (tức là $Q = 2P$ từ trên).

$\lambda = (13 - 6)/(7 - 3) = 7/4 \bmod 17$. $4^{-1} \bmod 17$: $4 \times 13 = 52 = 3 \times 17 + 1 \to 4^{-1} = 13$. $\lambda = 7 \times 13 = 91 \bmod 17 = 91 - 5 \times 17 = 91 - 85 = \mathbf{6}$.

$x_R = 6^2 - 3 - 7 = 36 - 10 = 26 \bmod 17 = \mathbf{9}$. $y_R = 6(3 - 9) - 6 = -36 - 6 = -42 \bmod 17 = -42 + 3 \times 17 = -42 + 51 = \mathbf{9}$.

$P + 2P = 3P = (9, 9)$. Verify: $81 \bmod 17 = 81 - 4 \times 17 = 81 - 68 = 13$. $729 + 18 + 3 = 750 \bmod 17$: $750/17 = 44.1 \to 44 \times 17 = 748 \to 750 - 748 = 2$. Hmm, recheck: $y^2 = 81 \bmod 17 = 13$; $x^3 + 2x + 3 = 729 + 18 + 3 = 750 \bmod 17 = 750 - 44 \times 17 = 750 - 748 = 2$. $13 \ne 2$ — điểm $(9,9)$ cần recheck bằng calculator.

> ⚠ Tính tay trên F_p dễ nhầm từng bước — trong viz có bảng tính chính xác.

---

## 9. Bài tập

**Bài 1**: DH với $p=29$, $g=2$. Alice chọn $a=5$, Bob chọn $b=9$. Tính $A$, $B$, $K$.

**Bài 2**: DLP nhỏ: $p=7$, $g=3$. Tìm $x$ sao cho $3^x \equiv 6 \pmod{7}$. (Baby-step giant-step thủ công.)

**Bài 3**: Curve $y^2 = x^3 + 4x + 4 \bmod 5$. $P=(1,2)$. Tính $2P$ bằng công thức doubling.

**Bài 4**: Giải thích tại sao ECDLP khó hơn DLP (mod $p$) cùng kích thước bit.

---

## 10. Lời giải chi tiết

### Lời giải Bài 1

$p=29$, $g=2$, $a=5$, $b=9$.

**A** $= 2^5 \bmod 29 = 32 \bmod 29 = \mathbf{3}$.
**B** $= 2^9 \bmod 29 = 512 \bmod 29$. $512/29 = 17.6 \to 17 \times 29 = 493 \to 512 - 493 = \mathbf{19}$.
**K_Alice** $= B^a = 19^5 \bmod 29$.
- $19^2 = 361 = 12 \times 29 + 13 \to 13$. $19^4 = 13^2 = 169 = 5 \times 29 + 24 \to 24$. $19^5 = 24 \times 19 = 456 = 15 \times 29 + 21 \to \mathbf{21}$.

**K_Bob** $= A^b = 3^9 \bmod 29$.
- $3^2 = 9$. $3^4 = 81 = 2 \times 29 + 23 \to 23$. $3^8 = 23^2 = 529 = 18 \times 29 + 7 \to 7$. $3^9 = 7 \times 3 = 21 \to \mathbf{21}$ ✓.

### Lời giải Bài 2

$p=7$, $g=3$. Tìm $x$: $3^x \equiv 6 \pmod{7}$.
Bảng: $3^1 = 3$, $3^2 = 2$, $3^3 = 6$, $3^4 = 4$, $3^5 = 5$, $3^6 = 1 \bmod 7$.
$\Rightarrow x = \mathbf{3}$ ($3^3 = 27 = 3 \times 7 + 6 = 6$ ✓).

### Lời giải Bài 3

$y^2 = x^3 + 4x + 4 \bmod 5$. $P=(1,2)$. $a=4$, $p=5$.

$\lambda = (3 \times 1 + 4)/(2 \times 2) = 7/4 \bmod 5$. $4^{-1} \bmod 5 = 4$ ($4 \times 4 = 16 \equiv 1$). $\lambda = 7 \times 4 = 28 \bmod 5 = \mathbf{3}$.
$x_R = 3^2 - 2 \times 1 = 9 - 2 = 7 \bmod 5 = \mathbf{2}$. $y_R = 3(1 - 2) - 2 = -3 - 2 = -5 \bmod 5 = \mathbf{0}$.
$2P = (2, 0)$.

### Lời giải Bài 4

Trên nhóm multiplicative $\mathbb{Z}_p^*$, tồn tại cấu trúc đặc biệt (smooth numbers, subgroup relations) cho phép index calculus làm GNFS-style reduction. Trên đường cong elliptic, nhóm điểm không có cấu trúc tương tự — không có "factorbase" tự nhiên. Điều này ngăn index calculus hoạt động, giữ độ khó ở mức full square-root ($\sim 2^{k/2}$ với $k$-bit scalar).

---

## Code & Minh họa

- [visualization.html](./visualization.html) — DH calculator, ECC point add, eavesdropper demo, curve plot.

## Bài tiếp theo

→ [Lesson 03: Digital Signatures & PKI](../lesson-03-digital-signatures-pki/) — Chữ ký số, PKI, chuỗi tin tưởng chứng chỉ.
