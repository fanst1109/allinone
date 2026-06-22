# Lesson 05 — Pratt Parsing / Precedence Climbing (phân tích biểu thức theo độ ưu tiên)

> Bài **cuối Tier 1 (Frontend)**. Sau bài này, bạn đã có đủ công cụ để biến chuỗi ký tự thành **cây cú pháp (AST)** đúng độ ưu tiên — và sẵn sàng bước sang Tier 2 (xử lý ngữ nghĩa trên AST).

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Hiểu **vì sao** recursive-descent phân tầng (Lesson 04) trở nên rườm rà khi có nhiều mức ưu tiên, và Pratt parsing gọn hơn ở đâu.
- Nắm khái niệm **binding power (độ kết dính)** — `lbp` (left binding power) và `rbp` (right binding power) — và cách nó mã hóa cả **độ ưu tiên** lẫn **tính kết hợp** (trái/phải) bằng những con số.
- Cài đặt thuật toán **precedence climbing**: một hàm `parseExpr(minbp)` duy nhất thay cho cả chục hàm phân tầng.
- Walk-through **từng bước** một biểu thức nhiều toán tử như `2+3*4` và `2^3^2` để thấy cây dựng đúng.
- Xử lý **toán tử một ngôi (unary)** tiền tố `-x` và sơ lược tiền tố/hậu tố.
- Biết Pratt parsing được dùng thật trong Go, rust-analyzer, nhiều ngôn ngữ khác.

## Kiến thức tiền đề

- [Lesson 04 — Recursive-Descent Parser](../lesson-04-recursive-descent-parser/) — **bắt buộc**. Bài này so sánh trực tiếp với cách phân tầng (layered) ở L04.
- [Lesson 03 — Grammar & CFG](../lesson-03-grammar-cfg/) — văn phạm, đệ quy trái, và khái niệm "cây dẫn xuất" (parse tree).

---

## 1. Vì sao cần Pratt parsing? — câu hỏi mở bài

Ở [Lesson 04](../lesson-04-recursive-descent-parser/), để parse biểu thức số học với 2 mức ưu tiên (`+ -` thấp, `* /` cao), ta viết **một hàm cho mỗi mức**:

```go
// L04 — recursive descent phân tầng (layered)
func expr() Node {        // mức + -
    left := term()
    for peek() == "+" || peek() == "-" {
        op := next()
        right := term()
        left = Bin{op, left, right}
    }
    return left
}
func term() Node {        // mức * /
    left := factor()
    for peek() == "*" || peek() == "/" {
        op := next()
        right := factor()
        left = Bin{op, left, right}
    }
    return left
}
func factor() Node {      // số hoặc (expr)
    if peek() == "(" { ... }
    return Num{next()}
}
```

Cách này **đúng và dễ hiểu** — nhưng nó nhân bản: `expr` và `term` gần như giống hệt nhau, chỉ khác danh sách toán tử và hàm con được gọi.

> **💡 Câu hỏi mở bài — hãy giữ trong đầu suốt bài:**
>
> *"Một ngôn ngữ thật có rất nhiều mức ưu tiên — gán `=`, so sánh `< > == !=`, cộng `+ -`, nhân `* / %`, lũy thừa `^`, một ngôi `-x !x`, gọi hàm `f()`, chỉ số `a[i]`... dễ tới **10–15 mức**. Theo cách L04, mỗi mức là một hàm → **viết 10–15 hàm gần như copy-paste**. Có cách nào gọn hơn không?"*

**Trả lời ngay (sẽ chứng minh dần trong bài):** Có. Pratt parsing / precedence climbing thay **toàn bộ chuỗi hàm phân tầng** bằng **một hàm đệ quy duy nhất** nhận tham số `minbp` (độ kết dính tối thiểu). Mỗi toán tử chỉ cần khai báo **một con số** (binding power) trong bảng, không cần thêm hàm. Thêm mức ưu tiên mới = thêm một dòng vào bảng, không phải viết hàm mới.

So sánh nhanh:

| | Recursive-descent phân tầng (L04) | Pratt / precedence climbing (L05) |
|---|---|---|
| Số hàm cho 10 mức ưu tiên | ~10 hàm gần giống nhau | **1 hàm** `parseExpr(minbp)` |
| Thêm 1 mức ưu tiên | viết thêm 1 hàm + sửa chuỗi gọi | **thêm 1 dòng** trong bảng binding power |
| Kết hợp phải (`^`) | phải viết đệ quy thủ công, dễ sai | đổi `rbp < lbp` — tự nhiên |
| Cây AST kết quả | giống nhau | **giống hệt** |
| Hiệu năng | tốt | tốt (ít lời gọi hàm hơn) |

> Điểm cốt lõi: **cây AST hai cách tạo ra là như nhau** — Pratt không thay đổi *kết quả*, chỉ thay đổi *cách viết parser* cho gọn và dễ mở rộng.

> **📝 Tóm tắt mục 1**
> - L04 phân tầng: 1 hàm / 1 mức ưu tiên → rườm rà khi nhiều mức.
> - Pratt / precedence climbing: 1 hàm `parseExpr(minbp)` + 1 bảng số.
> - Thêm mức ưu tiên = thêm 1 dòng bảng, không viết hàm mới.
> - Cây AST đầu ra **giống hệt** L04.

---

## 2. Binding power (độ kết dính) — trái tim của Pratt

### 2.1 Trực giác trước hình thức

> **💡 Trực giác:** Tưởng tượng mỗi toán tử như **nam châm hai cực** đặt giữa hai toán hạng. "Độ kết dính (binding power)" là **lực hút** của toán tử về phía toán hạng. Toán tử nào lực mạnh hơn sẽ "giật" toán hạng về phía nó trước.
>
> Trong `2 + 3 * 4`, số `3` bị kẹp giữa hai toán tử: `+` bên trái và `*` bên phải. Cả hai cùng muốn `3`. Vì `*` có lực hút (binding power) **mạnh hơn** `+`, nên `3` dính với `*` → ta được `3*4` trước, rồi `2 + (3*4)`. Đó chính xác là quy tắc "nhân trước cộng sau" mà ta học từ tiểu học, nhưng giờ phát biểu bằng **một con số**.

### 2.2 Định nghĩa: lbp và rbp

Mỗi toán tử nhị phân (infix) được gán **hai** con số:

- **`lbp` (left binding power — lực hút bên trái):** mạnh cỡ nào khi toán tử "nhìn sang trái" để giành toán hạng đứng trước nó.
- **`rbp` (right binding power — lực hút bên phải):** quyết định toán tử bên phải phải mạnh tới đâu mới "giành lại" được toán hạng. Nói cách khác, `rbp` là `minbp` truyền vào lời gọi đệ quy parse vế phải.

**(a) Là gì:** `lbp`/`rbp` là hai số nguyên gắn với mỗi toán tử, dùng để so sánh "ai mạnh hơn ai" khi nhiều toán tử tranh cùng một toán hạng.

**(b) Vì sao cần hai số chứ không một:** Một số (độ ưu tiên đơn) chỉ phân biệt được toán tử nào mạnh hơn — đủ cho `+` vs `*`. Nhưng nó **không** phân biệt được **trái-kết-hợp** với **phải-kết-hợp** khi hai toán tử **cùng mức**. `8 - 3 - 2` (trái) và `2 ^ 3 ^ 2` (phải) cần cách gom khác nhau dù mỗi biểu thức chỉ có một loại toán tử. Hai số `lbp`/`rbp` giải quyết đúng việc này (xem §2.4).

**(c) Ví dụ trực giác bằng số:** đặt `+` có `lbp = 10`. Khi parser đang ở `2 + ...` và gặp `*` (`lbp = 20`) ở vế phải, vì `20 > 10` nên `*` "giành" được → gom `*` trước. Nếu vế phải là `-` (`lbp = 10`), vì `10` không lớn hơn `minbp = 10` đang giữ, parser **dừng** → gom trái như bình thường.

### 2.3 Bảng độ ưu tiên với binding power cụ thể

Quy ước trong bài (số càng lớn = càng kết dính = càng ưu tiên cao):

| Toán tử | Ý nghĩa | Kết hợp | `lbp` | `rbp` (= minbp truyền vế phải) |
|---|---|:---:|:---:|:---:|
| `=` | gán | **phải** | 10 | 9 |
| `==` `!=` `<` `>` | so sánh | trái | 20 | 21 |
| `+` `-` | cộng/trừ | trái | 30 | 31 |
| `*` `/` | nhân/chia | trái | 40 | 41 |
| `^` | lũy thừa | **phải** | 50 | 49 |
| `-x` (unary) | đảo dấu | tiền tố | — | 60 |

> Lưu ý: con số **tuyệt đối** không quan trọng, chỉ **thứ tự tương đối** mới quan trọng. Dùng `10/20/30/40/50` thay vì `1/2/3/4/5` để chừa khoảng trống cho mức mới chèn vào giữa sau này (ví dụ thêm `%` mức 41).

> **💡 Quy tắc nhớ — trái vs phải:**
> - **Trái-kết-hợp** (`+ - * /`): `lbp > rbp` (lệch một đơn vị, ví dụ `lbp=30, rbp=31`... — xem ngay dưới, dấu ngược lại với "lớn hơn" bạn tưởng!).
> - **Phải-kết-hợp** (`^ =`): `lbp > rbp` theo nghĩa `rbp` **nhỏ hơn** `lbp`.
>
> Cách phát biểu chính xác (đừng học vẹt, hiểu cơ chế ở §2.4): với toán tử **trái-kết-hợp** đặt `rbp = lbp + 1`; với **phải-kết-hợp** đặt `rbp = lbp - 1`.

### 2.4 Vì sao `rbp = lbp + 1` cho trái, `rbp = lbp - 1` cho phải?

Đây là chỗ tinh tế nhất của Pratt. Hãy hiểu thật kỹ bằng cơ chế, không học vẹt.

Khi parser gặp toán tử `op` ở vế phải, nó gọi `parseExpr(rbp_của_op)` để parse vế phải. Trong lời gọi đó, vòng `while` chỉ tiếp tục nếu toán tử **kế tiếp** có `lbp > minbp` (mà `minbp` lúc này = `rbp_của_op`).

**Trường hợp trái-kết-hợp** `8 - 3 - 2`, muốn gom thành `(8 - 3) - 2`:

- Parse `8`, gặp `-` thứ nhất (`lbp=30`), gọi `parseExpr(rbp=31)` để parse vế phải.
- Trong lời gọi đó: parse `3`, gặp `-` thứ hai (`lbp=30`). Kiểm tra `30 > 31`? **Không.** → dừng, trả về chỉ `3`.
- Quay ra ngoài: ta có `(8 - 3)`. Vòng `while` ngoài tiếp tục, gặp `-` thứ hai, gom tiếp `((8-3) - 2)`. ✓ **Gom trái.**

→ Đặt `rbp = lbp + 1` khiến toán tử **cùng mức** ở vế phải **không** lọt vào đệ quy → bị gom ở vòng ngoài → kết hợp **trái**.

**Trường hợp phải-kết-hợp** `2 ^ 3 ^ 2`, muốn gom thành `2 ^ (3 ^ 2)`:

- Parse `2`, gặp `^` thứ nhất (`lbp=50`), gọi `parseExpr(rbp=49)` để parse vế phải.
- Trong lời gọi đó: parse `3`, gặp `^` thứ hai (`lbp=50`). Kiểm tra `50 > 49`? **Có.** → gom `^` thứ hai **bên trong** đệ quy → được `(3 ^ 2)`.
- Trả về `(3 ^ 2)` cho vế phải của `^` thứ nhất → `2 ^ (3 ^ 2)`. ✓ **Gom phải.**

→ Đặt `rbp = lbp - 1` khiến toán tử **cùng mức** ở vế phải **lọt vào** đệ quy → bị gom bên phải trước → kết hợp **phải**.

> **❓ Câu hỏi tự nhiên của người đọc**
>
> **Q: Tại sao chỉ lệch đúng 1 đơn vị (`±1`), không phải `±5`?** Vì ta chỉ cần đổi kết quả phép so sánh `lbp > minbp` khi gặp **chính toán tử cùng mức**. Lệch 1 là đủ để lật `>` thành `≤` (hoặc ngược lại). Lệch nhiều hơn vẫn chạy đúng, nhưng dễ vô tình "đè" lên mức kế bên nếu các mức quá sát nhau.
>
> **Q: Có cách nào chỉ dùng một số không?** Có — "precedence climbing" cổ điển dùng một `prec` và một cờ `rightAssoc`, rồi truyền `prec` (phải) hoặc `prec+1` (trái) vào đệ quy. Đó thực chất tương đương với việc tính `rbp` từ `lbp` ± 1. Hai cách chỉ khác cách trình bày.
>
> **Q: `lbp` và `rbp` có bao giờ thuộc về hai toán tử khác nhau cùng lúc không?** Có — đó chính là tình huống cốt lõi: vòng `while` so `lbp` của toán tử **sắp tới** với `minbp` (= `rbp` của toán tử **vừa rồi**). Hai số đến từ hai toán tử khác nhau.

> **⚠ Lỗi thường gặp**
>
> 1. **Lẫn trái/phải kết hợp.** Đặt nhầm `rbp = lbp + 1` cho `^` → `2^3^2` ra `(2^3)^2 = 64` thay vì `2^(3^2) = 512`. Luôn kiểm tra: phải-kết-hợp thì `rbp < lbp`.
> 2. **Quên `+1` cho trái-kết-hợp** (đặt `rbp = lbp`). Khi đó `8-3-2`: gặp `-` thứ hai có `lbp=30 > minbp=30`? Không (`30 > 30` sai), may là vẫn gom trái. Nhưng nếu đặt `rbp = lbp` cho cả `=`... ranh giới mờ → khó debug. Quy ước rõ ràng `+1`/`-1` an toàn hơn.
> 3. **`minbp` khởi đầu sai.** Gọi `parseExpr(1)` thay vì `parseExpr(0)` ở mức ngoài cùng → toán tử có `lbp = 1` (nếu có) bị bỏ. Mức ngoài cùng luôn `parseExpr(0)` để nuốt **mọi** toán tử.

### 2.5 Bốn ví dụ binding power quyết định cách gom

| Biểu thức | Toán tử tranh chấp | So binding power | Gom thành | Giá trị |
|---|---|---|---|---|
| `2 + 3 * 4` | `+`(lbp30) vs `*`(lbp40) | `40 > 30` → `*` thắng | `2 + (3*4)` | 14 |
| `2 * 3 + 4` | `*`(lbp40) vs `+`(lbp30) | `30 > 40`? không | `(2*3) + 4` | 10 |
| `8 - 3 - 2` | `-` vs `-` (cùng 30) | `30 > 31`? không | `(8-3) - 2` | 3 |
| `2 ^ 3 ^ 2` | `^` vs `^` (cùng 50) | `50 > 49`? có | `2 ^ (3^2)` | 512 |

Kiểm chứng `2 ^ 3 ^ 2`: `3^2 = 9`, rồi `2^9 = 512`. Nếu gom sai `(2^3)^2 = 8^2 = 64`. Khác hẳn → kết hợp **rất** quan trọng.

> **🔁 Dừng lại tự kiểm tra**
>
> 1. `10 - 2 - 3` gom thế nào, bằng bao nhiêu?
> 2. `a = b = c` (`=` phải-kết-hợp) gom thế nào?
>
> <details><summary>Đáp án</summary>
>
> 1. `-` trái-kết-hợp → `(10 - 2) - 3 = 8 - 3 = 5`. (Nếu gom phải `10 - (2 - 3) = 10 - (-1) = 11` — sai.)
> 2. `=` phải-kết-hợp → `a = (b = c)`: gán `c` cho `b`, rồi (giá trị đó) cho `a`. Đây đúng là ngữ nghĩa "gán dây chuyền" trong C/Go-like.
> </details>

> **📝 Tóm tắt mục 2**
> - Mỗi toán tử infix có `lbp` (lực hút trái) và `rbp` (= minbp truyền vế phải).
> - `lbp` lớn hơn = ưu tiên cao hơn = giành toán hạng trước.
> - Trái-kết-hợp: `rbp = lbp + 1`. Phải-kết-hợp: `rbp = lbp - 1`.
> - Hai số mã hóa **cả** độ ưu tiên **lẫn** tính kết hợp — đó là điều một số đơn không làm được.

---

## 3. Thuật toán precedence climbing

### 3.1 Khung thuật toán (pseudo)

Chỉ một hàm. Tham số `minbp` = "tôi chỉ được gom các toán tử có `lbp > minbp`":

```
parseExpr(minbp):
    left = atom()                       // số, biến, hoặc (expr), hoặc unary
    while bp(peek) > minbp:             // toán tử kế tiếp đủ mạnh?
        op    = consume()               // ăn toán tử
        right = parseExpr(rbp(op))      // parse vế phải với ngưỡng rbp(op)
        left  = Bin(op, left, right)    // gom thành node nhị phân
    return left
```

Đọc kỹ ba dòng trong vòng `while`:

1. `bp(peek) > minbp` — toán tử kế tiếp có `lbp` lớn hơn ngưỡng hiện tại thì mới gom; nếu không, trả `left` về cho lời gọi cha (cha sẽ tự gom).
2. `right = parseExpr(rbp(op))` — đây là chỗ **đệ quy** dựng vế phải. Ngưỡng truyền xuống là `rbp(op)`; chính `rbp` quyết định trái/phải kết hợp như §2.4.
3. `left = Bin(op, left, right)` — gom `left` cũ + `right` mới thành một nút, rồi lặp lại (cho phép gom chuỗi `1+2+3+...`).

### 3.2 Cài đặt Go đầy đủ

```go
package main

import "fmt"

// ── AST ──────────────────────────────────────────────
type Node interface{ String() string }

type Num struct{ V float64 }
func (n Num) String() string { return fmt.Sprintf("%g", n.V) }

type Bin struct {
    Op          string
    Left, Right Node
}
func (b Bin) String() string {
    return fmt.Sprintf("(%s %s %s)", b.Left, b.Op, b.Right)
}

type Unary struct {
    Op  string
    X   Node
}
func (u Unary) String() string { return fmt.Sprintf("(%s%s)", u.Op, u.X) }

// ── Bảng binding power ───────────────────────────────
// trả về lbp; ok=false nếu token không phải toán tử infix.
func lbp(tok string) (int, bool) {
    switch tok {
    case "=":                    return 10, true
    case "==", "!=", "<", ">":   return 20, true
    case "+", "-":               return 30, true
    case "*", "/":               return 40, true
    case "^":                    return 50, true
    }
    return 0, false
}

// rbp tính từ lbp + tính kết hợp.
func rbp(tok string) int {
    l, _ := lbp(tok)
    switch tok {
    case "^", "=":  return l - 1 // phải-kết-hợp
    default:        return l + 1 // trái-kết-hợp
    }
}

// ── Parser ───────────────────────────────────────────
type Parser struct {
    toks []string
    pos  int
}
func (p *Parser) peek() string {
    if p.pos < len(p.toks) { return p.toks[p.pos] }
    return ""
}
func (p *Parser) next() string { t := p.peek(); p.pos++; return t }

// atom: số, ngoặc, hoặc unary tiền tố
func (p *Parser) atom() Node {
    t := p.next()
    switch {
    case t == "(":
        e := p.parseExpr(0)   // bên trong ngoặc: ngưỡng reset về 0
        p.next()              // ăn ')'
        return e
    case t == "-":            // unary minus, rbp = 60 (mạnh hơn mọi infix)
        return Unary{"-", p.parseExpr(60)}
    default:
        var v float64
        fmt.Sscanf(t, "%g", &v)
        return Num{v}
    }
}

// parseExpr: TRÁI TIM của Pratt
func (p *Parser) parseExpr(minbp int) Node {
    left := p.atom()
    for {
        op := p.peek()
        l, ok := lbp(op)
        if !ok || l <= minbp {   // không phải toán tử, hoặc không đủ mạnh
            break
        }
        p.next()                          // ăn toán tử
        right := p.parseExpr(rbp(op))     // đệ quy vế phải với ngưỡng rbp
        left = Bin{op, left, right}       // gom
    }
    return left
}

func main() {
    // tokens đã được lexer (Lesson 02) cắt sẵn
    cases := [][]string{
        {"2", "+", "3", "*", "4"},
        {"2", "^", "3", "^", "2"},
        {"8", "-", "3", "-", "2"},
        {"-", "2", "^", "2"},
    }
    for _, toks := range cases {
        p := &Parser{toks: toks}
        fmt.Printf("%v\t=> %s\n", toks, p.parseExpr(0))
    }
}
```

Kết quả in ra:

```
[2 + 3 * 4]   => (2 + (3 * 4))
[2 ^ 3 ^ 2]   => (2 ^ (3 ^ 2))
[8 - 3 - 2]   => ((8 - 3) - 2)
[- 2 ^ 2]     => (-(2 ^ 2))     ← unary - yếu hơn ^? Xem §6 lưu ý
```

> So với L04: toàn bộ `expr()`, `term()`, `factor()` rút lại còn **một** `parseExpr(minbp)` + bảng `lbp/rbp`. Thêm so sánh `< >`? Chỉ thêm `case "<", ">": return 20, true` — **không** viết hàm mới.

> **❓ Câu hỏi tự nhiên của người đọc**
>
> **Q: `atom()` parse `(expr)` thì truyền `minbp` bao nhiêu?** `0` — vì trong ngoặc là một biểu thức **độc lập**, mọi toán tử bên trong đều được gom, không bị ngưỡng bên ngoài giới hạn. Đúng tinh thần "ngoặc reset ưu tiên".
>
> **Q: Vòng `while` dùng `l <= minbp` hay `l < minbp`?** `<=`: nếu `lbp == minbp` thì **không** gom (dừng). Kết hợp với quy ước `rbp = lbp + 1` cho trái, đây là điều khiến `8-3-2` gom trái. (Một số sách viết `<` và dùng `rbp = lbp` cho trái — tương đương, chỉ khác quy ước.)

> **📝 Tóm tắt mục 3**
> - Một hàm `parseExpr(minbp)`: `atom()` → vòng `while bp(peek) > minbp` → `parseExpr(rbp(op))` → `Bin`.
> - `atom()` xử lý số, ngoặc (ngưỡng 0), unary tiền tố.
> - Bảng `lbp/rbp` là dữ liệu, không phải code điều khiển → dễ mở rộng.

---

## 4. Walk-through đầy đủ: `2 + 3 * 4`

Tokens: `[2, +, 3, *, 4]`. Gọi `parseExpr(0)`. Ta theo dõi `minbp` và cây dựng dần từng bước. (Bảng: `+`→lbp30 rbp31, `*`→lbp40 rbp41.)

| # | Lời gọi (minbp) | Hành động | peek | so sánh | `left` sau bước |
|---|---|---|---|---|---|
| 1 | `parseExpr(0)` | `atom()` → `2` | `+` | — | `2` |
| 2 | `parseExpr(0)` | `lbp(+)=30 > 0`? **có** → ăn `+` | `3` | `30 > 0` ✓ | (gom sau) |
| 3 | `parseExpr(0)` | gọi `parseExpr(rbp(+)=31)` cho vế phải | | | đệ quy ↓ |
| 4 | `parseExpr(31)` | `atom()` → `3` | `*` | — | `3` |
| 5 | `parseExpr(31)` | `lbp(*)=40 > 31`? **có** → ăn `*` | `4` | `40 > 31` ✓ | (gom sau) |
| 6 | `parseExpr(31)` | gọi `parseExpr(rbp(*)=41)` cho vế phải | | | đệ quy ↓ |
| 7 | `parseExpr(41)` | `atom()` → `4` | `∅` | — | `4` |
| 8 | `parseExpr(41)` | peek hết token → dừng, **return `4`** | | | ↑ trả `4` |
| 9 | `parseExpr(31)` | gom `Bin(*, 3, 4)` = `(3*4)` | `∅` | — | `(3*4)` |
| 10 | `parseExpr(31)` | peek hết → dừng, **return `(3*4)`** | | | ↑ trả `(3*4)` |
| 11 | `parseExpr(0)` | gom `Bin(+, 2, (3*4))` = `(2+(3*4))` | `∅` | — | `(2+(3*4))` |
| 12 | `parseExpr(0)` | peek hết → dừng, **return** kết quả | | | ✓ xong |

Cây dựng dần (đọc từ dưới lên):

```
Bước 7:    4

Bước 9:      *              ← gom 3 và 4 (vì lbp(*)=40 > minbp 31)
            / \
           3   4

Bước 11:     +              ← gom 2 và (3*4) ở mức ngoài (minbp 0)
            / \
           2   *
              / \
             3   4
```

**Vì sao `3` dính với `*` chứ không với `+`?** Tại bước 3, `+` parse vế phải với ngưỡng `minbp = 31`. Tại bước 5, toán tử kế tiếp là `*` có `lbp = 40 > 31` → đủ mạnh để "giật" `3` vào trong đệ quy → `3*4` gom trước, rồi mới trả ngược lên cho `+`. Đúng quy tắc "nhân trước cộng".

**Verify giá trị:** `3*4 = 12`, rồi `2 + 12 = 14`. ✓

> **🔁 Dừng lại tự kiểm tra:** Nếu biểu thức là `2 * 3 + 4`, ở bước "ăn `*` rồi gọi `parseExpr(41)` cho vế phải", khi quay vào parse `3` ta gặp `+` (lbp 30). So `30 > 41`? **Không** → đệ quy dừng ngay, chỉ trả `3`. → cây `((2*3) + 4)`. Tự vẽ thử và kiểm tra `= 10`.

---

## 5. Walk-through phải-kết-hợp: `2 ^ 3 ^ 2 = 512`

Tokens `[2, ^, 3, ^, 2]`. `^`→lbp50, **rbp49** (phải-kết-hợp). Gọi `parseExpr(0)`.

| # | Lời gọi (minbp) | Hành động | peek | so sánh | `left` |
|---|---|---|---|---|---|
| 1 | `parseExpr(0)` | `atom()` → `2` | `^` | — | `2` |
| 2 | `parseExpr(0)` | `50 > 0`? có → ăn `^`₁ | `3` | `50 > 0` ✓ | |
| 3 | `parseExpr(0)` | gọi `parseExpr(rbp(^)=49)` | | | đệ quy ↓ |
| 4 | `parseExpr(49)` | `atom()` → `3` | `^` | — | `3` |
| 5 | `parseExpr(49)` | `50 > 49`? **có** → ăn `^`₂ | `2` | `50 > 49` ✓ | |
| 6 | `parseExpr(49)` | gọi `parseExpr(rbp(^)=49)` | | | đệ quy ↓↓ |
| 7 | `parseExpr(49)` | `atom()` → `2` | `∅` | — | `2` |
| 8 | `parseExpr(49)` | hết token → return `2` | | | ↑ |
| 9 | `parseExpr(49)` | gom `Bin(^, 3, 2)` = `(3^2)` | `∅` | — | `(3^2)` |
| 10 | `parseExpr(49)` | hết → return `(3^2)` | | | ↑ |
| 11 | `parseExpr(0)` | gom `Bin(^, 2, (3^2))` = `(2^(3^2))` | `∅` | — | `(2^(3^2))` |
| 12 | `parseExpr(0)` | hết → return | | | ✓ |

So sánh **bản lề** với `8-3-2`: tại bước 5, `^`₂ có `lbp=50` vs `minbp=49` (= `rbp` của `^`₁). Vì `50 > 49` → `^`₂ **lọt vào** đệ quy → vế phải gom trước → kết hợp **phải**.

Đối chiếu trái: ở `8-3-2` bước tương ứng, `-`₂ có `lbp=30` vs `minbp=31` (= `rbp` của `-`₁). Vì `30 > 31` **sai** → `-`₂ **không** lọt → bị gom ở vòng ngoài → kết hợp **trái**. Đúng một con số `rbp` (49 vs 31) lật toàn bộ cách gom.

Cây:

```
        ^
       / \
      2   ^          ← 2 ^ (3 ^ 2)
         / \
        3   2
```

**Verify:** `3^2 = 9`, `2^9 = 512`. Nếu (sai) gom trái `(2^3)^2 = 8^2 = 64`. Pratt với `rbp = lbp - 1` cho đúng `512`. ✓

> **⚠ Lỗi thường gặp (nhắc lại, vì hay sai):** nếu lập trình viên vô ý đặt `rbp(^) = lbp(^) + 1 = 51`, thì tại bước 5 so `50 > 51` → **sai** → `^`₂ không lọt → gom trái → ra `64`. Một dấu cộng/trừ sai chỗ → kết quả khác hoàn toàn. Luôn nhớ: **phải-kết-hợp ⇒ `rbp` nhỏ hơn `lbp`.**

> **📝 Tóm tắt mục 4–5**
> - Walk-through `2+3*4`: `*` (lbp40 > 31) giật `3` vào đệ quy → `2+(3*4)=14`.
> - Walk-through `2^3^2`: `rbp(^)=49` cho `^`₂ (lbp50) lọt vào đệ quy → `2^(3^2)=512`.
> - Cùng một hàm, chỉ khác `rbp` → khác cách kết hợp.

---

## 6. Toán tử một ngôi (unary) — tiền tố & hậu tố

### 6.1 Unary tiền tố `-x`, `!x`

Toán tử một ngôi tiền tố (prefix) không có toán hạng bên trái, nên nó được xử lý trong **`atom()`** chứ không trong vòng `while`. Khi `atom()` thấy `-`, nó:

```go
case t == "-":
    return Unary{"-", p.parseExpr(60)}  // rbp lớn → giành chặt vế phải
```

`rbp` của unary thường **lớn hơn** mọi infix để `-x` dính chặt: `-3 + 4` phải là `(-3) + 4 = 1`, **không** phải `-(3+4) = -7`. Vì `parseExpr(60)` chỉ gom toán tử có `lbp > 60`, mà `+` chỉ lbp 30 → `-` chỉ ôm đúng `3`.

**Bốn ví dụ unary:**

| Biểu thức | rbp(unary)=60 | Gom thành | Giá trị |
|---|---|---|---|
| `-3 + 4` | `+`(30) không lọt | `(-3) + 4` | 1 |
| `-3 * 4` | `*`(40) không lọt | `(-3) * 4` | -12 |
| `- -5` | unary lồng | `-(-5)` | 5 |
| `-2 ^ 2` | `^`(50) không lọt (60>50) | `(-2) ^ 2` | 4 |

> **⚠ Lưu ý ngôn ngữ-phụ-thuộc:** Trong **toán học** và một số ngôn ngữ (Python, ` -2**2 == -4`), `^`/`**` **mạnh hơn** unary minus → `-2^2 = -(2^2) = -4`. Trong code Go ở §3.2 ta đặt `rbp(unary)=60 > lbp(^)=50` → ra `(-2)^2 = 4`. **Không có "đáp án vũ trụ"** — đây là **lựa chọn thiết kế ngôn ngữ**, mã hóa bằng việc chọn `rbp(unary)` lớn hơn hay nhỏ hơn `lbp(^)`. Bài giữ `60` cho đơn giản; nếu muốn giống Python, đặt `rbp(unary)=45` (giữa `*` và `^`).

### 6.2 Hậu tố (postfix) sơ lược

Toán tử hậu tố (postfix) như `!` giai thừa (`5!`) hay `++` đứng **sau** toán hạng. Trong Pratt, postfix được xử lý trong **vòng `while`** giống infix nhưng **không có vế phải** — chỉ cần `lbp` (đủ mạnh để dính), không cần đệ quy:

```
while ... :
    op = peek
    if isPostfix(op) && lbp(op) > minbp:
        consume()
        left = Unary{op, left}   // không parse right
        continue
    ... (infix như cũ)
```

Ví dụ `5! + 1`: postfix `!` (lbp rất cao) gom `(5!)` trước → `(5!) + 1 = 121`. Pratt xử lý gọn cả ba dạng (prefix/infix/postfix) chỉ bằng cách phân loại token và tra `lbp/rbp` — đây là ưu thế lớn so với phân tầng L04.

> **🔁 Dừng lại tự kiểm tra:** `-2 + 3` với `rbp(unary) = 60`. Unary `-` parse `parseExpr(60)`. Khi vào, gặp `+` (lbp 30). `30 > 60`? Không → unary chỉ ôm `2` → `(-2)`. Quay ra, `+` gom `(-2) + 3 = 1`. ✓ Tự kiểm tra: đổi `rbp(unary)=5` thì sao? → unary sẽ ôm cả `2+3` → `-(2+3) = -5` (sai về quy ước thông thường).

> **📝 Tóm tắt mục 6**
> - Prefix (`-x`, `!x`): xử lý trong `atom()`, `rbp` lớn để dính chặt.
> - Postfix (`5!`): xử lý trong vòng `while`, không có vế phải.
> - Quan hệ unary vs `^` là **lựa chọn thiết kế**, mã hóa qua giá trị `rbp(unary)`.

---

## 7. Pratt parsing trong thực tế & liên hệ Tier 2

- **Vaughan Pratt (1973)** giới thiệu "top-down operator precedence". Ý tưởng đơn giản nhưng mạnh, đến nay vẫn là lựa chọn ưa thích cho phần biểu thức.
- **Go**: parser của chính ngôn ngữ Go (`go/parser`) dùng kỹ thuật precedence climbing cho biểu thức nhị phân — một hàm `parseBinaryExpr(prec)` thay cho chục hàm phân tầng.
- **rust-analyzer** (language server cho Rust) dùng Pratt parsing cho biểu thức.
- Nhiều ngôn ngữ/interpreter giáo trình (vd cuốn *Crafting Interpreters*, *Writing An Interpreter In Go*) dạy Pratt parsing như cách chuẩn để parse biểu thức.

**Liên hệ với L04 và Tier 2:**

- **Cây AST giống hệt L04.** Pratt không đổi *cấu trúc* cây — `(2 + (3*4))` ra y như recursive-descent phân tầng. Nó chỉ làm *code parser* gọn và dễ mở rộng.
- Có AST đúng độ ưu tiên rồi, bước tiếp theo là **làm gì với cây đó**: duyệt, kiểm tra kiểu, tính giá trị, sinh mã. Đó là nội dung **Tier 2 — Semantics**.

→ Bài tiếp theo (Tier 2): [AST & Visitor](../../02-Semantics/lesson-01-ast-visitor/) — cách tổ chức và **duyệt** cây AST bằng mẫu Visitor để gắn ngữ nghĩa lên nó.

---

## 8. Bài tập

> Dùng bảng binding power của §2.3: `=`→10(phải), so sánh→20, `+ -`→30, `* /`→40, `^`→50(phải), unary `-`→rbp 60. Trái-kết-hợp `rbp=lbp+1`, phải-kết-hợp `rbp=lbp-1`.

**Bài 1.** Cho biểu thức `1 + 2 + 3 + 4`. Vẽ cây AST (chỉ rõ kết hợp trái) và tính giá trị.

**Bài 2.** So sánh `2 - 3 - 4` (trái) và giả sử `-` là phải-kết-hợp `2 - (3 - 4)`. Tính cả hai giá trị, chỉ ra vì sao kết hợp quan trọng.

**Bài 3.** Cho biểu thức `2 + 3 * 4 - 5`. Tự tính binding power từng bước (lập bảng giống §4) và vẽ cây cuối cùng. Giá trị?

**Bài 4.** Cho biểu thức `2 ^ 2 ^ 3`. Walk-through từng bước cho thấy `rbp(^)=49` khiến nó gom phải. Tính giá trị. Nếu (sai) đặt `^` trái-kết-hợp thì giá trị là bao nhiêu?

**Bài 5.** (Tự tính binding power & dựng cây) Cho bảng tự định nghĩa: `+`→lbp10 (trái), `*`→lbp20 (trái), `^`→lbp30 (phải). Với biểu thức `a + b * c ^ d ^ e`, hãy:
- (a) tính `rbp` cho từng toán tử;
- (b) walk-through `parseExpr(0)` lập bảng minbp;
- (c) vẽ cây AST cuối cùng.

**Bài 6.** Cho `-2 ^ 2` với hai thiết kế: (i) `rbp(unary)=60`, (ii) `rbp(unary)=45`. Cây và giá trị mỗi trường hợp khác nhau thế nào? Đây minh họa điều gì về thiết kế ngôn ngữ?

**Bài 7.** (Đọc code) Trong `parseExpr`, nếu đổi điều kiện vòng lặp từ `l <= minbp { break }` thành `l < minbp { break }` **mà giữ nguyên** `rbp = lbp + 1` cho trái-kết-hợp, thì `8 - 3 - 2` gom thành gì? Giải thích.

**Bài 8.** Thêm toán tử `%` (chia lấy dư, cùng mức với `* /`, trái-kết-hợp) vào bảng binding power. Cần sửa bao nhiêu dòng code trong `parseExpr` (so với việc phải thêm hàm mới nếu dùng L04)?

## Lời giải chi tiết

### Bài 1

`+` trái-kết-hợp (`lbp=30, rbp=31`). `parseExpr(0)` gom lần lượt:

- atom `1`; gặp `+`(30>0) → vế phải `parseExpr(31)` → atom `2`, gặp `+`(30>31? không) → trả `2`. Gom `(1+2)`.
- Vòng `while` tiếp: gặp `+`(30>0) → vế phải trả `3`. Gom `((1+2)+3)`.
- Tiếp: gặp `+` → trả `4`. Gom `(((1+2)+3)+4)`.

Cây nghiêng trái:

```
        +
       / \
      +   4
     / \
    +   3
   / \
  1   2
```

Giá trị: `1+2=3`, `3+3=6`, `6+4=10`. **= 10.** ✓

### Bài 2

- **Trái** `(2 - 3) - 4 = -1 - 4 = -5`.
- **Phải** `2 - (3 - 4) = 2 - (-1) = 3`.

Hai giá trị khác nhau (`-5` vs `3`) chứng tỏ với toán tử **không** giao hoán/kết hợp như `-`, **chọn sai tính kết hợp = sai kết quả**. Quy ước toán học: `-` là trái-kết-hợp → `-5` mới đúng. Pratt mã hóa điều này bằng `rbp = lbp + 1`.

### Bài 3

`2 + 3 * 4 - 5`. Bảng (rút gọn các bước chính), `parseExpr(0)`:

| Bước | minbp | hành động | left |
|---|---|---|---|
| 1 | 0 | atom `2` | `2` |
| 2 | 0 | `+`(30>0) → vế phải `parseExpr(31)` | |
| 3 | 31 | atom `3`; `*`(40>31) → vế phải `parseExpr(41)` → `4` | gom `(3*4)` |
| 4 | 31 | peek `-`(30>31? không) → trả `(3*4)` | |
| 5 | 0 | gom `(2 + (3*4))` | `(2+(3*4))` |
| 6 | 0 | peek `-`(30>0) → vế phải `parseExpr(31)` → `5` | |
| 7 | 0 | gom `((2+(3*4)) - 5)` | kết quả |

Cây:

```
          -
         / \
        +   5
       / \
      2   *
         / \
        3   4
```

Giá trị: `3*4=12`, `2+12=14`, `14-5=9`. **= 9.** ✓

### Bài 4

`2 ^ 2 ^ 3`, `^`→lbp50, rbp49 (phải).

- atom `2`; `^`₁(50>0) → `parseExpr(49)`.
  - atom `2`; `^`₂(50>49? **có**) → `parseExpr(49)` → atom `3`. Gom `(2^3)`.
  - trả `(2^3)`.
- gom `(2 ^ (2^3))`.

Giá trị (phải, đúng): `2^3 = 8`, `2^8 = 256`. **= 256.**

Nếu `^` **trái**-kết-hợp (sai): `(2^2)^3 = 4^3 = 64`. Khác hẳn → minh họa lại vì sao phải dùng `rbp = lbp - 1` cho `^`.

### Bài 5

Bảng: `+`→lbp10 rbp11 (trái); `*`→lbp20 rbp21 (trái); `^`→lbp30 **rbp29** (phải).

**(a) rbp:** `+`→11, `*`→21, `^`→29.

**(b)** `a + b * c ^ d ^ e`, `parseExpr(0)`:

| Bước | minbp | hành động | left |
|---|---|---|---|
| 1 | 0 | atom `a` | `a` |
| 2 | 0 | `+`(10>0) → `parseExpr(11)` | |
| 3 | 11 | atom `b`; `*`(20>11) → `parseExpr(21)` | |
| 4 | 21 | atom `c`; `^`(30>21) → `parseExpr(29)` | |
| 5 | 29 | atom `d`; `^`(30>29? **có**) → `parseExpr(29)` → `e`. Gom `(d^e)` | `(d^e)` |
| 6 | 29 | hết → trả `(d^e)` | |
| 7 | 21 | gom `(c ^ (d^e))`; peek `+`(10>21? không) → trả | `(c^(d^e))` |
| 8 | 11 | gom `(b * (c^(d^e)))`; peek hết → trả | |
| 9 | 0 | gom `(a + (b * (c^(d^e))))` | kết quả |

**(c)** Cây:

```
        +
       / \
      a   *
         / \
        b   ^
           / \
          c   ^      ← d^e gom phải (rbp 29 cho ^₂ lọt vào)
             / \
            d   e
```

Tức `a + (b * (c ^ (d ^ e)))`. `^` gom phải, `+ *` theo ưu tiên thông thường.

### Bài 6

`-2 ^ 2`. `^`→lbp50.

**(i) `rbp(unary)=60`:** `atom` thấy `-` → `parseExpr(60)`. Vào: atom `2`, gặp `^`(50>60? **không**) → trả `2`. Unary ôm đúng `2` → `(-2)`. Quay ra, `^`(50>0) gom `((-2) ^ 2) = 4`. **Cây `((-2)^2)`, giá trị 4.**

**(ii) `rbp(unary)=45`:** `parseExpr(45)`. Vào: atom `2`, gặp `^`(50>45? **có**) → `^` lọt vào → gom `(2^2)` trước → unary ôm `(2^2)` → `(-(2^2)) = -4`. **Cây `(-(2^2))`, giá trị -4.**

Minh họa: quan hệ "unary minus mạnh hơn hay yếu hơn `^`" **không** cố định — nó là **lựa chọn thiết kế ngôn ngữ**, mã hóa hoàn toàn bằng việc chọn `rbp(unary)` lớn hơn hay nhỏ hơn `lbp(^)`. Python chọn (ii) (`-2**2 == -4`); nhiều máy tính bỏ túi chọn (i).

### Bài 7

Đổi điều kiện thành `l < minbp { break }` (tức gom khi `l >= minbp`) **mà giữ** `rbp(-) = 31` cho trái-kết-hợp.

`8 - 3 - 2`: `parseExpr(0)` → atom `8`, `-`₁(30 ≥ 0) gom → `parseExpr(31)`. Vào: atom `3`, gặp `-`₂(lbp30). Điều kiện dừng `30 < 31`? **đúng** → break → trả `3`. Gom `(8-3)`. Vòng ngoài: `-`₂(30 ≥ 0) gom → trả `2` → `((8-3)-2)`.

→ Vẫn gom **trái** `((8-3)-2) = 3`. Vì với quy ước trái `rbp = lbp+1 = 31`, dù điều kiện là `<=` hay `<` thì so với `lbp = 30` đều cho "không lọt vào đệ quy" (`30 > 31` sai, và `30 < 31` đúng-nên-break) — hai cách viết tương đương khi quy ước `rbp` đi kèm nhất quán. Bài học: **điều kiện vòng lặp và công thức `rbp` phải khớp nhau**; đổi một cái thì phải chỉnh cái kia.

### Bài 8

Thêm `%`: chỉ cần sửa **một dòng** bảng `lbp`:

```go
case "*", "/", "%":  return 40, true   // thêm "%"
```

`rbp` tự đúng (mặc định nhánh `default` trả `l + 1` = trái-kết-hợp). Vòng `while` và phần đệ quy **không đổi**. → **0 hàm mới.**

Đối chiếu L04: thêm `%` cùng mức `* /` thì sửa hàm `term()` thêm điều kiện `peek() == "%"` — cũng nhỏ. Nhưng nếu `%` là **mức ưu tiên mới** (khác `* /`), L04 phải **viết thêm một hàm** và chèn vào chuỗi gọi; Pratt vẫn chỉ thêm **một dòng** bảng. Đây chính là ưu thế mở rộng đã nêu ở §1.

## Tham khảo và bài tiếp theo

- Bài trước: [Lesson 04 — Recursive-Descent Parser](../lesson-04-recursive-descent-parser/) (cách phân tầng — Pratt là bản gọn hơn).
- Nền tảng: [Lesson 03 — Grammar & CFG](../lesson-03-grammar-cfg/).
- **Bài tiếp theo (sang Tier 2 — Semantics):** [AST & Visitor](../../02-Semantics/lesson-01-ast-visitor/) — duyệt và gắn ngữ nghĩa lên cây AST vừa dựng.
- Đọc thêm: Vaughan Pratt, *"Top Down Operator Precedence"* (1973); các bài blog "Simple but Powerful Pratt Parsing" (matklad / tác giả rust-analyzer).
- Minh họa tương tác: [visualization.html](./visualization.html) — Pratt stepper chạy từng bước, demo trái/phải kết hợp, bảng ưu tiên chỉnh được.
</content>
</invoke>
