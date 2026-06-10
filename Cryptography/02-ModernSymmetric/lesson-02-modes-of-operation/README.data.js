// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: Cryptography/02-ModernSymmetric/lesson-02-modes-of-operation/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 02: Modes of Operation

> **Tầng 2 — Modern Symmetric · Cryptography**

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Hiểu tại sao block cipher một mình không đủ để mã hóa message dài — cần **mode of operation**.
- Biết ECB là tệ như thế nào qua demo **ECB-Penguin**.
- Nắm cơ chế CBC (chaining), CTR (counter-based), GCM (authenticated).
- Hiểu **bit-flip attack** trên CTR và **padding oracle attack** trên CBC.
- Phân biệt **authenticated encryption (AEAD)** và encryption đơn thuần.

## Kiến thức tiền đề

- **T2-L01**: [Block ciphers & AES](../lesson-01-block-ciphers-aes/README.md) — AES round, XOR.
- XOR properties: $A \\oplus A = 0$; $A \\oplus 0 = A$; $(A \\oplus B) \\oplus B = A$.
- **T1-L04**: [Modular arithmetic](../../01-Classical/lesson-04-modular-arithmetic-foundations/README.md) — phép mod cơ bản.

---

## 1. Tại sao cần mode of operation?

> 💡 **Trực giác**: AES chỉ encrypt được đúng 1 block 16 byte. Nếu message dài 1000 byte, ta có 62.5 block — phải encrypt từng cái. Câu hỏi là: 62 block đó có **độc lập** với nhau không, hay cần liên kết? Câu trả lời quyết định toàn bộ security của scheme.

**Vấn đề đặt ra**: Encrypt file ảnh 10MB = 625,000 block AES. Nếu mỗi block encrypt hoàn toàn độc lập với key cố định → 2 block plaintext giống nhau → 2 block ciphertext **giống nhau**. Kẻ tấn công không cần biết key vẫn có thể suy ra thông tin về plaintext từ pattern ciphertext.

---

## 2. ECB — Electronic Codebook (Tệ nhất)

### 2.1. Cơ chế

\`\`\`
P_1  →  [E_K]  →  C_1
P_2  →  [E_K]  →  C_2
P_3  →  [E_K]  →  C_3
...
\`\`\`

Mỗi block encrypt hoàn toàn độc lập. Key giống nhau cho tất cả block.

### 2.2. Vấn đề: Pattern leak

**Bất kỳ 2 block plaintext giống nhau → ciphertext giống nhau**. Điều này vi phạm nguyên tắc cơ bản của mã hóa: ciphertext không được lộ thông tin về plaintext.

**Ví dụ 1**: Encrypt 2 block identical:

\`\`\`
P_1 = "ATTACKATDAWN!!!!" → C_1 = 3F7E8A91B2C4D5E6F7
P_2 = "ATTACKATDAWN!!!!" → C_2 = 3F7E8A91B2C4D5E6F7  (giống hệt!)
\`\`\`

Kẻ tấn công thấy $C_1 = C_2 \\Rightarrow$ biết ngay $P_1 = P_2$, dù không biết key.

### 2.3. ECB-Penguin — demo nổi tiếng nhất

Hình ảnh **Tux** (penguin của Linux) được encrypt bằng ECB AES với key ngẫu nhiên. Kết quả:

- Pixel cùng màu (vùng trắng lớn, vùng đen lớn) → các block 16×16 pixel cùng pattern → ciphertext cùng giá trị → **vẫn thấy hình dạng con chim cánh cụt**.
- Với CBC hay CTR: output trông hoàn toàn như random noise — không phân biệt được hình dạng.

> ⚠ **Lỗi thường gặp**: Nhiều người nghĩ "encrypt xong là an toàn". ECB-Penguin chứng minh: chọn mode sai = dữ liệu lộ, dù dùng AES hoàn toàn đúng.

**Kết luận**: **KHÔNG BAO GIỜ dùng ECB** cho dữ liệu thực. ECB chỉ có thể dùng cho single-block hay cấu trúc không có pattern lặp lại (rất hiếm).

---

## 3. CBC — Cipher Block Chaining

### 3.1. Cơ chế

$$C_0 = IV \\text{ (random)}$$

$$C_i = E_K(P_i \\oplus C_{i-1})$$

**Giải mã**:

$$P_i = D_K(C_i) \\oplus C_{i-1}$$

> 💡 **Trực giác**: Mỗi block trước khi encrypt được XOR với block ciphertext trước đó. IV (Initialization Vector) đóng vai trò $C_0$ để chain bắt đầu được. Hai plaintext block giống nhau $\\to$ ciphertext khác nhau vì $C_{i-1}$ khác.

### 3.2. Walk-through 3 block

Giả sử (ký hiệu đơn giản, giá trị hex): Key $= K$, $IV = C_0 = \\text{0xAA}$.

**Block 1**: $P_1 = $ "ATTACKATDAWN!!!!" (0x41 0x54 ... 0x21):

$$C_1 = E_K(P_1 \\oplus C_0) = E_K(\\text{"ATTACKATDAWN!!!!"} \\oplus \\text{0xAA...}) = \\text{0xF3 0x82 ...}$$

**Block 2**: $P_2 = $ "ATTACKATDAWN!!!!" (giống $P_1$!):

$$C_2 = E_K(P_2 \\oplus C_1) \\ne C_1 \\text{ vì } C_1 \\ne C_0$$

$\\to C_2$ trông khác hoàn toàn $C_1$.

**Block 3**: $P_3 = $ "ORDERTRANSFER01 ":

$$C_3 = E_K(P_3 \\oplus C_2)$$

**Ưu điểm**: Khắc phục ECB-Penguin. **Nhược điểm**: Không thể parallelize encrypt (phải chờ $C_{i-1}$ trước).

### 3.3. CBC bit-flip và error propagation

**Flip bit trong IV**: 1 bit thay đổi ở IV $\\to$ bit tương ứng trong $P_1$ bị flip khi decrypt. Các block sau không ảnh hưởng.

**Flip bit trong $C_i$**: Khi decrypt:
- **$P_i$ bị corrupt hoàn toàn** (vì $D_K(C_i)$ thay đổi toàn bộ).
- **Cùng bit trong $P_{i+1}$ bị flip** (vì $P_{i+1} = D_K(C_{i+1}) \\oplus C_i$, đúng bit đó trong $C_i$ đã flip).

**Ví dụ attack**: Nếu $C_1 = $ encrypt("Transfer \\$0100 to"), kẻ tấn công flip đúng 1 bit ở vị trí byte '\\$' $\\to$ decrypt $P_2$ thay đổi giá trị tương ứng ($P_2$ corrupt, nhưng vẫn được xử lý nếu server bỏ qua lỗi).

### 3.4. Padding Oracle Attack (POODLE 2014)

**Ý tưởng**: CBC cần padding để plaintext là bội của 16 byte (PKCS#7: nếu thiếu n byte, thêm n byte giá trị n). Nếu server **phân biệt lỗi "padding sai" với "decryption thành công"** → kẻ tấn công có oracle.

**Cách khai thác**:
1. Gửi $C_i$ bị sửa, đo phản hồi server: "padding error" hay không.
2. Thử 256 giá trị cho byte cuối $C_{i-1}$ $\\to$ khi không có lỗi padding, suy ra byte cuối $P_i$.
3. Lặp lại cho từng byte $\\to$ giải mã hoàn toàn plaintext mà không cần key.

**Độ phức tạp**: $256 \\times 16 \\times$ số_block $\\approx 4096$ request để giải mã 1 block.

**Fix**: Dùng authenticated encryption (GCM) thay CBC; KHÔNG leak padding error.

---

## 4. CTR — Counter Mode

### 4.1. Cơ chế

$$\\text{Keystream}_i = E_K(\\text{nonce} \\,\\|\\, \\text{counter}_i)$$

$$C_i = P_i \\oplus \\text{Keystream}_i$$

Không có chaining. Mỗi block encrypt một counter độc lập.

> 💡 **Trực giác**: CTR biến AES (block cipher) thành stream cipher. Key + nonce + counter → sinh keystream. XOR keystream với plaintext. Giải mã: cùng thao tác (XOR lại).

### 4.2. Ưu điểm

- **Parallelizable hoàn toàn**: tính $\\text{Keystream}_1, \\text{Keystream}_2, \\ldots$ đồng thời.
- **Không cần padding**: có thể encrypt fragment bất kỳ độ dài.
- **Random access**: giải mã block thứ N không cần giải mã 1..N-1.

### 4.3. Bit-flip attack (nguy hiểm)

**Vấn đề**: CTR không authenticate. Flip bit trong $C_i$ $\\to$ **cùng bit trong $P_i$ bị flip**, không có lỗi nào xuất hiện.

**Ví dụ concrete**:

Ciphertext: \`... C_amount_bytes ...\`. Biết plaintext có "\\$0100" ở vị trí nào đó, với \`'$' = 0x24\`, \`'0' = 0x30\`, \`'1' = 0x31\`, \`'0' = 0x30\`, \`'0' = 0x30\`.

Muốn đổi thành "\\$0900" (\`'9' = 0x39\`): flip bit 3 (bit value 8) của byte \`'1'\` (\`0x31\`):

$$\\text{0x31} \\oplus \\text{0x08} = \\text{0x39} = \\text{'9'}$$

Kết quả: ciphertext byte đó flip $\\to$ decrypt ra "Transfer \\$0900".

Đây là lý do CTR một mình **không đủ** cho production — phải kết hợp với MAC.

---

## 5. GCM — Galois/Counter Mode (Recommended)

### 5.1. AEAD là gì?

**Authenticated Encryption with Associated Data (AEAD)**: scheme vừa mã hóa vừa xác thực.

- **Encrypt + MAC trong 1 pass**: không cần chạy 2 thuật toán riêng.
- **Tamper-proof**: mọi sửa đổi ciphertext → tag verification fail → reject.
- **Associated data (AD)**: có thể authenticate header không encrypt (vd: địa chỉ IP, port) cùng ciphertext.

### 5.2. Cơ chế GCM

$$\\begin{aligned}
C &= \\mathrm{CTR\\_Encrypt}(K, \\text{nonce}, P) \\\\
T &= \\mathrm{GHASH}(H, A, C) \\quad \\text{(authentication tag 128 bit)} \\\\
H &= E_K(0\\ldots0) \\quad \\text{(hash subkey)}
\\end{aligned}$$

GHASH tính MAC bằng nhân đa thức trong $\\mathrm{GF}(2^{128})$ — nhanh với hardware.

Output: (C, T). Decrypt: kiểm tra T trước, nếu match → decrypt C; nếu không → reject.

### 5.3. Security properties

- **Confidentiality**: CTR mode đảm bảo.
- **Integrity + Authenticity**: GHASH tag đảm bảo — bất kỳ 1 bit thay đổi trong $C$ hoặc AD $\\to$ tag không khớp.
- **Nonce reuse là thảm họa**: nếu dùng lại nonce với cùng key $\\to$ keystream trùng $\\to$ XOR 2 ciphertext $=$ XOR 2 plaintext $\\to$ toàn bộ confidentiality mất. Nonce PHẢI unique cho mỗi message.

**Ví dụ verify fail**:

- Alice gửi: $(C, T) = $ encrypt("Transfer \\$1000 to Alice").
- Mallory sửa $C$ thành $C'$ = encrypt thay "\\$1000" $\\to$ "\\$9999".
- Bob nhận $(C', T)$: $\\mathrm{GHASH}(C') \\ne T \\Rightarrow$ reject!

GCM bắt được tampering ngay cả khi Mallory không biết key.

> ⚠ **Lỗi thường gặp**: Dùng GCM nhưng tái sử dụng (nonce, key) → catastrophic failure. Production code phải có mechanism sinh nonce unique (thường: 96-bit random, hay counter).

---

## 6. ChaCha20-Poly1305 (briefly)

**Stream cipher + AEAD alternative**:

- **ChaCha20**: stream cipher thiết kế bởi DJB (Daniel J. Bernstein), không dùng AES S-box lookup table → không bị cache-timing attack.
- **Poly1305**: MAC.
- **Kết hợp**: AEAD scheme tương đương GCM về security.
- **Faster trên mobile/IoT**: không cần AES-NI hardware instruction.
- Dùng trong TLS 1.3, WireGuard, SSH hiện đại.

---

## 7. Bảng so sánh các mode

| Mode | Parallel Encrypt | Parallel Decrypt | Authentication | Nonce/IV | Padding | Dùng khi |
|------|:---:|:---:|:---:|:---:|:---:|---------|
| **ECB** | ✓ | ✓ | ✗ | Không cần | Có | **KHÔNG BAO GIỜ** |
| **CBC** | ✗ | ✓ | ✗ | IV random | Có | Legacy (TLS 1.2 cũ) |
| **CTR** | ✓ | ✓ | ✗ | Nonce | Không | Cần random access |
| **GCM** | ✓ | ✓ | **✓ (AEAD)** | Nonce unique | Không | **Default cho TLS 1.3** |
| **ChaCha20-Poly1305** | ✓ | ✓ | **✓ (AEAD)** | Nonce unique | Không | Mobile/IoT, no AES-NI |

---

## 8. Bài tập

**Bài 1**: Alice encrypt email 3 block (48 byte) bằng AES-ECB. Block 1 = "Dear Bob, my pas" và block 3 = "Dear Bob, my pas". Kẻ nghe được ciphertext. Anh ta biết gì từ thông tin này?

**Bài 2**: CBC: IV = 0x00 (toàn 0 byte). Alice luôn encrypt cùng key. Vấn đề gì xảy ra? Và nếu IV không random mà là sequential (IV_1=0, IV_2=1, ...)?

**Bài 3**: CTR mode, nonce cố định, counter bắt đầu từ 0. Alice encrypt "Pay \\$0100" → ciphertext C. Bob muốn sửa thành "Pay \\$9999". Làm thế nào nếu anh ta biết vị trí của "\\$0100" trong plaintext?

**Bài 4**: GCM tag là 128 bit. Xác suất kẻ tấn công đoán đúng tag mà không biết key là bao nhiêu? Tại sao điều này đủ an toàn?

---

## 9. Lời giải chi tiết

### Bài 1

$C_1 = E_K(P_1)$ và $C_3 = E_K(P_3)$. Vì $P_1 = P_3$, $C_1 = C_3$. Kẻ nghe thấy ngay: **block đầu và block cuối của email có nội dung giống hệt nhau** — đây là thông tin về cấu trúc plaintext dù không biết key. Trong trường hợp email thực, mẫu "Dear Bob" lặp lại giúp nhận dạng template.

### Bài 2

**IV = 0 cố định**: Không sai về mặt kỹ thuật nếu mỗi message dùng key khác. Nhưng nếu Alice dùng cùng key nhiều lần, $P_1$ luôn XOR với $\\text{0x00}$ trước khi encrypt $\\to$ nếu $P_1$ giống nhau ở nhiều message $\\to$ $C_1$ giống nhau. Mất tính indistinguishability.

**IV sequential**: Chosen-plaintext attack. Nếu Mallory biết IV tiếp theo sẽ là $IV_n$ và đang chọn 1 block để encrypt, cô có thể tạo plaintext $= P_\\text{target} \\oplus IV_n \\oplus IV_\\text{old}$ $\\to$ decrypt cho ra $P_\\text{target}$. Đây là lý do IV phải **random** (không đoán được trước).

### Bài 3

Vị trí "\\$0100" trong plaintext $=$ index $i$ trong chuỗi byte. Giả sử nằm trong block $j$, byte offset $b$. Khi đó $\\text{Keystream}_j[b] = C_j[b] \\oplus P_j[b]$. Muốn $P'_j[b] = \\text{'9'} = \\text{0x39}$:

$$\\begin{aligned}
C'_j[b] &= \\text{Keystream}_j[b] \\oplus \\text{'9'} \\\\
        &= (C_j[b] \\oplus P_j[b]) \\oplus \\text{'9'} \\\\
        &= C_j[b] \\oplus P_j[b] \\oplus \\text{'9'}
\\end{aligned}$$

Biết $P_j[b] = \\text{'\\$'} = \\text{0x24}$ và $\\text{'9'} = \\text{0x39}$:

$$C'_j[b] = C_j[b] \\oplus \\text{0x24} \\oplus \\text{0x39} = C_j[b] \\oplus \\text{0x1d}$$

Flip bit ở đúng vị trí: XOR byte $C_j[b]$ với $\\text{0x1d}$. Lặp lại cho '0','1','0','0' $\\to$ '\\$','9','9','9'. **Đây là lý do CTR một mình không đủ**.

### Bài 4

Xác suất đoán đúng tag $= 1/2^{128} \\approx 3 \\times 10^{-39}$. Nếu Mallory gửi $10^9$ tampered message/giây liên tục trong 100 năm $= 3.15 \\times 10^{18}$ message $\\to$ xác suất thành công $\\approx 3 \\times 10^{18} / 2^{128} \\approx 10^{-20}$. Thực tế: hệ thống rate-limit và block IP sau vài lần fail $\\to$ xác suất còn thấp hơn nhiều.

---

## Bài tiếp theo

[Lesson 03: Hash Functions](../lesson-03-hash-functions/README.md) — Preimage resistance, birthday paradox, SHA-256, MD5/SHA1 dead.

[visualization.html](./visualization.html)
`;
