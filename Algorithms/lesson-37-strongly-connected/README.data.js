// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: Algorithms/lesson-37-strongly-connected/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 37 — Thành phần liên thông mạnh (Strongly Connected Components — SCC)

> **Tier 5 — Thuật toán đồ thị.** Bài này chỉ áp dụng cho **đồ thị CÓ HƯỚNG (directed graph)**. Nếu bạn vừa học [Lesson 36 — Connected Components](../lesson-36-connected-components/README.md) (đồ thị vô hướng), hãy ghi nhớ ngay: hai khái niệm **khác nhau hoàn toàn**. Phần lớn lỗi của người mới là lẫn lộn chúng.

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Hiểu **SCC là gì** và vì sao nó chỉ có nghĩa trong đồ thị có hướng.
- Vẽ và đọc được **condensation graph** (đồ thị thu gọn) — luôn là một DAG.
- Cài đặt **Kosaraju** (2 lần DFS + transpose) và **Tarjan** (1 lần DFS + low-link) bằng Go, hiểu từng dòng.
- Biết khi nào chọn thuật toán nào, và **độ phức tạp O(V+E)** đến từ đâu.
- Áp dụng SCC vào **2-SAT**, phát hiện circular dependency, mother vertex, longest path trên condensation.
- Hiểu biến thể low-link cho **bridges & articulation points** (đồ thị vô hướng).
- Tránh các cạm bẫy kinh điển: quên transpose, cập nhật low-link sai, kiểm tra stack membership sai.

## Kiến thức tiền đề

- [Lesson 31 — Duyệt đồ thị (BFS/DFS)](../lesson-31-graph-traversal/README.md): DFS, danh sách kề, thời điểm thăm/hoàn thành.
- [Lesson 32 — Sắp xếp Topo](../lesson-32-topological-sort/README.md): thứ tự topo, DAG, phát hiện chu trình. Condensation graph dùng lại topo sort.
- [Lesson 36 — Connected Components](../lesson-36-connected-components/README.md): khái niệm "liên thông" trên đồ thị vô hướng — để đối chiếu.

---

## 1. SCC là gì?

> 💡 **Trực giác / Hình dung.** Hãy tưởng tượng một mạng lưới chuyến bay một chiều giữa các thành phố. Một **thành phần liên thông mạnh** là một nhóm thành phố mà từ thành phố nào trong nhóm bạn cũng **bay tới rồi bay về được** mọi thành phố khác trong nhóm — không cần ra khỏi nhóm. Ngược lại, hai thành phố ở hai nhóm khác nhau thì *ít nhất một chiều* không có đường về. SCC là cách "đóng gói" các vùng "đi đâu cũng quay lại được" thành cụm.

**Định nghĩa hình thức.** Cho đồ thị có hướng \`G = (V, E)\`. Hai đỉnh \`u, v\` gọi là **liên thông mạnh với nhau** nếu tồn tại đường đi có hướng \`u → v\` **VÀ** đường đi có hướng \`v → u\`. Quan hệ này là một **quan hệ tương đương** (phản xạ, đối xứng, bắc cầu), nên nó **phân hoạch** tập đỉnh thành các lớp tương đương — mỗi lớp là một **Strongly Connected Component (SCC)**.

**Khác biệt then chốt với Connected Component (CC) ở L36:**

| | Connected Component (L36) | Strongly Connected Component (L37) |
|---|---|---|
| Loại đồ thị | Vô hướng (undirected) | **Có hướng (directed)** |
| Điều kiện | \`u\` và \`v\` nối được với nhau (1 chiều đủ) | \`u → v\` **VÀ** \`v → u\` (cả 2 chiều) |
| Thuật toán | DFS/BFS đơn giản, Union-Find | Kosaraju, Tarjan (low-link) |

> ⚠ **Lỗi thường gặp #1.** Áp dụng DFS "loang một lần" như CC vô hướng cho đồ thị có hướng. Ví dụ \`1 → 2 → 3\`: nếu loang từ 1 bạn thăm cả \`{1,2,3}\` và tưởng đó là 1 SCC. **Sai!** Vì không có đường \`2 → 1\` hay \`3 → 1\`, nên \`{1}, {2}, {3}\` là **ba** SCC riêng biệt. Khả năng "với tới" (reachability) một chiều **không** đủ để là SCC.

**Bốn ví dụ số cụ thể để nắm chắc:**

1. \`1 → 2, 2 → 1\` → \`{1,2}\` là 1 SCC (đi và về đều có).
2. \`1 → 2 → 3\` (đường thẳng) → 3 SCC: \`{1}\`, \`{2}\`, \`{3}\` (không có đường về).
3. \`1 → 2 → 3 → 1\` (chu trình) → \`{1,2,3}\` là 1 SCC (vòng tròn → ai cũng tới ai cũng về).
4. \`1 → 2, 2 → 3, 3 → 2\` → 2 SCC: \`{1}\` và \`{2,3}\` (cạnh \`2↔3\` tạo cụm, đỉnh 1 chỉ đi ra mà không có đường về).

> 🔁 **Dừng lại tự kiểm tra.** Đồ thị \`A → B, B → C, C → A, C → D\`. Có mấy SCC?
> <details><summary>Đáp án</summary>
> \`{A, B, C}\` là 1 SCC (chu trình \`A→B→C→A\`). \`D\` chỉ nhận cạnh từ \`C\`, không có đường về \`C\` → \`{D}\` là SCC riêng. Tổng cộng **2 SCC**.
> </details>

---

## 2. Ví dụ trực quan & walk-through

Xét đồ thị 8 đỉnh (đánh số 0..7), cạnh có hướng:

\`\`\`
0 → 1
1 → 2
2 → 0      (chu trình 0,1,2)
2 → 3
3 → 4
4 → 5
5 → 3      (chu trình 3,4,5)
6 → 5
6 → 7
7 → 6      (chu trình 6,7)
\`\`\`

**Khoanh SCC bằng tay** — tìm các chu trình:

- \`0 → 1 → 2 → 0\`: vòng kín → \`{0, 1, 2}\` là 1 SCC.
- \`3 → 4 → 5 → 3\`: vòng kín → \`{3, 4, 5}\` là 1 SCC.
- \`6 → 7 → 6\`: vòng kín → \`{6, 7}\` là 1 SCC.

**Kết quả: 3 SCC** = \`{0,1,2}\`, \`{3,4,5}\`, \`{6,7}\`.

Kiểm chứng cạnh "nối giữa các cụm": \`2 → 3\` (cụm A → cụm B), \`6 → 5\` (cụm C → cụm B), \`6 → 7\` đã nằm trong cụm C. Các cạnh liên cụm đều **một chiều** — đó là lý do chúng không gộp các cụm lại.

> ❓ **Câu hỏi tự nhiên của người đọc.**
> - *"Một đỉnh không nằm trong chu trình nào thì sao?"* → Nó là SCC chứa đúng 1 phần tử (singleton). Mọi đỉnh luôn liên thông mạnh với chính nó.
> - *"Hai chu trình chia chung 1 đỉnh thì sao?"* → Chúng gộp thành 1 SCC. Ví dụ \`0→1→0\` và \`0→2→0\` chung đỉnh 0 → \`{0,1,2}\` là 1 SCC vì \`1→0→2\` và \`2→0→1\` đều có đường.
> - *"SCC có thể lồng nhau không?"* → Không. SCC là một **phân hoạch** — mỗi đỉnh thuộc đúng 1 SCC, không chồng lấn.

---

## 3. Condensation graph (đồ thị thu gọn)

> 💡 **Trực giác.** Khi đã biết các SCC, hãy "bóp" mỗi SCC thành **một siêu đỉnh (super-node)**. Mọi cạnh giữa hai SCC khác nhau trở thành cạnh giữa hai siêu đỉnh. Kết quả luôn là một **DAG (đồ thị có hướng không chu trình)** — gọi là **condensation graph** hay **đồ thị thu gọn**.

**Vì sao condensation luôn là DAG?** Giả sử có chu trình giữa hai siêu đỉnh \`C1 → C2 → C1\`. Khi đó mọi đỉnh trong \`C1\` tới được mọi đỉnh trong \`C2\` và ngược lại → \`C1\` và \`C2\` đáng lẽ phải là **cùng một SCC**, mâu thuẫn với việc chúng là 2 siêu đỉnh khác nhau. Vậy không thể có chu trình → DAG. (Đây là chứng minh đầy đủ, không dùng "dễ thấy".)

**Áp dụng cho ví dụ ở mục 2:**

- Siêu đỉnh: \`A = {0,1,2}\`, \`B = {3,4,5}\`, \`C = {6,7}\`.
- Cạnh liên cụm: \`2→3\` cho \`A → B\`; \`6→5\` cho \`C → B\`.
- Condensation: \`A → B\`, \`C → B\`. Đây là DAG (B là đỉnh "đáy", không đi đâu).

\`\`\`
   A          C
    \\        /
     v      v
        B
\`\`\`

**Ứng dụng:** sau khi thu gọn, bạn có thể chạy **topo sort** trên condensation (xem [L32](../lesson-32-topological-sort/README.md)) rồi làm DP. Ví dụ: "đường đi dài nhất theo số SCC", "có thể đi từ một đỉnh đến mọi đỉnh không" (mother vertex) — tất cả quy về bài toán trên DAG, vốn dễ hơn nhiều so với đồ thị có chu trình.

> 📝 **Tóm tắt mục 1–3.**
> - SCC: tập đỉnh mà mọi cặp \`u,v\` có **cả** \`u→v\` lẫn \`v→u\`. Chỉ có nghĩa với đồ thị **có hướng**.
> - SCC là phân hoạch tập đỉnh (mỗi đỉnh thuộc đúng 1 SCC).
> - Condensation = bóp mỗi SCC thành siêu đỉnh → **luôn là DAG** → topo sort + DP được.

---

## 4. Kosaraju's algorithm — 2 lần DFS + transpose

> 💡 **Trực giác.** Ý tưởng "kỳ lạ mà đẹp": nếu bạn DFS xong đồ thị gốc và ghi lại **thứ tự hoàn thành (finish time)**, thì đỉnh hoàn thành muộn nhất nằm trong SCC "nguồn" của condensation. Bây giờ **đảo chiều mọi cạnh** (transpose \`Gᵀ\`) — SCC không đổi (đi và về vẫn đi và về), nhưng các cạnh **liên cụm bị đảo**, nên SCC nguồn cũ giờ không "rò" sang cụm khác. DFS lại trên \`Gᵀ\` theo thứ tự finish giảm dần → mỗi cây DFS đúng bằng một SCC.

**Ba bước:**

1. **DFS lần 1 trên \`G\`**, khi một đỉnh hoàn thành (mọi con đã xử lý xong) thì **push vào stack** (đây chính là thứ tự post-order / finish order).
2. **Transpose** đồ thị: \`Gᵀ\` có cạnh \`v → u\` cho mỗi cạnh \`u → v\` của \`G\`.
3. **DFS lần 2 trên \`Gᵀ\`**, lấy đỉnh từ stack ra (thứ tự finish **giảm dần**). Mỗi lần pop một đỉnh **chưa thăm** → chạy DFS từ đó trên \`Gᵀ\`; tất cả đỉnh thăm được trong lần DFS này tạo thành **một SCC**.

### Walk-through đầy đủ (đồ thị mục 2)

**Bước 1 — DFS lần 1 trên \`G\`**, bắt đầu từ 0 (con duyệt theo thứ tự tăng):

\`\`\`
DFS(0) → DFS(1) → DFS(2) → DFS(3) → DFS(4) → DFS(5)
  5: hết con (5→3 đã thăm)           push 5   stack=[5]
  4: hết con                          push 4   stack=[5,4]
  3: hết con (3→4 xong)               push 3   stack=[5,4,3]
  2: còn con? 2→0 (đã thăm), 2→3(xong) push 2  stack=[5,4,3,2]
  1: hết con                          push 1   stack=[5,4,3,2,1]
  0: hết con                          push 0   stack=[5,4,3,2,1,0]
DFS(6) (chưa thăm) → DFS(7) → 7→6 (đã thăm)
  7: hết con                          push 7   stack=[5,4,3,2,1,0,7]
  6: hết con                          push 6   stack=[5,4,3,2,1,0,7,6]
\`\`\`

Stack (đỉnh trên cùng cuối) = \`[5,4,3,2,1,0,7,6]\`. Pop sẽ ra theo thứ tự \`6,7,0,1,2,3,4,5\`.

**Bước 2 — Transpose.** Đảo mọi cạnh:

\`\`\`
1→0, 2→1, 0→2, 3→2, 4→3, 5→4, 3→5, 5→6, 7→6, 6→7
\`\`\`

**Bước 3 — DFS lần 2 trên \`Gᵀ\`** theo thứ tự pop \`6,7,0,1,2,3,4,5\`:

- Pop **6** (chưa thăm). DFS trên \`Gᵀ\` từ 6: \`6→7\`, \`7→6\`(thăm). Thăm \`{6,7}\` → **SCC #1 = {6,7}**.
- Pop **7** (đã thăm) → bỏ qua.
- Pop **0** (chưa thăm). DFS từ 0: \`0→2\`, \`2→1\`, \`1→0\`(thăm). Thăm \`{0,2,1}\` → **SCC #2 = {0,1,2}**.
- Pop **1, 2** (đã thăm) → bỏ qua.
- Pop **3** (chưa thăm). DFS từ 3: \`3→2\`(thăm), \`3→5\`, \`5→4\`, \`5→6\`(thăm), \`4→3\`(thăm). Thăm \`{3,5,4}\` → **SCC #3 = {3,4,5}**.
- Pop **4, 5** (đã thăm) → bỏ qua.

**Kết quả: 3 SCC** = \`{6,7}\`, \`{0,1,2}\`, \`{3,4,5}\` — khớp với khoanh tay ở mục 2. ✓

> ⚠ **Lỗi thường gặp #2 (Kosaraju).** Quên transpose, hoặc DFS lần 2 vẫn dùng \`G\`. Khi đó từ đỉnh 0 bạn sẽ loang sang cả 3,4,5 (vì \`2→3\` còn nguyên) → gộp sai. **Phải** DFS lần 2 trên \`Gᵀ\`. Lỗi thứ hai: pop theo thứ tự **tăng** thay vì giảm — phải dùng stack (LIFO), pop từ đỉnh finish muộn nhất.

### Code Go — Kosaraju

\`\`\`go
package main

import "fmt"

// Kosaraju trả về danh sách SCC, mỗi SCC là một slice các đỉnh.
// adj: danh sách kề của đồ thị G có hướng, n đỉnh đánh số 0..n-1.
func kosaraju(n int, adj [][]int) [][]int {
	visited := make([]bool, n)
	order := []int{} // thứ tự finish (post-order) — đỉnh xong sau nằm cuối

	// ----- Bước 1: DFS lần 1 trên G, lưu finish order -----
	var dfs1 func(u int)
	dfs1 = func(u int) {
		visited[u] = true
		for _, v := range adj[u] {
			if !visited[v] {
				dfs1(v)
			}
		}
		order = append(order, u) // u hoàn thành → push (cuối slice = đỉnh stack)
	}
	for u := 0; u < n; u++ {
		if !visited[u] {
			dfs1(u)
		}
	}

	// ----- Bước 2: Transpose — đảo mọi cạnh -----
	radj := make([][]int, n)
	for u := 0; u < n; u++ {
		for _, v := range adj[u] {
			radj[v] = append(radj[v], u) // cạnh u→v thành v→u
		}
	}

	// ----- Bước 3: DFS lần 2 trên Gᵀ theo finish GIẢM dần -----
	for i := range visited {
		visited[i] = false
	}
	var scc [][]int
	var dfs2 func(u int, comp *[]int)
	dfs2 = func(u int, comp *[]int) {
		visited[u] = true
		*comp = append(*comp, u)
		for _, v := range radj[u] {
			if !visited[v] {
				dfs2(v, comp)
			}
		}
	}
	// duyệt order TỪ CUỐI về đầu = pop stack = finish giảm dần
	for i := len(order) - 1; i >= 0; i-- {
		u := order[i]
		if !visited[u] {
			comp := []int{}
			dfs2(u, &comp)
			scc = append(scc, comp)
		}
	}
	return scc
}

func main() {
	n := 8
	adj := make([][]int, n)
	add := func(u, v int) { adj[u] = append(adj[u], v) }
	add(0, 1); add(1, 2); add(2, 0); add(2, 3)
	add(3, 4); add(4, 5); add(5, 3)
	add(6, 5); add(6, 7); add(7, 6)

	scc := kosaraju(n, adj)
	fmt.Printf("Số SCC = %d\\n", len(scc)) // 3
	for i, c := range scc {
		fmt.Printf("SCC #%d: %v\\n", i+1, c)
	}
}
\`\`\`

> **Walk-through code.** \`dfs1\` đẩy đỉnh vào \`order\` khi *xong* → \`order\` chính là finish order (đỉnh trên cùng stack ở cuối slice). \`radj\` build trong O(V+E). Vòng lặp cuối duyệt \`order\` từ cuối về đầu = pop LIFO = finish giảm dần; mỗi đỉnh chưa thăm khởi tạo một SCC mới.

---

## 5. Tarjan's algorithm — 1 lần DFS + low-link

> 💡 **Trực giác.** Tarjan tinh tế hơn: chỉ **một lần DFS**, không cần transpose. Trong khi DFS, mỗi đỉnh \`u\` được gán **\`disc[u]\`** (thời điểm thăm, như "số thứ tự DFS") và **\`low[u]\`** = "thời điểm thăm nhỏ nhất mà \`u\` còn với tới được" thông qua cây con của nó **cộng** các back-edge tới đỉnh còn đang trên stack. Nếu sau khi xử lý xong cây con của \`u\` mà \`low[u] == disc[u]\`, thì \`u\` là **gốc (root)** của một SCC — không có đường nào từ cây con của \`u\` "trèo lên" cao hơn \`u\`. Lúc đó **pop stack** tới tận \`u\`, các đỉnh pop ra tạo thành 1 SCC.

**Ba biến trạng thái:**

- \`disc[u]\`: thời điểm DFS thăm \`u\` lần đầu (timer tăng dần). \`-1\` = chưa thăm.
- \`low[u]\`: min của \`disc[u]\` và mọi đỉnh \`u\` reach được (qua tree-edge xuống rồi back-edge / cross-edge tới đỉnh **còn trên stack**).
- \`stack\` + \`onStack[]\`: chứa các đỉnh của SCC đang hình thành; \`onStack[v]\` kiểm tra membership trong $O(1)$.

**Quy tắc cập nhật low (rất dễ sai — đọc kỹ):**

- Gặp cạnh \`u → v\` với \`v\` **chưa thăm** (tree edge): DFS \`v\` trước, rồi \`low[u] = min(low[u], low[v])\`. *(lấy \`low[v]\`, không phải \`disc[v]\`)*
- Gặp cạnh \`u → v\` với \`v\` **đã thăm VÀ còn trên stack** (back/cross edge tới SCC đang mở): \`low[u] = min(low[u], disc[v])\`. *(lấy \`disc[v]\`, không phải \`low[v]\`)*
- Gặp cạnh \`u → v\` với \`v\` đã thăm nhưng **không còn trên stack** (cross edge sang SCC đã đóng): **bỏ qua** — không cập nhật gì.

### Walk-through (đồ thị mục 2, bắt đầu DFS từ 0)

Timer chạy từ 0. Theo dõi \`disc/low\` và stack:

| Bước | Hành động | disc | low | stack |
|---|---|---|---|---|
| 1 | thăm 0 | d0=0 | l0=0 | [0] |
| 2 | thăm 1 | d1=1 | l1=1 | [0,1] |
| 3 | thăm 2 | d2=2 | l2=2 | [0,1,2] |
| 4 | 2→0, 0 onStack | | l2=min(2,d0=0)=0 | [0,1,2] |
| 5 | thăm 3 | d3=3 | l3=3 | [0,1,2,3] |
| 6 | thăm 4 | d4=4 | l4=4 | [0,1,2,3,4] |
| 7 | thăm 5 | d5=5 | l5=5 | [...,5] |
| 8 | 5→3, 3 onStack | | l5=min(5,d3=3)=3 | [...,5] |
| 9 | xong 5: l5=3≠d5=5 → không root; back to 4 | | l4=min(4,l5=3)=3 | |
| 10 | xong 4: l4=3≠d4=4; back to 3 | | l3=min(3,l4=3)=3 | |
| 11 | xong 3: **l3=3==d3=3 → ROOT!** pop tới 3 | | | pop 5,4,3 → **SCC {3,4,5}** |
| 12 | back to 2: (cạnh 2→3, nhưng 3 KHÔNG còn stack → bỏ qua) | | l2=0 | [0,1,2] |
| 13 | xong 2: l2=0≠d2=2; back to 1 | | l1=min(1,l2=0)=0 | |
| 14 | xong 1: l1=0≠d1=1; back to 0 | | l0=min(0,l1=0)=0 | |
| 15 | xong 0: **l0=0==d0=0 → ROOT!** pop tới 0 | | | pop 2,1,0 → **SCC {0,1,2}** |
| 16 | đỉnh 6 chưa thăm → DFS mới | d6=6 | l6=6 | [6] |
| 17 | 6→5 (5 KHÔNG còn stack → bỏ qua); thăm 7 | d7=7 | l7=7 | [6,7] |
| 18 | 7→6, 6 onStack | | l7=min(7,d6=6)=6 | [6,7] |
| 19 | xong 7: l7=6≠d7=7; back to 6 | | l6=min(6,l7=6)=6 | |
| 20 | xong 6: **l6=6==d6=6 → ROOT!** pop tới 6 | | | pop 7,6 → **SCC {6,7}** |

**Kết quả: 3 SCC** = \`{3,4,5}\`, \`{0,1,2}\`, \`{6,7}\` — đúng. Để ý SCC nào "đóng" trước theo thứ tự DFS post-order (đây là thứ tự **topo ngược** của condensation — một bonus của Tarjan).

> ⚠ **Lỗi thường gặp #3 (Tarjan — low-link).** Ba sai lầm phổ biến:
> 1. Tree edge dùng \`disc[v]\` thay vì \`low[v]\` → bỏ sót đường trèo lên qua cây con.
> 2. Back edge dùng \`low[v]\` thay vì \`disc[v]\` → có thể cập nhật low quá thấp một cách sai, gộp nhầm SCC.
> 3. **Quên kiểm tra \`onStack\`**: nếu \`v\` đã thăm và đã thuộc SCC đã đóng (cross edge), mà bạn vẫn \`low[u]=min(low[u],disc[v])\` → gộp nhầm hai SCC vốn tách biệt. Ví dụ cạnh \`2→3\` ở bước 12: nếu không check onStack, \`low[2]\` bị kéo về \`disc[3]=3\` → sai.

### Code Go — Tarjan

\`\`\`go
package main

import "fmt"

func tarjan(n int, adj [][]int) [][]int {
	disc := make([]int, n)
	low := make([]int, n)
	onStack := make([]bool, n)
	for i := range disc {
		disc[i] = -1 // -1 = chưa thăm
	}
	stack := []int{}
	timer := 0
	var scc [][]int

	var dfs func(u int)
	dfs = func(u int) {
		disc[u] = timer
		low[u] = timer
		timer++
		stack = append(stack, u)
		onStack[u] = true

		for _, v := range adj[u] {
			if disc[v] == -1 {
				// tree edge: DFS v rồi lấy low[v]
				dfs(v)
				if low[v] < low[u] {
					low[u] = low[v]
				}
			} else if onStack[v] {
				// back/cross edge tới đỉnh CÒN trên stack: lấy disc[v]
				if disc[v] < low[u] {
					low[u] = disc[v]
				}
			}
			// else: v đã thăm nhưng KHÔNG còn stack (SCC đã đóng) → bỏ qua
		}

		// u là gốc SCC?
		if low[u] == disc[u] {
			comp := []int{}
			for {
				w := stack[len(stack)-1]
				stack = stack[:len(stack)-1]
				onStack[w] = false
				comp = append(comp, w)
				if w == u {
					break
				}
			}
			scc = append(scc, comp)
		}
	}

	for u := 0; u < n; u++ {
		if disc[u] == -1 {
			dfs(u)
		}
	}
	return scc
}

func main() {
	n := 8
	adj := make([][]int, n)
	add := func(u, v int) { adj[u] = append(adj[u], v) }
	add(0, 1); add(1, 2); add(2, 0); add(2, 3)
	add(3, 4); add(4, 5); add(5, 3)
	add(6, 5); add(6, 7); add(7, 6)

	scc := tarjan(n, adj)
	fmt.Printf("Số SCC = %d\\n", len(scc)) // 3
	for i, c := range scc {
		fmt.Printf("SCC #%d: %v\\n", i+1, c)
	}
}
\`\`\`

> **Walk-through code.** \`disc[u]==-1\` đóng vai trò "chưa thăm". Phân biệt 3 nhánh \`if/else if/else\` đúng theo 3 quy tắc cập nhật low. Khối \`if low[u]==disc[u]\` pop stack đến tận \`u\`, gom thành 1 SCC. \`onStack\` đảm bảo O(1) membership và đúng đắn (không gộp SCC đã đóng).

> 🔁 **Dừng lại tự kiểm tra.** Trong Tarjan, nếu một đỉnh \`u\` có \`low[u] < disc[u]\` thì \`u\` là gì?
> <details><summary>Đáp án</summary>
> \`u\` **không** phải gốc SCC — nó "trèo" được lên một đỉnh tổ tiên còn trên stack, nên thuộc cùng SCC với tổ tiên đó. Chỉ khi \`low[u]==disc[u]\` thì \`u\` mới là gốc (đại diện) của SCC.
> </details>

---

## 6. So sánh Kosaraju vs Tarjan

| Tiêu chí | Kosaraju | Tarjan |
|---|---|---|
| Số lần DFS | **2** lần | **1** lần |
| Cần transpose \`Gᵀ\`? | Có (tốn thêm O(V+E) bộ nhớ cạnh đảo) | Không |
| Trạng thái phụ | stack finish order | \`disc[]\`, \`low[]\`, \`onStack[]\`, stack |
| Độ phức tạp | O(V+E) | O(V+E) |
| Hằng số thực tế | Lớn hơn (~2× DFS + build \`Gᵀ\`) | **Nhỏ hơn** (1 lượt) |
| Dễ hiểu / dễ nhớ | **Dễ hơn** (ý tưởng rõ ràng) | Khó hơn (low-link tinh tế) |
| Output phụ | (không) | SCC ra theo **topo ngược** của condensation |

**Khi nào chọn cái nào?**

- **Học / phỏng vấn giải thích**: Kosaraju — dễ trình bày, ít chỗ sai.
- **Cần hiệu năng / contest**: Tarjan — 1 DFS, ít cache miss, lại cho luôn thứ tự topo của condensation (tiện cho 2-SAT).
- Cả hai đều O(V+E) nên về mặt big-O là tương đương; khác biệt chỉ ở hằng số.

> 📝 **Tóm tắt mục 4–6.**
> - **Kosaraju**: DFS finish order → transpose → DFS theo finish giảm dần. 2 DFS. Trực quan.
> - **Tarjan**: 1 DFS, \`disc/low/onStack\`, root khi \`low[u]==disc[u]\`, pop stack. Nhanh hơn hằng số.
> - Cả hai **O(V+E)**.

---

## 7. Ứng dụng của SCC

### 7.1 2-SAT — bài toán thỏa được mệnh đề

> 💡 **Trực giác.** 2-SAT: cho công thức dạng \`(a ∨ b) ∧ (¬a ∨ c) ∧ ...\` — mỗi mệnh đề có **đúng 2 literal**. Hỏi: có gán True/False cho các biến để toàn bộ đúng không? Mẹo: mỗi mệnh đề \`(x ∨ y)\` tương đương 2 phép kéo theo \`(¬x → y)\` và \`(¬y → x)\` ("nếu x sai thì y phải đúng"). Xây **implication graph** với 2 đỉnh cho mỗi biến (\`x\` và \`¬x\`), rồi tìm SCC.

**Quy tắc vàng:** 2-SAT **thỏa được khi và chỉ khi** không có biến \`x\` nào mà \`x\` và \`¬x\` **cùng một SCC**. Vì nếu \`x\` và \`¬x\` cùng SCC thì có \`x → ¬x\` và \`¬x → x\` → mâu thuẫn logic (x đúng kéo theo x sai và ngược lại).

**Gán giá trị** (nếu thỏa được): dùng thứ tự topo của condensation — đặt \`x = True\` nếu SCC của \`x\` đứng **sau** SCC của \`¬x\` trong topo (Tarjan cho SCC theo topo ngược nên: \`comp[x] < comp[¬x]\` → x = True).

**Walk-through ngắn.** Công thức \`(x₀ ∨ x₁) ∧ (¬x₀ ∨ x₁)\`. Mã hóa literal: biến \`i\` → đỉnh \`2i\` (true), \`2i+1\` (false/¬).

- \`(x₀ ∨ x₁)\`: \`¬x₀ → x₁\` (1→2) và \`¬x₁ → x₀\` (3→0).
- \`(¬x₀ ∨ x₁)\`: \`x₀ → x₁\` (0→2) và \`¬x₁ → ¬x₀\` (3→1).

Tìm SCC: không biến nào có \`x\` và \`¬x\` cùng SCC → **thỏa được**. Gán: \`x₁=True\` (vì mọi mệnh đề có x₁ là true thì đúng), \`x₀\` tùy. ✓

**Code Go — 2-SAT (Tarjan-based):**

\`\`\`go
package main

import "fmt"

// 2-SAT với n biến. Literal: biến i ở dạng (i, true/false).
// Đỉnh: 2*i = "x_i đúng", 2*i+1 = "x_i sai".
type TwoSAT struct {
	n   int
	adj [][]int
}

func NewTwoSAT(n int) *TwoSAT {
	return &TwoSAT{n: n, adj: make([][]int, 2*n)}
}

// node(i,val): val=true → 2i, val=false → 2i+1
func node(i int, val bool) int {
	if val {
		return 2 * i
	}
	return 2*i + 1
}

// addClause: (x_i = a) OR (x_j = b)  ⇔  (¬first → second) và (¬second → first)
func (t *TwoSAT) AddClause(i int, a bool, j int, b bool) {
	// ¬(x_i=a) → (x_j=b)
	t.adj[node(i, !a)] = append(t.adj[node(i, !a)], node(j, b))
	// ¬(x_j=b) → (x_i=a)
	t.adj[node(j, !b)] = append(t.adj[node(j, !b)], node(i, a))
}

// Solve: trả về (thỏa được?, assignment[]).
func (t *TwoSAT) Solve() (bool, []bool) {
	V := 2 * t.n
	disc := make([]int, V)
	low := make([]int, V)
	onStack := make([]bool, V)
	comp := make([]int, V) // comp[v] = id SCC; gán theo thứ tự đóng (topo ngược)
	for i := range disc {
		disc[i] = -1
		comp[i] = -1
	}
	stack := []int{}
	timer, sccID := 0, 0

	var dfs func(u int)
	dfs = func(u int) {
		disc[u], low[u] = timer, timer
		timer++
		stack = append(stack, u)
		onStack[u] = true
		for _, v := range t.adj[u] {
			if disc[v] == -1 {
				dfs(v)
				if low[v] < low[u] {
					low[u] = low[v]
				}
			} else if onStack[v] && disc[v] < low[u] {
				low[u] = disc[v]
			}
		}
		if low[u] == disc[u] {
			for {
				w := stack[len(stack)-1]
				stack = stack[:len(stack)-1]
				onStack[w] = false
				comp[w] = sccID
				if w == u {
					break
				}
			}
			sccID++
		}
	}
	for u := 0; u < V; u++ {
		if disc[u] == -1 {
			dfs(u)
		}
	}

	assign := make([]bool, t.n)
	for i := 0; i < t.n; i++ {
		if comp[2*i] == comp[2*i+1] {
			return false, nil // x_i và ¬x_i cùng SCC → vô nghiệm
		}
		// Tarjan đóng SCC theo topo ngược: comp nhỏ = đứng sau trong topo.
		assign[i] = comp[2*i] < comp[2*i+1]
	}
	return true, assign
}

func main() {
	// (x0 ∨ x1) ∧ (¬x0 ∨ x1)
	t := NewTwoSAT(2)
	t.AddClause(0, true, 1, true)
	t.AddClause(0, false, 1, true)
	ok, a := t.Solve()
	fmt.Println("Thỏa được?", ok, "assignment:", a)
}
\`\`\`

### 7.2 Condensation + DP/topo

Sau khi gộp SCC, chạy DP trên DAG condensation. Ví dụ: **đường đi dài nhất theo số SCC đi qua** (longest path on DAG) — bài tập 6.

### 7.3 Phát hiện deadlock / circular dependency có hướng

Một hệ phụ thuộc (build targets, lock acquisition, import module) là đồ thị có hướng. **Bất kỳ SCC nào có ≥ 2 đỉnh (hoặc 1 đỉnh có self-loop) đều là một chu trình** → circular dependency / nguy cơ deadlock. SCC giúp **gom cả cụm** mắc kẹt thay vì chỉ tìm 1 cạnh chu trình.

### 7.4 Mother vertex (đỉnh mẹ)

**Mother vertex** = đỉnh từ đó tới được **mọi** đỉnh khác. Quan sát: nếu tồn tại, mother vertex phải nằm trong **SCC nguồn duy nhất** của condensation (in-degree 0 trong DAG). Nếu condensation có > 1 SCC in-degree 0 → không có mother vertex. (Bài tập 5.)

> ❓ **Câu hỏi tự nhiên.** *"Vì sao mother vertex phải ở SCC nguồn?"* → Nếu đỉnh \`m\` tới mọi đỉnh, thì SCC của \`m\` phải tới mọi SCC khác trong condensation → SCC của \`m\` là nguồn (không SCC nào tới được nó từ bên ngoài), và phải là nguồn **duy nhất** (nếu có nguồn khác, không ai tới nó được từ \`m\`).

---

## 8. Bridges & Articulation points (biến thể low-link cho đồ thị VÔ HƯỚNG)

> 💡 **Trực giác.** Cùng ý tưởng \`disc/low\` của Tarjan, nhưng cho **đồ thị vô hướng**:
> - **Cầu (bridge)**: cạnh mà nếu xóa đi sẽ làm tăng số connected component (cắt đồ thị thành 2 phần). Cạnh \`(u, v)\` là cầu khi \`low[v] > disc[u]\` — cây con của \`v\` **không** có đường nào "trèo lên" tới \`u\` hay tổ tiên của \`u\` ngoài chính cạnh \`(u,v)\`.
> - **Đỉnh khớp (articulation point / cut vertex)**: đỉnh mà xóa đi làm tăng số component. \`u\` là khớp nếu (a) \`u\` là gốc DFS và có ≥ 2 con trong cây DFS, hoặc (b) \`u\` không phải gốc và có con \`v\` với \`low[v] >= disc[u]\`.

**Lưu ý vô hướng:** mỗi cạnh xuất hiện 2 chiều trong danh sách kề; phải **bỏ qua cạnh cha** (parent) khi cập nhật low để không nhầm cạnh cây thành back-edge.

**Code Go — tìm bridges (critical connections):**

\`\`\`go
package main

import "fmt"

// Tìm tất cả cầu trong đồ thị VÔ HƯỚNG n đỉnh.
func bridges(n int, adj [][]int) [][2]int {
	disc := make([]int, n)
	low := make([]int, n)
	for i := range disc {
		disc[i] = -1
	}
	timer := 0
	var res [][2]int

	var dfs func(u, parent int)
	dfs = func(u, parent int) {
		disc[u], low[u] = timer, timer
		timer++
		for _, v := range adj[u] {
			if v == parent {
				continue // bỏ qua cạnh quay về cha (vô hướng)
			}
			if disc[v] == -1 {
				dfs(v, u)
				if low[v] < low[u] {
					low[u] = low[v]
				}
				if low[v] > disc[u] {
					// không trèo lên được u → (u,v) là CẦU
					res = append(res, [2]int{u, v})
				}
			} else {
				// back edge tới đỉnh đã thăm (không phải cha)
				if disc[v] < low[u] {
					low[u] = disc[v]
				}
			}
		}
	}
	for u := 0; u < n; u++ {
		if disc[u] == -1 {
			dfs(u, -1)
		}
	}
	return res
}

func main() {
	// 4 đỉnh: tam giác 0-1-2 + đuôi 2-3. Cạnh (2,3) là cầu.
	n := 4
	adj := make([][]int, n)
	addU := func(a, b int) { adj[a] = append(adj[a], b); adj[b] = append(adj[b], a) }
	addU(0, 1); addU(1, 2); addU(2, 0); addU(2, 3)
	fmt.Println("Bridges:", bridges(n, adj)) // [[2 3]]
}
\`\`\`

> ⚠ **Lỗi thường gặp #4 (bridges).** Quên \`if v == parent { continue }\` → cạnh cây bị tính như back-edge, làm \`low[v]\` quá nhỏ → bỏ sót cầu. Lưu ý tinh tế hơn: nếu đồ thị có **cạnh song song** (multi-edge) giữa \`u,v\`, chỉ skip parent một lần (dùng skip theo chỉ số cạnh thay vì theo đỉnh). Với bridge, dùng \`disc[v]\` (không phải \`low[v]\`) ở nhánh back edge — giống Tarjan.

---

## 9. Độ phức tạp

Cả **Kosaraju** và **Tarjan**: **thời gian O(V + E)**, **bộ nhớ O(V + E)**.

- DFS mỗi đỉnh thăm 1 lần, mỗi cạnh duyệt 1 lần (Tarjan) hoặc 2 lần (Kosaraju: 1 lần build \`Gᵀ\`, mỗi DFS 1 lần) → vẫn tuyến tính theo \`V+E\`.
- Kosaraju tốn thêm O(V+E) bộ nhớ cho \`Gᵀ\` và stack finish order.
- Tarjan tốn O(V) cho \`disc/low/onStack/stack\`.

| Thuật toán | Thời gian | Bộ nhớ phụ |
|---|---|---|
| Kosaraju | O(V+E) | O(V+E) (\`Gᵀ\` + stack) |
| Tarjan | O(V+E) | O(V) |
| Bridges/Articulation (Tarjan) | O(V+E) | O(V) |

---

## 10. Cạm bẫy (tổng hợp)

| # | Cạm bẫy | Hậu quả | Cách tránh |
|---|---|---|---|
| 1 | Nhầm SCC (directed) với CC (undirected) | Gộp sai cụm; loang 1 chiều tưởng là SCC | Luôn hỏi: đồ thị có hướng hay không? SCC cần **cả 2 chiều** |
| 2 | Kosaraju quên transpose / DFS2 trên G | Gộp tất cả thành 1 SCC khổng lồ | DFS lần 2 **bắt buộc** trên \`Gᵀ\` |
| 3 | Kosaraju pop sai thứ tự (tăng thay vì giảm finish) | SCC sai | Duyệt finish order **giảm dần** (stack LIFO) |
| 4 | Tarjan: tree edge dùng \`disc[v]\` thay \`low[v]\` | Bỏ sót đường trèo qua cây con | Tree edge → \`low[v]\`; back edge → \`disc[v]\` |
| 5 | Tarjan: quên check \`onStack\` ở cross edge | Gộp nhầm 2 SCC tách biệt | Chỉ cập nhật low khi \`onStack[v]\` |
| 6 | Bridges: quên skip parent | Bỏ sót cầu | \`if v == parent continue\` |
| 7 | 2-SAT: nhầm chiều implication | Vô nghiệm sai / nghiệm sai | \`(x∨y)\` ⇔ \`¬x→y\` **và** \`¬y→x\` |

> ⚠ **Cạm bẫy stack membership.** Trong Tarjan, kiểm tra "v còn trên stack không" **phải** dùng mảng \`onStack[]\` (O(1)), KHÔNG duyệt stack mỗi lần (O(V) → tổng O(V·E), mất tính tuyến tính). Đừng quên reset \`onStack[w]=false\` khi pop.

---

## Bài tập

> Tất cả đều có **lời giải chi tiết** ở mục kế tiếp.

1. **Đếm số SCC (Kosaraju).** Cho đồ thị có hướng \`n\` đỉnh, \`m\` cạnh. Trả về số SCC. Big-O?
2. **Liệt kê SCC (Tarjan).** Cùng input, trả về danh sách các SCC (mỗi SCC là tập đỉnh). Big-O?
3. **Critical connections (bridges).** Cho mạng \`n\` server nối bởi các kết nối vô hướng. Tìm mọi "kết nối tới hạn" (xóa đi làm mạng đứt). (LeetCode 1192.) Big-O?
4. **2-SAT.** Cho \`n\` biến boolean và \`m\` mệnh đề 2-literal, kiểm tra thỏa được và đưa ra một phép gán. Big-O?
5. **Mother vertex.** Cho đồ thị có hướng, tìm một đỉnh từ đó tới được mọi đỉnh khác, hoặc báo không tồn tại. Big-O?
6. **Condensation + longest path.** Gộp SCC thành condensation DAG, rồi tìm đường đi dài nhất (theo số siêu đỉnh) trên DAG đó. Big-O?

---

## Lời giải chi tiết

### Bài 1 — Đếm số SCC (Kosaraju)

**Cách tiếp cận.** Chạy \`kosaraju(n, adj)\` ở mục 4, kết quả \`len(scc)\` là số SCC. Nếu chỉ cần *đếm*, không cần lưu thành phần — có thể chỉ tăng biến đếm mỗi lần khởi tạo DFS lần 2 từ một đỉnh chưa thăm.

\`\`\`go
func countSCC(n int, adj [][]int) int {
	return len(kosaraju(n, adj)) // dùng hàm ở mục 4
}
\`\`\`

**Walk-through** với đồ thị mục 2: \`kosaraju\` trả 3 SCC → đáp án **3**.
**Độ phức tạp:** O(V+E) thời gian (2 DFS + transpose), O(V+E) bộ nhớ.

### Bài 2 — Liệt kê SCC (Tarjan)

**Cách tiếp cận.** Gọi thẳng \`tarjan(n, adj)\` ở mục 5. Mỗi phần tử của slice trả về là 1 SCC.

\`\`\`go
func listSCC(n int, adj [][]int) [][]int {
	return tarjan(n, adj) // dùng hàm ở mục 5
}
\`\`\`

**Walk-through:** với đồ thị mục 2 trả \`[{3,4,5}, {0,1,2}, {6,7}]\` (thứ tự topo ngược của condensation).
**Độ phức tạp:** O(V+E) thời gian, O(V) bộ nhớ phụ. Tarjan nhanh hơn Kosaraju về hằng số (1 DFS).

### Bài 3 — Critical connections (bridges)

**Cách tiếp cận.** Đây là tìm **cầu** trên đồ thị vô hướng → dùng \`bridges\` ở mục 8. Server = đỉnh, kết nối = cạnh vô hướng.

\`\`\`go
func criticalConnections(n int, connections [][]int) [][]int {
	adj := make([][]int, n)
	for _, c := range connections {
		adj[c[0]] = append(adj[c[0]], c[1])
		adj[c[1]] = append(adj[c[1]], c[0])
	}
	res := [][]int{}
	for _, e := range bridges(n, adj) { // hàm ở mục 8
		res = append(res, []int{e[0], e[1]})
	}
	return res
}
\`\`\`

**Walk-through.** \`n=4\`, connections \`[[0,1],[1,2],[2,0],[1,3]]\`: tam giác \`0-1-2\` không có cầu (mọi cạnh nằm trong chu trình → xóa vẫn liên thông), cạnh \`(1,3)\` là cầu (xóa → đỉnh 3 cô lập). Đáp án: \`[[1,3]]\`.
**Độ phức tạp:** O(V+E) thời gian, O(V+E) bộ nhớ (danh sách kề).

### Bài 4 — 2-SAT

**Cách tiếp cận.** Dùng \`TwoSAT\` ở mục 7.1. Build implication graph, chạy Tarjan, kiểm tra \`comp[2i] == comp[2i+1]\`.

\`\`\`go
func solve2SAT(n int, clauses [][4]interface{}) (bool, []bool) {
	t := NewTwoSAT(n)
	for _, c := range clauses {
		i := c[0].(int); a := c[1].(bool)
		j := c[2].(int); b := c[3].(bool)
		t.AddClause(i, a, j, b)
	}
	return t.Solve()
}
\`\`\`

**Walk-through.** \`(x0 ∨ x1) ∧ (¬x0 ∨ x1)\`: không biến nào có \`x\` và \`¬x\` cùng SCC → **thỏa được**, ví dụ \`x1=True\`. Nếu thêm \`(¬x1) ∧ (¬x1)\` (ép x1 sai) tạo mâu thuẫn với các mệnh đề ép x1 đúng → một biến rơi vào \`comp[2i]==comp[2i+1]\` → **vô nghiệm**.
**Độ phức tạp:** O(n + m) — V = 2n đỉnh, E = 2m cạnh, Tarjan O(V+E).

### Bài 5 — Mother vertex

**Cách tiếp cận.** Mẹo dựa trên finish time (Kosaraju lemma): đỉnh **hoàn thành cuối cùng** trong DFS đầu là **ứng viên duy nhất** cho mother vertex. Sau đó **kiểm chứng** bằng 1 DFS/BFS từ ứng viên xem có tới mọi đỉnh không.

\`\`\`go
func motherVertex(n int, adj [][]int) int {
	visited := make([]bool, n)
	last := 0
	var dfs func(u int)
	dfs = func(u int) {
		visited[u] = true
		for _, v := range adj[u] {
			if !visited[v] {
				dfs(v)
			}
		}
	}
	// Bước 1: tìm ứng viên = đỉnh khởi DFS cuối cùng
	for u := 0; u < n; u++ {
		if !visited[u] {
			dfs(u)
			last = u
		}
	}
	// Bước 2: kiểm chứng từ last có tới mọi đỉnh không
	for i := range visited {
		visited[i] = false
	}
	dfs(last)
	for _, ok := range visited {
		if !ok {
			return -1 // không có mother vertex
		}
	}
	return last
}
\`\`\`

**Vì sao đúng?** Đỉnh khởi DFS cuối cùng nằm trong SCC nguồn của condensation (nếu mother vertex tồn tại thì nó ở đây). DFS bước 2 kiểm chứng. Nếu condensation có > 1 SCC nguồn → bước 2 thất bại → trả -1.
**Walk-through.** \`0→1, 1→2, 2→0, 2→3\`: ứng viên (DFS cuối) thuộc \`{0,1,2}\`, từ đó tới \`0,1,2,3\` đủ → mother vertex tồn tại (vd đỉnh 0). Nếu thêm đỉnh cô lập \`4\` không cạnh → bước 2 không tới 4 → trả -1.
**Độ phức tạp:** O(V+E) — 2 lần DFS.

### Bài 6 — Condensation + longest path

**Cách tiếp cận.** (1) Tìm SCC (Tarjan), gán \`comp[u]\` = id SCC. (2) Build DAG condensation: với mỗi cạnh \`u→v\` mà \`comp[u]!=comp[v]\`, thêm cạnh \`comp[u]→comp[v]\` (loại trùng nếu cần). (3) Longest path trên DAG bằng topo sort + DP: \`dp[c] = 1 + max(dp[next])\`.

\`\`\`go
func longestPathCondensation(n int, adj [][]int) int {
	scc := tarjan(n, adj)        // mục 5
	comp := make([]int, n)
	for id, c := range scc {
		for _, u := range c {
			comp[u] = id
		}
	}
	k := len(scc)
	cadj := make([][]int, k)
	indeg := make([]int, k)
	seen := map[[2]int]bool{}
	for u := 0; u < n; u++ {
		for _, v := range adj[u] {
			cu, cv := comp[u], comp[v]
			if cu != cv && !seen[[2]int{cu, cv}] {
				seen[[2]int{cu, cv}] = true
				cadj[cu] = append(cadj[cu], cv)
				indeg[cv]++
			}
		}
	}
	// topo (Kahn) + DP longest path
	queue := []int{}
	dp := make([]int, k)
	for c := 0; c < k; c++ {
		dp[c] = 1
		if indeg[c] == 0 {
			queue = append(queue, c)
		}
	}
	best := 1
	for len(queue) > 0 {
		c := queue[0]; queue = queue[1:]
		for _, nx := range cadj[c] {
			if dp[c]+1 > dp[nx] {
				dp[nx] = dp[c] + 1
			}
			if dp[nx] > best {
				best = dp[nx]
			}
			indeg[nx]--
			if indeg[nx] == 0 {
				queue = append(queue, nx)
			}
		}
	}
	return best // số siêu đỉnh trên đường dài nhất
}
\`\`\`

**Walk-through.** Đồ thị mục 2: 3 SCC, condensation \`A→B\`, \`C→B\`. Đường dài nhất qua 2 siêu đỉnh (\`A→B\` hoặc \`C→B\`) → **2**.
**Độ phức tạp:** O(V+E) cho SCC + O(V+E) build condensation + O(K+E') cho topo DP, tổng **O(V+E)**.

> 🔁 **Dừng lại tự kiểm tra.** Vì sao longest path trên đồ thị gốc (có chu trình) là vô nghĩa, nhưng trên condensation lại tính được?
> <details><summary>Đáp án</summary>
> Trên đồ thị có chu trình, "đường dài nhất" có thể vô hạn (đi vòng mãi). Condensation là **DAG** (không chu trình) → đường đi hữu hạn, longest path trên DAG luôn xác định bằng topo + DP.
> </details>

---

## Code & Minh họa

- Code Go đầy đủ nằm **inline** trong README này (mục 4, 5, 7.1, 8 và các lời giải). Không có file \`solutions.go\` riêng.
- [visualization.html](./visualization.html) — 3 module tương tác:
  1. **Kosaraju animator**: DFS lần 1 (finish order) → transpose → DFS lần 2 tô màu từng SCC.
  2. **Tarjan animator**: theo dõi \`disc/low\` cập nhật, pop stack khi \`low==disc\`.
  3. **Condensation**: gộp SCC thành DAG siêu đỉnh.

## Bài tiếp theo

- **[Lesson 38 — Network Flow](../lesson-38-network-flow/README.md)**: max flow / min cut, Ford-Fulkerson, Edmonds-Karp.
- Ôn lại: [L31 BFS/DFS](../lesson-31-graph-traversal/README.md), [L32 Topo sort](../lesson-32-topological-sort/README.md), [L36 Connected Components](../lesson-36-connected-components/README.md).
`;
