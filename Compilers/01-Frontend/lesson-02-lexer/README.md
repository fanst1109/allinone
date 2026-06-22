# Lesson 02 — Lexer / Tokenizer (phân tích từ vựng)

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Hiểu **vì sao** lexer là trạm đầu tiên trong pipeline biên dịch, và nó giải quyết vấn đề gì.
- Định nghĩa được **token** là gì — bộ ba `(loại, giá trị, vị trí)` — và phân biệt các loại token: số, định danh, từ khoá, toán tử, dấu phân cách.
- Biết cách **bỏ whitespace / comment** và phân biệt **keyword vs identifier** bằng bảng tra.
- Hiểu **maximal munch** (longest match) — vì sao `>=` là MỘT token chứ không phải `>` rồi `=`.
- Hiểu lexer dưới góc nhìn **automata hữu hạn (DFA/NFA) + regex**: mỗi loại token là một pattern, lexer là máy trạng thái chạy trên dòng ký tự.
- Viết được một **scanner thủ công** (hand-written) trong Go: vòng lặp đọc ký tự với `peek`/`advance`, hàm `readNumber`, `readIdent`.
- Báo **lỗi từ vựng (lexical error)** kèm vị trí `dòng:cột`.
- Biết token là đầu vào của **Parser** (Lesson 04) và sơ lược về **lexer generator** (lex/flex).

## Kiến thức tiền đề

- [Lesson 01 — Tổng quan & Pipeline](../lesson-01-overview-pipeline/) — biết lexer nằm ở đâu trong chuỗi `nguồn → token → AST → IR → mã máy`.
- [Algorithms](../../../Algorithms/) — automata / xử lý chuỗi (string matching, state machine). Lexer chính là một state machine chạy trên chuỗi.
- [DataFoundations — Character Encoding](../../../DataFoundations/02-EncodingMemory/lesson-01-character-encoding/) — lexer đọc từng **ký tự** (byte/rune); hiểu UTF-8 giúp xử lý đúng identifier có dấu, ký tự ngoài ASCII.

---

## 1. Vì sao cần lexer? Đặt vấn đề

> 💡 **Trực giác / Hình dung.** Khi bạn đọc câu "Tôi học lập trình", mắt bạn không nhìn từng chữ cái `T`, `ô`, `i`, ... rời rạc — bộ não tự gom thành **từ**: `Tôi`, `học`, `lập trình`. Lexer làm đúng việc đó cho mã nguồn: gom dòng ký tự thô thành các "từ" có nghĩa (token).

Máy tính lưu chương trình của bạn dưới dạng **một chuỗi ký tự phẳng** — không hơn không kém. Ví dụ dòng:

```
x=12+3
```

Trong bộ nhớ chỉ là 6 ký tự liền nhau: `'x'`, `'='`, `'1'`, `'2'`, `'+'`, `'3'`. Không có ranh giới, không có "loại", không có ý nghĩa.

**Câu hỏi mở bài:** Máy đọc `x=12+3` — làm sao nó biết `12` là **một số** (mười hai) chứ không phải `1` rồi `2` (hai số riêng)? Làm sao biết `x` là tên biến chứ không phải bắt đầu của một từ khoá? Làm sao biết `=` là một toán tử riêng, tách khỏi `12`?

**Trả lời (giải đáp ngay trong bài này — không treo sang bài sau):**

Lexer áp dụng hai nguyên tắc, cả hai sẽ được mổ xẻ kỹ ở §2–§4:

1. **Phân loại theo ký tự khởi đầu**: thấy chữ số `1` → bắt đầu đọc một **số**, và **đọc tham lam** mọi chữ số liền sau (`1`, `2`) cho tới khi gặp ký tự không phải số (`+`). Nhờ vậy `12` gom thành một token `NUM(12)`, không phải hai token. Đây là **maximal munch** (§3.4).
2. **Bảng tra keyword**: sau khi đọc xong một dãy chữ cái thành chuỗi (`x`), tra trong bảng từ khoá. Nếu có trong bảng (`if`, `while`...) → là **keyword**; nếu không → là **identifier** (§3.3).

Kết quả lexer trả về cho dòng `x=12+3`:

```
[ ID(x), EQ(=), NUM(12), PLUS(+), NUM(3) ]
```

5 token gọn gàng, mỗi token có loại rõ ràng. Đây chính là **đầu vào của Parser** (Lesson 04). Parser không bao giờ phải nhìn lại ký tự thô — nó chỉ làm việc với token. **Tách lexer khỏi parser** giúp mỗi phần đơn giản hơn nhiều: lexer lo "ký tự → token", parser lo "token → cấu trúc".

### 1.1. Vị trí trong pipeline

```
Mã nguồn (chuỗi ký tự thô)
        │
        ▼
   ┌─────────┐
   │  LEXER  │   ← bài này: chuỗi ký tự → dãy token
   └─────────┘
        │  [ID(x), EQ, NUM(12), PLUS, NUM(3)]
        ▼
   ┌─────────┐
   │ PARSER  │   ← Lesson 04: dãy token → cây cú pháp (AST)
   └─────────┘
        │
        ▼
   Semantic analysis → IR → tối ưu → mã máy
```

> ❓ **Câu hỏi tự nhiên của người đọc.**
> - *"Sao không để parser đọc thẳng ký tự, bỏ qua lexer?"* — Được về mặt lý thuyết (gọi là *scannerless parsing*), nhưng phức tạp hơn nhiều: parser sẽ phải vừa lo whitespace, comment, vừa lo cấu trúc câu. Tách 2 tầng giúp mỗi tầng đơn giản, dễ test, dễ tối ưu. Lexer chạy rất nhanh (chỉ là DFA), parser phức tạp hơn nhưng chỉ nhìn token.
> - *"Lexer có hiểu nghĩa của code không?"* — Không. Lexer **không biết** `x=12+3` là phép gán cộng. Nó chỉ thấy "có một ID, một dấu `=`, một số...". Việc hiểu *cấu trúc* là của parser; hiểu *ý nghĩa* (kiểu, phạm vi biến) là của semantic analysis.

> 🔁 **Dừng lại tự kiểm tra.**
> 1. Lexer biến cái gì thành cái gì?
> 2. Vì sao `12` không bị tách thành `1` và `2`?
> <details><summary>Đáp án</summary>
>
> 1. Biến **chuỗi ký tự thô** thành **dãy token**. Đầu vào là text, đầu ra là list các `(loại, giá trị, vị trí)`.
> 2. Vì lexer dùng **maximal munch**: khi đã bắt đầu đọc số, nó đọc tham lam mọi chữ số liền nhau cho tới khi gặp ký tự không-phải-số. `12` đứng liền nên gom thành một số.
> </details>

> 📝 **Tóm tắt mục 1.**
> - Mã nguồn trong bộ nhớ chỉ là **chuỗi ký tự phẳng**, không có ranh giới hay ý nghĩa.
> - **Lexer** = trạm đầu pipeline, cắt chuỗi ký tự thành **dãy token** có loại.
> - `x=12+3` → `[ID(x), EQ, NUM(12), PLUS, NUM(3)]`.
> - Tách lexer khỏi parser → mỗi tầng đơn giản hơn; parser chỉ làm việc với token, không nhìn ký tự thô.

---

## 2. Token là gì?

> 💡 **Trực giác / Hình dung.** Một token giống như một **nhãn dán đính kèm thông tin**: "đây là một SỐ, giá trị 12, nằm ở dòng 1 cột 3". Cả ba mẩu thông tin đều cần: parser cần *loại* để hiểu cấu trúc, cần *giá trị* để tính toán, cần *vị trí* để báo lỗi đúng chỗ.

### 2.1. Định nghĩa: bộ ba `(loại, giá trị, vị trí)`

**(a) Là gì.** Một **token** là đơn vị từ vựng nhỏ nhất có nghĩa của ngôn ngữ, được lexer tạo ra. Mỗi token mang ba thông tin:

| Thành phần | Ý nghĩa | Ví dụ |
| --- | --- | --- |
| **Loại (type/kind)** | Phân loại token: số, định danh, toán tử... | `NUM`, `ID`, `PLUS`, `IF` |
| **Giá trị (value/lexeme)** | Chuỗi gốc trong mã nguồn (lexeme), hoặc giá trị đã phân tích | `"12"` → 12; `"count"` |
| **Vị trí (position)** | Dòng và cột nơi token bắt đầu, để báo lỗi | `dòng 1, cột 3` |

**(b) Vì sao tồn tại / vì sao cần ba phần.** Nếu chỉ lưu *loại*, parser không phân biệt được `NUM(12)` với `NUM(99)` — không tính toán được. Nếu chỉ lưu *giá trị* (chuỗi `"12"`), parser phải tự đoán "chuỗi này là số hay tên biến?" — đúng việc lexer phải làm. Nếu thiếu *vị trí*, khi báo lỗi compiler chỉ nói "có lỗi" mà không chỉ được **dòng:cột** — vô dụng cho người sửa code.

**(c) Ví dụ trực giác bằng số cụ thể.** Token cho chữ `12` trong dòng `x=12+3`:

```
Token{ Kind: NUM, Value: "12", Line: 1, Col: 3 }
       └ loại    └ lexeme   └─ vị trí ─┘
```

### 2.2. Các loại token phổ biến

| Loại | Mô tả | Ví dụ lexeme |
| --- | --- | --- |
| **Số (NUM/INT/FLOAT)** | Hằng số nguyên hoặc thực | `0`, `12`, `3.14`, `255` |
| **Định danh (ID / identifier)** | Tên biến, hàm do lập trình viên đặt | `x`, `count`, `userName`, `_tmp` |
| **Từ khoá (keyword)** | Từ dành riêng của ngôn ngữ | `if`, `else`, `while`, `return`, `func` |
| **Toán tử (operator)** | Phép tính / so sánh / gán | `+`, `-`, `*`, `=`, `==`, `>=`, `&&` |
| **Dấu phân cách (delimiter/punctuation)** | Ngắt cấu trúc | `(`, `)`, `{`, `}`, `,`, `;` |

Ngoài ra còn `STRING` (chuỗi `"hello"`), `EOF` (token đặc biệt báo hết file).

### 2.3. Walk-through: tokenize `x = 12 + 3`

Đi qua từng ký tự (vị trí cột tính từ 1, có cả khoảng trắng):

```
cột:  1   2 3 4  5 6  7 8 9
ký tự: x   =   1 2   +   3
       └ID └EQ  └ NUM └+ └NUM
```

Quá trình:

| Bước | Ký tự đang đọc | Hành động | Token sinh ra |
| --- | --- | --- | --- |
| 1 | `x` (cột 1) | chữ cái → đọc identifier, dừng ở space | `ID("x", 1:1)` |
| 2 | ` ` (cột 2) | whitespace → **bỏ qua** | — |
| 3 | `=` (cột 3) | toán tử một ký tự | `EQ("=", 1:3)` |
| 4 | ` ` (cột 4) | whitespace → bỏ qua | — |
| 5 | `1`,`2` (cột 5–6) | chữ số → đọc số tham lam tới hết `12` | `NUM("12", 1:5)` |
| 6 | ` ` (cột 7) | whitespace → bỏ qua | — |
| 7 | `+` (cột 8) | toán tử | `PLUS("+", 1:8)` |
| 8 | `3` (cột 9) | chữ số | `NUM("3", 1:9)` |
| 9 | EOF | hết chuỗi | `EOF(1:10)` |

**Kết quả:** `[ ID(x), EQ, NUM(12), PLUS, NUM(3), EOF ]`.

### 2.4. Bốn ví dụ tokenize (đủ đa dạng)

**Ví dụ 1 — gán đơn giản:** `y=0`

```
[ ID(y), EQ, NUM(0), EOF ]
```

**Ví dụ 2 — có keyword + dấu phân cách:** `if (n > 0)`

```
[ IF, LPAREN, ID(n), GT, NUM(0), RPAREN, EOF ]
   └ keyword, không phải ID
```

**Ví dụ 3 — toán tử ghép + số thực:** `r = 3.14 * 2`

```
[ ID(r), EQ, NUM(3.14), STAR, NUM(2), EOF ]
```

**Ví dụ 4 — nhiều dấu phân cách:** `f(a, b);`

```
[ ID(f), LPAREN, ID(a), COMMA, ID(b), RPAREN, SEMI, EOF ]
```

> ⚠ **Lỗi thường gặp.** Nhầm **giá trị (lexeme)** với **loại**. `NUM(12)` và `NUM(3)` cùng **loại** `NUM` nhưng khác **giá trị**. Parser quyết định cấu trúc dựa trên *loại*; phép tính dùng *giá trị*. Đừng để hai số khác nhau được coi là "khác loại token".

> 🔁 **Dừng lại tự kiểm tra.** Tokenize `a = b + 1`.
> <details><summary>Đáp án</summary>
>
> `[ ID(a), EQ, ID(b), PLUS, NUM(1), EOF ]`. Lưu ý `b` là **ID** (không có trong bảng keyword), `1` là **NUM**.
> </details>

> 📝 **Tóm tắt mục 2.**
> - Token = bộ ba `(loại, giá trị, vị trí)`.
> - 5 loại chính: số, định danh, từ khoá, toán tử, dấu phân cách (+ string, EOF).
> - `x = 12 + 3` → `[ID(x), EQ, NUM(12), PLUS, NUM(3), EOF]`.
> - **Loại** quyết định cấu trúc; **giá trị** dùng để tính; **vị trí** dùng để báo lỗi.

---

## 3. Whitespace, comment, keyword vs identifier, maximal munch

### 3.1. Bỏ whitespace

Đa số ngôn ngữ (C, Go, Java...) coi **khoảng trắng, tab, xuống dòng** chỉ là **dấu ngăn cách** giữa token — không sinh token. Lexer gặp whitespace thì **nhảy qua** (vẫn cập nhật vị trí dòng:cột).

Bốn ví dụ — cùng kết quả token bất kể khoảng trắng:

```
x=1        → [ID(x), EQ, NUM(1)]
x = 1      → [ID(x), EQ, NUM(1)]
x  =   1   → [ID(x), EQ, NUM(1)]
x=\n1      → [ID(x), EQ, NUM(1)]   (\n cũng bị bỏ)
```

> ⚠ **Lỗi thường gặp.** Whitespace **không phải lúc nào cũng vô nghĩa**. Trong Python, thụt lề (indentation) mang ý nghĩa cú pháp → lexer Python sinh token `INDENT`/`DEDENT`. Trong các chuỗi `"a b"`, khoảng trắng nằm *trong* string là một phần của giá trị, không bị bỏ. "Bỏ whitespace" chỉ áp dụng cho whitespace **giữa** các token.

### 3.2. Bỏ comment

Comment là chú thích cho người đọc, không ảnh hưởng chương trình → lexer **bỏ qua như whitespace**. Bốn kiểu phổ biến:

```
// dòng đơn (C, Go, Java)         → bỏ tới hết dòng
# dòng đơn (Python, shell)        → bỏ tới hết dòng
/* khối nhiều dòng */             → bỏ từ /* tới */
<!-- HTML -->                     → bỏ từ <!-- tới -->
```

Ví dụ: `x = 1 // gán` → lexer thấy `//`, bỏ phần còn lại của dòng → `[ID(x), EQ, NUM(1)]`.

> ⚠ **Lỗi thường gặp — comment lồng (nested comment).** Phần lớn ngôn ngữ **không** cho comment khối lồng nhau. Với `/* a /* b */ c */`, lexer C dừng `*/` đầu tiên → comment là `/* a /* b */`, rồi ` c */` bị coi là code → **lỗi**. Một số ngôn ngữ (Rust, OCaml, Swift) *cho phép* lồng — lexer phải **đếm độ sâu**: gặp `/*` tăng counter, gặp `*/` giảm, chỉ kết thúc khi counter về 0. Đây là lý do comment lồng không thể nhận bằng DFA thuần (cần đếm — vượt khả năng máy trạng thái hữu hạn, §4.5).

### 3.3. Keyword vs identifier — bảng tra

> 💡 **Trực giác / Hình dung.** Keyword và identifier **trông giống hệt nhau** ở tầng ký tự: cùng là dãy chữ cái. `if` và `iffy` đều bắt đầu bằng `i`, `f`. Lexer không thể phân biệt khi *đang đọc* — nó đọc hết cả dãy chữ cái thành một chuỗi, **rồi mới tra bảng** keyword.

Quy trình:

1. Gặp chữ cái → đọc tham lam toàn bộ dãy `[a-zA-Z_][a-zA-Z0-9_]*` thành chuỗi `s`.
2. Tra `s` trong **bảng từ khoá**. Có → token loại keyword tương ứng. Không → `ID(s)`.

Bảng keyword ví dụ (một ngôn ngữ nhỏ):

| Chuỗi | Là keyword? | Token |
| --- | --- | --- |
| `if` | ✓ | `IF` |
| `else` | ✓ | `ELSE` |
| `while` | ✓ | `WHILE` |
| `return` | ✓ | `RETURN` |
| `iffy` | ✗ | `ID("iffy")` |
| `count` | ✗ | `ID("count")` |
| `If` | ✗ (phân biệt hoa-thường) | `ID("If")` |
| `_x1` | ✗ | `ID("_x1")` |

> ⚠ **Lỗi thường gặp.** `iffy` **không phải** keyword `if` + identifier `fy`. Maximal munch (§3.4) buộc lexer đọc *cả dãy* `iffy` trước, rồi tra bảng — `iffy` không có trong bảng → là một ID. Cũng vậy: `returns` là `ID`, không phải `RETURN` + `s`.

### 3.4. Maximal munch (longest match)

> 💡 **Trực giác / Hình dung.** Khi đọc, lexer **luôn ngoạm miếng dài nhất có thể** ("munch" = ngoạm). Giống như đọc tiếng Việt: thấy "lập trình" bạn đọc thành một từ ghép, không phải "lập" rồi "trình". Lexer thấy `>=` ngoạm cả hai ký tự thành **một** token, không dừng lại ở `>`.

**Quy tắc:** tại mỗi vị trí, lexer chọn token **khớp được chuỗi dài nhất**, dù một prefix ngắn hơn cũng hợp lệ.

Bốn ví dụ:

| Đầu vào | Maximal munch (đúng) | Nếu KHÔNG dùng (sai) |
| --- | --- | --- |
| `>=` | `GE(>=)` — một token | `GT(>)` rồi `EQ(=)` — hai token, sai nghĩa |
| `==` | `EQEQ(==)` — so sánh bằng | `EQ(=)` rồi `EQ(=)` — hai phép gán, sai |
| `123` | `NUM(123)` | `NUM(1)`, `NUM(2)`, `NUM(3)` — ba số, sai |
| `&&` | `AND(&&)` — và logic | `AMP(&)` rồi `AMP(&)` — hai bit-and, sai |

Walk-through chi tiết cho `a>=b`:

```
vị trí 1: 'a'  → ID, ngoạm tới hết chữ → ID("a")
vị trí 2: '>'  → có thể là GT. Nhưng nhìn ký tự kế '=' → '>=' khớp GE dài hơn!
                 → ngoạm 2 ký tự → GE(">=")
vị trí 4: 'b'  → ID("b")
kết quả: [ID(a), GE, ID(b)]
```

> ⚠ **Lỗi thường gặp.** Maximal munch đôi khi *quá tham*. Trong C cổ, `a---b` được ngoạm thành `a -- - b` (`--` rồi `-`), không phải `a - -- b` — gây bug nếu lập trình viên định viết `a - (--b)`. Bài học: khi viết toán tử ghép mơ hồ, chèn khoảng trắng. Lexer luôn ngoạm dài nhất, không "đoán ý" bạn.

> 🔁 **Dừng lại tự kiểm tra.**
> 1. `x<=10` tokenize thế nào?
> 2. `whilex` là gì — keyword `while` + `x`, hay một ID?
> <details><summary>Đáp án</summary>
>
> 1. `[ID(x), LE(<=), NUM(10)]`. `<=` ngoạm thành một token `LE` (maximal munch), không phải `<` rồi `=`.
> 2. Một ID: `ID("whilex")`. Lexer ngoạm cả dãy chữ `whilex`, tra bảng — không có → identifier. Keyword `while` chỉ khi *toàn bộ* lexeme đúng bằng `while`.
> </details>

> 📝 **Tóm tắt mục 3.**
> - Whitespace **giữa** token bị bỏ (nhưng vẫn cập nhật vị trí). Comment cũng bị bỏ.
> - Comment lồng cần **đếm độ sâu** — vượt khả năng DFA thuần.
> - Keyword vs ID: đọc cả dãy chữ rồi **tra bảng** — không phân biệt khi đang đọc.
> - **Maximal munch**: luôn ngoạm chuỗi dài nhất. `>=` là một token, `123` là một số.

---

## 4. Automata hữu hạn (DFA/NFA) và regex

> 💡 **Trực giác / Hình dung.** Một lexer là một **máy trạng thái (state machine)**: nó có vài "tâm trạng" (trạng thái), và mỗi ký tự đọc vào sẽ chuyển nó từ tâm trạng này sang tâm trạng khác. Giống đèn giao thông: đang Xanh, sự kiện "hết giờ" → Vàng → Đỏ. Lexer: đang "chưa đọc gì", ký tự `1` → "đang đọc số", ký tự `2` → vẫn "đang đọc số", ký tự ` ` → "xong, phát ra NUM". Đây liên hệ trực tiếp tới state machine trong [Algorithms](../../../Algorithms/).

### 4.1. Regex: mỗi loại token là một pattern

Mỗi loại token được mô tả bằng một **biểu thức chính quy (regular expression / regex)**:

| Loại token | Regex | Khớp | Không khớp |
| --- | --- | --- | --- |
| Số nguyên | `[0-9]+` | `0`, `12`, `2024` | `12a`, `1.5`, `` (rỗng) |
| Định danh | `[a-zA-Z_][a-zA-Z0-9_]*` | `x`, `_tmp`, `a1` | `1x`, `9`, `@x` |
| Số thực | `[0-9]+\.[0-9]+` | `3.14`, `0.5` | `3.`, `.5`, `12` |
| Khoảng trắng | `[ \t\n]+` | ` `, `\t\n` | `x` |

> ❓ **Câu hỏi tự nhiên của người đọc — "regex và automaton liên quan thế nào?"** Định lý nền tảng của lý thuyết ngôn ngữ hình thức (Kleene): **mỗi regex tương đương với một automaton hữu hạn**, và ngược lại. Vì thế "khớp regex `[0-9]+`" = "chạy DFA nhận số nguyên". Lexer generator (lex/flex, §7) làm chính việc này: bạn viết regex cho từng token, nó tự sinh DFA để chạy.

### 4.2. DFA vs NFA (phân biệt nhanh)

- **DFA (Deterministic Finite Automaton)** — automaton **đơn định**: ở mỗi trạng thái, mỗi ký tự đầu vào dẫn tới **đúng một** trạng thái kế. Chạy nhanh, dễ cài (chỉ là bảng tra).
- **NFA (Nondeterministic Finite Automaton)** — automaton **không đơn định**: một ký tự có thể dẫn tới *nhiều* trạng thái, cho phép `ε` (chuyển không tốn ký tự). Dễ xây từ regex, nhưng phải chuyển sang DFA (thuật toán *subset construction*) để chạy hiệu quả.

Trong lexer thực tế, ta dùng **DFA** vì nó chạy O(độ dài input) — mỗi ký tự một bước, không quay lui.

### 4.3. Walk-through DFA nhận **số nguyên** `[0-9]+`

Automaton có 3 trạng thái:

```
        digit (0-9)            digit (0-9)
         ┌────┐                  ┌────┐
         │    ▼                  │    ▼
   ──▶ (S0:start) ──digit──▶ ((S1:accept))
         │                          │
       khác                       khác → DỪNG, phát NUM
         ▼
     (Sx: reject)
```

- `S0` (start): chưa đọc gì. Gặp chữ số → sang `S1`. Gặp ký tự khác → reject (không phải số).
- `S1` (accept, vòng tròn kép): đã đọc ≥1 chữ số. Gặp chữ số nữa → ở lại `S1`. Gặp ký tự khác → **dừng, chấp nhận**, phát token `NUM`.

Chạy trên chuỗi `12+` (từng ký tự):

| Bước | Trạng thái hiện tại | Ký tự đọc | Trạng thái kế | Ghi chú |
| --- | --- | --- | --- | --- |
| 0 | `S0` | — | `S0` | bắt đầu |
| 1 | `S0` | `1` | `S1` | chữ số đầu tiên |
| 2 | `S1` | `2` | `S1` | thêm chữ số, ở lại |
| 3 | `S1` | `+` | (dừng) | `+` không phải chữ số → ở `S1` (accept) → **phát NUM("12")** |

`S1` là trạng thái chấp nhận → chuỗi `12` được nhận là một số nguyên hợp lệ. Ký tự `+` được "trả lại" cho vòng lặp kế tiếp.

### 4.4. Walk-through DFA nhận **định danh** `[a-zA-Z_][a-zA-Z0-9_]*`

```
   letter/_                 letter/digit/_
    ┌──┐                       ┌──┐
    │  ▼                       │  ▼
──▶(S0)──letter or '_'──▶((S1:accept))
                              │
                            khác → DỪNG, phát ID (rồi tra keyword)
```

- `S0`: ký tự đầu **phải** là chữ cái hoặc `_` (KHÔNG được là chữ số) → sang `S1`.
- `S1` (accept): các ký tự sau có thể là chữ cái, chữ số, hoặc `_` → ở lại `S1`. Gặp ký tự khác → dừng, phát `ID`.

Chạy trên chuỗi `a1_=` (từng ký tự):

| Bước | Trạng thái | Ký tự | Trạng thái kế | Ghi chú |
| --- | --- | --- | --- | --- |
| 1 | `S0` | `a` | `S1` | chữ cái đầu → hợp lệ |
| 2 | `S1` | `1` | `S1` | chữ số sau chữ cái → OK |
| 3 | `S1` | `_` | `S1` | gạch dưới → OK |
| 4 | `S1` | `=` | (dừng) | không thuộc nhóm → **phát ID("a1_")**, rồi tra keyword |

Đối chiếu — chạy trên `1a` (số đứng đầu):

| Bước | Trạng thái | Ký tự | Kế | Ghi chú |
| --- | --- | --- | --- | --- |
| 1 | `S0` | `1` | (reject) | `S0` chỉ nhận chữ cái/`_`, gặp chữ số → KHÔNG phải identifier |

→ `1a` không khởi đầu một identifier. Lexer thử pattern khác (số): `1` khớp `[0-9]+`, rồi `a` khởi đầu một ID mới → `[NUM(1), ID(a)]`.

> ❓ **Câu hỏi tự nhiên của người đọc.**
> - *"Lexer chạy bao nhiêu DFA cùng lúc?"* — Về khái niệm, mỗi loại token một DFA. Thực tế lexer generator **gộp tất cả** thành một DFA lớn duy nhất (qua NFA → DFA), chạy một lần trên input, ai accept dài nhất thì thắng (maximal munch).
> - *"Trạng thái accept dùng để làm gì?"* — Đánh dấu "tới đây là một token hợp lệ". Lexer chạy tiếp tới khi không đi được nữa, rồi lùi về trạng thái accept gần nhất.

### 4.5. Vì sao một số thứ KHÔNG nhận được bằng DFA

DFA chỉ có **bộ nhớ hữu hạn** (số trạng thái cố định) → không **đếm** được số lượng tuỳ ý. Vì thế:

- **Comment lồng** `/* /* */ */` cần đếm độ sâu → vượt DFA (cần *stack*, thuộc về văn phạm phi ngữ cảnh — Lesson 03).
- **Dấu ngoặc cân bằng** `((()))` cũng cần đếm → không phải việc của lexer mà của parser.

Đây là ranh giới giữa **lexer (ngôn ngữ chính quy / regular)** và **parser (ngôn ngữ phi ngữ cảnh / context-free)** — sẽ rõ ở [Lesson 03 — Grammar & CFG](../lesson-03-grammar-cfg/).

> 🔁 **Dừng lại tự kiểm tra.** Chạy DFA số nguyên trên chuỗi `7`. Nó kết thúc ở trạng thái nào, có chấp nhận không?
> <details><summary>Đáp án</summary>
>
> `S0` --`7`--> `S1`. Hết chuỗi, đang ở `S1` (accept) → **chấp nhận**, phát `NUM("7")`. Một chữ số cũng là số hợp lệ vì `[0-9]+` yêu cầu ≥1 chữ số.
> </details>

> 📝 **Tóm tắt mục 4.**
> - Mỗi loại token = một **regex** = một **automaton hữu hạn** (định lý Kleene).
> - **DFA** đơn định, chạy O(n), là dạng lexer thực thi.
> - DFA số nguyên: `S0 --digit--> S1 (accept, lặp digit)`. Định danh: ký tự đầu phải chữ/`_`.
> - DFA **không đếm được** → comment lồng / ngoặc cân bằng thuộc về parser (Lesson 03).

---

## 5. Scanning thủ công (hand-written lexer)

> 💡 **Trực giác / Hình dung.** Thay vì sinh DFA tự động, ta tự viết một **vòng lặp đọc ký tự**: nhìn ký tự hiện tại (`peek`), quyết định loại token, rồi đọc tiếp (`advance`) cho tới hết token đó. Đây là cách các compiler thật (Go, Rust, clang) làm — viết tay cho dễ báo lỗi đẹp và tối ưu.

### 5.1. Hai thao tác lõi: `peek` và `advance`

- `peek()`: **nhìn** ký tự hiện tại mà **không** di chuyển con trỏ. Dùng để quyết định.
- `advance()`: trả về ký tự hiện tại rồi **dời** con trỏ sang ký tự kế.

"Nhìn trước rồi mới ăn" — lexer `peek` để biết sắp tới là gì, `advance` khi chắc chắn muốn tiêu thụ ký tự đó.

### 5.2. Code mẫu Go (ngắn, biên dịch được)

```go
package main

import (
	"fmt"
	"unicode"
)

type Kind int

const (
	NUM Kind = iota
	ID
	PLUS
	EQ
	EOF
)

type Token struct {
	Kind  Kind
	Value string
	Line  int
	Col   int
}

type Lexer struct {
	src  []rune
	pos  int
	line int
	col  int
}

func NewLexer(s string) *Lexer {
	return &Lexer{src: []rune(s), pos: 0, line: 1, col: 1}
}

// peek: nhìn ký tự hiện tại, không di chuyển
func (l *Lexer) peek() rune {
	if l.pos >= len(l.src) {
		return 0 // 0 = báo hết chuỗi
	}
	return l.src[l.pos]
}

// advance: trả ký tự hiện tại rồi dời con trỏ
func (l *Lexer) advance() rune {
	c := l.src[l.pos]
	l.pos++
	if c == '\n' {
		l.line++
		l.col = 1
	} else {
		l.col++
	}
	return c
}

// readNumber: đọc tham lam mọi chữ số liền nhau (maximal munch)
func (l *Lexer) readNumber() string {
	var b []rune
	for unicode.IsDigit(l.peek()) {
		b = append(b, l.advance())
	}
	return string(b)
}

// readIdent: đọc chữ cái/số/_ — ký tự đầu đã chắc là chữ
func (l *Lexer) readIdent() string {
	var b []rune
	for {
		c := l.peek()
		if unicode.IsLetter(c) || unicode.IsDigit(c) || c == '_' {
			b = append(b, l.advance())
		} else {
			break
		}
	}
	return string(b)
}

func (l *Lexer) Next() Token {
	// bỏ whitespace
	for l.peek() == ' ' || l.peek() == '\t' || l.peek() == '\n' {
		l.advance()
	}
	startLine, startCol := l.line, l.col
	c := l.peek()
	switch {
	case c == 0:
		return Token{EOF, "", startLine, startCol}
	case unicode.IsDigit(c):
		return Token{NUM, l.readNumber(), startLine, startCol}
	case unicode.IsLetter(c) || c == '_':
		return Token{ID, l.readIdent(), startLine, startCol}
	case c == '+':
		l.advance()
		return Token{PLUS, "+", startLine, startCol}
	case c == '=':
		l.advance()
		return Token{EQ, "=", startLine, startCol}
	default:
		// ký tự lạ → lỗi từ vựng (xem §6)
		l.advance()
		panic(fmt.Sprintf("lỗi từ vựng: ký tự '%c' không hợp lệ tại %d:%d",
			c, startLine, startCol))
	}
}

func main() {
	lx := NewLexer("x = 12 + 3")
	for {
		t := lx.Next()
		fmt.Printf("%+v\n", t)
		if t.Kind == EOF {
			break
		}
	}
}
```

Chạy in ra dãy token, kết thúc bằng `EOF`. Hàm `readNumber`/`readIdent` chính là cài đặt tay của DFA ở §4.3–§4.4: vòng `for` lặp khi ký tự còn thuộc nhóm (= ở lại `S1`), dừng khi ra khỏi nhóm (= rời accept state).

> ❓ **Câu hỏi tự nhiên của người đọc.** *"Sao `Next()` chỉ trả một token, không trả cả list?"* — Đây là kiểu lexer **theo yêu cầu (on-demand)**: parser gọi `Next()` mỗi khi cần token kế. Tiết kiệm bộ nhớ (không lưu toàn bộ token) và cho phép parser dừng sớm. Có thể bọc thành hàm trả `[]Token` nếu muốn.

> 📝 **Tóm tắt mục 5.**
> - Lexer tay = vòng lặp + hai thao tác `peek` (nhìn) / `advance` (tiêu thụ).
> - `readNumber`/`readIdent` = cài đặt tay DFA: lặp khi còn thuộc nhóm, dừng khi ra.
> - Phân loại bằng `switch` theo ký tự đầu; ký tự lạ → lỗi từ vựng.
> - Kiểu **on-demand** (`Next()` trả một token) phổ biến trong compiler thật.

---

## 6. Lỗi từ vựng (lexical error)

> 💡 **Trực giác / Hình dung.** Lỗi từ vựng là khi lexer gặp ký tự nó **không biết phải làm gì** — như đọc văn bản gặp một ký hiệu lạ hoàn toàn. Nó dừng lại và chỉ tay: "ở dòng X cột Y có ký tự `@` mà ngôn ngữ này không cho phép".

### 6.1. Các loại lỗi từ vựng

**(a) Là gì.** Lỗi từ vựng là lỗi phát hiện *ngay tầng lexer* — chuỗi ký tự không khớp với *bất kỳ* pattern token nào. Khác với lỗi cú pháp (token đúng nhưng sắp xếp sai, do parser bắt) và lỗi ngữ nghĩa (cú pháp đúng nhưng vô nghĩa, do semantic analysis bắt).

**(b) Vì sao cần báo riêng.** Bắt lỗi sớm ở tầng lexer giúp thông báo chính xác "ký tự nào sai ở đâu" — dễ sửa hơn nhiều so với để lỗi trôi xuống parser rồi báo mơ hồ.

**(c) Bốn ví dụ cụ thể:**

| Đầu vào | Lỗi | Vị trí |
| --- | --- | --- |
| `x = @5` | ký tự `@` không thuộc ngôn ngữ | `1:5` |
| `cost = $10` | ký tự `$` không hợp lệ (ngoài string) | `1:8` |
| `n = 3.1.4` | số sai định dạng (hai dấu chấm) | `1:5` |
| `"chưa đóng` | string thiếu dấu `"` đóng tới hết dòng | `1:1` |

### 6.2. Báo lỗi kèm vị trí `dòng:cột`

Thông báo lỗi tốt **luôn** kèm vị trí. So sánh:

```
✗ Tệ:  Lỗi cú pháp.
✓ Tốt: lỗi từ vựng tại 2:11: ký tự '@' không hợp lệ
         line.go:2:11: lexical error: invalid character '@'
```

Đó là lý do mỗi token (và mỗi lỗi) phải mang `Line`, `Col` — đã thiết kế từ §2.1. Trong code §5.2, nhánh `default` của `switch` chính là chỗ báo lỗi từ vựng kèm `startLine:startCol`.

Walk-through báo lỗi cho `x = @5`:

```
'x' → ID("x")        OK (cột 1)
' ' → bỏ
'=' → EQ             OK (cột 3)
' ' → bỏ
'@' → không khớp pattern nào → LỖI tại 1:5: ký tự '@' không hợp lệ
```

> ⚠ **Lỗi thường gặp khi viết lexer.** Quên cập nhật `col`/`line` trong `advance()` khi gặp `\n` → mọi lỗi báo sai vị trí. Luôn: gặp `\n` thì `line++`, `col = 1`; ngược lại `col++`. (Xem `advance()` ở §5.2 đã xử lý đúng.)

> 🔁 **Dừng lại tự kiểm tra.** `12abc` — lexer xử lý ra sao? Có phải lỗi từ vựng không?
> <details><summary>Đáp án</summary>
>
> KHÔNG phải lỗi. Maximal munch: `12` khớp `[0-9]+` → `NUM(12)`. Rồi `abc` khớp identifier → `ID(abc)`. Kết quả `[NUM(12), ID(abc)]`. Lexer chấp nhận; *nếu* ngôn ngữ không cho số dính liền tên (vd `12abc` là vô nghĩa), việc báo lỗi đó là của **parser/semantic**, không phải lexer. Lexer chỉ báo lỗi khi gặp ký tự không khớp pattern *nào*.
> </details>

> 📝 **Tóm tắt mục 6.**
> - Lỗi từ vựng = ký tự không khớp pattern token nào (`@`, `$`, số sai định dạng, string chưa đóng).
> - Khác lỗi cú pháp (parser) và lỗi ngữ nghĩa (semantic).
> - Thông báo lỗi **bắt buộc** kèm `dòng:cột` — nhờ token mang `Line`/`Col`.
> - `advance()` phải cập nhật đúng `line`/`col` khi gặp `\n`.

---

## 7. Liên hệ: token → Parser, và lexer generator

### 7.1. Token là đầu vào của Parser (Lesson 04)

Lexer và parser ghép thành chuỗi sản xuất:

```
text ──lexer──▶ [token...] ──parser──▶ AST (cây cú pháp)
```

Parser **không nhìn ký tự thô** — nó chỉ tiêu thụ token (thường gọi `lexer.Next()` theo yêu cầu). Vì thế chất lượng token (loại đúng, vị trí chính xác) quyết định parser hoạt động tốt hay không. Cách parser ghép token thành cấu trúc cây dựa trên **văn phạm phi ngữ cảnh (CFG)** — học ở [Lesson 03 — Grammar & CFG](../lesson-03-grammar-cfg/) và áp dụng ở Lesson 04.

### 7.2. Lexer generator (lex / flex) — sơ lược

Thay vì viết lexer tay (§5), ta có thể **khai báo** các pattern rồi để công cụ sinh code:

- **lex / flex** (C), **JFlex** (Java), **golex** (Go): nhận một file `.l` gồm các cặp `regex → hành động`, tự sinh DFA + vòng lặp scan.

Ví dụ file flex rút gọn:

```
[0-9]+              { return NUM; }
[a-zA-Z_][a-zA-Z0-9_]*  { return ID; }   /* tra keyword trong hành động */
"+"                 { return PLUS; }
[ \t\n]+            { /* bỏ whitespace */ }
.                   { error("ký tự lạ"); }
```

Công cụ gộp tất cả regex thành **một DFA**, tự lo maximal munch. Ưu: nhanh viết, ít bug. Nhược: báo lỗi kém đẹp, khó tuỳ biến → nhiều compiler lớn (Go, clang, Rust) **vẫn viết tay** để kiểm soát thông báo lỗi và tốc độ.

> 📝 **Tóm tắt mục 7.**
> - Token là **đầu vào duy nhất** của parser; parser không đụng ký tự thô.
> - Lexer generator (lex/flex) sinh DFA từ khai báo `regex → action`.
> - Compiler lớn thường viết lexer tay để báo lỗi đẹp và tối ưu tốc độ.

---

## 8. Bài tập

**Bài 1.** Tokenize bằng tay dòng sau (ghi đủ loại + giá trị):
`total = price * 2 + tax`

**Bài 2.** Tokenize `if (x >= 10) y = 1;` — chú ý keyword, toán tử ghép, dấu phân cách.

**Bài 3 (maximal munch).** Cho input `a<==b`. Với bảng toán tử có `<=` (LE), `==` (EQEQ), `=` (EQ), `<` (LT) — lexer ngoạm thế nào? Liệt kê dãy token.

**Bài 4 (keyword vs ID).** Bảng keyword = `{if, else, for}`. Phân loại từng chuỗi sau là KEYWORD hay ID: `for`, `form`, `fo`, `forif`, `If`.

**Bài 5 (DFA).** Vẽ (hoặc mô tả trạng thái) một DFA nhận **số thực** dạng `[0-9]+\.[0-9]+` (bắt buộc có phần nguyên, dấu chấm, phần thập phân). Rồi chạy nó trên `3.14` và trên `3.` — cái nào được chấp nhận?

**Bài 6 (lỗi từ vựng).** Với lexer chỉ biết chữ cái, chữ số, `+`, `=`, khoảng trắng — chạy trên `a = b @ c`. Báo lỗi gì, ở vị trí nào? Các token trước lỗi là gì?

**Bài 7 (tự tokenize — tổng hợp).** Tự tokenize đoạn 2 dòng sau, ghi rõ `loại(giá trị) tại dòng:cột` cho từng token, kể cả `EOF`:
```
x = 5   // khoi tao
x = x + 1
```

## Lời giải chi tiết

### Bài 1

`total = price * 2 + tax`

Đi từ trái sang, bỏ whitespace, ngoạm tham lam mỗi token:

```
total → ID("total")
=     → EQ
price → ID("price")
*     → STAR
2     → NUM("2")
+     → PLUS
tax   → ID("tax")
EOF
```

Kết quả: `[ID(total), EQ, ID(price), STAR, NUM(2), PLUS, ID(tax), EOF]`. Tất cả `total/price/tax` là ID (không có trong bảng keyword).

### Bài 2

`if (x >= 10) y = 1;`

```
if  → IF        (có trong bảng keyword → không phải ID)
(   → LPAREN
x   → ID("x")
>=  → GE        (maximal munch: ngoạm 2 ký tự, không phải > rồi =)
10  → NUM("10")
)   → RPAREN
y   → ID("y")
=   → EQ
1   → NUM("1")
;   → SEMI
EOF
```

Kết quả: `[IF, LPAREN, ID(x), GE, NUM(10), RPAREN, ID(y), EQ, NUM(1), SEMI, EOF]`.

### Bài 3

Input `a<==b`. Áp dụng maximal munch ở từng vị trí:

```
vị trí 1: 'a'  → ID("a")
vị trí 2: '<'  → thử ngoạm dài nhất: '<=' khớp LE (dài hơn '<') → LE("<=")
vị trí 4: '='  → còn lại '=' và 'b'. '=' đứng riêng, ký tự kế là 'b' (không tạo '==')
                → EQ("=")
vị trí 5: 'b'  → ID("b")
```

Kết quả: `[ID(a), LE, EQ, ID(b)]`.

Giải thích then chốt: tại vị trí 2 lexer đứng trước `<==b`. Nó thử khớp dài nhất — `<=` khớp LE (2 ký tự). Nó **không** ngoạm `<==` vì không có toán tử 3 ký tự `<==`. Sau khi ăn `<=`, còn `=b`: `=` đứng một mình (ký tự kế `b` không phải `=`) → EQ. Đây là minh hoạ "ngoạm dài nhất *trong số các pattern hợp lệ*", không phải "ngoạm bừa".

### Bài 4

Bảng keyword `{if, else, for}`. Lexer ngoạm cả dãy chữ rồi tra bảng:

| Chuỗi | Tra bảng | Kết quả |
| --- | --- | --- |
| `for` | có | **KEYWORD** `FOR` |
| `form` | không | **ID**("form") — `for`+`m` không tách, ngoạm cả `form` |
| `fo` | không | **ID**("fo") |
| `forif` | không | **ID**("forif") — không phải `for`+`if` |
| `If` | không (phân biệt hoa-thường) | **ID**("If") |

Bài học: keyword chỉ khi *toàn bộ lexeme* khớp đúng một mục trong bảng. Prefix khớp (`for` trong `form`) không tính.

### Bài 5

DFA nhận `[0-9]+\.[0-9]+` có 4 trạng thái:

```
──▶(S0)──digit──▶(S1)──'.'──▶(S2)──digit──▶((S3:accept))
              │  ▲                       │  ▲
              └──┘ digit (lặp)           └──┘ digit (lặp)
```

- `S0` start: gặp chữ số → `S1`.
- `S1`: phần nguyên, lặp khi còn chữ số; gặp `.` → `S2`.
- `S2`: vừa thấy dấu chấm, **chưa** accept (phải có ≥1 chữ số thập phân); gặp chữ số → `S3`.
- `S3` accept: phần thập phân, lặp khi còn chữ số.

Chạy `3.14`:

| Trạng thái | Ký tự | Kế |
| --- | --- | --- |
| S0 | `3` | S1 |
| S1 | `.` | S2 |
| S2 | `1` | S3 |
| S3 | `4` | S3 |

Hết chuỗi ở `S3` (accept) → **`3.14` được chấp nhận**.

Chạy `3.`:

| Trạng thái | Ký tự | Kế |
| --- | --- | --- |
| S0 | `3` | S1 |
| S1 | `.` | S2 |

Hết chuỗi ở `S2` — **KHÔNG phải accept** (thiếu phần thập phân) → **`3.` bị từ chối**. (Một lexer thật sẽ ngoạm `3` thành NUM nguyên rồi báo lỗi/ID cho `.`, tuỳ ngôn ngữ.)

### Bài 6

`a = b @ c`, lexer chỉ biết chữ/số/`+`/`=`/space.

```
'a' (1:1) → ID("a")
' '       → bỏ
'=' (1:3) → EQ
' '       → bỏ
'b' (1:5) → ID("b")
' '       → bỏ
'@' (1:7) → không khớp pattern nào → LỖI
```

Báo lỗi: `lỗi từ vựng tại 1:7: ký tự '@' không hợp lệ`.

Token sinh được trước khi lỗi: `[ID(a), EQ, ID(b)]`. (Lexer thường dừng tại lỗi đầu tiên, hoặc bỏ qua `@` rồi tiếp tục để gom nhiều lỗi — tuỳ chiến lược *error recovery*.)

### Bài 7

Đoạn:
```
x = 5   // khoi tao      ← dòng 1
x = x + 1                ← dòng 2
```

**Dòng 1** (`x = 5   // khoi tao`): comment `//` bỏ tới hết dòng.

```
ID("x")    tại 1:1
EQ         tại 1:3
NUM("5")   tại 1:5
// ...     → bỏ toàn bộ tới hết dòng (không sinh token)
```

**Dòng 2** (`x = x + 1`):

```
ID("x")    tại 2:1
EQ         tại 2:3
ID("x")    tại 2:5
PLUS       tại 2:7
NUM("1")   tại 2:9
EOF        tại 2:10
```

Dãy token đầy đủ:
`[ID(x)@1:1, EQ@1:3, NUM(5)@1:5, ID(x)@2:1, EQ@2:3, ID(x)@2:5, PLUS@2:7, NUM(1)@2:9, EOF@2:10]`.

Chú ý: comment `// khoi tao` **không** sinh token nào — nó tan biến hoàn toàn sau lexer, đúng như whitespace.

## Tham khảo và bài tiếp theo

- Bài trước: [Lesson 01 — Tổng quan & Pipeline](../lesson-01-overview-pipeline/) — lexer nằm ở đâu trong chuỗi biên dịch.
- Bài tiếp: [Lesson 03 — Grammar & CFG](../lesson-03-grammar-cfg/) — văn phạm phi ngữ cảnh, nơi token được ghép thành cấu trúc cây; ranh giới regular (lexer) vs context-free (parser).
- Liên hệ:
  - [Algorithms](../../../Algorithms/) — state machine, string matching: lexer là một DFA chạy trên chuỗi.
  - [DataFoundations — Character Encoding](../../../DataFoundations/02-EncodingMemory/lesson-01-character-encoding/) — lexer đọc từng rune/byte; UTF-8 ảnh hưởng cách đọc identifier có dấu.
- Minh hoạ tương tác: [visualization.html](./visualization.html) — Live tokenizer (gõ code, xem token tô màu theo loại + vị trí, báo lỗi từ vựng), DFA visualizer (chạy từng ký tự, highlight trạng thái, accept/reject), và demo maximal munch (`>=` vs `>` `=`).
</content>
</invoke>
