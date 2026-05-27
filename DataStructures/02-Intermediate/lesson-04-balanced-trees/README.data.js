// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: DataStructures/02-Intermediate/lesson-04-balanced-trees/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 04 — Balanced Trees (AVL, Red-Black)

## 1. Vì sao cần cây cân bằng?

BST có thể suy biến thành dãy → \`O(n)\`. Cây cân bằng đảm bảo chiều cao luôn \`O(log n)\`, do đó **mọi thao tác \`O(log n)\` thực sự**.

Có nhiều biến thể: **AVL**, **Red-Black**, **Splay**, **Treap**, **B-tree**... Bài này tập trung vào AVL và Red-Black.

## 2. AVL Tree

Phát minh bởi Adelson-Velsky & Landis (1962).

### 2.1. Tính chất

Với mỗi node, **chênh lệch chiều cao giữa subtree trái và phải không quá 1**.

\`\`\`
balance(node) = height(left) - height(right)
balance ∈ {-1, 0, 1}
\`\`\`

Nếu sau insert/delete, \`|balance| > 1\` → mất cân bằng → cần **rotation** để sửa.

### 2.2. Bốn phép rotation

Có bốn case khi mất cân bằng tại node \`z\`:

- **LL (Left-Left)**: cây lệch về trái-trái → **rotate right** ở \`z\`.
- **RR (Right-Right)**: lệch phải-phải → **rotate left**.
- **LR (Left-Right)**: lệch trái-phải → rotate left ở con trái, rồi rotate right ở \`z\`.
- **RL (Right-Left)**: lệch phải-trái → rotate right ở con phải, rồi rotate left ở \`z\`.

Ví dụ **rotate right**:
\`\`\`
       z                  y
      / \\                / \\
     y   T4   --->      x   z
    / \\                / \\ / \\
   x   T3            T1 T2 T3 T4
  / \\
 T1 T2
\`\`\`

### 2.3. Độ phức tạp

| Thao tác | Big-O |
| --- | --- |
| Search | \`O(log n)\` |
| Insert | \`O(log n)\` (gồm tối đa 2 rotation) |
| Delete | \`O(log n)\` (gồm tối đa \`O(log n)\` rotation) |

AVL **cân bằng nghiêm ngặt hơn** Red-Black → search nhanh hơn một chút, nhưng insert/delete tốn nhiều rotation hơn.

Đây là phần đầy đủ nhất của lesson — đọc xong bạn phải vẽ được rotation bằng tay, hiểu vì sao mỗi bước.

### 2.4. 💡 Trực giác — Vì sao phải rotate?

Hình dung **bập bênh (seesaw)**: BST cân bằng = bập bênh thăng bằng. Sau khi insert một giá trị vào subtree trái, bên trái nặng thêm → bập bênh nghiêng trái. Nếu lệch quá 1 đơn vị (\`balance > 1\`) → ta phải **chuyển một "chân" (subtree) sang bên kia** để cân lại. "Chuyển chân" chính là rotation.

Mục tiêu rotation:

1. **Bảo toàn thứ tự BST** (in-order không đổi).
2. **Giảm chiều cao** ở chỗ mất cân bằng.

Vì rotation chỉ động đến 2-3 node, nó là \`O(1)\` — đây là lý do AVL/RB tree giữ được \`O(log n)\` cho insert/delete.

### 2.5. Rotate right — phân rã 5 bước

Cho cây mất cân bằng LL tại \`z\`:

\`\`\`
         z
        / \\
       y   T4         balance(z) =  height(y) - height(T4) =  2  (trái nặng)
      / \\             balance(y) =  height(x) - height(T3) =  1
     x   T3
    / \\
   T1  T2
\`\`\`

**Bước 1**: Lưu lại con phải của \`y\` → gọi là \`T3\` (chính là subtree mà \`y\` đang giữ phía phải).

**Bước 2**: Đặt \`z\` làm con phải của \`y\` → \`y.right = z\`.

**Bước 3**: Đặt \`T3\` làm con trái của \`z\` → \`z.left = T3\` (vì \`T3\` từng nằm giữa \`y\` và \`z\` trong thứ tự in-order, vẫn phải giữ nguyên vị trí đó).

**Bước 4**: \`y\` trở thành root mới của subtree này. Nếu \`z\` từng có cha \`p\` (\`p.left == z\` chẳng hạn), update \`p.left = y\`.

**Bước 5**: **Update height** — trước tiên cho \`z\` (vì \`z\` giờ ở dưới), rồi cho \`y\` (ở trên). **Thứ tự rất quan trọng**: nếu update \`y\` trước thì height của \`z\` còn cũ → sai.

\`\`\`
         y
        / \\
       x   z          balance(y) =  height(x) - height(z) = 0  hoặc 1
      / \\  / \\        balance(z) =  height(T3) - height(T4) = 0
     T1 T2 T3 T4
\`\`\`

**Bảo toàn in-order**: trước rotate \`T1 < x < T2 < y < T3 < z < T4\`; sau rotate vẫn \`T1 < x < T2 < y < T3 < z < T4\`. ✓

### 2.6. Bốn case với ví dụ số cụ thể

#### Case LL — Rotate Right tại \`z\`

**Trigger**: \`balance(z) > 1\` AND \`balance(z.left) ≥ 0\`.

Ví dụ: insert lần lượt \`30, 20, 10\`.

\`\`\`
Bước insert 30:        Bước insert 20:        Bước insert 10:
   30                     30                     30          (z, balance = 2)
                         /                      /
                        20                     20            (y, balance = 1)
                                              /
                                             10              (x)
\`\`\`

Sau khi insert \`10\`, balance(30) = \`height(20-subtree) - height(NIL) = 1 - (-1) = 2\` → mất cân bằng kiểu LL → **rotate right tại 30**:

\`\`\`
Sau rotate right:
        20             (y mới là root)
       /  \\
      10   30
balance(20) = 0, balance(10) = 0, balance(30) = 0. ✓
\`\`\`

#### Case RR — Rotate Left tại \`z\`

**Trigger**: \`balance(z) < -1\` AND \`balance(z.right) ≤ 0\`.

Đối xứng LL. Ví dụ: insert \`10, 20, 30\`.

\`\`\`
10            10              10  (z, balance = -2)
               \\               \\
                20              20  (y)
                                 \\
                                  30  (x)
\`\`\`

\`balance(10) = -2\`, \`balance(20) = -1\` → RR → **rotate left tại 10**:

\`\`\`
       20
      /  \\
     10   30        ✓ cân bằng
\`\`\`

#### Case LR — Rotate Left tại con, rồi Rotate Right tại \`z\`

**Trigger**: \`balance(z) > 1\` AND \`balance(z.left) < 0\`.

Ví dụ: insert \`30, 10, 20\`.

\`\`\`
30           30                30  (z, balance = 2)
            /                 /
           10                10    (y, balance = -1)  ← LR vì y lệch phải
                              \\
                               20  (x)
\`\`\`

Một lần rotate right ở \`30\` KHÔNG đủ — vì sau khi xoay, \`20\` sẽ thành con phải của \`10\`, mà \`10\` thì lại không có giá trị < \`10\` ở bên trái → cây vẫn lệch. **Phải xoay 2 lần**:

**Bước 1** — Rotate left tại \`10\` (con trái của \`z\`): biến LR thành LL.

\`\`\`
30                  30
 \\   ← Sai chiều!  /
 10  ← phải là    20      (giờ giống LL: z=30, y=20, x=10)
  \\              /
   20           10
\`\`\`

**Bước 2** — Rotate right tại \`30\`:

\`\`\`
      20
     /  \\
    10   30        ✓
\`\`\`

#### Case RL — Rotate Right tại con, rồi Rotate Left tại \`z\`

**Trigger**: \`balance(z) < -1\` AND \`balance(z.right) > 0\`.

Đối xứng LR. Ví dụ: insert \`10, 30, 20\`.

\`\`\`
10           10                10  (z, balance = -2)
              \\                 \\
               30                30  (y, balance = 1)
                                /
                               20  (x)
\`\`\`

**Bước 1** — Rotate right tại \`30\`:

\`\`\`
10
 \\
  20
   \\
    30
\`\`\`

**Bước 2** — Rotate left tại \`10\`:

\`\`\`
       20
      /  \\
     10   30        ✓
\`\`\`

### 2.7. Làm sao biết quay chiều nào? — Bảng quyết định

| \`balance(z)\` | \`balance(z.child)\` | Case | Hành động |
|--------------|--------------------|------|-----------|
| \`> 1\` (lệch trái) | \`≥ 0\` (cháu cũng lệch trái) | **LL** | Rotate right tại \`z\` |
| \`> 1\` (lệch trái) | \`< 0\` (cháu lệch phải) | **LR** | Rotate left tại \`z.left\`, rồi rotate right tại \`z\` |
| \`< -1\` (lệch phải) | \`≤ 0\` (cháu cũng lệch phải) | **RR** | Rotate left tại \`z\` |
| \`< -1\` (lệch phải) | \`> 0\` (cháu lệch trái) | **RL** | Rotate right tại \`z.right\`, rồi rotate left tại \`z\` |

**Mẹo nhớ**: tên case = đường đi từ \`z\` xuống cháu (con của con) trong vùng "nặng" — vd LR = trái-rồi-phải = phải xoay 2 lần để "uốn" về dạng LL.

### 2.8. Walk-through trọn vẹn — Insert 7 giá trị vào AVL trống

Insert lần lượt \`10, 20, 30, 40, 50, 25, 5\`. Vẽ cây sau mỗi bước, kèm balance factor (BF) trong dấu ngoặc.

**Insert 10**:
\`\`\`
10(0)
\`\`\`

**Insert 20**:
\`\`\`
10(-1)
   \\
    20(0)
\`\`\`

**Insert 30** — BF(10) = -2, BF(20) = -1 → **RR** → rotate left tại 10:
\`\`\`
   20(0)
   /  \\
 10(0) 30(0)
\`\`\`

**Insert 40**:
\`\`\`
   20(-1)
   /  \\
 10(0) 30(-1)
          \\
           40(0)
\`\`\`

**Insert 50** — sau insert: BF(30) = -2 → kiểm tra path: con phải của 30 là 40, BF(40) = -1 → **RR tại 30** → rotate left tại 30:
\`\`\`
   20(-1)
   /  \\
 10(0) 40(0)
       / \\
     30(0) 50(0)
\`\`\`
Cập nhật lại BF(20): height(left)=0, height(right)=1 → BF(20) = -1. ✓

**Insert 25** — đi xuống 20 → 40 → 30 → đặt 25 làm con trái của 30:
\`\`\`
   20(-1)
   /  \\
 10(0) 40(1)
       / \\
     30(1) 50(0)
     /
    25(0)
\`\`\`
BF(20): height(left)=0, height(right)=2 → BF(20) = -2. Path từ 20 đi xuống vùng nặng: 40 (BF=1) → khác dấu → **RL** → rotate right tại 40, rồi rotate left tại 20.

Bước RL.1 — rotate right tại 40 (\`y=40\`, \`x=30\`):
\`\`\`
   20
   /  \\
 10   30(-1)
        \\
         40(-1)
           \\
            50
         (25 là con trái của 30)
\`\`\`
Chi tiết hơn:
\`\`\`
   20(-2)
   /  \\
 10(0) 30(-2)
        / \\
       25(0) 40(-1)
                \\
                 50(0)
\`\`\`

Bước RL.2 — rotate left tại 20 (\`z=20\`, \`y=30\`, \`T3 = 25\`):
\`\`\`
       30(0)
      /     \\
    20(0)   40(-1)
    / \\        \\
  10(0) 25(0)  50(0)
\`\`\`

**Insert 5** — đi xuống 30 → 20 → 10 → đặt 5 làm con trái của 10:
\`\`\`
       30(1)
      /     \\
    20(1)   40(-1)
    / \\        \\
  10(1) 25(0)  50(0)
   /
  5(0)
\`\`\`
BF tất cả node đều trong \`[-1, 1]\` → không rotation cần thiết. ✓

### 2.9. ❓ Câu hỏi tự nhiên

- **"Sau rotation phải update height ở đâu?"** — Chỉ ở 2 node tham gia: \`z\` và \`y\` (con cũ). Các subtree T1..T4 không thay đổi chiều cao. **Thứ tự**: update \`z\` trước (vì giờ ở dưới), rồi \`y\` (ở trên), vì height của cha phụ thuộc height của con.
- **"Insert có thể cần nhiều rotation cùng lúc không?"** — Không, AVL insert tối đa 1 lần xử lý mất cân bằng (1 rotation đơn cho LL/RR, hoặc 1 double rotation cho LR/RL). Sau đó toàn bộ cây cân bằng lại.
- **"Còn delete?"** — Delete có thể cần \`O(log n)\` rotation (lan từ chỗ xóa lên tới root) vì việc giảm chiều cao một bên có thể đẩy mất cân bằng lan ngược.
- **"Vì sao LR/RL cần 2 rotation chứ không 1?"** — Nếu chỉ rotate right tại \`z\` cho case LR, cây mới sẽ có \`y\` ở root nhưng vẫn lệch trái-phải dạng zigzag → vẫn không cân bằng. Bước rotate trung gian "duỗi thẳng" zigzag thành LL trước.
- **"\`balance(z.left) = 0\` thì sao — LL hay LR?"** — Cả hai đều đúng, nhưng AVL chuẩn dùng LL (rotate right đơn) vì nhanh hơn. Trường hợp này chỉ xảy ra khi delete, không xảy ra khi insert vào cây cân bằng.

### 2.10. ⚠ Lỗi thường gặp khi cài rotation

| Lỗi | Hậu quả |
|------|---------|
| Quên update height sau rotate | BF tính sai → cây "có vẻ cân bằng" nhưng thực ra lệch → bug khó debug |
| Update height của \`y\` trước \`z\` | Height(y) dùng height(z) cũ → sai số tích lũy |
| Quên gán \`T3\` cho \`z.left\` (khi rotate right) | Mất subtree → cây thiếu node, có thể crash khi search |
| Trả về sai root mới từ hàm rotate | Cha của \`z\` vẫn trỏ tới \`z\` → cây không thay đổi |
| Áp dụng LL khi cháu lệch ngược | Cây vẫn mất cân bằng sau rotation, cần check kỹ \`balance(z.child)\` |
| Xử lý parent pointer (nếu có) sai | Cây bị "rách", duyệt theo parent sai chiều |

### 2.11. 🔁 Tự kiểm tra

1. Cho cây AVL chỉ chứa \`50, 30, 70, 20, 40, 10\`. Sau khi insert \`5\`, có rotation nào xảy ra không? Tại node nào?
   <details><summary>Đáp án</summary>Sau insert 5: 5 là con trái của 10. BF(10)=1, BF(20)=2 → mất cân bằng tại 20. Con trái của 20 là 10 (BF=1) → cùng dấu → LL → rotate right tại 20. Kết quả: 10 lên thay vị trí 20, con trái = 5, con phải = 20.</details>
2. Vì sao một rotation không làm thay đổi thứ tự in-order của cây?
   <details><summary>Đáp án</summary>Vì rotation chỉ thay đổi cha-con giữa \`z\`, \`y\`, và subtree trung gian \`T3\` — nhưng vị trí của \`T3\` relative tới \`y\` và \`z\` trong thứ tự in-order (\`y < T3 < z\`) được bảo toàn: trước rotate \`T3\` là con phải của \`y\`, sau rotate \`T3\` là con trái của \`z\` — cùng nằm giữa hai node đó trong in-order.</details>
3. Một AVL có 7 node, hãy đoán chiều cao tối đa và tối thiểu có thể.
   <details><summary>Đáp án</summary>Tối thiểu: cây hoàn chỉnh chiều cao 2 (tầng 0,1,2 đủ 1+2+4=7 node). Tối đa: cây Fibonacci AVL chiều cao 3 (số node Fibonacci-AVL với h=3 là 7 = F(5)-1). Vậy h ∈ {2, 3}.</details>

### 2.12. 📝 Tóm tắt mục 2 (phần walk-through)

- **4 case rotation**: LL/RR đơn (1 rotate), LR/RL đôi (2 rotate).
- **Quyết định case**: dấu của \`balance(z)\` (lệch trái/phải) kết hợp \`balance(z.child)\` (cháu cùng hay khác chiều).
- **In-order bất biến** sau rotation → vẫn là BST.
- **Update height theo thứ tự dưới-lên** (\`z\` trước \`y\`).
- **Insert tối đa 1 lần xử lý** mất cân bằng; **delete tối đa \`O(log n)\` rotation**.
- AVL phù hợp **read-heavy**; Red-Black phù hợp **write-heavy** vì ít rotation hơn.

## 3. Red-Black Tree

Phát minh ngầm bởi Bayer (1972), tên hiện đại do Guibas & Sedgewick (1978).

### 3.1. Tính chất

Mỗi node có **màu đỏ** hoặc **đen**, thỏa năm tính chất:

1. Mỗi node có màu đỏ hoặc đen.
2. **Root là đen**.
3. Mỗi leaf null là đen.
4. Node đỏ **không có con đỏ** (không có hai đỏ liên tiếp).
5. Mọi đường từ một node tới bất kỳ leaf null nào có cùng **số node đen**.

Hệ quả: chiều cao ≤ \`2 log(n+1)\`. Không cân bằng "chặt" như AVL nhưng vẫn \`O(log n)\`.

### 3.2. Khi mất tính chất

Sau insert/delete, có thể vi phạm — cần kết hợp **rotation** và **đổi màu (recoloring)** để khôi phục. Logic phức tạp hơn AVL.

### 3.3. Vì sao phổ biến hơn AVL?

- **Ít rotation hơn AVL** trong insert/delete trung bình.
- Phù hợp với workload có nhiều thao tác ghi.
- Được dùng trong:
  - \`TreeMap\`, \`TreeSet\` (Java).
  - \`std::map\`, \`std::set\` (C++).
  - Linux kernel: scheduler (CFS), epoll.

## 4. So sánh AVL và Red-Black

| Tiêu chí | AVL | Red-Black |
| --- | --- | --- |
| Cân bằng | Nghiêm ngặt (\`balance ≤ 1\`) | Lỏng hơn (chiều cao ≤ \`2 log n\`) |
| Search | Nhanh hơn chút | Nhanh |
| Insert/Delete | Nhiều rotation hơn | Ít rotation hơn |
| Dùng cho | Workload đọc nhiều | Workload đọc/ghi cân bằng |
| Cài đặt | Tương đối đơn giản | Phức tạp hơn |

## 5. Các biến thể khác (giới thiệu)

- **Splay tree**: tự "kéo" phần tử mới truy cập về gần root. Tốt cho truy cập có cục bộ (locality).
- **Treap**: kết hợp BST + heap với priority ngẫu nhiên.
- **B-tree, B+ tree**: cây cân bằng nhiều con, dùng cho cơ sở dữ liệu, hệ thống file.
- **Skip list**: không phải cây, nhưng cho \`O(log n)\` xác suất; dễ cài đặt hơn balanced tree.

## 6. Khi nào nên dùng?

- Cần **tìm kiếm + thứ tự + range query** → balanced tree.
- Không cần thứ tự, chỉ cần \`O(1)\` trung bình → **hash table**.
- Dữ liệu rất lớn, lưu đĩa → **B-tree / B+ tree**.

## Bài tập

1. Vẽ AVL tree khi chèn lần lượt: \`10, 20, 30, 40, 50, 25\`. Chỉ ra rotation nào được dùng.
2. Cho một AVL tree, viết hàm tính \`balance(node)\`. Tính Big-O.
3. Liệt kê 5 tính chất của Red-Black tree và giải thích vì sao chúng đảm bảo \`O(log n)\`.
4. Vì sao Java chọn Red-Black cho \`TreeMap\` mà không phải AVL?
5. So sánh khi nào nên dùng HashMap, TreeMap, và LinkedHashMap.

## Lời giải chi tiết

### Bài 1 — AVL chèn \`10, 20, 30, 40, 50, 25\`

- \`10\` → root.
- \`20\` → con phải của 10.
- \`30\` → vào con phải của 20. Balance ở 10 thành -2 (lệch phải-phải) → **RR rotation** (xoay trái ở 10). Cây: 20 là root, 10 trái, 30 phải.
- \`40\` → con phải của 30.
- \`50\` → vào con phải của 40. Balance ở 30 thành -2 → RR rotation ở 30. Cây: 20-(10, 40), 40-(30, 50).
- \`25\` → con trái của 30. Lúc này thử lại balance: 20 vẫn ok, không cần rotation.

### Bài 2 — Hàm \`balance\`
\`\`\`go
func height(n *Node) int { if n == nil { return -1 }; return n.h }
func balance(n *Node) int { return height(n.left) - height(n.right) }
\`\`\`
\`O(1)\` vì mỗi node đã lưu sẵn \`h\`. Nếu không lưu thì tính \`O(n)\` mỗi lần.

### Bài 3 — 5 tính chất Red-Black và lý do \`O(log n)\`
1. Mỗi node đỏ hoặc đen.
2. Root đen.
3. Mọi leaf null là đen.
4. Node đỏ không có con đỏ.
5. Mọi đường từ một node tới các leaf null có cùng số node đen ("black height").

→ Đường dài nhất ≤ 2 × đường ngắn nhất (vì đường dài chỉ thêm node đỏ giữa các đen, mà không có 2 đỏ liên tiếp).
→ Chiều cao ≤ \`2 log₂(n+1)\` ⇒ \`O(log n)\`.

### Bài 4 — Vì sao Java chọn Red-Black cho TreeMap?
- Insert/delete cần ít rotation hơn AVL → tốc độ ghi tốt hơn (Java workload trộn đọc/ghi).
- Hằng số ẩn nhỏ hơn AVL trong nhiều benchmark.
- Cài đặt phổ biến, tài liệu nhiều.

### Bài 5 — HashMap vs TreeMap vs LinkedHashMap
| Yêu cầu | Chọn |
| --- | --- |
| Tra cứu nhanh nhất, không cần thứ tự | HashMap (\`O(1)\`) |
| Cần duyệt theo thứ tự key tăng dần / range query | TreeMap (\`O(log n)\`, dựa trên Red-Black) |
| Cần duyệt theo **thứ tự chèn** (insertion order) | LinkedHashMap (\`O(1)\` như HashMap + LinkedList) |
| LRU cache | LinkedHashMap với access-order |

## Code & Minh họa

- [solutions.go](./solutions.go) — cài AVL tree với insert + rotation, in cây dạng level-order.
- [visualization.html](./visualization.html) — AVL tree với hiển thị balance factor và rotation khi mất cân bằng.

## Bài tiếp theo

[Lesson 05 — Trie](../lesson-05-trie/)
`;
