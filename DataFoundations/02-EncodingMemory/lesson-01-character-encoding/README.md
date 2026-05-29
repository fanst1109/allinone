# Lesson 01 — Character Encoding (mã hóa ký tự)

> **Nhóm 2 — Encoding & Memory · DataFoundations**

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Phân biệt ASCII, Latin-1, Unicode code point, và UTF-8 encoding.
- Encode/decode ký tự UTF-8 bằng tay (1 đến 4 byte).
- Giải thích tại sao `"café"` có 4 ký tự nhưng có thể chiếm 5 byte.
- Hiểu UTF-16, BOM, và vấn đề endianness trong text.
- Biết NFC vs NFD normalization là gì và khi nào cần.

## Kiến thức tiền đề

- [Lesson 01 — Binary & Hex](../../01-NumberRepresentation/lesson-01-binary-hex/README.md): đọc số hex.
- [Lesson 03 — Floating-Point](../../01-NumberRepresentation/lesson-03-floating-point/README.md): hiểu khái niệm bit field.

---

## 1. Vấn đề: máy tính lưu chữ như thế nào?

💡 **Trực giác**: Máy tính chỉ hiểu số. Chữ `A` thực ra là số `65`. Cả thế giới cần thống nhất: **số nào** ứng với **ký tự nào** — đó gọi là **bảng mã ký tự (character encoding)**.

Lịch sử đi từ nhỏ đến lớn:
- 1963: **ASCII** — 7 bit, 128 ký tự, chỉ cho tiếng Anh.
- 1987: **Latin-1** (ISO 8859-1) — 8 bit, 256 ký tự, thêm tiếng Tây Âu.
- 1991: **Unicode** — tập hợp *tất cả* ký tự con người từng dùng. Hiện có >150.000 code point.
- **UTF-8** — cách *mã hóa* Unicode thành byte, backward compatible với ASCII.

---

## 2. ASCII (American Standard Code for Information Interchange)

### 2.1. Cấu trúc

ASCII dùng **7 bit** → 2⁷ = 128 code point (0–127):

| Phạm vi | Loại | Ví dụ |
|---------|------|-------|
| 0–31 | Control characters | `NUL` (0), `TAB` (9), `LF` (10), `CR` (13) |
| 32–47 | Dấu câu & space | ` ` (32), `!` (33), `"` (34), `#` (35) |
| 48–57 | Chữ số 0-9 | `0`=48, `1`=49, ..., `9`=57 |
| 65–90 | Chữ hoa A-Z | `A`=65, `B`=66, ..., `Z`=90 |
| 97–122 | Chữ thường a-z | `a`=97, `b`=98, ..., `z`=122 |
| 127 | DEL | Xóa (control) |

❓ **Câu hỏi tự nhiên**:
- *"Vì sao `A`=65 và `a`=97?"* — Chênh nhau đúng 32 = `0x20` = bit thứ 5. Rất tiện: `'a' - 'A' = 32`. Chuyển uppercase → lowercase chỉ cần `OR 0x20`, lowercase → uppercase chỉ cần `AND ~0x20`.
- *"Tiếng Việt không có trong ASCII?"* — Đúng. Và đây là lý do Unicode ra đời.

### 2.2. Latin-1 (ISO 8859-1)

Mở rộng ASCII lên **8 bit** (256 ký tự). Code 0–127 giống hệt ASCII. Code 128–255 thêm ký tự Tây Âu: `é` (233), `ñ` (241), `ü` (252)...

Vấn đề: Latin-1 chỉ cover ~15 ngôn ngữ Châu Âu. Tiếng Việt, tiếng Nhật, tiếng Ả Rập đều cần chuẩn khác.

---

## 3. Unicode — tập hợp mọi ký tự

### 3.1. Code point là gì?

Unicode định nghĩa một **không gian số** (code space): từ `U+0000` đến `U+10FFFF` — tổng cộng 1.114.112 giá trị. Mỗi giá trị gọi là **code point** (điểm mã).

💡 **Trực giác**: Hãy nghĩ Unicode như một cuốn từ điển khổng lồ: "Ký tự số **128,013** là 🌍 (quả địa cầu Châu Âu-Châu Phi)". Code point chỉ là **số thứ tự trong cuốn từ điển đó** — nó không nói gì về cách lưu trong máy tính.

```
U+0041 = 'A'
U+00E9 = 'é'
U+4E2D = '中' (Hán tự: trung)
U+1F30D = '🌍'
```

### 3.2. Code point ≠ Encoding

Quan trọng: **Unicode chỉ gán số cho ký tự**. Còn số đó lưu trong bộ nhớ như thế nào là việc của **encoding**:
- UTF-8: lưu 1–4 byte, variable-length.
- UTF-16: lưu 2 hoặc 4 byte.
- UTF-32: lưu đúng 4 byte cho mọi ký tự.

---

## 4. UTF-8 — encoding phổ biến nhất hiện nay

### 4.1. Quy tắc encoding

UTF-8 dùng **1–4 byte** tùy code point. Bit đầu của mỗi byte cho biết vai trò:

| Code point range | Byte 1 | Byte 2 | Byte 3 | Byte 4 |
|-----------------|--------|--------|--------|--------|
| U+0000–U+007F | `0xxxxxxx` | — | — | — |
| U+0080–U+07FF | `110xxxxx` | `10xxxxxx` | — | — |
| U+0800–U+FFFF | `1110xxxx` | `10xxxxxx` | `10xxxxxx` | — |
| U+10000–U+10FFFF | `11110xxx` | `10xxxxxx` | `10xxxxxx` | `10xxxxxx` |

`x` là các bit của code point, điền từ phải sang trái.

**Tại sao prefix `10xxxxxx` cho byte tiếp theo?**
Byte tiếp theo luôn bắt đầu bằng `10` → dù bắt đầu đọc từ giữa chuỗi, ta vẫn phân biệt được đây là "byte trong giữa" (continuation byte) hay "byte đầu" (leading byte). UTF-8 là **self-synchronizing**.

### 4.2. Tại sao UTF-8 backward compatible với ASCII?

Code point 0–127 chỉ dùng 1 byte với bit đầu = 0 → giống hệt ASCII. File ASCII thuần → file UTF-8 hợp lệ, không cần chuyển đổi.

⚠ **Lỗi thường gặp**:
- Đọc file UTF-8 bằng Latin-1 → ký tự multi-byte bị split thành 2 "ký tự lạ".
- Truncate string UTF-8 ở byte thứ n mà không kiểm tra → có thể cắt đứt giữa sequence → invalid UTF-8.
- Đếm `len(s)` trong Go trả về số **byte**, không phải số **ký tự Unicode**.

```go
s := "café"
fmt.Println(len(s))         // 5 (byte: c=1, a=1, f=1, é=2)
fmt.Println(len([]rune(s))) // 4 (ký tự Unicode)
```

---

## 5. Walk-through encode 5 ký tự

### Ví dụ 1: `A` (U+0041) → UTF-8

Code point: `0x41` = `65` = `0b01000001` → nằm trong U+0000–U+007F → **1 byte**.

```
0xxxxxxx
01000001  = 0x41
```

UTF-8 bytes: `41` — giống hệt ASCII.

---

### Ví dụ 2: `é` (U+00E9) → UTF-8

Code point: `0xE9` = `233` = nằm trong U+0080–U+07FF → **2 byte**.

Pattern: `110xxxxx 10xxxxxx`

Điền 11 bit của `0xE9 = 11101001`:
```
Code point bits: 000 11101001
                 ^^^-- 5 bit vào byte 1 -- ^^^^^^-- 6 bit vào byte 2
Byte 1: 110 00011 = 0xC3
Byte 2: 10 101001 = 0xA9
```

UTF-8: `C3 A9`

Verify: `0xC3 = 11000011` → leading `110` → 2-byte sequence. `0xA9 = 10101001` → leading `10` → continuation. Ghép `00011` + `101001` = `11101001` = 0xE9 ✓

---

### Ví dụ 3: `中` (U+4E2D) → UTF-8

Code point: `0x4E2D` = `19,245` = nằm trong U+0800–U+FFFF → **3 byte**.

Pattern: `1110xxxx 10xxxxxx 10xxxxxx`

`0x4E2D` = `0100 1110 0010 1101` (16 bit) → dùng đủ 16 bit:
```
xxxx   xxxxxx  xxxxxx
0100   111000  101101
Byte1: 1110 0100 = 0xE4
Byte2: 10 111000 = 0xB8
Byte3: 10 101101 = 0xAD
```

UTF-8: `E4 B8 AD`

---

### Ví dụ 4: `🌍` (U+1F30D) → UTF-8

Code point: `0x1F30D` = `127,757` = nằm trong U+10000–U+10FFFF → **4 byte**.

Pattern: `11110xxx 10xxxxxx 10xxxxxx 10xxxxxx`

`0x1F30D` = `0 0001 1111 0011 0000 1101` (21 bit):
```
xxx    xxxxxx  xxxxxx  xxxxxx
000    011111  001100  001101
Byte1: 11110 000 = 0xF0
Byte2: 10 011111 = 0x9F
Byte3: 10 001100 = 0x8C
Byte4: 10 001101 = 0x8D
```

UTF-8: `F0 9F 8C 8D`

---

### Ví dụ 5: `"café"` — đếm bytes vs chars

| Ký tự | Code point | UTF-8 bytes | Số byte |
|-------|-----------|-------------|---------|
| c | U+0063 | `63` | 1 |
| a | U+0061 | `61` | 1 |
| f | U+0066 | `66` | 1 |
| é | U+00E9 | `C3 A9` | 2 |

Tổng: 4 ký tự, **5 byte** UTF-8. `len("café") = 5` trong Go/Python/C (đếm byte).

---

## 6. UTF-16 và BOM

**UTF-16** dùng 2 hoặc 4 byte:
- U+0000–U+FFFF: 2 byte (Basic Multilingual Plane).
- U+10000+: **surrogate pair** — 2 cặp × 2 byte = 4 byte.

**Vấn đề endianness**: 2 byte `0x00 0x41` hay `0x41 0x00` cho ký tự `A`?
- **UTF-16 BE** (big endian): `00 41`
- **UTF-16 LE** (little endian): `41 00`

**BOM (Byte Order Mark)**: ký tự U+FEFF viết ở đầu file để khai báo byte order.
- UTF-16 LE BOM: `FF FE`
- UTF-16 BE BOM: `FE FF`
- UTF-8 BOM (không cần nhưng một số editor thêm): `EF BB BF`

⚠ **UTF-8 BOM gây lỗi**: Unix tools và nhiều parser không expect BOM trong UTF-8 → sinh lỗi. Tránh lưu file với UTF-8 BOM.

---

## 7. Normalization — NFC vs NFD

**Vấn đề**: ký tự `é` có thể biểu diễn theo 2 cách khác nhau trong Unicode:
1. **Composed (NFC)**: U+00E9 — một code point duy nhất "é".
2. **Decomposed (NFD)**: U+0065 U+0301 — hai code points: `e` + combining accent `̀ `.

Cả hai nhìn **giống hệt nhau** trên màn hình, nhưng **bytes khác nhau** → so sánh chuỗi raw fail!

```
NFC "café" bytes: 63 61 66 C3A9          (5 bytes)
NFD "café" bytes: 63 61 66 65 CC81       (6 bytes, é = e + combining)
NFC == NFD?  → FALSE (bytes khác)
```

**Giải pháp**: normalize về cùng form trước khi so sánh.

```go
import "golang.org/x/text/unicode/norm"
a := norm.NFC.String("café") // NFC form
b := norm.NFC.String(input)
if a == b { ... } // an toàn
```

---

## 8. So sánh UTF-8 vs UTF-16 vs UTF-32

| Encoding | Bytes/char ASCII | Bytes/char CJK | Bytes/char Emoji | Đặc điểm |
|----------|-----------------|----------------|------------------|-----------|
| UTF-8 | 1 | 3 | 4 | Variable, ASCII compat |
| UTF-16 | 2 | 2 | 4 (surr. pair) | Variable, BOM cần |
| UTF-32 | 4 | 4 | 4 | Fixed, dễ index |

UTF-8 chiếm ưu thế web (>97% trang web) vì tiết kiệm cho text ASCII-heavy và backward compat.

---

## 9. Bài tập

**Bài 1**: Encode `"Go"` (2 ký tự ASCII) sang UTF-8. Cho kết quả dạng hex.

**Bài 2**: Decode bytes `E4 B8 AD E6 96 87` sang Unicode code point và ký tự.

**Bài 3**: Chuỗi Go: `s := "Xin chào"`. `len(s)` trả về bao nhiêu? `len([]rune(s))` trả về bao nhiêu? Giải thích tại sao.

**Bài 4**: Giải thích tại sao so sánh string sau có thể fail và cách sửa:
```go
userInput := "é"  // e + combining accent
stored    := "é"         // é precomposed
if userInput == stored { fmt.Println("match") }
```

---

## 10. Lời giải chi tiết

### Bài 1: Encode "Go"

`G` = U+0047 = 71 → range U+0000–U+007F → 1 byte: `0x47`
`o` = U+006F = 111 → range U+0000–U+007F → 1 byte: `0x6F`

UTF-8: `47 6F`

---

### Bài 2: Decode `E4 B8 AD E6 96 87`

**Bytes E4 B8 AD**:
- `E4` = `11100100` → leading `1110` → 3-byte sequence
- `B8` = `10111000` → continuation, payload `111000`
- `AD` = `10101101` → continuation, payload `101101`
- Code point bits: `0100` + `111000` + `101101` = `0100111000101101` = 0x4E2D
- → U+4E2D = **`中`**

**Bytes E6 96 87**:
- `E6` = `11100110` → 3-byte
- `96` = `10010110` → payload `010110`
- `87` = `10000111` → payload `000111`
- Code point: `0110` + `010110` + `000111` = `0110010110000111` = 0x6587
- → U+6587 = **`文`**

Kết quả: **中文** (tiếng Trung).

---

### Bài 3: "Xin chào"

```
X  = U+0058 = 1 byte
i  = U+0069 = 1 byte
n  = U+006E = 1 byte
   = U+0020 = 1 byte (space)
c  = U+0063 = 1 byte
h  = U+0068 = 1 byte
à  = U+00E0 = 2 byte (0xC3 0xA0)
o  = U+006F = 1 byte
```

`len(s) = 9` (byte: 7 × 1 + 1 × 2 = 9)
`len([]rune(s)) = 8` (ký tự Unicode)

---

### Bài 4: NFC vs NFD mismatch

`"é"` = `e` + combining acute accent = NFD.
`"é"` = `é` precomposed = NFC.

Hai chuỗi **nhìn giống nhau** nhưng bytes khác → `==` trả về `false`.

**Sửa**:
```go
import "golang.org/x/text/unicode/norm"
if norm.NFC.String(userInput) == norm.NFC.String(stored) {
    fmt.Println("match")  // true
}
```

Hoặc normalize về NFD rồi so sánh — miễn là **cùng form**.

---

## Liên kết

- Bài trước: [N1-L03 — Floating-Point](../../01-NumberRepresentation/lesson-03-floating-point/README.md)
- Bài tiếp: [N2-L02 — Endianness & Memory Layout](../lesson-02-endianness-memory/README.md)
- Trang chính nhóm: [02-EncodingMemory](../index.html)
- [visualization.html](./visualization.html)
