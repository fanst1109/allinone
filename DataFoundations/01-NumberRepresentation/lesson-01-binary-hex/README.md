# Lesson 01 — Binary & Hex (hệ nhị phân và hệ thập lục phân)

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Hiểu hệ cơ số (number base) tổng quát, và cụ thể binary (cơ số 2), hex (cơ số 16).
- Chuyển đổi qua lại giữa decimal ↔ binary ↔ hex bằng tay.
- Biết máy tính lưu số âm bằng **two's complement** và vì sao lại chọn cách đó.
- Hiểu giới hạn của `int8`, `int16`, `int32`, `int64` trong Go, và overflow xảy ra thế nào.
- Phân biệt bit / byte / KB / MB / GB và đọc kích thước dữ liệu đúng.

## Kiến thức tiền đề

- Số tự nhiên, phép cộng/trừ/nhân/chia cơ bản.
- Không cần biết lập trình trước, nhưng có biết Go thì các ví dụ code dễ chạy thử.

## 1. Vì sao cần hiểu binary và hex?

Khi bạn viết `x := 42` trong Go, **trong RAM không có chữ số `4` và `2`** — chỉ có các bit `0` và `1`. Cụ thể nếu `x` là `int64` thì RAM lưu:

```
00000000 00000000 00000000 00000000 00000000 00000000 00000000 00101010
```

8 nhóm 8 bit = 64 bit = 8 byte. Số `42` ở dạng nhị phân là `101010`, phần đầu là các bit `0` để cho đủ 64 chỗ.

Khi bạn nghe các phát biểu sau:

- *"`int64` chứa được số tới khoảng 9.2 · 10¹⁸"*
- *"hash của chuỗi cho ra một số `uint64`"*
- *"địa chỉ bộ nhớ `0x7fff5fbff7a0`"*
- *"file PNG bắt đầu bằng magic bytes `89 50 4E 47`"*
- *"đặt cờ readonly = bit thứ 3 của permission"*

→ Đằng sau tất cả là **biểu diễn nhị phân** và **biểu diễn hex** của dữ liệu. Hiểu hai hệ này là điều kiện cần để đọc/viết các đoạn code thao tác trực tiếp với bit.

## 2. Hệ cơ số là gì?

Một số được viết bằng **các chữ số** (digit) và **vị trí**. Trong **hệ cơ số b**, mỗi vị trí có giá trị là một lũy thừa của `b`, đọc từ phải sang trái: `b⁰, b¹, b², ...`

Ví dụ với hệ thập phân (b = 10), số `2025` đọc là:

```
  2       0       2       5
×10³   ×10²   ×10¹   ×10⁰
= 2000  + 0    + 20   + 5     = 2025
```

Các chữ số trong hệ cơ số `b` chạy từ `0` đến `b-1`. Hệ 10 có 10 chữ số `0..9`. Hệ 2 có 2 chữ số `0..1`. Hệ 16 có 16 "chữ số" — nhưng chữ số chỉ có 10 nên dùng thêm `A..F` cho `10..15`.

## 3. Hệ nhị phân (binary, base 2)

### 3.1. Cách đọc

Mỗi vị trí có giá trị là một lũy thừa của 2. Đọc số `101010₂`:

```
 1     0     1     0     1     0
×2⁵  ×2⁴  ×2³  ×2²  ×2¹  ×2⁰
=32  + 0  + 8  + 0  + 2  + 0    = 42
```

Bảng lũy thừa của 2 nên thuộc (sẽ dùng rất nhiều):

| Mũ | Giá trị | Ghi nhớ |
| --- | --- | --- |
| 2⁰ | 1 | |
| 2¹ | 2 | |
| 2² | 4 | |
| 2³ | 8 | |
| 2⁴ | 16 | |
| 2⁵ | 32 | |
| 2⁶ | 64 | |
| 2⁷ | 128 | |
| 2⁸ | 256 | 1 byte chứa được 256 giá trị (0..255) |
| 2¹⁰ | 1024 | ≈ "1 K" |
| 2¹⁶ | 65 536 | giới hạn của `uint16` |
| 2²⁰ | ≈ 10⁶ | ≈ "1 M" |
| 2³⁰ | ≈ 10⁹ | ≈ "1 G" |
| 2³² | ≈ 4.3 · 10⁹ | giới hạn của `uint32` |
| 2⁶³ | ≈ 9.2 · 10¹⁸ | giới hạn dương của `int64` |
| 2⁶⁴ | ≈ 1.8 · 10¹⁹ | giới hạn của `uint64` |

**Mẹo nhớ "≈"**: `2¹⁰ = 1024 ≈ 10³`, nên cứ `2¹⁰ⁿ ≈ 10³ⁿ`. Trong thực tế người ta dùng xấp xỉ này khi nói "máy 16 GB RAM" (đúng ra là `16 · 2³⁰ ≈ 1.7 · 10¹⁰` bytes).

### 3.2. Chuyển từ decimal sang binary

Cách dễ nhớ: **chia 2 lấy dư**, ghi dư từ dưới lên.

Ví dụ chuyển `42` sang binary:

```
42 ÷ 2 = 21 dư 0   ← bit thấp nhất (2⁰)
21 ÷ 2 = 10 dư 1
10 ÷ 2 =  5 dư 0
 5 ÷ 2 =  2 dư 1
 2 ÷ 2 =  1 dư 0
 1 ÷ 2 =  0 dư 1   ← bit cao nhất
```

Đọc các dư từ dưới lên: `101010`. Kết quả: `42₁₀ = 101010₂`. ✓ (khớp ví dụ ở §3.1)

### 3.3. Cộng/trừ binary

Cộng từng cột, có nhớ — y hệt phép cộng thập phân, chỉ khác cơ số.

```
   0 1 1 0 1   (= 13)
 + 0 0 1 1 1   (=  7)
 ---------
   1 0 1 0 0   (= 20)  ✓
```

Cột phải: `1+1 = 10₂` → ghi `0` nhớ `1`. Cột kế: `0+1+1(nhớ) = 10₂` → ghi `0` nhớ `1`. Cứ thế.

## 4. Hệ thập lục phân (hex, base 16)

### 4.1. Vì sao cần hex khi đã có binary?

Vì binary rất **dài**. Số `int32` cần tới 32 chữ số nhị phân để viết — rất dễ đếm sai. Hex gọn hơn 4 lần:

```
binary:  0111 1111 1111 1111 1111 1111 1111 1111   (32 bit)
hex:     7    F    F    F    F    F    F    F      (8 chữ)
       = 0x7FFFFFFF
       = 2 147 483 647   (giới hạn dương của int32)
```

Quy luật: **mỗi 4 bit ↔ đúng 1 chữ số hex**.

| 4 bit | hex | decimal |
| --- | --- | --- |
| 0000 | 0 | 0 |
| 0001 | 1 | 1 |
| 0010 | 2 | 2 |
| 0011 | 3 | 3 |
| 0100 | 4 | 4 |
| 0101 | 5 | 5 |
| 0110 | 6 | 6 |
| 0111 | 7 | 7 |
| 1000 | 8 | 8 |
| 1001 | 9 | 9 |
| 1010 | A | 10 |
| 1011 | B | 11 |
| 1100 | C | 12 |
| 1101 | D | 13 |
| 1110 | E | 14 |
| 1111 | F | 15 |

Trong Go, ký hiệu `0x` để viết hex: `0x2A` = `42`. Ký hiệu `0b` để viết binary: `0b101010` = `42`.

### 4.2. Chuyển binary ↔ hex (siêu nhanh)

**Binary → hex**: gom 4 bit từ phải sang trái, mỗi nhóm tra bảng.

```
binary:  10  1101  1010   (10 bit)
pad 0:  0010 1101 1010    (12 bit)
hex:      2    D    A
        = 0x2DA
```

Kiểm tra: `0x2DA = 2·256 + 13·16 + 10 = 512 + 208 + 10 = 730`. Và `10 1101 1010₂ = 512 + 128 + 64 + 16 + 8 + 2 = 730`. ✓

**Hex → binary**: mỗi chữ hex viết thành 4 bit.

```
hex:    0x  C  A  F  E
bin:    1100 1010 1111 1110
```

Đây là magic bytes nổi tiếng (`0xCAFE` — đùa của lập trình viên Java, đầu file `.class` có `0xCAFEBABE`).

### 4.3. Chuyển decimal ↔ hex

Cách trực tiếp: chia 16 lấy dư, y hệt như chia 2 với binary.

```
730 ÷ 16 = 45 dư 10  → A
 45 ÷ 16 =  2 dư 13  → D
  2 ÷ 16 =  0 dư  2  → 2
```

Đọc từ dưới: `0x2DA`. ✓

## 5. Số âm — Two's complement

### 5.1. Vấn đề: làm sao biểu diễn số âm với toàn bit 0/1?

Cách "ngây thơ": dùng bit đầu làm dấu (`0` = dương, `1` = âm), các bit còn lại là độ lớn. Gọi là **sign-magnitude**. Nhưng có 2 vấn đề:

1. Có hai số 0: `+0` và `-0` (vd `00000000` và `10000000`).
2. Phép cộng phải xét dấu riêng, tốn transistor.

→ Hầu hết CPU hiện đại dùng **two's complement** thay vì sign-magnitude.

### 5.2. Quy tắc two's complement (8-bit ví dụ)

- Bit ngoài cùng bên trái vẫn là *dấu* (0 = dương, 1 = âm).
- Nhưng để tìm giá trị tuyệt đối của một số âm: **đảo bit, rồi cộng 1**.

Ví dụ tìm biểu diễn của `-5` ở dạng 8-bit:

```
+5 dạng binary:        00000101
đảo bit (NOT):         11111010
cộng 1:                11111011   ← đây là -5 ở two's complement
```

Kiểm tra ngược: lấy `11111011`, đảo bit → `00000100`, cộng 1 → `00000101` = 5. Vậy số gốc là `-5`. ✓

### 5.3. Vì sao two's complement "đẹp"?

Phép cộng dương-với-âm hoạt động **mà không cần biết dấu**. Thử `5 + (-5)`:

```
   00000101   ( 5)
 + 11111011   (-5)
 ---------
  100000000   (9 bit, nhưng ta chỉ có 8 bit)
```

Bit thứ 9 bị **tràn** (overflow) ra ngoài và bị bỏ đi → còn lại `00000000` = 0. ✓ Phép cộng "tự" xử lý đúng. CPU chỉ cần một mạch cộng, không cần mạch trừ riêng — đó là lý do two's complement thắng.

### 5.4. Phạm vi giá trị

Với `n` bit, two's complement biểu diễn được:

- Số nhỏ nhất: `-2^(n-1)`
- Số lớn nhất: `+2^(n-1) - 1`

(Lý do "âm có một số nhiều hơn": có duy nhất một số 0 chiếm chỗ trong phần dương, không chia đôi đều).

| Kiểu Go | bit | min | max |
| --- | --- | --- | --- |
| `int8` | 8 | -128 | 127 |
| `int16` | 16 | -32 768 | 32 767 |
| `int32` | 32 | -2 147 483 648 | 2 147 483 647 |
| `int64` | 64 | -9 223 372 036 854 775 808 | 9 223 372 036 854 775 807 |
| `uint8` (byte) | 8 | 0 | 255 |
| `uint32` | 32 | 0 | 4 294 967 295 |
| `uint64` | 64 | 0 | 18 446 744 073 709 551 615 |

→ Câu trả lời cho *"vì sao `int64` đến ~9.2 · 10¹⁸?"*: vì `2⁶³ - 1 ≈ 9.22 · 10¹⁸`.

### 5.5. Overflow là gì?

Khi kết quả phép tính **vượt khỏi phạm vi** kiểu dữ liệu. Trong Go, overflow trên kiểu int **không panic** — nó *wrap around* (cuộn vòng).

Ví dụ với `int8` (max = 127):

```go
var x int8 = 127
x = x + 1   // không panic, x = -128
```

Vì sao? `127` ở binary là `01111111`, cộng 1 thành `10000000` = `-128` (theo two's complement). Bit dấu bị "lật".

→ Bài học: khi xử lý số lớn (vd hash, tổng prefix sum, nhân hai số gần `int32`), cẩn thận overflow. Trong Go, nhân hai `int32` lớn → dùng `int64`. Nhân hai `int64` lớn → dùng `math/big`.

## 6. Bit, byte, và các đơn vị kích thước

- **bit**: đơn vị nhỏ nhất, chỉ có `0` hoặc `1`.
- **byte** = 8 bit. Chứa được `2⁸ = 256` giá trị (0..255 hoặc -128..127).
- **KB, MB, GB**: có 2 quy ước, **đừng nhầm**.

| Đơn vị | "Decimal" (SI, ổ cứng quảng cáo) | "Binary" (RAM, OS) |
| --- | --- | --- |
| 1 KB | 10³ = 1000 bytes | 2¹⁰ = 1024 bytes (đúng ra là KiB) |
| 1 MB | 10⁶ | 2²⁰ = 1 048 576 |
| 1 GB | 10⁹ | 2³⁰ ≈ 1.07 · 10⁹ |
| 1 TB | 10¹² | 2⁴⁰ ≈ 1.10 · 10¹² |

→ Đây là lý do **ổ cứng quảng cáo 1 TB nhưng Windows hiển thị ~931 GB**. Không phải hãng gian lận — Windows quy đổi theo binary, hãng quy đổi theo decimal.

## 7. Trả lời các câu hỏi tự nhiên

**Q: Trong Go, làm sao in một số ra dạng binary / hex?**

```go
fmt.Printf("%b\n", 42)   // 101010
fmt.Printf("%x\n", 42)   // 2a
fmt.Printf("%X\n", 42)   // 2A
fmt.Printf("%08b\n", 5)  // 00000101  (pad đủ 8 ký tự)
```

**Q: Làm sao đọc một số hex trong Go?**

Viết literal trực tiếp: `x := 0x2A`. Đọc từ chuỗi: `n, _ := strconv.ParseInt("2A", 16, 64)`.

**Q: `byte` trong Go là gì?**

`byte` là alias của `uint8` (0..255). Khi bạn đọc file binary, kết quả là `[]byte`.

**Q: Có thể nhân `int32` với `int32` mà không lo overflow không?**

Không, nếu hai số đủ lớn. `2 000 000 000 × 2 = 4 000 000 000` vượt `int32` (max ~2.1 · 10⁹). Phải ép kiểu sang `int64` trước khi nhân: `int64(a) * int64(b)`.

**Q: Hex và binary có "nhanh hơn" decimal khi chạy không?**

Không. Đây chỉ là **cách hiển thị** cho người đọc. CPU làm việc trên bit thuần — không có khái niệm hex hay decimal trong RAM. Bạn viết `0x2A` hay `42` ra cùng một số bit trong file binary.

## 8. Bài tập

**Bài 1.** Chuyển các số sau từ decimal sang binary (8-bit, padding 0): `0`, `1`, `7`, `15`, `100`, `255`.

**Bài 2.** Chuyển các số binary sau sang decimal: `1010`, `11111`, `10000000`, `01010101`.

**Bài 3.** Chuyển các số hex sau sang binary và decimal: `0x10`, `0xFF`, `0x1A3`, `0xDEAD`.

**Bài 4.** Viết biểu diễn two's complement 8-bit của: `-1`, `-2`, `-127`, `-128`. Kiểm tra `-128 + 127` = `-1` ở cấp bit.

**Bài 5.** Trong Go, kết quả của `var x int8 = -128; x = x - 1` là gì? Giải thích bằng bit.

**Bài 6.** Một file ảnh quảng cáo "5 MB". Nếu hệ điều hành hiển thị theo MiB (binary), kích thước hiển thị là bao nhiêu MiB? (Coi 5 MB = 5 · 10⁶ bytes.)

**Bài 7.** Viết hàm Go `toBinaryString(n uint8) string` trả về chuỗi 8 ký tự `0`/`1` biểu diễn `n`. Không dùng `fmt.Sprintf("%b", ...)` — tự viết bằng phép chia/mod.

## Lời giải chi tiết

### Bài 1

Áp dụng chia 2 lấy dư, padding đủ 8 bit:

| Decimal | Binary 8-bit |
| --- | --- |
| 0 | `00000000` |
| 1 | `00000001` |
| 7 | `00000111` |
| 15 | `00001111` |
| 100 | `01100100` |
| 255 | `11111111` |

Cách tính 100: `100 = 64 + 32 + 4 = 2⁶ + 2⁵ + 2² → 01100100`.

### Bài 2

| Binary | Tính | Decimal |
| --- | --- | --- |
| `1010` | 8 + 0 + 2 + 0 | 10 |
| `11111` | 16 + 8 + 4 + 2 + 1 | 31 |
| `10000000` | 128 | 128 (nếu `uint8`) hoặc -128 (nếu `int8` two's complement) |
| `01010101` | 64 + 16 + 4 + 1 | 85 |

→ Lưu ý ô `10000000`: cùng một dãy bit nhưng đọc khác nhau tùy kiểu dữ liệu. Đây là điểm mấu chốt — *bit không tự biết nó là gì*, kiểu dữ liệu quyết định cách đọc.

### Bài 3

| Hex | Binary | Decimal |
| --- | --- | --- |
| `0x10` | `0001 0000` | 16 |
| `0xFF` | `1111 1111` | 255 |
| `0x1A3` | `0001 1010 0011` | 256 + 128 + 32 + 2 + 1 = 419 |
| `0xDEAD` | `1101 1110 1010 1101` | 13·4096 + 14·256 + 10·16 + 13 = 53 248 + 3 584 + 160 + 13 = 57 005 |

### Bài 4

Quy tắc: đảo bit của giá trị tuyệt đối, cộng 1.

| Số | |x| binary | đảo bit | +1 → two's complement |
| --- | --- | --- | --- | --- |
| -1 | `00000001` | `11111110` | `11111111` |
| -2 | `00000010` | `11111101` | `11111110` |
| -127 | `01111111` | `10000000` | `10000001` |
| -128 | `10000000` | `01111111` | `10000000` |

Lưu ý: `-128` đặc biệt — bit pattern `10000000` không có "phiên bản dương" trong 8-bit (vì +128 cần 9 bit). Đó là lý do phạm vi `int8` lệch (-128 đến +127), chứ không phải đối xứng.

Kiểm tra `-128 + 127`:

```
  10000000   (-128)
+ 01111111   ( 127)
----------
  11111111   = -1   ✓
```

### Bài 5

```go
var x int8 = -128
x = x - 1
```

`-128` binary là `10000000`. Trừ 1 = cộng `11111111` (vì `-1 = 11111111` trong two's complement):

```
  10000000   (-128)
+ 11111111   (-1, tức "-= 1")
----------
 101111111   (9 bit, bit thứ 9 bị bỏ)
  01111111   = 127
```

Kết quả: `x = 127`. **Overflow âm wrap thành dương** — nguy hiểm vì không panic, chỉ sai âm thầm.

### Bài 6

5 MB (decimal) = 5 · 10⁶ = 5 000 000 bytes.

1 MiB = 2²⁰ = 1 048 576 bytes.

5 000 000 / 1 048 576 ≈ **4.77 MiB**.

→ Hiển thị "5 MB ảnh" trên web nhưng OS báo "4.77 MB" — đây là chênh lệch quy ước, không phải lỗi.

### Bài 7

```go
func toBinaryString(n uint8) string {
    bits := make([]byte, 8)
    for i := 7; i >= 0; i-- {
        if n%2 == 1 {
            bits[i] = '1'
        } else {
            bits[i] = '0'
        }
        n /= 2
    }
    return string(bits)
}
```

Cách tiếp cận: lặp 8 lần, mỗi lần lấy bit thấp nhất (mod 2) ghi vào vị trí phải nhất, rồi shift phải bằng cách chia 2. Vì đi từ phải sang trái, ta điền `bits[i]` với `i` giảm dần từ 7 về 0.

Độ phức tạp: O(1) — luôn 8 vòng lặp.

Code đầy đủ + biến thể dùng bitwise xem trong [solutions.go](./solutions.go) (bài 02 sẽ học cách dùng bitwise gọn hơn).

## Tham khảo và bài tiếp theo

- Bài tiếp: [Lesson 02 — Bitwise Operations](../lesson-02-bitwise-ops/) — các phép toán trên bit và bitmask.
- Bài liên quan trong DataStructures: [Hash Table](../../../DataStructures/01-Basic/lesson-06-hash-table/), [Advanced Structures (Bloom filter)](../../../DataStructures/03-Advanced/lesson-04-advanced-structures/).
- Code: [solutions.go](./solutions.go).
- Minh họa tương tác: [visualization.html](./visualization.html) — bộ chuyển đổi decimal/binary/hex, demo two's complement, playground overflow.
