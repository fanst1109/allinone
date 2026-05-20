# Lesson 03 — Stack (Ngăn xếp)

## Mục tiêu học tập

- Hiểu khái niệm **LIFO** và stack.
- Biết các thao tác cơ bản: `push`, `pop`, `peek/top`, `isEmpty`.
- Cài đặt được stack bằng array hoặc linked list.
- Nhận ra các bài toán nên dùng stack.

## Kiến thức tiền đề

- [Lesson 01 — Array](../lesson-01-array/) và [Lesson 02 — Linked List](../lesson-02-linked-list/).

## 1. Stack là gì?

**Stack** là một ADT (abstract data type) hoạt động theo nguyên tắc **LIFO — Last In, First Out**: phần tử vào sau cùng sẽ ra trước.

Hình dung: chồng đĩa. Đặt đĩa lên trên cùng (`push`), lấy cũng từ trên cùng (`pop`).

```
push(1) push(2) push(3)        pop() -> 3
                                pop() -> 2
   [3] <- top                   pop() -> 1
   [2]
   [1]
```

## 2. Các thao tác

| Thao tác | Mô tả | Big-O |
| --- | --- | --- |
| `push(x)` | Thêm `x` vào đỉnh | `O(1)` |
| `pop()` | Lấy ra phần tử ở đỉnh | `O(1)` |
| `peek()` / `top()` | Xem phần tử đỉnh (không lấy ra) | `O(1)` |
| `isEmpty()` | Stack có rỗng không | `O(1)` |
| `size()` | Số phần tử hiện tại | `O(1)` |

## 3. Cài đặt

### 3.1. Dùng array (động)

```
class Stack:
    arr = []          # dynamic array
    push(x):  arr.append(x)
    pop():    return arr.removeLast()
    peek():   return arr[len(arr)-1]
    isEmpty(): return len(arr) == 0
```

- Tất cả `O(1)` amortized.
- Đơn giản, cache-friendly.

### 3.2. Dùng linked list

```
class Stack:
    head = null
    push(x):
        newNode = Node(x); newNode.next = head; head = newNode
    pop():
        v = head.value; head = head.next; return v
    peek():
        return head.value
```

- Tất cả `O(1)` thật sự (không cần resize).
- Tốn thêm bộ nhớ cho con trỏ.

## 4. Ứng dụng tiêu biểu

### 4.1. Function call stack
Khi gọi hàm, hệ thống đẩy thông tin (địa chỉ trả về, biến cục bộ) vào stack. Khi `return`, pop ra. Đệ quy quá sâu → tràn stack (stack overflow).

### 4.2. Kiểm tra ngoặc cân bằng
Duyệt chuỗi, gặp ngoặc mở thì `push`, gặp ngoặc đóng thì `pop` và so khớp.

```
function isBalanced(s):
    stack = []
    pairs = {')':'(', ']':'[', '}':'{'}
    for c in s:
        if c in "([{":
            stack.push(c)
        else if c in ")]}":
            if stack.isEmpty() or stack.pop() != pairs[c]:
                return false
    return stack.isEmpty()
```
`O(n)`.

### 4.3. Đảo ngược chuỗi / mảng
Push từng phần tử rồi pop → thứ tự ngược lại.

### 4.4. Tính biểu thức (postfix)
Biểu thức `2 3 + 4 *` được tính bằng stack: gặp số thì push, gặp toán tử thì pop 2 số, tính, push lại kết quả.

### 4.5. Undo/Redo
Mỗi hành động đẩy vào stack `undo`; khi undo, pop và đẩy vào stack `redo`.

### 4.6. DFS (Depth-First Search)
Duyệt đồ thị theo chiều sâu dùng stack thay vì đệ quy.

## 5. Cạm bẫy

- **Pop trên stack rỗng** → lỗi runtime. Luôn kiểm tra `isEmpty()` trước.
- **Stack overflow**: đệ quy không có điều kiện dừng hoặc dữ liệu quá lớn.
- Cài đặt bằng array tĩnh → có thể tràn nếu vượt capacity.

## Bài tập

1. Viết hàm kiểm tra một chuỗi ngoặc `()[]{}` có hợp lệ không.
2. Cài đặt một stack hỗ trợ `getMin()` trả về phần tử nhỏ nhất trong `O(1)` (gợi ý: dùng stack phụ).
3. Tính giá trị một biểu thức postfix (RPN). Ví dụ `"2 3 + 4 *"` = 20.
4. Chuyển biểu thức infix `(a + b) * c` sang postfix dùng stack (thuật toán Shunting-yard, mức ý tưởng).
5. Vì sao đệ quy có thể được "khử" (chuyển thành lặp) bằng stack tường minh?

## Bài tiếp theo

[Lesson 04 — Queue](../lesson-04-queue/)
