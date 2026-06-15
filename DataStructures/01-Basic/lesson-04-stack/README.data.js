// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: DataStructures/01-Basic/lesson-04-stack/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 04 — Stack (Ngăn xếp)

## Mục tiêu học tập

- Hiểu khái niệm **LIFO** và stack.
- Biết các thao tác cơ bản: \`push\`, \`pop\`, \`peek/top\`, \`isEmpty\`.
- Cài đặt được stack bằng array hoặc linked list.
- Nhận ra các bài toán nên dùng stack.

## Kiến thức tiền đề

- [Lesson 02 — Array](../lesson-02-array/) và [Lesson 03 — Linked List](../lesson-03-linked-list/).

## 1. Stack là gì?

**Stack** là một ADT (abstract data type) hoạt động theo nguyên tắc **LIFO — Last In, First Out**: phần tử vào sau cùng sẽ ra trước.

Hình dung: chồng đĩa. Đặt đĩa lên trên cùng (\`push\`), lấy cũng từ trên cùng (\`pop\`).

\`\`\`
push(1) push(2) push(3)        pop() -> 3
                                pop() -> 2
   [3] <- top                   pop() -> 1
   [2]
   [1]
\`\`\`

### 1.1. 💡 Trực giác — vì sao LIFO lại có mặt khắp nơi

Chồng đĩa là minh hoạ truyền thống, nhưng LIFO xuất hiện vì một lý do sâu hơn: **"việc bắt đầu sau phải kết thúc trước"**. Hai hệ thống điển hình:

- **Gọi hàm**: hàm \`A\` gọi \`B\`, \`B\` gọi \`C\`. \`C\` chạy xong trước, rồi \`B\`, rồi \`A\`. Đây là **call stack** của runtime — quản lý tự động bằng stack thật trong CPU.
- **Mở ngoặc**: \`( [ { ... } ] )\` — ngoặc mở **sau cùng** (\`{\`) phải đóng **trước nhất** (\`}\`). Bất kỳ chuỗi lồng nhau nào (HTML tag, JSON, parens) đều theo cấu trúc này.

Walk-through số: chuỗi \`push(5), push(8), push(2), pop(), push(7), pop(), pop()\` cho dãy giá trị nào?

| Bước | Thao tác | Stack (từ đáy → đỉnh) | Giá trị pop ra |
|------|----------|----------------------|----------------|
| 0 | init | \`[]\` | — |
| 1 | push(5) | \`[5]\` | — |
| 2 | push(8) | \`[5, 8]\` | — |
| 3 | push(2) | \`[5, 8, 2]\` | — |
| 4 | pop | \`[5, 8]\` | **2** |
| 5 | push(7) | \`[5, 8, 7]\` | — |
| 6 | pop | \`[5, 8]\` | **7** |
| 7 | pop | \`[5]\` | **8** |

Thứ tự pop ra: \`2, 7, 8\` — **đảo ngược** thứ tự push (trong cùng cụm). Tính chất này là nền tảng cho mọi ứng dụng stack ở mục 4.

### 1.2. ❓ Câu hỏi tự nhiên

- **"Stack là ADT hay cấu trúc dữ liệu?"** — **ADT**. Chỉ định nghĩa thao tác (\`push\`/\`pop\`/\`peek\`/\`isEmpty\`) chứ không quy định cách lưu. Cài đặt cụ thể có thể là array hoặc linked list (xem mục 3).
- **"Vì sao chỉ thao tác ở đỉnh, không cho phép truy cập giữa?"** — Hạn chế này **chính là tính năng**. ADT càng đơn giản, càng dễ tối ưu và dễ chứng minh tính đúng đắn. Nếu cần truy cập giữa → bạn cần \`List\` hoặc \`Array\`, không phải Stack.
- **"\`peek\` khác \`pop\` thế nào?"** — \`peek\` đọc đỉnh nhưng **không gỡ ra**, stack giữ nguyên. \`pop\` đọc đỉnh VÀ gỡ. Khi chỉ cần xem để quyết định bước tiếp theo (vd kiểm tra ngoặc), \`peek\` an toàn hơn.

## 2. Các thao tác

| Thao tác | Mô tả | Big-O |
| --- | --- | --- |
| \`push(x)\` | Thêm \`x\` vào đỉnh | $O(1)$ |
| \`pop()\` | Lấy ra phần tử ở đỉnh | $O(1)$ |
| \`peek()\` / \`top()\` | Xem phần tử đỉnh (không lấy ra) | $O(1)$ |
| \`isEmpty()\` | Stack có rỗng không | $O(1)$ |
| \`size()\` | Số phần tử hiện tại | $O(1)$ |

## 3. Cài đặt

### 3.1. Dùng array (động)

\`\`\`
class Stack:
    arr = []          # dynamic array
    push(x):  arr.append(x)
    pop():    return arr.removeLast()
    peek():   return arr[len(arr)-1]
    isEmpty(): return len(arr) == 0
\`\`\`

- Tất cả $O(1)$ amortized.
- Đơn giản, cache-friendly.


### 3.2. Dùng linked list

\`\`\`
class Stack:
    head = null
    push(x):
        newNode = Node(x); newNode.next = head; head = newNode
    pop():
        v = head.value; head = head.next; return v
    peek():
        return head.value
\`\`\`

- Tất cả $O(1)$ thật sự (không cần resize).
- Tốn thêm bộ nhớ cho con trỏ.

## 4. Ứng dụng tiêu biểu

### 4.1. Function call stack
Khi gọi hàm, hệ thống đẩy thông tin (địa chỉ trả về, biến cục bộ) vào stack. Khi \`return\`, pop ra. Đệ quy quá sâu → tràn stack (stack overflow).

### 4.2. Kiểm tra ngoặc cân bằng
Duyệt chuỗi, gặp ngoặc mở thì \`push\`, gặp ngoặc đóng thì \`pop\` và so khớp.

\`\`\`
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
\`\`\`
$O(n)$.

### 4.3. Đảo ngược chuỗi / mảng
Push từng phần tử rồi pop → thứ tự ngược lại.

### 4.4. Tính biểu thức (postfix)
Biểu thức \`2 3 + 4 *\` được tính bằng stack: gặp số thì push, gặp toán tử thì pop 2 số, tính, push lại kết quả.

### 4.5. Undo/Redo
Mỗi hành động đẩy vào stack \`undo\`; khi undo, pop và đẩy vào stack \`redo\`.

### 4.6. DFS (Depth-First Search)
Duyệt đồ thị theo chiều sâu dùng stack thay vì đệ quy.

### 4.7. Walk-through — kiểm tra ngoặc cân bằng

Cho chuỗi \`s = "({[]})"\`. Trace từng ký tự:

| Bước | Ký tự | Loại | Hành động | Stack sau bước |
|------|-------|------|-----------|----------------|
| 0 | — | init | — | \`[]\` |
| 1 | \`(\` | mở | push | \`[(]\` |
| 2 | \`{\` | mở | push | \`[(, {]\` |
| 3 | \`[\` | mở | push | \`[(, {, []\` |
| 4 | \`]\` | đóng | pop \`[\`, so khớp \`[\` == pairs[\`]\`] ✓ | \`[(, {]\` |
| 5 | \`}\` | đóng | pop \`{\`, so khớp ✓ | \`[(]\` |
| 6 | \`)\` | đóng | pop \`(\`, so khớp ✓ | \`[]\` |
| — | eof | — | stack rỗng → hợp lệ | — |

Ngược lại, với \`"([)]"\`:

| Bước | Ký tự | Hành động | Stack |
|------|-------|-----------|-------|
| 1 | \`(\` | push | \`[(]\` |
| 2 | \`[\` | push | \`[(, []\` |
| 3 | \`)\` | pop \`[\`, so khớp với \`pairs[)] = (\` → **không khớp** | → trả \`false\` |

Đây là vì sao stack cần thiết: kiểm "ngoặc đóng có khớp với ngoặc mở **gần nhất** chưa đóng" — và "gần nhất" chính là đỉnh stack.

### 4.8. ❓ Câu hỏi tự nhiên về ứng dụng

- **"Tại sao backtrack/DFS dùng stack mà BFS dùng queue?"** — DFS đi sâu trước → khi gặp ngã rẽ, "ghi nhớ" các nhánh khác để quay lại sau. Nhánh **vừa ghi nhớ phải xét trước** (sâu trước) → LIFO → stack. Đệ quy thực ra là stack ngầm.
- **"Postfix có gì hay mà phải dùng?"** — Không có dấu ngoặc, không cần biết độ ưu tiên — chỉ cần stack 1 chiều là tính được. CPU/máy ảo (JVM, Python bytecode) bên trong dùng postfix-like operations chính vì đơn giản này.
- **"Undo/Redo cần 2 stack?"** — Đúng. Stack \`undo\` lưu lịch sử các action. Khi user undo: pop action từ \`undo\`, đảo ngược nó, **push vào stack \`redo\`**. Khi user redo: pop từ \`redo\` đẩy lại sang \`undo\`. Khi có action **mới**: clear \`redo\` (vì nhánh tương lai cũ không còn ý nghĩa).

## 5. Cạm bẫy

- **Pop trên stack rỗng** → lỗi runtime. Luôn kiểm tra \`isEmpty()\` trước.
- **Stack overflow**: đệ quy không có điều kiện dừng hoặc dữ liệu quá lớn.
- Cài đặt bằng array tĩnh → có thể tràn nếu vượt capacity.

### 5.1. ⚠ Lỗi thường gặp (bảng chi tiết)

| Lỗi | Hậu quả | Cách sửa |
|------|---------|----------|
| \`pop()\` / \`peek()\` không check \`isEmpty()\` | Crash (panic, index out of range, NPE) | Check \`if !stack.isEmpty()\` hoặc trả về \`(value, ok)\` style |
| Đệ quy quá sâu không có base case → **stack overflow** | Crash chương trình (thường ~10⁴-10⁵ frame tùy ngôn ngữ) | Đảm bảo base case đúng; với input rất lớn, chuyển sang stack tường minh (iteration) |
| Cài đặt bằng array tĩnh, không kiểm tra capacity | \`push\` ghi đè bộ nhớ kế bên → undefined behavior | Dùng dynamic array, hoặc kiểm \`size < capacity\` trước \`push\` |
| Khi cài Min Stack, quên rằng \`pop\` phải pop cả stack chính **lẫn** stack phụ | \`getMin()\` trả sai sau vài lần pop | Đảm bảo mọi thao tác \`pop\`/\`push\` đồng bộ trên cả 2 stack |
| Trong kiểm tra ngoặc: gặp ngoặc đóng mà stack rỗng → coi như hợp lệ | Chuỗi \`")("\` được tính là hợp lệ ❌ | Stack rỗng + gặp đóng → return \`false\` ngay |
| Trong kiểm tra ngoặc: kết thúc mà quên check stack có rỗng không | Chuỗi \`"((("\` bị coi là hợp lệ ❌ | Cuối hàm: \`return stack.isEmpty()\`, không phải \`return true\` |
| Dùng \`slice[:len-1]\` trong Go để "pop" nhưng giữ tham chiếu tới phần tử cuối | Phần tử bị giữ trong bộ nhớ (memory leak nhẹ với object lớn) | Gán \`slice[len-1] = zeroValue\` trước khi \`slice = slice[:len-1]\` |

### 5.2. 🔁 Tự kiểm tra

1. Dãy thao tác \`push(1), push(2), pop, push(3), pop, pop\`. Stack cuối cùng có gì? Pop ra lần lượt giá trị nào?
   <details><summary>Đáp án</summary>Trace: \`[]\` → \`[1]\` → \`[1,2]\` → \`[1]\` (pop=2) → \`[1,3]\` → \`[1]\` (pop=3) → \`[]\` (pop=1). Stack cuối rỗng. Thứ tự pop: **2, 3, 1**.</details>
2. Chuỗi \`"({[}])"\` có hợp lệ không? Trace bằng stack.
   <details><summary>Đáp án</summary>\`(\` push → \`[(]\`. \`{\` push → \`[(, {]\`. \`[\` push → \`[(, {, []\`. Gặp \`}\` → pop đỉnh \`[\`, so với \`pairs[}] = {\` → **không khớp** → \`false\`. Chuỗi không hợp lệ vì các ngoặc lồng chéo nhau.</details>
3. Vì sao đệ quy fibonacci \`fib(n) = fib(n-1) + fib(n-2)\` với $n = 10000$ gây stack overflow, trong khi vòng for tính được dễ dàng?
   <details><summary>Đáp án</summary>Mỗi lần gọi đệ quy đẩy 1 frame vào **call stack** của runtime. Với $n = 10000$, độ sâu đệ quy ~10000 frame, vượt giới hạn call stack (~10000 trong Java/Go, ~1000 trong Python). Vòng for chỉ dùng 1 frame + vài biến local → không phụ thuộc $n$.</details>

### 5.3. 📝 Tóm tắt mục — Stack

- Stack là **ADT** theo nguyên tắc **LIFO**; thao tác chính: \`push\`, \`pop\`, \`peek\`, \`isEmpty\` — tất cả $O(1)$.
- Cài đặt: **dynamic array** (cache-friendly, $O(1)$ amortized) hoặc **linked list** ($O(1)$ thật, tốn thêm con trỏ).
- Ứng dụng cốt lõi: **call stack** runtime, **kiểm tra ngoặc cân bằng**, **postfix evaluation**, **undo/redo**, **DFS**, khử đệ quy.
- Bẫy thường gặp: pop trên rỗng, stack overflow do đệ quy, quên check rỗng cuối hàm kiểm tra ngoặc, tràn array tĩnh.
- Quy luật: bất cứ khi nào bài toán có cấu trúc "lồng nhau" hoặc "việc bắt đầu sau phải xong trước" → nghĩ tới stack.

## 6. Thực hành: dùng trong code thật

> 💡 **§4 liệt kê ứng dụng stack. Mục này là code chạy được cho 3 cái thực dụng nhất: kiểm tra ngoặc (mọi linter/parser), undo/redo (mọi editor), khử đệ quy (tránh stack overflow).** Trong Go, stack chỉ là **slice + append/pop** — không cần kiểu riêng. Code dưới đây \`go run\` được.

### 6.1. Mini-project A — Kiểm tra ngoặc cân bằng (mọi parser/linter)

§4.2 walk-through bằng tay. Đây là code: validate \`() [] {}\` lồng đúng — nền của mọi trình kiểm tra cú pháp JSON/HTML/code. Mở thì **push**, đóng thì **pop và khớp loại**:

\`\`\`go
func validBrackets(s string) bool {
	pairs := map[rune]rune{')': '(', ']': '[', '}': '{'}
	var st []rune // slice làm stack
	for _, c := range s {
		switch c {
		case '(', '[', '{':
			st = append(st, c) // push
		case ')', ']', '}':
			if len(st) == 0 || st[len(st)-1] != pairs[c] {
				return false // không có mở tương ứng, hoặc sai loại (vd "([)]")
			}
			st = st[:len(st)-1] // pop
		}
	}
	return len(st) == 0 // stack rỗng = mọi mở đều đã đóng
}
\`\`\`

\`"([{}])"\` → \`true\`; \`"([)]"\` → \`false\` (sai lồng); \`"((("\` → \`false\` (thiếu đóng). LIFO đúng vì ngoặc **đóng gần nhất phải khớp mở gần nhất** — chính là tính chất "lồng nhau" (§1.1).

### 6.2. Mini-project B — Undo/Redo bằng HAI stack

Mọi editor (Word, VS Code, Photoshop) dùng 2 stack: \`undo\` (trạng thái quá khứ), \`redo\` (trạng thái vừa hoàn tác). Thao tác mới **xóa nhánh redo**:

\`\`\`go
type Editor struct {
	text       string
	undo, redo []string
}

func (e *Editor) Type(s string) {
	e.undo = append(e.undo, e.text) // lưu trạng thái trước khi đổi
	e.redo = nil                    // gõ mới → nhánh redo cũ vô nghĩa, xóa
	e.text += s
}
func (e *Editor) Undo() {
	if len(e.undo) == 0 { return }
	e.redo = append(e.redo, e.text)        // trạng thái hiện tại sang redo
	e.text = e.undo[len(e.undo)-1]         // quay về trạng thái trước
	e.undo = e.undo[:len(e.undo)-1]
}
func (e *Editor) Redo() {
	if len(e.redo) == 0 { return }
	e.undo = append(e.undo, e.text)
	e.text = e.redo[len(e.redo)-1]
	e.redo = e.redo[:len(e.redo)-1]
}
\`\`\`

\`Type("Hello"); Type(" World")\` → \`"Hello World"\`; \`Undo()\` → \`"Hello"\`; \`Redo()\` → \`"Hello World"\`. LIFO đúng vì undo luôn hoàn tác **việc gần nhất trước**.

> ⚠ **Bẫy — thao tác mới PHẢI xóa stack redo.** Sau khi undo vài bước rồi gõ thứ mới, lịch sử redo cũ không còn nối tiếp được → phải \`redo = nil\`. Quên bước này = redo ra trạng thái "lai" sai. Đây là lỗi kinh điển khi tự làm undo/redo.

### 6.3. Mini-project C — Khử đệ quy bằng stack tường minh

§4.1 + Bài 5: đệ quy sâu → **stack overflow**. Giải pháp: tự quản stack. Ví dụ DFS đồ thị (thay vì đệ quy):

\`\`\`go
func dfsIterative(adj map[int][]int, start int) []int {
	visited := map[int]bool{}
	var order []int
	stack := []int{start} // stack tường minh thay cho call stack
	for len(stack) > 0 {
		u := stack[len(stack)-1]
		stack = stack[:len(stack)-1] // pop
		if visited[u] {
			continue
		}
		visited[u] = true
		order = append(order, u)
		for _, v := range adj[u] {
			if !visited[v] {
				stack = append(stack, v) // push hàng xóm
			}
		}
	}
	return order
}
\`\`\`

Lợi: không giới hạn bởi stack đệ quy của runtime (Go goroutine stack lớn nhưng vẫn hữu hạn) → xử lý được đồ thị/cây cực sâu mà không crash. Đây là lý do bài "cây 1 triệu tầng" phải dùng stack lặp ([nối Tree §10.4](../../02-Intermediate/lesson-01-tree/)).

### 6.4. 🔁 Tự kiểm tra

> 1. \`validBrackets("([)]")\` trả \`false\` ở bước nào?
>    <details><summary>Đáp án</summary>Khi gặp \`)\`: đỉnh stack là \`[\` (mở gần nhất), nhưng \`)\` cần khớp \`(\`. \`st[top] != pairs[')']\` → \`false\`. Stack bắt đúng lỗi lồng chéo.</details>
> 2. Vì sao \`Type\` phải set \`redo = nil\`?
>    <details><summary>Đáp án</summary>Sau undo vài bước, redo chứa các trạng thái "tương lai cũ". Gõ thứ mới = tạo nhánh lịch sử khác → các trạng thái redo cũ không còn nối tiếp hợp lệ. Không xóa → Redo ra trạng thái sai.</details>
> 3. Khi nào nên khử đệ quy thành stack lặp?
>    <details><summary>Đáp án</summary>Khi độ sâu đệ quy có thể rất lớn (cây/đồ thị sâu, danh sách dài) → nguy cơ stack overflow. Stack tường minh dùng heap, không bị giới hạn call-stack của runtime.</details>

### 6.5. 📝 Tóm tắt mục 6

- Trong Go: stack = **slice** + \`append\` (push) + \`s[:len-1]\` (pop). Không cần kiểu riêng.
- **Bracket matching**: push mở, pop+khớp khi đóng, cuối phải rỗng — nền của parser/linter.
- **Undo/Redo** = 2 stack; thao tác mới **xóa redo** (bẫy kinh điển).
- **Khử đệ quy** bằng stack tường minh → tránh stack overflow trên dữ liệu sâu.

## Bài tập

1. Viết hàm kiểm tra một chuỗi ngoặc \`()[]{}\` có hợp lệ không.
2. Cài đặt một stack hỗ trợ \`getMin()\` trả về phần tử nhỏ nhất trong $O(1)$ (gợi ý: dùng stack phụ).
3. Tính giá trị một biểu thức postfix (RPN). Ví dụ \`"2 3 + 4 *"\` = 20.
4. Chuyển biểu thức infix \`(a + b) * c\` sang postfix dùng stack (thuật toán Shunting-yard, mức ý tưởng).
5. Vì sao đệ quy có thể được "khử" (chuyển thành lặp) bằng stack tường minh?

## Lời giải chi tiết

### Bài 1 — Kiểm tra ngoặc cân bằng
Gặp ngoặc mở → \`push\`. Gặp ngoặc đóng → \`pop\` và so khớp. Cuối cùng stack phải rỗng.

\`\`\`go
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
\`\`\`
$O(n)$.

### Bài 2 — Min stack với \`getMin()\` $O(1)$
Duy trì stack phụ chỉ chứa **giá trị min hiện tại** ứng với mỗi vị trí.

\`\`\`go
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
\`\`\`
Tất cả $O(1)$. Bộ nhớ phụ $O(n)$.

### Bài 3 — Tính biểu thức postfix
Gặp số: push. Gặp toán tử: pop 2 số, tính, push lại.

\`\`\`
"2 3 + 4 *"
→ push 2, push 3 → [2,3]
→ '+' → pop 3, pop 2, 2+3=5, push → [5]
→ push 4 → [5,4]
→ '*' → pop 4, pop 5, 5*4=20, push → [20]
→ kết quả: 20
\`\`\`

### Bài 4 — Infix → postfix (Shunting-yard, ý tưởng)
Hai cấu trúc: stack toán tử + queue output.
- Số → đẩy thẳng ra output.
- Toán tử: trong khi đỉnh stack có toán tử **ưu tiên ≥** → pop ra output; rồi push toán tử mới.
- \`(\` → push; \`)\` → pop tới khi gặp \`(\`.
- Hết input → pop hết stack ra output.

\`(a + b) * c\` → output \`a b + c *\`.

### Bài 5 — Vì sao đệ quy "khử" được bằng stack tường minh?

Đệ quy thực chất dùng **call stack** ngầm của hệ thống: mỗi lần gọi là một frame stack. Ta có thể mô phỏng bằng stack tường minh trong code — lưu trạng thái (biến cục bộ, "bước nào"), đẩy/lấy như call stack. Lợi ích: tránh stack overflow khi đệ quy quá sâu, kiểm soát bộ nhớ tốt hơn.

Ví dụ DFS đệ quy ↔ DFS dùng stack tường minh là cùng một thuật toán.

## Code & Minh họa

- [solutions.go](./solutions.go) — đầy đủ các bài.
- [visualization.html](./visualization.html) — minh họa push/pop và kiểm tra ngoặc cân bằng từng bước.

## Bài tiếp theo

[Lesson 05 — Queue](../lesson-05-queue/)
`;
