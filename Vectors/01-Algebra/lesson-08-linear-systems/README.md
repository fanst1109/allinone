# Lesson 08 — Hệ phương trình tuyến tính

> Tầng 1 · Algebra · Lesson 08 (bài cuối tầng)

## Mục tiêu học tập

Sau bài này, bạn sẽ:

- Hiểu **hệ phương trình tuyến tính** là gì và biểu diễn được nó dưới 3 dạng: phương trình, bảng số (ma trận mở rộng), hình học.
- Nắm 3 cách giải cơ bản cho hệ nhỏ: **phương pháp thế**, **phương pháp cộng đại số**, **khử Gauss**.
- Phân loại được hệ ra 3 trường hợp: **một nghiệm duy nhất / vô số nghiệm / vô nghiệm** — và nhận ra trường hợp đó cả về hình học lẫn về dạng ma trận sau khi khử.
- Biết ý tưởng **định thức (determinant)** cho hệ 2 ẩn và công thức Cramer (đủ để dùng nhanh, không đi sâu — sẽ học kỹ ở Tầng 4 Linear Algebra).
- Liên hệ được hệ phương trình tuyến tính với bài toán `Ax = b` và biết tại sao **linear regression closed-form** thực chất là giải một hệ phương trình tuyến tính khổng lồ.
- Cài đặt được **Gauss elimination with partial pivoting** bằng Go.

## Kiến thức tiền đề

- [Lesson 03 — Phương trình bậc 1](../lesson-03-linear-equations/) — vì hệ phương trình tuyến tính chính là tập hợp nhiều phương trình bậc 1 phải đồng thời đúng.
- [Lesson 06 — Hàm bậc 1 và bậc 2](../lesson-06-linear-quadratic/) — vì đồ thị mỗi phương trình `ax + by = c` chính là một đường thẳng, và giao điểm = nghiệm.

---

## 1. Hệ phương trình tuyến tính là gì?

### 1.1 Trực giác trước — "danh sách điều kiện cùng phải đúng"

Hãy hình dung bạn đang đi tìm hai con số bí ẩn `x` và `y`. Ai đó cho bạn 2 manh mối:

- Manh mối 1: "Tổng hai số bằng `10`."
- Manh mối 2: "Hiệu hai số bằng `4`."

Mỗi manh mối **một mình** không xác định được hai số (vô số cặp có tổng `10`: `(1, 9), (2, 8), (3, 7), ...`). Nhưng khi bạn yêu cầu **cả hai cùng đúng**, chỉ còn đúng một cặp: `(7, 3)`.

Đó chính xác là **hệ phương trình tuyến tính**:

```
x + y = 10
x − y =  4
```

**Hệ = danh sách điều kiện cùng phải đúng (constraints).** Nghiệm = bộ giá trị thỏa mọi điều kiện cùng lúc. Nếu mâu thuẫn → vô nghiệm. Nếu các điều kiện trùng lặp (không độc lập) → vô số nghiệm.

> **💡 Trực giác**: Một phương trình = một dòng/mặt phẳng "cắt" không gian. Hệ = giao của nhiều dòng/mặt phẳng. Hỏi "nghiệm ở đâu?" = hỏi "giao điểm nằm chỗ nào?".

### 1.2 Định nghĩa hình thức

Một **phương trình tuyến tính** (linear equation) với các ẩn `x, y, z, ...` là phương trình có dạng:

```
a₁·x + a₂·y + a₃·z + ... = b
```

trong đó `a₁, a₂, ...` và `b` là các hằng số. "Tuyến tính" nghĩa là **mỗi ẩn chỉ xuất hiện với lũy thừa 1, không có `x²`, không có `xy`, không có `sin(x)`**.

Một **hệ phương trình tuyến tính** (system of linear equations) là tập **nhiều** phương trình như vậy phải **đồng thời đúng**. Nghiệm của hệ là bộ giá trị `(x, y, z, ...)` sao cho khi thay vào thì **mọi** phương trình đều thỏa.

### 1.3 Năm ví dụ hệ với context đời thường

**Ví dụ A — Mua bán (2 ẩn).** Bạn vào quán cà phê: 2 ly espresso + 1 ly latte hết `90k`; 1 ly espresso + 2 ly latte hết `105k`. Gọi `e` = giá espresso, `l` = giá latte:

```
2e + 1l =  90
1e + 2l = 105
```

Nghiệm `(e, l) = (25, 40)` — espresso `25k`, latte `40k`.

**Ví dụ B — Pha trộn dung dịch (2 ẩn).** Cần pha 100 ml dung dịch nồng độ 30% từ 2 chai có sẵn: chai A nồng độ 20%, chai B nồng độ 50%. Gọi `a, b` là số ml lấy từ mỗi chai:

```
a +  b = 100       (tổng thể tích)
0.2a + 0.5b = 30   (tổng chất tan)
```

Nghiệm: `(a, b) = (200/3, 100/3) ≈ (66.7, 33.3)` ml.

**Ví dụ C — Tuổi tác (2 ẩn).** Bố hơn con `30` tuổi. Năm năm nữa, tuổi bố sẽ gấp 3 tuổi con. Gọi `f, s` là tuổi bố/con hiện tại:

```
f − s = 30
f + 5 = 3·(s + 5)   →   f − 3s = 10
```

Nghiệm: `f = 40, s = 10`.

**Ví dụ D — Cân bằng phản ứng (3 ẩn).** Bài toán "đếm nguyên tử" trong phản ứng hóa học cho ra một hệ tuyến tính. Ví dụ cân bằng `aH₂ + bO₂ → cH₂O`:

```
2a = 2c    (H)
2b =  c    (O)
```

Hệ có **vô số nghiệm** (tỉ lệ): `(a, b, c) = (2, 1, 2)` là nghiệm nguyên nhỏ nhất.

**Ví dụ E — Phân bổ ngân sách (3 ẩn).** Một startup có `100` triệu chia cho marketing, sản phẩm, lương. Marketing gấp đôi sản phẩm. Lương gấp 4 lần marketing.

```
m + p + s = 100
m − 2p     =   0
s − 4m     =   0
```

Nghiệm: `(m, p, s) = (200/11, 100/11, 800/11) ≈ (18.2, 9.1, 72.7)` triệu.

> **🔁 Dừng lại tự kiểm tra**: Trong cả 5 ví dụ trên, mỗi câu chữ tiếng Việt được dịch thành **một phương trình** (một dòng ràng buộc). Khi nhìn một bài toán đời thường, kỹ năng quan trọng là **đặt biến và viết ra hệ** — phần "giải" chỉ là máy móc sau đó.

### 1.4 Quy trình "đặt biến → viết hệ" (template chung)

Một mẹo nhỏ để **không bao giờ nhầm** khi gặp bài toán bằng lời:

1. **Đếm số "đại lượng chưa biết"** trong đề → đó là số ẩn. Đặt tên (`x, y`, hoặc `e, l` cho dễ nhớ).
2. **Mỗi câu mô tả ràng buộc số học = 1 phương trình**. Đọc lại đề, mỗi câu kiểu "tổng/hiệu/gấp X lần/cộng lại bằng..." → ra 1 phương trình.
3. **Kiểm tra: số phương trình ≈ số ẩn?** Nếu thiếu phương trình → bài thiếu dữ kiện. Nếu thừa → có lẽ phương trình thừa chỉ để kiểm tra (hoặc đề có lỗi).
4. Sau khi có hệ — quên đề đi, **giải thuần đại số**.

Áp dụng cho Ví dụ A (cà phê):
- "Espresso" và "Latte" là 2 đại lượng chưa biết → 2 ẩn: `e, l`.
- Câu 1: "2 espresso + 1 latte = 90k" → `2e + l = 90`.
- Câu 2: "1 espresso + 2 latte = 105k" → `e + 2l = 105`.
- 2 phương trình, 2 ẩn — đầy đủ. Giải.

Áp dụng cho Ví dụ C (tuổi):
- 2 đại lượng: tuổi bố `f`, tuổi con `s`.
- Câu 1: "bố hơn con 30 tuổi" → `f − s = 30`.
- Câu 2: "5 năm nữa, tuổi bố gấp 3 tuổi con" → `f + 5 = 3(s + 5)`. Khai triển: `f − 3s = 10`.
- 2 phương trình, 2 ẩn.

> **💡 Trực giác**: bài toán bằng lời 90% khó ở chỗ **dịch câu thành phương trình**, không phải ở chỗ giải. Khi đã có hệ, ta vào "chế độ máy móc": áp dụng thế / cộng / Gauss → ra số.

### Ví dụ 2 ẩn

```
2x + 3y = 12
 x −  y =  1
```

Bộ `(x, y) = (3, 2)` thử lại:
- `2·3 + 3·2 = 6 + 6 = 12` ✓
- `3 − 2 = 1` ✓

Vậy `(3, 2)` là một nghiệm. Mục tiêu của bài này: **học cách tìm nghiệm đó một cách có hệ thống**, không đoán.

### Ví dụ 3 ẩn

```
 x +  y +  z =  6
2x −  y + 3z = 14
3x + 2y −  z =  4
```

Sẽ giải ở Mục 6 bằng khử Gauss; nghiệm là `(x, y, z) = (1, 2, 3)`.

### Lưu ý ký hiệu

Ta thường viết dạng tổng quát cho hệ `m` phương trình `n` ẩn:

```
a₁₁·x₁ + a₁₂·x₂ + ... + a₁ₙ·xₙ = b₁
a₂₁·x₁ + a₂₂·x₂ + ... + a₂ₙ·xₙ = b₂
...
aₘ₁·x₁ + aₘ₂·x₂ + ... + aₘₙ·xₙ = bₘ
```

Bảng các hệ số `aᵢⱼ` gọi là **ma trận hệ số** (coefficient matrix) `A`, cột `b` là **vế phải**. Đặt `x = (x₁, ..., xₙ)ᵀ` thì hệ tương đương với:

```
Ax = b
```

— phương trình quen thuộc bậc nhất trong đại số tuyến tính. Tầng 4 sẽ học rất kỹ. Ở bài này ta chỉ dùng cách viết bảng số để khử Gauss cho gọn.

---

## 2. Ý nghĩa hình học (2 ẩn)

Mỗi phương trình tuyến tính 2 ẩn `ax + by = c` (với `(a, b) ≠ (0, 0)`) là phương trình một **đường thẳng** trên mặt phẳng `Oxy`. Nghiệm của hệ 2 phương trình = **giao** của 2 đường thẳng.

Ba trường hợp:

### (a) Một nghiệm duy nhất — 2 đường cắt nhau tại 1 điểm

```
2x + 3y = 12   (đường thẳng L₁)
 x −  y =  1   (đường thẳng L₂)
```

Hai đường có **hệ số góc khác nhau** (`L₁`: hệ số góc `−2/3`, `L₂`: hệ số góc `1`). Chúng cắt nhau tại đúng 1 điểm — chính là `(3, 2)`.

**ASCII grid** (trục y dọc, trục x ngang, mỗi ô = 1 đơn vị):

```
       y
       ↑
     5 │ L₁
     4 │  ●               (0,4) thuộc L₁
     3 │   ╲
     2 │    ╲   ●         giao điểm (3,2)
     1 │     ╲ ╱  L₂
     0 ┼──────╳──●─────→ x  (6,0) thuộc L₁
    −1 │   L₂╱ ╲          (1,0) thuộc L₂
    −2 │    ╱   ╲
       └──┼──┼──┼──┼──┼──┼──
          1  2  3  4  5  6
```

- `L₁: 2x + 3y = 12` (dốc xuống, hệ số góc `−2/3`) đi qua `(6, 0)` và `(0, 4)`.
- `L₂: x − y = 1` (dốc lên, hệ số góc `+1`) đi qua `(1, 0)` và `(0, −1)`.
- Vì 2 hệ số góc khác nhau (`−2/3 ≠ +1`), 2 đường **chắc chắn** cắt nhau ở đúng 1 chỗ.
- Hai đường cắt nhau tại `●` = `(3, 2)` — đây chính là nghiệm.

**Kiểm tra trực giác bằng tọa độ**:
- Tại `(3, 2)`: L₁ cho `2·3 + 3·2 = 12` ✓; L₂ cho `3 − 2 = 1` ✓ → điểm này nằm trên **cả hai** đường.
- Tại `(0, 4)` (chỉ trên L₁): L₂ cho `0 − 4 = −4 ≠ 1` → không nằm trên L₂.

### (b) Vô số nghiệm — 2 đường trùng nhau

```
2x + 3y =  6
4x + 6y = 12
```

Phương trình thứ hai chỉ là phương trình thứ nhất **nhân 2** ở cả hai vế. Cùng tập điểm. Mọi `(x, y)` thỏa `2x + 3y = 6` đều là nghiệm — vô số.

**ASCII grid** (chỉ vẽ được 1 đường vì 2 đường đè khít lên nhau):

```
       y
       ↑
     3 │
     2 │ ●  ←── (0, 2) thuộc CẢ L₁ lẫn L₂
     1 │  ╲╲   ●  ←── (1.5, 1) cũng thuộc cả 2
     0 ┼───╲╲──●──→ x  ← (3, 0) thuộc cả L₁ và L₂
    −1 │    ╲╲
    −2 │     ╲╲
       └──┼──┼──┼──┼──┼──
          1  2  3  4  5
```

Mọi điểm trên đường này (như `(3, 0), (0, 2), (1.5, 1), (−3, 4), ...`) đều là nghiệm. Có vô số.

**Cách nhận ra "trùng nhau" mà không cần vẽ**: tỉ số `2/4 = 3/6 = 6/12 = 1/2` — **cả ba tỉ số đều bằng nhau**. Nghĩa là phương trình (2) chính là phương trình (1) nhân với cùng một hằng số (ở đây là 2). Hai phương trình mang **cùng một thông tin**, chỉ "viết lại bằng giọng khác".

### (c) Vô nghiệm — 2 đường song song không trùng

```
2x + 3y =  6
4x + 6y = 10
```

Vế trái thứ hai bằng `2 ×` vế trái thứ nhất, nhưng vế phải thì `10 ≠ 2·6 = 12`. Hai đường thẳng có **cùng hướng** (song song) nhưng **không trùng** → không có giao điểm.

**ASCII grid**:

```
       y
       ↑
     3 │
   5/3 │      ●  ←── L₂ qua (0, 5/3) ≈ (0, 1.67)
     2 │ ●╲    ╲       ← L₁ qua (0, 2)
     1 │  ╲╲    ╲╲
     0 ┼───╲╲────╲●──→ x  ← L₂ qua (2.5, 0); L₁ qua (3, 0)
    −1 │    ╲╲    ╲
    −2 │     ╲╲    ╲
       └──┼──┼──┼──┼──┼──┼──
          1  2  3  4  5  6
```

Hai đường **cùng hệ số góc `−2/3`** (vì tỉ số `2/4 = 3/6 = 1/2`) nhưng cắt trục `Ox` ở 2 điểm khác nhau (`x = 3` cho L₁, `x = 2.5` cho L₂) — luôn cách nhau, không bao giờ gặp.

**Cách nhận ra "song song" mà không cần vẽ**: tỉ số vế trái `2/4 = 3/6 = 1/2`, nhưng tỉ số vế phải `6/10 = 3/5 ≠ 1/2`. Hai phương trình mâu thuẫn: phương trình (1) nói "tổng `2x + 3y` bằng 6", trong khi phương trình (2) — sau khi chia 2 — nói "cùng tổng đó bằng 5". Không thể vừa bằng 6 vừa bằng 5.

> **🔁 Dừng lại tự kiểm tra**: Cả 3 trường hợp trên có thể nhận biết **không cần vẽ** — chỉ qua tỉ số hệ số (bảng dưới). Hình học là "trực giác kiểm chứng", đại số là "công cụ vận hành".

### Tóm tắt phân loại 2 ẩn

| Tỉ số hệ số | Vế phải | Hình học | Số nghiệm |
|---|---|---|---|
| `a₁/a₂ ≠ b₁/b₂` | bất kỳ | 2 đường cắt | **1 nghiệm** |
| `a₁/a₂ = b₁/b₂ = c₁/c₂` | tỉ số bằng | 2 đường trùng | **vô số** |
| `a₁/a₂ = b₁/b₂ ≠ c₁/c₂` | tỉ số khác | 2 đường song song | **vô nghiệm** |

> **Câu hỏi tự nhiên**: "Vậy hệ 2 ẩn có khi nào có đúng 2 nghiệm không?" — **Không**. Hai đường thẳng trong mặt phẳng chỉ có 3 khả năng: cắt 1 điểm / trùng / song song. Đây là đặc trưng của tuyến tính: số nghiệm luôn là 0, 1, hoặc vô số.

---

## 3. Ý nghĩa hình học (3 ẩn)

Mỗi phương trình `ax + by + cz = d` (với `(a, b, c) ≠ (0, 0, 0)`) là một **mặt phẳng** trong không gian 3D. Hệ 3 phương trình = giao của 3 mặt phẳng.

Các trường hợp:

- **Giao là 1 điểm** → 1 nghiệm. (3 mặt phẳng "đâm vào nhau" tại 1 chỗ — giống 3 tờ giấy đặt nghiêng cắt nhau.)
- **Giao là 1 đường thẳng** → vô số nghiệm (1 tham số tự do).
- **Giao là 1 mặt phẳng** → vô số nghiệm (cả 3 phương trình thực ra là cùng một mặt).
- **Không có giao chung** → vô nghiệm. Có thể 2 mặt song song, hoặc 3 mặt cắt nhau thành "lăng trụ" — đôi một cắt nhưng không có điểm chung của cả 3.

Trực giác: tăng số ẩn thì **không gian nghiệm** càng phong phú. Với `n` ẩn ta đang giao các **siêu phẳng** trong `n` chiều — không thể vẽ nhưng đại số vẫn xử được. Khử Gauss ở Mục 6 hoạt động cho **mọi** `n`, không cần tưởng tượng hình.

---

## 4. Phương pháp thế (substitution)

**Ý tưởng**: tách 1 ẩn ra theo các ẩn khác từ 1 phương trình, rồi thay (substitute) vào các phương trình còn lại. Mỗi lần thay làm giảm 1 ẩn → cuối cùng còn 1 ẩn, giải xong rồi thế ngược lên.

### Ví dụ: giải hệ 2 ẩn ở Mục 1

```
(1)  2x + 3y = 12
(2)   x −  y =  1
```

**Bước 1**: Từ (2), tách `x = y + 1`. (Chọn (2) vì hệ số `x` ở đó là `1`, ít chia.)

**Bước 2**: Thay `x = y + 1` vào (1):

```
2·(y + 1) + 3y = 12
2y + 2 + 3y    = 12
5y             = 10
y              = 2
```

**Bước 3**: Thay ngược `y = 2` vào `x = y + 1`:

```
x = 2 + 1 = 3
```

**Kết luận**: `(x, y) = (3, 2)`.

**Kiểm tra**: `2·3 + 3·2 = 12` ✓, `3 − 2 = 1` ✓.

### Ví dụ 2: hệ có phân số

```
(1)  2x + 5y =  4
(2)  3x − 2y = 25
```

**Bước 1**: Từ (1), tách `2x = 4 − 5y` → `x = (4 − 5y) / 2 = 2 − 2.5y`.

(Vì hệ số `x` trong (1) là `2`, không có hệ số `1`, nên chia ra phải chấp nhận phân số.)

**Bước 2**: Thay vào (2):

```
3·(2 − 2.5y) − 2y = 25
6 − 7.5y − 2y     = 25
−9.5y             = 19
y                 = 19 / (−9.5) = −2
```

**Bước 3**: Thay ngược `y = −2` vào `x = 2 − 2.5·(−2) = 2 + 5 = 7`.

**Kết luận**: `(x, y) = (7, −2)`.

**Kiểm tra**: `2·7 + 5·(−2) = 14 − 10 = 4` ✓; `3·7 − 2·(−2) = 21 + 4 = 25` ✓.

> **Mẹo**: gặp phân số trong bước thế — đừng hoảng. Cứ giữ phân số (`2 − 2.5y`), thay vào tiếp, cuối cùng `y` thường ra số đẹp vì hệ đã được "thiết kế" cho ra nghiệm hữu hạn.

### Ví dụ 3: hệ 3 ẩn

```
(1)   x +  y +  z =  6
(2)  2x −  y +  z =  3
(3)   x + 2y −  z =  2
```

**Bước 1**: Từ (1), tách `z = 6 − x − y`. (Chọn (1) vì hệ số `z` là `1`.)

**Bước 2**: Thay `z = 6 − x − y` vào (2) và (3):

```
(2'):  2x − y + (6 − x − y) = 3
       x − 2y + 6           = 3
       x − 2y               = −3

(3'):  x + 2y − (6 − x − y) = 2
       x + 2y − 6 + x + y   = 2
       2x + 3y − 6          = 2
       2x + 3y              = 8
```

Giờ hệ 2 ẩn:
```
x − 2y = −3
2x + 3y = 8
```

**Bước 3**: Tiếp tục thế. Từ (2'): `x = 2y − 3`. Thay vào (3'):

```
2·(2y − 3) + 3y = 8
4y − 6 + 3y     = 8
7y              = 14
y               = 2
```

**Bước 4**: Thay ngược:
- `x = 2·2 − 3 = 1`.
- `z = 6 − 1 − 2 = 3`.

**Kết luận**: `(x, y, z) = (1, 2, 3)`.

**Kiểm tra**: `1+2+3=6` ✓; `2−2+3=3` ✓; `1+4−3=2` ✓.

> **Quan sát**: phương pháp thế cho 3 ẩn = lặp 2 lần (giảm `z`, rồi giảm `x`). Mỗi lần giảm 1 ẩn → cuối cùng 1 phương trình 1 ẩn. Với `n` ẩn cần `n−1` lần thế. Đây chính là **ý tưởng đằng sau khử Gauss**, chỉ khác là Gauss làm trên bảng số không cần viết chữ.

### Khi nào dùng phương pháp thế?

- Khi có 1 phương trình mà 1 ẩn đã sẵn dạng "đơn giản" (hệ số `1` hoặc `−1`).
- Khi số ẩn nhỏ (2 ẩn rất tiện). Với 3+ ẩn dễ rối → chuyển qua khử Gauss.

> **⚠ Lỗi thường gặp khi dùng phương pháp thế**:
> - **Thế nhầm vào chính phương trình vừa tách**. Sau khi tách `x = y + 1` từ (2), nếu thay lại vào (2) sẽ ra `0 = 0` vô ích. Luôn thế vào **các phương trình còn lại**.
> - **Quên dấu ngoặc khi thế biểu thức nhiều hạng tử**. Vd thế `x = 2 − 3y` vào `5x − y`, viết `5·2 − 3y − y` là sai — phải viết `5·(2 − 3y) − y = 10 − 15y − y`.
> - **Tách biến rồi quên thay ngược**. Tìm được `y = 2` rồi dừng — nhưng phải thay vào để tính `x`.

### 📝 Tóm tắt Mục 4

| Bước | Việc làm |
|---|---|
| 1 | Tách 1 ẩn từ 1 phương trình (chọn hệ số `±1` nếu có để tránh phân số). |
| 2 | Thay biểu thức đó vào các phương trình còn lại → giảm 1 ẩn. |
| 3 | Lặp lại cho đến khi còn 1 ẩn → giải. |
| 4 | Thế ngược lên để tính các ẩn đã tách. |
| 5 | Kiểm tra bằng cách thay nghiệm vào hệ gốc. |

---

## 5. Phương pháp cộng đại số (elimination)

### 5.1 Trực giác

**Ý tưởng cốt lõi**: nếu hai phương trình **có cùng độ "đóng góp"** của một ẩn (cùng hệ số), thì khi **trừ chúng cho nhau**, ẩn đó tự triệt tiêu. Ví dụ:

```
3x + 2y = 13
3x − 5y = −8
```

Cả hai đều có `3x`. Trừ phương trình dưới khỏi phương trình trên: `(3x − 3x) + (2y − (−5y)) = 13 − (−8)` → `7y = 21` → `y = 3`. **Ẩn `x` biến mất** không cần tính.

Còn khi hệ số không bằng nhau? **Nhân** một (hoặc cả hai) phương trình với hằng số sao cho **|hệ số của 1 ẩn trùng nhau**, rồi mới cộng/trừ.

> **💡 Trực giác bằng analogy**: hãy tưởng tượng mỗi phương trình là 1 cái cân. Nhân cả 2 vế của 1 cân với cùng hệ số → cân vẫn cân bằng. Cộng 2 cân vào nhau → tổng vẫn cân bằng. Vậy ta tự do "chế biến" các cân để tạo ra một cân mới mà 1 vật đã bị "trừ sạch" — đó là khử ẩn.

### 5.2 Ví dụ:

```
(1)  2x + 3y = 12
(2)   x −  y =  1
```

**Bước 1**: Để khử `x`, ta nhân (2) với 2:

```
(2')  2x − 2y = 2
```

**Bước 2**: Trừ (2') khỏi (1) (tức `(1) − (2')`):

```
(2x + 3y) − (2x − 2y) = 12 − 2
            5y         = 10
            y          = 2
```

**Bước 3**: Thay `y = 2` vào (2): `x − 2 = 1 → x = 3`.

**Kết luận**: `(x, y) = (3, 2)`.

### Mẹo chọn hệ số nhân

Để khử ẩn `x` có hệ số `a₁` và `a₂` ở 2 phương trình: nhân (1) với `a₂`, nhân (2) với `a₁` → cả hai phương trình đều có hệ số `x` là `a₁·a₂`, rồi trừ. (Hoặc nhân với `-a₁` để cộng cho gọn.)

Phương pháp cộng là **anh em sinh đôi** của khử Gauss: thực chất khử Gauss = lặp lại "phép cộng có hệ số" một cách có hệ thống.

### 5.3 Ví dụ thứ 2 — cần nhân cả 2 phương trình

```
(1)  3x + 4y = 26
(2)  5x − 2y =  4
```

**Mục tiêu**: khử `y`. Hệ số `y` là `4` (ở (1)) và `−2` (ở (2)). Bội chung nhỏ nhất `|4|, |2|` là `4`.

**Bước 1**: nhân (2) với 2 để `|y|` trùng:

```
(1)   3x + 4y = 26
(2')  10x − 4y =  8
```

**Bước 2**: cộng (1) + (2') để khử `y` (dấu ngược nhau nên cộng triệt tiêu):

```
(3x + 4y) + (10x − 4y) = 26 + 8
13x                    = 34
x                      = 34/13
```

Hmm, không đẹp. Nhưng đây vẫn là cơ chế đúng — không phải hệ nào cũng có nghiệm nguyên. Thay vào (1):

```
3·(34/13) + 4y = 26
102/13 + 4y    = 338/13
4y             = 236/13
y              = 59/13
```

**Kiểm tra (2)**: `5·(34/13) − 2·(59/13) = (170 − 118)/13 = 52/13 = 4` ✓.

**Quan sát**: trong thực hành, **chế đề ngược từ nghiệm ra** giúp tránh phân số. Ví dụ muốn nghiệm `(2, 1)`, đặt 2 phương trình tùy ý đi qua điểm này: `3·2 + 4·1 = 10` và `5·2 − 2·1 = 8` → hệ `3x + 4y = 10; 5x − 2y = 8` chắc chắn có nghiệm `(2, 1)`.

### 5.4 Ví dụ thứ 3 — khử ẩn rồi quay vòng

```
(1)  4x + 3y = 25
(2)  2x − 5y = −9
```

**Bước 1** — khử `x`. Nhân (2) với 2: `(2') 4x − 10y = −18`.

**Bước 2** — trừ: `(1) − (2')`:
```
(4x + 3y) − (4x − 10y) = 25 − (−18)
13y                    = 43
```

Sai — kiểm tra lại: `25 − (−18) = 25 + 18 = 43`. Và `3y − (−10y) = 13y`. Đúng.

Vậy `y = 43/13`. Lại không đẹp. Hãy chế đề lại để nghiệm đẹp: muốn `(x, y) = (4, 3)`, đặt:

```
(1)  4x + 3y = 4·4 + 3·3 = 25  ✓ (đúng đề gốc)
(2)  2x − 5y = 2·4 − 5·3 = −7  (không phải −9)
```

Sửa lại đề:

```
(1)  4x + 3y = 25
(2)  2x − 5y = −7
```

Khử `x`: nhân (2) với 2 → `4x − 10y = −14`. Trừ (1) − (2'): `13y = 39 → y = 3`. Thay vào (1): `4x + 9 = 25 → x = 4`.

**Nghiệm**: `(4, 3)`. ✓

> **⚠ Lỗi thường gặp khi dùng phương pháp cộng**:
> - **Quên đổi dấu khi trừ phương trình**. `(3y) − (−10y) = 13y`, không phải `−7y` — phải nhớ dấu trừ "lan vào" cả số hạng.
> - **Nhân nhầm hệ số**: chỉ nhân **một bên** của phương trình. Phải nhân cả 2 vế. Ví dụ nhân (2) với 2 thì cả `2x → 4x` và `−5y → −10y` **và** vế phải `−7 → −14`.
> - **Cộng dấu nhầm**: khi 2 hệ số trái dấu (vd `+4y` và `−4y`), ta **cộng** để triệt; khi cùng dấu (`+4y` và `+4y`), ta **trừ** để triệt. Đừng máy móc "luôn trừ".

### 5.5 📝 Tóm tắt Mục 5

| Bước | Việc làm |
|---|---|
| 1 | Chọn ẩn cần khử (thường chọn ẩn có hệ số nhỏ để nhân ít). |
| 2 | Tìm bội chung nhỏ nhất của 2 hệ số → nhân từng phương trình để có cùng \|hệ số\|. |
| 3 | Cộng (nếu dấu ngược) hoặc trừ (nếu cùng dấu) → ẩn đó triệt tiêu. |
| 4 | Phương trình mới chỉ có 1 ẩn → giải. |
| 5 | Thay vào 1 phương trình gốc → tìm ẩn còn lại. |
| 6 | Kiểm tra cả 2 phương trình gốc. |

---

### 5.6 ❓ Câu hỏi tự nhiên về số phương trình vs số ẩn

Trước khi đi vào khử Gauss, hãy dừng lại trả lời 3 câu hỏi mà người mới luôn hỏi:

### "Sao phải có cùng số phương trình với số ẩn?"

**Không bắt buộc**. Bạn có thể có 5 phương trình 2 ẩn, hoặc 2 phương trình 5 ẩn — vẫn là hệ tuyến tính hợp lệ. Cái "lý tưởng" là **số phương trình độc lập = số ẩn**, vì khi đó hệ thường có **đúng 1 nghiệm**.

- **`m = n` và độc lập**: 1 nghiệm duy nhất. Đây là "hệ vuông đẹp".
- **`m < n` (ít phương trình hơn ẩn)**: thiếu ràng buộc → thường **vô số nghiệm**. Một ẩn "tự do".
- **`m > n` (nhiều phương trình hơn ẩn)**: thừa ràng buộc → thường **vô nghiệm** (các ràng buộc khó cùng thỏa hết).

Trực giác: mỗi phương trình **giới hạn 1 chiều tự do** của không gian nghiệm. 2 ẩn = 2 chiều tự do, cần 2 phương trình độc lập để "khóa" về 1 điểm. Thiếu phương trình → còn chiều tự do (vô số nghiệm). Thừa phương trình → ràng buộc dư có thể không tương thích.

### "Nếu phương trình ít hơn ẩn — luôn vô số nghiệm hay có khi vô nghiệm?"

**Có thể cả hai**. Ví dụ:

- `x + y + z = 6` (1 phương trình, 3 ẩn) → vô số nghiệm. Bộ `(1, 2, 3), (0, 0, 6), (−1, 4, 3), ...` đều thỏa.
- `x + y = 5; 2x + 2y = 11` (2 phương trình, 2 ẩn — nhưng phương trình (2) sau khi chia 2 mâu thuẫn (1)) → vô nghiệm.

Quy tắc: nếu **không có hàng mâu thuẫn** `[0 ... 0 | k≠0]` sau khử → vô số nghiệm. Có hàng đó → vô nghiệm.

### "Khi 3 phương trình 2 ẩn — bao giờ có nghiệm?"

**Chỉ khi cả 3 đường thẳng cùng đi qua đúng 1 điểm chung**. Trường hợp này hiếm — đa số 3 đường thẳng không đồng quy.

Ví dụ có nghiệm:
```
x + y = 5
x − y = 1
2x    = 6
```
Cả 3 đều thỏa `(3, 2)`. Phương trình (3) thực ra là `(1) + (2)`, nên không thêm thông tin (rank vẫn là 2).

Ví dụ vô nghiệm:
```
x + y = 5
x − y = 1
x + y = 6     ← mâu thuẫn (1)
```
Khử Gauss sẽ ra hàng `[0 0 | 1]` → vô nghiệm.

> **💡 Trực giác**: hệ overdetermined (`m > n`) trong thực tế (vd linear regression với hàng nghìn điểm dữ liệu, chỉ vài tham số) **gần như chắc chắn vô nghiệm "chính xác"**. Ta không tìm nghiệm chính xác mà tìm nghiệm **gần đúng nhất** theo nghĩa bình phương tối tiểu — Mục 9 sẽ giải thích.

---

## 6. Khử Gauss (Gaussian elimination)

Đây là phương pháp **tổng quát** giải mọi hệ tuyến tính, làm việc trực tiếp trên bảng số mà không cần viết ẩn `x, y, z, ...`. Là **tiền thân** của mọi thuật toán đại số tuyến tính sau này.

### 6.1 Ma trận mở rộng (augmented matrix)

Cho hệ:

```
2x + 3y = 12
 x −  y =  1
```

Ta viết gọn lại thành **bảng số** (ma trận mở rộng), giữ nguyên thứ tự ẩn, mỗi hàng = 1 phương trình:

```
[ 2   3 | 12 ]
[ 1  −1 |  1 ]
```

Cột bên trái dấu `|` là hệ số các ẩn (ma trận `A`), cột bên phải là vế phải (vector `b`).

### 6.2 Ba phép biến đổi sơ cấp trên hàng (elementary row operations)

Ba phép sau **không làm thay đổi tập nghiệm**:

1. **Đổi chỗ 2 hàng**. (Đổi thứ tự 2 phương trình → tập nghiệm không đổi.)
2. **Nhân 1 hàng với hằng số `k ≠ 0`**. (Nhân cả 2 vế của 1 phương trình với `k` → vẫn tương đương.)
3. **Cộng vào 1 hàng một bội số của hàng khác**. (Thay `Rᵢ ← Rᵢ + k·Rⱼ` — đây là tổ hợp tuyến tính, không mất thông tin.)

> Ký hiệu sẽ dùng: `R₂ ← R₂ − ½·R₁` đọc là "thay hàng 2 bằng hàng 2 trừ một nửa hàng 1".

### 6.3 Mục tiêu: dạng tam giác trên (row echelon form)

Ta muốn dùng 3 phép trên để biến ma trận hệ số `A` thành **dạng tam giác trên** — tức tất cả các phần tử dưới đường chéo chính đều `= 0`:

```
[ * * * | * ]
[ 0 * * | * ]
[ 0 0 * | * ]
```

Khi đó phương trình cuối chỉ còn 1 ẩn → giải được; thế ngược lên phương trình kế cuối có 2 ẩn (1 đã biết) → giải được; v.v. Đây gọi là **back-substitution** (thế ngược).

### 6.4 Ví dụ chi tiết — hệ 2 ẩn

```
[ 2   3 | 12 ]
[ 1  −1 |  1 ]
```

**Bước 1**: Khử phần tử `1` ở vị trí (2,1) — tức làm cho hàng 2 cột 1 thành `0`. Phép: `R₂ ← R₂ − ½·R₁`.

```
hàng 2 cũ:  [ 1   −1   |  1 ]
½ × hàng 1: [ 1  3/2   |  6 ]
hàng 2 mới: [ 0  −5/2  | −5 ]
```

Ma trận:

```
[ 2    3   | 12 ]
[ 0  −5/2  | −5 ]
```

**Bước 2** — back-substitution: phương trình hàng 2 là `−5/2 · y = −5` → `y = 2`. Phương trình hàng 1 là `2x + 3y = 12` → `2x + 6 = 12` → `x = 3`.

**Kết luận**: `(3, 2)`. Trùng với 2 phương pháp trên.

### 6.5 Ví dụ chi tiết — hệ 3 ẩn

Đây là phần khó nhất bài. Đọc thật chậm, mỗi bước hiểu rõ "ta đang làm gì và vì sao".

**Hệ cần giải**:

```
 x +  y +  z =  6
2x −  y + 3z = 14
3x + 2y −  z =  4
```

**Ma trận mở rộng** — viết gọn 3 phương trình thành bảng số. Mỗi hàng = 1 phương trình; cột bên trái dấu `|` là hệ số (theo thứ tự `x, y, z`), cột bên phải là vế phải.

```
[ 1   1   1 |  6 ]   R₁  ← phương trình (1)
[ 2  −1   3 | 14 ]   R₂  ← phương trình (2)
[ 3   2  −1 |  4 ]   R₃  ← phương trình (3)
```

**Mục tiêu của khử Gauss**: biến ma trận này về **tam giác trên** (mọi số dưới đường chéo chính = 0):

```
[ ●   *   * | * ]      ← * là số gì cũng được; ● là pivot
[ 0   ●   * | * ]
[ 0   0   ● | * ]
```

Khi đạt được, hàng cuối chỉ còn 1 ẩn (`z`) — giải xong; thay lên hàng giữa có 1 ẩn chưa biết (`y`); thay lên hàng đầu có 1 ẩn chưa biết (`x`). Đây là **back-substitution**.

---

**Bước 1 — khử cột 1 ở R₂**.

Mục tiêu: làm cho ô `(R₂, cột 1)` = 0. Hiện tại ô đó là `2`. Pivot trên đỉnh là `1` (ô `(R₁, cột 1)`).

**Hỏi**: nhân R₁ với hệ số nào, trừ vào R₂ để ô đó thành 0?
- Cần `2 − k·1 = 0` → `k = 2`. Vậy: `R₂ ← R₂ − 2·R₁`.

**Tính từng cột**:
```
R₂ cũ:       [  2,  −1,   3 |  14 ]
2·R₁:        [  2,   2,   2 |  12 ]
R₂ − 2·R₁:   [  0,  −3,   1 |   2 ]
```

Diễn dịch ngôn ngữ thường: "trừ 2 lần hàng 1 ra khỏi hàng 2 để khử cột 1 ở hàng 2". Số 2 (hệ số nhân) chính là **tỉ số** giữa hệ số cột 1 ở R₂ (`= 2`) và pivot ở R₁ (`= 1`).

---

**Bước 2 — khử cột 1 ở R₃**.

Tương tự: ô `(R₃, cột 1)` = 3, pivot = 1, hệ số nhân = 3. Phép: `R₃ ← R₃ − 3·R₁`.

```
R₃ cũ:       [  3,   2,  −1 |   4 ]
3·R₁:        [  3,   3,   3 |  18 ]
R₃ − 3·R₁:   [  0,  −1,  −4 | −14 ]
```

Sau bước 1 và 2, ma trận thành:

```
[ 1   1   1 |   6 ]   R₁
[ 0  −3   1 |   2 ]   R₂ mới
[ 0  −1  −4 | −14 ]   R₃ mới
```

Cột 1 đã sạch (chỉ còn pivot ở R₁). Giờ chuyển sang cột 2.

---

**Bước 3 — khử cột 2 ở R₃**.

Mục tiêu: ô `(R₃, cột 2)` = 0. Hiện tại ô đó là `−1`. Pivot mới là R₂, cột 2 = `−3`.

**Hỏi**: nhân R₂ với hệ số nào, trừ vào R₃ để ô đó thành 0?
- Cần `−1 − k·(−3) = 0` → `−1 + 3k = 0` → `k = 1/3`. Vậy: `R₃ ← R₃ − (1/3)·R₂`.

(Cách khác cho dễ nhớ: hệ số nhân = `(hệ số cần khử) / (pivot)` = `−1 / −3 = 1/3`.)

```
R₃ cũ:       [  0,  −1,  −4   | −14   ]
(1/3)·R₂:    [  0,  −1,  1/3  |  2/3  ]
R₃ − ⅓·R₂:   [  0,   0,  −4 − 1/3 | −14 − 2/3 ]
            = [  0,   0,  −13/3   | −44/3      ]
```

Tại sao phân số? Pivot `−3` không chia chẵn cho `−1` → tỉ số là `1/3`. Đây là chuyện bình thường — cứ giữ phân số, không làm tròn.

Ma trận cuối cùng (dạng tam giác trên):

```
[ 1   1     1    |   6   ]
[ 0  −3     1    |   2   ]
[ 0   0   −13/3  | −44/3 ]
```

---

**Bước 4 — back-substitution** (thế ngược từ dưới lên).

Hàng 3 đọc thành phương trình:
```
−13/3 · z = −44/3
z = (−44/3) / (−13/3) = 44/13
```

Hàng 2 đọc thành phương trình:
```
−3y + 1·z = 2
−3y + 44/13 = 2
−3y = 2 − 44/13 = 26/13 − 44/13 = −18/13
y = 6/13
```

Hàng 1 đọc thành phương trình:
```
x + y + z = 6
x + 6/13 + 44/13 = 6
x = 78/13 − 50/13 = 28/13
```

**Nghiệm**: `(x, y, z) = (28/13, 6/13, 44/13) ≈ (2.154, 0.462, 3.385)`.

**Kiểm tra** với phương trình gốc:
- (1) `28/13 + 6/13 + 44/13 = 78/13 = 6` ✓
- (2) `2·28/13 − 6/13 + 3·44/13 = (56 − 6 + 132)/13 = 182/13 = 14` ✓
- (3) `3·28/13 + 2·6/13 − 44/13 = (84 + 12 − 44)/13 = 52/13 = 4` ✓

---

> **💡 Trực giác về quy trình**: ta đi **từ trái sang phải, từ trên xuống dưới**, mỗi bước "dập tắt" 1 ô dưới đường chéo. Tổng cộng cần dập `n(n−1)/2` ô (với hệ 3 ẩn = 3 ô: (R₂,c1), (R₃,c1), (R₃,c2) — khớp với 3 bước trên). Mỗi ô = 1 phép `Rᵢ ← Rᵢ − k·Rⱼ`. Hết.

> **🔁 Dừng lại tự kiểm tra**: nếu ai đó hỏi "trong bước 3, tại sao chọn `R₂` (không phải `R₁`) để khử cột 2 ở `R₃`?" — vì **R₁ có cột 1 ≠ 0**, nếu dùng R₁ để khử R₃ ở cột 2 thì sẽ "phá" cột 1 (vốn đã được dập về 0 ở R₃). Quy tắc: **mỗi cột chỉ dùng pivot riêng của nó**, và pivot ở R₂ là cho cột 2, ở R₃ là cho cột 3, v.v.

> **Ghi chú về nghiệm phân số**: hệ ở trên do user soạn ra để minh họa khử Gauss "trên hệ tổng quát" — nghiệm phân số là chuyện thường. Nếu muốn nghiệm đẹp `(1, 2, 3)`, có thể đổi vế phải (2) thành `9` (vì `2·1 − 2 + 3·3 = 9`), khi đó toàn bộ khử Gauss vẫn theo các bước y hệt — chỉ vế phải cuối ra `−13` thay vì `−44/3`, và `z = 3, y = 2, x = 1`. Bài tập 3 ở Mục 10 giữ đề gốc `= 14` để bạn luyện cả tính phân số.

### 6.6 Pivoting — vì sao cần và làm thế nào

#### 6.6.1 Tại sao pivot = 0 thì kẹt?

Quy trình khử Gauss ở Mục 6.5 đều giả định ô pivot (`R₁[1], R₂[2], R₃[3]`, ...) **khác 0**. Vì hệ số nhân là `(hệ số cần khử) / (pivot)` — nếu pivot = 0, ta chia cho 0, dừng máy.

**Ví dụ kẹt**:
```
[ 0   1 | 2 ]
[ 1   0 | 3 ]
```

Ô `(R₁, cột 1)` = 0. Không thể dùng R₁ để khử cột 1 ở R₂. **Bị kẹt ngay bước đầu**.

**Cứu**: đổi chỗ R₁ và R₂.

```
[ 1   0 | 3 ]
[ 0   1 | 2 ]
```

Ngay lập tức đã ở dạng tam giác trên → đọc nghiệm: `x = 3, y = 2`. Xong.

> Hệ trên rất tầm thường, nhưng minh họa nguyên tắc: **khi pivot = 0, swap hàng**. Đây gọi là **partial pivoting**.

#### 6.6.2 Pivot gần 0 cũng nguy hiểm (sai số số học)

Trong tính toán bằng máy (`float64`), khi pivot rất nhỏ (vd `10⁻¹⁵`), chia cho nó tạo ra hệ số nhân khổng lồ (`10¹⁵`) — bất kỳ sai số làm tròn nhỏ nào trong các phép tính sau cũng bị **khuếch đại lên gấp 10¹⁵ lần**. Kết quả cuối có thể sai hoàn toàn.

**Ví dụ kinh điển** (William Kahan):
```
[ 10⁻²⁰   1 | 1 ]
[   1     1 | 2 ]
```

Nghiệm chính xác: `(x, y) ≈ (1, 1)`. Nhưng nếu **không pivot**, dùng `10⁻²⁰` làm pivot ở (R₁, cột 1):
- Hệ số nhân: `1 / 10⁻²⁰ = 10²⁰`.
- `R₂ ← R₂ − 10²⁰ · R₁`: cột 2 thành `1 − 10²⁰`. Với `float64`, kết quả lưu là `−10²⁰` (vì `1` quá bé so với `10²⁰`, bị làm tròn).
- Tiếp tục: ra `y ≈ 1`, nhưng `x` tính từ R₁: `10⁻²⁰ · x + 1·1 = 1 → 10⁻²⁰ · x = 0 → x = 0`. Sai (đúng là `x ≈ 1`).

Nếu **swap** R₁ và R₂ trước (vì `|1| > |10⁻²⁰|`):
```
[   1     1 | 2 ]
[ 10⁻²⁰   1 | 1 ]
```
Pivot bây giờ là `1`. Hệ số nhân: `10⁻²⁰ / 1 = 10⁻²⁰` (nhỏ, an toàn). Không có khuếch đại sai số. Tính ra `(1, 1)` đúng.

#### 6.6.3 Partial pivoting — luật vàng

**Trước khi khử ở cột `i`**, làm thêm 1 bước:
1. Trong cột `i`, xét các ô từ hàng `i` xuống cuối (tức `M[i][i], M[i+1][i], ..., M[n−1][i]`).
2. **Tìm hàng `j` có `|M[j][i]|` lớn nhất**.
3. Swap hàng `i` với hàng `j`.
4. Sau đó mới làm khử như bình thường.

Tác dụng: pivot luôn có **trị tuyệt đối lớn nhất có thể** → hệ số nhân luôn `≤ 1` → không có khuếch đại sai số.

**Ví dụ partial pivoting**:
```
[ 1  2  3 |  6 ]    cột 1: max(|1|, |4|, |2|) = 4 ở R₂ → swap R₁ ↔ R₂
[ 4  5  6 | 15 ]    
[ 2  1  1 |  4 ]    
```

Sau swap:
```
[ 4  5  6 | 15 ]    R₁ (mới)
[ 1  2  3 |  6 ]    
[ 2  1  1 |  4 ]    
```

Giờ pivot = 4, khử cột 1 ở R₂ và R₃ với hệ số nhân `1/4` và `2/4 = 1/2` — đều ≤ 1, an toàn.

`solutions.go` của bài học cài đặt **đúng pattern này** — luôn swap để chọn pivot lớn nhất trước khi khử.

#### 6.6.4 Khi nào pivot = 0 ở MỌI hàng (không cứu được bằng swap)?

Nếu trong cột `i`, tất cả `M[j][i] = 0` với `j ≥ i` — không hàng nào có pivot. Trường hợp này: cột `i` "trống" → ẩn thứ `i` là **biến tự do** (free variable). Bỏ qua cột này, chuyển sang cột `i+1`.

Đây là dấu hiệu **hệ có vô số nghiệm** (hoặc vô nghiệm — xem Mục 7).

#### 6.6.5 ⚠ Lỗi thường gặp về pivoting

- **Chia cho 0 khi pivot trong khử Gauss**: code naive (không pivoting) sẽ panic hoặc trả NaN. Luôn thêm bước check `|pivot| > eps`.
- **Quên swap cột vế phải `b`**: khi swap hàng `i` ↔ `j`, phải swap **toàn bộ hàng** trong ma trận mở rộng (kể cả cột `b`). Quên cột `b` → đáp số sai.
- **Pivoting toàn phần (full pivoting)**: cao cấp hơn — swap cả hàng và cột để chọn `|max|` trong cả ma trận con. Ổn định hơn nhưng phải nhớ thứ tự cột đã đổi để "đặt lại" ẩn cuối cùng. Trong bài này chỉ dùng partial pivoting (đủ tốt cho 99% trường hợp).

---

## 7. Các trường hợp đặc biệt sau khử Gauss

Sau khi đưa ma trận về dạng tam giác trên (hoặc xa hơn — dạng bậc thang), ta đọc nghiệm dựa vào các hàng cuối.

### (a) Hàng `[0 0 ... 0 | 0]` → vô số nghiệm

Hàng này tương đương phương trình `0 = 0` — luôn đúng, không cho thêm thông tin. Số phương trình "thật" (số hàng khác `0`) ít hơn số ẩn → có **biến tự do** → vô số nghiệm.

**Walk-through cụ thể** với hệ:
```
 x +  y = 3
2x + 2y = 6
```

Phương trình (2) chính là phương trình (1) **nhân 2** → cùng thông tin. Khử Gauss:

```
[ 1  1 | 3 ]      Ma trận đầu
[ 2  2 | 6 ]
```

Phép: `R₂ ← R₂ − 2·R₁`:
```
R₂ cũ:     [ 2,  2 | 6 ]
2·R₁:      [ 2,  2 | 6 ]
R₂ − 2·R₁: [ 0,  0 | 0 ]   ← hàng zero!
```

```
[ 1  1 | 3 ]
[ 0  0 | 0 ]      ← phương trình "0 = 0", luôn đúng
```

Chỉ còn 1 phương trình thực sự: `x + y = 3` với 2 ẩn → 1 biến tự do.

**Tham số hóa nghiệm**: đặt `y = t` (tham số tùy ý) → `x = 3 − t`. Tập nghiệm:
```
{ (3 − t, t) : t ∈ ℝ }
```

Vài nghiệm cụ thể: `t = 0 → (3, 0)`, `t = 1 → (2, 1)`, `t = 1.5 → (1.5, 1.5)`, `t = −5 → (8, −5)`. **Vô số**.

Ví dụ ngắn hơn:

```
[ 1   2  | 4 ]
[ 0   0  | 0 ]
```

Phương trình duy nhất là `x + 2y = 4`. Đặt `y = t` (tham số) → `x = 4 − 2t`. Mọi `(4 − 2t, t)` đều là nghiệm.

### (b) Hàng `[0 0 ... 0 | k]` với `k ≠ 0` → vô nghiệm

Hàng này tương đương `0 = k ≠ 0` — **mâu thuẫn**. Hệ không có nghiệm nào cả.

**Walk-through cụ thể** với hệ:
```
 x +  y = 3
2x + 2y = 7
```

Phương trình (1) nói "tổng = 3"; phương trình (2) — sau khi chia 2 — nói "cùng tổng đó = 3.5". Mâu thuẫn. Khử Gauss:

```
[ 1  1 | 3 ]
[ 2  2 | 7 ]
```

Phép `R₂ ← R₂ − 2·R₁`:
```
R₂ cũ:     [ 2,  2 | 7 ]
2·R₁:      [ 2,  2 | 6 ]
R₂ − 2·R₁: [ 0,  0 | 1 ]   ← hàng mâu thuẫn!
```

```
[ 1  1 | 3 ]
[ 0  0 | 1 ]      ← phương trình "0 = 1", luôn sai
```

Hàng 2 đọc thành `0·x + 0·y = 1`, tức `0 = 1` — vô lý. **Hệ vô nghiệm**.

Ví dụ ngắn hơn:

```
[ 1   2  | 4 ]
[ 0   0  | 3 ]
```

Hàng 2 nói `0·x + 0·y = 3`, vô lý.

### (c) Số biến > số phương trình (`n > m`) — **underdetermined**

Thường có **vô số nghiệm** (số biến tự do = `n − rank`). Trong ML, đây là tình huống "có quá nhiều tham số" → cần thêm điều kiện (regularization) để chọn 1 nghiệm.

### (d) Số biến < số phương trình (`n < m`) — **overdetermined**

Thường **vô nghiệm**. Hiếm khi tồn tại điểm chung của quá nhiều ràng buộc. Trong ML, **linear regression với nhiều điểm dữ liệu hơn tham số chính là overdetermined** — ta không tìm nghiệm "chính xác" mà tìm nghiệm **bình phương tối tiểu** (least squares). Xem Mục 9.

### Tóm tắt sơ đồ phân loại

```
Sau khử Gauss → ma trận bậc thang
├── Có hàng [0...0 | k≠0]?  → VÔ NGHIỆM
└── Không có:
    ├── rank = n (số ẩn)?    → 1 NGHIỆM DUY NHẤT
    └── rank < n?            → VÔ SỐ NGHIỆM (n − rank biến tự do)
```

`rank` = số hàng khác `0` sau khử = số phương trình "độc lập tuyến tính". Sẽ học định nghĩa chặt ở Tầng 4.

---

## 8. Định thức và công thức Cramer (giới thiệu)

> **Mục này chỉ giới thiệu trực giác** — Tầng 4 Linear Algebra sẽ học kỹ định thức cho ma trận `n×n` và liên hệ với thể tích.

### 8.1 Định thức 2×2

Với hệ:

```
ax + by = e
cx + dy = f
```

**Định thức** của ma trận hệ số `A = [[a, b], [c, d]]` là:

```
D = det(A) = ad − bc
```

Số `D` quyết định "tính khả nghịch" của hệ:

- `D ≠ 0` → hệ có **nghiệm duy nhất**.
- `D = 0` → hệ **vô nghiệm hoặc vô số nghiệm** (phải kiểm tra thêm).

### 8.2 Công thức Cramer

Khi `D ≠ 0`:

```
       | e  b |              | a  e |
       | f  d |              | c  f |
  x = ────────── ,       y = ──────────
           D                      D
```

tức là:

```
x = (e·d − b·f) / D
y = (a·f − e·c) / D
```

**Ví dụ**: với `2x + 3y = 12; x − y = 1`:

- `D = 2·(−1) − 3·1 = −5`.
- `D_x = 12·(−1) − 3·1 = −15` → `x = −15 / −5 = 3`.
- `D_y = 2·1 − 12·1 = −10` → `y = −10 / −5 = 2`.

`(3, 2)`. Khớp.

**Walk-through Cramer 2×2 chi tiết** với hệ khác để luyện kỹ:

Cho hệ:
```
2x + 3y = 8
4x −  y = 2
```

**Bước 1**: tính định thức chính `D` (định thức của ma trận hệ số `A`):
```
D = | 2   3 | = 2·(−1) − 3·4 = −2 − 12 = −14
    | 4  −1 |
```

**Bước 2**: tính `D_x` (định thức khi **thay cột x bằng vế phải**):
```
D_x = | 8   3 | = 8·(−1) − 3·2 = −8 − 6 = −14
      | 2  −1 |
```

**Bước 3**: tính `D_y` (định thức khi **thay cột y bằng vế phải**):
```
D_y = | 2  8 | = 2·2 − 8·4 = 4 − 32 = −28
      | 4  2 |
```

**Bước 4**: áp dụng công thức Cramer:
```
x = D_x / D = −14 / −14 = 1
y = D_y / D = −28 / −14 = 2
```

**Nghiệm**: `(x, y) = (1, 2)`.

**Kiểm tra**: `2·1 + 3·2 = 8` ✓; `4·1 − 2 = 2` ✓.

> **💡 Trực giác**: định thức `D_x` = "lấy ma trận `A`, thay cột tương ứng với ẩn `x` bằng vế phải `b`, rồi tính định thức". Tương tự cho `D_y, D_z`. Quy luật này gọi là **Cramer's rule** — tổng quát cho `n×n`.

### 8.3 Khi nào dùng Cramer?

- **Hệ rất nhỏ** (2×2 hoặc 3×3) khi cần công thức closed-form. Đặc biệt hữu ích khi cần đạo hàm theo tham số (vd trong vật lý/kinh tế lượng).
- **Phân tích lý thuyết**: dễ nhìn ra điều kiện có nghiệm.
- **Không dùng cho hệ lớn**: Cramer cho `n×n` cần tính `n+1` định thức. Nếu mỗi định thức tính bằng định nghĩa khai triển Laplace thì độ phức tạp là `O(n!)` — với `n = 10`, đã là `~3.6 triệu` phép toán; với `n = 20`, là `~2.4 · 10¹⁸` (không khả thi). **Khử Gauss `O(n³)`** nhanh hơn rất nhiều.

**So sánh số phép toán** (xấp xỉ):

| `n` | Khử Gauss `O(n³)` | Cramer `O(n·n!)` |
|---|---|---|
| 3 | ~27 | ~18 |
| 5 | ~125 | ~600 |
| 10 | ~1000 | ~36 triệu |
| 20 | ~8000 | ~5 · 10¹⁹ (impossible) |

> **Tóm lại**: Cramer **đẹp về mặt công thức** (ai cũng nhớ được công thức 2×2), nhưng **không dùng trong production** cho hệ lớn. Mọi thư viện khoa học (NumPy, BLAS, LAPACK) đều dùng khử Gauss (hoặc LU decomposition, biến tướng tinh tế hơn) chứ không bao giờ dùng Cramer cho hệ lớn.

---

## 9. Liên hệ với ML và các tầng sau

### 9.1 `Ax = b` — bài toán trung tâm của Tầng 4

Hệ phương trình tuyến tính chính là phương trình ma trận `Ax = b`. Tầng 4 sẽ học:

- Khi nào tồn tại nghiệm (rank của `A`, rank của `[A | b]`).
- Cách tính `A⁻¹` (ma trận nghịch đảo) — nếu tồn tại thì `x = A⁻¹b`.
- **LU decomposition**: phân tích `A = L·U` với `L` tam giác dưới, `U` tam giác trên. **Đây chính là khử Gauss được "lưu lại"** — sau khi phân tích xong, giải `Ax = b` chỉ cần 2 lần thế ngược, nhanh hơn nhiều khi cần giải lặp với nhiều vector `b`.
- **QR decomposition, SVD** — các biến tướng dùng cho overdetermined, ổn định số học hơn.

### 9.2 Linear regression — hệ phương trình tuyến tính khổng lồ

Cho `m` điểm dữ liệu `(xᵢ, yᵢ)`, ta tìm đường thẳng `y = w₁·x + w₀` khớp tốt nhất theo bình phương tối tiểu. Tổng quát hơn với `n` feature: tìm vector trọng số `w = (w₁, ..., wₙ)ᵀ` sao cho `Xw ≈ y`, trong đó:

- `X` là ma trận **`m × n`**: `m` hàng = `m` mẫu dữ liệu, `n` cột = `n` feature.
- `y` là vector **`m × 1`**: nhãn (giá trị thực) tương ứng từng mẫu.
- `w` là vector **`n × 1`** ta đang đi tìm.

**Hàm mất mát (loss)** mean squared error:
```
L(w) = ||Xw − y||² / m = (1/m) · Σᵢ (Xᵢ·w − yᵢ)²
```

Đây là tổng bình phương sai số trên `m` mẫu, chia trung bình.

**Đạo hàm theo `w`** (sẽ học chi tiết ở Tầng 3 Calculus):
```
∂L/∂w = (2/m) · Xᵀ(Xw − y)
```

**Cực tiểu**: đặt đạo hàm = 0 (vector 0):
```
Xᵀ(Xw − y) = 0
Xᵀ Xw − Xᵀ y = 0
Xᵀ X · w = Xᵀ y
```

Đây là phương trình nổi tiếng **Normal Equation**:

```
(XᵀX) · w = Xᵀ y
```

— một **hệ phương trình tuyến tính** với `n` ẩn (các trọng số `w₁, ..., wₙ`)! Ma trận hệ số là `XᵀX` (kích thước `n × n`), vế phải là `Xᵀy` (vector `n × 1`). Đặt:
- `A = XᵀX` (ma trận `n × n`)
- `b = Xᵀy` (vector `n × 1`)

→ bài toán linear regression trở thành **giải `Aw = b`**. Đây chính xác là dạng quen thuộc trong Mục 1.

**Giải bằng khử Gauss với partial pivoting** → ra `w` tối ưu. Đây gọi là **closed-form solution** của linear regression — nghiệm "đóng", không cần lặp.

#### Walk-through số cụ thể

Cho 3 điểm dữ liệu: `(1, 2), (2, 3), (3, 5)` — ta tìm đường `y = w₁·x + w₀` khớp tốt nhất.

Đặt feature đầu là bias (cột 1's), feature thứ hai là `x`:
```
X = [ 1   1 ]    y = [ 2 ]
    [ 1   2 ]        [ 3 ]
    [ 1   3 ]        [ 5 ]
```

Tính `XᵀX`:
```
XᵀX = [ 1 1 1 ]·[ 1 1 ] = [  3   6  ]
      [ 1 2 3 ] [ 1 2 ]   [  6  14  ]
                [ 1 3 ]
```

Tính `Xᵀy`:
```
Xᵀy = [ 1 1 1 ]·[ 2 ] = [ 10 ]
      [ 1 2 3 ] [ 3 ]   [ 23 ]
                [ 5 ]
```

Hệ cần giải:
```
[  3   6 | 10 ]
[  6  14 | 23 ]
```

Khử Gauss: `R₂ ← R₂ − 2·R₁` → `[0, 2 | 3]`. Back-sub: `w₁ = 3/2 = 1.5`. Thay vào: `3w₀ + 6·1.5 = 10 → w₀ = 1/3 ≈ 0.333`.

**Đường khớp**: `y ≈ 0.333 + 1.5·x`. Kiểm tra: tại `x=1, y_pred = 1.833` (thực 2); `x=2, y_pred = 3.333` (thực 3); `x=3, y_pred = 4.833` (thực 5) — gần đúng theo nghĩa bình phương tối tiểu.

> **Quan sát chính**: linear regression closed-form **=** giải một hệ phương trình tuyến tính. Tất cả những gì ta học trong Lesson này (khử Gauss, pivoting, định thức) được dùng trực tiếp khi train một mô hình ML cơ bản.

### 9.3 Khi nào không giải trực tiếp?

Khi `n` rất lớn (vd `n = 10⁶` cho neural network với hàng triệu tham số), `XᵀX` là ma trận `10⁶ × 10⁶`:
- **Bộ nhớ**: cần `10¹²` ô × 8 byte = **8 TB RAM** chỉ để lưu — không khả thi.
- **Tính toán**: khử Gauss `O(n³) = 10¹⁸` phép toán — với máy hiện đại 10¹⁰ phép/giây, mất **~3000 năm**.

Lúc đó ta dùng **gradient descent**:
```
w ← w − η · ∇L(w)
```
Mỗi bước chỉ cần tính `∇L = (2/m)·Xᵀ(Xw − y)` — chỉ là phép nhân ma trận với vector, `O(mn)` thay vì `O(n³)`. Không cần lưu `XᵀX`. Lặp vài chục/trăm bước → hội tụ về `w` tối ưu (gần đúng).

**Tóm tắt khi nào dùng gì**:

| `n` (số feature) | Phương pháp |
|---|---|
| < 10⁴ | Closed-form (khử Gauss / LU) — chính xác, nhanh |
| 10⁴ – 10⁶ | Gradient descent / Stochastic GD — đủ chính xác, vừa RAM |
| > 10⁶ | Mini-batch SGD, Adam — bắt buộc |

> **Sẽ học ở Tầng 3 (Calculus)** — đạo hàm và gradient descent.
> **Sẽ học ở Tầng 6 (Machine Learning)** — linear regression chi tiết, regularization, evaluation.

> **Tóm tắt liên hệ**:
> - Hệ tuyến tính nhỏ-vừa → khử Gauss / LU.
> - Hệ tuyến tính khổng lồ → iterative methods (conjugate gradient), hoặc gradient descent cho bài toán tối ưu tổng quát.
> - Nhưng **mọi đường** đều bắt đầu từ việc hiểu khử Gauss ở bài này.

---

## 10. Bài tập

### Bài 1 — Phương pháp thế

Giải hệ sau bằng phương pháp thế:

```
3x + 2y = 13
 x −  y =  1
```

### Bài 2 — Phương pháp cộng đại số

Giải hệ sau bằng phương pháp cộng:

```
5x + 3y =  7
2x − 4y = 12
```

### Bài 3 — Khử Gauss step-by-step

Giải hệ 3 ẩn sau bằng khử Gauss, ghi rõ từng bước biến đổi sơ cấp:

```
 x +  y +  z =  6
2x −  y + 3z = 14
3x + 2y −  z =  4
```

### Bài 4 — Phân tích trường hợp đặc biệt

Mỗi hệ sau có bao nhiêu nghiệm? Phân loại và giải thích bằng đồ thị 2 đường thẳng.

**Hệ A**:
```
2x + 3y =  6
4x + 6y = 12
```

**Hệ B**:
```
2x + 3y =  6
4x + 6y = 10
```

### Bài 5 — Word problem

Một cửa hàng bán cà phê với 2 size. Khách A mua 2 size nhỏ + 3 size lớn hết **130k**. Khách B mua 4 size nhỏ + 1 size lớn hết **110k**. Hỏi giá mỗi size?

### Bài 6 — Code Go

Viết hàm:

```go
func solveLinearSystem(A [][]float64, b []float64) ([]float64, string)
```

giải hệ `Ax = b` bằng khử Gauss với **partial pivoting**. Trả về:
- `(nghiệm, "unique")` nếu hệ có nghiệm duy nhất.
- `(nil, "none")` nếu vô nghiệm.
- `(một_nghiệm, "infinite")` nếu vô số nghiệm (trả về 1 nghiệm partial cũng được).

Test với hệ ở Bài 3.

---

## 11. Lời giải chi tiết

### Lời giải Bài 1

Hệ:
```
(1)  3x + 2y = 13
(2)   x −  y =  1
```

Từ (2), tách: `x = y + 1`.

Thay vào (1):
```
3(y + 1) + 2y = 13
3y + 3 + 2y   = 13
5y            = 10
y             = 2
```

Suy ra `x = 2 + 1 = 3`.

**Kiểm tra**: `3·3 + 2·2 = 9 + 4 = 13` ✓, `3 − 2 = 1` ✓.

**Nghiệm**: `(x, y) = (3, 2)`.

### Lời giải Bài 2

Hệ:
```
(1)  5x + 3y =  7
(2)  2x − 4y = 12
```

Chọn khử `x`. Bội chung của `|5|` và `|2|` là `10`. Nhân (1) với 2, nhân (2) với 5:

```
(1')  10x +  6y = 14
(2')  10x − 20y = 60
```

`(1') − (2')`: `26y = −46 → y = −46/26 = −23/13`.

Hmm — phân số xấu. Kiểm tra lại đề. Đề: `5x + 3y = 7; 2x − 4y = 12`. Có lẽ ta dùng phương pháp cộng đúng nhưng nghiệm vốn dĩ là phân số. Tính tiếp:

`y = −23/13`. Từ (1): `5x = 7 − 3y = 7 − 3·(−23/13) = 7 + 69/13 = 91/13 + 69/13 = 160/13`. Vậy `x = 32/13`.

**Kiểm tra**: `2·(32/13) − 4·(−23/13) = 64/13 + 92/13 = 156/13 = 12` ✓.

**Nghiệm**: `(x, y) = (32/13, −23/13)`.

> **Bài học**: hệ "đẹp" không phải lúc nào cũng có nghiệm nguyên. Đây là lý do trong code ta dùng `float64` thay vì `int`.

### Lời giải Bài 3

Ma trận mở rộng:

```
[ 1   1   1 |  6 ]   R₁
[ 2  −1   3 | 14 ]   R₂
[ 3   2  −1 |  4 ]   R₃
```

**Bước 1** — khử cột 1:

- `R₂ ← R₂ − 2R₁`: `[0, −3, 1 | 2]`.
- `R₃ ← R₃ − 3R₁`: `[0, −1, −4 | −14]`.

```
[ 1   1   1 |   6 ]
[ 0  −3   1 |   2 ]
[ 0  −1  −4 | −14 ]
```

**Bước 2** — khử cột 2 ở R₃ bằng pivot `−3` ở (2,2). Hệ số: `R₃ ← R₃ − (−1/−3)R₂ = R₃ − ⅓R₂`.

- `⅓·R₂ = [0, −1, 1/3 | 2/3]`
- `R₃ − ⅓·R₂ = [0, 0, −4 − 1/3 | −14 − 2/3] = [0, 0, −13/3 | −44/3]`.

```
[ 1   1     1   |    6  ]
[ 0  −3     1   |    2  ]
[ 0   0  −13/3  | −44/3 ]
```

**Bước 3** — back-substitution:

- `−13/3 · z = −44/3 → z = (−44/3) · (−3/13) = 44/13`.
- `−3y + z = 2 → −3y = 2 − 44/13 = 26/13 − 44/13 = −18/13 → y = 6/13`.
- `x + y + z = 6 → x = 6 − 6/13 − 44/13 = 78/13 − 50/13 = 28/13`.

**Nghiệm**: `(x, y, z) = (28/13, 6/13, 44/13) ≈ (2.154, 0.462, 3.385)`.

**Kiểm tra**:
- `28/13 + 6/13 + 44/13 = 78/13 = 6` ✓
- `2·28/13 − 6/13 + 3·44/13 = (56 − 6 + 132)/13 = 182/13 = 14` ✓
- `3·28/13 + 2·6/13 − 44/13 = (84 + 12 − 44)/13 = 52/13 = 4` ✓

> **Ghi chú**: nếu muốn hệ có nghiệm nguyên đẹp `(1, 2, 3)`, đổi vế phải (2) thành `9` (xem Mục 6.5). Bài này giữ đề `14` để bạn thực hành phân số.

### Lời giải Bài 4

**Hệ A**:
```
2x + 3y =  6
4x + 6y = 12
```

Tỉ số: `2/4 = 3/6 = 6/12 = 1/2`. Cả 3 tỉ số bằng nhau → **2 đường trùng nhau** → **vô số nghiệm**.

Khử Gauss xác nhận: `R₂ ← R₂ − 2R₁` cho `[0, 0 | 0]` (hàng zero).

Tham số hóa: đặt `y = t`, suy ra `x = (6 − 3t)/2 = 3 − 1.5t`. Mọi `(3 − 1.5t, t)` đều là nghiệm.

**Đồ thị**: đường `2x + 3y = 6` đi qua `(3, 0)` và `(0, 2)`. Đường `4x + 6y = 12` cũng đi qua đúng 2 điểm này — **trùng khít**.

**Hệ B**:
```
2x + 3y =  6
4x + 6y = 10
```

Tỉ số vế trái: `2/4 = 3/6 = 1/2`. Tỉ số vế phải: `6/10 = 3/5`. **Khác nhau** → 2 đường **song song không trùng** → **vô nghiệm**.

Khử Gauss xác nhận: `R₂ ← R₂ − 2R₁` cho `[0, 0 | −2]` — hàng mâu thuẫn `0 = −2`.

**Đồ thị**: đường thứ nhất qua `(3, 0), (0, 2)`. Đường thứ hai `4x + 6y = 10` qua `(2.5, 0), (0, 5/3)`. Cùng hệ số góc `−2/3`, nằm song song, không trùng.

### Lời giải Bài 5

Gọi giá size nhỏ là `s`, size lớn là `l` (đơn vị: nghìn đồng).

```
2s + 3l = 130   (khách A)
4s +  l = 110   (khách B)
```

Cộng đại số: nhân (1) với 1, giữ. Nhân (2) với 3: `12s + 3l = 330`. Trừ (1) khỏi (2'):

`(12s + 3l) − (2s + 3l) = 330 − 130`
`10s = 200`
`s = 20`.

Thay vào (2): `4·20 + l = 110 → l = 30`.

**Kiểm tra**: `2·20 + 3·30 = 40 + 90 = 130` ✓, `4·20 + 30 = 110` ✓.

**Đáp án**: size nhỏ **20k**, size lớn **30k**.

### Lời giải Bài 6

Xem file [`solutions.go`](./solutions.go) — hàm `solveLinearSystem` cài đặt khử Gauss với partial pivoting, kèm `main()` chạy demo với hệ Bài 3.

**Ý tưởng thuật toán**:

1. Ghép `A` và `b` thành ma trận mở rộng `M` kích thước `n × (n+1)`.
2. Với mỗi cột `i` từ `0` đến `n−1`:
   - **Pivot**: tìm hàng `j ≥ i` có `|M[j][i]|` lớn nhất; swap với hàng `i`.
   - Nếu `|M[i][i]| < eps`: cột này không có pivot → kiểm tra phần vế phải để phân biệt vô nghiệm / vô số nghiệm.
   - Nếu có pivot: với mỗi hàng `k > i`, làm `M[k] ← M[k] − (M[k][i]/M[i][i]) · M[i]`.
3. Back-substitution từ hàng cuối lên: `x[i] = (M[i][n] − Σⱼ>ᵢ M[i][j]·x[j]) / M[i][i]`.

**Độ phức tạp**: `O(n³)` cho phần khử + `O(n²)` cho back-sub. Tổng `O(n³)`.

---

## 12. Tóm tắt và liên kết

- Hệ tuyến tính = nhiều phương trình bậc 1 với nhiều ẩn, phải đồng thời đúng.
- 3 trường hợp nghiệm: **1 / vô số / không** — đặc trưng của tuyến tính.
- 3 phương pháp giải: **thế** (gọn cho 2 ẩn), **cộng** (linh hoạt), **khử Gauss** (tổng quát, nền tảng cho mọi thuật toán đại số tuyến tính).
- Khử Gauss = áp dụng có hệ thống 3 phép biến đổi hàng → ma trận tam giác trên → back-substitution.
- Định thức 2×2 và Cramer = công cụ nhanh cho hệ nhỏ; sẽ học sâu ở Tầng 4.
- Linear regression closed-form là hệ tuyến tính `XᵀX · w = Xᵀy` — khử Gauss giải được khi `n` vừa phải.

### File trong lesson

- [solutions.go](./solutions.go) — code Go cho khử Gauss + Cramer + lời giải bài tập.
- [visualization.html](./visualization.html) — viz tương tác: 2-ẩn solver, Gauss stepper, special cases.

### Bài học liên quan

- **Bài trước**: [Lesson 07 — Hàm mũ và hàm log](../lesson-07-exp-log-functions/)
- **Tầng tiếp theo**: Tầng 2 — Trigonometry (góc, sin/cos, tích vô hướng — hình học của không gian).
- **Học tiếp về hệ tuyến tính**: Tầng 4 — Linear Algebra (ma trận, vector space, eigenvalue, SVD).
