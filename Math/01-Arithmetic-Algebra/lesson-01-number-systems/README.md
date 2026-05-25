# Lesson 01 — Hệ số học (ℕ → ℤ → ℚ → ℝ)

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Phân biệt 4 tập số chính: **ℕ (tự nhiên), ℤ (nguyên), ℚ (hữu tỉ), ℝ (thực)**.
- Hiểu **vì sao** mỗi tập tồn tại — không phải ngẫu nhiên, mà là **mở rộng có lý do**.
- Biết bao hàm: **ℕ ⊂ ℤ ⊂ ℚ ⊂ ℝ**.
- Phân biệt **số hữu tỉ** (viết được phân số) và **số vô tỉ** (không viết được).
- Hiểu vì sao **máy tính không lưu chính xác 0.1** (sai số float).

## Kiến thức tiền đề

Không. Cần biết cộng/trừ/nhân/chia tiểu học.

---

## 1. ℕ — Tập số tự nhiên

### 1.1. Định nghĩa

**ℕ = {0, 1, 2, 3, 4, ...}** — các số dùng để **đếm**.

💡 **Là gì**: ℕ là tập "nguyên thủy" — đủ để đếm vật rời rạc (số quả táo, số người).

**Vì sao tồn tại**: Đây là khái niệm số sớm nhất loài người dùng. Có trước cả khái niệm "số 0" (số 0 chỉ xuất hiện ở Ấn Độ ~ thế kỷ 7).

**Quy ước**: Trong tài liệu này, ℕ **bao gồm 0** (theo chuẩn ISO và lập trình). Một số sách Việt Nam phổ thông cũ định nghĩa ℕ = {1, 2, 3, ...}, có ký hiệu riêng ℕ* = {1, 2, ...}. Khi đọc tài liệu, luôn kiểm tra quy ước.

### 1.2. Vấn đề của ℕ

ℕ "đóng" dưới + và × (cộng/nhân 2 số tự nhiên → vẫn tự nhiên). Nhưng KHÔNG đóng dưới −:
- `3 − 5 = −2`. Số này không thuộc ℕ.

→ Cần **mở rộng** ℕ thành tập lớn hơn để phép trừ luôn được.

---

## 2. ℤ — Tập số nguyên

### 2.1. Định nghĩa

**ℤ = {..., −3, −2, −1, 0, 1, 2, 3, ...}** — số tự nhiên + số nguyên âm.

💡 **Là gì**: ℤ thêm vào ℕ các số âm để **phép trừ luôn có nghĩa**.

**Vì sao tồn tại**: Để mô hình hóa các khái niệm như "nợ", "nhiệt độ dưới 0", "tọa độ trái/phải".

### 2.2. Vấn đề của ℤ

ℤ đóng dưới +, −, × nhưng KHÔNG đóng dưới ÷:
- `1 ÷ 2 = 0.5`. Không thuộc ℤ.

→ Cần mở rộng tiếp.

---

## 3. ℚ — Tập số hữu tỉ (Rational)

### 3.1. Định nghĩa

**ℚ = {p/q : p ∈ ℤ, q ∈ ℤ, q ≠ 0}** — mọi số viết được dưới dạng **phân số**.

💡 **Là gì**: ℚ thêm vào ℤ các số phân số để phép chia luôn được (trừ chia 0).

**Vì sao tồn tại**: Để chia rời, đo lường, biểu thị tỉ lệ.

**Ví dụ**:
- 1/2 = 0.5
- 1/3 = 0.333... (lặp lại vô hạn)
- 22/7 ≈ 3.142857... (không phải π chính xác)
- −7 = −7/1 (mọi số nguyên đều là hữu tỉ)

### 3.2. Đặc trưng

Số hữu tỉ khi viết dưới dạng thập phân thì:
- **Hữu hạn**: 1/4 = 0.25.
- **Vô hạn LẶP LẠI tuần hoàn**: 1/3 = 0.333..., 1/7 = 0.142857142857...

### 3.3. Vấn đề của ℚ

Có những số **không** viết được dưới dạng p/q. Ví dụ kinh điển: **√2**.

**Chứng minh √2 vô tỉ** (Pythagoras khoảng 500 TCN):
- Giả sử √2 = p/q (p, q là số nguyên, đã rút gọn — không cùng chia hết cho số nào).
- Bình phương: 2 = p²/q² → p² = 2q².
- p² chẵn → p chẵn. Đặt p = 2k.
- 4k² = 2q² → q² = 2k² → q² chẵn → q chẵn.
- Cả p và q đều chẵn → trái với giả thiết "đã rút gọn".
- **Mâu thuẫn** → √2 KHÔNG hữu tỉ.

→ Cần mở rộng nữa.

---

## 4. ℝ — Tập số thực (Real)

### 4.1. Định nghĩa

**ℝ** = mọi số trên **trục số liên tục**, gồm cả hữu tỉ và vô tỉ.

💡 **Là gì**: ℝ là tập số đầy đủ nhất ta dùng trong giải tích, vật lý — tương ứng với "độ dài liên tục".

**Vì sao tồn tại**: Để có thể nói về độ dài, vị trí, thời gian một cách **liên tục** (không bị "lỗ hổng" như ℚ).

### 4.2. Số vô tỉ phổ biến

- **√2** ≈ 1.4142135...
- **π** ≈ 3.1415926... (tỉ số chu vi / đường kính hình tròn)
- **e** ≈ 2.7182818... (cơ số log tự nhiên)
- **φ = (1+√5)/2** ≈ 1.618... (tỉ lệ vàng)

### 4.3. Bao hàm

```
ℕ ⊂ ℤ ⊂ ℚ ⊂ ℝ
```

Mỗi tập sau bao gồm tập trước. ℝ\ℚ = tập các số vô tỉ.

### 4.4. Tính chất quan trọng

- **ℝ liên tục (dày đặc)**: giữa 2 số thực bất kỳ luôn có vô số số thực khác.
- **ℝ không đếm được**: số phần tử ℝ "lớn hơn" số phần tử ℕ (chứng minh đường chéo Cantor — sẽ học ở tầng cao hơn).

### 📝 Tóm tắt mục 1-4

| Tập | Định nghĩa | Mở rộng để có |
|-----|-----------|-----------------|
| ℕ | {0, 1, 2, ...} | Đếm |
| ℤ | + số âm | Phép trừ |
| ℚ | Phân số p/q | Phép chia |
| ℝ | + số vô tỉ (√2, π, e) | Liên tục (giải tích) |

---

## 5. Sai số float trong máy tính

### 5.1. Máy tính dùng nhị phân

Máy tính lưu số ở dạng **nhị phân** (cơ số 2). Một số hữu tỉ thập phân hoàn hảo (vd 0.1) lại là số "lặp vô hạn" trong nhị phân:
- 0.1 (thập phân) = 0.000110011001100... (nhị phân, lặp vô hạn).

Vì máy tính chỉ có hữu hạn bit (64-bit double) → bị **làm tròn** → mất chính xác.

### 5.2. Hệ quả nổi tiếng

Trong mọi ngôn ngữ lập trình (Python, JavaScript, Go...):
```python
0.1 + 0.2 == 0.3   # False!
0.1 + 0.2          # 0.30000000000000004
```

### 5.3. Ý nghĩa

Khi tính toán số thực trên máy, **luôn có sai số nhỏ**. Đây là lý do:
- So sánh hai số thực dùng `abs(a - b) < epsilon` thay vì `a == b`.
- Trong ML/AI: thuật toán cần ổn định với sai số float (robust).

### 📝 Tóm tắt mục 5

- Máy tính lưu số dạng nhị phân hữu hạn bit → không lưu được 0.1 chính xác.
- `0.1 + 0.2 ≠ 0.3` trong mọi ngôn ngữ lập trình.

---

## 6. Bài tập

### Bài tập

**Bài 1**: Số nào thuộc tập nào: −3, 0, 0.5, √2, π, 22/7, 0.333... (lặp)?

**Bài 2**: Là gì khác nhau giữa 22/7 và π?

**Bài 3**: Chứng minh √3 cũng là số vô tỉ (theo Pythagoras).

**Bài 4**: Tính `(0.1 + 0.2) - 0.3` trong Python. Vì sao không bằng 0?

**Bài 5**: Sắp xếp từ tập nhỏ nhất tới lớn nhất: ℝ, ℕ, ℤ, ℚ.

### Lời giải

**Bài 1**:
- **−3**: ℤ (cũng thuộc ℚ, ℝ; KHÔNG thuộc ℕ).
- **0**: ℕ, ℤ, ℚ, ℝ.
- **0.5 = 1/2**: ℚ, ℝ. KHÔNG ℕ, ℤ.
- **√2**: chỉ ℝ (vô tỉ).
- **π**: chỉ ℝ (vô tỉ).
- **22/7**: ℚ, ℝ.
- **0.333... (lặp)**: ℚ (= 1/3), ℝ.

**Bài 2**: 22/7 là số HỮU TỈ, viết được dưới dạng phân số. π là số VÔ TỈ, không viết được. 22/7 ≈ 3.142857 — chỉ là **xấp xỉ** cho π. Hai số khác nhau.

**Bài 3**: Tương tự √2:
- Giả sử √3 = p/q (đã rút gọn). Bình phương: 3 = p²/q² → p² = 3q².
- p² chia hết cho 3 → p chia hết cho 3. Đặt p = 3k.
- 9k² = 3q² → q² = 3k² → q chia hết cho 3.
- Cả p và q chia hết cho 3 → trái giả thiết. Mâu thuẫn. → √3 vô tỉ.

**Bài 4**: Kết quả ≈ 5.55 × 10⁻¹⁷. Lý do: 0.1 và 0.2 đều bị làm tròn khi lưu trong nhị phân → kết quả phép cộng bị sai số nhỏ.

**Bài 5**: **ℕ ⊂ ℤ ⊂ ℚ ⊂ ℝ**.

---

## 7. Bài tiếp theo

[Lesson 02 — Biểu thức đại số](../lesson-02-algebraic-expressions/).

## 📝 Tổng kết

1. **ℕ** đếm; mở rộng **ℤ** (số âm cho trừ); **ℚ** (phân số cho chia); **ℝ** (số vô tỉ cho liên tục).
2. **Số vô tỉ**: √2, π, e, φ — không viết được p/q.
3. **Số hữu tỉ**: thập phân hữu hạn hoặc lặp vô hạn tuần hoàn.
4. **Máy tính**: không lưu chính xác số thập phân → sai số float.
