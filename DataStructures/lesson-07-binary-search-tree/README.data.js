// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: DataStructures/lesson-07-binary-search-tree/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 07 — Binary Search Tree (BST)

## Mục tiêu học tập

- Hiểu **tính chất BST** và lý do nó cho tìm kiếm nhanh.
- Cài đặt được \`search\`, \`insert\`, \`delete\`.
- Hiểu tại sao BST **không cân bằng** có thể tệ như linked list.

## Kiến thức tiền đề

- [Lesson 06 — Tree](../lesson-06-tree/).

## 1. Tính chất BST

Một **Binary Search Tree** là cây nhị phân thỏa: với mọi node \`x\`,

- Mọi node trong **subtree trái** có giá trị **nhỏ hơn** \`x.value\`.
- Mọi node trong **subtree phải** có giá trị **lớn hơn** \`x.value\`.

Hệ quả: **duyệt inorder cho ra dãy đã sắp xếp**.

\`\`\`
       8
      / \\
     3   10
    / \\    \\
   1   6    14
      / \\   /
     4   7 13
\`\`\`

Inorder: \`1 3 4 6 7 8 10 13 14\` — đã sắp xếp.

## 2. Tìm kiếm — \`search(root, key)\`

So sánh với root: nhỏ hơn → đi trái, lớn hơn → đi phải, bằng → tìm thấy.

\`\`\`
function search(node, key):
    if node == null: return null
    if key == node.value: return node
    if key < node.value:  return search(node.left, key)
    else:                  return search(node.right, key)
\`\`\`

- Cây cân bằng: \`O(log n)\`.
- Cây xấu (lệch): \`O(n)\`.

## 3. Thêm — \`insert(root, key)\`

Đi xuống như khi tìm; tới chỗ \`null\` thì gắn node mới vào đó.

\`\`\`
function insert(node, key):
    if node == null: return Node(key)
    if key < node.value:  node.left  = insert(node.left, key)
    else if key > node.value: node.right = insert(node.right, key)
    return node
\`\`\`

## 4. Xóa — \`delete(root, key)\`

Khó hơn. Ba trường hợp:

1. Node là **leaf** → xóa thẳng.
2. Node có **1 con** → nâng con đó lên thay.
3. Node có **2 con** → thay bằng **in-order successor** (node nhỏ nhất ở subtree phải), rồi xóa successor đó (chỉ có 0 hoặc 1 con).

\`\`\`
function delete(node, key):
    if node == null: return null
    if key < node.value:  node.left  = delete(node.left, key)
    else if key > node.value: node.right = delete(node.right, key)
    else:
        if node.left == null:  return node.right
        if node.right == null: return node.left
        succ = minNode(node.right)
        node.value = succ.value
        node.right = delete(node.right, succ.value)
    return node

function minNode(node):
    while node.left != null: node = node.left
    return node
\`\`\`

## 5. Độ phức tạp

| Thao tác | Trung bình | Xấu nhất |
| --- | --- | --- |
| Search | \`O(log n)\` | \`O(n)\` |
| Insert | \`O(log n)\` | \`O(n)\` |
| Delete | \`O(log n)\` | \`O(n)\` |

**Xấu nhất** xảy ra khi cây bị **suy biến thành dãy** (chèn dãy đã sắp xếp \`1, 2, 3, ...\` → cây thành linked list).

\`\`\`
1
 \\
  2
   \\
    3
     \\
      4
\`\`\`

→ Đây là động lực để học **cây cân bằng** ở [Lesson 09](../lesson-09-balanced-trees/).

## 6. So sánh BST với HashMap

| Tiêu chí | BST | Hash Table |
| --- | --- | --- |
| Tìm trung bình | \`O(log n)\` (nếu cân bằng) | \`O(1)\` |
| Duyệt theo thứ tự | \`O(n)\`, có thứ tự sẵn | Không thứ tự |
| Tìm khoảng (range query) | Hỗ trợ tốt | Không hỗ trợ |
| Tìm min/max | \`O(log n)\` | \`O(n)\` |

→ BST phù hợp khi cần **thứ tự** hoặc **truy vấn khoảng**.

## 7. Ứng dụng

- \`TreeMap\` / \`TreeSet\` trong Java (thực chất là Red-Black tree).
- \`std::map\` / \`std::set\` trong C++.
- Index trong cơ sở dữ liệu (thực tế dùng B-tree, biến thể của BST).
- Tìm phần tử gần nhất, predecessor/successor.

## Bài tập

1. Cho dãy \`5, 3, 8, 1, 4, 7, 9\` chèn lần lượt vào BST rỗng, vẽ cây kết quả.
2. Viết hàm kiểm tra một cây nhị phân có phải là BST hợp lệ không (chú ý: không chỉ so với cha mà cần khoảng \`[min, max]\`).
3. Cho BST, tìm phần tử nhỏ nhất lớn hơn \`k\` (in-order successor của \`k\`).
4. Viết hàm chuyển BST thành mảng đã sắp xếp. Tính Big-O.
5. Vì sao chèn dãy \`1, 2, 3, 4, 5\` vào BST cho cây tệ nhất? Cách khắc phục?

## Lời giải chi tiết

### Bài 1 — Chèn \`5, 3, 8, 1, 4, 7, 9\` vào BST rỗng
\`\`\`
Sau 5:        5
Sau 3:        5
            /
           3
Sau 8:        5
            /   \\
           3     8
Sau 1:        5
            /   \\
           3     8
          /
         1
Sau 4:        5
            /   \\
           3     8
          / \\
         1   4
Sau 7:        5
            /   \\
           3     8
          / \\   /
         1   4 7
Sau 9:        5
            /   \\
           3     8
          / \\   / \\
         1   4 7   9
\`\`\`

### Bài 2 — Validate BST
Lưu ý: **không chỉ so node với cha**, mà cần khoảng \`[min, max]\` truyền xuống — node trái của subtree phải vẫn phải lớn hơn ông nó.

\`\`\`go
func isValidBST(root *Node) bool {
    var ok func(n *Node, lo, hi *int) bool
    ok = func(n *Node, lo, hi *int) bool {
        if n == nil { return true }
        if (lo != nil && n.val <= *lo) || (hi != nil && n.val >= *hi) { return false }
        return ok(n.left, lo, &n.val) && ok(n.right, &n.val, hi)
    }
    return ok(root, nil, nil)
}
\`\`\`
\`O(n)\`.

### Bài 3 — In-order successor của \`k\`
Successor: phần tử **nhỏ nhất lớn hơn \`k\`** trong BST.

\`\`\`go
func successor(root *Node, k int) *Node {
    var s *Node
    for n := root; n != nil; {
        if n.val > k { s = n; n = n.left }   // node này là ứng viên, thử nhỏ hơn
        else { n = n.right }
    }
    return s
}
\`\`\`
\`O(h)\`.

### Bài 4 — BST → mảng đã sắp xếp
Duyệt **in-order** → cho ra dãy đã sắp.
\`\`\`go
func toSorted(n *Node, out *[]int) {
    if n == nil { return }
    toSorted(n.left, out)
    *out = append(*out, n.val)
    toSorted(n.right, out)
}
\`\`\`
\`O(n)\`.

### Bài 5 — Vì sao dãy \`1, 2, 3, 4, 5\` tạo cây tệ?
Mỗi lần chèn, phần tử mới đều **lớn hơn mọi node đã có** → đi sang phải mãi → cây trở thành dãy thẳng (chiều cao \`n-1\`). Mọi thao tác trở thành \`O(n)\`.

**Khắc phục**:
1. **Trộn ngẫu nhiên** dữ liệu trước khi chèn (nếu được).
2. Dùng **cây cân bằng** (AVL, Red-Black) tự sửa lại sau mỗi insert/delete — [Lesson 09](../lesson-09-balanced-trees/).
3. Dùng cấu trúc khác như **Treap** với priority ngẫu nhiên.

## Code & Minh họa

- [solutions.go](./solutions.go) — toàn bộ lời giải.
- [visualization.html](./visualization.html) — chèn / tìm trên BST, highlight đường đi.

## Bài tiếp theo

[Lesson 08 — Heap & Priority Queue](../lesson-08-heap-priority-queue/)
`;
