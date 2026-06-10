// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: Electronics/03-Digital-MCU/lesson-01-boolean-logic-gates/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 01 — Đại số Boolean & Cổng logic

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Hiểu tại sao hệ thống số (digital) dùng hai mức điện áp 0/1 và tại sao chống nhiễu tốt hơn analog.
- Thành thạo đại số Boolean: biến, phép NOT, AND, OR, bảng chân trị (truth table).
- Biết ký hiệu và bảng chân trị của 7 cổng logic cơ bản: AND, OR, NOT, NAND, NOR, XOR, XNOR.
- Hiểu vì sao NAND và NOR là "cổng vạn năng" (universal gate) — mọi cổng khác đều dựng được từ chúng.
- Áp dụng các định luật Boolean (giao hoán, kết hợp, phân phối, De Morgan) để rút gọn biểu thức.
- Giải được bài tập lập bảng chân trị, rút gọn biểu thức, dựng mạch từ NAND.

## Kiến thức tiền đề

- [Transistor BJT làm khóa đóng/ngắt](../../02-Semiconductors/lesson-05-bjt-switch/) — cổng logic được xây từ transistor đóng/ngắt.
- Hệ số nhị phân (binary) cơ bản: [DataFoundations](../../../DataFoundations/).

---

## 1. Tín hiệu số vs tín hiệu analog

### 1.1. Hai thế giới tín hiệu

💡 **Trực giác — đèn bật/tắt vs dimmer**: Đèn có công tắc bật/tắt là tín hiệu số — chỉ có hai trạng thái, không có trạng thái trung gian. Đèn có dimmer (chỉnh sáng mờ dần) là tín hiệu analog — giá trị liên tục từ 0% đến 100%.

**Tín hiệu analog** thay đổi liên tục theo thời gian — ví dụ âm thanh từ micro, nhiệt độ từ cảm biến, điện áp đầu ra của pin. Giá trị có thể là bất kỳ số thực nào trong khoảng cho phép.

**Tín hiệu số (digital)** chỉ nhận hai trạng thái: **mức logic 0** và **mức logic 1**. Phần cứng ánh xạ các trạng thái đó sang khoảng điện áp cụ thể. Ví dụ với logic 5 V CMOS:

| Mức logic | Khoảng điện áp |
|-----------|----------------|
| Logic 0 (LOW) | 0 V đến 0.8 V |
| Vùng cấm (forbidden zone) | 0.8 V đến 2.0 V |
| Logic 1 (HIGH) | 2.0 V đến 5.0 V |

**Vùng cấm** là vùng điện áp không hợp lệ — mạch không được hoạt động ở đây. Nếu nhiễu đẩy tín hiệu vào vùng cấm, mạch có thể tạo ra kết quả sai.

### 1.2. Vì sao số chống nhiễu tốt hơn analog

💡 **Hình dung**: Bạn cần ghi nhớ và truyền một con số "3.7 V". Nếu có nhiễu ±0.1 V, người nhận có thể đọc được 3.6 V hoặc 3.8 V — sai lệch. Nhưng nếu bạn chỉ cần phân biệt "trên 2 V" vs "dưới 0.8 V", thì nhiễu ±0.5 V hoàn toàn không ảnh hưởng — vẫn phân biệt được 0 và 1.

Đây chính là **ngưỡng phân biệt (noise margin)** — hệ số an toàn của logic số:
- Nhiễu nhỏ hơn khoảng cách từ tín hiệu đến vùng cấm → tín hiệu đến đích nguyên vẹn.
- Mạch nhận **tái tạo lại tín hiệu sạch** (snap back to 0 V hoặc 5 V) — nhiễu biến mất.

Analog không có khả năng này: mỗi tầng khuếch đại cũng khuếch đại luôn nhiễu.

### 1.3. Transistor làm nền tảng cho cổng logic

Như đã học ở [lesson-05-bjt-switch](../../02-Semiconductors/lesson-05-bjt-switch/): transistor BJT hoặc MOSFET có thể hoạt động như **khóa điện** — bão hòa (dẫn hoàn toàn) = logic 0 ở ngõ ra, ngắt = logic 1 ở ngõ ra (tùy kiểu mạch). Một cổng NOT đơn giản là một transistor inverter; cổng NAND gồm 2 transistor nối tiếp; cổng NOR gồm 2 transistor song song.

❓ **Câu hỏi tự nhiên:**
- *"Tại sao không dùng giá trị khác ngoài 0 và 1?"* — có thể dùng 3 mức (ternary logic) hoặc nhiều hơn, nhưng mạch phức tạp hơn nhiều và noise margin giảm. Binary (nhị phân) là điểm cân bằng tốt nhất về độ tin cậy vs chi phí.
- *"5 V hay 3.3 V hay 1.8 V?"* — logic hiện đại (CMOS) dùng 3.3 V hoặc thấp hơn (1.8 V, 1.2 V) để tiết kiệm điện. Logic 5 V chủ yếu gặp trong Arduino cũ và TTL. Nguyên tắc 0/1 giống nhau, chỉ ngưỡng điện áp khác.

📝 **Tóm tắt mục 1:**
- Digital = chỉ có 0 và 1; analog = liên tục.
- 0 ↔ 0–0.8 V (LOW); 1 ↔ 2–5 V (HIGH) (ví dụ CMOS 5 V); vùng giữa là vùng cấm.
- Chống nhiễu tốt vì mạch nhận tái tạo lại tín hiệu sạch — nhiễu nhỏ hơn noise margin thì bị loại bỏ.
- Cổng logic = transistor đóng/ngắt được kết hợp theo quy tắc.

---

## 2. Đại số Boolean

### 2.1. Biến Boolean và phép toán cơ bản

**Biến Boolean** chỉ nhận hai giá trị: **0** (FALSE, LOW) hoặc **1** (TRUE, HIGH). Ký hiệu thường dùng: A, B, C, X, Y, Z.

**Đại số Boolean** là hệ thống toán học mô tả logic của mạch số. Có ba phép toán cơ bản:

| Phép toán | Ký hiệu | Tên khác | Đọc |
|-----------|---------|----------|-----|
| NOT (phủ định) | $\\overline{A}$ hoặc NOT A | Complement | "NOT A" |
| AND (và) | $A \\cdot B$ hoặc AB | Conjunction | "A AND B" |
| OR (hoặc) | $A + B$ | Disjunction | "A OR B" |

💡 **Trực giác cho từng phép toán:**
- **NOT**: lật ngược giá trị. Công tắc thường mở: 0 = hở, 1 = nối. NOT = công tắc thường đóng.
- **AND**: đèn chỉ sáng khi **tất cả** công tắc nối tiếp đều đóng.
- **OR**: đèn sáng khi **ít nhất một** công tắc song song đóng.

### 2.2. Bảng chân trị (Truth Table)

**Bảng chân trị** liệt kê mọi tổ hợp đầu vào và kết quả đầu ra tương ứng. Với $n$ biến → $2^n$ hàng.

**NOT** (1 biến → 2 hàng):

| A | NOT A ($\\overline{A}$) |
|---|-----------|
| 0 | 1 |
| 1 | 0 |

**AND** (2 biến → 4 hàng):

| A | B | $A \\cdot B$ |
|---|---|-------|
| 0 | 0 | 0 |
| 0 | 1 | 0 |
| 1 | 0 | 0 |
| 1 | 1 | **1** |

Kết quả 1 **chỉ** khi cả A = 1 và B = 1.

**OR** (2 biến → 4 hàng):

| A | B | $A + B$ |
|---|---|-------|
| 0 | 0 | 0 |
| 0 | 1 | **1** |
| 1 | 0 | **1** |
| 1 | 1 | **1** |

Kết quả 0 **chỉ** khi cả A = 0 và B = 0.

### 2.3. Bốn ví dụ cụ thể đánh giá biểu thức

**Ví dụ 1** — Tính $A \\cdot B$ khi A = 1, B = 0:
- $A \\cdot B = 1 \\cdot 0 = \\mathbf{0}$. (Chỉ 1 vế bằng 1 thì AND vẫn = 0.)

**Ví dụ 2** — Tính $A + B$ khi A = 0, B = 1:
- $A + B = 0 + 1 = \\mathbf{1}$. (OR chỉ cần một vế bằng 1.)

**Ví dụ 3** — Tính NOT($A \\cdot B$) khi A = 1, B = 1:
- Bước 1: $A \\cdot B = 1 \\cdot 1 = 1$.
- Bước 2: $\\overline{1} = \\mathbf{0}$.

**Ví dụ 4** — Tính $\\overline{A} + B$ khi A = 1, B = 0:
- Bước 1: $\\overline{A} = \\overline{1} = 0$.
- Bước 2: $0 + 0 = \\mathbf{0}$.

⚠ **Lỗi thường gặp** — nhầm thứ tự ưu tiên:
- Thứ tự ưu tiên (cao → thấp): NOT → AND → OR (giống nhân/cộng số học).
- $A + B \\cdot C = A + (B \\cdot C)$, KHÔNG phải $(A + B) \\cdot C$.
- Ví dụ: A=0, B=1, C=1. Đúng: $0 + (1 \\cdot 1) = 0 + 1 = \\mathbf{1}$. Sai: $(0+1) \\cdot 1 = 1 \\cdot 1 = 1$. (Trùng hợp ở đây, nhưng thay C=0 thì khác nhau: đúng $0+(1 \\cdot 0)=0$, sai $(0+1) \\cdot 0=0$ — vẫn đúng. Thay A=1,B=0,C=1: đúng $1+(0 \\cdot 1)=1$, sai $(1+0) \\cdot 1=1$. Thay A=0,B=0,C=1: đúng $0+(0 \\cdot 1)=0$, sai $(0+0) \\cdot 1=0$. Thay A=1,B=1,C=0: đúng $1+(1 \\cdot 0)=1$, sai $(1+1) \\cdot 0=0$ — **KHÁC NHAU!**)

🔁 **Kiểm tra nhanh:**
Tính $\\overline{A} \\cdot B + C$ với A=0, B=1, C=0:
<details><summary>Đáp án</summary>

Bước 1: $\\overline{0} = 1$.
Bước 2: $1 \\cdot 1 = 1$.
Bước 3: $1 + 0 = \\mathbf{1}$.

</details>

📝 **Tóm tắt mục 2:**
- Biến Boolean: chỉ 0 hoặc 1.
- Ba phép: NOT (lật), AND (và — tất cả phải 1), OR (hoặc — ít nhất một bằng 1).
- Bảng chân trị: liệt kê tất cả $2^n$ tổ hợp.
- Thứ tự ưu tiên: NOT > AND > OR. Dùng dấu ngoặc khi cần rõ ràng.

---

## 3. Các cổng logic cơ bản

### 3.1. Bảng tổng hợp 7 cổng

| Cổng | Ký hiệu biểu thức | Bảng chân trị (A,B → Y) | Đặc điểm |
|------|-------------------|--------------------------|-----------|
| NOT | $Y = \\overline{A}$ | 0→1, 1→0 | 1 ngõ vào |
| AND | $Y = A \\cdot B$ | 00→0, 01→0, 10→0, 11→1 | Y=1 khi mọi ngõ vào = 1 |
| OR | $Y = A + B$ | 00→0, 01→1, 10→1, 11→1 | Y=0 khi mọi ngõ vào = 0 |
| NAND | $Y = \\overline{A \\cdot B}$ | 00→1, 01→1, 10→1, 11→0 | Ngược AND |
| NOR | $Y = \\overline{A + B}$ | 00→1, 01→0, 10→0, 11→0 | Ngược OR |
| XOR | $Y = A \\oplus B$ | 00→0, 01→1, 10→1, 11→0 | Y=1 khi A ≠ B |
| XNOR | $Y = \\overline{A \\oplus B}$ | 00→1, 01→0, 10→0, 11→1 | Y=1 khi A = B |

### 3.2. Bảng chân trị đầy đủ từng cổng

**NAND** — Not AND:

| A | B | $A \\cdot B$ | $Y = \\overline{A \\cdot B}$ |
|---|---|-----|-----------|
| 0 | 0 | 0 | **1** |
| 0 | 1 | 0 | **1** |
| 1 | 0 | 0 | **1** |
| 1 | 1 | 1 | **0** |

**NOR** — Not OR:

| A | B | $A+B$ | $Y = \\overline{A+B}$ |
|---|---|-----|-----------|
| 0 | 0 | 0 | **1** |
| 0 | 1 | 1 | **0** |
| 1 | 0 | 1 | **0** |
| 1 | 1 | 1 | **0** |

**XOR** — Exclusive OR (cộng theo modulo 2):

| A | B | $Y = A \\oplus B$ |
|---|---|-----------|
| 0 | 0 | 0 |
| 0 | 1 | **1** |
| 1 | 0 | **1** |
| 1 | 1 | 0 |

💡 **Trực giác cho XOR**: "khác nhau thì = 1". Hay nhớ là: $A \\oplus B = A \\cdot \\overline{B} + \\overline{A} \\cdot B$ (một bên đúng, bên kia sai).

**XNOR** — Exclusive NOR (XOR lật):

| A | B | $Y = \\overline{A \\oplus B}$ |
|---|---|-------------|
| 0 | 0 | **1** |
| 0 | 1 | 0 |
| 1 | 0 | 0 |
| 1 | 1 | **1** |

💡 **Trực giác cho XNOR**: "giống nhau thì = 1" — dùng để so sánh bằng giữa hai bit.

❓ **Câu hỏi tự nhiên:**
- *"XOR và OR khác nhau chỗ nào?"* — Chỉ khác ở hàng A=1, B=1: OR cho 1, XOR cho 0. XOR kiểm tra "khác nhau", không đơn thuần là "ít nhất một = 1".
- *"NAND và NOR dùng ở đâu?"* — Xem mục 4 — chúng là cổng vạn năng, thực tế nhiều IC logic (74xx series) cung cấp NAND/NOR vì rẻ và dễ chế tạo.

### 3.3. Bốn ví dụ đánh giá cổng

**Ví dụ 1** — NAND(A=1, B=1): $Y = \\overline{1 \\cdot 1} = \\overline{1} = \\mathbf{0}$.

**Ví dụ 2** — NOR(A=0, B=0): $Y = \\overline{0+0} = \\overline{0} = \\mathbf{1}$.

**Ví dụ 3** — XOR(A=1, B=1): $Y = 1 \\oplus 1 = \\mathbf{0}$ (cùng giá trị → XOR = 0).

**Ví dụ 4** — XNOR(A=1, B=0): $Y = \\overline{1 \\oplus 0} = \\overline{1} = \\mathbf{0}$ (khác giá trị → XNOR = 0).

⚠ **Lỗi thường gặp** — nhầm NAND với NOR:
- NAND = 0 **chỉ** khi tất cả = 1 (như AND rồi lật).
- NOR = 1 **chỉ** khi tất cả = 0 (như OR rồi lật).
- Mẹo nhớ: cổng nào cũng kết thúc với "thành công" ở hàng hiếm nhất:
  - AND: 1 chỉ ở 11. NAND: 0 chỉ ở 11.
  - OR: 0 chỉ ở 00. NOR: 1 chỉ ở 00.

🔁 **Kiểm tra nhanh:**
Cổng nào cho Y=1 khi A=0, B=0?
<details><summary>Đáp án</summary>

NOT A (nếu A là duy nhất), NAND(0,0)=1, NOR(0,0)=1, XNOR(0,0)=1.
Không cho Y=1 khi (0,0): AND, OR, XOR.

</details>

📝 **Tóm tắt mục 3:**
- 7 cổng cơ bản: AND, OR, NOT, NAND, NOR, XOR, XNOR.
- NAND = AND + NOT ở ngõ ra; NOR = OR + NOT ở ngõ ra.
- XOR: "khác nhau"; XNOR: "giống nhau".
- Thực tế: cổng có thể có 3, 4, 8 ngõ vào — bảng chân trị to hơn nhưng quy tắc giống nhau.

---

## 4. Cổng NAND và NOR — Cổng vạn năng (Universal Gate)

### 4.1. Vì sao gọi là "vạn năng"?

💡 **Hình dung**: Nếu bạn chỉ có một loại gạch, có thể xây được mọi hình dạng không? Thường là không. Nhưng cổng NAND (và cổng NOR) đặc biệt: từ chỉ một loại cổng này, có thể dựng mọi cổng logic khác. Vì vậy, một chip chỉ cần sản xuất NAND — sau đó kết nối chúng theo nhiều cách khác nhau để có NOT, AND, OR...

**Tại sao quan trọng trong thực tế?**
- Giảm số loại linh kiện cần lưu kho.
- Nhiều dòng IC chuẩn (74HC00 = quad 2-input NAND) chỉ cung cấp NAND.
- Chip NAND Flash (bộ nhớ SSD, USB) lấy tên từ kiến trúc NAND này.

### 4.2. Dựng NOT từ NAND

Nối cả hai ngõ vào NAND với nhau (A = B):

$$Y = \\overline{A \\cdot A} = \\overline{A} \\quad (\\text{vì } A \\cdot A = A)$$

Bảng kiểm tra:
- A=0: NAND(0,0) = $\\overline{0 \\cdot 0} = \\overline{0} = \\mathbf{1}$ ✓ (NOT 0 = 1)
- A=1: NAND(1,1) = $\\overline{1 \\cdot 1} = \\overline{1} = \\mathbf{0}$ ✓ (NOT 1 = 0)

Sơ đồ: nối ngõ vào A của NAND với chính nó → ngõ ra = $\\overline{A}$.

### 4.3. Dựng AND từ NAND

AND(A,B) = NOT(NAND(A,B)) — vì NAND = NOT(AND):

$$A \\cdot B = \\overline{\\overline{A \\cdot B}} = \\overline{\\text{NAND}(A,B)}$$

Hay đơn giản: nối ngõ ra NAND vào một NAND-NOT (từ 4.2):

Bước:
1. Cổng NAND₁: ngõ vào A, B → ngõ ra $Y_1 = \\overline{A \\cdot B}$
2. Cổng NAND₂ (làm NOT): ngõ vào $Y_1$, $Y_1$ → ngõ ra $Y_2 = \\overline{Y_1} = A \\cdot B$

Bảng kiểm tra:
- A=1, B=1: $Y_1 = \\overline{1 \\cdot 1} = 0$ → $Y_2 = \\overline{0} = \\mathbf{1}$ ✓ (AND = 1)
- A=1, B=0: $Y_1 = \\overline{1 \\cdot 0} = 1$ → $Y_2 = \\overline{1} = \\mathbf{0}$ ✓ (AND = 0)

### 4.4. Dựng OR từ NAND

Theo định luật De Morgan (xem mục 5): $A + B = \\overline{\\overline{A} \\cdot \\overline{B}}$

Suy ra: OR(A,B) = NAND(NOT A, NOT B) = NAND(NAND(A,A), NAND(B,B))

Bước:
1. NAND₁(A,A) → $Y_1 = \\overline{A}$ (NOT A)
2. NAND₂(B,B) → $Y_2 = \\overline{B}$ (NOT B)
3. NAND₃($Y_1$, $Y_2$) → $Y_3 = \\overline{\\overline{A} \\cdot \\overline{B}} = A + B$ (De Morgan)

Bảng kiểm tra:
- A=0, B=0: $Y_1=1$, $Y_2=1$, NAND(1,1) = **0** ✓ (OR(0,0) = 0)
- A=0, B=1: $Y_1=1$, $Y_2=0$, NAND(1,0) = **1** ✓ (OR(0,1) = 1)
- A=1, B=0: $Y_1=0$, $Y_2=1$, NAND(0,1) = **1** ✓ (OR(1,0) = 1)
- A=1, B=1: $Y_1=0$, $Y_2=0$, NAND(0,0) = **1** ✓ (OR(1,1) = 1)

❓ **Câu hỏi tự nhiên:**
- *"NOR cũng vạn năng — cách tương tự không?"* — Đúng. NOR vạn năng theo cách đối xứng: NOT từ NOR = nối 2 ngõ vào với nhau; OR từ NOR = NOR rồi NOT; AND từ NOR = $\\overline{\\text{NOR}(\\overline{A}, \\overline{B})}$.
- *"Dùng nhiều NAND hơn thì thiết kế tệ hơn không?"* — Thường ổn vì mỗi NAND rất nhỏ (transistor CMOS chiếm vài µm²). Nhưng nếu độ trễ (propagation delay) quan trọng, ít tầng cổng = tốt hơn.

📝 **Tóm tắt mục 4:**
- NAND và NOR là cổng vạn năng: có thể dựng mọi hàm logic từ một loại cổng.
- NOT từ NAND: nối cả 2 ngõ vào với nhau.
- AND từ NAND: NAND → NAND-NOT (2 cổng NAND).
- OR từ NAND: NOT A + NOT B vào NAND₃ (3 cổng NAND).

---

## 5. Định luật Boolean cơ bản

### 5.1. Bảng định luật

| Tên | Biểu thức AND | Biểu thức OR |
|-----|---------------|--------------|
| Phần tử đồng nhất (Identity) | $A \\cdot 1 = A$ | $A + 0 = A$ |
| Phần tử hủy (Annihilator) | $A \\cdot 0 = 0$ | $A + 1 = 1$ |
| Lũy đẳng (Idempotent) | $A \\cdot A = A$ | $A + A = A$ |
| Bù (Complement) | $A \\cdot \\overline{A} = 0$ | $A + \\overline{A} = 1$ |
| Giao hoán (Commutative) | $A \\cdot B = B \\cdot A$ | $A + B = B + A$ |
| Kết hợp (Associative) | $(A \\cdot B) \\cdot C = A \\cdot (B \\cdot C)$ | $(A+B)+C = A+(B+C)$ |
| Phân phối (Distributive) | $A \\cdot (B+C) = A \\cdot B + A \\cdot C$ | $A+(B \\cdot C) = (A+B) \\cdot (A+C)$ |
| De Morgan 1 | $\\overline{A \\cdot B} = \\overline{A} + \\overline{B}$ | — |
| De Morgan 2 | — | $\\overline{A + B} = \\overline{A} \\cdot \\overline{B}$ |
| Phủ định kép (Double negation) | $\\overline{\\overline{A}} = A$ | — |
| Hấp thụ (Absorption) | $A \\cdot (A + B) = A$ | $A + A \\cdot B = A$ |

### 5.2. Định luật De Morgan — quan trọng nhất

💡 **Trực giác**: De Morgan nói rằng: "NOT của AND" bằng "OR của các NOT". Ví dụ thực tế: "Không phải (trời mưa VÀ tôi có ô)" = "trời không mưa HOẶC tôi không có ô". Hai phát biểu này tương đương hoàn toàn.

**De Morgan 1**: $\\overline{A \\cdot B} = \\overline{A} + \\overline{B}$

Kiểm tra bằng bảng (verify cả 4 hàng):

| A | B | $A \\cdot B$ | $\\overline{A \\cdot B}$ | $\\overline{A}$ | $\\overline{B}$ | $\\overline{A}+\\overline{B}$ |
|---|---|-----|---------|---|---|------|
| 0 | 0 | 0 | 1 | 1 | 1 | **1** ✓ |
| 0 | 1 | 0 | 1 | 1 | 0 | **1** ✓ |
| 1 | 0 | 0 | 1 | 0 | 1 | **1** ✓ |
| 1 | 1 | 1 | 0 | 0 | 0 | **0** ✓ |

**De Morgan 2**: $\\overline{A + B} = \\overline{A} \\cdot \\overline{B}$

Kiểm tra:

| A | B | $A+B$ | $\\overline{A+B}$ | $\\overline{A}$ | $\\overline{B}$ | $\\overline{A} \\cdot \\overline{B}$ |
|---|---|-----|---------|---|---|------|
| 0 | 0 | 0 | 1 | 1 | 1 | **1** ✓ |
| 0 | 1 | 1 | 0 | 1 | 0 | **0** ✓ |
| 1 | 0 | 1 | 0 | 0 | 1 | **0** ✓ |
| 1 | 1 | 1 | 0 | 0 | 0 | **0** ✓ |

### 5.3. Bốn ví dụ rút gọn biểu thức

**Ví dụ 1** — Rút gọn: $A \\cdot \\overline{A} + B$
- Bước 1: $A \\cdot \\overline{A} = 0$ (định luật bù).
- Bước 2: $0 + B = \\mathbf{B}$ (phần tử đồng nhất OR).
- Kết quả: $A \\cdot \\overline{A} + B = B$.

**Ví dụ 2** — Rút gọn: $A + A \\cdot B$
- Áp dụng định luật hấp thụ: $A + A \\cdot B = \\mathbf{A}$.
- Kiểm tra: A=0 → $0 + 0 \\cdot B = 0$ ✓; A=1 → $1 + 1 \\cdot B = 1$ ✓.

**Ví dụ 3** — Rút gọn: $(A + B) \\cdot (A + C)$
- Áp dụng phân phối dạng OR: $(A+B) \\cdot (A+C) = A + B \\cdot C$.
- Kiểm tra A=0, B=1, C=1: vế trái $(0+1) \\cdot (0+1) = 1 \\cdot 1 = 1$; vế phải $0 + 1 \\cdot 1 = \\mathbf{1}$ ✓.
- Kiểm tra A=1, B=0, C=0: vế trái $(1+0) \\cdot (1+0) = 1$; vế phải $1 + 0 = \\mathbf{1}$ ✓.

**Ví dụ 4** — Áp dụng De Morgan để rút gọn: $\\overline{\\overline{A} \\cdot \\overline{B}}$
- Theo De Morgan 1 (áp dụng cho $\\overline{A}$ và $\\overline{B}$): $\\overline{\\overline{A} \\cdot \\overline{B}} = \\overline{\\overline{A}} + \\overline{\\overline{B}} = A + B$.
- Kết quả: $\\overline{\\overline{A} \\cdot \\overline{B}} = A + B$. (Đây chính là cơ sở dựng OR từ NAND ở mục 4.4!)

⚠ **Lỗi thường gặp** — áp dụng De Morgan sai phạm vi:
- SAI: $\\overline{A + B + C} = \\overline{A} + \\overline{B} + \\overline{C}$ — sai! Phải là $\\overline{A} \\cdot \\overline{B} \\cdot \\overline{C}$.
- ĐÚNG: $\\overline{A + B + C} = \\overline{A} \\cdot \\overline{B} \\cdot \\overline{C}$ (De Morgan mở rộng: phủ định OR → AND của các phủ định).
- SAI: $\\overline{A} + \\overline{B} \\neq \\overline{A + B}$ — vế phải là $\\overline{A} \\cdot \\overline{B}$, không phải $\\overline{A} + \\overline{B}$!

🔁 **Kiểm tra nhanh:**
Rút gọn: $A \\cdot B + A \\cdot \\overline{B}$
<details><summary>Đáp án</summary>

Bước 1: Đặt nhân tử chung A: $A \\cdot (B + \\overline{B})$.
Bước 2: $B + \\overline{B} = 1$ (định luật bù).
Bước 3: $A \\cdot 1 = \\mathbf{A}$.

Kết quả: $A \\cdot B + A \\cdot \\overline{B} = A$.

</details>

📝 **Tóm tắt mục 5:**
- Định luật bù: $A \\cdot \\overline{A} = 0$; $A + \\overline{A} = 1$.
- De Morgan 1: $\\overline{A \\cdot B} = \\overline{A} + \\overline{B}$. De Morgan 2: $\\overline{A + B} = \\overline{A} \\cdot \\overline{B}$.
- Phân phối dạng OR: $(A+B) \\cdot (A+C) = A + B \\cdot C$ (khác phân phối số thông thường!).
- Hấp thụ: $A + A \\cdot B = A$; $A \\cdot (A+B) = A$.

---

## 6. Bài tập + Lời giải chi tiết

### Bài tập

**Bài 1** — Lập bảng chân trị:
Lập bảng chân trị đầy đủ cho biểu thức $Y = A \\cdot B + \\overline{C}$ với 3 biến A, B, C.

**Bài 2** — Đánh giá cổng:
Cho mạch: ngõ ra $Y = \\text{NAND}(A, \\text{OR}(B, C))$. Tính Y khi A=1, B=0, C=1.

**Bài 3** — Rút gọn biểu thức:
Rút gọn $F = A \\cdot B + A \\cdot \\overline{B} + \\overline{A} \\cdot B$ về dạng tối giản.

**Bài 4** — Dựng từ NAND:
Dựng cổng XOR(A, B) = $A \\cdot \\overline{B} + \\overline{A} \\cdot B$ chỉ dùng cổng NAND. Vẽ sơ đồ (mô tả từng bước).

**Bài 5** — Áp dụng De Morgan:
Chứng minh $\\overline{A} + \\overline{B} = \\overline{A \\cdot B}$ bằng cách lập bảng chân trị cho cả hai vế.

**Bài 6** — Rút gọn kết hợp:
Rút gọn $G = A \\cdot (\\overline{A} + B) + \\overline{A} \\cdot B$ về dạng tối giản. Xác minh bằng bảng chân trị.

### Lời giải chi tiết

---

**Bài 1 — Lập bảng chân trị $Y = A \\cdot B + \\overline{C}$:**

Có 3 biến → $2^3 = 8$ hàng.

| A | B | C | $A \\cdot B$ | $\\overline{C}$ | $Y = A \\cdot B + \\overline{C}$ |
|---|---|---|-----|-------|-----------------|
| 0 | 0 | 0 | 0 | 1 | **1** |
| 0 | 0 | 1 | 0 | 0 | **0** |
| 0 | 1 | 0 | 0 | 1 | **1** |
| 0 | 1 | 1 | 0 | 0 | **0** |
| 1 | 0 | 0 | 0 | 1 | **1** |
| 1 | 0 | 1 | 0 | 0 | **0** |
| 1 | 1 | 0 | 1 | 1 | **1** |
| 1 | 1 | 1 | 1 | 0 | **1** |

Kết quả: Y = 1 khi (A=1 AND B=1) HOẶC khi C = 0.

---

**Bài 2 — Cổng lồng nhau $\\text{NAND}(A, \\text{OR}(B,C))$:**

Bước 1: Tính OR(B, C) = OR(0, 1) = 1. (Gọi là X)
Bước 2: $\\text{NAND}(A, X) = \\text{NAND}(1, 1) = \\overline{1 \\cdot 1} = \\overline{1} = \\mathbf{0}$.

Trả lời: Y = **0**.

---

**Bài 3 — Rút gọn $F = A \\cdot B + A \\cdot \\overline{B} + \\overline{A} \\cdot B$:**

Bước 1: Gộp hai số hạng đầu: $A \\cdot B + A \\cdot \\overline{B} = A \\cdot (B + \\overline{B}) = A \\cdot 1 = \\mathbf{A}$.
Bước 2: Viết lại: $F = A + \\overline{A} \\cdot B$.
Bước 3: Áp dụng phân phối: $A + \\overline{A} \\cdot B = (A + \\overline{A}) \\cdot (A + B) = 1 \\cdot (A + B) = \\mathbf{A + B}$.

Kiểm tra bằng bảng (4 hàng):

| A | B | F ban đầu | A+B |
|---|---|-----------|-----|
| 0 | 0 | $0 \\cdot 0+0 \\cdot 1+1 \\cdot 0 = 0$ | 0 ✓ |
| 0 | 1 | $0 \\cdot 1+0 \\cdot 0+1 \\cdot 1 = 1$ | 1 ✓ |
| 1 | 0 | $1 \\cdot 0+1 \\cdot 1+0 \\cdot 0 = 1$ | 1 ✓ |
| 1 | 1 | $1 \\cdot 1+1 \\cdot 0+0 \\cdot 1 = 1$ | 1 ✓ |

Kết quả: $\\mathbf{F = A + B}$.

---

**Bài 4 — XOR từ NAND:**

$\\text{XOR}(A,B) = A \\cdot \\overline{B} + \\overline{A} \\cdot B$. Cần dùng NAND để dựng.

Cách chuẩn dùng 4 cổng NAND:
1. NAND₁(A, B) → $P = \\overline{A \\cdot B}$
2. NAND₂(A, P) → $Q = \\overline{A \\cdot P} = \\overline{A \\cdot \\overline{A \\cdot B}}$
3. NAND₃(B, P) → $R = \\overline{B \\cdot P} = \\overline{B \\cdot \\overline{A \\cdot B}}$
4. NAND₄(Q, R) → $Y = \\overline{Q \\cdot R}$

Chứng minh $Y = A \\oplus B$ bằng bảng (kiểm tra từng bước):

| A | B | $P=\\overline{A \\cdot B}$ | $Q=\\overline{A \\cdot P}$ | $R=\\overline{B \\cdot P}$ | $Y=\\overline{Q \\cdot R}$ |
|---|---|---------|---------|---------|---------|
| 0 | 0 | 1 | $\\overline{0 \\cdot 1}=1$ | $\\overline{0 \\cdot 1}=1$ | $\\overline{1 \\cdot 1}=\\mathbf{0}$ ✓ |
| 0 | 1 | 1 | $\\overline{0 \\cdot 1}=1$ | $\\overline{1 \\cdot 1}=0$ | $\\overline{1 \\cdot 0}=\\mathbf{1}$ ✓ |
| 1 | 0 | 1 | $\\overline{1 \\cdot 1}=0$ | $\\overline{0 \\cdot 1}=1$ | $\\overline{0 \\cdot 1}=\\mathbf{1}$ ✓ |
| 1 | 1 | 0 | $\\overline{1 \\cdot 0}=1$ | $\\overline{1 \\cdot 0}=1$ | $\\overline{1 \\cdot 1}=\\mathbf{0}$ ✓ |

Mô tả sơ đồ:
\`\`\`
A ──┬── NAND₁(A,B) ──P──┬── NAND₂(A,P) ──Q──┐
    │                    │                     NAND₄(Q,R) ── Y = A⊕B
B ──┴──────────────────── NAND₃(B,P) ──R──┘
\`\`\`

---

**Bài 5 — Chứng minh $\\overline{A} + \\overline{B} = \\overline{A \\cdot B}$ bằng bảng:**

| A | B | $\\overline{A}$ | $\\overline{B}$ | $\\overline{A}+\\overline{B}$ | $A \\cdot B$ | $\\overline{A \\cdot B}$ | So sánh |
|---|---|---|---|-----|-----|--------|---------|
| 0 | 0 | 1 | 1 | 1 | 0 | 1 | ✓ bằng nhau |
| 0 | 1 | 1 | 0 | 1 | 0 | 1 | ✓ bằng nhau |
| 1 | 0 | 0 | 1 | 1 | 0 | 1 | ✓ bằng nhau |
| 1 | 1 | 0 | 0 | 0 | 1 | 0 | ✓ bằng nhau |

Nhận xét: Hai cột $\\overline{A}+\\overline{B}$ và $\\overline{A \\cdot B}$ hoàn toàn trùng nhau → đây chính là **De Morgan 1** đọc ngược: $\\overline{A \\cdot B} = \\overline{A}+\\overline{B}$ ✓.

---

**Bài 6 — Rút gọn $G = A \\cdot (\\overline{A}+B) + \\overline{A} \\cdot B$:**

Bước 1: Phân phối vế đầu: $A \\cdot (\\overline{A}+B) = A \\cdot \\overline{A} + A \\cdot B = 0 + A \\cdot B = A \\cdot B$.
Bước 2: Viết lại: $G = A \\cdot B + \\overline{A} \\cdot B$.
Bước 3: Đặt nhân tử chung B: $G = B \\cdot (A + \\overline{A}) = B \\cdot 1 = \\mathbf{B}$.

Kiểm tra bằng bảng chân trị:

| A | B | G gốc = $A \\cdot (\\overline{A}+B)+\\overline{A} \\cdot B$ | B |
|---|---|----------------------|---|
| 0 | 0 | $0 \\cdot (1+0)+1 \\cdot 0 = 0+0 = 0$ | 0 ✓ |
| 0 | 1 | $0 \\cdot (1+1)+1 \\cdot 1 = 0+1 = 1$ | 1 ✓ |
| 1 | 0 | $1 \\cdot (0+0)+0 \\cdot 0 = 0+0 = 0$ | 0 ✓ |
| 1 | 1 | $1 \\cdot (0+1)+0 \\cdot 1 = 1+0 = 1$ | 1 ✓ |

Kết quả: $\\mathbf{G = B}$. (Biến A hoàn toàn bị triệt tiêu!)

---

## 7. Liên kết và bài tiếp theo

- Tiền đề đọc trước: [BJT làm khóa](../../02-Semiconductors/lesson-05-bjt-switch/) — để hiểu cổng được xây từ transistor thế nào.
- Hệ nhị phân: [DataFoundations](../../../DataFoundations/) — nền tảng biểu diễn số trong máy tính.
- **Bài tiếp theo**: [Lesson 02 — Mạch tổ hợp (Combinational Logic)](../lesson-02-combinational/) — ứng dụng cổng logic để xây mạch cộng, bộ ghép kênh (multiplexer), bộ giải mã (decoder).

---

## 📝 Tổng kết Lesson 01

1. **Tín hiệu số**: chỉ có 0 (LOW, 0–0.8 V) và 1 (HIGH, 2–5 V); chống nhiễu tốt nhờ vùng cấm và khả năng tái tạo tín hiệu.
2. **Đại số Boolean**: biến chỉ 0/1; ba phép cơ bản NOT, AND, OR; thứ tự ưu tiên NOT > AND > OR.
3. **7 cổng logic**: AND, OR, NOT, NAND, NOR, XOR (khác nhau), XNOR (giống nhau).
4. **NAND/NOR vạn năng**: từ NAND có thể dựng NOT (nối 2 ngõ vào), AND (NAND + NOT), OR (3 NAND).
5. **Định luật De Morgan**: $\\overline{A \\cdot B} = \\overline{A}+\\overline{B}$; $\\overline{A+B} = \\overline{A} \\cdot \\overline{B}$ — công cụ chuyển đổi giữa AND và OR.
6. **Rút gọn biểu thức**: dùng định luật bù, hấp thụ, phân phối, De Morgan để đơn giản hóa mạch → ít cổng hơn → rẻ hơn, nhanh hơn.

**Tiếp theo**: [Lesson 02 — Mạch tổ hợp](../lesson-02-combinational/) | [Visualization tương tác](./visualization.html)
`;
