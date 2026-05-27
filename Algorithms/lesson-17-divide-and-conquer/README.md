# Lesson 17 — Chia để trị (Divide & Conquer)

> **Tier 2 — Tìm kiếm & kỹ thuật cốt lõi.** Đây là lesson về một *paradigm* (mô hình thiết kế thuật toán) tổng quát, không phải một thuật toán đơn lẻ. Bạn đã gặp Divide & Conquer ở [Merge Sort (L07)](../lesson-07-merge-sort/) và [Quicksort (L08)](../lesson-08-quicksort/) — lesson này gọi tên, hệ thống hoá, và mở rộng nó thành một khuôn mẫu áp dụng được cho hàng chục bài toán khác.

## Mục tiêu học tập

Sau bài này bạn sẽ:

1. Phát biểu được **3 bước** của Divide & Conquer (D&C): **Divide → Conquer → Combine**, và nhận ra chúng trong mọi thuật toán D&C.
2. Viết được **khung tổng quát (template) Go** cho một thuật toán D&C bất kỳ.
3. Lập được **recurrence** `T(n) = a·T(n/b) + f(n)` cho thuật toán của mình và dùng **Master Theorem** để suy ra Big-O.
4. Walk-through chi tiết 8 ví dụ kinh điển: binary search, merge sort, quicksort, count inversions, maximum subarray, closest pair, Karatsuba, fast exponentiation.
5. Phân biệt **D&C** (subproblem độc lập) với **Quy hoạch động — DP** (subproblem chồng lấp) — biết khi nào dùng cái nào.
6. Hiểu vì sao D&C **dễ song song hoá** và biết các **cạm bẫy** thường gặp.

## Kiến thức tiền đề

- [L03 — Đệ quy & Recurrence + Master Theorem](../lesson-03-recursion-recurrence/) — **bắt buộc**. Toàn bộ phân tích độ phức tạp ở đây dựa trên Master Theorem.
- [L07 — Merge Sort](../lesson-07-merge-sort/) — ví dụ D&C "sạch" nhất.
- [L08 — Quicksort](../lesson-08-quicksort/) — D&C với phần Combine "rỗng".
- [L12 — Binary Search](../lesson-12-binary-search-variants/) — D&C đơn giản nhất (chỉ giải 1 nửa).

---

## 1. Paradigm: ba bước Divide → Conquer → Combine

### 💡 Trực giác / Hình dung

Hãy tưởng tượng bạn phải **đếm số người trong một sân vận động 50.000 chỗ**. Đếm một mình từ đầu tới cuối thì mệt và lâu. Cách thông minh: chia sân làm 4 khán đài, giao mỗi khán đài cho một người đếm; mỗi người đó lại chia khán đài của mình cho 4 bạn nhỏ hơn... đến khi mỗi người chỉ phải đếm một hàng ghế (dễ). Cuối cùng **cộng các con số lại** — đó chính là Combine.

Đó là toàn bộ tinh thần của Divide & Conquer:

- **Divide (Chia)**: cắt bài toán kích thước `n` thành `a` bài toán con, mỗi bài kích thước `n/b`.
- **Conquer (Trị)**: giải mỗi bài toán con — thường bằng **đệ quy** chính nó. Khi bài con đủ nhỏ (base case), giải trực tiếp.
- **Combine (Gộp)**: ghép lời giải của các bài con thành lời giải bài lớn.

### Định nghĩa hình thức

Một thuật toán là **Divide & Conquer** nếu nó có dạng:

```
solve(P):
    nếu P đủ nhỏ:           # base case
        return giải_trực_tiếp(P)
    chia P thành P1, P2, ..., Pa   # Divide
    r1 = solve(P1)          # Conquer (đệ quy)
    r2 = solve(P2)
    ...
    return combine(r1, ..., ra)    # Combine
```

### Bản đồ "3 bước" qua các thuật toán đã học

| Thuật toán | Divide | Conquer | Combine | Đặc điểm |
|---|---|---|---|---|
| **Binary search** | cắt nửa, chỉ giữ 1 nửa | đệ quy 1 nửa | (rỗng) | `a=1` — chỉ 1 bài con |
| **Merge sort** | cắt đôi mảng | sort 2 nửa | **merge** (nặng, O(n)) | combine là phần "đắt" |
| **Quicksort** | partition quanh pivot | sort 2 phần | (rỗng) | divide là phần "đắt" |
| **Count inversions** | cắt đôi | đếm 2 nửa | merge + đếm chéo | mở rộng merge sort |
| **Max subarray (D&C)** | cắt đôi | max 2 nửa | max xuyên giữa | combine O(n) |
| **Karatsuba** | tách số làm nửa | 3 phép nhân con | cộng dịch bit | giảm 4→3 bài con |

> **Nhận xét cốt lõi**: merge sort và quicksort là *hai mặt của cùng đồng xu*. Merge sort làm việc khó ở Combine (divide tầm thường: cắt giữa). Quicksort làm việc khó ở Divide (partition), còn Combine rỗng. Hiểu điều này là hiểu nửa paradigm.

### ❓ Câu hỏi tự nhiên của người đọc

- **"D&C có bắt buộc phải đệ quy không?"** — Về bản chất là đệ quy (bài con cùng dạng bài gốc). Nhưng có thể khử đệ quy bằng vòng lặp/ngăn xếp (vd binary search lặp), hoặc bottom-up (vd merge sort bottom-up ở [L07](../lesson-07-merge-sort/)).
- **"Phải chia làm đúng 2 nửa không?"** — Không. Chia làm `a` phần tuỳ ý: binary search chia 2 nhưng chỉ giải 1; Karatsuba giải 3; Strassen giải 7. Số bài con `a` và kích thước `n/b` là tham số tự do.
- **"Bài con có cần bằng nhau không?"** — Lý tưởng là cân bằng (`n/b` đều) để được cây đệ quy nông. Quicksort chia *không* cân bằng → đó là lý do worst case O(n²) (xem [L08](../lesson-08-quicksort/)).

### 🔁 Dừng lại tự kiểm tra

1. Trong merge sort, bước nào là "đắt" nhất — Divide hay Combine? Vì sao?
2. Binary search có `a` (số bài con thực sự giải) bằng mấy?

<details><summary>Đáp án</summary>

1. **Combine** (merge 2 mảng đã sort tốn O(n)). Divide chỉ là tính `mid = (lo+hi)/2`, O(1).
2. `a = 1`. Ta cắt làm 2 nửa nhưng chỉ *đệ quy vào 1 nửa* (nửa kia bị loại). Đây là điểm khiến binary search chỉ O(log n) chứ không O(n).

</details>

---

## 2. Khung tổng quát (template Go)

Mọi thuật toán D&C đều "đổ" được vào khuôn dưới đây. Học thuộc khuôn này, sau đó chỉ cần điền 3 chỗ: `baseCase`, `divide`, `combine`.

```go
// divideAndConquer là khung tổng quát. P mô tả bài toán (vd mảng + chỉ số lo, hi).
// R là kiểu kết quả.
func divideAndConquer(P Problem) R {
    // 1. BASE CASE — bài con đủ nhỏ thì giải trực tiếp, KHÔNG đệ quy nữa.
    //    Đây là chỗ bug phổ biến nhất: quên base case -> đệ quy vô hạn.
    if P.size() <= threshold {
        return solveDirectly(P)
    }

    // 2. DIVIDE — chia P thành các bài con. Số bài con = a, mỗi bài kích thước ~ n/b.
    subProblems := P.divide() // []Problem, độ dài a

    // 3. CONQUER — giải từng bài con bằng ĐỆ QUY.
    subResults := make([]R, len(subProblems))
    for i, sp := range subProblems {
        subResults[i] = divideAndConquer(sp)
    }

    // 4. COMBINE — gộp kết quả con thành kết quả bài lớn.
    return combine(subResults)
}
```

### ⚠ Lỗi thường gặp

- **Quên / sai base case** → đệ quy không bao giờ dừng (stack overflow), hoặc dừng sai chỗ (kết quả sai). Quy tắc: base case phải xử lý được *mọi* kích thước nhỏ hơn ngưỡng, kể cả `n = 0` và `n = 1`.
- **Chia tạo bài con không nhỏ hơn bài gốc** → vd cắt `[lo, hi]` thành `[lo, hi]` và `[hi, hi]` (không tiến triển) → vô hạn. Mỗi bài con *phải* nhỏ hơn thực sự.
- **Combine sửa nhầm dữ liệu chung** → khi các bài con dùng chung mảng (in-place), combine của bài này có thể đè lên dữ liệu bài kia.

### 📝 Tóm tắt mục 1–2

- D&C = **Divide → Conquer (đệ quy) → Combine**.
- Khung 4 phần: base case → divide → đệ quy → combine.
- Merge sort: combine nặng. Quicksort: divide nặng. Binary search: chỉ 1 bài con.

---

## 3. Phân tích độ phức tạp — Recurrence & Master Theorem

### Lập recurrence

Nếu thuật toán D&C chia thành `a` bài con, mỗi bài kích thước `n/b`, và tốn `f(n)` cho phần **divide + combine** (không tính thời gian đệ quy), thì:

$$T(n) = a \cdot T(n/b) + f(n)$$

- `a` = số bài con **được giải đệ quy** (binary search `a=1`, merge sort `a=2`, Karatsuba `a=3`, Strassen `a=7`).
- `b` = bài con nhỏ đi bao nhiêu lần (`b=2` nghĩa là mỗi bài con bằng nửa).
- `f(n)` = chi phí chia + gộp ở mỗi mức.

### Master Theorem (recap [L03](../lesson-03-recursion-recurrence/))

So sánh `f(n)` với `n^(log_b a)`. Đặt `c = log_b a`:

| Trường hợp | Điều kiện | Kết quả | Trực giác |
|---|---|---|---|
| **1** | `f(n) = O(n^(c−ε))` (combine *rẻ* hơn) | `T(n) = Θ(n^c)` | Tổng chi phí dồn ở **lá** |
| **2** | `f(n) = Θ(n^c)` (combine *cân* với chia) | `T(n) = Θ(n^c · log n)` | Mỗi mức tốn như nhau |
| **3** | `f(n) = Ω(n^(c+ε))` (combine *đắt* hơn) | `T(n) = Θ(f(n))` | Tổng chi phí dồn ở **gốc** |

### ≥4 ví dụ số cụ thể (tính `c = log_b a` rồi tra bảng)

1. **Merge sort**: `a=2, b=2, f(n)=Θ(n)`. `c = log_2 2 = 1`. So `f(n)=Θ(n)=Θ(n^1)=Θ(n^c)` → **Case 2** → `T(n)=Θ(n log n)`. ✓ (khớp với điều đã biết ở [L07](../lesson-07-merge-sort/))
2. **Binary search**: `a=1, b=2, f(n)=Θ(1)`. `c = log_2 1 = 0`. So `f(n)=Θ(1)=Θ(n^0)=Θ(n^c)` → **Case 2** → `T(n)=Θ(n^0 · log n)=Θ(log n)`. ✓
3. **Karatsuba**: `a=3, b=2, f(n)=Θ(n)`. `c = log_2 3 ≈ 1.585`. So `f(n)=Θ(n)=O(n^(1.585−ε))` → **Case 1** → `T(n)=Θ(n^1.585)`. ✓ (nhanh hơn `n²` của nhân thường)
4. **Strassen**: `a=7, b=2, f(n)=Θ(n²)`. `c = log_2 7 ≈ 2.807`. So `f(n)=Θ(n²)=O(n^(2.807−ε))` → **Case 1** → `T(n)=Θ(n^2.807)`. ✓
5. **Max subarray (D&C)**: `a=2, b=2, f(n)=Θ(n)` (quét xuyên giữa). `c=1`, `f=Θ(n^1)` → **Case 2** → `Θ(n log n)`.
6. **"Naive" matrix multiply đệ quy**: `a=8, b=2, f(n)=Θ(n²)`. `c=log_2 8=3`. `f(n)=Θ(n²)=O(n^(3−ε))` → **Case 1** → `Θ(n³)` (đúng là không cải thiện gì so với 3 vòng lặp — vì sao Strassen giảm 8→7 mới ăn tiền).

### ❓ Câu hỏi tự nhiên

- **"Vì sao giảm số bài con từ 4→3 (Karatsuba) lại quan trọng thế?"** — Vì `a` nằm trong **số mũ** `log_b a`. Với `b=2`: `a=4 → c=2` (giống `n²`, vô ích), `a=3 → c≈1.585` (ăn tiền). Mỗi bài con cắt bớt là mỗi lần tụt số mũ — hiệu ứng cấp số nhân khi `n` lớn.
- **"f(n) là divide hay combine?"** — Là **tổng** chi phí của divide + combine ở MỘT mức, *không* tính thời gian gọi đệ quy (cái đó là `a·T(n/b)`).

### 🔁 Dừng lại tự kiểm tra

Một thuật toán có `T(n) = 2T(n/2) + n²`. Big-O là gì?

<details><summary>Đáp án</summary>

`a=2, b=2 → c=log_2 2 = 1`. `f(n)=n² = Ω(n^(1+ε))` (với ε=1) → **Case 3** → `T(n)=Θ(f(n))=Θ(n²)`. Combine đắt quá → toàn bộ chi phí dồn ở gốc.

</details>

### 📝 Tóm tắt mục 3

- Recurrence D&C: `T(n) = a·T(n/b) + f(n)`.
- So `f(n)` với `n^(log_b a)` → 3 case Master Theorem.
- Giảm `a` (số bài con) ăn tiền nhất vì nó nằm trong số mũ.

---

## 4. Tám ví dụ kinh điển (walk-through)

### 4.1 Binary search — D&C với `a=1`

Đã học kỹ ở [L12](../lesson-12-binary-search-variants/). Recap dưới góc D&C:

- **Divide**: tính `mid`, so `target` với `arr[mid]`.
- **Conquer**: chỉ đệ quy vào **một** nửa (nửa kia chắc chắn không chứa target).
- **Combine**: rỗng.

`T(n)=1·T(n/2)+O(1)` → `Θ(log n)`. Đây là D&C "tiết kiệm" nhất vì vứt hẳn 1 nửa bài.

**Walk-through số** — tìm `target=7` trong `[1, 3, 5, 7, 9, 11, 13]` (sorted, 7 phần tử):

- `[lo=0, hi=6]`, `mid=3`, `arr[3]=7` → **trúng!** 1 bước. (Combine rỗng.)

Tìm `target=11`:

- `[0,6]`, `mid=3`, `arr[3]=7 < 11` → đệ quy **nửa phải** `[4,6]` (vứt nửa trái).
- `[4,6]`, `mid=5`, `arr[5]=11` → **trúng**. 2 bước.

Tìm `target=4` (không có):

- `[0,6]`, `mid=3`, `arr[3]=7 > 4` → nửa trái `[0,2]`.
- `[0,2]`, `mid=1`, `arr[1]=3 < 4` → nửa phải `[2,2]`.
- `[2,2]`, `mid=2`, `arr[2]=5 ≠ 4`, `lo==hi` → **không tìm thấy**. 3 bước.

Với `n=7` ta cần ≤ `⌈log₂7⌉ = 3` bước — đúng. So brute force quét tuyến tính 7 bước → D&C vứt nửa mỗi lần là chìa khoá.

```go
// binarySearch dưới góc D&C: chỉ đệ quy 1 nửa (a=1). T(n)=T(n/2)+O(1)=O(log n).
func binarySearch(a []int, target, lo, hi int) int {
    if lo > hi {
        return -1 // base case: đoạn rỗng -> không tìm thấy
    }
    mid := lo + (hi-lo)/2 // tránh tràn so với (lo+hi)/2
    switch {
    case a[mid] == target:
        return mid // trúng (combine rỗng)
    case a[mid] < target:
        return binarySearch(a, target, mid+1, hi) // chỉ nửa phải
    default:
        return binarySearch(a, target, lo, mid-1) // chỉ nửa trái
    }
}
```

### 4.2 Merge sort & Quicksort — recap

| | Merge sort | Quicksort |
|---|---|---|
| Divide | cắt giữa (O(1)) | partition quanh pivot (O(n)) |
| Conquer | sort 2 nửa | sort 2 phần |
| Combine | **merge** (O(n)) | rỗng |
| Recurrence | `2T(n/2)+O(n)` | trung bình `2T(n/2)+O(n)` |
| Big-O | `Θ(n log n)` luôn | `O(n log n)` TB, `O(n²)` xấu |

Chi tiết ở [L07](../lesson-07-merge-sort/) và [L08](../lesson-08-quicksort/).

### 4.3 Count inversions — đếm cặp đảo trong O(n log n)

**Bài toán**: cho mảng `a`, đếm số cặp `(i, j)` với `i < j` nhưng `a[i] > a[j]` (cặp "đảo ngược"). Inversion đo mức độ "lộn xộn" của mảng — mảng đã sort có 0 inversion; mảng sort ngược có `n(n−1)/2` (tối đa).

**Brute force**: 2 vòng lặp, O(n²). **D&C**: tận dụng merge sort, O(n log n).

💡 **Ý tưởng**: chia mảng đôi. Inversion gồm 3 loại: (a) cả `i, j` ở nửa trái, (b) cả ở nửa phải, (c) `i` trái – `j` phải (chéo). (a) và (b) đếm đệ quy. (c) đếm **trong lúc merge**: khi lấy phần tử từ nửa phải ra trước một loạt phần tử nửa trái, mọi phần tử trái còn lại đều tạo inversion với nó.

**Walk-through số cụ thể** với `a = [2, 4, 1, 3, 5]`:

- Chia: trái `[2, 4]`, phải `[1, 3, 5]`.
- Nửa trái `[2,4]`: 0 inversion (đã tăng dần).
- Nửa phải `[1,3,5]`: 0 inversion.
- **Merge & đếm chéo**: trộn `[2,4]` với `[1,3,5]`:
  - so `2` vs `1`: `1` nhỏ hơn → lấy `1`. Nửa trái còn `[2,4]` (2 phần tử) đều > 1 → **+2 inversion** (cặp (2,1) và (4,1)).
  - so `2` vs `3`: lấy `2`. (0)
  - so `4` vs `3`: `3` nhỏ hơn → lấy `3`. Nửa trái còn `[4]` → **+1** (cặp (4,3)).
  - so `4` vs `5`: lấy `4`. (0)
  - hết trái, đổ `5`. (0)
- Tổng = 0 + 0 + 3 = **3 inversion**. Kiểm tra brute force: (2,1), (4,1), (4,3) → đúng 3 cặp. ✓

```go
// countInversions trả về số cặp đảo, đồng thời sort a (in-place qua merge).
// T(n) = 2T(n/2) + O(n) = O(n log n).
func countInversions(a []int) int {
    if len(a) <= 1 {
        return 0 // base case: 0 hoặc 1 phần tử -> 0 inversion
    }
    mid := len(a) / 2
    left := append([]int(nil), a[:mid]...)  // copy để sort độc lập
    right := append([]int(nil), a[mid:]...)

    inv := countInversions(left) + countInversions(right) // (a)+(b): đệ quy

    // Combine: merge left & right, đếm inversion chéo (c).
    i, j, k := 0, 0, 0
    for i < len(left) && j < len(right) {
        if left[i] <= right[j] {
            a[k] = left[i]; i++
        } else {
            a[k] = right[j]; j++
            inv += len(left) - i // mọi phần tử trái còn lại > right[j]
        }
        k++
    }
    for i < len(left) { a[k] = left[i]; i++; k++ }
    for j < len(right) { a[k] = right[j]; j++; k++ }
    return inv
}
```

### 4.4 Maximum subarray (D&C) — O(n log n)

**Bài toán**: tìm đoạn con liên tiếp có tổng lớn nhất. Vd `[-2, 1, -3, 4, -1, 2, 1, -5, 4]` → đoạn `[4, -1, 2, 1]` tổng = **6**.

💡 **Ý tưởng D&C**: cắt mảng đôi tại `mid`. Đoạn tổng-max nằm ở đúng 1 trong 3 chỗ:
1. **Hoàn toàn bên trái** (`[lo, mid]`) → đệ quy.
2. **Hoàn toàn bên phải** (`[mid+1, hi]`) → đệ quy.
3. **Xuyên giữa** (chứa cả `mid` và `mid+1`) → quét ra hai phía từ `mid`, O(n).

Kết quả = `max(trái, phải, xuyên giữa)`.

**Walk-through** với `[-2, 1, -3, 4, -1, 2, 1, -5, 4]` (9 phần tử, `mid=4`, `a[mid]=-1`):

- Đoạn xuyên giữa: quét trái từ index 4 về 0, tích lũy tìm max: `-1, -1+4=3, 3-3=0,...` → max nửa trái-tính-tới-mid = `3` (gồm `a[3]+a[4]=4+(-1)=3`). Quét phải từ index 5: `2, 2+1=3, 3-5=-2, -2+4=2` → max nửa phải = `3` (gồm `a[5]+a[6]=2+1=3`). Xuyên giữa = `3 + 3 = 6` (đoạn `[4,-1,2,1]`).
- Đệ quy trái & phải cho kết quả ≤ 6.
- Kết quả = **6**. ✓

```go
// maxSubarrayDC trả về tổng lớn nhất của đoạn con liên tiếp trong a[lo..hi].
// T(n) = 2T(n/2) + O(n)  ->  O(n log n).
func maxSubarrayDC(a []int, lo, hi int) int {
    if lo == hi {
        return a[lo] // base case: 1 phần tử
    }
    mid := (lo + hi) / 2
    leftMax := maxSubarrayDC(a, lo, mid)       // (1) hoàn toàn trái
    rightMax := maxSubarrayDC(a, mid+1, hi)    // (2) hoàn toàn phải
    crossMax := maxCrossing(a, lo, mid, hi)    // (3) xuyên giữa
    return max3(leftMax, rightMax, crossMax)
}

// maxCrossing: đoạn tốt nhất BẮT BUỘC chứa a[mid] và a[mid+1].
func maxCrossing(a []int, lo, mid, hi int) int {
    // Quét trái từ mid về lo, tích lũy tổng, giữ max.
    sum, leftBest := 0, math.MinInt
    for i := mid; i >= lo; i-- {
        sum += a[i]
        if sum > leftBest { leftBest = sum }
    }
    // Quét phải từ mid+1 tới hi.
    sum, rightBest := 0, math.MinInt
    for i := mid + 1; i <= hi; i++ {
        sum += a[i]
        if sum > rightBest { rightBest = sum }
    }
    return leftBest + rightBest // ghép 2 nửa
}

func max3(a, b, c int) int {
    m := a
    if b > m { m = b }
    if c > m { m = c }
    return m
}
```

> **So với Kadane O(n)**: Kadane (DP tuyến tính, sẽ học ở [Tier 4 — DP](../tier-4-dynamic-programming/index.html)) giải bài này trong **một** lượt quét, O(n) — nhanh hơn D&C O(n log n). Đây là ví dụ kinh điển cho thấy **D&C không phải lúc nào cũng tối ưu**: khi bài toán có cấu trúc "tích lũy tuyến tính" thì DP/scan thắng. Học D&C ở đây vì nó dạy tư duy combine 3 trường hợp, và là bước đệm tới Master Theorem.

### 4.5 Closest pair of points — O(n log n) hình học

**Bài toán**: cho `n` điểm trong mặt phẳng, tìm 2 điểm gần nhau nhất (khoảng cách Euclid). Brute force so mọi cặp: O(n²).

💡 **Ý tưởng strip**: sort theo `x`, cắt đôi bằng đường thẳng đứng `x = mid`. Khoảng cách nhỏ nhất `δ` = `min(δ_trái, δ_phải)` (đệ quy). **Combine**: cặp gần nhất có thể *xuyên* qua đường chia — nhưng chỉ cần xét các điểm nằm trong **dải (strip)** rộng `2δ` quanh đường chia. Điều kỳ diệu: trong strip đó, mỗi điểm chỉ cần so với **tối đa 7 điểm kế tiếp** (sort theo `y`) — vì hình học ép không thể nhồi nhiều hơn 8 điểm cách nhau ≥ δ vào một hình chữ nhật `δ × 2δ`. Nhờ vậy combine chỉ O(n).

**Walk-through ý tưởng** (4 điểm `A(0,0), B(1,1), C(5,0), D(6,1)`):
- Sort theo x → `A, B | C, D` (mid giữa B và C).
- Trái `{A,B}`: `δ_L = dist(A,B) = √2 ≈ 1.41`.
- Phải `{C,D}`: `δ_R = dist(C,D) = √2 ≈ 1.41`.
- `δ = 1.41`. Strip = các điểm có `|x − mid| < 1.41`. Mid ≈ 3, không điểm nào trong strip rộng quá → không có cặp chéo gần hơn.
- Kết quả: cặp gần nhất `(A,B)` hoặc `(C,D)`, `δ = √2`. ✓

Recurrence: `T(n)=2T(n/2)+O(n)` → **O(n log n)** (combine strip O(n) nhờ giới hạn 7 điểm). Code đầy đủ dài, ý tưởng quan trọng hơn — xem bài tập 6.

### 4.6 Karatsuba — nhân số lớn O(n^1.585)

**Vấn đề**: nhân 2 số `n` chữ số kiểu "tay" (như học tiểu học) tốn O(n²) phép nhân chữ số. Với số 10.000 chữ số (mật mã RSA), n² là khổng lồ.

💡 **Mẹo Karatsuba**: tách mỗi số làm 2 nửa. Cho `x = x_H·10^m + x_L`, `y = y_H·10^m + y_L` (m = nửa số chữ số). Tích:

```
x·y = x_H·y_H·10^(2m) + (x_H·y_L + x_L·y_H)·10^m + x_L·y_L
```

Nhìn qua cần **4** phép nhân con (`x_H·y_H`, `x_H·y_L`, `x_L·y_H`, `x_L·y_L`) → `T(n)=4T(n/2)+O(n)` → `O(n²)`, vô ích. **Mẹo**: hạng giữa `x_H·y_L + x_L·y_H` tính được từ **1** phép nhân thay vì 2:

```
gọi: P1 = x_H·y_H,  P2 = x_L·y_L,  P3 = (x_H + x_L)·(y_H + y_L)
thì: hạng giữa = P3 − P1 − P2
```

Chỉ còn **3** phép nhân con! `T(n)=3T(n/2)+O(n)` → `O(n^log₂3) = O(n^1.585)`.

**Walk-through số**: `x=12, y=34` (n=2, m=1). `x_H=1, x_L=2, y_H=3, y_L=4`.
- `P1 = 1·3 = 3`
- `P2 = 2·4 = 8`
- `P3 = (1+2)·(3+4) = 3·7 = 21`
- hạng giữa = `21 − 3 − 8 = 10`
- `x·y = 3·10² + 10·10¹ + 8 = 300 + 100 + 8 = 408`. Kiểm: `12·34 = 408`. ✓

```go
// karatsuba nhân 2 số nguyên không âm bằng D&C 3 phép nhân con.
// Bản minh hoạ dùng int (tách theo 10^m); thực tế dùng big.Int / mảng chữ số.
// T(n) = 3T(n/2) + O(n)  ->  O(n^1.585).
func karatsuba(x, y int) int {
    if x < 10 || y < 10 {
        return x * y // base case: số 1 chữ số nhân trực tiếp
    }
    n := numDigits(max(x, y))
    m := n / 2
    p := pow10(m)

    xH, xL := x/p, x%p // tách nửa cao / nửa thấp
    yH, yL := y/p, y%p

    p1 := karatsuba(xH, yH)               // x_H · y_H
    p2 := karatsuba(xL, yL)               // x_L · y_L
    p3 := karatsuba(xH+xL, yH+yL)         // (x_H+x_L)(y_H+y_L)
    mid := p3 - p1 - p2                   // hạng giữa = P3 − P1 − P2

    return p1*pow10(2*m) + mid*p + p2     // combine
}
```

### 4.7 Fast exponentiation — `pow(x, n)` trong O(log n)

**Bài toán**: tính `x^n`. Nhân ngây thơ `x·x·...·x` tốn `n−1` phép nhân, O(n).

💡 **Chia đôi mũ**: `x^n = (x^(n/2))²` nếu `n` chẵn; `= x·(x^((n−1)/2))²` nếu `n` lẻ. Mỗi bước **chia đôi** số mũ → chỉ O(log n) phép nhân.

**Walk-through** `x^13` (n=13, nhị phân `1101`):
- `13` lẻ → `x^13 = x · (x^6)²`
- `6` chẵn → `x^6 = (x^3)²`
- `3` lẻ → `x^3 = x · (x^1)²`
- `1` lẻ → `x^1 = x · (x^0)² = x`

Đi ngược lên: `x^1 = x`; `x^3 = x·x² = x³`; `x^6 = (x³)² = x⁶`; `x^13 = x·(x⁶)² = x·x¹² = x¹³`. ✓ Tổng số phép nhân ~ `2·log₂13 ≈ 8` thay vì 12.

Cách nhìn nhị phân: `13 = 1101₂ = 8+4+1` → `x^13 = x^8 · x^4 · x^1`. Bình phương liên tiếp cho `x, x², x⁴, x⁸`, nhân các lũy thừa ứng với bit `1`.

```go
// fastPow tính x^n bằng chia đôi mũ. O(log n) phép nhân.
// (Tease Tier 7 — number theory: thêm "% mod" ở mỗi bước -> modular exponentiation,
//  nền tảng RSA / Diffie-Hellman.)
func fastPow(x float64, n int) float64 {
    if n == 0 {
        return 1 // base case: x^0 = 1
    }
    if n < 0 {
        return 1 / fastPow(x, -n) // mũ âm
    }
    half := fastPow(x, n/2) // CHỈ 1 lần đệ quy -> tiết kiệm
    if n%2 == 0 {
        return half * half        // n chẵn: (x^(n/2))²
    }
    return half * half * x        // n lẻ: x · (x^(n/2))²
}

// Phiên bản modular (number theory) — tease Tier 7.
func powMod(x, n, mod int64) int64 {
    result := int64(1)
    x %= mod
    for n > 0 {
        if n&1 == 1 {              // bit thấp nhất = 1
            result = result * x % mod
        }
        x = x * x % mod            // bình phương
        n >>= 1                    // dịch phải = chia 2
    }
    return result
}
```

> **Lưu ý recurrence**: `fastPow` có `T(n)=T(n/2)+O(1)` → `a=1, b=2, f=O(1)` → giống binary search → `O(log n)`. (Đây là "n" theo *giá trị mũ*, không phải kích thước mảng.)

### 4.8 Strassen — nhân ma trận O(n^2.81)

Nhân 2 ma trận `n×n` kiểu 3 vòng lặp tốn O(n³). Chia mỗi ma trận thành 4 block `n/2 × n/2`; cách ngây thơ cần **8** phép nhân block con → `T(n)=8T(n/2)+O(n²)` → vẫn O(n³). **Strassen** dùng 7 phép nhân khéo léo (như Karatsuba giảm 4→3) → `T(n)=7T(n/2)+O(n²)` → `O(n^log₂7) = O(n^2.807)`. Thực tế chỉ ăn tiền với ma trận rất lớn vì hằng số ẩn lớn và độ ổn định số kém hơn. Nhắc qua để bạn thấy cùng một mẹo "giảm số bài con" tái xuất hiện.

### 📝 Tóm tắt mục 4

- Binary search: 1 bài con → O(log n). Merge/quick: 2 bài con → O(n log n).
- Count inversions & max subarray: tái dùng merge / chia 3-trường-hợp → O(n log n).
- Karatsuba (4→3) và Strassen (8→7): **giảm số bài con** để tụt số mũ.
- Fast power: chia đôi mũ → O(log n); thêm `% mod` → nền RSA.

---

## 5. D&C vs DP — phân biệt cốt lõi

Đây là câu hỏi thi/phỏng vấn kinh điển. Cả hai đều "chia bài toán thành con", nhưng khác nhau ở **một điểm sống còn**:

| | **Divide & Conquer** | **Dynamic Programming (DP)** |
|---|---|---|
| Subproblem | **ĐỘC LẬP** (không trùng nhau) | **CHỒNG LẤP** (cùng bài con bị giải lại nhiều lần) |
| Cần nhớ (memo)? | **Không** — mỗi bài con giải đúng 1 lần | **Có** — phải memo/table, nếu không sẽ giải lại theo cấp số nhân |
| Cây đệ quy | các nhánh **rời nhau** | các nhánh **gặp lại** cùng node |
| Ví dụ | merge sort, binary search, Karatsuba | Fibonacci, longest common subsequence, knapsack |

### 💡 Trực giác qua Fibonacci

`fib(n) = fib(n−1) + fib(n−2)`. Nhìn giống D&C (chia 2 bài con). Nhưng khai triển cây:

```
fib(5)
├── fib(4)
│   ├── fib(3)
│   │   ├── fib(2)
│   │   └── fib(1)
│   └── fib(2)      <- fib(2) bị tính LẠI
└── fib(3)          <- fib(3) bị tính LẠI nguyên cụm!
    ├── fib(2)      <- và LẠI nữa
    └── fib(1)
```

`fib(3)` xuất hiện 2 lần, `fib(2)` 3 lần... → **chồng lấp**. Không memo → O(2ⁿ). Đây là DP, **không phải** D&C thuần. Ngược lại merge sort: `mergeSort(a[0:4])` và `mergeSort(a[4:8])` xử lý phần *khác nhau* của mảng → không bao giờ trùng → D&C thuần, không cần memo.

### ❓ Câu hỏi tự nhiên

- **"Làm sao biết subproblem có chồng lấp?"** — Vẽ cây đệ quy vài mức. Nếu thấy cùng một bài con `(tham số giống hệt)` xuất hiện ở nhiều nhánh → chồng lấp → cần DP. Nếu mỗi bài con là một "lát cắt" riêng của dữ liệu (vd đoạn mảng khác nhau) → độc lập → D&C.
- **"Max subarray dùng D&C được mà sao nói nó liên quan DP?"** — D&C ở mục 4.4 *được* (subproblem là 2 nửa rời nhau). Nhưng Kadane nhìn bài toán theo lăng kính DP (subproblem "đoạn tốt nhất KẾT THÚC tại i" chồng lấp được dùng lại) và nhanh hơn. Cùng bài toán, 2 paradigm.

Bạn sẽ học DP đầy đủ ở [Tier 4](../tier-4-dynamic-programming/index.html).

### 📝 Tóm tắt mục 5

- D&C: bài con **độc lập**, không memo.
- DP: bài con **chồng lấp**, bắt buộc memo, nếu không → bùng nổ mũ.
- Test nhanh: vẽ cây đệ quy, có node lặp lại ⇒ DP.

---

## 6. Tính song song (Parallelism)

### 💡 Vì sao D&C dễ song song hoá

Vì các subproblem **độc lập** (mục 5), giải bài con A *không cần* kết quả bài con B. Hai bài con có thể chạy trên **2 lõi CPU khác nhau cùng lúc**. Chỉ bước Combine mới cần đợi cả hai xong.

Ví dụ merge sort song song trong Go (dùng goroutine):

```go
func parallelMergeSort(a []int, depth int) {
    if len(a) <= 1 {
        return
    }
    mid := len(a) / 2
    if depth > 0 { // còn "ngân sách" tạo goroutine -> chạy song song
        var wg sync.WaitGroup
        wg.Add(2)
        go func() { defer wg.Done(); parallelMergeSort(a[:mid], depth-1) }()
        go func() { defer wg.Done(); parallelMergeSort(a[mid:], depth-1) }()
        wg.Wait() // đợi cả 2 nửa xong rồi mới combine
    } else { // hết ngân sách -> tuần tự (tránh tạo quá nhiều goroutine)
        parallelMergeSort(a[:mid], 0)
        parallelMergeSort(a[mid:], 0)
    }
    merge(a, mid) // Combine: phải đợi 2 nửa
}
```

### ⚠ Lỗi thường gặp

- **Tạo goroutine không giới hạn** → với mảng triệu phần tử, cây đệ quy sinh hàng triệu goroutine → overhead nuốt hết lợi ích. Quy tắc: giới hạn `depth` (vd song song tới mức `log(số lõi)`, dưới đó tuần tự).
- **Data race ở Combine** nếu 2 nửa cùng ghi vùng nhớ chung — phải đảm bảo chia vùng rõ ràng (như `a[:mid]` / `a[mid:]` ở trên không giao nhau).

> Quicksort cũng song song được (2 phần sau partition độc lập). Đây là một lý do thực tế D&C được ưa chuộng trên hệ thống nhiều lõi.

---

## 7. Khi nào nên dùng Divide & Conquer

Dùng D&C khi **cả ba** điều kiện sau thoả:

1. **Chia được thành bài con cùng dạng**: bài toán nhỏ là phiên bản thu nhỏ của bài gốc (đệ quy tự nhiên).
2. **Bài con độc lập**: không chồng lấp (nếu chồng lấp → cân nhắc DP, mục 5).
3. **Combine rẻ hơn giải trực tiếp**: tổng (chia + gộp) ở mỗi mức phải đủ rẻ để Master Theorem cho kết quả tốt hơn brute force. Nếu combine quá đắt (`f(n)` lớn → Case 3) thì D&C *không* cải thiện.

### ❓ Câu hỏi tự nhiên

- **"Có bài toán nào D&C tệ hơn cách thẳng không?"** — Có. Max subarray: D&C O(n log n) thua Kadane O(n). Tìm min/max mảng: D&C O(n) nhưng hằng số lớn hơn 1 vòng for O(n). D&C không phải "thuốc tiên".

### 📝 Tóm tắt mục 7

Dùng D&C khi: bài con **cùng dạng** + **độc lập** + **combine rẻ**. Thiếu một trong ba → tìm paradigm khác.

---

## 8. Cạm bẫy thường gặp

| Cạm bẫy | Triệu chứng | Cách tránh |
|---|---|---|
| **Base case sai/thiếu** | Stack overflow hoặc kết quả sai | Liệt kê mọi kích thước nhỏ (`n=0,1`), test riêng |
| **Bài con không nhỏ hơn** | Đệ quy vô hạn (vd `[lo,hi]→[lo,hi]`) | Đảm bảo mỗi nhánh giảm kích thước thực sự |
| **Combine đắt hơn dự kiến** | Big-O tệ hơn kỳ vọng (rơi Case 3) | Lập recurrence, tra Master Theorem trước khi code |
| **Subproblem chồng lấp** | Thời gian bùng nổ mũ (vd fib ngây thơ) | Nhận diện overlap → chuyển sang DP + memo |
| **Đệ quy quá sâu** | Stack overflow với n lớn | Tăng ngưỡng base case, hoặc chuyển bottom-up/iterative |
| **Goroutine vô hạn (song song)** | Overhead nuốt lợi ích | Giới hạn depth song song |

### 🔁 Dừng lại tự kiểm tra

Bạn viết hàm `solve([lo, hi])` chia thành `solve([lo, mid])` và `solve([mid, hi])`. Có bug gì?

<details><summary>Đáp án</summary>

Bài con thứ 2 là `[mid, hi]` — chứa `mid` trùng với bài con thứ 1, và khi `hi = lo+1` thì `mid = lo`, bài con `[mid, hi] = [lo, hi]` **bằng bài gốc** → đệ quy vô hạn. Phải là `[mid+1, hi]` (loại trùng và đảm bảo nhỏ thực sự).

</details>

### Cây đệ quy — công cụ chẩn đoán mọi cạm bẫy

💡 Khi nghi ngờ thuật toán D&C có vấn đề, **vẽ cây đệ quy** vài mức là cách nhanh nhất để phát hiện:

```
                 T(n)                <- gốc: chi phí f(n)
              /        \
          T(n/2)      T(n/2)         <- mức 1: tổng f(n/2)·2
          /    \      /    \
       T(n/4) T(n/4) ...               <- mức 2: tổng f(n/4)·4
        ...
       T(1) T(1) ... T(1)            <- lá: n lá
```

- Chiều cao cây = `log_b n` (mỗi mức chia n cho b). Quá sâu → stack overflow.
- Tổng chi phí một mức `i` = `a^i · f(n/b^i)`. So tổng các mức → quyết định Case nào của Master.
- **Lá lặp lại cùng tham số** → đó là dấu hiệu overlap (DP), không phải D&C.

**Ví dụ số chẩn đoán** với `T(n)=2T(n/2)+n` (merge sort), `n=8`:
- mức 0: `8` (1 node × cost 8)
- mức 1: `4+4 = 8` (2 node × cost 4)
- mức 2: `2+2+2+2 = 8` (4 node × cost 2)
- mức 3 (lá): `1×8 = 8` (8 node × cost 1)
- Tổng = `8 × 4 mức = 8 × log₂8 = n·log n`. Đúng `Θ(n log n)`. ✓ Mỗi mức tốn như nhau (`n`) là đặc trưng Case 2.

### 📝 Tóm tắt mục 8

Bốn bug chí mạng: base case, bài con không nhỏ đi, combine quá đắt, overlap không nhận ra. Lập recurrence + vẽ cây đệ quy trước khi code. Mỗi mức của cây tốn `a^i·f(n/b^i)` — cộng lại ra Big-O.

---

## Bài tập

> Với mỗi bài: nêu **recurrence** và dùng **Master Theorem** ra Big-O. Lời giải chi tiết ở mục sau.

1. **Maximum subarray (D&C) vs Kadane**: cài `maxSubarrayDC` (mục 4.4). Sau đó cài Kadane O(n). So sánh recurrence và Big-O của hai cách.
2. **Count inversions**: cài hàm đếm cặp đảo O(n log n) (mục 4.3). Test với `[5,4,3,2,1]` (kỳ vọng max inversion).
3. **Fast power**: cài `pow(x, n)` O(log n) cho mũ nguyên (cả âm). Đếm số phép nhân khi tính `x^100`.
4. **Majority element**: tìm phần tử xuất hiện > n/2 lần. So sánh **Boyer-Moore O(n)** với **D&C O(n log n)**. Cài cả hai, nêu recurrence D&C.
5. **Pow với mod**: cài `powMod(x, n, m) = x^n mod m` O(log n). Tính `3^45 mod 7`.
6. **Closest pair — ý tưởng**: mô tả thuật toán closest pair O(n log n) bằng lời (không cần code đầy đủ), giải thích vì sao combine chỉ O(n) (giới hạn 7 điểm trong strip), và nêu recurrence.

---

## Lời giải chi tiết

### Bài 1 — Max subarray: D&C vs Kadane

**D&C** (`maxSubarrayDC`, mục 4.4): `T(n)=2T(n/2)+O(n)`. Master: `a=2,b=2,c=log₂2=1`, `f(n)=Θ(n^1)=Θ(n^c)` → **Case 2** → **Θ(n log n)**.

**Kadane** (DP tuyến tính): duy trì `cur` = tổng đoạn tốt nhất KẾT THÚC tại `i`; nếu `cur` âm thì vứt (bắt đầu lại). `best` = max toàn cục.

```go
func kadane(a []int) int {
    best, cur := a[0], a[0]
    for i := 1; i < len(a); i++ {
        // hoặc nối a[i] vào đoạn trước, hoặc bắt đầu đoạn mới tại a[i]
        if cur+a[i] > a[i] {
            cur = cur + a[i]
        } else {
            cur = a[i]
        }
        if cur > best { best = cur }
    }
    return best
}
```

`T(n)=O(n)` — một lượt quét, không đệ quy. **Kết luận**: cùng kết quả, Kadane (O(n)) nhanh hơn D&C (O(n log n)). Đây là minh chứng D&C không luôn tối ưu (mục 7). Với `[-2,1,-3,4,-1,2,1,-5,4]` cả hai cho **6**.

### Bài 2 — Count inversions

Dùng `countInversions` (mục 4.3). `T(n)=2T(n/2)+O(n)` → **Case 2** → **Θ(n log n)**.

Với `[5,4,3,2,1]`: mảng sort ngược hoàn toàn → mọi cặp đều đảo → `C(5,2)=5·4/2 = 10` inversion (giá trị tối đa). Walk-through ngắn: chia `[5,4]` (1 inv) + `[3,2,1]` (3 inv) + merge chéo (6 inv) = 10. ✓

### Bài 3 — Fast power, đếm phép nhân `x^100`

Dùng `fastPow` (mục 4.7). `T(n)=T(n/2)+O(1)` → `a=1,b=2,c=0`, `f=Θ(1)=Θ(n^0)` → **Case 2** → **Θ(log n)**.

Số phép nhân cho `x^100`: `100 = 1100100₂` (7 bit, 3 bit '1'). Phương pháp bình phương-và-nhân: `7−1 = 6` phép bình phương + `(3−1) = 2` phép nhân = **~8 phép nhân**, thay vì 99 phép của cách ngây thơ. (Hằng số chính xác tuỳ cài đặt; bậc là `Θ(log n)`.)

### Bài 4 — Majority element: Boyer-Moore vs D&C

**Boyer-Moore voting — O(n), O(1) bộ nhớ**: giữ 1 ứng viên + 1 bộ đếm. Gặp phần tử bằng ứng viên → `count++`; khác → `count--`; `count==0` → đổi ứng viên.

```go
func majorityBoyerMoore(a []int) int {
    cand, count := a[0], 0
    for _, x := range a {
        if count == 0 { cand = x }
        if x == cand { count++ } else { count-- }
    }
    return cand // giả định majority tồn tại
}
```

Trực giác: mỗi phần tử "khác" triệt tiêu một phần tử majority; vì majority > n/2 nên nó không thể bị triệt tiêu hết.

**D&C — O(n log n)**: chia đôi, tìm majority mỗi nửa (đệ quy). Combine: nếu 2 nửa cùng majority → đó là kết quả; nếu khác → đếm số lần xuất hiện của *cả hai* ứng viên trong toàn đoạn (O(n)), chọn cái > nửa.

`T(n)=2T(n/2)+O(n)` → **Case 2** → **Θ(n log n)**.

**Kết luận**: Boyer-Moore (O(n), O(1) bộ nhớ) thắng tuyệt đối. D&C ở đây là bài tập tư duy combine.

### Bài 5 — `powMod(3, 45, 7)`

Dùng `powMod` (mục 4.7). `45 = 101101₂`. Bình phương-và-nhân với `%7`:

| bước | bit | x (mod 7) | result (mod 7) |
|---|---|---|---|
| khởi tạo | — | 3 | 1 |
| bit 1 (LSB)=1 | 1 | 3 | 1·3=3 |
| | | 3²=9≡2 | 3 |
| bit=0 | 0 | 2²=4 | 3 |
| bit=1 | 1 | 4²=16≡2 | 3·4=12≡5 |
| bit=1 | 1 | 2²=4 | 5·2=10≡3 |
| bit=0 | 0 | 4²=16≡2 | 3 |
| bit=1 | 1 | — | 3·2=6 |

Kết quả `3^45 mod 7 = 6`. **Kiểm tra**: `3^6 ≡ 1 (mod 7)` (Fermat), `45 = 6·7 + 3`, nên `3^45 ≡ 3^3 = 27 ≡ 6 (mod 7)`. ✓ `T = Θ(log n)`.

### Bài 6 — Closest pair (ý tưởng) & recurrence

1. **Sort** điểm theo `x` (một lần, O(n log n)).
2. **Divide**: cắt tại đường `x = mid`, hai nửa `L`, `R` cỡ n/2.
3. **Conquer**: `δ = min(closest(L), closest(R))` đệ quy.
4. **Combine**: cặp gần nhất *xuyên* đường chia phải nằm trong **strip** rộng `2δ` quanh đường. Sort các điểm strip theo `y`; với mỗi điểm chỉ so **tối đa 7 điểm kế tiếp** theo `y`. Lý do giới hạn 7: trong hình chữ nhật `δ × 2δ`, hai điểm cùng phía cách nhau ≥ δ → nhồi tối đa 8 điểm → mỗi điểm chỉ cần xét 7 điểm sau. Combine = **O(n)**.

**Recurrence**: `T(n)=2T(n/2)+O(n)` → `a=2,b=2,c=1,f=Θ(n^1)` → **Case 2** → **Θ(n log n)**. Nhanh hơn hẳn brute force O(n²).

---

## Code & Minh hoạ

- Toàn bộ code Go ở trên là **inline trong README** (lesson này không có `solutions.go` riêng).
- [visualization.html](./visualization.html) — 3 module tương tác:
  1. **Cây D&C — Max subarray**: animate chia đôi mảng + combine 3 trường hợp (trái / phải / xuyên giữa).
  2. **Fast power**: animate chia đôi mũ `x^13 = x^8·x^4·x^1`, đếm số phép nhân ~ log n.
  3. **D&C vs DP**: visualize cây đệ quy subproblem **độc lập** (merge sort) vs **chồng lấp** (fibonacci cần memo).

---

## Bài tiếp theo

- [Lesson 18 — Backtracking](../lesson-18-backtracking/) — paradigm "thử-và-quay-lui": cũng đệ quy như D&C nhưng *khám phá không gian lựa chọn* thay vì chia bài toán.
- [Tier 4 — Quy hoạch động (DP)](../tier-4-dynamic-programming/index.html) — xử lý subproblem chồng lấp mà D&C không kham nổi.
- [Tier 7 — Number Theory](../tier-7-advanced/index.html) — modular exponentiation (`powMod`) làm nền RSA, Diffie-Hellman.
