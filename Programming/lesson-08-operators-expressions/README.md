# Lesson 08 — Toán tử & Biểu thức trong Go

> Tier 1 — Go Basic · Lesson 8/12 · Tiền đề: [L07 — Biến & Kiểu](../lesson-07-variables-types/) (cần biết `int`, `int64`, `float64`, `string`, `bool` là gì và ép kiểu hoạt động ra sao).

## Mục tiêu học tập

Sau bài này bạn sẽ:

1. Phân biệt được `/` (division) trên `int` và `float64`, biết `7/2` ra `3` chứ không phải `3.5`.
2. Đọc và viết được biểu thức bitwise (`& | ^ &^ << >>`) — bao gồm `&^` đặc trưng Go.
3. Hiểu Go có precedence chỉ **5 mức**, ít hơn C (~14 mức) → ít gây nhầm nhưng phải biết.
4. Tránh được lỗi compile do **type strictness** — `int + int64` Go không tự convert.
5. Biết khi nào biểu thức bị **integer overflow** và vì sao đây là lỗ hổng bảo mật trong fintech.
6. So sánh float đúng cách (`math.Abs(a-b) < eps`), không bao giờ dùng `==` thẳng cho `float64`.

## Bài này nói cái gì, vì sao nó đáng học?

> 💡 **Trực giác.** Toán tử là *cách lắp ghép giá trị thành biểu thức*. Cùng một dấu `+`, nhưng nó hoạt động khác nhau cho `int`, `float`, `string`. Cùng một dấu `/`, nhưng `7/2` ra `3` (int) hoặc `3.5` (float). Cùng một dấu `&`, có khi là logic-AND (`&&`), có khi là bitwise-AND (`&`). Lesson này dạy bạn **đọc đúng nghĩa của từng toán tử**, và những cái bẫy phổ biến nhất.

Bạn sẽ thấy 4 bẫy lớn:

- **Bẫy 1**: `7 / 2 = 3` — integer division.
- **Bẫy 2**: `var a int; var b int64; a + b` không compile được.
- **Bẫy 3**: `0.1 + 0.2 != 0.3` — float không phải số thực toán học.
- **Bẫy 4**: `x++` không phải expression, không thể `a = x++`.

Bốn cái này là nguồn gốc của ~70% bug arithmetic trong Go ngắn dài.

---

## 1. Toán tử số học `+ - * / %`

> 💡 **Hình dung**. Năm phép tính cơ bản của lớp 5, nhưng có 2 chỗ Go xử lý khác kỳ vọng: `/` với `int` cho integer division, và `%` chỉ áp dụng cho integer (không có `5.5 % 2.0` trong Go).

### 1.1 Bảng nhanh

| Toán tử | Tên | Áp dụng cho | Ví dụ |
|---|---|---|---|
| `+` | cộng | int, float, string (concat) | `3 + 4 = 7`, `"a" + "b" = "ab"` |
| `-` | trừ | int, float | `10 - 3 = 7` |
| `*` | nhân | int, float | `4 * 5 = 20` |
| `/` | chia | int (integer div), float (true div) | `7 / 2 = 3`, `7.0 / 2.0 = 3.5` |
| `%` | chia lấy dư | **CHỈ int** | `7 % 2 = 1` |

### 1.2 Sáu ví dụ số cụ thể

```go
// Ví dụ 1: int division — phần thập phân bị cắt
fmt.Println(7 / 2)        // 3   (KHÔNG phải 3.5)
fmt.Println(15 / 4)       // 3   (KHÔNG phải 3.75)

// Ví dụ 2: float division — kết quả thật
fmt.Println(7.0 / 2.0)    // 3.5
fmt.Println(15.0 / 4.0)   // 3.75

// Ví dụ 3: int division với số âm — Go cắt VỀ PHÍA 0 (truncate)
fmt.Println(-7 / 2)       // -3  (KHÔNG phải -4 như floor div của Python)
fmt.Println(-15 / 4)      // -3

// Ví dụ 4: modulo
fmt.Println(7 % 2)        // 1
fmt.Println(-7 % 2)       // -1  (dấu của kết quả = dấu của dividend)

// Ví dụ 5: modulo trên float → COMPILE ERROR
// fmt.Println(5.5 % 2.0)  // invalid operation: operator % not defined for floats

// Ví dụ 6: string concat
fmt.Println("Hello, " + "World")  // Hello, World
```

> ⚠ **Lỗi thường gặp.** Code `avg := (a + b) / 2` với `a, b` là `int` cho kết quả **integer**. Vd `a=3, b=4` → `avg = 3` (không phải `3.5`). Để lấy `3.5` phải convert: `avg := float64(a+b) / 2.0`.

> ❓ **Tại sao Go làm vậy?** Vì Go giữ kiểu của operand. `int / int = int`, đó là nhất quán. Nếu Go tự lên `float64`, bạn sẽ thấy `a / b` trả về kiểu khác nhau tuỳ giá trị → không type-safe.

### 1.3 Khi nào dùng `%`?

`%` siêu hữu ích cho 3 việc thực tế:

- **Kiểm tra chẵn lẻ**: `n % 2 == 0`.
- **Kiểm tra chia hết**: `n % 7 == 0` (chia hết cho 7).
- **Wrap-around (vòng tròn)**: `(i + 1) % len(arr)` — đi tới phần tử kế, vòng về đầu khi đến cuối. Pattern này dùng trong ring buffer, ván cờ vòng, round-robin scheduler.

### 1.4 Walk-through số cụ thể với wrap-around

```
arr = [A, B, C, D]   len = 4
i=0  → (0+1)%4 = 1   → B
i=1  → (1+1)%4 = 2   → C
i=2  → (2+1)%4 = 3   → D
i=3  → (3+1)%4 = 0   → A   ← quay về đầu
```

> 🔁 **Tự kiểm tra.** `(-7) % 2` trong Go bằng bao nhiêu? Còn `-7 / 2`?

<details>
<summary>Đáp án</summary>

`-7 % 2 = -1` (dấu theo dividend `-7`).  
`-7 / 2 = -3` (truncate về 0, không phải về `-∞`). Python sẽ cho `-7 // 2 = -4`; Go khác Python ở đây.
</details>

> 📝 **Tóm tắt mục 1.** `/` của int là integer division; `%` chỉ cho int; số âm chia int truncate về 0 chứ không floor. Concat string dùng `+`.

---

## 2. Toán tử so sánh `== != < > <= >=`

Trả về **`bool`**. Quy tắc cứng: chỉ so sánh **cùng kiểu**.

### 2.1 Bảng

```go
3 == 3      // true
3 != 4      // true
3 < 4       // true
"abc" < "abd"  // true   (lexicographic, mục 13)
"abc" == "abc" // true   (byte-by-byte)
```

### 2.2 Cùng kiểu — nghiêm ngặt tuyệt đối

```go
var a int = 1
var b int64 = 1
// a == b   // COMPILE ERROR: mismatched types int and int64

// Phải convert
a == int(b)         // OK, true
int64(a) == b       // OK, true
```

> ⚠ **Lỗi thường gặp.** `len(slice) == int64Var` — `len()` trả `int`, không so sánh trực tiếp với `int64`. Convert.

### 2.3 So sánh được những kiểu nào?

| Kiểu | `==` `!=` | `< > <= >=` |
|---|:---:|:---:|
| số (int, float, ...) | ✓ | ✓ |
| string | ✓ | ✓ (lexicographic) |
| bool | ✓ | ✗ |
| pointer | ✓ (so sánh địa chỉ) | ✗ |
| array | ✓ (mọi phần tử bằng) | ✗ |
| **slice, map, function** | **✗** (chỉ so được với `nil`) | ✗ |

> ❓ **Vì sao không so được slice?** Vì slice có thể chứa con trỏ ngầm và độ dài thay đổi; so sánh "bằng" không có nghĩa rõ ràng. Muốn so sánh content, dùng `reflect.DeepEqual` hoặc viết loop.

> 📝 **Tóm tắt mục 2.** Bắt buộc cùng kiểu. `len()` luôn ra `int`. Slice/map/func không so sánh được trừ với `nil`.

---

## 3. Toán tử logic `&& || !`

Chỉ áp dụng cho `bool`. Quan trọng: **short-circuit evaluation** (như C, Java, Python).

### 3.1 Short-circuit là gì?

- `A && B`: nếu `A` đã `false`, **không tính `B`**.
- `A || B`: nếu `A` đã `true`, **không tính `B`**.

### 3.2 Vì sao quan trọng?

Pattern an toàn cho nil pointer:

```go
type Point struct{ x, y int }
var p *Point  // = nil

// SAI — panic vì p là nil
// if p.x > 0 { ... }

// ĐÚNG — short-circuit chặn không cho đụng vào p.x
if p != nil && p.x > 0 {
    // chỉ chạy khi p khác nil VÀ p.x dương
}
```

Nếu Go *không* short-circuit, biểu thức `p != nil && p.x > 0` sẽ panic vì `p.x` được tính ngay cả khi `p == nil`.

### 3.3 Ví dụ thực tế: validate input

```go
func process(name string, age int, p *Person) error {
    // Nếu name rỗng HOẶC age âm HOẶC p nil → reject
    if name == "" || age < 0 || p == nil {
        return errors.New("invalid input")
    }
    // ở đây chắc chắn p != nil, dùng p.X an toàn
    ...
}
```

> ❓ **`!true` và `!false`?** `!true = false`, `!false = true`. Toán tử `!` là unary, đứng trước.

> ⚠ **Lỗi thường gặp.** Đảo thứ tự: `if p.x > 0 && p != nil` → vẫn panic, vì `p.x` được tính trước. **Luôn check `nil` trước**.

> 📝 **Tóm tắt mục 3.** `&&`, `||` chỉ cho bool, có short-circuit; dùng để guard nil pointer và validate.

---

## 4. Toán tử bitwise `& | ^ &^ << >>`

> 💡 **Hình dung.** Bitwise = thao tác trên **từng bit** của biểu diễn nhị phân. Nếu integer là "một dãy 64 bóng đèn", bitwise cho phép bật/tắt/đảo từng bóng độc lập. Cực hữu ích cho **flag (cờ) gói gọn trong 1 số** — Linux permission, network protocol header, hashset nhỏ.

### 4.1 Bảng

| Toán tử | Tên | Tác dụng |
|---|---|---|
| `&` | AND | bit `1 & 1 = 1`, mọi cái khác = 0 |
| `\|` | OR | bit `0 \| 0 = 0`, mọi cái khác = 1 |
| `^` | XOR | giống nhau = 0, khác nhau = 1 |
| `&^` | AND NOT (clear) | `a &^ b` = xoá các bit của `a` mà `b` đang bật |
| `<<` | shift trái | `a << n` = `a × 2ⁿ` |
| `>>` | shift phải | `a >> n` = `a / 2ⁿ` (truncate) |

### 4.2 Bốn ví dụ với binary

**Ví dụ 1 — AND (`&`)**: mask bit thấp

```
  0b1100_1010   = 202
& 0b0000_1111   =  15   (mask: chỉ giữ 4 bit thấp)
  ──────────
  0b0000_1010   =  10
```

Ý nghĩa: `n & 0x0F` lấy nibble thấp.

**Ví dụ 2 — OR (`|`)**: bật bit (set flag)

```
  0b0100_0001   = 65    (đang có bit 0 và bit 6)
| 0b0000_1000   =  8    (muốn bật bit 3)
  ──────────
  0b0100_1001   = 73    (giờ có bit 0, 3, 6)
```

Pattern: `flags = flags | NEW_FLAG`.

**Ví dụ 3 — XOR (`^`)**: đảo bit, hoặc toggle

```
  0b1010_1010   = 170
^ 0b1111_0000   = 240
  ──────────
  0b0101_1010   =  90
```

XOR là **involution** (làm 2 lần ra chính nó): `x ^ y ^ y == x`. Đây là nền tảng của mã hoá cổ điển và detect-duplicate.

**Ví dụ 4 — AND NOT (`&^`)**: clear bit (xoá flag) — **đặc trưng Go**

```
  0b1100_1010   = 202   (đang có bit 7,6,3,1)
&^ 0b0000_1010  =  10   (muốn xoá bit 3 và 1)
  ──────────
  0b1100_0000   = 192   (chỉ còn bit 7 và 6)
```

Trong C bạn phải viết `a & ~b`; Go có hẳn `&^` để biểu đạt rõ "clear các bit".

> ❓ **Vì sao Go có `&^` mà C không?** Vì pattern "clear bit" rất phổ biến (mở/đóng flag). `a &^ b` đọc tự nhiên hơn `a & ^b`, và tránh nhầm `^` (XOR / NOT) gây mơ hồ.

**Bonus — shift**:

```
1 << 0  = 1     // 0b0001
1 << 1  = 2     // 0b0010
1 << 2  = 4     // 0b0100
1 << 8  = 256   // bit thứ 8

256 >> 1 = 128
256 >> 4 = 16
```

### 4.3 Ví dụ thực tế: Linux file permission

```go
const (
    PermRead    = 1 << 2   // 0b100 = 4
    PermWrite   = 1 << 1   // 0b010 = 2
    PermExecute = 1 << 0   // 0b001 = 1
)

// "rwx" = 4 | 2 | 1 = 7
perm := PermRead | PermWrite | PermExecute  // 7

// Kiểm tra có quyền đọc?
canRead := perm & PermRead != 0   // true

// Bỏ quyền ghi
perm = perm &^ PermWrite          // 5 (rwx → r-x)

// Toggle quyền execute
perm = perm ^ PermExecute         // 4 (r-x → r--)
```

Đây chính xác là cách `chmod 755` được biểu diễn nội bộ: `owner=7, group=5, other=5`.

> 🔁 **Tự kiểm tra.** `13 & 6` = ? `13 | 6` = ? `13 ^ 6` = ?

<details>
<summary>Đáp án</summary>

`13 = 0b1101`, `6 = 0b0110`.  
- `13 & 6 = 0b0100 = 4`
- `13 | 6 = 0b1111 = 15`
- `13 ^ 6 = 0b1011 = 11`
</details>

> 📝 **Tóm tắt mục 4.** `&` mask, `|` set, `^` toggle/XOR, `&^` clear (đặc trưng Go), `<<` `>>` nhân/chia 2ⁿ. Pattern thực tế: flag bitmap.

---

## 5. Toán tử gán hợp (compound assignment)

Viết tắt cho `x = x OP y`:

| Compound | Tương đương |
|---|---|
| `x += 5` | `x = x + 5` |
| `x -= 5` | `x = x - 5` |
| `x *= 5` | `x = x * 5` |
| `x /= 5` | `x = x / 5` |
| `x %= 5` | `x = x % 5` |
| `x &= y` | `x = x & y` |
| `x \|= y` | `x = x \| y` |
| `x ^= y` | `x = x ^ y` |
| `x &^= y` | `x = x &^ y` |
| `x <<= n` | `x = x << n` |
| `x >>= n` | `x = x >> n` |

### 5.1 Ví dụ

```go
sum := 0
for _, v := range []int{1, 2, 3, 4, 5} {
    sum += v          // gọn hơn sum = sum + v
}
// sum = 15

flags := 0
flags |= PermRead    // set
flags |= PermWrite
flags &^= PermWrite  // clear
```

> ⚠ **Lỗi thường gặp.** Một số người mới viết `x =+ 5` (đảo dấu) — hợp lệ syntax (gán `x = +5`) nhưng KHÔNG phải cái họ muốn. Luôn dấu `+` trước.

---

## 6. Tăng/giảm `x++` và `x--` — KHÔNG phải expression

### 6.1 Đặc điểm Go

```go
x := 5
x++       // OK, x = 6
x--       // OK, x = 5

// ++x      // COMPILE ERROR — Go không có pre-increment
// a := x++ // COMPILE ERROR — x++ là statement, không có giá trị
// y = x++ + 1  // COMPILE ERROR
```

### 6.2 Vì sao Go làm vậy?

> ❓ Trong C, `a = i++` vs `a = ++i` cho kết quả khác nhau (post vs pre). Khi viết `arr[i++] = i++ + ++i`, không ai biết thứ tự đánh giá → bug khủng khiếp. Go quyết định:
> 
> 1. Chỉ có **post**, không có pre.
> 2. `x++` là **statement** (đứng một mình), không phải expression.
> 
> Kết quả: không có ambiguity, code đọc rõ ràng. Đổi lại bạn mất 1 ký tự khi viết `for i := 0; i < n; i++ {}` (vẫn dùng được `i++` ở đây vì đó là statement).

### 6.3 Muốn dùng giá trị sau khi tăng?

```go
x := 5
x++
fmt.Println(x)  // 6
```

Viết tách dòng. Không có cách viết "tăng và lấy giá trị" trong cùng biểu thức — đó là intent của Go.

> 📝 **Tóm tắt mục 6.** `x++`/`x--` là statement, không là expression. Không có pre-increment.

---

## 7. Operator precedence — chỉ 5 mức trong Go

> 💡 **Hình dung.** Precedence quyết định thứ tự eval. Trong C có ~14 mức → ai cũng phải tra bảng. Go giảm xuống còn 5 → dễ nhớ hơn nhiều.

### 7.1 Bảng từ cao đến thấp

| Mức | Toán tử | Tên gọi |
|:---:|---|---|
| 5 (cao nhất) | unary: `+x -x !x ^x *p &x <-ch` | unary |
| 4 | `*  /  %  <<  >>  &  &^` | mul-class |
| 3 | `+  -  \|  ^` | add-class |
| 2 | `==  !=  <  <=  >  >=` | comparison |
| 1 | `&&` | logical AND |
| 0 (thấp nhất) | `\|\|` | logical OR |

Trong cùng một mức, eval **left-to-right**.

> ❓ **Mẹo nhớ?** Đi từ cao xuống: "**unary → nhân/chia/AND** → **cộng/trừ/OR/XOR** → **so sánh** → **&&** → **||**". Bitwise AND-class đi cùng nhân/chia (cao); OR/XOR đi cùng cộng/trừ (thấp hơn). Đây là khác biệt lớn với C.

### 7.2 Ba ví dụ precedence gây lẫn lộn

**Ví dụ A** — bitwise vs comparison:

```go
flags & 0x0F == 0
```

Đoán xem Go eval thế nào?

- C/Python eval `flags & (0x0F == 0)` vì `==` cao hơn `&` ở chúng.
- **Go eval `(flags & 0x0F) == 0`** vì `&` (mức 4) cao hơn `==` (mức 2).

Đây là chỗ Go **dễ chịu hơn** C. Code Go viết tự nhiên đúng ý.

**Ví dụ B** — `*` vs `&&`:

```go
a + b * c == d || e
```

Eval theo precedence:

1. `b * c` (mức 4, cao nhất trong biểu thức)
2. `a + (b*c)` (mức 3)
3. `(a + b*c) == d` (mức 2)
4. `((a + b*c) == d) && ...` — không có `&&` ở đây
5. `((a + b*c) == d) || e` (mức 0)

Cuối cùng: `(((a + (b*c)) == d) || e)`.

**Ví dụ C** — shift vs add:

```go
1 << 2 + 3
```

- `<<` ở mức 4, `+` ở mức 3 → `<<` cao hơn.
- Tính: `(1 << 2) + 3` = `4 + 3` = **7**.

Nhưng trong C, `<<` thấp hơn `+`, ra `1 << (2+3) = 1 << 5 = 32`. **Khác kết quả!**

> ⚠ **Lỗi thường gặp khi từ C sang Go.** `1 << 2 + 3` cho ra số khác. Lúc nghi ngờ, **dùng dấu ngoặc**: `(1 << 2) + 3`.

> 🔁 **Tự kiểm tra.** Go eval `a == 0 || b == 0` như thế nào? Có cần ngoặc?

<details>
<summary>Đáp án</summary>

`==` (mức 2) cao hơn `||` (mức 0) → Go eval đúng là `(a == 0) || (b == 0)`. Không cần ngoặc, nhưng nhiều người vẫn viết để rõ.
</details>

> 📝 **Tóm tắt mục 7.** Go có 5 mức precedence. Đặc biệt `&`, `&^`, `<<`, `>>` ở mức CAO (đi cùng `*` `/`); `|`, `^` ở mức thấp hơn (đi cùng `+` `-`). Khác C — chú ý khi port code.

---

## 8. Type strictness trong biểu thức — Go không tự convert

> 💡 **Trực giác.** C, Python tự "lên kiểu" (promote): `int + float = float`. Go thì không — bạn phải tự convert. Lý do: Go ưu tiên **explicit** hơn convenience, tránh bug ngầm.

### 8.1 Bốn ví dụ lỗi và cách sửa

**Lỗi 1** — `int` vs `int64`:

```go
var a int = 1
var b int64 = 2
// c := a + b   // ERROR: mismatched types int and int64

// Sửa:
c := int64(a) + b      // OK, c = 3 (int64)
// hoặc
c2 := a + int(b)       // OK, c2 = 3 (int)
```

**Lỗi 2** — `int` vs `float64`:

```go
var x int = 5
var y float64 = 2.5
// z := x + y   // ERROR

// Sửa:
z := float64(x) + y     // OK, z = 7.5
```

**Lỗi 3** — `len()` ra `int`, so với `int32`:

```go
arr := []byte("hello")
var maxLen int32 = 10
// if len(arr) <= maxLen { ... }  // ERROR

// Sửa:
if int32(len(arr)) <= maxLen { ... }
// hoặc
if len(arr) <= int(maxLen) { ... }
```

**Lỗi 4** — chia `int` cho `int` mong ra float:

```go
total := 100
count := 3
// avg := total / count           // = 33 (int division!)
// avgF := float64(total / count) // = 33.0 (CHIA TRƯỚC, mất phần thập phân)

// ĐÚNG: convert TRƯỚC khi chia
avgF := float64(total) / float64(count)   // 33.333...
```

### 8.2 Vì sao strict đến vậy?

> ❓ Vì:
> - **Tránh narrowing ngầm** — `int64 → int` mất 32 bit cao trên 32-bit machine; Go không cho ngầm.
> - **Tránh widening ngầm** — chuyển `int` thành `float64` đôi khi mất precision (vd int 64-bit lớn).
> - **Code dễ review** — nhìn thấy `int64(x)` biết ngay có chuyển kiểu.

> 📝 **Tóm tắt mục 8.** Mọi biểu thức `OP` trong Go yêu cầu hai bên **cùng kiểu**. Convert bằng `T(x)` cú pháp. Nhớ convert TRƯỚC khi tính nếu cần precision.

---

## 9. Untyped constant — ngoại lệ ngọt ngào

Có một loại "kiểu" đặc biệt trong Go: **untyped constant**. Đây là literal số/string chưa "đông cứng" thành kiểu cụ thể, sẽ tự fit vào context.

### 9.1 Hai trường hợp khác nhau

**Trường hợp A — literal là untyped, OK:**

```go
var x int64 = 1 + 2     // OK: '1 + 2' là untyped, fit vào int64
var y float64 = 3 * 4   // OK: '3 * 4' untyped, fit vào float64
const Pi = 3.14159      // const không khai báo kiểu → untyped
var z float32 = Pi * 2  // OK: Pi untyped, fit vào float32
```

**Trường hợp B — variable đã typed, KHÔNG OK:**

```go
var y int = 1
// var z int64 = y + 2   // ERROR: y đã là int, biểu thức 'y + 2' là int

// Sửa:
var z int64 = int64(y) + 2
// hoặc
var z2 int64 = int64(y + 2)
```

### 9.2 Vì sao có cơ chế này?

> 💡 Để bạn viết `var x int8 = 100` mà không phải `var x int8 = int8(100)` — literal `100` chưa có kiểu, fit thoải mái. Đây là tradeoff: **convenience cho literal**, **strict cho variable**. Một khi giá trị đã "đông cứng" vào biến, Go bắt convert explicit.

> ⚠ **Lỗi thường gặp.** `var x int64 = 1 << 33` OK vì literal. Nhưng:
> ```go
> n := 1            // n là int
> var x int64 = n << 33  // ERROR
> ```
> Vì `n` đã là int (mặc định 64-bit nhưng kiểu vẫn là `int`, không phải `int64`).

> 📝 **Tóm tắt mục 9.** Literal/const không khai báo kiểu là untyped → fit theo context. Variable đã typed thì strict, phải convert.

---

## 10. Integer overflow — Go wrap silent

> 💡 **Hình dung.** Mỗi kiểu int có giới hạn. `int32` max là `2_147_483_647`. Cộng vào ra `2_147_483_648` thì sao? Go **không panic, không cảnh báo** — số "wrap" về số âm: `-2_147_483_648`. Đây là behavior của hầu hết CPU hiện đại (two's complement), Go expose ra trực tiếp.

### 10.1 Demo

```go
import "math"

var x int32 = math.MaxInt32   //  2_147_483_647
x++                            // -2_147_483_648  (WRAP!)

var y int32 = math.MinInt32   // -2_147_483_648
y--                            //  2_147_483_647  (WRAP ngược)
```

### 10.2 Vì sao đây là lỗ hổng nghiêm trọng?

**Kịch bản giao dịch tài chính** (đã có CVE thật):

```go
// Cộng số dư hai tài khoản (int32 — VND)
var balance1 int32 = 2_000_000_000   // 2 tỷ VND
var balance2 int32 = 500_000_000     // 500 triệu VND

total := balance1 + balance2          // 2_500_000_000 vượt MaxInt32

// Go tính: 2_500_000_000 % 2^32 = -1_794_967_296
// → total ÂM, hệ thống chuyển khoản coi "tổng âm" = lỗi → giao dịch sai
```

Năm 2010, đã có exploit thật: kẻ tấn công transfer số lớn để gây overflow, làm hệ thống ghi nhận âm → tạo dư có lợi.

### 10.3 Cách phòng

- **Dùng kiểu rộng hơn**: `int64` chứa được `~9.2 × 10¹⁸`, đủ cho tiền tệ thông thường.
- **Check trước khi cộng**:
  ```go
  if a > 0 && b > math.MaxInt32 - a {
      return errors.New("overflow")
  }
  return a + b, nil
  ```
- **Dùng `math/big.Int`** cho số rất lớn (crypto, blockchain).
- **Dùng `uint`** nếu chỉ cần số không âm (tăng range gấp đôi).

> ❓ **`int` của Go có overflow không?** Có. Kích thước `int` phụ thuộc platform: 64-bit trên hầu hết hệ thống hiện đại, nhưng có thể 32-bit. Luôn nghĩ đến overflow nếu giá trị tự do từ user.

> ⚠ **Lỗi thường gặp.** Loop `for i := int8(0); i < 200; i++` → infinite loop! Vì `int8` max là 127, `i++` từ 127 wrap về `-128`, vẫn `< 200`, không bao giờ dừng.

> 📝 **Tóm tắt mục 10.** Go wrap silent, không panic. Phải tự check overflow ở fintech / input từ user. Dùng `int64` hoặc `math/big`.

---

## 11. Float precision pitfall

> 💡 **Trực giác.** `float64` là IEEE-754 binary floating-point. Một số số thập phân **không biểu diễn chính xác được trong binary** — giống như `1/3 = 0.333...` không kết thúc trong hệ thập phân. `0.1` trong binary cũng là số tuần hoàn vô hạn.

### 11.1 Demo kinh điển

```go
a, b, c := 0.1, 0.2, 0.3
sum := a + b
fmt.Printf("%.20f\n", sum)          // 0.30000000000000004441
fmt.Println(sum == c)               // false (!!!)
fmt.Printf("%.20f\n", a)            // 0.10000000000000000555
```

> ⚠ **Lưu ý quan trọng — constant folding.** Nếu viết trực tiếp `0.1 + 0.2 == 0.3` (toàn literal), Go **compile-time** tính chính xác (untyped constant có precision vô hạn) → ra `true`. Để thấy bug thật, phải **ép qua biến** (như đoạn code trên). Bug chỉ xuất hiện khi giá trị đã "đông cứng" thành `float64` runtime.

Bug này có ở **mọi ngôn ngữ dùng IEEE-754**: Python, JavaScript, Java, C++. Không phải lỗi Go.

### 11.2 Ví dụ thực tế: bug tính tiền

```go
// Tổng đơn hàng = 0.1 USD × 3 = 0.3 USD
unit := 0.1
total := unit * 3
fmt.Println(total == 0.3)   // false!
fmt.Printf("%.20f", total)  // 0.30000000000000004441
```

Hệ thống compare `total == expected` → fail → user thấy "Số tiền không khớp, vui lòng thử lại". Bug khó debug.

### 11.3 Cách so sánh float đúng — epsilon

```go
import "math"

func nearEqual(a, b, eps float64) bool {
    return math.Abs(a - b) < eps
}

eps := 1e-9
nearEqual(0.1 + 0.2, 0.3, eps)   // true
```

Chọn `eps` thế nào?
- Tính trên giá trị "thông thường": `1e-9` đủ chính xác.
- Nếu giá trị rất nhỏ hoặc rất lớn: dùng **relative epsilon**: `|a-b| / max(|a|,|b|) < eps`.

### 11.4 Tiền: tuyệt đối không dùng float

> ⚠ **Quy tắc vàng cho tiền tệ.** **KHÔNG BAO GIỜ** dùng `float64` để lưu tiền. Dùng:
> - `int64` lưu **cents** (số xu): `$1.23` lưu thành `123`.
> - Hoặc `decimal` library (vd `github.com/shopspring/decimal`).
> 
> Mọi ngân hàng, sàn giao dịch đều theo nguyên tắc này.

> 📝 **Tóm tắt mục 11.** Float không chính xác. So sánh bằng epsilon. Tiền bạc không dùng float — dùng int64 (cents) hoặc decimal lib.

---

## 12. String concatenation với `+`

```go
s := "Hello, " + "World"   // OK
name := "Alice"
greet := "Hi " + name + "!"
```

`+` cho string tạo **string mới**, không sửa string cũ (string Go là **immutable**).

### 12.1 Pitfall: loop concat

```go
// CHẬM — tạo n-1 string trung gian
s := ""
for i := 0; i < 10000; i++ {
    s = s + "x"          // mỗi lần: alloc string mới dài hơn
}
// Tổng cộng: O(n²) work, O(n²) memory churn
```

Mỗi `s + "x"` cấp phát một string mới (vì string immutable không append được). Lặp 10000 lần thì có 10000 lần cấp phát, tổng work `1+2+3+...+10000 ≈ 50 triệu` thao tác copy.

### 12.2 Cách đúng — tease `strings.Builder` (Lesson 14)

```go
var b strings.Builder
for i := 0; i < 10000; i++ {
    b.WriteString("x")
}
s := b.String()   // O(n), không alloc nhiều lần
```

`strings.Builder` có buffer growing như slice — sẽ học kỹ ở [L14 — String & Rune](../lesson-14-strings-runes-utf8/).

> 📝 **Tóm tắt mục 12.** `+` cho string OK với vài lần ghép; trong loop dùng `strings.Builder`.

---

## 13. String comparison

### 13.1 `==` và `!=` — byte-by-byte

```go
"abc" == "abc"   // true
"abc" == "Abc"   // false (case-sensitive)
```

So sánh từng byte. Nhanh, O(n) với n là độ dài chuỗi.

### 13.2 `<`, `>`, `<=`, `>=` — lexicographic

So sánh từng byte theo thứ tự ASCII/Unicode codepoint.

```go
"a" < "b"     // true   (97 < 98)
"abc" < "abd" // true   (so sánh đến byte thứ 3: 'c' < 'd')
"ab" < "abc"  // true   (chuỗi ngắn hơn được coi nhỏ hơn khi prefix giống)

// Bẫy: hoa nhỏ hơn thường!
"Z" < "a"     // true   (90 < 97)
"A" < "Z"     // true
"a" < "Z"     // false
```

### 13.3 Walk-through cụ thể

```
"apple" vs "banana"
  byte 0:  'a' (97)  vs  'b' (98)  →  'a' < 'b'  →  "apple" < "banana"  ✓
```

```
"Cat" vs "cat"
  byte 0:  'C' (67)  vs  'c' (99)  →  'C' < 'c'  →  "Cat" < "cat"  ✓
```

> ⚠ **Lỗi thường gặp.** Sort danh sách tên không quan tâm case → `"alice"` đi trước `"Bob"` vì `'B' (66) < 'a' (97)` đảo lộn. Cách sửa: convert về cùng case trước khi so sánh.

> ❓ **Còn Unicode/UTF-8?** Go string là dãy byte UTF-8. So sánh thứ tự byte ≈ thứ tự codepoint (vì UTF-8 thiết kế khéo). Tiếng Việt `"á"` (2 bytes) vẫn so được, nhưng không theo thứ tự bảng chữ cái Việt. Cần thứ tự đúng → `golang.org/x/text/collate`.

> 📝 **Tóm tắt mục 13.** String so sánh byte-by-byte (ASCII order). Hoa < thường. Cần case-insensitive thì lower/upper trước.

---

## Bài tập

### BT1 — Đoán precedence (6 biểu thức)

Cho `a=2, b=3, c=4, d=5, e=true` (tất cả `int` trừ `e bool`). Đoán kết quả mỗi biểu thức:

1. `a + b * c`
2. `1 << 2 + 3`
3. `a | b & c`
4. `a + b == c + 1`
5. `a < b && b < c || e`
6. `^a` (toán tử bitwise NOT trên int)

### BT2 — Sửa 4 đoạn code lỗi conversion

Mỗi đoạn dưới đây không compile được. Sửa cho đúng và giải thích.

```go
// (a)
var n int = 100
var k int64 = 5
result := n + k

// (b)
arr := []int{1, 2, 3}
var idx int32 = 1
val := arr[idx]

// (c)
total := 17
count := 4
average := float64(total / count)
fmt.Println(average)  // muốn ra ~4.25

// (d)
var price float32 = 99.99
var quantity int = 3
revenue := price * quantity
```

### BT3 — Linux permission bitmap

Cho:

```go
const (
    Read    = 1 << 2
    Write   = 1 << 1
    Execute = 1 << 0
)
```

Viết 3 hàm:

1. `Combine(flags ...int) int` — OR tất cả flag thành một bitmap.
2. `Has(perm, flag int) bool` — kiểm tra `perm` có chứa `flag` không.
3. `Clear(perm, flag int) int` — xoá `flag` khỏi `perm`.

Test với input: `Combine(Read, Write)` → `?`; `Has(7, Execute)` → `?`; `Clear(7, Write)` → `?`.

### BT4 — Safe divide

Viết hàm `safeDivide(a, b int) (int, error)`:
- Trả về `a / b`.
- Nếu `b == 0` → trả về error `"division by zero"`.
- Bonus: nếu `a == math.MinInt64 && b == -1` → trả error `"overflow"` (vì `-MinInt64` overflow).

### BT5 — Float equal với epsilon

Viết hàm `floatEqual(a, b float64) bool`:
- Trả về `true` nếu `|a - b| < 1e-9`.

Test:
- `floatEqual(0.1+0.2, 0.3)` → mong đợi `true`.
- `floatEqual(1.0, 1.0000001)` → mong đợi `false`.
- `floatEqual(0, 0)` → `true`.

---

## Lời giải chi tiết

### Giải BT1

| # | Biểu thức | Phân tích | Kết quả |
|:-:|---|---|:-:|
| 1 | `a + b * c` | `*` (mức 4) > `+` (mức 3) → `2 + (3*4) = 14` | `14` |
| 2 | `1 << 2 + 3` | `<<` (mức 4) > `+` (mức 3) → `(1<<2) + 3 = 4 + 3 = 7`. **Khác C!** | `7` |
| 3 | `a \| b & c` | `&` (mức 4) > `\|` (mức 3) → `2 \| (3 & 4) = 2 \| 0 = 2` | `2` |
| 4 | `a + b == c + 1` | `+` (mức 3) > `==` (mức 2) → `(2+3) == (4+1) = 5 == 5 = true` | `true` |
| 5 | `a < b && b < c \|\| e` | comparison (2) > `&&` (1) > `\|\|` (0) → `((a<b) && (b<c)) \|\| e = (true && true) \|\| true = true` | `true` |
| 6 | `^a` | unary `^` = bitwise NOT. `^2 = -3` (two's complement: invert all bits of 2 = `...11111101` = -3) | `-3` |

> ⚠ Câu (3) là cái bẫy thường gặp: trong C bạn quen `a | b & c` = `a | (b & c)` đúng vì `&` cao hơn `|` ở C cũng vậy. Đây là một trong rất ít chỗ Go giống C. Nhưng đảo ngược với câu (2) — `<<` ở Go cao hơn `+` ngược với C.

### Giải BT2

**(a)** `int + int64` lỗi:
```go
result := int64(n) + k   // int64(100) + 5 = 105 (int64)
// hoặc
result := n + int(k)     // 100 + 5 = 105 (int)
```

**(b)** index slice phải là `int`:
```go
val := arr[int(idx)]
// hoặc đổi khai báo idx thành int
var idx int = 1
val := arr[idx]
```

**(c)** convert SAU khi chia → mất phần thập phân. Phải convert TRƯỚC:
```go
average := float64(total) / float64(count)
// 17.0 / 4.0 = 4.25
```

**(d)** `float32 * int` lỗi:
```go
revenue := price * float32(quantity)
// 99.99 * 3 = 299.97
```

### Giải BT3

```go
func Combine(flags ...int) int {
    result := 0
    for _, f := range flags {
        result |= f
    }
    return result
}

func Has(perm, flag int) bool {
    return perm & flag != 0
    // hoặc nghiêm hơn: return perm & flag == flag (đề phòng flag là multi-bit)
}

func Clear(perm, flag int) int {
    return perm &^ flag
}
```

Test:
- `Combine(Read, Write)` = `4 | 2` = **`6`** (`0b110`).
- `Has(7, Execute)` = `7 & 1 != 0` = `1 != 0` = **`true`**.
- `Clear(7, Write)` = `7 &^ 2` = `0b111 &^ 0b010` = `0b101` = **`5`**.

Độ phức tạp: O(n) cho `Combine` (n = số flag); O(1) cho `Has` và `Clear`.

### Giải BT4

```go
import (
    "errors"
    "math"
)

func safeDivide(a, b int64) (int64, error) {
    if b == 0 {
        return 0, errors.New("division by zero")
    }
    // Overflow chỉ xảy ra khi MinInt / -1 (vì |MinInt| > MaxInt)
    if a == math.MinInt64 && b == -1 {
        return 0, errors.New("overflow")
    }
    return a / b, nil
}
```

Test:
- `safeDivide(10, 3)` → `3, nil`.
- `safeDivide(10, 0)` → `0, error("division by zero")`.
- `safeDivide(math.MinInt64, -1)` → `0, error("overflow")`. Vì `MinInt64 = -2^63`, `-MinInt64 = 2^63 > MaxInt64 = 2^63 - 1` → overflow.

### Giải BT5

```go
import "math"

const eps = 1e-9

func floatEqual(a, b float64) bool {
    return math.Abs(a - b) < eps
}
```

Walk-through:
- `floatEqual(0.1+0.2, 0.3)`: `|0.30000000000000004 - 0.3| = 4.44e-17 < 1e-9` → `true` ✓
- `floatEqual(1.0, 1.0000001)`: `|1.0 - 1.0000001| = 1e-7`. Vì `1e-7 > 1e-9` → `false` ✓
- `floatEqual(0, 0)`: `0 < 1e-9` → `true` ✓

> ⚠ **Hạn chế của absolute epsilon.** Với số rất lớn (vd `a = 1e20, b = 1e20 + 1`), absolute eps `1e-9` không phù hợp vì khoảng cách `1` quá nhỏ so với độ lớn. Lúc đó dùng relative: `|a-b| < eps * max(|a|,|b|)`. Production thường kết hợp cả hai.

---

## Code & Minh hoạ

- [solutions.go](./solutions.go) — demo arithmetic, bitwise, overflow, float-compare.
- [visualization.html](./visualization.html) — 3 module tương tác: bitwise calculator, precedence explorer, type conversion checker.

---

## Bài tiếp theo

[L09 — Điều kiện (if / switch)](../lesson-09-control-flow/) — bạn sẽ dùng toán tử so sánh và logic của bài này thường xuyên trong `if`/`switch`.
