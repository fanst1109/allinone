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

## Code

- [solutions.go](./solutions.go) — đầy đủ 4 bài (1, 2, 3, 4) + đồ thị mẫu.

## Bài tiếp theo

[Lesson 12 — Union-Find](../lesson-12-union-find/)
