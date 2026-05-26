# Lesson 02 — Tam giác

## Mục tiêu

- Phân loại tam giác theo cạnh và góc.
- Hiểu các **trường hợp bằng nhau** (SSS, SAS, ASA) và **đồng dạng** (AAA, SAS, SSS) của tam giác.
- Áp dụng **định lý Pythagoras** cho tam giác vuông.
- Tính diện tích tam giác bằng nhiều công thức.

## Kiến thức tiền đề

- [Lesson 01 — Cơ sở Euclid](../lesson-01-euclidean-basics/).

---

## 1. Tam giác là gì?

**Tam giác** = hình 3 cạnh tạo bởi 3 điểm không thẳng hàng.

💡 **Là gì**: hình đa giác đơn giản nhất, với 3 đỉnh, 3 cạnh, 3 góc trong.

**Quy tắc cơ bản**:
- **Tổng 3 góc trong = 180°** (hệ quả của tiên đề Euclid 5).
- **Bất đẳng thức tam giác**: cạnh bất kỳ < tổng 2 cạnh còn lại. (Nếu vi phạm → không thể vẽ được tam giác.)

---

## 2. Phân loại tam giác

### Theo cạnh

| Loại | Tính chất |
|------|-----------|
| **Đều** | 3 cạnh bằng nhau → 3 góc bằng nhau = 60° |
| **Cân** | 2 cạnh bằng → 2 góc đáy bằng |
| **Thường** | 3 cạnh khác nhau |

### Theo góc

| Loại | Tính chất |
|------|-----------|
| **Nhọn** | 3 góc < 90° |
| **Vuông** | 1 góc = 90° |
| **Tù** | 1 góc > 90° |

---

## 3. Tam giác bằng nhau (Congruence)

Hai tam giác **bằng nhau** = cùng kích thước và hình dạng (đặt chồng lên nhau khít).

### 3 trường hợp chứng minh bằng nhau

1. **SSS (Side-Side-Side)**: 3 cạnh tương ứng bằng nhau.
2. **SAS (Side-Angle-Side)**: 2 cạnh + góc kẹp giữa bằng nhau.
3. **ASA (Angle-Side-Angle)**: 2 góc + cạnh kẹp giữa bằng nhau.

Có thêm: **AAS** (2 góc + 1 cạnh không kẹp giữa — vẫn xác định duy nhất vì biết 2 góc → biết góc thứ 3).

**Lưu ý**: SSA (2 cạnh + 1 góc không kẹp) KHÔNG đảm bảo bằng nhau (vì có thể có 2 tam giác khác nhau thỏa mãn).

---

## 4. Tam giác đồng dạng (Similarity)

Hai tam giác **đồng dạng** = cùng hình dạng nhưng có thể khác kích thước. Mọi cạnh tương ứng có **tỉ lệ bằng nhau**.

### 3 trường hợp đồng dạng

1. **AAA** (3 góc bằng): chỉ cần 2 góc bằng nhau (góc thứ 3 tự suy ra) — gọi là **AA**.
2. **SAS**: tỉ lệ 2 cặp cạnh bằng + góc kẹp giữa bằng.
3. **SSS**: tỉ lệ 3 cặp cạnh bằng.

### Hệ quả quan trọng

Nếu tam giác ABC đồng dạng A'B'C' với tỉ số k, thì:
- Mọi cạnh ABC × k = cạnh tương ứng A'B'C'.
- Diện tích A'B'C' = k² × diện tích ABC.
- Chu vi A'B'C' = k × chu vi ABC.

---

## 5. Định lý Pythagoras

Tam giác **vuông** với 2 cạnh góc vuông a, b và cạnh huyền c:

```
a² + b² = c²
```

💡 **Là gì**: trong tam giác vuông, bình phương cạnh huyền = tổng bình phương 2 cạnh góc vuông.

**Vì sao quan trọng?** Vì:
- Định lý nổi tiếng nhất hình học, biết ~ 4000 năm trước.
- Cơ sở cho **khoảng cách** trong tọa độ: d = √((x₂−x₁)² + (y₂−y₁)²).
- Liên kết hình học và đại số.

### Chứng minh trực giác — Bằng diện tích

Vẽ hình vuông cạnh (a+b) × (a+b), chia thành 4 tam giác vuông + 1 hình vuông cạnh c ở giữa:

```
(a+b)² = 4 · (½ab) + c²
a² + 2ab + b² = 2ab + c²
a² + b² = c²  ✓
```

### Ví dụ — Bộ ba Pythagoras nguyên

| a | b | c |
|---|---|---|
| 3 | 4 | 5 |
| 5 | 12 | 13 |
| 8 | 15 | 17 |
| 7 | 24 | 25 |

Bất kỳ bội số nào của bộ Pythagoras cũng là bộ Pythagoras (vd 6-8-10, 9-12-15).

---

## 6. Diện tích tam giác

3 công thức phổ biến:

### 6.1. Cơ bản

```
S = (1/2) · đáy · chiều cao
```

### 6.2. Công thức Heron — chỉ cần 3 cạnh

```
S = √[s(s−a)(s−b)(s−c)]   với s = (a+b+c)/2 (nửa chu vi)
```

### 6.3. Công thức SAS

```
S = (1/2) · a · b · sin(C)
```

trong đó C là góc kẹp giữa 2 cạnh a và b.

---

## 7. Bài tập

### Bài tập

**Bài 1**: Tam giác có cạnh 3, 4, 5. Đây có là tam giác vuông không?

**Bài 2**: Tam giác đều cạnh 6 có diện tích bao nhiêu?

**Bài 3**: Tam giác ABC có A = 80°, B = 60°. Tìm C.

**Bài 4**: Có 3 đoạn dài 2, 3, 6. Tạo được tam giác không?

**Bài 5**: Tam giác có 3 cạnh 5, 12, 13. Tính diện tích bằng 2 cách.

**Bài 6**: 2 tam giác đồng dạng tỉ số k = 3. Tỉ lệ diện tích là bao nhiêu?

### Lời giải

**Bài 1**: 3² + 4² = 9 + 16 = 25 = 5². → **VUÔNG** (Pythagoras đảo).

**Bài 2**: Chiều cao = (cạnh × √3)/2 = 3√3. S = (1/2) · 6 · 3√3 = **9√3 ≈ 15.59**.

**Bài 3**: C = 180 − 80 − 60 = **40°**.

**Bài 4**: 2 + 3 = 5 < 6 → vi phạm bất đẳng thức tam giác → **KHÔNG tạo được**.

**Bài 5**: 
- Pythagoras: 5² + 12² = 25 + 144 = 169 = 13² → tam giác vuông.
- Cách 1: S = (1/2) · 5 · 12 = **30**.
- Cách 2 (Heron): s = 15. S = √[15 · 10 · 3 · 2] = √900 = **30** ✓.

**Bài 6**: Tỉ lệ diện tích = k² = **9**.

---

## 8. Bài tiếp theo

[Lesson 03 — Đường tròn](../lesson-03-circles/).

## 📝 Tổng kết

1. **Tam giác**: tổng 3 góc = 180°. Bất đẳng thức: cạnh < tổng 2 cạnh kia.
2. **Phân loại**: đều/cân/thường + nhọn/vuông/tù.
3. **Bằng nhau**: SSS, SAS, ASA. Đồng dạng: AA, SAS, SSS.
4. **Pythagoras**: a² + b² = c² (vuông). Bộ 3-4-5 phổ biến nhất.
5. **Diện tích**: ½·đáy·cao = √(s(s−a)(s−b)(s−c)) (Heron) = ½·a·b·sin(C).
