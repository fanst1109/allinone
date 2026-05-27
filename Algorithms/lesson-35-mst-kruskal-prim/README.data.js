// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: Algorithms/lesson-35-mst-kruskal-prim/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 35 — Cây khung nhỏ nhất (Minimum Spanning Tree): Kruskal & Prim

> **Tier 5 — Thuật toán đồ thị.** Bài này dạy hai thuật toán greedy kinh điển để tìm **cây khung nhỏ nhất (Minimum Spanning Tree — MST)**: **Kruskal** (sort cạnh + Union-Find) và **Prim** (grow cây + min-heap). Cả hai đều dựa trên một định lý đẹp duy nhất — **cut property** — và cho ra kết quả tối ưu.

## Mục tiêu học tập

Sau bài này bạn sẽ:

1. Hiểu **cây khung (spanning tree)** và **cây khung nhỏ nhất (MST)** là gì, vì sao MST có đúng \`V-1\` cạnh.
2. Phát biểu và dùng được **cut property** — viên gạch nền chứng minh cả Kruskal lẫn Prim đúng.
3. Cài đặt **Kruskal** với **Union-Find** (path compression + union by rank).
4. Cài đặt **Prim** với **min-heap** (cấu trúc gần giống Dijkstra).
5. So sánh Kruskal vs Prim, biết khi nào chọn cái nào.
6. Hiểu MST **không duy nhất** nhưng **tổng trọng số thì duy nhất**.
7. Áp dụng MST: thiết kế mạng, **clustering** (cắt \`k-1\` cạnh nặng nhất), xấp xỉ TSP, maze generation.
8. Tránh các cạm bẫy: quên Union-Find, đồ thị không liên thông, đồ thị có hướng, trọng số âm.

## Kiến thức tiền đề

- [Lesson 31 — Duyệt đồ thị (BFS/DFS)](../lesson-31-graph-traversal/) — biểu diễn đồ thị, khái niệm liên thông.
- [Lesson 33 — Dijkstra](../lesson-33-dijkstra/) — Prim có cấu trúc gần như y hệt Dijkstra (đổi điều kiện relax).
- [Lesson 19 — Greedy fundamentals](../lesson-19-greedy-fundamentals/) — MST là ví dụ greedy đẹp nhất, dùng exchange argument.
- [DataStructures — Union-Find / Disjoint Set](../../DataStructures/index.html) — cấu trúc lõi cho Kruskal.
- Sẽ gặp lại: [Lesson 36 — Connected Components & Union-Find](../lesson-36-connected-components/) (Union-Find sâu hơn), [Lesson 49 — TSP & Approximation](../tier-8-problem-solving/index.html) (MST làm cận dưới / 2-approximation).

---

## 1. Spanning tree & MST

### 1.1 Cây khung là gì?

> **💡 Trực giác / Hình dung.** Bạn có \`V\` thành phố và một loạt **tuyến cáp tiềm năng** (cạnh) giữa chúng, mỗi tuyến có chi phí lắp đặt. Bạn muốn **mọi thành phố đều kết nối được với nhau** (có đường đi giữa hai thành phố bất kỳ) nhưng **không lãng phí**: không lắp dư tuyến nào tạo thành vòng kín. Tập tuyến cáp tối thiểu nối hết mọi thành phố — đó chính là một **cây khung**.

Cho đồ thị **vô hướng, liên thông, có trọng số** \`G = (V, E)\`. Một **cây khung (spanning tree)** \`T\` là tập con các cạnh sao cho:

1. **Phủ hết đỉnh** — \`T\` chạm tới mọi đỉnh (mọi đỉnh đều kết nối).
2. **Liên thông** — từ đỉnh bất kỳ đi tới đỉnh bất kỳ trong \`T\`.
3. **Không có chu trình** — \`T\` là một cây (tree).

> **Định lý số cạnh.** Mọi cây khung của đồ thị \`V\` đỉnh có **đúng \`V-1\` cạnh**.
>
> **Vì sao?** Một cây \`n\` đỉnh luôn có \`n-1\` cạnh (chứng minh quy nạp: thêm 1 đỉnh lá cần thêm đúng 1 cạnh). Nếu có \`< V-1\` cạnh → không thể liên thông. Nếu có \`> V-1\` cạnh → chắc chắn có chu trình (thừa cạnh).

### 1.2 Cây khung nhỏ nhất (MST)

**Trọng số của cây khung** = tổng trọng số các cạnh trong nó. **MST** là cây khung có **tổng trọng số nhỏ nhất** trong tất cả các cây khung khả dĩ.

> **❓ Câu hỏi tự nhiên.** "Số cây khung có nhiều không, sao không thử hết?" — Rất nhiều! Theo **định lý Cayley**, đồ thị đầy đủ \`K_n\` có \`n^(n-2)\` cây khung. Với \`n=10\` đã là \`10^8 = 100\` triệu cây. Không thể brute-force → cần thuật toán greedy thông minh.

**Ví dụ số cụ thể** — đồ thị 4 đỉnh \`A, B, C, D\`:

\`\`\`
Cạnh:   A-B = 1    A-C = 3    B-C = 1    B-D = 4    C-D = 2
\`\`\`

Vài cây khung khả dĩ (mỗi cây 3 cạnh = \`V-1 = 4-1\`):

| Cây khung | Cạnh | Tổng trọng số |
|-----------|------|:---:|
| T1 | A-B(1), B-C(1), C-D(2) | **4** ← MST |
| T2 | A-B(1), A-C(3), C-D(2) | 6 |
| T3 | A-B(1), B-C(1), B-D(4) | 6 |
| T4 | A-C(3), B-C(1), B-D(4) | 8 |

→ **MST = {A-B, B-C, C-D}** với tổng \`4\`.

### 1.3 Ứng dụng thực tế

- **Thiết kế mạng chi phí thấp nhất**: cáp quang, đường ống nước, lưới điện, đường giao thông nối các điểm với tổng chi phí nhỏ nhất.
- **Clustering**: cắt \`k-1\` cạnh nặng nhất của MST → chia thành \`k\` cụm tự nhiên (mục 8).
- **Xấp xỉ TSP**: MST cho cận dưới và thuật toán 2-approximation cho Travelling Salesman.
- **Maze generation**: random MST của lưới ô vuông → mê cung không vòng kín.
- **Phân tích ảnh / image segmentation**: tách vùng theo độ tương đồng pixel.

> **🔁 Dừng lại tự kiểm tra.**
> 1. Đồ thị 7 đỉnh, MST có bao nhiêu cạnh?
> 2. MST có thể chứa chu trình không?
>
> <details><summary>Đáp án</summary>
>
> 1. \`7 - 1 = 6\` cạnh.
> 2. Không bao giờ — MST là một cây, theo định nghĩa không có chu trình.
> </details>

> **📝 Tóm tắt mục 1.**
> - Cây khung: nối hết đỉnh, liên thông, không chu trình → đúng \`V-1\` cạnh.
> - MST: cây khung có tổng trọng số nhỏ nhất.
> - Số cây khung bùng nổ tổ hợp (\`n^(n-2)\`) → cần greedy, không brute-force.
> - Ứng dụng: thiết kế mạng, clustering, xấp xỉ TSP, maze.

---

## 2. Cut property — viên gạch nền

> **💡 Trực giác / Hình dung.** Tưởng tượng bạn lấy kéo cắt đồ thị làm **hai phần** bất kỳ (một số đỉnh bên trái, phần còn lại bên phải). Mọi cạnh "vắt qua nhát cắt" này là ứng viên để nối hai phần. **Cạnh nhẹ nhất vắt qua nhát cắt chắc chắn nằm trong MST** — vì nếu MST dùng cạnh nặng hơn, ta luôn có thể đổi sang cạnh nhẹ này để giảm tổng.

**Định nghĩa cut (nhát cắt).** Một **cut** \`(S, V\\S)\` là cách chia tập đỉnh \`V\` thành hai phần không rỗng \`S\` và \`V\\S\`. Một cạnh **vắt qua cut** nếu một đầu thuộc \`S\`, đầu kia thuộc \`V\\S\`.

> **Cut property (định lý cắt).** Với một cut bất kỳ, nếu cạnh \`e\` là cạnh **nhẹ nhất** vắt qua cut đó (và là duy nhất nhẹ nhất), thì \`e\` **thuộc mọi MST**.

### 2.1 Chứng minh từng bước (exchange argument)

Giả sử \`e = (u, v)\` là cạnh nhẹ nhất qua cut \`(S, V\\S)\`, với \`u ∈ S, v ∈ V\\S\`. Giả sử có một MST \`T\` **không** chứa \`e\`. Ta chứng minh có thể "đổi" để được cây khung tốt hơn hoặc bằng → mâu thuẫn (nếu \`e\` nhẹ nhất duy nhất).

**Bước 1.** Thêm \`e\` vào \`T\`. Vì \`T\` đã là cây khung (nối mọi đỉnh), thêm 1 cạnh nữa tạo ra **đúng một chu trình** \`C\` chứa \`e\`.

**Bước 2.** Chu trình \`C\` đi từ \`u ∈ S\` tới \`v ∈ V\\S\` rồi quay về. Vì nó bắt đầu trong \`S\` và kết thúc cũng quay về \`u\`, nó phải **vắt qua cut ít nhất 2 lần**. Ngoài \`e\`, tồn tại một cạnh khác \`e' ∈ C\` cũng vắt qua cut.

**Bước 3.** Vì \`e\` là cạnh nhẹ nhất qua cut nên \`w(e) ≤ w(e')\` (nhẹ nhất duy nhất → \`w(e) < w(e')\`).

**Bước 4.** Tạo cây mới \`T' = T - e' + e\`. Bỏ một cạnh trên chu trình \`C\` thì phá vỡ chu trình → \`T'\` vẫn là cây khung (vẫn \`V-1\` cạnh, vẫn liên thông).

**Bước 5.** \`w(T') = w(T) - w(e') + w(e) < w(T)\` (vì \`w(e) < w(e')\`). Vậy \`T'\` tốt hơn \`T\` → mâu thuẫn với \`T\` là MST. ∎

> **Kết luận:** Cả Kruskal và Prim hoạt động bằng cách **lặp đi lặp lại chọn cạnh nhẹ nhất qua một cut** — nên cả hai đều đúng. Khác nhau chỉ ở *chọn cut nào*.

> **⚠ Lỗi thường gặp.** Cut property nói "cạnh nhẹ nhất qua cut **này** thuộc MST", KHÔNG nói "cạnh nhẹ nhất toàn đồ thị là cạnh duy nhất an toàn". Cũng có **cycle property** đối ngẫu: cạnh **nặng nhất** trên một chu trình bất kỳ **không** thuộc MST (loại nó ra an toàn).

> **❓ Câu hỏi tự nhiên.** "Nếu trọng số trùng (không có 'nhẹ nhất duy nhất') thì sao?" — Định lý vẫn đúng dạng yếu hơn: tồn tại *một* MST chứa cạnh nhẹ nhất đó. Khi trọng số trùng, MST có thể không duy nhất (mục 7), nhưng greedy vẫn cho ra một MST hợp lệ.

> **🔁 Dừng lại tự kiểm tra.** Cho cut \`S = {A, B}\`, \`V\\S = {C, D}\` trong ví dụ mục 1.2. Các cạnh nào vắt qua cut? Cạnh nào nhẹ nhất?
>
> <details><summary>Đáp án</summary>
> Cạnh vắt qua: A-C(3), B-C(1), B-D(4). Nhẹ nhất = B-C(1) → thuộc MST. Đúng vậy, MST mục 1.2 có chứa B-C.
> </details>

> **📝 Tóm tắt mục 2.**
> - Cut = chia đỉnh thành 2 phần. Cạnh vắt qua = nối 2 phần.
> - Cut property: cạnh nhẹ nhất qua một cut bất kỳ thuộc MST (greedy đúng).
> - Chứng minh bằng exchange argument: đổi cạnh nặng trên chu trình lấy cạnh nhẹ.
> - Cycle property đối ngẫu: cạnh nặng nhất trên một chu trình KHÔNG thuộc MST.

---

## 3. Thuật toán Kruskal

> **💡 Trực giác.** Kruskal nhìn cạnh từ **rẻ nhất tới đắt nhất**. Mỗi cạnh: "nếu thêm nó mà KHÔNG tạo vòng kín thì thêm, ngược lại bỏ". Như xây cầu nối các đảo: luôn xây cây cầu rẻ nhất còn lại, miễn là nó nối hai cụm đảo CHƯA thông nhau.

### 3.1 Ý tưởng

1. **Sort** tất cả cạnh theo trọng số **tăng dần**.
2. Duyệt từng cạnh \`(u, v, w)\`:
   - Nếu \`u\` và \`v\` **đang ở hai thành phần khác nhau** → thêm cạnh (không tạo chu trình), **gộp** hai thành phần.
   - Nếu cùng thành phần → thêm sẽ tạo chu trình → **bỏ**.
3. Dừng khi đã chọn đủ \`V-1\` cạnh.

Kiểm tra "cùng thành phần hay không" và "gộp hai thành phần" chính là việc của **Union-Find** (mục 4).

### 3.2 Walk-through đồ thị cụ thể

Đồ thị 5 đỉnh \`0,1,2,3,4\`:

\`\`\`
Cạnh:  0-1 = 2   0-3 = 6   1-2 = 3   1-3 = 8   1-4 = 5   2-4 = 7   3-4 = 9
\`\`\`

**Sort tăng dần:** \`0-1(2), 1-2(3), 1-4(5), 0-3(6), 2-4(7), 1-3(8), 3-4(9)\`.

Duyệt (mỗi đỉnh ban đầu là một thành phần riêng \`{0}{1}{2}{3}{4}\`):

| Bước | Cạnh | find(u) ≠ find(v)? | Hành động | Thành phần sau | MST hiện tại |
|:---:|:---:|:---:|:---|:---|:---:|
| 1 | 0-1 (2) | ✓ ({0}≠{1}) | **Thêm**, union | {0,1}{2}{3}{4} | 2 |
| 2 | 1-2 (3) | ✓ ({0,1}≠{2}) | **Thêm**, union | {0,1,2}{3}{4} | 5 |
| 3 | 1-4 (5) | ✓ ({0,1,2}≠{4}) | **Thêm**, union | {0,1,2,4}{3} | 10 |
| 4 | 0-3 (6) | ✓ ({0,1,2,4}≠{3}) | **Thêm**, union | {0,1,2,3,4} | 16 |
| 5 | 2-4 (7) | ✗ (cùng {0,1,2,3,4}) | **Bỏ** (chu trình) | — | 16 |
| — | — | — | Đã đủ 4 cạnh → DỪNG | — | — |

→ **MST = {0-1, 1-2, 1-4, 0-3}**, tổng trọng số = \`2+3+5+6 = 16\`.

Chú ý bước 5: cạnh \`2-4(7)\` bị từ chối vì 2 và 4 đã cùng thành phần — thêm vào sẽ tạo chu trình \`2-1-4-2\`.

### 3.3 Code Go — Kruskal (dùng Union-Find ở mục 4)

\`\`\`go
package main

import (
	"fmt"
	"sort"
)

// Edge: cạnh vô hướng có trọng số.
type Edge struct {
	U, V, W int
}

// Kruskal trả về (danh sách cạnh MST, tổng trọng số).
// V = số đỉnh (đánh số 0..V-1). edges = tất cả cạnh.
func Kruskal(V int, edges []Edge) ([]Edge, int) {
	// Bước 1: sort cạnh theo trọng số tăng dần — O(E log E).
	sort.Slice(edges, func(i, j int) bool {
		return edges[i].W < edges[j].W
	})

	uf := NewUnionFind(V) // Union-Find ở mục 4.
	mst := make([]Edge, 0, V-1)
	total := 0

	// Bước 2: duyệt cạnh đã sort.
	for _, e := range edges {
		// find khác nhau → hai đầu chưa cùng thành phần → thêm an toàn (không chu trình).
		if uf.Find(e.U) != uf.Find(e.V) {
			uf.Union(e.U, e.V) // gộp hai thành phần
			mst = append(mst, e)
			total += e.W
			if len(mst) == V-1 { // đủ V-1 cạnh → MST hoàn chỉnh
				break
			}
		}
		// cùng thành phần → bỏ qua (thêm sẽ tạo chu trình)
	}
	return mst, total
}

func main() {
	edges := []Edge{
		{0, 1, 2}, {0, 3, 6}, {1, 2, 3},
		{1, 3, 8}, {1, 4, 5}, {2, 4, 7}, {3, 4, 9},
	}
	mst, total := Kruskal(5, edges)
	fmt.Println("MST cạnh:", mst) // [{0 1 2} {1 2 3} {1 4 5} {0 3 6}]
	fmt.Println("Tổng:", total)   // 16
}
\`\`\`

**Độ phức tạp:** sort \`O(E log E)\` thống trị. Phần Union-Find là \`O(E · α(V))\` ≈ \`O(E)\` (xem mục 4). Vì \`E ≤ V²\` nên \`log E ≤ 2 log V\`, ta thường viết \`O(E log E)\` hoặc tương đương \`O(E log V)\`.

> **⚠ Lỗi thường gặp.** Nếu KHÔNG dùng Union-Find mà kiểm tra chu trình bằng cách duyệt đồ thị (BFS/DFS) mỗi lần thêm cạnh → mỗi check tốn \`O(V)\` → tổng \`O(E·V)\`, chậm hơn hẳn. Union-Find biến mỗi check thành ~\`O(1)\` amortized.

> **📝 Tóm tắt mục 3.**
> - Kruskal: sort cạnh tăng dần, greedy thêm cạnh không tạo chu trình.
> - Check chu trình = Union-Find \`find(u) != find(v)\`.
> - Dừng khi đủ \`V-1\` cạnh. \`O(E log E)\`.

---

## 4. Union-Find recap (Disjoint Set Union)

> **💡 Trực giác.** Union-Find quản lý các **nhóm** phần tử. Hai thao tác: **Find(x)** = "x thuộc nhóm nào?" (trả về đại diện/gốc của nhóm), **Union(x, y)** = "gộp nhóm của x và y làm một". Như quản lý "ai là bạn của ai" trong mạng xã hội: hỏi "A và B cùng nhóm bạn không?" và "kết bạn A với B → gộp 2 nhóm".

### 4.1 Cấu trúc cơ bản

Mỗi phần tử trỏ tới **cha** của nó. Gốc của một cây = đại diện của nhóm đó. \`Find\` đi ngược lên gốc; \`Union\` gắn gốc này dưới gốc kia.

### 4.2 Hai tối ưu

- **Union by rank**: luôn gắn cây **thấp** vào cây **cao** hơn → cây không cao lên vô tội vạ. Giữ chiều cao \`O(log n)\`.
- **Path compression**: trong \`Find(x)\`, sau khi tìm ra gốc, **trỏ thẳng** mọi nút trên đường đi tới gốc → lần sau truy vấn \`O(1)\`.

Kết hợp cả hai → mỗi thao tác **gần \`O(1)\`** (chính xác là \`O(α(n))\`, với \`α\` là hàm Ackermann ngược — thực tế ≤ 4 cho mọi \`n\` trong vũ trụ).

### 4.3 Walk-through path compression

Giả sử chuỗi cha: \`3 → 2 → 1 → 0\` (0 là gốc). Gọi \`Find(3)\`:

1. Đi \`3 → 2 → 1 → 0\`, tìm ra gốc = \`0\`.
2. **Nén đường**: gán \`parent[3] = 0\`, \`parent[2] = 0\`, \`parent[1] = 0\`.
3. Lần sau \`Find(3)\`, \`Find(2)\`, \`Find(1)\` đều trả về \`0\` ngay trong **1 bước**.

### 4.4 Code Go — Union-Find

\`\`\`go
// UnionFind với path compression + union by rank.
type UnionFind struct {
	parent []int
	rank   []int // chiều cao xấp xỉ của cây gốc tại i
}

func NewUnionFind(n int) *UnionFind {
	uf := &UnionFind{
		parent: make([]int, n),
		rank:   make([]int, n),
	}
	for i := range uf.parent {
		uf.parent[i] = i // ban đầu mỗi phần tử là nhóm riêng (cha = chính nó)
	}
	return uf
}

// Find: tìm gốc của x, kèm path compression.
func (uf *UnionFind) Find(x int) int {
	if uf.parent[x] != x {
		uf.parent[x] = uf.Find(uf.parent[x]) // nén: trỏ thẳng tới gốc
	}
	return uf.parent[x]
}

// Union: gộp nhóm của x và y. Trả về false nếu đã cùng nhóm.
func (uf *UnionFind) Union(x, y int) bool {
	rx, ry := uf.Find(x), uf.Find(y)
	if rx == ry {
		return false // đã cùng nhóm → không gộp (Kruskal: cạnh này tạo chu trình)
	}
	// union by rank: gắn cây thấp vào cây cao.
	if uf.rank[rx] < uf.rank[ry] {
		rx, ry = ry, rx
	}
	uf.parent[ry] = rx
	if uf.rank[rx] == uf.rank[ry] {
		uf.rank[rx]++ // hai cây cùng cao → cây mới cao thêm 1
	}
	return true
}
\`\`\`

> **❓ Câu hỏi tự nhiên.** "Sao \`Find\` đệ quy lại nén được đường?" — Dòng \`uf.parent[x] = uf.Find(uf.parent[x])\` chạy \`Find\` cho cha trước (lấy gốc), rồi gán gốc đó làm cha mới của \`x\`. Đệ quy lan tới mọi nút trên đường → tất cả trỏ thẳng gốc.

> **🔁 Dừng lại tự kiểm tra.** Với 5 phần tử mới khởi tạo, gọi \`Union(0,1)\`, \`Union(2,3)\`, \`Union(1,3)\`. Sau cùng \`Find(0)\` và \`Find(2)\` có bằng nhau không?
>
> <details><summary>Đáp án</summary>
> Có. \`Union(0,1)\`→{0,1}; \`Union(2,3)\`→{2,3}; \`Union(1,3)\` gộp {0,1} với {2,3} → {0,1,2,3}. Nên \`Find(0) == Find(2)\`.
> </details>

> **📝 Tóm tắt mục 4.**
> - Union-Find: Find (tìm gốc) + Union (gộp nhóm).
> - Path compression + union by rank → gần \`O(1)\` mỗi thao tác (\`α(n) ≤ 4\`).
> - Lõi của Kruskal; sẽ học sâu hơn ở [Lesson 36](../lesson-36-connected-components/).

---

## 5. Thuật toán Prim

> **💡 Trực giác.** Prim trồng MST như **cây leo**: bắt đầu từ một đỉnh, mỗi bước "vươn ra" thêm **cạnh nhẹ nhất nối phần cây hiện có với một đỉnh chưa nằm trong cây**. Như xây mạng điện từ một trạm gốc, luôn kéo đường dây rẻ nhất tới nhà chưa nối.

### 5.1 Ý tưởng

1. Bắt đầu với một đỉnh bất kỳ trong cây \`T\`.
2. Lặp: trong tất cả cạnh nối **đỉnh trong \`T\`** với **đỉnh ngoài \`T\`**, chọn cạnh **nhẹ nhất** → thêm cạnh đó và đỉnh ngoài vào \`T\`.
3. Dừng khi \`T\` chứa hết \`V\` đỉnh (\`V-1\` cạnh).

Việc "tìm cạnh nhẹ nhất nối ra ngoài" được làm hiệu quả bằng **min-heap** (priority queue) chứa các cạnh biên. Đây chính là cut property với cut = \`(T, V\\T)\`.

### 5.2 Walk-through (cùng đồ thị mục 3.2)

\`\`\`
Cạnh:  0-1 = 2   0-3 = 6   1-2 = 3   1-3 = 8   1-4 = 5   2-4 = 7   3-4 = 9
\`\`\`

Bắt đầu từ đỉnh \`0\`. \`inMST = {0}\`. Heap chứa cạnh biên từ 0: \`(0-1,2), (0-3,6)\`.

| Bước | Pop cạnh nhẹ nhất | Đỉnh mới? | Hành động | inMST | Heap sau (cạnh biên mới) | MST |
|:---:|:---:|:---:|:---|:---|:---|:---:|
| 1 | (0-1, 2) | 1 ngoài | **Thêm** 1 | {0,1} | push (1-2,3),(1-3,8),(1-4,5) | 2 |
| 2 | (1-2, 3) | 2 ngoài | **Thêm** 2 | {0,1,2} | push (2-4,7) | 5 |
| 3 | (1-4, 5) | 4 ngoài | **Thêm** 4 | {0,1,2,4} | push (3-4,9) | 10 |
| 4 | (0-3, 6) | 3 ngoài | **Thêm** 3 | {0,1,2,3,4} | — | 16 |
| 5 | (2-4, 7) | 4 trong | **Bỏ** (lỗi thời) | — | — | 16 |

→ **MST = {0-1, 1-2, 1-4, 0-3}**, tổng = \`16\`. **Giống hệt Kruskal** (đồ thị này MST duy nhất).

Chú ý bước 5: cạnh \`(2-4,7)\` pop ra nhưng \`4\` đã trong cây → bỏ (cạnh "lỗi thời" — stale).

### 5.3 Prim giống Dijkstra ở chỗ nào?

Cả hai dùng min-heap để lấy "đỉnh/cạnh tốt nhất tiếp theo". Khác biệt **một dòng**:

- **Dijkstra**: ưu tiên theo \`dist[u] + w(u,v)\` (tổng đường đi từ nguồn).
- **Prim**: ưu tiên theo \`w(u,v)\` **đơn lẻ** (chỉ trọng số cạnh nối vào cây).

> **⚠ Lỗi thường gặp.** Nhầm điều kiện cập nhật của Prim thành kiểu Dijkstra (\`key[v] = key[u] + w\` thay vì \`key[v] = w\`). Prim chỉ quan tâm **chi phí nối thêm một đỉnh**, không cộng dồn đường đi.

### 5.4 Code Go — Prim (min-heap)

\`\`\`go
import "container/heap"

// item trong heap: cạnh tới đỉnh \`to\` với trọng số \`w\`.
type pqItem struct {
	to, w int
}
type minHeap []pqItem

func (h minHeap) Len() int            { return len(h) }
func (h minHeap) Less(i, j int) bool  { return h[i].w < h[j].w }
func (h minHeap) Swap(i, j int)       { h[i], h[j] = h[j], h[i] }
func (h *minHeap) Push(x interface{}) { *h = append(*h, x.(pqItem)) }
func (h *minHeap) Pop() interface{} {
	old := *h
	n := len(old)
	it := old[n-1]
	*h = old[:n-1]
	return it
}

// Prim trả về tổng trọng số MST. adj[u] = danh sách (đỉnh kề, trọng số).
// start = đỉnh khởi đầu. Giả định đồ thị liên thông.
func Prim(V int, adj [][]pqItem, start int) int {
	inMST := make([]bool, V)
	h := &minHeap{{to: start, w: 0}} // đỉnh start, chi phí 0
	total := 0
	count := 0

	for h.Len() > 0 && count < V {
		it := heap.Pop(h).(pqItem)
		if inMST[it.to] {
			continue // cạnh lỗi thời (đỉnh đã trong cây) → bỏ
		}
		inMST[it.to] = true // thêm đỉnh vào cây
		total += it.w
		count++

		// đẩy mọi cạnh biên mới ra heap
		for _, e := range adj[it.to] {
			if !inMST[e.to] {
				heap.Push(h, pqItem{to: e.to, w: e.w})
			}
		}
	}
	return total
}
\`\`\`

**Độ phức tạp:** mỗi cạnh push/pop heap một lần → \`O(E log E)\` = \`O(E log V)\`. Với heap giảm-khoá (decrease-key) lý thuyết \`O((V+E) log V)\`; với Fibonacci heap \`O(E + V log V)\`.

> **❓ Câu hỏi tự nhiên.** "Sao có thể push cùng một đỉnh nhiều lần?" — Đúng vậy, ta dùng "lazy heap": một đỉnh ngoài có thể có nhiều cạnh biên trong heap. Khi pop ra mà đỉnh đã trong cây thì bỏ (dòng \`if inMST\`). Đơn giản hơn decrease-key, chỉ tốn thêm hằng số.

> **🔁 Dừng lại tự kiểm tra.** Nếu Prim bắt đầu từ đỉnh \`2\` thay vì \`0\` (đồ thị mục 5.2), MST weight có đổi không?
>
> <details><summary>Đáp án</summary>
> Không. MST weight luôn = 16 bất kể đỉnh khởi đầu (MST weight là bất biến của đồ thị). Tập cạnh cũng giống vì đồ thị này MST duy nhất.
> </details>

> **📝 Tóm tắt mục 5.**
> - Prim: grow cây từ 1 đỉnh, mỗi bước thêm cạnh nhẹ nhất nối cây ↔ đỉnh ngoài.
> - Dùng min-heap (lazy: bỏ cạnh tới đỉnh đã trong cây).
> - Cấu trúc giống Dijkstra; khác ở key = \`w(u,v)\` chứ không cộng dồn.

---

## 6. Kruskal vs Prim

| Tiêu chí | Kruskal | Prim |
|----------|---------|------|
| **Tư duy** | Sort cạnh, gộp các "rừng" nhỏ | Grow một cây từ một đỉnh |
| **Cấu trúc** | Union-Find | Min-heap |
| **Độ phức tạp** | \`O(E log E)\` | \`O((V+E) log V)\` ≈ \`O(E log V)\` |
| **Tốt cho** | Đồ thị **thưa** (\`E ≈ V\`) | Đồ thị **dày** (\`E ≈ V²\`) |
| **Xử lý cạnh** | Toàn cục (sort tất cả) | Cục bộ (chỉ cạnh biên) |
| **Đồ thị không liên thông** | Tự nhiên cho **rừng khung** mỗi thành phần | Chỉ phủ thành phần chứa \`start\` |
| **Greedy** | ✓ (cut property) | ✓ (cut property) |
| **Kết quả** | MST tối ưu | MST tối ưu |

> **💡 Khi nào chọn cái nào?**
> - **Kruskal** tốt khi cạnh đã có sẵn dạng danh sách và đồ thị thưa. Cũng tiện cho clustering (dừng sớm khi đủ cụm).
> - **Prim** tốt khi đồ thị dày hoặc cho dưới dạng **adjacency matrix** (Prim phiên bản \`O(V²)\` không cần heap, rất nhanh khi \`E ≈ V²\`).

> **❓ Câu hỏi tự nhiên.** "Hai thuật toán có luôn cho cùng tập cạnh không?" — KHÔNG nhất thiết. Cả hai cho **cùng tổng trọng số** (MST weight duy nhất), nhưng nếu có **trọng số trùng**, tập cạnh có thể khác nhau (mục 7).

> **📝 Tóm tắt mục 6.**
> - Kruskal \`O(E log E)\` + Union-Find, hợp đồ thị thưa.
> - Prim \`O(E log V)\` + heap (hoặc \`O(V²)\`), hợp đồ thị dày.
> - Cả hai greedy, đều cho MST tối ưu, cùng MST weight.

---

## 7. MST không duy nhất — nhưng weight thì duy nhất

> **Định lý.** Nếu **tất cả trọng số cạnh đôi một khác nhau**, MST là **duy nhất**. Nếu có trọng số trùng, có thể có **nhiều MST**, nhưng **tổng trọng số (MST weight) luôn duy nhất**.

**Ví dụ số cụ thể** — tam giác 3 đỉnh \`A, B, C\` với hai cạnh trùng trọng số:

\`\`\`
A-B = 1    B-C = 1    A-C = 2
\`\`\`

MST cần \`V-1 = 2\` cạnh, tổng nhỏ nhất:

- MST₁ = {A-B(1), B-C(1)} → tổng \`2\`.
- MST₂ = {A-B(1), A-C(2)} → tổng \`3\` ✗ (không tối ưu).

Ở đây MST duy nhất. Nhưng đổi \`A-C = 1\`:

\`\`\`
A-B = 1    B-C = 1    A-C = 1   (cả ba bằng nhau)
\`\`\`

- MST = bất kỳ **2 trong 3** cạnh → **3 MST khác nhau**, đều có tổng \`2\`.

→ Tập cạnh khác nhau, nhưng **weight = 2 duy nhất**. Kruskal và Prim đều ra weight \`2\` nhưng có thể chọn tập cạnh khác (tùy thứ tự sort / đỉnh khởi đầu).

> **⚠ Lỗi thường gặp.** Khi chấm bài đánh giá MST, **so sánh tổng weight**, đừng so sánh tập cạnh — đề có trọng số trùng thì nhiều đáp án đúng.

> **📝 Tóm tắt mục 7.** Trọng số đôi một khác nhau → MST duy nhất. Trùng → nhiều MST nhưng cùng weight.

---

## 8. Ứng dụng

### 8.1 Network design (thiết kế mạng)

Bài toán gốc: nối \`V\` điểm với tổng chi phí cáp/đường nhỏ nhất → đúng định nghĩa MST. Xem bài tập 6.2 (connect cities) và 6.4 (connect points).

### 8.2 Clustering bằng MST (single-linkage)

> **💡 Trực giác.** MST nối mọi đỉnh bằng các cạnh nhẹ. Cạnh **nặng** trong MST = nối hai cụm **xa nhau**. Cắt \`k-1\` cạnh nặng nhất → MST vỡ thành \`k\` cây con = \`k\` **cụm tự nhiên**.

**Ý tưởng:** xây MST, sort cạnh MST giảm dần, **bỏ \`k-1\` cạnh nặng nhất** → còn \`k\` thành phần liên thông = \`k\` cụm.

**Walk-through** — đồ thị mục 3.2 có MST \`{0-1(2), 1-2(3), 1-4(5), 0-3(6)}\`, muốn \`k=2\` cụm: bỏ \`1\` cạnh nặng nhất = \`0-3(6)\`. Còn \`{0-1, 1-2, 1-4}\` → cụm \`{0,1,2,4}\` và cụm \`{3}\`.

\`\`\`go
// MSTClustering chia V đỉnh thành k cụm bằng cách cắt k-1 cạnh nặng nhất của MST.
// Trả về nhãn cụm cho mỗi đỉnh (đỉnh cùng nhãn = cùng cụm).
func MSTClustering(V int, edges []Edge, k int) []int {
	mst, _ := Kruskal(V, edges) // mst đã đủ V-1 cạnh, sort tăng dần theo Kruskal

	// Giữ lại (V-1)-(k-1) = V-k cạnh nhẹ nhất; bỏ k-1 cạnh nặng nhất.
	keep := V - k
	if keep < 0 {
		keep = 0
	}

	uf := NewUnionFind(V)
	for i := 0; i < keep; i++ { // chỉ union các cạnh nhẹ được giữ
		uf.Union(mst[i].U, mst[i].V)
	}

	// gán nhãn cụm = gốc Union-Find
	label := make([]int, V)
	for i := 0; i < V; i++ {
		label[i] = uf.Find(i)
	}
	return label
}
\`\`\`

> **❓ Câu hỏi tự nhiên.** "Vì sao cắt cạnh NẶNG nhất chứ không phải nhẹ nhất?" — Cạnh nặng trong MST nối hai vùng vốn cách xa (mọi cạnh khác giữa chúng còn nặng hơn, vì MST đã chọn nhẹ nhất qua cut). Cắt nó tách đúng hai vùng "tách biệt nhất".

### 8.3 Xấp xỉ TSP (2-approximation)

Travelling Salesman Problem (TSP) là NP-hard. Nhưng với metric TSP (thỏa bất đẳng thức tam giác), thuật toán dựa MST cho tour ≤ \`2 × OPT\`: xây MST → DFS preorder → shortcut. MST cũng là **cận dưới** của tour tối ưu. Học kỹ ở [Lesson 49 — TSP & Approximation](../tier-8-problem-solving/index.html).

### 8.4 Maze generation

Lưới ô vuông, mỗi ô là đỉnh, tường giữa hai ô kề là cạnh với trọng số ngẫu nhiên. Random MST (Kruskal/Prim) → mê cung **không vòng kín, mọi ô đều tới được**.

> **📝 Tóm tắt mục 8.** MST → network design, clustering (cắt \`k-1\` cạnh nặng), 2-approximation TSP, maze generation.

---

## 9. Second-best MST & Steiner tree (nhắc qua)

### 9.1 Second-best MST

**Cây khung nhỏ nhì** = cây khung có tổng weight nhỏ nhất trong các cây khung **khác** MST. Ý tưởng: second-best MST **chỉ khác MST đúng một cạnh**. Với mỗi **cạnh không thuộc MST** \`(u,v,w)\`, thêm nó vào tạo chu trình; bỏ cạnh **nặng nhất khác \`(u,v)\`** trên chu trình đó → một cây khung khác. Lấy min các kết quả này = second-best MST. Tính cạnh nặng nhất trên đường \`u→v\` trong MST bằng LCA / binary lifting → \`O(E log V)\`.

### 9.2 Steiner tree

MST nối **tất cả** đỉnh. **Steiner tree** chỉ cần nối một **tập con** đỉnh bắt buộc (terminals), được phép thêm **đỉnh phụ (Steiner point)** để giảm tổng. Tổng quát là NP-hard (khác MST là P). Ứng dụng: thiết kế VLSI, đặt trạm trung gian.

> **📝 Tóm tắt mục 9.** Second-best MST khác MST 1 cạnh (\`O(E log V)\`). Steiner tree: nối tập con đỉnh + đỉnh phụ, NP-hard.

---

## 10. Độ phức tạp chi tiết

| Thuật toán | Cấu trúc | Thời gian | Bộ nhớ | Ghi chú |
|-----------|----------|-----------|--------|---------|
| **Kruskal** | sort + Union-Find | \`O(E log E)\` = \`O(E log V)\` | \`O(V + E)\` | sort thống trị; UF \`O(E·α(V))\` ≈ \`O(E)\` |
| **Prim (binary heap)** | adjacency list + heap | \`O((V+E) log V)\` | \`O(V + E)\` | mỗi cạnh push/pop một lần |
| **Prim (\`O(V²)\`)** | adjacency matrix | \`O(V²)\` | \`O(V²)\` | không heap; nhanh khi \`E ≈ V²\` (đồ thị dày) |
| **Prim (Fibonacci heap)** | adj list + Fib heap | \`O(E + V log V)\` | \`O(V + E)\` | lý thuyết tốt nhất, hằng số lớn |

- \`α(V)\` = hàm Ackermann ngược, ≤ 4 cho mọi \`V\` thực tế → Union-Find coi như \`O(1)\`.
- Vì \`log E ≤ log(V²) = 2 log V\`, nên \`O(E log E) = O(E log V)\`.
- **Đồ thị thưa** (\`E = O(V)\`): Kruskal \`O(V log V)\`, Prim heap \`O(V log V)\` — tương đương.
- **Đồ thị dày** (\`E = O(V²)\`): Prim \`O(V²)\` (matrix) thắng Kruskal \`O(V² log V)\`.

> **📝 Tóm tắt mục 10.** Kruskal \`O(E log E)\`; Prim heap \`O(E log V)\`, Prim matrix \`O(V²)\`. Chọn theo mật độ đồ thị.

---

## 11. Cạm bẫy

> **⚠ Cạm bẫy 1 — Kruskal quên Union-Find.** Kiểm tra chu trình bằng BFS/DFS mỗi lần thêm cạnh → \`O(V)\` mỗi check → tổng \`O(E·V)\`. Union-Find biến thành ~\`O(1)\` amortized. **Luôn dùng Union-Find cho Kruskal.**

> **⚠ Cạm bẫy 2 — Đồ thị không liên thông → MST không tồn tại.** Nếu đồ thị có nhiều thành phần liên thông thì **không có cây khung** nối tất cả. Khi đó:
> - **Kruskal** tự nhiên cho ra **rừng khung nhỏ nhất (minimum spanning forest)** — MST của mỗi thành phần. Kết quả có \`V - (số thành phần)\` cạnh thay vì \`V-1\`.
> - **Prim** chỉ phủ thành phần chứa đỉnh \`start\`. Muốn rừng → chạy Prim lại cho mỗi thành phần chưa thăm.
>
> **Phải kiểm tra**: nếu Kruskal kết thúc mà \`len(mst) < V-1\` → đồ thị không liên thông.

> **⚠ Cạm bẫy 3 — Đồ thị có hướng.** MST định nghĩa cho đồ thị **vô hướng**. Với đồ thị **có hướng**, bài toán tương ứng là **minimum arborescence** (cây hướng gốc tại một đỉnh), giải bằng **thuật toán Chu-Liu/Edmonds**, KHÔNG dùng Kruskal/Prim. Đừng nhầm.

> **⚠ Cạm bẫy 4 — Trọng số âm.** MST **chấp nhận trọng số âm** không vấn đề gì (khác với Dijkstra — Dijkstra cấm cạnh âm). Cut property không giả định gì về dấu trọng số. Greedy chọn cạnh nhẹ nhất, âm càng tốt (giảm tổng). **Không cần xử lý đặc biệt.**

> **⚠ Cạm bẫy 5 — Self-loop & multi-edge.** Self-loop (cạnh \`u-u\`) không bao giờ thuộc MST (luôn tạo chu trình) → bỏ qua. Multi-edge (nhiều cạnh giữa cùng cặp đỉnh) → chỉ cạnh nhẹ nhất có ý nghĩa, nhưng thuật toán tự loại các cạnh nặng (Kruskal: cùng thành phần → bỏ).

> **📝 Tóm tắt mục 11.** Luôn dùng Union-Find; check liên thông (\`len(mst) < V-1\`); đồ thị có hướng → arborescence; trọng số âm OK; bỏ self-loop.

---

## Bài tập

Mỗi bài đều có lời giải chi tiết ở mục [Lời giải chi tiết](#lời-giải-chi-tiết).

1. **MST bằng Kruskal & Prim (cùng đồ thị)** — cho đồ thị 6 đỉnh, chạy *thủ công* cả Kruskal lẫn Prim, xác nhận cùng MST weight.
2. **Min cost to connect cities** — \`n\` thành phố, \`connections[i] = [a, b, cost]\`. Nối tất cả với chi phí nhỏ nhất, trả \`-1\` nếu không thể (LeetCode 1135).
3. **Min cost to connect points** — \`n\` điểm trên mặt phẳng, chi phí nối hai điểm = khoảng cách Manhattan. Nối tất cả với tổng chi phí nhỏ nhất (LeetCode 1584).
4. **Clustering thành \`k\` cụm** — cho đồ thị, chia đỉnh thành \`k\` cụm bằng MST (cắt \`k-1\` cạnh nặng nhất).
5. **Critical & pseudo-critical edges** — tìm các cạnh *critical* (bỏ đi → MST weight tăng / mất MST) và *pseudo-critical* (có thể có trong một MST nào đó nhưng không bắt buộc) (LeetCode 1489).
6. **Second-best MST (ý tưởng)** — mô tả thuật toán tìm cây khung nhỏ nhì.

---

## Lời giải chi tiết

### Lời giải 1 — Kruskal & Prim thủ công

Đồ thị 6 đỉnh \`0..5\`:

\`\`\`
0-1=4  0-2=4  1-2=2  1-0=4  2-3=3  2-5=2  2-4=4  3-4=3  5-4=3
\`\`\`

(Liệt kê cạnh duy nhất, sort tăng dần): \`1-2(2), 2-5(2), 2-3(3), 3-4(3), 5-4(3), 0-1(4), 0-2(4), 2-4(4)\`.

**Kruskal:**

| Cạnh | Cùng nhóm? | Hành động | MST |
|:---:|:---:|:---|:---:|
| 1-2(2) | không | thêm | 2 |
| 2-5(2) | không | thêm | 4 |
| 2-3(3) | không | thêm | 7 |
| 3-4(3) | không | thêm | 10 |
| 5-4(3) | **có** (4,5 đã nối qua 2) | bỏ | 10 |
| 0-1(4) | không | thêm | 14 |

Đủ \`5\` cạnh → MST = {1-2, 2-5, 2-3, 3-4, 0-1}, **weight = 14**.

**Prim từ đỉnh 0:** thêm \`0-1(4)\` → \`1-2(2)\` → \`2-5(2)\` → \`2-3(3)\` → \`3-4(3)\`. Tổng = \`4+2+2+3+3 = 14\`. **Cùng weight 14.** ✓ (Tập cạnh giống vì đồ thị này MST weight duy nhất; thứ tự thêm khác nhau).

**Big-O:** Kruskal \`O(E log E)\`, Prim \`O(E log V)\`.

### Lời giải 2 — Min cost to connect cities (LeetCode 1135)

Bài toán MST thuần. Dùng Kruskal: sort connections theo cost, union từng cạnh không tạo chu trình, cộng dồn. Sau cùng nếu số cạnh MST \`< n-1\` → đồ thị không liên thông → trả \`-1\`.

\`\`\`go
func minimumCost(n int, connections [][]int) int {
	sort.Slice(connections, func(i, j int) bool {
		return connections[i][2] < connections[j][2]
	})
	uf := NewUnionFind(n + 1) // thành phố đánh số 1..n
	total, used := 0, 0
	for _, c := range connections {
		if uf.Union(c[0], c[1]) { // Union trả true nếu gộp được (khác nhóm)
			total += c[2]
			used++
		}
	}
	if used != n-1 { // không đủ n-1 cạnh → không liên thông
		return -1
	}
	return total
}
\`\`\`

**Cách tiếp cận:** MST + kiểm tra liên thông. **Độ phức tạp:** \`O(E log E)\` (sort), \`E = len(connections)\`.

### Lời giải 3 — Min cost to connect points (LeetCode 1584)

Đồ thị **đầy đủ ngầm**: mọi cặp điểm có cạnh, trọng số = \`|x1-x2| + |y1-y2|\`. Có \`E = n(n-1)/2 = O(n²)\` cạnh → đồ thị **dày** → **Prim \`O(n²)\`** (không heap) tối ưu hơn Kruskal \`O(n² log n)\`.

\`\`\`go
func minCostConnectPoints(points [][]int) int {
	n := len(points)
	inMST := make([]bool, n)
	// minDist[i] = chi phí rẻ nhất nối điểm i vào cây hiện tại
	minDist := make([]int, n)
	for i := range minDist {
		minDist[i] = 1 << 30
	}
	minDist[0] = 0
	total := 0

	for i := 0; i < n; i++ {
		// chọn đỉnh ngoài cây có minDist nhỏ nhất — O(n)
		u := -1
		for v := 0; v < n; v++ {
			if !inMST[v] && (u == -1 || minDist[v] < minDist[u]) {
				u = v
			}
		}
		inMST[u] = true
		total += minDist[u]
		// cập nhật minDist cho các đỉnh còn ngoài cây — O(n)
		for v := 0; v < n; v++ {
			if !inMST[v] {
				d := abs(points[u][0]-points[v][0]) + abs(points[u][1]-points[v][1])
				if d < minDist[v] {
					minDist[v] = d
				}
			}
		}
	}
	return total
}

func abs(x int) int { if x < 0 { return -x }; return x }
\`\`\`

**Cách tiếp cận:** Prim phiên bản \`O(V²)\` vì đồ thị đầy đủ. **Độ phức tạp:** \`O(n²)\` thời gian, \`O(n)\` bộ nhớ — tối ưu cho đồ thị dày.

### Lời giải 4 — Clustering thành \`k\` cụm

Dùng \`MSTClustering\` ở mục 8.2: xây MST bằng Kruskal (cạnh đã sort tăng dần), chỉ union \`V-k\` cạnh nhẹ nhất, bỏ \`k-1\` cạnh nặng nhất → \`k\` thành phần.

**Walk-through** với đồ thị mục 3.2, \`k=3\`: MST = \`{0-1(2), 1-2(3), 1-4(5), 0-3(6)}\`. Giữ \`V-k = 5-3 = 2\` cạnh nhẹ nhất: \`0-1(2), 1-2(3)\`. Bỏ \`1-4, 0-3\`. Cụm: \`{0,1,2}\`, \`{4}\`, \`{3}\` → đúng 3 cụm.

**Cách tiếp cận:** MST + cắt \`k-1\` cạnh nặng nhất. **Độ phức tạp:** \`O(E log E)\` (xây MST thống trị).

### Lời giải 5 — Critical & pseudo-critical edges (LeetCode 1489)

**Định nghĩa:** một cạnh là **critical** nếu **bỏ nó đi → MST weight tăng** (hoặc không còn nối được). Một cạnh là **pseudo-critical** nếu nó **có thể** xuất hiện trong *một số* MST nhưng không phải mọi MST.

**Thuật toán:**
1. Tính \`mstWeight\` chuẩn (Kruskal trên tất cả cạnh).
2. Với mỗi cạnh \`e\`:
   - **Test critical**: chạy Kruskal **bỏ cạnh \`e\`** (skip nó). Nếu weight kết quả \`> mstWeight\` hoặc không nối đủ \`n-1\` cạnh → \`e\` là **critical**.
   - **Test pseudo-critical** (nếu chưa critical): chạy Kruskal **ép thêm \`e\` trước** (union hai đầu, cộng \`e.W\` rồi mới Kruskal phần còn lại). Nếu tổng \`== mstWeight\` → \`e\` có thể nằm trong một MST → **pseudo-critical**.

\`\`\`go
func findCriticalAndPseudoCritical(n int, edges [][]int) [][]int {
	// gắn chỉ số gốc vào mỗi cạnh để trả về đúng index
	type E struct{ u, v, w, id int }
	es := make([]E, len(edges))
	for i, e := range edges {
		es[i] = E{e[0], e[1], e[2], i}
	}
	sort.Slice(es, func(i, j int) bool { return es[i].w < es[j].w })

	// build: chạy Kruskal, có thể skip 1 cạnh / ép trước 1 cạnh
	build := func(skip, pre int) int {
		uf := NewUnionFind(n)
		total, used := 0, 0
		if pre != -1 { // ép cạnh pre vào trước
			uf.Union(es[pre].u, es[pre].v)
			total += es[pre].w
			used++
		}
		for i, e := range es {
			if i == skip || i == pre {
				continue
			}
			if uf.Union(e.u, e.v) {
				total += e.w
				used++
			}
		}
		if used != n-1 {
			return 1 << 30 // không nối đủ → vô cực
		}
		return total
	}

	mstW := build(-1, -1)
	crit := []int{}
	pseudo := []int{}
	for i := range es {
		if build(i, -1) > mstW { // bỏ i → weight tăng → critical
			crit = append(crit, es[i].id)
		} else if build(-1, i) == mstW { // ép i mà vẫn = mstW → pseudo
			pseudo = append(pseudo, es[i].id)
		}
	}
	return [][]int{crit, pseudo}
}
\`\`\`

**Cách tiếp cận:** với mỗi cạnh thử bỏ (critical) và thử ép trước (pseudo). **Độ phức tạp:** \`O(E²)\` — \`E\` cạnh × \`O(E α)\` mỗi lần build. Đủ nhanh với \`E ≤ 200\` (ràng buộc đề).

### Lời giải 6 — Second-best MST (ý tưởng)

**Cách tiếp cận:**
1. Tìm MST \`T\` (weight \`W\`).
2. Second-best MST khác \`T\` **đúng một cạnh**: với mỗi cạnh \`(u,v,w)\` **không thuộc** \`T\`, thêm nó vào \`T\` tạo chu trình. Bỏ cạnh **nặng nhất** trên đường \`u→v\` trong \`T\` (gọi là \`maxEdge\`) → cây khung mới weight \`W - maxEdge + w\`.
3. Lấy **min** trên mọi cạnh ngoài MST của \`W - maxEdge + w\` → second-best MST weight.

**Vì sao chỉ khác 1 cạnh?** Theo exchange argument: bất kỳ cây khung nào cũng biến về \`T\` qua các phép đổi cạnh; cây gần \`T\` nhất (rẻ nhì) chỉ cần một phép đổi.

**Tính \`maxEdge\` trên đường \`u→v\`:** tiền xử lý MST bằng **binary lifting / LCA** lưu cạnh nặng nhất trên mỗi đoạn \`2^j\` → truy vấn \`O(log V)\`.

**Độ phức tạp:** xây MST \`O(E log E)\` + tiền xử lý LCA \`O(V log V)\` + duyệt \`E\` cạnh ngoài × \`O(log V)\` = \`O(E log V)\`. **Big-O tổng: \`O(E log E)\`.**

---

## Code & Minh họa

- **Code Go**: inline trong README (Union-Find, Kruskal, Prim, MSTClustering, lời giải bài tập). Bài này **không** có \`solutions.go\` riêng.
- **[visualization.html](./visualization.html)** — 3 module tương tác:
  1. **Kruskal animator** — đồ thị SVG, sort cạnh, animate thêm cạnh + Union-Find reject chu trình.
  2. **Prim animator** — grow cây từ một đỉnh, heap chọn cạnh nhẹ nhất.
  3. **Kruskal vs Prim** — chạy song song trên cùng đồ thị, xác nhận cùng MST weight.

## Bài tiếp theo

- [Lesson 36 — Connected Components & Union-Find](../lesson-36-connected-components/) — đào sâu Union-Find, connected components, flood fill, cycle detection.
- [Lesson 34 — Bellman-Ford & Floyd-Warshall](../lesson-34-bellman-ford-floyd/) — bài trước, shortest path với cạnh âm.
- Tham khảo: [DataStructures — Union-Find](../../DataStructures/index.html), [Lesson 19 — Greedy fundamentals](../lesson-19-greedy-fundamentals/).
`;
