# Lesson 01 (Tier 2) — Nhiệt độ & Nhiệt lượng

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Phân biệt rõ **nhiệt độ T** (đo "mức nóng") và **nhiệt lượng Q** (đo "tổng năng lượng nhiệt"). Đây là 2 khái niệm thường nhầm lẫn.
- Hiểu **3 thang nhiệt độ**: Celsius (°C), Fahrenheit (°F), Kelvin (K) — biết chuyển đổi.
- Tính nhiệt lượng cần để **làm nóng** vật: $Q = m \cdot c \cdot \Delta T$.
- Hiểu **nhiệt nóng chảy / nhiệt hóa hơi** (latent heat): $Q = m \cdot L$.
- Phát biểu **định luật I nhiệt động học** $\Delta U = Q + W$ (bảo toàn năng lượng cho hệ nhiệt).
- Nhận diện **3 cách truyền nhiệt**: dẫn nhiệt, đối lưu, bức xạ.

## Kiến thức tiền đề

- [Lesson 04 (T1) — Công & năng lượng](../../01-Mechanics/lesson-04-work-energy/) — biết khái niệm năng lượng.

---

## 1. Nhiệt độ vs Nhiệt lượng

### 1.1. Nhiệt độ T

**Nhiệt độ T** = đại lượng đo "mức độ nóng/lạnh" của một vật. Ở mức vi mô, T tỉ lệ với **năng lượng động trung bình của các phân tử**:

$$KE_{\text{trung bình}} \propto k_B \cdot T \quad (k_B = \text{hằng số Boltzmann})$$

💡 **Ý nghĩa cụ thể**: nhiệt độ cao = các phân tử chuyển động nhanh (lắc lư, va chạm nhanh). Nhiệt độ thấp = phân tử chuyển động chậm. Tại **0 K** (Kelvin = "không tuyệt đối"), phân tử **gần như đứng yên** (chỉ còn dao động lượng tử nhỏ).

**Vì sao cần khái niệm này (không chỉ dùng năng lượng)?** Vì nhiệt độ không phụ thuộc khối lượng — đo "mức nóng", không phải "tổng nhiệt". 1 cốc nước 80°C và 1 hồ nước 80°C có cùng T, nhưng tổng năng lượng nhiệt của hồ lớn hơn cốc rất nhiều.

### 1.2. Nhiệt lượng Q

**Nhiệt lượng Q** = lượng năng lượng **truyền** giữa các vật do **chênh lệch nhiệt độ**.

Đơn vị: **Joule (J)**. Đơn vị cũ: **calorie (cal)** = $4{,}184 \text{ J}$ (1 cal làm 1 gam nước nóng lên $1^\circ\text{C}$).

💡 **Sự khác biệt**: T đo "trạng thái" (vật đang nóng ra sao), Q đo "lượng truyền" (đã nhận hay mất bao nhiêu năng lượng). Tương tự:
- Vị trí (m) vs khoảng cách di chuyển (m) — đo "ở đâu" vs "đi bao nhiêu".
- Tài khoản (đồng) vs giao dịch (đồng) — đo "có bao nhiêu" vs "đã trao đổi bao nhiêu".

### 1.3. Ví dụ trực giác

**Ví dụ — 1 que diêm đang cháy vs hồ nước nóng**:
- Que diêm: $T \approx 800^\circ\text{C}$, $m \approx 0{,}1 \text{ g}$ → tổng nhiệt nhỏ.
- Hồ nước: $T \approx 30^\circ\text{C}$, $m \approx 10^6 \text{ kg}$ → tổng nhiệt cực lớn.
- Que diêm có T cao hơn nhưng nhiệt lượng (tổng) nhỏ hơn rất nhiều so với hồ. 

→ Đó là tại sao **rơi vào hồ nước $30^\circ\text{C}$ nguy hiểm hơn rơi vào que diêm cùng vài giây** (hồ truyền được nhiều Q hơn).

### ❓ Câu hỏi tự nhiên của người đọc

- *"Hai vật cùng T thì có cùng nhiệt lượng Q không?"* Không. T là "mức nóng", Q là "tổng năng lượng nhiệt" và phụ thuộc khối lượng. 1 g nước và 1 tấn nước cùng $80^\circ\text{C}$ có cùng T, nhưng tấn nước chứa nhiều năng lượng nhiệt gấp $10^6$ lần.
- *"Nóng hơn nghĩa là có nhiều nhiệt lượng hơn?"* Không nhất thiết. Que diêm $800^\circ\text{C}$ nóng hơn hồ nước $30^\circ\text{C}$, nhưng hồ chứa năng lượng nhiệt khổng lồ hơn (vì m lớn). $T$ cao $\neq Q$ lớn.
- *"Vì sao nhiệt tự truyền từ nóng sang lạnh, không ngược lại?"* Vì các phân tử nóng (chuyển động nhanh) va chạm phân tử lạnh (chậm) và san sẻ năng lượng động — về trung bình, "nhanh" mất bớt cho "chậm". Đây là biểu hiện của định luật II (Lesson 03).

⚠ **Lỗi thường gặp**

- **Nhầm "nhiệt độ" với "nhiệt lượng"**. Câu "cốc nước này nhiều nhiệt độ" là sai — nhiệt độ là một mức (như độ cao), không phải lượng tích trữ. Đúng: "cốc nước này có nhiệt độ cao" hoặc "chứa nhiều nhiệt lượng".
- **Tưởng vật nóng hơn luôn truyền cho ta nhiều năng lượng hơn**. Phản ví dụ: chạm tia lửa $800^\circ\text{C}$ (m rất nhỏ) chỉ giật mình, nhưng nhúng tay vào nước $60^\circ\text{C}$ (m lớn) bỏng nặng — vì nước truyền được Q nhiều hơn dù T thấp hơn.

🔁 **Dừng lại tự kiểm tra**

1. Đun 1 g nước lên $90^\circ\text{C}$ và 1 kg nước lên $50^\circ\text{C}$. Cái nào có T cao hơn? Cái nào chứa nhiều năng lượng nhiệt hơn?
2. Nếu trộn 2 cốc nước cùng $40^\circ\text{C}$, nhiệt độ hỗn hợp có thành $80^\circ\text{C}$ không?

<details><summary>Đáp án</summary>

1. T cao hơn: cốc 1 g ($90^\circ\text{C}$). Năng lượng nhiệt nhiều hơn: cốc 1 kg — vì $Q \propto m \cdot T$, mà m gấp 1000 lần bù thừa cho T chỉ thấp hơn $\approx 1{,}8$ lần.
2. Không. Nhiệt độ là cường độ, không cộng dồn. Trộn 2 cốc cùng $40^\circ\text{C}$ → vẫn $40^\circ\text{C}$ (chỉ tổng Q tăng gấp đôi).

</details>

### 📝 Tóm tắt mục 1

- T: mức độ nóng, $\propto$ KE trung bình phân tử.
- Q: năng lượng nhiệt truyền do chênh T.
- 2 khái niệm khác nhau — đừng nhầm.

---

## 2. Ba thang nhiệt độ

| Thang | Ký hiệu | Định nghĩa |
|-------|---------|-------------|
| Celsius | °C | $0^\circ\text{C}$ = nước đóng băng, $100^\circ\text{C}$ = nước sôi (ở 1 atm) |
| Fahrenheit | °F | $32^\circ\text{F}$ = đóng băng, $212^\circ\text{F}$ = sôi |
| Kelvin | K | 0 K = không tuyệt đối (vi phân không thể đạt) |

**Chuyển đổi**:
$$\begin{aligned}
K &= {}^\circ\text{C} + 273{,}15 \\
{}^\circ\text{F} &= \tfrac{9}{5} \cdot {}^\circ\text{C} + 32 \\
{}^\circ\text{C} &= \tfrac{5}{9} \cdot ({}^\circ\text{F} - 32)
\end{aligned}$$

💡 **Quy ước SI**: dùng Kelvin trong vật lý. $\Delta 1 \text{ K} = \Delta 1^\circ\text{C}$ (cùng kích thước, chỉ khác gốc).

### Ví dụ chuyển đổi

| | °C | °F | K |
|---|----|----|----|
| Không tuyệt đối | −273.15 | −459.67 | 0 |
| Đóng băng nước | 0 | 32 | 273.15 |
| Phòng | 25 | 77 | 298.15 |
| Sôi nước | 100 | 212 | 373.15 |
| Mặt Trời | 5500 | 9932 | 5773 |

💡 **Trực giác**: 3 thang giống như 3 cây thước đo cùng một thanh gỗ nhưng vạch số 0 đặt ở chỗ khác và độ chia khác nhau. Celsius đặt 0 ở băng tan, Kelvin đặt 0 ở "không tuyệt đối" (không thể lạnh hơn). Cùng một vật, 3 thang cho 3 con số khác nhau nhưng mô tả cùng "mức nóng".

### ❓ Câu hỏi tự nhiên của người đọc

- *"Vì sao cần Kelvin khi đã có Celsius?"* Vì nhiều công thức vật lý ($PV = nRT$, $\eta_{\text{Carnot}} = 1 - T_c/T_h$) đòi T phải là **đại lượng tuyệt đối tỉ lệ với năng lượng** — bắt đầu từ 0 thật. Dùng $^\circ\text{C}$ trong các công thức này cho kết quả sai (có thể chia cho số âm).
- *"$\Delta T = 10^\circ\text{C}$ có bằng $\Delta T = 10 \text{ K}$ không?"* Có, **chênh lệch** bằng nhau vì 2 thang cùng độ chia (chỉ khác gốc). Nhưng **giá trị tuyệt đối** thì khác: $10^\circ\text{C} = 283{,}15 \text{ K}$.
- *"Có nhiệt độ âm tuyệt đối (dưới 0 K) không?"* Không trong nghĩa thông thường — 0 K là giới hạn dưới khi chuyển động phân tử dừng. (Có khái niệm "nhiệt độ âm" trong hệ spin đặc biệt nhưng đó là chủ đề nâng cao, không phải "lạnh hơn 0 K".)

⚠ **Lỗi thường gặp**

- **Lẫn "chênh lệch" và "giá trị tuyệt đối" giữa °C và K**. Trong $Q = m \cdot c \cdot \Delta T$, dùng $\Delta T = 75^\circ\text{C}$ hay $75 \text{ K}$ đều cho cùng kết quả (chênh lệch giống nhau). NHƯNG trong $PV = nRT$ phải dùng T tuyệt đối: $T = 25^\circ\text{C} = $ **298,15 K**, không phải 25.
  - Phản ví dụ: $\eta_{\text{Carnot}}$ với $T_h = 100^\circ\text{C}$, $T_c = 0^\circ\text{C}$. Sai (dùng °C): $1 - 0/100 = 100\%$ (!?). Đúng (dùng K): $1 - 273/373 = 26{,}8\%$.
- **Quên $+273{,}15$ khi đổi sang Kelvin**: $0^\circ\text{C}$ là $273{,}15 \text{ K}$, không phải 0 K.

🔁 **Dừng lại tự kiểm tra**

1. Đổi $37^\circ\text{C}$ (thân nhiệt) sang K và °F.
2. Một quá trình làm vật tăng từ $20^\circ\text{C}$ lên $50^\circ\text{C}$. $\Delta T$ bằng bao nhiêu K?

<details><summary>Đáp án</summary>

1. $K = 37 + 273{,}15 = $ **310,15 K**. ${}^\circ\text{F} = \tfrac{9}{5} \cdot 37 + 32 = 66{,}6 + 32 = $ **98,6°F**.
2. $\Delta T = 50 - 20 = 30^\circ\text{C} = $ **30 K** (chênh lệch bằng nhau ở 2 thang).

</details>

### 📝 Tóm tắt mục 2

- $K = {}^\circ\text{C} + 273{,}15$. Dùng K trong tính toán vật lý.
- ${}^\circ\text{F} = \tfrac{9}{5}{}^\circ\text{C} + 32$ (chỉ Mỹ dùng).

---

## 3. Định luật I nhiệt động học

### 3.1. Phát biểu

**Định luật I nhiệt động** = **bảo toàn năng lượng** áp cho hệ nhiệt:

$$\Delta U = Q + W$$

trong đó:
- $\Delta U$ = biến thiên nội năng của hệ (tổng năng lượng phân tử bên trong).
- **Q** = nhiệt truyền VÀO hệ ($Q > 0$ nếu hệ nhận nhiệt).
- **W** = công truyền VÀO hệ ($W > 0$ nếu môi trường làm công vào hệ; $W < 0$ nếu hệ làm công ra ngoài).

💡 **Ý nghĩa**: nội năng U có thể tăng bằng 2 cách: **bơm nhiệt vào** (Q) hoặc **làm công vào hệ** (W). Năng lượng không tự tạo, không tự mất.

**Vì sao quan trọng?** Đây là cơ sở của mọi máy nhiệt, mọi quá trình hóa học, sinh học. Không có nó, không tồn tại động cơ ô tô, tủ lạnh, nhà máy điện.

### 3.2. Ví dụ trực giác

**Ví dụ — Bơm xe đạp**: Khi bạn bơm nhanh, ống bơm nóng lên. Tại sao? Vì bạn **làm công vào không khí trong ống** (nén nó). $W > 0 \to \Delta U > 0 \to T$ tăng.

**Ví dụ — Nồi cơm điện**: Cấp $Q$ (điện làm dây mayso nóng). $W = 0$. $\Delta U = Q \to$ nước trong nồi tăng $U \to$ tăng $T \to$ cơm chín.

### 3.3. Nội năng U — định nghĩa đủ 3 phần

**(a) Là gì**: **Nội năng U** = tổng năng lượng "bên trong" của hệ — năng lượng động của mọi phân tử (chuyển động, dao động, quay) cộng năng lượng tương tác giữa chúng. Đơn vị: **Joule (J)**.

**(b) Vì sao cần**: T chỉ đo "mức nóng trung bình mỗi phân tử", còn U đo **tổng** năng lượng phân tử của cả hệ — phụ thuộc cả m lẫn T. Định luật I phát biểu gọn nhờ U: mọi cách "nạp năng lượng vào" (nhiệt Q hoặc công W) đều quy về thay đổi U. Không có U thì không phát biểu được bảo toàn năng lượng cho hệ nhiệt.

**(c) Ví dụ số kèm đơn vị**: 2 mol khí He (đơn nguyên) ở 300 K có $U = \tfrac{3}{2} \cdot n \cdot R \cdot T = \tfrac{3}{2} \cdot 2 \cdot 8{,}314 \cdot 300 = $ **7482,6 J** (dùng $R = 8{,}314 \text{ J/(mol·K)}$, xem Lesson 02). Nếu cấp thêm $Q = 1000 \text{ J}$ mà không làm công ($W = 0$): $\Delta U = Q = 1000 \text{ J} \to U$ mới $= 8482{,}6 \text{ J} \to T$ tăng lên $T' = U' \cdot \tfrac{2}{3 \cdot n \cdot R} = 8482{,}6 \cdot \tfrac{2}{3 \cdot 2 \cdot 8{,}314} = $ **340,1 K**.

### ❓ Câu hỏi tự nhiên của người đọc

- *"U và Q khác nhau thế nào? Cả hai đều là năng lượng mà?"* U là **trạng thái** (hệ đang chứa bao nhiêu năng lượng — như số dư tài khoản). Q là **dòng truyền** (đã nhận/mất bao nhiêu — như một giao dịch). Nói "hệ có bao nhiêu Q" là sai; chỉ nói "hệ có bao nhiêu U" và "đã truyền bao nhiêu Q".
- *"Dấu của W theo quy ước nào?"* Bài này dùng quy ước **W = công môi trường làm VÀO hệ** (nén khí → W > 0). Có sách dùng ΔU = Q − W với W = công hệ làm RA. Hai quy ước chỉ khác dấu W — luôn kiểm tra sách đang dùng quy ước nào.
- *"Hệ cô lập (không Q, không W) thì U thế nào?"* Q = 0, W = 0 → ΔU = 0 → U bảo toàn. Năng lượng bên trong không tự sinh tự mất.

⚠ **Lỗi thường gặp**

- **Sai dấu công W**. Với quy ước $\Delta U = Q + W$ của bài này: khí **bị nén** (môi trường làm công vào) $\to W > 0$; khí **giãn nở** (hệ đẩy piston ra) $\to W < 0$. Phản ví dụ: khí giãn nở làm 200 J công ra ngoài và nhận $Q = 500 \text{ J} \to \Delta U = 500 + (-200) = $ **300 J** (không phải 700 J).
- **Lẫn U với Q**: viết "nội năng truyền vào" trong khi cái truyền là nhiệt lượng $Q$.

🔁 **Dừng lại tự kiểm tra**

1. Hệ nhận $Q = 800 \text{ J}$ và đồng thời bị nén bởi công $W = 300 \text{ J}$. $\Delta U$ bằng bao nhiêu?
2. Bơm xe đạp nén nhanh (gần như không kịp thoát nhiệt, $Q \approx 0$), bạn làm công 50 J vào khí. Nội năng và nhiệt độ khí thay đổi thế nào?

<details><summary>Đáp án</summary>

1. $\Delta U = Q + W = 800 + 300 = $ **1100 J** (cả hai đều nạp năng lượng vào hệ).
2. $Q \approx 0$, $W = +50 \text{ J} \to \Delta U = +50 \text{ J} \to$ nội năng tăng $\to T$ tăng (ống bơm nóng lên). Đây là nén đoạn nhiệt.

</details>

### 📝 Tóm tắt mục 3

- $\Delta U = Q + W$.
- 2 cách tăng nội năng: bơm nhiệt vào hoặc làm công vào.

---

## 4. $Q = m \cdot c \cdot \Delta T$ (Nhiệt dung riêng)

### 4.1. Định nghĩa

Để làm nóng 1 vật từ $T_1$ đến $T_2$, cần nhiệt lượng:

$$Q = m \cdot c \cdot \Delta T$$

trong đó:
- $m$ = khối lượng (kg).
- $c$ = **nhiệt dung riêng** ($\text{J/(kg·K)}$) — phụ thuộc chất.
- $\Delta T$ = biến thiên nhiệt độ (K hoặc °C, cùng giá trị).

💡 **Ý nghĩa của c**: nhiệt dung riêng đo "vật khó nóng lên thế nào". c lớn → cần nhiều Q để tăng 1 K → vật "lưu giữ nhiệt" tốt.

**Vì sao quan trọng?** Vì c **khác nhau giữa các chất** — đó là chìa khóa giải thích nhiều hiện tượng.

### 4.2. Bảng nhiệt dung riêng

| Chất | c (J/(kg·K)) |
|------|----------------|
| **Nước (lỏng)** | **4186** |
| Nước đá | 2090 |
| Hơi nước | 2080 |
| Ethanol | 2440 |
| Dầu ăn | ~ 1670 |
| Không khí | ~ 1005 |
| Sắt | 449 |
| Đồng | 385 |
| Nhôm | 897 |
| Vàng | 129 |
| Cát | ~ 830 |

→ **Nước có c CỰC CAO** (gấp 5-10 lần kim loại). Đó là tại sao:
- Nước "chậm nóng" và "chậm nguội" hơn cát/kim loại.
- Biển/đại dương điều hòa khí hậu (giữ nhiệt rất tốt — mùa hè ấm, mùa đông không quá lạnh).
- Cơ thể con người (70% nước) ổn định T tốt.

### 4.3. Ba ví dụ số

**Ví dụ 1 — Đun 1 L nước**: 1 kg nước, từ 25°C lên 100°C. $\Delta T = 75 \text{ K}$.
- $Q = 1 \times 4186 \times 75 = $ **313 950 J ≈ 314 kJ**.

**Ví dụ 2 — So sánh nóng nước vs sắt**: 1 kg, $\Delta T = 10 \text{ K}$.
- $Q_{\text{nước}} = 1 \cdot 4186 \cdot 10 = 41\,860 \text{ J}$.
- $Q_{\text{sắt}} = 1 \cdot 449 \cdot 10 = 4490 \text{ J}$.
- → Nóng 1 kg nước cần năng lượng gấp $\approx 9{,}3$ lần 1 kg sắt cho cùng $\Delta T$.

**Ví dụ 3 — Cân bằng nhiệt**: Bỏ 0.1 kg sắt nóng 200°C vào 0.5 kg nước 20°C. Tính $T$ cân bằng.
- Cân bằng nhiệt: $Q_{\text{sắt mất}} = Q_{\text{nước nhận}}$.
- $0{,}1 \cdot 449 \cdot (200 - T) = 0{,}5 \cdot 4186 \cdot (T - 20)$.
- $8980 - 44{,}9 \cdot T = 2093 \cdot T - 41860$.
- $50840 = 2137{,}9 \cdot T \to T = $ **23,78°C**.
- → Nhiệt độ chỉ tăng từ 20°C lên 23.78°C — nước hấp thụ rất tốt mà không nóng lên nhiều (vì $c$ cao + $m$ gấp 5).

### ❓ Câu hỏi tự nhiên của người đọc

- *"Dùng $\Delta T$ bằng °C hay K trong $Q = mc\Delta T$?"* Cả hai cho cùng kết quả vì $\Delta T$ là **chênh lệch** (1°C = 1 K về độ chia). $c$ có đơn vị $\text{J/(kg·K)}$ nhưng $\Delta T = 10°\text{C} = 10 \text{ K}$ nên $Q$ giống nhau.
- *"Vì sao nước có c cao bất thường?"* Vì liên kết hydro giữa các phân tử H₂O hấp thụ nhiều năng lượng. Nạp nhiệt vào nước phần lớn đi "phá/kéo căng" liên kết hydro chứ không chỉ tăng tốc phân tử → cần nhiều Q cho mỗi 1 K.
- *"Khi cân bằng nhiệt, năng lượng có mất đi không?"* Không (hệ cô lập). Q vật nóng mất = Q vật lạnh nhận. Đó là phương trình cân bằng.

⚠ **Lỗi thường gặp**

- **Quên đổi đơn vị khối lượng**: $c$ của nước là 4186 J/**kg**·K. Nếu $m$ cho bằng gam phải đổi sang kg. Phản ví dụ: đun 500 g nước lên 10 K $\to Q = 0{,}5 \cdot 4186 \cdot 10 = $ **20930 J**, KHÔNG phải $500 \cdot 4186 \cdot 10 = 20\,930\,000 \text{ J}$.
- **Dùng sai dấu $\Delta T$ trong cân bằng nhiệt**: vật nóng thì $(T_{\text{đầu}} - T_{\text{cân bằng}}) > 0$ (mất nhiệt), vật lạnh thì $(T_{\text{cân bằng}} - T_{\text{đầu}}) > 0$ (nhận nhiệt). Đặt sai dấu → vô nghiệm.

🔁 **Dừng lại tự kiểm tra**

1. Cần bao nhiêu $Q$ để đun 0.5 kg nước ($c = 4186$) từ 20°C lên 100°C?
2. Cùng $Q$, đun 1 kg sắt ($c = 449$) và 1 kg nước, cái nào nóng lên nhiều hơn?

<details><summary>Đáp án</summary>

1. $Q = m \cdot c \cdot \Delta T = 0{,}5 \cdot 4186 \cdot (100 - 20) = 0{,}5 \cdot 4186 \cdot 80 = $ **167 440 J ≈ 167 kJ**.
2. Sắt nóng nhanh hơn $\approx 9{,}3$ lần ($c$ sắt nhỏ hơn $\approx 9{,}3$ lần) → cùng $Q$, sắt có $\Delta T$ lớn hơn. Vd $Q = 4490 \text{ J}$: sắt tăng 10 K, nước chỉ tăng $\approx 1{,}07 \text{ K}$.

</details>

### 📝 Tóm tắt mục 4

- $Q = m \cdot c \cdot \Delta T$.
- $c$ đo "khó-dễ làm nóng vật".
- Nước có $c$ cao (4186) → khả năng "lưu nhiệt" tốt.

---

## 5. Chuyển pha — Nhiệt nóng chảy & hóa hơi

### 5.1. Định nghĩa

Khi vật **chuyển pha** (rắn → lỏng, lỏng → khí), **nhiệt độ KHÔNG đổi** dù đang nhận nhiệt liên tục. Tất cả Q dùng để phá liên kết phân tử (biến cấu trúc), không tăng T.

$$Q = m \cdot L$$

trong đó $L$ = **nhiệt ẩn (latent heat)**:
- $L_f$ = nhiệt nóng chảy (rắn ↔ lỏng), với nước = **334 000 J/kg**.
- $L_v$ = nhiệt hóa hơi (lỏng ↔ khí), với nước = **2 260 000 J/kg**.

💡 **Quan sát quan trọng**: $L_v$ (nước) $\gg L_f$ (nước). Đó là tại sao bỏng nước sôi nguy hiểm hơn bỏng nước đá tan — hơi nước truyền vô số năng lượng khi ngưng tụ về lại lỏng.

### 5.2. Ví dụ — Làm tan 1 kg nước đá ở 0°C thành nước 100°C

| Giai đoạn | ΔT | Q |
|-----------|-----|----|
| Đá → nước (chuyển pha, 0°C → 0°C) | 0 | $m \cdot L_f = 334\,000 \text{ J}$ |
| Nước 0°C → 100°C | 100 | $m \cdot c \cdot \Delta T = 418\,600 \text{ J}$ |
| Nước → hơi (chuyển pha, 100°C → 100°C) | 0 | $m \cdot L_v = 2\,260\,000 \text{ J}$ |
| **Tổng** | | **3 012 600 J ≈ 3 MJ** |

→ Phần lớn năng lượng (75%) dành cho **bốc hơi**, không phải làm nóng. Đó là tại sao sôi nước chậm hơn nhiều người tưởng.

### ❓ Câu hỏi tự nhiên của người đọc

- *"Vì sao nhiệt độ không tăng dù vẫn cấp nhiệt liên tục khi đang sôi?"* Vì toàn bộ Q dùng để **phá liên kết** giữa các phân tử (lỏng → khí), không tăng năng lượng động (tức không tăng T). Khi đã chuyển pha xong, T mới lại tăng.
- *"Vì sao mồ hôi làm mát cơ thể?"* Khi mồ hôi bốc hơi, nó hấp thụ $L_v$ từ da (mỗi kg $\approx 2{,}26 \text{ MJ}$) → da mất nhiệt → mát. Đây là làm mát bằng bay hơi.
- *"Vì sao hơi nước 100°C bỏng nặng hơn nước 100°C?"* Khi hơi ngưng tụ trên da, nó nhả thêm $L_v = 2{,}26 \text{ MJ/kg}$ (ngoài nhiệt lượng do hạ $T$). Nước cùng $T$ chỉ truyền phần $m \cdot c \cdot \Delta T$.

⚠ **Lỗi thường gặp**

- **Dùng $Q = m \cdot c \cdot \Delta T$ cho giai đoạn chuyển pha**. Sai — trong chuyển pha $\Delta T = 0$ nên công thức đó cho $Q = 0$, vô lý. Phải dùng $Q = m \cdot L$. Phản ví dụ: làm tan 1 kg đá 0°C thành nước 0°C cần $Q = m \cdot L_f = 334\,000 \text{ J}$, không phải 0.
- **Quên đơn vị $L$ là J/kg** (không phải J/(kg·K)) — $L$ không nhân với $\Delta T$.

🔁 **Dừng lại tự kiểm tra**

1. Cần bao nhiêu $Q$ để làm tan 2 kg nước đá ở 0°C thành nước 0°C? ($L_f = 334\,000 \text{ J/kg}$)
2. Đun nước đang ở 100°C, cấp thêm nhiệt — nhiệt độ có vượt 100°C không (ở 1 atm)?

<details><summary>Đáp án</summary>

1. $Q = m \cdot L_f = 2 \cdot 334\,000 = $ **668 000 J = 668 kJ** ($T$ không đổi, vẫn 0°C).
2. Không, chừng nào còn nước lỏng. Nhiệt cấp thêm dùng để hóa hơi ($m \cdot L_v$), $T$ giữ 100°C cho đến khi hết nước.

</details>

### 📝 Tóm tắt mục 5

- $Q = m \cdot L$ cho chuyển pha. $T$ không đổi.
- $L_v$ (hơi nước) $\gg L_f$ (nước đá) → hơi nước rất nguy hiểm khi ngưng.

---

## 6. Ba cách truyền nhiệt

### 6.1. Dẫn nhiệt (Conduction)

Năng lượng truyền qua **vật rắn** bằng **va chạm phân tử**. Phân tử nóng (dao động mạnh) đẩy phân tử kế bên → truyền dần. Không có vật chất di chuyển.

Ví dụ: tay cầm thanh sắt đặt 1 đầu vào lửa → đầu kia nóng dần.

### 6.2. Đối lưu (Convection)

Năng lượng truyền nhờ **chất lỏng/khí di chuyển**. Chất nóng giảm mật độ → nổi lên; chất lạnh hạ xuống. Tạo dòng tuần hoàn.

Ví dụ: đun nước trong nồi — nước đáy nóng nổi lên, nước trên lạnh chìm xuống → tạo dòng đối lưu → nước sôi đều.

### 6.3. Bức xạ (Radiation)

Năng lượng truyền bằng **sóng điện từ** (chủ yếu hồng ngoại). Không cần môi trường — truyền được trong chân không.

Ví dụ: Mặt Trời sưởi ấm Trái Đất qua 150 triệu km chân không bằng bức xạ.

💡 **Trực giác phân biệt 3 cách**: dẫn nhiệt = chuyền tay theo hàng (vật không di chuyển, chỉ năng lượng truyền qua va chạm); đối lưu = băng chuyền (chính chất nóng di chuyển mang nhiệt đi); bức xạ = ném bóng qua khoảng trống (sóng EM bay qua, không cần "tay" trung gian).

### ❓ Câu hỏi tự nhiên của người đọc

- *"Vì sao bình giữ nhiệt (phích) giữ nóng lâu?"* Vì nó chặn cả 3 cách: lớp chân không giữa 2 thành chặn dẫn nhiệt và đối lưu (không có vật chất); lớp tráng bạc phản xạ bức xạ hồng ngoại trở lại. Cả 3 đường truyền bị bịt → nhiệt thoát rất chậm.
- *"Tại sao kim loại sờ vào lạnh hơn gỗ dù cùng nhiệt độ phòng?"* Vì kim loại **dẫn nhiệt nhanh**, hút nhiệt từ tay rất nhanh → tay cảm thấy "lạnh". Gỗ dẫn chậm → tay không mất nhiệt nhiều → thấy "ấm" hơn. Cả hai thực ra cùng T.
- *"Bức xạ có cần nhiệt độ cao không?"* Không. Mọi vật trên 0 K đều phát bức xạ nhiệt (hồng ngoại); vật càng nóng phát càng mạnh và bước sóng càng ngắn.

⚠ **Lỗi thường gặp**

- **Tưởng chỉ vật nóng mới bức xạ**. Sai — cả vật lạnh cũng bức xạ (yếu hơn). Cơ thể người 37°C liên tục phát hồng ngoại (camera nhiệt nhìn thấy được).
- **Nhầm đối lưu xảy ra trong vật rắn**. Đối lưu cần chất chảy được (lỏng/khí) để mang nhiệt đi; vật rắn chỉ dẫn nhiệt.

🔁 **Dừng lại tự kiểm tra**

1. Khói bốc lên từ lửa trại — đó là cơ chế truyền nhiệt nào?
2. Ngồi gần đống lửa thấy ấm mặt dù không khí giữa lửa và mặt vẫn mát — cơ chế nào?

<details><summary>Đáp án</summary>

1. Đối lưu — khí nóng nhẹ hơn nên bay lên, mang theo nhiệt và khói.
2. Bức xạ — hồng ngoại từ lửa truyền thẳng tới mặt qua không khí mà không làm nóng nhiều không khí trung gian.

</details>

### 📝 Tóm tắt mục 6

| Cách | Môi trường | Cơ chế |
|------|------------|--------|
| Dẫn nhiệt | Vật rắn | Va chạm phân tử |
| Đối lưu | Lỏng / khí | Dòng chất di chuyển |
| Bức xạ | Bất kỳ (cả chân không) | Sóng EM |

---

## 7. Bài tập + Lời giải chi tiết

### Bài tập

**Bài 1**: Chuyển đổi 50°C sang K và °F.

**Bài 2**: Tính Q cần để đun 2 L nước từ 20°C lên 100°C.

**Bài 3**: Pha 0.3 kg nước 80°C với 0.7 kg nước 20°C. Tính T cân bằng.

**Bài 4**: Cần Q để hóa hơi 0.5 kg nước ở 100°C thành hơi 100°C?

**Bài 5**: Vì sao đại dương điều hòa khí hậu cho các vùng ven biển?

**Bài 6**: Bình nước nóng 1500 W dùng dây mayso đun nước. Mất bao lâu để đun 5 L nước từ 20°C lên 80°C? (Bỏ qua mất nhiệt.)

### Lời giải

**Bài 1**: $K = 50 + 273{,}15 = $ **323,15 K**. $°\text{F} = \tfrac{9}{5} \cdot 50 + 32 = $ **122°F**.

**Bài 2**: $m = 2 \text{ kg}$. $Q = 2 \cdot 4186 \cdot 80 = $ **669 760 J ≈ 670 kJ**.

**Bài 3**: $m_1 \cdot c \cdot (80 - T) = m_2 \cdot c \cdot (T - 20) \to 0{,}3 \cdot (80 - T) = 0{,}7 \cdot (T - 20) \to 24 - 0{,}3T = 0{,}7T - 14 \to 38 = T \to$ **T = 38°C**.

**Bài 4**: $Q = m \cdot L_v = 0{,}5 \cdot 2\,260\,000 = $ **1 130 000 J = 1,13 MJ**. (Năng lượng khổng lồ — hơn cả đun nóng cùng lượng nước từ 0 đến 100°C 2.7 lần.)

**Bài 5**: Nước có c cực cao (4186, gấp 5 lần đất/cát). Đại dương lưu trữ năng lượng khổng lồ. Mùa hè: hấp thụ nhiệt từ Mặt Trời → không nóng nhanh. Mùa đông: nhả nhiệt từ từ → không lạnh nhanh. Vùng đất ven biển hưởng "buffer" của biển → khí hậu ôn hòa hơn nội địa. Vùng đất xa biển có biên độ nhiệt độ ngày-đêm và mùa lớn hơn.

**Bài 6**: 
- $Q = 5 \cdot 4186 \cdot 60 = 1\,255\,800 \text{ J}$.
- $t = Q/P = 1\,255\,800/1500 \approx$ **838 s ≈ 14 phút**.

---

## 8. Liên kết và bài tiếp theo

- **Bài tiếp theo**: [Lesson 02 — Khí lý tưởng](../lesson-02-ideal-gas/) — $PV = nRT$.

---

## 📝 Tổng kết Lesson 01 (T2)

1. **T** (nhiệt độ): mức nóng, $\propto$ KE phân tử trung bình. **Q** (nhiệt lượng): năng lượng truyền.
2. **Kelvin**: $K = °\text{C} + 273{,}15$. Dùng trong tính toán.
3. **Định luật I**: $\Delta U = Q + W$.
4. $Q = m \cdot c \cdot \Delta T$. Nước $c = 4186$ (cao bất thường, lý do điều hòa khí hậu).
5. **Chuyển pha**: $Q = m \cdot L$. $T$ không đổi. $L_v$ (nước) $\gg L_f$.
6. **3 cách truyền**: dẫn (rắn), đối lưu (lỏng/khí), bức xạ (cả chân không).

**Tiếp theo**: [Lesson 02 — Khí lý tưởng $PV = nRT$](../lesson-02-ideal-gas/)
