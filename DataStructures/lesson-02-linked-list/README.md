# Lesson 02 — Linked List (Danh sách liên kết)

## Mục tiêu học tập

- Hiểu cấu trúc và cách hoạt động của linked list.
- Phân biệt **singly**, **doubly**, **circular** linked list.
- So sánh linked list với array.
- Cài đặt được các thao tác cơ bản: thêm, xóa, duyệt.

## Kiến thức tiền đề

- [Lesson 01 — Array](../lesson-01-array/).
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
| Truy cập phần tử thứ `i` | `O(n)` | `O(n)` | Phải duyệt từ đầu |
| Tìm kiếm | `O(n)` | `O(n)` | |
| Thêm vào đầu | `O(1)` | `O(1)` | |
| Thêm vào cuối (có `tail`) | `O(1)` | `O(1)` | Cần con trỏ `tail` |
| Thêm sau một node đã biết | `O(1)` | `O(1)` | |
| Xóa node đã biết | `O(n)` singly | `O(1)` doubly | Singly cần tìm node trước |
| Xóa đầu | `O(1)` | `O(1)` | |

So với array, linked list **mất `O(1)` để chèn/xóa** nếu đã có con trỏ tới vị trí — nhưng **`O(n)` để truy cập theo chỉ số**.

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
`O(1)`.

### Duyệt và in
```
function print(head):
    cur = head
    while cur != null:
        print(cur.value)
        cur = cur.next
```
`O(n)`.

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
`O(n)`.

## 5. So sánh với Array

| Tiêu chí | Array | Linked List |
| --- | --- | --- |
| Truy cập theo chỉ số | `O(1)` | `O(n)` |
| Thêm/xóa đầu | `O(n)` | `O(1)` |
| Thêm/xóa cuối | `O(1)`* | `O(1)` (có tail) |
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

## Bài tập

1. Cài đặt hàm trả về độ dài của một singly linked list.
2. Viết hàm đảo ngược một singly linked list (in-place). Tính Big-O.
3. Cho hai linked list đã sắp xếp, viết hàm trộn chúng thành một list sắp xếp.
4. Phát hiện chu trình (cycle) trong linked list — tham khảo thuật toán "rùa và thỏ" (Floyd).
5. Vì sao doubly linked list dễ xóa hơn singly linked list?

## Bài tiếp theo

[Lesson 03 — Stack](../lesson-03-stack/)
