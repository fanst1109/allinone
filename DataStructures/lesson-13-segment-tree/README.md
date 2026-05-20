# Lesson 13 — Segment Tree & Fenwick Tree

## Mục tiêu học tập

- Hiểu bài toán **range query / range update**.
- Cài đặt **Segment Tree** cho range sum và range update.
- Hiểu **lazy propagation** cho range update.
- Biết **Fenwick Tree (BIT)** — biến thể gọn hơn cho một số bài toán.

## Kiến thức tiền đề

- [Lesson 06 — Tree](../lesson-06-tree/).
- [Lesson 08 — Heap](../lesson-08-heap-priority-queue/) (về cách dùng mảng biểu diễn cây).

## 1. Bài toán

Cho mảng `a[0..n-1]`. Hỗ trợ:

- **Truy vấn**: tính tổng (hoặc min/max/gcd...) trên đoạn `[l, r]`.
- **Cập nhật**: thay đổi `a[i]`, hoặc cộng `x` vào mọi phần tử trong `[l, r]`.

Cách ngây thơ:
- Tính tổng đoạn: `O(n)` mỗi truy vấn.
- Cập nhật điểm: `O(1)`.
- Với `q` truy vấn → `O(nq)` — quá chậm khi `n, q ≈ 10⁵`.

**Mục tiêu**: cả hai thao tác trong `O(log n)`.

## 2. Segment Tree

### 2.1. Cấu trúc

Cây nhị phân, mỗi node lưu thông tin của một **đoạn `[l, r]`**:
- Root: toàn bộ mảng `[0, n-1]`.
- Mỗi node có 2 con chia đoạn ra hai nửa.
- Lá: đoạn `[i, i]` ứng với phần tử.

Dùng mảng cỡ `4n` để chắc chắn đủ chỗ.

```
mảng a = [1, 3, 5, 7, 9, 11]
         tổng = 36
        /              \
      [0,2]=9         [3,5]=27
      /    \           /     \
    [0,1]  [2,2]    [3,4]   [5,5]
     =4     =5       =16     =11
   /   \              / \
 [0,0][1,1]        [3,3][4,4]
  =1   =3           =7   =9
```

### 2.2. Build (`O(n)`)

```
function build(node, l, r):
    if l == r:
        tree[node] = a[l]; return
    mid = (l + r) / 2
    build(2*node,   l,   mid)
    build(2*node+1, mid+1, r)
    tree[node] = tree[2*node] + tree[2*node+1]
```

### 2.3. Truy vấn tổng `[ql, qr]` (`O(log n)`)

```
function query(node, l, r, ql, qr):
    if qr < l or r < ql: return 0          # không giao
    if ql <= l and r <= qr: return tree[node]   # nằm trọn
    mid = (l + r) / 2
    return query(2*node, l, mid, ql, qr)
         + query(2*node+1, mid+1, r, ql, qr)
```

### 2.4. Cập nhật điểm `a[i] += v` (`O(log n)`)

```
function update(node, l, r, i, v):
    if l == r:
        tree[node] += v; return
    mid = (l + r) / 2
    if i <= mid: update(2*node, l, mid, i, v)
    else: update(2*node+1, mid+1, r, i, v)
    tree[node] = tree[2*node] + tree[2*node+1]
```

## 3. Lazy Propagation

Khi cập nhật **cả đoạn `[ql, qr]`** (chứ không phải một điểm), nếu update từng phần tử thì tốn `O(n log n)`. **Lazy** giải quyết:

- Khi gặp node nằm trọn trong `[ql, qr]`, **đánh dấu lazy** thay vì đi sâu.
- Lần sau khi cần đi vào node đó, **đẩy lazy** xuống con trước.

Cho phép range update + range query đều `O(log n)`.

```
lazy = mảng cùng kích thước tree, mặc định 0

function pushDown(node, l, r):
    if lazy[node] != 0:
        mid = (l+r)/2
        applyLazy(2*node,   l,   mid,   lazy[node])
        applyLazy(2*node+1, mid+1, r,   lazy[node])
        lazy[node] = 0

function applyLazy(node, l, r, v):
    tree[node] += (r - l + 1) * v
    lazy[node] += v
```

## 4. Fenwick Tree (Binary Indexed Tree, BIT)

Cấu trúc gọn hơn segment tree, dùng cho **range sum + point update** hoặc ngược lại.

### 4.1. Ý tưởng

Mảng `bit[1..n]`. Mỗi vị trí `i` lưu tổng của một đoạn có độ dài là **lũy thừa của 2** (xác định bằng bit thấp nhất của `i`).

```
function update(i, v):           # a[i] += v
    while i <= n:
        bit[i] += v
        i += i & (-i)            # lowbit

function prefixSum(i):           # tổng a[1..i]
    s = 0
    while i > 0:
        s += bit[i]
        i -= i & (-i)
    return s

function rangeSum(l, r):
    return prefixSum(r) - prefixSum(l - 1)
```

- `update`, `query`: `O(log n)`.
- Code ngắn, bộ nhớ chỉ `n`, không phải `4n`.

### 4.2. Hạn chế

- Phù hợp với phép tổng (cộng/trừ) — không tổng quát bằng segment tree.
- Khó cài range update + range query (cần 2 BIT).

## 5. So sánh

| Tiêu chí | Segment Tree | Fenwick (BIT) |
| --- | --- | --- |
| Bộ nhớ | `~4n` | `n` |
| Code | Dài | Ngắn |
| Tổng quát | Cao (min/max/gcd...) | Chỉ cộng/trừ |
| Lazy / range update | Hỗ trợ tốt | Khó |

## 6. Ứng dụng

- Range sum / min / max query.
- Đếm số nghịch thế (inversion count) trong mảng.
- Bài toán "k-th smallest" trên prefix.
- Range updates trong game / simulation.
- Hệ thống đếm lượt xem theo khoảng thời gian.

## 7. Mở rộng

- **2D segment tree / 2D BIT**: cho ma trận.
- **Persistent segment tree**: giữ lịch sử mọi phiên bản.
- **Implicit segment tree**: cho phạm vi giá trị lớn nhưng thưa.

## Bài tập

1. Cài đặt segment tree cho **range sum**, hỗ trợ point update và range query.
2. Mở rộng segment tree thành **range min query**.
3. Cài đặt segment tree với **lazy propagation** cho range add + range sum.
4. Đếm số nghịch thế của mảng bằng Fenwick tree.
5. Cho 10⁵ truy vấn dạng "trung bình các phần tử trong `[l, r]`", chọn cấu trúc nào và vì sao.

## Bài tiếp theo

[Lesson 14 — Advanced Structures](../lesson-14-advanced-structures/)
