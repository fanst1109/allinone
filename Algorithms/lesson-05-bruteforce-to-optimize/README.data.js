// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: Algorithms/lesson-05-bruteforce-to-optimize/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 05 — Tư duy: Brute-force → Tối ưu hóa

> Tier 0 · Lesson cuối — bản đồ tư duy nối toàn bộ Tier 0 (Big-O, amortized, đệ quy, tính đúng đắn) sang các tier kỹ thuật phía sau.

## Mục tiêu học tập

Sau bài này, bạn sẽ:

- Hiểu **vì sao luôn nên bắt đầu bằng brute-force** (vét cạn) — kể cả khi đã biết lời giải tối ưu.
- Nắm **quy trình 4 bước** biến một lời giải đúng-nhưng-chậm thành đúng-và-nhanh.
- Nhận diện được các **"mùi" phí phạm** (code smell về hiệu năng) và ánh xạ chúng sang **kỹ thuật tối ưu** tương ứng.
- Áp dụng quy trình lên **4 case study kinh điển** với code Go cả 2 phiên bản đặt cạnh nhau.
- Biết **khi nào brute-force là đủ** — không over-optimize.
- Có **bản đồ** để biết các tier sau (sort, search, greedy, DP, graph) phục vụ việc tối ưu như thế nào.

## Kiến thức tiền đề

- [Lesson 01 — Big-O & phân tích tiệm cận](../lesson-01-bigo-asymptotic/README.md): bạn phải đọc được O(n²) vs O(n) và hiểu chênh lệch.
- [Lesson 02 — Phân tích amortized](../lesson-02-amortized-analysis/README.md): hiểu vì sao một thao tác hash "trung bình O(1)".
- [Lesson 03 — Đệ quy & hệ thức truy hồi](../lesson-03-recursion-recurrence/README.md): hiểu vì sao đệ quy có overlap dẫn tới chậm — nền cho DP.
- [Lesson 04 — Tính đúng đắn & invariant](../lesson-04-correctness-invariant/README.md): brute-force là **baseline đúng** để kiểm chứng; bài này dùng lại tư duy "chứng minh đúng trước".

---

## 1. Triết lý: đúng trước, nhanh sau

> 💡 **Trực giác / Hình dung**
>
> Bạn được giao nấu một món lạ. Bạn không lao ngay vào "tối ưu hóa lò vi sóng". Bạn nấu **một lần theo cách thô sơ nhất** — cân từng nguyên liệu, làm từng bước theo công thức, dù chậm. Lần nấu đầu tiên này cho bạn: (1) một món **chắc chắn ăn được** để so sánh, (2) hiểu **bản chất** món ăn, (3) thấy rõ **chỗ nào tốn thời gian vô ích** (đun nước 3 lần thay vì 1). Brute-force trong lập trình đóng đúng vai trò "lần nấu đầu tiên" đó.

**Brute-force (vét cạn)** = thử mọi khả năng / duyệt mọi tổ hợp một cách trực tiếp, không khôn ngoan, miễn ra **kết quả đúng**. Ba lý do luôn nên viết nó trước:

1. **Baseline đúng để test.** Lời giải tối ưu thường tinh vi, dễ sai ở edge case. Brute-force đơn giản tới mức "nhìn là tin đúng". Bạn dùng nó làm **oracle**: chạy cả brute-force lẫn bản tối ưu trên hàng nghìn input ngẫu nhiên, so sánh từng output. Khác nhau → bản tối ưu sai. Đây là **property-based testing** thực thụ.

2. **Hiểu bài toán.** Khi viết vòng lặp vét cạn, bạn buộc phải định nghĩa chính xác "đáp án là gì", "input ra sao", "edge case nào tồn tại (mảng rỗng? trùng phần tử? số âm?)". Nhiều bug đến từ chỗ chưa hiểu đề, không phải chỗ thuật toán.

3. **Lộ điểm phí phạm.** Khi đã có brute-force chạy được, bạn nhìn vào nó và hỏi: *"chỗ nào tôi đang làm lại việc đã làm? Chỗ nào tôi duyệt thừa?"*. Chính những chỗ đó là nơi áp kỹ thuật tối ưu. Không có brute-force trước mắt → bạn tối ưu trong mơ hồ.

> ⚠ **Lỗi thường gặp**
>
> "Tôi biết Two Sum dùng hash map O(n) rồi, viết brute-force làm gì cho mất công?" — Sai lầm này khiến bạn **mất oracle để test**. Khi bản hash của bạn quên xử lý \`nums[i] == nums[j]\` cùng giá trị, bạn không có gì để đối chiếu. Brute-force tốn 5 dòng nhưng cứu bạn khỏi 2 giờ debug.

> ❓ **Câu hỏi tự nhiên của người đọc**
>
> - *"Brute-force chậm thế, viết ra rồi vứt đi à?"* — Không vứt. Giữ trong test (file \`_test.go\`) làm oracle. Trong production thì thay bằng bản tối ưu, nhưng test vẫn so 2 bản với nhau.
> - *"Lỡ brute-force cũng quá chậm để chạy nổi?"* — Chạy nó trên input **nhỏ** (n=20) — đủ để làm oracle. Bản tối ưu mới chạy input lớn.
> - *"Bài quá khó, brute-force cũng không nghĩ ra?"* — Đó là tín hiệu bạn **chưa hiểu đề**. Lùi lại, định nghĩa rõ đáp án trước.

> 📝 **Tóm tắt mục 1**
> - Luôn viết brute-force trước: nó là baseline đúng, công cụ hiểu đề, và kính lúp soi điểm phí phạm.
> - Giữ brute-force trong test làm **oracle** so sánh với bản tối ưu.
> - "Đúng trước, nhanh sau" — tối ưu một lời giải sai là vô nghĩa.

---

## 2. Quy trình tối ưu hóa — 4 bước

Đây là khung xương lặp lại cho **mọi** bài optimize. Học thuộc nó như học bảng cửu chương.

\`\`\`
┌─────────────────────────────────────────────────────────────┐
│ Bước 1. Viết BRUTE-FORCE (đúng)                              │
│         → có baseline để test, hiểu đề                       │
├─────────────────────────────────────────────────────────────┤
│ Bước 2. Phân tích Big-O, tìm ĐIỂM PHÍ PHẠM                   │
│         → "chỗ nào tính lại? chỗ nào duyệt thừa?"            │
├─────────────────────────────────────────────────────────────┤
│ Bước 3. Áp KỸ THUẬT                                          │
│         → precompute / cache(hash) / sort / two-pointer / DP │
├─────────────────────────────────────────────────────────────┤
│ Bước 4. VERIFY khớp brute-force                             │
│         → chạy random test, output 2 bản phải y hệt          │
└─────────────────────────────────────────────────────────────┘
        ↑                                              │
        └──────── nếu chưa đủ nhanh, lặp lại ──────────┘
\`\`\`

### Bước 1 — Viết brute-force đúng

Vòng lặp thẳng nhất, không mẹo. Mục tiêu duy nhất: **đúng**. Ví dụ "có cặp nào cộng lại bằng target?" → lồng 2 vòng \`for\`, thử mọi cặp.

### Bước 2 — Phân tích Big-O, tìm điểm phí phạm

Đếm vòng lặp lồng nhau → ra Big-O (nhắc lại [Lesson 01](../lesson-01-bigo-asymptotic/README.md)). Rồi soi 2 câu hỏi:

- **Tính lại cùng một giá trị?** (ví dụ: trong vòng trong, mỗi lần lại cộng tổng \`a[0..j]\` từ đầu).
- **Duyệt thừa?** (ví dụ: với mỗi \`i\`, lại quét cả mảng tìm \`target - a[i]\`, dù lần trước đã quét rồi).

### Bước 3 — Áp kỹ thuật

Mỗi loại phí phạm có một "thuốc" tương ứng (xem [mục 3](#3-các-mùi-phí-phạm--kỹ-thuật-tương-ứng)). Quy tắc chung: **đổi space lấy time** — nhớ lại kết quả đã tính (hash, prefix sum) để khỏi tính lại.

### Bước 4 — Verify khớp brute-force

Đây là bước **không được bỏ**. Sinh input ngẫu nhiên hàng nghìn lần, chạy cả 2 hàm, \`assert\` output bằng nhau. Trong Go:

\`\`\`go
// verify.go — kiểm chứng bản tối ưu khớp brute-force trên input ngẫu nhiên
package main

import (
    "fmt"
    "math/rand"
)

func verify() {
    for trial := 0; trial < 5000; trial++ {
        n := rand.Intn(12) + 1            // mảng 1..12 phần tử
        nums := make([]int, n)
        for i := range nums {
            nums[i] = rand.Intn(21) - 10  // giá trị -10..10 (có âm, có trùng)
        }
        target := rand.Intn(21) - 10

        got := twoSumHash(nums, target)   // bản tối ưu
        want := twoSumBrute(nums, target) // oracle
        if !sameAnswer(got, want, nums, target) {
            fmt.Printf("SAI! nums=%v target=%d got=%v want=%v\\n", nums, target, got, want)
            return
        }
    }
    fmt.Println("OK: bản tối ưu khớp brute-force trên 5000 case ngẫu nhiên")
}
\`\`\`

> 🔁 **Dừng lại tự kiểm tra**
>
> Bạn viết bản tối ưu một bài, chạy thử 3 ví dụ trong đề thấy đúng. Có nên dừng không?
>
> <details><summary>Đáp án</summary>
> Không. 3 ví dụ trong đề thường là case "đẹp". Bug hay nấp ở edge case: mảng rỗng, 1 phần tử, mọi phần tử bằng nhau, số âm, target = 0. Random test với brute-force oracle phủ những chỗ này. Chạy 5000 case ngẫu nhiên rồi mới tin.
> </details>

> 📝 **Tóm tắt mục 2**
> - 4 bước: viết brute-force → phân tích & tìm phí phạm → áp kỹ thuật → verify khớp brute-force.
> - Bước 4 (verify bằng random test) là tuyến phòng thủ chống "tối ưu nhưng sai".
> - Nếu vẫn chưa đủ nhanh, lặp lại từ bước 2.

---

## 3. Các "mùi" phí phạm → kỹ thuật tương ứng

> 💡 **Trực giác / Hình dung**
>
> Giống mùi khét trong bếp báo "có gì đang cháy", code có những "mùi" báo "có gì đang phí". Học ngửi được 4 mùi dưới đây thì 80% bài optimize bạn biết phải làm gì.

| "Mùi" phí phạm | Dấu hiệu trong code brute-force | Kỹ thuật | Big-O cải thiện |
|----------------|----------------------------------|----------|-----------------|
| **Tính lại cùng giá trị** | Trong vòng lặp lại cộng/nhân lại một tổng đã tính | **Precompute / prefix sum** | $O(n^2) \\to O(n)$ |
| **Tìm kiếm lặp trong list** | \`for j ... if a[j]==x\` nằm trong vòng \`i\` | **Hash map** ($O(1)$ tra cứu) hoặc **sort + binary search** | $O(n^2) \\to O(n)$ / $O(n \\log n)$ |
| **Duyệt mọi cặp $O(n^2)$** trên dữ liệu **đã sort / đơn điệu** | 2 vòng lồng nhau thử mọi \`(i,j)\` | **Two-pointer / sliding window** | $O(n^2) \\to O(n)$ |
| **Đệ quy lồng nhau có overlap** | Cùng \`f(state)\` được gọi lại nhiều lần | **DP (memoize / tabulation)** | mũ → đa thức |

Diễn giải từng mùi:

### 3.1 Tính lại cùng giá trị → precompute / prefix sum

> 💡 Bạn tính tiền chợ. Mỗi lần ai hỏi "tổng từ món 1 đến món 5?" mà bạn cộng lại từ đầu thì phí. Khôn hơn: **cộng dồn một lần** thành sổ \`tổng tới món i\`, sau đó "tổng từ i đến j" = \`sổ[j] − sổ[i−1]\` — một phép trừ.

**Prefix sum**: \`pre[i] = a[0]+a[1]+...+a[i-1]\`. Khi đó tổng đoạn \`[l, r]\` = \`pre[r+1] − pre[l]\`. Tính \`pre\` một lần $O(n)$, mỗi truy vấn $O(1)$. Áp cho mọi bài "tổng đoạn con" thay vì cộng lại.

Ví dụ với \`a = [3, 1, 4, 1, 5]\`:
- \`pre = [0, 3, 4, 8, 9, 14]\` (pre[0]=0, pre[1]=3, pre[2]=3+1=4, ...).
- Tổng đoạn \`[1,3]\` (tức \`1+4+1\`) = \`pre[4] − pre[1]\` = \`9 − 3 = 6\`. Đúng (1+4+1=6). ✓

### 3.2 Tìm kiếm lặp trong list → hash map / sort+binary search

> 💡 Tìm số điện thoại bạn bè: lật từng trang danh bạ (O(n) mỗi lần) hay tra theo tên đã sắp xếp (O(log n)) hay có app gõ tên ra ngay (O(1) hash)?

Mỗi khi thấy "với mỗi phần tử, lại quét cả mảng tìm một phần tử khác", thay bằng:
- **Hash map** (Go: \`map[int]int\`): tra cứu $O(1)$ trung bình. Đổi $O(n)$ space lấy tốc độ.
- **Sort + binary search**: nếu cần thứ tự / không muốn tốn space hash. $O(n \\log n)$.

### 3.3 Duyệt mọi cặp O(n²) → two-pointer / sliding window

> 💡 Hai người dò 2 đầu một dãy đã sắp xếp, bước vào giữa: nếu tổng quá nhỏ thì người trái bước lên (tăng tổng), quá lớn thì người phải lùi xuống (giảm tổng). Mỗi con trỏ chỉ đi một chiều → tổng cộng $O(n)$, không phải $O(n^2)$.

Điều kiện: dữ liệu **sorted** hoặc đại lượng **đơn điệu** (monotonic) theo con trỏ. Sliding window là biến thể: cửa sổ \`[l, r]\` co/giãn, dùng cho "đoạn con dài nhất/ngắn nhất thỏa điều kiện".

### 3.4 Đệ quy lồng nhau có overlap → DP

> 💡 Tính Fibonacci đệ quy ngây thơ: \`fib(5)\` gọi \`fib(4)\` và \`fib(3)\`; \`fib(4)\` lại gọi \`fib(3)\`... \`fib(3)\` bị tính lại nhiều lần (overlap). **Nhớ** kết quả mỗi \`fib(k)\` lần đầu (memoize) → mỗi state tính đúng một lần. Đây là hạt giống của **quy hoạch động (dynamic programming)**, học sâu ở [Tier 4](../tier-4-dynamic-programming/index.html).

> ❓ **Câu hỏi tự nhiên của người đọc**
> - *"Làm sao biết dùng mùi nào khi bài có nhiều dấu hiệu?"* — Ưu tiên mùi rõ nhất, áp 1 kỹ thuật, đo lại Big-O. Nếu còn chậm thì lặp. Optimize là quá trình lặp, không phải nhìn-một-phát-ra.
> - *"Hash map có phải lúc nào cũng $O(1)$?"* — Trung bình $O(1)$ (nhắc [Lesson 02 amortized](../lesson-02-amortized-analysis/README.md)); worst case $O(n)$ khi collision dồn. Trong Go thực tế đủ tốt cho hầu hết bài.

> 📝 **Tóm tắt mục 3**
> - 4 mùi: tính lại → precompute/prefix; tìm lặp → hash/binary search; mọi cặp trên dữ liệu sorted → two-pointer/window; đệ quy overlap → DP.
> - Mỗi mùi có một kỹ thuật "thuốc" tương ứng — học ánh xạ này là cốt lõi tư duy optimize.

---

## 4. Case study 1 — Two Sum

**Đề:** cho mảng \`nums\` và số \`target\`, tìm chỉ số \`i, j\` (i≠j) sao cho \`nums[i]+nums[j]=target\`. Trả \`[-1,-1]\` nếu không có.

### 4.1 Brute-force O(n²)

\`\`\`go
// twoSumBrute: thử MỌI cặp (i, j). Đúng, đơn giản, chậm.
// Mùi phí phạm: với mỗi i, vòng trong lại quét cả phần còn lại tìm "target - nums[i]".
func twoSumBrute(nums []int, target int) []int {
    n := len(nums)
    for i := 0; i < n; i++ {
        for j := i + 1; j < n; j++ { // mọi cặp i<j
            if nums[i]+nums[j] == target {
                return []int{i, j}
            }
        }
    }
    return []int{-1, -1}
}
// Big-O: thời gian O(n²), bộ nhớ O(1).
\`\`\`

### 4.2 Tối ưu O(n) — hash map

> 💡 Thay vì mỗi lần lại "đi tìm" số bù \`target - nums[i]\`, ta **ghi lại** mọi số đã thấy vào một sổ tra nhanh (hash). Đi tới phần tử nào, hỏi sổ: "đã từng thấy số bù chưa?" — hỏi O(1).

\`\`\`go
// twoSumHash: 1 pass. Với mỗi nums[i], số cần là need = target - nums[i].
// Nếu "need" đã thấy trước đó (có trong map) → tìm được cặp.
func twoSumHash(nums []int, target int) []int {
    seen := make(map[int]int, len(nums)) // value -> index đã thấy
    for i, v := range nums {
        need := target - v
        if j, ok := seen[need]; ok { // need từng xuất hiện ở chỉ số j < i
            return []int{j, i}
        }
        seen[v] = i // ghi lại v để các phần tử sau tra
    }
    return []int{-1, -1}
}
// Big-O: thời gian O(n) trung bình, bộ nhớ O(n) (đổi space lấy time).
\`\`\`

### 4.3 Walk-through

\`nums = [2, 7, 11, 15]\`, \`target = 9\`:

| i | v | need = 9−v | seen trước đó | hành động |
|---|---|-----------|---------------|-----------|
| 0 | 2 | 7 | {} | 7 chưa có → lưu \`seen[2]=0\` |
| 1 | 7 | 2 | {2:0} | **2 có ở j=0** → trả \`[0, 1]\` ✓ |

Brute-force để ra \`[0,1]\` phải thử cặp (0,1) — cũng đúng, nhưng nếu đáp án ở cuối mảng thì brute thử ~n²/2 cặp, hash chỉ đi n bước.

### 4.4 Benchmark mini

\`\`\`go
// benchTwoSum: so số phép so sánh giữa 2 bản trên mảng "đáp án ở cuối".
func benchTwoSum() {
    n := 10000
    nums := make([]int, n)
    for i := range nums { nums[i] = i } // 0,1,...,n-1
    target := (n - 1) + (n - 2)         // cặp cuối: nums[n-2]+nums[n-1]

    // Brute: phải duyệt gần hết → ~n*(n-1)/2 ≈ 50 triệu phép kiểm tra.
    // Hash : 1 pass → n bước = 10000.
    fmt.Printf("Brute ~%d phép kiểm tra; Hash %d bước → nhanh hơn ~%dx\\n",
        n*(n-1)/2, n, (n-1)/2)
}
// Output: Brute ~49995000 phép kiểm tra; Hash 10000 bước → nhanh hơn ~4999x
\`\`\`

> ⚠ **Lỗi thường gặp** — trong bản hash, đừng \`seen[v]=i\` **trước** khi kiểm tra \`need\`. Nếu \`target = 2*v\` và mảng có **một** phần tử \`v\` duy nhất, ghi trước sẽ khiến nó "tự ghép với chính nó" → trả cặp sai \`[i,i]\`. Phải kiểm tra trước, ghi sau (như code trên).

---

## 5. Case study 2 — Max subarray sum (Kadane)

**Đề:** cho mảng số (có âm), tìm **tổng lớn nhất** của một đoạn con liên tiếp không rỗng. Ví dụ \`[-2,1,-3,4,-1,2,1,-5,4]\` → \`[4,-1,2,1]\` tổng \`6\`.

### 5.1 Brute-force O(n²) (và O(n³) ngây thơ hơn)

\`\`\`go
// maxSubBruteN3: O(n³) — với mỗi (l,r) lại cộng lại từ đầu. RẤT phí.
func maxSubBruteN3(a []int) int {
    n, best := len(a), a[0]
    for l := 0; l < n; l++ {
        for r := l; r < n; r++ {
            sum := 0
            for k := l; k <= r; k++ { sum += a[k] } // mùi: tính lại tổng đoạn từ đầu
            if sum > best { best = sum }
        }
    }
    return best
}

// maxSubBruteN2: O(n²) — bỏ vòng trong cùng bằng cách cộng dồn khi r tiến.
// Đây đã là một bước optimize: nhận ra "tổng [l..r] = tổng [l..r-1] + a[r]".
func maxSubBruteN2(a []int) int {
    n, best := len(a), a[0]
    for l := 0; l < n; l++ {
        sum := 0
        for r := l; r < n; r++ {
            sum += a[r]            // cộng dồn, không tính lại
            if sum > best { best = sum }
        }
    }
    return best
}
\`\`\`

### 5.2 Tối ưu O(n) — Kadane

> 💡 Đi từ trái qua phải, giữ một biến \`cur\` = "tổng tốt nhất của đoạn **kết thúc tại i**". Tới \`a[i]\`, hai lựa chọn: **nối** vào đoạn trước (\`cur + a[i]\`) hay **bắt đầu lại** từ \`a[i]\`. Chọn cái lớn hơn. Đây chính là DP 1 chiều — overlap đã bị loại.

\`\`\`go
// maxSubKadane: O(n). cur = tổng tốt nhất của đoạn kết thúc tại i.
func maxSubKadane(a []int) int {
    best, cur := a[0], a[0]
    for i := 1; i < len(a); i++ {
        if cur+a[i] > a[i] {   // nối vào đoạn trước có lợi hơn?
            cur = cur + a[i]
        } else {               // không → bắt đầu đoạn mới tại i
            cur = a[i]
        }
        if cur > best { best = cur }
    }
    return best
}
// Big-O: thời gian O(n), bộ nhớ O(1). Vừa nhanh hơn vừa ít tốn space.
\`\`\`

### 5.3 Walk-through

\`a = [-2, 1, -3, 4, -1, 2, 1, -5, 4]\`:

| i | a[i] | cur+a[i] | cur (chọn max) | best |
|---|------|----------|----------------|------|
| 0 | −2 | — | −2 | −2 |
| 1 | 1 | −1 | **1** (bắt đầu lại) | 1 |
| 2 | −3 | −2 | −2 | 1 |
| 3 | 4 | 2 | **4** (bắt đầu lại) | 4 |
| 4 | −1 | 3 | 3 | 4 |
| 5 | 2 | 5 | 5 | 5 |
| 6 | 1 | 6 | 6 | **6** |
| 7 | −5 | 1 | 1 | 6 |
| 8 | 4 | 5 | 5 | 6 |

Kết quả \`6\` — khớp đoạn \`[4,-1,2,1]\`. ✓

### 5.4 Benchmark mini

\`\`\`go
// O(n³) với n=2000 → ~2000³/6 ≈ 1.3 tỷ phép cộng.
// O(n²)            → ~2 triệu.   O(n) Kadane → 2000.
// Kadane nhanh hơn O(n³) cỡ ~666000 lần.
\`\`\`

> 🔁 **Dừng lại tự kiểm tra** — Vì sao Kadane vẫn đúng khi **mọi** phần tử đều âm?
> <details><summary>Đáp án</summary>
> Khởi tạo \`best = a[0]\` (không phải 0). Mỗi bước \`cur\` luôn ≥ phần tử hiện tại, và \`best\` luôn cập nhật theo \`cur\`. Với mảng toàn âm, đoạn tốt nhất là **một phần tử lớn nhất (gần 0 nhất)** — và best sẽ giữ đúng nó. Nếu lỡ khởi tạo \`best=0\` thì sai (trả 0 dù không có đoạn rỗng được phép).
> </details>

---

## 6. Case study 3 — Đếm subarray có tổng = k

**Đề:** đếm số đoạn con liên tiếp có tổng đúng bằng \`k\`. Ví dụ \`a=[1,1,1], k=2\` → \`2\` (hai đoạn \`[0,1]\` và \`[1,2]\`).

### 6.1 Brute-force O(n²)

\`\`\`go
// countSubBrute: thử mọi đoạn (l,r), cộng dồn. O(n²).
func countSubBrute(a []int, k int) int {
    count := 0
    for l := 0; l < len(a); l++ {
        sum := 0
        for r := l; r < len(a); r++ {
            sum += a[r]
            if sum == k { count++ }
        }
    }
    return count
}
\`\`\`

### 6.2 Tối ưu O(n) — prefix sum + hash

> 💡 Gọi \`P[r]\` = tổng \`a[0..r]\`. Đoạn \`(l, r]\` có tổng \`k\` ⟺ \`P[r] − P[l] = k\` ⟺ \`P[l] = P[r] − k\`. Vậy đi từ trái qua, tại mỗi \`r\` ta **đếm** xem đã thấy giá trị prefix \`P[r] − k\` bao nhiêu lần (hash đếm tần suất) → cộng vào kết quả. Kết hợp **prefix sum** (mùi 3.1) + **hash đếm** (mùi 3.2).

\`\`\`go
// countSubPrefix: O(n). freq[p] = số lần prefix sum p đã xuất hiện.
func countSubPrefix(a []int, k int) int {
    freq := map[int]int{0: 1} // prefix 0 (đoạn rỗng đầu) đã thấy 1 lần
    prefix, count := 0, 0
    for _, v := range a {
        prefix += v
        if c, ok := freq[prefix-k]; ok { // bao nhiêu l thỏa P[l] = prefix - k?
            count += c
        }
        freq[prefix]++
    }
    return count
}
// Big-O: thời gian O(n), bộ nhớ O(n).
\`\`\`

### 6.3 Walk-through

\`a = [1, 1, 1]\`, \`k = 2\`:

| v | prefix | prefix−k | freq trước | freq[prefix−k] | count | freq sau |
|---|--------|----------|------------|----------------|-------|----------|
| 1 | 1 | −1 | {0:1} | 0 | 0 | {0:1, 1:1} |
| 1 | 2 | 0 | {0:1,1:1} | **1** | 1 | {0:1,1:1,2:1} |
| 1 | 3 | 1 | {0:1,1:1,2:1} | **1** | 2 | {...,3:1} |

Kết quả \`2\`. ✓ (Lưu ý bài này có số dương lẫn **âm** thì two-pointer/sliding window **không** áp dụng được — phải dùng prefix+hash, đó là lý do chọn kỹ thuật này.)

> ⚠ **Lỗi thường gặp** — quên khởi tạo \`freq[0]=1\`. Nếu thiếu, các đoạn bắt đầu từ chỉ số 0 (tức \`P[r]=k\` trực tiếp) bị bỏ sót. Khởi tạo \`{0:1}\` mô hình hóa "đoạn rỗng tại đầu".

> ❓ **Câu hỏi tự nhiên** — *"Vì sao có số âm thì two-pointer / sliding window 'không áp dụng được', mà prefix+hash thì được?"*
>
> Two-pointer/sliding window chỉ đúng khi đại lượng theo cửa sổ **đơn điệu (monotonic)**: **mở rộng** cửa sổ (\`r++\`) chỉ làm tổng **tăng**, **co** cửa sổ (\`l++\`) chỉ làm tổng **giảm**. Nhờ đó mới có logic "tổng quá lớn → co trái; quá nhỏ → giãn phải". Điều này **chỉ đúng khi mọi phần tử ≥ 0**.
>
> Có **số âm** thì tính đơn điệu vỡ: mở rộng cửa sổ có thể làm tổng *giảm*. Phản ví dụ — \`a = [2, -1, 2]\`, tìm đoạn tổng \`= 3\`:
> - Cửa sổ \`[2]\` tổng 2 < 3 → "giãn phải" thành \`[2,-1]\` tổng **1** (giảm chứ không tăng!). Logic sliding window kết luận sai rằng cần giãn tiếp, bỏ sót đoạn \`[2,-1,2]\` tổng 3.
>
> **Prefix sum + hash không cần đơn điệu** — nó không "trượt cửa sổ" mà tra trực tiếp: tại mỗi \`r\`, đếm xem đã thấy prefix \`P[r] − k\` bao nhiêu lần. Quan hệ \`P[l] = P[r] − k\` đúng với **mọi** giá trị (âm/dương/lộn xộn), nên prefix+hash là lựa chọn tổng quát cho "tổng đoạn = k" khi có số âm. (Sliding window quay lại dùng được ở bài "tổng ≥ k với mảng dương" — xem [Tier 2](../tier-2-searching-core/index.html).)

---

## 7. Case study 4 — Phát hiện phần tử trùng (duplicate detection)

**Đề:** mảng \`nums\` có phần tử nào xuất hiện ≥ 2 lần không?

### 7.1 Brute-force O(n²)

\`\`\`go
// hasDupBrute: so mọi cặp. O(n²), O(1) space.
func hasDupBrute(nums []int) bool {
    for i := 0; i < len(nums); i++ {
        for j := i + 1; j < len(nums); j++ {
            if nums[i] == nums[j] { return true } // mùi: tìm lặp trong list
        }
    }
    return false
}
\`\`\`

### 7.2 Hai hướng tối ưu

\`\`\`go
// Hướng A — set (hash): O(n) thời gian, O(n) space. Nhanh nhất.
func hasDupSet(nums []int) bool {
    seen := make(map[int]struct{}, len(nums))
    for _, v := range nums {
        if _, ok := seen[v]; ok { return true } // đã thấy → trùng
        seen[v] = struct{}{}
    }
    return false
}

// Hướng B — sort: O(n log n) thời gian, O(1) space thêm (sort tại chỗ).
// Sau khi sort, phần tử trùng nằm CẠNH nhau → chỉ cần quét 1 lần so hàng xóm.
func hasDupSort(nums []int) bool {
    cp := append([]int(nil), nums...) // copy để không phá mảng gốc
    sort.Ints(cp)
    for i := 1; i < len(cp); i++ {
        if cp[i] == cp[i-1] { return true }
    }
    return false
}
\`\`\`

### 7.3 So sánh & walk-through

\`nums = [3, 1, 4, 1, 5]\`:

- **Set**: thấy 3→lưu, 1→lưu, 4→lưu, **1→đã có → true** (dừng ở phần tử thứ 4).
- **Sort**: \`[1,1,3,4,5]\` → so cp[1]==cp[0] (1==1) → **true** ngay cặp đầu.
- **Brute**: thử (0,1)(0,2)(0,3)... tới (1,3) mới thấy 1==1 → true (chậm hơn nếu cặp trùng ở xa).

> ❓ **Câu hỏi tự nhiên** — *"Set nhanh hơn ($O(n)$) sao còn dùng sort ($O(n \\log n)$)?"* — Khi **không được phép** tốn $O(n)$ space (bộ nhớ chật), hoặc dữ liệu **đã sort sẵn** (lúc đó sort miễn phí, chỉ quét $O(n)$). Đây là **trade-off** space–time, xem [mục 9](#9-trade-off-space--time).

> 📝 **Tóm tắt mục 4–7**
> - Two Sum: tìm lặp → **hash** ($O(n^2) \\to O(n)$).
> - Max subarray: tính lại tổng → cộng dồn rồi **Kadane/DP** ($O(n^3) \\to O(n)$).
> - Subarray = k: tổng đoạn + tìm lặp → **prefix sum + hash** ($O(n^2) \\to O(n)$).
> - Duplicate: tìm lặp → **set** $O(n)$ hoặc **sort** $O(n \\log n)$ tùy ràng buộc space.

---

## 8. Khi brute-force là ĐỦ

> ⚠ **Lỗi thường gặp** — tối ưu mọi thứ. Tối ưu tốn thời gian viết, làm code khó đọc, dễ sinh bug. **Premature optimization is the root of all evil** (Donald Knuth) — tối ưu non là gốc rễ mọi tai họa.

Brute-force là **đủ tốt** khi:

1. **n nhỏ.** Nếu $n \\leq 20$ và thuật toán $O(n^2)$ thì 400 phép tính — máy chạy trong **nano giây**. Tối ưu xuống $O(n)$ chỉ tiết kiệm ~380 phép, vô nghĩa.
2. **Chạy một lần (one-off script).** Script phân tích log chạy 1 lần rồi vứt — chậm 2 giây cũng chẳng sao. Viết nhanh, đúng, xong việc quan trọng hơn nhanh.
3. **Hằng số nhỏ / vòng lặp gọn.** $O(n^2)$ với hằng số tí hon đôi khi thắng $O(n)$ với hằng số lớn (hash có overhead băm). Với $n$ vài trăm, brute thường thắng.
4. **Code rõ ràng quan trọng hơn.** Bản brute-force ai cũng đọc hiểu; bản tối ưu tinh vi cần comment dài. Nếu hiệu năng không phải nút thắt → giữ bản dễ đọc.

**Nguyên tắc:** đo trước, tối ưu sau. Chỉ tối ưu chỗ **thật sự** là nút thắt (đo bằng profiler), không đoán mò.

\`\`\`go
// Ví dụ: n ≤ 20, brute O(n²) hoàn toàn ổn, KHÔNG cần hash.
// 20² = 400 phép so sánh — chạy xong trước khi bạn chớp mắt.
func twoSumSmall(nums []int, target int) []int {
    return twoSumBrute(nums, target) // giữ bản brute cho code rõ ràng
}
\`\`\`

> 🔁 **Dừng lại tự kiểm tra** — Bài có $n \\leq 100$, gọi đúng 1 lần. Nên viết brute $O(n^2)$ hay hash $O(n)$?
> <details><summary>Đáp án</summary>
> Brute $O(n^2)$: $100^2=10000$ phép — vài micro giây. Hash không cải thiện gì cảm nhận được, lại tốn thời gian viết + space. Đây là chỗ KHÔNG nên tối ưu. Để dành công sức cho chỗ $n$ lớn.
> </details>

---

## 9. Trade-off space ↔ time

> 💡 **Trực giác** — Tối ưu thường là **đánh đổi**, không phải bữa trưa miễn phí. Muốn nhanh hơn (time) → thường phải nhớ thêm dữ liệu (space). Đôi khi ngược lại: tiết kiệm bộ nhớ thì chấp nhận chậm hơn.

| Hướng đổi | Ví dụ trong bài này | Được | Mất |
|-----------|---------------------|------|-----|
| **Space → Time** (phổ biến) | Two Sum hash, prefix+hash | thời gian $O(n^2) \\to O(n)$ | bộ nhớ $O(1) \\to O(n)$ |
| **Time → Space** (ít hơn) | online algorithm: xử lý streaming không lưu cả mảng | bộ nhớ $O(1)$ | có khi chậm hơn / không nhìn lại được |

**Online algorithm**: xử lý dữ liệu **đến từng phần** (streaming), không giữ toàn bộ trong RAM. Ví dụ Kadane là online — đọc từng phần tử, chỉ giữ \`cur, best\` ($O(1)$ space), không cần lưu cả mảng. Trái với "offline" (cần thấy toàn bộ input trước khi tính).

> ❓ **Câu hỏi tự nhiên** — *"Đổi space lấy time có giới hạn không?"* — Có. Nếu mảng $n = 10^9$ thì hash $O(n)$ space có thể **không vừa RAM**. Khi đó chấp nhận $O(n \\log n)$ sort tại chỗ (ít space) hoặc thuật toán online. Luôn cân ràng buộc bộ nhớ thực tế.

> 📝 **Tóm tắt mục 8–9**
> - Brute-force đủ khi n nhỏ, one-off, hằng số nhỏ, hoặc khi độ rõ quan trọng hơn tốc độ.
> - Tối ưu là đánh đổi: thường space ↔ time. Cân theo ràng buộc thực tế (RAM, tần suất chạy).
> - Đo trước (profiler), tối ưu chỗ là nút thắt — đừng tối ưu non.

---

## 10. Roadmap — các tier sau là toolbox tối ưu

Lesson này là **bản đồ tư duy**. Các tier tiếp theo lấp đầy "hộp đồ nghề" mà bạn dùng ở **bước 3** (áp kỹ thuật):

| Tier | Cho bạn công cụ gì để tối ưu |
|------|------------------------------|
| [Tier 1 — Sắp xếp](../tier-1-sorting/index.html) | Sort là tiền đề cho two-pointer, binary search, dedup. "Sort trước" mở khóa nhiều tối ưu. |
| [Tier 2 — Tìm kiếm & cốt lõi](../tier-2-searching-core/index.html) | Binary search, **two-pointer, sliding window, prefix sum, hashing** — chính các kỹ thuật mục 3. |
| [Tier 3 — Greedy](../tier-3-greedy/index.html) | Khi chọn cục bộ tốt nhất dẫn tới toàn cục tối ưu → bỏ vét cạn. |
| [Tier 4 — Quy hoạch động](../tier-4-dynamic-programming/index.html) | "Mùi" đệ quy overlap (mục 3.4) → DP. Biến mũ thành đa thức. |
| [Tier 5 — Đồ thị](../tier-5-graph/index.html) | BFS/DFS/Dijkstra: tối ưu duyệt cấu trúc liên kết thay vì vét cạn đường đi. |

> 💡 Mỗi khi học một thuật toán mới ở tier sau, hãy tự hỏi: *"nó chữa được 'mùi' phí phạm nào?"*. Gắn vào khung tư duy 4 bước của bài này → bạn không học rời rạc mà có hệ thống.

---

## 11. Ứng dụng thực tế trong phần mềm

> 💡 **"Brute-force trước, tối ưu sau" là quy trình làm việc thật, không chỉ bài tập.** Kỹ sư giỏi viết bản chạy-được-nhưng-chậm trước, đo, rồi mới tối ưu chỗ thực sự nóng.

| Giai đoạn thật | Vai trò của brute-force |
|----------------|-------------------------|
| **MVP / prototype** | Viết bản đơn giản (dù $O(n^2)$) để ra tính năng nhanh, validate ý tưởng |
| **Test oracle** | Brute-force chậm-nhưng-chắc-đúng để **kiểm chứng** bản tối ưu (so kết quả) |
| **Profiling rồi mới tối ưu** | Đo (pprof/flamegraph) tìm hot path → chỉ tối ưu chỗ đó, không tối ưu mù |
| **Fuzzing / property test** | So bản nhanh vs bản brute trên input ngẫu nhiên để bắt bug |

### 11.1. Ví dụ cụ thể — brute-force làm "oracle" kiểm thử

Bạn viết một hàm tối ưu phức tạp (vd segment tree cho range query). Làm sao chắc nó đúng? Viết thêm hàm **brute-force** $O(n)$ mỗi truy vấn (cộng thẳng), rồi chạy hàng nghìn input ngẫu nhiên, so kết quả 2 bản. Khác nhau = bản tối ưu có bug. Đây là kỹ thuật chuẩn trong competitive programming **và** test production (differential testing). Brute-force chậm nhưng "hiển nhiên đúng" → làm chuẩn vàng.

> ⚠ **"Đừng tối ưu sớm" (premature optimization) là thật, nhưng đừng hiểu sai.** Nghĩa là: đừng tối ưu chỗ **chưa đo là nóng**. KHÔNG có nghĩa "viết $O(n^2)$ cho thuật toán bạn biết chắc sẽ chạy trên triệu phần tử". Chọn đúng độ phức tạp **về mặt thiết kế** từ đầu (dùng Big-O, [Lesson 01](../lesson-01-bigo-asymptotic/)); chỉ trì hoãn các vi-tối-ưu (micro-opt) tới khi profiling chỉ ra.

### 11.2. 📝 Tóm tắt mục 11

- Brute-force-trước thật trong: **MVP nhanh**, **test oracle** (differential testing), **profiling rồi mới tối ưu**, **fuzzing**.
- Brute-force "hiển nhiên đúng" làm chuẩn vàng kiểm bản tối ưu.
- "Đừng tối ưu sớm" = đừng tối ưu chỗ chưa đo là nóng; vẫn phải chọn đúng độ phức tạp khi thiết kế.

## Bài tập

> Với mỗi bài: (a) viết brute-force, (b) chỉ rõ **điểm phí phạm**, (c) nêu **kỹ thuật**, (d) Big-O **before → after**. Lời giải đầy đủ ở mục kế tiếp.

1. **Pair sum = target (có tồn tại không?)** — cho mảng, hỏi có cặp nào cộng bằng \`target\`. Tối ưu từ $O(n^2)$ brute.
2. **Longest substring không lặp ký tự** — chuỗi \`s\`, tìm độ dài đoạn con dài nhất không có ký tự lặp. Brute $O(n^2)$/$O(n^3)$.
3. **Find missing number** — mảng chứa $n$ số phân biệt trong $[0..n]$, thiếu đúng 1 số; tìm số thiếu. Brute $O(n^2)$.
4. **Anagram check** — 2 chuỗi có phải đảo chữ của nhau không. Brute $O(n^2)$ (xóa từng ký tự).
5. **K-th largest element** — tìm phần tử lớn thứ k. Brute $O(n \\cdot k)$ hoặc sort $O(n \\log n)$.
6. **Count pairs có hiệu = k** — đếm cặp \`(i,j)\` với \`|nums[i]−nums[j]| = k\`. Brute $O(n^2)$.

---

## Lời giải chi tiết

### Bài 1 — Pair sum = target

- **Brute $O(n^2)$:** 2 vòng lồng, thử mọi cặp.
- **Điểm phí phạm:** với mỗi \`i\`, lại quét cả mảng tìm \`target − nums[i]\` (mùi "tìm lặp trong list").
- **Kỹ thuật:** hash set các giá trị đã thấy; với mỗi \`v\` hỏi \`target − v\` đã thấy chưa.
- **Big-O:** $O(n^2)$ time / $O(1)$ space → $\\boldsymbol{O(n)}$ **time** / $\\boldsymbol{O(n)}$ **space**.

\`\`\`go
func hasPairSum(nums []int, target int) bool {
    seen := make(map[int]struct{}, len(nums))
    for _, v := range nums {
        if _, ok := seen[target-v]; ok { return true }
        seen[v] = struct{}{}
    }
    return false
}
\`\`\`

Walk-through \`nums=[3,5,2,8], target=10\`: 3→lưu; 5→cần 5,chưa→lưu; 2→cần 8,chưa→lưu; 8→cần 2, **có** → \`true\`.

### Bài 2 — Longest substring không lặp ký tự

- **Brute $O(n^3)$/$O(n^2)$:** thử mọi đoạn \`(l,r)\`, kiểm tra có lặp không ($O(n)$ mỗi kiểm tra) → $O(n^3)$; hoặc dùng set mở rộng từ mỗi \`l\` → $O(n^2)$.
- **Điểm phí phạm:** mỗi \`l\` lại xây lại tập ký tự từ đầu (mùi "duyệt thừa" trên dữ liệu trượt được).
- **Kỹ thuật:** **sliding window** + hash lưu vị trí xuất hiện gần nhất của mỗi ký tự. Con trỏ phải \`r\` tiến, con trỏ trái \`l\` nhảy qua vị trí lặp.
- **Big-O:** $O(n^2) \\to \\boldsymbol{O(n)}$.

\`\`\`go
func lengthOfLongestSubstring(s string) int {
    last := make(map[byte]int) // ký tự -> chỉ số gần nhất
    best, l := 0, 0
    for r := 0; r < len(s); r++ {
        c := s[r]
        if idx, ok := last[c]; ok && idx >= l {
            l = idx + 1 // nhảy trái qua bản sao trước đó
        }
        last[c] = r
        if r-l+1 > best { best = r - l + 1 }
    }
    return best
}
\`\`\`

Walk-through \`"abcabcbb"\`: cửa sổ lớn nhất "abc" = 3. Khi gặp 'a' thứ hai (r=3), \`l\` nhảy tới 1; tiếp tục giữ độ dài 3. Kết quả \`3\`. ✓

### Bài 3 — Find missing number

- **Brute $O(n^2)$:** với mỗi \`k\` trong \`[0..n]\`, quét mảng xem có \`k\` không.
- **Điểm phí phạm:** quét lại cả mảng cho từng \`k\` (tìm lặp).
- **Kỹ thuật:** **công thức tổng** — tổng $0..n = n(n+1)/2$; trừ đi tổng thực tế → ra số thiếu. (Hoặc XOR, cũng $O(n)$.)
- **Big-O:** $O(n^2) \\to \\boldsymbol{O(n)}$ **time** / $\\boldsymbol{O(1)}$ **space**.

\`\`\`go
func missingNumber(nums []int) int {
    n := len(nums)
    want := n * (n + 1) / 2 // tổng 0..n
    got := 0
    for _, v := range nums { got += v }
    return want - got
}
\`\`\`

Walk-through \`[3,0,1]\` ($n=3$, dải 0..3): want $= 3 \\cdot 4/2 = 6$; got $= 3+0+1 = 4$; thiếu $= 6-4 = 2$. ✓

### Bài 4 — Anagram check

- **Brute $O(n^2)$:** với mỗi ký tự của \`a\`, tìm và "xóa" một ký tự khớp trong \`b\`; nếu xóa hết và đủ độ dài → anagram.
- **Điểm phí phạm:** mỗi ký tự lại quét \`b\` tìm khớp (tìm lặp).
- **Kỹ thuật:** **đếm tần suất** bằng map/mảng 26 — đếm \`a\` cộng, \`b\` trừ; mọi đếm = 0 → anagram. (Hoặc sort cả 2 rồi so, $O(n \\log n)$.)
- **Big-O:** $O(n^2) \\to \\boldsymbol{O(n)}$.

\`\`\`go
func isAnagram(a, b string) bool {
    if len(a) != len(b) { return false }
    var cnt [256]int
    for i := 0; i < len(a); i++ {
        cnt[a[i]]++
        cnt[b[i]]--
    }
    for _, c := range cnt {
        if c != 0 { return false }
    }
    return true
}
\`\`\`

Walk-through \`"listen"\` vs \`"silent"\`: mỗi ký tự l,i,s,t,e,n cộng 1 (từ a) rồi trừ 1 (từ b) → mọi đếm về 0 → \`true\`. ✓

### Bài 5 — K-th largest element

- **Brute $O(n \\cdot k)$:** lặp $k$ lần, mỗi lần quét tìm max còn lại rồi loại.
- **Điểm phí phạm:** quét lại mảng $k$ lần (duyệt thừa).
- **Kỹ thuật:** **sort giảm dần** rồi lấy phần tử thứ $k-1$ ($O(n \\log n)$); hoặc **min-heap kích thước k** ($O(n \\log k)$); tối ưu nhất **quickselect** trung bình $O(n)$.
- **Big-O:** $O(n \\cdot k) \\to \\boldsymbol{O(n \\log n)}$ (sort) hoặc $\\boldsymbol{O(n)}$ trung bình (quickselect).

\`\`\`go
func kthLargest(nums []int, k int) int {
    cp := append([]int(nil), nums...)
    sort.Sort(sort.Reverse(sort.IntSlice(cp))) // giảm dần
    return cp[k-1]
}
\`\`\`

Walk-through \`[3,2,1,5,6,4], k=2\`: sort giảm \`[6,5,4,3,2,1]\` → phần tử thứ 2 (index 1) = \`5\`. ✓ Khi \`k\` nhỏ và \`n\` lớn, min-heap kích thước k tiết kiệm hơn (chỉ giữ k phần tử).

### Bài 6 — Count pairs có hiệu = k

- **Brute $O(n^2)$:** thử mọi cặp, đếm cặp \`|nums[i]−nums[j]| = k\`.
- **Điểm phí phạm:** với mỗi \`i\` lại quét tìm \`nums[i]±k\` (tìm lặp).
- **Kỹ thuật:** **hash đếm tần suất**; với mỗi \`v\`, cộng số lần \`v+k\` và \`v−k\` đã xuất hiện. Cẩn thận \`k=0\` (đếm cặp bằng nhau).
- **Big-O:** $O(n^2) \\to \\boldsymbol{O(n)}$.

\`\`\`go
func countPairsDiff(nums []int, k int) int {
    freq := make(map[int]int)
    count := 0
    for _, v := range nums {
        if k == 0 {
            count += freq[v]          // cặp bằng nhau
        } else {
            count += freq[v-k] + freq[v+k]
        }
        freq[v]++
    }
    return count
}
\`\`\`

Walk-through \`nums=[1,5,3,4,2], k=2\`: cặp hiệu 2 là (1,3),(5,3),(3,5)dup?,(4,2),(3,1)... đếm chuẩn = (3,1),(5,3),(4,2) → \`3\`. Hash đếm khi gặp 3 thấy freq[1]=1 → +1; gặp 4 thấy freq[2]? chưa; gặp 2 thấy freq[4]=1 → +1; ... cộng đúng \`3\`. ✓

> 📝 **Tóm tắt 6 bài** — Năm trong sáu bài có cùng mùi "tìm lặp trong list" → chữa bằng **hash**. Bài 5 là mùi "duyệt thừa" → **sort/heap/quickselect**. Nhận ra mùi → biết ngay thuốc.

---

## Code & Minh họa

- **Code Go inline:** mọi case study & bài tập ở trên đã có code Go cả 2 phiên bản (brute + optimized) đặt cạnh nhau, kèm comment và benchmark mini. Bài này theo quy ước **không** kèm \`solutions.go\` riêng.
- **Visualization tương tác:** [visualization.html](./visualization.html) — 3 module:
  1. **Two Sum side-by-side** — animate brute O(n²) duyệt mọi cặp vs hash O(n) một pass, đếm số phép so sánh.
  2. **Optimization picker** — chọn "mùi" phí phạm → gợi ý kỹ thuật tương ứng.
  3. **Brute vs optimal benchmark** — kéo slider \`n\`, xem bar chart số phép so sánh của 2 cách giãn ra theo n².

---

## Kết thúc Tier 0 — Bài tiếp theo

Bạn đã hoàn thành **Tier 0 — Nền tảng phân tích**: biết **đo** (Big-O, amortized), **phân rã** (đệ quy), **chứng minh đúng** (invariant), và giờ là **khung tư duy tối ưu**. 

→ Đi tiếp [Tier 1 — Sắp xếp](../tier-1-sorting/index.html): công cụ đầu tiên trong toolbox tối ưu. Sort mở khóa two-pointer, binary search và dedup mà bài này đã nhắc tới.
`;
