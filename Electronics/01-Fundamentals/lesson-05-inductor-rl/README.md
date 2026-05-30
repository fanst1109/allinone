# Lesson 05 — Cuộn cảm & Mạch RL

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Hiểu cuộn cảm (inductor) là gì về mặt vật lý: cuộn dây tạo từ trường, "quán tính của dòng điện".
- Nắm vững định luật cảm ứng: V_L = L·(dI/dt).
- Tính năng lượng tích lũy trong cuộn cảm: E = ½L·I².
- Phân tích mạch RL theo thời gian: hằng số thời gian τ = L/R, đường cong I(t) tăng và giảm.
- Hiểu hiện tượng spike điện áp khi ngắt mạch và cách bảo vệ bằng diode flyback.
- Nhận biết các ứng dụng thực tế: relay, biến áp, bộ lọc, động cơ.

## Kiến thức tiền đề

- [Lesson 04 — Tụ điện & Mạch RC](../lesson-04-capacitor-rc/) — hằng số thời gian τ = RC, đường cong tụ nạp/xả là nền tảng để so sánh.
- [Vật lý — Cảm ứng điện từ](../../../Physics/02-Thermo-Electromagnetism/lesson-07-magnetism-induction/) — định luật Faraday, từ trường cuộn dây, quy tắc Lenz.

---

## 1. Cuộn cảm là gì?

### 1.1. Cấu tạo và nguyên lý vật lý

**Cuộn cảm (inductor)** là cuộn dây dẫn điện, thường quấn quanh lõi (lõi không khí, lõi ferrite, lõi thép silicon). Khi dòng điện chạy qua, nó tạo ra **từ trường xung quanh cuộn dây**.

Ký hiệu: **L**, đơn vị: **Henry (H)**. Thực tế hay gặp mH (milli-Henry) và µH (micro-Henry):
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
| Phần tử đối ngẫu | V ↔ I | I ↔ V |
| Năng lượng lưu trữ | E = ½C·V² | E = ½L·I² |
| Không thay đổi tức thời | V không đổi ngay | I không đổi ngay |
| Analogy | Bình chứa nước (giữ áp) | Bánh đà (giữ lưu lượng) |

### 1.2. Độ tự cảm L — định nghĩa đầy đủ

**(a) Là gì:** L đo khả năng cuộn dây "tích trữ" năng lượng từ trường. Giá trị L lớn → từ trường mạnh hơn với cùng lượng dòng → cuộn dây "cưỡng lại" thay đổi dòng mạnh hơn.

**(b) Vì sao cần:** Nếu chỉ biết dòng đang chạy, ta không biết cuộn cảm sẽ phản ứng "mạnh hay nhẹ" khi bị thay đổi. L là tham số vật lý đặc trưng cho mức độ "ì" của cuộn dây — giống như khối lượng m đặc trưng cho mức độ "ì" của vật thể.

**(c) Ví dụ số:** Cuộn dây có L = 10 mH. Khi dòng thay đổi 1 A trong 1 ms:
- dI/dt = 1 A / 0.001 s = 1000 A/s
- V_L = L · (dI/dt) = 0.01 H × 1000 A/s = **10 V**

❓ **Câu hỏi tự nhiên của người đọc:**

**"L phụ thuộc vào gì?"** — Số vòng dây N, diện tích tiết diện lõi A, chiều dài cuộn l, và độ từ thẩm (permeability) của lõi µ. Công thức gần đúng: L ≈ µ·N²·A/l. Lõi ferrite có µ cao hơn không khí ~1000 lần → cùng kích thước cuộn, lõi ferrite cho L lớn hơn rất nhiều.

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

```
V_L = L · (dI/dt)
```

Trong đó:
- **V_L** = điện áp xuất hiện trên cuộn cảm (V).
- **L** = độ tự cảm (H).
- **dI/dt** = tốc độ thay đổi dòng điện (A/s).

**Ý nghĩa định luật Lenz:** chiều của V_L luôn ngược với chiều thay đổi — nếu dòng đang tăng, V_L sinh ra để cản lại dòng tăng. Nếu dòng đang giảm, V_L sinh ra để duy trì dòng.

💡 **Trực giác:** Đây là "quán tính điện từ". V_L không phụ thuộc vào giá trị I mà phụ thuộc vào **tốc độ thay đổi** dI/dt. Dòng 5 A đứng yên → V_L = 0. Dòng 0.1 A nhưng thay đổi cực nhanh → V_L có thể rất lớn.

### 2.2. Bốn ví dụ số cụ thể

**Ví dụ 1 — Dòng tăng chậm:**
- L = 100 mH = 0.1 H; dI/dt = 2 A/s (tăng 2 A mỗi giây).
- V_L = 0.1 × 2 = **0.2 V** — nhỏ, an toàn.

**Ví dụ 2 — Dòng tăng nhanh:**
- L = 100 mH = 0.1 H; dI/dt = 1000 A/s (tăng 1 A trong 1 ms).
- V_L = 0.1 × 1000 = **100 V** — cần chú ý trong mạch.

**Ví dụ 3 — Cuộn cảm nhỏ, dòng thay đổi rất nhanh (mạch switching):**
- L = 10 µH = 10×10⁻⁶ H; dI/dt = 5×10⁶ A/s (thay đổi 5 A trong 1 µs).
- V_L = 10×10⁻⁶ × 5×10⁶ = **50 V** — điện áp spike trong mạch SMPS.

**Ví dụ 4 — Relay cuộn điện từ bị ngắt đột ngột:**
- L = 50 mH; dòng ban đầu I₀ = 0.2 A, ngắt trong Δt ≈ 10 µs.
- dI/dt ≈ 0.2 / 10×10⁻⁶ = 20,000 A/s.
- V_L = 0.05 × 20,000 = **1,000 V** (1 kV spike!) — đây là nguyên nhân hỏng transistor nếu không bảo vệ.

⚠ **Lỗi thường gặp — Nhầm V_L với điện áp nguồn:**

V_L không phải điện áp nguồn cấp cho cuộn cảm; đó là điện áp cuộn cảm **tự sinh ra** để chống lại thay đổi dòng. Trong mạch RL mắc nối tiếp nguồn V_s, tổng điện áp: V_s = V_R + V_L = I·R + L·(dI/dt). Khi dòng ổn định (dI/dt = 0): V_L = 0, toàn bộ điện áp rơi trên R.

🔁 **Dừng lại tự kiểm tra:**

Câu hỏi: Cuộn cảm L = 5 mH có dòng tăng từ 0 lên 3 A trong 15 ms. Tính V_L.

<details>
<summary>Đáp án</summary>

dI/dt = (3 − 0) / (15×10⁻³) = 200 A/s.

V_L = L · dI/dt = 5×10⁻³ × 200 = **1 V**.

</details>

📝 **Tóm tắt mục 2**

- V_L = L·(dI/dt): điện áp tỉ lệ với **tốc độ** thay đổi dòng, không phải giá trị dòng.
- Dòng ổn định → V_L = 0 (cuộn cảm ứng xử như dây dẫn ở DC).
- Thay đổi dòng càng nhanh → V_L càng lớn → nguy cơ spike khi ngắt đột ngột.

---

## 3. Năng lượng tích lũy trong cuộn cảm

### 3.1. Công thức và ý nghĩa

Cuộn cảm mang dòng I tích lũy năng lượng trong từ trường:

```
E = ½ · L · I²
```

Đơn vị: Joule (J).

**(a) Là gì:** E là năng lượng "giam" trong từ trường bên trong và xung quanh cuộn dây. Khi dòng bị ngắt, năng lượng này cần đi đâu đó — nếu không có đường thoát, nó tạo ra spike điện áp cực lớn.

**(b) Vì sao cần:** Hiểu lượng năng lượng tích lũy giúp thiết kế mạch bảo vệ đúng cách, tính toán tổn thất trong mạch switching, và lựa chọn cuộn cảm phù hợp.

**(c) Ví dụ số:** L = 10 mH, I = 1 A → E = ½ × 0.01 × 1² = **5 mJ**.

### 3.2. Bốn ví dụ số

**Ví dụ 1 — Cuộn nhỏ, dòng nhỏ:**
- L = 100 µH, I = 0.5 A.
- E = ½ × 100×10⁻⁶ × 0.25 = **12.5 µJ** — rất nhỏ, ít nguy hiểm.

**Ví dụ 2 — Relay điển hình:**
- L = 50 mH, I = 0.2 A.
- E = ½ × 0.05 × 0.04 = **1 mJ** — nếu xả vào transistor nhỏ trong µs, tạo spike cực lớn.

**Ví dụ 3 — Cuộn cảm bộ nguồn switching:**
- L = 100 µH, I = 5 A (điển hình ở 10 A output, đập sóng 50%).
- E = ½ × 100×10⁻⁶ × 25 = **1.25 mJ** — xả/nạp mỗi chu kỳ switching.

**Ví dụ 4 — Cuộn kích từ động cơ lớn:**
- L = 2 H, I = 10 A.
- E = ½ × 2 × 100 = **100 J** — năng lượng rất lớn, spike khi ngắt có thể gây hồ quang điện.

### 3.3. So sánh trực giác với tụ điện

| Đặc điểm | Tụ điện | Cuộn cảm |
|----------|---------|----------|
| Công thức năng lượng | E = ½C·V² | E = ½L·I² |
| Giữ ổn định | Điện áp V | Dòng điện I |
| Khi bị cắt đột ngột | V nhảy vọt (overcurrent) | I nhảy vọt → spike V |
| Analogy năng lượng | Lò xo nén (thế năng) | Bánh đà quay (động năng) |
| Thời gian xả | τ = RC | τ = L/R |

Công thức ½C·V² và ½L·I² hoàn toàn đối xứng toán học — đây là biểu hiện của tính đối ngẫu (duality) giữa tụ và cuộn trong điện tử.

📝 **Tóm tắt mục 3**

- E = ½L·I²: tích lũy trong từ trường, tỉ lệ với L và I².
- Khi ngắt mạch, năng lượng này cần đường thoát — không có đường thoát → spike điện áp.
- Đối xứng hoàn toàn với tụ điện: E = ½C·V².

---

## 4. Mạch RL — Phân tích theo thời gian

### 4.1. Mạch RL nạp (Đóng công tắc)

Mạch: nguồn V_s, điện trở R và cuộn cảm L mắc nối tiếp. Tại t = 0 đóng công tắc (trước đó I = 0).

Phương trình vi phân:
```
V_s = I·R + L·(dI/dt)
```

Giải phương trình (nghiệm đặc thù + nghiệm thuần nhất):
```
I(t) = (V_s / R) · (1 − e^(−t/τ))    (mạch nạp)
```

Trong đó:
- **τ = L/R** là **hằng số thời gian** (đơn vị giây).
- **V_s/R** là dòng ổn định cuối cùng (khi t → ∞).

Mốc quan trọng:
| Thời điểm | I/I_max | Ghi chú |
|-----------|---------|---------|
| t = 0 | 0% | Dòng = 0, tất cả điện áp rơi trên L |
| t = τ | 63.2% | Mốc đặc trưng |
| t = 2τ | 86.5% | |
| t = 3τ | 95.0% | Gần ổn định |
| t = 5τ | 99.3% | Thực tế coi là ổn định |

💡 **Trực giác:** Giống tụ điện nạp điện — nhưng ở đây là **dòng** tăng dần (không phải điện áp). Ban đầu cuộn cảm "cản" toàn bộ, V_L = V_s, I = 0. Dần dần dòng tăng, V_L giảm, đến lúc dòng ổn định V_L = 0.

### 4.2. Walk-through số — ví dụ đầy đủ

**Cho:** L = 10 mH, R = 100 Ω, V_s = 12 V. Đóng công tắc tại t = 0.

**Tính τ:**
```
τ = L/R = 10×10⁻³ / 100 = 0.1 ms = 100 µs
```

**Dòng ổn định:**
```
I_max = V_s/R = 12/100 = 0.12 A = 120 mA
```

**Dòng tại các mốc:**

| t | I(t) = 120 mA · (1 − e^(−t/0.1ms)) |
|---|-------------------------------------|
| 0 µs | 0 mA |
| 100 µs (1τ) | 120 × 0.632 = **75.8 mA** |
| 200 µs (2τ) | 120 × 0.865 = **103.8 mA** |
| 300 µs (3τ) | 120 × 0.950 = **114 mA** |
| 500 µs (5τ) | 120 × 0.993 = **119.2 mA** |

**Điện áp trên cuộn cảm:**
```
V_L(t) = V_s · e^(−t/τ) = 12 · e^(−t/0.1ms)
```

Tại t = 0: V_L = 12 V (toàn bộ điện áp nguồn).
Tại t = τ: V_L = 12 × e⁻¹ ≈ 4.41 V.
Tại t = 5τ: V_L ≈ 0.08 V (gần bằng 0).

### 4.3. Mạch RL xả (Ngắt công tắc, thay bằng đường tắt)

Khi ngắt nguồn và nối tắt (ví dụ qua diode), dòng ban đầu I₀ giảm dần:

```
I(t) = I₀ · e^(−t/τ)    (mạch xả)
```

Cùng hằng số τ = L/R — mạch RL xả đối xứng với nạp.

**Walk-through xả (tiếp ví dụ trên):**

Giả sử đang ở t = 5τ (I₀ ≈ 120 mA), ngắt nguồn, dòng xả qua R:

| t sau ngắt | I(t) = 120 mA · e^(−t/0.1ms) |
|------------|-------------------------------|
| 0 (ngay sau ngắt) | 120 mA |
| 100 µs (1τ) | 120 × 0.368 = **44.2 mA** |
| 200 µs (2τ) | 120 × 0.135 = **16.2 mA** |
| 300 µs (3τ) | 120 × 0.050 = **6 mA** |
| 500 µs (5τ) | 120 × 0.007 = **0.84 mA** |

❓ **Câu hỏi tự nhiên của người đọc:**

**"τ = L/R — tại sao R lớn hơn làm τ nhỏ hơn?"** — R lớn → cản dòng nhiều hơn → dòng tăng/giảm nhanh hơn → hệ thống phản ứng nhanh hơn. Giảm R → τ lớn → phản ứng chậm hơn. Ngược với RC: τ = RC tăng khi R tăng (vì R hạn chế tốc độ nạp tụ).

**"Đơn vị của τ = L/R là gì?"** — L đơn vị H = V·s/A; R đơn vị Ω = V/A. Vậy L/R = (V·s/A)/(V/A) = s. Đúng là giây.

🔁 **Dừng lại tự kiểm tra:**

Cho mạch RL với L = 5 mH, R = 50 Ω, V_s = 5 V. Tính τ, I_max, và dòng tại t = 2τ.

<details>
<summary>Đáp án</summary>

τ = L/R = 5×10⁻³ / 50 = **0.1 ms**.

I_max = V_s/R = 5/50 = **0.1 A = 100 mA**.

Tại t = 2τ: I = 100 mA × (1 − e⁻²) = 100 × (1 − 0.135) = 100 × 0.865 = **86.5 mA**.

</details>

📝 **Tóm tắt mục 4**

- Mạch RL nạp: I(t) = (V_s/R)·(1 − e^(−t/τ)); xả: I(t) = I₀·e^(−t/τ).
- Hằng số thời gian **τ = L/R** (giây).
- Mốc: 1τ = 63.2%, 3τ ≈ 95%, 5τ ≈ 99.3%.
- Dòng ổn định: I_max = V_s/R (cuộn cảm như dây dẫn ở DC).

---

## 5. Hiện tượng spike điện áp khi ngắt mạch

### 5.1. Cơ chế vật lý

Khi công tắc ngắt đột ngột (không có đường thoát cho dòng), dòng qua cuộn cảm bị ép về 0 rất nhanh. Theo V_L = L·(dI/dt):

```
Δt → 0  ⟹  dI/dt → ∞  ⟹  V_L → ∞
```

Trong thực tế, công tắc cơ khí tạo tia lửa (hồ quang), transistor có thể bị đánh thủng lớp oxide cách điện, hoặc điện áp spike làm hỏng các linh kiện lân cận trên mạch.

⚠ **Lỗi nguy hiểm thường gặp:**

Nhiều người mới học thấy mạch relay hoạt động tốt lâu dài, sau đó transistor điều khiển chết đột ngột không rõ lý do. Nguyên nhân thường là: không dùng diode flyback bảo vệ → mỗi lần ngắt relay tạo spike ngược ≥100 V vào cực C-E transistor → transistor chịu đựng nhiều lần rồi suy giảm dần và chết.

### 5.2. Ví dụ số — Spike nguy hiểm

**Relay:** L = 50 mH, I = 0.1 A. Transistor ngắt trong Δt = 5 µs:
```
dI/dt = 0.1 / 5×10⁻⁶ = 20,000 A/s
V_spike = L × dI/dt = 0.05 × 20,000 = 1,000 V
```

Transistor chịu 40 V tối đa → spike 1,000 V → **hỏng ngay lần đầu tiên**.

### 5.3. Bảo vệ bằng diode flyback (freewheeling diode)

**Giải pháp:** Mắc một diode ngược cực song song với cuộn cảm (anode vào cực âm nguồn, cathode vào cực dương). Khi hoạt động bình thường (cuộn cảm đang được cấp điện), diode bị phân cực ngược → không dẫn, không ảnh hưởng mạch.

Khi ngắt công tắc: dòng cuộn cảm không thể dừng ngay → diode phân cực thuận → dòng tiếp tục chạy vòng qua diode và R, giảm dần theo I(t) = I₀·e^(−t/τ). Điện áp chỉ lên đến 0.7 V (điện áp thuận diode) thay vì hàng trăm V.

💡 **Diode flyback là "cửa thoát hiểm" cho năng lượng từ trường.** Không có cửa thoát → năng lượng phá vỡ linh kiện yếu nhất. Có diode → năng lượng giải phóng lành mạnh qua cuộn R, biến thành nhiệt từ từ.

**Linh kiện bảo vệ khác:**
- **TVS diode** (Transient Voltage Suppressor): phản ứng nhanh hơn diode thường, kẹp điện áp ở mức cụ thể.
- **MOV** (Metal Oxide Varistor): dùng ở điện áp cao hơn.
- **RC snubber**: tụ C hấp thụ spike, R hạn chế dao động.

> Xem chi tiết mạch bảo vệ và diode ở [Lesson 02 — Tầng 2 (chưa có)].

📝 **Tóm tắt mục 5**

- Ngắt dòng cuộn cảm đột ngột → spike V_L = L·dI/dt rất lớn.
- Spike có thể đánh thủng transistor, IC điều khiển, gây hồ quang.
- Bảo vệ bắt buộc: **diode flyback** (freewheeling diode) mắc song song ngược cực với cuộn cảm.

---

## 6. Ứng dụng thực tế của cuộn cảm

### 6.1. Relay điện từ

Relay dùng cuộn cảm tạo từ trường kéo một tiếp điểm cơ khí. Cho phép dòng nhỏ (điều khiển, ví dụ từ vi điều khiển 5 V/20 mA) điều khiển mạch dòng lớn (220 V AC, vài ampe).

**Bắt buộc có diode flyback** khi dùng transistor điều khiển relay (xem mục 5).

### 6.2. Biến áp (Transformer)

Hai cuộn dây quấn quanh lõi chung — năng lượng truyền qua từ trường lõi. Biến áp hoạt động ở AC; ở DC dòng ổn định, không có thay đổi từ trường → không truyền năng lượng.

Tỉ số điện áp = tỉ số số vòng: V₁/V₂ = N₁/N₂.

### 6.3. Cuộn lọc trong bộ nguồn

Mạch LC lọc sóng hài (ripple) từ mạch chỉnh lưu hoặc bộ nguồn switching. Cuộn cảm "làm phẳng" dòng điện (chống thay đổi đột ngột); tụ điện "làm phẳng" điện áp. Cả hai phối hợp tạo bộ lọc thông thấp LC.

### 6.4. Mạch boost converter (tăng áp)

Cuộn cảm là linh kiện trung tâm trong mạch boost. Khi switch đóng: năng lượng nạp vào L. Khi switch ngắt: L "đẩy" dòng qua diode vào tụ đầu ra — điện áp đầu ra cao hơn điện áp đầu vào. Ứng dụng: sạc pin, LED driver.

### 6.5. Động cơ điện và loa

Cuộn dây trong từ trường stator tạo lực (F = B·I·L). Thay đổi dòng → thay đổi lực → chuyển động cơ học. Loa hoạt động theo nguyên lý tương tự: dòng AC âm thanh → lực dao động màng loa → sóng âm.

---

## 7. Bài tập + Lời giải chi tiết

### Bài tập

**Bài 1:** Cuộn cảm L = 20 mH có dòng tăng từ 0 lên 4 A trong 8 ms. Tính điện áp xuất hiện trên cuộn cảm.

**Bài 2:** Cuộn cảm L = 150 µH mang dòng I = 3 A. Tính năng lượng từ trường tích lũy trong cuộn cảm. So sánh với tụ điện C = 470 µF điện áp V = 12 V.

**Bài 3:** Mạch RL: L = 50 mH, R = 200 Ω, V_s = 10 V. Tính:
(a) Hằng số thời gian τ.
(b) Dòng ổn định I_max.
(c) Dòng tại t = τ, t = 2τ, t = 3τ.
(d) Điện áp trên cuộn cảm tại t = 0 và t = τ.

**Bài 4:** Relay có L = 80 mH, I = 0.15 A. Transistor NPN điều khiển relay bị ngắt trong Δt = 2 µs. Tính spike điện áp. Transistor có V_CE_max = 30 V — có bị hỏng không?

**Bài 5:** Mạch RL đang hoạt động với L = 10 mH, R = 50 Ω, V_s = 6 V. Sau khi dòng đạt ổn định, ngắt nguồn (dòng xả qua R). Tính:
(a) Dòng ban đầu lúc bắt đầu xả.
(b) Hằng số thời gian xả τ.
(c) Dòng sau 3τ.
(d) Năng lượng ban đầu trong cuộn cảm.

**Bài 6 (nâng cao):** Mạch RL có L = 200 µH, R = 40 Ω. Nguồn V_s = 8 V được đóng vào lúc t = 0.
(a) Sau bao lâu dòng đạt 95% giá trị ổn định?
(b) Tại thời điểm đó, điện áp rơi trên L là bao nhiêu?
(c) Năng lượng tích lũy trong L tại thời điểm đó?

### Lời giải chi tiết

**Bài 1:**

Bước 1: Tính tốc độ thay đổi dòng.
```
dI/dt = ΔI/Δt = (4 − 0) / (8×10⁻³) = 500 A/s
```

Bước 2: Áp dụng định luật cảm ứng.
```
V_L = L · dI/dt = 20×10⁻³ × 500 = 10 V
```

**Kết quả: V_L = 10 V.** Điện áp này chống lại sự tăng dòng (theo định luật Lenz).

---

**Bài 2:**

Năng lượng cuộn cảm:
```
E_L = ½ · L · I² = ½ × 150×10⁻⁶ × 3² = ½ × 150×10⁻⁶ × 9 = 675×10⁻⁶ J = 0.675 mJ
```

Năng lượng tụ điện:
```
E_C = ½ · C · V² = ½ × 470×10⁻⁶ × 12² = ½ × 470×10⁻⁶ × 144 = 33,840×10⁻⁶ J = 33.84 mJ
```

**So sánh:** E_C / E_L = 33.84 / 0.675 ≈ 50 lần lớn hơn. Tụ điện 470 µF/12 V tích lũy năng lượng gấp 50 lần cuộn 150 µH/3 A. Đây là lý do bộ nguồn dùng cả tụ lẫn cuộn nhưng tụ thường có năng lượng dự phòng lớn hơn.

---

**Bài 3:**

**(a) Hằng số thời gian:**
```
τ = L/R = 50×10⁻³ / 200 = 0.25×10⁻³ s = 0.25 ms
```

**(b) Dòng ổn định:**
```
I_max = V_s/R = 10/200 = 0.05 A = 50 mA
```

**(c) Dòng tại các mốc thời gian:**

Công thức: I(t) = 50 mA · (1 − e^(−t/0.25ms))

- t = τ = 0.25 ms: I = 50 × (1 − e⁻¹) = 50 × 0.632 = **31.6 mA**
- t = 2τ = 0.5 ms: I = 50 × (1 − e⁻²) = 50 × 0.865 = **43.2 mA**
- t = 3τ = 0.75 ms: I = 50 × (1 − e⁻³) = 50 × 0.950 = **47.5 mA**

**(d) Điện áp trên cuộn cảm:**

Công thức: V_L(t) = V_s · e^(−t/τ) = 10 · e^(−t/0.25ms)

- t = 0: V_L = 10 · e⁰ = **10 V** (toàn bộ điện áp nguồn rơi trên L lúc ban đầu)
- t = τ = 0.25 ms: V_L = 10 · e⁻¹ = 10 × 0.368 = **3.68 V**

Kiểm tra tại t = τ: V_R = I × R = 31.6×10⁻³ × 200 = 6.32 V. V_R + V_L = 6.32 + 3.68 = 10 V = V_s ✓

---

**Bài 4:**

Bước 1: Tính tốc độ thay đổi dòng khi ngắt.
```
dI/dt = I₀ / Δt = 0.15 / (2×10⁻⁶) = 75,000 A/s
```

Bước 2: Tính spike điện áp.
```
V_spike = L · dI/dt = 80×10⁻³ × 75,000 = 6,000 V = 6 kV
```

**Kết luận:** Transistor có V_CE_max = 30 V. Spike 6,000 V >> 30 V → **transistor bị phá hủy ngay lập tức**.

Giải pháp: mắc diode flyback (1N4007 hoặc tương đương) song song ngược cực với relay. Khi ngắt, dòng xả qua diode, V_CE_transistor chỉ lên đến V_source + 0.7 V (điện áp thuận diode), hoàn toàn an toàn.

---

**Bài 5:**

**(a) Dòng ban đầu lúc xả:**

Dòng ổn định khi nạp:
```
I₀ = V_s / R = 6 / 50 = 0.12 A = 120 mA
```

**(b) Hằng số thời gian xả:**
```
τ = L/R = 10×10⁻³ / 50 = 0.2 ms
```

(Cùng τ với lúc nạp — hằng số thời gian không phụ thuộc chiều nạp hay xả.)

**(c) Dòng sau 3τ:**
```
I(3τ) = I₀ · e^(−3) = 120 × 0.050 = 6 mA
```

Còn 5% dòng ban đầu — gần như đã xả xong.

**(d) Năng lượng ban đầu:**
```
E = ½ · L · I₀² = ½ × 10×10⁻³ × (0.12)² = ½ × 10⁻² × 0.0144 = 7.2×10⁻⁵ J = 72 µJ
```

Năng lượng này được giải phóng qua R dưới dạng nhiệt trong quá trình xả.

---

**Bài 6:**

**(a) Thời gian đạt 95% I_max:**

Dòng đạt 95% tại t = 3τ:
```
τ = L/R = 200×10⁻⁶ / 40 = 5×10⁻⁶ s = 5 µs
t = 3τ = 15 µs
```

**(b) Điện áp trên L tại t = 3τ:**
```
V_L(3τ) = V_s · e^(−3) = 8 × 0.050 = 0.4 V
```

(Rất nhỏ — cuộn cảm gần như hoàn toàn "trong suốt" với DC ở trạng thái ổn định.)

**(c) Năng lượng tích lũy tại t = 3τ:**

Dòng tại t = 3τ:
```
I(3τ) = (V_s/R) · (1 − e⁻³) = (8/40) × 0.950 = 0.2 × 0.950 = 0.190 A
```

Năng lượng:
```
E = ½ · L · I² = ½ × 200×10⁻⁶ × (0.190)² = 100×10⁻⁶ × 0.0361 = 3.61×10⁻⁶ J = 3.61 µJ
```

---

## 8. Liên kết và bài tiếp theo

- **Bài trước:** [Lesson 04 — Tụ điện & Mạch RC](../lesson-04-capacitor-rc/) — so sánh trực tiếp tụ và cuộn cảm.
- **Vật lý nền:** [Cảm ứng điện từ](../../../Physics/02-Thermo-Electromagnetism/lesson-07-magnetism-induction/) — định luật Faraday, từ trường cuộn dây.
- **Bài tiếp theo:** [Lesson 06 — AC, Trở kháng & Mạch RLC](../lesson-06-ac-impedance-rlc/) — cuộn cảm ở tần số AC có trở kháng X_L = 2πfL; kết hợp R, L, C trong mạch cộng hưởng.
- **Diode flyback chi tiết:** Lesson 02, Tầng 2 — Diodes & Protection Circuits (chưa có).

---

## 📝 Tổng kết Lesson 05

1. **Cuộn cảm** = cuộn dây tạo từ trường; đặc tính cốt lõi là **cưỡng lại thay đổi dòng điện**. Analogy: bánh đà / quán tính.
2. **V_L = L·(dI/dt)**: điện áp tỉ lệ với tốc độ thay đổi dòng. Dòng ổn định → V_L = 0.
3. **E = ½L·I²**: năng lượng tích lũy trong từ trường. Đối xứng với tụ: E = ½C·V².
4. **Mạch RL**: I(t) = (V_s/R)·(1−e^(−t/τ)) khi nạp; I(t) = I₀·e^(−t/τ) khi xả; **τ = L/R**.
5. **Spike điện áp khi ngắt**: nguy hiểm, phải dùng **diode flyback** để bảo vệ.
6. **Ứng dụng**: relay, biến áp, bộ lọc LC, boost converter, động cơ điện.

**Tiếp theo:** [Lesson 06 — AC, Trở kháng & Mạch RLC](../lesson-06-ac-impedance-rlc/)

**Minh họa tương tác:** [visualization.html](./visualization.html)
