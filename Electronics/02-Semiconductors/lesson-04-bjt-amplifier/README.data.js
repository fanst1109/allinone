// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: Electronics/02-Semiconductors/lesson-04-bjt-amplifier/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 04 — Transistor BJT (Khuếch đại)

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Hiểu cấu tạo BJT (Bipolar Junction Transistor): 3 lớp bán dẫn NPN/PNP, 3 chân Base/Collector/Emitter.
- Nắm được trực giác "van nước điều khiển bằng dòng nhỏ": dòng base nhỏ điều khiển dòng collector lớn.
- Tính toán được độ lợi dòng beta ($h_{FE}$): $I_C = \\beta \\cdot I_B$, và $I_E = I_B + I_C$.
- Phân biệt ba vùng làm việc: cutoff (ngắt), active (khuếch đại), saturation (bão hòa).
- Phân tích mạch khuếch đại common-emitter: phân cực cầu phân áp, điểm làm việc Q, độ lợi áp $A_v$.
- Hiểu tại sao điểm Q phải ở giữa đặc tuyến để tránh méo (clipping).

## Kiến thức tiền đề

- [Lesson 01 — Chất bán dẫn & Tiếp giáp PN](../lesson-01-semiconductor-pn/) — cấu tạo tiếp giáp PN, phân cực thuận/nghịch.
- [Lesson 03 — Phân áp & Điện trở](../../01-Fundamentals/lesson-03-resistors-divider/) — cầu phân áp để tạo điện áp phân cực base.
- [Lesson 03 (Semiconductors) — Mạch nguồn DC](../lesson-03-dc-power-supply/) — nguồn DC ổn định cấp cho mạch.

---

## 1. BJT là gì — Cấu tạo và trực giác

### 1.1. Cấu tạo: 3 lớp, 3 chân

💡 **Trực giác "van nước"**: Hãy hình dung một vòi nước lớn (ống cấp nước từ nhà máy tới nhà bạn). Bạn điều khiển lưu lượng vòi lớn bằng một tay nắm nhỏ. Tay nắm nhỏ cần lực rất nhỏ, nhưng có thể mở/khóa/điều tiết toàn bộ lưu lượng nước lớn. BJT hoạt động y hệt: **dòng nhỏ chạy vào chân Base điều khiển dòng lớn hơn nhiều chạy qua chân Collector.**

BJT (Bipolar Junction Transistor — transistor tiếp giáp lưỡng cực) gồm **hai tiếp giáp PN** xếp liền kề:

| Loại | Cấu tạo | Ký hiệu | Mũi tên Emitter |
|------|---------|---------|-----------------|
| **NPN** | N-P-N | Phổ biến nhất | Mũi tên ra ngoài (Not Pointing iN) |
| **PNP** | P-N-P | Ít dùng hơn | Mũi tên vào trong |

Ba chân của BJT:
- **Base (B)**: Chân điều khiển. Nhận dòng điều khiển I_B nhỏ.
- **Collector (C)**: Chân thu. Cho dòng lớn I_C chạy qua.
- **Emitter (E)**: Chân phát. Tổng dòng ra ngoài I_E = I_B + I_C.

### 1.2. Cơ chế vật lý (NPN)

Trong BJT NPN:
1. Lớp Base rất mỏng (~micromet), pha tạp nhẹ (ít lỗ trống).
2. Khi V_BE > 0.7 V (ngưỡng tiếp giáp B-E phân cực thuận), điện tử từ Emitter bơm vào vùng Base.
3. Vì Base quá mỏng, đại đa số điện tử (95–99%) "bay qua" sang Collector (bị hút bởi điện áp V_CE dương).
4. Chỉ một phần nhỏ điện tử tái hợp với lỗ trống ở Base → tạo ra I_B nhỏ.

Kết quả: I_C >> I_B. Tỉ lệ này là beta (hFE).

❓ **Câu hỏi tự nhiên**:
- *"Sao không chỉ dùng 1 tiếp giáp PN (diode) mà cần 2?"* — Một diode chỉ cho/ngăn dòng; không điều khiển được độ lớn dòng. BJT thêm lớp Base ở giữa để tạo cơ chế "bơm điện tử" điều khiển được.
- *"BJT PNP khác NPN ở điểm nào?"* — Chiều dòng ngược lại, V_BE âm (E dương hơn B). Ứng dụng khi nguồn điện cấp từ phía cao. Mọi công thức giữ nguyên nhưng tất cả dấu áp dòng đổi chiều.
- *"BJT và MOSFET khác nhau thế nào?"* — BJT điều khiển bằng **dòng** (I_B); MOSFET điều khiển bằng **điện áp** (V_GS). MOSFET dùng trong IC tích hợp; BJT thường dùng ở mạch công suất và khuếch đại tương tự. Sẽ học ở [Lesson 06 — MOSFET](../lesson-06-mosfet/).

📝 **Tóm tắt mục 1**:
- BJT = 2 tiếp giáp PN: NPN (phổ biến) hoặc PNP.
- 3 chân: Base (điều khiển), Collector (dòng lớn), Emitter (tổng dòng ra).
- Nguyên lý: dòng nhỏ I_B ở Base điều khiển dòng lớn I_C ở Collector.

---

## 2. Độ lợi dòng beta (hFE)

### 2.1. Định nghĩa

💡 **Trực giác**: Beta là "hệ số khuếch đại dòng". Nếu beta = 100, mỗi 1 mA bơm vào Base sẽ kéo theo 100 mA qua Collector. Giống như 1 N lực tay nắm mở van → 100 N áp suất nước chảy qua.

**Định nghĩa**:

$$I_C = \\beta \\cdot I_B$$

trong đó:
- $I_C$: dòng Collector (mA hoặc A).
- $I_B$: dòng Base (µA hoặc mA — luôn nhỏ hơn $I_C$ rất nhiều).
- $\\beta$ (ký hiệu $h_{FE}$ trên datasheet): hệ số khuếch đại dòng DC. Thường 100–300 với transistor phổ biến (2N3904, BC547...).

**Quan hệ ba dòng** (định luật Kirchhoff tại nút Emitter):

$$I_E = I_B + I_C = I_B + \\beta \\cdot I_B = (1 + \\beta) \\cdot I_B$$

Vì $\\beta \\gg 1$ nên $I_E \\approx I_C$ (thường đúng trong tính toán thực tế).

### 2.2. Bốn ví dụ số

**Ví dụ 1** — Transistor 2N3904 có $\\beta = 100$, $I_B = 10$ µA:
- $I_C = 100 \\times 10\\ \\text{µA} =$ **1,000 µA = 1 mA**.
- $I_E = (1 + 100) \\times 10\\ \\text{µA} = 1{,}010\\ \\text{µA} \\approx$ **1 mA**.
- $I_C / I_B = 1000\\ \\text{µA} / 10\\ \\text{µA} = 100$. Xác nhận $\\beta = 100$.

**Ví dụ 2** — $I_B = 50$ µA, $\\beta = 150$:
- $I_C = 150 \\times 50\\ \\text{µA} =$ **7,500 µA = 7.5 mA**.
- $I_E = (1 + 150) \\times 50\\ \\text{µA} = 7{,}550\\ \\text{µA} \\approx$ **7.5 mA**.
- Dòng tăng 150 lần dù Base chỉ thêm 50 µA.

**Ví dụ 3** — Cần $I_C = 20$ mA để sáng LED, $\\beta = 200$:
- $I_B$ cần thiết $= I_C / \\beta = 20\\ \\text{mA} / 200 =$ **0.1 mA = 100 µA**.
- Đây là dòng base tối thiểu cần đưa vào để LED sáng đủ.

**Ví dụ 4** — Cùng transistor nhưng $\\beta$ thực đo được = 80 (thấp hơn spec):
- Cần $I_C = 20$ mA: $I_B = 20\\ \\text{mA} / 80 =$ **0.25 mA = 250 µA**.
- Bài học: $\\beta$ trên datasheet là giá trị điển hình, thực tế có thể thấp hơn. Trong thiết kế phải lấy $\\beta_{\\text{min}}$ của datasheet để tính $I_B$, không lấy $\\beta$ điển hình.

⚠ **Lỗi thường gặp**:
- Nhầm $I_B$ với $I_C$: *"transistor có $I_B = 1$ mA và $\\beta = 100$, tôi cấp 1 mA vào mạch là đủ"* — SAI. $I_B = 1$ mA kéo theo $I_C = 100$ mA, mạch cần tổng $I_E = 101$ mA từ nguồn.
- Dùng $\\beta$ điển hình thay vì $\\beta_{\\text{min}}$: datasheet 2N3904 ghi $\\beta_{\\text{min}} = 40$ (ở $I_C = 10$ mA), $\\beta$ điển hình = 100. Nếu thiết kế với $\\beta = 100$, những con transistor có $\\beta = 50$ trong lô sẽ không hoạt động đúng.

🔁 **Tự kiểm tra**:
- Transistor BC547 có $\\beta = 200$, cần $I_C = 5$ mA. Tính $I_B$?
<details>
<summary>Đáp án</summary>

$I_B = I_C / \\beta = 5\\ \\text{mA} / 200 = 0.025\\ \\text{mA} = 25\\ \\text{µA}$.

Điện trở base $R_B = (V_{CC} - V_{BE}) / I_B$, nếu $V_{CC} = 5$ V: $R_B = (5 - 0.7) / 0.000025 = 172\\ \\text{k}\\Omega$. Chọn 150 kΩ để đảm bảo đủ $I_B$.
</details>

📝 **Tóm tắt mục 2**:
- $I_C = \\beta \\cdot I_B$; $I_E = (1 + \\beta) \\cdot I_B \\approx I_C$.
- $\\beta$ ($h_{FE}$) thường 100–300; thực tế biến thiên nhiều theo nhiệt độ và $I_C$.
- Thiết kế phải dùng $\\beta_{\\text{min}}$ của datasheet.

---

## 3. Ba vùng làm việc

### 3.1. Tổng quan ba vùng

💡 **Trực giác**: Van nước có 3 trạng thái: khóa hoàn toàn, mở một phần (điều tiết lưu lượng), mở hoàn toàn. BJT cũng vậy:
- **Cutoff (ngắt)**: van khóa — không có dòng Collector.
- **Active (tích cực)**: van mở một phần — $I_C = \\beta \\cdot I_B$, hoạt động tuyến tính, dùng để **khuếch đại**.
- **Saturation (bão hòa)**: van mở toàn — $I_C$ bị giới hạn bởi mạch ngoài, không còn tuyến tính với $I_B$.

### 3.2. Bảng phân biệt chi tiết

| Đặc điểm | Cutoff (Ngắt) | Active (Tích cực) | Saturation (Bão hòa) |
|-----------|---------------|-------------------|----------------------|
| **$V_{BE}$** | < 0.6 V | ≈ 0.7 V (NPN) | ≈ 0.7 V |
| **$V_{CE}$** | ≈ $V_{CC}$ (cao) | $V_{CC}/2$ đến vài V | ≈ 0.1–0.3 V |
| **$I_C$** | ≈ 0 (leakage nhỏ) | $= \\beta \\cdot I_B$ | $< \\beta \\cdot I_B$ (bị kẹp bởi $R_C$) |
| **Quan hệ $I_C$–$I_B$** | Không có | Tuyến tính $I_C = \\beta \\cdot I_B$ | Không còn tuyến tính |
| **Công suất tiêu tán** | Rất thấp | Trung bình | Thấp (V_CE nhỏ) |
| **Ứng dụng chính** | Khóa mở (switch OFF) | Khuếch đại tín hiệu | Khóa đóng (switch ON) |

**Lưu ý cho switch (Lesson 05)**: Cutoff = khóa mở (OFF); Saturation = khóa đóng (ON). BJT làm khóa nhảy thẳng giữa hai trạng thái này, tránh vùng Active (tốn công suất). Sẽ học kỹ ở [Lesson 05 — BJT làm khóa](../lesson-05-bjt-switch/).

### 3.3. Điều kiện chuyển vùng

**Từ Cutoff sang Active**: tăng V_BE lên tới ngưỡng ≈ 0.6–0.7 V (V_BE_on). Tiếp giáp B-E phân cực thuận.

**Từ Active sang Saturation**: khi $I_B$ tăng đủ lớn để $I_C \\cdot R_C + V_{CE,\\text{sat}} \\approx V_{CC}$, tức là $V_{CE}$ không còn đủ để duy trì hoạt động tuyến tính. Điều kiện bão hòa:

$$I_B > \\frac{I_{C,\\text{sat}}}{\\beta} \\qquad \\text{(tức là } I_B \\text{ lớn hơn mức cần thiết cho } I_C \\text{ yêu cầu)}$$

❓ **Câu hỏi tự nhiên**:
- *"Tại sao $V_{CE,\\text{sat}} \\approx 0.2$ V mà không phải 0 V?"* — Vì tiếp giáp B-C cũng phân cực thuận (yếu) ở chế độ bão hòa. Điện áp 0.2 V là sụt áp thuận của tiếp giáp B-C. Trong datasheet ghi là $V_{CE(\\text{sat})}$.
- *"Vùng nào tiêu tán công suất nhiều nhất?"* — Vùng Active. $P = V_{CE} \\cdot I_C$. Nếu $V_{CE} = 5$ V, $I_C = 100$ mA → $P = 0.5$ W (nóng đáng kể). Ở Cutoff: $I_C \\approx 0$; ở Saturation: $V_{CE} \\approx 0.2$ V nhỏ → $P$ thấp.

📝 **Tóm tắt mục 3**:
- Cutoff: $V_{BE} < 0.7$ V, $I_C \\approx 0$, transistor "khóa".
- Active: $V_{BE} \\approx 0.7$ V, $I_C = \\beta \\cdot I_B$, vùng khuếch đại tuyến tính.
- Saturation: $I_B$ quá lớn, $V_{CE} \\approx 0.2$ V, $I_C$ bị giới hạn bởi mạch ngoài.

---

## 4. Mạch khuếch đại Common-Emitter

### 4.1. Sơ đồ và linh kiện

💡 **Trực giác**: "Common-Emitter" nghĩa là chân Emitter nối chung với đất (GND) — điểm tham chiếu chung cho đầu vào và đầu ra. Tín hiệu nhỏ vào chân Base (qua tụ ghép), tín hiệu lớn ra tại chân Collector (qua tụ ghép ra). Đây là cấu hình khuếch đại phổ biến nhất vì có độ lợi áp và dòng đều lớn.

Mạch common-emitter cơ bản gồm:
- **V_CC**: nguồn DC (ví dụ 12 V).
- **R1, R2**: cầu phân áp tạo điện áp phân cực V_B ổn định tại chân Base (tham khảo [Lesson 03 — Cầu phân áp](../../01-Fundamentals/lesson-03-resistors-divider/)).
- **R_C**: điện trở Collector, tạo sụt áp để thu tín hiệu ra.
- **R_E**: điện trở Emitter (ổn định nhiệt độ, giảm hồi tiếp âm).
- **C_in, C_out**: tụ ghép AC, ngăn DC, chỉ cho tín hiệu AC qua.
- **C_E**: tụ bỏ qua (bypass capacitor) song song R_E — ngắn mạch R_E với tần số tín hiệu để tăng độ lợi AC.

### 4.2. Phân cực (Biasing) — Xác định điểm Q

**Mục tiêu phân cực**: đặt điểm làm việc Q (Quiescent point — điểm tĩnh khi không có tín hiệu vào) vào giữa vùng Active để tín hiệu AC có thể xoay quanh Q mà không bị cắt (clip) ở đỉnh hoặc đáy.

**Quy trình phân tích mạch phân cực cầu phân áp** (điều kiện: dòng qua cầu >> I_B, tức R1||R2 << beta*R_E):

**Bước 1**: Tính $V_B$ (điện áp base) từ cầu phân áp:

$$V_B = V_{CC} \\cdot \\frac{R_2}{R_1 + R_2}$$

**Bước 2**: Tính $V_E$ (điện áp emitter):

$$V_E = V_B - V_{BE} = V_B - 0.7 \\text{ V}$$

**Bước 3**: Tính $I_E$ (xấp xỉ $I_C$ vì $\\beta \\gg 1$):

$$I_C \\approx I_E = \\frac{V_E}{R_E}$$

**Bước 4**: Tính $V_{CE}$:

$$V_{CE} = V_{CC} - I_C \\cdot (R_C + R_E)$$

### 4.3. Walk-through số — Ví dụ cụ thể

**Đề bài**: V_CC = 12 V, R1 = 47 kΩ, R2 = 10 kΩ, R_C = 3.3 kΩ, R_E = 1 kΩ, beta = 100.

**Bước 1 — Tính $V_B$**:

$$V_B = \\frac{12 \\times 10}{47 + 10} = \\frac{120}{57} = 2.105 \\text{ V}$$

**Bước 2 — Tính $V_E$**:

$$V_E = V_B - 0.7 = 2.105 - 0.7 = 1.405 \\text{ V}$$

**Bước 3 — Tính $I_C$**:

$$I_C \\approx I_E = \\frac{V_E}{R_E} = \\frac{1.405 \\text{ V}}{1{,}000\\ \\Omega} = 1.405 \\text{ mA}$$

Kiểm tra $I_B = I_C / \\beta = 1.405\\ \\text{mA} / 100 = 14.05\\ \\text{µA}$ — nhỏ hơn dòng cầu phân áp ($I_{R_2} = V_B/R_2 = 2.105/10000 = 210.5\\ \\text{µA}$). Vậy giả thiết cầu phân áp cứng (stiff) hợp lệ.

**Bước 4 — Tính $V_{CE}$**:

$$\\begin{aligned}
V_{CE} &= 12 - 1.405\\ \\text{mA} \\times (3{,}300 + 1{,}000) \\\\
       &= 12 - 1.405 \\times 4{,}300 = 12 - 6.04 = \\textbf{5.96 V}
\\end{aligned}$$

**Điểm Q**: $I_C = 1.405$ mA, $V_{CE} = 5.96$ V — gần đúng giữa đặc tuyến ($V_{CC}/2 = 6$ V). Thiết kế tốt!

### 4.4. Độ lợi áp A_v

Khi $C_E$ bỏ qua $R_E$ (ngắn mạch AC), độ lợi áp nhỏ tín hiệu:

$$A_v \\approx -\\frac{R_C}{r_e}$$

trong đó $r_e$ là điện trở emitter động:

$$r_e = \\frac{26\\ \\text{mV}}{I_C} \\qquad \\text{(ở nhiệt độ phòng)}$$

**Tính $A_v$ cho ví dụ trên**:

$$r_e = \\frac{26\\ \\text{mV}}{1.405\\ \\text{mA}} = 18.5\\ \\Omega$$

$$A_v = -\\frac{3{,}300}{18.5} = -178.4$$

Dấu âm (−) nghĩa là tín hiệu ra **đảo pha** 180° so với tín hiệu vào — đặc trưng của cấu hình common-emitter.

❓ **Câu hỏi tự nhiên**:
- *"$r_e = 26\\ \\text{mV} / I_C$ từ đâu ra?"* — Đây là điện trở vi phân của tiếp giáp B-E (từ phương trình Shockley): $r_e = V_T / I_C$ với $V_T = kT/q \\approx 26$ mV ở 25°C. Không phải điện trở tĩnh mà là điện trở động (nhỏ tín hiệu).
- *"$A_v = -178$ có nghĩa là gì thực tế?"* — Tín hiệu vào 10 mV sẽ ra 1.78 V (và đảo pha). Nếu vào 100 mV: ra 17.8 V — nhưng $V_{CC} = 12$ V nên bị cắt (clipping). Vùng tín hiệu tuyến tính tối đa khoảng $V_{CE,dc} / |A_v| = 5.96 / 178 \\approx 33$ mV đỉnh-đỉnh tín hiệu vào.
- *"Tại sao phải có $C_E$ bỏ qua $R_E$?"* — $R_E$ tạo hồi tiếp âm cả DC lẫn AC: ổn định điểm Q nhưng giảm độ lợi AC. $C_E$ ngắn mạch $R_E$ ở tần số tín hiệu → giữ được độ lợi cao ($-R_C/r_e$) trong khi vẫn ổn định DC qua $R_E$. Không có $C_E$: $A_v = -R_C/(r_e + R_E) = -3300/1018.5 \\approx -3.2$ (rất nhỏ).

📝 **Tóm tắt mục 4**:
- Common-emitter: Emitter nối GND, tín hiệu vào Base, ra Collector.
- Phân cực cầu phân áp: $V_B \\to V_E \\to I_C \\to V_{CE}$.
- Với $V_{CC} = 12$ V, điểm Q tốt khi $V_{CE} \\approx V_{CC}/2 \\approx 6$ V.
- Độ lợi áp $A_v \\approx -R_C/r_e$, đảo pha 180°.

---

## 5. Phân cực đúng và méo tín hiệu (Clipping)

### 5.1. Tại sao Q phải ở giữa

💡 **Trực giác**: Tín hiệu AC xoay quanh điểm Q trên đặc tuyến. $V_{CE}$ dao động lên xuống quanh $V_{CE,Q}$. Nếu Q ở giữa ($V_{CE,Q} \\approx V_{CC}/2$), tín hiệu có thể đạt biên độ tối đa mà không chạm vào giới hạn saturation ($V_{CE}$ thấp) hoặc cutoff ($V_{CE}$ cao = $V_{CC}$, $I_C = 0$).

Nếu Q lệch:
- **Q quá gần Saturation** ($V_{CE,Q}$ nhỏ, $I_C$ lớn): nửa âm của tín hiệu ra bị cắt ($I_C$ tăng thêm → $V_{CE}$ xuống dưới $V_{CE,\\text{sat}} \\approx 0.2$ V, transistor vào bão hòa, không tuyến tính).
- **Q quá gần Cutoff** ($V_{CE,Q}$ lớn, $I_C$ nhỏ): nửa dương của tín hiệu ra bị cắt ($I_C$ giảm thêm → transistor vào cutoff, $I_C = 0$ không giảm thêm được).

### 5.2. Đường tải (Load Line)

Đường tải là đường thẳng trên đồ thị $I_C$ vs $V_{CE}$ biểu diễn các trạng thái mạch có thể đạt được:

$$I_C = \\frac{V_{CC} - V_{CE}}{R_C + R_E}$$

Hai điểm mút:
- **Saturation end**: $V_{CE} = 0 \\implies I_{C,\\text{max}} = V_{CC} / (R_C + R_E) = 12 / 4300 =$ **2.79 mA**
- **Cutoff end**: $I_C = 0 \\implies V_{CE,\\text{max}} = V_{CC} =$ **12 V**

Điểm Q = (5.96 V, 1.405 mA) nằm gần giữa đường tải — thiết kế đúng.

⚠ **Lỗi thường gặp — Clipping**:
- Chọn R1 quá lớn → V_B quá thấp → I_C quá nhỏ → Q gần Cutoff → clipping ở nửa âm đầu ra.
- Chọn R1 quá nhỏ → V_B quá cao → I_C quá lớn → Q gần Saturation → clipping ở nửa dương đầu ra.
- Quên C_E → R_E không bị bypass → A_v thấp (~3 lần) → tín hiệu ra nhỏ dù không clipping.
- Dùng transistor beta thấp hơn dự kiến → I_C thực thấp hơn → Q dịch về phía Cutoff.

🔁 **Tự kiểm tra**: Thay $R_C = 1$ kΩ vào mạch ví dụ, giữ nguyên phân cực. Điểm Q mới là gì?
<details>
<summary>Đáp án</summary>

$V_B$ và $V_E$ không đổi (cầu phân áp giữ $V_B = 2.105$ V). $I_C \\approx 1.405$ mA (không đổi vì $R_E$ không đổi).

$V_{CE} = 12 - 1.405 \\times (1000 + 1000) = 12 - 2.81 = 9.19$ V.

Điểm Q dịch về phía Cutoff ($V_{CE}$ lớn hơn, $I_C$ giữ nguyên). $A_v = -1000/18.5 = -54$. Biên độ tín hiệu ra bị giới hạn hơn ở phía cutoff.
</details>

📝 **Tóm tắt mục 5**:
- Q phải nằm gần giữa đường tải để tránh clipping.
- Đường tải: $I_C = (V_{CC} - V_{CE}) / (R_C + R_E)$, hai mút tại saturation và cutoff.
- Clipping xảy ra khi tín hiệu vào quá lớn hoặc Q lệch ra ngoài tâm.

---

## 6. Bài tập + Lời giải chi tiết

### Bài tập

**Bài 1**: Transistor 2N3904 ($\\beta = 100$) có $I_B = 30$ µA. Tính $I_C$, $I_E$. Transistor đang ở vùng nào?

**Bài 2**: Transistor có $I_C = 8.5$ mA, $I_B = 85$ µA. Tính $\\beta$ và $I_E$.

**Bài 3**: Mạch common-emitter có $V_{CC} = 9$ V, $R_1 = 39$ kΩ, $R_2 = 8.2$ kΩ, $R_C = 2.2$ kΩ, $R_E = 820\\ \\Omega$, $\\beta = 120$. Tính $V_B$, $V_E$, $I_C$, $V_{CE}$. Nhận xét vị trí điểm Q.

**Bài 4**: Với mạch Bài 3, tính $r_e$ và độ lợi áp $A_v$ (giả sử có $C_E$ bypass $R_E$).

**Bài 5**: Mạch common-emitter $V_{CC} = 15$ V, $R_C = 4.7$ kΩ, $R_E = 1.5$ kΩ. Tính $I_C$ và $V_{CE}$ ở điểm bão hòa và điểm cutoff. Mô tả tọa độ đường tải.

**Bài 6**: Cần khuếch đại tín hiệu 20 mV thành 2 V ($A_v = 100$). Dùng mạch common-emitter với $V_{CC} = 12$ V, $R_C = 3.9$ kΩ. Tính $I_C$ cần thiết và $r_e$.

### Lời giải chi tiết

**Bài 1**:

Bước 1: $I_C = \\beta \\cdot I_B = 100 \\times 30\\ \\text{µA} =$ **3,000 µA = 3 mA**.

Bước 2: $I_E = I_B + I_C = 30\\ \\text{µA} + 3{,}000\\ \\text{µA} =$ **3,030 µA ≈ 3.03 mA**.

Bước 3: Vùng hoạt động? Cần biết $V_{CE}$ để kết luận chắc chắn. Tuy nhiên, nếu bài cho rằng transistor đang hoạt động tuyến tính với $I_C = \\beta \\cdot I_B$, transistor đang ở **vùng Active**.

**Bài 2**:

Bước 1: $\\beta = I_C / I_B = 8.5\\ \\text{mA} / 85\\ \\text{µA} = 8500 / 85 =$ **100**.

Bước 2: $I_E = I_B + I_C = 85\\ \\text{µA} + 8{,}500\\ \\text{µA} = 8{,}585\\ \\text{µA} =$ **8.585 mA** $\\approx 8.5$ mA ($I_E \\approx I_C$ vì $\\beta \\gg 1$).

**Bài 3**:

Bước 1 — Tính $V_B$:

$$V_B = \\frac{9 \\times 8.2}{39 + 8.2} = \\frac{73.8}{47.2} = 1.563 \\text{ V}$$

Bước 2 — Tính $V_E$:

$$V_E = 1.563 - 0.7 = 0.863 \\text{ V}$$

Bước 3 — Tính $I_C$:

$$I_C \\approx I_E = \\frac{V_E}{R_E} = \\frac{0.863}{820} = 1.052 \\text{ mA}$$

Kiểm tra stiff bias: $I_{R_2} = V_B/R_2 = 1.563/8200 = 190.6\\ \\text{µA}$; $I_B = I_C/\\beta = 1052/120 = 8.77\\ \\text{µA}$. $I_B \\ll I_{R_2}$ → giả thiết hợp lệ.

Bước 4 — Tính $V_{CE}$:

$$\\begin{aligned}
V_{CE} &= 9 - 1.052 \\times (2200 + 820) \\\\
       &= 9 - 1.052 \\times 3020 = 9 - 3.177 = \\textbf{5.823 V}
\\end{aligned}$$

Nhận xét: $V_{CE} = 5.82$ V. $V_{CC}/2 = 4.5$ V — hơi lệch về phía cutoff. Vẫn chấp nhận được cho khuếch đại tín hiệu nhỏ.

**Bài 4**:

Bước 1 — Tính $r_e$:

$$r_e = \\frac{26\\ \\text{mV}}{I_C} = \\frac{26\\ \\text{mV}}{1.052\\ \\text{mA}} = 24.7\\ \\Omega$$

Bước 2 — Tính $A_v$ (có $C_E$ bypass $R_E$):

$$A_v = -\\frac{R_C}{r_e} = -\\frac{2200}{24.7} = -89.1$$

Tín hiệu ra được khuếch đại khoảng 89 lần và đảo pha 180°.

**Bài 5**:

Điểm Saturation ($V_{CE} = 0$):

$$I_{C,\\text{sat}} = \\frac{V_{CC}}{R_C + R_E} = \\frac{15}{4700 + 1500} = \\frac{15}{6200} = \\textbf{2.42 mA}$$

Tọa độ: ($V_{CE} = 0$ V, $I_C = 2.42$ mA).

Điểm Cutoff ($I_C = 0$):

$$V_{CE,\\text{cutoff}} = V_{CC} = \\textbf{15 V}$$

Tọa độ: ($V_{CE} = 15$ V, $I_C = 0$ mA).

Đường tải: đường thẳng từ (0 V, 2.42 mA) đến (15 V, 0 mA). Phương trình: $I_C = (15 - V_{CE}) / 6200$.

**Bài 6**:

Bước 1 — Cần $A_v = -100$ (dấu âm do common-emitter đảo pha):

$$A_v = -\\frac{R_C}{r_e} \\implies r_e = \\frac{R_C}{|A_v|} = \\frac{3900}{100} = 39\\ \\Omega$$

Bước 2 — Tính $I_C$ từ $r_e$:

$$r_e = \\frac{26\\ \\text{mV}}{I_C} \\implies I_C = \\frac{26\\ \\text{mV}}{39\\ \\Omega} = 0.667 \\text{ mA}$$

Bước 3 — Kiểm tra điểm Q:

$$V_{CE} \\approx V_{CC} - I_C \\cdot R_C = 12 - 0.667 \\times 3900 = 12 - 2.6 = 9.4 \\text{ V}$$

$V_{CE} = 9.4$ V khá cao (gần Cutoff). Có thể thêm $R_E \\approx 1$ kΩ để ổn định và dịch Q về giữa:

$$V_{CE} = 12 - 0.667 \\times (3900 + 1000) = 12 - 3.27 = 8.73 \\text{ V}$$

Vẫn chấp nhận được. $A_v$ vẫn = −100 khi có $C_E$ bypass.

---

## 7. Liên kết và bài tiếp theo

- **Bài trước**: [Lesson 03 — Mạch nguồn DC](../lesson-03-dc-power-supply/) — mạch chỉnh lưu và lọc DC cấp cho BJT.
- **Bài tiếp theo**: [Lesson 05 — BJT làm khóa](../lesson-05-bjt-switch/) — ứng dụng BJT trong vùng Cutoff/Saturation để điều khiển relay, động cơ, LED công suất.
- **Tham khảo sâu**: [Lesson 06 — MOSFET](../lesson-06-mosfet/) — transistor trường (FET) điều khiển bằng điện áp, so sánh với BJT.
- **Công cụ tương tác**: [visualization.html](./visualization.html) — mô phỏng BJT, đồ thị đặc tuyến, đường tải.

---

## 📝 Tổng kết Lesson 04

1. **BJT = 3 lớp (NPN/PNP), 3 chân (Base, Collector, Emitter)**. Dòng nhỏ $I_B$ điều khiển dòng lớn $I_C$.
2. $I_C = \\beta \\cdot I_B$; $I_E = (1+\\beta) \\cdot I_B \\approx I_C$. $\\beta$ thường 100–300, dùng $\\beta_{\\text{min}}$ khi thiết kế.
3. **Ba vùng**: Cutoff ($I_C \\approx 0$), Active ($I_C = \\beta \\cdot I_B$, tuyến tính), Saturation ($V_{CE} \\approx 0.2$ V).
4. **Phân cực cầu phân áp**: $V_B \\to V_E \\to I_C \\to V_{CE}$. Mục tiêu $V_{CE} \\approx V_{CC}/2$.
5. **Độ lợi áp** $A_v = -R_C/r_e$ ($r_e = 26\\ \\text{mV}/I_C$). Dấu âm = đảo pha 180°.
6. **Q ở giữa đường tải** → tín hiệu không bị clipping. Q lệch → méo một chiều.
`;
