// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: Compilers/02-Semantics/lesson-04-tree-walking-interpreter/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 09 — Tree-Walking Interpreter (thông dịch bằng duyệt cây)

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Trả lời được câu hỏi cốt lõi: **đã có AST + symbol table + type check, làm sao để \`x = 5; y = x + 3; print y\` thực sự IN ra \`8\` trên màn hình?**
- Hiểu ý tưởng trung tâm: thay vì sinh mã máy, ta **duyệt (walk) cây AST và thực thi trực tiếp** — đây là cách đơn giản nhất để một ngôn ngữ "chạy".
- Cài đặt hàm đệ quy \`eval(node, env)\`: nhận một node của AST + môi trường \`env\` (symbol table lúc chạy), trả về **giá trị**.
- Phân biệt rạch ròi **biểu thức (expression)** — có giá trị, và **câu lệnh (statement)** — gây hiệu ứng (gán, in).
- Thực thi **điều khiển luồng**: \`if\` (eval điều kiện → chọn nhánh), \`while\` (lặp eval thân khi điều kiện đúng).
- Phân biệt **lỗi runtime** (chia 0, biến chưa gán) với **lỗi compile** (lỗi cú pháp, sai kiểu) — đã bắt ở các bài trước.
- Hiểu **vì sao tree-walking chậm** so với compiler sinh mã / bytecode VM, và khi nào nên dùng cái nào.

## Kiến thức tiền đề

- [Lesson 06 — AST & Visitor](../lesson-01-ast-visitor/) — bài này **duyệt** chính cái cây mà L06 dựng nên. Bạn cần quen với khái niệm node, con, đệ quy trên cây.
- [Lesson 07 — Symbol Table & Scope](../lesson-02-symbol-table-scope/) — \`env\` trong bài này **chính là** symbol table, nhưng dùng lúc chạy (runtime): nó lưu *giá trị thật* của biến, không chỉ tên/kiểu.
- [Lesson 08 — Type Checking](../lesson-03-type-checking/) — type check chạy **trước** khi thông dịch, loại bớt một số lỗi (cộng số với chuỗi…). Bài này lo phần còn lại: các lỗi chỉ lộ ra **lúc chạy**.
- [DataStructures — Tree](../../../DataStructures/02-Intermediate/lesson-01-tree/) — tùy chọn; \`eval\` là một phép duyệt cây hậu thứ tự (post-order) có biến tấu.

> 💡 **Đây là bài "sống động" của lĩnh vực.** Từ L01 đến L08 ta dựng ra một cái cây và kiểm tra nó hợp lệ — nhưng chưa có gì *chạy*. Bài này là khoảnh khắc ngôn ngữ đồ chơi của ta **thực sự thở**: nhập chương trình vào, nó in ra kết quả. Mở [visualization.html](./visualization.html) là có ngay một REPL chạy được.

## 1. Vì sao học — \`x = 5; y = x + 3; print y\` IN ra \`8\` bằng cách nào?

> 💡 **Trực giác.** Hãy hình dung AST như một **công thức nấu ăn dạng cây**: "món chính = trộn (nước sốt, mì)", trong đó "nước sốt = đun (cà chua, dầu)". Để có món ăn, bạn không cần "biên dịch công thức ra một danh sách lệnh rồi giao cho robot" — bạn chỉ cần **làm theo cây từ lá lên gốc**: đun cà chua + dầu trước (lá), được nước sốt, rồi trộn với mì (gốc). Tree-walking interpreter làm đúng vậy với AST: nó **đi xuống tận lá, tính giá trị, rồi gộp ngược lên gốc**.

Đến cuối L08, với chương trình:

\`\`\`
x = 5;
y = x + 3;
print y;
\`\`\`

ta đã có trong tay:

1. **AST** — cây cú pháp, ví dụ (giản lược): một \`Block\` chứa 3 câu lệnh \`Assign(x, 5)\`, \`Assign(y, BinaryOp(+, Var(x), 3))\`, \`Print(Var(y))\`.
2. **Symbol table** — biết \`x\`, \`y\` là biến hợp lệ, kiểu số.
3. **Type check pass** — đã xác nhận không có lỗi kiểu.

Nhưng… **chưa có con số \`8\` nào xuất hiện.** Cây chỉ là cấu trúc tĩnh, mô tả "phải làm gì", chứ bản thân nó không làm. Câu hỏi của cả bài: **bằng quy trình nào** mà cái cây tĩnh đó biến thành dòng chữ \`8\` trên màn hình?

Có **hai con đường** để biến AST thành hành động:

| Con đường | Làm gì | Bài học |
| --- | --- | --- |
| **Tree-walking interpreter** (bài này) | Duyệt cây, thực thi **trực tiếp** từng node | L09 |
| **Compiler / Bytecode VM** | Dịch cây thành **lệnh máy / bytecode**, rồi chạy lệnh đó | Tier 3 (L13+) |

Tree-walking là con đường **ngắn nhất từ AST tới kết quả**: không sinh ra file lệnh trung gian nào, chỉ cần một hàm đệ quy duyệt cây. Đổi lại nó chậm hơn (sẽ thấy ở §7). Nhưng để *hiểu một ngôn ngữ chạy thế nào*, đây là điểm khởi đầu hoàn hảo — và rất nhiều ngôn ngữ thật (Python, Ruby thời đầu) bắt đầu chính bằng cách này.

> ❓ **Câu hỏi tự nhiên của người đọc**
> - *"Vì sao không sinh mã máy luôn cho nhanh?"* — Vì sinh mã máy phức tạp hơn nhiều (phải biết kiến trúc CPU, cấp phát thanh ghi, layout bộ nhớ…). Tree-walking chỉ cần một hàm đệ quy ~100 dòng là có ngôn ngữ chạy được. Đơn giản trước, tối ưu sau.
> - *"Type check rồi thì còn lỗi gì lúc chạy?"* — Còn nhiều: chia cho 0, dùng biến chưa gán giá trị, tràn số, truy cập phần tử ngoài mảng… Những lỗi này phụ thuộc *giá trị thật lúc chạy*, type check (chỉ nhìn kiểu) không thể biết trước. Xem §6.

> 📝 **Tóm tắt §1.** AST là cấu trúc tĩnh "phải làm gì". Tree-walking interpreter duyệt cây và thực thi trực tiếp — con đường ngắn nhất biến AST thành kết quả, đơn giản nhưng chậm hơn compiler.

## 2. \`eval(node, env)\` — trái tim của interpreter

> 💡 **Trực giác.** \`eval\` là một người thợ đọc công thức cây: đưa cho anh ta một node, anh ta trả về **giá trị** của node đó. Nếu node là lá (\`5\`), anh ta trả ngay \`5\`. Nếu node là \`a + b\`, anh ta **gọi chính mình** để tính \`a\`, gọi chính mình tính \`b\`, rồi cộng lại. Đệ quy = "thợ tự thuê thêm bản sao của chính mình lo các nhánh con".

### 2.1. Hai tham số: node và env

\`\`\`
eval(node, env) → value
\`\`\`

- **\`node\`**: một node của AST — có thể là số \`5\`, một phép \`x + 3\`, một câu \`print y\`…
- **\`env\`** (environment / môi trường): bảng ánh xạ **tên biến → giá trị hiện tại**. Đây chính là [symbol table của L07](../lesson-02-symbol-table-scope/), nhưng dùng *lúc chạy* (runtime): trong khi compile nó lưu *kiểu* của \`x\`, thì lúc chạy nó lưu *giá trị thật* của \`x\` (ví dụ \`5\`).

  Trong code ta biểu diễn \`env\` đơn giản là một map: \`env = { "x": 5, "y": 8 }\`.

### 2.2. Walk-through ĐẦY ĐỦ: eval \`x = 5; print x + 3\`

Ta đi qua **từng node**, theo dõi cả giá trị trả về lẫn \`env\`. AST gồm một \`Block\` 2 câu:

\`\`\`
Block
├── Assign(name="x", rhs=Lit(5))
└── Print(expr=BinaryOp(op="+", left=Var("x"), right=Lit(3)))
\`\`\`

Bắt đầu với \`env = { }\` (rỗng):

**Bước 1 — eval \`Assign(x, Lit(5))\`.**
- Đây là câu lệnh gán. Quy tắc: *eval vế phải trước, rồi ghi vào env*.
- \`eval(Lit(5), env)\` → trả \`5\` (literal trả thẳng giá trị của nó).
- Ghi \`env["x"] = 5\`. → bây giờ \`env = { "x": 5 }\`.
- Câu lệnh gán **không có giá trị trả về** (nó là statement, không phải expression — xem §4).

**Bước 2 — eval \`Print(BinaryOp(+, Var(x), Lit(3)))\`.**
- Đây là câu lệnh in. Quy tắc: *eval biểu thức bên trong, rồi in giá trị đó*.
- Cần \`eval(BinaryOp(+, Var(x), Lit(3)), env)\`:
  - \`eval(Var(x), env)\` → tra \`env["x"]\` → \`5\`.
  - \`eval(Lit(3), env)\` → \`3\`.
  - Áp toán tử \`+\`: \`5 + 3\` = \`8\`.
  - → trả \`8\`.
- In \`8\` ra màn hình. **Output: \`8\`** ✓

Kết thúc: \`env = { "x": 5 }\`, màn hình hiện \`8\`. Đúng như mong đợi — câu hỏi mở bài đã được trả lời cụ thể.

> 🔁 **Dừng lại tự kiểm tra.** Với \`env\` rỗng ban đầu, eval \`Print(Var(x))\` (in \`x\` trước khi gán) sẽ ra gì?
> <details><summary>Đáp án</summary>
> \`eval(Var(x), env)\` tra \`env["x"]\` nhưng \`x\` chưa có trong \`env\` → <strong>lỗi runtime "biến chưa gán"</strong> (xem §6). Type check (L08) có thể đã bắt nếu nó kiểm tra "use-before-def", nhưng nếu không, lỗi lộ ra đúng lúc này.
> </details>

> 📝 **Tóm tắt §2.** \`eval(node, env)\` là hàm đệ quy: lá → trả giá trị, node trong → eval các con rồi gộp. \`env\` là symbol table lúc chạy, lưu tên biến → giá trị thật.

## 3. Các loại node và cách thực thi

Mỗi loại node có một quy tắc eval riêng. Đây là toàn bộ "luật chơi" của interpreter.

### 3.1. Literal (hằng) — trả thẳng giá trị

Lá đơn giản nhất. \`eval(Lit(v), env) = v\`.

\`\`\`
eval(Lit(5),    env) = 5
eval(Lit(0),    env) = 0
eval(Lit(-7),   env) = -7
eval(Lit(true), env) = true
\`\`\`

### 3.2. Var (biến) — tra env

\`eval(Var(name), env)\` = giá trị \`env[name]\`. Nếu \`name\` không có trong \`env\` → lỗi runtime.

Với \`env = { "x": 5, "y": 8, "z": 0 }\`:

\`\`\`
eval(Var("x"), env) = 5
eval(Var("y"), env) = 8
eval(Var("z"), env) = 0
eval(Var("w"), env) → lỗi: 'w' chưa được gán
\`\`\`

### 3.3. BinaryOp (toán tử hai ngôi) — eval 2 con rồi áp toán tử

\`eval(BinaryOp(op, L, R), env)\`: tính \`l = eval(L, env)\`, \`r = eval(R, env)\`, rồi áp \`op\`.

Với \`env = { "x": 5 }\`:

\`\`\`
eval(BinaryOp(+, Lit(2),  Lit(3)),  env) = 2 + 3 = 5
eval(BinaryOp(*, Var(x),  Lit(4)),  env) = 5 * 4 = 20
eval(BinaryOp(-, Lit(10), Var(x)),  env) = 10 - 5 = 5
eval(BinaryOp(/, Lit(20), Lit(4)),  env) = 20 / 4 = 5
\`\`\`

Toán tử lồng nhau cũng chỉ là đệ quy sâu hơn. \`(2 + 3) * 4\`:

\`\`\`
eval(BinaryOp(*, BinaryOp(+, Lit(2), Lit(3)), Lit(4)), env)
  → l = eval(BinaryOp(+, Lit(2), Lit(3)), env) = 2 + 3 = 5
  → r = eval(Lit(4), env) = 4
  → 5 * 4 = 20
\`\`\`

### 3.4. Assign (gán) — eval RHS, ghi env

\`eval(Assign(name, rhs), env)\`: tính \`v = eval(rhs, env)\`, rồi đặt \`env[name] = v\`.

Bắt đầu \`env = { }\`, chạy lần lượt:

\`\`\`
Assign("a", Lit(10))                 → env = { a:10 }
Assign("b", BinaryOp(+, Var(a), Lit(5)))   → b = 10+5 = 15 → env = { a:10, b:15 }
Assign("a", BinaryOp(*, Var(a), Lit(2)))   → a = 10*2 = 20 → env = { a:20, b:15 }  (ghi đè a)
Assign("c", Var(b))                  → c = 15 → env = { a:20, b:15, c:15 }
\`\`\`

Chú ý dòng 3: \`a = a * 2\` đọc giá trị cũ của \`a\` (10) rồi ghi đè bằng 20. Đây là lý do **thứ tự "eval RHS trước, ghi sau"** quan trọng.

### 3.5. Print (in) — eval biểu thức rồi in

\`eval(Print(expr), env)\`: tính \`v = eval(expr, env)\`, ghi \`v\` ra output.

Với \`env = { "x": 5, "y": 8 }\`:

\`\`\`
Print(Lit(42))                    → in "42"
Print(Var("x"))                   → in "5"
Print(BinaryOp(+, Var(x), Var(y)))→ in "13"
Print(BinaryOp(*, Var(y), Lit(10)))→ in "80"
\`\`\`

### 3.6. Bảng tổng hợp

| Node | Là gì | Quy tắc eval | Trả giá trị? |
| --- | --- | --- | --- |
| \`Lit(v)\` | hằng | trả \`v\` | có |
| \`Var(name)\` | tham chiếu biến | trả \`env[name]\` (lỗi nếu thiếu) | có |
| \`BinaryOp(op,L,R)\` | phép 2 ngôi | \`op(eval L, eval R)\` | có |
| \`Assign(name,rhs)\` | gán | \`env[name] = eval(rhs)\` | không (statement) |
| \`Print(expr)\` | in | output ← \`eval(expr)\` | không (statement) |
| \`If/While/Block\` | điều khiển/khối | xem §4, §5 | không (statement) |

> ⚠ **Lỗi thường gặp: nhầm \`env\` là bản sao.** \`env\` được truyền **theo tham chiếu** (reference) xuống các lời gọi \`eval\` con. Khi node \`Assign\` ghi \`env[name] = v\`, nó sửa **cùng một** bảng mà mọi node khác đang nhìn. Nếu lỡ truyền *bản sao* của \`env\`, biến gán bên trong sẽ "biến mất" khi quay ra ngoài → chương trình sai âm thầm. Trong viz của bài, \`env\` là một object JS duy nhất chia sẻ cho cả cây.

> 📝 **Tóm tắt §3.** 5 luật eval cơ bản: literal trả giá trị; var tra env; binaryop eval 2 con rồi áp toán tử; assign eval RHS rồi ghi env; print eval rồi in. Expression trả giá trị, statement gây hiệu ứng.

## 4. Câu lệnh (statement) vs Biểu thức (expression)

> 💡 **Trực giác.** Một **biểu thức** trả lời câu hỏi *"giá trị bằng bao nhiêu?"* — như \`2 + 3\` trả \`5\`, hay \`x * 4\`. Một **câu lệnh** trả lời câu hỏi *"làm gì?"* — như \`print y\` (in ra) hay \`x = 5\` (đổi env). Biểu thức **cho ra giá trị**; câu lệnh **gây hiệu ứng** (thay đổi trạng thái chương trình: env, màn hình, file…).

### 4.1. Phân biệt

| | Expression (biểu thức) | Statement (câu lệnh) |
| --- | --- | --- |
| Câu hỏi | "giá trị là gì?" | "làm hành động gì?" |
| eval trả về | một **giá trị** | thường **không** trả giá trị, mà gây **hiệu ứng** |
| Ví dụ | \`2+3\`, \`x*4\`, \`a<b\`, \`5\` | \`x = 5\`, \`print y\`, \`if…\`, \`while…\` |
| Lồng được không? | có (\`(2+3)*4\`) | có thể chứa expr, nhưng bản thân ít khi "trả giá trị" |

4 ví dụ mỗi loại:

\`\`\`
Biểu thức:   42        x + 3        (a - b) * c        i < 10
Câu lệnh:    x = 42    print x+3    if c { ... }       while i<10 { ... }
\`\`\`

### 4.2. Block (khối) = chuỗi câu lệnh

Một **block** là một dãy câu lệnh chạy **lần lượt từ trên xuống**. eval block = eval từng câu lệnh theo thứ tự, dùng **chung một \`env\`**:

\`\`\`
eval(Block([s1, s2, ..., sn]), env):
    for s in [s1, s2, ..., sn]:
        eval(s, env)        # mỗi câu sửa env / in ra, theo thứ tự
\`\`\`

### 4.3. Walk-through chương trình nhiều dòng

Chương trình:

\`\`\`
a = 4;
b = a * 2;
c = a + b;
print c;
\`\`\`

AST: \`Block\` gồm 4 câu. Bắt đầu \`env = { }\`:

| Bước | Câu lệnh | eval RHS | env sau bước | Output |
| --- | --- | --- | --- | --- |
| 1 | \`a = 4\` | \`4\` | \`{ a:4 }\` | — |
| 2 | \`b = a * 2\` | \`eval(a)=4\`, \`4*2=8\` | \`{ a:4, b:8 }\` | — |
| 3 | \`c = a + b\` | \`eval(a)=4\`, \`eval(b)=8\`, \`4+8=12\` | \`{ a:4, b:8, c:12 }\` | — |
| 4 | \`print c\` | \`eval(c)=12\` | \`{ a:4, b:8, c:12 }\` | \`12\` |

Kết quả cuối: env = \`{ a:4, b:8, c:12 }\`, màn hình in \`12\`. Mỗi câu nhìn thấy mọi thay đổi câu trước để lại — vì cùng chung \`env\`.

> ❓ **Câu hỏi tự nhiên.** *"Câu lệnh có bao giờ trả giá trị không?"* — Tùy ngôn ngữ. Trong nhiều ngôn ngữ (C, Python), gán \`x = 5\` thực ra **cũng là biểu thức** trả về \`5\` (cho phép \`y = x = 5\`). Ngôn ngữ đồ chơi của ta giữ gán là **statement thuần** (không trả giá trị) cho đơn giản và dễ dạy. Đây là một *lựa chọn thiết kế*, không phải luật trời.

> 📝 **Tóm tắt §4.** Expression → có giá trị; statement → gây hiệu ứng (env, output). Block = chuỗi statement chạy tuần tự, chung một env, mỗi câu thấy thay đổi của câu trước.

## 5. Điều khiển luồng trong interpreter

Đây là chỗ tree-walking interpreter cho thấy sức mạnh: điều khiển luồng (\`if\`, \`while\`) chỉ là… **quyết định eval node con nào, và eval bao nhiêu lần.**

### 5.1. \`if\` — eval điều kiện, chọn nhánh

\`If(cond, thenBlock, elseBlock)\`:

\`\`\`
eval(If(cond, thenBlock, elseBlock), env):
    if eval(cond, env) == true:
        eval(thenBlock, env)
    else:
        eval(elseBlock, env)     # bỏ qua nếu không có else
\`\`\`

Điểm cốt lõi: ta eval \`cond\` trước để lấy \`true/false\`, rồi **chỉ eval một trong hai nhánh** — nhánh kia không bao giờ chạy.

4 ví dụ (với \`env = { x:7 }\`):

\`\`\`
if x > 5  { print 1 } else { print 0 }   → cond = 7>5 = true  → in 1
if x < 5  { print 1 } else { print 0 }   → cond = 7<5 = false → in 0
if x == 7 { print 9 }                    → cond = true        → in 9
if x == 0 { print 9 }                    → cond = false, không else → không in gì
\`\`\`

### 5.2. \`while\` — lặp eval thân khi điều kiện đúng

\`While(cond, body)\`:

\`\`\`
eval(While(cond, body), env):
    while eval(cond, env) == true:
        eval(body, env)
\`\`\`

Mỗi vòng: eval lại \`cond\` (giá trị có thể đổi vì thân vừa sửa env), nếu \`true\` thì eval \`body\`, lặp lại. Khi \`cond\` thành \`false\` → dừng.

### 5.3. Walk-through ĐẦY ĐỦ: \`i = 0; while i < 3 { print i; i = i + 1 }\`

AST:

\`\`\`
Block
├── Assign("i", Lit(0))
└── While(
      cond = BinaryOp(<, Var(i), Lit(3)),
      body = Block([ Print(Var(i)), Assign("i", BinaryOp(+, Var(i), Lit(1))) ])
    )
\`\`\`

Bắt đầu \`env = { }\`:

**Câu 1:** \`Assign("i", Lit(0))\` → \`env = { i:0 }\`.

**Câu 2:** vào \`While\`. Mỗi lần kiểm tra \`cond = eval(i < 3)\`:

| Vòng | \`i\` trước | \`cond = i < 3\` | Vào thân? | \`print i\` | \`i = i+1\` | \`i\` sau |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | 0 | \`0 < 3\` = true | có | in \`0\` | \`0+1=1\` | 1 |
| 2 | 1 | \`1 < 3\` = true | có | in \`1\` | \`1+1=2\` | 2 |
| 3 | 2 | \`2 < 3\` = true | có | in \`2\` | \`2+1=3\` | 3 |
| 4 | 3 | \`3 < 3\` = **false** | **không** | — | — | 3 |

→ Vòng 4 \`cond\` thành false → thoát while. **Output: \`0 1 2\`** (mỗi số một dòng). env cuối: \`{ i:3 }\`.

Lưu ý vòng 4: ta vẫn **eval cond một lần nữa** (\`3 < 3 = false\`) rồi mới thoát — đó là lý do \`i\` dừng ở \`3\` chứ không phải \`2\`.

> ⚠ **Lỗi thường gặp: vòng lặp vô tận (infinite loop).** Nếu thân while **không** thay đổi biến trong điều kiện, \`cond\` mãi mãi \`true\` → chạy mãi. Ví dụ \`i = 0; while i < 3 { print i }\` (quên \`i = i + 1\`) sẽ in \`0\` không ngừng. Type check (L08) **không** bắt được lỗi này — nó là lỗi *logic*, không phải lỗi kiểu. Trong viz của bài, ta đặt giới hạn số vòng để tránh treo trình duyệt.

> 🔁 **Dừng lại tự kiểm tra.** \`i = 5; while i < 3 { print i; i = i+1 }\` in ra gì?
> <details><summary>Đáp án</summary>
> Kiểm tra \`cond\` lần đầu: \`5 < 3 = false\` → <strong>không vào thân lần nào</strong> → không in gì. while kiểm tra điều kiện <em>trước</em> mỗi vòng, nên nếu sai ngay từ đầu thì thân chạy 0 lần.
> </details>

> 📝 **Tóm tắt §5.** \`if\`: eval cond, chỉ eval một nhánh. \`while\`: eval cond mỗi vòng, eval thân khi true, dừng khi false. Điều khiển luồng = quyết định eval node nào và bao nhiêu lần. Quên cập nhật biến điều kiện → vòng lặp vô tận.

## 6. Lỗi runtime — phân biệt với lỗi compile

> 💡 **Trực giác.** Lỗi **compile-time** lộ ra khi *đọc* chương trình (chưa chạy): thiếu dấu \`;\`, cộng số với chuỗi… Lỗi **runtime** lộ ra khi *chạy*, và phụ thuộc **giá trị thật**: chia cho một số mà số đó tình cờ bằng 0. Giống như: "câu sai ngữ pháp" phát hiện khi đọc đề; "lái xe đâm vào tường" chỉ biết khi xe thật sự chạy.

### 6.1. Hai họ lỗi

| | Lỗi compile-time | Lỗi runtime |
| --- | --- | --- |
| Phát hiện khi | đọc/phân tích code (lexer, parser, type check) | đang **chạy** (eval) |
| Phụ thuộc | cấu trúc, kiểu | **giá trị thật** lúc chạy |
| Bài học | L02 (lexical), L04 (syntax), L08 (semantic/type) | **L09 (bài này)** |
| Ví dụ | \`x = ;\` (syntax), \`5 + "hi"\` (type) | chia 0, biến chưa gán, tràn số |

Điểm mấu chốt: chương trình có thể **qua hết** lexer, parser, type check (compile sạch) **mà vẫn lỗi lúc chạy**. Đó là lý do interpreter phải tự kiểm tra và báo lỗi runtime một cách lịch sự (không crash cả interpreter).

### 6.2. Ba lỗi runtime kinh điển

**(a) Chia cho 0.** \`eval(BinaryOp(/, L, R))\`: nếu \`eval(R) == 0\` → lỗi runtime "chia cho 0".

\`\`\`
eval(BinaryOp(/, Lit(10), Lit(0)), env)
  → l = 10, r = 0
  → r == 0 → ✗ RUNTIME ERROR: chia cho 0
\`\`\`

Chú ý: \`10 / 0\` **qua được** type check (cả hai đều là số, phép \`/\` hợp lệ về kiểu). Chỉ lúc chạy mới biết mẫu số bằng 0.

**(b) Biến chưa gán.** \`eval(Var(name))\`: nếu \`name\` không có trong \`env\` → lỗi runtime.

\`\`\`
env = { x: 5 }
eval(Var("y"), env)   → "y" ∉ env → ✗ RUNTIME ERROR: biến 'y' chưa được gán
\`\`\`

Đây là trường hợp "qua được semantic nhưng vẫn lỗi": nếu type check chỉ kiểm tra *kiểu* mà không kiểm tra *use-before-assign*, biến dùng trước khi gán sẽ lọt tới runtime.

**(c) Tràn số (overflow).** Phép tính cho kết quả vượt giới hạn biểu diễn (ví dụ số nguyên 32-bit vượt ~2.1 tỉ).

\`\`\`
eval(BinaryOp(*, Lit(2000000000), Lit(2)), env)
  → 4000000000 vượt giới hạn int32 → ✗ RUNTIME ERROR: tràn số (tùy ngôn ngữ: lỗi, hoặc quấn vòng về số âm)
\`\`\`

> ⚠ **Lỗi thường gặp: tưởng "compile sạch = không lỗi".** Compile sạch chỉ nghĩa là *cấu trúc và kiểu* đúng. Chia 0, index ngoài mảng, null pointer… đều là chương trình hợp lệ về cú pháp/kiểu nhưng **sai lúc chạy**. Một interpreter tốt phân biệt rõ hai loại để báo lỗi đúng giai đoạn: "lỗi cú pháp dòng 3" rất khác "chia cho 0 lúc chạy dòng 3".

> 🔁 **Dừng lại tự kiểm tra.** \`x = 6; y = x - 6; print 10 / y\` thuộc lỗi gì, lộ ra khi nào?
> <details><summary>Đáp án</summary>
> Compile sạch (cú pháp đúng, mọi thứ là số). Lúc chạy: \`y = 6 - 6 = 0\`, rồi \`10 / y = 10 / 0\` → <strong>lỗi runtime chia cho 0</strong>. Không pass nào trước runtime biết được \`y\` sẽ bằng 0, vì nó phụ thuộc giá trị tính ra lúc chạy.
> </details>

> 📝 **Tóm tắt §6.** Lỗi compile-time lộ khi đọc code (cú pháp, kiểu); lỗi runtime lộ khi chạy và phụ thuộc giá trị thật (chia 0, biến chưa gán, tràn). Compile sạch ≠ chạy đúng. Interpreter phải báo lỗi runtime mà không tự sập.

## 7. So sánh với compiler — vì sao tree-walking chậm?

> 💡 **Trực giác.** Tree-walking giống như **đọc lại công thức nấu ăn từ đầu mỗi lần làm món**: mỗi lần gặp \`x + 3\` trong vòng lặp, interpreter phải *lại* duyệt cây node \`BinaryOp\`, *lại* tra \`env["x"]\`, *lại* nhận diện toán tử \`+\`. Compiler thì giống **học thuộc công thức rồi viết ra một danh sách lệnh máy gọn**: việc "tra biến, nhận diện toán tử" làm **một lần lúc dịch**, sau đó chạy thẳng lệnh đã tối ưu.

### 7.1. Vì sao chậm

Trong vòng lặp \`while i < 1000000 { sum = sum + i; i = i + 1 }\`, mỗi vòng tree-walking phải:

1. Duyệt lại node \`While\`, node \`cond\`, node \`BinaryOp(<)\`…
2. Tra \`env\` cho \`i\`, \`sum\` bằng tra cứu map (chuỗi → giá trị) — chậm hơn đọc thanh ghi nhiều.
3. Phân nhánh theo *loại node* (switch/if để biết đây là \`+\` hay \`*\`…).

Tất cả lặp lại **một triệu lần**, dù cấu trúc cây không hề đổi. Đây là chi phí "duyệt cây mỗi lần".

### 7.2. Ba cấp độ thực thi

| Cách | Tốc độ | Độ phức tạp cài đặt | Ví dụ ngôn ngữ |
| --- | --- | --- | --- |
| **Tree-walking interpreter** | chậm nhất (1×) | đơn giản nhất | Ruby (MRI thời đầu), nhiều ngôn ngữ học thuật, shell |
| **Bytecode VM** (L13) | nhanh hơn ~5–50× | trung bình | Python (CPython), Java (JVM), Lua, Ruby (YARV) |
| **Compiler → mã máy / JIT** | nhanh nhất | phức tạp nhất | C, Go, Rust (mã máy); V8, PyPy (JIT) |

**Bytecode VM** là bước trung gian: thay vì duyệt cây mỗi lần, ta **dịch cây thành một danh sách lệnh phẳng (bytecode)** một lần, rồi chạy vòng lặp đơn giản trên danh sách đó — không còn chi phí duyệt cây và phân nhánh theo loại node mỗi lần. Sẽ học ở [Lesson 13 — Bytecode VM](../../03-Backend/lesson-03-bytecode-stack-vm/) (Tier 3).

### 7.3. Vậy tree-walking để làm gì?

Đừng vội chê chậm. Tree-walking thắng ở:

- **Đơn giản** — viết được trong một buổi, dễ hiểu, dễ sửa.
- **Khởi động nhanh** — không cần pha "biên dịch" trước khi chạy; hợp với script ngắn, REPL, config.
- **Là nền** — Python/Ruby gốc đều bắt đầu tree-walking rồi mới tiến hóa lên bytecode khi cần tốc độ.

> ❓ **Câu hỏi tự nhiên.** *"Python chậm vì là interpreter à?"* — Một phần. CPython thực ra là **bytecode VM** (đã nhanh hơn tree-walking thuần), nhưng vẫn chậm hơn C nhiều vì là VM chứ không phải mã máy. PyPy dùng **JIT** (dịch nóng phần code chạy nhiều thành mã máy) nên nhanh hơn CPython nhiều lần. Tốc độ là một phổ liên tục, không phải nhãn "nhanh/chậm" tuyệt đối.

> 📝 **Tóm tắt §7.** Tree-walking chậm vì duyệt lại cây + tra map biến mỗi lần. Bytecode VM (L13) dịch cây thành lệnh phẳng một lần → nhanh hơn. Compiler/JIT ra mã máy → nhanh nhất. Tree-walking thắng về đơn giản và khởi động nhanh; là bước khởi đầu của nhiều ngôn ngữ thật.

## 8. Bài tập

**Bài 1.** Cho \`env = { a: 10, b: 4 }\`. Tính giá trị (eval) của từng biểu thức, ghi rõ từng bước:
- \`BinaryOp(+, Var(a), Var(b))\`
- \`BinaryOp(-, Var(a), Lit(15))\`
- \`BinaryOp(*, BinaryOp(+, Var(a), Lit(2)), Var(b))\`
- \`BinaryOp(/, Var(a), BinaryOp(-, Var(b), Lit(4)))\`

**Bài 2.** Bắt đầu \`env = { }\`, chạy lần lượt các câu lệnh, ghi \`env\` sau mỗi bước:
\`\`\`
p = 3;
q = p + p;
p = q * 2;
r = p - q;
print r;
\`\`\`
Output là gì? \`env\` cuối là gì?

**Bài 3.** (Tự eval chương trình nhiều dòng) Tự thông dịch chương trình sau bằng tay, lập bảng giống §5.3:
\`\`\`
n = 4;
f = 1;
i = 1;
while i <= n {
    f = f * i;
    i = i + 1;
}
print f;
\`\`\`
Output là gì? (Gợi ý: đây là tính giai thừa.)

**Bài 4.** Với chương trình sau, chỉ ra mỗi câu eval nhánh nào (then hay else) và output cuối:
\`\`\`
x = 8;
if x > 10 { print 100 } else { print x * 2 };
if x == 8 { y = 1 } else { y = 0 };
print y;
\`\`\`

**Bài 5.** Mỗi đoạn dưới đây hoặc compile sạch chạy được, hoặc lỗi compile-time, hoặc lỗi runtime. Phân loại và giải thích:
- (a) \`x = 5; print x +\`
- (b) \`x = 5; print x / 0\`
- (c) \`print z\`
- (d) \`a = 2; b = a * a; print b\`

**Bài 6.** Chương trình \`s = 0; i = 1; while i < 5 { s = s + i; i = i + 1 }; print s\` chạy ra bao nhiêu? Lập bảng vòng lặp (cột \`i\`, \`cond\`, \`s\` sau mỗi vòng).

**Bài 7.** (Tư duy thiết kế) Ngôn ngữ đồ chơi của ta coi gán là *statement* (không trả giá trị). Nếu muốn cho phép \`y = (x = 5)\` (gán lồng, trả về giá trị vừa gán), bạn sẽ sửa quy tắc eval của \`Assign\` thế nào? Viết bằng pseudo-code.

## Lời giải chi tiết

### Bài 1

\`env = { a: 10, b: 4 }\`.

- \`BinaryOp(+, Var(a), Var(b))\`: \`eval(a)=10\`, \`eval(b)=4\` → \`10 + 4 = 14\`.
- \`BinaryOp(-, Var(a), Lit(15))\`: \`eval(a)=10\`, \`eval(Lit(15))=15\` → \`10 - 15 = -5\`.
- \`BinaryOp(*, BinaryOp(+, Var(a), Lit(2)), Var(b))\`:
  - con trái: \`eval(BinaryOp(+, Var(a), Lit(2))) = 10 + 2 = 12\`.
  - con phải: \`eval(b) = 4\`.
  - \`12 * 4 = 48\`.
- \`BinaryOp(/, Var(a), BinaryOp(-, Var(b), Lit(4)))\`:
  - con trái: \`eval(a) = 10\`.
  - con phải: \`eval(BinaryOp(-, Var(b), Lit(4))) = 4 - 4 = 0\`.
  - \`10 / 0\` → **lỗi runtime: chia cho 0** (mẫu số bằng 0, dù biểu thức hợp lệ về cú pháp/kiểu).

### Bài 2

Bắt đầu \`env = { }\`:

| Bước | Câu | eval RHS | env sau | Output |
| --- | --- | --- | --- | --- |
| 1 | \`p = 3\` | \`3\` | \`{ p:3 }\` | — |
| 2 | \`q = p + p\` | \`3+3=6\` | \`{ p:3, q:6 }\` | — |
| 3 | \`p = q * 2\` | \`6*2=12\` | \`{ p:12, q:6 }\` (ghi đè p) | — |
| 4 | \`r = p - q\` | \`12-6=6\` | \`{ p:12, q:6, r:6 }\` | — |
| 5 | \`print r\` | \`6\` | (không đổi) | \`6\` |

**Output: \`6\`.** env cuối: \`{ p:12, q:6, r:6 }\`. Điểm bẫy là bước 3 ghi đè \`p\` từ 3 thành 12, nên bước 4 dùng \`p = 12\`.

### Bài 3

Tính giai thừa \`4! = 24\`. Bắt đầu \`env = { }\`:

Sau 3 câu gán đầu: \`env = { n:4, f:1, i:1 }\`. Vào while (\`cond = i <= n\`):

| Vòng | \`i\` trước | \`cond = i <= 4\` | \`f = f*i\` | \`i = i+1\` | env sau |
| --- | --- | --- | --- | --- | --- |
| 1 | 1 | true | \`1*1=1\` | 2 | \`{ n:4, f:1, i:2 }\` |
| 2 | 2 | true | \`1*2=2\` | 3 | \`{ n:4, f:2, i:3 }\` |
| 3 | 3 | true | \`2*3=6\` | 4 | \`{ n:4, f:6, i:4 }\` |
| 4 | 4 | true (\`4<=4\`) | \`6*4=24\` | 5 | \`{ n:4, f:24, i:5 }\` |
| 5 | 5 | **false** (\`5<=4\`) | — | — | (dừng) |

\`print f\` → **Output: \`24\`.** Chú ý vòng 4 vẫn chạy vì \`4 <= 4\` đúng; vòng 5 mới thoát.

### Bài 4

\`env = { }\`:

- \`x = 8\` → \`env = { x:8 }\`.
- \`if x > 10 { print 100 } else { print x*2 }\`: \`cond = 8 > 10 = false\` → eval **nhánh else** → \`print 8*2\` → in \`16\`.
- \`if x == 8 { y = 1 } else { y = 0 }\`: \`cond = 8 == 8 = true\` → eval **nhánh then** → \`y = 1\` → \`env = { x:8, y:1 }\`.
- \`print y\` → in \`1\`.

**Output: \`16\` rồi \`1\`.** Nhánh eval: câu if-1 → else, câu if-2 → then.

### Bài 5

- (a) \`x = 5; print x +\` → **lỗi compile-time (syntax)**. Biểu thức \`x +\` thiếu toán hạng phải; parser (L04) báo lỗi cú pháp, chương trình chưa kịp chạy.
- (b) \`x = 5; print x / 0\` → **lỗi runtime (chia 0)**. Cú pháp và kiểu đều đúng (số chia số); chỉ lúc chạy mới thấy mẫu số = 0.
- (c) \`print z\` → **lỗi runtime (biến chưa gán)** — nếu type check không bắt use-before-def thì \`z\` lọt tới eval và \`z ∉ env\`. (Một số ngôn ngữ bắt sớm ở compile-time; ngôn ngữ đồ chơi của ta bắt ở runtime.)
- (d) \`a = 2; b = a*a; print b\` → **compile sạch, chạy được**: \`a=2\`, \`b=4\`, in \`4\`. Không lỗi.

### Bài 6

\`env = { }\` → sau \`s=0; i=1\` → \`{ s:0, i:1 }\`. While (\`cond = i < 5\`):

| Vòng | \`i\` trước | \`cond = i < 5\` | \`s = s+i\` | \`i = i+1\` | \`s\` sau | \`i\` sau |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | 1 | true | \`0+1=1\` | 2 | 1 | 2 |
| 2 | 2 | true | \`1+2=3\` | 3 | 3 | 3 |
| 3 | 3 | true | \`3+3=6\` | 4 | 6 | 4 |
| 4 | 4 | true | \`6+4=10\` | 5 | 10 | 5 |
| 5 | 5 | **false** (\`5<5\`) | — | — | 10 | 5 |

\`print s\` → **Output: \`10\`** (tổng \`1+2+3+4\`). env cuối: \`{ s:10, i:5 }\`.

### Bài 7

Hiện tại \`Assign\` không trả giá trị:

\`\`\`
eval(Assign(name, rhs), env):
    v = eval(rhs, env)
    env[name] = v
    # không trả gì
\`\`\`

Để cho phép gán lồng \`y = (x = 5)\`, chỉ cần **trả về \`v\`** sau khi ghi — biến gán thành một biểu thức có giá trị (chính là giá trị vừa gán):

\`\`\`
eval(Assign(name, rhs), env):
    v = eval(rhs, env)
    env[name] = v
    return v          # ← thêm dòng này: gán giờ là expression, trả giá trị vừa gán
\`\`\`

Khi đó \`y = (x = 5)\`: eval \`(x = 5)\` → ghi \`env["x"]=5\` và **trả \`5\`** → eval \`Assign(y, 5)\` → \`env["y"]=5\`. Cuối cùng \`env = { x:5, y:5 }\`. Đây chính là cách C/Python xử lý \`a = b = 0\`. Lưu ý đánh đổi: gán-trả-giá-trị tiện nhưng dễ gây lỗi gõ nhầm \`=\` thay \`==\` trong điều kiện \`if (x = 5)\` — nhiều ngôn ngữ hiện đại (Go) cố tình **cấm** gán trong biểu thức điều kiện để tránh bẫy này.

## Tham khảo và bài tiếp theo

- Tiền đề: [L06 — AST & Visitor](../lesson-01-ast-visitor/) · [L07 — Symbol Table & Scope](../lesson-02-symbol-table-scope/) · [L08 — Type Checking](../lesson-03-type-checking/).
- Bài tiếp: [Lesson 10 — Functions & Closures](../lesson-05-functions-closures/) — mở rộng interpreter để gọi hàm, truyền tham số, và bắt biến (closure) bằng cách lồng các \`env\`.
- Sẽ học sâu hơn về tốc độ: [Lesson 13 — Bytecode VM](../../03-Backend/lesson-03-bytecode-stack-vm/) (Tier 3) — dịch cây thành lệnh phẳng để chạy nhanh hơn tree-walking.
- Liên hệ cấu trúc dữ liệu: [DataStructures — Tree](../../../DataStructures/02-Intermediate/lesson-01-tree/) — \`eval\` là phép duyệt cây.
- Minh họa tương tác: [visualization.html](./visualization.html) — REPL ngôn ngữ đồ chơi chạy được, eval stepper từng node, và demo lỗi runtime.
`;
