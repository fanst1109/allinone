# Lesson 30 — Tối ưu Quy hoạch động (DP Optimization)

> **Tier 4 · Bài cuối** — Khép lại chuỗi Quy hoạch động. Bạn đã biết *viết* DP đúng (L23–L29). Bài này dạy cách *tăng tốc* và *giảm bộ nhớ* khi DP cơ bản quá chậm (TLE) hoặc quá tốn RAM (MLE).

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Hiểu **vì sao** một DP đúng vẫn có thể không đủ nhanh, và *khi nào* mới nên tối ưu.
- Nắm **space optimization** (rolling array): giảm bộ nhớ O(n²) → O(n) hoặc O(1).
- Dùng **monotonic deque** để biến transition `dp[i] = min/max(dp[j] + cost)` trong cửa sổ từ O(n²) → O(n).
- Dùng **prefix sum / prefix max** để biến transition tổng/max trên tiền tố từ O(n) → O(1) mỗi bước.
- Biết ý tưởng các kỹ thuật nâng cao: **Convex Hull Trick**, **Divide & Conquer DP**, **Knuth optimization**.
- Dùng **matrix exponentiation** để tính recurrence tuyến tính hệ số hằng trong O(log n).
- Biết **bitset optimization** tăng tốc hằng số ~64× cho subset-sum dạng boolean.
- Nhận diện cấu trúc DP nào áp dụng được kỹ thuật nào.

## Kiến thức tiền đề

- [Lesson 14 — Sliding Window](../lesson-14-sliding-window/) — monotonic deque cho sliding window maximum.
- [Lesson 15 — Prefix Sum & Difference](../lesson-15-prefix-sum-difference/) — tiền tố cộng dồn.
- [Lesson 17 — Divide & Conquer / Fast Power](../lesson-17-divide-and-conquer/) — lũy thừa nhanh, nền tảng của matrix expo.
- [Lesson 24 — DP 1 chiều](../lesson-24-dp-1d/) — DP cơ bản, đã chạm tới rolling array.
- [Lesson 26 — DP lưới 2 chiều](../lesson-26-dp-grid-2d/) — bảng 2D, knapsack, LCS.
- [Lesson 27 — Interval DP](../lesson-27-interval-dp/) (nếu có) — nền cho Knuth optimization.

---

## 1. Vì sao phải tối ưu DP?

> 💡 **Trực giác.** DP biến bài toán đệ quy mũ thành đa thức bằng cách *nhớ kết quả con*. Nhưng "đa thức" vẫn có thể to: một bảng `dp[i][j]` cỡ 10⁴ × 10⁴ là 10⁸ ô — vừa chậm (mỗi ô vài phép tính → ~10⁹ thao tác, quá 1 giây), vừa tốn RAM (10⁸ × 8 byte = 800 MB, vượt giới hạn ~256 MB của hầu hết hệ chấm).

Một DP "đúng" có hai loại chi phí cần để mắt:

| Chi phí | Triệu chứng khi vượt | Giới hạn điển hình (online judge) |
|---------|----------------------|-----------------------------------|
| **Thời gian** (số transition) | TLE (Time Limit Exceeded) | ~10⁸ thao tác / giây |
| **Bộ nhớ** (kích thước bảng) | MLE (Memory Limit Exceeded) | ~256 MB ≈ 6.4 × 10⁷ số int64 |

Hãy nhìn 4 ví dụ cụ thể về độ chậm/tốn của DP cơ bản:

1. **Knapsack 0/1** với n=2000 vật, W=100000: bảng `dp[n+1][W+1]` = 2001 × 100001 ≈ **2 × 10⁸ ô** × 8 byte = **1.6 GB** → MLE chắc chắn. (Space opt → O(W) = 800 KB.)
2. **LCS** hai chuỗi dài 50000: bảng 50001² ≈ **2.5 × 10⁹ ô** → cả thời gian lẫn bộ nhớ đều chết. (Space opt giữ 2 hàng → O(min(m,n)).)
3. **Jump Game VI** (dp[i] = max(dp[j]) + a[i] với j ∈ [i-k, i-1]) n=10⁵, k=10⁵: vòng lặp đôi = **10¹⁰ thao tác** → TLE ~100 giây. (Deque → O(n) = 10⁵.)
4. **Fibonacci thứ 10¹⁸**: DP tuyến tính chạy 10¹⁸ bước → bất khả thi. (Matrix expo → O(log n) ≈ 60 bước.)

> ❓ **Câu hỏi tự nhiên của người đọc.**
> - *"Có phải DP nào cũng tối ưu được không?"* — Không. Tối ưu cần **cấu trúc đặc biệt**: transition phụ thuộc ít hàng (→ rolling), trên cửa sổ trượt (→ deque), trên tiền tố (→ prefix), tuyến tính theo a[i] (→ CHT), hoặc recurrence hệ số hằng (→ matrix). Không có cấu trúc → không có phép màu.
> - *"Tối ưu có làm DP sai đi không?"* — Nếu làm đúng thì kết quả y hệt, chỉ nhanh/gọn hơn. Cạm bẫy lớn nhất là space opt phá truy vết (xem mục 12).

> 📝 **Tóm tắt mục 1.** DP đúng vẫn có thể TLE (chậm) hoặc MLE (tốn RAM). Tối ưu = khai thác cấu trúc đặc biệt của transition để giảm bậc thời gian hoặc bộ nhớ. Không có cấu trúc → không tối ưu được.

---

## 2. Space optimization — Rolling array

> 💡 **Trực giác.** Hình dung bảng DP như một chồng giấy, mỗi tờ là một hàng `dp[i][*]`. Nếu để tính tờ thứ i bạn chỉ cần nhìn tờ i-1 (và có thể i-2), thì giữ lại cả chồng giấy cũ là lãng phí — chỉ cần **2 tờ** (hoặc 1 tờ tự ghi đè) là đủ. Đó là rolling array: "cuộn" qua các hàng, vứt hàng cũ không còn dùng.

Quy tắc: nếu `dp[i][...]` chỉ phụ thuộc `dp[i-1][...]` (và/hoặc `dp[i-2][...]`), ta chỉ cần giữ vài hàng gần nhất.

### 2.1 Fibonacci: O(n) space → O(1)

Recurrence $f(i) = f(i-1) + f(i-2)$ chỉ cần 2 giá trị trước:

```go
// O(n) thời gian, O(1) bộ nhớ — chỉ giữ 2 biến thay vì mảng dp[n+1].
func fib(n int) int {
	if n < 2 {
		return n
	}
	prev2, prev1 := 0, 1 // f(0), f(1)
	for i := 2; i <= n; i++ {
		cur := prev1 + prev2 // f(i) = f(i-1) + f(i-2)
		prev2, prev1 = prev1, cur
	}
	return prev1
}
// Walk-through n=6:
// i=2: cur=1+0=1  -> prev2=1, prev1=1
// i=3: cur=1+1=2  -> prev2=1, prev1=2
// i=4: cur=2+1=3  -> prev2=2, prev1=3
// i=5: cur=3+2=5  -> prev2=3, prev1=5
// i=6: cur=5+3=8  -> prev2=5, prev1=8  => fib(6)=8 ✓
```

### 2.2 Knapsack 0/1: bảng 2D → mảng 1D

Bảng đầy đủ: `dp[i][w]` = giá trị lớn nhất khi xét i vật đầu với sức chứa w. Transition:

```
dp[i][w] = max( dp[i-1][w],                       // không lấy vật i
                dp[i-1][w - wt[i]] + val[i] )      // lấy vật i (nếu w >= wt[i])
```

Vì hàng i chỉ đọc hàng i-1, ta nén còn 1 mảng `dp[w]`. **Mấu chốt: duyệt w GIẢM dần** để khi đọc `dp[w - wt[i]]` ta đọc giá trị của *hàng cũ* (i-1), chưa bị ghi đè trong vòng này:

```go
// O(n*W) thời gian, O(W) bộ nhớ (thay vì O(n*W)).
func knapsack(wt, val []int, W int) int {
	dp := make([]int, W+1) // dp[w] = best value với sức chứa w, đã xét các vật trước
	for i := range wt {
		// DUYỆT NGƯỢC: w từ W về wt[i].
		// Nếu duyệt xuôi, dp[w-wt[i]] đã là hàng MỚI (i) -> lấy vật i nhiều lần (sai, đó là unbounded knapsack).
		for w := W; w >= wt[i]; w-- {
			if dp[w-wt[i]]+val[i] > dp[w] {
				dp[w] = dp[w-wt[i]] + val[i]
			}
		}
	}
	return dp[W]
}
// Walk-through: wt=[2,3], val=[3,4], W=5
// Khởi tạo dp = [0,0,0,0,0,0]
// Vật 0 (wt=2,val=3): w=5..2
//   w=5: dp[5]=max(0, dp[3]+3=0+3)=3
//   w=4: dp[4]=max(0, dp[2]+3=3)=3
//   w=3: dp[3]=max(0, dp[1]+3=3)=3
//   w=2: dp[2]=max(0, dp[0]+3=3)=3  -> dp=[0,0,3,3,3,3]
// Vật 1 (wt=3,val=4): w=5..3
//   w=5: dp[5]=max(3, dp[2]+4=3+4=7)=7
//   w=4: dp[4]=max(3, dp[1]+4=0+4=4)=4
//   w=3: dp[3]=max(3, dp[0]+4=4)=4   -> dp=[0,0,3,4,4,7]
// dp[5]=7  (lấy cả vật 0 và 1: 3+4=7, tổng nặng 5 <= 5) ✓
```

> ⚠ **Lỗi thường gặp — duyệt sai chiều.** Với knapsack 0/1, **bắt buộc duyệt w giảm dần**. Nếu duyệt tăng dần, `dp[w-wt[i]]` đã được cập nhật cho vật i trong cùng vòng → vô tình "lấy lại" vật i nhiều lần. Lưu ý: chính cái "lỗi" này lại *đúng* cho **unbounded knapsack** (mỗi vật lấy không giới hạn) — khi đó duyệt tăng dần là chủ ý.

### 2.3 LCS: giữ 2 hàng

`dp[i][j]` = độ dài LCS của `a[:i]` và `b[:j]`. Hàng i chỉ phụ thuộc hàng i-1 → giữ 2 hàng (`prev`, `cur`):

```go
// O(m*n) thời gian, O(min(m,n)) bộ nhớ (thay vì O(m*n)).
func lcs(a, b string) int {
	if len(a) < len(b) { // đảm bảo b ngắn hơn -> hàng ngắn hơn
		a, b = b, a
	}
	m, n := len(a), len(b)
	prev := make([]int, n+1)
	cur := make([]int, n+1)
	for i := 1; i <= m; i++ {
		for j := 1; j <= n; j++ {
			if a[i-1] == b[j-1] {
				cur[j] = prev[j-1] + 1 // ký tự khớp -> nối vào LCS chéo trên-trái
			} else if prev[j] >= cur[j-1] {
				cur[j] = prev[j] // bỏ a[i-1]
			} else {
				cur[j] = cur[j-1] // bỏ b[j-1]
			}
		}
		prev, cur = cur, prev // cuộn hàng: cur trở thành prev cho vòng sau
	}
	return prev[n] // sau vòng cuối, prev giữ hàng m
}
// Walk-through a="ABCBDAB", b="BDCAB" -> LCS = "BCAB" độ dài 4.
```

> ❓ **Khi nào KHÔNG được space-optimize?** Khi bạn cần **truy vết** (reconstruct) lời giải, không chỉ giá trị tối ưu. Ví dụ: in ra *chuỗi* LCS, *danh sách vật* trong knapsack. Truy vết thường cần đọc lại các ô của hàng cũ — mà rolling array đã vứt đi. Giải pháp: hoặc giữ nguyên bảng 2D, hoặc dùng Hirschberg (D&C trên LCS) để truy vết trong O(n) space + O(mn) time (nâng cao).

### 2.4 Bốn ví dụ số: bộ nhớ tiết kiệm được bao nhiêu?

Để thấy rõ space opt cứu MLE thế nào, đây là 4 cấu hình thực tế (giả sử mỗi ô là int64 = 8 byte):

| Bài | n / m | W / cột | Bảng đầy đủ | Rolling | Tỉ lệ giảm |
|-----|-------|---------|-------------|---------|------------|
| Knapsack 0/1 | n=2000 | W=10⁵ | (2001)×(10⁵+1)×8 ≈ **1.6 GB** | (10⁵+1)×8 ≈ **0.8 MB** | ÷2001 |
| Knapsack 0/1 | n=500 | W=2×10⁴ | 501×20001×8 ≈ **80 MB** | 20001×8 ≈ **0.16 MB** | ÷501 |
| LCS | m=n=5×10⁴ | — | (5×10⁴)²×8 ≈ **20 GB** | 2×(5×10⁴)×8 ≈ **0.8 MB** | ÷25000 |
| Edit distance | m=n=10⁴ | — | 10⁸×8 ≈ **800 MB** | 2×10⁴×8 ≈ **0.16 KB** | ÷5000 |

Quan sát: bộ nhớ bảng đầy đủ tăng theo **tích** n×W (hoặc m×n), trong khi rolling chỉ theo **một chiều** → tỉ lệ giảm = số hàng. Với hai chuỗi dài, đây là khác biệt giữa "chạy được" và "MLE chắc chắn".

> 🔁 **Dừng lại tự kiểm tra.** Với knapsack 0/1 đã nén 1 chiều, vì sao phải duyệt `w` giảm dần?
> <details><summary>Đáp án</summary>Để `dp[w-wt[i]]` còn là giá trị của hàng cũ (i-1) — tức trạng thái "chưa lấy vật i". Duyệt tăng → ô đó đã được cập nhật cho vật i → lấy vật i nhiều lần (sai cho 0/1).</details>

> 📝 **Tóm tắt mục 2.** Nếu `dp[i]` chỉ phụ thuộc vài hàng trước, giữ rolling array: knapsack 2D→1D (duyệt w giảm), LCS giữ 2 hàng, fib O(1). KHÔNG dùng được khi cần truy vết lời giải.

---

## 3. Monotonic deque optimization

> 💡 **Trực giác.** Transition dạng `dp[i] = a[i] + max(dp[j] : j ∈ [i-k, i-1])` giống hệt bài [Sliding Window Maximum (L14)](../lesson-14-sliding-window/): tìm max trong một cửa sổ trượt. Tính max bằng vòng lặp = O(k) mỗi i → O(nk) tổng. Nhưng **deque đơn điệu** giữ các "ứng viên còn cửa thắng" theo thứ tự giảm dần, mỗi phần tử vào/ra deque đúng 1 lần → O(n) tổng.

Ý tưởng deque (giảm dần cho bài max):

- Deque lưu **chỉ số** `j`, sao cho `dp[deque]` giảm dần từ đầu (front) tới cuối (back).
- **Front** = chỉ số có dp lớn nhất trong cửa sổ hiện tại.
- Trước khi dùng: bỏ các chỉ số ở front đã *rời cửa sổ* (j < i-k).
- Trước khi đẩy i vào: pop từ back mọi j có `dp[j] <= dp[i]` (chúng vô dụng — i mới hơn và không nhỏ hơn).

### 3.1 Jump Game VI

Bài toán: mảng `a`, đứng ở chỉ số 0, mỗi bước nhảy tới `j ∈ [i+1, i+k]`. Điểm = tổng các `a` đã đặt chân. Tối đa hoá điểm khi tới cuối.

`dp[i] = a[i] + max(dp[j] : j ∈ [i-k, i-1])`, `dp[0] = a[0]`.

```go
// O(n) thời gian, O(n) bộ nhớ. So với O(n*k) của vòng lặp đôi.
func maxResult(a []int, k int) int {
	n := len(a)
	dp := make([]int, n)
	dp[0] = a[0]
	deque := []int{0} // lưu chỉ số j; dp[deque] giảm dần từ front -> back
	for i := 1; i < n; i++ {
		// 1) Bỏ front đã rời cửa sổ [i-k, i-1].
		for len(deque) > 0 && deque[0] < i-k {
			deque = deque[1:]
		}
		// 2) Front là j có dp lớn nhất trong cửa sổ.
		dp[i] = a[i] + dp[deque[0]]
		// 3) Pop back các j vô dụng (dp[j] <= dp[i]).
		for len(deque) > 0 && dp[deque[len(deque)-1]] <= dp[i] {
			deque = deque[:len(deque)-1]
		}
		deque = append(deque, i)
	}
	return dp[n-1]
}
// Walk-through a=[1,-1,-2,4,-7,3], k=2  -> đáp số dp[5]=7:
// dp[0]=1, deque=[0]
// i=1: front 0 trong cửa sổ [-1,0]. dp[1]=a[1]+dp[0]=-1+1=0.
//      pop back? dp[0]=1>0 -> giữ. push 1. deque=[0,1]
// i=2: front 0 trong [0,1]. dp[2]=a[2]+dp[0]=-2+1=-1.
//      pop back? dp[1]=0> -1 giữ. push 2. deque=[0,1,2]
// i=3: bỏ front <1: pop 0. deque=[1,2]. front=1. dp[3]=a[3]+dp[1]=4+0=4.
//      pop back: dp[2]=-1<=4 pop; dp[1]=0<=4 pop. deque=[]. push 3. deque=[3]
// i=4: front 3 trong [2,3]. dp[4]=a[4]+dp[3]=-7+4=-3.
//      pop back? dp[3]=4>-3 giữ. push 4. deque=[3,4]
// i=5: bỏ front<3: pop 3? 3>=3 nên GIỮ. front=3. dp[5]=a[5]+dp[3]=3+4=7.
// dp[5]=7 ✓  (đường tối ưu 0->1->3->5: 1 + (-1) + 4 + 3 = 7) — xem viz module 2.
```

### 3.2 Constrained Subsequence Sum

Bài toán: chọn dãy con (subsequence) sao cho **hai phần tử liền kề** trong dãy con cách nhau **≤ k** chỉ số trong mảng gốc; tối đa hoá tổng.

`dp[i] = a[i] + max(0, max(dp[j] : j ∈ [i-k, i-1]))`

Khác Jump Game VI duy nhất ở `max(0, ...)`: được phép *bắt đầu lại* tại i (không nối với j nào nếu mọi dp[j] âm).

```go
// O(n) thời gian nhờ deque, đáp số = max của toàn bộ dp[i].
func constrainedSubsetSum(a []int, k int) int {
	n := len(a)
	dp := make([]int, n)
	deque := []int{}
	best := a[0]
	for i := 0; i < n; i++ {
		for len(deque) > 0 && deque[0] < i-k { // bỏ front rời cửa sổ
			deque = deque[1:]
		}
		take := 0
		if len(deque) > 0 && dp[deque[0]] > 0 {
			take = dp[deque[0]] // chỉ nối nếu dương
		}
		dp[i] = a[i] + take
		if dp[i] > best {
			best = dp[i]
		}
		for len(deque) > 0 && dp[deque[len(deque)-1]] <= dp[i] {
			deque = deque[:len(deque)-1]
		}
		deque = append(deque, i)
	}
	return best
}
// Walk-through a=[10,2,-10,5,20], k=2 -> đáp số 37.
// dp[0]=10; dp[1]=2+10=12; dp[2]=-10+max(0,max(dp[0..1]))= -10+12=2;
// dp[3]=5+max(0,max(dp[1],dp[2])=12)=17; dp[4]=20+max(0,max(dp[2],dp[3])=17)=37. best=37 ✓
```

> ❓ **Câu hỏi tự nhiên.** *"Vì sao pop back lại đúng — không sợ vứt nhầm phần tử cần sau này?"* Vì nếu `dp[j] <= dp[i]` và `j < i`, thì ở MỌI cửa sổ tương lai chứa j cũng chứa i (i mới hơn nên rời cửa sổ muộn hơn), mà dp[i] ≥ dp[j] → j không bao giờ là max khi i còn đó. j thật sự vô dụng, vứt an toàn.

> ⚠ **Lỗi thường gặp.** Quên bước "bỏ front rời cửa sổ" → dùng giá trị ngoài cửa sổ → sai. Hoặc dùng dấu so sánh sai chiều (`<` thay `<=`) khi pop back — thường vẫn đúng kết quả nhưng làm deque dài hơn cần thiết.

> 🔁 **Dừng lại tự kiểm tra.** Vì sao deque cho O(n) chứ không O(nk) dù có 2 vòng `for` lồng nhau?
> <details><summary>Đáp án</summary>Phân tích khấu hao (amortized, [L02](../lesson-02-amortized-analysis/)): mỗi chỉ số được `append` đúng 1 lần và bị pop tối đa 1 lần trong toàn bộ chương trình → tổng số thao tác pop ≤ n. Vòng trong chạy tổng cộng ≤ 2n lần, không phải n×k.</details>

> 📝 **Tóm tắt mục 3.** Transition `dp[i] = a[i] + min/max(dp[j])` với j trong cửa sổ trượt → deque đơn điệu, O(nk)→O(n). Front = giá trị tối ưu trong cửa sổ; pop front khi rời cửa sổ, pop back các ứng viên vô dụng.

---

## 4. Prefix sum / prefix max optimization

> 💡 **Trực giác.** Nếu `dp[i]` cần tổng (hoặc max) của *toàn bộ* dp[0..i-1] (cửa sổ là cả tiền tố, không trượt), thì duy trì một biến cộng dồn / max chạy là đủ — không cần deque, không cần vòng lặp con. Đây là dạng [prefix sum (L15)](../lesson-15-prefix-sum-difference/) áp dụng lên chính bảng dp.

### 4.1 Ví dụ: số cách leo cầu thang với bước ≤ m

`dp[i]` = số cách lên bậc i, mỗi lần bước 1..m bậc: `dp[i] = dp[i-1] + dp[i-2] + ... + dp[i-m]`.

Naïve = O(n·m). Dùng **prefix sum** của dp → O(1) mỗi bước (cửa sổ tổng độ rộng m → có thể coi là prefix difference):

```go
// O(n) thời gian. pre[i] = dp[0]+...+dp[i-1] (tiền tố).
func climbWays(n, m int) int {
	dp := make([]int, n+1)
	pre := make([]int, n+2) // pre[i] = sum dp[0..i-1]
	dp[0] = 1
	pre[1] = 1 // = dp[0]
	for i := 1; i <= n; i++ {
		lo := i - m
		if lo < 0 {
			lo = 0
		}
		// tổng dp[lo..i-1] = pre[i] - pre[lo]
		dp[i] = pre[i] - pre[lo]
		pre[i+1] = pre[i] + dp[i] // cập nhật tiền tố
	}
	return dp[n]
}
// Walk-through n=4, m=2 (bước 1 hoặc 2):
// dp[0]=1, pre=[_,1,...]
// i=1: lo=0; dp[1]=pre[1]-pre[0]=1-0=1; pre[2]=pre[1]+1=2
// i=2: lo=0; dp[2]=pre[2]-pre[0]=2-0=2; pre[3]=2+2=4
// i=3: lo=1; dp[3]=pre[3]-pre[1]=4-1=3; pre[4]=4+3=7
// i=4: lo=2; dp[4]=pre[4]-pre[2]=7-2=5; -> 5 cách (1+1+1+1, 2+1+1, 1+2+1, 1+1+2, 2+2) ✓
```

### 4.2 Ví dụ: prefix MAX

Transition `dp[i] = a[i] + max(dp[0..i-1])`: chỉ cần một biến `bestSoFar` cập nhật dần:

```go
func bestPrefixMax(a []int) int {
	n := len(a)
	dp := make([]int, n)
	bestSoFar := 0 // max dp[0..i-1]
	for i := 0; i < n; i++ {
		dp[i] = a[i] + bestSoFar
		if dp[i] > bestSoFar {
			bestSoFar = dp[i]
		}
	}
	return dp[n-1]
}
```

### 4.3 Bốn ví dụ số cho climbWays (prefix sum)

Kiểm chứng `climbWays` (bước 1..m) với vài cấu hình, dùng công thức `dp[i]=pre[i]-pre[lo]`:

- `climbWays(4, 2)` = 5 (đã walk-through ở 4.1: các cách 1111, 211, 121, 112, 22).
- `climbWays(5, 2)` = 8 = fib(6) — vì bước 1/2 cho đúng dãy Fibonacci.
- `climbWays(4, 3)` = 7 (bước 1/2/3): 1111, 112, 121, 211, 13, 31, 22.
- `climbWays(3, 3)` = 4: 111, 12, 21, 3.

Naïve O(n·m): với n=10⁶, m=10⁶ → 10¹² thao tác (TLE). Prefix sum O(n) = 10⁶ → chạy tức thì. Mấu chốt: tổng cửa sổ `dp[lo..i-1]` lấy bằng **một phép trừ** `pre[i]-pre[lo]` thay vì cộng lại m số.

> ⚠ **Khác biệt với deque (mục 3).** Prefix dùng khi cửa sổ là **toàn bộ tiền tố** (không giới hạn độ rộng). Nếu cửa sổ **trượt cố định độ rộng k**, prefix max KHÔNG dùng được (vì max cần "rút lui" khi phần tử cũ rời cửa sổ — biến chạy không làm được điều đó) → phải dùng deque. Nhưng prefix **sum** trên cửa sổ độ rộng k vẫn ổn (mục 4.1) vì tổng có phép trừ để rút lui.

> 🔁 **Dừng lại tự kiểm tra.** Vì sao prefix *sum* dùng được cho cửa sổ trượt độ rộng k, còn prefix *max* thì không?
> <details><summary>Đáp án</summary>Tổng có nghịch đảo (phép trừ): `sum[lo..i-1] = pre[i]-pre[lo]`. Max không có nghịch đảo — không thể "trừ ra" phần tử rời cửa sổ. Khi phần tử lớn nhất rời cửa sổ, ta không biết max kế tiếp là bao nhiêu nếu chỉ giữ một biến → phải dùng deque.</details>

> 📝 **Tóm tắt mục 4.** Transition tổng/max trên toàn tiền tố → giữ biến cộng dồn / max chạy, O(1) mỗi bước. Prefix sum còn dùng được cho cửa sổ trượt (có phép trừ); prefix max thì không (phải dùng deque).

---

## 5. Convex Hull Trick (CHT) — giới thiệu

> 💡 **Trực giác.** Transition dạng `dp[i] = min over j ( dp[j] + b[j] · a[i] )`. Đặt `m = b[j]`, `c = dp[j]`, ta thấy mỗi j cho một **đường thẳng** `y = m·x + c` (với x = a[i]). Hỏi `dp[i]` = nhỏ nhất trong các đường thẳng đó tại x = a[i]. Tập hợp các "đáy" của nhiều đường thẳng tạo thành một **đường bao dưới (lower envelope)** lồi — như viền dưới của một dãy núi lật ngược.

Thay vì thử tất cả j (O(n) mỗi i → O(n²)), ta duy trì lower envelope và truy vấn nhanh:

- **Query** min tại một x: O(log n) (binary search trên các đường), hoặc O(1) nếu x đơn điệu (dùng con trỏ chạy).
- **Add** một đường thẳng mới: O(1) khấu hao nếu hệ số góc thêm vào theo thứ tự đơn điệu.

→ Tổng O(n log n), hoặc O(n) trong trường hợp đẹp (cả slope thêm vào lẫn query đều đơn điệu — gọi là **Li Chao tree** hoặc CHT con trỏ).

**Ví dụ điển hình:** bài chia mảng thành đoạn với chi phí bình phương, `dp[i] = min_j (dp[j] + (pre[i]-pre[j])²)`. Khai triển bình phương tách được phần phụ thuộc i ra ngoài → dạng tuyến tính `dp[j] + pre[j]² - 2·pre[j]·pre[i]`, với slope = -2·pre[j], hằng = dp[j]+pre[j]². Đó chính là dạng CHT.

> ❓ **Câu hỏi tự nhiên.** *"Khi nào nên dùng CHT?"* Khi (a) transition đúng dạng tuyến tính theo một biến phụ thuộc i, và (b) n đủ lớn để O(n²) bị TLE (thường n ≥ 10⁵). Nếu n ≤ vài nghìn, O(n²) thường đủ — **đừng** chuốc lấy độ phức tạp của CHT. Đây là kỹ thuật khó, dễ sai dấu/điều kiện pop — chỉ rút ra khi thật cần.

> 📝 **Tóm tắt mục 5.** `dp[i] = min(dp[j] + b[j]·a[i])` (tuyến tính) → mỗi j là một đường thẳng, duy trì lower envelope. Query O(log n) (hoặc O(1) khi x đơn điệu). Mạnh nhưng phức tạp — chỉ dùng khi O(n²) TLE.

---

## 6. Divide & Conquer DP optimization — nhắc qua

> 💡 **Trực giác.** Một số DP dạng `dp[i][j] = min_{k < j} ( dp[i-1][k] + cost(k, j) )` có tính chất: **điểm chia tối ưu $\text{opt}(i, j)$ không giảm khi j tăng** ($\text{opt}(i, j) \leq \text{opt}(i, j+1)$). Tức là vị trí cắt tốt nhất "trôi sang phải" theo j. Tính chất này cho phép dùng chia để trị.

Thay vì cho mỗi (i, j) thử mọi k (O(n) → tổng O(n²) cho mỗi i), ta tính theo đệ quy: giải `j` ở giữa trước, tìm $\text{opt}(\text{mid})$, rồi đệ quy nửa trái với k ∈ [lo, opt(mid)] và nửa phải với k ∈ [opt(mid), hi]. Tổng cho mỗi tầng i là O(n log n) thay vì O(n²).

→ Áp dụng cho DP "chia thành nhóm" có hàm cost thoả tính monotonic của opt. Điều kiện đủ phổ biến: cost thoả **quadrangle inequality** (xem mục 7).

> 📝 **Tóm tắt mục 6.** Nếu $\text{opt}(i,j)$ đơn điệu theo j → D&C DP: O(n²) → O(n log n) mỗi lớp i. Cần chứng minh/tin được tính đơn điệu của điểm chia tối ưu.

---

## 7. Knuth optimization — nhắc qua

> 💡 **Trực giác.** Interval DP dạng `dp[i][j] = min_{i ≤ k < j} ( dp[i][k] + dp[k+1][j] ) + cost(i, j)` (ví dụ [Optimal BST, Matrix Chain — Interval DP L27](../lesson-27-interval-dp/)) thường là O(n³). Nếu cost thoả **quadrangle inequality (QI)** thì điểm chia tối ưu thoả: $\text{opt}(i, j-1) \leq \text{opt}(i, j) \leq \text{opt}(i+1, j)$. Khi quét k ta chỉ cần duyệt trong khoảng $[\text{opt}(i,j-1), \text{opt}(i+1,j)]$ thay vì toàn bộ $[i, j)$.

Tổng số phép thử k khi cộng dồn lại chỉ còn O(n²) thay vì O(n³).

**Quadrangle inequality** (điều kiện đủ): với $a \leq b \leq c \leq d$,
$$cost(a, c) + cost(b, d) \leq cost(a, d) + cost(b, c)$$
(cùng với điều kiện đơn điệu $\text{cost}(b,c) \leq \text{cost}(a,d)$).

> ⚠ Knuth opt đòi cấu trúc rất đặc thù (interval DP + QI). Nhiều bài *trông giống* nhưng cost không thoả QI → áp dụng sẽ ra sai. Luôn kiểm tra QI (hoặc thử trên ví dụ nhỏ) trước khi dùng.

> 📝 **Tóm tắt mục 7.** Interval DP `dp[i][j]=min_k(dp[i][k]+dp[k+1][j])+cost` với cost thoả quadrangle inequality → O(n³)→O(n²) nhờ giới hạn k trong $[\text{opt}(i,j-1), \text{opt}(i+1,j)]$.

---

## 8. Matrix exponentiation

> 💡 **Trực giác.** Recurrence tuyến tính hệ số hằng (như Fibonacci) có thể viết dưới dạng "nhân một vector trạng thái với một ma trận chuyển T". Đi n bước = nhân T với chính nó n lần = **T mũ n**. Mà lũy thừa thì tính bằng [fast power (L17)](../lesson-17-divide-and-conquer/) trong O(log n) phép nhân ma trận → tính được số hạng thứ 10¹⁸ trong ~60 bước.

### 8.1 Fibonacci bằng ma trận 2×2

Quan hệ then chốt:

```
[ f(n+1) ]   [ 1 1 ] [ f(n)   ]
[ f(n)   ] = [ 1 0 ] [ f(n-1) ]
```

Đặt `T = [[1,1],[1,0]]`. Khi đó:

```
[ f(n+1) ]        [ f(1) ]        [ 1 ]
[ f(n)   ] = T^n  [ f(0) ] = T^n  [ 0 ]
```

→ $f(n)$ = phần tử `[0][1]` (hoặc `[1][0]`) của $T^n$. Kiểm chứng:

```
T^1 = [[1,1],[1,0]]   -> [0][1]=1 = f(1)? f(1)=1 ✓  ([1][0]=1=f(1))
T^2 = [[2,1],[1,1]]   -> [0][1]=1 = f(2)=1 ✓
T^3 = [[3,2],[2,1]]   -> [0][1]=2 = f(3)=2 ✓
T^5 = [[8,5],[5,3]]   -> [0][1]=5 = f(5)=5 ✓
```

```go
type Mat [2][2]int64

const MOD = 1_000_000_007 // thường tính modulo vì số fib lớn

func mul(a, b Mat) Mat {
	var c Mat
	for i := 0; i < 2; i++ {
		for j := 0; j < 2; j++ {
			var s int64
			for k := 0; k < 2; k++ {
				s = (s + a[i][k]*b[k][j]) % MOD
			}
			c[i][j] = s
		}
	}
	return c
}

// Lũy thừa nhanh ma trận: T^n trong O(log n) phép nhân (giống fast power L17).
func matPow(base Mat, n int64) Mat {
	result := Mat{{1, 0}, {0, 1}} // ma trận đơn vị I
	for n > 0 {
		if n&1 == 1 {
			result = mul(result, base)
		}
		base = mul(base, base)
		n >>= 1
	}
	return result
}

// O(log n) thời gian — tính fib(n) kể cả n = 10^18.
func fibMatrix(n int64) int64 {
	if n == 0 {
		return 0
	}
	T := Mat{{1, 1}, {1, 0}}
	M := matPow(T, n)
	return M[0][1] // = f(n)
}
// Walk-through fib(5): T^5 tính qua: n=5 (101b)
//   n=5 lẻ: result = I*T = T;        base=T^2;   n=2
//   n=2 chẵn:                        base=T^4;   n=1
//   n=1 lẻ: result = T * T^4 = T^5;  base=T^8;   n=0
//   result[0][1] = 5 = fib(5) ✓ (chỉ 3 vòng lặp thay vì 5 bước cộng)
```

### 8.2 Đếm số đường đi độ dài đúng L trong đồ thị

Một ứng dụng đẹp khác: nếu A là **ma trận kề** (adjacency matrix) của đồ thị, thì `(A^L)[u][v]` = **số đường đi độ dài đúng L** từ u tới v. Tính `A^L` bằng matrix expo → O(V³ log L) thay vì duyệt mọi đường (mũ).

```
Ý: (A^2)[u][v] = Σ_w A[u][w]·A[w][v]  = số cặp cạnh (u->w->v) = số đường dài 2.
Quy nạp: (A^L)[u][v] = số đường dài L. -> tính A^L bằng lũy thừa nhanh.
```

> ❓ **Câu hỏi tự nhiên.** *"Recurrence nào dùng được matrix expo?"* Chỉ **tuyến tính, hệ số HẰNG**: $f(n) = c_1 \cdot f(n-1) + c_2 \cdot f(n-2) + ... + c_d \cdot f(n-d)$. Bậc d → ma trận d×d → O(d³ log n). Nếu hệ số *thay đổi theo n* (vd $f(n) = n \cdot f(n-1)$) thì KHÔNG dùng được — ma trận chuyển không cố định.

> ⚠ **Lỗi thường gặp.** (1) Quên modulo → tràn số (fib lớn rất nhanh). (2) Đặt sai ma trận chuyển T (sai thứ tự trạng thái). (3) Áp matrix expo cho recurrence hệ số không hằng. Luôn kiểm T bằng cách tính tay T^1, T^2 và đối chiếu vài số hạng đầu (như mục 8.1).

### 8.3 So sánh số bước: tuyến tính vs matrix expo

Bốn ví dụ cụ thể về số bước (mỗi "bước log" = 1 vòng lặp lũy thừa, mỗi vòng O(1) cho ma trận 2×2):

| n | DP tuyến tính (số bước cộng) | Matrix expo (số vòng = ⌊log₂n⌋+1) | Tỉ lệ |
|---|------------------------------|------------------------------------|-------|
| 10 | 10 | 4 | ~2.5× |
| 10⁶ | 1 000 000 | 20 | ~50 000× |
| 10¹² | 10¹² (≈ vài giờ) | 40 | thiên văn |
| 10¹⁸ | 10¹⁸ (bất khả thi) | 60 | thiên văn |

Với n=10¹⁸, DP tuyến tính cần 10¹⁸ phép cộng — ở tốc độ 10⁹ phép/giây mất ~30 năm. Matrix expo: 60 vòng, mỗi vòng vài phép nhân int64 → dưới 1 micro-giây. Đây là lý do mọi bài "tính số hạng thứ n cực lớn của recurrence tuyến tính" đều đáp bằng matrix expo.

> 🔁 **Dừng lại tự kiểm tra.** Vì sao matrix expo cho fib chỉ O(log n) dù phải nhân ma trận?
> <details><summary>Đáp án</summary>Mỗi phép nhân ma trận 2×2 là O(1) (số phép cố định = 8 phép nhân). Lũy thừa nhanh dùng O(log n) phép nhân (bình phương liên tiếp + nhân theo bit của n). → O(log n) tổng. Với ma trận d×d thì mỗi phép nhân là O(d³).</details>

> 📝 **Tóm tắt mục 8.** Recurrence tuyến tính hệ số hằng → ma trận chuyển T, tính T^n bằng fast power → O(d³ log n). Fib bằng T=[[1,1],[1,0]]. Đếm path độ dài L bằng A^L. Nhớ modulo, kiểm T trên số hạng đầu.

---

## 9. Bitset optimization — nhắc qua

> 💡 **Trực giác.** Subset-sum boolean: `reach[s]` = có chọn được tập con tổng đúng s không? DP cơ bản: `reach[s] |= reach[s - a[i]]` cho mọi s — O(n·S). Nhưng `reach` là mảng *bit* (true/false). Một thanh ghi 64-bit xử lý 64 phần tử cùng lúc bằng phép dịch + OR → tăng tốc **hằng số ~64×**.

```
reach = reach | (reach << a[i])   // dịch trái a[i] bit rồi OR — cập nhật 64 trạng thái/phép
```

→ Độ phức tạp **bậc** vẫn O(n·S) nhưng hằng số chia ~64 → đủ để qua nhiều bài 10⁴×10⁴ vốn TLE.

Trong Go không có kiểu bitset built-in như `std::bitset` của C++, nhưng có thể dùng `math/big` (`big.Int` hỗ trợ `Lsh`, `Or`) hoặc tự cài mảng `[]uint64`.

> ⚠ **Lưu ý.** Bitset chỉ giảm **hằng số**, không đổi bậc Big-O. Nó cứu các bài "sát nút" TLE, không cứu được bài cần đổi *bậc* (vd 10⁶×10⁶). Và chỉ áp được khi trạng thái DP là **boolean** (đạt được / không).

> 📝 **Tóm tắt mục 9.** Subset-sum boolean → bitset (`reach |= reach << a[i]`), tăng tốc ~64× (hằng số, không đổi bậc). Dùng khi bài "sát nút" TLE và trạng thái là boolean.

---

## 10. Khi nào nên tối ưu DP?

> 💡 **Nguyên tắc vàng: viết DP ĐÚNG trước, tối ưu sau — và chỉ khi cần.**

Quy trình thực tế:

1. **Viết DP cơ bản đúng** (đệ quy + memo, hoặc bottom-up). Đảm bảo ra kết quả đúng trên ví dụ nhỏ.
2. **Ước lượng độ phức tạp** so với ràng buộc đề bài. n ≤ 5000, DP O(n²) = 2.5×10⁷ → ổn, **không cần tối ưu**. n = 10⁵, O(n²) = 10¹⁰ → TLE, **cần tối ưu**.
3. **Nhận diện cấu trúc** để chọn kỹ thuật (bảng mục 11).
4. **Tối ưu**, rồi *kiểm lại* kết quả vẫn khớp DP cơ bản trên ví dụ nhỏ.

> ❓ **Câu hỏi tự nhiên.** *"Làm sao biết bài này dùng kỹ thuật nào?"* Đọc dạng transition:
> - Chỉ phụ thuộc vài hàng trước → **space opt (rolling)**.
> - min/max trên cửa sổ trượt → **deque**.
> - tổng/max trên cả tiền tố → **prefix**.
> - `dp[j] + b[j]·a[i]` (tuyến tính) → **CHT**.
> - `min_k(dp[i][k]+dp[k+1][j])+cost` interval → **Knuth**.
> - recurrence tuyến tính hệ số hằng, n cực lớn → **matrix expo**.
> - trạng thái boolean subset-sum, sát nút → **bitset**.

> ⚠ **Đừng tối ưu sớm (premature optimization).** Lao vào CHT/Knuth khi n=1000 (O(n²) thừa sức qua) chỉ tổ thêm bug và tốn thời gian. "Premature optimization is the root of all evil" — Knuth.

> 📝 **Tóm tắt mục 10.** Viết DP đúng → ước lượng độ phức tạp so với ràng buộc → chỉ tối ưu khi TLE/MLE → chọn kỹ thuật theo cấu trúc transition → kiểm lại kết quả khớp bản gốc.

---

## 11. Bảng tổng kết kỹ thuật

| Kỹ thuật | Điều kiện áp dụng (dạng transition) | Giảm từ → xuống | Đánh đổi / lưu ý |
|----------|--------------------------------------|------------------|------------------|
| **Space opt (rolling)** | `dp[i]` chỉ phụ thuộc vài hàng trước | bộ nhớ O(n²)→O(n), O(n)→O(1) | Phá truy vết lời giải |
| **Monotonic deque** | `dp[i]=a[i]+min/max(dp[j])`, j ∈ cửa sổ trượt độ rộng k | thời gian O(nk)→O(n) | Phải xử lý đúng vào/ra cửa sổ |
| **Prefix sum** | tổng dp trên tiền tố / cửa sổ trượt | O(nk)→O(n) | Cần phép trừ (chỉ cho tổng) |
| **Prefix max** | max dp trên cả tiền tố (không trượt) | O(n²)→O(n) | KHÔNG dùng cho cửa sổ trượt |
| **Convex Hull Trick** | `dp[i]=min(dp[j]+b[j]·a[i])` (tuyến tính) | O(n²)→O(n log n) hay O(n) | Phức tạp, dễ sai dấu |
| **D&C DP** | `opt(i,j)` đơn điệu theo j | O(n²)→O(n log n) mỗi lớp | Cần chứng minh đơn điệu opt |
| **Knuth opt** | interval DP + quadrangle inequality | O(n³)→O(n²) | Phải kiểm QI |
| **Matrix expo** | recurrence tuyến tính hệ số HẰNG, n cực lớn | O(n)→O(d³ log n) | Chỉ hệ số hằng; nhớ modulo |
| **Bitset** | subset-sum boolean, sát nút TLE | hằng số ÷ ~64 (bậc giữ nguyên) | Chỉ giảm hằng số, chỉ cho boolean |

---

## 12. Cạm bẫy thường gặp

1. **Space opt phá truy vết.** Khi nén bảng 2D về 1D/2 hàng, bạn mất khả năng đọc lại hàng cũ → không truy vết được lời giải (chuỗi LCS, danh sách vật knapsack). Cần lời giải → giữ bảng đầy đủ hoặc dùng Hirschberg.
2. **Knapsack 0/1 nén 1D mà duyệt w tăng dần.** → lấy lại vật nhiều lần (thành unbounded). Phải duyệt **giảm dần** (mục 2.2).
3. **Deque quên xử lý ra/vào cửa sổ.** Quên pop front đã rời cửa sổ → dùng giá trị lậu ngoài cửa sổ → sai.
4. **CHT/Knuth phức tạp, dễ sai.** Sai dấu khi pop đường thẳng, sai điều kiện QI. **Chỉ dùng khi DP cơ bản thật sự TLE** — n nhỏ thì O(n²)/O(n³) là đủ.
5. **Matrix expo cho recurrence hệ số KHÔNG hằng.** $f(n)=n \cdot f(n-1)$ không có ma trận chuyển cố định → matrix expo sai. Chỉ dùng cho hệ số hằng. Và **luôn nhớ modulo** (số fib tràn int64 từ ~f(92)).
6. **Bitset tưởng đổi bậc.** Bitset chỉ chia hằng số ~64, KHÔNG đổi Big-O. Bài cần đổi bậc thì bitset vô dụng.
7. **Tối ưu sớm.** Tối ưu khi chưa cần = thêm bug + tốn thời gian. Đo độ phức tạp trước; chỉ tối ưu khi vượt ràng buộc.

---

## 13. Ứng dụng thực tế trong phần mềm

> 💡 **DP optimization = "DP đúng rồi nhưng quá chậm cho dữ liệu lớn" → tăng tốc bằng cấu trúc/toán.** Đây là phần xuất hiện khi DP $O(n^2)$ không đủ nhanh ở quy mô production/competitive.

| Kỹ thuật | Dùng khi | Ví dụ thật |
|----------|----------|-----------|
| **Convex Hull Trick / Li Chao** | Chuyển đổi $O(n^2) \to O(n \log n)$ khi DP có dạng đường thẳng | Tối ưu chi phí sản xuất theo lô, định giá |
| **Divide & Conquer optimization** | Điều kiện monotonic điểm tối ưu | Phân cụm 1D (k-means 1 chiều), chia đoạn tối ưu |
| **Knuth optimization** | Interval DP thỏa bất đẳng thức tứ giác | Optimal BST, merge file |
| **Monotonic deque (sliding window max)** | DP có cửa sổ trượt | Lập lịch, jump game có giới hạn |

### 13.1. Bối cảnh thực tế — vì sao cần tối ưu DP

Một DP $O(n^2)$ với $n = 10^5$ là $10^{10}$ phép tính → vài chục giây, **quá chậm** cho API thời gian thực hay batch lớn. Các kỹ thuật trên hạ xuống $O(n \log n)$ hoặc $O(n)$ → chạy trong mili giây. Trong thực tế phần mềm thường gặp ở: tối ưu chi phí theo lô (manufacturing/logistics), định giá động (dynamic pricing), phân đoạn tín hiệu/chuỗi thời gian quy mô lớn.

> ❓ **"Có cần học mấy cái này không nếu không thi competitive?"** Phần lớn code ứng dụng **không** — vì $n$ thường đủ nhỏ, hoặc đã có thư viện. Nhưng khi gặp bottleneck DP trên dữ liệu lớn (vd phân đoạn 1 triệu điểm), biết "DP này có thể tăng tốc bằng convex hull trick" là khác biệt giữa "chạy 30s" và "chạy 0.1s". Đây là kiến thức **biết-để-nhận-ra**, không phải để cài lại mỗi ngày.

### 13.2. 📝 Tóm tắt mục 13

- DP optimization = tăng tốc DP đúng-nhưng-chậm: **convex hull trick**, **D&C opt**, **Knuth opt**, **monotonic deque**.
- Cần khi $n$ lớn ($\ge 10^5$) và DP $O(n^2)$ quá chậm; hạ về $O(n \log n)$/$O(n)$.
- Ứng dụng: tối ưu lô sản xuất, dynamic pricing, phân đoạn chuỗi thời gian lớn. Kiến thức "biết để nhận ra".

## Bài tập

> Mọi bài có lời giải chi tiết ở mục kế tiếp. Hãy thử tự làm trước.

**Bài 1.** Cho DP knapsack 0/1 bảng 2D `dp[n+1][W+1]`. Space-optimize về O(W) và giải thích vì sao duyệt w giảm dần. Cho Big-O trước/sau (bộ nhớ).

**Bài 2.** Jump Game VI: mảng `a`, k bước, `dp[i]=a[i]+max(dp[i-k..i-1])`. Cài bằng deque đạt O(n). Cho Big-O trước/sau (thời gian).

**Bài 3.** Tính `fib(n)` với n có thể tới 10¹⁸ (modulo 10⁹+7) bằng matrix exponentiation. Cho Big-O trước/sau.

**Bài 4.** Constrained Subsequence Sum: chọn dãy con sao cho hai phần tử liền kề cách ≤ k chỉ số, tối đa tổng. Cài bằng deque O(n).

**Bài 5.** Cho đồ thị có hướng n đỉnh (ma trận kề A). Đếm số đường đi độ dài đúng L từ đỉnh s tới đỉnh t (modulo). Dùng matrix expo. Cho Big-O.

**Bài 6.** Với mỗi DP sau, cho biết kỹ thuật tối ưu phù hợp và Big-O trước/sau:
- (a) `dp[i]=min(dp[j]+(pre[i]-pre[j])²)`, n=2×10⁵.
- (b) `dp[i]=dp[i-1]+dp[i-2]`, cần `dp[10¹⁸]`.
- (c) LCS hai chuỗi dài 4×10⁴, chỉ cần *độ dài*, MLE với bảng đầy đủ.
- (d) `dp[i]=a[i]+max(dp[i-k..i-1])`, n=10⁵, k=10⁵.
- (e) `reach[s] |= reach[s-a[i]]`, subset-sum boolean, n=2000, S=2×10⁴, sát nút TLE.

**Bài 7 (thử thách).** Số cách lát hình chữ nhật 2×n bằng domino = fib(n+1). Tính cho n=10¹⁸ (mod 10⁹+7). Dùng matrix expo.

---

## Lời giải chi tiết

### Lời giải Bài 1 — Space-optimize knapsack 0/1

**Cách tiếp cận.** Bảng 2D `dp[i][w]` chỉ đọc hàng `i-1` → nén còn mảng 1D `dp[w]`, duyệt vật ngoài, w trong. Duyệt **w giảm dần** để `dp[w-wt[i]]` còn là giá trị hàng cũ (trạng thái chưa lấy vật i).

```go
func knapsack(wt, val []int, W int) int {
	dp := make([]int, W+1)
	for i := range wt {
		for w := W; w >= wt[i]; w-- { // GIẢM dần
			if dp[w-wt[i]]+val[i] > dp[w] {
				dp[w] = dp[w-wt[i]] + val[i]
			}
		}
	}
	return dp[W]
}
```

**Vì sao duyệt giảm dần:** với 0/1, mỗi vật dùng tối đa 1 lần. Đọc `dp[w-wt[i]]` phải là trạng thái *chưa* gồm vật i (hàng i-1). Duyệt tăng → ô đó đã cập nhật cho vật i → vật i bị tính lại (sai, thành unbounded).

**Big-O:** Thời gian O(n·W) (không đổi). **Bộ nhớ O(n·W) → O(W)** — với n=2000, W=10⁵: từ 1.6 GB xuống 0.8 MB.

### Lời giải Bài 2 — Jump Game VI (deque)

**Cách tiếp cận.** `dp[i]=a[i]+max(dp[i-k..i-1])` là sliding-window-maximum trên dp. Deque giảm dần giữ ứng viên; front = max trong cửa sổ. (Code đầy đủ + walk-through ở mục 3.1.)

**Big-O:** Naïve O(n·k) (mỗi i quét k phần tử). **Deque O(n)** (amortized: mỗi chỉ số vào/ra deque đúng 1 lần). Với n=k=10⁵: từ 10¹⁰ xuống 10⁵.

### Lời giải Bài 3 — fib bằng matrix expo

**Cách tiếp cận.** `T=[[1,1],[1,0]]`, `fib(n)=(T^n)[0][1]`, tính `T^n` bằng fast power. (Code đầy đủ + walk-through ở mục 8.1.) Nhớ modulo 10⁹+7 trong `mul` để tránh tràn int64.

**Big-O:** DP tuyến tính O(n) → bất khả thi với n=10¹⁸. **Matrix expo O(log n)** ≈ 60 phép nhân ma trận 2×2 (mỗi phép O(1)).

### Lời giải Bài 4 — Constrained Subsequence Sum (deque)

**Cách tiếp cận.** Giống Jump Game VI nhưng `dp[i]=a[i]+max(0, max(dp[i-k..i-1]))` (được phép bắt đầu lại nếu mọi dp[j] âm), đáp số = max toàn bộ dp. (Code + walk-through ở mục 3.2.)

**Big-O:** Naïve O(n·k). **Deque O(n).**

### Lời giải Bài 5 — đếm path độ dài L (matrix expo)

**Cách tiếp cận.** `(A^L)[s][t]` = số đường đi độ dài đúng L từ s tới t (A = ma trận kề). Tính `A^L` bằng matrix expo, lấy ô `[s][t]`.

```go
func countPaths(A [][]int64, s, t int, L int64) int64 {
	n := len(A)
	M := matPowN(A, n, L) // A^L bằng fast power ma trận n×n, modulo
	return M[s][t]
}
// matPowN: như matPow nhưng cho ma trận n×n tổng quát (vòng lặp i,j,k 0..n).
```

**Vì sao đúng:** `(A^2)[u][v]=Σ_w A[u][w]·A[w][v]` = số đường u→w→v dài 2; quy nạp lên L.

**Big-O:** Liệt kê mọi đường = mũ. **Matrix expo O(n³ log L)** (mỗi nhân ma trận n×n là O(n³), có O(log L) phép nhân).

### Lời giải Bài 6 — nhận diện kỹ thuật

| | DP | Kỹ thuật | Trước → Sau |
|--|----|---------|-------------|
| (a) | `dp[i]=min(dp[j]+(pre[i]-pre[j])²)`, n=2×10⁵ | **Convex Hull Trick** (khai triển bình phương → tuyến tính theo pre[i]) | O(n²)=4×10¹⁰ → O(n log n) |
| (b) | `dp[i]=dp[i-1]+dp[i-2]`, dp[10¹⁸] | **Matrix expo** (recurrence tuyến tính hệ số hằng) | O(n) bất khả thi → O(log n) |
| (c) | LCS, dài 4×10⁴, chỉ cần độ dài | **Space opt** (giữ 2 hàng) | bộ nhớ O(mn)=1.6×10⁹ → O(min(m,n)) |
| (d) | `dp[i]=a[i]+max(dp[i-k..i-1])`, n=k=10⁵ | **Monotonic deque** | thời gian O(nk)=10¹⁰ → O(n) |
| (e) | `reach[s]\|=reach[s-a[i]]`, n=2000, S=2×10⁴, sát nút | **Bitset** | O(nS)=4×10⁷ ÷ ~64 (hằng số) |

### Lời giải Bài 7 — lát domino 2×n (matrix expo)

**Cách tiếp cận.** Gọi `t(n)` = số cách lát 2×n. Cột cuối hoặc 1 domino dọc (còn 2×(n-1)) hoặc 2 domino ngang (còn 2×(n-2)) → `t(n)=t(n-1)+t(n-2)`, `t(0)=1, t(1)=1` → `t(n)=fib(n+1)`.

```go
func dominoTilings(n int64) int64 {
	return fibMatrix(n + 1) // t(n) = fib(n+1)
}
```

**Kiểm chứng:** t(1)=fib(2)=1 ✓ (1 domino dọc); t(2)=fib(3)=2 ✓ (2 dọc / 2 ngang); t(3)=fib(4)=3 ✓.

**Big-O:** O(log n) nhờ matrix expo.

---

## Code & Minh họa

- Toàn bộ code Go ở dạng inline trong README này (space-opt knapsack/LCS/fib, deque Jump Game VI & Constrained Subset Sum, prefix sum, matrix expo). Không có `solutions.go` riêng (theo quy ước, chỉ tạo khi yêu cầu).
- **[visualization.html](./visualization.html)** — 3 module tương tác:
  1. **Space optimization** — bảng DP 2D cuộn về 1 hàng (rolling array), hiển thị bộ nhớ tiết kiệm.
  2. **Monotonic deque DP** — mô phỏng deque giữ max trong cửa sổ trượt cho transition.
  3. **Matrix exponentiation** — fib bằng lũy thừa ma trận 2×2, đếm số bước log n so với tuyến tính.

---

## Kết thúc Tier 4 — Bước tiếp theo

Đây là bài **cuối cùng** của Tier 4 (Quy hoạch động). Bạn đã đi từ DP cơ bản (1D, grid, interval, tree, bitmask) tới các kỹ thuật tối ưu nâng cao. Tiếp theo:

- **[Tier 5 — Thuật toán đồ thị](../tier-5-graph/index.html)** — BFS/DFS, topo sort, Dijkstra, Bellman-Ford, MST, SCC, luồng cực đại. Nhiều bài đồ thị (đường đi ngắn nhất trên DAG, đếm đường) bản chất là DP — kiến thức tối ưu DP ở đây sẽ tái dùng.

> 📝 **Chốt lại cả bài.** Tối ưu DP = khai thác cấu trúc đặc biệt của transition. Rolling array (giảm bộ nhớ), deque/prefix (giảm thời gian cho cửa sổ/tiền tố), CHT/Knuth/D&C DP (giảm bậc cho dạng tuyến tính/interval), matrix expo (recurrence hệ số hằng, n cực lớn), bitset (hằng số). Luôn: **viết DP đúng trước, đo độ phức tạp, chỉ tối ưu khi cần**.
