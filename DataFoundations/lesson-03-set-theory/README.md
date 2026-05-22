# Lesson 03 — Set Theory (lý thuyết tập hợp)

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Hiểu định nghĩa tập hợp, phần tử, phần tử rỗng — và **vì sao thứ tự / lặp không quan trọng** trong tập.
- Sử dụng thành thạo các phép toán: hợp (union), giao (intersection), hiệu (difference), hiệu đối xứng (symmetric difference), phần bù (complement).
- Hiểu các quan hệ: tập con (subset), bằng (equal), rời nhau (disjoint).
- Hiểu **ánh xạ (function/mapping)** — nền cho hash function.
- Hiểu **quan hệ tương đương (equivalence relation)** — nền cho Union-Find.
- Cài đặt set trong Go bằng `map[T]struct{}` (cách Go-idiomatic) và bằng bitmask khi tập nhỏ.

## Kiến thức tiền đề

- [Lesson 01 — Binary & Hex](../lesson-01-binary-hex/) (tùy chọn — chỉ cần cho phần bitmask).
- [Lesson 02 — Bitwise Operations](../lesson-02-bitwise-ops/) (tùy chọn — phần §6 dùng bitmask để cài set).

## 1. Vì sao học lý thuyết tập hợp trước data structure?

Vì các cấu trúc dữ liệu sau **trực tiếp là tập hợp** hoặc xây trên khái niệm tập:

- **HashSet** = một tập hợp.
- **HashMap** = ánh xạ (function) từ tập key sang tập value.
- **Union-Find** = quản lý các **lớp tương đương** trên một tập phần tử.
- **Graph** = (tập đỉnh `V`, tập cạnh `E`); cạnh là phần tử của `V × V`.
- **Bloom filter** = xấp xỉ kiểm tra `x ∈ S`.

Khi bạn nói "thêm vào hash set", "kiểm tra đã thăm chưa", "hai đỉnh có cùng component không" — đằng sau đó là phép toán tập hợp. Hiểu set theory giúp đặt tên và phát biểu bài toán chính xác.

## 2. Tập hợp là gì?

### 2.1. Định nghĩa thực dụng

**Tập hợp (set)** là một **bộ sưu tập (collection) các phần tử (element) phân biệt, không có thứ tự cố định.**

Hai tính chất quan trọng:

1. **Không lặp**: một phần tử thuộc tập hoặc không, không có khái niệm "thuộc 2 lần".
2. **Không thứ tự**: `{1, 2, 3}` và `{3, 1, 2}` là cùng một tập.

So với **danh sách / mảng**:

| | List/Array | Set |
| --- | --- | --- |
| Có thứ tự? | Có | Không |
| Cho phép lặp? | Có | Không |
| Câu hỏi điển hình | "phần tử thứ 3 là gì?" | "x có ở trong không?" |

→ Khi bài toán hỏi *"có chứa không?"* (membership), nghĩ ngay tới set. Khi bài toán quan tâm thứ tự hoặc lặp, dùng list.

### 2.2. Ký hiệu

- `∈`: "thuộc". Vd `3 ∈ {1, 2, 3}`.
- `∉`: "không thuộc". Vd `5 ∉ {1, 2, 3}`.
- `∅` hoặc `{}`: **tập rỗng (empty set)** — tập không có phần tử nào.
- `|A|`: **lực lượng (cardinality)** — số phần tử của A. Vd `|{1, 2, 3}| = 3`.

### 2.3. Cách định nghĩa một tập

**Liệt kê (roster)**: `A = {1, 2, 3, 4, 5}`.

**Mô tả tính chất (set-builder)**: `A = {x ∈ ℕ : 1 ≤ x ≤ 5}` (đọc: "tập các số tự nhiên x sao cho 1 ≤ x ≤ 5"). Cách này dùng cho tập vô hạn hoặc khi liệt kê dài: `B = {x ∈ ℤ : x chia hết cho 3}`.

### 2.4. Vũ trụ (universe)

Khi nói tới *phần bù*, ta phải có một **vũ trụ U** — tập "tất cả mọi thứ ta đang xét". Vd nếu vũ trụ là `U = {1, 2, ..., 10}`, thì phần bù của `A = {1, 3, 5}` là `U \ A = {2, 4, 6, 7, 8, 9, 10}`.

Nếu không nêu vũ trụ, "phần bù" không có nghĩa cụ thể.

## 3. Các phép toán trên tập

Cho hai tập:
```
A = {1, 2, 3, 4}
B = {3, 4, 5, 6}
```

### 3.1. Hợp (Union) — `A ∪ B`

Mọi phần tử thuộc A **hoặc** B (hoặc cả hai).

```
A ∪ B = {1, 2, 3, 4, 5, 6}
```

Cài đặt Go (dùng `map[int]struct{}` là cách Go-idiomatic, sẽ giải thích ở §6):

```go
func union(a, b map[int]struct{}) map[int]struct{} {
    result := map[int]struct{}{}
    for x := range a { result[x] = struct{}{} }
    for x := range b { result[x] = struct{}{} }
    return result
}
```

### 3.2. Giao (Intersection) — `A ∩ B`

Mọi phần tử thuộc **cả** A và B.

```
A ∩ B = {3, 4}
```

### 3.3. Hiệu (Difference) — `A \ B` hoặc `A − B`

Mọi phần tử thuộc A nhưng **không** thuộc B.

```
A \ B = {1, 2}      (loại 3, 4 vì cũng ∈ B)
B \ A = {5, 6}      (chú ý: không giao hoán!)
```

### 3.4. Hiệu đối xứng (Symmetric difference) — `A △ B`

Mọi phần tử thuộc **đúng một** trong hai (không thuộc cả hai).

```
A △ B = (A \ B) ∪ (B \ A) = {1, 2, 5, 6}
```

Tương đương `(A ∪ B) \ (A ∩ B)`.

→ Đây chính xác là **XOR ở cấp tập**, và là lý do `^` (XOR bit) tương đương với `△` khi tập biểu diễn bằng bitmask (xem [Lesson 02 §5.3](../lesson-02-bitwise-ops/#53-phép-toán-tập-trên-bitmask)).

### 3.5. Phần bù (Complement) — `Aᶜ` hoặc `Ā` (cần vũ trụ U)

Mọi phần tử của U mà **không** thuộc A.

```
U = {1, 2, ..., 10}
A = {1, 2, 3, 4}
Aᶜ = {5, 6, 7, 8, 9, 10}
```

### 3.6. Bảng tổng hợp (kèm bitwise tương đương)

| Phép tập | Ký hiệu | Định nghĩa | Bitwise (khi dùng bitmask) |
| --- | --- | --- | --- |
| Hợp | `A ∪ B` | x ∈ A ∨ x ∈ B | `A \| B` |
| Giao | `A ∩ B` | x ∈ A ∧ x ∈ B | `A & B` |
| Hiệu | `A \ B` | x ∈ A ∧ x ∉ B | `A &^ B` |
| Hiệu đối xứng | `A △ B` | x ∈ A ⊕ x ∈ B | `A ^ B` |
| Phần bù | `Aᶜ` | x ∈ U ∧ x ∉ A | `(^A) & maskU` |

## 4. Quan hệ giữa các tập

### 4.1. Tập con (Subset) — `A ⊆ B`

A là tập con của B nếu **mọi phần tử của A đều thuộc B**.

```
{1, 2} ⊆ {1, 2, 3}    ✓
{1, 4} ⊆ {1, 2, 3}    ✗   (4 ∉ B)
∅ ⊆ B                 ✓   với mọi B (tập rỗng là tập con của mọi tập)
A ⊆ A                 ✓   với mọi A
```

**Tập con thực sự (proper subset)**: `A ⊂ B` nghĩa là `A ⊆ B` **và** `A ≠ B`.

Kiểm tra bằng bitwise: `A ⊆ B ↔ (A &^ B) == 0` (mọi bit của A đều có trong B → trừ B đi không còn gì).

### 4.2. Bằng nhau — `A = B`

`A = B ↔ A ⊆ B ∧ B ⊆ A`. Hai tập bằng nhau nếu có cùng các phần tử (bất kể thứ tự liệt kê).

### 4.3. Rời nhau (Disjoint)

A và B rời nhau nếu `A ∩ B = ∅`.

```
{1, 2} ∩ {3, 4} = ∅   → rời nhau
{1, 2} ∩ {2, 3} = {2} → không rời nhau
```

### 4.4. Tập lũy thừa (Power set) — `P(A)`

`P(A)` = tập **tất cả tập con** của A.

```
A = {a, b, c}
P(A) = { ∅, {a}, {b}, {c}, {a,b}, {a,c}, {b,c}, {a,b,c} }   // 8 phần tử
```

Số lượng tập con: `|P(A)| = 2^|A|`. Đây là lý do bitmask với `n` bit liệt kê được đúng `2ⁿ` tập con — xem [Lesson 02 §5](../lesson-02-bitwise-ops/#5-bitmask-cho-tập-hợp-con).

### 4.5. Tích Descartes (Cartesian product) — `A × B`

`A × B` = tập các **cặp có thứ tự** `(a, b)` với `a ∈ A, b ∈ B`.

```
A = {1, 2}
B = {x, y}
A × B = { (1, x), (1, y), (2, x), (2, y) }
```

`|A × B| = |A| · |B|`. Đây là nền của **đồ thị**: tập cạnh `E ⊆ V × V`.

## 5. Ánh xạ (Function/Mapping) — nền cho HashMap

### 5.1. Định nghĩa

**Ánh xạ** `f: A → B` gán **mỗi** phần tử của A cho **đúng một** phần tử của B.

- `A` là **miền xác định (domain)**.
- `B` là **miền giá trị (codomain)**.

Ví dụ:
- `f: ℝ → ℝ, f(x) = x²` — hàm bình phương.
- `length: string → ℕ, length("hello") = 5`.
- `hash: string → uint64` — hash function.

### 5.2. Đặc tính: injective, surjective, bijective

| Tên | Định nghĩa | Trực giác |
| --- | --- | --- |
| **Injective** (đơn ánh) | `f(x) = f(y) ⇒ x = y` | mỗi giá trị B chỉ có TỐI ĐA 1 phần tử A ánh xạ tới |
| **Surjective** (toàn ánh) | mọi `b ∈ B`, tồn tại `a ∈ A` với `f(a) = b` | mọi giá trị B đều được "chạm" |
| **Bijective** (song ánh) | injective ∧ surjective | một-một và phủ toàn bộ B |

**Liên hệ tới hash**: hash function `h: string → uint64` lý tưởng là gần injective (ít va chạm). Nhưng vì `|string| > |uint64|` (string có vô hạn, uint64 hữu hạn), **không thể** injective tuyệt đối → luôn có **va chạm (collision)**. Đây là lý do hash table phải xử lý collision (chaining, open addressing) — sẽ học trong [Hash Table](../../DataStructures/lesson-05-hash-table/).

### 5.3. HashMap = ánh xạ partial

Trong code:

```go
m := map[string]int{"alice": 30, "bob": 25}
```

`m` là ánh xạ từ tập key đã thêm sang `int`. Nó là **partial function**: chỉ định nghĩa trên các key đã put, các key khác trả về zero value.

## 6. Quan hệ tương đương — nền cho Union-Find

### 6.1. Quan hệ là gì?

**Quan hệ R** trên một tập A là một tập con của `A × A`. "a R b" nghĩa là cặp `(a, b)` ∈ R.

Ví dụ trên `A = {1, 2, 3, 4}`:
- Quan hệ `<`: `{ (1,2), (1,3), (1,4), (2,3), (2,4), (3,4) }`.
- Quan hệ "có cùng tính chẵn lẻ": `{ (1,1), (1,3), (3,1), (2,2), (2,4), ... }`.

### 6.2. Quan hệ tương đương (equivalence relation)

R là **quan hệ tương đương** nếu thỏa mãn cả ba:

1. **Phản xạ (reflexive)**: `a R a` với mọi a. (Mỗi phần tử quan hệ với chính nó.)
2. **Đối xứng (symmetric)**: `a R b ⇒ b R a`.
3. **Bắc cầu (transitive)**: `a R b ∧ b R c ⇒ a R c`.

Ví dụ:
- "có cùng tính chẵn lẻ" trên ℤ: ✓ tương đương.
- "đồng dư mod 7" trên ℤ: ✓ tương đương.
- "là bạn của" trên tập người: thường không bắc cầu → ✗.

### 6.3. Lớp tương đương (equivalence class)

Khi có quan hệ tương đương R, tập A được **chia (partition)** thành các nhóm rời nhau, mỗi nhóm gồm các phần tử tương đương với nhau. Mỗi nhóm gọi là một **lớp tương đương**.

Ví dụ "đồng dư mod 3" trên `{0, 1, ..., 8}` chia thành:
- `{0, 3, 6}` — chia 3 dư 0
- `{1, 4, 7}` — chia 3 dư 1
- `{2, 5, 8}` — chia 3 dư 2

**Tính chất quan trọng**: các lớp tương đương **rời nhau từng đôi một**, và **hợp của chúng = toàn bộ A**.

### 6.4. Liên hệ tới Union-Find

[Union-Find (Disjoint Set Union)](../../DataStructures/lesson-12-union-find/) là cấu trúc dữ liệu **quản lý các lớp tương đương đang thay đổi** (có thể merge hai lớp lại). Hai thao tác chính:

- `Find(x)`: trả về "đại diện" của lớp chứa x.
- `Union(x, y)`: gộp lớp chứa x và lớp chứa y thành một.

Nó dùng được vì các thuật toán bài toán *"x và y có thuộc cùng nhóm không?"* (vd kết nối trong mạng) chính là *"x R y với R = quan hệ tương đương 'cùng component'"*.

## 7. Cài đặt set trong Go

Go **không có kiểu `set` built-in**. Có 2 cách thông dụng:

### 7.1. Cách 1: `map[T]struct{}` (recommended cho mọi kích thước)

```go
type IntSet map[int]struct{}

func NewSet() IntSet                  { return IntSet{} }
func (s IntSet) Add(x int)            { s[x] = struct{}{} }
func (s IntSet) Remove(x int)         { delete(s, x) }
func (s IntSet) Contains(x int) bool  { _, ok := s[x]; return ok }
func (s IntSet) Size() int            { return len(s) }
```

**Vì sao `struct{}` thay vì `bool`?** Vì `struct{}` chiếm **0 byte**, còn `bool` chiếm 1 byte. Khi set có 1 triệu phần tử, tiết kiệm 1 MB.

→ Đây là idiom Go cho "set kích thước bất kỳ". Truy cập `Contains` trung bình O(1).

### 7.2. Cách 2: bitmask (khi tập nhỏ và biết trước phần tử)

Khi tập có ≤ 64 phần tử (vd "tập các đỉnh đã thăm" với ≤ 20 đỉnh), dùng `uint64`:

```go
var visited uint64 = 0
visited |= 1 << 5           // thêm phần tử 5
contains := visited & (1<<5) != 0
visited &^= 1 << 5          // xóa phần tử 5
```

Ưu điểm: **nhanh hơn map ~10-100 lần**, kích thước cố định 8 byte. Nhược: chỉ chứa được tới `uint64` vũ trụ phần tử (64), và phần tử phải là số nguyên trong khoảng đó.

→ Dùng cho **bitmask DP**, đồ thị nhỏ, "tập các flag".

## 8. Trả lời các câu hỏi tự nhiên

**Q: Tập có chứa được phần tử trùng nhau không?**

Theo định nghĩa toán học: không. Trong code Go với `map[T]struct{}`: `set[x] = struct{}{}` 2 lần cũng chỉ có 1 entry — `map` tự xử lý uniqueness.

Nếu cần "tập cho phép lặp", đó là **multiset (bag)** — cài đặt bằng `map[T]int` (key → đếm).

**Q: Khi nào nên dùng `map[T]struct{}` thay vì `map[T]bool`?**

Khi giá trị không mang ý nghĩa. `struct{}` rõ ràng hơn ("tôi chỉ quan tâm key có mặt hay không") và tiết kiệm bộ nhớ. `map[T]bool` có ý nghĩa khi bạn muốn lưu cả "có/không" và biết "không" có thể hợp lệ.

**Q: Phép tập trên slice (mảng) — Go có hỗ trợ sẵn không?**

Không. Phải tự viết hoặc dùng thư viện như [`golang.org/x/exp/slices`](https://pkg.go.dev/golang.org/x/exp/slices). Lưu ý: phép tập trên slice là O(n·m), trên set là O(n+m) — set nhanh hơn nhiều khi tập lớn.

**Q: Tập rỗng `∅` có phải là tập con của chính nó không?**

Có. `∅ ⊆ ∅` (định nghĩa thỏa mãn vacuously — "mọi phần tử của ∅ thuộc ∅" đúng vì không có phần tử nào).

**Q: `|A × B|` khi A hoặc B vô hạn?**

Vẫn vô hạn, nhưng có nhiều "kích cỡ" vô hạn (countable vs uncountable). Vd `ℕ × ℕ` vẫn đếm được, `ℝ × ℝ` không đếm được. Đây thuộc về lý thuyết tập của Cantor — bỏ qua, không cần cho data structure.

**Q: Nếu một quan hệ phản xạ và đối xứng nhưng không bắc cầu, ví dụ?**

"Là bạn của" (theo nghĩa Facebook): tôi là bạn tôi (phản xạ trivially), A là bạn B thì B là bạn A (đối xứng), nhưng A là bạn B và B là bạn C **không** suy ra A là bạn C. → Không phải tương đương → không partition được.

## 9. Bài tập

**Bài 1.** Cho `A = {1, 2, 3, 5, 8}` và `B = {2, 3, 5, 7}`. Tính:
- `A ∪ B`
- `A ∩ B`
- `A \ B`
- `B \ A`
- `A △ B`

**Bài 2.** Cho `U = {1, 2, ..., 10}`, `A = {2, 4, 6, 8, 10}`. Tính `Aᶜ` (phần bù trong U).

**Bài 3.** Xác định mệnh đề đúng/sai (giải thích ngắn):
- `∅ ⊆ {1, 2, 3}`
- `{1, 2} ⊆ {1, 2}`
- `{1, 2} ⊂ {1, 2}` (tập con thực sự)
- `{1, 2} ⊆ {{1, 2}, 3}`

**Bài 4.** Liệt kê toàn bộ `P({a, b, c})` (8 tập con). Đếm xem có khớp `2³ = 8` không.

**Bài 5.** Cho ánh xạ `f: {1, 2, 3} → {a, b}` với `f(1) = a, f(2) = b, f(3) = a`. Hỏi:
- Có injective không?
- Có surjective không?
- Có bijective không?

**Bài 6.** Trên tập `{1, 2, 3, 4, 5, 6}`, xét quan hệ "chia 3 dư bằng nhau". Liệt kê các lớp tương đương.

**Bài 7.** Viết kiểu `IntSet` trong Go với 5 method: `Add`, `Remove`, `Contains`, `Size`, và `Union(other IntSet) IntSet`. Test với hai set `{1, 2, 3}` và `{3, 4, 5}`.

**Bài 8.** Viết hàm `isSubset(a, b IntSet) bool` kiểm tra `a ⊆ b`.

**Bài 9.** Dùng bitmask: với tập vũ trụ `{0, 1, ..., 7}`, cho `A = {1, 3, 5}` và `B = {3, 4, 5}`. Biểu diễn bằng `uint8` và tính `A ∪ B`, `A ∩ B`, `A △ B` cả ở dạng tập và dạng bit. So sánh với cách dùng `map`.

**Bài 10.** (Liên hệ Union-Find) Cho 6 người được nối qua các cặp bạn: `(1,2), (3,4), (2,3), (5,6)`. Nếu coi quan hệ "có thể liên lạc" (qua bạn của bạn, bắc cầu) là tương đương, liệt kê các lớp tương đương.

## Lời giải chi tiết

### Bài 1

`A = {1, 2, 3, 5, 8}`, `B = {2, 3, 5, 7}`.

- `A ∪ B = {1, 2, 3, 5, 7, 8}` — gộp, không lặp.
- `A ∩ B = {2, 3, 5}` — phần tử chung.
- `A \ B = {1, 8}` — của A mà không có trong B.
- `B \ A = {7}` — của B mà không có trong A.
- `A △ B = (A \ B) ∪ (B \ A) = {1, 7, 8}`.

Kiểm tra `|A ∪ B| = |A| + |B| − |A ∩ B|`: `5 + 4 − 3 = 6` ✓ (công thức inclusion-exclusion).

### Bài 2

`U = {1..10}`, `A = {2, 4, 6, 8, 10}` (số chẵn). Phần bù = các số lẻ:

`Aᶜ = {1, 3, 5, 7, 9}`.

### Bài 3

- `∅ ⊆ {1, 2, 3}` — **đúng**. Tập rỗng là tập con của mọi tập (mệnh đề "mọi phần tử của ∅ thuộc {1,2,3}" đúng vacuously).
- `{1, 2} ⊆ {1, 2}` — **đúng**. Mọi tập là tập con của chính nó.
- `{1, 2} ⊂ {1, 2}` (proper subset) — **sai**. Proper subset đòi hỏi A ⊆ B **và** A ≠ B.
- `{1, 2} ⊆ {{1, 2}, 3}` — **sai**. Vế phải có 2 phần tử là `{1,2}` (một tập) và `3`. Không phải `1` và `2`. Do đó `1 ∉ {{1,2}, 3}`, nên `{1, 2}` không phải tập con. (Lưu ý: `{1, 2} ∈ {{1, 2}, 3}` thì đúng — vế phải có phần tử là tập `{1, 2}`.)

### Bài 4

```
P({a, b, c}) = {
  ∅,
  {a},
  {b},
  {c},
  {a, b},
  {a, c},
  {b, c},
  {a, b, c}
}
```

Đếm: 8 phần tử = 2³ ✓. Liệt kê bằng bitmask 3 bit (xem [Lesson 02 §5.1](../lesson-02-bitwise-ops/#51-ý-tưởng)): mỗi mask 000..111 ứng với một tập con.

### Bài 5

`f: {1, 2, 3} → {a, b}`, `f(1)=a, f(2)=b, f(3)=a`.

- **Injective?** Không. `f(1) = f(3) = a` nhưng `1 ≠ 3`.
- **Surjective?** Có. Mọi phần tử của `{a, b}` đều được "chạm": `a` bởi 1 (và 3), `b` bởi 2.
- **Bijective?** Không (vì không injective).

Quan sát thêm: nếu `|A| > |B|`, **không thể** injective (Pigeonhole — nguyên lý chuồng bồ câu). Trường hợp này `|A| = 3 > 2 = |B|` → tất yếu có va chạm. **Đây chính xác là lý do hash function có collision** khi miền giá trị nhỏ hơn miền xác định.

### Bài 6

"Chia 3 dư bằng nhau" trên `{1, 2, 3, 4, 5, 6}`:

- Dư 0: `{3, 6}`
- Dư 1: `{1, 4}`
- Dư 2: `{2, 5}`

Ba lớp tương đương, rời nhau, hợp = `{1..6}`. ✓

### Bài 7

```go
type IntSet map[int]struct{}

func NewIntSet() IntSet                 { return IntSet{} }
func (s IntSet) Add(x int)              { s[x] = struct{}{} }
func (s IntSet) Remove(x int)           { delete(s, x) }
func (s IntSet) Contains(x int) bool    { _, ok := s[x]; return ok }
func (s IntSet) Size() int              { return len(s) }

func (s IntSet) Union(other IntSet) IntSet {
    result := NewIntSet()
    for x := range s     { result.Add(x) }
    for x := range other { result.Add(x) }
    return result
}
```

Test:
```go
a := NewIntSet()
a.Add(1); a.Add(2); a.Add(3)
b := NewIntSet()
b.Add(3); b.Add(4); b.Add(5)
u := a.Union(b)
// u = {1, 2, 3, 4, 5}, u.Size() = 5
```

Độ phức tạp `Union`: O(|a| + |b|).

### Bài 8

```go
func isSubset(a, b IntSet) bool {
    if len(a) > len(b) {
        return false   // tối ưu sớm: nếu a lớn hơn b, không thể là subset
    }
    for x := range a {
        if !b.Contains(x) {
            return false
        }
    }
    return true
}
```

Độ phức tạp: O(|a|) trung bình (vì map Contains là O(1)).

### Bài 9

Vũ trụ `{0, 1, ..., 7}`. Bit thứ `i` = 1 nếu `i` ∈ tập.

```
A = {1, 3, 5} → bits: 0 0 1 0 1 0 1 0  (đọc từ trái, bit 7 đến bit 0)
                       = 0b00101010 = 0x2A = 42
B = {3, 4, 5} → bits: 0 0 1 1 1 0 0 0
                       = 0b00111000 = 0x38 = 56
```

Tính:
- `A ∪ B`: `42 | 56 = 0b00101010 | 0b00111000 = 0b00111010 = 58` → tập `{1, 3, 4, 5}` ✓
- `A ∩ B`: `42 & 56 = 0b00101000 = 40` → tập `{3, 5}` ✓
- `A △ B`: `42 ^ 56 = 0b00010010 = 18` → tập `{1, 4}` ✓

So sánh: với 64 phần tử trở xuống, bitmask cho ra 3 phép trong **3 instructions CPU** (`|`, `&`, `^`), so với `map` cần lặp qua từng phần tử (O(n) phép băm). Bitmask nhanh hơn ~10-100 lần khi đo benchmark. Nhược: chỉ dùng khi vũ trụ ≤ 64 và phần tử là số nguyên 0..63.

### Bài 10

Cặp bạn: `(1,2), (3,4), (2,3), (5,6)`. Lấy *bao đóng bắc cầu* (transitive closure):

- 1 ↔ 2 (cặp 1)
- 2 ↔ 3 (cặp 3) → kết hợp: 1, 2, 3 cùng nhóm
- 3 ↔ 4 (cặp 2) → 4 nhập nhóm: {1, 2, 3, 4}
- 5 ↔ 6 (cặp 4) → nhóm riêng {5, 6}

Lớp tương đương: `{1, 2, 3, 4}` và `{5, 6}`. (Người 7,... không có trong dữ liệu thì không xét.)

→ Đây chính xác là bài toán Union-Find: bắt đầu với mỗi người là một singleton `{i}`, mỗi cặp bạn là một `Union(a, b)`, cuối cùng đếm số "root" để biết có bao nhiêu nhóm. Sẽ học chi tiết trong [DataStructures lesson-12](../../DataStructures/lesson-12-union-find/).

## Tham khảo và bài tiếp theo

- Bài trước: [Lesson 02 — Bitwise Operations](../lesson-02-bitwise-ops/).
- Bước tiếp theo: vào [DataStructures](../../DataStructures/) — bắt đầu từ [lesson-00 (Introduction)](../../DataStructures/lesson-00-introduction/), hoặc nhảy thẳng lên các bài có liên hệ trực tiếp:
  - [Hash Table](../../DataStructures/lesson-05-hash-table/) — ánh xạ + giải collision.
  - [Union-Find](../../DataStructures/lesson-12-union-find/) — lớp tương đương.
  - [Graph](../../DataStructures/lesson-11-graph/) — tích Descartes V × V.
- Code: [solutions.go](./solutions.go).
- Minh họa tương tác: [visualization.html](./visualization.html) — biểu đồ Venn tương tác, bitmask view song song, liệt kê power set.
