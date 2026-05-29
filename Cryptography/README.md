# Cryptography — Mật mã học

Lĩnh vực này tiếp cận crypto theo lối **constructive — phá rồi xây**: bắt đầu từ Caesar dễ bẻ trong 30 giây bằng tay → đi tới RSA an toàn trước máy tính cổ điển. Mỗi bài có ít nhất một cipher/protocol mà người học **tự thực hiện bằng tay với số nhỏ** trước khi nhìn version production.

## Triết lý

- **Bằng tay trước, library sau**: RSA tính được với p=11, q=13 trên slider; AES-128 hiển thị từng round; SHA-256 chạy block-by-block. Trải nghiệm "tôi tự encrypt được" là khác biệt cốt lõi.
- **Phá để hiểu xây**: mỗi cipher đời đầu có viz "tấn công" — Caesar bẻ bằng tần số chữ, Vigenère bẻ bằng Kasiski, ECB lộ pattern (ECB-Penguin), length extension bẻ MD5/SHA1 vanilla.
- **Định lượng security**: không "rất khó", mà *bao nhiêu phép tính*. AES-128 brute = 2¹²⁸ ≈ 3.4×10³⁸; RSA-2048 factor ~ 2⁹⁰ ops; SHA-256 collision ~ 2¹²⁸ (birthday).
- **Cập nhật**: nhắc rõ DES dead, MD5/SHA1 hỏng, RC4 deprecated, TLS 1.0/1.1 bị reject. Không "giả vờ moderne" rồi để người học áp RC4 vào code.

## Lộ trình 3 tầng × 4 bài

### Tầng 1 — Classical Cryptography (4 bài)

| # | Bài | Chủ đề |
|---|------|--------|
| 01 | [Caesar & substitution](./01-Classical/lesson-01-caesar-substitution/) | Shift cipher, monoalphabetic substitution, frequency analysis (Al-Kindi) |
| 02 | [Vigenère & polyalphabetic](./01-Classical/lesson-02-vigenere-polyalphabetic/) | Vigenère cipher, Kasiski test, index of coincidence (Friedman) |
| 03 | [One-time pad & perfect secrecy](./01-Classical/lesson-03-one-time-pad-perfect-secrecy/) | OTP, Shannon's perfect secrecy, key reuse attack (Venona) |
| 04 | [Modular arithmetic foundations](./01-Classical/lesson-04-modular-arithmetic-foundations/) | Mod, gcd, Euclidean, modular inverse, Fermat little, Euler totient, fast exp |

### Tầng 2 — Modern Symmetric (4 bài)

| # | Bài | Chủ đề |
|---|------|--------|
| 01 | [Block ciphers & AES](./02-ModernSymmetric/lesson-01-block-ciphers-aes/) | SPN, AES-128 round (SubBytes/ShiftRows/MixColumns/AddRoundKey); DES history |
| 02 | [Modes of operation](./02-ModernSymmetric/lesson-02-modes-of-operation/) | ECB (BAD/penguin), CBC, CTR, GCM (AEAD); bit-flip attacks |
| 03 | [Hash functions](./02-ModernSymmetric/lesson-03-hash-functions/) | Preimage/2nd-preimage/collision; SHA-256; birthday paradox; MD5/SHA1 dead |
| 04 | [MAC, PRNG & KDF](./02-ModernSymmetric/lesson-04-mac-prng-kdf/) | HMAC, length-extension fix; CSPRNG; PBKDF2/bcrypt/scrypt/Argon2 |

### Tầng 3 — Asymmetric & Applied (4 bài)

| # | Bài | Chủ đề |
|---|------|--------|
| 01 | [RSA](./03-AsymmetricApplied/lesson-01-rsa/) | Keygen, encrypt/decrypt với số nhỏ (p=11, q=13); padding (PKCS#1, OAEP); attacks |
| 02 | [Diffie-Hellman & ECC](./03-AsymmetricApplied/lesson-02-diffie-hellman-ecc/) | DH key exchange, discrete log; ECC point add (Curve25519); ECDH |
| 03 | [Digital signatures & PKI](./03-AsymmetricApplied/lesson-03-digital-signatures-pki/) | RSA-PSS, ECDSA, Ed25519; certificates, chain of trust, revocation |
| 04 | [TLS & frontier](./03-AsymmetricApplied/lesson-04-tls-frontier/) | TLS 1.3 handshake, forward secrecy; post-quantum (Kyber, Dilithium), ZKP intro |

## Kiến thức tiền đề

- **Bắt buộc**: [`Math/01-Arithmetic-Algebra`](../Math/01-Arithmetic-Algebra/) (modular arithmetic), [`DataFoundations/01-NumberRepresentation`](../DataFoundations/01-NumberRepresentation/) (binary, hex, XOR), [`DataFoundations/03-Logic`](../DataFoundations/03-Logic/) (boolean).
- **Khuyến nghị**: [`Math/05-NumberTheory-Combinatorics-Logic`](../Math/05-NumberTheory-Combinatorics-Logic/) (Euler totient, Fermat little theorem), [`Algorithms/`](../Algorithms/) (Big-O cho security analysis).
- **Bổ trợ**: [`Vectors/05-Probability`](../Vectors/05-Probability/) (birthday attack analysis).

## Liên kết chéo

| Bài | Link sang |
|-----|-----------|
| T1 L01 (frequency) | [`Statistics/01-Descriptive/lesson-04-distribution-viz`](../Statistics/01-Descriptive/lesson-04-distribution-viz/) (histogram) |
| T1 L03 (OTP/Shannon) | [`Vectors/05-Probability/lesson-08-cross-entropy-kl`](../Vectors/05-Probability/lesson-08-cross-entropy-kl/) (information theory) |
| T1 L04 (modular) | [`Math/05-NumberTheory-Combinatorics-Logic`](../Math/05-NumberTheory-Combinatorics-Logic/) |
| T2 L03 (birthday) | [`Vectors/05-Probability/lesson-06-expectation-variance`](../Vectors/05-Probability/lesson-06-expectation-variance/) |
| T2 L04 (KDF) | [`Databases/02-Intermediate/lesson-03-transaction-acid`](../Databases/02-Intermediate/lesson-03-transaction-acid/) (password storage) |
| T3 L01 (RSA security) | [`Math/05`](../Math/05-NumberTheory-Combinatorics-Logic/), [`Algorithms/`](../Algorithms/) |
| T3 L02 (DH/ECC) | [`Vectors/04-LinearAlgebra`](../Vectors/04-LinearAlgebra/) (group theory thoáng qua) |

## Cách học hiệu quả

1. **Mở `visualization.html`** trước — slide key của Caesar, chạy frequency analyzer, encrypt RSA với số nhỏ trên trang.
2. **Đọc README** để hiểu cơ chế + walk-through bằng tay.
3. **Thử "tấn công"**: mỗi cipher đời đầu có viz attack — chạy thử để hiểu vì sao nó hỏng.
4. **Làm bài tập** cuối README, đối chiếu lời giải.

Bắt đầu: [Tầng 1 — Classical](./01-Classical/index.html).
