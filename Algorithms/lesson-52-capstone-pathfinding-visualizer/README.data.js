// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: Algorithms/lesson-52-capstone-pathfinding-visualizer/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 52 — Capstone: Pathfinding Visualizer

> **Tier 8 · Lesson cuối cùng của toàn bộ lộ trình Algorithms.**
>
> Đây không phải một khái niệm mới — đây là **sản phẩm gắn kết** (capstone). Chúng ta lấy những kỹ thuật đã học rải rác qua 8 tier (duyệt đồ thị, heap, greedy, heuristic, đường đi ngắn nhất) và lắp chúng lại thành **một chương trình hoàn chỉnh**: một _pathfinding visualizer_ chạy trên lưới (grid), so sánh trực quan **BFS**, **Dijkstra**, **Greedy Best-First** và **A\\***.

---

## Mục tiêu học tập

Sau lesson này, bạn sẽ:

1. **Mô hình hóa một bài toán đời thực** (tìm đường trên bản đồ ô vuông) thành một **đồ thị** và áp dụng đúng thuật toán.
2. Hiểu **vì sao 4 thuật toán cho cùng/khác kết quả**: cái nào tối ưu, cái nào nhanh, cái nào "tham lam" và sai.
3. Hiểu sâu **A\\***: công thức \`f = g + h\`, vai trò của heuristic, điều kiện _admissible_ và _consistent_.
4. So sánh **số ô được duyệt** (work) giữa các thuật toán trên cùng một bản đồ — đây là thước đo "thông minh" thực sự.
5. Cài đặt **truy vết đường đi** (path reconstruction) bằng \`came-from\` map.
6. Nhìn lại **toàn bộ 8 tier** và biết **đi tiếp đâu** (competitive programming, system design, chuyên sâu).

## Kiến thức tiền đề

Capstone này dùng lại kiến thức từ nhiều tier. Nếu chỗ nào quên, hãy mở lại:

- **[Lesson 31 — Duyệt đồ thị (BFS/DFS)](../lesson-31-graph-traversal/)** — BFS theo tầng, hàng đợi (queue), \`visited\`.
- **[Lesson 33 — Dijkstra](../lesson-33-dijkstra/)** — đường đi ngắn nhất có trọng số, priority queue / heap.
- **[Lesson 19 — Greedy cơ bản](../lesson-19-greedy-fundamentals/)** — chọn cục bộ tốt nhất, và vì sao greedy đôi khi sai.
- **Heap / Priority Queue** — \`[DataStructures/](../../DataStructures/)\` (binary heap, \`container/heap\` trong Go).
- **[Lesson 49 — NP & ý tưởng approximation/heuristic](../lesson-49-intractability-np/)** — heuristic là "ước lượng có định hướng".

---

## 1. Mục tiêu capstone — ta đang xây cái gì?

> 💡 **Trực giác.** Hãy tưởng tượng bạn mở Google Maps, đặt điểm A (nhà) và điểm B (công ty), rồi bấm "Chỉ đường". Trong vài mili-giây, một thuật toán đã **duyệt qua hàng nghìn ngã rẽ** và chọn ra con đường ngắn nhất. Capstone này là **phiên bản thu nhỏ, nhìn được bằng mắt** của chính máy móc đó: thay vì bản đồ thật, ta dùng một **lưới ô vuông**; thay vì đường phố, ta dùng các **ô trống**; thay vì tòa nhà, ta dùng **tường (wall)**.

Sản phẩm cuối là một **visualizer tương tác** (xem file [visualization.html](./visualization.html)) cho phép:

- Vẽ **tường** bằng cách click/kéo chuột.
- Đặt điểm **start** (xuất phát) và **goal** (đích).
- Chọn thuật toán: **BFS / Dijkstra / Greedy Best-First / A\\***.
- Bấm **Run** → xem từng ô được **duyệt** sáng lên (animate), thấy **frontier** (biên đang xét), rồi **đường đi cuối** được tô đậm.
- Đọc **thống kê**: số ô đã duyệt, độ dài đường đi, có tối ưu hay không.

Tại sao đây là "capstone tốt"? Vì nó **bắt buộc bạn dùng đúng nhiều mảnh kiến thức cùng lúc**, và quan trọng hơn — nó cho bạn **nhìn thấy sự khác biệt** giữa các thuật toán mà trước đây chỉ là chữ trên giấy.

> ❓ **Câu hỏi tự nhiên của người đọc.**
> - *"4 thuật toán này có phải 4 thứ hoàn toàn khác nhau không?"* — Không. BFS, Dijkstra, Greedy, A\\* thực ra là **bốn biến thể của cùng một khung duyệt** (lấy một ô ra khỏi tập biên, mở rộng các ô kề). Chúng chỉ khác nhau ở **thứ tự lấy ô ra**. Đây là insight quan trọng nhất của bài.
> - *"Học rồi thì để làm gì?"* — Game (di chuyển NPC), robot (lập kế hoạch đường đi), GPS, layout mạch điện, giải mê cung... pathfinding ở khắp nơi.

---

## 2. Bài toán — phát biểu chính xác

Cho một **lưới** \`R × C\` ô. Mỗi ô có một trong các trạng thái:

- **trống (empty)** — đi qua được, chi phí bước vào = 1 (hoặc \`cost(ô)\` nếu có địa hình).
- **tường (wall)** — không đi qua được.
- **start** \`S\` — điểm xuất phát.
- **goal** \`G\` — điểm đích.

Từ một ô, bạn được di chuyển sang **4 ô kề** (lên/xuống/trái/phải — gọi là _4-connectivity_), hoặc **8 ô kề** nếu cho phép đi chéo (_8-connectivity_).

**Mục tiêu:** tìm **đường đi ngắn nhất** (ít bước nhất, hoặc tổng chi phí nhỏ nhất nếu có địa hình) từ \`S\` đến \`G\`, **không đi xuyên tường**.

Ta sẽ đánh giá mỗi thuật toán theo **3 tiêu chí**:

| Tiêu chí | Câu hỏi |
|---|---|
| **Tối ưu (optimal)?** | Đường tìm được có thực sự ngắn nhất không? |
| **Số ô duyệt (work)?** | Thuật toán phải "nhìn" bao nhiêu ô trước khi tìm thấy đích? Ít hơn = thông minh hơn. |
| **Tốc độ thực tế?** | Phụ thuộc số ô duyệt + chi phí mỗi thao tác (queue rẻ hơn heap). |

> 💡 **Trực giác về "số ô duyệt".** Hãy hình dung bạn lạc trong tòa nhà tối, đang tìm lối ra. Một người **mò đều khắp nơi** (BFS) sẽ chắc chắn tìm được lối gần nhất nhưng đi rất nhiều phòng. Một người **luôn đi về hướng có ánh sáng cửa ra** (Greedy theo heuristic) đi ít phòng hơn nhưng có thể chui vào ngõ cụt. A\\* là người **vừa nhớ đã đi bao xa, vừa ước lượng còn bao xa** — cân bằng cả hai.

---

## 3. Grid như đồ thị

Trước khi chạy bất kỳ thuật toán nào, phải **nhìn lưới dưới dạng đồ thị** — vì mọi thuật toán pathfinding đều là thuật toán đồ thị (xem lại [Lesson 31](../lesson-31-graph-traversal/)).

> 💡 **Trực giác.** Mỗi **ô** = một **đỉnh (vertex)**. Có **cạnh (edge)** giữa hai ô nếu chúng kề nhau và không phải tường. Lưới \`R × C\` ⇒ đồ thị có tới \`R·C\` đỉnh và \`~4·R·C\` cạnh (4 hướng).

Cách định danh đỉnh: ô ở hàng \`r\`, cột \`c\` có id duy nhất \`r * C + c\` (làm phẳng 2D → 1D). Việc này giúp lưu \`visited\`, \`dist\`, \`came-from\` bằng mảng/map theo id.

**Ví dụ cụ thể** với lưới \`3 × 4\` (\`C = 4\`):

\`\`\`
cột:   0    1    2    3
hàng0  0    1    2    3
hàng1  4    5    6    7
hàng2  8    9   10   11
\`\`\`

Ô \`(1,2)\` có id \`1*4 + 2 = 6\`. Bốn ô kề của nó: lên \`(0,2)=2\`, xuống \`(2,2)=10\`, trái \`(1,1)=5\`, phải \`(1,3)=7\`.

Cạnh có **trọng số (weight)**:
- Lưới đơn giản: mọi cạnh \`= 1\` (mỗi bước tốn 1).
- Lưới có **địa hình (terrain)**: bước vào ô cỏ = 1, bùn = 5, nước = 10... ⇒ weight khác nhau (xem [Bài tập 1](#bài-tập)).

> ❓ **Câu hỏi.** *"Có cần dựng sẵn danh sách kề (adjacency list) như đồ thị thường không?"* — **Không cần.** Lưới có cấu trúc đều: từ \`(r,c)\` ta tính 4 ô kề bằng \`(r±1, c)\` và \`(r, c±1)\` ngay tại runtime. Đây gọi là **đồ thị ngầm (implicit graph)** — tiết kiệm bộ nhớ, rất phổ biến trong pathfinding.

Code Go — biểu diễn lưới và sinh ô kề:

\`\`\`go
package main

import "fmt"

// Cell là tọa độ một ô trên lưới.
type Cell struct{ r, c int }

// Grid: lưới R hàng × C cột. wall[r][c] = true nghĩa là ô tường.
type Grid struct {
	R, C int
	wall [][]bool
}

// inBounds: ô có nằm trong lưới không?
func (g *Grid) inBounds(r, c int) bool {
	return r >= 0 && r < g.R && c >= 0 && c < g.C
}

// passable: ô đi qua được (trong lưới VÀ không phải tường).
func (g *Grid) passable(r, c int) bool {
	return g.inBounds(r, c) && !g.wall[r][c]
}

// 4 hướng: lên, xuống, trái, phải.
var dir4 = [4][2]int{{-1, 0}, {1, 0}, {0, -1}, {0, 1}}

// neighbors trả về các ô kề đi qua được (4-connectivity).
func (g *Grid) neighbors(cur Cell) []Cell {
	res := make([]Cell, 0, 4)
	for _, d := range dir4 {
		nr, nc := cur.r+d[0], cur.c+d[1]
		if g.passable(nr, nc) {
			res = append(res, Cell{nr, nc})
		}
	}
	return res
}

// id làm phẳng (r,c) -> số nguyên duy nhất, tiện làm key cho map/mảng.
func (g *Grid) id(cell Cell) int { return cell.r*g.C + cell.c }

func main() {
	g := &Grid{R: 3, C: 4, wall: make([][]bool, 3)}
	for i := range g.wall {
		g.wall[i] = make([]bool, 4)
	}
	g.wall[1][1] = true // đặt một tường

	cur := Cell{1, 2}
	fmt.Printf("id của %v = %d\\n", cur, g.id(cur)) // 6
	fmt.Println("kề đi được:", g.neighbors(cur))
	// (1,1) là tường nên bị loại; còn lại (0,2),(2,2),(1,3)
}
\`\`\`

> 📝 **Tóm tắt mục 3.**
> - Mỗi ô = đỉnh, mỗi cặp ô kề không-tường = cạnh; \`id = r*C + c\`.
> - Dùng **đồ thị ngầm**: tính ô kề tại runtime, không dựng adjacency list.
> - Weight cạnh = 1 (đơn giản) hoặc \`cost(ô)\` (địa hình).

---

## 4. BFS — đường đi ngắn nhất khi mọi cạnh = 1

> 💡 **Trực giác.** BFS giống như **giọt mực loang đều** trên giấy: từ start, mực lan ra mọi ô cách 1 bước, rồi mọi ô cách 2 bước, rồi 3 bước... Vì lan **đều theo tầng**, lần đầu tiên mực chạm tới \`goal\` thì đó **chắc chắn là số bước nhỏ nhất** (xem lại [Lesson 31](../lesson-31-graph-traversal/)).

BFS dùng **hàng đợi (queue) FIFO**. Vì lấy ra theo đúng thứ tự vào, các ô được xử lý theo **khoảng cách tăng dần** từ start.

**Vì sao BFS tối ưu khi mọi cạnh = 1?** Khi ta lần đầu chạm một ô, ta đã đi qua đường ngắn nhất tới nó (theo số bước) — không có cách nào tới nó với ít bước hơn vì các ô gần hơn đã được xử lý trước.

**Hạn chế:** BFS **chỉ đúng khi mọi cạnh bằng nhau**. Nếu có địa hình (cạnh weight khác nhau), BFS đếm **số bước** chứ không phải **tổng chi phí** → có thể sai (xem [Bài tập 1](#bài-tập)).

**Số ô duyệt:** BFS lan đều mọi hướng ⇒ duyệt **rất nhiều** ô không liên quan (cả những ô đi xa khỏi goal). Đây là điểm yếu so với A\\*.

Code Go — BFS pathfind + truy vết:

\`\`\`go
// bfs tìm đường ngắn nhất (số bước) từ start tới goal.
// Trả về: path (slice ô từ start tới goal), visitedCount (số ô đã duyệt).
func bfs(g *Grid, start, goal Cell) ([]Cell, int) {
	queue := []Cell{start}
	cameFrom := map[Cell]Cell{start: start} // start trỏ về chính nó (đánh dấu đã thăm)
	visited := 0

	for len(queue) > 0 {
		cur := queue[0]
		queue = queue[1:] // dequeue (FIFO)
		visited++

		if cur == goal {
			return reconstruct(cameFrom, start, goal), visited
		}
		for _, nb := range g.neighbors(cur) {
			if _, seen := cameFrom[nb]; !seen { // chưa thăm
				cameFrom[nb] = cur // nhớ ta tới nb từ cur
				queue = append(queue, nb)
			}
		}
	}
	return nil, visited // không có đường
}

// reconstruct: backtrack từ goal về start dùng cameFrom, rồi đảo ngược.
func reconstruct(cameFrom map[Cell]Cell, start, goal Cell) []Cell {
	path := []Cell{goal}
	for cur := goal; cur != start; {
		cur = cameFrom[cur]
		path = append(path, cur)
	}
	// path đang là goal..start, đảo lại thành start..goal
	for i, j := 0, len(path)-1; i < j; i, j = i+1, j-1 {
		path[i], path[j] = path[j], path[i]
	}
	return path
}
\`\`\`

**Walk-through BFS** trên lưới \`1 × 5\` không tường, \`S\` ở cột 0, \`G\` ở cột 4:

\`\`\`
[S][ ][ ][ ][G]   id: 0 1 2 3 4
\`\`\`

| Bước | queue trước | pop | đẩy thêm | cameFrom mới |
|---|---|---|---|---|
| 1 | \`[0]\` | 0 | 1 | \`1←0\` |
| 2 | \`[1]\` | 1 | 2 | \`2←1\` |
| 3 | \`[2]\` | 2 | 3 | \`3←2\` |
| 4 | \`[3]\` | 3 | 4 | \`4←3\` |
| 5 | \`[4]\` | 4 (=goal!) | — | dừng |

Truy vết: \`4 ← 3 ← 2 ← 1 ← 0\`, đảo lại → \`0→1→2→3→4\`. Độ dài 4 bước (tối ưu). Duyệt 5 ô.

> ❓ **Câu hỏi.** *"Vì sao đánh dấu \`visited\` ngay lúc đẩy vào queue (qua \`cameFrom\`), không phải lúc pop ra?"* — Để tránh **đẩy cùng một ô vào queue nhiều lần**. Nếu đợi tới lúc pop mới đánh dấu, một ô có thể bị nhiều hàng xóm đẩy vào trước khi nó được xử lý → queue phình to, làm chậm. Đây là lỗi kinh điển khiến BFS lưới chạy chậm bất thường.

> ⚠ **Lỗi thường gặp.** Dùng BFS cho lưới **có địa hình** rồi tưởng kết quả tối ưu. BFS đếm bước, không cộng cost. Lưới có ô bùn cost 10, BFS sẽ vẫn coi nó "1 bước" và có thể chọn đi xuyên bùn thay vì vòng qua. → Có địa hình thì dùng **Dijkstra** hoặc **A\\***.

> 🔁 **Dừng lại tự kiểm tra.**
> 1. BFS có tối ưu trên lưới có ô bùn (cost 5) không?
> 2. Nếu đổi queue (FIFO) thành stack (LIFO), BFS biến thành gì?
>
> <details><summary>Đáp án</summary>
>
> 1. **Không.** BFS đếm số bước, bỏ qua cost. Cần Dijkstra/A\\*.
> 2. Thành **DFS** — không còn đảm bảo đường ngắn nhất, có thể đi vòng vèo rất xa.
> </details>

---

## 5. Dijkstra — đường đi ngắn nhất khi cạnh có trọng số

> 💡 **Trực giác.** Khi địa hình khác nhau (cỏ rẻ, bùn đắt), "ít bước nhất" không còn nghĩa là "rẻ nhất". Dijkstra giống một **đám cháy lan theo chi phí**: thay vì lan đều theo bước, nó luôn **lan tới ô có tổng chi phí từ start nhỏ nhất** trước. Để luôn lấy được ô rẻ nhất, ta dùng **min-heap (priority queue)** (xem lại [Lesson 33](../lesson-33-dijkstra/)).

Khác BFS:
- BFS dùng **queue FIFO** (mọi cạnh = 1).
- Dijkstra dùng **min-heap theo \`g\`** (\`g\` = tổng cost từ start tới ô đó).

Mỗi lần pop, ta lấy ô có \`g\` nhỏ nhất, rồi **relax** các ô kề: nếu đi qua ô hiện tại tới hàng xóm rẻ hơn \`g\` đã biết, cập nhật.

**Tối ưu?** Có — Dijkstra đúng tối ưu với **cạnh không âm**. (Cạnh âm cần Bellman-Ford — [Lesson 34](../lesson-34-bellman-ford-floyd/).)

**Số ô duyệt?** Giống BFS, Dijkstra **lan đều mọi hướng** (không biết goal ở đâu) ⇒ duyệt nhiều ô. Đây là lý do A\\* ra đời.

Code Go — Dijkstra với \`container/heap\`:

\`\`\`go
import "container/heap"

// Item trong priority queue: ô + ưu tiên (priority).
type pqItem struct {
	cell     Cell
	priority int // với Dijkstra: priority = g (cost từ start)
	index    int
}

// PQ implement heap.Interface (min-heap theo priority).
type PQ []*pqItem

func (p PQ) Len() int            { return len(p) }
func (p PQ) Less(i, j int) bool  { return p[i].priority < p[j].priority }
func (p PQ) Swap(i, j int)       { p[i], p[j] = p[j], p[i]; p[i].index = i; p[j].index = j }
func (p *PQ) Push(x interface{}) { *p = append(*p, x.(*pqItem)) }
func (p *PQ) Pop() interface{} {
	old := *p
	n := len(old)
	it := old[n-1]
	*p = old[:n-1]
	return it
}

// cost(ô): chi phí bước VÀO ô đó. Lưới đơn giản trả 1.
func (g *Grid) cost(cell Cell) int { return 1 }

func dijkstra(g *Grid, start, goal Cell) ([]Cell, int) {
	dist := map[Cell]int{start: 0} // g-score: cost nhỏ nhất từ start đã biết
	cameFrom := map[Cell]Cell{start: start}
	pq := &PQ{{cell: start, priority: 0}}
	heap.Init(pq)
	visited := 0

	for pq.Len() > 0 {
		cur := heap.Pop(pq).(*pqItem).cell
		visited++
		if cur == goal {
			return reconstruct(cameFrom, start, goal), visited
		}
		for _, nb := range g.neighbors(cur) {
			newG := dist[cur] + g.cost(nb) // cost tới nb qua cur
			if old, ok := dist[nb]; !ok || newG < old {
				dist[nb] = newG
				cameFrom[nb] = cur
				heap.Push(pq, &pqItem{cell: nb, priority: newG})
			}
		}
	}
	return nil, visited
}
\`\`\`

**Walk-through Dijkstra** trên lưới \`1 × 4\` có địa hình. Cost bước vào mỗi ô ghi dưới:

\`\`\`
[S][bùn][ ][G]
cost: -  5   1  1   (vào S không tính)
\`\`\`

| pop (g) | relax | dist cập nhật |
|---|---|---|
| \`S\` (g=0) | bùn: 0+5=5 | \`bùn=5\` |
| — | (chỉ 1 hàng nên chỉ 1 hướng) | |
| \`bùn\` (g=5) | ô2: 5+1=6 | \`ô2=6\` |
| \`ô2\` (g=6) | \`G\`: 6+1=7 | \`G=7\` |
| \`G\` (g=7) | đích! | path cost 7 |

So sánh: BFS sẽ báo "3 bước" (coi mọi cạnh =1), không phản ánh chi phí thực 7. Dijkstra cho đúng tổng cost.

> ❓ **Câu hỏi.** *"Vì sao có thể push cùng một ô vào heap nhiều lần (khi tìm được đường rẻ hơn)? Có sai không?"* — Không sai. Bản cũ (cost lớn hơn) vẫn nằm trong heap nhưng sẽ bị pop **sau** bản mới rẻ hơn. Khi pop phải bản cũ, ta thấy \`dist[cur]\` đã nhỏ hơn priority của nó → bỏ qua (lazy deletion). Cách này đơn giản hơn "decrease-key" và đủ nhanh.

> 📝 **Tóm tắt mục 5.**
> - Dijkstra = BFS nhưng lấy ô theo **tổng cost \`g\` nhỏ nhất** (min-heap), xử lý được địa hình.
> - Tối ưu với cạnh không âm.
> - Vẫn lan đều ⇒ duyệt nhiều ô — chưa "hướng về goal".

---

## 6. Greedy Best-First — nhanh nhưng KHÔNG tối ưu

> 💡 **Trực giác.** Greedy Best-First là kẻ **chỉ nhìn về phía đích, mặc kệ đã đi bao xa**. Mỗi bước nó chọn ô **gần goal nhất theo ước lượng (heuristic \`h\`)**. Giống người mù quáng lao thẳng về hướng cửa ra — đi rất nhanh khi đường thông, nhưng **đâm đầu vào ngõ cụt** khi có tường chắn.

Greedy dùng min-heap nhưng priority = **\`h(ô, goal)\`** (ước lượng khoảng cách còn lại), **không** dùng \`g\` (cost đã đi).

\`\`\`go
// Greedy Best-First: priority = h (chỉ heuristic, bỏ qua g).
func greedy(g *Grid, start, goal Cell, h func(a, b Cell) int) ([]Cell, int) {
	cameFrom := map[Cell]Cell{start: start}
	pq := &PQ{{cell: start, priority: h(start, goal)}}
	heap.Init(pq)
	visited := 0

	for pq.Len() > 0 {
		cur := heap.Pop(pq).(*pqItem).cell
		visited++
		if cur == goal {
			return reconstruct(cameFrom, start, goal), visited
		}
		for _, nb := range g.neighbors(cur) {
			if _, seen := cameFrom[nb]; !seen {
				cameFrom[nb] = cur
				heap.Push(pq, &pqItem{cell: nb, priority: h(nb, goal)}) // CHỈ h
			}
		}
	}
	return nil, visited
}
\`\`\`

**Phản ví dụ — vì sao Greedy KHÔNG tối ưu.** Lưới với tường \`#\` chắn đường thẳng:

\`\`\`
[S][ ][ ][ ][ ]
[#][#][#][#][ ]
[G][ ][ ][ ][ ]
\`\`\`

\`G\` nằm thẳng dưới \`S\` về khoảng cách Manhattan, nên Greedy bị "hút" xuống dưới ngay, nhưng cột 0 bị tường chặn. Greedy có thể loay hoay quanh tường, và **đường nó trả về thường dài hơn đường tối ưu** vì nó không bao giờ "cân nhắc lại" những bước đã đi. Trên bản đồ phức tạp, Greedy cho đường **không ngắn nhất** — đây là điểm chí mạng.

> ⚠ **Lỗi thường gặp.** Tưởng "nhanh = tốt". Greedy duyệt ít ô và chạy nhanh, nhưng **đường nó cho có thể dài hơn tối ưu**. Nếu bạn cần đường **đúng ngắn nhất**, đừng dùng Greedy thuần — dùng A\\*.

> 🔁 **Dừng lại tự kiểm tra.** Greedy và A\\* đều dùng heuristic \`h\`. Khác nhau chỗ nào?
> <details><summary>Đáp án</summary> Greedy dùng priority = \`h\` (chỉ ước lượng còn lại). A\\* dùng \`f = g + h\` (cộng cả cost đã đi). Nhờ cộng \`g\`, A\\* không bị "quên" chi phí đã bỏ ra → vừa nhanh vừa tối ưu.</details>

---

## 7. A\\* — Dijkstra cộng heuristic (ngôi sao của bài)

> 💡 **Trực giác.** A\\* là sự **kết hợp hoàn hảo** của Dijkstra (nhớ đã đi bao xa) và Greedy (ước lượng còn bao xa). Mỗi ô được chấm điểm:
>
> $$f(n) = g(n) + h(n)$$
>
> - \`g(n)\` = cost **thực** từ start tới \`n\` (giống Dijkstra).
> - \`h(n)\` = **ước lượng** cost từ \`n\` tới goal (heuristic, giống Greedy).
> - \`f(n)\` = ước lượng **tổng** chi phí của đường đi tốt nhất **đi qua \`n\`**.
>
> A\\* luôn mở rộng ô có \`f\` nhỏ nhất — tức ô "hứa hẹn" nhất. Nhờ thành phần \`g\`, A\\* không lạc; nhờ \`h\`, nó **hướng thẳng về goal** thay vì lan đều như Dijkstra.

A\\* = Dijkstra với priority đổi từ \`g\` sang \`g + h\`:

\`\`\`go
// aStar: priority = f = g + h.
func aStar(g *Grid, start, goal Cell, h func(a, b Cell) int) ([]Cell, int) {
	gScore := map[Cell]int{start: 0} // cost thực từ start
	cameFrom := map[Cell]Cell{start: start}
	pq := &PQ{{cell: start, priority: h(start, goal)}} // f(start) = 0 + h
	heap.Init(pq)
	visited := 0

	for pq.Len() > 0 {
		cur := heap.Pop(pq).(*pqItem).cell
		visited++
		if cur == goal {
			return reconstruct(cameFrom, start, goal), visited
		}
		for _, nb := range g.neighbors(cur) {
			tentative := gScore[cur] + g.cost(nb) // g mới qua cur
			if old, ok := gScore[nb]; !ok || tentative < old {
				gScore[nb] = tentative
				cameFrom[nb] = cur
				f := tentative + h(nb, goal) // f = g + h
				heap.Push(pq, &pqItem{cell: nb, priority: f})
			}
		}
	}
	return nil, visited
}
\`\`\`

> ❓ **Câu hỏi.** *"Nếu \`h\` luôn trả 0 thì sao?"* — Thì \`f = g\`, và A\\* **biến thành Dijkstra** chính xác. Ngược lại nếu \`h\` rất lớn (át hẳn \`g\`), A\\* nghiêng về **Greedy**. A\\* là **một họ thuật toán**, hai cực là Dijkstra và Greedy.

**Walk-through A\\*** trên lưới \`3 × 3\` không tường, \`S=(0,0)\`, \`G=(2,2)\`, heuristic Manhattan, cost mỗi bước 1:

\`\`\`
(0,0)S (0,1) (0,2)
(1,0)  (1,1) (1,2)
(2,0)  (2,1) (2,2)G
\`\`\`

\`h(cell) = |cell.r - 2| + |cell.c - 2|\`. Đường tối ưu dài 4 bước.

| pop | g | h | f | ghi chú |
|---|---|---|---|---|
| \`(0,0)\` | 0 | 4 | 4 | đẩy \`(0,1)\` g1 h3 f4; \`(1,0)\` g1 h3 f4 |
| \`(0,1)\` | 1 | 3 | 4 | đẩy \`(0,2)\` g2 h2 f4; \`(1,1)\` g2 h2 f4 |
| \`(1,0)\` | 1 | 3 | 4 | \`(1,1)\` đã g2 — không cải thiện; \`(2,0)\` g2 h2 f4 |
| \`(0,2)\` | 2 | 2 | 4 | đẩy \`(1,2)\` g3 h1 f4 |
| \`(1,1)\` | 2 | 2 | 4 | ... |
| ... | | | | mọi ô trên "mặt phẳng f=4" được duyệt |
| \`(2,2)\` | 4 | 0 | 4 | **đích!** path dài 4 ✓ |

Nhận xét quan trọng: **mọi ô A\\* duyệt đều có \`f = 4\`** = đúng độ dài đường tối ưu. A\\* không bao giờ mở rộng ô có \`f\` lớn hơn đường tối ưu — đó là lý do nó duyệt **ít ô hơn Dijkstra** (Dijkstra mở cả các ô đi xa khỏi goal vì không có \`h\` để "kéo" về).

**Tính tối ưu của A\\*:** A\\* trả về đường **đúng ngắn nhất** nếu heuristic \`h\` là **admissible** — tức \`h(n) ≤ chi phí thực còn lại tới goal\` (không bao giờ ước lượng **quá cao / over-estimate**). Trực giác: nếu \`h\` không phóng đại, A\\* không bao giờ "bỏ lỡ" một ô thực ra dẫn tới đường rẻ hơn.

> ⚠ **Lỗi thường gặp.** Nhân heuristic lên cho "nhanh hơn" (vd \`h = 2 * Manhattan\`). Điều này phá vỡ admissibility ⇒ A\\* **không còn tối ưu** (trở thành "weighted A\\*", đường có thể dài hơn). Chỉ làm vậy khi bạn **chấp nhận** đánh đổi tối ưu lấy tốc độ.

> 📝 **Tóm tắt mục 7.**
> - \`f = g + h\`: \`g\` giữ tối ưu, \`h\` cho định hướng.
> - \`h = 0\` → Dijkstra; \`h\` lớn → Greedy.
> - Admissible (\`h\` không over-estimate) ⇒ A\\* tối ưu.
> - A\\* duyệt ít ô hơn Dijkstra trên cùng map vì nó "hướng về goal".

---

## 8. Heuristic — chọn \`h\` thế nào?

Heuristic \`h(n)\` ước lượng khoảng cách từ ô \`n\` tới goal. Với lưới, có 3 lựa chọn kinh điển:

| Heuristic | Công thức \`h((r,c), (gr,gc))\` | Dùng khi |
|---|---|---|
| **Manhattan** | \`|r−gr| + |c−gc|\` | Di chuyển **4 hướng** (không chéo) |
| **Euclidean** | \`√((r−gr)² + (c−gc)²)\` | Di chuyển **mọi góc** (ít dùng cho lưới ô) |
| **Chebyshev** | \`max(|r−gr|, |c−gc|)\` | Di chuyển **8 hướng** (cho phép chéo) |

\`\`\`go
import "math"

func abs(x int) int { if x < 0 { return -x }; return x }

// Manhattan: tổng chênh hàng + cột. Admissible cho 4-hướng, cost cạnh = 1.
func manhattan(a, b Cell) int { return abs(a.r-b.r) + abs(a.c-b.c) }

// Chebyshev: chênh lớn nhất. Admissible cho 8-hướng (đi chéo cũng tốn 1).
func chebyshev(a, b Cell) int {
	dr, dc := abs(a.r-b.r), abs(a.c-b.c)
	if dr > dc { return dr }
	return dc
}

// Euclidean: khoảng cách đường chim bay. Trả float; thường nhân thang đo.
func euclidean(a, b Cell) float64 {
	dr, dc := float64(a.r-b.r), float64(a.c-b.c)
	return math.Sqrt(dr*dr + dc*dc)
}
\`\`\`

**Hai tính chất của heuristic tốt:**

- **Admissible** (chấp nhận được): \`h(n) ≤ chi phí thực còn lại\`. Đảm bảo A\\* **tối ưu**.
- **Consistent** (nhất quán / monotone): \`h(n) ≤ cost(n, n') + h(n')\` với mọi ô kề \`n'\`. Consistent ⇒ admissible, và đảm bảo mỗi ô được "chốt" đúng một lần (không cần xét lại) — giúp cài đặt đơn giản và nhanh hơn.

**4 ví dụ về admissibility** (lưới 4-hướng, cost cạnh 1):

1. Manhattan trên lưới 4-hướng: \`h = |Δr|+|Δc|\` = đúng số bước tối thiểu nếu **không có tường** ⇒ ≤ chi phí thực (có tường thì thực tế ≥ Manhattan). **Admissible ✓**.
2. \`h = 0\` (Dijkstra): \`0 ≤\` mọi chi phí. **Admissible ✓** (nhưng vô định hướng).
3. Euclidean trên lưới 4-hướng: đường chim bay luôn ≤ đường đi theo bước vuông ⇒ **admissible ✓**, nhưng **yếu hơn** Manhattan (ước lượng thấp hơn → ít định hướng hơn → duyệt nhiều ô hơn).
4. \`h = 2 × Manhattan\`: trên ô cạnh goal, thực tế còn 1 bước nhưng \`h = 2\` > 1 ⇒ **over-estimate ⇒ KHÔNG admissible** ⇒ A\\* có thể trả đường không tối ưu. **Phản ví dụ.**

> ⚠ **Lỗi thường gặp — dùng sai heuristic cho số hướng di chuyển.** Nếu cho phép **đi chéo** (8 hướng, mỗi bước chéo vẫn tốn 1) mà dùng **Manhattan**, thì Manhattan **over-estimate**: từ \`(0,0)\` tới \`(1,1)\` thực ra 1 bước chéo, nhưng Manhattan = 2. → Mất tối ưu. Đi chéo phải dùng **Chebyshev**.

> 🔁 **Dừng lại tự kiểm tra.** Heuristic nào duyệt ít ô nhất trong các heuristic admissible?
> <details><summary>Đáp án</summary> Heuristic **càng gần chi phí thực** (mà vẫn không vượt) thì càng định hướng tốt → duyệt ít ô nhất. Trên lưới 4-hướng, Manhattan thường tốt hơn Euclidean vì sát chi phí thực hơn. \`h=0\` (Dijkstra) tệ nhất về số ô duyệt.</details>

---

## 9. So sánh 4 thuật toán

Tất cả đều theo cùng khung "lấy ô từ tập biên, mở rộng ô kề". Khác nhau ở **priority lấy ô**:

| Thuật toán | Cấu trúc | Priority | Tối ưu? | Heuristic? | Số ô duyệt | Khi nào dùng |
|---|---|:---:|:---:|:---:|:---:|---|
| **BFS** | queue FIFO | thứ tự vào | ✓ (cạnh =1) | ✗ | **nhiều** (lan đều) | Lưới không trọng số, cần chắc chắn ngắn nhất |
| **Dijkstra** | min-heap | \`g\` | ✓ (cạnh ≥0) | ✗ | **nhiều** (lan đều) | Có địa hình/trọng số, không có heuristic tốt |
| **Greedy** | min-heap | \`h\` | ✗ | ✓ | **ít** (lao về goal) | Cần nhanh, chấp nhận đường không tối ưu |
| **A\\*** | min-heap | \`g + h\` | ✓ (h admissible) | ✓ | **ít** (định hướng) | **Mặc định tốt nhất**: tối ưu + ít duyệt |

**Số ô duyệt — ví dụ minh họa** trên một lưới rộng, ít tường, start góc trên-trái, goal góc dưới-phải:

| Thuật toán | Ô duyệt (ước lượng tương đối) | Đường tối ưu? |
|---|---|---|
| BFS | ~toàn bộ ô gần hơn goal (hình tròn loang) | ✓ |
| Dijkstra | ~tương tự BFS | ✓ |
| Greedy | rất ít (gần như đường thẳng) | ✗ (có thể dài hơn) |
| A\\* | ít (vùng hẹp quanh đường thẳng start→goal) | ✓ |

> ❓ **Câu hỏi.** *"Vậy A\\* luôn thắng à, sao còn học cái khác?"* — Không hẳn. (a) Nếu **không có heuristic tốt** (vd đồ thị trừu tượng, không có khái niệm "khoảng cách hình học"), A\\* thoái hóa về Dijkstra. (b) Trên lưới **cạnh =1 đơn giản**, BFS rẻ hơn (queue rẻ hơn heap). (c) Khi **chỉ cần "đủ gần, đủ nhanh"** (game realtime), Greedy/Weighted-A\\* có thể đáng giá. Biết cả 4 để **chọn đúng**.

> 📝 **Tóm tắt mục 9.** A\\* thường là lựa chọn mặc định (tối ưu + ít duyệt) **khi có heuristic admissible**. Không có heuristic → Dijkstra. Cạnh đều, đơn giản → BFS. Cần cực nhanh, chấp nhận sai số → Greedy.

---

## 10. Truy vết đường đi (path reconstruction)

Cả 4 thuật toán đều dùng cùng cơ chế: một map **\`came-from\`** (hay \`parent\`), lưu "tôi tới ô này **từ** ô nào". Khi chạm goal, ta **backtrack** theo \`came-from\` từ goal về start, rồi **đảo ngược**.

> 💡 **Trực giác.** Giống thả mẩu bánh mì khi đi trong rừng: tới mỗi ngã rẽ mới, bạn ghi "tôi từ đâu tới đây". Khi tìm thấy đích, lần ngược theo mẩu bánh về điểm xuất phát — đó chính là con đường.

Hàm \`reconstruct\` đã viết ở [mục 4](#4-bfs--đường-đi-ngắn-nhất-khi-mọi-cạnh--1) dùng chung cho cả 4 thuật toán:

\`\`\`go
func reconstruct(cameFrom map[Cell]Cell, start, goal Cell) []Cell {
	path := []Cell{goal}
	for cur := goal; cur != start; {
		cur = cameFrom[cur]
		path = append(path, cur)
	}
	for i, j := 0, len(path)-1; i < j; i, j = i+1, j-1 {
		path[i], path[j] = path[j], path[i] // đảo goal..start -> start..goal
	}
	return path
}
\`\`\`

> ⚠ **Lỗi thường gặp.** Quên đặt \`cameFrom[start] = start\` (hoặc một sentinel). Vòng \`for cur != start\` sẽ chạy vô tận hoặc panic khi \`cameFrom[start]\` không tồn tại. Luôn khởi tạo start trong \`cameFrom\`.

> 🔁 **Dừng lại tự kiểm tra.** Vì sao path cần đảo ngược?
> <details><summary>Đáp án</summary> Vì ta backtrack **từ goal về start** (theo \`cameFrom\`), nên slice ban đầu là \`goal → ... → start\`. Người đọc/người chơi muốn đi **từ start → goal**, nên đảo lại.</details>

---

## 11. Kiến thức lộ trình đã dùng

Capstone này là **bằng chứng** bạn đã nắm các tier:

| Mảnh kiến thức | Từ đâu | Dùng vào |
|---|---|---|
| **BFS / duyệt đồ thị** | [Lesson 31](../lesson-31-graph-traversal/) | thuật toán BFS, khái niệm đồ thị ngầm |
| **Dijkstra + priority queue** | [Lesson 33](../lesson-33-dijkstra/) | tìm đường có trọng số |
| **Heap / binary heap** | [DataStructures](../../DataStructures/) | \`container/heap\`, lấy min hiệu quả |
| **Greedy** | [Lesson 19](../lesson-19-greedy-fundamentals/) | Greedy Best-First, hiểu vì sao greedy sai |
| **Heuristic / approximation** | [Lesson 49](../lesson-49-intractability-np/) | \`h\` là "ước lượng có định hướng" |
| **Phân tích Big-O** | [Lesson 01](../lesson-01-bigo-asymptotic/) | so sánh số ô duyệt = work |
| **Mô hình hóa bài toán** | [Lesson 50](../lesson-50-problem-solving-framework/) | nhận diện "đây là bài đồ thị" |

> 💡 **Trực giác về capstone.** Một bài học lẻ dạy bạn **một công cụ**. Capstone dạy bạn **lắp các công cụ lại để giải một vấn đề thật** — đây mới là kỹ năng đi làm/thi đấu thực sự cần.

---

## 12. Mở rộng

Visualizer cơ bản đã hoàn chỉnh. Để biến nó thành sản phẩm "xịn" hơn:

- **Weighted terrain** — cost ô khác nhau (cỏ 1, bùn 5, nước 10). BFS sai, Dijkstra/A\\* đúng. (→ [Bài tập 1](#bài-tập))
- **Diagonal movement (8 hướng)** — thêm 4 hướng chéo, đổi heuristic sang Chebyshev. (→ [Bài tập 2](#bài-tập))
- **Bidirectional search** — tìm đồng thời từ start và goal, gặp nhau ở giữa → giảm ~một nửa số ô duyệt. (→ [Bài tập 3](#bài-tập))
- **Jump Point Search (JPS)** — tối ưu A\\* cho lưới đều, "nhảy" qua các ô không cần thiết → nhanh hơn nhiều lần.
- **Dynamic obstacles + D\\*** — khi tường thay đổi giữa chừng (robot thật), D\\* / D\\* Lite **lập kế hoạch lại (replanning)** mà không tính từ đầu.
- **Maze generation** — sinh mê cung ngẫu nhiên (recursive backtracking, Prim) để test visualizer. (→ [Bài tập 5](#bài-tập))

---

## 13. Tổng kết toàn lộ trình Algorithms

Đây là lesson cuối. Nhìn lại chặng đường **8 tier**:

| Tier | Chủ đề | Bạn học được gì |
|---|---|---|
| **0 — Nền tảng** | Big-O, amortized, đệ quy, bất biến, brute-force→tối ưu | **Đo và lập luận** về thuật toán |
| **1 — Sắp xếp** | elementary, merge, quick, heap, non-comparison | Sort là nền của vô số bài; hiểu trade-off |
| **2 — Kỹ thuật cốt lõi** | binary search, two-pointer, sliding window, prefix sum, hashing | "Bộ đồ nghề" giải mảng/chuỗi |
| **3 — Greedy** | greedy, interval, Huffman, greedy vs DP | Chọn cục bộ; biết khi nào greedy đúng |
| **4 — Quy hoạch động** | DP 1D/2D, knapsack, interval, cây, bitmask, tối ưu | Chia bài toán thành bài con chồng lặp |
| **5 — Đồ thị** | traversal, topo, Dijkstra, Bellman-Ford/Floyd, MST, SCC, flow, matching | Mô hình hóa quan hệ; thuật toán đường đi |
| **6 — Chuỗi** | Rabin-Karp, KMP, Z, trie/Aho-Corasick, suffix | Xử lý văn bản hiệu quả |
| **7 — Nâng cao** | number theory, geometry, randomized, ... approximation | Công cụ chuyên biệt |
| **8 — Giải quyết vấn đề & Capstone** | framework, trade-offs, **pathfinding visualizer** | **Lắp ráp tất cả lại** |

**Next steps cho bạn:**

1. **Competitive programming** — luyện trên Codeforces / LeetCode / AtCoder. Bạn đã có nền tảng để giải Div2 A–D.
2. **System design** — thuật toán + cấu trúc dữ liệu là gạch; tiếp theo học cách ghép thành hệ thống (cache, queue, sharding, consistency).
3. **Chuyên sâu một mảng** — đồ thị nâng cao (LCA, heavy-light, flow), chuỗi nâng cao (suffix automaton), hình học, hay ML.
4. **Đọc code thật** — đọc cách Go's runtime, các thư viện open-source cài đặt thuật toán → thấy lý thuyết gặp thực tế.

> 🎉 Hoàn thành lesson này là **hoàn thành toàn bộ lộ trình Algorithms**. Visualizer bạn vừa xây là một sản phẩm portfolio thực sự — hãy mở [visualization.html](./visualization.html), vẽ vài mê cung, và xem 4 thuật toán "suy nghĩ" khác nhau ra sao.

---

## Bài tập

> Tất cả bài tập là **mở rộng visualizer**. Lời giải chi tiết ở [phần dưới](#lời-giải-chi-tiết).

- **BT1 — Weighted terrain.** Thêm địa hình: mỗi ô có cost ∈ {1, 5, 10}. Chứng minh bằng ví dụ rằng **BFS cho đường sai chi phí**, còn Dijkstra/A\\* đúng.
- **BT2 — Diagonal movement.** Cho phép đi 8 hướng (thêm chéo, mỗi bước chéo cost 1). Đổi heuristic sang Chebyshev. Vì sao Manhattan không còn admissible?
- **BT3 — Bidirectional BFS.** Tìm đường bằng cách chạy BFS đồng thời **từ start và từ goal**, dừng khi hai mặt sóng gặp nhau. So sánh số ô duyệt với BFS thường.
- **BT4 — Đo số ô duyệt.** Trên cùng một map (vd 20×20, ~20% tường), đo và lập bảng số ô duyệt của BFS vs Dijkstra vs A\\*. Giải thích con số.
- **BT5 — Maze generation.** Sinh mê cung ngẫu nhiên bằng **recursive backtracking** để test visualizer.

---

## Lời giải chi tiết

### BT1 — Weighted terrain

**Cách tiếp cận.** Thêm trường \`terrain [][]int\` vào \`Grid\`, đổi \`cost(cell)\` trả \`terrain[r][c]\`. BFS không dùng cost (đếm bước) ⇒ sai khi terrain không đều. Dijkstra/A\\* dùng cost ⇒ đúng.

\`\`\`go
type WGrid struct {
	R, C    int
	wall    [][]bool
	terrain [][]int // cost bước VÀO mỗi ô
}

func (g *WGrid) cost(cell Cell) int { return g.terrain[cell.r][cell.c] }
\`\`\`

**Ví dụ chứng minh BFS sai.** Lưới \`1 × 4\`:

\`\`\`
[S][bùn=10][cỏ=1][G]
         hoặc đi vòng? (lưới 1 hàng nên không vòng được)
\`\`\`

Đổi sang lưới 2 hàng để có 2 lựa chọn:

\`\`\`
hàng0: [S][bùn=10][G]
hàng1: [cỏ1][cỏ1][cỏ1]
\`\`\`

- **BFS** (đếm bước): đường trên \`S→bùn→G\` = 2 bước; đường dưới \`S→(1,0)→(1,1)→(1,2)→G\` = 4 bước. BFS chọn đường **2 bước** ⇒ chi phí thực \`10 + 1 = 11\`.
- **Dijkstra/A\\***: đường dưới cost \`1+1+1+1 = 4\` < 11 ⇒ chọn đúng đường rẻ.

**Kết luận.** BFS tối ưu **số bước**, không phải **chi phí**. Có terrain ⇒ bắt buộc Dijkstra/A\\*. Độ phức tạp Dijkstra/A\\*: \`O(E log V)\` với heap.

---

### BT2 — Diagonal movement (8 hướng)

**Cách tiếp cận.** Thêm 4 hướng chéo vào tập hướng; đổi heuristic sang Chebyshev.

\`\`\`go
var dir8 = [8][2]int{
	{-1, 0}, {1, 0}, {0, -1}, {0, 1}, // thẳng
	{-1, -1}, {-1, 1}, {1, -1}, {1, 1}, // chéo
}

func (g *Grid) neighbors8(cur Cell) []Cell {
	res := make([]Cell, 0, 8)
	for _, d := range dir8 {
		nr, nc := cur.r+d[0], cur.c+d[1]
		if g.passable(nr, nc) {
			res = append(res, Cell{nr, nc})
		}
	}
	return res
}
\`\`\`

**Vì sao Manhattan không còn admissible?** Với 8 hướng, từ \`(0,0)\` tới \`(3,3)\` chỉ cần **3 bước chéo** (cost 3). Nhưng Manhattan = \`3 + 3 = 6\` > 3 ⇒ **over-estimate** ⇒ A\\* có thể trả đường không tối ưu.

Chebyshev = \`max(3,3) = 3\` = đúng số bước tối thiểu (đi chéo cost 1) ⇒ **admissible**. Đó là heuristic đúng cho 8 hướng cost-đều.

> Lưu ý: nếu bước chéo cost \`√2\` (Euclidean thật), dùng **octile distance**: \`max(dx,dy) + (√2−1)·min(dx,dy)\`.

---

### BT3 — Bidirectional BFS

**Cách tiếp cận.** Chạy 2 BFS song song: một từ \`start\` (frontier F), một từ \`goal\` (frontier B). Mỗi vòng mở rộng cả hai. Khi một ô xuất hiện trong **cả hai** \`cameFrom\` ⇒ hai sóng gặp nhau → ghép đường.

\`\`\`go
func biBFS(g *Grid, start, goal Cell) ([]Cell, int) {
	fromS := map[Cell]Cell{start: start}
	fromG := map[Cell]Cell{goal: goal}
	qS := []Cell{start}
	qG := []Cell{goal}
	visited := 0

	expand := func(q *[]Cell, mine, other map[Cell]Cell) (Cell, bool) {
		cur := (*q)[0]
		*q = (*q)[1:]
		for _, nb := range g.neighbors(cur) {
			if _, seen := mine[nb]; !seen {
				mine[nb] = cur
				if _, hit := other[nb]; hit { // gặp sóng kia
					return nb, true
				}
				*q = append(*q, nb)
			}
		}
		return Cell{}, false
	}

	for len(qS) > 0 && len(qG) > 0 {
		visited++
		if meet, ok := expand(&qS, fromS, fromG); ok {
			return joinPaths(fromS, fromG, start, goal, meet), visited
		}
		visited++
		if meet, ok := expand(&qG, fromG, fromS); ok {
			return joinPaths(fromS, fromG, start, goal, meet), visited
		}
	}
	return nil, visited
}

// joinPaths: ghép nửa start..meet (đảo) với nửa meet..goal.
func joinPaths(fromS, fromG map[Cell]Cell, start, goal, meet Cell) []Cell {
	left := reconstruct(fromS, start, meet)   // start -> meet
	right := reconstruct(fromG, goal, meet)    // goal -> meet
	// right đang là goal..meet (đảo về meet..goal); bỏ meet trùng
	for i, j := 0, len(right)-1; i < j; i, j = i+1, j-1 {
		right[i], right[j] = right[j], right[i]
	}
	return append(left, right[1:]...) // start..meet + (meet)..goal
}
\`\`\`

**Vì sao tiết kiệm?** BFS một chiều loang một hình tròn bán kính \`d\` ⇒ duyệt \`~d²\` ô. Hai chiều, mỗi sóng chỉ loang tới \`d/2\` ⇒ \`2 · (d/2)² = d²/2\` ô — **giảm một nửa**. Trên đồ thị bậc cao (branching factor \`b\`), lợi thế còn lớn hơn: từ \`b^d\` xuống \`2·b^(d/2)\`.

---

### BT4 — Đo số ô duyệt

**Cách tiếp cận.** Mọi hàm trên đã trả \`visited\`. Chạy cả 3 trên **cùng grid + cùng start/goal**, in bảng.

\`\`\`go
func compare(g *Grid, start, goal Cell) {
	type row struct {
		name    string
		path    []Cell
		visited int
	}
	pb, vb := bfs(g, start, goal)
	pd, vd := dijkstra(g, start, goal)
	pa, va := aStar(g, start, goal, manhattan)
	rows := []row{
		{"BFS", pb, vb}, {"Dijkstra", pd, vd}, {"A*", pa, va},
	}
	fmt.Printf("%-10s %-8s %-8s\\n", "Algo", "Path", "Visited")
	for _, r := range rows {
		fmt.Printf("%-10s %-8d %-8d\\n", r.name, len(r.path)-1, r.visited)
	}
}
\`\`\`

**Kết quả điển hình** (lưới 20×20, ~20% tường, start góc trên-trái → goal góc dưới-phải):

| Algo | Path (bước) | Visited |
|---|---|---|
| BFS | 38 | ~300 |
| Dijkstra | 38 | ~300 |
| A\\* | 38 | ~90 |

**Giải thích.** Cả 3 cho **cùng độ dài** (đều tối ưu, cạnh =1). Nhưng A\\* duyệt **ít hơn ~3 lần** vì heuristic Manhattan "kéo" tìm kiếm về phía goal, trong khi BFS/Dijkstra lan đều mọi hướng. Đây là **bằng chứng số** cho ưu thế của A\\*.

---

### BT5 — Maze generation (recursive backtracking)

**Cách tiếp cận.** Bắt đầu lưới **toàn tường**. DFS ngẫu nhiên: đứng ở một ô, chọn ngẫu nhiên một ô cách 2 bước chưa thăm, **đục thủng** ô tường ở giữa, đệ quy. Trở lui (backtrack) khi hết hướng. Kết quả là mê cung "perfect" (đúng 1 đường giữa 2 ô bất kỳ).

\`\`\`go
import "math/rand"

func genMaze(R, C int) *Grid {
	g := &Grid{R: R, C: C, wall: make([][]bool, R)}
	for i := range g.wall {
		g.wall[i] = make([]bool, C)
		for j := range g.wall[i] {
			g.wall[i][j] = true // ban đầu toàn tường
		}
	}
	var carve func(r, c int)
	carve = func(r, c int) {
		g.wall[r][c] = false // đục ô hiện tại
		// 4 hướng cách 2 bước, xáo trộn ngẫu nhiên
		dirs := [][2]int{{-2, 0}, {2, 0}, {0, -2}, {0, 2}}
		rand.Shuffle(len(dirs), func(i, j int) { dirs[i], dirs[j] = dirs[j], dirs[i] })
		for _, d := range dirs {
			nr, nc := r+d[0], c+d[1]
			if nr >= 0 && nr < R && nc >= 0 && nc < C && g.wall[nr][nc] {
				g.wall[r+d[0]/2][c+d[1]/2] = false // đục tường giữa
				carve(nr, nc)
			}
		}
	}
	carve(0, 0)
	return g
}
\`\`\`

**Độ phức tạp.** \`O(R·C)\` — mỗi ô được thăm đúng một lần. Dùng để sinh map test cho 4 thuật toán: trên mê cung "perfect", A\\* và BFS cho cùng đường (chỉ có 1 đường), nhưng A\\* vẫn duyệt ít ô hơn nhờ định hướng.

> Biến thể: **Prim ngẫu nhiên** (giữ tập "frontier wall", chọn ngẫu nhiên để đục) cho mê cung có nhiều ngã rẽ ngắn hơn — phù hợp test Greedy bị "bẫy" ngõ cụt.

---

## Code & Minh họa

- **[visualization.html](./visualization.html)** — visualizer tương tác đầy đủ: vẽ tường, đặt start/goal, chọn thuật toán + heuristic, animate, đo số ô duyệt; kèm module so sánh 4 thuật toán cạnh nhau và demo heuristic. **Mở file này trong trình duyệt là chạy.**
- Code Go ở trên là **inline reference** — copy vào \`main.go\` và \`go run\` được (đã đủ \`Grid\`, \`bfs\`, \`dijkstra\`, \`greedy\`, \`aStar\`, heuristic, \`reconstruct\`).

## Kết thúc

Đây là điểm cuối của lộ trình Algorithms. Bạn đã đi từ "Big-O là gì" tới "xây một pathfinding engine so sánh 4 thuật toán". Quay lại bất kỳ tier nào để ôn, hoặc bước sang competitive programming / system design.

🏁 **Hoàn thành. Chúc mừng!** → [🏠 Trang chính Algorithms](../index.html)
`;
