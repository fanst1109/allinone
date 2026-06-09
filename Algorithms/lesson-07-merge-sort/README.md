# Lesson 07 — Merge Sort (Sắp xếp trộn)

> **Tier 1 — Sắp xếp · Lesson 07**
> Thuật toán sắp xếp đầu tiên đạt $O(n \log n)$ ở **mọi** trường hợp, theo paradigm **chia để trị (divide & conquer)**, và là nền tảng cho **external sort** (sắp xếp dữ liệu không vừa RAM).

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Hiểu paradigm **divide & conquer** qua merge sort: chia đôi → giải đệ quy → **merge** (trộn).
- Cài được hàm **merge** hai mảng đã sort thành một mảng sort trong $O(n)$ bằng **two pointer**.
- Cài merge sort **top-down** (đệ quy) và **bottom-up** (lặp), hiểu sự tương đương của chúng.
- Chứng minh độ phức tạp $T(n) = 2T(n/2) + O(n) = O(n \log n)$ cho **best = average = worst** bằng Master Theorem (case 2) và bằng cây đệ quy.
- Hiểu vì sao merge sort **tốn $O(n)$ bộ nhớ phụ** (không in-place) và vì sao nó **ổn định (stable)**.
- Áp dụng merge sort cho **external sort** và biến thể **đếm nghịch thế (count inversions)** trong $O(n \log n)$.
- So sánh merge sort với quicksort (tease Lesson 08) để biết khi nào chọn cái nào.

## Kiến thức tiền đề

- [Lesson 03 — Đệ quy & Recurrence](../lesson-03-recursion-recurrence/README.md): công thức truy hồi $T(n) = 2T(n/2) + O(n)$, Master Theorem. Bài này **đóng** câu hỏi "tại sao recurrence đó cho $O(n \log n)$".
- [Lesson 04 — Tính đúng đắn & Invariant](../lesson-04-correctness-invariant/README.md): chứng minh merge đúng bằng loop invariant.
- [Lesson 06 — Elementary Sorts](../lesson-06-elementary-sorts/README.md): bubble/insertion/selection đều $O(n^2)$. Merge sort là bước nhảy đầu tiên xuống $O(n \log n)$.
- Khái niệm **stability** (ổn định) đã chạm ở Lesson 06 — bài này chứng minh chặt cho merge sort.

---

## 1. Divide & Conquer — chia để trị

### 1.1 Trực giác trước

> 💡 **Trực giác / Hình dung.** Bạn có một cọc 8 bài thi cần xếp theo điểm. Cách "ngây thơ" (insertion sort): cầm từng bài, dò từ đầu cọc đã xếp để chèn đúng chỗ — mỗi lần chèn phải đẩy nhiều bài, tốn $O(n^2)$.
>
> Cách **chia để trị**: đưa 4 bài cho bạn A, 4 bài cho bạn B, mỗi người tự xếp xong nửa của mình. Giờ bạn có **hai cọc đã sort**. Việc còn lại chỉ là **trộn** hai cọc: liên tục lấy bài có điểm nhỏ hơn ở **đỉnh** hai cọc đặt xuống. Trộn hai cọc đã sort thì dễ — chỉ cần nhìn hai bài trên cùng, không cần dò sâu.
>
> Mấu chốt: **chia bài toán to thành hai bài nhỏ giống hệt, giải xong rồi ghép lại rẻ**. Đó là divide & conquer.

Ba bước của divide & conquer áp dụng cho sắp xếp:

1. **Divide (chia)**: chia mảng $n$ phần tử thành hai nửa, mỗi nửa $n/2$ phần tử.
2. **Conquer (giải)**: sort **đệ quy** mỗi nửa. Khi nửa chỉ còn 1 phần tử → đã sort sẵn (base case).
3. **Combine (ghép)**: **merge** hai nửa đã sort thành một mảng đã sort.

### 1.2 Khung tổng quát

```go
// Khung divide & conquer cho sắp xếp.
// (chưa phải code chạy — chỉ là pseudo-Go để thấy 3 bước)
func sort(a []int) []int {
    if len(a) <= 1 {            // base case: 0 hoặc 1 phần tử đã sort sẵn
        return a
    }
    mid := len(a) / 2
    left := sort(a[:mid])       // conquer nửa trái (đệ quy)
    right := sort(a[mid:])      // conquer nửa phải (đệ quy)
    return merge(left, right)   // combine: trộn hai nửa đã sort
}
```

> ❓ **Câu hỏi tự nhiên của người đọc.**
>
> - *"Tại sao chia đôi mà không chia ba, chia bốn?"* — Chia đôi cho recurrence $T(n) = 2T(n/2) + O(n)$. Chia $k$ phần cho $T(n) = kT(n/k) + O(n \log k)$ (chi phí merge $k$ chiều) — vẫn $O(n \log n)$ nhưng hằng số lớn hơn và code phức tạp hơn. Chia đôi là đơn giản nhất mà vẫn tối ưu tiệm cận. (Chia $k$ chiều có ích cho external sort — xem mục 8.)
> - *"Base case `len <= 1` có đúng không, sao không `== 0`?"* — Mảng 0 hoặc 1 phần tử đều **đã sort sẵn**, không cần làm gì. Nếu chỉ dừng ở `== 0` thì mảng 1 phần tử vẫn chia tiếp → `a[:0]` rỗng và `a[1:]` rỗng → đệ quy vô hạn hoặc thừa. Dừng ở `<= 1` là an toàn và đúng.
> - *"Liên kết với Lesson 03 thế nào?"* — Recurrence $T(n) = 2T(n/2) + O(n)$ chính là ví dụ kinh điển trong [Lesson 03](../lesson-03-recursion-recurrence/README.md). Mục 4 dưới đây giải nó ra $O(n \log n)$.

> 📝 **Tóm tắt mục 1.**
> - Divide & conquer = chia (chia đôi mảng) → conquer (sort đệ quy mỗi nửa) → combine (merge).
> - Base case: mảng ≤ 1 phần tử đã sort sẵn.
> - Cốt lõi nằm ở bước **merge** — phải rẻ ($O(n)$) thì toàn bộ mới $O(n \log n)$.

---

## 2. Merge hai mảng đã sort — trái tim của thuật toán

### 2.1 Trực giác

> 💡 **Trực giác / Hình dung.** Hai cọc bài đã sort úp xuống, bài điểm thấp ở trên. Bạn cầm hai tay đặt ở **đỉnh** hai cọc. Mỗi bước: so điểm hai bài trên đỉnh, lấy bài **nhỏ hơn** đặt vào cọc kết quả, rồi tay đó nhích xuống bài kế. Lặp đến khi một cọc hết, đổ nốt cọc còn lại. Vì mỗi bài chỉ bị "chạm" đúng một lần → trộn $n$ bài tốn $O(n)$.

Kỹ thuật là **two pointer** (hai con trỏ): con trỏ `i` quét mảng trái, `j` quét mảng phải. Tại mỗi bước so `left[i]` với `right[j]`, lấy phần tử nhỏ hơn vào kết quả, đẩy con trỏ tương ứng tiến lên.

### 2.2 Walk-through bằng số: merge `[1,4,7]` và `[2,3,8]`

Hai mảng đã sort. `L = [1,4,7]`, `R = [2,3,8]`. `i` trỏ vào `L`, `j` trỏ vào `R`, `out` là kết quả.

| Bước | `i` | `j` | `L[i]` | `R[j]` | So sánh | Lấy | `out` |
|:----:|:---:|:---:|:------:|:------:|:--------|:----|:------|
| khởi tạo | 0 | 0 | 1 | 2 | — | — | `[]` |
| 1 | 0 | 0 | 1 | 2 | `1 ≤ 2` → lấy trái | 1 | `[1]` |
| 2 | 1 | 0 | 4 | 2 | `4 > 2` → lấy phải | 2 | `[1,2]` |
| 3 | 1 | 1 | 4 | 3 | `4 > 3` → lấy phải | 3 | `[1,2,3]` |
| 4 | 1 | 2 | 4 | 8 | `4 ≤ 8` → lấy trái | 4 | `[1,2,3,4]` |
| 5 | 2 | 2 | 7 | 8 | `7 ≤ 8` → lấy trái | 7 | `[1,2,3,4,7]` |
| 6 | 3 | — | — | 8 | `L` hết → đổ nốt `R` | 8 | `[1,2,3,4,7,8]` |

Tổng cộng 6 lần "chạm" cho 6 phần tử → đúng $O(n)$. Kết quả `[1,2,3,4,7,8]` đã sort. ✓

### 2.3 Thêm 3 ví dụ số (đa dạng edge case)

**Ví dụ A — một mảng rỗng:** `merge([], [2,5,9]) = [2,5,9]`. Vòng so sánh không chạy lần nào, nhánh "đổ nốt phải" copy thẳng `[2,5,9]`. ✓

**Ví dụ B — có phần tử âm và trùng:** `merge([-3, 0, 0], [-5, 0, 4])`:
- `-5 < -3` → lấy `-5`. `out=[-5]`
- `-3 < 0` → lấy `-3`. `out=[-5,-3]`
- `0 ≤ 0` (bằng nhau, **ưu tiên trái** — quan trọng cho stability!) → lấy `0` (của trái). `out=[-5,-3,0ₗ]`
- `0 ≤ 0` → lấy `0` (của trái). `out=[-5,-3,0ₗ,0ₗ]`
- trái hết → đổ nốt phải `0ᵣ, 4`. `out=[-5,-3,0ₗ,0ₗ,0ᵣ,4]` ✓

**Ví dụ C — một mảng nằm hoàn toàn trước mảng kia:** `merge([1,2], [10,20])`:
- `1 ≤ 10` lấy 1; `2 ≤ 10` lấy 2; trái hết → đổ `10,20`. `out=[1,2,10,20]`. Chỉ 2 lần so sánh — best case của merge.

**Ví dụ D — xen kẽ tối đa:** `merge([1,3,5], [2,4,6])`:
- lấy 1, 2, 3, 4, 5 (5 lần so sánh), trái hết, đổ 6 → `[1,2,3,4,5,6]`. Đây là worst case về số lần so sánh: $n-1$.

### 2.4 Code Go — hàm merge

```go
// merge trộn hai mảng ĐÃ SORT (a và b) thành một mảng sort mới.
// Độ phức tạp: O(len(a)+len(b)) thời gian, O(len(a)+len(b)) bộ nhớ (mảng out).
func merge(a, b []int) []int {
    out := make([]int, 0, len(a)+len(b)) // cấp đủ chỗ trước, tránh realloc
    i, j := 0, 0
    for i < len(a) && j < len(b) {
        // QUAN TRỌNG cho STABILITY: dùng <= (ưu tiên trái khi bằng).
        // Nếu dùng < thì phần tử phải sẽ "chen" lên trước → mất ổn định.
        if a[i] <= b[j] {
            out = append(out, a[i])
            i++
        } else {
            out = append(out, b[j])
            j++
        }
    }
    // Một trong hai mảng đã hết. Đổ nốt phần còn lại (đã sort sẵn).
    out = append(out, a[i:]...) // nếu a hết thì a[i:] rỗng — vô hại
    out = append(out, b[j:]...)
    return out
}
```

> ⚠ **Lỗi thường gặp.**
> - **Dùng `<` thay vì `<=`** → mất stability. Khi `a[i] == b[j]`, dùng `<` sẽ chọn `b[j]` trước → phần tử phải vượt lên trước phần tử trái có cùng khóa. Xem mục 6.
> - **Quên đổ nốt phần còn lại.** Vòng `for` dừng ngay khi **một** mảng hết, mảng kia còn phần tử chưa copy. Bỏ quên hai dòng `append(...a[i:]...)`/`...b[j:]...` → mất dữ liệu, kết quả thiếu phần tử.
> - **So sai biên.** Điều kiện phải là `i < len(a) && j < len(b)` (cả hai còn). Viết `||` → truy cập `a[i]` khi `i == len(a)` → panic index out of range.

> 🔁 **Dừng lại tự kiểm tra.**
> 1. `merge([2], [1])` cho ra gì và mất mấy lần so sánh?
> 2. Vì sao `out = make([]int, 0, len(a)+len(b))` dùng cap nhưng len = 0?
>
> <details><summary>Đáp án</summary>
>
> 1. So `2 > 1` → lấy `1`, phải hết, đổ nốt trái `2`. Kết quả `[1,2]`, **1** lần so sánh.
> 2. `append` không cần cấp phát lại vì cap đã đủ; len bắt đầu 0 để `append` thêm dần đúng thứ tự. Nếu set len = tổng thì `out` sẽ có sẵn các số 0 ở đầu, `append` lại nối tiếp sau → sai.
> </details>

> 📝 **Tóm tắt mục 2.**
> - Merge hai mảng sort = two pointer, lấy min ở hai đỉnh, $O(n)$ thời gian.
> - `<=` (ưu tiên trái) giữ **stability**.
> - Luôn nhớ **đổ nốt phần còn lại** sau vòng lặp.

---

## 3. Merge sort đầy đủ — top-down (đệ quy)

### 3.1 Ý tưởng

Ghép mục 1 (chia + đệ quy) với mục 2 (merge): chia đến khi mỗi mảnh còn 1 phần tử (đã sort), rồi **merge ngược lên** thành các mảnh lớn dần.

```go
// mergeSort (top-down): trả về mảng MỚI đã sort, không sửa input.
// T(n) = 2T(n/2) + O(n) = O(n log n) mọi trường hợp.
func mergeSort(a []int) []int {
    if len(a) <= 1 {
        return a // base case: đã sort
    }
    mid := len(a) / 2
    left := mergeSort(a[:mid])  // sort nửa trái
    right := mergeSort(a[mid:]) // sort nửa phải
    return merge(left, right)   // trộn lại
}
```

### 3.2 Walk-through bằng số: sort `[5,2,4,1,3]`

**Pha CHIA (đi xuống)** — mỗi node chia đôi cho tới size 1. Với mảng lẻ, `mid = len/2`, nửa trái nhỏ hơn:

```
                 [5,2,4,1,3]                  mid=2 → trái [5,2], phải [4,1,3]
                /            \
          [5,2]               [4,1,3]         [4,1,3]: mid=1 → [4], [1,3]
          /    \              /      \
       [5]     [2]         [4]       [1,3]    [1,3]: mid=1 → [1],[3]
                                     /   \
                                  [1]    [3]
```

**Pha MERGE (đi lên)** — merge từng cặp con đã sort, từ lá lên gốc:

```
Bước 1: merge([5],[2])     → [2,5]            (so 5>2)
Bước 2: merge([1],[3])     → [1,3]            (so 1≤3)
Bước 3: merge([4],[1,3])   → [1,3,4]          (4>1, 4>3, đổ 4)
Bước 4: merge([2,5],[1,3,4]) → ?
        i,j: 2 vs 1 → 1; 2 vs 3 → 2; 5 vs 3 → 3; 5 vs 4 → 4; trái còn 5 → đổ 5
        → [1,2,3,4,5]
Kết quả cuối: [1,2,3,4,5] ✓
```

> ❓ **Câu hỏi tự nhiên của người đọc.**
> - *"Cây có bao nhiêu tầng?"* — Mỗi tầng chia đôi kích thước, từ $n$ xuống $1$ mất $\lceil \log_2 n \rceil$ tầng. Với $n=5$: $5 \to 2/3 \to 1$ ≈ 3 tầng chia. Tổng quát $\log_2 n$. (Xem mục 4.)
> - *"Mỗi tầng tốn bao nhiêu công?"* — Tổng kích thước các merge ở **một tầng** luôn = $n$ (vì các mảnh không chồng nhau, ghép lại đúng cả mảng). Nên mỗi tầng $O(n)$, có $\log n$ tầng → $O(n \log n)$.
> - *"Có sửa mảng gốc không?"* — Bản trên trả về mảng **mới**, không sửa input (vì `merge` tạo `out` mới). Có biến thể sort tại chỗ trong mảng dùng index `lo, hi` + mảng `tmp` dùng lại (xem mục 5 và bài tập).

> 🔁 **Dừng lại tự kiểm tra.** Trace `mergeSort([3,1,2])`. Cây chia và thứ tự merge?
>
> <details><summary>Đáp án</summary>
>
> `mid=1` → trái `[3]`, phải `[1,2]`. Phải: `mid=1` → `[1]`,`[2]` → merge `[1,2]`. Rồi merge `[3]` với `[1,2]`: `3>1`→1; `3>2`→2; đổ 3 → `[1,2,3]`. ✓
> </details>

> 📝 **Tóm tắt mục 3.**
> - Top-down = đệ quy chia đôi tới lá (size 1), rồi merge ngược lên.
> - Cây cao $\log n$ tầng, mỗi tầng $O(n)$ công → $O(n \log n)$.

---

## 4. Độ phức tạp — `O(n log n)` ở MỌI trường hợp

### 4.1 Recurrence và Master Theorem

Gọi $T(n)$ = số phép so sánh/di chuyển để sort $n$ phần tử:

```
T(n) = 2·T(n/2) + Θ(n)
       └──┬───┘   └─┬─┘
   2 lời gọi đệ quy   chi phí merge (O(n))
   trên nửa kích thước
```

Đây đúng dạng Master Theorem (xem [Lesson 03](../lesson-03-recursion-recurrence/README.md)): $T(n) = a \cdot T(n/b) + f(n)$ với $a = 2$, $b = 2$, $f(n) = \Theta(n)$.

- Tính $n^{\log_b a} = n^{\log_2 2} = n^1 = n$.
- So sánh với $f(n) = \Theta(n) = \Theta(n^{\log_b a})$ → **Case 2** của Master Theorem.
- Kết quả: $T(n) = \Theta(n^{\log_b a} \cdot \log n) = \Theta(n \log n)$. ∎

### 4.2 Cây đệ quy — chứng minh trực quan bằng số

Đếm công bằng cách cộng theo từng tầng. Lấy $n = 8$:

| Tầng | Số mảnh | Kích thước mỗi mảnh | Công merge mỗi mảnh | Công tầng |
|:----:|:-------:|:-------------------:|:-------------------:|:---------:|
| 0 (gốc) | 1 | 8 | 8 | **8** |
| 1 | 2 | 4 | 4 | 2×4 = **8** |
| 2 | 4 | 2 | 2 | 4×2 = **8** |
| 3 (lá) | 8 | 1 | 1 (không merge) | **8** |

Số tầng = $\log_2 8 + 1 = 4$. Tổng công = $8 \times 4 = 32 = n \cdot (\log_2 n + 1) = \Theta(n \log n)$. ✓

> 💡 **Trực giác.** Mỗi tầng "chạm" mỗi phần tử đúng một lần khi merge → $n$ công/tầng. Số tầng = số lần chia đôi $n$ về $1$ = $\log_2 n$. Nhân lại: $n \log n$. Hình dung như tờ giấy gấp đôi: gấp $\log_2 n$ lần thì còn 1 ô.

### 4.3 Tại sao best = average = worst đều `n log n`?

Khác hẳn quicksort (worst $O(n^2)$), merge sort **luôn** chia đôi đều đặn bất kể dữ liệu, và merge luôn quét hết $n$ phần tử bất kể chúng đã sort hay đảo ngược. Recurrence $T(n) = 2T(n/2) + \Theta(n)$ **không phụ thuộc input** → ba trường hợp bằng nhau.

> ❓ **Câu hỏi tự nhiên.** *"Mảng đã sort sẵn thì merge sort có nhanh hơn không?"* — **Không** (về tiệm cận). Vẫn chia $\log n$ tầng, vẫn merge $n$ mỗi tầng. (So với insertion sort: mảng sort sẵn là best case $O(n)$.) Đây vừa là ưu điểm (đảm bảo) vừa là nhược điểm (không tận dụng được dữ liệu đã gần sort — Timsort sửa điều này, xem Lesson 11).

> ⚠ **Lỗi thường gặp.** Tưởng "merge sort nhanh hơn quicksort vì không có worst $O(n^2)$". Thực tế quicksort thường **nhanh hơn về hằng số** (in-place, cache-friendly). Merge sort thắng ở **đảm bảo** và **stability**, không phải tốc độ thô. Xem mục 10.

> 📝 **Tóm tắt mục 4.** $T(n)=2T(n/2)+\Theta(n)$ → Master Theorem case 2 → $\Theta(n \log n)$ cho best=avg=worst. Cây đệ quy: $\log n$ tầng × $n$ công/tầng.

---

## 5. Space — `O(n)` bộ nhớ phụ, KHÔNG in-place

### 5.1 Vì sao tốn bộ nhớ?

Bước merge **không thể trộn tại chỗ** một cách dễ dàng: để chèn phần tử của mảng phải vào giữa mảng trái cần dịch chuyển → quay về $O(n^2)$. Cách chuẩn là dùng **mảng tạm (temp)** kích thước $O(n)$ để chứa kết quả merge rồi copy ngược lại.

> 💡 **Trực giác.** Trộn hai cọc bài đã sort vào một cọc mới cần một mặt bàn trống đủ chỗ cho $n$ bài. Không có chỗ trống thì phải đẩy bài qua lại → chậm.

### 5.2 Bản in-place-trong-mảng (vẫn `O(n)` temp)

Bản dùng index thay vì cắt slice, sort ngay trong mảng `a`, chỉ cấp **một** mảng `tmp` dùng lại:

```go
// mergeSortInPlace sort a tại chỗ (sửa a), dùng MỘT mảng tmp cấp một lần.
// Vẫn O(n) bộ nhớ phụ (mảng tmp), KHÔNG phải O(1).
func mergeSortInPlace(a []int) {
    tmp := make([]int, len(a)) // cấp DUY NHẤT một lần — tránh cấp lại mỗi merge
    sortRange(a, tmp, 0, len(a)-1)
}

func sortRange(a, tmp []int, lo, hi int) {
    if lo >= hi { // 0 hoặc 1 phần tử
        return
    }
    mid := lo + (hi-lo)/2 // tránh tràn số với (lo+hi)/2 khi index lớn
    sortRange(a, tmp, lo, mid)
    sortRange(a, tmp, mid+1, hi)
    mergeRange(a, tmp, lo, mid, hi)
}

// mergeRange trộn a[lo..mid] và a[mid+1..hi] (đã sort) qua tmp.
func mergeRange(a, tmp []int, lo, mid, hi int) {
    copy(tmp[lo:hi+1], a[lo:hi+1]) // sao vùng cần merge sang tmp
    i, j, k := lo, mid+1, lo
    for i <= mid && j <= hi {
        if tmp[i] <= tmp[j] { // <= giữ stability
            a[k] = tmp[i]; i++
        } else {
            a[k] = tmp[j]; j++
        }
        k++
    }
    for i <= mid { a[k] = tmp[i]; i++; k++ } // đổ nốt nửa trái
    for j <= hi  { a[k] = tmp[j]; j++; k++ } // đổ nốt nửa phải
}
```

> ❓ **Câu hỏi tự nhiên.**
> - *"Có merge sort $O(1)$ bộ nhớ không?"* — **Có** (in-place merge sort), nhưng cài đặt phức tạp và hằng số lớn, hiếm dùng. Một ngoại lệ đẹp: merge sort trên **linked list** đạt $O(1)$ bộ nhớ phụ vì chỉ cần đổi con trỏ, không cần mảng tạm — xem bài tập 4.
> - *"Tại sao `lo + (hi-lo)/2` mà không `(lo+hi)/2`?"* — Với index rất lớn, `lo+hi` có thể tràn kiểu số. `lo + (hi-lo)/2` cho cùng giá trị mà không tràn. Thói quen tốt (bug nổi tiếng của binary search Java 2006).

> 📝 **Tóm tắt mục 5.** Merge sort cần $O(n)$ bộ nhớ phụ (mảng tmp) → **không in-place** — nhược điểm chính so với quicksort/heapsort. Linked list là ngoại lệ $O(1)$.

---

## 6. Stability — merge sort ỔN ĐỊNH

### 6.1 Ổn định nghĩa là gì?

**Ổn định (stable)**: các phần tử có **khóa bằng nhau** giữ nguyên thứ tự tương đối như trong input. Quan trọng khi sort theo nhiều khóa (sort theo tên rồi sort theo tuổi — muốn cùng tuổi vẫn giữ thứ tự tên).

### 6.2 Vì sao merge sort ổn định?

Trong `merge`, khi `a[i] == b[j]` ta dùng `<=` → **lấy `a[i]` (phần tử trái) trước**. Mảng trái luôn là phần **đứng trước** trong input gốc. Nên phần tử bằng nhau ở bên trái luôn ra trước → giữ thứ tự gốc.

### 6.3 Walk-through stability bằng số

Sort theo **khóa** (số), gắn nhãn nguồn để theo dõi. Input: `[ (3,a), (1,b), (3,c), (1,d) ]` (sort theo số).

Chia: trái `[(3,a),(1,b)]`, phải `[(3,c),(1,d)]`.
- merge trái: `(1,b),(3,a)` (1<3, đổi chỗ). → `[(1,b),(3,a)]`
- merge phải: `(1,d),(3,c)`. → `[(1,d),(3,c)]`
- merge cuối `[(1,b),(3,a)]` với `[(1,d),(3,c)]`:
  - `1ᵦ` vs `1ᵈ`: bằng nhau → **lấy trái** `(1,b)`.
  - `3ₐ` vs `1ᵈ`: `3>1` → lấy `(1,d)`.
  - `3ₐ` vs `3ᵧ`: bằng nhau → **lấy trái** `(3,a)`.
  - đổ nốt `(3,c)`.
  - → `[(1,b),(1,d),(3,a),(3,c)]`

Thứ tự `b` trước `d` (đúng input), `a` trước `c` (đúng input) → **ổn định**. ✓ Nếu đổi `<=` thành `<`, các cặp bằng nhau sẽ đảo → mất ổn định.

> ⚠ **Lỗi thường gặp.** Viết `if a[i] < b[j]` (thiếu dấu `=`) → khi bằng nhau lấy **phải** trước → **MẤT stability** mà code vẫn "sort đúng" về mặt giá trị → bug âm thầm, chỉ lộ khi sort theo nhiều khóa.

> 📝 **Tóm tắt mục 6.** Merge sort **ổn định** nhờ ưu tiên phần tử trái khi bằng (`<=`). Đây là ưu điểm lớn vs quicksort (không ổn định).

---

## 7. Top-down vs Bottom-up

### 7.1 Hai cách cùng kết quả

- **Top-down (đệ quy):** chia từ trên xuống tới lá, rồi merge lên (mục 3). Dùng stack đệ quy.
- **Bottom-up (lặp):** không đệ quy. Coi mỗi phần tử là mảnh sort cỡ 1, rồi **merge các cặp mảnh cỡ 1 → cỡ 2 → cỡ 4 → cỡ 8...** cho đến khi cỡ ≥ $n$.

### 7.2 Walk-through bottom-up: `[5,2,4,1,3,8,6,7]` (n=8)

```
Ban đầu (cỡ 1): [5][2][4][1][3][8][6][7]
Pass cỡ=1 → merge cặp:  [2,5] [1,4] [3,8] [6,7]
Pass cỡ=2 → merge cặp:  [1,2,4,5]   [3,6,7,8]
Pass cỡ=4 → merge cặp:  [1,2,3,4,5,6,7,8]   ✓
```

Số pass = $\log_2 8 = 3$. Mỗi pass quét toàn bộ $n$ phần tử → $O(n \log n)$, khớp top-down.

### 7.3 Code Go — bottom-up

```go
// mergeSortBottomUp: lặp, không đệ quy. Sort tại chỗ trong a, dùng tmp O(n).
func mergeSortBottomUp(a []int) {
    n := len(a)
    tmp := make([]int, n)
    // size = 1, 2, 4, 8, ... (kích thước mảnh đang merge)
    for size := 1; size < n; size *= 2 {
        // lo nhảy theo bước 2*size: mỗi lần merge 2 mảnh cạnh nhau cỡ size
        for lo := 0; lo < n-size; lo += 2 * size {
            mid := lo + size - 1
            hi := lo + 2*size - 1
            if hi >= n {
                hi = n - 1 // mảnh phải có thể ngắn hơn ở cuối mảng
            }
            mergeRange(a, tmp, lo, mid, hi) // dùng lại mergeRange ở mục 5
        }
    }
}
```

> ❓ **Câu hỏi tự nhiên.**
> - *"Khi nào dùng bottom-up?"* — Khi muốn **tránh đệ quy** (tránh tràn stack với mảng cực lớn, hoặc môi trường không thích đệ quy). Bottom-up cũng tự nhiên hợp với **linked list** và **external sort** (merge các run).
> - *"Điều kiện `lo < n-size` nghĩa gì?"* — Đảm bảo còn **ít nhất một** phần tử ở mảnh phải (`lo+size < n`). Nếu mảnh phải rỗng thì không cần merge.
> - *"Hai cách có cho cùng kết quả và cùng độ phức tạp?"* — Có. Cùng $O(n \log n)$ thời gian, $O(n)$ bộ nhớ phụ. Cả hai đều stable nếu merge dùng `<=`. Khác biệt chỉ ở dùng stack (top-down) hay vòng lặp (bottom-up).

> 🔁 **Dừng lại tự kiểm tra.** Với $n = 5$, bottom-up chạy mấy pass và size là bao nhiêu?
>
> <details><summary>Đáp án</summary>
>
> `size = 1, 2, 4` (dừng khi `size ≥ 5`). 3 pass. Pass cỡ 4 sẽ merge mảnh `[0..3]` với mảnh `[4..4]` (chỉ 1 phần tử). ✓
> </details>

> 📝 **Tóm tắt mục 7.** Top-down (đệ quy) và bottom-up (lặp size 1,2,4,...) tương đương: cùng $O(n \log n)$, cùng $O(n)$ space, cùng stable. Bottom-up né đệ quy, hợp linked list & external sort.

---

## 8. External sort — sắp xếp dữ liệu KHÔNG vừa RAM

### 8.1 Vấn đề thực tế

> 💡 **Trực giác.** Bạn có file 100 GB log cần sort theo thời gian, nhưng RAM chỉ 8 GB. Không thể load hết vào mảng. Merge sort cứu nguy vì **bước merge chỉ cần đọc tuần tự** — không cần toàn bộ dữ liệu trong RAM cùng lúc.

### 8.2 Quy trình external merge sort

1. **Chia chunk (run):** đọc file thành các đoạn vừa RAM (vd 1 GB mỗi đoạn → 100 đoạn).
2. **Sort từng chunk trong RAM** (dùng bất kỳ sort nội bộ nào: quicksort, sort chuẩn) rồi **ghi ra đĩa** thành file run đã sort.
3. **K-way merge:** mở đồng thời $k$ file run, mỗi file giữ một con trỏ đọc + một buffer nhỏ. Dùng **min-heap** chứa phần tử đầu của mỗi run; liên tục lấy min ra ghi kết quả, đọc phần tử kế từ run vừa lấy. (Chính là merge $k$ chiều — xem bài tập 2.)

```
File 100GB
   │  chia + sort từng chunk vừa RAM
   ▼
run1.sorted  run2.sorted  ...  run100.sorted   (mỗi file đã sort)
   │  k-way merge (min-heap đọc đầu mỗi run)
   ▼
output.sorted  (toàn bộ đã sort, chỉ giữ k phần tử trong RAM lúc merge)
```

> ❓ **Câu hỏi tự nhiên.**
> - *"Tại sao là merge sort chứ không phải quicksort?"* — Quicksort cần truy cập ngẫu nhiên (partition đảo phần tử khắp mảng) → tệ với đĩa (seek đắt). Merge **đọc/ghi tuần tự** → tối ưu cho đĩa/băng từ. Đây là lý do lịch sử merge sort ra đời (sort băng từ thập niên 1950).
> - *"K-way merge nhanh hơn merge từng đôi?"* — Có. Merge đôi cần $\log k$ lượt đọc/ghi toàn bộ dữ liệu; k-way merge chỉ **một lượt** đọc/ghi → ít I/O đĩa hơn (I/O mới là nút cổ chai, không phải CPU).

> 📝 **Tóm tắt mục 8.** External sort = chia chunk vừa RAM → sort từng chunk → k-way merge (min-heap) các run đã sort. Merge sort hợp vì đọc/ghi **tuần tự**. Ứng dụng: sort file lớn, database, MapReduce.

---

## 9. Count Inversions — đếm số cặp nghịch thế trong `O(n log n)`

### 9.1 Bài toán

**Nghịch thế (inversion)** của mảng `a` là cặp chỉ số $(i, j)$ với $i < j$ nhưng `a[i] > a[j]` — tức cặp "sai thứ tự". Số nghịch thế đo mức độ "lộn xộn" của mảng (0 = đã sort tăng; tối đa $\dfrac{n(n-1)}{2}$ = sort giảm).

> 💡 **Trực giác.** Số nghịch thế = số lần đổi chỗ tối thiểu mà bubble/insertion sort phải làm. Đo "khoảng cách" từ mảng tới trạng thái sort.

**Cách ngây thơ:** đếm mọi cặp → $O(n^2)$. **Cách thông minh:** lồng việc đếm vào merge sort → $O(n \log n)$.

### 9.2 Ý tưởng then chốt

Khi merge nửa trái `L` và nửa phải `R` (cả hai đã sort), nếu tại bước nào `R[j] < L[i]` thì `R[j]` nhỏ hơn **tất cả** các phần tử còn lại của `L` (vì `L` đã sort, `L[i] ≤ L[i+1] ≤ ...`). Số phần tử còn lại của `L` là `len(L) - i`. Mỗi phần tử đó tạo một nghịch thế với `R[j]` → cộng `len(L) - i` vào tổng.

### 9.3 Walk-through bằng số: đếm nghịch thế của `[2,4,1,3,5]`

Liệt kê tay để kiểm chứng: các cặp `(i<j, a[i]>a[j])`:
- `(2,1)`, `(4,1)`, `(4,3)` → đúng **3** nghịch thế.

Giờ chạy merge-count:
```
Chia: L=[2,4,1] , R=[3,5]
  Đếm trong L=[2,4,1]: chia [2,4] và [1]
     merge([2],[4]) → [2,4], 0 nghịch thế
     merge([2,4],[1]): 1<2 → R nhỏ hơn cả 2 phần tử còn lại của L → +2.  → [1,2,4]
     tổng trong L = 2
  Đếm trong R=[3,5]: merge([3],[5]) → [3,5], 0 nghịch thế
  merge L=[1,2,4] với R=[3,5]:
     1≤3 lấy 1; 2≤3 lấy 2; 4>3 → R nhỏ hơn 1 phần tử còn lại của L (chỉ còn [4]) → +1; lấy 3
     4≤5 lấy 4; đổ 5.
     tổng ở bước này = 1
Tổng cộng = 2 (trong L) + 0 (trong R) + 1 (merge cuối) = 3 ✓ (khớp đếm tay!)
```

### 9.4 Code Go — count inversions

```go
// countInversions trả về số nghịch thế của a, KHÔNG sửa a (làm việc trên bản copy).
// O(n log n) thời gian.
func countInversions(a []int) int64 {
    b := append([]int(nil), a...) // copy để không phá input
    tmp := make([]int, len(b))
    return countSort(b, tmp, 0, len(b)-1)
}

func countSort(a, tmp []int, lo, hi int) int64 {
    if lo >= hi {
        return 0
    }
    mid := lo + (hi-lo)/2
    var inv int64
    inv += countSort(a, tmp, lo, mid)     // nghịch thế trong nửa trái
    inv += countSort(a, tmp, mid+1, hi)   // nghịch thế trong nửa phải
    inv += countMerge(a, tmp, lo, mid, hi) // nghịch thế "chéo" giữa hai nửa
    return inv
}

func countMerge(a, tmp []int, lo, mid, hi int) int64 {
    copy(tmp[lo:hi+1], a[lo:hi+1])
    i, j, k := lo, mid+1, lo
    var inv int64
    for i <= mid && j <= hi {
        if tmp[i] <= tmp[j] {
            a[k] = tmp[i]; i++
        } else {
            // tmp[j] < tmp[i] → nhỏ hơn TẤT CẢ phần tử còn lại của nửa trái
            a[k] = tmp[j]; j++
            inv += int64(mid - i + 1) // số phần tử còn lại của nửa trái
        }
        k++
    }
    for i <= mid { a[k] = tmp[i]; i++; k++ }
    for j <= hi  { a[k] = tmp[j]; j++; k++ }
    return inv
}
```

> ⚠ **Lỗi thường gặp.**
> - **Dùng `<` thay `<=` ở đây** đổi định nghĩa: với `<=`, cặp bằng nhau **không** tính là nghịch thế (đúng định nghĩa `a[i] > a[j]` chặt). Nếu định nghĩa nghịch thế là `≥` thì đổi sang `<`. Phải khớp định nghĩa đề bài.
> - **Đếm `mid - i` thay vì `mid - i + 1`** → off-by-one, thiếu 1 phần tử (`a[i]` cũng còn trong nửa trái).
> - **Tràn số:** với $n$ lớn, số nghịch thế tối đa $\dfrac{n(n-1)}{2} \approx 5 \times 10^{17}$ với $n=10^9$ → phải dùng `int64`, không `int32`.

> 🔁 **Dừng lại tự kiểm tra.** Mảng `[5,4,3,2,1]` có bao nhiêu nghịch thế?
>
> <details><summary>Đáp án</summary>
>
> Mọi cặp đều nghịch thế → $\dfrac{n(n-1)}{2} = 5 \cdot 4/2 = 10$. Đây là tối đa (mảng sort giảm hoàn toàn).
> </details>

> 📝 **Tóm tắt mục 9.** Lồng đếm vào merge: khi lấy phần tử phải trước, cộng số phần tử trái còn lại. $O(n \log n)$ thay vì $O(n^2)$. Nhớ `int64` và `mid - i + 1`.

---

## 10. So sánh với Quicksort (tease Lesson 08)

| Tiêu chí | **Merge Sort** | **Quicksort** |
|----------|----------------|---------------|
| Best/Avg | $O(n \log n)$ | $O(n \log n)$ |
| **Worst** | $O(n \log n)$ ✓ đảm bảo | $O(n^2)$ (pivot tệ) ✗ |
| **Space** | $O(n)$ phụ (mảng) ✗ | $O(\log n)$ (stack) ✓ in-place |
| **Stable** | **Có** ✓ | Không ✗ (thường) |
| Tốc độ thực tế | Chậm hơn (cache, ghi nhiều) | **Nhanh hơn** (cache-friendly) |
| Linked list | Tuyệt vời ($O(1)$ phụ) | Tệ (cần random access) |
| External sort | Tuyệt vời (tuần tự) | Tệ (random access) |

> 💡 **Khi nào chọn cái nào?**
> - **Merge sort** khi: cần **stable**, cần **đảm bảo** $O(n \log n)$ (không chấp nhận worst), sort **linked list**, hoặc **external sort** (dữ liệu lớn hơn RAM). Java `Collections.sort`/`Arrays.sort(Object[])` dùng Timsort (biến thể merge) chính vì cần stability.
> - **Quicksort** khi: sort **mảng số nguyên thuần trong RAM**, ưu tiên tốc độ, chấp nhận không stable. Go `sort.Sort` dùng pattern-defeating quicksort (pdqsort).
>
> 👉 Lesson 08 sẽ mổ xẻ quicksort: partition (Lomuto/Hoare), chọn pivot, randomization để né worst case.

> 📝 **Tóm tắt mục 10.** Merge sort = **ổn định + worst $O(n \log n)$ đảm bảo + hợp linked list/external** nhưng tốn $O(n)$ space và chậm hơn về hằng số. Quicksort = in-place + nhanh thực tế nhưng worst $O(n^2)$ + không stable.

---

## 11. Cạm bẫy thường gặp (tổng hợp)

> ⚠ **Tổng hợp các bẫy đã rải trong bài** — đọc lại trước khi code:
>
> 1. **Quên cấp temp đúng / cấp lại mỗi merge.** Cấp `tmp` **một lần** ở ngoài (mục 5), đừng `make` mới trong mỗi lần `mergeRange` → tốn bộ nhớ và chậm (GC liên tục).
> 2. **Merge sai biên.** Điều kiện vòng phải là `i <= mid && j <= hi` (bản index) hoặc `i < len(a) && j < len(b)` (bản slice) — dùng `&&`, không `||`.
> 3. **Off-by-one.** `hi = lo + 2*size - 1` (không `2*size`); count inversions cộng `mid - i + 1` (không `mid - i`); base case `lo >= hi` (không `lo > hi` nếu dùng `>=hi` chuẩn — kiểm tra kỹ).
> 4. **Quên đổ nốt phần còn lại** sau vòng merge → mất dữ liệu.
> 5. **Mất stability vì dùng `<` thay `<=`.** Code vẫn "sort đúng giá trị" nên bug rất khó phát hiện — chỉ lộ khi sort nhiều khóa.
> 6. **Tràn số** trong count inversions (`int` → `int64`) và trong tính `mid` (`lo + (hi-lo)/2` thay `(lo+hi)/2`).
> 7. **Tưởng merge sort in-place.** Nó **không** in-place (trừ linked list) → đừng dùng khi bộ nhớ cực hạn chế.

---

## Bài tập

> Làm trước khi xem lời giải bên dưới.

1. **Trace merge sort.** Vẽ cây chia và liệt kê thứ tự merge cho `mergeSort([8,3,5,1,9,2])`. Cho kết quả từng bước merge.
2. **Merge k sorted lists.** Cho `k` mảng đã sort, viết hàm Go gộp thành một mảng sort. Phân tích độ phức tạp cho cả hai cách: (a) merge lần lượt từng cặp, (b) dùng min-heap k-way. So sánh.
3. **Count inversions.** Tính số nghịch thế của `[1,3,5,2,4,6]` bằng tay (liệt kê cặp), rồi kiểm bằng walk-through merge-count.
4. **Merge sort cho linked list — $O(1)$ space.** Vì sao merge sort trên singly linked list chỉ tốn $O(1)$ bộ nhớ phụ? Phác thảo thuật toán (chia bằng slow/fast pointer, merge bằng nối con trỏ).
5. **External sort — mô tả.** File 50 GB số nguyên, RAM 4 GB. Mô tả các bước external merge sort: bao nhiêu run, k-way merge dùng cấu trúc gì, vì sao không dùng quicksort.
6. **Chứng minh stability.** Chứng minh chặt: nếu `merge` dùng `<=` (ưu tiên trái khi bằng) thì merge sort là stable. (Gợi ý: quy nạp theo kích thước + invariant trong merge.)
7. **(Mở rộng) In-place merge bằng tmp dùng lại.** Sửa `mergeSortInPlace` ở mục 5 để in ra số lần so sánh thực tế cho `[5,2,4,1,3]`, đối chiếu cận $n \log n$.

---

## Lời giải chi tiết

### Bài 1 — Trace `mergeSort([8,3,5,1,9,2])`

**Cây chia** (`mid = len/2`, `n=6` → trái 3, phải 3):
```
            [8,3,5,1,9,2]
           /            \
       [8,3,5]          [1,9,2]
       /     \          /     \
    [8]    [3,5]     [1]     [9,2]
            /  \              /  \
          [3]  [5]          [9]  [2]
```
**Thứ tự merge (lá lên gốc):**
1. `merge([3],[5]) = [3,5]` (3≤5)
2. `merge([8],[3,5])`: 8>3→3; 8>5→5; đổ 8 → `[3,5,8]`
3. `merge([9],[2]) = [2,9]` (9>2)
4. `merge([1],[2,9])`: 1≤2→1; đổ 2,9 → `[1,2,9]`
5. `merge([3,5,8],[1,2,9])`: 3>1→1; 3>2→2; 3≤9→3; 5≤9→5; 8≤9→8; đổ 9 → `[1,2,3,5,8,9]`

**Kết quả:** `[1,2,3,5,8,9]`. ✓

### Bài 2 — Merge k sorted lists

```go
import "container/heap"

// Cách (b): k-way merge bằng min-heap. O(N log k) với N = tổng số phần tử.
type item struct{ val, list, idx int }
type minHeap []item
func (h minHeap) Len() int            { return len(h) }
func (h minHeap) Less(i, j int) bool  { return h[i].val < h[j].val }
func (h minHeap) Swap(i, j int)       { h[i], h[j] = h[j], h[i] }
func (h *minHeap) Push(x any)         { *h = append(*h, x.(item)) }
func (h *minHeap) Pop() any           { old := *h; n := len(old); x := old[n-1]; *h = old[:n-1]; return x }

func mergeKLists(lists [][]int) []int {
    h := &minHeap{}
    for li, l := range lists {
        if len(l) > 0 {
            heap.Push(h, item{l[0], li, 0})
        }
    }
    out := []int{}
    for h.Len() > 0 {
        it := heap.Pop(h).(item)
        out = append(out, it.val)
        if it.idx+1 < len(lists[it.list]) {
            heap.Push(h, item{lists[it.list][it.idx+1], it.list, it.idx + 1})
        }
    }
    return out
}
```
**Phân tích.**
- **(a) Merge từng cặp tuần tự** (gộp list1+list2, rồi +list3, ...): list kết quả lớn dần. Phần tử của list đầu bị merge lại $k$ lần → $O(N \cdot k)$ xấu nhất. Nếu merge theo kiểu cây (ghép đôi balanced) thì $O(N \log k)$.
- **(b) Min-heap k-way:** heap luôn giữ ≤ $k$ phần tử (đầu mỗi list). Mỗi phần tử push/pop một lần, mỗi thao tác $O(\log k)$ → tổng $O(N \log k)$. Bộ nhớ heap $O(k)$.
- **So sánh:** cả (b) và (a)-cây-cân đều $O(N \log k)$, nhưng heap chỉ giữ $O(k)$ trong RAM cùng lúc → đây chính là engine của **external k-way merge** (mục 8). Merge tuần tự ngây thơ $O(N \cdot k)$ tệ hơn nhiều khi $k$ lớn.

### Bài 3 — Count inversions `[1,3,5,2,4,6]`

**Liệt kê tay** (`i<j, a[i]>a[j]`): `(3,2)`, `(5,2)`, `(5,4)` → **3** nghịch thế.

**Merge-count:** chia `L=[1,3,5]`, `R=[2,4,6]`. Nội bộ `L` và `R` đã sort → 0 nghịch thế nội bộ. Merge:
- 1≤2 lấy 1; 3>2 → còn `[3,5]` trong L → **+2**; lấy 2; 3≤4 lấy 3; 5>4 → còn `[5]` → **+1**; lấy 4; 5≤6 lấy 5; đổ 6.
- Tổng = 2 + 1 = **3** ✓ khớp đếm tay.

### Bài 4 — Merge sort linked list `O(1)` space

**Vì sao $O(1)$:** với mảng, merge phải copy sang `tmp` ($O(n)$). Với linked list, merge chỉ **nối lại con trỏ `next`** — không cần ô nhớ mới cho phần tử, chỉ vài biến con trỏ → $O(1)$ bộ nhớ phụ (ngoài stack đệ quy $O(\log n)$; bản bottom-up đạt $O(1)$ thật sự).

**Thuật toán:**
1. **Chia:** dùng **slow/fast pointer** tìm giữa list (fast đi 2 bước, slow 1 bước; fast tới cuối thì slow ở giữa), cắt thành hai nửa.
2. **Đệ quy** sort mỗi nửa.
3. **Merge** hai list đã sort: tạo dummy head, duyệt hai list, nối node nhỏ hơn vào đuôi kết quả (dùng `<=` cho stable), chỉ đổi con trỏ.

```go
type ListNode struct { Val int; Next *ListNode }

func sortList(head *ListNode) *ListNode {
    if head == nil || head.Next == nil { return head }
    // chia: slow/fast
    slow, fast := head, head.Next
    for fast != nil && fast.Next != nil { slow = slow.Next; fast = fast.Next.Next }
    mid := slow.Next; slow.Next = nil // cắt đôi
    l := sortList(head)
    r := sortList(mid)
    return mergeList(l, r)
}

func mergeList(a, b *ListNode) *ListNode {
    dummy := &ListNode{}; tail := dummy
    for a != nil && b != nil {
        if a.Val <= b.Val { tail.Next = a; a = a.Next } else { tail.Next = b; b = b.Next }
        tail = tail.Next
    }
    if a != nil { tail.Next = a } else { tail.Next = b } // đổ nốt
    return dummy.Next
}
```
Đây là lời giải LeetCode 148 "Sort List" — chứng minh merge sort là lựa chọn sort tốt nhất cho linked list.

### Bài 5 — External sort file 50 GB, RAM 4 GB

1. **Chia + sort chunk:** đọc từng đoạn ~3 GB (chừa chỗ cho overhead) → khoảng `⌈50/3⌉ = 17` run. Sort mỗi run trong RAM (quicksort/sort chuẩn), ghi ra `run_1..run_17.sorted`.
2. **K-way merge:** mở 17 file run đồng thời, mỗi file một buffer đọc nhỏ. Dùng **min-heap** kích thước 17 chứa phần tử đầu mỗi run. Lặp: pop min ghi ra output, đọc phần tử kế từ run đó push vào heap. Một lượt đọc/ghi toàn bộ → I/O tối thiểu.
3. **Vì sao không quicksort:** quicksort cần **truy cập ngẫu nhiên** (partition đảo phần tử khắp mảng) → vô số seek đĩa, cực chậm. Merge **đọc/ghi tuần tự** → tối ưu I/O (nút cổ chai là đĩa, không phải CPU). Nếu RAM nhỏ tới mức 17 run vẫn quá nhiều file mở cùng lúc → merge nhiều **tầng** (merge 17 run thành vài run lớn rồi merge tiếp).

### Bài 6 — Chứng minh stability (quy nạp)

**Mệnh đề:** nếu `merge` ưu tiên trái khi khóa bằng (`<=`), thì `mergeSort` ổn định.

**Quy nạp theo `n` = kích thước mảng.**
- **Cơ sở `n ≤ 1`:** không đổi chỗ gì → giữ thứ tự gốc → ổn định.
- **Bước quy nạp:** giả sử `mergeSort` ổn định với mọi mảng cỡ `< n`. Xét mảng cỡ `n`, chia trái `L` (chỉ số gốc `0..mid-1`) và phải `R` (`mid..n-1`). Theo giả thiết quy nạp, sau khi sort, `L` và `R` mỗi cái giữ thứ tự tương đối gốc của các phần tử bằng nhau.
- **Trong merge:** xét hai phần tử `x, y` có **khóa bằng nhau**. Hai trường hợp:
  - **Cùng thuộc `L` (hoặc cùng `R`):** thứ tự của chúng do `L` (hoặc `R`) đã giữ đúng (giả thiết quy nạp), và merge **không đảo thứ tự nội bộ một bên** (lấy lần lượt từ đầu mỗi nửa) → giữ nguyên.
  - **`x` thuộc `L`, `y` thuộc `R`:** vì `x` thuộc `L` nên chỉ số gốc của `x` < chỉ số gốc của `y` (mọi phần tử trái đứng trước mọi phần tử phải trong input). Khi merge gặp `x` và `y` bằng khóa, điều kiện `L[i] <= R[j]` đúng → **lấy `x` trước**. → `x` ra trước `y`, đúng thứ tự gốc.
- Cả hai trường hợp đều giữ thứ tự gốc → merge ổn định → `mergeSort` cỡ `n` ổn định. ∎

(Nếu dùng `<`: trường hợp `x∈L, y∈R, x.key==y.key` sẽ cho `L[i] < R[j]` **sai** → lấy `y` trước → đảo thứ tự → mất ổn định.)

### Bài 7 — Đếm số so sánh cho `[5,2,4,1,3]`

Sửa `mergeRange` thêm biến đếm tăng mỗi lần vào nhánh `if tmp[i] <= tmp[j]`/`else`:
```go
var cmp int
// ... trong vòng for: cmp++ trước mỗi so sánh tmp[i] <= tmp[j]
```
Trace `[5,2,4,1,3]` (xem mục 3.2): merge `[5],[2]` (1 so sánh), `[1],[3]` (1), `[4],[1,3]` (2: 4>1, 4>3 rồi đổ 4), `[2,5],[1,3,4]` (4: 1,2,3,4 rồi đổ 5). Tổng = $1+1+2+4 = 8$.
**Đối chiếu cận:** $n \log_2 n = 5 \cdot \log_2 5 \approx 5 \cdot 2{,}32 \approx 11{,}6$. Thực tế 8 ≤ 11,6 ✓ (số so sánh thực luôn ≤ $n \lceil \log n \rceil$, thường nhỏ hơn vì nhiều merge dừng sớm khi một nửa hết).

---

## Code & Minh họa

- **Code Go inline:** các hàm `merge`, `mergeSort` (top-down), `mergeSortInPlace`, `mergeSortBottomUp`, `countInversions`, `sortList` (linked list), `mergeKLists` đều ở các mục trên — copy ra file `.go` là chạy được (thêm `package main` + `func main()` demo).
- **[visualization.html](./visualization.html)** — 3 module tương tác:
  1. **Merge Sort Tree:** animate pha chia (đi xuống) rồi pha merge (đi lên), highlight hai nửa đang trộn.
  2. **Merge 2 Arrays:** two-pointer animate chọn min từ hai mảng đã sort.
  3. **Recursion Depth:** vẽ cây đệ quy, đếm số tầng = $\log n$ và công mỗi tầng = $n$.

```go
// Demo gộp — bỏ vào main.go rồi `go run main.go`
package main

import "fmt"

func main() {
    a := []int{5, 2, 4, 1, 3}
    fmt.Println("mergeSort:", mergeSort(append([]int(nil), a...)))

    b := []int{5, 2, 4, 1, 3, 8, 6, 7}
    mergeSortBottomUp(b)
    fmt.Println("bottomUp:", b)

    fmt.Println("inversions [2,4,1,3,5]:", countInversions([]int{2, 4, 1, 3, 5})) // 3
}
```

---

## Bài tiếp theo

→ [Lesson 08 — Quicksort](../lesson-08-quicksort/README.md): partition (Lomuto/Hoare), chọn pivot, randomization để né worst case $O(n^2)$, vì sao quicksort thường nhanh hơn merge sort trong thực tế dù worst tệ hơn.

← Quay lại [Lesson 06 — Elementary Sorts](../lesson-06-elementary-sorts/README.md) · [Tier 1 — Sắp xếp](../tier-1-sorting/index.html)
