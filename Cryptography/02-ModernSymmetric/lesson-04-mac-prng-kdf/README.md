# Lesson 04: MAC, PRNG & KDF

> **Tầng 2 — Modern Symmetric · Cryptography**

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Hiểu **MAC (Message Authentication Code)**: cung cấp integrity + authenticity.
- Biết cách HMAC fix **length extension attack** của hash thuần.
- Phân biệt **LCG** (insecure PRNG, predictable) với **CSPRNG** (cryptographically secure).
- Hiểu tại sao cần **KDF** chậm (slow by design) để bảo vệ passwords.
- So sánh PBKDF2, bcrypt, scrypt, Argon2 và biết **Argon2 là lựa chọn hiện đại nhất**.

## Kiến thức tiền đề

- **T2-L03**: [Hash functions](../lesson-03-hash-functions/README.md) — SHA-256, length extension attack.
- **T2-L01**: [AES](../lesson-01-block-ciphers-aes/README.md) — block cipher.
- **T1-L04**: [Modular arithmetic](../../01-Classical/lesson-04-modular-arithmetic-foundations/README.md) — mod operations.

---

## 1. MAC — Message Authentication Code

### 1.1. Định nghĩa và mục đích

> 💡 **Trực giác**: Hash function chứng minh tính toàn vẹn (integrity) của data — nhưng bất kỳ ai cũng có thể tính lại hash. MAC thêm một **secret key** vào: chỉ người biết key mới tạo được MAC hợp lệ. Đây là sự khác biệt giữa "không ai sửa file" (hash) và "file đến từ người tôi tin" (MAC).

**MAC**: f(K, M) → tag, với:
- **Integrity**: mọi thay đổi trong M → tag khác → detect.
- **Authenticity**: chỉ ai có K mới tạo được tag hợp lệ.

**Không cung cấp**: confidentiality (message vẫn plaintext), non-repudiation (both parties share K nên không prove ai gửi).

**Dùng cho**: API authentication (HMAC-SHA256 trong AWS Signature v4), TLS record layer, JWT, WebHooks, cookie integrity.

### 1.2. Tại sao không phải H(K ‖ M)?

Đây là "secret prefix MAC" — và nó **dễ bị length extension attack** (L03). Biết H(K ‖ M), forge H(K ‖ M ‖ padding ‖ extra) mà không cần K.

Tương tự, H(M ‖ K) "secret suffix" cũng có vấn đề: chosen-message attack trong một số cấu trúc.

**Giải pháp**: HMAC.

---

## 2. HMAC — Hash-based MAC

### 2.1. Công thức HMAC

```
HMAC_K(M) = H((K ⊕ opad) ‖ H((K ⊕ ipad) ‖ M))
```

- `ipad` = 0x36 repeated (inner pad, 64 bytes với SHA-256)
- `opad` = 0x5C repeated (outer pad, 64 bytes)
- `K` được pad/hash về đúng block size (64 byte)

**Hai lần hash**:
1. **Inner**: H(K_inner ‖ M) → inner hash (= message hash với key mixed)
2. **Outer**: H(K_outer ‖ inner_hash) → final HMAC

**Tại sao fix length extension?** Inner hash hoàn thành trước khi outer hash bắt đầu. Output của inner hash là giá trị cố định 32 byte — không phải "half-processed state". Outer hash không thể bị extend vì nó nhận input đã hoàn chỉnh.

### 2.2. Ví dụ cụ thể

**HMAC-SHA256(K="key", M="The quick brown fox jumps over the lazy dog")**:

```
K = "key" (3 bytes) → pad về 64 bytes: 6b657900000...0

K_inner = K ⊕ ipad = [0x6b⊕0x36, 0x65⊕0x36, 0x79⊕0x36, 0x36⊕0x36, ...]
         = [0x5d, 0x53, 0x4f, 0x36, ..., 0x36]

K_outer = K ⊕ opad = [0x6b⊕0x5c, 0x65⊕0x5c, 0x79⊕0x5c, 0x5c⊕0x5c, ...]
         = [0x37, 0x39, 0x25, 0x5c, ..., 0x5c]

inner_msg = K_inner ‖ "The quick brown fox..."
inner_hash = SHA256(inner_msg) = 2fcf96...

final_msg = K_outer ‖ inner_hash
HMAC = SHA256(final_msg) = f7bc83f430538424b13298e6aa6fb143ef4d59a14946175997479dbc2d1a3cd
```

*(Giá trị trên là HMAC-SHA256 thực với key="key", message đó)*

### 2.3. Verify constant-time

**Lỗi thường gặp**: So sánh tag bằng == thông thường → timing attack. Nếu implementation return false ngay khi byte đầu tiên sai → kẻ tấn công đo thời gian → biết bao nhiêu byte đúng.

**Fix**: So sánh constant-time: luôn compare toàn bộ 32 byte dù đã thấy mismatch. Go `crypto/subtle.ConstantTimeCompare`, Python `hmac.compare_digest`.

---

## 3. PRNG — Pseudo-Random Number Generator

### 3.1. Tại sao PRNG quan trọng trong crypto?

Crypto cần random trong nhiều bước: AES key generation, IV/nonce, session tokens, salt cho KDF. Nếu "random" là predictable → kẻ tấn công đoán key.

### 3.2. LCG — Linear Congruential Generator (Insecure)

**Công thức**: X_{n+1} = (a · X_n + c) mod m

**Thường dùng**: m = 2³², a = 1664525, c = 1013904223 (Numerical Recipes).

**Ví dụ với a=1103515245, c=12345, m=2³¹**:
```
X_0 = 42
X_1 = (1103515245 × 42 + 12345) mod 2³¹ = 1248496485
X_2 = (1103515245 × 1248496485 + 12345) mod 2³¹ = 1521572805
X_3 = ?
```

**Vì sao không an toàn?** LCG là **tuyến tính** — biết 2 output liên tiếp, giải hệ phương trình tuyến tính:

```
X_2 = a·X_1 + c (mod m)
→ X_2 - X_1·a ≡ c (mod m)

Biết X_1, X_2:
→ a = (X_2 - c) · X_1^{-1} mod m  (nếu biết c)
→ Hay: biết 3 output → giải a và c hoàn toàn
```

Sau khi có a, c, m: biết X_n → tính X_{n+1}, X_{n+2}, ... vô hạn. PRNG bị compromise hoàn toàn.

**Thực tế tấn công**: PHP cũ dùng LCG cho `rand()`. Biết 1 số từ session token → predict tất cả random về sau → đoán reset password token.

**Ví dụ predict**:

```
Biết: X_1 = 15, X_2 = 8, X_3 = 22 (với a=5, c=3, m=31)
→ X_4 = (5×22 + 3) mod 31 = 113 mod 31 = 20
→ X_5 = (5×20 + 3) mod 31 = 103 mod 31 = 10
```

### 3.3. CSPRNG — Cryptographically Secure PRNG

**Yêu cầu**: Không thể distinguish output từ true random, kể cả khi biết toàn bộ output trước đó (next-bit unpredictability).

**Implementations hiện đại**:
- **Linux**: `/dev/urandom` (kernel entropy pool), `getrandom()` syscall.
- **Windows**: `CryptGenRandom`, `BCryptGenRandom`.
- **Go**: `crypto/rand.Read()`.
- **Python**: `secrets` module (since 3.6), `os.urandom()`.
- **Browser**: `crypto.getRandomValues()` (Web Crypto API).

**Cơ chế** (simplified): thu thập entropy từ hardware events (keyboard timing, mouse movement, network packet timing, disk I/O), mix vào CSPRNG state (ChaCha20 hoặc AES-CTR based), output từ state đó.

**Quan trọng**: `Math.random()` (JavaScript), `random.random()` (Python), `rand()` (C stdlib) là **NOT CSPRNG** — chỉ dùng cho simulation, không dùng cho crypto.

> ⚠ **Lỗi thường gặp**: Dùng `Math.random()` để generate session token hoặc CSRF token. Nếu attacker có thể observe vài token, họ predict next token → chiếm session.

---

## 4. KDF — Key Derivation Function

### 4.1. Tại sao không hash password trực tiếp?

**SHA-256("password123") = ef92b778bafe...** — tính được trong **microseconds**. Kẻ tấn công có GPU cluster:

```
1 GPU: ~10⁹ SHA-256/giây
100 GPU cluster: ~10¹¹ SHA-256/giây
Password space 8 ký tự lowercase: 26⁸ ≈ 2×10¹¹
→ Brute force trong ~2 giây!
```

**KDF mục đích**: chủ ý làm chậm function xuống ~100ms. Brute force: 100ms × 2×10¹¹ = 2×10¹⁰ giây = 630 năm.

**Salt**: tránh rainbow table (precomputed hash table). Salt = random string unique per user, lưu cùng hash. SHA-256(salt ‖ password) khác nhau dù password giống nhau.

### 4.2. PBKDF2 (2000, RFC 2898)

```
DK = PBKDF2(PRF, Password, Salt, c, dkLen)
  PRF: thường là HMAC-SHA256
  c: iteration count (số lần lặp)
  dkLen: output key length
```

**Cơ chế**: lặp c lần HMAC. Mỗi lần dùng output trước làm input. Chỉ tăng được thời gian bằng iteration count — không tăng memory.

**OWASP 2023**: c ≥ 600,000 iterations với SHA-256 → ~100ms trên CPU thường.

**Nhược điểm**: **ASIC/GPU-friendly**. Attacker dùng custom ASIC có thể hash nhanh hơn CPU 100-1000x → cost advantage giảm 100-1000x.

### 4.3. bcrypt (1999, Niels Provos & David Mazières)

```
bcrypt(password, cost) → 60-char hash
  cost: 2^cost internal rounds
  Vd: cost=12 → 2¹² = 4096 rounds → ~100ms
```

**Ưu điểm**: đơn giản, widely deployed, battle-tested 25 năm.

**Nhược điểm**: 
- Max input **72 bytes** — password > 72 byte bị truncate (silent truncation!).
- Memory constant — không resistant với ASIC.
- Không có parallelism parameter.

### 4.4. scrypt (2009, Colin Percival)

```
scrypt(Password, Salt, N, r, p, dkLen)
  N: CPU/memory cost (2^N blocks of 128*r bytes)
  r: block size (usually 8)
  p: parallelization
  Vd: N=2¹⁶, r=8, p=1 → ~64 MB memory
```

**Ưu điểm**: **Memory-hard** — cần nhiều RAM. ASIC cần RAM đắt tiền → cost advantage giảm nhiều hơn bcrypt.

**Nhược điểm**: Khó tune parameters, cache-timing side-channel (N phụ thuộc access pattern).

### 4.5. Argon2 (2015, PHC winner) — Recommended

**Ba variant**:
- **Argon2d**: data-dependent memory → nhanh hơn nhưng vulnerable to timing side-channel. Dùng cho cryptocurrencies.
- **Argon2i**: data-independent → safe for password hashing. Recommended khi không biết side-channel risk.
- **Argon2id**: hybrid — first pass data-independent, rest data-dependent. **Best for passwords**.

```
Argon2id(password, salt, t, m, p) → hash
  t: time cost (iterations)
  m: memory cost (KB)
  p: parallelism (threads)
  Recommended: t=3, m=65536 (64MB), p=4 → ~100ms
```

**Ví dụ tính toán**:

```
Password "password123", Salt = 16 random bytes
Argon2id: t=3, m=64 MB, p=4 → ~100ms per attempt

Attack: 8-char lowercase password, 26⁸ ≈ 2×10¹¹ combinations
Time = 100ms × 2×10¹¹ = 2×10¹⁰ seconds ≈ 630 năm
Dù attacker có 1,000 server: 630 năm / 1,000 = 230 ngày
→ Vẫn không khả thi với password đủ mạnh
```

**Memory hardness**: 64 MB × 4 thread = 256 MB RAM cho 1 hash attempt. Crack cluster 10,000 GPU cần: 10,000 × 256 MB = 2.5 TB RAM chỉ để hash đồng thời — cực đắt.

> ❓ **Câu hỏi**: Nếu KDF chậm thì login của user cũng chậm không? Đúng — nhưng user chỉ login 1 lần/session, 100ms không đáng kể. Trong khi attacker phải brute-force hàng tỷ lần → tốn vô cùng.

### 4.6. Bảng so sánh

| KDF | Năm | Memory-hard | Max input | Parallelism | Dùng khi |
|-----|-----|:-----------:|-----------|:-----------:|---------|
| **PBKDF2-SHA256** | 2000 | ✗ | Không giới hạn | Không | Legacy, FIPS compliance |
| **bcrypt** | 1999 | ✗ | **72 bytes!** | Không | Widely deployed, cẩn thận truncate |
| **scrypt** | 2009 | ✓ | Không giới hạn | Có | ASIC-resistant environments |
| **Argon2id** | 2015 | ✓ | Không giới hạn | ✓ | **Default mới 2024** |

---

## 5. Bài tập

**Bài 1**: HMAC-SHA256 với K = "secret" và M = "hello". Viết ra các bước tính K_inner và K_outer (không cần tính SHA-256 thực sự — chỉ mô tả cấu trúc).

**Bài 2**: LCG: a=7, c=3, m=16, X_0=5. Tính X_1, X_2, X_3, X_4. Xác nhận chu kỳ bao nhiêu?

**Bài 3**: Website lưu password bằng SHA-256(password) không salt. Database bị leak. Attacker thấy hash = `5e884898da2804...` = SHA-256("password"). Anh ta có ngay password vì gì?

**Bài 4**: Argon2id với t=3, m=65536 KB, p=4 mất 80ms trên server. Admin muốn tăng security lên gấp đôi. Nên điều chỉnh parameter nào và thành bao nhiêu?

---

## 6. Lời giải chi tiết

### Bài 1

```
K = "secret" = [0x73, 0x65, 0x63, 0x72, 0x65, 0x74]
Pad về 64 bytes: K_64 = [0x73, 0x65, 0x63, 0x72, 0x65, 0x74, 0x00, ..., 0x00]

ipad = [0x36, 0x36, ..., 0x36] (64 bytes)
opad = [0x5c, 0x5c, ..., 0x5c] (64 bytes)

K_inner = K_64 ⊕ ipad:
  byte 0: 0x73 ⊕ 0x36 = 0x45
  byte 1: 0x65 ⊕ 0x36 = 0x53
  byte 2: 0x63 ⊕ 0x36 = 0x55
  ...
  byte 6-63: 0x00 ⊕ 0x36 = 0x36

K_outer = K_64 ⊕ opad:
  byte 0: 0x73 ⊕ 0x5c = 0x2f
  byte 1: 0x65 ⊕ 0x5c = 0x39
  ...
  byte 6-63: 0x00 ⊕ 0x5c = 0x5c

inner_msg = K_inner ‖ "hello"  (64 + 5 = 69 bytes)
inner_hash = SHA256(inner_msg)

final_msg = K_outer ‖ inner_hash  (64 + 32 = 96 bytes)
HMAC = SHA256(final_msg)
```

### Bài 2

```
a=7, c=3, m=16, X_0=5
X_1 = (7×5 + 3) mod 16 = 38 mod 16 = 6
X_2 = (7×6 + 3) mod 16 = 45 mod 16 = 13
X_3 = (7×13 + 3) mod 16 = 94 mod 16 = 14
X_4 = (7×14 + 3) mod 16 = 101 mod 16 = 5
```

X_4 = X_0 = 5 → chu kỳ = 4. LCG với m=16 có chu kỳ tối đa 4 (rất ngắn!). Với m=2³², chu kỳ tối đa ~2³² nếu chọn a, c đúng.

### Bài 3

Vì SHA-256("password") là hằng số, mọi user dùng "password" đều có hash giống nhau. Attacker:
1. Dùng **rainbow table** (precomputed hash → password, lưu sẵn) → tra cứu O(1).
2. Rainbow table phổ biến cho SHA-256 của 1 tỷ password thông dụng đã tồn tại sẵn.

Salt fix điều này: SHA-256(salt ‖ "password") khác nhau với mỗi salt → không dùng rainbow table chung được.

### Bài 4

Các option:
- **Tăng t** từ 3 → 6: +100% thời gian (→ 160ms). Dễ nhất.
- **Tăng m** từ 65536 → 131072 KB: tăng memory gấp đôi, +100% thời gian (→ 160ms). Tốt hơn vì cũng tăng memory cost cho attacker.
- **Tăng cả 2**: t=4, m=131072 → ~3-4× chậm hơn.

**Khuyến nghị**: Tăng m trước (memory-hardness là lợi thế chính của Argon2 so với PBKDF2). t=3, m=131072, p=4 → ~160ms — vẫn chấp nhận được cho login, nhưng attacker cần gấp đôi RAM.

---

## Bài tiếp theo

[T3-L01: RSA](../../03-AsymmetricApplied/lesson-01-rsa/README.md) — Tầng 3: Asymmetric cryptography. Key exchange không cần shared secret. RSA với số nhỏ (p=11, q=13), padding schemes, attacks.

[visualization.html](./visualization.html)
