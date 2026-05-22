# Lesson 04 — Lũy thừa, căn, logarit

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Hiểu **lũy thừa** (`a^n`), **căn** (`√a`, `√[n]{a}`), **logarit** (`log_b(x)`) — định nghĩa và ý nghĩa.
- Vận dụng thành thạo **các quy luật** liên quan: nhân/chia/lũy thừa của lũy thừa, đổi cơ số log.
- Trả lời được câu hỏi *"vì sao log biến phép nhân thành phép cộng?"* — và vì sao điều đó cực kỳ quan trọng trong ML.
- Hiểu vì sao `log` xuất hiện khắp nơi: Big-O của binary search, entropy, cross-entropy loss, log-likelihood.
- Implement được `logSumExp` ổn định số (numerically stable) trong Go — kỹ thuật chuẩn để tránh overflow khi cộng nhiều số mũ.

## Kiến thức tiền đề

- [Lesson 03 — Phương trình bậc 1](../lesson-03-linear-equations/): biết biến đổi đại số, hiểu ký hiệu `x`, `y`, hằng số.
- Phép cộng/trừ/nhân/chia số thực; ý niệm về số dương/âm, số hữu tỉ.
- Khái niệm "phép tính ngược": trừ là ngược của cộng, chia là ngược của nhân — bài này sẽ thêm: **căn** là ngược của lũy thừa, **log** cũng là ngược của lũy thừa (nhưng theo trục khác).

> **Ghi nhớ chính của cả bài**: lũy thừa, căn, log là **ba góc nhìn của cùng một phép biến đổi**.
>
> Cho `b^x = y`:
> - Nếu biết `b` và `x`, hỏi `y` → đó là **lũy thừa**: `y = b^x`.
> - Nếu biết `b` và `y`, hỏi `x` → đó là **logarit**: `x = log_b(y)`.
> - Nếu biết `x` và `y`, hỏi `b` → đó là **căn**: `b = y^(1/x) = √[x]{y}`.
>
> Đừng coi 3 thứ này là 3 chủ đề rời. Chúng là một.

---

## 1. Lũy thừa (power / exponent)

### 1.1. Định nghĩa cơ bản

`a^n` với `n` là số nguyên dương: nhân `a` với chính nó `n` lần.

```
a^n = a · a · a · ... · a   (n lần)
```

- `a` gọi là **cơ số** (base).
- `n` gọi là **số mũ** (exponent).

Ví dụ tính tay:

| Biểu thức | Tính toán | Kết quả |
|-----------|-----------|---------|
| `2^3` | `2 · 2 · 2` | `8` |
| `5^4` | `5 · 5 · 5 · 5 = 25 · 25` | `625` |
| `10^6` | `10 · 10 · 10 · 10 · 10 · 10` | `1 000 000` (1 triệu) |
| `3^5` | `3 · 3 · 3 · 3 · 3 = 9 · 27` | `243` |
| `(−2)^4` | `(−2)(−2)(−2)(−2) = 4 · 4` | `16` (dương vì 4 dấu âm) |
| `(−2)^3` | `(−2)(−2)(−2) = 4 · (−2)` | `−8` (âm vì 3 dấu âm) |

**Quy tắc dấu**: cơ số âm + số mũ chẵn = dương; cơ số âm + số mũ lẻ = âm.

### 1.2. Số mũ đặc biệt: 0 và 1

- `a^1 = a` — hiển nhiên, nhân `a` "1 lần" là chính nó.
- `a^0 = 1` với mọi `a ≠ 0` — đây là **quy ước**, nhưng có lý do chặt chẽ.

**Vì sao `a^0 = 1`?** Xuất phát từ quy luật `a^m / a^n = a^(m−n)` (sẽ chứng minh ở mục 2). Cho `m = n`:

```
a^n / a^n = a^(n−n) = a^0
```

Vế trái rõ ràng bằng `1` (số nào chia cho chính nó cũng bằng 1, miễn khác 0). Nên `a^0 = 1`.

Ví dụ: `5^0 = 1`, `(−7)^0 = 1`, `(0.5)^0 = 1`, `1000^0 = 1`.

Trường hợp `0^0` là **không xác định** (toán học) hoặc **quy ước là 1** (lập trình, tổ hợp) — tùy ngữ cảnh. Trong Go, `math.Pow(0, 0) = 1`.

### 1.3. Số mũ âm

`a^(-n) = 1 / a^n` với `a ≠ 0`.

**Vì sao?** Cũng từ quy luật `a^m / a^n = a^(m−n)`. Lấy `m = 0`, `n` dương:

```
a^0 / a^n = a^(0−n) = a^(−n)
```

Vế trái = `1 / a^n`. Nên `a^(−n) = 1/a^n`.

Ví dụ:

| Biểu thức | Tính | Kết quả |
|-----------|------|---------|
| `2^(-1)` | `1/2^1 = 1/2` | `0.5` |
| `2^(-3)` | `1/2^3 = 1/8` | `0.125` |
| `10^(-2)` | `1/10^2 = 1/100` | `0.01` |
| `5^(-4)` | `1/5^4 = 1/625` | `0.0016` |

### 1.4. Số mũ phân số (căn)

`a^(1/n) = √[n]{a}` (căn bậc `n` của `a`).

Cụ thể:
- `a^(1/2) = √a` (căn bậc 2, thường viết tắt là `√a`).
- `a^(1/3) = √[3]{a}` (căn bậc 3, hay "cube root").

**Vì sao?** Từ quy luật `(a^m)^n = a^(mn)`. Cho `m = 1/n`:

```
(a^(1/n))^n = a^(1/n · n) = a^1 = a
```

Tức là số `a^(1/n)` khi lũy thừa lên `n` sẽ ra `a` — đó chính là định nghĩa căn bậc `n`.

Ví dụ tính:

| Biểu thức | Vì sao | Kết quả |
|-----------|--------|---------|
| `9^(1/2)` | `3 · 3 = 9` | `3` |
| `8^(1/3)` | `2 · 2 · 2 = 8` | `2` |
| `16^(1/4)` | `2^4 = 16` | `2` |
| `32^(1/5)` | `2^5 = 32` | `2` |

Tổng quát: `a^(m/n) = (a^(1/n))^m = √[n]{a^m}`.

Ví dụ `8^(2/3) = (8^(1/3))^2 = 2^2 = 4`. Hoặc `16^(3/4) = (16^(1/4))^3 = 2^3 = 8`. Hoặc `16^0.75 = 16^(3/4) = 8`.

---

## 2. Quy luật lũy thừa (laws of exponents)

Đây là 5 quy luật **phải thuộc**. Mỗi quy luật đều có ví dụ số cụ thể để bạn tự kiểm chứng.

| # | Quy luật | Tên |
|---|----------|-----|
| 1 | `a^m · a^n = a^(m+n)` | Nhân cùng cơ số → cộng số mũ |
| 2 | `a^m / a^n = a^(m−n)` | Chia cùng cơ số → trừ số mũ |
| 3 | `(a^m)^n = a^(m·n)` | Lũy thừa của lũy thừa → nhân số mũ |
| 4 | `(a · b)^n = a^n · b^n` | Lũy thừa của tích → tích các lũy thừa |
| 5 | `(a / b)^n = a^n / b^n` | Lũy thừa của thương → thương các lũy thừa |

### Kiểm chứng từng quy luật bằng số

**Quy luật 1**: `a^m · a^n = a^(m+n)`

```
2^3 · 2^4 = 8 · 16 = 128
2^(3+4) = 2^7 = 128
✓ Bằng nhau.
```

**Trực giác**: `2^3` là 3 thừa số 2, `2^4` là 4 thừa số 2, ghép lại là 7 thừa số 2 = `2^7`.

**Quy luật 2**: `a^m / a^n = a^(m−n)`

```
3^5 / 3^2 = 243 / 9 = 27
3^(5−2) = 3^3 = 27
✓
```

**Trực giác**: `(3·3·3·3·3) / (3·3) = 3·3·3` — triệt tiêu 2 thừa số.

**Quy luật 3**: `(a^m)^n = a^(m·n)`

```
(2^3)^2 = 8^2 = 64
2^(3·2) = 2^6 = 64
✓
```

**Trực giác**: `(2^3)^2 = 2^3 · 2^3` (theo định nghĩa lũy thừa), mà `2^3 · 2^3 = 2^(3+3) = 2^6` theo quy luật 1.

**Quy luật 4**: `(a · b)^n = a^n · b^n`

```
(2 · 3)^4 = 6^4 = 1296
2^4 · 3^4 = 16 · 81 = 1296
✓
```

**Trực giác**: `(2·3)^4 = (2·3)(2·3)(2·3)(2·3)` — đổi vị trí → `(2·2·2·2)(3·3·3·3) = 2^4 · 3^4`.

**Quy luật 5**: `(a / b)^n = a^n / b^n`

```
(6 / 2)^3 = 3^3 = 27
6^3 / 2^3 = 216 / 8 = 27
✓
```

### Cảnh báo: những thứ KHÔNG đúng

Người mới hay nhầm các "quy luật giả" sau:

- `a^m + a^n ≠ a^(m+n)` — **sai**. `2^3 + 2^4 = 8 + 16 = 24`, không phải `2^7 = 128`.
- `(a + b)^n ≠ a^n + b^n` — **sai**. `(2+3)^2 = 25`, không phải `4 + 9 = 13`.
- `a^m · b^n ≠ (a·b)^(m+n)` khi cơ số khác nhau — quy luật 1 chỉ áp dụng khi **cùng cơ số**.

---

## 3. Căn (root)

### 3.1. Định nghĩa

`√a` (căn bậc 2) là số `x ≥ 0` sao cho `x² = a`. Yêu cầu `a ≥ 0` (trong số thực — số âm có căn phức nhưng không thuộc phạm vi bài này).

Tổng quát: `√[n]{a}` (căn bậc `n`) là số `x` sao cho `x^n = a`.

- Với `n` chẵn: cần `a ≥ 0`.
- Với `n` lẻ: `a` có thể âm. Ví dụ `√[3]{−8} = −2`.

Như đã nói ở mục 1.4, đây chỉ là cách viết khác của lũy thừa phân số: `√[n]{a} = a^(1/n)`.

### 3.2. Quy luật căn

Suy ra trực tiếp từ quy luật lũy thừa (vì căn là lũy thừa với mũ `1/n`):

| Quy luật | Ví dụ |
|----------|-------|
| `√(a · b) = √a · √b` | `√36 = √(4·9) = √4 · √9 = 2·3 = 6` ✓ |
| `√(a / b) = √a / √b` | `√(25/16) = √25 / √16 = 5/4` ✓ |
| `√(a^2) = |a|` | `√((-3)^2) = √9 = 3 = |−3|` ✓ |

### 3.3. Cảnh báo phổ biến

**`√(a + b) ≠ √a + √b`** — đây là lỗi sai cực kỳ hay gặp.

Thử số: `√(9 + 16) = √25 = 5`, nhưng `√9 + √16 = 3 + 4 = 7`. **Không bằng nhau.**

Cũng vậy `√(a − b) ≠ √a − √b`. Căn chỉ "phân phối" qua nhân/chia, **không qua cộng/trừ**.

### 3.4. Đơn giản hóa căn

Khi gặp `√72`, ta tách thừa số chính phương:

```
72 = 36 · 2 = 6^2 · 2
√72 = √(6^2 · 2) = √(6^2) · √2 = 6√2
```

Tương tự `√48 = √(16·3) = 4√3`, `√50 = √(25·2) = 5√2`.

---

## 4. Logarit — định nghĩa và trực giác

### 4.1. Trực giác trước

**Câu hỏi gốc**: *"Phải nâng `b` lên lũy thừa bao nhiêu để được `x`?"*

Câu trả lời chính là `log_b(x)`.

Ví dụ rất cụ thể:

| Câu hỏi | Trả lời | Viết bằng log |
|---------|---------|---------------|
| `2` mũ mấy bằng `8`? | `3` (vì `2^3 = 8`) | `log_2(8) = 3` |
| `2` mũ mấy bằng `1024`? | `10` (vì `2^10 = 1024`) | `log_2(1024) = 10` |
| `10` mũ mấy bằng `1000`? | `3` (vì `10^3 = 1000`) | `log_10(1000) = 3` |
| `10` mũ mấy bằng `1 000 000`? | `6` | `log_10(1 000 000) = 6` |
| `5` mũ mấy bằng `25`? | `2` | `log_5(25) = 2` |
| `3` mũ mấy bằng `1`? | `0` (vì `3^0 = 1`) | `log_3(1) = 0` |

**Một câu thần chú để nhớ**: *"log đếm xem cơ số phải lũy thừa bao nhiêu lần."*

### 4.2. Định nghĩa chính thức

```
log_b(x) = y   ⟺   b^y = x
```

Điều kiện:

- `b > 0` và `b ≠ 1` (vì `1^y = 1` mãi mãi, không thể "giải" được).
- `x > 0` (vì `b^y` luôn dương khi `b > 0`).

**Lưu ý quan trọng**: log chỉ định nghĩa cho số **dương**. `log(0)` và `log(số âm)` đều **không xác định** trong số thực.

- `log(0)` → "không tồn tại" (giới hạn là `−∞` khi `x → 0^+`).
- `log(−5)` → "không tồn tại" (trong số phức thì có, nhưng không trong bài này).

### 4.3. Hai giá trị log phải thuộc lòng

- `log_b(1) = 0` với mọi `b` hợp lệ. Vì `b^0 = 1`.
- `log_b(b) = 1` với mọi `b`. Vì `b^1 = b`.

Hai phép kiểm tra này cực kỳ hữu ích để bắt lỗi: nếu bạn tính `log_5(1)` ra khác `0`, chắc chắn sai.

---

## 5. Ba loại log phổ biến

Trong toán học và CS, **chỉ 3 cơ số được dùng thường xuyên**:

### 5.1. `log_10(x)` — log thập phân

Còn ghi tắt là `log(x)` (không có chỉ số). Đặc biệt hữu ích cho:

- Đo *order of magnitude* (bậc độ lớn): nếu `log_10(N) ≈ 6` thì `N` cỡ 1 triệu.
- Đại lượng vật lý: Richter (động đất), decibel (âm thanh), pH (hóa học) đều là log_10.

Bảng phải nhớ:

| `x` | `log_10(x)` |
|-----|-------------|
| `1` | `0` |
| `10` | `1` |
| `100` | `2` |
| `1 000` | `3` |
| `1 000 000` (1 triệu) | `6` |
| `1 000 000 000` (1 tỷ) | `9` |
| `0.1` | `−1` |
| `0.01` | `−2` |
| `0.001` | `−3` |

### 5.2. `log_e(x) = ln(x)` — log tự nhiên

`e ≈ 2.71828...` là **hằng số Euler**, xuất hiện tự nhiên trong giải tích (đạo hàm của `e^x` là chính nó). Khi học calculus, log tự nhiên là log "mặc định" — mọi công thức tích phân/đạo hàm dùng `ln` cho đẹp.

Trong ML/AI, hầu hết các loss function viết bằng `ln` (`cross-entropy`, `log-likelihood` mặc định dùng `ln`). Trong Go: `math.Log(x)` chính là `ln(x)` (đừng nhầm với `log_10`).

Bảng phải nhớ:

| `x` | `ln(x)` |
|-----|---------|
| `1` | `0` |
| `e ≈ 2.71828` | `1` |
| `e² ≈ 7.389` | `2` |
| `e^3 ≈ 20.086` | `3` |
| `1/e ≈ 0.368` | `−1` |

### 5.3. `log_2(x)` — log nhị phân

Trong CS, đây là log phổ biến nhất. Xuất hiện ở:

- **Big-O của binary search**: O(log₂ n).
- **Depth của cây nhị phân cân bằng** chứa `n` nút: ≈ log₂(n).
- **Entropy bit** (thông tin học): `H = −Σ p · log_2(p)`.
- **Số bit cần để biểu diễn `n` giá trị**: `⌈log₂(n)⌉`.

Bảng phải thuộc (vì 2^k là số quen):

| `x` | `log_2(x)` |
|-----|------------|
| `1` | `0` |
| `2` | `1` |
| `4` | `2` |
| `8` | `3` |
| `16` | `4` |
| `32` | `5` |
| `64` | `6` |
| `128` | `7` |
| `256` | `8` |
| `1024` | `10` |
| `1 048 576` (≈ 1 triệu) | `20` |

**Mẹo**: nếu nhớ `2^10 = 1024 ≈ 10^3`, suy ra `log_2(10^3) ≈ 10`, hay `log_2(10) ≈ 3.32`.

---

## 6. Quy luật logarit — phần quan trọng nhất

Đây là phần **làm cho log đáng giá**. Lý do log tồn tại và xuất hiện khắp mọi nơi là vì nó biến **nhân thành cộng**, **chia thành trừ**, **lũy thừa thành nhân**.

### 6.1. Bảng quy luật

| # | Quy luật | Đọc là |
|---|----------|--------|
| 1 | `log_b(x · y) = log_b(x) + log_b(y)` | Log của tích = tổng các log |
| 2 | `log_b(x / y) = log_b(x) − log_b(y)` | Log của thương = hiệu các log |
| 3 | `log_b(x^n) = n · log_b(x)` | Log của lũy thừa = số mũ nhân log |
| 4 | `log_b(x) = log_c(x) / log_c(b)` | Đổi cơ số |

### 6.2. Vì sao quy luật 1 đúng? (chứng minh trực quan)

Đặt `u = log_b(x)` và `v = log_b(y)`. Theo định nghĩa:

```
b^u = x
b^v = y
```

Nhân hai vế:

```
x · y = b^u · b^v = b^(u+v)   (theo quy luật lũy thừa 1)
```

Lấy log_b hai vế:

```
log_b(x · y) = u + v = log_b(x) + log_b(y)
```

→ Quy luật 1 chính là quy luật lũy thừa 1 nhìn ngược lại. Tương tự cho 2 và 3.

### 6.3. Kiểm chứng bằng số cụ thể

**Quy luật 1**: `log_10(100 · 1000) = log_10(100) + log_10(1000)`

```
VT: log_10(100 000) = 5
VP: 2 + 3 = 5
✓
```

**Quy luật 2**: `log_2(32 / 4) = log_2(32) − log_2(4)`

```
VT: log_2(8) = 3
VP: 5 − 2 = 3
✓
```

**Quy luật 3**: `log_10(1000^2) = 2 · log_10(1000)`

```
VT: log_10(1 000 000) = 6
VP: 2 · 3 = 6
✓
```

**Quy luật 4 (đổi cơ số)**: tính `log_2(10)` bằng máy tính chỉ có `ln`:

```
log_2(10) = ln(10) / ln(2) ≈ 2.3026 / 0.6931 ≈ 3.3219
```

Kiểm chứng: `2^3.3219 ≈ 10` (đúng).

### 6.4. Vì sao "biến nhân thành cộng" lại quý?

Đây là lý do log gắn liền với khoa học và kỹ thuật:

- **Trước máy tính**, người ta nhân hai số 5 chữ số bằng cách... tra **bảng log**, **cộng** kết quả, rồi tra ngược về (antilog). Cộng dễ hơn nhân — đó là cả cuộc cách mạng.
- **Trong xác suất** (mục 7), khi nhân nhiều xác suất nhỏ với nhau (`P(A) · P(B) · P(C) · ...`), tích trở nên cực kỳ nhỏ và máy tính tràn số dưới (underflow). Lấy log: chuyển thành cộng các log-xác suất → an toàn.

---

## 7. Vì sao log xuất hiện khắp nơi trong ML/AI và CS?

### 7.1. Log-likelihood — chuyển nhân thành cộng

Trong ML, ta thường nhân nhiều xác suất rất nhỏ:

```
L(θ) = P(x_1 | θ) · P(x_2 | θ) · ... · P(x_N | θ)
```

Nếu `N = 1000` và mỗi `P ≈ 0.01`, thì `L ≈ 10^(-2000)` — số này nhỏ tới mức `float64` không lưu được (underflow xuống `0`).

**Giải pháp**: lấy log:

```
log L = log P(x_1) + log P(x_2) + ... + log P(x_N)
```

Mỗi `log P` là số âm cỡ −5 tới −10, cộng 1000 cái lại ra số cỡ −5000 tới −10000 — `float64` lưu được dễ dàng.

Đây là **lý do** mọi maximum likelihood estimation đều tối ưu **log-likelihood**, không phải likelihood gốc.

### 7.2. Cross-entropy loss — chứa `−log(p)`

Loss function phổ biến nhất cho classification:

```
loss = −(1/N) · Σ_i  log(p_yi)
```

trong đó `p_yi` là xác suất mô hình gán cho nhãn đúng của mẫu `i`.

- Nếu mô hình "rất chắc đúng" (`p ≈ 1`), `−log(p) ≈ 0` → loss nhỏ.
- Nếu mô hình "rất chắc sai" (`p ≈ 0`), `−log(p) → +∞` → loss khổng lồ, phạt nặng.

Hành vi này (phạt nặng khi sai chắc) chính là cái ta muốn — sẽ học kỹ ở Tầng 5.

### 7.3. Log scale plot — nhìn được dải rộng

Một số dữ liệu trải qua nhiều **order of magnitude**:

- Tần suất từ trong ngôn ngữ: "the" xuất hiện 1 tỷ lần, từ hiếm xuất hiện 1 lần. Vẽ linear → "the" ngốn toàn bộ trục, từ hiếm tịt thành điểm.
- Số citation của bài báo: 1 → 100 000.
- Phân phối thu nhập, dân số quốc gia.

Vẽ trên **log scale**: trục y là `log_10(value)` → các giá trị `1, 10, 100, 1000, ...` cách đều nhau. Quan sát được toàn bộ dải.

### 7.4. Big-O với `log` — binary search và cây cân bằng

Trong CS:

- **Binary search** trên mảng đã sort kích thước `n`: O(log₂ n) so sánh. Vì sao `log_2`? Vì mỗi bước cắt đôi mảng — cắt được tối đa `log_2(n)` lần trước khi còn 1 phần tử.
- **Cây BST cân bằng** (AVL, red-black): chiều cao = O(log n).
- **Heap**: insert/extract-min = O(log n).

Khi viết Big-O với `log` mà không ghi cơ số, **cơ số không quan trọng** — vì đổi cơ số chỉ khác hằng số (quy luật 4): `log_2(n) = ln(n) / ln(2)`, hằng số `1/ln(2)` bị nuốt trong O().

### 7.5. Tóm tắt

| Lĩnh vực | Vai trò của log |
|----------|-----------------|
| Probability / Statistics | Log-likelihood, tránh underflow |
| Deep Learning | Cross-entropy loss, log-softmax |
| Information Theory | Entropy `H = −Σ p log p` |
| Data Visualization | Log scale plot |
| Algorithms | Big-O của binary search, cây cân bằng |
| Vật lý / Hóa học | dB, Richter, pH |

---

## 8. Bảng giá trị tính tay phải nhớ

### 8.1. `log_2(x)` cho `x` là lũy thừa của 2

| `x` | `log_2(x)` | Cách nhớ |
|-----|------------|----------|
| `1` | `0` | `2^0 = 1` |
| `2` | `1` | `2^1 = 2` |
| `4` | `2` | `2^2 = 4` |
| `8` | `3` | `2^3 = 8` |
| `16` | `4` | `2^4 = 16` |
| `32` | `5` | `2^5 = 32` |
| `64` | `6` | `2^6 = 64` |
| `128` | `7` | `2^7 = 128` |
| `256` | `8` | `2^8 = 256` (1 byte) |
| `1024` | `10` | `2^10 ≈ 1K` |

### 8.2. `log_10(x)` cho `x` là lũy thừa của 10

| `x` | `log_10(x)` |
|-----|-------------|
| `1` | `0` |
| `10` | `1` |
| `100` | `2` |
| `1 000` (1 nghìn) | `3` |
| `1 000 000` (1 triệu) | `6` |
| `1 000 000 000` (1 tỷ) | `9` |

### 8.3. `ln(x)` cho `x` là lũy thừa của `e`

| `x` | `ln(x)` |
|-----|---------|
| `1` | `0` |
| `e` | `1` |
| `e²` | `2` |
| `e^k` | `k` |

(Vì `e^k → ln(e^k) = k · ln(e) = k · 1 = k`, theo quy luật 3.)

---

## 9. Bài tập

### Bài 1 — Tính lũy thừa, căn, mũ phân số

Tính các biểu thức sau bằng tay (không dùng máy tính):

a) `2^10`

b) `3^4`

c) `5^(−2)`

d) `8^(1/3)`

e) `16^0.75`

### Bài 2 — Đơn giản hóa biểu thức lũy thừa

Rút gọn các biểu thức sau (dùng quy luật mục 2):

a) `(x^3 · x^5) / x^2`

b) `(2x^2)^3`

c) `√(4x^6)`

### Bài 3 — Tính log

Tính giá trị các biểu thức log sau:

a) `log_2(32)`

b) `log_10(0.001)`

c) `log_5(125)`

d) `ln(e^7)`

e) `log_2(1024)`

### Bài 4 — Dùng quy luật log

Tính/biến đổi (dùng quy luật mục 6):

a) `log_10(200) − log_10(2)`

b) `log_2(48) − log_2(3)`

c) Khai triển `log(x² · y³)` thành tổng các log đơn.

### Bài 5 — Code Go: `logSumExp` ổn định số

Viết hàm `logSumExp(xs []float64) float64` tính `log(Σ exp(x_i))` **mà không bị overflow** khi `x_i` lớn.

Trick chuẩn: gọi `M = max(xs)`. Áp dụng đẳng thức:

```
log(Σ exp(x_i)) = M + log(Σ exp(x_i − M))
```

Sau khi trừ `M`, mọi `x_i − M ≤ 0`, nên `exp(x_i − M) ≤ 1` → không bao giờ overflow. Tổng các `exp(...)` nằm trong `(0, n]`.

Yêu cầu:

- Implement `logSumExp(xs []float64) float64` đúng và ổn định số.
- Cũng implement `logSumExpNaive(xs []float64) float64` bằng cách tính trực tiếp `math.Log(Σ math.Exp(x_i))`.
- So sánh kết quả với input `[]float64{1000, 1001, 999}`.

---

## 10. Lời giải chi tiết

### Bài 1

a) `2^10 = 1024`. Cách nhớ: `2^10 ≈ 1K`.

b) `3^4 = 3·3·3·3 = 9·9 = 81`.

c) `5^(−2) = 1/5^2 = 1/25 = 0.04`.

d) `8^(1/3) = √[3]{8} = 2` (vì `2^3 = 8`).

e) `16^0.75 = 16^(3/4) = (16^(1/4))^3 = 2^3 = 8`.

Cách tiếp cận chung cho mũ phân số `a^(m/n)`: tính căn bậc `n` của `a` trước, rồi mũ `m` — số sẽ nhỏ và dễ tính tay.

### Bài 2

a) `(x^3 · x^5) / x^2 = x^(3+5) / x^2 = x^8 / x^2 = x^(8−2) = x^6`.

  Dùng quy luật 1 (nhân cùng cơ số) rồi quy luật 2 (chia cùng cơ số).

b) `(2x^2)^3 = 2^3 · (x^2)^3 = 8 · x^(2·3) = 8x^6`.

  Dùng quy luật 4 (lũy thừa của tích) rồi quy luật 3 (lũy thừa của lũy thừa).

c) `√(4x^6) = √4 · √(x^6) = 2 · x^3 = 2x^3` (giả sử `x ≥ 0`).

  Dùng quy luật `√(ab) = √a · √b` và `√(x^6) = (x^6)^(1/2) = x^3`.

  **Lưu ý**: nếu không giả sử `x ≥ 0`, đáp án đúng là `2|x^3| = 2|x|^3`.

### Bài 3

a) `log_2(32) = 5` vì `2^5 = 32`.

b) `log_10(0.001) = log_10(10^(−3)) = −3`. (Dùng định nghĩa: hỏi 10 mũ mấy bằng 0.001, đáp `−3`.)

c) `log_5(125) = 3` vì `125 = 5^3`.

d) `ln(e^7) = 7` (dùng quy luật 3: `ln(e^7) = 7 · ln(e) = 7 · 1 = 7`).

e) `log_2(1024) = 10` vì `1024 = 2^10`.

### Bài 4

a) `log_10(200) − log_10(2)`

  Dùng quy luật 2 (ngược lại): `log_10(200) − log_10(2) = log_10(200/2) = log_10(100) = 2`.

  → Đáp số: **2**.

b) `log_2(48) − log_2(3)`

  `= log_2(48/3) = log_2(16) = 4`.

  → Đáp số: **4**.

c) Khai triển `log(x² · y³)`:

  Bước 1, quy luật 1: `log(x² · y³) = log(x²) + log(y³)`.

  Bước 2, quy luật 3: `= 2·log(x) + 3·log(y)`.

  → Đáp số: **`2·log(x) + 3·log(y)`**.

### Bài 5

**Cách tiếp cận**:

Với input `[1000, 1001, 999]`, tính trực tiếp `exp(1000)` đã ra `Inf` (vì `math.MaxFloat64 ≈ 1.8 · 10^308`, mà `exp(1000) ≈ 10^434`). Tổng → `Inf`, `log(Inf) → Inf`. Naive version **hỏng**.

Trick: chuyển trục về `M = max(xs) = 1001`. Tính:

```
exp(1000 − 1001) + exp(1001 − 1001) + exp(999 − 1001)
= exp(−1) + exp(0) + exp(−2)
≈ 0.3679 + 1.0 + 0.1353
≈ 1.5032
```

`log(1.5032) ≈ 0.4076`. Cộng `M = 1001` lại:

```
logSumExp([1000, 1001, 999]) ≈ 1001 + 0.4076 ≈ 1001.4076
```

Số này khớp trực giác: tổng `e^1000 + e^1001 + e^999` bị thống trị bởi `e^1001`, nên log của tổng xấp xỉ `1001` (chỉ chênh chút do hai số kia đóng góp thêm).

**Tại sao trick này ổn định?** Sau khi trừ `M`, mọi số mũ ≤ 0 → `exp(...) ∈ (0, 1]` → tổng ∈ `(0, n]` → `log(tổng) ∈ (−∞, ln(n)]`, không bao giờ overflow. Cộng lại `M` chỉ là dịch trục số, không gây mất chính xác.

**Code đầy đủ**: xem [`solutions.go`](./solutions.go), hàm `logSumExp` và `logSumExpNaive`. Khi chạy:

```
logSumExpNaive([1000, 1001, 999]) = +Inf    ← hỏng
logSumExp([1000, 1001, 999]) ≈ 1001.4076    ← ổn định
```

**Độ phức tạp**: O(n) cho cả hai (mỗi cái duyệt mảng vài lần). Stable version chỉ thêm 1 lượt duyệt để tìm max + 1 lượt nữa để trừ — vẫn O(n).

---

## Code và minh họa

- Code Go đầy đủ: [`solutions.go`](./solutions.go) — chạy `go run solutions.go` để xem bảng giá trị log và demo logSumExp.
- Trang minh họa tương tác: [`visualization.html`](./visualization.html) — máy tính power/root/log, kiểm chứng quy luật, log-scale demo, logSumExp playground.

## Bài tiếp theo

- **Trước**: [Lesson 03 — Phương trình bậc 1](../lesson-03-linear-equations/)
- **Tiếp**: [Lesson 05 — Hàm số là gì](../lesson-05-functions/) — đưa các thứ vừa học vào khung "hàm `f(x)`", học cách đọc đồ thị, domain/range, hàm hợp.
