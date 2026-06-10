// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: Cryptography/03-AsymmetricApplied/lesson-03-digital-signatures-pki/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 03: Digital Signatures & PKI

> **Tầng 3 — Asymmetric & Applied · Cryptography**

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Phân biệt **integrity**, **authenticity**, và **non-repudiation** — ba tính chất mà chữ ký số cung cấp.
- Giải thích được lý do tại sao **ECDSA k-reuse** phá hủy private key (và Sony PS3 bị hack vì vậy).
- Ký và verify thủ công với RSA nhỏ.
- Mô tả chuỗi **chain of trust**: leaf cert → intermediate CA → root CA.
- Biết các cơ chế revocation: CRL, OCSP, OCSP Stapling, Certificate Transparency.

## Kiến thức tiền đề

- **T3-L01**: RSA keygen, modular exponentiation → [lesson-01-rsa](../lesson-01-rsa/)
- **T3-L02**: ECC, ECDH, discrete log → [lesson-02-diffie-hellman-ecc](../lesson-02-diffie-hellman-ecc/)
- **T2-L03**: Hash functions (SHA-256) → [lesson-03-hash-functions](../../02-ModernSymmetric/lesson-03-hash-functions/)

---

## 1. Tại sao cần chữ ký số?

> 💡 **Trực giác**: Mã hóa giữ bí mật — chỉ người nhận đúng đọc được. Nhưng mã hóa không nói gì về **ai viết** message. Chữ ký số giống con dấu duy nhất của mỗi người: chỉ chủ nhân mới tạo được, ai cũng verify được, và chủ nhân không thể chối (non-repudiation).

**Ba tính chất của chữ ký số**:

1. **Integrity (toàn vẹn)**: Nội dung không bị thay đổi sau khi ký.
2. **Authenticity (xác thực)**: Chắc chắn do người sở hữu private key ký.
3. **Non-repudiation (không thể chối)**: Người ký không thể sau đó nói "tôi không ký điều đó" — vì chỉ họ mới có private key.

❓ **Câu hỏi: Mã hóa bằng private key có phải chữ ký không?**
Với textbook RSA, ký $= m^d \\bmod n$ và verify $= s^e \\bmod n$. Nhưng trong thực tế, không ký thẳng message — ký $H(m)$ (hash của message), vì message thường lớn hơn $n$. Và phải dùng padding scheme.

---

## 2. RSA Signature

### 2.1. Textbook RSA signature (không an toàn)

$$\\begin{aligned}
\\text{Sign:} \\quad & s = H(m)^d \\bmod n\\\\
\\text{Verify:} \\quad & H(m) = s^e \\bmod n
\\end{aligned}$$

> ⚠ **Không dùng textbook RSA signature!** Có các tấn công existential forgery — attacker chọn $s$ ngẫu nhiên, tính $m = s^e \\bmod n$ $\\Rightarrow$ có cặp $(m, s)$ hợp lệ dù attacker không biết $d$.

### 2.2. RSA-PSS (Probabilistic Signature Scheme)

RSA-PSS thêm random salt vào hash trước khi ký → mỗi lần ký cùng message cho chữ ký khác nhau (non-deterministic). Được chứng minh secure trong random oracle model.

### 2.3. Walk-through ký RSA nhỏ

Dùng RSA từ T3-L01: $n=143$, $e=7$, $d=103$. Hash $H(m)=10$ (demo, không phải SHA thật).

**Ký**: $s = 10^{103} \\bmod 143$. Dùng fast exp:

| Bước | Tính | mod 143 |
|------|------|---------|
| 10¹ | 10 | 10 |
| 10² | 100 | 100 |
| 10⁴ | 10000 | 10000−69×143=10000−9867=133 |
| 10⁸ | 133²=17689 | 17689−123×143=17689−17589=100 |
| 10¹⁶ | 100²=10000 | 133 |
| 10³² | 133²=17689 | 100 |
| 10⁶⁴ | 100²=10000 | 133 |
| 10¹⁰³ = 10⁶⁴×10³²×10⁴×10²×10¹ | 133×100=13300 mod 143=13300−93×143=13300−13299=1; 1×133=133; 133×100=13300 mod 143=1; 1×10=10 | **10** |

Thú vị: $s = 10 = H(m)$. Điều này xảy ra vì 10 là "fixed point" của hàm RSA với key này — trong thực tế với số lớn, điều này cực hiếm.

**Verify**: $s^e \\bmod n = 10^7 \\bmod 143$.
- $10^2 = 100$. $10^4 = 100^2 = 10000 \\bmod 143 = 133$. $10^7 = 10^4 \\cdot 10^2 \\cdot 10^1 = 133 \\times 100 \\times 10 \\bmod 143$.
- $133 \\times 100 = 13300 \\bmod 143 = 1$. $1 \\times 10 = 10$. $\\Rightarrow \\mathbf{10 = H(m)}$ ✓.

---

## 3. DSA và ECDSA

### 3.1. DSA (Digital Signature Algorithm)

DSA dựa trên DLP thay vì factoring. Yêu cầu **random k** mỗi lần ký.

**Sign**:
1. Chọn random $k$ trong $[1, q-1]$.
2. $r = (g^k \\bmod p) \\bmod q$.
3. $s = k^{-1} \\cdot (H(m) + r \\cdot d) \\bmod q$.
4. Signature $= (r, s)$.

**Verify**: Tính từ public key, nếu ra cùng $r$ $\\to$ hợp lệ.

### 3.2. ECDSA

Tương tự DSA nhưng trên đường cong elliptic. $k \\cdot G$ cho ra điểm $(x, y)$; $r = x \\bmod n$.

$$\\begin{aligned}
&\\textbf{Sign:}\\\\
&\\quad k = \\text{random in } [1, n-1]\\\\
&\\quad (x_1, y_1) = k \\cdot G\\\\
&\\quad r = x_1 \\bmod n\\\\
&\\quad s = k^{-1} \\cdot (H(m) + r \\cdot d) \\bmod n\\\\
&\\quad \\text{Signature} = (r, s)\\\\[4pt]
&\\textbf{Verify:}\\\\
&\\quad w = s^{-1} \\bmod n\\\\
&\\quad u_1 = H(m) \\cdot w \\bmod n\\\\
&\\quad u_2 = r \\cdot w \\bmod n\\\\
&\\quad (x_1, y_1) = u_1 \\cdot G + u_2 \\cdot Q\\\\
&\\quad \\text{Valid if } r = x_1 \\bmod n
\\end{aligned}$$

### 3.3. Lỗ hổng k-reuse trong ECDSA

> ⚠ **CRITICAL: KHÔNG BAO GIỜ dùng cùng k cho hai chữ ký ECDSA khác nhau!**

**Vấn đề**: Nếu $k$ bị dùng lại cho hai message $m_1$, $m_2$ $\\Rightarrow$ attacker recover private key $d$!

**Chứng minh**:
- $s_1 = k^{-1} \\cdot (H(m_1) + r \\cdot d) \\bmod n$
- $s_2 = k^{-1} \\cdot (H(m_2) + r \\cdot d) \\bmod n$

$r$ giống nhau (vì cùng $k$ $\\to$ cùng $r$).

- $s_1 - s_2 = k^{-1} \\cdot (H(m_1) - H(m_2)) \\bmod n$
- $k = (H(m_1) - H(m_2)) \\cdot (s_1 - s_2)^{-1} \\bmod n$ $\\to$ tìm được $k$!
- $d = (s_1 \\cdot k - H(m_1)) \\cdot r^{-1} \\bmod n$ $\\to$ tìm được private key!

### 3.4. Sony PS3 hack (2010)

fail0verflow phát hiện Sony dùng **constant k** (không ngẫu nhiên!) cho tất cả ECDSA signatures khi ký game. Từ 2 signatures:
1. Thu thập 2 chữ ký $(r_1, s_1)$ và $(r_2, s_2)$ — nhận thấy $r_1 = r_2$ (cùng $k$!).
2. Tính $k$ bằng công thức trên.
3. Tính private key $d$.
4. Có thể ký bất kỳ code nào trông như code Sony $\\to$ jailbreak.

**Fix**: Ed25519 (deterministic $k = \\text{hash}(\\text{message} \\,\\|\\, \\text{private})$) $\\to$ không bao giờ reuse $k$.

---

## 4. Ed25519

Ed25519 = Edwards-curve DSA trên Curve25519.

**Đặc điểm**:
- **Deterministic**: $k = \\text{Hash}(\\text{nonce} \\,\\|\\, \\text{message})$ — không cần CSPRNG, không thể reuse.
- **Constant-time**: Resistant to timing attacks by design.
- **Nhanh**: 140K sign/s, 70K verify/s trên modern CPU.
- **Key nhỏ**: 32-byte private key, 64-byte signature.

| Thuật toán | k | Tốc độ ký | Tốc độ verify | Key size | Deterministic |
|-----------|---|----------|--------------|---------|---------------|
| RSA-2048 | N/A | ~500/s | ~15000/s | 256 byte | ✓ |
| ECDSA-P256 | Ngẫu nhiên | ~15K/s | ~12K/s | 64 byte | ✗ |
| Ed25519 | Deterministic | ~140K/s | ~70K/s | 64 byte | ✓ |

---

## 5. PKI — Public Key Infrastructure

### 5.1. Vấn đề: Ai tin public key của ai?

Nếu Alice muốn verify chữ ký của Bob, Alice cần public key của Bob. Nhưng làm sao Alice biết key đó thật sự là của Bob chứ không phải của Mallory?

**Giải pháp**: Certificate — tài liệu điện tử do bên thứ 3 được tin tưởng ký, xác nhận "public key X thuộc về người/tổ chức Y".

### 5.2. X.509 Certificate

Mỗi certificate (X.509 format) chứa:
- **Subject**: Tên chủ thể (CN, O, OU, C).
- **Issuer**: CA đã ký certificate này.
- **Public key**: Public key của subject.
- **Validity**: notBefore, notAfter.
- **Serial number**: Định danh duy nhất trong CA.
- **Signature**: Chữ ký của CA trên toàn bộ các trường trên.
- **Extensions**: SAN (Subject Alternative Name), Key Usage, Basic Constraints...

### 5.3. Certificate Authority (CA) và Chain of Trust

Hệ thống tin tưởng hoạt động theo chuỗi:

\`\`\`
Root CA (tự ký — self-signed)
  └── Intermediate CA (ký bởi Root CA)
        └── Leaf Certificate (ký bởi Intermediate CA)
              └── Website/Service
\`\`\`

- **Root CA**: CA gốc, certificate tự ký (self-signed). Được **preinstalled** trong OS/browser (Mozilla NSS, Windows Certificate Store, macOS Keychain). Có ~150 root CAs được tin tưởng mặc định.
- **Intermediate CA**: CA trung gian, ký bởi root. Lý do tồn tại: root CA offline (air-gapped), nếu intermediate bị compromise chỉ cần revoke intermediate không cần đổi root.
- **Leaf cert**: Certificate của website/service cụ thể.

**Verify chain**:
1. Browser có leaf cert của server.
2. Verify chữ ký của leaf bằng public key của intermediate CA.
3. Verify chữ ký của intermediate bằng public key của root CA.
4. Root CA đã được preinstall → trusted.

**Ví dụ thực tế: github.com** (2024):
\`\`\`
DigiCert Global Root CA (root, SHA-256, expires 2031)
  └── DigiCert TLS RSA SHA256 2020 CA1 (intermediate)
        └── github.com (leaf, RSA-2048, expires 6/2025)
              SAN: github.com, www.github.com
\`\`\`

### 5.4. Revocation — Thu hồi chứng chỉ

Khi private key bị lộ hoặc CA phát hiện sai sót → cần thu hồi certificate trước khi hết hạn.

**CRL (Certificate Revocation List)**:
- CA publish danh sách serial number đã bị thu hồi.
- Client tải và cache CRL.
- Nhược điểm: CRL có thể lớn, cập nhật chậm (24h−7 ngày), privacy vì client reveal domain đang visit.

**OCSP (Online Certificate Status Protocol)**:
- Client hỏi CA: "Certificate serial X có còn valid không?"
- CA trả lời: good / revoked / unknown.
- Nhược điểm: Lộ domain đang visit cho CA; OCSP server down → hành vi tùy browser (hard fail vs soft fail).

**OCSP Stapling**:
- Server (không phải client) định kỳ query OCSP và đính kèm ("staple") response đã ký vào TLS handshake.
- Client nhận response từ server → không cần query CA trực tiếp.
- Response có chữ ký CA và thời hạn → không thể giả mạo.
- Giải quyết cả privacy và single point of failure.

### 5.5. Certificate Transparency (CT)

Vấn đề: CA bị hack hay rogue CA có thể issue cert cho domain không phải của họ (Diginotar 2011, Comodo 2011).

**CT (RFC 6962)**: Mọi certificate mới phải được ghi vào ít nhất 2 **append-only public logs** trước khi browser chấp nhận. Logs dùng Merkle tree → bất kỳ ai có thể audit.

- Chủ website có thể monitor logs để phát hiện cert không authorized.
- Google Chrome yêu cầu CT từ 2018.

---

## 6. Ví dụ thêm: ECDSA k-reuse với số nhỏ

Setup (đơn giản hóa): $n=11$, $G$ trên curve nhỏ. $H(m_1)=3$, $H(m_2)=7$, $k=4$, $d=9$, $r=2$.

**Ký m₁**: $s_1 = k^{-1} \\cdot (H(m_1) + r \\cdot d) \\bmod n = 4^{-1} \\cdot (3 + 2 \\cdot 9) \\bmod 11 = 3 \\cdot 21 \\bmod 11 = 3 \\cdot (21 \\bmod 11) = 3 \\cdot 10 = 30 \\bmod 11 = \\mathbf{8}$.
($4^{-1} \\bmod 11$: $4 \\times 3 = 12 \\equiv 1 \\to 4^{-1} = 3$ ✓)

**Ký m₂**: $s_2 = k^{-1} \\cdot (H(m_2) + r \\cdot d) \\bmod n = 3 \\cdot (7 + 18) \\bmod 11 = 3 \\cdot 25 \\bmod 11 = 3 \\cdot 3 = 9$. $\\Rightarrow \\mathbf{s_2 = 9}$.

**Attack**: Attacker có $(r, s_1) = (2, 8)$, $(r, s_2) = (2, 9)$, $H(m_1) = 3$, $H(m_2) = 7$.
- $k = (H(m_1) - H(m_2)) \\cdot (s_1 - s_2)^{-1} \\bmod n = (3 - 7) \\cdot (8 - 9)^{-1} \\bmod 11 = (-4) \\cdot (-1)^{-1} \\bmod 11 = 7 \\cdot 10 \\bmod 11 = 70 \\bmod 11 = \\mathbf{4}$ ✓.
- $d = (s_1 \\cdot k - H(m_1)) \\cdot r^{-1} \\bmod n = (8 \\cdot 4 - 3) \\cdot 2^{-1} \\bmod 11 = 29 \\cdot 6 \\bmod 11 = (29 \\bmod 11) \\cdot 6 \\bmod 11 = 7 \\cdot 6 = 42 \\bmod 11 = \\mathbf{9}$ ✓.

---

## 7. Bài tập

**Bài 1**: Dùng RSA $n=143$, $e=7$, $d=103$. Hash $H(m)=25$. Tính chữ ký $s$. Verify $s^7 \\bmod 143 = 25$.

**Bài 2**: ECDSA k-reuse: $n=13$, $k=5$, $d=7$, $r=3$, $H(m_1)=4$, $H(m_2)=9$. Tính $s_1$, $s_2$. Sau đó recover $k$ và $d$ từ $(s_1, s_2, H(m_1), H(m_2), r)$.

**Bài 3**: Mô tả 3 bước verify certificate chain khi bạn truy cập https://example.com.

**Bài 4**: Giải thích tại sao Ed25519 deterministic ngăn k-reuse attack.

---

## 8. Lời giải chi tiết

### Lời giải Bài 1

$s = 25^{103} \\bmod 143$. Tính: $25^2 = 625 = 4 \\times 143 + 53 \\to 53$. $25^4 = 53^2 = 2809 = 19 \\times 143 + 92 \\to 92$. $25^8 = 92^2 = 8464 = 59 \\times 143 + 27 \\to 27$. $25^{16} = 27^2 = 729 = 5 \\times 143 + 14 \\to 14$. $25^{32} = 14^2 = 196 = 1 \\times 143 + 53 \\to 53$. $25^{64} = 53^2 = 2809 = 19 \\times 143 + 92 \\to 92$. $103 = 64 + 32 + 4 + 2 + 1$: $s = 92 \\times 53 \\times 92 \\times 53 \\times 25 \\bmod 143$.
- $92 \\times 53 = 4876 = 34 \\times 143 + 14 \\to 14$. $14 \\times 92 = 1288 = 9 \\times 143 + 1 \\to 1$. $1 \\times 53 = 53$. $53 \\times 25 = 1325 = 9 \\times 143 + 38 \\to 38$.

Hmm, verify: $38^7 \\bmod 143$. $38^2 = 1444 = 10 \\times 143 + 14 \\to 14$. $38^4 = 14^2 = 196 = 1 \\times 143 + 53 \\to 53$. $38^7 = 53 \\times 14 \\times 38 \\bmod 143$. $53 \\times 14 = 742 = 5 \\times 143 + 27 \\to 27$. $27 \\times 38 = 1026 = 7 \\times 143 + 25 \\to \\mathbf{25}$ ✓.

(Nếu dùng viz để tính chính xác hơn sẽ cho $s = 38$.)

### Lời giải Bài 2

$n=13$, $k=5$, $d=7$, $r=3$. $5^{-1} \\bmod 13$: $5 \\times 8 = 40 = 3 \\times 13 + 1 \\to 5^{-1} = 8$.

$s_1 = 5^{-1} \\cdot (4 + 3 \\cdot 7) \\bmod 13 = 8 \\cdot 25 \\bmod 13 = 8 \\cdot (25 \\bmod 13) = 8 \\cdot 12 = 96 \\bmod 13 = 96 - 7 \\times 13 = 96 - 91 = \\mathbf{5}$.
$s_2 = 8 \\cdot (9 + 21) \\bmod 13 = 8 \\cdot 30 \\bmod 13 = 8 \\cdot 4 = 32 \\bmod 13 = \\mathbf{6}$.

Recover: $(s_1 - s_2) = 5 - 6 = -1 \\equiv 12 \\bmod 13$. $(H(m_1) - H(m_2)) = 4 - 9 = -5 \\equiv 8 \\bmod 13$.
$12^{-1} \\bmod 13 = 12$ ($12 \\times 12 = 144 = 11 \\times 13 + 1$ ✓).
$k = 8 \\times 12 \\bmod 13 = 96 \\bmod 13 = \\mathbf{5}$ ✓.
$r^{-1} \\bmod 13$: $3 \\times 9 = 27 = 2 \\times 13 + 1 \\to 3^{-1} = 9$.
$d = (s_1 \\cdot k - H(m_1)) \\cdot r^{-1} \\bmod 13 = (5 \\cdot 5 - 4) \\cdot 9 \\bmod 13 = 21 \\cdot 9 \\bmod 13 = (21 \\bmod 13) \\cdot 9 = 8 \\cdot 9 = 72 \\bmod 13 = 72 - 5 \\times 13 = 72 - 65 = \\mathbf{7}$ ✓.

### Lời giải Bài 3

1. Trình duyệt nhận **leaf cert** của example.com trong TLS handshake. Đọc Issuer = "DigiCert Intermediate CA".
2. Trình duyệt kiểm tra certificate store: có intermediate CA này không? Nếu chưa có, server thường gửi kèm. Verify: chữ ký trên leaf cert bằng public key của intermediate = valid?
3. Intermediate cert có Issuer = "Root CA X". Trình duyệt kiểm tra: Root CA X có trong preinstalled trust store không? Verify chữ ký intermediate bằng root public key. Root CA = self-signed (Root CA ký chính nó).

### Lời giải Bài 4

Ed25519 tạo $k$ bằng deterministic function: $k = \\text{HMAC-SHA512}(\\text{private\\_key} \\,\\|\\, \\text{message})$. Cùng private key + message luôn cho cùng $k$ — nhưng message khác nhau $\\to k$ khác nhau. Không cần CSPRNG, loại bỏ nguy cơ k-reuse do bug hay weak RNG.

---

## Code & Minh họa

- [visualization.html](./visualization.html) — RSA sign/verify, ECDSA k-reuse attack, cert chain visualizer.

## Bài tiếp theo

→ [Lesson 04: TLS & Frontier](../lesson-04-tls-frontier/) — TLS 1.3 handshake, forward secrecy, post-quantum, ZKP.
`;
