// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: Algorithms/lesson-27-interval-dp/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 27 — Interval DP (Quy hoạch động trên khoảng)

> **Tier 4 · Lesson 27** — kỹ thuật DP cho các bài toán **trên một đoạn liên tục**, ở đó ta chia khoảng \`[i..j]\` thành hai khoảng con tại một **điểm chia k**, và thứ tự thao tác (nhân ma trận, nổ bóng, gộp đá...) **ảnh hưởng đến kết quả**.

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Hiểu **state \`dp[i][j]\`** = lời giải tối ưu cho khoảng \`[i..j]\`, và **transition** thử mọi điểm chia \`k\`.
- Nắm **khung tổng quát** của interval DP: vòng lặp theo **độ dài khoảng tăng dần**.
- Giải được các bài kinh điển: **Matrix Chain Multiplication**, **Palindrome Partitioning II**, **Burst Balloons**, **Longest Palindromic Subsequence**, **Merge Stones**, **Stone Game / Predict the Winner**.
- Hiểu mẹo nghĩ **"điểm chia cuối cùng"** (Burst Balloons) thay vì "điểm chia đầu tiên".
- Biết **vì sao phải tính theo độ dài tăng dần** (thứ tự điền bảng theo đường chéo).
- Tránh các cạm bẫy: sai thứ tự loop, quên base case, quên biên ảo, off-by-one ở \`k\`, và $O(n^3)$ không chạy nổi khi $n$ lớn.

## Kiến thức tiền đề

- **DP 1D** — bottom-up, bảng \`dp[]\`, truy hồi ([Lesson 24](../lesson-24-dp-1d/)).
- **DP 2D / lưới** — bảng \`dp[i][j]\`, thứ tự điền ([Lesson 26](../lesson-26-dp-grid-2d/)).
- **Đệ quy và quan hệ truy hồi (recurrence)** — [Lesson 03](../lesson-03-recursion-recurrence/).
- **Phân tích Big-O** — [Lesson 01](../lesson-01-bigo-asymptotic/).
- **Divide and conquer** — [Lesson 17](../lesson-17-divide-and-conquer/) (interval DP cũng "chia tại 1 điểm" nhưng có **chồng lấp** nên cần memo hóa).

> Bài tiếp theo: **DP trên cây** ([Lesson 28](../lesson-28-dp-on-trees/)) — tổng quát hóa "chia tại 1 điểm" thành "gộp con của một node".

---

## 1. Interval DP là gì

> **💡 Trực giác / Hình dung**
>
> Tưởng tượng bạn có một dải băng giấy dài ghi các con số, và phải **gấp / cắt / xử lý** nó thành từng đoạn. Mỗi lần bạn quyết định một **vết cắt** chia dải băng thành hai mảnh trái–phải, rồi xử lý từng mảnh riêng. Câu hỏi: *vết cắt đầu tiên (hoặc cuối cùng) đặt ở đâu để tổng chi phí nhỏ nhất?* Vì hai mảnh con lại tiếp tục được chia nhỏ theo cùng quy luật, ta **nhớ lại** lời giải tối ưu cho từng đoạn để không tính lại — đó chính là interval DP.

**Interval DP** (quy hoạch động trên khoảng) là họ bài toán mà:

- **State**: \`dp[i][j]\` = lời giải tối ưu (min hoặc max chi phí, số cách, độ dài...) cho **khoảng con liên tục** \`[i..j]\` của mảng/chuỗi gốc.
- **Transition**: để giải \`[i..j]\`, ta thử **mọi điểm chia \`k\`** với \`i ≤ k < j\` (hoặc \`i < k < j\` tùy bài), tách thành hai khoảng con \`[i..k]\` và \`[k+1..j]\` (đã giải xong vì chúng **ngắn hơn**), rồi cộng thêm **chi phí ghép** \`cost(i, k, j)\`:
  \`\`\`
  dp[i][j] = opt over k của ( dp[i][k] + dp[k+1][j] + cost(i, k, j) )
  \`\`\`
  trong đó \`opt\` là \`min\` hoặc \`max\`.
- **Base case**: khoảng có độ dài 1 (\`dp[i][i]\`) thường = 0 hoặc = giá trị phần tử đơn.
- **Thứ tự tính**: theo **độ dài khoảng tăng dần** (\`len = 1, 2, 3, ..., n\`), vì \`dp[i][j]\` phụ thuộc các khoảng **ngắn hơn** bên trong.

> **💡 Phân biệt với DP lưới (Lesson 26)**
>
> DP lưới: \`dp[i][j]\` phụ thuộc các ô **kề cạnh** (\`dp[i-1][j]\`, \`dp[i][j-1]\`) → điền theo hàng/cột. Interval DP: \`dp[i][j]\` phụ thuộc các khoảng **con bên trong** (\`dp[i][k]\`, \`dp[k+1][j]\`) → điền theo **đường chéo** (độ dài tăng dần). Đây là khác biệt cốt lõi về **thứ tự điền bảng**.

### 1.1 Bốn ví dụ state cụ thể

Để thấy "state = khoảng" áp dụng đa dạng thế nào:

1. **Matrix Chain**: \`dp[i][j]\` = số phép nhân scalar tối thiểu để nhân chuỗi ma trận \`A_i · A_{i+1} · ... · A_j\`.
2. **Burst Balloons**: \`dp[i][j]\` = điểm tối đa thu được khi nổ **hết** các bóng trong khoảng mở \`(i, j)\`.
3. **Palindrome Partition II**: \`dp[j]\` (biến thể 1 chiều) = số cắt tối thiểu để \`s[0..j]\` thành các palindrome — nhưng dùng bảng phụ \`isPal[i][j]\` chính là interval DP.
4. **Longest Palindromic Subsequence**: \`dp[i][j]\` = độ dài dãy con palindrome dài nhất trong \`s[i..j]\`.

> **❓ Câu hỏi tự nhiên của người đọc**
>
> - *"Vì sao state lại là một KHOẢNG mà không phải một chỉ số như DP 1D?"* — Vì lời giải của bài không phân rã được theo "phần tử cuối" như DP 1D, mà phân rã theo "vết cắt ở giữa". Một khi cắt, hai nửa độc lập → state phải mô tả đủ một nửa, tức là một đoạn \`[i..j]\`.
> - *"Có phải lúc nào cũng $O(n^3)$ không?"* — Thường có, vì $O(n^2)$ state nhân $O(n)$ điểm chia. Một số bài (Knuth optimization, Stone Game cùng số đống) giảm được, nhưng đó là nâng cao.

> **🔁 Dừng lại tự kiểm tra**
>
> 1. State \`dp[i][j]\` của interval DP mô tả cái gì?
> 2. Transition tách \`[i..j]\` thành mấy phần, tại đâu?
>
> <details><summary>Đáp án</summary>
>
> 1. Lời giải tối ưu cho **khoảng con liên tục** \`[i..j]\`.
> 2. Tách thành **hai** khoảng con \`[i..k]\` và \`[k+1..j]\` tại điểm chia \`k\`, rồi cộng chi phí ghép.
> </details>

---

## 2. Khung tổng quát

Mọi interval DP đều dùng chung một bộ khung 3 vòng lặp:

\`\`\`go
// Khung tổng quát của interval DP (giả mã Go)
n := len(a)
dp := make([][]int, n)
for i := range dp {
    dp[i] = make([]int, n)
}

// Base case: khoảng độ dài 1
for i := 0; i < n; i++ {
    dp[i][i] = baseValue(i) // 0, hoặc a[i], tùy bài
}

// QUAN TRỌNG: vòng ngoài cùng là ĐỘ DÀI khoảng, tăng dần
for length := 2; length <= n; length++ {
    for i := 0; i+length-1 < n; i++ {
        j := i + length - 1 // điểm cuối khoảng
        dp[i][j] = INF      // hoặc -INF nếu là max
        for k := i; k < j; k++ {
            cost := dp[i][k] + dp[k+1][j] + combineCost(i, k, j)
            if cost < dp[i][j] { // hoặc > nếu max
                dp[i][j] = cost
            }
        }
    }
}
// Kết quả thường ở dp[0][n-1]
\`\`\`

> **⚠ Lỗi thường gặp**
>
> Đặt vòng \`i\` hoặc \`j\` ở **ngoài cùng** thay vì \`length\`. Hậu quả: khi tính \`dp[i][j]\`, các khoảng con \`dp[i][k]\` / \`dp[k+1][j]\` **chưa được tính** → đọc rác → sai. **Quy tắc vàng**: vòng ngoài cùng PHẢI là độ dài khoảng (hoặc tương đương: \`i\` chạy **giảm dần** từ \`n-1\` về 0, \`j\` chạy **tăng dần** từ \`i\`).

### 2.1 Vì sao công thức cộng đúng

Khi tách \`[i..j]\` tại \`k\`, ta giả định: chi phí giải toàn khoảng = chi phí giải \`[i..k]\` + chi phí giải \`[k+1..j]\` + chi phí ghép hai nửa. Điều này đúng khi bài toán có **tính chất con tối ưu** (optimal substructure): lời giải tối ưu của khoảng lớn chứa lời giải tối ưu của các khoảng con. Thử **mọi** \`k\` rồi lấy \`opt\` đảm bảo ta không bỏ sót cách tách tốt nhất.

> **📝 Tóm tắt mục 2**
>
> - Ba vòng lặp: \`length\` (ngoài) → \`i\` (giữa) → \`k\` điểm chia (trong); \`j = i + length - 1\`.
> - Vòng ngoài là **độ dài** để khoảng con luôn được tính trước.
> - \`dp[i][j] = opt_k ( dp[i][k] + dp[k+1][j] + cost )\`.

---

## 3. Matrix Chain Multiplication (nhân chuỗi ma trận)

> **💡 Trực giác / Hình dung**
>
> Nhân ma trận có tính **kết hợp** (\`(AB)C = A(BC)\`) nên kết quả như nhau, NHƯNG **số phép nhân scalar** lại khác nhau rất nhiều. Giống như khi pha một ly cocktail nhiều tầng: thứ tự đổ không đổi vị, nhưng đổ sai thứ tự thì tốn nhiều bước khuấy hơn. Ta muốn tìm thứ tự đặt ngoặc rẻ nhất.

Nhân ma trận \`A (p × q)\` với \`B (q × r)\` tốn \`p · q · r\` phép nhân scalar và cho ma trận \`(p × r)\`.

Cho chuỗi \`A_1 · A_2 · ... · A_n\` với kích thước cho bởi mảng \`dims[0..n]\` (ma trận \`A_i\` có kích thước \`dims[i-1] × dims[i]\`). Tìm cách đặt ngoặc tối thiểu hóa tổng phép nhân.

**State**: \`dp[i][j]\` = chi phí tối thiểu để nhân \`A_i · ... · A_j\`.

**Transition**: chọn điểm chia \`k\` (ma trận cuối của nửa trái là \`A_k\`):
\`\`\`
dp[i][j] = min over k in [i, j-1] của (
    dp[i][k] + dp[k+1][j] + dims[i-1] * dims[k] * dims[j]
)
\`\`\`
Giải thích \`cost\`: nửa trái cho ma trận \`(dims[i-1] × dims[k])\`, nửa phải cho \`(dims[k] × dims[j])\`, nhân hai cái tốn \`dims[i-1] * dims[k] * dims[j]\`.

### 3.1 Walk-through \`dims = [40, 20, 30, 10, 30]\`

Tức 4 ma trận: \`A1 (40×20)\`, \`A2 (20×30)\`, \`A3 (30×10)\`, \`A4 (10×30)\`. Đánh số ma trận từ 1 đến 4.

**Độ dài 1** (1 ma trận, không nhân): \`dp[1][1]=dp[2][2]=dp[3][3]=dp[4][4]=0\`.

**Độ dài 2:**

- \`dp[1][2]\` = nhân \`A1·A2\` = \`dims[0]·dims[1]·dims[2]\` = \`40·20·30\` = **24000**.
- \`dp[2][3]\` = \`A2·A3\` = \`20·30·10\` = **6000**.
- \`dp[3][4]\` = \`A3·A4\` = \`30·10·30\` = **9000**.

**Độ dài 3:**

- \`dp[1][3]\` (nhân \`A1·A2·A3\`), thử \`k\`:
  - \`k=1\`: \`dp[1][1] + dp[2][3] + dims[0]·dims[1]·dims[3]\` = \`0 + 6000 + 40·20·10\` = \`6000 + 8000\` = **14000**.
  - \`k=2\`: \`dp[1][2] + dp[3][3] + dims[0]·dims[2]·dims[3]\` = \`24000 + 0 + 40·30·10\` = \`24000 + 12000\` = **36000**.
  - → \`dp[1][3] = min(14000, 36000) = 14000\` (cắt tại \`k=1\`, tức \`A1·(A2·A3)\`).
- \`dp[2][4]\` (nhân \`A2·A3·A4\`), thử \`k\`:
  - \`k=2\`: \`dp[2][2] + dp[3][4] + dims[1]·dims[2]·dims[4]\` = \`0 + 9000 + 20·30·30\` = \`9000 + 18000\` = **27000**.
  - \`k=3\`: \`dp[2][3] + dp[4][4] + dims[1]·dims[3]·dims[4]\` = \`6000 + 0 + 20·10·30\` = \`6000 + 6000\` = **12000**.
  - → \`dp[2][4] = min(27000, 12000) = 12000\` (cắt tại \`k=3\`, tức \`(A2·A3)·A4\`).

**Độ dài 4** — \`dp[1][4]\` (toàn chuỗi), thử \`k\`:

- \`k=1\`: \`dp[1][1] + dp[2][4] + dims[0]·dims[1]·dims[4]\` = \`0 + 12000 + 40·20·30\` = \`12000 + 24000\` = **36000**.
- \`k=2\`: \`dp[1][2] + dp[3][4] + dims[0]·dims[2]·dims[4]\` = \`24000 + 9000 + 40·30·30\` = \`33000 + 36000\` = **69000**.
- \`k=3\`: \`dp[1][3] + dp[4][4] + dims[0]·dims[3]·dims[4]\` = \`14000 + 0 + 40·10·30\` = \`14000 + 12000\` = **26000**.
- → \`dp[1][4] = min(36000, 69000, 26000) = \` **26000**, cắt tại \`k=3\`.

**Truy vết ngoặc**: \`dp[1][4]\` cắt tại \`k=3\` → \`(A1·A2·A3)·A4\`; trong đó \`dp[1][3]\` cắt tại \`k=1\` → \`A1·(A2·A3)\`. Ngoặc tối ưu: **\`(A1·(A2·A3))·A4\`** với **26000** phép nhân.

So với cách ngây thơ trái-sang-phải \`((A1·A2)·A3)·A4\`: \`24000 + 40·30·10 + 40·10·30 = 24000 + 12000 + 12000 = 48000\`. Tối ưu tiết kiệm gần **một nửa**.

### 3.2 Code Go — Matrix Chain + truy vết ngoặc

\`\`\`go
package main

import (
	"fmt"
	"strconv"
)

// matrixChain trả về chi phí tối thiểu và bảng split để truy vết ngoặc.
// dims có n+1 phần tử cho n ma trận: A_i có kích thước dims[i-1] x dims[i].
func matrixChain(dims []int) (int, [][]int) {
	n := len(dims) - 1 // số ma trận, đánh số 1..n
	const INF = 1 << 60
	// dp và split dùng chỉ số 1..n cho gọn (kích thước n+1).
	dp := make([][]int, n+1)
	split := make([][]int, n+1)
	for i := range dp {
		dp[i] = make([]int, n+1)
		split[i] = make([]int, n+1)
	}
	// Base: dp[i][i] = 0 (1 ma trận không cần nhân) — đã là 0 mặc định.

	// length = số ma trận trong khoảng, tăng dần từ 2.
	for length := 2; length <= n; length++ {
		for i := 1; i+length-1 <= n; i++ {
			j := i + length - 1
			dp[i][j] = INF
			for k := i; k < j; k++ {
				// nửa trái (dims[i-1] x dims[k]) nhân nửa phải (dims[k] x dims[j])
				cost := dp[i][k] + dp[k+1][j] + dims[i-1]*dims[k]*dims[j]
				if cost < dp[i][j] {
					dp[i][j] = cost
					split[i][j] = k // nhớ điểm chia tối ưu để truy vết
				}
			}
		}
	}
	return dp[1][n], split
}

// buildParens dựng chuỗi ngoặc tối ưu từ bảng split.
func buildParens(split [][]int, i, j int) string {
	if i == j {
		return "A" + strconv.Itoa(i)
	}
	k := split[i][j]
	return "(" + buildParens(split, i, k) + "·" + buildParens(split, k+1, j) + ")"
}

func main() {
	dims := []int{40, 20, 30, 10, 30}
	cost, split := matrixChain(dims)
	fmt.Println("Chi phí tối thiểu:", cost)                 // 26000
	fmt.Println("Ngoặc tối ưu:", buildParens(split, 1, 4)) // ((A1·(A2·A3))·A4)
}
\`\`\`

> **🔁 Dừng lại tự kiểm tra**
>
> Với \`dims = [10, 20, 30]\` (2 ma trận \`A1(10×20)\`, \`A2(20×30)\`), chi phí là bao nhiêu?
>
> <details><summary>Đáp án</summary>
>
> Chỉ một cách: \`A1·A2\` = \`10·20·30 = 6000\`. Không có lựa chọn ngoặc nào khác.
> </details>

> **📝 Tóm tắt mục 3**
>
> - \`dp[i][j] = min_k ( dp[i][k] + dp[k+1][j] + dims[i-1]·dims[k]·dims[j] )\`.
> - Lưu \`split[i][j]\` để **truy vết** ngoặc tối ưu.
> - Walk-through \`[40,20,30,10,30]\` → **26000**, ngoặc \`((A1·(A2·A3))·A4)\`.

---

## 4. Palindrome Partitioning II (số cắt tối thiểu)

> **💡 Trực giác / Hình dung**
>
> Bạn có một chuỗi và muốn **cắt** nó thành các mảnh, mỗi mảnh là một palindrome (xâu đối xứng như \`"aba"\`, \`"cc"\`). Mỗi vết cắt tốn 1 đơn vị. Tìm số vết cắt **ít nhất**. Giống như cắt một thanh kẹo thành các viên đối xứng, dùng dao càng ít càng tốt.

Phần "kiểm tra palindrome" dùng một bảng interval DP, còn phần "đếm cắt" dùng DP 1D.

**Bước 1 — precompute \`isPal[i][j]\`** (đây là interval DP): \`s[i..j]\` là palindrome khi \`s[i] == s[j]\` VÀ phần trong \`s[i+1..j-1]\` cũng là palindrome:
\`\`\`
isPal[i][j] = (s[i] == s[j]) && (j - i < 2 || isPal[i+1][j-1])
\`\`\`
\`j - i < 2\` xử lý khoảng độ dài 1 và 2 (luôn palindrome nếu hai đầu bằng nhau).

**Bước 2 — \`cut[j]\`** = số cắt tối thiểu cho \`s[0..j]\`:
\`\`\`
cut[j] = 0                      nếu s[0..j] đã là palindrome
cut[j] = min over i in [1, j] của ( cut[i-1] + 1 )   với s[i..j] là palindrome
\`\`\`

### 4.1 Walk-through \`s = "aab"\`

\`isPal\`: \`aa\` (0..1) palindrome ✓; \`a\`, \`b\` đơn lẻ ✓; \`aab\` (0..2) → \`s[0]='a' != s[2]='b'\` ✗; \`ab\` (1..2) → ✗.

- \`cut[0]\` (\`"a"\`): palindrome → **0**.
- \`cut[1]\` (\`"aa"\`): palindrome → **0**.
- \`cut[2]\` (\`"aab"\`): không palindrome. Thử \`i\`:
  - \`i=1\`: \`s[1..2]="ab"\` không palindrome → bỏ.
  - \`i=2\`: \`s[2..2]="b"\` palindrome → \`cut[1] + 1 = 0 + 1 = 1\`.
  - → \`cut[2] = 1\`. Cắt thành \`"aa" | "b"\`.

Kết quả: **1 cắt**.

### 4.2 Code Go — Palindrome Partition II

\`\`\`go
package main

import "fmt"

func minCut(s string) int {
	n := len(s)
	if n == 0 {
		return 0
	}
	// isPal[i][j]: s[i..j] có là palindrome không (interval DP).
	isPal := make([][]bool, n)
	for i := range isPal {
		isPal[i] = make([]bool, n)
	}
	// Điền theo độ dài tăng dần để isPal[i+1][j-1] đã sẵn.
	for length := 1; length <= n; length++ {
		for i := 0; i+length-1 < n; i++ {
			j := i + length - 1
			if s[i] == s[j] && (j-i < 2 || isPal[i+1][j-1]) {
				isPal[i][j] = true
			}
		}
	}
	// cut[j]: số cắt tối thiểu cho s[0..j].
	cut := make([]int, n)
	for j := 0; j < n; j++ {
		if isPal[0][j] {
			cut[j] = 0 // cả tiền tố đã là palindrome
			continue
		}
		cut[j] = j // tệ nhất: cắt mỗi ký tự (j cắt)
		for i := 1; i <= j; i++ {
			if isPal[i][j] && cut[i-1]+1 < cut[j] {
				cut[j] = cut[i-1] + 1
			}
		}
	}
	return cut[n-1]
}

func main() {
	fmt.Println(minCut("aab"))   // 1  -> "aa" | "b"
	fmt.Println(minCut("a"))     // 0
	fmt.Println(minCut("ab"))    // 1
	fmt.Println(minCut("abccb")) // 1  -> "a" | "bccb"
}
\`\`\`

> **⚠ Lỗi thường gặp**
>
> Điền \`isPal\` theo thứ tự \`i\` tăng dần thông thường (không theo độ dài) → khi tính \`isPal[i][j]\` thì \`isPal[i+1][j-1]\` chưa sẵn → sai. Phải điền theo **độ dài tăng dần** (hoặc \`i\` giảm dần).

> **📝 Tóm tắt mục 4**
>
> - \`isPal[i][j]\` là interval DP: phụ thuộc khoảng con \`[i+1..j-1]\` ngắn hơn.
> - \`cut[j] = min_i ( cut[i-1] + 1 )\` với \`s[i..j]\` palindrome.
> - Walk-through \`"aab"\` → 1 cắt.

---

## 5. Burst Balloons (nổ bóng)

> **💡 Trực giác / Hình dung**
>
> Một hàng bóng, mỗi bóng ghi một số. Nổ bóng \`i\` thu được \`nums[left]·nums[i]·nums[right]\` điểm (left/right là bóng còn lại liền kề). Sau khi nổ, hai hàng xóm dính lại. Thứ tự nổ ảnh hưởng tổng điểm. Tìm thứ tự cho điểm **tối đa**.

**Mẹo cốt lõi — nghĩ "bóng nổ CUỐI CÙNG":** Nếu nghĩ "nổ bóng nào TRƯỚC", thì sau khi nổ, hai khoảng con dính lại và biên thay đổi → khó tách độc lập. Nhưng nếu nghĩ "trong khoảng \`(i, j)\`, bóng \`k\` là bóng **nổ cuối cùng**", thì lúc nổ \`k\`, mọi bóng khác trong \`(i, j)\` đã nổ hết, hai hàng xóm còn lại của \`k\` chính là \`i\` và \`j\` (biên cố định!). Điểm thu khi nổ \`k\` cuối = \`nums[i]·nums[k]·nums[j]\`. Hai khoảng \`(i, k)\` và \`(k, j)\` được giải **độc lập** vì \`i\`, \`j\` luôn còn nguyên.

**Biên ảo**: thêm bóng \`1\` vào hai đầu mảng để không phải xử lý biên đặc biệt: \`nums' = [1] + nums + [1]\`.

**State**: \`dp[i][j]\` = điểm tối đa nổ hết các bóng trong khoảng **mở** \`(i, j)\` (không nổ \`i\`, \`j\`).

**Transition**:
\`\`\`
dp[i][j] = max over k in (i, j) của (
    dp[i][k] + dp[k][j] + nums[i]*nums[k]*nums[j]
)
\`\`\`
Lưu ý \`dp[k][j]\` chứ không phải \`dp[k+1][j]\` vì đây là khoảng **mở** — \`k\` là biên chung.

### 5.1 Walk-through \`nums = [3, 1, 5, 8]\`

Thêm biên ảo: \`nums' = [1, 3, 1, 5, 8, 1]\`, chỉ số 0..5. Cần \`dp[0][5]\`.

Các khoảng mở độ dài nhỏ (chỉ 1 bóng bên trong) — \`dp[i][i+2]\`:

- \`dp[0][2]\` (bóng 1 = \`nums'[1]=3\`): \`nums'[0]·nums'[1]·nums'[2]\` = \`1·3·1\` = **3**.
- \`dp[1][3]\` (bóng = \`nums'[2]=1\`): \`3·1·5\` = **15**.
- \`dp[2][4]\` (bóng = \`nums'[3]=5\`): \`1·5·8\` = **40**.
- \`dp[3][5]\` (bóng = \`nums'[4]=8\`): \`5·8·1\` = **40**.

Khoảng có 2 bóng bên trong — \`dp[i][i+3]\`:

- \`dp[0][3]\` (bóng \`nums'[1..2]\`), thử \`k ∈ {1,2}\`:
  - \`k=1\` (nổ \`nums'[1]=3\` cuối): \`dp[0][1] + dp[1][3] + nums'[0]·nums'[1]·nums'[3]\` = \`0 + 15 + 1·3·5\` = \`15 + 15\` = **30**.
  - \`k=2\` (nổ \`nums'[2]=1\` cuối): \`dp[0][2] + dp[2][3] + 1·1·5\` = \`3 + 0 + 5\` = **8**.
  - → \`dp[0][3] = 30\`.
- \`dp[1][4]\` (bóng \`nums'[2..3]\`), thử \`k ∈ {2,3}\`:
  - \`k=2\`: \`dp[1][2] + dp[2][4] + nums'[1]·nums'[2]·nums'[4]\` = \`0 + 40 + 3·1·8\` = \`40 + 24\` = **64**.
  - \`k=3\`: \`dp[1][3] + dp[3][4] + 3·5·8\` = \`15 + 0 + 120\` = **135**.
  - → \`dp[1][4] = 135\`.
- \`dp[2][5]\` (bóng \`nums'[3..4]\`), thử \`k ∈ {3,4}\`:
  - \`k=3\`: \`dp[2][3] + dp[3][5] + nums'[2]·nums'[3]·nums'[5]\` = \`0 + 40 + 1·5·1\` = \`40 + 5\` = **45**.
  - \`k=4\`: \`dp[2][4] + dp[4][5] + 1·8·1\` = \`40 + 0 + 8\` = **48**.
  - → \`dp[2][5] = 48\`.

Khoảng 3 bóng bên trong — \`dp[0][4]\`, \`dp[1][5]\`:

- \`dp[0][4]\` (bóng \`nums'[1..3]\`), thử \`k ∈ {1,2,3}\`:
  - \`k=1\`: \`dp[0][1] + dp[1][4] + nums'[0]·nums'[1]·nums'[4]\` = \`0 + 135 + 1·3·8\` = \`135 + 24\` = **159**.
  - \`k=2\`: \`dp[0][2] + dp[2][4] + 1·1·8\` = \`3 + 40 + 8\` = **51**.
  - \`k=3\`: \`dp[0][3] + dp[3][4] + 1·5·8\` = \`30 + 0 + 40\` = **70**.
  - → \`dp[0][4] = 159\`.
- \`dp[1][5]\` (bóng \`nums'[2..4]\`), thử \`k ∈ {2,3,4}\`:
  - \`k=2\`: \`dp[1][2] + dp[2][5] + nums'[1]·nums'[2]·nums'[5]\` = \`0 + 48 + 3·1·1\` = \`48 + 3\` = **51**.
  - \`k=3\`: \`dp[1][3] + dp[3][5] + 3·5·1\` = \`15 + 40 + 15\` = **70**.
  - \`k=4\`: \`dp[1][4] + dp[4][5] + 3·8·1\` = \`135 + 0 + 24\` = **159**.
  - → \`dp[1][5] = 159\`.

Khoảng toàn bộ — \`dp[0][5]\` (bóng \`nums'[1..4]\`), thử \`k ∈ {1,2,3,4}\`:

- \`k=1\`: \`dp[0][1] + dp[1][5] + nums'[0]·nums'[1]·nums'[5]\` = \`0 + 159 + 1·3·1\` = \`159 + 3\` = **162**.
- \`k=2\`: \`dp[0][2] + dp[2][5] + 1·1·1\` = \`3 + 48 + 1\` = **52**.
- \`k=3\`: \`dp[0][3] + dp[3][5] + 1·5·1\` = \`30 + 40 + 5\` = **75**.
- \`k=4\`: \`dp[0][4] + dp[4][5] + 1·8·1\` = \`159 + 0 + 8\` = **167**.
- → **\`dp[0][5] = 167\`**.

Đáp án: **167** điểm. (Thứ tự nổ tối ưu một trong các cách: nổ \`3\` rồi \`1\` rồi \`5\` rồi \`8\`, kiểm tra: nổ \`1\`(giữa) → \`3·1·5=15\`; nổ \`3\` → \`1·3·5=15\`; nổ \`5\` → \`1·5·8=40\`; nổ \`8\` → \`1·8·1=8\`... cách khác cho cao hơn — DP đã tìm tối ưu 167.)

### 5.2 Code Go — Burst Balloons

\`\`\`go
package main

import "fmt"

func maxCoins(nums []int) int {
	n := len(nums)
	// Thêm biên ảo 1 ở hai đầu: a có n+2 phần tử.
	a := make([]int, n+2)
	a[0], a[n+1] = 1, 1
	for i := 0; i < n; i++ {
		a[i+1] = nums[i]
	}
	m := n + 2
	dp := make([][]int, m)
	for i := range dp {
		dp[i] = make([]int, m)
	}
	// length = khoảng cách giữa hai biên mở; cần ít nhất 1 bóng bên trong → length >= 2.
	for length := 2; length < m; length++ {
		for i := 0; i+length < m; i++ {
			j := i + length // biên phải (mở)
			for k := i + 1; k < j; k++ {
				// k là bóng nổ CUỐI trong khoảng mở (i, j) → hàng xóm là i và j.
				coins := dp[i][k] + dp[k][j] + a[i]*a[k]*a[j]
				if coins > dp[i][j] {
					dp[i][j] = coins
				}
			}
		}
	}
	return dp[0][m-1]
}

func main() {
	fmt.Println(maxCoins([]int{3, 1, 5, 8})) // 167
	fmt.Println(maxCoins([]int{1, 5}))       // 10
}
\`\`\`

> **❓ Câu hỏi tự nhiên của người đọc**
>
> - *"Vì sao nghĩ 'nổ cuối' lại tách được khoảng độc lập?"* — Vì khi \`k\` nổ cuối, hai hàng xóm của nó **chắc chắn** là hai biên \`i\`, \`j\` (mọi bóng khác trong khoảng đã nổ). Biên cố định → hai nửa \`(i,k)\` và \`(k,j)\` không "rò rỉ" ảnh hưởng sang nhau.
> - *"Nếu nghĩ 'nổ đầu tiên' thì sao?"* — Khi bóng \`k\` nổ đầu, hai khoảng con \`(i,k)\` và \`(k,j)\` sau đó **dính lại**, hàng xóm thay đổi động → state không độc lập → DP sai. Đây là lý do "nghĩ ngược" (cái cuối) là **mẹo bắt buộc**.

> **📝 Tóm tắt mục 5**
>
> - Thêm **biên ảo** \`1\` hai đầu để bỏ xử lý biên.
> - \`dp[i][j] = max_k ( dp[i][k] + dp[k][j] + a[i]·a[k]·a[j] )\`, \`k\` là bóng **nổ cuối**.
> - Walk-through \`[3,1,5,8]\` → **167**.

---

## 6. Longest Palindromic Subsequence / Substring

### 6.1 Longest Palindromic Subsequence (LPS — dãy con palindrome dài nhất)

Dãy con (subsequence) không cần liên tục. \`dp[i][j]\` = độ dài LPS trong \`s[i..j]\`.

\`\`\`
dp[i][i] = 1
nếu s[i] == s[j]: dp[i][j] = dp[i+1][j-1] + 2
ngược lại:        dp[i][j] = max(dp[i+1][j], dp[i][j-1])
\`\`\`

**Walk-through \`s = "bbbab"\`** (kết quả mong đợi 4 = \`"bbbb"\`):

- Độ dài 1: tất cả \`dp[i][i] = 1\`.
- Độ dài 2: \`dp[0][1]\`(\`bb\`)→\`s[0]==s[1]\`→\`0+2=2\`; \`dp[1][2]\`(\`bb\`)→2; \`dp[2][3]\`(\`ba\`)→\`s≠\`→\`max(1,1)=1\`; \`dp[3][4]\`(\`ab\`)→1.
- Độ dài 3: \`dp[0][2]\`(\`bbb\`)→\`s[0]==s[2]\`→\`dp[1][1]+2=3\`; \`dp[1][3]\`(\`bba\`)→\`s[1]≠s[3]\`→\`max(dp[2][3],dp[1][2])=max(1,2)=2\`; \`dp[2][4]\`(\`bab\`)→\`s[2]==s[4]\`→\`dp[3][3]+2=3\`.
- Độ dài 4: \`dp[0][3]\`(\`bbba\`)→\`s[0]≠s[3]\`→\`max(dp[1][3],dp[0][2])=max(2,3)=3\`; \`dp[1][4]\`(\`bbab\`)→\`s[1]==s[4]\`→\`dp[2][3]+2=1+2=3\`.
- Độ dài 5: \`dp[0][4]\`(\`bbbab\`)→\`s[0]==s[4]\`(\`b==b\`)→\`dp[1][3]+2=2+2=\`**4** ✓.

### 6.2 Code Go — Longest Palindromic Subsequence

\`\`\`go
package main

import "fmt"

func longestPalindromeSubseq(s string) int {
	n := len(s)
	if n == 0 {
		return 0
	}
	dp := make([][]int, n)
	for i := range dp {
		dp[i] = make([]int, n)
		dp[i][i] = 1 // base: 1 ký tự là palindrome độ dài 1
	}
	for length := 2; length <= n; length++ {
		for i := 0; i+length-1 < n; i++ {
			j := i + length - 1
			if s[i] == s[j] {
				dp[i][j] = dp[i+1][j-1] + 2 // length==2 thì dp[i+1][j-1]=0 → 2, đúng
			} else {
				dp[i][j] = max(dp[i+1][j], dp[i][j-1])
			}
		}
	}
	return dp[0][n-1]
}

func max(a, b int) int {
	if a > b {
		return a
	}
	return b
}

func main() {
	fmt.Println(longestPalindromeSubseq("bbbab")) // 4
	fmt.Println(longestPalindromeSubseq("cbbd"))  // 2
}
\`\`\`

> **⚠ Lỗi thường gặp**
>
> Nhầm **subsequence** (không liên tục) với **substring** (liên tục). LPS dùng \`dp[i+1][j-1]+2\` khi hai đầu bằng. Longest palindromic **substring** cần dùng \`isPal[i][j]\` (mục 4) rồi lấy khoảng palindrome dài nhất — khác công thức.

> **📝 Tóm tắt mục 6**
>
> - LPS: \`s[i]==s[j]\` → \`dp[i+1][j-1]+2\`, ngược lại \`max(dp[i+1][j], dp[i][j-1])\`.
> - Substring palindrome dài nhất: dùng bảng \`isPal[i][j]\` interval DP rồi tìm khoảng dài nhất.

---

## 7. Merge Stones / Stone Game

### 7.1 Min cost to merge stones (gộp đá)

Cho mảng \`stones\`, mỗi lần gộp **2 đống liền kề** thành 1 đống, chi phí = tổng số đá hai đống. Gộp đến khi còn 1 đống; tìm tổng chi phí tối thiểu. (Phiên bản gộp \`k\` đống tổng quát hơn — ở đây xét \`k=2\` để giữ interval DP cổ điển.)

**State**: \`dp[i][j]\` = chi phí tối thiểu gộp \`stones[i..j]\` thành 1 đống.

**Transition** (dùng prefix sum \`pre\` để tính tổng khoảng nhanh):
\`\`\`
dp[i][j] = min over k in [i, j-1] của (
    dp[i][k] + dp[k+1][j] + (sum của stones[i..j])
)
\`\`\`
Chi phí ghép = tổng cả khoảng \`[i..j]\` vì khi gộp hai nửa cuối cùng, ta cộng toàn bộ đá.

### 7.2 Predict the Winner / Stone Game (trò chơi lấy đá hai đầu)

Hai người chơi luân phiên lấy 1 phần tử ở **đầu hoặc cuối** mảng. Mỗi người tối đa hóa điểm mình. Hỏi người đi trước có thắng (điểm ≥ đối thủ) không.

**State**: \`dp[i][j]\` = **chênh lệch điểm tối đa** (điểm người hiện tại trừ đối thủ) khi chơi trên khoảng \`s[i..j]\`.

**Transition** (người hiện tại lấy đầu hoặc cuối, phần còn lại đối thủ chơi nên trừ đi):
\`\`\`
dp[i][j] = max(
    nums[i] - dp[i+1][j],   // lấy đầu
    nums[j] - dp[i][j-1]    // lấy cuối
)
\`\`\`
Người đi trước thắng/hòa khi \`dp[0][n-1] >= 0\`.

**Walk-through \`nums = [1, 5, 2]\`**:

- \`dp[0][0]=1\`, \`dp[1][1]=5\`, \`dp[2][2]=2\`.
- \`dp[0][1]\`(\`[1,5]\`): \`max(1 - dp[1][1], 5 - dp[0][0]) = max(1-5, 5-1) = max(-4, 4) = 4\`.
- \`dp[1][2]\`(\`[5,2]\`): \`max(5 - dp[2][2], 2 - dp[1][1]) = max(5-2, 2-5) = max(3, -3) = 3\`.
- \`dp[0][2]\`(\`[1,5,2]\`): \`max(1 - dp[1][2], 2 - dp[0][1]) = max(1-3, 2-4) = max(-2, -2) = -2\`.
- \`dp[0][2] = -2 < 0\` → **người đi trước THUA** (vd \`[1,5,2]\`: đi trước lấy \`2\` → đối thủ lấy \`5\` → đi trước lấy \`1\`: \`3\` vs \`5\` → thua).

> **📝 Tóm tắt mục 7**
>
> - Merge stones: \`dp[i][j] = min_k ( dp[i][k] + dp[k+1][j] ) + sum[i..j]\`.
> - Stone game: \`dp[i][j] = max( nums[i]-dp[i+1][j], nums[j]-dp[i][j-1] )\`; thắng/hòa khi \`dp[0][n-1] >= 0\`.

---

## 8. Vì sao tính theo độ dài tăng dần

\`dp[i][j]\` luôn phụ thuộc vào các khoảng **ngắn hơn** nằm bên trong: \`dp[i][k]\`, \`dp[k+1][j]\` (đều có độ dài \`< j-i+1\`), hoặc \`dp[i+1][j-1]\` (ngắn hơn 2). Nếu ta điền bảng theo **độ dài tăng dần**, thì khi tính một khoảng độ dài \`L\`, mọi khoảng độ dài \`< L\` đã có sẵn → không bao giờ đọc ô chưa tính.

> **💡 Hình dung bảng tam giác**
>
> Bảng \`dp[i][j]\` chỉ dùng nửa trên-phải (vì \`i ≤ j\`). Đường chéo chính \`dp[i][i]\` là base case (độ dài 1). Mỗi vòng lặp \`length\` điền **một đường chéo song song** dịch dần lên phía trên-phải. Ô góc trên-phải \`dp[0][n-1]\` (toàn khoảng) được điền **cuối cùng**.
>
> \`\`\`
>      j=0  j=1  j=2  j=3
> i=0   1    2    3   [4]   <- dp[0][3] điền cuối
> i=1        1    2    3
> i=2             1    2
> i=3                  1
> \`\`\`
> (Số = thứ tự độ dài; ô \`[4]\` là kết quả cuối.)

**Tương đương**: vòng \`i\` chạy **giảm dần** (\`for i := n-1; i >= 0; i--\`) và \`j\` chạy **tăng dần** từ \`i\`. Khi đó \`dp[i+1][...]\` (i lớn hơn) và \`dp[...][j-1]\` (j nhỏ hơn) đều đã tính. Nhiều lời giải LPS/stone game viết theo dạng này — đều đúng.

> **📝 Tóm tắt mục 8**
>
> - \`dp[i][j]\` phụ thuộc khoảng con ngắn hơn → phải tính ngắn trước.
> - Hai cách điền đúng: (a) \`length\` tăng dần; (b) \`i\` giảm dần + \`j\` tăng dần.

---

## 9. Điểm chia "cuối cùng" vs "đầu tiên"

Đây là điểm tinh tế phân biệt người mới và người thạo interval DP.

- **Nghĩ "điểm chia đầu tiên" (thao tác đầu)**: phù hợp khi sau thao tác, hai nửa **độc lập tự nhiên** — như Matrix Chain (chọn ma trận cuối của nửa trái), Merge Stones, Palindrome Partition. Ở đây tách \`[i..k]\` và \`[k+1..j]\` là hai đoạn rời.
- **Nghĩ "điểm chia cuối cùng" (thao tác cuối)**: bắt buộc khi nghĩ "đầu tiên" làm biên **thay đổi động** — kinh điển là **Burst Balloons**. Chỉ khi \`k\` là thao tác **cuối** thì hai biên \`i\`, \`j\` mới cố định, hai nửa \`(i,k)\` và \`(k,j)\` mới độc lập.

> **⚠ Lỗi thường gặp**
>
> Áp công thức Burst Balloons như "nổ \`k\` đầu tiên" → sai vì sau khi nổ, bóng \`k-1\` và \`k+1\` dính lại, điểm khi nổ chúng phụ thuộc lẫn nhau giữa hai nửa → không phải bài con độc lập. **Quy tắc**: nếu thao tác làm biên/cấu trúc thay đổi sau mỗi bước, hãy thử nghĩ **ngược** (thao tác cuối cùng).

> **🔁 Dừng lại tự kiểm tra**
>
> Vì sao Matrix Chain dùng \`dp[k+1][j]\` còn Burst Balloons dùng \`dp[k][j]\`?
>
> <details><summary>Đáp án</summary>
>
> Matrix Chain dùng khoảng **đóng** \`[i..j]\`: hai nửa \`[i..k]\` và \`[k+1..j]\` không chồng phần tử \`k\`. Burst Balloons dùng khoảng **mở** \`(i, j)\` và \`k\` là biên chung của hai nửa con \`(i,k)\`, \`(k,j)\` → \`k\` xuất hiện ở cả hai nên là \`dp[k][j]\`, không phải \`dp[k+1][j]\`.
> </details>

---

## 10. Độ phức tạp

| Bài toán | State | Transition | Tổng | Bộ nhớ |
|---|---|---|---|---|
| Matrix Chain | $O(n^2)$ | $O(n)$ thử \`k\` | **$O(n^3)$** | $O(n^2)$ |
| Palindrome Partition II | $O(n^2)$ (isPal) + $O(n)$ (cut) | $O(n)$ | **$O(n^2)$** | $O(n^2)$ |
| Burst Balloons | $O(n^2)$ | $O(n)$ | **$O(n^3)$** | $O(n^2)$ |
| Longest Palindromic Subseq | $O(n^2)$ | $O(1)$ | **$O(n^2)$** | $O(n^2)$ |
| Merge Stones (k=2) | $O(n^2)$ | $O(n)$ | **$O(n^3)$** | $O(n^2)$ |
| Predict Winner | $O(n^2)$ | $O(1)$ | **$O(n^2)$** | $O(n^2)$ |

Công thức chung: **$O(n^2)$ state** (số cặp $(i,j)$ với $i \\leq j$) **× $O(\\text{transition})$**. Nếu transition là "thử mọi điểm chia \`k\`" thì $O(n)$ → tổng $O(n^3)$. Nếu transition chỉ so 2 lựa chọn (LPS, stone game) thì $O(1)$ → tổng $O(n^2)$.

> **⚠ Lỗi thường gặp**
>
> $O(n^3)$ chỉ chạy nổi với $n$ tới khoảng vài trăm ($n=500$ → $1{,}25 \\cdot 10^8$ phép tính, sát giới hạn 1 giây). $n=10^4$ với $O(n^3)$ = $10^{12}$ → **không tractable**. Khi $n$ lớn cần kỹ thuật giảm bậc (Knuth optimization đưa Matrix Chain / Merge Stones về $O(n^2)$) — đó là chủ đề nâng cao.

---

## 11. Khi nào dùng interval DP

Nhận diện một bài là interval DP khi thấy đủ các dấu hiệu:

1. **Đối tượng là một đoạn liên tục** (mảng / chuỗi) và lời giải định nghĩa tự nhiên trên khoảng con \`[i..j]\`.
2. **Chia thành hai đoạn con tại một điểm \`k\`** rồi **kết hợp** lại với một chi phí ghép.
3. **Thứ tự thao tác ảnh hưởng kết quả** (nhân ma trận, nổ bóng, gộp đá, cắt chuỗi) — nếu thứ tự không quan trọng thì thường có lời giải đơn giản hơn.
4. **Bài con chồng lấp** (overlapping subproblems): cùng một khoảng \`[i..j]\` bị tính nhiều lần trong đệ quy ngây thơ → cần memo hóa.

> **💡 So với divide and conquer (Lesson 17)**
>
> D&C cũng chia tại 1 điểm nhưng các bài con **không chồng lấp** (merge sort chia đôi cố định). Interval DP chia tại **mọi \`k\`** và các bài con **chồng lấp** nên phải lưu bảng. Đây là ranh giới giữa D&C thuần và DP.

---

## 12. Cạm bẫy thường gặp

> **⚠ Tổng hợp các cạm bẫy**
>
> 1. **Sai thứ tự loop**: vòng ngoài cùng phải là **độ dài khoảng** (hoặc \`i\` giảm dần). Đặt \`i\`/\`j\` ngoài cùng → đọc ô chưa tính.
> 2. **Quên / sai base case**: \`dp[i][i]\` thường = 0 (matrix chain, merge stones) hoặc = 1 (LPS) hoặc = \`nums[i]\` (stone game). Sai base → toàn bộ bảng sai.
> 3. **Burst Balloons quên biên ảo**: phải thêm \`1\` ở hai đầu, nếu không sẽ sai công thức điểm ở biên.
> 4. **Off-by-one ở \`k\`**: khoảng đóng dùng $k \\in [i, j-1]$ và \`dp[k+1][j]\`; khoảng mở (burst) dùng $k \\in (i, j)$ và \`dp[k][j]\`. Nhầm lẫn hai loại → sai.
> 5. **$O(n^3)$ với $n$ lớn**: đừng áp interval DP $O(n^3)$ cho $n \\geq 10^4$ — sẽ TLE. Kiểm tra ràng buộc $n$ trước.
> 6. **Nhầm subsequence và substring**: LPS (con) dùng \`dp[i+1][j-1]+2\`; substring palindrome dùng \`isPal\`. Hai công thức khác nhau.

---

## Bài tập

1. **Matrix Chain + truy vết ngoặc**: cho \`dims = [30, 35, 15, 5, 10, 20, 25]\`, tính chi phí tối thiểu và in chuỗi ngoặc tối ưu.
2. **Palindrome Partition II**: cho \`s = "ababbbabbababa"\`, tìm số cắt tối thiểu.
3. **Burst Balloons**: cho \`nums = [1, 2, 3, 4, 5]\`, tìm điểm tối đa.
4. **Longest Palindromic Subsequence**: cho \`s = "agbdba"\`, tìm độ dài LPS.
5. **Min cost merge stones (k=2)**: cho \`stones = [4, 3, 3, 4]\`, tìm chi phí gộp tối thiểu.
6. **Predict the Winner / Stone Game**: cho \`nums = [1, 5, 233, 7]\`, người đi trước có thắng (≥ đối thủ) không?
7. **(Mở rộng) Boolean Parenthesization**: cho biểu thức boolean (\`T\`, \`F\`, \`&\`, \`|\`, \`^\`), đếm số cách đặt ngoặc cho kết quả \`True\`. (Interval DP với hai bảng \`T[i][j]\`, \`F[i][j]\`.)

---

## Lời giải chi tiết

### Bài 1 — Matrix Chain + truy vết, \`dims = [30, 35, 15, 5, 10, 20, 25]\`

6 ma trận. Áp công thức \`dp[i][j] = min_k ( dp[i][k] + dp[k+1][j] + dims[i-1]·dims[k]·dims[j] )\` (mục 3). Chạy code mục 3.2 với \`dims\` này:

- Kết quả chi phí tối thiểu = **15125**.
- Ngoặc tối ưu = **\`((A1·(A2·A3))·((A4·A5)·A6))\`**.

**Cách truy vết**: từ \`split[1][6]\`. Đây là ví dụ chuẩn trong CLRS; điểm chia tối ưu \`dp[1][6]\` tại \`k=3\`, \`dp[1][3]\` tại \`k=1\`, \`dp[4][6]\` tại \`k=5\`. Độ phức tạp **$O(n^3) = O(6^3) = 216$ phép so**, bộ nhớ $O(n^2)$.

### Bài 2 — Palindrome Partition II, \`s = "ababbbabbababa"\`

Precompute \`isPal[i][j]\` ($O(n^2)$), rồi \`cut[j] = min_i ( cut[i-1]+1 )\` với \`s[i..j]\` palindrome (mục 4). Chuỗi này có thể tách \`"a" | "babbbab" | "b" | "ababa"\` (các phần \`"babbbab"\` và \`"ababa"\` đều palindrome) → cần kiểm bằng code. Đáp án chuẩn (LeetCode 132 ví dụ này) = **3 cắt**. Độ phức tạp **$O(n^2)$** thời gian và bộ nhớ.

### Bài 3 — Burst Balloons, \`nums = [1, 2, 3, 4, 5]\`

Thêm biên ảo: \`a = [1, 1, 2, 3, 4, 5, 1]\`. Áp \`dp[i][j] = max_k ( dp[i][k] + dp[k][j] + a[i]·a[k]·a[j] )\` (mục 5). Chạy code mục 5.2:

- Đáp án = **110**.
- Một thứ tự tối ưu: nổ \`1\` → \`2\` → \`3\` → \`4\` → \`5\` không tối ưu; DP tìm thứ tự cho 110. (Kiểm bằng code.)

Độ phức tạp **$O(n^3)$** thời gian, $O(n^2)$ bộ nhớ.

### Bài 4 — Longest Palindromic Subsequence, \`s = "agbdba"\`

Áp \`dp[i][j]\` (mục 6). LPS của \`"agbdba"\`: dãy con palindrome dài nhất là \`"abdba"\`? Kiểm: \`a g b d b a\` — bỏ \`g\` → \`"abdba"\` (đối xứng: a-b-d-b-a) ✓ độ dài **5**. Vậy đáp án = **5**. Độ phức tạp **$O(n^2)$** thời gian và bộ nhớ.

### Bài 5 — Min cost merge stones, \`stones = [4, 3, 3, 4]\`

Prefix sum: \`pre = [0, 4, 7, 10, 14]\`, tổng toàn mảng = 14. Áp \`dp[i][j] = min_k ( dp[i][k] + dp[k+1][j] ) + sum[i..j]\` (mục 7.1).

- Độ dài 2: \`dp[0][1]=4+3=7\`, \`dp[1][2]=3+3=6\`, \`dp[2][3]=3+4=7\`.
- Độ dài 3: \`dp[0][2]\`(sum=10): \`min(dp[0][0]+dp[1][2], dp[0][1]+dp[2][2]) + 10 = min(0+6, 7+0)+10 = 6+10 = 16\`. \`dp[1][3]\`(sum=10): \`min(dp[1][1]+dp[2][3], dp[1][2]+dp[3][3])+10 = min(0+7, 6+0)+10 = 6+10 = 16\`.
- Độ dài 4: \`dp[0][3]\`(sum=14): thử \`k\`:
  - \`k=0\`: \`dp[0][0]+dp[1][3] = 0+16 = 16\`.
  - \`k=1\`: \`dp[0][1]+dp[2][3] = 7+7 = 14\`.
  - \`k=2\`: \`dp[0][2]+dp[3][3] = 16+0 = 16\`.
  - min = 14, cộng sum 14 → \`dp[0][3] = 14 + 14 = 28\`.

Đáp án = **28**. Độ phức tạp **$O(n^3)$** thời gian, $O(n^2)$ bộ nhớ.

\`\`\`go
// Merge stones k=2
func mergeStones(stones []int) int {
	n := len(stones)
	pre := make([]int, n+1)
	for i := 0; i < n; i++ {
		pre[i+1] = pre[i] + stones[i]
	}
	sum := func(i, j int) int { return pre[j+1] - pre[i] }
	const INF = 1 << 60
	dp := make([][]int, n)
	for i := range dp {
		dp[i] = make([]int, n)
	}
	for length := 2; length <= n; length++ {
		for i := 0; i+length-1 < n; i++ {
			j := i + length - 1
			dp[i][j] = INF
			for k := i; k < j; k++ {
				c := dp[i][k] + dp[k+1][j] + sum(i, j)
				if c < dp[i][j] {
					dp[i][j] = c
				}
			}
		}
	}
	return dp[0][n-1] // mergeStones([4,3,3,4]) = 28
}
\`\`\`

### Bài 6 — Predict the Winner, \`nums = [1, 5, 233, 7]\`

Áp \`dp[i][j] = max( nums[i]-dp[i+1][j], nums[j]-dp[i][j-1] )\` (mục 7.2):

- \`dp[i][i]\`: \`dp[0][0]=1, dp[1][1]=5, dp[2][2]=233, dp[3][3]=7\`.
- Độ dài 2: \`dp[0][1]=max(1-5, 5-1)=4\`; \`dp[1][2]=max(5-233, 233-5)=228\`; \`dp[2][3]=max(233-7, 7-233)=226\`.
- Độ dài 3: \`dp[0][2]=max(1-dp[1][2], 233-dp[0][1])=max(1-228, 233-4)=max(-227, 229)=229\`; \`dp[1][3]=max(5-dp[2][3], 7-dp[1][2])=max(5-226, 7-228)=max(-221,-221)=-221\`.
- Độ dài 4: \`dp[0][3]=max(1-dp[1][3], 7-dp[0][2])=max(1-(-221), 7-229)=max(222, -222)=222\`.

\`dp[0][3] = 222 ≥ 0\` → **người đi trước THẮNG**. (Trực giác: lấy được \`233\` quyết định ván.) Độ phức tạp **$O(n^2)$** thời gian và bộ nhớ.

### Bài 7 — Boolean Parenthesization (mở rộng)

**Cách tiếp cận**: hai bảng interval DP — \`T[i][j]\` = số cách đặt ngoặc trên các toán hạng \`[i..j]\` cho kết quả \`True\`, \`F[i][j]\` cho \`False\`. Duyệt \`k\` là vị trí **toán tử** chia, kết hợp số cách hai nửa theo loại toán tử:

- \`&\` (AND): \`True\` chỉ khi cả hai nửa \`True\` → \`T += lt·rt\`; \`False\` khi có ít nhất một nửa \`False\`.
- \`|\` (OR): \`False\` chỉ khi cả hai \`False\`; \`True\` còn lại.
- \`^\` (XOR): \`True\` khi hai nửa khác nhau; \`False\` khi giống nhau.

Với \`tot = (lt+lf)·(rt+rf)\` là tổng số cách ghép hai nửa, ta suy phần còn lại bằng \`tot - <đã tính>\`. Độ phức tạp **$O(n^3)$** thời gian ($O(n^2)$ state × $O(n)$ điểm chia), $O(n^2)$ bộ nhớ. Base case: toán hạng đơn \`T[i][i]=1\` nếu là \`T\`, \`F[i][i]=1\` nếu là \`F\`.

---

## Code & Minh họa

- **Visualization tương tác**: [visualization.html](./visualization.html) — 3 module:
  1. **Interval DP table** — animate điền \`dp[i][j]\` theo độ dài khoảng tăng dần (theo đường chéo), highlight điểm chia \`k\`.
  2. **Matrix Chain** — thử các cách đặt ngoặc, hiện chi phí từng cách và cách tối ưu.
  3. **Burst Balloons** — animate chọn bóng "nổ cuối" trong khoảng, thấy biên ảo và công thức điểm.

- **Code Go** trong README ở các mục 3.2, 4.2, 5.2, 6.2 và bài 5 — đều biên dịch chạy được độc lập.

---

## Bài tiếp theo

- **[Lesson 28 — DP trên cây (DP on Trees)](../lesson-28-dp-on-trees/)** — tổng quát hóa "chia khoảng tại 1 điểm" thành "gộp kết quả các con của một node", DP theo cấu trúc cây thay vì đoạn thẳng.
- Ôn lại: [Lesson 26 — DP 2D / Grid](../lesson-26-dp-grid-2d/) để so sánh thứ tự điền bảng (kề cạnh vs khoảng con).
`;
