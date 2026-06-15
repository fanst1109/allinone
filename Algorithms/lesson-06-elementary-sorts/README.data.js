// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: Algorithms/lesson-06-elementary-sorts/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 06 — Elementary Sorts (Sắp xếp cơ bản)

> **Tier 1 — Sắp xếp · Lesson đầu tiên.** Ba thuật toán sắp xếp "kinh điển": **bubble sort**, **selection sort**, **insertion sort**. Tất cả đều $O(n^2)$, nhưng mỗi cái có tính chất riêng (ổn định hay không, số lần swap, hành vi trên mảng gần-sorted) — và hiểu rõ chúng là nền để sau này hiểu vì sao merge/quick/heap sort nhanh hơn, và vì sao các thư viện thực tế vẫn dùng insertion sort ở "đáy" đệ quy.

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Phát biểu được **bài toán sắp xếp** và vì sao nó quan trọng (search nhanh, dedup, tiền đề cho thuật toán khác).
- Cài đặt được **bubble, selection, insertion sort** bằng Go, hiểu từng vòng lặp làm gì.
- Trace (mô phỏng từng bước) cả ba thuật toán trên mảng cụ thể, **đếm chính xác số comparison và swap**.
- Phân biệt **stable vs unstable**, **in-place**, và biết thuật toán nào có tính chất nào.
- Biết **khi nào** vẫn nên dùng sort cơ bản (n nhỏ, mảng gần-sorted, làm building block cho hybrid sort).
- Hiểu khái niệm **inversion** và mối liên hệ với insertion sort.

## Kiến thức tiền đề

- [Tier 0 — Big-O & phân tích tiệm cận](../tier-0-foundations/index.html): khái niệm $O(n^2)$, $O(n)$, best/average/worst case.
- [Lesson 04 — Tính đúng đắn & invariant](../lesson-04-correctness-invariant/): khái niệm loop invariant — ta sẽ dùng để lý giải vì sao insertion sort đúng.
- Vòng lặp lồng nhau và mảng (array) cơ bản trong Go.

---

## 1. Bài toán sắp xếp

### 1.1 Định nghĩa

> **💡 Trực giác.** Sắp xếp giống như xếp một cỗ bài trên tay: bạn có một đống quân lộn xộn, bạn muốn chúng nằm theo thứ tự tăng dần để dễ tìm, dễ so. "Sắp xếp" trong thuật toán cũng chính xác như vậy — biến một dãy lộn xộn thành một dãy có thứ tự.

**Bài toán sắp xếp (sorting problem):** cho một dãy $n$ phần tử \`a[0], a[1], ..., a[n-1]\` cùng với một **quan hệ thứ tự** $\\leq$ (so sánh được hai phần tử bất kỳ), hãy **hoán vị** (permute) chúng thành \`a[π(0)], a[π(1)], ..., a[π(n-1)]\` sao cho:

\`\`\`
a[π(0)] ≤ a[π(1)] ≤ ... ≤ a[π(n-1)]
\`\`\`

Nói gọn: biến đổi dãy về **thứ tự không giảm** (non-decreasing). Kết quả phải là một **hoán vị** của dãy gốc — tức là không thêm, không bớt, không đổi giá trị phần tử nào, chỉ đổi **vị trí**.

**Bốn ví dụ cụ thể:**

| Đầu vào | Đầu ra (tăng dần) |
|---------|-------------------|
| \`[5, 2, 4, 1, 3]\` | \`[1, 2, 3, 4, 5]\` |
| \`[3, 3, 1, 2]\` (có trùng) | \`[1, 2, 3, 3]\` |
| \`[-2, 0, -5, 7]\` (có âm) | \`[-5, -2, 0, 7]\` |
| \`[9]\` (1 phần tử) | \`[9]\` (đã sorted) |

> **⚠ Lỗi thường gặp.** Sắp xếp **không** loại bỏ phần tử trùng. \`[3, 3, 1, 2]\` → \`[1, 2, 3, 3]\`, vẫn còn hai số \`3\`. Việc loại trùng (dedup) là bước **sau** khi đã sort (xem mục 1.2).

### 1.2 Vì sao sắp xếp quan trọng?

Sắp xếp là một trong những thao tác được thực hiện nhiều nhất trong lập trình thực tế. Ba lý do lớn:

**(a) Search nhanh.** Trên mảng **chưa sorted**, muốn tìm một phần tử bạn phải duyệt tuần tự — $O(n)$. Trên mảng **đã sorted**, bạn dùng **binary search** — $O(\\log n)$.

Ví dụ số: tìm trong mảng $1.000.000$ phần tử.
- Chưa sort: trung bình $500.000$ phép so sánh.
- Đã sort + binary search: tối đa $\\log_2(1.000.000) \\approx 20$ phép so sánh.

Chênh lệch $25.000$ lần. (Binary search học kỹ ở Tier 2.)

**(b) Dedup (loại trùng) & đếm tần suất.** Sau khi sort, các phần tử bằng nhau nằm **kề nhau** → loại trùng chỉ cần một lần duyệt $O(n)$:

\`\`\`
[3, 1, 3, 2, 1]  --sort-->  [1, 1, 2, 3, 3]  --duyệt bỏ kề trùng-->  [1, 2, 3]
\`\`\`

**(c) Tiền đề cho thuật toán khác.** Rất nhiều thuật toán **yêu cầu input đã sorted** mới chạy đúng/nhanh:
- Two pointers, sliding window (Tier 2).
- Nhiều thuật toán greedy (Tier 3) bắt đầu bằng "sort theo deadline / weight rồi xử lý lần lượt".
- Phát hiện phần tử gần nhau (closest pair), trộn hai danh sách (merge).

> **❓ Câu hỏi tự nhiên.**
> - *"Sao không sort sẵn một lần rồi dùng mãi?"* — Đúng, nếu dữ liệu tĩnh thì sort một lần rồi binary search nhiều lần là chiến lược cực tốt. Nhưng nếu dữ liệu thay đổi liên tục (chèn/xóa) thì phải dùng cấu trúc động (BST, heap) — xem DataStructures.
> - *"Mảng đã sorted rồi thì sort lại có tốn không?"* — Tùy thuật toán! Insertion sort phát hiện "đã sorted" và chạy $O(n)$; selection sort thì **vẫn** $O(n^2)$. Đây chính là một trong những điểm phân biệt quan trọng nhất của bài này.

> **📝 Tóm tắt mục 1.**
> - Sắp xếp = hoán vị dãy về thứ tự không giảm; **không** thêm/bớt phần tử, **không** dedup.
> - Quan trọng vì: bật binary search $O(\\log n)$, dedup/đếm tần suất dễ, và là input bắt buộc cho nhiều thuật toán sau.
> - Ba thuật toán bài này đều $O(n^2)$ — chậm với $n$ lớn, nhưng đơn giản, in-place, và là nền lý thuyết cho các sort nhanh hơn.

---

## 2. Bubble sort

### 2.1 Ý tưởng

> **💡 Trực giác.** Tưởng tượng một cột nước có những bọt khí (bubble) nặng-nhẹ khác nhau. Bọt **lớn** nổi lên trên cùng trước. Bubble sort hoạt động y hệt: ta đi từ trái sang phải, **so sánh hai phần tử kề nhau**, nếu cái bên trái lớn hơn cái bên phải thì **đổi chỗ** (swap). Sau một lượt (pass) đi hết mảng, **phần tử lớn nhất** đã "nổi" về cuối mảng — đúng chỗ của nó.

Lặp lại: sau pass 1, phần tử lớn nhất ở cuối. Sau pass 2, phần tử lớn nhì ở áp cuối. Cứ thế, mỗi pass "khóa" thêm một phần tử ở đuôi. Sau $n-1$ pass, toàn bộ mảng sorted.

### 2.2 Walk-through: \`[5, 2, 4, 1, 3]\`

Quy ước: **(so sánh)** in cặp đang xét; nếu trái > phải thì swap. Phần **in đậm** là vùng đã khóa (đúng vị trí cuối cùng).

**Pass 1** (so sánh các cặp \`(0,1),(1,2),(2,3),(3,4)\`):

| Bước | Mảng | So sánh | Hành động |
|------|------|---------|-----------|
| start | \`[5, 2, 4, 1, 3]\` | — | — |
| \`(0,1)\` | \`[5, 2, ...]\` | \`5 > 2\` | swap → \`[2, 5, 4, 1, 3]\` |
| \`(1,2)\` | \`[.. 5, 4 ..]\` | \`5 > 4\` | swap → \`[2, 4, 5, 1, 3]\` |
| \`(2,3)\` | \`[.. 5, 1 ..]\` | \`5 > 1\` | swap → \`[2, 4, 1, 5, 3]\` |
| \`(3,4)\` | \`[.. 5, 3]\` | \`5 > 3\` | swap → \`[2, 4, 1, 3, **5**]\` |

Sau pass 1: \`5\` đã nổi về cuối. Mảng: \`[2, 4, 1, 3, **5**]\`. **4 comparison, 4 swap.**

**Pass 2** (chỉ xét tới \`(2,3)\` vì cuối đã khóa):

| Bước | Mảng | So sánh | Hành động |
|------|------|---------|-----------|
| \`(0,1)\` | \`[2, 4, ...]\` | \`2 < 4\` | không swap |
| \`(1,2)\` | \`[.. 4, 1 ..]\` | \`4 > 1\` | swap → \`[2, 1, 4, 3, **5**]\` |
| \`(2,3)\` | \`[.. 4, 3 ..]\` | \`4 > 3\` | swap → \`[2, 1, 3, **4, 5**]\` |

Sau pass 2: \`[2, 1, 3, **4, 5**]\`. **3 comparison, 2 swap.**

**Pass 3** (xét tới \`(1,2)\`):

| Bước | Mảng | So sánh | Hành động |
|------|------|---------|-----------|
| \`(0,1)\` | \`[2, 1, ...]\` | \`2 > 1\` | swap → \`[1, 2, 3, **4, 5**]\` |
| \`(1,2)\` | \`[.. 2, 3 ..]\` | \`2 < 3\` | không swap |

Sau pass 3: \`[1, 2, **3, 4, 5**]\`. **2 comparison, 1 swap.**

**Pass 4** (xét tới \`(0,1)\`):

| Bước | Mảng | So sánh | Hành động |
|------|------|---------|-----------|
| \`(0,1)\` | \`[1, 2, ...]\` | \`1 < 2\` | không swap |

Sau pass 4: \`[**1, 2, 3, 4, 5**]\` — sorted! **1 comparison, 0 swap.**

**Tổng kết:** comparison = $4+3+2+1 = 10$, swap = $4+2+1+0 = 7$.

> Lưu ý số comparison tổng quát = $(n-1) + (n-2) + \\cdots + 1 = \\dfrac{n(n-1)}{2}$. Với $n=5$: $5 \\cdot 4 / 2 = 10$ ✓.

### 2.3 Code Go

\`\`\`go
// bubbleSort sắp xếp tăng dần, trả về số comparison và swap để theo dõi.
func bubbleSort(a []int) (comparisons, swaps int) {
    n := len(a)
    // Mỗi pass đẩy phần tử lớn nhất còn lại về cuối.
    // i là số phần tử đã khóa ở đuôi; vòng trong chỉ chạy tới n-1-i.
    for i := 0; i < n-1; i++ {
        for j := 0; j < n-1-i; j++ {
            comparisons++
            if a[j] > a[j+1] { // trái lớn hơn phải → đẩy cái lớn sang phải
                a[j], a[j+1] = a[j+1], a[j]
                swaps++
            }
        }
    }
    return
}
\`\`\`

### 2.4 Early-exit optimization

> **💡 Trực giác.** Nếu trong **cả một pass** ta không thực hiện một swap nào, nghĩa là **không còn cặp nào sai thứ tự** → mảng đã sorted, có thể dừng ngay, không cần chạy nốt các pass còn lại.

Đây là cải tiến quan trọng: với mảng **đã sorted sẵn**, bubble sort có early-exit chạy đúng **một pass** $n-1$ comparison rồi dừng → $O(n)$ thay vì $O(n^2)$.

\`\`\`go
// bubbleSortEarlyExit: dừng sớm nếu một pass không có swap nào.
func bubbleSortEarlyExit(a []int) (comparisons, swaps int) {
    n := len(a)
    for i := 0; i < n-1; i++ {
        swapped := false
        for j := 0; j < n-1-i; j++ {
            comparisons++
            if a[j] > a[j+1] {
                a[j], a[j+1] = a[j+1], a[j]
                swaps++
                swapped = true
            }
        }
        if !swapped { // cả pass không swap → đã sorted, dừng
            break
        }
    }
    return
}
\`\`\`

Ví dụ: mảng \`[1, 2, 3, 4, 5]\` (đã sorted). Pass 1 chạy 4 comparison, không swap nào → \`swapped = false\` → \`break\`. Tổng: **4 comparison, 0 swap, $O(n)$**. Không có early-exit thì vẫn chạy đủ $10$ comparison.

> **⚠ Lỗi thường gặp.** Quên cờ \`swapped\` (không có early-exit) là lỗi phổ biến nhất khi viết bubble sort — bạn mất luôn ưu điểm $O(n)$ trên dữ liệu gần-sorted, biến bubble sort thành thuật toán "luôn $O(n^2)$" vô dụng.

### 2.5 Độ phức tạp

| Trường hợp | Mô tả | Comparison | Swap | Time |
|-----------|-------|-----------|------|------|
| **Best** (đã sorted, có early-exit) | 1 pass, không swap | $n-1$ | $0$ | $O(n)$ |
| **Average** | ngẫu nhiên | $\\sim n^2/2$ | $\\sim n^2/4$ | $O(n^2)$ |
| **Worst** (sorted ngược) | mọi cặp đều swap | $\\dfrac{n(n-1)}{2}$ | $\\dfrac{n(n-1)}{2}$ | $O(n^2)$ |

Ví dụ worst case \`[5,4,3,2,1]\` với $n=5$: comparison $= 10$, swap $= 10$ (mỗi comparison đều dẫn tới swap).

> **🔁 Dừng lại tự kiểm tra.**
> 1. Sau pass đầu tiên của bubble sort trên \`[3, 1, 4, 1, 5]\`, phần tử nào chắc chắn đúng vị trí?
> 2. Vì sao early-exit giúp best case là $O(n)$ chứ không phải $O(n^2)$?
>
> <details><summary>Đáp án</summary>
>
> 1. Phần tử **lớn nhất** (\`5\`) chắc chắn nằm ở cuối mảng sau pass 1. Mảng \`[3,1,1,4,5]\` sau pass 1 — \`5\` đã ở cuối.
> 2. Mảng đã sorted → pass đầu không có swap nào → cờ \`swapped\` còn \`false\` → \`break\` ngay sau 1 pass = $n-1$ comparison = $O(n)$. Không cần chạy $n-1$ pass.
> </details>

> **📝 Tóm tắt mục 2.**
> - Bubble sort: so sánh + swap cặp kề, mỗi pass "nổi" phần tử lớn nhất về cuối.
> - $O(n^2)$ average/worst; với **early-exit** thì best case (đã sorted) là $O(n)$.
> - Chậm nhất trong ba thuật toán bài này về số swap thực tế. Thường chỉ dùng để dạy.

---

## 3. Selection sort

### 3.1 Ý tưởng

> **💡 Trực giác.** Bạn xếp một hàng người theo chiều cao: nhìn cả hàng, **chọn người thấp nhất**, kéo ra đứng đầu. Rồi nhìn những người còn lại, chọn người thấp nhất tiếp theo, đặt vào vị trí thứ hai. Cứ thế. Đó là **selection sort** — mỗi vòng **chọn (select) phần tử nhỏ nhất** trong phần chưa sắp và đưa về đầu phần đó.

Cụ thể: vị trí $i$ chạy từ $0$ đến $n-2$. Ở mỗi $i$, ta **quét** đoạn \`a[i..n-1]\` tìm chỉ số \`minIdx\` của phần tử nhỏ nhất, rồi **swap** \`a[i]\` với \`a[minIdx]\`. Sau bước $i$, vị trí $i$ đã đúng vĩnh viễn.

### 3.2 Walk-through: \`[5, 2, 4, 1, 3]\`

Vùng \`[i..n-1]\` là phần chưa sắp. Tìm min của nó rồi swap về vị trí $i$.

| \`i\` | Mảng trước | Đoạn quét \`a[i..]\` | min (giá trị @ idx) | Swap | Mảng sau |
|-----|-----------|--------------------|--------------------|------|---------|
| 0 | \`[5, 2, 4, 1, 3]\` | \`5,2,4,1,3\` | \`1\` @ idx 3 | \`a[0]↔a[3]\` | \`[1, 2, 4, 5, 3]\` |
| 1 | \`[1, 2, 4, 5, 3]\` | \`2,4,5,3\` | \`2\` @ idx 1 | (đã đúng, swap chính nó) | \`[1, 2, 4, 5, 3]\` |
| 2 | \`[1, 2, 4, 5, 3]\` | \`4,5,3\` | \`3\` @ idx 4 | \`a[2]↔a[4]\` | \`[1, 2, 3, 5, 4]\` |
| 3 | \`[1, 2, 3, 5, 4]\` | \`5,4\` | \`4\` @ idx 4 | \`a[3]↔a[4]\` | \`[1, 2, 3, 4, 5]\` |

Sau \`i=3\`: \`[1, 2, 3, 4, 5]\` — sorted!

**Đếm comparison** (tìm min của đoạn dài $k$ cần $k-1$ so sánh):
- \`i=0\`: đoạn dài 5 → \`4\` comparison.
- \`i=1\`: đoạn dài 4 → \`3\` comparison.
- \`i=2\`: đoạn dài 3 → \`2\` comparison.
- \`i=3\`: đoạn dài 2 → \`1\` comparison.

Tổng comparison = $4+3+2+1 = 10$ = $\\dfrac{n(n-1)}{2}$. **Luôn luôn** $10$ cho $n=5$, bất kể mảng đầu vào — selection sort không bao giờ "ăn may".

**Đếm swap:** mỗi \`i\` có đúng **1 swap** (kể cả swap với chính nó, nếu code không kiểm tra \`i != minIdx\`). Tối đa $n-1 = 4$ swap. Nếu code bỏ swap khi \`minIdx == i\` thì ở đây có 3 swap thật (bước \`i=1\` không cần swap).

### 3.3 Code Go

\`\`\`go
// selectionSort: mỗi vòng chọn phần tử nhỏ nhất trong phần chưa sắp,
// đưa về đầu phần đó. Số swap rất ít (tối đa n-1).
func selectionSort(a []int) (comparisons, swaps int) {
    n := len(a)
    for i := 0; i < n-1; i++ {
        minIdx := i
        for j := i + 1; j < n; j++ {
            comparisons++
            if a[j] < a[minIdx] {
                minIdx = j
            }
        }
        if minIdx != i { // chỉ swap khi cần — tiết kiệm 1 phép gán thừa
            a[i], a[minIdx] = a[minIdx], a[i]
            swaps++
        }
    }
    return
}
\`\`\`

### 3.4 Vì sao **luôn** \`O(n²)\` (kể cả mảng đã sorted)?

> **❓ Câu hỏi tự nhiên.** *"Nếu mảng đã sorted thì selection sort có nhanh hơn không?"* — **KHÔNG.** Để chọn được min của một đoạn, ta **bắt buộc** phải so sánh với mọi phần tử trong đoạn — không có cách nào "đoán trước" min mà không nhìn hết. Vì vậy số comparison luôn là $\\dfrac{n(n-1)}{2}$ dù mảng đầu vào thế nào.

Ví dụ: mảng \`[1, 2, 3, 4, 5]\` (đã sorted). Selection sort **vẫn** chạy \`10\` comparison (chỉ là 0 swap thật vì min luôn ở đầu). So với bubble sort early-exit chỉ \`4\` comparison — đây là nhược điểm rõ ràng của selection sort.

### 3.5 Ưu điểm: ít swap nhất

Bù lại, selection sort có **số lần swap tối thiểu**: tối đa $n-1$ swap. Điều này quan trọng khi **swap đắt** — ví dụ phần tử là struct lớn, hoặc ghi vào bộ nhớ flash (mỗi lần ghi tốn tuổi thọ). Bubble sort có thể swap tới $\\dfrac{n(n-1)}{2}$ lần (worst case $O(n^2)$ swap), selection sort luôn $\\leq n-1$ = $O(n)$ swap.

| Mảng \`[5,4,3,2,1]\` (sorted ngược, n=5) | Comparison | Swap |
|----------------------------------------|-----------|------|
| Bubble (early-exit) | 10 | **10** |
| Selection | 10 | **2** |

(Selection: \`i=0\` swap \`5↔1\`, \`i=1\` swap \`4↔2\`, \`i=2\` \`3\` đã đúng, \`i=3\` \`4\` đã đúng → 2 swap.)

> **📝 Tóm tắt mục 3.**
> - Selection sort: mỗi vòng chọn min của phần chưa sắp, swap về đầu.
> - Comparison **luôn** $\\dfrac{n(n-1)}{2}$ = $O(n^2)$ — không có best case nhanh.
> - Ưu điểm độc nhất: số swap tối thiểu ($\\leq n-1$) — dùng khi swap đắt.
> - **Không ổn định** (sẽ chứng minh ở mục 6).

---

## 4. Insertion sort

### 4.1 Ý tưởng

> **💡 Trực giác.** Đây chính là cách bạn xếp **bài trên tay** trong đời thật: bạn giữ một phần bài đã sắp xếp bên trái, rút quân tiếp theo, **chèn nó vào đúng chỗ** trong phần đã sắp bằng cách dịch các quân lớn hơn sang phải. Cứ thế cho tới quân cuối.

Cụ thể: coi \`a[0]\` là phần đã sắp (1 phần tử thì luôn sorted). Với mỗi \`i\` từ \`1\` đến \`n-1\`, lấy \`key = a[i]\`, **dịch** mọi phần tử trong \`a[0..i-1]\` lớn hơn \`key\` sang phải một ô, rồi đặt \`key\` vào chỗ trống.

### 4.2 Walk-through: \`[5, 2, 4, 1, 3]\`

Phần \`[..]\` in đậm là vùng đã sắp. \`key\` là phần tử đang chèn.

| \`i\` | key | Mảng trước | Dịch phải ai? | Mảng sau |
|-----|-----|-----------|---------------|---------|
| 1 | \`2\` | \`[**5**, 2, 4, 1, 3]\` | \`5\` dịch phải | \`[**2, 5**, 4, 1, 3]\` |
| 2 | \`4\` | \`[**2, 5**, 4, 1, 3]\` | \`5\` dịch phải (2 thì dừng) | \`[**2, 4, 5**, 1, 3]\` |
| 3 | \`1\` | \`[**2, 4, 5**, 1, 3]\` | \`5,4,2\` đều dịch phải | \`[**1, 2, 4, 5**, 3]\` |
| 4 | \`3\` | \`[**1, 2, 4, 5**, 3]\` | \`5,4\` dịch phải (2 thì dừng) | \`[**1, 2, 3, 4, 5**]\` |

Chi tiết bước \`i=3, key=1\`: so sánh \`1<5\`(dịch), \`1<4\`(dịch), \`1<2\`(dịch), tới đầu mảng → đặt \`1\` vào idx 0. **3 comparison, 3 dịch.**

Chi tiết bước \`i=4, key=3\`: so sánh \`3<5\`(dịch), \`3<4\`(dịch), \`3<2\`? **không** → dừng, đặt \`3\` vào idx 2. **3 comparison, 2 dịch.**

**Đếm comparison** (mỗi bước so sánh tới khi gặp phần tử \`≤ key\` hoặc hết mảng):
- \`i=1\`: 1 comparison.
- \`i=2\`: 1 comparison (\`4<5\` dịch, rồi \`4>2\` dừng — thực ra 2 so sánh; xem chú thích).
- \`i=3\`: 3 comparison.
- \`i=4\`: 3 comparison.

> **Chú thích đếm:** số comparison phụ thuộc cách cài. Trong code dưới, vòng \`while a[j] > key\` so sánh mỗi lần xét một phần tử. Worst case (sorted ngược) tổng = $\\dfrac{n(n-1)}{2}$.

### 4.3 Code Go

\`\`\`go
// insertionSort: chèn từng phần tử a[i] vào đúng chỗ trong a[0..i-1] đã sắp.
// Best case O(n) khi mảng đã (gần) sorted vì vòng while dừng ngay.
func insertionSort(a []int) (comparisons, shifts int) {
    n := len(a)
    for i := 1; i < n; i++ {
        key := a[i]
        j := i - 1
        // Dịch các phần tử > key sang phải. Dùng > (không >=) để GIỮ ỔN ĐỊNH:
        // phần tử bằng key sẽ KHÔNG bị dịch → key chèn SAU chúng, giữ thứ tự gốc.
        for j >= 0 {
            comparisons++
            if a[j] > key {
                a[j+1] = a[j] // dịch phải
                shifts++
                j--
            } else {
                break // gặp phần tử <= key → dừng, đây là chỗ chèn
            }
        }
        a[j+1] = key
    }
    return
}
\`\`\`

### 4.4 Vì sao best case \`O(n)\`?

> **💡 Trực giác.** Nếu mảng **đã sorted**, mỗi \`key = a[i]\` đã lớn hơn (hoặc bằng) \`a[i-1]\` ngay lập tức → vòng \`while\` so sánh đúng **1 lần** rồi \`break\`, không dịch gì. Tổng $n-1$ comparison = $O(n)$.

Ví dụ \`[1, 2, 3, 4, 5]\`: mỗi \`i\` chỉ so 1 lần (\`a[i-1] ≤ key\`), 0 dịch. Tổng **4 comparison, 0 dịch, O(n)**.

Đây là lý do insertion sort **xuất sắc trên dữ liệu gần-sorted** — và là lý do các thư viện thực tế dùng nó (xem mục 8).

### 4.5 Độ phức tạp

| Trường hợp | Mô tả | Comparison | Shift | Time |
|-----------|-------|-----------|-------|------|
| **Best** (đã sorted) | mỗi key so 1 lần | $n-1$ | $0$ | $O(n)$ |
| **Average** | ngẫu nhiên | $\\sim n^2/4$ | $\\sim n^2/4$ | $O(n^2)$ |
| **Worst** (sorted ngược) | mỗi key dịch hết về đầu | $\\dfrac{n(n-1)}{2}$ | $\\dfrac{n(n-1)}{2}$ | $O(n^2)$ |

Worst case \`[5,4,3,2,1]\` với $n=5$: mỗi key phải dịch qua toàn bộ phần đã sắp → comparison + shift đều = $10$.

> **🔁 Dừng lại tự kiểm tra.**
> 1. Vì sao insertion sort dùng \`>\` chứ không \`>=\` trong điều kiện dịch?
> 2. Mảng nào là best case của insertion sort? Worst case?
>
> <details><summary>Đáp án</summary>
>
> 1. Dùng \`>\` để **giữ tính ổn định**: phần tử **bằng** key không bị dịch, nên key được chèn **ngay sau** phần tử bằng nó → giữ nguyên thứ tự tương đối của các phần tử bằng nhau. Nếu dùng \`>=\` thì sẽ dịch luôn cả phần tử bằng → đảo thứ tự → mất ổn định.
> 2. Best: mảng **đã sorted** ($O(n)$). Worst: mảng **sorted ngược** ($O(n^2)$, mỗi key dịch hết).
> </details>

> **📝 Tóm tắt mục 4.**
> - Insertion sort: chèn từng phần tử vào phần đã sắp bên trái bằng cách dịch.
> - Best $O(n)$ (đã/gần sorted), average & worst $O(n^2)$.
> - **Ổn định**, in-place, và là thuật toán cơ bản tốt nhất trong thực tế cho \`n\` nhỏ.

---

## 5. So sánh ba thuật toán

| Tiêu chí | Bubble (early-exit) | Selection | Insertion |
|----------|---------------------|-----------|-----------|
| **Time — best** | $O(n)$ (đã sorted) | $O(n^2)$ (luôn) | $O(n)$ (đã sorted) |
| **Time — average** | $O(n^2)$ | $O(n^2)$ | $O(n^2)$ |
| **Time — worst** | $O(n^2)$ | $O(n^2)$ | $O(n^2)$ |
| **Space (extra)** | $O(1)$ in-place | $O(1)$ in-place | $O(1)$ in-place |
| **Ổn định (stable)?** | ✅ Có | ❌ Không | ✅ Có |
| **Số swap (worst)** | $O(n^2)$ | $O(n)$ ($\\leq n-1$) | $O(n^2)$ shift |
| **Thích nghi gần-sorted?** | ✅ (early-exit) | ❌ | ✅ (rất tốt) |
| **Dùng thực tế** | hiếm (dạy học) | khi swap đắt | n nhỏ, gần-sorted, hybrid |

**Số liệu cụ thể trên cùng mảng \`[5, 2, 4, 1, 3]\`** (n=5):

| Thuật toán | Comparison | Swap/Shift |
|-----------|-----------|------------|
| Bubble (early-exit) | 10 | 7 swap |
| Selection | 10 | 3 swap |
| Insertion | 9 | 7 shift |

> **❓ Câu hỏi tự nhiên.** *"Cả ba đều $O(n^2)$, vậy chọn cái nào?"* — Trong thực tế **insertion sort thường tốt nhất** trong ba: hằng số nhỏ, thích nghi với dữ liệu gần-sorted ($O(n)$), ổn định, và ít di chuyển dữ liệu hơn bubble. Selection chỉ thắng khi **swap rất đắt**. Bubble gần như không có lý do dùng ngoài việc dạy học.

> **📝 Tóm tắt mục 5.** Cả ba $O(n^2)$ average. Khác nhau ở: best case (bubble/insertion $O(n)$, selection $O(n^2)$), ổn định (selection không), số swap (selection ít nhất). Insertion thắng tổng thể trong thực tế.

---

## 6. Stability (Tính ổn định)

### 6.1 Định nghĩa

> **💡 Trực giác.** Bạn có danh sách nhân viên đã **sắp theo tên**. Giờ bạn sort lại **theo phòng ban**. Một thuật toán *ổn định* sẽ giữ cho những người **cùng phòng ban** vẫn nằm theo thứ tự tên (như cũ). Thuật toán *không ổn định* có thể xáo trộn thứ tự tên trong cùng phòng ban.

**Định nghĩa.** Một thuật toán sắp xếp là **ổn định (stable)** nếu: với hai phần tử **có khóa bằng nhau**, thứ tự **tương đối** của chúng trong đầu ra **giống** đầu vào.

Ký hiệu hóa: nếu \`a[i]\` và \`a[j]\` có khóa bằng nhau và \`i < j\` (trong input), thì sau khi sort, \`a[i]\` vẫn đứng **trước** \`a[j]\`.

### 6.2 Vì sao quan trọng? Sort theo nhiều khóa

> **💡 Trực giác.** Stability cho phép **sort tuần tự theo nhiều tiêu chí**: muốn sắp "theo phòng ban, trong cùng phòng thì theo tên" → **sort theo tên trước, rồi sort ổn định theo phòng ban**. Lần sort thứ hai (ổn định) không phá thứ tự tên đã có trong cùng phòng ban.

Ví dụ cụ thể. Dữ liệu \`(tên, điểm)\`:

\`\`\`
(An, 8), (Bình, 7), (Cường, 8), (Dũng, 7)
\`\`\`

Đã sắp theo tên (A→D). Giờ sort **theo điểm tăng dần** bằng thuật toán **ổn định**:

\`\`\`
(Bình, 7), (Dũng, 7), (An, 8), (Cường, 8)
\`\`\`

Trong nhóm điểm \`7\`: \`Bình\` trước \`Dũng\` (giữ thứ tự tên gốc). Trong nhóm điểm \`8\`: \`An\` trước \`Cường\`. Nếu dùng thuật toán **không ổn định**, có thể ra \`(Dũng, 7), (Bình, 7), ...\` — thứ tự tên bị phá.

### 6.3 Phản ví dụ: selection sort KHÔNG ổn định

Xét mảng các cặp \`(khóa, nhãn)\` — sort theo **khóa**:

\`\`\`
[ (5, a), (5, b), (3, c) ]
\`\`\`

Hai phần tử khóa \`5\`: \`(5,a)\` đứng trước \`(5,b)\`. Chạy selection sort (theo khóa):

- \`i=0\`: tìm min của cả mảng. Min khóa là \`3\` @ idx 2 → swap \`a[0] ↔ a[2]\`:

\`\`\`
[ (3, c), (5, b), (5, a) ]
\`\`\`

- \`i=1\`: min của \`[(5,b),(5,a)]\` là \`5\` @ idx 1 (lần đầu gặp) → không swap.

Kết quả: \`[ (3,c), (5,b), (5,a) ]\`. Nhưng \`(5,a)\` ban đầu đứng **trước** \`(5,b)\`, giờ lại đứng **sau**! → **Thứ tự bị đảo → selection sort KHÔNG ổn định.**

Nguyên nhân: cú swap \`a[0] ↔ a[2]\` ở bước đầu đã "ném" \`(5,a)\` xuống cuối mảng, vượt qua \`(5,b)\`, mà selection sort không có cơ chế khôi phục.

### 6.4 Bubble và insertion ỔN ĐỊNH

- **Bubble** chỉ swap **cặp kề** khi \`a[j] > a[j+1]\` (dùng \`>\`, không \`>=\`) → hai phần tử **bằng nhau** không bao giờ swap → giữ thứ tự tương đối. ✅
- **Insertion** dùng \`>\` trong điều kiện dịch → phần tử bằng key không bị dịch → key chèn ngay sau phần tử bằng nó → giữ thứ tự. ✅

> **⚠ Lỗi thường gặp.** Đổi \`>\` thành \`>=\` trong bubble/insertion **vẫn cho kết quả sorted đúng** nhưng **phá tính ổn định** — và đây là bug rất khó phát hiện vì test "đã sorted chưa" vẫn pass.

> **📝 Tóm tắt mục 6.** Stable = giữ thứ tự phần tử bằng khóa. Cần cho sort đa khóa. **Bubble & insertion ổn định**, **selection KHÔNG** (do swap "nhảy xa"). Giữ ổn định bằng cách dùng \`>\` chứ không \`>=\`.

---

## 7. In-place (Sắp xếp tại chỗ)

> **💡 Trực giác.** "In-place" nghĩa là thuật toán sắp xếp **ngay trên mảng gốc**, chỉ dùng thêm một lượng bộ nhớ **hằng số** (vài biến \`i, j, key, minIdx\`) — không cấp phát mảng phụ kích thước phụ thuộc \`n\`.

**Định nghĩa.** Thuật toán **in-place** nếu dùng $O(1)$ bộ nhớ phụ (ngoài mảng input).

Cả ba thuật toán bài này đều **in-place**, $O(1)$ space:
- Bubble: chỉ cần \`i, j, swapped\` → 3 biến.
- Selection: chỉ cần \`i, j, minIdx\` → 3 biến.
- Insertion: chỉ cần \`i, j, key\` → 3 biến.

Đối lập: **merge sort** (Lesson 07) cần mảng phụ $O(n)$ → **không** in-place. Đây là một trade-off: merge sort nhanh hơn ($O(n \\log n)$) nhưng tốn bộ nhớ.

> **❓ Câu hỏi tự nhiên.** *"In-place có luôn tốt hơn không?"* — Không hẳn. In-place tiết kiệm bộ nhớ nhưng đôi khi phải hi sinh tốc độ hoặc tính ổn định. Quicksort in-place nhưng không ổn định; merge sort ổn định nhưng tốn $O(n)$ bộ nhớ.

> **📝 Tóm tắt mục 7.** Cả ba sort cơ bản đều in-place ($O(1)$ space). In-place = sửa trực tiếp mảng gốc, không cấp phát phụ thuộc $n$.

---

## 8. Khi nào vẫn dùng sort cơ bản?

Cả ba đều $O(n^2)$ — nghe có vẻ "vô dụng" so với $O(n \\log n)$. Nhưng chúng vẫn được dùng **rất nhiều** trong thực tế ở các tình huống sau:

### 8.1 \`n\` nhỏ — hằng số nhỏ thắng

> **💡 Trực giác.** $O(n^2)$ chỉ "thua" $O(n \\log n)$ khi $n$ đủ lớn. Với $n$ nhỏ, **hằng số ẩn** trong Big-O mới quyết định. Insertion sort có hằng số rất nhỏ (vòng lặp đơn giản, không đệ quy, không cấp phát) → với $n < {\\sim}10\\text{–}20$ nó thực sự **nhanh hơn** quicksort/merge sort.

So sánh số phép tính thô (ước lượng):
- Insertion sort $n=10$: $\\sim n^2/4 = 25$ phép so sánh, **không** chi phí đệ quy/cấp phát.
- Quicksort $n=10$: $\\sim n \\log n = 33$ phép so sánh **cộng** chi phí gọi đệ quy + quản lý stack → thực tế chậm hơn.

### 8.2 Hybrid sort — insertion ở đáy đệ quy

Đây là ứng dụng thực tế **quan trọng nhất**: các thuật toán sort công nghiệp (**introsort** trong C++, **timsort** trong Python/Java, và cả \`sort\` package của Go) **không** đệ quy quicksort/merge sort xuống tận \`n=1\`. Khi đoạn con nhỏ (vd \`< 12\` phần tử), chúng **chuyển sang insertion sort** vì nó nhanh hơn ở quy mô nhỏ.

> Sẽ học kỹ ở [Lesson 11 — Sorting thực tế](../lesson-11-sorting-in-practice/) (timsort, introsort, \`sort\` package Go).

### 8.3 Dữ liệu gần-sorted

Insertion sort chạy $O(n)$ trên mảng gần-sorted (chỉ vài phần tử lệch chỗ). Ví dụ: một stream dữ liệu gần như đã theo thứ tự thời gian, thỉnh thoảng có gói tin đến trễ → insertion sort xử lý cực hiệu quả. Đây là điểm mạnh **không** thuật toán $O(n \\log n)$ thông thường nào có (chúng vẫn $O(n \\log n)$ dù input đã sorted).

### 8.4 Đơn giản, dễ viết đúng

Sort cơ bản chỉ vài dòng, không đệ quy, dễ kiểm chứng đúng. Khi cần code nhanh không bug (vd trong code nhúng, hoặc thi đấu mà \`n\` nhỏ), insertion sort là lựa chọn an toàn.

> **📝 Tóm tắt mục 8.** Sort cơ bản (đặc biệt insertion) vẫn dùng vì: \`n\` nhỏ (hằng số nhỏ thắng), làm "đáy" cho hybrid sort, cực nhanh trên dữ liệu gần-sorted, và đơn giản dễ đúng.

---

## 9. Số liệu cụ thể — đếm comparison & swap

Để cảm nhận trực quan, đếm chính xác trên hai mảng đặc trưng, \`n=5\`.

### 9.1 Mảng ngẫu nhiên \`[5, 2, 4, 1, 3]\`

| Thuật toán | Comparison | Swap / Shift |
|-----------|-----------|--------------|
| Bubble (early-exit) | 10 | 7 swap |
| Selection | 10 | 3 swap |
| Insertion | 9 | 7 shift |

### 9.2 Mảng đã sorted \`[1, 2, 3, 4, 5]\`

| Thuật toán | Comparison | Swap / Shift |
|-----------|-----------|--------------|
| Bubble (early-exit) | **4** | 0 |
| Selection | **10** | 0 |
| Insertion | **4** | 0 |

→ Thấy rõ: trên dữ liệu đã sorted, **bubble (early-exit) và insertion chỉ tốn $O(n)$**, còn **selection vẫn $O(n^2)$ comparison** vì luôn phải quét tìm min.

### 9.3 Mảng sorted ngược \`[5, 4, 3, 2, 1]\` (worst case)

| Thuật toán | Comparison | Swap / Shift |
|-----------|-----------|--------------|
| Bubble (early-exit) | 10 | 10 swap |
| Selection | 10 | 2 swap |
| Insertion | 10 | 10 shift |

→ Selection ăn điểm ở **số swap tối thiểu** (2) dù comparison như nhau.

### 9.4 Driver Go demo đầy đủ (đếm + kiểm tra stability)

\`\`\`go
package main

import "fmt"

func bubbleSortEarlyExit(a []int) (comparisons, swaps int) {
    n := len(a)
    for i := 0; i < n-1; i++ {
        swapped := false
        for j := 0; j < n-1-i; j++ {
            comparisons++
            if a[j] > a[j+1] {
                a[j], a[j+1] = a[j+1], a[j]
                swaps++
                swapped = true
            }
        }
        if !swapped {
            break
        }
    }
    return
}

func selectionSort(a []int) (comparisons, swaps int) {
    n := len(a)
    for i := 0; i < n-1; i++ {
        minIdx := i
        for j := i + 1; j < n; j++ {
            comparisons++
            if a[j] < a[minIdx] {
                minIdx = j
            }
        }
        if minIdx != i {
            a[i], a[minIdx] = a[minIdx], a[i]
            swaps++
        }
    }
    return
}

func insertionSort(a []int) (comparisons, shifts int) {
    n := len(a)
    for i := 1; i < n; i++ {
        key := a[i]
        j := i - 1
        for j >= 0 {
            comparisons++
            if a[j] > key {
                a[j+1] = a[j]
                shifts++
                j--
            } else {
                break
            }
        }
        a[j+1] = key
    }
    return
}

// pair minh họa stability: sort theo Key, theo dõi Tag.
type pair struct {
    Key int
    Tag string
}

// selectionSortPairs: sort các pair theo Key (để demo KHÔNG ổn định).
func selectionSortPairs(a []pair) {
    n := len(a)
    for i := 0; i < n-1; i++ {
        minIdx := i
        for j := i + 1; j < n; j++ {
            if a[j].Key < a[minIdx].Key {
                minIdx = j
            }
        }
        a[i], a[minIdx] = a[minIdx], a[i]
    }
}

func main() {
    base := []int{5, 2, 4, 1, 3}

    a1 := append([]int(nil), base...)
    c, s := bubbleSortEarlyExit(a1)
    fmt.Printf("Bubble    %v  cmp=%d swap=%d\\n", a1, c, s)

    a2 := append([]int(nil), base...)
    c, s = selectionSort(a2)
    fmt.Printf("Selection %v  cmp=%d swap=%d\\n", a2, c, s)

    a3 := append([]int(nil), base...)
    c, s = insertionSort(a3)
    fmt.Printf("Insertion %v  cmp=%d shift=%d\\n", a3, c, s)

    // Demo selection KHÔNG ổn định:
    pairs := []pair{{5, "a"}, {5, "b"}, {3, "c"}}
    selectionSortPairs(pairs)
    fmt.Printf("Selection (pairs) %v  <- (5,a) bị đẩy sau (5,b) => KHÔNG ổn định\\n", pairs)
}

/* Kết quả:
Bubble    [1 2 3 4 5]  cmp=10 swap=7
Selection [1 2 3 4 5]  cmp=10 swap=3
Insertion [1 2 3 4 5]  cmp=9 shift=7
Selection (pairs) [{3 c} {5 b} {5 a}]  <- (5,a) bị đẩy sau (5,b) => KHÔNG ổn định
*/
\`\`\`

> **📝 Tóm tắt mục 9.** Cùng $O(n^2)$ nhưng số phép thực tế khác rõ theo loại đầu vào. Trên đã-sorted: bubble/insertion = $O(n)$, selection = $O(n^2)$. Trên sorted-ngược: selection ăn điểm ở số swap.

---

## 10. Cạm bẫy thường gặp

> **⚠ Cạm bẫy 1 — Quên early-exit của bubble sort.** Không có cờ \`swapped\`, bubble sort luôn $O(n^2)$ kể cả khi mảng đã sorted → mất hết ưu điểm $O(n)$. Đây là lỗi #1.

> **⚠ Cạm bẫy 2 — Tưởng selection sort ổn định.** Selection sort **KHÔNG ổn định** (mục 6.3). Nếu code của bạn cần sort đa khóa mà dùng selection sort, kết quả thứ tự phụ sẽ sai một cách âm thầm.

> **⚠ Cạm bẫy 3 — Tưởng bubble nhanh ngang insertion.** Cùng $O(n^2)$ nhưng bubble thực tế **chậm hơn** vì số swap nhiều hơn hẳn (mỗi cặp sai chỗ swap ngay tại chỗ; insertion chỉ "dịch" và đặt key một lần). Trong ba thuật toán, bubble gần như luôn là cái chậm nhất thực tế.

> **⚠ Cạm bẫy 4 — Dùng \`>=\` thay \`>\` làm mất ổn định.** Trong bubble/insertion, đổi điều kiện so sánh sang \`>=\` vẫn cho mảng sorted đúng nhưng **phá ổn định** — bug rất khó thấy.

> **⚠ Cạm bẫy 5 — Vòng lặp ngoài/trong sai biên.** Bubble: vòng trong chạy tới \`n-1-i\` (trừ phần đã khóa). Selection: vòng trong bắt đầu từ \`i+1\`. Insertion: vòng ngoài bắt đầu từ \`i=1\`. Sai biên dẫn tới index out of range hoặc sort thiếu phần tử.

> **⚠ Cạm bẫy 6 — Tưởng selection sort tốn nhiều swap.** Ngược lại! Selection sort có số swap **ít nhất** ($\\leq n-1$). Người ta hay nhầm vì nó "chậm" (comparison luôn $O(n^2)$), nhưng chậm là do comparison chứ không phải swap.

---

## 11. Ứng dụng thực tế trong phần mềm

> 💡 **"Sort $O(n^2)$ thì ai dùng?" — bạn sẽ ngạc nhiên.** Insertion sort chạy thật bên trong *mọi* thư viện sort nhanh, vì nó vô địch ở quy mô nhỏ và dữ liệu gần-sắp-xếp.

| Ứng dụng | Sort sơ cấp nào | Vì sao |
|----------|-----------------|--------|
| **Mảng nhỏ trong Timsort/introsort/pdqsort** | **Insertion sort** | Hằng số nhỏ, cache-friendly → nhanh hơn quicksort khi $n < \\sim 16$ |
| **Dữ liệu gần như đã sắp** | **Insertion sort** | $O(n)$ khi gần sorted (vd thêm vài phần tử vào danh sách đã sắp) |
| **Sắp online (phần tử đến dần)** | **Insertion sort** | Chèn từng phần tử vào đúng chỗ ngay khi nhận |
| **Khi cần ít ghi nhất (bộ nhớ flash/EEPROM)** | **Selection sort** | Số swap tối thiểu $\\le n-1$ (ghi đắt) |

### 11.1. Ví dụ cụ thể — vì sao stdlib chuyển sang insertion sort

\`slices.Sort\` của Go (pdqsort), Java (Timsort/dual-pivot), C++ (introsort) đều **chuyển sang insertion sort** khi đoạn cần sắp nhỏ hơn ngưỡng (~12–16 phần tử). Lý do: quicksort/mergesort có overhead đệ quy + phân hoạch; với mảng tí xíu, insertion sort với hằng số nhỏ và truy cập tuần tự (cache-friendly) **thắng**. Đây là tối ưu thật trong mọi sort thư viện.

> ❓ **"Vậy có bao giờ tự viết bubble sort trong production?"** Gần như không — nó thua insertion sort ở mọi mặt (cùng $O(n^2)$ nhưng nhiều swap hơn). Bubble sort chủ yếu để **dạy** khái niệm. Khi cần sort thật → dùng \`sort\`/\`slices.Sort\` của thư viện ([Lesson 11](../lesson-11-sorting-in-practice/)).

### 11.2. 📝 Tóm tắt mục 11

- **Insertion sort** chạy thật bên trong Timsort/introsort/pdqsort cho mảng nhỏ (~<16) và dữ liệu gần-sắp-xếp → $O(n)$ best case.
- **Selection sort** khi ghi đắt (ít swap nhất).
- **Bubble sort**: chỉ để dạy; production luôn dùng sort thư viện.

## Bài tập

> Giải chi tiết ở mục [Lời giải chi tiết](#lời-giải-chi-tiết) bên dưới.

**Bài 1.** Trace **bubble sort (có early-exit)** trên mảng \`[4, 3, 1, 2]\`. Liệt kê mảng sau mỗi pass, đếm tổng số comparison và swap.

**Bài 2.** Trace **selection sort** trên mảng \`[3, 1, 4, 1, 5]\`. Liệt kê mảng sau mỗi \`i\`, đếm comparison và swap.

**Bài 3.** Trace **insertion sort** trên mảng \`[2, 4, 1, 3]\`. Liệt kê mảng sau mỗi \`i\`, đếm comparison và shift.

**Bài 4.** Chứng minh selection sort **KHÔNG ổn định** bằng một phản ví dụ cụ thể (dùng các cặp \`(khóa, nhãn)\`).

**Bài 5.** Với bubble sort có early-exit, đầu vào nào cho **best case** $O(n)$? Đầu vào nào cho **worst case** $O(n^2)$? Giải thích.

**Bài 6.** Insertion sort thường được mô tả cho **mảng**. Hãy giải thích insertion sort hoạt động thế nào trên **linked list (danh sách liên kết)**, và ưu điểm gì so với trên mảng.

**Bài 7.** Định nghĩa **inversion** (nghịch thế) của một mảng. Đếm số inversion của \`[3, 1, 4, 1, 5, 2]\`. Giải thích mối liên hệ giữa số inversion và số shift của insertion sort.

**Bài 8.** Cho dữ liệu \`(tên, lớp)\`: \`(An,B), (Bình,A), (Cường,B), (Dũng,A)\` (đã sắp theo tên). Cần kết quả "sắp theo lớp, trong cùng lớp giữ thứ tự tên". Mô tả cách dùng một thuật toán sort cơ bản để đạt điều này, và giải thích vì sao **phải** dùng thuật toán ổn định.

---

## Lời giải chi tiết

### Lời giải Bài 1 — Bubble sort \`[4, 3, 1, 2]\`

**Pass 1** (cặp \`(0,1),(1,2),(2,3)\`):
- \`(0,1)\`: \`4>3\` swap → \`[3,4,1,2]\`
- \`(1,2)\`: \`4>1\` swap → \`[3,1,4,2]\`
- \`(2,3)\`: \`4>2\` swap → \`[3,1,2,**4**]\`
- Pass 1: **3 comparison, 3 swap**. \`swapped=true\`.

**Pass 2** (cặp \`(0,1),(1,2)\`):
- \`(0,1)\`: \`3>1\` swap → \`[1,3,2,**4**]\`
- \`(1,2)\`: \`3>2\` swap → \`[1,2,**3,4**]\`
- Pass 2: **2 comparison, 2 swap**. \`swapped=true\`.

**Pass 3** (cặp \`(0,1)\`):
- \`(0,1)\`: \`1<2\` không swap
- Pass 3: **1 comparison, 0 swap**. \`swapped=false\` → **early-exit, dừng**.

**Tổng: comparison = \`3+2+1 = 6\`, swap = \`3+2+0 = 5\`.** Mảng sorted: \`[1,2,3,4]\`.

### Lời giải Bài 2 — Selection sort \`[3, 1, 4, 1, 5]\`

| \`i\` | Mảng trước | Đoạn quét | min @ idx | Swap | Mảng sau |
|-----|-----------|-----------|-----------|------|---------|
| 0 | \`[3,1,4,1,5]\` | \`3,1,4,1,5\` | \`1\` @ idx 1 | \`a[0]↔a[1]\` | \`[1,3,4,1,5]\` |
| 1 | \`[1,3,4,1,5]\` | \`3,4,1,5\` | \`1\` @ idx 3 | \`a[1]↔a[3]\` | \`[1,1,4,3,5]\` |
| 2 | \`[1,1,4,3,5]\` | \`4,3,5\` | \`3\` @ idx 3 | \`a[2]↔a[3]\` | \`[1,1,3,4,5]\` |
| 3 | \`[1,1,3,4,5]\` | \`4,5\` | \`4\` @ idx 3 | (đã đúng) | \`[1,1,3,4,5]\` |

**Comparison:** \`i=0\`: 4; \`i=1\`: 3; \`i=2\`: 2; \`i=3\`: 1 → tổng \`10\`.
**Swap (thật, bỏ qua khi \`minIdx==i\`):** \`i=0,1,2\` có swap; \`i=3\` không → **3 swap**.

Mảng sorted: \`[1,1,3,4,5]\`.

> Lưu ý: ở \`i=0\` phần tử min đầu tiên gặp là \`1\` @ idx 1 (không phải \`1\` @ idx 3, vì code lấy lần đầu gặp với \`<\`). Đây cũng là mầm mống của tính **không ổn định**.

### Lời giải Bài 3 — Insertion sort \`[2, 4, 1, 3]\`

| \`i\` | key | Mảng trước | Diễn biến | Mảng sau | cmp | shift |
|-----|-----|-----------|-----------|---------|-----|-------|
| 1 | 4 | \`[**2**,4,1,3]\` | \`4>2\`? không → đặt tại idx 1 | \`[**2,4**,1,3]\` | 1 | 0 |
| 2 | 1 | \`[**2,4**,1,3]\` | \`1<4\` dịch, \`1<2\` dịch, hết → idx 0 | \`[**1,2,4**,3]\` | 2 | 2 |
| 3 | 3 | \`[**1,2,4**,3]\` | \`3<4\` dịch, \`3<2\`? không → idx 2 | \`[**1,2,3,4**]\` | 2 | 1 |

**Tổng: comparison = \`1+2+2 = 5\`, shift = \`0+2+1 = 3\`.** Mảng sorted: \`[1,2,3,4]\`.

### Lời giải Bài 4 — Selection sort không ổn định

**Phản ví dụ.** Lấy ba cặp, sort theo khóa (số):

\`\`\`
Input:  [ (2, x), (2, y), (1, z) ]
\`\`\`

Cặp \`(2,x)\` đứng trước \`(2,y)\` (cùng khóa \`2\`).

Chạy selection sort theo khóa:
- \`i=0\`: quét cả mảng tìm min khóa. Min là \`1\` @ idx 2 → swap \`a[0] ↔ a[2]\`:
  \`\`\`
  [ (1, z), (2, y), (2, x) ]
  \`\`\`
- \`i=1\`: min của \`[(2,y),(2,x)]\` là \`2\` @ idx 1 (lần đầu) → không swap.

**Kết quả:** \`[ (1,z), (2,y), (2,x) ]\`.

Ban đầu \`(2,x)\` **trước** \`(2,y)\`; sau khi sort \`(2,x)\` lại **sau** \`(2,y)\` → **thứ tự tương đối bị đảo** → selection sort **không ổn định**. ∎

Nguyên nhân gốc: cú swap "nhảy xa" \`a[0] ↔ a[2]\` ở bước đầu đã ném \`(2,x)\` qua khỏi \`(2,y)\`.

### Lời giải Bài 5 — Best/worst case của bubble sort

- **Best case $O(n)$**: mảng **đã sorted tăng dần**, ví dụ \`[1,2,3,4,5]\`. Pass 1 chạy $n-1$ comparison, không swap nào → cờ \`swapped=false\` → early-exit. Tổng $O(n)$.
- **Worst case $O(n^2)$**: mảng **sorted ngược (giảm dần)**, ví dụ \`[5,4,3,2,1]\`. Mọi cặp đều sai thứ tự → mỗi pass đều swap, không bao giờ early-exit; phải chạy đủ $n-1$ pass với tổng $\\dfrac{n(n-1)}{2}$ comparison và swap → $O(n^2)$.

Giải thích: early-exit chỉ kích hoạt khi một pass **không có swap nào** (đã sorted). Mảng sorted ngược là trạng thái "xa sorted nhất" nên không bao giờ kích hoạt.

### Lời giải Bài 6 — Insertion sort trên linked list

**Cách hoạt động.** Duy trì một danh sách "đã sắp" (ban đầu rỗng). Duyệt từng node của danh sách gốc, với mỗi node:
1. Đi từ đầu danh sách đã sắp, tìm vị trí đầu tiên mà node tiếp theo có giá trị \`> giá trị node hiện tại\`.
2. **Nối lại con trỏ** (pointer) để chèn node vào đó.

\`\`\`go
type ListNode struct {
    Val  int
    Next *ListNode
}

// insertionSortList: sort linked list bằng insertion. Dùng dummy head cho gọn.
func insertionSortList(head *ListNode) *ListNode {
    dummy := &ListNode{} // đầu giả của danh sách đã sắp
    for cur := head; cur != nil; {
        next := cur.Next // lưu trước vì ta sẽ đổi cur.Next
        // tìm chỗ chèn: p là node ngay trước vị trí chèn
        p := dummy
        for p.Next != nil && p.Next.Val < cur.Val {
            p = p.Next
        }
        // chèn cur vào giữa p và p.Next
        cur.Next = p.Next
        p.Next = cur
        cur = next
    }
    return dummy.Next
}
\`\`\`

**Ưu điểm so với mảng:** trên mảng, chèn phải **dịch (shift)** mọi phần tử lớn hơn sang phải → mỗi lần chèn $O(n)$ dịch. Trên linked list, chèn chỉ là **đổi con trỏ** $O(1)$ — không cần dịch dữ liệu. (Tuy nhiên việc **tìm vị trí** vẫn $O(n)$ vì list không random-access, nên tổng vẫn $O(n^2)$; nhưng ta tiết kiệm chi phí di chuyển dữ liệu, hữu ích khi phần tử là struct lớn.)

### Lời giải Bài 7 — Inversion

**Định nghĩa.** Một **inversion** (nghịch thế) là một cặp chỉ số $(i, j)$ với $i < j$ nhưng \`a[i] > a[j]\` — tức một cặp **sai thứ tự**. Mảng đã sorted tăng dần có **0 inversion**; mảng sorted ngược có số inversion tối đa $\\dfrac{n(n-1)}{2}$.

**Đếm cho \`[3, 1, 4, 1, 5, 2]\`** (xét mọi cặp \`i<j\` với \`a[i]>a[j]\`):
- \`3\`: lớn hơn \`1\`(idx1), \`1\`(idx3), \`2\`(idx5) → **3** inversion.
- \`1\`(idx1): không lớn hơn gì sau nó → 0.
- \`4\`: lớn hơn \`1\`(idx3), \`2\`(idx5) → **2** inversion.
- \`1\`(idx3): không → 0.
- \`5\`: lớn hơn \`2\`(idx5) → **1** inversion.

Tổng: \`3 + 0 + 2 + 0 + 1 = 6\` **inversion**.

**Liên hệ với insertion sort.** Mỗi **shift** của insertion sort tương ứng đúng một inversion bị "gỡ bỏ": khi dịch một phần tử lớn hơn key sang phải, ta đang sửa một cặp sai thứ tự. Vì vậy **tổng số shift của insertion sort = tổng số inversion** của mảng đầu vào. Đây là lý do insertion sort chạy nhanh trên mảng gần-sorted (ít inversion) và là cách phân tích chặt: time của insertion sort = $O(n + \\text{số inversion})$.

Kiểm chứng nhanh: mảng đã sorted → 0 inversion → 0 shift → $O(n)$; khớp best case.

### Lời giải Bài 8 — Sort đa khóa cần stable

**Yêu cầu:** sắp theo **lớp**, trong cùng lớp giữ **thứ tự tên** (input đã sắp theo tên).

**Cách làm:** chỉ cần **một lần sort theo lớp** bằng thuật toán **ổn định** (insertion hoặc bubble), vì input **đã** theo thứ tự tên.

Input (đã theo tên A→D):
\`\`\`
(An, B), (Bình, A), (Cường, B), (Dũng, A)
\`\`\`

Sort ổn định theo **lớp** (A trước B):
\`\`\`
(Bình, A), (Dũng, A), (An, B), (Cường, B)
\`\`\`

Trong lớp A: \`Bình\` trước \`Dũng\` (giữ thứ tự tên gốc). Trong lớp B: \`An\` trước \`Cường\`. ✅

**Vì sao phải dùng ổn định:** nếu dùng thuật toán **không ổn định** (selection sort), khi sort theo lớp, thứ tự tên trong cùng lớp có thể bị đảo (vd ra \`(Dũng,A),(Bình,A),...\`) → mất tiêu chí phụ. Tính ổn định **bảo toàn** thứ tự đã có theo khóa phụ (tên), nên ta không cần sort lại theo tên.

> Tổng quát: để sort theo nhiều khóa với độ ưu tiên giảm dần, ta sort **ổn định** theo khóa **ưu tiên thấp nhất trước**, rồi tăng dần lên khóa ưu tiên cao nhất. Đây là nguyên lý của **radix sort** (Lesson 10).

---

## Code & Minh họa

- **Code Go**: toàn bộ ba thuật toán + demo stability được viết **inline** trong README này (mục 2.3, 3.3, 4.3, 9.4) và lời giải Bài 6. Theo quy ước, lesson này **không** kèm \`solutions.go\` riêng — copy block ở mục 9.4 vào một file \`main.go\` là chạy được ngay (\`go run main.go\`).
- **[visualization.html](./visualization.html)** — 3 module tương tác:
  1. **Sort animator**: chọn bubble/selection/insertion, xem mảng dạng bar chart, animate so sánh (vàng) + swap (đỏ) từng bước, đếm comparison/swap, có nút step/play.
  2. **So sánh 3 thuật toán**: chạy cùng một mảng qua cả ba, vẽ bar chart số phép toán.
  3. **Stability demo**: sort mảng có khóa trùng, hiển thị thứ tự gốc có được giữ hay không.

---

## Bài tiếp theo

- **[Lesson 07 — Merge Sort](../lesson-07-merge-sort/)**: thuật toán sort $O(n \\log n)$ đầu tiên, dùng **divide & conquer** (chia để trị), **ổn định** nhưng **không** in-place ($O(n)$ bộ nhớ phụ). Sẽ thấy vì sao $O(n \\log n)$ đánh bại $O(n^2)$ khi $n$ lớn.
- Xem lại [Tier 0 — đệ quy & Master Theorem](../tier-0-foundations/index.html) trước khi học merge sort.
- Ứng dụng hybrid (insertion ở đáy đệ quy) học kỹ ở [Lesson 11 — Sorting thực tế](../lesson-11-sorting-in-practice/).
`;
