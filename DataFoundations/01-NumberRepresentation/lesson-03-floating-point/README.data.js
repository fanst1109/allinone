// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: DataFoundations/01-NumberRepresentation/lesson-03-floating-point/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 03 — IEEE 754 Floating-Point (số thực dấu phẩy động)

> **Nhóm 1 — Number Representation · DataFoundations**

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Hiểu cấu trúc bit của IEEE 754 binary32 (float) và binary64 (double).
- Encode/decode số thực theo chuẩn IEEE 754 bằng tay.
- Giải thích tại sao $0{,}1 + 0{,}2 \\neq 0{,}3$ trong mọi ngôn ngữ lập trình.
- Nhận biết và tránh các bẫy về độ chính xác: catastrophic cancellation, so sánh float bằng \`==\`.
- Hiểu các giá trị đặc biệt: ±0, ±Inf, NaN, số denormal.

## Kiến thức tiền đề

- [Lesson 01 — Binary & Hex](../lesson-01-binary-hex/README.md): đọc/viết số nhị phân.
- [Lesson 02 — Bitwise Operations](../lesson-02-bitwise-ops/README.md): dịch bit, AND/OR/mask.

---

## 1. Vấn đề: sao không dùng số nguyên cho tất cả?

💡 **Trực giác**: Số nguyên 32-bit chứa khoảng 4 tỷ giá trị, nhưng phân bố **đều đặn** từ 0 đến 4,294,967,295. Để biểu diễn $0{,}000001$ hay $1{,}5 \\times 10^{38}$ thì không đủ vì range quá hẹp hoặc precision quá thô.

Giải pháp: dùng **dấu phẩy động (floating-point)** — đổi trao đổi giữa range và precision. Giống ký hiệu khoa học: $1{,}23456789 \\times 10^7$ chứa **mantissa** (1.23456789) và **exponent** (7). Khi exponent lớn thì range rộng nhưng mỗi "bước" cũng to; khi exponent nhỏ thì giá trị nhỏ được nhưng resolution cao hơn.

---

## 2. Cấu trúc IEEE 754 binary32 (float, 32-bit)

### 2.1. Phân bổ 32 bit

\`\`\`
Bit 31    Bits 30-23        Bits 22-0
  |       |       |         |              |
  S   EEEEEEEE   MMMMMMMMMMMMMMMMMMMMMMM
  1     8 bits              23 bits
(sign)  (exponent)         (mantissa / fraction)
\`\`\`

| Trường | Bit | Ý nghĩa |
|--------|-----|---------|
| **Sign (S)** | 31 | 0 = dương, 1 = âm |
| **Exponent (E)** | 30–23 | Số mũ đã offset — **bias = 127** |
| **Mantissa (M)** | 22–0 | Phần lẻ sau dấu phẩy của 1.M₂ |

**Công thức giá trị** (trường hợp thường):

\`\`\`
value = (−1)^S × 1.M₂ × 2^(E − 127)
\`\`\`

- \`1.M₂\`: bit \`1\` đứng trước dấu phẩy là **implicit leading bit** — không lưu trong mantissa. Đây là "miễn phí" 1 bit precision.
- \`E − 127\`: trừ bias 127 để E = 0...254 biểu diễn exponent thật = −127...+127.

❓ **Câu hỏi tự nhiên**:

- *"Vì sao bias là 127 chứ không là 128?"* — Bởi vì E = 0 (tức cả 8 bit = 0) và E = 255 (tức cả 8 bit = 1) được dành riêng cho **giá trị đặc biệt** (xem mục 4). Exponent thật chạy từ −126 đến +127 → chỉ cần bias 127.
- *"1.M là gì? tại sao không lưu bit 1 đó?"* — Mọi số dấu phẩy động đã chuẩn hóa (normalized) đều có dạng 1.xxx₂ × 2^n. Phần \`1\` luôn tồn tại nên không cần lưu — tiết kiệm 1 bit, tăng precision thêm gấp đôi.

### 2.2. IEEE 754 binary64 (double, 64-bit)

\`\`\`
1 bit sign + 11 bit exponent (bias 1023) + 52 bit mantissa
\`\`\`

| Loại | Bits | Exponent bias | Mantissa | Decimal digits |
|------|------|---------------|----------|----------------|
| float32 | 32 | 127 | 23 bit | ~7 chữ số |
| float64 | 64 | 1023 | 52 bit | ~15–16 chữ số |

---

## 3. Walk-through encode 4 số cụ thể

### Ví dụ 1: Encode \`1.0\` (float32)

Bước 1: viết dưới dạng binary.
\`\`\`
1.0₁₀ = 1.0₂
\`\`\`

Bước 2: chuẩn hóa → \`1.0₂ × 2⁰\`

Bước 3: điền 3 trường:
- S = 0 (dương)
- E thật = 0 → E lưu = 0 + 127 = **127** = \`01111111₂\`
- Mantissa = phần sau dấu phẩy của 1.**0** = \`00000000000000000000000₂\` (23 bit)

Kết quả bit:
\`\`\`
0 01111111 00000000000000000000000
\`\`\`

Hex: \`0 3F 80 00 00\` → **0x3F800000**

Verify: \`(−1)⁰ × 1.0₂ × 2^(127−127) = 1 × 1 × 1 = 1.0\` ✓

---

### Ví dụ 2: Encode \`0.15625\` (float32)

Bước 1: chuyển sang binary.
\`\`\`
0.15625 × 2 = 0.3125  → 0
0.3125  × 2 = 0.625   → 0
0.625   × 2 = 1.25    → 1
0.25    × 2 = 0.5     → 0
0.5     × 2 = 1.0     → 1  (hết)
\`\`\`
→ \`0.00101₂\`

Bước 2: chuẩn hóa → \`1.01₂ × 2^(−3)\`

Bước 3:
- S = 0
- E thật = −3 → E lưu = −3 + 127 = **124** = \`01111100₂\`
- Mantissa = phần sau dấu phẩy của \`1.01000...\` = \`01000000000000000000000₂\`

Kết quả:
\`\`\`
0 01111100 01000000000000000000000
\`\`\`
= 0x3E200000

Verify: \`1.01₂ = 1 + 0.25 = 1.25\`. \`1.25 × 2^(−3) = 1.25 / 8 = 0.15625\` ✓

---

### Ví dụ 3: Decode \`0xC0490FDB\` ≈ −π

Tách 32 bit:
\`\`\`
C   0   4   9   0   F   D   B
1100 0000 0100 1001 0000 1111 1101 1011
\`\`\`

- S = **1** (bit 31) → âm
- E = \`10000000₂\` = 128 → exponent thật = 128 − 127 = **1**
- Mantissa (23 bit): \`10010010000111111011011₂\`

Value = \`−1 × 1.10010010000111111011011₂ × 2¹\`

Dịch dấu phẩy sang phải 1 bit:
\`−11.0010010000111111011011₂\`

= −(2 + 0 + 0.0010010000111111011011₂)

Phần lẻ:
\`\`\`
bit1 = 0: 0
bit2 = 0: 0
bit3 = 1: 2^(-3) = 0.125
bit4 = 0: 0
bit5 = 0: 0
bit6 = 1: 2^(-6) ≈ 0.015625
...
\`\`\`
Tổng xấp xỉ = 3.14159274... ≈ **π** → value ≈ **−3.14159274**

Giá trị π thực = 3.14159265... Sai khác ở chữ số thứ 8 — float32 chỉ có ~7 chữ số decimal.

---

### Ví dụ 4: Binary của \`0.1\` — vì sao repeating

Chuyển 0.1 sang binary:
\`\`\`
0.1 × 2 = 0.2  → 0
0.2 × 2 = 0.4  → 0
0.4 × 2 = 0.8  → 0
0.8 × 2 = 1.6  → 1
0.6 × 2 = 1.2  → 1
0.2 × 2 = 0.4  → 0  ← lặp lại từ đây!
0.4 × 2 = 0.8  → 0
0.8 × 2 = 1.6  → 1
0.6 × 2 = 1.2  → 1
...
\`\`\`

\`0.1₁₀ = 0.0001100110011001100...₂\` — **vô hạn tuần hoàn**!

Float32 cắt sau 23 bit mantissa. Giá trị lưu thực sự ≈ 0.100000001490116...
Float64 cắt sau 52 bit → ≈ 0.1000000000000000055511...

→ Khi cộng \`0.1 + 0.2\` cả hai đều bị lỗi làm tròn → kết quả không phải 0.3 chính xác.

⚠ **Lỗi thường gặp**:
\`\`\`go
if a + b == 0.3 {  // SAI — gần như không bao giờ true
    ...
}
// Đúng:
if math.Abs((a + b) - 0.3) < 1e-9 {
    ...
}
\`\`\`

---

### Ví dụ 5: NaN không bằng chính nó

\`\`\`go
nan := math.NaN()
fmt.Println(nan == nan)   // false  (đây là hành vi đặc biệt của NaN)
fmt.Println(nan != nan)   // true   ← cách duy nhất kiểm tra NaN bằng ==
\`\`\`

Trong Go: dùng \`math.IsNaN(x)\` thay vì \`x != x\` cho rõ ý.

---

## 4. Các giá trị đặc biệt (Special Values)

| Exponent bits | Mantissa | Giá trị |
|---------------|----------|---------|
| \`00000000\` (E=0) | = 0 | ±0 (signed zero) |
| \`00000000\` (E=0) | ≠ 0 | **Denormal** (subnormal) |
| \`11111111\` (E=255) | = 0 | **±Infinity** |
| \`11111111\` (E=255) | ≠ 0 | **NaN** (Not a Number) |
| 1–254 (bình thường) | bất kỳ | Số thông thường |

### 4.1. ±0 (Signed zero)

\`\`\`
+0: 0 00000000 00000000000000000000000 = 0x00000000
−0: 1 00000000 00000000000000000000000 = 0x80000000
\`\`\`

\`+0 == −0\` luôn là \`true\` trong IEEE 754 — nhưng \`1/+0 = +Inf\` còn \`1/−0 = −Inf\`.

### 4.2. Denormal (subnormal)

Khi exponent = 0, số không được chuẩn hóa — không có implicit leading 1:

\`\`\`
value = (−1)^S × 0.M₂ × 2^(−126)
\`\`\`

Denormals lấp đầy khoảng trống gần 0, tránh **underflow đột ngột**. Range: ~1.4×10⁻⁴⁵ đến ~1.2×10⁻³⁸ (float32).

### 4.3. ±Infinity

\`1.0 / 0.0 = +Inf\`, \`log(0) = −Inf\`. Phép toán tiếp tục hợp lệ: \`Inf + 5 = Inf\`, \`Inf − Inf = NaN\`.

### 4.4. NaN (Not a Number)

Kết quả của: \`0/0\`, \`sqrt(−1)\`, \`Inf − Inf\`, \`Inf × 0\`.

❓ **Câu hỏi tự nhiên**:
- *"Có bao nhiêu bit pattern NaN?"* — Rất nhiều: bất kỳ mantissa ≠ 0 nào với E=255. Float32 có ~16 triệu NaN.
- *"Quiet NaN vs Signaling NaN là gì?"* — Quiet NaN lan truyền im lặng qua phép tính. Signaling NaN raise exception (ít dùng trong practice).

📝 **Tóm tắt mục 4**:
- E=0, M=0: ±0 (nhớ +0 vs −0 có thể khác khi chia).
- E=0, M≠0: denormal — số rất nhỏ gần 0, không có leading 1.
- E=255, M=0: ±Inf — overflow hoặc chia cho 0.
- E=255, M≠0: NaN — kết quả vô nghĩa, lây lan qua mọi phép tính.

---

## 5. Precision Pitfalls — các bẫy độ chính xác

### 5.1. So sánh float bằng \`==\`

⚠ Không bao giờ so sánh float bằng \`==\` trừ khi biết chính xác lý do.

\`\`\`go
a := 0.1 + 0.2          // 0.30000000000000004
b := 0.3                 // 0.29999999999999999 (khác a)
fmt.Println(a == b)      // false

// Đúng — dùng epsilon:
const eps = 1e-9
fmt.Println(math.Abs(a - b) < eps)  // true
\`\`\`

### 5.2. Catastrophic Cancellation (triệt tiêu thảm họa)

Khi trừ hai số lớn gần nhau, sai số tương đối tăng vọt.

\`\`\`go
a := 1e8 + 1.0   // float64
b := 1e8
fmt.Println(a - b)   // Kỳ vọng 1.0, nhận được: 1.0 (float64 OK)

// float32 rõ hơn:
var x float32 = 1e8 + 1
var y float32 = 1e8
fmt.Println(x - y)   // 0 (!!) — float32 chỉ 7 chữ số, không phân biệt được 1e8 và 1e8+1
\`\`\`

💡 Ví dụ thực tế: \`sqrt(n+1) − sqrt(n)\` với n lớn. Thay bằng \`1 / (sqrt(n+1) + sqrt(n))\` tránh cancellation.

### 5.3. Không có associativity (hội kết)

\`\`\`go
a := (0.1 + 0.2) + 0.3   // 0.6000000000000001
b := 0.1 + (0.2 + 0.3)   // 0.6
fmt.Println(a == b)        // false
\`\`\`

Trình biên dịch **không được** reorder floating-point operations tùy ý — kết quả có thể khác.

🔁 **Dừng lại tự kiểm tra**:

1. Float32 \`0xBF800000\` là số gì?

<details>
<summary>Đáp án</summary>

Bit 31 = 1 → âm. E = \`01111111₂\` = 127 → exponent = 0. Mantissa = 0.
Value = −1.0 × 2⁰ = **−1.0**

</details>

2. Tại sao \`x == x\` có thể là \`false\`?

<details>
<summary>Đáp án</summary>

Khi \`x\` là \`NaN\`. IEEE 754 định nghĩa NaN không bằng bất cứ thứ gì kể cả chính nó.

</details>

---

## 6. Tóm tắt kiến trúc float32 vs float64

| Thuộc tính | float32 | float64 |
|-----------|---------|---------|
| Tổng bits | 32 | 64 |
| Sign | 1 bit | 1 bit |
| Exponent | 8 bit, bias 127 | 11 bit, bias 1023 |
| Mantissa | 23 bit | 52 bit |
| Decimal precision | ~7 chữ số | ~15–16 chữ số |
| Max value | ~3.4 × 10³⁸ | ~1.8 × 10³⁰⁸ |
| Min positive normal | ~1.2 × 10⁻³⁸ | ~2.2 × 10⁻³⁰⁸ |
| Go type | \`float32\` | \`float64\` (mặc định) |

💡 **Quy tắc thực tế**: Go mặc định dùng \`float64\`. Chỉ dùng \`float32\` khi cần tiết kiệm bộ nhớ (GPU, game, sensor data).

---

## 7. Bài tập

**Bài 1**: Encode số \`−0.375\` sang IEEE 754 float32. Cho kết quả dạng hex.

**Bài 2**: Decode \`0x42480000\`. Số thực đó bằng bao nhiêu?

**Bài 3**: Giải thích tại sao đoạn code sau có thể sinh ra kết quả sai:
\`\`\`go
sum := float32(0)
for i := 0; i < 10_000_000; i++ {
    sum += 0.1
}
fmt.Println(sum)  // Kỳ vọng 1_000_000.0
\`\`\`

**Bài 4**: Cho \`x = 1e15 + 0.5\`. Với float64, \`x − 1e15\` bằng bao nhiêu? Vì sao không phải 0.5?

---

## 8. Lời giải chi tiết

### Bài 1: Encode −0.375

**Bước 1** — Chuyển 0.375 sang binary:
\`\`\`
0.375 × 2 = 0.75  → 0
0.75  × 2 = 1.5   → 1
0.5   × 2 = 1.0   → 1 (hết)
\`\`\`
→ \`0.375 = 0.011₂\`

**Bước 2** — Chuẩn hóa: \`1.1₂ × 2^(−2)\`

**Bước 3** — Điền trường:
- S = 1 (âm)
- E lưu = −2 + 127 = 125 = \`01111101₂\`
- Mantissa = \`10000000000000000000000₂\`

**Kết quả**:
\`\`\`
1 01111101 10000000000000000000000
= BF C0 00 00 = 0xBFC00000
\`\`\`

Verify: \`(−1)¹ × 1.1₂ × 2^(125−127) = −1 × 1.5 × 0.25 = −0.375\` ✓

---

### Bài 2: Decode 0x42480000

Tách:
\`\`\`
0x42480000 = 0100 0010 0100 1000 0000 0000 0000 0000
\`\`\`
- S = 0
- E = \`10000100₂\` = 132 → exponent = 132 − 127 = **5**
- Mantissa: \`10010000000000000000000₂\`

Value = \`1.10010₂ × 2⁵\`

Dịch dấu phẩy phải 5 bit: \`110010.0₂\`
= 32 + 16 + 0 + 0 + 2 + 0 = **50.0**

Verify: 2⁵ = 32. \`1.1001₂ = 1 + 0.5 + 0.0625 = 1.5625\`. \`1.5625 × 32 = 50.0\` ✓

---

### Bài 3: Accumulation error

Float32 chỉ có ~7 chữ số decimal. Sau 10 triệu lần cộng 0.1 (đã bị làm tròn), sai số tích lũy. Đặc biệt khi \`sum\` đã lớn (~100k), delta 0.1 nhỏ hơn độ phân giải → một số phép cộng **không có hiệu lực** (round-off to nearest even). Kết quả điển hình: ~1,048,576 thay vì 1,000,000.

**Giải pháp**: dùng \`float64\`, hoặc dùng **Kahan summation algorithm**.

---

### Bài 4: Cancellation với 1e15

Float64 có ~15–16 chữ số có nghĩa. \`1e15 = 10^15\` dùng hết ~16 chữ số. Khi cộng \`+0.5\`, tổng là \`1000000000000000.5\` — phần \`.5\` rơi vào vị trí không được lưu vì float64 chỉ có 52 bit mantissa = ~15.9 decimal digits. Tổng được làm tròn thành \`1000000000000000.0\` (hoặc \`1000000000000001.0\`).

\`(1e15 + 0.5) − 1e15 = 0.0\` hoặc \`1.0\`, không phải \`0.5\`.

---

## Liên kết

- Bài trước: [Lesson 02 — Bitwise Operations](../lesson-02-bitwise-ops/README.md)
- Bài tiếp: [N2-L01 — Character Encoding](../../02-EncodingMemory/lesson-01-character-encoding/README.md)
- Trang chính nhóm: [01-NumberRepresentation](../index.html)
- [visualization.html](./visualization.html)
`;
