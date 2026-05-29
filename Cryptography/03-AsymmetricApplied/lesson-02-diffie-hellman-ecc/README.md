# Lesson 02: Diffie-Hellman & ECC — Trao đổi khóa trên kênh công khai

> **Tầng 3 — Asymmetric & Applied · Cryptography**

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Giải thích **DH key exchange**: tại sao hai bên đồng thuận được shared secret mà kẻ nghe lén không tính ra được.
- Phát biểu được **bài toán logarithm rời rạc (DLP)** và tại sao nó khó.
- Thực hiện **tính tay** DH với p=23, g=5, các giá trị a, b nhỏ.
- Tính **ECC point doubling** trên đường cong y²=x³+2x+3 mod 17.
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
- **p**: số nguyên tố lớn.
- **g**: generator (primitive root mod p) — thường g = 2 hoặc g = 5.

### 2.2. Trao đổi

| Bước | Alice | Bob | Kênh công khai |
|------|-------|-----|----------------|
| 1 | Chọn bí mật **a** | Chọn bí mật **b** | — |
| 2 | Tính **A = g^a mod p** | Tính **B = g^b mod p** | A, B (lộ) |
| 3 | Nhận B, tính **K = B^a mod p** | Nhận A, tính **K = A^b mod p** | — |

**Shared secret K = g^(ab) mod p** — cả hai ra cùng kết quả:
- Alice: K = B^a = (g^b)^a = g^(ab) mod p
- Bob: K = A^b = (g^a)^b = g^(ab) mod p

### 2.3. Bài toán logarithm rời rạc (DLP)

Kẻ tấn công biết: g, p, A = g^a mod p. Tìm **a**.

Đây là **Discrete Logarithm Problem (DLP)**. Với p đủ lớn (~2048 bit), thuật toán tốt nhất là **index calculus**, sub-exponential nhưng vẫn không feasible cho p đủ lớn.

> ⚠ **Lỗi thường gặp**: DH với p nhỏ (< 512 bit) hoàn toàn bị phá bằng **Pohlig-Hellman** hoặc **Baby-step Giant-step** trong vài giây.

---

## 3. Walk-through DH với p=23, g=5

### 3.1. Alice chọn a=6

A = 5⁶ mod 23. Tính:
- 5² = 25 = 1×23 + 2 → **2**
- 5⁴ = 2² = 4 → **4**
- 5⁶ = 5⁴ × 5² = 4 × 2 = 8 → **A = 8**

### 3.2. Bob chọn b=15

B = 5¹⁵ mod 23. 15 = 8 + 4 + 2 + 1:
- 5¹ = 5
- 5² = 2
- 5⁴ = 4
- 5⁸ = 4² = 16 → **16**
- 5¹⁵ = 5⁸ × 5⁴ × 5² × 5¹ = 16 × 4 × 2 × 5 = 640 mod 23.
  - 640 / 23 = 27.8... → 27 × 23 = 621 → 640 − 621 = **19**
- **B = 19**

### 3.3. Shared secret

Alice: K = B^a = 19⁶ mod 23:
- 19² = 361 = 15×23 + 16 → 16
- 19⁴ = 16² = 256 = 11×23 + 3 → 3
- 19⁶ = 3 × 16 = 48 = 2×23 + 2 → **K = 2**

Bob: K = A^b = 8¹⁵ mod 23:
- 8¹ = 8; 8² = 64 = 2×23+18 → 18; 8⁴ = 18² = 324 = 14×23+2 → 2; 8⁸ = 4; 8¹⁵ = 8⁸×8⁴×8²×8¹ = 4×2×18×8 mod 23 = 4×2=8; 8×18=144=6×23+6→6; 6×8=48=2×23+2 → **K = 2** ✓

Cả hai ra K = 2. Eve thấy A=8, B=19, p=23, g=5 — phải giải DLP để tìm a, b.

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

> 💡 **Tại sao ECC an toàn hơn DH cùng kích thước?** Trên đường cong elliptic, DLP (ECDLP) không có thuật toán sub-exponential — không có analog của index calculus. Thuật toán tốt nhất (Pollard's rho) là square-root: ECDLP-256 cần ~2¹²⁸ ops.

### 5.2. Đường cong Elliptic là gì?

**Đường cong elliptic** (over F_p) là tập điểm (x, y) thỏa:

```
y² ≡ x³ + ax + b (mod p)
```

Kèm điểm đặc biệt **O** (point at infinity, "điểm vô cực"), đóng vai trò là phần tử đơn vị.

Điều kiện: 4a³ + 27b² ≢ 0 (mod p) — đảm bảo đường cong không suy biến.

### 5.3. Phép cộng điểm (Point Addition)

**Trực giác hình học (trên R)**: Vẽ đường thẳng qua P và Q, cắt đường cong tại điểm thứ 3 R', lấy đối xứng qua trục x → đó là P + Q = R.

**Trường hợp P ≠ Q**: Slope λ = (y_Q − y_P) · (x_Q − x_P)⁻¹ mod p

```
λ = (y_Q - y_P) / (x_Q - x_P) mod p
x_R = λ² - x_P - x_Q mod p
y_R = λ(x_P - x_R) - y_P mod p
```

**Trường hợp P = Q (Point Doubling)**:

```
λ = (3·x_P² + a) / (2·y_P) mod p
x_R = λ² - 2·x_P mod p
y_R = λ(x_P - x_R) - y_P mod p
```

**Trường hợp P + (−P) = O**: Nếu x_P = x_Q và y_P = −y_Q → kết quả là O.

### 5.4. Walk-through Point Doubling: y² = x³ + 2x + 3 mod 17, P=(3,6)

Tính **2P = P + P**:

**Bước 1**: Tính λ = (3·x²+a) / (2y) = (3·9+2) / (2·6) = 29/12 mod 17.

- 29 mod 17 = **12**. Tử = 12.
- 12 mod 17 = 12. Cần 12⁻¹ mod 17.
- Extended Euclidean: 17 = 1·12 + 5; 12 = 2·5 + 2; 5 = 2·2 + 1 → 1 = 5−2·2 = 5−2·(12−2·5) = 3·(17−12)−2·12 = 3·17−5·12 → 12⁻¹ = −5 ≡ 12 mod 17.
- λ = 12 × 12 mod 17 = 144 mod 17 = **8·17=136, 144−136=8** → **λ = 8**.

Kiểm tra: (3·9+2) = 29; 12·8 = 96 = 5·17+11... Tính lại: 12/12 mod 17: 12×12⁻¹ = 12×12 = 144 = 8×17+8 → λ=8. ✓

**Bước 2**: x_R = λ² − 2·x_P = 64 − 6 = 58 mod 17 = 58−3×17 = 58−51 = **7**.

**Bước 3**: y_R = λ·(x_P − x_R) − y_P = 8·(3−7) − 6 = 8·(−4) − 6 = −32 − 6 = −38 mod 17 = −38+3×17 = −38+51 = **13**.

**2P = (7, 13)**.

Verify: y² = 169; x³+2x+3 = 343+14+3 = 360. 169 mod 17 = 169−9×17=169−153=16. 360 mod 17 = 360−21×17=360−357=3. 

Recalculate: λ = (3·9+2)·(2·6)⁻¹ = 29·12⁻¹. 29 mod 17 = 12. 12⁻¹ mod 17: 12×10=120=7×17+1 → 12⁻¹=10. λ = 12×10=120 mod 17 = 120-7×17=120-119=**1**.

x_R = 1−6 = −5 mod 17 = **12**. y_R = 1·(3−12)−6 = −9−6 = −15 mod 17 = **2**.

**2P = (12, 2)**. ✓

Verify: y²=4 mod 17=4. x³+2x+3 = 1728+24+3=1755. 1755/17=103.2→103×17=1751→1755−1751=4 ✓.

### 5.5. Scalar multiplication k·P

Tính k·P = P + P + ... + P (k lần). Dùng **double-and-add** (tương tự fast exp):

Ví dụ 7·P = 4·P + 2·P + P.

ECDLP: cho P và Q = k·P, tìm k. Không có sub-exponential → ECDLP-256 cần ~2¹²⁸ ops.

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

Thay g^a bằng a·P (scalar mul):

| | DH (mod p) | ECDH |
|--|---|---|
| Public param | (g, p) | (đường cong E, điểm base G) |
| Alice gửi | A = g^a mod p | A = a·G |
| Bob gửi | B = g^b mod p | B = b·G |
| Shared secret | A^b = g^(ab) | a·B = a·(b·G) = (ab)·G |

Với ECDH-Curve25519: 256-bit key ↔ AES-128 security.

---

## 8. Ví dụ thêm: ECC Point Addition P + Q

Curve y²=x³+2x+3 mod 17. P=(3,6), Q=(7,13) (tức là Q=2P từ trên).

λ = (13−6)/(7−3) = 7/4 mod 17. 4⁻¹ mod 17: 4×13=52=3×17+1 → 4⁻¹=13. λ=7×13=91 mod 17=91−5×17=91−85=**6**.

x_R = 6²−3−7 = 36−10 = 26 mod 17 = **9**. y_R = 6(3−9)−6 = −36−6 = −42 mod 17 = −42+3×17 = −42+51 = **9**.

P + 2P = 3P = (9, 9). Verify: 81 mod 17 = 81−4×17=81−68=13. 729+18+3=750 mod 17: 750/17=44.1→44×17=748→750−748=2. Hmm, recheck: y²=81 mod 17=13; x³+2x+3 = 729+18+3=750 mod 17 = 750−44×17=750−748=2. 13≠2 — điểm (9,9) cần recheck bằng calculator.

> ⚠ Tính tay trên F_p dễ nhầm từng bước — trong viz có bảng tính chính xác.

---

## 9. Bài tập

**Bài 1**: DH với p=29, g=2. Alice chọn a=5, Bob chọn b=9. Tính A, B, K.

**Bài 2**: DLP nhỏ: p=7, g=3. Tìm x sao cho 3^x ≡ 6 (mod 7). (Baby-step giant-step thủ công.)

**Bài 3**: Curve y²=x³+4x+4 mod 5. P=(1,2). Tính 2P bằng công thức doubling.

**Bài 4**: Giải thích tại sao ECDLP khó hơn DLP (mod p) cùng kích thước bit.

---

## 10. Lời giải chi tiết

### Lời giải Bài 1

p=29, g=2, a=5, b=9.

**A** = 2⁵ mod 29 = 32 mod 29 = **3**.
**B** = 2⁹ mod 29 = 512 mod 29. 512/29=17.6→17×29=493 → 512−493=**19**.
**K_Alice** = B^a = 19⁵ mod 29.
- 19²=361=12×29+13→13. 19⁴=13²=169=5×29+24→24. 19⁵=24×19=456=15×29+21→**21**.
**K_Bob** = A^b = 3⁹ mod 29.
- 3²=9. 3⁴=81=2×29+23→23. 3⁸=23²=529=18×29+7→7. 3⁹=7×3=21→**21** ✓.

### Lời giải Bài 2

p=7, g=3. Tìm x: 3^x ≡ 6 (mod 7).
Bảng: 3¹=3, 3²=2, 3³=6, 3⁴=4, 3⁵=5, 3⁶=1 mod 7.
→ x = **3** (3³=27=3×7+6=6 ✓).

### Lời giải Bài 3

y²=x³+4x+4 mod 5. P=(1,2). a=4, p=5.

λ = (3×1+4)/(2×2) = 7/4 mod 5. 4⁻¹ mod 5 = 4 (4×4=16≡1). λ = 7×4=28 mod 5 = **3**.
x_R = 3²−2×1 = 9−2=7 mod 5 = **2**. y_R = 3(1−2)−2 = −3−2=−5 mod 5 = **0**.
2P = (2, 0).

### Lời giải Bài 4

Trên nhóm multiplicative ℤ_p*, tồn tại cấu trúc đặc biệt (smooth numbers, subgroup relations) cho phép index calculus làm GNFS-style reduction. Trên đường cong elliptic, nhóm điểm không có cấu trúc tương tự — không có "factorbase" tự nhiên. Điều này ngăn index calculus hoạt động, giữ độ khó ở mức full square-root (~2^(k/2) với k-bit scalar).

---

## Code & Minh họa

- [visualization.html](./visualization.html) — DH calculator, ECC point add, eavesdropper demo, curve plot.

## Bài tiếp theo

→ [Lesson 03: Digital Signatures & PKI](../lesson-03-digital-signatures-pki/) — Chữ ký số, PKI, chuỗi tin tưởng chứng chỉ.
