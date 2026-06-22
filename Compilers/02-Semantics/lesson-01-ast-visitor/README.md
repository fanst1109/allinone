# Lesson 01 — AST & Visitor Pattern (cây cú pháp trừu tượng & duyệt cây)

> **Mở đầu Tier 2 — Semantics & Interpretation.** Tier 1 (Frontend) đã biến chuỗi ký tự nguồn thành **AST**. Từ đây trở đi mọi giai đoạn — kiểm tra kiểu, thông dịch, sinh mã — đều là **duyệt (traverse) cây AST này**. Bài học này dạy cách *thiết kế node sạch* và *duyệt gọn* để không phải viết lại logic duyệt cho từng tác vụ.

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Hiểu **AST (Abstract Syntax Tree)** là gì và vì sao nó khác **parse tree (concrete syntax tree)**.
- Thiết kế các loại node cho biểu thức: `NumberLit`, `BinaryOp`, `UnaryOp`, `Var`, `Assign` — bằng interface Go hoặc sum type.
- Phân biệt **pre-order / in-order / post-order** trên AST và hiểu **vì sao đánh giá (evaluate) dùng post-order**.
- Đánh giá `(2+3)*4` ra `20` bằng đệ quy post-order — từng bước, bằng số thật.
- Cài đặt **Visitor pattern**: tách thao tác (eval, print, typecheck) khỏi cấu trúc node, để thêm thao tác mới mà không sửa node.
- Viết **pretty-printer** (in lại mã) và **S-expression printer** (`(* (+ 2 3) 4)`) chỉ bằng cách đổi visitor.
- Thấy vì sao visitor này tái dùng nguyên vẹn cho typecheck (L08), interpreter (L09), codegen (Tier 3).

## Kiến thức tiền đề

- [L05 — Pratt Parsing](../../01-Frontend/lesson-05-pratt-precedence/) — bài cuối Tier 1; cho ra chính AST mà bài này duyệt. Hiểu cách precedence quyết định hình dạng cây là tiền đề.
- [L04 — Recursive-Descent Parser](../../01-Frontend/lesson-04-recursive-descent-parser/) — cách parser xây cây từ grammar.
- [DataStructures — Tree traversal](../../../DataStructures/02-Intermediate/lesson-01-tree/) — pre/in/post-order trên cây nhị phân tổng quát; bài này áp dụng đúng các kiểu duyệt đó lên AST.

## 1. Vì sao học AST & cách duyệt trước mọi giai đoạn sau?

### 1.1 Câu hỏi mở đầu

Giả sử parser ở Tier 1 đã cho bạn **cây AST của biểu thức `(2+3)*4`**:

```
      *
     / \
    +   4
   / \
  2   3
```

Bây giờ bạn cần làm **ba việc khác nhau** trên cùng cây này:

1. **Đánh giá (evaluate)** ra giá trị `20`.
2. **In lại** thành chuỗi `(2 + 3) * 4` (pretty-print) hoặc dạng `(* (+ 2 3) 4)` (S-expression).
3. **Kiểm tra kiểu (typecheck)**: cả hai vế của `*` có phải số không?

> 💡 **Trực giác / Hình dung.** Cây AST giống **bản thiết kế một ngôi nhà**. Cùng một bản vẽ, người thợ điện đi xem để lắp dây, thợ nước đi xem để đặt ống, người định giá đi xem để tính tiền — *không ai vẽ lại bản thiết kế*, mỗi người chỉ **đi qua từng phòng theo một mục đích riêng**. "Đi qua từng phòng" chính là **traversal**; "mục đích riêng" chính là **visitor**.

Câu hỏi cốt lõi của bài: **làm sao thực hiện cả 3 việc mà không viết lại logic "đi qua từng node" 3 lần?** Câu trả lời gồm hai phần:

- **Traversal** (mục 4) — quy tắc đi qua cây (con trước cha, hay cha trước con).
- **Visitor pattern** (mục 5) — tách "đi qua node nào" khỏi "làm gì tại node đó".

### 1.2 Vị trí AST trong pipeline trình biên dịch

```
source code  ──lexer──▶  tokens  ──parser──▶  AST  ──┬──▶ typecheck (L08)
   "(2+3)*4"             [ ( 2 + 3 ) * 4 ]            ├──▶ interpreter (L09)
                                                       └──▶ codegen (Tier 3)
```

AST là **giao diện chung** giữa frontend (đã xong) và mọi backend (sắp học). Vì thế đầu tư thiết kế node sạch + cách duyệt gọn ở đây sẽ trả cổ tức suốt phần còn lại của môn.

> 📝 **Tóm tắt mục 1**
> - AST là sản phẩm của parser, là đầu vào của *mọi* giai đoạn sau.
> - Eval / print / typecheck đều là **duyệt cùng một cây** với mục đích khác nhau.
> - Hai công cụ tách bạch: **traversal** (đi đâu) và **visitor** (làm gì).

## 2. AST vs Parse Tree (concrete syntax tree)

### 2.1 Hai loại cây

> 💡 **Trực giác.** **Parse tree** là *biên bản đầy đủ* của việc grammar khớp chuỗi nguồn — ghi lại mọi quy tắc, mọi dấu ngoặc, mọi token trung gian. **AST** là *bản tóm tắt ngữ nghĩa* — chỉ giữ những gì ảnh hưởng tới ý nghĩa, vứt đi cú pháp thừa.

Với chuỗi nguồn `(2+3)*4` và grammar điển hình:

```
expr   → term (('+' | '-') term)*
term   → factor (('*' | '/') factor)*
factor → NUMBER | '(' expr ')'
```

**Parse tree** (concrete — giữ NGUYÊN mọi node grammar và token):

```
            expr
              |
            term
           /  |  \
      factor  *   factor
       /|\          |
      ( expr )    NUMBER(4)
         |
       term
      /  |  \
  factor + factor
     |        |
 NUMBER(2) NUMBER(3)
```

**AST** (abstract — chỉ giữ cấu trúc ngữ nghĩa):

```
      *
     / \
    +   4
   / \
  2   3
```

Dấu ngoặc `(` `)` đã **biến mất** khỏi AST — không phải vì bị bỏ quên, mà vì **vai trò của chúng đã được mã hóa vào hình dạng cây**: ngoặc làm `+` nằm *dưới* `*`, nên `+` được tính trước. Cây không cần lưu lại dấu ngoặc nữa.

### 2.2 Bảng so sánh

| Tiêu chí | Parse tree (CST) | AST |
| --- | --- | --- |
| Giữ dấu ngoặc `()` | Có | Không (đã encode vào hình dạng) |
| Giữ token phân cách (`;`, `,`) | Có | Thường không |
| Node cho quy tắc grammar trung gian (`term`, `factor`) | Có | Không (gộp/bỏ) |
| Số node cho `(2+3)*4` | ~13 | 5 |
| Mục đích | Chứng minh chuỗi khớp grammar | Phục vụ giai đoạn sau (eval, typecheck...) |
| Ai tạo ra | Parser theo grammar | Parser, hoặc transform từ parse tree |

### 2.3 Bốn ví dụ AST cho các biểu thức khác nhau

1. **`5`** (chỉ một số):
   ```
   NumberLit(5)
   ```

2. **`-x`** (phủ định một biến):
   ```
   UnaryOp(-)
      |
    Var(x)
   ```

3. **`a + b * c`** (`*` ưu tiên hơn `+`, không cần ngoặc):
   ```
      +
     / \
    a   *
       / \
      b   c
   ```

4. **`x = 2 + 3`** (gán giá trị):
   ```
   Assign(x)
       |
       +
      / \
     2   3
   ```

> ⚠ **Lỗi thường gặp: lẫn lộn AST với parse tree.** Người mới hay vẽ AST mà vẫn nhét node `(` `)` hoặc node `term`/`factor` vào. Đó là parse tree, **không phải** AST. Quy tắc kiểm tra: *AST chỉ chứa node mang ý nghĩa tính toán* (toán tử, toán hạng). Nếu một node chỉ tồn tại để "khớp grammar" (như `factor → '(' expr ')'`) thì nó **không** thuộc AST. Hệ quả của lẫn lộn: bạn viết evaluator phải xử lý cả node `(` vô nghĩa, code rối và dễ sai.

> ❓ **Câu hỏi tự nhiên của người đọc.**
> - *"Vậy parser phải tạo parse tree rồi mới rút ra AST à?"* — Không bắt buộc. Recursive-descent / Pratt parser (L04, L05) thường **tạo thẳng AST**, bỏ qua parse tree đầy đủ. Parse tree đầy đủ chủ yếu xuất hiện ở các parser sinh tự động (yacc/ANTLR) hoặc khi cần.
> - *"Mất dấu ngoặc thì lúc in lại mã có sai thứ tự không?"* — Không, vì khi in lại từ AST ta **tự thêm ngoặc** đúng chỗ dựa trên độ ưu tiên (xem mục 6). Hình dạng cây đã giữ đủ thông tin.

> 🔁 **Dừng lại tự kiểm tra.**
> 1. Biểu thức `(a)` (một biến trong ngoặc) có AST là gì?
> 2. Vì sao AST của `2+3*4` và `2+(3*4)` giống hệt nhau?
>
> <details><summary>Đáp án</summary>
>
> 1. `Var(a)` — chỉ một node. Dấu ngoặc không mang ngữ nghĩa nên biến mất.
> 2. Vì `*` vốn ưu tiên hơn `+`, parser đặt `*` dưới `+` ngay cả khi không có ngoặc. Ngoặc trong `2+(3*4)` chỉ khẳng định lại điều đã đúng → cùng một cây.
> </details>

> 📝 **Tóm tắt mục 2**
> - Parse tree = biên bản đầy đủ của grammar; AST = bản tóm tắt ngữ nghĩa.
> - AST bỏ dấu ngoặc, token phân cách, node grammar trung gian.
> - Thông tin ngoặc không mất — nó nằm trong **hình dạng** cây.

## 3. Thiết kế node AST

### 3.1 Hai cách biểu diễn trong Go

Một AST là tập các *loại node khác nhau* nhưng cần đối xử thống nhất (đều là "một biểu thức"). Trong Go có 2 cách chuẩn:

**Cách A — interface + struct (Go-idiomatic):**

```go
// Expr là interface chung mọi node biểu thức cài đặt.
type Expr interface {
    isExpr() // marker method — chỉ để giới hạn kiểu, không làm gì
}

type NumberLit struct{ Value float64 }      // 5, 3.14
type Var       struct{ Name  string }       // x, total
type UnaryOp   struct{ Op    string; X Expr } // -x, !flag
type BinaryOp  struct{ Op    string; L, R Expr } // a+b, a*b
type Assign    struct{ Name  string; Value Expr } // x = ...

func (NumberLit) isExpr() {}
func (Var)       isExpr() {}
func (UnaryOp)   isExpr() {}
func (BinaryOp)  isExpr() {}
func (Assign)    isExpr() {}
```

`Expr` đóng vai **sum type** (kiểu tổng): một `Expr` *là một trong* các loại trên. Marker method `isExpr()` ngăn kiểu lạ lọt vào.

**Cách B — kiểu tag (gần với enum):** một struct duy nhất với trường `Kind`. Ít dùng trong Go vì interface gọn hơn; ngôn ngữ có sum type thật (Rust `enum`, Haskell `data`) thì cách này tự nhiên hơn.

### 3.2 Bốn (+) ví dụ node cho biểu thức cụ thể

Mỗi biểu thức nguồn ↦ một giá trị `Expr` cụ thể:

1. **`5`**
   ```go
   NumberLit{Value: 5}
   ```

2. **`-x`**
   ```go
   UnaryOp{Op: "-", X: Var{Name: "x"}}
   ```

3. **`2 + 3`**
   ```go
   BinaryOp{Op: "+", L: NumberLit{2}, R: NumberLit{3}}
   ```

4. **`(2 + 3) * 4`** (cây của bài)
   ```go
   BinaryOp{
       Op: "*",
       L:  BinaryOp{Op: "+", L: NumberLit{2}, R: NumberLit{3}},
       R:  NumberLit{4},
   }
   ```

5. **`total = a + b * c`**
   ```go
   Assign{
       Name: "total",
       Value: BinaryOp{
           Op: "+",
           L:  Var{"a"},
           R:  BinaryOp{Op: "*", L: Var{"b"}, R: Var{"c"}},
       },
   }
   ```

> ❓ **Câu hỏi tự nhiên.**
> - *"Vì sao `BinaryOp` không tách riêng `AddOp`, `MulOp`...?"* — Có thể tách, nhưng gộp vào một `BinaryOp` với trường `Op string` gọn hơn khi mọi toán tử nhị phân duyệt giống nhau (đều có 2 con). Tách riêng chỉ đáng khi mỗi toán tử có *cấu trúc* khác nhau, không chỉ khác *tên*.
> - *"`NumberLit` và `Var` đều là lá (leaf) — gộp được không?"* — Không nên. Chúng khác ngữ nghĩa: `NumberLit` đã có giá trị; `Var` phải *tra cứu* giá trị trong môi trường (sẽ học ở L07 Symbol Table). Visitor xử lý chúng khác nhau.

> 🔁 **Dừng lại tự kiểm tra.** Viết giá trị `Expr` cho `-(a + 1)`.
>
> <details><summary>Đáp án</summary>
>
> ```go
> UnaryOp{Op: "-", X: BinaryOp{Op: "+", L: Var{"a"}, R: NumberLit{1}}}
> ```
> Node ngoài cùng là `UnaryOp` vì toàn bộ `(a+1)` bị phủ định.
> </details>

> 📝 **Tóm tắt mục 3**
> - AST node = interface `Expr` (sum type) + nhiều struct loại node.
> - Node lá: `NumberLit`, `Var`. Node có con: `UnaryOp` (1 con), `BinaryOp` (2 con), `Assign`.
> - Mỗi biểu thức nguồn ↦ đúng một cây `Expr` lồng nhau.

## 4. Duyệt cây (traversal): pre / in / post-order

### 4.1 Ba thứ tự duyệt

Với mọi cây (xem [DataStructures — Tree traversal](../../../DataStructures/02-Intermediate/lesson-01-tree/)), ta thăm node theo một trong ba thứ tự — khác nhau ở **chỗ đặt việc "thăm node hiện tại" (N) so với việc duyệt con trái (L) và con phải (R)**:

| Thứ tự | Quy tắc | Khi nào dùng cho AST |
| --- | --- | --- |
| **Pre-order** | N → L → R (cha trước) | In dạng S-expression / prefix `(* (+ 2 3) 4)` |
| **In-order** | L → N → R (cha giữa) | In lại mã infix `(2 + 3) * 4` (cần thêm ngoặc) |
| **Post-order** | L → R → N (cha sau cùng) | **Đánh giá (evaluate)** — tính con trước cha |

### 4.2 Vì sao evaluate dùng post-order?

> 💡 **Trực giác.** Muốn tính `+` của hai vế, bạn **phải biết giá trị hai vế trước**. Tức là phải tính xong cả hai con rồi mới tính được cha. Đó đúng là định nghĩa **post-order**: L, R xong rồi mới tới N. Pre-order (tính cha trước) là vô lý ở đây — chưa có giá trị con thì cộng cái gì?

### 4.3 Walk-through: đánh giá `(2+3)*4` bằng post-order, ra `20`

Cây:

```
      * (N3)
     / \
   + 4 (N4: lá)
 (N0)
   / \
  2   3
(N1) (N2: lá)
```

Đệ quy `eval(node)`:

```go
func eval(e Expr) float64 {
    switch n := e.(type) {
    case NumberLit:
        return n.Value                       // lá: trả thẳng giá trị
    case BinaryOp:
        l := eval(n.L)                        // (1) tính con trái TRƯỚC
        r := eval(n.R)                        // (2) tính con phải TRƯỚC
        switch n.Op {                         // (3) GIỜ mới tính node hiện tại
        case "+": return l + r
        case "*": return l * r
        }
    }
    panic("node lạ")
}
```

Mô phỏng từng lời gọi (post-order: con trái → con phải → node):

| Bước | Lời gọi | Hành động | Trả về |
| --- | --- | --- | --- |
| 1 | `eval(*)` | gặp `BinaryOp(*)` → tính con trái trước | (chờ) |
| 2 | ↳ `eval(+)` | gặp `BinaryOp(+)` → tính con trái trước | (chờ) |
| 3 | &nbsp;&nbsp;&nbsp;↳ `eval(2)` | lá `NumberLit(2)` | **2** |
| 4 | ↳ `eval(+)` | có l=2, giờ tính con phải | (chờ) |
| 5 | &nbsp;&nbsp;&nbsp;↳ `eval(3)` | lá `NumberLit(3)` | **3** |
| 6 | ↳ `eval(+)` | l=2, r=3 → tính node: `2 + 3` | **5** |
| 7 | `eval(*)` | có l=5, giờ tính con phải | (chờ) |
| 8 | ↳ `eval(4)` | lá `NumberLit(4)` | **4** |
| 9 | `eval(*)` | l=5, r=4 → tính node: `5 * 4` | **20** |

Kết quả cuối: **`20`** ✓.

Thứ tự **thăm node** theo post-order là: `2, 3, +, 4, *` — đúng là chuỗi **postfix (RPN)** của biểu thức. Đối chiếu: tính RPN `2 3 + 4 *` trên stack cũng ra `20`.

> ⚠ **Lỗi thường gặp.** Đảo thứ tự tính con và tính cha (làm "pre-order eval"): cố cộng *trước khi* biết hai vế. Trong code đó là tính `n.Op` *trước khi* gọi `eval(n.L)`, `eval(n.R)` — sai logic ngay, vì `l`, `r` chưa có giá trị.

### 4.4 Bốn ví dụ thứ tự thăm node (để phân biệt 3 order)

Cùng cây `(2+3)*4`, node ghi nhãn `*`, `+`, `2`, `3`, `4`:

1. **Pre-order** (N→L→R): `*, +, 2, 3, 4` → đọc là prefix `(* (+ 2 3) 4)`.
2. **In-order** (L→N→R): `2, +, 3, *, 4` → đọc là infix `2 + 3 * 4` (mất ngoặc — phải tự thêm khi in!).
3. **Post-order** (L→R→N): `2, 3, +, 4, *` → đọc là postfix `2 3 + 4 *`.
4. **Cây khác — `a + b * c`** (`*` dưới `+`), post-order: `a, b, c, *, +`.

> 🔁 **Dừng lại tự kiểm tra.** Cây của `-(2 * 3)`: node ngoài là `UnaryOp(-)`, con là `BinaryOp(*)` với hai lá `2`, `3`. Viết thứ tự **post-order** và tính eval.
>
> <details><summary>Đáp án</summary>
>
> Post-order thăm: `2, 3, *, -`. Eval: `eval(2)=2`, `eval(3)=3`, `* → 6`, `- → -6`. Kết quả **-6**.
> </details>

> 📝 **Tóm tắt mục 4**
> - Ba order khác nhau ở vị trí "thăm N" so với L, R.
> - **Evaluate = post-order** vì phải có giá trị hai con trước khi tính cha.
> - Post-order thăm node = chuỗi postfix (RPN) của biểu thức.

## 5. Visitor pattern: tách thao tác khỏi cấu trúc node

### 5.1 Vấn đề: thêm thao tác mới

Ở mục 4 ta viết `eval` bằng một `switch` trên loại node. Giờ muốn thêm `pretty-print`, rồi `typecheck`, rồi `countNodes`... Có hai cách tổ chức:

**Cách "method trên node" (mỗi node tự biết làm mọi việc):**

```go
func (n BinaryOp) Eval() float64 { ... }
func (n BinaryOp) Print() string { ... }
func (n BinaryOp) Typecheck() Type { ... }   // thêm thao tác → sửa MỌI node
```

→ Thêm một **thao tác mới** = sửa *mọi loại node*. Tệ khi có nhiều loại node.

**Cách Visitor (mỗi thao tác là một object, biết xử lý mọi loại node):**

```go
type Visitor interface {
    VisitNumber(n NumberLit) any
    VisitVar(n Var) any
    VisitUnary(n UnaryOp) any
    VisitBinary(n BinaryOp) any
    VisitAssign(n Assign) any
}
```

→ Thêm một **thao tác mới** = viết *một* struct cài `Visitor`. Không đụng vào bất kỳ node nào.

> 💡 **Trực giác.** Tưởng tượng một bảo tàng (cây node) và nhiều loại khách tham quan (visitor): hướng dẫn viên, thợ sửa chữa, người kiểm kê. Mỗi *khách* tự biết "ở phòng tranh thì làm gì, ở phòng tượng thì làm gì". Bảo tàng không cần thay đổi khi có loại khách mới — chỉ cần thêm một khách mới. **Visitor = một loại khách = một thao tác trọn vẹn trên toàn cây.**

### 5.2 Cài đặt Visitor trong Go

Mỗi node có method `Accept(v Visitor)` gọi đúng method của visitor (double dispatch):

```go
func (n NumberLit) Accept(v Visitor) any { return v.VisitNumber(n) }
func (n Var)       Accept(v Visitor) any { return v.VisitVar(n) }
func (n UnaryOp)   Accept(v Visitor) any { return v.VisitUnary(n) }
func (n BinaryOp)  Accept(v Visitor) any { return v.VisitBinary(n) }
func (n Assign)    Accept(v Visitor) any { return v.VisitAssign(n) }
```

**Visitor 1 — Eval** (post-order: visit con trước):

```go
type Evaluator struct{}

func (Evaluator) VisitNumber(n NumberLit) any { return n.Value }
func (e Evaluator) VisitBinary(n BinaryOp) any {
    l := n.L.Accept(e).(float64)   // duyệt con trái trước
    r := n.R.Accept(e).(float64)   // rồi con phải
    switch n.Op {                  // rồi mới tính node
    case "+": return l + r
    case "*": return l * r
    }
    panic("op lạ")
}
// ... các Visit khác
```

**Visitor 2 — CountNodes** (đếm số node, post-order):

```go
type Counter struct{}

func (Counter) VisitNumber(n NumberLit) any { return 1 }
func (Counter) VisitVar(n Var) any          { return 1 }
func (c Counter) VisitBinary(n BinaryOp) any {
    return 1 + n.L.Accept(c).(int) + n.R.Accept(c).(int)
}
```

Cùng cây `(2+3)*4`: `Eval` → `20`, `Counter` → `5`. **Hai kết quả khác nhau từ một cây**, chỉ vì đổi visitor.

### 5.3 Phương án Go-idiomatic hơn: type switch

Trong Go thực tế, nhiều người bỏ `Accept`/`Visitor` interface và dùng thẳng **type switch** trong một hàm — gọn hơn cho cây nhỏ:

```go
func eval(e Expr) float64 {
    switch n := e.(type) {
    case NumberLit: return n.Value
    case BinaryOp:
        l, r := eval(n.L), eval(n.R)
        if n.Op == "+" { return l + r }
        return l * r
    }
    panic("node lạ")
}
```

Hai cách tương đương về tư tưởng (đều tách thao tác khỏi node). Visitor interface đáng dùng khi: nhiều thao tác, muốn compiler **ép phải xử lý đủ mọi loại node** (quên một `Visit` → lỗi biên dịch); type switch đáng dùng khi: ít thao tác, ưu tiên ngắn gọn.

### 5.4 So sánh: thêm node mới vs thêm thao tác mới

Đây là đánh đổi kinh điển ("expression problem"):

| | Visitor pattern | Method trên node / type switch |
| --- | --- | --- |
| Thêm **thao tác mới** (eval→print→typecheck) | **Dễ**: 1 struct visitor mới | Khó: sửa mọi node / nhân thêm một hàm switch |
| Thêm **loại node mới** (thêm `TernaryOp`) | **Khó**: sửa mọi visitor (thêm `VisitTernary`) | Dễ hơn: thêm 1 case ở mỗi switch |

> ⚠ **Lỗi thường gặp: sửa interface node phá nhiều visitor.** Khi bạn thêm một loại node (vd `TernaryOp` cho `cond ? a : b`) và mở rộng `Visitor` thêm `VisitTernary`, **mọi** struct đã cài `Visitor` (Evaluator, Printer, Typechecker, Counter...) đột nhiên **không còn thỏa interface** → loạt lỗi biên dịch. Đây là mặt trái của visitor: cấu trúc node bị "đóng băng". Hệ quả: trước khi chọn visitor, cân nhắc *bạn sẽ hay thêm thao tác hay hay thêm loại node hơn?* Hay thêm thao tác → visitor; hay thêm node → type switch.

> ❓ **Câu hỏi tự nhiên.**
> - *"`any` (interface{}) làm mất type safety không?"* — Có phần. Đó là giá của Visitor tổng quát trong Go (chưa generic hóa). Có thể dùng generics `Visitor[T]` để mỗi visitor trả kiểu riêng (Eval→float64, Print→string), an toàn hơn nhưng dài hơn.
> - *"Visitor luôn post-order à?"* — Không. Bạn quyết định *khi nào* gọi `Accept` trên con. Gọi sau khi xử lý node = pre-order; gọi trước = post-order. Eval cần post-order; một visitor in cây có thể pre-order.

> 🔁 **Dừng lại tự kiểm tra.** Bạn cần thêm thao tác "thu thập tên mọi biến (`Var`) trong cây". Visitor hay type switch? Phác cấu trúc.
>
> <details><summary>Đáp án</summary>
>
> Thao tác mới → **visitor** (hoặc một hàm type switch) là phù hợp, không cần sửa node:
> ```go
> type VarCollector struct{ names []string }
> func (c *VarCollector) VisitVar(n Var) any    { c.names = append(c.names, n.Name); return nil }
> func (c *VarCollector) VisitBinary(n BinaryOp) any { n.L.Accept(c); n.R.Accept(c); return nil }
> // NumberLit: không làm gì
> ```
> </details>

> 📝 **Tóm tắt mục 5**
> - Visitor tách *thao tác* (eval/print/typecheck) khỏi *cấu trúc node*.
> - Thêm thao tác → 1 visitor mới, không đụng node. Thêm node → phải sửa mọi visitor.
> - Go: dùng `Visitor` interface + `Accept` (an toàn, ép xử lý đủ) hoặc type switch (gọn).

## 6. Pretty-printer & các biểu diễn khác của AST

Cùng cây, các visitor in khác nhau cho ra các biểu diễn khác nhau:

### 6.1 S-expression (prefix) — pre-order

Mỗi node in `(op con-trái con-phải)`:

```go
type SExpr struct{}
func (SExpr) VisitNumber(n NumberLit) any { return fmt.Sprintf("%g", n.Value) }
func (s SExpr) VisitBinary(n BinaryOp) any {
    return fmt.Sprintf("(%s %s %s)", n.Op, n.L.Accept(s), n.R.Accept(s))
}
```

Trên `(2+3)*4` → `(* (+ 2 3) 4)`. Đẹp vì **không bao giờ cần ngoặc để định ưu tiên** — cấu trúc đã rõ qua dấu ngoặc Lisp.

### 6.2 Pretty-printer (infix) — in lại mã nguồn

Khó hơn S-expression vì phải **tự thêm ngoặc đúng chỗ**. Quy tắc: nếu con là toán tử *ưu tiên thấp hơn* cha, phải bọc ngoặc.

- `(2+3)*4`: con trái `+` (ưu tiên thấp) nằm dưới `*` (ưu tiên cao) → **cần ngoặc** → in `(2 + 3) * 4`.
- `2+3*4`: con phải `*` (ưu tiên cao) nằm dưới `+` (thấp) → **không cần ngoặc** → in `2 + 3 * 4`.

```go
func prec(op string) int { if op == "*" || op == "/" { return 2 }; return 1 }

type Pretty struct{}
func (Pretty) VisitNumber(n NumberLit) any { return fmt.Sprintf("%g", n.Value) }
func (p Pretty) VisitBinary(n BinaryOp) any {
    l := n.L.Accept(p).(string)
    r := n.R.Accept(p).(string)
    if lb, ok := n.L.(BinaryOp); ok && prec(lb.Op) < prec(n.Op) { l = "(" + l + ")" }
    if rb, ok := n.R.(BinaryOp); ok && prec(rb.Op) < prec(n.Op) { r = "(" + r + ")" }
    return fmt.Sprintf("%s %s %s", l, n.Op, r)
}
```

### 6.3 Bốn biểu diễn của cùng cây `(2+3)*4`

| Visitor | Order | Kết quả |
| --- | --- | --- |
| Eval | post | `20` |
| S-expression | pre | `(* (+ 2 3) 4)` |
| Pretty (infix) | in | `(2 + 3) * 4` |
| Postfix (RPN) | post | `2 3 + 4 *` |

> ❓ **Câu hỏi tự nhiên.** *"In lại mã rồi parse lại có ra đúng cây cũ không?"* — Nếu pretty-printer thêm ngoặc đúng thì **có** (gọi là round-trip). Đây là cách kiểm thử parser/printer: `parse(print(ast))` phải bằng `ast`.

> 📝 **Tóm tắt mục 6**
> - Đổi visitor = đổi biểu diễn: eval / S-expr / infix / postfix — cùng một cây.
> - S-expr không cần ngoặc ưu tiên; pretty-print infix phải tự thêm ngoặc theo precedence.

## 7. Liên hệ: visitor tái dùng ở đâu?

AST + visitor không phải bài tập riêng lẻ — đây là **bộ khung dùng lại suốt phần còn lại của môn**:

- **L07 — [Symbol Table & Scope](../lesson-02-symbol-table-scope/)**: `Var` và `Assign` cần tra/ghi giá trị theo phạm vi — một visitor đi qua cây và quản lý bảng ký hiệu.
- **L08 — Type Checking**: một `Typechecker` visitor, mỗi `Visit` trả về *kiểu* thay vì *giá trị*; `VisitBinary` kiểm tra hai vế cùng kiểu số.
- **L09 — Interpreter**: chính là `Evaluator` ở mục 5, mở rộng cho biến, hàm, câu lệnh — vẫn là visitor post-order.
- **Tier 3 — Code Generation**: một `CodeGen` visitor sinh mã máy ảo / assembly; `VisitBinary` sinh lệnh `ADD`/`MUL` sau khi sinh mã cho hai con (post-order).

Cùng một cây, cùng một khung duyệt — **chỉ đổi visitor**. Đó là lý do đầu tư hiểu AST & visitor ở đây trả cổ tức về sau.

Về phía cấu trúc dữ liệu, ba thứ tự duyệt ở mục 4 chính là pre/in/post-order tổng quát đã học ở [DataStructures — Tree traversal](../../../DataStructures/02-Intermediate/lesson-01-tree/) — AST chỉ là một cây có node mang ngữ nghĩa.

> 📝 **Tóm tắt mục 7**
> - Visitor pattern là khung chung cho typecheck (L08), interpreter (L09), codegen (Tier 3).
> - Mỗi giai đoạn = một visitor; cấu trúc node và cách duyệt giữ nguyên.

## 8. Bài tập

**Bài 1.** Vẽ AST (không phải parse tree) cho các biểu thức sau, ghi rõ loại từng node:
- (a) `7`
- (b) `-a`
- (c) `a * b + c`
- (d) `a * (b + c)`
- (e) `x = a - b`

**Bài 2.** Cho cây `(a + b) * (c - d)`. Viết thứ tự thăm node theo **pre-order**, **in-order**, **post-order**.

**Bài 3.** (Tự duyệt — eval bằng số thật) Cho AST của `2 * (3 + 4) - 5`. Mô phỏng `eval` post-order theo bảng từng bước (như mục 4.3), ra kết quả cuối.

**Bài 4.** (Viết visitor) Viết một visitor `Depth` tính **chiều cao** (số tầng) của AST: lá có depth 1, node có con = `1 + max(depth con)`. Tính cho cây `(2+3)*4`.

**Bài 5.** (Viết visitor) Viết visitor `ConstFold` (gấp hằng số): nếu một `BinaryOp` có **cả hai con là `NumberLit`**, thay nó bằng `NumberLit` chứa kết quả. Áp dụng cho `(2+3)*x`: kết quả phải là cây `5 * x`.

**Bài 6.** (Pretty-print với ngoặc) Cho cây của `a - (b - c)` (chú ý: `-` không kết hợp như `+`). Pretty-printer ở mục 6.2 (chỉ so precedence) in ra gì? Nó có đúng ngữ nghĩa không? Giải thích vì sao chỉ so precedence là chưa đủ với toán tử **không kết hợp / trái-kết hợp**.

**Bài 7.** (AST vs parse tree) Cho `((x))`. Vẽ parse tree (với grammar `factor → '(' expr ')' | VAR`) và AST. Đếm số node mỗi cây.

**Bài 8.** (Thiết kế node) Thêm loại node `Call` cho lời gọi hàm `f(a, b)` (tên hàm + danh sách đối số là `[]Expr`). Khai báo struct, method `isExpr`/`Accept`, và nêu **những visitor nào** phải sửa khi thêm node này (minh họa lỗi "sửa node phá nhiều visitor").

## Lời giải chi tiết

### Bài 1

- (a) `NumberLit(7)` — một node lá.
- (b) `UnaryOp(-) → Var(a)` — node `UnaryOp`, con là lá `Var`.
- (c) `a * b + c`: `*` ưu tiên hơn `+` nên `*` nằm dưới `+`:
  ```
      +
     / \
    *   c
   / \
  a   b
  ```
  Gốc `BinaryOp(+)`, con trái `BinaryOp(*)` với lá `Var(a)`, `Var(b)`; con phải `Var(c)`.
- (d) `a * (b + c)`: ngoặc ép `+` xuống dưới `*`:
  ```
      *
     / \
    a   +
       / \
      b   c
  ```
- (e) `x = a - b`: `Assign(x)` với `Value = BinaryOp(-){Var(a), Var(b)}`.

### Bài 2

Cây `(a + b) * (c - d)`:
```
        *
      /   \
     +     -
    / \   / \
   a   b c   d
```
- **Pre-order** (N→L→R): `*, +, a, b, -, c, d`
- **In-order** (L→N→R): `a, +, b, *, c, -, d`
- **Post-order** (L→R→N): `a, b, +, c, d, -, *`

### Bài 3

Cây `2 * (3 + 4) - 5`. Cấu trúc: gốc `-`, con trái `*` (con của nó: `2` và `(3+4)`), con phải `5`.
```
         -
       /   \
      *     5
     / \
    2   +
       / \
      3   4
```
Post-order eval:

| Bước | Lời gọi | Hành động | Trả về |
| --- | --- | --- | --- |
| 1 | `eval(-)` | tính con trái `*` trước | (chờ) |
| 2 | ↳ `eval(*)` | tính con trái `2` trước | (chờ) |
| 3 | &nbsp;&nbsp;↳ `eval(2)` | lá | **2** |
| 4 | ↳ `eval(*)` | l=2, tính con phải `+` | (chờ) |
| 5 | &nbsp;&nbsp;↳ `eval(+)` | tính `3` rồi `4` → `3+4` | **7** |
| 6 | ↳ `eval(*)` | l=2, r=7 → `2*7` | **14** |
| 7 | `eval(-)` | l=14, tính con phải `5` | (chờ) |
| 8 | ↳ `eval(5)` | lá | **5** |
| 9 | `eval(-)` | l=14, r=5 → `14-5` | **9** |

Kết quả: **`9`** ✓. (Kiểm tra: `2*(3+4)-5 = 2*7-5 = 14-5 = 9`.)

### Bài 4

```go
type Depth struct{}
func (Depth) VisitNumber(n NumberLit) any { return 1 }
func (Depth) VisitVar(n Var) any          { return 1 }
func (d Depth) VisitUnary(n UnaryOp) any  { return 1 + n.X.Accept(d).(int) }
func (d Depth) VisitBinary(n BinaryOp) any {
    dl := n.L.Accept(d).(int)
    dr := n.R.Accept(d).(int)
    if dl > dr { return 1 + dl }
    return 1 + dr
}
```
Cây `(2+3)*4`: lá `2,3` depth 1; node `+` = `1+max(1,1)=2`; lá `4` depth 1; gốc `*` = `1+max(2,1)=3`. **Chiều cao = 3**.

### Bài 5

`ConstFold` trả về một `Expr` (cây đã gấp), duyệt post-order — gấp con trước, rồi xét node:

```go
func constFold(e Expr) Expr {
    b, ok := e.(BinaryOp)
    if !ok { return e } // lá: giữ nguyên
    l := constFold(b.L) // gấp con trái trước (post-order)
    r := constFold(b.R) // rồi con phải
    ln, lok := l.(NumberLit)
    rn, rok := r.(NumberLit)
    if lok && rok { // CẢ HAI con là hằng → tính luôn
        switch b.Op {
        case "+": return NumberLit{ln.Value + rn.Value}
        case "*": return NumberLit{ln.Value * rn.Value}
        }
    }
    return BinaryOp{Op: b.Op, L: l, R: r} // không gấp được, trả cây với con đã gấp
}
```
Với `(2+3)*x`: con trái `2+3` có hai con hằng → gấp thành `NumberLit(5)`. Con phải `x` là `Var`, không hằng. Node `*` có con trái hằng (`5`) nhưng con phải không → **không gấp**, trả `BinaryOp(*){NumberLit(5), Var(x)}` = cây **`5 * x`** ✓.

### Bài 6

Cây `a - (b - c)`:
```
    -
   / \
  a   -
     / \
    b   c
```
Pretty-printer mục 6.2 chỉ so **precedence**. Con phải là `-` (precedence 1) = cha `-` (precedence 1). Điều kiện `prec(con) < prec(cha)` là `1 < 1` → **sai** → **không** thêm ngoặc → in `a - b - c`.

Nhưng `a - b - c` được parse lại là `(a - b) - c` ≠ `a - (b - c)` về giá trị (vd `a=10,b=5,c=2`: `a-(b-c)=10-3=7`, còn `(a-b)-c=5-2=3`). **Sai ngữ nghĩa!**

Lý do: `-` **trái-kết hợp** (left-associative). Khi con phải có *cùng* precedence với cha và toán tử trái-kết hợp, vẫn cần ngoặc. Sửa: điều kiện bọc ngoặc con phải phải là `prec(con) <= prec(cha)` (cho toán tử trái-kết hợp), hoặc xét cả associativity. Bài học: **so precedence là cần nhưng chưa đủ — phải tính cả associativity** (đây cũng là lý do Pratt parser ở L05 phân biệt left/right binding power).

### Bài 7

`((x))` với `factor → '(' expr ')' | VAR`.

**Parse tree** (mỗi cặp ngoặc sinh một tầng `factor → ( expr )`):
```
factor
 ( expr )
    |
  term
    |
  factor
   ( expr )
      |
    term
      |
    factor
      |
    VAR(x)
```
Số node parse tree: nhiều (mỗi `factor`, `expr`, `term`, mỗi token `(` `)` đều là node) — đếm node ngữ pháp + token cỡ ~11–13 tùy cách tính.

**AST**: `Var(x)` — **1 node**. Mọi dấu ngoặc và quy tắc trung gian biến mất vì không mang ngữ nghĩa. Đây là minh họa rõ nhất AST << parse tree về số node.

### Bài 8

```go
type Call struct {
    Name string
    Args []Expr
}
func (Call) isExpr() {}
func (n Call) Accept(v Visitor) any { return v.VisitCall(n) }
```
Phải mở rộng interface: `Visitor` thêm method `VisitCall(n Call) any`. Hệ quả: **mọi** struct đã cài `Visitor` — `Evaluator`, `Pretty`, `SExpr`, `Counter`, `Depth` (và bất kỳ visitor nào khác) — đều phải thêm `VisitCall`, nếu không **không còn thỏa interface `Visitor`** → lỗi biên dịch hàng loạt. Đây chính xác là cảnh báo ở mục 5.4: *thêm loại node → sửa mọi visitor*. (Mặt tốt: compiler ép bạn không quên xử lý `Call` ở bất kỳ thao tác nào — an toàn.)

## Tham khảo và bài tiếp theo

- Bài trước (cuối Tier 1): [L05 — Pratt Parsing](../../01-Frontend/lesson-05-pratt-precedence/) — cách parser quyết định hình dạng AST qua precedence.
- Nền tảng cây: [DataStructures — Tree traversal](../../../DataStructures/02-Intermediate/lesson-01-tree/) — pre/in/post-order tổng quát.
- **Bài tiếp theo**: [L07 — Symbol Table & Scope](../lesson-02-symbol-table-scope/) — visitor đầu tiên cần "trạng thái": quản lý biến và phạm vi khi duyệt cây.
- Visitor này còn tái dùng ở: Type Checking (L08), Interpreter (L09), Code Generation (Tier 3).
- Minh họa tương tác: [visualization.html](./visualization.html) — AST traversal animator (pre/in/post + eval tích lũy), visitor switcher (Eval / Pretty / S-expr / Count), và so sánh AST vs parse tree.
