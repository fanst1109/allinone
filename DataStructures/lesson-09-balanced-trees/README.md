# Lesson 09 — Balanced Trees (AVL, Red-Black)

## Mục tiêu học tập

- Hiểu vì sao cần cây cân bằng.
- Nắm ý tưởng **AVL tree** và bốn phép **rotation**.
- Nắm tổng quan **Red-Black tree** và lý do nó phổ biến trong thư viện chuẩn.
- Biết khi nào nên dùng loại nào.

## Kiến thức tiền đề

- [Lesson 07 — Binary Search Tree](../lesson-07-binary-search-tree/).

## 1. Vì sao cần cây cân bằng?

BST có thể suy biến thành dãy → `O(n)`. Cây cân bằng đảm bảo chiều cao luôn `O(log n)`, do đó **mọi thao tác `O(log n)` thực sự**.

Có nhiều biến thể: **AVL**, **Red-Black**, **Splay**, **Treap**, **B-tree**... Bài này tập trung vào AVL và Red-Black.

## 2. AVL Tree

Phát minh bởi Adelson-Velsky & Landis (1962).

### 2.1. Tính chất

Với mỗi node, **chênh lệch chiều cao giữa subtree trái và phải không quá 1**.

```
balance(node) = height(left) - height(right)
balance ∈ {-1, 0, 1}
```

Nếu sau insert/delete, `|balance| > 1` → mất cân bằng → cần **rotation** để sửa.

### 2.2. Bốn phép rotation

Có bốn case khi mất cân bằng tại node `z`:

- **LL (Left-Left)**: cây lệch về trái-trái → **rotate right** ở `z`.
- **RR (Right-Right)**: lệch phải-phải → **rotate left**.
- **LR (Left-Right)**: lệch trái-phải → rotate left ở con trái, rồi rotate right ở `z`.
- **RL (Right-Left)**: lệch phải-trái → rotate right ở con phải, rồi rotate left ở `z`.

Ví dụ **rotate right**:
```
       z                  y
      / \                / \
     y   T4   --->      x   z
    / \                / \ / \
   x   T3            T1 T2 T3 T4
  / \
 T1 T2
```

### 2.3. Độ phức tạp

| Thao tác | Big-O |
| --- | --- |
| Search | `O(log n)` |
| Insert | `O(log n)` (gồm tối đa 2 rotation) |
| Delete | `O(log n)` (gồm tối đa `O(log n)` rotation) |

AVL **cân bằng nghiêm ngặt hơn** Red-Black → search nhanh hơn một chút, nhưng insert/delete tốn nhiều rotation hơn.

## 3. Red-Black Tree

Phát minh ngầm bởi Bayer (1972), tên hiện đại do Guibas & Sedgewick (1978).

### 3.1. Tính chất

Mỗi node có **màu đỏ** hoặc **đen**, thỏa năm tính chất:

1. Mỗi node có màu đỏ hoặc đen.
2. **Root là đen**.
3. Mỗi leaf null là đen.
4. Node đỏ **không có con đỏ** (không có hai đỏ liên tiếp).
5. Mọi đường từ một node tới bất kỳ leaf null nào có cùng **số node đen**.

Hệ quả: chiều cao ≤ `2 log(n+1)`. Không cân bằng "chặt" như AVL nhưng vẫn `O(log n)`.

### 3.2. Khi mất tính chất

Sau insert/delete, có thể vi phạm — cần kết hợp **rotation** và **đổi màu (recoloring)** để khôi phục. Logic phức tạp hơn AVL.

### 3.3. Vì sao phổ biến hơn AVL?

- **Ít rotation hơn AVL** trong insert/delete trung bình.
- Phù hợp với workload có nhiều thao tác ghi.
- Được dùng trong:
  - `TreeMap`, `TreeSet` (Java).
  - `std::map`, `std::set` (C++).
  - Linux kernel: scheduler (CFS), epoll.

## 4. So sánh AVL và Red-Black

| Tiêu chí | AVL | Red-Black |
| --- | --- | --- |
| Cân bằng | Nghiêm ngặt (`balance ≤ 1`) | Lỏng hơn (chiều cao ≤ `2 log n`) |
| Search | Nhanh hơn chút | Nhanh |
| Insert/Delete | Nhiều rotation hơn | Ít rotation hơn |
| Dùng cho | Workload đọc nhiều | Workload đọc/ghi cân bằng |
| Cài đặt | Tương đối đơn giản | Phức tạp hơn |

## 5. Các biến thể khác (giới thiệu)

- **Splay tree**: tự "kéo" phần tử mới truy cập về gần root. Tốt cho truy cập có cục bộ (locality).
- **Treap**: kết hợp BST + heap với priority ngẫu nhiên.
- **B-tree, B+ tree**: cây cân bằng nhiều con, dùng cho cơ sở dữ liệu, hệ thống file.
- **Skip list**: không phải cây, nhưng cho `O(log n)` xác suất; dễ cài đặt hơn balanced tree.

## 6. Khi nào nên dùng?

- Cần **tìm kiếm + thứ tự + range query** → balanced tree.
- Không cần thứ tự, chỉ cần `O(1)` trung bình → **hash table**.
- Dữ liệu rất lớn, lưu đĩa → **B-tree / B+ tree**.

## Bài tập

1. Vẽ AVL tree khi chèn lần lượt: `10, 20, 30, 40, 50, 25`. Chỉ ra rotation nào được dùng.
2. Cho một AVL tree, viết hàm tính `balance(node)`. Tính Big-O.
3. Liệt kê 5 tính chất của Red-Black tree và giải thích vì sao chúng đảm bảo `O(log n)`.
4. Vì sao Java chọn Red-Black cho `TreeMap` mà không phải AVL?
5. So sánh khi nào nên dùng HashMap, TreeMap, và LinkedHashMap.

## Bài tiếp theo

[Lesson 10 — Trie](../lesson-10-trie/)
