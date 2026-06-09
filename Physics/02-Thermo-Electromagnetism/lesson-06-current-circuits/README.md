# Lesson 06 (T2) — Dòng điện & Mạch

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Hiểu **dòng điện I** = tốc độ chuyển động của điện tích.
- Áp dụng **định luật Ohm** $V = I \cdot R$.
- Tính trở mạch nối tiếp và song song.
- Áp dụng **định luật Kirchhoff** cho mạch phức tạp.
- Tính **công suất điện** $P = U \cdot I$.

## Kiến thức tiền đề

- [Lesson 05 — Điện trường & điện thế](../lesson-05-electric-field-potential/).

---

## 1. Dòng điện I

### 1.1. Định nghĩa

**Dòng điện I** = lượng điện tích đi qua tiết diện trên đơn vị thời gian:

$$I = \frac{\Delta Q}{\Delta t} \quad (\text{đơn vị: Ampere} = \text{A} = \text{C/s})$$

💡 **Ý nghĩa**: $I$ đo "lưu lượng điện tích". Tương tự lưu lượng nước qua ống (lít/giây) — $I$ là điện tích/giây.

**Vì sao cần?** Vì trong mạch điện thực tế, ta thường quan tâm "có bao nhiêu điện tích chảy qua" hơn là "tổng có bao nhiêu".

**Quy ước chiều dòng điện**: theo **chiều di chuyển của điện tích dương** (ngược chiều di chuyển electron trong dây kim loại). Quy ước lịch sử từ trước khi biết electron.

### 1.2. Ví dụ con số

| Tình huống | I |
|------------|---|
| Bóng đèn LED 1 W ở 5V | $\sim 0{,}2 \text{ A}$ |
| Bóng đèn sợi đốt 60 W ở 220 V | $\sim 0{,}27 \text{ A}$ |
| Cầu chì gia đình | $15\text{-}30 \text{ A}$ |
| Sét tia | $30\,000 \text{ A}$ (rất ngắn) |
| Khởi động ô tô | $100\text{-}200 \text{ A}$ |

### ❓ Câu hỏi tự nhiên của người đọc

- *"Dòng điện I và điện tích Q khác nhau ra sao?"* $Q$ (Coulomb) là "tổng điện tích"; $I$ (Ampere = C/s) là "điện tích chảy qua mỗi giây". Giống "tổng lít nước" vs "lít/giây". Phản ví dụ: $2 \text{ A}$ nghĩa là $2 \text{ C}$ đi qua mỗi giây, không phải tổng $2 \text{ C}$.
- *"Vì sao chiều dòng điện ngược chiều electron?"* Vì quy ước chiều dòng điện (chiều điện tích dương) được đặt ra **trước khi** phát hiện electron mang điện âm. Giữ quy ước để khỏi viết lại toàn bộ vật lý.
- *"Electron chạy nhanh không?"* Tốc độ trôi rất chậm (~mm/s), nhưng "tín hiệu" và năng lượng truyền gần tốc độ ánh sáng dọc dây.

⚠ **Lỗi thường gặp**

- **Nhầm điện tích Q với dòng điện I**. "Bóng đèn dùng $0{,}5 \text{ A}$" là dòng, không phải điện tích. Tổng điện tích $= I \cdot t$.
- **Lẫn chiều dòng điện và chiều electron**: dòng điện quy ước theo điện tích **dương**, ngược với chiều electron thực di chuyển trong dây kim loại.

🔁 **Dừng lại tự kiểm tra**

1. $6 \text{ C}$ điện tích đi qua một tiết diện trong 3 giây. Dòng điện bằng bao nhiêu?
2. Dòng $2 \text{ A}$ chạy trong 10 giây — tổng điện tích đã đi qua?

<details><summary>Đáp án</summary>

1. $I = \frac{\Delta Q}{\Delta t} = 6/3 =$ **$2 \text{ A}$**.
2. $\Delta Q = I \cdot t = 2 \cdot 10 =$ **$20 \text{ C}$**.

</details>

### 📝 Tóm tắt mục 1

- $I = \frac{\Delta Q}{\Delta t}$, đơn vị Ampere (A).
- Chiều dòng điện = chiều di chuyển của điện tích dương.

---

## 2. Định luật Ohm

### 2.1. Phát biểu

Trong nhiều vật liệu (đặc biệt kim loại ở nhiệt độ thường):

$$V = I \cdot R$$

trong đó **R** = **điện trở** (Ohm, $\Omega = \text{V/A}$).

💡 **Ý nghĩa**: $R$ đo "khó-dễ cho dòng điện đi qua". $R$ lớn → cần hiệu điện thế $V$ lớn để có cùng $I$.

**Vì sao có R?** Vì electron va chạm với các nguyên tử trong vật liệu khi đi qua → mất năng lượng (thành nhiệt). Vật liệu dẫn tốt (Cu, Ag) → $R$ nhỏ. Cách điện (nhựa) → $R$ cực lớn.

### 2.2. Công suất điện

$$P = U \cdot I = I^2 \cdot R = \frac{U^2}{R} \quad (\text{đơn vị: Watt})$$

💡 Vì sao 3 biểu thức? Vì kết hợp với $V = IR$, ta thay vào để dùng tùy thông tin có.

### 2.3. Ví dụ

**Ví dụ — Bóng đèn 100 W ở 220 V**:
- $I = P/U = 100/220 \approx$ **$0{,}45 \text{ A}$**.
- $R = U/I = 220/0{,}45 \approx$ **$484 \text{ } \Omega$**.

### 2.4. Điện trở R — định nghĩa đủ 3 phần

**(a) Là gì**: **Điện trở R** = đại lượng đo "mức cản trở dòng điện" của một vật. Đơn vị **Ohm ($\Omega$) = V/A**. Định nghĩa qua tỉ số $R = U/I$: cần bao nhiêu Volt để đẩy được 1 Ampere qua vật.

**(b) Vì sao cần**: Khi electron chạy qua vật liệu, chúng va chạm với mạng nguyên tử → mất năng lượng (biến thành nhiệt). $R$ lượng hóa mức "khó đi" đó. Không có $R$ thì không giải thích được vì sao cùng một điện áp, dây đồng cho dòng lớn còn nichrome (dây mayso) cho dòng nhỏ và nóng đỏ.

**(c) Ví dụ số kèm đơn vị**: dây mayso chịu $U = 10 \text{ V}$ cho dòng $I = 2 \text{ A}$ → $R = U/I = 10/2 =$ **$5 \text{ } \Omega$**. Verify ngược (định luật Ohm $U = I \cdot R$): $U = 2 \cdot 5 =$ **$10 \text{ V}$** ✓. Đổi điện áp lên $20 \text{ V}$ cùng $R$ → $I = U/R = 20/5 =$ **$4 \text{ A}$** (dòng tăng gấp đôi).

### ❓ Câu hỏi tự nhiên của người đọc

- *"Vì sao có 3 công thức công suất ($UI$, $I^2R$, $U^2/R$)?"* Cùng một đại lượng, viết 3 cách bằng cách thế $V = IR$ vào $P = UI$. Dùng cái nào tùy dữ kiện có sẵn (biết $I$ và $R$ → dùng $I^2R$; biết $U$ và $R$ → dùng $U^2/R$).
- *"Điện trở biến năng lượng thành gì?"* Thành **nhiệt** (định luật Joule, $Q = I^2R \cdot t$). Đó là nguyên lý bếp điện, bàn là, đèn sợi đốt.
- *"Mọi vật đều tuân định luật Ohm?"* Không — chỉ vật "ohmic" (kim loại ở T thường). Diode, bóng đèn nóng, chất bán dẫn có R thay đổi theo điều kiện, không tuyến tính.

⚠ **Lỗi thường gặp**

- **Quên bình phương trong $P = I^2R$ hoặc $P = U^2/R$**. Phản ví dụ: $I = 2 \text{ A}$, $R = 5 \text{ } \Omega$ → $P = I^2R = 4 \cdot 5 =$ **$20 \text{ W}$**, không phải $2 \cdot 5 = 10 \text{ W}$.
- **Lẫn $V = IR$ với $V = I/R$**: điện trở càng lớn cần điện áp càng lớn cho cùng dòng → nhân, không chia.

🔁 **Dừng lại tự kiểm tra**

1. Một điện trở $10 \text{ } \Omega$ có dòng $3 \text{ A}$ đi qua. Hiệu điện thế hai đầu và công suất tỏa nhiệt?
2. Thiết bị $220 \text{ V}$ có điện trở $110 \text{ } \Omega$. Tính dòng điện và công suất.

<details><summary>Đáp án</summary>

1. $U = I \cdot R = 3 \cdot 10 =$ **$30 \text{ V}$**. $P = I^2R = 9 \cdot 10 =$ **$90 \text{ W}$** (hoặc $P = UI = 30 \cdot 3 = 90 \text{ W}$ ✓).
2. $I = U/R = 220/110 =$ **$2 \text{ A}$**. $P = U^2/R = 220^2/110 = 48400/110 =$ **$440 \text{ W}$**.

</details>

### 📝 Tóm tắt mục 2

- $V = IR$. $R$ Ohm = V/A.
- $P = UI$. $P$ trong điện trở → biến thành nhiệt (định luật Joule).

---

## 3. Mạch nối tiếp và song song

### 3.1. Nối tiếp

Dòng điện qua tất cả linh kiện **bằng nhau**:
$$R_{tổng} = R_1 + R_2 + R_3 + \ldots$$

💡 Hình dung: ống nước dài hơn → khó cho nước chảy hơn → tổng $R$ lớn.

### 3.2. Song song

Hiệu điện thế qua mỗi nhánh **bằng nhau**:
$$\frac{1}{R_{tổng}} = \frac{1}{R_1} + \frac{1}{R_2} + \frac{1}{R_3} + \ldots$$

(Cho 2 $R$: $R_{tổng} = \frac{R_1 \cdot R_2}{R_1 + R_2}$.)

💡 Hình dung: thêm nhiều ống song song → dễ chảy hơn → $R$ tổng giảm.

### 3.3. Ví dụ

**Ví dụ**: 2 điện trở $R = 100 \text{ } \Omega$.
- Nối tiếp: $R_{tổng} =$ **$200 \text{ } \Omega$**.
- Song song: $R_{tổng} = 100 \cdot 100/(100+100) =$ **$50 \text{ } \Omega$**.

### ❓ Câu hỏi tự nhiên của người đọc

- *"Vì sao song song lại GIẢM điện trở tổng?"* Vì thêm nhánh = thêm "đường" cho dòng đi → dòng tổng dễ chảy hơn → R tổng nhỏ hơn cả R nhỏ nhất. Giống mở thêm cửa thoát hiểm → người ra nhanh hơn.
- *"Nối tiếp thì cái gì giống nhau, song song thì cái gì giống nhau?"* Nối tiếp: **dòng $I$** qua mọi linh kiện bằng nhau (1 đường duy nhất). Song song: **hiệu điện thế $U$** qua mỗi nhánh bằng nhau (cùng nối 2 điểm).
- *"Đèn trong nhà mắc nối tiếp hay song song?"* Song song — để mỗi đèn nhận đủ 220 V và tắt 1 đèn không ảnh hưởng đèn khác. Nối tiếp thì 1 đèn cháy là cả dãy tắt (như đèn nháy cây thông cũ).

⚠ **Lỗi thường gặp**

- **Lẫn công thức nối tiếp và song song**. Nối tiếp **cộng $R$** ($R$ tăng); song song **cộng $1/R$** ($R$ giảm). Phản ví dụ: 2 điện trở $100 \text{ } \Omega$ song song → $R = 50 \text{ } \Omega$ (giảm), KHÔNG phải $200 \text{ } \Omega$.
- **Quên nghịch đảo lần cuối ở song song**: tính $\frac{1}{R_{tổng}} = \frac{1}{100} + \frac{1}{100} = \frac{2}{100}$ → phải lấy nghịch đảo: $R_{tổng} = 100/2 =$ **$50 \text{ } \Omega$**, không dừng ở $\frac{2}{100}$.

🔁 **Dừng lại tự kiểm tra**

1. 2 điện trở $6 \text{ } \Omega$ và $3 \text{ } \Omega$ mắc nối tiếp. $R$ tổng?
2. Cùng 2 điện trở đó mắc song song. $R$ tổng?

<details><summary>Đáp án</summary>

1. Nối tiếp: $R = 6 + 3 =$ **$9 \text{ } \Omega$**.
2. Song song: $R = \frac{6 \cdot 3}{6+3} = 18/9 =$ **$2 \text{ } \Omega$** (nhỏ hơn cả $3 \text{ } \Omega$).

</details>

### 📝 Tóm tắt mục 3

- Nối tiếp: $R$ cộng. Cùng $I$.
- Song song: $1/R$ cộng. Cùng $U$.

---

## 4. Định luật Kirchhoff

💡 **Trực giác**: hai định luật Kirchhoff chỉ là **bảo toàn** áp cho mạch điện. KCL (nút) = bảo toàn điện tích: điện tích vào một điểm nối phải bằng điện tích ra (như nước vào ngã ba ống = nước ra). KVL (vòng) = bảo toàn năng lượng: đi một vòng kín rồi về chỗ cũ, "độ cao điện thế" tổng thay đổi = 0 (như đi vòng tròn trên núi về đúng điểm xuất phát, tổng độ cao tăng-giảm = 0).

### 4.1. Định luật I — Nút (KCL)

**Tổng các dòng vào 1 nút = tổng các dòng ra**.

(Hệ quả của bảo toàn điện tích.)

### 4.2. Định luật II — Mạch vòng (KVL)

**Tổng các U trong 1 mạch kín = 0**.

(Hệ quả của bảo toàn năng lượng — đi vòng kín, năng lượng không thay đổi.)

### 4.3. Ví dụ — Mạch có pin + 2 R song song

Pin $12 \text{ V}$, $R_1 = 4 \text{ } \Omega$, $R_2 = 6 \text{ } \Omega$ nối song song. Tính $I$ tổng.
- $R_{tổng} = 4 \cdot 6/10 = 2{,}4 \text{ } \Omega$.
- $I_{tổng} = 12/2{,}4 =$ **$5 \text{ A}$**.
- $I_{R1} = 12/4 = 3 \text{ A}$. $I_{R2} = 12/6 = 2 \text{ A}$. Tổng $= 5 \text{ A}$ ✓ (Kirchhoff I).

### ❓ Câu hỏi tự nhiên của người đọc

- *"Khi nào cần Kirchhoff thay vì chỉ dùng nối tiếp/song song?"* Khi mạch có nhiều nguồn hoặc cấu trúc phức tạp không rút gọn được thành nối tiếp/song song đơn giản. Kirchhoff cho hệ phương trình giải mọi mạch.
- *"Quy ước dấu trong KVL thế nào?"* Đi vòng theo một chiều: qua nguồn từ $-$ sang $+$ thì $+\varepsilon$; qua điện trở cùng chiều dòng thì $-IR$. Tổng $= 0$. Quan trọng là **nhất quán** một chiều quy ước.
- *"KCL liên quan định luật nào đã học?"* Bảo toàn điện tích (Lesson 04). Điện tích không tích tụ tại nút → vào = ra.

⚠ **Lỗi thường gặp**

- **Quên dấu khi áp KVL**: đi qua nguồn ngược chiều ($+$ sang $-$) là $-\varepsilon$, qua điện trở ngược chiều dòng là $+IR$. Sai dấu → kết quả sai.
- **Đếm thiếu/thừa dòng tại nút**: phải tính TẤT cả dòng vào và ra. Phản ví dụ: nút có $I_1 = 3 \text{ A}$ vào, $I_2 = 2 \text{ A}$ ra → dòng nhánh thứ 3 $= 3 - 2 = 1 \text{ A}$ ra (không bỏ sót).

🔁 **Dừng lại tự kiểm tra**

1. Tại một nút, có $4 \text{ A}$ và $3 \text{ A}$ đi vào, $5 \text{ A}$ đi ra theo một nhánh. Nhánh còn lại có dòng bao nhiêu, vào hay ra?
2. Pin $12 \text{ V}$ nối $R_1 = 2 \text{ } \Omega$ và $R_2 = 4 \text{ } \Omega$ song song. Tính $I$ tổng từ pin.

<details><summary>Đáp án</summary>

1. Tổng vào $= 4 + 3 = 7 \text{ A}$. Đã ra $5 \text{ A}$ → nhánh còn lại ra $7 - 5 =$ **$2 \text{ A}$ (đi ra)** (KCL: vào = ra).
2. $R_{tổng} = \frac{2 \cdot 4}{2+4} = 8/6 = 1{,}33 \text{ } \Omega$. $I = 12/1{,}33 =$ **$9 \text{ A}$** (kiểm: $I_{R1} = 6 \text{ A}$, $I_{R2} = 3 \text{ A}$, tổng $9 \text{ A}$ ✓).

</details>

### 📝 Tóm tắt mục 4

- **KCL (nút)**: tổng dòng vào = tổng dòng ra (bảo toàn điện tích).
- **KVL (vòng)**: tổng hiệu điện thế quanh mạch kín = 0 (bảo toàn năng lượng).
- Dùng để giải mạch phức tạp không rút gọn được bằng nối tiếp/song song.

---

## 5. Bài tập

### Bài tập

**Bài 1**: Bóng đèn 60 W chạy ở $220 \text{ V}$. Tính $I$ và $R$.

**Bài 2**: 3 điện trở $10, 20, 30 \text{ } \Omega$ nối tiếp với pin $12 \text{ V}$. Tính $I$.

**Bài 3**: 3 điện trở $10, 20, 30 \text{ } \Omega$ nối song song với pin $12 \text{ V}$. Tính $I$ tổng.

**Bài 4**: 1 thiết bị 1000 W chạy 1 giờ. Tiêu thụ bao nhiêu kWh? Tiền điện ở giá 3000 đồng/kWh?

**Bài 5**: Vì sao đèn LED tiết kiệm hơn đèn sợi đốt?

### Lời giải

**Bài 1**: $I = 60/220 =$ **$0{,}273 \text{ A}$**. $R = 220/0{,}273 =$ **$806 \text{ } \Omega$**.

**Bài 2**: $R_{tổng} = 60 \text{ } \Omega$. $I = 12/60 =$ **$0{,}2 \text{ A}$**.

**Bài 3**: $\frac{1}{R} = \frac{1}{10} + \frac{1}{20} + \frac{1}{30} = \frac{6}{60} + \frac{3}{60} + \frac{2}{60} = \frac{11}{60}$. $R = 60/11 =$ **$5{,}45 \text{ } \Omega$**. $I = 12/5{,}45 =$ **$2{,}2 \text{ A}$**.

**Bài 4**: Năng lượng $= 1 \text{ kW} \times 1 \text{ h} =$ **$1 \text{ kWh}$**. Tiền = **3000 đồng**.

**Bài 5**: Đèn sợi đốt biến $> 95\%$ năng lượng thành **nhiệt** (sợi tóc $2000\text{-}3000^\circ\text{C}$), chỉ $< 5\%$ thành ánh sáng. Đèn LED: bán dẫn phát ánh sáng trực tiếp, hiệu suất $\sim 30\text{-}40\%$. Cùng "lượng ánh sáng", LED tiêu thụ năng lượng ít hơn $\sim 5\text{-}10$ lần. Lý do giúp tiết kiệm điện toàn cầu.

---

## 6. Bài tiếp theo

[Lesson 07 — Từ trường & Cảm ứng](../lesson-07-magnetism-induction/).

## 📝 Tổng kết

1. **$I = \frac{\Delta Q}{\Delta t}$**, Ampere.
2. **$V = IR$** (Ohm's Law). $P = UI = I^2R = U^2/R$.
3. **Nối tiếp**: $R$ cộng. **Song song**: $1/R$ cộng.
4. **Kirchhoff**: I — nút (bảo toàn điện tích), II — vòng (bảo toàn năng lượng).
