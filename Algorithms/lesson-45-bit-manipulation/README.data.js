// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: Algorithms/lesson-45-bit-manipulation/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 45 — Bit Manipulation (Thao tác trên bit)

> **Tier 7 — Nâng cao & chuyên đề · Bài đầu tiên của Tier.**
> Đây là cánh cửa vào những kỹ thuật "low-level" mà các tier trước cố tình giấu đi: thay vì coi
> số nguyên là một giá trị trừu tượng, ta nhìn thẳng vào **các bit** cấu thành nó và biến chúng
> thành công cụ. Bit manipulation cho phép giải nhiều bài toán nhanh hơn, gọn hơn, tốn ít bộ nhớ
> hơn — và là nền tảng cho [Bitmask DP (Lesson 29)](../lesson-29-bitmask-dp/), bloom filter,
> bitset, IP routing, nén dữ liệu.

## Mục tiêu học tập

Sau bài này, bạn sẽ:

1. Nhớ lại và dùng thành thạo các toán tử bitwise trong Go: \`&\`, \`|\`, \`^\`, \`&^\`, \`<<\`, \`>>\`.
2. Thuộc lòng bộ **bit tricks** cơ bản: kiểm tra / set / clear / toggle bit, lấy bit thấp nhất, kiểm tra lũy thừa 2.
3. Hiểu sâu **tính chất XOR** và áp dụng vào single number, swap không temp, find missing.
4. Đếm số bit 1 (**popcount**) bằng Brian Kernighan, lookup table và \`bits.OnesCount\`.
5. Dùng **bitmask** để biểu diễn tập hợp, liệt kê subset và subset-của-subset.
6. Giải được nhóm bài kinh điển: single number I/II/III, counting bits, reverse bits, sum without \`+\`, Hamming distance, subsets, Gray code.
7. Làm số học bằng bit (nhân/chia 2, mod $2^k$, chẵn/lẻ) và tránh các **cạm bẫy đặc thù của Go** (signed shift, \`^\` là XOR chứ không phải mũ, \`&^\` AND-NOT).

## Kiến thức tiền đề

- [DataFoundations — Bitwise operations](../../DataFoundations/01-NumberRepresentation/lesson-02-bitwise-ops/) — biểu diễn nhị phân, các toán tử bit cơ bản. **Bài này giả định bạn đã đọc nó.**
- [DataFoundations — Binary & Hex](../../DataFoundations/01-NumberRepresentation/lesson-01-binary-hex/) — cách số được lưu dưới dạng nhị phân, bù hai (two's complement).
- [Lesson 29 — Bitmask DP](../lesson-29-bitmask-dp/) — sẽ liên hệ ở phần bitmask cho tập hợp.
- [Big-O (Lesson 01)](../lesson-01-bigo-asymptotic/) — để nói về độ phức tạp.

---

## 1. Recap bitwise — sáu toán tử nền

> **💡 Trực giác / Hình dung**
> Hãy hình dung một số nguyên 8-bit như **một hàng 8 công tắc đèn**: mỗi công tắc bật (1) hoặc tắt (0).
> Bitwise operation là cách bạn thao tác **cả hàng công tắc cùng lúc** bằng một phép tính duy nhất —
> nhanh hơn nhiều so với đi bật/tắt từng cái bằng vòng lặp. CPU làm việc này trong **1 chu kỳ máy**.

Go có đầy đủ các toán tử bit. Khác với nhiều ngôn ngữ, Go có thêm \`&^\` (AND-NOT, "bit clear"):

| Toán tử | Tên | Quy tắc | Ví dụ (4-bit) |
|---------|-----|---------|----------------|
| \`&\` | AND | 1 khi **cả hai** bit = 1 | \`1100 & 1010 = 1000\` |
| \`\\|\` | OR | 1 khi **ít nhất một** bit = 1 | \`1100 \\| 1010 = 1110\` |
| \`^\` | XOR | 1 khi **đúng một** bit = 1 (khác nhau) | \`1100 ^ 1010 = 0110\` |
| \`&^\` | AND-NOT | \`a &^ b\` = giữ bit của \`a\`, **xoá** các bit mà \`b\` bật | \`1100 &^ 1010 = 0100\` |
| \`<<\` | shift trái | đẩy bit sang trái, chèn 0 vào phải | \`0011 << 1 = 0110\` |
| \`>>\` | shift phải | đẩy bit sang phải | \`0110 >> 1 = 0011\` |

Lưu ý: trong Go **không có toán tử NOT một ngôi riêng**. Phép phủ định bit dùng \`^x\` (XOR một ngôi),
nghĩa là \`^x\` lật toàn bộ bit của \`x\` (tương đương \`~x\` của C). Đừng nhầm: \`^\` hai ngôi là XOR,
\`^\` một ngôi là NOT.

### Bảng chân trị từng toán tử (verify từng bit)

XOR là toán tử quan trọng nhất trong bài, nên xem kỹ:

| a | b | a&b | a\\|b | a^b | a&^b |
|---|---|-----|------|-----|------|
| 0 | 0 | 0 | 0 | 0 | 0 |
| 0 | 1 | 0 | 1 | 1 | 0 |
| 1 | 0 | 0 | 1 | 1 | 1 |
| 1 | 1 | 1 | 1 | 0 | 0 |

Để ý cột \`a&^b\`: nó **chỉ ra 1 ở đúng dòng \`a=1, b=0\`** — tức "giữ bit của a, nhưng xoá những bit b bật".
Đây chính là lý do \`&^\` được gọi là "bit clear".

\`\`\`go
package main

import "fmt"

func main() {
	a, b := 0b1100, 0b1010 // 12 và 10

	fmt.Printf("a & b  = %04b (%d)\\n", a&b, a&b)   // 1000 (8)
	fmt.Printf("a | b  = %04b (%d)\\n", a|b, a|b)   // 1110 (14)
	fmt.Printf("a ^ b  = %04b (%d)\\n", a^b, a^b)   // 0110 (6)
	fmt.Printf("a &^ b = %04b (%d)\\n", a&^b, a&^b) // 0100 (4)
	fmt.Printf("a << 1 = %05b (%d)\\n", a<<1, a<<1) // 11000 (24)
	fmt.Printf("a >> 1 = %04b (%d)\\n", a>>1, a>>1) // 0110 (6)
	fmt.Printf("^a (8-bit) = %08b\\n", uint8(^a))   // 11110011
}
\`\`\`

> **⚠ Lỗi thường gặp**
> \`^\` trong Go **không phải** toán tử lũy thừa. \`2 ^ 3\` cho ra \`1\` (XOR của \`0b010\` và \`0b011\`),
> **không** phải \`8\`. Để tính 2 mũ 3 dùng \`math.Pow(2, 3)\` hoặc \`1 << 3\`. Đây là một trong những
> lỗi gây bối rối nhất khi chuyển từ Python (nơi \`**\` là mũ, \`^\` là XOR) hoặc từ toán học (nơi \`^\` là mũ).

> **🔁 Dừng lại tự kiểm tra**
> \`13 &^ 6 = ?\` (13 = \`1101\`, 6 = \`0110\`).
> <details><summary>Đáp án</summary>
>
> Giữ bit của 13, xoá các bit mà 6 bật (vị trí 1 và 2): \`1101 &^ 0110 = 1001 = 9\`.
> Kiểm tra từng bit: bit0 (13 có, 6 không) → giữ → 1; bit1 (13 có, 6 có) → xoá → 0;
> bit2 (13 không, 6 có) → 0; bit3 (13 có, 6 không) → giữ → 1. Kết quả \`1001 = 9\`. ✓
> </details>

> **📝 Tóm tắt mục 1**
> - 6 toán tử: \`& | ^ &^ << >>\`; \`^\` một ngôi = NOT (lật bit).
> - \`&^\` (AND-NOT) là đặc sản Go: "giữ a, xoá bit b bật" = \`a & (^b)\`.
> - \`^\` hai ngôi là XOR — **không phải** lũy thừa.

---

## 2. Bit tricks cơ bản — bộ công cụ phải thuộc

Tất cả trick dưới đây thao tác trên **bit thứ \`i\`** (đếm từ 0, bit phải nhất là bit 0).
Nền tảng là **mặt nạ (mask)** \`1 << i\`: một số chỉ có đúng bit \`i\` bật.

Ví dụ \`1 << 3 = 0b1000 = 8\`: bit 3 bật, còn lại tắt.

### 2.1 Kiểm tra bit thứ i

\`\`\`go
// Trả về true nếu bit i của n đang bật.
func getBit(n, i int) bool {
	return n&(1<<i) != 0
}
\`\`\`

Walk-through: \`n = 0b1011 = 11\`, hỏi bit 1?
\`1 << 1 = 0b0010\`. \`1011 & 0010 = 0010 ≠ 0\` → bit 1 **bật**. ✓
Hỏi bit 2? \`1 << 2 = 0b0100\`. \`1011 & 0100 = 0000 = 0\` → bit 2 **tắt**. ✓

> **⚠ Lỗi thường gặp** — **operator precedence**.
> Trong Go, \`&\` có độ ưu tiên **thấp hơn** \`==\`/\`!=\`. Do đó \`n & 1<<i != 0\` được hiểu là
> \`n & (1<<i != 0)\` ở một số ngôn ngữ (trong Go \`<<\` cao hơn nên \`1<<i\` gom trước, nhưng \`& ... != 0\`
> vẫn dễ sai). **Luôn đặt ngoặc**: \`(n & (1<<i)) != 0\`. An toàn tuyệt đối.

### 2.2 Set, Clear, Toggle bit

\`\`\`go
func setBit(n, i int) int    { return n | (1 << i) }  // bật bit i
func clearBit(n, i int) int  { return n &^ (1 << i) } // tắt bit i (dùng &^ của Go)
func toggleBit(n, i int) int { return n ^ (1 << i) }  // lật bit i
\`\`\`

Walk-through với \`n = 0b1010 = 10\`:

| Thao tác | Mask \`1<<i\` | Phép tính | Kết quả |
|----------|-------------|-----------|---------|
| set bit 0 | \`0001\` | \`1010 \\| 0001\` | \`1011 = 11\` |
| clear bit 1 | \`0010\` | \`1010 &^ 0010\` | \`1000 = 8\` |
| toggle bit 3 | \`1000\` | \`1010 ^ 1000\` | \`0010 = 2\` |
| toggle bit 2 | \`0100\` | \`1010 ^ 0100\` | \`1110 = 14\` |

> **❓ Câu hỏi tự nhiên của người đọc**
> - *"Clear bit dùng \`n & ^(1<<i)\` được không, hay bắt buộc \`&^\`?"* — Cả hai tương đương:
>   \`n &^ m\` ≡ \`n & (^m)\`. Trong Go \`&^\` gọn và rõ ý hơn nên ưu tiên dùng.
> - *"Set một bit đã bật sẵn thì sao?"* — Vô hại. OR với 1 vẫn ra 1 (idempotent). Clear bit đã tắt cũng vậy.
> - *"Toggle hai lần thì sao?"* — Quay về như cũ, vì \`x ^ m ^ m = x\` (tính chất XOR, xem mục 3).

### 2.3 Lowest set bit và clear lowest set bit

Hai trick "ma thuật" dựa trên bù hai (two's complement):

\`\`\`go
func lowestSetBit(n int) int  { return n & (-n) }  // tách bit 1 thấp nhất ra
func clearLowest(n int) int    { return n & (n - 1) } // xoá bit 1 thấp nhất
\`\`\`

**Vì sao \`n & (-n)\` lấy được bit thấp nhất?** Vì bù hai: \`-n = ^n + 1\`. Phép \`^n + 1\` lật mọi bit
rồi cộng 1 — kết quả là: từ bit thấp nhất đang bật trở xuống giữ nguyên, các bit cao hơn bị lật.
Khi AND với \`n\`, chỉ còn lại đúng bit thấp nhất.

Walk-through \`n = 0b1100 = 12\`:
- \`-12\` (8-bit bù hai) = \`11110100\`. \`00001100 & 11110100 = 00000100 = 4\` → bit thấp nhất là bit 2. ✓
- \`clearLowest\`: \`n - 1 = 1011\`. \`1100 & 1011 = 1000 = 8\` → đã xoá bit 2. ✓

Walk-through \`n = 0b1010 = 10\`:
- \`lowestSetBit\`: \`-10\` (8-bit) = \`11110110\`. \`00001010 & 11110110 = 00000010 = 2\`. ✓
- \`clearLowest\`: \`9 = 1001\`. \`1010 & 1001 = 1000 = 8\`. ✓

### 2.4 Kiểm tra lũy thừa của 2

Một số là lũy thừa của 2 (1, 2, 4, 8, 16...) khi nó có **đúng một bit bật**. Mà \`n & (n-1)\` xoá bit
thấp nhất — nếu chỉ có 1 bit thì sau khi xoá còn \`0\`:

\`\`\`go
func isPowerOfTwo(n int) bool {
	return n > 0 && n&(n-1) == 0
}
\`\`\`

Walk-through (4 ví dụ):
- \`n = 8 = 1000\`: \`n-1 = 0111\`, \`1000 & 0111 = 0000\` → **đúng** lũy thừa 2. ✓
- \`n = 16 = 10000\`: \`15 = 01111\`, AND = \`0\` → **đúng**. ✓
- \`n = 6 = 0110\`: \`5 = 0101\`, \`0110 & 0101 = 0100 ≠ 0\` → **không**. ✓
- \`n = 0\`: điều kiện \`n > 0\` loại trước → **không** (0 không phải lũy thừa 2, dù \`0 & -1 = 0\`).

> **⚠ Lỗi thường gặp** — quên điều kiện \`n > 0\`. Với \`n = 0\`: \`0 & (0-1) = 0 & (-1) = 0\`, công thức
> sẽ báo "là lũy thừa 2", sai. Luôn kèm \`n > 0\`.

> **🔁 Dừng lại tự kiểm tra**
> \`clearLowest(0b11010) = ?\` và \`lowestSetBit(0b11010) = ?\` (26).
> <details><summary>Đáp án</summary>
>
> Bit thấp nhất của \`11010\` là bit 1 (\`00010 = 2\`). \`lowestSetBit = 2\`.
> \`clearLowest\`: \`n-1 = 11001\`, \`11010 & 11001 = 11000 = 24\`. ✓
> </details>

> **📝 Tóm tắt mục 2**
> - Mask \`1<<i\` là nền tảng mọi trick theo vị trí bit.
> - get \`n&(1<<i)\` · set \`n|(1<<i)\` · clear \`n&^(1<<i)\` · toggle \`n^(1<<i)\`.
> - \`n&(-n)\` lấy bit thấp nhất · \`n&(n-1)\` xoá bit thấp nhất · \`n>0 && n&(n-1)==0\` kiểm lũy thừa 2.
> - **Luôn đặt ngoặc** quanh phép bit khi so sánh (precedence thấp).

---

## 3. Tính chất XOR — chìa khoá nhiều bài toán

> **💡 Trực giác / Hình dung**
> XOR như một **công tắc đảo chiều**: bật rồi bật lại thì về cũ. Ghép một số với chính nó "triệt tiêu"
> nhau. Nhờ vậy, nếu mọi phần tử xuất hiện theo cặp, XOR tất cả lại thì các cặp tự khử, chỉ còn phần tử lẻ.

Bốn tính chất nền tảng (kiểm với ví dụ số):

| Tính chất | Phát biểu | Ví dụ |
|-----------|-----------|-------|
| Tự khử | \`a ^ a = 0\` | \`5 ^ 5 = 0\` |
| Phần tử trung hoà | \`a ^ 0 = a\` | \`5 ^ 0 = 5\` |
| Giao hoán | \`a ^ b = b ^ a\` | \`3 ^ 5 = 5 ^ 3 = 6\` |
| Kết hợp | \`(a^b)^c = a^(b^c)\` | \`(3^5)^6 = 3^(5^6) = 0\` |

Hệ quả quan trọng: vì giao hoán + kết hợp + tự khử, **thứ tự XOR không quan trọng** và **cặp giống nhau bị khử**.

### 3.1 Single number — tìm số xuất hiện lẻ lần

Cho mảng mọi phần tử xuất hiện **đúng 2 lần**, trừ một phần tử xuất hiện 1 lần. Tìm phần tử đó.

\`\`\`go
// XOR tất cả: cặp tự khử, còn lại số lẻ. O(n) time, O(1) space.
func singleNumber(nums []int) int {
	res := 0
	for _, v := range nums {
		res ^= v
	}
	return res
}
\`\`\`

Walk-through \`nums = [4, 1, 2, 1, 2]\`:

| Bước | v | res trước | res sau (\`res^v\`) |
|------|---|-----------|--------------------|
| 1 | 4 | \`0000\` | \`0100 = 4\` |
| 2 | 1 | \`0100\` | \`0101 = 5\` |
| 3 | 2 | \`0101\` | \`0111 = 7\` |
| 4 | 1 | \`0111\` | \`0110 = 6\` |
| 5 | 2 | \`0110\` | \`0100 = 4\` |

Kết quả \`4\`. Lý do: \`4 ^ 1 ^ 2 ^ 1 ^ 2 = 4 ^ (1^1) ^ (2^2) = 4 ^ 0 ^ 0 = 4\`. ✓

### 3.2 Swap không cần biến tạm

\`\`\`go
a ^= b  // a = a^b
b ^= a  // b = b^(a^b) = a
a ^= b  // a = (a^b)^a = b
\`\`\`

Walk-through \`a = 5 (0101), b = 3 (0011)\`:
1. \`a = 5^3 = 0110 = 6\`.
2. \`b = 3^6 = 0101 = 5\` ✓ (b giờ là a cũ).
3. \`a = 6^5 = 0011 = 3\` ✓ (a giờ là b cũ).

> **⚠ Lỗi thường gặp** — XOR swap **hỏng nếu \`a\` và \`b\` là cùng một ô nhớ** (vd \`arr[i]\` và \`arr[j]\` với \`i==j\`):
> bước 1 đã làm \`arr[i] = 0\`, mất dữ liệu. Trong Go thực tế nên dùng \`a, b = b, a\` (vừa nhanh vừa an toàn);
> XOR swap chỉ là trick để hiểu bản chất.

### 3.3 Find missing number

Cho mảng chứa \`n\` số phân biệt trong \`[0..n]\` (thiếu đúng một số). XOR mọi index \`0..n\` với mọi phần tử:

\`\`\`go
func missingNumber(nums []int) int {
	res := len(nums) // bắt đầu từ n (index cuối)
	for i, v := range nums {
		res ^= i ^ v
	}
	return res
}
\`\`\`

Walk-through \`nums = [3, 0, 1]\` (n=3, thiếu 2): XOR \`3 ^ (0^3) ^ (1^0) ^ (2^1)\`
= \`3^0^3^1^0^2^1\` = \`(3^3)^(0^0)^(1^1)^2 = 2\`. ✓

> **📝 Tóm tắt mục 3**
> - \`a^a=0\`, \`a^0=a\`, giao hoán, kết hợp → cặp giống nhau tự khử.
> - Single number: XOR cả mảng. O(n)/O(1).
> - Swap XOR: hiểu bản chất, thực tế dùng \`a,b = b,a\`.
> - Missing number: XOR index với value.

---

## 4. Popcount — đếm số bit 1

> **💡 Trực giác / Hình dung**
> Popcount = "đếm có bao nhiêu công tắc đang bật". Cách ngây thơ là duyệt 32/64 bit. Nhưng có cách
> thông minh hơn: **mỗi vòng lặp xoá đúng một bit 1**, nên số vòng = số bit 1 (chứ không phải 32/64).

### 4.1 Brian Kernighan — O(số bit 1)

\`\`\`go
// Mỗi lần n &= n-1 xoá bit 1 thấp nhất. Số vòng = số bit 1.
func popcountKernighan(n uint) int {
	count := 0
	for n != 0 {
		n &= n - 1 // xoá bit thấp nhất
		count++
	}
	return count
}
\`\`\`

Walk-through \`n = 0b1011 = 11\` (có 3 bit 1):

| Vòng | n trước | n-1 | n & (n-1) | count |
|------|---------|-----|-----------|-------|
| 1 | \`1011\` | \`1010\` | \`1010\` | 1 |
| 2 | \`1010\` | \`1001\` | \`1000\` | 2 |
| 3 | \`1000\` | \`0111\` | \`0000\` | 3 |

\`n = 0\` → dừng. count = 3. ✓ (chỉ 3 vòng, không phải 32).

Thêm 3 ví dụ: \`popcount(0) = 0\`; \`popcount(7 = 0b111) = 3\`; \`popcount(16 = 0b10000) = 1\`.

### 4.2 Lookup table — đổi không gian lấy thời gian

Tính trước popcount cho mọi byte (256 giá trị), rồi cộng popcount từng byte:

\`\`\`go
var table [256]int

func init() {
	for i := range table {
		table[i] = table[i>>1] + (i & 1) // quy hoạch động: bit thấp + phần còn lại
	}
}

func popcountTable(n uint32) int {
	return table[n&0xff] + table[(n>>8)&0xff] +
		table[(n>>16)&0xff] + table[(n>>24)&0xff]
}
\`\`\`

### 4.3 Cách thực tế trong Go — \`bits.OnesCount\`

Trong code thật, **không tự viết** — dùng thư viện chuẩn \`math/bits\`, được compiler map xuống lệnh
\`POPCNT\` của CPU (1 chu kỳ):

\`\`\`go
import "math/bits"

bits.OnesCount(11)        // 3
bits.OnesCount64(255)     // 8
bits.LeadingZeros32(1)    // 31
bits.TrailingZeros32(8)   // 3
\`\`\`

> **❓ Câu hỏi tự nhiên của người đọc**
> - *"Kernighan nhanh hơn duyệt 32 bit thật không?"* — Có, khi số bit 1 ít. Worst case (mọi bit 1) thì
>   bằng nhau. Nhưng \`bits.OnesCount\` (POPCNT) vẫn nhanh nhất — 1 lệnh CPU.
> - *"Vì sao lookup \`table[i>>1] + (i&1)\`?"* — popcount của \`i\` = popcount của \`i\` bỏ bit thấp (\`i>>1\`)
>   cộng thêm bit thấp (\`i&1\`). Đây là một dạng DP.

> **📝 Tóm tắt mục 4**
> - Kernighan \`n &= n-1\`: số vòng = số bit 1.
> - Lookup table: O(1) tra cứu sau khi tiền xử lý O(256).
> - Thực tế: \`bits.OnesCount\` → lệnh POPCNT.

---

## 5. Bitmask cho tập hợp

> **💡 Trực giác / Hình dung**
> Một tập con của \`{0,1,...,n-1}\` ≡ một dãy "có/không" độ dài n ≡ **một số nguyên n-bit**.
> Bit \`i\` bật ⟺ phần tử \`i\` thuộc tập. Vậy mọi tập con đều là một số trong $[0, 2^n)$ — và phép tập hợp
> trở thành phép bit: hợp = OR, giao = AND, hiệu = \`&^\`.

Ví dụ với \`n = 4\`, tập \`{0, 2, 3}\` ⟺ bit 0,2,3 bật ⟺ \`0b1101 = 13\`.

| Phép tập hợp | Bit | Ví dụ ({0,2}=\`0101\`, {1,2}=\`0110\`) |
|--------------|-----|-------------------------------------|
| Hợp A∪B | \`a \\| b\` | \`0101 \\| 0110 = 0111\` = {0,1,2} |
| Giao A∩B | \`a & b\` | \`0101 & 0110 = 0100\` = {2} |
| Hiệu A∖B | \`a &^ b\` | \`0101 &^ 0110 = 0001\` = {0} |
| Thuộc i? | \`a & (1<<i)\` | {0,2} chứa 2? \`0101 & 0100 ≠ 0\` → có |
| Số phần tử | \`bits.OnesCount\` | |

### 5.1 Liệt kê mọi tập con

\`\`\`go
// In tất cả 2^n tập con của {0..n-1}.
func enumerateSubsets(n int) {
	for mask := 0; mask < (1 << n); mask++ {
		// mask chính là một tập con
		var subset []int
		for i := 0; i < n; i++ {
			if mask&(1<<i) != 0 {
				subset = append(subset, i)
			}
		}
		fmt.Printf("%0*b -> %v\\n", n, mask, subset)
	}
}
\`\`\`

### 5.2 Liệt kê subset-của-subset (sub-mask enumeration)

Kỹ thuật quan trọng cho [Bitmask DP (Lesson 29)](../lesson-29-bitmask-dp/): với một mask cho trước,
duyệt **mọi tập con của nó**:

\`\`\`go
// Duyệt mọi sub ⊆ mask. Tổng độ phức tạp trên mọi mask là O(3^n).
for sub := mask; sub > 0; sub = (sub - 1) & mask {
	// xử lý sub (một tập con của mask)
}
// nhớ xử lý sub = 0 (tập rỗng) riêng nếu cần
\`\`\`

Walk-through \`mask = 0b101 = 5\` (tập {0,2}):
\`sub=5\` → \`(5-1)&5 = 4&5 = 4\`; \`sub=4\` → \`(4-1)&5 = 3&5 = 1\`; \`sub=1\` → \`(1-1)&5 = 0\` → dừng.
Các sub: \`101, 100, 001\` = {0,2}, {2}, {0}. (Tập rỗng \`000\` xử lý riêng.) ✓

> **❓ Câu hỏi tự nhiên** — *"Vì sao tổng là 3^n chứ không phải 4^n?"* — Mỗi phần tử có 3 trạng thái:
> ∉ mask, ∈ mask & ∈ sub, ∈ mask & ∉ sub. Nhân lên n phần tử → 3^n.

> **📝 Tóm tắt mục 5**
> - Tập con ↔ số n-bit; hợp/giao/hiệu = OR/AND/\`&^\`.
> - Liệt kê mọi tập con: \`for mask := 0; mask < 1<<n; mask++\`.
> - Sub-mask: \`for sub := mask; sub > 0; sub = (sub-1) & mask\` — tổng O(3^n).

---

## 6. Các bài toán bit manipulation kinh điển

### 6.1 Counting bits (DP + bit)

Cho \`n\`, trả về mảng \`ans[0..n]\` với \`ans[i]\` = số bit 1 của \`i\`. DP: \`ans[i] = ans[i>>1] + (i&1)\`.

\`\`\`go
func countBits(n int) []int {
	ans := make([]int, n+1)
	for i := 1; i <= n; i++ {
		ans[i] = ans[i>>1] + (i & 1)
	}
	return ans
}
\`\`\`

Walk-through \`n = 5\`:
\`ans[0]=0\`; \`ans[1]=ans[0]+1=1\`; \`ans[2]=ans[1]+0=1\`; \`ans[3]=ans[1]+1=2\`;
\`ans[4]=ans[2]+0=1\`; \`ans[5]=ans[2]+1=2\`. → \`[0,1,1,2,1,2]\`. ✓ (O(n) thay vì O(n log n)).

### 6.2 Reverse bits

Đảo ngược 32 bit của một số (bit 0 ↔ bit 31, ...):

\`\`\`go
func reverseBits(n uint32) uint32 {
	var res uint32
	for i := 0; i < 32; i++ {
		res = (res << 1) | (n & 1) // lấy bit thấp của n, đẩy vào thấp của res
		n >>= 1
	}
	return res
}
\`\`\`

Walk-through (4-bit minh hoạ) \`n = 0b0011\`: res tích luỹ \`0→1→11→110→1100\`.
Bit thấp nhất của n lần lượt 1,1,0,0 → res = \`1100\`. Vậy reverse của \`0011\` (4-bit) là \`1100\`. ✓

### 6.3 Sum without \`+\` (XOR + carry)

Cộng hai số chỉ dùng bit: **XOR là tổng không nhớ**, **AND << 1 là phần nhớ (carry)**:

\`\`\`go
// a^b: cộng từng bit bỏ qua nhớ. (a&b)<<1: các vị trí phát sinh nhớ.
// Lặp tới khi không còn nhớ.
func getSum(a, b int) int {
	for b != 0 {
		carry := (a & b) << 1
		a = a ^ b
		b = carry
	}
	return a
}
\`\`\`

Walk-through \`a = 5 (0101), b = 3 (0011)\` (đáp án mong đợi 8):

| Bước | a | b | a^b (tổng không nhớ) | (a&b)<<1 (nhớ) |
|------|---|---|----------------------|-----------------|
| 1 | \`0101\` | \`0011\` | \`0110\` | \`0010\` |
| 2 | \`0110\` | \`0010\` | \`0100\` | \`0100\` |
| 3 | \`0100\` | \`0100\` | \`0000\` | \`1000\` |
| 4 | \`0000\` | \`1000\` | \`1000\` | \`0000\` |

b = 0 → dừng, a = \`1000 = 8\`. ✓

### 6.4 Hamming distance

Số vị trí bit khác nhau giữa \`x\` và \`y\` = popcount của \`x ^ y\`:

\`\`\`go
func hammingDistance(x, y int) int {
	return bits.OnesCount(uint(x ^ y))
}
\`\`\`

Walk-through \`x = 1 (0001), y = 4 (0100)\`: \`x^y = 0101\`, popcount = 2. ✓
Thêm: \`(3, 1)\`: \`0011 ^ 0001 = 0010\` → 1; \`(7, 0)\`: → 3; \`(5, 5)\`: \`0\` → 0.

### 6.5 Subsets bằng bitmask

Sinh power set của một mảng bằng cách lặp mọi mask $0..2^n-1$:

\`\`\`go
func subsets(nums []int) [][]int {
	n := len(nums)
	res := make([][]int, 0, 1<<n)
	for mask := 0; mask < (1 << n); mask++ {
		var cur []int
		for i := 0; i < n; i++ {
			if mask&(1<<i) != 0 {
				cur = append(cur, nums[i])
			}
		}
		res = append(res, cur)
	}
	return res
}
\`\`\`

Walk-through \`nums = [1,2]\` (n=2, 4 mask):
\`00\`→\`[]\`; \`01\`→\`[1]\`; \`10\`→\`[2]\`; \`11\`→\`[1,2]\`. ✓

### 6.6 Gray code

Dãy Gray code: $2^n$ số sao cho **hai số liên tiếp khác nhau đúng 1 bit**. Công thức kì diệu: \`g(i) = i ^ (i>>1)\`.

\`\`\`go
func grayCode(n int) []int {
	res := make([]int, 1<<n)
	for i := range res {
		res[i] = i ^ (i >> 1)
	}
	return res
}
\`\`\`

Walk-through \`n = 2\`:
\`g(0)=0^0=00\`; \`g(1)=1^0=01\`; \`g(2)=2^1=10^01=11\`; \`g(3)=3^1=11^01=10\`.
→ \`[00, 01, 11, 10]\` = \`[0,1,3,2]\`. Mỗi cặp liên tiếp khác đúng 1 bit. ✓

> **📝 Tóm tắt mục 6**
> - countBits DP \`ans[i>>1] + (i&1)\` → O(n).
> - reverseBits: shift gom bit thấp của n vào res.
> - getSum: \`^\` = tổng không nhớ, \`(a&b)<<1\` = nhớ, lặp.
> - hammingDistance = popcount(x^y).
> - subsets / grayCode: lặp mask, \`i ^ (i>>1)\`.

---

## 7. Số học bằng bit

| Phép toán | Bit | Ví dụ |
|-----------|-----|-------|
| Nhân $2^k$ | \`n << k\` | \`5 << 1 = 10\`, \`5 << 3 = 40\` |
| Chia $2^k$ (số dương) | \`n >> k\` | \`40 >> 3 = 5\`, \`7 >> 1 = 3\` |
| Mod $2^k$ | \`n & (2^k - 1)\` | \`13 & (8-1) = 13 & 0b111 = 5\` |
| Chẵn / lẻ | \`n & 1\` | \`6 & 1 = 0\` (chẵn), \`7 & 1 = 1\` (lẻ) |

Walk-through mod: \`13 = 0b1101\`, \`13 mod 8\`: $8 = 2^3$, mask \`= 7 = 0b0111\`.
\`1101 & 0111 = 0101 = 5\`. Kiểm: \`13 = 1*8 + 5\` ✓. Cách này chỉ đúng khi chia cho **lũy thừa 2**.

Thêm: \`5 << 2 = 20\` (5×4); \`100 >> 2 = 25\` (100/4); \`27 & 3 = 3\` (27 mod 4 = 3); \`27 & 1 = 1\` (lẻ).

> **⚠ Lỗi thường gặp** — \`n >> 1\` **không** bằng \`n / 2\` khi \`n\` âm với một số ngôn ngữ. Trong Go,
> \`>>\` trên số **signed** là **arithmetic shift** (giữ dấu): \`-8 >> 1 = -4\` (đúng với chia làm tròn xuống),
> nhưng \`-7 >> 1 = -4\` (làm tròn xuống), trong khi \`-7 / 2 = -3\` (làm tròn về 0). Khác nhau! Đừng dùng
> \`>>\` thay \`/\` cho số âm nếu cần ngữ nghĩa chia của Go.

---

## 8. Pitfall ngôn ngữ Go

1. **Signed shift**: \`>>\` trên kiểu signed (\`int\`, \`int64\`) là **arithmetic** (giữ bit dấu); trên kiểu
   unsigned (\`uint\`, \`uint64\`) là **logical** (chèn 0). \`int8(-8) >> 1 = -4\` nhưng \`uint8(248) >> 1 = 124\`.

2. **Kích thước int**: \`int\` trong Go là 32 **hoặc** 64 bit tuỳ nền tảng. Nếu cần đúng 64 bit, dùng \`int64\`/\`uint64\`.

3. **\`^\` là XOR, không phải mũ** (đã nhắc ở mục 1) — \`2 ^ 10 = 8\`, không phải 1024.

4. **\`&^\` (AND-NOT)** là đặc sản Go cho "bit clear", không có trong C/Java/Python. \`a &^ b\` ≡ \`a & (^b)\`.

5. **\`1 << i\` với i lớn tràn**: \`1 << 63\` trên \`int\` 64-bit là số âm (bit dấu). Để mask 64 bit an toàn,
   dùng \`uint64(1) << i\`. \`1 << 64\` là **lỗi compile/undefined** — không shift quá kích thước kiểu.

6. **Toán hạng shift**: trong Go, số đếm shift có thể là bất kỳ kiểu integer; nếu âm → **panic runtime**.

---

## 9. Ứng dụng thực tế

- **Flags / permissions** ([Programming Lesson 08](../../Programming/lesson-08-bitwise-flags/) nếu có): gói nhiều
  boolean vào một int. \`READ=1, WRITE=2, EXEC=4\`; quyền \`READ|WRITE = 3\`; kiểm tra \`perm & WRITE != 0\`.
  Đây chính xác là \`chmod\` của Unix (rwx = 3 bit).
- **Bitset**: tập số nguyên dày đặc lưu trong \`[]uint64\`, mỗi bit một phần tử — tiết kiệm 64× so với \`[]bool\`.
- **Bloom filter**: nhiều hash → set nhiều bit; kiểm tra thành viên xấp xỉ. (Xem cấu trúc dữ liệu xác suất.)
- **IP mask / CIDR**: subnet mask \`255.255.255.0\` = \`0xFFFFFF00\`; \`ip & mask\` lấy network prefix.
- **Nén dữ liệu**: bit-packing, mã hoá độ dài thay đổi (Huffman — [Lesson 21](../lesson-21-huffman-encoding/)).

---

## 10. Cạm bẫy (tổng hợp)

| Cạm bẫy | Hậu quả | Cách tránh |
|---------|---------|-----------|
| Quên ngoặc: \`a & b == c\` | Hiểu sai do precedence (\`&\` thấp hơn \`==\`) | \`(a & b) == c\` |
| \`^\` tưởng là mũ | \`2^3 = 1\` không phải 8 | Dùng \`1<<3\` hoặc \`math.Pow\` |
| \`1 << i\` với i lớn trên \`int\` | Tràn → số âm | \`uint64(1) << i\` |
| Shift quá kích thước kiểu | Undefined / 0 | Giữ shift count < số bit |
| \`>>\` thay \`/\` cho số âm | Ngữ nghĩa làm tròn khác | Dùng \`/\` nếu cần chia chuẩn |
| \`isPowerOfTwo\` quên \`n>0\` | \`0\` bị nhận nhầm | Thêm \`n > 0 &&\` |
| XOR swap khi cùng ô nhớ | Mất dữ liệu | Dùng \`a, b = b, a\` |
| Shift count âm | Panic runtime | Kiểm tra count ≥ 0 |

---

## Bài tập

> Mỗi bài đều có lời giải chi tiết ở mục dưới. Tự làm trước rồi mới xem.

1. **Single Number I** — Mảng mọi phần tử đôi một, trừ 1 phần tử lẻ. Tìm nó. O(n)/O(1).
2. **Single Number II** — Mảng mọi phần tử xuất hiện **3 lần**, trừ 1 phần tử xuất hiện 1 lần. Tìm nó. O(n)/O(1).
3. **Single Number III** — Mảng mọi phần tử đôi một, trừ **2** phần tử xuất hiện 1 lần. Tìm cả hai. O(n)/O(1).
4. **Number of 1 Bits** — Đếm số bit 1 của một số (popcount).
5. **Counting Bits** — Trả về mảng số bit 1 của \`0..n\`. O(n).
6. **Reverse Bits** — Đảo ngược 32 bit của một số.
7. **Subsets** — Sinh power set của mảng phân biệt bằng bitmask.
8. **Sum of Two Integers** — Cộng hai số nguyên không dùng \`+\` / \`-\`.

---

## Lời giải chi tiết

### Bài 1 — Single Number I

**Cách tiếp cận**: XOR mọi phần tử. Cặp giống nhau khử về 0, còn lại số lẻ (mục 3.1).

\`\`\`go
func singleNumber(nums []int) int {
	res := 0
	for _, v := range nums {
		res ^= v
	}
	return res
}
\`\`\`

**Độ phức tạp**: O(n) time, O(1) space. Một lần duyệt, biến tích luỹ.

### Bài 2 — Single Number II (mỗi số 3 lần, trừ 1)

**Cách tiếp cận**: XOR không còn dùng được (3 lần không khử). Đếm số bit 1 ở **từng vị trí** trên mọi số;
vị trí nào tổng **không chia hết cho 3** thì phần tử lẻ có bit đó.

\`\`\`go
func singleNumberII(nums []int) int {
	res := 0
	for bit := 0; bit < 64; bit++ {
		count := 0
		for _, v := range nums {
			count += (v >> bit) & 1
		}
		if count%3 != 0 {
			res |= 1 << bit
		}
	}
	return res
}
\`\`\`

**Walk-through** \`nums = [2,2,3,2]\` (đáp án 3 = \`011\`):
- bit 0: số bit-0 bật = \`2,2,2\` có bit0=0, \`3\` có bit0=1 → count=1, \`1%3≠0\` → res bit0 bật.
- bit 1: \`2=10\` ba lần (3 bit), \`3=11\` (1 bit) → count=4, \`4%3=1≠0\` → res bit1 bật.
- → res = \`011 = 3\`. ✓

**Độ phức tạp**: O(64n) = O(n) time, O(1) space.

### Bài 3 — Single Number III (hai số lẻ)

**Cách tiếp cận**: XOR cả mảng được \`x = a ^ b\` (hai số lẻ). Vì \`a ≠ b\`, \`x ≠ 0\` → tồn tại một bit khác nhau.
Lấy **bit thấp nhất** của x (\`x & -x\`) chia mảng thành 2 nhóm theo bit đó; XOR riêng từng nhóm ra \`a\` và \`b\`.

\`\`\`go
func singleNumberIII(nums []int) []int {
	xorAll := 0
	for _, v := range nums {
		xorAll ^= v
	}
	diff := xorAll & (-xorAll) // bit thấp nhất khác nhau
	a, b := 0, 0
	for _, v := range nums {
		if v&diff != 0 {
			a ^= v
		} else {
			b ^= v
		}
	}
	return []int{a, b}
}
\`\`\`

**Walk-through** \`nums = [1,2,1,3,2,5]\` (hai số lẻ 3,5):
\`xorAll = 3^5 = 0b110\`. \`diff = 110 & -110 = 010\` (bit 1). Nhóm có bit1: \`2,3,2\` (3 có bit1) → XOR = \`2^3^2=3\`;
nhóm không: \`1,1,5\` → \`1^1^5=5\`. → \`[3,5]\`. ✓

**Độ phức tạp**: O(n) time, O(1) space. Hai lần duyệt.

### Bài 4 — Number of 1 Bits

**Cách tiếp cận**: Brian Kernighan \`n &= n-1\` (mục 4.1), hoặc \`bits.OnesCount\`.

\`\`\`go
func hammingWeight(n uint) int {
	count := 0
	for n != 0 {
		n &= n - 1
		count++
	}
	return count
}
\`\`\`

**Độ phức tạp**: O(k) với k = số bit 1 (≤ số bit của kiểu). \`bits.OnesCount\` là O(1) qua POPCNT.

### Bài 5 — Counting Bits

**Cách tiếp cận**: DP \`ans[i] = ans[i>>1] + (i&1)\` (mục 6.1).

\`\`\`go
func countBits(n int) []int {
	ans := make([]int, n+1)
	for i := 1; i <= n; i++ {
		ans[i] = ans[i>>1] + (i & 1)
	}
	return ans
}
\`\`\`

**Độ phức tạp**: O(n) time, O(n) output. Tốt hơn O(n·log n) nếu popcount từng số riêng lẻ.

### Bài 6 — Reverse Bits

**Cách tiếp cận**: lặp 32 lần, mỗi vòng bóc bit thấp của n và đẩy vào bit thấp của res sau khi \`res<<1\` (mục 6.2).

\`\`\`go
func reverseBits(n uint32) uint32 {
	var res uint32
	for i := 0; i < 32; i++ {
		res = (res << 1) | (n & 1)
		n >>= 1
	}
	return res
}
\`\`\`

**Độ phức tạp**: O(32) = O(1) (số bit cố định).

### Bài 7 — Subsets

**Cách tiếp cận**: mỗi mask $0..2^n-1$ là một tập con; bit \`i\` bật ⟹ lấy \`nums[i]\` (mục 6.5).

\`\`\`go
func subsets(nums []int) [][]int {
	n := len(nums)
	res := make([][]int, 0, 1<<n)
	for mask := 0; mask < (1 << n); mask++ {
		var cur []int
		for i := 0; i < n; i++ {
			if mask&(1<<i) != 0 {
				cur = append(cur, nums[i])
			}
		}
		res = append(res, cur)
	}
	return res
}
\`\`\`

**Độ phức tạp**: O(n · 2^n) time (mỗi mask quét n bit), O(n · 2^n) output. Tối ưu vì kích thước output đã là vậy.

### Bài 8 — Sum of Two Integers (không dùng \`+\`)

**Cách tiếp cận**: \`^\` cho tổng không nhớ, \`(a&b)<<1\` cho phần nhớ; lặp tới khi hết nhớ (mục 6.3).

\`\`\`go
func getSum(a, b int) int {
	for b != 0 {
		carry := (a & b) << 1
		a ^= b
		b = carry
	}
	return a
}
\`\`\`

**Độ phức tạp**: O(số bit) = O(1) với kiểu cố định (tối đa ~32/64 vòng vì carry dịch trái mỗi vòng).

---

## Code & Minh hoạ

- Mọi đoạn Go trên đều biên dịch và chạy được (thêm \`package main\` + \`import\` phù hợp).
- **[visualization.html](./visualization.html)** — 3 module tương tác:
  1. **Bit playground** — click toggle từng ô bit, áp dụng trick (set/clear/lowest/popcount), xem kết quả nhị phân.
  2. **XOR single number** — nhập dãy số, animate XOR dồn từng bước → tìm số lẻ.
  3. **Subset enumeration** — duyệt bitmask $0..2^n-1$, hiện tập con tương ứng.

---

## Bài tiếp theo

→ [Lesson 46 — Number Theory Algorithms](../lesson-46-number-theory-algos/) — GCD/LCM, sàng Eratosthenes,
modular arithmetic, fast exponentiation. Một số kỹ thuật ở đó (fast pow) dùng lại tư duy "phân tích theo bit" của bài này.

← Quay lại [Tier 6 — String Algorithms](../tier-6-string/index.html) · [Tier 7 — Nâng cao](../tier-7-advanced/index.html)
`;
