// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: DataStructures/02-Intermediate/lesson-04-balanced-trees/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 04 — Balanced Trees (AVL, Red-Black)

## Mục tiêu học tập

- Hiểu **vì sao** BST thường không đủ và cây cân bằng giải quyết điều gì.
- Nắm tính chất **AVL** (balance factor) và **bốn phép rotation** (LL, RR, LR, RL).
- Hiểu 5 tính chất **Red-Black tree** và vì sao nó được dùng phổ biến hơn AVL.
- Biết **ứng dụng thực tế**: index cơ sở dữ liệu, scheduler, thư viện chuẩn.

## Kiến thức tiền đề

- [Lesson 02 — Binary Search Tree](../lesson-02-binary-search-tree/) (tính chất BST, insert/delete, vì sao cây lệch tệ).
- [Lesson 01 — Tree](../lesson-01-tree/) (chiều cao, duyệt cây, cách lưu pointer-based).

## 1. Vì sao cần cây cân bằng?

### 1.1. 💡 Trực giác — "cây bonsai được cắt tỉa"

[BST thường](../lesson-02-binary-search-tree/#5-độ-phức-tạp) có một điểm yếu chí mạng: hình dạng của nó **phụ thuộc thứ tự insert**. Chèn dãy đã sắp \`1, 2, 3, 4, 5\` → cây biến thành **một dây thẳng** dài như linked list, mọi thao tác tụt về $O(n)$.

Hình dung **cây bonsai**: để dáng đẹp và thấp, người chơi **cắt tỉa, uốn nắn liên tục** sau mỗi lần cây mọc thêm. Cây cân bằng làm đúng vậy: sau **mỗi** insert/delete, nó **tự kiểm tra** xem có nhánh nào "mọc lệch" quá không, và nếu có thì **uốn lại** (bằng *rotation*) để giữ chiều cao luôn ở mức thấp nhất $O(\\log n)$.

Một analogy thứ hai cho rotation: **bập bênh (seesaw)**. Cây cân bằng = bập bênh thăng bằng; insert làm một bên nặng thêm; nếu lệch quá ngưỡng thì phải "chuyển một chân sang bên kia" cho cân lại. "Chuyển chân" chính là rotation (chi tiết ở [§2.4](#24--trực-giác--vì-sao-phải-rotate)).

> Cốt lõi: cây cân bằng **trả một chi phí nhỏ $O(1)$–$O(\\log n)$ mỗi lần ghi** (để uốn lại) nhằm **bảo đảm mọi truy vấn về sau luôn $O(\\log n)$**, bất kể dữ liệu vào theo thứ tự xấu cỡ nào.

### 1.2. Định nghĩa & các biến thể

BST có thể suy biến thành dãy → $O(n)$. Cây cân bằng đảm bảo chiều cao luôn $O(\\log n)$, do đó **mọi thao tác $O(\\log n)$ thực sự**.

Có nhiều biến thể: **AVL**, **Red-Black**, **Splay**, **Treap**, **B-tree**... Bài này tập trung vào AVL và Red-Black.

## 2. AVL Tree

Phát minh bởi Adelson-Velsky & Landis (1962).

### 2.1. Tính chất

Với mỗi node, **chênh lệch chiều cao giữa subtree trái và phải không quá 1**.

\`\`\`
balance(node) = height(left) - height(right)
balance ∈ {-1, 0, 1}
\`\`\`

Nếu sau insert/delete, $|balance| > 1$ → mất cân bằng → cần **rotation** để sửa.

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
| Search | $O(\\log n)$ |
| Insert | $O(\\log n)$ (gồm tối đa 2 rotation) |
| Delete | $O(\\log n)$ (gồm tối đa $O(\\log n)$ rotation) |

AVL **cân bằng nghiêm ngặt hơn** Red-Black → search nhanh hơn một chút, nhưng insert/delete tốn nhiều rotation hơn.

Đây là phần đầy đủ nhất của lesson — đọc xong bạn phải vẽ được rotation bằng tay, hiểu vì sao mỗi bước.

### 2.4. 💡 Trực giác — Vì sao phải rotate?

Hình dung **bập bênh (seesaw)**: BST cân bằng = bập bênh thăng bằng. Sau khi insert một giá trị vào subtree trái, bên trái nặng thêm → bập bênh nghiêng trái. Nếu lệch quá 1 đơn vị ($balance > 1$) → ta phải **chuyển một "chân" (subtree) sang bên kia** để cân lại. "Chuyển chân" chính là rotation.

Mục tiêu rotation:

1. **Bảo toàn thứ tự BST** (in-order không đổi).
2. **Giảm chiều cao** ở chỗ mất cân bằng.

Vì rotation chỉ động đến 2-3 node, nó là $O(1)$ — đây là lý do AVL/RB tree giữ được $O(\\log n)$ cho insert/delete.

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

**Bảo toàn in-order**: trước rotate $T_1 < x < T_2 < y < T_3 < z < T_4$; sau rotate vẫn $T_1 < x < T_2 < y < T_3 < z < T_4$. ✓

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
| $> 1$ (lệch trái) | $\\geq 0$ (cháu cũng lệch trái) | **LL** | Rotate right tại \`z\` |
| $> 1$ (lệch trái) | $< 0$ (cháu lệch phải) | **LR** | Rotate left tại \`z.left\`, rồi rotate right tại \`z\` |
| $< -1$ (lệch phải) | $\\leq 0$ (cháu cũng lệch phải) | **RR** | Rotate left tại \`z\` |
| $< -1$ (lệch phải) | $> 0$ (cháu lệch trái) | **RL** | Rotate right tại \`z.right\`, rồi rotate left tại \`z\` |

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
BF tất cả node đều trong $[-1, 1]$ → không rotation cần thiết. ✓

### 2.9. ❓ Câu hỏi tự nhiên

- **"Sau rotation phải update height ở đâu?"** — Chỉ ở 2 node tham gia: \`z\` và \`y\` (con cũ). Các subtree T1..T4 không thay đổi chiều cao. **Thứ tự**: update \`z\` trước (vì giờ ở dưới), rồi \`y\` (ở trên), vì height của cha phụ thuộc height của con.
- **"Insert có thể cần nhiều rotation cùng lúc không?"** — Không, AVL insert tối đa 1 lần xử lý mất cân bằng (1 rotation đơn cho LL/RR, hoặc 1 double rotation cho LR/RL). Sau đó toàn bộ cây cân bằng lại.
- **"Còn delete?"** — Delete có thể cần $O(\\log n)$ rotation (lan từ chỗ xóa lên tới root) vì việc giảm chiều cao một bên có thể đẩy mất cân bằng lan ngược.
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
- **Insert tối đa 1 lần xử lý** mất cân bằng; **delete tối đa $O(\\log n)$ rotation**.
- AVL phù hợp **read-heavy**; Red-Black phù hợp **write-heavy** vì ít rotation hơn.

### 2.13. Node lưu gì thêm so với BST thường?

Cây cân bằng vẫn lưu **pointer-based** y như [BST](../lesson-02-binary-search-tree/#6-cách-lưu-bst-trong-bộ-nhớ) và [cây thường](../lesson-01-tree/#8-tổ-chức-bộ-nhớ-cách-1--pointer-based) — rotation chỉ **đổi lại các con trỏ**, không đổi cách biểu diễn. Khác biệt duy nhất: mỗi node mang thêm **một mẩu metadata để biết mình có đang lệch không**.

| Loại | Node lưu thêm | Kích thước thêm | Ghi chú |
|------|---------------|----------------:|---------|
| BST thường | (không) | 0 | \`value + left + right\` ≈ 24 byte (64-bit) |
| **AVL** | \`height\` (hoặc \`balance factor\`) | 1–8 byte | Để tính \`balance = h(trái) − h(phải)\` trong $O(1)$ |
| **Red-Black** | \`color\` (1 bit: đỏ/đen) | thực tế 1 byte (do alignment) | Rẻ hơn AVL về metadata |

**Vì sao AVL lưu \`height\` mà không tính lại mỗi lần?** Tính chiều cao bằng đệ quy tốn $O(n)$; lưu sẵn và cập nhật khi rotate → \`balance(node)\` còn $O(1)$ (xem [Bài 2](#bài-2--hàm-balance)). Đây là đánh đổi quen thuộc: **tốn vài byte/node để mua tốc độ**.

**Vì sao Red-Black chỉ cần 1 bit?** Nó không đo chiều cao chính xác như AVL, chỉ cần phân biệt đỏ/đen để duy trì 5 tính chất ([§3.1](#31-tính-chất)) — nhẹ hơn, nên cập nhật sau ghi rẻ hơn. Đó là một lý do Red-Black được chọn cho workload nhiều ghi.

## 3. Red-Black Tree

Phát minh ngầm bởi Bayer (1972), tên hiện đại do Guibas & Sedgewick (1978).

### 3.1. Tính chất

Mỗi node có **màu đỏ** hoặc **đen**, thỏa năm tính chất:

1. Mỗi node có màu đỏ hoặc đen.
2. **Root là đen**.
3. Mỗi leaf null là đen.
4. Node đỏ **không có con đỏ** (không có hai đỏ liên tiếp).
5. Mọi đường từ một node tới bất kỳ leaf null nào có cùng **số node đen**.

Hệ quả: chiều cao $\\leq 2 \\log(n+1)$. Không cân bằng "chặt" như AVL nhưng vẫn $O(\\log n)$.

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
| Cân bằng | Nghiêm ngặt ($balance \\leq 1$) | Lỏng hơn (chiều cao $\\leq 2 \\log n$) |
| Search | Nhanh hơn chút | Nhanh |
| Insert/Delete | Nhiều rotation hơn | Ít rotation hơn |
| Dùng cho | Workload đọc nhiều | Workload đọc/ghi cân bằng |
| Cài đặt | Tương đối đơn giản | Phức tạp hơn |

## 5. Các biến thể khác (giới thiệu)

- **Splay tree**: tự "kéo" phần tử mới truy cập về gần root. Tốt cho truy cập có cục bộ (locality).
- **Treap**: kết hợp BST + heap với priority ngẫu nhiên.
- **B-tree, B+ tree**: cây cân bằng nhiều con, dùng cho cơ sở dữ liệu, hệ thống file.
- **Skip list**: không phải cây, nhưng cho $O(\\log n)$ xác suất; dễ cài đặt hơn balanced tree.

## 6. Khi nào nên dùng?

- Cần **tìm kiếm + thứ tự + range query** → balanced tree.
- Không cần thứ tự, chỉ cần $O(1)$ trung bình → **hash table**.
- Dữ liệu rất lớn, lưu đĩa → **B-tree / B+ tree**.

## 7. Ứng dụng thực tế

> 💡 **Vì sao cây cân bằng ở khắp nơi nhưng bạn ít khi tự viết nó?** Vì nó là **động cơ ẩn** bên dưới những thứ bạn dùng hằng ngày: mỗi câu lệnh SQL có \`ORDER BY\`, mỗi \`std::map\`, mỗi tiến trình Linux đang chạy — đều dựa trên một cây cân bằng. Nó đảm bảo $O(\\log n)$ **bất kể** dữ liệu vào theo thứ tự nào — đúng điều BST thường không hứa được.

### 7.1. Index cơ sở dữ liệu — B-tree / B+ tree

Đây là ứng dụng quan trọng nhất. Khi bảng có hàng triệu dòng, \`WHERE age BETWEEN 20 AND 30 ORDER BY age\` mà **không có index** sẽ phải quét cả bảng $O(n)$. Index là **cây cân bằng** giúp: nhảy thẳng tới \`20\` ($O(\\log n)$), rồi **duyệt tuần tự có thứ tự** tới \`30\`.

**❓ Vì sao DB dùng B-tree chứ không AVL/Red-Black nhị phân?** Vì dữ liệu nằm trên **đĩa/SSD**, mà mỗi lần đọc đĩa lấy nguyên một **block** (vd 4–16 KB) rất chậm so với RAM. Cây nhị phân cao $\\log_2 n$ → với 1 tỉ dòng là ~30 tầng = ~30 lần đọc đĩa. **B-tree gom nhiều khóa vào một node** (một node = một block, chứa hàng trăm khóa) → mỗi node phân ra **hàng trăm nhánh**, nên chiều cao chỉ $\\log_{100} n$ ≈ **3–4 tầng** = 3–4 lần đọc đĩa cho 1 tỉ dòng. Cùng nguyên lý "trái nhỏ phải lớn + tự cân bằng", chỉ là **nhiều con/node** để hợp với đĩa. Dùng trong: MySQL (InnoDB), PostgreSQL, SQLite, hầu hết hệ quản trị CSDL.

### 7.2. Nhân Linux — Red-Black tree

- **CFS (Completely Fair Scheduler)**: bộ lập lịch tiến trình của Linux lưu các tiến trình *theo thời gian chạy tích lũy (vruntime)* trong một **Red-Black tree**. Tiến trình "đói CPU nhất" = node trái nhất → lấy ra $O(\\log n)$ để cho chạy tiếp. Cần ghi liên tục (mỗi lần chuyển ngữ cảnh) → Red-Black hợp vì **ít rotation** hơn AVL.
- **epoll**, quản lý vùng nhớ ảo (\`vm_area_struct\`), bộ định thời (timer) trong kernel cũng dùng Red-Black tree.

### 7.3. Thư viện chuẩn các ngôn ngữ

| Ngôn ngữ | Cấu trúc | Bên dưới |
|----------|----------|----------|
| Java | \`TreeMap\`, \`TreeSet\` | Red-Black tree |
| C++ | \`std::map\`, \`std::set\`, \`std::multimap\` | Red-Black tree |
| .NET (C#) | \`SortedDictionary\`, \`SortedSet\` | Red-Black tree |

Tất cả cho phép **floor/ceiling, range, duyệt theo thứ tự khóa** trong $O(\\log n)$ — ví dụ \`TreeMap.floorKey(15)\` trả khóa lớn nhất ≤ 15. Cần map *không* thứ tự, nhanh nhất → \`HashMap\`/\`unordered_map\` ($O(1)$).

### 7.4. 📝 Tóm tắt mục 7

- **Index DB** = cây cân bằng; thực tế là **B-tree/B+ tree** (nhiều con/node) để giảm số lần đọc đĩa xuống 3–4 tầng.
- **Linux CFS scheduler, epoll** dùng **Red-Black** vì workload nhiều ghi → cần ít rotation.
- \`TreeMap\`/\`std::map\`/\`SortedSet\` đều là Red-Black tree — cho thứ tự + range + floor/ceiling $O(\\log n)$.
- Quy luật chọn: cần **thứ tự/range** → cây cân bằng; chỉ cần tra **một khóa thật nhanh** → hash table.

### 7.5. 🔁 Tự kiểm tra

1. Một index B-tree mỗi node chứa ~256 khóa. Với 1 tỉ ($10^9$) dòng, cây cao khoảng mấy tầng? So với cây nhị phân cân bằng thì sao?
   <details><summary>Đáp án</summary>B-tree: $\\log_{256}(10^9) = \\frac{\\ln 10^9}{\\ln 256} \\approx \\frac{20{,}7}{5{,}5} \\approx 3{,}7$ → **~4 tầng** (4 lần đọc đĩa). Cây nhị phân: $\\log_2(10^9) \\approx 30$ tầng → 30 lần đọc đĩa. B-tree nhanh hơn ~8 lần về số lần truy cập đĩa.</details>
2. Vì sao Linux CFS chọn Red-Black thay vì AVL, dù AVL search nhanh hơn chút?
   <details><summary>Đáp án</summary>Scheduler **ghi liên tục** (mỗi lần tiến trình chạy xong một lát, vruntime đổi → phải xóa+chèn lại). Red-Black ít rotation hơn AVL khi insert/delete → chi phí ghi thấp hơn. Lợi thế search nhỏ của AVL không bù được chi phí ghi cao trong workload này.</details>

## 8. Thực hành: dùng trong code thật

> 💡 **§7 nói cây cân bằng "ẩn dưới những thứ bạn dùng". Mục này là code bạn thật sự gõ — và sự thật quan trọng nhất: bạn KHÔNG tự viết AVL/Red-Black.** Tự cài rotation cho production gần như luôn là sai lầm (dễ bug, đã có bản tối ưu hàng chục năm). Thay vào đó bạn **gọi** một cây cân bằng có sẵn: \`TreeMap\` (Java), \`std::map\` (C++), \`google/btree\` (Go), hoặc **Redis Sorted Set** (skiplist). Dưới đây là code thật cho từng cái.

### 8.1. Quy tắc thực tế: chọn cái có sẵn, đừng cài lại

| Bạn cần | Dùng | Bên dưới là |
|---------|------|-------------|
| Ordered map trong 1 process (Java/C++/.NET) | \`TreeMap\` / \`std::map\` / \`SortedDictionary\` | Red-Black tree |
| Ordered map trong Go | \`github.com/google/btree\` | B-tree |
| Leaderboard / ranking **chia sẻ nhiều process** | **Redis Sorted Set** (\`ZADD\`...) | Skip list + hash |
| Index trên bảng hàng triệu dòng | \`CREATE INDEX\` (DB tự lo) | B+ tree |

Khi nào **mới** tự cài? Gần như chỉ khi học (như lesson này) hoặc viết thư viện cấu trúc dữ liệu. Code ứng dụng → luôn dùng bản có sẵn.

### 8.2. Mini-project A — Leaderboard bằng Redis Sorted Set

Bài toán kinh điển: bảng xếp hạng game/điểm thưởng, cần **rank của tôi**, **top-N**, **những người quanh tôi** — tất cả phải nhanh và **nhiều server cùng đọc/ghi**. Redis Sorted Set (ZSet) là cây cân bằng (skip list) "as a service":

\`\`\`bash
# Thêm/cập nhật điểm — O(log n), tự sắp xếp theo score
ZADD leaderboard 1500 "an"
ZADD leaderboard 1800 "binh"
ZADD leaderboard 1500 "cuong"

# Top 3 điểm CAO nhất (REV = giảm dần), kèm điểm — O(log n + k)
ZREVRANGE leaderboard 0 2 WITHSCORES
# 1) "binh" 2) "1800" 3) "an" 4) "1500" 5) "cuong" 6) "1500"

# Hạng của "an" (0-based, từ cao xuống) — O(log n)
ZREVRANK leaderboard "an"        # → 1

# Những người điểm trong [1500, 1700] — range query (§7), O(log n + k)
ZRANGEBYSCORE leaderboard 1500 1700
\`\`\`

Gọi từ Go bằng \`go-redis\` (minh hoạ — cần \`github.com/redis/go-redis/v9\`):

\`\`\`go
rdb.ZAdd(ctx, "leaderboard", redis.Z{Score: 1500, Member: "an"})
rank, _ := rdb.ZRevRank(ctx, "leaderboard", "an").Result() // hạng O(log n)
top, _ := rdb.ZRevRangeWithScores(ctx, "leaderboard", 0, 9).Result() // top-10
\`\`\`

> ❓ **"Sao không \`ORDER BY score\` trong SQL mỗi lần?"** Với leaderboard cập nhật liên tục + đọc dồn dập, \`ORDER BY\` quét/ sort lại tốn kém và đụng DB. ZSet giữ **luôn ở trạng thái đã sắp** (cây cân bằng) → \`ZREVRANK\`/\`ZREVRANGE\` là $O(\\log n)$, lại nằm in-memory chia sẻ giữa các server. Đây là lý do gần như mọi leaderboard thật dùng Redis ZSet.

> ⚠ **Bẫy — Redis ZSet dùng skip list, KHÔNG phải Red-Black.** Kết quả $O(\\log n)$ giống nhau, nhưng skip list dễ cài đồng thời (concurrent) và đỡ rotation. "Cây cân bằng" ở đây là **khái niệm** (giữ $O(\\log n)$ bất kể thứ tự vào) — hiện thực cụ thể có thể là RB tree, B-tree, hoặc skip list tùy hệ thống.

### 8.3. Mini-project B — Index DB: đọc \`EXPLAIN\` để thấy cây làm việc

§7.1 nói index là B+ tree. Đây là cách **thấy** nó trong thực tế. Cùng một query, khác nhau trời vực khi có index:

\`\`\`sql
-- Bảng 10 triệu dòng, CHƯA có index trên age
EXPLAIN SELECT * FROM users WHERE age BETWEEN 20 AND 30 ORDER BY age;
--   type: ALL          ← quét TOÀN bảng (full scan) = O(n)
--   rows: 10000000     ← đọc cả 10 triệu dòng

CREATE INDEX idx_age ON users(age);   -- dựng B+ tree trên cột age

EXPLAIN SELECT * FROM users WHERE age BETWEEN 20 AND 30 ORDER BY age;
--   type: range        ← đi xuống cây tới age=20 rồi duyệt tuần tự (range query §7)
--   rows: 12000        ← chỉ đọc các dòng khớp
--   Extra: Using index ← kết quả đã sắp sẵn theo cây, KHỎI sort
\`\`\`

Ba lợi ích đúng như BST/B-tree cho: (1) nhảy thẳng tới \`age=20\` qua $O(\\log n)$ tầng, (2) **duyệt tuần tự** có thứ tự tới 30, (3) khỏi \`ORDER BY\` vì cây vốn đã sắp. \`type: ALL\` = chưa tận dụng cây; \`type: range\` = đang đi cây.

### 8.4. Mini-project C — Ordered map cân bằng trong Go (\`google/btree\`)

Go không có \`TreeMap\`. Khi cần ordered map **insert/delete liên tục** trong 1 process (không cần Redis), dùng B-tree cân bằng — đã giới thiệu ở [L02 §9.3](../lesson-02-binary-search-tree/), nhắc lại ở đây vì đây chính là "cây cân bằng" thực dụng nhất của Go:

\`\`\`go
import "github.com/google/btree"

tr := btree.New(32) // degree 32 → mỗi node tới 64 khóa, ít tầng, cache-friendly
tr.ReplaceOrInsert(btree.Int(1500))
tr.ReplaceOrInsert(btree.Int(1800))
// luôn O(log n), KHÔNG suy biến dù chèn dữ liệu đã sort (khác BST thường — §1)
tr.AscendGreaterOrEqual(btree.Int(1500), func(it btree.Item) bool {
	fmt.Println(it); return true // range query có thứ tự
})
\`\`\`

\`btree.New(32)\` không suy biến — đó là toàn bộ lý do cây cân bằng tồn tại (§1): đảm bảo $O(\\log n)$ **bất kể** thứ tự chèn.

### 8.5. Chọn loại nào? Bảng quyết định thực tế

| Workload | Chọn | Vì sao (liên hệ §4, §6, §7) |
|----------|------|------------------------------|
| Search nhiều, ghi ít, in-memory | **AVL** | Cân bằng chặt hơn → cây thấp hơn → search nhanh |
| Ghi/xóa liên tục, in-memory | **Red-Black** | Ít rotation hơn AVL → ghi rẻ (Linux CFS, \`TreeMap\`) |
| Dữ liệu trên đĩa/SSD (DB) | **B+ tree** | Nhiều khóa/node → ít lần đọc đĩa (§7.1) |
| Ranking chia sẻ nhiều process | **Redis ZSet (skip list)** | $O(\\log n)$ + concurrent + in-memory service |
| Chỉ tra 1 khóa, không cần thứ tự | **Hash table** | $O(1)$, không cần cân bằng gì cả |

> 🔁 **Tự kiểm tra**
> 1. Vì sao leaderboard thật dùng Redis ZSet thay vì \`SELECT ... ORDER BY score\`?
>    <details><summary>Đáp án</summary>ZSet giữ dữ liệu <b>luôn ở trạng thái đã sắp</b> (cây cân bằng/skip list) → \`ZREVRANK\`/top-N là $O(\\log n)$, in-memory, chia sẻ nhiều server. \`ORDER BY\` phải sort lại mỗi lần + đụng DB → chậm khi cập nhật dồn dập.</details>
> 2. Trong \`EXPLAIN\`, \`type: ALL\` và \`type: range\` khác nhau thế nào?
>    <details><summary>Đáp án</summary>\`ALL\` = full table scan $O(n)$, chưa có/không dùng index. \`range\` = đi xuống B+ tree index tới biên dưới rồi duyệt tuần tự khoảng khớp — đúng range query của cây, chỉ đọc dòng cần.</details>
> 3. Khi nào nên **tự cài** AVL/Red-Black trong code production?
>    <details><summary>Đáp án</summary>Gần như không bao giờ. Dùng \`TreeMap\`/\`std::map\`/\`google/btree\`/Redis ZSet có sẵn — đã tối ưu + test kỹ. Tự cài chỉ khi học hoặc viết thư viện cấu trúc dữ liệu nền tảng.</details>

### 8.6. 📝 Tóm tắt mục 8

- **Không tự cài** AVL/RB cho production → gọi bản có sẵn: \`TreeMap\`/\`std::map\`/\`google/btree\`/Redis ZSet.
- **Leaderboard** = Redis Sorted Set: \`ZADD\`/\`ZREVRANK\`/\`ZREVRANGE\`/\`ZRANGEBYSCORE\`, $O(\\log n)$, chia sẻ nhiều process.
- **Index DB** = B+ tree; đọc \`EXPLAIN\`: \`type: range\` + \`Using index\` = đang đi cây, \`type: ALL\` = full scan.
- **Go** không có ordered map stdlib → \`google/btree\` (không suy biến, $O(\\log n)$ luôn).
- Chọn loại: AVL (đọc nhiều), RB (ghi nhiều), B+ tree (trên đĩa), skip list/ZSet (chia sẻ), hash (chỉ tra khóa).

## Bài tập

1. Vẽ AVL tree khi chèn lần lượt: \`10, 20, 30, 40, 50, 25\`. Chỉ ra rotation nào được dùng.
2. Cho một AVL tree, viết hàm tính \`balance(node)\`. Tính Big-O.
3. Liệt kê 5 tính chất của Red-Black tree và giải thích vì sao chúng đảm bảo $O(\\log n)$.
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
$O(1)$ vì mỗi node đã lưu sẵn \`h\`. Nếu không lưu thì tính $O(n)$ mỗi lần.

### Bài 3 — 5 tính chất Red-Black và lý do \`O(log n)\`
1. Mỗi node đỏ hoặc đen.
2. Root đen.
3. Mọi leaf null là đen.
4. Node đỏ không có con đỏ.
5. Mọi đường từ một node tới các leaf null có cùng số node đen ("black height").

→ Đường dài nhất ≤ 2 × đường ngắn nhất (vì đường dài chỉ thêm node đỏ giữa các đen, mà không có 2 đỏ liên tiếp).
→ Chiều cao $\\leq 2 \\log_2(n+1) \\Rightarrow O(\\log n)$.

### Bài 4 — Vì sao Java chọn Red-Black cho TreeMap?
- Insert/delete cần ít rotation hơn AVL → tốc độ ghi tốt hơn (Java workload trộn đọc/ghi).
- Hằng số ẩn nhỏ hơn AVL trong nhiều benchmark.
- Cài đặt phổ biến, tài liệu nhiều.

### Bài 5 — HashMap vs TreeMap vs LinkedHashMap
| Yêu cầu | Chọn |
| --- | --- |
| Tra cứu nhanh nhất, không cần thứ tự | HashMap ($O(1)$) |
| Cần duyệt theo thứ tự key tăng dần / range query | TreeMap ($O(\\log n)$, dựa trên Red-Black) |
| Cần duyệt theo **thứ tự chèn** (insertion order) | LinkedHashMap ($O(1)$ như HashMap + LinkedList) |
| LRU cache | LinkedHashMap với access-order |

## Code & Minh họa

- [solutions.go](./solutions.go) — cài AVL tree với insert + rotation, in cây dạng level-order.
- [visualization.html](./visualization.html) — AVL tree với hiển thị balance factor và rotation khi mất cân bằng.

## Bài tiếp theo

[Lesson 05 — Trie](../lesson-05-trie/)
`;
