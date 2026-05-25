# Lesson 03 — Phương trình bậc 1

## Mục tiêu học tập

- Hiểu **phương trình** vs **biểu thức** — và ý nghĩa "nghiệm".
- Áp dụng **quy tắc chuyển vế và quy tắc nhân** để giải phương trình bậc 1.
- Giải **hệ phương trình bậc 1 hai ẩn** bằng phương pháp thế và phương pháp cộng đại số.
- Giải phương trình bậc 1 ứng dụng (toán đời sống).

## Kiến thức tiền đề

- [Lesson 02 — Biểu thức đại số](../lesson-02-algebraic-expressions/).

---

## 1. Phương trình bậc 1 một ẩn

### 1.1. Định nghĩa

**Phương trình** = đẳng thức chứa **biến chưa biết**, dạng tổng quát:
```
ax + b = 0   (a ≠ 0)
```

trong đó **x là ẩn cần tìm**, a và b là hằng số.

💡 **Là gì**: phương trình là "câu hỏi" — hỏi giá trị x nào sẽ làm đẳng thức đúng.

**Vì sao cần?** Vì rất nhiều bài toán đời thực có dạng "tìm giá trị x sao cho...":
- Tìm x để 2x + 10 = 30 (tốc độ chạy + thời gian = quãng đường).
- Tìm số tuổi anh nếu tổng tuổi 3 anh em = 60.

**Nghiệm** = giá trị x làm phương trình đúng.

### 1.2. Cách giải

**2 quy tắc cơ bản**:

1. **Quy tắc chuyển vế**: chuyển 1 số sang vế kia, **đổi dấu**.
   - `x + 3 = 10 → x = 10 − 3 = 7`.

2. **Quy tắc nhân/chia**: nhân/chia cả 2 vế cùng số (≠ 0).
   - `3x = 12 → x = 12/3 = 4`.

**Quy trình giải `ax + b = 0`**:
1. Chuyển b sang vế phải: `ax = −b`.
2. Chia 2 vế cho a: `x = −b/a`.

### 1.3. Bốn ví dụ

**Ví dụ 1**: `2x + 3 = 11`. Chuyển 3: 2x = 8. Chia 2: **x = 4**.

**Ví dụ 2**: `5(x − 1) = 3x + 7`. Khai triển: 5x − 5 = 3x + 7. Chuyển: 5x − 3x = 7 + 5 → 2x = 12 → **x = 6**.

**Ví dụ 3 (vô số nghiệm)**: `2x + 4 = 2(x + 2)`. Khai triển: 2x + 4 = 2x + 4. Luôn đúng → **x là bất kỳ**.

**Ví dụ 4 (vô nghiệm)**: `x + 3 = x + 5`. Chuyển: 3 = 5. Sai → **KHÔNG nghiệm**.

---

## 2. Hệ phương trình bậc 1 hai ẩn

### 2.1. Định nghĩa

Hệ 2 phương trình, mỗi cái bậc 1, có 2 ẩn (thường x và y):
```
a₁x + b₁y = c₁
a₂x + b₂y = c₂
```

**Nghiệm của hệ** = cặp (x, y) thỏa mãn CẢ HAI phương trình.

### 2.2. Phương pháp thế (Substitution)

1. Từ một phương trình, biểu diễn 1 ẩn theo ẩn kia.
2. Thay vào phương trình còn lại → còn 1 ẩn → giải.
3. Thay ngược lại tìm ẩn còn lại.

**Ví dụ**: 
```
x + y = 10    (1)
2x − y = 5    (2)
```

Từ (1): y = 10 − x. Thay vào (2): 2x − (10 − x) = 5 → 3x = 15 → **x = 5**. Thay lại: **y = 5**.

### 2.3. Phương pháp cộng đại số (Elimination)

1. Nhân các phương trình với số phù hợp để hệ số của 1 ẩn đối nhau.
2. Cộng 2 phương trình → triệt tiêu ẩn đó → còn 1 ẩn → giải.

**Cùng ví dụ trên**:
- (1) + (2): (x + y) + (2x − y) = 10 + 5 → 3x = 15 → **x = 5**.

### 2.4. Ba trường hợp nghiệm

Đường thẳng a₁x + b₁y = c₁ và a₂x + b₂y = c₂ trên mặt phẳng:

1. **Cắt nhau**: 1 nghiệm duy nhất.
2. **Song song** (a₁/a₂ = b₁/b₂ ≠ c₁/c₂): vô nghiệm.
3. **Trùng nhau** (a₁/a₂ = b₁/b₂ = c₁/c₂): vô số nghiệm.

---

## 3. Ứng dụng — Bài toán thực

### Ví dụ 1 — Bài toán tốc độ

Xe đi từ A đến B với v = 60 km/h trong 2 giờ, sau đó từ B về A với v khác trong 3 giờ. Tổng quãng đường = 240 km. Tính v lúc về.

- Đi: 60 × 2 = 120 km.
- Về: 3 × v = 240 − 120 = 120 km → v = **40 km/h**.

### Ví dụ 2 — Bài toán tuổi

Tuổi anh hiện tại gấp 3 lần tuổi em. 5 năm nữa, tuổi anh gấp 2 lần tuổi em. Tính tuổi hiện tại.

- Gọi tuổi em hiện tại = x, anh = 3x.
- 5 năm nữa: anh = 3x + 5, em = x + 5.
- Điều kiện: 3x + 5 = 2(x + 5) → 3x + 5 = 2x + 10 → x = 5.
- Em 5 tuổi, anh **15 tuổi**.

---

## 4. Bài tập

### Bài tập

**Bài 1**: Giải `3x − 7 = 2x + 5`.

**Bài 2**: Giải `4(x + 2) − 3 = 2x + 9`.

**Bài 3**: Giải hệ:
```
2x + y = 7
x − y = 2
```

**Bài 4**: Giải hệ:
```
3x + 2y = 12
2x − y = 1
```

**Bài 5**: Tổng 2 số bằng 20, hiệu của chúng bằng 4. Tìm 2 số.

**Bài 6**: Một người đi xe máy từ A → B với v = 40 km/h, lúc về v = 60 km/h. Tổng thời gian 5 giờ. Tính quãng đường AB.

### Lời giải

**Bài 1**: 3x − 2x = 5 + 7 → **x = 12**.

**Bài 2**: 4x + 8 − 3 = 2x + 9 → 4x + 5 = 2x + 9 → 2x = 4 → **x = 2**.

**Bài 3**: Cộng 2 PT: 3x = 9 → **x = 3**. Thay: y = 2x − 7 = −1. Vậy **(x, y) = (3, 1)**. (Kiểm tra: 2·3 + 1 = 7 ✓, 3 − 1 = 2 ✓.)

Đợi, sai. Để tôi tính lại:
- (1): 2x + y = 7
- (2): x − y = 2
- Cộng: 3x = 9 → x = 3.
- Từ (2): y = x − 2 = 1.
- Kiểm tra (1): 2·3 + 1 = 7 ✓.
- → **(x, y) = (3, 1)**.

**Bài 4**: 
- (1) + 2·(2): 3x + 2y + 4x − 2y = 12 + 2 → 7x = 14 → x = 2.
- (2): y = 2x − 1 = 3.
- → **(x, y) = (2, 3)**.

**Bài 5**: Gọi 2 số là a, b. a + b = 20, a − b = 4. Cộng: 2a = 24 → a = 12. b = 8. → **(12, 8)**.

**Bài 6**: Gọi AB = d. t_đi = d/40, t_về = d/60. Tổng: d/40 + d/60 = 5 → 3d/120 + 2d/120 = 5 → 5d/120 = 5 → d = **120 km**.

---

## 5. Bài tiếp theo

[Lesson 04 — Phương trình bậc 2](../lesson-04-quadratic-equations/).

## 📝 Tổng kết

1. **PT bậc 1**: ax + b = 0 → x = −b/a (a ≠ 0).
2. **2 quy tắc**: chuyển vế (đổi dấu), nhân/chia (cả 2 vế).
3. **Hệ 2 PT 2 ẩn**: thế hoặc cộng đại số.
4. **3 trường hợp**: 1 nghiệm / vô nghiệm / vô số nghiệm.
