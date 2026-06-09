// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: DataStructures/03-Advanced/lesson-02-union-find/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 02 — Union-Find (Disjoint Set Union)

## Mục tiêu học tập

- Hiểu khái niệm **tập hợp rời rạc (disjoint set)** và bài toán liên thông động.
- Cài đặt \`find\` và \`union\` với hai tối ưu **union by rank** và **path compression**.
- Hiểu độ phức tạp gần như $O(1)$ thực tế.
- Biết các bài toán thường dùng Union-Find.

## Kiến thức tiền đề

- [Lesson 01 — Tree](../../02-Intermediate/lesson-01-tree/) (về mặt biểu diễn).

## 1. Bài toán

Cho $n$ phần tử ban đầu mỗi cái thuộc một tập riêng. Hỗ trợ hai thao tác:

- \`union(a, b)\`: gộp tập chứa \`a\` và tập chứa \`b\`.
- \`find(a)\`: trả về **đại diện (representative)** của tập chứa \`a\`.
- Câu hỏi phổ biến: \`a\` và \`b\` có cùng tập không? → \`find(a) == find(b)\`.

Đây là bài toán **liên thông động (dynamic connectivity)**.

### 1.1. 💡 Trực giác — "rừng cây mồ côi nối lại"

Hình dung mỗi phần tử ban đầu là một **đứa trẻ mồ côi** đứng một mình. Mỗi đứa tự xem mình là **trưởng nhóm** (đại diện) của một nhóm 1 người. Theo thời gian:

- \`union(a, b)\`: hai nhóm gặp nhau → một trưởng nhóm cúi đầu nhận trưởng nhóm bên kia làm cha. Hai cây nhỏ thành một cây.
- \`find(a)\`: từ \`a\` đi ngược lên cha, ông, cụ, kỵ... cho tới khi gặp người tự nhận là cha của chính mình → đó là trưởng nhóm tối cao.
- "a và b cùng nhóm?" = "cùng trưởng nhóm tối cao?" = \`find(a) == find(b)\`.

Cấu trúc nội bộ là **rừng (forest) các cây có gốc**, mỗi cây = một tập. Khác cây nhị phân ở lesson 06 ở chỗ: ở đây mỗi node chỉ trỏ về **cha** (chứ không có con), nên đại diện cây = node duy nhất trỏ về chính nó.

Ánh xạ đời thực:

| Bối cảnh | Phần tử | \`union\` | \`find\` |
|----------|---------|---------|--------|
| Bạn bè trên FB | Người | Add friend | Tìm "cụm bạn chung" |
| Xếp lớp theo họ | Học sinh | Nối hai họ trùng | Tìm tổ tiên chung |
| Nối ống nước | Đoạn ống | Lắp khớp nối | Hai vòi có thông nhau không |
| Liên thông pixel | Pixel | Pixel kề cùng màu | Đếm vùng (region) |

### 1.2. ❓ Câu hỏi tự nhiên trước khi vào cài đặt

- **"Sao không lưu thẳng \`group[i] = id_nhóm\` rồi \`find\` là $O(1)$?"** — Được, nhưng \`union\` sẽ tốn $O(n)$ (phải đổi \`group\` của mọi phần tử trong nhóm nhỏ). Tổng $n$ lần union → $O(n^2)$. Cấu trúc cây cho phép \`union\` lẫn \`find\` đều "gần $O(1)$" amortized.
- **"Có cách nào support \`disconnect\` / \`split\` không?"** — Khó. Union-Find tối ưu cho thao tác **chỉ thêm cạnh, không bớt**. Bớt cạnh cần cấu trúc khác (offline + link-cut tree).
- **"Đại diện có ý nghĩa cụ thể không?"** — Không. Nó chỉ là **một node bất kỳ** trong nhóm, được chọn làm "đại diện". Nhưng cùng một nhóm thì mọi \`find\` đều trả về cùng một đại diện.

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

### 2.1. Walk-through — 5 phần tử với cài đặt ngây thơ

Khởi tạo \`n = 5\`: \`parent = [0, 1, 2, 3, 4]\` (mỗi phần tử là gốc).

Trạng thái sau từng thao tác:

| Thao tác | parent | Cây (cha là node trên) |
|----------|--------|------------------------|
| init | \`[0, 1, 2, 3, 4]\` | 5 cây mồ côi |
| \`union(0, 1)\` → \`parent[0] = 1\` | \`[1, 1, 2, 3, 4]\` | \`0→1\`, các node khác mồ côi |
| \`union(2, 3)\` → \`parent[2] = 3\` | \`[1, 1, 3, 3, 4]\` | \`0→1\`, \`2→3\`, \`4\` mồ côi |
| \`union(1, 3)\` → \`find(1)=1\`, \`find(3)=3\` → \`parent[1] = 3\` | \`[1, 3, 3, 3, 4]\` | \`0→1→3\`, \`2→3\`, \`4\` mồ côi |
| \`union(0, 4)\` → \`find(0)=3\` (đi 0→1→3), \`find(4)=4\` → \`parent[3] = 4\` | \`[1, 3, 3, 4, 4]\` | \`0→1→3→4\`, \`2→3→4\` |

Kiểm tra: \`find(0)\`? Đi \`0 → 1 → 3 → 4\`. Vậy \`parent[4] = 4\` → đại diện = \`4\`. Mất **3 bước** chỉ với 5 phần tử. Nếu các thao tác cứ nối kiểu này (linked-list hóa) thì \`find\` thành $O(n)$ — đúng là vấn đề.

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

Chiều cao trở thành $O(\\log n)$.

### 3.1. Walk-through — union by rank trên 5 phần tử

Khởi tạo: \`parent = [0,1,2,3,4]\`, \`rank = [0,0,0,0,0]\`.

| Thao tác | Diễn giải | parent | rank |
|----------|-----------|--------|------|
| \`union(0, 1)\` | rank bằng → \`parent[1]=0\`, \`rank[0]++\` | \`[0,0,2,3,4]\` | \`[1,0,0,0,0]\` |
| \`union(2, 3)\` | rank bằng → \`parent[3]=2\`, \`rank[2]++\` | \`[0,0,2,2,4]\` | \`[1,0,1,0,0]\` |
| \`union(1, 3)\` | \`find(1)=0\`, \`find(3)=2\`, \`rank[0]==rank[2]==1\` → \`parent[2]=0\`, \`rank[0]++\` | \`[0,0,0,2,4]\` | \`[2,0,1,0,0]\` |
| \`union(0, 4)\` | \`find(0)=0\`, \`find(4)=4\`, \`rank[0]=2 > rank[4]=0\` → \`parent[4]=0\` | \`[0,0,0,2,0]\` | \`[2,0,1,0,0]\` |

Cây cuối: \`0\` là gốc, các con trực tiếp \`1, 2, 4\`; \`3\` qua \`2 → 0\`. Chiều cao = 2, không phải 3 như cài đặt ngây thơ → **\`find(3)\` mất 2 bước** thay vì 3.

### 3.2. 💡 Trực giác — sao "rank thấp gắn vào rank cao"?

Hình dung **kim tự tháp**: nếu bạn xếp tháp nhỏ lên đỉnh tháp lớn, chiều cao toàn cụm tăng đúng bằng tháp nhỏ. Nhưng nếu xếp tháp lớn lên tháp nhỏ → toàn bộ tháp lớn "ngất ngưởng" trên đỉnh → chiều cao tăng vọt.

Quy tắc "thấp gắn vào cao" giữ chiều cao không tăng (trừ khi hai cây **bằng** chiều cao → mới tăng $+1$). Chứng minh được chiều cao $\\leq \\log_2 n$.

## 4. Tối ưu 2 — Path compression

Trong khi tìm đường đi từ \`x\` lên gốc, **gắn thẳng tất cả node trên đường đó vào gốc**.

\`\`\`
function find(x):
    if parent[x] != x:
        parent[x] = find(parent[x])    # đệ quy + nén
    return parent[x]
\`\`\`

Sau lần \`find\` này, các lần sau cực nhanh.

### 4.1. Walk-through — path compression nhìn thấy giá trị

Giả sử ta có cây "dài" trước nén:

\`\`\`
parent = [1, 2, 3, 4, 4]
cây:    4
        |
        3
        |
        2
        |
        1
        |
        0
\`\`\`

\`find(0)\` không nén: đi \`0 → 1 → 2 → 3 → 4\`, trả về \`4\`. Mất 4 bước.

\`find(0)\` **có** path compression (đệ quy):

\`\`\`
find(0):
  parent[0]=1 ≠ 0 → parent[0] = find(1)
    find(1):
      parent[1]=2 ≠ 1 → parent[1] = find(2)
        find(2):
          parent[2]=3 ≠ 2 → parent[2] = find(3)
            find(3):
              parent[3]=4 ≠ 3 → parent[3] = find(4)
                find(4):
                  parent[4]=4 → return 4
              parent[3] = 4 → return 4
          parent[2] = 4 → return 4
      parent[1] = 4 → return 4
  parent[0] = 4 → return 4
\`\`\`

Trạng thái sau:

\`\`\`
parent = [4, 4, 4, 4, 4]
cây:    4
       /|\\\\\\
      0 1 2 3       # tất cả gắn thẳng vào gốc
\`\`\`

Lần \`find(0)\` tiếp theo? Đi \`0 → 4\` — **1 bước**. Cây "ép phẳng" như đĩa pizza.

### 4.2. ⚠ Lỗi thường gặp với path compression

| Lỗi | Hậu quả | Cách sửa |
|------|---------|----------|
| Quên gán \`parent[x] = ...\` (chỉ \`return find(parent[x])\`) | Không có nén — \`find\` vẫn $O(\\log n)$ thay vì $O(\\alpha)$ | Phải có \`parent[x] = find(parent[x])\` |
| Dùng \`parent[x] = parent[parent[x]]\` (chỉ "halving") | Vẫn cải thiện được, nhưng yếu hơn nén toàn bộ | Dùng đệ quy nén full hoặc 2-pass iterative |
| Đệ quy quá sâu trên đồ thị $10^6$ phần tử | Stack overflow | Dùng iterative path compression (2 pass) |

\`\`\`go
// Iterative path compression (an toàn với n lớn)
func (u *UF) Find(x int) int {
    root := x
    for u.parent[root] != root { root = u.parent[root] }
    for u.parent[x] != root {
        next := u.parent[x]
        u.parent[x] = root
        x = next
    }
    return root
}
\`\`\`

## 5. Độ phức tạp khi kết hợp cả hai

Mỗi thao tác có độ phức tạp **amortized $O(\\alpha(n))$**, với $\\alpha$ là hàm Ackermann ngược — **gần như là hằng số** ($\\alpha(n) < 5$ cho mọi $n$ thực tế).

→ Coi như $O(1)$ trong thực hành.

### 5.1. ❓ Câu hỏi tự nhiên — $\\alpha(n)$ là gì, vì sao "gần hằng số"?

**$\\alpha(n)$ là nghịch đảo của hàm Ackermann $A(k, k)$** — một hàm tăng cực chậm. Bảng giá trị thực tế:

| $n$ | $\\alpha(n)$ |
|-----|--------|
| $n \\leq 2$ | $0$ |
| $n \\leq 3$ | $1$ |
| $n \\leq 7$ | $2$ |
| $n \\leq 2047$ | $3$ |
| $n \\leq 2^{2^{16}} - 1 \\approx 10^{19728}$ | $4$ |
| Số nguyên tử trong vũ trụ quan sát được ($\\sim 10^{80}$) | $4$ |

Tóm lại: với mọi $n$ "có thật trên Trái Đất", $\\alpha(n) \\leq 4$ — coi như hằng số. Bạn không bao giờ thấy $\\alpha(n) = 5$ trong đời.

**Vì sao chỉ amortized?** Một thao tác **lẻ** vẫn có thể mất $O(\\log n)$ (lần đầu \`find\` trên cây dài). Nhưng **trung bình trên m thao tác**, tổng chi phí là $O(m \\cdot \\alpha(n))$. Path compression "trả trước" công sức cho các lần \`find\` sau.

### 5.2. ⚠ Lỗi thường gặp — kết hợp tối ưu sai cách

| Lỗi | Hậu quả | Cách sửa |
|------|---------|----------|
| Dùng path compression **không kèm** union by rank | Chiều cao có thể không bị giới hạn ngắn, vẫn ổn $O(\\log n)$ amortized | Dùng cả hai → $O(\\alpha(n))$ |
| Dùng union by rank **không kèm** path compression | $O(\\log n)$ mỗi thao tác, không gần hằng số | Bật thêm path compression |
| Quên giảm rank khi gộp | Rank chỉ tăng, không sai nhưng tốn bộ nhớ debug | Không cần giảm — rank là "upper bound", giữ tăng đúng quy tắc |
| Reset \`rank\` về 0 sau union | Sai luôn — phá cấu trúc cây | Không bao giờ reset |

### 5.3. 📝 Tóm tắt mục 2-5

- Cài ngây thơ: \`find\` có thể $O(n)$ (cây "linked-list").
- **Union by rank**: thấp gắn vào cao → chiều cao $O(\\log n)$.
- **Path compression**: ép cây phẳng sau mỗi \`find\` → các lần sau gần $O(1)$.
- Kết hợp cả hai: **amortized $O(\\alpha(n)) \\approx O(1)$** thực tế.
- Bộ nhớ: $O(n)$ cho \`parent[]\` + \`rank[]\`.

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

$O(E \\log E)$.

### 7.1. ❓ Câu hỏi tự nhiên về ứng dụng

- **"UF có dùng cho đồ thị có hướng?"** — **Không**. UF gom phần tử có quan hệ **đối xứng** (cùng tập). Đồ thị có hướng \`a → b\` không suy ra \`b → a\`. Phát hiện chu trình trên đồ thị có hướng cần DFS với 3 màu (xem lesson 11, bài 2).
- **"Có thể dùng UF để tách (split) tập không?"** — Không trực tiếp. Bạn phải xây lại UF, hoặc dùng **offline**: xử lý ngược các thao tác \`split\` thành \`union\` từ trạng thái cuối.
- **"Kruskal vs Prim — khi nào dùng cái nào?"** — Kruskal (UF) tốt khi cạnh thưa, có thể sort cạnh dễ. Prim (heap) tốt khi đồ thị dày, phù hợp adjacency list/matrix sẵn. Cùng $O(E \\log V)$.

### 7.2. 🔁 Tự kiểm tra

1. Sau chuỗi \`union(0,1), union(2,3), union(1,2)\` với union by rank trên 5 phần tử, \`find(3)\` ra gì?
   <details><summary>Đáp án</summary>Sau \`union(0,1)\`: rank \`[1,0,0,0,0]\`, \`parent[1]=0\`. Sau \`union(2,3)\`: rank \`[1,0,1,0,0]\`, \`parent[3]=2\`. \`union(1,2)\`: \`find(1)=0\`, \`find(2)=2\`, \`rank[0]==rank[2]==1\` → \`parent[2]=0\`, \`rank[0]=2\`. Vậy \`find(3)\`: \`3 → 2 → 0\`, trả về \`0\`.</details>
2. Nếu lưu \`size\` thay vì \`rank\` (\`union by size\`), kết quả cuối có giống không?
   <details><summary>Đáp án</summary>Cùng đạt $O(\\alpha)$ amortized. Lựa chọn cụ thể (kích thước nhóm vs chiều cao) thường giống nhau khi cây thấp, nhưng size có lợi thế: trả lời được "nhóm a có bao nhiêu người" trong $O(\\alpha)$.</details>
3. UF có dùng được cho **tính số đảo** trong mảng (LeetCode 493 — Reverse Pairs) không?
   <details><summary>Đáp án</summary>Không phù hợp. Đảo cần thứ tự tổng, UF chỉ quản lý quan hệ tương đương. Dùng merge sort hoặc BIT (lesson 13).</details>

## Bài tập

1. Cài đặt Union-Find với cả hai tối ưu. So sánh tốc độ với phiên bản ngây thơ.
2. Cho $n$ người và một danh sách cặp bạn bè. Tính số nhóm bạn (thành phần liên thông).
3. Cho đồ thị có hướng, Union-Find có dùng được để phát hiện chu trình không? Vì sao?
4. Mở rộng Union-Find để hỗ trợ truy vấn **kích thước tập** chứa một phần tử trong $O(\\alpha)$.
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
Mỗi thao tác amortized $O(\\alpha(n)) \\approx O(1)$.

### Bài 2 — Đếm nhóm bạn
Khởi tạo UF với $n$ người. Với mỗi cặp \`(a, b)\` là bạn: \`Union(a, b)\`. Cuối cùng đếm số đại diện khác nhau (số $i$ mà \`Find(i) == i\`).

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
$O(\\alpha)$.

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
$O(E \\log E)$.

## Code & Minh họa

- [solutions.go](./solutions.go) — UF đầy đủ với rank + compression, đếm nhóm bạn, Kruskal.
- [visualization.html](./visualization.html) — forest 10 phần tử, Union với rank và Find với path compression.

## Bài tiếp theo

[Lesson 03 — Segment Tree & Fenwick Tree](../lesson-03-segment-tree/)
`;
