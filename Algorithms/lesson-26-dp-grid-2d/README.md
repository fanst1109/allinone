# Lesson 26 — Quy hoạch động 2 chiều / Trên lưới (2D DP / Grid DP)

> **Tier 4 — Quy hoạch động.** Bài này nâng `dp[i]` (1 chỉ số, [Lesson 24](../lesson-24-dp-1d/)) lên `dp[i][j]` (2 chỉ số). Đây là họ DP phổ biến nhất trong phỏng vấn: so khớp hai chuỗi (LCS, edit distance) và đi đường trên lưới (unique paths, min path sum).

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Hiểu **state 2 chỉ số** `dp[i][j]` là gì và khi nào cần nó.
- Phân biệt **2 nhóm** DP 2D: (a) trên 2 chuỗi/dãy, (b) trên lưới (grid path).
- Giải thành thạo: **unique paths**, **min path sum**, **unique paths có vật cản**, **LCS**, **edit distance (Levenshtein)**, **longest common substring**, **distinct subsequences**.
- **Truy vết (backtrack)** lại đường đi / chuỗi kết quả từ bảng `dp`.
- **Tối ưu bộ nhớ** 2D → 1D (chỉ giữ 2 hàng hoặc 1 hàng + biến).
- Né các **off-by-one** kinh điển của DP chuỗi (prefix độ dài `i` ↔ chỉ số `i-1`).

## Kiến thức tiền đề

- [Lesson 23 — DP Fundamentals](../lesson-23-dp-fundamentals/): state, transition, base case, memoization vs tabulation.
- [Lesson 24 — DP 1 chiều](../lesson-24-dp-1d/): `dp[i]`, Kadane, climbing stairs.
- [Lesson 25 — Knapsack Family](../lesson-25-knapsack-family/): 0/1 knapsack vốn đã là DP 2D `dp[i][w]` — bài này tổng quát hoá.
- [Lesson 01 — Big-O](../lesson-01-bigo-asymptotic/): để đọc độ phức tạp $O(m \cdot n)$.

---

## 1. DP 2D là gì?

> 💡 **Trực giác.** Ở [Lesson 24](../lesson-24-dp-1d/), một bài toán được mô tả đủ bằng **một con số** (ví dụ "đang đứng ở bậc thang thứ `i`"). Nhưng nhiều bài cần **hai con số** mới mô tả hết một "tình huống con": ví dụ "đã xét tới ký tự thứ `i` của chuỗi A *và* ký tự thứ `j` của chuỗi B", hoặc "đang đứng ở ô hàng `i`, cột `j` của lưới". Khi cần 2 toạ độ để định vị một bài toán con → ta dùng bảng 2 chiều `dp[i][j]`.

**Định nghĩa.** *DP 2 chiều* là DP mà **state** (trạng thái mô tả một bài toán con) được đánh chỉ số bằng **hai tham số**. Ta lưu kết quả trong một mảng 2 chiều `dp[i][j]`, điền theo thứ tự sao cho khi tính ô `(i, j)` thì các ô nó phụ thuộc đã được tính xong.

### 1.1 Hai nhóm bài DP 2D

| Nhóm | State `dp[i][j]` nghĩa là | Phụ thuộc điển hình | Ví dụ |
|------|---------------------------|---------------------|-------|
| **(a) Trên 2 chuỗi/dãy** | "đáp số cho prefix dài `i` của A và prefix dài `j` của B" | `dp[i-1][j-1]`, `dp[i-1][j]`, `dp[i][j-1]` | LCS, edit distance, distinct subsequences |
| **(b) Trên lưới (grid)** | "đáp số tại ô hàng `i`, cột `j`" | `dp[i-1][j]`, `dp[i][j-1]` (đi xuống/phải) | unique paths, min path sum, maximal square |

> ❓ **Câu hỏi tự nhiên: hai nhóm này khác gì nhau?**
>
> - Nhóm **lưới** có toạ độ thật là vị trí vật lý trong ma trận đầu vào — `grid[i][j]` là dữ liệu, `dp[i][j]` là đáp số tới ô đó.
> - Nhóm **2 chuỗi** không có "lưới" trong input; ta *tự dựng* một bảng `(len(A)+1) × (len(B)+1)`, trong đó hàng `i` ứng với "đã dùng `i` ký tự đầu của A". Ô `dp[0][*]` và `dp[*][0]` là base case (một chuỗi rỗng).
>
> Cùng kỹ thuật điền bảng, khác ý nghĩa state. Nắm cả hai là nắm 80% DP 2D.

### 1.2 Bốn ví dụ số nhanh để thấy "2 chỉ số"

1. **Unique paths** lưới `2×2`: `dp[1][1] = dp[0][1] + dp[1][0] = 1 + 1 = 2`.
2. **Min path sum** lưới `[[1,3],[1,5]]`: `dp[1][1] = grid[1][1] + min(dp[0][1], dp[1][0]) = 5 + min(4, 2) = 7`.
3. **LCS** của `"AB"` và `"B"`: `dp[2][1] = 1` (chung được "B").
4. **Edit distance** `"ab" → "a"`: `dp[2][1] = 1` (xoá 'b').

Mỗi đáp số được định vị bởi **hai chỉ số** — đó là dấu hiệu của DP 2D.

> 🔁 **Dừng lại tự kiểm tra.**
> 1. Vì sao knapsack ([Lesson 25](../lesson-25-knapsack-family/)) đã là DP 2D dù input là một dãy item?
> 2. State của LCS dùng "prefix độ dài `i`" hay "ký tự thứ `i`"?
>
> <details><summary>Đáp án</summary>
>
> 1. Vì state là `dp[i][w]` = "xét `i` item đầu, sức chứa còn `w`" — hai tham số (item index + capacity). Capacity chính là chiều thứ hai.
> 2. **Prefix độ dài `i`**: `dp[i][j]` = LCS của `A[0..i-1]` và `B[0..j-1]`. Khi cần ký tự, dùng `A[i-1]` (lệch 1). Đây là nguồn off-by-one phổ biến nhất.
> </details>

> 📝 **Tóm tắt mục 1.**
> - DP 2D = state cần **2 tham số** → bảng `dp[i][j]`.
> - Nhóm (a) 2 chuỗi: `dp[i][j]` cho prefix dài `i`, `j`; base case là hàng/cột 0 (chuỗi rỗng).
> - Nhóm (b) lưới: `dp[i][j]` là đáp số tại ô `(i,j)`; phụ thuộc ô trên + ô trái.
> - Độ phức tạp điển hình $O(m \cdot n)$ thời gian, $O(m \cdot n)$ bộ nhớ (có thể giảm còn $O(\min(m,n))$).

---

## 2. Unique paths — đếm đường trên lưới

Cho lưới `m × n`. Robot xuất phát ở góc trên-trái `(0,0)`, chỉ đi **sang phải** hoặc **xuống dưới**, tới góc dưới-phải `(m-1, n-1)`. **Có bao nhiêu đường đi khác nhau?**

> 💡 **Trực giác.** Để vào một ô, robot phải đến từ ô **bên trái** (vừa đi sang phải) hoặc ô **phía trên** (vừa đi xuống). Vậy số đường tới ô đó = số đường tới ô trái + số đường tới ô trên. Hàng đầu và cột đầu chỉ có **một** đường (đi thẳng), nên `dp = 1`.

**State.** `dp[i][j]` = số đường đi khác nhau từ `(0,0)` tới `(i,j)`.

**Transition.**
```
dp[i][j] = dp[i-1][j] + dp[i][j-1]
```

**Base case.** `dp[0][j] = 1` cho mọi `j` (hàng đầu, chỉ đi sang phải); `dp[i][0] = 1` cho mọi `i` (cột đầu, chỉ đi xuống).

### 2.1 Walk-through lưới 3×3

Điền bảng `3×3`. Hàng/cột đầu = 1:

```
       j=0   j=1   j=2
i=0:    1     1     1
i=1:    1     ?     ?
i=2:    1     ?     ?
```

Điền từng ô (mỗi ô = trên + trái):

- `dp[1][1] = dp[0][1] + dp[1][0] = 1 + 1 = 2`
- `dp[1][2] = dp[0][2] + dp[1][1] = 1 + 2 = 3`
- `dp[2][1] = dp[1][1] + dp[2][0] = 2 + 1 = 3`
- `dp[2][2] = dp[1][2] + dp[2][1] = 3 + 3 = 6`

Bảng đầy đủ:

```
       j=0   j=1   j=2
i=0:    1     1     1
i=1:    1     2     3
i=2:    1     3     6
```

**Đáp số = `dp[2][2] = 6`.** Kiểm chứng bằng công thức tổ hợp: đường đi gồm $(m-1)$ bước xuống và $(n-1)$ bước phải, tổng $(m-1)+(n-1)=4$ bước, chọn vị trí 2 bước xuống: $C(4,2) = 6$ ✓.

### 2.2 Bốn ví dụ số

| Lưới | Đáp số `dp[m-1][n-1]` | Kiểm chứng $C(m+n-2, m-1)$ |
|------|-----------------------|----------------------------|
| `1×1` | 1 | $C(0,0)=1$ ✓ |
| `2×2` | 2 | $C(2,1)=2$ ✓ |
| `3×3` | 6 | $C(4,2)=6$ ✓ |
| `3×7` | 28 | $C(8,2)=28$ ✓ |

> ⚠ **Lỗi thường gặp.** Quên khởi tạo **toàn bộ** hàng đầu và cột đầu bằng 1. Nếu chỉ đặt `dp[0][0]=1` rồi áp transition cho mọi ô, các ô `dp[0][j]` sẽ cộng `dp[0][j-1] + dp[-1][j]` — `dp[-1][j]` không tồn tại (hoặc = 0) → kết quả vẫn đúng cho hàng đầu nếu bạn coi out-of-bound = 0, **nhưng** nếu bạn lười không xử lý biên thì index âm gây panic. Cách an toàn: khởi tạo biên rõ ràng, rồi mới chạy vòng từ `(1,1)`.

### 2.3 Code Go — unique paths

```go
package main

import "fmt"

// uniquePaths đếm số đường đi từ (0,0) tới (m-1,n-1),
// mỗi bước chỉ đi PHẢI hoặc XUỐNG.
// dp[i][j] = số đường tới ô (i,j).
func uniquePaths(m, n int) int {
	dp := make([][]int, m)
	for i := range dp {
		dp[i] = make([]int, n)
	}
	// base case: hàng đầu và cột đầu chỉ có 1 đường (đi thẳng)
	for j := 0; j < n; j++ {
		dp[0][j] = 1
	}
	for i := 0; i < m; i++ {
		dp[i][0] = 1
	}
	// điền phần còn lại: mỗi ô = ô trên + ô trái
	for i := 1; i < m; i++ {
		for j := 1; j < n; j++ {
			dp[i][j] = dp[i-1][j] + dp[i][j-1]
		}
	}
	return dp[m-1][n-1]
}

func main() {
	fmt.Println(uniquePaths(3, 3)) // 6  (walk-through ở trên)
	fmt.Println(uniquePaths(3, 7)) // 28
	fmt.Println(uniquePaths(1, 1)) // 1
}
```

> **Bảng `dp` cho `uniquePaths(3,3)`** (khớp walk-through 2.1):
> ```
> 1 1 1
> 1 2 3
> 1 3 6   → đáp số 6
> ```

> 🔁 **Dừng lại tự kiểm tra.** Lưới `2×3` (2 hàng, 3 cột) có bao nhiêu đường?
>
> <details><summary>Đáp án</summary>
>
> ```
> 1 1 1
> 1 2 3   → 3 đường
> ```
> Hoặc $C(2+3-2, 2-1) = C(3,1) = 3$ ✓.
> </details>

> 📝 **Tóm tắt mục 2.** `dp[i][j] = dp[i-1][j] + dp[i][j-1]`, biên = 1. $O(m \cdot n)$ time, $O(m \cdot n)$ space (giảm được còn $O(n)$ — xem mục 10). Có công thức đóng $C(m+n-2, m-1)$ nhưng DP tổng quát hoá tốt hơn (vật cản, cost...).

---

## 3. Min path sum — đường có tổng nhỏ nhất

Cho lưới `m × n` với `grid[i][j]` ≥ 0 là **chi phí** đi qua ô. Đi từ `(0,0)` tới `(m-1,n-1)` chỉ bằng bước phải/xuống. **Tìm tổng chi phí nhỏ nhất.**

> 💡 **Trực giác.** Giống unique paths, nhưng thay vì *đếm* đường ta *cộng dồn chi phí* và lấy `min`. Để tới một ô, ta đến từ ô trên hoặc ô trái — chọn cái rẻ hơn, rồi cộng chi phí ô hiện tại.

**State.** `dp[i][j]` = tổng chi phí nhỏ nhất để đi từ `(0,0)` tới `(i,j)`.

**Transition.**
```
dp[i][j] = grid[i][j] + min(dp[i-1][j], dp[i][j-1])
```

**Base case.** `dp[0][0] = grid[0][0]`; hàng đầu cộng dồn sang phải; cột đầu cộng dồn xuống.

### 3.1 Walk-through

Lưới:
```
1 3 1
1 5 1
4 2 1
```

Hàng đầu (cộng dồn sang phải): `1, 1+3=4, 4+1=5`.
Cột đầu (cộng dồn xuống): `1, 1+1=2, 2+4=6`.

```
       j=0   j=1   j=2
i=0:    1     4     5
i=1:    2     ?     ?
i=2:    6     ?     ?
```

Điền phần trong:

- `dp[1][1] = 5 + min(dp[0][1], dp[1][0]) = 5 + min(4, 2) = 5 + 2 = 7`
- `dp[1][2] = 1 + min(dp[0][2], dp[1][1]) = 1 + min(5, 7) = 1 + 5 = 6`
- `dp[2][1] = 2 + min(dp[1][1], dp[2][0]) = 2 + min(7, 6) = 2 + 6 = 8`
- `dp[2][2] = 1 + min(dp[1][2], dp[2][1]) = 1 + min(6, 8) = 1 + 6 = 7`

```
       j=0   j=1   j=2
i=0:    1     4     5
i=1:    2     7     6
i=2:    6     8     7
```

**Đáp số = `dp[2][2] = 7`.** Đường tối ưu: `1 → 3 → 1 → 1 → 1` (phải, phải, xuống, xuống) = `1+3+1+1+1 = 7` ✓.

### 3.2 Bốn ví dụ số

| Lưới | Min path sum |
|------|--------------|
| `[[5]]` | 5 |
| `[[1,2],[1,1]]` | `1+1+1 = 3` (xuống, phải) |
| `[[1,3,1],[1,5,1],[4,2,1]]` | 7 (walk-through trên) |
| `[[1,2,3],[4,5,6]]` | `1+2+3+6 = 12` |

### 3.3 Code Go — min path sum

```go
package main

import "fmt"

func minInt(a, b int) int {
	if a < b {
		return a
	}
	return b
}

// minPathSum: tổng chi phí nhỏ nhất từ (0,0) tới góc dưới-phải.
func minPathSum(grid [][]int) int {
	m, n := len(grid), len(grid[0])
	dp := make([][]int, m)
	for i := range dp {
		dp[i] = make([]int, n)
	}
	dp[0][0] = grid[0][0]
	// hàng đầu: chỉ đến từ bên trái
	for j := 1; j < n; j++ {
		dp[0][j] = dp[0][j-1] + grid[0][j]
	}
	// cột đầu: chỉ đến từ phía trên
	for i := 1; i < m; i++ {
		dp[i][0] = dp[i-1][0] + grid[i][0]
	}
	// phần trong: min(trên, trái) + chi phí ô
	for i := 1; i < m; i++ {
		for j := 1; j < n; j++ {
			dp[i][j] = grid[i][j] + minInt(dp[i-1][j], dp[i][j-1])
		}
	}
	return dp[m-1][n-1]
}

func main() {
	g := [][]int{{1, 3, 1}, {1, 5, 1}, {4, 2, 1}}
	fmt.Println(minPathSum(g)) // 7
}
```

> ⚠ **Lỗi thường gặp.** Khởi tạo `dp` toàn 0 rồi quên cộng `grid[0][0]` vào `dp[0][0]` → toàn bộ hàng/cột đầu lệch đi `grid[0][0]`. Luôn set `dp[0][0] = grid[0][0]` trước.

> 📝 **Tóm tắt mục 3.** `dp[i][j] = grid[i][j] + min(trên, trái)`. $O(m \cdot n)$. Thay `min` bằng `max` để tìm đường tổng **lớn nhất**; thay phép cộng bằng đếm để quay về unique paths.

---

## 4. Unique paths với vật cản (obstacle)

Như mục 2, nhưng vài ô là **vật cản** (`grid[i][j] == 1`), không đi qua được. Đếm số đường hợp lệ.

> 💡 **Trực giác.** Ô vật cản = "không có đường nào tới đây" → `dp = 0`. Vật cản chặn lan toả: nếu cả ô-trên và ô-trái đều bị chặn (hoặc =0), ô này cũng = 0.

**Transition.**
```
nếu grid[i][j] == 1 (vật cản):  dp[i][j] = 0
ngược lại:                       dp[i][j] = dp[i-1][j] + dp[i][j-1]
```

**Base case cẩn thận:** hàng/cột đầu **không còn luôn = 1**. Khi gặp vật cản trong hàng đầu, các ô sau nó (cùng hàng) đều = 0 vì bị chặn.

### 4.1 Walk-through

Lưới (0 = trống, 1 = vật cản):
```
0 0 0
0 1 0
0 0 0
```

```
       j=0   j=1   j=2
i=0:    1     1     1
i=1:    1     0     1      ← (1,1) là vật cản → 0; (1,2)=dp[0][2]+dp[1][1]=1+0=1
i=2:    1     1     2      ← (2,1)=dp[1][1]+dp[2][0]=0+1=1; (2,2)=dp[1][2]+dp[2][1]=1+1=2
```

**Đáp số = `dp[2][2] = 2`.** (So với 6 khi không có vật cản — vật cản chính giữa chặn mất 4 đường.)

### 4.2 Bốn ví dụ số

| Lưới | Đáp số |
|------|--------|
| `[[0]]` | 1 |
| `[[1]]` (start bị chặn) | 0 |
| `[[0,0],[0,1]]` (đích bị chặn) | 0 |
| `[[0,0,0],[0,1,0],[0,0,0]]` | 2 (walk-through) |

> ⚠ **Lỗi thường gặp.** Quên kiểm tra **ô xuất phát** `(0,0)` là vật cản → trả về `dp[0][0]=1` sai. Phải: nếu `grid[0][0]==1` thì đáp số = 0 ngay.

### 4.3 Code Go — obstacle

```go
package main

import "fmt"

func uniquePathsObstacle(grid [][]int) int {
	m, n := len(grid), len(grid[0])
	dp := make([][]int, m)
	for i := range dp {
		dp[i] = make([]int, n)
	}
	if grid[0][0] == 1 {
		return 0 // start bị chặn
	}
	dp[0][0] = 1
	for i := 0; i < m; i++ {
		for j := 0; j < n; j++ {
			if i == 0 && j == 0 {
				continue
			}
			if grid[i][j] == 1 {
				dp[i][j] = 0 // vật cản
				continue
			}
			if i > 0 {
				dp[i][j] += dp[i-1][j]
			}
			if j > 0 {
				dp[i][j] += dp[i][j-1]
			}
		}
	}
	return dp[m-1][n-1]
}

func main() {
	g := [][]int{{0, 0, 0}, {0, 1, 0}, {0, 0, 0}}
	fmt.Println(uniquePathsObstacle(g)) // 2
}
```

> 📝 **Tóm tắt mục 4.** Vật cản ⇒ `dp[i][j]=0`. Đừng hard-code biên = 1; để transition tự lan, chỉ cần `if i>0`/`if j>0` cộng có điều kiện.

---

## 5. Longest Common Subsequence (LCS) — dãy con chung dài nhất

Cho hai chuỗi `A`, `B`. **Subsequence** (dãy con) là chuỗi thu được bằng cách **xoá** bớt ký tự mà **giữ nguyên thứ tự** (không cần liên tục). Tìm độ dài subsequence chung dài nhất.

> 💡 **Trực giác.** Xét ký tự cuối của mỗi prefix:
> - Nếu `A[i-1] == B[j-1]`: ký tự này **nên** nằm trong LCS → `1 + LCS(A[..i-1], B[..j-1])`.
> - Nếu khác nhau: ít nhất một trong hai ký tự cuối **không** thuộc LCS → thử bỏ ký tự cuối của A, hoặc bỏ ký tự cuối của B, lấy `max`.

**State.** `dp[i][j]` = độ dài LCS của `A[0..i-1]` và `B[0..j-1]` (hai prefix dài `i` và `j`).

**Transition.**
```
nếu A[i-1] == B[j-1]:  dp[i][j] = dp[i-1][j-1] + 1
ngược lại:             dp[i][j] = max(dp[i-1][j], dp[i][j-1])
```

**Base case.** `dp[0][j] = 0`, `dp[i][0] = 0` (một chuỗi rỗng → LCS = 0). Bảng có kích thước `(len(A)+1) × (len(B)+1)`.

> ❓ **Câu hỏi tự nhiên: vì sao bảng to hơn chuỗi 1 đơn vị?**
> Vì ta cần một hàng/cột cho **prefix rỗng** (độ dài 0). Hàng `i` = "dùng `i` ký tự đầu", nên `i` chạy `0..len(A)`. Ký tự thứ `i` trong prefix là `A[i-1]` — đây là off-by-one bạn phải khắc cốt ghi tâm.

### 5.1 Walk-through `"ABCBDAB"` & `"BDCAB"` → 4

`A = "ABCBDAB"` (dài 7), `B = "BDCAB"` (dài 5). Bảng `8 × 6` (kể cả hàng/cột 0). Hàng 0 và cột 0 đều = 0.

Cột tiêu đề là ký tự của `B`, hàng tiêu đề là ký tự của `A`:

```
          ""  B   D   C   A   B      (B[j-1])
     ""    0   0   0   0   0   0
A:   A     0   0   0   0   1   1
     B     0   1   1   1   1   2
     C     0   1   1   2   2   2
     B     0   1   1   2   2   3
     D     0   1   2   2   2   3
     A     0   1   2   2   3   3
     B     0   1   2   2   3   4
```

Cách điền vài ô tiêu biểu:

- `dp[2][1]` (A="AB" prefix dài 2 → ký tự cuối `A[1]='B'`; B="B" → `B[0]='B'`): bằng nhau ⇒ `dp[1][0]+1 = 0+1 = 1`.
- `dp[2][5]` (A cuối 'B', B cuối 'B'): bằng nhau ⇒ `dp[1][4]+1 = 1+1 = 2`.
- `dp[4][5]` (A="ABCB" cuối 'B', B cuối 'B'): bằng nhau ⇒ `dp[3][4]+1 = 2+1 = 3`.
- `dp[7][5]` (A cuối 'B', B cuối 'B'): bằng nhau ⇒ `dp[6][4]+1 = 3+1 = 4`.

**Đáp số = `dp[7][5] = 4`.** Một LCS độ dài 4 là `"BCAB"` (hoặc `"BDAB"`).

### 5.2 Bốn ví dụ số

| A | B | LCS độ dài | Một LCS |
|---|---|:---:|---|
| `"abcde"` | `"ace"` | 3 | `"ace"` |
| `"ABCBDAB"` | `"BDCAB"` | 4 | `"BCAB"` |
| `"abc"` | `"abc"` | 3 | `"abc"` |
| `"abc"` | `"def"` | 0 | `""` |

### 5.3 Truy vết (recover) chuỗi LCS

Sau khi điền bảng, đứng ở `(m, n)` và đi ngược về `(0,0)`:

- Nếu `A[i-1] == B[j-1]`: ký tự này thuộc LCS → ghi lại, lùi cả hai `(i-1, j-1)`.
- Ngược lại: đi về phía ô lớn hơn — nếu `dp[i-1][j] >= dp[i][j-1]` thì lùi `i`, ngược lại lùi `j`.

Vì ta đi từ cuối về đầu, chuỗi thu được bị **đảo ngược** → đảo lại lần cuối.

### 5.4 Code Go — LCS + truy vết

```go
package main

import "fmt"

func maxInt(a, b int) int {
	if a > b {
		return a
	}
	return b
}

// lcs trả về độ dài LCS và một chuỗi LCS cụ thể (truy vết).
func lcs(a, b string) (int, string) {
	m, n := len(a), len(b)
	dp := make([][]int, m+1)
	for i := range dp {
		dp[i] = make([]int, n+1)
	}
	// điền bảng — base case là hàng/cột 0 đã = 0
	for i := 1; i <= m; i++ {
		for j := 1; j <= n; j++ {
			if a[i-1] == b[j-1] {
				dp[i][j] = dp[i-1][j-1] + 1
			} else {
				dp[i][j] = maxInt(dp[i-1][j], dp[i][j-1])
			}
		}
	}
	// truy vết từ (m,n) về (0,0)
	i, j := m, n
	buf := make([]byte, 0, dp[m][n])
	for i > 0 && j > 0 {
		if a[i-1] == b[j-1] {
			buf = append(buf, a[i-1]) // ký tự thuộc LCS
			i--
			j--
		} else if dp[i-1][j] >= dp[i][j-1] {
			i-- // bỏ ký tự cuối của A
		} else {
			j-- // bỏ ký tự cuối của B
		}
	}
	// buf đang ngược → đảo lại
	for l, r := 0, len(buf)-1; l < r; l, r = l+1, r-1 {
		buf[l], buf[r] = buf[r], buf[l]
	}
	return dp[m][n], string(buf)
}

func main() {
	n, s := lcs("ABCBDAB", "BDCAB")
	fmt.Println(n, s) // 4 BCAB  (chuỗi cụ thể có thể khác nhưng dài 4)
}
```

> ⚠ **Lỗi thường gặp.** Dùng `A[i]` thay vì `A[i-1]` khi so sánh → so nhầm ký tự, lệch toàn bảng. Quy ước: **chỉ số bảng `i` ↔ ký tự `A[i-1]`**.

> 🔁 **Dừng lại tự kiểm tra.** LCS của `"aab"` và `"azb"` là gì?
>
> <details><summary>Đáp án</summary>
> `"ab"`, độ dài 2. (`a` đầu khớp, `b` cuối khớp; `a` thứ hai của A không có cặp.)
> </details>

> 📝 **Tóm tắt mục 5.** `dp[i][j]` = LCS hai prefix. Khớp ký tự ⇒ `dp[i-1][j-1]+1`; khác ⇒ `max` của bỏ-A / bỏ-B. $O(m \cdot n)$ time & space. Truy vết bằng cách đi ngược, ưu tiên đường chéo khi khớp.

---

## 6. Edit distance (Levenshtein) — số thao tác biến A → B

Cho hai chuỗi `A`, `B`. Mỗi thao tác là: **chèn** (insert), **xoá** (delete), hoặc **thay** (replace) một ký tự. Tìm số thao tác **ít nhất** để biến `A` thành `B`.

> 💡 **Trực giác.** Xét ký tự cuối của hai prefix:
> - Nếu `A[i-1] == B[j-1]`: không cần làm gì với cặp này → `dp[i-1][j-1]`.
> - Nếu khác: ta phải tốn 1 thao tác, chọn rẻ nhất trong ba:
>   - **Replace**: đổi `A[i-1]` thành `B[j-1]` → `1 + dp[i-1][j-1]`.
>   - **Delete**: xoá `A[i-1]` → `1 + dp[i-1][j]`.
>   - **Insert**: chèn `B[j-1]` vào A → `1 + dp[i][j-1]`.

**State.** `dp[i][j]` = số thao tác ít nhất biến `A[0..i-1]` thành `B[0..j-1]`.

**Transition.**
```
nếu A[i-1] == B[j-1]:  dp[i][j] = dp[i-1][j-1]
ngược lại:             dp[i][j] = 1 + min(dp[i-1][j-1],  // replace
                                          dp[i-1][j],    // delete
                                          dp[i][j-1])    // insert
```

**Base case.** `dp[0][j] = j` (chuỗi rỗng → chèn `j` ký tự); `dp[i][0] = i` (xoá hết `i` ký tự).

### 6.1 Walk-through `"horse"` → `"ros"` = 3

`A = "horse"` (5), `B = "ros"` (3). Bảng `6 × 4`. Hàng 0 = `0,1,2,3`; cột 0 = `0,1,2,3,4,5`.

```
          ""  r   o   s        (B[j-1])
     ""    0   1   2   3
A:   h     1   1   2   3
     o     2   2   1   2
     r     3   2   2   2
     s     4   3   3   2
     e     5   4   4   3
```

Vài ô:

- `dp[1][1]` ('h' vs 'r', khác): `1 + min(dp[0][0], dp[0][1], dp[1][0]) = 1 + min(0,1,1) = 1`.
- `dp[2][2]` ('o' vs 'o', **bằng**): `dp[1][1] = 1`.
- `dp[3][1]` ('r' vs 'r', **bằng**): `dp[2][0] = 2`.
- `dp[4][3]` ('s' vs 's', **bằng**): `dp[3][2] = 2`.
- `dp[5][3]` ('e' vs 's', khác): `1 + min(dp[4][2], dp[4][3], dp[5][2]) = 1 + min(3,2,4) = 3`.

**Đáp số = `dp[5][3] = 3`.** Một dãy thao tác: `horse → rorse` (replace h→r) `→ rose` (delete r) `→ ros` (delete e). 3 thao tác ✓.

### 6.2 Bốn ví dụ số

| A | B | Edit distance |
|---|---|:---:|
| `"horse"` | `"ros"` | 3 |
| `"intention"` | `"execution"` | 5 |
| `"abc"` | `"abc"` | 0 |
| `""` | `"abc"` | 3 (chèn 3) |

### 6.3 Code Go — edit distance

```go
package main

import "fmt"

func min3(a, b, c int) int {
	m := a
	if b < m {
		m = b
	}
	if c < m {
		m = c
	}
	return m
}

// editDistance: số thao tác (insert/delete/replace) ít nhất biến a -> b.
func editDistance(a, b string) int {
	m, n := len(a), len(b)
	dp := make([][]int, m+1)
	for i := range dp {
		dp[i] = make([]int, n+1)
	}
	// base case
	for i := 0; i <= m; i++ {
		dp[i][0] = i // xoá hết i ký tự
	}
	for j := 0; j <= n; j++ {
		dp[0][j] = j // chèn j ký tự
	}
	for i := 1; i <= m; i++ {
		for j := 1; j <= n; j++ {
			if a[i-1] == b[j-1] {
				dp[i][j] = dp[i-1][j-1] // không tốn thao tác
			} else {
				dp[i][j] = 1 + min3(
					dp[i-1][j-1], // replace
					dp[i-1][j],   // delete
					dp[i][j-1],   // insert
				)
			}
		}
	}
	return dp[m][n]
}

func main() {
	fmt.Println(editDistance("horse", "ros"))            // 3
	fmt.Println(editDistance("intention", "execution"))  // 5
}
```

> **Ứng dụng thực tế.** Edit distance là lõi của **spell-check** (gợi ý từ gần đúng nhất), **diff** (so sánh file/git), **fuzzy search**, **so khớp DNA** (bioinformatics).

> ⚠ **Lỗi thường gặp.** Nhầm vai trò delete/insert: `dp[i-1][j]` luôn là **xoá** ký tự của A (giảm `i`), `dp[i][j-1]` là **chèn** ký tự của B (giảm `j`). Đảo ngược vẫn ra số đúng cho khoảng cách (đối xứng), nhưng truy vết thao tác sẽ sai.

> 📝 **Tóm tắt mục 6.** `dp[i][j]` = số thao tác min. Khớp ⇒ chéo; khác ⇒ `1 + min(chéo, trên, trái)`. Base case = chỉ số (chèn/xoá hết). $O(m \cdot n)$.

---

## 7. Longest common substring (chuỗi con chung **liên tục**)

Khác LCS ở một chữ: **substring phải liên tục** (không xoá giữa). Tìm độ dài đoạn liên tục dài nhất xuất hiện trong cả hai chuỗi.

> 💡 **Trực giác.** `dp[i][j]` ở đây = "độ dài đoạn chung **kết thúc đúng tại** `A[i-1]` và `B[j-1]`". Nếu hai ký tự cuối khác nhau, đoạn liên tục **đứt** → `dp[i][j] = 0`. Đáp số là `max` trên toàn bảng, không phải `dp[m][n]`.

**Transition.**
```
nếu A[i-1] == B[j-1]:  dp[i][j] = dp[i-1][j-1] + 1
ngược lại:             dp[i][j] = 0          ← khác LCS! reset về 0
đáp số = max{ dp[i][j] }
```

### 7.1 Walk-through

`A = "abcde"`, `B = "abfce"`:

```
          ""  a   b   f   c   e
     ""    0   0   0   0   0   0
     a     0   1   0   0   0   0
     b     0   0   2   0   0   0
     c     0   0   0   0   1   0
     d     0   0   0   0   0   0
     e     0   0   0   0   0   1
```

`max` toàn bảng = **2** (đoạn `"ab"`). So với LCS của cùng cặp = 3 (`"abe"` — không liên tục).

### 7.2 Bốn ví dụ số

| A | B | Longest common substring | LCS (đối chiếu) |
|---|---|:---:|:---:|
| `"abcde"` | `"abfce"` | 2 (`"ab"`) | 3 (`"abe"`) |
| `"GeeksforGeeks"` | `"GeeksQuiz"` | 5 (`"Geeks"`) | 5 |
| `"abc"` | `"xyz"` | 0 | 0 |
| `"aab"` | `"aaab"` | 3 (`"aab"`) | 3 |

### 7.3 Code Go — longest common substring

```go
package main

import "fmt"

func longestCommonSubstring(a, b string) int {
	m, n := len(a), len(b)
	dp := make([][]int, m+1)
	for i := range dp {
		dp[i] = make([]int, n+1)
	}
	best := 0
	for i := 1; i <= m; i++ {
		for j := 1; j <= n; j++ {
			if a[i-1] == b[j-1] {
				dp[i][j] = dp[i-1][j-1] + 1
				if dp[i][j] > best {
					best = dp[i][j]
				}
			}
			// nếu khác: để dp[i][j] = 0 (đã là 0 sẵn) — đoạn liên tục đứt
		}
	}
	return best
}

func main() {
	fmt.Println(longestCommonSubstring("abcde", "abfce"))           // 2
	fmt.Println(longestCommonSubstring("GeeksforGeeks", "GeeksQuiz")) // 5
}
```

> ⚠ **Lỗi thường gặp.** Trả về `dp[m][n]` như LCS → **sai**, vì với substring đáp số nằm rải khắp bảng, phải lấy `max`. Đây là khác biệt cốt lõi giữa subsequence và substring.

> 📝 **Tóm tắt mục 7.** Substring = **liên tục** ⇒ khác ⇒ reset 0, đáp số = `max` toàn bảng. Subsequence = **không cần liên tục** ⇒ khác ⇒ `max(trên, trái)`, đáp số = `dp[m][n]`.

---

## 8. Knapsack & coin change là DP 2D (recap)

> 💡 Nhắc lại từ [Lesson 25](../lesson-25-knapsack-family/): **0/1 knapsack** dùng `dp[i][w]` = "giá trị lớn nhất khi xét `i` item đầu với sức chứa `w`". Đó chính là DP 2D nhóm "trên một dãy + một tham số phụ (capacity)".

**0/1 knapsack transition:**
```
dp[i][w] = max( dp[i-1][w],                          // không lấy item i
                dp[i-1][w - wt[i-1]] + val[i-1] )    // lấy item i (nếu w đủ)
```

**Coin change (đếm số cách) 2D:**
```
dp[i][a] = dp[i-1][a]                  // không dùng đồng i
         + dp[i][a - coin[i-1]]        // dùng đồng i (unbounded → giữ hàng i)
```

> ❓ **Câu hỏi tự nhiên: vì sao 0/1 dùng `dp[i-1][...]` còn coin change unbounded dùng `dp[i][...]`?**
> Vì 0/1 mỗi item **dùng tối đa 1 lần** → sau khi lấy, không được xét lại item `i` ⇒ tham chiếu hàng trên `i-1`. Coin change unbounded **dùng đồng bao nhiêu lần cũng được** → vẫn ở hàng `i` để có thể dùng tiếp đồng đó ⇒ `dp[i][a - coin]`. Một dòng index khác nhau, hai ngữ nghĩa hoàn toàn khác.

Cả hai đều $O(\text{items} \times \text{capacity})$ thời gian, đều giảm được về `dp[w]` 1 chiều (xem [Lesson 25](../lesson-25-knapsack-family/) và mục 10 dưới đây).

> 📝 **Tóm tắt mục 8.** Knapsack/coin change là DP 2D với chiều thứ hai là capacity/amount. Phân biệt `dp[i-1]` (dùng 1 lần) vs `dp[i]` (dùng nhiều lần) trên transition.

---

## 9. Distinct subsequences — đếm số cách

Cho `S`, `T`. Đếm số **subsequence** khác nhau của `S` bằng đúng `T`.

> 💡 **Trực giác.** `dp[i][j]` = số cách chọn subsequence `T[0..j-1]` từ `S[0..i-1]`. Với ký tự cuối của `S`:
> - Luôn có lựa chọn **bỏ** `S[i-1]` → `dp[i-1][j]`.
> - Nếu `S[i-1] == T[j-1]`, thêm lựa chọn **dùng** nó để khớp ký tự cuối của `T` → cộng `dp[i-1][j-1]`.

**Transition.**
```
nếu S[i-1] == T[j-1]:  dp[i][j] = dp[i-1][j] + dp[i-1][j-1]
ngược lại:             dp[i][j] = dp[i-1][j]
```

**Base case.** `dp[i][0] = 1` (T rỗng → đúng 1 cách: chọn không gì); `dp[0][j>0] = 0`.

### 9.1 Walk-through `S="rabbbit"`, `T="rabbit"` → 3

```
          ""  r   a   b   b   i   t
     ""    1   0   0   0   0   0   0
     r     1   1   0   0   0   0   0
     a     1   1   1   0   0   0   0
     b     1   1   1   1   0   0   0
     b     1   1   1   2   1   0   0
     b     1   1   1   3   3   0   0
     i     1   1   1   3   3   3   0
     t     1   1   1   3   3   3   3
```

**Đáp số = `dp[7][6] = 3`.** (Có 3 cách chọn "rabbit" từ "rabbbit" tuỳ chọn 2 trong 3 chữ 'b'.)

### 9.2 Bốn ví dụ số

| S | T | Số cách |
|---|---|:---:|
| `"rabbbit"` | `"rabbit"` | 3 |
| `"babgbag"` | `"bag"` | 5 |
| `"abc"` | `""` | 1 |
| `"abc"` | `"abcd"` | 0 |

> 📝 **Tóm tắt mục 9.** Đếm subsequence: luôn có nhánh "bỏ ký tự `S`"; nếu khớp thì cộng thêm nhánh "dùng để match". Base `dp[*][0]=1`.

---

## 10. Tối ưu bộ nhớ 2D → 1D

> 💡 **Trực giác.** Nhìn lại các transition: `dp[i][j]` chỉ phụ thuộc **hàng `i-1`** (và các ô đã tính trên hàng `i`). Vậy không cần giữ cả `m` hàng — chỉ cần **2 hàng** (`prev`, `curr`), thậm chí **1 hàng + 1 biến** nếu khéo. Bộ nhớ tụt từ $O(m \cdot n)$ xuống $O(n)$.

### 10.1 Demo: LCS với 2 hàng

`dp[i][j]` cần `dp[i-1][j-1]`, `dp[i-1][j]`, `dp[i][j-1]` — toàn ô hàng trên + ô trái cùng hàng. Giữ `prev` (hàng `i-1`) và `curr` (hàng `i`):

```go
package main

import "fmt"

func maxI(a, b int) int {
	if a > b {
		return a
	}
	return b
}

// lcsLength với O(n) bộ nhớ — chỉ giữ 2 hàng.
func lcsLength(a, b string) int {
	m, n := len(a), len(b)
	prev := make([]int, n+1)
	curr := make([]int, n+1)
	for i := 1; i <= m; i++ {
		for j := 1; j <= n; j++ {
			if a[i-1] == b[j-1] {
				curr[j] = prev[j-1] + 1
			} else {
				curr[j] = maxI(prev[j], curr[j-1])
			}
		}
		prev, curr = curr, prev // hàng curr thành prev cho vòng sau
		// reset curr (giờ là prev cũ) — sẽ bị ghi đè dần, nhưng cột 0 phải = 0
		for j := range curr {
			curr[j] = 0
		}
	}
	return prev[n] // sau swap, prev giữ hàng cuối
}

func main() {
	fmt.Println(lcsLength("ABCBDAB", "BDCAB")) // 4
}
```

> ❓ **Câu hỏi tự nhiên: chỉ cần 1 hàng + biến có được không?**
> Được. Cập nhật `curr` **tại chỗ** trên một mảng duy nhất, nhưng phải lưu lại `dp[i-1][j-1]` (góc trên-trái) vào một biến `diag` **trước khi** ô đó bị ghi đè. Phức tạp hơn một chút; dùng khi `n` rất lớn và bộ nhớ căng.

### 10.2 Demo: edit distance với 1 hàng + biến `diag`

```go
package main

import "fmt"

func min3i(a, b, c int) int {
	m := a
	if b < m {
		m = b
	}
	if c < m {
		m = c
	}
	return m
}

// editDistance1D: O(n) bộ nhớ.
func editDistance1D(a, b string) int {
	m, n := len(a), len(b)
	dp := make([]int, n+1)
	for j := 0; j <= n; j++ {
		dp[j] = j // hàng 0
	}
	for i := 1; i <= m; i++ {
		prevDiag := dp[0] // dp[i-1][0]
		dp[0] = i         // dp[i][0]
		for j := 1; j <= n; j++ {
			tmp := dp[j] // dp[i-1][j] — sẽ thành prevDiag cho cột sau
			if a[i-1] == b[j-1] {
				dp[j] = prevDiag
			} else {
				dp[j] = 1 + min3i(prevDiag, dp[j], dp[j-1])
				//                  chéo      trên   trái
			}
			prevDiag = tmp
		}
	}
	return dp[n]
}

func main() {
	fmt.Println(editDistance1D("horse", "ros")) // 3
}
```

> ⚠ **Lỗi thường gặp (và rất nặng).** **Tối ưu xuống 1D làm hỏng truy vết.** Khi chỉ giữ vài hàng, bạn **mất** thông tin để backtrack đường đi / chuỗi kết quả. Nếu cần **truy vết** (in ra LCS, dãy thao tác edit), phải **giữ bảng đầy đủ** $O(m \cdot n)$, hoặc dùng Hirschberg (chia để trị, $O(\min(m,n))$ bộ nhớ + truy vết — nâng cao). Quy tắc: cần độ dài/đáp số ⇒ 1D OK; cần đường đi ⇒ giữ 2D.

> 📝 **Tóm tắt mục 10.** Vì `dp[i]` chỉ phụ thuộc `dp[i-1]`, giảm space $O(m \cdot n) \to O(n)$ bằng 2 hàng, hoặc 1 hàng + biến `diag`. Nhưng mất khả năng truy vết — đánh đổi rõ ràng.

---

## 11. Truy vết đường đi (backtrack)

Bảng `dp` không chỉ cho **đáp số** mà còn cho biết **đường đi/lựa chọn** dẫn tới đáp số đó. Nguyên tắc: đứng ở ô đích, hỏi *"ô này được tính từ đâu?"*, đi ngược về nguồn đó, lặp tới base case.

### 11.1 Truy vết min path sum

Từ `(m-1, n-1)` đi ngược: tại ô `(i,j)`, ô này đến từ `(i-1,j)` nếu `dp[i-1][j] <= dp[i][j-1]`, ngược lại từ `(i,j-1)`. Đảo ngược danh sách → đường từ start.

```go
// Giả sử đã điền xong bảng dp như minPathSum (mục 3.3).
// Phần truy vết: đứng ở góc dưới-phải, đi ngược về (0,0).
func tracePath(dp [][]int) [][2]int {
	m, n := len(dp), len(dp[0])
	route := [][2]int{}
	i, j := m-1, n-1
	for i > 0 || j > 0 {
		route = append(route, [2]int{i, j})
		if i == 0 {
			j-- // sát biên trên: chỉ còn đi từ trái
		} else if j == 0 {
			i-- // sát biên trái: chỉ còn đi từ trên
		} else if dp[i-1][j] <= dp[i][j-1] {
			i-- // ô trên rẻ hơn (hoặc bằng) → đến từ trên
		} else {
			j-- // đến từ trái
		}
	}
	route = append(route, [2]int{0, 0})
	// route đang ngược (đích → start) → đảo lại
	for l, r := 0, len(route)-1; l < r; l, r = l+1, r-1 {
		route[l], route[r] = route[r], route[l]
	}
	return route
}
// Với grid [[1,3,1],[1,5,1],[4,2,1]] → route [[0 0] [0 1] [0 2] [1 2] [2 2]]
```

Đường đi `[(0,0)(0,1)(0,2)(1,2)(2,2)]` = chi phí `1+3+1+1+1 = 7` ✓ (khớp walk-through 3.1).

> 🔁 **Dừng lại tự kiểm tra.** Truy vết LCS (mục 5.4) đi theo hướng nào khi `A[i-1]==B[j-1]`?
>
> <details><summary>Đáp án</summary>
> Đi **đường chéo** `(i-1, j-1)` và ghi nhận ký tự đó vào kết quả. Khi khác nhau thì đi về ô lớn hơn (`dp[i-1][j]` hoặc `dp[i][j-1]`), không ghi gì.
> </details>

> 📝 **Tóm tắt mục 11.** Backtrack: từ đích, hỏi "ô này lấy giá trị từ nguồn nào?", đi ngược về đó tới base case, rồi đảo ngược. Cần giữ bảng đầy đủ để truy vết.

---

## 12. Khi nào dùng DP 2D?

Nhận diện bằng 3 dấu hiệu:

1. **So khớp / so sánh hai chuỗi (dãy)**: LCS, edit distance, common substring, distinct subsequences, regex matching, wildcard matching. State `dp[i][j]` = "prefix dài `i` của A và `j` của B".
2. **Lưới và di chuyển 2 hướng** (xuống/phải, đôi khi 4 hướng): unique paths, min/max path sum, maximal square, dungeon game. State `dp[i][j]` = đáp số tại ô `(i,j)`.
3. **State cần đúng 2 tham số** để mô tả bài con: knapsack (`item, capacity`), interval đôi khi (`i, j`), v.v.

> ❓ **Câu hỏi tự nhiên: làm sao biết là 2 chỉ số chứ không phải 1 hay 3?**
> Hỏi: *"để mô tả đầy đủ một tình huống con, tôi cần bao nhiêu con số?"* Một chuỗi → 1 (Lesson 24). Hai chuỗi / một lưới → 2 (bài này). Một khoảng `[l, r]` cũng 2 (interval DP, [Lesson 27](../lesson-27-interval-dp/)). Bitmask trạng thái → có thể nhiều hơn (Lesson 29).

> 📝 **Tóm tắt mục 12.** Hai chuỗi so khớp, hoặc lưới 2 hướng, hoặc state 2 tham số ⇒ DP 2D. Đếm số tham số tối thiểu mô tả bài con để chọn số chiều.

---

## 13. Cạm bẫy thường gặp (tổng hợp)

| Cạm bẫy | Hậu quả | Cách tránh |
|---------|---------|------------|
| Quên/sai **base case** hàng & cột đầu | Toàn bảng lệch | Unique paths: biên = 1; min path: cộng dồn; LCS: 0; edit: chỉ số (`dp[i][0]=i`) |
| **Off-by-one** chuỗi: dùng `A[i]` thay `A[i-1]` | So nhầm ký tự, panic index | Quy ước: bảng index `i` ↔ ký tự `A[i-1]`; bảng to hơn chuỗi 1 đơn vị |
| Nhầm **LCS vs substring** | Sai đáp số | Subsequence: khác ⇒ `max`, đáp số `dp[m][n]`. Substring: khác ⇒ `0`, đáp số `max` toàn bảng |
| **Space optimize làm hỏng truy vết** | Không in được đường đi/chuỗi | Cần truy vết ⇒ giữ bảng 2D đầy đủ (hoặc Hirschberg) |
| Trả `dp[m][n]` cho bài cần `max` toàn bảng | Sai (substring, maximal square) | Theo dõi `best` trong lúc điền |
| Sai thứ tự duyệt (điền ô trước khi ô phụ thuộc xong) | Đọc giá trị rác | Lưới: trái→phải, trên→xuống. 2 chuỗi: `i` ngoài, `j` trong, tăng dần |
| Nhầm vai trò insert/delete trong edit distance | Đáp số đúng (đối xứng) nhưng truy vết sai | `dp[i-1][j]`=delete (giảm i), `dp[i][j-1]`=insert (giảm j) |

> ⚠ **Bẫy đáng giá vài giờ debug.** Với **maximal square** (mục bài tập 6), `dp[i][j]` = cạnh hình vuông toàn `1` **kết thúc tại** `(i,j)`, transition là `1 + min(trên, trái, chéo)` — và đáp số là `max(dp)²` (diện tích), **không** phải `dp[m][n]`. Quên bình phương hoặc trả ô góc là lỗi kinh điển.

> 📝 **Tóm tắt mục 13.** Ba bẫy chết người: base case, off-by-one chuỗi, và nhầm subsequence/substring. Luôn tự hỏi "đáp số ở `dp[m][n]` hay `max` toàn bảng?".

---

## Bài tập

Làm trước khi xem lời giải. Tự ước lượng Big-O cho mỗi bài.

1. **Unique paths (+obstacle).** Cài `uniquePaths(m,n)` và biến thể có vật cản `uniquePathsWithObstacles(grid)`. Test: `(3,7) → 28`; `[[0,0,0],[0,1,0],[0,0,0]] → 2`.
2. **Min path sum.** Cho lưới cost không âm, trả tổng nhỏ nhất từ góc trên-trái tới dưới-phải (chỉ phải/xuống). Test: `[[1,3,1],[1,5,1],[4,2,1]] → 7`.
3. **LCS + in ra subsequence.** Trả độ dài LCS **và** một chuỗi LCS cụ thể. Test: `("ABCBDAB","BDCAB") → (4, "BCAB")`.
4. **Edit distance.** Số thao tác min biến A→B. Test: `("horse","ros") → 3`; `("intention","execution") → 5`.
5. **Longest palindromic subsequence (LPS).** Dãy con palindrome dài nhất trong một chuỗi. *Gợi ý: LPS(s) = LCS(s, reverse(s)).* Test: `"bbbab" → 4` (`"bbbb"`); `"cbbd" → 2` (`"bb"`).
6. **Maximal square.** Cho ma trận nhị phân, tìm **diện tích** hình vuông toàn `1` lớn nhất. Test: `[[1,0,1,0,0],[1,0,1,1,1],[1,1,1,1,1],[1,0,0,1,0]] → 4` (cạnh 2).

---

## Lời giải chi tiết

### Bài 1 — Unique paths (+obstacle)

**Cách tiếp cận.** `uniquePaths`: code đầy đủ ở **mục 2.3** (`(3,7)→28`). Bản obstacle: code đầy đủ ở **mục 4.3**. Ý chính — vật cản ⇒ `dp=0`, để transition tự lan có điều kiện (`if i>0`/`if j>0`), nhớ kiểm tra ô start bị chặn.

**Walk-through obstacle** (lưới 3×3, vật cản ở giữa): xem bảng mục 4.1 → đáp số 2.

**Độ phức tạp.** Time $O(m \cdot n)$; space $O(m \cdot n)$ (giảm còn $O(n)$ bằng 1 hàng).

---

### Bài 2 — Min path sum

**Cách tiếp cận.** Xem mục 3.3. `dp[i][j] = grid[i][j] + min(trên, trái)`; biên cộng dồn. Đáp số `dp[m-1][n-1]`.

Walk-through `[[1,3,1],[1,5,1],[4,2,1]]` (mục 3.1) → **7**.

**Độ phức tạp.** Time $O(m \cdot n)$; space $O(m \cdot n)$ → $O(n)$ (mục 10).

---

### Bài 3 — LCS + in ra subsequence

**Cách tiếp cận.** Điền bảng (khớp ⇒ chéo+1; khác ⇒ max), rồi truy vết. Code đầy đủ ở mục 5.4.

Walk-through `("ABCBDAB","BDCAB")` (mục 5.1) → độ dài **4**, một LCS `"BCAB"`.

**Lưu ý.** Một chuỗi LCS không duy nhất (`"BCAB"`, `"BDAB"` đều dài 4). Hàm trả về một trong số đó, tuỳ thứ tự ưu tiên khi truy vết (`>=` chọn lùi `i` trước).

**Độ phức tạp.** Time $O(m \cdot n)$; space $O(m \cdot n)$ (bắt buộc giữ bảng để truy vết). Truy vết thêm $O(m+n)$.

---

### Bài 4 — Edit distance

**Cách tiếp cận.** Xem mục 6.3. Khớp ⇒ chéo; khác ⇒ `1 + min(chéo, trên, trái)`. Base `dp[i][0]=i`, `dp[0][j]=j`.

Walk-through `("horse","ros")` (mục 6.1) → **3**. `("intention","execution")` → **5** (thử tự điền bảng `10×10` để luyện).

**Độ phức tạp.** Time $O(m \cdot n)$; space $O(m \cdot n)$ → $O(n)$ (mục 10.2, nếu không cần truy vết thao tác).

---

### Bài 5 — Longest palindromic subsequence (LPS)

**Cách tiếp cận.** Một palindrome đọc xuôi = đọc ngược. Dãy con palindrome dài nhất của `s` = dãy con chung dài nhất giữa `s` và `reverse(s)`. Vì dãy con chung với bản đảo ngược chính là phần "đối xứng" trong `s`.

```go
func longestPalindromeSubseq(s string) int {
	// đảo s
	r := []byte(s)
	for l, rr := 0, len(r)-1; l < rr; l, rr = l+1, rr-1 {
		r[l], r[rr] = r[rr], r[l]
	}
	return lcsLength(s, string(r)) // dùng lcsLength ở mục 10.1
}
```

**Walk-through `"bbbab"`.** `reverse = "babbb"`.
LCS(`"bbbab"`, `"babbb"`): chung được `"bbbb"` (4 chữ b). → **4** ✓.

**Walk-through `"cbbd"`.** `reverse = "dbbc"`. LCS = `"bb"` → **2** ✓.

**Vì sao đúng?** Mọi dãy con palindrome `P` của `s` đọc ngược vẫn là `P`, nên `P` xuất hiện trong cả `s` và `reverse(s)` ⇒ là dãy con chung. Ngược lại, dãy con chung dài nhất giữa `s` và `reverse(s)` luôn dựng được thành palindrome. Hai chiều ⇒ bằng nhau.

> ⚠ **Lưu ý phản ví dụ.** Phương pháp LCS-với-reverse cho **độ dài** LPS luôn đúng. Nhưng nếu muốn **truy vết chuỗi palindrome cụ thể**, không thể lấy thẳng chuỗi LCS (nó có thể không đối xứng khi có nhiều LCS) — cần DP LPS trực tiếp `dp[l][r]` theo khoảng (thuộc [Lesson 27 — Interval DP](../lesson-27-interval-dp/)).

**Độ phức tạp.** Time $O(n^2)$ (LCS hai chuỗi dài $n$); space $O(n)$ nếu chỉ cần độ dài.

---

### Bài 6 — Maximal square

**Cách tiếp cận.** `dp[i][j]` = **cạnh** hình vuông toàn `1` lớn nhất **kết thúc** (góc dưới-phải) tại `(i,j)`.
- Nếu `matrix[i][j] == 0`: `dp[i][j] = 0`.
- Nếu `== 1`: `dp[i][j] = 1 + min(dp[i-1][j], dp[i][j-1], dp[i-1][j-1])`.

> 💡 **Trực giác transition.** Để mở rộng một hình vuông cạnh `k` kết thúc tại `(i,j)`, ba hình vuông kề (trên, trái, chéo trên-trái) đều phải có cạnh ≥ `k-1`. Cạnh lớn nhất bị giới hạn bởi cái **nhỏ nhất** trong ba ⇒ `1 + min(...)`.

Đáp số = `(max dp)²` (diện tích, không phải cạnh, không phải `dp[m][n]`).

```go
func maximalSquare(matrix [][]byte) int {
	m, n := len(matrix), len(matrix[0])
	dp := make([][]int, m+1)
	for i := range dp {
		dp[i] = make([]int, n+1)
	}
	best := 0
	for i := 1; i <= m; i++ {
		for j := 1; j <= n; j++ {
			if matrix[i-1][j-1] == '1' {
				// min của 3 ô kề
				mn := dp[i-1][j]
				if dp[i][j-1] < mn {
					mn = dp[i][j-1]
				}
				if dp[i-1][j-1] < mn {
					mn = dp[i-1][j-1]
				}
				dp[i][j] = mn + 1
				if dp[i][j] > best {
					best = dp[i][j]
				}
			}
		}
	}
	return best * best // diện tích
}
```

**Walk-through** (ma trận test): hình vuông `1` lớn nhất có cạnh 2 (góc dưới-phải ở `(2,3)`), `dp` đạt 2 ở đó → diện tích `2² = 4` ✓.

**Độ phức tạp.** Time $O(m \cdot n)$; space $O(m \cdot n)$ → $O(n)$ (2 hàng).

---

## Bảng tổng kết transition

| Bài | State `dp[i][j]` | Transition | Đáp số | Time | Space |
|-----|------------------|------------|--------|:----:|:-----:|
| Unique paths | số đường tới `(i,j)` | `dp[i-1][j]+dp[i][j-1]` | `dp[m-1][n-1]` | $O(mn)$ | $O(n)$ |
| Min path sum | min cost tới `(i,j)` | `grid+min(trên,trái)` | `dp[m-1][n-1]` | $O(mn)$ | $O(n)$ |
| LCS | LCS hai prefix | khớp:`chéo+1`; khác:`max` | `dp[m][n]` | $O(mn)$ | $O(n)$* |
| Edit distance | thao tác min | khớp:`chéo`; khác:`1+min3` | `dp[m][n]` | $O(mn)$ | $O(n)$* |
| Common substring | đoạn chung tại `(i,j)` | khớp:`chéo+1`; khác:`0` | `max` toàn bảng | $O(mn)$ | $O(n)$ |
| Distinct subseq | số cách | khớp:`trên+chéo`; khác:`trên` | `dp[m][n]` | $O(mn)$ | $O(n)$ |
| Maximal square | cạnh vuông tại `(i,j)` | `1+min(trên,trái,chéo)` | `(max)²` | $O(mn)$ | $O(n)$ |

\* $O(n)$ nếu chỉ cần đáp số; cần truy vết ⇒ giữ $O(mn)$.

---

## Code & Minh hoạ

- **[visualization.html](./visualization.html)** — 3 module tương tác:
  1. **Grid path**: lưới `m×n`, animate điền `dp` từng ô, highlight đường min path sum tối ưu.
  2. **LCS table**: nhập 2 chuỗi, animate điền bảng + truy vết đường chéo LCS.
  3. **Edit distance**: bảng `dp` + tô màu 3 thao tác (insert/delete/replace).
- Code Go cho tất cả thuật toán nằm **inline** trong README này (mục 2–11). Không có `solutions.go` riêng cho bài này.

---

## Bài tiếp theo

- **[Lesson 27 — Interval DP](../lesson-27-interval-dp/)**: state `dp[l][r]` theo **khoảng**, không theo prefix. Matrix chain multiplication, palindrome partition, burst balloons. Đây là biến thể "2 chỉ số" nơi `i, j` là hai đầu mút của một đoạn.
- **[Lesson 28 — DP trên cây](../lesson-28-dp-on-trees/)**: state gắn với node của cây.

Tham khảo nội bộ:
- [Lesson 24 — DP 1D](../lesson-24-dp-1d/) — nền tảng `dp[i]`.
- [Lesson 25 — Knapsack](../lesson-25-knapsack-family/) — DP 2D với chiều capacity.
- [Lesson 23 — DP Fundamentals](../lesson-23-dp-fundamentals/) — state/transition/base case.
