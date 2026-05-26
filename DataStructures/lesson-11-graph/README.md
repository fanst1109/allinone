# Lesson 11 — Graph (Đồ thị)

## Mục tiêu học tập

- Hiểu thuật ngữ đồ thị: **vertex**, **edge**, **directed**, **weighted**.
- Phân biệt **adjacency matrix** và **adjacency list**.
- Cài đặt **BFS** và **DFS**.
- Biết các bài toán cơ bản trên đồ thị.

## Kiến thức tiền đề

- [Lesson 04 — Queue](../lesson-04-queue/) (cho BFS).
- [Lesson 03 — Stack](../lesson-03-stack/) (cho DFS).

## 1. Đồ thị là gì?

**Đồ thị (graph)** gồm:
- Tập **đỉnh (vertices/nodes)**: `V`.
- Tập **cạnh (edges)**: `E`, mỗi cạnh nối hai đỉnh.

Ký hiệu: `G = (V, E)`.

```
      A --- B
      |    /|
      |   / |
      C---D-E
```

### 1.1. 💡 Trực giác — đồ thị là "bản đồ + đường nối"

Hình dung **bản đồ thành phố**: mỗi địa điểm (nhà bạn, quán cafe, công ty, trường học) là một **đỉnh**; mỗi con đường nối hai địa điểm là một **cạnh**. Câu hỏi quen thuộc trở thành thuật toán đồ thị:

- "Đi từ nhà tao tới quán cafe gần nhất hết bao xa?" → đường đi ngắn nhất (BFS / Dijkstra).
- "Có thể đi từ A tới B không?" → kiểm tra liên thông.
- "Nếu một đường bị tắc, còn đường khác không?" → tìm cầu (bridge).

Các ví dụ thực tế ánh xạ thẳng vào mô hình `G = (V, E)`:

| Bối cảnh | Đỉnh (V) | Cạnh (E) |
|----------|----------|----------|
| Mạng xã hội | Người dùng | Mối quan hệ "kết bạn" |
| Web | Trang web | Hyperlink (có hướng) |
| Bản đồ giao thông | Giao lộ | Đoạn đường (có trọng số = độ dài) |
| Lịch học | Môn học | "Môn A là tiền đề của môn B" (có hướng → DAG) |
| Dependency package | Thư viện | "A phụ thuộc B" (DAG) |

Mọi thuật toán đồ thị đều là cách trả lời một câu hỏi trên cấu trúc này.

### 1.2. ❓ Câu hỏi tự nhiên

- **"Khi nào một bài toán nên mô hình bằng đồ thị?"** — Khi bài có **đối tượng + quan hệ hai-bên** (a có liên kết với b). Nếu quan hệ đa-bên (3 đối tượng cùng lúc) → cân nhắc hypergraph hoặc tách thành cạnh đôi.
- **"Đồ thị vô hướng có phải là trường hợp đặc biệt của đồ thị có hướng?"** — Có. Cạnh `u-v` vô hướng = hai cạnh có hướng `u→v` và `v→u`. Trong code, vô hướng thường implement bằng cách push vào cả `adj[u]` và `adj[v]`.
- **"Một node có thể tự nối với chính nó?"** — Có, gọi là **self-loop** (khuyên). Đồ thị "đơn" (simple) cấm self-loop và multi-edge.
- **"Cây có phải đồ thị không?"** — Có. Cây là đồ thị vô hướng, liên thông, không chu trình, có đúng `n-1` cạnh. Lesson 06 là một trường hợp riêng của lesson 11.

## 2. Phân loại

| Loại | Mô tả |
| --- | --- |
| **Vô hướng (undirected)** | Cạnh không có chiều |
| **Có hướng (directed)** | Cạnh có chiều (A → B khác B → A) |
| **Có trọng số (weighted)** | Mỗi cạnh kèm một số (khoảng cách, chi phí...) |
| **Đơn (simple)** | Không có cạnh lặp, không có khuyên (self-loop) |
| **Đa đồ thị (multigraph)** | Cho phép cạnh lặp |
| **DAG** | Đồ thị có hướng, không chu trình (Directed Acyclic Graph) |
| **Liên thông (connected)** | Có đường đi giữa mọi cặp đỉnh |
| **Cây (tree)** | Đồ thị vô hướng, liên thông, không chu trình; có `n-1` cạnh |

### 2.1. ⚠ Lỗi thường gặp khi phân loại

| Lỗi | Hậu quả | Cách sửa |
|------|---------|----------|
| Coi đồ thị **có hướng** như vô hướng (push cạnh hai chiều) | Sai logic: A là sếp B không có nghĩa B là sếp A | Đọc kỹ đề: "follow", "phụ thuộc", "tiền đề" → có hướng |
| Quên xử lý **self-loop** trong adjacency list | Vòng lặp vô tận khi duyệt (visit lại chính mình) | Skip khi `v == u` hoặc check `visited` chuẩn |
| Coi đồ thị có **trọng số âm** dùng được Dijkstra | Sai kết quả (xem mục 7) | Dùng Bellman-Ford |
| Giả định đồ thị **liên thông** mà không kiểm tra | BFS từ một đỉnh chỉ thấy 1 thành phần, bỏ sót phần còn lại | Loop qua mọi đỉnh, gọi BFS/DFS nếu chưa thăm |

### 2.2. 📝 Tóm tắt mục 2

- **Vô hướng vs có hướng**: quan hệ đối xứng vs không đối xứng.
- **Có trọng số**: cạnh kèm số (khoảng cách, chi phí, dung lượng).
- **DAG = có hướng + không chu trình** — nền tảng cho topological sort, dynamic programming trên đồ thị.
- **Cây = đồ thị vô hướng, liên thông, `n-1` cạnh, không chu trình** — trường hợp tối thiểu của đồ thị liên thông.
- Xác định **đúng loại** trước khi chọn thuật toán: dùng nhầm thuật toán cho loại sai → sai kết quả.

## 3. Biểu diễn

### 3.1. Adjacency Matrix

Ma trận `n × n`. `M[i][j] = 1` nếu có cạnh `i → j`, ngược lại 0 (hoặc trọng số).

```
     A B C D
   A 0 1 1 0
   B 1 0 0 1
   C 1 0 0 1
   D 0 1 1 0
```

- Kiểm tra cạnh: `O(1)`.
- Duyệt hàng xóm: `O(n)`.
- Bộ nhớ: `O(n²)` — lãng phí nếu đồ thị thưa (sparse).

### 3.2. Adjacency List

Với mỗi đỉnh, lưu danh sách các đỉnh kề.

```
A -> [B, C]
B -> [A, D]
C -> [A, D]
D -> [B, C]
```

- Kiểm tra cạnh: `O(deg(v))`.
- Duyệt hàng xóm: `O(deg(v))`.
- Bộ nhớ: `O(V + E)` — phù hợp đồ thị thưa.

| Tiêu chí | Matrix | List |
| --- | --- | --- |
| Bộ nhớ | `O(V²)` | `O(V + E)` |
| Kiểm tra cạnh | `O(1)` | `O(deg)` |
| Phù hợp | Dày (dense) | Thưa (sparse) |

### 3.3. 💡 Trực giác — chọn cách biểu diễn bằng phép tính bộ nhớ

Hãy ước lượng cụ thể với `V = 1000` đỉnh:

| Số cạnh `E` | Matrix `V²` (int 4B) | List `V + 2E` (int 4B) | Nên chọn |
|-------------|----------------------|------------------------|----------|
| `E = 1000` (thưa) | `10⁶ × 4B = 4 MB` | `(1000 + 2000) × 4B = 12 KB` | **List** — tiết kiệm gấp 333 lần |
| `E = 10 000` (vừa) | `4 MB` | `(1000 + 20000) × 4B = 84 KB` | **List** — vẫn nhỏ hơn 50 lần |
| `E = 100 000` (khá dày) | `4 MB` | `(1000 + 200000) × 4B = 804 KB` | **List** — vẫn ít hơn |
| `E ≈ 500 000` (gần dày tối đa = `V²/2`) | `4 MB` | `(1000 + 10⁶) × 4B = 4 MB` | Tương đương, Matrix có thêm lợi thế kiểm tra cạnh `O(1)` |

Quy tắc thực hành: nếu `E ≪ V²/2` (đa số trường hợp thực tế) → **adjacency list**. Chỉ khi đồ thị **gần dày đặc** và cần kiểm tra cạnh nhanh → matrix.

### 3.4. ❓ Câu hỏi tự nhiên

- **"Khi nào dùng matrix?"** — Khi (a) đồ thị dày `E ≈ V²`, (b) `V` đủ nhỏ để `V²` chứa được trong RAM (`V ≤ ~10⁴` ổn, `V = 10⁵` cần `40 GB` — không khả thi), và (c) thao tác chủ yếu là **"có cạnh u-v không?"**.
- **"Matrix có lợi gì ngoài kiểm tra cạnh `O(1)`?"** — Phép nhân ma trận `M^k` cho biết số đường đi độ dài đúng `k` giữa các đỉnh. Hữu ích cho lý thuyết / bài toán đếm.
- **"List có hỗ trợ kiểm tra cạnh `O(1)` không?"** — Nếu thay `[]int` bằng `[]map[int]bool`, kiểm tra cạnh là `O(1)` trung bình nhưng tốn thêm bộ nhớ hash. Một biến thể "hybrid".
- **"Đồ thị có trọng số biểu diễn thế nào?"** — Matrix: `M[i][j] = w` (hoặc `+∞` nếu không có cạnh). List: lưu `(neighbor, weight)` cặp, thường là `[]struct{V, W int}`.

## 4. Duyệt đồ thị

### 4.1. BFS (Breadth-First Search)

Dùng **queue**. Đi theo từng tầng từ đỉnh xuất phát.

```
function bfs(graph, start):
    visited = {start}
    queue = [start]
    while not queue.isEmpty():
        u = queue.dequeue()
        visit(u)
        for v in graph[u]:
            if v not in visited:
                visited.add(v)
                queue.enqueue(v)
```

Ứng dụng:
- Đường đi ngắn nhất trên đồ thị **không trọng số**.
- Tìm liên thông.
- Web crawler.

`O(V + E)`.

### 4.2. DFS (Depth-First Search)

Dùng **đệ quy** hoặc **stack**. Đi sâu vào một nhánh tới hết, sau đó quay lại.

```
function dfs(graph, u, visited):
    visited.add(u)
    visit(u)
    for v in graph[u]:
        if v not in visited:
            dfs(graph, v, visited)
```

Ứng dụng:
- Tìm liên thông.
- Phát hiện chu trình.
- Topological sort (trên DAG).
- Tìm cầu (bridge), khớp (articulation point).

`O(V + E)`.

### 4.3. Walk-through — BFS và DFS trên cùng một đồ thị

Đồ thị mẫu (vô hướng, 7 đỉnh):

```
      1 --- 2 --- 4
      |     |
      0     3 --- 5
            |
            6
```

`adj[0]={1}`, `adj[1]={0,2}`, `adj[2]={1,3,4}`, `adj[3]={2,5,6}`, `adj[4]={2}`, `adj[5]={3}`, `adj[6]={3}`.

**BFS từ 0** — queue tại từng bước:

| Bước | Dequeue | Enqueue mới | Queue (front → rear) | Output |
|------|---------|-------------|----------------------|--------|
| 0 | — | 0 | `[0]` | — |
| 1 | 0 | 1 | `[1]` | 0 |
| 2 | 1 | 2 | `[2]` | 1 |
| 3 | 2 | 3, 4 | `[3, 4]` | 2 |
| 4 | 3 | 5, 6 | `[4, 5, 6]` | 3 |
| 5 | 4 | — | `[5, 6]` | 4 |
| 6 | 5 | — | `[6]` | 5 |
| 7 | 6 | — | `[]` | 6 |

Thứ tự BFS: **0, 1, 2, 3, 4, 5, 6** — đúng theo khoảng cách `0, 1, 2, 3, 3, 4, 4` từ 0.

**DFS từ 0** — stack đệ quy:

| Bước | Action | Stack đệ quy | Output |
|------|--------|--------------|--------|
| 1 | enter 0 | `[0]` | 0 |
| 2 | enter 1 (qua 0→1) | `[0, 1]` | 1 |
| 3 | enter 2 (qua 1→2) | `[0, 1, 2]` | 2 |
| 4 | enter 3 (qua 2→3) | `[0, 1, 2, 3]` | 3 |
| 5 | enter 5 (qua 3→5) | `[0, 1, 2, 3, 5]` | 5 |
| 6 | leave 5 → back to 3, enter 6 | `[0, 1, 2, 3, 6]` | 6 |
| 7 | leave 6, leave 3, back to 2, enter 4 | `[0, 1, 2, 4]` | 4 |
| 8 | unwind hết | `[]` | — |

Thứ tự DFS: **0, 1, 2, 3, 5, 6, 4** — đi sâu xuống cuối nhánh rồi mới quay lại nhánh khác. Khác hẳn BFS, dù **cùng đồ thị, cùng node xuất phát**.

### 4.4. ❓ Câu hỏi tự nhiên

- **"BFS với DFS, cái nào nhanh hơn?"** — Cả hai đều `O(V + E)`. Khác biệt nằm ở **thứ tự thăm**, không phải tốc độ. Chọn dựa trên bài toán: cần đường ngắn nhất → BFS; cần đi sâu, phát hiện chu trình, topological → DFS.
- **"DFS đệ quy có nguy hiểm gì?"** — Stack overflow nếu đồ thị có nhánh sâu (vd `10⁶` đỉnh nối thành chuỗi). Giải pháp: dùng stack thủ công, hoặc tăng giới hạn stack.
- **"Đánh dấu `visited` ở DFS khi nào?"** — Ngay khi **enter** node, trước khi đệ quy vào con. Nếu trì hoãn → có thể đệ quy vào cùng một node nhiều lần.
- **"BFS có cần `visited` riêng không?"** — Có (tránh re-enqueue khi đồ thị có chu trình). Trên cây thì không cần vì không có chu trình.

### 4.5. ⚠ Lỗi thường gặp

| Lỗi | Hậu quả | Cách sửa |
|------|---------|----------|
| Đánh dấu visited **lúc dequeue** trong BFS | Node bị enqueue nhiều lần → queue phình, sai output | Đánh dấu **ngay khi enqueue** |
| Đệ quy DFS không có base case `if visited` | Loop vô tận trên đồ thị có chu trình | Check `if !visited[v]` trước khi gọi đệ quy |
| Dùng `list.pop(0)` ở Python cho queue trong BFS | `O(n)` mỗi lần → BFS thành `O(V·(V+E))` | Dùng `collections.deque` |
| Trên đồ thị vô hướng, DFS lại quay lại bố mẹ → tưởng là chu trình | Detect nhầm chu trình | Truyền `parent` xuống đệ quy, skip `v == parent` |

### 4.6. 🔁 Tự kiểm tra

1. Với đồ thị mục 4.3, BFS từ `4` cho thứ tự thăm nào?
   <details><summary>Đáp án</summary>`4, 2, 1, 3, 0, 5, 6`. Từ 4 → hàng xóm {2} → từ 2 thêm {1,3} → từ 1 thêm {0} → từ 3 thêm {5,6}.</details>
2. DFS có thể dùng để tìm đường ngắn nhất (số cạnh) không?
   <details><summary>Đáp án</summary>**Không tin cậy**. DFS đi sâu vào nhánh đầu tiên, đường đầu tiên tìm được không chắc là ngắn nhất. BFS mới đảm bảo ngắn nhất (xem lesson 04, mục 6.3).</details>
3. Trong DFS đệ quy, nếu đánh dấu visited **sau** khi đệ quy vào con thay vì trước, chuyện gì xảy ra?
   <details><summary>Đáp án</summary>Cùng một node có thể được enter từ nhiều bố mẹ trước khi đánh dấu → đệ quy lặp, output trùng. Lỗi tương tự BFS "đánh dấu lúc dequeue".</details>

### 4.7. 📝 Tóm tắt mục 4

- **BFS** dùng queue (FIFO), duyệt theo **tầng** — đảm bảo đường ngắn nhất trên đồ thị không trọng số.
- **DFS** dùng đệ quy hoặc stack (LIFO), đi **sâu** trước khi rộng — phù hợp tìm chu trình, topological sort, tarjan SCC.
- Cả hai đều `O(V + E)` thời gian, `O(V)` bộ nhớ.
- **Đánh dấu visited NGAY khi enter / enqueue**, không phải khi dequeue / leave.
- Đồ thị vô hướng: DFS truyền `parent` để không detect nhầm "back-edge bố mẹ" thành chu trình.

## 5. Các bài toán cơ bản

| Bài toán | Thuật toán |
| --- | --- |
| Đường đi ngắn nhất (không trọng số) | BFS |
| Đường đi ngắn nhất (trọng số ≥ 0) | Dijkstra |
| Đường đi ngắn nhất (trọng số âm) | Bellman-Ford |
| Mọi cặp đường đi ngắn nhất | Floyd-Warshall |
| Cây khung nhỏ nhất (MST) | Prim, Kruskal |
| Topological sort | DFS, Kahn |
| Tìm thành phần liên thông mạnh (SCC) | Tarjan, Kosaraju |
| Phát hiện chu trình | DFS (with state coloring) |

## 6. Ví dụ — Dijkstra (đường đi ngắn nhất, trọng số ≥ 0)

Dùng **priority queue** (min-heap):

```
function dijkstra(graph, source):
    dist[v] = +∞ với mọi v; dist[source] = 0
    pq = MinHeap()
    pq.push((0, source))
    while not pq.isEmpty():
        (d, u) = pq.pop()
        if d > dist[u]: continue
        for (v, w) in graph[u]:
            if dist[u] + w < dist[v]:
                dist[v] = dist[u] + w
                pq.push((dist[v], v))
    return dist
```

Độ phức tạp: `O((V + E) log V)` với heap nhị phân.

## 7. Cạm bẫy

- Quên `visited` → vòng lặp vô tận trên đồ thị có chu trình.
- Đồ thị **có hướng** vs **vô hướng** → thuật toán có thể khác.
- Trọng số âm → Dijkstra sai, phải dùng Bellman-Ford.
- Cài đặt adjacency matrix cho đồ thị `V = 10⁶` → tràn bộ nhớ.

### 7.1. ❓ Câu hỏi tự nhiên trước khi vào bài tập

- **"Khi nào dùng Bellman-Ford thay vì Dijkstra?"** — Khi có **cạnh trọng số âm** (vd dòng tiền có lãi/lỗ, phản ứng phụ làm giảm chi phí). Bellman-Ford chạy `O(V·E)`, chậm hơn Dijkstra `O((V+E) log V)` nhưng đúng với trọng số âm và phát hiện được chu trình âm.
- **"Floyd-Warshall thay được cả hai không?"** — Có, nhưng `O(V³)` → chỉ dùng khi `V ≤ ~500` và cần khoảng cách **mọi cặp**. Nếu chỉ cần từ 1 nguồn → Dijkstra/Bellman-Ford nhanh hơn nhiều.
- **"Topological sort đòi hỏi gì?"** — Đồ thị phải là **DAG**. Có chu trình → không tồn tại topological order. DFS topological có thể tận dụng để **phát hiện** chu trình luôn.

### 7.2. 📝 Tóm tắt — checklist tránh cạm bẫy

- Trước khi code: xác định **vô hướng hay có hướng**, **có/không trọng số**, **có/không cạnh âm**, **có chu trình không**.
- Chọn biểu diễn: **adjacency list** cho đa số (thưa); matrix chỉ khi `V` nhỏ + dày.
- Luôn dùng `visited` (BFS/DFS), trừ khi chắc chắn là cây.
- Trọng số `≥ 0` → Dijkstra; có âm → Bellman-Ford; mọi cặp + `V` nhỏ → Floyd-Warshall.

## Bài tập

1. Cho đồ thị vô hướng, viết hàm đếm số thành phần liên thông.
2. Phát hiện chu trình trong đồ thị có hướng.
3. Cài đặt BFS để tìm đường đi ngắn nhất từ `s` đến `t` trong đồ thị không trọng số, in ra path.
4. Cài đặt topological sort dùng DFS.
5. So sánh khi nào nên dùng adjacency matrix, khi nào nên dùng adjacency list.

## Lời giải chi tiết

### Bài 1 — Đếm thành phần liên thông
Duyệt mỗi đỉnh chưa thăm → chạy BFS/DFS từ đó → tăng counter.

```go
func components(g [][]int) int {
    n := len(g)
    visited := make([]bool, n)
    count := 0
    for i := 0; i < n; i++ {
        if !visited[i] {
            count++
            dfs(g, i, visited)
        }
    }
    return count
}
```
`O(V + E)`.

### Bài 2 — Chu trình trong đồ thị có hướng (3 màu)
- 0 = trắng (chưa thăm), 1 = xám (trong stack đệ quy), 2 = đen (đã xong).
- Trong DFS, nếu đi tới node xám → có chu trình.

```go
func hasCycleDirected(g [][]int) bool {
    n := len(g); color := make([]int, n)
    var dfs func(u int) bool
    dfs = func(u int) bool {
        color[u] = 1
        for _, v := range g[u] {
            if color[v] == 1 { return true }
            if color[v] == 0 && dfs(v) { return true }
        }
        color[u] = 2
        return false
    }
    for i := 0; i < n; i++ {
        if color[i] == 0 && dfs(i) { return true }
    }
    return false
}
```
`O(V + E)`.

### Bài 3 — BFS shortest path + in path
Lưu `parent[v] = u` khi enqueue. Sau khi BFS xong, truy ngược từ `t` về `s` theo `parent`.

```go
func bfsPath(g [][]int, s, t int) []int {
    n := len(g)
    parent := make([]int, n)
    for i := range parent { parent[i] = -1 }
    parent[s] = s
    q := []int{s}
    for len(q) > 0 {
        u := q[0]; q = q[1:]
        if u == t { break }
        for _, v := range g[u] {
            if parent[v] == -1 { parent[v] = u; q = append(q, v) }
        }
    }
    if parent[t] == -1 { return nil }
    path := []int{}
    for v := t; v != s; v = parent[v] { path = append([]int{v}, path...) }
    return append([]int{s}, path...)
}
```

### Bài 4 — Topological sort dùng DFS
Postorder DFS rồi đảo ngược. Cách khác: Kahn dùng in-degree + queue.

```go
func topoSort(g [][]int) []int {
    n := len(g); visited := make([]bool, n); order := []int{}
    var dfs func(u int)
    dfs = func(u int) {
        visited[u] = true
        for _, v := range g[u] { if !visited[v] { dfs(v) } }
        order = append(order, u)
    }
    for i := 0; i < n; i++ { if !visited[i] { dfs(i) } }
    // đảo ngược
    for i, j := 0, len(order)-1; i < j; i, j = i+1, j-1 {
        order[i], order[j] = order[j], order[i]
    }
    return order
}
```

### Bài 5 — Matrix vs List
| Tình huống | Chọn |
| --- | --- |
| Đồ thị **dày** (`E ≈ V²`), `V` nhỏ (≤ vài nghìn) | Matrix — kiểm tra cạnh `O(1)` |
| Đồ thị **thưa** (`E ≪ V²`), thường gặp | List — tiết kiệm bộ nhớ, duyệt hàng xóm nhanh |
| Cần **kiểm tra cạnh nhiều lần** | Matrix |
| Cần **duyệt toàn bộ hàng xóm** lặp đi lặp lại | List |
| Đồ thị có **vài triệu đỉnh** | Bắt buộc List (matrix tràn RAM) |

## Code & Minh họa

- [solutions.go](./solutions.go) — đầy đủ 4 bài (1, 2, 3, 4) + đồ thị mẫu.
- [visualization.html](./visualization.html) — đồ thị 7 đỉnh, chạy BFS và DFS từng bước, hiển thị queue/stack và thứ tự thăm.

## Bài tiếp theo

[Lesson 12 — Union-Find](../lesson-12-union-find/)
