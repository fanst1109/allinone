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

**MAC**: $f(K, M) \to \text{tag}$, với:
- **Integrity**: mọi thay đổi trong M → tag khác → detect.
- **Authenticity**: chỉ ai có K mới tạo được tag hợp lệ.

**Không cung cấp**: confidentiality (message vẫn plaintext), non-repudiation (both parties share K nên không prove ai gửi).

**Dùng cho**: API authentication (HMAC-SHA256 trong AWS Signature v4), TLS record layer, JWT, WebHooks, cookie integrity.

### 1.2. Tại sao không phải H(K ‖ M)?

Đây là "secret prefix MAC" — và nó **dễ bị length extension attack** (L03). Biết $H(K \,\|\, M)$, forge $H(K \,\|\, M \,\|\, \text{padding} \,\|\, \text{extra})$ mà không cần $K$.

Tương tự, $H(M \,\|\, K)$ "secret suffix" cũng có vấn đề: chosen-message attack trong một số cấu trúc.

**Giải pháp**: HMAC.

---

## 2. HMAC — Hash-based MAC

### 2.1. Công thức HMAC

$$\mathrm{HMAC}_K(M) = H\big((K \oplus \text{opad}) \,\|\, H((K \oplus \text{ipad}) \,\|\, M)\big)$$

- `ipad` = 0x36 repeated (inner pad, 64 bytes với SHA-256)
- `opad` = 0x5C repeated (outer pad, 64 bytes)
- `K` được pad/hash về đúng block size (64 byte)

**Hai lần hash**:
1. **Inner**: $H(K_\text{inner} \,\|\, M) \to$ inner hash ($=$ message hash với key mixed)
2. **Outer**: $H(K_\text{outer} \,\|\, \text{inner\_hash}) \to$ final HMAC

**Tại sao fix length extension?** Inner hash hoàn thành trước khi outer hash bắt đầu. Output của inner hash là giá trị cố định 32 byte — không phải "half-processed state". Outer hash không thể bị extend vì nó nhận input đã hoàn chỉnh.

### 2.2. Ví dụ cụ thể

**HMAC-SHA256(K="key", M="The quick brown fox jumps over the lazy dog")**:

$K = $ "key" (3 bytes) $\to$ pad về 64 bytes: `6b657900000...0`.

$$\begin{aligned}
K_\text{inner} = K \oplus \text{ipad} &= [\text{0x6b}{\oplus}\text{0x36}, \text{0x65}{\oplus}\text{0x36}, \text{0x79}{\oplus}\text{0x36}, \text{0x36}{\oplus}\text{0x36}, \ldots] \\
&= [\text{0x5d}, \text{0x53}, \text{0x4f}, \text{0x36}, \ldots, \text{0x36}] \\
K_\text{outer} = K \oplus \text{opad} &= [\text{0x6b}{\oplus}\text{0x5c}, \text{0x65}{\oplus}\text{0x5c}, \text{0x79}{\oplus}\text{0x5c}, \text{0x5c}{\oplus}\text{0x5c}, \ldots] \\
&= [\text{0x37}, \text{0x39}, \text{0x25}, \text{0x5c}, \ldots, \text{0x5c}]
\end{aligned}$$

$\text{inner\_msg} = K_\text{inner} \,\|\, \text{"The quick brown fox..."}$, rồi $\text{inner\_hash} = \mathrm{SHA256}(\text{inner\_msg}) = \text{2fcf96...}$

$\text{final\_msg} = K_\text{outer} \,\|\, \text{inner\_hash}$, rồi:

$$\mathrm{HMAC} = \mathrm{SHA256}(\text{final\_msg}) = \text{f7bc83f430538424b13298e6aa6fb143ef4d59a14946175997479dbc2d1a3cd}$$

*(Giá trị trên là HMAC-SHA256 thực với key="key", message đó)*

### 2.3. Verify constant-time

**Lỗi thường gặp**: So sánh tag bằng == thông thường → timing attack. Nếu implementation return false ngay khi byte đầu tiên sai → kẻ tấn công đo thời gian → biết bao nhiêu byte đúng.

**Fix**: So sánh constant-time: luôn compare toàn bộ 32 byte dù đã thấy mismatch. Go `crypto/subtle.ConstantTimeCompare`, Python `hmac.compare_digest`.

---

## 3. PRNG — Pseudo-Random Number Generator

### 3.1. Tại sao PRNG quan trọng trong crypto?

Crypto cần random trong nhiều bước: AES key generation, IV/nonce, session tokens, salt cho KDF. Nếu "random" là predictable → kẻ tấn công đoán key.

### 3.2. LCG — Linear Congruential Generator (Insecure)

**Công thức**: $X_{n+1} = (a \cdot X_n + c) \bmod m$

**Thường dùng**: $m = 2^{32}$, $a = 1664525$, $c = 1013904223$ (Numerical Recipes).

**Ví dụ với $a = 1103515245$, $c = 12345$, $m = 2^{31}$**:

$$\begin{aligned}
X_0 &= 42 \\
X_1 &= (1103515245 \times 42 + 12345) \bmod 2^{31} = 1248496485 \\
X_2 &= (1103515245 \times 1248496485 + 12345) \bmod 2^{31} = 1521572805 \\
X_3 &= ?
\end{aligned}$$

**Vì sao không an toàn?** LCG là **tuyến tính** — biết 2 output liên tiếp, giải hệ phương trình tuyến tính:

$$\begin{aligned}
X_2 &= a \cdot X_1 + c \pmod{m} \\
&\Rightarrow X_2 - X_1 \cdot a \equiv c \pmod{m}
\end{aligned}$$

Biết $X_1, X_2$: $a = (X_2 - c) \cdot X_1^{-1} \bmod m$ (nếu biết $c$). Hay: biết 3 output $\Rightarrow$ giải $a$ và $c$ hoàn toàn.

Sau khi có $a, c, m$: biết $X_n \to$ tính $X_{n+1}, X_{n+2}, \ldots$ vô hạn. PRNG bị compromise hoàn toàn.

**Thực tế tấn công**: PHP cũ dùng LCG cho `rand()`. Biết 1 số từ session token → predict tất cả random về sau → đoán reset password token.

**Ví dụ predict**:

$$\begin{aligned}
\text{Biết: } & X_1 = 15, X_2 = 8, X_3 = 22 \text{ (với } a{=}5, c{=}3, m{=}31) \\
X_4 &= (5 \times 22 + 3) \bmod 31 = 113 \bmod 31 = 20 \\
X_5 &= (5 \times 20 + 3) \bmod 31 = 103 \bmod 31 = 10
\end{aligned}$$

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

$$\begin{aligned}
\text{1 GPU} &: \approx 10^9 \text{ SHA-256/giây} \\
\text{100 GPU cluster} &: \approx 10^{11} \text{ SHA-256/giây} \\
\text{Password space 8 ký tự lowercase} &: 26^8 \approx 2 \times 10^{11} \\
&\Rightarrow \text{Brute force trong } \approx 2 \text{ giây!}
\end{aligned}$$

**KDF mục đích**: chủ ý làm chậm function xuống $\approx 100\text{ms}$. Brute force: $100\text{ms} \times 2 \times 10^{11} = 2 \times 10^{10}$ giây $= 630$ năm.

**Salt**: tránh rainbow table (precomputed hash table). Salt $=$ random string unique per user, lưu cùng hash. $\mathrm{SHA\text{-}256}(\text{salt} \,\|\, \text{password})$ khác nhau dù password giống nhau.

### 4.2. PBKDF2 (2000, RFC 2898)

```
DK = PBKDF2(PRF, Password, Salt, c, dkLen)
  PRF: thường là HMAC-SHA256
  c: iteration count (số lần lặp)
  dkLen: output key length
```

**Cơ chế**: lặp c lần HMAC. Mỗi lần dùng output trước làm input. Chỉ tăng được thời gian bằng iteration count — không tăng memory.

**OWASP 2023**: $c \ge 600{,}000$ iterations với SHA-256 $\to \approx 100\text{ms}$ trên CPU thường.

**Nhược điểm**: **ASIC/GPU-friendly**. Attacker dùng custom ASIC có thể hash nhanh hơn CPU 100-1000x → cost advantage giảm 100-1000x.

### 4.3. bcrypt (1999, Niels Provos & David Mazières)

```
bcrypt(password, cost) -> 60-char hash
  cost: 2^cost internal rounds
```

Ví dụ: $\text{cost} = 12 \to 2^{12} = 4096$ rounds $\to \approx 100\text{ms}$.

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
```

Ví dụ: $N = 2^{16}$, $r = 8$, $p = 1 \to \approx 64\text{ MB}$ memory.

**Ưu điểm**: **Memory-hard** — cần nhiều RAM. ASIC cần RAM đắt tiền → cost advantage giảm nhiều hơn bcrypt.

**Nhược điểm**: Khó tune parameters, cache-timing side-channel (N phụ thuộc access pattern).

### 4.5. Argon2 (2015, PHC winner) — Recommended

**Ba variant**:
- **Argon2d**: data-dependent memory → nhanh hơn nhưng vulnerable to timing side-channel. Dùng cho cryptocurrencies.
- **Argon2i**: data-independent → safe for password hashing. Recommended khi không biết side-channel risk.
- **Argon2id**: hybrid — first pass data-independent, rest data-dependent. **Best for passwords**.

```
Argon2id(password, salt, t, m, p) -> hash
  t: time cost (iterations)
  m: memory cost (KB)
  p: parallelism (threads)
```

Recommended: $t = 3$, $m = 65536$ (64MB), $p = 4 \to \approx 100\text{ms}$.

**Ví dụ tính toán**:

Password "password123", Salt $= 16$ random bytes. Argon2id: $t = 3$, $m = 64\text{ MB}$, $p = 4 \to \approx 100\text{ms}$ per attempt.

Attack: 8-char lowercase password, $26^8 \approx 2 \times 10^{11}$ combinations.

$$\begin{aligned}
\text{Time} &= 100\text{ms} \times 2 \times 10^{11} = 2 \times 10^{10} \text{ seconds} \approx 630 \text{ năm} \\
\text{Dù attacker có 1,000 server} &: 630 \text{ năm} / 1{,}000 = 230 \text{ ngày}
\end{aligned}$$

$\Rightarrow$ Vẫn không khả thi với password đủ mạnh.

**Memory hardness**: $64\text{ MB} \times 4$ thread $= 256\text{ MB}$ RAM cho 1 hash attempt. Crack cluster 10,000 GPU cần: $10{,}000 \times 256\text{ MB} = 2.5\text{ TB}$ RAM chỉ để hash đồng thời — cực đắt.

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

$K = $ "secret" $= [\text{0x73}, \text{0x65}, \text{0x63}, \text{0x72}, \text{0x65}, \text{0x74}]$. Pad về 64 bytes: $K_{64} = [\text{0x73}, \text{0x65}, \text{0x63}, \text{0x72}, \text{0x65}, \text{0x74}, \text{0x00}, \ldots, \text{0x00}]$.

$\text{ipad} = [\text{0x36}, \text{0x36}, \ldots, \text{0x36}]$ (64 bytes); $\text{opad} = [\text{0x5c}, \text{0x5c}, \ldots, \text{0x5c}]$ (64 bytes).

$K_\text{inner} = K_{64} \oplus \text{ipad}$:

$$\begin{aligned}
\text{byte 0} &: \text{0x73} \oplus \text{0x36} = \text{0x45} \\
\text{byte 1} &: \text{0x65} \oplus \text{0x36} = \text{0x53} \\
\text{byte 2} &: \text{0x63} \oplus \text{0x36} = \text{0x55} \\
\text{byte 6-63} &: \text{0x00} \oplus \text{0x36} = \text{0x36}
\end{aligned}$$

$K_\text{outer} = K_{64} \oplus \text{opad}$:

$$\begin{aligned}
\text{byte 0} &: \text{0x73} \oplus \text{0x5c} = \text{0x2f} \\
\text{byte 1} &: \text{0x65} \oplus \text{0x5c} = \text{0x39} \\
\text{byte 6-63} &: \text{0x00} \oplus \text{0x5c} = \text{0x5c}
\end{aligned}$$

$\text{inner\_msg} = K_\text{inner} \,\|\, \text{"hello"}$ ($64 + 5 = 69$ bytes), rồi $\text{inner\_hash} = \mathrm{SHA256}(\text{inner\_msg})$.

$\text{final\_msg} = K_\text{outer} \,\|\, \text{inner\_hash}$ ($64 + 32 = 96$ bytes), rồi $\mathrm{HMAC} = \mathrm{SHA256}(\text{final\_msg})$.

### Bài 2

$$\begin{aligned}
& a = 7, c = 3, m = 16, X_0 = 5 \\
X_1 &= (7 \times 5 + 3) \bmod 16 = 38 \bmod 16 = 6 \\
X_2 &= (7 \times 6 + 3) \bmod 16 = 45 \bmod 16 = 13 \\
X_3 &= (7 \times 13 + 3) \bmod 16 = 94 \bmod 16 = 14 \\
X_4 &= (7 \times 14 + 3) \bmod 16 = 101 \bmod 16 = 5
\end{aligned}$$

$X_4 = X_0 = 5 \to$ chu kỳ $= 4$. LCG với $m = 16$ có chu kỳ tối đa 4 (rất ngắn!). Với $m = 2^{32}$, chu kỳ tối đa $\approx 2^{32}$ nếu chọn $a, c$ đúng.

### Bài 3

Vì SHA-256("password") là hằng số, mọi user dùng "password" đều có hash giống nhau. Attacker:
1. Dùng **rainbow table** (precomputed hash → password, lưu sẵn) → tra cứu O(1).
2. Rainbow table phổ biến cho SHA-256 của 1 tỷ password thông dụng đã tồn tại sẵn.

Salt fix điều này: $\mathrm{SHA\text{-}256}(\text{salt} \,\|\, \text{"password"})$ khác nhau với mỗi salt $\to$ không dùng rainbow table chung được.

### Bài 4

Các option:
- **Tăng $t$** từ 3 $\to$ 6: $+100\%$ thời gian ($\to 160\text{ms}$). Dễ nhất.
- **Tăng $m$** từ 65536 $\to$ 131072 KB: tăng memory gấp đôi, $+100\%$ thời gian ($\to 160\text{ms}$). Tốt hơn vì cũng tăng memory cost cho attacker.
- **Tăng cả 2**: $t = 4$, $m = 131072 \to \approx 3\text{-}4\times$ chậm hơn.

**Khuyến nghị**: Tăng $m$ trước (memory-hardness là lợi thế chính của Argon2 so với PBKDF2). $t = 3$, $m = 131072$, $p = 4 \to \approx 160\text{ms}$ — vẫn chấp nhận được cho login, nhưng attacker cần gấp đôi RAM.

---

## Bài tiếp theo

[T3-L01: RSA](../../03-AsymmetricApplied/lesson-01-rsa/README.md) — Tầng 3: Asymmetric cryptography. Key exchange không cần shared secret. RSA với số nhỏ (p=11, q=13), padding schemes, attacks.

[visualization.html](./visualization.html)
