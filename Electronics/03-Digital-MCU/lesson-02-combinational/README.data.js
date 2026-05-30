// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: Electronics/03-Digital-MCU/lesson-02-combinational/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 02 — Mạch tổ hợp (Combinational Logic)

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Hiểu **mạch tổ hợp** là gì và vì sao ngõ ra chỉ phụ thuộc ngõ vào hiện tại (không có trạng thái nhớ).
- Phân tích và thiết kế **bộ cộng nhị phân**: half adder, full adder, ripple carry adder nhiều bit.
- Hiểu và dùng **multiplexer (mux)**: 2:1 và 4:1, bảng chân trị, ứng dụng.
- Hiểu và dùng **decoder**: 2:4 và 3:8, ứng dụng giải mã địa chỉ bộ nhớ và LED 7 đoạn.
- Rút gọn biểu thức logic bằng **bìa Karnaugh (K-map)** 2 và 3 biến.

## Kiến thức tiền đề

- [Lesson 01 — Boolean & Cổng logic](../lesson-01-boolean-logic-gates/) — AND, OR, NOT, XOR, bảng chân trị, biểu thức Boolean.

---

## 1. Mạch tổ hợp là gì?

### 1.1. Định nghĩa

💡 **Hình dung trước**: máy tính tiền trong siêu thị — bạn nhập số lượng và đơn giá, máy hiển thị tổng tiền ngay lập tức. Nếu bạn thay đổi số lượng, tổng thay đổi ngay. Máy không "nhớ" lần nhập trước — đó chính là đặc trưng của mạch tổ hợp.

**Mạch tổ hợp (combinational logic circuit)** là mạch số mà **ngõ ra tại mọi thời điểm chỉ phụ thuộc vào tổ hợp ngõ vào tại thời điểm đó**, không phụ thuộc vào lịch sử trạng thái trước đó.

Về mặt hình thức: nếu ngõ vào là X₁, X₂, ..., Xₙ thì mỗi ngõ ra Yᵢ được tính bởi một hàm Boolean thuần túy:

\`\`\`
Yᵢ = fᵢ(X₁, X₂, ..., Xₙ)
\`\`\`

Không có phần tử lưu trữ (flip-flop, latch), không có đường hồi tiếp từ ngõ ra về ngõ vào.

**Vì sao phân biệt mạch tổ hợp và mạch tuần tự?**

| Đặc điểm | Mạch tổ hợp | Mạch tuần tự (Lesson 03) |
|----------|-------------|--------------------------|
| Ngõ ra phụ thuộc | Ngõ vào hiện tại | Ngõ vào + trạng thái hiện tại |
| Có phần tử nhớ | Không | Có (flip-flop, register) |
| Ví dụ | Bộ cộng, mux, decoder | Bộ đếm, thanh ghi, bộ nhớ |
| Clock cần thiết? | Không | Thường có |

❓ **Câu hỏi tự nhiên:**

*"Nếu mạch tổ hợp không nhớ, vậy làm sao máy tính lưu dữ liệu?"* — Lưu dữ liệu là việc của mạch tuần tự (flip-flop, SRAM). Mạch tổ hợp chỉ xử lý và biến đổi tín hiệu, không lưu. Trong thực tế, CPU dùng cả hai loại: ALU (xử lý) là mạch tổ hợp, còn register file (lưu kết quả trung gian) là mạch tuần tự.

*"Có thể xác định mạch tổ hợp hay tuần tự bằng cách nào?"* — Nhìn vào sơ đồ: nếu không có flip-flop hoặc latch và không có đường phản hồi, đó là mạch tổ hợp.

### 1.2. Phương pháp phân tích và thiết kế

**Phân tích** (đã có mạch, tìm chức năng):
1. Viết biểu thức Boolean cho từng cổng theo thứ tự từ ngõ vào → ngõ ra.
2. Lập bảng chân trị với mọi tổ hợp ngõ vào.
3. Rút ra chức năng.

**Thiết kế** (có yêu cầu, tìm mạch):
1. Xác định số ngõ vào và ngõ ra.
2. Lập bảng chân trị từ đặc tả bài toán.
3. Viết biểu thức Boolean (SOP hoặc POS).
4. Rút gọn (dùng K-map hoặc đại số Boolean).
5. Vẽ sơ đồ mạch.

📝 **Tóm tắt mục 1**

- Mạch tổ hợp: ngõ ra = hàm Boolean của ngõ vào hiện tại, không nhớ lịch sử.
- Không có flip-flop, không có hồi tiếp.
- Khối xây dựng cơ bản của ALU, mux, decoder, encoder.

---

## 2. Bộ cộng nhị phân (Binary Adder)

### 2.1. Half Adder (Bộ cộng nửa)

💡 **Hình dung**: cộng 2 chữ số thập phân 1 chữ số, ví dụ 7 + 5 = 12. Kết quả có 2 phần: chữ số hàng đơn vị (2) và chữ số nhớ sang hàng chục (1). Half adder làm đúng điều này, nhưng với số nhị phân 1 bit.

**Half adder** nhận 2 ngõ vào A, B (1-bit) và cho 2 ngõ ra:
- **Sum** = bit tổng tại vị trí hiện tại.
- **Carry** = bit nhớ sang vị trí cao hơn.

**Bảng chân trị half adder:**

| A | B | Sum | Carry |
|---|---|-----|-------|
| 0 | 0 |  0  |   0   |
| 0 | 1 |  1  |   0   |
| 1 | 0 |  1  |   0   |
| 1 | 1 |  0  |   1   |

**Nhận xét từ bảng:**
- Sum = 1 khi A ≠ B, Sum = 0 khi A = B → **Sum = A XOR B**.
- Carry = 1 chỉ khi cả A = 1 và B = 1 → **Carry = A AND B**.

**Biểu thức Boolean:**
\`\`\`
Sum   = A ⊕ B    (XOR)
Carry = A · B    (AND)
\`\`\`

**Sơ đồ cổng**: 1 cổng XOR (cho Sum) + 1 cổng AND (cho Carry).

**Walk-through ví dụ 1**: A = 1, B = 1.
- Sum = 1 XOR 1 = 0.
- Carry = 1 AND 1 = 1.
- Kết quả: 01 + 01 = 10 (tức 1 + 1 = 2 trong hệ thập phân). Chính xác!

**Walk-through ví dụ 2**: A = 1, B = 0.
- Sum = 1 XOR 0 = 1.
- Carry = 1 AND 0 = 0.
- Kết quả: 01 + 00 = 01 (tức 1 + 0 = 1). Chính xác!

**Walk-through ví dụ 3**: A = 0, B = 0.
- Sum = 0 XOR 0 = 0.
- Carry = 0 AND 0 = 0.
- Kết quả: 00 + 00 = 00. Chính xác!

⚠ **Hạn chế của half adder**: chỉ cộng được 2 bit cùng một vị trí. Khi cộng số nhiều bit, các vị trí giữa cần cộng thêm bit nhớ từ vị trí thấp hơn (Carry-in). Half adder không có ngõ vào này — đó là lý do cần **full adder**.

### 2.2. Full Adder (Bộ cộng đầy đủ)

**Full adder** nhận **3 ngõ vào**: A, B, và **Cᵢₙ** (carry-in, bit nhớ từ cột thấp hơn), cho 2 ngõ ra **Sum** và **Cₒᵤₜ** (carry-out).

**Bảng chân trị full adder:**

| A | B | Cᵢₙ | Sum | Cₒᵤₜ |
|---|---|-----|-----|------|
| 0 | 0 |  0  |  0  |  0   |
| 0 | 0 |  1  |  1  |  0   |
| 0 | 1 |  0  |  1  |  0   |
| 0 | 1 |  1  |  0  |  1   |
| 1 | 0 |  0  |  1  |  0   |
| 1 | 0 |  1  |  0  |  1   |
| 1 | 1 |  0  |  0  |  1   |
| 1 | 1 |  1  |  1  |  1   |

**Biểu thức Boolean (dẫn xuất từ bảng):**
\`\`\`
Sum  = A ⊕ B ⊕ Cᵢₙ
Cₒᵤₜ = (A · B) + (Cᵢₙ · (A ⊕ B))
\`\`\`

💡 **Tại sao Sum = A ⊕ B ⊕ Cᵢₙ?** XOR liên tiếp đếm số bit 1 theo modulo 2: nếu số bit 1 trong {A, B, Cᵢₙ} là lẻ → Sum = 1, nếu chẵn → Sum = 0. Đây chính xác là bit đơn vị khi cộng 3 bit 1-bit.

**Cₒᵤₜ = 1 khi nào?** Khi tổng A + B + Cᵢₙ ≥ 2 (tức là có ít nhất 2 trong 3 bit bằng 1). Kiểm tra: hai trường hợp A=B=1 bất kể Cᵢₙ; và Cᵢₙ=1 khi A hoặc B = 1.

**Walk-through ví dụ 4**: A = 1, B = 1, Cᵢₙ = 1.
- Sum = 1 XOR 1 XOR 1 = 1.
- Cₒᵤₜ = (1·1) + (1·(1 XOR 1)) = 1 + (1·0) = 1 + 0 = 1.
- Kết quả nhị phân: 11 (tức 1+1+1 = 3 = 11₂). Chính xác!

**Walk-through ví dụ 5**: A = 1, B = 0, Cᵢₙ = 1.
- Sum = 1 XOR 0 XOR 1 = 0.
- Cₒᵤₜ = (1·0) + (1·(1 XOR 0)) = 0 + (1·1) = 1.
- 1 + 0 + 1 = 2 = 10₂ → Sum=0, Cₒᵤₜ=1. Chính xác!

**Ghép full adder từ 2 half adder:**
\`\`\`
HA1: Sum1 = A ⊕ B,        C1 = A·B
HA2: Sum  = Sum1 ⊕ Cᵢₙ,   C2 = Sum1·Cᵢₙ
Cₒᵤₜ = C1 + C2
\`\`\`

### 2.3. Ripple Carry Adder — Bộ cộng nhiều bit

Để cộng 2 số nhị phân n-bit (ví dụ A₃A₂A₁A₀ + B₃B₂B₁B₀), ghép n full adder nối tiếp: Cₒᵤₜ của bit thấp hơn nối vào Cᵢₙ của bit kế tiếp. Bit thấp nhất (bit 0) dùng Cᵢₙ = 0.

**Cộng 4-bit: A = 0110 (6) + B = 0111 (7) = 1101 (13)**

\`\`\`
Bit 0: A₀=0, B₀=1, Cᵢₙ=0 → Sum₀=1, Cout₀=0
Bit 1: A₁=1, B₁=1, Cᵢₙ=0 → Sum₁=0, Cout₁=1
Bit 2: A₂=1, B₂=1, Cᵢₙ=1 → Sum₂=1, Cout₂=1
Bit 3: A₃=0, B₃=0, Cᵢₙ=1 → Sum₃=1, Cout₃=0
Kết quả: Cout₃ Sum₃ Sum₂ Sum₁ Sum₀ = 0 1 1 0 1 = 01101₂ = 13₁₀ ✓
\`\`\`

**Ví dụ 2 — 4-bit: A = 1010 (10) + B = 0110 (6) = 10000 (16)**

\`\`\`
Bit 0: A₀=0, B₀=0, Cᵢₙ=0 → Sum₀=0, Cout₀=0
Bit 1: A₁=1, B₁=1, Cᵢₙ=0 → Sum₁=0, Cout₁=1
Bit 2: A₂=0, B₂=1, Cᵢₙ=1 → Sum₂=0, Cout₂=1
Bit 3: A₃=1, B₃=0, Cᵢₙ=1 → Sum₃=0, Cout₃=1
Kết quả: Cout₃=1, Sum=0000 → 10000₂ = 16₁₀ ✓
\`\`\`

**Ví dụ 3 — 4-bit: A = 0011 (3) + B = 0101 (5) = 1000 (8)**

\`\`\`
Bit 0: 1,1,0 → Sum=0, C=1
Bit 1: 1,0,1 → Sum=0, C=1
Bit 2: 0,1,1 → Sum=0, C=1
Bit 3: 0,0,1 → Sum=1, C=0
Kết quả: 01000₂ = 8₁₀ ✓
\`\`\`

**Ví dụ 4 — 4-bit: A = 1111 (15) + B = 0001 (1) = 10000 (16)**

\`\`\`
Bit 0: 1,1,0 → Sum=0, C=1
Bit 1: 1,0,1 → Sum=0, C=1
Bit 2: 1,0,1 → Sum=0, C=1
Bit 3: 1,0,1 → Sum=0, C=1
Kết quả: Cout=1, Sum=0000 → 10000₂ = 16₁₀ ✓
\`\`\`

❓ **Câu hỏi tự nhiên:**

*"Ripple carry có nhược điểm gì không?"* — Có. Mỗi full adder phải chờ Cᵢₙ từ bit trước, tạo ra chuỗi trễ lan truyền (ripple delay). Bộ cộng 64-bit có thể chậm vì phải qua 64 FA nối tiếp. Giải pháp trong CPU thực tế là **carry-lookahead adder** (CLA) — tính Carry song song thay vì nối tiếp. Đây là chủ đề nâng cao.

*"Phải làm gì khi kết quả tràn số?"* — Carry-out từ bit cao nhất là dấu hiệu tràn (overflow) với số không dấu. Với số có dấu (bù 2), overflow khi Cout₍ₙ₋₁₎ ≠ Cout₍ₙ₋₂₎.

🔁 **Tự kiểm tra**: Cộng nhị phân 4-bit: 0101 + 1011 = ?

<details>
<summary>Đáp án</summary>

\`\`\`
Bit 0: 1+1+0 = 0, C=1
Bit 1: 0+1+1 = 0, C=1
Bit 2: 1+0+1 = 0, C=1
Bit 3: 0+1+1 = 0, C=1
Kết quả: Cout=1, Sum=0000 → 10000₂ = 16₁₀
Kiểm tra: 0101₂ = 5, 1011₂ = 11, 5+11=16 ✓
\`\`\`

</details>

📝 **Tóm tắt mục 2**

- Half adder: Sum = A XOR B, Carry = A AND B. Chỉ cộng 2 bit.
- Full adder: 3 ngõ vào (A, B, Cᵢₙ), Sum = A XOR B XOR Cᵢₙ, Cₒᵤₜ = majority(A, B, Cᵢₙ).
- Ripple carry adder n-bit: ghép n FA, Cₒᵤₜ của bit i → Cᵢₙ của bit i+1.
- Trễ lan truyền carry là nhược điểm chính của ripple carry.

---

## 3. Multiplexer (MUX)

### 3.1. Khái niệm

💡 **Hình dung**: bộ chuyển mạch TV nhiều kênh — bạn có 4 nguồn video (đầu DVD, máy game, camera, laptop) nhưng chỉ 1 màn hình. Remote control chọn nguồn nào được hiển thị. MUX làm chính xác vậy với tín hiệu số.

**Multiplexer (MUX)** là mạch tổ hợp chọn **1 trong N ngõ vào** để chuyển đến ngõ ra, dựa trên giá trị của các **đường chọn (select lines)**.

MUX N:1 có:
- N ngõ vào dữ liệu: D₀, D₁, ..., D_{N-1}
- log₂(N) đường chọn: S₀, S₁, ...
- 1 ngõ ra: Y

### 3.2. MUX 2:1

**Bảng chân trị MUX 2:1** (2 ngõ vào D₀, D₁; 1 đường chọn S):

| S | Y |
|---|---|
| 0 | D₀ |
| 1 | D₁ |

**Biểu thức Boolean:**
\`\`\`
Y = (NOT S · D₀) + (S · D₁)
  = S'·D₀ + S·D₁
\`\`\`

**Ví dụ số**: S = 0, D₀ = 1, D₁ = 0 → Y = 1'·1 + 0·0 = **1·1 + 0 = 1**. Đúng: chọn D₀ = 1.

**Ví dụ số 2**: S = 1, D₀ = 0, D₁ = 1 → Y = 0'·0 + 1·1 = **0 + 1 = 1**. Đúng: chọn D₁ = 1.

### 3.3. MUX 4:1

**MUX 4:1** có 4 ngõ vào (D₀–D₃), 2 đường chọn (S₁, S₀), 1 ngõ ra Y.

**Bảng chân trị MUX 4:1:**

| S₁ | S₀ | Y  |
|----|----|----|
|  0 |  0 | D₀ |
|  0 |  1 | D₁ |
|  1 |  0 | D₂ |
|  1 |  1 | D₃ |

**Biểu thức Boolean:**
\`\`\`
Y = S₁'·S₀'·D₀ + S₁'·S₀·D₁ + S₁·S₀'·D₂ + S₁·S₀·D₃
\`\`\`

**Ví dụ số**: S₁=1, S₀=0 → chọn D₂. Nếu D₂=1 thì Y=1; nếu D₂=0 thì Y=0.

**Ví dụ số 2**: S₁=0, S₀=1 → chọn D₁. Nếu D₁=0 thì Y=0.

**Ví dụ số 3**: S₁=1, S₀=1 → chọn D₃. Nếu D₃=1 thì Y=1.

**Ví dụ số 4**: S₁=0, S₀=0 → chọn D₀. Bất kể D₁, D₂, D₃ là gì.

### 3.4. Ứng dụng

- **Dồn kênh (multiplexing)**: truyền N tín hiệu song song qua 1 dây bằng cách chọn lần lượt từng kênh theo thời gian.
- **Thực hiện hàm Boolean bất kỳ**: MUX 2ⁿ:1 có thể thực hiện bất kỳ hàm Boolean n biến nào (đưa bảng chân trị vào các ngõ vào D).
- **Bus selector trong vi xử lý**: chọn nguồn dữ liệu cho ALU (từ register file hay immediate value).

❓ **Câu hỏi tự nhiên:**

*"MUX 8:1 cần bao nhiêu đường chọn?"* — log₂(8) = 3 đường chọn (S₂, S₁, S₀). Ví dụ S₂=1, S₁=0, S₀=1 → chọn D₅.

*"Có thể ghép nhiều MUX 2:1 thành MUX 4:1 không?"* — Có. Dùng 3 MUX 2:1: hai MUX đầu chọn bằng S₀ (lọc xuống D₀/D₁ và D₂/D₃), MUX cuối chọn bằng S₁ (chọn giữa 2 kết quả).

📝 **Tóm tắt mục 3**

- MUX N:1: N ngõ vào, log₂(N) đường chọn, 1 ngõ ra.
- MUX 2:1: Y = S'·D₀ + S·D₁.
- MUX 4:1: 2 đường chọn, chọn 1 trong 4 ngõ vào.
- Ứng dụng: dồn kênh, thực hiện hàm Boolean, bus selector.

---

## 4. Decoder

### 4.1. Khái niệm

💡 **Hình dung**: bảng điện nhiều phòng trong khách sạn. Khi lễ tân nhập số phòng (ví dụ 02), chỉ đèn phòng 02 sáng lên, tất cả phòng khác tắt. Decoder làm đúng như vậy — từ mã nhị phân đầu vào, chỉ 1 đường ra tương ứng lên mức cao.

**Decoder n:2ⁿ** nhận n bit đầu vào và kích hoạt **đúng 1** trong 2ⁿ ngõ ra (còn lại ở mức thấp).

Decoder còn có thể có ngõ vào **Enable (EN)**: nếu EN=0, mọi ngõ ra đều 0 bất kể đầu vào.

### 4.2. Decoder 2:4

**Decoder 2:4** (2 ngõ vào A₁, A₀; 4 ngõ ra Y₀–Y₃):

| A₁ | A₀ | Y₀ | Y₁ | Y₂ | Y₃ |
|----|----|----|----|----|-----|
|  0 |  0 |  1 |  0 |  0 |  0 |
|  0 |  1 |  0 |  1 |  0 |  0 |
|  1 |  0 |  0 |  0 |  1 |  0 |
|  1 |  1 |  0 |  0 |  0 |  1 |

**Biểu thức Boolean:**
\`\`\`
Y₀ = A₁'·A₀'    (minterm m₀)
Y₁ = A₁'·A₀     (minterm m₁)
Y₂ = A₁ ·A₀'    (minterm m₂)
Y₃ = A₁ ·A₀     (minterm m₃)
\`\`\`

**Ví dụ số**: A₁=1, A₀=0 → Y₂=1, Y₀=Y₁=Y₃=0. Đúng vì 10₂ = 2 → kích hoạt Y₂.

**Ví dụ số 2**: A₁=1, A₀=1 → Y₃=1. 11₂ = 3 → kích hoạt Y₃.

### 4.3. Decoder 3:8

**Decoder 3:8** (3 ngõ vào A₂, A₁, A₀; 8 ngõ ra Y₀–Y₇):

| A₂ | A₁ | A₀ | Ngõ ra active |
|----|----|----|--------------|
|  0 |  0 |  0 | Y₀ |
|  0 |  0 |  1 | Y₁ |
|  0 |  1 |  0 | Y₂ |
|  0 |  1 |  1 | Y₃ |
|  1 |  0 |  0 | Y₄ |
|  1 |  0 |  1 | Y₅ |
|  1 |  1 |  0 | Y₆ |
|  1 |  1 |  1 | Y₇ |

Biểu thức tổng quát: **Yᵢ = minterm thứ i** = tích của n literal (A₂ hoặc A₂', A₁ hoặc A₁', A₀ hoặc A₀').

### 4.4. Ứng dụng decoder

**Giải mã địa chỉ bộ nhớ (memory address decoding)**:

CPU có bus địa chỉ 16-bit → 2¹⁶ = 65536 ô nhớ. Dùng decoder để phân vùng bộ nhớ: A₁₅–A₁₄ vào decoder 2:4 → 4 vùng 16KB, mỗi Y kích hoạt CS (chip select) của 1 chip nhớ.

**Ví dụ**: A₁₅=0, A₁₄=0 → Y₀=1 → chọn RAM vùng 0x0000–0x3FFF.

**LED 7 đoạn (7-segment display)**:

Mỗi chữ số 0–9 cần bật/tắt 7 đoạn LED (a–g). Decoder BCD-to-7-segment (ví dụ IC 7447) nhận 4 bit BCD đầu vào (0000–1001) và điều khiển 7 đoạn LED trực tiếp.

**Mở rộng decoder**: 2 decoder 3:8 + 1 ngõ vào Enable → có thể tạo decoder 4:16.

❓ **Câu hỏi tự nhiên:**

*"Decoder và demultiplexer (DEMUX) có khác nhau không?"* — Rất giống nhau về cấu trúc. DEMUX có thêm 1 ngõ vào dữ liệu: ngõ ra tương ứng nhận giá trị từ ngõ vào dữ liệu, các ngõ ra còn lại = 0. Decoder là DEMUX với ngõ vào dữ liệu luôn = 1.

🔁 **Tự kiểm tra**: Với decoder 3:8, đầu vào A₂A₁A₀ = 101. Ngõ ra nào lên 1?

<details>
<summary>Đáp án</summary>

101₂ = 5 → Y₅ = 1, tất cả Y còn lại = 0.
Y₅ = A₂·A₁'·A₀ = 1·1·1 = 1 ✓

</details>

📝 **Tóm tắt mục 4**

- Decoder n:2ⁿ: n bit vào → kích hoạt đúng 1 trong 2ⁿ ngõ ra.
- Mỗi ngõ ra = 1 minterm của n biến vào.
- Ứng dụng: giải mã địa chỉ bộ nhớ, LED 7 đoạn, phân vùng I/O.

---

## 5. Rút gọn bằng bìa Karnaugh (K-map)

### 5.1. Tại sao cần rút gọn?

💡 **Hình dung**: bạn có công thức nấu ăn 20 bước phức tạp, nhưng sau khi phân tích, chỉ cần 7 bước cốt lõi. Tối giản hóa giảm số cổng logic → mạch rẻ hơn, tiêu thụ điện ít hơn, nhanh hơn (ít trễ truyền tín hiệu).

Biểu thức SOP từ bảng chân trị thường có thể rút gọn bằng đại số Boolean, nhưng khó nhìn ra quy luật khi có nhiều biến. **Bìa Karnaugh (K-map)** là công cụ đồ họa giúp nhìn thấy các nhóm có thể gộp lại.

### 5.2. Nguyên tắc K-map

**Tính chất cốt lõi**: hai ô kề nhau trên K-map **chỉ khác nhau 1 bit** (mã Gray). Khi gộp 2 ô: 1 biến bị triệt tiêu. Khi gộp 4 ô: 2 biến bị triệt tiêu. Khi gộp 8 ô: 3 biến bị triệt tiêu.

**Quy tắc vẽ nhóm:**
1. Chỉ gộp các ô có giá trị 1.
2. Nhóm phải là hình chữ nhật (1×1, 1×2, 2×2, 2×4, ...) với kích thước là lũy thừa của 2.
3. Ưu tiên nhóm lớn nhất có thể.
4. Mỗi ô 1 phải thuộc ít nhất 1 nhóm; có thể thuộc nhiều nhóm.
5. K-map "cuộn tròn" — cột/hàng đầu kề với cột/hàng cuối.

### 5.3. K-map 2 biến

K-map 2 biến (A, B), 4 ô:

\`\`\`
     B=0  B=1
A=0 [m₀] [m₁]
A=1 [m₂] [m₃]
\`\`\`

**Ví dụ 1**: F = Σm(1, 2, 3) (hàm = 1 tại m₁, m₂, m₃).

\`\`\`
     B=0  B=1
A=0 [ 0 ] [ 1 ]  ← hàng A=0
A=1 [ 1 ] [ 1 ]  ← hàng A=1
\`\`\`

Nhận dạng nhóm:
- Nhóm 1: {m₁, m₃} (cột B=1): cả 2 có B=1, A thay đổi → B là biến chung → **B**.
- Nhóm 2: {m₂, m₃} (hàng A=1): cả 2 có A=1, B thay đổi → **A**.

Biểu thức rút gọn: **F = A + B** (thay vì A'B + AB' + AB — 3 tích hạng).

Kiểm tra: m₁(A=0,B=1): 0+1=1 ✓. m₂(A=1,B=0): 1+0=1 ✓. m₃(A=1,B=1): 1+1=1 ✓. m₀(A=0,B=0): 0+0=0 ✓.

### 5.4. K-map 3 biến

K-map 3 biến (A, B, C), 8 ô, sắp theo mã Gray trên trục BC:

\`\`\`
      BC=00  BC=01  BC=11  BC=10
A=0  [ m₀ ] [ m₁ ] [ m₃ ] [ m₂ ]
A=1  [ m₄ ] [ m₅ ] [ m₇ ] [ m₆ ]
\`\`\`

⚠ **Thứ tự cột là BC=00, 01, 11, 10 (mã Gray), không phải 00, 01, 10, 11** — đây là lỗi phổ biến nhất khi vẽ K-map. Nếu sắp thứ tự sai, các ô kề nhau sẽ không chỉ khác 1 bit → gộp nhầm → kết quả sai.

**Ví dụ 2 K-map 3 biến**: F = Σm(0, 1, 2, 4, 5)

\`\`\`
      BC=00  BC=01  BC=11  BC=10
A=0  [  1  ] [  1  ] [  0  ] [  1  ]
A=1  [  1  ] [  1  ] [  0  ] [  0  ]
\`\`\`

Nhận dạng nhóm:
- Nhóm 1 (4 ô): {m₀, m₁, m₄, m₅} — toàn bộ cột BC=00 và BC=01. Ô này có C=0 (vì BC=00 và BC=01 đều có C=0 ở bit C... nhưng chú ý ký hiệu: BC=00 là B=0,C=0 và BC=01 là B=0,C=1). Nhóm {m₀,m₁,m₄,m₅}: A và B tự do (0 và 1), C cũng tự do — không đúng vì m₃,m₇ không trong nhóm.

Hãy phân tích lại cẩn thận với bảng cụ thể:

| m | A | B | C | F |
|---|---|---|---|---|
| 0 | 0 | 0 | 0 | 1 |
| 1 | 0 | 0 | 1 | 1 |
| 2 | 0 | 1 | 0 | 1 |
| 3 | 0 | 1 | 1 | 0 |
| 4 | 1 | 0 | 0 | 1 |
| 5 | 1 | 0 | 1 | 1 |
| 6 | 1 | 1 | 0 | 0 |
| 7 | 1 | 1 | 1 | 0 |

\`\`\`
      BC=00  BC=01  BC=11  BC=10
A=0  [m₀=1] [m₁=1] [m₃=0] [m₂=1]
A=1  [m₄=1] [m₅=1] [m₇=0] [m₆=0]
\`\`\`

Nhận dạng nhóm:
- **Nhóm 1** (4 ô): {m₀, m₁, m₄, m₅} — cột BC=00 và BC=01, tức B=0 (B=0 trong cả 4 minterm: m₀[B=0], m₁[B=0], m₄[B=0], m₅[B=0]). A và C thay đổi tự do → chỉ B=0 là chung → **B'**.
- **Nhóm 2** (2 ô): {m₀, m₂} — cột BC=00 và BC=10 ở hàng A=0 (các ô này kề nhau vì K-map cuộn — cột BC=10 và BC=00 là "kề" nhau!). Hai ô này: A=0, C=0 (m₀: A=0,B=0,C=0; m₂: A=0,B=1,C=0). B thay đổi → **A'·C'**.

Biểu thức rút gọn: **F = B' + A'C'**.

Kiểm tra: m₀(0,0,0): B'=1 → 1 ✓. m₁(0,0,1): B'=1 → 1 ✓. m₂(0,1,0): A'C'=1 → 1 ✓. m₃(0,1,1): B'=0, A'C'=0 → 0 ✓. m₄(1,0,0): B'=1 → 1 ✓. m₅(1,0,1): B'=1 → 1 ✓. m₆(1,1,0): B'=0, A'C'=0 → 0 ✓. m₇(1,1,1): B'=0, A'C'=0 → 0 ✓.

Kết quả đúng hoàn toàn.

❓ **Câu hỏi tự nhiên:**

*"K-map có thể dùng cho bao nhiêu biến?"* — Thực tế dùng tốt đến 4 biến (16 ô). Từ 5-6 biến trở lên rất khó nhìn, người ta chuyển sang dùng thuật toán Quine-McCluskey hoặc EDA software.

*"Don't-care (X) trong K-map là gì?"* — Tổ hợp đầu vào không bao giờ xuất hiện trong thực tế (ví dụ BCD chỉ có 0000–1001, các trạng thái 1010–1111 là don't-care). Có thể gán X = 0 hoặc 1 tùy ý để tạo nhóm lớn hơn → rút gọn tốt hơn.

🔁 **Tự kiểm tra**: Rút gọn F = Σm(0, 3, 5, 6) với 3 biến A, B, C.

<details>
<summary>Đáp án</summary>

Bảng giá trị:
- m₀(A=0,B=0,C=0)=1, m₃(A=0,B=1,C=1)=1, m₅(A=1,B=0,C=1)=1, m₆(A=1,B=1,C=0)=1

K-map:
\`\`\`
      BC=00  BC=01  BC=11  BC=10
A=0  [  1  ] [  0  ] [  1  ] [  0  ]
A=1  [  0  ] [  1  ] [  0  ] [  1  ]
\`\`\`

Không thể gộp nhóm 4 ô. Kiểm tra từng cặp:
- {m₀, m₃}: A=0, BC thay đổi (00↔11 — không kề nhau).
- Phải dùng SOP tối thiểu: F = A'B'C' + A'BC + AB'C + ABC'

Không rút gọn được hơn — đây là hàm XOR của 3 biến thực ra = A⊕B⊕C (= 1 khi số lẻ bit 1).

Biểu thức: **F = A ⊕ B ⊕ C**

</details>

📝 **Tóm tắt mục 5**

- K-map: công cụ đồ họa rút gọn biểu thức Boolean, tránh tính toán đại số dài.
- Nguyên tắc: gộp nhóm lớn nhất có thể (1, 2, 4, 8... ô), mỗi nhóm giảm số literal.
- Thứ tự cột/hàng phải theo mã Gray (00, 01, 11, 10).
- K-map cuộn tròn: cột đầu kề cột cuối, hàng đầu kề hàng cuối.

---

## 6. Bài tập + Lời giải chi tiết

### Bài tập

**Bài 1**: Thiết kế half adder. Vẽ bảng chân trị, viết biểu thức Boolean và vẽ sơ đồ cổng logic.

**Bài 2**: Thiết kế full adder. Vẽ bảng chân trị đầy đủ, viết biểu thức Boolean Sum và Cₒᵤₜ. Kiểm tra với A=1, B=1, Cᵢₙ=0.

**Bài 3**: Cộng nhị phân 4-bit: A = 1001 (9) và B = 0111 (7). Thực hiện từng bước qua 4 full adder, cho kết quả Sum và Cout.

**Bài 4**: Thiết kế MUX 4:1 dùng cổng AND, OR, NOT. Cho S₁=0, S₀=1, D₀=1, D₁=0, D₂=1, D₃=0. Tính ngõ ra Y.

**Bài 5**: Với decoder 3:8, A₂A₁A₀=110. Xác định ngõ ra active và viết biểu thức minterm tương ứng.

**Bài 6 (K-map)**: Rút gọn hàm F = Σm(0, 1, 4, 5, 7) với 3 biến A, B, C bằng K-map. Vẽ K-map, xác định nhóm, viết biểu thức rút gọn, kiểm tra.

**Bài 7 (nâng cao)**: Dùng MUX 4:1 để thực hiện hàm F = A'B + AB'. Biết S₁=A, S₀=B, xác định các giá trị D₀, D₁, D₂, D₃.

### Lời giải chi tiết

**Bài 1 — Half adder:**

Bảng chân trị:

| A | B | Sum | Carry |
|---|---|-----|-------|
| 0 | 0 |  0  |   0   |
| 0 | 1 |  1  |   0   |
| 1 | 0 |  1  |   0   |
| 1 | 1 |  0  |   1   |

Nhận xét: Sum=1 khi A≠B → Sum = A XOR B. Carry=1 chỉ khi cả A=B=1 → Carry = A AND B.

Biểu thức: **Sum = A ⊕ B**, **Carry = A · B**.

Sơ đồ: A và B → cổng XOR cho Sum; A và B → cổng AND cho Carry. Tổng cộng 2 cổng.

**Bài 2 — Full adder:**

Bảng chân trị (8 hàng, đã liệt kê ở mục 2.2).

Biểu thức: Sum = A ⊕ B ⊕ Cᵢₙ; Cₒᵤₜ = AB + Cᵢₙ(A⊕B).

Kiểm tra A=1, B=1, Cᵢₙ=0:
- Sum = 1⊕1⊕0 = 0⊕0 = 0.
- Cₒᵤₜ = 1·1 + 0·(1⊕1) = 1 + 0 = **1**.
- 1+1+0 = 2 = 10₂ → Sum=0, Cₒᵤₜ=1. Chính xác!

**Bài 3 — Cộng 4-bit 1001 + 0111:**

\`\`\`
Step 1 — Bit 0: A₀=1, B₀=1, Cᵢₙ=0
  Sum₀ = 1⊕1⊕0 = 0
  Cout₀ = 1·1 + 0·0 = 1

Step 2 — Bit 1: A₁=0, B₁=1, Cᵢₙ=1
  Sum₁ = 0⊕1⊕1 = 0
  Cout₁ = 0·1 + 1·(0⊕1) = 0 + 1·1 = 1

Step 3 — Bit 2: A₂=0, B₂=1, Cᵢₙ=1
  Sum₂ = 0⊕1⊕1 = 0
  Cout₂ = 0·1 + 1·(0⊕1) = 0+1 = 1

Step 4 — Bit 3: A₃=1, B₃=0, Cᵢₙ=1
  Sum₃ = 1⊕0⊕1 = 0
  Cout₃ = 1·0 + 1·(1⊕0) = 0+1 = 1

Kết quả: Cout₃=1, Sum=0000 → 10000₂ = 16₁₀
Kiểm tra: 9 + 7 = 16 ✓
\`\`\`

**Bài 4 — MUX 4:1 với S₁=0, S₀=1:**

S₁=0, S₀=1 → chọn D₁ (theo bảng: 01 → D₁).

D₁ = 0, vậy **Y = 0**.

Kiểm tra bằng biểu thức:
\`\`\`
Y = S₁'·S₀'·D₀ + S₁'·S₀·D₁ + S₁·S₀'·D₂ + S₁·S₀·D₃
  = 1·0·1    + 1·1·0    + 0·0·1    + 0·1·0
  = 0        + 0        + 0        + 0
  = 0 ✓
\`\`\`

**Bài 5 — Decoder 3:8 với 110:**

A₂A₁A₀ = 1,1,0 = 6 → kích hoạt **Y₆ = 1**, tất cả Y₀–Y₅, Y₇ = 0.

Biểu thức minterm: **Y₆ = A₂·A₁·A₀'** = 1·1·1 = 1 ✓.

**Bài 6 — K-map F = Σm(0, 1, 4, 5, 7):**

| m | A | B | C | F |
|---|---|---|---|---|
| 0 | 0 | 0 | 0 | 1 |
| 1 | 0 | 0 | 1 | 1 |
| 2 | 0 | 1 | 0 | 0 |
| 3 | 0 | 1 | 1 | 0 |
| 4 | 1 | 0 | 0 | 1 |
| 5 | 1 | 0 | 1 | 1 |
| 6 | 1 | 1 | 0 | 0 |
| 7 | 1 | 1 | 1 | 1 |

K-map:

\`\`\`
      BC=00  BC=01  BC=11  BC=10
A=0  [m₀=1] [m₁=1] [m₃=0] [m₂=0]
A=1  [m₄=1] [m₅=1] [m₇=1] [m₆=0]
\`\`\`

Nhận dạng nhóm:
- **Nhóm 1** (4 ô): {m₀, m₁, m₄, m₅} — cột BC=00 và BC=01 (tức B=0). A và C thay đổi → **B'**.
- **Nhóm 2** (2 ô): {m₅, m₇} — hàng A=1, cột BC=01 và BC=11 (tức A=1, C=1). B thay đổi → **A·C**.

Biểu thức rút gọn: **F = B' + AC**.

Kiểm tra từng minterm:
- m₀(0,0,0): B'=1 → 1 ✓
- m₁(0,0,1): B'=1 → 1 ✓
- m₂(0,1,0): B'=0, AC=0 → 0 ✓
- m₃(0,1,1): B'=0, AC=0 → 0 ✓
- m₄(1,0,0): B'=1 → 1 ✓
- m₅(1,0,1): B'=1 → 1 ✓ (cũng AC=1)
- m₆(1,1,0): B'=0, AC=0 → 0 ✓
- m₇(1,1,1): B'=0, AC=1 → 1 ✓

Tất cả đúng. Biểu thức gốc có 5 tích hạng (SOP đầy đủ), sau rút gọn còn **2 hạng tử** — đơn giản hơn nhiều.

**Bài 7 — MUX 4:1 thực hiện F = A'B + AB':**

Nhận ra F = A XOR B. Cần xác định D₀, D₁, D₂, D₃ khi S₁=A, S₀=B.

Nguyên tắc: khi S₁=A=a, S₀=B=b, MUX chọn Dₐ₋ᵦ (tức D_{2·a+b}). Ngõ ra Y = Dₐ₋ᵦ. Để Y = F(A,B), cần Dₐ₋ᵦ = F(a,b) cho mọi tổ hợp:

| A | B | F=A⊕B | Select | Dᵢ cần = F |
|---|---|-------|--------|------------|
| 0 | 0 |   0   | 00→D₀  | D₀ = 0    |
| 0 | 1 |   1   | 01→D₁  | D₁ = 1    |
| 1 | 0 |   1   | 10→D₂  | D₂ = 1    |
| 1 | 1 |   0   | 11→D₃  | D₃ = 0    |

Kết quả: **D₀=0, D₁=1, D₂=1, D₃=0**. Đặt các giá trị này vào ngõ vào dữ liệu của MUX 4:1, MUX sẽ thực hiện đúng hàm XOR.

---

## 7. Liên kết và bài tiếp theo

- **Tiền đề**: [Lesson 01 — Boolean & Cổng logic](../lesson-01-boolean-logic-gates/) — các cổng AND, OR, XOR là khối xây dựng của mọi mạch trong bài này.
- **Bài tiếp theo**: [Lesson 03 — Mạch tuần tự & Flip-flop](../lesson-03-sequential-flipflops/) — thêm phần tử nhớ (flip-flop) để xây dựng mạch có trạng thái: counter, shift register, bộ nhớ SRAM.
- **Ứng dụng thực tế**: mạch tổ hợp trong bài này là nền tảng của ALU trong CPU. Xem thêm [vi điều khiển GPIO](../lesson-06-microcontroller-gpio/) để hiểu cách các khối logic số này được tích hợp trong MCU.

---

## 📝 Tổng kết Lesson 02

1. **Mạch tổ hợp**: ngõ ra = hàm Boolean thuần của ngõ vào hiện tại, không có phần tử nhớ.
2. **Half adder**: Sum = A⊕B, Carry = A·B. Full adder: Sum = A⊕B⊕Cᵢₙ, Cₒᵤₜ = AB + Cᵢₙ(A⊕B). Ripple carry = ghép FA nối tiếp.
3. **MUX N:1**: log₂(N) đường chọn, chọn 1 trong N ngõ vào. MUX 4:1: Y = S₁'S₀'D₀ + S₁'S₀D₁ + S₁S₀'D₂ + S₁S₀D₃.
4. **Decoder n:2ⁿ**: kích hoạt đúng 1 trong 2ⁿ ngõ ra tương ứng với mã nhị phân đầu vào; dùng giải mã địa chỉ, LED 7 đoạn.
5. **K-map**: rút gọn biểu thức Boolean bằng cách gộp nhóm ô liền kề (mã Gray); nhóm 2^k ô loại k biến. Kết quả gọn hơn nhiều so với SOP đầy đủ.

**Tiếp theo**: [Lesson 03 — Mạch tuần tự & Flip-flop](../lesson-03-sequential-flipflops/)
`;
