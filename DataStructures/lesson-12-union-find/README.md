# Lesson 12 — Union-Find (Disjoint Set Union)

## Mục tiêu học tập

- Hiểu khái niệm **tập hợp rời rạc (disjoint set)** và bài toán liên thông động.
- Cài đặt `find` và `union` với hai tối ưu **union by rank** và **path compression**.
- Hiểu độ phức tạp gần như `O(1)` thực tế.
- Biết các bài toán thường dùng Union-Find.

## Kiến thức tiền đề

- [Lesson 06 — Tree](../lesson-06-tree/) (về mặt biểu diễn).

## 1. Bài toán

Cho `n` phần tử ban đầu mỗi cái thuộc một tập riêng. Hỗ trợ hai thao tác:

- `union(a, b)`: gộp tập chứa `a` và tập chứa `b`.
- `find(a)`: trả về **đại diện (representative)** của tập chứa `a`.
- Câu hỏi phổ biến: `a` và `b` có cùng tập không? → `find(a) == find(b)`.

Đây là bài toán **liên thông động (dynamic connectivity)**.

## 2. Cài đặt cơ bản

Lưu một mảng `parent[]`, ban đầu `parent[i] = i` (mỗi phần tử là gốc của tập của chính nó).

```
function find(x):
    while parent[x] != x:
        x = parent[x]
    return x

function union(a, b):
    ra = find(a); rb = find(b)
    if ra != rb:
        parent[ra] = rb
```

Mỗi tập được biểu diễn bằng một **cây**, đại diện là gốc cây.

```
parent: [0, 0, 1, 1, 4]
cây:    0       4
        |
        1
       / \
      2   3
```

→ `find(3) = 0` (đi 3 → 1 → 0).

Vấn đề: cây có thể cao → `find` chậm. Cần tối ưu.

## 3. Tối ưu 1 — Union by rank/size

Khi gộp hai cây, gắn **cây thấp** vào **cây cao** (không phải ngược lại) để giữ chiều cao thấp.

```
rank = [0]*n      # chiều cao tương đối

function union(a, b):
    ra = find(a); rb = find(b)
    if ra == rb: return
    if rank[ra] < rank[rb]: parent[ra] = rb
    else if rank[ra] > rank[rb]: parent[rb] = ra
    else:
        parent[rb] = ra
        rank[ra] += 1
```

Chiều cao trở thành `O(log n)`.

## 4. Tối ưu 2 — Path compression

Trong khi tìm đường đi từ `x` lên gốc, **gắn thẳng tất cả node trên đường đó vào gốc**.

```
function find(x):
    if parent[x] != x:
        parent[x] = find(parent[x])    # đệ quy + nén
    return parent[x]
```

Sau lần `find` này, các lần sau cực nhanh.

## 5. Độ phức tạp khi kết hợp cả hai

Mỗi thao tác có độ phức tạp **amortized `O(α(n))`**, với `α` là hàm Ackermann ngược — **gần như là hằng số** (`α(n) < 5` cho mọi `n` thực tế).

→ Coi như `O(1)` trong thực hành.

## 6. Ứng dụng

### 6.1. Kruskal's MST
Sắp xếp cạnh tăng dần theo trọng số; với mỗi cạnh `(u, v, w)`, nếu `find(u) != find(v)` thì thêm vào MST và `union(u, v)`.

### 6.2. Kiểm tra liên thông động
Trong một mạng đang được thêm cạnh, kiểm tra hai nút có liên thông không.

### 6.3. Phát hiện chu trình trên đồ thị vô hướng
Khi thêm cạnh `(u, v)`, nếu `find(u) == find(v)` → cạnh này tạo chu trình.

### 6.4. Bài toán nhóm
- Gom các tài khoản trùng (Accounts merge).
- Bạn chung trong mạng xã hội.
- Liên thông pixel trong xử lý ảnh.

## 7. Ví dụ — Kruskal

```
function kruskal(edges, n):
    sort(edges by weight)
    uf = UnionFind(n)
    mst = []
    for (u, v, w) in edges:
        if uf.find(u) != uf.find(v):
            uf.union(u, v)
            mst.append((u, v, w))
    return mst
```

`O(E log E)`.

## Bài tập

1. Cài đặt Union-Find với cả hai tối ưu. So sánh tốc độ với phiên bản ngây thơ.
2. Cho `n` người và một danh sách cặp bạn bè. Tính số nhóm bạn (thành phần liên thông).
3. Cho đồ thị có hướng, Union-Find có dùng được để phát hiện chu trình không? Vì sao?
4. Mở rộng Union-Find để hỗ trợ truy vấn **kích thước tập** chứa một phần tử trong `O(α)`.
5. Cài đặt Kruskal dùng Union-Find.

## Bài tiếp theo

[Lesson 13 — Segment Tree & Fenwick Tree](../lesson-13-segment-tree/)
