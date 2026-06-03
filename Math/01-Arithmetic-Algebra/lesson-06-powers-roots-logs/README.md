# Lesson 06 — Lũy thừa, căn, logarit

## Mục tiêu

- Hiểu **lũy thừa** aⁿ và mở rộng cho mũ âm, mũ hữu tỉ, mũ thực.
- Hiểu **căn bậc n** là gì và liên hệ với lũy thừa: ⁿ√a = a^(1/n).
- Hiểu **logarit** — phép ngược của lũy thừa: log_b(x) = "b mũ mấy bằng x".
- Áp dụng 5 quy luật log cơ bản.

## Kiến thức tiền đề

- [Lesson 02 — Biểu thức đại số](../lesson-02-algebraic-expressions/).

---

## 1. Lũy thừa (Power)

### 1.1. Định nghĩa

💡 **Trực giác / Hình dung**: lũy thừa là "phép nhân của phép nhân". Nếu phép nhân `5 × 3` là cách viết gọn "cộng 5 ba lần" (`5+5+5`), thì lũy thừa `5³` là cách viết gọn "nhân 5 ba lần" (`5·5·5`). Số mũ đếm **số lần lặp phép nhân**, không phải kết quả.

**Lũy thừa aⁿ với n nguyên dương** = nhân a với chính nó n lần:
```
aⁿ = a · a · a · ... · a  (n lần)
```

💡 **Là gì**: viết gọn phép nhân lặp lại. `a` gọi là **cơ số (base)**, `n` gọi là **số mũ (exponent)**.

**4 ví dụ số đa dạng**:
- Cơ số dương, mũ dương: `2⁵ = 2·2·2·2·2 = 32`.
- Cơ số âm, mũ chẵn: `(−3)² = (−3)·(−3) = 9` (kết quả **dương**).
- Cơ số âm, mũ lẻ: `(−3)³ = (−3)·(−3)·(−3) = −27` (kết quả **âm**).
- Cơ số phân số: `(2/3)³ = 8/27`.

**Mở rộng**:
- **a⁰ = 1** (mọi a ≠ 0). Tại sao? Vì a^n / a^n = 1 = a^(n−n) = a⁰.
- **a⁻ⁿ = 1/aⁿ**. Tại sao? Vì cần a^n · a^(−n) = a^0 = 1 → a^(−n) = 1/a^n.
- **a^(1/n) = ⁿ√a** (căn bậc n).
- **a^(p/q) = (a^p)^(1/q) = ᶴ√(a^p)**.

### 1.2. 6 quy luật lũy thừa

```
1. aᵐ · aⁿ = aᵐ⁺ⁿ
2. aᵐ / aⁿ = aᵐ⁻ⁿ
3. (aᵐ)ⁿ = aᵐⁿ
4. (ab)ⁿ = aⁿ · bⁿ
5. (a/b)ⁿ = aⁿ / bⁿ
6. a⁰ = 1
```

### 1.3. Verify từng quy luật bằng số thật (cả 2 vế)

Đừng học thuộc — hãy kiểm tra. Mỗi luật tính **riêng từng vế** rồi so:

| Quy luật | Vế trái (tính trực tiếp) | Vế phải (theo luật) | Khớp? |
|----------|--------------------------|----------------------|:----:|
| `aᵐ·aⁿ = aᵐ⁺ⁿ` | `2³·2⁴ = 8·16 = 128` | `2⁷ = 128` | ✓ |
| `aᵐ/aⁿ = aᵐ⁻ⁿ` | `3⁵/3² = 243/9 = 27` | `3³ = 27` | ✓ |
| `(aᵐ)ⁿ = aᵐⁿ` | `(2²)³ = 4³ = 64` | `2⁶ = 64` | ✓ |
| `(ab)ⁿ = aⁿ·bⁿ` | `(2·5)³ = 10³ = 1000` | `2³·5³ = 8·125 = 1000` | ✓ |
| `(a/b)ⁿ = aⁿ/bⁿ` | `(6/2)² = 3² = 9` | `6²/2² = 36/4 = 9` | ✓ |
| `a⁰ = 1` | `5³/5³ = 125/125 = 1` | `5⁰ = 1` | ✓ |

❓ **Câu hỏi tự nhiên của người đọc**

- *"`a⁰ = 1` có vẻ tùy tiện — vì sao mũ 0 lại ra 1, không phải 0?"* Vì để luật `aᵐ/aⁿ = aᵐ⁻ⁿ` còn đúng khi `m = n`: `a³/a³ = 1` ở vế trái, mà vế phải `a³⁻³ = a⁰`. Hai cái phải bằng nhau → buộc `a⁰ = 1`. Đây là **định nghĩa được chọn để giữ luật nhất quán**, không phải quy ước vô cớ.
- *"`a⁻ⁿ` nghĩa là gì? 'nhân âm lần' vô lý mà?"* Đúng, không thể "nhân −2 lần". `a⁻ⁿ` được **định nghĩa** = `1/aⁿ` để luật `aᵐ·aⁿ = aᵐ⁺ⁿ` còn đúng với mũ âm: cần `aⁿ·a⁻ⁿ = a⁰ = 1`, suy ra `a⁻ⁿ = 1/aⁿ`. Vd `2⁻³ = 1/8`.
- *"`0⁰` bằng mấy?"* Đây là dạng **không xác định** (gây tranh cãi): theo `a⁰=1` thì = 1, nhưng theo `0ⁿ=0` thì = 0. Trong đại số/tổ hợp thường quy ước `0⁰ = 1`; trong giải tích để là dạng vô định.

### 1.4. Ví dụ tổng hợp

- `2³ = 8`
- `2⁻² = 1/2² = 1/4`
- `8^(1/3) = ∛8 = 2` (căn bậc 3 của 8)
- `(2³)⁴ = 2¹² = 4096`
- `27^(2/3) = (∛27)² = 3² = 9` (mũ phân số: lấy căn rồi nâng mũ)
- `(1/2)⁻³ = 2³ = 8` (mũ âm của phân số → lật ngược rồi nâng)

🔁 **Dừng lại tự kiểm tra**

1. Tính `5⁻²` và `(−2)⁴`.
2. Rút gọn `x⁷·x⁻³`.

<details><summary>Đáp án</summary>

1. `5⁻² = 1/25 = 0.04`; `(−2)⁴ = 16` (mũ chẵn → dương).
2. `x⁷·x⁻³ = x⁷⁺⁽⁻³⁾ = x⁴`.

</details>

### 📝 Tóm tắt mục 1

- `aⁿ` = nhân `a` với chính nó `n` lần; `a` là cơ số, `n` là số mũ.
- Mở rộng nhất quán: `a⁰ = 1`, `a⁻ⁿ = 1/aⁿ`, `a^(1/n) = ⁿ√a`, `a^(p/q) = ⁿ√(aᵖ)`.
- 6 quy luật đều verify được bằng số — không cần học vẹt.

---

## 2. Căn bậc n

### 2.1. Định nghĩa

💡 **Trực giác / Hình dung**: căn là **phép ngược của lũy thừa**. Lũy thừa hỏi "nhân `b` với chính nó `n` lần ra bao nhiêu?"; căn hỏi ngược lại "**số nào** nhân với chính nó `n` lần thì ra `a`?". Vd `2³ = 8` thì `∛8 = 2`.

**ⁿ√a** = số b sao cho `bⁿ = a`.

- √a = a^(1/2) (căn bậc 2 — viết tắt).
- ∛a = a^(1/3).

**4 ví dụ số đa dạng**:
- `√49 = 7` (vì `7² = 49`).
- `∛64 = 4` (vì `4³ = 64`).
- `√(1/4) = 1/2` (căn của phân số).
- `⁵√32 = 2` (vì `2⁵ = 32`).

### 2.2. Tính chất

- ⁿ√(ab) = ⁿ√a · ⁿ√b.
- ⁿ√(a/b) = ⁿ√a / ⁿ√b.

**Verify**: `√(4·9) = √36 = 6`, và `√4·√9 = 2·3 = 6` ✓. `∛(8/27) = 2/3`, và `∛8/∛27 = 2/3` ✓.

⚠ **Lỗi thường gặp 1 — `√(a²) = |a|`, KHÔNG phải `a`**. Căn bậc chẵn luôn trả về giá trị **không âm**. Vd `√((−3)²) = √9 = 3 = |−3|`, **không** phải `−3`. Đây là lý do khi giải `x² = 9` ta được `x = ±3`, nhưng `√9` thì chỉ bằng `3`.

⚠ **Lỗi thường gặp 2 — `√(a+b) ≠ √a + √b`**. Phản ví dụ: `√(9+16) = √25 = 5`, nhưng `√9 + √16 = 3 + 4 = 7`. `5 ≠ 7`. Căn **không** "phân phối" qua phép cộng (chỉ qua nhân/chia).

❓ **Câu hỏi tự nhiên của người đọc**

- *"Căn bậc chẵn của số âm có không?"* Trong ℝ thì **không** (vd `√(−4)` không có nghiệm thực, vì không số thực nào bình phương ra âm). Phải lên số phức (Tier 03) mới có. Nhưng căn bậc **lẻ** của số âm thì có: `∛(−8) = −2` vì `(−2)³ = −8`.
- *"`a^(p/q)` nên lấy căn trước hay nâng mũ trước?"* Kết quả như nhau, nhưng **lấy căn trước thường dễ tính hơn**: `27^(2/3) = (∛27)² = 3² = 9` gọn hơn `∛(27²) = ∛729 = 9`.

🔁 **Dừng lại tự kiểm tra**

1. `√((−5)²) = ?`
2. `√(16 + 9) = ?` (cẩn thận!)

<details><summary>Đáp án</summary>

1. `√25 = 5` (= `|−5|`, không phải `−5`).
2. `√25 = 5`. Bẫy: KHÔNG phải `√16 + √9 = 4 + 3 = 7`.

</details>

### 📝 Tóm tắt mục 2

- `ⁿ√a = b ⟺ bⁿ = a`; tương đương `a^(1/n)`.
- Phân phối qua **nhân/chia** (`ⁿ√(ab) = ⁿ√a·ⁿ√b`), **KHÔNG** qua cộng/trừ.
- `√(a²) = |a|`; căn bậc chẵn của số âm vô nghiệm trong ℝ.

---

## 3. Logarit

### 3.1. Định nghĩa

💡 **Trực giác / Hình dung**: log trả lời câu hỏi **"bao nhiêu lần nhân?"**. Bạn có 1, nhân với `b` mãi cho tới khi đạt `x` — log đếm số lần nhân đó. Vd nhân đôi (`b=2`) từ 1: `1→2→4→8`, đến 8 mất 3 lần → `log₂(8) = 3`. Cách hình dung khác: với cơ số 10, `log₁₀(x)` ≈ **"số chữ số của x trừ 1"** — `log₁₀(1000) = 3` (1000 có 4 chữ số). Mũ làm số **phình to**, log **nén** nó lại về thang đo dễ đọc.

**log_b(x)** = "b mũ mấy bằng x":
```
log_b(x) = y   ⟺   bʸ = x
```

💡 **Là gì**: phép ngược của lũy thừa. Nếu mũ "tăng nhanh" → log "tăng chậm" (biến nhân thành cộng).

**4 ví dụ số đa dạng** (đọc xuôi theo định nghĩa `bʸ = x`):
- `log₂(16) = 4` vì `2⁴ = 16`.
- `log₅(1) = 0` vì `5⁰ = 1` (log của 1 luôn = 0, mọi cơ số).
- `log₁₀(0.01) = −2` vì `10⁻² = 0.01` (log của số < 1 thì **âm**).
- `log₉(3) = 1/2` vì `9^(1/2) = 3` (kết quả phân số).

**Vì sao quan trọng?** Vì:
- Biểu diễn số rất lớn/nhỏ (10⁸⁰ vs log = 80).
- Biến nhân → cộng (đặc biệt hữu ích trước máy tính, vẫn quan trọng).
- Tăng trưởng/giảm theo cấp số nhân (dân số, lãi kép, phóng xạ).
- Trong ML: loss function, entropy đều dùng log.

### 3.2. Cơ số phổ biến

- **log₁₀(x)** = "log thập phân", viết gọn **log(x)**.
- **logₑ(x)** = "log tự nhiên", viết gọn **ln(x)**. e ≈ 2.718.
- **log₂(x)** = log nhị phân, dùng nhiều trong CS.

### 3.3. 5 quy luật log

```
1. log_b(xy) = log_b(x) + log_b(y)        (nhân → cộng)
2. log_b(x/y) = log_b(x) − log_b(y)       (chia → trừ)
3. log_b(x^n) = n · log_b(x)              (mũ → nhân)
4. log_b(1) = 0    (vì b⁰ = 1)
5. log_b(b) = 1    (vì b¹ = b)
```

**Vì sao nhân lại thành cộng?** Vì log là mũ ngược, mà mũ thì "`aᵐ·aⁿ = aᵐ⁺ⁿ`" (nhân cơ số = cộng mũ). Lấy log hai vế của `bˣ·bʸ = bˣ⁺ʸ` ra đúng luật 1. Log "kế thừa" việc cộng từ số mũ.

### 3.4. Verify từng quy luật log bằng số thật (cả 2 vế)

| Quy luật | Vế trái | Vế phải | Khớp? |
|----------|---------|---------|:----:|
| `log(xy)=log x+log y` | `log₂(4·8) = log₂(32) = 5` | `log₂4 + log₂8 = 2+3 = 5` | ✓ |
| `log(x/y)=log x−log y` | `log₂(32/4) = log₂(8) = 3` | `log₂32 − log₂4 = 5−2 = 3` | ✓ |
| `log(xⁿ)=n·log x` | `log₂(8³) = log₂(512) = 9` | `3·log₂8 = 3·3 = 9` | ✓ |
| `log_b(1)=0` | `log₇(1) = 0` | `0` | ✓ |
| `log_b(b)=1` | `log₇(7) = 1` | `1` | ✓ |

**Đổi cơ số**: `log_b(x) = ln(x) / ln(b)` (hoặc chia cho `log` cơ số nào cũng được, miễn cùng cơ số trên/dưới).

**Verify đổi cơ số**: `log₂(8)` đáng ra `= 3`. Tính qua ln: `ln(8)/ln(2) = 2.0794/0.6931 = 3.0000` ✓. Hữu ích vì máy tính chỉ có nút `ln` và `log₁₀`, muốn `log₂` phải đổi cơ số.

⚠ **Lỗi thường gặp — lỗi #1 của người học log**: `log(x + y) ≠ log x + log y`. Log chỉ biến **nhân** thành cộng, **không phải cộng** thành cộng. Phản ví dụ: `log₁₀(10 + 90) = log₁₀(100) = 2`, nhưng `log₁₀(10) + log₁₀(90) = 1 + 1.954 = 2.954`. `2 ≠ 2.954`. Tương tự `log(x−y) ≠ log x − log y`.

⚠ **Lỗi thường gặp — log của số ≤ 0 không xác định**. `log_b(0)` và `log_b(số âm)` **vô nghĩa** trong ℝ: không số mũ thực nào làm `bʸ` ra 0 hay ra số âm (vì `bʸ > 0` luôn với `b > 0`). Khi giải phương trình log, luôn kiểm tra **điều kiện đối số > 0**.

❓ **Câu hỏi tự nhiên của người đọc**

- *"Cơ số log có thể là 1 không?"* **Không**. `log₁(x)` vô nghĩa vì `1ʸ = 1` với mọi `y` → không bao giờ ra `x ≠ 1`. Cơ số phải `b > 0` và `b ≠ 1`.
- *"Vì sao `e ≈ 2.718` lại là cơ số 'tự nhiên'?"* Vì hàm `eˣ` có đạo hàm bằng chính nó (học ở Tier 04 — Calculus), khiến mọi công thức tăng trưởng/giải tích gọn nhất khi dùng cơ số `e`. "Tự nhiên" = xuất hiện tự nhiên trong toán giải tích, không phải do con người chọn cho tiện.
- *"Tính `log₂(10)` mà máy không có nút log₂ thì sao?"* Dùng đổi cơ số: `log₂(10) = log₁₀(10)/log₁₀(2) = 1/0.301 ≈ 3.32`.

### 3.5. Ví dụ tổng hợp

- log₂(8) = 3 (vì 2³ = 8).
- log₁₀(100) = 2.
- ln(e) = 1.
- log₂(1024) = 10 (vì 2¹⁰ = 1024).
- log(2 × 50) = log(2) + log(50) ≈ 0.301 + 1.699 = 2 ✓.
- log₃(1/9) = −2 (vì 3⁻² = 1/9).

🔁 **Dừng lại tự kiểm tra**

1. `log₂(64) = ?`
2. Đúng hay sai: `log(8) = log(5) + log(3)`?
3. `log₅(0.2) = ?`

<details><summary>Đáp án</summary>

1. `6` (vì `2⁶ = 64`).
2. **Sai**. `log(5)+log(3) = log(5·3) = log(15)`, không phải `log(8)`. (Bẫy cộng→cộng.)
3. `0.2 = 1/5 = 5⁻¹` → `log₅(0.2) = −1`.

</details>

### 📝 Tóm tắt mục 3

- `log_b(x) = y ⟺ bʸ = x`; log đếm "số lần nhân cơ số".
- 5 quy luật đều verify được; cốt lõi: **nhân→cộng, chia→trừ, mũ→nhân**.
- Cạm bẫy chí mạng: `log(x+y) ≠ log x + log y`; đối số phải `> 0`; cơ số `b > 0, b ≠ 1`.

---

## 4. Bài tập

### Bài tập

**Bài 1**: Rút gọn: a) `2³ · 2⁵`, b) `(3²)⁴`, c) `4^(1/2)`.

**Bài 2**: Tính: a) `log₂(32)`, b) `log₁₀(1/1000)`, c) `log(2) + log(5)`.

**Bài 3**: Giải `2ˣ = 64`.

**Bài 4**: Giải `log₃(x) = 4`.

**Bài 5**: Số tế bào vi khuẩn nhân đôi mỗi giờ. Ban đầu 100 con. Tính số con sau 10 giờ, và sau bao nhiêu giờ thì có 1 triệu con?

### Lời giải

**Bài 1**: 
- 2³·2⁵ = 2⁸ = **256**.
- (3²)⁴ = 3⁸ = **6561**.
- 4^(1/2) = √4 = **2**.

**Bài 2**:
- log₂(32) = 5 (vì 32 = 2⁵).
- log₁₀(1/1000) = log₁₀(10⁻³) = **−3**.
- log(2) + log(5) = log(10) = **1**.

**Bài 3**: 64 = 2⁶ → x = **6**. Hoặc x = log₂(64) = 6.

**Bài 4**: x = 3⁴ = **81**.

**Bài 5**: 
- N(t) = 100 · 2ᵗ.
- N(10) = 100 · 1024 = **102,400 con**.
- 100 · 2ᵗ = 10⁶ → 2ᵗ = 10⁴ → t = log₂(10⁴) = 4 · log₂(10) ≈ 4 · 3.32 = **13.3 giờ**.

---

## 5. Bài tiếp theo

[Lesson 07 — Hàm số](../lesson-07-functions-intro/).

## 📝 Tổng kết

1. **Lũy thừa aⁿ**: mở rộng cho mọi mũ thực. 6 quy luật cơ bản.
2. **Căn ⁿ√a = a^(1/n)**.
3. **Log_b(x)**: phép ngược của lũy thừa. log(xy) = log x + log y, log(x^n) = n log x.
4. **Ứng dụng**: tăng trưởng, lãi kép, phóng xạ, entropy, loss function ML.
