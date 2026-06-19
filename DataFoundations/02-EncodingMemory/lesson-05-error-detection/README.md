# Lesson 05 — Phát hiện & sửa lỗi (Error Detection & Correction)

> **Nhóm 2 — Encoding & Memory · DataFoundations**

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Hiểu **vì sao bit bị lật** khi truyền/lưu, và vì sao cần phát hiện (detection) và đôi khi sửa (correction).
- Tính **parity bit (bit chẵn lẻ)** bằng tay, hiểu vì sao nó bắt được lỗi 1 bit nhưng **mù** với lỗi 2 bit.
- Tính **checksum** (tổng các từ) và biết Internet checksum hoạt động sơ lược thế nào.
- Thực hiện **một phép chia CRC** đầy đủ bằng XOR từng bước, hiểu vì sao CRC mạnh hơn checksum.
- **Mã hóa và giải mã Hamming(7,4)** bằng tay: encode 4 bit → 7 bit, nhận 1 bit lỗi → tính **syndrome** → định vị và sửa.
- Hiểu **khoảng cách Hamming (Hamming distance)** và `d_min` quyết định phát hiện/sửa được bao nhiêu bit.

## Kiến thức tiền đề

- [Bitwise Operations](../../01-NumberRepresentation/lesson-02-bitwise-ops/) — phép **XOR** là trái tim của toàn bộ bài này (parity, CRC, Hamming, syndrome).
- [Boolean Logic](../../03-MathFoundations/lesson-02-boolean-logic/) — bảng chân trị XOR: `a ⊕ b = 1` khi và chỉ khi `a ≠ b`.
- [Character Encoding](../lesson-01-character-encoding/) — dữ liệu là các byte 0/1; bài này lo cho việc các bit đó **không bị hỏng** trên đường đi.

---

## 1. Vấn đề: một bit bị lật thì sao?

💡 **Trực giác**: Bạn gửi 1 byte qua mạng Wi-Fi. Sóng nhiễu, một electron đi lạc, một vết xước trên đĩa cứng — và bit thứ 3 từ `0` biến thành `1`. Bên nhận không hề "thấy" sự thay đổi đó: nó chỉ nhận được một dãy bit trông hoàn toàn hợp lệ. Câu hỏi cốt lõi của cả bài:

> **Gửi 1 byte `01001011`. Trên đường đi 1 bit lật thành `01101011`. Làm sao bên nhận BIẾT là dữ liệu đã hỏng — và thậm chí SỬA lại đúng — mà KHÔNG cần gửi lại?**

Câu trả lời ngắn: **thêm bit dư thừa (redundancy)**. Ta gửi nhiều bit hơn mức dữ liệu cần, theo một quy luật toán học. Khi bit lật, nó **phá vỡ quy luật** → bên nhận phát hiện. Nếu thêm đủ dư thừa theo cách khéo, bên nhận còn **tính ngược ra** bit nào sai.

### 1.1. Vì sao bit bị lật? (lỗi đến từ đâu)

- **Truyền tin (transmission)**: nhiễu điện từ trên dây, suy hao tín hiệu, va chạm sóng vô tuyến → đầu thu đọc nhầm `0`↔`1`.
- **Lưu trữ (storage)**: vết xước đĩa quang, từ tính suy giảm trên HDD, **bit rot** trên SSD, tia vũ trụ (cosmic ray) lật 1 bit trong RAM (lỗi này có thật, đo được trên server lớn).
- **Phần cứng lỗi**: cell nhớ hỏng, đầu đọc lệch.

### 1.2. Hai bài toán khác nhau

| Bài toán | Ý nghĩa | Bit dư cần | Ví dụ kỹ thuật |
|----------|---------|:---:|----------------|
| **Phát hiện (detection)** | Chỉ cần BIẾT "có lỗi" → yêu cầu gửi lại | Ít | Parity, Checksum, CRC |
| **Sửa (correction)** | Tính ngược ra bit nào sai → tự sửa tại chỗ | Nhiều hơn | Hamming code, Reed-Solomon, ECC RAM |

💡 **Trực giác cho sự khác biệt**: Detection giống như **chuông báo** — nó kêu "có vấn đề!" nhưng không biết vấn đề ở đâu. Correction giống như **camera giám sát** — nó chỉ thẳng "kẻ trộm đứng ở góc đông-bắc". Camera đắt hơn chuông (nhiều bit dư hơn), nên ta chỉ dùng correction khi không thể gửi lại (vd lưu trên đĩa, truyền tới tàu vũ trụ).

❓ **Câu hỏi tự nhiên của người đọc**:
- *"Sao không cứ gửi lại khi lỗi cho khỏe?"* — Có chỗ không gửi lại được: dữ liệu ghi trên đĩa CD năm ngoái, ảnh từ tàu vũ trụ cách Trái Đất 20 phút-ánh-sáng. Gửi lại quá đắt hoặc bất khả thi → cần sửa tại chỗ.
- *"Thêm bit dư thì tốn băng thông, có đáng không?"* — Đáng, vì chi phí dư thừa (vài %) nhỏ hơn nhiều so với chi phí một file hỏng âm thầm. Cân bằng giữa "tốn bit" và "an toàn" chính là nội dung cả bài này.
- *"Phát hiện được MỌI lỗi không?"* — Không. Không có sơ đồ nào bắt được 100% lỗi với số bit dư hữu hạn. Mỗi sơ đồ chỉ đảm bảo bắt được một **lớp lỗi** nhất định (vd parity bắt mọi lỗi lẻ-bit). Đây là điểm dễ hiểu nhầm nhất, ta sẽ làm rõ ở từng phần.

🔁 **Dừng lại tự kiểm tra**: Detection và correction khác nhau ở đâu? Cái nào cần nhiều bit dư hơn?

<details><summary>Đáp án</summary>

Detection chỉ báo "có lỗi" (cần ít bit dư, thường yêu cầu gửi lại). Correction định vị và sửa bit sai (cần nhiều bit dư hơn — phải đủ thông tin để chỉ ra *vị trí* lỗi, không chỉ *sự tồn tại* của lỗi).

</details>

📝 **Tóm tắt mục 1**:
- Bit lật do nhiễu truyền tin, lỗi lưu trữ, tia vũ trụ — và bên nhận không tự thấy.
- Giải pháp: thêm **bit dư thừa** theo quy luật toán học; lỗi phá quy luật → bị lộ.
- **Detection** (báo có lỗi) rẻ; **correction** (sửa tại chỗ) đắt hơn vì cần định vị lỗi.
- Không sơ đồ nào bắt 100% lỗi — mỗi loại đảm bảo một lớp lỗi cụ thể.

---

## 2. Parity bit (bit chẵn lẻ)

💡 **Trực giác**: Bạn có một nhóm bit. Thêm **1 bit duy nhất** sao cho **tổng số bit `1`** trong cả nhóm (kể cả bit thêm) luôn **chẵn** (even parity) hoặc luôn **lẻ** (odd parity). Giống như một nhóm bạn quy ước "khi điểm danh, tổng số người mặc áo đỏ luôn phải chẵn" — nếu đếm ra lẻ thì biết ngay có người vắng/thừa.

### 2.1. Định nghĩa

Cho dữ liệu `d` gồm `n` bit. **Even parity bit** `p` được tính sao cho tổng số bit `1` của `d ∥ p` là chẵn:

$$p = d_1 \oplus d_2 \oplus \cdots \oplus d_n$$

Nói cách khác `p` chính là **XOR của tất cả các bit dữ liệu**. (Vì XOR của một dãy bit = 1 khi số bit `1` là lẻ, = 0 khi chẵn — đúng bằng "bit bù để thành chẵn".)

Bên nhận tính lại XOR của **tất cả** bit nhận được (cả parity). Kết quả:
- `= 0` → số bit `1` chẵn → **có vẻ đúng**.
- `= 1` → số bit `1` lẻ → **chắc chắn có lỗi** (số lẻ bit đã lật).

### 2.2. Bốn ví dụ số (even parity)

| Dữ liệu `d` | Số bit `1` | Parity `p` (XOR) | Gửi đi `d∥p` | Tổng bit `1` |
|-------------|:---:|:---:|-------------|:---:|
| `1011010` | 4 (chẵn) | `0` | `1011010` `0` | 4 ✓ chẵn |
| `0000001` | 1 (lẻ) | `1` | `0000001` `1` | 2 ✓ chẵn |
| `1111111` | 7 (lẻ) | `1` | `1111111` `1` | 8 ✓ chẵn |
| `0110100` | 3 (lẻ) | `1` | `0110100` `1` | 4 ✓ chẵn |

Verify ví dụ 1 bằng XOR: `1⊕0⊕1⊕1⊕0⊕1⊕0 = (1⊕0)=1, ⊕1=0, ⊕1=1, ⊕0=1, ⊕1=0, ⊕0=0` → `p=0` ✓ (khớp "số bit 1 = 4 chẵn nên không cần thêm").

### 2.3. Walk-through: bắt được lỗi 1 bit, mù lỗi 2 bit

Lấy `d = 1011010`, `p = 0` → gửi `10110100` (8 bit, 4 số `1`, chẵn).

**Trường hợp lật 1 bit** — giả sử bit thứ 3 lật `1→0`:
```
Gửi:    1 0 1 1 0 1 0 0   (4 bit '1', chẵn)
Nhận:   1 0 0 1 0 1 0 0   (3 bit '1', LẺ)
Bên nhận XOR tất cả = 1  →  ❌ PHÁT HIỆN LỖI
```

**Trường hợp lật 2 bit** — lật bit 3 và bit 4 (`1→0` và `1→0`):
```
Gửi:    1 0 1 1 0 1 0 0   (4 bit '1', chẵn)
Nhận:   1 0 0 0 0 1 0 0   (2 bit '1', VẪN CHẴN)
Bên nhận XOR tất cả = 0  →  ✅ "có vẻ đúng" — nhưng SAI! Bỏ sót lỗi.
```

⚠ **Lỗi thường gặp — parity mù với số CHẴN bit lỗi**: Parity chỉ đếm **tính chẵn lẻ** của số bit lật. Lật 2 bit (hoặc 4, 6, ...) giữ nguyên tính chẵn lẻ → parity **không thấy gì**. Quy tắc: parity bit **phát hiện mọi lỗi lẻ-bit** (1, 3, 5...) và **bỏ sót mọi lỗi chẵn-bit** (2, 4, 6...). Đừng dùng parity một mình cho kênh nhiễu cao.

❓ **Câu hỏi tự nhiên**:
- *"Parity sửa được lỗi không?"* — Không. Nó báo "có lỗi lẻ-bit" nhưng **không biết bit nào**. 1 parity bit không đủ thông tin để định vị. Muốn sửa phải dùng Hamming (mục 5).
- *"Even hay odd parity tốt hơn?"* — Khả năng phát hiện như nhau. Odd parity có ưu điểm nhỏ: chuỗi toàn `0` (`00000000`) là hợp lệ với even nhưng không với odd → odd bắt được lỗi "đường truyền chết im thành toàn 0".

🔁 **Dừng lại tự kiểm tra**: Dữ liệu `1101`. Even parity bit là gì? Nếu bit đầu lật, bên nhận có phát hiện không?

<details><summary>Đáp án</summary>

`1⊕1⊕0⊕1 = 1` → `p = 1`, gửi `11011` (4 số `1`, chẵn). Lật bit đầu → `01011` (3 số `1`, lẻ) → XOR = 1 → **phát hiện được** (lỗi 1 bit là lỗi lẻ-bit).

</details>

📝 **Tóm tắt mục 2**:
- Parity = **XOR mọi bit dữ liệu**; làm tổng số `1` thành chẵn (even) hoặc lẻ (odd).
- Phát hiện **mọi lỗi lẻ-bit**, **mù với mọi lỗi chẵn-bit**.
- Chỉ **detection**, không correction (1 bit dư không đủ định vị).

---

## 3. Checksum (tổng kiểm tra)

💡 **Trực giác**: Parity chỉ là 1 bit — quá thô. Nâng cấp: chia dữ liệu thành các "từ" (word) nhiều bit, **cộng tất cả lại**, gửi kèm tổng. Giống kế toán cộng tổng cuối trang sổ: nếu một con số bị chép sai, tổng sẽ lệch và bị phát hiện. Càng nhiều bit trong tổng → càng khó "trùng tổng" do may rủi.

### 3.1. Checksum đơn giản — tổng mod 2ᵏ

Chia dữ liệu thành các từ `k` bit, cộng tất cả, lấy `mod 2^k` (chỉ giữ `k` bit thấp). Bốn ví dụ (từ 8 bit, mod 256):

| Các từ (hex) | Tổng | `mod 256` (checksum) |
|--------------|------|:---:|
| `12, 34` | `0x46` | `0x46` |
| `FF, 01` | `0x100` | `0x00` (tràn, giữ 8 bit thấp) |
| `AA, BB, CC` | `0x231` | `0x31` |
| `10, 20, 30, 40` | `0xA0` | `0xA0` |

Bên nhận cộng lại các từ và so với checksum nhận được. Lệch → có lỗi.

### 3.2. Internet checksum (1's complement) — sơ lược

Giao thức TCP/IP/UDP dùng **one's complement checksum** trên các từ **16 bit**. Khác biệt then chốt: **carry (nhớ tràn) được cộng vòng ngược lại** vào bit thấp (gọi là *end-around carry*), rồi lấy **bù 1 (NOT)** của kết quả làm checksum.

**Walk-through 8 bit** (cho gọn) với 4 từ `B1, 42, 3C, 55`:

```
Bước 1 — cộng dồn, mỗi lần tràn 8 bit thì cộng carry vòng lại:
  0xB1 + 0x42 = 0xF3              (chưa tràn)
  0xF3 + 0x3C = 0x12F → tràn!     0x2F + 0x01 (carry) = 0x30
  0x30 + 0x55 = 0x85              (chưa tràn)
  → tổng-có-carry = 0x85

Bước 2 — lấy bù 1 (NOT):
  checksum = ~0x85 & 0xFF = 0x7A
```

Bên nhận cộng **tất cả** từ KÈM checksum theo cùng quy tắc → kết quả phải là `0xFF` (toàn bit `1`):
```
0xB1 + 0x42 + 0x3C + 0x55 + 0x7A (với end-around carry) = 0xFF  ✓ → không lỗi
```

❓ **Câu hỏi tự nhiên**:
- *"Vì sao cộng carry vòng lại?"* — Để checksum không phụ thuộc vị trí carry; tính chất đẹp: kết quả độc lập với thứ tự cộng và với việc tách từ. Đó là lý do TCP chọn one's complement.
- *"Vì sao kết quả verify là toàn `1` chứ không phải `0`?"* — Vì checksum là **bù 1** của tổng dữ liệu; cộng một số với bù-1 của chính nó (trong số học one's complement) ra `−0` = toàn bit `1`.

### 3.3. Checksum mạnh hơn parity nhưng vẫn yếu

⚠ **Lỗi thường gặp — checksum yếu với HOÁN VỊ và lỗi bù trừ**: Phép cộng có tính **giao hoán** — đảo thứ tự các từ → **cùng một tổng** → checksum không đổi → **không phát hiện** dữ liệu bị xáo trộn thứ tự. Tệ hơn, nếu một từ tăng `+5` và từ khác giảm `−5`, tổng giữ nguyên → lỗi bù trừ lọt qua. Ví dụ:

```
Gốc:    [0x10, 0x20]  sum = 0x30
Hoán vị:[0x20, 0x10]  sum = 0x30   ← cùng checksum, KHÔNG phát hiện đổi chỗ
Bù trừ: [0x15, 0x1B]  sum = 0x30   ← cùng checksum, KHÔNG phát hiện
```

Đây chính là lý do người ta cần **CRC** (mục 4): CRC nhạy với cả thứ tự và vị trí bit, không bị "bù trừ".

🔁 **Dừng lại tự kiểm tra**: Tính checksum đơn giản (mod 256) của `[0x80, 0x80]`. Nếu cả hai từ cùng lật bit cao nhất thành `0x00`, checksum có bắt được không?

<details><summary>Đáp án</summary>

`0x80 + 0x80 = 0x100 → 0x00`. Nếu cả hai thành `0x00`: tổng `= 0x00` → **cùng checksum** → **không bắt được** (lỗi 2 bit bù trừ, giống ví dụ parity bị mù).

</details>

📝 **Tóm tắt mục 3**:
- Checksum = **tổng các từ** (mod 2ᵏ hoặc one's complement của TCP/IP).
- Mạnh hơn parity (nhiều bit hơn) nhưng **giao hoán** → mù với **hoán vị thứ tự** và **lỗi bù trừ**.
- Chỉ **detection**; dùng cho header mạng nơi tốc độ quan trọng hơn độ mạnh.

---

## 4. CRC (Cyclic Redundancy Check)

💡 **Trực giác**: Thay vì cộng (giao hoán, dễ trùng), CRC **chia**. Coi cả thông điệp như một số nhị phân khổng lồ, chia cho một số cố định gọi là **generator**, lấy **số dư (remainder)** làm mã kiểm tra. Phép chia "trộn" mọi bit vào nhau theo vị trí → đổi thứ tự hay lật bit ở đâu cũng làm số dư đổi. Giống như lấy `12345 mod 97`: thay đổi bất kỳ chữ số nào gần như chắc chắn đổi số dư.

Điểm đặc biệt: CRC dùng **số học đa thức trên GF(2)** — nghĩa là **cộng/trừ đều là XOR**, không có nhớ (carry). Đây là chỗ [phép XOR](../../01-NumberRepresentation/lesson-02-bitwise-ops/) tỏa sáng.

### 4.1. Generator polynomial

Generator là một chuỗi bit, vd `G = 10011`. Nó tương ứng đa thức:

$$G(x) = 1\cdot x^4 + 0\cdot x^3 + 0\cdot x^2 + 1\cdot x^1 + 1\cdot x^0 = x^4 + x + 1$$

`G` có `5` bit → **bậc (degree) = 4** → CRC sẽ có **4 bit** số dư. Quy tắc: ta nối thêm `degree` số `0` vào cuối dữ liệu, rồi chia cho `G` bằng XOR; số dư chính là CRC.

### 4.2. Quy tắc "chia" bằng XOR

Phép chia nhị phân giống chia tay ở tiểu học, nhưng **trừ = XOR**:
- Nếu bit dẫn đầu (leftmost) của phần đang xét là `1` → XOR với `G`.
- Nếu là `0` → XOR với `00000` (tức không làm gì), rồi "kéo xuống" bit tiếp theo.

`a ⊕ b`: `0⊕0=0`, `1⊕1=0`, `0⊕1=1`, `1⊕0=1`.

### 4.3. Walk-through ĐẦY ĐỦ — data `1101011011`, generator `10011`

Bước chuẩn bị: bậc `G` = 4 → nối thêm 4 số `0`:

$$\text{Augmented} = \underbrace{1101011011}_{\text{data}}\,\underbrace{0000}_{4\text{ zeros}} = 110101101 10000$$

Ta chia theo kiểu thanh ghi 5 bit: lấy 5 bit đầu, nếu bit dẫn đầu là `1` thì XOR `10011`, bỏ bit dẫn đầu, kéo xuống bit kế. Augmented đầy đủ: `11010110110000`.

```
Lấy 5 bit đầu:          11010
Bước 1: dẫn '1' → XOR 10011:
        11010
        10011  ⊕
        -----
        01001   → bỏ bit đầu '0', kéo xuống '1' → 10011

Bước 2: dẫn '1' → XOR 10011:
        10011
        10011  ⊕
        -----
        00000   → bỏ '0', kéo xuống '1' → 00001

Bước 3: dẫn '0' → XOR 00000 (skip):
        00001   → bỏ '0', kéo xuống '0' → 00010

Bước 4: dẫn '0' → skip:
        00010   → bỏ '0', kéo xuống '1' → 00101

Bước 5: dẫn '0' → skip:
        00101   → bỏ '0', kéo xuống '1' → 01011

Bước 6: dẫn '0' → skip:
        01011   → bỏ '0', kéo xuống '0' → 10110

Bước 7: dẫn '1' → XOR 10011:
        10110
        10011  ⊕
        -----
        00101   → bỏ '0', kéo xuống '0' → 01010

Bước 8: dẫn '0' → skip:
        01010   → bỏ '0', kéo xuống '0' → 10100

Bước 9: dẫn '1' → XOR 10011:
        10100
        10011  ⊕
        -----
        00111   → bỏ '0', kéo xuống '0' → 01110

Bước 10: dẫn '0' → skip, HẾT bit để kéo xuống.
        → Số dư (4 bit cuối) = 1110
```

**Kết quả**: CRC = `1110`. Thông điệp truyền đi = data + CRC:

$$\text{Transmitted} = 1101011011 \,\Vert\, 1110 = 110101101 11110$$

(đầy đủ: `11010110111110`)

### 4.4. Bên nhận kiểm tra thế nào?

Bên nhận lấy **toàn bộ** chuỗi nhận được (data + CRC) chia cho cùng `G`. Nếu số dư `= 0000` → **không lỗi**. Nếu `≠ 0` → **có lỗi**.

Lý do toán học: ta đã xây transmitted = augmented − remainder (trong GF(2), trừ là XOR cộng remainder), khiến transmitted **chia hết** cho `G`. Lỗi lật bit cộng vào một "đa thức lỗi" `E(x)`; bên nhận thấy số dư `= E(x) mod G(x)`. Số dư `≠ 0` khi `E(x)` không chia hết cho `G(x)` — và `G` được chọn khéo để hầu hết mẫu lỗi thực tế đều không chia hết.

```
Kiểm tra 11010110111110 ÷ 10011  → số dư = 0000  ✓ (không lỗi)
```

Bốn ví dụ CRC nhanh (cùng `G = 10011`):

| Data | + 4 zeros | CRC (số dư) | Transmitted |
|------|-----------|:---:|-------------|
| `1101011011` | `11010110110000` | `1110` | `11010110111110` |
| `10110000` | `101100000000` | `0001` | `101100000001` |
| `11111111` | `111111110000` | `0100` | `111111110100` |
| `10000000` | `100000000000` | `1110` | `100000001110` |

### 4.5. Vì sao CRC mạnh hơn checksum?

Generator được chọn theo lý thuyết đại số (không phải tùy tiện). Một CRC tốt (vd CRC-32 dùng trong Ethernet, ZIP, PNG) đảm bảo:
- Phát hiện **mọi lỗi 1 bit** và **mọi lỗi 2 bit** (nếu `G` có ≥ 3 số hạng).
- Phát hiện **mọi lỗi số-lẻ bit** (nếu `G` chia hết cho `x+1`).
- Phát hiện **mọi cụm lỗi (burst error)** liên tiếp ngắn hơn bậc của `G` — cực kỳ quan trọng vì nhiễu đường truyền thường gây lỗi *thành cụm*, không rải rác.

⚠ **CRC vẫn không bắt 100%**: Một số ít mẫu lỗi (đúng bằng bội của `G(x)`) lọt qua. Nhưng xác suất cực nhỏ (với CRC-32 ≈ `1/2³²`), và burst error ngắn thì bắt **chắc chắn**, nên CRC vượt trội checksum cho phát hiện lỗi truyền tin.

❓ **Câu hỏi tự nhiên**:
- *"CRC sửa được lỗi không?"* — Mặc định **không** (chỉ detection). Nó báo "có lỗi" → frame bị loại, yêu cầu gửi lại. Muốn sửa dùng Hamming/Reed-Solomon.
- *"Vì sao XOR mà không phải cộng có nhớ?"* — Số học GF(2) (XOR) làm phép chia có tính chất đại số đẹp, không bị "bù trừ" như cộng thường, và phần cứng cài bằng thanh ghi dịch (shift register) + cổng XOR cực nhanh.
- *"Liên hệ bitwise XOR ở đâu?"* — Mỗi "bước trừ" trong chia CRC chính là một phép `XOR` 5 bit. Toàn bộ CRC = chuỗi XOR có hệ thống. Đây đúng là [bitwise XOR](../../01-NumberRepresentation/lesson-02-bitwise-ops/) áp dụng quy mô lớn.

🔁 **Dừng lại tự kiểm tra**: Với `G = 10011` (bậc 4), CRC sẽ dài bao nhiêu bit? Trước khi chia, data được nối thêm bao nhiêu số `0`?

<details><summary>Đáp án</summary>

Bậc `G` = 4 → CRC dài **4 bit**, và data được nối thêm **4 số `0`** vào cuối trước khi chia.

</details>

📝 **Tóm tắt mục 4**:
- CRC = **số dư** khi chia (data + zeros) cho **generator** bằng **XOR** (số học GF(2)).
- Walk-through: lật bit ở đâu cũng đổi số dư; bên nhận chia lại, số dư `0` = sạch.
- Mạnh hơn checksum: bắt mọi burst error ngắn hơn bậc `G`, không bị bù trừ.
- Vẫn chỉ **detection**, không sửa.

---

## 5. Hamming code (7,4) — sửa được 1 bit (SEC)

💡 **Trực giác**: Parity dùng 1 bit kiểm tra → chỉ biết "có lỗi". Ý tưởng thiên tài của Hamming: dùng **nhiều parity bit**, mỗi cái canh một **tập con khác nhau** của các vị trí. Khi 1 bit lật, nó vi phạm **đúng một tổ hợp** các parity → tổ hợp đó (đọc dưới dạng số nhị phân) **chính là số thứ tự vị trí lỗi**. Giống như 3 nhân chứng, mỗi người canh một dãy ghế: ai báo "có vấn đề" cho ta biết chính xác ghế nào.

Hamming(7,4): **4 bit dữ liệu** + **3 bit parity** = **7 bit codeword**. Sửa được **1 bit lỗi** (Single Error Correction).

### 5.1. Bố trí vị trí — parity ở các lũy thừa của 2

Đánh số vị trí từ **1 đến 7** (1-indexed). Bit parity đặt ở các vị trí là **lũy thừa của 2**: `1, 2, 4`. Bit dữ liệu điền vào các vị trí còn lại: `3, 5, 6, 7`.

| Vị trí | 1 | 2 | 3 | 4 | 5 | 6 | 7 |
|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| Vai trò | **p1** | **p2** | d1 | **p4** | d2 | d3 | d4 |

💡 **Vì sao đặt parity ở 1, 2, 4?** Viết mỗi vị trí dưới dạng nhị phân 3 bit:

| Vị trí | Nhị phân | Bit-1 (giá trị 1) | Bit-2 (giá trị 2) | Bit-4 (giá trị 4) |
|:---:|:---:|:---:|:---:|:---:|
| 1 | `001` | ✓ | | |
| 2 | `010` | | ✓ | |
| 3 | `011` | ✓ | ✓ | |
| 4 | `100` | | | ✓ |
| 5 | `101` | ✓ | | ✓ |
| 6 | `110` | | ✓ | ✓ |
| 7 | `111` | ✓ | ✓ | ✓ |

- **p1** (vị trí 1) canh mọi vị trí có **bit-1 = 1**: đó là `1, 3, 5, 7`.
- **p2** (vị trí 2) canh mọi vị trí có **bit-2 = 1**: đó là `2, 3, 6, 7`.
- **p4** (vị trí 4) canh mọi vị trí có **bit-4 = 1**: đó là `4, 5, 6, 7`.

Sự khéo léo: vị trí `i` được canh bởi đúng các parity ứng với các bit `1` trong biểu diễn nhị phân của `i`. Nên khi bit `i` lỗi, đúng các parity đó báo động → ghép lại thành số `i`.

### 5.2. Công thức encode (even parity)

$$p_1 = d_1 \oplus d_2 \oplus d_4 \quad(\text{canh vị trí } 3,5,7)$$
$$p_2 = d_1 \oplus d_3 \oplus d_4 \quad(\text{canh vị trí } 3,6,7)$$
$$p_4 = d_2 \oplus d_3 \oplus d_4 \quad(\text{canh vị trí } 5,6,7)$$

### 5.3. Walk-through ĐẦY ĐỦ — encode `d = 1011`

Cho `d1=1, d2=0, d3=1, d4=1`.

```
p1 = d1 ⊕ d2 ⊕ d4 = 1 ⊕ 0 ⊕ 1 = 0
p2 = d1 ⊕ d3 ⊕ d4 = 1 ⊕ 1 ⊕ 1 = 1
p4 = d2 ⊕ d3 ⊕ d4 = 0 ⊕ 1 ⊕ 1 = 0
```

Xếp vào 7 vị trí `[p1 p2 d1 p4 d2 d3 d4]`:

| Vị trí | 1 | 2 | 3 | 4 | 5 | 6 | 7 |
|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| Bit | p1=**0** | p2=**1** | d1=1 | p4=**0** | d2=0 | d3=1 | d4=1 |

→ **Codeword = `0110011`**.

Kiểm tra nhanh từng nhóm parity (mỗi nhóm phải có số bit `1` chẵn):
- Nhóm p1 {1,3,5,7} = `0,1,0,1` → hai số `1` → chẵn ✓
- Nhóm p2 {2,3,6,7} = `1,1,1,1` → bốn số `1` → chẵn ✓
- Nhóm p4 {4,5,6,7} = `0,0,1,1` → hai số `1` → chẵn ✓

### 5.4. Walk-through ĐẦY ĐỦ — decode khi có 1 bit lỗi

Bên nhận lấy codeword, tính lại 3 **bit syndrome** `s1, s2, s4`. Mỗi `s` = XOR của nhóm parity tương ứng. Syndrome `= s4 s2 s1` (đọc nhị phân) chỉ thẳng vị trí lỗi; `= 000` nghĩa không lỗi.

$$s_1 = c_1 \oplus c_3 \oplus c_5 \oplus c_7,\quad s_2 = c_2 \oplus c_3 \oplus c_6 \oplus c_7,\quad s_4 = c_4 \oplus c_5 \oplus c_6 \oplus c_7$$

**Kịch bản**: ta gửi `0110011` (từ ví dụ trên). Trên đường đi **bit vị trí 5 lật** `0→1`:

```
Gửi:   vị trí  1 2 3 4 5 6 7
               0 1 1 0 0 1 1
Nhận:          0 1 1 0 1 1 1     ← bit 5 đã lật thành 1
```

Tính syndrome trên chuỗi nhận `c = [0,1,1,0,1,1,1]` (c1..c7):

```
s1 = c1⊕c3⊕c5⊕c7 = 0 ⊕ 1 ⊕ 1 ⊕ 1 = 1
s2 = c2⊕c3⊕c6⊕c7 = 1 ⊕ 1 ⊕ 1 ⊕ 1 = 0
s4 = c4⊕c5⊕c6⊕c7 = 0 ⊕ 1 ⊕ 1 ⊕ 1 = 1
```

Ghép syndrome `= s4 s2 s1 = 1 0 1` (nhị phân) `= 5` (thập phân).

→ **Lỗi ở vị trí 5**. Sửa: lật ngược bit vị trí 5 `1→0`:

```
Nhận:       0 1 1 0 1 1 1
Sửa bit 5:  0 1 1 0 0 1 1   ← khớp đúng codeword gốc!  ✓
```

Trích lại dữ liệu từ vị trí `3,5,6,7` = `1,0,1,1` = `d = 1011` ✓ — khôi phục hoàn hảo, **không cần gửi lại**.

### 5.5. Bốn ví dụ encode + một decode khác

| Data `d1d2d3d4` | p1 | p2 | p4 | Codeword (vị trí 1..7) |
|:---:|:---:|:---:|:---:|:---:|
| `1011` | 0 | 1 | 0 | `0110011` |
| `1001` | 0 | 0 | 1 | `0011001` |
| `0110` | 1 | 1 | 0 | `1100110` |
| `1111` | 1 | 1 | 1 | `1111111` |
| `1000` | 1 | 1 | 0 | `1110000` |

Verify `1001`: `p1=1⊕0⊕1=0`, `p2=1⊕0⊕1=0`, `p4=0⊕0⊕1=1` → `[0 0 1 1 0 0 1]` = `0011001` ✓.

**Decode khác** — nhận `0011001` nhưng **bit vị trí 2 lật** `0→1` → nhận `0111001`:
```
c = 0 1 1 1 0 0 1
s1 = c1⊕c3⊕c5⊕c7 = 0⊕1⊕0⊕1 = 0
s2 = c2⊕c3⊕c6⊕c7 = 1⊕1⊕0⊕1 = 1
s4 = c4⊕c5⊕c6⊕c7 = 1⊕0⊕0⊕1 = 0
syndrome = s4 s2 s1 = 0 1 0 = 2  → lỗi ở vị trí 2, sửa → 0011001 ✓
```

⚠ **Lỗi thường gặp — Hamming(7,4) sửa ĐÚNG 1 bit, "sửa SAI" với 2 bit**: Nếu **2 bit** cùng lật, syndrome vẫn ra một số `1..7` khác `0` → mã sẽ "sửa" một vị trí, nhưng **sai vị trí** → làm hỏng thêm. Hamming(7,4) chỉ đảm bảo đúng khi tối đa 1 bit lỗi. Muốn vừa sửa 1 vừa phát hiện 2, thêm 1 parity tổng → Hamming(8,4) SECDED (dùng trong ECC RAM).

❓ **Câu hỏi tự nhiên**:
- *"Syndrome = 0 chắc chắn không lỗi?"* — Chỉ chắc chắn khi ≤ 1 bit lỗi. Với ≥ 3 bit lỗi syndrome có thể tình cờ = 0 (lỗi rơi đúng vào một codeword hợp lệ khác). Mọi mã đều có giới hạn này.
- *"Vì sao lại tốn tận 3 bit cho 4 bit data?"* — Để định vị 1 trong 7 vị trí (+ trường hợp "không lỗi") cần phân biệt 8 khả năng = 2³ → tối thiểu 3 bit syndrome. Đó là chi phí của *correction* so với *detection*.

🔁 **Dừng lại tự kiểm tra**: Nhận codeword `1100100` (cho là Hamming(7,4)). Tính syndrome và sửa (nếu cần).

<details><summary>Đáp án</summary>

`c = 1 1 0 0 1 0 0`. `s1 = c1⊕c3⊕c5⊕c7 = 1⊕0⊕1⊕0 = 0`; `s2 = c2⊕c3⊕c6⊕c7 = 1⊕0⊕0⊕0 = 1`; `s4 = c4⊕c5⊕c6⊕c7 = 0⊕1⊕0⊕0 = 1`. Syndrome `= s4 s2 s1 = 110 = 6` → lỗi vị trí 6, lật `0→1` → `1100110`. Dữ liệu (vị trí 3,5,6,7) = `0,1,1,0` = `0110`. (Đúng — đây là codeword của `0110` ở bảng trên.)

</details>

📝 **Tóm tắt mục 5**:
- Hamming(7,4): parity ở vị trí **1,2,4**; mỗi parity canh các vị trí có bit tương ứng `= 1`.
- Encode bằng 3 phép XOR; decode tính **syndrome** = số thứ tự vị trí lỗi (0 = sạch).
- Sửa được **đúng 1 bit**; với 2 bit lỗi sẽ "sửa sai". SECDED (Hamming mở rộng) khắc phục.

---

## 6. Khoảng cách Hamming & nguyên lý phát hiện/sửa

💡 **Trực giác**: Hình dung mỗi codeword là một "thành phố" trên bản đồ. **Khoảng cách Hamming** giữa hai chuỗi = số vị trí chúng khác nhau = "đường chim bay" tính bằng số bit phải lật để biến cái này thành cái kia. Lỗi truyền tin = "đi lạc" vài bước khỏi thành phố gốc. Nếu các thành phố cách nhau xa, ta vẫn đoán được "anh xuất phát từ thành phố gần nhất".

### 6.1. Định nghĩa khoảng cách Hamming

Khoảng cách Hamming `d(a, b)` giữa hai chuỗi bit cùng độ dài = **số vị trí khác nhau** = số bit `1` trong `a ⊕ b`.

Bốn ví dụ:

| `a` | `b` | `a ⊕ b` | `d(a,b)` |
|-----|-----|---------|:---:|
| `1011` | `1001` | `0010` | 1 |
| `0110` | `1001` | `1111` | 4 |
| `1110000` | `1100110` | `0010110` | 3 |
| `0000` | `0000` | `0000` | 0 |

### 6.2. Khoảng cách tối thiểu `d_min` của một bộ mã

`d_min` = khoảng cách Hamming **nhỏ nhất** giữa **mọi cặp** codeword hợp lệ trong bộ mã. Đây là đại lượng quyết định sức mạnh:

$$\boxed{\text{Phát hiện được tới } d_{\min}-1 \text{ bit lỗi} \qquad \text{Sửa được tới } \left\lfloor \tfrac{d_{\min}-1}{2} \right\rfloor \text{ bit lỗi}}$$

💡 **Vì sao công thức này đúng?** Nếu hai codeword gần nhất cách nhau `d_min` bước, thì:
- Lật tới `d_min − 1` bit không bao giờ biến codeword này *thành* codeword kia (còn cách ≥ 1 bước) → kết quả là chuỗi **không hợp lệ** → **phát hiện được**.
- Để **sửa** an toàn, mỗi codeword cần một "vùng an toàn" bán kính `t` quanh nó, và các vùng không được chồng lấn → cần `d_min ≥ 2t + 1` → `t = ⌊(d_min−1)/2⌋`. Trong bán kính `t`, codeword gốc là cái **gần nhất** → đoán đúng.

### 6.3. Walk-through số trên các bộ mã quen thuộc

| Bộ mã | `d_min` | Phát hiện (`d_min−1`) | Sửa (`⌊(d_min−1)/2⌋`) |
|-------|:---:|:---:|:---:|
| Single parity bit | 2 | 1 bit | 0 bit |
| Hamming(7,4) | 3 | 2 bit | 1 bit |
| Repetition ×3 (`000`/`111`) | 3 | 2 bit | 1 bit |
| Hamming(8,4) SECDED | 4 | 3 bit | 1 bit (+ phát hiện 2) |

**Verify Hamming(7,4) có `d_min = 3`**: liệt kê 16 codeword (từ 16 giá trị data), tính khoảng cách mọi cặp → cặp gần nhất cách nhau đúng `3`. Vd `0000000` (data `0000`) và `1110000` (data `1000`) khác nhau ở 3 vị trí → `d = 3`. Vì `d_min = 3`: phát hiện `3−1 = 2` bit, sửa `⌊2/2⌋ = 1` bit — khớp đúng với mục 5.

**Verify repetition ×3**: codeword chỉ có `000` và `111`, `d(000,111) = 3` → `d_min = 3`. Nhận `010` → gần `000` (d=1) hơn `111` (d=2) → sửa về `0`. Đây là correction kiểu "biểu quyết đa số".

❓ **Câu hỏi tự nhiên**:
- *"Muốn sửa 2 bit cần `d_min` bao nhiêu?"* — `d_min ≥ 5` (vì `t=2` cần `d_min ≥ 2·2+1 = 5`). Đắt hơn nhiều → ít dùng trừ kênh rất nhiễu.
- *"Vì sao parity chỉ `d_min = 2`?"* — Đổi 1 bit data làm parity đổi theo → hai codeword hợp lệ gần nhất khác nhau **2 vị trí** (1 data + 1 parity). Nên phát hiện 1, sửa 0 — đúng như mục 2.

🔁 **Dừng lại tự kiểm tra**: Một bộ mã có `d_min = 4`. Nó phát hiện được tối đa mấy bit? Sửa được mấy bit?

<details><summary>Đáp án</summary>

Phát hiện `4−1 = 3` bit; sửa `⌊(4−1)/2⌋ = ⌊1.5⌋ = 1` bit. (Đây chính là SECDED: sửa 1, phát hiện 2 — "phát hiện 3" là cận lý thuyết khi không cố sửa.)

</details>

📝 **Tóm tắt mục 6**:
- Khoảng cách Hamming = số bit khác nhau = số `1` trong `a ⊕ b`.
- `d_min` của bộ mã quyết định: **phát hiện `d_min−1`**, **sửa `⌊(d_min−1)/2⌋`** bit.
- Parity `d_min=2`; Hamming(7,4) `d_min=3`; muốn sửa 2 bit cần `d_min≥5`.

---

## 7. Detection vs Correction — và liên hệ thực tế

### 7.1. So sánh tổng hợp

| Sơ đồ | Loại | Bit dư | Bắt được | Sửa được | Dùng ở đâu |
|-------|------|:---:|----------|:---:|------------|
| Parity | Detection | 1 | lỗi lẻ-bit | — | UART, RAM cũ |
| Checksum | Detection | k (8/16) | nhiều, nhưng mù hoán vị/bù trừ | — | TCP/UDP/IP header |
| CRC | Detection | = bậc G | mọi burst < bậc G, hầu hết lỗi | — | Ethernet, ZIP, PNG, đĩa |
| Hamming(7,4) | Correction | 3 | 2 bit (nếu không sửa) | 1 bit | ECC nhẹ, học thuật |
| SECDED / Reed-Solomon | Correction | nhiều | nhiều | 1+ bit / nhiều symbol | ECC RAM, CD/DVD, QR, RAID |

### 7.2. Liên hệ Networking — CRC trong frame

Trong [Networking](../../../Networking/), mỗi **frame** ở tầng liên kết dữ liệu (Ethernet) kết thúc bằng trường **FCS (Frame Check Sequence)** = **CRC-32** của toàn bộ frame. Bên nhận tính lại CRC; lệch → **vứt frame**, không báo lỗi cụ thể (tầng trên như TCP lo việc gửi lại). Đây là lý do tầng vật lý/liên kết chọn **detection + retransmit** chứ không correction: gửi lại rẻ và đơn giản hơn nhồi bit sửa lỗi vào mọi frame.

### 7.3. Liên hệ Cryptography — hash ≠ checksum

⚠ **Lỗi thường gặp — nhầm hash mật mã với checksum**: Cả hai cùng "rút gọn dữ liệu thành một mã ngắn", nhưng chống **hai loại đối thủ khác nhau**:

| | Checksum / CRC | Hash mật mã (SHA-256...) |
|---|---|---|
| Chống | Lỗi **ngẫu nhiên** (nhiễu, bit rot) | **Kẻ tấn công cố ý** sửa dữ liệu |
| Tính chất | Nhanh, tuyến tính, dễ "chế" va chạm | Một chiều, chống va chạm, đắt tính |
| Sửa được data khớp CRC? | **Dễ** (CRC tuyến tính → tính ngược ra) | **Bất khả thi** (preimage resistance) |

Một kẻ tấn công có thể sửa file **rồi tính lại CRC** cho khớp → CRC vô dụng chống cố ý. SHA-256 thì không: đổi 1 bit → hash đổi ~50% bit và không thể "chế" lại. Xem [Cryptography — Hash functions](../../../Cryptography/02-ModernSymmetric/lesson-03-hash-functions/). **Quy tắc**: CRC/checksum cho lỗi **tình cờ**; hash mật mã cho **toàn vẹn chống tấn công**.

### 7.4. Liên hệ RAID & ECC RAM

- **ECC RAM**: mỗi 64 bit data kèm 8 bit ECC theo sơ đồ **SECDED** (Hamming mở rộng) → tự sửa 1 bit lỗi (tia vũ trụ) ngay trong RAM, phát hiện 2 bit. Server quan trọng đều dùng.
- **RAID** (đĩa): RAID-5 dùng **parity** (XOR các đĩa) — chính là parity bit ở quy mô khối; mất 1 đĩa → XOR các đĩa còn lại khôi phục đĩa hỏng (đây là *erasure correction*: biết *vị trí* lỗi nên 1 bit parity đủ sửa). RAID-6 dùng mã mạnh hơn (Reed-Solomon) chịu được mất 2 đĩa.

💡 **Trực giác khép lại bài**: từ 1 bit parity (báo động đơn giản) → checksum (cộng tổng) → CRC (chia đa thức, bắt burst) → Hamming (định vị & sửa 1 bit) → Reed-Solomon (sửa cả cụm). Cùng một ý tưởng — **thêm dư thừa có cấu trúc** — chỉ khác mức độ "thông minh" của cấu trúc đó.

📝 **Tóm tắt mục 7**:
- Detection (parity/checksum/CRC) rẻ → dùng nơi gửi lại được (mạng).
- Correction (Hamming/RS) đắt → dùng nơi không gửi lại được (đĩa, RAM, tàu vũ trụ).
- **Hash mật mã ≠ checksum**: hash chống cố ý, checksum chống ngẫu nhiên.

---

## 8. Bài tập

**Bài 1 (Parity)**: Tính even parity bit cho `d = 1100110`. Nếu bit thứ 4 lật, bên nhận có phát hiện không? Nếu bit 4 và bit 6 cùng lật thì sao?

**Bài 2 (Checksum)**: Tính checksum đơn giản (mod 256) của các byte `0x4A, 0x6F, 0x21`. Sau đó chỉ ra một cách đổi 2 byte mà checksum **không** phát hiện.

**Bài 3 (CRC)**: Với generator `G = 1011` (bậc 3), tính CRC cho data `110101`. Viết rõ chuỗi truyền đi. (Gợi ý: nối 3 số `0`, chia bằng XOR từng bước.)

**Bài 4 (Hamming encode)**: Mã hóa `d = 0101` (d1=0,d2=1,d3=0,d4=1) bằng Hamming(7,4). Cho codeword 7 bit và kiểm tra cả 3 nhóm parity.

**Bài 5 (Hamming decode)**: Bên nhận được codeword Hamming(7,4) `1011010`. Tính syndrome, định vị lỗi (nếu có), sửa và trích ra 4 bit data gốc.

**Bài 6 (Khoảng cách)**: Một bộ mã có `d_min = 5`. Nó phát hiện và sửa được tối đa bao nhiêu bit? Nếu chỉ muốn *sửa* 1 bit thì có thể dùng `d_min` nhỏ hơn không?

---

## 9. Lời giải chi tiết

### Bài 1 — Parity

`d = 1100110`, số bit `1` = 4 (chẵn) → **even parity `p = 0`**. Gửi `11001100` (4 số `1`, chẵn).

- **Lật bit 4** (`0→1`): nhận `11011100` → 5 số `1` (lẻ) → XOR tất cả `= 1` → **phát hiện được** (lỗi 1 bit = lẻ).
- **Lật bit 4 và bit 6** (`0→1`, `1→0`): nhận `11011000` → 4 số `1` (chẵn) → XOR `= 0` → **không phát hiện** (lỗi 2 bit = chẵn, parity mù).

### Bài 2 — Checksum

`0x4A + 0x6F + 0x21 = 0xDA` (74+111+33 = 218 = `0xDA`, không tràn 8 bit) → **checksum `= 0xDA`**.

Cách qua mặt (bù trừ): tăng byte 1 lên `+1` và giảm byte 2 đi `−1`: `0x4B, 0x6E, 0x21` → tổng vẫn `0xDA`. Hoặc **hoán vị**: `0x6F, 0x4A, 0x21` → cùng `0xDA`. Cả hai lỗi đều lọt vì cộng có tính giao hoán/tuyến tính.

### Bài 3 — CRC với `G = 1011`, data `110101`

Bậc `G = 3` → nối 3 số `0`: augmented `= 110101 000 = 110101000`.

```
Lấy 4 bit:   1101
Bước 1: dẫn '1' → XOR 1011:
        1101 ⊕ 1011 = 0110  → bỏ '0', kéo '0' → 1100
Bước 2: dẫn '1' → XOR 1011:
        1100 ⊕ 1011 = 0111  → bỏ '0', kéo '1' → 1111
Bước 3: dẫn '1' → XOR 1011:
        1111 ⊕ 1011 = 0100  → bỏ '0', kéo '0' → 1000
Bước 4: dẫn '1' → XOR 1011:
        1000 ⊕ 1011 = 0011  → bỏ '0', kéo '0' → 0110
Bước 5: dẫn '0' → skip:
        0110  → bỏ '0', kéo '0' → 1100
Bước 6: dẫn '1' → XOR 1011:
        1100 ⊕ 1011 = 0111  → HẾT bit → số dư = 111
```

**CRC = `111`**. Chuỗi truyền đi `= 110101 ∥ 111 = 110101111`.

Kiểm chứng: chia `110101111` cho `1011` → số dư phải `= 000` (bên nhận thấy sạch).

### Bài 4 — Hamming encode `0101`

`d1=0, d2=1, d3=0, d4=1`:
```
p1 = d1⊕d2⊕d4 = 0⊕1⊕1 = 0
p2 = d1⊕d3⊕d4 = 0⊕0⊕1 = 1
p4 = d2⊕d3⊕d4 = 1⊕0⊕1 = 0
```
Codeword `[p1 p2 d1 p4 d2 d3 d4] = [0 1 0 0 1 0 1] = ` **`0100101`**.

Kiểm 3 nhóm (mỗi nhóm số `1` chẵn):
- p1 {1,3,5,7} = `0,0,1,1` → 2 số `1` ✓
- p2 {2,3,6,7} = `1,0,0,1` → 2 số `1` ✓
- p4 {4,5,6,7} = `0,1,0,1` → 2 số `1` ✓

### Bài 5 — Hamming decode `1011010`

`c = [1,0,1,1,0,1,0]` (c1..c7):
```
s1 = c1⊕c3⊕c5⊕c7 = 1⊕1⊕0⊕0 = 0
s2 = c2⊕c3⊕c6⊕c7 = 0⊕1⊕1⊕0 = 0
s4 = c4⊕c5⊕c6⊕c7 = 1⊕0⊕1⊕0 = 0
```
Syndrome `= s4 s2 s1 = 000 = 0` → **không lỗi**. Trích data (vị trí 3,5,6,7) = `c3,c5,c6,c7 = 1,0,1,0` → **data `= 1010`**.

(Kiểm: encode `1010`: `p1=1⊕0⊕0=1`, `p2=1⊕1⊕0=0`, `p4=0⊕1⊕0=1` → `[1 0 1 1 0 1 0] = 1011010` ✓ khớp.)

### Bài 6 — `d_min = 5`

- Phát hiện tối đa `d_min − 1 = 4` bit.
- Sửa tối đa `⌊(d_min−1)/2⌋ = ⌊4/2⌋ = 2` bit.
- Nếu chỉ cần sửa **1 bit**, `d_min = 3` là đủ (vd Hamming(7,4)) — tiết kiệm bit dư hơn nhiều. Chọn `d_min` theo đúng nhu cầu để khỏi lãng phí.

---

## 10. Tham khảo & Bài tiếp theo

- Bài trước: [N2-L04 — Compression](../lesson-04-compression/) *(nén dữ liệu)*
- **Bài tiếp (sang Nhóm 3 — Math Foundations)**: [N3-L01 — Set Theory](../../03-MathFoundations/lesson-01-set-theory/) — nền tảng tập hợp, dùng để định nghĩa chính xác "tập các codeword hợp lệ", "tập vị trí mỗi parity canh".
- Tiền đề liên quan:
  - [Bitwise Operations](../../01-NumberRepresentation/lesson-02-bitwise-ops/) — XOR là cơ chế của parity/CRC/Hamming.
  - [Boolean Logic](../../03-MathFoundations/lesson-02-boolean-logic/) — bảng chân trị XOR.
  - [Character Encoding](../lesson-01-character-encoding/) — dữ liệu byte cần bảo vệ.
- Liên hệ ứng dụng:
  - [Networking](../../../Networking/) — CRC-32 trong FCS của frame Ethernet.
  - [Cryptography — Hash functions](../../../Cryptography/02-ModernSymmetric/lesson-03-hash-functions/) — phân biệt hash mật mã với checksum/CRC.
- Trang chính nhóm: [02-EncodingMemory](../index.html)
- [visualization.html](./visualization.html)
</content>
</invoke>
