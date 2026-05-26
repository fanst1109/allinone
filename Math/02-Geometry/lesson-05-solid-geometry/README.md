# Lesson 05 — Hình học không gian

## Mục tiêu

- Hiểu các **khối đa diện** cơ bản: lập phương, hình hộp chữ nhật, lăng trụ, chóp.
- Hiểu các **khối tròn xoay**: hình trụ, hình nón, hình cầu.
- Tính **thể tích** và **diện tích bề mặt** các khối này.
- Hiểu công thức Euler cho đa diện: V − E + F = 2.

## Kiến thức tiền đề

- [Lesson 04 — Đa giác & Diện tích](../lesson-04-polygons-area/).

---

## 1. Khối đa diện

**Đa diện** = khối 3D giới hạn bởi các mặt đa giác phẳng.

- **V (Vertex)** = số đỉnh.
- **E (Edge)** = số cạnh.
- **F (Face)** = số mặt.

### 1.1. Công thức Euler

Với mọi đa diện lồi:
```
V − E + F = 2
```

**Ví dụ — Lập phương**: V=8, E=12, F=6. Kiểm: 8 − 12 + 6 = **2** ✓.

> 📐 **Định nghĩa đầy đủ — Công thức Euler đa diện**
>
> **(a) Là gì**: 1 hằng đẳng thức **kỳ lạ**: với MỌI đa diện lồi (dù phức tạp đến đâu), số đỉnh trừ số cạnh cộng số mặt luôn = 2. Không phụ thuộc kích thước, hình dạng cụ thể.
>
> **(b) Vì sao cần**: Đây là 1 trong những định lý đầu tiên về **topology** (hình học không quan tâm độ dài/góc, chỉ quan tâm cấu trúc kết nối). Cho biết "cấu trúc" đa diện bị ràng buộc — không thể tạo ra 1 đa diện với V, E, F tùy ý. Hệ quả: chứng minh chỉ tồn tại 5 khối Platonic (định lý Plato). Ứng dụng hiện đại: mạng lưới đồ hoạ máy tính, phân tích hình học rời rạc, hoá học phân tử (fullerene C60).
>
> **(c) Ví dụ số**: Tứ diện đều (4 mặt tam giác): V=4, E=6, F=4 → 4−6+4 = **2** ✓. Lập phương: 8−12+6 = **2** ✓. Bát diện đều: 6−12+8 = **2** ✓. Hình lăng trụ tam giác (3 mặt bên + 2 đáy): V=6, E=9, F=5 → 6−9+5 = **2** ✓. Quả bóng đá (32 mặt = 12 ngũ giác + 20 lục giác): V=60, E=90, F=32 → 60−90+32 = **2** ✓.

### 1.2. 5 khối Platonic (đa diện đều)

Chỉ có **5 khối đa diện đều** trong không gian 3D:

| Tên | V | E | F | Mặt là |
|-----|---|---|---|--------|
| Tứ diện đều | 4 | 6 | 4 | Tam giác đều |
| Lập phương | 8 | 12 | 6 | Hình vuông |
| Bát diện đều | 6 | 12 | 8 | Tam giác đều |
| Thập nhị diện đều | 20 | 30 | 12 | Ngũ giác đều |
| Nhị thập diện đều | 12 | 30 | 20 | Tam giác đều |

💡 **Vì sao chỉ có 5?** Plato (~400 TCN) chứng minh. Lý do: ở mỗi đỉnh phải có ≥ 3 mặt + tổng các góc đó < 360° → giới hạn số khả năng.

---

## 2. Thể tích các khối phổ biến

```
Lập phương cạnh a:    V = a³
Hộp chữ nhật a × b × c:  V = abc
Lăng trụ đáy S, cao h:  V = S · h
Chóp đáy S, cao h:    V = (1/3) · S · h
Hình trụ R, h:       V = π·R² · h
Hình nón R, h:      V = (1/3) · π·R² · h
Hình cầu R:         V = (4/3) · π · R³
```

💡 **Nhớ**: chóp = (1/3) lăng trụ cùng đáy + cao. Nón = (1/3) trụ. Cầu R có V = (4/3)πR³.

---

## 3. Diện tích bề mặt

```
Lập phương cạnh a:    S = 6a²
Hộp chữ nhật:        S = 2(ab + bc + ca)
Hình trụ R, h:       S = 2πR² + 2πRh
Hình nón R, l (đường sinh): S = πR² + πRl
Hình cầu R:         S = 4πR²
```

**Walk-through — Diện tích cầu**:
- Archimedes (~ 250 TCN) chứng minh: S_cầu = 4πR² **chính bằng diện tích xung quanh hình trụ** có cùng R và h = 2R.
- Đây là một trong những kết quả ông tự hào nhất, khắc trên bia mộ.

---

## 4. Bài tập

### Bài tập

**Bài 1**: Lập phương cạnh 5 cm. Tính V, S_bề mặt.

**Bài 2**: Hình trụ R = 3, h = 10. Tính V và S.

**Bài 3**: Hình cầu R = 6 cm. Tính V và S.

**Bài 4**: Chóp đáy vuông cạnh 4, cao 6. Tính V.

**Bài 5**: Kiểm tra công thức Euler cho tứ diện đều.

**Bài 6**: Cho hình nón R = 5, h = 12. Tính đường sinh l, sau đó tính S.

### Lời giải

**Bài 1**: V = 125 cm³. S = 6·25 = **150 cm²**.

**Bài 2**: V = π·9·10 = **90π ≈ 282.7**. S = 2π·9 + 2π·3·10 = **78π ≈ 245**.

**Bài 3**: V = (4/3)π·216 = **288π ≈ 904.78 cm³**. S = 4π·36 = **144π ≈ 452.4 cm²**.

**Bài 4**: V = (1/3)·16·6 = **32**.

**Bài 5**: V=4, E=6, F=4. V − E + F = 4 − 6 + 4 = **2** ✓.

**Bài 6**: l = √(R²+h²) = √(25+144) = **13**. S = π·25 + π·5·13 = **90π ≈ 283**.

---

## 5. Bài tiếp theo

[Lesson 06 — Tọa độ Oxy & Conic](../lesson-06-coordinate-plane-conics/).

## 📝 Tổng kết

1. **Euler**: V − E + F = 2 cho mọi đa diện lồi.
2. **5 khối Platonic** đều (Plato chứng minh chỉ có 5).
3. **Thể tích**: nhớ chóp = (1/3) trụ cùng đáy. Cầu = (4/3)πR³.
4. **S_cầu = 4πR² = diện tích xung quanh trụ R, h = 2R** (Archimedes).
