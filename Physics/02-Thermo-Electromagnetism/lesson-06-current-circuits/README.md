# Lesson 06 (T2) — Dòng điện & Mạch

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Hiểu **dòng điện I** = tốc độ chuyển động của điện tích.
- Áp dụng **định luật Ohm** V = I·R.
- Tính trở mạch nối tiếp và song song.
- Áp dụng **định luật Kirchhoff** cho mạch phức tạp.
- Tính **công suất điện** P = U·I.

## Kiến thức tiền đề

- [Lesson 05 — Điện trường & điện thế](../lesson-05-electric-field-potential/).

---

## 1. Dòng điện I

### 1.1. Định nghĩa

**Dòng điện I** = lượng điện tích đi qua tiết diện trên đơn vị thời gian:

```
I = ΔQ / Δt   (đơn vị: Ampere = A = C/s)
```

💡 **Ý nghĩa**: I đo "lưu lượng điện tích". Tương tự lưu lượng nước qua ống (lít/giây) — I là điện tích/giây.

**Vì sao cần?** Vì trong mạch điện thực tế, ta thường quan tâm "có bao nhiêu điện tích chảy qua" hơn là "tổng có bao nhiêu".

**Quy ước chiều dòng điện**: theo **chiều di chuyển của điện tích dương** (ngược chiều di chuyển electron trong dây kim loại). Quy ước lịch sử từ trước khi biết electron.

### 1.2. Ví dụ con số

| Tình huống | I |
|------------|---|
| Bóng đèn LED 1 W ở 5V | ~ 0.2 A |
| Bóng đèn sợi đốt 60 W ở 220 V | ~ 0.27 A |
| Cầu chì gia đình | 15-30 A |
| Sét tia | 30,000 A (rất ngắn) |
| Khởi động ô tô | 100-200 A |

### ❓ Câu hỏi tự nhiên của người đọc

- *"Dòng điện I và điện tích Q khác nhau ra sao?"* Q (Coulomb) là "tổng điện tích"; I (Ampere = C/s) là "điện tích chảy qua mỗi giây". Giống "tổng lít nước" vs "lít/giây". Phản ví dụ: 2 A nghĩa là 2 C đi qua mỗi giây, không phải tổng 2 C.
- *"Vì sao chiều dòng điện ngược chiều electron?"* Vì quy ước chiều dòng điện (chiều điện tích dương) được đặt ra **trước khi** phát hiện electron mang điện âm. Giữ quy ước để khỏi viết lại toàn bộ vật lý.
- *"Electron chạy nhanh không?"* Tốc độ trôi rất chậm (~mm/s), nhưng "tín hiệu" và năng lượng truyền gần tốc độ ánh sáng dọc dây.

⚠ **Lỗi thường gặp**

- **Nhầm điện tích Q với dòng điện I**. "Bóng đèn dùng 0.5 A" là dòng, không phải điện tích. Tổng điện tích = I·t.
- **Lẫn chiều dòng điện và chiều electron**: dòng điện quy ước theo điện tích **dương**, ngược với chiều electron thực di chuyển trong dây kim loại.

🔁 **Dừng lại tự kiểm tra**

1. 6 C điện tích đi qua một tiết diện trong 3 giây. Dòng điện bằng bao nhiêu?
2. Dòng 2 A chạy trong 10 giây — tổng điện tích đã đi qua?

<details><summary>Đáp án</summary>

1. I = ΔQ/Δt = 6/3 = **2 A**.
2. ΔQ = I·t = 2·10 = **20 C**.

</details>

### 📝 Tóm tắt mục 1

- I = ΔQ/Δt, đơn vị Ampere (A).
- Chiều dòng điện = chiều di chuyển của điện tích dương.

---

## 2. Định luật Ohm

### 2.1. Phát biểu

Trong nhiều vật liệu (đặc biệt kim loại ở nhiệt độ thường):

```
V = I · R
```

trong đó **R** = **điện trở** (Ohm, Ω = V/A).

💡 **Ý nghĩa**: R đo "khó-dễ cho dòng điện đi qua". R lớn → cần hiệu điện thế V lớn để có cùng I.

**Vì sao có R?** Vì electron va chạm với các nguyên tử trong vật liệu khi đi qua → mất năng lượng (thành nhiệt). Vật liệu dẫn tốt (Cu, Ag) → R nhỏ. Cách điện (nhựa) → R cực lớn.

### 2.2. Công suất điện

```
P = U · I = I² · R = U² / R   (đơn vị: Watt)
```

💡 Vì sao 3 biểu thức? Vì kết hợp với V = IR, ta thay vào để dùng tùy thông tin có.

### 2.3. Ví dụ

**Ví dụ — Bóng đèn 100 W ở 220 V**:
- I = P/U = 100/220 ≈ **0.45 A**.
- R = U/I = 220/0.45 ≈ **484 Ω**.

### 2.4. Điện trở R — định nghĩa đủ 3 phần

**(a) Là gì**: **Điện trở R** = đại lượng đo "mức cản trở dòng điện" của một vật. Đơn vị **Ohm (Ω) = V/A**. Định nghĩa qua tỉ số R = U/I: cần bao nhiêu Volt để đẩy được 1 Ampere qua vật.

**(b) Vì sao cần**: Khi electron chạy qua vật liệu, chúng va chạm với mạng nguyên tử → mất năng lượng (biến thành nhiệt). R lượng hóa mức "khó đi" đó. Không có R thì không giải thích được vì sao cùng một điện áp, dây đồng cho dòng lớn còn nichrome (dây mayso) cho dòng nhỏ và nóng đỏ.

**(c) Ví dụ số kèm đơn vị**: dây mayso chịu U = 10 V cho dòng I = 2 A → R = U/I = 10/2 = **5 Ω**. Verify ngược (định luật Ohm U = I·R): U = 2·5 = **10 V** ✓. Đổi điện áp lên 20 V cùng R → I = U/R = 20/5 = **4 A** (dòng tăng gấp đôi).

### ❓ Câu hỏi tự nhiên của người đọc

- *"Vì sao có 3 công thức công suất (UI, I²R, U²/R)?"* Cùng một đại lượng, viết 3 cách bằng cách thế V = IR vào P = UI. Dùng cái nào tùy dữ kiện có sẵn (biết I và R → dùng I²R; biết U và R → dùng U²/R).
- *"Điện trở biến năng lượng thành gì?"* Thành **nhiệt** (định luật Joule, Q = I²R·t). Đó là nguyên lý bếp điện, bàn là, đèn sợi đốt.
- *"Mọi vật đều tuân định luật Ohm?"* Không — chỉ vật "ohmic" (kim loại ở T thường). Diode, bóng đèn nóng, chất bán dẫn có R thay đổi theo điều kiện, không tuyến tính.

⚠ **Lỗi thường gặp**

- **Quên bình phương trong P = I²R hoặc P = U²/R**. Phản ví dụ: I = 2 A, R = 5 Ω → P = I²R = 4·5 = **20 W**, không phải 2·5 = 10 W.
- **Lẫn V = IR với V = I/R**: điện trở càng lớn cần điện áp càng lớn cho cùng dòng → nhân, không chia.

🔁 **Dừng lại tự kiểm tra**

1. Một điện trở 10 Ω có dòng 3 A đi qua. Hiệu điện thế hai đầu và công suất tỏa nhiệt?
2. Thiết bị 220 V có điện trở 110 Ω. Tính dòng điện và công suất.

<details><summary>Đáp án</summary>

1. U = I·R = 3·10 = **30 V**. P = I²R = 9·10 = **90 W** (hoặc P = UI = 30·3 = 90 W ✓).
2. I = U/R = 220/110 = **2 A**. P = U²/R = 220²/110 = 48400/110 = **440 W**.

</details>

### 📝 Tóm tắt mục 2

- V = IR. R Ohm = V/A.
- P = UI. P trong điện trở → biến thành nhiệt (định luật Joule).

---

## 3. Mạch nối tiếp và song song

### 3.1. Nối tiếp

Dòng điện qua tất cả linh kiện **bằng nhau**:
```
R_tổng = R₁ + R₂ + R₃ + ...
```

💡 Hình dung: ống nước dài hơn → khó cho nước chảy hơn → tổng R lớn.

### 3.2. Song song

Hiệu điện thế qua mỗi nhánh **bằng nhau**:
```
1/R_tổng = 1/R₁ + 1/R₂ + 1/R₃ + ...
```

(Cho 2 R: R_tổng = R₁·R₂ / (R₁ + R₂).)

💡 Hình dung: thêm nhiều ống song song → dễ chảy hơn → R tổng giảm.

### 3.3. Ví dụ

**Ví dụ**: 2 điện trở R = 100 Ω.
- Nối tiếp: R_tổng = **200 Ω**.
- Song song: R_tổng = 100·100/(100+100) = **50 Ω**.

### ❓ Câu hỏi tự nhiên của người đọc

- *"Vì sao song song lại GIẢM điện trở tổng?"* Vì thêm nhánh = thêm "đường" cho dòng đi → dòng tổng dễ chảy hơn → R tổng nhỏ hơn cả R nhỏ nhất. Giống mở thêm cửa thoát hiểm → người ra nhanh hơn.
- *"Nối tiếp thì cái gì giống nhau, song song thì cái gì giống nhau?"* Nối tiếp: **dòng I** qua mọi linh kiện bằng nhau (1 đường duy nhất). Song song: **hiệu điện thế U** qua mỗi nhánh bằng nhau (cùng nối 2 điểm).
- *"Đèn trong nhà mắc nối tiếp hay song song?"* Song song — để mỗi đèn nhận đủ 220 V và tắt 1 đèn không ảnh hưởng đèn khác. Nối tiếp thì 1 đèn cháy là cả dãy tắt (như đèn nháy cây thông cũ).

⚠ **Lỗi thường gặp**

- **Lẫn công thức nối tiếp và song song**. Nối tiếp **cộng R** (R tăng); song song **cộng 1/R** (R giảm). Phản ví dụ: 2 điện trở 100 Ω song song → R = 50 Ω (giảm), KHÔNG phải 200 Ω.
- **Quên nghịch đảo lần cuối ở song song**: tính 1/R_tổng = 1/100 + 1/100 = 2/100 → phải lấy nghịch đảo: R_tổng = 100/2 = **50 Ω**, không dừng ở 2/100.

🔁 **Dừng lại tự kiểm tra**

1. 2 điện trở 6 Ω và 3 Ω mắc nối tiếp. R tổng?
2. Cùng 2 điện trở đó mắc song song. R tổng?

<details><summary>Đáp án</summary>

1. Nối tiếp: R = 6 + 3 = **9 Ω**.
2. Song song: R = (6·3)/(6+3) = 18/9 = **2 Ω** (nhỏ hơn cả 3 Ω).

</details>

### 📝 Tóm tắt mục 3

- Nối tiếp: R cộng. Cùng I.
- Song song: 1/R cộng. Cùng U.

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

Pin 12 V, R₁ = 4 Ω, R₂ = 6 Ω nối song song. Tính I tổng.
- R_tổng = 4·6/10 = 2.4 Ω.
- I_tổng = 12/2.4 = **5 A**.
- I_R1 = 12/4 = 3 A. I_R2 = 12/6 = 2 A. Tổng = 5 A ✓ (Kirchhoff I).

### ❓ Câu hỏi tự nhiên của người đọc

- *"Khi nào cần Kirchhoff thay vì chỉ dùng nối tiếp/song song?"* Khi mạch có nhiều nguồn hoặc cấu trúc phức tạp không rút gọn được thành nối tiếp/song song đơn giản. Kirchhoff cho hệ phương trình giải mọi mạch.
- *"Quy ước dấu trong KVL thế nào?"* Đi vòng theo một chiều: qua nguồn từ − sang + thì +ε; qua điện trở cùng chiều dòng thì −IR. Tổng = 0. Quan trọng là **nhất quán** một chiều quy ước.
- *"KCL liên quan định luật nào đã học?"* Bảo toàn điện tích (Lesson 04). Điện tích không tích tụ tại nút → vào = ra.

⚠ **Lỗi thường gặp**

- **Quên dấu khi áp KVL**: đi qua nguồn ngược chiều (+ sang −) là −ε, qua điện trở ngược chiều dòng là +IR. Sai dấu → kết quả sai.
- **Đếm thiếu/thừa dòng tại nút**: phải tính TẤT cả dòng vào và ra. Phản ví dụ: nút có I₁ = 3 A vào, I₂ = 2 A ra → dòng nhánh thứ 3 = 3 − 2 = 1 A ra (không bỏ sót).

🔁 **Dừng lại tự kiểm tra**

1. Tại một nút, có 4 A và 3 A đi vào, 5 A đi ra theo một nhánh. Nhánh còn lại có dòng bao nhiêu, vào hay ra?
2. Pin 12 V nối R₁ = 2 Ω và R₂ = 4 Ω song song. Tính I tổng từ pin.

<details><summary>Đáp án</summary>

1. Tổng vào = 4 + 3 = 7 A. Đã ra 5 A → nhánh còn lại ra 7 − 5 = **2 A (đi ra)** (KCL: vào = ra).
2. R_tổng = (2·4)/(2+4) = 8/6 = 1.33 Ω. I = 12/1.33 = **9 A** (kiểm: I_R1 = 6 A, I_R2 = 3 A, tổng 9 A ✓).

</details>

### 📝 Tóm tắt mục 4

- **KCL (nút)**: tổng dòng vào = tổng dòng ra (bảo toàn điện tích).
- **KVL (vòng)**: tổng hiệu điện thế quanh mạch kín = 0 (bảo toàn năng lượng).
- Dùng để giải mạch phức tạp không rút gọn được bằng nối tiếp/song song.

---

## 5. Bài tập

### Bài tập

**Bài 1**: Bóng đèn 60 W chạy ở 220 V. Tính I và R.

**Bài 2**: 3 điện trở 10, 20, 30 Ω nối tiếp với pin 12 V. Tính I.

**Bài 3**: 3 điện trở 10, 20, 30 Ω nối song song với pin 12 V. Tính I tổng.

**Bài 4**: 1 thiết bị 1000 W chạy 1 giờ. Tiêu thụ bao nhiêu kWh? Tiền điện ở giá 3000 đồng/kWh?

**Bài 5**: Vì sao đèn LED tiết kiệm hơn đèn sợi đốt?

### Lời giải

**Bài 1**: I = 60/220 = **0.273 A**. R = 220/0.273 = **806 Ω**.

**Bài 2**: R_tổng = 60 Ω. I = 12/60 = **0.2 A**.

**Bài 3**: 1/R = 1/10 + 1/20 + 1/30 = 6/60 + 3/60 + 2/60 = 11/60. R = 60/11 = **5.45 Ω**. I = 12/5.45 = **2.2 A**.

**Bài 4**: Năng lượng = 1 kW × 1 h = **1 kWh**. Tiền = **3000 đồng**.

**Bài 5**: Đèn sợi đốt biến > 95% năng lượng thành **nhiệt** (sợi tóc 2000-3000°C), chỉ < 5% thành ánh sáng. Đèn LED: bán dẫn phát ánh sáng trực tiếp, hiệu suất ~ 30-40%. Cùng "lượng ánh sáng", LED tiêu thụ năng lượng ít hơn ~ 5-10 lần. Lý do giúp tiết kiệm điện toàn cầu.

---

## 6. Bài tiếp theo

[Lesson 07 — Từ trường & Cảm ứng](../lesson-07-magnetism-induction/).

## 📝 Tổng kết

1. **I = ΔQ/Δt**, Ampere.
2. **V = IR** (Ohm's Law). P = UI = I²R = U²/R.
3. **Nối tiếp**: R cộng. **Song song**: 1/R cộng.
4. **Kirchhoff**: I — nút (bảo toàn điện tích), II — vòng (bảo toàn năng lượng).
