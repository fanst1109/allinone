# Lesson 01 — Cơ sở Euclid

## Mục tiêu

- Hiểu các **đối tượng cơ bản** của hình học Euclid: điểm, đường, tia, đoạn, góc, mặt phẳng.
- Biết **5 tiên đề Euclid**.
- Phân loại **góc**: nhọn, vuông, tù, bẹt, đầy.
- Hiểu khái niệm **đường thẳng song song**, **đường vuông góc**.

## Kiến thức tiền đề

Không.

---

## 1. Đối tượng cơ bản

Hình học Euclid xây dựng từ **3 khái niệm nguyên thủy** không định nghĩa:
- **Điểm** (point): vị trí trong không gian, không có kích thước. Ký hiệu A, B, ...
- **Đường thẳng** (line): kéo dài vô hạn 2 đầu, không có bề rộng. Đi qua vô số điểm.
- **Mặt phẳng** (plane): 2D, kéo dài vô hạn, không có chiều dày.

💡 **Vì sao "không định nghĩa"?** Vì để định nghĩa cần khái niệm khác — sẽ vô hạn. Euclid chọn các khái niệm nguyên thủy + tiên đề làm cơ sở.

### Đối tượng dẫn xuất

- **Đoạn thẳng AB**: phần đường thẳng giới hạn bởi 2 điểm A, B.
- **Tia OA**: bắt đầu từ O, đi qua A, kéo dài vô hạn 1 phía.
- **Góc**: tạo bởi 2 tia chung gốc.

---

## 2. Năm tiên đề Euclid

Euclid đã viết "Elements" (~300 TCN) — sách giáo khoa quan trọng nhất lịch sử Toán:

1. **Có thể vẽ 1 đường thẳng từ điểm A đến điểm B** (qua 2 điểm có 1 đường thẳng duy nhất).
2. **Có thể kéo dài 1 đoạn thẳng** thành đường thẳng (vô hạn cả 2 phía).
3. **Có thể vẽ 1 đường tròn** với tâm và bán kính tùy ý.
4. **Tất cả các góc vuông bằng nhau**.
5. **Tiên đề song song**: qua 1 điểm ngoài đường thẳng, có **đúng 1** đường thẳng song song với nó.

💡 **Tiên đề thứ 5** (song song) đặc biệt — nhiều người cố chứng minh từ 4 tiên đề khác trong 2000 năm. Cuối cùng vào thế kỷ 19, người ta nhận ra: nếu bỏ tiên đề 5, được **hình học phi Euclid** (như hình học cầu, hyperbolic) — nền tảng của thuyết tương đối tổng quát Einstein.

---

## 3. Góc

### 3.1. Phân loại

| Tên | Số đo |
|------|-------|
| Nhọn | 0° < x < 90° |
| Vuông | x = 90° |
| Tù | 90° < x < 180° |
| Bẹt | x = 180° |
| Phản | 180° < x < 360° |
| Đầy | x = 360° |

### 3.2. Quan hệ góc

- **Hai góc bù nhau**: tổng = 180°.
- **Hai góc phụ nhau**: tổng = 90°.
- **Hai góc đối đỉnh**: bằng nhau.

### 3.3. Khi 2 đường thẳng song song bị cắt bởi 1 đường thẳng

- **Cặp góc đồng vị**: bằng nhau.
- **Cặp góc so le trong**: bằng nhau.
- **Cặp góc trong cùng phía**: bù nhau (tổng 180°).

---

## 4. Đường vuông góc và song song

- **Vuông góc** (⊥): 2 đường tạo với nhau góc 90°.
- **Song song** (//): 2 đường không cắt nhau (kéo dài vô hạn).

**Quy luật quan trọng**:
- Qua 1 điểm có duy nhất 1 đường vuông góc với đường thẳng cho trước.
- 2 đường cùng vuông góc với đường thứ 3 thì song song với nhau.
- 2 đường cùng song song với đường thứ 3 thì song song với nhau (tính bắc cầu).

---

## 5. Bài tập

### Bài tập

**Bài 1**: Tính góc bù với 47°.

**Bài 2**: Hai góc phụ nhau, một góc bằng 30°. Tìm góc kia.

**Bài 3**: 2 đường thẳng cắt nhau tạo 4 góc, một góc bằng 65°. Tính 3 góc còn lại.

**Bài 4**: a // b. Đường c cắt a, b. Một góc tạo bởi c và a = 40°. Tìm góc tương ứng tạo bởi c và b ở vị trí so le trong.

**Bài 5**: Vì sao tiên đề 5 của Euclid lại đặc biệt?

### Lời giải

**Bài 1**: 180 − 47 = **133°**.

**Bài 2**: 90 − 30 = **60°**.

**Bài 3**: Góc đối đỉnh = 65°. 2 góc còn lại (kề bù với 65°) = 180 − 65 = 115°. → **65°, 115°, 65°, 115°**.

**Bài 4**: Góc so le trong = **40°**.

**Bài 5**: Vì tiên đề 5 mạnh hơn 4 tiên đề trước (không thể chứng minh từ chúng). Bỏ tiên đề 5 → hình học phi Euclid (Lobachevsky, Riemann) — tổng 3 góc tam giác không bằng 180° nữa. Einstein dùng hình học Riemann cho thuyết tương đối tổng quát.

---

## 6. Bài tiếp theo

[Lesson 02 — Tam giác](../lesson-02-triangles/).

## 📝 Tổng kết

1. **3 đối tượng nguyên thủy**: điểm, đường, mặt.
2. **5 tiên đề Euclid**. Tiên đề 5 (song song) → hình học phi Euclid khi bỏ.
3. **Góc**: nhọn, vuông, tù, bẹt, phản, đầy.
4. **Bù** (180°), **phụ** (90°), **đối đỉnh** (=).
5. **Đường song song bị cắt**: đồng vị/so le = nhau, trong cùng phía bù nhau.
