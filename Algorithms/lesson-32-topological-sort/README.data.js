// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: Algorithms/lesson-32-topological-sort/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 32 — Sắp xếp Topo (Topological Sort)

> **Tier 5 · Thuật toán đồ thị** — Sắp xếp tuyến tính các đỉnh của một DAG sao cho mọi cạnh đi từ trái sang phải. Nền tảng cho build system, scheduling, dependency resolution.

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Hiểu **topo sort là gì** và tại sao nó **chỉ tồn tại với DAG** (đồ thị có hướng không chu trình).
- Cài đặt được **Kahn's algorithm** (BFS-based, dựa trên in-degree) và **DFS-based** (post-order + đảo ngược).
- Dùng topo sort để **phát hiện chu trình** (cycle detection) trong đồ thị có hướng.
- Hiểu cơ chế **3 màu DFS** (white/gray/black) để bắt back edge.
- Giải được các bài kinh điển: **Course Schedule I/II**, **Alien Dictionary**, **Longest Path in DAG**, **lexicographically smallest topo order**.

## Kiến thức tiền đề

- [Lesson 31 — Duyệt đồ thị (BFS & DFS)](../lesson-31-graph-traversal/) — biểu diễn đồ thị (adjacency list), khái niệm in/out-degree, hàng đợi (queue), đệ quy DFS.
- [Lesson 23 — DP fundamentals](../lesson-23-dp-fundamentals/) — dùng cho phần "Longest path in DAG" (topo order + DP).
- Hàng đợi ưu tiên (priority queue / heap) — dùng cho "lexicographically smallest" (xem [Lesson 09 — Heap Sort](../lesson-09-heap-sort/)).

---

## 1. Topo sort là gì?

> 💡 **Trực giác — mặc quần áo buổi sáng.**
> Bạn không thể đi giày trước khi đi tất, không mặc áo khoác trước khi mặc áo sơ mi. Có những **ràng buộc thứ tự**: "tất phải trước giày", "sơ mi phải trước khoác". Nhưng "đeo đồng hồ" thì độc lập, đặt bất cứ lúc nào. Topo sort là một **danh sách mặc đồ hợp lệ** — một thứ tự tuyến tính tôn trọng MỌI ràng buộc.

**Định nghĩa hình thức.** Cho đồ thị có hướng $G = (V, E)$. Một **thứ tự topo** (topological ordering) là một cách xếp tất cả các đỉnh thành dãy tuyến tính $v_1, v_2, \\ldots, v_n$ sao cho:

> Với MỌI cạnh \`u → v\` trong \`E\`, thì \`u\` xuất hiện TRƯỚC \`v\` trong dãy.

Nói cách khác: nếu có cạnh \`u → v\` (đọc là "u phải đứng trước v", hoặc "v phụ thuộc u"), thì trong dãy kết quả \`u\` nằm bên trái \`v\`.

### 1.1 Vì sao chỉ DAG mới có topo order?

> ❓ **Câu hỏi tự nhiên: đồ thị nào cũng sắp được topo không?**
> Không. **Điều kiện cần và đủ là đồ thị phải là DAG** (Directed Acyclic Graph — đồ thị có hướng KHÔNG có chu trình).

**Chứng minh "có chu trình ⇒ KHÔNG topo order được" (rõ từng bước):**

Giả sử có chu trình \`a → b → c → a\`. Trong một thứ tự topo bất kỳ:
- Cạnh \`a → b\` đòi \`a\` trước \`b\`.
- Cạnh \`b → c\` đòi \`b\` trước \`c\`.
- Cạnh \`c → a\` đòi \`c\` trước \`a\`.

Ghép lại: \`a\` trước \`b\` trước \`c\` trước \`a\` ⟹ \`a\` trước \`a\`. Mâu thuẫn (một phần tử không thể đứng trước chính nó). Vậy không tồn tại thứ tự nào thỏa cả ba cạnh. ∎

**Chứng minh "DAG ⇒ luôn có topo order" (rõ từng bước):**

Mọi DAG hữu hạn đều có ít nhất một **đỉnh nguồn** (source — in-degree 0). Vì nếu mọi đỉnh đều có in-degree ≥ 1, ta đi ngược cạnh vào mãi: đỉnh nào cũng có cha → đi ngược vô hạn trên tập hữu hạn đỉnh → phải lặp lại một đỉnh → tạo chu trình → mâu thuẫn DAG. Vậy tồn tại đỉnh \`s\` với in-degree 0. Đặt \`s\` đầu dãy, xóa \`s\` (và các cạnh ra của nó) khỏi đồ thị; phần còn lại vẫn là DAG, lặp lại. Quy nạp ⟹ xây được dãy đầy đủ. ∎

> ⚠ **Lỗi thường gặp #1:** Tưởng "đồ thị vô hướng cũng topo sort được". KHÔNG. Cạnh vô hướng \`u — v\` đòi đồng thời \`u\` trước \`v\` VÀ \`v\` trước \`u\` ⟹ mâu thuẫn ngay. Topo sort CHỈ định nghĩa cho đồ thị **có hướng**.

### 1.2 Bốn ví dụ cụ thể

**Ví dụ 1 — DAG đơn giản (chuỗi thẳng):**
\`\`\`
0 → 1 → 2 → 3
\`\`\`
Chỉ có MỘT thứ tự topo: \`0, 1, 2, 3\`.

**Ví dụ 2 — DAG có nhánh song song:**
\`\`\`
0 → 1 → 3
0 → 2 → 3
\`\`\`
Có HAI thứ tự topo hợp lệ: \`0, 1, 2, 3\` và \`0, 2, 1, 3\`. (1 và 2 độc lập, đổi chỗ được; nhưng 0 luôn đầu, 3 luôn cuối.)

**Ví dụ 3 — đồ thị có chu trình:**
\`\`\`
0 → 1 → 2 → 0
\`\`\`
KHÔNG có thứ tự topo (chu trình \`0→1→2→0\`).

**Ví dụ 4 — đồ thị 6 đỉnh (dùng xuyên suốt bài):**
\`\`\`
5 → 0,  5 → 2
4 → 0,  4 → 1
2 → 3
3 → 1
\`\`\`
Một thứ tự topo hợp lệ: \`4, 5, 2, 3, 1, 0\`. Một thứ tự khác cũng hợp lệ: \`5, 4, 2, 3, 1, 0\`. (Kiểm: mọi cạnh đều "trái → phải".)

> 🔁 **Tự kiểm tra 1.** Dãy \`0, 5, 2, 3, 1, 4\` có phải topo order hợp lệ cho ví dụ 4 không?
> <details><summary>Đáp án</summary>
> KHÔNG. Cạnh \`4 → 0\` đòi \`4\` trước \`0\`, nhưng trong dãy \`4\` đứng SAU \`0\` (vị trí cuối). Cũng vi phạm \`4 → 1\` (4 sau 1). Vậy dãy này không hợp lệ.
> </details>

> 📝 **Tóm tắt mục 1.**
> - Topo order = xếp đỉnh tuyến tính sao cho mọi cạnh \`u → v\` thì \`u\` đứng trước \`v\`.
> - Tồn tại **khi và chỉ khi** đồ thị là DAG.
> - Có chu trình ⟹ không có topo order. DAG ⟹ luôn có ≥ 1 topo order (có thể nhiều).

---

## 2. Ứng dụng thực tế

Topo sort xuất hiện ở mọi nơi có "việc A phải xong trước việc B":

| Lĩnh vực | Đỉnh | Cạnh \`u → v\` nghĩa là | Topo order cho ra |
|----------|------|----------------------|-------------------|
| **Build system** (Makefile, Bazel) | file/target | \`u\` phải build trước \`v\` | thứ tự compile/link |
| **Schedule khóa học** | môn học | \`u\` là tiền đề (prerequisite) của \`v\` | trình tự học hợp lệ |
| **Dependency resolution** (npm, apt, pip) | package | \`v\` cần \`u\` cài trước | thứ tự cài đặt |
| **Spreadsheet recalc** (Excel) | ô (cell) | \`C1 = A1 + B1\` ⟹ \`A1 → C1\`, \`B1 → C1\` | thứ tự tính lại công thức |
| **Task scheduling / CI pipeline** | job | \`u\` phải chạy xong trước \`v\` | thứ tự thực thi |
| **Symbol resolution** (linker) | định nghĩa | \`u\` được dùng trong \`v\` | thứ tự khai báo |

> 💡 **Hình dung:** Mỗi ứng dụng trên đều là "tôi có một đống việc với ràng buộc thứ tự — hãy sắp xếp một trình tự làm hợp lệ". Nếu sắp được ⟹ DAG ⟹ không có "phụ thuộc vòng". Nếu KHÔNG sắp được ⟹ có chu trình ⟹ **circular dependency** (npm báo "circular dependency detected", Excel báo "circular reference").

> ❓ **Excel báo "circular reference" là gì?**
> Bạn gõ \`A1 = B1 + 1\` và \`B1 = A1 + 1\`. Excel cần biết tính ô nào trước, nhưng \`A1\` cần \`B1\`, \`B1\` lại cần \`A1\` — chu trình \`A1 → B1 → A1\`. Không có topo order ⟹ Excel không biết bắt đầu từ đâu ⟹ báo lỗi. Đây CHÍNH LÀ cycle detection bằng topo sort.

> 📝 **Tóm tắt mục 2.** Bất cứ khi nào dữ liệu có dạng "X phụ thuộc Y", mô hình hóa thành DAG và topo sort cho ra trình tự xử lý hợp lệ; nếu không topo sort được ⟹ phát hiện phụ thuộc vòng.

---

## 3. Kahn's algorithm (BFS-based, dựa trên in-degree)

> 💡 **Trực giác — bóc lớp hành.**
> Đỉnh nào KHÔNG còn ai phụ thuộc trước nó (in-degree 0) thì làm được ngay → đưa vào kết quả. Làm xong nó, "xóa" nó khỏi đồ thị: các đỉnh từng phụ thuộc nó giảm bớt một ràng buộc. Đỉnh nào vừa hết ràng buộc (in-degree về 0) thì đến lượt. Cứ bóc dần như bóc từng lớp hành cho tới khi hết đỉnh.

### 3.1 In-degree là gì?

**In-degree** của đỉnh \`v\` = số cạnh **đi VÀO** \`v\` = số đỉnh \`u\` mà có cạnh \`u → v\`. Nó đếm "có bao nhiêu thứ phải xong trước khi đến lượt \`v\`".

- In-degree 0 ⟹ không phụ thuộc ai ⟹ làm được ngay (đỉnh nguồn).

> ⚠ **Lỗi thường gặp #2:** Nhầm in-degree với out-degree. **In** = cạnh đi VÀO (đếm cha). **Out** = cạnh đi RA (đếm con). Kahn dùng **in-degree**.

### 3.2 Thuật toán Kahn (5 bước)

1. Tính \`inDeg[v]\` cho mọi đỉnh.
2. Đưa mọi đỉnh có \`inDeg == 0\` vào **queue**.
3. Lặp tới khi queue rỗng: lấy \`u\` ra khỏi queue, thêm \`u\` vào kết quả.
4. Với mỗi cạnh \`u → w\`: giảm \`inDeg[w]\` đi 1. Nếu \`inDeg[w]\` về 0 ⟹ đẩy \`w\` vào queue.
5. Sau vòng lặp: nếu kết quả có đủ $V$ đỉnh ⟹ topo order hợp lệ. Nếu THIẾU đỉnh ⟹ đồ thị **có chu trình** (các đỉnh trong chu trình không bao giờ về in-degree 0).

### 3.3 Walk-through cụ thể (ví dụ 4, 6 đỉnh)

Đồ thị (nhắc lại): cạnh \`5→0, 5→2, 4→0, 4→1, 2→3, 3→1\`.

**Bước 0 — tính in-degree:**

| Đỉnh | 0 | 1 | 2 | 3 | 4 | 5 |
|------|---|---|---|---|---|---|
| Cạnh vào | \`5→0, 4→0\` | \`4→1, 3→1\` | \`5→2\` | \`2→3\` | (không) | (không) |
| **inDeg** | **2** | **2** | **1** | **1** | **0** | **0** |

**Queue khởi tạo** (in-degree 0): \`[4, 5]\` (theo thứ tự đỉnh tăng dần).

| Vòng | Queue trước | Lấy \`u\` | Giảm in-degree | inDeg về 0 → push | Kết quả |
|------|-------------|---------|----------------|-------------------|---------|
| 1 | \`[4, 5]\` | **4** | \`0:2→1\`, \`1:2→1\` | (không) | \`[4]\` |
| 2 | \`[5]\` | **5** | \`0:1→0\` ✓, \`2:1→0\` ✓ | push 0, push 2 | \`[4, 5]\` |
| 3 | \`[0, 2]\` | **0** | (0 không có cạnh ra) | (không) | \`[4, 5, 0]\` |
| 4 | \`[2]\` | **2** | \`3:1→0\` ✓ | push 3 | \`[4, 5, 0, 2]\` |
| 5 | \`[3]\` | **3** | \`1:1→0\` ✓ | push 1 | \`[4, 5, 0, 2, 3]\` |
| 6 | \`[1]\` | **1** | (1 không có cạnh ra) | (không) | \`[4, 5, 0, 2, 3, 1]\` |

Queue rỗng. Kết quả: **\`4, 5, 0, 2, 3, 1\`** — đủ 6 đỉnh ⟹ topo order hợp lệ.

> Kiểm nhanh: cạnh \`5→0\` (5 ở vị trí 1, 0 ở vị trí 2 ✓), \`2→3\` (2 ở vị trí 3, 3 ở vị trí 4 ✓), \`3→1\` (3 trước 1 ✓)... tất cả "trái → phải".

### 3.4 Code Go — Kahn's algorithm

\`\`\`go
package main

import "fmt"

// kahnTopo trả về (order, ok).
// order: một thứ tự topo (nếu tồn tại). ok=false nếu đồ thị có chu trình.
// adj[u] = danh sách các đỉnh w sao cho có cạnh u -> w.
func kahnTopo(n int, adj [][]int) ([]int, bool) {
	inDeg := make([]int, n)
	// Bước 1: tính in-degree. Mỗi cạnh u->w cộng 1 vào inDeg[w].
	for u := 0; u < n; u++ {
		for _, w := range adj[u] {
			inDeg[w]++
		}
	}

	// Bước 2: đưa mọi đỉnh in-degree 0 vào queue (dùng slice làm queue).
	queue := []int{}
	for v := 0; v < n; v++ {
		if inDeg[v] == 0 {
			queue = append(queue, v)
		}
	}

	order := make([]int, 0, n)
	// Bước 3-4: bóc lớp.
	for len(queue) > 0 {
		u := queue[0]    // dequeue (lấy đầu hàng)
		queue = queue[1:]
		order = append(order, u)
		for _, w := range adj[u] { // giảm in-degree mọi neighbor
			inDeg[w]--
			if inDeg[w] == 0 { // vừa hết phụ thuộc -> tới lượt
				queue = append(queue, w)
			}
		}
	}

	// Bước 5: nếu chưa đủ n đỉnh -> còn đỉnh kẹt trong chu trình.
	if len(order) != n {
		return nil, false // có chu trình -> không có topo order
	}
	return order, true
}

func main() {
	// Ví dụ 4: 6 đỉnh, cạnh 5->0,5->2,4->0,4->1,2->3,3->1
	n := 6
	adj := make([][]int, n)
	adj[5] = []int{0, 2}
	adj[4] = []int{0, 1}
	adj[2] = []int{3}
	adj[3] = []int{1}
	order, ok := kahnTopo(n, adj)
	fmt.Println(order, ok) // [4 5 0 2 3 1] true (đúng walk-through trên)

	// Thêm cạnh 1->4 tạo chu trình 4->1->4:
	adj[1] = []int{4}
	order, ok = kahnTopo(n, adj)
	fmt.Println(order, ok) // [] false  (phát hiện chu trình)
}
\`\`\`

> ❓ **Vì sao "thiếu đỉnh ⟹ có chu trình"?** Một đỉnh chỉ vào queue khi in-degree về 0. Các đỉnh nằm trong một chu trình luôn có ít nhất một cạnh vào TỪ chính chu trình đó — cạnh này chỉ giảm khi đỉnh nguồn của nó được xử lý, mà đỉnh nguồn đó lại nằm trong chu trình... vòng tròn. Nên không đỉnh nào trong chu trình về được in-degree 0 ⟹ không vào queue ⟹ thiếu khỏi \`order\`.

> 🔁 **Tự kiểm tra 2.** Nếu queue khởi tạo RỖNG ngay từ đầu (không đỉnh nào in-degree 0) thì kết luận gì?
> <details><summary>Đáp án</summary>
> Đồ thị chắc chắn có chu trình (mọi đỉnh đều có cha). \`order\` rỗng, \`len(order) != n\` ⟹ trả về \`false\`. Đây là trường hợp đặc biệt của bước 5.
> </details>

> 📝 **Tóm tắt mục 3.** Kahn = đếm in-degree → queue các đỉnh in-degree 0 → bóc dần, mỗi lần bóc giảm in-degree neighbor. Thiếu đỉnh ⟹ chu trình. Độ phức tạp $O(V+E)$.

---

## 4. DFS-based topo sort (post-order + đảo ngược)

> 💡 **Trực giác — đi tới tận cùng trước.**
> Hãy đi sâu (DFS) từ một đỉnh. Một đỉnh chỉ được "hoàn thành" (finish) khi MỌI đỉnh nó đi tới đều đã hoàn thành. Đỉnh hoàn thành CUỐI cùng phải đứng ĐẦU topo order (vì mọi thứ phụ thuộc nó đã xong sau nó). Vậy ta ghi đỉnh vào lúc nó hoàn thành (post-order) rồi **đảo ngược** danh sách.

### 4.1 Vì sao post-order rồi đảo ngược?

Khi DFS hoàn thành đỉnh \`u\` (post-order), MỌI đỉnh \`w\` mà \`u → w\` đều đã hoàn thành TRƯỚC \`u\`. Tức trong thứ tự hoàn thành, \`w\` đứng trước \`u\`. Nhưng topo cần \`u\` trước \`w\`! Nên ta **đảo ngược** thứ tự hoàn thành: \`u\` (hoàn thành sau) → ra trước. Tương đương: push vào stack theo post-order, rồi pop ra (pop đảo ngược thứ tự push).

### 4.2 Walk-through (ví dụ 4)

DFS bắt đầu từ đỉnh 0, 1, 2, ... (đỉnh chưa thăm). Cạnh: \`5→0,5→2,4→0,4→1,2→3,3→1\`.

- \`dfs(0)\`: 0 không có cạnh ra → **finish 0** → push \`[0]\`.
- \`dfs(1)\`: 1 không có cạnh ra → **finish 1** → push \`[0,1]\`.
- \`dfs(2)\`: 2→3 → \`dfs(3)\`: 3→1 (1 đã xong, bỏ qua) → **finish 3** → push \`[0,1,3]\` → quay lại **finish 2** → push \`[0,1,3,2]\`.
- \`dfs(3)\`: đã thăm, bỏ qua.
- \`dfs(4)\`: 4→0 (đã xong), 4→1 (đã xong) → **finish 4** → push \`[0,1,3,2,4]\`.
- \`dfs(5)\`: 5→0 (đã xong), 5→2 (đã xong) → **finish 5** → push \`[0,1,3,2,4,5]\`.

Stack (thứ tự finish): \`[0, 1, 3, 2, 4, 5]\`. **Đảo ngược** ⟹ \`5, 4, 2, 3, 1, 0\`.

> Kiểm: \`5→0\` (5 đầu, 0 cuối ✓), \`4→1\` (4 trước 1 ✓), \`2→3\` (2 trước 3 ✓), \`3→1\` (3 trước 1 ✓). Hợp lệ! Lưu ý đây là MỘT topo order KHÁC với Kahn (\`4,5,0,2,3,1\`) — cả hai đều đúng.

### 4.3 Code Go — DFS topo với 3 màu (kèm cycle detection)

\`\`\`go
package main

import "fmt"

// Màu trạng thái cho mỗi đỉnh:
const (
	white = 0 // chưa thăm
	gray  = 1 // đang trong ngăn xếp đệ quy (đang DFS dở)
	black = 2 // đã hoàn thành (mọi con đã xong)
)

// dfsTopo trả về (order, ok). ok=false nếu gặp chu trình (back edge tới đỉnh gray).
func dfsTopo(n int, adj [][]int) ([]int, bool) {
	color := make([]int, n) // mặc định white (0)
	stack := make([]int, 0, n)
	hasCycle := false

	var dfs func(u int)
	dfs = func(u int) {
		color[u] = gray // đánh dấu đang xử lý
		for _, w := range adj[u] {
			if color[w] == gray {
				// gặp đỉnh đang trong stack đệ quy -> back edge -> chu trình
				hasCycle = true
				return
			}
			if color[w] == white {
				dfs(w)
				if hasCycle {
					return
				}
			}
			// color[w] == black: đã xong, bỏ qua
		}
		color[u] = black     // hoàn thành u
		stack = append(stack, u) // post-order push
	}

	for v := 0; v < n; v++ {
		if color[v] == white {
			dfs(v)
			if hasCycle {
				return nil, false
			}
		}
	}

	// Đảo ngược stack -> topo order.
	for i, j := 0, len(stack)-1; i < j; i, j = i+1, j-1 {
		stack[i], stack[j] = stack[j], stack[i]
	}
	return stack, true
}

func main() {
	n := 6
	adj := make([][]int, n)
	adj[5] = []int{0, 2}
	adj[4] = []int{0, 1}
	adj[2] = []int{3}
	adj[3] = []int{1}
	order, ok := dfsTopo(n, adj)
	fmt.Println(order, ok) // [5 4 2 3 1 0] true

	adj[1] = []int{5} // tạo chu trình 5->2->3->1->5
	order, ok = dfsTopo(n, adj)
	fmt.Println(order, ok) // [] false
}
\`\`\`

> ⚠ **Lỗi thường gặp #3:** QUÊN đảo ngược stack — trả về luôn thứ tự finish. Đó là thứ tự topo của đồ thị ĐẢO chiều cạnh, không phải đồ thị gốc. Phải đảo ngược (hoặc dùng stack pop).

> 📝 **Tóm tắt mục 4.** DFS topo = chạy DFS, push đỉnh khi finish (post-order), đảo ngược. Tích hợp sẵn cycle detection qua màu gray. $O(V+E)$.

---

## 5. Cycle detection (phát hiện chu trình)

Topo sort và cycle detection là HAI MẶT của cùng một bài toán:

| Phương pháp | Cách phát hiện chu trình |
|-------------|--------------------------|
| **Kahn (BFS)** | Sau vòng lặp, \`len(order) < V\` ⟹ còn đỉnh kẹt trong chu trình. |
| **DFS** | Trong khi DFS gặp một đỉnh **gray** (đang trong stack đệ quy) ⟹ **back edge** ⟹ chu trình. |

> ❓ **Vì sao gặp gray nghĩa là chu trình?** Đỉnh gray = đang ở trên đường đi DFS hiện tại (từ gốc xuống \`u\`). Nếu từ \`u\` ta lại đi tới một đỉnh \`w\` đang gray, nghĩa là \`w\` là tổ tiên của \`u\` trên cây DFS, mà giờ có cạnh \`u → w\` đi ngược lên tổ tiên ⟹ đường \`w → … → u → w\` là chu trình.

> ⚠ **Lỗi thường gặp #4 (QUAN TRỌNG):** Trong đồ thị **vô hướng**, "gặp đỉnh đã thăm" KHÔNG có nghĩa là chu trình (có thể chỉ là cạnh quay về cha). Nhưng trong đồ thị **CÓ HƯỚNG**, chỉ "gặp đỉnh đã thăm = black" cũng KHÔNG đủ — phải là **gray** mới là chu trình. Ví dụ kim cương \`a→b, a→c, b→d, c→d\`: khi DFS từ \`c\` gặp \`d\` đã black (đi qua từ \`b\`) — đó KHÔNG phải chu trình, chỉ là cross/forward edge. Dùng cờ "visited" 2 trạng thái (chưa/đã thăm) sẽ báo chu trình SAI. Phải dùng **3 màu**.

**Walk-through phát hiện chu trình** — đồ thị \`0→1, 1→2, 2→0\`:

| Bước | Hành động | color | Kết luận |
|------|-----------|-------|----------|
| 1 | \`dfs(0)\` | \`0=gray\` | |
| 2 | \`0→1\`, \`dfs(1)\` | \`0=gray,1=gray\` | |
| 3 | \`1→2\`, \`dfs(2)\` | \`0=gray,1=gray,2=gray\` | |
| 4 | \`2→0\`, kiểm \`color[0]\` | \`0=gray\` | **GRAY ⟹ back edge ⟹ chu trình!** |

---

## 6. Ba màu DFS — chi tiết

> 💡 **Trực giác — ba ngăn để đồ.**
> - **White** (chưa thăm): món đồ chưa đụng tới.
> - **Gray** (đang xử lý): món đồ đang cầm trên tay, dở dang (đang trong ngăn xếp đệ quy — đã bắt đầu DFS nhưng chưa xong).
> - **Black** (xong): món đồ đã cất, hoàn thành (mọi con đã DFS xong).

Quá trình một đỉnh: \`white → gray (khi bắt đầu dfs) → black (khi kết thúc dfs)\`.

| Cạnh \`u → w\`, xét \`color[w]\` | Loại cạnh | Ý nghĩa |
|------------------------------|-----------|---------|
| \`white\` | **tree edge** | cạnh trên cây DFS, đi xuống đỉnh mới |
| \`gray\` | **back edge** | trỏ ngược lên tổ tiên ⟹ **CHU TRÌNH** |
| \`black\` | forward/cross edge | đỉnh đã hoàn thành, KHÔNG phải chu trình |

> 🔁 **Tự kiểm tra 3.** Đồ thị \`a→b, b→c, a→c\`. Khi DFS từ \`a\` tới \`c\` (sau khi đã xong \`b→c\`), \`color[c]\` là gì? Có phải chu trình không?
> <details><summary>Đáp án</summary>
> \`color[c] = black\` (vì \`c\` đã hoàn thành qua đường \`a→b→c\`). Cạnh \`a→c\` là **forward edge**, KHÔNG phải chu trình. Nếu dùng "visited" 2 trạng thái sẽ báo nhầm. Đây là lý do PHẢI dùng 3 màu.
> </details>

> 📝 **Tóm tắt mục 6.** 3 màu: white → gray (vào dfs) → black (ra dfs). Gặp gray = back edge = chu trình. Gặp black ≠ chu trình. 2 trạng thái không đủ cho đồ thị có hướng.

---

## 7. Nhiều topo order hợp lệ — Lexicographically smallest

> ❓ **Topo order có duy nhất không?** KHÔNG, trừ khi đồ thị là một chuỗi thẳng. Ví dụ 4 ở mục 1 có cả \`4,5,0,2,3,1\` (Kahn) lẫn \`5,4,2,3,1,0\` (DFS) đều hợp lệ. Khi có nhiều đỉnh in-degree 0 cùng lúc, chọn đỉnh nào cũng được ⟹ nhiều thứ tự.

**Bài toán: lexicographically smallest topo order** — trong tất cả topo order hợp lệ, tìm dãy nhỏ nhất theo thứ tự từ điển (so sánh phần tử đầu, hòa thì so phần tử kế...).

**Ý tưởng:** Thay **queue (FIFO)** trong Kahn bằng **min-heap (priority queue)**. Mỗi khi có nhiều đỉnh in-degree 0, luôn lấy đỉnh **nhỏ nhất** trước.

**Walk-through (ví dụ 4):** Lúc đầu in-degree 0 = \`{4, 5}\` → min-heap trả \`4\`. Xử lý 4 → giảm in-degree 0,1. Heap còn \`{5}\` → lấy 5 → push \`{0, 2}\`. Heap \`{0,2}\` → lấy \`0\` → lấy \`2\` → push 3 → lấy 3 → push 1 → lấy 1. Kết quả: \`4, 5, 0, 2, 3, 1\` (trùng Kahn ở đây vì 4<5, 0<2). Với đồ thị khác, min-heap mới khác queue.

### 7.1 Code Go — lexicographically smallest topo

\`\`\`go
package main

import (
	"container/heap"
	"fmt"
)

// minHeap of ints (cài đặt heap.Interface tối thiểu).
type minHeap []int

func (h minHeap) Len() int            { return len(h) }
func (h minHeap) Less(i, j int) bool  { return h[i] < h[j] }
func (h minHeap) Swap(i, j int)       { h[i], h[j] = h[j], h[i] }
func (h *minHeap) Push(x interface{}) { *h = append(*h, x.(int)) }
func (h *minHeap) Pop() interface{} {
	old := *h
	n := len(old)
	x := old[n-1]
	*h = old[:n-1]
	return x
}

// lexSmallestTopo: dùng min-heap thay queue -> topo nhỏ nhất theo từ điển.
func lexSmallestTopo(n int, adj [][]int) ([]int, bool) {
	inDeg := make([]int, n)
	for u := 0; u < n; u++ {
		for _, w := range adj[u] {
			inDeg[w]++
		}
	}
	h := &minHeap{}
	heap.Init(h)
	for v := 0; v < n; v++ {
		if inDeg[v] == 0 {
			heap.Push(h, v)
		}
	}
	order := make([]int, 0, n)
	for h.Len() > 0 {
		u := heap.Pop(h).(int) // luôn lấy đỉnh nhỏ nhất khả dụng
		order = append(order, u)
		for _, w := range adj[u] {
			inDeg[w]--
			if inDeg[w] == 0 {
				heap.Push(h, w)
			}
		}
	}
	if len(order) != n {
		return nil, false
	}
	return order, true
}

func main() {
	n := 6
	adj := make([][]int, n)
	adj[5] = []int{0, 2}
	adj[4] = []int{0, 1}
	adj[2] = []int{3}
	adj[3] = []int{1}
	order, _ := lexSmallestTopo(n, adj)
	fmt.Println(order) // [4 5 0 2 3 1]
}
\`\`\`

> ⚠ **Lưu ý độ phức tạp:** Dùng heap làm Kahn chậm hơn — $O(V \\log V + E)$ thay vì $O(V + E)$ (mỗi push/pop heap tốn $\\log V$). Chỉ dùng khi BẮT BUỘC cần thứ tự nhỏ nhất.

> 📝 **Tóm tắt mục 7.** Topo order không duy nhất. Lexicographically smallest = Kahn với min-heap thay queue, $O(V \\log V + E)$.

---

## 8. Course Schedule — bài kinh điển

**Course Schedule I (LeetCode 207):** \`n\` môn học \`0..n-1\`, mảng \`prerequisites\` gồm các cặp \`[a, b]\` nghĩa là "phải học \`b\` TRƯỚC \`a\`" (b là tiền đề của a). Hỏi: **có thể học hết tất cả các môn không?**

> ⚠ **Lỗi thường gặp #5 — NHẦM CHIỀU CẠNH (cực kỳ hay sai):** LeetCode quy ước cặp \`[a, b]\` = "to take course \`a\` you must first take \`b\`". Tức \`b\` là tiền đề ⟹ cạnh đi \`b → a\` (b trước a). Nếu bạn vẽ cạnh \`a → b\` thì topo order bị NGƯỢC. **Quy tắc nhớ: cạnh trỏ theo chiều "phải làm trước → làm sau". Tiền đề nằm ở GỐC cạnh.**

**Trả lời Course I:** Học hết được ⟺ đồ thị tiền đề là DAG ⟺ topo sort thành công (không có chu trình). Nếu có chu trình (vd "A cần B, B cần A") ⟹ không bao giờ học được.

**Course Schedule II (LeetCode 210):** Trả về MỘT thứ tự học hợp lệ (chính là topo order). Nếu có chu trình, trả mảng rỗng.

### 8.1 Code Go — Course Schedule I & II

\`\`\`go
package main

import "fmt"

// buildGraph: từ prerequisites [a,b] (b là tiền đề của a) -> cạnh b->a.
func buildGraph(numCourses int, prerequisites [][]int) [][]int {
	adj := make([][]int, numCourses)
	for _, p := range prerequisites {
		a, b := p[0], p[1] // muốn học a thì cần b trước
		adj[b] = append(adj[b], a) // cạnh b -> a (tiền đề ở gốc)
	}
	return adj
}

// Course Schedule I: có học hết được không? (= topo sort thành công?)
func canFinish(numCourses int, prerequisites [][]int) bool {
	adj := buildGraph(numCourses, prerequisites)
	_, ok := kahnTopo(numCourses, adj) // dùng lại Kahn ở mục 3
	return ok
}

// Course Schedule II: trả thứ tự học hợp lệ (rỗng nếu có chu trình).
func findOrder(numCourses int, prerequisites [][]int) []int {
	adj := buildGraph(numCourses, prerequisites)
	order, ok := kahnTopo(numCourses, adj)
	if !ok {
		return []int{} // có chu trình -> không có thứ tự
	}
	return order
}

// (kahnTopo lấy nguyên từ mục 3.4)
func kahnTopo(n int, adj [][]int) ([]int, bool) {
	inDeg := make([]int, n)
	for u := 0; u < n; u++ {
		for _, w := range adj[u] {
			inDeg[w]++
		}
	}
	queue := []int{}
	for v := 0; v < n; v++ {
		if inDeg[v] == 0 {
			queue = append(queue, v)
		}
	}
	order := make([]int, 0, n)
	for len(queue) > 0 {
		u := queue[0]
		queue = queue[1:]
		order = append(order, u)
		for _, w := range adj[u] {
			inDeg[w]--
			if inDeg[w] == 0 {
				queue = append(queue, w)
			}
		}
	}
	if len(order) != n {
		return nil, false
	}
	return order, true
}

func main() {
	// 4 môn, cặp [a,b]=học a cần b trước.
	prereq := [][]int{{1, 0}, {2, 0}, {3, 1}, {3, 2}}
	fmt.Println(canFinish(4, prereq)) // true (là DAG)
	fmt.Println(findOrder(4, prereq)) // [0 1 2 3] (0 trước, 3 cuối)

	// Chu trình: học 1 cần 0, học 0 cần 1.
	cyc := [][]int{{1, 0}, {0, 1}}
	fmt.Println(canFinish(2, cyc)) // false
	fmt.Println(findOrder(2, cyc)) // []
}
\`\`\`

> 📝 **Tóm tắt mục 8.** Course I = "topo sort được không?" (cycle check). Course II = "trả topo order". Chú ý chiều cạnh: tiền đề ở GỐC cạnh.

---

## 9. Longest path in DAG (đường đi dài nhất)

> 💡 **Trực giác — critical path.** Trong một dự án (mỗi cạnh \`u→v\` có "thời gian/trọng số"), đường dài nhất từ điểm bắt đầu tới kết thúc là **đường găng (critical path)** — quyết định tổng thời gian tối thiểu hoàn thành dự án. Không thể rút ngắn hơn đường này.

> ❓ **Sao đường dài nhất trên đồ thị thường là bài KHÓ (NP-hard) mà DAG lại dễ?** Trên đồ thị có chu trình, "dài nhất" vô nghĩa (đi vòng mãi → vô hạn) hoặc NP-hard (longest simple path). Nhưng DAG KHÔNG có chu trình ⟹ ta xử lý đỉnh theo **topo order**: khi tính tới \`v\`, MỌI đỉnh có cạnh vào \`v\` đã tính xong ⟹ DP một lượt là ra. Đây là sự kết hợp topo sort + [DP](../lesson-23-dp-fundamentals/).

**Công thức DP:** \`dist[v] = max(dist[u] + w(u,v))\` với mọi cạnh \`u → v\`. Xử lý các đỉnh theo topo order ⟹ khi tới \`v\`, mọi \`dist[u]\` đã đúng.

**Walk-through** — DAG có trọng số: \`0→1(3), 0→2(2), 1→3(4), 2→3(1)\`. Topo order: \`0,1,2,3\`.
- \`dist[0]=0\`.
- xử lý 0: cạnh \`0→1(3)\`: \`dist[1]=max(-∞,0+3)=3\`. \`0→2(2)\`: \`dist[2]=2\`.
- xử lý 1: \`1→3(4)\`: \`dist[3]=max(-∞,3+4)=7\`.
- xử lý 2: \`2→3(1)\`: \`dist[3]=max(7,2+1=3)=7\`.
- xử lý 3: không cạnh ra.

Đường dài nhất từ 0 = \`dist[3] = 7\` (qua \`0→1→3\`).

### 9.1 Code Go — longest path in DAG

\`\`\`go
package main

import "fmt"

type edge struct{ to, w int }

// longestPathDAG: đường dài nhất bắt đầu từ "src", trên DAG có trọng số.
// adj[u] = list edge{to, w}. Trả về dist[] (độ dài lớn nhất tới mỗi đỉnh).
func longestPathDAG(n int, adj [][]edge, src int) []int {
	// 1. Topo sort (Kahn trên đồ thị bỏ trọng số).
	plain := make([][]int, n)
	for u := 0; u < n; u++ {
		for _, e := range adj[u] {
			plain[u] = append(plain[u], e.to)
		}
	}
	order, _ := kahnTopo(n, plain)

	// 2. DP theo topo order.
	const NEG = -1 << 60
	dist := make([]int, n)
	for i := range dist {
		dist[i] = NEG // không tới được
	}
	dist[src] = 0
	for _, u := range order {
		if dist[u] == NEG {
			continue // u không tới được từ src
		}
		for _, e := range adj[u] {
			if dist[u]+e.w > dist[e.to] {
				dist[e.to] = dist[u] + e.w // relax theo topo
			}
		}
	}
	return dist
}

func main() {
	n := 4
	adj := make([][]edge, n)
	adj[0] = []edge{{1, 3}, {2, 2}}
	adj[1] = []edge{{3, 4}}
	adj[2] = []edge{{3, 1}}
	dist := longestPathDAG(n, adj, 0)
	fmt.Println(dist[3]) // 7 (đường 0->1->3)
}
\`\`\`

> 📝 **Tóm tắt mục 9.** Trên DAG, đường dài nhất = topo sort + DP một lượt theo topo order, $O(V+E)$. Là critical path. Trên đồ thị có chu trình bài này NP-hard.

---

## 10. Độ phức tạp

| Thuật toán | Thời gian | Bộ nhớ | Ghi chú |
|------------|-----------|--------|---------|
| Kahn (BFS) | **$O(V + E)$** | $O(V)$ | duyệt mỗi đỉnh + mỗi cạnh đúng 1 lần |
| DFS topo | **$O(V + E)$** | $O(V)$ đệ quy | mỗi đỉnh thăm 1 lần, mỗi cạnh xét 1 lần |
| Cycle detection (cả 2) | **$O(V + E)$** | $O(V)$ | đi kèm topo sort, không tốn thêm bậc |
| Lex smallest (heap Kahn) | **$O(V \\log V + E)$** | $O(V)$ | heap thêm $\\log V$ mỗi thao tác |
| Longest path DAG | **$O(V + E)$** | $O(V)$ | topo sort + DP một lượt |

> ❓ **Vì sao $O(V+E)$ chứ không phải $O(V^2)$?** Mỗi đỉnh được lấy ra khỏi queue/stack đúng MỘT lần ($O(V)$ tổng). Khi xử lý đỉnh \`u\`, ta duyệt qua mọi cạnh ra của nó; cộng dồn toàn bộ = tổng số cạnh = $O(E)$. Vậy $V + E$. Nếu lưu đồ thị bằng ma trận kề thì duyệt neighbor tốn $O(V)$ mỗi đỉnh ⟹ $O(V^2)$; dùng adjacency list mới đạt $O(V+E)$.

> 📝 **Tóm tắt mục 10.** Topo sort cơ bản $O(V+E)$ với adjacency list. Lex-smallest đắt hơn vì heap. Longest path DAG vẫn $O(V+E)$.

---

## 11. Khi nào dùng?

**Dùng topo sort khi:**

- Dữ liệu có dạng **dependency / ràng buộc thứ tự** trên đồ thị **có hướng**: build order, prerequisites, package install, công thức spreadsheet, task pipeline.
- Cần **phát hiện phụ thuộc vòng** (circular dependency) — topo sort thất bại ⟹ có chu trình.
- Cần **DP trên DAG** (longest/shortest path, đếm đường đi, critical path) — topo order cho thứ tự xử lý.

**KHÔNG dùng / không áp dụng được khi:**

- Đồ thị **vô hướng** (topo sort không định nghĩa).
- Đồ thị **có chu trình** (không có topo order — nhưng vẫn DÙNG topo sort để PHÁT HIỆN chu trình đó).
- Bài cần đường đi ngắn nhất có **trọng số âm và chu trình** ⟹ dùng Bellman-Ford (xem Lesson 34), không phải topo.

> 💡 **Quy tắc chọn giữa Kahn và DFS:**
> - **Kahn** dễ hiểu hơn, không đệ quy (tránh stack overflow với đồ thị sâu), tự nhiên cho "lex smallest" (đổi sang heap). Ưu tiên Kahn nói chung.
> - **DFS** gọn khi bạn ĐÃ duyệt DFS sẵn, và tự nhiên cho cycle detection chi tiết (in được chu trình cụ thể qua đường gray).

> 📝 **Tóm tắt mục 11.** Dùng cho dependency/ordering trên DAG có hướng + phát hiện circular dependency + DP trên DAG. Ưu tiên Kahn trừ khi đã có DFS sẵn.

---

## 12. Cạm bẫy (tổng hợp)

| # | Cạm bẫy | Hậu quả | Cách tránh |
|---|---------|---------|------------|
| 1 | Áp dụng topo sort cho đồ thị **có chu trình** và tin kết quả | Kết quả thiếu đỉnh / sai | LUÔN kiểm \`len(order) == V\` (Kahn) hoặc cờ gray (DFS) |
| 2 | **Quên cycle detection** | Trả topo order rỗng/lỗi mà không biết vì sao | Kiểm điều kiện cuối, trả \`ok=false\` rõ ràng |
| 3 | **Tính in-degree sai** (nhầm in/out, đếm trùng cạnh) | Queue khởi tạo sai → kết quả sai | In = cạnh VÀO. Đếm 1 lần cho mỗi cạnh \`u→w\` cộng \`inDeg[w]\` |
| 4 | **Nhầm chiều cạnh** (prerequisite \`[a,b]\`) | Topo order ngược | "Tiền đề \`b\` ở GỐC cạnh": cạnh \`b → a\` |
| 5 | Dùng **2 trạng thái** (visited) cho cycle detect đồ thị có hướng | Báo nhầm chu trình ở forward/cross edge | Dùng **3 màu** white/gray/black |
| 6 | **Quên đảo ngược** stack trong DFS topo | Trả thứ tự ngược | Đảo ngược stack hoặc dùng pop |
| 7 | Dùng **DFS đệ quy** cho đồ thị rất sâu (V lớn) | Stack overflow | Dùng Kahn (BFS) hoặc DFS dạng iterative với stack tường minh |

> ⚠ **Cạm bẫy hay gặp nhất trong phỏng vấn:** Course Schedule — vẽ nhầm chiều cạnh từ \`[a,b]\`. Hãy LUÔN tự hỏi: "cặp này nói ai phải học TRƯỚC?" rồi vẽ cạnh từ "trước → sau".

---

## Bài tập

> Mỗi bài có lời giải đầy đủ ở mục [Lời giải chi tiết](#lời-giải-chi-tiết) bên dưới — kèm cách tiếp cận, code Go, và độ phức tạp.

1. **(Cycle check) Course Schedule I.** Cho \`numCourses\` và \`prerequisites\` (\`[a,b]\` = học \`a\` cần \`b\`). Trả \`true\` nếu học hết được. *(LeetCode 207)*
2. **(Order) Course Schedule II.** Như bài 1 nhưng trả về MỘT thứ tự học hợp lệ (rỗng nếu không thể). *(LeetCode 210)*
3. **(Build graph + topo) Alien Dictionary.** Cho danh sách từ đã sắp theo thứ tự từ điển của một ngôn ngữ ngoài hành tinh, suy ra thứ tự bảng chữ cái. *(LeetCode 269)*
4. **(Lex smallest) Lexicographically smallest topo order.** Cho DAG, trả topo order nhỏ nhất theo từ điển.
5. **(DP trên DAG) Longest path in DAG.** Cho DAG có trọng số và đỉnh nguồn, tìm độ dài đường đi dài nhất.
6. **(Cycle detect) Detect cycle in directed graph.** Trả \`true\` nếu đồ thị có hướng chứa chu trình.
7. **(Nâng cao) Parallel Courses (LeetCode 1136).** Mỗi học kỳ học được mọi môn đã đủ tiền đề. Hỏi tối thiểu mấy học kỳ để học hết (hoặc -1 nếu không thể).

---

## Lời giải chi tiết

### Bài 1 — Course Schedule I (cycle check)

**Cách tiếp cận:** Xây đồ thị \`b → a\` cho mỗi \`[a,b]\`, chạy Kahn. "Học hết được" ⟺ topo sort thành công ⟺ không có chu trình.

\`\`\`go
func canFinish(numCourses int, prerequisites [][]int) bool {
	adj := make([][]int, numCourses)
	inDeg := make([]int, numCourses)
	for _, p := range prerequisites {
		a, b := p[0], p[1]           // học a cần b
		adj[b] = append(adj[b], a)   // cạnh b -> a
		inDeg[a]++
	}
	queue := []int{}
	for v := 0; v < numCourses; v++ {
		if inDeg[v] == 0 {
			queue = append(queue, v)
		}
	}
	cnt := 0
	for len(queue) > 0 {
		u := queue[0]
		queue = queue[1:]
		cnt++
		for _, w := range adj[u] {
			inDeg[w]--
			if inDeg[w] == 0 {
				queue = append(queue, w)
			}
		}
	}
	return cnt == numCourses // học đủ -> DAG -> true
}
\`\`\`

**Độ phức tạp:** Thời gian **$O(V + E)$** ($V$ = numCourses, $E$ = số cặp prereq), bộ nhớ $O(V + E)$.

---

### Bài 2 — Course Schedule II (order)

**Cách tiếp cận:** Như bài 1 nhưng GHI lại \`order\`. Nếu \`len(order) != numCourses\` (có chu trình) trả mảng rỗng.

\`\`\`go
func findOrder(numCourses int, prerequisites [][]int) []int {
	adj := make([][]int, numCourses)
	inDeg := make([]int, numCourses)
	for _, p := range prerequisites {
		a, b := p[0], p[1]
		adj[b] = append(adj[b], a)
		inDeg[a]++
	}
	queue := []int{}
	for v := 0; v < numCourses; v++ {
		if inDeg[v] == 0 {
			queue = append(queue, v)
		}
	}
	order := make([]int, 0, numCourses)
	for len(queue) > 0 {
		u := queue[0]
		queue = queue[1:]
		order = append(order, u)
		for _, w := range adj[u] {
			inDeg[w]--
			if inDeg[w] == 0 {
				queue = append(queue, w)
			}
		}
	}
	if len(order) != numCourses {
		return []int{} // có chu trình
	}
	return order
}
\`\`\`

**Độ phức tạp:** **$O(V + E)$** thời gian, $O(V + E)$ bộ nhớ.

---

### Bài 3 — Alien Dictionary

**Cách tiếp cận (2 phần):**
1. **Xây đồ thị thứ tự chữ cái:** so từng cặp từ liền kề \`words[i]\`, \`words[i+1]\`. Tìm vị trí đầu tiên hai từ KHÁC ký tự: \`c1 != c2\` ⟹ \`c1\` đứng trước \`c2\` ⟹ cạnh \`c1 → c2\`. **Edge case quan trọng:** nếu \`words[i]\` là tiền tố dài hơn của \`words[i+1]\` (vd \`"abc"\` trước \`"ab"\`) ⟹ INVALID (không thể có thứ tự) ⟹ trả \`""\`.
2. **Topo sort** các ký tự xuất hiện. Nếu có chu trình ⟹ \`""\`.

\`\`\`go
func alienOrder(words []string) string {
	adj := map[byte]map[byte]bool{}
	inDeg := map[byte]int{}
	// khởi tạo mọi ký tự xuất hiện với in-degree 0
	for _, w := range words {
		for i := 0; i < len(w); i++ {
			if _, ok := inDeg[w[i]]; !ok {
				inDeg[w[i]] = 0
				adj[w[i]] = map[byte]bool{}
			}
		}
	}
	// xây cạnh từ các cặp liền kề
	for i := 0; i+1 < len(words); i++ {
		a, b := words[i], words[i+1]
		minLen := len(a)
		if len(b) < minLen {
			minLen = len(b)
		}
		j := 0
		for ; j < minLen; j++ {
			if a[j] != b[j] {
				if !adj[a[j]][b[j]] {
					adj[a[j]][b[j]] = true
					inDeg[b[j]]++
				}
				break
			}
		}
		// "abc" trước "ab" -> invalid
		if j == minLen && len(a) > len(b) {
			return ""
		}
	}
	// Kahn topo
	queue := []byte{}
	for c := range inDeg {
		if inDeg[c] == 0 {
			queue = append(queue, c)
		}
	}
	res := []byte{}
	for len(queue) > 0 {
		u := queue[0]
		queue = queue[1:]
		res = append(res, u)
		for w := range adj[u] {
			inDeg[w]--
			if inDeg[w] == 0 {
				queue = append(queue, w)
			}
		}
	}
	if len(res) != len(inDeg) {
		return "" // chu trình
	}
	return string(res)
}
\`\`\`

**Độ phức tạp:** Gọi $N$ = tổng độ dài các từ, $C$ = số ký tự phân biệt ($\\leq 26$). Xây graph **$O(N)$**, topo **$O(C + \\text{cạnh}) = O(C^2)$** tối đa. Tổng **$O(N + C^2)$** $\\approx O(N)$.

---

### Bài 4 — Lexicographically smallest topo order

**Cách tiếp cận:** Kahn với **min-heap** thay queue (xem mục 7.1). Khi nhiều đỉnh in-degree 0, luôn lấy đỉnh nhỏ nhất.

\`\`\`go
func smallestTopo(n int, adj [][]int) []int {
	inDeg := make([]int, n)
	for u := 0; u < n; u++ {
		for _, w := range adj[u] {
			inDeg[w]++
		}
	}
	h := &minHeap{} // minHeap như mục 7.1
	heap.Init(h)
	for v := 0; v < n; v++ {
		if inDeg[v] == 0 {
			heap.Push(h, v)
		}
	}
	order := make([]int, 0, n)
	for h.Len() > 0 {
		u := heap.Pop(h).(int)
		order = append(order, u)
		for _, w := range adj[u] {
			inDeg[w]--
			if inDeg[w] == 0 {
				heap.Push(h, w)
			}
		}
	}
	if len(order) != n {
		return nil // chu trình
	}
	return order
}
\`\`\`

**Độ phức tạp:** **$O(V \\log V + E)$** — mỗi push/pop heap tốn $\\log V$.

---

### Bài 5 — Longest path in DAG

**Cách tiếp cận:** Topo sort rồi DP một lượt: \`dist[v] = max(dist[u] + w)\` cho mọi \`u → v\`, xử lý theo topo order (xem mục 9.1). Đầy đủ code ở mục 9.1.

**Tóm tắt code (phần cốt lõi):**
\`\`\`go
order, _ := kahnTopo(n, plain) // plain = đồ thị bỏ trọng số
dist[src] = 0 // còn lại = -inf
for _, u := range order {
	if dist[u] == NEG { continue }
	for _, e := range adj[u] {
		if dist[u]+e.w > dist[e.to] {
			dist[e.to] = dist[u] + e.w
		}
	}
}
\`\`\`

**Độ phức tạp:** **$O(V + E)$** — topo sort $O(V+E)$ + DP duyệt mỗi cạnh 1 lần. Lưu ý: cách này CHỈ đúng trên DAG; trên đồ thị có chu trình longest simple path là NP-hard.

---

### Bài 6 — Detect cycle in directed graph

**Cách tiếp cận:** DFS 3 màu. Gặp đỉnh **gray** ⟹ back edge ⟹ chu trình (xem mục 5-6).

\`\`\`go
func hasCycleDirected(n int, adj [][]int) bool {
	color := make([]int, n) // 0=white,1=gray,2=black
	var dfs func(u int) bool
	dfs = func(u int) bool {
		color[u] = 1 // gray
		for _, w := range adj[u] {
			if color[w] == 1 {
				return true // back edge -> chu trình
			}
			if color[w] == 0 && dfs(w) {
				return true
			}
		}
		color[u] = 2 // black
		return false
	}
	for v := 0; v < n; v++ {
		if color[v] == 0 && dfs(v) {
			return true
		}
	}
	return false
}
\`\`\`

**Độ phức tạp:** **$O(V + E)$** thời gian, $O(V)$ bộ nhớ (mảng màu + stack đệ quy).

*Cách khác:* Kahn — nếu \`len(order) < V\` thì có chu trình, cũng $O(V+E)$.

---

### Bài 7 — Parallel Courses (nâng cao)

**Cách tiếp cận:** Topo sort theo "lớp" (level / BFS layer). Mỗi học kỳ = một lớp BFS: lấy TẤT CẢ đỉnh in-degree 0 hiện tại cùng lúc (học song song), giảm in-degree neighbor, đếm số lớp. Nếu cuối cùng chưa học hết đỉnh ⟹ có chu trình ⟹ trả -1.

\`\`\`go
func minimumSemesters(n int, relations [][]int) int {
	adj := make([][]int, n+1)
	inDeg := make([]int, n+1)
	for _, r := range relations {
		a, b := r[0], r[1] // học a trước b
		adj[a] = append(adj[a], b)
		inDeg[b]++
	}
	queue := []int{}
	for v := 1; v <= n; v++ {
		if inDeg[v] == 0 {
			queue = append(queue, v)
		}
	}
	semesters, studied := 0, 0
	for len(queue) > 0 {
		semesters++          // mỗi vòng = 1 học kỳ
		next := []int{}
		for _, u := range queue { // xử lý CẢ lớp cùng lúc
			studied++
			for _, w := range adj[u] {
				inDeg[w]--
				if inDeg[w] == 0 {
					next = append(next, w)
				}
			}
		}
		queue = next
	}
	if studied != n {
		return -1 // có chu trình
	}
	return semesters
}
\`\`\`

**Walk-through:** \`n=3\`, \`relations=[[1,3],[2,3]]\`. Lớp 1: in-degree 0 = \`{1,2}\` (học song song) → semesters=1, giảm in-degree 3 về 0. Lớp 2: \`{3}\` → semesters=2. Tổng **2 học kỳ**.

**Độ phức tạp:** **$O(V + E)$** — vẫn là Kahn nhưng đếm theo lớp.

---

## Code & Minh họa

- **Visualization tương tác:** [visualization.html](./visualization.html) — 3 module:
  1. **Kahn animator** — DAG vẽ bằng SVG, animate in-degree, đỉnh in-degree 0 vào queue, giảm dần, kết xuất topo order từng bước.
  2. **DFS topo** — tô 3 màu (white/gray/black), push stack theo post-order, đảo ngược ra kết quả.
  3. **Cycle detection** — đồ thị có/không chu trình, highlight back edge khi gặp đỉnh gray.
- Code Go trong bài: tất cả inline ở các mục 3.4, 4.3, 7.1, 8.1, 9.1 và phần Lời giải — biên dịch được, chạy thử bằng cách copy vào file \`main.go\`.

## Bài tiếp theo

- **[Lesson 33 — Dijkstra](../lesson-33-dijkstra/)** — đường đi ngắn nhất từ một nguồn trên đồ thị trọng số KHÔNG âm. Topo sort là tiền đề cho "shortest path on DAG" (một biến thể của longest path mục 9, đổi max → min).
- **Lesson 34 — Bellman-Ford & Floyd-Warshall** — shortest path với trọng số âm, phát hiện chu trình âm.
- Liên hệ ngược: [Lesson 31 — Duyệt đồ thị](../lesson-31-graph-traversal/) (BFS/DFS nền tảng), [Lesson 23 — DP](../lesson-23-dp-fundamentals/) (longest path = topo + DP).
`;
