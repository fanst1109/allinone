// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: DataStructures/lesson-13-segment-tree/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 13 — Segment Tree & Fenwick Tree

## Mục tiêu học tập

- Hiểu bài toán **range query / range update**.
- Cài đặt **Segment Tree** cho range sum và range update.
- Hiểu **lazy propagation** cho range update.
- Biết **Fenwick Tree (BIT)** — biến thể gọn hơn cho một số bài toán.

## Kiến thức tiền đề

- [Lesson 06 — Tree](../lesson-06-tree/).
- [Lesson 08 — Heap](../lesson-08-heap-priority-queue/) (về cách dùng mảng biểu diễn cây).

## 1. Bài toán

Cho mảng \`a[0..n-1]\`. Hỗ trợ:

- **Truy vấn**: tính tổng (hoặc min/max/gcd...) trên đoạn \`[l, r]\`.
- **Cập nhật**: thay đổi \`a[i]\`, hoặc cộng \`x\` vào mọi phần tử trong \`[l, r]\`.

Cách ngây thơ:
- Tính tổng đoạn: \`O(n)\` mỗi truy vấn.
- Cập nhật điểm: \`O(1)\`.
- Với \`q\` truy vấn → \`O(nq)\` — quá chậm khi \`n, q ≈ 10⁵\`.

**Mục tiêu**: cả hai thao tác trong \`O(log n)\`.

### 1.1. 💡 Trực giác — "chia đôi mảng đệ quy, tổng được tích sẵn"

Hình dung **cây gia phả** dựng ngược: đáy là \`n\` phần tử của mảng; mỗi tầng trên là các "cha" lưu **tổng của hai con**. Đỉnh là tổng toàn bộ.

Khi cần tổng đoạn \`[l, r]\`, ta **không** đi qua từng phần tử mà **leo cây**: tìm tập tối thiểu các node "phủ vừa khít" \`[l, r]\`, lấy tổng đã tích sẵn ở đó. Vì cây cao \`log n\`, ta chỉ chạm \`O(log n)\` node.

Khi cập nhật \`a[i]\`, ta chỉ cần đi từ lá \`i\` lên gốc, sửa các tổng trên đường — cũng \`O(log n)\`.

Tương phản với 3 cách quen thuộc:

| Cấu trúc | Range sum | Point update | Range update | Bộ nhớ |
|----------|-----------|--------------|--------------|--------|
| Mảng thường | \`O(n)\` | \`O(1)\` | \`O(n)\` | \`n\` |
| Prefix sum | \`O(1)\` | \`O(n)\` rebuild | không tốt | \`n\` |
| **Segment tree** | \`O(log n)\` | \`O(log n)\` | \`O(log n)\` (lazy) | \`~4n\` |
| Fenwick (BIT) | \`O(log n)\` | \`O(log n)\` | khó | \`n\` |

Segment tree là **trade-off**: hi sinh ~4× bộ nhớ và code dài hơn để có **cả** query lẫn update đều \`O(log n)\`.

### 1.2. ❓ Câu hỏi tự nhiên trước khi vào chi tiết

- **"Vì sao prefix sum không đủ?"** — Prefix sum chỉ tốt khi mảng **không đổi**. Mỗi \`update(i, v)\` cần rebuild toàn bộ prefix \`O(n)\`. Với \`10⁵\` update → \`10¹⁰\` thao tác → TLE.
- **"Sao không dùng mảng thường, chấp nhận query \`O(n)\`?"** — Với \`n = q = 10⁵\`, \`nq = 10¹⁰\`. Máy hiện đại làm ~\`10⁸-10⁹\` thao tác/giây → mất \`10-100\` giây. Quá chậm cho hệ thống thời gian thực.
- **"Segment tree có làm được min/max/gcd không?"** — Có. Chỉ cần thay phép cộng bằng phép kết hợp (associative) tương ứng. Đó là sức mạnh của segment tree so với BIT.

## 2. Segment Tree

### 2.1. Cấu trúc

Cây nhị phân, mỗi node lưu thông tin của một **đoạn \`[l, r]\`**:
- Root: toàn bộ mảng \`[0, n-1]\`.
- Mỗi node có 2 con chia đoạn ra hai nửa.
- Lá: đoạn \`[i, i]\` ứng với phần tử.

Dùng mảng cỡ \`4n\` để chắc chắn đủ chỗ.

\`\`\`
mảng a = [1, 3, 5, 7, 9, 11]
         tổng = 36
        /              \\
      [0,2]=9         [3,5]=27
      /    \\           /     \\
    [0,1]  [2,2]    [3,4]   [5,5]
     =4     =5       =16     =11
   /   \\              / \\
 [0,0][1,1]        [3,3][4,4]
  =1   =3           =7   =9
\`\`\`

### 2.2. Build (\`O(n)\`)

\`\`\`
function build(node, l, r):
    if l == r:
        tree[node] = a[l]; return
    mid = (l + r) / 2
    build(2*node,   l,   mid)
    build(2*node+1, mid+1, r)
    tree[node] = tree[2*node] + tree[2*node+1]
\`\`\`

### 2.3. Truy vấn tổng \`[ql, qr]\` (\`O(log n)\`)

\`\`\`
function query(node, l, r, ql, qr):
    if qr < l or r < ql: return 0          # không giao
    if ql <= l and r <= qr: return tree[node]   # nằm trọn
    mid = (l + r) / 2
    return query(2*node, l, mid, ql, qr)
         + query(2*node+1, mid+1, r, ql, qr)
\`\`\`

### 2.4. Cập nhật điểm \`a[i] += v\` (\`O(log n)\`)

\`\`\`
function update(node, l, r, i, v):
    if l == r:
        tree[node] += v; return
    mid = (l + r) / 2
    if i <= mid: update(2*node, l, mid, i, v)
    else: update(2*node+1, mid+1, r, i, v)
    tree[node] = tree[2*node] + tree[2*node+1]
\`\`\`

## 3. Lazy Propagation

Khi cập nhật **cả đoạn \`[ql, qr]\`** (chứ không phải một điểm), nếu update từng phần tử thì tốn \`O(n log n)\`. **Lazy** giải quyết:

- Khi gặp node nằm trọn trong \`[ql, qr]\`, **đánh dấu lazy** thay vì đi sâu.
- Lần sau khi cần đi vào node đó, **đẩy lazy** xuống con trước.

Cho phép range update + range query đều \`O(log n)\`.

\`\`\`
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
\`\`\`

## 4. Fenwick Tree (Binary Indexed Tree, BIT)

Cấu trúc gọn hơn segment tree, dùng cho **range sum + point update** hoặc ngược lại.

### 4.1. Ý tưởng

Mảng \`bit[1..n]\`. Mỗi vị trí \`i\` lưu tổng của một đoạn có độ dài là **lũy thừa của 2** (xác định bằng bit thấp nhất của \`i\`).

\`\`\`
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
\`\`\`

- \`update\`, \`query\`: \`O(log n)\`.
- Code ngắn, bộ nhớ chỉ \`n\`, không phải \`4n\`.

### 4.2. Hạn chế

- Phù hợp với phép tổng (cộng/trừ) — không tổng quát bằng segment tree.
- Khó cài range update + range query (cần 2 BIT).

## 5. So sánh

| Tiêu chí | Segment Tree | Fenwick (BIT) |
| --- | --- | --- |
| Bộ nhớ | \`~4n\` | \`n\` |
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
5. Cho 10⁵ truy vấn dạng "trung bình các phần tử trong \`[l, r]\`", chọn cấu trúc nào và vì sao.

## Lời giải chi tiết

### Bài 1 — Segment tree range sum, point update
Mảng \`tree\` kích thước \`4n\`. Mỗi node lưu tổng của đoạn nó phụ trách.

Build, query, update đều như pseudocode trong phần lý thuyết. Tất cả \`O(log n)\` (query/update) hoặc \`O(n)\` (build).

### Bài 2 — Range min query
Cùng cấu trúc, đổi phép tổng thành \`min\`:
\`\`\`go
tree[node] = min(tree[2*node], tree[2*node+1])
// query: trả về +∞ khi không giao, min hai con khi cắt
\`\`\`

### Bài 3 — Lazy propagation cho range-add + range-sum
Mảng \`lazy[]\` lưu giá trị chưa được "đẩy" xuống con.
- Khi update \`[ql, qr] += v\` chạm node nằm trọn: \`tree[node] += (r-l+1)*v\`, \`lazy[node] += v\`, không đi sâu.
- Trước khi đi sâu vào node, gọi \`pushDown\` để đẩy \`lazy\` xuống hai con.

Cả update và query đều \`O(log n)\`.

### Bài 4 — Đếm nghịch thế bằng Fenwick
**Nghịch thế**: cặp \`(i, j)\` với \`i < j\` nhưng \`a[i] > a[j]\`.

Ý tưởng: duyệt từ phải sang trái, với mỗi \`a[i]\` đếm bao nhiêu phần tử **đã thấy ở bên phải** có giá trị \`< a[i]\` → đó là số nghịch thế đóng góp bởi \`i\`.

Dùng BIT trên không gian giá trị (sau khi compress giá trị):
\`\`\`
for i from n-1 down to 0:
    inv += bit.PrefixSum(a[i] - 1)
    bit.Update(a[i], +1)
\`\`\`
\`O(n log n)\`.

### Bài 5 — Trung bình \`[l, r]\` qua 10⁵ truy vấn
Cần tổng nhanh + đếm phần tử = \`r - l + 1\`. **Segment tree range sum** (hoặc **prefix sum** nếu không có update) — cả hai cho tổng \`O(log n)\` hoặc \`O(1)\`. Trung bình = \`sum / (r - l + 1)\`.

Nếu mảng **không thay đổi**: dùng prefix sum đơn giản, \`O(1)\` mỗi query.
Nếu có **point update**: Fenwick tree, \`O(log n)\`.

## Code & Minh họa

- [solutions.go](./solutions.go) — Segment tree sum + min + lazy add; Fenwick + đếm nghịch thế.
- [visualization.html](./visualization.html) — segment tree 8 phần tử, hiển thị các node bị duyệt khi query và update.

## Bài tiếp theo

[Lesson 14 — Advanced Structures](../lesson-14-advanced-structures/)
`;
