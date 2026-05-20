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
