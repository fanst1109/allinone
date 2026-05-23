# Lesson 04 — Độc lập tuyến tính, span, basis

Đây là bài "đổi cách nhìn" về không gian vector. Trước đây ta nhìn `ℝ²`, `ℝ³` như "mặt phẳng có lưới ô vuông sẵn". Bài này dạy: **lưới ô vuông đó là một LỰA CHỌN, không phải thứ trời sinh**. Ta có thể chọn bộ "thước đo" (basis) khác, và cùng một điểm sẽ có toạ độ khác. Hiểu được điều này = mở cánh cửa vào PCA, embedding, change of basis, eigenvector — gần như toàn bộ Tầng 4 còn lại.

## Mục tiêu học tập

Sau khi học xong bài này, bạn sẽ:

- Viết được **linear combination** (tổ hợp tuyến tính) của một tập vector và hiểu mỗi hệ số `cᵢ` mang ý nghĩa gì.
- Vẽ và mô tả được **span** (bao tuyến tính) của 1, 2, 3 vector trong `ℝ²` và `ℝ³`.
- Kiểm tra được một tập vector là **độc lập tuyến tính** hay **phụ thuộc** bằng 2 cách: giải hệ phương trình + tính định thức.
- Định nghĩa được **basis** và tìm được basis cho các không gian con đơn giản.
- Hiểu **dimension** = số phần tử trong basis (không phụ thuộc cách chọn basis nào).
- Bước đầu thấy được mối liên hệ giữa basis và **PCA**, **embedding**, **linear regression**.

## Kiến thức tiền đề

- [Lesson 01 — Vector chính thức](../lesson-01-vectors/): định nghĩa vector trong `ℝⁿ`, phép cộng, scalar multiplication.
- [Lesson 02 — Dot product](../lesson-02-dot-product/): không bắt buộc, nhưng sẽ giúp trực giác về "vuông góc" ở phần subspace.
- [Algebra Lesson 08 — Hệ phương trình tuyến tính](../../01-Algebra/lesson-08-systems/): cách giải hệ `Ax = b` bằng khử Gauss. Phần "Cách kiểm tra độc lập" sẽ gọi lại trực tiếp.
- [Algebra Lesson 06 — Hàm bậc nhất, bậc hai](../../01-Algebra/lesson-06-linear-quadratic/): khái niệm đường thẳng đi qua gốc, mặt phẳng — sẽ dùng làm "vật liệu" mô tả span.

---

## 1. Linear combination — tổ hợp tuyến tính

### 1.1 Trực giác

> 💡 **Hình dung**: bạn có 2 lọ thuốc nhuộm — lọ A màu đỏ, lọ B màu xanh. Mỗi lần pha, bạn nhỏ một số giọt A (gọi là `c₁`) và một số giọt B (gọi là `c₂`). Kết quả là một màu mới — **tổ hợp tuyến tính** của A và B với hệ số `(c₁, c₂)`. Nếu thêm lọ C, bạn có 3 hệ số. Quy tắc cốt lõi: chỉ được dùng phép **cộng** và phép **nhân với số (scalar)** — không có phép nhân lọ với lọ, không có lũy thừa.

Cùng nguyên tắc đó, nhưng thay "lọ thuốc nhuộm" bằng "vector". Một linear combination là kết quả của việc:

1. Lấy mỗi vector trong tập, nhân nó với một hệ số (scalar) tuỳ ý.
2. Cộng tất cả các vector đã nhân hệ số lại với nhau.

### 1.2 Định nghĩa hình thức

Cho tập vector `{v₁, v₂, ..., vₖ}` trong `ℝⁿ` và các scalar `c₁, c₂, ..., cₖ ∈ ℝ`. **Linear combination** (tổ hợp tuyến tính) của chúng với hệ số `(c₁, ..., cₖ)` là vector:

```
c₁·v₁ + c₂·v₂ + ... + cₖ·vₖ
```

Điều quan trọng:

- Hệ số `cᵢ` có thể là **bất kỳ số thực** nào — âm, dương, không, phân số, số vô tỉ.
- Phép cộng và scalar multiplication là **các phép toán duy nhất** được phép.
- Kết quả vẫn là một vector trong `ℝⁿ` (cùng không gian với các `vᵢ`).

### 1.3 Walk-through bằng số cụ thể

**Ví dụ 1**: `v₁ = (1, 0)`, `v₂ = (0, 1)`, hệ số `(c₁, c₂) = (3, 5)`.

```
3·(1, 0) + 5·(0, 1)
= (3, 0) + (0, 5)
= (3, 5)
```

Bạn thấy ngay: với 2 vector đơn vị `(1,0)` và `(0,1)`, hệ số `(c₁, c₂)` chính là toạ độ của kết quả. Đây là lý do tại sao ta gọi `(1,0)` và `(0,1)` là **standard basis** — sẽ nói kỹ ở mục 6.

**Ví dụ 2**: `v₁ = (2, 1)`, `v₂ = (1, 3)`, hệ số `(c₁, c₂) = (1, 2)`.

```
1·(2, 1) + 2·(1, 3)
= (2, 1) + (2, 6)
= (4, 7)
```

**Ví dụ 3** (hệ số âm): `v₁ = (1, 2)`, `v₂ = (3, -1)`, hệ số `(c₁, c₂) = (-2, 1)`.

```
(-2)·(1, 2) + 1·(3, -1)
= (-2, -4) + (3, -1)
= (1, -5)
```

**Ví dụ 4** (trong `ℝ³`): `v₁ = (1, 0, 0)`, `v₂ = (1, 1, 0)`, `v₃ = (1, 1, 1)`, hệ số `(2, -1, 3)`.

```
2·(1, 0, 0) + (-1)·(1, 1, 0) + 3·(1, 1, 1)
= (2, 0, 0) + (-1, -1, 0) + (3, 3, 3)
= (4, 2, 3)
```

**Ví dụ 5** (trường hợp đặc biệt): tất cả hệ số bằng 0.

```
0·v₁ + 0·v₂ + ... + 0·vₖ = 0
```

Đây gọi là **trivial combination** (tổ hợp tầm thường). Mọi tập vector đều có ít nhất tổ hợp này, kết quả luôn là vector 0.

> ❓ **Câu hỏi tự nhiên**: "Có khi nào tổ hợp tuyến tính KHÔNG ra được vector mong muốn?" — Có. Ví dụ với `v₁ = (1, 0)` và `v₂ = (2, 0)`, mọi tổ hợp `c₁(1,0) + c₂(2,0) = (c₁+2c₂, 0)` đều có thành phần thứ hai = 0. Bạn không thể tạo ra `(1, 1)` từ hai vector này. Lý do: tập này không "trải" được toàn `ℝ²` — dẫn ta tới khái niệm **span** ngay sau đây.

> 🔁 **Tự kiểm tra**: Cho `u = (1, -1)`, `v = (2, 1)`. Tính tổ hợp `3u - 2v`. <details><summary>Đáp án</summary>`3(1,-1) - 2(2,1) = (3,-3) - (4,2) = (-1, -5)`.</details>

### 📝 Tóm tắt mục 1

- Linear combination = nhân mỗi vector với một scalar rồi cộng tất cả lại.
- Hệ số `cᵢ` có thể là bất kỳ số thực nào, kể cả 0 hay âm.
- Trivial combination (tất cả hệ số = 0) luôn cho vector 0.
- Tổ hợp tuyến tính là phép toán **đóng** trong `ℝⁿ` — kết quả không "thoát" ra ngoài.

---

## 2. Span — bao tuyến tính

### 2.1 Trực giác

> 💡 **Hình dung**: tưởng tượng `v₁` và `v₂` là 2 ánh đèn từ 2 vị trí cố định. Bạn có thể chỉnh độ sáng (hệ số `c₁`, `c₂`) tuỳ ý. **Span** của `{v₁, v₂}` là tập hợp **tất cả các điểm sáng mà bạn có thể tạo ra được**. Nếu `v₁` và `v₂` chiếu theo 2 hướng khác nhau, bạn có thể chiếu sáng cả mặt phẳng. Nếu cả 2 chiếu theo cùng một hướng, bạn chỉ chiếu sáng được một đường thẳng.

### 2.2 Định nghĩa hình thức

**Span của tập vector** `{v₁, v₂, ..., vₖ}` ⊂ `ℝⁿ`, ký hiệu `span(v₁, ..., vₖ)` hoặc `⟨v₁, ..., vₖ⟩`, là tập hợp **mọi linear combination** của chúng:

```
span(v₁, ..., vₖ) = { c₁v₁ + c₂v₂ + ... + cₖvₖ : c₁, ..., cₖ ∈ ℝ }
```

Đây là một **tập hợp** (set) — không phải một vector đơn lẻ. Nó luôn là một **không gian con** của `ℝⁿ` (sẽ chứng minh ở mục 9).

### 2.3 Walk-through các trường hợp

**Ví dụ 1**: `span((1, 0))` trong `ℝ²`.

Mọi tổ hợp: `c·(1, 0) = (c, 0)` với `c ∈ ℝ`. Tập kết quả là `{(c, 0) : c ∈ ℝ}` = **trục Ox**. Hình học: một đường thẳng đi qua gốc, nằm ngang.

**Ví dụ 2**: `span((1, 0), (0, 1))` trong `ℝ²`.

Mọi tổ hợp: `c₁(1,0) + c₂(0,1) = (c₁, c₂)` với `c₁, c₂ ∈ ℝ`. Đặt `x = c₁`, `y = c₂` — ta có **toàn bộ `ℝ²`**. Hai vector này "phủ" hết mặt phẳng.

**Ví dụ 3**: `span((1, 0), (2, 0))` trong `ℝ²`.

Mọi tổ hợp: `c₁(1,0) + c₂(2,0) = (c₁ + 2c₂, 0)`. Vì `c₁ + 2c₂` chạy khắp `ℝ` nên kết quả là `{(t, 0) : t ∈ ℝ}` = **trục Ox** (giống Ví dụ 1). Có 2 vector nhưng chỉ trải được 1 đường thẳng — vì `(2,0) = 2·(1,0)`, vector thứ hai "thừa".

**Ví dụ 4**: `span((1, 1), (1, -1))` trong `ℝ²`.

Mọi tổ hợp: `c₁(1,1) + c₂(1,-1) = (c₁ + c₂, c₁ - c₂)`. Đặt `x = c₁ + c₂`, `y = c₁ - c₂`. Giải ra `c₁ = (x+y)/2`, `c₂ = (x-y)/2`. Với mọi `(x, y) ∈ ℝ²`, ta luôn tìm được `c₁, c₂` thoả mãn → span = toàn bộ `ℝ²`. Khác với Ví dụ 2, basis ở đây "nghiêng".

**Ví dụ 5**: `span((1, 0, 0))` trong `ℝ³`.

`c·(1,0,0) = (c, 0, 0)` → trục Ox trong `ℝ³`. Đây là một đường thẳng trong không gian 3 chiều.

**Ví dụ 6**: `span((1, 0, 0), (0, 1, 0))` trong `ℝ³`.

`c₁(1,0,0) + c₂(0,1,0) = (c₁, c₂, 0)` → **mặt phẳng Oxy** (thành phần z luôn = 0).

**Ví dụ 7**: `span((1, 0, 0), (0, 1, 0), (0, 0, 1))` trong `ℝ³` = toàn bộ `ℝ³`.

**Ví dụ 8**: `span((1, 1, 0), (2, 2, 0))` trong `ℝ³`.

`c₁(1,1,0) + c₂(2,2,0) = (c₁ + 2c₂, c₁ + 2c₂, 0)`. Đặt `t = c₁ + 2c₂`, kết quả là `{(t, t, 0) : t ∈ ℝ}` = **đường thẳng qua gốc theo hướng `(1,1,0)`**. Có 2 vector nhưng span chỉ là một đường — vì `(2,2,0) = 2·(1,1,0)`.

> ❓ **Câu hỏi tự nhiên 1**: "Span luôn đi qua gốc toạ độ?" — Đúng. Vì chọn `c₁ = c₂ = ... = 0`, tổ hợp = `0`. Mọi span đều chứa vector 0. Hệ quả: đường thẳng `y = x + 3` (không đi qua gốc) **không** là span của bất kỳ tập vector nào.

> ❓ **Câu hỏi tự nhiên 2**: "Span có thể là một điểm duy nhất không?" — Có, đúng 1 trường hợp: `span({}) = {0}` (span của tập rỗng) hoặc `span({0}) = {0}`. Vì `c·0 = 0` với mọi `c`.

> ❓ **Câu hỏi tự nhiên 3**: "Span của 3 vector trong `ℝ²` là gì?" — Tối đa là toàn `ℝ²`. Vì span ⊂ `ℝ²`, mà `ℝ²` chỉ có 2 chiều. Thêm vector thứ 3 không "vượt" được ra ngoài — nó sẽ là combination của 2 vector kia (hoặc trùng/cùng hướng).

> ⚠ **Lỗi thường gặp**: nghĩ rằng "nhiều vector hơn → span lớn hơn". Sai. `span((1,0), (2,0), (3,0)) = span((1,0))` = trục Ox, dù có 3 vector. Số vector **không** quyết định kích thước span — chất lượng (sự đa dạng hướng) mới quyết định.

> 🔁 **Tự kiểm tra**: `span((1, 2), (3, 6))` là gì? <details><summary>Đáp án</summary>`(3,6) = 3·(1,2)` nên 2 vector cùng hướng. Span = đường thẳng qua gốc theo hướng `(1,2)`, tức là `{(t, 2t) : t ∈ ℝ}` hay đường `y = 2x`.</details>

### 📝 Tóm tắt mục 2

- Span = tập hợp **mọi** linear combination của các vector cho trước.
- Span luôn chứa vector 0 (chọn mọi hệ số = 0).
- Span của 1 vector ≠ 0 = đường thẳng qua gốc.
- Span của 2 vector không cùng hướng trong `ℝ²` = toàn `ℝ²`; trong `ℝ³` = một mặt phẳng qua gốc.
- Số vector **không** quyết định kích thước span; "chất lượng" (đa dạng hướng) mới quyết định.

---

## 3. Độc lập tuyến tính

### 3.1 Trực giác

> 💡 **Hình dung**: bạn có một đội xây dựng gồm `k` công nhân, mỗi người chỉ làm được một loại việc (đào, trộn vữa, xây tường, ...). **Độc lập** nghĩa là **không có ai làm việc trùng với người khác** — mất bất kỳ người nào, đội sẽ thiếu một kỹ năng không bù được. **Phụ thuộc** nghĩa là có người làm việc đã có người khác làm (hoặc làm việc ai đó có thể tự lo) — bỏ người này đi, đội vẫn làm được mọi việc cũ.

Áp dụng vào vector: tập `{v₁, ..., vₖ}` **độc lập tuyến tính** nếu **không vector nào có thể viết được dưới dạng linear combination của các vector còn lại**. Mất vector nào, span sẽ "co" lại. Ngược lại, **phụ thuộc** = có ít nhất một vector "thừa" (viết được từ các vector khác), bỏ nó đi span không đổi.

### 3.2 Định nghĩa hình thức

Tập vector `{v₁, v₂, ..., vₖ}` ⊂ `ℝⁿ` gọi là **độc lập tuyến tính (linearly independent)** nếu phương trình:

```
c₁v₁ + c₂v₂ + ... + cₖvₖ = 0
```

**chỉ có một nghiệm duy nhất** là `c₁ = c₂ = ... = cₖ = 0` (nghiệm tầm thường).

Nếu tồn tại nghiệm khác — tức có một bộ `(c₁, ..., cₖ)` không phải toàn số 0 mà vẫn cho tổng = 0 — tập vector gọi là **phụ thuộc tuyến tính (linearly dependent)**.

### 3.3 Tại sao định nghĩa lại theo cách "bằng 0" này?

Định nghĩa trực giác là "không vector nào viết được từ các vector còn lại". Cách hình thức là "phương trình `c₁v₁ + ... = 0` chỉ có nghiệm tầm thường". Hai cách này tương đương — chứng minh ngắn:

- **(⇒)** Giả sử tồn tại `(c₁, ..., cₖ) ≠ (0, ..., 0)` với `c₁v₁ + ... + cₖvₖ = 0`. Không mất tổng quát, giả sử `c₁ ≠ 0`. Khi đó:
  ```
  v₁ = -(c₂/c₁)v₂ - (c₃/c₁)v₃ - ... - (cₖ/c₁)vₖ
  ```
  → `v₁` viết được từ các vector còn lại → tập **phụ thuộc** theo định nghĩa trực giác.
- **(⇐)** Ngược lại, nếu `v₁ = a₂v₂ + ... + aₖvₖ`, viết lại:
  ```
  1·v₁ + (-a₂)v₂ + ... + (-aₖ)vₖ = 0
  ```
  → có nghiệm `(1, -a₂, ..., -aₖ) ≠ (0, ..., 0)` → tập phụ thuộc theo định nghĩa hình thức.

Hai định nghĩa **tương đương**, ta dùng cách hình thức vì nó dễ kiểm tra (giải hệ phương trình).

### 3.4 Walk-through bằng số cụ thể

**Ví dụ 1**: `v₁ = (1, 0)`, `v₂ = (0, 1)` — độc lập?

Giải `c₁(1,0) + c₂(0,1) = (0,0)` → `(c₁, c₂) = (0, 0)`. Chỉ có nghiệm tầm thường → **độc lập**.

**Ví dụ 2**: `v₁ = (1, 2)`, `v₂ = (2, 4)` — độc lập?

Để ý `v₂ = 2·v₁`, nên `(-2)·v₁ + 1·v₂ = (-2,-4) + (2,4) = (0,0)`. Tồn tại nghiệm không tầm thường `(c₁, c₂) = (-2, 1)` → **phụ thuộc**. Hệ số phụ thuộc: `(-2, 1)`.

**Ví dụ 3**: `v₁ = (1, 1)`, `v₂ = (1, -1)` — độc lập?

Giải `c₁(1,1) + c₂(1,-1) = (0,0)`:
```
c₁ + c₂ = 0
c₁ - c₂ = 0
```
Cộng hai vế: `2c₁ = 0 → c₁ = 0`. Thay vào: `c₂ = 0`. Chỉ có nghiệm tầm thường → **độc lập**.

**Ví dụ 4**: `v₁ = (1, 0, 0)`, `v₂ = (0, 1, 0)`, `v₃ = (1, 1, 0)` — độc lập?

Để ý `v₃ = v₁ + v₂`, viết lại: `1·v₁ + 1·v₂ + (-1)·v₃ = 0`. Có nghiệm `(1, 1, -1) ≠ 0` → **phụ thuộc**. Trực giác: 3 vector cùng nằm trên mặt phẳng `z = 0`, một mặt phẳng chỉ "chứa" được 2 hướng độc lập, vector thứ 3 chắc chắn thừa.

**Ví dụ 5**: `v₁ = (1, 0, 0)`, `v₂ = (0, 1, 0)`, `v₃ = (0, 0, 1)` — độc lập?

Giải `c₁(1,0,0) + c₂(0,1,0) + c₃(0,0,1) = (0,0,0)`:
```
c₁ = 0, c₂ = 0, c₃ = 0
```
Chỉ có nghiệm tầm thường → **độc lập**. Đây là standard basis của `ℝ³`.

**Ví dụ 6**: `v₁ = (1, 2, 3)`, `v₂ = (4, 5, 6)`, `v₃ = (7, 8, 9)` — độc lập?

Để ý `v₃ - 2v₂ + v₁ = (7-8+1, 8-10+2, 9-12+3) = (0, 0, 0)`. Tồn tại `(1, -2, 1) ≠ 0` → **phụ thuộc**. (Đây là một ví dụ kinh điển — mọi hàng của ma trận `[[1,2,3],[4,5,6],[7,8,9]]` đều phụ thuộc tuyến tính.)

**Ví dụ 7**: `v₁ = (1, 0)`, `v₂ = (0, 1)`, `v₃ = (1, 1)` — độc lập?

Trong `ℝ²`, có nhiều hơn 2 vector → chắc chắn phụ thuộc. Cụ thể: `v₃ = v₁ + v₂` → `1·v₁ + 1·v₂ + (-1)·v₃ = 0`. **Phụ thuộc**.

**Định lý**: trong `ℝⁿ`, mọi tập có **nhiều hơn n vector** đều phụ thuộc tuyến tính.

> ❓ **Câu hỏi tự nhiên 1**: "Nếu tập có vector 0 thì sao?" — Luôn phụ thuộc. Vì `1·0 + 0·v₁ + ... + 0·vₖ = 0` với hệ số `(1, 0, 0, ...) ≠ 0`.

> ❓ **Câu hỏi tự nhiên 2**: "Nếu 2 vector trong tập trùng nhau thì sao?" — Phụ thuộc. Nếu `v₁ = v₂`, thì `1·v₁ + (-1)·v₂ + 0·v₃ + ... = 0` với hệ số không tầm thường.

> ❓ **Câu hỏi tự nhiên 3**: "Tập 1 vector duy nhất có độc lập không?" — Có nếu vector đó ≠ 0. Vì `c·v = 0` với `v ≠ 0` chỉ khi `c = 0`. Nếu `v = 0` thì tập `{0}` phụ thuộc (theo câu trên).

> ⚠ **Lỗi thường gặp 1**: nghĩ rằng "2 vector vuông góc thì độc lập". Đúng theo chiều xuôi (vuông góc ⇒ độc lập, miễn cả 2 ≠ 0), nhưng **ngược lại sai**: 2 vector độc lập **không nhất thiết** vuông góc. Ví dụ `(1,0)` và `(1,1)` độc lập nhưng không vuông góc.

> ⚠ **Lỗi thường gặp 2**: nhầm "phụ thuộc" với "cùng phương". Hai khái niệm này chỉ trùng khi xét **2 vector**. Với `≥ 3 vector` thì không nhất thiết: `v₁ = (1,0,0)`, `v₂ = (0,1,0)`, `v₃ = (1,1,0)` — không có 2 vector nào cùng phương, nhưng cả tập vẫn phụ thuộc (vì `v₃ = v₁ + v₂`).

> 🔁 **Tự kiểm tra**: Xét `v₁ = (2, 1)`, `v₂ = (4, 3)`. Độc lập? <details><summary>Đáp án</summary>Giải `c₁(2,1) + c₂(4,3) = (0,0)`: hệ `2c₁+4c₂=0, c₁+3c₂=0`. Từ phương trình 2: `c₁ = -3c₂`. Thay vào pt 1: `-6c₂ + 4c₂ = -2c₂ = 0 → c₂ = 0 → c₁ = 0`. Chỉ nghiệm tầm thường → **độc lập**.</details>

### 📝 Tóm tắt mục 3

- Độc lập = phương trình `Σ cᵢvᵢ = 0` chỉ có nghiệm tầm thường.
- Phụ thuộc = tồn tại bộ hệ số không phải toàn 0 cho tổng = 0; tương đương "ít nhất 1 vector viết được từ các vector khác".
- Tập chứa vector 0 → phụ thuộc.
- Tập có > n vector trong `ℝⁿ` → phụ thuộc.
- Vuông góc ⇒ độc lập (với vector khác 0); chiều ngược KHÔNG đúng.

---

## 4. Cách kiểm tra độc lập tuyến tính

Có 2 cách thực dụng. Cách 1 luôn dùng được; cách 2 chỉ dùng khi số vector = số chiều (ma trận vuông).

### 4.1 Cách 1: giải hệ phương trình (khử Gauss)

Xếp các vector `v₁, ..., vₖ` thành **các cột** của một ma trận `A` cỡ `n × k`. Phương trình `c₁v₁ + ... + cₖvₖ = 0` chính là hệ `A·c = 0` (với `c = (c₁, ..., cₖ)ᵀ`).

- Hệ này luôn có nghiệm tầm thường `c = 0`.
- Tập **độc lập** ⇔ đây là **nghiệm duy nhất** ⇔ `A` có rank đầy đủ theo cột ⇔ khử Gauss cho ma trận `A` không có cột "tự do" (free variable).

> Tham chiếu: [Algebra Lesson 08 — Hệ phương trình](../../01-Algebra/lesson-08-systems/) đã dạy cách khử Gauss và xác định nghiệm duy nhất / vô số nghiệm.

**Ví dụ áp dụng**: kiểm tra `v₁ = (1, 2, 3)`, `v₂ = (2, 4, 6)`, `v₃ = (1, 0, 1)` trong `ℝ³`.

Xếp thành ma trận (cột):
```
A = | 1  2  1 |
    | 2  4  0 |
    | 3  6  1 |
```

Khử Gauss:
- `R₂ ← R₂ - 2R₁`: `| 1  2  1 | | 0  0  -2 | | 3  6  1 |`
- `R₃ ← R₃ - 3R₁`: `| 1  2  1 | | 0  0  -2 | | 0  0  -2 |`
- `R₃ ← R₃ - R₂`: `| 1  2  1 | | 0  0  -2 | | 0  0  0 |`

Cột 2 không có pivot → biến tự do `c₂` → hệ có vô số nghiệm → **phụ thuộc**. Cụ thể: từ hàng 2, `-2c₃ = 0 → c₃ = 0`. Từ hàng 1, `c₁ + 2c₂ + c₃ = 0 → c₁ = -2c₂`. Chọn `c₂ = 1` được `(c₁, c₂, c₃) = (-2, 1, 0)`. Kiểm: `-2·(1,2,3) + 1·(2,4,6) + 0·(1,0,1) = (0,0,0)` ✓.

### 4.2 Cách 2: định thức (chỉ ma trận vuông)

Nếu số vector `k = n` (số chiều), ma trận `A = [v₁ | v₂ | ... | vₙ]` là vuông `n × n`. Khi đó:

```
tập {v₁, ..., vₙ} độc lập  ⇔  det(A) ≠ 0
tập {v₁, ..., vₙ} phụ thuộc ⇔  det(A) = 0
```

(Định thức sẽ học chi tiết ở Lesson 06; ở đây chỉ cần biết công thức cho ma trận `2×2` và `3×3`.)

**Định thức 2×2**: `det| a b ; c d | = ad - bc`.

**Định thức 3×3** (Sarrus):
```
det| a b c |
   | d e f | = a(ei - fh) - b(di - fg) + c(dh - eg)
   | g h i |
```

**Ví dụ 1**: `v₁ = (1, 2)`, `v₂ = (3, 4)`. Ma trận `| 1 3 ; 2 4 |`. Det = `1·4 - 3·2 = 4 - 6 = -2 ≠ 0` → **độc lập**.

**Ví dụ 2**: `v₁ = (1, 2)`, `v₂ = (2, 4)`. Ma trận `| 1 2 ; 2 4 |`. Det = `1·4 - 2·2 = 0` → **phụ thuộc**.

**Ví dụ 3**: `v₁ = (1, 0, 0)`, `v₂ = (1, 1, 0)`, `v₃ = (1, 1, 1)`. Ma trận:
```
| 1 1 1 |
| 0 1 1 |
| 0 0 1 |
```
Det = `1·(1·1 - 1·0) - 1·(0·1 - 1·0) + 1·(0·0 - 1·0) = 1·1 - 1·0 + 1·0 = 1 ≠ 0` → **độc lập**.

**Ví dụ 4**: `v₁ = (1, 2, 3)`, `v₂ = (4, 5, 6)`, `v₃ = (7, 8, 9)`. Ma trận:
```
| 1 4 7 |
| 2 5 8 |
| 3 6 9 |
```
Det = `1(5·9 - 8·6) - 4(2·9 - 8·3) + 7(2·6 - 5·3) = 1(45-48) - 4(18-24) + 7(12-15) = -3 + 24 - 21 = 0` → **phụ thuộc** (khớp với kết quả mục 3.4 Ví dụ 6).

### 4.3 Khi nào dùng cách nào?

| Tình huống | Dùng cách | Lý do |
|------------|-----------|-------|
| `k = n` (số vector = số chiều) | Định thức | Nhanh, công thức cố định |
| `k ≠ n` | Khử Gauss | Định thức không định nghĩa cho ma trận không vuông |
| Cần biết **hệ số phụ thuộc** cụ thể | Khử Gauss | Khử Gauss cho ra nghiệm; định thức chỉ cho "có/không" |
| Số vector lớn, dùng máy tính | Cả hai đều OK; thường là khử Gauss (rank) | Rank còn dùng được cho cả không vuông |

> ⚠ **Lỗi thường gặp**: dùng định thức cho ma trận không vuông. `det` chỉ định nghĩa cho ma trận vuông. Với `n × k` mà `n ≠ k`, phải dùng rank / khử Gauss.

> 🔁 **Tự kiểm tra**: dùng định thức kiểm tra `v₁ = (2, 1)`, `v₂ = (4, 3)`. <details><summary>Đáp án</summary>Ma trận `| 2 4 ; 1 3 |`, det = `2·3 - 4·1 = 6 - 4 = 2 ≠ 0` → độc lập (khớp với kết quả tự kiểm tra mục 3).</details>

### 📝 Tóm tắt mục 4

- Cách 1 (khử Gauss): xếp vector thành cột, khử Gauss, đếm pivot. Đầy đủ pivot = độc lập.
- Cách 2 (định thức): chỉ dùng khi vuông. `det ≠ 0` ⇔ độc lập.
- Định thức chỉ cho biết có/không; khử Gauss còn cho ra hệ số phụ thuộc cụ thể.

---

## 5. Basis — cơ sở của một không gian

### 5.1 Trực giác

> 💡 **Hình dung**: một thành phố cần một hệ "đường gốc" (đường Bắc-Nam, đường Đông-Tây). Mọi địa chỉ trong thành phố được mô tả bằng "đi `c₁` block theo đường Bắc-Nam, rồi `c₂` block theo đường Đông-Tây". Hai đường gốc này là **basis**. Yêu cầu: (1) cả 2 đường không trùng nhau (độc lập), (2) bằng cách chỉ đi theo 2 hướng này, ta đến được **mọi nơi** trong thành phố (span = thành phố). Bỏ một đường — không tới được nhiều địa chỉ. Thêm đường thứ 3 — thừa, vì 2 đường kia đã đủ.

### 5.2 Định nghĩa hình thức

Một tập vector `B = {b₁, ..., bₖ}` ⊂ `V` (V là một không gian vector — ví dụ `V = ℝⁿ` hoặc một subspace của `ℝⁿ`) gọi là **basis (cơ sở)** của `V` nếu thỏa mãn cả **2 điều kiện**:

1. **Độc lập tuyến tính**: `{b₁, ..., bₖ}` độc lập.
2. **Span đầy đủ**: `span(b₁, ..., bₖ) = V`.

### 5.3 Định lý nền tảng: biểu diễn duy nhất

Nếu `B = {b₁, ..., bₖ}` là basis của `V`, thì **mọi vector `v ∈ V` viết được DUY NHẤT** dưới dạng:

```
v = c₁b₁ + c₂b₂ + ... + cₖbₖ
```

Bộ `(c₁, ..., cₖ)` gọi là **toạ độ của v trong basis B**, ký hiệu `[v]_B`.

**Chứng minh** (sự tồn tại + duy nhất):

- **Tồn tại**: vì `span(B) = V` nên mọi `v` đều có ít nhất một biểu diễn.
- **Duy nhất**: giả sử có 2 biểu diễn `v = c₁b₁ + ... + cₖbₖ = d₁b₁ + ... + dₖbₖ`. Trừ hai vế: `(c₁ - d₁)b₁ + ... + (cₖ - dₖ)bₖ = 0`. Vì `B` độc lập, mọi hệ số phải = 0, tức `cᵢ = dᵢ` ∀ i. Hai biểu diễn trùng nhau.

> ❓ **Câu hỏi tự nhiên**: "Tại sao cả 2 điều kiện đều quan trọng?" — Bỏ một trong hai sẽ hỏng:
> - Chỉ độc lập, không span: thiếu vector → có `v ∈ V` không biểu diễn được. Ví dụ `B = {(1,0)}` trong `V = ℝ²`: độc lập nhưng không span được toàn ℝ², `(0,1)` không viết được.
> - Chỉ span, không độc lập: thừa vector → biểu diễn không duy nhất. Ví dụ `B = {(1,0), (0,1), (1,1)}` trong `ℝ²`: span đủ nhưng phụ thuộc, vector `(2,3)` viết được nhiều cách: `2(1,0) + 3(0,1) + 0(1,1)` hoặc `1(1,0) + 2(0,1) + 1(1,1)` hoặc `0(1,0) + 1(0,1) + 2(1,1)` ...

### 5.4 Standard basis của `ℝⁿ`

Basis quen thuộc nhất:
```
e₁ = (1, 0, 0, ..., 0)
e₂ = (0, 1, 0, ..., 0)
e₃ = (0, 0, 1, ..., 0)
...
eₙ = (0, 0, 0, ..., 1)
```

Gồm `n` vector, mỗi `eᵢ` có thành phần thứ `i` = 1, các thành phần khác = 0. Đây gọi là **standard basis (cơ sở chuẩn)** của `ℝⁿ`. Mọi vector `v = (v₁, v₂, ..., vₙ)` viết:
```
v = v₁e₁ + v₂e₂ + ... + vₙeₙ
```

Tức là: toạ độ trong standard basis chính là các thành phần của vector. Đó là lý do ta "luôn" nhìn vector dưới dạng các thành phần — vì đang ngầm dùng standard basis.

### 5.5 Walk-through tìm basis cho subspace

**Ví dụ 1**: Tìm basis cho `V = {(x, 0) : x ∈ ℝ}` (trục Ox trong `ℝ²`).

Mọi vector trong V có dạng `(x, 0) = x·(1, 0)`. Tập `{(1, 0)}` span đủ V. Và một tập 1 vector ≠ 0 luôn độc lập. → Basis: `{(1, 0)}`. Dimension = 1.

**Ví dụ 2**: Tìm basis cho `V = {(x, y, 0) : x, y ∈ ℝ}` (mặt phẳng Oxy trong `ℝ³`).

Mọi vector trong V: `(x, y, 0) = x(1,0,0) + y(0,1,0)`. Tập `{(1,0,0), (0,1,0)}` span đủ V; độc lập (xem mục 3.4 Ví dụ 5). → Basis: `{(1,0,0), (0,1,0)}`. Dimension = 2.

**Ví dụ 3**: Tìm basis cho `V = {(x, y, z) : x + y + z = 0}` (mặt phẳng qua gốc trong `ℝ³`).

Từ ràng buộc `z = -x - y`, mọi vector: `(x, y, -x-y) = x(1, 0, -1) + y(0, 1, -1)`. Tập `{(1, 0, -1), (0, 1, -1)}` span đủ V. Kiểm tra độc lập: `c₁(1,0,-1) + c₂(0,1,-1) = (c₁, c₂, -c₁-c₂) = (0,0,0) ⇒ c₁=c₂=0`. → Basis: `{(1,0,-1), (0,1,-1)}`. Dimension = 2.

**Ví dụ 4**: Tìm basis cho `V = {(t, 2t, 3t) : t ∈ ℝ}` (đường thẳng trong `ℝ³`).

`(t, 2t, 3t) = t·(1, 2, 3)`. Basis: `{(1, 2, 3)}`. Dimension = 1.

### 5.6 Một số basis "phi chuẩn" của `ℝ²`

Standard basis không phải basis duy nhất của `ℝ²`. Mọi tập 2 vector độc lập trong `ℝ²` đều là một basis.

- `B₁ = {(1, 1), (1, -1)}` — basis xoay 45°.
- `B₂ = {(2, 0), (0, 3)}` — basis "kéo dài" theo trục.
- `B₃ = {(1, 0), (1, 1)}` — basis "nghiêng".

Cùng vector `v = (3, 1)` có toạ độ khác nhau trong từng basis:

- Trong standard basis: `[v]_E = (3, 1)`.
- Trong `B₁`: giải `c₁(1,1) + c₂(1,-1) = (3,1)` → `c₁+c₂=3, c₁-c₂=1` → `c₁=2, c₂=1`. Vậy `[v]_{B₁} = (2, 1)`.
- Trong `B₂`: giải `c₁(2,0) + c₂(0,3) = (3,1)` → `c₁ = 1.5, c₂ = 1/3`. Vậy `[v]_{B₂} = (1.5, 1/3)`.
- Trong `B₃`: giải `c₁(1,0) + c₂(1,1) = (3,1)` → `c₁+c₂=3, c₂=1` → `c₁=2, c₂=1`. Vậy `[v]_{B₃} = (2, 1)`.

Cùng một mũi tên trong mặt phẳng — chỉ là **thước đo khác nhau** thì cho ra **toạ độ khác nhau**. Vector không đổi.

> ⚠ **Lỗi thường gặp**: nghĩ rằng "vector và toạ độ là một". Vector là đối tượng hình học (mũi tên / điểm); toạ độ là cặp số phụ thuộc vào basis ta chọn. Đây là điểm chuyển hoá tư duy quan trọng nhất bài này.

> 🔁 **Tự kiểm tra**: Tìm basis cho `V = {(a, b, a+b) : a, b ∈ ℝ}`. <details><summary>Đáp án</summary>`(a, b, a+b) = a(1,0,1) + b(0,1,1)`. Basis `{(1,0,1), (0,1,1)}`, dimension 2.</details>

### 📝 Tóm tắt mục 5

- Basis = độc lập + span đủ V.
- Trong basis B, mỗi vector có **duy nhất** một bộ toạ độ.
- Standard basis của `ℝⁿ` = `{e₁, ..., eₙ}`.
- Một không gian có **vô số** basis khác nhau.

---

## 6. Dimension — số chiều

### 6.1 Định nghĩa

**Dimension (số chiều)** của một không gian vector `V`, ký hiệu `dim(V)`, là **số phần tử trong một basis của V**.

Tức là: chọn một basis bất kỳ, đếm số vector — đó là dimension.

### 6.2 Định lý: dim không phụ thuộc cách chọn basis

> **Định lý (nền tảng)**: mọi basis của cùng một không gian `V` đều có cùng số phần tử.

**Phác thảo chứng minh** (không đi sâu, vì cần lý thuyết hệ phương trình — nhưng ý chính):

Giả sử `V` có 2 basis `B₁ = {b₁, ..., bₘ}` và `B₂ = {b'₁, ..., b'ₙ}`. Vì `B₂` ⊂ `V = span(B₁)`, mỗi `b'ⱼ` viết được dưới dạng combination của `B₁` — tạo thành ma trận hệ số `M` cỡ `m × n`. Nếu `n > m`, hệ `Mx = 0` (với `x ∈ ℝⁿ`) có nhiều ẩn hơn phương trình → có nghiệm không tầm thường → `B₂` phụ thuộc → mâu thuẫn (vì basis phải độc lập). Vậy `n ≤ m`. Tương tự `m ≤ n`. Suy ra `m = n`.

### 6.3 Một số ví dụ dimension

| Không gian | Basis | dim |
|------------|-------|-----|
| `ℝ¹` | `{1}` (hoặc `{e₁}`) | 1 |
| `ℝ²` | `{(1,0), (0,1)}` | 2 |
| `ℝ³` | `{(1,0,0), (0,1,0), (0,0,1)}` | 3 |
| `ℝⁿ` | `{e₁, ..., eₙ}` | n |
| Trục Ox trong `ℝ²` | `{(1,0)}` | 1 |
| Mặt phẳng `z = 0` trong `ℝ³` | `{(1,0,0), (0,1,0)}` | 2 |
| `{(t, 2t, 3t)}` trong `ℝ³` | `{(1,2,3)}` | 1 |
| `{0}` (không gian zero) | `{}` (tập rỗng) | 0 |

### 6.4 Tính chất quan trọng

- `dim(V) ≤ dim` của không gian xung quanh. Subspace của `ℝⁿ` luôn có `dim ≤ n`.
- Nếu `W ⊂ V` là subspace thật sự (`W ≠ V`) thì `dim(W) < dim(V)`.
- Trong `ℝⁿ`, tập có < n vector **không thể** span đủ; tập có > n vector **không thể** độc lập. Tập đúng `n` vector: độc lập ⇔ span đủ ⇔ là basis (chỉ cần kiểm tra 1 trong 2 điều kiện).

> ❓ **Câu hỏi tự nhiên**: "Có không gian vô hạn chiều không?" — Có. Ví dụ tập đa thức `ℝ[x]` (mọi đa thức 1 biến) có basis `{1, x, x², x³, ...}` — vô hạn phần tử. Tầng 4 này chỉ làm việc với không gian hữu hạn chiều.

### 📝 Tóm tắt mục 6

- `dim(V)` = số phần tử trong một basis bất kỳ của V.
- Định lý: mọi basis của cùng V có cùng số phần tử.
- Trong `ℝⁿ`: subspace có thể có dim từ 0 (chỉ vector 0) tới n (toàn `ℝⁿ`).

---

## 7. Thay đổi basis (change of basis) — giới thiệu

Đây chỉ là **preview**; sẽ học chi tiết ở [Lesson 06](../lesson-06-matrix-as-transform/) và [Lesson 07](../lesson-07-eigenvectors/).

### 7.1 Ý tưởng

Cùng một vector hình học có **toạ độ khác nhau** trong các basis khác nhau (xem mục 5.6). Vậy có công thức chuyển đổi giữa các basis không? Có.

Cho `B = {b₁, ..., bₙ}` là basis của `ℝⁿ`. Ma trận `P_B = [b₁ | b₂ | ... | bₙ]` (xếp các vector basis thành cột) gọi là **change-of-basis matrix** từ `B` sang standard basis.

```
v = P_B · [v]_B
```

(Toạ độ standard của v = P_B nhân với toạ độ trong B.)

Ngược lại:
```
[v]_B = P_B⁻¹ · v
```

### 7.2 Walk-through

`B = {(1, 1), (1, -1)}`, `v = (3, 1)` (trong standard).

`P_B = | 1  1 |`
       `| 1 -1 |`

`P_B⁻¹ = (1 / det) · | -1 -1 | = (1/-2) · | -1 -1 | = | 1/2  1/2 |`
                    `| -1  1 |            | -1  1 |   | 1/2 -1/2 |`

`[v]_B = P_B⁻¹ · (3, 1) = (1/2·3 + 1/2·1, 1/2·3 - 1/2·1) = (2, 1)` — khớp với mục 5.6.

### 7.3 Liên hệ Tầng 2 (rotation matrix)

[Trigonometry Lesson — Rotation matrix](../../02-Trigonometry/) đã dạy: ma trận xoay 1 góc `θ`:
```
R(θ) = | cos θ  -sin θ |
       | sin θ   cos θ |
```
Đây chính là **change-of-basis matrix** từ basis xoay `{(cos θ, sin θ), (-sin θ, cos θ)}` sang standard basis. "Xoay vector" và "đổi basis" là 2 cách nhìn đối ngẫu của cùng một thao tác.

### 📝 Tóm tắt mục 7

- Đổi basis ↔ nhân với một ma trận khả nghịch.
- Ma trận xoay của Tầng 2 = một trường hợp đặc biệt của change-of-basis.
- Sẽ học sâu ở Lesson 06 (linear transformation) và Lesson 07 (eigenbasis).

---

## 8. Subspace — không gian con

### 8.1 Định nghĩa

`W ⊂ V` (V là không gian vector, ví dụ `V = ℝⁿ`) là **subspace (không gian con)** của V nếu thoả mãn cả 3 điều kiện:

1. **Chứa vector 0**: `0 ∈ W`.
2. **Đóng dưới phép cộng**: ∀ `u, v ∈ W` ⇒ `u + v ∈ W`.
3. **Đóng dưới scalar multiplication**: ∀ `v ∈ W`, ∀ `c ∈ ℝ` ⇒ `c·v ∈ W`.

Tương đương ngắn gọn: `W` đóng dưới mọi linear combination.

### 8.2 Một số subspace điển hình của `ℝ³`

| Subspace | Mô tả | Dim |
|----------|-------|-----|
| `{(0, 0, 0)}` | chỉ vector 0 | 0 |
| `{(t, 0, 0) : t ∈ ℝ}` | trục Ox | 1 |
| `{(t, 2t, 3t) : t ∈ ℝ}` | đường thẳng qua gốc theo `(1,2,3)` | 1 |
| `{(x, y, 0) : x, y ∈ ℝ}` | mặt phẳng Oxy | 2 |
| `{(x, y, z) : x + y + z = 0}` | mặt phẳng qua gốc (hyperplane Ax = 0) | 2 |
| `ℝ³` toàn bộ | toàn không gian | 3 |

**Mọi subspace của `ℝ³`** chỉ có thể là một trong 4 dạng: `{0}`, đường thẳng qua gốc, mặt phẳng qua gốc, toàn `ℝ³`.

### 8.3 Walk-through kiểm tra

**Ví dụ 1**: `W = {(x, y) : y = 2x}` có là subspace của `ℝ²`?

- Chứa 0? `(0, 0)`: `0 = 2·0` ✓.
- Đóng cộng? `(x₁, 2x₁) + (x₂, 2x₂) = (x₁+x₂, 2(x₁+x₂))` — thoả `y = 2x` ✓.
- Đóng scalar? `c·(x, 2x) = (cx, 2cx)` — thoả ✓.

→ Là subspace, dim = 1.

**Ví dụ 2**: `W = {(x, y) : y = 2x + 1}` có là subspace?

- Chứa 0? `(0, 0)`: `0 = 2·0 + 1 = 1`? Sai. **Không** chứa 0 → KHÔNG là subspace.

(Đường thẳng `y = 2x + 1` không đi qua gốc → không subspace.)

**Ví dụ 3**: `W = {(x, y) : x ≥ 0}` (nửa mặt phẳng phải) có là subspace?

- Đóng scalar với `c < 0`? Lấy `v = (1, 0) ∈ W`, `c = -1`: `c·v = (-1, 0)` có `x = -1 < 0` → không ∈ W. **Không** đóng scalar → KHÔNG là subspace.

**Ví dụ 4**: `W = {(x, y) : x² + y² ≤ 1}` (đĩa đơn vị) có là subspace?

- Đóng cộng? `(1, 0) + (0, 1) = (1, 1)` có `1² + 1² = 2 > 1` → không ∈ W. KHÔNG.

**Ví dụ 5**: `W = {(x, y, z) : x + 2y - z = 0}` có là subspace của `ℝ³`?

- Chứa 0: `0 + 0 - 0 = 0` ✓.
- Đóng cộng: nếu `x₁+2y₁-z₁=0` và `x₂+2y₂-z₂=0`, cộng: `(x₁+x₂) + 2(y₁+y₂) - (z₁+z₂) = 0` ✓.
- Đóng scalar: nếu `x+2y-z=0` thì `cx+2cy-cz = c(x+2y-z) = 0` ✓.

→ Là subspace. Là mặt phẳng qua gốc. Tìm basis: từ `z = x + 2y`, mọi vector `(x, y, x+2y) = x(1,0,1) + y(0,1,2)`. Basis: `{(1,0,1), (0,1,2)}`. Dim = 2.

### 8.4 Hyperplane `Ax = 0` — subspace tổng quát

Tổng quát: tập **nghiệm của hệ phương trình thuần nhất** `Ax = 0` (với A là ma trận cho trước) luôn là một subspace. Đây gọi là **null space (kernel)** của A — sẽ học chi tiết ở [Lesson 06](../lesson-06-matrix-as-transform/).

Ngược lại, tập nghiệm của `Ax = b` với `b ≠ 0` **không** là subspace (không chứa 0).

> ⚠ **Lỗi thường gặp**: nhầm "mặt phẳng" với "subspace 2 chiều". Mặt phẳng trong `ℝ³` chỉ là subspace **nếu đi qua gốc**. Mặt phẳng `z = 1` (song song với Oxy nhưng cao hơn 1 đơn vị) **không** là subspace.

> 🔁 **Tự kiểm tra**: `W = {(x, y, z) : 2x - y = 0 và z = 0}` có là subspace? Tìm basis nếu có. <details><summary>Đáp án</summary>Chứa 0 ✓. Đóng cộng & scalar (cả 2 phương trình thuần nhất) ✓. Từ `y = 2x, z = 0`: vector dạng `(x, 2x, 0) = x(1, 2, 0)`. Basis `{(1, 2, 0)}`, dim = 1.</details>

### 📝 Tóm tắt mục 8

- Subspace = đóng dưới cộng + scalar; phải chứa 0.
- Subspace của `ℝⁿ` đi qua gốc.
- Mọi đường/mặt qua gốc trong `ℝ³` là subspace; không qua gốc thì không.
- Nghiệm của `Ax = 0` là subspace; nghiệm của `Ax = b ≠ 0` thì không.

---

## 9. Liên hệ với Machine Learning / AI

Đây là điểm nối quan trọng. Hiểu basis = hiểu vì sao PCA, embedding, regression đều "vận hành cùng cơ chế".

### 9.1 PCA — tìm basis tốt nhất cho dữ liệu

PCA (Principal Component Analysis) — sẽ học ở [Lesson 08](../lesson-08-pca-svd/) — đặt câu hỏi: cho tập dữ liệu trong `ℝⁿ`, có **basis nào tốt hơn standard basis không**?

"Tốt hơn" nghĩa là: nếu ta vứt bớt vài chiều, mất ít thông tin nhất. Standard basis treat mọi chiều bình đẳng; PCA tìm basis sao cho chiều thứ nhất là hướng có **phương sai lớn nhất** của dữ liệu, chiều thứ hai là hướng có phương sai lớn thứ nhì (và vuông góc với chiều 1), v.v.

PCA = **đổi basis** từ standard sang basis của eigenvectors của ma trận hiệp phương sai. Sau khi đổi basis, vứt bớt chiều cuối (phương sai nhỏ) → giảm chiều mà giữ được hầu hết thông tin.

### 9.2 Embedding dimension trong NLP / Deep Learning

Khi nghe "embedding 768 chiều" (BERT) hay "1536 chiều" (OpenAI text-embedding-3), ý là: mỗi token / câu / tài liệu được biểu diễn bằng một vector trong `ℝ⁷⁶⁸` (hay `ℝ¹⁵³⁶`).

- Không gian này có dimension = 768 → có basis 768 vector.
- Mỗi thành phần của embedding = toạ độ theo một trục basis (mà mô hình tự học).
- 768 trục này KHÔNG phải standard basis có ý nghĩa — chúng là kết quả huấn luyện, mỗi trục thường không "đại diện cho 1 ý" rõ ràng (interpretable).

Câu chuyện về **dimensionality**: vì sao 768 chiều, không phải 10? Vì cần đủ "không gian" để các khái niệm khác nhau **độc lập tuyến tính** với nhau. 10 chiều quá ít, các vector embedding sẽ chồng lấn (phụ thuộc tuyến tính) → mô hình không phân biệt được tinh tế. 100,000 chiều thì lãng phí, không gian quá rỗng.

### 9.3 Linear regression — y ∈ span của cột X

Bài toán: cho ma trận đặc trưng `X` cỡ `m × n` (m mẫu, n đặc trưng), nhãn `y ∈ ℝᵐ`. Tìm `w ∈ ℝⁿ` sao cho `Xw ≈ y`.

Mọi vector dạng `Xw` đều là một linear combination các cột của X (với hệ số w). Vậy `{Xw : w ∈ ℝⁿ} = span(các cột của X)` — đây là **column space** của X, một subspace của `ℝᵐ`.

Linear regression = tìm vector trong column space gần `y` nhất theo L2 — chính là **projection** của `y` lên column space (đã học ở [Lesson 03](../lesson-03-norm-distance/)).

- Nếu cột của X **độc lập** (rank đầy đủ) → nghiệm `w` duy nhất.
- Nếu cột X **phụ thuộc** (multicollinearity) → vô số nghiệm `w` cho cùng giá trị `Xw` (tệ cho diễn giải hệ số). Thực tế: phải thêm regularization (ridge, lasso) — sẽ học sau.

### 9.4 Word embedding và analogies

Phép tính nổi tiếng `king - man + woman ≈ queen` trong word2vec / GloVe — đây chính là **linear combination** của các vector embedding. Việc analogy "chạy được" ngụ ý: trong không gian embedding, hướng "gender" (woman - man) và hướng "royalty" gần như **độc lập tuyến tính** → có thể "cộng / trừ" mà không xung đột.

### 📝 Tóm tắt mục 9

- PCA = đổi basis để tối ưu phương sai.
- Embedding 768D = không gian 768 chiều, mỗi thành phần là toạ độ theo 1 trục basis (model học).
- Linear regression: y ≈ projection của y lên column space của X.
- Word analogies = linear combination trong không gian embedding.

---

## 10. Bài tập

Mỗi bài có lời giải chi tiết ở mục **Lời giải** bên dưới.

**Bài 1.** Cho `v₁ = (1, 2)`, `v₂ = (3, -1)`. Viết vector `(7, 0)` dưới dạng linear combination của `v₁, v₂`.

**Bài 2.** Kiểm tra tập `{(1, 2, 3), (4, 5, 6), (1, 1, 1)}` độc lập hay phụ thuộc tuyến tính. Nếu phụ thuộc, tìm một hệ số phụ thuộc cụ thể.

**Bài 3.** `W = {(x, y, z) ∈ ℝ³ : 2x - y + 3z = 0}`. Chứng minh `W` là subspace; tìm basis và dimension.

**Bài 4.** Cho `B = {(2, 1), (1, 3)}` là basis của `ℝ²`. Tìm `[v]_B` (toạ độ trong B) của vector `v = (5, 5)`.

**Bài 5.** Giải thích vì sao trong `ℝ²`, mọi tập 3 vector đều phụ thuộc tuyến tính. (Dùng định nghĩa và lập luận theo hệ phương trình.)

**Bài 6.** Cho dataset 4 điểm 2D: `(1, 2), (2, 4), (3, 6), (4, 8)`. Coi mỗi điểm là một vector, gom 4 vector này thành ma trận và tìm rank. Liên hệ kết quả với khái niệm "đa cộng tuyến (multicollinearity)" trong linear regression: vì sao dataset này "tệ" để học hồi quy?

---

## Lời giải chi tiết

### Bài 1

Giải hệ `c₁(1, 2) + c₂(3, -1) = (7, 0)`:
```
c₁ + 3c₂ = 7
2c₁ - c₂ = 0  →  c₂ = 2c₁
```

Thay vào pt 1: `c₁ + 6c₁ = 7c₁ = 7 → c₁ = 1`. Suy ra `c₂ = 2`.

**Kiểm tra**: `1·(1,2) + 2·(3,-1) = (1+6, 2-2) = (7, 0)` ✓.

**Đáp án**: `(7, 0) = 1·v₁ + 2·v₂`.

### Bài 2

Xếp 3 vector thành cột của ma trận:
```
A = | 1  4  1 |
    | 2  5  1 |
    | 3  6  1 |
```

**Cách 1: định thức** (vì ma trận vuông 3×3):
```
det(A) = 1·(5·1 - 1·6) - 4·(2·1 - 1·3) + 1·(2·6 - 5·3)
       = 1·(5 - 6) - 4·(2 - 3) + 1·(12 - 15)
       = -1 + 4 - 3
       = 0
```
→ **Phụ thuộc**.

**Cách 2: tìm hệ số phụ thuộc** (khử Gauss để có giá trị cụ thể):
- `R₂ ← R₂ - 2R₁`: `| 1 4 1 | | 0 -3 -1 | | 3 6 1 |`
- `R₃ ← R₃ - 3R₁`: `| 1 4 1 | | 0 -3 -1 | | 0 -6 -2 |`
- `R₃ ← R₃ - 2R₂`: `| 1 4 1 | | 0 -3 -1 | | 0 0 0 |`

Đặt `c₃ = t` (tự do). Từ R₂: `-3c₂ - c₃ = 0 → c₂ = -t/3`. Từ R₁: `c₁ + 4c₂ + c₃ = 0 → c₁ = -4(-t/3) - t = 4t/3 - t = t/3`.

Chọn `t = 3`: `(c₁, c₂, c₃) = (1, -1, 3)`. **Kiểm tra**: `1·(1,2,3) + (-1)·(4,5,6) + 3·(1,1,1) = (1-4+3, 2-5+3, 3-6+3) = (0, 0, 0)` ✓.

**Đáp án**: phụ thuộc; hệ số `(1, -1, 3)`, tức `v₁ - v₂ + 3v₃ = 0`.

### Bài 3

**Chứng minh `W` là subspace**:

- Chứa 0: `2·0 - 0 + 3·0 = 0` ✓.
- Đóng cộng: `2(x₁+x₂) - (y₁+y₂) + 3(z₁+z₂) = (2x₁-y₁+3z₁) + (2x₂-y₂+3z₂) = 0+0 = 0` ✓.
- Đóng scalar: `2(cx) - (cy) + 3(cz) = c(2x-y+3z) = c·0 = 0` ✓.

→ Là subspace.

**Tìm basis**: từ ràng buộc `y = 2x + 3z`, mọi vector trong W: `(x, 2x+3z, z) = x(1, 2, 0) + z(0, 3, 1)`. Tập `{(1,2,0), (0,3,1)}` span đủ W.

**Kiểm tra độc lập**: `c₁(1,2,0) + c₂(0,3,1) = (c₁, 2c₁+3c₂, c₂) = (0,0,0)`. Từ thành phần 1: `c₁ = 0`. Từ thành phần 3: `c₂ = 0`. → Độc lập.

**Đáp án**: Basis = `{(1, 2, 0), (0, 3, 1)}`, **dim(W) = 2**.

### Bài 4

Giải `c₁(2, 1) + c₂(1, 3) = (5, 5)`:
```
2c₁ + c₂ = 5
c₁ + 3c₂ = 5
```

Nhân pt 1 với 3: `6c₁ + 3c₂ = 15`. Trừ pt 2: `5c₁ = 10 → c₁ = 2`. Thay: `c₂ = 5 - 4 = 1`.

**Kiểm tra**: `2·(2,1) + 1·(1,3) = (5, 5)` ✓.

**Đáp án**: `[v]_B = (2, 1)`.

### Bài 5

Giả sử `v₁ = (a₁, a₂), v₂ = (b₁, b₂), v₃ = (c₁, c₂)` là 3 vector tuỳ ý trong `ℝ²`. Xét phương trình:

```
x₁v₁ + x₂v₂ + x₃v₃ = 0
```

Tách thành 2 phương trình theo thành phần:
```
a₁x₁ + b₁x₂ + c₁x₃ = 0
a₂x₁ + b₂x₂ + c₂x₃ = 0
```

Đây là hệ **2 phương trình, 3 ẩn**. Theo lý thuyết hệ tuyến tính ([Algebra Lesson 08](../../01-Algebra/lesson-08-systems/)): nếu số ẩn > số phương trình, hệ thuần nhất luôn có **vô số nghiệm**, đặc biệt có nghiệm khác `(0, 0, 0)`.

→ Tồn tại `(x₁, x₂, x₃) ≠ 0` thoả mãn → **phụ thuộc tuyến tính**.

**Tổng quát**: trong `ℝⁿ`, bất kỳ tập nào có > n vector đều phụ thuộc, vì hệ có > n ẩn nhưng chỉ n phương trình.

### Bài 6

4 vector: `(1,2), (2,4), (3,6), (4,8)`. Để ý: `(2,4) = 2·(1,2)`, `(3,6) = 3·(1,2)`, `(4,8) = 4·(1,2)`. Tất cả đều cùng phương `(1,2)`.

Gom thành ma trận (mỗi vector là một cột):
```
A = | 1  2  3  4 |
    | 2  4  6  8 |
```

Khử Gauss: `R₂ ← R₂ - 2R₁`: `| 1 2 3 4 | | 0 0 0 0 |`. Chỉ có 1 pivot → **rank(A) = 1**.

**Liên hệ với linear regression**: trong hồi quy `y = w₁x₁ + w₂x₂ + b`, nếu 2 đặc trưng `x₁, x₂` có quan hệ `x₂ = 2x₁` (hoàn toàn cộng tuyến), thì cột của ma trận thiết kế phụ thuộc tuyến tính. Hậu quả:

- Nghiệm `(w₁, w₂)` **không duy nhất**: mọi cặp `(w₁, w₂)` với `w₁ + 2w₂ = const` cho cùng dự đoán.
- Diễn giải hệ số (feature importance) trở nên **vô nghĩa** — không thể nói "x₁ quan trọng hơn x₂" vì chỉ có hợp tuyến mới xác định.
- Nghịch ma trận `XᵀX` **không khả nghịch** (det = 0) → công thức nghiệm chuẩn `w = (XᵀX)⁻¹Xᵀy` không dùng được.

**Khắc phục**: bỏ đặc trưng dư thừa, hoặc dùng regularization (ridge regression: thêm `λI` vào `XᵀX` để luôn khả nghịch).

**Bài học**: rank của ma trận đặc trưng = số "đặc trưng độc lập" thực sự. Đa cộng tuyến (multicollinearity) = cột phụ thuộc tuyến tính, tương đương rank thiếu.

---

## Liên kết

- **Lesson trước**: [Lesson 03 — Norm và khoảng cách](../lesson-03-norm-distance/)
- **Lesson tiếp theo**: [Lesson 05 — Ma trận: phép toán](../lesson-05-matrices/) (sẽ dùng basis để biểu diễn linear map).
- **Sẽ gặp lại**:
  - [Lesson 06 — Ma trận = biến đổi](../lesson-06-matrix-as-transform/): column space, null space — đều là subspace.
  - [Lesson 07 — Eigenvector](../lesson-07-eigenvectors/): eigenvectors tạo thành một basis "đặc biệt" mà ma trận trở thành đường chéo.
  - [Lesson 08 — PCA & SVD](../lesson-08-pca-svd/): PCA = đổi sang basis của eigenvectors.
- **Tham chiếu chéo**:
  - [Algebra Lesson 08](../../01-Algebra/lesson-08-systems/): hệ phương trình tuyến tính — công cụ chính kiểm tra độc lập.
  - [Trigonometry — Rotation](../../02-Trigonometry/): rotation matrix = trường hợp đặc biệt của change-of-basis.

- **Visualization**: [visualization.html](./visualization.html) — span explorer, independence checker, basis explorer, subspace gallery.
