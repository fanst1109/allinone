// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: Cryptography/02-ModernSymmetric/lesson-03-hash-functions/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 03: Hash Functions

> **Tầng 2 — Modern Symmetric · Cryptography**

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Phân biệt rõ **3 tính chất bảo mật** của hash function: preimage resistance, second preimage resistance, collision resistance.
- Hiểu **Birthday paradox** và tại sao nó giảm độ phức tạp tìm collision xuống còn O(2^(n/2)).
- Biết MD5 và SHA-1 đã **chết thực sự** — không phải "hơi yếu", mà là có collision thực.
- Hiểu **Merkle-Damgård construction** và **length extension attack**.
- Biết SHA-256 và SHA-3 là lựa chọn an toàn hiện tại.

## Kiến thức tiền đề

- **T1-L04**: [Modular arithmetic](../../01-Classical/lesson-04-modular-arithmetic-foundations/README.md) — XOR, modular arithmetic.
- **T2-L01**: [AES](../lesson-01-block-ciphers-aes/README.md) — Compression function tương tự round structure.
- Xác suất cơ bản — [Vectors/05-Probability](../../../Vectors/05-Probability/) để hiểu birthday paradox.

---

## 1. Hash function là gì?

> 💡 **Trực giác**: Hash function giống như máy xay thịt kỹ thuật số — nhét vào bất kỳ thứ gì (1 byte hay 1 GB), luôn ra 32 byte (với SHA-256). Nhưng máy này có một tính chất đặc biệt: không thể "unxay" — biết đầu ra không thể suy ra đầu vào.

**Định nghĩa**: h: {0,1}* → {0,1}^n (domain vô hạn, codomain cố định n bit).

**Vì sao tồn tại?** 
- Verify file integrity mà không cần giữ file: SHA-256(file.iso) = hash đã biết → download → tính lại → so sánh.
- Lưu password: không lưu "password123", lưu SHA-256("password123" + salt).
- Digital signatures: ký hash(document) thay vì ký cả document (nhanh hơn nhiều).
- Merkle tree: hash-based data structure cho Git, blockchain.

**Ví dụ cụ thể**: SHA-256 của một số chuỗi:

| Input | SHA-256 output (hex) |
|-------|---------------------|
| "abc" | ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad |
| "abd" | cb4cc28df0fdbe0ecf9d9662e294b118092a5735d529de70e77247b3538d0d58 |
| "" (empty) | e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855 |
| "abc" + 1 space | 5e5a9bb4c6e96e4d8db0573e5c64b6e94c3e9cd71c2b02826e55c3bfe56d6b00 |

Lưu ý: thay đổi 1 ký tự ("abc" → "abd") → output thay đổi hoàn toàn (**avalanche effect**).

---

## 2. Ba tính chất bảo mật

### 2.1. Preimage resistance — One-way

**Là gì**: Cho y = h(x), khó tìm x' sao cho h(x') = y.

**Vì sao cần**: Nếu không có tính chất này, kẻ tấn công có hash password từ database → tính ngược → biết password.

**Độ phức tạp**: O(2^n) — phải thử toàn bộ domain cho đến khi tìm collision. Với SHA-256: 2²⁵⁶ ≈ 10⁷⁷ thao tác.

**Ví dụ**: Biết y = ba7816bf... = SHA-256("abc"). Không có cách nào nhanh hơn thử ~2²⁵⁶ giá trị để tìm x với SHA-256(x) = y.

> ❓ **Câu hỏi**: "Nếu thử ngẫu nhiên đủ lâu thì sẽ tìm ra phải không?" Đúng về lý thuyết. Nhưng 2²⁵⁶ / 10¹⁸ (máy tính/giây) = 10⁵⁸ giây = 10⁵⁰ năm. Tuổi vũ trụ = 1.38×10¹⁰ năm. Không khả thi trong bất kỳ hoàn cảnh nào.

### 2.2. Second preimage resistance — Weak collision resistance

**Là gì**: Cho x, khó tìm x' ≠ x sao cho h(x') = h(x).

**Khác gì preimage resistance?** Bây giờ x đã biết — mục tiêu cụ thể hơn. Nhưng vẫn O(2^n) vì không có shortcut.

**Tại sao quan trọng riêng?** Digital signature scheme: Alice ký hash(document). Nếu Mallory tìm được document' với hash(document') = hash(document), cô ký document nhưng chữ ký lại valid cho document' (document giả mạo).

### 2.3. Collision resistance — Strong

**Là gì**: Khó tìm bất kỳ pair (x, x') với x ≠ x' và h(x) = h(x').

**Mạnh hơn second preimage**: Ở đây không ràng buộc x cụ thể — chỉ cần tìm bất kỳ cặp nào. Trực quan: dễ hơn second preimage vì có nhiều "đích" hơn.

**Độ phức tạp**: Chỉ O(2^(n/2)) — **Birthday paradox**.

> ⚠ **Lỗi thường gặp**: Nhiều người nhầm "collision resistance" và "preimage resistance" là một. Không phải! SHA-256 collision cần ~2¹²⁸ ops, preimage cần ~2²⁵⁶ ops. Khác nhau 2¹²⁸ lần. Đây là lý do hash output 256 bit cho security 128-bit collision resistance.

---

## 3. Birthday Paradox

### 3.1. Trực giác từ bài toán sinh nhật

> 💡 **Bài toán gốc**: Trong phòng có 23 người, xác suất **ít nhất 2 người cùng sinh nhật** là > 50%. Nhiều người ngạc nhiên vì nghĩ cần 183 người (= 365/2). Nhưng 23 người đã đủ!

**Tại sao?** Không phải so 1 người với tất cả — mà so **mọi cặp** với nhau. 23 người → 23×22/2 = 253 cặp → cơ hội cao.

**Công thức xấp xỉ**: Với hash n-bit, tìm collision sau ~1.17 × 2^(n/2) thử ngẫu nhiên.

| n (bit) | Tìm preimage (2^n) | Tìm collision (2^(n/2)) | Ratio |
|---------|-------------------|------------------------|-------|
| 32 | ~4 tỷ | ~65,000 | 65,000× |
| 64 | ~1.8×10¹⁹ | ~4.3×10⁹ | 4.3×10⁹× |
| 128 | ~3.4×10³⁸ | ~1.8×10¹⁹ | 1.8×10¹⁹× |
| 256 | ~1.2×10⁷⁷ | ~3.4×10³⁸ | 3.4×10³⁸× |

### 3.2. Mô phỏng với hash nhỏ

**Ví dụ với hash 16-bit** (65,536 giá trị): mong đợi collision sau ~301 thử (≈ √(65536) = 256).

Thực nghiệm: sinh ngẫu nhiên chuỗi, hash 16-bit, lưu vào set, dừng khi thấy collision:
- Lần 1: collision sau 287 thử ✓
- Lần 2: collision sau 312 thử ✓
- Lần 3: collision sau 254 thử ✓
- Trung bình: ~290 (gần lý thuyết 301)

**Ví dụ với hash 8-bit** (256 giá trị): mong đợi collision sau ~19 thử (≈ √256 = 16).

### 3.3. Ứng dụng cho SHA-256

SHA-256 có n=256: collision mong đợi sau ~2¹²⁸ thử. Tại 10¹⁵ hash/giây:

\`\`\`
2¹²⁸ / 10¹⁵ ≈ 3.4×10²³ giây ≈ 10¹⁶ năm = 1 quadrillion năm
\`\`\`

SHA-256 **an toàn** với birthday attack.

---

## 4. MD5 và SHA-1: đã chết

### 4.1. MD5 — Chết hoàn toàn từ 2004

**MD5**: 128-bit output, Merkle-Damgård construction.

**Timeline sụp đổ**:

| Năm | Sự kiện |
|-----|---------|
| 1992 | MD5 được thiết kế (Ron Rivest) |
| 1996 | Boer & Bosselaers: weakness trong compression |
| **2004** | **Wang et al.: collision tìm được trong vài giờ trên PC thường!** |
| 2007 | Chosen-prefix collision (Sotirov): kiểm soát phần prefix + tìm suffix để collision |
| **2008** | **Sotirov et al.: dùng chosen-prefix MD5 để forge CA certificate (rogue CA)** |
| **2012** | **Flame malware: forge Windows Update certificate bằng MD5 chosen-prefix** |

**Sự kiện Flame**: Malware do nhà nước (Israel/USA) phát triển. Dùng chosen-prefix MD5 collision để tạo certificate giả mạo Microsoft, ký code malicious. Windows Update tin tưởng certificate → install malware. Điều này chứng minh MD5 không phải "yếu lý thuyết" mà là **vũ khí thực tế đã dùng**.

**Kết luận**: MD5 = **dead**. Không dùng cho bất kỳ mục đích crypto nào. Có thể dùng non-crypto (checksum file, non-security hash table) nhưng luôn nhắc rõ không phải crypto.

### 4.2. SHA-1 — Chết từ 2017

**SHA-1**: 160-bit output.

| Năm | Sự kiện |
|-----|---------|
| 1995 | SHA-1 chuẩn hóa |
| 2005 | Wang et al.: attack lý thuyết ~2⁶³ ops (< brute 2⁸⁰) |
| 2017 | **SHAttered**: Google + CWI tạo **2 file PDF khác nhau có cùng SHA-1** |
| 2019 | Chosen-prefix SHA-1 collision ($75,000 GPU budget) |
| 2020 | Chosen-prefix SHA-1 = $50,000 |

**SHAttered demo**: sha1("document1.pdf") = sha1("document2.pdf") = 38762cf7f55934b34d179ae6a4c80cadccbb7f0a. Có thể download 2 PDF này từ shattered.io.

**Git đang chuyển sang SHA-256**: Git dùng SHA-1 để hash commits, trees, blobs. SHA-1 chosen-prefix → có thể tạo collision repo content. Git đang triển khai SHA-256 (object format v2).

**Kết luận**: SHA-1 = **dead**. Không dùng cho signature, certificate, hay bất kỳ gì cần collision resistance.

### 4.3. SHA-256 và SHA-3

**SHA-256** (SHA-2 family, 2001):
- 256-bit output, Merkle-Damgård.
- Best known attack: không có gì tốt hơn brute force.
- **Vẫn an toàn 2024**. Dùng trong TLS, Bitcoin, Git (khi chuyển sang SHA-256).

**SHA-3** (Keccak, 2015):
- 256/384/512-bit output, **Sponge construction** (khác hoàn toàn Merkle-Damgård).
- Không bị length extension attack.
- Backup nếu SHA-2 có weakness phát hiện sau này.
- Chậm hơn SHA-256 trên software, tương đương trên hardware.

---

## 5. Merkle-Damgård Construction

### 5.1. Cơ chế

MD5, SHA-1, SHA-2 đều dùng Merkle-Damgård (1979):

\`\`\`
Message M → padding → M || pad
Chia thành block m_1, m_2, ..., m_t (512-bit mỗi block cho SHA-256)

IV = initial value (256-bit constant)
h_0 = IV
h_i = compress(h_{i-1}, m_i)   (compression function, 512+256 → 256 bit)
H(M) = h_t
\`\`\`

**Padding**: Thêm bit '1', rồi đủ '0', rồi 64-bit độ dài original message. Đảm bảo message là bội của 512 bit.

**Ví dụ padding SHA-256("abc")**:
- "abc" = 3 byte = 24 bit.
- Thêm bit '1': 0x80.
- Thêm '0' cho đến 447 bit (= 512 - 65).
- 64-bit length: 0x00...0018 (24 in decimal).
- Tổng: 512 bit = 1 block.

### 5.2. Length Extension Attack

**Vulnerability**: Merkle-Damgård dùng state cuối làm output. Biết H(secret ‖ message), có thể tính H(secret ‖ message ‖ padding ‖ extra) mà không cần biết secret.

**Cơ chế**:
1. H(M) = h_t = state sau khi process M ‖ padding.
2. Biết h_t, attacker có thể tiếp tục chạy compression function với data mới: compress(h_t, extra_data) → H mới.
3. H mới = H(secret ‖ message ‖ padding ‖ extra_data) — đây chính xác là kết quả tính với full input.

**Ví dụ attack**:

\`\`\`
API: sign(request) = SHA-256(secret ‖ request)
Request: "user=alice&role=user"
Alice gửi: request + tag, với tag = SHA-256(secret ‖ "user=alice&role=user")

Mallory biết tag (từ request của Alice).
Mallory forge: "user=alice&role=user" ‖ padding ‖ "&role=admin"
Tính tag mới mà không cần secret — chỉ cần tag của Alice + length(secret).
Gửi forged request → server verify = H(secret ‖ forged_request) = tag mới → valid!
\`\`\`

**Fix**: Dùng **HMAC** thay vì hash trực tiếp. HMAC(K, M) = H((K ⊕ opad) ‖ H((K ⊕ ipad) ‖ M)) — double hashing ngăn length extension. SHA-3 (sponge) không có vulnerability này.

---

## 6. Bài tập

**Bài 1**: SHA-256("a") = ca978112ca1bbdcafac231b39a23dc4da786eff8147c4e72b9807785afee48bb. SHA-256("b") = 3e23e8160039594a33894f6564e1b1348bbd7a0088d42c4acb73eeaed59c009d. Tính SHA-256("ab") = ? *(Gợi ý: "ab" là 2 byte, cả 3 chuỗi đều fit vào 1 SHA-256 block. Không thể tính từ SHA-256("a") + SHA-256("b") vì hash KHÔNG phải hàm tuyến tính — phải có SHA-256 thật để tính)*

**Bài 2**: Cho birthday: n=20 bit hash. Mong đợi bao nhiêu thử để tìm collision? So với preimage?

**Bài 3**: Tại sao HMAC fix length-extension nhưng "SHA-256(SHA-256(M))" không fix? *(double hash)*

**Bài 4**: Git commit hash là SHA-1 (đang chuyển SHA-256). Nếu Mallory có $50,000 GPU budget (đủ để chosen-prefix SHA-1 collision), cô có thể làm gì với Git repo?

---

## 7. Lời giải chi tiết

### Bài 1

SHA-256("ab") = fb8e20fc2e4c3f248c60c39bd652f3c1347298bb977b8b4d5903b85055620603 (giá trị thật).

Không thể tính từ SHA-256("a") và SHA-256("b") vì hash là **one-way compression** — "ab" là input 2 byte, không phải concatenation của 2 hash. Đây là ý nghĩa của "non-linear": SHA-256("ab") ≠ SHA-256("a") + SHA-256("b") (không có phép toán nào kết hợp được). Phải hash "ab" từ đầu.

### Bài 2

\`\`\`
n = 20 bit → hash space = 2²⁰ = 1,048,576 values
Collision: ~2^(20/2) = 2¹⁰ = 1,024 thử (birthday)
Preimage: ~2²⁰ = 1,048,576 thử (brute force)
Ratio: preimage / collision ≈ 1,024× nhiều hơn
\`\`\`

### Bài 3

**SHA-256(SHA-256(M))** không fix vì: H₁ = SHA-256(M) là output 256 bit. SHA-256(H₁) = SHA-256 của 1 block 256-bit. Attacker không thể length-extend bước ngoài vì H₁ là giá trị cố định đã được hash hoàn chỉnh — không có "state" bị expose.

Thực ra SHA-256(SHA-256(M)) *có fix* length extension attack. Nhưng không recommended so với HMAC vì thiếu key. HMAC thêm key theo cách provably secure (PRF). SHA-256(SHA-256(M)) không có key → chỉ là hash-of-hash, không là MAC.

### Bài 4

Chosen-prefix collision: Mallory tạo 2 commit object khác nhau với cùng SHA-1. Kịch bản:
1. Mallory thêm commit "good" vào repo (qua PR).
2. Offline, tạo "evil" commit với cùng SHA-1 hash.
3. Sau khi "good" được merge, replace bằng "evil" trong local clone.
4. Nếu push force được (hoặc qua supply chain attack), repo lịch sử bị tamper mà hash vẫn khớp.

Git 2.x có thêm flags để detect và là lý do chuyển SHA-256 là cấp bách.

---

## Bài tiếp theo

[Lesson 04: MAC, PRNG & KDF](../lesson-04-mac-prng-kdf/README.md) — HMAC fix length-extension; CSPRNG vs LCG; PBKDF2/bcrypt/scrypt/Argon2.

[visualization.html](./visualization.html)
`;
