# Lesson 05 (T2) — Điện trường & Điện thế

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Hiểu **điện trường E** là gì — và tại sao nó là cách mô tả "thuận tiện" cho lực điện.
- Phân biệt **điện thế V** (điện thế tại 1 điểm) và **hiệu điện thế U** (chênh lệch giữa 2 điểm).
- Biết liên hệ giữa F, E, V, U.
- Hiểu **tụ điện** — dùng để lưu trữ năng lượng điện trường.

## Kiến thức tiền đề

- [Lesson 04 — Coulomb](../lesson-04-coulomb-charge/).

---

## 1. Điện trường E

### 1.1. Định nghĩa

**Điện trường E tại 1 điểm** = lực tác dụng lên **1 điện tích thử dương đơn vị (+1 C)** đặt tại điểm đó:

$$E = \frac{F}{q} \quad (\text{V/m hoặc N/C})$$

💡 **Ý nghĩa**: thay vì nói "có điện tích $Q$ ở chỗ kia, hút/đẩy điện tích $q$ ở chỗ này", ta nói "$Q$ tạo ra điện trường $E$ khắp không gian — $q$ đặt vào sẽ bị $E$ tác dụng lực $F = q \cdot E$". Tách thành **2 bước** giúp tính toán hệ nhiều điện tích dễ hơn nhiều.

**Vì sao cần khái niệm này (khi đã có lực Coulomb)?** Vì khi có **nhiều điện tích**, ta thường muốn biết "tại điểm X có lực thế nào với điện tích thử bất kỳ". Trường E là "bản đồ lực" — tính một lần, dùng cho mọi q.

Hơn nữa, E là **đại lượng riêng của không gian**, độc lập với điện tích thử → khái niệm nền cho lý thuyết Maxwell (Lesson 08).

### 1.2. Điện trường từ điện tích điểm

$$E = \frac{k \cdot |Q|}{r^2}$$

Hướng: rời khỏi $Q$ nếu $Q > 0$, vào $Q$ nếu $Q < 0$.

### 1.3. Ví dụ số

**Ví dụ**: Điện trường ở 10 cm từ điện tích $+5 \text{ μC}$:
- $E = 9 \times 10^9 \times 5 \times 10^{-6} / 0{,}01 =$ **$4{,}5 \times 10^6 \text{ V/m}$** $= 4{,}5 \text{ MV/m}$.

Đặt 1 điện tích thử $+1 \text{ μC}$ ở đó → lực $F = q \cdot E = 10^{-6} \times 4{,}5 \times 10^6 =$ **$4{,}5 \text{ N}$**.

### ❓ Câu hỏi tự nhiên của người đọc

- *"Điện trường E khác lực F thế nào?"* $E$ là "lực **trên mỗi đơn vị điện tích**" (N/C), tồn tại trong không gian dù chưa có điện tích thử nào. $F = q \cdot E$ là lực thực tế khi đặt điện tích $q$ vào. $E$ là "tiềm năng gây lực", $F$ là "lực thật".
- *"Điện trường có thật không hay chỉ là công cụ tính?"* Có thật — nó mang năng lượng và động lượng (xem sóng EM, Lesson 08). Không chỉ là mẹo toán.
- *"E giảm theo 1/r² hay 1/r?"* $E$ từ điện tích điểm giảm theo **$1/r^2$** (giống lực Coulomb). Điện thế $V$ giảm theo $1/r$ — đừng nhầm hai cái.

⚠ **Lỗi thường gặp**

- **Nhầm điện trường E (V/m) với điện thế V (Volt)**. $E$ là vector "lực/điện tích", $V$ là vô hướng "thế năng/điện tích". Quan hệ: $E = -\frac{dV}{dr}$. Phản ví dụ: tại tâm giữa 2 điện tích trái dấu, $V$ có thể $= 0$ nhưng $E \neq 0$ (lực vẫn tồn tại).
- **Quên E là vector có hướng**: $\vec{E}$ hướng ra xa điện tích dương, hướng vào điện tích âm.

🔁 **Dừng lại tự kiểm tra**

1. Tính $E$ ở 20 cm từ điện tích $+1 \text{ μC}$.
2. Điện tích $-2 \text{ μC}$ đặt trong điện trường $E = 500 \text{ V/m}$ hướng phải. Lực hướng nào, độ lớn bao nhiêu?

<details><summary>Đáp án</summary>

1. $E = \frac{kQ}{r^2} = 9 \times 10^9 \cdot 10^{-6} / (0{,}2)^2 = 9 \times 10^3 / 0{,}04 =$ **$2{,}25 \times 10^5 \text{ V/m}$**.
2. $F = |q| \cdot E = 2 \times 10^{-6} \cdot 500 =$ **$10^{-3} \text{ N}$**, hướng **trái** (ngược $E$ vì $q$ âm).

</details>

### 📝 Tóm tắt mục 1

- $E = F/q$, đơn vị V/m. Điện trường từ $Q$ điểm: $E = \frac{kQ}{r^2}$.
- $E$ là "bản đồ lực" — tính một lần dùng cho mọi điện tích thử.

---

## 2. Điện thế V và hiệu điện thế U

### 2.1. Điện thế V

**Điện thế V tại 1 điểm** = **năng lượng tiềm năng (thế năng) của 1 điện tích +1 C** đặt tại điểm đó, so với điểm "vô cùng" (V = 0):

$$V = \frac{U_q}{q} \quad (\text{đơn vị: Volt} = \text{V} = \text{J/C})$$

💡 **Ý nghĩa**: $V$ đo "vị trí" của 1 điểm trong điện trường, tương tự độ cao trong trường hấp dẫn. Điện tích "ưa" đi từ $V$ cao xuống $V$ thấp (như nước chảy từ cao xuống thấp).

**Vì sao có khái niệm này (khi đã có E)?** Vì:
- $V$ là **số vô hướng** (scalar), dễ tính hơn $E$ (vector).
- $E$ và $V$ liên hệ qua: **$E = -\frac{dV}{dr}$** (gradient của $V$).
- Trong mạch điện, ta thường nói "hiệu điện thế giữa 2 cực" — đó là khái niệm $V$.

### 2.2. Hiệu điện thế $U = \Delta V$

$$U = V_A - V_B$$

**Công lực điện** để chuyển điện tích $q$ từ A đến B:
$$W = q \cdot U_{AB} = q \cdot (V_A - V_B)$$

### 2.3. Ví dụ trực giác

**Ví dụ — Pin AA**: Hiệu điện thế giữa 2 cực $= 1{,}5 \text{ V}$. Có nghĩa: lực điện làm **công $1{,}5 \text{ J}$** khi chuyển **$1 \text{ C}$ điện tích** từ cực dương sang cực âm bên ngoài (qua mạch ngoài).

**Ví dụ — Ổ điện gia đình**: $220 \text{ V}$. Chuyển $1 \text{ C}$ qua thiết bị → $220 \text{ J}$ năng lượng được tiêu thụ.

### 2.4. Điện thế từ điện tích điểm

$$V = \frac{k \cdot Q}{r}$$

(Lưu ý: $V \propto 1/r$, không phải $1/r^2$ như $E$.)

### ❓ Câu hỏi tự nhiên của người đọc

- *"Điện thế V và hiệu điện thế U khác nhau ra sao?"* $V$ là thế năng/điện tích tại **một điểm** (so với vô cùng). $U = V_A - V_B$ là **chênh lệch** giữa 2 điểm. Trong mạch điện, cái ta đo (vd "pin $1{,}5 \text{ V}$") thường là $U$ — hiệu điện thế giữa 2 cực.
- *"Vì sao V là vô hướng còn E là vector?"* Vì $V$ là năng lượng (vô hướng), $E$ là lực/điện tích (vector). Cộng $V$ nhiều điện tích chỉ cần cộng số; cộng $E$ phải cộng vector — $V$ dễ tính hơn nhiều.
- *"Điện tích đi theo hướng nào trong điện trường?"* Điện tích **dương** trôi từ $V$ cao xuống $V$ thấp (như nước chảy xuống dốc); điện tích **âm** đi ngược lại (lên $V$ cao).

⚠ **Lỗi thường gặp**

- **Lẫn V (điểm) với U (chênh lệch)**. "Điện thế giữa 2 điểm" thực ra là hiệu điện thế $U$. Phản ví dụ: nói "điểm này có hiệu điện thế $5 \text{ V}$" sai — điểm có điện thế $V$; hiệu điện thế cần 2 điểm.
- **Dùng sai công thức 1/r vs 1/r²**: $V = \frac{kQ}{r}$ (mũ 1), $E = \frac{kQ}{r^2}$ (mũ 2).

🔁 **Dừng lại tự kiểm tra**

1. Pin $9 \text{ V}$ chuyển $2 \text{ C}$ điện tích qua mạch. Công lực điện bằng bao nhiêu?
2. Điện thế ở 30 cm từ $+3 \text{ μC}$ bằng bao nhiêu?

<details><summary>Đáp án</summary>

1. $W = q \cdot U = 2 \cdot 9 =$ **$18 \text{ J}$**.
2. $V = \frac{kQ}{r} = 9 \times 10^9 \cdot 3 \times 10^{-6} / 0{,}3 = 27 \times 10^3 / 0{,}3 =$ **$9 \times 10^4 \text{ V} = 90 \text{ kV}$**.

</details>

### 📝 Tóm tắt mục 2

- $V = \text{J/C} = \text{Volt}$. Đo "vị trí" trong trường điện.
- $U = V_A - V_B$. $W = q \cdot U$.
- Điện thế điểm: $V = kQ/r$.

---

## 3. Tụ điện (Capacitor)

### 3.1. Định nghĩa

**Tụ điện** = thiết bị lưu trữ **năng lượng dưới dạng điện trường** giữa 2 bản kim loại cách nhau bởi điện môi.

$$C = \frac{Q}{U} \quad (\text{đơn vị: Farad} = \text{F} = \text{C/V})$$

trong đó:
- **C** = điện dung (Farad).
- **Q** = điện tích trên 1 bản.
- **U** = hiệu điện thế giữa 2 bản.

💡 **Ý nghĩa**: $C$ đo "khả năng tích điện" — $C$ lớn nghĩa là với cùng $U$, tụ chứa nhiều $Q$ hơn. Tụ "đầy" khi điện trường giữa các bản đẩy điện tích không vào thêm được.

### 3.2. Năng lượng tích trong tụ

$$W = \frac{1}{2} \cdot C \cdot U^2 = \frac{1}{2} \cdot \frac{Q^2}{C}$$

### 3.3. Ví dụ con số

| Loại tụ | C |
|---------|---|
| Tụ trong điện thoại | $1\text{-}100 \text{ μF}$ |
| Tụ dùng trong máy ảnh flash | $100\text{-}1000 \text{ μF}$ |
| Siêu tụ (supercapacitor) | $1\text{-}100 \text{ F}$ |

**Ví dụ**: Tụ $100 \text{ μF}$ nạp đến $10 \text{ V}$. 
- $Q = C \cdot U = 10^{-4} \times 10 = 10^{-3} \text{ C} = 1 \text{ mC}$.
- $W = \frac{1}{2} \cdot 10^{-4} \cdot 100 =$ **$5 \times 10^{-3} \text{ J} = 5 \text{ mJ}$**.

(So sánh: pin AA $1{,}5 \text{ V}$ chứa $\sim 10\,000 \text{ J}$ — gấp 2 triệu lần tụ này. Tụ dùng để xả nhanh, không lưu trữ lâu dài.)

### ❓ Câu hỏi tự nhiên của người đọc

- *"Điện dung C nghĩa là gì cụ thể?"* $C = Q/U$ đo "với mỗi Volt áp vào, tụ tích được bao nhiêu Coulomb". $C$ lớn → cùng $U$ chứa nhiều điện tích hơn. Đơn vị Farad (F) rất lớn — thực tế thường dùng $\text{μF}$ ($10^{-6} \text{ F}$).
- *"Tụ và pin khác nhau ra sao?"* Pin lưu năng lượng **hóa học** (ổn định lâu, xả chậm). Tụ lưu năng lượng **điện trường** (nạp/xả cực nhanh nhưng ít năng lượng, tự xả dần). Tụ dùng cho flash, lọc nhiễu; pin dùng cấp điện lâu dài.
- *"Vì sao năng lượng tụ là $\frac{1}{2}CU^2$ chứ không phải $CU^2$?"* Vì khi nạp, $U$ tăng dần từ 0 tới $U$ cuối; năng lượng trung bình tương ứng hệ số $\frac{1}{2}$ (tích phân). Giống thế năng lò xo $\frac{1}{2}kx^2$.

⚠ **Lỗi thường gặp**

- **Quên hệ số $\frac{1}{2}$ trong $W = \frac{1}{2}CU^2$**. Phản ví dụ: tụ $100 \text{ μF}$ ở $10 \text{ V}$ → $W = 0{,}5 \cdot 10^{-4} \cdot 100 =$ **$5 \times 10^{-3} \text{ J} = 5 \text{ mJ}$**, không phải $10 \text{ mJ}$.
- **Quên đổi $\text{μF}$ sang $\text{F}$**: $100 \text{ μF} = 100 \times 10^{-6} \text{ F} = 10^{-4} \text{ F}$.

🔁 **Dừng lại tự kiểm tra**

1. Tụ $200 \text{ μF}$ nạp đến $5 \text{ V}$. Tính điện tích $Q$ lưu trữ.
2. Cùng tụ đó, tính năng lượng tích trữ.

<details><summary>Đáp án</summary>

1. $Q = C \cdot U = 200 \times 10^{-6} \cdot 5 =$ **$10^{-3} \text{ C} = 1 \text{ mC}$**.
2. $W = \frac{1}{2}CU^2 = 0{,}5 \cdot 200 \times 10^{-6} \cdot 25 =$ **$2{,}5 \times 10^{-3} \text{ J} = 2{,}5 \text{ mJ}$**.

</details>

### 📝 Tóm tắt mục 3

- Tụ $C = Q/U$. Đơn vị Farad. $W = \frac{1}{2}CU^2$.
- Xả nhanh (mili-giây) → ứng dụng flash máy ảnh, mạch lọc.

---

## 4. Bài tập + Lời giải

### Bài tập

**Bài 1**: Tính $E$ ở 5 cm từ điện tích $+2 \text{ μC}$.

**Bài 2**: 1 điện tích $-1 \text{ μC}$ trong điện trường $E = 1000 \text{ V/m}$ hướng phải. Tính lực.

**Bài 3**: Hai điểm chênh điện thế $100 \text{ V}$. Tính công làm với $1 \text{ mC}$ chuyển từ A sang B.

**Bài 4**: Tụ $50 \text{ μF}$ nạp đến $20 \text{ V}$. Tính $Q$ và năng lượng.

**Bài 5**: Vì sao tụ điện được nạp nhanh nhưng giữ điện thế chỉ trong thời gian ngắn?

### Lời giải

**Bài 1**: $E = 9 \times 10^9 \times 2 \times 10^{-6} / 0{,}0025 =$ **$7{,}2 \times 10^6 \text{ V/m}$**.

**Bài 2**: $F = q \cdot E = -10^{-6} \times 1000 = -10^{-3} \text{ N}$. Lực $= 10^{-3} \text{ N}$ hướng **trái** (ngược chiều $E$ vì $q$ âm).

**Bài 3**: $W = qU = 10^{-3} \times 100 =$ **$0{,}1 \text{ J}$**.

**Bài 4**: $Q = C \cdot U = 50 \times 10^{-6} \cdot 20 =$ **$10^{-3} \text{ C} = 1 \text{ mC}$**. $W = 0{,}5 \cdot C \cdot U^2 = 0{,}5 \cdot 50 \times 10^{-6} \cdot 400 =$ **$0{,}01 \text{ J} = 10 \text{ mJ}$**.

**Bài 5**: Tụ là 2 bản kim loại + điện môi (cách điện). Khi nối với pin, electron lập tức chuyển → tích điện rất nhanh (< 1 giây). Khi ngắt pin, tụ giữ điện trường nhưng dần dần **tự xả** qua không khí (không hoàn toàn cách điện) → mất điện trong vài giây đến phút. Khác pin: pin lưu năng lượng dạng hóa học, ổn định lâu dài.

---

## 5. Bài tiếp theo

[Lesson 06 — Dòng điện & Mạch](../lesson-06-current-circuits/).

## 📝 Tổng kết

1. **$E = F/q$** — điện trường, V/m.
2. **$V = U_q/q$** — điện thế, Volt = J/C. Pin AA $= 1{,}5 \text{ V}$, ổ điện $= 220 \text{ V}$.
3. **$U = V_A - V_B$** — hiệu điện thế. $W = q \cdot U$.
4. **Tụ $C = Q/U$** — Farad. $W = \frac{1}{2}CU^2$.
