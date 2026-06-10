// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: Electronics/03-Digital-MCU/lesson-04-registers-counters/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 04 — Thanh ghi & Bộ đếm

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Hiểu **thanh ghi (register)** là gì — tập hợp n D flip-flop lưu n bit song song.
- Nắm vững **thanh ghi dịch (shift register)** — 4 chế độ SISO/SIPO/PISO/PIPO và ứng dụng thực tế.
- Phân tích **bộ đếm bất đồng bộ (ripple counter)** — chuỗi T flip-flop, mỗi tầng chia đôi tần số.
- So sánh với **bộ đếm đồng bộ (synchronous counter)** — không bị trễ lan truyền, dùng trong thiết kế hiện đại.
- Thiết kế **bộ đếm mod-N** (mod-10, mod-6, mod-12) cho đồng hồ số và chia tần số.
- Liên kết ứng dụng: đồng hồ số, định thời, địa chỉ bộ nhớ, mở rộng ngõ ra (74HC595).

## Kiến thức tiền đề

- [Lesson 03 — Mạch tuần tự & flip-flop](../lesson-03-sequential-flipflops/) — D flip-flop, JK flip-flop, T flip-flop, bảng trạng thái, clock edge.
- [Lesson 01 — Boolean & Cổng logic](../lesson-01-boolean-logic-gates/) — AND, OR, NOT, NAND.

---

## 1. Thanh ghi (Register)

### 1.1. Định nghĩa và cấu tạo

💡 **Hình dung**: Thanh ghi là một "kệ đựng bit" — n ngăn kệ, mỗi ngăn chứa đúng 1 bit (0 hoặc 1). Mỗi ngăn là một D flip-flop. Tất cả cùng nhận tín hiệu clock → đọc/ghi song song, ngay lập tức.

**Thanh ghi n bit** = n D flip-flop mắc song song, cùng chia sẻ một đường clock (CLK) và thường có chung tín hiệu reset (CLR):

\`\`\`
D₀ ─── [FF₀] ─── Q₀
D₁ ─── [FF₁] ─── Q₁       (tất cả FF dùng chung CLK)
D₂ ─── [FF₂] ─── Q₂
D₃ ─── [FF₃] ─── Q₃
         ↑
        CLK (cạnh lên)
\`\`\`

Tại mỗi **cạnh lên của clock**, toàn bộ dữ liệu ở ngõ vào $D_0$–$D_3$ được "chụp" đồng thời vào $Q_0$–$Q_3$. Dữ liệu giữ nguyên cho đến cạnh clock kế tiếp.

**Vì sao cần thanh ghi (không dùng riêng từng flip-flop)?**

Trong CPU và vi điều khiển, cần lưu một byte (8 bit) hay một từ (word, 16/32/64 bit) như một đơn vị — không thể xử lý từng bit riêng lẻ. Thanh ghi giải quyết bằng cách:
- Đọc/ghi tất cả bit trong 1 chu kỳ clock.
- Đường dữ liệu (data bus) song song 8/16/32 bit nối thẳng vào $D_0$–$D_n$.

### 1.2. Ví dụ: Thanh ghi 4 bit lưu số 1010

| Bit | Ngõ vào D | Ngõ ra Q (sau CLK↑) |
|-----|-----------|---------------------|
| $Q_3$ | 1 | 1 |
| $Q_2$ | 0 | 0 |
| $Q_1$ | 1 | 1 |
| $Q_0$ | 0 | 0 |

Sau cạnh lên: $Q_3Q_2Q_1Q_0$ = **1010** (= 10 thập phân). Bit giữ nguyên cho đến khi có cạnh clock mới với D khác.

### 1.3. Thanh ghi 8 bit — ví dụ lưu 0xA5

0xA5 = 1010 0101 nhị phân.

| Bit | 7 | 6 | 5 | 4 | 3 | 2 | 1 | 0 |
|-----|---|---|---|---|---|---|---|---|
| Q   | 1 | 0 | 1 | 0 | 0 | 1 | 0 | 1 |

Tất cả 8 bit được nạp cùng lúc trong một cạnh clock. Đây là cơ sở của **thanh ghi tích lũy (accumulator)** trong CPU — kết quả phép tính ALU được lưu vào thanh ghi 8/16/32 bit.

### 1.4. Ví dụ thêm — lưu 4 giá trị khác nhau

- Thanh ghi 4 bit lưu **0101** (= 5): $Q_3$=0, $Q_2$=1, $Q_1$=0, $Q_0$=1.
- Thanh ghi 4 bit lưu **1111** (= 15): tất cả flip-flop = 1.
- Thanh ghi 4 bit lưu **0000** (= 0): tất cả flip-flop = 0. (Thường đạt bằng tín hiệu RESET tích cực thấp = đưa CLR về 0.)
- Thanh ghi 8 bit lưu **11001100** (= 0xCC = 204): bit 7,6,3,2 = 1; bit 5,4,1,0 = 0.

❓ **Câu hỏi tự nhiên của người đọc**

- *"Nếu muốn giữ dữ liệu không đổi khi CLK lên, làm thế nào?"* → Dùng tín hiệu **Load Enable (LE)**: khi LE = 0, ngõ vào D được multiplexer thay bằng Q hiện tại (feedback lại chính nó) → flip-flop không thay đổi dù có clock.
- *"Thanh ghi và RAM khác nhau thế nào?"* → Thanh ghi nằm trong CPU (rất nhanh, 1–2 chu kỳ, nhưng số lượng ít: 8–32 cái). RAM nằm ngoài CPU (chậm hơn, vài chục chu kỳ, nhưng dung lượng lớn: GB).
- *"Trong Arduino/STM32, 'thanh ghi' mà tài liệu nhắc đến có phải loại này không?"* → Đúng. Thanh ghi ngoại vi (PORTA, DDRB, TCCR0A...) là các flip-flop lưu cấu hình của ngõ ra, timer, UART... Ghi byte vào địa chỉ thanh ghi = nạp dữ liệu đồng thời vào 8 flip-flop.

📝 **Tóm tắt mục 1**

- Thanh ghi n bit = n D flip-flop cùng clock.
- Tất cả bit đọc/ghi đồng thời tại cạnh clock (latch song song).
- Ứng dụng: thanh ghi CPU, thanh ghi ngoại vi vi điều khiển.
- 4 bit → lưu 0–15; 8 bit → 0–255; 16 bit → 0–65535.

---

## 2. Thanh ghi dịch (Shift Register)

### 2.1. Nguyên lý dịch bit

💡 **Hình dung**: Thanh ghi dịch như băng chuyền sản xuất — mỗi xung clock, toàn bộ bit "bước" sang ô kế bên. Bit đầu vào nối tiếp đi vào từ một đầu; bit tràn ra từ đầu kia.

**Cấu trúc 4 tầng (4-bit shift register)**:

\`\`\`
Serial In ─── [FF₃] ─── [FF₂] ─── [FF₁] ─── [FF₀] ─── Serial Out
                ↑           ↑           ↑           ↑
               CLK         CLK         CLK         CLK  (chung)
\`\`\`

Mỗi FF: $D = Q_{\\text{kế tiếp bên trái}}$. Tại mỗi cạnh clock, mỗi FF sao chép trạng thái của FF bên trái sang.

### 2.2. Bốn chế độ hoạt động

| Chế độ | Vào | Ra | Ý nghĩa |
|--------|-----|----|----------|
| **SISO** | Nối tiếp (serial) | Nối tiếp (serial) | Pipeline delay, chuyển dữ liệu qua khoảng cách |
| **SIPO** | Nối tiếp | Song song | Nhận bit từng cái, xuất song song cùng lúc → **mở rộng ngõ ra** |
| **PISO** | Song song | Nối tiếp | Nạp song song, xuất bit từng cái → **truyền qua 1 dây** |
| **PIPO** | Song song | Song song | Lưu dữ liệu có trễ N clock (N tầng) |

Thời gian trễ của thanh ghi dịch SISO n tầng:

$$t_{\\text{delay}} = n \\cdot T_{\\text{clock}}$$

### 2.3. Walk-through SIPO — dịch từng bước với chuỗi 1011

Giả sử thanh ghi 4 bit ban đầu = 0000. Đưa chuỗi **1**, **0**, **1**, **1** vào Serial In (MSB trước).

| CLK# | Serial In | FF₃ | FF₂ | FF₁ | FF₀ | $Q_3Q_2Q_1Q_0$ |
|------|-----------|-----|-----|-----|-----|-----------|
| Ban đầu | — | 0 | 0 | 0 | 0 | 0000 |
| CLK 1 (↑) | **1** | **1** | 0 | 0 | 0 | 1000 |
| CLK 2 (↑) | **0** | **0** | 1 | 0 | 0 | 0100 |
| CLK 3 (↑) | **1** | **1** | 0 | 1 | 0 | 1010 |
| CLK 4 (↑) | **1** | **1** | 1 | 0 | 1 | 1011 |

Sau 4 xung clock, ngõ ra song song $Q_3Q_2Q_1Q_0$ = **1011**. Toàn bộ byte đã được "nạp" từ 1 dây nối tiếp sang 4 dây song song.

### 2.4. Walk-through PISO — xuất nối tiếp từ 1101

Nạp song song: $Q_3Q_2Q_1Q_0$ = **1101** (= 13) trong 1 xung Load.

| CLK# | Serial Out (= $Q_0$ cũ) | $Q_3$ | $Q_2$ | $Q_1$ | $Q_0$ |
|------|----------------------|----|----|----|-----|
| Sau Load | — | 1 | 1 | 0 | 1 |
| CLK 1 (↑) | **1** ($Q_0$ cũ) | 0 | 1 | 1 | 0 |
| CLK 2 (↑) | **0** | 0 | 0 | 1 | 1 |
| CLK 3 (↑) | **1** | 0 | 0 | 0 | 1 |
| CLK 4 (↑) | **1** | 0 | 0 | 0 | 0 |

Chuỗi xuất ra: **1**, **0**, **1**, **1** = 1011... Chú ý: LSB xuất trước trong PISO tiêu chuẩn (phụ thuộc thiết kế, có thể LSB hoặc MSB trước tùy datasheet).

### 2.5. Walk-through dịch phải — chuỗi 1110

Ban đầu: FF₃FF₂FF₁FF₀ = 0000. Đưa **1**, **1**, **1**, **0** vào.

| CLK# | In | FF₃ | FF₂ | FF₁ | FF₀ |
|------|-----|-----|-----|-----|-----|
| 0 | — | 0 | 0 | 0 | 0 |
| 1 | 1 | 1 | 0 | 0 | 0 |
| 2 | 1 | 1 | 1 | 0 | 0 |
| 3 | 1 | 1 | 1 | 1 | 0 |
| 4 | 0 | 0 | 1 | 1 | 1 |

### 2.6. Ứng dụng thực tế: IC 74HC595

IC **74HC595** là thanh ghi dịch SIPO 8 bit phổ biến nhất, dùng để **mở rộng ngõ ra** từ vi điều khiển:

- Chỉ cần **3 chân** của Arduino: DATA (nối tiếp), SRCLK (clock dịch), RCLK (latch/chốt ra).
- Điều khiển **8 LED** hoặc 8 ngõ ra số bất kỳ từ 3 chân.
- Ghép nối nhiều 74HC595 theo chuỗi (daisy chain) → 16, 24, 32 ngõ ra với vẫn chỉ 3 chân vi điều khiển.

\`\`\`c
// Arduino pseudo-code: ghi byte ra 74HC595
void shiftOut595(byte data) {
  for (int i = 7; i >= 0; i--) {      // MSB trước
    digitalWrite(DATA,  (data >> i) & 1);
    digitalWrite(SRCLK, HIGH);         // xung clock: dịch 1 bit
    digitalWrite(SRCLK, LOW);
  }
  digitalWrite(RCLK, HIGH);           // latch: chốt ra ngõ ra song song
  digitalWrite(RCLK, LOW);
}
\`\`\`

❓ **Câu hỏi tự nhiên của người đọc**

- *"Tại sao cần SIPO thay vì nối thẳng 8 chân?"* → Vi điều khiển nhỏ (Arduino Nano) chỉ có 14 chân số; cần giữ chân cho cảm biến/UART/SPI. 74HC595 giải quyết với 3 chân.
- *"Tốc độ dịch có hạn chế không?"* → 74HC595 chạy tới ~100 MHz. Ở tốc độ SPI 8 MHz (8 bit × 1/8MHz = 1µs/byte), mắt người không nhận thấy độ trễ với LED.
- *"Nếu nguồn điện mất trong lúc dịch, dữ liệu có sai không?"* → Có thể, vì latch chưa được chốt. Trong ứng dụng quan trọng, phải kiểm tra trạng thái trước khi latch.

⚠ **Lỗi thường gặp với shift register**

- **Lệch bit**: quên đếm đúng số xung clock → ngõ ra song song lệch 1 bit. Luôn đếm chính xác n xung cho n-bit register.
- **Thiếu cạnh latch**: với 74HC595, nếu không kéo RCLK lên sau khi dịch xong → dữ liệu đã vào thanh ghi dịch nhưng ngõ ra song song ($Q_0$–$Q_7$) chưa cập nhật.
- **LSB/MSB nhầm hướng**: kiểm tra datasheet — một số IC xuất LSB trước, số khác MSB trước.

🔁 **Tự kiểm tra**

Thanh ghi dịch 4 bit chứa 0110. Đưa bit **1** vào đầu (dịch phải). Sau 2 xung clock, nội dung là gì?

<details>
<summary>Xem đáp án</summary>

Clock 1: In=1 → [1, 0, 1, 1] (MSB = 1 mới vào, dịch sang phải)
Clock 2: In=? (giả sử in=0) → [0, 1, 0, 1]

Nếu in = 1 cả 2 xung: Clock 1 → 1011; Clock 2 → 1101.
</details>

📝 **Tóm tắt mục 2**

- Mỗi clock: toàn bộ nội dung dịch 1 ô. Trễ = $n \\cdot T_{\\text{clock}}$.
- SIPO: nối tiếp vào → song song ra (mở rộng ngõ ra — IC 74HC595).
- PISO: song song vào → nối tiếp ra (nén nhiều bit xuống 1 dây).
- n bit cần n xung clock để nạp/xuất hoàn chỉnh.

---

## 3. Bộ đếm bất đồng bộ (Ripple Counter)

### 3.1. Nguyên lý

💡 **Hình dung**: Bộ đếm ripple như đồng hồ cơ — kim giây quay tròn, kéo kim phút, kim phút kéo kim giờ. Mỗi tầng đếm "kéo" tầng kế tiếp.

Dùng **T flip-flop** (hoặc JK FF với J=K=1). T flip-flop đảo ngõ ra Q mỗi khi clock lên: $Q^+ = T \\oplus Q$, với T=1 thì $Q^+ = \\overline{Q}$.

**Chuỗi 4 T flip-flop**:

\`\`\`
CLK ─── [T-FF₀] ─── Q₀ ─── [T-FF₁] ─── Q₁ ─── [T-FF₂] ─── Q₂ ─── [T-FF₃] ─── Q₃
                       ↓ (Q̄₀ làm CLK cho FF₁)
\`\`\`

Mỗi FF dùng ngõ ra đảo $\\overline{Q}$ của tầng trước làm clock (cạnh lên $\\overline{Q}$ = cạnh xuống Q). Kết quả: mỗi tầng đếm gấp đôi chu kỳ tầng trước → **chia đôi tần số**.

### 3.2. Walk-through đếm 0→15 (4-bit ripple)

Ban đầu: $Q_3Q_2Q_1Q_0$ = 0000. Theo dõi từng cạnh lên của CLK:

| CLK# | $Q_3$ | $Q_2$ | $Q_1$ | $Q_0$ | Thập phân |
|------|----|----|----|----|-----------|
| 0 | 0 | 0 | 0 | 0 | **0** |
| 1 | 0 | 0 | 0 | 1 | **1** |
| 2 | 0 | 0 | 1 | 0 | **2** |
| 3 | 0 | 0 | 1 | 1 | **3** |
| 4 | 0 | 1 | 0 | 0 | **4** |
| 5 | 0 | 1 | 0 | 1 | **5** |
| 6 | 0 | 1 | 1 | 0 | **6** |
| 7 | 0 | 1 | 1 | 1 | **7** |
| 8 | 1 | 0 | 0 | 0 | **8** |
| 9 | 1 | 0 | 0 | 1 | **9** |
| 10 | 1 | 0 | 1 | 0 | **10** |
| 11 | 1 | 0 | 1 | 1 | **11** |
| 12 | 1 | 1 | 0 | 0 | **12** |
| 13 | 1 | 1 | 0 | 1 | **13** |
| 14 | 1 | 1 | 1 | 0 | **14** |
| 15 | 1 | 1 | 1 | 1 | **15** |
| 16 | 0 | 0 | 0 | 0 | **0** (lặp lại) |

Quan sát bit lật:
- $Q_0$ lật mỗi 1 CLK: $f_{\\text{Q0}} = f_{\\text{CLK}} / 2$.
- $Q_1$ lật mỗi 2 CLK: $f_{\\text{Q1}} = f_{\\text{CLK}} / 4$.
- $Q_2$ lật mỗi 4 CLK: $f_{\\text{Q2}} = f_{\\text{CLK}} / 8$.
- $Q_3$ lật mỗi 8 CLK: $f_{\\text{Q3}} = f_{\\text{CLK}} / 16$.

Tổng quát: bộ đếm n bit chia tần số $2^n$, đếm $2^n$ trạng thái (0 đến $2^n - 1$).

### 3.3. Ví dụ tính chia tần

Đầu vào CLK = **32 kHz** (thạch anh đồng hồ thông dụng):

| Tầng | Tần số ra | Chu kỳ |
|------|-----------|--------|
| $Q_0$ | 16 kHz | 62.5 µs |
| $Q_1$ | 8 kHz | 125 µs |
| $Q_2$ | 4 kHz | 250 µs |
| $Q_3$ | 2 kHz | 500 µs |
| 4 tầng (chia 16) | 2 kHz | 500 µs |
| 15 tầng (chia 32768) | 1 Hz | 1 s |

→ 32 kHz qua 15 tầng chia 2 liên tiếp = **1 Hz**. Đây chính là cách đồng hồ số đếm giây từ thạch anh.

Công thức tổng quát:

$$f_{\\text{out}} = \\frac{f_{\\text{in}}}{2^n}$$

### 3.4. Nhược điểm: Trễ lan truyền (propagation delay)

⚠ **Vấn đề quan trọng**: Trong ripple counter, mỗi FF chờ tín hiệu clock từ FF trước. Nếu mỗi FF có trễ $t_{\\text{pd}} = 10$ ns:

- $Q_0$ thay đổi sau 10 ns.
- $Q_1$ thay đổi sau 20 ns (chờ $Q_0$).
- $Q_2$ thay đổi sau 30 ns.
- $Q_3$ thay đổi sau 40 ns.

Khi đếm từ 0111 → 1000, $Q_3Q_2Q_1Q_0$ đi qua các trạng thái **tạm thời** 0111 → 0110 → 0100 → 0000 → 1000. Nếu đọc trong khoảng 30 ns này, nhận giá trị sai.

Giải pháp: dùng **bộ đếm đồng bộ** (xem mục 4) hoặc chỉ đọc sau khi ripple ổn định.

❓ **Câu hỏi tự nhiên của người đọc**

- *"Ripple counter có dùng trong thực tế không?"* → Có. Với tần số thấp và không cần đọc trạng thái trung gian, ripple counter (IC 74HC393) đơn giản, tiết kiệm. Dùng cho chia tần số đơn thuần.
- *"4 bit đếm được tối đa bao nhiêu?"* → $2^4 - 1 = 15$. n bit → $2^n$ trạng thái (0 đến $2^n - 1$).
- *"Làm sao đếm ngược (down counter)?"* → Dùng Q (thay $\\overline{Q}$) làm clock cho tầng kế tiếp. Hoặc dùng IC chuyên dụng có chân UP/DOWN.

🔁 **Tự kiểm tra**

Ripple counter 3 bit, CLK = 100 kHz. Tần số tại $Q_2$ là bao nhiêu? Sau bao nhiêu xung CLK thì bộ đếm quay về 0?

<details>
<summary>Xem đáp án</summary>

$Q_2$ = chia $2^3 = 8$ → $100 \\text{ kHz} / 8 = \\mathbf{12.5 \\text{ kHz}}$.
3 bit → $2^3 = 8$ trạng thái → sau **8 xung CLK** quay về 0.
</details>

📝 **Tóm tắt mục 3**

- Mỗi T flip-flop chia đôi tần số clock: $f_{\\text{out}} = f_{\\text{in}}/2$.
- n tầng → bộ đếm nhị phân 0 đến $2^n - 1$, chia tần $2^n$.
- Nhược điểm: trễ lan truyền → trạng thái tạm thời sai khi chuyển nhiều bit.
- Ứng dụng: chia tần số đơn giản, đồng hồ số (chia 32768 → 1 Hz).

---

## 4. Bộ đếm đồng bộ (Synchronous Counter)

### 4.1. Nguyên lý

💡 **Hình dung**: Bộ đếm đồng bộ như dàn nhạc có nhạc trưởng — tất cả nhạc công cùng đánh đúng phách, không ai chờ người kia xong mới đánh.

Tất cả flip-flop dùng **chung một đường clock**. Logic AND quyết định flip-flop nào lật:

$$\\begin{aligned}
T_0 &= 1 \\quad (\\text{luôn lật}) \\\\
T_1 &= Q_0 \\\\
T_2 &= Q_1 \\cdot Q_0 \\\\
T_3 &= Q_2 \\cdot Q_1 \\cdot Q_0
\\end{aligned}$$

Tất cả FF nhận clock cùng lúc và tính toán logic trước, rồi cùng lật đồng thời.

### 4.2. So sánh ripple vs synchronous

| Tiêu chí | Ripple (bất đồng bộ) | Synchronous (đồng bộ) |
|----------|---------------------|----------------------|
| Clock | FF kế = clock từ $\\overline{Q}$ FF trước | Tất cả FF chung 1 CLK |
| Trễ | Cộng dồn ($n \\times t_{\\text{FF}}$) | Cố định ($1 \\times t_{\\text{FF}} + t_{\\text{logic}}$) |
| Trạng thái sai | Có (glitch trung gian) | Không |
| Độ phức tạp | Đơn giản | Cần cổng logic AND |
| Tốc độ tối đa | Thấp (phụ thuộc n) | Cao (không phụ thuộc n) |
| Ứng dụng | Chia tần, tốc độ thấp | CPU, FPGA, thiết kế hiện đại |

### 4.3. Walk-through bộ đếm đồng bộ 4 bit

Đếm từ 0111 (= 7) → 1000 (= 8):

- $T_0 = 1$ → $Q_0$ lật: 1→0.
- $T_1 = Q_{0,\\text{cũ}} = 1$ → $Q_1$ lật: 1→0.
- $T_2 = Q_{1,\\text{cũ}} \\cdot Q_{0,\\text{cũ}} = 1 \\cdot 1 = 1$ → $Q_2$ lật: 1→0.
- $T_3 = Q_{2,\\text{cũ}} \\cdot Q_{1,\\text{cũ}} \\cdot Q_{0,\\text{cũ}} = 1 \\cdot 1 \\cdot 1 = 1$ → $Q_3$ lật: 0→1.

Tất cả lật **đồng thời** trong một cạnh clock. Không có trạng thái trung gian 0110 hay 0100 như ripple.

### 4.4. Ví dụ thêm: đếm 0011 → 0100

- $T_0 = 1$ → $Q_0$ lật: 1→0.
- $T_1 = Q_{0,\\text{cũ}} = 1$ → $Q_1$ lật: 1→0.
- $T_2 = Q_{1,\\text{cũ}} \\cdot Q_{0,\\text{cũ}} = 1 \\cdot 1 = 1$ → $Q_2$ lật: 0→1.
- $T_3 = Q_{2,\\text{cũ}} \\cdot Q_{1,\\text{cũ}} \\cdot Q_{0,\\text{cũ}} = 0 \\cdot 1 \\cdot 1 = 0$ → $Q_3$ không lật: 0→0.

Kết quả: 0100 (= 4). Đúng.

❓ **Câu hỏi tự nhiên của người đọc**

- *"Bộ đếm đồng bộ có nhược điểm không?"* → Cần thêm cổng AND trước mỗi FF → dùng thêm cổng logic, mạch phức tạp hơn ripple. Nhưng trong FPGA và ASIC, đây là tiêu chuẩn.
- *"Tại sao tất cả CPU hiện đại dùng synchronous design?"* → Vì với hàng tỷ transistor, trễ cộng dồn kiểu ripple sẽ làm giảm tần số tối đa nghiêm trọng. Synchronous cho phép pipeline được.

📝 **Tóm tắt mục 4**

- Tất cả FF chung 1 CLK → không trễ cộng dồn, không glitch.
- $T_0=1$; $T_1=Q_0$; $T_2=Q_1 \\cdot Q_0$; $T_3=Q_2 \\cdot Q_1 \\cdot Q_0$.
- Đây là nền tảng của mọi bộ đếm trong CPU và FPGA hiện đại.

---

## 5. Bộ đếm mod-N

### 5.1. Định nghĩa

**Bộ đếm mod-N** đếm từ 0 đến $N-1$ rồi reset về 0. Còn gọi là **divide-by-N counter** vì chia tần số đầu vào cho N:

$$f_{\\text{out}} = \\frac{f_{\\text{in}}}{N}$$

**Vì sao cần?** Đồng hồ số cần đếm 0–9 (mod-10), 0–59 (mod-60), 0–11 (mod-12) — không phải mod-16 hay mod-256. Điện tử âm nhạc cần chia tần cho số lẻ. Vi điều khiển cần định thời tùy ý.

### 5.2. Phương pháp thiết kế: Reset cưỡng bức

Dùng bộ đếm nhị phân cộng thêm **cổng NAND/RESET**:

1. Chọn trạng thái reset = N (giá trị nhị phân của N).
2. Nối các bit = 1 trong N vào cổng NAND.
3. Ngõ ra NAND → CLR (reset bất đồng bộ) của tất cả FF.
4. Khi đếm đến N: NAND bật → CLR tích cực → ngay lập tức reset về 0.

Lưu ý: trạng thái N tồn tại rất ngắn (vài nanosecond) trước khi reset → đây là **glitch nhỏ** nhưng thường chấp nhận được.

### 5.3. Walk-through bộ đếm mod-10 (BCD)

Đếm 0→9 rồi reset. $N=10 = 1010_2$.

Nối $Q_3$ và $Q_1$ vào NAND → khi cả hai = 1 (tức $Q_3 \\cdot Q_1 = 1$, xảy ra lần đầu tại $1010 = 10$):

| CLK | $Q_3$ | $Q_2$ | $Q_1$ | $Q_0$ | Thập phân | Ghi chú |
|-----|----|----|----|----|-----------|---------|
| 0 | 0 | 0 | 0 | 0 | 0 | |
| 1 | 0 | 0 | 0 | 1 | 1 | |
| 2 | 0 | 0 | 1 | 0 | 2 | |
| 3 | 0 | 0 | 1 | 1 | 3 | |
| 4 | 0 | 1 | 0 | 0 | 4 | |
| 5 | 0 | 1 | 0 | 1 | 5 | |
| 6 | 0 | 1 | 1 | 0 | 6 | |
| 7 | 0 | 1 | 1 | 1 | 7 | |
| 8 | 1 | 0 | 0 | 0 | 8 | |
| 9 | 1 | 0 | 0 | 1 | 9 | |
| 10 | → RESET → 0 | 0 | 0 | 0 | RESET | $Q_3=Q_1=1$ → CLR |

Chỉ 10 trạng thái hợp lệ (0–9). IC **74HC4017** (Johnson counter) và **74HC4518** (BCD up counter) thực hiện mod-10 sẵn.

### 5.4. Walk-through bộ đếm mod-6 (cho phút giây)

$N=6 = 0110_2$. Nối $Q_2$ và $Q_1$ vào NAND:

| CLK | $Q_2$ | $Q_1$ | $Q_0$ | Thập phân |
|-----|----|----|----|-----------|
| 0 | 0 | 0 | 0 | 0 |
| 1 | 0 | 0 | 1 | 1 |
| 2 | 0 | 1 | 0 | 2 |
| 3 | 0 | 1 | 1 | 3 |
| 4 | 1 | 0 | 0 | 4 |
| 5 | 1 | 0 | 1 | 5 |
| 6 | → RESET → 0 | 0 | 0 | RESET | $Q_2=Q_1=1$ → CLR |

6 trạng thái: dùng cho chữ số hàng chục của giây/phút (0–5).

### 5.5. Bộ đếm mod-12 và mod-60

- **Mod-12** (đồng hồ 12 giờ): $N=12 = 1100_2$. Nối $Q_3$ và $Q_2$ vào NAND.
- **Mod-60** (đếm giây/phút 0–59): ghép hai bộ đếm — mod-10 (hàng đơn vị) và mod-6 (hàng chục). Khi mod-10 reset từ 9→0, nó gửi xung clock cho mod-6.

\`\`\`
CLK ──→ [Mod-10 counter] ──→ (carry out khi 9→0) ──→ [Mod-6 counter]
            Q₃Q₂Q₁Q₀                                      Q₂Q₁Q₀
          = đơn vị (0-9)                                 = chục (0-5)
\`\`\`

Kết quả: đếm 00–59 (= 60 trạng thái) → chia tần số cho 60.

### 5.6. Tính tần số chia

Ví dụ: CLK = 1 MHz, qua bộ đếm mod-10:

$$f_{\\text{out}} = \\frac{1 \\text{ MHz}}{10} = \\mathbf{100 \\text{ kHz}}$$

Tiếp tục qua mod-6:

$$f = \\frac{100 \\text{ kHz}}{6} \\approx 16.67 \\text{ kHz}$$

Với thạch anh $32{,}768$ kHz:

$$32{,}768 \\text{ kHz} = 2^{15} \\text{ Hz} \\xrightarrow{\\div 2^{15}} \\mathbf{1 \\text{ Hz}}$$

→ cần 15 tầng chia 2 để ra 1 Hz chính xác.

⚠ **Lỗi thường gặp khi thiết kế mod-N**

- **Reset ngay tại $N-1$ thay vì $N$**: nối sai bit vào NAND → đếm ít hơn 1 trạng thái.
- **Dùng reset đồng bộ vs bất đồng bộ**: reset bất đồng bộ (CLR trực tiếp) nhanh hơn nhưng tạo glitch ngắn; reset đồng bộ (latch vào clock) sạch hơn nhưng bỏ lỡ 1 chu kỳ.
- **Mod-N với N không phải lũy thừa 2**: cần đủ bit. Ví dụ $N=10$ cần 4 bit ($2^3=8 < 10 \\leq 16=2^4$).

🔁 **Tự kiểm tra**

Thiết kế bộ đếm mod-5. Cần bao nhiêu flip-flop? Nối bit nào vào NAND?

<details>
<summary>Xem đáp án</summary>

$N=5 = 101_2$. Cần 3 bit (3 FF). Nối $Q_2$ và $Q_0$ vào NAND. Khi $Q_2=Q_0=1$ lần đầu (= $101 = 5$), NAND tích cực → reset về 000.
</details>

📝 **Tóm tắt mục 5**

- Mod-N: đếm 0 đến $N-1$, $f_{\\text{out}} = f_{\\text{in}} / N$.
- Phương pháp: NAND các bit = 1 trong N → nối vào CLR.
- Ứng dụng tiêu biểu: mod-10 (BCD), mod-6, mod-60 (đồng hồ), mod-12.

---

## 6. Ứng dụng tổng hợp

### 6.1. Đồng hồ số (Digital Clock)

Kiến trúc đồng hồ số hoàn chỉnh từ thạch anh 32.768 kHz:

\`\`\`
32.768 kHz
    │
    ▼
[15 tầng chia 2] → 1 Hz (xung giây)
    │
    ▼
[Mod-10 giây đơn vị] ──→ khi = 9→0: xung
    │ (ngõ ra song song → bộ giải mã 7 đoạn)
    ▼
[Mod-6 giây chục] ──→ khi = 5→0: xung
    │
    ▼
[Mod-10 phút đơn vị] ──→ ...tương tự...
    │
    ▼
[Mod-6 phút chục] ──→ khi phút = 59→0: xung
    │
    ▼
[Mod-12 giờ] hoặc [Mod-24 giờ]
\`\`\`

Mỗi cặp mod-10 + mod-6 = **1 chữ số hai con số** (00–59). Ngõ ra song song từ mỗi bộ đếm nối vào IC **giải mã BCD-7 đoạn** (74HC4511) để hiển thị LED 7 đoạn.

### 6.2. Định thời trong vi điều khiển

Timer/Counter trong Arduino (Atmega328P) dùng thanh ghi 8 bit (TCNT0) hoặc 16 bit (TCNT1) là các bộ đếm đồng bộ:

\`\`\`c
// Timer0 8-bit: đếm từ 0 → 255 → overflow interrupt
// Prescaler chia tần: /1, /8, /64, /256, /1024
// f_CPU = 16 MHz, prescaler = 64
// f_timer = 16 MHz / 64 = 250 kHz
// Overflow mỗi 256 count → 256 / 250 kHz = 1.024 ms

// CTC mode: reset tại OCR0A (mod-N)
OCR0A = 249;  // mod-250 → 250 kHz / 250 = 1 kHz → ngắt 1 ms
\`\`\`

### 6.3. Địa chỉ bộ nhớ và bus địa chỉ

Thanh ghi bộ đếm địa chỉ (Program Counter — PC) trong CPU là bộ đếm đồng bộ n bit:
- Tăng 1 sau mỗi lệnh.
- Load giá trị mới khi lệnh JUMP/CALL.
- Với bus địa chỉ 16 bit → $2^{16} = 65536$ địa chỉ; 32 bit → $2^{32} \\approx 4$ GB.

### 6.4. Mở rộng ngõ ra với 74HC595

Một Arduino điều khiển 16 LED bằng 2 IC 74HC595 ghép nối tiếp:
- 3 chân vi điều khiển (DATA, SRCLK, RCLK).
- 16 xung clock để dịch 16 bit.
- 1 xung RCLK để latch tất cả ngõ ra cùng lúc → không nhấp nháy.

---

## 7. Bài tập + Lời giải chi tiết

### Bài tập

**Bài 1**: Thanh ghi dịch SIPO 4 bit, ban đầu = 0000. Đưa lần lượt các bit **1, 0, 1, 1** (MSB trước) vào đầu vào nối tiếp. Vẽ bảng trạng thái sau mỗi xung clock.

**Bài 2**: Thanh ghi dịch PISO 4 bit nạp giá trị song song **0110**. Liệt kê chuỗi bit xuất ra nối tiếp (MSB trước) qua 4 xung clock.

**Bài 3**: Ripple counter 3 bit, CLK = 200 kHz. (a) Lập bảng đếm 0→7. (b) Tần số tại $Q_0$, $Q_1$, $Q_2$ là bao nhiêu? (c) Sau 24 xung CLK, giá trị bộ đếm là bao nhiêu?

**Bài 4**: Bộ đếm đồng bộ 4 bit, trạng thái hiện tại = 0110 (= 6). Xác định $T_0$, $T_1$, $T_2$, $T_3$ và trạng thái sau 1 xung clock.

**Bài 5**: Thiết kế bộ đếm mod-8 từ bộ đếm ripple 4 bit. Cần bao nhiêu FF? Mô tả cách reset.

**Bài 6**: Hệ thống đồng hồ dùng thạch anh 1.048576 MHz (= $2^{20}$ Hz). Cần bao nhiêu tầng chia 2 để ra 1 Hz? Tần số sau 10 tầng là bao nhiêu?

**Bài 7 (nâng cao)**: Arduino dùng Timer1 (16 bit), $f_{\\text{CPU}}$ = 16 MHz, prescaler = 256, CTC mode. Muốn ngắt mỗi 100 ms, cần đặt OCR1A bằng bao nhiêu?

### Lời giải chi tiết

**Bài 1 — Bảng trạng thái SIPO**

Trạng thái: [FF₃, FF₂, FF₁, FF₀] (FF₃ = ngõ vào mới nhất)

| CLK# | Serial In | FF₃ | FF₂ | FF₁ | FF₀ | Q (song song) |
|------|-----------|-----|-----|-----|-----|----------------|
| 0 | — | 0 | 0 | 0 | 0 | 0000 |
| 1↑ | 1 | **1** | 0 | 0 | 0 | 1000 |
| 2↑ | 0 | **0** | 1 | 0 | 0 | 0100 |
| 3↑ | 1 | **1** | 0 | 1 | 0 | 1010 |
| 4↑ | 1 | **1** | 1 | 0 | 1 | **1011** |

Sau 4 xung: $Q_3Q_2Q_1Q_0$ = **1011**. Đã chuyển chuỗi nối tiếp sang 4 bit song song.

---

**Bài 2 — Xuất nối tiếp từ PISO 0110**

Nạp: FF₃=0, FF₂=1, FF₁=1, FF₀=0. Dịch ra (MSB = FF₃ trước):

| CLK# | Serial Out | Nội dung còn lại |
|------|-----------|-----------------|
| Load | — | 0110 |
| 1↑ | **0** (FF₃) | 0110 → dịch: x011 (0 ra) |
| 2↑ | **1** (FF₂ cũ) | dịch: xx01 (1 ra) |
| 3↑ | **1** (FF₁ cũ) | dịch: xxx0 (1 ra) |
| 4↑ | **0** (FF₀ cũ) | dịch: xxxx (0 ra) |

Chuỗi xuất: **0, 1, 1, 0** = 0110 (MSB trước, giống bit gốc). Bit được khôi phục đúng thứ tự.

---

**Bài 3 — Ripple counter 3 bit, CLK = 200 kHz**

**(a) Bảng đếm**:

| CLK# | $Q_2$ | $Q_1$ | $Q_0$ | Thập phân |
|------|----|----|----|----|
| 0 | 0 | 0 | 0 | 0 |
| 1 | 0 | 0 | 1 | 1 |
| 2 | 0 | 1 | 0 | 2 |
| 3 | 0 | 1 | 1 | 3 |
| 4 | 1 | 0 | 0 | 4 |
| 5 | 1 | 0 | 1 | 5 |
| 6 | 1 | 1 | 0 | 6 |
| 7 | 1 | 1 | 1 | 7 |
| 8 | 0 | 0 | 0 | 0 (lặp) |

**(b) Tần số**:

$$f_{Q_0} = \\frac{200 \\text{ kHz}}{2} = \\mathbf{100 \\text{ kHz}} \\qquad f_{Q_1} = \\frac{200 \\text{ kHz}}{4} = \\mathbf{50 \\text{ kHz}} \\qquad f_{Q_2} = \\frac{200 \\text{ kHz}}{8} = \\mathbf{25 \\text{ kHz}}$$

**(c) Sau 24 xung**: $24 \\mod 8 = \\mathbf{0}$ → bộ đếm = **000** (= 0). Chu kỳ là 8 xung, $24 = 3 \\times 8$.

---

**Bài 4 — Bộ đếm đồng bộ, trạng thái = 0110**

$Q_3Q_2Q_1Q_0 = 0110$ → $Q_3=0$, $Q_2=1$, $Q_1=1$, $Q_0=0$.

Tính T:
- $T_0 = 1$ (luôn) → $Q_0$ lật: $0 \\to \\mathbf{1}$
- $T_1 = Q_0 = 0$ → $Q_1$ **không lật**: $1 \\to \\mathbf{1}$
- $T_2 = Q_1 \\cdot Q_0 = 1 \\cdot 0 = 0$ → $Q_2$ **không lật**: $1 \\to \\mathbf{1}$
- $T_3 = Q_2 \\cdot Q_1 \\cdot Q_0 = 1 \\cdot 1 \\cdot 0 = 0$ → $Q_3$ **không lật**: $0 \\to \\mathbf{0}$

Trạng thái sau: $Q_3Q_2Q_1Q_0$ = **0111** (= 7). Đúng: 6 → 7.

---

**Bài 5 — Bộ đếm mod-8**

$N = 8 = 1000_2$. Cần **4 FF** (3 FF chỉ đếm 0–7, nhưng cần 4 FF để phát hiện trạng thái 8 = 1000).

Thực ra: mod-8 = $2^3$ → bộ đếm 3 bit **tự nhiên** đã là mod-8 (tràn từ 7→0 tự động). Không cần mạch reset thêm!

Nếu dùng 4 FF: chỉ cần nối **$Q_3$** vào CLR của tất cả FF. Khi đếm đến 1000 (= 8), $Q_3 = 1$ → reset ngay về 0000.

---

**Bài 6 — Chia tần từ $2^{20}$ Hz**

$2^{20}$ Hz qua n tầng chia 2: $f_{\\text{out}} = 2^{20} / 2^n = 2^{20-n}$ Hz. Muốn $= 1$ Hz $= 2^0$:

$$2^{20-n} = 2^0 \\Rightarrow 20 - n = 0 \\Rightarrow \\mathbf{n = 20 \\text{ tầng}}$$

Sau 10 tầng: $2^{20} / 2^{10} = 2^{10} = \\mathbf{1024 \\text{ Hz}}$ (≈ 1 kHz).

---

**Bài 7 — Timer1 CTC, ngắt 100 ms**

$$f_{\\text{timer}} = \\frac{f_{\\text{CPU}}}{\\text{prescaler}} = \\frac{16 \\text{ MHz}}{256} = \\mathbf{62.5 \\text{ kHz}}$$

Chu kỳ 1 count: $T_{\\text{count}} = 1 / 62500 = \\mathbf{16 \\text{ µs}}$.

Số count cần cho 100 ms:

$$N = \\frac{100 \\text{ ms}}{16 \\text{ µs}} = \\mathbf{6250 \\text{ count}}$$

Trong CTC mode, Timer reset khi TCNT1 = OCR1A, rồi lại từ 0. Vòng đếm có $\\text{OCR1A} + 1$ bước.

$$\\text{OCR1A} = 6250 - 1 = \\mathbf{6249}$$

Kiểm tra: $6250 \\times 16 \\text{ µs} = 100{,}000 \\text{ µs} = \\mathbf{100 \\text{ ms}}$. Đúng.

\`\`\`c
// Arduino Timer1 CTC setup
TCCR1B |= (1 << WGM12);          // CTC mode
TCCR1B |= (1 << CS12);           // prescaler /256
OCR1A   = 6249;                  // 100 ms
TIMSK1 |= (1 << OCIE1A);         // bật ngắt so sánh A
sei();                            // cho phép ngắt toàn cục
\`\`\`

---

## Liên kết và bài tiếp theo

- **Bài trước**: [Lesson 03 — Mạch tuần tự & flip-flop](../lesson-03-sequential-flipflops/)
- **Bài tiếp theo**: [Lesson 05 — ADC/DAC & lấy mẫu tín hiệu](../lesson-05-adc-dac/) — chuyển đổi giữa thế giới tương tự và số.
- **Liên kết ngoài**: [IC 74HC595 datasheet](https://www.ti.com/product/SN74HC595), [IC 74HC393 (ripple counter)](https://www.ti.com/product/SN74HC393).

---

## Tổng kết Lesson 04

1. **Thanh ghi (register)**: n D flip-flop cùng clock → lưu n bit song song; đọc/ghi trong 1 chu kỳ clock.
2. **Thanh ghi dịch (shift register)**: mỗi clock, nội dung dịch 1 ô; trễ = $n \\cdot T_{\\text{clock}}$. SIPO = mở rộng ngõ ra (74HC595); PISO = nén xuống 1 dây.
3. **Ripple counter**: n T flip-flop chuỗi → đếm nhị phân 0–$(2^n-1)$, chia tần $2^n$. Nhược điểm: trễ lan truyền.
4. **Synchronous counter**: tất cả FF chung CLK, logic AND quyết định T → không glitch, dùng trong CPU/FPGA.
5. **Mod-N counter**: NAND các bit = 1 trong N → CLR bất đồng bộ; $f_{\\text{out}} = f_{\\text{in}}/N$. Mod-10 (BCD), mod-60 (giây/phút), mod-12 (giờ).
6. **Ứng dụng**: đồng hồ số (chia $32768 = 2^{15} \\to 1$ Hz), Timer vi điều khiển, mở rộng ngõ ra 74HC595, địa chỉ bộ nhớ (Program Counter).

**Tiếp theo**: [Lesson 05 — ADC/DAC & lấy mẫu tín hiệu](../lesson-05-adc-dac/)
`;
