// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: Algorithms/lesson-08-quicksort/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 08 — Quicksort

> **Tier 1 — Sorting** · Bài 08

Quicksort là thuật toán sắp xếp được dùng nhiều nhất trong thực tế: nó là sort mặc định (hoặc nền tảng) của hầu hết thư viện chuẩn (C \`qsort\`, Java cho mảng primitive, Go \`sort\` dùng pattern-defeating quicksort). Trên giấy nó có worst-case $O(n^2)$ — tệ hơn Merge Sort — nhưng trong thực tế nó **thường nhanh hơn** cả Merge Sort lẫn Heap Sort. Bài này giải thích nghịch lý đó từ đầu đến cuối.

## Mục tiêu học tập

Sau bài này, bạn sẽ:

- Hiểu ý tưởng **divide & conquer** của Quicksort, và vì sao phần việc nặng nằm ở bước "divide" (partition) chứ không phải "combine".
- Cài đặt được 2 sơ đồ partition: **Lomuto** (dễ hiểu) và **Hoare** (ít swap hơn).
- Phân tích được vì sao average-case là $O(n \\log n)$ còn worst-case là $O(n^2)$, và **cụ thể input nào** gây worst-case.
- Biết các chiến lược chọn pivot (last/first, random, median-of-three) và vì sao chọn pivot tốt là sống còn.
- Hiểu **randomized quicksort** cho expected $O(n \\log n)$ bất kể input.
- Biết Quicksort **không ổn định (unstable)** và vì sao.
- Cài đặt **Quickselect** — tìm phần tử nhỏ thứ k trong $O(n)$ average.
- Cài đặt **3-way partition (Dutch National Flag)** để xử lý mảng nhiều phần tử trùng.
- So sánh Merge Sort vs Quicksort vs Heap Sort và biết khi nào dùng cái nào.

## Kiến thức tiền đề

- [Lesson 03 — Đệ quy & quan hệ truy hồi](../lesson-03-recursion-recurrence/) — Quicksort là đệ quy, phân tích bằng recurrence.
- [Lesson 04 — Tính đúng & bất biến vòng lặp](../lesson-04-correctness-invariant/) — chứng minh partition đúng cần loop invariant.
- [Lesson 07 — Merge Sort](../lesson-07-merge-sort/) — cũng là divide & conquer, nhưng "combine" làm phần nặng (merge). Quicksort ngược lại.

---

## 1. Ý tưởng — Divide & conquer "ngược"

> 💡 **Trực giác / Hình dung.** Bạn có một chồng bài kiểm tra cần xếp theo điểm. Cách Quicksort: rút đại một bài làm "mốc" (pivot), ví dụ bài 7 điểm. Đi qua cả chồng, ném mọi bài **< 7** sang trái, mọi bài **> 7** sang phải. Sau một lượt, bài 7 điểm đã **nằm đúng chỗ vĩnh viễn** (mọi thứ bên trái nhỏ hơn, bên phải lớn hơn). Giờ lặp lại cùng trò đó cho chồng-trái và chồng-phải. Chia mãi tới khi mỗi chồng chỉ còn 0–1 bài → cả chồng đã sắp xếp.

So với Merge Sort (Lesson 07), cả hai đều là **divide & conquer** nhưng phân bổ công việc ngược nhau:

| Bước | Merge Sort | Quicksort |
|------|------------|-----------|
| **Divide** | Chia đôi tầm thường (lấy giữa) — $O(1)$ | **Partition** — quét cả mảng, đẩy phần tử về 2 phía — $O(n)$ |
| **Conquer** | Đệ quy 2 nửa | Đệ quy 2 phần |
| **Combine** | **Merge** — trộn 2 nửa đã sort — $O(n)$ | **Rỗng!** — sau partition không cần làm gì |

Điểm mấu chốt: ở Quicksort, **pivot sau partition đã ở đúng vị trí cuối cùng**, và "combine" hoàn toàn rỗng. Mảng được sắp xếp tại chỗ (in-place), không cần buffer phụ $O(n)$ như Merge Sort.

Sườn thuật toán:

\`\`\`
quicksort(A, lo, hi):
    nếu lo >= hi: return          # 0 hoặc 1 phần tử → đã sort
    p = partition(A, lo, hi)       # p = vị trí cuối của pivot
    quicksort(A, lo, p-1)          # phần nhỏ hơn pivot
    quicksort(A, p+1, hi)          # phần lớn hơn pivot
\`\`\`

> ❓ **Câu hỏi tự nhiên của người đọc.**
> - *"Vì sao không cần combine?"* — Vì partition đã đặt pivot đúng chỗ và đảm bảo trái < pivot ≤ phải. Khi 2 phần con được sort xong, ghép lại tự động đúng — chúng đã liền kề trong mảng và không chồng lấn nhau.
> - *"Pivot có bị sort lại không?"* — Không. Sau partition pivot bị "khóa" tại \`p\`; lời gọi đệ quy chỉ chạy trên \`[lo, p-1]\` và \`[p+1, hi]\`, **bỏ qua** chỉ số \`p\`. Đây là lý do Quicksort không vô hạn.

> 📝 **Tóm tắt mục 1.**
> - Quicksort = chọn pivot → partition → đệ quy 2 phần.
> - "Divide" (partition) là phần nặng $O(n)$; "combine" rỗng.
> - In-place, không cần buffer phụ như Merge Sort.
> - Sau partition, pivot nằm đúng vị trí cuối cùng và bị loại khỏi đệ quy.

---

## 2. Partition schemes

Partition là trái tim của Quicksort. Có 2 sơ đồ kinh điển. Cả hai đều nhận \`A[lo..hi]\`, chọn một pivot, rồi sắp lại sao cho phần nhỏ ở trái, phần lớn ở phải.

### 2.1 Lomuto partition (pivot = phần tử cuối)

> 💡 **Trực giác.** Dùng pivot là phần tử **cuối** \`A[hi]\`. Duy trì một "ranh giới" \`i\`: mọi thứ trong \`A[lo..i]\` đã được xác nhận **≤ pivot**. Con trỏ \`j\` quét từ trái sang phải; mỗi khi gặp phần tử \`≤ pivot\`, đẩy ranh giới \`i\` tiến một bước và swap phần tử đó vào vùng "nhỏ". Cuối cùng đặt pivot ngay sau ranh giới.

**Bất biến vòng lặp (loop invariant):** tại mọi thời điểm trong vòng quét,
- \`A[lo .. i]\` đều \`≤ pivot\`,
- \`A[i+1 .. j-1]\` đều \`> pivot\`,
- \`A[j .. hi-1]\` chưa xét, \`A[hi]\` là pivot.

\`\`\`
lomuto(A, lo, hi):
    pivot = A[hi]
    i = lo - 1                      # ranh giới vùng "≤ pivot" (ban đầu rỗng)
    for j = lo to hi-1:
        if A[j] <= pivot:
            i = i + 1
            swap(A[i], A[j])
    swap(A[i+1], A[hi])             # đặt pivot vào đúng chỗ
    return i + 1                    # vị trí cuối của pivot
\`\`\`

#### Walk-through Lomuto: \`[5, 2, 4, 1, 3]\`, pivot = \`A[hi] = 3\`

\`lo=0, hi=4, pivot=3, i=-1\`.

| j | A[j] | A[j] ≤ 3? | Hành động | Mảng sau bước | i |
|---|------|-----------|-----------|---------------|---|
| 0 | 5 | Không | — | \`[5, 2, 4, 1, 3]\` | -1 |
| 1 | 2 | Có | i=0, swap A[0]↔A[1] | \`[2, 5, 4, 1, 3]\` | 0 |
| 2 | 4 | Không | — | \`[2, 5, 4, 1, 3]\` | 0 |
| 3 | 1 | Có | i=1, swap A[1]↔A[3] | \`[2, 1, 4, 5, 3]\` | 1 |

Hết vòng (\`j\` chạy tới \`hi-1=3\`). Đặt pivot: \`swap A[i+1=2] ↔ A[hi=4]\`:

\`[2, 1, 3, 5, 4]\` → **return 2**.

Kiểm tra: \`A[0..1] = [2,1]\` đều \`< 3\`; \`A[3..4] = [5,4]\` đều \`> 3\`; pivot \`3\` ở index 2 — đúng chỗ. ✓

**Đếm comparison:** đúng 4 phép so sánh (\`hi - lo = 4\` lần lặp, mỗi lần 1 so sánh). Lomuto luôn làm đúng \`hi - lo\` so sánh.

> ⚠ **Lỗi thường gặp với Lomuto.**
> - **Khởi tạo \`i = lo\` thay vì \`i = lo - 1\`.** Khi đó phần tử đầu tiên không được xử lý đúng, ranh giới lệch 1 → off-by-one. Phải \`i = lo - 1\`.
> - **Quét \`j\` tới \`hi\` thay vì \`hi-1\`.** Pivot ở \`A[hi]\` sẽ tự so với chính nó (\`pivot ≤ pivot\` đúng) và bị swap nhầm → sai vị trí trả về. Vòng \`for\` dừng ở \`hi-1\`.

### 2.2 Hoare partition (2 con trỏ)

> 💡 **Trực giác.** Pivot thường lấy phần tử **đầu** \`A[lo]\` (hoặc giữa). Hai con trỏ tiến vào nhau từ 2 đầu: \`i\` từ trái tìm phần tử \`≥ pivot\` (lẽ ra phải ở phải), \`j\` từ phải tìm phần tử \`≤ pivot\` (lẽ ra phải ở trái). Tìm được cặp "đứng nhầm chỗ" thì swap chúng. Gặp nhau thì dừng. Hoare swap **ít hơn** Lomuto vì chỉ swap khi thật sự cần đảo chỗ, không swap "tại chỗ".

\`\`\`
hoare(A, lo, hi):
    pivot = A[lo]                   # pivot = phần tử đầu
    i = lo - 1
    j = hi + 1
    while true:
        do i = i + 1 while A[i] < pivot     # tiến tới phần tử ≥ pivot
        do j = j - 1 while A[j] > pivot     # lùi tới phần tử ≤ pivot
        if i >= j: return j                  # con trỏ gặp nhau → điểm chia
        swap(A[i], A[j])
\`\`\`

**Lưu ý quan trọng:** Hoare **không** đặt pivot vào đúng vị trí cuối cùng (khác Lomuto!). Nó trả về chỉ số \`j\` chia mảng thành \`A[lo..j]\` (đều ≤ pivot) và \`A[j+1..hi]\` (đều ≥ pivot). Vì vậy lời gọi đệ quy phải là \`quicksort(A, lo, j)\` và \`quicksort(A, j+1, hi)\` — **không** loại \`j\` ra.

#### Walk-through Hoare: \`[5, 2, 4, 1, 3]\`, pivot = \`A[lo] = 5\`

\`lo=0, hi=4, pivot=5, i=-1, j=5\`.

**Vòng 1:**
- \`i\`: i=0 → A[0]=5, \`5 < 5\`? Không → dừng, \`i=0\`.
- \`j\`: j=4 → A[4]=3, \`3 > 5\`? Không → dừng, \`j=4\`.
- \`i=0 < j=4\` → swap A[0]↔A[4]: \`[3, 2, 4, 1, 5]\`.

**Vòng 2:**
- \`i\`: i=1 → 2<5? Có. i=2 → 4<5? Có. i=3 → 1<5? Có. i=4 → 5<5? Không → \`i=4\`.
- \`j\`: j=3 → 1>5? Không → \`j=3\`.
- \`i=4 >= j=3\` → **return 3**.

Kết quả: \`[3, 2, 4, 1, 5]\`. Chia: \`A[0..3] = [3,2,4,1]\` (đều ≤ 5), \`A[4..4] = [5]\` (đều ≥ 5). ✓ Pivot 5 chưa ở vị trí cuối cùng — nó nằm trong phần phải, sẽ được sort tiếp.

**Đếm swap:** chỉ **1 swap** ở ví dụ này. Với Lomuto cùng input pivot=3 ở trên đã có 2 swap trong vòng quét + 1 swap đặt pivot = 3 swap. Đây là minh họa cho việc Hoare swap ít hơn (thường khoảng 1/3 số swap của Lomuto trên dữ liệu ngẫu nhiên).

> ❓ **Câu hỏi tự nhiên.**
> - *"Vì sao Hoare dùng \`do...while\` chứ không \`while\`?"* — Để đảm bảo cả 2 con trỏ tiến ít nhất 1 bước mỗi vòng, tránh kẹt vô hạn khi phần tử bằng đúng pivot.
> - *"Pivot = A[lo] có an toàn không?"* — Cẩn thận: nếu pivot là phần tử nhỏ nhất, vòng \`do j\` có thể không dừng đúng nếu cài sai biên. Cài đặt chuẩn ở trên đã xử lý đúng vì \`j\` luôn lùi ít nhất 1 từ \`hi+1\`.

> 🔁 **Dừng lại tự kiểm tra.**
> 1. Lomuto trả về index của pivot ở vị trí cuối cùng; Hoare trả về cái gì?
> 2. Sơ đồ nào swap nhiều hơn trên dữ liệu ngẫu nhiên?
>
> <details><summary>Đáp án</summary>
>
> 1. Hoare trả về **điểm chia** \`j\` (không phải vị trí pivot). Pivot có thể chưa ở đúng chỗ. Đệ quy: \`[lo, j]\` và \`[j+1, hi]\`.
> 2. **Lomuto** swap nhiều hơn (nó swap cả khi phần tử đã ở đúng phía). Hoare chỉ swap cặp đảo chỗ thật sự.
> </details>

> 📝 **Tóm tắt mục 2.**
> - **Lomuto:** pivot = cuối, 1 con trỏ quét, dễ hiểu, đặt pivot đúng chỗ, return \`p\` (đệ quy bỏ \`p\`). Nhiều swap.
> - **Hoare:** pivot = đầu, 2 con trỏ vào nhau, ít swap, return điểm chia \`j\` (đệ quy giữ \`j\`).
> - Sai biên (\`hi\` vs \`hi-1\`, \`i=lo\` vs \`i=lo-1\`) là off-by-one kinh điển.

---

## 3. Quicksort full — ghép lại

Với Lomuto:

\`\`\`
quicksort(A, lo, hi):
    if lo >= hi: return
    p = lomuto(A, lo, hi)
    quicksort(A, lo, p-1)
    quicksort(A, p+1, hi)
\`\`\`

#### Walk-through cây partition: \`[5, 2, 4, 1, 3]\`

Dùng Lomuto, pivot = phần tử cuối mỗi lần.

\`\`\`
quicksort[5,2,4,1,3] lo=0 hi=4, pivot=3
  partition → [2,1,3,5,4], p=2  (3 đã đúng chỗ)
  │
  ├── quicksort[2,1] lo=0 hi=1, pivot=1
  │     partition → [1,2], p=0   (1 đã đúng chỗ)
  │     ├── quicksort lo=0 hi=-1 → rỗng
  │     └── quicksort[2] lo=1 hi=1 → 1 phần tử, return
  │
  └── quicksort[5,4] lo=3 hi=4, pivot=4
        partition → [4,5], p=3   (4 đã đúng chỗ)
        ├── quicksort lo=3 hi=2 → rỗng
        └── quicksort[5] lo=4 hi=4 → 1 phần tử, return

Kết quả cuối: [1, 2, 3, 4, 5] ✓
\`\`\`

Mỗi node là một lời gọi \`quicksort\`; mỗi lần partition "đóng đinh" 1 pivot vào đúng chỗ. Cây có chiều cao ≈ $\\log n$ nếu pivot chia đều.

---

## 4. Độ phức tạp

### 4.1 Best / Average case — \`O(n log n)\`

> 💡 **Trực giác.** Nếu mỗi partition chia mảng thành 2 nửa **xấp xỉ bằng nhau**, ta có cây đệ quy cao $\\log_2 n$ tầng. Mỗi tầng tổng cộng quét $O(n)$ (tất cả các partition ở 1 tầng cộng lại đụng mỗi phần tử ≤ 1 lần). Vậy tổng = số tầng × công mỗi tầng = $\\log n \\times n = O(n \\log n)$.

Recurrence khi chia đều: $T(n) = 2 \\cdot T(n/2) + O(n)$ → theo Master Theorem (xem Lesson 03) cho $O(n \\log n)$.

Average-case: dù pivot ngẫu nhiên không chia chính xác 50/50, **kỳ vọng** vẫn cho $O(n \\log n)$. Có thể chứng minh xác suất 2 phần tử bất kỳ được so sánh là $\\dfrac{2}{j-i+1}$, tổng lại ra $\\sim 2n \\ln n \\approx 1{,}39\\, n \\log_2 n$ comparison kỳ vọng.

### 4.2 Worst case — \`O(n²)\`

> 💡 **Trực giác.** Tệ nhất là pivot luôn là phần tử **nhỏ nhất hoặc lớn nhất** → một phần con rỗng, phần kia có $n-1$ phần tử. Cây đệ quy "thoái hóa" thành một dây xích cao $n$ tầng thay vì $\\log n$. Tầng thứ $k$ vẫn quét $\\sim n-k$ phần tử → tổng $n + (n-1) + \\cdots + 1 = \\dfrac{n(n+1)}{2} = O(n^2)$.

Recurrence: $T(n) = T(n-1) + O(n)$ → $O(n^2)$.

**Input cụ thể gây worst-case (Lomuto, pivot = last):** mảng **đã sắp xếp tăng dần**, ví dụ \`[1, 2, 3, 4, 5]\`.

| Lời gọi | pivot=last | partition | p | phần con |
|---------|-----------|-----------|---|----------|
| \`[1,2,3,4,5]\` | 5 | không đổi | 4 | \`[1,2,3,4]\` + rỗng |
| \`[1,2,3,4]\` | 4 | không đổi | 3 | \`[1,2,3]\` + rỗng |
| \`[1,2,3]\` | 3 | không đổi | 2 | \`[1,2]\` + rỗng |
| \`[1,2]\` | 2 | không đổi | 1 | \`[1]\` + rỗng |

Mỗi lần partition vẫn quét toàn bộ phần con nhưng chỉ "đóng đinh" được 1 phần tử ở cuối → $4 + 3 + 2 + 1 = 10$ comparison cho $n=5$ (so với $\\sim 8$ của average). Với $n$ lớn: $O(n^2)$. Mảng **đã sort giảm dần** cũng gây worst-case tương tự.

> ⚠ **Lỗi thường gặp.** Nhiều người tưởng "input đã sort là tốt nhất cho mọi thuật sort" (đúng với Insertion Sort). **Sai với Quicksort pivot=last/first** — đó lại là worst-case! Đây là cạm bẫy thực tế: dữ liệu thường đến ở dạng đã sort sẵn hoặc gần sort.

### 4.3 Space — \`O(log n)\`

Quicksort là **in-place**: không cần buffer $O(n)$ như Merge Sort. Bộ nhớ phụ chỉ là **stack đệ quy**:
- Best/avg: chiều sâu đệ quy $O(\\log n)$.
- Worst (không tối ưu): $O(n)$ — dây đệ quy dài. (Mục 11 sẽ chỉ cách giảm về $O(\\log n)$ cả worst-case bằng đệ quy phần nhỏ trước + tail-call phần lớn.)

> 📝 **Tóm tắt mục 4.**
> - Best/Avg: $O(n \\log n)$ (pivot chia đều).
> - Worst: $O(n^2)$ — pivot luôn min/max; **mảng đã sort + pivot=last là worst-case**.
> - Space: $O(\\log n)$ đệ quy (in-place — đây là lợi thế lớn so với Merge Sort).

---

## 5. Pivot selection — vì sao chọn pivot tốt là sống còn

Chất lượng pivot quyết định Quicksort nhanh hay chậm. Mục 4.2 cho thấy pivot tệ → $O(n^2)$.

### 5.1 Last / first pivot

- **Đơn giản nhất** (\`A[hi]\` hoặc \`A[lo]\`).
- **Tệ với input đã sort / gần sort** → $O(n^2)$. Mà input thực tế rất hay đã sort sẵn.

### 5.2 Random pivot

> 💡 **Trực giác.** Thay vì luôn chọn cố định một vị trí (mà kẻ địch / dữ liệu có thể "khai thác"), ta **chọn ngẫu nhiên** một phần tử làm pivot rồi swap nó về cuối. Giờ không có input cố định nào đảm bảo gây worst-case — vì chọn pivot không phụ thuộc thứ tự dữ liệu. Worst-case $O(n^2)$ vẫn *có thể* xảy ra nhưng xác suất **cực nhỏ** (cần xui suốt $n$ lần liên tiếp).

### 5.3 Median-of-three

> 💡 **Trực giác.** Lấy **trung vị (median)** của 3 phần tử: \`A[lo]\`, \`A[mid]\`, \`A[hi]\`. Trung vị của 3 mẫu thường gần "giữa thật" hơn 1 mẫu đơn → partition cân hơn. Ngoài ra nó **biến input đã sort thành best-case**: với mảng sorted, median-of-three chọn ngay phần tử giữa → chia đôi hoàn hảo.

Ví dụ \`[1,2,3,4,5]\`: \`A[0]=1, A[2]=3, A[4]=5\`, median = \`3\` → chọn pivot=3, chia đều \`[1,2]\` + \`[4,5]\` → best-case thay vì worst-case! Đây là vì sao median-of-three rất phổ biến trong cài đặt thư viện.

> ❓ **Câu hỏi tự nhiên.** *"Median-of-three có loại bỏ hoàn toàn worst-case không?"* — Không. Vẫn tồn tại input "đối nghịch" được thiết kế riêng để đánh bại median-of-three (gọi là *median-of-three killer sequence*). Để chống mọi input, dùng **randomized** (5.2) hoặc **introsort** (chuyển sang Heap Sort khi đệ quy quá sâu — xem Lesson 09).

> 📝 **Tóm tắt mục 5.**
> - Last/first pivot: đơn giản nhưng $O(n^2)$ với input sorted.
> - Random pivot: phá worst-case xác định, expected $O(n \\log n)$.
> - Median-of-three: biến sorted input thành best-case; phổ biến trong thư viện.

---

## 6. Randomized Quicksort

> 💡 **Trực giác.** Randomized quicksort = quicksort + bước "chọn pivot ngẫu nhiên rồi swap về cuối" trước mỗi partition. Khi đó **expected** runtime là $O(n \\log n)$ cho **mọi** input — vì kỳ vọng được tính trên random của thuật toán, không phải trên phân phối dữ liệu. Không còn input nào "đánh bại" được nó một cách xác định.

Pseudocode (dùng Lomuto):

\`\`\`
randomized_partition(A, lo, hi):
    r = random(lo, hi)              # chọn ngẫu nhiên trong [lo, hi]
    swap(A[r], A[hi])               # đưa về cuối, rồi Lomuto như cũ
    return lomuto(A, lo, hi)
\`\`\`

Phân tích expected: với mỗi cặp phần tử, xác suất chúng được so sánh là $\\dfrac{2}{k+1}$ ($k$ = khoảng cách hạng). Tổng kỳ vọng số comparison $= 2n \\ln n + O(n) \\approx 1{,}39\\, n \\log_2 n$ — chính là average-case, nhưng giờ áp dụng cho **mọi** input.

> ⚠ **Lỗi thường gặp.** Random pivot **không** loại bỏ worst-case $O(n^2)$ về mặt lý thuyết — nó chỉ làm xác suất gần như 0. Nếu cần đảm bảo **tuyệt đối** $O(n \\log n)$ worst-case → dùng Merge Sort hoặc Heap Sort (Lesson 09), hoặc introsort.

---

## 7. Stability — Quicksort KHÔNG ổn định

> 💡 **Trực giác.** *Ổn định (stable)* nghĩa là: 2 phần tử có khóa bằng nhau giữ nguyên thứ tự tương đối sau khi sort. Quicksort **không** stable vì partition swap các phần tử ở vị trí **xa nhau**, có thể đảo thứ tự 2 phần tử khóa bằng nhau.

**Ví dụ phản chứng.** Sort theo số, với chữ cái đánh dấu thứ tự ban đầu:

\`[3a, 1, 3b, 2]\` — \`3a\` đứng trước \`3b\` ban đầu.

Lomuto pivot = \`A[hi] = 2\`, \`i=-1\`:
- j=0: \`3a ≤ 2\`? Không.
- j=1: \`1 ≤ 2\`? Có → i=0, swap A[0]↔A[1]: \`[1, 3a, 3b, 2]\`.
- j=2: \`3b ≤ 2\`? Không.
- Đặt pivot: swap A[1]↔A[3]: \`[1, 2, 3b, 3a]\`.

→ Kết quả \`[1, 2, 3b, 3a]\` — **\`3b\` giờ đứng trước \`3a\`**, đảo thứ tự! Quicksort unstable. ✓

> ❓ **Câu hỏi tự nhiên.** *"Làm sao để có quicksort stable?"* — Có thể, nhưng cần buffer phụ $O(n)$ (gắn index gốc làm tie-breaker, hoặc partition không in-place) → mất luôn lợi thế in-place. Khi cần stable, người ta thường dùng Merge Sort (Lesson 07) — stable tự nhiên.

> 📝 **Tóm tắt mục 7.** Quicksort unstable vì partition swap phần tử xa nhau. Cần stable → Merge Sort.

---

## 8. Quickselect — tìm phần tử nhỏ thứ k trong \`O(n)\` average

> 💡 **Trực giác.** Đôi khi ta không cần sort cả mảng, chỉ cần biết **phần tử nhỏ thứ k** (ví dụ: median, top-k). Quickselect tận dụng partition: sau partition, pivot ở vị trí \`p\`. Nếu \`p == k\` → tìm thấy! Nếu \`k < p\` → kết quả nằm bên trái, **chỉ đệ quy trái**. Nếu \`k > p\` → chỉ đệ quy phải. **Chỉ đi 1 phía** → nhanh hơn hẳn quicksort.

\`\`\`
quickselect(A, lo, hi, k):       # tìm phần tử ở vị trí k (0-indexed) khi đã sort
    if lo == hi: return A[lo]
    p = lomuto(A, lo, hi)
    if k == p:   return A[p]
    if k < p:    return quickselect(A, lo, p-1, k)
    else:        return quickselect(A, p+1, hi, k)
\`\`\`

**Độ phức tạp:** vì chỉ đệ quy 1 phía, recurrence average là $T(n) = T(n/2) + O(n)$ → tổng $n + n/2 + n/4 + \\cdots = 2n = O(n)$ (chuỗi hình học!). Worst-case vẫn $O(n^2)$ (pivot tệ liên tục); dùng random pivot → expected $O(n)$.

#### Walk-through Quickselect: tìm phần tử nhỏ thứ 3 (k=2, 0-indexed) trong \`[7, 2, 5, 1, 9, 3]\`

\`n=6, lo=0, hi=5, k=2\`. Lomuto pivot = \`A[5] = 3\`, \`i=-1\`:
- j=0: 7≤3? Không. j=1: 2≤3? Có→i=0, swap A[0]↔A[1]: \`[2,7,5,1,9,3]\`. j=2: 5≤3? Không. j=3: 1≤3? Có→i=1, swap A[1]↔A[3]: \`[2,1,5,7,9,3]\`. j=4: 9≤3? Không.
- Đặt pivot: swap A[2]↔A[5]: \`[2,1,3,7,9,5]\`, **p=2**.

\`k=2 == p=2\` → trả về \`A[2] = 3\`. 

Kiểm tra: sort \`[7,2,5,1,9,3]\` = \`[1,2,3,5,7,9]\`, phần tử index 2 = \`3\`. ✓ — chỉ 1 lần partition, không cần sort tiếp!

> 🔁 **Dừng lại tự kiểm tra.** Vì sao quickselect $O(n)$ còn quicksort $O(n \\log n)$?
> <details><summary>Đáp án</summary>
> Quicksort đệ quy **cả 2 phía** → tổng công $n \\cdot \\log n$. Quickselect chỉ đệ quy **1 phía** → tổng $n + n/2 + n/4 + \\cdots = 2n = O(n)$. Bỏ được nửa kia mỗi bước là chìa khóa.
> </details>

> 🔁 *Sẽ học kỹ ở Tier 7 — Lesson 48* (randomized algorithms): randomized quickselect và thuật toán **median-of-medians** cho $O(n)$ worst-case (deterministic select).

---

## 9. So sánh Merge vs Quick vs Heap

| | Merge Sort | Quicksort | Heap Sort |
|---|---|---|---|
| **Best** | $O(n \\log n)$ | $O(n \\log n)$ | $O(n \\log n)$ |
| **Average** | $O(n \\log n)$ | $O(n \\log n)$ | $O(n \\log n)$ |
| **Worst** | $O(n \\log n)$ | $O(n^2)$ | $O(n \\log n)$ |
| **Space** | $O(n)$ | $O(\\log n)$ (in-place) | $O(1)$ (in-place) |
| **Stable?** | ✅ Có | ❌ Không | ❌ Không |
| **Thực tế** | Ổn định, dự đoán được; tốt cho linked list & external sort | **Thường nhanh nhất** (cache-friendly, in-place) | Đảm bảo $O(n \\log n)$, nhưng hằng số lớn, cache kém |

> 💡 **Vì sao Quicksort thường NHANH NHẤT thực tế dù worst-case tệ hơn?**
> - **Cache-friendly:** partition quét tuyến tính, truy cập bộ nhớ liền kề → tận dụng cache CPU tốt. Heap Sort nhảy lung tung trong cây (index \`2i\`, \`2i+1\`) → cache miss nhiều.
> - **In-place:** không cấp phát buffer $O(n)$ như Merge Sort → ít overhead bộ nhớ, ít cache pollution.
> - **Hằng số nhỏ:** vòng lặp partition đơn giản, ít phép tính mỗi bước.
> - Worst-case $O(n^2)$ bị vô hiệu hóa bằng random/median-of-three pivot + introsort fallback.

**Quy tắc chọn thực tế:**
- Cần **stable** hoặc sort linked list / dữ liệu lớn ngoài bộ nhớ → **Merge Sort**.
- Sort mảng trong RAM, ưu tiên tốc độ → **Quicksort** (với pivot tốt).
- Cần đảm bảo $O(n \\log n)$ worst-case nghiêm ngặt, bộ nhớ cực hạn chế → **Heap Sort** (Lesson 09).

---

## 10. 3-way partition (Dutch National Flag)

> 💡 **Trực giác.** Lomuto/Hoare chia 2 nhóm (\`< pivot\`, \`≥ pivot\`). Nhưng nếu mảng có **nhiều phần tử trùng pivot** (ví dụ \`[2,2,2,2,2]\`), các phần tử \`== pivot\` vẫn bị đệ quy tiếp → lãng phí. **3-way partition** chia làm **3 vùng**: \`< pivot\`, \`== pivot\`, \`> pivot\`. Vùng \`== pivot\` đã đúng chỗ vĩnh viễn → chỉ đệ quy 2 đầu. Bài toán này là *Dutch National Flag* của Dijkstra (3 màu cờ Hà Lan: đỏ/trắng/xanh).

\`\`\`
sort3way(A, lo, hi):
    if lo >= hi: return
    pivot = A[lo]
    lt = lo          # A[lo..lt-1]   < pivot
    gt = hi          # A[gt+1..hi]   > pivot
    i  = lo          # A[lt..i-1]   == pivot ; A[i..gt] chưa xét
    while i <= gt:
        if A[i] < pivot:   swap(A[lt], A[i]); lt++; i++
        elif A[i] > pivot: swap(A[i], A[gt]); gt--          # i KHÔNG tăng (phần tử mới chưa xét)
        else:              i++                              # == pivot, để yên
    sort3way(A, lo, lt-1)
    sort3way(A, gt+1, hi)
\`\`\`

#### Walk-through 3-way: \`[2, 5, 2, 1, 2]\`, pivot = \`A[lo] = 2\`

\`lt=0, gt=4, i=0\`:

| i | A[i] | so với pivot=2 | Hành động | Mảng | lt | gt | i |
|---|------|----------------|-----------|------|----|----|----|
| 0 | 2 | == | i++ | \`[2,5,2,1,2]\` | 0 | 4 | 1 |
| 1 | 5 | > | swap A[1]↔A[4], gt-- | \`[2,2,2,1,5]\` | 0 | 3 | 1 |
| 1 | 2 | == | i++ | \`[2,2,2,1,5]\` | 0 | 3 | 2 |
| 2 | 2 | == | i++ | \`[2,2,2,1,5]\` | 0 | 3 | 3 |
| 3 | 1 | < | swap A[0]↔A[3], lt++, i++ | \`[1,2,2,2,5]\` | 1 | 3 | 4 |

\`i=4 > gt=3\` → dừng. Vùng \`< pivot\` = \`A[0..0]=[1]\`; \`== pivot\` = \`A[1..3]=[2,2,2]\` (đã xong!); \`> pivot\` = \`A[4..4]=[5]\`. Đệ quy chỉ trên \`[1]\` và \`[5]\` → cả hai 1 phần tử, xong ngay.

→ \`[1, 2, 2, 2, 5]\` ✓. Ba phần tử \`2\` xử lý 1 lần duy nhất, không đệ quy chúng → với mảng nhiều trùng, độ phức tạp giảm về gần $O(n)$.

> 📝 **Tóm tắt mục 10.** 3-way partition chia \`< / == / >\`, vùng \`==\` đóng đinh vĩnh viễn. Vô địch với mảng nhiều phần tử trùng ($O(n \\cdot k)$ với $k$ giá trị phân biệt).

---

## 11. Cạm bẫy

> ⚠ **Cạm bẫy 1 — Sorted input + pivot=last → $O(n^2)$.**
> Đây là lỗi hay gặp nhất. Dữ liệu thực tế thường đã sort hoặc gần sort. Pivot cố định (last/first) biến nó thành worst-case.
> **Fix:** random pivot hoặc median-of-three (mục 5).

> ⚠ **Cạm bẫy 2 — Đệ quy phần lớn trước → stack sâu $O(n)$.**
> Nếu gọi đệ quy phần lớn trước rồi phần nhỏ, trong worst-case stack depth có thể tới $O(n)$ → tràn stack với $n$ lớn.
> **Fix:** **đệ quy phần NHỎ trước**, rồi xử lý phần LỚN bằng vòng lặp (tail-call elimination). Đảm bảo stack depth ≤ $O(\\log n)$ cả worst-case:
> \`\`\`
> quicksort(A, lo, hi):
>     while lo < hi:
>         p = partition(A, lo, hi)
>         if (p - lo) < (hi - p):       # phần trái nhỏ hơn
>             quicksort(A, lo, p-1)      # đệ quy phần NHỎ
>             lo = p + 1                 # lặp với phần LỚN (không đệ quy)
>         else:
>             quicksort(A, p+1, hi)
>             hi = p - 1
> \`\`\`

> ⚠ **Cạm bẫy 3 — Off-by-one partition.**
> - Lomuto: quét \`j\` tới \`hi-1\` (KHÔNG tới \`hi\`); khởi tạo \`i = lo-1\`.
> - Hoare: đệ quy \`[lo, j]\` + \`[j+1, hi]\` (KHÔNG bỏ \`j\`), khác hẳn Lomuto (\`[lo, p-1]\` + \`[p+1, hi]\`). Lẫn lộn 2 quy ước này → vô hạn hoặc sai kết quả.

> ⚠ **Cạm bẫy 4 — Mảng nhiều trùng + Lomuto → suy biến.**
> Mảng \`[2,2,2,...,2]\` với Lomuto pivot=last: mọi phần tử \`≤ pivot\` → partition chia $n-1$ và $0$ → $O(n^2)$!
> **Fix:** dùng 3-way partition (mục 10).

---

## Code Go (inline)

Tất cả code dưới đây biên dịch được. Mỗi hàm đếm số comparison để bạn quan sát chi phí.

### Lomuto partition

\`\`\`go
package main

import (
	"fmt"
	"math/rand"
)

// lomuto: pivot = A[hi]. Trả về vị trí cuối của pivot.
// cmp: con trỏ đếm số phép so sánh.
func lomuto(A []int, lo, hi int, cmp *int) int {
	pivot := A[hi]
	i := lo - 1 // ranh giới vùng "<= pivot"
	for j := lo; j < hi; j++ {
		*cmp++ // đếm 1 so sánh
		if A[j] <= pivot {
			i++
			A[i], A[j] = A[j], A[i] // swap
		}
	}
	A[i+1], A[hi] = A[hi], A[i+1] // đặt pivot vào đúng chỗ
	return i + 1
}
\`\`\`

### Hoare partition

\`\`\`go
// hoare: pivot = A[lo]. Trả về ĐIỂM CHIA j (không phải vị trí pivot).
// Đệ quy phải dùng [lo, j] và [j+1, hi].
func hoare(A []int, lo, hi int, cmp *int) int {
	pivot := A[lo]
	i, j := lo-1, hi+1
	for {
		for { // tiến i tới phần tử >= pivot
			i++
			*cmp++
			if A[i] >= pivot {
				break
			}
		}
		for { // lùi j tới phần tử <= pivot
			j--
			*cmp++
			if A[j] <= pivot {
				break
			}
		}
		if i >= j {
			return j // con trỏ gặp nhau -> điểm chia
		}
		A[i], A[j] = A[j], A[i]
	}
}
\`\`\`

### Quicksort (Lomuto) + đệ quy phần nhỏ trước (cạm bẫy 2)

\`\`\`go
// quicksort: in-place, đệ quy phần NHỎ trước để giữ stack O(log n).
func quicksort(A []int, lo, hi int, cmp *int) {
	for lo < hi {
		p := lomuto(A, lo, hi, cmp)
		if p-lo < hi-p { // phần trái nhỏ hơn
			quicksort(A, lo, p-1, cmp) // đệ quy phần NHỎ
			lo = p + 1                 // lặp với phần LỚN (tail-call)
		} else {
			quicksort(A, p+1, hi, cmp)
			hi = p - 1
		}
	}
}
\`\`\`

### Randomized quicksort

\`\`\`go
// randomizedPartition: chọn pivot ngẫu nhiên rồi swap về cuối -> expected O(n log n).
func randomizedPartition(A []int, lo, hi int, cmp *int) int {
	r := lo + rand.Intn(hi-lo+1) // ngẫu nhiên trong [lo, hi]
	A[r], A[hi] = A[hi], A[r]    // đưa pivot về cuối
	return lomuto(A, lo, hi, cmp)
}

func randomizedQuicksort(A []int, lo, hi int, cmp *int) {
	if lo >= hi {
		return
	}
	p := randomizedPartition(A, lo, hi, cmp)
	randomizedQuicksort(A, lo, p-1, cmp)
	randomizedQuicksort(A, p+1, hi, cmp)
}
\`\`\`

### Quickselect — tìm phần tử nhỏ thứ k (0-indexed)

\`\`\`go
// quickselect: tìm phần tử ở vị trí k khi đã sort, O(n) average. Chỉ đệ quy 1 phía.
func quickselect(A []int, lo, hi, k int, cmp *int) int {
	if lo == hi {
		return A[lo]
	}
	p := lomuto(A, lo, hi, cmp)
	switch {
	case k == p:
		return A[p]
	case k < p:
		return quickselect(A, lo, p-1, k, cmp)
	default:
		return quickselect(A, p+1, hi, k, cmp)
	}
}
\`\`\`

### 3-way partition (Dutch National Flag)

\`\`\`go
// sort3way: chia < / == / > pivot. Vùng == đóng đinh vĩnh viễn.
// Vô địch với mảng nhiều phần tử trùng.
func sort3way(A []int, lo, hi int, cmp *int) {
	if lo >= hi {
		return
	}
	pivot := A[lo]
	lt, gt, i := lo, hi, lo
	for i <= gt {
		*cmp++
		switch {
		case A[i] < pivot:
			A[lt], A[i] = A[i], A[lt]
			lt++
			i++
		case A[i] > pivot:
			A[i], A[gt] = A[gt], A[i]
			gt-- // i KHÔNG tăng: phần tử mới hoán vào chưa xét
		default:
			i++ // == pivot, để yên trong vùng giữa
		}
	}
	sort3way(A, lo, lt-1, cmp)
	sort3way(A, gt+1, hi, cmp)
}

func main() {
	a1 := []int{5, 2, 4, 1, 3}
	c1 := 0
	quicksort(a1, 0, len(a1)-1, &c1)
	fmt.Println("quicksort:", a1, "comparisons:", c1) // [1 2 3 4 5]

	a2 := []int{7, 2, 5, 1, 9, 3}
	c2 := 0
	med := quickselect(a2, 0, len(a2)-1, 2, &c2)
	fmt.Println("3rd smallest:", med, "comparisons:", c2) // 3

	a3 := []int{2, 5, 2, 1, 2}
	c3 := 0
	sort3way(a3, 0, len(a3)-1, &c3)
	fmt.Println("sort3way:", a3, "comparisons:", c3) // [1 2 2 2 5]
}
\`\`\`

---

## Bài tập

1. **Trace Lomuto partition.** Cho \`[8, 3, 7, 4, 2, 6, 5]\`, pivot = \`A[hi] = 5\`. Lập bảng \`j / A[j] / so sánh / mảng / i\` và cho biết vị trí trả về.
2. **Quickselect tìm median.** Cho \`[12, 3, 5, 7, 4, 19, 26]\` (n=7), median là phần tử nhỏ thứ 4 (k=3, 0-indexed). Trace quickselect (Lomuto pivot=last) và cho biết median.
3. **Vì sao sorted input gây $O(n^2)$ + fix.** Giải thích bằng số cho \`[1,2,3,4,5,6]\` với Lomuto pivot=last: đếm tổng comparison. Sau đó chỉ cách median-of-three biến nó thành best-case (tính pivot lần đầu).
4. **3-way partition cho mảng nhiều trùng.** Trace \`sort3way\` trên \`[3, 1, 3, 3, 2, 3, 1]\`, pivot = \`A[lo] = 3\`. Lập bảng và cho biết 3 vùng cuối cùng.
5. **Đệ quy nhỏ-trước giảm stack.** Giải thích vì sao "đệ quy phần nhỏ trước + lặp phần lớn" giới hạn stack depth ≤ $O(\\log n)$ ngay cả worst-case. Minh họa bằng \`[1,2,3,4,5,6,7,8]\` (worst-case): so sánh stack depth của 2 cách.
6. **So sánh swap count Lomuto vs Hoare.** Cho \`[4, 8, 2, 6, 1, 7, 3, 5]\`. Đếm số swap khi partition 1 lần bằng Lomuto (pivot=last=5) và bằng Hoare (pivot=first=4). Cái nào ít swap hơn?
7. **(Mở rộng) Worst-case randomized.** Với random pivot, vì sao xác suất gặp worst-case $O(n^2)$ lại "gần như 0" nhưng không bằng 0? Ước lượng xác suất chọn đúng pivot min/max suốt mọi tầng cho $n=4$.

---

## Lời giải chi tiết

### Bài 1 — Trace Lomuto \`[8, 3, 7, 4, 2, 6, 5]\`, pivot=5

\`lo=0, hi=6, pivot=5, i=-1\`:

| j | A[j] | A[j] ≤ 5? | Hành động | Mảng | i |
|---|------|-----------|-----------|------|---|
| 0 | 8 | Không | — | \`[8,3,7,4,2,6,5]\` | -1 |
| 1 | 3 | Có | i=0, swap A[0]↔A[1] | \`[3,8,7,4,2,6,5]\` | 0 |
| 2 | 7 | Không | — | \`[3,8,7,4,2,6,5]\` | 0 |
| 3 | 4 | Có | i=1, swap A[1]↔A[3] | \`[3,4,7,8,2,6,5]\` | 1 |
| 4 | 2 | Có | i=2, swap A[2]↔A[4] | \`[3,4,2,8,7,6,5]\` | 2 |
| 5 | 6 | Không | — | \`[3,4,2,8,7,6,5]\` | 2 |

Đặt pivot: swap A[i+1=3]↔A[hi=6]: \`[3,4,2,5,7,6,8]\` → **return 3**.

Kiểm tra: \`A[0..2]=[3,4,2]\` đều \`<5\`; \`A[4..6]=[7,6,8]\` đều \`>5\`; pivot 5 ở index 3 đúng chỗ. ✓ (6 comparison = \`hi-lo\`).

### Bài 2 — Quickselect median \`[12, 3, 5, 7, 4, 19, 26]\`, k=3

\`lo=0, hi=6, pivot=A[6]=26, i=-1\`. Quét j=0..5: tất cả \`≤26\` → i tăng mỗi bước, mảng không đổi (mỗi phần tử swap với chính nó), kết thúc i=5, swap A[6]↔A[6]. **p=6**.

\`k=3 < p=6\` → quickselect \`[12,3,5,7,4,19] (lo=0,hi=5), k=3\`. pivot=A[5]=19:
- j=0:12≤19 i=0 (tự swap). j=1:3≤19 i=1 swap A[1]↔A[1]. j=2:5≤19 i=2. j=3:7≤19 i=3. j=4:4≤19 i=4. Đặt pivot: swap A[5]↔A[5]. **p=5**. Mảng \`[12,3,5,7,4,19]\`.

\`k=3 < p=5\` → quickselect \`[12,3,5,7,4] (lo=0,hi=4), k=3\`. pivot=A[4]=4, i=-1:
- j=0:12≤4? Không. j=1:3≤4? Có→i=0 swap A[0]↔A[1]:\`[3,12,5,7,4]\`. j=2:5≤4? Không. j=3:7≤4? Không. Đặt pivot: swap A[i+1=1]↔A[4]:\`[3,4,5,7,12]\`. **p=1**.

\`k=3 > p=1\` → quickselect \`[5,7,12] (lo=2,hi=4), k=3\`. pivot=A[4]=12, i=1:
- j=2:5≤12 i=2 (tự swap). j=3:7≤12 i=3 swap A[3]↔A[3]. Đặt pivot swap A[4]↔A[4]. **p=4**.

\`k=3 < p=4\` → quickselect \`[5,7] (lo=2,hi=3), k=3\`. pivot=A[3]=7, i=1:
- j=2:5≤7 i=2 (tự swap). Đặt pivot swap A[3]↔A[3]. **p=3**.

\`k=3 == p=3\` → return \`A[3] = 7\`.

Kiểm tra: sort = \`[3,4,5,7,12,19,26]\`, index 3 = **7** = median. ✓

### Bài 3 — Sorted input \`O(n²)\` + median-of-three fix

\`[1,2,3,4,5,6]\`, Lomuto pivot=last:
- partition \`[1,2,3,4,5,6]\` pivot=6: 5 comparison, p=5, không đổi → đệ quy \`[1,2,3,4,5]\`.
- \`[1,2,3,4,5]\` pivot=5: 4 cmp, p=4 → \`[1,2,3,4]\`.
- \`[1,2,3,4]\` pivot=4: 3 cmp → \`[1,2,3]\`.
- \`[1,2,3]\` pivot=3: 2 cmp → \`[1,2]\`.
- \`[1,2]\` pivot=2: 1 cmp → \`[1]\`.

Tổng comparison = $5+4+3+2+1 = 15 = \\dfrac{n(n-1)}{2}$ với $n=6$ → $O(n^2)$. So với average $\\sim n \\log n \\approx 6 \\cdot 2{,}6 \\approx 15{,}5$ thì ở đây $n$ nhỏ chưa rõ, nhưng với $n=1000$: $O(n^2) = 500{.}000$ vs $O(n \\log n) \\approx 10{.}000$ — chênh 50×.

**Median-of-three fix:** với \`[1,2,3,4,5,6]\`, \`A[lo]=1, A[mid=2]=3, A[hi]=5\`... thực ra median của \`{1,3,6}\` (lo=1, mid index 2 hoặc 3, hi=6). Lấy \`A[0]=1, A[2]=3, A[5]=6\` → median = **3**. Swap 3 về cuối rồi partition → chia thành \`[1,2]\` + \`[4,5,6]\` (xấp xỉ đều) → đệ quy cân → best-case $O(n \\log n)$. Median-of-three "phát hiện" được phần tử giữa nên không còn suy biến.

### Bài 4 — 3-way \`[3, 1, 3, 3, 2, 3, 1]\`, pivot=3

\`lt=0, gt=6, i=0\`:

| i | A[i] | vs 3 | Hành động | Mảng | lt | gt | i |
|---|------|------|-----------|------|----|----|----|
| 0 | 3 | == | i++ | \`[3,1,3,3,2,3,1]\` | 0 | 6 | 1 |
| 1 | 1 | < | swap A[0]↔A[1], lt++,i++ | \`[1,3,3,3,2,3,1]\` | 1 | 6 | 2 |
| 2 | 3 | == | i++ | \`[1,3,3,3,2,3,1]\` | 1 | 6 | 3 |
| 3 | 3 | == | i++ | \`[1,3,3,3,2,3,1]\` | 1 | 6 | 4 |
| 4 | 2 | < | swap A[1]↔A[4], lt++,i++ | \`[1,2,3,3,3,3,1]\` | 2 | 6 | 5 |
| 5 | 3 | == | i++ | \`[1,2,3,3,3,3,1]\` | 2 | 6 | 6 |
| 6 | 1 | < | swap A[2]↔A[6], lt++,i++ | \`[1,2,1,3,3,3,3]\` | 3 | 6 | 7 |

\`i=7 > gt=6\` → dừng. Ba vùng:
- \`< pivot\` = \`A[0..lt-1] = A[0..2] = [1,2,1]\` → đệ quy sort tiếp.
- \`== pivot\` = \`A[lt..gt] = A[3..6] = [3,3,3,3]\` → **đã xong**.
- \`> pivot\` = \`A[gt+1..hi] = A[7..6]\` = rỗng.

Bốn phần tử \`3\` xử lý 1 lần. Đệ quy chỉ trên \`[1,2,1]\`. ✓

### Bài 5 — Đệ quy nhỏ-trước, stack ≤ O(log n)

**Lý do:** mỗi khung stack chỉ tồn tại khi đang đệ quy phần **nhỏ hơn** (≤ nửa mảng). Phần lớn được xử lý bằng vòng lặp (\`lo = p+1\`), không tạo khung stack mới. Vì mỗi lần xuống sâu 1 cấp, kích thước phần đệ quy giảm ít nhất **một nửa** → tối đa $\\log_2 n$ cấp lồng nhau → stack depth ≤ $O(\\log n)$.

**Minh họa \`[1,2,3,4,5,6,7,8]\` (worst-case, pivot=last):**
- *Cách ngây thơ (đệ quy cả 2, phần lớn trước):* mỗi partition tách 1 phần tử cuối, phần lớn còn $n-1$ được đệ quy ngay → stack chồng \`[1..7]\`, \`[1..6]\`, ..., \`[1]\` → depth = **8 = O(n)**. Với n lớn → tràn stack.
- *Cách nhỏ-trước:* phần nhỏ luôn là phần phải rỗng (\`p+1..hi\` rỗng vì p=hi). \`quicksort(rỗng)\` return ngay (không tạo khung), rồi \`hi = p-1\` lặp lại → **không khung nào lồng nhau** → depth ≈ **1 = O(log n)**. An toàn.

### Bài 6 — Swap count Lomuto vs Hoare \`[4, 8, 2, 6, 1, 7, 3, 5]\`

**Lomuto** pivot=A[7]=5, i=-1:
- j=0:4≤5 i=0 swap A[0]↔A[0] (tự swap, vẫn tính 1). j=1:8≤5? Không. j=2:2≤5 i=1 swap A[1]↔A[2]:\`[4,2,8,6,1,7,3,5]\`. j=3:6≤5? Không. j=4:1≤5 i=2 swap A[2]↔A[4]:\`[4,2,1,6,8,7,3,5]\`. j=5:7≤5? Không. j=6:3≤5 i=3 swap A[3]↔A[6]:\`[4,2,1,3,8,7,6,5]\`. Đặt pivot swap A[4]↔A[7]:\`[4,2,1,3,5,7,6,8]\`.
- Số swap = 4 trong vòng (j=0,2,4,6) + 1 đặt pivot = **5 swap** (kể cả tự-swap; nếu bỏ tự-swap j=0 thì 4).

**Hoare** pivot=A[0]=4, i=-1, j=8:
- Vòng1: i→ i=0:4<4? Không→i=0. j→ j=7:5>4 j=6:3>4? Không→j=6. i=0<j=6 swap A[0]↔A[6]:\`[3,8,2,6,1,7,4,5]\`.
- Vòng2: i→ i=1:8<4? Không→i=1. j→ j=5:7>4 j=4:1>4? Không→j=4. i=1<j=4 swap A[1]↔A[4]:\`[3,1,2,6,8,7,4,5]\`.
- Vòng3: i→ i=2:2<4 i=3:6<4? Không→i=3. j→ j=3:6>4 j=2:2>4? Không→j=2. i=3>=j=2 → return 2. Không swap.
- Số swap = **2 swap**.

→ **Hoare ít swap hơn** (2 vs 4–5). Đúng như lý thuyết: Hoare chỉ swap cặp đảo chỗ thật sự.

### Bài 7 — Xác suất worst-case randomized (n=4)

Worst-case xảy ra khi pivot ngẫu nhiên **luôn** là min hoặc max của phần đang xét, ở **mọi** tầng. Với $n=4$:
- Tầng 1 (4 phần tử): xác suất chọn min HOẶC max = $2/4 = 1/2$.
- Tầng 2 (3 phần tử còn lại): $2/3$.
- Tầng 3 (2 phần tử): $2/2 = 1$ (luôn min/max khi chỉ còn 2).

Xác suất chuỗi xui hoàn toàn ≈ $(1/2) \\cdot (2/3) \\cdot 1 = 1/3$ cho $n=4$ ($n$ nhỏ nên còn cao). Nhưng với $n=20$: tích $\\prod 2/k$ giảm theo cấp **giai thừa nghịch** → cỡ $2^{n-1}/n! \\approx 10^{-15}$ → "gần như 0". Không bằng 0 vì vẫn có 1 hoán vị + 1 chuỗi random cụ thể cho ra worst-case — chỉ là xác suất nhỏ tới mức thực tế không bao giờ gặp.

---

## Code & Minh họa

- **Code Go:** xem mục "[Code Go (inline)](#code-go-inline)" phía trên — Lomuto, Hoare, quicksort (nhỏ-trước), randomized, quickselect, 3-way. Tất cả đếm comparison.
- **Trực quan:** [visualization.html](./visualization.html) — 3 module: (1) Partition animator (Lomuto/Hoare), (2) Quicksort tree (đệ quy partition), (3) Pivot strategy comparison (last vs random/median trên sorted input, đếm operation).

## Bài tiếp theo

- [Lesson 09 — Heap Sort](../lesson-09-heap-sort/) — sort $O(n \\log n)$ worst-case đảm bảo, in-place, dùng cấu trúc heap. So sánh trực tiếp với Quicksort (mục 9).
- Tham khảo trước: [Lesson 07 — Merge Sort](../lesson-07-merge-sort/) (divide & conquer "thuận", stable).
- *Tease:* Tier 7 — Lesson 48 (Randomized Algorithms) đào sâu randomized quickselect & median-of-medians $O(n)$ worst-case.
`;
