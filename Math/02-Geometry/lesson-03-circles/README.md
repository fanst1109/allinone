# Lesson 03 — Đường tròn

## Mục tiêu

- Hiểu các thuật ngữ: **tâm, bán kính, dây cung, đường kính, cung, tiếp tuyến, cát tuyến**.
- Biết các **công thức chu vi, diện tích**.
- Hiểu các định lý quan trọng: **góc nội tiếp**, **góc ở tâm**, **tứ giác nội tiếp**.
- Liên hệ đường tròn ngoại tiếp / nội tiếp tam giác.

## Kiến thức tiền đề

- [Lesson 02 — Tam giác](../lesson-02-triangles/).

---

## 1. Đường tròn — Khái niệm

**Đường tròn (O, R)** = tập hợp các điểm cách điểm O cho trước **một khoảng không đổi R**.

- **Tâm**: O.
- **Bán kính**: R = khoảng cách từ tâm đến điểm trên đường tròn.
- **Đường kính** D = 2R = dây dài nhất, đi qua tâm.
- **Dây cung**: đoạn nối 2 điểm trên đường tròn.
- **Cung**: phần đường tròn giữa 2 điểm.

**Hình tròn**: vùng bên trong đường tròn (kèm cả đường tròn).

---

## 2. Chu vi và diện tích

```
C = 2πR = πD
S = πR²
```

trong đó **π ≈ 3.14159**.

💡 **Vì sao π?** π là tỉ số chu vi / đường kính của MỌI đường tròn — không phụ thuộc kích thước. Đây là một trong những hằng số nổi tiếng nhất Toán.

---

## 3. Các loại đường — Tiếp tuyến, Cát tuyến

- **Tiếp tuyến**: đường thẳng chỉ chạm đường tròn tại **1 điểm** duy nhất. Tại điểm chạm, tiếp tuyến **vuông góc với bán kính**.
- **Cát tuyến**: đường thẳng cắt đường tròn tại **2 điểm**.
- **Đường không cắt**: đường thẳng cách tâm khoảng > R.

---

## 4. Góc trong đường tròn

### 4.1. Góc ở tâm (Central angle)

Góc có đỉnh ở **tâm O**, 2 cạnh là 2 bán kính.

Góc ở tâm = **số đo cung** mà nó chắn.

### 4.2. Góc nội tiếp (Inscribed angle)

Góc có đỉnh **trên đường tròn**, 2 cạnh là 2 dây.

💡 **Định lý nội tiếp**: góc nội tiếp = **½ góc ở tâm** cùng chắn cung đó.

**Hệ quả quan trọng**:
- Mọi góc nội tiếp chắn cung **nửa đường tròn** (đường kính) đều bằng **90°**.
- Mọi góc nội tiếp cùng chắn 1 cung đều bằng nhau.

### 4.3. Walk-through chứng minh nhanh

Cho góc nội tiếp ABC chắn cung AC. Vẽ đường kính BD qua tâm O.
- Tam giác OAB cân (OA = OB = R) → góc OAB = góc OBA.
- Tam giác OCB cân → góc OCB = góc OBC.
- Góc ABC = OBA + OBC.
- Góc ở tâm = AOC = AOD + DOC = 2·OBA + 2·OBC (góc ngoài tam giác cân) = 2·ABC ✓.

---

## 5. Tứ giác nội tiếp

**Tứ giác nội tiếp** = tứ giác có **4 đỉnh nằm trên 1 đường tròn**.

**Định lý**: tứ giác nội tiếp có **tổng 2 góc đối nhau = 180°**.

Ứng dụng: chứng minh nhiều bài hình bằng cách chỉ ra tứ giác nội tiếp.

---

## 6. Đường tròn nội/ngoại tiếp tam giác

### Đường tròn ngoại tiếp

- Đường tròn đi qua **3 đỉnh** tam giác.
- Tâm = giao điểm **3 đường trung trực** của 3 cạnh.

### Đường tròn nội tiếp

- Đường tròn tiếp xúc với **3 cạnh** tam giác (bên trong).
- Tâm = giao điểm **3 đường phân giác** trong.

---

## 7. Bài tập

### Bài tập

**Bài 1**: Đường tròn R = 5 cm. Tính chu vi và diện tích.

**Bài 2**: Cung AB dài 4π trên đường tròn R = 6. Tính góc ở tâm (radian và độ).

**Bài 3**: Cho tam giác ABC với BC là đường kính đường tròn ngoại tiếp. Chứng minh góc A = 90°.

**Bài 4**: Tứ giác ABCD nội tiếp đường tròn. A = 70°, C = ?

**Bài 5**: Tam giác đều cạnh 6. Tính bán kính đường tròn ngoại tiếp và nội tiếp.

### Lời giải

**Bài 1**: C = 2π·5 = **10π ≈ 31.42 cm**. S = π·25 = **25π ≈ 78.54 cm²**.

**Bài 2**: Độ dài cung = R·θ (rad) → θ = 4π/6 = **2π/3 rad** = 120°.

**Bài 3**: BC là đường kính → góc nội tiếp BAC chắn nửa đường tròn → BAC = 90° (theo định lý nội tiếp + cung nửa = 180°). Đây là **định lý Thales đảo**.

**Bài 4**: Tứ giác nội tiếp: A + C = 180° → C = **110°**.

**Bài 5**: Tam giác đều cạnh a. 
- R_ngoại tiếp = a/√3 = 6/√3 = 2√3 ≈ **3.46**.
- r_nội tiếp = a/(2√3) = 6/(2√3) = √3 ≈ **1.73** (R = 2r cho tam giác đều).

---

## 8. Bài tiếp theo

[Lesson 04 — Đa giác & Diện tích](../lesson-04-polygons-area/).

## 📝 Tổng kết

1. **Đường tròn**: tập điểm cách tâm 1 khoảng R.
2. **C = 2πR, S = πR²**.
3. **Tiếp tuyến** ⊥ bán kính tại điểm tiếp xúc.
4. **Góc nội tiếp = ½ góc ở tâm** cùng chắn cung. Chắn đường kính → 90°.
5. **Tứ giác nội tiếp**: 2 góc đối bù nhau.
6. **Ngoại tiếp** = đi qua 3 đỉnh (giao 3 trung trực); **nội tiếp** = tiếp 3 cạnh (giao 3 phân giác).
