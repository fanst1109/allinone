// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: Algorithms/lesson-24-dp-1d/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 24 — Quy hoạch động 1 chiều (1D Dynamic Programming)

> **Tier 4 — Dynamic Programming · Bài 24/?**
> Tiền đề: [Lesson 23 — DP Fundamentals](../lesson-23-dp-fundamentals/) (state, transition, memoization, tabulation), [Lesson 05 — Brute-force → Optimize](../lesson-05-bruteforce-to-optimize/) (Kadane lần đầu xuất hiện), [Lesson 12 — Binary Search Variants](../lesson-12-binary-search-variants/) (dùng cho LIS O(n log n)).

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Nhận diện **dạng DP đơn giản nhất**: state chỉ là **một chỉ số** \`dp[i]\`, transition chỉ phụ thuộc vài phần tử liền trước (\`dp[i-1]\`, \`dp[i-2]\`, ...).
- Giải thành thạo bộ bài kinh điển: **climbing stairs, house robber I/II, max subarray (Kadane), decode ways, min cost climbing stairs, word break, LIS, max product subarray**.
- Biết **tối ưu không gian** từ \`O(n)\` xuống \`O(1)\` bằng kỹ thuật "rolling variable".
- Tránh được các cạm bẫy: Kadane reset-vs-continue, LIS hai phiên bản, số \`'0'\` trong decode ways, quên track \`min\` trong product subarray, off-by-one ở base case.

---

## 1. DP 1 chiều là gì?

> **💡 Trực giác / Hình dung.** Hãy tưởng tượng bạn đi dọc một hành lang có nhiều ô số \`0, 1, 2, ..., n-1\`. Tại mỗi ô bạn đưa ra **một quyết định** (lấy hay không, dừng hay đi tiếp), và quyết định tốt nhất tại ô \`i\` chỉ phụ thuộc vào **kết quả tốt nhất của vài ô ngay trước nó** — không cần nhớ toàn bộ lịch sử. Đó chính là DP 1 chiều: bạn xây một bảng \`dp[]\` một chiều, điền từ trái sang phải, mỗi ô tổng hợp lại từ vài ô trước.

DP 1D là họ bài toán mà:

- **State (trạng thái)** được mô tả bằng **một chỉ số duy nhất** \`i\` — thường là "đã xét tới phần tử thứ \`i\`" hoặc "kết thúc đúng tại \`i\`".
- **Transition (công thức truy hồi)** tính \`dp[i]\` từ một số hằng các ô trước: \`dp[i-1]\`, \`dp[i-2]\`, đôi khi quét ngược tới mọi \`j < i\`.
- **Base case** khởi tạo cho 1-2 ô đầu tiên.
- **Đáp án** nằm ở \`dp[n-1]\`, \`dp[n]\`, hoặc \`max(dp[i])\` tùy bài.

So với DP nhiều chiều (sẽ học ở [Lesson 25 — Knapsack](../lesson-25-knapsack-family/) trở đi, state là \`dp[i][w]\`), DP 1D là **dạng vào cửa**: chỉ một vòng \`for\`, một mảng.

> **❓ Câu hỏi tự nhiên của người đọc.**
> - *"DP 1D khác gì đệ quy thường?"* — Đệ quy thường tính lại các bài con trùng nhau (exponential). DP 1D lưu kết quả bài con vào \`dp[]\`, mỗi state tính **đúng một lần** → tuyến tính.
> - *"Vì sao gọi là 1 chiều?"* — Vì bảng kết quả là mảng 1 chiều. Số chiều của bảng = số tham số cần để xác định một state.
> - *"Có phải mọi bài mảng đều là DP 1D?"* — Không. Chỉ khi quyết định tối ưu tại \`i\` **tổng hợp được** từ kết quả tối ưu của các vị trí trước (tính chất "tối ưu con" — optimal substructure).

### 1.1 Khung sườn chung của mọi bài DP 1D

\`\`\`go
// Khung tabulation (bottom-up) điển hình cho DP 1D.
func dp1D(n int) int {
    dp := make([]int, n+1)
    dp[0] = baseValue0 // base case
    if n >= 1 {
        dp[1] = baseValue1
    }
    for i := 2; i <= n; i++ {
        // transition: tổng hợp từ vài ô trước
        dp[i] = combine(dp[i-1], dp[i-2] /*, ...*/)
    }
    return dp[n]
}
\`\`\`

Bốn câu hỏi cần trả lời cho **mọi** bài DP 1D:

1. **\`dp[i]\` nghĩa là gì?** (định nghĩa state — phải viết bằng tiếng người, rõ ràng).
2. **Transition?** (\`dp[i]\` = ... theo các ô trước).
3. **Base case?** (giá trị \`dp[0]\`, \`dp[1]\`).
4. **Đáp án nằm ở đâu?** (\`dp[n]\`, hay \`max(dp[i])\`).

> **📝 Tóm tắt mục 1.**
> - DP 1D: state = 1 chỉ số \`dp[i]\`, transition từ vài ô liền trước.
> - Quy trình: định nghĩa state → transition → base case → vị trí đáp án.
> - Là dạng DP đơn giản nhất, một vòng for, một mảng.

---

## 2. Climbing stairs (Leo cầu thang) — recap

> **💡 Trực giác.** Bạn đứng dưới chân thang \`n\` bậc, mỗi bước nhảy **1 hoặc 2** bậc. Có bao nhiêu cách lên đỉnh? Để đến bậc \`i\`, bước cuối hoặc từ bậc \`i-1\` (nhảy 1) hoặc từ bậc \`i-2\` (nhảy 2). Vậy số cách đến \`i\` = số cách đến \`i-1\` cộng số cách đến \`i-2\`. Đây chính là dãy Fibonacci đội lốt.

- **State:** \`dp[i]\` = số cách lên đến bậc \`i\`.
- **Transition:** \`dp[i] = dp[i-1] + dp[i-2]\`.
- **Base case:** \`dp[0] = 1\` (đứng yên, 1 cách), \`dp[1] = 1\`.
- **Đáp án:** \`dp[n]\`.

### Walk-through với \`n = 5\`

| i | dp[i] | Cách tính |
|---|-------|-----------|
| 0 | 1 | base |
| 1 | 1 | base |
| 2 | 2 | dp[1]+dp[0] = 1+1 |
| 3 | 3 | dp[2]+dp[1] = 2+1 |
| 4 | 5 | dp[3]+dp[2] = 3+2 |
| 5 | **8** | dp[4]+dp[3] = 5+3 |

Bốn ví dụ số: \`n=1 → 1\`, \`n=2 → 2\`, \`n=3 → 3\`, \`n=5 → 8\`. (Đúng dãy Fibonacci dịch chỉ số.)

\`\`\`go
// Climbing stairs — O(n) thời gian, O(1) không gian.
// dp[i] = dp[i-1] + dp[i-2], nhưng ta chỉ giữ 2 biến gần nhất.
func climbStairs(n int) int {
    if n <= 2 {
        return n // n=1 → 1, n=2 → 2
    }
    prev2, prev1 := 1, 2 // dp[1]=1, dp[2]=2
    for i := 3; i <= n; i++ {
        cur := prev1 + prev2 // dp[i] = dp[i-1] + dp[i-2]
        prev2, prev1 = prev1, cur
    }
    return prev1
}
// Walk-through n=5: (p2,p1) khởi đầu (1,2)
//   i=3: cur=3 → (2,3)
//   i=4: cur=5 → (3,5)
//   i=5: cur=8 → (5,8) → trả 8 ✓
\`\`\`

> **⚠ Lỗi thường gặp.** Đặt \`dp[0] = 0\` thay vì \`1\`. Nếu coi "đứng tại bậc 0 là đã có 1 cách (chưa làm gì)" thì \`dp[0] = 1\`. Nếu base sai, mọi giá trị sau lệch theo. Luôn kiểm tra bằng tay \`dp[2]\` phải bằng \`2\`.

> **🔁 Dừng lại tự kiểm tra.** Với \`n=4\`, có bao nhiêu cách?
> <details><summary>Đáp án</summary>5 cách: 1+1+1+1, 1+1+2, 1+2+1, 2+1+1, 2+2. Khớp \`dp[4]=5\`.</details>

> **📝 Tóm tắt mục 2.** Climbing stairs = Fibonacci. \`dp[i]=dp[i-1]+dp[i-2]\`. Tối ưu xuống \`O(1)\` bằng 2 biến rolling.

---

## 3. House robber (Tên trộm nhà)

> **💡 Trực giác.** Một dãy nhà thẳng hàng, mỗi nhà có số tiền \`nums[i]\`. Tên trộm **không được trộm 2 nhà liền kề** (chuông báo động sẽ kêu). Tối đa trộm được bao nhiêu? Tại mỗi nhà \`i\`, hắn có 2 lựa chọn: (a) **bỏ qua** nhà \`i\` → giữ nguyên thành quả tới \`i-1\`; (b) **trộm** nhà \`i\` → cộng \`nums[i]\` vào thành quả tới \`i-2\` (vì \`i-1\` phải bỏ). Lấy max.

- **State:** \`dp[i]\` = số tiền tối đa trộm được khi xét tới nhà \`i\` (kể cả \`i\`).
- **Transition:** \`dp[i] = max(dp[i-1], dp[i-2] + nums[i])\`.
- **Base case:** \`dp[0] = nums[0]\`, \`dp[1] = max(nums[0], nums[1])\`.
- **Đáp án:** \`dp[n-1]\`.

### Walk-through với \`nums = [2, 7, 9, 3, 1]\`

| i | nums[i] | dp[i-1] (bỏ) | dp[i-2]+nums[i] (trộm) | dp[i] = max |
|---|---------|--------------|------------------------|-------------|
| 0 | 2 | — | — | **2** (base) |
| 1 | 7 | — | — | **7** (max(2,7)) |
| 2 | 9 | 7 | 2+9 = 11 | **11** |
| 3 | 3 | 11 | 7+3 = 10 | **11** |
| 4 | 1 | 11 | 11+1 = 12 | **12** |

Đáp án \`dp[4] = 12\` (trộm nhà 0, 2, 4 → 2+9+1 = 12). Bốn ví dụ: \`[2,7,9,3,1]→12\`, \`[1,2,3,1]→4\`, \`[2,1,1,2]→4\`, \`[5]→5\`.

\`\`\`go
// House robber I — dãy nhà thẳng. O(n) thời gian, O(1) không gian.
func rob(nums []int) int {
    n := len(nums)
    if n == 0 {
        return 0
    }
    if n == 1 {
        return nums[0]
    }
    prev2 := nums[0]              // dp[0]
    prev1 := max(nums[0], nums[1]) // dp[1]
    for i := 2; i < n; i++ {
        // bỏ qua i: prev1 ; trộm i: prev2 + nums[i]
        cur := max(prev1, prev2+nums[i])
        prev2, prev1 = prev1, cur
    }
    return prev1
}

func max(a, b int) int {
    if a > b {
        return a
    }
    return b
}
// Walk-through [2,7,9,3,1]: (p2,p1)=(2,7)
//   i=2: max(7, 2+9=11)=11 → (7,11)
//   i=3: max(11, 7+3=10)=11 → (11,11)
//   i=4: max(11, 11+1=12)=12 → (11,12) → trả 12 ✓
\`\`\`

> **❓ Câu hỏi tự nhiên.**
> - *"Vì sao \`dp[i-2]+nums[i]\` mà không phải \`dp[i-1]+nums[i]\`?"* — Vì trộm \`i\` thì **không được trộm \`i-1\`** (liền kề). Thành quả hợp lệ gần nhất là \`dp[i-2]\`.
> - *"Greedy lấy nhà lớn nhất trước có được không?"* — Không, greedy sai. Vd \`[2,7,9,3,1]\`: greedy chọn 9 rồi 7 (kề) cấm, → kẹt. DP mới đúng. (So sánh kỹ ở [L22](../lesson-22-greedy-vs-dp/).)

> **🔁 Dừng lại tự kiểm tra.** \`nums=[2,1,1,2]\` cho ra bao nhiêu?
> <details><summary>Đáp án</summary>4. dp: 2, max(2,1)=2, max(2,2+1=3)=3, max(3,2+2=4)=4 → 4 (trộm nhà 0 và 3).</details>

> **📝 Tóm tắt mục 3.** House robber: \`dp[i]=max(dp[i-1], dp[i-2]+nums[i])\` — bỏ qua hay trộm. \`O(1)\` không gian.

---

## 4. House robber II (Nhà xếp vòng tròn)

> **💡 Trực giác.** Giống House robber I, nhưng các nhà xếp **thành vòng tròn**: nhà \`0\` và nhà \`n-1\` giờ **liền kề nhau**. Nếu trộm nhà đầu thì không được trộm nhà cuối, và ngược lại. Mẹo: **tách thành 2 bài thẳng** — (A) bỏ nhà cuối, chỉ xét \`nums[0..n-2]\`; (B) bỏ nhà đầu, chỉ xét \`nums[1..n-1]\`. Lấy max của hai. Vì trong mỗi trường hợp con, ràng buộc "đầu-cuối kề nhau" đã bị phá vỡ (một trong hai đầu không còn) → quay về bài thẳng.

- **State + transition:** y hệt House robber I, áp dụng cho hai dải con.
- **Đáp án:** \`max(rob(nums[0:n-1]), rob(nums[1:n]))\`.
- **Edge case:** \`n == 1\` → trả \`nums[0]\` (vòng tròn 1 nhà không tự kề).

### Walk-through với \`nums = [2, 3, 2]\` (vòng tròn)

- Trường hợp A (bỏ nhà cuối) → \`rob([2, 3]) = max(2, 3) = 3\`.
- Trường hợp B (bỏ nhà đầu) → \`rob([3, 2]) = max(3, 2) = 3\`.
- Đáp án = \`max(3, 3) = 3\`. (Không thể trộm cả nhà 0 và nhà 2 vì chúng kề trong vòng, tổng \`2+2=4\` bị cấm.)

Bốn ví dụ: \`[2,3,2]→3\`, \`[1,2,3,1]→4\`, \`[1,2,3]→3\`, \`[200,3,140,20,10]→340\`.

\`\`\`go
// House robber II — vòng tròn. Tách 2 trường hợp tuyến tính.
func robII(nums []int) int {
    n := len(nums)
    if n == 1 {
        return nums[0]
    }
    // A: nhà [0 .. n-2]  (bỏ nhà cuối)
    // B: nhà [1 .. n-1]  (bỏ nhà đầu)
    return max(robLinear(nums[:n-1]), robLinear(nums[1:]))
}

func robLinear(nums []int) int {
    prev2, prev1 := 0, 0
    for _, x := range nums {
        prev2, prev1 = prev1, max(prev1, prev2+x)
    }
    return prev1
}
// Walk-through [2,3,2]:
//   A = robLinear([2,3]) = 3 ; B = robLinear([3,2]) = 3 → max = 3 ✓
\`\`\`

> **⚠ Lỗi thường gặp.** Quên xử lý \`n == 1\` → \`nums[:0]\` và \`nums[1:]\` đều rỗng → trả \`0\` thay vì \`nums[0]\`. Luôn chặn case một phần tử trước.

> **📝 Tóm tắt mục 4.** Vòng tròn = 2 bài thẳng (bỏ đầu / bỏ cuối), lấy max. Nhớ chặn \`n==1\`.

---

## 5. Maximum subarray — thuật toán Kadane (recap qua lăng kính DP)

> **💡 Trực giác.** Cho dãy có cả số âm lẫn dương, tìm **đoạn con liên tiếp** có tổng lớn nhất. Đi từ trái sang phải, tại mỗi vị trí \`i\` bạn hỏi: *"đoạn tốt nhất kết thúc đúng tại \`i\` là gì?"* Hai khả năng: (a) **nối tiếp** đoạn trước (\`dp[i-1] + nums[i]\`); (b) **bắt đầu lại** chỉ với riêng \`nums[i]\`. Chọn lại từ đầu khi đoạn trước đang âm — kéo theo chỉ làm tệ hơn.

- **State:** \`dp[i]\` = tổng lớn nhất của một đoạn con **kết thúc đúng tại \`i\`**.
- **Transition:** \`dp[i] = max(nums[i], dp[i-1] + nums[i])\`.
- **Base case:** \`dp[0] = nums[0]\`.
- **Đáp án:** \`max(dp[i])\` qua mọi \`i\` (không phải \`dp[n-1]\` — vì đoạn tốt nhất có thể kết thúc ở giữa).

> Đây là cùng thuật toán đã gặp ở [Lesson 05](../lesson-05-bruteforce-to-optimize/), nhưng ở đó ta nhìn nó như "chạy tổng tích lũy". Lăng kính DP làm rõ **vì sao** nó đúng: mỗi \`dp[i]\` là một bài con tối ưu.

### Walk-through với \`nums = [-2, 1, -3, 4, -1, 2, 1, -5, 4]\`

| i | nums[i] | dp[i-1]+nums[i] | dp[i] = max(nums[i], ↑) | best |
|---|---------|------------------|--------------------------|------|
| 0 | -2 | — | **-2** | -2 |
| 1 | 1 | -2+1 = -1 | max(1, -1) = **1** (reset) | 1 |
| 2 | -3 | 1-3 = -2 | max(-3, -2) = **-2** | 1 |
| 3 | 4 | -2+4 = 2 | max(4, 2) = **4** (reset) | 4 |
| 4 | -1 | 4-1 = 3 | max(-1, 3) = **3** | 4 |
| 5 | 2 | 3+2 = 5 | max(2, 5) = **5** | 5 |
| 6 | 1 | 5+1 = 6 | max(1, 6) = **6** | **6** |
| 7 | -5 | 6-5 = 1 | max(-5, 1) = **1** | 6 |
| 8 | 4 | 1+4 = 5 | max(4, 5) = **5** | 6 |

Đáp án **6** (đoạn \`[4, -1, 2, 1]\`). Bốn ví dụ: \`[-2,1,-3,4,-1,2,1,-5,4]→6\`, \`[1]→1\`, \`[5,4,-1,7,8]→23\`, \`[-3,-1,-2]→-1\` (toàn âm → chọn phần tử lớn nhất).

\`\`\`go
// Kadane — max subarray sum. O(n) thời gian, O(1) không gian.
func maxSubArray(nums []int) int {
    cur := nums[0]  // dp[i]: đoạn tốt nhất kết thúc tại i
    best := nums[0]
    for i := 1; i < len(nums); i++ {
        // nối tiếp hay bắt đầu lại?
        cur = max(nums[i], cur+nums[i])
        best = max(best, cur)
    }
    return best
}
// Walk-through [-2,1,-3,4,-1,2,1,-5,4]:
//   cur lần lượt: -2,1,-2,4,3,5,6,1,5
//   best lần lượt: -2,1,1,4,4,5,6,6,6 → trả 6 ✓
\`\`\`

> **⚠ Lỗi thường gặp.** Khởi tạo \`best := 0\`. Nếu mảng **toàn số âm** (\`[-3,-1,-2]\`), đáp án phải là \`-1\` (phần tử lớn nhất), nhưng \`best=0\` sẽ trả \`0\` (đoạn rỗng) — sai nếu đề yêu cầu đoạn **không rỗng**. Luôn khởi tạo \`best := nums[0]\`.

> **❓ Câu hỏi tự nhiên.** *"Khi nào reset, khi nào continue?"* — Reset (\`cur = nums[i]\`) khi \`cur + nums[i] < nums[i]\`, tức \`cur < 0\`. Hễ tổng đang âm thì kéo theo chỉ kéo xuống → vứt đi, bắt đầu lại.

> **🔁 Dừng lại tự kiểm tra.** \`[5, 4, -1, 7, 8]\` cho ra bao nhiêu?
> <details><summary>Đáp án</summary>23 (cả mảng: 5+4-1+7+8). Không reset lần nào vì cur luôn dương.</details>

> **📝 Tóm tắt mục 5.** Kadane: \`dp[i]=max(nums[i], dp[i-1]+nums[i])\`, đáp án = \`max(dp[i])\`. Khởi tạo \`best=nums[0]\`.

---

## 6. Decode ways (Số cách giải mã)

> **💡 Trực giác.** Ánh xạ \`A=1, B=2, ..., Z=26\`. Cho một chuỗi số như \`"226"\`, có bao nhiêu cách giải mã thành chữ? \`"226"\` → \`BZ\` (2,26), \`VF\` (22,6), \`BBF\` (2,2,6) → 3 cách. Đi từ trái sang phải, tại vị trí \`i\` bạn hỏi: ký tự cuối có thể đọc **một mình** (1-9) không? hai ký tự cuối có thể đọc **thành cặp** (10-26) không? Cộng số cách tương ứng.

- **State:** \`dp[i]\` = số cách giải mã \`s[0..i-1]\` (i ký tự đầu).
- **Transition:**
  - Nếu \`s[i-1] != '0'\`: \`dp[i] += dp[i-1]\` (đọc 1 ký tự).
  - Nếu \`s[i-2..i-1]\` nằm trong \`[10, 26]\`: \`dp[i] += dp[i-2]\` (đọc 2 ký tự).
- **Base case:** \`dp[0] = 1\` (chuỗi rỗng có 1 cách — đọc xong sạch sẽ).
- **Đáp án:** \`dp[n]\`.

### Walk-through với \`s = "226"\`

| i | xét | 1 ký tự? \`s[i-1]\` | 2 ký tự? \`s[i-2..i-1]\` | dp[i] |
|---|-----|-------------------|------------------------|-------|
| 0 | — | — | — | **1** (base) |
| 1 | "2" | '2'≠'0' → +dp[0]=1 | — | **1** |
| 2 | "22" | '2'≠'0' → +dp[1]=1 | "22"∈[10,26] → +dp[0]=1 | **2** |
| 3 | "226" | '6'≠'0' → +dp[2]=2 | "26"∈[10,26] → +dp[1]=1 | **3** |

Đáp án \`dp[3] = 3\`. Bốn ví dụ: \`"12"→2\` (AB, L), \`"226"→3\`, \`"06"→0\` (số 0 đứng đầu không hợp lệ), \`"10"→1\` (chỉ "J"; "1","0" không hợp lệ vì 0 đứng riêng).

\`\`\`go
// Decode ways — A=1..Z=26. O(n) thời gian, O(1) không gian.
func numDecodings(s string) int {
    if len(s) == 0 || s[0] == '0' {
        return 0
    }
    prev2, prev1 := 1, 1 // dp[0]=1, dp[1]=1 (s[0]!='0' đã chắc)
    for i := 2; i <= len(s); i++ {
        cur := 0
        // đọc 1 ký tự: s[i-1] trong '1'..'9'
        if s[i-1] != '0' {
            cur += prev1
        }
        // đọc 2 ký tự: s[i-2..i-1] trong "10".."26"
        two := (int(s[i-2]-'0'))*10 + int(s[i-1]-'0')
        if two >= 10 && two <= 26 {
            cur += prev2
        }
        prev2, prev1 = prev1, cur
    }
    return prev1
}
// Walk-through "226": (p2,p1)=(1,1)
//   i=2 "22": +p1(1), "22"∈[10,26] +p2(1) → cur=2 → (1,2)
//   i=3 "26": +p1(2), "26"∈[10,26] +p2(1) → cur=3 → (2,3) → trả 3 ✓
\`\`\`

> **⚠ Lỗi thường gặp với \`'0'\`.** Số \`0\` **không có chữ cái** tương ứng (A bắt đầu từ 1). \`'0'\` chỉ hợp lệ khi đi **sau** \`'1'\` hoặc \`'2'\` (thành "10" hoặc "20"). Vd \`"30"\` → 0 cách (3 đứng riêng ổn, nhưng "30" không trong [10,26] và "0" riêng không hợp lệ → kẹt). Nếu gặp \`'0'\` mà không tạo được cặp hợp lệ, \`cur=0\` → toàn bộ chuỗi về sau cũng 0.

> **🔁 Dừng lại tự kiểm tra.** \`"27"\` cho ra mấy cách?
> <details><summary>Đáp án</summary>1 cách (chỉ "BG"). "27" = 27 > 26 nên không đọc cặp được, chỉ tách 2,7.</details>

> **📝 Tóm tắt mục 6.** Decode ways: \`dp[i] = (1 ký tự hợp lệ ? dp[i-1]) + (2 ký tự ∈[10,26] ? dp[i-2])\`. Cẩn thận \`'0'\`.

---

## 7. Min cost climbing stairs (Leo thang chi phí tối thiểu)

> **💡 Trực giác.** Mỗi bậc \`i\` có chi phí \`cost[i]\` để **bước lên từ** bậc đó. Bạn bắt đầu từ bậc 0 hoặc bậc 1 (tùy chọn), mỗi lần leo 1 hoặc 2 bậc, muốn lên tới **đỉnh** (vượt qua bậc cuối) với tổng chi phí nhỏ nhất. Để đứng tại bậc \`i\`, bạn vừa trả \`cost\` rồi bước từ \`i-1\` (leo 1) hoặc \`i-2\` (leo 2). Lấy min.

- **State:** \`dp[i]\` = chi phí tối thiểu để **đến** bậc \`i\` (đứng tại \`i\`, chưa trả \`cost[i]\`).
- **Transition:** \`dp[i] = min(dp[i-1] + cost[i-1], dp[i-2] + cost[i-2])\`.
- **Base case:** \`dp[0] = dp[1] = 0\` (bắt đầu miễn phí ở bậc 0 hoặc 1).
- **Đáp án:** \`dp[n]\` (đỉnh, ngay sau bậc cuối).

### Walk-through với \`cost = [10, 15, 20]\`

| i | dp[i-1]+cost[i-1] | dp[i-2]+cost[i-2] | dp[i] = min |
|---|-------------------|-------------------|-------------|
| 0 | — | — | **0** |
| 1 | — | — | **0** |
| 2 | dp[1]+cost[1]=0+15=15 | dp[0]+cost[0]=0+10=10 | **10** |
| 3 | dp[2]+cost[2]=10+20=30 | dp[1]+cost[1]=0+15=15 | **15** |

Đáp án \`dp[3] = 15\` (bắt đầu từ bậc 1, trả 15, nhảy 2 lên đỉnh). Bốn ví dụ: \`[10,15,20]→15\`, \`[1,100,1,1,1,100,1,1,100,1]→6\`, \`[0,0,0,0]→0\`, \`[1,2]→0\` (bắt đầu bậc 1 nhảy thẳng lên đỉnh, không trả gì... thực ra trả \`min(cost[0],cost[1])\`? — xem code).

\`\`\`go
// Min cost climbing stairs. O(n) thời gian, O(1) không gian.
func minCostClimbingStairs(cost []int) int {
    n := len(cost)
    prev2, prev1 := 0, 0 // dp[0]=dp[1]=0
    for i := 2; i <= n; i++ {
        cur := min(prev1+cost[i-1], prev2+cost[i-2])
        prev2, prev1 = prev1, cur
    }
    return prev1
}

func min(a, b int) int {
    if a < b {
        return a
    }
    return b
}
// Walk-through [10,15,20]: (p2,p1)=(0,0)
//   i=2: min(0+15, 0+10)=10 → (0,10)
//   i=3: min(10+20, 0+15)=15 → (10,15) → trả 15 ✓
\`\`\`

> **📝 Tóm tắt mục 7.** Min cost: \`dp[i]=min(dp[i-1]+cost[i-1], dp[i-2]+cost[i-2])\`, đáp án \`dp[n]\` (đỉnh).

---

## 8. Word break (Tách từ)

> **💡 Trực giác.** Cho chuỗi \`s\` và một **từ điển** \`dict\`, hỏi có thể cắt \`s\` thành dãy các từ trong \`dict\` (dùng lại từ thoải mái) hay không? Vd \`s="leetcode"\`, \`dict={"leet","code"}\` → có (\`leet\` + \`code\`). Đi từ trái sang phải, \`s[0..i-1]\` cắt được nếu **tồn tại** điểm cắt \`j\` sao cho \`s[0..j-1]\` cắt được **và** \`s[j..i-1]\` là một từ trong dict.

- **State:** \`dp[i]\` = \`true\` nếu \`s[0..i-1]\` (i ký tự đầu) tách được.
- **Transition:** \`dp[i] = OR over j<i ( dp[j] AND (s[j..i-1] ∈ dict) )\`.
- **Base case:** \`dp[0] = true\` (chuỗi rỗng tách được — không cần từ nào).
- **Đáp án:** \`dp[n]\`.
- **Độ phức tạp:** \`O(n²)\` cặp \`(j, i)\`, mỗi lần tra dict + cắt chuỗi \`O(n)\` → \`O(n³)\` thô, hoặc \`O(n²)\` với hashset + so sánh khéo.

### Walk-through với \`s = "leetcode"\`, \`dict = {"leet", "code"}\`

| i | s[0..i-1] | j tìm được | dp[i] |
|---|-----------|------------|-------|
| 0 | "" | — | **true** (base) |
| 1..3 | "l","le","lee" | không có j với dp[j]∧từ | **false** |
| 4 | "leet" | j=0: dp[0]=T ∧ "leet"∈dict | **true** |
| 5..7 | "leetc"... | không | **false** |
| 8 | "leetcode" | j=4: dp[4]=T ∧ "code"∈dict | **true** |

Đáp án \`dp[8] = true\`. Bốn ví dụ: \`"leetcode",{leet,code}→true\`, \`"applepenapple",{apple,pen}→true\`, \`"catsandog",{cats,dog,sand,and,cat}→false\`, \`"a",{a}→true\`.

\`\`\`go
// Word break. O(n²) cặp (j,i), tra hashset O(1) trung bình.
func wordBreak(s string, wordDict []string) bool {
    dict := make(map[string]bool)
    for _, w := range wordDict {
        dict[w] = true
    }
    n := len(s)
    dp := make([]bool, n+1)
    dp[0] = true // chuỗi rỗng tách được
    for i := 1; i <= n; i++ {
        for j := 0; j < i; j++ {
            // s[0..j-1] tách được VÀ s[j..i-1] là một từ
            if dp[j] && dict[s[j:i]] {
                dp[i] = true
                break // chỉ cần một điểm cắt hợp lệ
            }
        }
    }
    return dp[n]
}
// Walk-through "leetcode": dp[0]=T
//   dp[4]: j=0 dp[0]=T ∧ "leet"∈dict → T
//   dp[8]: j=4 dp[4]=T ∧ "code"∈dict → T → trả true ✓
\`\`\`

> **⚠ Lỗi thường gặp.** Quên \`dp[0]=true\` → mọi \`dp[i]\` đều \`false\` vì không có điểm khởi đầu. Hoặc dùng greedy (cắt từ dài nhất trước) → sai với \`"catsandog"\` (cắt "cats" rồi kẹt "andog", trong khi đáp án thật là false nhưng greedy có thể cho false sai lý do, hoặc bỏ lỡ nhánh "cat"+"sand"...).

> **🔁 Dừng lại tự kiểm tra.** \`"catsandog"\`, dict \`{cats,dog,sand,and,cat}\` — tách được không?
> <details><summary>Đáp án</summary>Không (false). "cat"+"sand"+"og"? "og" không có. "cats"+"and"+"og"? "og" không có. Mọi nhánh đều kẹt ở "og".</details>

> **📝 Tóm tắt mục 8.** Word break: \`dp[i]=∃j: dp[j] ∧ s[j..i-1]∈dict\`. \`dp[0]=true\`. \`O(n²)\`.

---

## 9. Longest Increasing Subsequence — LIS (Dãy con tăng dài nhất)

> **💡 Trực giác.** Cho mảng số, tìm **dãy con** (không cần liên tiếp, giữ thứ tự) **tăng nghiêm ngặt** dài nhất. Vd \`[10,9,2,5,3,7,101,18]\` → \`[2,3,7,101]\` hoặc \`[2,3,7,18]\`, dài 4. Tại mỗi vị trí \`i\`, hỏi: *"dãy tăng dài nhất **kết thúc đúng tại \`i\`** là bao nhiêu?"* — bằng 1 cộng với cái dài nhất trong các \`dp[j]\` mà \`nums[j] < nums[i]\` (j < i).

### 9.1 Phiên bản O(n²)

- **State:** \`dp[i]\` = độ dài LIS **kết thúc đúng tại \`i\`**.
- **Transition:** \`dp[i] = 1 + max{ dp[j] : j < i, nums[j] < nums[i] }\` (nếu không có \`j\` nào thì \`dp[i]=1\`).
- **Base case:** mọi \`dp[i] = 1\` (chính nó là dãy dài 1).
- **Đáp án:** \`max(dp[i])\`.

#### Walk-through với \`nums = [10, 9, 2, 5, 3, 7, 101, 18]\`

| i | nums[i] | j với nums[j]<nums[i] (dp[j]) | dp[i] |
|---|---------|-------------------------------|-------|
| 0 | 10 | — | 1 |
| 1 | 9 | — (10>9) | 1 |
| 2 | 2 | — | 1 |
| 3 | 5 | j=2 (2<5, dp=1) | 2 |
| 4 | 3 | j=2 (2<3, dp=1) | 2 |
| 5 | 7 | j=2(dp1),3(dp2),4(dp2) → max 2 | 3 |
| 6 | 101 | mọi j, max dp = 3 (tại i=5) | 4 |
| 7 | 18 | j=2,3,4,5 → max dp 3 (tại i=5) | 4 |

\`max(dp) = 4\`. Bốn ví dụ: \`[10,9,2,5,3,7,101,18]→4\`, \`[0,1,0,3,2,3]→4\`, \`[7,7,7,7]→1\` (tăng nghiêm ngặt, các số bằng nhau không tính), \`[1,3,6,7,9,4,10,5,6]→6\`.

\`\`\`go
// LIS — O(n²). dp[i] = LIS kết thúc tại i.
func lengthOfLIS_n2(nums []int) int {
    n := len(nums)
    if n == 0 {
        return 0
    }
    dp := make([]int, n)
    best := 1
    for i := 0; i < n; i++ {
        dp[i] = 1
        for j := 0; j < i; j++ {
            if nums[j] < nums[i] && dp[j]+1 > dp[i] {
                dp[i] = dp[j] + 1
            }
        }
        if dp[i] > best {
            best = dp[i]
        }
    }
    return best
}
\`\`\`

### 9.2 Phiên bản O(n log n) — patience / binary search

> **💡 Trực giác (patience sorting).** Giữ một mảng \`tails\`, trong đó \`tails[k]\` = **phần tử cuối nhỏ nhất có thể** của một dãy tăng độ dài \`k+1\` tìm được tới giờ. Với mỗi \`x\`: nếu \`x\` lớn hơn mọi đuôi → nối thêm (dãy dài ra). Ngược lại, dùng **binary search** tìm đuôi đầu tiên \`>= x\` và thay nó bằng \`x\` (giữ đuôi càng nhỏ càng "mở" cho tương lai). Độ dài LIS = \`len(tails)\`.
>
> **Lưu ý:** \`tails\` **không** phải là một LIS thật, chỉ độ dài của nó mới đúng. Binary search là phần đã học ở [Lesson 12](../lesson-12-binary-search-variants/) (tìm cận trái — lower bound).

#### Walk-through \`nums = [10, 9, 2, 5, 3, 7, 101, 18]\`

| x | thao tác | tails sau |
|---|----------|-----------|
| 10 | rỗng → thêm | [10] |
| 9 | thay đuôi ≥9 (vị trí 0) | [9] |
| 2 | thay đuôi ≥2 (vị trí 0) | [2] |
| 5 | >mọi đuôi → thêm | [2,5] |
| 3 | thay đuôi ≥3 (vị trí 1 = 5) | [2,3] |
| 7 | >mọi đuôi → thêm | [2,3,7] |
| 101 | >mọi đuôi → thêm | [2,3,7,101] |
| 18 | thay đuôi ≥18 (vị trí 3 = 101) | [2,3,7,18] |

\`len(tails) = 4\` ✓ (khớp phiên bản O(n²)).

\`\`\`go
// LIS — O(n log n). tails[k] = đuôi nhỏ nhất của dãy tăng dài k+1.
func lengthOfLIS_nlogn(nums []int) int {
    tails := []int{}
    for _, x := range nums {
        // lower_bound: chỉ số đầu tiên tails[idx] >= x
        lo, hi := 0, len(tails)
        for lo < hi {
            mid := (lo + hi) / 2
            if tails[mid] < x {
                lo = mid + 1
            } else {
                hi = mid
            }
        }
        if lo == len(tails) {
            tails = append(tails, x) // x lớn hơn mọi đuôi → nối dài
        } else {
            tails[lo] = x // thay đuôi để giữ nhỏ nhất
        }
    }
    return len(tails)
}
// Walk-through [10,9,2,5,3,7,101,18] → tails kết thúc [2,3,7,18], len=4 ✓
\`\`\`

> **❓ Câu hỏi tự nhiên.** *"Vì sao thay đuôi lại đúng?"* — Thay \`tails[k]\` bằng số nhỏ hơn không làm hỏng các dãy đã đếm (độ dài giữ nguyên), mà làm đuôi nhỏ hơn → dễ nối thêm về sau. Đây là invariant của thuật toán.

> **⚠ Cạm bẫy: hai phiên bản LIS.** \`O(n²)\` dễ viết và cho cả việc **dựng lại dãy**; \`O(n log n)\` nhanh hơn nhiều nhưng \`tails\` **không phải** dãy thật. Khi đề chỉ hỏi **độ dài** → dùng \`O(n log n)\`. Khi cần **dãy cụ thể** → dùng \`O(n²)\` (hoặc \`O(n log n)\` có lưu thêm con trỏ cha).

> **🔁 Dừng lại tự kiểm tra.** \`[7,7,7,7]\` LIS dài bao nhiêu (tăng nghiêm ngặt)?
> <details><summary>Đáp án</summary>1. Các số bằng nhau không tạo dãy tăng nghiêm ngặt. (Nếu là "không giảm" thì là 4.)</details>

> **📝 Tóm tắt mục 9.** LIS \`O(n²)\`: \`dp[i]=1+max{dp[j]:nums[j]<nums[i]}\`. \`O(n log n)\`: patience + binary search trên \`tails\`.

---

## 10. Maximum product subarray (Tích đoạn con lớn nhất)

> **💡 Trực giác.** Giống Kadane nhưng đổi **cộng** thành **nhân**, tìm đoạn con liên tiếp có **tích** lớn nhất. Khác biệt mấu chốt: **số âm**. Một tích âm nhân thêm số âm nữa → thành **dương lớn**. Nên một \`min\` rất âm hôm nay có thể trở thành \`max\` ngày mai. Vì vậy tại mỗi \`i\` phải track **đồng thời** cả \`maxEnd[i]\` (tích lớn nhất kết thúc tại i) **và** \`minEnd[i]\` (tích nhỏ nhất — âm nhất).

- **State:** \`maxEnd[i]\`, \`minEnd[i]\` = tích lớn/nhỏ nhất của đoạn con kết thúc tại \`i\`.
- **Transition:** với 3 ứng viên \`nums[i]\`, \`maxEnd[i-1]*nums[i]\`, \`minEnd[i-1]*nums[i]\`:
  - \`maxEnd[i] = max(ba ứng viên)\`
  - \`minEnd[i] = min(ba ứng viên)\`
- **Base case:** \`maxEnd[0] = minEnd[0] = nums[0]\`.
- **Đáp án:** \`max(maxEnd[i])\`.

### Walk-through với \`nums = [2, 3, -2, 4]\`

| i | nums[i] | ứng viên (n, maxPrev·n, minPrev·n) | maxEnd | minEnd | best |
|---|---------|-------------------------------------|--------|--------|------|
| 0 | 2 | — | 2 | 2 | 2 |
| 1 | 3 | 3, 2·3=6, 2·3=6 | **6** | 3 | 6 |
| 2 | -2 | -2, 6·-2=-12, 3·-2=-6 | **-2** | **-12** | 6 |
| 3 | 4 | 4, -2·4=-8, -12·4=-48 | **4** | -48 | **6** |

Đáp án **6** (đoạn \`[2,3]\`). Một ví dụ "âm × âm thành dương": \`nums = [-2, 3, -4]\`:

| i | nums[i] | ứng viên | maxEnd | minEnd | best |
|---|---------|----------|--------|--------|------|
| 0 | -2 | — | -2 | -2 | -2 |
| 1 | 3 | 3, -6, -6 | **3** | -6 | 3 |
| 2 | -4 | -4, 3·-4=-12, -6·-4=**24** | **24** | -12 | **24** |

Đáp án **24** (cả mảng \`-2·3·-4 = 24\`) — thấy rõ \`minEnd=-6\` đã "lật" thành \`24\`. Bốn ví dụ: \`[2,3,-2,4]→6\`, \`[-2,0,-1]→0\`, \`[-2,3,-4]→24\`, \`[2,-5,-2,-4,3]→24\`.

\`\`\`go
// Max product subarray. Track cả max và min vì âm×âm = dương.
func maxProduct(nums []int) int {
    maxEnd, minEnd := nums[0], nums[0]
    best := nums[0]
    for i := 1; i < len(nums); i++ {
        x := nums[i]
        // nếu x < 0, max và min sẽ đổi vai trò → tính 3 ứng viên rồi lấy max/min
        cand1, cand2, cand3 := x, maxEnd*x, minEnd*x
        newMax := max(cand1, max(cand2, cand3))
        newMin := min(cand1, min(cand2, cand3))
        maxEnd, minEnd = newMax, newMin
        best = max(best, maxEnd)
    }
    return best
}
// Walk-through [2,3,-2,4]: maxEnd/minEnd/best
//   i=1: (6,3,6) ; i=2: (-2,-12,6) ; i=3: (4,-48,6) → trả 6 ✓
\`\`\`

> **⚠ Cạm bẫy: quên track \`min\`.** Nếu chỉ giữ \`maxEnd\`, gặp \`[-2,3,-4]\` sẽ ra \`3\` (sai) thay vì \`24\`, vì bạn vứt mất cái \`min=-6\` mà lẽ ra sẽ lật dấu thành dương lớn. **Luôn** giữ cả hai. Số \`0\` cũng reset cả hai về 0 tự nhiên (qua ứng viên \`nums[i]\`).

> **🔁 Dừng lại tự kiểm tra.** \`[2, -5, -2, -4, 3]\` tích lớn nhất?
> <details><summary>Đáp án</summary>24. Đoạn \`[-5,-2,-4]\`=-40? không. \`[-2,-4,3]\`=24. Hoặc \`[-5,-2,-4]\`=-40, \`[2,-5,-2]\`=20. Lớn nhất là 24 (\`-2·-4·3\`).</details>

> **📝 Tóm tắt mục 10.** Max product: track cả \`maxEnd\` và \`minEnd\` (vì âm×âm). 3 ứng viên mỗi bước.

---

## 11. State + tối ưu không gian (rolling variable)

> **💡 Trực giác.** Nhiều bài DP 1D có transition chỉ nhìn lại **một hằng số** ô trước (\`dp[i-1]\`, \`dp[i-2]\`). Vậy giữ cả mảng \`dp[]\` là **lãng phí** — chỉ cần 1-2 biến "lăn" theo vòng lặp. Đây là tối ưu không gian \`O(n) → O(1)\`.

**Quy tắc:** Nếu \`dp[i]\` chỉ phụ thuộc \`dp[i-1]\` và \`dp[i-2]\`, thay mảng bằng 2 biến \`prev1, prev2\`:

\`\`\`go
// Mẫu rolling: từ
//   dp := make([]int, n+1); dp[i] = f(dp[i-1], dp[i-2])
// thành 2 biến:
prev2, prev1 := base0, base1
for i := 2; i <= n; i++ {
    cur := f(prev1, prev2)
    prev2, prev1 = prev1, cur // "lăn" cửa sổ tiến 1 bước
}
// đáp án = prev1
\`\`\`

| Bài | Nhìn lại | Số biến rolling | Không gian |
|-----|----------|-----------------|------------|
| Climbing stairs | dp[i-1], dp[i-2] | 2 | O(1) |
| House robber I/II | dp[i-1], dp[i-2] | 2 | O(1) |
| Kadane | dp[i-1] | 1 (\`cur\`) | O(1) |
| Max product | maxEnd, minEnd | 2 | O(1) |
| Decode ways | dp[i-1], dp[i-2] | 2 | O(1) |
| Min cost stairs | dp[i-1], dp[i-2] | 2 | O(1) |
| **Word break** | **mọi \`dp[j]\`, j<i** | **không rút được** | **O(n)** |
| **LIS O(n²)** | **mọi \`dp[j]\`, j<i** | **không rút được** | **O(n)** |

> **❓ Câu hỏi tự nhiên.** *"Bài nào KHÔNG rút được về O(1)?"* — Khi transition cần **toàn bộ** các ô trước (Word break, LIS quét mọi \`j<i\`). Lúc đó phải giữ cả mảng.

> **📝 Tóm tắt mục 11.** Nhìn lại hằng số ô trước → rolling variable \`O(1)\`. Nhìn lại mọi ô trước → giữ mảng \`O(n)\`.

---

## 12. Khi nào dùng DP 1D?

Nhận diện một bài là DP 1D khi **cả ba** dấu hiệu xuất hiện:

1. **Cấu trúc tuyến tính:** dữ liệu là mảng/chuỗi, xét lần lượt từ trái sang phải.
2. **Quyết định tại mỗi \`i\`:** ở mỗi vị trí có một lựa chọn rời rạc (lấy/không, đọc 1/2 ký tự, reset/continue), và lựa chọn tối ưu **chỉ phụ thuộc kết quả tối ưu của vài vị trí trước** (optimal substructure).
3. **Bài con trùng lặp:** đệ quy thô sẽ tính lại cùng một state nhiều lần → cần memo/tabulation.

> **❓ Câu hỏi tự nhiên.** *"Làm sao phân biệt DP 1D với sliding window / two pointers?"* — Sliding window ([L14](../lesson-14-sliding-window/)) duy trì một cửa sổ liên tục và đáp án là tính chất của cửa sổ. DP 1D có thể bỏ qua phần tử (House robber, LIS — dãy con không liên tục). Khi bài cho phép "chọn không liên tiếp" hoặc "tách tùy ý" → nghiêng về DP.

> **📝 Tóm tắt mục 12.** DP 1D khi: tuyến tính + quyết định-tại-i-phụ-thuộc-vài-vị-trí-trước + bài con trùng.

---

## 13. Cạm bẫy tổng hợp

> **⚠ Tổng hợp các bẫy đã rải trong bài — đọc lại trước khi làm bài tập:**

1. **Kadane reset vs continue.** Reset (\`cur=nums[i]\`) khi tổng tích lũy đang âm; continue khi đang dương. Khởi tạo \`best=nums[0]\`, **không** phải \`0\` (sai khi mảng toàn âm).
2. **LIS O(n²) vs O(n log n).** Hỏi độ dài → \`O(n log n)\`; cần dãy thật → \`O(n²)\`. \`tails\` trong bản nhanh **không** là LIS thật.
3. **Decode ways với \`'0'\`.** \`'0'\` chỉ hợp lệ trong cặp "10"/"20"; đứng riêng hoặc sau số >2 → kẹt (0 cách từ đó về sau).
4. **Product subarray quên \`min\`.** Phải track cả \`maxEnd\` và \`minEnd\` vì âm×âm lật dấu. Quên \`min\` → sai với mảng có số âm.
5. **Off-by-one ở base case.** Climbing/decode dùng \`dp[0]=1\` (chuỗi rỗng/đứng yên có 1 cách); word break \`dp[0]=true\`. Sai base → toàn bộ lệch. Luôn verify bằng tay 1-2 ô đầu.
6. **House robber II quên \`n==1\`.** Tách \`nums[:n-1]\` và \`nums[1:]\` đều rỗng khi \`n==1\` → trả 0 sai. Chặn riêng.

---

## Bài tập

> Với mỗi bài: nêu **định nghĩa state**, **transition**, **base case**, **độ phức tạp** (thời gian + không gian), rồi viết code Go.

1. **House robber.** \`nums = [2,7,9,3,1]\`. Trộm tối đa? Tổng quát hóa code.
2. **Kadane + trả về subarray.** Không chỉ trả tổng lớn nhất mà cả **chỉ số đầu/cuối** của đoạn. Test \`[-2,1,-3,4,-1,2,1,-5,4]\`.
3. **Decode ways.** Đếm số cách giải mã \`"2266"\`. Tổng quát hóa code.
4. **Word break.** \`s="applepenapple"\`, \`dict={apple,pen}\`. Tách được không? Code tổng quát.
5. **LIS O(n log n).** \`nums=[1,3,6,7,9,4,10,5,6]\`. Độ dài LIS? Code patience sort.
6. **Max product subarray.** \`nums=[2,3,-2,4]\` và \`[-2,3,-4]\`. Tích lớn nhất? Code track max+min.

---

## Lời giải chi tiết

### Bài 1 — House robber

- **State:** \`dp[i]\` = tiền tối đa khi xét tới nhà \`i\`.
- **Transition:** \`dp[i] = max(dp[i-1], dp[i-2]+nums[i])\`.
- **Base:** \`dp[0]=nums[0]\`, \`dp[1]=max(nums[0],nums[1])\`.
- **Độ phức tạp:** thời gian \`O(n)\`, không gian \`O(1)\` (2 biến rolling).
- **Đáp án \`[2,7,9,3,1]\` = 12** (trộm 2+9+1). Code: hàm \`rob\` ở [mục 3](#3-house-robber-tên-trộm-nhà).

\`\`\`go
func rob(nums []int) int {
    prev2, prev1 := 0, 0
    for _, x := range nums {
        prev2, prev1 = prev1, max(prev1, prev2+x)
    }
    return prev1
}
\`\`\`

### Bài 2 — Kadane trả về subarray

- **State:** \`cur\` = tổng đoạn tốt nhất kết thúc tại \`i\`; lưu thêm \`tmpStart\` (vị trí bắt đầu đoạn hiện tại) và \`bestL, bestR\`.
- **Transition:** nếu \`cur < 0\` → reset (\`cur=nums[i]\`, \`tmpStart=i\`); ngược lại \`cur+=nums[i]\`. Khi \`cur>best\` cập nhật \`best, bestL=tmpStart, bestR=i\`.
- **Độ phức tạp:** \`O(n)\` thời gian, \`O(1)\` không gian.
- **Đáp án \`[-2,1,-3,4,-1,2,1,-5,4]\`** → tổng **6**, đoạn \`[4,-1,2,1]\` (chỉ số 3..6).

\`\`\`go
func maxSubArrayWithRange(nums []int) (sum, l, r int) {
    cur, best := nums[0], nums[0]
    tmpStart, bestL, bestR := 0, 0, 0
    for i := 1; i < len(nums); i++ {
        if cur < 0 { // đoạn trước âm → bắt đầu lại tại i
            cur = nums[i]
            tmpStart = i
        } else {
            cur += nums[i]
        }
        if cur > best {
            best, bestL, bestR = cur, tmpStart, i
        }
    }
    return best, bestL, bestR
}
// [-2,1,-3,4,-1,2,1,-5,4] → (6, 3, 6) tức đoạn nums[3..6]=[4,-1,2,1] ✓
\`\`\`

### Bài 3 — Decode ways

- **State:** \`dp[i]\` = số cách giải mã \`i\` ký tự đầu.
- **Transition:** \`dp[i] = (s[i-1]!='0' ? dp[i-1]) + (s[i-2..i-1]∈[10,26] ? dp[i-2])\`.
- **Base:** \`dp[0]=1\`. **Độ phức tạp:** \`O(n)\` / \`O(1)\`.
- **Đáp án \`"2266"\`:** dp = 1,1(\`2\`),2(\`22\`),3(\`226\`),5(\`2266\`). Walk: dp[4]: \`'6'≠0\`→+dp[3]=3; \`"66"\`∉[10,26]→+0 → 3? Khoan, lại tính: dp[3]=3, dp[4]: 1 ký tự \`'6'\`→+dp[3]=3; 2 ký tự \`"66"\`=66∉[10,26]→0 → dp[4]=3. **Đáp án \`"2266"\` = 3** (BBZF? — cặp hợp lệ: 2,2,6,6 / 22,6,6 / 2,26,6 → 3 cách). Code: hàm \`numDecodings\` ở [mục 6](#6-decode-ways-số-cách-giải-mã).

### Bài 4 — Word break

- **State:** \`dp[i]\` = \`s[0..i-1]\` tách được?
- **Transition:** \`dp[i] = ∃ j<i : dp[j] ∧ s[j..i-1]∈dict\`.
- **Base:** \`dp[0]=true\`. **Độ phức tạp:** \`O(n²)\` (tra hashset \`O(1)\`).
- **Đáp án \`"applepenapple"\`, dict \`{apple,pen}\`:** dp[5]=T (\`apple\`), dp[8]=T (dp[5]∧\`pen\`), dp[13]=T (dp[8]∧\`apple\`) → **true**. Code: hàm \`wordBreak\` ở [mục 8](#8-word-break-tách-từ).

### Bài 5 — LIS O(n log n)

- **State (qua tails):** \`tails[k]\` = đuôi nhỏ nhất của dãy tăng dài \`k+1\`.
- **Transition:** lower_bound \`x\` trong \`tails\`; thay hoặc append.
- **Độ phức tạp:** \`O(n log n)\` thời gian, \`O(n)\` không gian.
- **Đáp án \`[1,3,6,7,9,4,10,5,6]\`:** tails diễn tiến: [1],[1,3],[1,3,6],[1,3,6,7],[1,3,6,7,9], 4→thay 6→[1,3,4,7,9], 10→[1,3,4,7,9,10], 5→thay 7→[1,3,4,5,9,10], 6→thay 9→[1,3,4,5,6,10]. \`len=6\` → **LIS = 6** (vd \`[1,3,4,5,6,10]\`... thực ra \`[1,3,6,7,9,10]\` dài 6). Code: hàm \`lengthOfLIS_nlogn\` ở [mục 9.2](#92-phiên-bản-on-log-n--patience--binary-search).

### Bài 6 — Max product subarray

- **State:** \`maxEnd[i]\`, \`minEnd[i]\`.
- **Transition:** \`maxEnd=max(x, maxEnd·x, minEnd·x)\`, \`minEnd=min(...)\`.
- **Base:** \`maxEnd=minEnd=nums[0]\`. **Độ phức tạp:** \`O(n)\` / \`O(1)\`.
- **Đáp án:** \`[2,3,-2,4]\` → **6** (đoạn \`[2,3]\`); \`[-2,3,-4]\` → **24** (cả mảng, âm×âm). Code: hàm \`maxProduct\` ở [mục 10](#10-maximum-product-subarray-tích-đoạn-con-lớn-nhất).

---

## Code & Minh họa

- Code Go cho mọi bài đã **inline** ở các mục tương ứng (climbing stairs, house robber I/II, Kadane, decode ways, word break, LIS O(n²)+O(n log n), max product, min cost stairs). Không có file \`solutions.go\` riêng cho bài này.
- **[visualization.html](./visualization.html)** — 3 module tương tác:
  1. **DP table filler** — chọn bài (house robber / Kadane / decode ways), animate điền \`dp[]\` từng ô và hiển thị công thức transition.
  2. **Kadane visualizer** — mảng số, animate \`current sum\` reset/continue cùng \`max\` chạy theo.
  3. **LIS** — animate \`dp[i]\` và tô đường tăng dài nhất.

---

## Bài tiếp theo

- [Lesson 25 — Knapsack family](../lesson-25-knapsack-family/) — bước sang **DP 2 chiều** (\`dp[i][w]\`): 0/1 knapsack, unbounded, subset sum. Đây là lúc "1 chỉ số" không còn đủ.
- Tham khảo lại: [L23 — DP Fundamentals](../lesson-23-dp-fundamentals/), [L05 — Brute-force → Optimize](../lesson-05-bruteforce-to-optimize/), [L12 — Binary Search](../lesson-12-binary-search-variants/).
`;
