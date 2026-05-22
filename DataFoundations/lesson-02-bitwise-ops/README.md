# Lesson 02 — Bitwise Operations (phép toán trên bit)

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Hiểu và dùng thành thạo 6 phép toán bit trong Go: `&`, `|`, `^`, `^` (unary NOT), `<<`, `>>`.
- Biết cách dùng **bitmask** để bật/tắt/kiểm tra một bit cụ thể.
- Thuộc các "trick" hay gặp: kiểm tra power-of-2, đếm số bit 1, XOR swap, "find the lonely number".
- Hiểu bitmask trong DP (dynamic programming) và biểu diễn tập con bằng số.

## Kiến thức tiền đề

- [Lesson 01 — Binary & Hex](../lesson-01-binary-hex/) — bắt buộc, bài này tham chiếu liên tục biểu diễn nhị phân và two's complement.

## 1. Vì sao cần bitwise?

Bitwise nhanh hơn nhiều phép toán số học (single-cycle CPU instruction) và cho phép **đóng gói nhiều thông tin vào 1 số**. Ví dụ:

- **Permission file trên Unix**: `chmod 755` thực ra là `rwxr-xr-x` = 9 bit (3 bit cho user, 3 cho group, 3 cho others) — đóng gói thành 1 số 9-bit.
- **Cờ trạng thái**: thay vì 8 biến `bool`, dùng 1 byte với 8 bit, mỗi bit là một cờ. Giúp tiết kiệm bộ nhớ và so sánh nhanh (1 phép `==` thay vì 8).
- **Bitmask DP**: bài toán "travelling salesman" với n ≤ 20 đỉnh — biểu diễn "tập đỉnh đã thăm" bằng 1 số `uint32`, mỗi bit là một đỉnh.
- **Hash function**: nhiều hash dùng XOR, shift, để "trộn bit" nhanh.
- **Đồ thị Bitwise trick**: `x & -x` lấy bit thấp nhất → dùng trong Fenwick tree.

## 2. Sáu phép toán bit trong Go

Cú pháp Go (giống C/Java):

| Phép | Ký hiệu Go | Ý nghĩa |
| --- | --- | --- |
| AND | `a & b` | mỗi bit: 1 nếu **cả hai** đều 1 |
| OR | `a \| b` | mỗi bit: 1 nếu **ít nhất một** là 1 |
| XOR | `a ^ b` | mỗi bit: 1 nếu **đúng một** trong hai là 1 |
| NOT (unary) | `^a` | đảo toàn bộ bit |
| Shift trái | `a << k` | dịch trái `k` bit (chèn 0 vào phải) |
| Shift phải | `a >> k` | dịch phải `k` bit |
| AND-NOT (Go riêng) | `a &^ b` | `a & (^b)` — "clear bits in a that are set in b" |

> Lưu ý: Go dùng `^` cho cả XOR (binary) và NOT (unary), không như C dùng `~` cho NOT. Đây là khác biệt nhỏ nhưng dễ lẫn.

### 2.1. Bảng chân lý

| a | b | a&b | a\|b | a^b |
| --- | --- | --- | --- | --- |
| 0 | 0 | 0 | 0 | 0 |
| 0 | 1 | 0 | 1 | 1 |
| 1 | 0 | 0 | 1 | 1 |
| 1 | 1 | 1 | 1 | 0 |

### 2.2. Ví dụ cụ thể (8-bit)

```
a = 0b11001100   (= 204)
b = 0b10101010   (= 170)

a & b = 0b10001000   (=  136)
a | b = 0b11101110   (=  238)
a ^ b = 0b01100110   (=  102)
   ^a = 0b00110011   (= không nói số vì phụ thuộc kiểu — xem §2.3)
a &^ b = 0b01000100  (=   68)
```

Cách tính từng bit, ví dụ `a & b` bit thứ 7 (cao nhất): `1 & 1 = 1`. Bit thứ 6: `1 & 0 = 0`. v.v.

### 2.3. `^a` (NOT) phụ thuộc kiểu

`^a` đảo toàn bộ bit của `a`. Số bit được đảo = số bit của kiểu dữ liệu của `a`.

```go
var a uint8 = 0b11001100   // 204
fmt.Printf("%08b\n", ^a)   // 00110011 (= 51)

var b uint32 = 0b11001100  // 204
fmt.Printf("%032b\n", ^b)  // 11111111 11111111 11111111 00110011 (= 4294967091)
```

→ Khi dùng NOT, **luôn nhớ kiểu** của biến. Nếu muốn đảo chỉ 8 bit thấp của một số rộng hơn, dùng XOR với mặt nạ: `a ^ 0xFF`.

### 2.4. Shift trái / phải

```
a = 0b00010110   (= 22)
a << 1 = 0b00101100   (= 44)   ← tương đương a * 2
a << 3 = 0b10110000   (= 176)  ← tương đương a * 8 (= 2^3)
a >> 1 = 0b00001011   (= 11)   ← tương đương a / 2 (làm tròn xuống)
```

**Quy tắc**: `x << k = x · 2^k`, `x >> k = floor(x / 2^k)` (với unsigned).

Với số **âm** (signed) trong Go, `>>` là *arithmetic shift* — bit dấu được nhân bản:

```go
var x int8 = -8        // 0b11111000
x >> 1                 // 0b11111100 = -4   (KHÔNG phải 124)
```

Nếu bạn cần shift "logic" (chèn 0), ép sang `uint`.

## 3. Bitmask — thao tác trên bit thứ k

Bit được đánh số từ **bit 0 = bit thấp nhất** (phải nhất).

```
bit số:  7  6  5  4  3  2  1  0
giá trị: 0  1  1  0  1  0  1  0  ← byte này = 0b01101010
```

### 3.1. Bốn thao tác cơ bản

Giả sử `x` là số, `k` là chỉ số bit (0 = bit thấp nhất).

| Mục đích | Công thức Go | Giải thích |
| --- | --- | --- |
| **Lấy** bit k | `(x >> k) & 1` | đưa bit k về vị trí 0, lấy bit thấp nhất |
| **Set** bit k = 1 | `x \| (1 << k)` | OR với mask chỉ có bit k = 1 |
| **Clear** bit k = 0 | `x &^ (1 << k)` | AND-NOT — Go-idiomatic |
| **Toggle** bit k (lật) | `x ^ (1 << k)` | XOR với mask chỉ có bit k = 1 |

Ví dụ với `x = 0b01101010` (= 106), thao tác trên bit 2:

```
mask    = 1 << 2 = 0b00000100

get   :  (x >> 2) & 1 = (0b00011010) & 1 = 0     → bit 2 = 0
set   :  x | 0b00000100 = 0b01101110 (= 110)     → bit 2 = 1
clear :  x &^ 0b00000100 = 0b01101010 (= 106)    → không đổi (vốn đã 0)
toggle:  x ^ 0b00000100 = 0b01101110 (= 110)     → lật từ 0 → 1
```

Đối với bit 1 (bit đang là 1):

```
clear :  x &^ 0b00000010 = 0b01101000 (= 104)    → bit 1 từ 1 → 0
toggle:  x ^ 0b00000010 = 0b01101000 (= 104)    → cùng kết quả vì đang là 1
```

### 3.2. Tại sao `&^` (AND-NOT)?

`x &^ mask` = `x & (^mask)`. Trong các ngôn ngữ khác (C, Java), bạn viết `x & ~mask`. Go gộp thành 1 toán tử `&^` cho gọn, đỡ phải quan tâm độ rộng của `mask` (vì `^mask` phụ thuộc kiểu).

## 4. Các "trick" bitwise kinh điển

### 4.1. Kiểm tra số chẵn / lẻ

```go
isOdd := x & 1 == 1
isEven := x & 1 == 0
```

Vì bit 0 là `2⁰ = 1` — số lẻ ↔ bit 0 bằng 1. Nhanh hơn `x % 2 != 0` ở mức compiler (mặc dù modern compiler tự optimize).

### 4.2. Kiểm tra power-of-2

`n` là lũy thừa của 2 (1, 2, 4, 8, 16, ...) ↔ binary của `n` có **đúng một bit 1**.

Trick: `n & (n - 1) == 0` (và `n > 0`).

Vì sao? Trừ 1 sẽ "lan" mượn xuống tới bit 1 thấp nhất, biến bit đó thành 0 và mọi bit dưới thành 1. AND lại → toàn 0 nếu lúc đầu chỉ có 1 bit.

```
n = 0b01000   (= 8)
n-1 = 0b00111
n & (n-1) = 0b00000  ✓ là power-of-2

n = 0b01010   (= 10)
n-1 = 0b01001
n & (n-1) = 0b01000 ≠ 0  → KHÔNG phải power-of-2
```

### 4.3. Đếm số bit 1 (popcount)

**Cách ngây thơ** (O(số bit)):

```go
func popcountNaive(x uint64) int {
    count := 0
    for x > 0 {
        count += int(x & 1)
        x >>= 1
    }
    return count
}
```

**Brian Kernighan's trick** (O(số bit 1) — nhanh hơn khi ít bit 1):

```go
func popcountBK(x uint64) int {
    count := 0
    for x > 0 {
        x &= x - 1   // xóa bit 1 thấp nhất
        count++
    }
    return count
}
```

Vì sao `x &= x - 1` xóa bit 1 thấp nhất? Như §4.2: trừ 1 mượn xuống bit 1 thấp nhất, biến nó thành 0 (và các bit dưới thành 1, nhưng AND với x sẽ giữ chúng là 0 vì x ở đó là 0).

```
x     = 0b01101100
x-1   = 0b01101011
x&x-1 = 0b01101000   ← bit 1 thấp nhất (vị trí 2) đã thành 0
```

**Trong production Go**: dùng [`math/bits.OnesCount64`](https://pkg.go.dev/math/bits#OnesCount64) — compiler dịch thành 1 instruction `POPCNT` của CPU, nhanh nhất.

### 4.4. Lấy / xóa bit 1 thấp nhất

- **Lấy bit 1 thấp nhất** (lowest set bit): `x & -x`
- **Xóa bit 1 thấp nhất**: `x & (x - 1)`

Ví dụ:

```
x = 0b01101100   (= 108)
-x trong two's complement = 0b10010100
x & -x = 0b00000100   (= 4)   ← bit 1 thấp nhất ở vị trí 2
```

Trick `x & -x` rất quan trọng vì là cốt lõi của **Fenwick tree** (Binary Indexed Tree) trong [DataStructures lesson-13](../../DataStructures/lesson-13-segment-tree/).

### 4.5. XOR swap (hoán đổi không cần biến tạm)

```go
a ^= b
b ^= a
a ^= b
```

Sau 3 dòng: `a` và `b` đã hoán đổi giá trị.

Vì sao? XOR có 3 tính chất "thần kỳ":
- `a ^ a = 0` (XOR với chính nó = 0)
- `a ^ 0 = a` (XOR với 0 không đổi)
- Giao hoán & kết hợp: `a ^ b ^ a = b`.

Mô phỏng với `a = 5, b = 3`:

```
ban đầu: a = 0101, b = 0011
a ^= b:  a = 0101 ^ 0011 = 0110, b = 0011
b ^= a:  a = 0110, b = 0011 ^ 0110 = 0101  (= 5)  ← b giờ là a cũ
a ^= b:  a = 0110 ^ 0101 = 0011 (= 3),    b = 0101  ← a giờ là b cũ
```

→ Đảo xong. ⚠️ Thực tế Go khuyến nghị dùng `a, b = b, a` cho rõ ràng hơn. XOR swap chỉ có ý nghĩa khi không có biến tạm (vd code embedded cực ngắn) — và **không hoạt động** nếu `a` và `b` cùng địa chỉ.

### 4.6. "The Lonely Number" — bài toán kinh điển

> Cho mảng số nguyên, mỗi số xuất hiện **đúng 2 lần**, trừ duy nhất 1 số xuất hiện 1 lần. Tìm số đó.

**Yêu cầu**: O(n) thời gian, O(1) bộ nhớ.

**Trick**: XOR toàn bộ mảng.

```go
func findLonely(arr []int) int {
    result := 0
    for _, x := range arr {
        result ^= x
    }
    return result
}
```

Vì sao? `a ^ a = 0`, nên tất cả các cặp tự triệt tiêu, chỉ còn lại số cô đơn XOR với 0 (= chính nó).

Ví dụ `[4, 1, 2, 1, 2]`:
```
0 ^ 4 = 4
4 ^ 1 = 5
5 ^ 2 = 7
7 ^ 1 = 6
6 ^ 2 = 4   ← đáp án
```

## 5. Bitmask cho tập hợp con

### 5.1. Ý tưởng

Với `n` phần tử (n ≤ 64), mỗi **tập con** ↔ một số `n`-bit. Bit thứ `i` = 1 nếu phần tử `i` có trong tập, = 0 nếu không.

Ví dụ `n = 4` phần tử `{a, b, c, d}` (đánh số 0..3):

| Mask binary | Mask hex | Tập con |
| --- | --- | --- |
| `0000` | 0x0 | {} (rỗng) |
| `0001` | 0x1 | {a} |
| `0010` | 0x2 | {b} |
| `0011` | 0x3 | {a, b} |
| `0101` | 0x5 | {a, c} |
| `1111` | 0xF | {a, b, c, d} |

Với `n` phần tử, có đúng `2^n` tập con — khớp với số có thể biểu diễn bằng `n` bit.

### 5.2. Duyệt mọi tập con

```go
for mask := 0; mask < (1 << n); mask++ {
    // mask là một tập con
    for i := 0; i < n; i++ {
        if mask & (1 << i) != 0 {
            // phần tử i có trong tập con này
        }
    }
}
```

Đây là khung của **bitmask DP**. Ứng dụng: TSP, "đếm cách ghép cặp", "tô màu đồ thị nhỏ", v.v. — sẽ gặp khi học thuật toán nâng cao.

### 5.3. Phép toán tập trên bitmask

Liên kết trực tiếp tới [Lesson 03 — Set Theory](../lesson-03-set-theory/):

| Phép toán tập | Bitwise |
| --- | --- |
| Hợp `A ∪ B` | `A \| B` |
| Giao `A ∩ B` | `A & B` |
| Hiệu `A \ B` | `A &^ B` |
| Hiệu đối xứng `A △ B` | `A ^ B` |
| Phần bù `Aᶜ` (trong vũ trụ n bit) | `(^A) & ((1<<n) - 1)` |
| Kiểm tra `i ∈ A` | `A & (1<<i) != 0` |

→ Đây là lý do **bitwise và set theory được dạy cùng nhau**. Khi tập có ≤ 64 phần tử, bitmask là cách lưu set **gọn và nhanh** nhất.

## 6. Trả lời các câu hỏi tự nhiên

**Q: Khi nào nên dùng bitwise, khi nào dùng `map[int]bool` hay `[]bool`?**

- Số phần tử ≤ 64, biết trước: **bitmask** (1 uint64). Nhanh nhất, nhỏ nhất.
- Số phần tử ≤ vài nghìn, biết trước: `[]bool` hoặc bitset (vd dùng `math/big.Int` cho bit dài).
- Số phần tử lớn / không biết trước / sparse: `map[int]bool`.

**Q: `x << 64` trong Go cho ra gì?**

Với `x` kiểu `uint64`: **hành vi không xác định ở mức C, nhưng Go định nghĩa rõ** — kết quả là `0` (shift bằng hoặc lớn hơn số bit của kiểu → 0). Nhưng `1 << 64` (literal) sẽ compile lỗi vì `1` mặc định là `int` (32 hoặc 64 bit tùy platform) và shift ngoài phạm vi bị từ chối lúc compile.

**Q: Có cách nào pretty-print bit của một số trong Go không?**

```go
fmt.Printf("%08b\n", uint8(42))   // 00101010
fmt.Printf("%032b\n", uint32(42)) // 00000000000000000000000000101010
```

`%08b` = format binary, padding 0 đến 8 chữ.

**Q: Trong production, đếm bit 1 mình tự viết hay dùng thư viện?**

Dùng [`math/bits`](https://pkg.go.dev/math/bits) — Go compiler optimize thành CPU instruction nếu có (Intel POPCNT, ARM CNT). Tự viết chỉ để học.

```go
import "math/bits"
n := bits.OnesCount64(0b1101)  // 3
```

**Q: Bitwise có dùng được với `string` không?**

Không trực tiếp. Phải lặp qua từng byte: `for i := 0; i < len(s); i++ { x ^= uint64(s[i]) }`. Đây là cách viết hash chuỗi đơn giản nhất (nhưng tệ — sẽ học hash thật trong [Hash Table](../../DataStructures/lesson-05-hash-table/)).

## 7. Bài tập

**Bài 1.** Tính bằng tay (không chạy code):
- `0b1100 & 0b1010`
- `0b1100 | 0b1010`
- `0b1100 ^ 0b1010`
- `0b1100 &^ 0b1010`
- `^(uint8(0b1100))` — viết kết quả 8-bit.

**Bài 2.** Cho `x = 0b10110100` (= 180). Tính:
- bit 3 của x = ?
- set bit 0 của x → giá trị mới?
- clear bit 5 của x → giá trị mới?
- toggle bit 7 của x → giá trị mới?

**Bài 3.** Viết hàm Go `isPowerOfTwo(n uint64) bool` trả về true nếu `n` là lũy thừa của 2.

**Bài 4.** Viết hàm `countBits(x uint64) int` đếm số bit 1, dùng Brian Kernighan's trick.

**Bài 5.** Cho mảng `[2, 3, 5, 2, 5, 7, 3]`. Tìm số xuất hiện 1 lần bằng XOR. Trình bày các bước XOR.

**Bài 6.** Cho permission Unix dạng số: `read = 4 = 0b100`, `write = 2 = 0b010`, `execute = 1 = 0b001`. Viết hàm `hasReadPermission(perm uint8) bool` và `addWritePermission(perm uint8) uint8`.

**Bài 7.** Viết hàm `printSubsets(items []string)` in tất cả tập con của `items`, dùng bitmask. Với input `["a", "b", "c"]` phải in đủ 8 tập con (kể cả tập rỗng).

**Bài 8.** Viết hàm `reverseBits(x uint8) uint8` đảo ngược 8 bit (bit 0 ↔ bit 7, bit 1 ↔ bit 6, ...). Ví dụ `0b11010010 → 0b01001011`.

## Lời giải chi tiết

### Bài 1

```
  1100        1100        1100        1100
& 1010      | 1010      ^ 1010      &^ 1010
------      ------      ------      ------
  1000        1110        0110        0100
```

Chi tiết `&^`: `a &^ b = a & (^b)`. `^0b1010 = 0b0101` (4 bit), nên `0b1100 & 0b0101 = 0b0100`. Diễn giải: "giữ các bit của a, trừ những bit b đặt".

`^(uint8(0b1100))` = đảo 8 bit của `0b00001100` = `0b11110011` = 243.

### Bài 2

x = `0b10110100` = 180.

- **bit 3** (tính từ phải, 0-indexed): nhìn vào dãy `10110100`, đếm từ phải: bit 0 = 0, bit 1 = 0, bit 2 = 1, **bit 3 = 0**. Tính bằng công thức: `(180 >> 3) & 1 = 0b10110 & 1 = 0`.
- **set bit 0**: `180 | 0b00000001 = 0b10110101 = 181`.
- **clear bit 5**: bit 5 = `2⁵ = 32`. `180 &^ 32 = 0b10110100 &^ 0b00100000 = 0b10010100 = 148`.
- **toggle bit 7**: bit 7 = `2⁷ = 128`. `180 ^ 128 = 0b00110100 = 52`.

### Bài 3

```go
func isPowerOfTwo(n uint64) bool {
    return n > 0 && n & (n - 1) == 0
}
```

Điều kiện `n > 0` quan trọng vì với `n = 0`: `0 & (0 - 1) = 0 & maxUint64 = 0` → công thức sẽ ra true. Mà `0` không phải power-of-2.

Test:
- `isPowerOfTwo(1)` → `1 & 0 = 0` → true ✓ (1 = 2⁰)
- `isPowerOfTwo(8)` → `8 & 7 = 0b1000 & 0b0111 = 0` → true ✓
- `isPowerOfTwo(10)` → `10 & 9 = 0b1010 & 0b1001 = 0b1000 ≠ 0` → false ✓

Độ phức tạp: O(1).

### Bài 4

```go
func countBits(x uint64) int {
    count := 0
    for x != 0 {
        x &= x - 1
        count++
    }
    return count
}
```

Vòng lặp chạy đúng `popcount(x)` lần (mỗi vòng xóa 1 bit). Độ phức tạp: O(số bit 1) — nhanh hơn O(số bit) nếu x thưa.

### Bài 5

Mảng: `[2, 3, 5, 2, 5, 7, 3]`. Tìm số xuất hiện 1 lần (đáp án: 7).

XOR tích lũy:
```
0 ^ 2 = 2
2 ^ 3 = 1
1 ^ 5 = 4
4 ^ 2 = 6
6 ^ 5 = 3
3 ^ 7 = 4
4 ^ 3 = 7   ← đáp án
```

Chi tiết một bước, ví dụ `4 ^ 2`: `0b100 ^ 0b010 = 0b110 = 6`.

Vì 2 xuất hiện 2 lần → `2 ^ 2 = 0`. Tương tự 3 và 5. Còn lại 7 XOR với 0 = 7.

### Bài 6

```go
const (
    Read    uint8 = 0b100   // = 4
    Write   uint8 = 0b010   // = 2
    Execute uint8 = 0b001   // = 1
)

func hasReadPermission(perm uint8) bool {
    return perm & Read != 0
}

func addWritePermission(perm uint8) uint8 {
    return perm | Write
}
```

Với `perm = 0b101` (read + execute, "5"):
- `hasReadPermission(5)` → `0b101 & 0b100 = 0b100 ≠ 0` → true ✓
- `addWritePermission(5)` → `0b101 | 0b010 = 0b111 = 7` (read+write+execute) ✓

Trong thực tế chmod còn có 3 nhóm (user/group/other) × 3 bit = 9 bit, đóng gói thành số 3 chữ số hệ 8 (octal) như `0755`.

### Bài 7

```go
func printSubsets(items []string) {
    n := len(items)
    total := 1 << n
    for mask := 0; mask < total; mask++ {
        subset := []string{}
        for i := 0; i < n; i++ {
            if mask & (1 << i) != 0 {
                subset = append(subset, items[i])
            }
        }
        fmt.Printf("mask=%0*b → %v\n", n, mask, subset)
    }
}
```

Với input `["a", "b", "c"]`, output:
```
mask=000 → []
mask=001 → [a]
mask=010 → [b]
mask=011 → [a b]
mask=100 → [c]
mask=101 → [a c]
mask=110 → [b c]
mask=111 → [a b c]
```

Độ phức tạp: O(n · 2ⁿ). Với n > ~25 sẽ quá chậm.

### Bài 8

```go
func reverseBits(x uint8) uint8 {
    var result uint8 = 0
    for i := 0; i < 8; i++ {
        // Lấy bit i của x, đặt vào vị trí (7-i) của result.
        bit := (x >> i) & 1
        result |= bit << (7 - i)
    }
    return result
}
```

Với `x = 0b11010010`:
- i=0: bit 0 của x = 0 → set bit 7 của result = 0
- i=1: bit 1 của x = 1 → set bit 6 của result = 1 → result = `0b01000000`
- i=2: bit 2 của x = 0
- i=3: bit 3 của x = 0
- i=4: bit 4 của x = 1 → set bit 3 → result = `0b01001000`
- i=5: bit 5 của x = 0
- i=6: bit 6 của x = 1 → set bit 1 → result = `0b01001010`
- i=7: bit 7 của x = 1 → set bit 0 → result = `0b01001011` ✓

Độ phức tạp: O(số bit) = O(1) với uint8.

> Trong thư viện chuẩn Go có sẵn [`bits.Reverse8`](https://pkg.go.dev/math/bits#Reverse8) — production nên dùng.

## Tham khảo và bài tiếp theo

- Bài tiếp: [Lesson 03 — Set Theory](../lesson-03-set-theory/) — lý thuyết tập hợp.
- Bài trước: [Lesson 01 — Binary & Hex](../lesson-01-binary-hex/).
- Liên quan trong DataStructures: [Hash Table](../../DataStructures/lesson-05-hash-table/) (bitwise trong hash function), [Segment Tree / Fenwick](../../DataStructures/lesson-13-segment-tree/) (`x & -x`), [Advanced Structures](../../DataStructures/lesson-14-advanced-structures/) (Bloom filter).
- Tài liệu Go: [`math/bits`](https://pkg.go.dev/math/bits) — luôn ưu tiên dùng thư viện chuẩn cho popcount, leading zeros, trailing zeros.
- Code: [solutions.go](./solutions.go).
