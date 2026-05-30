// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: Electronics/03-Digital-MCU/lesson-03-sequential-flipflops/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 03 — Mạch tuần tự & Flip-flop

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Giải thích tại sao mạch tuần tự (sequential circuit) khác mạch tổ hợp: ngõ ra phụ thuộc **cả ngõ vào hiện tại lẫn trạng thái quá khứ**.
- Phân tích SR latch (chốt SR) qua NOR và NAND, giải thích cơ chế "chốt" 1 bit nhờ hồi tiếp.
- Hiểu vai trò của xung nhịp (clock) và sự khác biệt giữa kích mức (level-triggered) và kích cạnh (edge-triggered).
- Mô tả D flip-flop — khối nhớ 1 bit cơ bản nhất — qua bảng chân trị và giản đồ thời gian.
- Phân biệt JK flip-flop và T flip-flop; biết ứng dụng T flip-flop vào bộ đếm chia tần.
- Nắm khái niệm setup time, hold time và metastability ở mức định tính.

## Kiến thức tiền đề

- [Lesson 02 — Mạch tổ hợp](../lesson-02-combinational/) — cổng logic, bảng chân trị, mạch không có bộ nhớ.
- [Lesson 01 — Cổng logic Boolean](../lesson-01-boolean-logic-gates/) — AND, OR, NOT, NAND, NOR.

---

## 1. Mạch tuần tự là gì

### 1.1. Định nghĩa và sự khác biệt cốt lõi

💡 **Hình dung trước khi định nghĩa**

Hãy tưởng tượng một máy bán hàng tự động. Khi bạn bỏ thêm 2,000 đồng, máy phản ứng khác nhau tùy vào **số tiền đã bỏ từ trước**: nếu đã có 8,000 đồng thì máy nhả hàng; nếu mới có 0 đồng thì chỉ cộng thêm 2,000. Cùng một hành động (bỏ 2,000) nhưng kết quả khác nhau vì **máy nhớ lịch sử**.

Đây chính là đặc trưng của **mạch tuần tự (sequential circuit)**.

**Định nghĩa hình thức:**

Mạch tuần tự là mạch mà ngõ ra Q phụ thuộc vào:
1. Ngõ vào **hiện tại** (X tại thời điểm t).
2. **Trạng thái hiện tại** S (tức là giá trị đã được lưu từ quá khứ).

\`\`\`
Q(t) = f( X(t), S(t) )
S(t+1) = g( X(t), S(t) )
\`\`\`

Ngược lại, **mạch tổ hợp** (đã học ở [Lesson 02](../lesson-02-combinational/)) chỉ có:

\`\`\`
Q(t) = f( X(t) )     ← hoàn toàn không có S
\`\`\`

| Tiêu chí | Mạch tổ hợp | Mạch tuần tự |
|----------|-------------|--------------|
| Ngõ ra phụ thuộc | Ngõ vào hiện tại | Ngõ vào + trạng thái (lịch sử) |
| Bộ nhớ | Không | Có (flip-flop, latch) |
| Ví dụ | Cộng nhị phân, MUX, decoder | Bộ đếm, thanh ghi, máy trạng thái hữu hạn |

### 1.2. Vì sao cần bộ nhớ — 3 trường hợp dùng thực tế

**Trường hợp 1 — Bộ đếm**: LED chớp đã nhấn nút bao nhiêu lần? Mạch cần nhớ số đếm hiện tại. Mạch tổ hợp thuần không thể làm điều này.

**Trường hợp 2 — Thanh ghi (register)**: CPU lưu kết quả phép tính vào thanh ghi để dùng tiếp ở bước sau. Không có thanh ghi → mỗi bước phải tính lại từ đầu.

**Trường hợp 3 — Máy trạng thái hữu hạn (FSM)**: Đèn giao thông đi theo chu kỳ Đỏ → Xanh → Vàng. Tại bất kỳ thời điểm nào, cần biết đang ở trạng thái nào để chuyển sang trạng thái kế tiếp đúng.

❓ **Câu hỏi tự nhiên của người đọc**

*"Bộ nhớ được làm từ cái gì vật lý?"* — Từ các phần tử có **hồi tiếp (feedback)**: ngõ ra được nối trở lại ngõ vào, tạo vòng lặp ổn định giữ trạng thái. Cơ chế cụ thể sẽ thấy ngay ở phần SR latch bên dưới.

*"Mạch tuần tự khó hơn tổ hợp không?"* — Khó hơn vì phải theo dõi thời gian (thứ tự xảy ra), không chỉ giá trị tức thời. Thiết kế đúng đòi hỏi phân tích giản đồ thời gian (timing diagram).

📝 **Tóm tắt mục 1**

- Mạch tuần tự: Q phụ thuộc ngõ vào **và** trạng thái đã lưu.
- Mạch tổ hợp: Q chỉ phụ thuộc ngõ vào hiện tại.
- Ứng dụng: đếm, lưu, máy trạng thái.

---

## 2. SR Latch — chốt 1 bit đầu tiên

### 2.1. Bài toán: làm thế nào lưu 1 bit?

Cần một mạch có thể:
- **Set** (đặt): buộc ngõ ra = 1 và giữ nguyên dù ngõ vào thay đổi.
- **Reset** (xóa): buộc ngõ ra = 0.
- **Hold** (giữ): không có lệnh mới → giữ nguyên trạng thái cũ.

💡 **Hình dung**: Tưởng tượng một cái khóa cửa loại chốt. Khi ấn chốt vào → cửa khóa lại (Set). Khi kéo chốt ra → cửa mở (Reset). Khi bạn buông tay → cửa vẫn giữ nguyên trạng thái (Hold). Đây là nguyên tắc của SR latch.

### 2.2. SR Latch dùng cổng NOR

Cấu trúc: 2 cổng NOR nối chéo hồi tiếp (ngõ ra của mỗi cổng là ngõ vào của cổng kia).

\`\`\`
       S ─┐
          NOR──── Q
   ┌───┤
   │   Q' ─── NOR──── Q'
   │          ├── R
   └──────────┘
\`\`\`

**Bảng chân trị SR Latch (NOR):**

| S | R | Q (kế tiếp) | Q' (kế tiếp) | Trạng thái |
|---|---|-------------|--------------|------------|
| 0 | 0 | Q (giữ nguyên) | Q' | Hold — không thay đổi |
| 1 | 0 | 1 | 0 | Set — Q = 1 |
| 0 | 1 | 0 | 1 | Reset — Q = 0 |
| 1 | 1 | 0 | 0 | **Cấm** — Q = Q' = 0, không hợp lệ |

**Giải thích hàng "Cấm" (S=R=1):**

- Khi S=R=1: cả hai ngõ ra bị ép về 0 (vì NOR(1,x) = 0).
- Khi S và R cùng trở về 0, hai cổng "tranh nhau" — trạng thái cuối cùng phụ thuộc vào tốc độ lan truyền trễ, **không xác định được**. Đây là trạng thái không hợp lệ, phải tránh.

❓ **Vì sao mạch này "chốt" được?**

Xét trường hợp S=1, R=0 → Q=1, Q'=0. Sau đó S trở về 0 (S=R=0):
- Cổng NOR trên: ngõ vào là S=0 và Q'=0 → Q = NOR(0,0) = **1** (giữ nguyên).
- Cổng NOR dưới: ngõ vào là Q=1 và R=0 → Q' = NOR(1,0) = **0** (giữ nguyên).
- Vòng hồi tiếp tự duy trì trạng thái Q=1 mà không cần tín hiệu Set tiếp tục. Đây là cơ chế "chốt".

### 2.3. SR Latch dùng cổng NAND

Dùng cổng NAND thay NOR. Ngõ vào tích cực thấp (active-low): S_bar và R_bar.

**Bảng chân trị SR Latch (NAND, ngõ vào active-low):**

| S_bar | R_bar | Q (kế tiếp) | Trạng thái |
|-------|-------|-------------|------------|
| 1 | 1 | Q (giữ nguyên) | Hold |
| 0 | 1 | 1 | Set (S_bar=0 kích hoạt) |
| 1 | 0 | 0 | Reset (R_bar=0 kích hoạt) |
| 0 | 0 | **1, 1** | **Cấm** — Q=Q'=1, không hợp lệ |

**So sánh NOR và NAND latch:**

| | NOR Latch | NAND Latch |
|-|-----------|------------|
| Kích hoạt | Active-high (S=R=1 cấm) | Active-low (S_bar=R_bar=0 cấm) |
| Hold | S=R=0 | S_bar=R_bar=1 |
| Phổ biến hơn | Khi thiết kế từ cổng riêng | Khi dùng IC NAND sẵn (74HC00) |

⚠ **Lỗi thường gặp**: Nhầm giữa NOR latch và NAND latch khi đọc bảng — phải chú ý active-high hay active-low. Với NAND latch, mức 0 mới kích hoạt, không phải mức 1.

🔁 **Dừng lại tự kiểm tra**

Cho SR NOR latch đang ở Q=0. Áp dụng: S=1, R=0 trong một lúc, rồi chuyển về S=0, R=0. Ngõ ra Q là bao nhiêu?

<details>
<summary>Đáp án</summary>

**Q=1**. Lý do: S=1,R=0 Set latch về Q=1. Sau đó S=0,R=0 là trạng thái Hold — latch giữ nguyên Q=1. Hồi tiếp duy trì Q=1 mà không cần tín hiệu bên ngoài.

</details>

📝 **Tóm tắt mục 2**

- SR latch lưu 1 bit nhờ **hồi tiếp** giữa 2 cổng NOR (hoặc NAND).
- Trạng thái: Set (Q=1), Reset (Q=0), Hold (giữ nguyên), Cấm (tránh).
- NOR: active-high; NAND: active-low.
- Trạng thái S=R=1 (NOR) hoặc S_bar=R_bar=0 (NAND) là **cấm** — ngõ ra không xác định khi tín hiệu trở về Hold.

---

## 3. Clock và đồng bộ hoá

### 3.1. Vì sao cần xung nhịp (clock)?

💡 **Hình dung**: Hãy nghĩ đến một dây chuyền lắp ráp trong nhà máy. Không có nhịp điều phối, mỗi công nhân làm theo tốc độ riêng — dẫn đến hỗn loạn. Tín hiệu clock như tiếng kẻng điều phối: **"Khi nghe kẻng, mới được cập nhật trạng thái."** Giữa các tiếng kẻng, mọi người giữ nguyên.

Trong mạch số: nếu nhiều flip-flop cập nhật ở thời điểm khác nhau tùy vào trễ lan truyền, dữ liệu trong mạch sẽ không nhất quán. Clock đồng bộ hoá toàn bộ mạch cập nhật **cùng một lúc**.

### 3.2. Hai chế độ kích hoạt

**Kích mức (Level-triggered)**:
- Flip-flop "trong suốt" (transparent) khi clock đang ở mức cao (hoặc thấp).
- Trong khi clock = 1, thay đổi ở ngõ vào **truyền ngay** ra ngõ ra.
- Nhược điểm: nếu ngõ vào thay đổi nhiều lần trong khi clock = 1, ngõ ra thay đổi nhiều lần (không kiểm soát được).

**Kích cạnh (Edge-triggered)**:
- Flip-flop chỉ cập nhật **tại một thời điểm duy nhất**: khoảnh khắc chuyển từ 0→1 (cạnh lên, positive edge) hoặc 1→0 (cạnh xuống, negative edge).
- Giữa hai cạnh clock, ngõ ra **hoàn toàn không thay đổi** dù ngõ vào thay đổi liên tục.
- Hầu hết flip-flop trong thiết kế số hiện đại đều dùng cạnh lên (positive edge-triggered).

\`\`\`
Clock:  _____|‾‾‾‾‾‾‾|_______|‾‾‾‾‾‾‾|_____
              ↑               ↑
         Cạnh lên          Cạnh lên
         (lấy mẫu D)       (lấy mẫu D)
\`\`\`

### 3.3. Tần số clock

**Tần số clock (f_clk)** = số lần clock chuyển trạng thái đầy đủ (0→1→0) trong 1 giây. Đơn vị: Hz, MHz, GHz.

**Ví dụ thực tế:**
- Vi điều khiển Arduino Uno: **16 MHz** (16 triệu chu kỳ/giây).
- Raspberry Pi 4: **1.8 GHz** (1,800 triệu chu kỳ/giây).
- CPU máy tính: **3–5 GHz** (3,000–5,000 triệu chu kỳ/giây).

Tần số clock cao → xử lý nhanh hơn, nhưng cũng tiêu thụ nhiều điện hơn và đòi hỏi định thì chính xác hơn.

❓ **Câu hỏi tự nhiên**: *"Tại sao không tăng clock lên mãi?"* — Vì mỗi cổng logic có **trễ lan truyền** (propagation delay). Nếu clock quá nhanh, tín hiệu chưa kịp ổn định thì cạnh clock tiếp theo đã đến → flip-flop đọc nhầm. Đây là giới hạn vật lý của linh kiện.

📝 **Tóm tắt mục 3**

- Clock đồng bộ hoá toàn bộ mạch cập nhật cùng lúc.
- Level-triggered: trong suốt khi clock ở mức kích hoạt — khó kiểm soát.
- Edge-triggered (cạnh lên/xuống): chỉ cập nhật tại khoảnh khắc chuyển cạnh — chuẩn hiện đại.
- Tần số clock = số chu kỳ/giây (Hz, MHz, GHz).

---

## 4. D Flip-flop — khối nhớ 1 bit cơ bản

### 4.1. Động lực: giải quyết trạng thái "cấm" của SR latch

SR latch có vấn đề: trạng thái cấm (S=R=1) khó tránh trong thiết kế thực tế. D flip-flop giải quyết bằng cách **chỉ có một ngõ vào D**, và tự động đặt:
- S = D
- R = NOT(D)

→ Không bao giờ S=R=1 vì D và NOT(D) không thể cùng bằng 1.

### 4.2. Hoạt động D flip-flop (kích cạnh lên)

💡 **Trực giác**: D flip-flop như **máy chụp ảnh** — chỉ tại khoảnh khắc nhấn nút (cạnh clock), nó "chụp" giá trị hiện tại của D và lưu vào Q. Sau đó dù D thay đổi thế nào, Q vẫn giữ nguyên "bức ảnh" cho đến lần chụp tiếp theo.

**Bảng chân trị D flip-flop (positive edge-triggered):**

| CLK | D | Q (kế tiếp) | Ghi chú |
|-----|---|-------------|---------|
| ↑ (cạnh lên) | 0 | 0 | Lưu 0 vào flip-flop |
| ↑ (cạnh lên) | 1 | 1 | Lưu 1 vào flip-flop |
| 0 hoặc 1 (không phải cạnh) | X | Q (không đổi) | Giữ nguyên |

**Ký hiệu chuẩn**: cạnh lên biểu thị bằng ↑ hoặc hình tam giác nhỏ tại chân CLK của ký hiệu flip-flop.

### 4.3. Giản đồ thời gian (timing diagram)

\`\`\`
CLK: _____|‾‾‾|_____|‾‾‾|_____|‾‾‾|_____|‾‾‾|_____
           ↑         ↑         ↑         ↑

D:   ______|‾‾‾‾‾‾‾‾‾‾‾‾‾|___________|‾‾‾‾‾‾‾|___
           0→1 tại t=1   1→0 tại t=3  0→1 tại t=3.5

Q:   __________________|‾‾‾‾‾‾‾‾‾‾‾|___________|‾‾
     Q cập nhật tại ↑: t=1 D=0→Q=0, t=2 D=1→Q=1, t=3 D=1→Q=1, t=4 D=0→Q=0
\`\`\`

**Walk-through cụ thể** (Q ban đầu = 0, clock có 4 cạnh lên):

| Cạnh CLK | Giá trị D lúc đó | Q sau cạnh | Q' sau cạnh |
|----------|-----------------|------------|-------------|
| 1 (t=1) | 0 | 0 | 1 |
| 2 (t=2) | 1 | 1 | 0 |
| 3 (t=3) | 1 | 1 | 0 |
| 4 (t=4) | 0 | 0 | 1 |

Giữa các cạnh clock, Q hoàn toàn không thay đổi dù D thay đổi liên tục.

❓ **Câu hỏi tự nhiên**: *"D flip-flop dùng để làm gì trong thực tế?"* — Nhiều ứng dụng:
- Lưu 1 bit trạng thái của máy trạng thái hữu hạn (FSM).
- Đồng bộ tín hiệu từ miền clock khác (synchronizer).
- Ghép nối tiếp 8 D flip-flop → thanh ghi 8 bit (sẽ học ở [Lesson 04](../lesson-04-registers-counters/)).
- Pipeline trong CPU: mỗi tầng pipeline là một hàng flip-flop lưu kết quả trung gian.

🔁 **Dừng lại tự kiểm tra**

D flip-flop (positive edge) đang Q=1. Clock có 3 cạnh lên. D lần lượt là: 0, 0, 1 tại mỗi cạnh. Q sau mỗi cạnh là bao nhiêu?

<details>
<summary>Đáp án</summary>

- Cạnh 1: D=0 → Q=**0**
- Cạnh 2: D=0 → Q=**0**
- Cạnh 3: D=1 → Q=**1**

Mỗi cạnh, Q chỉ đơn giản sao chép giá trị D tại thời điểm đó.

</details>

📝 **Tóm tắt mục 4**

- D flip-flop: tại cạnh lên clock → Q = D. Giữa các cạnh: Q không đổi.
- Chỉ có 1 ngõ vào D → không có trạng thái cấm.
- Là khối nhớ 1 bit cơ bản nhất trong thiết kế số đồng bộ.
- Ghép 8 cái → thanh ghi 8 bit.

---

## 5. JK Flip-flop và T Flip-flop

### 5.1. JK Flip-flop — flip-flop hoàn chỉnh nhất

💡 **Động lực**: D flip-flop giải quyết trạng thái cấm nhưng bỏ đi chức năng Set/Reset riêng biệt và Toggle (đảo). JK flip-flop mở rộng SR latch để có đủ 4 chế độ: Hold, Set, Reset, Toggle — **không có trạng thái cấm**.

**Bảng chân trị JK flip-flop (positive edge-triggered):**

| CLK | J | K | Q (kế tiếp) | Chế độ |
|-----|---|---|-------------|--------|
| ↑ | 0 | 0 | Q (không đổi) | Hold |
| ↑ | 1 | 0 | 1 | Set |
| ↑ | 0 | 1 | 0 | Reset |
| ↑ | 1 | 1 | Q' (đảo) | Toggle |

**So sánh với SR latch**: J≡S, K≡R, nhưng J=K=1 không bị cấm mà trở thành Toggle — đây là điểm khác biệt then chốt.

**Walk-through JK flip-flop** (Q ban đầu = 0):

| Cạnh | J | K | Q trước | Q sau | Chế độ |
|------|---|---|---------|-------|--------|
| 1 | 1 | 0 | 0 | 1 | Set |
| 2 | 0 | 0 | 1 | 1 | Hold |
| 3 | 1 | 1 | 1 | 0 | Toggle (1→0) |
| 4 | 1 | 1 | 0 | 1 | Toggle (0→1) |
| 5 | 0 | 1 | 1 | 0 | Reset |
| 6 | 0 | 0 | 0 | 0 | Hold |

❓ **Câu hỏi tự nhiên**: *"Vì sao J=K=1 không cấm như SR?"* — Vì JK flip-flop được thiết kế (bên trong dùng D flip-flop master-slave hoặc mạch riêng) để khi J=K=1, Q đảo ngược — đây là hành vi **được định nghĩa rõ ràng**, không phải "không xác định".

### 5.2. T Flip-flop — chia đôi tần số clock

**T flip-flop** (T = Toggle) là trường hợp đặc biệt của JK khi J=K luôn bằng nhau:

| CLK | T | Q (kế tiếp) | Chế độ |
|-----|---|-------------|--------|
| ↑ | 0 | Q (không đổi) | Hold |
| ↑ | 1 | Q' (đảo) | Toggle |

Cách dùng đơn giản nhất: **cố định T=1**. Khi đó, mỗi cạnh clock, Q đảo.

\`\`\`
CLK: _|‾|_|‾|_|‾|_|‾|_|‾|_|‾|_|‾|_|‾|_   (8 cạnh lên)
Q:   __|‾‾‾‾|______|‾‾‾‾|______|‾‾‾‾|____   (4 chu kỳ → ½ tần số)
\`\`\`

**Ứng dụng chia tần**: Với T=1 cố định, ngõ ra Q có tần số **bằng một nửa** tần số clock. Lý do: Q chỉ thay đổi sau mỗi 2 cạnh clock — một chu kỳ của Q cần 2 chu kỳ clock.

**Ví dụ số cụ thể:**
- Clock 8 MHz vào T flip-flop (T=1) → Q ra **4 MHz**.
- Clock 4 MHz → Q ra **2 MHz**.
- Ghép nối tiếp 3 T flip-flop (T=1 hết): 8 MHz → 4 → 2 → **1 MHz**.
- Ghép nối tiếp 4 T flip-flop → bộ đếm 0–15 (4 bit, sẽ học kỹ ở [Lesson 04](../lesson-04-registers-counters/)).

💡 **Đây là nền tảng của bộ đếm nhị phân**: mỗi bit trong bộ đếm là một T flip-flop, bit sau có tần số bằng nửa bit trước.

⚠ **Lỗi thường gặp**: Nhiều người nhầm "T=1 → Q=1". Không phải — T=1 nghĩa là Toggle (đảo). Nếu Q đang là 0 thì sau cạnh clock Q=1; nếu Q đang là 1 thì Q=0.

🔁 **Dừng lại tự kiểm tra**

T flip-flop, T=1 cố định, Q ban đầu = 0. Sau 5 cạnh lên clock, Q bằng bao nhiêu? Vẽ dạng sóng Q.

<details>
<summary>Đáp án</summary>

- Cạnh 1: Q=0 → 1
- Cạnh 2: Q=1 → 0
- Cạnh 3: Q=0 → 1
- Cạnh 4: Q=1 → 0
- Cạnh 5: Q=0 → **1**

**Q=1** sau 5 cạnh. Dạng sóng Q đảo sau mỗi cạnh clock.

</details>

📝 **Tóm tắt mục 5**

- JK: 4 chế độ Hold/Set/Reset/Toggle. J=K=1 → Toggle (không cấm).
- T: chuyên Toggle. T=1 cố định → chia đôi tần số clock.
- T flip-flop ghép nối tiếp → nền tảng của bộ đếm nhị phân.
- Sẽ xây bộ đếm hoàn chỉnh ở [Lesson 04](../lesson-04-registers-counters/).

---

## 6. Setup time, Hold time và Metastability

### 6.1. Setup time và Hold time

Flip-flop kích cạnh không lấy mẫu D vào đúng tại cạnh clock một cách hoàn hảo — bên trong vẫn có trễ vật lý. Vì vậy có hai ràng buộc thời gian:

**Setup time (t_su)**: D phải **ổn định ít nhất t_su trước cạnh clock**.
- Lý do: mạch bên trong flip-flop cần một khoảng thời gian để "đọc" D trước khi clock kích.
- Vi phạm: D thay đổi quá gần cạnh clock → flip-flop đọc sai.

**Hold time (t_h)**: D phải **ổn định ít nhất t_h sau cạnh clock**.
- Lý do: khoảnh khắc ngay sau cạnh clock, mạch bên trong vẫn đang "xử lý" D.
- Vi phạm: D thay đổi ngay sau cạnh clock → trạng thái lưu không đáng tin.

\`\`\`
         t_su     t_h
          ←──┐  ┌──→
CLK: ________|‾‾‾‾‾‾‾‾|______
D:   ════════|════════|═════   ← D phải không đổi trong vùng gạch đôi
\`\`\`

**Giá trị điển hình** cho CMOS hiện đại: t_su ~ 0.1–1 ns, t_h ~ 0.05–0.5 ns. Nhỏ nhưng không thể bỏ qua khi thiết kế mạch tốc độ cao.

### 6.2. Metastability — trạng thái không xác định

💡 **Hình dung**: Đặt một cây bút thẳng đứng trên đầu ngón tay — lý thuyết là cân bằng, nhưng thực tế không thể giữ mãi, cây bút sẽ ngã về một phía sau một thời gian. Đây là **metastability**: hệ ở trạng thái không ổn định, sẽ giải quyết về 0 hoặc 1 sau một khoảng thời gian không xác định.

**Khi nào xảy ra**: D thay đổi vi phạm setup hoặc hold time → flip-flop rơi vào trạng thái trung gian (không phải 0, không phải 1 rõ ràng) trong một khoảng thời gian ngẫu nhiên trước khi "tự giải quyết".

**Hậu quả**: Mạch đọc tín hiệu này trong lúc metastable → có thể đọc được 0 ở chỗ này và 1 ở chỗ khác → **toàn mạch sai**. Đây là lỗi nghiêm trọng và khó tái hiện (ngẫu nhiên).

**Khi nào hay gặp**: Khi tín hiệu từ miền clock khác (asynchronous) đi vào flip-flop synchronous — không có đảm bảo nào về setup/hold time. Giải pháp: dùng **synchronizer** (2 flip-flop nối tiếp) để giảm xác suất metastability xuống mức chấp nhận được.

❓ **Câu hỏi tự nhiên**: *"Metastability có xảy ra trong thực tế không?"* — Có, và là nguồn gốc của nhiều lỗi bí ẩn trong hệ thống nhúng (embedded system) khi nhận tín hiệu từ nút bấm, UART, hay cảm biến bên ngoài (các tín hiệu không đồng bộ với clock hệ thống).

📝 **Tóm tắt mục 6**

- Setup time: D phải ổn định TRƯỚC cạnh clock ít nhất t_su.
- Hold time: D phải ổn định SAU cạnh clock ít nhất t_h.
- Vi phạm → metastability: trạng thái không xác định thoáng qua, có thể gây lỗi hệ thống.
- Phòng tránh: đảm bảo timing constraints trong thiết kế; dùng synchronizer cho tín hiệu không đồng bộ.

---

## 7. Bài tập

**Bài 1**: SR NOR latch đang ở Q=1. Lần lượt áp: S=0,R=1 → S=0,R=0 → S=1,R=0 → S=0,R=0. Vẽ bảng trạng thái Q sau mỗi bước.

**Bài 2**: Cho SR NAND latch (ngõ vào active-low). Trình bày tại sao S_bar=R_bar=0 là trạng thái cấm. Điều gì xảy ra khi cả hai đồng thời chuyển từ 0 về 1?

**Bài 3**: D flip-flop positive edge, Q ban đầu = 0. Clock có 6 cạnh lên. D tại mỗi cạnh lần lượt là: 1, 1, 0, 1, 0, 0. Vẽ giản đồ thời gian cho CLK, D, và Q.

**Bài 4**: JK flip-flop, Q ban đầu = 0. Clock có 5 cạnh lên. Bộ (J,K) tại mỗi cạnh: (1,0), (1,1), (0,0), (0,1), (1,1). Tính Q sau mỗi cạnh.

**Bài 5**: T flip-flop, T=1 cố định, Q ban đầu = 0. Clock vào 1 MHz. Tần số ngõ ra Q là bao nhiêu? Sau 10 cạnh lên, Q=?

**Bài 6**: 3 T flip-flop ghép nối tiếp (ngõ ra Q của FF1 là clock của FF2, Q của FF2 là clock của FF3), T=1 cố định. Clock vào 8 MHz. Tần số ngõ ra của FF3 là bao nhiêu?

**Bài 7** (nâng cao): Giải thích tại sao vi phạm setup time có thể gây lỗi. Cho ví dụ thực tế một tình huống dễ vi phạm setup time.

---

## 8. Lời giải chi tiết

### Bài 1 — SR NOR Latch

Q ban đầu = 1.

**Bước 1: S=0, R=1** → Trạng thái Reset → Q = **0**, Q' = 1.

Xác minh: NOR_trên = NOR(S=0, Q'=1) = 0 ✓; NOR_dưới = NOR(Q=0, R=1) = 0 ✓. Chờ — điều này vi phạm định nghĩa Q'=NOR(Q,R). Sửa: NOR_dưới = NOR(0,1) = 0 = Q'. Và NOR_trên = NOR(0,0) = 1 = Q.

Vậy: S=0, R=1 → Q=0, Q'=1 (Reset).

**Bước 2: S=0, R=0** → Hold → Q = **0** (giữ nguyên từ bước 1).

**Bước 3: S=1, R=0** → Set → Q = **1**, Q' = 0.

**Bước 4: S=0, R=0** → Hold → Q = **1** (giữ nguyên từ bước 3).

| Bước | S | R | Q |
|------|---|---|---|
| ban đầu | — | — | 1 |
| 1 | 0 | 1 | 0 |
| 2 | 0 | 0 | 0 |
| 3 | 1 | 0 | 1 |
| 4 | 0 | 0 | 1 |

### Bài 2 — SR NAND Latch, trạng thái cấm

Khi S_bar=R_bar=0 đang hoạt động:
- Cổng NAND trên: NAND(S_bar=0, Q') = NAND(0, bất kỳ) = **1** → Q = 1.
- Cổng NAND dưới: NAND(Q, R_bar=0) = NAND(bất kỳ, 0) = **1** → Q' = 1.
- Kết quả: Q = Q' = 1 — vi phạm tính bổ sung (Q và Q' phải ngược nhau).

**Khi cả hai chuyển từ 0 → 1 đồng thời** (S_bar=R_bar=0→1):
- Cả hai cổng NAND đang có ngõ ra = 1.
- Khi S_bar và R_bar cùng về 1: Q = NAND(1, Q') và Q' = NAND(Q, 1).
- Nếu Q=Q'=1: Q = NAND(1,1) = 0, Q' = NAND(1,1) = 0. Mâu thuẫn.
- Trạng thái cuối phụ thuộc **trễ lan truyền** của từng cổng — không thể dự đoán → không xác định.

### Bài 3 — D flip-flop, giản đồ thời gian

Q ban đầu = 0. D tại các cạnh: 1, 1, 0, 1, 0, 0.

\`\`\`
CLK: _|‾|_|‾|_|‾|_|‾|_|‾|_|‾|_
      ↑   ↑   ↑   ↑   ↑   ↑

D:   _|‾‾‾‾‾‾‾‾‾|___|‾‾‾|_______

Q:   ___|‾‾‾‾‾‾‾|___|‾‾‾|_______
\`\`\`

| Cạnh | D | Q mới |
|------|---|-------|
| 1 | 1 | 1 |
| 2 | 1 | 1 |
| 3 | 0 | 0 |
| 4 | 1 | 1 |
| 5 | 0 | 0 |
| 6 | 0 | 0 |

Q ban đầu = 0; sau cạnh 1 → Q=1; sau cạnh 3 → Q=0; sau cạnh 4 → Q=1; sau cạnh 5 → Q=0.

### Bài 4 — JK flip-flop

Q ban đầu = 0.

| Cạnh | J | K | Q trước | Chế độ | Q sau |
|------|---|---|---------|--------|-------|
| 1 | 1 | 0 | 0 | Set | **1** |
| 2 | 1 | 1 | 1 | Toggle | **0** |
| 3 | 0 | 0 | 0 | Hold | **0** |
| 4 | 0 | 1 | 0 | Reset | **0** |
| 5 | 1 | 1 | 0 | Toggle | **1** |

### Bài 5 — T flip-flop, chia tần

- T=1 cố định, Q ban đầu = 0.
- Tần số ngõ ra = f_clk / 2 = 1 MHz / 2 = **500 kHz**.

Sau 10 cạnh lên:
- Cạnh lẻ (1,3,5,7,9): Q=1.
- Cạnh chẵn (2,4,6,8,10): Q=0.
- Sau cạnh 10: **Q = 0**.

### Bài 6 — 3 T flip-flop ghép nối tiếp

| Flip-flop | Clock vào | Tần số ra |
|-----------|-----------|-----------|
| FF1 | 8 MHz | 4 MHz |
| FF2 | 4 MHz (Q của FF1) | 2 MHz |
| FF3 | 2 MHz (Q của FF2) | **1 MHz** |

Tần số ngõ ra FF3 = 8 MHz / 2³ = 8 / 8 = **1 MHz**.

Đây là nguyên lý của **bộ đếm nhị phân 3 bit**: FF1 là bit 0 (LSB, 4 MHz), FF2 là bit 1 (2 MHz), FF3 là bit 2 (MSB, 1 MHz). Sẽ xây bộ đếm hoàn chỉnh ở [Lesson 04](../lesson-04-registers-counters/).

### Bài 7 — Setup time và lỗi thực tế

**Tại sao vi phạm setup time gây lỗi:**
Flip-flop bên trong dùng D latch master-slave. Khi clock sắp kích, cổng "slave" bắt đầu "nghe" giá trị từ "master". Nếu D thay đổi trong khoảng t_su trước cạnh clock, master đang ở giữa quá trình chuyển — tín hiệu vào slave không ổn định → Q có thể lấy giá trị sai hoặc rơi vào metastability.

**Ví dụ thực tế — nút bấm (button) vào hệ thống:**

Khi người dùng nhấn nút, tín hiệu không đồng bộ với clock hệ thống. Tín hiệu nút bấm có thể thay đổi ngay trước cạnh clock (vi phạm setup time). Hậu quả: một số flip-flop trong mạch đọc được "nhấn", một số đọc được "chưa nhấn" trong cùng một chu kỳ → hành vi sai. Giải pháp chuẩn: dùng bộ đồng bộ hoá (synchronizer) 2 tầng flip-flop trước khi đưa tín hiệu nút vào logic chính.

---

## 9. Liên kết và bài tiếp theo

- **Bài trước**: [Lesson 02 — Mạch tổ hợp](../lesson-02-combinational/) — cổng logic và mạch không có bộ nhớ.
- **Bài tiếp theo**: [Lesson 04 — Thanh ghi & Bộ đếm](../lesson-04-registers-counters/) — xây bộ đếm nhị phân và thanh ghi dịch từ các flip-flop đã học.
- **Minh họa tương tác**: [visualization.html](./visualization.html) — mô phỏng SR/D/JK/T flip-flop, giản đồ thời gian, chia tần T flip-flop.

---

## 📝 Tổng kết Lesson 03

1. **Mạch tuần tự**: Q = f(ngõ vào hiện tại, trạng thái) — có nhớ, khác mạch tổ hợp.
2. **SR latch**: cơ chế chốt 1 bit qua hồi tiếp. NOR (active-high) hoặc NAND (active-low). Tránh trạng thái cấm.
3. **Clock**: đồng bộ hoá toàn mạch. Edge-triggered (cạnh lên/xuống) là chuẩn hiện đại.
4. **D flip-flop**: tại cạnh clock → Q = D. Là khối nhớ 1 bit cơ bản nhất.
5. **JK flip-flop**: Hold/Set/Reset/Toggle. J=K=1 → Toggle (không cấm).
6. **T flip-flop**: T=1 → chia đôi tần số. Ghép nối tiếp → bộ đếm nhị phân.
7. **Setup/Hold time**: ràng buộc thời gian bắt buộc. Vi phạm → metastability → lỗi hệ thống.
`;
