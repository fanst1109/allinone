# Lesson 01 — Tree (Cây)

## Mục tiêu học tập

- Hiểu thuật ngữ cây: root, leaf, parent, child, depth, height.
- Phân biệt **binary tree** và các loại cây đặc biệt.
- Biết bốn cách duyệt cây nhị phân: **preorder**, **inorder**, **postorder**, **level-order**.

## Kiến thức tiền đề

- [Lesson 03 — Linked List](../../01-Basic/lesson-03-linked-list/) (hiểu con trỏ).
- [Lesson 04 — Stack](../../01-Basic/lesson-04-stack/) và [Lesson 05 — Queue](../../01-Basic/lesson-05-queue/) (dùng trong duyệt cây).

## 1. Cây là gì?

### 1.1. 💡 Trực giác — bạn đã quen với cây rồi

Trước khi có định nghĩa hình thức, hãy nhìn **3 thứ bạn gặp hằng ngày** — cả ba đều là *cây*:

- **Cây gia phả**: ông bà ở trên cùng, con cái tỏa xuống dưới, cháu chắt sâu hơn nữa. Mỗi người có **đúng một cha mẹ** trong sơ đồ (đi lên không bao giờ rẽ hai nhánh), nhưng có thể có **nhiều con**.
- **Sơ đồ tổ chức công ty**: CEO trên cùng → các Giám đốc → Trưởng phòng → nhân viên. Bạn báo cáo cho **một** sếp trực tiếp, sếp đó quản **nhiều** người.
- **Cây thư mục máy tính**: `C:\` chứa `Users\`, trong đó có `admin\`, bên trong lại có `Desktop\`, `Documents\`... Một thư mục nằm trong **đúng một** thư mục cha, nhưng chứa **nhiều** thư mục/file con.

Điểm chung của cả ba — và đó chính là **định nghĩa cây**:

1. Có **một điểm trên cùng** (ông tổ / CEO / ổ `C:\`) gọi là **gốc (root)**.
2. Đi từ trên xuống thì **tỏa nhánh** (một cha → nhiều con).
3. Đi từ một node **ngược lên gốc chỉ có đúng một đường** — không có chuyện "hai cha mẹ" hay đi vòng tròn quay lại chính mình.

Đặc điểm số 3 là thứ phân biệt cây với [đồ thị (graph)](../../03-Advanced/lesson-01-graph/) tổng quát: **cây là đồ thị không có chu trình và mỗi node (trừ gốc) có đúng một cha**.

> Vì sao máy tính thích cây? Vì nó cho ta **chia để trị**: muốn xử lý cả cây, chỉ cần xử lý gốc rồi *đệ quy* xuống từng cây con. Mọi thuật toán cây ở dưới đều dựa trên ý này.

### 1.2. Định nghĩa hình thức

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
| Duyệt toàn bộ | $O(n)$ |
| Tính chiều cao | $O(n)$ |
| Tìm trong cây tổng quát | $O(n)$ |

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
$O(n)$.

## 8. Tổ chức bộ nhớ: cách 1 — Pointer-based

Phần này trả lời câu hỏi: *"cụ thể trong RAM, bit và byte của một cây được xếp ra sao?"* Có 3 cách phổ biến — pointer-based (mục này), array-based (sẽ học ở [lesson 03 — Heap](../lesson-03-heap-priority-queue/), và xem trước ở [§8.9](#89-cách-2-xem-trước--lưu-cây-bằng-mảng)), và succinct/bit-level (ngoài phạm vi lesson cơ bản).

### 8.0. Trước khi nói byte: cây trong code chỉ là object trỏ vào nhau

> 🟢 **Đọc mục này trước.** Mục 8.1–8.8 phía dưới đi sâu tới từng byte/địa chỉ hex — rất hay nhưng *nặng*. Nếu bạn chỉ cần hiểu **"làm sao lưu một cây"** ở mức code thường ngày, mục 8.0 này là đủ.

Trong hầu hết ngôn ngữ, một node **chỉ là một object (struct) có 3 ô**:

```
Node {
    value          # dữ liệu, vd 1
    left           # "mũi tên" tới node con bên trái (hoặc rỗng)
    right          # "mũi tên" tới node con bên phải (hoặc rỗng)
}
```

`left` và `right` **không chứa node con bên trong nó** — chúng chỉ là **mũi tên (tham chiếu) chỉ tới một object Node khác** nằm đâu đó trong bộ nhớ. Ô nào không có con thì để **rỗng** (`null` / `nil`).

**Dựng cây ví dụ ở mục 4 bằng tay** — tạo 5 object rời, rồi nối mũi tên:

```
n1 = Node(1)      # tạo 5 object rời rạc, chưa nối gì
n2 = Node(2)
n3 = Node(3)
n4 = Node(4)
n5 = Node(5)

n1.left  = n2     # gắn mũi tên: 1 → trái → 2
n1.right = n3     # 1 → phải → 3
n2.left  = n4     # 2 → trái → 4
n2.right = n5     # 2 → phải → 5
# n3, n4, n5 không gán gì thêm → left/right của chúng vẫn rỗng (là leaf)
```

Sau 4 dòng "gắn mũi tên", các object rời đã thành một cây. Vẽ ra bằng **hộp + mũi tên**:

```
        ┌─────────────────┐
        │ value: 1        │
        │ left ●──┐ right ●──┐
        └─────────│─────────│──┘
            ┌─────┘         └─────┐
            ▼                     ▼
   ┌─────────────────┐   ┌─────────────────┐
   │ value: 2        │   │ value: 3        │
   │ left ●─┐ right ●─┐  │ left: ∅ right: ∅ │  ← leaf
   └────────│────────│┘  └─────────────────┘
       ┌────┘        └────┐
       ▼                  ▼
┌──────────────┐   ┌──────────────┐
│ value: 4     │   │ value: 5     │
│ left:∅ right:∅│   │ left:∅ right:∅│  ← cả hai là leaf
└──────────────┘   └──────────────┘
```

Toàn bộ "cây" thật ra chỉ là **5 hộp nằm rải rác + 4 mũi tên nối chúng**. Muốn đi từ node 1 xuống node 5: đi theo mũi tên `n1.left` (tới 2), rồi `n2.right` (tới 5). Mỗi lần "đi xuống một tầng" = **đi theo một mũi tên**.

Đó là tất cả những gì cần để *lưu* và *duyệt* một cây. Câu hỏi còn lại — "mũi tên đó trong RAM thực chất là cái gì?" — chính là **địa chỉ bộ nhớ (pointer)**, và mục 8.1–8.8 dưới đây mổ xẻ nó tới từng byte.

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
- **"Tại sao cây hay chậm hơn array dù cùng $O(n)$?"** — Mỗi pointer có thể nhảy tới địa chỉ xa → **cache miss**. Array cùng số phần tử nằm liên tiếp → CPU prefetch hiệu quả. Đây là động lực cho cách 2 (array-based) sẽ học ở lesson 8.

### 8.6. ⚠ Lỗi thường gặp

| Lỗi | Hậu quả |
|------|---------|
| Quên gán `NULL`/`nil` cho leaf | Đi sai địa chỉ rác → segfault / panic |
| Memory leak: xoá node mà không xoá con (C/C++) | Heap rò rỉ; ngôn ngữ có GC thì OK |
| Tự tham chiếu (`node.left = node`) khi build cây | Vòng lặp vô tận khi duyệt; cấu trúc đó là graph, không phải tree |
| Đếm `sizeof` mà quên padding | Sai dung lượng thực ~30-50% |

### 8.7. 🔁 Tự kiểm tra

1. Một cây có 1 triệu node, pointer-based trên máy 64-bit, dữ liệu là `int32`. Tốn bao nhiêu MB chỉ để LƯU?
   <details><summary>Đáp án</summary>$10^6 \times 24$ byte $= 24$ MB. Chỉ 4 MB là `value`, 20 MB là metadata.</details>
2. Vì sao đi từ root xuống node độ sâu $h$ thực sự có thể chậm hơn $O(h)$ ở mức "phép toán thuần"?
   <details><summary>Đáp án</summary>Mỗi node có thể nằm ở vùng RAM khác → cache miss. CPU đọc RAM ~100 ns vs cache L1 ~1 ns. Big-O bỏ qua hằng số này nhưng thực tế quan trọng.</details>

### 8.8. 📝 Tóm tắt mục 8

- Pointer-based: **node là struct rời rạc trong heap**, kết nối bằng địa chỉ.
- 1 node trên 64-bit = **24 byte** (4 value + 4 padding + 8 left + 8 right).
- Ưu: linh hoạt, dễ chỉnh cây động.
- Nhược: tốn bộ nhớ, cache-unfriendly, mỗi xuống tầng là một dereference.
- Khi cây gần đầy (complete) → ưu tiên array-based ([§8.9](#89-cách-2-xem-trước--lưu-cây-bằng-mảng) và [lesson 03 — Heap](../lesson-03-heap-priority-queue/)) để bớt overhead và tăng cache locality.

### 8.9. Cách 2 (xem trước): lưu cây bằng MẢNG — không cần mũi tên

Có một cách lưu cây **hoàn toàn không dùng pointer**: xếp các node vào một **mảng** và dùng **công thức trên chỉ số (index)** để tìm cha/con. Ý tưởng: đánh số node theo kiểu **duyệt level-order** (trái→phải, trên→dưới), bắt đầu từ 0.

Lấy lại cây ví dụ ở mục 4:

```
       1            idx 0
      / \
     2   3          idx 1, 2
    / \
   4   5            idx 3, 4
```

Đặt theo level-order vào mảng:

```
mảng:   [ 1 , 2 , 3 , 4 , 5 ]
chỉ số:   0   1   2   3   4
```

**Công thức (0-based)** — với node ở chỉ số $i$:

$$\text{con trái}(i) = 2i + 1, \qquad \text{con phải}(i) = 2i + 2, \qquad \text{cha}(i) = \left\lfloor \frac{i-1}{2} \right\rfloor$$

**Walk-through bằng số thật** — kiểm tra trên mảng trên:

- Node `1` ở $i = 0$: con trái ở $2\cdot 0 + 1 = 1$ → `mảng[1] = 2` ✓; con phải ở $2\cdot 0 + 2 = 2$ → `mảng[2] = 3` ✓.
- Node `2` ở $i = 1$: con trái ở $2\cdot 1 + 1 = 3$ → `mảng[3] = 4` ✓; con phải ở $2\cdot 1 + 2 = 4$ → `mảng[4] = 5` ✓.
- Node `5` ở $i = 4$: cha ở $\lfloor (4-1)/2 \rfloor = 1$ → `mảng[1] = 2` ✓ (đúng, 5 là con của 2).

Không cần một byte pointer nào — "mũi tên" được thay bằng **phép tính số học trên chỉ số**.

**⚠ Nhưng cách này chỉ hợp khi cây gần ĐẦY.** Nếu cây lệch (skewed), giữa mảng đầy lỗ rỗng. Ví dụ cây chỉ-rẽ-phải `1 → 3 → 7`:

```
1 ở idx 0 → con phải idx 2 → con phải idx 6 → ...
mảng:  [ 1 , _ , 3 , _ , _ , _ , 7 ]   ← 4 ô trống lãng phí cho 3 node thật
```

Cây càng cao thì lỗ rỗng càng phình theo $2^h$. Vì vậy **mảng dành cho cây đầy** (heap, segment tree); **pointer dành cho cây tùy hình dạng** (BST động, cây thư mục). Học kỹ array-based ở [Lesson 03 — Heap](../lesson-03-heap-priority-queue/) và lý do "vì sao BST không lưu bằng mảng" ở [Lesson 02 — BST](../lesson-02-binary-search-tree/).

## 9. Ứng dụng thực tế của cây

> 💡 **Cây ở đâu trong phần mềm thật?** Câu trả lời ngắn: *gần như khắp nơi*. Mỗi khi dữ liệu có quan hệ "cha–con / chứa–được chứa / chia nhỏ dần", cây xuất hiện. Dưới đây là 5 ứng dụng tiêu biểu, đi từ ví dụ tính được bằng tay tới hệ thống lớn.

### 9.1. Cây biểu thức (expression tree) — máy tính bỏ túi tính thế nào

Khi bạn gõ `(3 + 4) * 5`, trình biên dịch/máy tính **không** tính từ trái qua phải. Nó dựng một **cây biểu thức**: lá là **số**, node trong là **toán tử**, và **cấu trúc cây mã hóa luôn thứ tự ưu tiên**.

```
        *           ← gốc: phép nhân làm cuối
       / \
      +   5
     / \
    3   4
```

Để **tính giá trị**, ta duyệt **postorder** (trái → phải → node) — đúng cái đã học ở [§4](#41-duyệt-theo-chiều-sâu-dfs): muốn tính một toán tử, phải có giá trị **hai con trước**.

**Walk-through postorder tính `(3+4)*5`:**

| Bước | Thăm node | Việc làm | Stack giá trị |
|------|-----------|----------|---------------|
| 1 | `3` (lá) | đẩy số 3 | `[3]` |
| 2 | `4` (lá) | đẩy số 4 | `[3, 4]` |
| 3 | `+` | lấy 4 và 3 → `3 + 4 = 7`, đẩy lại | `[7]` |
| 4 | `5` (lá) | đẩy số 5 | `[7, 5]` |
| 5 | `*` (gốc) | lấy 5 và 7 → `7 * 5 = 35`, đẩy lại | `[35]` |

Kết quả `35` — và để ý: **postorder cho ra đúng thứ tự "tính con trước, tính cha sau"**. Đây chính là lý do mục 4.3 ghi *"postorder: đánh giá biểu thức"*. Cùng cây này, duyệt **inorder** (trái-node-phải) lại cho ra dạng người đọc quen: `3 + 4 * 5` (cần thêm ngoặc), còn **preorder** cho `* + 3 4 5` — chính là **ký pháp Ba Lan (prefix)**.

### 9.2. Mã hóa Huffman (nén file) — gán mã ngắn cho ký tự hay gặp

Vì sao file `.zip`, `.jpg`, `.mp3` nhỏ hơn dữ liệu gốc? Một kỹ thuật cốt lõi là **mã Huffman**, dựa hoàn toàn trên **cây nhị phân**.

Ý tưởng: ký tự **xuất hiện nhiều** → cho **mã bit ngắn**; ký tự hiếm → mã dài. Đi xuống **trái = bit 0**, **phải = bit 1**; mã của một ký tự = đường đi từ gốc tới lá chứa nó.

**Ví dụ số** — văn bản dùng 4 ký tự với tần suất:

| Ký tự | Tần suất |
|-------|---------:|
| `A` | 50 |
| `B` | 25 |
| `C` | 15 |
| `D` | 10 |

Cây Huffman (ký tự hay gặp nằm **nông**, gần gốc):

```
        (●)
       /   \
      A      (●)        A nông nhất (hay gặp nhất)
    0/      /   \
           B     (●)
         10/    /   \
                C     D
              110   111
```

Bảng mã: `A = 0`, `B = 10`, `C = 110`, `D = 111`.

So sánh độ dài với mã **cố định 2 bit/ký tự** (`A=00, B=01, C=10, D=11`):

$$\text{Cố định} = (50+25+15+10) \times 2 = 200 \text{ bit}$$
$$\text{Huffman} = 50\cdot 1 + 25\cdot 2 + 15\cdot 3 + 10\cdot 3 = 50 + 50 + 45 + 30 = 175 \text{ bit}$$

Tiết kiệm $\frac{200-175}{200} = 12{,}5\%$ — chỉ với 4 ký tự; văn bản thật (nhiều ký tự, tần suất lệch hơn) tiết kiệm 40–60%. Toàn bộ phép màu nén nằm ở **hình dạng cây**.

### 9.3. Cây quyết định (decision tree) — chuỗi if/else chính là cây

Mỗi khối `if/else` lồng nhau **là một cây nhị phân**: node trong là **câu hỏi**, hai nhánh là **đúng/sai**, lá là **kết luận**. Đây là nền của thuật toán học máy *Decision Tree* và mọi luật nghiệp vụ.

Ví dụ "có nên cho vay?":

```
              Thu nhập > 20tr?
               /          \
             Có            Không
            /                 \
   Có nợ xấu?              TỪ CHỐI
    /      \
  Có       Không
  /          \
TỪ CHỐI     CHO VAY
```

Phân loại một hồ sơ = **đi từ gốc xuống một lá** theo câu trả lời — độ phức tạp $O(h)$ với $h$ là chiều cao cây, *không* phải duyệt mọi luật. Random Forest, XGBoost (thắng vô số cuộc thi Kaggle) đều là **tập hợp nhiều cây quyết định**.

### 9.4. Tìm kiếm có thứ tự — xem trước BST

Nếu xếp dữ liệu sao cho "trái nhỏ hơn, phải lớn hơn", mỗi bước so sánh **vứt được một nửa** số node → tìm kiếm $O(\log n)$ thay vì $O(n)$. Đó là **Binary Search Tree**, học ngay ở [Lesson 02](../lesson-02-binary-search-tree/). Đây là ứng dụng phổ biến nhất của cây nhị phân trong cấu trúc dữ liệu.

### 9.5. Cây tổng quát (n-ary) trong hệ thống thật

Nhắc lại [mục 6](#6-cây-tổng-quát-n-ary-tree) — khi mỗi node có *nhiều hơn 2 con*:

- **Hệ thống file** (`C:\Users\admin\...`): thư mục = node, file/thư mục con = con. Lệnh `dir`/`ls -R` = duyệt cây.
- **DOM của trang web**: `<html>` chứa `<body>` chứa `<div>`... Trình duyệt dựng **cây DOM** rồi vẽ.
- **AST (Abstract Syntax Tree)**: trình biên dịch parse code thành cây cú pháp trước khi sinh mã máy — chính là phiên bản tổng quát của §9.1.

### 9.6. 📝 Tóm tắt mục 9

- **Expression tree**: cấu trúc cây mã hóa thứ tự ưu tiên; **postorder** = tính giá trị, preorder/inorder = các ký pháp khác nhau.
- **Huffman**: cây nhị phân gán mã bit (trái=0, phải=1) — ký tự hay gặp nằm nông → file nhỏ đi.
- **Decision tree**: if/else lồng nhau = cây; phân loại = đi gốc → lá, $O(h)$.
- **BST**: cây "trái nhỏ phải lớn" cho tìm kiếm $O(\log n)$ (Lesson 02).
- **n-ary tree**: file system, DOM, AST — bất cứ đâu có quan hệ "chứa / cha–con".

### 9.7. 🔁 Tự kiểm tra

1. Dựng cây biểu thức cho `2 * (3 + 5)` rồi tính bằng postorder. Kết quả là bao nhiêu?
   <details><summary>Đáp án</summary>Cây: gốc `*`, con trái `2`, con phải `+` (với con `3`, `5`). Postorder: thăm `2`, `3`, `5`, rồi `+` → `3+5=8`, rồi `*` → `2*8=16`. Kết quả **16**.</details>
2. Trong mã Huffman ở §9.2, vì sao không ký tự nào có mã là **tiền tố** của ký tự khác (vd không có `A=0` và `X=01`)?
   <details><summary>Đáp án</summary>Vì mọi ký tự nằm ở **lá**, không ký tự nào nằm trên đường đi xuống ký tự khác. Tính chất "không tiền tố" (prefix-free) này cho phép giải mã chuỗi bit mà không cần dấu phân cách: cứ đi từ gốc, gặp lá thì xuất ký tự rồi quay lại gốc.</details>

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
$O(n)$.

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
$O(n)$.

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
$O(n)$.

### Bài 4 — Đường kính cây
Đường kính = đường đi dài nhất giữa hai node bất kỳ = $\max(\text{height(left)} + \text{height(right)} + 2)$ trên mọi node.

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
$O(n)$.

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

[Lesson 02 — Binary Search Tree](../lesson-02-binary-search-tree/)
