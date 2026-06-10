// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: Cryptography/02-ModernSymmetric/lesson-01-block-ciphers-aes/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 01: Block Ciphers & AES

> **Tầng 2 — Modern Symmetric · Cryptography**

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Hiểu **block cipher** là gì: pseudo-random permutation trên $n$-bit block, tham số hóa bởi key.
- Nắm **SPN structure** (Substitution-Permutation Network) — nguyên lý nền của AES.
- Mô tả chi tiết **4 phép biến đổi** của mỗi AES round: SubBytes, ShiftRows, MixColumns, AddRoundKey.
- Biết lịch sử DES → 3DES → AES và lý do DES/3DES **deprecated**.
- Định lượng độ an toàn: brute-force $2^{128}$ ops mất bao nhiêu năm.

## Kiến thức tiền đề

- **T1-L04**: [Modular arithmetic, XOR, GCD, Fermat little theorem](../../01-Classical/lesson-04-modular-arithmetic-foundations/README.md)
- **DataFoundations/01**: Binary, hex, XOR (phép biến đổi byte cơ bản)
- **DataFoundations/03**: Boolean logic

---

## 1. Block cipher là gì?

> 💡 **Trực giác**: Hãy tưởng tượng một hộp đen có 2 chế độ. Chế độ **encrypt**: nhét vào 16 byte bất kỳ + 1 chìa khóa → nhả ra 16 byte trông hoàn toàn ngẫu nhiên. Chế độ **decrypt**: nhét 16 byte ciphertext + đúng chìa đó → trả về chính xác 16 byte ban đầu. Hộp đen này là **block cipher**.

**Định nghĩa chính xác**: Block cipher $E: \\{0,1\\}^k \\times \\{0,1\\}^n \\to \\{0,1\\}^n$ là họ hàm sao cho:

- **Tham số hóa bởi key k**: mỗi key xác định một hoán vị (permutation) cụ thể trên $\\{0,1\\}^n$.
- **Pseudo-random permutation (PRP)**: không thể phân biệt $E_K(\\cdot)$ với một random permutation thật sự khi không có $K$.
- **Khả nghịch**: với mỗi $K$ cố định, $E_K$ là bijection — có thể decrypt.

**Vì sao block cipher tồn tại?** Stream cipher (như RC4 hay OTP) encrypt từng bit — nếu có lỗi 1 bit trong keystream, mỗi bit trong output sai tương ứng và khó phát hiện. Block cipher xử lý theo khối, trộn đều các bit trong khối → một bit thay đổi ở input ảnh hưởng ~50% bit output (avalanche effect), dễ phát hiện can thiệp hơn và cung cấp nền cho authentication.

**Ví dụ tham số AES**:

| Tên | Block size | Key size | Số round |
|-----|-----------|----------|----------|
| AES-128 | 128 bit = 16 byte | 128 bit | 10 |
| AES-192 | 128 bit | 192 bit | 12 |
| AES-256 | 128 bit | 256 bit | 14 |

> ❓ **Câu hỏi tự nhiên**: Tại sao block size cố định 128 bit? Vì 64-bit (như DES) dễ bị birthday attack: sau $2^{32}$ block (4GB) mã hóa cùng key, xác suất cao có 2 block cho cùng ciphertext $\\to$ thông tin lộ. 128 bit $\\to$ cần $2^{64}$ block (hàng triệu TB) mới gặp vấn đề này.

---

## 2. AES: Rijndael và SPN structure

### 2.1. Lịch sử ngắn

AES được NIST công bố năm 2001, chọn từ thuật toán **Rijndael** (Joan Daemen + Vincent Rijmen, Bỉ) qua cuộc thi mở (1997–2001). Tên "AES" = Advanced Encryption Standard. Hiện tại (2024):

- AES-128 **vẫn an toàn** — best known attack $\\approx 2^{126}$ ops (biquadratic), brute-force vẫn là $2^{128}$.
- Side-channel attacks (timing, power analysis) là mối đe dọa thực tế hơn brute-force.

### 2.2. State matrix — 4×4 byte grid

AES làm việc với **state**: một ma trận 4×4 byte (tổng 16 byte = 128 bit). Plaintext 16 byte được nạp vào state theo cột:

\`\`\`
Plaintext: A T T A C K A T D A W N ! ! ! !
           ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓
State:
  col 0    col 1    col 2    col 3
[ A ][ C ][ A ][ W ]    (row 0)
[ T ][ K ][ T ][ N ]    (row 1)
[ T ][ A ][ D ][ ! ]    (row 2)
[ A ][ T ][ A ][ ! ]    (row 3)
\`\`\`

Mỗi ô là 1 byte (8 bit). Toàn bộ 10 round của AES biến đổi ma trận 4×4 này.

### 2.3. SPN structure

**Substitution-Permutation Network** = xen kẽ:
- **Substitution (S)**: thay thế phi tuyến (non-linear) — phá mọi quan hệ tuyến tính giữa key và ciphertext.
- **Permutation (P)**: khuếch tán (diffusion) — trộn bit giữa các vị trí.
- **Key mixing**: XOR với round key.

Lý thuyết thông tin của Shannon (1949) yêu cầu **confusion** (S) + **diffusion** (P) để cipher an toàn. AES hiện thực hóa cả hai.

---

## 3. Bốn phép biến đổi AES

> 💡 **Tổng quan**: Mỗi round AES chạy 4 bước theo thứ tự: SubBytes → ShiftRows → MixColumns → AddRoundKey. Round cuối (round 10) bỏ MixColumns. Round 0 chỉ có AddRoundKey.

### 3.1. SubBytes — thay thế phi tuyến

**Là gì**: Thay từng byte của state bằng giá trị tra trong **S-box** (substitution box) — bảng 256 phần tử được xây từ nghịch đảo trong trường hữu hạn $\\mathrm{GF}(2^{8})$.

**Vì sao cần**: Phá tính tuyến tính. Nếu dùng phép cộng hay nhân đơn giản, kẻ tấn công có thể lập hệ phương trình tuyến tính để tìm key. S-box là phi tuyến → vô hiệu hóa chiến lược này.

**Ví dụ S-box lookup**:

| Input byte | Hex | S-box Output | Hex |
|-----------|-----|-------------|-----|
| 0x00 | 00000000 | 0x63 | 01100011 |
| 0x53 | 01010011 | **0xed** | 11101101 |
| 0xa1 | 10100001 | 0xfe | 11111110 |
| 0x63 | 01100011 | 0xfb | 11111011 |

Ví dụ: \`SubBytes(0x53) = 0xed\`. Cách tính thô (không cần biết khi dùng): lấy nghịch đảo 0x53 trong $\\mathrm{GF}(2^{8})$ = 0xca, sau đó áp affine transformation → 0xed.

> ⚠ **Lỗi thường gặp**: S-box KHÔNG phải table lookup tùy tiện — nó có cấu trúc algebraic rõ ràng (inverse trong $\\mathrm{GF}(2^{8})$ + affine). Điều này đảm bảo không có "trap door" ẩn. Đây là điểm khác biệt so với DES S-box (được thiết kế bí mật ban đầu).

### 3.2. ShiftRows — dịch vòng theo hàng

**Là gì**: Dịch cyclic (rotate left) mỗi hàng của state:

\`\`\`
Trước ShiftRows:
  [a0  a4  a8  a12]   ← row 0: dịch 0 vị trí
  [a1  a5  a9  a13]   ← row 1: dịch 1 vị trí sang trái
  [a2  a6  a10 a14]   ← row 2: dịch 2 vị trí sang trái
  [a3  a7  a11 a15]   ← row 3: dịch 3 vị trí sang trái

Sau ShiftRows:
  [a0  a4  a8  a12]   ← không đổi
  [a5  a9  a13 a1 ]   ← dịch 1
  [a10 a14 a2  a6 ]   ← dịch 2
  [a15 a3  a7  a11]   ← dịch 3
\`\`\`

**Vì sao cần**: Sau ShiftRows, mỗi cột chứa byte từ 4 hàng khác nhau. Kết hợp với MixColumns tiếp theo, mỗi byte output phụ thuộc vào tất cả 16 byte input (sau đủ round).

**Ví dụ cụ thể** với plaintext "ATTACKATDAWN!!!!":

\`\`\`
State ban đầu (hex, 'A'=0x41, 'T'=0x54, 'C'=0x43, 'K'=0x4b, ...):
Row 0: [41  43  41  57]   (A C A W)
Row 1: [54  4b  54  4e]   (T K T N)
Row 2: [54  41  44  21]   (T A D !)
Row 3: [41  54  41  21]   (A T A !)

Sau ShiftRows:
Row 0: [41  43  41  57]   (không đổi)
Row 1: [4b  54  4e  54]   (dịch 1: K T N T)
Row 2: [44  21  54  41]   (dịch 2: D ! T A)
Row 3: [21  41  54  41]   (dịch 3: ! A T A)
\`\`\`

### 3.3. MixColumns — khuếch tán trong cột

**Là gì**: Nhân mỗi cột (4 byte) với ma trận MDS cố định trong trường hữu hạn $\\mathrm{GF}(2^{8})$:

\`\`\`
[2 3 1 1]   [b0]   [b'0]
[1 2 3 1] × [b1] = [b'1]
[1 1 2 3]   [b2]   [b'2]
[3 1 1 2]   [b3]   [b'3]
\`\`\`

Trong đó các phép nhân và cộng thực hiện trong $\\mathrm{GF}(2^{8})$ (cộng = XOR; nhân = polynomial mod irreducible poly $x^{8}+x^{4}+x^{3}+x+1$).

**Ví dụ tính thô** (đủ để hiểu khái niệm): nhân cột [0x87, 0x6e, 0x46, 0xa6] với hàng đầu [2,3,1,1]:

$$\\begin{aligned}
b'_0 &= 2 \\cdot \\text{0x87} \\oplus 3 \\cdot \\text{0x6e} \\oplus 1 \\cdot \\text{0x46} \\oplus 1 \\cdot \\text{0xa6} \\\\
     &= \\text{0x15} \\oplus \\text{0xb2} \\oplus \\text{0x46} \\oplus \\text{0xa6} \\\\
     &= \\text{0x47}
\\end{aligned}$$

*(Nhân $2 \\cdot \\text{0x87}$ trong $\\mathrm{GF}(2^{8})$: shift left 1 bit = 0x0e, XOR 0x1b nếu MSB=1 → 0x0e XOR 0x1b = ... tính ra 0x15)*

**Vì sao cần**: Một bit thay đổi ở input → 4 byte output thay đổi (sau MixColumns) → sau 2 round, tất cả 16 byte bị ảnh hưởng. Đây là **diffusion** của Shannon.

> ⚠ **Lỗi thường gặp**: MixColumns KHÔNG phải nhân ma trận số nguyên thông thường — phải dùng $\\mathrm{GF}(2^{8})$. Ví dụ: $2 \\cdot \\text{0x87} \\ne \\text{0x10e}$; đúng là phép nhân polynomial mod $p(x)$.

> 📝 **Tóm tắt phân biệt 3 bước**: SubBytes = confusion (non-linear lookup, loại bỏ tính tuyến tính); ShiftRows = diffusion ngang (trộn byte giữa các cột); MixColumns = diffusion dọc (trộn byte trong cùng cột). Ba bước phối hợp → full diffusion sau 2 round.

### 3.4. AddRoundKey — trộn với round key

**Là gì**: XOR state với round key hiện tại (16 byte). Round key được sinh từ master key qua **key schedule**.

$$\\text{state}'[i][j] = \\text{state}[i][j] \\oplus \\text{roundKey}[i][j]$$

**Ví dụ**: state byte 0x4b, round key byte 0x3c → $\\text{0x4b} \\oplus \\text{0x3c} = \\text{0x77}$.

**Vì sao XOR?** Vì XOR là phép biến đổi nghịch đảo dễ nhất ($A \\oplus K \\oplus K = A$), không tốn kém, và bảo đảm không có key → không decrypt được.

**Key schedule**: AES-128 từ 1 master key (16 byte) sinh ra 11 round key (10 round + 1 cho round 0). Mỗi round key phụ thuộc nonlinearly vào key trước (dùng S-box và rotation).

---

## 4. Cấu trúc đầy đủ của AES-128

\`\`\`
Plaintext (16 byte)
    |
    ↓  AddRoundKey (Round 0)
    |  ← Round key 0 (= master key)
    ↓
    ┌── Round 1-9: ──────────────────────┐
    │  SubBytes                           │
    │  ShiftRows                          │
    │  MixColumns                         │
    │  AddRoundKey ← Round key i          │
    └─────────────────────────────────────┘
    ↓
    ┌── Round 10 (final): ───────────────┐
    │  SubBytes                           │
    │  ShiftRows                          │
    │  (MixColumns KHÔNG CÓ ở round cuối)│
    │  AddRoundKey ← Round key 10         │
    └─────────────────────────────────────┘
    |
    ↓
Ciphertext (16 byte)
\`\`\`

> ❓ **Câu hỏi**: Tại sao round cuối bỏ MixColumns? Vì MixColumns trong round cuối không tăng security (không có bước SubBytes sau nó để tạo non-linearity mới), nhưng làm decrypt phức tạp hơn. Bỏ đi giúp encrypt và decrypt có cấu trúc đối xứng.

---

## 5. DES — Lịch sử và cái chết

### 5.1. Tóm tắt DES

**DES (Data Encryption Standard)**, IBM + NSA, chuẩn hóa 1977:

- **Block 64 bit, key 56 bit** (thực ra 64 bit nhưng 8 bit parity), **16 round Feistel**.
- **Feistel structure**: chia block thành nửa trái $L$, nửa phải $R$. Mỗi round: $L_\\text{new} = R$, $R_\\text{new} = L \\oplus F(R, K_i)$. Không cần inverse của $F$ — giải mã chạy ngược round key.

Điểm khác biệt với AES: DES không phải SPN — dùng Feistel. $F$ function dùng S-box $6 \\to 4$ bit (8 S-box), nhân rộng $R$ từ $32 \\to 48$ bit (expansion), XOR với $K_i$, qua S-box $\\to 32$ bit.

### 5.2. Sự sụp đổ của DES

**1998**: EFF (Electronic Frontier Foundation) xây **Deep Crack** với giá 250,000 USD. Trong DES Cracking Contest II:

- Thử 90 tỷ key/giây.
- Brute-force 56-bit key space $= 2^{56} \\approx 7.2 \\times 10^{16}$ key.
- **Tìm ra trong 56 giờ** (tháng 7/1998). Sau đó năm 1999 kết hợp distributed: **22 giờ 15 phút**.

Kết luận: 56-bit key = chết.

### 5.3. 3DES và sự lỗi thời

**3DES (Triple DES)**: $E_{K_3}(D_{K_2}(E_{K_1}(P)))$. Với 3 key khác nhau $\\to$ key effective 168 bit, nhưng meet-in-the-middle attack giảm còn $\\approx 2^{112}$ effective.

- **NIST deprecated 3DES** năm 2017 (disallowed từ 2023).
- Nhược điểm: 3× chậm hơn DES = 9× chậm hơn AES.

**Timeline**:

| Năm | Sự kiện |
|-----|---------|
| 1977 | DES chuẩn hóa, IBM + NSA |
| 1998 | Deep Crack brute-force 56h |
| 1999 | distributed crack trong 22h |
| 2001 | AES (Rijndael) chuẩn hóa |
| 2005 | 3DES vẫn dùng, DES abandoned |
| 2017 | NIST deprecated 3DES |
| 2023 | 3DES disallowed hoàn toàn |

---

## 6. Định lượng độ an toàn AES

### 6.1. Brute-force timing

Với AES-128 (key space = $2^{128}$):

$$2^{128} = 340{,}282{,}366{,}920{,}938{,}463{,}463{,}374{,}607{,}431{,}768{,}211{,}456 \\text{ keys}$$

- Tốc độ máy tính hiện đại: $\\approx 10^9$ keys/giây (1 GHz single-core)
- Cụm máy tính mạnh nhất: $\\approx 10^{15}$ keys/giây
- NSA-level (giả sử): $\\approx 10^{18}$ keys/giây

Thời gian brute-force tại $10^{18}$ keys/giây:

$$\\begin{aligned}
&= 2^{128} / 10^{18} \\\\
&= 3.4 \\times 10^{38} / 10^{18} \\\\
&= 3.4 \\times 10^{20} \\text{ giây} \\\\
&= 1.08 \\times 10^{13} \\text{ năm} \\\\
&\\approx 10{,}800 \\text{ tỷ năm}
\\end{aligned}$$

Tuổi vũ trụ $\\approx 1.38 \\times 10^{10}$ năm. Brute AES-128 cần gấp **~800 lần tuổi vũ trụ** ngay cả với máy nhanh nhất hiện nay.

### 6.2. Best known cryptanalytic attack

**Biclique attack** (2011): $\\approx 2^{126}$ operations thay vì $2^{128}$ — tức là nhanh hơn brute force chỉ 4 lần. Trong thực tế vẫn hoàn toàn không khả thi. AES-128 **an toàn**.

### 6.3. Side-channel attacks

**Threat thực tế hơn** là khai thác **implementation** không phải algorithm:

- **Timing attack**: đo thời gian encrypt → suy ra S-box lookup pattern → suy ra key bits.
- **Power analysis**: đo dòng điện tiêu thụ trong crypto chip.
- **Cache timing** (trên CPU): AES table lookup gây cache miss pattern phụ thuộc key.

Giải pháp: **AES-NI** (AES Native Instructions) — Intel/AMD implement AES trực tiếp trong hardware, không dùng lookup table, không có timing leakage.

---

## 7. Bài tập

**Bài 1**: Cho state AES sau SubBytes, một byte có giá trị 0x63. Hỏi byte này là 0x00 hay 0x01 trước SubBytes? *(Gợi ý: xem bảng S-box)*

**Bài 2**: Nếu ta dùng DES với key 56-bit và cluster 10,000 máy, mỗi máy thử $10^9$ key/giây, trung bình mất bao lâu để brute-force?

**Bài 3**: Tại sao AES không thể dùng simple XOR thay cho MixColumns mà vẫn đảm bảo diffusion? Gợi ý: xét trường hợp 2 block cùng key.

**Bài 4**: Trong AES-128 với 10 round, tổng cộng bao nhiêu lần SubBytes được thực hiện? Bao nhiêu lần MixColumns?

---

## 8. Lời giải chi tiết

### Bài 1

S-box là bijection: mỗi input cho đúng 1 output. S-box(0x00) = 0x63 — đây là giá trị chuẩn trong AES S-box. Vậy byte 0x63 trước SubBytes là **0x00**.

Kiểm tra thêm: S-box(0x01) = 0x7c (không phải 0x63). Vậy câu trả lời là **0x00**.

### Bài 2

$$\\begin{aligned}
\\text{Key space}&: 2^{56} = 7.2 \\times 10^{16} \\\\
\\text{Tốc độ}&: 10{,}000 \\times 10^9 = 10^{13} \\text{ keys/giây} \\\\
\\text{Trung bình brute-force}&: 2^{56} / 2 = 2^{55} \\text{ try} \\\\
&= 3.6 \\times 10^{16} / 10^{13} = 3{,}600 \\text{ giây} \\approx 1 \\text{ giờ}
\\end{aligned}$$

Với 10,000 máy mỗi máy $10^9$ key/giây: **trung bình ~1 giờ**. Worst case ~2 giờ. Điều này chứng minh 56-bit đã chết ngay cả với commodity hardware.

### Bài 3

XOR đơn giản ($A \\oplus B \\oplus C \\oplus D$) là tuyến tính: nếu biết 3/4 byte trong cột, lập tức tính được byte thứ 4. Không cần thử nhiều khả năng $\\to$ không đủ diffusion trong nghĩa cryptographic. MixColumns dùng nhân trong $\\mathrm{GF}(2^{8})$ — một phép toán **linear** trên $\\mathrm{GF}(2)$ nhưng đủ diffusion nhờ MDS matrix: bất kỳ 2 column input khác nhau cho 4 column output khác nhau hoàn toàn.

### Bài 4

\`\`\`
Số lần SubBytes: 10 round × 1 lần/round = 10 lần
Số lần MixColumns: 9 lần (round 1-9; round 10 bỏ MixColumns)
\`\`\`

---

## Bài tiếp theo

[Lesson 02: Modes of Operation](../lesson-02-modes-of-operation/README.md) — AES chỉ encrypt 1 block 16 byte. Muốn encrypt message dài hơn, cần **chế độ vận hành** (mode of operation): ECB (tệ), CBC, CTR, GCM.

[visualization.html](./visualization.html)
`;
