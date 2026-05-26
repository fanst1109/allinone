// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: Programming/lesson-14-strings-runes-utf8/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 14 — String, Rune, UTF-8 trong Go

> **Tier 1 — Go Basic · Lesson 14**
>
> Tiền đề: [Lesson 12 — Array & Slice](../lesson-12-arrays-slices/), [Lesson 13 — Map](../lesson-13-maps/).
> Bài kế: [Lesson 15 — Struct & Method](../lesson-15-struct-method/).

## Vấn đề mở bài

Bạn viết function lưu username vào DB:

\`\`\`go
func validate(name string) error {
    if len(name) > 20 {
        return errors.New("tên quá 20 ký tự")
    }
    return nil
}
\`\`\`

Một user Việt Nam đăng ký tên \`"Nguyễn Văn Hoàng Anh Đức"\` (24 ký tự) → bị reject. **Đúng**. Một user khác tên \`"Lê Hoàng"\` (8 ký tự) → bị reject (?!). User thứ ba \`"😀😀😀😀"\` (4 emoji) → bị reject. **Tại sao**?

Vì \`len(string)\` trong Go **không đếm ký tự** — nó đếm **byte**. \`"Lê Hoàng"\` chiếm 11 byte (\`L\`, \`ê\`=2 byte, \` \`, \`H\`, \`o\`, \`à\`=2 byte, \`n\`, \`g\` → tổng 11). \`"😀😀😀😀"\` chiếm 16 byte (mỗi emoji 4 byte UTF-8). Validation 20-byte → reject họ tên Việt và mọi user dùng emoji.

Lesson này dạy bạn **cách Go biểu diễn string thực ra** (byte sequence, không phải char), khi nào dùng \`byte\`, khi nào dùng \`rune\`, và làm sao count ký tự cho đúng.

> Sẽ giải đáp đầy đủ trong mục 8 (count đúng) + Bài tập 1 (rewrite validate).

## Mục tiêu học tập

- Hiểu string trong Go = read-only **byte sequence**, không phải sequence of char.
- Phân biệt **byte** (uint8, 1 ô của UTF-8) vs **rune** (int32, 1 code point Unicode).
- Nắm cơ chế UTF-8: 1 code point = 1-4 byte, ASCII là subset.
- Biết khi nào index theo byte (\`s[i]\`), khi nào range rune (\`for i, r := range s\`).
- Dùng được \`strings\`, \`strconv\`, \`unicode\`, \`strings.Builder\` cho task thực tế.
- Tránh 4 gotcha kinh điển: \`string(int)\` trap, concat trong loop, byte-index multi-byte, dùng \`len()\` để count char.

## 1. String trong Go là gì?

> **💡 Trực giác**: nghĩ string như một **mảng byte read-only được gói trong header \`(pointer, length)\`**. Không có thông tin "đây là UTF-8 hay Latin-1" — đó chỉ là một loạt byte. Việc *diễn giải* các byte này thành ký tự là chuyện của code đọc nó (thường mặc định UTF-8 vì Go source và std lib đều coi như vậy).

### Định nghĩa hình thức

\`\`\`go
type string struct {
    data *byte
    len  int
}
\`\`\`

- **Read-only**: không thể \`s[0] = 'X'\`. Phải tạo string mới.
- **Immutable**: pass string giữa các function chỉ copy header \`(pointer, length)\` = 16 byte (trên 64-bit) — không copy dữ liệu thực. Rẻ.
- **Có thể chứa byte bất kỳ**, kể cả \`\\x00\`. Không terminator \`\\0\` như C.

### Ví dụ số cụ thể

\`\`\`go
s := "hello"     // 5 byte: 0x68 0x65 0x6C 0x6C 0x6F
len(s)           // 5
s[0]             // 104 (byte 'h')
s[0] = 'H'       // ❌ compile error: cannot assign to s[0]
\`\`\`

Để "sửa" string: tạo string mới.

\`\`\`go
b := []byte(s)   // copy 5 byte ra slice mutable
b[0] = 'H'
s2 := string(b)  // "Hello"
\`\`\`

> **⚠ Lỗi thường gặp**: tưởng \`s[0]\` trả ra \`string\` 1 ký tự. **Sai** — trả ra \`byte\` (uint8). Phải dùng \`string(s[0])\` nếu muốn string.

## 2. Indexing trả về BYTE, không phải char

\`\`\`go
s := "hello"
fmt.Println(s[0])          // 104 (số, kiểu byte)
fmt.Printf("%c\\n", s[0])   // h
fmt.Printf("%T\\n", s[0])   // uint8
\`\`\`

Với ASCII (mỗi char = 1 byte), \`s[0]\` "đúng" về mặt cảm giác — \`'h'\` thật ra là byte 104.

Nhưng với non-ASCII:

\`\`\`go
s := "café"
fmt.Println(len(s))        // 5 (KHÔNG phải 4)
fmt.Printf("%c\\n", s[3])   // Ã  ←  byte đầu của 'é', không phải 'é'
fmt.Printf("%c\\n", s[4])   // © (byte thứ hai của 'é')
\`\`\`

\`'é'\` được mã hoá UTF-8 = 2 byte \`0xC3 0xA9\`. Index theo byte cắt giữa ký tự → ra ra rác.

> **❓ Câu hỏi tự nhiên**: vì sao Go thiết kế kiểu này? Vì sao không index theo char như Python? Vì char trong Unicode có **độ dài byte thay đổi** (1-4 byte). Để random-access theo char, Go sẽ phải decode UTF-8 mỗi lần \`s[i]\` → mất O(i). Index byte luôn O(1). Go chọn tốc độ, đẩy việc "iterate đúng" sang \`for range\`.

## 3. \`len(s)\` đếm BYTE — 4 ví dụ thực tế

| String | Bytes (hex) | \`len(s)\` | Số ký tự (rune) |
|--------|-------------|---------:|----------------:|
| \`"hello"\` | \`68 65 6C 6C 6F\` | 5 | 5 |
| \`"xin chào"\` | \`78 69 6E 20 63 68 C3 A0 6F\` | 9 | 8 (chữ \`à\` = 2 byte) |
| \`"日本語"\` | \`E6 97 A5 E6 9C AC E8 AA 9E\` | 9 | 3 (mỗi ký tự Trung/Nhật = 3 byte) |
| \`"😀🚀"\` | \`F0 9F 98 80 F0 9F 9A 80\` | 8 | 2 (mỗi emoji = 4 byte) |

\`\`\`go
fmt.Println(len("hello"))     // 5
fmt.Println(len("xin chào"))  // 9
fmt.Println(len("日本語"))     // 9
fmt.Println(len("😀🚀"))       // 8
\`\`\`

> **📝 Quy luật**: tiếng Anh ≈ 1 byte/ký tự, tiếng Việt có dấu ≈ 1.3-1.5 byte/ký tự, CJK ≈ 3 byte/ký tự, emoji ≈ 4 byte/ký tự. Khi đặt limit (DB column, validate input), tính theo **rune** không phải byte.

## 4. UTF-8 — encoding "ngầm định" của Go

> **💡 Trực giác**: Unicode gán cho mỗi ký tự trên thế giới một số gọi là **code point** (vd \`A\` = U+0041 = 65; \`à\` = U+00E0 = 224; \`日\` = U+65E5 = 26085; \`😀\` = U+1F600 = 128512). Nhưng số ấy phải lưu xuống file/network bằng byte — UTF-8 là cách mã hoá code point thành 1-4 byte có quy luật.

### Vì sao UTF-8 thắng

- **Tương thích ASCII**: code point 0-127 mã hoá thành 1 byte giống y hệt ASCII. File ASCII cũ vẫn đọc được như UTF-8.
- **Self-synchronizing**: nhìn 1 byte ngẫu nhiên là biết nó là byte đầu hay byte tiếp theo của 1 ký tự → recover được khi mất sync.
- **Backward-compat**: protocol cũ chỉ biết byte (TCP, HTTP, JSON) vẫn handle UTF-8 mà không sửa gì.

> Hôm nay > 98% trang web dùng UTF-8. Go source code **bắt buộc** là UTF-8. JSON spec yêu cầu UTF-8.

### Quy luật mã hoá

| Code point | Bit pattern UTF-8 | Số byte |
|------------|-------------------|--------:|
| \`U+0000\`–\`U+007F\` (ASCII) | \`0xxxxxxx\` | 1 |
| \`U+0080\`–\`U+07FF\` | \`110xxxxx 10xxxxxx\` | 2 |
| \`U+0800\`–\`U+FFFF\` | \`1110xxxx 10xxxxxx 10xxxxxx\` | 3 |
| \`U+10000\`–\`U+10FFFF\` | \`11110xxx 10xxxxxx 10xxxxxx 10xxxxxx\` | 4 |

Byte đầu cho biết "tôi cần bao nhiêu byte total" (số \`1\` ở MSB trước số \`0\`). Byte tiếp theo luôn bắt đầu \`10\` → dễ nhận diện không phải byte đầu.

### Bảng 5 ký tự mẫu

| Ký tự | Code point | Bit pattern | Bytes (hex) | Số byte |
|-------|-----------:|-------------|-------------|--------:|
| \`A\` | U+0041 (65) | \`01000001\` | \`41\` | 1 |
| \`à\` | U+00E0 (224) | \`11000011 10100000\` | \`C3 A0\` | 2 |
| \`日\` | U+65E5 (26085) | \`11100110 10010111 10100101\` | \`E6 97 A5\` | 3 |
| \`😀\` | U+1F600 (128512) | \`11110000 10011111 10011000 10000000\` | \`F0 9F 98 80\` | 4 |
| \`🇻🇳\` (flag) | U+1F1FB U+1F1F3 (2 code point!) | (2 chuỗi 4 byte) | \`F0 9F 87 BB F0 9F 87 B3\` | 8 |

> **⚠ Trap**: cờ quốc gia \`🇻🇳\` thực ra là **2 code point** (Regional Indicator V + Regional Indicator N) ghép lại — trình hiển thị render thành 1 cờ. Tương tự nhiều emoji "gia đình" (👨‍👩‍👧) là 5-7 code point nối bằng ZWJ. Khi count "user-perceived character" còn phức tạp hơn count rune — khái niệm này gọi là **grapheme cluster**, phải dùng package ngoài như \`github.com/rivo/uniseg\`.

## 5. Rune — code point Unicode

\`\`\`go
type rune = int32  // alias chính thức trong Go
\`\`\`

Một **rune** là một **code point Unicode**. Tách bạch với byte: rune đại diện 1 "ký tự" trừu tượng, byte là đơn vị lưu trữ.

\`\`\`go
r := 'à'
fmt.Printf("%T\\n", r)      // int32
fmt.Println(r)             // 224
fmt.Printf("%U\\n", r)      // U+00E0
fmt.Printf("%c\\n", r)      // à
\`\`\`

Literal rune dùng dấu nháy đơn \`'à'\` (không phải \`"à"\` — đó là string). String literal với escape \`à\` cho code point 16-bit, \`\\U0001F600\` cho code point 32-bit.

\`\`\`go
fmt.Println('à')      // 224
fmt.Println("\\U0001F600")  // 😀
\`\`\`

> **❓ Tại sao rune = int32 mà không phải uint8/uint16?** Vì Unicode hiện đại có code point đến \`U+10FFFF\` (≈1.1M giá trị) — vượt khả năng uint16 (65k). int32 đủ rộng cho mọi code point hiện tại và tương lai. Có dấu để hỗ trợ giá trị "âm" làm sentinel (vd \`utf8.RuneError = '�'\`).

## 6. Conversion giữa string / []byte / []rune / rune

| Conversion | Ý nghĩa | Cost |
|------------|---------|------|
| \`[]byte(s)\` | Copy byte ra slice mutable | O(n) memory copy |
| \`string(b []byte)\` | Tạo string mới copy từ slice | O(n) |
| \`[]rune(s)\` | **Decode UTF-8** thành slice rune | O(n) cả time và space (mỗi rune 4 byte) |
| \`string(r []rune)\` | **Encode** mỗi rune thành UTF-8 bytes rồi nối | O(n) |
| \`string(r rune)\` | 1 rune → string UTF-8 1 ký tự | O(1) |
| \`string(b byte)\` | 1 byte → string 1 byte (≠ char nếu > 127!) | O(1) |

\`\`\`go
s := "café"
b := []byte(s)          // [99 97 102 195 169]   ← 5 byte
r := []rune(s)          // [99 97 102 233]       ← 4 rune
back := string(r)       // "café"

string('A')             // "A"     ← rune 65 → UTF-8 "A"
string(rune(0x4E2D))    // "中"    ← rune 中 → UTF-8 3 byte
\`\`\`

### ⚠ \`string(int)\` trap — kinh điển

\`\`\`go
n := 65
s := string(n)          // "A" !!!  KHÔNG phải "65"
\`\`\`

Vì khi cast \`string(<integer>)\`, Go coi integer là **code point Unicode**, không phải số. \`65\` = U+0041 = \`'A'\`. \`string(128512)\` = \`"😀"\`.

\`\`\`go
s := string(128512)     // "😀"
s := string(0)          // "\\x00"
s := string(-1)         // "�" (replacement char)
\`\`\`

Để convert **số → text đại diện cho số**, dùng \`strconv.Itoa(n)\` hoặc \`fmt.Sprintf("%d", n)\`:

\`\`\`go
strconv.Itoa(65)        // "65"
fmt.Sprintf("%d", 65)   // "65"
\`\`\`

> Go 1.15+ vet warning về \`string(int)\` literal. Go đang giữ tương thích nhưng khuyến cáo không dùng.

## 7. \`for range\` trên string — decode UTF-8 tự động

\`\`\`go
s := "xin chào"
for i, r := range s {
    fmt.Printf("byte index %d, rune %c (U+%04X), %d byte\\n", i, r, r, utf8.RuneLen(r))
}
\`\`\`

Output:

\`\`\`
byte index 0, rune x (U+0078), 1 byte
byte index 1, rune i (U+0069), 1 byte
byte index 2, rune n (U+006E), 1 byte
byte index 3, rune   (U+0020), 1 byte
byte index 4, rune c (U+0063), 1 byte
byte index 5, rune h (U+0068), 1 byte
byte index 6, rune à (U+00E0), 2 byte
byte index 8, rune o (U+006F), 1 byte
\`\`\`

> **🔁 Để ý**: \`i\` **nhảy từ 6 sang 8** vì \`à\` chiếm 2 byte. \`i\` là **byte index** trong string gốc, không phải rune index. Nếu cần rune index, dùng counter riêng.

\`\`\`go
for i, r := range s {
    // i = byte offset, r = rune đã decode
    _ = i; _ = r
}
\`\`\`

Nếu có byte không hợp lệ UTF-8, range sẽ trả \`r = utf8.RuneError = '�'\` và \`i\` advance 1 byte.

## 8. Count ký tự đúng — \`utf8.RuneCountInString\`

\`\`\`go
import "unicode/utf8"

s := "xin chào 🌍"
len(s)                         // 14 (byte)
utf8.RuneCountInString(s)      // 10 (rune)
\`\`\`

Nếu cần count rune để **validate length** (giới hạn 20 ký tự cho username, 280 cho tweet, ...), **luôn** dùng \`utf8.RuneCountInString\` chứ không \`len\`.

\`\`\`go
func ValidateName(name string) error {
    if utf8.RuneCountInString(name) > 20 {
        return errors.New("tên quá 20 ký tự")
    }
    return nil
}
\`\`\`

> **⚠ Rune count ≠ grapheme count**. \`"é"\` có thể là 1 rune (\`U+00E9\`, NFC) hoặc 2 rune (\`U+0065 U+0301\`, NFD — \`e\` + combining acute). Twitter đếm theo grapheme cluster. Trong 99% trường hợp Việt Nam, NFC + rune count đủ.

## 9. Iterate by byte vs by rune

\`\`\`go
s := "xin chào"

// SAI cho non-ASCII: index theo byte
for i := 0; i < len(s); i++ {
    fmt.Printf("%c ", s[i])   // x i n   c h Ã   o    ←  'à' bị tách thành 2 byte
}

// ĐÚNG: range trả rune đã decode
for _, r := range s {
    fmt.Printf("%c ", r)      // x i n   c h à o
}
\`\`\`

Quy tắc:

- Đang xử lý **byte-level data** (network buffer, binary protocol, ASCII): \`for i := 0; i < len(s); i++\` OK.
- Đang xử lý **text**: dùng \`for i, r := range s\`.

## 10. Package \`strings\` — top 15 function thực dùng

\`\`\`go
import "strings"
\`\`\`

| Function | Ví dụ | Output |
|----------|-------|--------|
| \`Contains(s, sub)\` | \`strings.Contains("hello world", "world")\` | \`true\` |
| \`HasPrefix(s, p)\` | \`strings.HasPrefix("https://x.com", "https://")\` | \`true\` |
| \`HasSuffix(s, p)\` | \`strings.HasSuffix("photo.jpg", ".jpg")\` | \`true\` |
| \`Index(s, sub)\` | \`strings.Index("hello", "ll")\` | \`2\` |
| \`LastIndex(s, sub)\` | \`strings.LastIndex("a.b.c", ".")\` | \`3\` |
| \`IndexByte(s, b)\` | \`strings.IndexByte("hello", 'l')\` | \`2\` |
| \`Replace(s, old, new, n)\` | \`strings.Replace("aaa", "a", "b", 2)\` | \`"bba"\` |
| \`ReplaceAll(s, old, new)\` | \`strings.ReplaceAll("a-b-c", "-", "_")\` | \`"a_b_c"\` |
| \`Split(s, sep)\` | \`strings.Split("a,b,c", ",")\` | \`["a" "b" "c"]\` |
| \`SplitN(s, sep, n)\` | \`strings.SplitN("a=b=c", "=", 2)\` | \`["a" "b=c"]\` |
| \`Join(parts, sep)\` | \`strings.Join([]string{"a","b"}, "-")\` | \`"a-b"\` |
| \`ToLower(s)\` | \`strings.ToLower("Hello")\` | \`"hello"\` |
| \`ToUpper(s)\` | \`strings.ToUpper("Hello")\` | \`"HELLO"\` |
| \`TrimSpace(s)\` | \`strings.TrimSpace("  hi  ")\` | \`"hi"\` |
| \`Trim(s, cutset)\` | \`strings.Trim("##hi##", "#")\` | \`"hi"\` |
| \`TrimPrefix(s, p)\` | \`strings.TrimPrefix("Mr. John", "Mr. ")\` | \`"John"\` |
| \`TrimSuffix(s, p)\` | \`strings.TrimSuffix("photo.jpg", ".jpg")\` | \`"photo"\` |
| \`Fields(s)\` | \`strings.Fields("  a  b\\tc\\n")\` | \`["a" "b" "c"]\` (split mọi whitespace) |

> **💡 Khi nào dùng \`Fields\` vs \`Split(s, " ")\`?** \`Split(" a  b ", " ")\` cho \`["", "a", "", "b", ""]\` (kẹp empty). \`Fields\` thông minh hơn: bỏ mọi run whitespace, không sinh empty. Parse input từ user nên dùng \`Fields\`.

### Ví dụ thực tế

\`\`\`go
// Slug URL từ tên tiếng Việt (rough — chưa unaccent)
title := "  Hello, World!  "
slug := strings.ToLower(strings.TrimSpace(title))
slug = strings.ReplaceAll(slug, " ", "-")
slug = strings.ReplaceAll(slug, ",", "")
slug = strings.ReplaceAll(slug, "!", "")
// → "hello-world"

// Parse log line "2024-01-15 ERROR Connection refused"
parts := strings.SplitN(line, " ", 3)
date, level, msg := parts[0], parts[1], parts[2]
\`\`\`

## 11. \`strings.Builder\` — concat hiệu quả

### Vấn đề: concat bằng \`+\` trong loop

\`\`\`go
// CHẬM — quadratic
var s string
for i := 0; i < 1000; i++ {
    s = s + "x"  // mỗi lần allocate string mới copy toàn bộ s cũ
}
\`\`\`

Sau N iteration: tổng work = \`1 + 2 + 3 + ... + N = N(N+1)/2 = O(N²)\`. Với N=10k, đã ~50M byte copy.

### Giải pháp: \`strings.Builder\`

\`\`\`go
import "strings"

var b strings.Builder
for i := 0; i < 1000; i++ {
    b.WriteString("x")     // append vào buffer nội bộ, grow nếu cần
}
s := b.String()            // chuyển buffer → string, 1 lần allocate cuối
\`\`\`

\`Builder\` duy trì \`[]byte\` buffer growable (giống \`append\`). Mỗi \`WriteString\` amortized O(1). Total O(N).

### Benchmark thực tế (1000 concat)

| Method | Time (1000 concat) | Allocations |
|--------|-------------------:|------------:|
| \`s = s + x\` | ~1.5 ms | 1000 |
| \`strings.Builder\` | ~15 μs | ~10 |
| \`[]byte\` rồi \`string(b)\` | ~10 μs | ~10 |
| \`strings.Join\` (nếu có sẵn slice) | ~5 μs | 1 |

Builder nhanh hơn \`+\` **~100 lần**. Với N=100k, khác biệt là vài giây vs vài ms.

> **📝 Quy tắc**: chỉ dùng \`+\` cho concat **biết trước số lượng** và **nhỏ** (≤5 phần tử). Trong loop, luôn \`Builder\` hoặc \`Join\`. Nếu input đã là \`[]string\`, \`strings.Join\` là tối ưu nhất (chỉ 1 allocation).

### Builder methods

\`\`\`go
b.WriteString(s string)
b.WriteByte(c byte)
b.WriteRune(r rune)        // tự encode UTF-8
b.Write(p []byte)
b.Len() int
b.Reset()                  // tái dùng builder
\`\`\`

## 12. Package \`strconv\` — convert số ↔ string

| Function | Mục đích | Ví dụ |
|----------|----------|-------|
| \`Itoa(int)\` | int → string | \`strconv.Itoa(42)\` → \`"42"\` |
| \`Atoi(string)\` | string → int (có error) | \`strconv.Atoi("42")\` → \`42, nil\` |
| \`FormatFloat(f, fmt, prec, bitSize)\` | float → string | \`strconv.FormatFloat(3.14, 'f', 2, 64)\` → \`"3.14"\` |
| \`ParseFloat(s, bitSize)\` | string → float | \`strconv.ParseFloat("3.14", 64)\` → \`3.14, nil\` |
| \`FormatBool(b)\` | bool → string | \`strconv.FormatBool(true)\` → \`"true"\` |
| \`ParseBool(s)\` | string → bool | \`strconv.ParseBool("true")\` → \`true, nil\` |
| \`Quote(s)\` | string → string với escape & dấu ngoặc | \`strconv.Quote("hi\\n")\` → \`"\\"hi\\\\n\\""\` |

### \`strconv\` vs \`fmt.Sprintf\`

\`\`\`go
// strconv — nhanh, đơn giản
s := strconv.Itoa(42)

// fmt.Sprintf — linh hoạt hơn (template), CHẬM hơn ~5-10x
s := fmt.Sprintf("%d", 42)
\`\`\`

\`fmt.Sprintf\` dùng reflection để xử lý \`%d/%s/%v/...\`. Khi convert 1 giá trị đơn lẻ, dùng \`strconv\` rẻ hơn. Khi template phức tạp (\`"User %s, age %d, score %.2f"\`), \`Sprintf\` rõ ràng hơn dù chậm.

> **Rule of thumb**: hot path → \`strconv\`. Build message phức tạp → \`Sprintf\`.

## 13. Package \`unicode\` — kiểm tra phân loại rune

\`\`\`go
import "unicode"

unicode.IsDigit('5')        // true
unicode.IsDigit('५')        // true (Devanagari 5 — vẫn là digit Unicode)
unicode.IsLetter('a')       // true
unicode.IsLetter('日')       // true
unicode.IsSpace(' ')        // true
unicode.IsSpace('\\t')       // true
unicode.IsUpper('A')        // true
unicode.IsLower('a')        // true
unicode.IsPunct(',')        // true

unicode.ToUpper('a')        // 'A' (rune → rune)
unicode.ToLower('Ω')        // 'ω'
\`\`\`

Khác \`strings.ToUpper\` (làm việc trên string) — \`unicode.ToUpper\` làm việc trên **1 rune**. Dùng khi iterate rune-by-rune.

\`\`\`go
// Đếm số digit trong string (đúng cho Unicode)
n := 0
for _, r := range s {
    if unicode.IsDigit(r) {
        n++
    }
}
\`\`\`

## 14. Common gotcha

| Gotcha | Tác hại | Cách đúng |
|--------|---------|-----------|
| \`s = s + "x"\` trong loop | Quadratic, có thể chậm seconds với N lớn | \`strings.Builder\` hoặc \`[]byte\` |
| \`for i := 0; i < len(s); i++\` rồi \`s[i]\` để "lấy ký tự" | Cắt giữa multi-byte char, ra rác | \`for _, r := range s\` |
| \`len(s) > 20\` để giới hạn ký tự | Reject false positive với non-ASCII | \`utf8.RuneCountInString(s) > 20\` |
| \`string(num)\` để convert số → text | Ra ký tự code point, không ra text số | \`strconv.Itoa(num)\` |
| \`if s[0] == 'à'\` (so sánh byte với non-ASCII rune) | Compile error hoặc kết quả sai | \`r, _ := utf8.DecodeRuneInString(s); r == 'à'\` |
| Modify rune trong string | Compile error | \`[]rune(s)\` → modify → \`string(r)\` |
| \`strings.Split(s, "")\` để split thành chars | Cho slice byte, sai cho non-ASCII | \`[]rune(s)\` |

## 📝 Tóm tắt

1. **String = byte sequence read-only**. \`len(s)\` = số byte, \`s[i]\` = byte.
2. **UTF-8**: 1 code point Unicode = 1-4 byte. ASCII fit 1 byte.
3. **Rune = int32 = code point Unicode**. Một ký tự bạn nhìn thấy.
4. **Conversion**: \`[]byte(s)\`, \`string(b)\`, \`[]rune(s)\`, \`string(r)\`. Cẩn thận \`string(int)\` trap.
5. **Iterate**: \`for i, r := range s\` để decode UTF-8 đúng. \`i\` là byte index.
6. **Count ký tự**: \`utf8.RuneCountInString(s)\`, **không** \`len(s)\`.
7. **Concat hot path**: \`strings.Builder\`, không \`+\` trong loop.
8. **Convert số/text**: \`strconv.Itoa\` / \`strconv.Atoi\`. \`fmt.Sprintf\` chỉ khi cần template.

---

## Bài tập

> Làm trước khi xem lời giải. Mỗi bài có hint nếu bí.

### BT1 — Validate tên đúng

Viết \`ValidateName(name string) error\` reject nếu tên < 2 hoặc > 20 **ký tự** (rune, không byte). Test với \`"Lê"\`, \`"Nguyễn Văn Hoàng Anh Đức"\`, \`"😀😀"\`.

### BT2 — Reverse string giữ multi-byte char

Viết \`Reverse(s string) string\` đảo ngược ký tự (rune), không phá multi-byte char.
- Input \`"hello"\` → \`"olleh"\`.
- Input \`"héllo"\` → \`"olléh"\`.
- Input \`"xin chào 🌍"\` → \`"🌍 oàhc nix"\`.

### BT3 — Palindrome ignore case + space

\`IsPalindrome(s string) bool\`. So sánh không phân biệt hoa thường, bỏ qua space.
- \`"A man a plan a canal Panama"\` → \`true\`.
- \`"Tôi yêu Việt Nam"\` → \`false\`.
- \`"abccba"\` → \`true\`.

### BT4 — Parse CSV line (cơ bản, có quote)

\`ParseCSV(line string) []string\` split theo \`,\` nhưng nếu field bọc trong \`"..."\` thì giữ nguyên dấu phẩy bên trong.
- \`a,b,c\` → \`[a b c]\`.
- \`a,"b,c",d\` → \`[a b,c d]\`.
- \`"hello","world"\` → \`[hello world]\`.
- Không cần xử lý escape \`""\` bên trong quote.

### BT5 — Số có dấu phẩy → int

\`ParseNumber(s string) (int, error)\` accept \`"1,234,567"\`, \`"1234567"\`, \`"-1,000"\` → trả int tương ứng.

### BT6 — Template engine mini

\`Render(tmpl string, data map[string]string) string\` thay thế \`$name\` bằng \`data["name"]\`.
- \`Render("Hello, $name! You are $age.", {"name": "Anh", "age": "25"})\` → \`"Hello, Anh! You are 25."\`.
- Nếu key không tồn tại, giữ nguyên \`$name\`.

---

## Lời giải chi tiết

### BT1 — ValidateName

\`\`\`go
import (
    "errors"
    "unicode/utf8"
)

func ValidateName(name string) error {
    n := utf8.RuneCountInString(name)
    if n < 2 {
        return errors.New("tên quá ngắn (cần ≥ 2 ký tự)")
    }
    if n > 20 {
        return errors.New("tên quá dài (cần ≤ 20 ký tự)")
    }
    return nil
}
\`\`\`

**Phân tích**: \`len("Lê")\` = 3 (byte), nhưng \`utf8.RuneCountInString("Lê")\` = 2 (rune) → đúng "2 ký tự". \`utf8.RuneCountInString("😀😀")\` = 2 (mỗi emoji 1 rune, dù 4 byte). Độ phức tạp O(n) byte — vẫn tốt cho name ngắn.

### BT2 — Reverse string

\`\`\`go
func Reverse(s string) string {
    r := []rune(s)               // decode UTF-8 → slice rune
    for i, j := 0, len(r)-1; i < j; i, j = i+1, j-1 {
        r[i], r[j] = r[j], r[i]
    }
    return string(r)             // encode rune → UTF-8
}
\`\`\`

**Phân tích**: chuyển sang \`[]rune\` để swap đúng đơn vị "ký tự", không cắt giữa multi-byte. Walk-through \`"héllo"\`:
- \`[]rune("héllo")\` = \`['h', 'é', 'l', 'l', 'o']\` (5 rune).
- Sau swap: \`['o', 'l', 'l', 'é', 'h']\`.
- \`string(...)\` encode lại UTF-8: \`"olléh"\` (6 byte vì \`é\` 2 byte).

Độ phức tạp O(n) time + O(n) space (slice rune).

### BT3 — Palindrome

\`\`\`go
import (
    "strings"
    "unicode"
)

func IsPalindrome(s string) bool {
    // Bước 1: chuẩn hoá — lowercase, bỏ space
    var b strings.Builder
    for _, r := range s {
        if !unicode.IsSpace(r) {
            b.WriteRune(unicode.ToLower(r))
        }
    }
    norm := b.String()

    // Bước 2: so sánh đầu-cuối trên rune
    r := []rune(norm)
    for i, j := 0, len(r)-1; i < j; i, j = i+1, j-1 {
        if r[i] != r[j] {
            return false
        }
    }
    return true
}
\`\`\`

**Walk-through \`"A man a plan a canal Panama"\`**:
- Sau chuẩn hoá: \`"amanaplanacanalpanama"\` (21 ký tự).
- So sánh: \`a==a\`, \`m==m\`, \`a==a\`, ..., giữa là \`n\`. Tất cả khớp → \`true\`.

**\`"Tôi yêu Việt Nam"\`** → chuẩn hoá \`"tôiyêuviệtnam"\`, đảo ngược \`"mantệivuêyiôt"\` ≠ → \`false\`.

Builder dùng để chuẩn hoá hiệu quả; rune slice để so sánh đối xứng đúng đơn vị.

### BT4 — Parse CSV (có quote)

\`\`\`go
import "strings"

func ParseCSV(line string) []string {
    var fields []string
    var b strings.Builder
    inQuote := false

    for _, r := range line {
        switch {
        case r == '"':
            inQuote = !inQuote                 // toggle quote mode
        case r == ',' && !inQuote:
            fields = append(fields, b.String())
            b.Reset()
        default:
            b.WriteRune(r)
        }
    }
    fields = append(fields, b.String())        // field cuối
    return fields
}
\`\`\`

**Walk-through \`a,"b,c",d\`**:

| Rune | inQuote | Action | Builder | fields |
|------|---------|--------|---------|--------|
| \`a\` | false | write | \`a\` | \`[]\` |
| \`,\` | false | flush | \`\` | \`[a]\` |
| \`"\` | → true | toggle | \`\` | \`[a]\` |
| \`b\` | true | write | \`b\` | \`[a]\` |
| \`,\` | true | write (vì inQuote) | \`b,\` | \`[a]\` |
| \`c\` | true | write | \`b,c\` | \`[a]\` |
| \`"\` | → false | toggle | \`b,c\` | \`[a]\` |
| \`,\` | false | flush | \`\` | \`[a b,c]\` |
| \`d\` | false | write | \`d\` | \`[a b,c]\` |
| end | | flush cuối | | \`[a b,c d]\` |

> **Cảnh báo**: đây là parser **toy**. CSV thật có nhiều edge case: \`""\` escape thành \`"\` bên trong field quote, newline trong field quote, ... Dùng \`encoding/csv\` (std lib) cho production.

### BT5 — ParseNumber

\`\`\`go
import (
    "strconv"
    "strings"
)

func ParseNumber(s string) (int, error) {
    clean := strings.ReplaceAll(s, ",", "")
    return strconv.Atoi(clean)
}
\`\`\`

**Phân tích**: chỉ cần bỏ mọi dấu phẩy rồi \`Atoi\`. \`"1,234,567"\` → \`"1234567"\` → \`1234567\`. \`"-1,000"\` → \`"-1000"\` → \`-1000\`. \`Atoi\` đã handle dấu âm.

**Edge case không xử lý**: dấu phẩy đặt sai vị trí (\`"1,2,3"\` vẫn parse được = 123, có thể chấp nhận hoặc reject tuỳ requirement). Số quá lớn → \`Atoi\` trả error overflow.

### BT6 — Template engine

\`\`\`go
import "strings"

func Render(tmpl string, data map[string]string) string {
    var b strings.Builder
    i := 0
    for i < len(tmpl) {
        if tmpl[i] == '$' {
            // tìm cuối identifier
            j := i + 1
            for j < len(tmpl) && isIdentChar(tmpl[j]) {
                j++
            }
            key := tmpl[i+1 : j]
            if val, ok := data[key]; ok {
                b.WriteString(val)
            } else {
                b.WriteString(tmpl[i:j])     // giữ nguyên $key
            }
            i = j
        } else {
            b.WriteByte(tmpl[i])
            i++
        }
    }
    return b.String()
}

func isIdentChar(c byte) bool {
    return (c >= 'a' && c <= 'z') ||
        (c >= 'A' && c <= 'Z') ||
        (c >= '0' && c <= '9') ||
        c == '_'
}
\`\`\`

**Walk-through \`Render("Hello, $name! You are $age.", {"name": "Anh", "age": "25"})\`**:

- \`i=0..6\`: copy \`"Hello, "\`.
- \`i=7\`: gặp \`$\`. Scan \`$name\` đến \`i=12\`. \`data["name"] = "Anh"\` → write \`"Anh"\`. \`i=12\`.
- \`i=12..21\`: copy \`"! You are "\`.
- \`i=22\`: gặp \`$\`. Scan \`$age\` đến \`i=26\`. \`data["age"] = "25"\` → write \`"25"\`. \`i=26\`.
- \`i=26\`: copy \`"."\`.
- → \`"Hello, Anh! You are 25."\` ✓

> **Lưu ý**: dùng byte iteration vì identifier chỉ chứa ASCII (a-z, A-Z, 0-9, _) — không bị lỗi UTF-8. Value \`data[key]\` có thể chứa Unicode, nhưng \`b.WriteString\` handle nguyên string không cần care encoding.

Độ phức tạp O(n) trên độ dài template (mỗi byte thăm đúng 1 lần).

---

## Code & Minh hoạ

- Solutions: hiện chưa có \`solutions.go\` riêng. Nếu cần code Go full chạy được, yêu cầu Claude tạo.
- Visualization: [visualization.html](./visualization.html) — 3 module tương tác:
  1. **Byte vs Rune**: nhập string, xem byte index (multi-byte char span nhiều cell) vs rune index.
  2. **UTF-8 Encoder**: nhập ký tự bất kỳ, xem code point + byte sequence binary.
  3. **Strings Playground**: thử các function \`Split/Replace/Trim/Index/...\` với input của bạn.

## Bài tiếp theo

→ [Lesson 15 — Struct & Method](../lesson-15-struct-method/) — gom field lại thành kiểu, gắn method, embedding.

## Tham khảo

- ["Strings, bytes, runes and characters in Go" — Go Blog](https://go.dev/blog/strings) — Rob Pike viết, đọc kỹ.
- [UTF-8 và Unicode FAQ](https://www.cl.cam.ac.uk/~mgk25/unicode.html).
- \`pkg/strings\`, \`pkg/strconv\`, \`pkg/unicode\`, \`pkg/unicode/utf8\` — std lib.
`;
