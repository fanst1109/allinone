# Lesson 08 — Kiểm tra kiểu (Type Checking)

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Hiểu **vì sao** một AST đúng cú pháp vẫn có thể **vô nghĩa về mặt ngữ nghĩa** (`"hello" * 3`, `true + 1`) — và type checker bắt loại lỗi này **trước khi chạy**.
- Biết **kiểu (type)** là gì, **hệ thống kiểu (type system)** là gì: tập các kiểu (`int`, `float`, `bool`, `string`) cộng quy tắc gán kiểu cho mỗi node AST.
- Phân biệt **static typing** (kiểm lúc dịch — Go/Java/Rust) vs **dynamic typing** (kiểm lúc chạy — Python/JS), và trục độc lập **strong vs weak**.
- Hiểu **quy tắc kiểu (type rules)** dạng premise/conclusion, và **suy luận kiểu (type inference)** bottom-up.
- Cài type checker như một **visitor duyệt AST** tra **bảng ký hiệu (symbol table)**, gán và kiểm kiểu từng node.
- Hiểu **ép kiểu (coercion)**: ngầm (implicit, `int → float`) vs tường minh (explicit) — và vì sao ép ngầm nguy hiểm.
- Thấy type checking nối tiếp với interpreter/codegen ra sao, và **Hindley-Milner** suy luận kiểu mạnh hơn thế nào.

## Kiến thức tiền đề

- [Lesson 06 — AST & Visitor](../lesson-01-ast-visitor/) — type checker **là một visitor** duyệt AST. Bài này giả định bạn đã biết AST là cây và mẫu visitor.
- [Lesson 07 — Symbol Table & Scope](../lesson-02-symbol-table-scope/) — để biết kiểu của một **biến**, type checker tra bảng ký hiệu (`tên → kiểu`).
- [DataFoundations — Boolean Logic](../../../DataFoundations/03-MathFoundations/lesson-02-boolean-logic/) — kiểu `bool` chỉ nhận `true`/`false`; quy tắc "`if (cond)` đòi `cond: bool`" dựa trên logic mệnh đề.
- [DataFoundations — Set Theory](../../../DataFoundations/03-MathFoundations/lesson-01-set-theory/) — một **kiểu là một tập giá trị**; "hệ thống kiểu" là cách phân hoạch các giá trị thành các tập rời nhau.

---

## 1. Vì sao cần kiểm tra kiểu? — một câu hỏi cụ thể

> **Câu hỏi mở bài**: Vì sao đoạn `int x = "abc";` trong Go/Java **báo lỗi ngay lúc dịch** (chưa chạy dòng nào), còn cùng ý tưởng đó trong Python (`x: int = "abc"`) lại **chạy bình thường** rồi chỉ "nổ" khi bạn thực sự làm phép tính với `x`?

Câu trả lời nằm trọn trong bài này — và nó là điểm khác biệt cốt lõi giữa **static** và **dynamic typing** (§3). Nhưng trước hết, hãy thấy **vấn đề** mà type checker giải.

Sau khi parser (Lesson 06) dựng được AST và symbol table (Lesson 07) biết mỗi tên trỏ tới gì, ta vẫn còn một lớp lỗi mà **cả hai bước trên đều không bắt được**:

```
"hello" * 3        // cú pháp ĐÚNG: <string> <op> <number>. Nhưng nhân chuỗi với số nghĩa là gì?
true + 1           // cú pháp ĐÚNG: <bool> <op> <int>. Nhưng cộng "đúng/sai" với 1?
int x = "abc";     // cú pháp ĐÚNG: <type> <name> = <expr>. Nhưng gán string vào ô int?
if (42) { ... }    // cú pháp ĐÚNG. Nhưng 42 không phải bool, "điều kiện" 42 nghĩa là gì?
```

💡 **Trực giác / Hình dung**: Hãy coi parser như người **soát chính tả và ngữ pháp** một câu: "Con mèo ăn ý tưởng màu xanh không màu" — đúng ngữ pháp hoàn hảo, nhưng **vô nghĩa**. Type checker là người **soát nghĩa**: nó kiểm tra rằng các "từ" (giá trị) được ghép lại theo cách *có nghĩa* — bạn không "ăn một ý tưởng", và máy tính không "nhân một chuỗi với phép cộng".

Một cách nói khác: cú pháp đảm bảo *hình dạng* chương trình đúng; type checker đảm bảo *các mảnh ghép khớp nhau* — như ổ cắm điện: phích 3 chấu (kiểu) phải khớp ổ 3 chấu, cắm phích string vào ổ int là sai dù cả hai đều "là phích".

**Type checker** (còn gọi là *semantic analyzer* phần kiểu) là một pha của compiler chạy **sau** parsing, **trước** sinh mã (codegen) hoặc thông dịch (interpret). Nhiệm vụ: với mỗi biểu thức trong AST, xác định **kiểu** của nó và kiểm tra rằng mọi phép toán được áp lên đúng kiểu. Nếu không → **type error** ngay lúc dịch.

### 1.1 Lợi ích cụ thể — bắt lỗi trước khi nó kịp hại

| Không type-check | Có type-check (lúc dịch) |
|---|---|
| `true + 1` chạy ra `2` (JS) — bug âm thầm | Báo `cannot add bool and int` ngay |
| Gọi `user.getName()` khi `user` là `int` → crash khi chạy, có thể ở production | Báo lỗi tại dòng đó, trước khi ship |
| Truyền nhầm thứ tự đối số `f(amount, name)` (đảo) → kết quả sai lặng lẽ | Nếu kiểu khác nhau → báo lỗi mismatch |
| Đổi tên field, quên 1 chỗ → lỗi runtime | Compiler liệt kê mọi chỗ kiểu không khớp |

❓ **Câu hỏi tự nhiên của người đọc**

- *"Type checker có làm chương trình chạy nhanh hơn không?"* — Có, gián tiếp: khi compiler **biết chắc** `x` là `int`, nó sinh mã cộng số nguyên trực tiếp, không cần kiểm kiểu lúc chạy. Dynamic language phải kiểm kiểu **mỗi lần** thực thi → chậm hơn.
- *"Nếu chương trình của tôi vốn đúng, type checker có thừa không?"* — Không. Nó là **lưới an toàn** bắt lỗi *trước* khi bạn (hoặc người dùng) gặp. Và nó là **tài liệu sống**: đọc `func area(w, h float64) float64` là biết ngay nhận gì, trả gì.
- *"Mọi lỗi đều bắt được lúc dịch chứ?"* — Không. Type checker bắt lỗi *kiểu*. Chia cho 0, truy cập index ngoài mảng, null pointer — phần lớn vẫn là lỗi runtime (trừ vài hệ kiểu rất mạnh như Rust/dependent types).

📝 **Tóm tắt mục 1**

- AST đúng cú pháp **không** đảm bảo có nghĩa: `"hello" * 3`, `true + 1` qua được parser nhưng vô nghĩa.
- Type checker là pha **sau parse, trước codegen/interpret**, gán kiểu cho mỗi node và kiểm phép toán khớp kiểu.
- Lợi ích: bắt lỗi sớm (lúc dịch), tài liệu sống, mã chạy nhanh hơn.
- Trả lời câu mở bài (chi tiết ở §3): static typing kiểm lúc dịch nên `int x = "abc"` lỗi ngay; dynamic typing kiểm lúc chạy nên Python chỉ lỗi khi dùng tới.

---

## 2. Kiểu là gì? Hệ thống kiểu là gì?

### 2.1 Định nghĩa kiểu

💡 **Trực giác**: Một **kiểu** trả lời câu hỏi *"giá trị này thuộc loại nào, và làm được gì với nó?"*. Cùng một dãy bit `01000001` có thể là số `65`, ký tự `'A'`, hay `true` tùy *kiểu* ta gán cho nó. Kiểu là cái **nhãn cho biết cách diễn giải bit và phép nào hợp lệ**.

**Định nghĩa (3 phần):**

**(a) Là gì** — Một **kiểu (type)** là một **tập hợp các giá trị** cùng với **tập các phép toán hợp lệ** trên chúng. Liên hệ trực tiếp tới [set theory](../../../DataFoundations/03-MathFoundations/lesson-01-set-theory/): mỗi kiểu *chính là một tập*.

**(b) Vì sao tồn tại / vì sao cần** — Không có kiểu, máy chỉ thấy bit. Kiểu cho compiler/người đọc biết *ý nghĩa* của bit và *phép nào hợp lệ*: cộng hai `int` được, nhưng "cộng" hai `bool` thì vô nghĩa. Kiểu ngăn ta ghép các mảnh không khớp.

**(c) Ví dụ trực giác bằng số cụ thể** — Kiểu `bool` là tập `{true, false}` (đúng 2 phần tử) với phép `&&`, `||`, `!`. Kiểu `int` (giả sử 8-bit có dấu) là tập `{-128, …, 127}` với phép `+ - * / %`. Phép `&&` áp lên `bool` hợp lệ; áp lên `int` thì với hệ kiểu chặt là **lỗi**.

**Bốn ví dụ kiểu cơ bản (tập giá trị + phép toán):**

| Kiểu | Tập giá trị (set) | Phép toán hợp lệ tiêu biểu |
|---|---|---|
| `bool` | `{true, false}` | `&&` `\|\|` `!` `==` `!=` |
| `int` | `{…, -2, -1, 0, 1, 2, …}` (hữu hạn theo số bit) | `+ - * / %` `< > == ` |
| `float` | xấp xỉ ℝ (IEEE-754) | `+ - * /` `< > ==` |
| `string` | mọi dãy ký tự `"", "a", "hi", …` | `+` (nối) `==` `len()` indexing |

⚠ **Lỗi thường gặp**: nghĩ "string cộng được thì số cũng cộng được thì cộng chéo được". Sai. `"a" + "b" = "ab"` (nối) và `1 + 2 = 3` (cộng số) **dùng chung ký hiệu `+` nhưng là hai phép khác nhau**, định nghĩa trên hai tập khác nhau. Không có phép `+` nào định nghĩa giữa `string` và `int` ở hệ kiểu chặt → `"a" + 1` là type error.

### 2.2 Hệ thống kiểu (type system)

**(a) Là gì** — Một **hệ thống kiểu** là **bộ quy tắc gán kiểu cho mỗi cấu trúc trong chương trình** (literal, biến, biểu thức, lệnh) và **kiểm tra tính nhất quán** của chúng. Nó trả lời: "node AST này có kiểu gì?" và "phép toán này có hợp lệ không?".

**(b) Vì sao cần** — Để **tự động hóa** việc soát nghĩa. Thay vì con người soi từng dòng, hệ thống kiểu cho compiler một thuật toán máy móc để xác định và kiểm kiểu toàn bộ chương trình.

**(c) Ví dụ trực giác** — Quy tắc: "literal `42` có kiểu `int`"; "literal `3.14` có kiểu `float`"; "nếu `e1: int` và `e2: int` thì `e1 + e2 : int`"; "nếu `c: bool` thì `if (c) { … }` hợp lệ". Mỗi node AST có **một quy tắc kiểu** tương ứng.

❓ **Câu hỏi tự nhiên**

- *"Kiểu nằm ở đâu trong bộ nhớ?"* — Kiểu là khái niệm **lúc dịch** (compile-time). Sau khi type-check xong và sinh mã, phần lớn thông tin kiểu *biến mất* — runtime chỉ còn bit. (Dynamic language giữ kiểu kèm giá trị lúc chạy → xem §3.)
- *"Một biến đổi kiểu giữa chừng được không?"* — Trong static typing: thường không (kiểu cố định khi khai báo). Trong dynamic typing: được, vì kiểu gắn với *giá trị* chứ không gắn với *biến*.

🔁 **Dừng lại tự kiểm tra**

<details>
<summary>1. Kiểu <code>bool</code> là tập gì? Có mấy phần tử?</summary>

`{true, false}` — đúng 2 phần tử. Vì thế một giá trị `bool` về lý thuyết chỉ cần **1 bit** để lưu.
</details>

<details>
<summary>2. Vì sao <code>"a" + 1</code> là type error ở hệ kiểu chặt, dù cả <code>+</code> trên string và <code>+</code> trên int đều tồn tại?</summary>

Vì **không có** định nghĩa phép `+` nào có chữ ký `string × int`. Phép `+` nối chuỗi đòi `string × string`; phép `+` cộng số đòi `int × int` (hoặc `float × float`). `string × int` không khớp quy tắc nào → lỗi.
</details>

📝 **Tóm tắt mục 2**

- Một **kiểu = một tập giá trị + tập phép toán hợp lệ** trên tập đó (liên hệ set theory).
- 4 kiểu nền: `bool` `{true,false}`, `int`, `float`, `string`.
- **Hệ thống kiểu** = bộ quy tắc gán kiểu cho từng node AST + kiểm nhất quán.
- Cùng ký hiệu (`+`) có thể là nhiều phép khác nhau trên các tập khác nhau (overloading) — không suy ra cộng chéo kiểu được.

---

## 3. Static vs Dynamic typing — trả lời câu hỏi mở bài

Đây là trục phân loại quan trọng nhất. Có **hai trục độc lập** thường bị nhầm lẫn:

- **Static vs Dynamic**: kiểm kiểu **lúc nào**? (lúc dịch vs lúc chạy)
- **Strong vs Weak**: ngôn ngữ **ép kiểu ngầm** dễ dãi tới đâu? (ít/không vs nhiều)

### 3.1 Static typing — kiểm lúc dịch

💡 **Trực giác**: Như **kiểm tra giấy tờ ở cổng an ninh sân bay** trước khi lên máy bay. Mọi hành khách (biểu thức) bị soi kiểu *trước khi* chương trình cất cánh (chạy). Có gì sai → không cho bay, báo lỗi ngay tại cổng.

Ngôn ngữ static (**Go, Java, Rust, C, TypeScript**): mỗi biến/biểu thức có kiểu **xác định lúc dịch**. Compiler chạy type checker; nếu có mismatch → **lỗi biên dịch**, file không build được, chưa dòng nào chạy.

```go
// Go
var x int = "abc"   // ❌ LỖI LÚC DỊCH: cannot use "abc" (string) as int
                    //    -> compiler từ chối, binary không được tạo
```

### 3.2 Dynamic typing — kiểm lúc chạy

💡 **Trực giác**: Như **kiểm vé ngay trên tàu** chứ không ở cổng. Tàu cứ chạy; chỉ khi nhân viên đi soát tới chỗ bạn (dòng code thực sự chạy) mới phát hiện vé sai. Những toa chưa soát tới (code chưa chạy nhánh đó) thì lỗi vẫn ẩn.

Ngôn ngữ dynamic (**Python, JavaScript, Ruby, PHP**): kiểu gắn với **giá trị lúc chạy**, không gắn với biến. Không có pha type-check lúc dịch; lỗi kiểu chỉ lộ khi dòng đó **thực sự thực thi**.

```python
# Python
x: int = "abc"      # ✅ CHẠY BÌNH THƯỜNG — annotation chỉ là gợi ý, không ép
print("ok")          # in "ok"
y = x + 5            # 💥 LỖI LÚC CHẠY tại ĐÂY: can only concatenate str... to str
```

→ **Đây chính là lời giải câu hỏi mở bài**: Go báo lỗi `int x = "abc"` *lúc dịch* vì nó là static — type checker chạy trước khi sinh binary. Python *không* có pha đó; nó chỉ kiểm khi `x` được dùng trong phép tính ở runtime, nên `x = "abc"` chạy qua, lỗi nổ muộn hơn (và chỉ nổ nếu nhánh đó được chạy).

### 3.3 Strong vs Weak — trục độc lập

⚠ **Lỗi thường gặp #1: nhầm "static = strong" và "dynamic = weak".** Hai trục **độc lập**:

| | | |
|---|---|---|
| | **Strong** (ít ép ngầm) | **Weak** (ép ngầm nhiều) |
| **Static** | Go, Rust, Java | C (`int`↔`char`↔pointer dễ dãi) |
| **Dynamic** | Python (`"a" + 1` → lỗi) | JavaScript (`"a" + 1` → `"a1"`) |

- **Python là dynamic NHƯNG strong**: `"a" + 1` báo `TypeError`, không tự ép.
- **JavaScript là dynamic VÀ weak**: `"a" + 1` cho `"a1"`, `[] + {}` cho `"[object Object]"` — ép ngầm tới mức khó đoán.
- **Go là static VÀ strong**: thậm chí không cho cộng `int` với `int64` không cùng kiểu nếu chưa ép tường minh.
- **C là static NHƯNG khá weak**: `char c = 300;` lặng lẽ tràn, ép `int`↔pointer dễ dãi.

### 3.4 Bảng so sánh tổng hợp (≥ 4 ngôn ngữ)

| Ngôn ngữ | Static/Dynamic | Strong/Weak | `"a" + 1` cho gì? | Lỗi kiểu lộ khi nào? |
|---|---|---|---|---|
| **Go** | Static | Strong | lỗi biên dịch | lúc dịch |
| **Java** | Static | Strong-ish | `"a1"` (`+` với String tự `toString`) | lúc dịch (nếu kiểu khác hẳn) |
| **Rust** | Static | Strong | lỗi biên dịch | lúc dịch |
| **Python** | Dynamic | Strong | `TypeError` | lúc chạy |
| **JavaScript** | Dynamic | Weak | `"a1"` | hiếm khi lỗi — ép ngầm |
| **C** | Static | Weak | (con trỏ + int) — UB/cảnh báo | lúc dịch một phần, còn lại UB |

❓ **Câu hỏi tự nhiên**

- *"Static luôn tốt hơn dynamic chứ?"* — Không tuyệt đối. Static bắt lỗi sớm, mã nhanh, tốt cho dự án lớn nhiều người. Dynamic linh hoạt, viết nhanh, hợp prototype/script. Đây là đánh đổi, không phải hơn-thua.
- *"TypeScript là static hay dynamic?"* — TS thêm **lớp static lúc dịch** trên JS, nhưng biên dịch ra JS (dynamic) chạy ở runtime. Kiểu TS bị *xóa* (type erasure) khi chạy → nếu dữ liệu vào từ ngoài (API) sai kiểu, runtime vẫn có thể nổ.
- *"Gradual typing là gì?"* — Trộn cả hai: phần có annotation thì kiểm static (vd `mypy` cho Python), phần không annotation để dynamic. Cho phép thêm kiểu dần.

🔁 **Dừng lại tự kiểm tra**

<details>
<summary>1. Python là strong hay weak? Cho ví dụ chứng minh.</summary>

**Strong**. `"a" + 1` ném `TypeError: can only concatenate str (not "int") to str` thay vì âm thầm ép. Nó *dynamic* (kiểm lúc chạy) nhưng *strong* (không ép bừa).
</details>

<details>
<summary>2. Vì sao <code>x: int = "abc"</code> trong Python không báo lỗi khi import file?</summary>

Vì annotation `: int` chỉ là **gợi ý** (hint), trình thông dịch CPython **bỏ qua** lúc chạy. Chỉ công cụ static riêng (`mypy`) mới đọc và cảnh báo. Nếu không chạy `mypy`, gán vẫn thành công.
</details>

📝 **Tóm tắt mục 3**

- **Static** (Go/Java/Rust): kiểm kiểu **lúc dịch** → lỗi sớm, không build được nếu sai.
- **Dynamic** (Python/JS): kiểm **lúc chạy** → lỗi chỉ lộ khi dòng đó thực thi.
- **Strong vs Weak** là trục *khác*: mức độ ép ngầm. Python = dynamic + strong; JS = dynamic + weak; Go = static + strong; C = static + weak.
- Câu mở bài: `int x = "abc"` lỗi lúc dịch ở Go vì static; chạy được ở Python vì dynamic + annotation chỉ là hint.

---

## 4. Quy tắc kiểu & Suy luận kiểu (type rules & inference)

### 4.1 Quy tắc kiểu dạng premise/conclusion

💡 **Trực giác**: Một **quy tắc kiểu** đọc như câu suy luận logic: *"NẾU các phần con thỏa điều kiện kiểu (premise — tiền đề), THÌ cả biểu thức có kiểu gì (conclusion — kết luận)."* Giống tam đoạn luận: "nếu trời mưa và tôi ra ngoài thì tôi ướt".

Ký pháp formal (đọc lướt, không cần nhớ): vạch ngang phân tách tiền đề (trên) và kết luận (dưới). `e : T` đọc là "`e` có kiểu `T`".

```
   e1 : int      e2 : int          (tiền đề: cả hai con là int)
  ───────────────────────────      (vạch suy luận)
        e1 + e2 : int              (kết luận: tổng có kiểu int)
```

Vài quy tắc nền (viết kiểu một dòng cho gọn):

| Cấu trúc | Quy tắc kiểu |
|---|---|
| Literal số nguyên | `42 : int` |
| Literal số thực | `3.14 : float` |
| Literal bool | `true : bool`, `false : bool` |
| Literal chuỗi | `"hi" : string` |
| Biến `x` | tra symbol table: kiểu của `x` = kiểu khai báo |
| Cộng số | `e1:int, e2:int ⊢ e1+e2 : int` |
| Cộng thực | `e1:float, e2:float ⊢ e1+e2 : float` |
| Nối chuỗi | `e1:string, e2:string ⊢ e1+e2 : string` |
| So sánh | `e1:T, e2:T ⊢ e1<e2 : bool` |
| Điều kiện if | `c:bool ⊢ if(c){…} hợp lệ` |

⚠ **Lỗi thường gặp**: tưởng "có quy tắc cho `+` là cộng được mọi thứ". Sai — `+` có **nhiều quy tắc**, mỗi quy tắc đòi premise riêng (`int×int`, `float×float`, `string×string`). Không có quy tắc nào khớp `bool × int` → `true + 1` **không suy ra được kiểu** → type error.

### 4.2 Suy luận kiểu (type inference) là gì

**(a) Là gì** — **Suy luận kiểu** là quá trình compiler **tự tính ra kiểu** của một biểu thức từ kiểu các thành phần, **không cần lập trình viên ghi rõ**. Nó áp các quy tắc kiểu **từ lá lên gốc** (bottom-up) trên AST.

**(b) Vì sao cần** — Giảm "rườm rà" (boilerplate): thay vì `int sum = (int)2 + (int)3;` ghi kiểu khắp nơi, compiler tự suy `2+3 : int`. Go cho `x := 2 + 3` rồi tự biết `x` là `int`.

**(c) Ví dụ trực giác** — Với `(2 + 3) * 4`: compiler thấy `2:int`, `3:int` → quy tắc cộng → `2+3:int`; rồi `(2+3):int`, `4:int` → quy tắc nhân → cả biểu thức `:int`. Không ai phải ghi "int" lần nào.

### 4.3 Walk-through ĐẦY ĐỦ — ca ĐÚNG: typecheck `(2 + 3) * 4`

Ta gán kiểu **bottom-up**: bắt đầu từ các **lá** (literal), rồi lên dần tới **gốc**. AST của `(2 + 3) * 4`:

```
        (*)              ← gốc: phép nhân
       /   \
     (+)    4            ← trái: (2+3), phải: literal 4
    /   \
   2     3               ← lá: hai literal
```

**Bước 1 — gán kiểu cho các lá (literal):**

- Node `2` là literal số nguyên → áp quy tắc "literal số nguyên" → **`2 : int`**.
- Node `3` là literal số nguyên → áp quy tắc "literal số nguyên" → **`3 : int`**.
- Node `4` là literal số nguyên → áp quy tắc "literal số nguyên" → **`4 : int`**.

**Bước 2 — gán kiểu cho node `(+)` (cha của `2` và `3`):**

- Con trái `2 : int` (đã có ở Bước 1). Con phải `3 : int` (đã có).
- Tra quy tắc cộng: cần `e1:int` ∧ `e2:int`. Kiểm: `int` ∧ `int` → **khớp** ✓.
- Kết luận: **`(2 + 3) : int`**.

**Bước 3 — gán kiểu cho node `(*)` (gốc, cha của `(+)` và `4`):**

- Con trái `(2 + 3) : int` (vừa suy ở Bước 2). Con phải `4 : int` (Bước 1).
- Tra quy tắc nhân: cần `e1:int` ∧ `e2:int`. Kiểm: `int` ∧ `int` → **khớp** ✓.
- Kết luận: **`(2 + 3) * 4 : int`**.

**Kết quả**: toàn biểu thức có kiểu **`int`**. Không có node nào vi phạm quy tắc → **không có type error**. (Kiểm số: `(2+3)*4 = 5*4 = 20`, một số nguyên — khớp kiểu `int` ✓.)

### 4.4 Walk-through ĐẦY ĐỦ — ca LỖI: typecheck `2 + true`

AST của `2 + true`:

```
     (+)                ← gốc: phép cộng
    /   \
   2    true            ← lá: literal int và literal bool
```

**Bước 1 — gán kiểu cho các lá:**

- Node `2` là literal số nguyên → áp quy tắc "literal số nguyên" → **`2 : int`**.
- Node `true` là literal bool → áp quy tắc "literal bool" → **`true : bool`**.

**Bước 2 — gán kiểu cho node `(+)` (gốc):**

- Con trái `2 : int` (Bước 1). Con phải `true : bool` (Bước 1).
- Tra **mọi** quy tắc của `+`:
  - Quy tắc cộng số: cần `int × int`. Kiểm: trái `int` ✓ nhưng phải `bool` ✗ → **không khớp**.
  - Quy tắc cộng thực: cần `float × float`. Trái `int` ✗ → **không khớp**.
  - Quy tắc nối chuỗi: cần `string × string`. Trái `int` ✗ → **không khớp**.
- **Không quy tắc nào của `+` khớp `int × bool`** → không suy ra được kiểu cho node `(+)`.
- → Compiler báo **TYPE ERROR tại node `+`**: *"toán tử `+` không áp được cho `int` và `bool`"*. Node `+` được tô đỏ; vị trí lỗi chính là chỗ `+` ghép hai con không khớp.

**Điểm mấu chốt**: lỗi **không** ở node `2` (hợp lệ `int`), cũng **không** ở node `true` (hợp lệ `bool`) — lỗi ở **node cha `+`** nơi hai kiểu được *kết hợp*. Đây là lý do thông báo lỗi tốt phải chỉ đúng vào toán tử/vị trí kết hợp, chứ không phải vào lá.

🔁 **Dừng lại tự kiểm tra**

<details>
<summary>1. Typecheck <code>(1 &lt; 2) + 3</code>. Có lỗi không? Tại node nào?</summary>

Bottom-up: `1:int`, `2:int` → `(1 < 2)` áp quy tắc so sánh `int×int → bool`, vậy `(1<2):bool`. `3:int`. Node `+`: con trái `bool`, con phải `int` → không quy tắc `+` nào khớp `bool×int` → **TYPE ERROR tại node `+`**.
</details>

<details>
<summary>2. Typecheck <code>"x" + "y"</code>. Kiểu gì?</summary>

`"x":string`, `"y":string`. Node `+` khớp quy tắc **nối chuỗi** `string×string → string`. Kết quả: **`string`**, không lỗi.
</details>

📝 **Tóm tắt mục 4**

- **Quy tắc kiểu** = "nếu các con thỏa premise thì biểu thức có kiểu (conclusion)". Toán tử như `+` có **nhiều** quy tắc.
- **Suy luận kiểu** áp các quy tắc **bottom-up** (lá → gốc) để tự tính kiểu, không cần khai báo thừa.
- Ca đúng `(2+3)*4`: mọi node khớp quy tắc → kiểu `int`.
- Ca lỗi `2 + true`: node `+` không khớp quy tắc nào với `int×bool` → type error **tại node `+`**, không phải tại lá.

---

## 5. Type checking = visitor duyệt AST tra symbol table

Type checker **không** là phép màu — nó là một [visitor](../lesson-01-ast-visitor/) duyệt AST đệ quy. Tại mỗi node:

1. Đệ quy **vào các con trước** (vì cần kiểu con để suy kiểu cha — đúng tinh thần bottom-up §4.3).
2. Với **literal** → trả kiểu cố định. Với **biến** → tra [symbol table](../lesson-02-symbol-table-scope/) lấy kiểu khai báo.
3. Với **toán tử** → kiểm kiểu các con khớp quy tắc; nếu khớp → trả kiểu kết quả; nếu không → **báo type error tại node này**.

💡 **Trực giác**: giống cách bạn tính `(2+3)*4` bằng tay — phải tính `(2+3)` trước rồi mới nhân với `4`. Visitor đệ quy vào con trước (tính trong ngoặc) rồi mới xử node cha (nhân).

Phác thảo bằng **Go type-switch** (dạng rút gọn, minh họa — không phải code production):

```go
// Kiểu trả về của type checker cho mỗi node.
type Type int
const ( TInt Type = iota; TFloat; TBool; TString; TError )

// checkExpr trả về kiểu của node, hoặc TError nếu có lỗi (và ghi lỗi).
func checkExpr(n Node, sym *SymbolTable) Type {
    switch e := n.(type) {

    case *IntLit:    // literal số nguyên → int
        return TInt
    case *FloatLit:  // literal số thực → float
        return TFloat
    case *BoolLit:   // literal true/false → bool
        return TBool
    case *StringLit: // literal "..." → string
        return TString

    case *VarRef:    // biến → tra symbol table lấy kiểu đã khai báo
        t, ok := sym.Lookup(e.Name)
        if !ok {
            report("biến chưa khai báo: " + e.Name) // liên hệ Lesson 07
            return TError
        }
        return t

    case *BinOp:     // toán tử hai ngôi: đệ quy con TRƯỚC (bottom-up)
        lt := checkExpr(e.Left, sym)   // kiểu con trái
        rt := checkExpr(e.Right, sym)  // kiểu con phải
        if lt == TError || rt == TError {
            return TError // lỗi đã báo ở con, không báo chồng
        }
        switch e.Op {
        case "+", "-", "*", "/":
            if lt == TInt && rt == TInt       { return TInt }
            if lt == TFloat && rt == TFloat   { return TFloat }
            if e.Op == "+" && lt == TString && rt == TString { return TString } // nối chuỗi
            report("toán tử " + e.Op + " không áp được cho hai kiểu này") // vd 2 + true
            return TError
        case "<", ">", "==", "!=":
            if lt == rt { return TBool } // so sánh cùng kiểu → bool
            report("so sánh hai kiểu khác nhau")
            return TError
        }
    }
    return TError
}
```

❓ **Câu hỏi tự nhiên**

- *"Vì sao đệ quy vào con trước rồi mới xử cha?"* — Vì cha cần biết kiểu con để áp quy tắc (`+` cần biết hai con là `int` hay không). Đây là **post-order traversal** — đúng thứ tự bottom-up của §4.
- *"Khi con đã lỗi (`TError`) thì cha làm gì?"* — Trả `TError` luôn, **không báo lỗi chồng** lên lỗi gốc. Tránh "một lỗi đẻ ra mười thông báo".
- *"Biến lấy kiểu ở đâu?"* — Từ **symbol table** (Lesson 07). Type checker và symbol table luôn đi đôi: bảng giữ `tên → kiểu`, checker tra bảng mỗi khi gặp biến.

📝 **Tóm tắt mục 5**

- Type checker = **visitor đệ quy** trên AST, đi **post-order** (con trước, cha sau) → đúng bottom-up.
- Literal → kiểu cố định; biến → tra **symbol table**; toán tử → kiểm con khớp quy tắc rồi trả kiểu kết quả hoặc `TError`.
- Con lỗi → cha trả `TError` không báo chồng.

---

## 6. Ép kiểu (coercion): ngầm vs tường minh

💡 **Trực giác**: **Ép kiểu** là *đổi giá trị từ kiểu này sang kiểu khác*. Như đổi tiền: 1 tờ 100k (int) đổi thành đúng 100000 đồng lẻ (float `100000.0`) thì **không mất gì**; nhưng đổi 100000 đồng lẻ về tờ chẵn mà bỏ lẻ thì **mất phần lẻ**. Ép "mở rộng" thường an toàn; ép "thu hẹp" có thể mất dữ liệu.

### 6.1 Ép ngầm (implicit coercion) vs tường minh (explicit)

- **Ép ngầm**: compiler **tự** chèn chuyển đổi, lập trình viên **không viết gì**. Vd nhiều ngôn ngữ cho `1 + 2.5` tự nâng `1 → 1.0` rồi cộng → `3.5`.
- **Ép tường minh (type cast/conversion)**: lập trình viên **viết rõ** lệnh đổi. Vd Go: `float64(1) + 2.5`.

### 6.2 Bốn ví dụ cụ thể (ép ngầm)

1. **`int → float` (mở rộng, an toàn)**: `1 + 2.5`. `1` nâng thành `1.0`, kết quả `3.5 : float`. Không mất dữ liệu vì mọi `int` nhỏ đều biểu diễn chính xác bằng `float`.
2. **`float → int` (thu hẹp, MẤT dữ liệu)**: gán `int n = 3.9`. Ép cắt phần thập phân → `n = 3` (mất `0.9`). Nguy hiểm: lặng lẽ sai.
3. **`int → string`?** — tùy ngôn ngữ. Go: **không** ép ngầm, phải `strconv.Itoa(n)`. JS: `1 + "" → "1"` ép ngầm. Python: `str(1)` tường minh, `1 + "" → TypeError`.
4. **`bool → int`?** — C: `true → 1`, `false → 0` ngầm (weak). Go/Python: **không** cho ép ngầm `bool↔int`.

### 6.3 Vì sao ép ngầm nguy hiểm

⚠ **Lỗi thường gặp — ép ngầm làm MẤT dữ liệu lặng lẽ**: `int n = 3.9` cho `n = 3`. Không cảnh báo (ở ngôn ngữ weak), bug âm thầm. Người đọc code không thấy phép cắt nào → khó debug.

⚠ **Lỗi thường gặp — ép ngầm cho kết quả KHÓ ĐOÁN (JS weak typing)**:

```js
1 + "2"      // "12"  (số ép thành chuỗi → nối)
"3" * 2      // 6     (chuỗi ép thành số → nhân)
1 + 2 + "3"  // "33"  (trái sang: (1+2)=3, rồi 3+"3"="33")
"3" + 1 + 2  // "312" (trái sang: "3"+1="31", rồi "31"+2="312")
```

Cùng các toán hạng, đổi thứ tự → kết quả hoàn toàn khác. Đây là lý do nhiều người sợ `==` của JS và dùng `===` (so sánh **không** ép).

⚠ **Lỗi thường gặp — `null`/`nil` và kiểu**: Tony Hoare gọi `null` là "lỗi tỉ đô". `null` thường "khớp" mọi kiểu tham chiếu (ép ngầm ngầm định), nên `user.getName()` khi `user == null` qua được type checker nhưng **nổ lúc chạy** (NullPointerException). Hệ kiểu hiện đại (Rust `Option<T>`, Kotlin `String?`, TS `strictNullChecks`) ép bạn xử lý trường hợp null **tường minh** → biến lỗi runtime thành lỗi lúc dịch.

### 6.4 Vì sao ngôn ngữ tốt ưu tiên ép tường minh

Go cố tình **không** ép ngầm số: `var x int = 1; var y float64 = 2.5; x + y` → **lỗi biên dịch**, buộc viết `float64(x) + y`. Phiền hơn nhưng **rõ ràng**: mọi chuyển đổi đều nhìn thấy trong code, không có phép cắt/nâng ẩn. Đây là đánh đổi "an toàn & rõ ràng" lấy "tiện".

🔁 **Dừng lại tự kiểm tra**

<details>
<summary>1. JS: <code>"5" - 1</code> cho gì? Còn <code>"5" + 1</code>?</summary>

`"5" - 1 = 4` (toán tử `-` không định nghĩa cho chuỗi → ép `"5" → 5` rồi trừ). `"5" + 1 = "51"` (toán tử `+` ưu tiên nối chuỗi khi có toán hạng chuỗi → ép `1 → "1"`). Khác nhau hoàn toàn dù cùng toán hạng — minh họa rõ tính khó đoán của weak typing.
</details>

<details>
<summary>2. Vì sao gán <code>int n = 3.9</code> nguy hiểm hơn <code>float f = 3</code>?</summary>

`float f = 3` là ép **mở rộng** (`3 → 3.0`), không mất gì. `int n = 3.9` là ép **thu hẹp** (`3.9 → 3`), **mất** `0.9` âm thầm. Thu hẹp ngầm là nguồn bug; nhiều ngôn ngữ chặn nó, đòi cast tường minh.
</details>

📝 **Tóm tắt mục 6**

- **Ép ngầm**: compiler tự chuyển. **Ép tường minh**: lập trình viên viết rõ (cast).
- Ép **mở rộng** (`int→float`) thường an toàn; ép **thu hẹp** (`float→int`) mất dữ liệu.
- Ép ngầm nguy hiểm: mất dữ liệu lặng lẽ, kết quả khó đoán (JS), và `null` qua mặt type checker.
- Ngôn ngữ chặt (Go/Rust) ưu tiên **ép tường minh** để mọi chuyển đổi hiện rõ trong code.

---

## 7. Liên hệ: type check xong rồi sao? & Hindley-Milner

### 7.1 Sau type check → interpreter/codegen yên tâm

Khi type checker **đã** khẳng định AST hợp lệ kiểu, các pha sau **không phải kiểm lại**:

- **[Tree-walking interpreter](../lesson-04-tree-walking-interpreter/)** (Lesson 09): khi gặp node `+` với hai con đã biết chắc là `int`, nó chỉ việc cộng — không cần kiểm "lỡ một con là bool thì sao". Type check đã loại khả năng đó.
- **Codegen (sinh mã máy)**: biết `x : int` → sinh lệnh cộng số nguyên trực tiếp (`ADD`), không chèn kiểm kiểu runtime → mã nhanh và gọn.

Đây là lý do ngôn ngữ static thường **chạy nhanh hơn** dynamic: công kiểm kiểu trả một lần lúc dịch, không lặp lại mỗi lần chạy.

### 7.2 Hindley-Milner — suy luận kiểu mạnh (sơ lược)

💡 **Trực giác**: §4 suy kiểu *bottom-up* khi mọi lá đã biết kiểu (literal). Nhưng nếu viết `let id = fun x -> x` (hàm trả lại chính đối số), `x` chưa biết kiểu gì? **Hindley-Milner (HM)** giải được: nó suy ra `id` có kiểu **đa hình** `∀a. a → a` ("với mọi kiểu `a`, nhận `a` trả `a`") — **không cần** lập trình viên ghi kiểu nào.

Cách HM làm (rất sơ lược):
1. Gán mỗi biểu thức chưa biết một **biến kiểu** (type variable) `t1, t2, …`.
2. Từ cách dùng, sinh các **ràng buộc (constraints)**: vd `x` dùng như số → `t1 = int`.
3. **Hợp nhất (unification)**: giải hệ ràng buộc tìm kiểu cụ thể nhất thỏa mọi ràng buộc.

HM là nền của hệ kiểu **ML, OCaml, Haskell, Rust** (phần lớn) — cho phép viết gần như không annotation mà vẫn static & strong. So với §4 (cần literal ở lá), HM mạnh hơn vì suy được kiểu cả khi đầu vào trừu tượng.

❓ **Câu hỏi tự nhiên**

- *"Go có Hindley-Milner không?"* — Không đầy đủ. Go có suy luận *cục bộ* (`x := 2+3` → `int`) nhưng không suy đa hình toàn cục như HM; generic của Go cần ghi ràng buộc tường minh hơn.
- *"Vì sao không phải ngôn ngữ nào cũng dùng HM nếu nó mạnh thế?"* — HM có giới hạn: thêm vài tính năng (subtyping, overloading tùy tiện) làm việc suy luận trở nên không quyết định được (undecidable) hoặc thông báo lỗi khó hiểu. Đánh đổi giữa sức mạnh suy luận và đơn giản.

📝 **Tóm tắt mục 7**

- Type check xong → interpreter/codegen **không kiểm lại kiểu** → đơn giản và nhanh hơn.
- Static nhanh hơn dynamic vì kiểm kiểu trả một lần lúc dịch.
- **Hindley-Milner** suy luận kiểu mạnh (kể cả đa hình `∀a. a→a`) qua type variable + constraints + unification; nền của ML/OCaml/Haskell/Rust.

---

## 8. Bài tập

**Bài 1.** Cho hệ kiểu chặt (Go-like) với 4 kiểu `int float bool string`. Mỗi biểu thức sau **đúng kiểu** hay **type error**? Nếu đúng, cho kiểu kết quả; nếu lỗi, chỉ ra node sai:
- (a) `3 + 4`
- (b) `"a" + "b"`
- (c) `3 + "b"`
- (d) `true && false`
- (e) `1 < 2`
- (f) `(1 < 2) + 3`

**Bài 2.** Vẽ AST của `(5 + 1) * (2 < 3)` rồi **typecheck bottom-up từng bước**. Có lỗi không? Tại node nào? (Viết rõ từng bước gán kiểu, cấm "tương tự".)

**Bài 3.** Với mỗi ngôn ngữ, điền **static/dynamic** và **strong/weak**, rồi nói `"7" + 3` cho gì:
- (a) Go
- (b) Python
- (c) JavaScript
- (d) Rust

**Bài 4.** Đoạn Python sau in ra gì, và **dòng nào** (nếu có) gây lỗi lúc chạy? Giải thích theo dynamic typing:
```python
x = 10
print("start")
x = "hello"
print(x)
y = x * 2
print(y)
z = x + 5
print(z)
```

**Bài 5.** (Bắt lỗi & gán kiểu) Cho symbol table `{ age: int, name: string, ok: bool }`. Typecheck từng biểu thức (bottom-up), gán kiểu hoặc báo lỗi tại node:
- (a) `age + 1`
- (b) `name + age`
- (c) `age < 18`
- (d) `ok && (age > 0)`
- (e) `name + " is fine"`

**Bài 6.** Với mỗi phép ép kiểu, nói **ngầm hay nên tường minh**, **mất dữ liệu hay không**:
- (a) `int 5 → float`
- (b) `float 3.99 → int`
- (c) `bool true → int` (C-style)
- (d) `int 65 → string` trong JS qua `65 + ""`

**Bài 7.** Viết phác thảo Go cho hàm `checkBinOp(op string, lt, rt Type) Type` xử lý 4 toán tử số học `+ - * /` (và riêng `+` cho string), trả `TError` khi không khớp. (Có thể tham khảo §5.)

**Bài 8.** (Khái niệm) Giải thích vì sao thông báo lỗi của `2 + true` nên chỉ vào **node `+`** chứ không vào `2` hay `true`. Liên hệ với cách visitor đệ quy ở §5.

---

## Lời giải chi tiết

### Bài 1

- (a) `3 + 4`: `3:int`, `4:int` → quy tắc cộng số `int×int → int`. **Đúng, kiểu `int`** (giá trị `7`).
- (b) `"a" + "b"`: `"a":string`, `"b":string` → quy tắc nối chuỗi `string×string → string`. **Đúng, kiểu `string`** (giá trị `"ab"`).
- (c) `3 + "b"`: `3:int`, `"b":string`. Không quy tắc `+` nào khớp `int×string` → **TYPE ERROR tại node `+`**.
- (d) `true && false`: `true:bool`, `false:bool` → quy tắc `&&` đòi `bool×bool → bool`. **Đúng, kiểu `bool`** (giá trị `false`).
- (e) `1 < 2`: `1:int`, `2:int` → so sánh `int×int → bool`. **Đúng, kiểu `bool`** (giá trị `true`).
- (f) `(1 < 2) + 3`: `(1<2):bool` (như (e)), `3:int`. Node `+` nhận `bool×int` → không quy tắc nào khớp → **TYPE ERROR tại node `+`**.

### Bài 2

Biểu thức `(5 + 1) * (2 < 3)`. AST:

```
          (*)               ← gốc: nhân
        /     \
      (+)      (<)
     /  \     /   \
    5    1   2     3
```

Typecheck bottom-up:

1. **Lá**: `5:int`, `1:int`, `2:int`, `3:int` (đều literal số nguyên).
2. **Node `(+)`** (con: `5`, `1`): cần `int×int`. Kiểm `int ∧ int` ✓ → `(5+1):int`.
3. **Node `(<)`** (con: `2`, `3`): so sánh cần `T×T → bool`. Kiểm `int ∧ int` ✓ → `(2<3):bool`.
4. **Node `(*)`** (gốc; con trái `(5+1):int`, con phải `(2<3):bool`): quy tắc nhân cần `int×int` (hoặc `float×float`). Kiểm: trái `int` ✓ nhưng phải `bool` ✗ → **không khớp**.

→ **TYPE ERROR tại node `(*)`** (gốc): không nhân được `int` với `bool`. Hai node con `(+)` và `(<)` đều hợp lệ; lỗi nằm ở chỗ **kết hợp** chúng bằng `*`.

### Bài 3

| Ngôn ngữ | Static/Dynamic | Strong/Weak | `"7" + 3` |
|---|---|---|---|
| (a) Go | Static | Strong | **lỗi biên dịch** (không cộng `string` với `int`) |
| (b) Python | Dynamic | Strong | **TypeError lúc chạy** (`can only concatenate str to str`) |
| (c) JavaScript | Dynamic | Weak | **`"73"`** (ép `3 → "3"` rồi nối) |
| (d) Rust | Static | Strong | **lỗi biên dịch** |

Điểm chốt: chỉ JS (weak) cho ra giá trị; ba ngôn ngữ strong còn lại đều **từ chối** — Go/Rust lúc dịch, Python lúc chạy.

### Bài 4

```python
x = 10
print("start")     # in: start
x = "hello"        # OK — biến đổi kiểu được (kiểu gắn với GIÁ TRỊ, không với biến)
print(x)           # in: hello
y = x * 2          # OK — string * int = lặp chuỗi -> "hellohello"
print(y)           # in: hellohello
z = x + 5          # 💥 LỖI tại dòng này: TypeError: can only concatenate str (not "int") to str
print(z)           # KHÔNG chạy tới (chương trình đã dừng ở dòng trên)
```

Output thực tế: `start`, `hello`, `hellohello`, rồi **TypeError tại `z = x + 5`**.

Giải thích dynamic typing: không có pha type-check lúc dịch, nên `x = "hello"` (đổi từ int sang string) hợp lệ. `x * 2` hợp lệ vì Python định nghĩa `str * int` = lặp chuỗi. Lỗi chỉ lộ ở `x + 5` vì `str + int` không có định nghĩa (Python **strong** → không ép ngầm), và chỉ lộ **lúc dòng đó chạy**, không sớm hơn.

### Bài 5

Symbol table `{ age: int, name: string, ok: bool }`. Tra bảng để lấy kiểu biến (Lesson 07), rồi áp quy tắc:

- (a) `age + 1`: `age:int` (tra bảng), `1:int` → cộng `int×int` ✓ → **`int`**.
- (b) `name + age`: `name:string`, `age:int` → node `+` nhận `string×int`, không quy tắc nào khớp → **TYPE ERROR tại node `+`**.
- (c) `age < 18`: `age:int`, `18:int` → so sánh `int×int → bool` ✓ → **`bool`**.
- (d) `ok && (age > 0)`: `ok:bool`; `(age>0)`: `age:int`,`0:int` → so sánh → `bool`. Node `&&` nhận `bool×bool` ✓ → **`bool`**.
- (e) `name + " is fine"`: `name:string`, `" is fine":string` → nối chuỗi `string×string → string` ✓ → **`string`**.

### Bài 6

- (a) `int 5 → float`: **ép ngầm thường được chấp nhận** (mở rộng). **Không mất dữ liệu** — `5` biểu diễn chính xác thành `5.0`.
- (b) `float 3.99 → int`: **nên tường minh** (nhiều ngôn ngữ chặn ép ngầm). **Mất dữ liệu** — cắt còn `3`, mất `0.99`.
- (c) `bool true → int` (C-style): ép **ngầm trong C** (`true→1`), nhưng ở Go/Python/Rust phải tường minh hoặc bị cấm. Không "mất dữ liệu" theo nghĩa số, nhưng **mờ nghĩa** (trộn logic với số học) → nên tường minh.
- (d) `int 65 → string` qua `65 + ""` trong JS: **ép ngầm** (weak). Không mất dữ liệu (`65 → "65"`) nhưng **khó đoán** — chỉ vì có `""` mà `+` đổi từ cộng số sang nối chuỗi; dễ gây bug. Nên dùng tường minh `String(65)`.

### Bài 7

```go
func checkBinOp(op string, lt, rt Type) Type {
    switch op {
    case "+":
        if lt == TInt && rt == TInt       { return TInt }
        if lt == TFloat && rt == TFloat   { return TFloat }
        if lt == TString && rt == TString { return TString } // riêng + có nối chuỗi
        report("toán tử + không áp được cho hai kiểu này")
        return TError
    case "-", "*", "/":
        if lt == TInt && rt == TInt     { return TInt }
        if lt == TFloat && rt == TFloat { return TFloat }
        report("toán tử " + op + " chỉ áp cho int×int hoặc float×float")
        return TError
    }
    report("toán tử lạ: " + op)
    return TError
}
```

Giải thích: `+` có thêm nhánh `string×string → string` (nối chuỗi) mà `- * /` không có. Mọi nhánh không khớp đều rơi xuống `report(...) + return TError`. Hàm này chính là phần lõi của `case *BinOp` ở §5, tách riêng cho gọn.

### Bài 8

Vì visitor (§5) đệ quy **vào con trước** (post-order). Khi xử node `2`, nó hợp lệ → trả `int` (không lỗi). Khi xử node `true`, hợp lệ → trả `bool` (không lỗi). Lỗi chỉ phát sinh ở node cha `+`, nơi checker **kết hợp** kiểu hai con (`int` và `bool`) và phát hiện không quy tắc nào khớp.

Về mặt người dùng: lỗi thực sự là "bạn đang cộng hai thứ không cộng được", và *vị trí* của hành động cộng là toán tử `+`. Chỉ vào `2` hay `true` sẽ gây hiểu lầm (mỗi cái tự nó đúng). Thông báo lỗi tốt phải trỏ đúng **node kết hợp** — đây là lý do compiler tốt báo lỗi tại toán tử kèm cả hai kiểu toán hạng (vd `invalid operation: 2 + true (mismatched types int and bool)`).

---

## Tham khảo và bài tiếp theo

- Bài trước: [Lesson 07 — Symbol Table & Scope](../lesson-02-symbol-table-scope/) — nơi type checker tra kiểu của biến.
- Tiền đề toán: [Boolean Logic](../../../DataFoundations/03-MathFoundations/lesson-02-boolean-logic/) (kiểu `bool`, điều kiện `if`), [Set Theory](../../../DataFoundations/03-MathFoundations/lesson-01-set-theory/) (kiểu = tập giá trị).
- **Bài tiếp theo**: [Lesson 09 — Tree-Walking Interpreter](../lesson-04-tree-walking-interpreter/) — sau khi type-check khẳng định AST hợp lệ, interpreter duyệt cây và **thực thi** mà không lo lỗi kiểu.
- Minh họa tương tác: [visualization.html](./visualization.html) — type checker bottom-up vẽ AST gán kiểu/tô đỏ lỗi, demo static vs dynamic, và coercion explorer đa ngôn ngữ.
</content>
</invoke>
