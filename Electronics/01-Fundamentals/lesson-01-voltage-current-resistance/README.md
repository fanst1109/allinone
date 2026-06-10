# Lesson 01 — Điện áp, Dòng điện, Điện trở

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Hiểu **dòng điện (current) I** là dòng chuyển dời điện tích, $I = Q/t$, đơn vị Ampe (A).
- Hiểu **điện áp (voltage) V** là "áp lực" đẩy dòng điện, đơn vị Volt (V).
- Hiểu **điện trở (resistance) R** là đại lượng cản trở dòng điện, đơn vị Ohm (Ω).
- Nắm vững **Định luật Ohm $V = I \cdot R$** — nền tảng của mọi phân tích mạch điện.
- Tính **công suất điện $P = V \cdot I = I^2 R = V^2/R$**, đơn vị Watt (W).
- Biết vì sao điện trở nóng và có thể cháy khi vượt công suất định mức.

## Kiến thức tiền đề

- [Physics — Lesson 06: Dòng điện & Mạch điện](../../../Physics/02-Thermo-Electromagnetism/lesson-06-current-circuits/) — nền vật lý về điện tích, điện thế, dòng điện.

---

## 1. Điện tích & Dòng điện

### 1.1. Điện tích là gì?

**Điện tích (electric charge)** là thuộc tính cơ bản của vật chất. Có hai loại: dương (+) và âm (−). Đơn vị: Coulomb (C).

- Electron mang điện tích âm: $q = -1.6 \times 10^{-19}$ C.
- Proton mang điện tích dương: $q = +1.6 \times 10^{-19}$ C.
- 1 Coulomb $\approx 6.24 \times 10^{18}$ electron.

### 1.2. Dòng điện (Current)

💡 **Trực giác — Analogy dòng nước**: Hãy hình dung một ống nước. Dòng điện giống dòng nước chảy qua ống — số lượng điện tích đi qua một điểm trong một giây.

**Định nghĩa chính thức**:

Dòng điện $I$ = lượng điện tích $Q$ đi qua một tiết diện trong thời gian $t$:

$$I = \frac{Q}{t}$$

- **$I$**: Cường độ dòng điện (A — Ampe).
- **$Q$**: Điện tích (C — Coulomb).
- **$t$**: Thời gian (s — giây).

**Đơn vị thực tế**:
- 1 A = 1 C/s (1 Ampe = 1 Coulomb mỗi giây)
- mA (miliampe) $= 10^{-3}$ A — dùng cho mạch điện tử nhỏ
- µA (microampe) $= 10^{-6}$ A — dùng cho cảm biến, vi mạch

**Quy ước chiều dòng điện (conventional current)**: Trong lịch sử, người ta quy ước dòng điện chạy từ cực dương (+) sang cực âm (−) — ngược chiều với chiều dịch chuyển thực tế của electron (electron chạy từ âm sang dương). Quy ước này được giữ nguyên đến ngày nay vì tính nhất quán trong các phương trình mạch điện.

⚠ **Lỗi thường gặp**: Nhiều người nhầm chiều dòng điện với chiều chuyển động electron. Trong tính toán mạch điện, **luôn dùng quy ước chiều dương → âm** (conventional current). Chỉ khi học vật lý bán dẫn mới cần phân biệt electron và hole.

**Bốn ví dụ số**:

- Ví dụ 1: Pin AA cấp 2700 mAh. Nếu mạch dùng $I = 100$ mA → thời gian dùng $= 2700/100 =$ **27 giờ**.
- Ví dụ 2: Bóng đèn LED 20 mA hoạt động trong 1 giờ = 3600 s. $Q = I \cdot t = 0.020 \times 3600 =$ **72 C** điện tích đã đi qua.
- Ví dụ 3: Máy sạc điện thoại 2 A trong 1.5 giờ. $Q = 2 \times 5400 =$ **10,800 C ≈ 3 Ah**.
- Ví dụ 4: Lò vi sóng 5 A, hoạt động 3 phút. $Q = 5 \times 180 =$ **900 C**.

🔁 **Dừng lại tự kiểm tra**: Một mạch đèn nhấp nháy hoạt động 24 giờ với dòng trung bình 15 mA. Tính tổng điện tích đi qua.

<details>
<summary>Xem đáp án</summary>

$t = 24 \times 3600 = 86{,}400$ s

$Q = I \times t = 0.015 \times 86{,}400 =$ **1,296 C**

</details>

### 📝 Tóm tắt mục 1

- Dòng điện $I = Q/t$, đơn vị Ampe (A).
- Quy ước chiều: dương → âm (ngược chiều electron).
- Đơn vị thực tế: mA ($10^{-3}$ A), µA ($10^{-6}$ A).
- 1 Coulomb $\approx 6.24 \times 10^{18}$ electron đi qua mặt cắt.

---

## 2. Điện áp (Voltage)

### 2.1. Định nghĩa

💡 **Trực giác — Analogy chênh lệch độ cao**: Dòng nước chảy vì có sự chênh lệch độ cao (áp suất). Điện áp chính là "chênh lệch độ cao" trong thế giới điện — nó tạo ra "lực đẩy" khiến điện tích di chuyển.

Không có điện áp → không có dòng điện, giống như đặt hai đầu ống nước ở cùng độ cao → nước không chảy.

**Điện áp $V$** (còn gọi là hiệu điện thế — potential difference) = năng lượng cần thiết để di chuyển một đơn vị điện tích từ điểm này sang điểm kia:

$$V = \frac{W}{Q}$$

- **$V$**: Điện áp (V — Volt).
- **$W$**: Năng lượng (J — Joule).
- **$Q$**: Điện tích (C — Coulomb).

Đơn vị: **Volt (V)**. 1 V = 1 J/C (1 Volt = 1 Joule mỗi Coulomb).

**Ý nghĩa vật lý**: 1 Volt nghĩa là cần 1 Joule năng lượng để đẩy 1 Coulomb điện tích qua chênh lệch thế đó.

**Vì sao cần khái niệm này?** Bởi vì điện áp là đại lượng "tiềm năng" — nó tồn tại ngay cả khi không có dòng chảy (như chênh lệch độ cao tồn tại ngay cả khi van ống nước đang đóng). Điện áp là nguyên nhân, dòng điện là hệ quả.

**Liên hệ Physics**: Điện áp $V$ chính là hiệu điện thế (potential difference) $\Delta V = V_A - V_B$ giữa hai điểm A và B. Điện tích dương di chuyển từ nơi thế cao sang thế thấp.

**Đơn vị thực tế**:
- mV (milivolt) $= 10^{-3}$ V — tín hiệu cảm biến nhỏ
- V (Volt) — pin, nguồn thông thường
- kV (kilovolt) $= 10^{3}$ V — đường dây cao thế

**Bốn ví dụ số**:

- Ví dụ 1: Pin AA = **1.5 V**. Để đẩy 1 C qua mạch, pin cấp 1.5 J năng lượng.
- Ví dụ 2: Nguồn USB = **5 V**. Sạc điện thoại với $Q = 10{,}800$ C → $W = V \cdot Q = 5 \times 10{,}800 =$ **54,000 J = 54 kJ** năng lượng cấp.
- Ví dụ 3: Điện nhà ở Việt Nam: **220 V AC** (xoay chiều). Mạch điện tử thường dùng 3.3 V hoặc 5 V DC.
- Ví dụ 4: Cảm biến nhiệt độ PT100 xuất tín hiệu **~10 mV/°C** — phải khuếch đại trước khi đọc bằng vi điều khiển.

❓ **Câu hỏi tự nhiên của người đọc**:

**Hỏi: Điện áp đo giữa hai điểm hay tại một điểm?**
Đáp: Điện áp LUÔN là đại lượng **tương đối** — đo giữa HAI điểm. "Điện áp 5 V tại chân A của vi điều khiển" thực ra là "5 V so với GND (mass/ground)". Không có nghĩa "điện áp tuyệt đối" — chỉ có hiệu điện thế.

**Hỏi: Tại sao pin 9 V vẫn nối vào người không chết?**
Đáp: Vì da khô có điện trở rất cao (~100 kΩ), dòng qua người $= 9/100{,}000 = 0.09$ mA — quá nhỏ để gây nguy hiểm. Nguy hiểm bắt đầu từ ~10 mA qua tim. Điện 220V AC nguy hiểm vì ngay cả với da khô vẫn tạo ra dòng đủ lớn.

🔁 **Dừng lại tự kiểm tra**: Pin 9V cấp năng lượng $W = 2$ J để đẩy một lượng điện tích. Hỏi lượng điện tích $Q$ đó là bao nhiêu?

<details>
<summary>Xem đáp án</summary>

$Q = W/V = 2/9 \approx$ **0.222 C**

</details>

### 📝 Tóm tắt mục 2

- Điện áp $V = W/Q$, đơn vị Volt (V = J/C).
- Điện áp là đại lượng tương đối — đo giữa hai điểm.
- Không có điện áp → không có dòng điện.
- Đơn vị thực tế: mV, V, kV.

---

## 3. Điện trở (Resistance)

### 3.1. Định nghĩa

💡 **Trực giác — Analogy ống hẹp**: Trong hệ thống nước, ống càng hẹp hoặc dài → nước chảy càng khó → lưu lượng giảm. Điện trở cũng vậy — nó "cản" dòng điện. Cùng điện áp, điện trở càng cao → dòng điện càng nhỏ.

**Điện trở $R$** = đại lượng đo mức độ cản trở dòng điện của một vật dẫn:

$$R = \frac{V}{I}$$

Đơn vị: **Ohm (Ω)**. 1 Ω = 1 V/A.

**Ý nghĩa vật lý**: 1 Ohm nghĩa là khi đặt 1 Volt qua vật dẫn, chỉ có 1 Ampe chảy qua — điện trở "tiêu hao" điện áp để duy trì dòng.

**Vì sao cần điện trở?** Trong mạch thực tế, điện trở dùng để:
- Giới hạn dòng qua LED (tránh cháy LED).
- Phân chia điện áp (voltage divider).
- Đặt điểm làm việc (bias point) cho transistor.
- Chuyển tín hiệu dòng thành điện áp.

**Đơn vị thực tế**:
- Ω (Ohm) — giá trị nhỏ
- kΩ (kilohm) $= 10^{3}$ Ω — phổ biến nhất trong mạch điện tử
- MΩ (megaohm) $= 10^{6}$ Ω — điện trở rất lớn

### 3.2. Yếu tố ảnh hưởng đến điện trở — R = ρL/A

Điện trở của một dây dẫn phụ thuộc vào:

$$R = \frac{\rho \, L}{A}$$

- **$\rho$** (rho): điện trở suất (resistivity) của vật liệu, đơn vị Ω·m.
- **$L$**: chiều dài dây (m) — dài hơn → $R$ lớn hơn.
- **$A$**: tiết diện ngang (m²) — rộng hơn → $R$ nhỏ hơn (ít cản hơn).

| Vật liệu | ρ (Ω·m) | Đặc điểm |
|----------|---------|-----------|
| Đồng (Cu) | $1.68 \times 10^{-8}$ | Dây dẫn phổ biến nhất |
| Nhôm (Al) | $2.82 \times 10^{-8}$ | Nhẹ hơn Cu, dùng đường dây cao thế |
| Vonfram (W) | $5.6 \times 10^{-8}$ | Dây tóc bóng đèn |
| Nichrome | $1.1 \times 10^{-6}$ | Dây điện trở trong bếp điện |
| Silicon | ~640 | Bán dẫn — giữa dẫn điện và cách điện |
| Thủy tinh | $\sim 10^{12}$ | Cách điện |

**Ý nghĩa thực tế của $R = \rho L/A$**:
- Dây điện nhà dài → kháng trở đường dây → sụt áp → nên dùng dây tiết diện lớn cho thiết bị công suất cao.
- PCB trace mỏng dài → cộng điện trở nhỏ nhưng đáng kể trong mạch cao tần.

**Bốn ví dụ số**:

- Ví dụ 1: Dây đồng dài $L = 10$ m, tiết diện $A = 1$ mm² $= 10^{-6}$ m². $R = 1.68 \times 10^{-8} \times 10 / 10^{-6} =$ **0.168 Ω**.
- Ví dụ 2: Cùng dây nhưng dài gấp đôi ($L = 20$ m): $R =$ **0.336 Ω** (tuyến tính theo $L$).
- Ví dụ 3: Dây đồng $L = 1$ m, tiết diện tăng lên $A = 4$ mm² $= 4 \times 10^{-6}$ m²: $R = 1.68 \times 10^{-8} \times 1 / (4 \times 10^{-6}) =$ **0.0042 Ω** — tiết diện 4× thì $R$ giảm 4×.
- Ví dụ 4: Điện trở Nichrome dùng trong bếp điện: $L = 2$ m, $A = 0.5$ mm² $= 5 \times 10^{-7}$ m². $R = 1.1 \times 10^{-6} \times 2 / (5 \times 10^{-7}) =$ **4.4 Ω** — điện trở cao chủ đích để tỏa nhiệt.

⚠ **Lỗi thường gặp**: Nhầm lẫn giữa điện trở suất $\rho$ (thuộc tính vật liệu) và điện trở $R$ (thuộc tính của một linh kiện cụ thể). Cùng vật liệu ($\rho$ như nhau) nhưng dây dài và ngắn có $R$ khác nhau.

🔁 **Dừng lại tự kiểm tra**: Dây đồng dài 5 m, tiết diện 2 mm². Tính điện trở của đoạn dây này.

<details>
<summary>Xem đáp án</summary>

$A = 2$ mm² $= 2 \times 10^{-6}$ m²

$R = \dfrac{\rho L}{A} = \dfrac{1.68 \times 10^{-8} \times 5}{2 \times 10^{-6}} = \dfrac{8.4 \times 10^{-8}}{2 \times 10^{-6}} =$ **0.042 Ω**

Rất nhỏ — dây đồng ngắn gần như không cản dòng điện.

</details>

### 📝 Tóm tắt mục 3

- Điện trở $R = V/I$, đơn vị Ohm (Ω = V/A).
- $R = \rho L/A$ — phụ thuộc vật liệu, chiều dài, tiết diện.
- Đơn vị thực tế: Ω, kΩ, MΩ.
- Đồng có $\rho$ rất nhỏ (dẫn điện tốt); điện trở Nichrome có $\rho$ lớn (tỏa nhiệt).

---

## 4. Định luật Ohm

### 4.1. Phát biểu

💡 **Trực giác**: Cùng ống nước, áp suất càng cao → lưu lượng càng lớn. Điện áp càng lớn → dòng điện càng lớn. Ống càng hẹp (điện trở cao) → dòng càng nhỏ. Ba đại lượng $V, I, R$ liên hệ tuyến tính — đó là Định luật Ohm.

**Định luật Ohm**: Điện áp qua một điện trở tỉ lệ thuận với dòng điện chạy qua nó:

$$V = I \cdot R$$

Hay suy ra:

$$I = \frac{V}{R} \qquad R = \frac{V}{I}$$

Đây là phương trình trung tâm của phân tích mạch điện — mọi tính toán đều bắt đầu từ đây.

**Tam giác Ohm** — công cụ nhớ nhanh:

```
      V
    -----
    I × R
```

Che V → tính V = I×R. Che I → tính I = V/R. Che R → tính R = V/I.

### 4.2. Walk-through — 5 ví dụ số

**Ví dụ 1 — Tính V** (tình huống: tính điện áp rơi trên điện trở):

Dòng $I = 0.5$ A chạy qua điện trở $R = 220$ Ω.

$$V = I \times R = 0.5 \times 220 = \textbf{110 V}$$

---

**Ví dụ 2 — Tính I** (tình huống: LED cần điện trở giới hạn dòng):

Nguồn 5 V, điện trở $R = 330$ Ω.

$$I = \frac{V}{R} = \frac{5}{330} = 0.01515 \text{ A} \approx \textbf{15.15 mA}$$

→ Phù hợp để thắp sáng LED (thường cần 10–20 mA).

---

**Ví dụ 3 — Tính R** (tình huống: thiết kế mạch cần biết điện trở bao nhiêu):

Nguồn 12 V, muốn dòng $I = 24$ mA $= 0.024$ A.

$$R = \frac{V}{I} = \frac{12}{0.024} = \textbf{500 Ω}$$

→ Chọn điện trở gần nhất trên dãy chuẩn E24: 510 Ω.

---

**Ví dụ 4 — Đổi đơn vị (mA và kΩ)**:

Điện áp $V = 3.3$ V, điện trở $R = 10$ kΩ $= 10{,}000$ Ω.

$$I = \frac{V}{R} = \frac{3.3}{10{,}000} = 0.00033 \text{ A} = \textbf{0.33 mA} = 330 \text{ µA}$$

→ Dòng tiêu thụ rất nhỏ — điển hình cho mạch phân áp đầu vào ADC vi điều khiển.

---

**Ví dụ 5 — Kết hợp đơn vị hỗn hợp**:

Mạch đo nhiệt độ: $V = 5$ V, $R = 2.2$ kΩ $= 2200$ Ω.

$I = 5/2200 =$ **2.27 mA**. Kiểm tra: $V = I \times R = 0.00227 \times 2200 =$ **5.0 V** ✓

❓ **Câu hỏi tự nhiên của người đọc**:

**Hỏi: Định luật Ohm có luôn đúng không?**
Đáp: KHÔNG. Định luật Ohm chỉ đúng với **điện trở tuyến tính (ohmic resistor)** — vật liệu mà điện trở không thay đổi theo điện áp hoặc dòng điện (như dây điện trở kim loại ở nhiệt độ ổn định). Nhiều linh kiện **không** tuân theo: diode (điện trở thay đổi theo chiều dòng), transistor, LED, bóng đèn dây tóc nóng lên ($\rho$ tăng theo nhiệt độ). Trong bài này ta chỉ xét điện trở lý tưởng.

**Hỏi: Dùng V=IR hay I=V/R?**
Đáp: Ba dạng tương đương nhau — dùng dạng nào tùy ẩn số cần tìm. Thực hành đủ thì nhớ tự nhiên.

⚠ **Lỗi thường gặp**: Quên đổi đơn vị trước khi tính. Ví dụ sai: $V = 5$ V, $R = 10$ kΩ → $I = 5/10 = 0.5$ A (SAI — vì 10 kΩ ≠ 10 Ω). Đúng: $I = 5/10{,}000 = 0.5$ mA.

🔁 **Dừng lại tự kiểm tra**: Vi điều khiển xuất tín hiệu 3.3 V qua điện trở 4.7 kΩ. Tính dòng qua điện trở (đơn vị mA).

<details>
<summary>Xem đáp án</summary>

$R = 4.7$ kΩ $= 4700$ Ω

$I = \dfrac{V}{R} = \dfrac{3.3}{4700} = 0.000702 \text{ A} =$ **0.702 mA**

</details>

### 📝 Tóm tắt mục 4

- Định luật Ohm: $V = I \cdot R$ (hay $I = V/R$, $R = V/I$).
- Ba dạng tương đương — dùng tùy ẩn số.
- Định luật chỉ đúng với điện trở tuyến tính (ohmic).
- Luôn đổi đơn vị về cùng hệ trước khi tính (kΩ → Ω; mA → A).

---

## 5. Công suất điện

### 5.1. Định nghĩa

💡 **Trực giác**: Công suất đo "tốc độ tiêu hao năng lượng". Hai điện trở cùng dòng 1 A — điện trở 100 Ω tỏa nhiệt nhanh hơn 10 Ω vì nó "cản" nhiều hơn và biến điện năng thành nhiệt nhiều hơn.

**Công suất điện $P$** = năng lượng tiêu thụ trên đơn vị thời gian:

$$P = V \cdot I$$

Kết hợp với $V = I \cdot R$, suy ra 3 dạng công thức tương đương:

$$P = V \cdot I = I^2 \cdot R = \frac{V^2}{R}$$

Đơn vị: **Watt (W)**. 1 W = 1 J/s = 1 V·A.

**Ý nghĩa vật lý**: Công suất là năng lượng điện biến thành nhiệt (hoặc ánh sáng, cơ năng...) mỗi giây trong điện trở. Điện trở chỉ toả nhiệt — không làm việc cơ học hay phát sáng hữu ích như động cơ hay LED.

**Vì sao cần 3 dạng công thức?** Vì thực tế có khi biết $V$ và $R$ (chưa đo được $I$), có khi biết $I$ và $R$ (nguồn dòng), có khi biết cả $V$ và $I$. Ba dạng cho phép tính nhanh mà không cần tính trung gian.

### 5.2. Walk-through — Điện trở nóng/cháy vì sao

**Bài toán**: Điện trở $R = 220$ Ω, dòng $I = 50$ mA $= 0.05$ A. Tính công suất tiêu thụ.

**Dạng 1** (dùng $I^2 \cdot R$):
$$P = I^2 \times R = (0.05)^2 \times 220 = 0.0025 \times 220 = \textbf{0.55 W}$$

**Dạng 2** (tính V trước rồi dùng $V \cdot I$):
$$V = I \times R = 0.05 \times 220 = 11 \text{ V}$$
$$P = V \times I = 11 \times 0.05 = \textbf{0.55 W} \;\checkmark$$
(kết quả đồng nhất)

**Nhận xét quan trọng**: Điện trở thông thường trên thị trường có **công suất định mức (rated power)**: 1/8 W, 1/4 W, 1/2 W, 1 W. Điện trở 220 Ω loại 1/4 W (= 0.25 W) sẽ bị **quá tải** (0.55 W > 0.25 W) → nhiệt độ vượt giới hạn → điện trở cháy hoặc thay đổi giá trị vĩnh viễn.

**Nguyên tắc thiết kế thực hành**: Chọn điện trở có công suất định mức **ít nhất gấp 2 lần** công suất tính toán (derating 50%). Với bài trên: $P_{\text{tính}} = 0.55$ W → chọn điện trở **1 W** để an toàn.

**Bốn ví dụ số tiếp theo**:

- Ví dụ 1: LED cần 20 mA, điện trở giới hạn 150 Ω. $P = (0.02)^2 \times 150 =$ **0.06 W = 60 mW** → điện trở 1/8 W (125 mW) là đủ.
- Ví dụ 2: Điện trở pull-up 10 kΩ trên đường tín hiệu 5 V. $P = V^2/R = 25/10{,}000 =$ **0.0025 W = 2.5 mW** — cực kỳ nhỏ, 1/8 W dư sức.
- Ví dụ 3: Cầu chia áp 2 điện trở 1 kΩ, nguồn 12 V. Tổng $R = 2$ kΩ, $I = 12/2000 = 6$ mA. $P$ mỗi điện trở $= I^2 \times R = (0.006)^2 \times 1000 =$ **0.036 W = 36 mW** → 1/8 W đủ.
- Ví dụ 4: Mạch hàn chì dùng điện trở 10 Ω, dòng 500 mA. $P = (0.5)^2 \times 10 =$ **2.5 W** → phải dùng điện trở 5W có tản nhiệt, không phải loại nhỏ 1/4 W.

❓ **Câu hỏi tự nhiên của người đọc**:

**Hỏi: Năng lượng điện biến đi đâu khi điện trở tỏa nhiệt?**
Đáp: Biến thành nhiệt — điện tử va chạm vào ion kim loại trong tinh thể → dao động nhiệt. Đây là hiệu ứng **Joule heating**. Không thể lấy lại — đây là lý do đường dây điện dài tốn điện (sụt áp + tỏa nhiệt trên điện trở đường dây).

**Hỏi: LED cháy khi nối thẳng vào pin mà không cần điện trở không?**
Đáp: Đúng — LED là linh kiện phi tuyến, điện trở của nó thay đổi theo dòng. Khi nối thẳng, dòng tăng rất nhanh không kiểm soát → LED cháy ngay lập tức. Điện trở giới hạn dòng là bắt buộc trong mọi mạch LED.

🔁 **Dừng lại tự kiểm tra**: Nguồn 9 V, điện trở 470 Ω. Tính công suất tiêu thụ và kiểm tra xem điện trở 1/4 W có đủ không.

<details>
<summary>Xem đáp án</summary>

$P = \dfrac{V^2}{R} = \dfrac{9^2}{470} = \dfrac{81}{470} =$ **0.172 W = 172 mW**

So sánh với 1/4 W = 250 mW: 172 mW < 250 mW → Điện trở 1/4 W **đủ về danh nghĩa**.

Tuy nhiên, áp dụng nguyên tắc derating 50%: chọn **1/2 W** (500 mW) để an toàn lâu dài.

</details>

### 📝 Tóm tắt mục 5

- $P = V \cdot I = I^2 \cdot R = V^2/R$. Đơn vị Watt (W).
- Công suất định mức điện trở: 1/8 W, 1/4 W, 1/2 W, 1 W, 2 W, 5 W...
- Nguyên tắc derating: chọn điện trở có $P_{\text{định mức}} \geq 2 \times P_{\text{tính toán}}$.
- Điện trở quá tải → nóng → thay đổi giá trị hoặc cháy.

---

## 6. Bài tập

**Bài 1**: Dây điện trong nhà dài 15 m, tiết diện 1.5 mm², làm bằng đồng ($\rho = 1.68 \times 10^{-8}$ Ω·m). Tính điện trở của đoạn dây (cả đi và về = 2 dây).

**Bài 2**: Đặt điện áp 12 V vào hai đầu một điện trở. Dòng đo được 80 mA. Tính giá trị điện trở (Ω). Điện trở này gần với giá trị chuẩn nào nhất (E24: 100, 110, 120, 130, 150 Ω)?

**Bài 3**: Mạch LED: nguồn 5 V, LED có điện áp thuận 2 V (tức là điện trở hấp thụ 5 − 2 = 3 V), dòng LED cần 15 mA. Tính giá trị điện trở giới hạn dòng cần dùng (Ω). Điện trở đó tiêu thụ bao nhiêu watt? Cần chọn loại công suất định mức bao nhiêu?

**Bài 4**: Vi điều khiển đọc tín hiệu analog qua bộ chia áp: R1 = 10 kΩ nối từ VCC = 3.3 V xuống một điểm trung gian, R2 = 10 kΩ nối từ điểm đó xuống GND. Tính: (a) dòng qua mạch chia, (b) điện áp tại điểm giữa, (c) công suất tiêu thụ của toàn bộ mạch chia.

**Bài 5**: Điện trở 100 Ω, công suất định mức 1/4 W. Tính dòng điện tối đa được phép chạy qua (giới hạn dòng an toàn theo derating 50%).

**Bài 6**: Mạch nạp pin: nguồn 5 V, điện áp pin 3.7 V, điện trở giới hạn dòng 15 Ω. Tính: (a) dòng nạp, (b) công suất tiêu thụ trên điện trở, (c) có cần tản nhiệt không (điện trở 1/2 W)?

---

## 7. Lời giải chi tiết

### Bài 1

**Cho**: $L = 15$ m (một chiều), tiết diện $A = 1.5$ mm² $= 1.5 \times 10^{-6}$ m², $\rho = 1.68 \times 10^{-8}$ Ω·m, 2 dây (đi + về).

**Bước 1**: Điện trở 1 dây dài 15 m:
$$R_1 = \frac{\rho \times L}{A} = \frac{1.68 \times 10^{-8} \times 15}{1.5 \times 10^{-6}} = \frac{2.52 \times 10^{-7}}{1.5 \times 10^{-6}} = \textbf{0.168 Ω}$$

**Bước 2**: Tổng điện trở 2 dây (nối tiếp):
$$R_{\text{tổng}} = 2 \times 0.168 = \textbf{0.336 Ω}$$

**Nhận xét**: Nhỏ, nhưng với dòng lớn (vd 10 A cho bình nóng lạnh), sụt áp $= 0.336 \times 10 = 3.36$ V — đáng kể. Đây là lý do dây điện gia dụng công suất lớn phải dùng tiết diện lớn.

### Bài 2

**Cho**: $V = 12$ V, $I = 80$ mA $= 0.08$ A.

**Bước 1**: Áp dụng Định luật Ohm:
$$R = \frac{V}{I} = \frac{12}{0.08} = \textbf{150 Ω}$$

**Bước 2**: Đối chiếu dãy E24: Giá trị chuẩn gần nhất = **150 Ω** (trùng khớp).

### Bài 3

**Cho**: $V_{\text{nguồn}} = 5$ V, $V_{\text{LED}} = 2$ V → điện áp rơi trên $R = 5 - 2 = 3$ V. $I = 15$ mA $= 0.015$ A.

**Bước 1**: Tính R:
$$R = \frac{V_R}{I} = \frac{3}{0.015} = \textbf{200 Ω}$$
→ chọn giá trị chuẩn E24 gần nhất: **200 Ω** (hoặc 220 Ω cho an toàn hơn — dòng sẽ nhỏ hơn một chút).

**Bước 2**: Công suất tiêu thụ:
$$P = V_R \times I = 3 \times 0.015 = \textbf{0.045 W} = 45 \text{ mW}$$

**Bước 3**: Chọn công suất định mức: Áp dụng derating 50%: cần $P_{\text{định mức}} \geq 2 \times 45 = 90$ mW → chọn **1/8 W (125 mW)** là đủ an toàn.

### Bài 4

**Cho**: $R_1 = R_2 = 10$ kΩ $= 10{,}000$ Ω, VCC = 3.3 V.

**Bước 1**: Tổng điện trở:
$$R_{\text{tổng}} = R_1 + R_2 = 20{,}000 \text{ Ω} = 20 \text{ kΩ}$$

**Bước 2**: Dòng qua mạch:
$$I = \frac{\text{VCC}}{R_{\text{tổng}}} = \frac{3.3}{20{,}000} = 0.000165 \text{ A} = \textbf{0.165 mA} = 165 \text{ µA}$$

**Bước 3**: Điện áp tại điểm giữa (= điện áp rơi trên $R_2$):
$$V_{\text{mid}} = I \times R_2 = 0.000165 \times 10{,}000 = \textbf{1.65 V}$$

(Cũng có thể tính: $V_{\text{mid}} = \text{VCC} \times \dfrac{R_2}{R_1 + R_2} = 3.3 \times \dfrac{10}{20} = 1.65$ V — công thức chia áp.)

**Bước 4**: Công suất tổng:
$$P = \text{VCC} \times I = 3.3 \times 0.000165 = \textbf{0.000545 W} \approx 0.545 \text{ mW}$$

Rất nhỏ — mạch chia áp thụ động tiêu tốn rất ít điện.

### Bài 5

**Cho**: $R = 100$ Ω, $P_{\text{định mức}} = 1/4$ W $= 0.25$ W.

**Bước 1**: Dòng tối đa theo công suất định mức:
$$\text{Từ } P = I^2 \cdot R \Rightarrow I = \sqrt{\frac{P}{R}} = \sqrt{\frac{0.25}{100}} = \sqrt{0.0025} = \textbf{0.05 A} = 50 \text{ mA}$$

**Bước 2**: Áp dụng derating 50% → dòng an toàn thực tế:
$$I_{\text{an toàn}} = 50 \times 50\% = \textbf{25 mA}$$

**Nhận xét**: Không bao giờ cho dòng vượt 25 mA qua điện trở 100 Ω / 1/4 W này nếu muốn điện trở hoạt động tin cậy lâu dài.

### Bài 6

**Cho**: $V_{\text{nguồn}} = 5$ V, $V_{\text{pin}} = 3.7$ V, $R = 15$ Ω, $P_{\text{định mức}} = 1/2$ W $= 0.5$ W.

**Bước 1**: Điện áp rơi trên R:
$$V_R = V_{\text{nguồn}} - V_{\text{pin}} = 5 - 3.7 = 1.3 \text{ V}$$

**Bước 2**: Dòng nạp:
$$I = \frac{V_R}{R} = \frac{1.3}{15} = 0.0867 \text{ A} \approx \textbf{86.7 mA}$$

**Bước 3**: Công suất trên điện trở:
$$P = V_R \times I = 1.3 \times 0.0867 = \textbf{0.113 W} = 113 \text{ mW}$$

**Bước 4**: Kiểm tra công suất định mức 1/2 W:
$P_{\text{tính}} = 113$ mW. Derating 50%: cần $P_{\text{định mức}} \geq 226$ mW. 1/2 W = 500 mW > 226 mW → **không cần tản nhiệt**, điện trở 1/2 W là thoải mái.

---

## 8. Liên kết và bài tiếp theo

- **Kiến thức tiền đề**: [Physics — Lesson 06: Dòng điện & Mạch điện](../../../Physics/02-Thermo-Electromagnetism/lesson-06-current-circuits/)
- **Bài tiếp theo**: [Lesson 02 — Mạch điện & Định luật Kirchhoff](../lesson-02-kirchhoff-circuits/) — khi có nhiều điện trở và nhiều nhánh, cần Kirchhoff để phân tích.
- **Visualization tương tác**: [visualization.html](./visualization.html)

---

## 📝 Tổng kết Lesson 01

1. **Dòng điện $I = Q/t$** (Ampe). Quy ước chiều: dương → âm (ngược electron).
2. **Điện áp $V = W/Q$** (Volt). Đại lượng tương đối, đo giữa 2 điểm. Không có V → không có I.
3. **Điện trở $R = V/I = \rho L/A$** (Ohm). Phụ thuộc vật liệu, chiều dài, tiết diện.
4. **Định luật Ohm $V = I \cdot R$** — luôn đổi đơn vị về SI trước khi tính.
5. **Công suất $P = V \cdot I = I^2 R = V^2/R$** (Watt). Chọn điện trở có $P_{\text{định mức}} \geq 2 \times P_{\text{tính toán}}$.
