# Lesson 07 — Bảng ký hiệu & Phạm vi (Symbol Table & Scope)

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Hiểu **vì sao** compiler cần biết mỗi tên (biến/hàm) trỏ tới *cái gì*, đã khai báo *chưa*, và ở *đâu*.
- Biết **bảng ký hiệu (symbol table)** là gì: một ánh xạ `tên → thông tin` (kiểu, vị trí, scope), cài bằng hash map.
- Phân biệt **phạm vi (scope)**: global / local / block; **lexical scope (tĩnh)** vs **dynamic scope (động)**.
- Hiểu **chuỗi scope (scope chain)** và **bảng lồng nhau**: tra một tên đi từ scope trong ra ngoài — và **shadowing** (biến trong che biến ngoài).
- Phát hiện hai lỗi kinh điển khi duyệt AST: **undefined variable** (dùng trước khai báo) và **redeclaration** (khai báo trùng).
- Hiểu **name resolution**: gắn mỗi tham chiếu tên vào đúng entry của bảng ký hiệu.
- Thấy symbol table được dùng lại ở đâu: type checking, interpreter, codegen, và closures.

## Kiến thức tiền đề

- [Lesson 06 — AST & Visitor](../lesson-01-ast-visitor/) — symbol table được xây bằng cách **duyệt AST** với một visitor. Bài này giả định bạn đã biết AST là gì và mẫu visitor.
- [DataStructures — Hash Table](../../../DataStructures/01-Basic/lesson-06-hash-table/) — bảng ký hiệu *là* một hash table với key là chuỗi tên. Truy cập O(1) trung bình.
- [DataFoundations — Hashing Fundamentals](../../../DataFoundations/02-EncodingMemory/lesson-03-hashing-fundamentals/) — vì sao `hash("count")` cho ra cùng một index mỗi lần, và va chạm xử lý thế nào.

---

## 1. Vì sao cần bảng ký hiệu? — một câu hỏi cụ thể

Đọc đoạn mã sau (cú pháp giả, `{ }` mở một khối — block):

```
{
  x = 1;
  {
    x = 2;
    print x;
  }
  print x;
}
```

Câu hỏi: **mỗi `x` trỏ tới biến nào, và hai lệnh `print x` in ra gì?**

Câu trả lời (sẽ chứng minh từng bước ở §4):

- `print x` **bên trong** khối lồng → in **2** (biến `x` của khối trong).
- `print x` **bên ngoài** → in **1** (biến `x` của khối ngoài) — *nếu* khối trong khai báo một `x` **mới** che `x` ngoài.

Nhưng khoan — kết quả còn phụ thuộc một câu hỏi sâu hơn: `x = 2` ở khối trong là **khai báo biến mới** hay **gán đè lên biến `x` cũ** của khối ngoài? Đây chính là loại quyết định mà compiler **không thể đoán** — nó phải **tra cứu**: "ở vị trí này, tên `x` đã được khai báo ở scope nào chưa?".

> 💡 **Trực giác / Hình dung.** Hãy tưởng tượng một toà nhà văn phòng. Bạn gọi "anh Nam". Ở tầng của bạn có một "anh Nam" thì bạn gặp người đó. Tầng bạn không có thì bạn xuống tầng dưới hỏi, rồi tầng dưới nữa... cho tới sảnh chính (global). Compiler tra tên y hệt: tìm trong scope hiện tại trước, không có thì leo ra scope ngoài. **Bảng ký hiệu là "danh bạ từng tầng"; scope chain là "thứ tự đi từ tầng mình xuống sảnh".**

Compiler cần trả lời ba câu hỏi cho **mỗi** lần một tên xuất hiện:

1. **Tên này trỏ tới gì?** — biến `int` hay hàm? địa chỉ nào? hằng số nào?
2. **Đã khai báo chưa?** — nếu dùng `total` mà chưa khai báo → lỗi *undefined variable*.
3. **Ở đâu (scope nào)?** — `x` trong khối nào? cùng tên ở hai khối là *hai biến khác nhau*.

Không có một cấu trúc trả lời được ba câu này, compiler không thể type-check, không thể sinh mã (codegen không biết `x` nằm ở thanh ghi/ô nhớ nào), và interpreter không biết đọc/ghi giá trị ở đâu. Cấu trúc đó là **bảng ký hiệu**.

> ❓ **Câu hỏi tự nhiên của người đọc.**
> - *"Sao không lưu thẳng giá trị vào tên luôn?"* — Vì lúc **biên dịch** chưa có giá trị (giá trị chỉ có lúc chạy). Compile-time ta lưu *thông tin tĩnh*: kiểu, vị trí khai báo, scope. Giá trị runtime là việc của interpreter (Lesson 09).
> - *"Mỗi lần thấy tên lại tra từ đầu — có chậm không?"* — Tra là O(1) trung bình vì bảng là hash table (xem [Hash Table](../../../DataStructures/01-Basic/lesson-06-hash-table/)). Chuỗi scope sâu *k* tầng thì xấu nhất O(k), nhưng *k* thường rất nhỏ (2–5).

> 📝 **Tóm tắt mục 1.**
> - Compiler phải trả lời cho mỗi tên: *trỏ tới gì / khai báo chưa / ở scope nào*.
> - Nó không đoán được — phải **tra cứu** trong một cấu trúc.
> - Cấu trúc đó = **bảng ký hiệu**; cách tra qua nhiều tầng = **scope chain**.

---

## 2. Bảng ký hiệu là gì?

### 2.1. Định nghĩa (3 phần)

**(a) Là gì.** Bảng ký hiệu (symbol table) là một **ánh xạ từ tên (chuỗi) sang thông tin về tên đó** — gọi là một **entry** (hoặc *symbol*). Mỗi entry thường gồm: tên, kiểu, scope chứa nó, vị trí khai báo (dòng/cột), và đôi khi địa chỉ/offset bộ nhớ.

**(b) Vì sao tồn tại / vì sao cần.** Mã nguồn nhắc tới cùng một tên ở nhiều chỗ (`count` khai báo 1 lần, dùng 20 lần). Ta cần một nơi *tập trung* lưu "count là cái gì" để 20 lần dùng đó tra ra cùng một thông tin, thay vì mỗi lần lại quét lại cả file đi tìm chỗ khai báo (sẽ là O(n) mỗi lần dùng → O(n²) toàn chương trình). Bảng ký hiệu biến mỗi lần tra thành O(1).

**(c) Ví dụ trực giác bằng số.** Với khai báo `int count = 0;` ở dòng 3, bảng ký hiệu thêm một entry:

```
"count" → { type: int, scope: global, line: 3, offset: 0 }
```

Sau đó mọi lần thấy `count` (dòng 7, 12, 20...), compiler chỉ `lookup("count")` → nhận đúng record trên trong O(1), biết ngay nó là `int`, ở global.

### 2.2. Cài bằng hash map — liên hệ trực tiếp

Bảng ký hiệu **chính là một hash table** với key là chuỗi tên. Trong Go:

```go
// Một entry trong bảng ký hiệu
type Symbol struct {
    Name  string
    Type  string // "int", "bool", "func"...
    Scope string // "global", "block#2"...
    Line  int
}

// Bảng ký hiệu cho MỘT scope = map từ tên sang Symbol
type SymbolTable map[string]Symbol
```

Vì sao hash map? Vì thao tác chính là *"tên này có trong bảng không, nếu có thì lấy thông tin"* — đúng là **membership + lookup**, sở trường của hash table. `hash("count")` luôn cho cùng index → đi thẳng tới đúng slot mà không quét cả bảng (xem [Hashing Fundamentals](../../../DataFoundations/02-EncodingMemory/lesson-03-hashing-fundamentals/) để hiểu cơ chế băm và va chạm).

### 2.3. Bốn ví dụ entry cụ thể

Cho đoạn mã:

```
int   age   = 30;     // dòng 1
bool  ok    = true;   // dòng 2
func  add(a, b) {...} // dòng 3
int   age2;           // dòng 4  (chưa gán)
```

Bảng ký hiệu global sau khi duyệt xong:

| Key (tên) | type | scope | line | Ghi chú |
| --- | --- | --- | --- | --- |
| `"age"` | `int` | global | 1 | có giá trị khởi tạo |
| `"ok"` | `bool` | global | 2 | kiểu bool |
| `"add"` | `func(int,int)` | global | 3 | entry cho **hàm**, lưu signature |
| `"age2"` | `int` | global | 4 | khai báo nhưng chưa gán |

Bốn entry trên minh hoạ: entry không chỉ cho biến mà cả **hàm** (lưu kiểu tham số/trả về), và một tên có thể khai báo mà chưa khởi tạo.

> ⚠ **Lỗi thường gặp.** Đừng nhầm *bảng ký hiệu* với *biến môi trường runtime (environment)*. Bảng ký hiệu là **tĩnh** (compile-time): lưu *kiểu/vị trí*. Environment (Lesson 09) là **động** (run-time): lưu *giá trị hiện tại*. Cùng cấu trúc "tên → X" nhưng X khác bản chất. Lẫn lộn hai cái → bạn sẽ thắc mắc "sao bảng ký hiệu không có giá trị của `x`?".

> 🔁 **Dừng lại tự kiểm tra.** Có đoạn `int total; total = total + 1;`. Khi gặp `total` ở vế phải, compiler làm gì để biết `total` hợp lệ?
> <details><summary>Đáp án</summary>
> Gọi <code>lookup("total")</code> trên bảng ký hiệu. Vì dòng <code>int total;</code> đã thêm entry <code>"total" → {int, ...}</code>, lookup trả về thành công → hợp lệ, kiểu <code>int</code>. Nếu chưa từng khai báo, lookup trả "không tìm thấy" → báo lỗi <em>undefined variable</em>.
> </details>

> 📝 **Tóm tắt mục 2.**
> - Bảng ký hiệu = ánh xạ `tên → {type, scope, line, ...}`, mỗi mục là một **entry**.
> - Cài bằng **hash map** → lookup/insert O(1) trung bình.
> - Lưu cả biến lẫn hàm; lưu **thông tin tĩnh**, không phải giá trị runtime.

---

## 3. Phạm vi (Scope)

### 3.1. Định nghĩa (3 phần)

**(a) Là gì.** **Phạm vi (scope)** của một khai báo là **vùng mã nguồn mà tại đó tên ấy nhìn thấy được (visible) và tra ra được**. Ngoài vùng đó, tên "không tồn tại".

**(b) Vì sao tồn tại / vì sao cần.** Nếu mọi tên đều global, một chương trình lớn sẽ đụng tên loạn xạ (hai người cùng đặt `i` cho vòng lặp → ghi đè nhau). Scope cho phép **tái sử dụng tên** một cách an toàn: `i` trong hàm A và `i` trong hàm B là hai biến độc lập. Scope cũng giới hạn *thời gian sống* và *tầm với* của tên → mã dễ suy luận hơn.

**(c) Ví dụ trực giác bằng số.** Biến `i` khai báo trong vòng `for` chỉ "sống" bên trong vòng đó:

```
for (i = 0; i < 3; i = i + 1) { print i; }   // i nhìn thấy ở đây
print i;   // LỖI: i ngoài scope → undefined ở đây
```

Trong 3 vòng lặp, `lookup("i")` thành công; ngay sau `}`, `lookup("i")` thất bại.

### 3.2. Ba mức scope thường gặp

| Mức | Định nghĩa | Ví dụ |
| --- | --- | --- |
| **Global** | nhìn thấy ở mọi nơi trong file/chương trình | hằng số, hàm top-level |
| **Local (function)** | chỉ trong thân một hàm | tham số, biến cục bộ của hàm |
| **Block** | chỉ trong một cặp `{ }` | biến khai báo trong `if`, `for`, hoặc khối `{ }` lồng |

### 3.3. Lexical scope (tĩnh) vs Dynamic scope (động)

Đây là phần **dễ nhầm nhất**, nên xét kỹ.

**(a) Là gì.**
- **Lexical scope (phạm vi từ vựng / tĩnh — static scope)**: một tên được giải nghĩa theo **vị trí của nó trong văn bản mã nguồn**. Chỉ cần nhìn cấu trúc lồng `{ }` trong file là biết tên trỏ tới khai báo nào — không cần chạy chương trình.
- **Dynamic scope (phạm vi động)**: một tên được giải nghĩa theo **ai gọi tới hàm đang chạy** — tức theo **call stack lúc runtime**, không theo vị trí viết.

**(b) Vì sao cần biết phân biệt.** Hầu hết ngôn ngữ hiện đại (C, Go, Java, JavaScript, Python...) dùng **lexical scope** vì nó **đọc mã là hiểu được** ngay. Dynamic scope (Bash, Emacs Lisp cũ, một số DSL) khiến cùng một hàm cho kết quả khác nhau tuỳ nơi gọi → khó suy luận. Compiler bạn viết sẽ dùng lexical.

**(c) Ví dụ bằng số — cùng mã, hai kết quả khác nhau:**

```
x = 10;
func show() { print x; }   // 'x' này trỏ tới đâu?
func test() {
  x = 99;                  // một 'x' cục bộ trong test
  show();
}
test();
```

- **Lexical scope**: `show` viết ở scope global, nơi đó `x = 10`. → `show` luôn in **10**, bất kể ai gọi. (`x = 99` trong `test` là biến *khác*, `show` không thấy.)
- **Dynamic scope**: `show` được gọi *từ trong* `test`, nơi `x = 99` đang "sống" trên stack → `show` in **99**.

→ Cùng một dòng `print x`, lexical cho **10**, dynamic cho **99**. Khác biệt này là lý do dynamic scope nguy hiểm.

### 3.4. Bốn ví dụ xác định scope

Cho:

```
g = 1;                 // (A) global
func f(p) {            // (B) p: local của f
  t = 2;               // (C) t: local của f
  { u = 3; }           // (D) u: block bên trong f
}
```

| Tên | Scope | Tra được ở đâu |
| --- | --- | --- |
| `g` (A) | global | mọi nơi |
| `p` (B) | local của `f` | toàn thân `f` (cả block `{ }` lồng) |
| `t` (C) | local của `f` | từ dòng khai báo tới hết `f` |
| `u` (D) | block `{ }` | chỉ trong cặp `{ }` đó; ra ngoài → undefined |

> ⚠ **Lỗi thường gặp (lexical vs dynamic).** Người mới hay nghĩ "biến `x` mà hàm thấy là biến `x` *gần nhất đang có giá trị*". Sai — đó là tư duy **dynamic**. Trong ngôn ngữ **lexical** (đa số), hàm chỉ thấy các biến **bao quanh nó *trong văn bản***, không phải biến của hàm gọi nó. Cứ nhìn *nơi hàm được viết*, không phải *nơi hàm được gọi*.

> 🔁 **Dừng lại tự kiểm tra.** Trong ví dụ §3.3, nếu thêm `print x;` *ngay sau* `func show()` (ở global), nó in gì với lexical scope?
> <details><summary>Đáp án</summary>
> In <strong>10</strong>. Ở scope global chỉ có <code>x = 10</code>; biến <code>x = 99</code> nằm trong <code>test</code>, không bao quanh điểm <code>print</code> này về mặt văn bản → không nhìn thấy.
> </details>

> 📝 **Tóm tắt mục 3.**
> - Scope = vùng mã mà tên nhìn thấy được. Ba mức: global / local / block.
> - **Lexical (tĩnh)**: giải nghĩa theo *vị trí viết* — đa số ngôn ngữ. Đọc mã là biết.
> - **Dynamic (động)**: giải nghĩa theo *call stack lúc chạy* — hiếm, khó suy luận.

---

## 4. Chuỗi scope (Scope Chain) & bảng lồng nhau

### 4.1. Ý tưởng: mỗi scope một bảng nhỏ, xâu thành chuỗi

Thay vì một bảng khổng lồ, ta dùng **một bảng ký hiệu cho mỗi scope**, và mỗi bảng giữ một con trỏ tới **bảng cha** (scope bao ngoài). Cấu trúc này gọi là **chuỗi scope (scope chain)** hay **bảng lồng nhau (nested tables)**.

```go
type Scope struct {
    symbols map[string]Symbol // bảng của riêng scope này
    parent  *Scope            // scope bao ngoài (nil nếu là global)
}

// Tra một tên: thử scope hiện tại, không có thì leo lên cha
func (s *Scope) Lookup(name string) (Symbol, bool) {
    for cur := s; cur != nil; cur = cur.parent {
        if sym, ok := cur.symbols[name]; ok {
            return sym, true // tìm thấy ở tầng này → dừng
        }
    }
    return Symbol{}, false // leo tới global vẫn không có → undefined
}
```

- **Vào một khối** `{` → `push`: tạo `Scope` mới, `parent` trỏ về scope đang đứng.
- **Ra khỏi khối** `}` → `pop`: quay về `parent`, bảng của khối vừa rời bị bỏ.
- **Tra tên** → đi từ scope trong ra ngoài, dừng ở lần khớp **đầu tiên**.

**Shadowing (che bóng)**: nếu một scope trong khai báo tên trùng với scope ngoài, lần tra dừng ở scope trong → biến ngoài bị **che** (vẫn tồn tại, chỉ là "không với tới" trong vùng bị che).

### 4.2. Walk-through ĐẦY ĐỦ: `{ x=1; { x=2; y=x } }`

Giả định: dùng từ khoá `let` để **khai báo mới** (`let x` tạo `x` ở scope hiện tại), còn `x = ...` không có `let` là **gán** vào `x` đã tra được. Đoạn mã viết rõ:

```
{               // S0: scope ngoài
  let x = 1;
  {             // S1: scope trong (parent = S0)
    let x = 2;
    let y = x;
  }
}
```

Theo dõi **ngăn xếp scope** (đỉnh bên phải) và **bảng từng scope** qua từng bước:

| # | Lệnh | Hành động | Ngăn xếp scope | Bảng các scope |
| --- | --- | --- | --- | --- |
| 1 | `{` (mở S0) | push S0 | `[S0]` | S0: `{}` |
| 2 | `let x = 1` | khai báo `x` trong S0 | `[S0]` | S0: `{x→1}` |
| 3 | `{` (mở S1) | push S1, parent=S0 | `[S0, S1]` | S0: `{x→1}` · S1: `{}` |
| 4 | `let x = 2` | khai báo `x` trong S1 (che `x` của S0) | `[S0, S1]` | S0: `{x→1}` · S1: `{x→2}` |
| 5 | `let y = x` — **tra `x`** | lookup từ S1: S1 có `x`→**2** (dừng!) | `[S0, S1]` | S0: `{x→1}` · S1: `{x→2, y→2}` |
| 6 | `}` (đóng S1) | pop S1 | `[S0]` | S0: `{x→1}` (S1 bị bỏ) |
| 7 | `}` (đóng S0) | pop S0 | `[]` | — |

**Điểm mấu chốt ở bước 5 — tra `x`:**

1. Đang ở S1 (đỉnh stack). Gọi `Lookup("x")`.
2. Xét **S1 trước**: `S1.symbols["x"]` tồn tại → giá trị **2**. Dừng ngay, **không** leo lên S0.
3. Vậy `y = x` gán `y = 2`. → `S1: {x→2, y→2}`.

Nếu bước 4 **không** có `let x = 2` (tức S1 không khai báo `x`), thì bước 5 tra `x` sẽ: xét S1 → không có → leo lên S0 → S0 có `x`→**1** → `y = 1`. Đây là khác biệt do **shadowing**.

### 4.3. Tra cứu `x` tại từng điểm (đối chiếu shadowing)

Lấy đoạn dài hơn để thấy `x` "đổi nghĩa" theo vị trí:

```
{ let x = 1;          // điểm P1
  { let x = 2;        // điểm P2
    print x;          // điểm P3
  }
  print x;            // điểm P4
}
```

| Điểm | Đang ở scope | `lookup("x")` đi qua | Kết quả | Vì sao |
| --- | --- | --- | --- | --- |
| P1 | S0 | S0 có `x` | `x = 1` | mới khai báo ở S0 |
| P3 | S1 | S1 có `x` (dừng) | `x = 2` | S1 che `x` của S0 |
| P4 | S0 (đã pop S1) | S0 có `x` | `x = 1` | S1 đã bỏ; `x` của S0 lộ lại |

→ Đây chính là lời giải cho câu hỏi mở bài ở §1: `print` trong khối in **2**, `print` ngoài in **1**.

> ❓ **Câu hỏi tự nhiên của người đọc.**
> - *"Pop S1 thì biến `y` của S1 đi đâu?"* — Bị bỏ cùng bảng S1. Sau `}`, `lookup("y")` thất bại → `y` đã ngoài scope.
> - *"Tra ngược từ ngoài vào trong được không?"* — Không. Luôn từ **trong ra ngoài**. Ngược lại sẽ luôn tìm biến global trước, phá vỡ shadowing và ý nghĩa của block.
> - *"Hai khối *song song* (không lồng nhau) có thấy biến của nhau không?"* — Không. Mỗi khối có parent là scope chung bao ngoài, nhưng không phải parent của nhau → biến của khối này vô hình với khối kia.

> ⚠ **Lỗi thường gặp (shadowing nhầm).** Tưởng `let x = 2` ở khối trong *thay đổi* `x` của khối ngoài. Không — nó tạo một `x` **mới, khác**. Khối ngoài vẫn giữ `x = 1`. Shadowing chỉ *che tạm thời* trong vùng lồng; ra khỏi vùng, biến ngoài nguyên vẹn. (Muốn *sửa* biến ngoài thì dùng `x = 2` **không** `let` — gán vào biến tra được, không khai báo mới.)

> 🔁 **Dừng lại tự kiểm tra.** Với `{ let a=5; { let b=a; let a=9; print a; print b; } }`, hai lệnh print in gì?
> <details><summary>Đáp án</summary>
> <code>let b = a</code>: lúc này khối trong <em>chưa</em> khai báo <code>a</code> riêng → lookup leo lên ngoài → <code>a = 5</code> → <code>b = 5</code>. Ngay sau đó <code>let a = 9</code> tạo <code>a</code> mới che ngoài. <code>print a</code> → <strong>9</strong> (a của khối trong). <code>print b</code> → <strong>5</strong> (b đã chốt giá trị 5). Thứ tự khai báo trong cùng khối có ý nghĩa!
> </details>

> 📝 **Tóm tắt mục 4.**
> - Mỗi scope một bảng nhỏ; mỗi bảng trỏ về **parent** → thành **chuỗi scope**.
> - Vào khối = **push**, ra khối = **pop**. Tra tên = đi **trong → ngoài**, dừng ở khớp đầu tiên.
> - **Shadowing** = biến trong che biến ngoài *tạm thời*; không xoá, không sửa biến ngoài.

---

## 5. Khai báo vs Sử dụng — phát hiện lỗi khi duyệt AST

### 5.1. Hai loại lỗi kinh điển

**(a) Undefined variable (dùng trước/không khai báo).**

```
print total;   // LỖI: 'total' chưa từng khai báo
```

Phát hiện: tại nút *sử dụng tên*, gọi `Lookup(name)`. Trả về *không tìm thấy* (leo tới global vẫn không có) → báo `undefined variable: total`.

**(b) Redeclaration (khai báo trùng trong cùng scope).**

```
{
  let x = 1;
  let x = 2;   // LỖI (ở nhiều ngôn ngữ): 'x' đã khai báo trong scope này
}
```

Phát hiện: tại nút *khai báo*, kiểm tra `name` **đã có trong bảng của scope hiện tại chưa** (chỉ scope hiện tại, **không** leo lên — vì khai báo trùng ở scope *ngoài* lại là shadowing hợp lệ). Có rồi → báo `redeclaration of x`.

> ⚠ **Lỗi thường gặp (undefined do thứ tự).** `let a = b; let b = 3;` báo *undefined `b`* vì lúc tra `b` ở dòng 1, nó **chưa được khai báo**. Khai báo sau không "cứu" được lần dùng trước (với ngôn ngữ duyệt tuyến tính). Đừng nhầm với hàm — nhiều ngôn ngữ cho gọi hàm khai báo sau nhờ một lượt quét *hoisting* riêng.

### 5.2. Dùng visitor (Lesson 06) để quét

Một **resolution pass** là một visitor duyệt AST. Hai loại nút quan trọng:

```go
// Vào một BlockNode → push scope; ra → pop scope
func (r *Resolver) VisitBlock(b *BlockNode) {
    r.scope = NewScope(r.scope) // push: parent = scope hiện tại
    for _, stmt := range b.Stmts {
        r.Visit(stmt)
    }
    r.scope = r.scope.parent    // pop
}

// Nút khai báo: kiểm tra redeclaration rồi thêm vào scope hiện tại
func (r *Resolver) VisitLetDecl(d *LetNode) {
    if _, dup := r.scope.symbols[d.Name]; dup { // CHỈ scope hiện tại
        r.error("redeclaration of %s", d.Name)
    }
    r.Visit(d.Init) // resolve biểu thức khởi tạo TRƯỚC khi thêm tên
    r.scope.symbols[d.Name] = Symbol{Name: d.Name, Line: d.Line}
}

// Nút sử dụng tên: phải lookup được, nếu không → undefined
func (r *Resolver) VisitVarRef(v *VarRefNode) {
    if _, ok := r.scope.Lookup(v.Name); !ok {
        r.error("undefined variable: %s", v.Name)
    }
}
```

> ❓ **Câu hỏi tự nhiên của người đọc.** *"Vì sao `Visit(d.Init)` chạy TRƯỚC khi thêm tên vào bảng?"* — Để `let x = x + 1` được giải nghĩa đúng: vế phải `x` phải tra ra `x` *cũ* (ngoài, nếu có), chứ không phải `x` đang khai báo. Thêm tên trước thì `x + 1` sẽ tự trỏ vào chính nó — sai.

> 📝 **Tóm tắt mục 5.**
> - **Undefined**: tại nút *sử dụng*, `Lookup` thất bại.
> - **Redeclaration**: tại nút *khai báo*, tên đã có **trong scope hiện tại** (không leo lên).
> - Cài bằng một **visitor**: block → push/pop; decl → check + add; ref → lookup.

---

## 6. Name Resolution — gắn mỗi tham chiếu vào đúng entry

> 💡 **Trực giác.** Tra cứu (`Lookup`) trả lời "tên này hợp lệ không". **Resolution** đi xa hơn: *ghi nhớ* mỗi lần dùng tên trỏ tới **chính xác entry nào**, để các pass sau (typecheck, codegen) không phải tra lại. Như đánh dấu sẵn "anh Nam mà bạn nói là anh Nam phòng 305" lên tờ giấy, để lần sau khỏi hỏi lại lễ tân.

**(a) Là gì.** **Name resolution** là một lượt (pass) đi qua AST, với mỗi nút *tham chiếu tên* (`VarRefNode`), tra ra entry tương ứng và **gắn liên kết** từ nút đó tới entry (vd lưu con trỏ `v.Resolved = sym`, hoặc lưu "biến này ở scope cách đây 2 tầng, slot số 0").

**(b) Vì sao cần.** Sau resolution, các pha sau làm việc với *liên kết trực tiếp* thay vì tên chuỗi: typecheck đọc kiểu từ entry, codegen biết offset bộ nhớ/slot. Không phải tra hash mỗi lần nữa → nhanh và không mơ hồ.

**(c) Ví dụ bằng số.** Với đoạn `{ let x=1; { let x=2; print x; } print x; }`:

- `print x` **trong** → resolve tới entry `x@S1` (giá trị 2 lúc chạy).
- `print x` **ngoài** → resolve tới entry `x@S0` (giá trị 1).

Hai nút `VarRef` *cùng tên `x`* được gắn vào **hai entry khác nhau**. Sau bước này, từ "x" thuần văn bản đã trở thành "x cụ thể nào".

### 6.1. Biến toàn cục vs cục bộ — và lifetime (sơ lược)

- **Biến toàn cục (global)**: entry ở scope global; **lifetime** = toàn bộ thời gian chạy chương trình; codegen thường cấp một ô nhớ tĩnh cố định.
- **Biến cục bộ (local)**: entry ở scope hàm/block; lifetime = từ lúc vào scope tới lúc ra; codegen thường cấp trên **stack frame**, giải phóng khi `pop`.

→ Resolution không chỉ trả lời "ở đâu" mà còn ngầm quyết định "sống bao lâu / cấp phát thế nào" — input trực tiếp cho codegen.

> 📝 **Tóm tắt mục 6.**
> - Resolution = *gắn* mỗi `VarRef` vào đúng **entry**, không chỉ kiểm tra hợp lệ.
> - Hai lần dùng cùng tên có thể trỏ hai entry khác nhau (do shadowing).
> - Global ↔ lifetime toàn chương trình; local ↔ lifetime theo scope (stack).

---

## 7. Symbol table được dùng lại ở đâu?

Bảng ký hiệu + scope không phải tự thân là đích — nó là **nền** cho gần như mọi pha sau:

- **Type checking (Lesson 08)**: để kiểm tra `a + b` hợp lệ, typecheck `Lookup("a")`, `Lookup("b")` lấy kiểu từ entry rồi xét quy tắc cộng. → [Type Checking](../lesson-03-type-checking/).
- **Interpreter — environment (Lesson 09)**: lúc *chạy*, một cấu trúc *song song* với scope chain (gọi là **environment**) lưu **giá trị** thay vì kiểu. Cùng cơ chế push/pop/lookup, khác nội dung. → Lesson 09.
- **Codegen**: dùng entry để biết biến nằm ở thanh ghi/offset stack nào mà sinh lệnh `load`/`store`.
- **Closures (Lesson 10)**: một hàm "bắt" (capture) các biến của scope bao ngoài nó *theo lexical scope* và giữ chúng sống *sau khi* scope ngoài đã pop. Closure chính là **mở rộng của scope chain** — hàm mang theo con trỏ tới chuỗi scope nơi nó được định nghĩa. → Lesson 10.

> 📝 **Tóm tắt mục 7.** Một symbol table + scope chain được tái sử dụng xuyên suốt: typecheck (kiểu), interpreter (giá trị), codegen (vị trí), closure (giữ scope sống). Học chắc bài này là chìa khoá cho 3–4 bài sau.

---

## 8. Bài tập

**Bài 1.** Cho đoạn:
```
{ let a = 1;
  { let b = 2;
    print a; print b;
  }
  print a; print b;
}
```
Liệt kê 4 lệnh `print` in gì, hoặc báo lỗi gì. Giải thích bằng scope chain.

**Bài 2.** Cho:
```
let x = 10;
func show() { print x; }
func test() { let x = 99; show(); }
test();
```
`show()` in gì với **lexical scope**? Với **dynamic scope**? Giải thích.

**Bài 3.** (Tự tra cứu scope) Xây ngăn xếp scope và bảng từng scope (như bảng §4.2) cho đoạn:
```
{ let p = 1;
  { let q = p;
    { let p = 5; let r = p; }
    let s = p;
  }
}
```
Cho biết `q`, `r`, `s` bằng bao nhiêu. Chỉ rõ ở mỗi lần tra `p`, lookup dừng ở scope nào.

**Bài 4.** Đoạn nào dưới đây gây lỗi, loại lỗi gì (undefined / redeclaration)? Sửa tối thiểu để hết lỗi.
```
(a) { let x = 1; let x = 2; }
(b) { let y = z; let z = 3; }
(c) { let m = 1; { let m = 2; } let n = m; }
```

**Bài 5.** Viết (bằng pseudocode hoặc Go) hàm `Lookup(scope, name)` cho scope chain, và `Declare(scope, name)` có kiểm tra redeclaration. Nêu độ phức tạp của `Lookup` theo độ sâu lồng *k*.

**Bài 6.** Vì sao trong `VisitLetDecl` ta `Visit(d.Init)` **trước** khi thêm tên vào bảng? Đưa một đoạn mã mà nếu làm ngược lại sẽ cho kết quả sai, và chỉ ra sai ở đâu.

**Bài 7.** (Resolution) Cho `{ let x=1; { let x=2; print x; } print x; }`. Vẽ AST tối giản cho hai nút `print x`, và chỉ rõ mỗi nút resolve tới entry nào (đặt tên `x@S0`, `x@S1`). Vì sao hai nút cùng tên lại trỏ hai entry khác nhau?

---

## Lời giải chi tiết

### Bài 1

Scope ngoài S0 có `a=1`; scope trong S1 (parent S0) có `b=2`.

- `print a` (trong S1): tra `a` → S1 không có → leo S0 → `a=1`. In **1**.
- `print b` (trong S1): S1 có `b=2`. In **2**.
- `print a` (ngoài, S0): S0 có `a=1`. In **1**.
- `print b` (ngoài, S0): S1 đã **pop**, `b` không còn → `Lookup("b")` thất bại → **LỖI: undefined variable `b`**.

Bài học: `b` chỉ sống trong S1; ra khỏi `}` là biến mất.

### Bài 2

- **Lexical**: `show` được *viết* ở global, nơi `x = 10`. Lookup của `print x` trong `show` leo tới scope bao quanh *văn bản* của `show` = global → `x=10`. In **10**. Biến `x=99` nằm trong `test`, không bao quanh `show` về văn bản → vô hình.
- **Dynamic**: `show` được *gọi* từ `test`, nơi `x=99` đang trên stack. Lookup theo call stack → gặp `x=99` của `test` trước → in **99**.

Cùng dòng `print x`, hai mô hình cho 10 vs 99 — minh hoạ vì sao đa số ngôn ngữ chọn lexical (đoán được khi đọc mã).

### Bài 3

Ngăn xếp & bảng (S0 ⊃ S1 ⊃ S2):

| # | Lệnh | Hành động | Stack | Bảng |
| --- | --- | --- | --- | --- |
| 1 | `let p=1` | decl p@S0 | `[S0]` | S0:`{p→1}` |
| 2 | `{` | push S1 | `[S0,S1]` | S1:`{}` |
| 3 | `let q=p` — tra `p` | S1 ko có → S0 `p=1` | `[S0,S1]` | S1:`{q→1}` |
| 4 | `{` | push S2 | `[S0,S1,S2]` | S2:`{}` |
| 5 | `let p=5` | decl p@S2 (che) | `[S0,S1,S2]` | S2:`{p→5}` |
| 6 | `let r=p` — tra `p` | S2 có `p=5` (dừng) | `[S0,S1,S2]` | S2:`{p→5,r→5}` |
| 7 | `}` | pop S2 | `[S0,S1]` | S2 bỏ |
| 8 | `let s=p` — tra `p` | S1 ko có → S0 `p=1` | `[S0,S1]` | S1:`{q→1,s→1}` |

Kết quả: **`q = 1`** (tra dừng ở S0), **`r = 5`** (tra dừng ở S2 do shadowing), **`s = 1`** (S2 đã pop nên `p=5` biến mất, tra leo về S0).

### Bài 4

- **(a)** `let x=2` sau `let x=1` trong **cùng** scope → **redeclaration of `x`**. Sửa: bỏ `let` ở dòng 2 (`x = 2;` thành gán) *hoặc* đổi tên (`let x2 = 2;`).
- **(b)** `let y = z` dùng `z` trước khi `z` khai báo → **undefined variable `z`**. Sửa: đảo thứ tự — khai báo `let z = 3;` trước, rồi `let y = z;`.
- **(c)** **Không lỗi.** `let m=2` ở khối trong là **shadowing hợp lệ** (scope khác). `let n=m` ở khối ngoài tra `m` → khối trong đã pop → dùng `m=1` của ngoài → `n=1`. Hợp lệ.

### Bài 5

```go
func Lookup(s *Scope, name string) (Symbol, bool) {
    for cur := s; cur != nil; cur = cur.parent {
        if sym, ok := cur.symbols[name]; ok {
            return sym, true
        }
    }
    return Symbol{}, false
}

func Declare(s *Scope, name string, line int) error {
    if _, dup := s.symbols[name]; dup { // CHỈ scope hiện tại
        return fmt.Errorf("redeclaration of %s", name)
    }
    s.symbols[name] = Symbol{Name: name, Line: line}
    return nil
}
```

Độ phức tạp `Lookup`: mỗi tầng là một tra hash O(1) trung bình; leo tối đa *k* tầng (độ sâu lồng) → **O(k)** trung bình, **O(1)** khi tên ở scope hiện tại. Vì *k* nhỏ (2–5 điển hình), thực tế gần O(1). `Declare`: một tra + một ghi → **O(1)** trung bình.

### Bài 6

`Visit(d.Init)` trước để vế phải tra ra biến *cũ*, không phải biến đang khai báo.

Đoạn phản chứng:
```
let x = 5;
{ let x = x + 1; }   // ý đồ: x mới = (x ngoài) + 1 = 6
```
- **Đúng (resolve Init trước)**: tra `x` ở `x+1` → khối trong *chưa* có `x` → leo ra ngoài → `x=5` → `x` mới = **6**. ✓
- **Sai (thêm tên trước rồi resolve Init)**: đã có `x` ở khối trong (chưa khởi tạo / giá trị rác) → `x+1` tự trỏ vào chính nó → kết quả là `rác + 1`, hoặc lỗi "dùng biến chưa khởi tạo". ✗

Sai ở chỗ: thêm tên sớm khiến `x` ở vế phải bị resolve nhầm vào entry đang khai báo thay vì entry bao ngoài.

### Bài 7

AST tối giản (mỗi `print x` là một `VarRefNode` con của một `PrintNode`):

```
PrintNode(in)  → VarRef("x")   ──resolve──▶  x@S1   (entry x của scope trong)
PrintNode(ngoài) → VarRef("x") ──resolve──▶  x@S0   (entry x của scope ngoài)
```

Hai nút *cùng tên `x`* trỏ **hai entry khác nhau** vì resolution chạy *tại vị trí* mỗi nút trong scope chain: nút trong đứng ở S1, lookup dừng ngay ở `x@S1` (giá trị 2); nút ngoài đứng ở S0 (S1 đã pop), lookup ra `x@S0` (giá trị 1). Tên chỉ là chuỗi; *vị trí* mới quyết định entry. Đây là bản chất của shadowing nhìn từ góc resolution.

---

## Tham khảo và bài tiếp theo

- Bài trước: [Lesson 06 — AST & Visitor](../lesson-01-ast-visitor/) — nền tảng để duyệt cây dựng bảng ký hiệu.
- Liên hệ cấu trúc dữ liệu:
  - [Hash Table](../../../DataStructures/01-Basic/lesson-06-hash-table/) — bảng ký hiệu *là* hash table.
  - [Hashing Fundamentals](../../../DataFoundations/02-EncodingMemory/lesson-03-hashing-fundamentals/) — cơ chế băm & va chạm bên dưới.
- Bài tiếp theo: [Lesson 08 — Type Checking](../lesson-03-type-checking/) — dùng bảng ký hiệu để kiểm tra kiểu.
- Xa hơn: interpreter & environment (Lesson 09), closures như mở rộng scope chain (Lesson 10).
- Minh hoạ tương tác: [visualization.html](./visualization.html) — Scope Visualizer (chạy từng dòng, push/pop, tra biến), Shadowing demo, và Error detector (undefined / redeclaration).
