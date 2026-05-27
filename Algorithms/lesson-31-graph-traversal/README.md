# Lesson 31 — Duyệt đồ thị: BFS & DFS

> **Tier 5 · Bài đầu** — Mở màn chuỗi thuật toán đồ thị. Mọi thuật toán đồ thị về sau (sắp xếp topo, Dijkstra, MST, SCC, network flow) đều xây trên hai cách duyệt nền tảng: **BFS (Breadth-First Search — tìm kiếm theo bề rộng)** và **DFS (Depth-First Search — tìm kiếm theo chiều sâu)**. Nắm chắc hai cái này là nắm 80% tư duy đồ thị.

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Biết **biểu diễn đồ thị** bằng 3 cách: adjacency list, adjacency matrix, edge list — và *khi nào* dùng cái nào.
- Phân biệt **directed/undirected** (có hướng / vô hướng), **weighted/unweighted** (có trọng số / không).
- Cài đặt **BFS** bằng queue, duyệt theo *tầng (level)*, và dùng nó tìm **đường đi ngắn nhất theo số cạnh** trên đồ thị không trọng số.
- Cài đặt **DFS** cả đệ quy lẫn iterative (dùng stack), phân biệt **pre-order** và **post-order**.
- Hiểu vì sao **visited set** là bắt buộc (đồ thị có chu trình → không có nó là vòng lặp vô hạn).
- Áp dụng BFS/DFS vào các bài kinh điển: số đảo, mê cung, connected components, bipartite check, rotting oranges (multi-source).
- Biết **khi nào dùng BFS, khi nào dùng DFS**, và các **cạm bẫy** thường gặp.

## Kiến thức tiền đề

- [DataStructures](../../DataStructures/index.html) — cấu trúc đồ thị, queue, stack, hash set.
- [Lesson 12 — Binary Search Variants](../lesson-12-binary-search-variants/) — tư duy duyệt không gian.
- [Lesson 18 — Backtracking](../lesson-18-backtracking/) — DFS chính là backtracking trên đồ thị.
- Bài tiếp theo: [Lesson 32 — Sắp xếp Topo](../lesson-32-topological-sort/) dùng DFS post-order; [Lesson 33 — Dijkstra](../lesson-33-dijkstra/) tổng quát BFS sang đồ thị **có trọng số**.

---

## 1. Biểu diễn đồ thị

> 💡 **Trực giác.** Một đồ thị (graph) là tập **đỉnh (vertex/node)** nối nhau bằng **cạnh (edge)**. Hình dung bản đồ tàu điện: nhà ga là đỉnh, đường ray nối 2 ga là cạnh. Máy tính không "nhìn" được hình vẽ — ta phải mã hóa "ga nào nối ga nào" thành dữ liệu. Có 3 cách mã hóa, mỗi cách trade-off khác nhau giữa **tốn bộ nhớ** và **tra cứu nhanh**.

Quy ước: gọi `V` = số đỉnh, `E` = số cạnh. Đỉnh đánh số `0..V-1`.

### 1.1 Adjacency list (danh sách kề) — mặc định nên dùng

Mỗi đỉnh giữ một danh sách các đỉnh kề nó. Đây là biểu diễn **dùng 95% thời gian** trong thực tế và thi đấu.

Ví dụ đồ thị vô hướng 5 đỉnh, 4 cạnh: `0-1, 0-2, 1-3, 2-4`.

```
adj[0] = [1, 2]
adj[1] = [0, 3]
adj[2] = [0, 4]
adj[3] = [1]
adj[4] = [2]
```

```go
// Adjacency list: slice các slice. adj[u] = danh sách đỉnh kề u.
type Graph struct {
    n   int
    adj [][]int
}

func NewGraph(n int) *Graph {
    return &Graph{n: n, adj: make([][]int, n)}
}

// AddEdge thêm cạnh. directed=false → thêm cả 2 chiều (vô hướng).
func (g *Graph) AddEdge(u, v int, directed bool) {
    g.adj[u] = append(g.adj[u], v)
    if !directed {
        g.adj[v] = append(g.adj[v], u) // cạnh vô hướng = 2 cạnh có hướng
    }
}
```

**Walk-through xây đồ thị trên:**

| Lệnh | adj sau lệnh |
|------|--------------|
| `AddEdge(0,1,false)` | `adj[0]=[1]`, `adj[1]=[0]` |
| `AddEdge(0,2,false)` | `adj[0]=[1,2]`, `adj[2]=[0]` |
| `AddEdge(1,3,false)` | `adj[1]=[0,3]`, `adj[3]=[1]` |
| `AddEdge(2,4,false)` | `adj[2]=[0,4]`, `adj[4]=[2]` |

- **Bộ nhớ**: O(V + E) — mỗi đỉnh 1 ô, mỗi cạnh 2 entry (vô hướng) hay 1 (có hướng). Rất tiết kiệm cho đồ thị **thưa (sparse)** (E ≪ V²).
- **Tra cứu "u kề những ai?"**: O(deg(u)) — duyệt thẳng danh sách, nhanh.
- **Tra cứu "u và v có nối nhau?"**: O(deg(u)) — phải quét danh sách. Chậm hơn matrix.

### 1.2 Adjacency matrix (ma trận kề)

Ma trận `M[V][V]`, `M[u][v] = 1` nếu có cạnh `u→v`, ngược lại `0`. Với đồ thị có trọng số, lưu trọng số thay cho 1.

Đồ thị trên (vô hướng → ma trận đối xứng):

```
     0  1  2  3  4
  0 [0, 1, 1, 0, 0]
  1 [1, 0, 0, 1, 0]
  2 [1, 0, 0, 0, 1]
  3 [0, 1, 0, 0, 0]
  4 [0, 0, 1, 0, 0]
```

```go
type MatrixGraph struct {
    n   int
    mat [][]int
}

func NewMatrixGraph(n int) *MatrixGraph {
    mat := make([][]int, n)
    for i := range mat {
        mat[i] = make([]int, n) // mặc định 0 = không có cạnh
    }
    return &MatrixGraph{n: n, mat: mat}
}

func (g *MatrixGraph) AddEdge(u, v int, directed bool) {
    g.mat[u][v] = 1
    if !directed {
        g.mat[v][u] = 1
    }
}

// HasEdge: O(1) — ưu điểm lớn nhất của matrix.
func (g *MatrixGraph) HasEdge(u, v int) bool { return g.mat[u][v] == 1 }
```

- **Bộ nhớ**: O(V²) — *luôn luôn*, kể cả khi ít cạnh. Với V = 10⁵ là 10¹⁰ ô → không khả thi. Chỉ dùng khi V nhỏ (≤ ~2000) hoặc đồ thị **dày (dense)** (E ≈ V²).
- **Tra cứu "u, v có nối?"**: **O(1)** — đây là điểm mạnh duy nhất.
- **Duyệt hàng xóm của u**: O(V) — phải quét cả hàng, kể cả ô 0. Chậm hơn list khi thưa.

### 1.3 Edge list (danh sách cạnh)

Chỉ lưu một danh sách các cặp `(u, v)` (và trọng số nếu có). Đơn giản nhất, dùng cho các thuật toán cần *duyệt qua từng cạnh* như **Kruskal** (L35) hay **Bellman-Ford** (L34).

```go
type Edge struct{ U, V, W int } // W = weight (trọng số), bỏ qua nếu unweighted

// Đồ thị trên dưới dạng edge list:
edges := []Edge{{0, 1, 0}, {0, 2, 0}, {1, 3, 0}, {2, 4, 0}}
```

- **Bộ nhớ**: O(E). Nhỏ gọn.
- **Tra cứu hàng xóm / có cạnh**: O(E) — phải quét toàn bộ. Tệ cho duyệt, nên hiếm dùng cho BFS/DFS trực tiếp.

### 1.4 So sánh & khi nào dùng

| Tiêu chí | Adjacency list | Adjacency matrix | Edge list |
|----------|:---:|:---:|:---:|
| Bộ nhớ | **O(V+E)** | O(V²) | **O(E)** |
| Duyệt hàng xóm của u | **O(deg u)** | O(V) | O(E) |
| Hỏi "u-v có cạnh?" | O(deg u) | **O(1)** | O(E) |
| Hợp với đồ thị | thưa (sparse) | dày (dense), V nhỏ | thuật toán theo cạnh |
| BFS/DFS dùng được? | ✓ tốt nhất | ✓ nhưng O(V²) | ✗ (cần convert) |

> ⚠ **Lỗi thường gặp.** Dùng adjacency matrix cho đồ thị mạng xã hội (V = 10⁶ người, mỗi người ~vài trăm bạn). Matrix tốn 10¹² ô → tràn RAM ngay. Đồ thị thực tế gần như luôn **thưa** → dùng adjacency list.

> ❓ **Câu hỏi tự nhiên của người đọc.**
> - *"Vô hướng thì sao biết đếm cạnh đúng?"* — Trong adjacency list, cạnh vô hướng `u-v` xuất hiện **2 lần** (`adj[u]` chứa `v`, `adj[v]` chứa `u`). Tổng độ dài tất cả list = `2E`. Đừng nhầm lẫn khi đếm.
> - *"Có hướng (directed) thì AddEdge khác gì?"* — Chỉ thêm `adj[u] = append(adj[u], v)`, **không** thêm chiều ngược. `u→v` không kéo theo `v→u`.
> - *"Weighted lưu thế nào trong list?"* — `adj[u]` lưu cặp `{đỉnh, trọng số}` thay vì chỉ `int`. Sẽ dùng nhiều ở Dijkstra (L33).

> 🔁 **Dừng lại tự kiểm tra.** Đồ thị **có hướng** 3 đỉnh với cạnh `0→1, 1→2, 0→2`. Viết adjacency list.
> <details><summary>Đáp án</summary>
>
> `adj[0]=[1,2]`, `adj[1]=[2]`, `adj[2]=[]`. Đỉnh 2 không có cạnh đi ra → list rỗng. Tổng độ dài list = 3 = E (vì có hướng, không nhân đôi).
> </details>

> 📝 **Tóm tắt mục 1.** (1) 3 biểu diễn: list (O(V+E), mặc định), matrix (O(V²), tra O(1)), edge list (O(E), theo cạnh). (2) Đồ thị thực gần như luôn thưa → adjacency list. (3) Vô hướng = thêm 2 chiều; tổng list = 2E. (4) Có hướng = 1 chiều; tổng list = E.

---

## 2. BFS — Tìm kiếm theo bề rộng

> 💡 **Trực giác.** Thả một giọt mực vào nước: vết loang ra theo *vòng tròn đồng tâm* — trước hết là các điểm cách 1 đơn vị, rồi cách 2, rồi cách 3... BFS duyệt đồ thị **đúng kiểu đó**: thăm tất cả đỉnh cách nguồn 1 cạnh, rồi tất cả đỉnh cách 2 cạnh, rồi 3... Vì duyệt theo *tầng (level)* tăng dần, lần đầu chạm tới một đỉnh chính là **đường ngắn nhất** (ít cạnh nhất) tới nó.

BFS dùng **queue (hàng đợi FIFO)**: lấy ra đỉnh sớm nhất, đẩy các hàng xóm chưa thăm vào cuối.

```go
// BFS từ đỉnh start. Trả về thứ tự thăm.
func (g *Graph) BFS(start int) []int {
    visited := make([]bool, g.n)
    queue := []int{start}
    visited[start] = true // ĐÁNH DẤU NGAY KHI ĐẨY VÀO QUEUE (không phải khi lấy ra)
    var order []int

    for len(queue) > 0 {
        u := queue[0]      // lấy đầu queue (FIFO)
        queue = queue[1:]
        order = append(order, u)
        for _, v := range g.adj[u] {
            if !visited[v] {
                visited[v] = true       // đánh dấu ngay → tránh đẩy trùng vào queue
                queue = append(queue, v) // đẩy vào cuối
            }
        }
    }
    return order
}
```

### 2.1 Walk-through BFS trên đồ thị cụ thể

Đồ thị vô hướng 6 đỉnh:

```
adj[0]=[1,2]   adj[1]=[0,3,4]   adj[2]=[0,4]
adj[3]=[1,5]   adj[4]=[1,2,5]   adj[5]=[3,4]
```

BFS từ đỉnh `0`. Theo dõi queue, visited, và **level** (khoảng cách từ 0):

| Bước | Lấy ra `u` | Hàng xóm chưa thăm | Đẩy vào | Queue sau | order |
|:---:|:---:|---|---|---|---|
| 1 | 0 | 1, 2 | 1, 2 | `[1,2]` | `[0]` |
| 2 | 1 | 3, 4 | 3, 4 | `[2,3,4]` | `[0,1]` |
| 3 | 2 | (4 đã thăm) | — | `[3,4]` | `[0,1,2]` |
| 4 | 3 | 5 | 5 | `[4,5]` | `[0,1,2,3]` |
| 5 | 4 | (5 đã thăm) | — | `[5]` | `[0,1,2,3,4]` |
| 6 | 5 | — | — | `[]` | `[0,1,2,3,4,5]` |

**Level (khoảng cách từ 0):** `lvl[0]=0`; `lvl[1]=lvl[2]=1`; `lvl[3]=lvl[4]=2`; `lvl[5]=3`.

Để ý: đỉnh 4 *được phát hiện* từ đỉnh 1 (bước 2), nên `lvl[4]=2`. Khi xử lý đỉnh 2 (bước 3), đỉnh 4 đã `visited` → không xử lý lại. Đó là lý do **đánh dấu visited khi đẩy vào queue**, không phải khi lấy ra (nếu đánh dấu lúc lấy ra, đỉnh 4 sẽ vào queue 2 lần).

### 2.2 BFS tính khoảng cách & đường đi ngắn nhất (unweighted)

```go
// BFSShortest trả về dist[] (số cạnh ít nhất từ start) và parent[] (để truy vết đường đi).
// dist = -1 nghĩa là không tới được.
func (g *Graph) BFSShortest(start int) (dist, parent []int) {
    dist = make([]int, g.n)
    parent = make([]int, g.n)
    for i := range dist {
        dist[i], parent[i] = -1, -1
    }
    dist[start] = 0
    queue := []int{start}
    for len(queue) > 0 {
        u := queue[0]
        queue = queue[1:]
        for _, v := range g.adj[u] {
            if dist[v] == -1 { // dist==-1 đóng luôn vai trò "chưa thăm"
                dist[v] = dist[u] + 1 // tầng kế tiếp
                parent[v] = u
                queue = append(queue, v)
            }
        }
    }
    return
}

// Truy vết đường đi start → target từ parent[].
func reconstruct(parent []int, start, target int) []int {
    if parent[target] == -1 && target != start {
        return nil // không tới được
    }
    var path []int
    for at := target; at != -1; at = parent[at] {
        path = append([]int{at}, path...) // prepend
    }
    return path
}
```

Với đồ thị mục 2.1: `dist = [0,1,1,2,2,3]`. Đường đi 0→5: truy `parent[5]=3, parent[3]=1, parent[1]=0` → `[0,1,3,5]` (3 cạnh) ✓ khớp `dist[5]=3`.

> ⚠ **Lỗi thường gặp.** Dùng BFS tìm đường ngắn nhất trên đồ thị **có trọng số** → SAI. BFS chỉ đúng khi mọi cạnh "dài bằng nhau" (mỗi bước +1). Có trọng số khác nhau phải dùng **Dijkstra (L33)**. Ví dụ cạnh `0→1` nặng 10, `0→2→1` mỗi cạnh nặng 1: BFS bảo `0→1` ngắn (1 cạnh) nhưng thực tế `0→2→1` rẻ hơn (2 < 10).

> ❓ **Câu hỏi tự nhiên.**
> - *"Vì sao lần đầu chạm = ngắn nhất?"* — Vì queue xử lý theo level tăng dần: mọi đỉnh level k được lấy ra trước mọi đỉnh level k+1. Lần đầu một đỉnh được phát hiện, nó đến từ level nhỏ nhất có thể.
> - *"dist[v]==-1 thay visited được không?"* — Được, và còn gọn hơn: `-1` vừa là "chưa thăm" vừa là "khoảng cách chưa xác định".

> 🔁 **Dừng lại tự kiểm tra.** Trên đồ thị mục 2.1, BFS từ đỉnh **3**, `dist[2]` = ?
> <details><summary>Đáp án</summary>
>
> Từ 3: `dist[3]=0`; hàng xóm 1,5 → `dist=1`; từ 1: 0,4 → `dist=2`; từ 5: 4 đã có; từ 0: 2 → `dist[2]=3`; từ 4: 2 đã chờ. Vậy `dist[2]=3`. (Đường 3→1→0→2.)
> </details>

> 📝 **Tóm tắt mục 2.** (1) BFS = queue FIFO, duyệt theo tầng. (2) Đánh dấu visited *khi đẩy vào queue*. (3) Lần đầu chạm đỉnh = đường ngắn nhất theo **số cạnh** (chỉ đúng với unweighted). (4) `parent[]` để truy vết đường đi.

---

## 3. DFS — Tìm kiếm theo chiều sâu

> 💡 **Trực giác.** Đi vào mê cung kiểu "luôn rẽ vào lối mới đầu tiên, chỉ quay lại khi cụt đường". Đó là DFS: từ một đỉnh, lao thật sâu theo một hàng xóm cho tới khi không đi được nữa, *rồi mới* quay lui (backtrack) thử hàng xóm khác. Khác hẳn BFS (loang đều ra mọi hướng), DFS đâm sâu một nhánh trước.

### 3.1 DFS đệ quy

```go
func (g *Graph) DFS(start int) []int {
    visited := make([]bool, g.n)
    var order []int
    var dfs func(u int)
    dfs = func(u int) {
        visited[u] = true
        order = append(order, u) // PRE-ORDER: ghi nhận khi VÀO đỉnh
        for _, v := range g.adj[u] {
            if !visited[v] {
                dfs(v)
            }
        }
        // POST-ORDER: chỗ này là lúc RỜI đỉnh (mọi con đã xong)
    }
    dfs(start)
    return order
}
```

### 3.2 Pre-order vs Post-order

- **Pre-order**: ghi nhận đỉnh **khi vừa bước vào** (trước khi đệ quy con). Cho thứ tự "khám phá".
- **Post-order**: ghi nhận đỉnh **khi rời** (sau khi mọi con đã xử lý xong). Quan trọng cho **topological sort (L32)** và phát hiện chu trình.

Walk-through DFS từ đỉnh `0` trên đồ thị mục 2.1 (hàng xóm xét theo thứ tự trong adj):

```
Vào 0 → vào 1 (hàng xóm đầu của 0)
  Vào 1 → vào 0? đã thăm. vào 3
    Vào 3 → vào 1? đã thăm. vào 5
      Vào 5 → vào 3? đã. vào 4
        Vào 4 → 1,2 ... 1 đã thăm; vào 2
          Vào 2 → 0,4 đều đã thăm → cụt, RỜI 2
        RỜI 4
      RỜI 5
    RỜI 3
  RỜI 1
  (0 còn hàng xóm 2 nhưng 2 đã thăm)
RỜI 0
```

- **Pre-order**: `[0, 1, 3, 5, 4, 2]`
- **Post-order**: `[2, 4, 5, 3, 1, 0]` (thứ tự RỜI)

> ⚠ **Lỗi thường gặp.** DFS đệ quy trên đồ thị **rất sâu** (vd đường thẳng 10⁶ đỉnh, hoặc grid 10⁶ ô) → **stack overflow** vì độ sâu đệ quy quá lớn. Khắc phục: dùng **iterative DFS với stack tường minh** (mục 9), hoặc tăng giới hạn stack.

> ❓ **Câu hỏi tự nhiên.**
> - *"DFS có cho đường ngắn nhất không?"* — KHÔNG. DFS đâm sâu nên đường nó tìm thấy thường dài. Muốn ngắn nhất (unweighted) → BFS.
> - *"Pre hay post quan trọng hơn?"* — Tùy bài. Connected components / flood fill chỉ cần thăm là đủ. Topological sort cần **post-order đảo ngược**. Cycle detection (đồ thị có hướng) cần phân biệt trạng thái đang-trong-stack.

> 🔁 **Dừng lại tự kiểm tra.** Đồ thị có hướng `0→1, 0→2, 1→3, 2→3`. DFS pre-order từ 0 (hàng xóm theo thứ tự)?
> <details><summary>Đáp án</summary>
>
> Vào 0 → vào 1 → vào 3 (cụt) → RỜI 3, RỜI 1 → quay lại 0, vào 2 → 3 đã thăm → RỜI 2, RỜI 0. Pre-order = `[0, 1, 3, 2]`.
> </details>

> 📝 **Tóm tắt mục 3.** (1) DFS đâm sâu rồi backtrack. (2) Đệ quy ngắn gọn nhưng có thể stack overflow. (3) Pre-order = lúc vào; post-order = lúc rời. (4) DFS *không* cho đường ngắn nhất.

---

## 4. Visited set — bắt buộc, không có không xong

> 💡 **Trực giác.** Đồ thị khác cây ở chỗ có **chu trình (cycle)**: đi vòng vòng quay lại chỗ cũ. Không đánh dấu "đã thăm", BFS/DFS sẽ đi mãi không dừng. `visited` là tấm bản đồ "đã tới đây rồi, đừng quay lại".

Ví dụ tam giác `0-1, 1-2, 2-0` (vô hướng). Không có visited, DFS từ 0:

```
0 → 1 → 2 → 0 → 1 → 2 → 0 → ... (vô hạn)
```

Có visited: `0 → 1 → 2 → (0 đã thăm, dừng) → backtrack`. Thăm đúng 3 đỉnh rồi kết thúc.

```go
// DFS với visited dùng map (linh hoạt khi đỉnh không phải 0..n-1, vd toạ độ grid).
func dfsCyclic(adj map[int][]int, start int) []int {
    visited := map[int]bool{}
    var order []int
    var dfs func(u int)
    dfs = func(u int) {
        if visited[u] { // CHỐT CHẶN: nếu thiếu dòng này → vòng lặp vô hạn
            return
        }
        visited[u] = true
        order = append(order, u)
        for _, v := range adj[u] {
            dfs(v)
        }
    }
    dfs(start)
    return order
}
```

3 cách lưu visited tùy ngữ cảnh:

| Cách | Khi nào |
|------|---------|
| `[]bool` slice | đỉnh đánh số `0..V-1`, nhanh nhất |
| `map[int]bool` | đỉnh thưa / không phải số liên tục |
| đánh dấu tại chỗ trên grid (vd đổi `'1'`→`'0'`) | grid, tiết kiệm bộ nhớ phụ |

> ⚠ **Lỗi thường gặp #1 của cả Tier.** Quên `visited` → **infinite loop** trên đồ thị có chu trình. Triệu chứng: TLE hoặc treo máy. Luôn kiểm tra: có chỗ nào đánh dấu thăm chưa?

> 📝 **Tóm tắt mục 4.** Visited là bắt buộc với đồ thị (vì có chu trình). Đánh dấu khi đẩy vào queue (BFS) hoặc khi vào đỉnh (DFS). Thiếu = lặp vô hạn.

---

## 5. Ứng dụng BFS

### 5.1 Shortest path unweighted & level/distance
Đã trình bày ở mục 2.2 — `dist[]` chính là số cạnh ngắn nhất, `parent[]` để truy vết.

### 5.2 Bipartite check (đồ thị 2 phía) — tô 2 màu

> 💡 Đồ thị **bipartite (2 phía)** nếu chia được đỉnh thành 2 nhóm sao cho **mọi cạnh nối 2 nhóm khác nhau** (không cạnh nào trong cùng nhóm). Tương đương: tô 2 màu, hai đầu mỗi cạnh khác màu. BFS tô từng tầng đan màu xen kẽ; nếu gặp cạnh nối 2 đỉnh **cùng màu** → không bipartite.

```go
// IsBipartite kiểm tra đồ thị (có thể nhiều thành phần) có 2-tô-màu được không.
func (g *Graph) IsBipartite() bool {
    color := make([]int, g.n) // 0 = chưa tô, 1 / -1 = hai màu
    for s := 0; s < g.n; s++ {
        if color[s] != 0 {
            continue
        }
        color[s] = 1
        queue := []int{s}
        for len(queue) > 0 {
            u := queue[0]
            queue = queue[1:]
            for _, v := range g.adj[u] {
                if color[v] == 0 {
                    color[v] = -color[u] // tô màu ngược với u
                    queue = append(queue, v)
                } else if color[v] == color[u] {
                    return false // cạnh nối 2 đỉnh cùng màu → KHÔNG bipartite
                }
            }
        }
    }
    return true
}
```

Walk-through: chu trình **chẵn** `0-1-2-3-0` → tô `0:1, 1:-1, 2:1, 3:-1`, cạnh `3-0` nối -1 và 1 → khác màu ✓ bipartite. Chu trình **lẻ** `0-1-2-0` → `0:1, 1:-1, 2:1`, cạnh `2-0` nối 1 và 1 → cùng màu ✗ không bipartite. (Quy luật: có chu trình lẻ ⇔ không bipartite.)

### 5.3 Word ladder
Biến mỗi từ thành một đỉnh, nối 2 từ nếu khác nhau đúng 1 ký tự. Tìm chuỗi biến đổi ngắn nhất `begin → end` = BFS (số cạnh ít nhất). Xem bài tập 4.

### 5.4 Multi-source BFS
Khởi tạo queue với **nhiều nguồn cùng lúc** thay vì một. Xem mục 11.

> 📝 **Tóm tắt mục 5.** BFS giải: shortest path unweighted, distance theo tầng, bipartite (2-coloring), word ladder, multi-source. Mẫu số chung: bài toán "ít bước nhất / loang đều".

---

## 6. Ứng dụng DFS

### 6.1 Connected components (thành phần liên thông)

Đếm số "cụm" rời rạc trong đồ thị vô hướng: mỗi lần khởi động DFS từ một đỉnh chưa thăm = phát hiện 1 cụm mới.

```go
func (g *Graph) CountComponents() int {
    visited := make([]bool, g.n)
    var dfs func(u int)
    dfs = func(u int) {
        visited[u] = true
        for _, v := range g.adj[u] {
            if !visited[v] {
                dfs(v)
            }
        }
    }
    count := 0
    for s := 0; s < g.n; s++ {
        if !visited[s] {
            count++ // mỗi đỉnh chưa thăm = 1 thành phần mới
            dfs(s)
        }
    }
    return count
}
```

Ví dụ 6 đỉnh, cạnh `0-1, 2-3, 4-5` → 3 thành phần `{0,1}, {2,3}, {4,5}`. DFS khởi động tại 0 (phủ 0,1), tại 2 (phủ 2,3), tại 4 (phủ 4,5) → `count=3` ✓.

### 6.2 Cycle detection (phát hiện chu trình)
- **Undirected**: DFS, nếu gặp đỉnh đã thăm mà *không phải cha trực tiếp* → có chu trình.
- **Directed**: dùng 3 trạng thái (trắng/xám/đen). Gặp lại đỉnh **xám** (đang trong stack đệ quy) → có chu trình. Chi tiết ở L32.

### 6.3 Path existence (có đường đi không)
DFS từ `src`; nếu chạm `dst` → có đường. Đơn giản hơn BFS khi không cần ngắn nhất.

### 6.4 Topological sort (xem trước L32)
Sắp xếp đỉnh sao cho mọi cạnh `u→v` thì `u` đứng trước `v`. Dùng DFS **post-order đảo ngược**. Học kỹ ở [Lesson 32](../lesson-32-topological-sort/).

### 6.5 Flood fill
Tô màu vùng liên thông trên grid (giống công cụ "xô sơn" trong Paint). Nền tảng của bài "số đảo" (mục 8).

> 📝 **Tóm tắt mục 6.** DFS giải: connected components, cycle detection, path existence, topological sort (L32), flood fill. Mẫu số chung: "khám phá toàn bộ / backtrack".

---

## 7. BFS vs DFS — chọn cái nào?

| Tình huống | Chọn | Vì sao |
|-----------|:---:|--------|
| Đường ngắn nhất **unweighted** | **BFS** | duyệt theo tầng → lần đầu chạm = ngắn nhất |
| Khoảng cách / level từ nguồn | **BFS** | dist tăng theo tầng |
| Loang từ nhiều nguồn (multi-source) | **BFS** | tất cả nguồn level 0 cùng lúc |
| Bipartite check | cả 2 (BFS tiện) | tô màu xen kẽ |
| Khám phá toàn bộ / liệt kê | **DFS** | code ngắn (đệ quy), ít bộ nhớ frontier |
| Backtracking / sinh tổ hợp | **DFS** | bản chất là DFS trên cây lựa chọn |
| Topological sort, SCC | **DFS** | dùng post-order |
| Cycle detection | **DFS** | trạng thái đệ quy |
| Đồ thị **rất sâu** (sợ stack) | **BFS** | hoặc iterative DFS |

> ⚠ **Cạm bẫy.** "BFS luôn tốt hơn vì cho đường ngắn nhất" — SAI. Nếu chỉ cần biết *có tới được không* hoặc liệt kê tất cả, DFS đơn giản và nhẹ hơn (frontier của BFS có thể phình to bằng cả một tầng đồ thị).

> 📝 **Tóm tắt mục 7.** Ngắn nhất unweighted / loang đều → **BFS**. Khám phá toàn bộ / backtrack / topo / cycle → **DFS**. Sợ stack overflow → BFS hoặc iterative DFS.

---

## 8. Grid như đồ thị

> 💡 **Trực giác.** Một ma trận 2D (mê cung, bản đồ, ảnh) **chính là một đồ thị ngầm**: mỗi ô `(r,c)` là một đỉnh, mỗi ô kề nhau (trên/dưới/trái/phải) là một cạnh. Không cần dựng adjacency list — hàng xóm tính tại chỗ bằng cộng/trừ tọa độ.

4 hướng (lên/xuống/trái/phải) hoặc 8 hướng (thêm 4 chéo):

```go
var dir4 = [4][2]int{{-1, 0}, {1, 0}, {0, -1}, {0, 1}}            // 4 hướng
var dir8 = [8][2]int{{-1, -1}, {-1, 0}, {-1, 1}, {0, -1},
    {0, 1}, {1, -1}, {1, 0}, {1, 1}}                              // 8 hướng
```

### 8.1 Số đảo (Number of Islands) — flood fill bằng DFS

Grid `'1'` = đất, `'0'` = nước. Đếm số cụm đất liên thông (4 hướng).

```go
func NumIslands(grid [][]byte) int {
    if len(grid) == 0 {
        return 0
    }
    rows, cols := len(grid), len(grid[0])
    var dfs func(r, c int)
    dfs = func(r, c int) {
        // BOUNDS CHECK trước, rồi mới kiểm tra nước/đã thăm
        if r < 0 || r >= rows || c < 0 || c >= cols || grid[r][c] != '1' {
            return
        }
        grid[r][c] = '0' // "dìm" ô đất = đánh dấu visited tại chỗ
        for _, d := range dir4 {
            dfs(r+d[0], c+d[1])
        }
    }
    count := 0
    for r := 0; r < rows; r++ {
        for c := 0; c < cols; c++ {
            if grid[r][c] == '1' {
                count++
                dfs(r, c) // dìm cả đảo
            }
        }
    }
    return count
}
```

Walk-through grid 3×3:

```
1 1 0
0 1 0
0 0 1
```

Quét: ô `(0,0)`='1' → count=1, DFS dìm `(0,0),(0,1),(1,1)` (liên thông). Tiếp tục quét, ô `(2,2)`='1' chưa dìm → count=2, dìm `(2,2)`. Kết quả **2 đảo** ✓.

### 8.2 Mê cung — đường ngắn nhất bằng BFS
Từ ô start tới ô đích, mỗi bước đi 1 ô (4 hướng), tránh tường. Vì mỗi bước "dài" như nhau → BFS. Xem bài tập 2.

> ⚠ **Lỗi thường gặp trên grid.**
> - Quên **bounds check** `r<0 || r>=rows ...` → index out of range (panic).
> - Đếm hướng sai (dùng 4 trong khi đề yêu cầu 8, hoặc ngược lại).
> - Quên đánh dấu visited trên grid → lặp vô hạn giữa 2 ô kề nhau.

> 🔁 **Dừng lại tự kiểm tra.** Grid đảo trên nhưng tính **8 hướng**, số đảo = ?
> <details><summary>Đáp án</summary>
>
> Với 8 hướng, `(1,1)` chéo tới `(2,2)` → tất cả đất nối thành 1 cụm → **1 đảo**. (Hướng kết nối thay đổi kết quả!)
> </details>

> 📝 **Tóm tắt mục 8.** Grid = đồ thị ngầm (ô = đỉnh, kề = cạnh). Hàng xóm tính bằng `dir4`/`dir8`. Luôn bounds-check trước. Số đảo = đếm lần khởi động flood fill.

---

## 9. Iterative DFS — dùng stack tránh stack overflow

DFS đệ quy dùng *ngăn xếp lời gọi (call stack)* của runtime. Đồ thị sâu 10⁶ → 10⁶ tầng đệ quy → tràn stack. Giải pháp: tự quản lý stack tường minh.

```go
func (g *Graph) DFSIterative(start int) []int {
    visited := make([]bool, g.n)
    stack := []int{start}
    var order []int
    for len(stack) > 0 {
        u := stack[len(stack)-1] // peek
        stack = stack[:len(stack)-1] // pop
        if visited[u] {
            continue // có thể bị đẩy trùng; bỏ qua nếu đã thăm
        }
        visited[u] = true
        order = append(order, u)
        // Đẩy hàng xóm vào stack (đảo thứ tự để khớp pre-order đệ quy nếu cần)
        for i := len(g.adj[u]) - 1; i >= 0; i-- {
            v := g.adj[u][i]
            if !visited[v] {
                stack = append(stack, v)
            }
        }
    }
    return order
}
```

> ❓ **Câu hỏi tự nhiên.** *"Vì sao đẩy hàng xóm theo thứ tự ngược?"* — Stack là LIFO; muốn đỉnh hàng xóm đầu tiên được xử lý trước (giống đệ quy), phải đẩy nó vào **sau cùng** (lên đỉnh stack). Nếu không quan tâm thứ tự thì đẩy xuôi cũng được.
>
> *"Vì sao kiểm tra visited 2 lần (lúc pop và lúc push)?"* — Một đỉnh có thể bị đẩy vào stack nhiều lần trước khi được pop. Kiểm tra lúc pop là chốt chặn cuối; kiểm tra lúc push giảm rác trong stack.

> 📝 **Tóm tắt mục 9.** Iterative DFS thay call stack bằng stack tường minh → tránh overflow trên đồ thị sâu. Đẩy hàng xóm ngược thứ tự để khớp pre-order. Kiểm tra visited lúc pop.

---

## 10. Độ phức tạp

Với **adjacency list**, cả BFS và DFS:

- **Thời gian: O(V + E)** — mỗi đỉnh được lấy ra/thăm đúng 1 lần (O(V)); mỗi cạnh được duyệt đúng 1 lần (có hướng) hoặc 2 lần (vô hướng) → tổng O(E). Cộng lại **O(V+E)**.
- **Bộ nhớ: O(V)** — visited (O(V)) + queue/stack (tối đa O(V) đỉnh) + (nếu cần) dist/parent (O(V)).

Với **adjacency matrix**: thời gian **O(V²)** vì mỗi đỉnh phải quét cả hàng V ô để tìm hàng xóm — tệ hơn list khi đồ thị thưa.

> ⚠ **Lỗi phân tích thường gặp.** Nói BFS/DFS là "O(V·E)" hay "O(E²)" — SAI. Mỗi cạnh chỉ chạm đúng số lần cố định nhờ visited. Đúng là **O(V+E)**.

Ví dụ số: grid 1000×1000 → V = 10⁶ ô, E ≈ 4×10⁶ cạnh (4 hướng) → O(V+E) ≈ 5×10⁶ thao tác, chạy dưới 0.1 giây. Cùng grid với matrix V² = 10¹² → bất khả thi.

> 📝 **Tóm tắt mục 10.** BFS/DFS với adjacency list = **O(V+E)** thời gian, O(V) bộ nhớ. Với matrix = O(V²). Đừng nhầm thành O(VE).

---

## 11. Multi-source BFS

> 💡 **Trực giác.** Bình thường BFS loang từ 1 nguồn. Multi-source BFS loang từ **nhiều nguồn cùng lúc** — như nhiều giọt mực rơi xuống nước đồng thời, các vết loang gặp nhau ở giữa. Kết quả: mỗi ô biết "khoảng cách tới *nguồn gần nhất*". Mẹo cài đặt: **đẩy tất cả nguồn vào queue ngay từ đầu** với dist=0.

Bài kinh điển: **Rotting Oranges** — grid cam, `2`=thối, `1`=tươi, `0`=trống. Mỗi phút, cam thối lây sang cam tươi kề (4 hướng). Hỏi sau bao nhiêu phút mọi cam tươi đều thối (hoặc -1 nếu không thể).

```go
func OrangesRotting(grid [][]int) int {
    rows, cols := len(grid), len(grid[0])
    type cell struct{ r, c int }
    var queue []cell
    fresh := 0
    for r := 0; r < rows; r++ {
        for c := 0; c < cols; c++ {
            if grid[r][c] == 2 {
                queue = append(queue, cell{r, c}) // TẤT CẢ nguồn vào queue cùng lúc
            } else if grid[r][c] == 1 {
                fresh++
            }
        }
    }
    minutes := 0
    for len(queue) > 0 && fresh > 0 {
        minutes++
        next := []cell{}
        for _, cur := range queue { // xử lý NGUYÊN MỘT TẦNG (1 phút)
            for _, d := range dir4 {
                nr, nc := cur.r+d[0], cur.c+d[1]
                if nr >= 0 && nr < rows && nc >= 0 && nc < cols && grid[nr][nc] == 1 {
                    grid[nr][nc] = 2 // lây thối
                    fresh--
                    next = append(next, cell{nr, nc})
                }
            }
        }
        queue = next
    }
    if fresh > 0 {
        return -1 // còn cam tươi không lây tới được
    }
    return minutes
}
```

Walk-through grid:

```
2 1 1
1 1 0
0 1 1
```

- **Phút 0**: nguồn `(0,0)`. fresh=6.
- **Phút 1**: `(0,0)` lây `(0,1)`, `(1,0)`. fresh=4.
- **Phút 2**: `(0,1)`→`(0,2)`; `(1,0)`→`(1,1)`. fresh=2.
- **Phút 3**: `(0,2)`,`(1,1)`→`(2,1)`. fresh=1.
- **Phút 4**: `(2,1)`→`(2,2)`. fresh=0. → trả **4** ✓.

> ❓ **Câu hỏi tự nhiên.** *"Vì sao xử lý nguyên một tầng mỗi vòng?"* — Vì mỗi "phút" = 1 level lan tỏa. Snapshot `queue` đầu vòng = tất cả ô vừa thối ở phút trước; chúng lây đồng thời sang tầng kế. Đếm số tầng = số phút.
>
> *"Multi-source khác chạy BFS từng nguồn rồi lấy min?"* — Multi-source O(V+E) **một lần**; chạy từng nguồn là O(nguồn × (V+E)) — chậm hơn nhiều khi nhiều nguồn.

> 🔁 **Dừng lại tự kiểm tra.** Grid `[[2,1,1],[1,1,1],[0,1,2]]` — sau bao nhiêu phút?
> <details><summary>Đáp án</summary>
>
> 2 nguồn `(0,0)` và `(2,2)` loang đồng thời. Ô xa nguồn nhất là `(0,2)`/`(2,0)`... thực ra mọi ô tươi cách ≤2 từ một nguồn → **2 phút**. (Nhờ 2 nguồn, nhanh hơn 1 nguồn.)
> </details>

> 📝 **Tóm tắt mục 11.** Multi-source BFS = đẩy mọi nguồn vào queue với dist=0, rồi BFS bình thường. Cho khoảng cách tới nguồn *gần nhất*. Ứng dụng: rotting oranges, nearest exit, walls and gates. O(V+E) một lần.

---

## 12. Cạm bẫy tổng hợp

| Cạm bẫy | Hậu quả | Cách tránh |
|---------|---------|-----------|
| Quên `visited` | infinite loop (đồ thị có chu trình) | luôn đánh dấu thăm; review chỗ này đầu tiên khi TLE |
| Đánh dấu visited *khi pop* (BFS) | đỉnh vào queue nhiều lần → sai dist/chậm | đánh dấu *khi push* |
| BFS cho đồ thị **weighted** | đường "ngắn nhất" sai | dùng **Dijkstra (L33)** |
| Nhầm directed ↔ undirected | thiếu/thừa cạnh, kết quả sai | undirected = AddEdge 2 chiều |
| Quên bounds check trên grid | panic index out of range | check `r,c` trong `[0,rows)×[0,cols)` trước |
| Đếm cạnh đôi (undirected list) | E sai gấp đôi | tổng độ dài list = 2E cho vô hướng |
| DFS đệ quy đồ thị sâu | stack overflow | iterative DFS (mục 9) |
| Multi-source: đẩy từng nguồn lần lượt | chậm O(k·(V+E)) | đẩy *tất cả* nguồn vào queue ngay từ đầu |

> ⚠ **Cạm bẫy "đếm cạnh đôi".** Đồ thị vô hướng 3 cạnh `0-1,1-2,2-0`. Tổng độ dài adjacency list = 6 (mỗi cạnh đếm 2 lần). Nếu in `len(adj[u])` cộng dồn ra 6 rồi báo "6 cạnh" → SAI, chia 2 = 3 cạnh.

---

## Bài tập

1. **Number of Islands** — đếm số đảo trong grid `'1'/'0'` (4 hướng).
2. **Shortest Path in Maze (BFS)** — grid `0`=đi được, `1`=tường; tìm số bước ít nhất từ `(0,0)` tới `(rows-1,cols-1)`, 4 hướng. Trả -1 nếu không tới được.
3. **Clone Graph** — sao chép sâu một đồ thị vô hướng liên thông (mỗi node có `val` và danh sách neighbors).
4. **Word Ladder** — cho `beginWord`, `endWord`, và `wordList`. Mỗi bước đổi 1 ký tự, từ mới phải trong wordList. Trả độ dài chuỗi biến đổi ngắn nhất (số từ), 0 nếu không được.
5. **Rotting Oranges (Multi-source BFS)** — như mục 11.
6. **Bipartite Check (2-coloring)** — kiểm tra đồ thị (adjacency list) có 2-tô-màu được không.

---

## Lời giải chi tiết

### Bài 1 — Number of Islands

**Cách tiếp cận.** Quét toàn grid; mỗi ô `'1'` chưa thăm = một đảo mới → flood fill (DFS hoặc BFS) "dìm" cả đảo thành `'0'`. Đáp án ở mục 8.1.

**Các bước.** (1) Lặp mọi ô. (2) Gặp `'1'` → `count++`, DFS dìm. (3) DFS: bounds-check, nếu không phải `'1'` thì return; ngược lại đặt `'0'` và đệ quy 4 hướng.

**Độ phức tạp.** Mỗi ô thăm O(1) lần → **O(rows×cols)** thời gian. Bộ nhớ O(rows×cols) cho đệ quy xấu nhất (grid toàn đất kiểu xoắn ốc); dùng BFS/iterative nếu sợ overflow.

### Bài 2 — Shortest Path in Maze (BFS)

**Cách tiếp cận.** Mỗi bước đi 1 ô, "dài" như nhau → BFS cho đường ngắn nhất. dist theo tầng.

```go
func shortestMaze(grid [][]int) int {
    rows, cols := len(grid), len(grid[0])
    if grid[0][0] == 1 || grid[rows-1][cols-1] == 1 {
        return -1 // start/end là tường
    }
    type cell struct{ r, c, d int }
    visited := make([][]bool, rows)
    for i := range visited {
        visited[i] = make([]bool, cols)
    }
    queue := []cell{{0, 0, 1}} // d=1: tính theo SỐ Ô đi qua (đổi thành 0 nếu đếm số bước)
    visited[0][0] = true
    for len(queue) > 0 {
        cur := queue[0]
        queue = queue[1:]
        if cur.r == rows-1 && cur.c == cols-1 {
            return cur.d
        }
        for _, dd := range dir4 {
            nr, nc := cur.r+dd[0], cur.c+dd[1]
            if nr >= 0 && nr < rows && nc >= 0 && nc < cols &&
                !visited[nr][nc] && grid[nr][nc] == 0 {
                visited[nr][nc] = true
                queue = append(queue, cell{nr, nc, cur.d + 1})
            }
        }
    }
    return -1
}
```

**Các bước.** Khởi đầu queue với ô `(0,0)`, dist=1. Mỗi vòng pop, kiểm tra đích, đẩy hàng xóm hợp lệ (trong biên, không tường, chưa thăm) với dist+1. Lần đầu chạm đích = ngắn nhất.

**Độ phức tạp.** **O(rows×cols)** — mỗi ô vào queue ≤ 1 lần. Bộ nhớ O(rows×cols).

### Bài 3 — Clone Graph

**Cách tiếp cận.** Duyệt (DFS hoặc BFS) đồng thời dựng bản sao; dùng `map[*Node]*Node` (gốc → bản sao) để (a) tránh clone trùng, (b) đóng vai trò visited.

```go
type Node struct {
    Val       int
    Neighbors []*Node
}

func cloneGraph(node *Node) *Node {
    if node == nil {
        return nil
    }
    seen := map[*Node]*Node{}
    var dfs func(n *Node) *Node
    dfs = func(n *Node) *Node {
        if c, ok := seen[n]; ok {
            return c // đã clone → trả bản sao (cũng là chốt chặn chu trình)
        }
        copy := &Node{Val: n.Val}
        seen[n] = copy // đăng ký TRƯỚC khi đệ quy neighbors → tránh vòng lặp vô hạn
        for _, nb := range n.Neighbors {
            copy.Neighbors = append(copy.Neighbors, dfs(nb))
        }
        return copy
    }
    return dfs(node)
}
```

**Các bước.** (1) Map rỗng. (2) DFS node: nếu đã có trong map → trả bản sao. (3) Tạo bản sao, đăng ký map **ngay** (trước đệ quy — chốt chặn chu trình). (4) Clone từng neighbor đệ quy, gắn vào.

**Độ phức tạp.** **O(V+E)** — mỗi node và cạnh xử lý 1 lần. Bộ nhớ O(V).

### Bài 4 — Word Ladder

**Cách tiếp cận.** Mỗi từ = đỉnh; 2 từ kề nếu khác đúng 1 ký tự. Ngắn nhất → BFS. Tối ưu sinh hàng xóm: thay từng vị trí bằng 'a'..'z', tra trong set.

```go
func ladderLength(beginWord, endWord string, wordList []string) int {
    dict := map[string]bool{}
    for _, w := range wordList {
        dict[w] = true
    }
    if !dict[endWord] {
        return 0
    }
    queue := []string{beginWord}
    steps := 1
    for len(queue) > 0 {
        next := []string{}
        for _, w := range queue {
            if w == endWord {
                return steps
            }
            bs := []byte(w)
            for i := 0; i < len(bs); i++ {
                orig := bs[i]
                for ch := byte('a'); ch <= 'z'; ch++ {
                    bs[i] = ch
                    cand := string(bs)
                    if dict[cand] { // còn trong dict = chưa thăm
                        delete(dict, cand) // xoá = đánh dấu visited
                        next = append(next, cand)
                    }
                }
                bs[i] = orig
            }
        }
        queue = next
        steps++
    }
    return 0
}
```

**Các bước.** BFS theo tầng; mỗi từ sinh ~`L×26` ứng viên (L = độ dài từ), giữ ứng viên còn trong dict và xoá khỏi dict (đánh dấu thăm). Chạm `endWord` → trả số tầng.

**Độ phức tạp.** **O(N × L × 26)** ≈ O(N·L) với N = số từ, L = độ dài. Bộ nhớ O(N·L).

### Bài 5 — Rotting Oranges

Lời giải đầy đủ ở mục 11. **Độ phức tạp O(rows×cols)** — mỗi ô vào queue ≤ 1 lần; mỗi ô kiểm tra 4 hướng O(1).

### Bài 6 — Bipartite Check (2-coloring)

Lời giải ở mục 5.2. **Cách tiếp cận**: BFS/DFS tô 2 màu xen kẽ; gặp cạnh nối 2 đỉnh cùng màu → không bipartite. Xử lý mọi thành phần (đồ thị có thể rời). **Độ phức tạp O(V+E)** thời gian, O(V) bộ nhớ.

---

## Code & Minh họa

- Code Go: **inline ngay trong README này** (mục 1–11) — adjacency list, BFS, DFS (đệ quy + iterative), connected components, grid islands, multi-source BFS, bipartite check. Không có file `solutions.go` riêng.
- [visualization.html](./visualization.html) — 3 module tương tác: (1) BFS vs DFS trên đồ thị, (2) Số đảo (flood fill), (3) Multi-source BFS (rotting oranges).

---

## Bài tiếp theo

- [Lesson 32 — Sắp xếp Topo](../lesson-32-topological-sort/) — DFS post-order + Kahn (BFS), dependency resolution, phát hiện chu trình trên đồ thị có hướng.
- [Lesson 33 — Dijkstra](../lesson-33-dijkstra/) — tổng quát BFS sang đồ thị **có trọng số**: dùng priority queue thay queue thường.
- Quay lại [Tier 5 — Thuật toán đồ thị](../tier-5-graph/index.html).
