# Lesson 04 — Recursive-Descent Parser (token → AST)

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Hiểu **vì sao** cần một parser: biến dãy token phẳng thành **cây cú pháp trừu tượng (AST — Abstract Syntax Tree)** phản ánh đúng cấu trúc và **độ ưu tiên (precedence)** của biểu thức.
- Nắm **ý tưởng recursive-descent**: mỗi non-terminal của grammar trở thành một **hàm**, các hàm gọi nhau theo cấu trúc grammar (top-down).
- Biết **khử đệ quy trái (left-recursion elimination)** — vì sao luật `E → E + T` không dùng trực tiếp được và cách chuyển nó thành vòng lặp.
- Viết được `parseExpr / parseTerm / parseFactor` bằng Go, với `peek / consume / expect` (lookahead 1 token — lớp grammar **LL(1)**).
- Dựng được AST bằng tay cho một biểu thức và **verify** rằng `*` nằm dưới `+` (ưu tiên đúng).
- Biết hạn chế của recursive-descent và vì sao **Pratt parsing** (Lesson 05) gọn hơn khi có nhiều mức ưu tiên.

## Kiến thức tiền đề

- [Lesson 03 — Grammar & CFG](../lesson-03-grammar-cfg/) — non-terminal, terminal, luật sinh (production), cây dẫn xuất (parse tree). **Bắt buộc** đọc trước: recursive-descent chính là "thi hành" một grammar.
- [DataStructures — Tree](../../../DataStructures/02-Intermediate/lesson-01-tree/) — AST là một cây; node có con trái/phải.
- [DataStructures — Stack](../../../DataStructures/01-Basic/lesson-04-stack/) — đệ quy hàm chạy trên **call stack**; hiểu stack giúp hình dung parser hoạt động.
- [DataFoundations — Proof & Induction](../../../DataFoundations/03-MathFoundations/lesson-05-proof-induction/) — đệ quy = quy nạp; ta sẽ lập luận "vì sao parser dừng" bằng kiểu quy nạp trên độ dài input.

---

## 1. Vì sao cần parser? Đặt vấn đề cụ thể

Lexer (bài trước trong pipeline) cho ta một **dãy token phẳng**. Ví dụ với chuỗi nguồn `2 + 3 * 4`:

```
[ NUM(2), PLUS, NUM(3), STAR, NUM(4) ]
```

Đây chỉ là một danh sách — **không có cấu trúc**. Nhưng máy tính phải biết tính `3 * 4` **trước** rồi mới cộng `2`, vì `*` ưu tiên cao hơn `+`. Câu hỏi mở bài:

> **Cho `[NUM(2), PLUS, NUM(3), STAR, NUM(4)]` — làm sao dựng đúng cây mà `*` nằm DƯỚI `+`?**

Hai cây có thể dựng từ cùng dãy token này:

```
   CÂY ĐÚNG (×16 nằm sâu hơn)        CÂY SAI (cộng trước)
          +                                  *
         / \                                / \
       2    *                              +   4
           / \                            / \
          3   4                          2   3
   = 2 + (3*4) = 14                = (2+3) * 4 = 20
```

Kết quả khác hẳn: **14** vs **20**. Parser có nhiệm vụ chọn **cây đúng** — cây mà khi tính từ lá lên gốc cho ra `14`. "Đúng" ở đây nghĩa là **khớp với grammar** mô tả ngôn ngữ (Lesson 03): grammar đặt `*` ở tầng "sâu hơn" `+`, nên parser dựng cây sao cho phép nhân là con của phép cộng.

> 💡 **Trực giác / Hình dung.** Dãy token giống một câu tiếng Việt viết liền không dấu câu: *"ăn cơm với cá kho"*. Mắt bạn tự nhóm "cá kho" thành một cụm trước, rồi mới "ăn cơm với [cá kho]". Parser làm đúng việc đó cho biểu thức: nó **nhóm** các token thành cụm theo luật ưu tiên, biến câu phẳng thành **cây cụm**. Cây này (AST) sau đó được interpreter/compiler "đọc" để tính hoặc sinh mã.

**AST so với parse tree.** Parse tree (cây dẫn xuất ở Lesson 03) ghi lại MỌI bước áp dụng luật grammar, kể cả các node trung gian như `Term`, `Factor` chỉ có một con. **AST** là phiên bản gọn: bỏ các node "chuyền tiếp" vô nghĩa, chỉ giữ những gì cần để tính/sinh mã (toán tử + toán hạng). Trong bài này khi nói "dựng cây" ta hiểu là dựng **AST**.

> 📝 **Tóm tắt mục 1.** (1) Lexer cho dãy token phẳng, không cấu trúc. (2) Cùng một dãy token có thể ghép thành nhiều cây — parser phải chọn cây khớp grammar (đúng ưu tiên). (3) AST = cây gọn chỉ giữ toán tử + toán hạng, là đầu vào cho giai đoạn sau (interpreter/codegen).

---

## 2. Ý tưởng recursive-descent: mỗi non-terminal = một hàm

### 2.1. Grammar khởi điểm

Lesson 03 cho ta grammar cho biểu thức số học (cộng/nhân, có ngoặc):

```
E → E + T  |  T          (Expr: tổng các Term)
T → T * F  |  F          (Term: tích các Factor)
F → ( E )  |  num        (Factor: số, hoặc biểu thức trong ngoặc)
```

Tầng grammar ép sẵn ưu tiên: `*` ở luật `T` (sâu hơn), `+` ở luật `E` (nông hơn). Vì `F` nằm dưới `T` nằm dưới `E`, khi dựng cây, phép nhân tự động chui xuống dưới phép cộng. Đây là **mẹo grammar mã hoá ưu tiên bằng tầng**.

### 2.2. Ánh xạ non-terminal → hàm

Ý tưởng cốt lõi của **recursive-descent (đệ quy đi xuống)**: viết **một hàm cho mỗi non-terminal**. Thân hàm bắt chước vế phải của luật. Khi một luật tham chiếu non-terminal khác, hàm tương ứng được **gọi**.

| Non-terminal | Hàm | Trách nhiệm |
|---|---|---|
| `E` | `parseExpr()` | đọc một tổng (chuỗi Term nối bằng `+`) |
| `T` | `parseTerm()` | đọc một tích (chuỗi Factor nối bằng `*`) |
| `F` | `parseFactor()` | đọc một số, hoặc `(` rồi gọi lại `parseExpr()` |

> 💡 **Trực giác / Hình dung.** Hãy nghĩ về nó như một bộ ba người chuyên trách. `parseExpr` là "anh tổng": anh chỉ biết cộng, nhưng mỗi "số hạng" anh không tự đọc mà nhờ "anh tích" `parseTerm`. `parseTerm` chỉ biết nhân, mỗi "thừa số" lại nhờ "anh đơn vị" `parseFactor`. `parseFactor` đọc một số trần — trừ khi gặp `(`, lúc đó nó nhờ ngược lại "anh tổng" xử lý cả khối trong ngoặc. Ba người gọi qua gọi lại nhau y hệt cấu trúc grammar.

**Liên hệ tiền đề.** Việc các hàm gọi nhau lồng nhau chính là **đệ quy** ([DataFoundations](../../../DataFoundations/03-MathFoundations/lesson-05-proof-induction/)): `parseFactor` có thể gọi `parseExpr` (qua ngoặc), tạo vòng đệ quy. Mỗi lời gọi hàm đẩy một khung lên **call stack** ([DataStructures Stack](../../../DataStructures/01-Basic/lesson-04-stack/)) — chiều sâu ngoặc lồng nhau = chiều cao stack. "Top-down" nghĩa là ta bắt đầu từ **gốc** grammar (`E`) đi **xuống** lá, ngược với "bottom-up" (gộp lá lên gốc, sẽ gặp ở các parser khác).

> ❓ **Câu hỏi tự nhiên của người đọc.**
> - *"Vì sao một hàm cho mỗi non-terminal, không phải một hàm khổng lồ?"* Vì grammar phân tầng theo non-terminal; tách hàm theo tầng giúp ưu tiên tự đúng (hàm tầng sâu chạy trước, kết quả của nó nằm dưới trong cây) và code khớp 1-1 với grammar nên dễ kiểm tra.
> - *"Parser có cần backtrack (thử rồi lùi) không?"* Với grammar LL(1) (mục 5) thì **không** — chỉ cần nhìn 1 token phía trước (lookahead) là biết đi nhánh nào. Đây là điều làm recursive-descent nhanh và đơn giản.

> 🔁 **Dừng lại tự kiểm tra.** Với grammar `E → E + T | T`, `T → T * F | F`, `F → (E) | num`, hàm nào sẽ được gọi để xử lý token `(` ?
> <details><summary>Đáp án</summary>
> `parseFactor()`. Chỉ luật của `F` mới bắt đầu bằng `(`. Khi `parseFactor` thấy `(`, nó consume `(`, gọi `parseExpr()` để đọc biểu thức bên trong, rồi `expect` một `)`.
> </details>

> 📝 **Tóm tắt mục 2.** (1) Mỗi non-terminal → một hàm; thân hàm bắt chước vế phải luật. (2) Luật tham chiếu non-terminal khác → gọi hàm tương ứng (đệ quy). (3) Top-down: bắt đầu từ gốc grammar đi xuống. (4) Đệ quy chạy trên call stack; chiều sâu ngoặc = chiều cao stack.

---

## 3. Khử đệ quy trái — biến luật lặp thành vòng `while`

### 3.1. Vì sao `E → E + T` KHÔNG dùng trực tiếp được

Thử dịch thẳng luật `E → E + T` thành hàm theo kiểu "mỗi non-terminal bên phải = một lời gọi":

```go
// ❌ SAI — đệ quy trái, lặp vô hạn
func parseExpr() Node {
    left := parseExpr()   // gọi chính mình NGAY dòng đầu, chưa đọc token nào!
    expect(PLUS)
    right := parseTerm()
    return Add(left, right)
}
```

`parseExpr` gọi `parseExpr` ở dòng đầu tiên **mà chưa tiêu thụ token nào**. Lời gọi đó lại gọi `parseExpr`... mãi mãi. Stack đầy → tràn (stack overflow). Đây là **đệ quy trái (left recursion)**: non-terminal tự gọi chính nó ở **vị trí trái nhất** của luật.

> ⚠ **Lỗi thường gặp #1 — đệ quy trái gây lặp vô hạn.** Bất cứ luật dạng `A → A α` (A xuất hiện ngay đầu vế phải của chính nó) đều khiến recursive-descent vào vòng lặp vô tận. **Recursive-descent KHÔNG tự xử lý được đệ quy trái** — phải khử nó trước. Phản chứng: chạy đoạn code SAI ở trên với input `2+3` → nó không bao giờ đọc tới `2`, treo ngay.

### 3.2. Cách khử: chuyển luật lặp-trái thành lặp-lặp

Luật `E → E + T | T` thực ra mô tả: *"một `T`, theo sau bởi 0 hoặc nhiều `+ T`"*. Viết lại dạng EBNF:

```
E → T ( '+' T )*          (một Term, rồi lặp: dấu + và một Term nữa)
T → F ( '*' F )*
F → '(' E ')' | num
```

`( ... )*` nghĩa là "lặp 0+ lần" — đúng là một **vòng `while`**. Khử đệ quy trái = đổi đệ-quy-trái thành **vòng lặp**:

```go
// ✅ ĐÚNG — vòng lặp thay cho đệ quy trái
func parseExpr() Node {
    t := parseTerm()              // đọc Term ĐẦU TIÊN trước (đã tiêu thụ token → không treo)
    for peek() == PLUS {          // còn dấu '+' thì lặp
        consume()                 // ăn dấu '+'
        right := parseTerm()      // đọc Term tiếp theo
        t = &BinaryOp{Op: "+", Left: t, Right: right}  // gắn vào cây, NHÁNH TRÁI lớn dần
    }
    return t
}
```

Điểm mấu chốt: dòng đầu `parseTerm()` **tiêu thụ ít nhất một token** trước khi vòng lặp chạy → không còn lặp vô hạn. Mỗi vòng lặp gắn thêm một tầng `+` vào **bên trái** cây, cho ra cây **gắn-trái (left-associative)**: `a + b + c` thành `((a + b) + c)`, đúng quy ước trừ/cộng đọc từ trái sang.

> 💡 **Trực giác.** Đệ quy trái và vòng lặp tả cùng một thứ ("một chuỗi gắn-trái"), nhưng đệ quy trái bảo "đọc phần đuôi trước" (không khả thi khi chưa biết đuôi dài bao nhiêu), còn vòng lặp bảo "đọc đầu trước, rồi nối thêm" (khả thi). Như xếp toa tàu: bạn không thể móc toa cuối khi chưa có toa nào — phải bắt đầu từ đầu tàu rồi móc dần.

### 3.3. Walk-through code Go đầy đủ ba hàm

```go
func parseTerm() Node {
    f := parseFactor()            // đọc Factor đầu
    for peek() == STAR {          // còn '*' thì lặp
        consume()                 // ăn '*'
        right := parseFactor()
        f = &BinaryOp{Op: "*", Left: f, Right: right}
    }
    return f
}

func parseFactor() Node {
    tok := peek()
    if tok.Kind == NUM {
        consume()
        return &NumberLit{Value: tok.Value}
    }
    if tok.Kind == LPAREN {
        consume()                 // ăn '('
        inner := parseExpr()      // ĐỆ QUY: đọc cả biểu thức trong ngoặc
        expect(RPAREN)            // bắt buộc có ')'
        return inner              // ngoặc không tạo node riêng — chỉ nhóm
    }
    panic(fmt.Sprintf("syntax error: expect NUM hoặc '(' got %v", tok))
}
```

Ba hàm này gọi nhau thành đúng một vòng theo grammar: `parseExpr → parseTerm → parseFactor → (qua ngoặc) → parseExpr`. Vòng đệ quy chỉ khép lại qua `(`, nên với biểu thức không ngoặc, đệ quy "đi xuống" tuyến tính rồi quay lên.

> 🔁 **Dừng lại tự kiểm tra.** Trong `parseExpr` đã khử đệ quy trái, nếu **quên dòng `t := parseTerm()` ban đầu** mà nhảy thẳng vào `for peek() == PLUS` thì chuyện gì xảy ra với input `2 + 3`?
> <details><summary>Đáp án</summary>
> Token đầu là `NUM(2)`, không phải `PLUS`, nên `peek() == PLUS` sai ngay → vòng `for` không chạy lần nào → hàm trả về `t` đang là `nil` (chưa gán). Biểu thức `2+3` bị parse thành "rỗng", còn `+ 3` thì thừa lại → lỗi. Phải đọc toán hạng đầu TRƯỚC vòng lặp.
> </details>

> 📝 **Tóm tắt mục 3.** (1) Đệ quy trái `E → E + T` làm recursive-descent lặp vô hạn. (2) Khử bằng cách viết lại `E → T ('+' T)*` rồi cài thành vòng `while`. (3) Đọc toán hạng đầu TRƯỚC vòng lặp (tiêu thụ token → hết treo). (4) Mỗi vòng gắn node mới vào nhánh trái → cây gắn-trái.

---

## 4. Walk-through ĐẦY ĐỦ: parse `2 + 3 * 4`

Đây là phần quan trọng nhất. Ta lần theo **từng lời gọi hàm**, từng `peek/consume`, và dựng AST từng bước. Token stream (con trỏ `pos` chỉ token đang chờ đọc):

```
vị trí:   0       1      2       3      4
        NUM(2)  PLUS  NUM(3)  STAR  NUM(4)
          ↑
         pos=0
```

**Bước 1 — gọi `parseExpr()`** (điểm vào). `parseExpr` lập tức gọi `parseTerm()` để đọc Term đầu.

**Bước 2 — `parseExpr → parseTerm()`.** `parseTerm` gọi `parseFactor()` để đọc Factor đầu.

**Bước 3 — `parseTerm → parseFactor()`.** `peek()` = `NUM(2)`. Đúng nhánh số: `consume()` ăn `NUM(2)`, `pos` tiến lên 1. Trả về `NumberLit(2)`.
```
pos=1 (đang chờ PLUS).  Trả về: NumberLit(2)
```

**Bước 4 — quay lại `parseTerm`.** Bây giờ `f = NumberLit(2)`. Kiểm tra vòng lặp: `peek()` = `PLUS`. **`PLUS` ≠ `STAR`** → điều kiện `peek() == STAR` sai → vòng lặp KHÔNG chạy. `parseTerm` trả về `NumberLit(2)` nguyên vẹn.
```
pos=1.  parseTerm trả về: NumberLit(2)
```
Đây là lý do `2` không bị hút vào phép nhân: `parseTerm` chỉ ăn `*`, mà token kế là `+`, nên nó dừng và trả `2` về cho `parseExpr`.

**Bước 5 — quay lại `parseExpr`.** Giờ `t = NumberLit(2)`. Kiểm tra vòng lặp: `peek()` = `PLUS` → **khớp!** Vào vòng lặp:
- `consume()` ăn `PLUS`, `pos` tiến lên 2.
- Gọi `parseTerm()` để đọc Term bên phải dấu `+`.

```
pos=2 (đang chờ NUM(3)).  Sắp đọc Term thứ hai.
```

**Bước 6 — `parseExpr → parseTerm()` (lần 2).** Gọi `parseFactor()`.

**Bước 7 — `parseFactor()` (lần 2).** `peek()` = `NUM(3)`. `consume()` ăn `NUM(3)`, `pos` lên 3. Trả về `NumberLit(3)`.
```
pos=3 (đang chờ STAR).  Trả về: NumberLit(3)
```

**Bước 8 — quay lại `parseTerm` (lần 2).** `f = NumberLit(3)`. Kiểm tra vòng lặp: `peek()` = `STAR` → **khớp!** Vào vòng lặp:
- `consume()` ăn `STAR`, `pos` lên 4.
- Gọi `parseFactor()` đọc Factor bên phải dấu `*`.

**Bước 9 — `parseFactor()` (lần 3).** `peek()` = `NUM(4)`. `consume()` ăn `NUM(4)`, `pos` lên 5 (hết token). Trả về `NumberLit(4)`.
```
pos=5 (EOF).  Trả về: NumberLit(4)
```

**Bước 10 — quay lại `parseTerm` (lần 2).** Gắn cây: `f = BinaryOp("*", NumberLit(3), NumberLit(4))`. Kiểm tra vòng lặp lần nữa: `peek()` = EOF ≠ `STAR` → dừng. Trả về:
```
        *
       / \
      3   4      ← parseTerm thứ 2 trả về cây này
```

**Bước 11 — quay lại `parseExpr`.** Term phải vừa nhận được là cây `(3 * 4)`. Gắn vào cây tổng:
```
t = BinaryOp("+", NumberLit(2), BinaryOp("*", NumberLit(3), NumberLit(4)))
```
Kiểm tra vòng lặp `parseExpr` lần nữa: `peek()` = EOF ≠ `PLUS` → dừng. Trả về cây cuối:

```
          +              ← gốc: phép cộng
         / \
        2   *            ← con phải của + là phép nhân (nằm SÂU hơn)
           / \
          3   4
```

**Verify ưu tiên.** Tính từ lá lên: `3 * 4 = 12`, rồi `2 + 12 = 14`. ✓ Đúng cây ĐÚNG ở mục 1, **không** phải `(2+3)*4 = 20`. Phép nhân tự động nằm dưới phép cộng vì `parseTerm` (xử lý `*`) chạy ở tầng sâu hơn `parseExpr` (xử lý `+`) — đúng như grammar phân tầng đã thiết kế.

> ❓ **Câu hỏi tự nhiên.** *"Vì sao ở Bước 4 `parseTerm` nhả `2` ra mà không nuốt luôn `+`?"* Vì `parseTerm` chỉ lặp khi token kế là `*`. Token kế là `+`, không thuộc "việc" của `parseTerm`, nên nó trả quyền lại cho `parseExpr` — đúng người xử lý `+`. Cơ chế "ai gặp token của mình thì xử lý, không thì trả về" chính là cách ưu tiên được phân tầng.

> 🔁 **Dừng lại tự kiểm tra.** Tự parse `2 * 3 + 4` (đảo vị trí toán tử). Cây cuối là gì, kết quả bao nhiêu?
> <details><summary>Đáp án</summary>
> `parseExpr → parseTerm`: `parseTerm` đọc `2`, thấy `*` → lặp, đọc `3`, dựng `(2*3)`; token kế `+` ≠ `*` → `parseTerm` trả `(2*3)`. Về `parseExpr`: `t = (2*3)`, thấy `+` → lặp, đọc Term phải = `4`. Cây: `BinaryOp("+", (2*3), 4)`. Tính: `2*3=6`, `6+4=10`.
> ```
>      +
>     / \
>    *   4
>   / \
>  2   3
> ```
> Lại đúng: phép nhân nằm dưới phép cộng.
> </details>

> 📝 **Tóm tắt mục 4.** (1) `parseExpr` đọc Term đầu (qua `parseTerm → parseFactor`), được `2`. (2) `parseTerm` dừng ở `+` (không phải việc của nó) → trả `2`. (3) `parseExpr` thấy `+`, đọc Term phải; Term phải nuốt cả `3 * 4` thành cây con. (4) Kết quả: `+` ở gốc, `*` ở con phải → `14`, đúng ưu tiên.

---

## 5. peek / consume / expect — lookahead 1 token (LL(1))

Ba hàm tiện ích quản con trỏ token, là "tay chân" của parser:

| Hàm | Việc | Có dịch con trỏ? |
|---|---|---|
| `peek()` | **nhìn** token hiện tại, KHÔNG ăn | Không |
| `consume()` | ăn (bỏ qua) token hiện tại, dịch con trỏ +1 | Có |
| `expect(k)` | nếu token hiện tại đúng loại `k` thì consume; sai thì **báo lỗi** | Có (nếu khớp) |

```go
type Parser struct {
    tokens []Token
    pos    int
}

func (p *Parser) peek() Token { return p.tokens[p.pos] }

func (p *Parser) consume() Token {
    t := p.tokens[p.pos]
    p.pos++
    return t
}

func (p *Parser) expect(k Kind) Token {
    t := p.peek()
    if t.Kind != k {
        panic(fmt.Sprintf("syntax error: expect %v got %v (tại token #%d)", k, t.Kind, p.pos))
    }
    return p.consume()
}
```

**LL(1) là gì?** Lớp grammar mà parser **chỉ cần nhìn 1 token phía trước** (1 token lookahead, qua `peek()`) là biết ngay chọn luật nào — không cần backtrack. Chữ cái: **L** = quét input từ **trái** (Left-to-right); **L** thứ hai = dựng dẫn xuất **trái** (Leftmost); **(1)** = 1 token lookahead. Grammar biểu thức số học sau khi khử đệ quy trái là LL(1): tại `parseFactor`, nhìn 1 token đủ biết "số" (NUM) hay "ngoặc" (`(`).

> 💡 **Trực giác.** `peek` như liếc thẻ bài trên cùng mà chưa rút; `consume` là rút thật; `expect` là "tôi CHẮC chắn lá kế là Át — nếu không, lật bài báo gian". Parser LL(1) chơi mà chỉ cần liếc một lá đầu chồng.

**Ví dụ báo lỗi (≥4 trường hợp).** `expect` là nơi syntax error xuất hiện:

1. Input `2 +` (thiếu toán hạng phải): tới `parseTerm → parseFactor`, `peek()` = EOF → rơi vào `panic`: `expect NUM hoặc '(' got EOF`.
2. Input `( 2 + 3` (thiếu `)`): `parseFactor` consume `(`, gọi `parseExpr` đọc `2+3`, rồi `expect(RPAREN)` nhưng `peek()` = EOF → `expect RPAREN got EOF`.
3. Input `2 + * 3` (toán tử thừa): `parseExpr` đọc `2`, thấy `+` → consume, gọi `parseTerm → parseFactor`, `peek()` = `STAR` → `panic`: `expect NUM hoặc '(' got STAR`.
4. Input `2 3` (hai số liền, thiếu toán tử): `parseExpr` đọc Term `2`; `peek()` = `NUM(3)` ≠ `PLUS` → vòng lặp `parseExpr` dừng, trả về. Nhưng `pos` chưa tới EOF → kiểm tra cuối `expect(EOF)` báo: `token thừa NUM(3)`.

> ⚠ **Lỗi thường gặp #2 — quên `consume()`.** Nếu trong vòng lặp `parseExpr` bạn `peek() == PLUS` rồi **quên `consume()`** dấu `+`, con trỏ đứng yên: vòng lặp lại thấy `+`, lại đọc Term... `pos` không tiến → lặp vô hạn (hoặc gọi `parseTerm` trên cùng token mãi). **Quy tắc: mỗi token toán tử đã "khớp" bằng `peek` PHẢI được `consume` ngay sau đó.**

> ❓ **Câu hỏi tự nhiên.** *"Có cần token EOF không?"* Rất nên. Thêm một token giả `EOF` ở cuối stream giúp `peek()` luôn an toàn (không tràn mảng) và để `expect(EOF)` bắt lỗi "token thừa" (trường hợp 4). Trong code thực, lexer tự chèn `EOF`.

> 🔁 **Dừng lại tự kiểm tra.** Với input `2 + * 3`, đúng token nào gây lỗi và message là gì?
> <details><summary>Đáp án</summary>
> Token gây lỗi: `STAR` (`*`) ở vị trí 2. Sau khi `parseExpr` consume `+`, nó gọi `parseTerm → parseFactor`; `parseFactor` cần NUM hoặc `(` nhưng gặp `STAR` → `syntax error: expect NUM hoặc '(' got STAR`.
> </details>

> 📝 **Tóm tắt mục 5.** (1) `peek` nhìn-không-ăn, `consume` ăn-dịch-con-trỏ, `expect` ăn-nếu-đúng-loại-không-thì-báo-lỗi. (2) LL(1): nhìn 1 token là chọn được luật, không backtrack. (3) Syntax error sinh ra ở `expect` (token không khớp) hoặc ở `parseFactor` (không phải NUM/`(`). (4) Mỗi toán tử đã `peek` phải `consume` ngay.

---

## 6. AST node types — biểu diễn cây bằng Go struct

Cây gồm hai loại node cho grammar này:

```go
// Node là interface chung cho mọi node AST.
type Node interface{ isNode() }

// NumberLit: một số (lá của cây).
type NumberLit struct {
    Value int
}
func (*NumberLit) isNode() {}

// BinaryOp: một phép toán hai ngôi (node trong).
type BinaryOp struct {
    Op    string  // "+" hoặc "*"
    Left  Node    // cây con trái
    Right Node    // cây con phải
}
func (*BinaryOp) isNode() {}
```

- **`NumberLit`** = **lá** (leaf): không có con, chỉ giữ giá trị. Ví dụ `2`, `3`, `4` ở mục 4.
- **`BinaryOp`** = **node trong** (internal): giữ toán tử + hai cây con. Ví dụ node `+` ở gốc, node `*` ở con phải.

Cây của `2 + 3 * 4` dưới dạng giá trị Go (so khớp với cây vẽ ở mục 4):

```go
&BinaryOp{
    Op:   "+",
    Left: &NumberLit{Value: 2},
    Right: &BinaryOp{
        Op:    "*",
        Left:  &NumberLit{Value: 3},
        Right: &NumberLit{Value: 4},
    },
}
```

> ❓ **Câu hỏi tự nhiên.** *"Vì sao ngoặc `(E)` không có node riêng?"* Vì ngoặc chỉ để **nhóm**, không phải phép tính. Cây đã tự ghi đúng cấu trúc nhóm rồi: `(2+3)*4` cho cây có `+` nằm dưới `*` — ngoặc đã "biến mất" nhưng tác dụng của nó (ép `+` chạy trước) đã in vào hình dạng cây. Giữ node ngoặc chỉ làm cây rườm rà.

> 📝 **Tóm tắt mục 6.** (1) `NumberLit` = lá giữ giá trị; `BinaryOp` = node trong giữ `Op + Left + Right`. (2) Dùng interface `Node` để hai loại đứng chung trong cây. (3) Ngoặc không tạo node — tác dụng nhóm của nó đã in vào hình dạng cây.

---

## 7. AST này dùng làm gì? Hạn chế & hướng đi tiếp

### 7.1. Đầu vào cho giai đoạn sau

AST không phải đích cuối — nó là **đầu vào cho semantic analysis / interpreter / codegen** (Tier 2 của lĩnh vực Compilers). Một interpreter chỉ cần **duyệt cây đệ quy**:

```go
func eval(n Node) int {
    switch v := n.(type) {
    case *NumberLit:
        return v.Value
    case *BinaryOp:
        l, r := eval(v.Left), eval(v.Right)   // đệ quy xuống hai con
        switch v.Op {
        case "+": return l + r
        case "*": return l * r
        }
    }
    panic("node lạ")
}
```

`eval` trên cây của `2 + 3 * 4` cho `14` — chính xác vì cây đã mã hoá sẵn ưu tiên. Đây là vẻ đẹp của AST: **một lần dựng cây đúng, mọi giai đoạn sau chỉ việc duyệt.**

### 7.2. Hạn chế của recursive-descent thủ công

1. **Phải khử đệ quy trái bằng tay** — dễ sai, dễ quên (mục 3).
2. **Nhiều mức ưu tiên = nhiều hàm rườm rà.** Grammar thật có nhiều mức: `||`, `&&`, `==`, `<`, `+`, `*`, `**`, unary `-`... Mỗi mức cần **một hàm và một tầng grammar** (`parseOr → parseAnd → parseEquality → parseCompare → parseAdd → parseMul → parseUnary → parseFactor`). Thêm/sửa một mức ưu tiên = sửa cả chuỗi hàm. Với 10+ mức, đây là rất nhiều code lặp khuôn.
3. **Khó cấu hình.** Đổi ưu tiên hay thêm toán tử mới đòi viết lại cấu trúc hàm.

### 7.3. Hướng đi tiếp: Pratt parsing

[**Pratt parsing (Lesson 05)**](../lesson-05-pratt-precedence/) giải đúng những hạn chế này: thay vì một hàm cho mỗi mức ưu tiên, nó dùng **một hàm duy nhất** điều khiển bằng một **bảng độ ưu tiên (binding power)**. Thêm toán tử mới = thêm một dòng vào bảng, không đẻ thêm hàm. Pratt vẫn là top-down/recursive-descent về bản chất, chỉ gọn hơn nhiều khi có nhiều mức.

> 📝 **Tóm tắt mục 7.** (1) AST là đầu vào cho interpreter/codegen — chỉ cần duyệt cây đệ quy. (2) Recursive-descent thủ công: phải khử đệ quy trái bằng tay, và nhiều mức ưu tiên đẻ ra nhiều hàm rườm rà. (3) Pratt parsing (L05) gom về một hàm + bảng ưu tiên, gọn hơn hẳn.

---

## 8. Bài tập

**Bài 1.** Cho dãy token `[NUM(5), STAR, NUM(6), PLUS, NUM(7)]` (tức `5 * 6 + 7`). Tự lần theo từng lời gọi `parseExpr/parseTerm/parseFactor`, vẽ AST cuối cùng, và tính kết quả. Chỉ rõ ở bước nào `parseTerm` dừng và vì sao.

**Bài 2.** Vẽ AST cho `( 2 + 3 ) * 4`. So sánh với cây của `2 + 3 * 4` (mục 4) — giải thích ngoặc đã đổi hình dạng cây như thế nào, và vì sao kết quả là `20` chứ không `14`.

**Bài 3.** Cho grammar đã khử đệ quy trái `E → T ('+' T)*`. Biểu thức `1 + 2 + 3` cho cây gắn-trái hay gắn-phải? Vẽ cây và giải thích bằng cách lần theo vòng lặp trong `parseExpr`.

**Bài 4. (Tự parse ra AST.)** Với mỗi input, vẽ AST (hoặc viết dạng Go struct lồng nhau) và tính kết quả:
- (a) `8 + 2 * 3`
- (b) `8 * 2 + 3`
- (c) `2 * ( 8 + 3 )`
- (d) `2 * 3 * 4`

**Bài 5. (Syntax error.)** Với mỗi input sai, chỉ ra **đúng token** nào gây lỗi và message `expect ... got ...` mà parser ở mục 5 sẽ in:
- (a) `2 + * 3`
- (b) `( 4 + 5`
- (c) `7 7`
- (d) `* 9`

**Bài 6.** Bổ sung phép trừ `-` (cùng mức ưu tiên với `+`, gắn-trái). Viết lại grammar EBNF và sửa hàm `parseExpr` (bằng Go) để xử lý cả `+` và `-`. Kiểm tra `10 - 3 - 2` cho cây gắn-trái → kết quả `5` (không phải `9`).

**Bài 7. (Mở rộng.)** Vì sao `10 - 3 - 2` PHẢI gắn-trái (`(10-3)-2 = 5`) chứ không gắn-phải (`10-(3-2) = 9`)? Liên hệ với việc vòng lặp trong `parseExpr` luôn gắn node mới vào nhánh trái.

---

## Lời giải chi tiết

### Bài 1

Token: `5 * 6 + 7`, `pos=0`.
- `parseExpr → parseTerm → parseFactor`: `peek=NUM(5)` → consume, trả `NumberLit(5)`, `pos=1`.
- Về `parseTerm`: `f=5`, `peek=STAR` → khớp, consume (`pos=2`), gọi `parseFactor`: `peek=NUM(6)` → consume (`pos=3`), trả `6`. Gắn `f = (5*6)`. Lặp lại: `peek=PLUS` ≠ `STAR` → **`parseTerm` dừng tại đây** (vì `+` không phải việc của nó), trả cây `(5*6)`.
- Về `parseExpr`: `t=(5*6)`, `peek=PLUS` → khớp, consume (`pos=4`), gọi `parseTerm`: đọc `NumberLit(7)` (`pos=5`), `peek=EOF` ≠ `STAR` → trả `7`. Gắn `t = ((5*6)+7)`. `peek=EOF` ≠ `PLUS` → dừng.

Cây:
```
      +
     / \
    *   7
   / \
  5   6
```
Tính: `5*6=30`, `30+7=37`. **Kết quả 37.** `parseTerm` dừng ở token `PLUS` vì nó chỉ lặp trên `STAR`.

### Bài 2

`(2 + 3) * 4`, `pos=0`.
- `parseExpr → parseTerm → parseFactor`: `peek=LPAREN` → consume `(`, gọi `parseExpr` đọc bên trong: nó parse `2 + 3` thành `(2+3)` (tương tự mục 4), rồi `parseFactor` `expect(RPAREN)` ăn `)`. Trả về cây `(2+3)`.
- Về `parseTerm`: `f=(2+3)`, `peek=STAR` → khớp, consume, đọc `parseFactor`=`4`. Gắn `f = ((2+3)*4)`.

Cây:
```
        *              ← gốc giờ là *
       / \
      +   4
     / \
    2   3
```
So với mục 4, ngoặc đã kéo `+` LÊN trên `*` (đảo vị trí tầng). Tính: `2+3=5`, `5*4=20`. **Kết quả 20.** Ngoặc ép `parseExpr` chạy (đọc `2+3`) NGAY trong `parseFactor`, nên phép cộng bị "khoá" thành một Factor trọn vẹn trước khi phép nhân chạm tới.

### Bài 3

`1 + 2 + 3`: cây **gắn-trái** `((1+2)+3)`.
- `parseExpr`: `t = parseTerm()` = `1`. Vòng 1: `peek=PLUS` → consume, đọc Term=`2`, gắn `t = (1+2)`. Vòng 2: `peek=PLUS` → consume, đọc Term=`3`, gắn `t = ((1+2)+3)`. Vòng 3: `peek=EOF` → dừng.

Cây:
```
        +
       / \
      +   3
     / \
    1   2
```
Mỗi vòng lặp gói cây cũ vào **nhánh trái** của node `+` mới (`t = &BinaryOp{Left: t, ...}`), nên cây mọc về bên trái → gắn-trái.

### Bài 4

(a) `8 + 2 * 3`:
```
    +
   / \
  8   *
     / \
    2   3
```
`= 8 + (2*3) = 8 + 6 = 14`.

(b) `8 * 2 + 3`:
```
      +
     / \
    *   3
   / \
  8   2
```
`= (8*2) + 3 = 16 + 3 = 19`.

(c) `2 * (8 + 3)`:
```
    *
   / \
  2   +
     / \
    8   3
```
`= 2 * (8+3) = 2 * 11 = 22`.

(d) `2 * 3 * 4` (gắn-trái vì `parseTerm` lặp trên `*`):
```
      *
     / \
    *   4
   / \
  2   3
```
`= (2*3)*4 = 6*4 = 24`.

### Bài 5

(a) `2 + * 3`: token lỗi = `STAR` (vị trí 2). Sau khi `parseExpr` consume `+`, gọi `parseFactor` gặp `STAR` (cần NUM/`(`) → **`expect NUM hoặc '(' got STAR`**.

(b) `( 4 + 5`: token lỗi = `EOF`. `parseFactor` consume `(`, `parseExpr` đọc `4+5`, rồi `expect(RPAREN)` nhưng gặp EOF → **`expect RPAREN got EOF`**.

(c) `7 7`: token lỗi = `NUM(7)` thứ hai (vị trí 1). `parseExpr` đọc Term `7`; `peek=NUM(7)` ≠ `PLUS` → vòng dừng, trả về. Con trỏ chưa tới EOF → kiểm tra cuối `expect(EOF)` → **`token thừa NUM(7)`** (tương đương `expect EOF got NUM`).

(d) `* 9`: token lỗi = `STAR` (vị trí 0). `parseExpr → parseTerm → parseFactor` ngay token đầu gặp `STAR` (cần NUM/`(`) → **`expect NUM hoặc '(' got STAR`**.

### Bài 6

Grammar EBNF (`+` và `-` cùng tầng `E`):
```
E → T ( ('+' | '-') T )*
T → F ( '*' F )*
F → '(' E ')' | num
```
Hàm Go:
```go
func parseExpr() Node {
    t := parseTerm()
    for peek().Kind == PLUS || peek().Kind == MINUS {
        op := consume()                  // ăn '+' hoặc '-'
        right := parseTerm()
        sym := "+"
        if op.Kind == MINUS { sym = "-" }
        t = &BinaryOp{Op: sym, Left: t, Right: right}
    }
    return t
}
```
`10 - 3 - 2`: vòng 1 dựng `(10-3)`, vòng 2 dựng `((10-3)-2)`. Cây gắn-trái:
```
        -
       / \
      -   2
     / \
    10  3
```
Tính: `10-3=7`, `7-2=5`. **Đúng 5.** Nếu lỡ gắn-phải sẽ là `10-(3-2)=9` — sai.

### Bài 7

Phép trừ **không kết hợp (non-associative theo nghĩa toán)**: `(10-3)-2 ≠ 10-(3-2)`. Quy ước toán học đọc trừ **từ trái sang phải**, tức gắn-trái. Vòng lặp `parseExpr` luôn đặt cây-tích-luỹ vào **nhánh trái** của node mới (`t = &BinaryOp{Left: t, Right: parseTerm()}`), nên mọi toán tử cùng tầng tự động gắn-trái. Đó chính là lý do khử đệ quy trái cho ra cây gắn-trái "miễn phí" — khớp đúng ngữ nghĩa của `-` và `/`. (Nếu muốn gắn-phải, ví dụ luỹ thừa `**`, ta dùng đệ quy bên phải thay vì vòng lặp; sẽ rõ hơn ở Pratt parsing — L05.)

---

## Tham khảo và bài tiếp theo

- Bài trước: [Lesson 03 — Grammar & CFG](../lesson-03-grammar-cfg/) — nguồn gốc của grammar mà parser thi hành.
- **Bài tiếp theo: [Lesson 05 — Pratt Parsing (precedence climbing)](../lesson-05-pratt-precedence/)** — gom chuỗi hàm `parseOr/And/.../Mul` về một hàm + bảng độ ưu tiên; xử lý nhiều mức ưu tiên gọn gàng.
- Tiền đề liên quan: [DataStructures — Tree](../../../DataStructures/02-Intermediate/lesson-01-tree/), [DataStructures — Stack](../../../DataStructures/01-Basic/lesson-04-stack/), [DataFoundations — Proof & Induction](../../../DataFoundations/03-MathFoundations/lesson-05-proof-induction/).
- Minh họa tương tác: [visualization.html](./visualization.html) — Parser stepper (chạy recursive-descent từng bước, xem call stack + AST dựng dần), AST viewer (vẽ cây cho biểu thức bất kỳ), và demo syntax error.
