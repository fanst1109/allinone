# Lesson 05 — Cuộn cảm & Mạch RL

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Hiểu cuộn cảm (inductor) là gì về mặt vật lý: cuộn dây tạo từ trường, "quán tính của dòng điện".
- Nắm vững định luật cảm ứng: $V_L = L \cdot \dfrac{dI}{dt}$.
- Tính năng lượng tích lũy trong cuộn cảm: $E = \frac{1}{2} L I^2$.
- Phân tích mạch RL theo thời gian: hằng số thời gian $\tau = L/R$, đường cong $I(t)$ tăng và giảm.
- Hiểu hiện tượng spike điện áp khi ngắt mạch và cách bảo vệ bằng diode flyback.
- Nhận biết các ứng dụng thực tế: relay, biến áp, bộ lọc, động cơ.

## Kiến thức tiền đề

- [Lesson 04 — Tụ điện & Mạch RC](../lesson-04-capacitor-rc/) — hằng số thời gian $\tau = RC$, đường cong tụ nạp/xả là nền tảng để so sánh.
- [Vật lý — Cảm ứng điện từ](../../../Physics/02-Thermo-Electromagnetism/lesson-07-magnetism-induction/) — định luật Faraday, từ trường cuộn dây, quy tắc Lenz.

---

## 1. Cuộn cảm là gì?

### 1.1. Cấu tạo và nguyên lý vật lý

**Cuộn cảm (inductor)** là cuộn dây dẫn điện, thường quấn quanh lõi (lõi không khí, lõi ferrite, lõi thép silicon). Khi dòng điện chạy qua, nó tạo ra **từ trường xung quanh cuộn dây**.

Ký hiệu: **$L$**, đơn vị: **Henry (H)**. Thực tế hay gặp mH (milli-Henry) và µH (micro-Henry):
- 1 mH = 0.001 H
- 1 µH = 0.000001 H

Giá trị điển hình: cuộn lọc nguồn 47 µH–10 mH; cuộn relay 10–100 mH; biến áp nguồn vài H.

💡 **Trực giác — Analogy quán tính khối lượng:**

Tưởng tượng dòng điện như nước chảy trong ống. Điện trở là ống hẹp (cản nước). **Cuộn cảm là bánh đà (flywheel) gắn vào đường ống** — khi nước đang chảy yên, bánh đà quay đều. Nếu bạn cố tăng lưu lượng đột ngột, bánh đà **cưỡng lại** vì nó có quán tính. Nếu bạn cắt nguồn đột ngột, bánh đà vẫn tiếp tục quay và đẩy nước đi tiếp dù nguồn đã tắt.

Đây là lý do:
- **Dòng qua cuộn cảm không thể thay đổi tức thời** — giống như vận tốc một vật nặng không thể thay đổi ngay lập tức.
- **Nếu buộc phải thay đổi nhanh** → cuộn cảm sinh điện áp rất lớn để "chống lại" (định luật Lenz).

So sánh với tụ điện:

| Đại lượng | Tụ điện (capacitor) | Cuộn cảm (inductor) |
|-----------|---------------------|---------------------|
| Giữ ổn định | Điện áp | Dòng điện |
| Phần tử đối ngẫu | $V \leftrightarrow I$ | $I \leftrightarrow V$ |
| Năng lượng lưu trữ | $E = \frac{1}{2} C V^2$ | $E = \frac{1}{2} L I^2$ |
| Không thay đổi tức thời | $V$ không đổi ngay | $I$ không đổi ngay |
| Analogy | Bình chứa nước (giữ áp) | Bánh đà (giữ lưu lượng) |

### 1.2. Độ tự cảm L — định nghĩa đầy đủ

**(a) Là gì:** $L$ đo khả năng cuộn dây "tích trữ" năng lượng từ trường. Giá trị $L$ lớn → từ trường mạnh hơn với cùng lượng dòng → cuộn dây "cưỡng lại" thay đổi dòng mạnh hơn.

**(b) Vì sao cần:** Nếu chỉ biết dòng đang chạy, ta không biết cuộn cảm sẽ phản ứng "mạnh hay nhẹ" khi bị thay đổi. $L$ là tham số vật lý đặc trưng cho mức độ "ì" của cuộn dây — giống như khối lượng $m$ đặc trưng cho mức độ "ì" của vật thể.

**(c) Ví dụ số:** Cuộn dây có $L = 10$ mH. Khi dòng thay đổi 1 A trong 1 ms:
- $\dfrac{dI}{dt} = \dfrac{1 \text{ A}}{0.001 \text{ s}} = 1000$ A/s
- $V_L = L \cdot \dfrac{dI}{dt} = 0.01 \text{ H} \times 1000 \text{ A/s} =$ **10 V**

❓ **Câu hỏi tự nhiên của người đọc:**

**"L phụ thuộc vào gì?"** — Số vòng dây $N$, diện tích tiết diện lõi $A$, chiều dài cuộn $l$, và độ từ thẩm (permeability) của lõi $\mu$. Công thức gần đúng: $L \approx \dfrac{\mu N^2 A}{l}$. Lõi ferrite có $\mu$ cao hơn không khí ~1000 lần → cùng kích thước cuộn, lõi ferrite cho $L$ lớn hơn rất nhiều.

**"Tại sao thực tế dùng mH, µH chứ không phải H?"** — Vì 1 H rất lớn trong điện tử (cần cuộn dây khổng lồ). Biến áp nguồn 220 V dùng vài H, còn mạch RF, mạch lọc tần cao chỉ cần µH.

📝 **Tóm tắt mục 1**

- Cuộn cảm = cuộn dây tạo từ trường khi có dòng.
- Đặc tính cốt lõi: **cưỡng lại thay đổi dòng điện** (analogy: quán tính / bánh đà).
- Đơn vị: Henry (H). Thực tế: mH, µH.
- Tụ điện giữ điện áp; cuộn cảm giữ dòng điện — hai phần tử đối ngẫu.

---

## 2. Định luật cảm ứng: V_L = L·(dI/dt)

### 2.1. Phát biểu và ý nghĩa vật lý

Khi dòng điện qua cuộn cảm **thay đổi**, nó tạo ra điện áp:

$$V_L = L \cdot \frac{dI}{dt}$$

Trong đó:
- **$V_L$** = điện áp xuất hiện trên cuộn cảm (V).
- **$L$** = độ tự cảm (H).
- **$\dfrac{dI}{dt}$** = tốc độ thay đổi dòng điện (A/s).

**Ý nghĩa định luật Lenz:** chiều của $V_L$ luôn ngược với chiều thay đổi — nếu dòng đang tăng, $V_L$ sinh ra để cản lại dòng tăng. Nếu dòng đang giảm, $V_L$ sinh ra để duy trì dòng.

💡 **Trực giác:** Đây là "quán tính điện từ". $V_L$ không phụ thuộc vào giá trị $I$ mà phụ thuộc vào **tốc độ thay đổi** $\dfrac{dI}{dt}$. Dòng 5 A đứng yên → $V_L = 0$. Dòng 0.1 A nhưng thay đổi cực nhanh → $V_L$ có thể rất lớn.

### 2.2. Bốn ví dụ số cụ thể

**Ví dụ 1 — Dòng tăng chậm:**
- $L = 100$ mH $= 0.1$ H; $\dfrac{dI}{dt} = 2$ A/s (tăng 2 A mỗi giây).
- $V_L = 0.1 \times 2 =$ **0.2 V** — nhỏ, an toàn.

**Ví dụ 2 — Dòng tăng nhanh:**
- $L = 100$ mH $= 0.1$ H; $\dfrac{dI}{dt} = 1000$ A/s (tăng 1 A trong 1 ms).
- $V_L = 0.1 \times 1000 =$ **100 V** — cần chú ý trong mạch.

**Ví dụ 3 — Cuộn cảm nhỏ, dòng thay đổi rất nhanh (mạch switching):**
- $L = 10$ µH $= 10 \times 10^{-6}$ H; $\dfrac{dI}{dt} = 5 \times 10^6$ A/s (thay đổi 5 A trong 1 µs).
- $V_L = 10 \times 10^{-6} \times 5 \times 10^6 =$ **50 V** — điện áp spike trong mạch SMPS.

**Ví dụ 4 — Relay cuộn điện từ bị ngắt đột ngột:**
- $L = 50$ mH; dòng ban đầu $I_0 = 0.2$ A, ngắt trong $\Delta t \approx 10$ µs.
- $\dfrac{dI}{dt} \approx \dfrac{0.2}{10 \times 10^{-6}} = 20{,}000$ A/s.
- $V_L = 0.05 \times 20{,}000 =$ **1,000 V** (1 kV spike!) — đây là nguyên nhân hỏng transistor nếu không bảo vệ.

⚠ **Lỗi thường gặp — Nhầm V_L với điện áp nguồn:**

$V_L$ không phải điện áp nguồn cấp cho cuộn cảm; đó là điện áp cuộn cảm **tự sinh ra** để chống lại thay đổi dòng. Trong mạch RL mắc nối tiếp nguồn $V_s$, tổng điện áp: $V_s = V_R + V_L = I R + L \dfrac{dI}{dt}$. Khi dòng ổn định ($\frac{dI}{dt} = 0$): $V_L = 0$, toàn bộ điện áp rơi trên $R$.

🔁 **Dừng lại tự kiểm tra:**

Câu hỏi: Cuộn cảm $L = 5$ mH có dòng tăng từ 0 lên 3 A trong 15 ms. Tính $V_L$.

<details>
<summary>Đáp án</summary>

$\dfrac{dI}{dt} = \dfrac{3 - 0}{15 \times 10^{-3}} = 200$ A/s.

$V_L = L \cdot \dfrac{dI}{dt} = 5 \times 10^{-3} \times 200 =$ **1 V**.

</details>

📝 **Tóm tắt mục 2**

- $V_L = L \cdot \dfrac{dI}{dt}$: điện áp tỉ lệ với **tốc độ** thay đổi dòng, không phải giá trị dòng.
- Dòng ổn định → $V_L = 0$ (cuộn cảm ứng xử như dây dẫn ở DC).
- Thay đổi dòng càng nhanh → $V_L$ càng lớn → nguy cơ spike khi ngắt đột ngột.

---

## 3. Năng lượng tích lũy trong cuộn cảm

### 3.1. Công thức và ý nghĩa

Cuộn cảm mang dòng $I$ tích lũy năng lượng trong từ trường:

$$E = \frac{1}{2} \cdot L \cdot I^2$$

Đơn vị: Joule (J).

**(a) Là gì:** $E$ là năng lượng "giam" trong từ trường bên trong và xung quanh cuộn dây. Khi dòng bị ngắt, năng lượng này cần đi đâu đó — nếu không có đường thoát, nó tạo ra spike điện áp cực lớn.

**(b) Vì sao cần:** Hiểu lượng năng lượng tích lũy giúp thiết kế mạch bảo vệ đúng cách, tính toán tổn thất trong mạch switching, và lựa chọn cuộn cảm phù hợp.

**(c) Ví dụ số:** $L = 10$ mH, $I = 1$ A → $E = \frac{1}{2} \times 0.01 \times 1^2 =$ **5 mJ**.

### 3.2. Bốn ví dụ số

**Ví dụ 1 — Cuộn nhỏ, dòng nhỏ:**
- $L = 100$ µH, $I = 0.5$ A.
- $E = \frac{1}{2} \times 100 \times 10^{-6} \times 0.25 =$ **12.5 µJ** — rất nhỏ, ít nguy hiểm.

**Ví dụ 2 — Relay điển hình:**
- $L = 50$ mH, $I = 0.2$ A.
- $E = \frac{1}{2} \times 0.05 \times 0.04 =$ **1 mJ** — nếu xả vào transistor nhỏ trong µs, tạo spike cực lớn.

**Ví dụ 3 — Cuộn cảm bộ nguồn switching:**
- $L = 100$ µH, $I = 5$ A (điển hình ở 10 A output, đập sóng 50%).
- $E = \frac{1}{2} \times 100 \times 10^{-6} \times 25 =$ **1.25 mJ** — xả/nạp mỗi chu kỳ switching.

**Ví dụ 4 — Cuộn kích từ động cơ lớn:**
- $L = 2$ H, $I = 10$ A.
- $E = \frac{1}{2} \times 2 \times 100 =$ **100 J** — năng lượng rất lớn, spike khi ngắt có thể gây hồ quang điện.

### 3.3. So sánh trực giác với tụ điện

| Đặc điểm | Tụ điện | Cuộn cảm |
|----------|---------|----------|
| Công thức năng lượng | $E = \frac{1}{2} C V^2$ | $E = \frac{1}{2} L I^2$ |
| Giữ ổn định | Điện áp $V$ | Dòng điện $I$ |
| Khi bị cắt đột ngột | $V$ nhảy vọt (overcurrent) | $I$ nhảy vọt → spike $V$ |
| Analogy năng lượng | Lò xo nén (thế năng) | Bánh đà quay (động năng) |
| Thời gian xả | $\tau = RC$ | $\tau = L/R$ |

Công thức $\frac{1}{2} C V^2$ và $\frac{1}{2} L I^2$ hoàn toàn đối xứng toán học — đây là biểu hiện của tính đối ngẫu (duality) giữa tụ và cuộn trong điện tử.

📝 **Tóm tắt mục 3**

- $E = \frac{1}{2} L I^2$: tích lũy trong từ trường, tỉ lệ với $L$ và $I^2$.
- Khi ngắt mạch, năng lượng này cần đường thoát — không có đường thoát → spike điện áp.
- Đối xứng hoàn toàn với tụ điện: $E = \frac{1}{2} C V^2$.

---

## 4. Mạch RL — Phân tích theo thời gian

### 4.1. Mạch RL nạp (Đóng công tắc)

Mạch: nguồn $V_s$, điện trở $R$ và cuộn cảm $L$ mắc nối tiếp. Tại $t = 0$ đóng công tắc (trước đó $I = 0$).

Phương trình vi phân:
$$V_s = I R + L \frac{dI}{dt}$$

Giải phương trình (nghiệm đặc thù + nghiệm thuần nhất):
$$I(t) = \frac{V_s}{R} \left( 1 - e^{-t/\tau} \right) \qquad \text{(mạch nạp)}$$

Trong đó:
- **$\tau = L/R$** là **hằng số thời gian** (đơn vị giây).
- **$V_s/R$** là dòng ổn định cuối cùng (khi $t \to \infty$).

Mốc quan trọng:
| Thời điểm | $I/I_{\max}$ | Ghi chú |
|-----------|---------|---------|
| $t = 0$ | 0% | Dòng = 0, tất cả điện áp rơi trên $L$ |
| $t = \tau$ | 63.2% | Mốc đặc trưng |
| $t = 2\tau$ | 86.5% | |
| $t = 3\tau$ | 95.0% | Gần ổn định |
| $t = 5\tau$ | 99.3% | Thực tế coi là ổn định |

💡 **Trực giác:** Giống tụ điện nạp điện — nhưng ở đây là **dòng** tăng dần (không phải điện áp). Ban đầu cuộn cảm "cản" toàn bộ, $V_L = V_s$, $I = 0$. Dần dần dòng tăng, $V_L$ giảm, đến lúc dòng ổn định $V_L = 0$.

### 4.2. Walk-through số — ví dụ đầy đủ

**Cho:** L = 10 mH, R = 100 Ω, $V_s = 12$ V. Đóng công tắc tại $t = 0$.

**Tính τ:**
$$\tau = \frac{L}{R} = \frac{10 \times 10^{-3}}{100} = 0.1 \text{ ms} = 100 \text{ µs}$$

**Dòng ổn định:**
$$I_{\max} = \frac{V_s}{R} = \frac{12}{100} = 0.12 \text{ A} = 120 \text{ mA}$$

**Dòng tại các mốc:**

| t | $I(t) = 120 \text{ mA} \cdot (1 - e^{-t/0.1\text{ms}})$ |
|---|-------------------------------------|
| 0 µs | 0 mA |
| 100 µs (1τ) | $120 \times 0.632 =$ **75.8 mA** |
| 200 µs (2τ) | $120 \times 0.865 =$ **103.8 mA** |
| 300 µs (3τ) | $120 \times 0.950 =$ **114 mA** |
| 500 µs (5τ) | $120 \times 0.993 =$ **119.2 mA** |

**Điện áp trên cuộn cảm:**
$$V_L(t) = V_s \, e^{-t/\tau} = 12 \, e^{-t/0.1\text{ms}}$$

Tại $t = 0$: $V_L = 12$ V (toàn bộ điện áp nguồn).
Tại $t = \tau$: $V_L = 12 \times e^{-1} \approx 4.41$ V.
Tại $t = 5\tau$: $V_L \approx 0.08$ V (gần bằng 0).

### 4.3. Mạch RL xả (Ngắt công tắc, thay bằng đường tắt)

Khi ngắt nguồn và nối tắt (ví dụ qua diode), dòng ban đầu $I_0$ giảm dần:

$$I(t) = I_0 \, e^{-t/\tau} \qquad \text{(mạch xả)}$$

Cùng hằng số $\tau = L/R$ — mạch RL xả đối xứng với nạp.

**Walk-through xả (tiếp ví dụ trên):**

Giả sử đang ở $t = 5\tau$ ($I_0 \approx 120$ mA), ngắt nguồn, dòng xả qua $R$:

| t sau ngắt | $I(t) = 120 \text{ mA} \cdot e^{-t/0.1\text{ms}}$ |
|------------|-------------------------------|
| 0 (ngay sau ngắt) | 120 mA |
| 100 µs (1τ) | $120 \times 0.368 =$ **44.2 mA** |
| 200 µs (2τ) | $120 \times 0.135 =$ **16.2 mA** |
| 300 µs (3τ) | $120 \times 0.050 =$ **6 mA** |
| 500 µs (5τ) | $120 \times 0.007 =$ **0.84 mA** |

❓ **Câu hỏi tự nhiên của người đọc:**

**"τ = L/R — tại sao R lớn hơn làm τ nhỏ hơn?"** — $R$ lớn → cản dòng nhiều hơn → dòng tăng/giảm nhanh hơn → hệ thống phản ứng nhanh hơn. Giảm $R$ → $\tau$ lớn → phản ứng chậm hơn. Ngược với RC: $\tau = RC$ tăng khi $R$ tăng (vì $R$ hạn chế tốc độ nạp tụ).

**"Đơn vị của τ = L/R là gì?"** — $L$ đơn vị H $=$ V·s/A; $R$ đơn vị Ω $=$ V/A. Vậy $\dfrac{L}{R} = \dfrac{\text{V·s/A}}{\text{V/A}} = \text{s}$. Đúng là giây.

🔁 **Dừng lại tự kiểm tra:**

Cho mạch RL với L = 5 mH, R = 50 Ω, $V_s = 5$ V. Tính $\tau$, $I_{\max}$, và dòng tại $t = 2\tau$.

<details>
<summary>Đáp án</summary>

$\tau = \dfrac{L}{R} = \dfrac{5 \times 10^{-3}}{50} =$ **0.1 ms**.

$I_{\max} = \dfrac{V_s}{R} = \dfrac{5}{50} =$ **0.1 A = 100 mA**.

Tại $t = 2\tau$: $I = 100 \text{ mA} \times (1 - e^{-2}) = 100 \times (1 - 0.135) = 100 \times 0.865 =$ **86.5 mA**.

</details>

📝 **Tóm tắt mục 4**

- Mạch RL nạp: $I(t) = \dfrac{V_s}{R}(1 - e^{-t/\tau})$; xả: $I(t) = I_0 \, e^{-t/\tau}$.
- Hằng số thời gian **$\tau = L/R$** (giây).
- Mốc: 1τ = 63.2%, 3τ ≈ 95%, 5τ ≈ 99.3%.
- Dòng ổn định: $I_{\max} = V_s/R$ (cuộn cảm như dây dẫn ở DC).

---

## 5. Hiện tượng spike điện áp khi ngắt mạch

### 5.1. Cơ chế vật lý

Khi công tắc ngắt đột ngột (không có đường thoát cho dòng), dòng qua cuộn cảm bị ép về 0 rất nhanh. Theo $V_L = L \cdot \dfrac{dI}{dt}$:

$$\Delta t \to 0 \implies \frac{dI}{dt} \to \infty \implies V_L \to \infty$$

Trong thực tế, công tắc cơ khí tạo tia lửa (hồ quang), transistor có thể bị đánh thủng lớp oxide cách điện, hoặc điện áp spike làm hỏng các linh kiện lân cận trên mạch.

⚠ **Lỗi nguy hiểm thường gặp:**

Nhiều người mới học thấy mạch relay hoạt động tốt lâu dài, sau đó transistor điều khiển chết đột ngột không rõ lý do. Nguyên nhân thường là: không dùng diode flyback bảo vệ → mỗi lần ngắt relay tạo spike ngược ≥100 V vào cực C-E transistor → transistor chịu đựng nhiều lần rồi suy giảm dần và chết.

### 5.2. Ví dụ số — Spike nguy hiểm

**Relay:** L = 50 mH, $I = 0.1$ A. Transistor ngắt trong $\Delta t = 5$ µs:
$$\begin{aligned}
\frac{dI}{dt} &= \frac{0.1}{5 \times 10^{-6}} = 20{,}000 \text{ A/s} \\
V_{\text{spike}} &= L \times \frac{dI}{dt} = 0.05 \times 20{,}000 = 1{,}000 \text{ V}
\end{aligned}$$

Transistor chịu 40 V tối đa → spike 1,000 V → **hỏng ngay lần đầu tiên**.

### 5.3. Bảo vệ bằng diode flyback (freewheeling diode)

**Giải pháp:** Mắc một diode ngược cực song song với cuộn cảm (anode vào cực âm nguồn, cathode vào cực dương). Khi hoạt động bình thường (cuộn cảm đang được cấp điện), diode bị phân cực ngược → không dẫn, không ảnh hưởng mạch.

Khi ngắt công tắc: dòng cuộn cảm không thể dừng ngay → diode phân cực thuận → dòng tiếp tục chạy vòng qua diode và $R$, giảm dần theo $I(t) = I_0 \, e^{-t/\tau}$. Điện áp chỉ lên đến 0.7 V (điện áp thuận diode) thay vì hàng trăm V.

💡 **Diode flyback là "cửa thoát hiểm" cho năng lượng từ trường.** Không có cửa thoát → năng lượng phá vỡ linh kiện yếu nhất. Có diode → năng lượng giải phóng lành mạnh qua cuộn R, biến thành nhiệt từ từ.

**Linh kiện bảo vệ khác:**
- **TVS diode** (Transient Voltage Suppressor): phản ứng nhanh hơn diode thường, kẹp điện áp ở mức cụ thể.
- **MOV** (Metal Oxide Varistor): dùng ở điện áp cao hơn.
- **RC snubber**: tụ C hấp thụ spike, R hạn chế dao động.

> Xem chi tiết mạch bảo vệ và diode ở [Lesson 02 — Tầng 2 (chưa có)].

📝 **Tóm tắt mục 5**

- Ngắt dòng cuộn cảm đột ngột → spike $V_L = L \cdot \dfrac{dI}{dt}$ rất lớn.
- Spike có thể đánh thủng transistor, IC điều khiển, gây hồ quang.
- Bảo vệ bắt buộc: **diode flyback** (freewheeling diode) mắc song song ngược cực với cuộn cảm.

---

## 6. Ứng dụng thực tế của cuộn cảm

### 6.1. Relay điện từ

Relay dùng cuộn cảm tạo từ trường kéo một tiếp điểm cơ khí. Cho phép dòng nhỏ (điều khiển, ví dụ từ vi điều khiển 5 V/20 mA) điều khiển mạch dòng lớn (220 V AC, vài ampe).

**Bắt buộc có diode flyback** khi dùng transistor điều khiển relay (xem mục 5).

### 6.2. Biến áp (Transformer)

Hai cuộn dây quấn quanh lõi chung — năng lượng truyền qua từ trường lõi. Biến áp hoạt động ở AC; ở DC dòng ổn định, không có thay đổi từ trường → không truyền năng lượng.

Tỉ số điện áp = tỉ số số vòng: $\dfrac{V_1}{V_2} = \dfrac{N_1}{N_2}$.

### 6.3. Cuộn lọc trong bộ nguồn

Mạch LC lọc sóng hài (ripple) từ mạch chỉnh lưu hoặc bộ nguồn switching. Cuộn cảm "làm phẳng" dòng điện (chống thay đổi đột ngột); tụ điện "làm phẳng" điện áp. Cả hai phối hợp tạo bộ lọc thông thấp LC.

### 6.4. Mạch boost converter (tăng áp)

Cuộn cảm là linh kiện trung tâm trong mạch boost. Khi switch đóng: năng lượng nạp vào L. Khi switch ngắt: L "đẩy" dòng qua diode vào tụ đầu ra — điện áp đầu ra cao hơn điện áp đầu vào. Ứng dụng: sạc pin, LED driver.

### 6.5. Động cơ điện và loa

Cuộn dây trong từ trường stator tạo lực ($F = B I L$). Thay đổi dòng → thay đổi lực → chuyển động cơ học. Loa hoạt động theo nguyên lý tương tự: dòng AC âm thanh → lực dao động màng loa → sóng âm.

---

## 7. Bài tập + Lời giải chi tiết

### Bài tập

**Bài 1:** Cuộn cảm L = 20 mH có dòng tăng từ 0 lên 4 A trong 8 ms. Tính điện áp xuất hiện trên cuộn cảm.

**Bài 2:** Cuộn cảm L = 150 µH mang dòng $I = 3$ A. Tính năng lượng từ trường tích lũy trong cuộn cảm. So sánh với tụ điện C = 470 µF điện áp $V = 12$ V.

**Bài 3:** Mạch RL: L = 50 mH, R = 200 Ω, $V_s = 10$ V. Tính:
(a) Hằng số thời gian $\tau$.
(b) Dòng ổn định $I_{\max}$.
(c) Dòng tại $t = \tau$, $t = 2\tau$, $t = 3\tau$.
(d) Điện áp trên cuộn cảm tại $t = 0$ và $t = \tau$.

**Bài 4:** Relay có L = 80 mH, $I = 0.15$ A. Transistor NPN điều khiển relay bị ngắt trong $\Delta t = 2$ µs. Tính spike điện áp. Transistor có $V_{CE\_\max} = 30$ V — có bị hỏng không?

**Bài 5:** Mạch RL đang hoạt động với L = 10 mH, R = 50 Ω, $V_s = 6$ V. Sau khi dòng đạt ổn định, ngắt nguồn (dòng xả qua R). Tính:
(a) Dòng ban đầu lúc bắt đầu xả.
(b) Hằng số thời gian xả $\tau$.
(c) Dòng sau 3τ.
(d) Năng lượng ban đầu trong cuộn cảm.

**Bài 6 (nâng cao):** Mạch RL có L = 200 µH, R = 40 Ω. Nguồn $V_s = 8$ V được đóng vào lúc $t = 0$.
(a) Sau bao lâu dòng đạt 95% giá trị ổn định?
(b) Tại thời điểm đó, điện áp rơi trên L là bao nhiêu?
(c) Năng lượng tích lũy trong L tại thời điểm đó?

### Lời giải chi tiết

**Bài 1:**

Bước 1: Tính tốc độ thay đổi dòng.
$$\frac{dI}{dt} = \frac{\Delta I}{\Delta t} = \frac{4 - 0}{8 \times 10^{-3}} = 500 \text{ A/s}$$

Bước 2: Áp dụng định luật cảm ứng.
$$V_L = L \cdot \frac{dI}{dt} = 20 \times 10^{-3} \times 500 = 10 \text{ V}$$

**Kết quả: $V_L = 10$ V.** Điện áp này chống lại sự tăng dòng (theo định luật Lenz).

---

**Bài 2:**

Năng lượng cuộn cảm:
$$E_L = \frac{1}{2} L I^2 = \frac{1}{2} \times 150 \times 10^{-6} \times 3^2 = \frac{1}{2} \times 150 \times 10^{-6} \times 9 = 675 \times 10^{-6} \text{ J} = 0.675 \text{ mJ}$$

Năng lượng tụ điện:
$$E_C = \frac{1}{2} C V^2 = \frac{1}{2} \times 470 \times 10^{-6} \times 12^2 = \frac{1}{2} \times 470 \times 10^{-6} \times 144 = 33{,}840 \times 10^{-6} \text{ J} = 33.84 \text{ mJ}$$

**So sánh:** $\dfrac{E_C}{E_L} = \dfrac{33.84}{0.675} \approx 50$ lần lớn hơn. Tụ điện 470 µF/12 V tích lũy năng lượng gấp 50 lần cuộn 150 µH/3 A. Đây là lý do bộ nguồn dùng cả tụ lẫn cuộn nhưng tụ thường có năng lượng dự phòng lớn hơn.

---

**Bài 3:**

**(a) Hằng số thời gian:**
$$\tau = \frac{L}{R} = \frac{50 \times 10^{-3}}{200} = 0.25 \times 10^{-3} \text{ s} = 0.25 \text{ ms}$$

**(b) Dòng ổn định:**
$$I_{\max} = \frac{V_s}{R} = \frac{10}{200} = 0.05 \text{ A} = 50 \text{ mA}$$

**(c) Dòng tại các mốc thời gian:**

Công thức: $I(t) = 50 \text{ mA} \cdot (1 - e^{-t/0.25\text{ms}})$

- $t = \tau = 0.25$ ms: $I = 50 \times (1 - e^{-1}) = 50 \times 0.632 =$ **31.6 mA**
- $t = 2\tau = 0.5$ ms: $I = 50 \times (1 - e^{-2}) = 50 \times 0.865 =$ **43.2 mA**
- $t = 3\tau = 0.75$ ms: $I = 50 \times (1 - e^{-3}) = 50 \times 0.950 =$ **47.5 mA**

**(d) Điện áp trên cuộn cảm:**

Công thức: $V_L(t) = V_s \, e^{-t/\tau} = 10 \, e^{-t/0.25\text{ms}}$

- $t = 0$: $V_L = 10 \, e^0 =$ **10 V** (toàn bộ điện áp nguồn rơi trên $L$ lúc ban đầu)
- $t = \tau = 0.25$ ms: $V_L = 10 \, e^{-1} = 10 \times 0.368 =$ **3.68 V**

Kiểm tra tại $t = \tau$: $V_R = I \times R = 31.6 \times 10^{-3} \times 200 = 6.32$ V. $V_R + V_L = 6.32 + 3.68 = 10$ V $= V_s$ ✓

---

**Bài 4:**

Bước 1: Tính tốc độ thay đổi dòng khi ngắt.
$$\frac{dI}{dt} = \frac{I_0}{\Delta t} = \frac{0.15}{2 \times 10^{-6}} = 75{,}000 \text{ A/s}$$

Bước 2: Tính spike điện áp.
$$V_{\text{spike}} = L \cdot \frac{dI}{dt} = 80 \times 10^{-3} \times 75{,}000 = 6{,}000 \text{ V} = 6 \text{ kV}$$

**Kết luận:** Transistor có $V_{CE\_\max} = 30$ V. Spike 6,000 V $\gg$ 30 V → **transistor bị phá hủy ngay lập tức**.

Giải pháp: mắc diode flyback (1N4007 hoặc tương đương) song song ngược cực với relay. Khi ngắt, dòng xả qua diode, $V_{CE}$ transistor chỉ lên đến $V_{\text{source}} + 0.7$ V (điện áp thuận diode), hoàn toàn an toàn.

---

**Bài 5:**

**(a) Dòng ban đầu lúc xả:**

Dòng ổn định khi nạp:
$$I_0 = \frac{V_s}{R} = \frac{6}{50} = 0.12 \text{ A} = 120 \text{ mA}$$

**(b) Hằng số thời gian xả:**
$$\tau = \frac{L}{R} = \frac{10 \times 10^{-3}}{50} = 0.2 \text{ ms}$$

(Cùng $\tau$ với lúc nạp — hằng số thời gian không phụ thuộc chiều nạp hay xả.)

**(c) Dòng sau 3τ:**
$$I(3\tau) = I_0 \, e^{-3} = 120 \times 0.050 = 6 \text{ mA}$$

Còn 5% dòng ban đầu — gần như đã xả xong.

**(d) Năng lượng ban đầu:**
$$E = \frac{1}{2} L I_0^2 = \frac{1}{2} \times 10 \times 10^{-3} \times (0.12)^2 = \frac{1}{2} \times 10^{-2} \times 0.0144 = 7.2 \times 10^{-5} \text{ J} = 72 \text{ µJ}$$

Năng lượng này được giải phóng qua $R$ dưới dạng nhiệt trong quá trình xả.

---

**Bài 6:**

**(a) Thời gian đạt 95% I_max:**

Dòng đạt 95% tại $t = 3\tau$:
$$\begin{aligned}
\tau &= \frac{L}{R} = \frac{200 \times 10^{-6}}{40} = 5 \times 10^{-6} \text{ s} = 5 \text{ µs} \\
t &= 3\tau = 15 \text{ µs}
\end{aligned}$$

**(b) Điện áp trên L tại t = 3τ:**
$$V_L(3\tau) = V_s \, e^{-3} = 8 \times 0.050 = 0.4 \text{ V}$$

(Rất nhỏ — cuộn cảm gần như hoàn toàn "trong suốt" với DC ở trạng thái ổn định.)

**(c) Năng lượng tích lũy tại t = 3τ:**

Dòng tại $t = 3\tau$:
$$I(3\tau) = \frac{V_s}{R} (1 - e^{-3}) = \frac{8}{40} \times 0.950 = 0.2 \times 0.950 = 0.190 \text{ A}$$

Năng lượng:
$$E = \frac{1}{2} L I^2 = \frac{1}{2} \times 200 \times 10^{-6} \times (0.190)^2 = 100 \times 10^{-6} \times 0.0361 = 3.61 \times 10^{-6} \text{ J} = 3.61 \text{ µJ}$$

---

## 8. Liên kết và bài tiếp theo

- **Bài trước:** [Lesson 04 — Tụ điện & Mạch RC](../lesson-04-capacitor-rc/) — so sánh trực tiếp tụ và cuộn cảm.
- **Vật lý nền:** [Cảm ứng điện từ](../../../Physics/02-Thermo-Electromagnetism/lesson-07-magnetism-induction/) — định luật Faraday, từ trường cuộn dây.
- **Bài tiếp theo:** [Lesson 06 — AC, Trở kháng & Mạch RLC](../lesson-06-ac-impedance-rlc/) — cuộn cảm ở tần số AC có trở kháng $X_L = 2 \pi f L$; kết hợp R, L, C trong mạch cộng hưởng.
- **Diode flyback chi tiết:** Lesson 02, Tầng 2 — Diodes & Protection Circuits (chưa có).

---

## 📝 Tổng kết Lesson 05

1. **Cuộn cảm** = cuộn dây tạo từ trường; đặc tính cốt lõi là **cưỡng lại thay đổi dòng điện**. Analogy: bánh đà / quán tính.
2. **$V_L = L \cdot \dfrac{dI}{dt}$**: điện áp tỉ lệ với tốc độ thay đổi dòng. Dòng ổn định → $V_L = 0$.
3. **$E = \frac{1}{2} L I^2$**: năng lượng tích lũy trong từ trường. Đối xứng với tụ: $E = \frac{1}{2} C V^2$.
4. **Mạch RL**: $I(t) = \dfrac{V_s}{R}(1 - e^{-t/\tau})$ khi nạp; $I(t) = I_0 \, e^{-t/\tau}$ khi xả; **$\tau = L/R$**.
5. **Spike điện áp khi ngắt**: nguy hiểm, phải dùng **diode flyback** để bảo vệ.
6. **Ứng dụng**: relay, biến áp, bộ lọc LC, boost converter, động cơ điện.

**Tiếp theo:** [Lesson 06 — AC, Trở kháng & Mạch RLC](../lesson-06-ac-impedance-rlc/)

**Minh họa tương tác:** [visualization.html](./visualization.html)
