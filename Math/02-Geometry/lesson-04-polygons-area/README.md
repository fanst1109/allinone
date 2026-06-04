# Lesson 04 — Đa giác & Diện tích

## Mục tiêu

- Hiểu khái niệm **đa giác** (lồi vs lõm, đều vs thường).
- Tính tổng các **góc trong** và **góc ngoài** của đa giác.
- Biết công thức diện tích các hình phẳng phổ biến: tam giác, hình vuông, hình chữ nhật, hình thoi, hình thang, hình bình hành, lục giác đều, đường tròn.

## Kiến thức tiền đề

- [Lesson 02 — Tam giác](../lesson-02-triangles/), [Lesson 03 — Đường tròn](../lesson-03-circles/).

---

## 1. Đa giác

💡 **Trực giác / Hình dung**: đa giác là 1 hàng rào khép kín làm từ các đoạn thẳng — đi dọc hàng rào, mỗi lần tới góc thì rẽ, cuối cùng quay về điểm xuất phát. **Lồi** giống cái đĩa tròn-trịa không lõm vào (mọi góc trong < 180°); **lõm** giống ngôi sao 5 cánh hay chữ L, có chỗ "thụt vào".

**Đa giác** = hình phẳng đóng tạo bởi các đoạn thẳng (gọi là **cạnh**) nối nhau tại các **đỉnh**.

### 1.1. Phân loại

- **Đều (regular)**: mọi cạnh + mọi góc đều bằng nhau. Vd tam giác đều, hình vuông, lục giác đều.
- **Lồi (convex)**: mọi góc trong < 180°. Đường thẳng nối 2 điểm bất kỳ trong đa giác đều nằm bên trong.
- **Lõm (concave)**: có ít nhất 1 góc trong > 180° (có "lỗi vào").

### 1.2. Tổng góc trong

Đa giác **n cạnh** có:
```
Tổng góc trong = (n − 2) · 180°
```

💡 **Vì sao?** Vì n-giác có thể chia thành **(n−2) tam giác** bằng các đường chéo từ 1 đỉnh → tổng góc trong = (n−2)·180°.

> 📐 **Định nghĩa đầy đủ — Tổng góc trong đa giác**
>
> **(a) Là gì**: Quy luật tuyến tính theo số cạnh n. Cộng tất cả n góc trong của 1 đa giác lồi luôn ra đúng (n−2)·180°. Không phụ thuộc hình cụ thể — đều, không đều đều như nhau.
>
> **(b) Vì sao cần**: Vì cho phép tính nhanh góc của đa giác mà không cần đo. Ngược lại, dùng để xác định **đa giác đều** mỗi góc bao nhiêu, suy ra n từ số đo góc. Cũng là nền cho bài toán "lát mặt phẳng" (tessellation) — chỉ tam giác, tứ giác, lục giác đều lát được vì góc của chúng chia đều 360°.
>
> **(c) Ví dụ số**: Tam giác (n=3): (3-2)·180 = **180°** ✓. Tứ giác (n=4): 2·180 = **360°** ✓ (4 góc 90° trong hình chữ nhật). Ngũ giác đều: 3·180 = 540°, mỗi góc = 540/5 = **108°**. Lục giác đều: 4·180 = 720°, mỗi góc = 120°. Bát giác đều (như đường giao thông STOP): 6·180 = 1080°, mỗi góc = 135°.

**Đa giác đều n cạnh**: mỗi góc trong = (n−2)·180°/n.

| n | Tên | Mỗi góc trong (đều) |
|---|-----|---------------------|
| 3 | Tam giác | 60° |
| 4 | Tứ giác | 90° |
| 5 | Ngũ giác | 108° |
| 6 | Lục giác | 120° |
| 8 | Bát giác | 135° |
| 12 | Thập nhị giác | 150° |
| ∞ | (đường tròn) | 180° (giới hạn) |

### 1.3. Tổng góc ngoài

```
Tổng góc ngoài (bất kỳ đa giác lồi) = 360°
```

(Vì đi 1 vòng quanh đa giác = xoay 360°.)

❓ **Câu hỏi tự nhiên của người đọc**

- *"Vì sao chia n-giác được đúng (n−2) tam giác?"* Chọn 1 đỉnh, kẻ đường chéo tới các đỉnh không kề → tách thành các tam giác. Số tam giác luôn = số cạnh trừ 2. Vd ngũ giác (5 cạnh) → 3 tam giác.
- *"Tổng góc ngoài có phụ thuộc số cạnh không?"* Không — luôn 360° bất kể n. Trực giác: đi 1 vòng quanh đa giác, tổng các lần "rẽ" (góc ngoài) đúng bằng 1 vòng = 360°.
- *"Đa giác lõm thì công thức (n−2)·180° còn đúng?"* Tổng góc trong vẫn = (n−2)·180° cho đa giác đơn (không tự cắt), nhưng cách đo góc lõm (> 180°) phải cẩn thận.

⚠ **Lỗi thường gặp**: quên trừ 2, viết "tổng góc trong = n·180°". Phản ví dụ: tứ giác (n=4) nếu lấy 4·180 = 720° là sai; đúng là (4−2)·180 = 360°. Lỗi thứ 2: lấy "mỗi góc đa giác đều = tổng/n" mà quên tính tổng trước — ngũ giác đều mỗi góc = 540/5 = 108°, không phải 180/5.

🔁 **Dừng lại tự kiểm tra**

1. Tổng góc trong của lục giác (6 cạnh) là bao nhiêu? Mỗi góc nếu là lục giác đều?
2. Đa giác đều có mỗi góc trong 150°. Đa giác có mấy cạnh?

<details><summary>Đáp án</summary>

1. (6−2)·180 = **720°**. Mỗi góc đều = 720/6 = **120°**.
2. (n−2)·180/n = 150 → 180n − 360 = 150n → 30n = 360 → n = **12** (thập nhị giác).

</details>

### 📝 Tóm tắt mục 1

- Đa giác: lồi (mọi góc < 180°) / lõm (có góc > 180°); đều (mọi cạnh + góc bằng nhau).
- **Tổng góc trong = (n−2)·180°** (chia thành n−2 tam giác).
- Đa giác đều n cạnh: mỗi góc trong = (n−2)·180°/n.
- **Tổng góc ngoài = 360°** với mọi đa giác lồi (không phụ thuộc n).

---

## 2. Diện tích các hình

💡 **Trực giác / Hình dung**: diện tích = "đếm số ô vuông đơn vị lấp đầy hình". Hình chữ nhật a×b = a hàng, mỗi hàng b ô → a·b ô. Mọi công thức khác đều suy ra bằng cách "cắt-ghép" về hình chữ nhật hay tam giác (vd hình bình hành cắt 1 tam giác ở đầu ghép sang đầu kia → thành chữ nhật đáy·cao).

### 2.1. Bảng công thức

| Hình | Diện tích |
|------|-----------|
| Hình vuông cạnh a | **a²** |
| Hình chữ nhật cạnh a, b | **a · b** |
| Tam giác đáy a, cao h | **(1/2) · a · h** |
| Hình bình hành đáy a, cao h | **a · h** |
| Hình thang đáy a, b, cao h | **(1/2)(a + b)·h** |
| Hình thoi 2 đường chéo d₁, d₂ | **(1/2) · d₁ · d₂** |
| Đường tròn bán kính R | **π · R²** |
| Lục giác đều cạnh a | **(3√3/2) · a²** |

### 2.2. Diện tích tam giác đều cạnh a

S = (a · cao)/2 = (a · (a√3/2))/2 = **(√3/4) · a²**.

### 2.3. Walk-through — Lục giác đều

Lục giác đều cạnh a = **6 tam giác đều** ghép lại (mỗi tam giác cạnh a).
- S_lục_giác = 6 · (√3/4)·a² = **(3√3/2)·a²**.

Cách khác: bán kính đường tròn ngoại tiếp = a (vì 6 tam giác đều có cạnh = bán kính). Hữu ích trong thực tế (mặt cắt tổ ong, bu-lông).

### 2.4. Verify công thức bằng số thật

- **Hình thang** đáy 5 và 11, cao 4: S = ½(5+11)·4 = ½·16·4 = **32**. Kiểm bằng cắt-ghép: 2 hình thang úp ngược ghép thành hình bình hành đáy (5+11)=16, cao 4 → diện tích 64; mỗi hình thang = 64/2 = 32 ✓.
- **Hình thoi** 2 đường chéo 6 và 8: S = ½·6·8 = **24**. (Hình thoi = ½ hình chữ nhật bao quanh nó, cạnh = 2 đường chéo.)
- **Tam giác đều** cạnh 4: S = (√3/4)·4² = (√3/4)·16 = 4√3 ≈ **6.93**.
- **Lục giác đều** cạnh 4: S = (3√3/2)·16 = 24√3 ≈ **41.57** = 6 × 6.93 (6 tam giác đều) ✓.

❓ **Câu hỏi tự nhiên của người đọc**

- *"Hình bình hành cũng đáy·cao như chữ nhật?"* Đúng — vì cắt 1 tam giác bên này ghép sang bên kia thành chữ nhật cùng đáy, cùng cao. "Cao" là khoảng cách vuông góc giữa 2 đáy, không phải cạnh xiên.
- *"Hình thoi vừa có công thức ½d₁d₂ vừa đáy·cao?"* Có — hình thoi là hình bình hành đặc biệt (4 cạnh bằng), nên dùng được cả 2; ½d₁d₂ tiện khi biết 2 đường chéo.
- *"Vì sao tam giác đều có √3?"* Vì chiều cao tam giác đều cạnh a = a√3/2 (từ Pythagoras trên nửa tam giác) → diện tích chứa √3.

⚠ **Lỗi thường gặp**: quên hệ số ½ ở hình thang và hình thoi. Phản ví dụ: hình thoi đường chéo 6, 8 — nếu tính 6·8 = 48 là sai (đó là diện tích chữ nhật bao quanh), đúng là ½·48 = 24. Lỗi thứ 2: dùng cạnh xiên làm chiều cao của hình bình hành.

🔁 **Dừng lại tự kiểm tra**

1. Hình thang 2 đáy 3 và 7, cao 5. Diện tích?
2. Hình thoi có cạnh 5, một đường chéo 6. Diện tích? (gợi ý: 2 đường chéo vuông góc tại trung điểm)

<details><summary>Đáp án</summary>

1. S = ½(3+7)·5 = ½·10·5 = **25**.
2. Nửa đường chéo 1 = 3; nửa đường chéo 2 = √(5²−3²) = 4 → đường chéo 2 = 8. S = ½·6·8 = **24**.

</details>

### 📝 Tóm tắt mục 2

- Diện tích = đếm ô vuông đơn vị; mọi công thức suy từ chữ nhật/tam giác bằng cắt-ghép.
- Nhớ hệ số ½ ở **tam giác, hình thang, hình thoi**.
- Tam giác đều cạnh a: S = (√3/4)a²; lục giác đều = 6 tam giác đều = (3√3/2)a².
- Diện tích luôn có đơn vị **bình phương**; "cao" là khoảng cách vuông góc, không phải cạnh xiên.

---

## 3. Bài tập

### Bài tập

**Bài 1**: Tổng góc trong của bát giác (8 cạnh).

**Bài 2**: Mỗi góc trong của thập giác đều.

**Bài 3**: Hình thang cân, 2 đáy 5 và 11, cao 4. Tính diện tích.

**Bài 4**: Hình thoi 2 đường chéo 6 và 8. Tính diện tích và độ dài cạnh.

**Bài 5**: Sân bóng đá hình chữ nhật 105m × 68m. Diện tích bao nhiêu m²?

**Bài 6**: Lục giác đều cạnh 4 cm. Tính diện tích.

### Lời giải

**Bài 1**: (8−2) · 180 = **1080°**.

**Bài 2**: (10−2)·180/10 = 1440/10 = **144°**.

**Bài 3**: S = (1/2)(5 + 11)·4 = (1/2)·16·4 = **32**.

**Bài 4**: S = (1/2)·6·8 = **24**. Cạnh = √((6/2)² + (8/2)²) = √(9+16) = **5** (vì 2 đường chéo cắt nhau ⊥ tại trung điểm).

**Bài 5**: 105 × 68 = **7,140 m²**.

**Bài 6**: S = (3√3/2)·16 = 24√3 ≈ **41.57 cm²**.

---

## 4. Bài tiếp theo

[Lesson 05 — Hình học không gian](../lesson-05-solid-geometry/).

## 📝 Tổng kết

1. **Đa giác**: lồi/lõm, đều/thường.
2. **Tổng góc trong** = (n−2)·180°. **Tổng góc ngoài** = 360°.
3. **Diện tích**: nhớ công thức 7-8 hình phổ biến.
4. **Lục giác đều** = 6 tam giác đều ghép.
