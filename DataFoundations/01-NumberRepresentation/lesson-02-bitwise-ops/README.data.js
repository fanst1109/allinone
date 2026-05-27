// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: DataFoundations/01-NumberRepresentation/lesson-02-bitwise-ops/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 02 — Bitwise Operations (phép toán trên bit)

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Hiểu và dùng thành thạo 6 phép toán bit trong Go: \`&\`, \`|\`, \`^\`, \`^\` (unary NOT), \`<<\`, \`>>\`.
- Biết cách dùng **bitmask** để bật/tắt/kiểm tra một bit cụ thể.
- Thuộc các "trick" hay gặp: kiểm tra power-of-2, đếm số bit 1, XOR swap, "find the lonely number".
- Hiểu bitmask trong DP (dynamic programming) và biểu diễn tập con bằng số.

## Kiến thức tiền đề

- [Lesson 01 — Binary & Hex](../lesson-01-binary-hex/) — bắt buộc, bài này tham chiếu liên tục biểu diễn nhị phân và two's complement.

## 1. Vì sao cần bitwise?

Bitwise nhanh hơn nhiều phép toán số học (single-cycle CPU instruction) và cho phép **đóng gói nhiều thông tin vào 1 số**. Ví dụ:

- **Permission file trên Unix**: \`chmod 755\` thực ra là \`rwxr-xr-x\` = 9 bit (3 bit cho user, 3 cho group, 3 cho others) — đóng gói thành 1 số 9-bit.
- **Cờ trạng thái**: thay vì 8 biến \`bool\`, dùng 1 byte với 8 bit, mỗi bit là một cờ. Giúp tiết kiệm bộ nhớ và so sánh nhanh (1 phép \`==\` thay vì 8).
- **Bitmask DP**: bài toán "travelling salesman" với n ≤ 20 đỉnh — biểu diễn "tập đỉnh đã thăm" bằng 1 số \`uint32\`, mỗi bit là một đỉnh.
- **Hash function**: nhiều hash dùng XOR, shift, để "trộn bit" nhanh.
- **Đồ thị Bitwise trick**: \`x & -x\` lấy bit thấp nhất → dùng trong Fenwick tree.

## 2. Sáu phép toán bit trong Go

Cú pháp Go (giống C/Java):

| Phép | Ký hiệu Go | Ý nghĩa |
| --- | --- | --- |
| AND | \`a & b\` | mỗi bit: 1 nếu **cả hai** đều 1 |
| OR | \`a \\| b\` | mỗi bit: 1 nếu **ít nhất một** là 1 |
| XOR | \`a ^ b\` | mỗi bit: 1 nếu **đúng một** trong hai là 1 |
| NOT (unary) | \`^a\` | đảo toàn bộ bit |
| Shift trái | \`a << k\` | dịch trái \`k\` bit (chèn 0 vào phải) |
| Shift phải | \`a >> k\` | dịch phải \`k\` bit |
| AND-NOT (Go riêng) | \`a &^ b\` | \`a & (^b)\` — "clear bits in a that are set in b" |

> Lưu ý: Go dùng \`^\` cho cả XOR (binary) và NOT (unary), không như C dùng \`~\` cho NOT. Đây là khác biệt nhỏ nhưng dễ lẫn.

### 2.1. Bảng chân lý

| a | b | a&b | a\\|b | a^b |
| --- | --- | --- | --- | --- |
| 0 | 0 | 0 | 0 | 0 |
| 0 | 1 | 0 | 1 | 1 |
| 1 | 0 | 0 | 1 | 1 |
| 1 | 1 | 1 | 1 | 0 |

### 2.2. Ví dụ cụ thể (8-bit)

\`\`\`
a = 0b11001100   (= 204)
b = 0b10101010   (= 170)

a & b = 0b10001000   (=  136)
a | b = 0b11101110   (=  238)
a ^ b = 0b01100110   (=  102)
   ^a = 0b00110011   (= không nói số vì phụ thuộc kiểu — xem §2.3)
a &^ b = 0b01000100  (=   68)
\`\`\`

Cách tính từng bit, ví dụ \`a & b\` bit thứ 7 (cao nhất): \`1 & 1 = 1\`. Bit thứ 6: \`1 & 0 = 0\`. v.v.

### 2.3. \`^a\` (NOT) phụ thuộc kiểu

\`^a\` đảo toàn bộ bit của \`a\`. Số bit được đảo = số bit của kiểu dữ liệu của \`a\`.

\`\`\`go
var a uint8 = 0b11001100   // 204
fmt.Printf("%08b\\n", ^a)   // 00110011 (= 51)

var b uint32 = 0b11001100  // 204
fmt.Printf("%032b\\n", ^b)  // 11111111 11111111 11111111 00110011 (= 4294967091)
\`\`\`

→ Khi dùng NOT, **luôn nhớ kiểu** của biến. Nếu muốn đảo chỉ 8 bit thấp của một số rộng hơn, dùng XOR với mặt nạ: \`a ^ 0xFF\`.

### 2.4. Shift trái / phải

\`\`\`
a = 0b00010110   (= 22)
a << 1 = 0b00101100   (= 44)   ← tương đương a * 2
a << 3 = 0b10110000   (= 176)  ← tương đương a * 8 (= 2^3)
a >> 1 = 0b00001011   (= 11)   ← tương đương a / 2 (làm tròn xuống)
\`\`\`

**Quy tắc**: \`x << k = x · 2^k\`, \`x >> k = floor(x / 2^k)\` (với unsigned).

Với số **âm** (signed) trong Go, \`>>\` là *arithmetic shift* — bit dấu được nhân bản:

\`\`\`go
var x int8 = -8        // 0b11111000
x >> 1                 // 0b11111100 = -4   (KHÔNG phải 124)
\`\`\`

Nếu bạn cần shift "logic" (chèn 0), ép sang \`uint\`.

## 3. Bitmask — thao tác trên bit thứ k

Bit được đánh số từ **bit 0 = bit thấp nhất** (phải nhất).

\`\`\`
bit số:  7  6  5  4  3  2  1  0
giá trị: 0  1  1  0  1  0  1  0  ← byte này = 0b01101010
\`\`\`

### 3.1. Bốn thao tác cơ bản

Giả sử \`x\` là số, \`k\` là chỉ số bit (0 = bit thấp nhất).

| Mục đích | Công thức Go | Giải thích |
| --- | --- | --- |
| **Lấy** bit k | \`(x >> k) & 1\` | đưa bit k về vị trí 0, lấy bit thấp nhất |
| **Set** bit k = 1 | \`x \\| (1 << k)\` | OR với mask chỉ có bit k = 1 |
| **Clear** bit k = 0 | \`x &^ (1 << k)\` | AND-NOT — Go-idiomatic |
| **Toggle** bit k (lật) | \`x ^ (1 << k)\` | XOR với mask chỉ có bit k = 1 |

Ví dụ với \`x = 0b01101010\` (= 106), thao tác trên bit 2:

\`\`\`
mask    = 1 << 2 = 0b00000100

get   :  (x >> 2) & 1 = (0b00011010) & 1 = 0     → bit 2 = 0
set   :  x | 0b00000100 = 0b01101110 (= 110)     → bit 2 = 1
clear :  x &^ 0b00000100 = 0b01101010 (= 106)    → không đổi (vốn đã 0)
toggle:  x ^ 0b00000100 = 0b01101110 (= 110)     → lật từ 0 → 1
\`\`\`

Đối với bit 1 (bit đang là 1):

\`\`\`
clear :  x &^ 0b00000010 = 0b01101000 (= 104)    → bit 1 từ 1 → 0
toggle:  x ^ 0b00000010 = 0b01101000 (= 104)    → cùng kết quả vì đang là 1
\`\`\`

### 3.2. Tại sao \`&^\` (AND-NOT)?

\`x &^ mask\` = \`x & (^mask)\`. Trong các ngôn ngữ khác (C, Java), bạn viết \`x & ~mask\`. Go gộp thành 1 toán tử \`&^\` cho gọn, đỡ phải quan tâm độ rộng của \`mask\` (vì \`^mask\` phụ thuộc kiểu).

## 4. Các "trick" bitwise kinh điển

### 4.1. Kiểm tra số chẵn / lẻ

\`\`\`go
isOdd := x & 1 == 1
isEven := x & 1 == 0
\`\`\`

Vì bit 0 là \`2⁰ = 1\` — số lẻ ↔ bit 0 bằng 1. Nhanh hơn \`x % 2 != 0\` ở mức compiler (mặc dù modern compiler tự optimize).

### 4.2. Kiểm tra power-of-2

\`n\` là lũy thừa của 2 (1, 2, 4, 8, 16, ...) ↔ binary của \`n\` có **đúng một bit 1**.

Trick: \`n & (n - 1) == 0\` (và \`n > 0\`).

Vì sao? Trừ 1 sẽ "lan" mượn xuống tới bit 1 thấp nhất, biến bit đó thành 0 và mọi bit dưới thành 1. AND lại → toàn 0 nếu lúc đầu chỉ có 1 bit.

\`\`\`
n = 0b01000   (= 8)
n-1 = 0b00111
n & (n-1) = 0b00000  ✓ là power-of-2

n = 0b01010   (= 10)
n-1 = 0b01001
n & (n-1) = 0b01000 ≠ 0  → KHÔNG phải power-of-2
\`\`\`

### 4.3. Đếm số bit 1 (popcount)

**Cách ngây thơ** (O(số bit)):

\`\`\`go
func popcountNaive(x uint64) int {
    count := 0
    for x > 0 {
        count += int(x & 1)
        x >>= 1
    }
    return count
}
\`\`\`

**Brian Kernighan's trick** (O(số bit 1) — nhanh hơn khi ít bit 1):

\`\`\`go
func popcountBK(x uint64) int {
    count := 0
    for x > 0 {
        x &= x - 1   // xóa bit 1 thấp nhất
        count++
    }
    return count
}
\`\`\`

Vì sao \`x &= x - 1\` xóa bit 1 thấp nhất? Như §4.2: trừ 1 mượn xuống bit 1 thấp nhất, biến nó thành 0 (và các bit dưới thành 1, nhưng AND với x sẽ giữ chúng là 0 vì x ở đó là 0).

\`\`\`
x     = 0b01101100
x-1   = 0b01101011
x&x-1 = 0b01101000   ← bit 1 thấp nhất (vị trí 2) đã thành 0
\`\`\`

**Trong production Go**: dùng [\`math/bits.OnesCount64\`](https://pkg.go.dev/math/bits#OnesCount64) — compiler dịch thành 1 instruction \`POPCNT\` của CPU, nhanh nhất.

### 4.4. Lấy / xóa bit 1 thấp nhất

- **Lấy bit 1 thấp nhất** (lowest set bit): \`x & -x\`
- **Xóa bit 1 thấp nhất**: \`x & (x - 1)\`

Ví dụ:

\`\`\`
x = 0b01101100   (= 108)
-x trong two's complement = 0b10010100
x & -x = 0b00000100   (= 4)   ← bit 1 thấp nhất ở vị trí 2
\`\`\`

Trick \`x & -x\` rất quan trọng vì là cốt lõi của **Fenwick tree** (Binary Indexed Tree) trong [DataStructures lesson-13](../../../DataStructures/03-Advanced/lesson-03-segment-tree/).

### 4.5. XOR swap (hoán đổi không cần biến tạm)

\`\`\`go
a ^= b
b ^= a
a ^= b
\`\`\`

Sau 3 dòng: \`a\` và \`b\` đã hoán đổi giá trị.

Vì sao? XOR có 3 tính chất "thần kỳ":
- \`a ^ a = 0\` (XOR với chính nó = 0)
- \`a ^ 0 = a\` (XOR với 0 không đổi)
- Giao hoán & kết hợp: \`a ^ b ^ a = b\`.

Mô phỏng với \`a = 5, b = 3\`:

\`\`\`
ban đầu: a = 0101, b = 0011
a ^= b:  a = 0101 ^ 0011 = 0110, b = 0011
b ^= a:  a = 0110, b = 0011 ^ 0110 = 0101  (= 5)  ← b giờ là a cũ
a ^= b:  a = 0110 ^ 0101 = 0011 (= 3),    b = 0101  ← a giờ là b cũ
\`\`\`

→ Đảo xong. ⚠️ Thực tế Go khuyến nghị dùng \`a, b = b, a\` cho rõ ràng hơn. XOR swap chỉ có ý nghĩa khi không có biến tạm (vd code embedded cực ngắn) — và **không hoạt động** nếu \`a\` và \`b\` cùng địa chỉ.

### 4.6. "The Lonely Number" — bài toán kinh điển

> Cho mảng số nguyên, mỗi số xuất hiện **đúng 2 lần**, trừ duy nhất 1 số xuất hiện 1 lần. Tìm số đó.

**Yêu cầu**: O(n) thời gian, O(1) bộ nhớ.

**Trick**: XOR toàn bộ mảng.

\`\`\`go
func findLonely(arr []int) int {
    result := 0
    for _, x := range arr {
        result ^= x
    }
    return result
}
\`\`\`

Vì sao? \`a ^ a = 0\`, nên tất cả các cặp tự triệt tiêu, chỉ còn lại số cô đơn XOR với 0 (= chính nó).

Ví dụ \`[4, 1, 2, 1, 2]\`:
\`\`\`
0 ^ 4 = 4
4 ^ 1 = 5
5 ^ 2 = 7
7 ^ 1 = 6
6 ^ 2 = 4   ← đáp án
\`\`\`

## 5. Bitmask cho tập hợp con

### 5.1. Ý tưởng

Với \`n\` phần tử (n ≤ 64), mỗi **tập con** ↔ một số \`n\`-bit. Bit thứ \`i\` = 1 nếu phần tử \`i\` có trong tập, = 0 nếu không.

Ví dụ \`n = 4\` phần tử \`{a, b, c, d}\` (đánh số 0..3):

| Mask binary | Mask hex | Tập con |
| --- | --- | --- |
| \`0000\` | 0x0 | {} (rỗng) |
| \`0001\` | 0x1 | {a} |
| \`0010\` | 0x2 | {b} |
| \`0011\` | 0x3 | {a, b} |
| \`0101\` | 0x5 | {a, c} |
| \`1111\` | 0xF | {a, b, c, d} |

Với \`n\` phần tử, có đúng \`2^n\` tập con — khớp với số có thể biểu diễn bằng \`n\` bit.

### 5.2. Duyệt mọi tập con

\`\`\`go
for mask := 0; mask < (1 << n); mask++ {
    // mask là một tập con
    for i := 0; i < n; i++ {
        if mask & (1 << i) != 0 {
            // phần tử i có trong tập con này
        }
    }
}
\`\`\`

Đây là khung của **bitmask DP**. Ứng dụng: TSP, "đếm cách ghép cặp", "tô màu đồ thị nhỏ", v.v. — sẽ gặp khi học thuật toán nâng cao.

### 5.3. Phép toán tập trên bitmask

Liên kết trực tiếp tới [Lesson 01 — Set Theory](../../02-SetTheory/lesson-01-set-theory/):

| Phép toán tập | Bitwise |
| --- | --- |
| Hợp \`A ∪ B\` | \`A \\| B\` |
| Giao \`A ∩ B\` | \`A & B\` |
| Hiệu \`A \\ B\` | \`A &^ B\` |
| Hiệu đối xứng \`A △ B\` | \`A ^ B\` |
| Phần bù \`Aᶜ\` (trong vũ trụ n bit) | \`(^A) & ((1<<n) - 1)\` |
| Kiểm tra \`i ∈ A\` | \`A & (1<<i) != 0\` |

→ Đây là lý do **bitwise và set theory được dạy cùng nhau**. Khi tập có ≤ 64 phần tử, bitmask là cách lưu set **gọn và nhanh** nhất.

## 6. Trả lời các câu hỏi tự nhiên

**Q: Khi nào nên dùng bitwise, khi nào dùng \`map[int]bool\` hay \`[]bool\`?**

- Số phần tử ≤ 64, biết trước: **bitmask** (1 uint64). Nhanh nhất, nhỏ nhất.
- Số phần tử ≤ vài nghìn, biết trước: \`[]bool\` hoặc bitset (vd dùng \`math/big.Int\` cho bit dài).
- Số phần tử lớn / không biết trước / sparse: \`map[int]bool\`.

**Q: \`x << 64\` trong Go cho ra gì?**

Với \`x\` kiểu \`uint64\`: **hành vi không xác định ở mức C, nhưng Go định nghĩa rõ** — kết quả là \`0\` (shift bằng hoặc lớn hơn số bit của kiểu → 0). Nhưng \`1 << 64\` (literal) sẽ compile lỗi vì \`1\` mặc định là \`int\` (32 hoặc 64 bit tùy platform) và shift ngoài phạm vi bị từ chối lúc compile.

**Q: Có cách nào pretty-print bit của một số trong Go không?**

\`\`\`go
fmt.Printf("%08b\\n", uint8(42))   // 00101010
fmt.Printf("%032b\\n", uint32(42)) // 00000000000000000000000000101010
\`\`\`

\`%08b\` = format binary, padding 0 đến 8 chữ.

**Q: Trong production, đếm bit 1 mình tự viết hay dùng thư viện?**

Dùng [\`math/bits\`](https://pkg.go.dev/math/bits) — Go compiler optimize thành CPU instruction nếu có (Intel POPCNT, ARM CNT). Tự viết chỉ để học.

\`\`\`go
import "math/bits"
n := bits.OnesCount64(0b1101)  // 3
\`\`\`

**Q: Bitwise có dùng được với \`string\` không?**

Không trực tiếp. Phải lặp qua từng byte: \`for i := 0; i < len(s); i++ { x ^= uint64(s[i]) }\`. Đây là cách viết hash chuỗi đơn giản nhất (nhưng tệ — sẽ học hash thật trong [Hash Table](../../../DataStructures/01-Basic/lesson-06-hash-table/)).

## 7. Ứng dụng thực tế — bitwise dùng ở đâu trong code thật?

Nhiều người học bitwise xong tự hỏi *"OK biết rồi, nhưng dùng làm gì?"*. Mục này trả lời: 8 nhóm ứng dụng phổ biến nhất, mỗi nhóm có ví dụ cụ thể + code Go chạy được + chỉ rõ thư viện/framework nào đang dùng.

> 💡 **Lý do bitwise tồn tại trong code production**: nó cho phép **làm việc với nhiều giá trị đồng thời trong 1 word CPU** (1 lệnh, 1 chu kỳ clock). Một \`uint64 & uint64\` xử lý 64 trạng thái boolean cùng lúc — nhanh hơn 64 lần so với mảng bool 64 phần tử. Khi cần tiết kiệm bộ nhớ, tốc độ cực cao, hoặc giao tiếp phần cứng — bitwise là công cụ chuẩn.

### 8.1. Bit Packing — đóng gói nhiều giá trị nhỏ vào 1 int

**Vấn đề**: bạn có nhiều trường nhỏ (mỗi trường vài bit), nếu lưu thành nhiều biến \`int\` riêng thì lãng phí bộ nhớ (mỗi \`int32\` = 32 bit dù trường chỉ cần 4 bit).

**Giải pháp**: nhét chúng vào cùng 1 \`int\` lớn, dùng shift + mask để đọc/ghi từng trường.

#### Ví dụ 1: Màu RGB 24-bit

Mỗi kênh đỏ/xanh lá/xanh dương = 8 bit (0-255). Cả 3 nhét vừa vặn 24 bit, thường lưu trong \`uint32\`:

\`\`\`go
// Encode: (R, G, B) → 1 uint32
func packRGB(r, g, b uint8) uint32 {
    return uint32(r)<<16 | uint32(g)<<8 | uint32(b)
}

// Decode ngược lại
func unpackRGB(c uint32) (r, g, b uint8) {
    r = uint8((c >> 16) & 0xFF)
    g = uint8((c >> 8)  & 0xFF)
    b = uint8(c & 0xFF)
    return
}
\`\`\`

**Walk-through cho màu cam \`(255, 165, 0)\`**:

\`\`\`
r = 255 = 11111111
g = 165 = 10100101
b = 0   = 00000000

r << 16: 00000000 11111111 00000000 00000000  (đẩy r lên byte cao)
g << 8:  00000000 00000000 10100101 00000000  (đẩy g vào byte giữa)
b:       00000000 00000000 00000000 00000000  (b nằm byte thấp)
─────────────────────────────────────────────  OR cả 3
result:  00000000 11111111 10100101 00000000  = 0x00FFA500
\`\`\`

Đây chính là **hex màu CSS \`#FFA500\`** bạn vẫn dùng để định màu trong HTML/CSS. Mọi browser engine, image library (Pillow, ImageMagick), GPU framework (OpenGL, Vulkan) đều pack pixel theo cách này — \`0xRRGGBB\` hoặc \`0xAARRGGBB\` cho có thêm kênh alpha.

#### Ví dụ 2: Unix file permissions

Lệnh \`chmod 755 file\` dùng số \`755\` để biểu diễn quyền truy cập. Mỗi chữ số biểu diễn 1 nhóm (user / group / other), mỗi nhóm có 3 bit \`rwx\` (read/write/execute):

| Decimal | Binary | Permissions |
| ------- | ------ | ----------- |
| 7 | 111 | rwx (full) |
| 6 | 110 | rw- |
| 5 | 101 | r-x |
| 4 | 100 | r-- |
| 0 | 000 | --- |

→ \`755\` = \`111 101 101\` = \`0o755\` = user có rwx, group có r-x, other có r-x.

Code Go xử lý permission:

\`\`\`go
const (
    OtherX = 1 << 0 // 001
    OtherW = 1 << 1 // 010
    OtherR = 1 << 2 // 100
    GroupX = 1 << 3
    GroupW = 1 << 4
    GroupR = 1 << 5
    UserX  = 1 << 6
    UserW  = 1 << 7
    UserR  = 1 << 8
)

func canUserExecute(perm int) bool { return perm & UserX != 0 }
func grantGroupWrite(perm int) int { return perm | GroupW }
\`\`\`

Đây là cách Linux/macOS kernel lưu permission trong inode. Khi bạn \`os.Chmod(0o755, ...)\` trong Go, nội tại syscall pass nguyên uint32 này tới kernel.

#### Ví dụ 3: Đóng gói thời gian (datetime packing)

MS-DOS lưu timestamp file trong **4 byte** (32 bit), chia ra:

\`\`\`
yyyyyyy mmmm ddddd  hhhhh mmmmmm sssss
   7      4    5      5     6     5     (bits)
\`\`\`

- Năm (year - 1980): 7 bit (1980-2107)
- Tháng: 4 bit (1-12)
- Ngày: 5 bit (1-31)
- Giờ: 5 bit (0-23)
- Phút: 6 bit (0-59)
- Giây/2: 5 bit (0-29, độ phân giải 2 giây)

\`\`\`go
func packDOSTime(year, month, day, hour, min, sec int) uint32 {
    return uint32((year-1980)&0x7F)<<25 |
           uint32(month&0xF)<<21 |
           uint32(day&0x1F)<<16 |
           uint32(hour&0x1F)<<11 |
           uint32(min&0x3F)<<5 |
           uint32((sec/2)&0x1F)
}
\`\`\`

Format này vẫn dùng trong ZIP file header (PKZIP spec) — mở 1 file \`.zip\` bằng hex editor sẽ thấy. ZIP ra đời 1989, vẫn ngon đến giờ.

#### Ví dụ 4: Encode trạng thái game vào 1 byte

\`\`\`go
// State của 1 entity trong game: 8 bit, mỗi bit 1 trạng thái
const (
    StateAlive    uint8 = 1 << 0  // 00000001
    StateMoving   uint8 = 1 << 1  // 00000010
    StateFrozen   uint8 = 1 << 2  // 00000100
    StateInvisible uint8 = 1 << 3 // 00001000
    StateInvincible uint8 = 1 << 4
    StateBoosted  uint8 = 1 << 5
    StatePoisoned uint8 = 1 << 6
    StateBurning  uint8 = 1 << 7
)

// 1 entity với 8 trạng thái độc lập = 1 byte. 1 triệu entity = 1 MB.
type Entity struct {
    state uint8
    // ... các trường khác
}

func (e *Entity) IsAlive() bool      { return e.state & StateAlive != 0 }
func (e *Entity) Freeze()            { e.state |= StateFrozen }
func (e *Entity) Unfreeze()          { e.state &^= StateFrozen }
func (e *Entity) ClearAllDebuffs()   { e.state &^= StateFrozen | StatePoisoned | StateBurning }
\`\`\`

So sánh: nếu dùng 8 trường \`bool\` riêng, Go padding mỗi \`bool\` 1 byte → 8 byte per entity. Bit packing tiết kiệm **8 lần** bộ nhớ + check nhiều trạng thái cùng lúc trong 1 phép \`&\`.

> ❓ **"Tại sao không dùng \`struct { Alive, Frozen, ... bool }\`?"** — Vì bộ nhớ và cache. Game AAA có 100K+ entity update mỗi frame; nếu state nằm rải rác trong RAM thì CPU cache miss liên tục, FPS tụt. Pack vào 1 byte: 100K state = 100KB, fit hết vào L2 cache → loop nhanh hơn 10-50 lần. Đây là core của **data-oriented design** (Mike Acton, Unity DOTS, Bevy ECS).

### 8.2. Bitmap / Bitset — tập hợp tiết kiệm bộ nhớ

**Vấn đề**: cần đánh dấu *"phần tử i có/không thuộc tập S"* với N rất lớn (1 triệu, 1 tỷ phần tử).

- Dùng \`map[int]bool\` hoặc \`[]bool\`: 1 byte / phần tử → 1 tỷ phần tử = 1 GB. Quá lớn.
- Dùng **bitset** (mảng \`uint64\`, mỗi bit là 1 phần tử): 1 bit / phần tử → 1 tỷ phần tử = 125 MB. **Nhỏ hơn 8 lần**.

\`\`\`go
type Bitset struct {
    bits []uint64
    n    int
}

func NewBitset(n int) *Bitset {
    return &Bitset{bits: make([]uint64, (n+63)/64), n: n}
}

// Set bit thứ i lên 1
func (b *Bitset) Set(i int) {
    b.bits[i>>6] |= 1 << (i & 63)
    //      ↑          ↑
    //   i / 64    i % 64
}

// Test bit thứ i
func (b *Bitset) Test(i int) bool {
    return b.bits[i>>6] & (1<<(i&63)) != 0
}

// Đếm tổng số bit 1 (cardinality)
func (b *Bitset) Count() int {
    total := 0
    for _, w := range b.bits {
        total += bits.OnesCount64(w)
    }
    return total
}
\`\`\`

> ⚠ **Tại sao \`i>>6\` thay vì \`i/64\`?** Compiler hiện đại đã tự chuyển \`i/64\` thành \`i>>6\` (vì 64 là power of 2). Code sản xuất viết \`i/64\` đọc dễ hơn. Nhưng để học bitwise: nhớ \`i / 2^k ≡ i >> k\` cho số dương.

#### Ứng dụng thực tế của bitset:

1. **Sieve of Eratosthenes** — tìm số nguyên tố tới N. Mảng \`isPrime\` dạng bitset thay vì \`[]bool\` cho N = 10^9.
2. **Visited set trong BFS/DFS** — đánh dấu node đã thăm trong graph khổng lồ.
3. **Bloom filter** — kiểm tra xấp xỉ phần tử có trong tập (cho phép false positive). Lõi của Cassandra, Redis, Bitcoin... Sẽ học kỹ trong [Lesson 04 — Advanced Structures](../../../DataStructures/03-Advanced/lesson-04-advanced-structures/).
4. **Column index trong database** — PostgreSQL Bitmap Index Scan, MySQL Bitmap Index, ClickHouse: scan 1M dòng → trả về bitmap đánh dấu dòng nào match, AND/OR nhiều điều kiện trên bitmap → cuối cùng load chỉ những dòng \`bit=1\`.
5. **Roaring Bitmap** (\`github.com/RoaringBitmap/roaring\`) — bitmap nén thông minh, dùng trong Apache Lucene, Elasticsearch, Druid, InfluxDB. Đại để: chia keyspace thành chunk 64K, mỗi chunk lưu kiểu khác nhau tùy mật độ.

### 8.3. Lập trình game — flags, layers, masks

Game engine dùng bitwise gần như mọi nơi vì cần xử lý hàng nghìn entity mỗi frame (16ms cho 60 FPS).

#### Collision Layer Mask

Mỗi entity thuộc 1+ "layer" (Player, Enemy, Wall, Pickup, ...). Khi raycast hoặc check va chạm, ta hỏi *"tia này va chạm với layer nào?"* — câu hỏi này biểu diễn bằng bitmask.

\`\`\`go
const (
    LayerDefault   uint32 = 1 << 0
    LayerPlayer    uint32 = 1 << 1
    LayerEnemy     uint32 = 1 << 2
    LayerWall      uint32 = 1 << 3
    LayerPickup    uint32 = 1 << 4
    LayerProjectile uint32 = 1 << 5
)

// Đạn của player chỉ va chạm với Enemy + Wall, KHÔNG va vào Player khác
projectileMask := LayerEnemy | LayerWall

// Khi check: entity.layer & mask != 0 → có collision
func ShouldCollide(entityLayer, mask uint32) bool {
    return entityLayer & mask != 0
}
\`\`\`

Đây là pattern chính trong **Unity** (\`Physics.Raycast(..., layerMask)\`), **Unreal Engine** (\`FCollisionObjectQueryParams\`), **Godot** (\`collision_mask\`), **Box2D** (\`filter.maskBits\`). Đọc docs các engine sẽ thấy đúng pattern này.

#### 8-Direction Movement

Nhân vật có thể di chuyển 8 hướng (4 cardinal + 4 diagonal). Encode hướng vào 4 bit:

\`\`\`go
const (
    DirNone  = 0
    DirUp    = 1 << 0  // 0001
    DirDown  = 1 << 1  // 0010
    DirLeft  = 1 << 2  // 0100
    DirRight = 1 << 3  // 1000
)

// Diagonal = combo bit
var DirUpLeft    = DirUp | DirLeft     // 0101
var DirUpRight   = DirUp | DirRight    // 1001
var DirDownLeft  = DirDown | DirLeft   // 0110
var DirDownRight = DirDown | DirRight  // 1010

// Input keyboard → direction
func InputToDir(up, down, left, right bool) int {
    var d int
    if up    { d |= DirUp }
    if down  { d |= DirDown }
    if left  { d |= DirLeft }
    if right { d |= DirRight }
    // Loại trừ xung đột: up + down cùng lúc = đứng yên
    if d&DirUp != 0 && d&DirDown != 0 { d &^= DirUp | DirDown }
    if d&DirLeft != 0 && d&DirRight != 0 { d &^= DirLeft | DirRight }
    return d
}
\`\`\`

#### Achievement / Quest Flags

Game có 64 thành tích → 1 \`uint64\` lưu hết. Lưu vào save file chỉ 8 byte. Check "đã hoàn thành quest X chưa?" bằng \`(flags >> questID) & 1\`.

> 💡 Old-school game (NES, GBA — RAM rất ít) **bắt buộc** dùng bitwise để vừa cartridge. Pokemon Red gốc dùng ~2KB RAM cho toàn bộ state game. Bit tiết kiệm là sống còn.

### 8.4. Embedded systems & lập trình nhúng

Khi viết firmware cho vi điều khiển (Arduino, STM32, ESP32, Raspberry Pi GPIO), bitwise là **bắt buộc** vì ta giao tiếp trực tiếp với phần cứng qua thanh ghi (register) — mỗi bit của register có ý nghĩa riêng.

#### Bật/Tắt 1 chân GPIO

GPIO register là 1 ô nhớ 32 bit, mỗi bit điều khiển 1 chân. Để bật chân 5 mà không đụng các chân khác:

\`\`\`c
// C trên STM32
#define GPIO_PIN_5  (1U << 5)

GPIOA->ODR |= GPIO_PIN_5;   // bật chân 5 (set bit 5 lên 1)
GPIOA->ODR &= ~GPIO_PIN_5;  // tắt chân 5
GPIOA->ODR ^= GPIO_PIN_5;   // toggle chân 5

// Đọc trạng thái chân
if (GPIOA->IDR & GPIO_PIN_5) { /* chân 5 đang HIGH */ }
\`\`\`

Nếu viết \`GPIOA->ODR = 0x20\` thay vì \`|=\` thì sẽ **ghi đè 31 chân còn lại về 0** — tắt mọi thiết bị khác đang nối tới chip. Đây là lỗi nhúng cổ điển. **Bitwise OR/AND là cách duy nhất đúng**.

#### Đọc Status Register

Cảm biến nhiệt độ kết nối qua I2C trả về byte status:

\`\`\`
bit 7: data ready
bit 6: over-range error
bit 5: under-range error
bit 4: heater on
bit 3-0: reserved
\`\`\`

\`\`\`go
const (
    StatusDataReady  = 1 << 7
    StatusOverRange  = 1 << 6
    StatusUnderRange = 1 << 5
    StatusHeaterOn   = 1 << 4
)

status := readByte(sensorAddr, 0x00)
if status & StatusOverRange != 0 {
    log.Println("Cảm biến over-range, đổi range!")
}
if status & (StatusOverRange | StatusUnderRange) != 0 {
    // error chung — check 2 bit cùng lúc bằng 1 phép AND
}
\`\`\`

#### Ring buffer với power-of-2

Buffer vòng tròn (audio, network packet, log) cần \`index % size\`. Nếu \`size\` là **power of 2**, thay \`%\` bằng \`& (size-1)\` — nhanh hơn 5-10 lần vì CPU không phải làm phép chia.

\`\`\`go
const BufSize = 1024  // = 2^10
var buf [BufSize]byte
var head int

func push(b byte) {
    buf[head & (BufSize - 1)] = b   // == head % 1024 nhưng nhanh hơn
    head++
}
\`\`\`

Đây là lý do **mọi ring buffer thật trên thế giới đều chọn size là power of 2**: Linux kernel pipe (1MB = 2^20), nginx buffer pool, Disruptor (LMAX), Kafka log segment, audio DSP buffer.

> ⚠ **Bẫy**: \`head & (size-1)\` **chỉ đúng khi \`size\` là power of 2**. Nếu bạn dùng \`size = 1000\`, công thức cho sai kết quả. Phải dùng \`head % size\`. Đây là sai lầm phổ biến khi copy code từ blog.

#### Protocol parsing — bit field trong header

TCP header (RFC 793) chứa 6 cờ trạng thái nhồi trong 1 byte (bit 8-13 của offset+flags word):

\`\`\`
URG ACK PSH RST SYN FIN
\`\`\`

\`\`\`go
const (
    TCPFlagFIN = 1 << 0
    TCPFlagSYN = 1 << 1
    TCPFlagRST = 1 << 2
    TCPFlagPSH = 1 << 3
    TCPFlagACK = 1 << 4
    TCPFlagURG = 1 << 5
)

func isSYNACK(flags uint8) bool {
    return flags & (TCPFlagSYN | TCPFlagACK) == (TCPFlagSYN | TCPFlagACK)
    // Cả 2 bit phải có
}
\`\`\`

Wireshark, tcpdump, nmap parse mọi packet network theo cách này. BLE (Bluetooth Low Energy), Zigbee, MQTT — mọi protocol nén header đều dùng bit field.

### 8.5. Cryptography & hashing

Mọi hàm hash, mã hóa hiện đại đều dùng bitwise dày đặc — XOR, rotate, shift, AND/OR.

#### XOR — bản chất của one-time pad

Tính chất \`a XOR b XOR b = a\` (XOR là involution) là nền của **mã hóa one-time pad**: với khóa \`k\` cùng độ dài plaintext, \`ciphertext = plaintext XOR k\`, decrypt bằng \`ciphertext XOR k\`.

\`\`\`go
func xorEncrypt(plaintext, key []byte) []byte {
    out := make([]byte, len(plaintext))
    for i := range plaintext {
        out[i] = plaintext[i] ^ key[i%len(key)]
    }
    return out
}
\`\`\`

Stream cipher (RC4, ChaCha20, AES-CTR) đều có dạng \`ciphertext = plaintext XOR keystream\`, chỉ khác cách sinh \`keystream\`.

#### Rotate-left/right trong hash

SHA-1, SHA-2, MD5 đều dùng phép **rotate** (xoay bit vòng):

\`\`\`go
// Rotate left k bit (uint32)
func rotl32(x uint32, k uint) uint32 {
    return (x << k) | (x >> (32 - k))
}
\`\`\`

Walk-through \`rotl32(0x12345678, 8)\`:
\`\`\`
x        = 00010010 00110100 01010110 01111000   = 0x12345678
x << 8   = 00110100 01010110 01111000 00000000   = 0x34567800
x >> 24  = 00000000 00000000 00000000 00010010   = 0x00000012
OR       = 00110100 01010110 01111000 00010010   = 0x34567812
\`\`\`

→ Bit cao 8 (\`00010010\`) "chui ra trái" và quay lại bên phải. Đây là phép xáo trộn ngẫu nhiên rẻ nhất, cực kỳ hay được dùng trong cryptographic primitives.

Go có sẵn \`bits.RotateLeft32(x, k)\` — production luôn dùng cái này.

#### XOR-shift RNG

Random number generator nhanh, không cần seed phức tạp:

\`\`\`go
var state uint64 = 0x123456789ABCDEF0  // seed

func nextRand() uint64 {
    state ^= state << 13
    state ^= state >> 7
    state ^= state << 17
    return state
}
\`\`\`

3 phép XOR + shift đơn giản, sinh dãy số chu kỳ 2^64 − 1, đủ cho game/simulation. Marsaglia (2003) phát minh. Pseudo-random nhưng đủ tốt cho non-crypto.

### 8.6. Networking & IP address

Địa chỉ IPv4 là 32 bit, thường viết dạng \`192.168.1.10\` (mỗi octet là 8 bit).

\`\`\`go
func ipv4ToInt(a, b, c, d uint8) uint32 {
    return uint32(a)<<24 | uint32(b)<<16 | uint32(c)<<8 | uint32(d)
}

// 192.168.1.10 = 0xC0A8010A
\`\`\`

#### CIDR — subnet mask

Notation \`192.168.1.0/24\` có nghĩa "24 bit cao là network, 8 bit thấp là host". Subnet mask = 24 bit 1, 8 bit 0 = \`255.255.255.0\`.

\`\`\`go
// Tạo mask từ prefix length
func cidrMask(prefix int) uint32 {
    return ^uint32(0) << (32 - prefix)
}

// cidrMask(24) = 11111111 11111111 11111111 00000000 = 0xFFFFFF00

// Check IP có thuộc subnet không
func sameSubnet(ip1, ip2 uint32, prefix int) bool {
    mask := cidrMask(prefix)
    return ip1 & mask == ip2 & mask
}

// Network address của 1 IP
func networkAddr(ip uint32, prefix int) uint32 {
    return ip & cidrMask(prefix)
}

// Broadcast address = network OR ~mask
func broadcastAddr(ip uint32, prefix int) uint32 {
    return ip | ^cidrMask(prefix)
}
\`\`\`

→ Router, firewall, gói \`net\` của Go (\`net.ParseCIDR\`, \`*net.IPNet.Contains\`) đều xài bitwise này. Khi config iptables, ACL Cisco, security group AWS — đằng sau là \`ip & mask\`.

### 8.7. Performance tricks — branchless code

Branch (if/else) làm CPU pipeline stall (mispredict ~10-20 cycle). Code nhạy cảm với performance thường thay branch bằng bit trick.

#### Absolute value không cần if

\`\`\`go
func abs(x int32) int32 {
    mask := x >> 31  // x âm: mask = -1 (toàn 1); x dương: mask = 0
    return (x ^ mask) - mask
}
\`\`\`

Walk-through:
- \`x = 5\`: \`mask = 0\` → \`(5^0) - 0 = 5\` ✓
- \`x = -5\`: \`mask = -1 = 0xFFFFFFFF\` → \`(-5) ^ (-1) = 4\`, \`4 - (-1) = 5\` ✓ (XOR với -1 trên two's complement đảo bit = flip, +1 = abs)

#### Min/Max không cần if

\`\`\`go
func min(a, b int32) int32 {
    return b ^ ((a ^ b) & -boolToInt(a < b))
}
\`\`\`

Lằng nhằng, ít người viết tay. Nhưng compiler tối ưu sẵn (\`(a < b) ? a : b\` → branchless trên x86 dùng lệnh \`CMOV\`).

#### Power-of-2 checks

| Câu hỏi | Bit trick |
| ------- | --------- |
| \`n\` có là power of 2? | \`n > 0 && (n & (n-1)) == 0\` |
| Round up \`n\` lên power of 2 tiếp theo | Nhiều bước shift + OR (xem Hacker's Delight ch 3-2) |
| \`n % 8\` (8 là power 2) | \`n & 7\` |
| \`n / 16\` (signed bị bias âm) | \`n >> 4\` cho n dương; cẩn thận với n âm |
| Swap 2 biến không cần temp | \`a ^= b; b ^= a; a ^= b;\` (chỉ cho int khác nhau, có cảnh báo) |

> ⚠ **Trick "swap XOR" trong code thật**: ĐỪNG dùng. Compiler optimize sẵn swap với register; XOR-swap chậm hơn (data dependency) và sai khi 2 biến trỏ cùng vị trí (a^=a → 0). Chỉ tốt làm bài phỏng vấn vui.

### 8.8. Database, compression, full-text search

#### Compressed integer (varint, zigzag)

Khi serialize int trong Protocol Buffers, Avro, Thrift, MessagePack — số nhỏ chỉ lưu 1-2 byte, số lớn 5-10 byte. **Varint encoding** dùng 7 bit cho data + 1 bit "còn tiếp":

\`\`\`go
func encodeVarint(v uint64) []byte {
    var buf []byte
    for v >= 0x80 {
        buf = append(buf, byte(v) | 0x80)  // bit 7 = 1 → còn tiếp
        v >>= 7
    }
    buf = append(buf, byte(v))             // bit 7 = 0 → byte cuối
    return buf
}
\`\`\`

→ Số 127 lưu 1 byte; 16383 lưu 2 byte; 1 tỷ lưu 5 byte. So với uint64 cố định 8 byte: tiết kiệm 50-90% cho data thực tế (thường skewed về số nhỏ).

#### Bloom filter — kiểm tra tập với false positive

Cassandra, Redis (Bloom module), Bitcoin SPV wallet, Chrome (Safe Browsing) — tất cả dùng. Cơ chế: 1 bitset cố định + k hàm hash. Add: set k bit. Test: check k bit có hết bằng 1 không.

\`\`\`go
type BloomFilter struct {
    bits []uint64
    m    int  // size in bits
    k    int  // số hash function
}

func (b *BloomFilter) Add(item string) {
    for i := 0; i < b.k; i++ {
        h := hash(item, i) % uint64(b.m)
        b.bits[h>>6] |= 1 << (h & 63)
    }
}

func (b *BloomFilter) MaybeContains(item string) bool {
    for i := 0; i < b.k; i++ {
        h := hash(item, i) % uint64(b.m)
        if b.bits[h>>6] & (1 << (h & 63)) == 0 {
            return false  // chắc chắn không có
        }
    }
    return true  // *có thể* có (false positive)
}
\`\`\`

Sẽ học chi tiết trong [Lesson 04 — Advanced Structures](../../../DataStructures/03-Advanced/lesson-04-advanced-structures/).

#### Full-text search — posting list AND/OR

ElasticSearch / Lucene tìm "apple AND banana": load posting list (bitmap doc-id chứa apple) AND với posting list của banana → 1 phép AND trên bitmap = trả ra mọi doc chứa cả 2 từ. Hàng triệu doc / micro-giây.

### 8.9. Tóm tắt — bitwise xuất hiện ở đâu

| Lĩnh vực | Use case cụ thể | Lệnh chính |
| -------- | ---------------- | ---------- |
| Đồ họa | RGB packing, alpha blending, GPU shader | \`<<\`, \`\\|\`, \`&\` mask |
| Game | Entity flags, collision layer, direction | \`\\|=\`, \`&\`, \`&^\` |
| Embedded | GPIO, register, ring buffer | \`\\|=\`, \`&\`, \`^\`, \`& (n-1)\` |
| OS / kernel | Permissions, syscall flags, signal mask | tất cả |
| Crypto | XOR cipher, rotate hash, RNG | \`^\`, rotate |
| Network | IP/CIDR mask, TCP flag, protocol field | \`&\`, \`\\|\`, mask |
| DB / Search | Bitmap index, Bloom filter, varint | \`& (1<<i)\`, OR posting |
| Compression | Huffman, LZ77, varint | mọi thứ |
| Performance | Branchless min/max/abs, mod-by-pow2 | \`>>\`, \`^\`, \`&\` |

→ Bitwise không phải kỹ thuật "low-level cho fun" — nó là **ngôn ngữ làm việc với phần cứng và tối ưu**. Mọi codebase production lớn (Linux kernel, PostgreSQL, Go runtime, Chrome, Unreal Engine) đều có hàng nghìn dòng bitwise.

> 🔁 **Dừng lại tự kiểm tra**:
>
> 1. Vì sao Pokemon Red dùng bitwise để lưu badge của trainer?
> 2. Cho \`permission = 0o644\`, viết biểu thức bitwise để "tăng quyền thực thi cho group".
> 3. Vì sao \`head & (size-1)\` chỉ đúng khi size là power of 2?
>
> <details>
> <summary>Đáp án</summary>
>
> 1. RAM cartridge GBA có ~32 KB. 8 badge × 1 byte bool = 8 byte; 8 badge × 1 bit bitmap = 1 byte. Khi cần 100 flag, tiết kiệm trở thành sống còn.
> 2. \`permission | (1 << 3)\` (bit 3 = GroupExecute). Kết quả: \`0o644 | 0o010 = 0o654\`. Trên CLI: \`chmod g+x file\`.
> 3. Vì \`size - 1\` cho power of 2 (vd 1024 → 1023 = \`0b1111111111\`) là 1 chuỗi bit 1 liên tiếp — AND giữ lại đúng \`log2(size)\` bit thấp = phần dư của \`head / size\`. Với \`size = 1000\`, \`999 = 0b1111100111\` không phải chuỗi bit 1 → AND cho kết quả vô nghĩa.
> </details>

> 📝 **Tóm tắt mục 7**: Bitwise không chỉ là toán — nó xuất hiện khắp mọi nơi cần (1) tiết kiệm bộ nhớ, (2) tốc độ cao, (3) giao tiếp phần cứng, (4) protocol cố định. Pattern hay gặp nhất: **bit packing** (đóng gói nhiều giá trị nhỏ), **bitmap/bitset** (tập membership 1 bit/phần tử), **flags** (tổ hợp boolean), **mask** (lọc bit cần quan tâm). Sau bài này khi gặp 1 thư viện gọi \`flags |= SOMETHING\`, bạn không còn ngạc nhiên nữa.

## 8. Bài tập

**Bài 1.** Tính bằng tay (không chạy code):
- \`0b1100 & 0b1010\`
- \`0b1100 | 0b1010\`
- \`0b1100 ^ 0b1010\`
- \`0b1100 &^ 0b1010\`
- \`^(uint8(0b1100))\` — viết kết quả 8-bit.

**Bài 2.** Cho \`x = 0b10110100\` (= 180). Tính:
- bit 3 của x = ?
- set bit 0 của x → giá trị mới?
- clear bit 5 của x → giá trị mới?
- toggle bit 7 của x → giá trị mới?

**Bài 3.** Viết hàm Go \`isPowerOfTwo(n uint64) bool\` trả về true nếu \`n\` là lũy thừa của 2.

**Bài 4.** Viết hàm \`countBits(x uint64) int\` đếm số bit 1, dùng Brian Kernighan's trick.

**Bài 5.** Cho mảng \`[2, 3, 5, 2, 5, 7, 3]\`. Tìm số xuất hiện 1 lần bằng XOR. Trình bày các bước XOR.

**Bài 6.** Cho permission Unix dạng số: \`read = 4 = 0b100\`, \`write = 2 = 0b010\`, \`execute = 1 = 0b001\`. Viết hàm \`hasReadPermission(perm uint8) bool\` và \`addWritePermission(perm uint8) uint8\`.

**Bài 7.** Viết hàm \`printSubsets(items []string)\` in tất cả tập con của \`items\`, dùng bitmask. Với input \`["a", "b", "c"]\` phải in đủ 8 tập con (kể cả tập rỗng).

**Bài 8.** Viết hàm \`reverseBits(x uint8) uint8\` đảo ngược 8 bit (bit 0 ↔ bit 7, bit 1 ↔ bit 6, ...). Ví dụ \`0b11010010 → 0b01001011\`.

## Lời giải chi tiết

### Bài 1

\`\`\`
  1100        1100        1100        1100
& 1010      | 1010      ^ 1010      &^ 1010
------      ------      ------      ------
  1000        1110        0110        0100
\`\`\`

Chi tiết \`&^\`: \`a &^ b = a & (^b)\`. \`^0b1010 = 0b0101\` (4 bit), nên \`0b1100 & 0b0101 = 0b0100\`. Diễn giải: "giữ các bit của a, trừ những bit b đặt".

\`^(uint8(0b1100))\` = đảo 8 bit của \`0b00001100\` = \`0b11110011\` = 243.

### Bài 2

x = \`0b10110100\` = 180.

- **bit 3** (tính từ phải, 0-indexed): nhìn vào dãy \`10110100\`, đếm từ phải: bit 0 = 0, bit 1 = 0, bit 2 = 1, **bit 3 = 0**. Tính bằng công thức: \`(180 >> 3) & 1 = 0b10110 & 1 = 0\`.
- **set bit 0**: \`180 | 0b00000001 = 0b10110101 = 181\`.
- **clear bit 5**: bit 5 = \`2⁵ = 32\`. \`180 &^ 32 = 0b10110100 &^ 0b00100000 = 0b10010100 = 148\`.
- **toggle bit 7**: bit 7 = \`2⁷ = 128\`. \`180 ^ 128 = 0b00110100 = 52\`.

### Bài 3

\`\`\`go
func isPowerOfTwo(n uint64) bool {
    return n > 0 && n & (n - 1) == 0
}
\`\`\`

Điều kiện \`n > 0\` quan trọng vì với \`n = 0\`: \`0 & (0 - 1) = 0 & maxUint64 = 0\` → công thức sẽ ra true. Mà \`0\` không phải power-of-2.

Test:
- \`isPowerOfTwo(1)\` → \`1 & 0 = 0\` → true ✓ (1 = 2⁰)
- \`isPowerOfTwo(8)\` → \`8 & 7 = 0b1000 & 0b0111 = 0\` → true ✓
- \`isPowerOfTwo(10)\` → \`10 & 9 = 0b1010 & 0b1001 = 0b1000 ≠ 0\` → false ✓

Độ phức tạp: O(1).

### Bài 4

\`\`\`go
func countBits(x uint64) int {
    count := 0
    for x != 0 {
        x &= x - 1
        count++
    }
    return count
}
\`\`\`

Vòng lặp chạy đúng \`popcount(x)\` lần (mỗi vòng xóa 1 bit). Độ phức tạp: O(số bit 1) — nhanh hơn O(số bit) nếu x thưa.

### Bài 5

Mảng: \`[2, 3, 5, 2, 5, 7, 3]\`. Tìm số xuất hiện 1 lần (đáp án: 7).

XOR tích lũy:
\`\`\`
0 ^ 2 = 2
2 ^ 3 = 1
1 ^ 5 = 4
4 ^ 2 = 6
6 ^ 5 = 3
3 ^ 7 = 4
4 ^ 3 = 7   ← đáp án
\`\`\`

Chi tiết một bước, ví dụ \`4 ^ 2\`: \`0b100 ^ 0b010 = 0b110 = 6\`.

Vì 2 xuất hiện 2 lần → \`2 ^ 2 = 0\`. Tương tự 3 và 5. Còn lại 7 XOR với 0 = 7.

### Bài 6

\`\`\`go
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
\`\`\`

Với \`perm = 0b101\` (read + execute, "5"):
- \`hasReadPermission(5)\` → \`0b101 & 0b100 = 0b100 ≠ 0\` → true ✓
- \`addWritePermission(5)\` → \`0b101 | 0b010 = 0b111 = 7\` (read+write+execute) ✓

Trong thực tế chmod còn có 3 nhóm (user/group/other) × 3 bit = 9 bit, đóng gói thành số 3 chữ số hệ 8 (octal) như \`0755\`.

### Bài 7

\`\`\`go
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
        fmt.Printf("mask=%0*b → %v\\n", n, mask, subset)
    }
}
\`\`\`

Với input \`["a", "b", "c"]\`, output:
\`\`\`
mask=000 → []
mask=001 → [a]
mask=010 → [b]
mask=011 → [a b]
mask=100 → [c]
mask=101 → [a c]
mask=110 → [b c]
mask=111 → [a b c]
\`\`\`

Độ phức tạp: O(n · 2ⁿ). Với n > ~25 sẽ quá chậm.

### Bài 8

\`\`\`go
func reverseBits(x uint8) uint8 {
    var result uint8 = 0
    for i := 0; i < 8; i++ {
        // Lấy bit i của x, đặt vào vị trí (7-i) của result.
        bit := (x >> i) & 1
        result |= bit << (7 - i)
    }
    return result
}
\`\`\`

Với \`x = 0b11010010\`:
- i=0: bit 0 của x = 0 → set bit 7 của result = 0
- i=1: bit 1 của x = 1 → set bit 6 của result = 1 → result = \`0b01000000\`
- i=2: bit 2 của x = 0
- i=3: bit 3 của x = 0
- i=4: bit 4 của x = 1 → set bit 3 → result = \`0b01001000\`
- i=5: bit 5 của x = 0
- i=6: bit 6 của x = 1 → set bit 1 → result = \`0b01001010\`
- i=7: bit 7 của x = 1 → set bit 0 → result = \`0b01001011\` ✓

Độ phức tạp: O(số bit) = O(1) với uint8.

> Trong thư viện chuẩn Go có sẵn [\`bits.Reverse8\`](https://pkg.go.dev/math/bits#Reverse8) — production nên dùng.

## Tham khảo và bài tiếp theo

- Bài tiếp: [Lesson 01 — Set Theory](../../02-SetTheory/lesson-01-set-theory/) — lý thuyết tập hợp.
- Bài trước: [Lesson 01 — Binary & Hex](../lesson-01-binary-hex/).
- Liên quan trong DataStructures: [Hash Table](../../../DataStructures/01-Basic/lesson-06-hash-table/) (bitwise trong hash function), [Segment Tree / Fenwick](../../../DataStructures/03-Advanced/lesson-03-segment-tree/) (\`x & -x\`), [Advanced Structures](../../../DataStructures/03-Advanced/lesson-04-advanced-structures/) (Bloom filter).
- Tài liệu Go: [\`math/bits\`](https://pkg.go.dev/math/bits) — luôn ưu tiên dùng thư viện chuẩn cho popcount, leading zeros, trailing zeros.
- Code: [solutions.go](./solutions.go).
- Minh họa tương tác: [visualization.html](./visualization.html) — máy tính bitwise 8-bit, demo bitmask, animation Brian Kernighan, bộ liệt kê tập con.
`;
