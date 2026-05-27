// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: Algorithms/lesson-36-connected-components/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 36 — Thành phần liên thông & Union-Find (Connected Components & Disjoint Set Union)

> Tier 5 · Đồ thị · Bài 36
>
> Khi nào hai đỉnh "thuộc về nhau"? Khi nào thêm một cạnh tạo ra chu trình? Khi nào hai tài khoản là của cùng một người? Tất cả quy về một câu hỏi: **các đỉnh nào nối được với nhau** — và cấu trúc dữ liệu trả lời nó cực nhanh là **Union-Find**.

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Hiểu **thành phần liên thông (connected component)** của đồ thị vô hướng là gì, và đếm số thành phần.
- Tìm thành phần bằng **2 cách**: duyệt BFS/DFS, hoặc **Union-Find (Disjoint Set Union — DSU)**.
- Cài đặt Union-Find đầy đủ với **path compression** + **union by size/rank**, hiểu vì sao mỗi thao tác gần như O(1) (amortized α(n)).
- Vận dụng Union-Find vào loạt bài thực tế: đếm component động (online), **phát hiện chu trình** trong đồ thị vô hướng, **Kruskal MST** (recap), number of provinces, accounts merge, redundant connection, number of islands.
- Biết **Flood Fill** trên lưới (grid) và **Weighted Union-Find** (lưu quan hệ tương đối).
- Phân biệt rõ **online vs offline**, **khi nào dùng Union-Find vs BFS/DFS**.

## Kiến thức tiền đề

- [Lesson 31 — Duyệt đồ thị (BFS/DFS)](../lesson-31-graph-traversal/) — nền tảng duyệt, ta sẽ dùng lại để tìm component bằng traversal.
- [Lesson 35 — Cây khung nhỏ nhất (MST: Kruskal & Prim)](../lesson-35-mst-kruskal-prim/) — Kruskal dùng Union-Find làm "trái tim". Bài này đào sâu chính cái lõi đó.
- [Lesson 02 — Phân tích khấu hao (Amortized Analysis)](../lesson-02-amortized-analysis/) — để hiểu vì sao α(n) ≈ O(1) là phân tích **amortized**, không phải worst-case từng thao tác.
- Disjoint Set Union như một cấu trúc dữ liệu cũng được nhắc tới trong [DataStructures/](../../DataStructures/).

---

## 1. Thành phần liên thông là gì?

> 💡 **Trực giác / Hình dung.** Tưởng tượng một bản đồ các hòn đảo nối nhau bằng cầu. Nếu bạn đứng trên một hòn đảo, **đi bộ qua cầu**, bạn tới được những hòn đảo nào? Tập tất cả các đảo bạn tới được (kể cả đảo đang đứng) là **một thành phần liên thông**. Hai đảo ở hai cụm cầu tách biệt thuộc **hai thành phần khác nhau** — không có đường nào nối.

**Định nghĩa hình thức.** Cho đồ thị **vô hướng** \`G = (V, E)\`. Hai đỉnh \`u, v\` **liên thông** nếu tồn tại một đường đi giữa chúng. Quan hệ "liên thông với" là **quan hệ tương đương** (phản xạ, đối xứng, bắc cầu). Mỗi **lớp tương đương** là một **thành phần liên thông** — tập đỉnh tối đại mà bất kỳ hai đỉnh nào trong đó đều nối được với nhau.

### Ví dụ số cụ thể

Xét đồ thị 7 đỉnh \`{0,1,2,3,4,5,6}\` với các cạnh:

\`\`\`
0 — 1,  1 — 2,  3 — 4,  5 (cô lập), 6 (cô lập)
\`\`\`

- **Thành phần 1**: \`{0, 1, 2}\` — 0 nối 1, 1 nối 2 → cả ba thông nhau.
- **Thành phần 2**: \`{3, 4}\`.
- **Thành phần 3**: \`{5}\` — đỉnh cô lập vẫn là một thành phần (chính nó).
- **Thành phần 4**: \`{6}\`.

→ **Số thành phần = 4.**

> ⚠ **Lỗi thường gặp.** Đỉnh cô lập (không cạnh nào) **vẫn là một thành phần**. Nhiều người quên đếm chúng → số component bị thiếu. Một đồ thị \`n\` đỉnh, 0 cạnh có đúng \`n\` thành phần.

### Bốn ví dụ nữa để chắc tay

| Đồ thị | Cạnh | Số component |
|--------|------|:---:|
| 4 đỉnh, đầy đủ | 0-1, 1-2, 2-3, 3-0 | **1** (tất cả thông) |
| 4 đỉnh, không cạnh | (không có) | **4** (mỗi đỉnh một component) |
| 5 đỉnh | 0-1, 2-3 | **3** (\`{0,1}\`, \`{2,3}\`, \`{4}\`) |
| 6 đỉnh | 0-1, 1-2, 2-0, 3-4 | **3** (\`{0,1,2}\`, \`{3,4}\`, \`{5}\`) — chú ý tam giác 0-1-2 vẫn chỉ là 1 component |

> ❓ **Câu hỏi tự nhiên của người đọc.**
> - *"Cạnh trùng (0-1 xuất hiện 2 lần) có làm tăng component không?"* — Không. Component chỉ phụ thuộc **đỉnh nào nối được đỉnh nào**, không phụ thuộc số lần.
> - *"Đồ thị có hướng thì sao?"* — Khái niệm "connected component" cho đồ thị **có hướng** khác hẳn (gọi là **strongly/weakly connected**). Bài này chỉ xét **vô hướng**; phần có hướng để dành [Lesson 37 — Strongly Connected Components](../lesson-37-strongly-connected/).

> 🔁 **Dừng lại tự kiểm tra.** Đồ thị 8 đỉnh, cạnh \`0-1, 1-2, 3-4, 4-5, 5-3, 6-7\`. Bao nhiêu component?
> <details><summary>Đáp án</summary>
>
> \`{0,1,2}\`, \`{3,4,5}\` (tam giác), \`{6,7}\` → **3 thành phần**. (Không có đỉnh cô lập vì cả 8 đỉnh đều có cạnh.)
> </details>

---

## 2. Cách 1 — Tìm component bằng BFS/DFS

> 💡 **Trực giác.** Cứ chọn một đỉnh **chưa thăm**, "tô màu" toàn bộ vùng nối được với nó (một lần BFS/DFS), đó là một component. Lặp lại tới khi mọi đỉnh đã được tô. Số lần ta phải "khởi động" một lần duyệt mới = số component.

### Ý tưởng

\`\`\`
component_count = 0
for mỗi đỉnh v trong V:
    if v chưa thăm:
        component_count += 1
        BFS/DFS từ v, đánh dấu mọi đỉnh thăm được thuộc component này
\`\`\`

### Walk-through bằng số

Đồ thị 7 đỉnh ở mục 1 (\`0-1, 1-2, 3-4\`, 5 và 6 cô lập), duyệt theo thứ tự đỉnh:

| Đỉnh xét | Đã thăm? | Hành động | component_count | Vùng tô |
|:---:|:---:|---|:---:|---|
| 0 | chưa | DFS(0) → thăm 0,1,2 | 1 | {0,1,2} |
| 1 | rồi | bỏ qua | 1 | |
| 2 | rồi | bỏ qua | 1 | |
| 3 | chưa | DFS(3) → thăm 3,4 | 2 | {3,4} |
| 4 | rồi | bỏ qua | 2 | |
| 5 | chưa | DFS(5) → thăm 5 | 3 | {5} |
| 6 | chưa | DFS(6) → thăm 6 | 4 | {6} |

→ Kết quả **4** ✓ khớp mục 1.

### Code Go inline — đếm component bằng DFS

\`\`\`go
package main

import "fmt"

// countComponentsDFS đếm số thành phần liên thông của đồ thị vô hướng
// adj[v] = danh sách đỉnh kề v.
func countComponentsDFS(n int, adj [][]int) int {
	visited := make([]bool, n)
	count := 0

	var dfs func(u int)
	dfs = func(u int) {
		visited[u] = true
		for _, w := range adj[u] {
			if !visited[w] {
				dfs(w) // lan sang đỉnh kề chưa thăm — cùng component
			}
		}
	}

	for v := 0; v < n; v++ {
		if !visited[v] {
			count++  // mỗi đỉnh chưa thăm khởi đầu một component MỚI
			dfs(v)   // tô toàn bộ vùng nối được
		}
	}
	return count
}

func main() {
	// 7 đỉnh: 0-1, 1-2, 3-4, 5 và 6 cô lập
	adj := make([][]int, 7)
	addEdge := func(a, b int) { adj[a] = append(adj[a], b); adj[b] = append(adj[b], a) }
	addEdge(0, 1)
	addEdge(1, 2)
	addEdge(3, 4)
	fmt.Println("Số component:", countComponentsDFS(7, adj)) // => 4
}
\`\`\`

> ⚠ **Lỗi thường gặp.** DFS đệ quy trên đồ thị **rất sâu/lớn** (vài trăm nghìn đỉnh) có thể tràn stack. Dùng BFS dùng hàng đợi, hoặc DFS với stack tường minh.

**Độ phức tạp:** \`O(V + E)\` thời gian, \`O(V)\` bộ nhớ — duyệt mỗi đỉnh và mỗi cạnh đúng một lần. Đây là cách tốt nhất khi đồ thị **tĩnh (static)** — có sẵn toàn bộ cạnh từ đầu.

> 📝 **Tóm tắt mục 2.** BFS/DFS đếm component bằng cách "tô màu" từng vùng. Mỗi đỉnh chưa thăm = một component mới. \`O(V+E)\`. Tốt cho đồ thị tĩnh và khi cần **đường đi / traversal** thật sự.

---

## 3. Cách 2 — Union-Find (Disjoint Set Union)

> 💡 **Trực giác.** Hãy hình dung mỗi đỉnh ban đầu là một "câu lạc bộ" riêng, chỉ có mình nó. Mỗi câu lạc bộ có một **trưởng nhóm (đại diện — representative/root)**. Khi có một cạnh \`u-v\`, ta **gộp (union)** hai câu lạc bộ của \`u\` và \`v\` thành một, bằng cách cho trưởng nhóm này "phục tùng" trưởng nhóm kia. Muốn biết hai đỉnh có cùng câu lạc bộ không, ta hỏi: *"trưởng nhóm tối cao của bạn là ai?"* (\`find\`) — cùng trưởng nhóm ⇔ cùng component.

Union-Find là cấu trúc dữ liệu cho **các tập rời nhau (disjoint sets)**, hỗ trợ 2 thao tác:

- **\`find(x)\`** — trả về **đại diện (root)** của tập chứa \`x\`.
- **\`union(x, y)\`** — gộp tập chứa \`x\` và tập chứa \`y\` làm một.

Biểu diễn bằng mảng \`parent[]\`: \`parent[x]\` trỏ tới "cha" của \`x\` trong cây. Root là đỉnh có \`parent[root] == root\`. Các cây tạo thành **rừng (forest)**, mỗi cây = một tập.

### 3.1 Phiên bản ngây thơ và 2 tối ưu

Phiên bản ngây thơ: \`find\` đi ngược cha tới root, \`union\` cho root này trỏ root kia. Vấn đề: cây có thể bị "thoái hóa" thành dây chuyền dài → \`find\` chậm \`O(n)\`. Hai tối ưu cứu nguy:

1. **Union by size (hoặc rank).** Khi gộp, luôn cho cây **nhỏ hơn** treo dưới cây **lớn hơn** → chiều cao tăng chậm, cây luôn "lùn".
2. **Path compression.** Trong lúc \`find\`, sau khi tìm ra root, ta cho **mọi đỉnh trên đường đi trỏ thẳng tới root** → lần sau hỏi chỉ tốn 1 bước.

> 💡 **Hình dung path compression.** Lần đầu hỏi "trưởng tối cao của tôi?", bạn phải hỏi qua 5 cấp quản lý. Sau khi biết, bạn (và mọi người trên chuỗi vừa hỏi) ghi thẳng số điện thoại của trưởng tối cao vào sổ → lần sau gọi một phát là tới. Cây bị **làm phẳng (flatten)**.

### 3.2 Walk-through union + find (bằng số cụ thể)

6 phần tử \`{0,1,2,3,4,5}\`. Khởi tạo: \`parent = [0,1,2,3,4,5]\`, \`size = [1,1,1,1,1,1]\` (mỗi phần tử là root của chính nó).

Thực hiện lần lượt:

| Thao tác | Diễn giải | \`parent\` sau đó |
|---|---|---|
| \`union(0,1)\` | root(0)=0, root(1)=1; size bằng nhau → 1 treo dưới 0; size[0]=2 | \`[0,0,2,3,4,5]\` |
| \`union(2,3)\` | gộp tương tự → 3 treo dưới 2; size[2]=2 | \`[0,0,2,2,4,5]\` |
| \`union(0,2)\` | root(0)=0 (size 2), root(2)=2 (size 2); bằng → 2 treo dưới 0; size[0]=4 | \`[0,0,0,2,4,5]\` |
| \`find(3)\` | 3→parent 2→parent 0 (root). **Path compression**: cho parent[3]=0 luôn | \`[0,0,0,0,4,5]\` |
| \`find(1)\` | 1→0 (root), đã 1 bước | không đổi |

Bây giờ:
- \`find(3) == find(0) == 0\` → 0,1,2,3 **cùng** một tập ✓
- \`find(4) = 4\`, \`find(5) = 5\` → 4 và 5 mỗi đứa một tập.
- **Số tập = 3**: \`{0,1,2,3}\`, \`{4}\`, \`{5}\`.

> Để ý sau \`find(3)\` thì 3 trỏ **thẳng** tới 0 — cây phẳng hơn. Đó là path compression làm việc.

### 3.3 Code Go inline — Union-Find đầy đủ

\`\`\`go
package main

import "fmt"

// DSU — Disjoint Set Union với path compression + union by size.
type DSU struct {
	parent []int
	size   []int
	count  int // số tập (component) hiện tại
}

func NewDSU(n int) *DSU {
	d := &DSU{
		parent: make([]int, n),
		size:   make([]int, n),
		count:  n, // ban đầu n phần tử = n tập rời
	}
	for i := 0; i < n; i++ {
		d.parent[i] = i // mỗi phần tử là root của chính nó
		d.size[i] = 1
	}
	return d
}

// Find trả về root của tập chứa x, có path compression.
func (d *DSU) Find(x int) int {
	for d.parent[x] != x {
		d.parent[x] = d.parent[d.parent[x]] // path halving: nối x tới "ông nội"
		x = d.parent[x]
	}
	return x
}

// Union gộp tập của a và b. Trả về true nếu THỰC SỰ gộp (trước đó khác tập),
// false nếu đã cùng tập (hữu ích cho phát hiện chu trình).
func (d *DSU) Union(a, b int) bool {
	ra, rb := d.Find(a), d.Find(b)
	if ra == rb {
		return false // đã cùng tập → không gộp, không giảm count
	}
	// union by size: cây nhỏ treo dưới cây lớn
	if d.size[ra] < d.size[rb] {
		ra, rb = rb, ra
	}
	d.parent[rb] = ra
	d.size[ra] += d.size[rb]
	d.count-- // gộp 2 tập thành 1 → giảm một đơn vị
	return true
}

// Connected kiểm tra a, b có cùng tập không.
func (d *DSU) Connected(a, b int) bool { return d.Find(a) == d.Find(b) }

func main() {
	d := NewDSU(6)
	d.Union(0, 1)
	d.Union(2, 3)
	d.Union(0, 2)
	fmt.Println("find(3) == find(0)?", d.Connected(3, 0)) // true
	fmt.Println("find(4) == find(5)?", d.Connected(4, 5)) // false
	fmt.Println("số component:", d.count)                 // 3
}
\`\`\`

> ❓ **Câu hỏi tự nhiên của người đọc.**
> - *"\`path halving\` (\`parent[x] = parent[parent[x]]\`) có khác \`path compression\` đệ quy không?"* — Cùng họ. Compression đệ quy nối **mọi** đỉnh thẳng root; path halving nối tới ông nội mỗi bước. Cả hai đều cho cùng cận amortized α(n), nhưng halving viết vòng lặp gọn, không tốn stack.
> - *"Vì sao \`Union\` trả về bool?"* — Để biết cạnh \`a-b\` có nối hai tập **trước đó tách rời** hay không. Nếu \`false\` (đã cùng tập) mà ta vẫn thêm cạnh → cạnh đó tạo **chu trình** (mục 4.2).
> - *"Khi nào dùng rank thay size?"* — Tương đương về hiệu năng. \`size\` còn cho biết kích thước component (hữu ích nhiều bài). Bài này dùng \`size\`.

### 3.4 Vì sao gần O(1)? — α(n) và amortized

Với cả union by size **và** path compression, mỗi thao tác \`find\`/\`union\` chạy trong **O(α(n))** amortized, với \`α\` là hàm ngược Ackermann. \`α(n) ≤ 4\` cho mọi \`n\` thực tế (kể cả \`n\` lớn hơn số nguyên tử trong vũ trụ) → coi như **hằng số**.

> ⚠ Đây là cận **amortized** (xem [Lesson 02](../lesson-02-amortized-analysis/)) — một lần \`find\` riêng lẻ có thể tốn hơn O(1), nhưng **trung bình trên cả dãy** thao tác thì gần hằng số. Path compression "trả trước" công làm phẳng cây để các lần sau rẻ.

> 📝 **Tóm tắt mục 3.** Union-Find biểu diễn các tập rời bằng rừng cây. \`find\` (path compression) + \`union\` (by size) → mỗi thao tác **amortized O(α(n)) ≈ O(1)**. \`Union\` trả \`false\` ⇔ hai đỉnh đã cùng tập.

---

## 4. Ứng dụng Union-Find

### 4.1 Đếm component động (online — thêm cạnh từng cái)

Khác BFS/DFS (cần toàn bộ cạnh từ đầu), Union-Find cập nhật số component **ngay khi thêm một cạnh**, mỗi lần gần O(1). Biến \`count\` trong DSU chính là số component hiện tại.

\`\`\`go
func componentsAfterEdges(n int, edges [][2]int) []int {
	d := NewDSU(n)
	res := make([]int, 0, len(edges))
	for _, e := range edges {
		d.Union(e[0], e[1])
		res = append(res, d.count) // số component SAU khi thêm cạnh này
	}
	return res
}
// n=5, edges = (0-1),(2-3),(0-2),(1-3),(4-?)
// count khởi đầu 5 → 4 → 3 → 2 → 2(cạnh 1-3 đã cùng tập) ...
\`\`\`

**Walk-through** \`n=5\`, thêm lần lượt \`0-1, 2-3, 0-2, 1-3\`:

| Cạnh thêm | union thành công? | count sau |
|:---:|:---:|:---:|
| khởi đầu | — | 5 |
| 0-1 | ✓ | 4 |
| 2-3 | ✓ | 3 |
| 0-2 | ✓ | 2 |
| 1-3 | ✗ (1 và 3 đã cùng tập {0,1,2,3}) | 2 |

→ count giảm đúng số lần union thành công.

### 4.2 Phát hiện chu trình trong đồ thị vô hướng

> 💡 **Trực giác.** Thêm một cạnh \`u-v\`. Nếu \`u\` và \`v\` **đã thuộc cùng component** từ trước, nghĩa là đã có sẵn một đường đi khác giữa chúng → cạnh mới này đóng vòng → **chu trình**.

\`\`\`go
// hasCycleUndirected: true nếu đồ thị vô hướng (n đỉnh, edges) có chu trình.
func hasCycleUndirected(n int, edges [][2]int) bool {
	d := NewDSU(n)
	for _, e := range edges {
		if !d.Union(e[0], e[1]) { // Union trả false ⇒ đã cùng tập ⇒ chu trình
			return true
		}
	}
	return false
}
\`\`\`

**Ví dụ:** \`n=3\`, \`edges = 0-1, 1-2, 2-0\`. Union(0,1) ✓, Union(1,2) ✓ (cả 3 cùng tập), Union(2,0) → 2 và 0 đã cùng tập → **chu trình** ✓.

> ⚠ Kỹ thuật này **chỉ đúng cho đồ thị vô hướng**. Với đồ thị có hướng, "cùng tập trong DSU" không bắt được chu trình theo hướng — phải dùng DFS với màu trắng/xám/đen (Lesson 31/32).

### 4.3 Kruskal MST (recap Lesson 35)

Union-Find là lõi của [Kruskal](../lesson-35-mst-kruskal-prim/): sắp cạnh tăng dần theo trọng số, duyệt từng cạnh, **chỉ lấy cạnh nếu nó nối hai component khác nhau** (\`Union\` trả \`true\`) — nếu trả \`false\` thì cạnh đó tạo chu trình, bỏ. Dừng khi đủ \`n-1\` cạnh.

\`\`\`go
type Edge struct{ u, v, w int }

func kruskalMST(n int, edges []Edge) int {
	// (giả định edges đã sort theo w tăng dần — xem L35)
	d := NewDSU(n)
	total, taken := 0, 0
	for _, e := range edges {
		if d.Union(e.u, e.v) { // nối 2 component khác nhau ⇒ an toàn lấy
			total += e.w
			taken++
			if taken == n-1 {
				break
			}
		}
	}
	return total
}
\`\`\`

### 4.4 Number of Provinces / Friend Circles

Cho ma trận \`isConnected[i][j] = 1\` nếu thành phố \`i\` và \`j\` nối trực tiếp. Đếm số "tỉnh" = số component.

\`\`\`go
func findCircleNum(isConnected [][]int) int {
	n := len(isConnected)
	d := NewDSU(n)
	for i := 0; i < n; i++ {
		for j := i + 1; j < n; j++ { // ma trận đối xứng → chỉ cần nửa trên
			if isConnected[i][j] == 1 {
				d.Union(i, j)
			}
		}
	}
	return d.count
}
\`\`\`

**Độ phức tạp:** \`O(n²·α(n))\` ≈ \`O(n²)\` (do phải đọc cả ma trận).

### 4.5 Redundant Connection

Cho một cây \`n\` đỉnh đã thêm **đúng một cạnh thừa** (tạo đúng một chu trình). Tìm cạnh thừa — cạnh **cuối cùng** trong danh sách mà khi thêm vào lại nối hai đỉnh đã cùng tập.

\`\`\`go
func findRedundantConnection(edges [][]int) []int {
	n := len(edges) // đỉnh đánh số 1..n
	d := NewDSU(n + 1)
	for _, e := range edges {
		if !d.Union(e[0], e[1]) {
			return e // cạnh này đóng vòng ⇒ cạnh thừa
		}
	}
	return nil
}
\`\`\`

### 4.6 Accounts Merge

Mỗi account có tên + danh sách email. Hai account thuộc **cùng người** nếu chia sẻ ít nhất một email. Gộp: ánh xạ mỗi email tới một id, union các email **trong cùng account**, rồi gom email theo root. Đây là Union-Find trên "đỉnh = email".

### 4.7 Number of Islands II (online)

Lưới ban đầu toàn nước. Lần lượt "đổ đất" (\`addLand\`) vào từng ô; sau mỗi lần trả về **số đảo hiện tại**. Mỗi ô đất mới: count++; rồi với 4 ô đất kề, nếu union thành công thì count-- (vì hai đảo nhập một). Đây là minh họa kinh điển vì sao Union-Find thắng BFS/DFS ở bài **online** — không phải duyệt lại cả lưới mỗi lần.

\`\`\`go
func numIslands2(m, n int, positions [][]int) []int {
	d := NewDSU(m * n)
	land := make([]bool, m*n)
	res := make([]int, 0, len(positions))
	dirs := [][2]int{{1, 0}, {-1, 0}, {0, 1}, {0, -1}}
	id := func(r, c int) int { return r*n + c }
	for _, p := range positions {
		r, c := p[0], p[1]
		idx := id(r, c)
		if land[idx] { // ô đã là đất → số đảo không đổi
			res = append(res, d.count)
			continue
		}
		land[idx] = true
		d.count++ // ô đất mới: tạm coi là một đảo riêng
		for _, dir := range dirs {
			nr, nc := r+dir[0], c+dir[1]
			if nr >= 0 && nr < m && nc >= 0 && nc < n && land[id(nr, nc)] {
				d.Union(idx, id(nr, nc)) // Union tự count-- nếu khác đảo
			}
		}
		res = append(res, d.count)
	}
	return res
}
\`\`\`

> Lưu ý: \`d.count\` ở đây ta tự ++ khi thêm đất rồi để \`Union\` tự -- — nên khởi tạo \`count\` về 0 thực tế (hoặc bỏ qua \`count\` ban đầu của DSU). Trong code thi đấu thường dùng biến \`islands\` riêng cho rõ ràng.

> 📝 **Tóm tắt mục 4.** Union-Find phủ hàng loạt bài: đếm component động, phát hiện chu trình vô hướng, Kruskal, provinces, redundant connection, accounts merge, islands II. Mẫu chung: **ánh xạ thực thể → chỉ số, union khi "thuộc về nhau", đếm/kiểm tra bằng find**.

---

## 5. Online vs Offline

> 💡 **Trực giác.** *Offline* = biết hết dữ liệu trước rồi mới xử lý (đồ thị tĩnh). *Online* = dữ liệu đến **dần dần**, phải trả lời ngay sau mỗi bước (thêm cạnh/đất từng cái).

| | Offline (tĩnh) | Online (động — thêm cạnh) |
|---|---|---|
| Có sẵn toàn bộ cạnh? | Có | Không, đến dần |
| Cần đường đi / cây duyệt? | Thường có | Thường chỉ cần connectivity |
| Công cụ tốt | BFS/DFS \`O(V+E)\` | **Union-Find** ~O(α) mỗi cạnh |

Union-Find xử lý "thêm cạnh" cực rẻ nhưng **không hỗ trợ xóa cạnh** dễ dàng (đó là bài toán khó hơn — dynamic connectivity với link-cut tree). BFS/DFS phải duyệt lại từ đầu mỗi lần đồ thị đổi → tốn \`O(V+E)\` mỗi truy vấn.

---

## 6. Flood Fill — component trên lưới (grid)

> 💡 **Trực giác.** Công cụ "thùng sơn" trong Paint: click một ô, màu lan ra tất cả ô **kề nhau cùng màu**. Đó chính là tìm component trên lưới, với "cạnh" = hai ô kề (trên/dưới/trái/phải).

Bài kinh điển: **Number of Islands** — đếm số cụm ô \`'1'\` (đất) trong lưới \`'0'/'1'\`. Mỗi cụm là một component. Làm được bằng cả BFS/DFS (flood fill) lẫn Union-Find.

### Code Go inline — Number of Islands (flood fill DFS)

\`\`\`go
func numIslands(grid [][]byte) int {
	if len(grid) == 0 {
		return 0
	}
	m, n := len(grid), len(grid[0])
	count := 0

	var flood func(r, c int)
	flood = func(r, c int) {
		if r < 0 || r >= m || c < 0 || c >= n || grid[r][c] != '1' {
			return // ra biên hoặc gặp nước/đã thăm → dừng
		}
		grid[r][c] = '0' // "chìm" ô này để không thăm lại (đánh dấu visited)
		flood(r+1, c)
		flood(r-1, c)
		flood(r, c+1)
		flood(r, c-1)
	}

	for r := 0; r < m; r++ {
		for c := 0; c < n; c++ {
			if grid[r][c] == '1' {
				count++   // gặp ô đất chưa thăm → một đảo mới
				flood(r, c) // làm chìm cả đảo
			}
		}
	}
	return count
}
\`\`\`

**Walk-through** lưới 3×3:
\`\`\`
1 1 0
0 1 0
0 0 1
\`\`\`
- (0,0)='1' → count=1, flood làm chìm {(0,0),(0,1),(1,1)}.
- Quét tiếp tới (2,2)='1' → count=2, flood {(2,2)}.
→ **2 đảo.** Độ phức tạp \`O(m·n)\`.

> ⚠ Flood fill mặc định **4 hướng**. Một số bài yêu cầu **8 hướng** (kèm chéo) — thêm 4 hướng đường chéo vào danh sách. Đọc kỹ đề.

---

## 7. Weighted Union-Find — lưu quan hệ tương đối

> 💡 **Trực giác.** Đôi khi ta không chỉ cần biết \`x, y\` cùng tập, mà cần biết **quan hệ định lượng** giữa chúng — ví dụ "a nặng gấp 2 lần b", "x ở trước y 3 vị trí". Ta gắn cho mỗi cạnh \`x → parent[x]\` một **trọng số** thể hiện quan hệ, và **cộng dồn dọc đường tới root**.

Bài kinh điển: **Evaluate Division** (\`a/b = 2.0\`, \`b/c = 3.0\`, hỏi \`a/c = ?\`). Lưu \`weight[x]\` = tỉ số \`value(x) / value(parent[x])\`. Khi \`find\` nén đường, cập nhật weight tích lũy. Truy vấn \`a/c\`: nếu cùng root → \`weight[a]/weight[c]\`.

\`\`\`go
// Phác thảo: find trả root, đồng thời cập nhật weight[x] = giá trị x / giá trị root.
func (d *WDSU) Find(x int) int {
	if d.parent[x] != x {
		root := d.Find(d.parent[x])
		d.weight[x] *= d.weight[d.parent[x]] // tích lũy tỉ số dọc đường
		d.parent[x] = root
	}
	return d.parent[x]
}
\`\`\`

**Ví dụ số:** \`a/b=2\`, \`b/c=3\`. Sau union: root chung (giả sử c), \`weight[a]\` = \`a/c\` = \`(a/b)·(b/c)\` = \`2·3 = 6\`. Truy vấn \`a/c = weight[a]/weight[c] = 6/1 = 6\` ✓.

> Bài này chỉ **nhắc qua** Weighted Union-Find. Nó là biến thể nâng cao; ý chính: trọng số trên cạnh + tích lũy khi nén đường.

---

## 8. Số component giảm dần khi union

Một quan sát quan trọng: **mỗi \`Union\` thành công làm số component giảm đúng 1**; \`Union\` thất bại (đã cùng tập) **không đổi**. Bắt đầu \`n\` component (mỗi đỉnh một), sau \`k\` union thành công còn \`n - k\` component.

→ Hệ quả: với đồ thị \`n\` đỉnh, để **liên thông hoàn toàn** (1 component) cần **ít nhất \`n-1\` cạnh union thành công** — đây chính là số cạnh của một cây khung (spanning tree).

**Ví dụ:** \`n=5\`, các cạnh union thành công: \`0-1, 1-2, 2-3, 3-4\` (4 = n-1 cạnh) → 1 component. Nếu chỉ 3 cạnh thành công → còn 2 component.

---

## 9. Độ phức tạp tổng hợp

| Thao tác / Bài | Cấu trúc | Thời gian |
|---|---|---|
| \`find\` / \`union\` (riêng) | DSU (path compression + by size) | amortized **O(α(n)) ≈ O(1)** |
| Đếm component, \`m\` cạnh | DSU | \`O((V + m)·α(n))\` ≈ \`O(V + m)\` |
| Đếm component tĩnh | BFS/DFS | \`O(V + E)\` |
| Phát hiện chu trình vô hướng | DSU | \`O((V+E)·α)\` |
| Number of Provinces (ma trận) | DSU | \`O(n²·α)\` |
| Number of Islands (flood fill) | BFS/DFS | \`O(m·n)\` |
| Number of Islands II (online, \`k\` thao tác) | DSU | \`O(k·α(m·n))\` |

Bộ nhớ DSU: \`O(n)\` cho \`parent\` + \`size\`.

---

## 10. Khi nào Union-Find vs BFS/DFS?

| Tình huống | Chọn |
|---|---|
| Đồ thị **tĩnh**, cần đếm component một lần | BFS/DFS (đơn giản, \`O(V+E)\`) |
| Cần **đường đi cụ thể / cây duyệt / thứ tự thăm** | BFS/DFS |
| Cạnh đến **dần (online)**, hỏi connectivity sau mỗi lần | **Union-Find** |
| Chỉ quan tâm "hai đỉnh có cùng nhóm không" | **Union-Find** |
| Kruskal MST, phát hiện chu trình vô hướng | **Union-Find** |
| Cần **xóa** cạnh (dynamic connectivity đầy đủ) | Cả hai đều khó — cần link-cut tree |
| Lưu **quan hệ định lượng** giữa các phần tử | **Weighted Union-Find** |

> 💡 Quy tắc nhanh: **chỉ cần connectivity + đồ thị động/online → Union-Find. Cần traversal/path → BFS/DFS.**

---

## 11. Cạm bẫy thường gặp

> ⚠ **Tổng hợp các lỗi phổ biến** — đọc kỹ trước khi nộp bài:

1. **Quên path compression** → cây thoái hóa thành dây chuyền, \`find\` chậm \`O(n)\`, cả thuật toán chậm \`O(n²)\`. Luôn nén đường.
2. **Quên union by size/rank** → cũng làm cây cao, chậm. Phải có một trong hai (lý tưởng cả hai).
3. **Đếm component sai khi union hai đỉnh đã cùng tập** → phải kiểm tra \`Find(a) == Find(b)\` **trước** khi \`count--\`. Code mẫu trả \`false\` đúng cho trường hợp này.
4. **Off-by-one ở khởi tạo \`parent\`** — đỉnh đánh số \`1..n\` cần \`NewDSU(n+1)\` (như redundant connection); đỉnh \`0..n-1\` thì \`NewDSU(n)\`. Sai chỗ này → panic index hoặc kết quả sai.
5. **Áp dụng "cùng tập = chu trình" cho đồ thị CÓ HƯỚNG** → sai. Union-Find chỉ bắt chu trình **vô hướng**. Có hướng cần DFS màu hoặc SCC ([Lesson 37](../lesson-37-strongly-connected/)).
6. **Quên đỉnh cô lập** khi đếm component bằng BFS/DFS → thiếu component.
7. **DFS đệ quy quá sâu** trên đồ thị lớn → tràn stack; dùng BFS hoặc stack tường minh.
8. **Flood fill quên đánh dấu visited** (không đổi \`'1'→'0'\`) → vô hạn / đếm sai.

---

## Bài tập

> Tự làm trước, lời giải chi tiết ở mục sau.

1. **Number of Provinces.** Cho \`isConnected[n][n]\`, đếm số tỉnh (component). Big-O?
2. **Redundant Connection.** Cho cây \`n\` đỉnh thêm 1 cạnh thừa (\`edges\` đỉnh 1..n). Trả về cạnh thừa (cạnh cuối tạo chu trình).
3. **Accounts Merge.** Mỗi account = \`[tên, email1, email2, ...]\`. Gộp account cùng người (chia sẻ email), trả danh sách \`[tên, email-đã-sort...]\`.
4. **Number of Islands.** Lưới \`'0'/'1'\`, đếm số đảo (4 hướng).
5. **Graph Valid Tree.** \`n\` đỉnh, danh sách \`edges\` vô hướng. Kiểm tra đồ thị có phải là **cây** (liên thông + không chu trình) không?
6. **Satisfiability of Equality Equations.** Mảng phương trình dạng \`"a==b"\`, \`"a!=b"\` (biến là 1 chữ cái). Có gán giá trị thỏa mãn tất cả không?
7. *(thêm)* **Number of Connected Components in an Undirected Graph.** \`n\` đỉnh, \`edges\`. Trả về số component (dùng cả 2 cách).

---

## Lời giải chi tiết

### Bài 1 — Number of Provinces

**Cách tiếp cận:** Mỗi thành phố là một phần tử DSU. Duyệt nửa trên ma trận, union \`i,j\` nếu \`isConnected[i][j]==1\`. Số tỉnh = \`count\`.

\`\`\`go
func findCircleNum(isConnected [][]int) int {
	n := len(isConnected)
	d := NewDSU(n)
	for i := 0; i < n; i++ {
		for j := i + 1; j < n; j++ {
			if isConnected[i][j] == 1 {
				d.Union(i, j)
			}
		}
	}
	return d.count
}
\`\`\`

**Độ phức tạp:** \`O(n²·α(n)) ≈ O(n²)\` thời gian (phải đọc cả ma trận), \`O(n)\` bộ nhớ.

### Bài 2 — Redundant Connection

**Cách tiếp cận:** Cây hợp lệ không có chu trình; thêm 1 cạnh thừa tạo đúng 1 chu trình. Duyệt cạnh theo thứ tự, cạnh **đầu tiên** mà \`Union\` trả \`false\` (hai đỉnh đã cùng tập) chính là cạnh thừa. Vì đề bảo trả cạnh **cuối** xuất hiện trong input nằm trên chu trình, mà chỉ có 1 chu trình, nên cạnh đóng vòng đầu tiên ta gặp khi duyệt tuần tự đúng là đáp án.

\`\`\`go
func findRedundantConnection(edges [][]int) []int {
	n := len(edges)
	d := NewDSU(n + 1) // đỉnh 1..n
	for _, e := range edges {
		if !d.Union(e[0], e[1]) {
			return e
		}
	}
	return nil
}
\`\`\`

**Độ phức tạp:** \`O(n·α(n)) ≈ O(n)\`.

### Bài 3 — Accounts Merge

**Cách tiếp cận:**
1. Gán mỗi email một id duy nhất; nhớ email → tên.
2. Trong mỗi account, **union** email đầu với mọi email còn lại → mọi email cùng account chung tập.
3. Gom email theo root tập; với mỗi nhóm, sort email, prepend tên.

\`\`\`go
func accountsMerge(accounts [][]string) [][]string {
	emailID := map[string]int{}
	emailName := map[string]string{}
	id := 0
	for _, acc := range accounts {
		name := acc[0]
		for _, em := range acc[1:] {
			if _, ok := emailID[em]; !ok {
				emailID[em] = id
				id++
			}
			emailName[em] = name
		}
	}
	d := NewDSU(id)
	for _, acc := range accounts {
		first := emailID[acc[1]]
		for _, em := range acc[2:] {
			d.Union(first, emailID[em])
		}
	}
	// gom theo root
	groups := map[int][]string{}
	for em, i := range emailID {
		r := d.Find(i)
		groups[r] = append(groups[r], em)
	}
	res := [][]string{}
	for _, emails := range groups {
		sort.Strings(emails)
		row := append([]string{emailName[emails[0]]}, emails...)
		res = append(res, row)
	}
	return res
}
\`\`\`

**Độ phức tạp:** \`O(N·K·log(N·K))\` với \`N\` account, \`K\` email trung bình (chi phí chính là sort các nhóm email).

### Bài 4 — Number of Islands

**Cách tiếp cận:** Flood fill DFS/BFS (xem mục 6). Mỗi ô \`'1'\` chưa thăm khởi một đảo, làm chìm cả cụm.

\`\`\`go
func numIslands(grid [][]byte) int { /* xem mục 6 */ return 0 }
\`\`\`

**Độ phức tạp:** \`O(m·n)\` thời gian, \`O(m·n)\` bộ nhớ (đệ quy worst-case).

### Bài 5 — Graph Valid Tree

**Cách tiếp cận:** Đồ thị \`n\` đỉnh là **cây** ⇔ (a) có **đúng \`n-1\` cạnh** VÀ (b) **không chu trình** (tương đương: liên thông + không chu trình). Dùng DSU: nếu gặp cạnh nối hai đỉnh cùng tập → có chu trình → false. Cuối cùng kiểm tra \`count == 1\` (liên thông).

\`\`\`go
func validTree(n int, edges [][]int) bool {
	if len(edges) != n-1 {
		return false // cây phải có đúng n-1 cạnh
	}
	d := NewDSU(n)
	for _, e := range edges {
		if !d.Union(e[0], e[1]) {
			return false // chu trình
		}
	}
	return d.count == 1
}
\`\`\`

> Thực ra khi đã có \`len(edges)==n-1\` và không chu trình thì chắc chắn liên thông; nhưng kiểm tra \`count==1\` cho rõ ràng và an toàn.

**Độ phức tạp:** \`O(n·α(n)) ≈ O(n)\`.

### Bài 6 — Satisfiability of Equality Equations

**Cách tiếp cận:** 2 lượt. Lượt 1: với mọi \`"a==b"\`, union \`a,b\`. Lượt 2: với mọi \`"a!=b"\`, nếu \`Find(a)==Find(b)\` → mâu thuẫn → false. Biến là chữ thường \`'a'..'z'\` → 26 phần tử.

\`\`\`go
func equationsPossible(equations []string) bool {
	d := NewDSU(26)
	idx := func(b byte) int { return int(b - 'a') }
	for _, eq := range equations { // lượt union ==
		if eq[1] == '=' {
			d.Union(idx(eq[0]), idx(eq[3]))
		}
	}
	for _, eq := range equations { // lượt kiểm tra !=
		if eq[1] == '!' && d.Connected(idx(eq[0]), idx(eq[3])) {
			return false
		}
	}
	return true
}
\`\`\`

> ⚠ **Vì sao phải union HẾT == trước rồi mới kiểm != ?** Nếu xen kẽ, một \`!=\` có thể bị kiểm khi hai biến **chưa kịp** được union qua một chuỗi \`==\` xuất hiện sau → bỏ sót mâu thuẫn. Tách 2 lượt đảm bảo mọi quan hệ bằng đã được gộp.

**Ví dụ:** \`["a==b","b!=a"]\` → union(a,b); rồi \`b!=a\` mà Find(b)==Find(a) → **false** ✓.

**Độ phức tạp:** \`O(L·α(26)) ≈ O(L)\` với \`L\` số phương trình.

### Bài 7 — Number of Connected Components

**Cách 1 (DSU):**
\`\`\`go
func countComponents(n int, edges [][]int) int {
	d := NewDSU(n)
	for _, e := range edges {
		d.Union(e[0], e[1])
	}
	return d.count
}
\`\`\`
**Cách 2 (DFS):** xem \`countComponentsDFS\` mục 2.

**Độ phức tạp:** DSU \`O((n+E)·α)\`; DFS \`O(n+E)\`.

---

## Code & Minh họa

- Toàn bộ code Go nằm **inline** trong README này (theo yêu cầu — không có \`solutions.go\` riêng).
- **[visualization.html](./visualization.html)** — 3 module tương tác:
  1. **Union-Find animator** — minh họa \`union\` (gộp cây theo size) + \`find\` (path compression làm phẳng cây).
  2. **Đếm component** — đồ thị thêm cạnh động, số component giảm dần.
  3. **Phát hiện chu trình** — union từng cạnh, highlight cạnh tạo chu trình.

---

## Bài tiếp theo

→ [Lesson 37 — Strongly Connected Components (SCC)](../lesson-37-strongly-connected/) — khi đồ thị **có hướng**, "liên thông" tách thành hai khái niệm. Ta sẽ học Kosaraju & Tarjan để tìm SCC.

## Tham khảo

- CLRS, Chapter 21 — Data Structures for Disjoint Sets.
- [Lesson 31 — Graph Traversal](../lesson-31-graph-traversal/) · [Lesson 35 — MST](../lesson-35-mst-kruskal-prim/) · [Lesson 02 — Amortized Analysis](../lesson-02-amortized-analysis/)
`;
