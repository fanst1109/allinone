# Lesson 01: RSA — Mã hóa khóa công khai đầu tiên

> **Tầng 3 — Asymmetric & Applied · Cryptography**

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Thực hiện **RSA keygen** bằng tay với $p=11$, $q=13$ — tính được $n$, $\varphi$, $d$ từ đầu.
- Mã hóa và giải mã theo công thức $c = m^e \bmod n$, $m = c^d \bmod n$.
- Hiểu **tại sao RSA đúng** thông qua định lý Euler: $m^{\varphi(n)} \equiv 1 \pmod{n}$.
- Giải thích tại sao **textbook RSA không an toàn** và OAEP/PKCS#1 v1.5 sửa gì.
- Nhận dạng 3 attack phổ biến: small exponent, common modulus, Wiener's.

## Kiến thức tiền đề

- **T1-L04**: Modular arithmetic, gcd, Extended Euclidean, Fermat little theorem, fast exponentiation → [lesson-04-modular-arithmetic-foundations](../../01-Classical/lesson-04-modular-arithmetic-foundations/)
- **T2-L03**: Hash functions (cần cho OAEP) → [lesson-03-hash-functions](../../02-ModernSymmetric/lesson-03-hash-functions/)

---

## 1. Ý tưởng căn bản: bẫy một chiều

> 💡 **Trực giác**: Nhân hai số nguyên tố lại rất dễ — $11 \times 13 = 143$ tính trong 1 giây. Ngược lại, cho 143, tìm lại hai thừa số nguyên tố mất bao lâu? Với số 2048-bit, thuật toán tốt nhất đã biết cần $\sim 2^{90}$ phép toán. RSA xây toàn bộ sức mạnh lên sự bất đối xứng này.

**Hệ mã hóa khóa công khai (public-key cryptosystem)** gồm:
- **Khóa công khai $(e, n)$**: chia sẻ tự do. Ai cũng có thể mã hóa bằng khóa này.
- **Khóa bí mật $(d)$**: giữ kín. Chỉ chủ nhân mới giải mã được.

❓ **Câu hỏi tự nhiên: Tại sao tôi không thể tìm $d$ từ $(e, n)$?**
Vì $d = e^{-1} \bmod \varphi(n)$, mà $\varphi(n) = (p-1)(q-1)$ — muốn tính $\varphi(n)$ phải biết $p$, $q$. Biết $p$, $q$ thì phải phân tích thừa số $n = p \cdot q$, và đó chính là bài toán khó.

---

## 2. RSA Keygen — 5 bước

### Bước 1: Chọn hai số nguyên tố p, q

Trong production: p, q ~ 1024 bit mỗi số. Trong bài này dùng số nhỏ để tính tay.

### Bước 2: Tính n và φ(n)

$$\begin{aligned}
n &= p \times q\\
\varphi(n) &= (p - 1) \times (q - 1)
\end{aligned}$$

$\varphi(n)$ là **hàm Euler totient** — đếm số nguyên trong $[1, n-1]$ coprime với $n$.

> 💡 **Tại sao $\varphi(n) = (p-1)(q-1)$?** Vì $p$, $q$ là nguyên tố, những số không coprime với $n = p \cdot q$ chính là các bội của $p$ hoặc $q$ trong $[1, n-1]$. Có $(q-1)$ bội của $p$ và $(p-1)$ bội của $q$ → tổng số coprime $= n - 1 - (p-1) - (q-1) = pq - p - q + 1 = (p-1)(q-1)$.

### Bước 3: Chọn e (public exponent)

Chọn $e$ sao cho $1 < e < \varphi(n)$ và $\gcd(e, \varphi(n)) = 1$.

Giá trị phổ biến nhất trong thực tế: $e = 65537 = 2^{16} + 1$.

> 💡 **Tại sao $e = 65537$ được ưa chuộng?** Nhị phân: 10000000000000001 — chỉ có 2 bit 1. Fast exponentiation chỉ cần 17 lần bình phương và 1 lần nhân (thay vì trung bình ~1500 phép nhân nếu $e$ ngẫu nhiên). Đủ lớn để tránh small exponent attack.

### Bước 4: Tính d (private exponent)

$$d = e^{-1} \bmod \varphi(n)$$

Dùng **Extended Euclidean Algorithm** để tìm $d$.

### Bước 5: Kết quả

- **Public key**: $(n, e)$
- **Private key**: $d$ (hoặc tuple $(p, q, d)$ cho Chinese Remainder Theorem speedup)

---

## 3. Mã hóa và Giải mã

$$\begin{aligned}
\text{Encrypt:} \quad & c = m^e \bmod n\\
\text{Decrypt:} \quad & m = c^d \bmod n
\end{aligned}$$

Yêu cầu: $0 \le m < n$.

---

## 4. Walk-through THẬT với p=11, q=13

### 4.1. Keygen

**Bước 1**: $p = 11$, $q = 13$.

**Bước 2**: 
- $n = 11 \times 13 = \mathbf{143}$
- $\varphi(n) = (11-1) \times (13-1) = 10 \times 12 = \mathbf{120}$

**Bước 3**: Chọn $e = 7$.
- $\gcd(7, 120) = ?$ Dùng Euclidean:
  - $120 = 17 \times 7 + \mathbf{1}$ → $\gcd = 1$ ✓

**Bước 4**: Tính $d = 7^{-1} \bmod 120$ bằng Extended Euclidean:

| Bước | Phép chia | Quotient | Remainder | x | y |
|------|-----------|----------|-----------|---|---|
| 0    | 120 = ? × 7 | — | — | 1 | 0 |
| 1    | 120 = 17×7 + 1 | 17 | 1 | 0 | 1 |

Từ dòng cuối: $1 = 120 - 17 \times 7$ → $7 \times (-17) \equiv 1 \pmod{120}$.

$-17 \bmod 120 = 120 - 17 = \mathbf{103}$.

Vậy $\mathbf{d = 103}$. Kiểm tra: $7 \times 103 = 721 = 6 \times 120 + 1$ ✓.

**Kết quả**: Public key $= \mathbf{(143, 7)}$, Private key $= \mathbf{103}$.

### 4.2. Mã hóa m = 9

Tính $\mathbf{c = 9^7 \bmod 143}$ bằng fast exponentiation:

| Bước | Tính | Kết quả mod 143 |
|------|------|-----------------|
| 9¹ | 9 | **9** |
| 9² | 9 × 9 = 81 | **81** |
| 9⁴ | 81 × 81 = 6561 | 6561 = 45×143 + 126 → **126** |
| 9⁷ = 9⁴ × 9² × 9¹ | 126 × 81 = 10206 → 10206 = 71×143 + 53 → 53; 53 × 9 = 477 = 3×143 + 48 | **48** |

$\mathbf{c = 48}$.

### 4.3. Giải mã c = 48

Tính $\mathbf{m = 48^{103} \bmod 143}$.

$103 = 64 + 32 + 4 + 2 + 1$ (nhị phân: 1100111).

| Bước | Tính | Kết quả mod 143 |
|------|------|-----------------|
| 48¹ | 48 | **48** |
| 48² | 48² = 2304 = 16×143 + 16 | **16** |
| 48⁴ | 16² = 256 = 1×143 + 113 | **113** |
| 48⁸ | 113² = 12769 = 89×143 + 42 | **42** |
| 48¹⁶ | 42² = 1764 = 12×143 + 48 | **48** |
| 48³² | 48² = 2304 = 16×143 + 16 | **16** |
| 48⁶⁴ | 16² = 256 = 1×143 + 113 | **113** |
| 48¹⁰³ = 48⁶⁴×48³²×48⁴×48²×48¹ | 113×16 = 1808 = 12×143 + 92 → 92; 92×113 = 10396 = 72×143 + 100 → 100; 100×16 = 1600 = 11×143 + 27 → 27; 27×48 = 1296 = 9×143 + 9 → **9** |

$\mathbf{m = 9}$ ✓ — khớp với bản rõ ban đầu.

### 4.4. Verify bằng định lý Euler

Định lý Euler: $m^{\varphi(n)} \equiv 1 \pmod{n}$ khi $\gcd(m, n) = 1$.

Với $n = 143$, $\varphi(n) = 120$: $\mathbf{9^{120} \bmod 143 = 1}$.

Vì $e \times d = 7 \times 103 = 721 = 6 \times 120 + 1 \equiv \mathbf{1} \pmod{120}$:

$$c^d = (m^e)^d = m^{e \cdot d} = m^{1 + k \cdot \varphi(n)} = m \cdot (m^{\varphi(n)})^k = m \cdot 1^k = m \pmod{n}$$

RSA đúng đương nhiên từ định lý Euler. ✓

---

## 5. Ví dụ 2: p=61, q=53 (classic textbook)

- $n = 61 \times 53 = \mathbf{3233}$
- $\varphi(n) = 60 \times 52 = \mathbf{3120}$
- $e = 17$ ($\gcd(17, 3120) = 1$ ✓)
- $d = 17^{-1} \bmod 3120 = \mathbf{2753}$ (vì $17 \times 2753 = 46801 = 15 \times 3120 + 1$ ✓)
- Encrypt $m = 65$: $c = 65^{17} \bmod 3233 = \mathbf{2790}$
- Decrypt: $2790^{2753} \bmod 3233 = \mathbf{65}$ ✓

---

## 6. Security của RSA

### 6.1. Độ khó

| Kích thước key | Trạng thái | Ghi chú |
|---------------|------------|---------|
| RSA-512 | Phá được (1999) | < 1 tuần CPU hiện đại |
| RSA-768 | Phá được (2009) | 2 năm CPU |
| RSA-1024 | DEPRECATED | NIST khuyến cáo từ bỏ trước 2030 |
| RSA-2048 | AN TOÀN (~2030s) | $\sim 2^{90}$ ops với thuật toán tốt nhất |
| RSA-3072 | AN TOÀN (~2040s) | NIST khuyến nghị mới |
| RSA-4096 | Conservative | Chậm hơn, không cần thiết thường |

> ⚠ **Lỗi thường gặp**: nghĩ rằng RSA-1024 "vẫn ổn vì chưa ai phá". Thực tế: chi phí phá RSA-1024 năm 2024 ước tính ~$50K–$1M với cloud infrastructure. Không dùng.

### 6.2. Điều gì thực sự bảo vệ RSA?

RSA an toàn **giả sử** bài toán **Integer Factorization** khó. Không ai chứng minh được điều này — đó chỉ là giả thuyết. Thuật toán tốt nhất hiện tại là **General Number Field Sieve (GNFS)**, độ phức tạp sub-exponential:

$$\exp\left( (64/9)^{1/3} \cdot (\log n)^{1/3} \cdot (\log \log n)^{2/3} \right)$$

---

## 7. Padding: Từ Textbook RSA đến OAEP

### 7.1. Tại sao textbook RSA không an toàn?

**Textbook RSA** = dùng thẳng $c = m^e \bmod n$, không padding. Có 3 vấn đề:

1. **Deterministic**: cùng $m$ luôn cho cùng $c$ → attacker biết Alice gửi "YES" hay "NO".
2. **Malleable**: nếu biết $c = m^e$, attacker có thể tạo $c' = (2^e \cdot c) \bmod n$, và server sẽ decrypt ra $m' = 2m$. Điều này cho phép nhiều kiểu tấn công.
3. **Small message**: nếu $m < n^{1/e}$, thì $m^e < n$, và $c = m^e$ (không mod) → $m = \sqrt[e]{c}$ đơn giản.

### 7.2. PKCS#1 v1.5

Padding scheme được dùng phổ biến từ 1993. Format:

```
0x00 0x02 [random bytes ≠ 0x00, ít nhất 8 byte] 0x00 [message]
```

> ⚠ **BỊ PHÁT HIỆN LỖI**: Bleichenbacher 1998 chứng minh adaptive chosen-ciphertext attack có thể khôi phục plaintext sau ~1 triệu oracle queries. Gọi là "PKCS#1 padding oracle attack". Vẫn còn rủi ro trong TLS cũ.

### 7.3. OAEP (Optimal Asymmetric Encryption Padding)

Được chuẩn hóa trong PKCS#1 v2.0 (1998), cùng tác giả. OAEP dùng random mask + hash để:
- Randomize ciphertext (non-deterministic).
- Chứng minh secure dưới RSA assumption (trong random oracle model).

**Dùng OAEP trong production, không bao giờ dùng textbook RSA.**

---

## 8. Ba Attack cổ điển trên RSA

### 8.1. Small Exponent Attack

**Điều kiện**: $e = 3$, message $m$ nhỏ ($m < n^{1/3}$).

**Khai thác**: $c = m^3 \bmod n$. Nếu $m^3 < n$ thì không có mod, $c = m^3$ thật sự. $\Rightarrow m = \sqrt[3]{c}$.

**Ví dụ số**: $e = 3$, $m = 42$, $n = 1{,}234{,}567$.
- $c = 42^3 = 74{,}088$.
- $74{,}088 < 1{,}234{,}567 \Rightarrow c = m^3$ chính xác.
- $m = \sqrt[3]{74088} = 42$ ✓.

**Mở rộng** (Hastad's broadcast attack): Nếu cùng $m$ gửi đến 3 người với 3 modulus khác nhau, $e = 3$, dùng Chinese Remainder Theorem để khôi phục $m^3$ và lấy căn.

**Fix**: Dùng OAEP padding, không để $m$ nhỏ so với $n^{1/e}$.

### 8.2. Common Modulus Attack

**Điều kiện**: Alice dùng cùng $n$ với 2 exponent khác nhau $e_1$, $e_2$, và $\gcd(e_1, e_2) = 1$.

**Khai thác**: Attacker có $c_1 = m^{e_1} \bmod n$ và $c_2 = m^{e_2} \bmod n$.
- Tìm $a$, $b$ sao cho $a \cdot e_1 + b \cdot e_2 = 1$ (Extended Euclidean).
- $m = c_1^a \cdot c_2^b \bmod n$.

**Ví dụ**: $e_1 = 3$, $e_2 = 5$, $\gcd = 1$. $a = 2$, $b = -1$ (vì $2 \cdot 3 - 1 \cdot 5 = 1$).
- $m = c_1^2 \cdot c_2^{-1} \bmod n$.

**Fix**: KHÔNG chia sẻ modulus $n$ giữa nhiều key pair.

### 8.3. Wiener's Attack

**Điều kiện**: $d$ nhỏ, cụ thể $d < n^{1/4} / 3$.

**Khai thác**: $e/n \approx k/(d \cdot \varphi(n))$ với $k$ nhỏ $\Rightarrow$ dùng continued fraction expansion của $e/n$ để tìm $d$.

> ⚠ **Lỗi thường gặp**: dùng d nhỏ để "tăng tốc độ decrypt". Đây là lỗi nghiêm trọng. Nếu muốn decrypt nhanh, dùng Chinese Remainder Theorem (tốc độ ×4) thay vì giảm d.

---

## 9. RSA trong thực tế

| Thuật toán | Dùng cho | Ghi chú |
|-----------|---------|---------|
| RSA-OAEP | Mã hóa (KEM) | Chuẩn hiện đại |
| RSA-PSS | Chữ ký số | Probabilistic, provably secure |
| RSA-PKCS1v1.5 | Legacy | Tránh dùng mới |
| RSA-CRT | Tối ưu decrypt | 4x faster, same security |

> ❓ **Câu hỏi: RSA có dùng mã hóa file lớn không?**
> Không. RSA quá chậm cho dữ liệu lớn. Trong thực tế, RSA chỉ mã hóa **session key** (128–256 bit). Session key đó dùng để mã hóa file thực sự bằng AES. Đây gọi là **hybrid encryption**.

---

## 10. Bài tập

**Bài 1**: Keygen với $p = 7$, $q = 11$.
(a) Tính $n$, $\varphi(n)$.
(b) Chọn $e = 13$. Kiểm tra $\gcd(13, \varphi(n))$.
(c) Tính $d$ bằng Extended Euclidean.
(d) Mã hóa $m = 8$. Giải mã lại.

**Bài 2**: Wiener setup: Cho $n = 90581$, $e = 17993$. Biết $d < n^{1/4}/3 \approx 5.4$. Thử $d \in \{1, 2, 3, 4, 5\}$ — $d$ nào thỏa $e \cdot d \equiv 1 \pmod{\varphi(n)}$ với $\varphi(n)$ nào đó?

**Bài 3**: Small exponent: $e = 3$, $n = 999983$ (nguyên tố), $m = 99$. Tính $c$. Sau đó recover $m$ từ $c$ biết $m < n^{1/3}$.

**Bài 4**: Chứng minh: nếu $e \cdot d \equiv 1 \pmod{\varphi(n)}$ và $\gcd(m, n) = 1$, thì $(m^e)^d \equiv m \pmod{n}$.

---

## 11. Lời giải chi tiết

### Lời giải Bài 1

**(a)** $n = 7 \times 11 = \mathbf{77}$. $\varphi(n) = 6 \times 10 = \mathbf{60}$.

**(b)** $\gcd(13, 60)$:
- $60 = 4 \times 13 + 8$
- $13 = 1 \times 8 + 5$
- $8 = 1 \times 5 + 3$
- $5 = 1 \times 3 + 2$
- $3 = 1 \times 2 + 1$
- $\gcd = \mathbf{1}$ ✓

**(c)** Extended Euclidean $13^{-1} \bmod 60$:
Từ truy ngược:
$$\begin{aligned}
1 &= 3 - 1 \cdot 2 = 3 - 1 \cdot (5 - 3) = 2 \cdot 3 - 5 = 2 \cdot (8 - 5) - 5\\
&= 2 \cdot 8 - 3 \cdot 5 = 2 \cdot 8 - 3 \cdot (13 - 8) = 5 \cdot 8 - 3 \cdot 13\\
&= 5 \cdot (60 - 4 \cdot 13) - 3 \cdot 13 = 5 \cdot 60 - 23 \cdot 13
\end{aligned}$$
$\Rightarrow d = \mathbf{-23 \bmod 60 = 37}$. Kiểm tra: $13 \times 37 = 481 = 8 \times 60 + 1$ ✓.

**(d)** Encrypt $m = 8$: $c = 8^{13} \bmod 77$.
- $8^2 = 64$. $8^4 = 64^2 = 4096 = 53 \times 77 + 15 \to 15$.
- $8^8 = 15^2 = 225 = 2 \times 77 + 71 \to 71$.
- $8^{12} = 8^8 \cdot 8^4 = 71 \times 15 = 1065 = 13 \times 77 + 64 \to 64$.
- $8^{13} = 8^{12} \cdot 8^1 = 64 \times 8 = 512 = 6 \times 77 + 50 \to \mathbf{c = 50}$.

Decrypt: $m = 50^{37} \bmod 77 = \mathbf{8}$ ✓ (dùng fast exp tương tự).

### Lời giải Bài 3

$c = 99^3 = 970299$. $970299 < 999983$? Không — $970299 < 999983$ ✓.
$\Rightarrow c = 970299$ (không mod vì $< n$).
Recover: $m = \sqrt[3]{970299} = \mathbf{99}$ ✓.

### Lời giải Bài 4

Vì $e \cdot d = 1 + k \cdot \varphi(n)$ với $k$ nào đó:

$$(m^e)^d = m^{e \cdot d} = m^{1 + k \cdot \varphi(n)} = m \cdot (m^{\varphi(n)})^k$$

Theo định lý Euler: $m^{\varphi(n)} \equiv 1 \pmod{n}$ khi $\gcd(m, n) = 1$.

$\Rightarrow m \cdot 1^k = m \pmod{n}$. ✓

---

## Code & Minh họa

- [visualization.html](./visualization.html) — RSA keygen interactive, encrypt/decrypt, Extended Euclidean, fast exp, attack demos.

## Bài tiếp theo

→ [Lesson 02: Diffie-Hellman & ECC](../lesson-02-diffie-hellman-ecc/) — Đổi khóa công khai không cần kênh bí mật, bài toán logarithm rời rạc, và đường cong elliptic.
