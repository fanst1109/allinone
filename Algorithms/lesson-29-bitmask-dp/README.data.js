// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: Algorithms/lesson-29-bitmask-dp/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 29 — Bitmask DP

> **Tier 4 · Lesson 29** — khi state của quy hoạch động không phải một con số "chỉ số" mà là một **tập con** (subset). Ta nén cả tập đó vào **một số nguyên** rồi DP trên các số đó. Đây là kỹ thuật mở khóa hàng loạt bài "thăm tất cả", "gán hết", "chia nhóm" mà brute-force \`n!\` không kham nổi.

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Hiểu **bitmask là gì**: dùng một số nguyên làm **tập hợp** — bit thứ \`i\` bật nghĩa là phần tử \`i\` thuộc tập.
- Thành thạo các **thao tác tập bằng bit**: kiểm tra, set, clear, toggle, đếm bit, duyệt subset.
- Nắm **ý tưởng cốt lõi của bitmask DP**: state là một bitmask đại diện tập đã/chưa xử lý, có \`2^n\` state.
- Giải được 3 bài kinh điển bằng bitmask DP: **TSP** (người giao hàng), **assignment problem** (bài toán gán), **đếm đường Hamilton**.
- Làm chủ **trick duyệt mọi subset của một mask** bằng \`s = (s-1) & mask\` và biết vì sao tổng độ phức tạp là \`O(3^n)\` chứ không phải \`O(4^n)\`.
- Biết **giới hạn**: bitmask DP chỉ sống được khi \`n ≤ ~20\` (đôi khi 22-25 nếu hằng số nhỏ), tránh \`2^n\` nổ tung.

## Kiến thức tiền đề

- **Phép toán bit (bitwise)** — AND, OR, XOR, shift, AND-NOT. Nếu chưa chắc, ôn lại ở [DataFoundations](../../DataFoundations/) (phần biểu diễn nhị phân & bitwise). Bài này có recap nhanh nhưng không dạy lại từ đầu.
- **Quy hoạch động cơ bản** — memoization vs tabulation, thiết kế state, overlapping subproblems ([Lesson 23](../lesson-23-dp-fundamentals/), [Lesson 24](../lesson-24-dp-1d/)).
- **Phân tích Big-O** — đặc biệt phân biệt \`2^n\`, \`n!\`, \`3^n\` ([Lesson 01](../lesson-01-bigo-asymptotic/)).
- **Đệ quy & quan hệ truy hồi** — [Lesson 03](../lesson-03-recursion-recurrence/).

---

## 1. Bitmask là gì?

> **💡 Trực giác / Hình dung**
>
> Tưởng tượng bạn có 5 công tắc đèn xếp thành hàng. Mỗi công tắc chỉ có 2 trạng thái: **bật** (1) hoặc **tắt** (0). Toàn bộ "tình trạng phòng" — đèn nào đang bật — có thể ghi lại bằng đúng **một dãy 5 chữ số nhị phân**, ví dụ \`01101\`. Mà một dãy nhị phân **chính là một số nguyên**. Vậy thay vì giữ một mảng \`bool[5]\` cồng kềnh, ta giữ **một số nguyên** \`13\` (vì \`01101₂ = 13\`). Đó là toàn bộ ý tưởng của **bitmask**: dùng một số nguyên làm một **tập hợp**.

Quy ước cốt lõi:

> Cho \`n\` phần tử đánh số \`0, 1, …, n-1\`. Một **bitmask** là một số nguyên \`mask\` mà **bit thứ \`i\` bằng 1 ⟺ phần tử \`i\` thuộc tập**.

Vài ví dụ số cụ thể (với \`n = 5\`, bit 0 là bit thấp nhất, viết nhị phân từ bit cao về bit thấp):

| \`mask\` thập phân | nhị phân (bit 4…0) | Tập tương ứng |
|---|---|---|
| \`0\` | \`00000\` | \`{}\` (tập rỗng) |
| \`1\` | \`00001\` | \`{0}\` |
| \`5\` | \`00101\` | \`{0, 2}\` |
| \`13\` | \`01101\` | \`{0, 2, 3}\` |
| \`31\` | \`11111\` | \`{0, 1, 2, 3, 4}\` (tập đầy đủ) |

Lưu ý số tập con: với \`n\` phần tử có đúng \`2^n\` tập con, và bitmask chạy từ \`0\` đến \`2^n - 1\` — ánh xạ **1-1**. Với \`n = 5\` thì \`2^5 = 32\` mask (từ \`0\` đến \`31\`). Đây chính là lý do **số lượng state của bitmask DP là \`2^n\`**.

> **❓ Câu hỏi tự nhiên của người đọc**
>
> - *"Vì sao không dùng \`[]bool\` hay \`map[int]bool\` cho gọn?"* — Vì bitmask cho phép **so sánh, copy, lưu làm key mảng, hợp/giao hai tập** chỉ bằng **một phép toán CPU** (1 chu kỳ), trong khi \`[]bool\` cần lặp. Quan trọng hơn: ta cần **đánh số mọi tập con từ 0 đến 2^n−1** để dùng làm chỉ số mảng DP — chỉ số nguyên làm được, slice/map thì không.
> - *"\`n\` lớn được không?"* — Không. \`2^n\` mọc theo cấp số nhân: \`n=20 → ~1 triệu\`, \`n=30 → ~1 tỉ\`. Bitmask DP chỉ dùng cho \`n\` nhỏ (mục 9).
> - *"Bit 0 là bit nào?"* — Bit **thấp nhất** (least significant), tức \`1<<0 = 1\`. Phần tử \`i\` ↔ giá trị \`1<<i\`.

### Recap nhanh phép toán bit (Go)

Trong Go, \`1<<i\` tạo số chỉ có **bit thứ \`i\`** bật. Đây là "viên gạch" để thao tác từng phần tử:

\`\`\`go
// 1<<i là "lá cờ" (flag) đại diện cho riêng phần tử i:
//   1<<0 = 1   = 00001₂   → phần tử 0
//   1<<2 = 4   = 00100₂   → phần tử 2
//   1<<4 = 16  = 10000₂   → phần tử 4
// Toán tử bitwise trong Go:
//   &   AND      → giao tập / kiểm tra bit
//   |   OR       → hợp tập / set bit
//   ^   XOR      → toggle bit (đảo)
//   &^  AND-NOT  → clear bit (xóa) — đặc sản của Go, thay cho \`& ^x\` ở C
//   <<  shift trái
\`\`\`

> **🔁 Dừng lại tự kiểm tra**
>
> Tập \`{1, 3}\` với \`n = 4\` ứng với mask thập phân nào?
>
> <details><summary>Đáp án</summary>
>
> Bit 1 và bit 3 bật: \`1<<1 | 1<<3 = 2 + 8 = 10\`. Nhị phân \`1010₂ = 10\`. ✓
> </details>

---

## 2. Thao tác tập bằng bit

Đây là "bộ đồ nghề" bạn sẽ dùng đi dùng lại trong mọi bài bitmask DP. Mỗi thao tác là **một biểu thức bit**, chạy trong \`O(1)\`.

> **💡 Trực giác / Hình dung**
>
> Coi \`mask\` như một bảng tích kiểm: mỗi ô là một phần tử, đánh dấu ✓ (1) hoặc trống (0). "Set" là tô đậm một ô; "clear" là tẩy một ô; "toggle" là lật trạng thái một ô; "kiểm tra" là nhìn xem ô đó có ✓ chưa.

| Thao tác | Biểu thức Go | Ý nghĩa |
|---|---|---|
| **Kiểm tra** phần tử \`i\` có trong tập? | \`mask & (1<<i) != 0\` | bit \`i\` bật? |
| **Set** (thêm) phần tử \`i\` | \`mask \\| (1<<i)\` | bật bit \`i\` |
| **Clear** (xóa) phần tử \`i\` | \`mask &^ (1<<i)\` | tắt bit \`i\` |
| **Toggle** (đảo) phần tử \`i\` | \`mask ^ (1<<i)\` | lật bit \`i\` |
| **Đếm** số phần tử trong tập | \`bits.OnesCount(uint(mask))\` | đếm bit 1 (popcount) |
| **Hợp** hai tập | \`a \\| b\` | union |
| **Giao** hai tập | \`a & b\` | intersection |
| **Hiệu** \`a \\ b\` | \`a &^ b\` | phần tử trong a mà không trong b |
| **Tập đầy đủ** \`n\` phần tử | \`(1<<n) - 1\` | tất cả \`n\` bit thấp bật |
| **Là tập con?** \`a ⊆ b\` | \`a & b == a\` | mọi bit của a đều trong b |

### Walk-through bằng số thật

Lấy \`mask = 13 = 01101₂\` (tập \`{0, 2, 3}\`), \`n = 5\`. Tính từng thao tác:

1. **Kiểm tra phần tử 2:** \`13 & (1<<2) = 01101 & 00100 = 00100 = 4 ≠ 0\` → **có** ✓. Phần tử 2 đúng là đang trong tập \`{0,2,3}\`.
2. **Kiểm tra phần tử 1:** \`13 & (1<<1) = 01101 & 00010 = 00000 = 0\` → **không**. Đúng, 1 không trong tập.
3. **Set phần tử 1:** \`13 | (1<<1) = 01101 | 00010 = 01111 = 15\` → tập \`{0,1,2,3}\`. ✓
4. **Clear phần tử 0:** \`13 &^ (1<<0) = 01101 &^ 00001 = 01100 = 12\` → tập \`{2,3}\`. ✓
5. **Toggle phần tử 3** (đang có → mất): \`13 ^ (1<<3) = 01101 ^ 01000 = 00101 = 5\` → tập \`{0,2}\`. ✓
6. **Toggle phần tử 4** (chưa có → thêm): \`13 ^ (1<<4) = 01101 ^ 10000 = 11101 = 29\` → tập \`{0,2,3,4}\`. ✓
7. **Đếm bit:** \`bits.OnesCount(13) = 3\` (vì \`{0,2,3}\` có 3 phần tử). ✓
8. **Tập đầy đủ:** \`(1<<5) - 1 = 32 - 1 = 31 = 11111₂\` → \`{0,1,2,3,4}\`. ✓

> **⚠ Lỗi thường gặp**
>
> - **Quên \`&^\` của Go.** Trong C/C++ clear bit là \`mask & ~(1<<i)\`. Go có toán tử riêng \`&^\` (AND-NOT) gọn hơn — nhưng \`mask & ^(1<<i)\` trong Go **cũng đúng** vì \`^x\` ở vị trí unary là NOT. Đừng nhầm \`^\` unary (NOT) với \`^\` binary (XOR).
> - **Dùng \`==\` thay vì \`!= 0\` khi kiểm tra.** \`mask & (1<<i)\` trả về \`1<<i\` (vd 4) chứ không trả về \`1\`. Viết \`mask & (1<<i) == 1\` là **sai** trừ khi \`i == 0\`. Luôn so với \`!= 0\`.
> - **Quên dấu ngoặc.** Trong Go, \`<<\` có độ ưu tiên cao, nhưng \`&\` thấp hơn \`==\`. \`mask & 1<<i != 0\` dễ sai — luôn đóng ngoặc: \`(mask & (1<<i)) != 0\`.

### Code helper đầy đủ (Go)

\`\`\`go
package main

import (
	"fmt"
	"math/bits"
)

// Bộ thao tác tập bằng bitmask. Tất cả O(1).
func has(mask, i int) bool { return mask&(1<<i) != 0 } // i thuộc tập?
func set(mask, i int) int  { return mask | (1 << i) }  // thêm i
func clr(mask, i int) int  { return mask &^ (1 << i) } // xóa i
func tog(mask, i int) int  { return mask ^ (1 << i) }  // đảo i
func count(mask int) int   { return bits.OnesCount(uint(mask)) }
func full(n int) int       { return (1 << n) - 1 } // tập đầy đủ n phần tử
func isSubset(a, b int) bool { return a&b == a }   // a ⊆ b?

// In tập tương ứng với mask, vd 13 -> {0, 2, 3}
func show(mask, n int) string {
	s := "{"
	first := true
	for i := 0; i < n; i++ {
		if has(mask, i) {
			if !first {
				s += ", "
			}
			s += fmt.Sprintf("%d", i)
			first = false
		}
	}
	return s + "}"
}

func main() {
	n, mask := 5, 13 // 01101
	fmt.Println(show(mask, n))     // {0, 2, 3}
	fmt.Println(has(mask, 2))      // true
	fmt.Println(show(set(mask, 1), n)) // {0, 1, 2, 3}
	fmt.Println(show(clr(mask, 0), n)) // {2, 3}
	fmt.Println(count(mask))       // 3
	fmt.Println(full(5))           // 31
}
\`\`\`

> **🔁 Dừng lại tự kiểm tra**
>
> \`mask = 22 = 10110₂\` (tập \`{1,2,4}\`). Sau \`clr(mask, 2)\` được tập nào?
>
> <details><summary>Đáp án</summary>
>
> \`22 &^ (1<<2) = 10110 &^ 00100 = 10010 = 18\` → tập \`{1, 4}\`. ✓
> </details>

> **📝 Tóm tắt mục 2**
>
> - Một số nguyên = một tập. Bit \`i\` ↔ phần tử \`i\`. Giá trị \`1<<i\` là cờ riêng của phần tử \`i\`.
> - 4 thao tác lõi: kiểm tra \`& (1<<i)\`, set \`| (1<<i)\`, clear \`&^ (1<<i)\`, toggle \`^ (1<<i)\`.
> - Đếm phần tử = \`bits.OnesCount\`. Tập đầy đủ = \`(1<<n)-1\`.
> - Kiểm tra phải dùng \`!= 0\`, không dùng \`== 1\`. Luôn đóng ngoặc.

---

## 3. Bitmask DP — ý tưởng cốt lõi

> **💡 Trực giác / Hình dung**
>
> Nhớ bài đổi tiền hay leo cầu thang ở [Lesson 24](../lesson-24-dp-1d/): state là một con số (số bậc còn lại, số tiền còn lại). Bitmask DP chỉ **thay state "một con số chỉ số"** bằng **state "một tập con đã xử lý"**. Hãy hình dung bạn đang đi siêu thị với danh sách \`n\` món. Bạn quan tâm đến **đã mua được những món nào** (một tập con) chứ không phải "mua theo thứ tự nào" — vì kết quả chỉ phụ thuộc vào tập đã mua. Bitmask DP đúng cho những bài mà **kết quả tối ưu chỉ phụ thuộc TẬP đã chọn**, không phụ thuộc thứ tự cụ thể đã đi tới đó.

Định nghĩa hình thức:

> **Bitmask DP**: state chính là một (hoặc kèm thêm vài biến) **bitmask** đại diện tập các phần tử đã/chưa xử lý. \`dp[mask]\` = giá trị tối ưu (min/max/đếm) khi tập con \`mask\` đã hoàn thành. Vì có \`2^n\` mask, bảng DP có \`2^n\` state.

Khung tổng quát:

\`\`\`go
// dp[mask] = kết quả tối ưu khi tập "mask" đã được xử lý xong.
// Base case: mask = 0 (chưa làm gì) hoặc mask đầy đủ (làm xong tất cả).
// Chuyển trạng thái: từ mask, thêm 1 phần tử j chưa có -> mask | (1<<j).
dp := make([]int, 1<<n)
// ... khởi tạo base case ...
for mask := 0; mask < (1 << n); mask++ {
	for j := 0; j < n; j++ {
		if mask&(1<<j) == 0 { // j chưa trong tập
			next := mask | (1 << j)
			dp[next] = best(dp[next], dp[mask]+cost(mask, j))
		}
	}
}
// đáp án thường ở dp[(1<<n)-1] (tập đầy đủ)
\`\`\`

> **❓ Câu hỏi tự nhiên của người đọc**
>
> - *"Vì sao duyệt \`mask\` tăng dần lại đúng?"* — Vì khi thêm một phần tử, mask **luôn tăng** (\`mask | (1<<j) > mask\` khi bit \`j\` chưa có). Nên \`dp[mask]\` luôn được tính xong trước khi dùng để cập nhật \`dp[next]\`. Đây là thứ tự topo tự nhiên.
> - *"Phải duyệt thêm \`j\` à? Vậy tổng là bao nhiêu?"* — \`2^n\` mask × \`n\` lựa chọn \`j\` = \`O(2^n · n)\`. Nếu chuyển trạng thái cần thêm 1 biến (như TSP có thêm "đang đứng ở đâu") thì thành \`O(2^n · n²)\`.
> - *"Bộ nhớ?"* — \`O(2^n)\` cho \`dp[mask]\`, hoặc \`O(2^n · n)\` nếu state có thêm chiều. Đây là lý do \`n\` phải nhỏ.

> **📝 Tóm tắt mục 3**
>
> - State của bitmask DP = một bitmask (tập đã xử lý), có \`2^n\` state.
> - Duyệt mask tăng dần đảm bảo thứ tự đúng (thêm phần tử luôn làm mask tăng).
> - Dùng được khi kết quả chỉ phụ thuộc TẬP đã chọn, không phụ thuộc thứ tự.

---

## 4. TSP — Traveling Salesman Problem

**Bài toán:** có \`n\` thành phố, ma trận \`dist[i][j]\` là chi phí đi từ \`i\` đến \`j\`. Xuất phát từ thành phố \`0\`, thăm **mỗi thành phố đúng một lần**, rồi **quay về \`0\`**. Tìm chu trình có **tổng chi phí nhỏ nhất**.

> **💡 Trực giác / Hình dung**
>
> Một người giao hàng phải ghé hết các điểm rồi về kho. Brute-force là thử mọi thứ tự ghé: \`(n-1)!\` hoán vị — \`n=10\` đã là \`362880\`, \`n=13\` là \`~6 tỉ\`. Bitmask DP đẩy xuống \`O(2^n · n²)\`: ta không quan tâm **thứ tự** đã ghé các thành phố trong tập, chỉ quan tâm **đã ghé tập nào** và **đang đứng ở đâu** — vì chi phí đi tiếp chỉ phụ thuộc 2 thứ đó.

State:

> \`dp[mask][i]\` = chi phí nhỏ nhất của một đường đi **bắt đầu từ thành phố 0**, **đã thăm đúng tập \`mask\`** (luôn chứa cả 0 và i), và **hiện đang dừng ở thành phố \`i\`**.

- **Base case:** \`dp[1<<0][0] = 0\` — chỉ mới ở thành phố 0, chưa đi đâu, chi phí 0. (\`1<<0 = 1\` là tập \`{0}\`.)
- **Chuyển trạng thái:** từ \`(mask, i)\`, đi tới thành phố \`j\` chưa thăm: \`dp[mask | (1<<j)][j] = min(..., dp[mask][i] + dist[i][j])\`.
- **Đáp án:** \`min over i của dp[full][i] + dist[i][0]\` — thăm hết rồi cộng chặng về kho.

Độ phức tạp: \`2^n\` mask × \`n\` vị trí \`i\` × \`n\` lựa chọn \`j\` = **\`O(2^n · n²)\`**. Bộ nhớ \`O(2^n · n)\`.

### Walk-through 4 thành phố

Ma trận khoảng cách (đối xứng cho dễ theo dõi):

\`\`\`
       0    1    2    3
  0 [  0,  10,  15,  20 ]
  1 [ 10,   0,  35,  25 ]
  2 [ 15,  35,   0,  30 ]
  3 [ 20,  25,  30,   0 ]
\`\`\`

\`n = 4\`, full mask = \`1111₂ = 15\`. Khởi tạo \`dp[0001][0] = dp[1][0] = 0\`, mọi state khác = \`∞\`.

Tính dần (chỉ liệt kê các bước có nghĩa):

**Từ mask \`0001\` (\`{0}\`), đứng ở 0** — đi tới 1, 2, 3:
- \`dp[0011][1] = 0 + dist[0][1] = 10\`   (tập \`{0,1}\`, đứng ở 1)
- \`dp[0101][2] = 0 + dist[0][2] = 15\`   (tập \`{0,2}\`, đứng ở 2)
- \`dp[1001][3] = 0 + dist[0][3] = 20\`   (tập \`{0,3}\`, đứng ở 3)

**Từ \`0011\` (\`{0,1}\`), đứng ở 1** — đi tới 2, 3:
- \`dp[0111][2] = 10 + dist[1][2] = 10 + 35 = 45\`
- \`dp[1011][3] = 10 + dist[1][3] = 10 + 25 = 35\`

**Từ \`0101\` (\`{0,2}\`), đứng ở 2** — đi tới 1, 3:
- \`dp[0111][1] = 15 + dist[2][1] = 15 + 35 = 50\`
- \`dp[1101][3] = 15 + dist[2][3] = 15 + 30 = 45\`

**Từ \`1001\` (\`{0,3}\`), đứng ở 3** — đi tới 1, 2:
- \`dp[1011][1] = 20 + dist[3][1] = 20 + 25 = 45\`
- \`dp[1101][2] = 20 + dist[3][2] = 20 + 30 = 50\`

**Thăm 3 thành phố, còn 1:**
- \`dp[0111][2] = 45\` (qua 0→1→2). Đi tới 3: \`dp[1111][3] = 45 + dist[2][3] = 45 + 30 = 75\`.
- \`dp[0111][1] = 50\` (qua 0→2→1). Đi tới 3: \`dp[1111][3] = min(75, 50 + dist[1][3]) = min(75, 50+25=75) = 75\`.
- \`dp[1011][3] = 35\` (qua 0→1→3). Đi tới 2: \`dp[1111][2] = 35 + dist[3][2] = 35 + 30 = 65\`.
- \`dp[1011][1] = 45\` (qua 0→3→1). Đi tới 2: \`dp[1111][2] = min(65, 45 + dist[1][2]=45+35=80) = 65\`.
- \`dp[1101][3] = 45\` (qua 0→2→3). Đi tới 1: \`dp[1111][1] = 45 + dist[3][1] = 45 + 25 = 70\`.
- \`dp[1101][2] = 50\` (qua 0→3→2). Đi tới 1: \`dp[1111][1] = min(70, 50 + dist[2][1]=50+35=85) = 70\`.

**Cộng chặng về 0** (\`full = 1111 = 15\`):
- kết ở 1: \`dp[1111][1] + dist[1][0] = 70 + 10 = 80\`
- kết ở 2: \`dp[1111][2] + dist[2][0] = 65 + 15 = 80\`
- kết ở 3: \`dp[1111][3] + dist[3][0] = 75 + 20 = 95\`

**Đáp án:** \`min(80, 80, 95) = 80\`. Hai đường tối ưu: \`0→1→3→2→0\` (10+25+30+15 = 80) và \`0→2→3→1→0\` (15+30+25+10 = 80) — chính là cùng chu trình đi xuôi/ngược. ✓

### Code TSP (Go)

\`\`\`go
package main

import (
	"fmt"
	"math/bits"
)

const INF = 1 << 30

// tsp trả về chi phí chu trình nhỏ nhất, xuất phát & kết thúc ở 0.
func tsp(dist [][]int) int {
	n := len(dist)
	full := (1 << n) - 1
	// dp[mask][i]: min cost đã thăm tập mask, đang đứng ở i (mask luôn chứa 0 và i).
	dp := make([][]int, 1<<n)
	for m := range dp {
		dp[m] = make([]int, n)
		for i := range dp[m] {
			dp[m][i] = INF
		}
	}
	dp[1][0] = 0 // tập {0}, đứng ở 0, chi phí 0

	for mask := 1; mask <= full; mask++ {
		if mask&1 == 0 { // mọi đường hợp lệ phải chứa thành phố 0
			continue
		}
		for i := 0; i < n; i++ {
			if dp[mask][i] == INF || mask&(1<<i) == 0 {
				continue // chưa tới được, hoặc i không thuộc mask
			}
			for j := 0; j < n; j++ {
				if mask&(1<<j) != 0 { // j đã thăm
					continue
				}
				next := mask | (1 << j)
				if cand := dp[mask][i] + dist[i][j]; cand < dp[next][j] {
					dp[next][j] = cand // đi i -> j
				}
			}
		}
	}

	ans := INF
	for i := 1; i < n; i++ { // cộng chặng cuối về 0
		if dp[full][i]+dist[i][0] < ans {
			ans = dp[full][i] + dist[i][0]
		}
	}
	_ = bits.OnesCount // (dùng trong các hàm khác)
	return ans
}

func main() {
	dist := [][]int{
		{0, 10, 15, 20},
		{10, 0, 35, 25},
		{15, 35, 0, 30},
		{20, 25, 30, 0},
	}
	fmt.Println(tsp(dist)) // 80
}
\`\`\`

> **⚠ Lỗi thường gặp**
>
> - **Quên ràng buộc "mask phải chứa 0".** Mọi đường xuất phát từ 0 nên mọi mask hợp lệ đều có bit 0 = 1. Bỏ \`if mask&1 == 0 { continue }\` không sai kết quả (các state đó vẫn \`INF\`) nhưng lãng phí; quan trọng là \`dp[1][0]=0\` đặt đúng.
> - **Cộng chặng về 0 cho cả \`i = 0\`.** Vòng cuối phải bắt đầu \`i = 1\` — nếu \`n > 1\` thì \`dp[full][0]\` vẫn là \`INF\` (không có đường thăm hết rồi đứng lại ở 0), nhưng cộng \`dist[0][0]=0\` cũng vô hại; vẫn nên loại để rõ ý.
> - **Nhầm "đường" (path) với "chu trình" (cycle).** Nếu đề chỉ cần thăm hết mà KHÔNG về 0 (Hamiltonian path), bỏ phần \`+ dist[i][0]\` và lấy thẳng \`min dp[full][i]\`.

> **🔁 Dừng lại tự kiểm tra**
>
> Với ma trận trên, \`dp[1111][2] = 65\` đến từ đường nào?
>
> <details><summary>Đáp án</summary>
>
> \`0→1→3→2\`: \`dist[0][1]+dist[1][3]+dist[3][2] = 10+25+30 = 65\`. ✓ (đứng ở 2, chưa cộng về 0)
> </details>

> **📝 Tóm tắt mục 4**
>
> - \`dp[mask][i]\` = min cost thăm tập \`mask\`, đang ở \`i\`. Base \`dp[{0}][0]=0\`.
> - Chuyển: \`dp[mask|1<<j][j] = min(..., dp[mask][i] + dist[i][j])\` với \`j\` chưa thăm.
> - Đáp án = \`min_i dp[full][i] + dist[i][0]\`. Độ phức tạp \`O(2^n·n²)\`.

---

## 5. Assignment problem — bài toán gán

**Bài toán:** có \`n\` người và \`n\` việc. \`cost[p][j]\` là chi phí khi giao **người \`p\`** làm **việc \`j\`**. Mỗi người làm đúng một việc, mỗi việc đúng một người. Tìm cách gán có **tổng chi phí nhỏ nhất**.

> **💡 Trực giác / Hình dung**
>
> Brute-force: thử mọi hoán vị "người → việc" = \`n!\` cách. Mẹo bitmask: gán **lần lượt từng người** theo thứ tự \`0, 1, 2, …\`. Khi đang gán **người \`p\`**, tập việc **đã bị chiếm** chính là một bitmask \`mask\`, và **số việc đã chiếm = số người đã gán = \`p\`** (\`p = popcount(mask)\`). Nên ta **không cần lưu \`p\` riêng** — nó suy ra được từ \`mask\`! State chỉ còn 1 chiều.

State:

> \`dp[mask]\` = chi phí nhỏ nhất để gán xong những người đầu tiên, với \`mask\` = **tập việc đã được giao**. Người đang xét tiếp theo là \`p = popcount(mask)\`.

- **Base case:** \`dp[0] = 0\` — chưa giao việc nào.
- **Chuyển trạng thái:** ở \`dp[mask]\`, người \`p = popcount(mask)\` chọn một việc \`j\` chưa bị chiếm: \`dp[mask | (1<<j)] = min(..., dp[mask] + cost[p][j])\`.
- **Đáp án:** \`dp[(1<<n)-1]\` (mọi việc đã giao = mọi người đã gán).

Độ phức tạp: \`2^n\` mask × \`n\` lựa chọn việc \`j\` = **\`O(2^n · n)\`** — gọn hơn TSP một bậc \`n\` vì người \`p\` suy ra từ mask, không cần chiều thứ hai.

### Walk-through 3 người / 3 việc

\`\`\`
        việc0  việc1  việc2
người0 [  9,    2,    7  ]
người1 [  6,    4,    3  ]
người2 [  5,    8,    1  ]
\`\`\`

\`n = 3\`, full = \`111₂ = 7\`. \`dp[0] = 0\`. Người tiếp = \`popcount(mask)\`.

**\`dp[000]=0\`, người 0 chọn việc:**
- việc0: \`dp[001] = 0 + cost[0][0] = 9\`
- việc1: \`dp[010] = 0 + cost[0][1] = 2\`
- việc2: \`dp[100] = 0 + cost[0][2] = 7\`

**Người 1 (\`popcount=1\`):**
- từ \`dp[001]=9\`: +việc1 → \`dp[011]=9+4=13\`; +việc2 → \`dp[101]=9+3=12\`
- từ \`dp[010]=2\`: +việc0 → \`dp[011]=min(13, 2+6=8)=8\`; +việc2 → \`dp[110]=2+3=5\`
- từ \`dp[100]=7\`: +việc0 → \`dp[101]=min(12, 7+6=13)=12\`; +việc1 → \`dp[110]=min(5, 7+4=11)=5\`

**Người 2 (\`popcount=2\`), điền \`dp[111]\`:**
- từ \`dp[011]=8\` (đã giao việc 0,1 → người 0,1), người 2 lấy việc2: \`dp[111]=8+cost[2][2]=8+1=9\`
- từ \`dp[101]=12\` (việc 0,2), người 2 lấy việc1: \`dp[111]=min(9, 12+cost[2][1]=12+8=20)=9\`
- từ \`dp[110]=5\` (việc 1,2), người 2 lấy việc0: \`dp[111]=min(9, 5+cost[2][0]=5+5=10)=9\`

**Đáp án:** \`dp[111] = 9\`. Cách gán tối ưu là \`dp[011]=8\` (người0→việc1=2, người1→việc0=6) rồi người2→việc2=1, tổng \`2+6+1=9\`. ✓

### Code assignment (Go)

\`\`\`go
package main

import (
	"fmt"
	"math/bits"
)

const INF = 1 << 30

// assign trả về tổng chi phí nhỏ nhất gán n người cho n việc.
func assign(cost [][]int) int {
	n := len(cost)
	dp := make([]int, 1<<n)
	for i := range dp {
		dp[i] = INF
	}
	dp[0] = 0 // chưa gán việc nào

	for mask := 0; mask < (1 << n); mask++ {
		if dp[mask] == INF {
			continue
		}
		p := bits.OnesCount(uint(mask)) // người tiếp theo = số việc đã chiếm
		if p == n {
			continue // đã gán hết
		}
		for j := 0; j < n; j++ {
			if mask&(1<<j) != 0 { // việc j đã bị chiếm
				continue
			}
			next := mask | (1 << j)
			if cand := dp[mask] + cost[p][j]; cand < dp[next] {
				dp[next] = cand // giao việc j cho người p
			}
		}
	}
	return dp[(1<<n)-1]
}

func main() {
	cost := [][]int{
		{9, 2, 7},
		{6, 4, 3},
		{5, 8, 1},
	}
	fmt.Println(assign(cost)) // 9
}
\`\`\`

> **⚠ Lỗi thường gặp**
>
> - **Lưu thừa chiều "người đang xét".** Nhiều người viết \`dp[p][mask]\` — không sai nhưng tốn \`n\` lần bộ nhớ. Vì \`p = popcount(mask)\` luôn đúng (mỗi người chiếm đúng 1 việc), \`dp[mask]\` 1 chiều là đủ.
> - **Quên \`dp[mask]==INF\` thì skip.** State chưa tới được vẫn \`INF\`; cộng tiếp sẽ tràn hoặc lan giá trị rác.

> **📝 Tóm tắt mục 5**
>
> - \`dp[mask]\` = min cost, \`mask\` = tập việc đã giao, người tiếp = \`popcount(mask)\`.
> - Chuyển: \`dp[mask|1<<j] = min(..., dp[mask] + cost[p][j])\`. Đáp án \`dp[full]\`.
> - \`O(2^n·n)\` — không cần chiều "người" vì suy ra từ popcount.

---

## 6. Count ways / Hamiltonian path — đếm đường

Bitmask DP không chỉ tối ưu, còn **đếm** được. Đổi \`min\`/\`max\` thành **cộng dồn**.

**Bài toán:** đồ thị \`n\` đỉnh, ma trận kề \`adj[i][j]\` (1 nếu có cạnh). Đếm số **đường Hamilton** — đường đi qua **mỗi đỉnh đúng một lần** (không cần về điểm đầu, đếm mọi điểm xuất phát).

State:

> \`dp[mask][i]\` = **số** đường đã thăm đúng tập \`mask\`, kết thúc ở đỉnh \`i\` (\`i ∈ mask\`).

- **Base case:** \`dp[1<<i][i] = 1\` cho mọi \`i\` — một đường chỉ gồm riêng đỉnh \`i\`.
- **Chuyển:** từ \`(mask, i)\` đi sang \`j\` chưa thăm và có cạnh \`i→j\`: \`dp[mask|1<<j][j] += dp[mask][i]\`.
- **Đáp án:** \`Σ_i dp[full][i]\` — tổng mọi đường thăm hết, kết ở bất kỳ đỉnh nào.

### Walk-through nhỏ

Đồ thị 3 đỉnh là một tam giác (mọi cặp đều nối): \`adj[i][j]=1\` với \`i≠j\`. full = \`111=7\`.

Base: \`dp[001][0]=dp[010][1]=dp[100][2]=1\`.

Mở rộng độ dài 2:
- từ \`dp[001][0]=1\`: → 1 cho \`dp[011][1]+=1\`; → 2 cho \`dp[101][2]+=1\`
- từ \`dp[010][1]=1\`: → 0 cho \`dp[011][0]+=1\`; → 2 cho \`dp[110][2]+=1\`
- từ \`dp[100][2]=1\`: → 0 cho \`dp[101][0]+=1\`; → 1 cho \`dp[110][1]+=1\`

Độ dài 3 (điền \`dp[111][*]\`):
- \`dp[011][1]=1\` (0→1), thêm 2: \`dp[111][2]+=1\`
- \`dp[011][0]=1\` (1→0), thêm 2: \`dp[111][2]+=1\` → \`=2\`
- \`dp[101][2]=1\` (0→2), thêm 1: \`dp[111][1]+=1\`
- \`dp[101][0]=1\` (2→0), thêm 1: \`dp[111][1]+=1\` → \`=2\`
- \`dp[110][2]=1\` (1→2), thêm 0: \`dp[111][0]+=1\`
- \`dp[110][1]=1\` (2→1), thêm 0: \`dp[111][0]+=1\` → \`=2\`

Đáp án \`= dp[111][0]+dp[111][1]+dp[111][2] = 2+2+2 = 6\`. Đúng: tam giác có \`3! = 6\` hoán vị đỉnh, mỗi hoán vị là một đường Hamilton hợp lệ. ✓

### Code đếm đường Hamilton (Go)

\`\`\`go
package main

import "fmt"

// countHamiltonian đếm số đường đi qua mỗi đỉnh đúng 1 lần (mọi điểm xuất phát).
func countHamiltonian(adj [][]int) int {
	n := len(adj)
	dp := make([][]int, 1<<n)
	for m := range dp {
		dp[m] = make([]int, n)
	}
	for i := 0; i < n; i++ {
		dp[1<<i][i] = 1 // đường chỉ gồm đỉnh i
	}
	for mask := 0; mask < (1 << n); mask++ {
		for i := 0; i < n; i++ {
			if dp[mask][i] == 0 || mask&(1<<i) == 0 {
				continue
			}
			for j := 0; j < n; j++ {
				if mask&(1<<j) != 0 || adj[i][j] == 0 {
					continue // j đã thăm, hoặc không có cạnh i->j
				}
				dp[mask|(1<<j)][j] += dp[mask][i]
			}
		}
	}
	full, total := (1<<n)-1, 0
	for i := 0; i < n; i++ {
		total += dp[full][i]
	}
	return total
}

func main() {
	adj := [][]int{{0, 1, 1}, {1, 0, 1}, {1, 1, 0}} // tam giác
	fmt.Println(countHamiltonian(adj)) // 6
}
\`\`\`

> **📝 Tóm tắt mục 6**
>
> - Đếm = đổi \`min/max\` thành \`+=\`. \`dp[mask][i]\` = số đường thăm \`mask\`, kết ở \`i\`.
> - Base \`dp[1<<i][i]=1\`. Đáp án \`Σ_i dp[full][i]\`. Độ phức tạp \`O(2^n·n²)\`.

---

## 7. Subset enumeration — duyệt mọi tập con của một mask

Nhiều bài (mục 8) cần: cho một tập \`mask\`, **duyệt qua TẤT CẢ tập con** của nó. Có một trick một dòng kinh điển:

\`\`\`go
// Duyệt mọi tập con khác rỗng của mask, giảm dần.
for s := mask; s > 0; s = (s - 1) & mask {
	// s là một tập con của mask
}
// (s = 0, tức tập rỗng, không vào vòng lặp — xử lý riêng nếu cần)
\`\`\`

> **💡 Trực giác / Hình dung**
>
> Hãy coi \`mask\` như "khuôn" chỉ cho phép một số bit được bật. \`s - 1\` "mượn" qua các bit thấp như phép trừ thông thường, làm \`s\` giảm. Nhưng \`s-1\` có thể bật những bit **không thuộc** \`mask\`; phép \`& mask\` **cắt bỏ** chúng, ép \`s\` về tập con hợp lệ kế tiếp nhỏ hơn. Cứ thế ta nhảy lần lượt qua mọi tập con từ lớn (\`mask\`) về nhỏ (\`0\`).

### Walk-through với \`mask = 0110₂ = 6\` (tập \`{1, 2}\`)

Tập \`{1,2}\` có \`2² = 4\` tập con: \`{}, {1}, {2}, {1,2}\`. Theo dõi vòng lặp:

| Bước | \`s\` (nhị phân) | \`s\` thập phân | Tập | \`s-1\` | \`(s-1)&mask\` |
|---|---|---|---|---|---|
| khởi tạo | \`0110\` | 6 | \`{1,2}\` | \`0101\` | \`0100 = 4\` |
| 2 | \`0100\` | 4 | \`{2}\` | \`0011\` | \`0010 = 2\` |
| 3 | \`0010\` | 2 | \`{1}\` | \`0001\` | \`0000 = 0\` |
| dừng | \`0000\` | 0 | \`{}\` | — | — (s>0 sai) |

Vòng lặp duyệt \`6 → 4 → 2\`, tức \`{1,2}, {2}, {1}\` — đúng 3 tập con **khác rỗng**, giảm dần. Tập rỗng \`{}\` không vào vòng (vì điều kiện \`s > 0\`), xử lý riêng nếu bài cần. ✓

> **❓ Câu hỏi tự nhiên của người đọc**
>
> - *"Vì sao trick này duyệt ĐỦ và KHÔNG TRÙNG?"* — Mỗi giá trị \`s\` chỉ xuất hiện một lần và giảm nghiêm ngặt (\`(s-1)&mask < s\` luôn đúng vì ta vừa xóa ít nhất bit thấp nhất). Nó liệt kê **đúng** các con số \`s\` thỏa \`s ⊆ mask\` theo thứ tự giảm — không sót, không lặp.
> - *"Tổng độ phức tạp khi duyệt subset-of-subset là bao nhiêu?"* — Nếu bạn chạy \`for mask\` rồi với mỗi mask lại \`for s ⊆ mask\`, một mask có \`k\` bit có \`2^k\` tập con. Tổng \`Σ_mask 2^popcount(mask) = Σ_{k} C(n,k)·2^k = (1+2)^n = 3^n\` (nhị thức Newton). Vậy là **\`O(3^n)\`**, không phải \`O(4^n)\` hay \`O(2^n·2^n)\`. Ghi nhớ con số này.

### Code subset enumeration (Go)

\`\`\`go
package main

import "fmt"

func main() {
	mask := 0b0110 // {1, 2}
	fmt.Print("Tập con khác rỗng của {1,2}: ")
	for s := mask; s > 0; s = (s - 1) & mask {
		fmt.Printf("%04b ", s) // 0110 0100 0010
	}
	fmt.Println()

	// Tổng số lần lặp trên mọi mask của n phần tử = 3^n.
	n, total := 3, 0
	for mask := 0; mask < (1 << n); mask++ {
		for s := mask; s > 0; s = (s - 1) & mask {
			total++
		}
	}
	fmt.Println("Tổng subset khác rỗng (n=3):", total) // 19 = 3^3 - 2^3 = 27 - 8
}
\`\`\`

> **⚠ Lỗi thường gặp**
>
> - **Nhầm \`O(3^n)\` thành \`O(2^n)\`.** Subset-of-subset là \`3^n\` (\`n=18 → ~387 triệu\`), nặng hơn DP \`2^n\` thường nhiều. Đừng đánh giá thấp.
> - **Quên tập rỗng.** Vòng \`s > 0\` bỏ qua \`s = 0\`. Nếu bài cần xét cả tập rỗng (vd partition), xử lý \`s = 0\` riêng hoặc viết vòng do-while thủ công.

> **📝 Tóm tắt mục 7**
>
> - Trick \`for s := mask; s > 0; s = (s-1) & mask\` duyệt mọi tập con khác rỗng, giảm dần, không trùng.
> - Tổng lần lặp trên mọi mask = \`O(3^n)\` (nhị thức \`(1+2)^n\`), không phải \`2^n\`.

---

## 8. Partition into groups — chia thành nhóm

Bài toán dạng "chia \`n\` phần tử thành \`k\` nhóm thỏa điều kiện" thường kết hợp **bitmask DP + subset enumeration** (mục 7).

> **💡 Trực giác / Hình dung**
>
> \`dp[mask]\` = (số cách / chi phí tốt nhất) để phủ kín tập \`mask\` bằng các nhóm hợp lệ. Để tính \`dp[mask]\`, ta thử **mọi tập con \`sub ⊆ mask\`** làm "nhóm cuối cùng": nếu \`sub\` là một nhóm hợp lệ thì \`dp[mask] = op(dp[mask], dp[mask \\ sub] + cost(sub))\`. Đây chính là chỗ trick subset enumeration vào cuộc → tổng \`O(3^n)\`.

Mẫu chia nhóm (đếm số cách chia thành các nhóm hợp lệ):

\`\`\`go
package main

import "fmt"

// Đếm số cách chia tập n phần tử thành các nhóm "hợp lệ" (valid).
// valid[sub] = true nếu sub là một nhóm hợp lệ (do bài toán định nghĩa).
func countPartitions(n int, valid []bool) int {
	full := (1 << n) - 1
	dp := make([]int, 1<<n)
	dp[0] = 1 // 1 cách phủ tập rỗng (không nhóm nào)
	for mask := 1; mask <= full; mask++ {
		// Cố định "phần tử thấp nhất chưa phủ phải nằm trong nhóm cuối"
		// -> mỗi phân hoạch (set-of-sets) chỉ đếm 1 lần, không trùng thứ tự nhóm.
		low := mask & (-mask) // bit thấp nhất của mask
		// Thử mọi tập con sub của mask (luôn chứa low) làm nhóm cuối cùng.
		for sub := mask; sub > 0; sub = (sub - 1) & mask {
			if sub&low == 0 {
				continue // nhóm cuối phải chứa phần tử thấp nhất
			}
			if valid[sub] {
				dp[mask] += dp[mask&^sub] // phần còn lại đã chia xong
			}
		}
	}
	return dp[full]
}

func main() {
	// Ví dụ n=3: chỉ các cặp {0,1} và đơn lẻ là hợp lệ (minh họa).
	n := 3
	valid := make([]bool, 1<<n)
	valid[0b001] = true // {0}
	valid[0b010] = true // {1}
	valid[0b100] = true // {2}
	valid[0b011] = true // {0,1}
	fmt.Println(countPartitions(n, valid))
	// Các cách phủ {0,1,2}: {0}{1}{2}, {0,1}{2} -> 2 cách
}
\`\`\`

> **❓ Câu hỏi tự nhiên của người đọc**
>
> - *"\`valid[sub]\` lấy đâu ra?"* — Tùy bài. Vd "chia thành các nhóm tổng ≤ C": \`valid[sub] = (sum(sub) <= C)\`. "Chia thành nhóm \`k\` người tương thích": \`valid[sub]\` = sub là một clique kích thước hợp lệ. Tiền xử lý \`valid\` trong \`O(2^n · n)\`.
> - *"Vì sao \`dp[mask &^ sub]\`?"* — \`mask &^ sub\` = \`mask\` bỏ đi các phần tử của \`sub\` = phần còn lại cần chia tiếp. Vì \`sub ⊆ mask\` nên \`mask &^ sub = mask - sub\` (về tập).

> **📝 Tóm tắt mục 8**
>
> - Chia nhóm = \`dp[mask]\` gộp qua mọi \`sub ⊆ mask\` hợp lệ làm nhóm cuối: \`dp[mask] op= dp[mask&^sub] ⊕ cost(sub)\`.
> - Kết hợp bitmask DP + subset enumeration → \`O(3^n)\`. Tiền xử lý \`valid[sub]\` riêng.

---

## 9. Độ phức tạp & giới hạn \`n\`

Bitmask DP gần như luôn có dạng \`O(2^n · poly(n))\` về thời gian, \`O(2^n · poly(n))\` về bộ nhớ. Bảng cảm nhận con số:

| \`n\` | \`2^n\` | \`2^n · n\` | \`2^n · n²\` | \`3^n\` | Khả thi? |
|---|---|---|---|---|---|
| 10 | 1 024 | ~10 K | ~100 K | ~59 K | rất nhanh |
| 15 | 32 768 | ~0.5 M | ~7 M | ~14 M | nhanh |
| 18 | 262 144 | ~4.7 M | ~85 M | ~387 M | OK (3^n đã hơi nặng) |
| 20 | ~1.05 M | ~21 M | ~419 M | ~3.5 tỉ | \`2^n\` OK, \`3^n\` quá nặng |
| 22 | ~4.2 M | ~92 M | ~2 tỉ | — | giới hạn (cần hằng số nhỏ) |
| 25 | ~33.5 M | ~838 M | — | — | thường quá MLE/TLE |
| 30 | ~1.07 tỉ | — | — | — | **không dùng** |

> **❓ Câu hỏi tự nhiên của người đọc**
>
> - *"Ngưỡng thực dụng là bao nhiêu?"* — \`n ≤ 20\` an toàn cho DP \`O(2^n·n²)\`. \`n = 22–25\` chỉ qua nếu đa thức nhỏ (\`O(2^n·n)\` hay \`O(2^n)\`) và bộ nhớ vừa. \`n > 25\` → đổi cách (meet-in-the-middle, branch&bound, heuristic).
> - *"Bộ nhớ hay thời gian chết trước?"* — Thường **bộ nhớ**: \`dp[2^n][n]\` với \`n=22\` là \`4.2M × 22 × 8 byte ≈ 740 MB\` — MLE. Nếu chỉ cần \`dp[2^n]\` 1 chiều thì nhẹ hơn nhiều.

> **📝 Tóm tắt mục 9**
>
> - Thời gian \`O(2^n·poly)\`, bộ nhớ \`O(2^n·poly)\`. \`n ≤ 20\` an toàn.
> - \`2^20 ≈ 1M\` (OK), \`3^n\` nặng hơn nhiều — chỉ tới \`~n=18\`. \`n > 25\` không dùng bitmask DP.

---

## 10. Khi nào dùng bitmask DP?

Dấu hiệu nhận diện một bài là bitmask DP:

1. **\`n\` rất nhỏ** — ràng buộc cho \`n ≤ 20\` (đôi khi tới 22–25). Đây là tín hiệu mạnh nhất; thấy \`n ≤ 20\` trong bài tối ưu/đếm là nghĩ ngay tới bitmask.
2. **Cần track TẬP CON đã chọn/thăm** — "đã thăm thành phố nào", "đã chọn người/việc nào", "đã phủ vùng nào". Kết quả phụ thuộc **tập**, không phụ thuộc thứ tự đi tới.
3. **Bài toán dạng permutation / assignment / cover / partition** — TSP, gán việc, đường Hamilton, chia nhóm, set cover nhỏ.

Ngược lại, **đừng** dùng bitmask DP khi: \`n\` lớn (dùng greedy/DP đa thức khác), hoặc kết quả phụ thuộc thứ tự phức tạp hơn "tập + vị trí hiện tại".

> **📝 Tóm tắt mục 10**
>
> - Dấu hiệu vàng: \`n ≤ 20\` + cần nhớ "tập đã chọn/thăm" + dạng permutation/assignment/cover.

---

## 11. Cạm bẫy

> **⚠ Lỗi thường gặp — tổng hợp**
>
> 1. **\`n > 20\` → \`2^n\` nổ.** \`n=30\` là \`~1 tỉ\` state — TLE/MLE chắc chắn. Luôn kiểm tra ràng buộc \`n\` trước khi chọn bitmask.
> 2. **Nhầm subset-of-subset là \`O(2^n)\`.** Nó là \`O(3^n)\` (mục 7). \`n=18\` đã \`~387 triệu\` — đừng đánh giá thấp.
> 3. **Off-by-one ở bit index.** Phần tử \`i\` ↔ \`1<<i\`, không phải \`1<<(i-1)\`. Phần tử đầu là 0, không phải 1. Tập đầy đủ là \`(1<<n)-1\`, không phải \`1<<n\`.
> 4. **\`1<<i\` tràn kiểu (overflow).** Trong Go, \`int\` thường 64-bit nên \`1<<i\` an toàn tới \`i=62\`, nhưng nếu dùng \`int32\` hay shift \`i ≥ 64\` thì kết quả undefined/0. Với \`n\` lớn hơn 31 phải dùng \`int\`/\`uint64\`, không \`int32\`.
> 5. **Quên base case.** Quên \`dp[0]=0\` (assignment), \`dp[1<<0][0]=0\` (TSP), hay \`dp[1<<i][i]=1\` (Hamilton) → toàn bộ bảng \`INF\`/\`0\`, đáp án sai. Luôn khởi tạo base trước vòng lặp.
> 6. **Cập nhật từ state chưa tới được.** Nếu \`dp[mask] == INF\` mà vẫn cộng tiếp → lan giá trị rác/tràn số. Luôn \`if dp[mask]==INF { continue }\`.
> 7. **Kiểm tra bit sai cú pháp.** \`mask & (1<<i) == 1\` sai (trừ \`i=0\`); phải \`(mask & (1<<i)) != 0\`. Nhớ đóng ngoặc vì \`&\` ưu tiên thấp.

---

## Bài tập

> Mỗi bài đều có lời giải chi tiết ở mục kế tiếp. Tự làm trước khi xem.

1. **TSP min cost** — cho ma trận \`dist[n][n]\`, tìm chi phí chu trình nhỏ nhất xuất phát & về 0. Trả về Big-O.
2. **Assignment problem** — \`n\` người, \`n\` việc, ma trận \`cost\`, tìm tổng chi phí gán nhỏ nhất. Big-O.
3. **Count ways to partition** — cho \`n\` phần tử và mảng \`valid[]bool\` (tập con nào là nhóm hợp lệ), đếm số cách chia hết \`n\` phần tử thành các nhóm hợp lệ. Big-O.
4. **Can partition into k equal subsets** — cho mảng \`nums\` và số \`k\`, xác định có chia được \`nums\` thành đúng \`k\` nhóm có **tổng bằng nhau** không. Big-O.
5. **Shortest superstring** — cho danh sách \`words\` (không từ nào là con của từ khác), tìm chuỗi ngắn nhất chứa mọi từ làm chuỗi con (bitmask + overlap). Big-O.
6. **Minimum incompatibility** — chia \`nums\` (độ dài \`n\`, chia hết cho \`k\`) thành \`k\` nhóm, mỗi nhóm \`n/k\` phần tử **phân biệt**, tối thiểu hóa tổng \`(max - min)\` của mỗi nhóm. Big-O.

---

## Lời giải chi tiết

### Bài 1 — TSP min cost

**Cách tiếp cận:** đúng như mục 4. \`dp[mask][i]\` = min cost thăm tập \`mask\`, đang ở \`i\`. Base \`dp[1][0]=0\`. Chuyển \`dp[mask|1<<j][j] = min(..., dp[mask][i]+dist[i][j])\`. Đáp án \`min_i dp[full][i]+dist[i][0]\`.

\`\`\`go
func tsp(dist [][]int) int {
	n := len(dist)
	full := (1 << n) - 1
	dp := make([][]int, 1<<n)
	for m := range dp {
		dp[m] = make([]int, n)
		for i := range dp[m] {
			dp[m][i] = 1 << 30
		}
	}
	dp[1][0] = 0
	for mask := 1; mask <= full; mask++ {
		for i := 0; i < n; i++ {
			if dp[mask][i] == 1<<30 || mask&(1<<i) == 0 {
				continue
			}
			for j := 0; j < n; j++ {
				if mask&(1<<j) != 0 {
					continue
				}
				next := mask | (1 << j)
				if c := dp[mask][i] + dist[i][j]; c < dp[next][j] {
					dp[next][j] = c
				}
			}
		}
	}
	ans := 1 << 30
	for i := 1; i < n; i++ {
		if v := dp[full][i] + dist[i][0]; v < ans {
			ans = v
		}
	}
	return ans
}
\`\`\`

**Độ phức tạp:** thời gian \`O(2^n · n²)\`, bộ nhớ \`O(2^n · n)\`.

### Bài 2 — Assignment problem

**Cách tiếp cận:** mục 5. \`dp[mask]\` = min cost, \`mask\` = tập việc đã giao, người tiếp \`p = popcount(mask)\`. Đáp án \`dp[(1<<n)-1]\`.

\`\`\`go
import "math/bits"

func assign(cost [][]int) int {
	n := len(cost)
	dp := make([]int, 1<<n)
	for i := range dp {
		dp[i] = 1 << 30
	}
	dp[0] = 0
	for mask := 0; mask < (1 << n); mask++ {
		if dp[mask] == 1<<30 {
			continue
		}
		p := bits.OnesCount(uint(mask))
		if p == n {
			continue
		}
		for j := 0; j < n; j++ {
			if mask&(1<<j) != 0 {
				continue
			}
			if c := dp[mask] + cost[p][j]; c < dp[mask|(1<<j)] {
				dp[mask|(1<<j)] = c
			}
		}
	}
	return dp[(1<<n)-1]
}
\`\`\`

**Độ phức tạp:** thời gian \`O(2^n · n)\`, bộ nhớ \`O(2^n)\`.

### Bài 3 — Count ways to partition

**Cách tiếp cận:** mục 8. \`dp[mask]\` = số cách phủ kín \`mask\` bằng các nhóm hợp lệ (đếm **set-of-sets**, không phân biệt thứ tự nhóm). Mẹo tránh đếm trùng hoán vị: ép "nhóm cuối luôn chứa phần tử **thấp nhất** chưa phủ" — chỉ duyệt các \`sub\` chứa bit thấp nhất \`low = mask & (-mask)\`.

\`\`\`go
func countPartitions(n int, valid []bool) int {
	full := (1 << n) - 1
	dp := make([]int, 1<<n)
	dp[0] = 1
	for mask := 1; mask <= full; mask++ {
		low := mask & (-mask) // bit thấp nhất, nhóm cuối phải chứa
		for sub := mask; sub > 0; sub = (sub - 1) & mask {
			if sub&low == 0 {
				continue
			}
			if valid[sub] {
				dp[mask] += dp[mask&^sub]
			}
		}
	}
	return dp[full]
}
\`\`\`

**Độ phức tạp:** thời gian \`O(3^n)\` (duyệt subset-of-subset, mục 7), bộ nhớ \`O(2^n)\`. Tiền xử lý \`valid\` tùy bài (thường \`O(2^n·n)\`).

**Lưu ý:** nếu bài đếm **dãy nhóm có thứ tự** (ordered) chứ không phải set-of-sets, bỏ điều kiện \`sub&low\` — khi đó mỗi hoán vị nhóm được tính riêng.

### Bài 4 — Can partition into k equal subsets

**Cách tiếp cận:** tổng \`S = sum(nums)\`. Nếu \`S % k != 0\` → không thể. Mục tiêu mỗi nhóm tổng \`target = S/k\`. Dùng \`dp[mask]\` = nếu phủ được tập \`mask\` thành các nhóm hoàn chỉnh, thì **tổng các phần tử của nhóm đang dang dở (chưa đủ target)** là bao nhiêu; \`-1\` nếu mask không đạt được. Thêm phần tử \`i\` vào nếu \`dp[mask] + nums[i] <= target\`; khi chạm \`target\` thì reset về 0 (mở nhóm mới).

\`\`\`go
func canPartitionKSubsets(nums []int, k int) bool {
	n, sum := len(nums), 0
	for _, x := range nums {
		sum += x
	}
	if sum%k != 0 {
		return false
	}
	target := sum / k
	dp := make([]int, 1<<n)
	for i := range dp {
		dp[i] = -1 // -1: mask này không tới được
	}
	dp[0] = 0 // tập rỗng: nhóm dang dở tổng 0
	for mask := 0; mask < (1 << n); mask++ {
		if dp[mask] == -1 {
			continue
		}
		for i := 0; i < n; i++ {
			if mask&(1<<i) != 0 {
				continue
			}
			if dp[mask]+nums[i] <= target {
				next := mask | (1 << i)
				// (dp[mask]+nums[i]) % target: chạm target -> 0 (mở nhóm mới)
				dp[next] = (dp[mask] + nums[i]) % target
			}
		}
	}
	return dp[(1<<n)-1] == 0 // phủ hết & nhóm cuối vừa khít
}
\`\`\`

**Vì sao đúng:** sắp các phần tử vào "nhóm hiện tại" cho tới khi đầy (\`= target\`) rồi mở nhóm mới — nhờ \`% target\` về 0. Nếu đến \`mask\` đầy đủ mà \`dp = 0\` (không dư), nghĩa là chia trọn vẹn \`k\` nhóm bằng nhau. Điều kiện \`dp[mask]+nums[i] <= target\` đảm bảo không nhóm nào vượt.

**Độ phức tạp:** thời gian \`O(2^n · n)\`, bộ nhớ \`O(2^n)\`. (\`n\` = số phần tử ≤ ~16 trong các đề chuẩn.)

### Bài 5 — Shortest superstring

**Cách tiếp cận:** kinh điển bitmask DP "kiểu TSP trên từ". Tiền xử lý \`ov[i][j]\` = độ dài overlap lớn nhất khi nối \`words[i]\` rồi \`words[j]\` (đuôi \`i\` trùng đầu \`j\`). Đặt \`dp[mask][i]\` = **độ dài lớn nhất tiết kiệm được** (tổng overlap) khi đã dùng tập từ \`mask\`, từ **cuối cùng** là \`i\`. Tối đa hóa overlap = tối thiểu hóa độ dài chuỗi (vì độ dài = \`Σ len(words) − tổng overlap\`). Truy vết để dựng chuỗi.

\`\`\`go
func overlap(a, b string) int { // overlap lớn nhất: đuôi a trùng đầu b
	max := len(a)
	if len(b) < max {
		max = len(b)
	}
	for k := max; k > 0; k-- {
		if a[len(a)-k:] == b[:k] {
			return k
		}
	}
	return 0
}

func shortestSuperstring(words []string) string {
	n := len(words)
	ov := make([][]int, n)
	for i := range ov {
		ov[i] = make([]int, n)
		for j := 0; j < n; j++ {
			if i != j {
				ov[i][j] = overlap(words[i], words[j])
			}
		}
	}
	// dp[mask][i] = tổng overlap lớn nhất, dùng tập mask, kết ở i.
	dp := make([][]int, 1<<n)
	parent := make([][]int, 1<<n)
	for m := range dp {
		dp[m] = make([]int, n)
		parent[m] = make([]int, n)
		for i := range parent[m] {
			parent[m][i] = -1
		}
	}
	for i := 0; i < n; i++ {
		dp[1<<i][i] = 0
	}
	for mask := 1; mask < (1 << n); mask++ {
		for i := 0; i < n; i++ {
			if mask&(1<<i) == 0 {
				continue
			}
			for j := 0; j < n; j++ {
				if mask&(1<<j) != 0 {
					continue
				}
				next := mask | (1 << j)
				if c := dp[mask][i] + ov[i][j]; c > dp[next][j] {
					dp[next][j] = c
					parent[next][j] = i
				}
			}
		}
	}
	// chọn endpoint tốt nhất trên full mask
	full := (1 << n) - 1
	last, best := 0, -1
	for i := 0; i < n; i++ {
		if dp[full][i] > best {
			best, last = dp[full][i], i
		}
	}
	// truy vết thứ tự từ
	order := []int{}
	mask := full
	for last != -1 {
		order = append([]int{last}, order...)
		p := parent[mask][last]
		mask ^= 1 << last
		last = p
	}
	// ghép theo overlap
	res := words[order[0]]
	for k := 1; k < len(order); k++ {
		o := overlap(words[order[k-1]], words[order[k]])
		res += words[order[k]][o:]
	}
	return res
}
\`\`\`

**Độ phức tạp:** DP \`O(2^n · n²)\`, tiền xử lý overlap \`O(n² · L)\` với \`L\` độ dài từ, bộ nhớ \`O(2^n · n)\`.

### Bài 6 — Minimum incompatibility

**Cách tiếp cận:** kết hợp bitmask DP + subset enumeration (mục 7, 8). Mỗi nhóm có đúng \`size = n/k\` phần tử **phân biệt**. Tiền xử lý: với mỗi \`sub\` có \`popcount = size\` và mọi phần tử phân biệt, tính \`cost[sub] = max − min\`. Rồi \`dp[mask]\` = min tổng incompatibility để phủ \`mask\` bằng các nhóm hợp lệ:

\`\`\`go
import (
	"math/bits"
	"sort"
)

func minimumIncompatibility(nums []int, k int) int {
	n := len(nums)
	size := n / k
	full := (1 << n) - 1
	// cost[sub]: hợp lệ (popcount==size & phân biệt) -> max-min, else -1
	cost := make([]int, 1<<n)
	for sub := 0; sub <= full; sub++ {
		cost[sub] = -1
		if bits.OnesCount(uint(sub)) != size {
			continue
		}
		vals, seen, ok := []int{}, map[int]bool{}, true
		for i := 0; i < n; i++ {
			if sub&(1<<i) != 0 {
				if seen[nums[i]] {
					ok = false
					break
				}
				seen[nums[i]] = true
				vals = append(vals, nums[i])
			}
		}
		if ok {
			sort.Ints(vals)
			cost[sub] = vals[len(vals)-1] - vals[0]
		}
	}
	const INF = 1 << 30
	dp := make([]int, 1<<n)
	for i := range dp {
		dp[i] = INF
	}
	dp[0] = 0
	for mask := 0; mask <= full; mask++ {
		if dp[mask] == INF {
			continue
		}
		// nhóm kế phải chứa phần tử thấp nhất chưa phủ (tránh trùng hoán vị nhóm)
		low := -1
		for i := 0; i < n; i++ {
			if mask&(1<<i) == 0 {
				low = i
				break
			}
		}
		if low == -1 {
			continue
		}
		rem := full ^ mask
		for sub := rem; sub > 0; sub = (sub - 1) & rem {
			if sub&(1<<low) == 0 || cost[sub] < 0 {
				continue
			}
			if c := dp[mask] + cost[sub]; c < dp[mask|sub] {
				dp[mask|sub] = c
			}
		}
	}
	if dp[full] == INF {
		return -1
	}
	return dp[full]
}
\`\`\`

**Vì sao cố định "low":** ép mỗi nhóm chứa phần tử-chưa-phủ nhỏ nhất → mỗi phân hoạch chỉ đếm một lần, không lặp hoán vị thứ tự nhóm.

**Độ phức tạp:** tiền xử lý cost \`O(2^n · n)\`; DP \`O(3^n)\` (subset enumeration). \`n ≤ 16\` trong đề chuẩn nên khả thi.

---

## Code & Minh họa

Toàn bộ code Go ở các mục trên đều **biên dịch & chạy được** (cần \`import "math/bits"\` ở những chỗ dùng \`bits.OnesCount\`). Mỗi snippet kèm \`main\` minh họa hoặc có thể gọi từ test.

Mở **[visualization.html](./visualization.html)** để thấy 3 module tương tác:

1. **Bitmask explorer** — nhập/chỉnh một mask, xem ngay bit + tập tương ứng, animate set/clear/toggle và liệt kê subset.
2. **TSP solver** — đồ thị 4–5 thành phố, animate bảng \`dp[mask][i]\` điền dần và highlight đường tối ưu.
3. **Subset enumeration** — animate trick \`(s-1) & mask\` liệt kê mọi tập con của một mask, từng bước.

---

## Bài tiếp theo

- **[Lesson 30 — DP Optimization](../lesson-30-dp-optimization/)** — sau khi đã có "vũ khí" bitmask cho \`n\` nhỏ, Lesson 30 dạy cách **tối ưu DP** cho \`n\` lớn: nén bộ nhớ (\`O(n)\` thay \`O(n²)\`), monotonic deque, prefix optimization, convex hull trick (giới thiệu).
- Ôn lại nền: [Lesson 23 — DP Fundamentals](../lesson-23-dp-fundamentals/), [Lesson 28 — DP trên cây](../lesson-28-dp-on-trees/).
- Bitmask còn quay lại ở **Tier 5 (đồ thị)** với một số bài state-compression và **Tier 7 (bit manipulation nâng cao)**.
`;
