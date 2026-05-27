# Lesson 02 — Binary Search Tree (BST)

## Mục tiêu học tập

- Hiểu **tính chất BST** và lý do nó cho tìm kiếm nhanh.
- Cài đặt được `search`, `insert`, `delete`.
- Hiểu tại sao BST **không cân bằng** có thể tệ như linked list.

## Kiến thức tiền đề

- [Lesson 01 — Tree](../lesson-01-tree/).

## 1. Tính chất BST

Một **Binary Search Tree** là cây nhị phân thỏa: với mọi node `x`,

- Mọi node trong **subtree trái** có giá trị **nhỏ hơn** `x.value`.
- Mọi node trong **subtree phải** có giá trị **lớn hơn** `x.value`.

Hệ quả: **duyệt inorder cho ra dãy đã sắp xếp**.

```
       8
      / \
     3   10
    / \    \
   1   6    14
      / \   /
     4   7 13
```

Inorder: `1 3 4 6 7 8 10 13 14` — đã sắp xếp.

### 1.1. 💡 Trực giác — tìm từ trong từ điển giấy

Hình dung từ điển 1.000 trang. Tìm từ `"orange"`:
- Bạn KHÔNG mở trang 1 rồi lật từng trang.
- Bạn mở **giữa** (trang 500), thấy `"melon"`. `"orange" > "melon"` (chữ o sau m) → chỉ tìm **nửa sau**.
- Mở giữa nửa sau (trang 750), thấy `"sun"`. `"orange" < "sun"` → tìm trong `[500, 750]`.
- Cứ thế: mỗi bước **vứt một nửa**.

BST chính là từ điển này được "đông cứng" thành cây: root = trang 500, child trái = trang 250, child phải = trang 750, ... Tính chất "trái nhỏ, phải lớn" cho phép tại MỌI node biết ngay phải đi đâu — vứt nửa kia.

Cây có `n` node, cân bằng → chiều cao `log₂ n`. `n = 10^6` → chỉ ~20 bước so sánh. Cùng cơ chế binary search trên mảng sắp xếp, nhưng cho phép **insert/delete động** (mảng sắp xếp insert tốn `O(n)` dồn).

### 1.2. Walk-through inorder bằng số cụ thể

Áp dụng inorder traversal lên cây mẫu ở trên (root=8):

```
inorder(node):
    if node == null: return
    inorder(node.left)
    visit(node.value)
    inorder(node.right)
```

Vết gọi cho subtree trái của 8 (root=3):
| Bước | Hành động | Output tích lũy |
|------|-----------|-----------------|
| 1 | `inorder(3)` → vào trái | — |
| 2 | `inorder(1)` → vào trái | — |
| 3 | `inorder(null)` | — |
| 4 | visit(1) | `1` |
| 5 | `inorder(null)` (phải của 1) | `1` |
| 6 | visit(3) | `1, 3` |
| 7 | `inorder(6)` → vào trái | `1, 3` |
| 8 | visit(4), back, visit(6), visit(7) | `1, 3, 4, 6, 7` |
| 9 | visit(8) | `1, 3, 4, 6, 7, 8` |

Tiếp tục subtree phải → ra `10, 13, 14`. Kết quả cuối: `1 3 4 6 7 8 10 13 14` — chính xác dãy đã sắp.

**Vì sao inorder cho dãy sắp xếp?** Định nghĩa BST đã đảm bảo: với mọi node `x`, mọi giá trị trái < `x` < mọi giá trị phải. Inorder = "trái trước, x, phải sau" = nhỏ trước, x giữa, lớn sau → toàn dãy sắp xếp. Bằng quy nạp trên chiều cao cây.

### 1.3. ❓ Câu hỏi tự nhiên

- **"BST có cho phép giá trị trùng (duplicate) không?"** — Tuỳ quy ước. Hai cách phổ biến: (1) cấm duplicate; (2) đẩy duplicate sang phải (hoặc trái) nhất quán. Lưu ý: nếu cho phép cả hai phía, định nghĩa BST bị phá (`x` trùng có thể ở cả nhánh trái và phải) → mất tính chất "inorder = sorted". Mục 3 chọn cách "bỏ qua duplicate" qua nhánh `else if`.
- **"Tính chất 'trái nhỏ, phải lớn' chỉ so với BỐ TRỰC TIẾP hay với MỌI tổ tiên?"** — Với MỌI tổ tiên. Đây là sai lầm hay gặp lúc validate (xem Bài tập 2). Vd: ở subtree phải của root=8, node 7 vẫn phải > 8 → sai BST! Nhưng ở cây mẫu, node 7 là con trái của 6, mà 6 < 8 nên cả nhánh đó cũng < 8 — đúng. So sánh phải truyền `[lo, hi]` xuống, không chỉ so cha.
- **"Sao không dùng `sort([])` rồi binary search luôn?"** — Mảng sắp xếp tốt cho **read-only**. Khi cần insert/delete động, mảng tốn `O(n)` dịch. BST insert/delete `O(log n)` nếu cân bằng — đó là ưu thế.

## 2. Tìm kiếm — `search(root, key)`

So sánh với root: nhỏ hơn → đi trái, lớn hơn → đi phải, bằng → tìm thấy.

```
function search(node, key):
    if node == null: return null
    if key == node.value: return node
    if key < node.value:  return search(node.left, key)
    else:                  return search(node.right, key)
```

- Cây cân bằng: `O(log n)`.
- Cây xấu (lệch): `O(n)`.

## 3. Thêm — `insert(root, key)`

Đi xuống như khi tìm; tới chỗ `null` thì gắn node mới vào đó.

```
function insert(node, key):
    if node == null: return Node(key)
    if key < node.value:  node.left  = insert(node.left, key)
    else if key > node.value: node.right = insert(node.right, key)
    return node
```

### 3.1. Walk-through insert 5 giá trị vào BST rỗng

Insert lần lượt `5, 2, 8, 1, 3` vào cây rỗng:

| Bước | Hành động | Cây sau |
|------|-----------|---------|
| 1 | insert(5) — gốc rỗng → tạo root | `5` |
| 2 | insert(2) — 2<5, sang trái; rỗng → gắn | `5 ← 2` |
| 3 | insert(8) — 8>5, sang phải; rỗng → gắn | `2 ← 5 → 8` |
| 4 | insert(1) — 1<5 (trái), 1<2 (trái); rỗng → gắn | trái-trái của 5 = 1 |
| 5 | insert(3) — 3<5 (trái), 3>2 (phải); rỗng → gắn | trái-phải của 5 = 3 |

Cây cuối:

```
       5
      / \
     2   8
    / \
   1   3
```

Inorder: 1, 2, 3, 5, 8 — sắp xếp đúng. ✓

**Quan sát quan trọng**: nếu insert theo thứ tự `1, 2, 3, 5, 8` (đã sắp), cây thành dãy thẳng (xem mục 5). Cùng tập giá trị, **thứ tự insert quyết định hình dạng cây** → quyết định performance.

### 3.2. ⚠ Lỗi thường gặp khi insert

| Lỗi | Hậu quả | Cách sửa |
|-----|---------|----------|
| Quên `return node` ở cuối — chỉ return ở base case | Mất con trỏ link → cây bị cắt khi quay đệ quy | Đảm bảo MỌI nhánh `return node` |
| So sánh `<=` thay vì `<` mà không có quy ước nhất quán cho duplicate | Duplicate nhảy hai phía → cây loạn → inorder sai | Quyết định: bỏ qua, hoặc luôn về một phía cố định |
| Insert bằng cách thao tác con trỏ bố thay vì assign result của đệ quy (`node.left = insert(...)`) | Code dài, dễ bug khi tạo root đầu tiên | Pattern functional: `root = insert(root, key)` |
| Insert vào cây trả về `void`, không dùng giá trị trả | Khi cây rỗng (root=null) ban đầu, không cách gì gán root mới | Luôn `node = insert(node, key)` ở caller |

## 4. Xóa — `delete(root, key)`

Khó hơn. Ba trường hợp:

1. Node là **leaf** → xóa thẳng.
2. Node có **1 con** → nâng con đó lên thay.
3. Node có **2 con** → thay bằng **in-order successor** (node nhỏ nhất ở subtree phải), rồi xóa successor đó (chỉ có 0 hoặc 1 con).

```
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
```

### 4.1. 💡 Trực giác — vì sao phải dùng in-order successor

Khi xóa node có 2 con, bạn không thể "kéo cao" một con bất kỳ — vì cả hai con đều có subtree, gắn ai lên cũng đụng phía bên kia. Giải pháp: tìm **giá trị thay thế** mà khi đặt vào vị trí node bị xóa, BST vẫn hợp lệ.

Ứng viên: giá trị **vừa lớn hơn** node hiện tại (in-order successor) hoặc **vừa nhỏ hơn** (in-order predecessor). Cả hai đều giữ tính chất "trái nhỏ, phải lớn" ở mọi tổ tiên — vì giá trị thay thế nằm "kẹp" giữa subtree trái và phải.

Successor = min của subtree phải = đi sang phải 1 bước, rồi đi trái mãi. Node này có **tối đa 1 con phải** (không có con trái — nó là min). → Xoá nó dễ (trường hợp 0 hoặc 1 con).

### 4.2. Walk-through delete với 3 trường hợp

Cây ban đầu:

```
       5
      / \
     3   8
    / \   \
   1   4   9
```

**Case 1 — Xoá leaf `1`**: đi xuống 1 (5→3→1), `node.left=null` và `node.right=null` → return `null`. Cha (node 3) cập nhật `left=null`.

```
       5
      / \
     3   8
      \   \
       4   9
```

**Case 2 — Xoá node 1 con `8`** (chỉ có con phải `9`): tới 8, `node.left=null` → return `node.right` = 9. Cha (5) cập nhật `right=9`.

```
       5
      / \
     3   9
      \
       4
```

**Case 3 — Xoá node 2 con `5`** (root, có cả trái và phải): 
1. `succ = minNode(right) = minNode(9)`. 9 không có trái → succ = 9.
2. `node.value = 9` (gán giá trị, không gán node).
3. `node.right = delete(node.right, 9)` → xoá 9 (case 2, leaf-ish): return `null`.

```
       9
      /
     3
      \
       4
```

Vẫn là BST hợp lệ. Inorder: 3, 4, 9. ✓

### 4.3. ❓ Câu hỏi tự nhiên

- **"Dùng predecessor (max subtree trái) có khác gì?"** — Tương đương. Một số cài đặt luân phiên successor/predecessor để giảm xu hướng làm cây lệch sau nhiều lần xoá (heuristic; không cứu được trường hợp xấu nhất, cần cây cân bằng).
- **"Khi gán `node.value = succ.value`, có cần copy cả pointer trái/phải không?"** — Không. Chỉ copy **giá trị** (key + payload). Cấu trúc cây giữ nguyên, chỉ node cũ "đổi nhãn" thành succ. Sau đó gọi delete đệ quy để bỏ succ ở vị trí gốc của nó.
- **"Vì sao successor chắc chắn không có con trái?"** — Vì successor = min subtree phải. Nếu nó có con trái, con đó còn nhỏ hơn → mâu thuẫn với "min". → Khi xoá successor chỉ rơi vào case 0 hoặc 1 con, không bao giờ lại 2 con (đệ quy không vô tận).
- **"Có thể xoá bằng cách 'đánh dấu deleted' thay vì sửa cấu trúc?"** — Lazy delete. Đơn giản nhưng cây phình ra theo thời gian, query phải lọc node deleted. OK cho prototype, không OK cho hệ thống dài hạn — phải compact định kỳ.

### 4.4. ⚠ Lỗi thường gặp khi delete

| Lỗi | Hậu quả | Cách sửa |
|-----|---------|----------|
| Trường hợp 2 con: gán `node = succ` (cả pointer) thay vì copy value | Cha của node cũ giờ trỏ tới succ ở vị trí cũ của succ → cây gãy | Chỉ copy value, rồi gọi delete trên subtree phải |
| Quên xoá succ sau khi copy value | Giá trị xuất hiện 2 lần trong cây → inorder lặp | Phải `node.right = delete(node.right, succ.value)` |
| Khi node có 1 con, return con đó nhưng quên gắn con vào cha | Mất cả subtree | Trả về và caller gán: `node.left = delete(node.left, key)` |
| Xoá node không tồn tại nhưng tự đi xuống `null` mà không return | Crash / behaviour không xác định | Base case `if node == null: return null` đầu hàm |
| So sánh `key == node.value` bằng `==` cho key float | Sai do floating point | Dùng key kiểu nguyên hoặc so sánh với epsilon |

## 5. Độ phức tạp

| Thao tác | Trung bình | Xấu nhất |
| --- | --- | --- |
| Search | `O(log n)` | `O(n)` |
| Insert | `O(log n)` | `O(n)` |
| Delete | `O(log n)` | `O(n)` |

**Xấu nhất** xảy ra khi cây bị **suy biến thành dãy** (chèn dãy đã sắp xếp `1, 2, 3, ...` → cây thành linked list).

```
1
 \
  2
   \
    3
     \
      4
```

→ Đây là động lực để học **cây cân bằng** ở [Lesson 04](../lesson-04-balanced-trees/).

### 5.1. Walk-through 4 trường hợp insert order → cây kết quả

Cùng tập `{1, 2, 3, 4, 5}`, 4 thứ tự khác nhau:

| Thứ tự | Chiều cao | Hình dạng |
|--------|-----------|-----------|
| `1, 2, 3, 4, 5` (đã sắp tăng) | 4 (như linked list) | Chuỗi phải |
| `5, 4, 3, 2, 1` (sắp giảm) | 4 | Chuỗi trái |
| `3, 1, 5, 2, 4` (root giữa) | 2 | Cân bằng đẹp |
| `3, 2, 5, 1, 4` | 2 | Cân bằng |

→ Cùng 5 phần tử, search có thể tốn 4 bước (`O(n)`) hoặc 2 bước (`O(log n)`) tuỳ thứ tự insert. Đây là **động lực thực tế** cho cây cân bằng: ép chiều cao về `log n` bất kể thứ tự insert.

### 5.2. ❓ Câu hỏi tự nhiên

- **"Trung bình `O(log n)` từ đâu ra nếu cây có thể tệ?"** — Phân tích: nếu các key được insert theo thứ tự **ngẫu nhiên đồng đều**, chiều cao trung bình kỳ vọng là `O(log n)` (~`2.99 log n`). Nhưng dữ liệu thực thường không ngẫu nhiên (vd log timestamp tăng dần) → cần cây tự cân bằng để đảm bảo bất kể input.
- **"Khi nào tôi BẮT BUỘC phải dùng balanced BST thay vì BST thường?"** — Khi không kiểm soát thứ tự insert và cần đảm bảo worst-case `O(log n)`: database index, scheduler theo deadline, interval tree, ... Khi chỉ cần lookup không cần thứ tự → HashMap đơn giản hơn và nhanh hơn (`O(1)`).
- **"Trộn ngẫu nhiên trước khi insert có giải quyết hẳn không?"** — Cho 1 lần build từ tập biết trước thì có. Nhưng dữ liệu đến online, không trộn được — vẫn cần cây cân bằng (AVL, RB-tree, Treap).

### 5.3. 🔁 Tự kiểm tra

1. Cho cây BST: root=10, trái=5 (con trái=2, con phải=7), phải=15. Inorder traversal cho ra dãy nào?
   <details><summary>Đáp án</summary>`2, 5, 7, 10, 15`. Áp dụng "trái-gốc-phải" đệ quy.</details>
2. Insert lần lượt `4, 2, 6, 1, 3, 5, 7` vào BST rỗng. Cây kết quả có chiều cao bao nhiêu?
   <details><summary>Đáp án</summary>Chiều cao **2** (root=4, level 1 có 2 và 6, level 2 có 1,3,5,7). Cây cân bằng hoàn hảo cho 7 node.</details>
3. Cho cây ở câu 1, xoá node 10. Cây mới có root là gì?
   <details><summary>Đáp án</summary>**15** (successor của 10 = min subtree phải = 15, vì 15 không có con). Cây mới: root=15, trái=5 (5 có con 2, 7).</details>
4. Vì sao cây sau khi chèn `1,2,3,...,n` theo thứ tự có chiều cao `n-1` mà không phải `log n`?
   <details><summary>Đáp án</summary>Mỗi key mới đều > mọi key đã có → luôn đi sang phải, không bao giờ rẽ trái. Cây thành chuỗi phải dài `n-1`. Đây là worst case của BST không cân bằng.</details>

### 5.4. 📝 Tóm tắt mục 1-5

- BST: cây nhị phân thỏa "trái < gốc < phải" áp dụng với mọi tổ tiên (không chỉ cha trực tiếp).
- **Inorder** cho dãy sắp xếp — đặc tính độc nhất của BST.
- Search/Insert/Delete: `O(log n)` trung bình khi cây cân bằng; `O(n)` xấu nhất khi cây bị lệch (insert theo thứ tự sắp xếp).
- Delete có 3 case: leaf (xoá trực tiếp), 1 con (nâng con lên), 2 con (thay bằng in-order successor rồi xoá successor).
- Cùng tập key, **thứ tự insert quyết định hình dạng cây** → quyết định performance.
- Khắc phục lệch: trộn ngẫu nhiên, hoặc dùng cây tự cân bằng (AVL, Red-Black) ở Lesson 09.

## 6. So sánh BST với HashMap

| Tiêu chí | BST | Hash Table |
| --- | --- | --- |
| Tìm trung bình | `O(log n)` (nếu cân bằng) | `O(1)` |
| Duyệt theo thứ tự | `O(n)`, có thứ tự sẵn | Không thứ tự |
| Tìm khoảng (range query) | Hỗ trợ tốt | Không hỗ trợ |
| Tìm min/max | `O(log n)` | `O(n)` |

→ BST phù hợp khi cần **thứ tự** hoặc **truy vấn khoảng**.

## 7. Ứng dụng

- `TreeMap` / `TreeSet` trong Java (thực chất là Red-Black tree).
- `std::map` / `std::set` trong C++.
- Index trong cơ sở dữ liệu (thực tế dùng B-tree, biến thể của BST).
- Tìm phần tử gần nhất, predecessor/successor.

## Bài tập

1. Cho dãy `5, 3, 8, 1, 4, 7, 9` chèn lần lượt vào BST rỗng, vẽ cây kết quả.
2. Viết hàm kiểm tra một cây nhị phân có phải là BST hợp lệ không (chú ý: không chỉ so với cha mà cần khoảng `[min, max]`).
3. Cho BST, tìm phần tử nhỏ nhất lớn hơn `k` (in-order successor của `k`).
4. Viết hàm chuyển BST thành mảng đã sắp xếp. Tính Big-O.
5. Vì sao chèn dãy `1, 2, 3, 4, 5` vào BST cho cây tệ nhất? Cách khắc phục?

## Lời giải chi tiết

### Bài 1 — Chèn `5, 3, 8, 1, 4, 7, 9` vào BST rỗng
```
Sau 5:        5
Sau 3:        5
            /
           3
Sau 8:        5
            /   \
           3     8
Sau 1:        5
            /   \
           3     8
          /
         1
Sau 4:        5
            /   \
           3     8
          / \
         1   4
Sau 7:        5
            /   \
           3     8
          / \   /
         1   4 7
Sau 9:        5
            /   \
           3     8
          / \   / \
         1   4 7   9
```

### Bài 2 — Validate BST
Lưu ý: **không chỉ so node với cha**, mà cần khoảng `[min, max]` truyền xuống — node trái của subtree phải vẫn phải lớn hơn ông nó.

```go
func isValidBST(root *Node) bool {
    var ok func(n *Node, lo, hi *int) bool
    ok = func(n *Node, lo, hi *int) bool {
        if n == nil { return true }
        if (lo != nil && n.val <= *lo) || (hi != nil && n.val >= *hi) { return false }
        return ok(n.left, lo, &n.val) && ok(n.right, &n.val, hi)
    }
    return ok(root, nil, nil)
}
```
`O(n)`.

### Bài 3 — In-order successor của `k`
Successor: phần tử **nhỏ nhất lớn hơn `k`** trong BST.

```go
func successor(root *Node, k int) *Node {
    var s *Node
    for n := root; n != nil; {
        if n.val > k { s = n; n = n.left }   // node này là ứng viên, thử nhỏ hơn
        else { n = n.right }
    }
    return s
}
```
`O(h)`.

### Bài 4 — BST → mảng đã sắp xếp
Duyệt **in-order** → cho ra dãy đã sắp.
```go
func toSorted(n *Node, out *[]int) {
    if n == nil { return }
    toSorted(n.left, out)
    *out = append(*out, n.val)
    toSorted(n.right, out)
}
```
`O(n)`.

### Bài 5 — Vì sao dãy `1, 2, 3, 4, 5` tạo cây tệ?
Mỗi lần chèn, phần tử mới đều **lớn hơn mọi node đã có** → đi sang phải mãi → cây trở thành dãy thẳng (chiều cao `n-1`). Mọi thao tác trở thành `O(n)`.

**Khắc phục**:
1. **Trộn ngẫu nhiên** dữ liệu trước khi chèn (nếu được).
2. Dùng **cây cân bằng** (AVL, Red-Black) tự sửa lại sau mỗi insert/delete — [Lesson 04](../lesson-04-balanced-trees/).
3. Dùng cấu trúc khác như **Treap** với priority ngẫu nhiên.

## Code & Minh họa

- [solutions.go](./solutions.go) — toàn bộ lời giải.
- [visualization.html](./visualization.html) — chèn / tìm trên BST, highlight đường đi.

## Bài tiếp theo

[Lesson 03 — Heap & Priority Queue](../lesson-03-heap-priority-queue/)
