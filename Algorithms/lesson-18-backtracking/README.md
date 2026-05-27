# Lesson 18 — Backtracking (Quay lui)

> **Tier 2 — Kỹ thuật cốt lõi · Lesson cuối Tier 2.** Backtracking là paradigm "thử — sai — quay lui": ta xây lời giải **từng bước**, mỗi bước thử một lựa chọn, và nếu lựa chọn đó dẫn tới ngõ cụt thì **hoàn tác (undo)** rồi thử lựa chọn khác. Nó là nền của vô số bài toán "liệt kê tất cả khả năng" và "tìm một cấu hình thỏa mãn ràng buộc".

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Hiểu backtracking là **DFS trên cây trạng thái** với thao tác *chọn → đệ quy → quay lui*.
- Thuộc lòng **khung tổng quát (template)** và áp dụng cho subsets, permutations, combinations.
- Giải được các bài kinh điển: **N-Queens, Sudoku, Word Search**.
- Hiểu **pruning (cắt tỉa)** — chìa khóa biến thuật toán exponential chậm thành đủ nhanh để chạy.
- Phân biệt **backtracking vs brute-force** và **backtracking vs DP**.
- Tránh các **cạm bẫy Go** chí mạng: quên `undo`, và **quên copy slice khi lưu lời giải**.

## Kiến thức tiền đề

- [Lesson 03 — Đệ quy & quan hệ truy hồi](../lesson-03-recursion-recurrence/) — backtracking là đệ quy có cấu trúc.
- [Lesson 05 — Brute-force tới tối ưu](../lesson-05-bruteforce-to-optimize/) — backtracking chính là brute-force *có pruning*.
- [Lesson 17 — Chia để trị](../lesson-17-divide-and-conquer/) — cũng là paradigm đệ quy, nhưng chia bài toán; backtracking thì duyệt không gian lựa chọn.
- DFS trên cây/đồ thị (DataStructures) — backtracking về bản chất là DFS.
- Cú pháp Go: slice, `append`, `copy`, đệ quy.

---

## 1. Ý tưởng: thử, sai, quay lui

💡 **Trực giác / Hình dung.** Hãy tưởng tượng bạn đi trong một **mê cung** và muốn tìm đường ra. Tại mỗi ngã rẽ bạn chọn một hướng. Đi tới một lúc gặp **tường cụt** — bạn không vò đầu bứt tai, bạn chỉ **quay lại ngã rẽ gần nhất** và thử hướng khác chưa đi. Đánh dấu hướng đã thử để khỏi lặp. Đó chính xác là backtracking: tiến từng bước, gặp ngõ cụt thì lùi lại đúng một bước rồi rẽ hướng khác.

Một hình dung khác: điền **mật khẩu số 4 chữ số** mà bạn quên. Bạn thử `0000`, `0001`, `0002`... Nhưng nếu biết "chữ số đầu chắc chắn là số chẵn", bạn **bỏ luôn** mọi mã bắt đầu bằng `1, 3, 5, 7, 9` — đó là *pruning*, cắt nguyên một nhánh lớn của cây thử.

### Cây trạng thái (state-space tree)

Mọi bài backtracking đều ngầm sinh ra một **cây**:

- **Gốc**: trạng thái rỗng (chưa chọn gì).
- **Mỗi node**: một lời giải xây dựng **dở dang** (partial solution).
- **Mỗi cạnh**: một *lựa chọn* (chọn phần tử, đặt quân hậu vào ô, điền số vào ô trống...).
- **Lá**: lời giải hoàn chỉnh (hoặc ngõ cụt — không mở rộng được nữa).

Backtracking = **DFS trên cây này**. Đi xuống = make a choice. Đi lên (quay lui) = undo choice. Khi tới lá hợp lệ = ghi nhận lời giải.

```
                      []                ← gốc, chưa chọn gì
            /          |         \
         [1]          [2]        [3]    ← chọn phần tử đầu
         / \          / \
    [1,2]  [1,3]  [2,3] ...             ← chọn tiếp
      |
   [1,2,3]                              ← lá: lời giải hoàn chỉnh
```

### Ba thao tác lõi

Mỗi bước đệ quy gồm đúng ba việc:

1. **make (chọn)**: thêm lựa chọn vào trạng thái hiện tại.
2. **recurse (đệ quy)**: gọi backtrack để đi sâu thêm một mức.
3. **undo (quay lui)**: gỡ lựa chọn ra khỏi trạng thái để khôi phục về trạng thái trước khi chọn — để vòng lặp thử lựa chọn kế tiếp trên *cùng một xuất phát điểm*.

⚠ **Lỗi thường gặp.** Quên bước 3 (`undo`) → trạng thái của nhánh này **rò rỉ** sang nhánh kia. Ví dụ đang xây `[1, 2]`, sau khi xong nhánh `[1,2]` mà không bỏ `2` ra, thì khi quay lên thử `3` ta lại có `[1, 2, 3]` thay vì `[1, 3]`. Sai hoàn toàn.

🔁 **Dừng lại tự kiểm tra.**
1. Backtracking duyệt cây trạng thái theo kiểu gì — DFS hay BFS?
2. Sau khi gọi đệ quy xong cho một lựa chọn, ta phải làm gì trước khi thử lựa chọn tiếp theo?

<details><summary>Đáp án</summary>

1. **DFS** (đi sâu hết một nhánh rồi mới quay lui). Backtracking về bản chất là DFS có thao tác undo.
2. **Undo (quay lui)** — gỡ lựa chọn vừa thêm ra để khôi phục trạng thái về đúng điểm trước khi gọi đệ quy.
</details>

📝 **Tóm tắt mục 1.**
- Backtracking xây lời giải từng bước; gặp ngõ cụt thì hoàn tác và thử lựa chọn khác.
- Đó là **DFS trên cây trạng thái**, với ba thao tác: make → recurse → undo.
- Quên `undo` là lỗi #1 → trạng thái rò rỉ giữa các nhánh.

---

## 2. Khung tổng quát (template)

Mọi bài backtracking đều "đổ" vào cùng một khuôn. Học thuộc khuôn này, sau đó với mỗi bài chỉ cần định nghĩa 4 thứ: **goal** (khi nào là lời giải), **choices** (các lựa chọn ở mỗi bước), **valid** (lựa chọn có hợp lệ không), **make/undo**.

Pseudocode:

```
func backtrack(state, choices):
    if goal(state):
        record(state)        // ghi nhận lời giải (NHỚ COPY!)
        return
    for choice in choices:
        if valid(choice, state):
            make(choice, state)        // chọn
            backtrack(state, choices)  // đệ quy
            undo(choice, state)        // quay lui
```

Khung Go tổng quát (dùng cho mọi bài sinh tổ hợp):

```go
package main

import "fmt"

// res: nơi gom các lời giải hoàn chỉnh.
// path: trạng thái dở dang đang xây.
// nums: tập lựa chọn gốc.
func backtrack(res *[][]int, path []int, nums []int) {
	// 1. Điều kiện goal: tùy bài — ví dụ ở đây "mỗi node đều là một lời giải" (subsets).
	//    QUAN TRỌNG: phải COPY path trước khi lưu, vì slice trong Go chia sẻ
	//    underlying array — nếu lưu trực tiếp path, lần undo sau sẽ ghi đè lên nó.
	cp := make([]int, len(path))
	copy(cp, path)
	*res = append(*res, cp)

	// 2. Duyệt các lựa chọn.
	for i := 0; i < len(nums); i++ {
		// (Pruning / valid check đặt ở đây nếu cần.)
		path = append(path, nums[i]) // make: chọn
		backtrack(res, path, nums[i+1:]) // đệ quy với phần còn lại
		path = path[:len(path)-1]    // undo: quay lui (bỏ phần tử cuối)
	}
}

func main() {
	var res [][]int
	backtrack(&res, []int{}, []int{1, 2, 3})
	fmt.Println(res) // tất cả tập con của {1,2,3}
}
```

❓ **Câu hỏi tự nhiên của người đọc.**

- *"`path = path[:len(path)-1]` có thực sự là undo không? Nó không xóa phần tử khỏi bộ nhớ mà?"* — Đúng, nó chỉ **rút ngắn độ dài** slice (giảm `len` đi 1), nên phần tử cuối bị "loại" khỏi `path`. Phần tử cũ vẫn nằm trong underlying array nhưng sẽ bị ghi đè ở lần `append` sau. Đây là cách undo chuẩn và rẻ (O(1)) cho slice.
- *"Vì sao bắt buộc `copy`? Tôi `append(res, path)` luôn được không?"* — KHÔNG. `path` là slice trỏ vào một mảng dùng chung. Sau khi `undo` và `append` phần tử khác, mảng đó bị sửa → mọi lời giải bạn đã lưu (cùng trỏ vào mảng đó) đều bị **biến đổi theo**. Kết quả cuối toàn rác. Xem mục 13 để thấy ví dụ cụ thể.
- *"Truyền `*[][]int` (con trỏ) hay `[][]int` rồi return?"* — Cả hai đều được. Dùng con trỏ tránh phải return-và-gán mỗi lần; dùng return rõ ràng hơn. Bài này dùng con trỏ cho gọn.

📝 **Tóm tắt mục 2.** Khung backtracking gồm: kiểm tra goal → ghi nhận (copy!) → vòng lặp các lựa chọn → make → recurse → undo. Bốn thứ cần tùy biến cho từng bài: goal, choices, valid, make/undo.

---

## 3. Subsets (power set) — sinh mọi tập con

**Bài toán.** Cho `nums = [1,2,3]` (các phần tử phân biệt). Sinh **tất cả tập con** (power set). Đáp số có `2^n` tập con — với n=3 là 8 tập: `[], [1], [2], [3], [1,2], [1,3], [2,3], [1,2,3]`.

💡 **Trực giác.** Với mỗi phần tử, ta có đúng **2 lựa chọn nhị phân**: *lấy nó* hoặc *bỏ nó*. 3 phần tử → `2×2×2 = 8` tổ hợp. Đó là vì sao power set có `2^n` phần tử.

### Cách 1 — include / exclude (cây nhị phân)

Tại mỗi phần tử, rẽ làm hai nhánh: bao gồm hoặc loại trừ.

```go
// Cách include/exclude: tại index i, hoặc lấy nums[i] hoặc không.
func subsetsIE(nums []int) [][]int {
	var res [][]int
	var dfs func(i int, path []int)
	dfs = func(i int, path []int) {
		if i == len(nums) { // đã quyết định xong mọi phần tử → 1 tập con hoàn chỉnh
			cp := make([]int, len(path))
			copy(cp, path) // COPY bắt buộc
			res = append(res, cp)
			return
		}
		// Nhánh "loại trừ" nums[i]
		dfs(i+1, path)
		// Nhánh "bao gồm" nums[i]
		path = append(path, nums[i])
		dfs(i+1, path)
		path = path[:len(path)-1] // undo
	}
	dfs(0, []int{})
	return res
}
```

### Cách 2 — start index (mỗi node là một tập con)

Đây là khung ở mục 2: *mỗi node trong cây đều là một tập con hợp lệ*. Dùng `start` để chỉ lấy các phần tử phía sau, tránh sinh trùng (`[1,2]` và `[2,1]` là cùng một tập).

```go
func subsets(nums []int) [][]int {
	var res [][]int
	var dfs func(start int, path []int)
	dfs = func(start int, path []int) {
		cp := make([]int, len(path))
		copy(cp, path)
		res = append(res, cp) // mỗi node = 1 tập con
		for i := start; i < len(nums); i++ {
			path = append(path, nums[i]) // chọn
			dfs(i+1, path)               // đệ quy: chỉ lấy phần tử sau i
			path = path[:len(path)-1]    // quay lui
		}
	}
	dfs(0, []int{})
	return res
}
```

### Walk-through cây cho `[1,2,3]` (cách 2)

`*` đánh dấu node được ghi nhận (mọi node đều ghi):

```
dfs(start=0, path=[])  → ghi []*
  i=0: path=[1] → dfs(1,[1]) → ghi [1]*
        i=1: path=[1,2] → dfs(2,[1,2]) → ghi [1,2]*
              i=2: path=[1,2,3] → dfs(3,...) → ghi [1,2,3]*  ; undo → [1,2]
              undo → [1]
        i=2: path=[1,3] → dfs(3,[1,3]) → ghi [1,3]*  ; undo → [1]
        undo → []
  i=1: path=[2] → dfs(2,[2]) → ghi [2]*
        i=2: path=[2,3] → dfs(3,[2,3]) → ghi [2,3]*  ; undo → [2]
        undo → []
  i=2: path=[3] → dfs(3,[3]) → ghi [3]*  ; undo → []
```

Thứ tự ghi: `[], [1], [1,2], [1,2,3], [1,3], [2], [2,3], [3]` — đủ 8 tập, không trùng.

⚠ **Lỗi thường gặp.** Dùng vòng lặp `for i := 0` thay vì `for i := start` → sinh trùng (`[1,2]` lẫn `[2,1]`) và lặp vô hạn nếu không kiểm soát. `start` là cách *pruning* để cây chỉ đi "tiến tới" theo index.

🔁 **Dừng lại tự kiểm tra.** Vì sao subsets cách 2 ghi nhận lời giải ở **mọi node** chứ không chỉ ở lá như permutations?

<details><summary>Đáp án</summary>
Vì mỗi prefix `path` đang xây *đã là* một tập con hợp lệ rồi (tập con không cần dùng hết phần tử). `[1]` là tập con, `[1,2]` cũng là tập con. Ngược lại một hoán vị phải dùng *hết* các phần tử nên chỉ lá mới hợp lệ.
</details>

📝 **Tóm tắt mục 3.** Subsets có `2^n` phần tử. Hai cách: include/exclude (cây nhị phân, ghi ở lá) và start-index (mỗi node là một tập con, ghi mọi node). `start` chống trùng.

---

## 4. Permutations — sinh mọi hoán vị

**Bài toán.** Cho `[1,2,3]` phân biệt, sinh **tất cả hoán vị** — có `n! = 3! = 6` hoán vị: `[1,2,3], [1,3,2], [2,1,3], [2,3,1], [3,1,2], [3,2,1]`.

💡 **Trực giác.** Chọn phần tử đầu: 3 cách. Chọn phần tử thứ hai từ 2 còn lại: 2 cách. Phần tử cuối: 1 cách. `3×2×1 = 6 = 3!`.

Khác subsets ở chỗ: **dùng hết** mọi phần tử, và **thứ tự quan trọng**. Ta đánh dấu phần tử nào đã dùng (`used`).

```go
func permute(nums []int) [][]int {
	var res [][]int
	used := make([]bool, len(nums))
	var dfs func(path []int)
	dfs = func(path []int) {
		if len(path) == len(nums) { // đã dùng hết → 1 hoán vị hoàn chỉnh
			cp := make([]int, len(path))
			copy(cp, path) // COPY bắt buộc
			res = append(res, cp)
			return
		}
		for i := 0; i < len(nums); i++ {
			if used[i] {
				continue // pruning: bỏ phần tử đã dùng
			}
			used[i] = true               // make
			path = append(path, nums[i]) //
			dfs(path)                    // đệ quy
			path = path[:len(path)-1]    // undo (slice)
			used[i] = false              // undo (used) — ĐỪNG QUÊN!
		}
	}
	dfs([]int{})
	return res
}
```

### Walk-through cây cho `[1,2,3]`

```
dfs([])
├─ 1: dfs([1])               used=[T,F,F]
│     ├─ 2: dfs([1,2])       used=[T,T,F]
│     │     └─ 3: dfs([1,2,3]) → ghi [1,2,3]   (lá)
│     └─ 3: dfs([1,3])       used=[T,F,T]
│           └─ 2: dfs([1,3,2]) → ghi [1,3,2]   (lá)
├─ 2: dfs([2])               used=[F,T,F]
│     ├─ 1: dfs([2,1]) └─ 3: [2,1,3]
│     └─ 3: dfs([2,3]) └─ 1: [2,3,1]
└─ 3: dfs([3])               used=[F,F,T]
      ├─ 1: dfs([3,1]) └─ 2: [3,1,2]
      └─ 2: dfs([3,2]) └─ 1: [3,2,1]
```

6 lá = 6 hoán vị. Chú ý mỗi nhánh đi xuống làm `used[i]=true`, khi quay lui phải `used[i]=false` — nếu quên, các nhánh anh em sẽ tưởng phần tử đó vẫn đang bị dùng → mất hoán vị.

⚠ **Lỗi thường gặp.** Quên `used[i] = false` ở bước undo. Hậu quả: sau khi đi xong nhánh `1`, `used[0]` vẫn `true` → nhánh `2`, `3` không bao giờ chọn được `1` → kết quả thiếu trầm trọng.

❓ **Câu hỏi tự nhiên.** *"Hoán vị có trùng thì sao?"* Nếu `nums` có phần tử lặp (`[1,1,2]`), thuật toán trên sinh hoán vị trùng. Cách xử lý: **sort trước**, rồi pruning "bỏ qua nums[i] nếu nums[i]==nums[i-1] và used[i-1]==false" (xem bài tập 2).

📝 **Tóm tắt mục 4.** Permutations có `n!` phần tử, dùng `used[]` đánh dấu, ghi nhận ở **lá** (khi `len(path)==n`). Phải undo cả `path` lẫn `used`.

---

## 5. Combinations — chọn k từ n

**Bài toán.** Chọn `k` phần tử từ `[1..n]` (không quan tâm thứ tự). Ví dụ `n=4, k=2` cho `C(4,2)=6` tổ hợp: `[1,2],[1,3],[1,4],[2,3],[2,4],[3,4]`.

💡 **Trực giác.** Giống subsets nhưng chỉ giữ các tập con **đúng kích thước k**. Dùng `start` để không trùng (giống mục 3).

```go
func combine(n, k int) [][]int {
	var res [][]int
	var dfs func(start int, path []int)
	dfs = func(start int, path []int) {
		if len(path) == k { // đủ k phần tử → ghi nhận
			cp := make([]int, k)
			copy(cp, path)
			res = append(res, cp)
			return
		}
		// PRUNING quan trọng: nếu số phần tử còn lại không đủ để lấp đầy
		// path tới k thì bỏ luôn. need = k - len(path) phần tử nữa.
		// còn (n - i + 1) phần tử từ i tới n. Cần (n - i + 1) >= need.
		need := k - len(path)
		for i := start; i <= n-need+1; i++ { // chặn trên i theo pruning
			path = append(path, i)    // chọn
			dfs(i+1, path)            // start = i+1 → không lấy lại i
			path = path[:len(path)-1] // quay lui
		}
	}
	dfs(1, []int{})
	return res
}
```

### Walk-through pruning cho `n=4, k=2`

Không pruning: `for i := start; i <= n`. Với pruning: chặn trên `i <= n - need + 1`.

- Tại gốc `path=[]`, `need=2`, chặn `i <= 4-2+1 = 3`. Tức **bỏ luôn `i=4`** vì nếu chọn 4 làm phần tử đầu thì còn 0 phần tử sau nó → không thể đủ 2. Tiết kiệm một nhánh chết.
- Tại `path=[1]`, `need=1`, chặn `i <= 4-1+1 = 4` → thử 2,3,4 (đúng).

Không pruning, gốc thử cả `i=4` → vào `dfs(5,[4])` → `need=1` nhưng `start=5 > 4` → vòng lặp rỗng → trả về không ghi gì = lãng phí một lần gọi đệ quy. Pruning loại bỏ những lần gọi vô ích này. Với n,k lớn, tiết kiệm rất nhiều.

🔁 **Dừng lại tự kiểm tra.** Với `n=5, k=3`, tại gốc `path=[]` pruning cho phép `i` chạy tới mức nào?

<details><summary>Đáp án</summary>
`need = 3 - 0 = 3`, chặn trên `i <= 5 - 3 + 1 = 3`. Tức chỉ thử `i = 1,2,3` làm phần tử đầu. Bỏ `i=4,5` vì chọn 4 hoặc 5 đầu thì không còn đủ 2 phần tử lớn hơn để lấp đầy.
</details>

📝 **Tóm tắt mục 5.** Combinations = subsets lọc theo kích thước `k`. `start` chống trùng. Pruning chặn trên vòng lặp `i <= n - (k - len(path)) + 1` để bỏ các nhánh không thể đủ k phần tử.

---

## 6. N-Queens — đặt N quân hậu không tấn công nhau

**Bài toán.** Đặt `N` quân hậu trên bàn cờ `N×N` sao cho không hai quân nào tấn công nhau (không cùng hàng, cùng cột, hay cùng đường chéo). Đếm/liệt kê tất cả cách. Với N=4 có 2 nghiệm; N=8 có 92 nghiệm.

💡 **Trực giác.** Đặt **mỗi hàng đúng một hậu** (vì N hậu trên N hàng, không thể hai hậu cùng hàng). Như vậy chỉ cần quyết định: hàng 0 đặt cột nào, hàng 1 đặt cột nào... Đệ quy theo hàng. Tại mỗi hàng thử mọi cột; chỉ giữ cột không bị tấn công.

**Pruning** là điểm sống còn: kiểm tra cột và hai đường chéo bằng 3 mảng boolean O(1) thay vì quét cả bàn cờ.

- Cùng **cột** `c`: `cols[c]`.
- Cùng đường chéo `↘` (chính): mọi ô trên đó có `row - col` = hằng. Dịch về dương: `diag1[row - col + N - 1]`.
- Cùng đường chéo `↙` (phụ): `row + col` = hằng. `diag2[row + col]`.

```go
func solveNQueens(n int) [][]string {
	var res [][]string
	cols := make([]bool, n)
	diag1 := make([]bool, 2*n-1) // row - col + (n-1)
	diag2 := make([]bool, 2*n-1) // row + col
	pos := make([]int, n)        // pos[r] = cột đặt hậu ở hàng r

	var dfs func(row int)
	dfs = func(row int) {
		if row == n { // đã đặt đủ n hậu → 1 nghiệm
			board := make([]string, n)
			for r := 0; r < n; r++ {
				line := make([]byte, n)
				for c := 0; c < n; c++ {
					line[c] = '.'
				}
				line[pos[r]] = 'Q'
				board[r] = string(line)
			}
			res = append(res, board) // board mới mỗi lần → an toàn
			return
		}
		for col := 0; col < n; col++ {
			d1 := row - col + n - 1
			d2 := row + col
			if cols[col] || diag1[d1] || diag2[d2] {
				continue // PRUNING: ô bị tấn công, bỏ
			}
			// make
			cols[col], diag1[d1], diag2[d2] = true, true, true
			pos[row] = col
			dfs(row + 1) // đệ quy sang hàng kế
			// undo
			cols[col], diag1[d1], diag2[d2] = false, false, false
		}
	}
	dfs(0)
	return res
}
```

### Walk-through 4-Queens

Bàn 4×4. Đệ quy theo hàng 0→3.

```
Hàng 0: thử col 0 → đặt Q ở (0,0). cols[0],diag1[3],diag2[0] = true
  Hàng 1: col 0 ✗(cùng cột) · col 1 ✗(diag2: 1+1=2? thực ra (1,1) diag1=1-1+3=3 trùng (0,0)) 
          col 2 ✓ → đặt (1,2)
    Hàng 2: col 0 ✗(cột) · col 1 ✗(diag) · col 2 ✗(cột) · col 3 ✗(diag2:2+3=5? (2,3)...) 
            → KHÔNG cột nào hợp lệ → NGÕ CỤT → quay lui hàng 1
    Hàng 1 thử col 3 → đặt (1,3)
      Hàng 2: col 1 ✓ → đặt (2,1)
        Hàng 3: col 0..3 đều bị tấn công → NGÕ CỤT → quay lui
      ... cuối cùng nhánh bắt đầu (0,0) KHÔNG có nghiệm → quay lui hàng 0
Hàng 0: thử col 1 → đặt (0,1)
  → ... → tìm được nghiệm:  .Q..  / ...Q / Q... / ..Q.   (pos = [1,3,0,2])
Hàng 0: thử col 2 → đối xứng → nghiệm thứ hai: ..Q. / Q... / ...Q / .Q..  (pos = [2,0,3,1])
Hàng 0: col 3 → không nghiệm.
```

Hai nghiệm cho N=4 — chính là hai cấu hình `[1,3,0,2]` và `[2,0,3,1]`. Pruning bằng 3 mảng boolean khiến mỗi lần kiểm tra ô chỉ tốn O(1).

❓ **Câu hỏi tự nhiên.** *"Vì sao `row - col + n - 1` chứ không phải `row - col`?"* Vì `row - col` chạy từ `-(n-1)` tới `+(n-1)`, có thể âm — không index mảng được. Cộng `n-1` để dịch về `[0, 2n-2]`, đúng kích thước `2n-1`.

📝 **Tóm tắt mục 6.** N-Queens: đệ quy theo hàng, mỗi hàng một hậu. Pruning O(1) bằng `cols`, `diag1` (`row-col+n-1`), `diag2` (`row+col`). Undo cả ba mảng khi quay lui.

---

## 7. Sudoku solver

**Bài toán.** Điền các ô trống (`.`) của bảng 9×9 sao cho mỗi hàng, mỗi cột, mỗi khối 3×3 chứa đủ 1–9 không lặp.

💡 **Trực giác.** Tìm ô trống đầu tiên, thử lần lượt số `1..9`. Với mỗi số kiểm tra hợp lệ (không trùng hàng/cột/khối). Nếu hợp lệ thì điền vào và đệ quy giải phần còn lại. Nếu đệ quy thất bại (không điền được ô sau) thì **xóa số vừa điền** (undo) và thử số khác. Nếu hết 1..9 mà không số nào được → trả `false` để ô trước đó quay lui.

```go
func solveSudoku(board *[9][9]byte) bool {
	for r := 0; r < 9; r++ {
		for c := 0; c < 9; c++ {
			if board[r][c] != '.' {
				continue // ô đã có số, bỏ qua
			}
			for d := byte('1'); d <= '9'; d++ {
				if valid(board, r, c, d) { // PRUNING bằng kiểm tra ràng buộc
					board[r][c] = d        // make
					if solveSudoku(board) {
						return true // tìm được nghiệm, lan true ngược lên
					}
					board[r][c] = '.' // undo: số d không dẫn tới nghiệm
				}
			}
			return false // không số nào hợp → buộc ô trước quay lui
		}
	}
	return true // không còn ô trống → giải xong
}

func valid(b *[9][9]byte, r, c int, d byte) bool {
	for i := 0; i < 9; i++ {
		if b[r][i] == d || b[i][c] == d { // trùng hàng / cột
			return false
		}
		// ô trong khối 3×3 chứa (r,c)
		br, bc := 3*(r/3)+i/3, 3*(c/3)+i%3
		if b[br][bc] == d {
			return false
		}
	}
	return true
}
```

Khác N-Queens: Sudoku tìm **một** nghiệm (return `bool`), nên khi tìm thấy ta lan `true` lên để dừng sớm. N-Queens liệt kê **tất cả** nên không return sớm. Pruning ở đây là `valid()` — bỏ ngay những số vi phạm ràng buộc, không đi sâu vào nhánh chắc chắn sai.

📝 **Tóm tắt mục 7.** Sudoku: tìm ô trống, thử 1–9, kiểm tra ràng buộc (pruning), điền & đệ quy, undo nếu thất bại. Trả `bool` để tìm một nghiệm và dừng sớm.

---

## 8. Word Search / Maze — DFS trên lưới + backtrack

**Bài toán (Word Search).** Cho lưới ký tự và một từ `word`. Hỏi từ có xuất hiện không, theo đường đi 4 hướng (lên/xuống/trái/phải), mỗi ô dùng tối đa một lần?

💡 **Trực giác.** Từ mỗi ô khớp ký tự đầu, DFS theo 4 hướng tìm ký tự tiếp. **Đánh dấu ô đang dùng** để không quay lại; khi nhánh thất bại thì **bỏ đánh dấu** (backtrack) để ô đó dùng được cho đường đi khác.

```go
func exist(board [][]byte, word string) bool {
	rows, cols := len(board), len(board[0])
	var dfs func(r, c, i int) bool
	dfs = func(r, c, i int) bool {
		if i == len(word) {
			return true // khớp hết → tìm thấy
		}
		// PRUNING: ra ngoài lưới hoặc ký tự không khớp → cắt nhánh
		if r < 0 || r >= rows || c < 0 || c >= cols || board[r][c] != word[i] {
			return false
		}
		tmp := board[r][c]
		board[r][c] = '#' // make: đánh dấu đã dùng (tránh quay lại)
		found := dfs(r+1, c, i+1) || dfs(r-1, c, i+1) ||
			dfs(r, c+1, i+1) || dfs(r, c-1, i+1)
		board[r][c] = tmp // undo: bỏ đánh dấu khi quay lui
		return found
	}
	for r := 0; r < rows; r++ {
		for c := 0; c < cols; c++ {
			if dfs(r, c, 0) {
				return true
			}
		}
	}
	return false
}
```

⚠ **Lỗi thường gặp.** Quên khôi phục `board[r][c] = tmp`. Hậu quả: ô bị "đánh dấu vĩnh viễn" → các đường đi khác không dùng được ô đó → bỏ sót nghiệm. Đây lại là lỗi **quên undo** quen thuộc, ở dạng lưới.

Bài **maze** (tìm đường ra) cùng khuôn: DFS 4 hướng, đánh dấu ô đã thăm, gặp tường/biên thì cắt, tới đích thì `true`, quay lui thì bỏ đánh dấu (nếu cho phép dùng lại ô ở đường khác).

📝 **Tóm tắt mục 8.** Word search/maze = DFS trên lưới + backtrack. Đánh dấu ô đang dùng (`'#'`), undo khi quay lui. Pruning bằng kiểm tra biên + ký tự khớp.

---

## 9. Pruning (cắt tỉa) — chìa khóa hiệu quả

💡 **Trực giác.** Không gian tìm kiếm của backtracking thường khổng lồ (exponential). Pruning là nghệ thuật **nhận ra một nhánh chắc chắn không dẫn tới lời giải và bỏ luôn** thay vì duyệt hết nó. Một nhát cắt ở gần gốc có thể loại bỏ cả triệu node con.

Các dạng pruning:

1. **Ràng buộc (constraint check)** — như N-Queens (`cols/diag`), Sudoku (`valid`). Bỏ ngay lựa chọn vi phạm.
2. **Chặn cận (bound)** — như combinations (`i <= n-need+1`). Nếu phần còn lại *không thể* hoàn thành lời giải thì cắt.
3. **Cắt theo mục tiêu** — bài "combination sum": nếu tổng hiện tại đã vượt `target` thì cắt (không cần đi sâu vì các số dương chỉ làm tổng tăng).
4. **Constraint propagation** — như Sudoku nâng cao: điền ô có ít lựa chọn nhất trước (most-constrained variable), suy luận lan truyền ràng buộc.
5. **Sắp thứ tự lựa chọn** — thử lựa chọn "hứa hẹn" trước để tìm nghiệm/cắt nhánh sớm.

### Ví dụ số: combination sum, cắt theo tổng

Cho `candidates=[2,3,5]`, `target=8`, mỗi số dùng nhiều lần. Pruning: nếu `remain - candidates[i] < 0` thì các ứng viên sau (đã sort tăng) còn lớn hơn → cắt luôn cả vòng for còn lại bằng `break`.

```go
func combinationSum(cands []int, target int) [][]int {
	sort.Ints(cands) // để break sớm khi vượt target
	var res [][]int
	var dfs func(start, remain int, path []int)
	dfs = func(start, remain int, path []int) {
		if remain == 0 {
			cp := make([]int, len(path))
			copy(cp, path)
			res = append(res, cp)
			return
		}
		for i := start; i < len(cands); i++ {
			if cands[i] > remain {
				break // PRUNING: đã sort, số này và sau đều > remain → bỏ hết
			}
			path = append(path, cands[i])
			dfs(i, remain-cands[i], path) // i (không i+1) → cho dùng lại
			path = path[:len(path)-1]
		}
	}
	dfs(0, target, []int{})
	return res
}
```

So sánh số node duyệt **với** và **không** pruning (đo bằng đếm số lần gọi `dfs`) thường chênh nhau hàng chục đến hàng nghìn lần khi target lớn — đó là khác biệt giữa "chạy trong 1ms" và "treo máy".

🔁 **Dừng lại tự kiểm tra.** Vì sao `break` (không phải `continue`) là đúng trong combination sum sau khi đã `sort`?

<details><summary>Đáp án</summary>
Vì mảng đã sort tăng dần. Nếu `cands[i] > remain` thì mọi `cands[j]` với `j > i` cũng `> remain` (do đã sort). Không chỉ `i` này vô vọng mà *cả phần đuôi* cũng vô vọng → `break` cắt luôn, `continue` chỉ bỏ một phần tử (lãng phí kiểm tra phần còn lại).
</details>

📝 **Tóm tắt mục 9.** Pruning = bỏ sớm nhánh không thể dẫn tới lời giải. Các dạng: constraint check, bound, cắt theo mục tiêu, propagation, ordering. Đây là yếu tố quyết định backtracking chạy được hay không.

---

## 10. Độ phức tạp

Backtracking về bản chất duyệt cây trạng thái, nên độ phức tạp xấp xỉ **số node của cây × chi phí mỗi node**. Worst-case thường **exponential**:

| Bài toán | Số lời giải | Độ phức tạp (worst) |
|----------|-------------|---------------------|
| Subsets | `2^n` | `O(2^n · n)` (n để copy mỗi tập) |
| Permutations | `n!` | `O(n! · n)` |
| Combinations C(n,k) | `C(n,k)` | `O(C(n,k) · k)` |
| N-Queens | (đến ~92 với n=8) | `O(n!)` cận trên thô (pruning giảm mạnh) |
| Combination sum | tùy | `O(N^(T/m))` với T=target, m=số nhỏ nhất |
| Word search | — | `O(R·C·4^L)` với L=độ dài từ |

💡 **Trực giác công thức.** Cây phân nhánh hệ số `b` (branching factor) và sâu `d` → có khoảng `b^d` node → `O(b^d)`. Subsets: mỗi mức nhân 2 (lấy/bỏ) → `2^n`. Permutations: mức đầu `n` nhánh, mức sau `n-1`... → `n!`.

⚠ **Lỗi thường gặp.** Tưởng pruning hạ được độ phức tạp **worst-case**. Không. Pruning cải thiện **trường hợp thực tế** (đôi khi rất lớn), nhưng worst-case vẫn exponential — vì có những input mà không nhánh nào cắt được. Đừng hứa "O(n²)" cho một bài backtracking.

❓ **Câu hỏi tự nhiên.** *"Vậy backtracking có vô dụng vì chậm?"* Không. Với input vừa phải (N-Queens N≤~15, Sudoku 9×9, subsets n≤~20) backtracking + pruning chạy tức thì. Nó là công cụ chuẩn cho bài "liệt kê" và "tìm cấu hình thỏa ràng buộc" khi không có thuật toán đa thức.

📝 **Tóm tắt mục 10.** Backtracking thường `O(b^d)` — `2^n`, `n!`, `b^d`. Pruning giảm thực tế nhưng worst-case vẫn exponential. Phù hợp khi input nhỏ-vừa.

---

## 11. Backtracking vs Brute-force

💡 **Trực giác.** Brute-force = sinh **mọi** cấu hình rồi kiểm tra từng cái. Backtracking = brute-force **có pruning** — vừa xây vừa kiểm tra, gặp vi phạm là bỏ luôn cả nhánh, không sinh tiếp.

Ví dụ N-Queens N=8:
- **Brute-force ngây thơ**: đặt 8 hậu vào 64 ô bất kỳ rồi kiểm tra = `C(64,8) ≈ 4.4 tỷ` cấu hình.
- **Brute-force "mỗi hàng một hậu"**: `8^8 ≈ 16.7 triệu`.
- **Backtracking + pruning cột/chéo**: chỉ duyệt **~15 nghìn** node. Nhanh hơn brute-force ngây thơ ~300 nghìn lần.

Khác biệt nằm ở: backtracking **kiểm tra ràng buộc sớm** (ngay khi đặt hậu thứ k, không đợi đặt đủ 8 rồi mới check). Một vi phạm ở hàng 2 cắt toàn bộ cây con bên dưới.

📝 **Tóm tắt mục 11.** Backtracking = brute-force + kiểm tra ràng buộc *trong khi xây* (pruning) + bỏ nhánh chết sớm. Cùng không gian, nhưng backtracking không lãng phí duyệt các nhánh vô vọng.

---

## 12. Backtracking vs Dynamic Programming (DP)

| Tiêu chí | Backtracking | DP |
|----------|--------------|-----|
| Mục tiêu | **Liệt kê / tìm tất cả** cấu hình | **Đếm / tối ưu** giá trị |
| Cơ chế | Duyệt cây, thử-quay lui | Lưu kết quả bài con (memo/bảng) |
| Bài con | Thường không lặp lại | **Trùng lặp** (overlapping subproblems) |
| Output | Danh sách lời giải | Một số (count/min/max) |

💡 **Trực giác phân biệt.** Hỏi *"tôi cần **liệt kê** mọi cách, hay chỉ cần **đếm/giá trị tốt nhất**?"*
- "In ra mọi tập con tổng bằng S" → backtracking (phải sinh từng cái).
- "Có **bao nhiêu** tập con tổng bằng S" → DP (chỉ cần con số, có overlap → memo nhanh hơn).

**Chuyển backtracking → DP/memo.** Nếu bài backtracking có **bài con lặp lại** và bạn chỉ cần đếm/tối ưu (không cần liệt kê), hãy memo hóa. Ví dụ "leo cầu thang đếm số cách": backtracking thuần `O(2^n)`, nhưng `f(n)=f(n-1)+f(n-2)` overlap → memo → `O(n)`.

⚠ **Lỗi thường gặp.** Dùng backtracking để **đếm** một bài có overlap nặng (như đếm đường đi trong lưới lớn) → exponential vô ích, trong khi DP cho `O(R·C)`. Khi cần *số lượng* và thấy bài con lặp → nghĩ DP.

📝 **Tóm tắt mục 12.** Backtracking để **liệt kê/tìm tất cả**; DP để **đếm/tối ưu** khi bài con trùng lặp. Bài backtracking có overlap + chỉ cần count/optimal → chuyển sang memo/DP.

---

## 13. Cạm bẫy (đặc biệt với Go)

### 13.1 Quên `undo` → trạng thái rò rỉ

Đã nói ở mục 1. Mỗi `make` phải có một `undo` đối xứng *sau* lời gọi đệ quy. Với N-Queens là 3 mảng, permutations là cả `path` lẫn `used`.

### 13.2 Quên copy slice khi lưu lời giải — GO GOTCHA #1

Đây là lỗi **Go-specific** giết người. Slice trong Go là `(pointer, len, cap)` — nhiều slice có thể trỏ vào **cùng một underlying array**. Khi lưu `path` trực tiếp:

```go
// SAI — lưu trực tiếp, không copy:
res = append(res, path) // path trỏ vào mảng dùng chung

// Sau khi undo + append phần tử khác, mảng đó bị sửa →
// MỌI phần tử đã lưu trong res (cùng trỏ mảng đó) đều biến đổi theo.
```

**Ví dụ số cụ thể.** Chạy subsets `[1,2]` mà *không* copy:
1. `path=[1]` → `res = [ [1] ]` (slice trỏ mảng A = `[1]`).
2. `path=[1,2]` → append `2`, mảng A thành `[1,2]`. `res = [ [1,2] ]` (phần tử cũ cũng đổi vì cùng trỏ A!).
3. undo → `path=[1]` (len giảm còn 1, mảng A vẫn `[1,2]`).
4. ... cuối cùng `res` chứa các slice **đều trỏ vào A**, in ra toàn rác kiểu `[[2],[2,...]]` thay vì `[[1],[1,2],...]`.

**Đúng** — copy ra mảng mới trước khi lưu:

```go
cp := make([]int, len(path))
copy(cp, path)
res = append(res, cp) // cp là mảng độc lập → an toàn
```

⚠ Quy tắc vàng: **mỗi khi `append` một slice đang-bị-mutate vào kết quả, COPY nó trước.** Đây là dòng code hay bị quên nhất khi viết backtracking bằng Go.

### 13.3 Pruning sai → bỏ mất lời giải

Pruning quá tay (cắt nhầm nhánh *có* chứa lời giải) → kết quả thiếu. Ví dụ trong combination sum, nếu chưa sort mà đã `break` khi `cands[i] > remain` thì sai — có thể số sau nhỏ hơn vẫn dùng được. Pruning chỉ đúng khi điều kiện cắt **đảm bảo** nhánh đó vô vọng.

### 13.4 Thứ tự choice ảnh hưởng tốc độ

Cùng một cây, thử lựa chọn "ít gây vi phạm" hoặc "dễ dẫn tới nghiệm" trước → cắt nhánh sớm hơn → nhanh hơn nhiều (dù kết quả như nhau). Ví dụ Sudoku: điền ô có ít ứng viên nhất trước (MRV heuristic) nhanh hơn điền tuần tự.

### 13.5 (Go) `append` có thể chia sẻ hoặc cấp phát lại

Khi `cap` đủ, `append` ghi tại chỗ (chia sẻ array → mới có vấn đề 13.2). Khi `cap` không đủ, `append` cấp phát mảng mới (lúc đó vô tình "an toàn"). Đừng dựa vào hành vi này — **luôn copy tường minh**, đừng để đúng/sai phụ thuộc vào cap.

📝 **Tóm tắt mục 13.** Năm bẫy: quên undo; **quên copy slice (Go #1)**; pruning sai bỏ nghiệm; thứ tự choice ảnh hưởng tốc độ; đừng dựa vào hành vi cap của `append`.

---

## Bài tập

> Mỗi bài đều có **Lời giải chi tiết** ở mục kế tiếp. Tự làm trước khi xem.

1. **Subsets** — Cho mảng `nums` các số phân biệt, trả về tất cả tập con. Nêu Big-O.
2. **Permutations II (có trùng)** — Cho mảng có thể có phần tử lặp (`[1,1,2]`), trả về các hoán vị **duy nhất**. Mô tả pruning.
3. **Combination Sum** — Cho `candidates` (phân biệt, dương) và `target`, mỗi số dùng **nhiều lần**, trả mọi tổ hợp có tổng `= target`. Pruning theo tổng.
4. **N-Queens — đếm nghiệm** — Trả về **số lượng** cách đặt N hậu (không cần liệt kê bàn cờ). Big-O và pruning.
5. **Generate Parentheses** — Sinh mọi chuỗi `n` cặp ngoặc hợp lệ. Vd `n=3` → `((())), (()()), (())(), ()(()), ()()()`. Pruning theo số ngoặc mở/đóng.
6. **Palindrome Partitioning** — Cắt chuỗi `s` thành các đoạn mà **mỗi đoạn là palindrome**, trả mọi cách cắt. Vd `"aab"` → `[["a","a","b"],["aa","b"]]`.

---

## Lời giải chi tiết

### Bài 1 — Subsets

**Cách tiếp cận.** Đúng khung mục 3 cách 2: mỗi node là một tập con, dùng `start` chống trùng, ghi nhận mọi node.

```go
func subsets(nums []int) [][]int {
	var res [][]int
	var dfs func(start int, path []int)
	dfs = func(start int, path []int) {
		cp := make([]int, len(path))
		copy(cp, path) // COPY!
		res = append(res, cp)
		for i := start; i < len(nums); i++ {
			path = append(path, nums[i])
			dfs(i+1, path)
			path = path[:len(path)-1]
		}
	}
	dfs(0, []int{})
	return res
}
```

**Độ phức tạp.** `2^n` tập con, mỗi tập copy tốn tới `O(n)` → `O(2^n · n)` thời gian, `O(n)` chiều sâu đệ quy (không tính output).

### Bài 2 — Permutations II (có trùng)

**Cách tiếp cận.** Sort trước để các phần tử bằng nhau nằm cạnh nhau. Pruning: trong cùng một mức (cùng vị trí), nếu `nums[i] == nums[i-1]` và `nums[i-1]` **chưa được dùng** (`!used[i-1]`) thì bỏ `nums[i]` — vì phần tử trùng phía trước đã sinh nhánh tương đương rồi.

```go
func permuteUnique(nums []int) [][]int {
	sort.Ints(nums)
	var res [][]int
	used := make([]bool, len(nums))
	var dfs func(path []int)
	dfs = func(path []int) {
		if len(path) == len(nums) {
			cp := make([]int, len(path))
			copy(cp, path)
			res = append(res, cp)
			return
		}
		for i := 0; i < len(nums); i++ {
			if used[i] {
				continue
			}
			// PRUNING chống hoán vị trùng:
			if i > 0 && nums[i] == nums[i-1] && !used[i-1] {
				continue
			}
			used[i] = true
			path = append(path, nums[i])
			dfs(path)
			path = path[:len(path)-1]
			used[i] = false
		}
	}
	dfs([]int{})
	return res
}
```

**Vì sao `!used[i-1]`?** Trong một nhánh, ta muốn các phần tử trùng được dùng theo **đúng thứ tự trái→phải**. Nếu `used[i-1]==false` nghĩa là phần tử trùng trước đó *chưa* được chọn ở mức này — chọn `nums[i]` bây giờ sẽ tạo nhánh giống hệt nhánh bắt đầu bằng `nums[i-1]` → trùng → bỏ. **Big-O:** `O(n! · n)` worst (không trùng), thực tế ít hơn nhờ pruning.

### Bài 3 — Combination Sum

**Cách tiếp cận.** Như mục 9: sort, dùng `start=i` (cho dùng lại số), pruning `break` khi `cands[i] > remain`.

```go
func combinationSum(cands []int, target int) [][]int {
	sort.Ints(cands)
	var res [][]int
	var dfs func(start, remain int, path []int)
	dfs = func(start, remain int, path []int) {
		if remain == 0 {
			cp := make([]int, len(path))
			copy(cp, path)
			res = append(res, cp)
			return
		}
		for i := start; i < len(cands); i++ {
			if cands[i] > remain {
				break // pruning: đã sort
			}
			path = append(path, cands[i])
			dfs(i, remain-cands[i], path) // i: cho dùng lại
			path = path[:len(path)-1]
		}
	}
	dfs(0, target, []int{})
	return res
}
```

**Walk-through** `[2,3]`, target=`6`: `[2,2,2]` (2+2+2), `[3,3]`. Pruning cắt mọi nhánh mà phần tử kế đã `> remain`. **Big-O:** xấp xỉ `O(N^(T/m))` với `T=target, m=min(cands)`; pruning giảm mạnh thực tế.

### Bài 4 — N-Queens đếm nghiệm

**Cách tiếp cận.** Y hệt mục 6 nhưng thay vì dựng bàn cờ, chỉ `count++` khi `row==n`. Bỏ luôn mảng `pos` và việc tạo string → nhanh hơn.

```go
func totalNQueens(n int) int {
	count := 0
	cols := make([]bool, n)
	d1 := make([]bool, 2*n-1)
	d2 := make([]bool, 2*n-1)
	var dfs func(row int)
	dfs = func(row int) {
		if row == n {
			count++ // tìm thấy 1 nghiệm
			return
		}
		for col := 0; col < n; col++ {
			a, b := row-col+n-1, row+col
			if cols[col] || d1[a] || d2[b] {
				continue // pruning
			}
			cols[col], d1[a], d2[b] = true, true, true
			dfs(row + 1)
			cols[col], d1[a], d2[b] = false, false, false
		}
	}
	dfs(0)
	return count
}
```

**Kết quả mẫu:** `n=4 → 2`, `n=5 → 10`, `n=6 → 4`, `n=8 → 92`. **Big-O:** cận trên thô `O(n!)`; pruning cột/chéo khiến số node thực tế nhỏ hơn nhiều (~15k cho n=8).

### Bài 5 — Generate Parentheses

**Cách tiếp cận.** Xây chuỗi từng ký tự. Tại mỗi bước có thể thêm `(` nếu **số `(` đã dùng `< n`**, và thêm `)` nếu **số `)` < số `(` đã dùng** (để luôn hợp lệ). Đó chính là pruning — không bao giờ sinh chuỗi không hợp lệ.

```go
func generateParenthesis(n int) []string {
	var res []string
	var dfs func(open, close int, path []byte)
	dfs = func(open, close int, path []byte) {
		if len(path) == 2*n {
			res = append(res, string(path)) // string(...) tạo bản sao → an toàn
			return
		}
		if open < n { // còn được mở
			dfs(open+1, close, append(path, '('))
		}
		if close < open { // chỉ đóng khi còn ngoặc mở chưa đóng
			dfs(open, close+1, append(path, ')'))
		}
	}
	dfs(0, 0, []byte{})
	return res
}
```

**Walk-through** `n=2`: `(()), ()()`. **Vì sao `close < open`?** Nếu cho `)` khi `close==open`, chuỗi sẽ có `)` không có `(` tương ứng → không hợp lệ. Điều kiện này là pruning loại bỏ mọi nhánh chết. **Big-O:** số chuỗi hợp lệ = Catalan number `C_n ≈ 4^n / (n^1.5 √π)` → `O(4^n / √n · n)`.

> Lưu ý Go: ở đây ta truyền `append(path, '(')` cho mỗi nhánh. Vì `string(path)` sao chép bytes thành chuỗi bất biến nên kết quả an toàn. Nhưng nếu cap dùng chung, hai nhánh `open` và `close` có thể tranh nhau cùng buffer — an toàn hơn nên dùng path riêng hoặc copy. Cách chắc chắn: `np := make([]byte, len(path)); copy(np, path); np = append(np, '(')`.

### Bài 6 — Palindrome Partitioning

**Cách tiếp cận.** Thử mọi điểm cắt từ vị trí `start`. Với mỗi đoạn `s[start:end]`, nếu nó là palindrome thì chọn nó và đệ quy cắt phần `s[end:]`. Khi `start==len(s)` → một cách cắt hoàn chỉnh.

```go
func partition(s string) [][]string {
	var res [][]string
	var dfs func(start int, path []string)
	isPal := func(a string) bool {
		i, j := 0, len(a)-1
		for i < j {
			if a[i] != a[j] {
				return false
			}
			i++
			j--
		}
		return true
	}
	dfs = func(start int, path []string) {
		if start == len(s) {
			cp := make([]string, len(path))
			copy(cp, path) // COPY!
			res = append(res, cp)
			return
		}
		for end := start + 1; end <= len(s); end++ {
			seg := s[start:end]
			if isPal(seg) { // PRUNING: chỉ đi sâu nếu đoạn là palindrome
				path = append(path, seg)
				dfs(end, path)
				path = path[:len(path)-1] // undo
			}
		}
	}
	dfs(0, []string{})
	return res
}
```

**Walk-through** `"aab"`: từ `start=0` thử `"a"` (pal) → `start=1` thử `"a"` (pal) → `start=2` thử `"b"` (pal) → `["a","a","b"]`. Hoặc `start=0` thử `"aa"` (pal) → `start=2` thử `"b"` → `["aa","b"]`. `"aab"` không pal → bỏ. Kết quả `[["a","a","b"],["aa","b"]]`. **Big-O:** `O(2^(n-1) · n)` — `2^(n-1)` cách cắt, mỗi đoạn kiểm tra palindrome `O(n)`.

---

## Code & Minh họa

- Toàn bộ code Go ở trên là **inline, biên dịch được** (thêm `package main`, `import` phù hợp). Bài này **không** kèm `solutions.go` riêng — đọc trực tiếp các block `go` trong từng mục.
- [visualization.html](./visualization.html) — 3 module tương tác:
  1. **Decision tree explorer** — chọn subsets/permutations cho `[1,2,3]`, animate DFS đi xuống và backtrack đi lên, highlight đường đi hiện tại.
  2. **N-Queens solver** — bàn cờ N×N, animate đặt hậu + quay lui khi conflict, hiển thị pruning theo cột/chéo.
  3. **Pruning impact** — so sánh số node duyệt có/không pruning.

---

## Tổng kết Tier 2

Lesson 18 khép lại **Tier 2 — Kỹ thuật cốt lõi**. Bạn đã có bộ công cụ: binary search, two pointers, sliding window, prefix sum, hashing, divide & conquer, và backtracking. Đây là những "động tác cơ bản" xuất hiện trong hầu hết bài toán thuật toán.

## Bài tiếp theo

Đi tiếp sang **[Tier 3 — Greedy](../tier-3-greedy/index.html)**: thuật toán tham lam — chọn tối ưu cục bộ, khi nào đúng (exchange argument) và khi nào phải chuyển sang DP. Backtracking liệt kê *mọi* khả năng; greedy đặt cược vào *một* lựa chọn ở mỗi bước — đối lập thú vị để so sánh.

## Tham khảo chéo

- [Lesson 03 — Đệ quy](../lesson-03-recursion-recurrence/) — nền tảng đệ quy của backtracking.
- [Lesson 05 — Brute-force tới tối ưu](../lesson-05-bruteforce-to-optimize/) — backtracking = brute-force có pruning.
- [Lesson 17 — Chia để trị](../lesson-17-divide-and-conquer/) — paradigm đệ quy chị em.
- [Tier 4 — Quy hoạch động](../tier-4-dynamic-programming/index.html) — khi cần đếm/tối ưu với overlap thay vì liệt kê.
