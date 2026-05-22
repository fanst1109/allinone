// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: DataStructures/lesson-12-union-find/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 12 — Union-Find (Disjoint Set Union)

## Mục tiêu học tập

- Hiểu khái niệm **tập hợp rời rạc (disjoint set)** và bài toán liên thông động.
- Cài đặt \`find\` và \`union\` với hai tối ưu **union by rank** và **path compression**.
- Hiểu độ phức tạp gần như \`O(1)\` thực tế.
- Biết các bài toán thường dùng Union-Find.

## Kiến thức tiền đề

- [Lesson 06 — Tree](../lesson-06-tree/) (về mặt biểu diễn).

## 1. Bài toán

Cho \`n\` phần tử ban đầu mỗi cái thuộc một tập riêng. Hỗ trợ hai thao tác:

- \`union(a, b)\`: gộp tập chứa \`a\` và tập chứa \`b\`.
- \`find(a)\`: trả về **đại diện (representative)** của tập chứa \`a\`.
- Câu hỏi phổ biến: \`a\` và \`b\` có cùng tập không? → \`find(a) == find(b)\`.

Đây là bài toán **liên thông động (dynamic connectivity)**.

## 2. Cài đặt cơ bản

Lưu một mảng \`parent[]\`, ban đầu \`parent[i] = i\` (mỗi phần tử là gốc của tập của chính nó).

\`\`\`
function find(x):
    while parent[x] != x:
        x = parent[x]
    return x

function union(a, b):
    ra = find(a); rb = find(b)
    if ra != rb:
        parent[ra] = rb
\`\`\`

Mỗi tập được biểu diễn bằng một **cây**, đại diện là gốc cây.

\`\`\`
parent: [0, 0, 1, 1, 4]
cây:    0       4
        |
        1
       / \\
      2   3
\`\`\`

→ \`find(3) = 0\` (đi 3 → 1 → 0).

Vấn đề: cây có thể cao → \`find\` chậm. Cần tối ưu.

## 3. Tối ưu 1 — Union by rank/size

Khi gộp hai cây, gắn **cây thấp** vào **cây cao** (không phải ngược lại) để giữ chiều cao thấp.

\`\`\`
rank = [0]*n      # chiều cao tương đối

function union(a, b):
    ra = find(a); rb = find(b)
    if ra == rb: return
    if rank[ra] < rank[rb]: parent[ra] = rb
    else if rank[ra] > rank[rb]: parent[rb] = ra
    else:
        parent[rb] = ra
        rank[ra] += 1
\`\`\`

Chiều cao trở thành \`O(log n)\`.

## 4. Tối ưu 2 — Path compression

Trong khi tìm đường đi từ \`x\` lên gốc, **gắn thẳng tất cả node trên đường đó vào gốc**.

\`\`\`
function find(x):
    if parent[x] != x:
        parent[x] = find(parent[x])    # đệ quy + nén
    return parent[x]
\`\`\`

Sau lần \`find\` này, các lần sau cực nhanh.

## 5. Độ phức tạp khi kết hợp cả hai

Mỗi thao tác có độ phức tạp **amortized \`O(α(n))\`**, với \`α\` là hàm Ackermann ngược — **gần như là hằng số** (\`α(n) < 5\` cho mọi \`n\` thực tế).

→ Coi như \`O(1)\` trong thực hành.

## 6. Ứng dụng

### 6.1. Kruskal's MST
Sắp xếp cạnh tăng dần theo trọng số; với mỗi cạnh \`(u, v, w)\`, nếu \`find(u) != find(v)\` thì thêm vào MST và \`union(u, v)\`.

### 6.2. Kiểm tra liên thông động
Trong một mạng đang được thêm cạnh, kiểm tra hai nút có liên thông không.

### 6.3. Phát hiện chu trình trên đồ thị vô hướng
Khi thêm cạnh \`(u, v)\`, nếu \`find(u) == find(v)\` → cạnh này tạo chu trình.

### 6.4. Bài toán nhóm
- Gom các tài khoản trùng (Accounts merge).
- Bạn chung trong mạng xã hội.
- Liên thông pixel trong xử lý ảnh.

## 7. Ví dụ — Kruskal

\`\`\`
function kruskal(edges, n):
    sort(edges by weight)
    uf = UnionFind(n)
    mst = []
    for (u, v, w) in edges:
        if uf.find(u) != uf.find(v):
            uf.union(u, v)
            mst.append((u, v, w))
    return mst
\`\`\`

\`O(E log E)\`.

## Bài tập

1. Cài đặt Union-Find với cả hai tối ưu. So sánh tốc độ với phiên bản ngây thơ.
2. Cho \`n\` người và một danh sách cặp bạn bè. Tính số nhóm bạn (thành phần liên thông).
3. Cho đồ thị có hướng, Union-Find có dùng được để phát hiện chu trình không? Vì sao?
4. Mở rộng Union-Find để hỗ trợ truy vấn **kích thước tập** chứa một phần tử trong \`O(α)\`.
5. Cài đặt Kruskal dùng Union-Find.

## Lời giải chi tiết

### Bài 1 — Union-Find với hai tối ưu
\`\`\`go
type UF struct{ parent, rank []int }
func NewUF(n int) *UF {
    p := make([]int, n)
    for i := range p { p[i] = i }
    return &UF{parent: p, rank: make([]int, n)}
}
func (u *UF) Find(x int) int {
    if u.parent[x] != x { u.parent[x] = u.Find(u.parent[x]) }  // path compression
    return u.parent[x]
}
func (u *UF) Union(a, b int) bool {
    ra, rb := u.Find(a), u.Find(b)
    if ra == rb { return false }
    if u.rank[ra] < u.rank[rb] { ra, rb = rb, ra }            // union by rank
    u.parent[rb] = ra
    if u.rank[ra] == u.rank[rb] { u.rank[ra]++ }
    return true
}
\`\`\`
Mỗi thao tác amortized \`O(α(n)) ≈ O(1)\`.

### Bài 2 — Đếm nhóm bạn
Khởi tạo UF với \`n\` người. Với mỗi cặp \`(a, b)\` là bạn: \`Union(a, b)\`. Cuối cùng đếm số đại diện khác nhau (số \`i\` mà \`Find(i) == i\`).

\`\`\`go
func friendGroups(n int, pairs [][2]int) int {
    uf := NewUF(n)
    for _, p := range pairs { uf.Union(p[0], p[1]) }
    groups := 0
    for i := 0; i < n; i++ { if uf.Find(i) == i { groups++ } }
    return groups
}
\`\`\`

### Bài 3 — Union-Find với đồ thị có hướng?
**Không phù hợp**. UF gom các phần tử có quan hệ **đối xứng** (\`a ~ b\` ⇔ \`b ~ a\`). Đồ thị có hướng: cạnh \`a → b\` không suy ra \`b → a\`. Để phát hiện chu trình có hướng cần dùng DFS với 3 màu, không phải UF.

UF chỉ dùng được cho đồ thị **vô hướng** để phát hiện chu trình (khi thêm cạnh \`u-v\` mà \`find(u) == find(v)\` thì có chu trình).

### Bài 4 — Thêm truy vấn \`size\`
Lưu thêm mảng \`size[]\`, mỗi gốc giữ kích thước tập của nó.
\`\`\`go
type UF struct{ parent, rank, size []int }
// trong Union: size[ra] += size[rb]
// SizeOf(x) := size[Find(x)]
\`\`\`
\`O(α)\`.

### Bài 5 — Kruskal dùng Union-Find
\`\`\`go
type Edge struct{ u, v, w int }
func kruskal(n int, edges []Edge) []Edge {
    sort.Slice(edges, func(i, j int) bool { return edges[i].w < edges[j].w })
    uf := NewUF(n)
    mst := []Edge{}
    for _, e := range edges {
        if uf.Union(e.u, e.v) {
            mst = append(mst, e)
            if len(mst) == n - 1 { break }
        }
    }
    return mst
}
\`\`\`
\`O(E log E)\`.

## Code & Minh họa

- [solutions.go](./solutions.go) — UF đầy đủ với rank + compression, đếm nhóm bạn, Kruskal.
- [visualization.html](./visualization.html) — forest 10 phần tử, Union với rank và Find với path compression.

## Bài tiếp theo

[Lesson 13 — Segment Tree & Fenwick Tree](../lesson-13-segment-tree/)
`;
