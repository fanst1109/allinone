// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: Algorithms/lesson-13-two-pointers/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 13 — Two Pointers (Hai con trỏ)

> **Tier 2 — Tìm kiếm & kỹ thuật cốt lõi.** Đây là một trong những kỹ thuật "đắt giá" nhất để biến một thuật toán O(n²) thành O(n): thay vì hai vòng \`for\` lồng nhau, ta dùng **hai biến chỉ số** (con trỏ) quét mảng một cách thông minh.

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Hiểu **ý tưởng cốt lõi** của two pointers và vì sao nó cắt được một bậc độ phức tạp.
- Phân biệt **3 biến thể chính**: đối đầu (opposite ends), cùng chiều (same direction), fast-slow (Floyd).
- Cài đặt thành thạo (bằng Go): two-sum sorted, kiểm tra palindrome, container with most water, remove duplicates in-place, move zeros, phát hiện chu trình linked list, three-sum.
- Biết **khi nào** dùng two pointers thay vì hash hay brute-force, và những **cạm bẫy** off-by-one / quên sort / quên null-check.

## Kiến thức tiền đề

- [Lesson 01 — Big-O & phân tích tiệm cận](../lesson-01-bigo-asymptotic/) — để hiểu O(n²) → O(n) nghĩa là gì.
- [Lesson 05 — Từ brute-force tới tối ưu](../lesson-05-bruteforce-to-optimize/) — two pointers là một "công cụ tối ưu" điển hình.
- [Lesson 12 — Binary Search & variants](../lesson-12-binary-search-variants/) — cùng họ "hai chỉ số ép dần".
- [DataStructures — Linked List](../../DataStructures/) — cần cho phần fast-slow (Floyd cycle detection).

---

## 1. Ý tưởng: vì sao hai con trỏ nhanh hơn?

### 1.1 Bài toán mở màn

> **Cho mảng đã sắp xếp \`[2, 7, 11, 15]\` và \`target = 9\`. Tìm hai phần tử cộng lại bằng 9.** (đáp án: \`2 + 7 = 9\`, ở chỉ số 0 và 1).

Cách "ngây thơ" (brute-force): thử mọi cặp \`(i, j)\`.

\`\`\`go
// Brute-force: O(n²) — thử mọi cặp
func twoSumBrute(a []int, target int) (int, int) {
    for i := 0; i < len(a); i++ {
        for j := i + 1; j < len(a); j++ {
            if a[i]+a[j] == target {
                return i, j
            }
        }
    }
    return -1, -1
}
\`\`\`

Với $n = 4$ cặp phải thử là $C(4,2) = 6$. Với $n = 1.000.000$ thì là $\\approx 5 \\cdot 10^{11}$ phép — không chạy nổi.

### 1.2 Trực giác hai con trỏ

> **💡 Trực giác / Hình dung.** Tưởng tượng bạn đứng hai đầu một hàng người **đã xếp theo chiều cao** và muốn tìm hai người có tổng chiều cao đúng bằng $T$. Bạn nhìn người **thấp nhất** (đầu trái) và **cao nhất** (đầu phải). Nếu tổng **quá lớn** → chắc chắn không cần người cao nhất nữa (vì ghép với ai cũng thừa) → bỏ người phải, lùi vào. Nếu tổng **quá nhỏ** → bỏ người thấp nhất, tiến từ trái. Mỗi bước **loại hẳn một người**, nên chỉ cần $n$ bước thay vì $n^2$.

Điều kỳ diệu nằm ở chữ **"đã xếp"**: vì mảng sorted, mỗi lần so sánh ta biết chắc nên dịch trái hay dịch phải, không bao giờ phải quay lại. Đây là cốt lõi: **two pointers loại bỏ vùng tìm kiếm một cách đơn điệu (monotonic)**, mỗi phần tử được "thăm" tối đa một lần.

### 1.3 Ba biến thể chính

| Biến thể | Hai con trỏ đặt ở đâu | Di chuyển | Điều kiện đầu vào | Ví dụ điển hình |
|----------|----------------------|-----------|-------------------|-----------------|
| **Đối đầu** (opposite ends) | \`l=0\`, \`r=n-1\` | Tiến vào giữa | Mảng **sorted** hoặc bài toán **đối xứng** | two-sum sorted, palindrome, reverse, container water |
| **Cùng chiều** (same direction) | \`slow=0\`, \`fast=0\` | Cùng đi từ trái, tốc độ/điều kiện khác | In-place modification | remove duplicates, move zeros, partition |
| **Fast-slow** (Floyd) | \`slow\`, \`fast\` cùng đầu | \`slow += 1\`, \`fast += 2\` | Linked list / chuỗi có chu trình | cycle detection, tìm middle |

> **📝 Tóm tắt mục 1.**
> - Two pointers thay **vòng lồng O(n²)** bằng **một lượt quét O(n)** dùng hai chỉ số.
> - Hoạt động được vì mỗi bước **loại đơn điệu** một phần — không quay lại.
> - 3 biến thể: **đối đầu**, **cùng chiều**, **fast-slow**.

---

## 2. Biến thể 1 — Đối đầu (Opposite ends)

Hai con trỏ bắt đầu ở **hai đầu** (\`l = 0\`, \`r = n-1\`) và **tiến dần vào giữa** cho tới khi gặp nhau (\`l < r\`). Điều kiện bắt buộc: mảng **đã sắp xếp** (để biết dịch hướng nào) hoặc bài toán **đối xứng** (palindrome, reverse).

### 2.1 Two-sum trên mảng sorted

\`\`\`go
// twoSumSorted: tìm cặp (i, j) sao cho a[i]+a[j] == target.
// Yêu cầu: a ĐÃ được sắp xếp tăng dần.
// Độ phức tạp: O(n) thời gian, O(1) bộ nhớ.
func twoSumSorted(a []int, target int) (int, int) {
    l, r := 0, len(a)-1
    for l < r { // l < r: hai con trỏ chưa gặp nhau
        sum := a[l] + a[r]
        switch {
        case sum == target:
            return l, r // tìm thấy
        case sum < target:
            l++ // tổng nhỏ → cần phần tử lớn hơn → dịch trái sang phải
        default: // sum > target
            r-- // tổng lớn → cần phần tử nhỏ hơn → dịch phải sang trái
        }
    }
    return -1, -1 // không có cặp nào
}
\`\`\`

#### Walk-through: \`a = [2, 7, 11, 15]\`, \`target = 9\`

| Bước | \`l\` | \`r\` | \`a[l]\` | \`a[r]\` | \`sum\` | So với target=9 | Hành động |
|------|----:|----:|-------:|-------:|------:|-----------------|-----------|
| 1 | 0 | 3 | 2 | 15 | 17 | 17 > 9 | \`r--\` → r=2 |
| 2 | 0 | 2 | 2 | 11 | 13 | 13 > 9 | \`r--\` → r=1 |
| 3 | 0 | 1 | 2 | 7  | 9  | 9 == 9 ✓ | **return (0, 1)** |

Chỉ **3 bước** thay vì 6 cặp của brute-force. Tổng quát: tối đa \`n-1\` bước vì mỗi bước hoặc \`l\` tăng hoặc \`r\` giảm, khoảng cách \`r-l\` luôn co lại đúng 1.

> **❓ Câu hỏi tự nhiên của người đọc.**
> - *"Vì sao bỏ \`a[r]=15\` mà không sợ mất nghiệm?"* — Vì mảng sorted: \`15\` là phần tử lớn nhất còn lại. Ghép \`15\` với phần tử **nhỏ nhất** (\`a[l]=2\`) đã cho \`17 > 9\`; ghép với bất kỳ phần tử nào khác (đều \`≥ 2\`) còn lớn hơn nữa. Nên \`15\` **không thể** thuộc nghiệm → loại an toàn.
> - *"Nếu có nhiều cặp thì sao?"* — Thuật toán trả về cặp đầu tiên tìm thấy. Muốn tất cả thì khi \`sum == target\` cứ ghi nhận rồi \`l++, r--\` đi tiếp.
> - *"Mảng chưa sort thì sao?"* — Phải sort trước (O(n log n)), nhưng khi đó **mất chỉ số gốc**. Khi cần chỉ số gốc của mảng chưa sort → dùng **hash map** O(n) thay vì two pointers (xem mục 8).

### 2.2 Kiểm tra palindrome (đối xứng)

Đây là kiểu **đối xứng**, không cần sorted: so \`a[l]\` với \`a[r]\`, nếu khớp thì tiến vào giữa.

\`\`\`go
// isPalindrome: kiểm tra chuỗi có đối xứng không.
// O(n) thời gian, O(1) bộ nhớ.
func isPalindrome(s string) bool {
    l, r := 0, len(s)-1
    for l < r {
        if s[l] != s[r] {
            return false // hai đầu khác nhau → không đối xứng
        }
        l++
        r--
    }
    return true
}
\`\`\`

#### Walk-through: \`s = "racecar"\` (n=7)

| Bước | \`l\` | \`r\` | \`s[l]\` | \`s[r]\` | Khớp? |
|------|----:|----:|:------:|:------:|:-----:|
| 1 | 0 | 6 | r | r | ✓ |
| 2 | 1 | 5 | a | a | ✓ |
| 3 | 2 | 4 | c | c | ✓ |
| — | 3 | 3 | — | — | \`l == r\`, dừng → **true** |

Phần giữa (\`l == r\`, ký tự \`e\`) không cần so vì tự đối xứng với chính nó.

Thêm 3 ví dụ:
- \`"abba"\` (n=4): (a,a)✓ → (b,b)✓ → \`l=2, r=1\`, \`l<r\` sai → **true**.
- \`"abc"\` (n=3): (a,c) khác → **false** ngay bước 1.
- \`"x"\` (n=1): vòng lặp không chạy (\`l=0, r=0\`) → **true** (chuỗi 1 ký tự luôn palindrome).

### 2.3 Container With Most Water

> **Bài toán.** Mảng \`height[]\` là chiều cao các thanh. Chọn hai thanh \`i < j\` tạo thành "bể chứa nước". Lượng nước = \`min(height[i], height[j]) × (j - i)\` (chiều cao thấp hơn nhân khoảng cách). Tìm bể chứa **nhiều nước nhất**.

> **💡 Trực giác.** Diện tích bị giới hạn bởi thanh **thấp hơn**. Bắt đầu với hai đầu (khoảng cách lớn nhất). Muốn diện tích lớn hơn thì phải tăng \`min(height)\` — mà dịch thanh **cao hơn** vào trong chỉ làm khoảng cách giảm còn chiều cao giới hạn vẫn là thanh thấp → không thể tốt hơn. Nên **luôn dịch con trỏ ở thanh thấp hơn** (hy vọng gặp thanh cao hơn). Mỗi bước loại đúng một thanh → O(n).

\`\`\`go
// maxArea: container with most water. O(n) thời gian, O(1) bộ nhớ.
func maxArea(height []int) int {
    l, r := 0, len(height)-1
    best := 0
    for l < r {
        h := min(height[l], height[r])
        area := h * (r - l) // chiều cao thấp hơn × khoảng cách
        if area > best {
            best = area
        }
        // dịch con trỏ ở thanh THẤP hơn (cố tìm thanh cao hơn)
        if height[l] < height[r] {
            l++
        } else {
            r--
        }
    }
    return best
}

func min(a, b int) int { if a < b { return a }; return b }
\`\`\`

#### Walk-through: \`height = [1, 8, 6, 2, 5, 4, 8, 3, 7]\` (n=9)

| Bước | \`l\` | \`r\` | \`h[l]\` | \`h[r]\` | \`min\` | \`r-l\` | area | best | Dịch |
|------|----:|----:|-------:|-------:|------:|------:|-----:|-----:|------|
| 1 | 0 | 8 | 1 | 7 | 1 | 8 | 8  | 8  | \`l++\` (h[l] thấp) |
| 2 | 1 | 8 | 8 | 7 | 7 | 7 | 49 | 49 | \`r--\` (h[r] thấp) |
| 3 | 1 | 7 | 8 | 3 | 3 | 6 | 18 | 49 | \`r--\` |
| 4 | 1 | 6 | 8 | 8 | 8 | 5 | 40 | 49 | \`r--\` (bằng → dịch r) |
| 5 | 1 | 5 | 8 | 4 | 4 | 4 | 16 | 49 | \`r--\` |
| 6 | 1 | 4 | 8 | 5 | 5 | 3 | 15 | 49 | \`r--\` |
| 7 | 1 | 3 | 8 | 2 | 2 | 2 | 4  | 49 | \`r--\` |
| 8 | 1 | 2 | 8 | 6 | 6 | 1 | 6  | 49 | \`r--\` → \`l==r\` dừng |

Kết quả **best = 49** (giữa thanh chỉ số 1 cao 8 và chỉ số 8 cao 7: $7 \\times 7 = 49$). Brute-force phải thử $C(9,2)=36$ cặp; two pointers chỉ 8 bước.

> **⚠ Lỗi thường gặp.** Dịch nhầm con trỏ ở thanh **cao hơn** thì có thể bỏ sót nghiệm. Phải luôn dịch con trỏ ở thanh **thấp hơn** — đó là cái duy nhất có cơ hội cải thiện diện tích.

> **🔁 Dừng lại tự kiểm tra.**
> 1. Với two-sum sorted, khi \`sum < target\` ta dịch con trỏ nào và vì sao?
> 2. Trong container water, nếu \`height[l] == height[r]\` thì dịch con trỏ nào? Có ảnh hưởng kết quả không?
>
> <details><summary>Đáp án</summary>
>
> 1. Dịch \`l\` (\`l++\`): tổng quá nhỏ → cần phần tử lớn hơn → tiến từ phía nhỏ.
> 2. Dịch con nào cũng được (code trên dịch \`r\`). Vì cả hai thanh bằng nhau, mọi cặp mới đều có \`min\` ≤ giá trị hiện tại và khoảng cách nhỏ hơn → không thể tốt hơn cặp hiện tại; ta chỉ cần loại một thanh để đi tiếp. Kết quả cuối không đổi.
> </details>

> **📝 Tóm tắt mục 2.** Đối đầu: \`l=0, r=n-1\`, vòng \`for l < r\`, mỗi bước **loại một đầu**. Dùng cho mảng **sorted** (two-sum) hoặc bài **đối xứng** (palindrome). Quy tắc dịch luôn dựa trên so sánh để loại đơn điệu.

---

## 3. Biến thể 2 — Cùng chiều (Same direction / fast-slow ghi/đọc)

Hai con trỏ **cùng đi từ trái sang phải** nhưng với **tốc độ hoặc điều kiện khác nhau**. Mẫu kinh điển: một con trỏ **\`slow\`** đánh dấu "vị trí ghi tiếp theo", một con trỏ **\`fast\`** quét "đọc" toàn bộ mảng. Dùng cho **chỉnh sửa tại chỗ (in-place)** với O(1) bộ nhớ.

### 3.1 Remove duplicates in-place (mảng sorted)

> **Bài toán.** Mảng sorted, xoá các phần tử lặp **tại chỗ**, trả về độ dài mới. Vd \`[1,1,2,2,2,3]\` → \`[1,2,3,...]\`, độ dài 3.

\`\`\`go
// removeDuplicates: mảng sorted, xoá lặp in-place, trả độ dài mới.
// slow = số phần tử duy nhất đã ghi; fast = đang đọc.
// O(n) thời gian, O(1) bộ nhớ.
func removeDuplicates(a []int) int {
    if len(a) == 0 {
        return 0
    }
    slow := 0 // a[0..slow] là các giá trị duy nhất
    for fast := 1; fast < len(a); fast++ {
        if a[fast] != a[slow] { // gặp giá trị MỚI
            slow++
            a[slow] = a[fast] // ghi vào vị trí kế tiếp
        }
        // nếu a[fast] == a[slow]: trùng → bỏ qua, fast tự tiến
    }
    return slow + 1 // số phần tử duy nhất
}
\`\`\`

#### Walk-through: \`a = [1, 1, 2, 2, 2, 3]\`

| \`fast\` | \`a[fast]\` | \`slow\` | \`a[slow]\` | Khác? | Hành động | Mảng \`a[0..slow]\` |
|-------:|----------:|-------:|----------:|:-----:|-----------|-------------------|
| 1 | 1 | 0 | 1 | không | bỏ qua | \`[1]\` |
| 2 | 2 | 0 | 1 | có | \`slow=1; a[1]=2\` | \`[1,2]\` |
| 3 | 2 | 1 | 2 | không | bỏ qua | \`[1,2]\` |
| 4 | 2 | 1 | 2 | không | bỏ qua | \`[1,2]\` |
| 5 | 3 | 1 | 2 | có | \`slow=2; a[2]=3\` | \`[1,2,3]\` |

Trả về \`slow + 1 = 3\`. Mảng đầu trở thành \`[1,2,3,2,2,3]\` — phần \`a[0..2]\` là kết quả, phần sau là rác bỏ qua.

### 3.2 Move zeros

> **Bài toán.** Đẩy mọi số 0 về cuối mảng, giữ nguyên thứ tự tương đối các phần tử khác. Vd \`[0,1,0,3,12]\` → \`[1,3,12,0,0]\`.

\`\`\`go
// moveZeros: đẩy số 0 về cuối, giữ thứ tự phần tử khác 0.
// slow = vị trí ghi phần tử khác 0 tiếp theo.
// O(n) thời gian, O(1) bộ nhớ.
func moveZeros(a []int) {
    slow := 0
    for fast := 0; fast < len(a); fast++ {
        if a[fast] != 0 {
            a[slow], a[fast] = a[fast], a[slow] // đưa phần tử khác 0 lên trước
            slow++
        }
    }
}
\`\`\`

#### Walk-through: \`a = [0, 1, 0, 3, 12]\`

| \`fast\` | \`a[fast]\` | \`slow\` | Hành động (swap nếu ≠0) | Mảng sau |
|-------:|----------:|-------:|--------------------------|----------|
| 0 | 0 | 0 | bỏ qua | \`[0,1,0,3,12]\` |
| 1 | 1 | 0 | swap(0,1), slow=1 | \`[1,0,0,3,12]\` |
| 2 | 0 | 1 | bỏ qua | \`[1,0,0,3,12]\` |
| 3 | 3 | 1 | swap(1,3), slow=2 | \`[1,3,0,0,12]\` |
| 4 | 12| 2 | swap(2,4), slow=3 | \`[1,3,12,0,0]\` |

Kết quả \`[1,3,12,0,0]\` ✓. \`slow\` luôn trỏ tới chỗ trống đầu tiên dành cho phần tử khác 0.

### 3.3 Partition (phân hoạch quanh pivot)

Đây chính là bước \`partition\` của quicksort ([Lesson 08](../lesson-08-quicksort/)) nhìn dưới góc two pointers cùng chiều: \`slow\` đánh dấu ranh giới "đã nhỏ hơn pivot", \`fast\` quét tìm phần tử nhỏ hơn pivot để đẩy lên.

\`\`\`go
// partition: đưa mọi phần tử < pivot lên đầu. Trả về số phần tử < pivot.
func partition(a []int, pivot int) int {
    slow := 0
    for fast := 0; fast < len(a); fast++ {
        if a[fast] < pivot {
            a[slow], a[fast] = a[fast], a[slow]
            slow++
        }
    }
    return slow
}
\`\`\`

> **❓ Câu hỏi tự nhiên.** *"Sao move zeros dùng swap, còn remove duplicates dùng gán?"* — Remove duplicates chỉ cần **giữ** các giá trị duy nhất, phần sau là rác nên ghi đè (gán) là đủ. Move zeros phải **bảo toàn** cả số 0 lẫn số khác 0 (chỉ đổi vị trí) nên dùng swap để không mất dữ liệu.

> **📝 Tóm tắt mục 3.** Cùng chiều: \`slow\` = con trỏ ghi/ranh giới, \`fast\` = con trỏ đọc/quét. Một lượt O(n), bộ nhớ O(1). Dùng cho **sửa mảng tại chỗ**: dedup, move zeros, partition.

---

## 4. Biến thể 3 — Fast-slow (Floyd's cycle detection)

Hai con trỏ cùng xuất phát, **\`slow\` đi 1 bước**, **\`fast\` đi 2 bước**. Mẫu này khai thác trên **linked list** ([DataStructures — Linked List](../../DataStructures/)).

### 4.1 Phát hiện chu trình (cycle detection)

> **💡 Trực giác (đường đua).** Trên một đường đua **vòng tròn**, một người chạy nhanh gấp đôi người chạy chậm. Nếu có vòng (cycle), người nhanh sẽ "vòng lại" và **bắt kịp** người chậm từ phía sau — họ chắc chắn gặp nhau. Nếu đường **thẳng** (không vòng), người nhanh chạm cuối đường (\`nil\`) mà không bao giờ gặp lại. Đó chính là Floyd: nếu \`fast\` gặp \`slow\` → có cycle; nếu \`fast\` chạm \`nil\` → không có cycle.

\`\`\`go
type ListNode struct {
    Val  int
    Next *ListNode
}

// hasCycle: phát hiện chu trình bằng fast-slow. O(n) thời gian, O(1) bộ nhớ.
func hasCycle(head *ListNode) bool {
    slow, fast := head, head
    for fast != nil && fast.Next != nil { // null-check CẢ fast lẫn fast.Next
        slow = slow.Next      // +1 bước
        fast = fast.Next.Next // +2 bước
        if slow == fast {     // gặp nhau → có cycle
            return true
        }
    }
    return false // fast chạm nil → list thẳng, không cycle
}
\`\`\`

> **⚠ Lỗi thường gặp.** Quên kiểm tra **cả** \`fast != nil\` **và** \`fast.Next != nil\`. Nếu chỉ check \`fast != nil\` thì \`fast.Next.Next\` sẽ panic (nil pointer dereference) khi \`fast.Next == nil\`. Thứ tự cũng quan trọng: Go đánh giá \`&&\` ngắn mạch, nên \`fast != nil\` phải đứng trước.

#### Walk-through: list \`1 → 2 → 3 → 4 → 2\` (node 4 trỏ ngược về node 2, tạo cycle)

Đánh số node theo giá trị. \`slow\` đi 1, \`fast\` đi 2:

| Bước | \`slow\` ở | \`fast\` ở | Gặp nhau? |
|------|:--------:|:--------:|:---------:|
| 0 (đầu) | 1 | 1 | (chưa di chuyển) |
| 1 | 2 | 3 | không |
| 2 | 3 | 2 (4→2) | không |
| 3 | 4 | 4 (2→3→4) | **gặp tại node 4** → return true |

Vì \`fast\` nhanh hơn 1 đơn vị mỗi bước, trong vòng tròn dài \`C\`, khoảng cách giữa hai con trỏ giảm đúng 1 mỗi bước → sau tối đa \`C\` bước chúng gặp nhau. Tổng thời gian O(n).

### 4.2 Tìm điểm bắt đầu chu trình

Sau khi \`slow\` và \`fast\` gặp nhau, có một mẹo toán học đẹp: **đặt một con trỏ về \`head\`, giữ con trỏ kia ở điểm gặp, cho cả hai đi 1 bước/lần — chúng gặp nhau đúng tại điểm bắt đầu cycle**.

> **Vì sao đúng (chứng minh từng bước).** Gọi:
> - \`a\` = khoảng cách từ \`head\` tới điểm bắt đầu cycle.
> - \`b\` = khoảng cách từ điểm bắt đầu cycle tới điểm gặp (theo chiều đi).
> - \`c\` = phần còn lại của vòng (\`b + c = C\`, chu vi cycle).
>
> Khi gặp nhau: \`slow\` đã đi $a + b$; \`fast\` đã đi $a + b + k \\cdot C$ (đi thêm $k$ vòng). Vì \`fast\` đi gấp đôi: $2(a+b) = a + b + k \\cdot C$ → $a + b = k \\cdot C$ → **$a = k \\cdot C - b = (k-1) \\cdot C + (C - b) = (k-1) \\cdot C + c$**.
>
> Nghĩa là: đi từ \`head\` \`a\` bước **đồng nghĩa** với đi từ điểm gặp \`c\` bước (cộng vài vòng nguyên). Vậy đặt một con trỏ ở \`head\`, một ở điểm gặp, cùng đi 1 bước/lần → chúng gặp đúng tại **điểm bắt đầu cycle**.

\`\`\`go
// detectCycleStart: trả về node bắt đầu chu trình, hoặc nil nếu không có.
// O(n) thời gian, O(1) bộ nhớ.
func detectCycleStart(head *ListNode) *ListNode {
    slow, fast := head, head
    for fast != nil && fast.Next != nil {
        slow = slow.Next
        fast = fast.Next.Next
        if slow == fast { // pha 1: tìm điểm gặp
            // pha 2: tìm điểm bắt đầu
            p := head
            for p != slow {
                p = p.Next
                slow = slow.Next
            }
            return p // điểm bắt đầu cycle
        }
    }
    return nil
}
\`\`\`

### 4.3 Tìm phần tử giữa (middle)

\`fast\` đi gấp đôi → khi \`fast\` chạm cuối, \`slow\` ở **chính giữa**.

\`\`\`go
// middleNode: trả về node giữa (nếu chẵn, trả node giữa thứ 2). O(n), O(1).
func middleNode(head *ListNode) *ListNode {
    slow, fast := head, head
    for fast != nil && fast.Next != nil {
        slow = slow.Next
        fast = fast.Next.Next
    }
    return slow
}
\`\`\`

Vd list \`1→2→3→4→5\` (lẻ): khi \`fast\` đi 1→3→5 (chạm cuối), \`slow\` đi 1→2→3 → trả node **3** (giữa). List \`1→2→3→4\` (chẵn): \`fast\` 1→3→nil, \`slow\` 1→2→3 → trả node **3** (giữa thứ hai).

> **🔁 Dừng lại tự kiểm tra.**
> 1. Vì sao điều kiện vòng lặp Floyd phải là \`fast != nil && fast.Next != nil\` chứ không chỉ \`fast != nil\`?
> 2. Sau khi gặp nhau ở pha 1, ta đặt con trỏ thứ hai ở đâu để tìm điểm bắt đầu cycle?
>
> <details><summary>Đáp án</summary>
>
> 1. Vì \`fast\` nhảy 2 bước (\`fast.Next.Next\`). Nếu \`fast.Next == nil\` mà ta vẫn truy cập \`fast.Next.Next\` → nil panic. Cần đảm bảo cả \`fast\` lẫn \`fast.Next\` không nil trước khi nhảy.
> 2. Đặt một con trỏ về \`head\`, giữ con trỏ kia ở **điểm gặp**, cùng đi 1 bước/lần — chúng gặp tại điểm bắt đầu cycle (vì $a = (k-1) \\cdot C + c$).
> </details>

> **📝 Tóm tắt mục 4.** Fast-slow: \`slow += 1\`, \`fast += 2\`. Gặp nhau → có cycle; \`fast\` chạm \`nil\` → không. Mẹo $a = k \\cdot C - b$ cho phép tìm điểm bắt đầu cycle. Cùng kỹ thuật còn tìm được **middle**. Luôn null-check \`fast\` và \`fast.Next\`.

---

## 5. Sliding Window là một biến thể (tease Lesson 14)

Khi hai con trỏ cùng chiều nhưng **khoảng cách giữa chúng biểu diễn một "cửa sổ"** (window) — \`left\` co/giãn để giữ một bất biến (vd "tổng ≤ K", "không trùng ký tự") — ta gọi đó là **sliding window**. Nó là một **chuyên biệt hoá** của two pointers cùng chiều, áp dụng cho bài "đoạn con / cửa sổ con thoả điều kiện".

Ví dụ tease: *tìm đoạn con ngắn nhất có tổng ≥ K* — \`right\` mở rộng cửa sổ, \`left\` co lại khi tổng đủ. Sẽ học kỹ ở **[Lesson 14 — Sliding Window](../lesson-14-sliding-window/)**.

---

## 6. Khi nào dùng Two Pointers?

| Tín hiệu trong đề | Biến thể nên dùng |
|-------------------|-------------------|
| Mảng **đã/được sắp xếp** + tìm cặp/bộ ba có tổng | **Đối đầu** (two-sum, 3-sum) |
| Bài toán **đối xứng** (palindrome, reverse) | **Đối đầu** |
| Tối ưu hoá hai đầu (container water, trapping rain) | **Đối đầu** |
| **Sửa mảng tại chỗ** O(1) bộ nhớ (dedup, move, partition) | **Cùng chiều** |
| **Linked list** có thể có chu trình | **Fast-slow** |
| Tìm **middle** / phần tử thứ \`k\` từ cuối linked list | **Fast-slow** |
| Đoạn con / cửa sổ con thoả điều kiện | **Sliding window** (L14) |

> **💡 Heuristic nhanh.** Thấy chữ **"sorted"** + **"cặp/bộ"** → nghĩ ngay đối đầu. Thấy **"in-place"** + **"O(1) bộ nhớ"** → cùng chiều. Thấy **"linked list"** + **"cycle/middle"** → fast-slow.

---

## 7. Three-sum (ứng dụng tổng hợp)

> **Bài toán.** Tìm mọi bộ ba **phân biệt** \`(a, b, c)\` trong mảng sao cho \`a + b + c == 0\`, không trùng bộ.

**Chiến lược:** sort mảng, rồi **cố định một phần tử \`a[i]\`** và dùng **two pointers đối đầu** trên phần còn lại để tìm hai số cộng lại bằng \`-a[i]\`. Độ phức tạp: sort O(n log n) + vòng ngoài n lần × two-pointer O(n) = **O(n²)** (thay vì O(n³) brute-force ba vòng lồng).

\`\`\`go
import "sort"

// threeSum: mọi bộ ba phân biệt có tổng 0. O(n²) thời gian.
func threeSum(nums []int) [][]int {
    sort.Ints(nums) // bắt buộc sort để dùng two-pointer + skip trùng
    res := [][]int{}
    n := len(nums)
    for i := 0; i < n-2; i++ {
        if i > 0 && nums[i] == nums[i-1] {
            continue // SKIP trùng cho phần tử cố định
        }
        if nums[i] > 0 {
            break // nums sorted: nếu nums[i] > 0 thì 3 số đều > 0, vô nghiệm
        }
        l, r := i+1, n-1
        for l < r {
            sum := nums[i] + nums[l] + nums[r]
            switch {
            case sum == 0:
                res = append(res, []int{nums[i], nums[l], nums[r]})
                // skip trùng cho l và r
                for l < r && nums[l] == nums[l+1] {
                    l++
                }
                for l < r && nums[r] == nums[r-1] {
                    r--
                }
                l++
                r--
            case sum < 0:
                l++ // cần lớn hơn
            default:
                r-- // cần nhỏ hơn
            }
        }
    }
    return res
}
\`\`\`

#### Walk-through: \`nums = [-1, 0, 1, 2, -1, -4]\` → sort → \`[-4, -1, -1, 0, 1, 2]\`

| \`i\` | \`nums[i]\` | Cố định, tìm tổng = | \`l\`,\`r\` quét | Kết quả |
|----:|----------:|---------------------|--------------|---------|
| 0 | -4 | 4 | l=1..r=5: max \`-1+2=1 < 4\` → không có | — |
| 1 | -1 | 1 | l=2(-1),r=5(2): \`-1+2=1=−nums[i]\` → tổng \`-1-1+2=0\` ✓ ghi \`[-1,-1,2]\`; rồi l=3(0),r=4(1): \`0+1=1\` ✓ tổng \`-1+0+1=0\` ghi \`[-1,0,1]\` | 2 bộ |
| 2 | -1 | (trùng nums[1]) | **skip** | — |
| 3 | 0 | — | \`nums[i]=0\`, nhưng \`0 > 0\` sai → vẫn quét l=4,r=5: \`1+2=3≠0\` | — |

Kết quả: \`[[-1,-1,2], [-1,0,1]]\`. Không có bộ trùng nhờ \`skip\`.

> **⚠ Lỗi thường gặp (3-sum).** **Quên skip trùng** → kết quả có bộ lặp như \`[-1,0,1]\` xuất hiện 2 lần. Phải skip ở **cả 3 chỗ**: phần tử cố định \`i\` (so với \`i-1\`), và \`l\`/\`r\` sau khi tìm thấy một nghiệm.

---

## 8. So sánh với brute-force và hash

Lấy **two-sum** làm chuẩn so sánh:

| Cách | Thời gian | Bộ nhớ | Cần sorted? | Giữ chỉ số gốc? |
|------|-----------|--------|-------------|-----------------|
| Brute-force (2 vòng) | O(n²) | O(1) | không | có |
| **Two pointers** | O(n) *(nếu đã sorted)*; O(n log n) nếu phải sort | **O(1)** | **có** | không (sort làm xáo chỉ số) |
| **Hash map** | O(n) | O(n) | không | có |

> **❓ Câu hỏi: khi nào two-pointer tốt hơn hash?**
> - **Mảng đã sorted sẵn** → two-pointer cho O(n) **không tốn O(n) bộ nhớ phụ** như hash. Đây là lợi thế lớn khi bộ nhớ chật.
> - **Cần O(1) bộ nhớ** (đề ràng buộc) → two-pointer thắng.
> - **3-sum / 4-sum** → two-pointer kết hợp sort cho code gọn O(n²)/O(n³); hash phức tạp và tốn bộ nhớ hơn.
>
> **Khi nào hash tốt hơn?**
> - **Mảng CHƯA sorted và cần chỉ số gốc** (như bài LeetCode Two Sum cổ điển) → hash O(n) thắng vì sort sẽ phá chỉ số.
> - Không thể/không nên sort (vd dữ liệu streaming) → hash.

#### Walk-through số: two-sum trên mảng chưa sorted cần chỉ số gốc

\`a = [3, 2, 4]\`, \`target = 6\`, cần **chỉ số** của hai số (đáp án \`1, 2\` vì \`2 + 4 = 6\`).

- **Hash:** duyệt, lưu \`value → index\`. Tại \`a[2]=4\`, tìm \`6-4=2\` trong map → thấy index 1 → trả \`(1, 2)\`. O(n), giữ đúng chỉ số gốc.
- **Two-pointer:** phải sort → \`[2,3,4]\` (chỉ số gốc \`[1,0,2]\`). Two-pointer tìm cặp \`(2,4)\` nhưng giờ phải **lần ngược** chỉ số gốc → rườm rà. → Hash gọn hơn ở đây.

> **📝 Tóm tắt mục 8.** Sorted sẵn / cần O(1) space / bài k-sum → **two-pointer**. Chưa sorted + cần chỉ số gốc / không sort được → **hash**.

---

## 9. Cạm bẫy thường gặp

| Cạm bẫy | Hậu quả | Cách tránh |
|---------|---------|------------|
| **Quên sort** trước khi dùng đối đầu | Logic "dịch trái/phải" sai → kết quả sai | Luôn \`sort.Ints(a)\` nếu thuật toán dựa vào thứ tự |
| **Off-by-one \`l < r\` vs \`l <= r\`** | \`l == r\` so sánh phần tử với chính nó (two-sum cần cặp **khác nhau** → dùng \`l < r\`) | Two-sum/3-sum: \`l < r\`. Bài cho phép trùng index thì cân nhắc \`l <= r\` |
| **Quên skip duplicate** trong 3-sum | Kết quả có bộ lặp | Skip ở \`i\`, \`l\`, \`r\` |
| **Quên null-check** fast-slow | Nil pointer panic ở \`fast.Next.Next\` | \`for fast != nil && fast.Next != nil\` |
| Dịch nhầm con trỏ (container water) | Bỏ sót nghiệm tối ưu | Luôn dịch con trỏ ở thanh **thấp hơn** |
| Sửa mảng nhưng quên \`slow\` chỉ là **độ dài**, phần đuôi là rác | Dùng nhầm phần đuôi | Chỉ đọc \`a[0..slow]\` (dedup) |

> **⚠ Ví dụ phản chứng off-by-one.** Với \`twoSumSorted([3,3], 6)\`: dùng \`l < r\` → \`l=0, r=1\`, \`3+3=6\` ✓ trả \`(0,1)\`. Nếu lỡ dùng điều kiện cho phép \`l == r\` và mảng \`[3]\` với target 6, ta sẽ "thấy" \`3+3=6\` từ **một phần tử dùng hai lần** — sai, vì bài đòi hai phần tử **khác chỉ số**.

---

## Bài tập

Làm trước khi xem lời giải bên dưới.

1. **Two-sum sorted.** Cho mảng sorted và \`target\`, trả về chỉ số (1-based) của cặp có tổng bằng \`target\`. Đảm bảo có đúng một nghiệm.
2. **Valid palindrome.** Cho chuỗi, kiểm tra palindrome **chỉ xét ký tự chữ-số** (alphanumeric), bỏ qua hoa/thường và dấu câu. Vd \`"A man, a plan, a canal: Panama"\` → \`true\`.
3. **Container with most water.** Cho \`height[]\`, trả về lượng nước tối đa.
4. **3-sum = 0.** Trả về mọi bộ ba phân biệt có tổng 0.
5. **Detect cycle + find start.** Cho linked list, trả về node bắt đầu chu trình (hoặc \`nil\`).
6. **Sort colors (Dutch national flag).** Mảng chỉ gồm 0, 1, 2. Sắp xếp tại chỗ một lượt bằng **3 con trỏ**. Vd \`[2,0,2,1,1,0]\` → \`[0,0,1,1,2,2]\`.

---

## Lời giải chi tiết

### Bài 1 — Two-sum sorted

**Cách tiếp cận:** đối đầu, đã có ở mục 2.1. Trả về chỉ số 1-based.

\`\`\`go
func twoSumSorted1Based(a []int, target int) (int, int) {
    l, r := 0, len(a)-1
    for l < r {
        sum := a[l] + a[r]
        if sum == target {
            return l + 1, r + 1 // 1-based
        } else if sum < target {
            l++
        } else {
            r--
        }
    }
    return -1, -1
}
\`\`\`

**Walk-through** \`a=[2,3,4]\`, target=6: l=0,r=2 → \`2+4=6\` ✓ → trả \`(1,3)\`.
**Độ phức tạp:** O(n) thời gian, O(1) bộ nhớ.

### Bài 2 — Valid palindrome (bỏ non-alphanumeric)

**Cách tiếp cận:** đối đầu, nhưng **bỏ qua** ký tự không phải chữ-số bằng cách cho \`l\`/\`r\` "nhảy". So sánh sau khi chuẩn hoá về chữ thường.

\`\`\`go
func isAlnum(c byte) bool {
    return (c >= 'a' && c <= 'z') || (c >= 'A' && c <= 'Z') || (c >= '0' && c <= '9')
}
func toLower(c byte) byte {
    if c >= 'A' && c <= 'Z' {
        return c + 32
    }
    return c
}
func validPalindrome(s string) bool {
    l, r := 0, len(s)-1
    for l < r {
        for l < r && !isAlnum(s[l]) { // bỏ ký tự rác bên trái
            l++
        }
        for l < r && !isAlnum(s[r]) { // bỏ ký tự rác bên phải
            r--
        }
        if toLower(s[l]) != toLower(s[r]) {
            return false
        }
        l++
        r--
    }
    return true
}
\`\`\`

**Walk-through** \`"A man, a plan, a canal: Panama"\`: sau khi bỏ rác và hạ chữ thường, hai đầu luôn khớp (\`a==a\`, \`m==m\`, ...) → **true**. Chuỗi \`"race a car"\` → so \`e\` vs \`r\` (sau bỏ space) → khác → **false**.
**Độ phức tạp:** O(n) thời gian (mỗi ký tự thăm tối đa 1 lần), O(1) bộ nhớ.

### Bài 3 — Container with most water

Giống mục 2.3.

\`\`\`go
func maxAreaSol(height []int) int {
    l, r, best := 0, len(height)-1, 0
    for l < r {
        h := height[l]
        if height[r] < h {
            h = height[r]
        }
        if area := h * (r - l); area > best {
            best = area
        }
        if height[l] < height[r] {
            l++
        } else {
            r--
        }
    }
    return best
}
\`\`\`

**Walk-through** \`[1,8,6,2,5,4,8,3,7]\` → **49** (xem bảng mục 2.3).
**Độ phức tạp:** O(n) thời gian, O(1) bộ nhớ.

### Bài 4 — 3-sum = 0

Đã trình bày ở mục 7 (hàm \`threeSum\`). Điểm mấu chốt: **sort → cố định i → two-pointer → skip trùng ở i, l, r**.

**Walk-through** \`[-1,0,1,2,-1,-4]\` → \`[[-1,-1,2],[-1,0,1]]\`.
**Độ phức tạp:** O(n²) thời gian (sort O(n log n) bị nuốt), O(1) bộ nhớ phụ (không kể output).

### Bài 5 — Detect cycle + find start

Đã trình bày ở mục 4.2 (hàm \`detectCycleStart\`).

\`\`\`go
func detectCycleStartSol(head *ListNode) *ListNode {
    slow, fast := head, head
    for fast != nil && fast.Next != nil {
        slow, fast = slow.Next, fast.Next.Next
        if slow == fast {
            p := head
            for p != slow {
                p, slow = p.Next, slow.Next
            }
            return p
        }
    }
    return nil
}
\`\`\`

**Walk-through** \`1→2→3→4→2(cycle)\`: pha 1 gặp tại node 4 (xem mục 4.1); pha 2 đặt \`p=head(1)\`, đi cùng \`slow\`: \`p:1→2\`, \`slow:4→2\` → gặp tại node **2** = điểm bắt đầu cycle.
**Độ phức tạp:** O(n) thời gian, O(1) bộ nhớ. (So với dùng hash-set lưu node đã thăm: cũng O(n) thời gian nhưng O(n) bộ nhớ — Floyd thắng về bộ nhớ.)

### Bài 6 — Sort colors (Dutch national flag, 3 con trỏ)

**Cách tiếp cận:** đây là **mở rộng three-pointer** của two pointers. Ba con trỏ:
- \`low\` = ranh giới phải của vùng đã đặt 0;
- \`high\` = ranh giới trái của vùng đã đặt 2;
- \`i\` = con trỏ quét hiện tại.

Bất biến: \`a[0..low-1]\` toàn 0, \`a[low..i-1]\` toàn 1, \`a[high+1..]\` toàn 2, \`a[i..high]\` chưa xử lý.

\`\`\`go
// sortColors: Dutch national flag, một lượt O(n), O(1) bộ nhớ.
func sortColors(a []int) {
    low, i, high := 0, 0, len(a)-1
    for i <= high {
        switch a[i] {
        case 0:
            a[low], a[i] = a[i], a[low]
            low++
            i++
        case 1:
            i++ // 1 nằm đúng vùng giữa, chỉ tiến i
        case 2:
            a[i], a[high] = a[high], a[i]
            high--
            // KHÔNG tăng i: phần tử vừa swap về từ high chưa được kiểm tra
        }
    }
}
\`\`\`

#### Walk-through: \`a = [2, 0, 2, 1, 1, 0]\`

| \`i\` | \`a\` hiện tại | \`a[i]\` | \`low\` | \`high\` | Hành động |
|----:|--------------|:------:|------:|-------:|-----------|
| 0 | \`[2,0,2,1,1,0]\` | 2 | 0 | 5 | swap(0,5), high=4, **i giữ nguyên** → \`[0,0,2,1,1,2]\` |
| 0 | \`[0,0,2,1,1,2]\` | 0 | 0 | 4 | swap(0,0), low=1, i=1 → \`[0,0,2,1,1,2]\` |
| 1 | \`[0,0,2,1,1,2]\` | 0 | 1 | 4 | swap(1,1), low=2, i=2 |
| 2 | \`[0,0,2,1,1,2]\` | 2 | 2 | 4 | swap(2,4), high=3, i giữ → \`[0,0,1,1,2,2]\` |
| 2 | \`[0,0,1,1,2,2]\` | 1 | 2 | 3 | i=3 |
| 3 | \`[0,0,1,1,2,2]\` | 1 | 2 | 3 | i=4 → \`i > high\` dừng |

Kết quả \`[0,0,1,1,2,2]\` ✓.

> **⚠ Lỗi thường gặp.** Khi gặp \`2\` và swap với \`high\`, **không được tăng \`i\`** — vì phần tử mới hoán về từ \`high\` chưa được kiểm tra (có thể là 0). Khi gặp \`0\` swap với \`low\` thì tăng cả \`low\` và \`i\` (vì phần tử từ \`low\` đã được xử lý — nó là \`1\` đã nằm đúng vùng, hoặc \`low==i\`).

**Độ phức tạp:** O(n) thời gian (một lượt), O(1) bộ nhớ.

---

## Code & Minh họa

- Toàn bộ code Go đã được nhúng inline trong các mục trên (two-sum sorted, palindrome, container water, remove duplicates, move zeros, Floyd cycle + find start, three-sum, sort colors).
- [visualization.html](./visualization.html) — 3 module tương tác: (1) **Đối đầu** (two-sum sorted, animate \`l\`/\`r\` tiến vào giữa); (2) **Fast-slow cycle** (linked list có cycle, \`slow\`/\`fast\` gặp nhau); (3) **Three-sum** (cố định \`i\`, two-pointer quét).

## Bài tiếp theo

→ [Lesson 14 — Sliding Window](../lesson-14-sliding-window/): biến thể two-pointers cùng chiều cho bài "cửa sổ con / đoạn con thoả điều kiện" — co/giãn cửa sổ để giữ bất biến.
`;
