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

### 1.1. 💡 Trực giác — vì sao LIFO lại có mặt khắp nơi

Chồng đĩa là minh hoạ truyền thống, nhưng LIFO xuất hiện vì một lý do sâu hơn: **"việc bắt đầu sau phải kết thúc trước"**. Hai hệ thống điển hình:

- **Gọi hàm**: hàm `A` gọi `B`, `B` gọi `C`. `C` chạy xong trước, rồi `B`, rồi `A`. Đây là **call stack** của runtime — quản lý tự động bằng stack thật trong CPU.
- **Mở ngoặc**: `( [ { ... } ] )` — ngoặc mở **sau cùng** (`{`) phải đóng **trước nhất** (`}`). Bất kỳ chuỗi lồng nhau nào (HTML tag, JSON, parens) đều theo cấu trúc này.

Walk-through số: chuỗi `push(5), push(8), push(2), pop(), push(7), pop(), pop()` cho dãy giá trị nào?

| Bước | Thao tác | Stack (từ đáy → đỉnh) | Giá trị pop ra |
|------|----------|----------------------|----------------|
| 0 | init | `[]` | — |
| 1 | push(5) | `[5]` | — |
| 2 | push(8) | `[5, 8]` | — |
| 3 | push(2) | `[5, 8, 2]` | — |
| 4 | pop | `[5, 8]` | **2** |
| 5 | push(7) | `[5, 8, 7]` | — |
| 6 | pop | `[5, 8]` | **7** |
| 7 | pop | `[5]` | **8** |

Thứ tự pop ra: `2, 7, 8` — **đảo ngược** thứ tự push (trong cùng cụm). Tính chất này là nền tảng cho mọi ứng dụng stack ở mục 4.

### 1.2. ❓ Câu hỏi tự nhiên

- **"Stack là ADT hay cấu trúc dữ liệu?"** — **ADT**. Chỉ định nghĩa thao tác (`push`/`pop`/`peek`/`isEmpty`) chứ không quy định cách lưu. Cài đặt cụ thể có thể là array hoặc linked list (xem mục 3).
- **"Vì sao chỉ thao tác ở đỉnh, không cho phép truy cập giữa?"** — Hạn chế này **chính là tính năng**. ADT càng đơn giản, càng dễ tối ưu và dễ chứng minh tính đúng đắn. Nếu cần truy cập giữa → bạn cần `List` hoặc `Array`, không phải Stack.
- **"`peek` khác `pop` thế nào?"** — `peek` đọc đỉnh nhưng **không gỡ ra**, stack giữ nguyên. `pop` đọc đỉnh VÀ gỡ. Khi chỉ cần xem để quyết định bước tiếp theo (vd kiểm tra ngoặc), `peek` an toàn hơn.

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

### 4.7. Walk-through — kiểm tra ngoặc cân bằng

Cho chuỗi `s = "({[]})"`. Trace từng ký tự:

| Bước | Ký tự | Loại | Hành động | Stack sau bước |
|------|-------|------|-----------|----------------|
| 0 | — | init | — | `[]` |
| 1 | `(` | mở | push | `[(]` |
| 2 | `{` | mở | push | `[(, {]` |
| 3 | `[` | mở | push | `[(, {, []` |
| 4 | `]` | đóng | pop `[`, so khớp `[` == pairs[`]`] ✓ | `[(, {]` |
| 5 | `}` | đóng | pop `{`, so khớp ✓ | `[(]` |
| 6 | `)` | đóng | pop `(`, so khớp ✓ | `[]` |
| — | eof | — | stack rỗng → hợp lệ | — |

Ngược lại, với `"([)]"`:

| Bước | Ký tự | Hành động | Stack |
|------|-------|-----------|-------|
| 1 | `(` | push | `[(]` |
| 2 | `[` | push | `[(, []` |
| 3 | `)` | pop `[`, so khớp với `pairs[)] = (` → **không khớp** | → trả `false` |

Đây là vì sao stack cần thiết: kiểm "ngoặc đóng có khớp với ngoặc mở **gần nhất** chưa đóng" — và "gần nhất" chính là đỉnh stack.

### 4.8. ❓ Câu hỏi tự nhiên về ứng dụng

- **"Tại sao backtrack/DFS dùng stack mà BFS dùng queue?"** — DFS đi sâu trước → khi gặp ngã rẽ, "ghi nhớ" các nhánh khác để quay lại sau. Nhánh **vừa ghi nhớ phải xét trước** (sâu trước) → LIFO → stack. Đệ quy thực ra là stack ngầm.
- **"Postfix có gì hay mà phải dùng?"** — Không có dấu ngoặc, không cần biết độ ưu tiên — chỉ cần stack 1 chiều là tính được. CPU/máy ảo (JVM, Python bytecode) bên trong dùng postfix-like operations chính vì đơn giản này.
- **"Undo/Redo cần 2 stack?"** — Đúng. Stack `undo` lưu lịch sử các action. Khi user undo: pop action từ `undo`, đảo ngược nó, **push vào stack `redo`**. Khi user redo: pop từ `redo` đẩy lại sang `undo`. Khi có action **mới**: clear `redo` (vì nhánh tương lai cũ không còn ý nghĩa).

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

## Lời giải chi tiết

### Bài 1 — Kiểm tra ngoặc cân bằng
Gặp ngoặc mở → `push`. Gặp ngoặc đóng → `pop` và so khớp. Cuối cùng stack phải rỗng.

```go
func isBalanced(s string) bool {
    pairs := map[rune]rune{')': '(', ']': '[', '}': '{'}
    stack := []rune{}
    for _, c := range s {
        switch c {
        case '(', '[', '{':
            stack = append(stack, c)
        case ')', ']', '}':
            if len(stack) == 0 || stack[len(stack)-1] != pairs[c] { return false }
            stack = stack[:len(stack)-1]
        }
    }
    return len(stack) == 0
}
```
`O(n)`.

### Bài 2 — Min stack với `getMin()` `O(1)`
Duy trì stack phụ chỉ chứa **giá trị min hiện tại** ứng với mỗi vị trí.

```go
type MinStack struct{ data, mins []int }
func (s *MinStack) Push(x int) {
    s.data = append(s.data, x)
    if len(s.mins) == 0 || x <= s.mins[len(s.mins)-1] {
        s.mins = append(s.mins, x)
    } else {
        s.mins = append(s.mins, s.mins[len(s.mins)-1])
    }
}
func (s *MinStack) Pop() int { /* pop cả hai */ ... }
func (s *MinStack) GetMin() int { return s.mins[len(s.mins)-1] }
```
Tất cả `O(1)`. Bộ nhớ phụ `O(n)`.

### Bài 3 — Tính biểu thức postfix
Gặp số: push. Gặp toán tử: pop 2 số, tính, push lại.

```
"2 3 + 4 *"
→ push 2, push 3 → [2,3]
→ '+' → pop 3, pop 2, 2+3=5, push → [5]
→ push 4 → [5,4]
→ '*' → pop 4, pop 5, 5*4=20, push → [20]
→ kết quả: 20
```

### Bài 4 — Infix → postfix (Shunting-yard, ý tưởng)
Hai cấu trúc: stack toán tử + queue output.
- Số → đẩy thẳng ra output.
- Toán tử: trong khi đỉnh stack có toán tử **ưu tiên ≥** → pop ra output; rồi push toán tử mới.
- `(` → push; `)` → pop tới khi gặp `(`.
- Hết input → pop hết stack ra output.

`(a + b) * c` → output `a b + c *`.

### Bài 5 — Vì sao đệ quy "khử" được bằng stack tường minh?

Đệ quy thực chất dùng **call stack** ngầm của hệ thống: mỗi lần gọi là một frame stack. Ta có thể mô phỏng bằng stack tường minh trong code — lưu trạng thái (biến cục bộ, "bước nào"), đẩy/lấy như call stack. Lợi ích: tránh stack overflow khi đệ quy quá sâu, kiểm soát bộ nhớ tốt hơn.

Ví dụ DFS đệ quy ↔ DFS dùng stack tường minh là cùng một thuật toán.

## Code & Minh họa

- [solutions.go](./solutions.go) — đầy đủ các bài.
- [visualization.html](./visualization.html) — minh họa push/pop và kiểm tra ngoặc cân bằng từng bước.

## Bài tiếp theo

[Lesson 04 — Queue](../lesson-04-queue/)
