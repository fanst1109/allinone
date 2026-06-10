// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: Cryptography/03-AsymmetricApplied/lesson-04-tls-frontier/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 04: TLS 1.3 & Frontier Cryptography

> **Tầng 3 — Asymmetric & Applied · Cryptography**

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Mô tả được từng message trong **TLS 1.3 handshake** (ClientHello → Finished) và vai trò của mỗi bước.
- Giải thích **forward secrecy** — tại sao ephemeral DH đảm bảo past sessions an toàn dù long-term key bị lộ.
- Phát biểu **thuật toán Shor** và tại sao nó đe dọa RSA/ECC/DH.
- Biết 3 thuật toán NIST PQC được chuẩn hóa 2022-2024 và cơ sở toán học.
- Giải thích **Schnorr ZKP**: 3-message protocol để prove knowledge of discrete log.

## Kiến thức tiền đề

- **T3-L01**: RSA → [lesson-01-rsa](../lesson-01-rsa/)
- **T3-L02**: DH, ECC → [lesson-02-diffie-hellman-ecc](../lesson-02-diffie-hellman-ecc/)
- **T3-L03**: Signatures, PKI → [lesson-03-digital-signatures-pki](../lesson-03-digital-signatures-pki/)
- **T2-L04**: HMAC, KDF → [lesson-04-mac-prng-kdf](../../02-ModernSymmetric/lesson-04-mac-prng-kdf/)

---

## 1. TLS 1.3 Handshake — Từng Bước

> 💡 **Trực giác**: TLS giải quyết 3 bài toán cùng lúc: (1) xác thực server (tôi đang nói chuyện với server thật, không phải MITM), (2) thiết lập shared secret (key exchange), (3) bảo mật session (mã hóa + authenticate data). TLS 1.3 làm tất cả trong **1 round-trip** — nhanh hơn TLS 1.2 (2 RTT).

### 1.1. Lịch sử TLS

| Phiên bản | Năm | Trạng thái | Vấn đề |
|-----------|-----|----------|--------|
| SSL 3.0 | 1996 | BROKEN | POODLE attack |
| TLS 1.0 | 1999 | BROKEN/Deprecated | BEAST, POODLE downgrade |
| TLS 1.1 | 2006 | Deprecated (2021) | RC4, SHA-1 |
| TLS 1.2 | 2008 | OK với suite mạnh | Optional PFS, many weak suites |
| TLS 1.3 | 2018 | CURRENT | Mandatory PFS, fewer suites |

### 1.2. TLS 1.3 Handshake (1-RTT)

\`\`\`
Client                                Server
  |                                     |
  |--- ClientHello ─────────────────►  |
  |    cipher_suites, key_share         |
  |    (ECDH public A = a·G)            |
  |                                     |
  |  ◄─────────────── ServerHello ─────|
  |    chosen_suite, key_share          |
  |    (ECDH public B = b·G)            |
  |  ◄─────────────── {Certificate} ───|
  |  ◄─────────────── {CertVerify} ────|   (sig trên transcript hash)
  |  ◄─────────────── {Finished} ──────|   (HMAC trên handshake)
  |                                     |
  |--- Finished ─────────────────────► |
  |    (HMAC trên handshake)            |
  |                                     |
  |=== Application Data (AEAD) ========|
\`\`\`

Dấu \`{}\` = đã mã hóa bằng handshake keys.

### 1.3. Chi tiết từng message

**ClientHello**:
- \`cipher_suites\`: danh sách supported (e.g., TLS_AES_128_GCM_SHA256).
- \`key_share\`: một hoặc nhiều ECDH public values (ứng với các group names: x25519, secp256r1).
- \`supported_groups\`, \`signature_algorithms\`, \`versions\`.

**ServerHello**:
- Chọn cipher suite và key share group.
- Gửi ECDH public value của server.
- Sau đây ECDHE shared secret = ECDH(client_private, server_public).

**Deriving Keys (HKDF)**:

\`\`\`
HKDF-Extract(salt=0, IKM=0)  →  early_secret
HKDF-Extract(salt=early_secret, IKM=ECDHE_secret)  →  handshake_secret
HKDF-Expand(handshake_secret, "c hs traffic")  →  client_handshake_key
HKDF-Expand(handshake_secret, "s hs traffic")  →  server_handshake_key
HKDF-Expand(handshake_secret, ...)  →  master_secret
HKDF-Expand(master_secret, "c ap traffic")  →  client_application_key
HKDF-Expand(master_secret, "s ap traffic")  →  server_application_key
\`\`\`

**Certificate**: Server's X.509 certificate.

**CertVerify**: Server ký **transcript hash** (hash của toàn bộ handshake đến thời điểm này) bằng private key từ certificate. Xác thực: "server này sở hữu private key tương ứng với certificate."

**Finished**: HMAC của transcript hash bằng handshake key. Xác nhận cả hai bên đã nhận đúng message.

### 1.4. AEAD Encryption (Application Data)

TLS 1.3 chỉ hỗ trợ AEAD:
- **AES-128-GCM, AES-256-GCM**: AES trong GCM mode.
- **ChaCha20-Poly1305**: Nhanh trên thiết bị không có AES-NI.

Mỗi record có **nonce** = IV XOR sequence_number. Hết sequence → phải renew key (key update).

### 1.5. Walk-through với số nhỏ (toy)

Giả sử ECDH trên curve nhỏ. $G$ = base point, $a$ = client secret, $b$ = server secret.

- **Client gửi**: $A = a \\cdot G$
- **Server gửi**: $B = b \\cdot G$
- **Shared ECDHE**: $K = a \\cdot B = b \\cdot A = (ab) \\cdot G$

Từ $K$ $\\to$ HKDF $\\to$ handshake_key, app_key. $K$ chỉ tồn tại trong RAM handshake — xóa ngay sau khi derive keys.

---

## 2. Forward Secrecy

> 💡 **Trực giác**: Tưởng tượng ghi lại mọi encrypted traffic hôm nay. Nếu server private key bị lộ năm sau, liệu attacker giải mã được không?

**Không có PFS (TLS 1.2 với RSA key exchange)**:
- Client encrypt pre-master-secret bằng server public key.
- Nếu server private key bị lộ sau này → giải mã được pre-master-secret → giải mã toàn bộ session.

**Có PFS (ECDHE)**:
- Session key derive từ ephemeral ECDH (a, b random mỗi session).
- a, b bị xóa ngay sau handshake.
- Server private key chỉ dùng để xác thực certificate, không liên quan đến session key.
- Lộ server private key → không giải mã được past sessions.

**TLS 1.3 bắt buộc PFS** — chỉ hỗ trợ DHE/ECDHE key exchange.

❓ **Câu hỏi: Tại sao không phải TLS 1.2 cũng mandatory PFS?**
TLS 1.2 hỗ trợ cả RSA key exchange (không PFS) và DHE/ECDHE (PFS). Tùy server config. TLS 1.3 loại bỏ RSA key exchange hoàn toàn — không còn optional.

---

## 3. Post-Quantum Cryptography

### 3.1. Mối đe dọa từ máy tính lượng tử

**Thuật toán Shor (1994)**: Chạy trên quantum computer, factor $n$ trong $O((\\log n)^3)$ — polynomial!

Hệ quả:
- RSA-2048: Máy tính cổ điển cần $\\sim 2^{90}$ ops. Máy lượng tử $\\to$ polynomial $\\to$ PHẢI broken.
- DH, ECDH, ECDSA: Đều dựa trên DLP/ECDLP $\\to$ Shor giải trong polynomial time.
- **Tất cả public-key crypto hiện tại đều bị phá bởi Shor.**

**Grover's algorithm**: Tìm kiếm database không có cấu trúc trong $O(\\sqrt{N})$ thay vì $O(N)$. Giảm security của AES-128 từ $2^{128}$ xuống $2^{64}$ — không break, chỉ làm yếu đi. Fix: tăng key size (AES-256 $\\to 2^{128}$ effective với Grover).

**Timeline**:
- "Cryptographically relevant quantum computer" (CRQC) — đủ qubits và coherence time để factor RSA-2048: ước tính ~2030-2035.
- Harvest Now, Decrypt Later (HNDL): Adversary collect encrypted traffic hôm nay, decrypt khi có CRQC.
- → **Cần deploy PQC ngay hôm nay** cho long-lived secrets.

### 3.2. NIST PQC Standardization (2022-2024)

NIST khởi động 2016, round 3 hoàn thành 2022, chuẩn hóa 2024:

**CRYSTALS-Kyber (FIPS 203) — Key Encapsulation**:
- Cơ sở: Learning With Errors (LWE) và Module-LWE trên lattice.
- **Key sizes**: Kyber-512 (128-bit): pubkey=800B, ciphertext=768B. Kyber-768 (192-bit): pubkey=1184B, ct=1088B.
- Nhanh, nhỏ, efficient.

**CRYSTALS-Dilithium (FIPS 204) — Signature**:
- Cơ sở: Module-LWE + Module-SIS.
- Dilithium-2: pubkey=1312B, sig=2420B. Dilithium-3: pubkey=1952B, sig=3293B.
- Nhanh.

**SPHINCS+ (FIPS 205) — Signature (conservative backup)**:
- Cơ sở: Hash functions only — an toàn kể cả nếu LWE sai.
- Chậm hơn, signature lớn hơn.
- **SPHINCS+-SHA2-128f**: sig=17088B.

**Falcon (FIPS 206) — Signature**:
- Cơ sở: NTRU lattice.
- Signature nhỏ (~666B) nhưng implementation phức tạp (Gaussian sampling cần constant-time care).

### 3.3. So sánh key sizes: Classical vs PQ

| Thuật toán | Loại | Pubkey | Signature/CT | Security |
|-----------|------|--------|-------------|---------|
| RSA-2048 | Classical | 256 B | 256 B | 112-bit (classical) |
| ECDSA-P256 | Classical | 64 B | 64 B | 128-bit (classical) |
| Ed25519 | Classical | 32 B | 64 B | 128-bit (classical) |
| Kyber-768 | KEM (PQ) | 1,184 B | 1,088 B (ct) | 192-bit (PQ) |
| Dilithium-3 | Sig (PQ) | 1,952 B | 3,293 B | 192-bit (PQ) |
| SPHINCS+-128f | Sig (PQ) | 32 B | 17,088 B | 128-bit (PQ) |

> ⚠ **Hybrid approach**: Hiện tại TLS 1.3 với Chrome/Firefox deploy X25519Kyber768 — Hybrid KEM dùng cả ECDH (chống classical) VÀ Kyber (chống quantum). Nếu một bên bị break, bên kia vẫn bảo vệ.

---

## 4. Zero-Knowledge Proofs (ZKP)

### 4.1. Khái niệm

**Zero-knowledge proof**: Prover chứng minh biết một bí mật $x$ mà không tiết lộ $x$.

Ba tính chất:
1. **Completeness**: Nếu Prover biết $x$, Verifier chấp nhận.
2. **Soundness**: Nếu Prover không biết $x$, Verifier reject (xác suất cao).
3. **Zero-knowledge**: Verifier không học được gì về $x$ ngoài việc "Prover biết $x$."

> 💡 **Trực giác**: Ali Baba cave problem. Peggy biết từ khóa để mở cửa trong hang. Để prove điều này với Victor mà không tiết lộ từ khóa: Victor đứng ngoài, Peggy đi vào một trong hai nhánh. Victor chọn ngẫu nhiên "A" hoặc "B" (bên muốn Peggy ra). Nếu Peggy biết từ khóa, luôn ra đúng bên. Lặp 20 lần $\\to$ xác suất đoán may $= (1/2)^{20} \\approx 1/1$ triệu.

### 4.2. Schnorr Identification Protocol

Prove knowledge of $x$ where $y = g^x \\bmod p$, without revealing $x$.

**Setup**: Public $(g, p, y = g^x \\bmod p)$. Prover biết $x$.

**Protocol (3 messages)**:

1. **Commit**: Prover chọn random $r$, tính $R = g^r \\bmod p$. Gửi $R$ cho Verifier.
2. **Challenge**: Verifier chọn random challenge $c$.
3. **Response**: Prover tính $s = r + c \\cdot x \\bmod (p-1)$. Gửi $s$.

**Verify**: $g^s \\bmod p = R \\cdot y^c \\bmod p$?

**Tại sao đúng?**

$$g^s = g^{r+cx} = g^r \\cdot g^{cx} = R \\cdot (g^x)^c = R \\cdot y^c \\quad \\checkmark$$

**Tại sao zero-knowledge?** Verifier thấy $(R, c, s)$. Từ $(c, s)$ có thể simulate bất kỳ transcript nào mà không cần biết $x$ — chọn $s$ ngẫu nhiên, tính $R = g^s \\cdot y^{-c}$. Transcript $(R, c, s)$ indistinguishable từ real run.

### 4.3. Walk-through Schnorr với số nhỏ

$p = 23$, $g = 5$. $x = 4$ (secret). $y = 5^4 \\bmod 23 = 625 \\bmod 23 = 4$. (Vì $625 = 27 \\times 23 + 4$ ✓)

**Commit**: Prover chọn $r = 6$. $R = 5^6 \\bmod 23 = 8$ (từ bài DH).

**Challenge**: Verifier gửi $c = 3$.

**Response**: $s = r + c \\cdot x = 6 + 3 \\cdot 4 = 18$ (mod $22 = p-1 = 22$). $s = 18$.

**Verify**: $g^s = 5^{18} \\bmod 23$. $5^{16} = ?$

- $5^2 = 2$. $5^4 = 4$. $5^8 = 4^2 = 16$. $5^{16} = 16^2 = 256 = 11 \\times 23 + 3 \\to 3$.
- $5^{18} = 3 \\times 5^2 = 3 \\times 2 = 6$.
- $R \\cdot y^c = 8 \\cdot 4^3 \\bmod 23$. $4^3 = 64 = 2 \\times 23 + 18 \\to 18$. $8 \\times 18 = 144 = 6 \\times 23 + 6 \\to 6$. ✓

Verify: $6 = 6$ ✓. Prover đã prove knowledge of $x=4$ mà không tiết lộ $x$.

### 4.4. Fiat-Shamir Transform: Non-Interactive

Schnorr là interactive (cần Verifier gửi $c$). Fiat-Shamir transform: thay challenge $c = \\text{Hash}(R \\,\\|\\, \\text{message} \\,\\|\\, \\ldots)$. Prover tự tính $c$ từ hash — không cần Verifier. Đây là cơ sở của schnorr signatures trong ed25519.

### 4.5. Hệ thống ZKP nâng cao

| Hệ thống | Proof size | Verify time | Setup | PQ safe | Ứng dụng |
|---------|-----------|------------|-------|---------|---------|
| zk-SNARKs | ~128 bytes | < 1ms | Trusted setup | ✗ (ECC) | Zcash, Ethereum rollups |
| zk-STARKs | ~50KB | ~10ms | Transparent | ✓ (hash-based) | StarkNet |
| Bulletproofs | ~1KB | ~10ms | None | ✗ | Monero, Confidential TXs |
| Schnorr | ~64 bytes | < 1ms | None | ✗ | Bitcoin taproot, Ed25519 |

---

## 5. Homomorphic Encryption và MPC (giới thiệu)

### 5.1. Homomorphic Encryption (HE)

**Ý tưởng**: Tính trên ciphertext mà không cần decrypt.

$$\\begin{aligned}
\\text{HE\\_Enc}(a) \\oplus \\text{HE\\_Enc}(b) &= \\text{HE\\_Enc}(a + b) && \\text{(additive)}\\\\
\\text{HE\\_Enc}(a) \\otimes \\text{HE\\_Enc}(b) &= \\text{HE\\_Enc}(a \\times b) && \\text{(multiplicative)}
\\end{aligned}$$

**Fully HE (FHE)**: hỗ trợ cả $+$ và $\\times$. Craig Gentry 2009 — chứng minh FHE khả thi.

Thực tế: FHE hiện tại chậm $\\sim 10^6$ lần so với plaintext computation. Đang cải thiện nhanh.

Ứng dụng: Cloud compute on private medical data, privacy-preserving ML.

### 5.2. Multi-party Computation (MPC)

$N$ bên tính $f(x_1, x_2, \\ldots, x_n)$ mà không ai biết input của người khác.

Ví dụ: "Ai có mức lương cao nhất?" mà không ai tiết lộ lương cụ thể.

Cơ chế: Secret sharing (Shamir's Secret Sharing) — chia bí mật thành n phần, cần k phần để reconstruct. Combine với garbled circuits hoặc oblivious transfer.

Ứng dụng: Threshold signatures (Bitcoin multisig), auction without revealing bids, privacy-preserving voting.

---

## 6. Bài tập

**Bài 1**: TLS 1.3: Liệt kê theo thứ tự 6 message trong handshake và mục đích của mỗi cái.

**Bài 2**: Schnorr ZKP: $p=7$, $g=3$, $x=2$, $y = 3^2 = 2 \\bmod 7$. Prover chọn $r=3$. Tính $R$. Verifier gửi $c=2$. Tính $s$. Verify.

**Bài 3**: Tại sao Grover's algorithm không "phá" AES-256 giống Shor "phá" RSA?

**Bài 4**: Giải thích "Harvest Now, Decrypt Later" và tại sao cần deploy PQC ngay cả khi CRQC chưa tồn tại.

---

## 7. Lời giải chi tiết

### Lời giải Bài 1

1. **ClientHello**: cipher_suites, ECDH key_share ($A = a \\cdot G$), versions.
2. **ServerHello**: chosen suite, ECDH key_share ($B = b \\cdot G$). Sau đây derive handshake keys từ ECDHE.
3. **Certificate**: Server's X.509 cert (encrypted với handshake key).
4. **CertVerify**: Chữ ký trên transcript hash bằng private key từ cert → prove server owns cert.
5. **Finished (server)**: HMAC trên toàn bộ handshake → integrity.
6. **Finished (client)**: HMAC tương tự → xác nhận client nhận đúng. Sau đây switch sang application keys.

### Lời giải Bài 2

$p=7$, $g=3$, $x=2$. $y = 3^2 \\bmod 7 = 9 \\bmod 7 = 2$. $r=3$. $R = 3^3 \\bmod 7 = 27 \\bmod 7 = 6$. $c=2$. $s = r + c \\cdot x = 3 + 2 \\cdot 2 = 7 \\bmod (p-1) = 7 \\bmod 6 = \\mathbf{1}$.

Verify: $g^s = 3^1 \\bmod 7 = 3$. $R \\cdot y^c = 6 \\cdot 2^2 \\bmod 7 = 6 \\cdot 4 = 24 \\bmod 7 = 24 - 3 \\times 7 = 24 - 21 = \\mathbf{3}$ ✓.

### Lời giải Bài 3

Grover's algorithm là quadratic speedup ($\\sqrt{N}$) — giảm nửa security bits. AES-256: $2^{256} \\to 2^{128}$ với Grover. Vẫn $2^{128}$ — không feasible.

Shor là **exponential to polynomial** speedup — với RSA, thuật toán cổ điển cần $\\sim 2^{90}$ ops, Shor cần $O((\\log n)^3)$ $\\to$ giảm từ $2^{90}$ xuống vài nghìn ops. Đây là **qualitative** change, không chỉ quantitative.

### Lời giải Bài 4

Adversary có thể thu thập và lưu trữ encrypted traffic hôm nay — TLS sessions, emails, etc. Dữ liệu này encrypted bằng ECDHE/RSA. Khi CRQC xuất hiện (~2030s), dùng Shor để factor RSA hoặc giải ECDLP → decrypt toàn bộ traffic đã lưu.

Dữ liệu có long-lived sensitivity (state secrets, medical records, intellectual property) có thể bị lộ. Deploy PQC (Kyber, Dilithium) ngay hôm nay đảm bảo traffic thu thập hôm nay không bị decrypt sau này — kể cả khi CRQC chưa tồn tại.

---

## Code & Minh họa

- [visualization.html](./visualization.html) — TLS 1.3 handshake animation, HKDF key derivation, Schnorr ZKP demo, PQ key size comparison.

## Kết thúc Cryptography

Bạn đã hoàn thành toàn bộ lộ trình Cryptography — từ Caesar cipher đến TLS 1.3 và post-quantum. Tiếp theo:
- [Databases (password storage)](../../../Databases/02-Intermediate/lesson-03-transaction-acid/README.md) — áp dụng KDF (Argon2, bcrypt) trong thực tế.
- Khi học Networking: TLS được dùng ở mọi nơi — HTTPS, SMTP/S, SSH (dựa trên DH+signatures tương tự).
`;
