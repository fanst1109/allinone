# Lesson 06 — Tree (Cây)

## Mục tiêu học tập

- Hiểu thuật ngữ cây: root, leaf, parent, child, depth, height.
- Phân biệt **binary tree** và các loại cây đặc biệt.
- Biết bốn cách duyệt cây nhị phân: **preorder**, **inorder**, **postorder**, **level-order**.

## Kiến thức tiền đề

- [Lesson 02 — Linked List](../lesson-02-linked-list/) (hiểu con trỏ).
- [Lesson 03 — Stack](../lesson-03-stack/) và [Lesson 04 — Queue](../lesson-04-queue/) (dùng trong duyệt cây).

## 1. Cây là gì?

**Cây (tree)** là cấu trúc dữ liệu phi tuyến: gồm các **node**, mỗi node có thể có nhiều **node con**, không có chu trình.

```
         A          <- root
        / \
       B   C
      / \   \
     D   E   F      <- leaves: D, E, F
```

## 2. Thuật ngữ

| Thuật ngữ | Ý nghĩa |
| --- | --- |
| Root | Node trên cùng, không có cha |
| Leaf | Node không có con |
| Parent | Node cha trực tiếp |
| Child | Node con trực tiếp |
| Sibling | Node có cùng cha |
| Ancestor | Node nằm trên đường từ một node lên root |
| Descendant | Node nằm phía dưới một node |
| Depth (độ sâu) | Khoảng cách từ root tới node (root depth = 0) |
| Height (chiều cao) | Khoảng cách dài nhất từ node tới một leaf |
| Subtree | Một node và toàn bộ con cháu của nó |

## 3. Binary Tree (cây nhị phân)

Mỗi node có **tối đa 2 con**: `left` và `right`.

```
class Node:
    value
    left   # Node hoặc null
    right  # Node hoặc null
```

Các loại đặc biệt:
- **Full binary tree**: mỗi node có 0 hoặc 2 con (không có node có 1 con).
- **Complete binary tree**: tất cả các tầng đầy, trừ tầng cuối có thể thiếu, lấp từ trái sang.
- **Perfect binary tree**: đầy hoàn toàn, mọi leaf cùng độ sâu.
- **Balanced binary tree**: chênh lệch chiều cao giữa hai con của mọi node không quá 1.

## 4. Duyệt cây nhị phân

### 4.1. Duyệt theo chiều sâu (DFS)

Ba thứ tự (so với việc thăm node hiện tại):

- **Preorder**: Node → Left → Right
- **Inorder**: Left → Node → Right
- **Postorder**: Left → Right → Node

```
function preorder(node):
    if node == null: return
    visit(node)
    preorder(node.left)
    preorder(node.right)

function inorder(node):
    if node == null: return
    inorder(node.left)
    visit(node)
    inorder(node.right)

function postorder(node):
    if node == null: return
    postorder(node.left)
    postorder(node.right)
    visit(node)
```

Trên cây:
```
       1
      / \
     2   3
    / \
   4   5
```
- Preorder: `1 2 4 5 3`
- Inorder: `4 2 5 1 3`
- Postorder: `4 5 2 3 1`

### 4.2. Duyệt theo chiều rộng (BFS / level-order)

Dùng queue, duyệt từng tầng từ trên xuống, trái sang phải.

```
function levelOrder(root):
    if root == null: return
    queue = [root]
    while not queue.isEmpty():
        node = queue.dequeue()
        visit(node)
        if node.left  != null: queue.enqueue(node.left)
        if node.right != null: queue.enqueue(node.right)
```

Trên cây ví dụ: `1 2 3 4 5`.

### 4.3. Khi nào dùng cách nào?

- **Preorder**: sao chép cây, in cấu trúc.
- **Inorder**: trên BST → ra dãy đã sắp xếp.
- **Postorder**: xóa cây, tính toán phụ thuộc con (ví dụ đánh giá biểu thức).
- **Level-order**: in theo tầng, tìm đường ngắn nhất trong cây không trọng số.

## 5. Độ phức tạp

| Thao tác | Big-O |
| --- | --- |
| Duyệt toàn bộ | `O(n)` |
| Tính chiều cao | `O(n)` |
| Tìm trong cây tổng quát | `O(n)` |

Đối với các cây **có cấu trúc đặc biệt** (BST, heap, balanced tree), độ phức tạp tốt hơn nhiều — sẽ học ở các bài sau.

## 6. Cây tổng quát (n-ary tree)

Mỗi node có một danh sách `children` không giới hạn. Dùng cho:
- Cây thư mục (file system).
- Cây DOM trong HTML.
- Cây cú pháp (AST) trong compiler.

## 7. Cài đặt cây nhị phân — ví dụ tính chiều cao

```
function height(node):
    if node == null: return -1
    return 1 + max(height(node.left), height(node.right))
```
`O(n)`.

## 8. Tổ chức bộ nhớ: cách 1 — Pointer-based

Phần này trả lời câu hỏi: *"cụ thể trong RAM, bit và byte của một cây được xếp ra sao?"* Có 3 cách phổ biến — pointer-based (mục này), array-based (sẽ học ở [lesson 8 — Heap](../lesson-08-heap-priority-queue/)), và succinct/bit-level (ngoài phạm vi lesson cơ bản).

### 8.1. 💡 Trực giác — "danh thiếp địa chỉ"

Mỗi node là một **toà nhà** trong thành phố RAM. Trong toà nhà có 3 phòng:
- Phòng chứa giá trị (`value`).
- Phòng dán **địa chỉ của toà nhà con bên trái** (`left`).
- Phòng dán **địa chỉ của toà nhà con bên phải** (`right`).

Toà nhà không cần đứng cạnh nhau. Muốn đi từ cha → con, ta đọc địa chỉ trong phòng "left" / "right" rồi nhảy tới đó. Đây chính là **con trỏ (pointer)**.

### 8.2. Layout của một Node trong RAM (máy 64-bit)

Trên máy 64-bit:
- `int32 value` chiếm **4 byte**.
- Mỗi pointer chiếm **8 byte** (vì địa chỉ 64-bit).
- Compiler chèn **padding** để mọi pointer align ở biên 8-byte → tổng cộng **24 byte/node**.

```
offset:  0      4      8              16             24
        ┌──────┬──────┬───────────────┬───────────────┐
        │value │ pad  │  left (ptr)   │  right (ptr)  │
        │ 4B   │ 4B   │      8B       │      8B       │
        └──────┴──────┴───────────────┴───────────────┘
```

### 8.3. Walk-through bằng địa chỉ thật trên cây ví dụ

Lấy lại cây ở mục 4:

```
       1
      / \
     2   3
    / \
   4   5
```

Allocator (vd `malloc` / Go `new`) đặt 5 node ở các địa chỉ giả định (OS chọn ngẫu nhiên):

| Node | Địa chỉ | value | left      | right     |
|------|---------|------:|-----------|-----------|
| n1   | `0x100` |   1   | `0x140`   | `0x180`   |
| n2   | `0x140` |   2   | `0x1C0`   | `0x200`   |
| n3   | `0x180` |   3   | `NULL` (0)| `NULL` (0)|
| n4   | `0x1C0` |   4   | `NULL`    | `NULL`    |
| n5   | `0x200` |   5   | `NULL`    | `NULL`    |

24 byte thực sự trong RAM cho `n1` (little-endian):

```
01 00 00 00  00 00 00 00  40 01 00 00 00 00 00 00  80 01 00 00 00 00 00 00
└─ value=1 ─┘ └─ padding ┘└──── left = 0x140 ────┘└──── right = 0x180 ────┘
```

Đi từ root xuống node 5 trong CPU:
1. Đọc 8 byte từ `&n1 + 8` (offset của `left`) → giá trị `0x140`.
2. Nhảy CPU tới `0x140` (= n2). Đọc offset 16 (right) → `0x200`.
3. Nhảy CPU tới `0x200` (= n5). Đọc value: `5`. ✓

Mỗi bước "đi xuống" = **một lần dereference pointer** = một lần truy cập RAM ở địa chỉ mới (có thể cache miss).

### 8.4. Tổng dung lượng cho cây 5 node

```
5 nodes × 24 byte = 120 byte
```

Trong đó **chỉ 20 byte chứa dữ liệu thật (`value`)**. 100 byte còn lại là metadata (pointer + padding) → ~83% overhead. Đây là cái giá của sự linh hoạt.

### 8.5. ❓ Câu hỏi tự nhiên

- **"Sao không bỏ padding cho khỏi phí?"** — Có thể (gắn `#pragma pack` trong C / `[StructLayout(Pack=1)]` trong C#), nhưng CPU sẽ phải đọc unaligned → chậm hơn, hoặc trên một số kiến trúc còn crash. Padding là trade-off **tốc độ vs bộ nhớ**.
- **"Trên máy 32-bit thì sao?"** — Pointer 4 byte → một Node = `4 (value) + 4 (left) + 4 (right) = 12 byte`. Không cần padding nữa.
- **"Trong Go, struct `Node{ Value int; Left, Right *Node }` chiếm bao nhiêu?"** — `int` Go là 8 byte trên 64-bit + 2 pointer 8 byte = **24 byte**, không cần padding vì đã sẵn aligned 8-byte. Dùng `unsafe.Sizeof(Node{})` để verify.
- **"Sao không lưu cả parent pointer?"** — Một số cây cần (vd Splay, để rotate); đổi lại tốn thêm 8 byte/node và phải đồng bộ khi chỉnh cây.
- **"Tại sao cây hay chậm hơn array dù cùng `O(n)`?"** — Mỗi pointer có thể nhảy tới địa chỉ xa → **cache miss**. Array cùng số phần tử nằm liên tiếp → CPU prefetch hiệu quả. Đây là động lực cho cách 2 (array-based) sẽ học ở lesson 8.

### 8.6. ⚠ Lỗi thường gặp

| Lỗi | Hậu quả |
|------|---------|
| Quên gán `NULL`/`nil` cho leaf | Đi sai địa chỉ rác → segfault / panic |
| Memory leak: xoá node mà không xoá con (C/C++) | Heap rò rỉ; ngôn ngữ có GC thì OK |
| Tự tham chiếu (`node.left = node`) khi build cây | Vòng lặp vô tận khi duyệt; cấu trúc đó là graph, không phải tree |
| Đếm `sizeof` mà quên padding | Sai dung lượng thực ~30-50% |

### 8.7. 🔁 Tự kiểm tra

1. Một cây có 1 triệu node, pointer-based trên máy 64-bit, dữ liệu là `int32`. Tốn bao nhiêu MB chỉ để LƯU?
   <details><summary>Đáp án</summary>`10⁶ × 24 byte = 24 MB`. Chỉ 4 MB là `value`, 20 MB là metadata.</details>
2. Vì sao đi từ root xuống node độ sâu `h` thực sự có thể chậm hơn `O(h)` ở mức "phép toán thuần"?
   <details><summary>Đáp án</summary>Mỗi node có thể nằm ở vùng RAM khác → cache miss. CPU đọc RAM ~100 ns vs cache L1 ~1 ns. Big-O bỏ qua hằng số này nhưng thực tế quan trọng.</details>

### 8.8. 📝 Tóm tắt mục 8

- Pointer-based: **node là struct rời rạc trong heap**, kết nối bằng địa chỉ.
- 1 node trên 64-bit = **24 byte** (4 value + 4 padding + 8 left + 8 right).
- Ưu: linh hoạt, dễ chỉnh cây động.
- Nhược: tốn bộ nhớ, cache-unfriendly, mỗi xuống tầng là một dereference.
- Khi cây gần đầy (complete) → ưu tiên array-based (lesson 8) để bớt overhead và tăng cache locality.

## Bài tập

1. Cho cây nhị phân, viết hàm đếm số node.
2. Viết hàm kiểm tra một cây có phải là cây đối xứng (mirror) không.
3. In cây nhị phân theo level-order, mỗi tầng một dòng.
4. Tính đường kính (diameter) của cây nhị phân — đường đi dài nhất giữa hai node bất kỳ.
5. Trên cây ở mục 4.1, viết ra kết quả của 4 cách duyệt với một cây khác do bạn tự vẽ.

## Lời giải chi tiết

### Bài 1 — Đếm số node
```go
func countNodes(n *Node) int {
    if n == nil { return 0 }
    return 1 + countNodes(n.left) + countNodes(n.right)
}
```
`O(n)`.

### Bài 2 — Cây đối xứng
Một cây đối xứng (mirror) nếu subtree trái và phải là **gương** của nhau. Dùng hai con trỏ:
```go
func isSymmetric(root *Node) bool {
    var mirror func(a, b *Node) bool
    mirror = func(a, b *Node) bool {
        if a == nil && b == nil { return true }
        if a == nil || b == nil { return false }
        return a.val == b.val && mirror(a.left, b.right) && mirror(a.right, b.left)
    }
    if root == nil { return true }
    return mirror(root.left, root.right)
}
```
`O(n)`.

### Bài 3 — Level-order, mỗi tầng một dòng
Dùng queue + đếm số node trong tầng hiện tại.
```go
func levelOrderByLines(root *Node) [][]int {
    if root == nil { return nil }
    out := [][]int{}
    q := []*Node{root}
    for len(q) > 0 {
        n := len(q)
        line := []int{}
        for i := 0; i < n; i++ {
            x := q[0]; q = q[1:]
            line = append(line, x.val)
            if x.left  != nil { q = append(q, x.left) }
            if x.right != nil { q = append(q, x.right) }
        }
        out = append(out, line)
    }
    return out
}
```
`O(n)`.

### Bài 4 — Đường kính cây
Đường kính = đường đi dài nhất giữa hai node bất kỳ = `max(height(left) + height(right) + 2)` trên mọi node.

Tính chiều cao + cập nhật đường kính trong cùng một lần đệ quy:
```go
func diameter(root *Node) int {
    best := 0
    var h func(n *Node) int
    h = func(n *Node) int {
        if n == nil { return -1 }
        l := h(n.left); r := h(n.right)
        if l + r + 2 > best { best = l + r + 2 }
        return 1 + max(l, r)
    }
    h(root)
    return best
}
```
`O(n)`.

### Bài 5 — Tự vẽ và trace 4 cách duyệt
Lấy cây:
```
        1
       / \
      2   3
       \   \
        5   6
       /
      4
```
- Preorder (Node-L-R): `1 2 5 4 3 6`.
- Inorder (L-Node-R): `2 4 5 1 3 6`.
- Postorder (L-R-Node): `4 5 2 6 3 1`.
- Level-order: `1 2 3 5 6 4`.

## Code & Minh họa

- [solutions.go](./solutions.go) — đủ 4 bài tập + cây mẫu.
- [visualization.html](./visualization.html) — minh họa cây nhị phân và highlight thứ tự duyệt theo 4 chế độ.

## Bài tiếp theo

[Lesson 07 — Binary Search Tree](../lesson-07-binary-search-tree/)
