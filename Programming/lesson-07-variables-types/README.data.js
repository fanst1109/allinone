// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: Programming/lesson-07-variables-types/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 07 — Biến & Kiểu dữ liệu trong Go

Bài này dạy cách **đặt tên cho dữ liệu** trong Go: 3 cách khai báo biến, các kiểu nguyên thủy (int, float, bool, string), zero value, ép kiểu, hằng số và \`iota\`. Đây là bài "buộc dây giày" — sau bài này bạn có thể viết được mọi function nhỏ trong Go.

## Mục tiêu học tập

Sau bài này, bạn sẽ:

- Biết khi nào dùng \`var\`, khi nào dùng \`:=\`, khi nào dùng \`const\`.
- Hiểu **zero value** — vì sao Go khác C ở chỗ này, và vì sao nó tiết kiệm bug.
- Phân biệt được các kiểu số nguyên (\`int\`, \`int32\`, \`uint8\`...) và biết range của chúng.
- Biết Go **wrap around** khi overflow chứ không panic, và đoán được kết quả.
- Hiểu \`string(65)\` không trả về \`"65"\` — và vì sao Go thiết kế như vậy.
- Viết được enum bằng \`iota\`, kể cả enum dạng bit-flag (\`1 << iota\`).
- Phân biệt **type alias** (\`type X = Y\`) và **type definition** (\`type X Y\`).
- Dùng đúng \`fmt.Printf\` verbs (\`%d\`, \`%v\`, \`%T\`, \`%q\`...) cho từng tình huống.

## Tiền đề

- [Lesson 05 — Vì sao Go?](../lesson-05-why-go-philosophy/) (đã chạy được hello world).
- [Lesson 06 — Hello World & Toolchain](../lesson-06-hello-world-toolchain/) (biết \`go run\`, \`go build\`).
- Hiểu sơ về **binary, bit, byte** ([DataFoundations L01](../../DataFoundations/01-NumberRepresentation/lesson-01-binary-hex/)) — sẽ hữu ích khi nói về kiểu số nguyên, overflow, bitshift.

---

## 1. Ba cách khai báo biến trong Go

### 💡 Trực giác — vì sao Go có 3 cách thay vì 1?

Trong Go, một biến cần **3 thông tin**: *tên*, *kiểu*, *giá trị khởi tạo*. Go cho bạn nói 1, 2, hoặc cả 3 — tùy bạn biết bao nhiêu lúc đó. Đó là toàn bộ câu chuyện.

### 1.1 Cú pháp đầy đủ

| Cú pháp | Tên | Kiểu | Giá trị | Khi nào dùng |
|---------|-----|------|---------|--------------|
| \`var x int\` | ✓ | ✓ | (zero value) | Khai báo trước, gán sau |
| \`var x int = 10\` | ✓ | ✓ | ✓ | Hiếm dùng — verbose, thường thay bằng \`:=\` |
| \`var x = 10\` | ✓ | (suy ra) | ✓ | Khi muốn package-level var, hoặc cần zero-value rõ ràng |
| \`x := 10\` | ✓ | (suy ra) | ✓ | **Phổ biến nhất** — bên trong hàm |

Cả 4 dòng trên đều tạo ra một biến \`x\` kiểu \`int\` giá trị mặc định 0 hoặc 10. Khác biệt chỉ là **ngữ cảnh sử dụng**.

\`\`\`go
package main

import "fmt"

// Package-level: phải dùng \`var\`, không dùng được \`:=\`
var port = 8080

func main() {
    // 1. Khai báo, chưa biết giá trị
    var name string
    name = "Alice"

    // 2. Khai báo full
    var age int = 30

    // 3. Khai báo + suy luận kiểu
    var pi = 3.14   // float64

    // 4. Short declaration — chỉ trong hàm
    city := "Hanoi"

    fmt.Println(port, name, age, pi, city)
}
\`\`\`

### 1.2 Quy tắc của \`:=\`

- **Chỉ dùng được trong hàm**, không dùng ở package level.
- Vế trái phải có **ít nhất 1 biến mới**. \`x, err := f()\` hợp lệ nếu \`err\` đã tồn tại, miễn \`x\` mới.
- Trong cùng scope, **không khai báo lại** biến đã tồn tại — phải dùng \`=\`.

\`\`\`go
x := 10
// x := 20  // ERROR: no new variables on left side of :=
x = 20      // OK — assignment
\`\`\`

### 1.3 Khai báo nhóm

\`\`\`go
var (
    host     = "localhost"
    port     = 8080
    protocol = "https"
)

a, b, c := 1, 2, 3       // multi-assign
x, y := y, x             // swap (Go cho phép)
\`\`\`

### ⚠ Lỗi thường gặp

- **Khai báo biến nhưng không dùng** → Go compile error \`declared and not used\`. Đây là thiết kế cố ý của Go — bắt buộc bỏ code chết.
- **Tưởng \`=\` trong hàm giống \`:=\`** — \`=\` chỉ assign, biến phải tồn tại trước. Người mới hay viết \`x = 10\` ở dòng đầu hàm rồi compile lỗi.
- **Dùng \`:=\` ở package level** — không hợp lệ. Package level chỉ có \`var\`/\`const\`/\`type\`/\`func\`.

### ❓ Câu hỏi tự nhiên

> **Sao Go không cho dùng \`:=\` ngoài hàm?**

Vì Go muốn phân biệt rõ "khai báo" (declaration) và "câu lệnh" (statement). Ngoài hàm chỉ chứa **declaration** — biến không phải kết quả của một câu lệnh nào. Bên trong hàm thì có statement, nên \`:=\` là một statement-level shortcut.

> **Có nên luôn dùng \`:=\` cho ngắn không?**

Không. Dùng \`var x int\` khi muốn nhấn mạnh "tôi sẽ gán ở dòng sau" hoặc khi cần zero value rõ ràng (ví dụ \`var sum int\` rồi cộng dồn). Dùng \`var x = ...\` khi muốn rõ ràng đây là biến package-level. \`:=\` cho code "in-flow" bên trong hàm.

### 🔁 Dừng lại tự kiểm tra

1. Đoạn nào hợp lệ?
   \`\`\`go
   var a int = 5         // (a)
   var b = 5             // (b)
   c := 5                // (c)
   var d := 5            // (d)
   \`\`\`
2. Đoạn này có chạy không?
   \`\`\`go
   package main
   x := 10
   func main() { ... }
   \`\`\`

<details><summary>Đáp án</summary>

1. \`(a)\`, \`(b)\`, \`(c)\` hợp lệ. \`(d)\` SAI — không có cú pháp \`var d := 5\`.
2. KHÔNG — \`x := 10\` không dùng được ở package level. Đổi thành \`var x = 10\`.

</details>

### 📝 Tóm tắt mục 1

- 3 cách chính: \`var x T\`, \`var x = v\`, \`x := v\` (và biến thể \`var x T = v\`).
- \`:=\` chỉ trong hàm, phải có ít nhất 1 biến mới.
- Khai báo mà không dùng → compile error (feature, không phải bug).

---

## 2. Zero value — biến luôn được khởi tạo

### 💡 Trực giác

Trong C, biến mới khai báo chứa **rác** (giá trị ngẫu nhiên trong bộ nhớ). Go ngược lại: **mọi biến đều có giá trị khởi tạo mặc định** — gọi là *zero value*. Bạn không bao giờ đọc trúng rác.

### 2.1 Định nghĩa — Zero value là gì?

- **(a) Là gì**: Zero value của kiểu \`T\` là giá trị mà Go gán cho biến kiểu \`T\` khi không có initializer. Mỗi kiểu có đúng 1 zero value.
- **(b) Vì sao tồn tại**: Tránh undefined behavior — đọc biến chưa init trong C là nguyên nhân của vô vàn bug security. Go quyết định: biến luôn có giá trị "an toàn".
- **(c) Ví dụ trực giác**: \`var c int\` → c = 0 ngay lập tức. \`var s string\` → s = \`""\` ngay. Không cần \`c = 0\` riêng.

### 2.2 Bảng zero value

| Kiểu | Zero value | Ghi chú |
|------|-----------|---------|
| \`int\`, \`int8\`, \`int16\`, \`int32\`, \`int64\`, \`uint*\` | \`0\` | Tất cả integer |
| \`float32\`, \`float64\` | \`0.0\` | Số thực |
| \`bool\` | \`false\` | |
| \`string\` | \`""\` | Chuỗi rỗng, KHÔNG phải nil |
| \`pointer\` (\`*T\`) | \`nil\` | |
| \`slice\`, \`map\`, \`channel\`, \`func\` | \`nil\` | Reference type chưa make |
| \`interface{}\` | \`nil\` | |
| \`struct\` | mỗi field = zero value của nó | Recursive |
| \`array\` (\`[N]T\`) | mỗi phần tử = zero value của T | |

### 2.3 Ví dụ cụ thể (≥6 ví dụ số)

\`\`\`go
var a int                       // a = 0
var b float64                   // b = 0.0
var c string                    // c = ""  (length 0, KHÔNG nil)
var d bool                      // d = false
var e *int                      // e = nil  (pointer chưa trỏ vào đâu)
var f []int                     // f = nil  (slice chưa khởi tạo)
var g map[string]int            // g = nil  (đọc thì OK, ghi thì panic!)
var h struct{ X, Y int }        // h = {X: 0, Y: 0}
\`\`\`

### ⚠ Lỗi thường gặp

- **Nhầm \`""\` với \`nil\` cho string**: trong Go, \`var s string\` cho \`""\`, KHÔNG phải \`nil\`. String không nullable.
- **Đọc từ nil map an toàn, GHI thì panic**:
  \`\`\`go
  var m map[string]int
  _ = m["key"]      // OK, trả về 0 (zero value của int)
  m["key"] = 1      // PANIC: assignment to entry in nil map
  \`\`\`
  Phải \`m := make(map[string]int)\` hoặc \`m := map[string]int{}\` trước khi ghi.
- **Nil slice vs empty slice**: cả \`nil\` slice và \`[]int{}\` đều có \`len() == 0\` và \`append\` vào được. Khác biệt chỉ thấy khi marshal JSON: nil → \`null\`, empty → \`[]\`.

### ❓ Câu hỏi tự nhiên

> **Vậy có cần khởi tạo cho slice/map không?**

Có, **nếu định ghi**. \`var s []int; s = append(s, 1)\` OK (append xử lý nil). Nhưng \`var m map[string]int; m["k"] = 1\` panic. Map BẮT BUỘC \`make\` hoặc literal \`{}\` trước khi ghi.

> **Zero value cho struct lồng nhau?**

Đệ quy. Mỗi field = zero value của kiểu field đó. Struct rỗng \`struct{}\` luôn là zero value của chính nó.

### 🔁 Dừng lại tự kiểm tra

Đoạn này in ra gì?

\`\`\`go
var s []int
var m map[string]int
fmt.Println(s == nil, m == nil, len(s), len(m))
\`\`\`

<details><summary>Đáp án</summary>

\`true true 0 0\` — cả slice và map đều nil; \`len()\` của nil slice/map an toàn = 0.

</details>

### 📝 Tóm tắt mục 2

- Mọi biến đều có zero value — không bao giờ đọc trúng rác.
- Numeric → 0, bool → false, string → \`""\`, reference type → nil.
- Đọc nil map an toàn, ghi nil map panic. Slice append vào nil được.

---

## 3. Kiểu số nguyên (Integer types)

### 💡 Trực giác

Go có nhiều kiểu integer vì **bộ nhớ và range** quan trọng. Một \`uint8\` chiếm 1 byte (0–255), một \`int64\` chiếm 8 byte. Nếu lưu 1 triệu số, chọn kiểu sai = lãng phí 7 MB.

### 3.1 Bảng kiểu integer

| Kiểu | Size (byte) | Range | Khi nào dùng |
|------|:-----------:|-------|--------------|
| \`int8\`  | 1 | −128 → 127 | Hiếm — flag, tiny counter |
| \`int16\` | 2 | −32 768 → 32 767 | Audio sample, một số binary format |
| \`int32\` | 4 | ≈ −2.15·10⁹ → 2.15·10⁹ | Rune (Unicode code point), ID nhỏ |
| \`int64\` | 8 | ≈ ±9.22·10¹⁸ | Timestamp ns, ID lớn |
| \`int\`   | **4 hoặc 8** (theo platform) | platform-dependent | **Mặc định** cho integer trong Go |
| \`uint8\` (\`byte\`) | 1 | 0 → 255 | Byte data, raw bytes |
| \`uint16\` | 2 | 0 → 65 535 | Port number tối đa, một số ID |
| \`uint32\` | 4 | 0 → ≈ 4.29·10⁹ | IPv4 address, hash 32-bit |
| \`uint64\` | 8 | 0 → ≈ 1.84·10¹⁹ | Hash 64-bit, large counter |
| \`uint\`  | 4 hoặc 8 | platform-dependent | Hiếm dùng trực tiếp |
| \`uintptr\` | đủ chứa pointer | platform-dependent | Chỉ dùng trong package \`unsafe\` |

> **\`byte\` = \`uint8\`** và **\`rune\` = \`int32\`** — đây là alias, sẽ học kỹ ở [L14 — String & Rune](../lesson-14-strings-runes-utf8/).

### 3.2 \`int\` size phụ thuộc platform — ví dụ thật

\`\`\`go
import "unsafe"
fmt.Println(unsafe.Sizeof(int(0)))   // 8 trên Linux/Mac x86-64, 4 trên 32-bit ARM
\`\`\`

- Trên server Linux 64-bit thông thường: \`int\` = 8 byte = \`int64\` effectively.
- Trên Raspberry Pi 32-bit: \`int\` = 4 byte = \`int32\`.
- Nếu cần kích thước cố định (vd serialize binary), **đừng dùng \`int\`** — dùng \`int32\` hoặc \`int64\` rõ ràng.

### 3.3 Khi nào chọn kiểu nào? (4 ví dụ thực tế)

1. **HTTP status code** (100–599): \`int\` đủ. Nếu cần tiết kiệm: \`uint16\`.
2. **Unix timestamp giây** (vài tỷ): \`int32\` đủ đến năm 2038 (Y2038 problem!). \`int64\` an toàn.
3. **Nanosecond timestamp**: bắt buộc \`int64\` (\`time.Time.UnixNano()\` trả về \`int64\`).
4. **Pixel RGB**: mỗi kênh 0–255 → \`uint8\` (\`byte\`). 1 ảnh 1920×1080×3 = 6.2 MB với \`byte\`, 25 MB nếu dùng \`int32\`.

### ❓ Câu hỏi tự nhiên

> **Sao Go có cả \`int\` và \`int64\` nếu trên máy 64-bit chúng giống nhau?**

Vì code phải chạy được cả trên 32-bit. \`int\` linh hoạt theo máy (tốt cho perf). \`int64\` cố định (tốt cho data layout). Đừng dùng lẫn lộn.

> **Khi nào dùng unsigned?**

Khi giá trị **không bao giờ âm về mặt ngữ nghĩa**: byte data, age, file size, port number. Nhưng cẩn thận: nếu trộn signed/unsigned trong tính toán có thể gây bug khó tìm (overflow ngầm).

### 📝 Tóm tắt mục 3

- Go có 10+ kiểu integer — khác nhau ở size và signed/unsigned.
- \`int\` = platform-dependent (4 hoặc 8 byte) — kiểu mặc định.
- Dùng kiểu cố định (\`int32\`, \`uint64\`...) khi serialize binary, dùng \`int\` cho counter thông thường.

---

## 4. Overflow — Go wrap around, không panic

### 💡 Trực giác

Một biến \`uint8\` chỉ có 8 bit → đếm từ 0 đến 255. Cộng 1 vào 255 thì sao? Trong toán học = 256. Trong máy = bit thứ 9 bị mất → còn lại \`00000000\` = 0. Đó là **wrap around**.

### 4.1 Cơ chế

Mỗi kiểu integer có N bit. Phép toán modulo \`2^N\` (với unsigned) hoặc modulo signed wrap (với signed). **Go KHÔNG panic** khi overflow — chỉ "quay vòng" giá trị.

### 4.2 Bốn ví dụ số cụ thể

**Ví dụ 1: \`uint8\` tràn lên**
\`\`\`go
var x uint8 = 255
x++       // → 0  (256 mod 256 = 0)
\`\`\`
Binary: \`11111111 + 1 = 100000000\`, bit thứ 9 bị bỏ → \`00000000\` = 0.

**Ví dụ 2: \`uint8\` tràn xuống**
\`\`\`go
var x uint8 = 0
x--       // → 255  (−1 mod 256 = 255)
\`\`\`
Binary: \`00000000 - 1\` cần borrow → \`11111111\` = 255.

**Ví dụ 3: \`int8\` tràn lên (signed)**
\`\`\`go
var x int8 = 127
x++       // → -128
\`\`\`
Binary: \`01111111 + 1 = 10000000\`. Với signed (two's complement), \`10000000\` = −128.

**Ví dụ 4: \`int32\` overflow gây sai timestamp**
\`\`\`go
var t int32 = 2147483647     // = max int32 = 2038-01-19 03:14:07 UTC
t++                          // → -2147483648 = quay về 1901!
\`\`\`
Đây chính là **Y2038 problem** — nguyên nhân các hệ thống legacy dùng \`int32\` cho Unix timestamp sẽ tèo vào 2038.

### 4.3 Phát hiện overflow

Go không tự catch. Cách phổ biến:
\`\`\`go
// Tự kiểm tra trước:
if a > math.MaxInt32 - b {
    return errors.New("overflow")
}
c := a + b

// Hoặc dùng kiểu lớn hơn:
var c int64 = int64(a) + int64(b)
\`\`\`

Từ Go 1.21 có \`math/bits.Add64\`, \`math/bits.Mul64\` trả về cả carry/overflow flag.

### ⚠ Lỗi thường gặp

- **Trộn signed/unsigned**: \`var u uint = 1; if u - 2 < 0 { ... }\` — không bao giờ true! Vì \`u-2\` underflow thành số rất lớn, không phải số âm.
- **Dùng \`int32\` cho counter chạy lâu**: web service uptime đếm request có thể vượt 2 tỷ trong vài tuần. Dùng \`int64\` hoặc \`uint64\`.

### ❓ Câu hỏi tự nhiên

> **Vì sao Go không panic khi overflow như Python hay Rust (debug mode)?**

Vì performance — kiểm tra overflow trên mỗi phép tính tốn ~5–15% CPU. Go chọn theo C: nhanh, để developer tự lo. Rust release mode cũng làm vậy (chỉ panic trong debug).

> **Có constant \`math.MaxInt32\` không?**

Có. \`math.MaxInt8\`, \`MaxInt16\`, \`MaxInt32\`, \`MaxInt64\`, \`MaxUint8\`, \`MaxUint16\`, \`MaxUint32\`, \`MaxUint64\` đều có trong package \`math\`.

### 🔁 Dừng lại tự kiểm tra

Đoán kết quả không chạy code:
\`\`\`go
var a uint8 = 200
var b uint8 = 100
fmt.Println(a + b)
\`\`\`

<details><summary>Đáp án</summary>

\`44\` — vì \`200 + 100 = 300\`, mod 256 = 44.

</details>

### 📝 Tóm tắt mục 4

- Overflow = wrap around mod \`2^N\`, KHÔNG panic.
- \`uint8: 255+1 = 0\`, \`int8: 127+1 = -128\`, \`int32: 2³¹-1 + 1 = -2³¹\`.
- Y2038 = \`int32\` Unix timestamp overflow vào 19/01/2038.
- Dùng kiểu lớn hơn hoặc check thủ công nếu cần an toàn.

---

## 5. Kiểu số thực (Float)

### 💡 Trực giác

Float là cách máy lưu **số có phần thập phân** bằng cách hy sinh độ chính xác. \`0.1 + 0.2 ≠ 0.3\` trong float là chuyện bình thường — không phải bug Go, là bản chất IEEE 754.

### 5.1 Hai kiểu

| Kiểu | Size | Precision | Range |
|------|:--:|-----------|-------|
| \`float32\` | 4 byte | ~7 chữ số thập phân | ±3.4·10³⁸ |
| \`float64\` | 8 byte | ~15–17 chữ số thập phân | ±1.8·10³⁰⁸ |

**Mặc định \`float64\`** — Go dùng \`float64\` cho mọi literal số thực (\`3.14\`, \`1.5e10\`). Chỉ chọn \`float32\` khi bộ nhớ rất eo (texture GPU, audio sample mass).

### 5.2 Ví dụ về precision

\`\`\`go
var a float32 = 0.123456789
var b float64 = 0.123456789
fmt.Printf("%.20f\\n", a)   // → 0.12345679104328155518 (sai từ chữ số 8)
fmt.Printf("%.20f\\n", b)   // → 0.12345678899999999734 (sai từ chữ số 17)
\`\`\`

### 5.3 NaN và Inf

\`\`\`go
var x float64 = 0.0 / 0.0    // NaN ("not a number")
var y float64 = 1.0 / 0.0    // +Inf
var z float64 = -1.0 / 0.0   // -Inf

math.IsNaN(x)    // true
math.IsInf(y, 1) // true (positive inf)
x == x           // FALSE! NaN không bằng chính nó.
\`\`\`

**Đặc tính kỳ lạ**: \`NaN != NaN\`. Đây là theo chuẩn IEEE 754, không phải bug. Muốn check phải dùng \`math.IsNaN()\`.

### 5.4 So sánh float — không bao giờ dùng \`==\`

\`\`\`go
a := 0.1 + 0.2
b := 0.3
fmt.Println(a == b)               // FALSE!
fmt.Println(math.Abs(a-b) < 1e-9) // TRUE — đúng cách so sánh
\`\`\`

### ⚠ Lỗi thường gặp

- Lưu **tiền** bằng float → mất xu vì rounding. Dùng \`int64\` (lưu số xu) hoặc package \`math/big\` (\`big.Rat\`).
- Lặp \`for f := 0.0; f < 1.0; f += 0.1\` — có thể không stop đúng 10 lần do tích lũy lỗi.

### 📝 Tóm tắt mục 5

- \`float64\` mặc định, \`float32\` chỉ khi cần.
- IEEE 754 → precision có hạn (~7 hoặc ~15 chữ số).
- \`NaN != NaN\`. Không dùng \`==\` với float, dùng epsilon.
- Tiền không lưu bằng float.

---

## 6. Bool & String

### 6.1 \`bool\`

Đúng/sai. Zero value = \`false\`. **Không tự convert** từ int (\`if 1 { ... }\` SAI trong Go).

\`\`\`go
var ok bool                       // false
ok = true
if ok { fmt.Println("yes") }
\`\`\`

### 6.2 \`string\`

- **Immutable** — không thể sửa từng ký tự. \`s[0] = 'X'\` compile error.
- **Indexed by byte**, không phải bởi ký tự. \`s[0]\` trả về \`byte\` (= \`uint8\`).
- Là chuỗi byte UTF-8 (sẽ học kỹ ở [L14 — String & Rune](../lesson-14-strings-runes-utf8/)).

\`\`\`go
s := "Hello"
fmt.Println(len(s))    // 5 (byte count)
fmt.Println(s[0])      // 72 (mã ASCII của 'H', kiểu byte/uint8)
fmt.Println(string(s[0])) // "H"

t := "Xin chào"
fmt.Println(len(t))    // 10 — không phải 8! "à" chiếm 2 byte UTF-8.
\`\`\`

⚠ **Lỗi thường gặp**: tưởng \`len(s)\` = số ký tự. SAI với chuỗi unicode. Muốn đếm rune (ký tự): \`utf8.RuneCountInString(s)\`.

### 📝 Tóm tắt mục 6

- \`bool\` không convert tự động từ int.
- \`string\` immutable, indexed by byte, là UTF-8.
- \`len(string)\` = byte count, không phải rune count.

---

## 7. Type Conversion (ép kiểu)

### 💡 Trực giác

Go **không tự động** convert giữa các kiểu, kể cả \`int32 → int64\`. Bạn phải gọi rõ ràng: \`T(x)\`. Đây là khác biệt lớn với C, Java, JavaScript.

### 7.1 Cú pháp

\`\`\`go
var a int32 = 10
var b int64 = int64(a)       // OK, explicit
// var c int64 = a           // ERROR: cannot use a (int32) as int64
\`\`\`

### 7.2 Sáu ví dụ phổ biến

\`\`\`go
// 1. int → float
n := 10
f := float64(n)                  // 10.0
mean := float64(sum) / float64(count)  // tránh integer division

// 2. float → int (truncate, KHÔNG round)
g := 3.9
i := int(g)                      // 3, không phải 4

// 3. int → int khác size
var big int64 = 300
var small int8 = int8(big)       // 44! (300 mod 256, signed wrap)
                                  // CẢNH BÁO: overflow im lặng

// 4. byte/rune → string
b := byte(65)
s1 := string(b)                  // "A" — KHÔNG phải "65"!
r := rune(0x4E2D)
s2 := string(r)                  // "中"

// 5. int → string — TRAP
n2 := 65
s3 := string(n2)                 // "A" — coi 65 là code point!
// Muốn "65" thật sự:
s4 := strconv.Itoa(n2)           // "65"

// 6. string → int
s5 := "123"
n3, err := strconv.Atoi(s5)      // n3 = 123, err = nil
\`\`\`

### ⚠ Trap kinh điển: \`string(int)\` ≠ chuyển sang ký tự số

\`\`\`go
fmt.Println(string(65))      // "A"  — KHÔNG phải "65"!
fmt.Println(string(20013))   // "中"
\`\`\`

Vì Go coi \`int\` đó là **Unicode code point** rồi convert sang ký tự đơn. Đây là **lỗi compile vet warning** từ Go 1.15, nhưng vẫn compile. Muốn \`"65"\` thật sự → \`strconv.Itoa(65)\` hoặc \`fmt.Sprintf("%d", 65)\`.

### 7.3 Hai lỗi compile thường gặp

**Lỗi 1: implicit conversion**
\`\`\`go
var n int32 = 5
var m int64 = n      // ERROR: cannot use n (variable of type int32) as int64 value
// Sửa:             m := int64(n)
\`\`\`

**Lỗi 2: nhầm \`==\` với conversion**
\`\`\`go
var b byte = 'A'
if b == "A" { ... }   // ERROR: invalid operation: b == "A" (mismatched types byte and string)
// Sửa:               if b == 'A' { ... }  hoặc  if string(b) == "A" { ... }
\`\`\`

### ❓ Câu hỏi tự nhiên

> **Sao Go không tự convert \`int32 → int64\`? An toàn mà?**

Vì Go muốn bạn **nhìn thấy mọi conversion**. Tự động convert dễ giấu bug: ví dụ \`int64 → int32\` có thể mất dữ liệu, nhưng nhiều ngôn ngữ vẫn cho qua. Go ép bạn viết \`int32(x)\` để chấp nhận trách nhiệm.

> **Conversion có tốn CPU không?**

Hầu hết là **0 cost** — compiler tối ưu thành no-op (vd \`int32 → int64\` chỉ là zero/sign extend register). Nhưng \`float → int\` có cost vì cần truncate.

### 🔁 Dừng lại tự kiểm tra

Sửa đoạn này cho compile:
\`\`\`go
var x int = 100
var y float64 = x + 0.5
\`\`\`

<details><summary>Đáp án</summary>

\`var y float64 = float64(x) + 0.5\` — phải ép \`x\` sang float64 trước.

</details>

### 📝 Tóm tắt mục 7

- Mọi conversion phải **explicit**: \`T(x)\`.
- \`string(int)\` coi int là code point — TRAP. Dùng \`strconv.Itoa\`.
- \`float → int\` truncate (không round).
- Conversion từ kiểu lớn → nhỏ có thể overflow im lặng.

---

## 8. Hằng số (\`const\`) — Typed vs Untyped

### 💡 Trực giác

\`const\` là giá trị **biết tại compile time**, không bao giờ đổi. Khác \`var\` ở chỗ: \`const\` linh hoạt hơn rất nhiều — có thể có **kiểu mơ hồ** (untyped), thích nghi theo ngữ cảnh.

### 8.1 Cú pháp

\`\`\`go
const Pi = 3.14159
const MaxRetry int = 5
const (
    StatusOK       = 200
    StatusNotFound = 404
)
\`\`\`

### 8.2 Untyped constant — siêu power

\`\`\`go
const C = 10                  // untyped int

var i int = C                 // OK
var i64 int64 = C             // OK — cùng const, dùng cho int64
var f float64 = C             // OK — dùng cho float64
\`\`\`

Cùng một \`const C\`, có thể assign cho \`int\`, \`int64\`, \`float64\`... **Compile vẫn check overflow tại compile time**:
\`\`\`go
const X = 300
var b byte = X         // ERROR: constant 300 overflows byte
\`\`\`

### 8.3 Typed constant — cứng hơn

\`\`\`go
const C int = 10

var i int = C            // OK
var i64 int64 = C        // ERROR: cannot use C (int constant) as int64 value
var i64b int64 = int64(C) // OK với conversion
\`\`\`

### 8.4 4 ví dụ untyped khác kiểu

\`\`\`go
const Pi = 3.14159265358979  // untyped float
const Greeting = "hello"     // untyped string
const Flag = true            // untyped bool
const Mask = 0xFF            // untyped int

// Cùng Pi, dùng cho 2 kiểu khác:
var f32 float32 = Pi
var f64 float64 = Pi
\`\`\`

### ❓ Câu hỏi tự nhiên

> **Khi nào nên typed, khi nào untyped?**

Mặc định untyped (\`const X = 10\`) để linh hoạt. Typed (\`const X int = 10\`) khi bạn muốn "chốt" kiểu để tránh dùng nhầm — ví dụ \`const StatusCode int = 200\` để chỉ ra "đây là int, đừng dùng cho float".

> **\`const\` có dùng cho slice/map/struct không?**

KHÔNG. \`const\` chỉ áp được cho **basic type** (số, bool, string). Slice/map/struct phải dùng \`var\`.

### 📝 Tóm tắt mục 8

- \`const\` = giá trị compile-time, immutable.
- Untyped constant linh hoạt: cùng const dùng cho nhiều kiểu khác nhau.
- Typed constant ép kiểu cứng.
- \`const\` chỉ cho basic type, không cho slice/map/struct.

---

## 9. \`iota\` — Generator cho Enum

### 💡 Trực giác

\`iota\` là **bộ đếm tự động** trong khối \`const\`. Mỗi dòng const trong cùng một \`const (...)\` block, \`iota\` tăng 1 (bắt đầu từ 0). Đây là cách Go làm enum.

### 9.1 Ví dụ cơ bản

\`\`\`go
const (
    Monday    = iota  // 0
    Tuesday           // 1  (lặp lại biểu thức trên)
    Wednesday         // 2
    Thursday          // 3
    Friday            // 4
    Saturday          // 5
    Sunday            // 6
)
\`\`\`

### 9.2 Bốn pattern phổ biến

**Pattern 1: Enum đơn giản với type**
\`\`\`go
type Status int
const (
    StatusPending Status = iota   // 0
    StatusActive                  // 1
    StatusArchived                // 2
)
\`\`\`

**Pattern 2: Bit flag với \`1 << iota\`** (giống Linux file permission)
\`\`\`go
type Permission uint8
const (
    PermRead    Permission = 1 << iota   // 1  (binary 001)
    PermWrite                            // 2  (binary 010)
    PermExecute                          // 4  (binary 100)
)

// Combine bằng OR:
const ReadWrite = PermRead | PermWrite        // 3

// Check bằng AND:
func canExec(p Permission) bool {
    return p & PermExecute != 0
}
\`\`\`

Đây chính là pattern dùng trong syscall \`open()\` của Linux: \`O_RDONLY=0, O_WRONLY=1, O_RDWR=2, O_APPEND=1024, O_CREAT=64...\` — đều là bit flag.

**Pattern 3: Skip với \`_\`**
\`\`\`go
const (
    _  = iota             // 0 (bỏ)
    KB = 1 << (10 * iota) // 1 << 10 = 1024
    MB                    // 1 << 20 = 1,048,576
    GB                    // 1 << 30
    TB                    // 1 << 40
)
\`\`\`

**Pattern 4: Reset trong block mới**
\`\`\`go
const (
    A = iota   // 0
    B          // 1
)
const (
    C = iota   // 0 — reset vì block mới!
    D          // 1
)
\`\`\`

### 9.3 HTTP status code — ví dụ thực tế

\`\`\`go
type HTTPStatus int
const (
    StatusOK              HTTPStatus = 200
    StatusCreated                    = 201
    StatusBadRequest                 = 400
    StatusUnauthorized               = 401
    StatusNotFound                   = 404
    StatusInternalError              = 500
)
\`\`\`

> Không phải lúc nào cũng dùng \`iota\` — HTTP status code có giá trị cố định bởi spec, không phải \`iota + 200\`. Dùng giá trị literal cho rõ ràng.

### ⚠ Lỗi thường gặp

- **Tưởng \`iota\` reset mỗi dòng** — KHÔNG. Reset chỉ khi vào \`const (...)\` block mới.
- **Tưởng \`iota\` dùng được ngoài \`const\`** — KHÔNG, chỉ trong const block.
- **Để giá trị 0 mang nghĩa đặc biệt mà không biết**: nếu \`Status = iota\` thì \`Pending = 0\`, dễ trộn với zero value của \`Status\` khi \`var s Status\` chưa init → "vô tình" là Pending. Đôi khi cần \`StatusUnknown = iota; StatusPending; ...\` để 0 = unknown rõ ràng.

### ❓ Câu hỏi tự nhiên

> **Bao giờ dùng \`iota\`, bao giờ dùng giá trị thủ công?**

Dùng \`iota\` khi: (a) chỉ cần giá trị **unique liên tiếp**, không quan tâm số cụ thể; (b) bit flag (\`1 << iota\`); (c) đơn vị tăng đều (KB, MB, GB).
Dùng literal khi: giá trị có nghĩa cố định (HTTP status, port chuẩn 80/443, error code đã document).

> **Làm sao print tên enum thay vì số?**

Tự viết method \`String() string\` hoặc dùng \`go:generate stringer\`:
\`\`\`go
//go:generate stringer -type=Status
func (s Status) String() string {
    return [...]string{"Pending", "Active", "Archived"}[s]
}
\`\`\`

### 🔁 Dừng lại tự kiểm tra

Đoạn này print ra gì?
\`\`\`go
const (
    A = iota * 2     // ?
    B                // ?
    C                // ?
)
fmt.Println(A, B, C)
\`\`\`

<details><summary>Đáp án</summary>

\`0 2 4\` — \`iota\` lần lượt 0, 1, 2 → nhân 2 → 0, 2, 4.

</details>

### 📝 Tóm tắt mục 9

- \`iota\` = counter trong \`const\` block, từ 0, +1 mỗi dòng.
- Reset mỗi block.
- Patterns: enum đơn giản (\`= iota\`), bit flag (\`1 << iota\`), skip (\`_\`), đơn vị (KB/MB/GB).
- HTTP status: không phải lúc nào cũng \`iota\` — giá trị cố định thì viết thẳng.

---

## 10. Type Alias vs Type Definition

### 💡 Trực giác

\`type A B\` = tạo **kiểu MỚI** giống B nhưng không tương thích trực tiếp với B (phải convert).
\`type A = B\` = đặt **biệt danh** — A và B là cùng 1 kiểu, đổi qua đổi lại tự do.

Khác nhau ở dấu \`=\`.

### 10.1 Type Definition (\`type X T\`)

\`\`\`go
type Celsius float64
type Fahrenheit float64

var c Celsius = 100
var f Fahrenheit = 212
// c = f          // ERROR: cannot use f (Fahrenheit) as Celsius
c = Celsius(f)    // OK với convert
\`\`\`

Lợi ích: **type safety**. Compiler không cho phép trộn Celsius và Fahrenheit dù cả hai đều là float64 dưới gáo. Có thể attach **method**:
\`\`\`go
func (c Celsius) ToFahrenheit() Fahrenheit {
    return Fahrenheit(c*9/5 + 32)
}
\`\`\`

### 10.2 Type Alias (\`type X = T\`)

\`\`\`go
type MyInt = int

var a MyInt = 5
var b int = a       // OK! MyInt và int là CÙNG kiểu.
\`\`\`

Không tạo kiểu mới, chỉ đặt tên khác cho cùng kiểu. **Không attach method được** (vì sẽ ô nhiễm kiểu gốc).

### 10.3 Khi nào dùng cái nào?

| Tình huống | Dùng |
|------------|------|
| Tạo kiểu domain riêng, muốn type-safe (UserID, OrderID, Celsius) | **Definition** \`type X T\` |
| Refactor — đổi tên kiểu mà không break code cũ | **Alias** \`type X = T\` |
| Cần attach method | **Definition** |
| Migrate code: \`byte = uint8\`, \`rune = int32\` (chính alias!) | **Alias** |

Ví dụ thực tế: trong Go std lib, \`byte = uint8\` và \`rune = int32\` đều là **alias**, không phải kiểu mới.

### ❓ Câu hỏi tự nhiên

> **Nếu \`UserID = int\`, sao không dùng thẳng \`int\`?**

Để tránh **bug trộn lẫn**. Nếu hàm \`func ban(uid int, reportedBy int)\` thì gọi \`ban(reporter, victim)\` (đảo) sẽ compile fine, nhưng SAI logic. Nếu \`func ban(uid UserID, reportedBy ReporterID)\` thì compiler bắt được ngay.

### 📝 Tóm tắt mục 10

- \`type X T\` (không \`=\`) = kiểu MỚI, không tương thích trực tiếp với T.
- \`type X = T\` (có \`=\`) = alias, cùng kiểu, đổi qua đổi lại tự do.
- \`byte\` và \`rune\` là alias built-in của Go.

---

## 11. \`fmt.Printf\` verbs cơ bản

### 11.1 Bảng verb thường dùng nhất

| Verb | Ý nghĩa | Ví dụ input → output |
|------|---------|---------------------|
| \`%d\` | Decimal integer | \`42\` → \`42\` |
| \`%b\` | Binary | \`5\` → \`101\` |
| \`%o\` | Octal | \`8\` → \`10\` |
| \`%x\` / \`%X\` | Hex (lower/upper) | \`255\` → \`ff\` / \`FF\` |
| \`%c\` | Character (rune) | \`65\` → \`A\` |
| \`%f\` | Float (default 6 chữ số sau dấu) | \`3.14\` → \`3.140000\` |
| \`%.2f\` | Float, 2 chữ số sau dấu | \`3.14159\` → \`3.14\` |
| \`%e\` | Scientific notation | \`1234.5\` → \`1.234500e+03\` |
| \`%s\` | String | \`"hello"\` → \`hello\` |
| \`%q\` | Quoted string (có escape) | \`"hello\\n"\` → \`"hello\\n"\` |
| \`%v\` | Default format (any type) | struct, slice, map |
| \`%+v\` | Like %v nhưng kèm field name của struct | \`{X:1 Y:2}\` |
| \`%#v\` | Go-syntax representation | \`main.Point{X:1, Y:2}\` |
| \`%T\` | Type của value | \`42\` → \`int\` |
| \`%t\` | Boolean | \`true\` → \`true\` |
| \`%p\` | Pointer address | \`0xc000010050\` |
| \`%%\` | Literal \`%\` | → \`%\` |

### 11.2 Khi nào dùng cái nào?

- **\`%v\`** — debug nhanh, không quan tâm format đẹp. Dùng cho slice, map, struct.
- **\`%+v\`** — struct kèm tên field — debug struct là tốt nhất.
- **\`%#v\`** — copy-paste-able Go syntax — viết test.
- **\`%T\`** — không biết kiểu của value (đặc biệt khi nhận \`interface{}\`).
- **\`%q\`** — string có escape — debug chuỗi có ký tự đặc biệt (\`\\n\`, \`\\t\`, quote).
- **\`%d\`** — bình thường dùng cho int.
- **\`%s\`** — dùng cho string. Cũng work với type có method \`String()\` (interface \`fmt.Stringer\`).

### 11.3 Ví dụ thực tế

\`\`\`go
type User struct{ Name string; Age int }
u := User{"Alice", 30}

fmt.Printf("%v\\n", u)    // {Alice 30}
fmt.Printf("%+v\\n", u)   // {Name:Alice Age:30}
fmt.Printf("%#v\\n", u)   // main.User{Name:"Alice", Age:30}
fmt.Printf("%T\\n", u)    // main.User

s := "hello\\tworld\\n"
fmt.Printf("%s", s)      // hello   world  (in xuống dòng)
fmt.Printf("%q", s)      // "hello\\tworld\\n" (in escape rõ)
\`\`\`

### ⚠ Lỗi thường gặp

- **Mismatch verb với kiểu** → output \`%!d(string=hello)\` (Go báo bug):
  \`\`\`go
  fmt.Printf("%d", "hello")    // %!d(string=hello)
  \`\`\`
- **Quên \`\\n\`** → không xuống dòng. \`Println\` tự thêm, \`Printf\` thì không.

### 📝 Tóm tắt mục 11

- \`%v\` cho mọi thứ khi không cần đẹp.
- \`%+v\` cho struct kèm field name (debug).
- \`%T\` để hỏi "kiểu gì?".
- \`%q\` cho string có escape.
- \`%d\`, \`%f\`, \`%s\` cho cơ bản.

---

## 12. Naming convention trong Go

| Quy tắc | Ví dụ ĐÚNG | Ví dụ SAI |
|---------|-----------|-----------|
| Biến, hàm trong package: **camelCase** | \`userCount\`, \`parseJSON\` | \`user_count\`, \`Parse_JSON\` |
| Exported (public): **PascalCase** | \`ReadFile\`, \`MaxRetry\` | \`readFile\` (sẽ là private) |
| Constant: vẫn camelCase / PascalCase, không SCREAMING_SNAKE | \`MaxRetries\`, \`defaultPort\` | \`MAX_RETRIES\` |
| Acronym viết HOA hết hoặc thường hết | \`parseURL\`, \`HTTPServer\`, \`userID\` | \`parseUrl\`, \`HttpServer\`, \`userId\` |
| Tên ngắn trong scope nhỏ | \`i\`, \`j\` for loop; \`r io.Reader\`; \`s string\` | \`theLoopCounter\`, \`inputReader\` |
| File: snake_case, hậu tố đặc biệt | \`user_service.go\`, \`parse_test.go\` | \`userService.go\` |

**Quy tắc vàng**: **chữ cái đầu HOA = exported (public)**, **chữ cái đầu thường = unexported (package-private)**. Không có keyword \`public\`/\`private\` trong Go.

\`\`\`go
// Trong package "user":
func GetByID(id int) User { ... }   // exported — gọi được từ ngoài: user.GetByID(...)
func validate(u User) error { ... } // unexported — chỉ trong package này
\`\`\`

### ⚠ Lỗi thường gặp

- **Đặt \`Get\`, \`Set\` prefix kiểu Java** — Go không khuyến khích. Thay vì \`GetName()\` thì viết \`Name()\`. Setter vẫn dùng \`SetName()\` được.
- **\`UserId\` thay vì \`UserID\`** — Go style guide bảo viết acronym đồng nhất hoa hoặc thường: \`userID\`, \`URLParser\`, \`ID\`.

### 📝 Tóm tắt mục 12

- camelCase mặc định, PascalCase = exported.
- Tên ngắn trong scope ngắn, dài trong scope dài.
- Acronym đồng nhất: \`URL\`, \`ID\`, \`HTTP\` — không \`Url\`, \`Id\`, \`Http\`.
- File: snake_case.

---

## 13. Ứng dụng thực tế

### 13.1 Bit flag trong syscall Linux

Khi mở file:
\`\`\`go
import "syscall"
fd, _ := syscall.Open("/tmp/x", syscall.O_RDWR|syscall.O_CREAT|syscall.O_APPEND, 0644)
\`\`\`
\`O_RDWR=2\`, \`O_CREAT=64\`, \`O_APPEND=1024\` — đều là bit flag (mỗi cái 1 bit riêng). Đây chính là pattern \`1 << iota\` ở mục 9.

### 13.2 HTTP status code

\`\`\`go
const (
    StatusOK              = 200
    StatusBadRequest      = 400
    StatusInternalServer  = 500
)
\`\`\`
Package \`net/http\` của Go std lib có sẵn \`http.StatusOK\`, \`http.StatusNotFound\`, ... — họ dùng giá trị literal (không iota) vì giá trị do RFC quy định.

### 13.3 Database int → Go enum

Bảng SQL lưu status là int (\`0=pending, 1=active, 2=archived\`). Khi đọc về Go:
\`\`\`go
type OrderStatus int
const (
    OrderPending OrderStatus = iota
    OrderActive
    OrderArchived
)

var statusInt int
db.QueryRow("SELECT status FROM orders WHERE id=?", id).Scan(&statusInt)
status := OrderStatus(statusInt)   // convert int → OrderStatus (type definition)

if status == OrderActive { ... }
\`\`\`
Vì \`OrderStatus\` là **type definition** (\`type X int\`, không \`=\`), bạn cần \`OrderStatus(statusInt)\` để convert. Đó là lý do dùng type definition: compiler bắt được nếu lỡ so sánh \`status == 1\` (mismatched types).

### 13.4 Color packing trong image processing

\`\`\`go
type Color uint32   // 0xAARRGGBB
func PackRGBA(r, g, b, a uint8) Color {
    return Color(uint32(a)<<24 | uint32(r)<<16 | uint32(g)<<8 | uint32(b))
}
func (c Color) R() uint8 { return uint8(c >> 16) }
func (c Color) G() uint8 { return uint8(c >> 8) }
func (c Color) B() uint8 { return uint8(c) }
func (c Color) A() uint8 { return uint8(c >> 24) }
\`\`\`
Mỗi pixel 4 byte = 1 uint32. Lưu 1920×1080 pixel chỉ tốn 8 MB thay vì 32 MB nếu mỗi kênh là \`int\`.

---

## Bài tập

### BT1: Đoán zero value

Cho 6 declaration, **không chạy code**, đoán giá trị in ra:
\`\`\`go
var a int
var b float64
var c string
var d bool
var e *int
var f []string
var g map[string]int
var h struct{ X int; Y string }
fmt.Println(a, b, c, d, e, f, g, h)
\`\`\`

### BT2: Trace overflow

Đoán kết quả từng dòng:
\`\`\`go
var x int8 = 127
x++
fmt.Println(x)             // (1)

var y uint8 = 0
y--
fmt.Println(y)             // (2)

var z int32 = 2147483647
z++
fmt.Println(z)             // (3)

var w uint16 = 65530
w += 10
fmt.Println(w)             // (4)
\`\`\`

### BT3: Enum \`WeekDay\`

Viết kiểu \`WeekDay\` với 7 hằng số \`Monday\` → \`Sunday\` dùng \`iota\`, kèm method \`String()\` trả về tên ngày.

### BT4: Permission flag

Định nghĩa kiểu \`Permission\` với 3 quyền \`Read\`, \`Write\`, \`Execute\` dùng \`1 << iota\`. Viết hàm \`HasPermission(p, want Permission) bool\`. Test với combination \`Read | Write\`.

### BT5: Sửa lỗi conversion

4 đoạn code dưới đây đều không compile. Sửa lại:

(a)
\`\`\`go
var a int = 100
var b float64 = a / 3
\`\`\`

(b)
\`\`\`go
var n int = 65
var s string = "Mã: " + n
\`\`\`

(c)
\`\`\`go
var x int32 = 1000
var y int64 = x * 2
\`\`\`

(d)
\`\`\`go
var b byte = 'A'
if b == "A" {
    fmt.Println("found A")
}
\`\`\`

---

## Lời giải chi tiết

### Lời giải BT1

Output: \`0 0  false <nil> [] map[] {0 }\`

Giải thích từng cái:
- \`a\` (int) → \`0\`
- \`b\` (float64) → \`0\` (in ra là \`0\`, không \`0.0\`, vì \`%v\` mặc định)
- \`c\` (string) → \`""\` (rỗng, in ra thành khoảng trắng giữa các giá trị)
- \`d\` (bool) → \`false\`
- \`e\` (*int) → \`<nil>\`
- \`f\` ([]string) → \`[]\` (slice nil nhưng \`%v\` print như slice rỗng)
- \`g\` (map) → \`map[]\`
- \`h\` (struct) → \`{0 }\` (X=0, Y=""; %v in field cách bởi space)

### Lời giải BT2

(1) **\`-128\`** — \`int8\` max = 127, +1 → wrap về −128 (binary \`01111111 + 1 = 10000000\` = −128 trong two's complement).

(2) **\`255\`** — \`uint8\` min = 0, −1 → wrap về 255 (binary \`00000000 - 1\` borrow → \`11111111\` = 255).

(3) **\`-2147483648\`** — int32 max = 2³¹−1, +1 → wrap về −2³¹. Đây là Y2038 problem.

(4) **\`4\`** — uint16 max = 65535. \`65530 + 10 = 65540\`. \`65540 mod 65536 = 4\`.

### Lời giải BT3

\`\`\`go
type WeekDay int

const (
    Monday WeekDay = iota
    Tuesday
    Wednesday
    Thursday
    Friday
    Saturday
    Sunday
)

func (d WeekDay) String() string {
    return [...]string{
        "Monday", "Tuesday", "Wednesday", "Thursday",
        "Friday", "Saturday", "Sunday",
    }[d]
}

// Sử dụng:
d := Wednesday
fmt.Println(d)            // "Wednesday" — fmt tự gọi String() vì implement Stringer
fmt.Println(int(d))       // 2
\`\`\`

**Cách tiếp cận**: dùng \`iota\` cho 7 dòng → giá trị 0..6. Implement \`String()\` (interface \`fmt.Stringer\`) bằng cách lookup mảng. Khi \`Println\` gặp giá trị có method \`String()\`, sẽ gọi nó tự động.

### Lời giải BT4

\`\`\`go
type Permission uint8

const (
    Read    Permission = 1 << iota   // 1
    Write                            // 2
    Execute                          // 4
)

func HasPermission(p, want Permission) bool {
    return p & want == want
}

func main() {
    user := Read | Write          // 3 (binary 011)
    fmt.Println(HasPermission(user, Read))      // true
    fmt.Println(HasPermission(user, Write))     // true
    fmt.Println(HasPermission(user, Execute))   // false
    fmt.Println(HasPermission(user, Read|Write)) // true (cần CẢ HAI)
}
\`\`\`

**Cách tiếp cận**: \`1 << iota\` sinh dãy 1, 2, 4 — mỗi giá trị chiếm đúng 1 bit. Kiểm tra quyền dùng AND: \`p & want == want\` đúng khi \`p\` có **tất cả** các bit trong \`want\`. Nếu chỉ muốn check "có ít nhất 1": \`p & want != 0\`.

**Độ phức tạp**: O(1) — tất cả bitwise.

### Lời giải BT5

(a) Conversion int → float64:
\`\`\`go
var a int = 100
var b float64 = float64(a) / 3
// hoặc:
var b float64 = float64(a) / 3.0
\`\`\`
Lỗi gốc: \`a / 3\` là integer division → kết quả int → không gán cho float64. Ngoài ra cần explicit conversion.

(b) String concat với int:
\`\`\`go
var n int = 65
var s string = "Mã: " + strconv.Itoa(n)
// hoặc:
var s string = fmt.Sprintf("Mã: %d", n)
\`\`\`
Lỗi gốc: Go không cho \`string + int\`. Phải convert n sang string. **CHÚ Ý**: \`string(n)\` SAI vì nó coi 65 là code point → ra \`"A"\`.

(c) int32 → int64:
\`\`\`go
var x int32 = 1000
var y int64 = int64(x) * 2
\`\`\`
Lỗi gốc: \`x * 2\` cho kết quả \`int32\`, không tự convert sang \`int64\`. Explicit \`int64(x)\` trước khi nhân.

(d) byte vs string:
\`\`\`go
var b byte = 'A'
if b == 'A' {              // so sánh byte với rune literal (int32) — Go cho phép
    fmt.Println("found A")
}
// hoặc:
if string(b) == "A" { ... }
\`\`\`
Lỗi gốc: \`b\` kiểu \`byte\`, \`"A"\` kiểu \`string\`, không so sánh được. Đổi vế phải sang rune literal \`'A'\` (cùng integer family) hoặc convert \`b\` sang string.

---

## Code & Minh họa

- [\`solutions.go\`](./solutions.go) — chạy \`go run solutions.go\` để thấy demo 3 cách khai báo, overflow, enum, permission flags, fmt verbs.
- [\`visualization.html\`](./visualization.html) — 3 module tương tác: Zero value explorer, Overflow visualizer (binary representation), iota generator.

---

## Bài tiếp theo

→ [Lesson 08 — Toán tử & Biểu thức](../lesson-08-operators-expressions/) — số học, logic, bitwise, precedence, conversion sâu hơn.
`;
