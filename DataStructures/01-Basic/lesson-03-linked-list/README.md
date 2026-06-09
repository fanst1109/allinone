# Lesson 03 — Linked List (Danh sách liên kết)

## Mục tiêu học tập

- Hiểu cấu trúc và cách hoạt động của linked list.
- Phân biệt **singly**, **doubly**, **circular** linked list.
- So sánh linked list với array.
- Cài đặt được các thao tác cơ bản: thêm, xóa, duyệt.

## Kiến thức tiền đề

- [Lesson 02 — Array](../lesson-02-array/).
- Hiểu **con trỏ (pointer)** / tham chiếu (reference) ở mức cơ bản.

## 1. Linked list là gì?

**Linked list (danh sách liên kết)** là chuỗi các **node**, mỗi node chứa:

- **Giá trị (value/data)**.
- **Con trỏ tới node kế tiếp (next)**.

Khác với array, các node **không cần nằm liên tiếp trong bộ nhớ** — chúng liên kết bằng con trỏ.

```
[10|next] -> [20|next] -> [30|next] -> [40|null]
   head                                 (tail)
```

### 1.1. 💡 Trực giác — xe lửa các toa nối nhau

Hình dung một **đoàn tàu**: mỗi toa = 1 node, có **móc nối** sang toa kế tiếp (`next`). Để đến toa thứ 5, bạn không thể "nhảy thẳng" — phải đi qua toa 1, 2, 3, 4 rồi mới tới 5. Đó là vì sao truy cập theo index là $O(n)$.

Ngược lại, **tháo và chèn toa giữa đoàn** lại rất rẻ: chỉ cần đổi 2 móc nối (`prev.next = new_node`, `new_node.next = next_node`) — $O(1)$ nếu đã đứng đúng chỗ. Đó là vì sao chèn/xóa giữa là $O(1)$.

**Hai khác biệt cốt lõi với array** thấy ngay từ hình ảnh tàu hỏa:

| Khía cạnh | Array (dãy nhà phố) | Linked list (đoàn tàu) |
|-----------|--------------------|------------------------|
| Đi tới phần tử thứ $i$ | Tính địa chỉ → đi thẳng → $O(1)$ | Đi từng toa từ đầu → $O(n)$ |
| Chèn ở giữa | Dịch chuyển mọi nhà phía sau → $O(n)$ | Tháo 2 móc nối → $O(1)$ |
| Trong RAM | Liền khối | Rải rác, nối bằng con trỏ |
| Cache CPU | Đọc tuần tự rất nhanh | Mỗi node có thể là 1 cache miss |

### 1.2. ❓ Câu hỏi tự nhiên

- **"Vì sao node phải có `next`? Sao không lưu vị trí?"** — Linked list **không có "vị trí"** theo nghĩa array. Mỗi node nằm ở một địa chỉ ngẫu nhiên trong RAM, chỉ liên kết được với nhau qua con trỏ. Không có `next` thì không có cách nào từ node A tới node B.
- **"Sao không dùng array luôn cho mọi thứ — vẫn chèn được mà?"** — Chèn array $O(n)$ (dịch chuyển), linked list $O(1)$ nếu đã có con trỏ tới vị trí. Khi chèn rất nhiều (vd LRU cache, free list của allocator), linked list thắng.
- **"`head` có quan trọng không? Mất nó là sao?"** — `head` là **điểm vào duy nhất** vào list. Mất `head` = mất toàn bộ list (không có cách nào khác đi vào). Đó là lỗi `nil head` rất phổ biến — xem mục lỗi thường gặp.

## 2. Các biến thể

### 2.1. Singly linked list — đơn

Mỗi node chỉ có con trỏ `next`. Đi từ đầu tới cuối, không quay lại được.

```
node = { value, next }
```

### 2.2. Doubly linked list — đôi

Mỗi node có cả `next` và `prev`. Đi được cả hai chiều.

```
node = { value, prev, next }
null <- [10] <-> [20] <-> [30] -> null
```

### 2.3. Circular linked list — vòng

Node cuối trỏ về node đầu (thay vì `null`), tạo thành vòng tròn.

## 3. Các thao tác và độ phức tạp

| Thao tác | Singly | Doubly | Ghi chú |
| --- | --- | --- | --- |
| Truy cập phần tử thứ $i$ | $O(n)$ | $O(n)$ | Phải duyệt từ đầu |
| Tìm kiếm | $O(n)$ | $O(n)$ | |
| Thêm vào đầu | $O(1)$ | $O(1)$ | |
| Thêm vào cuối (có `tail`) | $O(1)$ | $O(1)$ | Cần con trỏ `tail` |
| Thêm sau một node đã biết | $O(1)$ | $O(1)$ | |
| Xóa node đã biết | $O(n)$ singly | $O(1)$ doubly | Singly cần tìm node trước |
| Xóa đầu | $O(1)$ | $O(1)$ | |

So với array, linked list **mất $O(1)$ để chèn/xóa** nếu đã có con trỏ tới vị trí — nhưng **$O(n)$ để truy cập theo chỉ số**.

## 4. Ví dụ pseudocode — Singly linked list

### Định nghĩa node
```
class Node:
    value
    next  # con trỏ tới Node kế tiếp, hoặc null
```

### Thêm vào đầu
```
function pushFront(head, value):
    newNode = Node(value)
    newNode.next = head
    return newNode             # head mới
```
$O(1)$.

### Duyệt và in
```
function print(head):
    cur = head
    while cur != null:
        print(cur.value)
        cur = cur.next
```
$O(n)$.

### Xóa node đầu tiên có giá trị `v`
```
function remove(head, v):
    if head == null: return null
    if head.value == v: return head.next
    cur = head
    while cur.next != null and cur.next.value != v:
        cur = cur.next
    if cur.next != null:
        cur.next = cur.next.next
    return head
```
$O(n)$.

### 4.1. Walk-through từng bước — đảo ngược singly linked list

Đây là thao tác kinh điển, đáng nhìn từng trạng thái thật. Bắt đầu với list `1 → 2 → 3 → null`. Mục tiêu: `3 → 2 → 1 → null`.

Dùng 3 con trỏ: `prev` (đã đảo), `cur` (đang xét), `nxt` (lưu tạm để không mất phần còn lại).

| Bước | prev | cur | nxt | Hành động | Trạng thái list nhìn từ `prev` |
|------|------|-----|-----|-----------|------------------------------|
| 0 | `nil` | node(1) | — | init | (chưa có gì đảo) |
| 1 | `nil` | node(1) | node(2) | lưu nxt = cur.next, `cur.next = prev (nil)`, `prev = cur (1)`, `cur = nxt (2)` | `1 → nil` |
| 2 | node(1) | node(2) | node(3) | `cur.next = prev (1)`, `prev = cur (2)`, `cur = nxt (3)` | `2 → 1 → nil` |
| 3 | node(2) | node(3) | `nil` | `cur.next = prev (2)`, `prev = cur (3)`, `cur = nxt (nil)` | `3 → 2 → 1 → nil` |
| 4 | node(3) | `nil` | — | thoát vòng vì `cur == nil` | return `prev` = node(3) |

**Vì sao phải lưu `nxt` TRƯỚC khi gán `cur.next = prev`?** Vì sau khi gán, `cur.next` không còn trỏ tới phần list chưa đảo nữa — mất đường về node tiếp theo. `nxt` giữ tham chiếu để đi tiếp.

## 5. So sánh với Array

| Tiêu chí | Array | Linked List |
| --- | --- | --- |
| Truy cập theo chỉ số | $O(1)$ | $O(n)$ |
| Thêm/xóa đầu | $O(n)$ | $O(1)$ |
| Thêm/xóa cuối | $O(1)$* | $O(1)$ (có tail) |
| Bộ nhớ phụ | Ít | Mỗi node tốn thêm 1-2 con trỏ |
| Cache-friendly | Có | Không (node nằm rải rác) |
| Kích thước | Cần biết trước hoặc resize | Tự nhiên co giãn |

→ **Array** thắng khi cần truy cập ngẫu nhiên. **Linked list** thắng khi chèn/xóa nhiều ở đầu hoặc giữa và không cần truy cập theo chỉ số.

## 6. Ứng dụng

- Cài đặt **stack**, **queue**, **deque**.
- Quản lý bộ nhớ động (free list).
- LRU cache (dùng doubly linked list + hash map).
- Polynomial / số nguyên rất lớn.

## 7. Cạm bẫy thường gặp

- Quên cập nhật `next`/`prev` khi xóa → mất node hoặc lộ con trỏ rác.
- Không xử lý case `head == null` hoặc danh sách 1 phần tử.
- Memory leak (trong ngôn ngữ không có GC) khi quên giải phóng node.
- Vòng lặp vô hạn khi tạo circular list mà không kiểm soát.

### 7.1. ⚠ Lỗi thường gặp (bảng chi tiết)

| Lỗi | Hậu quả | Cách sửa |
|------|---------|----------|
| Không check `head == nil` trước khi đọc `head.next`/`head.value` | Null pointer panic / segfault | Luôn check ở dòng đầu của hàm: `if head == nil { return nil }` |
| Khi chèn đầu list quên gán `head = newNode` (chỉ gán `newNode.next = head`) | List mới mất đi, `head` cũ vẫn trỏ vào list cũ | Hàm `pushFront` phải **trả về `head` mới** và caller gán lại; hoặc dùng con trỏ tới `head` |
| Khi xóa node giữa, gán `cur.next = cur.next.next` mà không kiểm `cur.next != nil` | Đọc `nil.next` → crash | Check `if cur.next != nil` trước khi dereference |
| Đảo ngược/duyệt: chỉ dùng 1 con trỏ, không lưu `next` trước khi sửa | Mất phần list phía sau, đoạn từ vị trí đó về cuối bị rò rỉ | Luôn lưu `nxt := cur.next` TRƯỚC khi sửa `cur.next` |
| Tạo vòng vô ý: cuối list trỏ về `head` thay vì `nil` | Duyệt `while cur != nil` → vòng vô hạn | Kết thúc list bằng `nil`; chỉ dùng circular list khi có chủ ý |
| Trong doubly list, xóa node `x` chỉ cập nhật `x.prev.next` mà quên `x.next.prev` | Khi đi ngược chiều gặp con trỏ `prev` cũ → bug khó tìm | Đối xứng: cập nhật cả `x.prev.next = x.next` VÀ `x.next.prev = x.prev` |
| Chèn vào doubly list quên một trong 4 phép gán (`new.prev`, `new.next`, `neighbor.prev`, `neighbor.next`) | Liên kết đứt một chiều, list "bị xé" | Vẽ trước trên giấy: 2 neighbor cũ + node mới = 4 con trỏ cần gán |
| Trong C/C++ quên `free(node)` sau khi xóa | Memory leak, heap phình dần | Gọi `free` sau khi đã unlink; ngôn ngữ có GC (Go/Java) thì khỏi lo |

### 7.2. ❓ Câu hỏi tự nhiên

- **"Sao không lưu thêm `length` để truy cập theo index nhanh hơn?"** — Lưu `length` chỉ giúp biết tổng số node trong $O(1)$, không giúp đi tới node thứ $i$ nhanh hơn — vẫn phải đi từng bước. Cấu trúc có thể truy cập index nhanh = **array** hoặc **skip list**.
- **"Linked list có thể chứa cả vòng lẫn không vòng không?"** — Có thể, nhưng phải có cách phát hiện. Thuật toán Floyd "rùa và thỏ" (xem bài 4 bên dưới) dùng để phát hiện chu trình trong $O(n)$ thời gian, $O(1)$ bộ nhớ.
- **"Doubly nặng gấp đôi memory, có đáng không?"** — Tốn ~1 con trỏ thêm mỗi node (~8 byte trên 64-bit). Đổi lại: xóa node biết trước trong $O(1)$, đi ngược được. Cấu trúc LRU cache, hệ thống undo/redo phức tạp dùng doubly là chuẩn.
- **"Khi nào dùng linked list thay vì slice/`ArrayList`?"** — Hiếm hơn bạn nghĩ. Thực tế, dynamic array thắng linked list trong hầu hết trường hợp nhờ **cache locality**. Linked list shine khi: (1) chèn/xóa **đầu** rất nhiều, (2) cần $O(1)$ splice (nối/cắt list), (3) embed vào struct khác (intrusive list trong Linux kernel).

### 7.3. 🔁 Tự kiểm tra

1. Cho list `A → B → C → D`. Muốn xóa node `C` (biết trước con trỏ tới `C`), trong **singly** list cần làm gì?
   <details><summary>Đáp án</summary>Phải tìm node trước (`B`) bằng cách duyệt từ `head` → tốn $O(n)$. Rồi `B.next = C.next` (tức `D`). Mẹo: nếu C **không phải node cuối**, có thể "copy-then-skip" — gán `C.value = D.value; C.next = D.next`, hiệu quả $O(1)$ nhưng làm thay đổi node nội dung.</details>
2. Đoạn code sau có lỗi gì?
   ```go
   func deleteHead(head *Node) {
       head = head.next
   }
   ```
   <details><summary>Đáp án</summary>**Tham trị**: gán `head = head.next` chỉ thay đổi biến local, không ảnh hưởng caller. Caller vẫn giữ `head` cũ. Sửa: trả về `*Node` mới `return head.next` để caller gán lại, hoặc nhận `**Node` (con trỏ-tới-con-trỏ).</details>
3. Tại sao chèn vào **đầu** doubly list lại không nhanh hơn singly list, dù doubly có thêm `prev`?
   <details><summary>Đáp án</summary>Cả hai đều $O(1)$ ở đầu. Doubly chỉ tốn thêm 1 phép gán `prev` so với singly — vẫn $O(1)$. Doubly thắng ở **xóa node biết trước** (không cần tìm `prev` bằng cách duyệt).</details>

### 7.4. 📝 Tóm tắt mục — Linked List

- Linked list = chuỗi node nối nhau qua con trỏ; **không** liên tiếp trong RAM như array.
- **Mạnh**: chèn/xóa $O(1)$ nếu đã có con trỏ tới vị trí; co giãn tự nhiên.
- **Yếu**: truy cập theo index $O(n)$; mỗi node tốn thêm 1-2 con trỏ; không cache-friendly.
- Biến thể: **singly** (1 chiều), **doubly** (2 chiều, xóa biết trước $O(1)$), **circular** (đuôi → đầu).
- Bug điển hình: `nil` head/next, mất đường về khi sửa `cur.next`, vòng vô hạn, memory leak (không GC).
- Khi nghi ngờ: vẽ list trên giấy, đánh số bước, theo dõi từng con trỏ → bug hiện ngay.

## Bài tập

1. Cài đặt hàm trả về độ dài của một singly linked list.
2. Viết hàm đảo ngược một singly linked list (in-place). Tính Big-O.
3. Cho hai linked list đã sắp xếp, viết hàm trộn chúng thành một list sắp xếp.
4. Phát hiện chu trình (cycle) trong linked list — tham khảo thuật toán "rùa và thỏ" (Floyd).
5. Vì sao doubly linked list dễ xóa hơn singly linked list?

## Lời giải chi tiết

### Bài 1 — Độ dài
Duyệt từ `head` tới `null`, đếm số node.

```go
func length(head *Node) int {
    n := 0
    for cur := head; cur != nil; cur = cur.next {
        n++
    }
    return n
}
```
$O(n)$, bộ nhớ phụ $O(1)$.

### Bài 2 — Đảo ngược in-place
Giữ ba con trỏ `prev`, `cur`, `next`. Mỗi bước trỏ ngược `cur.next` về `prev`.

```go
func reverse(head *Node) *Node {
    var prev *Node
    cur := head
    for cur != nil {
        nxt := cur.next
        cur.next = prev
        prev = cur
        cur = nxt
    }
    return prev
}
```
$O(n)$ thời gian, $O(1)$ bộ nhớ.

### Bài 3 — Trộn hai list đã sort
Dùng dummy node để code gọn. So sánh đầu mỗi list, lấy node nhỏ hơn nối vào kết quả.

```go
func merge(a, b *Node) *Node {
    dummy := &Node{}
    tail := dummy
    for a != nil && b != nil {
        if a.val <= b.val { tail.next = a; a = a.next } else { tail.next = b; b = b.next }
        tail = tail.next
    }
    if a != nil { tail.next = a } else { tail.next = b }
    return dummy.next
}
```
$O(m + n)$.

### Bài 4 — Phát hiện chu trình (Floyd "rùa và thỏ")
Hai con trỏ: `slow` đi 1 bước, `fast` đi 2 bước. Nếu có chu trình, chúng sẽ gặp nhau; nếu không, `fast` chạm `nil`.

```go
func hasCycle(head *Node) bool {
    slow, fast := head, head
    for fast != nil && fast.next != nil {
        slow = slow.next
        fast = fast.next.next
        if slow == fast { return true }
    }
    return false
}
```
$O(n)$ thời gian, $O(1)$ bộ nhớ.

Trực giác: trong chu trình độ dài $L$, mỗi vòng `fast` "bắt kịp" `slow` thêm 1 đơn vị → sau tối đa $L$ vòng là gặp nhau.

### Bài 5 — Vì sao doubly dễ xóa hơn?
Singly: muốn xóa node `x`, cần node trước (`prev`) để gán `prev.next = x.next` — phải duyệt từ đầu để tìm `prev`, mất $O(n)$.

Doubly: mỗi node có sẵn `x.prev` → xóa trực tiếp trong $O(1)$:
```
x.prev.next = x.next
x.next.prev = x.prev
```

## Code & Minh họa

- [solutions.go](./solutions.go) — Go solutions đầy đủ kèm test trên list mẫu.
- [visualization.html](./visualization.html) — minh họa singly linked list: thêm/xóa node và phép đảo ngược.

## Bài tiếp theo

[Lesson 04 — Stack](../lesson-04-stack/)
