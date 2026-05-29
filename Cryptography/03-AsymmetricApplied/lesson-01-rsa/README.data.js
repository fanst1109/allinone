// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: Cryptography/03-AsymmetricApplied/lesson-01-rsa/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 01: RSA — Mã hóa khóa công khai đầu tiên

> **Tầng 3 — Asymmetric & Applied · Cryptography**

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Thực hiện **RSA keygen** bằng tay với p=11, q=13 — tính được n, φ, d từ đầu.
- Mã hóa và giải mã theo công thức c = m^e mod n, m = c^d mod n.
- Hiểu **tại sao RSA đúng** thông qua định lý Euler: m^φ(n) ≡ 1 (mod n).
- Giải thích tại sao **textbook RSA không an toàn** và OAEP/PKCS#1 v1.5 sửa gì.
- Nhận dạng 3 attack phổ biến: small exponent, common modulus, Wiener's.

## Kiến thức tiền đề

- **T1-L04**: Modular arithmetic, gcd, Extended Euclidean, Fermat little theorem, fast exponentiation → [lesson-04-modular-arithmetic-foundations](../../01-Classical/lesson-04-modular-arithmetic-foundations/)
- **T2-L03**: Hash functions (cần cho OAEP) → [lesson-03-hash-functions](../../02-ModernSymmetric/lesson-03-hash-functions/)

---

## 1. Ý tưởng căn bản: bẫy một chiều

> 💡 **Trực giác**: Nhân hai số nguyên tố lại rất dễ — 11 × 13 = 143 tính trong 1 giây. Ngược lại, cho 143, tìm lại hai thừa số nguyên tố mất bao lâu? Với số 2048-bit, thuật toán tốt nhất đã biết cần ~2⁹⁰ phép toán. RSA xây toàn bộ sức mạnh lên sự bất đối xứng này.

**Hệ mã hóa khóa công khai (public-key cryptosystem)** gồm:
- **Khóa công khai (e, n)**: chia sẻ tự do. Ai cũng có thể mã hóa bằng khóa này.
- **Khóa bí mật (d)**: giữ kín. Chỉ chủ nhân mới giải mã được.

❓ **Câu hỏi tự nhiên: Tại sao tôi không thể tìm d từ (e, n)?**
Vì d = e⁻¹ mod φ(n), mà φ(n) = (p−1)(q−1) — muốn tính φ(n) phải biết p, q. Biết p, q thì phải phân tích thừa số n = p·q, và đó chính là bài toán khó.

---

## 2. RSA Keygen — 5 bước

### Bước 1: Chọn hai số nguyên tố p, q

Trong production: p, q ~ 1024 bit mỗi số. Trong bài này dùng số nhỏ để tính tay.

### Bước 2: Tính n và φ(n)

\`\`\`
n = p × q
φ(n) = (p − 1) × (q − 1)
\`\`\`

φ(n) là **hàm Euler totient** — đếm số nguyên trong [1, n−1] coprime với n.

> 💡 **Tại sao φ(n) = (p−1)(q−1)?** Vì p, q là nguyên tố, những số không coprime với n = p·q chính là các bội của p hoặc q trong [1, n−1]. Có (q−1) bội của p và (p−1) bội của q → tổng số coprime = n − 1 − (p−1) − (q−1) = pq − p − q + 1 = (p−1)(q−1).

### Bước 3: Chọn e (public exponent)

Chọn e sao cho \`1 < e < φ(n)\` và \`gcd(e, φ(n)) = 1\`.

Giá trị phổ biến nhất trong thực tế: **e = 65537 = 2¹⁶ + 1**.

> 💡 **Tại sao e = 65537 được ưa chuộng?** Nhị phân: 10000000000000001 — chỉ có 2 bit 1. Fast exponentiation chỉ cần 17 lần bình phương và 1 lần nhân (thay vì trung bình ~1500 phép nhân nếu e ngẫu nhiên). Đủ lớn để tránh small exponent attack.

### Bước 4: Tính d (private exponent)

\`\`\`
d = e⁻¹ mod φ(n)
\`\`\`

Dùng **Extended Euclidean Algorithm** để tìm d.

### Bước 5: Kết quả

- **Public key**: (n, e)
- **Private key**: d (hoặc tuple (p, q, d) cho Chinese Remainder Theorem speedup)

---

## 3. Mã hóa và Giải mã

\`\`\`
Encrypt: c = m^e mod n
Decrypt: m = c^d mod n
\`\`\`

Yêu cầu: \`0 ≤ m < n\`.

---

## 4. Walk-through THẬT với p=11, q=13

### 4.1. Keygen

**Bước 1**: p = 11, q = 13.

**Bước 2**: 
- n = 11 × 13 = **143**
- φ(n) = (11−1) × (13−1) = 10 × 12 = **120**

**Bước 3**: Chọn e = 7.
- gcd(7, 120) = ? Dùng Euclidean:
  - 120 = 17 × 7 + **1** → gcd = 1 ✓

**Bước 4**: Tính d = 7⁻¹ mod 120 bằng Extended Euclidean:

| Bước | Phép chia | Quotient | Remainder | x | y |
|------|-----------|----------|-----------|---|---|
| 0    | 120 = ? × 7 | — | — | 1 | 0 |
| 1    | 120 = 17×7 + 1 | 17 | 1 | 0 | 1 |

Từ dòng cuối: \`1 = 120 − 17 × 7\` → \`7 × (−17) ≡ 1 (mod 120)\`.

−17 mod 120 = 120 − 17 = **103**.

Vậy **d = 103**. Kiểm tra: 7 × 103 = 721 = 6 × 120 + 1 ✓.

**Kết quả**: Public key = **(143, 7)**, Private key = **103**.

### 4.2. Mã hóa m = 9

Tính **c = 9⁷ mod 143** bằng fast exponentiation:

| Bước | Tính | Kết quả mod 143 |
|------|------|-----------------|
| 9¹ | 9 | **9** |
| 9² | 9 × 9 = 81 | **81** |
| 9⁴ | 81 × 81 = 6561 | 6561 = 45×143 + 126 → **126** |
| 9⁷ = 9⁴ × 9² × 9¹ | 126 × 81 = 10206 → 10206 = 71×143 + 53 → 53; 53 × 9 = 477 = 3×143 + 48 | **48** |

**c = 48**.

### 4.3. Giải mã c = 48

Tính **m = 48¹⁰³ mod 143**.

103 = 64 + 32 + 4 + 2 + 1 (nhị phân: 1100111).

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

**m = 9** ✓ — khớp với bản rõ ban đầu.

### 4.4. Verify bằng định lý Euler

Định lý Euler: \`m^φ(n) ≡ 1 (mod n)\` khi gcd(m, n) = 1.

Với n = 143, φ(n) = 120: **9¹²⁰ mod 143 = 1**.

Vì e × d = 7 × 103 = 721 = 6 × 120 + 1 = **1 mod 120**:

\`\`\`
c^d = (m^e)^d = m^(e·d) = m^(1 + k·φ(n)) = m · (m^φ(n))^k = m · 1^k = m (mod n)
\`\`\`

RSA đúng đương nhiên từ định lý Euler. ✓

---

## 5. Ví dụ 2: p=61, q=53 (classic textbook)

- n = 61 × 53 = **3233**
- φ(n) = 60 × 52 = **3120**
- e = 17 (gcd(17, 3120) = 1 ✓)
- d = 17⁻¹ mod 3120 = **2753** (vì 17 × 2753 = 46801 = 15×3120 + 1 ✓)
- Encrypt m = 65: c = 65¹⁷ mod 3233 = **2790**
- Decrypt: 2790²⁷⁵³ mod 3233 = **65** ✓

---

## 6. Security của RSA

### 6.1. Độ khó

| Kích thước key | Trạng thái | Ghi chú |
|---------------|------------|---------|
| RSA-512 | Phá được (1999) | < 1 tuần CPU hiện đại |
| RSA-768 | Phá được (2009) | 2 năm CPU |
| RSA-1024 | DEPRECATED | NIST khuyến cáo từ bỏ trước 2030 |
| RSA-2048 | AN TOÀN (~2030s) | ~2⁹⁰ ops với thuật toán tốt nhất |
| RSA-3072 | AN TOÀN (~2040s) | NIST khuyến nghị mới |
| RSA-4096 | Conservative | Chậm hơn, không cần thiết thường |

> ⚠ **Lỗi thường gặp**: nghĩ rằng RSA-1024 "vẫn ổn vì chưa ai phá". Thực tế: chi phí phá RSA-1024 năm 2024 ước tính ~$50K–$1M với cloud infrastructure. Không dùng.

### 6.2. Điều gì thực sự bảo vệ RSA?

RSA an toàn **giả sử** bài toán **Integer Factorization** khó. Không ai chứng minh được điều này — đó chỉ là giả thuyết. Thuật toán tốt nhất hiện tại là **General Number Field Sieve (GNFS)**, độ phức tạp sub-exponential:

\`\`\`
exp( (64/9)^(1/3) · (log n)^(1/3) · (log log n)^(2/3) )
\`\`\`

---

## 7. Padding: Từ Textbook RSA đến OAEP

### 7.1. Tại sao textbook RSA không an toàn?

**Textbook RSA** = dùng thẳng c = m^e mod n, không padding. Có 3 vấn đề:

1. **Deterministic**: cùng m luôn cho cùng c → attacker biết Alice gửi "YES" hay "NO".
2. **Malleable**: nếu biết c = m^e, attacker có thể tạo c' = (2^e · c) mod n, và server sẽ decrypt ra m' = 2m. Điều này cho phép nhiều kiểu tấn công.
3. **Small message**: nếu m < n^(1/e), thì m^e < n, và c = m^e (không mod) → m = ⁱ√c đơn giản.

### 7.2. PKCS#1 v1.5

Padding scheme được dùng phổ biến từ 1993. Format:

\`\`\`
0x00 0x02 [random bytes ≠ 0x00, ít nhất 8 byte] 0x00 [message]
\`\`\`

> ⚠ **BỊ PHÁT HIỆN LỖI**: Bleichenbacher 1998 chứng minh adaptive chosen-ciphertext attack có thể khôi phục plaintext sau ~1 triệu oracle queries. Gọi là "PKCS#1 padding oracle attack". Vẫn còn rủi ro trong TLS cũ.

### 7.3. OAEP (Optimal Asymmetric Encryption Padding)

Được chuẩn hóa trong PKCS#1 v2.0 (1998), cùng tác giả. OAEP dùng random mask + hash để:
- Randomize ciphertext (non-deterministic).
- Chứng minh secure dưới RSA assumption (trong random oracle model).

**Dùng OAEP trong production, không bao giờ dùng textbook RSA.**

---

## 8. Ba Attack cổ điển trên RSA

### 8.1. Small Exponent Attack

**Điều kiện**: e = 3, message m nhỏ (m < n^(1/3)).

**Khai thác**: c = m³ mod n. Nếu m³ < n thì không có mod, c = m³ thật sự. → m = ∛c.

**Ví dụ số**: e = 3, m = 42, n = 1,234,567.
- c = 42³ = 74,088.
- 74,088 < 1,234,567 → c = m³ chính xác.
- m = ∛74088 = 42 ✓.

**Mở rộng** (Hastad's broadcast attack): Nếu cùng m gửi đến 3 người với 3 modulus khác nhau, e = 3, dùng Chinese Remainder Theorem để khôi phục m³ và lấy căn.

**Fix**: Dùng OAEP padding, không để m nhỏ so với n^(1/e).

### 8.2. Common Modulus Attack

**Điều kiện**: Alice dùng cùng n với 2 exponent khác nhau e₁, e₂, và gcd(e₁, e₂) = 1.

**Khai thác**: Attacker có c₁ = m^(e₁) mod n và c₂ = m^(e₂) mod n.
- Tìm a, b sao cho a·e₁ + b·e₂ = 1 (Extended Euclidean).
- m = c₁^a · c₂^b mod n.

**Ví dụ**: e₁ = 3, e₂ = 5, gcd = 1. a = 2, b = −1 (vì 2·3 − 1·5 = 1).
- m = c₁² · c₂⁻¹ mod n.

**Fix**: KHÔNG chia sẻ modulus n giữa nhiều key pair.

### 8.3. Wiener's Attack

**Điều kiện**: d nhỏ, cụ thể d < n^(1/4) / 3.

**Khai thác**: e/n ≈ k/(d·φ(n)) với k nhỏ → dùng continued fraction expansion của e/n để tìm d.

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

**Bài 1**: Keygen với p = 7, q = 11.
(a) Tính n, φ(n).
(b) Chọn e = 13. Kiểm tra gcd(13, φ(n)).
(c) Tính d bằng Extended Euclidean.
(d) Mã hóa m = 8. Giải mã lại.

**Bài 2**: Wiener setup: Cho n = 90581, e = 17993. Biết d < n^(1/4)/3 ≈ 5.4. Thử d ∈ {1, 2, 3, 4, 5} — d nào thỏa e·d ≡ 1 (mod φ(n)) với φ(n) nào đó?

**Bài 3**: Small exponent: e = 3, n = 999983 (nguyên tố), m = 99. Tính c. Sau đó recover m từ c biết m < n^(1/3).

**Bài 4**: Chứng minh: nếu e·d ≡ 1 (mod φ(n)) và gcd(m, n) = 1, thì (m^e)^d ≡ m (mod n).

---

## 11. Lời giải chi tiết

### Lời giải Bài 1

**(a)** n = 7 × 11 = **77**. φ(n) = 6 × 10 = **60**.

**(b)** gcd(13, 60):
- 60 = 4 × 13 + 8
- 13 = 1 × 8 + 5
- 8 = 1 × 5 + 3
- 5 = 1 × 3 + 2
- 3 = 1 × 2 + 1
- gcd = **1** ✓

**(c)** Extended Euclidean 13⁻¹ mod 60:
Từ truy ngược: 1 = 3 − 1×2 = 3 − 1×(5−3) = 2×3 − 5 = 2×(8−5) − 5 = 2×8 − 3×5 = 2×8 − 3×(13−8) = 5×8 − 3×13 = 5×(60−4×13) − 3×13 = 5×60 − 23×13.
→ d = **−23 mod 60 = 37**. Kiểm tra: 13 × 37 = 481 = 8×60 + 1 ✓.

**(d)** Encrypt m = 8: c = 8¹³ mod 77.
- 8² = 64. 8⁴ = 64² = 4096 = 53×77 + 15 → 15.
- 8⁸ = 15² = 225 = 2×77 + 71 → 71.
- 8¹² = 8⁸×8⁴ = 71×15 = 1065 = 13×77 + 64 → 64.
- 8¹³ = 8¹²×8¹ = 64×8 = 512 = 6×77 + 50 → **c = 50**.
Decrypt: m = 50³⁷ mod 77 = **8** ✓ (dùng fast exp tương tự).

### Lời giải Bài 3

c = 99³ = 970299. 970299 < 999983? Không — 970299 < 999983 ✓.
→ c = 970299 (không mod vì < n).
Recover: m = ∛970299 = **99** ✓.

### Lời giải Bài 4

Vì e·d = 1 + k·φ(n) với k nào đó:

(m^e)^d = m^(e·d) = m^(1 + k·φ(n)) = m · (m^φ(n))^k

Theo định lý Euler: m^φ(n) ≡ 1 (mod n) khi gcd(m, n) = 1.

→ m · 1^k = m (mod n). ✓

---

## Code & Minh họa

- [visualization.html](./visualization.html) — RSA keygen interactive, encrypt/decrypt, Extended Euclidean, fast exp, attack demos.

## Bài tiếp theo

→ [Lesson 02: Diffie-Hellman & ECC](../lesson-02-diffie-hellman-ecc/) — Đổi khóa công khai không cần kênh bí mật, bài toán logarithm rời rạc, và đường cong elliptic.
`;
