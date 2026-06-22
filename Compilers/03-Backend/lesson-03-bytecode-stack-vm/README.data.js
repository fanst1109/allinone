// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: Compilers/03-Backend/lesson-03-bytecode-stack-vm/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 03 (L13) — Bytecode & Máy ảo Stack (Stack-based VM)

> Tier 3 — Backend. Đây là bài **flagship**: ta sẽ **biên dịch** mã nguồn xuống một chuỗi lệnh phẳng gọi là **bytecode**, rồi **chạy** chuỗi lệnh đó trên một **máy ảo (virtual machine)** tự viết. Đây là bước nhảy từ "thông dịch cây" (chậm) sang "biên dịch + chạy máy ảo" (nhanh) — đúng cách Python, Java, C#, Lua, WebAssembly thực sự hoạt động.

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Hiểu **vì sao tree-walking interpreter (L09) chậm** và bytecode + VM nhanh hơn ở đâu, nhanh bao nhiêu.
- Biết **bytecode là gì** (opcode + toán hạng), phân biệt **stack machine** vs **register machine**, đọc/viết được tập lệnh tối thiểu.
- **Biên dịch AST → bytecode** bằng duyệt post-order (hậu thứ tự), tự tay ra được \`(2+3)*4 → PUSH 2; PUSH 3; ADD; PUSH 4; MUL\`.
- **Chạy VM**: hiểu vòng lặp fetch-decode-execute, con trỏ lệnh (PC), ngăn xếp toán hạng; vẽ được trạng thái stack từng bước.
- Hiểu biến qua \`LOAD\`/\`STORE\` + bộ nhớ slot; thấy bytecode stack chính là **RPN (Reverse Polish Notation)**.
- So sánh tree-walking vs bytecode vs native, hiểu **JIT** (V8, JVM) và vì sao bytecode **portable** (JVM, WASM).

## Kiến thức tiền đề

- [L11 — IR (Three-Address Code)](../lesson-01-ir-three-address/) — IR là biểu diễn trung gian; bytecode là một dạng IR rất gần với thực thi.
- [L09 — Tree-Walking Interpreter](../../02-Semantics/lesson-04-tree-walking-interpreter/) — bài này nâng cấp trực tiếp từ tree-walking; nên đọc trước để thấy cái ta đang thay thế.
- [DataStructures — Stack (ngăn xếp)](../../../DataStructures/01-Basic/lesson-04-stack/) — VM trong bài là một stack machine; phải nắm \`push\`/\`pop\`/\`top\` LIFO.
- [Operating Systems](../../../OperatingSystems/) — con trỏ lệnh (PC) và call stack của CPU thật là nguồn cảm hứng trực tiếp cho VM ảo.

---

## 1. Vì sao học bytecode? Python/Java thực ra chạy cái gì?

> 💡 **Trực giác / Hình dung.** Tree-walking giống như **đọc công thức nấu ăn từ đầu mỗi lần xào**: mỗi lần gặp \`(2+3)*4\` bạn lại lần mò từ gốc cây cú pháp xuống lá, hỏi "node này là gì? con trái? con phải?". Bytecode giống như **viết sẵn checklist các bước bằng tay** một lần, rồi cứ thế làm theo — không phải phân tích lại cấu trúc nữa.

### 1.1. Câu hỏi mở bài: \`.pyc\` và \`.class\` là gì?

Khi chạy \`python script.py\`, có thể bạn để ý thư mục \`__pycache__/\` xuất hiện với file \`script.cpython-311.pyc\`. Khi biên dịch Java \`javac App.java\`, ra file \`App.class\`. **Hai file đó chứa gì?**

Câu trả lời cụ thể: chúng **không** chứa mã máy (machine code) của CPU, mà chứa **bytecode** — chuỗi lệnh của một **máy ảo**:

- \`.pyc\` = bytecode cho **CPython VM**.
- \`.class\` = bytecode cho **JVM (Java Virtual Machine)**.

CPU vật lý của bạn (x86, ARM) **không hiểu** bytecode này. Phải có một chương trình — **máy ảo** — đọc từng lệnh bytecode và thực thi. Chính máy ảo đó là thứ bạn cài khi cài "Python" hay "Java".

Ta có thể nhìn tận mắt bytecode Python:

\`\`\`python
import dis
def f(): return (2 + 3) * 4
dis.dis(f)
\`\`\`

In ra (rút gọn):

\`\`\`
  LOAD_CONST   2       # đẩy 2 lên stack
  LOAD_CONST   3       # đẩy 3 lên stack
  BINARY_ADD           # pop 2 số, đẩy tổng
  LOAD_CONST   4       # đẩy 4
  BINARY_MULTIPLY      # pop 2 số, đẩy tích
  RETURN_VALUE
\`\`\`

Đây **chính xác** là tập lệnh ta sẽ tự xây trong bài (chỉ khác tên: \`LOAD_CONST\` ↔ \`PUSH\`, \`BINARY_ADD\` ↔ \`ADD\`). CPython là một **stack-based VM** — đúng kiểu ta học hôm nay.

### 1.2. Vì sao tree-walking chậm?

Ở [L09](../../02-Semantics/lesson-04-tree-walking-interpreter/), interpreter chạy bằng cách **đệ quy duyệt AST** mỗi lần thực thi. Với \`(2+3)*4\` cây là:

\`\`\`
        (*)
       /   \\
     (+)    4
    /   \\
   2     3
\`\`\`

Mỗi lần đánh giá, \`eval(node)\` phải:

1. **Kiểm tra kiểu node** (\`switch node.type\` hoặc \`if node instanceof ...\`) — một lần rẽ nhánh.
2. **Gọi đệ quy** \`eval(con_trái)\`, \`eval(con_phải)\` — chi phí gọi hàm (push frame, return).
3. **Đọc con trỏ** đi xuống các node con nằm rải rác trong heap → **cache miss** liên tục.

Vấn đề cốt lõi: **mọi thứ lặp lại mỗi lần**. Trong vòng lặp chạy 1 triệu lần:

\`\`\`
for i := 0; i < 1_000_000; i++ {
    eval(astCof("(2+3)*4"))   // duyệt lại NGUYÊN cây 1 triệu lần
}
\`\`\`

→ 1 triệu lần phân tích cấu trúc cây giống hệt nhau. Phí.

> ❓ **Câu hỏi tự nhiên của người đọc.**
> - *"Tree-walking phân tích lại cây — bytecode thì không à?"* Đúng. Việc "node này là phép \`+\`, con trái là \`2\`..." được làm **một lần** lúc compile, kết tinh thành lệnh \`ADD\`. Lúc chạy chỉ còn đọc lệnh \`ADD\` (một số nguyên) rồi cộng — không còn rẽ nhánh theo cấu trúc cây.
> - *"Vậy bytecode bỏ qua bước parse?"* Không, vẫn parse → AST như cũ. Bytecode thêm **một bước biên dịch** AST → lệnh phẳng. Bù lại lúc chạy nhanh hơn nhiều, nên đáng khi code chạy nhiều lần.

### 1.3. Bytecode + VM nhanh hơn ở đâu?

| | Tree-walking | Bytecode + VM |
| --- | --- | --- |
| Đơn vị thực thi | node cây (rải rác heap) | lệnh trong **mảng phẳng** (liền nhau → cache-friendly) |
| Phân tích cấu trúc | mỗi lần chạy | một lần lúc compile |
| Điều khiển | đệ quy hàm | **một vòng \`for\`** (fetch-decode-execute) |
| Tốc độ điển hình | 1× (gốc) | ~3–10× nhanh hơn (cùng ngôn ngữ) |

Bytecode còn cho một lợi ích lớn khác: **tính khả chuyển (portability)**. File \`.class\` chạy được trên mọi máy có JVM — Windows, Mac, Linux, ARM, x86 — vì JVM mới là thứ phụ thuộc nền tảng, còn bytecode thì không. "Write once, run anywhere".

> 📝 **Tóm tắt mục 1.**
> - \`.pyc\`/\`.class\` = **bytecode**, không phải machine code. Cần **máy ảo** đọc & chạy.
> - Tree-walking chậm vì **phân tích lại cây mỗi lần chạy** + đệ quy + cache miss.
> - Bytecode dồn việc phân tích cấu trúc vào **một lần compile**; lúc chạy chỉ là một vòng lặp trên mảng lệnh phẳng → nhanh hơn 3–10×.
> - Bytecode **portable**: cùng một file chạy mọi nền tảng có VM tương ứng.

---

## 2. Bytecode là gì?

> 💡 **Trực giác.** Bytecode là **danh sách việc cần làm viết bằng những lệnh siêu đơn giản**, mỗi lệnh chỉ làm đúng một thao tác nhỏ. Giống dãy nút bấm trên máy tính bỏ túi: "bấm 2", "bấm 3", "bấm +". Máy không cần hiểu "biểu thức" — chỉ cần làm tuần tự từng nút.

### 2.1. Định nghĩa tự đủ

**(a) Là gì.** **Bytecode** là một **chuỗi lệnh (instruction) tuyến tính, mỗi lệnh gồm một mã thao tác (opcode) và 0 hoặc nhiều toán hạng (operand)**, được thiết kế cho một **máy ảo** chứ không cho CPU vật lý.

**(b) Vì sao tồn tại / vì sao cần.** AST tốt cho phân tích ngữ nghĩa nhưng tệ cho thực thi nhanh (mục 1.2). Machine code thật thì nhanh nhưng **không portable** (mỗi CPU một tập lệnh) và khó sinh. Bytecode là **điểm cân bằng**: phẳng & nhanh như machine code, nhưng độc lập nền tảng và dễ sinh từ AST.

**(c) Ví dụ trực giác bằng số.** Biểu thức \`(2+3)*4\` → bytecode 5 lệnh: \`PUSH 2 · PUSH 3 · ADD · PUSH 4 · MUL\`. Mỗi lệnh một dòng, chạy từ trên xuống cho ra \`20\`. Không còn cây, chỉ còn danh sách.

### 2.2. Cấu trúc một lệnh: opcode + operand

Một lệnh = **opcode** (làm gì) + **operand** (làm với cái gì):

\`\`\`
PUSH   2          ← opcode = PUSH, operand = 2  (lệnh có toán hạng)
ADD               ← opcode = ADD,  không operand (lấy toán hạng từ stack)
STORE  x          ← opcode = STORE, operand = tên/slot biến x
\`\`\`

Cái tên "**byte**code" đến từ chỗ trong VM thật, mỗi opcode được mã hóa thành **một byte** (0–255), ví dụ JVM: \`iadd = 0x60\`, \`bipush = 0x10\`. Trong bài, để dễ đọc, ta giữ opcode dạng chuỗi (\`"ADD"\`) và lệnh là một object \`{op, arg}\` — bản chất không đổi.

### 2.3. Stack machine vs Register machine

Có **hai kiểu kiến trúc máy ảo**, khác nhau ở **chỗ chứa giá trị trung gian**:

| | **Stack machine** | **Register machine** |
| --- | --- | --- |
| Chứa toán hạng ở | một **ngăn xếp (stack)** ẩn | các **thanh ghi (register)** đánh số |
| \`2 + 3\` thành | \`PUSH 2; PUSH 3; ADD\` | \`LOAD r1, 2; LOAD r2, 3; ADD r3, r1, r2\` |
| Lệnh | ngắn, **không cần nêu địa chỉ** | dài hơn, phải nêu register nguồn/đích |
| Ví dụ thực tế | **JVM, CPython, WASM, .NET CLR** | **Lua 5, Dalvik (Android), Erlang BEAM** |
| Ưu | sinh code dễ, lệnh gọn, dễ port | ít lệnh hơn cho cùng việc, gần CPU thật |

Bài này chọn **stack machine** vì nó **dễ sinh code nhất** (compile = duyệt cây post-order, sẽ thấy ở mục 4) và là kiến trúc của đa số VM phổ biến (JVM, CPython, WASM).

> ⚠ **Lỗi thường gặp.** "Stack machine không có thanh ghi nên chậm hơn." Không hẳn — trade-off khác nhau: stack machine **nhiều lệnh hơn** nhưng **mỗi lệnh nhỏ và đơn giản hơn**; register machine **ít lệnh hơn** nhưng mỗi lệnh phải giải mã thêm địa chỉ register. JIT (mục 7) xóa nhòa khác biệt này khi dịch tiếp xuống native.

### 2.4. Bốn (và hơn) ví dụ opcode

Để chắc bạn "đọc" được opcode, đây là vài ví dụ với ý nghĩa:

1. **\`PUSH 7\`** — đẩy hằng \`7\` lên đỉnh stack. (Stack: \`[]\` → \`[7]\`.)
2. **\`ADD\`** — pop 2 giá trị đỉnh, đẩy tổng. (Stack: \`[7, 3]\` → \`[10]\`.)
3. **\`STORE x\`** — pop đỉnh, lưu vào biến \`x\` trong bộ nhớ. (Stack \`[10]\` → \`[]\`; bộ nhớ: \`x=10\`.)
4. **\`LOAD x\`** — đọc biến \`x\`, đẩy giá trị lên stack. (Bộ nhớ \`x=10\`; stack \`[]\` → \`[10]\`.)
5. **\`PRINT\`** — pop đỉnh, in ra. (Stack \`[10]\` → \`[]\`; output: \`10\`.)
6. **\`SUB\`** — pop \`b\` rồi \`a\`, đẩy \`a − b\`. (Stack \`[10, 4]\` → \`[6]\`.)

> 🔁 **Dừng lại tự kiểm tra.** Stack đang là \`[5, 2]\` (đỉnh là \`2\`). Sau khi chạy \`SUB\` rồi \`PUSH 10\` rồi \`MUL\`, stack là gì?
> <details><summary>Đáp án</summary>
>
> - \`SUB\`: pop \`b=2\`, pop \`a=5\`, đẩy \`a−b = 3\`. Stack: \`[3]\`.
> - \`PUSH 10\`: Stack \`[3, 10]\`.
> - \`MUL\`: pop 2, đẩy \`3*10 = 30\`. Stack: \`[30]\`.
> </details>

> 📝 **Tóm tắt mục 2.** Bytecode = chuỗi lệnh phẳng (opcode + operand) cho máy ảo. Stack machine giấu toán hạng trong một ngăn xếp ẩn (lệnh gọn); register machine dùng thanh ghi (lệnh ít hơn nhưng dài hơn). Ta dùng stack machine vì compile cực dễ.

---

## 3. Stack-based VM và tập lệnh tối thiểu

> 💡 **Trực giác.** Hình dung một **chồng đĩa** ([DataStructures Stack](../../../DataStructures/01-Basic/lesson-04-stack/)): mọi phép tính chỉ được "với" tới **vài đĩa trên cùng**. \`ADD\` = lấy 2 đĩa trên cùng, cộng, đặt lại 1 đĩa kết quả lên. Toàn bộ VM chỉ là quy luật "lệnh nào thì thêm/bớt đĩa thế nào".

### 3.1. Ngăn xếp toán hạng (operand stack)

VM stack có một cấu trúc trung tâm: **operand stack** — ngăn xếp LIFO chứa các giá trị trung gian. Quy ước:

- **PUSH** = đặt một giá trị lên **đỉnh**.
- **POP** = lấy giá trị **đỉnh** ra.
- Lệnh số học (\`ADD\`, \`SUB\`...) = **pop các toán hạng, tính, push kết quả**.

Vì sao dùng stack mà không dùng biến tạm có tên? Vì biểu thức lồng nhau **tự nhiên có cấu trúc LIFO**: con trong cùng tính trước, dùng xong "trả" kết quả cho cha. Stack khớp hoàn hảo với đệ quy của cây biểu thức (mục 4).

### 3.2. Tập lệnh tối thiểu (instruction set) của VM trong bài

| Opcode | Operand | Tác động lên stack | Mô tả |
| --- | --- | --- | --- |
| \`PUSH n\` | hằng \`n\` | \`… → … n\` | đẩy hằng số \`n\` |
| \`LOAD x\` | tên biến \`x\` | \`… → … v\` | đọc biến \`x\` (= \`v\`), đẩy lên |
| \`STORE x\` | tên biến \`x\` | \`… v → …\` | pop đỉnh, gán vào biến \`x\` |
| \`ADD\` | — | \`… a b → … (a+b)\` | cộng |
| \`SUB\` | — | \`… a b → … (a−b)\` | trừ (\`a\` dưới, \`b\` trên) |
| \`MUL\` | — | \`… a b → … (a·b)\` | nhân |
| \`DIV\` | — | \`… a b → … (a÷b)\` | chia (\`a\` dưới, \`b\` trên) |
| \`PRINT\` | — | \`… v → …\` | pop đỉnh, in ra output |

Tám lệnh này đủ để biên dịch & chạy mọi biểu thức số học có biến và lệnh in. (L14 sẽ thêm \`JMP\`/\`JMP_IF_FALSE\` cho \`if\`/\`while\`.)

> ⚠ **Lỗi thường gặp — thứ tự toán hạng với phép không giao hoán.** Với \`ADD\`/\`MUL\` thứ tự không quan trọng (\`a+b = b+a\`). Nhưng với \`SUB\`/\`DIV\` thì **rất quan trọng**: quy ước là **toán hạng trái nằm DƯỚI, toán hạng phải nằm TRÊN**. Khi pop, ta lấy \`b\` (phải) ra trước, rồi \`a\` (trái), và tính \`a − b\`. Nếu lỡ tính \`b − a\` là sai dấu. Đây là lỗi #1 khi tự viết VM.

\`\`\`
Để tính 10 - 3:
  PUSH 10     stack: [10]
  PUSH 3      stack: [10, 3]   ← 3 ở trên
  SUB         pop b=3, pop a=10, push a-b = 7   ✓  (KHÔNG phải 3-10 = -7)
\`\`\`

> ❓ **Câu hỏi tự nhiên.**
> - *"VM stack này có phải cùng cái stack với call stack của hàm không?"* Không nhất thiết. Đây là **operand stack** (chứa giá trị trung gian của biểu thức). Call stack (chứa frame của lời gọi hàm) là một stack khác — sẽ gặp khi học hàm/đệ quy trong VM. Cả hai đều LIFO, đều lấy cảm hứng từ stack của CPU ([OS](../../../OperatingSystems/)).
> - *"Tại sao \`LOAD\`/\`STORE\` cần tên biến mà \`ADD\` thì không?"* Vì \`ADD\` luôn làm việc với 2 giá trị **trên đỉnh stack** (vị trí ngầm định). Còn biến nằm ở **bộ nhớ riêng** (mục 6), phải nêu tên/địa chỉ mới biết lấy cái nào.

> 📝 **Tóm tắt mục 3.** VM stack có một operand stack LIFO. 8 lệnh tối thiểu: \`PUSH/LOAD/STORE/ADD/SUB/MUL/DIV/PRINT\`. Số học = pop toán hạng → tính → push kết quả. Với \`SUB\`/\`DIV\`, trái dưới–phải trên, tính \`a (op) b\`.

---

## 4. Biên dịch AST → bytecode (duyệt post-order)

> 💡 **Trực giác.** Muốn nấu món "xào (cộng(2,3), 4)", bạn phải **chuẩn bị nguyên liệu trước khi xào**: sơ chế \`2\`, sơ chế \`3\`, **trộn** (cộng) ra hỗn hợp, sơ chế \`4\`, rồi **xào** (nhân). Tức là: làm xong **các con** rồi mới làm **cha**. Đó chính là duyệt **post-order (hậu thứ tự)** ([L06 — duyệt cây](../lesson-01-ir-three-address/) nhắc lại post-order trong ngữ cảnh IR).

### 4.1. Quy tắc sinh code (codegen)

Compile một node theo đệ quy, chia 2 trường hợp:

1. **Node lá là số \`n\`** → sinh \`PUSH n\`.
2. **Node lá là biến \`x\`** → sinh \`LOAD x\`.
3. **Node phép toán \`(left OP right)\`** → theo thứ tự:
   - \`compile(left)\`   ← sinh code đẩy giá trị trái lên stack
   - \`compile(right)\`  ← sinh code đẩy giá trị phải lên stack
   - phát opcode của \`OP\` (\`ADD\`/\`SUB\`/\`MUL\`/\`DIV\`)

Mấu chốt: opcode của cha được phát **sau** khi cả hai con đã phát xong → đảm bảo lúc chạy, khi gặp \`ADD\`, hai toán hạng **đã sẵn** trên đỉnh stack.

### 4.2. Walk-through đầy đủ: compile \`(2+3)*4\`

AST:

\`\`\`
        (*)               ← gốc: nhân
       /   \\
     (+)    4
    /   \\
   2     3
\`\`\`

Gọi \`compile(gốc *)\`. Đây là phép toán → compile con trái, con phải, rồi phát \`MUL\`. Bám sát từng lời gọi đệ quy (không bỏ bước nào):

| Bước | Lời gọi | Đây là gì | Phát ra |
| --- | --- | --- | --- |
| 1 | \`compile(*)\` | phép \`*\` → trước hết \`compile(con trái = +)\` | (chưa phát gì, đi xuống) |
| 2 | \`compile(+)\` | phép \`+\` → trước hết \`compile(con trái = 2)\` | (đi xuống) |
| 3 | \`compile(2)\` | lá số | \`PUSH 2\` |
| 4 | quay lại \`compile(+)\` | xong con trái → \`compile(con phải = 3)\` | (đi xuống) |
| 5 | \`compile(3)\` | lá số | \`PUSH 3\` |
| 6 | quay lại \`compile(+)\` | xong cả 2 con → phát opcode của \`+\` | \`ADD\` |
| 7 | quay lại \`compile(*)\` | xong con trái (\`+\`) → \`compile(con phải = 4)\` | (đi xuống) |
| 8 | \`compile(4)\` | lá số | \`PUSH 4\` |
| 9 | quay lại \`compile(*)\` | xong cả 2 con → phát opcode của \`*\` | \`MUL\` |

Ghép các dòng "Phát ra" theo thứ tự:

\`\`\`
PUSH 2
PUSH 3
ADD
PUSH 4
MUL
\`\`\`

Đây chính là bytecode đúng cho \`(2+3)*4\`. Chú ý nó là thứ tự **post-order** của cây: lá \`2\`, lá \`3\`, nút \`+\`, lá \`4\`, nút \`*\`.

### 4.3. Ba ví dụ compile nữa (để đủ ≥4)

**Ví dụ B — \`10 - 3 - 2\`** (phép trừ kết hợp trái: \`(10-3)-2\`):

\`\`\`
AST:        (-)
           /   \\
         (-)    2
        /   \\
      10     3

Bytecode:  PUSH 10 · PUSH 3 · SUB · PUSH 2 · SUB
\`\`\`

**Ví dụ C — \`2 * (3 + 4)\`** (ngoặc đổi hình dạng cây, chú ý khác ví dụ A):

\`\`\`
AST:     (*)
        /   \\
       2    (+)
           /   \\
          3     4

Bytecode:  PUSH 2 · PUSH 3 · PUSH 4 · ADD · MUL
\`\`\`

**Ví dụ D — \`print x + 1\`** (có biến và lệnh in):

\`\`\`
Statement PRINT bọc biểu thức (x + 1):

Bytecode:  LOAD x · PUSH 1 · ADD · PRINT
\`\`\`

> ⚠ **Lỗi thường gặp.** Phát opcode cha **trước** khi compile xong con → bytecode sai. Vd nếu phát \`MUL\` ngay rồi mới push toán hạng, lúc chạy \`MUL\` gặp stack rỗng → **stack underflow** (mục 5.4). Luôn: con trái → con phải → cha.

> 🔁 **Dừng lại tự kiểm tra.** Compile \`(8 - 2) * (1 + 5)\`.
> <details><summary>Đáp án</summary>
>
> Cây: gốc \`*\`, con trái \`(8-2)\`, con phải \`(1+5)\`. Post-order:
> \`PUSH 8 · PUSH 2 · SUB · PUSH 1 · PUSH 5 · ADD · MUL\`.
> Chạy thử: \`[8,2]→SUB→[6]\`, \`[6,1,5]→ADD→[6,6]\`, \`MUL→[36]\`. Kết quả \`36\` = \`6*6\` ✓.
> </details>

> 📝 **Tóm tắt mục 4.** Compile = duyệt **post-order**: với phép toán, compile con trái, compile con phải, rồi phát opcode. Lá số → \`PUSH\`, lá biến → \`LOAD\`. Bytecode chính là post-order traversal của AST.

---

## 5. Chạy VM: vòng lặp fetch-decode-execute

> 💡 **Trực giác.** VM chạy như một **người làm theo checklist**: ngón tay (con trỏ lệnh **PC**) chỉ vào dòng hiện tại, đọc dòng đó (**fetch**), hiểu nó bảo làm gì (**decode**), làm (**execute**), rồi **dời ngón tay xuống dòng tiếp**. Lặp tới khi hết checklist.

### 5.1. Vòng lặp lõi và con trỏ lệnh (PC)

**PC (program counter / instruction pointer)** = chỉ số của lệnh **sắp** chạy trong mảng bytecode. Vòng lặp:

\`\`\`
pc = 0
while pc < len(code):
    inst = code[pc]        # FETCH: lấy lệnh tại PC
    pc = pc + 1            # dời PC sang lệnh kế (mặc định tuần tự)
    switch inst.op:        # DECODE: lệnh này là gì?
        case PUSH:  stack.push(inst.arg)              # EXECUTE
        case LOAD:  stack.push(mem[inst.arg])
        case STORE: mem[inst.arg] = stack.pop()
        case ADD:   b=stack.pop(); a=stack.pop(); stack.push(a+b)
        case SUB:   b=stack.pop(); a=stack.pop(); stack.push(a-b)
        case MUL:   b=stack.pop(); a=stack.pop(); stack.push(a*b)
        case DIV:   b=stack.pop(); a=stack.pop(); stack.push(a/b)
        case PRINT: output(stack.pop())
\`\`\`

So với tree-walking (mục 1.2): không còn đệ quy theo cây, chỉ còn **một vòng \`while\` trên mảng phẳng**. PC tăng đều +1 (sau này \`JMP\` sẽ nhảy PC tới chỗ khác — L14).

> ❓ **Câu hỏi tự nhiên.** *"PC này giống Program Counter của CPU thật không?"* Đúng — đây là mô phỏng phần mềm của thanh ghi PC trong CPU vật lý (xem [OS](../../../OperatingSystems/)). CPU thật cũng fetch lệnh tại địa chỉ PC, decode, execute, tăng PC. VM ảo bắt chước y hệt, chỉ khác lệnh là bytecode thay vì machine code.

### 5.2. Walk-through đầy đủ: chạy \`PUSH 2; PUSH 3; ADD; PUSH 4; MUL\`

Mảng bytecode (index 0..4):

\`\`\`
[0] PUSH 2
[1] PUSH 3
[2] ADD
[3] PUSH 4
[4] MUL
\`\`\`

Vẽ stack **từng bước** (đỉnh stack ở bên phải):

| PC trước | Lệnh | Thao tác | Stack sau |
| :---: | --- | --- | --- |
| 0 | \`PUSH 2\` | đẩy \`2\` | \`[2]\` |
| 1 | \`PUSH 3\` | đẩy \`3\` | \`[2, 3]\` |
| 2 | \`ADD\` | pop \`b=3\`, pop \`a=2\`, đẩy \`a+b=5\` | \`[5]\` |
| 3 | \`PUSH 4\` | đẩy \`4\` | \`[5, 4]\` |
| 4 | \`MUL\` | pop \`b=4\`, pop \`a=5\`, đẩy \`a·b=20\` | \`[20]\` |

PC = 5 = hết mảng → dừng. **Kết quả cuối** = giá trị còn lại trên stack = **\`20\`**. Khớp \`(2+3)*4 = 20\` ✓.

### 5.3. Ba chương trình nữa (để đủ ≥4 ví dụ)

**Chương trình B — \`10 - 3 - 2\`** (\`PUSH 10 · PUSH 3 · SUB · PUSH 2 · SUB\`):

| Lệnh | Thao tác | Stack sau |
| --- | --- | --- |
| \`PUSH 10\` | đẩy 10 | \`[10]\` |
| \`PUSH 3\` | đẩy 3 | \`[10, 3]\` |
| \`SUB\` | pop 3, pop 10, đẩy \`10−3=7\` | \`[7]\` |
| \`PUSH 2\` | đẩy 2 | \`[7, 2]\` |
| \`SUB\` | pop 2, pop 7, đẩy \`7−2=5\` | \`[5]\` |

Kết quả \`5\` ✓ (chú ý kết hợp trái: \`(10-3)-2 = 5\`, không phải \`10-(3-2)=9\`).

**Chương trình C — gán & in: \`x = 6 * 7; print x\`**
Bytecode: \`PUSH 6 · PUSH 7 · MUL · STORE x · LOAD x · PRINT\`

| Lệnh | Thao tác | Stack | Bộ nhớ | Output |
| --- | --- | --- | --- | --- |
| \`PUSH 6\` | đẩy 6 | \`[6]\` | \`{}\` | |
| \`PUSH 7\` | đẩy 7 | \`[6, 7]\` | \`{}\` | |
| \`MUL\` | \`6*7=42\` | \`[42]\` | \`{}\` | |
| \`STORE x\` | pop 42 → \`x\` | \`[]\` | \`{x:42}\` | |
| \`LOAD x\` | đọc \`x\`, đẩy | \`[42]\` | \`{x:42}\` | |
| \`PRINT\` | pop, in | \`[]\` | \`{x:42}\` | \`42\` |

**Chương trình D — chia: \`20 / 4 + 1\`** (\`PUSH 20 · PUSH 4 · DIV · PUSH 1 · ADD\`):

| Lệnh | Thao tác | Stack sau |
| --- | --- | --- |
| \`PUSH 20\` | đẩy 20 | \`[20]\` |
| \`PUSH 4\` | đẩy 4 | \`[20, 4]\` |
| \`DIV\` | pop 4, pop 20, \`20/4=5\` | \`[5]\` |
| \`PUSH 1\` | đẩy 1 | \`[5, 1]\` |
| \`ADD\` | \`5+1=6\` | \`[6]\` |

Kết quả \`6\` ✓.

### 5.4. Hai lỗi runtime của VM: stack underflow & chia 0

> ⚠ **Stack underflow.** Nếu bytecode bị lỗi (vd \`ADD\` khi stack chỉ có 1 phần tử), lệnh số học \`pop\` 2 lần nhưng không đủ giá trị → **stack underflow**. VM phải báo lỗi thay vì pop ra \`undefined\`. Đây thường là dấu hiệu **compile sai** (mục 4.3): codegen không đặt đủ toán hạng trước opcode.

> ⚠ **Chia cho 0.** \`DIV\` với toán hạng phải \`= 0\` → \`a / 0\`. Trên số nguyên Go/Java đây là **panic/exception**, còn JS cho ra \`Infinity\` (cũng vô nghĩa). VM nên **kiểm tra \`b == 0\` trước khi chia** và báo lỗi runtime rõ ràng ("division by zero at pc=..."), không để lan ra kết quả rác.

> 🔁 **Dừng lại tự kiểm tra.** Chạy \`PUSH 2 · PUSH 3 · PUSH 4 · ADD · MUL\` (đây là bytecode của \`2*(3+4)\`, ví dụ C mục 4.3). Stack từng bước?
> <details><summary>Đáp án</summary>
>
> \`PUSH 2 → [2]\`, \`PUSH 3 → [2,3]\`, \`PUSH 4 → [2,3,4]\`, \`ADD → [2,7]\` (pop 4,3 đẩy 7), \`MUL → [14]\` (pop 7,2 đẩy 14). Kết quả \`14\` = \`2*(3+4)\` ✓.
> </details>

> 📝 **Tóm tắt mục 5.** VM = vòng \`while\`: fetch lệnh tại PC → decode (switch op) → execute (thao tác stack/mem) → PC+1. Kết quả biểu thức = giá trị cuối còn trên stack. Lỗi runtime chính: stack underflow (bytecode sai) và chia 0.

---

## 6. Biến, bộ nhớ slot, và quan hệ với RPN

### 6.1. Biến qua LOAD/STORE và bộ nhớ

Operand stack chỉ giữ giá trị **trung gian, tạm thời**. Biến cần **lưu lâu dài** giữa các câu lệnh → cần một vùng nhớ riêng:

- **\`STORE x\`**: pop đỉnh stack, ghi vào ô nhớ của biến \`x\`.
- **\`LOAD x\`**: đọc ô nhớ \`x\`, đẩy giá trị lên stack.

Trong VM đơn giản, "bộ nhớ" là một map \`{tên → giá trị}\`. Trong VM thật (JVM, CPython), biến cục bộ được đánh **số slot** (\`0, 1, 2...\`) thay vì tên — \`LOAD x\` thành \`iload 0\`. Vì sao? Truy cập theo chỉ số mảng nhanh hơn tra map theo chuỗi. Tên biến đã được [Symbol Table (L08)](../../02-Semantics/lesson-02-symbol-table-scope/) ánh xạ thành số slot lúc compile.

**Ví dụ — \`a = 5; b = a + 2; print b\`:**

\`\`\`
PUSH 5 · STORE a · LOAD a · PUSH 2 · ADD · STORE b · LOAD b · PRINT
\`\`\`

Chạy: \`a\` nhận \`5\`; \`LOAD a\` đẩy \`5\`, \`+2 = 7\`, \`STORE b\` ⇒ \`b=7\`; \`LOAD b · PRINT\` in \`7\`.

### 6.2. Bytecode stack chính là RPN (Reverse Polish Notation)

> 💡 **Trực giác.** Cách bạn viết toán thường ngày — \`2 + 3\` — là **trung tố (infix)**: toán tử **giữa** hai toán hạng, cần ngoặc để khử nhập nhằng. **RPN (Reverse Polish Notation / hậu tố / postfix)** đặt toán tử **sau** toán hạng: \`2 3 +\`. RPN **không cần ngoặc** và đọc trái→phải khớp y hệt cách stack machine chạy.

Đối chiếu trực tiếp:

| Infix (trung tố) | RPN (hậu tố) | Bytecode |
| --- | --- | --- |
| \`2 + 3\` | \`2 3 +\` | \`PUSH 2 · PUSH 3 · ADD\` |
| \`(2+3)*4\` | \`2 3 + 4 *\` | \`PUSH 2 · PUSH 3 · ADD · PUSH 4 · MUL\` |
| \`2*(3+4)\` | \`2 3 4 + *\` | \`PUSH 2 · PUSH 3 · PUSH 4 · ADD · MUL\` |
| \`10-3-2\` | \`10 3 - 2 -\` | \`PUSH 10 · PUSH 3 · SUB · PUSH 2 · SUB\` |

Quy luật đánh giá RPN bằng stack: **gặp số → push; gặp toán tử → pop hai số, tính, push kết quả**. Đó **chính xác** là VM của ta. Nói cách khác: **biên dịch biểu thức xuống bytecode stack = chuyển infix sang RPN**. Máy tính HP đời cũ và nhiều máy tính khoa học nhập theo RPN cũng vì lý do này — RPN máy chạy gọn.

> ❓ **Câu hỏi tự nhiên.** *"Vậy ngoặc \`()\` biến đi đâu trong bytecode?"* Ngoặc chỉ tồn tại trong infix để định hình **cấu trúc cây** AST. Khi đã có cây, **thứ tự post-order đã mã hóa độ ưu tiên** — RPN/bytecode không cần ngoặc nữa. So \`(2+3)*4\` (\`2 3 + 4 *\`) với \`2+3*4\` (\`2 3 4 * +\`): cùng các số/phép, khác thứ tự lệnh → khác kết quả, không cần ngoặc.

### 6.3. Quan hệ với OS: PC và stack frame

VM mô phỏng đúng cơ chế CPU/OS thật ([OS](../../../OperatingSystems/)):

- **PC ảo của VM** ↔ **Program Counter** của CPU (thanh ghi trỏ lệnh kế).
- **Operand stack + bộ nhớ slot** ↔ **stack frame** của một lời gọi hàm trên call stack (vùng nhớ chứa biến cục bộ + tạm tính).
- Vòng fetch-decode-execute của VM ↔ **chu kỳ lệnh (instruction cycle)** của CPU.

Khác biệt: VM thực thi bytecode bằng **phần mềm** (một vòng \`for\`), còn CPU thực thi machine code bằng **phần cứng** (mạch điện). JIT (mục 7) là cầu nối: dịch bytecode nóng thành machine code để chạy thẳng trên phần cứng.

> 📝 **Tóm tắt mục 6.** Biến sống trong bộ nhớ slot, truy cập qua \`LOAD\`/\`STORE\` (stack chỉ giữ tạm). Bytecode stack = RPN: số→push, toán tử→pop/tính/push; ngoặc tan biến vì cây đã mã hóa độ ưu tiên. VM mô phỏng PC + stack frame của CPU/OS thật.

---

## 7. So sánh: tree-walking vs bytecode vs native; JIT & portability

### 7.1. Ba mức thực thi

| | **Tree-walking** | **Bytecode + VM** | **Native (machine code)** |
| --- | --- | --- | --- |
| Chạy trên | duyệt AST | máy ảo (phần mềm) | CPU trực tiếp |
| Tốc độ | chậm nhất | trung bình (~3–10× tree) | nhanh nhất |
| Portable? | có (cần interpreter) | **có** (cần VM) | **không** (mỗi CPU một ISA) |
| Thời gian khởi động | nhanh | nhanh | cần compile trước (AOT) |
| Ví dụ | Ruby cũ, shell, bài học L09 | **JVM, CPython, WASM, Lua** | C/C++/Rust/Go đã compile |

Bytecode là **điểm cân bằng vàng**: nhanh hơn tree-walking nhiều, vẫn portable, không cần compiler nặng cho từng nền tảng.

### 7.2. JIT: dịch bytecode nóng → native lúc chạy

**JIT (Just-In-Time compilation)** kết hợp cái tốt của cả hai: chạy bytecode trên VM **và** đồng thời theo dõi đoạn nào chạy nhiều (**"hot"** — vd vòng lặp triệu lần). Đoạn nóng đó được **dịch tiếp xuống machine code** ngay lúc chạy rồi lần sau chạy thẳng native.

- **V8** (JavaScript, Chrome/Node): bytecode (Ignition) → JIT (TurboFan) cho hàm nóng.
- **JVM HotSpot**: chạy bytecode \`.class\`, JIT các "hotspot" thành native → Java tiệm cận tốc độ C cho code chạy lâu.

Vì sao không JIT mọi thứ ngay từ đầu? Vì JIT tốn thời gian compile — chỉ đáng cho code chạy **nhiều**. Code chạy một lần thì interpret bytecode rẻ hơn. Đây là lý do VM hiện đại có **nhiều tier**: interpret → JIT nhẹ → JIT tối ưu mạnh.

### 7.3. Bytecode = nền của portability (JVM, WASM)

- **JVM**: một file \`.class\` chạy trên mọi máy có JVM. Kotlin, Scala, Clojure cũng compile xuống **cùng** bytecode JVM → dùng chung thư viện, chung VM.
- **WebAssembly (WASM)**: bytecode portable cho **trình duyệt**. C/C++/Rust compile sang \`.wasm\`, mọi trình duyệt có WASM VM chạy được với tốc độ gần native. Chính là "JVM cho web".

Mẫu số chung: **tách "ngôn ngữ nguồn" khỏi "nền tảng đích" bằng một tầng bytecode trung gian**. Compiler frontend chỉ cần nhắm tới bytecode; VM lo phần chạy trên mỗi nền tảng.

> 🔁 **Dừng lại tự kiểm tra.** Vì sao Java "chậm khi khởi động nhưng nhanh khi chạy lâu"?
> <details><summary>Đáp án</summary>
>
> Lúc đầu JVM **interpret bytecode** (chậm hơn native) và chưa biết đoạn nào nóng. Sau khi một đoạn chạy đủ nhiều, **JIT dịch nó sang native** → nhanh dần lên. Vậy chương trình ngắn không kịp "nóng" để hưởng JIT (chậm tương đối), còn server chạy nhiều giờ thì gần như mọi hot path đã thành native (nhanh).
> </details>

> 📝 **Tóm tắt mục 7.** Tree-walking < bytecode+VM < native về tốc độ; bytecode portable, native thì không. JIT (V8, JVM) dịch bytecode **nóng** sang native lúc chạy để gộp tốc độ native + tính portable. Bytecode (JVM, WASM) tách ngôn ngữ nguồn khỏi nền tảng đích.

---

## 8. Bài tập

> Khuyến nghị: làm tay trước, rồi mở [visualization.html](./visualization.html) đối chiếu (module Compile và module VM Stepper).

**Bài 1.** Compile các biểu thức sau sang bytecode (chỉ dùng \`PUSH/ADD/SUB/MUL/DIV\`):
- (a) \`5 + 6\`
- (b) \`(7 - 2) * 3\`
- (c) \`8 + 2 * 5\`  (chú ý độ ưu tiên: \`*\` trước \`+\`)
- (d) \`100 / (5 + 5)\`

**Bài 2.** Chạy bytecode \`PUSH 9 · PUSH 4 · SUB · PUSH 2 · MUL\` trên VM. Vẽ stack **từng bước** và cho kết quả cuối. Bytecode này tương ứng biểu thức infix nào?

**Bài 3.** (Tự compile + chạy) Cho biểu thức \`(6 + 4) / (5 - 3)\`:
- (a) Vẽ AST.
- (b) Compile sang bytecode bằng post-order.
- (c) Chạy bytecode, vẽ stack từng bước, cho kết quả.

**Bài 4.** Viết bytecode cho chương trình có biến và in:
\`\`\`
x = 3
y = x * x + 1
print y
\`\`\`
Dùng \`PUSH/LOAD/STORE/ADD/MUL/PRINT\`. Sau đó chạy thử, theo dõi cả stack lẫn bộ nhớ.

**Bài 5.** Cho bytecode lỗi \`PUSH 5 · ADD · PUSH 2\`. Khi chạy nó hỏng ở đâu, vì sao? Đây là dấu hiệu lỗi gì ở bước compile?

**Bài 6.** Đổi mỗi biểu thức infix sau sang RPN rồi sang bytecode:
- (a) \`1 + 2 + 3\`
- (b) \`2 * 3 * 4\`
- (c) \`(1 + 2) * (3 + 4)\`

**Bài 7.** (Suy luận tốc độ) Một vòng lặp chạy biểu thức \`(2+3)*4\` đúng 1.000.000 lần. Giải thích bằng lời: tree-walking và bytecode+VM khác nhau ở **mỗi vòng lặp** thế nào, và vì sao bytecode ít việc lặp lại hơn.

## Lời giải chi tiết

### Bài 1

- **(a) \`5 + 6\`** → cây \`(+ 5 6)\`, post-order: \`PUSH 5 · PUSH 6 · ADD\`.
- **(b) \`(7 - 2) * 3\`** → gốc \`*\`, trái \`(7-2)\`, phải \`3\`:
  \`PUSH 7 · PUSH 2 · SUB · PUSH 3 · MUL\`. (Chạy: \`[7,2]→SUB→[5]\`, \`[5,3]→MUL→[15]\`.)
- **(c) \`8 + 2 * 5\`** → \`*\` ưu tiên cao hơn \`+\`, cây là \`(+ 8 (* 2 5))\`, gốc \`+\`:
  \`PUSH 8 · PUSH 2 · PUSH 5 · MUL · ADD\`. (Chạy: \`[8,2,5]→MUL→[8,10]→ADD→[18]\`.) Kết quả \`18\` ✓ (không phải \`(8+2)*5=50\`).
- **(d) \`100 / (5 + 5)\`** → gốc \`/\`, trái \`100\`, phải \`(5+5)\`:
  \`PUSH 100 · PUSH 5 · PUSH 5 · ADD · DIV\`. (Chạy: \`[100,5,5]→ADD→[100,10]→DIV→[10]\`.)

### Bài 2

Bytecode \`PUSH 9 · PUSH 4 · SUB · PUSH 2 · MUL\`:

| Lệnh | Thao tác | Stack sau |
| --- | --- | --- |
| \`PUSH 9\` | đẩy 9 | \`[9]\` |
| \`PUSH 4\` | đẩy 4 | \`[9, 4]\` |
| \`SUB\` | pop 4, pop 9, \`9−4=5\` | \`[5]\` |
| \`PUSH 2\` | đẩy 2 | \`[5, 2]\` |
| \`MUL\` | pop 2, pop 5, \`5·2=10\` | \`[10]\` |

Kết quả **\`10\`**. RPN \`9 4 - 2 *\` ↔ infix **\`(9 - 4) * 2\`**.

### Bài 3

**(a) AST** của \`(6 + 4) / (5 - 3)\`:
\`\`\`
        (/)
       /   \\
     (+)    (-)
    /  \\    /  \\
   6    4  5    3
\`\`\`

**(b) Compile** post-order: con trái \`(+)\` xong, con phải \`(-)\` xong, rồi \`DIV\`:
\`\`\`
PUSH 6 · PUSH 4 · ADD · PUSH 5 · PUSH 3 · SUB · DIV
\`\`\`

**(c) Chạy:**

| Lệnh | Thao tác | Stack sau |
| --- | --- | --- |
| \`PUSH 6\` | đẩy 6 | \`[6]\` |
| \`PUSH 4\` | đẩy 4 | \`[6, 4]\` |
| \`ADD\` | \`6+4=10\` | \`[10]\` |
| \`PUSH 5\` | đẩy 5 | \`[10, 5]\` |
| \`PUSH 3\` | đẩy 3 | \`[10, 5, 3]\` |
| \`SUB\` | pop 3, pop 5, \`5−3=2\` | \`[10, 2]\` |
| \`DIV\` | pop 2, pop 10, \`10/2=5\` | \`[5]\` |

Kết quả **\`5\`** = \`10 / 2\` ✓.

### Bài 4

\`\`\`
x = 3        →  PUSH 3 · STORE x
y = x*x + 1  →  LOAD x · LOAD x · MUL · PUSH 1 · ADD · STORE y
print y      →  LOAD y · PRINT
\`\`\`

Ghép đầy đủ:
\`\`\`
PUSH 3 · STORE x · LOAD x · LOAD x · MUL · PUSH 1 · ADD · STORE y · LOAD y · PRINT
\`\`\`

Chạy (theo dõi stack + bộ nhớ + output):

| Lệnh | Stack | Bộ nhớ | Output |
| --- | --- | --- | --- |
| \`PUSH 3\` | \`[3]\` | \`{}\` | |
| \`STORE x\` | \`[]\` | \`{x:3}\` | |
| \`LOAD x\` | \`[3]\` | \`{x:3}\` | |
| \`LOAD x\` | \`[3, 3]\` | \`{x:3}\` | |
| \`MUL\` | \`[9]\` | \`{x:3}\` | |
| \`PUSH 1\` | \`[9, 1]\` | \`{x:3}\` | |
| \`ADD\` | \`[10]\` | \`{x:3}\` | |
| \`STORE y\` | \`[]\` | \`{x:3, y:10}\` | |
| \`LOAD y\` | \`[10]\` | \`{x:3, y:10}\` | |
| \`PRINT\` | \`[]\` | \`{x:3, y:10}\` | \`10\` |

In ra **\`10\`** (= \`3*3 + 1\`) ✓.

### Bài 5

Bytecode \`PUSH 5 · ADD · PUSH 2\`:

| Lệnh | Thao tác | Stack |
| --- | --- | --- |
| \`PUSH 5\` | đẩy 5 | \`[5]\` |
| \`ADD\` | cần pop **2** giá trị, nhưng stack chỉ có **1** (\`5\`) → **STACK UNDERFLOW** | lỗi |

VM hỏng ngay tại \`ADD\`: nó pop \`5\` rồi cố pop tiếp nhưng stack rỗng. Đây là dấu hiệu **compile sai** — bước codegen đã phát opcode \`ADD\` mà **chưa đặt đủ 2 toán hạng** trước nó (mục 4.3, 5.4). VM đúng phải phát hiện và báo "stack underflow at pc=1" thay vì chạy tiếp ra rác.

### Bài 6

Quy tắc: infix → RPN (toán tử đặt sau toán hạng theo post-order) → bytecode (\`số→PUSH\`, \`toán tử→ADD/MUL/...\`).

- **(a) \`1 + 2 + 3\`** = \`(1+2)+3\` → RPN \`1 2 + 3 +\` → \`PUSH 1 · PUSH 2 · ADD · PUSH 3 · ADD\`. (= 6.)
- **(b) \`2 * 3 * 4\`** = \`(2*3)*4\` → RPN \`2 3 * 4 *\` → \`PUSH 2 · PUSH 3 · MUL · PUSH 4 · MUL\`. (= 24.)
- **(c) \`(1 + 2) * (3 + 4)\`** → RPN \`1 2 + 3 4 + *\` → \`PUSH 1 · PUSH 2 · ADD · PUSH 3 · PUSH 4 · ADD · MUL\`. (= \`3*7=21\`.)

### Bài 7

**Mỗi vòng lặp với tree-walking:** gọi \`eval(gốc *)\`, rẽ nhánh theo kiểu node, **gọi đệ quy** \`eval(+)\` rồi \`eval(2)\`, \`eval(3)\`, cộng, trở lên, \`eval(4)\`, nhân. Tức là **mỗi vòng** lặp lại toàn bộ: kiểm tra kiểu của 5 node, 4 lời gọi hàm đệ quy, truy con trỏ tới các node rải rác heap (cache miss). Làm lại y hệt **1.000.000 lần**.

**Mỗi vòng lặp với bytecode+VM:** việc "phân tích cấu trúc cây" đã làm **một lần** lúc compile, kết tinh thành mảng \`[PUSH 2, PUSH 3, ADD, PUSH 4, MUL]\`. Mỗi vòng chỉ chạy vòng \`while\` 5 lần đọc lệnh từ **mảng liền nhau** (cache-friendly), mỗi lệnh là một \`switch\` + thao tác stack đơn giản, **không đệ quy, không phân tích lại cây**.

Khác biệt cốt lõi: tree-walking **lặp lại cả việc phân tích cấu trúc**; bytecode **chỉ lặp lại việc thực thi** (phân tích cấu trúc đã trả xong một lần). Vì việc phân tích cấu trúc bị bỏ khỏi vòng lặp nóng, bytecode+VM nhanh hơn nhiều khi N lớn — đúng tinh thần mục 1.

## Tham khảo và bài tiếp theo

- Tiền đề đã dùng:
  - [L11 — IR (Three-Address Code)](../lesson-01-ir-three-address/) — bytecode là một dạng IR gần thực thi.
  - [L09 — Tree-Walking Interpreter](../../02-Semantics/lesson-04-tree-walking-interpreter/) — cái ta vừa nâng cấp.
  - [Symbol Table & Scope (L08)](../../02-Semantics/lesson-02-symbol-table-scope/) — ánh xạ tên biến → slot.
  - [DataStructures — Stack](../../../DataStructures/01-Basic/lesson-04-stack/) — nền tảng operand stack.
  - [Operating Systems](../../../OperatingSystems/) — PC, stack frame, instruction cycle.
- **Bài tiếp theo:** [L14 — Control Flow Codegen](../lesson-04-control-flow-codegen/) — thêm \`JMP\`/\`JMP_IF_FALSE\` để compile \`if\`/\`while\`, biến PC từ "tăng đều" thành "nhảy".
- Minh họa tương tác: [visualization.html](./visualization.html) — Compile biểu thức → bytecode (vẽ AST + sinh lệnh), VM Stack Stepper (chạy từng lệnh, vẽ ngăn xếp + PC + output), và so sánh tree-walking vs bytecode.
</content>
</invoke>
`;
