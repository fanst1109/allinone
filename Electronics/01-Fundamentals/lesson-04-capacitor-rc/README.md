# Lesson 04 — Tụ điện & Mạch RC

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Hiểu **tụ điện (capacitor)** là gì: cấu tạo, cách tích trữ điện tích và năng lượng, đơn vị Farad.
- Tính toán điện tích, điện áp, điện dung qua công thức **$Q = C \cdot V$**.
- Tính **năng lượng tích lũy** trong tụ: $E = \frac{1}{2} C V^2$.
- Hiểu tụ phản ứng thế nào với **DC** và **tín hiệu thay đổi** (định tính).
- Phân tích **mạch RC nạp và xả**: công thức mũ, hằng số thời gian $\tau$, bảng giá trị chuẩn.
- Biết ứng dụng thực tế: lọc nguồn, debounce, mạch định thời.

## Kiến thức tiền đề

- [Lesson 01 — Điện áp, Dòng điện & Điện trở](../lesson-01-voltage-current-resistance/) — định luật Ohm, đơn vị cơ bản.
- [Lesson 02 — Định luật Kirchhoff](../lesson-02-kirchhoff-circuits/) — KVL, KCL.
- [Lesson 03 — Điện trở & Mạch phân áp](../lesson-03-resistors-divider/) — điện trở trong mạch RC.
- Hàm mũ tự nhiên e^x và logarithm tự nhiên ln (dùng khi tính thời gian): xem [Lesson 07 — Hàm mũ & Logarithm](../../../Math/06-Advanced/lesson-07/) nếu cần ôn lại.

---

## 1. Tụ điện là gì

### 1.1. Cấu tạo vật lý

**Tụ điện (capacitor)** gồm hai **bản cực** dẫn điện (bản kim loại) đặt song song, ngăn cách nhau bởi một lớp **điện môi (dielectric)** không dẫn điện (không khí, gốm, mica, màng nhựa polyester...).

Khi đặt điện áp $V$ vào hai đầu, bản dương tích điện tích $+Q$, bản âm tích $-Q$. Không có dòng DC thực sự chạy xuyên qua lớp điện môi (đó là chất cách điện) — nhưng điện tích tích tụ trên bề mặt, tạo ra một điện trường trong khoảng giữa hai bản.

💡 **Trực giác — Analogy bình chứa nước**

Hãy hình dung tụ điện như một **bình chứa nước** với màng cao su ở giữa:
- Bơm nước vào → màng cao su căng ra → áp lực nước (= điện áp $V$) tăng lên.
- Điện dung $C$ = "kích thước bình" — bình càng to, cùng lượng nước bơm vào thì áp lực tăng ít hơn.
- Điện tích $Q$ = "lượng nước đã bơm vào".
- Nước không chạy xuyên qua màng cao su (= điện môi cách điện), nhưng màng căng ra → "áp lực" truyền sang bên kia.

Analogy này giải thích tại sao tụ "cản DC nhưng cho AC qua" — sẽ thấy rõ ở mục 4.

### 1.2. Công thức cơ bản: Q = C·V

**Điện dung (capacitance) $C$** đo khả năng tích trữ điện tích trên mỗi đơn vị điện áp:

$$Q = C \cdot V$$

trong đó:
- **$Q$** = điện tích tích lũy trên mỗi bản (Coulomb, C)
- **$C$** = điện dung (Farad, F)
- **$V$** = điện áp giữa hai bản (Volt, V)

**Đơn vị — Farad (F)**: 1 F = 1 C/V. 1 Farad rất lớn trong thực tế. Tụ thông thường dùng các đơn vị nhỏ hơn:

| Ký hiệu | Tên | Giá trị | Dùng trong |
|---------|-----|---------|-----------|
| µF | microfarad | $10^{-6}$ F | Tụ lọc nguồn, mạch RC thông dụng |
| nF | nanofarad | $10^{-9}$ F | Mạch lọc tần số cao, RF |
| pF | picofarad | $10^{-12}$ F | Mạch RF, vi điều khiển, điều chỉnh tần số |

**Vì sao cần khái niệm điện dung $C$?** Vì các tụ khác nhau (kích thước khác nhau, điện môi khác nhau) tích được lượng điện tích khác nhau ở cùng điện áp. $C$ là thông số đặc trưng cho từng linh kiện, giống như điện trở $R$ đặc trưng cho điện trở.

### 1.3. Bốn ví dụ số Q = C·V

**Ví dụ 1 — Tụ 100 µF nạp đến 5 V:**
$$Q = 100 \times 10^{-6} \times 5 = 500 \times 10^{-6} \text{ C} = 500 \text{ µC}$$
Điện tích tích lũy 500 µC. Nếu tăng gấp đôi điện áp lên 10 V, $Q$ tăng gấp đôi = 1000 µC.

**Ví dụ 2 — Tụ 10 µF nạp đến 12 V:**
$$Q = 10 \times 10^{-6} \times 12 = 120 \text{ µC}$$
Tụ nhỏ hơn 10 lần (10 µF vs 100 µF) nhưng điện áp cao hơn → tích được ít điện tích hơn.

**Ví dụ 3 — Tụ 470 nF nạp đến 3.3 V (vi điều khiển):**
$$Q = 470 \times 10^{-9} \times 3.3 = 1551 \times 10^{-9} \text{ C} \approx 1.55 \text{ µC}$$

**Ví dụ 4 — Tìm C nếu biết Q = 200 µC ở V = 50 V:**
$$C = \frac{Q}{V} = \frac{200 \times 10^{-6}}{50} = 4 \times 10^{-6} \text{ F} = 4 \text{ µF}$$

❓ **Câu hỏi tự nhiên của người đọc**

> *"Tại sao tụ 1 F lại gọi là 'rất lớn' — tôi thấy bán siêu tụ 1 F rất phổ biến?"*

Siêu tụ (supercapacitor / ultracapacitor) là linh kiện chuyên dụng — dùng kỹ thuật đặc biệt để đạt C lớn. Tụ điện thông thường (ceramic, electrolytic, film) trong mạch điện tử hiếm khi vượt qua vài nghìn µF. Một tụ gốm phổ biến chỉ có 100 pF – 100 nF. Tụ điện phân (electrolytic) có thể đến 10,000 µF. 1 F là ~100 lần lớn hơn tụ điện phân cỡ to nhất.

> *"Điện tích Q có giống như dòng điện I không?"*

Không. $Q$ là lượng điện tích tích lũy (coulomb), $I$ là tốc độ dòng chảy (coulomb/giây = ampere). Khi nạp tụ, $I$ chạy vào tụ → $Q$ tích lũy tăng dần. Khi tụ nạp đầy, $I \to 0$ nhưng $Q$ vẫn còn đó.

### 📝 Tóm tắt mục 1

- Tụ điện = 2 bản cực + điện môi cách điện ở giữa.
- $Q = C \cdot V$: điện tích tỉ lệ thuận với điện dung và điện áp.
- Đơn vị thực tế: µF ($10^{-6}$), nF ($10^{-9}$), pF ($10^{-12}$).
- Analogy: bình chứa nước với màng cao su — $C$ = kích thước bình, $Q$ = lượng nước, $V$ = áp lực.

---

## 2. Năng lượng tích lũy trong tụ

### 2.1. Công thức E = ½·C·V²

**Năng lượng** tích lũy trong điện trường của tụ:

$$E = \frac{1}{2} \cdot C \cdot V^2$$

Đơn vị: Joule (J).

**Vì sao hệ số ½?** Khi nạp tụ từ 0 V đến $V$, điện áp không ngay lập tức nhảy lên $V$ — nó tăng dần. Điện tích đầu tiên bơm vào gần như không mất công ($V \approx 0$), các điện tích sau tốn công nhiều hơn ($V$ đã cao). Công trung bình $= \frac{1}{2} Q V = \frac{1}{2} (C V) V = \frac{1}{2} C V^2$. Giống hệt lý luận thế năng đàn hồi trong lò xo $\frac{1}{2} k x^2$.

**Cũng có thể viết**: dùng $Q = C \cdot V$ để biểu diễn theo $Q$:
$$E = \frac{Q^2}{2C} \qquad \text{hoặc} \qquad E = \frac{1}{2} Q V$$

### 2.2. Ba ví dụ số

**Ví dụ 1 — Tụ điện phân 1000 µF nạp đến 12 V:**
$$E = \frac{1}{2} \times 1000 \times 10^{-6} \times 12^2 = \frac{1}{2} \times 10^{-3} \times 144 = 0.072 \text{ J} = 72 \text{ mJ}$$
72 mJ — đủ để sáng đèn LED 70 mA/3V trong khoảng 0.34 giây khi mất nguồn.

**Ví dụ 2 — Tụ 470 µF nạp đến 5 V (trong Arduino):**
$$E = \frac{1}{2} \times 470 \times 10^{-6} \times 25 = \frac{1}{2} \times 0.01175 = 5.875 \text{ mJ}$$

**Ví dụ 3 — So sánh: cùng C = 100 µF, V tăng từ 5 V lên 10 V:**
- $E_1 = \frac{1}{2} \times 100 \times 10^{-6} \times 25 = 1.25$ mJ
- $E_2 = \frac{1}{2} \times 100 \times 10^{-6} \times 100 = 5$ mJ
- $V$ tăng 2× → $E$ tăng 4× ($V^2$ trong công thức). Giống $KE = \frac{1}{2} m v^2$ trong cơ học.

⚠ **Lỗi thường gặp — Nhầm E tụ với E = Q·V**

Nhiều người viết $E = Q V$ (thiếu hệ số ½). Sai. $E = \frac{1}{2} C V^2 = \frac{1}{2} Q V$. Hệ số ½ quan trọng vì điện áp tăng dần từ 0, không phải hằng số trong suốt quá trình nạp.

### 📝 Tóm tắt mục 2

- $E = \frac{1}{2} C V^2 = \frac{Q^2}{2C} = \frac{1}{2} Q V$.
- $V$ tăng 2× → $E$ tăng 4× (không tuyến tính).
- Hệ số ½ vì điện áp tăng dần trong quá trình nạp, không phải hằng số.

---

## 3. Tụ với DC và tín hiệu thay đổi

### 3.1. Với dòng một chiều DC (ổn định)

Khi nguồn DC ổn định nối vào tụ:
1. Ban đầu, tụ "trống" ($V_C = 0$), dòng nạp $I$ lớn.
2. Điện tích tích lũy → $V_C$ tăng dần → hiệu điện thế giữa nguồn và tụ giảm dần → $I$ giảm dần.
3. Khi $V_C = V_{\text{nguồn}}$: không còn hiệu điện thế → **$I = 0$**. Tụ hành xử như **hở mạch (open circuit)** với DC ổn định.

💡 **Hình dung**: Bình chứa nước được bơm đầy → áp lực bình bằng áp lực bơm → nước ngừng chảy. Bình "cản" nước chảy tiếp.

**Kết luận**: Tụ điện đã nạp đầy sẽ **ngắt dòng DC** — hành xử như dây đứt với nguồn DC ổn định.

### 3.2. Với tín hiệu thay đổi (AC hoặc xung)

Khi điện áp nguồn thay đổi liên tục (tín hiệu AC, xung vuông, tín hiệu dao động), tụ phải liên tục nạp-xả để theo kịp sự thay đổi đó. Quá trình nạp-xả liên tục = **có dòng điện chảy** qua mạch.

Tần số thay đổi càng cao → tụ nạp-xả nhanh hơn → dòng hiệu dụng lớn hơn → tụ "dẫn điện tốt hơn".

**Kết luận định tính**: "Tụ cản DC, cho AC qua" — tụ điện hành xử như một linh kiện có **trở kháng phụ thuộc tần số**. Ở DC ($f = 0$ Hz): trở kháng vô cực (hở mạch). Ở tần số cao: trở kháng nhỏ (gần như nối tắt). Công thức định lượng: $X_C = \dfrac{1}{2 \pi f C}$ — sẽ học chi tiết ở [Lesson 06 — AC & Trở kháng](../lesson-06-ac-impedance-rlc/).

❓ **Câu hỏi tự nhiên của người đọc**

> *"Nếu tụ cản DC, tại sao người ta lại dùng tụ trong mạch nguồn DC?"*

Đây là ứng dụng quan trọng. Nguồn DC thực tế không hoàn toàn "phẳng" — nó có dao động nhỏ (ripple) do nhiễu, do thiết bị tiêu thụ dòng đột biến. Tụ trong mạch nguồn DC hấp thụ những biến động nhanh đó (nạp-xả nhanh với thành phần tần số cao của ripple) → điện áp đầu ra phẳng hơn. Với thành phần DC ổn định ($f = 0$), tụ không can thiệp (đã nạp đầy, $I = 0$).

> *"Bao giờ dòng qua tụ = 0 hoàn toàn trong mạch DC?"*

Chỉ khi tụ đã nạp đầy VÀ không có gì làm thay đổi điện áp nguồn hay tải. Trong thực tế, luôn có nhiễu nhỏ nên luôn có dòng rất nhỏ qua tụ. "$I = 0$" là trạng thái lý tưởng ở trạng thái xác lập (steady state).

### 📝 Tóm tắt mục 3

- Tụ nạp đầy với DC → $I = 0$, tụ = hở mạch với DC ổn định.
- Tín hiệu thay đổi → tụ nạp-xả liên tục → có dòng chảy.
- "Tụ cản DC, cho AC qua" — định tính. Công thức $X_C = \dfrac{1}{2 \pi f C}$ ở Lesson 06.

---

## 4. Mạch RC nạp — V_C(t) = V_s·(1 − e^(−t/τ))

### 4.1. Mạch và phương trình

Mạch RC nạp đơn giản: nguồn DC $V_s$, điện trở $R$, tụ $C$ nối nối tiếp. Ban đầu tụ trống ($V_C = 0$). Tại $t = 0$, đóng công tắc.

Áp dụng KVL: $V_s = V_R + V_C = I \cdot R + V_C$.

Dòng qua tụ: $I = C \cdot \dfrac{dV_C}{dt}$. Thay vào:

$$V_s = R C \frac{dV_C}{dt} + V_C$$

Đây là phương trình vi phân tuyến tính cấp 1. Nghiệm với điều kiện đầu $V_C(0) = 0$:

$$V_C(t) = V_s \left( 1 - e^{-t/\tau} \right)$$

trong đó **$\tau = R \cdot C$** là **hằng số thời gian (time constant)**.

### 4.2. Hằng số thời gian τ — ý nghĩa vật lý

**$\tau$ (tau) $= R \cdot C$** là thông số quyết định tốc độ nạp tụ.

**Ý nghĩa của $\tau$**: tại $t = \tau$, tụ đã nạp được:
$$V_C(\tau) = V_s (1 - e^{-1}) = V_s (1 - 0.368) = V_s \cdot 0.632 \approx 63.2\% \, V_s$$

Nói đơn giản: **sau 1 khoảng $\tau$, tụ nạp được ~63% điện áp nguồn**.

💡 **Tại sao không nạp 100% sau 1τ?** Vì dòng nạp giảm dần khi tụ đầy hơn. Ban đầu dòng lớn → nạp nhanh. Càng gần đầy → dòng càng nhỏ → nạp chậm lại. Đây là đặc tính của hàm mũ: tiệm cận đến $V_s$ nhưng không bao giờ chạm 100% về lý thuyết.

**Đơn vị $\tau$**: $\tau = R \cdot C \to$ Ω × F $= (\text{V/A}) \times (\text{C/V}) = \text{C/A} = \text{s}$. $\tau$ có đơn vị **giây (s)**.

### 4.3. Bảng giá trị chuẩn

| Thời gian | $V_C$ | % nạp | Ghi chú |
|-----------|-----|-------|---------|
| $t = \tau$ | $V_s \cdot 0.632$ | 63.2% | Mốc định nghĩa $\tau$ |
| $t = 2\tau$ | $V_s \cdot 0.865$ | 86.5% | |
| $t = 3\tau$ | $V_s \cdot 0.950$ | 95.0% | Thường coi "gần đầy" |
| $t = 4\tau$ | $V_s \cdot 0.982$ | 98.2% | |
| $t = 5\tau$ | $V_s \cdot 0.993$ | 99.3% | Thực tế coi là "đã nạp xong" |

**Quy tắc kỹ thuật**: trong thực tế, tụ coi là nạp xong sau **5τ**. Đây là con số chuẩn dùng khi thiết kế mạch định thời.

### 4.4. Walk-through số thật: R = 10 kΩ, C = 100 µF, V_s = 9 V

**Bước 1 — Tính τ:**
$$\tau = R C = 10{,}000 \text{ Ω} \times 100 \times 10^{-6} \text{ F} = 1 \text{ s}$$

**Bước 2 — Điền bảng giá trị:**

| t | $V_C(t) = 9(1 - e^{-t/1})$ |
|---|--------------------------|
| $t = 0$ | $9(1 - 1) = 0$ V |
| $t = 1$ s ($= \tau$) | $9(1 - e^{-1}) = 9 \cdot 0.632 =$ **5.69 V** |
| $t = 2$ s ($= 2\tau$) | $9(1 - e^{-2}) = 9 \cdot 0.865 =$ **7.78 V** |
| $t = 3$ s ($= 3\tau$) | $9(1 - e^{-3}) = 9 \cdot 0.950 =$ **8.55 V** |
| $t = 5$ s ($= 5\tau$) | $9(1 - e^{-5}) = 9 \cdot 0.993 =$ **8.94 V** |

**Bước 3 — Dòng nạp tại t = 0:**
$$I_{\max} = \frac{V_s}{R} = \frac{9}{10{,}000} = 0.9 \text{ mA}$$
(Lúc đầu tụ như nối tắt → toàn bộ điện áp rơi trên $R$ → $I = V_s/R$.)

**Bước 4 — Dòng nạp tại t = τ = 1 s:**
$$\begin{aligned}
V_R(\tau) &= V_s - V_C(\tau) = 9 - 5.69 = 3.31 \text{ V} \\
I(\tau) &= \frac{V_R}{R} = \frac{3.31}{10{,}000} = 0.33 \text{ mA} \approx \frac{1}{e} \times I_{\max} \;\checkmark
\end{aligned}$$

⚠ **Lỗi thường gặp — Dùng τ như "thời gian nạp đầy"**

$\tau = 1$ s KHÔNG có nghĩa "tụ nạp đầy sau 1 giây". Sau 1 s tụ mới nạp được 63%. Phải sau $5\tau = 5$ s mới coi là đầy (~99%). Sai số khi thiết kế timer: nếu dùng 1τ thay vì 5τ làm mốc "đầy" → kết quả sai 37%.

🔁 **Dừng lại tự kiểm tra**

Cho R = 4.7 kΩ, C = 220 µF, $V_s = 5$ V. Tính: (a) $\tau$, (b) $V_C$ sau 1τ, (c) thời gian để coi là nạp xong.

<details>
<summary>Xem đáp án</summary>

(a) $\tau = 4700 \times 220 \times 10^{-6} = 1.034$ s $\approx 1.03$ s

(b) $V_C(1\tau) = 5 \times 0.632 = 3.16$ V

(c) Nạp xong sau $5\tau \approx 5 \times 1.03 = 5.15$ s

</details>

### 📝 Tóm tắt mục 4

- Công thức nạp: $V_C(t) = V_s (1 - e^{-t/\tau})$ với $\tau = R C$.
- Sau 1τ: ≈ 63% | 2τ: ≈ 86% | 3τ: ≈ 95% | 5τ: ≈ 99% (coi là đầy).
- $\tau$ đơn vị giây, bằng $R(\text{Ω}) \times C(\text{F})$.
- Dòng nạp ban đầu $I_{\max} = V_s/R$, giảm dần theo mũ.

---

## 5. Mạch RC xả — V_C(t) = V₀·e^(−t/τ)

### 5.1. Phương trình xả

Khi tụ đã nạp đến $V_0$ rồi **ngắt nguồn**, nối tụ qua điện trở $R$ để xả, tụ sẽ phóng điện qua $R$:

$$V_C(t) = V_0 \, e^{-t/\tau} \qquad \text{với } \tau = R C \text{ (giống hệt khi nạp)}$$

Quá trình xả là đối xứng với nạp về cấu trúc toán học — chỉ khác chiều (giảm thay vì tăng).

**Bảng giá trị xả:**

| Thời gian | $V_C$ | % còn lại |
|-----------|-----|-----------|
| $t = 0$ | $V_0$ | 100% |
| $t = \tau$ | $V_0 \cdot 0.368$ | 36.8% |
| $t = 2\tau$ | $V_0 \cdot 0.135$ | 13.5% |
| $t = 3\tau$ | $V_0 \cdot 0.050$ | 5.0% |
| $t = 5\tau$ | $V_0 \cdot 0.007$ | 0.7% ≈ 0 |

**Cùng quy tắc 5τ**: sau 5τ tụ xả gần hết (còn < 1%).

### 5.2. Walk-through xả: V₀ = 9 V, R = 10 kΩ, C = 100 µF

$\tau = 1$ s (giống ví dụ nạp).

| t | $V_C(t) = 9 \, e^{-t}$ |
|---|-------------------|
| $t = 0$ | 9 V |
| $t = 1$ s | $9 \times 0.368 =$ **3.31 V** |
| $t = 2$ s | $9 \times 0.135 =$ **1.22 V** |
| $t = 3$ s | $9 \times 0.050 =$ **0.45 V** |
| $t = 5$ s | $9 \times 0.007 =$ **0.06 V** |

**Dòng xả ban đầu** (lúc tụ còn đầy $V_0$):
$$I_{\max} = \frac{V_0}{R} = \frac{9}{10{,}000} = 0.9 \text{ mA} \quad \text{(chiều ngược lại với khi nạp)}$$

### 5.3. Tính thời gian bằng logarithm tự nhiên

Khi cần tìm thời gian t để đạt V_C mong muốn, dùng ln:

**Khi nạp** (đạt $V_{\text{target}}$):
$$\begin{aligned}
V_{\text{target}} &= V_s (1 - e^{-t/\tau}) \\
e^{-t/\tau} &= 1 - \frac{V_{\text{target}}}{V_s} \\
-\frac{t}{\tau} &= \ln\!\left( 1 - \frac{V_{\text{target}}}{V_s} \right) \\
t &= -\tau \ln\!\left( 1 - \frac{V_{\text{target}}}{V_s} \right)
\end{aligned}$$

**Khi xả** (giảm từ $V_0$ xuống $V_{\text{target}}$):
$$\begin{aligned}
V_{\text{target}} &= V_0 \, e^{-t/\tau} \\
t &= -\tau \ln\!\left( \frac{V_{\text{target}}}{V_0} \right) = \tau \ln\!\left( \frac{V_0}{V_{\text{target}}} \right)
\end{aligned}$$

**Ví dụ**: R = 10 kΩ, C = 100 µF, nạp từ 9 V. Tìm $t$ để $V_C = 7$ V.
$$t = -1 \cdot \ln\!\left( 1 - \frac{7}{9} \right) = -\ln\!\left( \frac{2}{9} \right) = -\ln(0.222) = -(-1.504) = 1.504 \text{ s} \approx 1.5\tau$$

⚠ **Lỗi thường gặp — Dùng tỉ lệ tuyến tính cho mạch RC**

Sai khi nói "tụ nạp 50% điện áp thì mất nửa thời gian so với nạp 100%". Tụ nạp 50% mất thời gian $t = -\tau \ln(0.5) \approx 0.693\tau$ (không phải $0.5 \times 5\tau$). Đường cong là hàm mũ, không tuyến tính.

🔁 **Dừng lại tự kiểm tra**

Tụ 47 µF xả qua R = 22 kΩ từ $V_0 = 12$ V. Sau bao lâu thì còn 3 V?

<details>
<summary>Xem đáp án</summary>

$\tau = 22{,}000 \times 47 \times 10^{-6} = 1.034$ s

$t = \tau \ln\!\left( \dfrac{12}{3} \right) = 1.034 \times \ln(4) = 1.034 \times 1.386 =$ **1.433 s ≈ 1.39τ**

</details>

### 📝 Tóm tắt mục 5

- Xả: $V_C(t) = V_0 \, e^{-t/\tau}$, cùng $\tau = R C$ với nạp.
- Sau 1τ: còn ≈ 37% | 5τ: còn < 1%.
- Tìm $t$ khi nạp: $t = -\tau \ln(1 - V_{\text{target}}/V_s)$.
- Tìm $t$ khi xả: $t = \tau \ln(V_0/V_{\text{target}})$.

---

## 6. Ứng dụng thực tế

### 6.1. Lọc nguồn (Bypass / Decoupling Capacitor)

Trong mạch nguồn DC, tụ điện phân lớn (100 µF – 10,000 µF) đặt song song với tải để:
- Hấp thụ biến động điện áp ngắn hạn khi tải đột ngột rút dòng lớn.
- Giảm ripple (dao động AC) ở đầu ra bộ chỉnh lưu.

Tụ gốm nhỏ (100 nF – 1 µF) đặt ngay chân VCC–GND của mỗi IC để lọc nhiễu tần số cao (100 MHz trở lên) mà tụ lớn không kịp phản ứng ($\tau = R C$ nhỏ → nạp-xả rất nhanh).

### 6.2. Mạch định thời (RC Timer)

Mạch RC là cơ sở của IC 555 timer — mạch tạo xung, mạch định thời delay, PWM đơn giản. Nguyên lý: nạp tụ qua $R$, dùng ngưỡng điện áp (thường $\frac{2}{3} V_{cc}$) làm điểm trigger. Thời gian đạt ngưỡng $\frac{2}{3} V_{cc}$:

$$t = -\tau \ln\!\left( 1 - \frac{2}{3} \right) = -\tau \ln\!\left( \frac{1}{3} \right) = \tau \ln(3) \approx 1.099\tau$$

Công thức này giải thích tại sao datasheet IC 555 có hệ số 1.1 trong công thức tính thời gian.

### 6.3. Debounce nút nhấn

Nút cơ khí (mechanical button) khi nhấn thường "rung" (bounce) trong 5–20 ms — tiếp điểm đóng mở nhiều lần nhanh, vi điều khiển đọc nhiều lần nhấn thay vì một. Mạch RC (R ~10 kΩ, C ~100 nF → $\tau \approx 1$ ms) lọc các nhiễu ngắn này, vi điều khiển chỉ thấy tín hiệu "sạch" sau vài $\tau$.

Trong thực tế, debounce thường làm bằng phần mềm (đọc trạng thái sau 20 ms) nhưng RC hardware debounce vẫn hữu ích khi cần phản ứng nhanh.

### 6.4. Chống nhiễu (EMI Filtering)

Tụ gốm 100 pF – 1 nF đặt song song với cuộn dây relay, motor để hấp thụ xung điện áp ngược khi ngắt dòng qua cuộn dây (hiện tượng back-EMF). Bảo vệ vi điều khiển và transistor khỏi điện áp spike nguy hiểm.

### 📝 Tóm tắt mục 6

- Bypass/decoupling: tụ song song với nguồn, lọc ripple và nhiễu.
- RC timer: cơ sở IC 555, mạch delay.
- Debounce: RC lọc tín hiệu rung cơ khí.
- Snubber: tụ bảo vệ khỏi back-EMF của motor/relay.

---

## 7. Bài tập + Lời giải chi tiết

### Bài tập

**Bài 1**: Tụ điện dung C = 220 µF được nạp đến $V = 15$ V. Tính:
(a) điện tích tích lũy $Q$,
(b) năng lượng tích lũy $E$.

**Bài 2**: Mạch RC có R = 33 kΩ, C = 47 µF. Tính hằng số thời gian $\tau$. Sau bao lâu thì tụ coi là đã nạp xong (≥ 99%)?

**Bài 3**: Mạch RC nạp: R = 10 kΩ, C = 100 µF, $V_s = 12$ V. Tính $V_C$ tại $t = 0.5$ s, $t = 1$ s, $t = 2$ s, $t = 5$ s.

**Bài 4**: Tụ 100 µF đã nạp đến $V_0 = 9$ V. Xả qua R = 5 kΩ. Sau bao lâu $V_C$ giảm xuống còn 1 V?

**Bài 5**: Mạch RC nạp từ 5 V qua R = 47 kΩ, C = 10 µF. Tìm thời gian $t$ để $V_C$ đạt 4 V.

**Bài 6 (khó hơn)**: Một mạch debounce dùng R = 10 kΩ, C = 100 nF. Nút nhấn gây bounce trong 15 ms. Tụ có đủ thời gian đạt ≥ 95% (3τ) trước khi bounce kết thúc không? Đánh giá hiệu quả mạch.

### Lời giải chi tiết

**Bài 1:**

**(a) Điện tích Q:**
$$Q = C V = 220 \times 10^{-6} \text{ F} \times 15 \text{ V} = 3300 \times 10^{-6} \text{ C} = 3300 \text{ µC} = 3.3 \text{ mC}$$

**(b) Năng lượng E:**
$$\begin{aligned}
E &= \frac{1}{2} C V^2 = \frac{1}{2} \times 220 \times 10^{-6} \times 15^2 = \frac{1}{2} \times 220 \times 10^{-6} \times 225 \\
&= \frac{1}{2} \times 0.0495 = 0.02475 \text{ J} \approx 24.75 \text{ mJ}
\end{aligned}$$
Hoặc kiểm tra: $E = \frac{1}{2} Q V = \frac{1}{2} \times 3300 \times 10^{-6} \times 15 = \frac{1}{2} \times 0.0495 = 0.02475$ J ✓

---

**Bài 2:**

**Bước 1 — Tính τ:**
$$\tau = R C = 33{,}000 \times 47 \times 10^{-6} = 1.551 \text{ s} \approx 1.55 \text{ s}$$

**Bước 2 — Thời gian nạp xong (5τ):**
$$t_{\text{nạp xong}} = 5\tau = 5 \times 1.55 = 7.75 \text{ s}$$

Sau ~7.75 s, $V_C \approx 99.3\% \, V_s$ → coi là nạp xong trong thiết kế thực tế.

---

**Bài 3:**

$\tau = 10{,}000 \times 100 \times 10^{-6} = 1$ s.

Công thức: $V_C(t) = 12(1 - e^{-t/1}) = 12(1 - e^{-t})$

| t | $e^{-t}$ | $1 - e^{-t}$ | $V_C$ |
|---|--------|------------|-----|
| 0.5 s | $e^{-0.5} = 0.6065$ | 0.3935 | $12 \times 0.3935 =$ **4.72 V** |
| 1 s | $e^{-1} = 0.3679$ | 0.6321 | $12 \times 0.6321 =$ **7.59 V** |
| 2 s | $e^{-2} = 0.1353$ | 0.8647 | $12 \times 0.8647 =$ **10.38 V** |
| 5 s | $e^{-5} = 0.0067$ | 0.9933 | $12 \times 0.9933 =$ **11.92 V** |

Nhận xét: tại $t = 5\tau = 5$ s, $V_C = 11.92$ V ≈ 99.3% × 12 V ✓

---

**Bài 4:**

$\tau = R C = 5{,}000 \times 100 \times 10^{-6} = 0.5$ s.

Tìm $t$ để $V_C = 1$ V khi xả từ $V_0 = 9$ V:
$$\begin{aligned}
V_C &= V_0 \, e^{-t/\tau} \\
1 &= 9 \, e^{-t/0.5} \\
e^{-t/0.5} &= \frac{1}{9} \\
-\frac{t}{0.5} &= \ln\!\left( \frac{1}{9} \right) = -\ln(9) \\
t &= 0.5 \times \ln(9) = 0.5 \times 2.197 = 1.099 \text{ s} \approx 1.1 \text{ s}
\end{aligned}$$

Kiểm tra: $V_C(1.1) = 9 \, e^{-1.1/0.5} = 9 \, e^{-2.2} = 9 \times 0.111 = 1.0$ V ✓

Vậy sau khoảng **1.1 s** (≈ 2.2τ), $V_C$ giảm xuống còn 1 V.

---

**Bài 5:**

$\tau = R C = 47{,}000 \times 10 \times 10^{-6} = 0.47$ s.

Tìm $t$ để $V_C = 4$ V khi nạp từ $V_s = 5$ V:
$$\begin{aligned}
4 &= 5(1 - e^{-t/0.47}) \\
\frac{4}{5} &= 1 - e^{-t/0.47} \\
e^{-t/0.47} &= 1 - 0.8 = 0.2 \\
-\frac{t}{0.47} &= \ln(0.2) = -1.609 \\
t &= 0.47 \times 1.609 = 0.756 \text{ s} \approx 0.76 \text{ s}
\end{aligned}$$

Kiểm tra: $V_C(0.76) = 5(1 - e^{-0.76/0.47}) = 5(1 - e^{-1.617}) = 5(1 - 0.199) = 5 \times 0.801 =$ **4.00 V** ✓

---

**Bài 6:**

**Bước 1 — Tính τ:**
$$\tau = 10{,}000 \times 100 \times 10^{-9} = 1 \times 10^{-3} \text{ s} = 1 \text{ ms}$$

**Bước 2 — Thời gian đạt 3τ (95%):**
$$3\tau = 3 \text{ ms}$$

**Bước 3 — So sánh với thời gian bounce:**
- Bounce kéo dài 15 ms. Tụ đạt 95% sau 3 ms. 3 ms < 15 ms.
- Nghĩa là trong 15 ms bounce, tụ **đã đạt 95% rồi** → vẫn bị ảnh hưởng bởi các bounce sau lần đầu tiên (vì sau mỗi lần bounce, tụ lại nạp/xả trong 3 ms).

**Đánh giá**: Mạch này KHÔNG đủ hiệu quả debounce vì $\tau = 1$ ms quá nhỏ so với thời gian bounce 15 ms. Để debounce hiệu quả, cần $\tau \geq$ thời gian bounce, tức là $\tau \geq 15$ ms. Ví dụ: R = 10 kΩ, C = 2.2 µF → $\tau = 22$ ms ≥ 15 ms ✓. Hoặc R = 22 kΩ, C = 1 µF → $\tau = 22$ ms ✓.

---

## 8. Liên kết và bài tiếp theo

- **Tiền đề đã học**:
  - [Lesson 03 — Điện trở & Mạch phân áp](../lesson-03-resistors-divider/) — điện trở là R trong mạch RC này.
  - [Lesson 01 — Điện áp & Dòng điện](../lesson-01-voltage-current-resistance/) — đơn vị cơ bản.
- **Bài tiếp theo**: [Lesson 05 — Cuộn cảm & Mạch RL](../lesson-05-inductor-rl/) — linh kiện "anh em" của tụ: cũng có hằng số thời gian $\tau = L/R$, cũng vẽ đường cong mũ, nhưng cản AC thay vì cản DC.
- **Mở rộng sau**: [Lesson 06 — AC & Trở kháng RLC](../lesson-06-ac-impedance-rlc/) — công thức $X_C = \dfrac{1}{2 \pi f C}$ định lượng hóa "tụ cho AC qua".

---

## 📝 Tổng kết Lesson 04

1. **$Q = C V$**: điện tích tỉ lệ thuận $C$ và $V$. Đơn vị: µF, nF, pF trong thực tế.
2. **$E = \frac{1}{2} C V^2$**: năng lượng tụ. $V$ tăng 2× → $E$ tăng 4× (vì $V^2$).
3. **Tụ với DC**: nạp đầy → $I = 0$ (hở mạch). Với tín hiệu thay đổi: nạp-xả liên tục, có dòng.
4. **Nạp**: $V_C(t) = V_s (1 - e^{-t/\tau})$, $\tau = R C$. Sau 5τ ≈ 99% → coi là đầy.
5. **Xả**: $V_C(t) = V_0 \, e^{-t/\tau}$, cùng $\tau$. Sau 5τ ≈ 1% → coi là hết.
6. **Mốc chuẩn**: 1τ = 63%, 3τ = 95%, 5τ = 99% (nạp) | 1τ = 37%, 5τ = 1% (xả).
7. **Ứng dụng**: lọc nguồn, IC 555 timer, debounce nút nhấn, chống back-EMF.

**Visualization**: [visualization.html](./visualization.html)
