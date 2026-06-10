# Lesson 08 — Nguồn & Dụng cụ đo

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Phân biệt nguồn điện áp (voltage source) lý tưởng và thực tế (có nội trở), biết công thức sụt áp.
- Tính thời gian xả pin từ dung lượng mAh, dòng tải, và hiệu suất.
- Sử dụng multimeter (đồng hồ vạn năng) đúng cách: đo V (song song), đo I (nối tiếp), đo R (ngắt nguồn), đo thông mạch.
- Đọc oscilloscope: biên độ, chu kỳ, tần số từ lưới V/div và time/div.
- Hiểu quy tắc an toàn điện cơ bản và vì sao đo sai có thể làm cháy cầu chì.
- Nhìn lại toàn bộ Tầng 1 (Ohm, Kirchhoff, RC, RL, AC, bộ lọc) và thấy bức tranh liên kết.

## Kiến thức tiền đề

- [Lesson 01 — Điện áp, Dòng điện, Điện trở (Ohm)](../lesson-01-voltage-current-resistance/)
- [Lesson 02 — Kirchhoff & Mạch cơ bản](../lesson-02-kirchhoff-circuits/)
- [Lesson 04 — Tụ điện & RC](../lesson-04-capacitor-rc/)
- [Lesson 05 — Cuộn cảm & RL](../lesson-05-inductor-rl/)
- [Lesson 06 — AC & Tổng trở RLC](../lesson-06-ac-impedance-rlc/)
- [Lesson 07 — Bộ lọc](../lesson-07-filters/)

---

## 1. Nguồn điện: lý tưởng vs thực tế

### 1.1. Nguồn điện áp (Voltage Source)

💡 **Hình dung trước**: Hãy nghĩ nguồn điện như một máy bơm nước. Máy bơm "lý tưởng" giữ áp suất đầu ra cố định dù bạn mở vòi bao nhiêu. Máy bơm thực tế có "ma sát nội bộ" — khi mở nhiều vòi (tải nặng), áp suất đầu ra giảm xuống.

**Nguồn điện áp lý tưởng (ideal voltage source):**
- Duy trì điện áp $V_{\text{nguồn}} =$ hằng số, bất kể dòng tải $I$ bao nhiêu.
- Nội trở (internal resistance) $R_{\text{nội}} = 0$.
- Không tồn tại trong thực tế — chỉ là mô hình toán học để đơn giản bài toán.

**Nguồn điện áp thực tế:**
- Bên trong có một nội trở $R_{\text{nội}}$ nối tiếp với nguồn lý tưởng.
- Khi tải kéo dòng $I$, có sụt áp trên $R_{\text{nội}}$: $\Delta V = I \times R_{\text{nội}}$.
- Điện áp tại đầu ra (terminal voltage): $V_{\text{tải}} = V_{\text{nguồn}} - I \times R_{\text{nội}}$.

```
  ┌───R_nội───┬─── (+) terminal
  │           │
[V_nguồn]   [R_tải]
  │           │
  └───────────┴─── (−) terminal
```

### 1.2. Ví dụ số — Sụt áp nội trở

**Ví dụ 1 — Pin AAA 1.5 V, $R_{\text{nội}} = 1.5$ Ω, nối với đèn LED $R_{\text{tải}} = 68$ Ω:**
- Dòng tải: $I = V_{\text{nguồn}} / (R_{\text{nội}} + R_{\text{tải}}) = 1.5 / (1.5 + 68) = 1.5 / 69.5 \approx 0.0216$ A $= 21.6$ mA.
- Điện áp tại đèn: $V_{\text{tải}} = 1.5 - 0.0216 \times 1.5 = 1.5 - 0.032 \approx$ **1.47 V**.
- Sụt áp nhỏ vì dòng nhỏ — pin còn mới.

**Ví dụ 2 — Pin cũ $R_{\text{nội}}$ tăng lên 15 Ω, cùng tải 68 Ω:**
- $I = 1.5 / (15 + 68) = 1.5 / 83 \approx 18.1$ mA.
- $V_{\text{tải}} = 1.5 - 0.0181 \times 15 = 1.5 - 0.27 \approx$ **1.23 V**.
- Đèn tối hơn dù pin "còn 1.5 V" khi đo không tải!

**Ví dụ 3 — Acquy 12 V xe máy, $R_{\text{nội}} = 0.1$ Ω, khởi động máy kéo 100 A:**
- $V_{\text{tải}} = 12 - 100 \times 0.1 = 12 - 10 =$ **2 V** (sụt áp cực lớn — đèn phải tắt trong lúc đề!).
- Sau khi máy nổ, dòng giảm còn ~2 A → $V_{\text{tải}} = 12 - 0.2 \approx$ **11.8 V** (bình thường).

**Ví dụ 4 — Nguồn 5 V (USB), $R_{\text{nội}} = 0.5$ Ω, tải 5 Ω:**
- $I = 5 / (0.5 + 5) = 5 / 5.5 \approx 0.909$ A.
- $V_{\text{tải}} = 5 - 0.909 \times 0.5 = 5 - 0.45 \approx$ **4.55 V**.
- Thiết bị cần ≥ 4.75 V sẽ hoạt động không ổn định — quan trọng với Raspberry Pi, Arduino.

❓ **Câu hỏi tự nhiên của người đọc:**

> *"Khi đo điện áp pin bằng đồng hồ, tại sao hay thấy đúng 1.5 V dù pin cũ?"*

Vì đồng hồ có điện trở nội rất cao (≥ 1 MΩ) → dòng qua $R_{\text{nội}} \approx 0$ → không sụt áp. Pin cũ chỉ "lộ mặt" khi nối tải thực (dòng lớn). Muốn biết tình trạng thật của pin: đo điện áp khi đang nối tải (load test).

> *"R_nội lấy ở đâu ra? Sao không đo được trực tiếp?"*

$R_{\text{nội}}$ là điện trở của hóa chất điện phân, dây dẫn trong pin, mối hàn... Không đo trực tiếp vì pin đang có EMF. Đo gián tiếp: $V_{\text{hở}} - V_{\text{tải}} = I \times R_{\text{nội}}$ → $R_{\text{nội}} = (V_{\text{hở}} - V_{\text{tải}}) / I$.

⚠ **Lỗi thường gặp:**
- Nhầm "pin hết" với "pin cũ": pin cũ vẫn đủ điện áp khi đo không tải nhưng sụt áp khi tải nặng.
- Chọn nguồn 5 V nhưng cáp USB dài ($R_{\text{dây}}$ cao) → $V_{\text{tải}} < 4.75$ V → Raspberry Pi reset.

### 1.3. Nguồn dòng (Current Source)

**Nguồn dòng lý tưởng** duy trì dòng I_nguồn = hằng số, bất kể điện áp tải. Nội dẫn = vô cực (nội trở = 0 khi song song, hay R_nội → ∞ khi nhìn từ ngoài vào).

💡 Hình dung: nguồn dòng như bơm "lưu lượng cố định" — bơm luôn đẩy X lít/giây dù ống hẹp hay rộng (áp suất thay đổi nhưng lưu lượng giữ nguyên). Nguồn dòng ít gặp hơn trong cuộc sống hàng ngày nhưng cực phổ biến trong mạch bán dẫn (transistor cấu hình current mirror).

📝 **Tóm tắt mục 1:**
- Nguồn áp lý tưởng: $R_{\text{nội}} = 0$, $V_{\text{out}} =$ hằng số. Thực tế: $R_{\text{nội}} > 0$, $V_{\text{tải}} = V_{\text{nguồn}} - I \cdot R_{\text{nội}}$.
- Sụt áp $= I \times R_{\text{nội}}$ — tải nặng ($I$ lớn) → $V_{\text{tải}}$ giảm đáng kể.
- Đo điện áp pin không tải luôn cho kết quả tốt hơn thực tế. Load test mới phản ánh đúng.
- Nguồn dòng: duy trì $I =$ hằng số; xuất hiện nhiều trong mạch bán dẫn.

---

## 2. Pin, acquy và dung lượng mAh

### 2.1. Dung lượng mAh là gì?

**Dung lượng pin (capacity)** đo tổng điện tích mà pin có thể cung cấp:

$$\text{Capacity } (C) = I \times t$$

Đơn vị: **mAh** (milli-Ampere-hour). 1 mAh = dòng 1 mA chảy trong 1 giờ.

💡 **Hình dung**: dung lượng mAh giống "bình xăng" — bình 5000 mL xăng, xe tiêu thụ 50 mL/giờ → đi được 100 giờ. Pin 5000 mAh, thiết bị kéo 50 mA → dùng được 100 giờ.

**Vì sao dùng mAh thay vì Joule?** Vì Joule = V × A × giờ, nhưng điện áp pin thay đổi trong suốt quá trình xả. Dùng mAh (chỉ đếm điện tích, không kể V) cho phép so sánh đơn giản hơn. Năng lượng thực tế $=$ Capacity (Ah) $\times V_{\text{trung bình}}$.

### 2.2. Công thức tính thời gian xả

$$\begin{aligned}
t &= \frac{C}{I_{\text{tải}}} && \text{(đơn giản, không có hiệu suất)} \\
t &= \frac{C \times \eta}{I_{\text{tải}}} && \text{(thực tế, } \eta = \text{hiệu suất 80–95\%)}
\end{aligned}$$

trong đó:
- $C$ = dung lượng pin (mAh).
- $I_{\text{tải}}$ = dòng tiêu thụ của thiết bị (mA).
- $\eta$ = hiệu suất xả (loss từ nhiệt, hóa học... thường 80–90% với Li-ion, 60–80% với pin carbon).
- $t$ = thời gian (giờ).

### 2.3. Ví dụ số

**Ví dụ 1 — Điện thoại pin 4000 mAh, màn hình sáng tiêu thụ 300 mA, $\eta = 0.90$:**
- $t = 4000 \times 0.90 / 300 = 3600 / 300 =$ **12 giờ**.

**Ví dụ 2 — Pin dự phòng 10000 mAh sạc điện thoại 4000 mAh:**
- Hiệu suất sạc thực ≈ 80%: điện tích thực sự truyền $= 10000 \times 0.80 = 8000$ mAh.
- Sạc được $8000 / 4000 =$ **2 lần** đầy (thực tế ~1.8–2 lần do nhiều loss khác).

**Ví dụ 3 — Arduino Uno (80 mA) + cảm biến (20 mA) tổng 100 mA, pin 18650 2600 mAh, $\eta = 0.85$:**
- $t = 2600 \times 0.85 / 100 = 2210 / 100 =$ **22.1 giờ**.

**Ví dụ 4 — Xe máy điện pin 48V 20Ah ($= 20000$ mAh), motor kéo 15A trung bình:**
- $t = 20000 / 15000$ mA $\approx$ **1.33 giờ** ≈ 80 phút.
- Năng lượng tổng $= 48 \times 20 =$ **960 Wh ≈ 1 kWh**.

🔁 **Dừng lại tự kiểm tra:**
Pin 9V (dạng khối vuông) thường có dung lượng 500 mAh. Arduino Nano tiêu thụ 20 mA. Tính thời gian sử dụng ($\eta = 0.85$).

<details>
<summary>Đáp án</summary>

$t = 500 \times 0.85 / 20 = 425 / 20 =$ **21.25 giờ** ≈ 21 giờ 15 phút. Thực tế ngắn hơn vì còn có tổn hao từ bộ chuyển đổi 9V→5V.
</details>

📝 **Tóm tắt mục 2:**
- Capacity (mAh) $= I \times t$. Thời gian xả: $t = C \times \eta / I_{\text{tải}}$.
- Dung lượng mAh đo điện tích, không đo năng lượng (cần nhân thêm V để ra Wh).
- $\eta = 80$–95% với Li-ion, 60–80% với pin carbon thông thường.

---

## 3. Multimeter — Đồng hồ vạn năng

### 3.1. Tổng quan

💡 **Hình dung**: Multimeter như "thám tử điện" — cắm vào mạch, hỏi "áp suất (V) bao nhiêu?", "dòng chảy (I) bao nhiêu?", "chướng ngại vật (R) bao nhiêu?". Nhưng cách cắm vào phải khác nhau tùy câu hỏi!

Multimeter có ít nhất 3 đầu đo:
- **COM** (đen): cực âm, luôn cắm vào đây.
- **VΩ** (đỏ): đo điện áp và điện trở.
- **mA / 10A** (đỏ): đo dòng (có 2 range riêng để bảo vệ cầu chì).

### 3.2. Đo điện áp — mắc SONG SONG

```
     R1
──┬──┤├──┬──
  │       │
 [V?]   [V]
  │       │
──┴───────┴──
```

**Quy tắc**: Que đo cắm song song (parallel) với phần tử cần đo. Điện áp tại 2 điểm = nhau → đo được hiệu điện thế.

**Vì sao đúng?** Đồng hồ đo V có điện trở nội rất cao (1–10 MΩ) → dòng qua đồng hồ cực nhỏ → không ảnh hưởng mạch gốc.

**Ảnh hưởng nội trở đồng hồ**: Nếu đo điện áp trên một điện trở 1 MΩ bằng đồng hồ có $R_{\text{input}} = 1$ MΩ → nội trở đồng hồ song song tạo thành 500 kΩ → kết quả đo sai 50%! Quy tắc thực tế: $R_{\text{mạch đo}}$ phải $< \frac{1}{10} R_{\text{input}}$ của đồng hồ để sai số $< 10\%$.

### 3.3. Đo dòng điện — mắc NỐI TIẾP

```
     R1       [A]
──┬──┤├──┬────┤├────┬──
  │       └───────────┘
```

**Quy tắc**: Cắt mạch tại điểm cần đo, nối đồng hồ vào chỗ cắt (nối tiếp). Toàn bộ dòng phải chạy qua đồng hồ.

**Vì sao mắc sai là cháy cầu chì?** Đồng hồ đo dòng có điện trở nội rất thấp (≈ 0.1–2 Ω). Nếu mắc song song với nguồn 5V → $R_{\text{nội}}$ đồng hồ rất nhỏ → $I = 5\text{V} / 0.1\,\Omega =$ **50 A** → cầu chì cháy ngay lập tức.

⚠ **Lỗi thường gặp — nguy hiểm nhất:**
Đo dòng mà quên chuyển về chế độ V khi đo điện áp bước tiếp theo → cắm đồng hồ (đang ở chế độ A) song song với nguồn → SHORT CIRCUIT → cầu chì cháy, đồng hồ hỏng, nguồn hỏng, thậm chí nổ tụ.
**Thói quen an toàn**: sau mỗi lần đo dòng → chuyển ngay về V trước khi rút que.

### 3.4. Đo điện trở — PHẢI ngắt nguồn

**Quy tắc**: Đo điện trở khi mạch đã tắt nguồn và tụ điện đã xả hết. Multimeter tự cấp dòng nhỏ vào linh kiện để đo điện trở — nếu mạch có nguồn riêng, kết quả sẽ sai và có thể hỏng đồng hồ.

❓ **Câu hỏi tự nhiên:**
> *"Tại sao phải xả tụ trước khi đo R?"*
Tụ còn điện tích sẽ bơm điện vào circuit đo của đồng hồ → đọc sai và có thể hỏng IC đo của máy.

**Cách xả tụ**: nối điện trở 1–10 kΩ qua 2 cực tụ trong vài giây trước khi đo. Không ngắn mạch trực tiếp (dòng đột ngột lớn, tia lửa điện).

### 3.5. Đo thông mạch (Continuity)

Chế độ "thông mạch" (biểu tượng diode hoặc loa): đồng hồ phát tiếng bíp nếu điện trở giữa 2 đầu que < ~50 Ω. Dùng để:
- Kiểm tra dây cáp có đứt không.
- Kiểm tra đường mạch in PCB.
- Kiểm tra cầu chì còn thông không.

⚠ Đo thông mạch trên mạch đang có điện → kết quả không đáng tin và có thể làm hỏng đồng hồ.

📝 **Tóm tắt mục 3:**
- Đo V: mắc song song, $R_{\text{input}}$ đồng hồ phải lớn hơn $R_{\text{mạch}}$ ít nhất 10×.
- Đo I: cắt mạch, mắc nối tiếp. Nhầm sang song song → SHORT → cháy cầu chì.
- Đo R: ngắt nguồn, xả tụ trước.
- Thông mạch: dùng kiểm tra dây, cầu chì, PCB — mạch phải tắt nguồn.

---

## 4. Oscilloscope — Hiển thị dạng sóng

### 4.1. Tại sao cần oscilloscope (scope)?

💡 **Hình dung**: Multimeter giống đồng hồ bấm giờ — chỉ cho bạn biết con số tại một thời điểm. Oscilloscope giống camera quay phim — cho bạn thấy tín hiệu biến thiên theo thời gian, phát hiện méo sóng, vọt lố (overshoot), tiếng ồn (noise), pha...

Multimeter chỉ đo được giá trị RMS hoặc trung bình của tín hiệu AC. Scope hiển thị:
- Dạng sóng (sin, vuông, tam giác, tùy ý).
- Biên độ đỉnh-đỉnh ($V_{\text{pp}}$).
- Chu kỳ $T$ và tần số $f = 1/T$.
- Méo sóng, overshoot, nhiễu (điều multimeter không thể thấy).

### 4.2. Cấu trúc màn hình scope

Màn hình scope có **lưới ô vuông (graticule)**, thường 8×10 ô (8 ô dọc × 10 ô ngang). Hai thông số chính:

**V/div (Volt per division):** mỗi ô dọc đại diện bao nhiêu Volt.
- Ví dụ V/div = 2 V → sóng chiếm 4 ô dọc → biên độ từ đỉnh đến gốc $= 4 \times 2 = 8$ V.
- Biên độ đỉnh-đỉnh $V_{\text{pp}} = $ số ô chiều cao $\times$ V/div.

**Time/div (giây per division):** mỗi ô ngang đại diện bao nhiêu giây (hoặc ms, µs).
- Ví dụ time/div = 1 ms → 1 chu kỳ chiếm 5 ô → $T = 5 \times 1$ ms $= 5$ ms → $f = 1/5$ ms $=$ **200 Hz**.

### 4.3. Đọc biên độ và chu kỳ — walk-through số cụ thể

**Ví dụ 1:** V/div = 0.5 V, time/div = 0.2 ms. Sóng sin chiếm 6 ô dọc (đỉnh-đỉnh), 4 ô ngang/chu kỳ.
- $V_{\text{pp}} = 6 \times 0.5 =$ **3 V** → Biên độ đỉnh $A = 3/2 =$ **1.5 V**.
- $T = 4 \times 0.2$ ms $=$ **0.8 ms** → $f = 1/0.8$ ms $=$ **1250 Hz = 1.25 kHz**.
- $V_{\text{RMS}}$ (sin) $= A / \sqrt{2} = 1.5 / 1.414 \approx$ **1.06 V**.

**Ví dụ 2:** V/div = 1 V, time/div = 50 µs. Sóng vuông chiếm 3 ô dọc (đỉnh-đỉnh), 8 ô ngang/chu kỳ.
- $V_{\text{pp}} = 3 \times 1 =$ **3 V** (sóng vuông đi từ 0 đến 3V).
- $T = 8 \times 50$ µs $=$ **400 µs** → $f = 1/400$ µs $=$ **2500 Hz = 2.5 kHz**.

**Ví dụ 3:** V/div = 5 V, time/div = 10 ms. Sóng sin chiếm 4 ô dọc, 2 ô ngang/chu kỳ.
- $V_{\text{pp}} = 4 \times 5 =$ **20 V** → $A = 10$ V.
- $T = 2 \times 10$ ms $=$ **20 ms** → $f =$ **50 Hz** (đây là tần số điện lưới AC Việt Nam!).

**Ví dụ 4:** V/div = 200 mV, time/div = 1 µs. Sóng tam giác chiếm 5 ô, 6 ô/chu kỳ.
- $V_{\text{pp}} = 5 \times 200$ mV $=$ **1000 mV = 1 V**.
- $T = 6 \times 1$ µs $=$ **6 µs** → $f = 1/6$ µs $\approx$ **167 kHz**.

🔁 **Dừng lại tự kiểm tra:**
Scope hiển thị: V/div = 2 V, time/div = 5 ms. Sóng sin chiếm 5 ô dọc (đỉnh-đỉnh), 4 ô ngang/chu kỳ. Tính $V_{\text{pp}}$, $A$, $T$, $f$, $V_{\text{RMS}}$.

<details>
<summary>Đáp án</summary>

- $V_{\text{pp}} = 5 \times 2 =$ **10 V** → $A = 5$ V.
- $T = 4 \times 5$ ms $=$ **20 ms** → $f = 1/20$ ms $=$ **50 Hz**.
- $V_{\text{RMS}} = 5 / \sqrt{2} \approx$ **3.54 V**.
</details>

### 4.4. Triggering — tại sao sóng đứng yên?

Scope không chụp ảnh tức thời — nó quét màn hình liên tục từ trái sang phải. Nếu không có "neo" (trigger), sóng sẽ trôi ngang liên tục, không đọc được.

**Trigger**: scope bắt đầu vẽ mỗi chu kỳ tại đúng cùng một điểm của sóng (thường là lúc sóng vượt qua ngưỡng điện áp $V_{\text{trig}}$ theo chiều lên hoặc xuống). Kết quả: sóng "đứng yên" trên màn.

❓ **Câu hỏi tự nhiên:**
> *"Scope đắt tiền hay rẻ — khác nhau ở đâu?"*
Băng thông (bandwidth). Scope 100 MHz đo được tín hiệu đến 100 MHz chính xác. Scope 20 MHz đo 50 MHz sẽ bị suy giảm biên độ, sóng méo. Quy tắc thực tế: băng thông scope cần ≥ 5× tần số tín hiệu cần đo.

📝 **Tóm tắt mục 4:**
- V/div $\times$ số ô dọc $= V_{\text{pp}}$.
- Time/div $\times$ số ô ngang $= T$ → $f = 1/T$.
- Scope thấy dạng sóng, méo sóng, nhiễu — multimeter chỉ thấy số.
- Trigger giữ sóng đứng yên để đọc.

---

## 5. An toàn điện cơ bản

### 5.1. Ngưỡng nguy hiểm

**Điện áp không giết người — dòng điện mới giết người.** Nhưng điện áp cao mới đẩy được dòng lớn qua người.

| Dòng qua người | Tác động |
|----------------|----------|
| < 1 mA | Không cảm nhận |
| 1–5 mA | Nhẹ, ngứa ran |
| 10–20 mA | Co cơ, không tự bỏ tay ra được |
| 50–100 mA | Rung tim (ventricular fibrillation) — nguy hiểm tính mạng |
| > 100 mA | Thường tử vong |

Điện trở người (khô): 10–100 kΩ. Điện trở người (ướt): 1–10 kΩ. Ở 220 VAC với tay ướt: $I = 220 / 2000 =$ **110 mA** → nguy hiểm tính mạng.

⚠ **Quy tắc bất di bất dịch:**
- **Không bao giờ** chạm tay vào mạch đang có điện áp > 50 V.
- **Luôn** ngắt nguồn trước khi thay linh kiện.
- **Luôn** một tay — khi buộc phải đo mạch điện áp cao, chỉ dùng một tay, tay kia bỏ sau lưng hoặc túi. Dòng qua ngực (từ tay này sang tay kia qua tim) nguy hiểm hơn dòng qua tay xuống chân.

### 5.2. Ground (đất) và an toàn đo lường

**Ground (GND / PE)** là điểm điện thế tham chiếu, thường nối với vỏ thiết bị và đất thực tế (qua cọc tiếp đất). Ground không phải "zero volt" — chỉ là điểm "cùng điện thế với đất".

❓ **Câu hỏi tự nhiên:**
> *"Tại sao cắm que đen (COM) của scope vào ground trước tiên?"*
Que đo của scope và đồng hồ nối về ground của máy (thường = vỏ máy = 0V). Nếu cắm que đen vào điểm không phải ground (ví dụ 100V) → tạo ra ngắn mạch qua vỏ scope → nguy hiểm.

> *"Floating ground là gì?"*
Một số thiết bị không nối PE (3 dây) mà chỉ dùng L+N (2 dây). Ground của thiết bị "trôi nổi" — điện áp so với đất thực tế có thể là 50–110V AC. Chạm vào vỏ thiết bị floating ground + đứng trên nền đất → giật.

### 5.3. Các quy tắc đo đúng

1. **Đo điện áp trước** — biết điện áp tại mỗi điểm trước khi đo dòng.
2. **Đo dòng**: cắt mạch, nối đồng hồ vào, đo, rút ra, nối lại mạch.
3. **Không bao giờ** đo dòng bằng que song song với nguồn (kể cả nguồn 3V3 từ Arduino — đủ phá cầu chì 200mA của đồng hồ).
4. **Kiểm tra chế độ đồng hồ** trước khi chạm que vào mạch.
5. **Nguồn DC lab**: luôn tắt nguồn trước khi thay kết nối, bật nguồn sau khi đã đấu xong.

📝 **Tóm tắt mục 5:**
- Dòng ≥ 50 mA qua người → nguy hiểm tính mạng; tay ướt ở 220V → dòng ~110 mA.
- Một tay khi đo cao áp. Ngắt nguồn khi thay linh kiện.
- Ground: điểm tham chiếu; scope COM phải cắm đúng ground mạch cần đo.

---

## 6. Tổng kết Tầng 1 — Kết nối các khái niệm

### 6.1. Bản đồ kiến thức Tầng 1

Nhìn lại hành trình 8 bài, mọi thứ đều xoay quanh một câu hỏi: **"Điện áp, dòng điện và phần tử mạch tương tác với nhau như thế nào?"**

```
Ohm (L01): V = I × R — nền tảng tất cả
     │
     ├─ Kirchhoff (L02): KVL + KCL — tổng V vòng = 0, tổng I nút = 0
     │
     ├─ Phân áp, Phân dòng (L03): điện trở mắc nối tiếp / song song
     │
     ├─ Tụ điện RC (L04): V không thể nhảy bậc, τ = RC, xạc/xả
     │
     ├─ Cuộn cảm RL (L05): I không thể nhảy bậc, τ = L/R, từ trường
     │
     ├─ AC & Tổng trở (L06): Z = R + jX, X_C = 1/ωC, X_L = ωL
     │
     ├─ Bộ lọc (L07): RC/RL + tổng trở tạo ra LPF/HPF/BPF
     │
     └─ Nguồn & Đo lường (L08): nội trở, pin, multimeter, scope
```

### 6.2. Tại sao nội trở quan trọng cho toàn Tầng 1?

Mọi công thức Tầng 1 giả định nguồn lý tưởng. Thực tế:
- $V_{\text{tải}} \neq V_{\text{nguồn}}$ khi tải nặng — ảnh hưởng kết quả đo, hoạt động mạch.
- Bộ lọc RC: nếu nguồn có $R_{\text{nội}}$ đáng kể → tần số cắt $f_c = 1/(2\pi(R_{\text{nội}} + R)C)$ thay đổi.
- Mạch phân áp: điện trở tải (kể cả $R_{\text{input}}$ của tầng sau) thay đổi tỉ lệ phân áp (xem [Lesson 03](../lesson-03-resistors-divider/)).

### 6.3. Giao thoa giữa các khái niệm — 4 ví dụ kết hợp

**Ví dụ kết hợp 1 — Pin cấp cho mạch lọc RC:**
Pin 9V, $R_{\text{nội}} = 2$ Ω, mạch lọc thấp RC với $R = 1$ kΩ, $C = 100$ nF. Tải sau lọc $= 10$ kΩ.
- $f_c$ (không có nội trở) $= 1 / (2\pi \times 1000 \times 100 \times 10^{-9}) \approx 1592$ Hz.
- $R_{\text{nội}}$ nhỏ hơn $R$ rất nhiều (2 Ω $\ll$ 1000 Ω) → ảnh hưởng không đáng kể.
- Tải 10 kΩ song song với C: tổng trở tải thay đổi đáp ứng tần số cao.

**Ví dụ kết hợp 2 — Đo dòng qua cuộn cảm bằng scope:**
Không thể cắm ampere kế vào cuộn cảm ($I$ không nhảy bậc — nếu cắt mạch và nối lại sẽ tạo điện áp cảm ứng rất cao). Cách đo gián tiếp: đặt điện trở nhỏ $R_{\text{shunt}} = 1$ Ω nối tiếp, đo $V$ qua $R_{\text{shunt}}$ bằng scope → $I = V/R_{\text{shunt}}$.

**Ví dụ kết hợp 3 — Xác định f_c của bộ lọc bằng scope:**
Dùng scope đo $V_{\text{in}}$ và $V_{\text{out}}$ của bộ lọc RC khi quét tần số. Tại $f_c$: $|V_{\text{out}}| = |V_{\text{in}}| / \sqrt{2} \approx 0.707 \times V_{\text{in}}$, đồng thời pha lệch 45°. Đây là cách thực tế nhất để xác minh bộ lọc hoạt động đúng.

**Ví dụ kết hợp 4 — Dùng KVL kiểm tra sụt áp nội trở:**
$V_{\text{nguồn}}$ (đo không tải) $- V_{\text{tải}}$ (đo khi có tải) $= I \times R_{\text{nội}}$. Dùng 2 que đồng hồ đo 2 điện áp → KVL cho vòng nguồn → suy ra $R_{\text{nội}}$ ngay trên bench.

📝 **Tóm tắt mục 6:**
- 8 bài Tầng 1 đều xoay quanh Ohm + Kirchhoff, mở rộng dần với tụ, cuộn, AC, lọc.
- Nội trở nguồn ảnh hưởng thực tế đến mọi mạch trong Tầng 1.
- Scope là công cụ "nhìn thật" vào mạch — không thể thiếu khi debug.
- Tầng 2 (Bán dẫn) sẽ dùng toàn bộ nền tảng này để hiểu diode, transistor, op-amp.

---

## 7. Bài tập + Lời giải chi tiết

### Bài tập

**Bài 1 — Sụt áp nội trở:** Pin 1.5 V có nội trở 2 Ω. Nối với tải 10 Ω. Tính:
(a) Dòng tải $I$.
(b) Điện áp tải $V_{\text{tải}}$.
(c) Công suất tiêu thụ trên nội trở.
(d) Hiệu suất (công suất tải / công suất tổng).

**Bài 2 — Thời gian pin:** Pin Li-ion 3000 mAh, $\eta = 0.90$. Thiết bị gồm: vi điều khiển 30 mA, màn hình LCD 60 mA, 3 LED mỗi cái 20 mA. Tính thời gian hoạt động.

**Bài 3 — Đọc scope:** Oscilloscope hiển thị sóng sin với:
- V/div = 0.5 V, time/div = 0.5 ms.
- Sóng chiếm 6 ô dọc (đỉnh-đỉnh), 4 ô ngang mỗi chu kỳ.
Tính: $V_{\text{pp}}$, biên độ $A$, $T$, $f$, $V_{\text{RMS}}$.

**Bài 4 — Đo dòng gián tiếp:** Mạch có nguồn 12V, điện trở tải 470 Ω. Bạn muốn đo dòng nhưng không có chỗ cắt mạch. Nêu phương pháp đo gián tiếp bằng đồng hồ và tính kết quả.

**Bài 5 — Sụt áp cáp USB:** Cáp USB dài 2 m có điện trở tổng dây (+) và (−) là 0.8 Ω. Thiết bị kéo 1.5 A từ nguồn 5 V. Tính điện áp thực tế tại thiết bị.

**Bài 6 — Nguồn lý tưởng vs thực:** Nguồn điện áp 12V có nội trở 0.5 Ω. Nối với 2 tải song song: $R_1 = 6$ Ω và $R_2 = 12$ Ω. Tính điện áp tại đầu ra nguồn (terminal voltage).

**Bài 7 — Phân tích an toàn:** Người ($R_{\text{người}} = 5$ kΩ khi tay ướt) chạm vào điểm 24 VDC. Tính dòng qua người. So sánh với ngưỡng nguy hiểm và kết luận.

### Lời giải chi tiết

**Bài 1:**

(a) Dòng tải: $I = V_{\text{nguồn}} / (R_{\text{nội}} + R_{\text{tải}}) = 1.5 / (2 + 10) = 1.5 / 12 =$ **0.125 A = 125 mA**.

(b) $V_{\text{tải}} = V_{\text{nguồn}} - I \times R_{\text{nội}} = 1.5 - 0.125 \times 2 = 1.5 - 0.25 =$ **1.25 V**.

Kiểm tra: $V_{\text{tải}} = I \times R_{\text{tải}} = 0.125 \times 10 = 1.25$ V ✓.

(c) $P_{\text{nội}} = I^2 \times R_{\text{nội}} = 0.125^2 \times 2 = 0.015625 \times 2 =$ **0.03125 W ≈ 31.25 mW**.

(d) $P_{\text{tải}} = I^2 \times R_{\text{tải}} = 0.125^2 \times 10 =$ **0.156 W = 156.25 mW**.
$P_{\text{tổng}} = I \times V_{\text{nguồn}} = 0.125 \times 1.5 = 0.1875$ W.
Hiệu suất $\eta = P_{\text{tải}} / P_{\text{tổng}} = 156.25 / 187.5 =$ **83.3%**.

Hoặc $\eta = R_{\text{tải}} / (R_{\text{tải}} + R_{\text{nội}}) = 10 / 12 = 83.3\%$ (công thức nhanh khi $R_{\text{tải}}$ và $R_{\text{nội}}$ đã biết).

---

**Bài 2:**

Tổng dòng tiêu thụ: $I_{\text{tổng}} = 30 + 60 + 3 \times 20 = 30 + 60 + 60 =$ **150 mA**.

Thời gian: $t = C \times \eta / I = 3000 \times 0.90 / 150 = 2700 / 150 =$ **18 giờ**.

---

**Bài 3:**

- $V_{\text{pp}} = $ số ô dọc $\times$ V/div $= 6 \times 0.5 =$ **3 V**.
- Biên độ $A = V_{\text{pp}} / 2 = 3 / 2 =$ **1.5 V**.
- Chu kỳ $T = $ số ô ngang $\times$ time/div $= 4 \times 0.5$ ms $=$ **2 ms**.
- Tần số $f = 1 / T = 1 / (2 \times 10^{-3}) =$ **500 Hz**.
- $V_{\text{RMS}}$ (sóng sin) $= A / \sqrt{2} = 1.5 / 1.4142 \approx$ **1.061 V**.

---

**Bài 4:**

Phương pháp đo gián tiếp (Ohm method):
- Đo $V_{\text{tải}}$ bằng đồng hồ chế độ V, mắc song song với $R = 470$ Ω.
- Tính dòng: $I = V_{\text{tải}} / R_{\text{tải}}$.

Tính lý thuyết: $I = 12 / 470 \approx 0.02553$ A $=$ **25.5 mA**. $V_{\text{tải}} \approx 12$ V (giả sử nguồn lý tưởng).

Lưu ý: $R_{\text{input}}$ đồng hồ (thường 1–10 MΩ) $\gg$ 470 Ω nên sai số không đáng kể ($< 0.05\%$).

---

**Bài 5:**

Điện áp sụt trên cáp: $\Delta V = I \times R_{\text{cáp}} = 1.5 \times 0.8 =$ **1.2 V**.

$V_{\text{thiết bị}} = V_{\text{nguồn}} - \Delta V = 5 - 1.2 =$ **3.8 V**.

Nhận xét: 3.8 V thấp hơn nhiều so với yêu cầu USB tối thiểu 4.75 V → thiết bị sẽ không nạp đúng cách, có thể báo "sạc chậm" hoặc không nhận sạc. Cáp chất lượng tốt cần $R < 0.1$ Ω tổng dây.

---

**Bài 6:**

Tải song song $R_1 /\!/ R_2 = (6 \times 12) / (6 + 12) = 72 / 18 =$ **4 Ω**.

Dòng tổng: $I = V_{\text{nguồn}} / (R_{\text{nội}} + R_{\text{tải tổng}}) = 12 / (0.5 + 4) = 12 / 4.5 \approx 2.667$ A.

Terminal voltage: $V_{\text{terminal}} = V_{\text{nguồn}} - I \times R_{\text{nội}} = 12 - 2.667 \times 0.5 = 12 - 1.333 =$ **10.67 V**.

Kiểm tra: $V = I \times R_{\text{tải tổng}} = 2.667 \times 4 = 10.67$ V ✓.

---

**Bài 7:**

Dòng qua người: $I = V / R_{\text{người}} = 24 / 5000 =$ **0.0048 A = 4.8 mA**.

Theo bảng ngưỡng: 4.8 mA nằm trong khoảng 1–5 mA → **cảm nhận nhẹ, ngứa ran, không nguy hiểm tính mạng**.

Nhưng lưu ý:
- 24 VDC với tay khô ($R_{\text{người}} = 50$ kΩ): $I = 24/50000 = 0.48$ mA → gần như không cảm nhận.
- Quy tắc thực tế: < 50 VDC thường an toàn với người lớn khỏe mạnh trong điều kiện bình thường, nhưng không tuyệt đối (trẻ em, người bệnh tim, điều kiện ẩm ướt → nguy cơ tăng).

---

## 8. Liên kết và bài tiếp theo

- Tiền đề đã học: [Lesson 07 — Bộ lọc](../lesson-07-filters/)
- **Bài tiếp theo**: [Tầng 2 — Bán dẫn: Diode & Junction PN](../../02-Semiconductors/lesson-01-semiconductor-pn/)
  - Tầng 2 sẽ dùng toàn bộ kiến thức Tầng 1: Ohm, KVL/KCL, tổng trở, mạch RC, nguồn thực tế.
  - Diode là phần tử phi tuyến đầu tiên — mọi thứ trước đây là tuyến tính.
- Tham khảo thêm:
  - [Lesson 01 — Ohm](../lesson-01-voltage-current-resistance/) (nền tảng cho toàn Tầng 1)
  - [Lesson 06 — AC & Tổng trở](../lesson-06-ac-impedance-rlc/) (scope đo tín hiệu AC)
- Xem minh họa tương tác: [visualization.html](./visualization.html)

---

## 📝 Tổng kết Lesson 08

1. **Nguồn thực tế có nội trở** $R_{\text{nội}}$: $V_{\text{tải}} = V_{\text{nguồn}} - I \cdot R_{\text{nội}}$. Tải nặng → sụt áp lớn.
2. **Dung lượng pin (mAh)**: thời gian xả $t = C \cdot \eta / I_{\text{tải}}$. Đo không tải không phản ánh đúng sức pin.
3. **Multimeter**: đo V song song, đo I nối tiếp (nhầm → cháy cầu chì), đo R phải ngắt nguồn xả tụ.
4. **Oscilloscope**: $V_{\text{pp}} = $ ô_dọc $\times$ V/div, $T = $ ô_ngang $\times$ time/div, $f = 1/T$. Thấy dạng sóng mà multimeter không thấy.
5. **An toàn**: dòng ≥ 50 mA qua người nguy hiểm; một tay khi đo cao áp; ngắt nguồn trước khi thay linh kiện.
6. **Tầng 1 hoàn thành**: Ohm → Kirchhoff → RC/RL → AC → Lọc → Nguồn & Đo. Tầng 2 bắt đầu với Bán dẫn.
