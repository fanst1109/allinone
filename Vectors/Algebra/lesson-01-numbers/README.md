# Lesson 01 — Số và trục số

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Phân biệt được năm tập số quen thuộc — ℕ (tự nhiên), ℤ (nguyên), ℚ (hữu tỉ), ℝ (thực), và ℝ\ℚ (vô tỉ) — biết tập nào nằm trong tập nào và khi nào dùng tập nào.
- Biết biểu diễn một số trên **trục số**, đọc thứ tự (`<`, `>`, `=`, `≤`, `≥`), số đối, số nghịch đảo.
- Hiểu **giá trị tuyệt đối** `|x|` theo nghĩa hình học (khoảng cách tới 0), không chỉ "bỏ dấu trừ".
- Biết vì sao `√2`, `π`, `e` là vô tỉ, và cảm nhận được "vô tỉ" nghĩa là gì (không viết được dưới dạng phân số `p/q`).
- Hiểu vì sao trong máy tính `0.1 + 0.2 != 0.3`, và hệ quả của điều này khi làm ML/AI (mọi tính toán đều có sai số).
- Liên hệ được "số thực" với các tầng sau: vector là một danh sách các số thực, embedding là điểm trong không gian ℝⁿ.

## Kiến thức tiền đề

Không có. Bạn chỉ cần biết cộng, trừ, nhân, chia ở mức tiểu học. Nếu đã quen với một ngôn ngữ lập trình (đặc biệt là Go) thì phần "máy tính và số thực" sẽ dễ vào hơn.

## 1. Các loại số — ℕ, ℤ, ℚ, ℝ

Toán học "phân loại" các số theo cách bạn xây dựng nó: bắt đầu từ những số đơn giản nhất (đếm), rồi mỗi lần gặp một phép tính cho kết quả "không thuộc tập hiện tại", ta phải **mở rộng** tập đó. Năm tập dưới đây chính là 5 lần mở rộng liên tiếp.

### 1.1. ℕ — số tự nhiên (natural numbers)

```
ℕ = {0, 1, 2, 3, 4, 5, 6, ...}
```

Số ta dùng để **đếm**: `0 con mèo`, `3 quả táo`, `42 dòng code`. Một số sách định nghĩa ℕ bắt đầu từ `1`, một số bắt đầu từ `0` — trong tài liệu này dùng quy ước **bao gồm 0** (giống Go: chỉ số mảng bắt đầu từ 0).

ℕ **đóng** dưới phép cộng và nhân: cộng hai số tự nhiên ra số tự nhiên, nhân cũng vậy. Nhưng phép trừ có thể "thoát" khỏi ℕ: `3 − 5 = −2` không thuộc ℕ. Để chứa được trừ, ta cần mở rộng.

### 1.2. ℤ — số nguyên (integers)

```
ℤ = {..., -3, -2, -1, 0, 1, 2, 3, ...}
```

Thêm các số âm. Ký hiệu `ℤ` đến từ tiếng Đức *Zahlen* ("các con số"). Bây giờ trừ đã đóng: `3 − 5 = −2 ∈ ℤ`. Nhưng phép chia chưa: `3 ÷ 2 = 1.5` không thuộc ℤ.

### 1.3. ℚ — số hữu tỉ (rational numbers)

```
ℚ = { p/q : p ∈ ℤ, q ∈ ℤ, q ≠ 0 }
```

Đọc: "tập tất cả các phân số `p/q` mà tử là số nguyên, mẫu là số nguyên khác 0". Chữ "Q" đến từ *Quotient* (thương).

Ví dụ thuộc ℚ:

- `3/4 = 0.75`
- `−7/2 = −3.5`
- `5 = 5/1` (mọi số nguyên đều là hữu tỉ, viết với mẫu 1)
- `0.333... = 1/3` (số thập phân **vô hạn tuần hoàn** cũng là hữu tỉ)
- `0.142857142857... = 1/7`

**Đặc trưng quyết định**: một số là hữu tỉ ⇔ phần thập phân của nó **dừng** hoặc **tuần hoàn**. Ví dụ `0.5` (dừng), `0.333...` (tuần hoàn "3"), `0.1428571428...` (tuần hoàn "142857"). Bất kỳ số nào có phần thập phân tuần hoàn đều có thể viết thành `p/q` (sẽ thấy ở bài tập 3).

ℚ đóng dưới cộng, trừ, nhân, chia (trừ chia cho 0). Vậy là đã đủ chưa? Chưa.

### 1.4. ℝ\ℚ — số vô tỉ (irrational numbers)

Khi người Hy Lạp cổ chứng minh `√2` không viết được dưới dạng phân số, họ phát hiện ra **một loại số mới**, không nằm trong ℚ. Đó là **số vô tỉ**. Ba ví dụ thường gặp:

- `√2 ≈ 1.41421356237...` — đường chéo của hình vuông cạnh 1.
- `π ≈ 3.14159265358...` — chu vi chia đường kính của mọi hình tròn.
- `e ≈ 2.71828182845...` — cơ số logarit tự nhiên, xuất hiện trong tăng trưởng, xác suất, entropy.

Đặc trưng: phần thập phân **vô hạn và KHÔNG tuần hoàn**. Bạn không bao giờ tìm thấy một "đoạn lặp lại" trong `π` cho dù xem bao nhiêu chữ số. (Sẽ chứng minh ở §4 vì sao `√2` vô tỉ.)

### 1.5. ℝ — số thực (real numbers)

```
ℝ = ℚ ∪ (ℝ\ℚ)     // hợp của hữu tỉ và vô tỉ
```

Tập tất cả các điểm trên trục số — không có lỗ hổng nào. ℝ là "không gian sống" mà mọi vector trong ML/AI đứng trong đó: một vector embedding 768 chiều là một điểm trong ℝ⁷⁶⁸.

### 1.6. Quan hệ bao hàm

```
ℕ ⊂ ℤ ⊂ ℚ ⊂ ℝ
```

Đọc: ℕ là tập con thực sự của ℤ, ℤ là tập con thực sự của ℚ, và ℚ là tập con thực sự của ℝ. Mỗi mũi tên là một lần mở rộng. Vô tỉ `ℝ\ℚ` nằm trong ℝ nhưng không nằm trong ℚ.

Sơ đồ Venn (vẽ bằng ASCII):

```
   +---------------------------------------------+
   |  ℝ  (số thực)                               |
   |                                             |
   |   +-------------------+    +-------------+  |
   |   |  ℚ  (hữu tỉ)      |    |  ℝ\ℚ        |  |
   |   |                   |    |  (vô tỉ)    |  |
   |   |  +-------------+  |    |             |  |
   |   |  |  ℤ          |  |    |   √2, π, e  |  |
   |   |  |             |  |    |             |  |
   |   |  |  +-------+  |  |    |             |  |
   |   |  |  |  ℕ    |  |  |    |             |  |
   |   |  |  | 0,1,2 |  |  |    |             |  |
   |   |  |  +-------+  |  |    +-------------+  |
   |   |  |  -1, -2     |  |                     |
   |   |  +-------------+  |                     |
   |   |  1/2, -3/4, 0.333.|                     |
   |   +-------------------+                     |
   +---------------------------------------------+
```

Bảng so sánh nhanh:

| Tập | Ký hiệu | Ví dụ thuộc | Ví dụ KHÔNG thuộc |
|-----|---------|-------------|-------------------|
| Tự nhiên | ℕ | 0, 1, 2, 42, 1000 | −3, 0.5, √2 |
| Nguyên | ℤ | −5, 0, 42 | 0.5, 1/3, π |
| Hữu tỉ | ℚ | −5, 0.5, 1/3, 0.333..., 22/7 | √2, π, e |
| Vô tỉ | ℝ\ℚ | √2, π, e, √3 + 1 | 0, 0.5, 22/7 |
| Thực | ℝ | tất cả ví dụ phía trên | số phức `i = √(−1)` |

**Câu hỏi tự nhiên ở đây**: *"22/7 có phải là π không?"* Không. `22/7 = 3.142857142857...` (tuần hoàn) là một số **hữu tỉ** xấp xỉ π. Bản thân `π` thì vô tỉ. Tương tự `1.414` không phải `√2`; nó chỉ là 4 chữ số đầu.

## 2. Trục số (number line)

### 2.1. Biểu diễn

Trục số là một đường thẳng nằm ngang, có chiều dương (sang phải), gốc là `0`, và mỗi điểm tương ứng với **đúng một số thực** (và ngược lại).

```
       -3   -2   -1    0    1    2    3
   ────┼────┼────┼────┼────┼────┼────┼────►
                      ↑              ↑
                     gốc           x = 2
```

Số nhỏ nằm bên trái, số lớn nằm bên phải. Đây là cách trực quan nhất để hình dung *thứ tự*.

### 2.2. Thứ tự — `<`, `>`, `=`, `≤`, `≥`

| Ký hiệu | Đọc | Ví dụ |
|---------|-----|-------|
| `a < b` | a nhỏ hơn b | `−3 < 1`, `1.414 < √2` |
| `a > b` | a lớn hơn b | `5 > 2`, `π > 3` |
| `a = b` | a bằng b | `1/2 = 0.5` |
| `a ≤ b` | a nhỏ hơn hoặc bằng b | `x ≤ 5` (cho phép x = 5) |
| `a ≥ b` | a lớn hơn hoặc bằng b | `x ≥ 0` (số không âm) |

Mẹo: ký hiệu `<` luôn "miệng há về phía số lớn". `3 < 5`: miệng há về 5.

### 2.3. Số đối (additive inverse)

**Số đối** của `a` là số `−a` — số mà cộng với `a` ra `0`.

```
a + (−a) = 0
```

Trên trục số, `a` và `−a` đối xứng qua gốc 0. Ví dụ số đối của `3` là `−3`; số đối của `−2.5` là `2.5`. Số đối của `0` là chính nó.

### 2.4. Số nghịch đảo (multiplicative inverse)

**Số nghịch đảo** của `a` (với `a ≠ 0`) là `1/a` — số mà nhân với `a` ra `1`.

```
a × (1/a) = 1
```

Ví dụ: nghịch đảo của `2` là `0.5`; nghịch đảo của `−3` là `−1/3 ≈ −0.333...`. **Số 0 không có nghịch đảo** — đó là lý do chia cho 0 vô nghĩa.

Phân biệt: *đối* dùng với phép cộng, *nghịch đảo* dùng với phép nhân. Đừng nhầm `−3` (đối của 3) với `1/3` (nghịch đảo của 3).

## 3. Giá trị tuyệt đối `|x|`

### 3.1. Định nghĩa hình học (cách nên nhớ)

`|x|` = **khoảng cách từ x tới 0 trên trục số**. Vì khoảng cách luôn không âm, `|x| ≥ 0` luôn đúng.

```
        |−3|=3              |2|=2
       ←─────────────│─────────────►
       -3    -2   -1   0    1    2
```

Cả `−3` và `3` cách `0` đúng 3 đơn vị, nên `|−3| = |3| = 3`.

### 3.2. Định nghĩa hình thức

```
       ⎧  x   nếu x ≥ 0
|x| = ⎨
       ⎩ −x   nếu x < 0
```

Đọc bằng tiếng Việt: "nếu x không âm thì lấy luôn x; nếu x âm thì lấy `−x` để biến thành dương".

→ Đây là lý do nhiều người gọi `|x|` là "bỏ dấu trừ" — đúng, nhưng định nghĩa hình học (khoảng cách) tổng quát và đẹp hơn, vì nó mở rộng được sang vector: `|v|` của vector cũng là "khoảng cách tới gốc".

### 3.3. Khoảng cách giữa hai số

```
khoảng cách(a, b) = |a − b| = |b − a|
```

Ví dụ khoảng cách giữa `3` và `7`: `|3 − 7| = |−4| = 4`. Cũng bằng `|7 − 3| = 4` — đối xứng.

### 3.4. Tính tay 5 ví dụ

| Biểu thức | Bước tính | Kết quả |
|-----------|-----------|---------|
| `|−7|` | −7 < 0 → lấy −(−7) | `7` |
| `|3|` | 3 ≥ 0 → lấy chính nó | `3` |
| `|0|` | 0 ≥ 0 → lấy chính nó | `0` |
| `|3 − 8|` | `3 − 8 = −5`, sau đó `|−5|` | `5` |
| `|−2 + 5|` | `−2 + 5 = 3`, sau đó `|3|` | `3` |

**Lưu ý quan trọng**: tính bên trong dấu `| |` trước, rồi mới lấy giá trị tuyệt đối. `|3 − 8|` không phải `|3| − |8| = 3 − 8 = −5`. Phép `|·|` không phân phối qua phép trừ.

### 3.5. Tính chất (cần thuộc)

- `|x| ≥ 0` luôn, và `|x| = 0` ⇔ `x = 0`.
- `|−x| = |x|`.
- `|xy| = |x| · |y|`.
- `|x + y| ≤ |x| + |y|` — **bất đẳng thức tam giác** (sẽ xuất hiện lại khi học vector).

## 4. Số vô tỉ — vì sao `√2` không phải hữu tỉ?

Khẳng định: **không tồn tại hai số nguyên `p, q` (`q ≠ 0`) sao cho `√2 = p/q`** (giả sử phân số đã tối giản).

Chứng minh bằng **phản chứng** (proof by contradiction). Lập luận: giả sử điều ngược lại là đúng, dẫn đến mâu thuẫn → giả thiết sai → điều ban đầu đúng.

**Bước 1.** Giả sử ngược lại: `√2 = p/q` với `p, q` nguyên, `q ≠ 0`, và phân số `p/q` **đã tối giản** (tức là `gcd(p, q) = 1`, không có ước chung > 1).

**Bước 2.** Bình phương hai vế:

```
2 = p² / q²
2q² = p²        // (*)
```

**Bước 3.** Vế trái `2q²` chia hết cho 2, nên `p²` chia hết cho 2. Mà nếu `p²` chẵn thì `p` cũng chẵn (vì nếu `p` lẻ thì `p²` lẻ). Vậy `p = 2k` cho một số nguyên `k` nào đó.

**Bước 4.** Thay `p = 2k` vào (*):

```
2q² = (2k)² = 4k²
q² = 2k²
```

Suy ra `q²` chẵn, do đó `q` cũng chẵn.

**Bước 5.** Vậy cả `p` và `q` đều chẵn — chia hết cho 2. Mâu thuẫn với giả thiết "phân số đã tối giản" (`gcd(p, q) = 1`).

**Kết luận**: giả sử ban đầu sai → `√2` không thể viết dưới dạng `p/q`. □

Cách chứng minh tương tự áp dụng được cho `√3`, `√5`, `√p` với mọi số nguyên tố `p` (sẽ làm `√3` ở bài tập 4).

**Còn π và e thì sao?** Chứng minh `π` và `e` vô tỉ khó hơn nhiều (`e` được Euler chứng minh năm 1737, `π` được Lambert chứng minh năm 1761). Ở trình độ này, chỉ cần nhớ kết quả: cả hai đều vô tỉ và là số **siêu việt** (transcendental) — không phải nghiệm của bất kỳ đa thức hệ số nguyên nào.

### 4.1. "Vô tỉ" nghĩa là gì trực quan?

Theo nghĩa đen: *không có tỉ lệ* (no ratio). Tiếng Anh *irrational* cũng vậy — "ir-" (không) + "rational" (có ratio, tức tỉ lệ). **Vô tỉ = không viết được dưới dạng tỉ số `p/q`**.

Hệ quả thực tế:

- Phần thập phân **vô hạn và không tuần hoàn** (nếu tuần hoàn thì sẽ ra phân số).
- Mọi xấp xỉ thập phân hữu hạn của số vô tỉ đều là số **hữu tỉ khác**, không phải nó. `3.14159` không phải `π`; `1.41421` không phải `√2`.

## 5. Máy tính và số thực — vì sao `0.1 + 0.2 != 0.3`?

Đây là phần cầu nối tới ML/AI. Mọi mạng neural đều cộng-nhân các số thực; nếu bạn không hiểu sai số float, bạn sẽ debug được rất ít vấn đề "vì sao loss không hội tụ".

### 5.1. Thử trong Go

```go
package main

import "fmt"

func main() {
    a := 0.1
    b := 0.2
    c := a + b
    fmt.Println(c)            // 0.30000000000000004
    fmt.Println(c == 0.3)     // false  ← sốc lần đầu nhìn
}
```

Kết quả: `0.30000000000000004`, **không phải** `0.3`. Mọi ngôn ngữ dùng IEEE 754 (Go, Python, JavaScript, C++, Java, ...) đều cho cùng kết quả này. Đây không phải lỗi Go.

### 5.2. Vì sao? — IEEE 754 và nhị phân

Máy tính lưu `float64` (`double`) dưới dạng nhị phân: 1 bit dấu + 11 bit mũ + 52 bit phần định trị (mantissa), tổng 64 bit. Mọi số đều phải biểu diễn được dưới dạng:

```
giá trị = (−1)^dấu × mantissa × 2^mũ
```

Với mantissa là một số nhị phân hữu hạn 52 bit. Vậy số `0.1` ở dạng nhị phân là gì?

Trong hệ 10, `0.1 = 1/10`. Trong hệ 2:

```
0.1₁₀ = 0.00011001100110011001100...₂   ← lặp "0011" vô hạn
```

Giống như `1/3 = 0.333...` trong hệ 10 lặp "3" vô hạn — `1/10` trong hệ 2 lặp "0011" vô hạn. Vì máy chỉ có 52 bit mantissa nên phải **cắt** sau 52 bit. Số được lưu thực ra là:

```
0.1000000000000000055511151231257827021181583404541015625
```

(đúng 0.1 chỉ đến chữ số thứ 17 sau dấu thập phân, rồi lệch). Tương tự `0.2`. Khi cộng hai số đã lệch, kết quả lệch lên chữ số thứ 17 → ra `0.30000000000000004`.

### 5.3. Cộng xấp xỉ — `almostEqual`

Hệ quả: **không bao giờ so sánh trực tiếp hai số float bằng `==`**. Thay vào đó, so sánh "đủ gần".

```go
func almostEqual(a, b, eps float64) bool {
    // Lấy giá trị tuyệt đối hiệu, so với epsilon
    diff := a - b
    if diff < 0 {
        diff = -diff
    }
    return diff < eps
}

// Dùng:
almostEqual(0.1+0.2, 0.3, 1e-9)   // true
```

`eps` thường chọn `1e-9` cho `float64` thông thường. Cẩn thận hơn (relative epsilon) thì chia cho `max(|a|, |b|)`, nhưng `1e-9` đủ dùng cho phần lớn trường hợp ML.

### 5.4. Câu hỏi tự nhiên

**Q: Số nào trong float là chính xác?**

Bất kỳ số nào viết được dưới dạng `m × 2^e` với `m, e` nguyên và `m` vừa trong 52 bit. Ví dụ `0.5 = 2⁻¹`, `0.25 = 2⁻²`, `0.125 = 2⁻³` đều chính xác. Cộng/trừ/nhân chúng vẫn chính xác. Nhưng `0.1, 0.2, 0.3` đều không.

**Q: Sai số có tích lũy không?**

Có. Nếu cộng `0.1` mười lần:

```go
s := 0.0
for i := 0; i < 10; i++ { s += 0.1 }
fmt.Println(s)        // 0.9999999999999999, không phải 1.0
```

Trong huấn luyện neural network, hàng tỷ phép cộng/nhân tích lũy sai số là chuyện thường. Đây là lý do người ta dùng kỹ thuật như **Kahan summation**, **mixed precision** (fp16 + fp32), **gradient clipping**.

**Q: Có cách nào tính `0.1 + 0.2 = 0.3` chính xác không?**

Có — dùng số thập phân (decimal) hoặc phân số (rational/big-rational). Go có `math/big`: `big.Float`, `big.Rat`. Nhưng chậm hơn nhiều, chỉ dùng khi cần (vd tiền tệ — không bao giờ lưu tiền bằng float).

**Q: Có liên quan gì đến ML?**

Rất nhiều. Loss function của bạn được tính bằng float, gradient được tính bằng float, weight được cập nhật bằng float. Khi loss "không hội tụ" hoặc "NaN", thường là do sai số float (vd `log(0)`, `0/0`, overflow). Hiểu được điều này giúp bạn debug nhanh hơn 10 lần.

## 6. Liên hệ với các tầng sau

Bài này có vẻ "tủn mủn" — sao lại học những thứ tiểu học khi mục tiêu là ML/AI? Vì tất cả tầng sau xây trên nó:

- **Vector arithmetic** (Tầng 4): vector là tuple `(x₁, x₂, ..., xₙ)` với `xᵢ ∈ ℝ`. Cộng vector = cộng từng thành phần. Để hiểu, phải hiểu cộng số thực trước.
- **Norm L1** = `||v||₁ = |v₁| + |v₂| + ... + |vₙ|`. Đây chính là giá trị tuyệt đối, áp dụng từng thành phần rồi cộng.
- **Norm L2** = `||v||₂ = √(v₁² + v₂² + ... + vₙ²)`. Có căn — cần biết căn thì vô tỉ.
- **Embedding space**: BERT embedding 768 chiều là một điểm trong ℝ⁷⁶⁸. "Cosine similarity" đo góc giữa hai điểm ở đó.
- **Logarit và cross-entropy loss** (Tầng 1, Lesson 04 + 07): loss = `−log(p)`. Khi `p` rất nhỏ (do float underflow), `log` ra `−∞` → NaN. Cần "log-sum-exp trick".
- **So sánh và thứ tự**: `argmax` chọn chỉ số có giá trị lớn nhất; `top-k` chọn k phần tử lớn nhất. Cả hai đều cần phép `<`/`>` mà ta định nghĩa ở §2.

→ Nếu §1–§5 của bài này là "bê tông móng", thì cả ML/AI là tòa nhà ngồi trên móng đó.

## 7. Bài tập

**Bài 1.** Phân loại các số sau vào ℕ, ℤ, ℚ, ℝ\ℚ (mỗi số ghi đầy đủ các tập mà nó thuộc):

`0`, `−3`, `0.5`, `√2`, `π`, `−1.5`, `22/7`, `0.333...`, `√4`, `−0`

**Bài 2.** Tính:

`|−7|`, `|3|`, `|0|`, `|3 − 8|`, `|−2 + 5|`, `|−4| · |−2|`, `||−5| − |3||`

**Bài 3.** So sánh (đặt `<`, `>`, hoặc `=`):

a) `22/7` vs `π`
b) `0.999...` vs `1`
c) `√2` vs `1.414`
d) `−|−3|` vs `−3`
e) `|−5|` vs `|3 − 8|`

**Bài 4.** Chứng minh `√3` vô tỉ. (Gợi ý: phản chứng tương tự `√2` ở §4. Lưu ý chỗ "p chẵn vì p² chẵn" phải đổi: với mod 3, dùng "nếu p² chia hết cho 3 thì p chia hết cho 3".)

**Bài 5.** Viết hàm Go:

```go
func almostEqual(a, b, eps float64) bool
```

trả về `true` nếu `|a − b| < eps`. Sau đó:

a) Giải thích vì sao **không** dùng `a == b` trực tiếp với `float64`.
b) Cho ví dụ một cặp `(a, b)` mà bằng nhau "về toán" nhưng `a == b` trả về `false`.
c) Cảnh báo: với `eps = 1e-9`, hàm này hoạt động đúng với số "vừa phải" (vd 0.1..1000), nhưng có thể sai với số rất lớn hoặc rất nhỏ. Vì sao?

## Lời giải chi tiết

### Bài 1

Lưu ý ℕ ⊂ ℤ ⊂ ℚ ⊂ ℝ, nên một số thuộc ℕ cũng tự động thuộc ℤ, ℚ, ℝ.

| Số | ℕ | ℤ | ℚ | ℝ\ℚ | Giải thích |
|----|---|---|---|------|------------|
| `0` | ✓ | ✓ | ✓ | | Số tự nhiên (theo quy ước có 0). |
| `−3` | | ✓ | ✓ | | Nguyên âm, không tự nhiên. |
| `0.5` | | | ✓ | | `= 1/2`, hữu tỉ. |
| `√2` | | | | ✓ | Vô tỉ (chứng minh §4). |
| `π` | | | | ✓ | Vô tỉ (cả siêu việt). |
| `−1.5` | | | ✓ | | `= −3/2`, hữu tỉ. |
| `22/7` | | | ✓ | | Phân số, hữu tỉ. **Không phải π**, chỉ xấp xỉ. |
| `0.333...` | | | ✓ | | `= 1/3`, tuần hoàn → hữu tỉ. |
| `√4` | ✓ | ✓ | ✓ | | `√4 = 2`, là số tự nhiên! Mẹo: căn của số chính phương ra số nguyên. |
| `−0` | ✓ | ✓ | ✓ | | `−0 = 0`, là số 0. |

Hai cái bẫy ở bài này: (1) `√4 = 2` thuộc ℕ — phải tính ra trước khi phân loại; (2) `22/7 ≠ π` — `22/7` hữu tỉ, `π` vô tỉ.

### Bài 2

| Biểu thức | Tính | Kết quả |
|-----------|------|---------|
| `|−7|` | `−7 < 0` → `−(−7)` | `7` |
| `|3|` | `3 ≥ 0` | `3` |
| `|0|` | `0 ≥ 0` | `0` |
| `|3 − 8|` | bên trong: `−5`, sau: `|−5|` | `5` |
| `|−2 + 5|` | bên trong: `3`, sau: `|3|` | `3` |
| `|−4| · |−2|` | `4 · 2` | `8` |
| `||−5| − |3||` | `|5 − 3| = |2|` | `2` |

Bẫy ở câu cuối: dấu `| |` lồng nhau. Tính từ trong ra ngoài: `|−5| = 5`, `|3| = 3`, hiệu là `2`, rồi `|2| = 2`.

### Bài 3

a) `22/7 = 3.142857142857...` còn `π = 3.14159265358...`. So sánh chữ số thứ 3 sau dấu phẩy: `8 > 1`, nên `22/7 > π`.

b) `0.999... = 1`. Bằng nhau! Chứng minh ngắn: gọi `x = 0.999...`. Khi đó `10x = 9.999... = 9 + x`, suy ra `9x = 9`, suy ra `x = 1`. Đây là một trong những "sự thật toán học gây sốc" nhưng đúng — `0.999...` (với vô hạn số 9) chính là `1`, chỉ là cách viết khác.

c) `√2 = 1.41421356...`, còn `1.414` đứng yên (không có dấu `...`). `1.414 < √2`. (Lưu ý: `1.4142` < √2 vẫn đúng; chỉ `√2` mới bằng chính nó.)

d) `−|−3| = −3` (vì `|−3| = 3`, dấu trừ ngoài → `−3`). Vế phải cũng `−3`. Bằng nhau: `−|−3| = −3`.

e) `|−5| = 5`, `|3 − 8| = |−5| = 5`. Bằng nhau: `|−5| = |3 − 8|`.

### Bài 4 — `√3` vô tỉ

Giả sử ngược lại: `√3 = p/q` với `p, q` nguyên, `q ≠ 0`, `gcd(p, q) = 1`.

Bình phương: `3 = p²/q²`, nên `3q² = p²`. (*)

Suy ra `p²` chia hết cho 3. Cần bổ đề: *nếu `p²` chia hết cho 3 thì `p` chia hết cho 3*. Chứng minh ngắn: viết `p = 3k + r` với `r ∈ {0, 1, 2}`. Khi đó `p² = 9k² + 6kr + r²`, và `p² mod 3 = r² mod 3`. Lấy ba trường hợp:

- `r = 0`: `r² = 0` → `p² ≡ 0 (mod 3)`
- `r = 1`: `r² = 1` → `p² ≡ 1 (mod 3)`
- `r = 2`: `r² = 4 ≡ 1 (mod 3)` → `p² ≡ 1 (mod 3)`

Vậy `p² ≡ 0 (mod 3)` chỉ khi `r = 0`, tức `p` chia hết cho 3. □ bổ đề.

Quay lại: từ (*) suy ra `p` chia hết cho 3, viết `p = 3k`. Thay vào (*):

```
3q² = 9k²
q² = 3k²
```

Suy ra `q²` chia hết cho 3 → `q` chia hết cho 3. Vậy cả `p` và `q` chia hết cho 3, mâu thuẫn với `gcd(p, q) = 1`. □

(Cách chứng minh y hệt áp dụng được cho `√p` với mọi số nguyên tố `p`.)

### Bài 5

```go
func almostEqual(a, b, eps float64) bool {
    diff := a - b
    if diff < 0 {
        diff = -diff
    }
    return diff < eps
}
```

a) **Vì sao không dùng `a == b`**: vì `float64` lưu số nhị phân, mà `0.1`, `0.2`, `0.3` không có biểu diễn nhị phân hữu hạn. Khi cộng hai số đã lệch, kết quả lệch thêm. `0.1 + 0.2 = 0.30000000000000004`, không bằng `0.3`. Tổng quát: hai số "bằng nhau về toán" có thể bị lưu bằng hai bit pattern khác nhau trong RAM, nên `==` so sánh bit pattern thì trả về `false`.

b) Ví dụ cụ thể:

```go
a := 0.1 + 0.2
b := 0.3
fmt.Println(a == b)         // false
fmt.Println(a)              // 0.30000000000000004
fmt.Println(b)              // 0.3
```

Hoặc:

```go
s := 0.0
for i := 0; i < 10; i++ { s += 0.1 }
fmt.Println(s == 1.0)       // false (s = 0.9999999999999999)
```

c) **Vì sao `eps = 1e-9` có thể sai**: vì `eps` là **sai số tuyệt đối**, không cân nhắc độ lớn của `a, b`.

- Với số rất lớn (vd `a = 1e20`, `b = 1e20 + 100`), hiệu là 100, lớn hơn `1e-9` rất nhiều — hàm trả về `false`. Nhưng `100 / 1e20 = 1e-18`, hai số gần như giống hệt nhau về **tương đối**. Đây là trường hợp "đáng lẽ bằng" nhưng hàm nói "không bằng".
- Với số rất nhỏ (vd `a = 1e-20`, `b = 2e-20`), hiệu là `1e-20`, nhỏ hơn `1e-9` — hàm trả về `true`. Nhưng `b` gấp đôi `a`, rất khác nhau về tương đối. Đây là trường hợp "đáng lẽ không bằng" nhưng hàm nói "bằng".

Cách khắc phục: dùng **relative epsilon** `|a − b| < eps · max(|a|, |b|)`, hoặc kết hợp cả tuyệt đối và tương đối:

```go
func almostEqualBetter(a, b, eps float64) bool {
    diff := math.Abs(a - b)
    if diff < eps { return true }              // tuyệt đối
    largest := math.Max(math.Abs(a), math.Abs(b))
    return diff < eps*largest                  // tương đối
}
```

Code đầy đủ và các test case trong [solutions.go](./solutions.go).

## Tham khảo và bài tiếp theo

- Bài tiếp: [Lesson 02 — Biến và biểu thức](../lesson-02-variables-expressions/) — đại số ký hiệu, đơn giản hóa, khai triển.
- Code: [solutions.go](./solutions.go).
- Minh họa tương tác: [visualization.html](./visualization.html) — trục số click chọn điểm, phân loại số, demo float precision.
- Bài liên quan ở các tầng sau:
  - Tầng 1 Lesson 04 — lũy thừa và logarit (sẽ gặp lại `e`).
  - Tầng 4 — vector arithmetic (cộng số thực theo từng thành phần).
  - DataFoundations [Lesson 01 — Binary & Hex](../../../DataFoundations/lesson-01-binary-hex/) — vì sao máy lưu số dưới dạng bit.
