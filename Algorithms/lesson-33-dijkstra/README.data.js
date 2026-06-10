// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: Algorithms/lesson-33-dijkstra/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 33 — Dijkstra (đường đi ngắn nhất, không cạnh âm)

> **Tier 5 · Bài 3** — Sau khi biết duyệt đồ thị (L31 BFS/DFS) và sắp xếp topo (L32), ta bước vào bài toán kinh điển nhất của đồ thị có trọng số: **đường đi ngắn nhất từ một nguồn (single-source shortest path)**. Dijkstra là thuật toán nền tảng cho GPS, định tuyến mạng, và là viên gạch đầu tiên trước Bellman-Ford (L34) và A* (capstone L52).

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Phát biểu chính xác **bài toán single-source shortest path** trên đồ thị trọng số **không âm**.
- Hiểu **vì sao BFS không đủ** khi cạnh có trọng số khác nhau, và Dijkstra sửa điều đó thế nào.
- Nắm **ý tưởng greedy** của Dijkstra và **vì sao nó đúng** (chỉ khi không có cạnh âm).
- Cài Dijkstra bằng **min-heap** (\`container/heap\` trong Go), đạt **$O((V+E) \\log V)$**.
- **Truy vết** đường đi ngắn nhất qua mảng \`prev[]\`.
- Hiểu **lazy deletion** — kỹ thuật bỏ qua entry cũ (stale) trong heap thay vì decrease-key.
- Biết **vì sao Dijkstra sai với cạnh âm** qua phản ví dụ cụ thể (→ Bellman-Ford L34).
- Áp dụng các biến thể: single-target (dừng sớm), A* (tease), Dijkstra trên grid (network delay, path with min effort, swim in rising water).
- Tránh các cạm bẫy: cạnh âm, quên skip stale entry, dùng \`visited\` sai cách, int overflow khi cộng ∞.

## Kiến thức tiền đề

- [Lesson 09 — Heap Sort](../lesson-09-heap-sort/) — cấu trúc min-heap / priority queue, nền tảng của Dijkstra.
- [Lesson 19 — Greedy Fundamentals](../lesson-19-greedy-fundamentals/) — tư duy tham lam, exchange argument.
- [Lesson 31 — Duyệt đồ thị (BFS/DFS)](../lesson-31-graph-traversal/) — biểu diễn đồ thị (adjacency list), BFS cho shortest path trên đồ thị **không trọng số**.
- [Lesson 32 — Sắp xếp Topo](../lesson-32-topological-sort/) — DAG shortest path (xử lý theo thứ tự topo).
- [DataStructures — Heap / Priority Queue](../../DataStructures/index.html) — min-heap chi tiết.

---

## 1. Bài toán: đường đi ngắn nhất từ một nguồn

> 💡 **Trực giác.** Hình dung bản đồ thành phố: mỗi ngã tư là một **đỉnh (vertex)**, mỗi con đường là một **cạnh (edge)** có **trọng số (weight)** = thời gian/khoảng cách đi qua. Đứng ở nhà (nguồn \`src\`), bạn muốn biết: *quãng đường ngắn nhất để tới mỗi ngã tư khác là bao nhiêu?* Đó chính là **single-source shortest path**.

**Phát biểu hình thức.** Cho đồ thị có hướng $G = (V, E)$, mỗi cạnh $(u \\to v)$ có trọng số $w(u, v) \\geq 0$. Cho một đỉnh nguồn \`src\`. Tìm \`dist[v]\` = tổng trọng số nhỏ nhất của một đường đi từ \`src\` tới \`v\`, cho **mọi** $v \\in V$. Nếu không tới được, $\\text{dist}[v] = \\infty$.

Điều kiện then chốt của bài này: **mọi trọng số không âm** ($w \\geq 0$). Đây là điều kiện sống còn để Dijkstra đúng — mục 7 sẽ giải thích vì sao.

**Ví dụ số cụ thể.** Đồ thị 5 đỉnh (0..4), nguồn \`src = 0\`:

\`\`\`
        4
   0 ───────► 1
   │ \\        │
 1 │  \\ 2     │ 1
   │   \\      ▼
   ▼    ►2 ──►3
   2    │  5  │
        │ 3   │ 1
        ▼     ▼
        ... (xem mục 4 cho đồ thị walk-through đầy đủ)
\`\`\`

Kết quả mong muốn (sẽ tính chi tiết ở mục 4): \`dist = [0, 3, 1, 4, ...]\` — tức từ 0 tới 1 ngắn nhất là 3 (đi 0→2→...→1 chứ không phải cạnh trực tiếp 0→1 = 4).

> ❓ **Câu hỏi tự nhiên của người đọc.**
> - *"Single-source nghĩa là gì?"* — Một **nguồn duy nhất** \`src\`, tìm khoảng cách tới **tất cả** đỉnh khác. Khác với **single-pair** (chỉ 1 đích) và **all-pairs** (mọi cặp — Floyd-Warshall, L34).
> - *"Đồ thị vô hướng thì sao?"* — Coi mỗi cạnh vô hướng \`u — v\` là hai cạnh có hướng \`u → v\` và \`v → u\` cùng trọng số. Dijkstra hoạt động y nguyên.
> - *"Nếu có nhiều đường ngắn nhất bằng nhau?"* — Dijkstra trả về một trong số đó. Muốn đếm số đường, cần biến thể (xem bài tập).

### 1.1 Ba dạng bài toán shortest path

| Dạng | Mô tả | Thuật toán điển hình |
|------|-------|----------------------|
| **Single-source** | 1 nguồn → mọi đỉnh | Dijkstra ($w \\geq 0$), Bellman-Ford (có cạnh âm) |
| **Single-pair** | 1 nguồn → 1 đích | Dijkstra dừng sớm, A* (có heuristic) |
| **All-pairs** | mọi cặp đỉnh | Floyd-Warshall (L34), Dijkstra ×V |

> 📝 **Tóm tắt mục 1.**
> - Shortest path = tổng trọng số nhỏ nhất của đường đi.
> - Dijkstra giải **single-source** trên đồ thị **trọng số không âm**.
> - $\\text{dist}[v] = \\infty$ nghĩa là không tới được.

---

## 2. Vì sao BFS không đủ cho đồ thị có trọng số?

> 💡 **Trực giác.** BFS lan tỏa theo "lớp" — lớp 0 là nguồn, lớp 1 là hàng xóm trực tiếp, lớp 2 là hàng xóm của hàng xóm... Số lớp = số **cạnh** trên đường đi. Điều này hoàn hảo khi **mọi cạnh dài bằng nhau** (= 1): đi qua ít cạnh nhất = ngắn nhất. Nhưng nếu cạnh có độ dài khác nhau, "ít cạnh" không còn nghĩa là "ngắn".

**Phản ví dụ cụ thể.** Đồ thị 3 đỉnh:

\`\`\`
   0 ─────10────► 2
   │              ▲
   1              │
   ▼      1       │
   1 ─────────────┘
\`\`\`

- Cạnh trực tiếp \`0 → 2\` trọng số **10** (1 cạnh).
- Đường vòng \`0 → 1 → 2\` trọng số **1 + 1 = 2** (2 cạnh).

BFS từ 0: lớp 1 gặp ngay đỉnh 2 qua cạnh trực tiếp → kết luận \`dist[2] = 10\` (sai!). Đường vòng qua nhiều cạnh hơn nhưng **ngắn hơn**: đáp án đúng là \`dist[2] = 2\`.

> ⚠ **Lỗi thường gặp.** "BFS luôn cho shortest path" — chỉ đúng trên đồ thị **không trọng số** (hoặc mọi cạnh = 1). Trên đồ thị trọng số, BFS đếm số cạnh, không phải tổng trọng số.

### 2.1 BFS = trường hợp đặc biệt của Dijkstra

Khi mọi cạnh = 1, đỉnh có \`dist\` nhỏ nhất luôn là đỉnh ở lớp BFS hiện tại → hàng đợi FIFO của BFS *tự nhiên* lấy đúng thứ tự \`dist\` tăng dần. Dijkstra tổng quát hóa: thay FIFO queue bằng **min-priority-queue** (luôn lấy đỉnh \`dist\` nhỏ nhất), nên xử lý được trọng số bất kỳ ≥ 0.

> ❓ **Câu hỏi tự nhiên.** *"Vậy có cách nào dùng BFS với trọng số không?"* — Có, nếu trọng số chỉ là **0 hoặc 1** thì dùng **0-1 BFS** (deque: cạnh 0 push front, cạnh 1 push back) đạt $O(V+E)$. Trọng số nhỏ bị chặn \`[0..k]\` thì có dial's algorithm. Trọng số tùy ý ≥ 0 → Dijkstra.

> 🔁 **Dừng lại tự kiểm tra.** Cho đồ thị: \`0→1 (w=5)\`, \`0→2 (w=1)\`, \`2→1 (w=1)\`. BFS nói \`dist[1] = ?\`, Dijkstra nói \`dist[1] = ?\`
> <details><summary>Đáp án</summary>
> BFS gặp 1 ngay ở lớp 1 → tưởng \`dist[1]=5\`. Dijkstra: \`0→2→1 = 1+1 = 2 < 5\` → \`dist[1]=2\`. Dijkstra đúng.
> </details>

> 📝 **Tóm tắt mục 2.**
> - BFS chỉ đúng cho đồ thị không trọng số (mọi cạnh = 1).
> - Trọng số khác nhau → "ít cạnh" ≠ "ngắn nhất".
> - Dijkstra = BFS với min-heap thay cho FIFO queue.

---

## 3. Ý tưởng greedy của Dijkstra

> 💡 **Trực giác — "vết dầu loang".** Tưởng tượng đổ nước từ nguồn \`src\`, nước lan ra với **tốc độ bằng nhau** trên mọi hướng. Thời điểm nước **chạm tới** một đỉnh lần đầu chính là khoảng cách ngắn nhất tới nó — vì nước luôn đi đường nhanh nhất. Dijkstra mô phỏng điều này: tại mỗi bước, "chốt" (finalize) đỉnh mà nước chạm tới sớm nhất trong số các đỉnh chưa chốt.

**Phát biểu greedy.** Duy trì:
- \`dist[v]\` = khoảng cách **tạm thời** ngắn nhất từ \`src\` tới \`v\` đã biết tới giờ.
- Tập \`finalized\` = các đỉnh đã chốt \`dist\` tối ưu.

Lặp: **chọn đỉnh \`u\` chưa finalize có \`dist[u]\` nhỏ nhất**, chốt nó (\`dist[u]\` đã tối ưu), rồi **relax** mọi cạnh ra từ \`u\`.

**Relax** một cạnh \`u → v\` trọng số \`w\`:
\`\`\`
nếu dist[u] + w < dist[v]:
    dist[v] = dist[u] + w     // tìm được đường ngắn hơn tới v qua u
    prev[v] = u               // ghi nhớ để truy vết
\`\`\`

### 3.1 Vì sao greedy đúng (không cạnh âm)?

**Bất biến (invariant).** Khi Dijkstra **pop** đỉnh \`u\` (chọn \`u\` có \`dist\` nhỏ nhất trong số chưa finalize), thì \`dist[u]\` lúc đó **đã là khoảng cách ngắn nhất thật sự**.

**Chứng minh từng bước (phản chứng).**
1. Giả sử ngược lại: khi pop \`u\`, tồn tại đường đi \`P\` từ \`src\` tới \`u\` ngắn hơn \`dist[u]\` hiện tại.
2. Đi dọc \`P\` từ \`src\` (đã finalize) ra ngoài. Gọi \`x\` là đỉnh **đầu tiên trên \`P\` chưa finalize**, và \`y\` là đỉnh ngay trước \`x\` trên \`P\` (\`y\` đã finalize).
3. Vì \`y\` đã finalize, \`dist[y]\` đã tối ưu. Cạnh \`y → x\` đã được relax khi \`y\` được chốt, nên \`dist[x] ≤ dist[y] + w(y,x)\` = độ dài đoạn đầu của \`P\` tới \`x\`.
4. Vì **mọi trọng số ≥ 0**, phần còn lại của \`P\` (từ \`x\` tới \`u\`) có độ dài **≥ 0**. Do đó \`độ dài(P) ≥ dist[x]\`.
5. Nhưng ta đang pop \`u\` (nhỏ nhất trong chưa-finalize), mà \`x\` cũng chưa finalize → \`dist[u] ≤ dist[x] ≤ độ dài(P)\`.
6. Mâu thuẫn với giả thiết "P ngắn hơn \`dist[u]\`". Vậy \`dist[u]\` đã tối ưu khi pop. ∎

> ⚠ **Lỗi thường gặp.** Bước 4 **bắt buộc** $w \\geq 0$. Nếu có cạnh âm, "phần còn lại của P ≥ 0" sai → toàn bộ chứng minh sụp. Đây chính là lý do Dijkstra **không** dùng được với cạnh âm (mục 7).

> ❓ **Câu hỏi tự nhiên.**
> - *"Tại sao chọn đỉnh nhỏ nhất chứ không phải đỉnh bất kỳ?"* — Vì đỉnh \`dist\` nhỏ nhất trong chưa-finalize **không thể** được cải thiện thêm (mọi đường khác tới nó phải qua một đỉnh chưa-finalize có \`dist\` ≥ nó, cộng thêm cạnh ≥ 0 → chỉ lớn hơn). Nên chốt nó là an toàn.
> - *"Greedy thường sai, sao đây lại đúng?"* — Vì có **exchange argument** (chứng minh trên) tận dụng tính không âm. Greedy đúng khi và chỉ khi có bằng chứng kiểu này (xem L19).

> 📝 **Tóm tắt mục 3.**
> - Greedy: luôn chốt đỉnh \`dist\` tạm nhỏ nhất chưa finalize.
> - Khi pop, \`dist[u]\` đã tối ưu (bất biến).
> - Chứng minh dựa vào **$w \\geq 0$** — cạnh âm phá vỡ nó.

---

## 4. Thuật toán với min-heap — walk-through đầy đủ

Dùng cấu trúc:
- \`dist[]\`: khởi tạo \`∞\`, \`dist[src] = 0\`.
- **min-heap** \`pq\` chứa các cặp \`(dist, node)\`, ưu tiên \`dist\` nhỏ.
- \`prev[]\`: truy vết.

Vòng lặp: pop \`(d, u)\` từ heap; nếu \`d > dist[u]\` thì bỏ qua (stale — mục 9); ngược lại relax mọi cạnh ra từ \`u\`, push các đỉnh được cải thiện.

### 4.1 Đồ thị walk-through

Đồ thị có hướng 6 đỉnh, nguồn \`src = 0\`:

\`\`\`
  cạnh (u → v, w):
  0→1 (4)   0→2 (1)
  2→1 (2)   2→3 (5)
  1→3 (1)
  3→4 (3)
  2→4 (8)
  4→5 (2)   3→5 (6)
\`\`\`

### 4.2 Bảng \`dist\` từng bước

Khởi tạo: \`dist = [0, ∞, ∞, ∞, ∞, ∞]\`, heap = \`{(0,0)}\`.

| Bước | Pop \`(d,u)\` | Hành động relax | \`dist\` sau bước | Heap sau bước (giản lược) | finalized |
|------|-------------|------------------|------------------|----------------------------|-----------|
| 1 | (0, **0**) | 0→1: 0+4=4 <∞ ✓; 0→2: 0+1=1 <∞ ✓ | \`[0,4,1,∞,∞,∞]\` | {(1,2),(4,1)} | {0} |
| 2 | (1, **2**) | 2→1: 1+2=3 <4 ✓; 2→3: 1+5=6 <∞ ✓; 2→4: 1+8=9 <∞ ✓ | \`[0,3,1,6,9,∞]\` | {(3,1),(4,1)stale,(6,3),(9,4)} | {0,2} |
| 3 | (3, **1**) | 1→3: 3+1=4 <6 ✓ | \`[0,3,1,4,9,∞]\` | {(4,1)stale,(4,3),(6,3)stale,(9,4)} | {0,2,1} |
| 4 | (4, 1) | **stale** (4 > dist[1]=3) → skip | (không đổi) | {(4,3),(6,3)stale,(9,4)} | {0,2,1} |
| 5 | (4, **3**) | 3→4: 4+3=7 <9 ✓; 3→5: 4+6=10 <∞ ✓ | \`[0,3,1,4,7,10]\` | {(6,3)stale,(7,4),(9,4)stale,(10,5)} | {0,2,1,3} |
| 6 | (6, 3) | **stale** (6 > dist[3]=4) → skip | (không đổi) | {(7,4),(9,4)stale,(10,5)} | {0,2,1,3} |
| 7 | (7, **4**) | 4→5: 7+2=9 <10 ✓ | \`[0,3,1,4,7,9]\` | {(9,4)stale,(9,5),(10,5)stale} | {0,2,1,3,4} |
| 8 | (9, 4) | **stale** (9 > dist[4]=7) → skip | (không đổi) | {(9,5),(10,5)stale} | (không đổi) |
| 9 | (9, **5**) | (không có cạnh ra) | (không đổi) | {(10,5)stale} | {0,2,1,3,4,5} |
| 10 | (10, 5) | **stale** → skip | (không đổi) | {} | xong |

**Kết quả:** \`dist = [0, 3, 1, 4, 7, 9]\`.

Đọc kỹ vài chỗ:
- Bước 2: đỉnh 1 ban đầu có \`dist=4\` (cạnh trực tiếp 0→1), nhưng đường vòng 0→2→1 = 1+2 = **3** ngắn hơn → cập nhật. Đây là điểm BFS sẽ sai.
- Đường ngắn nhất tới 5: \`0→2→1→3→4→5\` = 1+2+1+3+2 = **9**. Không phải \`0→2→3→5\` = 1+5+6 = 12, cũng không \`...→3→5\` = 4+6 = 10.

> ❓ **Câu hỏi tự nhiên.** *"Heap có tới mấy entry (4,1), (6,3) cũ — không xóa à?"* — Đúng, ta **không xóa** mà để lại rồi **bỏ qua khi pop** (lazy deletion, mục 9). Decrease-key đúng nghĩa cần heap hỗ trợ định vị phần tử, phức tạp hơn; lazy deletion đơn giản và thực tế nhanh tương đương.

### 4.3 Code Go — Dijkstra với \`container/heap\`

\`\`\`go
package main

import (
	"container/heap"
	"fmt"
)

// Cạnh: tới đỉnh to với trọng số w (không âm).
type Edge struct {
	to int
	w  int
}

// Item trong priority queue: (dist tạm, node).
type Item struct {
	dist int
	node int
}

// PQ là min-heap theo dist. Cài 5 method của heap.Interface.
type PQ []Item

func (p PQ) Len() int            { return len(p) }
func (p PQ) Less(i, j int) bool  { return p[i].dist < p[j].dist } // min-heap
func (p PQ) Swap(i, j int)       { p[i], p[j] = p[j], p[i] }
func (p *PQ) Push(x any)         { *p = append(*p, x.(Item)) }
func (p *PQ) Pop() any {
	old := *p
	n := len(old)
	it := old[n-1]
	*p = old[:n-1]
	return it
}

const INF = int(1e18) // ∞: đủ lớn nhưng KHÔNG dùng math.MaxInt (tránh overflow khi cộng w)

// dijkstra trả về dist[] từ src trên đồ thị adj (adjacency list).
func dijkstra(n int, adj [][]Edge, src int) []int {
	dist := make([]int, n)
	for i := range dist {
		dist[i] = INF
	}
	dist[src] = 0

	pq := &PQ{{dist: 0, node: src}}
	heap.Init(pq)

	for pq.Len() > 0 {
		cur := heap.Pop(pq).(Item)
		d, u := cur.dist, cur.node

		// LAZY DELETION: entry cũ (stale) — đã có đường tốt hơn rồi → bỏ qua.
		if d > dist[u] {
			continue
		}

		// Relax mọi cạnh ra từ u.
		for _, e := range adj[u] {
			nd := d + e.w // d == dist[u], an toàn vì u không stale
			if nd < dist[e.to] {
				dist[e.to] = nd
				heap.Push(pq, Item{dist: nd, node: e.to})
			}
		}
	}
	return dist
}

func main() {
	// Đồ thị 6 đỉnh ở mục 4.1.
	n := 6
	adj := make([][]Edge, n)
	add := func(u, v, w int) { adj[u] = append(adj[u], Edge{v, w}) }
	add(0, 1, 4); add(0, 2, 1)
	add(2, 1, 2); add(2, 3, 5); add(2, 4, 8)
	add(1, 3, 1)
	add(3, 4, 3); add(3, 5, 6)
	add(4, 5, 2)

	dist := dijkstra(n, adj, 0)
	fmt.Println(dist) // [0 3 1 4 7 9]  — khớp bảng walk-through
}
\`\`\`

> ⚠ **Lỗi thường gặp — int overflow.** Nếu khởi tạo \`INF = math.MaxInt64\` rồi tính \`dist[u] + e.w\` khi \`dist[u]\` còn \`∞\`, phép cộng **tràn số** thành âm → so sánh \`nd < dist[v]\` sai. Cách tránh: (a) chỉ relax khi \`dist[u] != INF\` (ở đây ta đã đảm bảo bằng skip-stale + chỉ push đỉnh hữu hạn), hoặc (b) dùng \`INF = 1e18\` để cộng thêm \`w\` vẫn không tràn \`int64\`.

> 📝 **Tóm tắt mục 4.**
> - \`dist=∞\`, \`dist[src]=0\`, heap = \`{(0,src)}\`.
> - Pop min, skip nếu stale, relax cạnh ra, push đỉnh cải thiện.
> - Khi pop một đỉnh không-stale → \`dist\` của nó đã tối ưu.

---

## 5. Truy vết đường đi (path reconstruction)

\`dist[v]\` cho ta **độ dài**; muốn biết **đường đi** cụ thể, lưu \`prev[v]\` = đỉnh ngay trước \`v\` trên đường ngắn nhất, cập nhật mỗi khi relax thành công.

Backtrack từ đích về nguồn rồi đảo ngược:

\`\`\`go
// dijkstraPath trả về dist[] và prev[]; prev[src] = -1.
func dijkstraPath(n int, adj [][]Edge, src int) ([]int, []int) {
	dist := make([]int, n)
	prev := make([]int, n)
	for i := range dist {
		dist[i] = INF
		prev[i] = -1
	}
	dist[src] = 0
	pq := &PQ{{0, src}}
	heap.Init(pq)

	for pq.Len() > 0 {
		cur := heap.Pop(pq).(Item)
		d, u := cur.dist, cur.node
		if d > dist[u] {
			continue
		}
		for _, e := range adj[u] {
			if d+e.w < dist[e.to] {
				dist[e.to] = d + e.w
				prev[e.to] = u // ghi đỉnh trước
				heap.Push(pq, Item{d + e.w, e.to})
			}
		}
	}
	return dist, prev
}

// reconstruct dựng lại đường src -> dst từ prev[]. Trả về nil nếu không tới được.
func reconstruct(prev []int, src, dst int) []int {
	if prev[dst] == -1 && dst != src {
		return nil // không tới được
	}
	var path []int
	for at := dst; at != -1; at = prev[at] {
		path = append(path, at)
	}
	// path đang là dst..src, đảo lại.
	for i, j := 0, len(path)-1; i < j; i, j = i+1, j-1 {
		path[i], path[j] = path[j], path[i]
	}
	return path
}
\`\`\`

**Walk-through \`prev[]\` cho đồ thị mục 4.1.** Sau khi chạy: \`prev = [-1, 2, 0, 1, 3, 4]\`.

Truy vết đường tới đỉnh 5: \`5 ← 4 ← 3 ← 1 ← 2 ← 0\`. Đảo lại: \`0 → 2 → 1 → 3 → 4 → 5\`, tổng \`= 9\`. ✓

> ❓ **Câu hỏi tự nhiên.** *"Nếu có hai đường ngắn nhất bằng nhau thì prev lưu cái nào?"* — Cái được relax **trước** (vì điều kiện \`<\` chặt, không cập nhật khi bằng). Muốn liệt kê mọi đường ngắn nhất, lưu \`prev\` là **danh sách** và relax cả khi \`==\`.

> 🔁 **Dừng lại tự kiểm tra.** Với \`prev = [-1, 2, 0, 1, 3, 4]\`, đường ngắn nhất tới đỉnh 3 là gì?
> <details><summary>Đáp án</summary>
> \`3 ← 1 ← 2 ← 0\` → đảo: \`0 → 2 → 1 → 3\`, độ dài \`1+2+1 = 4 = dist[3]\`. ✓
> </details>

> 📝 **Tóm tắt mục 5.**
> - \`prev[v]\` cập nhật cùng lúc với \`dist[v]\` khi relax.
> - Backtrack \`dst → ... → src\` qua \`prev\`, rồi đảo ngược.
> - \`prev[src] = -1\` đánh dấu nguồn / không tới được.

---

## 6. Độ phức tạp

Gọi $V = |\\text{đỉnh}|$, $E = |\\text{cạnh}|$.

| Cài đặt heap | Push/Pop | Decrease-key | Tổng |
|--------------|----------|--------------|------|
| **Binary heap** (\`container/heap\`) | $O(\\log V)$ | $O(\\log V)$ (qua lazy push) | **$O((V + E) \\log V)$** |
| **Fibonacci heap** (lý thuyết) | $O(\\log V)$ pop | $O(1)$ amortized | **$O(E + V \\log V)$** |
| Mảng / linear scan (no heap) | $O(V)$ tìm min | $O(1)$ | $O(V^2)$ — tốt khi đồ thị dày $E \\approx V^2$ |

**Phân tích binary heap.** Mỗi cạnh relax thành công → push 1 entry → tối đa $E$ lần push, mỗi lần $O(\\log V)$ (heap có $\\leq E$ phần tử). Mỗi entry pop ra 1 lần → $\\leq E$ pop, mỗi $O(\\log V)$. Cộng cả khởi tạo $V$ đỉnh: **$O((V + E) \\log V)$**.

> ❓ **Câu hỏi tự nhiên.**
> - *"Heap có thể to tới $E$ phần tử à? Sao không phải $V$?"* — Vì lazy deletion: ta push nhiều entry stale cho cùng đỉnh. Tổng push $\\leq E$. Một số tài liệu viết $O(E \\log V)$ coi $E \\geq V$ với đồ thị liên thông.
> - *"Fibonacci heap nhanh hơn sao không dùng?"* — Hằng số lớn, cài đặt phức tạp; trong thực tế binary heap thường nhanh hơn. Fibonacci heap chủ yếu là kết quả lý thuyết.
> - *"Khi nào dùng $O(V^2)$ array version?"* — Đồ thị **dày** ($E \\approx V^2$): $O(V^2) < O(V^2 \\log V)$. Ví dụ ma trận kề đầy đủ.

> 📝 **Tóm tắt mục 6.**
> - Binary heap: **$O((V+E) \\log V)$** — mặc định thực dụng.
> - Fibonacci heap: $O(E + V \\log V)$ — lý thuyết.
> - Array version: $O(V^2)$ — tốt cho đồ thị dày.

---

## 7. Vì sao KHÔNG dùng được với cạnh âm

> 💡 **Trực giác.** Dijkstra đặt cược rằng: "đỉnh đã chốt thì không bao giờ tốt hơn được nữa." Cược này dựa vào *mọi cạnh thêm vào chỉ làm đường dài ra ($w \\geq 0$)*. Cạnh âm phá vỡ: một đường vòng qua cạnh âm có thể **rút ngắn** đường tới đỉnh đã chốt → quyết định "chốt sớm" trở thành sai.

**Phản ví dụ cụ thể.** Đồ thị 3 đỉnh, \`src = 0\`:

\`\`\`
   0 ───1───► 1
   │          │
   4         -10
   │          │
   ▼          ▼
   2 ◄────────┘   (cạnh 1 → 2 trọng số -10)
\`\`\`

Cạnh: \`0→1 (1)\`, \`0→2 (4)\`, \`1→2 (-10)\`.

**Dijkstra chạy (SAI):**
1. Pop (0,0). Relax: \`dist[1]=1\`, \`dist[2]=4\`. Heap \`{(1,1),(4,2)}\`.
2. Pop (1,1) — nhỏ nhất. Relax \`1→2\`: \`1 + (-10) = -9 < 4\` → \`dist[2] = -9\`. Heap \`{(-9,2),(4,2)stale}\`.
3. Pop (-9,2). Chốt \`dist[2] = -9\`. ...

Khoan — ở ví dụ nhỏ này Dijkstra *tình cờ* ra đúng \`dist[2] = -9\` vì 2 chưa được chốt khi cập nhật. Cạm bẫy thực sự xuất hiện khi đỉnh bị **chốt trước** rồi mới có đường âm tới. Phản ví dụ chuẩn:

\`\`\`
   src = 0
   0→1 (5)
   0→2 (3)
   2→1 (-4)
\`\`\`

**Dijkstra (SAI):**
1. Pop (0,0). \`dist[1]=5\`, \`dist[2]=3\`. Heap \`{(3,2),(5,1)}\`.
2. Pop (3,**2**) — chốt \`dist[2]=3\`. Relax \`2→1\`: \`3 + (-4) = -1 < 5\` → \`dist[1] = -1\`. Heap \`{(-1,1),(5,1)stale}\`.
3. Pop (-1,1). Chốt \`dist[1] = -1\`. ✓ (ở đây vẫn đúng vì 1 chưa bị chốt)

Để Dijkstra *thật sự sai*, cần đỉnh đích bị chốt **trước** khi đường âm tới nó. Phản ví dụ kinh điển:

\`\`\`
   src = 0
   0→1 (1)        // 1 sẽ bị chốt rất sớm (dist nhỏ nhất)
   0→2 (2)
   2→1 (-2)       // nhưng đường 0→2→1 = 2 + (-2) = 0 < 1 — tốt hơn!
\`\`\`

**Dijkstra (SAI):**
1. Pop (0,0). \`dist[1]=1\`, \`dist[2]=2\`. Heap \`{(1,1),(2,2)}\`.
2. Pop (1,**1**) — chốt \`dist[1] = 1\` **ngay**. (Greedy tin rằng 1 đã tối ưu.) Đỉnh 1 không có cạnh ra.
3. Pop (2,**2**) — chốt \`dist[2]=2\`. Relax \`2→1\`: \`2 + (-2) = 0 < 1\` → muốn cập nhật \`dist[1] = 0\`, push \`(0,1)\`.
4. Pop (0,1) — nhưng \`0 < dist[1]\`? Nếu code chỉ skip khi \`d > dist[u]\` và đã coi 1 là "finalized không đụng lại"... Trong cài đặt lazy-deletion thuần, \`dist[1]\` *sẽ* bị sửa thành 0 → **tình cờ đúng**.

Mấu chốt: **cài đặt Dijkstra dùng mảng \`visited\` cứng (chốt là không bao giờ relax lại)** sẽ **bỏ qua** bước 3-4 → trả \`dist[1] = 1\` (SAI, đúng là 0). Cài đặt lazy-deletion thuần có thể "cứu" được vài ca nhưng **vẫn sai** khi cạnh âm tạo ra việc một đỉnh đã pop cần được relax lại — và quan trọng hơn, **không có gì đảm bảo đúng** + có thể chạy mũ số lần hoặc vòng lặp vô hạn với **chu trình âm**.

**Kết luận then chốt:** Dijkstra **không có bảo đảm đúng** với cạnh âm. Phải dùng:
- **Bellman-Ford** (L34): O(VE), xử lý cạnh âm, phát hiện chu trình âm.
- **Johnson's** / **SPFA** cho các ca đặc thù.

> ⚠ **Lỗi thường gặp.** "Cứ cộng một hằng lớn vào mọi cạnh cho hết âm rồi chạy Dijkstra." — **SAI**. Cộng hằng \`C\` vào mỗi cạnh làm đường đi **k cạnh** tăng \`k·C\`, thiên vị đường **ít cạnh** → đổi đáp án. (Reweighting đúng cần thế năng \`h(v)\` của Johnson, không phải hằng số.)

> 🔁 **Dừng lại tự kiểm tra.** Đồ thị \`0→1(1)\`, \`0→2(2)\`, \`2→1(-2)\`, \`src=0\`. Dijkstra-với-visited-cứng trả \`dist[1]=?\`, đáp án đúng là?
> <details><summary>Đáp án</summary>
> Dijkstra-visited chốt \`dist[1]=1\` (sai). Đúng: \`0→2→1 = 2-2 = 0\`. Dùng Bellman-Ford.
> </details>

> 📝 **Tóm tắt mục 7.**
> - Cạnh âm phá bất biến "đã chốt = tối ưu" → Dijkstra không bảo đảm đúng.
> - Cộng hằng cho hết âm là sai (thiên vị đường ít cạnh).
> - Có cạnh âm → Bellman-Ford (L34).

---

## 8. Các biến thể

### 8.1 Shortest path tới 1 đích — dừng sớm

Nếu chỉ cần \`dist[dst]\` (single-pair), **dừng ngay khi pop ra \`dst\`** — lúc đó \`dist[dst]\` đã tối ưu (bất biến mục 3):

\`\`\`go
for pq.Len() > 0 {
	cur := heap.Pop(pq).(Item)
	d, u := cur.dist, cur.node
	if d > dist[u] {
		continue
	}
	if u == dst { // ĐÍCH đã pop -> dist[dst] tối ưu, dừng
		return d
	}
	for _, e := range adj[u] { /* relax như cũ */ }
}
\`\`\`

Không cải thiện độ phức tạp worst-case nhưng thực tế nhanh hơn nhiều khi \`dst\` gần \`src\`.

### 8.2 A* — Dijkstra + heuristic (tease capstone L52)

A* mở rộng Dijkstra bằng cách ưu tiên theo $f(v) = \\text{dist}[v] + h(v)$, trong đó $h(v)$ là **ước lượng** khoảng cách còn lại từ \`v\` tới đích (heuristic). Nếu $h$ **admissible** (không bao giờ ước lượng quá thật, vd khoảng cách Euclid trên bản đồ), A* tìm đúng đường ngắn nhất nhưng **mở ít đỉnh hơn** → nhanh hơn. Khi $h \\equiv 0$, A* **chính là** Dijkstra. Học kỹ ở **capstone L52**.

### 8.3 Dijkstra trên grid

Lưới \`m × n\` là một đồ thị ngầm: mỗi ô là đỉnh, cạnh nối 4 hướng (lên/xuống/trái/phải). Trọng số cạnh tùy bài:

- **Network delay time** (LeetCode 743): tín hiệu lan từ nguồn \`k\`, \`dist[v]\` = thời gian tới \`v\`; đáp án = \`max(dist)\` (hoặc -1 nếu có đỉnh ∞). Đây là Dijkstra single-source chuẩn.
- **Path with minimum effort** (LeetCode 1631): "khoảng cách" của một đường = **max chênh lệch độ cao** giữa hai ô liền kề trên đường (không phải tổng). Dijkstra biến thể: relax bằng \`max(effort_so_far, |h[u]-h[v]|)\` thay cho cộng.
- **Swim in rising water** (LeetCode 778): chi phí đường = max độ cao ô trên đường; Dijkstra/\`max\` tương tự.

> 💡 **Trực giác chung.** Dijkstra không bắt buộc "cộng" trọng số — nó cần một phép **gộp đơn điệu** sao cho gộp thêm không làm chi phí giảm. Cộng (\`+\`, w≥0) và \`max\` đều thỏa → cả hai dùng Dijkstra được. (\`min\`/trừ thì không.)

> 📝 **Tóm tắt mục 8.**
> - Single-target: dừng khi pop đích.
> - A* = Dijkstra + heuristic admissible (L52).
> - Grid: ô = đỉnh; trọng số có thể là \`+w\` hoặc \`max(...)\` (effort, rising water).

---

## 9. Lazy deletion (bỏ qua entry cũ / stale)

> 💡 **Trực giác.** Khi tìm đường ngắn hơn tới \`v\`, ta **không xóa** entry \`v\` cũ trong heap (xóa giữa heap đắt) mà **push entry mới** với \`dist\` nhỏ hơn. Heap giờ có nhiều bản của \`v\`. Khi pop ra bản cũ (\`dist\` lớn hơn \`dist[v]\` hiện tại), ta biết nó **lỗi thời (stale)** → **bỏ qua**.

**Pattern Go:**
\`\`\`go
cur := heap.Pop(pq).(Item)
d, u := cur.dist, cur.node
if d > dist[u] {   // STALE: đã có đường tốt hơn -> đừng relax lại
	continue
}
// chỉ relax khi d == dist[u] (entry mới nhất, hợp lệ)
\`\`\`

Soi lại bảng mục 4.2: các bước 4, 6, 8, 10 đều là pop entry stale → skip. Đó là chuyện bình thường, không phải lỗi.

> ❓ **Câu hỏi tự nhiên.**
> - *"Heap phình to vì entry cũ không sao à?"* — Tổng entry ≤ E. Bộ nhớ O(E), không đổi big-O. Decrease-key đúng nghĩa cần index-map phức tạp; lazy deletion đơn giản, thực tế nhanh.
> - *"So sánh \`>=\` hay \`>\`?"* — Dùng \`>\` (chỉ skip khi **lớn hơn** thật sự). Nếu \`==\` thì entry hợp lệ (chính là bản mới nhất hoặc một bản trùng vô hại). Dùng \`>=\` cũng chạy đúng nhưng có thể skip nhầm một bản hợp lệ — vẫn an toàn vì còn bản khác, song nên dùng \`>\`.
> - *"Mỗi đỉnh có cần \`visited\` không?"* — **Không bắt buộc**. Check \`d > dist[u]\` đã đóng vai trò chốt. Một số người thêm mảng \`done[]\` để skip nhanh hơn (chốt đỉnh ngay khi pop hợp lệ); cũng đúng, miễn đừng nhầm với \`visited\` kiểu BFS.

> ⚠ **Lỗi thường gặp.** Quên dòng \`if d > dist[u] { continue }\` → vẫn ra đúng đáp án nhưng **chậm hơn** (relax lại từ entry stale, có thể tạo cascade push), tệ nhất gần O(VE) hoặc tệ hơn. Luôn giữ dòng skip-stale.

> 🔁 **Dừng lại tự kiểm tra.** Heap pop ra \`(7, 3)\` nhưng \`dist[3]\` hiện là \`4\`. Làm gì?
> <details><summary>Đáp án</summary>
> \`7 > 4\` → entry stale → \`continue\` (bỏ qua, không relax). Đường tốt hơn (dài 4) tới 3 đã được xử lý trước rồi.
> </details>

> 📝 **Tóm tắt mục 9.**
> - Không xóa entry cũ; push entry mới khi cải thiện.
> - Pop ra entry stale (\`d > dist[u]\`) → skip.
> - Heap ≤ E phần tử, không đổi big-O, đơn giản hơn decrease-key.

---

## 10. Ứng dụng thực tế

| Ứng dụng | Đỉnh / cạnh | Trọng số |
|----------|-------------|----------|
| **GPS routing** (Google Maps, ô tô) | ngã tư / đường | thời gian, khoảng cách (thường + A*) |
| **Định tuyến mạng OSPF** | router / link | chi phí link (băng thông nghịch đảo) |
| **Network delay time** | server / kết nối | độ trễ truyền tín hiệu |
| **Cheapest flights** | sân bay / chuyến bay | giá vé (có ràng buộc số chặng) |
| **Path with min effort** | ô lưới / cạnh kề | chênh lệch độ cao (max thay vì +) |
| **Trò chơi / pathfinding** | ô bản đồ / bước đi | chi phí địa hình |

**Ghi chú thực tế.** GPS thật không chạy Dijkstra thuần (đồ thị quá lớn) mà dùng A*, Contraction Hierarchies, ALT — nhưng tất cả đều **xây trên** Dijkstra. OSPF dùng Dijkstra để mỗi router tính cây đường ngắn nhất tới mọi router khác.

> 📝 **Tóm tắt mục 10.**
> - Dijkstra là lõi của GPS routing, OSPF, network delay, cheapest path.
> - Hệ thống lớn dùng biến thể (A*, CH) nhưng nền tảng vẫn là Dijkstra.

---

## 11. Cạm bẫy thường gặp

> ⚠ **Tổng hợp các bẫy** (rút từ các mục trên + thực chiến):

1. **Cạnh âm.** Dùng Dijkstra khi có $w < 0$ → **kết quả sai, không cảnh báo**. Luôn kiểm tra dữ liệu; có cạnh âm → Bellman-Ford (L34).
2. **Quên skip stale.** Thiếu \`if d > dist[u] { continue }\` → vẫn đúng nhưng có thể chậm thảm họa. Luôn giữ.
3. **Dùng \`visited\` sai cách.** Dijkstra **không** đánh dấu visited khi *push* (như BFS) mà chốt khi *pop hợp lệ*. Đánh dấu visited lúc push → bỏ sót cập nhật \`dist\` tốt hơn đến sau → sai. (BFS visited-on-enqueue đúng vì cạnh = 1; Dijkstra thì không.)
4. **Int overflow với ∞.** \`dist[u] + w\` khi \`dist[u] = math.MaxInt64\` → tràn âm. Dùng \`INF = 1e18\` hoặc chỉ relax khi \`dist[u] != INF\`.
5. **Quên \`prev[src] = -1\`.** Truy vết loop vô hạn nếu \`prev[src]\` trỏ lung tung.
6. **Đồ thị vô hướng quên thêm 2 chiều.** Cạnh vô hướng phải \`add(u,v,w)\` **và** \`add(v,u,w)\`.
7. **So sánh relax dùng \`<=\` thay vì \`<\`.** \`<=\` push thừa các entry bằng nhau → chậm; logic vẫn đúng nhưng phí. Dùng \`<\`.

> 🔁 **Dừng lại tự kiểm tra.** Vì sao không đánh dấu \`visited[v]=true\` ngay khi push \`v\` vào heap (như BFS)?
> <details><summary>Đáp án</summary>
> Vì sau đó có thể tìm được đường **ngắn hơn** tới \`v\` (qua đỉnh khác). BFS không gặp vì mọi cạnh = 1 nên lần chạm đầu đã là ngắn nhất. Dijkstra cập nhật \`dist[v]\` nhiều lần trước khi \`v\` được pop-và-chốt.
> </details>

> 📝 **Tóm tắt mục 11.**
> - Cạnh âm, quên skip-stale, visited sai cách, overflow ∞ — bốn bẫy hay gặp nhất.
> - Vô hướng nhớ thêm 2 chiều; relax dùng \`<\` không \`<=\`.

---

## Bài tập

> Làm thử trước khi xem lời giải. Mọi bài có lời giải chi tiết bên dưới.

1. **Network Delay Time** (LeetCode 743). Cho \`times[i] = (u, v, w)\` mạng \`n\` server (1..n), nguồn \`k\`. Tín hiệu lan từ \`k\`. Tìm thời gian **mọi** server nhận được; trả -1 nếu có server không nhận được. Big-O?
2. **Cheapest Flights Within K Stops** (LeetCode 787). \`n\` thành phố, chuyến bay \`(u, v, giá)\`, tìm vé rẻ nhất \`src → dst\` đi tối đa \`K\` chặng (≤ K+1 cạnh). Vì sao Dijkstra thuần **không** trực tiếp giải được, và biến thể nào giải?
3. **Path With Minimum Effort** (LeetCode 1631). Lưới độ cao \`m × n\`, đi từ góc trên-trái tới dưới-phải, 4 hướng. "Effort" của đường = **max** \`|cao[a]-cao[b]|\` qua các bước. Tìm effort nhỏ nhất. Big-O?
4. **Shortest path + truy vết.** Đồ thị trọng số không âm, in **đường đi** (dãy đỉnh) ngắn nhất từ \`src\` tới \`dst\`, không chỉ độ dài.
5. **Phản ví dụ cạnh âm.** Xây đồ thị nhỏ có cạnh âm (không có chu trình âm) mà Dijkstra-với-\`visited\` cho đáp án **sai**, chỉ rõ bước sai và đáp án đúng.
6. **Swim in Rising Water** (LeetCode 778). Lưới \`n × n\`, \`grid[i][j]\` = độ cao. Tại thời điểm \`t\`, nước cao \`t\`; đi được sang ô kề nếu cả hai ô ≤ \`t\`. Tìm \`t\` nhỏ nhất để từ (0,0) tới (n-1,n-1). Big-O?
7. **(Thêm) Số đường đi ngắn nhất.** Đếm số đường đi ngắn nhất phân biệt từ \`src\` tới mỗi đỉnh (modulo 1e9+7).

---

## Lời giải chi tiết

### Bài 1 — Network Delay Time

**Cách tiếp cận.** Dijkstra single-source chuẩn từ \`k\`. Đáp án = \`max(dist[i])\` với mọi \`i\`; nếu tồn tại \`dist[i] = ∞\` → trả -1.

\`\`\`go
func networkDelayTime(times [][]int, n, k int) int {
	adj := make([][]Edge, n+1) // server đánh số 1..n
	for _, t := range times {
		adj[t[0]] = append(adj[t[0]], Edge{t[1], t[2]})
	}
	dist := dijkstra(n+1, adj, k) // dùng dijkstra mục 4 (đỉnh 0 không dùng)

	ans := 0
	for i := 1; i <= n; i++ {
		if dist[i] == INF {
			return -1 // có server không nhận được
		}
		if dist[i] > ans {
			ans = dist[i]
		}
	}
	return ans
}
\`\`\`

**Walk-through.** \`times=[[2,1,1],[2,3,1],[3,4,1]], n=4, k=2\`. Dijkstra từ 2: \`dist[2]=0, dist[1]=1, dist[3]=1, dist[4]=2\`. Max = **2**. Mọi server nhận được → đáp án 2.

**Độ phức tạp.** $O((V+E) \\log V) = O((n + E) \\log n)$.

### Bài 2 — Cheapest Flights Within K Stops

**Vì sao Dijkstra thuần sai.** Dijkstra chốt mỗi đỉnh **một lần** theo \`dist\` nhỏ nhất. Nhưng đường **rẻ nhất tổng** có thể dùng **nhiều chặng hơn** giới hạn \`K\`, trong khi đường **dùng đúng ≤ K chặng** lại đắt hơn. Ràng buộc số chặng làm "trạng thái" không chỉ là đỉnh mà là \`(đỉnh, số chặng đã đi)\` → Dijkstra-theo-đỉnh chốt sai.

**Giải đúng — Bellman-Ford bị chặn K+1 vòng** (đơn giản, đúng):

\`\`\`go
func findCheapestPrice(n int, flights [][]int, src, dst, K int) int {
	const INF = int(1e18)
	dist := make([]int, n)
	for i := range dist {
		dist[i] = INF
	}
	dist[src] = 0
	// đi tối đa K+1 cạnh -> lặp K+1 vòng relax, dùng bản SAO của dist mỗi vòng.
	for i := 0; i <= K; i++ {
		tmp := make([]int, n)
		copy(tmp, dist)
		for _, f := range flights {
			u, v, w := f[0], f[1], f[2]
			if dist[u] != INF && dist[u]+w < tmp[v] {
				tmp[v] = dist[u] + w
			}
		}
		dist = tmp
	}
	if dist[dst] == INF {
		return -1
	}
	return dist[dst]
}
\`\`\`

**Vì sao \`tmp\` (bản sao)?** Để mỗi vòng \`i\` chỉ tính các đường dùng **đúng ≤ i+1 cạnh** — nếu cập nhật in-place sẽ vô tình dùng cạnh vừa relax trong cùng vòng → vượt giới hạn chặng.

**Biến thể Dijkstra đúng:** dùng trạng thái \`(chi phí, đỉnh, số_chặng)\` trong heap, chốt theo chi phí nhưng cho phép thăm lại đỉnh nếu số chặng ít hơn.

**Walk-through.** \`n=3, flights=[[0,1,100],[1,2,100],[0,2,500]], src=0,dst=2,K=0\`. K=0 → tối đa 1 cạnh. Vòng i=0: relax từ dist[0]=0 → \`tmp[1]=100, tmp[2]=500\`. dist[2]=500. (\`0→1→2\`=200 cần 2 cạnh > K+1=1 nên không được). Đáp án **500**.

**Độ phức tạp.** $O(K \\cdot E)$.

### Bài 3 — Path With Minimum Effort

**Cách tiếp cận.** Dijkstra biến thể với phép gộp \`max\` thay cho \`+\`. \`effort[v]\` = effort nhỏ nhất của một đường tới \`v\`. Relax cạnh \`u→v\`: \`cand = max(effort[u], |h[u]-h[v]|)\`; nếu \`cand < effort[v]\` thì cập nhật.

\`\`\`go
func minimumEffortPath(h [][]int) int {
	m, n := len(h), len(h[0])
	const INF = int(1e18)
	eff := make([][]int, m)
	for i := range eff {
		eff[i] = make([]int, n)
		for j := range eff[i] {
			eff[i][j] = INF
		}
	}
	eff[0][0] = 0
	// heap chứa (effort, hàng, cột); min-heap theo effort.
	pq := &GridPQ{{0, 0, 0}}
	heap.Init(pq)
	dirs := [4][2]int{{1, 0}, {-1, 0}, {0, 1}, {0, -1}}

	for pq.Len() > 0 {
		c := heap.Pop(pq).(Cell)
		if c.e > eff[c.r][c.c] { // stale
			continue
		}
		if c.r == m-1 && c.c == n-1 {
			return c.e // pop đích -> tối ưu
		}
		for _, d := range dirs {
			nr, nc := c.r+d[0], c.c+d[1]
			if nr < 0 || nr >= m || nc < 0 || nc >= n {
				continue
			}
			diff := h[c.r][c.c] - h[nr][nc]
			if diff < 0 {
				diff = -diff
			}
			cand := c.e
			if diff > cand {
				cand = diff // gộp bằng max
			}
			if cand < eff[nr][nc] {
				eff[nr][nc] = cand
				heap.Push(pq, Cell{cand, nr, nc})
			}
		}
	}
	return eff[m-1][n-1]
}

type Cell struct{ e, r, c int }
type GridPQ []Cell
func (p GridPQ) Len() int           { return len(p) }
func (p GridPQ) Less(i, j int) bool { return p[i].e < p[j].e }
func (p GridPQ) Swap(i, j int)      { p[i], p[j] = p[j], p[i] }
func (p *GridPQ) Push(x any)        { *p = append(*p, x.(Cell)) }
func (p *GridPQ) Pop() any {
	o := *p; k := len(o); it := o[k-1]; *p = o[:k-1]; return it
}
\`\`\`

**Vì sao Dijkstra dùng được với \`max\`?** \`max\` đơn điệu: gộp thêm một cạnh không bao giờ **giảm** effort → bất biến "pop = tối ưu" vẫn giữ (chứng minh mục 3 dùng \`max\` thay \`+\`, vẫn đúng vì \`max(a, x) ≥ a\`).

**Walk-through.** \`h=[[1,2,2],[3,8,2],[5,3,5]]\`. Đường \`1→2→2→2→5\` (đi phải rồi xuống) có chênh lệch tối đa = ... đáp án LeetCode = **2** (tránh ô 8). Dijkstra-max tìm đúng 2.

**Độ phức tạp.** $O(mn \\cdot \\log(mn))$.

### Bài 4 — Shortest path + truy vết

**Cách tiếp cận.** Dùng \`dijkstraPath\` + \`reconstruct\` ở mục 5.

\`\`\`go
func main() {
	n := 6
	adj := make([][]Edge, n)
	add := func(u, v, w int) { adj[u] = append(adj[u], Edge{v, w}) }
	add(0,1,4); add(0,2,1); add(2,1,2); add(2,3,5); add(2,4,8)
	add(1,3,1); add(3,4,3); add(3,5,6); add(4,5,2)

	dist, prev := dijkstraPath(n, adj, 0)
	path := reconstruct(prev, 0, 5)
	fmt.Println("dist:", dist[5], "path:", path) // dist: 9 path: [0 2 1 3 4 5]
}
\`\`\`

**Walk-through.** \`prev=[-1,2,0,1,3,4]\`. Backtrack 5←4←3←1←2←0, đảo → \`[0 2 1 3 4 5]\`, độ dài 9. ✓

**Độ phức tạp.** Dijkstra $O((V+E) \\log V)$ + truy vết $O(V)$.

### Bài 5 — Phản ví dụ cạnh âm

**Đồ thị (không chu trình âm):** \`src=0\`; cạnh \`0→1 (1)\`, \`0→2 (2)\`, \`2→1 (-2)\`.

**Dijkstra-với-\`visited\` (đánh dấu khi pop, không relax lại đỉnh đã chốt):**
1. Pop 0. \`dist[1]=1, dist[2]=2\`.
2. Pop 1 (nhỏ nhất). Chốt \`visited[1]=true\`, \`dist[1]=1\`. Đỉnh 1 không cạnh ra.
3. Pop 2. Chốt. Relax \`2→1\`: muốn \`2+(-2)=0 < 1\`, nhưng \`visited[1]=true\` → **bỏ qua**. \`dist[1]\` giữ **1**.

**Đáp án Dijkstra = 1, SAI.** Đường đúng \`0→2→1 = 2 + (-2) = 0\`. **Bellman-Ford** cho đúng \`dist[1]=0\`.

**Bước sai:** bước 2 chốt đỉnh 1 quá sớm — greedy tin "1 không thể tốt hơn", nhưng cạnh âm \`2→1\` phá vỡ điều đó.

### Bài 6 — Swim in Rising Water

**Cách tiếp cận.** Dijkstra-max trên grid: chi phí một đường = **max độ cao ô** trên đường. \`t[r][c]\` = thời gian nhỏ nhất để tới \`(r,c)\`. Relax: \`cand = max(t[u], grid[nr][nc])\`.

\`\`\`go
func swimInWater(grid [][]int) int {
	n := len(grid)
	const INF = int(1e18)
	best := make([][]int, n)
	for i := range best {
		best[i] = make([]int, n)
		for j := range best[i] {
			best[i][j] = INF
		}
	}
	best[0][0] = grid[0][0]
	pq := &GridPQ{{grid[0][0], 0, 0}}
	heap.Init(pq)
	dirs := [4][2]int{{1, 0}, {-1, 0}, {0, 1}, {0, -1}}

	for pq.Len() > 0 {
		c := heap.Pop(pq).(Cell)
		if c.e > best[c.r][c.c] {
			continue
		}
		if c.r == n-1 && c.c == n-1 {
			return c.e
		}
		for _, d := range dirs {
			nr, nc := c.r+d[0], c.c+d[1]
			if nr < 0 || nr >= n || nc < 0 || nc >= n {
				continue
			}
			cand := c.e
			if grid[nr][nc] > cand {
				cand = grid[nr][nc] // max độ cao
			}
			if cand < best[nr][nc] {
				best[nr][nc] = cand
				heap.Push(pq, Cell{cand, nr, nc})
			}
		}
	}
	return best[n-1][n-1]
}
\`\`\`

**Walk-through.** \`grid=[[0,2],[1,3]]\`. Từ (0,0)=0: đi xuống (1,0)=1 rồi (1,1)=3, max=3; hoặc phải (0,1)=2 rồi (1,1)=3, max=3. Đáp án **3**.

**Độ phức tạp.** $O(n^2 \\log n)$.

### Bài 7 — Số đường đi ngắn nhất

**Cách tiếp cận.** Chạy Dijkstra, thêm mảng \`cnt[v]\` = số đường ngắn nhất tới \`v\`. Khi relax \`u→v\`:
- Nếu \`dist[u]+w < dist[v]\`: tìm đường ngắn hơn → \`dist[v]=dist[u]+w; cnt[v]=cnt[u]\`.
- Nếu \`dist[u]+w == dist[v]\`: thêm đường bằng độ dài → \`cnt[v] = (cnt[v]+cnt[u]) mod M\`.

\`\`\`go
const MOD = 1_000_000_007
func countShortestPaths(n int, adj [][]Edge, src int) []int {
	dist := make([]int, n)
	cnt := make([]int, n)
	for i := range dist { dist[i] = INF }
	dist[src] = 0; cnt[src] = 1
	pq := &PQ{{0, src}}; heap.Init(pq)
	for pq.Len() > 0 {
		c := heap.Pop(pq).(Item)
		if c.dist > dist[c.node] { continue }
		for _, e := range adj[c.node] {
			nd := c.dist + e.w
			if nd < dist[e.to] {
				dist[e.to] = nd
				cnt[e.to] = cnt[c.node]
				heap.Push(pq, Item{nd, e.to})
			} else if nd == dist[e.to] {
				cnt[e.to] = (cnt[e.to] + cnt[c.node]) % MOD
			}
		}
	}
	return cnt
}
\`\`\`

**Lưu ý.** Phải cộng \`cnt[u]\` chỉ khi \`u\` đã ổn định (dùng lazy-deletion bình thường, vì đỉnh pop hợp lệ có \`dist\` tối ưu, \`cnt\` cũng đã đúng tại thời điểm đó nhờ thứ tự pop theo \`dist\` tăng).

**Độ phức tạp.** $O((V+E) \\log V)$.

---

## Code & Minh họa

- Toàn bộ code Go đã **inline** trong README (mục 4, 5, 8, 9 và phần Lời giải) — copy chạy trực tiếp với \`go run\`.
- [visualization.html](./visualization.html) — 3 module tương tác:
  1. **Dijkstra animator** — đồ thị trọng số, animate pop-min + relax, bảng \`dist\` cập nhật, highlight finalized.
  2. **BFS vs Dijkstra** — cùng đồ thị weighted, thấy BFS sai vs Dijkstra đúng.
  3. **Negative edge fail** — phản ví dụ Dijkstra sai với cạnh âm.

---

## Bài tiếp theo

- **[Lesson 34 — Bellman-Ford & Floyd-Warshall](../lesson-34-bellman-ford-floyd/)** — shortest path **có cạnh âm**, phát hiện chu trình âm, all-pairs.
- Xa hơn: **Lesson 35 — MST** (Prim cũng dùng min-heap như Dijkstra), **capstone L52 — A\\*** (Dijkstra + heuristic).

> 📝 **Tóm tắt toàn bài.**
> - Dijkstra: single-source shortest path, **trọng số không âm**, greedy + min-heap.
> - Đúng nhờ bất biến "pop = tối ưu" (cần $w \\geq 0$).
> - $O((V+E) \\log V)$ với binary heap; lazy deletion thay decrease-key.
> - Cạnh âm → SAI → dùng Bellman-Ford (L34).
> - Biến thể: single-target, A*, grid (\`+\` hoặc \`max\`).
`;
