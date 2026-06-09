# Lesson 02 (T2) — Khí lý tưởng

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Hiểu **mô hình khí lý tưởng** — và 4 giả định của nó.
- Biết **phương trình trạng thái** $PV = nRT$ — liên hệ 3 đại lượng vĩ mô ($P$, $V$, $T$) với số mol $n$.
- Áp dụng được cho 3 quá trình đặc biệt:
  - **Đẳng nhiệt** ($T$ const): Boyle's law $PV = $ const.
  - **Đẳng áp** ($P$ const): Charles's law $V/T = $ const.
  - **Đẳng tích** ($V$ const): Gay-Lussac's law $P/T = $ const.
- Hiểu **động học chất khí**: $T$ tỉ lệ với năng lượng động trung bình $KE = \tfrac{3}{2} k_B \cdot T$.
- Tính công khí thực hiện khi giãn nở.

## Kiến thức tiền đề

- [Lesson 01 (T2) — Nhiệt độ & nhiệt lượng](../lesson-01-temperature-heat/) — biết T và Q.
- Khái niệm mol từ Chemistry — [Lesson 06 (T1) Chemistry](../../../Chemistry/01-Structure/lesson-06-mole-stoichiometry/).

---

## 1. Mô hình khí lý tưởng

### 1.1. 4 giả định

**Khí lý tưởng** = mô hình đơn giản hóa của chất khí, dựa trên 4 giả định:

1. **Các phân tử khí là điểm chất** — kích thước không đáng kể so với khoảng cách giữa chúng.
2. **Không tương tác** giữa các phân tử (trừ va chạm).
3. **Va chạm đàn hồi hoàn toàn** — không mất năng lượng.
4. **Phân tử chuyển động ngẫu nhiên** — đẳng hướng mọi hướng.

💡 **Vì sao mô hình này hữu dụng?** Hầu hết khí thực ở áp suất thấp và nhiệt độ phòng đều **rất gần** khí lý tưởng. Mô hình này tính toán được, đơn giản, và cho kết quả chính xác cao trong nhiều ứng dụng (động cơ ô tô, bóng bay, khí quyển). Chỉ ở áp suất cao, nhiệt độ thấp (gần điểm hóa lỏng) thì sai số mới đáng kể.

### ❓ Câu hỏi tự nhiên của người đọc

- *"Khí thật khác khí lý tưởng ở chỗ nào?"* Khí thật có (1) phân tử **có kích thước** (chiếm thể tích) và (2) **lực hút giữa phân tử** (van der Waals). Hai hiệu ứng này bị bỏ qua trong mô hình lý tưởng. Ở áp suất cao/T thấp chúng trở nên đáng kể.
- *"Vì sao ở áp suất thấp khí thật gần lý tưởng?"* Vì phân tử cách xa nhau → kích thước phân tử và lực hút không đáng kể so với khoảng cách → các giả định đúng.
- *"Va chạm đàn hồi nghĩa là gì?"* Va chạm không mất năng lượng động — sau va chạm tổng động năng giữ nguyên (chỉ đổi hướng/chia lại). Nếu không đàn hồi, khí sẽ "nguội dần" tự nó, vô lý.

⚠ **Lỗi thường gặp**

- **Áp dụng mô hình lý tưởng cho mọi điều kiện**. Phản ví dụ: CO₂ ở 50 atm và 0°C lệch khá xa lý tưởng (gần hóa lỏng) — tính $PV = nRT$ sẽ sai vài %. Hơi nước gần điểm sôi cũng lệch.
- **Tưởng "khí lý tưởng" là một loại khí cụ thể**. Không — nó là mô hình toán học mọi khí tuân theo gần đúng, không phải một chất.

🔁 **Dừng lại tự kiểm tra**

1. Trong 4 giả định, giả định nào bị phá vỡ khi nén khí tới áp suất cực cao?
2. Helium ở nhiệt độ phòng, 1 atm — có gần khí lý tưởng không?

<details><summary>Đáp án</summary>

1. Giả định "phân tử là điểm chất, kích thước không đáng kể" — khi nén mạnh, khoảng cách giảm tới cỡ kích thước phân tử nên không còn bỏ qua được.
2. Có, rất gần — He là khí đơn nguyên, lực hút giữa phân tử cực yếu, ở điều kiện thường nó là một trong những khí gần lý tưởng nhất.

</details>

### 📝 Tóm tắt mục 1

- Khí lý tưởng: phân tử = điểm, không tương tác, va chạm đàn hồi.
- Áp dụng tốt cho khí ở P thường, T thường.

---

## 2. Phương trình trạng thái — $PV = nRT$

### 2.1. Phương trình

$$P \cdot V = n \cdot R \cdot T$$

trong đó:
- $P$ = áp suất (Pascal, $\text{Pa} = \text{N/m}^2$).
- $V$ = thể tích ($\text{m}^3$).
- $n$ = số mol khí.
- $R$ = hằng số khí lý tưởng = **8,314 J/(mol·K)**.
- $T$ = nhiệt độ (Kelvin).

💡 **Ý nghĩa**: phương trình này liên kết 4 đại lượng vĩ mô của khí. Cho 3 trong 4 → tính được cái thứ 4. Vì sao gọn đẹp như vậy?

**Nguồn gốc**: Thí nghiệm thế kỷ 17-18 cho thấy:
- Boyle (1662): ở $T$ const, $P \cdot V = $ const.
- Charles (1787): ở $P$ const, $V/T = $ const.
- Avogadro (1811): ở $P$, $T$ giống nhau, các khí có cùng $V$ chứa cùng số phân tử.

Gộp lại → $P \cdot V/T = $ const $= n \cdot R$ cho mọi khí lý tưởng. Đó là $PV = nRT$.

### 2.2. Đơn vị quan trọng

- $1 \text{ atm} = $ **101 325 Pa** $\approx 10^5 \text{ Pa}$.
- $1 \text{ L} = 10^{-3} \text{ m}^3$.
- $0°\text{C} = 273{,}15 \text{ K}$.
- 1 mol khí lý tưởng ở STP (0°C, 1 atm): $V = nRT/P = (1) \cdot 8{,}314 \cdot 273{,}15/101325 \approx$ **0,0224 m³ = 22,4 L**. Đây là "thể tích mol khí" nổi tiếng.

### 2.3. Bốn ví dụ số

**Ví dụ 1 — Bóng bay**: 0.05 mol khí He ở 25°C, áp suất 1 atm. Tính $V$.
- $V = nRT/P = 0{,}05 \times 8{,}314 \times 298 / 101325 \approx$ **1,22 × 10⁻³ m³ = 1,22 L**.

**Ví dụ 2 — Bình khí oxy**: $V = 5 \text{ L}$, $P = 200 \text{ atm}$, $T = 25°\text{C}$. Tính $n$.
- $n = PV/RT = 200 \cdot 101325 \cdot 0{,}005 / (8{,}314 \cdot 298) \approx 40{,}9 \text{ mol}$.
- $m(\text{O}_2) = 40{,}9 \times 32 = $ **1310 g** = 1,31 kg.

**Ví dụ 3 — Khí trong động cơ ô tô**: $V = 500 \text{ cm}^3 = 5 \times 10^{-4} \text{ m}^3$, $T = 500°\text{C} = 773 \text{ K}$, $n = 0{,}02 \text{ mol}$. Tính $P$.
- $P = nRT/V = 0{,}02 \cdot 8{,}314 \cdot 773/(5 \times 10^{-4}) \approx$ **257 180 Pa = 2,54 atm**.

**Ví dụ 4 — Khí quyển**: ở mặt biển, $P \approx 1 \text{ atm}$. Lên Everest (8848 m), $P \approx 0{,}33 \text{ atm}$. Nếu $T$ không đổi (đơn giản hóa), thì mật độ phân tử ở Everest = 1/3 mặt biển → khó thở.

### ❓ Câu hỏi tự nhiên của người đọc

- *"R từ đâu ra? Sao lại 8.314?"* $R = N_A \cdot k_B$ (số Avogadro nhân hằng số Boltzmann). Nó là hệ số chuyển từ "đếm mol" sang năng lượng. Giá trị $8{,}314 \text{ J/(mol·K)}$ là kết quả đo, gắn liền định nghĩa mol và K.
- *"Phải dùng đơn vị nào trong $PV = nRT$?"* Để dùng $R = 8{,}314$: **$P$ bằng Pa, $V$ bằng m³, $T$ bằng Kelvin**. Lẫn atm hay L hay °C → sai. Đổi: $1 \text{ atm} = 101\,325 \text{ Pa}$, $1 \text{ L} = 10^{-3} \text{ m}^3$.
- *"Vì sao 1 mol khí bất kỳ ở STP đều chiếm 22.4 L?"* Vì $PV = nRT$ chỉ phụ thuộc số mol $n$, không phụ thuộc loại khí (giả định lý tưởng). Cùng $n$, $P$, $T$ → cùng $V$, dù là He hay CO₂ (định luật Avogadro).

⚠ **Lỗi thường gặp**

- **Dùng $T$ bằng °C thay vì K**. Phản ví dụ: khí ở 0°C nén đẳng nhiệt — nếu cắm $T = 0$ vào $PV = nRT$ thì $PV = 0$ (vô lý). Phải dùng $T = 273{,}15 \text{ K}$.
- **Quên đổi L sang m³ hoặc atm sang Pa** khi dùng $R = 8{,}314$. Phản ví dụ: $V = 5 \text{ L} \to$ phải là $0{,}005 \text{ m}^3$, không phải 5.

🔁 **Dừng lại tự kiểm tra**

1. 1 mol khí lý tưởng ở 0°C, 1 atm chiếm thể tích bao nhiêu lít?
2. 3 mol khí ở 300 K trong bình 10 L ($= 0{,}01 \text{ m}^3$). Tính $P$ (Pa).

<details><summary>Đáp án</summary>

1. $V = nRT/P = 1 \cdot 8{,}314 \cdot 273{,}15/101325 \approx 0{,}0224 \text{ m}^3 = $ **22,4 L** (thể tích mol ở STP).
2. $P = nRT/V = 3 \cdot 8{,}314 \cdot 300/0{,}01$ — cẩn thận: $3 \cdot 8{,}314 \cdot 300 = 7482{,}6$, chia $0{,}01 = $ **748 260 Pa ≈ 7,4 atm**.

</details>

### 📝 Tóm tắt mục 2

- $PV = nRT$ (Pa, m³, mol, K).
- $R = 8{,}314 \text{ J/(mol·K)}$.
- 1 mol khí ở STP = 22,4 L.

---

## 3. Ba quá trình đặc biệt

### 3.1. Đẳng nhiệt (T const) — Boyle's Law

$T$ không đổi $\to PV = $ const $\to$ **$P_1 V_1 = P_2 V_2$**.

💡 **Ý nghĩa**: nén khí ($V$ giảm) → $P$ tăng tỉ lệ nghịch. Vd nén bóng → cứng hơn.

**Ví dụ**: Bóng bay $V = 1 \text{ L}$ ở 1 atm. Nén xuống còn $V = 0{,}25 \text{ L}$ cùng $T$. Áp suất mới?
- $P_{\text{new}} = (1 \cdot 1)/0{,}25 = $ **4 atm**.

### 3.2. Đẳng áp (P const) — Charles's Law

$P$ không đổi $\to V/T = $ const $\to$ **$V_1/T_1 = V_2/T_2$**.

💡 **Ý nghĩa**: nóng → khí giãn nở. Vd nướng bánh nở phồng do CO₂ giãn nở khi nướng.

**Ví dụ**: Bóng bay 2 L ở 20°C (293 K). Bỏ vào tủ lạnh −10°C (263 K). $V$ mới?
- $V_{\text{new}} = 2 \times (263/293) = $ **1,80 L** (co lại 10%).

### 3.3. Đẳng tích (V const) — Gay-Lussac's Law

$V$ không đổi $\to P/T = $ const $\to$ **$P_1/T_1 = P_2/T_2$**.

💡 **Ý nghĩa**: nóng → $P$ tăng (vì phân tử đập tường mạnh hơn). Vd bình khí ngoài nắng → $P$ tăng → có thể nổ.

**Ví dụ**: Bình khí ở 25°C (298 K), $P = 1 \text{ atm}$. Đốt lên 400°C (673 K) ở $V$ const. $P$ mới?
- $P_{\text{new}} = 1 \times (673/298) = $ **2,26 atm**.

### ❓ Câu hỏi tự nhiên của người đọc

- *"3 định luật này có phải 3 luật riêng không?"* Không — cả 3 là **trường hợp đặc biệt** của $PV = nRT$ khi giữ một biến không đổi. Boyle ($T$ const), Charles ($P$ const), Gay-Lussac ($V$ const). Không cần nhớ riêng, suy từ $PV = nRT$ là ra.
- *"Trong các tỉ lệ này dùng $T$ bằng °C được không?"* KHÔNG. Vd Charles $V_1/T_1 = V_2/T_2$ phải dùng Kelvin. Phản ví dụ: 1 L ở 0°C nóng lên... nếu dùng °C thì chia cho 0, vô nghĩa.
- *"Vì sao nóng thì $P$ tăng (đẳng tích)?"* Vì $T$ cao → phân tử nhanh hơn → đập vào thành bình mạnh và nhiều hơn → áp suất tăng.

⚠ **Lỗi thường gặp**

- **Dùng °C trong các tỉ lệ $V/T$, $P/T$**. Phản ví dụ: bóng 2 L ở 27°C đem xuống... nếu lấy $T = 27$ và $T' = -3$ thì tỉ lệ âm, vô lý. Đúng: dùng 300 K và 270 K → $V' = 2 \cdot (270/300) = 1{,}8 \text{ L}$.
- **Lẫn tỉ lệ thuận/nghịch**: Boyle là **nghịch** ($V$ giảm → $P$ tăng), Charles/Gay-Lussac là **thuận** ($T$ tăng → $V$ hoặc $P$ tăng).

🔁 **Dừng lại tự kiểm tra**

1. Nén khí từ 4 L xuống 1 L ở $T$ không đổi, $P$ ban đầu 1 atm. $P$ mới?
2. Bình kín ở 300 K, $P = 2 \text{ atm}$, đốt lên 600 K. $P$ mới?

<details><summary>Đáp án</summary>

1. Boyle: $P_1 V_1 = P_2 V_2 \to P_2 = 1 \cdot 4/1 = $ **4 atm** ($V$ giảm 4 lần → $P$ tăng 4 lần).
2. Gay-Lussac: $P/T$ const $\to P_2 = 2 \cdot (600/300) = $ **4 atm** ($T$ gấp đôi → $P$ gấp đôi).

</details>

### 📝 Tóm tắt mục 3

| Quá trình | Const | Định luật | Hệ quả |
|-----------|-------|-----------|---------|
| Đẳng nhiệt | $T$ | $P \cdot V = $ const (Boyle) | Nén → $P$ tăng |
| Đẳng áp | $P$ | $V/T = $ const (Charles) | Nóng → giãn nở |
| Đẳng tích | $V$ | $P/T = $ const (Gay-Lussac) | Nóng → $P$ tăng (nguy hiểm) |

---

## 4. Động học chất khí — Liên hệ T với KE phân tử

### 4.1. Công thức nền tảng

Phân tích khí lý tưởng bằng cơ học cho thấy **năng lượng động trung bình của 1 phân tử** chỉ phụ thuộc T:

$$KE_{\text{trung bình}} = \tfrac{3}{2} \cdot k_B \cdot T$$

trong đó $k_B$ = hằng số Boltzmann = **1,38 × 10⁻²³ J/K**.

($R = N_A \cdot k_B$, với $N_A$ = số Avogadro.)

💡 **Ý nghĩa**: $T$ thực ra **là** số đo năng lượng động trung bình của phân tử. $T$ cao → phân tử nhanh.

### 4.2. Vận tốc trung bình của phân tử

Từ $KE = \tfrac{1}{2} \cdot m \cdot v^2 = \tfrac{3}{2} \cdot k_B \cdot T \to v_{\text{rms}} = \sqrt{3 k_B \cdot T/m}$.

**Ví dụ**: Phân tử N₂ ở 300 K. $m(\text{N}_2) = 4{,}65 \times 10^{-26} \text{ kg}$.
- $v_{\text{rms}} = \sqrt{3 \cdot 1{,}38 \times 10^{-23} \cdot 300/4{,}65 \times 10^{-26}} = \sqrt{2{,}67 \times 10^5} \approx$ **517 m/s**.
- → Phân tử nitrogen trong phòng bạn đang lao với vận tốc $\approx 500 \text{ m/s} = 1800 \text{ km/h}$!

### 4.3. Nội năng của khí lý tưởng đơn nguyên

$$U = \tfrac{3}{2} \cdot n \cdot R \cdot T$$

(Hệ số $\tfrac{3}{2}$ cho khí 1 nguyên tử như He, Ar. Khí 2 nguyên tử như O₂, N₂ có hệ số $\tfrac{5}{2}$ vì còn dao động.)

### ❓ Câu hỏi tự nhiên của người đọc

- *"Vì sao KE chỉ phụ thuộc $T$, không phụ thuộc loại khí?"* Vì $KE_{\text{trung bình}} = \tfrac{3}{2} k_B \cdot T$ chỉ chứa $T$. Ở cùng $T$, He và O₂ có cùng năng lượng động trung bình. Nhưng vì khối lượng khác → vận tốc khác (khí nhẹ chạy nhanh hơn).
- *"$v_{\text{rms}} \approx 500 \text{ m/s}$ thì sao khói lan chậm vậy?"* Vì phân tử va chạm liên tục (hàng tỉ lần/giây), đường đi zigzag rất ngắn giữa các va chạm. Tốc độ tức thời lớn nhưng "khuếch tán ròng" chậm.
- *"Vì sao khí 2 nguyên tử có hệ số 5/2?"* Vì ngoài 3 bậc tự do tịnh tiến, phân tử 2 nguyên tử còn quay (thêm 2 bậc) → tổng 5 bậc, mỗi bậc góp $\tfrac{1}{2} k_B \cdot T$.

⚠ **Lỗi thường gặp**

- **Dùng $T$ bằng °C trong $KE = \tfrac{3}{2} k_B \cdot T$**. Phải dùng Kelvin ($T$ tuyệt đối). Ở 0°C, $KE \neq 0$; chỉ ở 0 K mới $\approx 0$.
- **Quên căn bậc 2 khi tính $v_{\text{rms}}$**: $v_{\text{rms}} = \sqrt{3 k_B \cdot T/m}$, không phải $3 k_B \cdot T/m$.

🔁 **Dừng lại tự kiểm tra**

1. Ở cùng 300 K, He (nhẹ) và Ar (nặng) — phân tử nào có vận tốc trung bình lớn hơn?
2. Tính KE trung bình của 1 phân tử khí ở 300 K ($k_B = 1{,}38 \times 10^{-23} \text{ J/K}$).

<details><summary>Đáp án</summary>

1. He — vì cùng $KE = \tfrac{3}{2} k_B \cdot T$ nhưng $m$ nhỏ hơn → $v_{\text{rms}} = \sqrt{3 k_B \cdot T/m}$ lớn hơn.
2. $KE = \tfrac{3}{2} \cdot 1{,}38 \times 10^{-23} \cdot 300 = $ **6,21 × 10⁻²¹ J** (mỗi phân tử, ở 300 K).

</details>

### 📝 Tóm tắt mục 4

- $T$ (Kelvin) $\propto$ KE trung bình của phân tử.
- $v_{\text{rms}} = \sqrt{3 k_B \cdot T/m}$. Phân tử khí có $v$ rất nhanh (vài trăm m/s).
- $U = \tfrac{3}{2} nRT$ cho khí đơn nguyên.

---

## 5. Bài tập + Lời giải chi tiết

### Bài tập

**Bài 1**: 2 mol O₂ ở 25°C, $V = 50 \text{ L}$. Tính $P$.

**Bài 2**: Bình khí 10 L có 0.5 mol khí ở 27°C. Đốt nóng lên 127°C ở $V$ const. $P$ thay đổi thế nào?

**Bài 3**: Bóng bay $V = 5 \text{ L}$ ở 27°C (1 atm) được đem lên độ cao nơi $P$ giảm xuống 0.6 atm. Giả sử $T$ không đổi. $V$ mới?

**Bài 4**: Tính vận tốc trung bình ($v_{\text{rms}}$) phân tử He ($m = 6{,}64 \times 10^{-27} \text{ kg}$) ở 300 K.

**Bài 5**: 2 mol khí lý tưởng đơn nguyên ở 200 K. Tính nội năng $U$.

**Bài 6**: Vì sao bình khí ga để ngoài nắng có nguy cơ nổ?

### Lời giải

**Bài 1**: $P = nRT/V = 2 \cdot 8{,}314 \cdot 298/(0{,}05) \approx$ **99 100 Pa ≈ 0,98 atm**.

**Bài 2**: $P/T$ const: $P_{\text{new}}/T_{\text{new}} = P_{\text{old}}/T_{\text{old}} \to P_{\text{new}} = P_{\text{old}} \cdot (T_{\text{new}}/T_{\text{old}}) = P_{\text{old}} \cdot (400/300) = $ **$1{,}33 \cdot P_{\text{old}}$**. Tăng 33%.

**Bài 3**: $PV$ const: $V_{\text{new}} = V_{\text{old}} \cdot (P_{\text{old}}/P_{\text{new}}) = 5 \cdot (1/0{,}6) = $ **8,33 L**. Tăng $\approx 67\%$.

**Bài 4**: $v_{\text{rms}} = \sqrt{3 \cdot 1{,}38 \times 10^{-23} \cdot 300/6{,}64 \times 10^{-27}} = \sqrt{1{,}87 \times 10^6} \approx$ **1366 m/s**. He nhẹ hơn N₂ → nhanh hơn $\approx 2{,}6$ lần. Đó là tại sao He bay khỏi khí quyển Trái Đất dễ.

**Bài 5**: $U = \tfrac{3}{2} \cdot 2 \cdot 8{,}314 \cdot 200 = $ **4988 J ≈ 5 kJ**.

**Bài 6**: Bình ga có $V$ cố định (kín). Để ngoài nắng → $T$ tăng. Theo $P/T = $ const, $P$ tăng theo. Nếu $T$ tăng đủ nhiều, $P$ vượt khả năng chịu của vỏ bình → vỏ vỡ → khí ga phụt ra + có thể bốc cháy → nổ. Lý do tại sao bình ga phải để chỗ mát.

---

## 6. Liên kết và bài tiếp theo

- **Bài tiếp theo**: [Lesson 03 — Entropy & định luật II](../lesson-03-entropy-2nd-law/).

---

## 📝 Tổng kết Lesson 02 (T2)

1. **Khí lý tưởng**: 4 giả định (điểm chất, không tương tác, va đàn hồi, ngẫu nhiên).
2. **$PV = nRT$** ($R = 8{,}314 \text{ J/(mol·K)}$). 1 mol ở STP = 22,4 L.
3. **3 quá trình đặc biệt**: Boyle ($T$ const → $PV$ const), Charles ($P$ const → $V/T$ const), Gay-Lussac ($V$ const → $P/T$ const).
4. **Liên hệ vi mô**: $KE_{\text{phân tử}} = \tfrac{3}{2} k_B \cdot T$. $v_{\text{rms}} = \sqrt{3 k_B \cdot T/m}$.
5. **Nội năng** khí đơn nguyên: $U = \tfrac{3}{2} nRT$.

**Tiếp theo**: [Lesson 03 — Entropy &amp; định luật II](../lesson-03-entropy-2nd-law/)
