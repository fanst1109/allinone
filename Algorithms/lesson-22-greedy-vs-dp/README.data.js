// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: Algorithms/lesson-22-greedy-vs-dp/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 22 — Greedy vs Dynamic Programming

> **Tier 3 · Lesson cuối** — cây cầu nối từ tư duy tham lam (greedy) sang quy hoạch động (dynamic programming, DP) ở **Tier 4**.

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Hiểu **điểm chung** và **điểm khác** cốt lõi giữa greedy và DP.
- Biết khi nào greedy **đúng** và khi nào greedy **sai âm thầm**.
- Làm chủ case study kinh điển: **coin change** (đổi tiền) — cùng một bài toán, hệ tiền này greedy đúng, hệ tiền kia greedy sai.
- Phân biệt **0/1 knapsack** (greedy sai, cần DP) với **fractional knapsack** (greedy đúng).
- Có **quy trình quyết định** rõ ràng: đứng trước bài tối ưu mới, chọn greedy hay DP.
- Tránh 3 cạm bẫy lớn: dùng greedy không chứng minh, tin "chạy đúng trên test", và over-engineer DP khi greedy đã đủ.

## Kiến thức tiền đề

- **Greedy fundamentals** — exchange argument, greedy-choice property, optimal substructure (Lesson 19 của Tier 3).
- **Đệ quy và quan hệ truy hồi (recurrence)** — [Lesson 03](../lesson-03-recursion-recurrence/).
- **Phân tích Big-O** — [Lesson 01](../lesson-01-bigo-asymptotic/).
- DP sẽ được học **kỹ** ở Tier 4 (Lesson 25 — Knapsack DP). Bài này chỉ *tease* DP đủ để hiểu vì sao nó cứu được những chỗ greedy chết.

---

## 1. Câu hỏi cốt lõi

> **💡 Trực giác / Hình dung**
>
> Tưởng tượng bạn leo núi trong sương mù dày, chỉ nhìn thấy được 1 mét quanh chân. Chiến lược **greedy** là: "tại mỗi bước, đi về hướng dốc lên nhất." Nhanh, đơn giản, không cần nhớ gì. Nhưng nếu địa hình có một ngọn đồi nhỏ chắn trước ngọn núi thật, greedy sẽ leo lên đỉnh đồi nhỏ rồi **kẹt** ở đó (local maximum) — vì xung quanh đều dốc xuống. Để chắc chắn lên đúng đỉnh cao nhất, bạn phải **khảo sát nhiều đường, ghi nhớ kết quả từng đoạn** — đó chính là **DP**.

Mọi bài toán **tối ưu hóa** (optimization) đều hỏi: *"trong tất cả các cách làm hợp lệ, cách nào cho kết quả tốt nhất (lớn nhất / nhỏ nhất / ít nhất)?"* Ví dụ:

- Đổi 30 xu thành **ít đồng tiền nhất**.
- Nhét đồ vào balo sao cho **tổng giá trị lớn nhất** mà không quá tải trọng.
- Chọn **nhiều hoạt động nhất** không trùng giờ.

Có hai họ kỹ thuật chính:

| | **Greedy (tham lam)** | **Dynamic Programming (DP)** |
|---|---|---|
| Cách làm | Tại mỗi bước, chọn lựa chọn **trông tốt nhất ngay lúc đó**, không bao giờ quay lại | Thử **mọi** lựa chọn cho từng subproblem, ghi nhớ (memo) để tái dùng |
| Tốc độ | Nhanh, thường \`O(n log n)\` | Chậm hơn, \`O(n·W)\`, \`O(n²)\`... |
| Bộ nhớ | Ít | Thường cần bảng \`O(n)\` hoặc \`O(n·W)\` |
| Tính đúng | **Chỉ đúng với một số bài** — phải chứng minh | **Luôn đúng** nếu bài có optimal substructure |

Câu hỏi trung tâm của cả bài: **greedy (nhanh, đơn giản) hay DP (chậm hơn, luôn đúng)? Làm sao biết được khi nào dùng cái nào?**

> **❓ Câu hỏi tự nhiên của người đọc**
>
> - *"Nếu DP luôn đúng, sao không dùng DP cho mọi bài?"* → Vì DP chậm và tốn bộ nhớ hơn. Khi greedy đúng, dùng greedy là lựa chọn tốt hơn hẳn (xem mục 10). Dùng DP cho bài mà greedy đủ là **over-engineering**.
> - *"Greedy chạy đúng hết test của tôi, vậy nó đúng chứ?"* → **Không.** Đây là cạm bẫy chết người (mục 11). Chạy đúng test ≠ đúng. Phải có **chứng minh** hoặc **không tìm được phản ví dụ**.

> **🔁 Dừng lại tự kiểm tra**
>
> 1. Tốc độ điển hình của greedy và DP khác nhau thế nào?
> 2. Vì sao không dùng DP cho mọi bài cho chắc?
>
> <details><summary>Đáp án</summary>
>
> 1. Greedy thường \`O(n log n)\`; DP thường \`O(n·W)\` hoặc \`O(n²)\` — chậm hơn và tốn bộ nhớ.
> 2. Vì khi greedy đúng, nó nhanh hơn và ít tốn bộ nhớ hơn; dùng DP là phí tài nguyên (over-engineering).
> </details>

---

## 2. Điểm chung — Optimal Substructure

> **💡 Trực giác / Hình dung**
>
> "Optimal substructure" (cấu trúc con tối ưu) nghĩa là: **lời giải tối ưu của bài lớn được ghép từ lời giải tối ưu của các bài con.** Giống như xây tường gạch tối ưu — nếu mỗi đoạn tường con đã tối ưu thì tường tổng cũng tối ưu. Nếu một bài KHÔNG có tính chất này thì **cả greedy lẫn DP đều không áp dụng được** trực tiếp.

**Định nghĩa hình thức.** Bài toán có *optimal substructure* nếu: lời giải tối ưu cho bài kích thước \`n\` chứa bên trong nó lời giải tối ưu cho một (hoặc vài) bài con kích thước nhỏ hơn.

**Ví dụ 1 — đường đi ngắn nhất.** Nếu đường ngắn nhất từ A đến C đi qua B, thì đoạn A→B trong đó **phải** là đường ngắn nhất từ A đến B. (Nếu có đường A→B ngắn hơn, ta thay vào sẽ được A→C ngắn hơn — mâu thuẫn.)

**Ví dụ 2 — coin change.** Nếu cách đổi \`30\` xu tối ưu dùng một đồng \`25\`, thì phần còn lại \`30 − 25 = 5\` cũng phải được đổi **tối ưu**. (Nếu đổi \`5\` xu mà tốn nhiều đồng hơn mức tối thiểu, ta đổi lại phần đó sẽ giảm tổng số đồng.)

**Ví dụ 3 — knapsack.** Nếu cách nhét balo tối ưu có chứa món \`i\`, thì phần balo còn lại (sau khi trừ trọng lượng của \`i\`) cũng được nhét tối ưu với các món còn lại.

**Ví dụ 4 — phản ví dụ (KHÔNG có optimal substructure).** Bài "đường đi **dài nhất** không lặp đỉnh" (longest simple path) KHÔNG có optimal substructure: đoạn con của đường dài nhất chưa chắc là đường dài nhất giữa hai đầu của nó. Đây là lý do bài này khó (NP-hard) — cả greedy lẫn DP đơn giản đều không xử lý được.

> **📝 Tóm tắt mục 2**
>
> - Optimal substructure = lời giải tối ưu chứa lời giải con tối ưu.
> - Là điều kiện **chung bắt buộc** cho cả greedy và DP.
> - Không có nó → phải dùng kỹ thuật khác (backtracking, brute force...).

---

## 3. Điểm khác — Greedy-Choice Property

Cả greedy và DP đều cần optimal substructure. Điểm **phân biệt** nằm ở chỗ greedy cần **thêm một tính chất nữa** mà DP **không** cần.

> **💡 Trực giác / Hình dung**
>
> *Greedy-choice property*: "lựa chọn trông tốt nhất tại bước này (lựa chọn cục bộ) **chắc chắn** nằm trong một lời giải tối ưu toàn cục." Tức là bạn được phép **cam kết** ngay lựa chọn tham lam mà không sợ phải hối hận sau này. DP thì **không dám cam kết** — nó thử mọi lựa chọn rồi mới biết cái nào tốt.

| | **Greedy** | **DP** |
|---|---|---|
| Optimal substructure | ✅ cần | ✅ cần |
| Greedy-choice property | ✅ **cần thêm** | ❌ không cần |
| Cách ra quyết định | Chọn cục bộ → cam kết luôn, không quay lại | Thử **mọi** lựa chọn, so sánh, chọn tốt nhất |
| Subproblem | Chỉ giải **1** subproblem con (sau khi đã chọn) | Giải **nhiều** subproblem, có **overlapping** (chồng lấn) → memo |

**Greedy-choice property — định nghĩa.** Tồn tại một lựa chọn tham lam (greedy choice) ở mỗi bước sao cho luôn có một lời giải tối ưu bắt đầu bằng lựa chọn đó. Khi tính chất này đúng, greedy đúng. Khi nó **sai**, greedy cho kết quả sai.

**DP không cần greedy-choice.** DP "an toàn" hơn vì nó không cam kết: nó tính kết quả tối ưu cho **mọi** subproblem rồi ghép lại. Cái giá phải trả là phải lưu bảng kết quả (memo các **overlapping subproblems** — những subproblem xuất hiện lại nhiều lần).

> **⚠ Lỗi thường gặp**
>
> Nhầm "có optimal substructure" với "greedy đúng". Có optimal substructure **không** đủ để greedy đúng — coin change hệ \`{1,3,4}\` (mục 4) **có** optimal substructure nhưng greedy **sai**, vì thiếu greedy-choice property. Optimal substructure chỉ cho phép DP chạy; greedy cần thêm điều kiện thứ hai.

> **🔁 Dừng lại tự kiểm tra**
>
> 1. Tính chất nào greedy cần mà DP không cần?
> 2. "Overlapping subproblems" liên quan tới greedy hay DP?
>
> <details><summary>Đáp án</summary>
>
> 1. Greedy-choice property.
> 2. DP — DP memo lại các subproblem chồng lấn để khỏi tính lại. Greedy chỉ giải 1 subproblem mỗi bước nên không có chuyện chồng lấn.
> </details>

> **📝 Tóm tắt mục 3**
>
> - Cả hai cần optimal substructure.
> - Greedy cần **thêm** greedy-choice property → cho phép cam kết lựa chọn cục bộ.
> - DP không cần greedy-choice; bù lại nó thử mọi lựa chọn và memo overlapping subproblems.

---

## 4. Coin change — case study kinh điển

Bài toán: cho một **hệ tiền** (các mệnh giá) và số tiền \`amount\`, dùng **ít đồng nhất** để đổi đúng \`amount\`. Giả sử mỗi mệnh giá có **không giới hạn** số lượng.

Chiến lược greedy hiển nhiên: *luôn lấy đồng lớn nhất ≤ phần còn lại.*

### 4.1 Hệ {1, 5, 10, 25} — greedy ĐÚNG

Đây là hệ tiền kiểu USD (penny, nickel, dime, quarter). Greedy đúng với hệ này.

> **Walk-through: đổi \`30\` xu, hệ \`{1, 5, 10, 25}\`**
>
> | Bước | Còn lại | Đồng lớn nhất ≤ còn lại | Lấy | Còn lại sau |
> |---|---|---|---|---|
> | 1 | 30 | 25 | **25** | 5 |
> | 2 | 5 | 5 | **5** | 0 |
>
> Kết quả greedy: \`25 + 5\` = **2 đồng.** Đây cũng là tối ưu. ✅

Thử số khác để củng cố:

> **Walk-through: đổi \`41\` xu, hệ \`{1, 5, 10, 25}\`**
>
> \`41 → 25\` (còn 16) \`→ 10\` (còn 6) \`→ 5\` (còn 1) \`→ 1\` (còn 0). Kết quả: \`25+10+5+1\` = **4 đồng.** Tối ưu ✅.

> **Walk-through: đổi \`63\` xu**: \`25+25+10+1+1+1\` = 6 đồng. Tối ưu ✅.
> **Walk-through: đổi \`99\` xu**: \`25+25+25+10+10+1+1+1+1\` = 9 đồng. Tối ưu ✅.

Hệ \`{1,5,10,25}\` là hệ **canonical** — greedy luôn đúng. (Lý do sâu xa liên quan tới việc mỗi mệnh giá lớn "phủ" được tổ hợp các mệnh giá nhỏ; chứng minh đầy đủ nằm ngoài phạm vi bài.)

### 4.2 Hệ {1, 3, 4} tìm 6 — greedy SAI

Đây là phản ví dụ kinh điển. Hệ tiền **giả định** \`{1, 3, 4}\`.

> **Walk-through GREEDY: đổi \`6\`, hệ \`{1, 3, 4}\`**
>
> | Bước | Còn lại | Đồng lớn nhất ≤ còn lại | Lấy | Còn lại sau |
> |---|---|---|---|---|
> | 1 | 6 | 4 | **4** | 2 |
> | 2 | 2 | 1 | **1** | 1 |
> | 3 | 1 | 1 | **1** | 0 |
>
> Kết quả greedy: \`4 + 1 + 1\` = **3 đồng.** ❌ (không tối ưu)

> **Walk-through DP (đúng): đổi \`6\`, hệ \`{1, 3, 4}\`**
>
> DP tính \`dp[x]\` = số đồng ít nhất để đổi \`x\`. Công thức truy hồi:
> \`dp[x] = 1 + min( dp[x − coin] )\` với mọi \`coin ≤ x\`; \`dp[0] = 0\`.
>
> | x | tính | dp[x] | chọn |
> |---|---|---|---|
> | 0 | — | 0 | — |
> | 1 | 1+dp[0] | 1 | {1} |
> | 2 | 1+dp[1] | 2 | {1,1} |
> | 3 | min(1+dp[2], 1+dp[0]) = min(3,1) | 1 | {3} |
> | 4 | min(1+dp[3], 1+dp[1], 1+dp[0]) = min(2,2,1) | 1 | {4} |
> | 5 | min(1+dp[4], 1+dp[2], 1+dp[1]) = min(2,3,2) | 2 | {4,1} |
> | 6 | min(1+dp[5], 1+dp[3], 1+dp[2]) = min(3,**2**,3) | **2** | **{3,3}** |
>
> Kết quả DP: \`dp[6] = 2\` → đổi \`3 + 3\` = **2 đồng.** ✅ tối ưu!

**Greedy sai vì:** nó "tham" đồng \`4\` trước, rồi kẹt phải bù bằng hai đồng \`1\`. DP thử cả ba khả năng ("lấy 1", "lấy 3", "lấy 4") cho từng số, nên nó thấy đường \`3+3\` tốt hơn. Đây chính là thiếu **greedy-choice property**: lựa chọn cục bộ tốt nhất (\`4\`) KHÔNG nằm trong lời giải tối ưu.

> **⚠ Lỗi thường gặp**
>
> Tin rằng "lấy đồng lớn nhất luôn tốt". Sai. Greedy coin change chỉ đúng với hệ **canonical** (như USD). Với hệ tùy ý, **phải** dùng DP.

### 4.3 Code Go — greedy và DP cạnh nhau

\`\`\`go
package main

import (
	"fmt"
	"sort"
)

// coinChangeGreedy: tham lam — luôn lấy đồng lớn nhất <= phần còn lại.
// NHANH nhưng CHỈ ĐÚNG với hệ canonical (vd {1,5,10,25}).
// Trả về số đồng dùng (KHÔNG đảm bảo tối ưu).
func coinChangeGreedy(coins []int, amount int) int {
	// Sắp xếp giảm dần để duyệt từ đồng lớn nhất.
	c := append([]int(nil), coins...)
	sort.Sort(sort.Reverse(sort.IntSlice(c)))
	count := 0
	for _, coin := range c {
		for amount >= coin { // lấy hết đồng này trước khi sang đồng nhỏ hơn
			amount -= coin
			count++
		}
	}
	if amount != 0 {
		return -1 // không đổi được
	}
	return count
}

// coinChangeDP: quy hoạch động — LUÔN ĐÚNG cho mọi hệ tiền.
// dp[x] = số đồng ít nhất đổi x; dp[x] = 1 + min(dp[x-coin]).
// Độ phức tạp: O(amount * len(coins)).
func coinChangeDP(coins []int, amount int) int {
	const INF = 1 << 30
	dp := make([]int, amount+1)
	for i := 1; i <= amount; i++ {
		dp[i] = INF
	}
	dp[0] = 0
	for x := 1; x <= amount; x++ {
		for _, coin := range coins {
			if coin <= x && dp[x-coin]+1 < dp[x] {
				dp[x] = dp[x-coin] + 1 // thử MỌI đồng, giữ cái tốt nhất
			}
		}
	}
	if dp[amount] >= INF {
		return -1
	}
	return dp[amount]
}

func main() {
	// Hệ canonical: greedy == DP (cả hai = 2).
	fmt.Println("--- He {1,5,10,25}, amount=30 ---")
	fmt.Println("greedy:", coinChangeGreedy([]int{1, 5, 10, 25}, 30)) // 2
	fmt.Println("DP    :", coinChangeDP([]int{1, 5, 10, 25}, 30))     // 2  -> KHỚP

	// Hệ {1,3,4}: greedy SAI (3) vs DP đúng (2).
	fmt.Println("--- He {1,3,4}, amount=6 ---")
	fmt.Println("greedy:", coinChangeGreedy([]int{1, 3, 4}, 6)) // 3  (4+1+1) SAI
	fmt.Println("DP    :", coinChangeDP([]int{1, 3, 4}, 6))     // 2  (3+3)   ĐÚNG
}

// Kết quả khi chạy:
//   --- He {1,5,10,25}, amount=30 ---
//   greedy: 2
//   DP    : 2        <- hai cách KHỚP nhau -> greedy đúng cho hệ này
//   --- He {1,3,4}, amount=6 ---
//   greedy: 3        <- 4+1+1, THỪA một đồng
//   DP    : 2        <- 3+3,   tối ưu
// => Cùng một thuật toán greedy, hệ tiền khác nhau cho kết quả đúng/sai khác nhau.
\`\`\`

> **🔁 Dừng lại tự kiểm tra**
>
> 1. Với hệ \`{1, 7, 10}\`, đổi \`14\`: greedy ra mấy đồng? DP ra mấy?
> 2. Vì sao greedy đúng với \`{1,5,10,25}\` mà sai với \`{1,3,4}\`?
>
> <details><summary>Đáp án</summary>
>
> 1. Greedy: \`10 + 1 + 1 + 1 + 1\` = **5 đồng**. DP: \`7 + 7\` = **2 đồng**. Greedy sai!
> 2. Vì \`{1,5,10,25}\` là hệ canonical thỏa greedy-choice property; \`{1,3,4}\` thì không — lựa chọn đồng lớn nhất không luôn nằm trong lời giải tối ưu.
> </details>

> **📝 Tóm tắt mục 4**
>
> - Cùng bài coin change: hệ \`{1,5,10,25}\` greedy đúng, hệ \`{1,3,4}\` greedy sai.
> - DP luôn đúng vì thử mọi đồng cho từng số rồi ghép tối ưu.
> - Bài học: greedy có "đúng" hay không **phụ thuộc dữ liệu** — phải kiểm chứng, không suy diễn.

---

## 5. 0/1 Knapsack — greedy SAI, DP đúng

Bài toán **0/1 knapsack**: có \`n\` món, món \`i\` có trọng lượng \`w[i]\` và giá trị \`v[i]\`. Balo chịu được tối đa \`W\`. Mỗi món **chỉ lấy nguyên cả hoặc không lấy** (không cắt). Tối đa hóa tổng giá trị.

Chiến lược greedy hấp dẫn: sắp theo **mật độ giá trị** \`v/w\` giảm dần, lấy lần lượt khi còn chứa được.

### 5.1 Phản ví dụ — greedy theo v/w sai

> **Walk-through GREEDY (theo v/w): \`W = 50\`**
>
> | Món | w | v | v/w |
> |---|---|---|---|
> | A | 10 | 60 | **6.0** |
> | B | 20 | 100 | 5.0 |
> | C | 30 | 120 | 4.0 |
>
> Greedy lấy theo v/w giảm dần:
> - Lấy **A** (w=10, v=60) → còn sức chứa 40, tổng giá trị 60.
> - Lấy **B** (w=20, v=100) → còn 20, tổng 160.
> - Lấy **C**? w=30 > 20 còn lại → **bỏ**.
>
> Kết quả greedy: \`A + B\` = trọng lượng 30, giá trị **160**. ❌

> **Walk-through tối ưu (DP): \`W = 50\`**
>
> Tổ hợp **B + C** = trọng lượng \`20 + 30 = 50\` ≤ 50, giá trị \`100 + 120\` = **220**. ✅
>
> \`220 > 160\` → greedy **thua 60 đơn vị giá trị**. Greedy "tham" món A mật độ cao nhưng giá trị tuyệt đối nhỏ, làm lỡ tổ hợp B+C nhét vừa khít balo.

**Vì sao greedy sai ở 0/1?** Vì ràng buộc "lấy nguyên cả món" tạo ra hiệu ứng **không local**: chọn món A bây giờ ảnh hưởng tới chỗ trống còn lại theo cách phải "nhìn toàn cục" mới biết tốt hay xấu. Không có greedy-choice property.

### 5.2 DP đúng (tease Tier 4 — Lesson 25)

DP cho 0/1 knapsack dùng bảng \`dp[i][c]\` = giá trị lớn nhất khi xét \`i\` món đầu với sức chứa \`c\`:

\`\`\`
dp[i][c] = max( dp[i-1][c],                  // KHÔNG lấy món i
                dp[i-1][c - w[i]] + v[i] )   // CÓ lấy món i (nếu w[i] <= c)
\`\`\`

> **Walk-through DP nhỏ: 3 món ở trên, \`W = 50\`** (cột = sức chứa, chỉ in vài cột chính)
>
> | sau khi xét | c=10 | c=30 | c=50 |
> |---|---|---|---|
> | {} | 0 | 0 | 0 |
> | {A} | 60 | 60 | 60 |
> | {A,B} | 60 | 160 | 160 |
> | {A,B,C} | 60 | 160 | **220** |
>
> Ô \`dp[3][50]\` = \`max(dp[2][50]=160, dp[2][50−30]+120 = dp[2][20]+120)\`. Mà \`dp[2][20] = 100\` (chỉ lấy B) → \`100+120 = 220 > 160\` → chọn **220** = B+C. ✅
>
> DP "nhìn lại" được tổ hợp B+C mà greedy bỏ lỡ.

### 5.3 Code Go — 0/1 knapsack greedy (sai) và DP (đúng)

\`\`\`go
package main

import (
	"fmt"
	"sort"
)

type Item struct {
	w, v int
}

// knapsack01Greedy: tham theo mật độ v/w. NHANH nhưng SAI cho 0/1.
func knapsack01Greedy(items []Item, W int) int {
	it := append([]Item(nil), items...)
	// Sắp giảm dần theo v/w (so sánh chéo để tránh số thực).
	sort.Slice(it, func(a, b int) bool {
		return it[a].v*it[b].w > it[b].v*it[a].w
	})
	total, cap := 0, W
	for _, x := range it {
		if x.w <= cap { // chỉ lấy nguyên cả món nếu còn chứa được
			cap -= x.w
			total += x.v
		}
	}
	return total
}

// knapsack01DP: quy hoạch động — LUÔN ĐÚNG cho 0/1.
// dp[c] = giá trị lớn nhất với sức chứa c (rolling 1 chiều).
// Độ phức tạp: O(n*W).
func knapsack01DP(items []Item, W int) int {
	dp := make([]int, W+1)
	for _, x := range items {
		// Duyệt c GIẢM để mỗi món chỉ dùng 1 lần (đặc trưng 0/1).
		for c := W; c >= x.w; c-- {
			if dp[c-x.w]+x.v > dp[c] {
				dp[c] = dp[c-x.w] + x.v // thử CÓ/KHÔNG lấy, giữ tốt nhất
			}
		}
	}
	return dp[W]
}

func main() {
	items := []Item{{10, 60}, {20, 100}, {30, 120}}
	W := 50
	fmt.Println("greedy v/w:", knapsack01Greedy(items, W)) // 160  (A+B) SAI
	fmt.Println("DP        :", knapsack01DP(items, W))      // 220  (B+C) ĐÚNG
}

// Kết quả:
//   greedy v/w: 160   <- lấy A(60)+B(100), bỏ lỡ tổ hợp khít balo
//   DP        : 220   <- B(100)+C(120), nhét vừa W=50
// => Với 0/1 knapsack, greedy theo v/w SAI; phải dùng DP (học kỹ ở Tier 4 L25).
\`\`\`

> **📝 Tóm tắt mục 5**
>
> - 0/1 knapsack: greedy theo v/w **sai** (phản ví dụ W=50 cho 160 thay vì 220).
> - Ràng buộc "nguyên cả món" làm lựa chọn không local → cần DP.
> - DP \`O(n·W)\` luôn đúng — sẽ học kỹ ở [Tier 4 Lesson 25](../tier-4-dynamic-programming/index.html).

---

## 6. Fractional knapsack — greedy ĐÚNG (đối lập 0/1)

Cùng bài knapsack, nhưng giờ được **cắt món thành phần nhỏ** (vd vàng bột, gạo, xăng). Đây là **fractional knapsack**. Bất ngờ: greedy theo \`v/w\` lại **đúng**!

> **💡 Trực giác / Hình dung**
>
> Khi được cắt nhỏ, không còn chuyện "nhét vừa khít hay không" nữa — bạn luôn có thể đổ đầy balo tới đúng mép \`W\`. Vậy thì cứ ưu tiên đổ thứ **đắt nhất trên mỗi kg** (\`v/w\` cao nhất) vào trước; khi hết chỗ thì cắt một phần của món tiếp theo cho khít. Không bao giờ "lỡ" tổ hợp nào cả.

> **Walk-through GREEDY fractional: cùng input \`W = 50\`**
>
> | Món | w | v | v/w |
> |---|---|---|---|
> | A | 10 | 60 | 6.0 |
> | B | 20 | 100 | 5.0 |
> | C | 30 | 120 | 4.0 |
>
> Lấy theo v/w giảm dần:
> - **A** nguyên: lấy 10, giá trị +60 → còn chứa 40.
> - **B** nguyên: lấy 20, giá trị +100 → còn chứa 20.
> - **C**: chỉ còn 20/30 → cắt lấy \`20/30\` của C, giá trị \`+120 × 20/30 = +80\` → còn 0.
>
> Tổng: \`60 + 100 + 80\` = **240.** ✅ tối ưu (lớn hơn cả 220 của 0/1 vì được cắt!).

**Vì sao chia được → greedy đúng?** Có thể chứng minh bằng **exchange argument**: giả sử lời giải tối ưu không lấy hết món \`v/w\` cao nhất khi còn chỗ. Ta "đổi" (exchange) một lượng \`δ\` của món \`v/w\` thấp hơn lấy ra, thay bằng \`δ\` của món \`v/w\` cao hơn → tổng giá trị **tăng hoặc bằng**, mâu thuẫn với "đã tối ưu". Vậy lời giải tối ưu luôn ưu tiên \`v/w\` cao — đúng greedy-choice property.

\`\`\`go
package main

import (
	"fmt"
	"sort"
)

type Item struct{ w, v float64 }

// fractionalKnapsack: greedy theo v/w — ĐÚNG vì được cắt phần.
// Độ phức tạp: O(n log n) (sort).
func fractionalKnapsack(items []Item, W float64) float64 {
	it := append([]Item(nil), items...)
	sort.Slice(it, func(a, b int) bool {
		return it[a].v/it[a].w > it[b].v/it[b].w // mật độ giảm dần
	})
	total, cap := 0.0, W
	for _, x := range it {
		if x.w <= cap {
			cap -= x.w
			total += x.v // lấy nguyên
		} else {
			total += x.v * (cap / x.w) // cắt phần vừa đủ
			break                      // balo đầy
		}
	}
	return total
}

func main() {
	items := []Item{{10, 60}, {20, 100}, {30, 120}}
	fmt.Println("fractional greedy:", fractionalKnapsack(items, 50)) // 240
}

// Kết quả:
//   fractional greedy: 240   <- A(60)+B(100)+2/3 C(80) = 240, tối ưu
// => CÙNG input, fractional greedy ĐÚNG (240) còn 0/1 greedy SAI (160).
//    Khác biệt duy nhất: được phép cắt phần hay không.
\`\`\`

> **⚠ Lỗi thường gặp**
>
> Áp dụng "greedy v/w đúng cho fractional" vào luôn 0/1 — sai. Hai bài chỉ khác một ràng buộc nhỏ ("cắt được hay không") nhưng kết luận về greedy ngược nhau hoàn toàn.

> **🔁 Dừng lại tự kiểm tra**
>
> 1. Cùng input \`W=50\`, vì sao fractional ra 240 còn 0/1 chỉ ra 220?
> 2. Tính chất nào của fractional khiến greedy đúng?
>
> <details><summary>Đáp án</summary>
>
> 1. Fractional cắt được 2/3 món C để đổ đầy chính xác tới W=50; 0/1 phải lấy nguyên cả món nên không nhét khít được, "phí" sức chứa.
> 2. Vì cắt được, ta luôn đổ đầy balo và ưu tiên v/w cao nhất → exchange argument chứng minh greedy-choice property đúng.
> </details>

> **📝 Tóm tắt mục 6**
>
> - Fractional knapsack: greedy theo v/w **đúng**, \`O(n log n)\`.
> - "Chia được" loại bỏ hiệu ứng "không nhét khít" → exchange argument chạy được.
> - Đối lập 0/1: cùng dữ liệu, fractional 240 (greedy đúng) vs 0/1 220 (cần DP).

---

## 7. Cách quyết định — greedy hay DP?

Đứng trước một bài tối ưu mới, dùng quy trình 4 bước:

1. **Đoán một greedy strategy.** Thường là "chọn cực trị tại mỗi bước": lớn nhất, nhỏ nhất, sớm nhất kết thúc, mật độ cao nhất...
2. **Săn phản ví dụ nhỏ.** Thử vài input nhỏ thủ công. **Nếu greedy sai, thường tìm được phản ví dụ rất nhanh** (như \`{1,3,4}\` tìm 6, hay knapsack W=50). Tìm thấy phản ví dụ → **bỏ greedy**.
3. **Không tìm được phản ví dụ → thử chứng minh greedy đúng** bằng **exchange argument**: giả sử có lời giải tối ưu khác greedy ở bước đầu, "đổi" lựa chọn của nó về lựa chọn greedy mà không làm tệ đi → suy ra greedy cũng tối ưu.
4. **Chứng minh không được / có phản ví dụ → dùng DP.** Xác định subproblem, viết quan hệ truy hồi, memo.

> **💡 Trực giác / Hình dung**
>
> Săn phản ví dụ là "rẻ" và "nhanh kết luận sai". Chứng minh là "đắt" nhưng cho "kết luận đúng chắc chắn". Quy trình tối ưu: săn phản ví dụ **trước** (loại nhanh greedy tồi), chỉ chứng minh khi đã nghi greedy đúng.

\`\`\`
              ┌─────────────────────────┐
              │  Bài toán tối ưu mới     │
              └────────────┬────────────┘
                           ▼
              Đoán một greedy strategy
                           ▼
              Săn phản ví dụ nhỏ  ──── tìm thấy ──►  DÙNG DP
                           │
                      không thấy
                           ▼
        Thử chứng minh (exchange argument)
                  │              │
              chứng minh      không
               được           chứng minh được
                  ▼              ▼
            DÙNG GREEDY        DÙNG DP
\`\`\`

> **📝 Tóm tắt mục 7**
>
> - 4 bước: đoán greedy → săn phản ví dụ → (nếu không thấy) chứng minh → quyết định.
> - Phản ví dụ nhỏ thường xuất hiện nhanh nếu greedy sai.
> - Chứng minh được → greedy; có phản ví dụ hoặc không chứng minh được → DP.

---

## 8. Dấu hiệu CẦN DP

Các tín hiệu cho thấy bài cần DP (greedy sẽ sai):

- **Lựa chọn hiện tại ảnh hưởng tương lai theo cách không local.** Chọn món A trong knapsack ảnh hưởng tới việc nhét vừa B+C sau này — không biết tốt hay xấu nếu chỉ nhìn cục bộ.
- **Cần "nhìn lại" / cân nhắc cả hai khả năng** (lấy / không lấy) rồi mới biết cái nào hơn.
- **Subproblem chồng lấn (overlapping).** Cùng một bài con xuất hiện lại nhiều lần (vd \`dp[x]\` được dùng để tính \`dp[x+coin]\` cho nhiều \`coin\`).
- **Bài hỏi "đếm số cách"** (số cách leo cầu thang, số cách đổi tiền...) — greedy không đếm được; DP cộng dồn.
- **"Tối ưu với ràng buộc"** (sức chứa balo, ngân sách, số bước...) — ràng buộc tạo trạng thái cần lưu trong bảng DP.

**Ví dụ minh họa từng dấu hiệu:**

1. *Coin change đếm số cách đổi \`5\` xu với \`{1,2,5}\`*: có nhiều cách (\`5\`, \`2+2+1\`, \`2+1+1+1\`, \`1×5\`) → "đếm số cách" → **DP**.
2. *0/1 knapsack*: "tối ưu với ràng buộc W", lựa chọn không local → **DP**.
3. *Longest increasing subsequence*: phải nhìn lại mọi phần tử trước → overlapping → **DP**.

> **📝 Tóm tắt mục 8**
>
> - Cần DP khi: lựa chọn ảnh hưởng không local, cần nhìn lại, subproblem chồng lấn, đếm số cách, tối ưu có ràng buộc.

---

## 9. Dấu hiệu greedy OK

Tín hiệu cho thấy greedy có khả năng đúng:

- **Chọn cực trị (max/min) tại mỗi bước rõ ràng tối ưu** và không "hối hận" về sau. Ví dụ: activity selection — luôn chọn hoạt động **kết thúc sớm nhất** để chừa nhiều chỗ nhất.
- **Cấu trúc matroid** (nhắc qua). Nếu bài toán có cấu trúc *matroid* — một khung lý thuyết tổng quát hóa "tính độc lập" — thì greedy **đảm bảo** đúng. Ví dụ: cây khung nhỏ nhất (Kruskal) đứng trên matroid đồ thị. (Lý thuyết matroid nằm ngoài phạm vi; chỉ cần biết: nếu chứng minh được bài là matroid → greedy chắc chắn đúng.)
- **Bài cho phép chia/cắt (fractional)** → đổ đầy được, exchange argument chạy được → greedy đúng (như fractional knapsack mục 6).

**Ví dụ:**

1. *Activity selection*: chọn hoạt động kết thúc sớm nhất → greedy đúng (chứng minh bằng exchange argument).
2. *Fractional knapsack*: chia được → greedy đúng.
3. *Kruskal/Prim (MST)*: matroid → greedy đúng (sẽ gặp ở Tier 5 — Graph).

> **📝 Tóm tắt mục 9**
>
> - Greedy OK khi: chọn cực trị rõ ràng tối ưu, có cấu trúc matroid, hoặc bài chia được (fractional).

---

## 10. Trade-off — chi phí và lựa chọn

| Tiêu chí | Greedy | DP |
|---|---|---|
| Thời gian điển hình | \`O(n log n)\` (do sort) | \`O(n·W)\` (knapsack), \`O(n²)\` (LIS naive)... |
| Bộ nhớ | \`O(1)\`–\`O(n)\` | \`O(n)\`–\`O(n·W)\` (bảng memo) |
| Code | Ngắn, dễ | Dài hơn, dễ sai chỉ số |
| Tính đúng | Chỉ một số bài (phải chứng minh) | Luôn đúng nếu có optimal substructure |

**Ví dụ số so sánh (coin change, amount = 10 000, 4 mệnh giá):**

- Greedy: vài chục phép tính (chia + trừ). \`O(n log n)\` với n nhỏ ≈ tức thì.
- DP: bảng \`dp[0..10000]\`, mỗi ô thử 4 đồng → \`~40 000\` phép tính + mảng 10 001 phần tử. Vẫn nhanh nhưng tốn bộ nhớ rõ rệt hơn.

**Nguyên tắc vàng:** *Nếu greedy đã được chứng minh đúng cho bài đó, LUÔN ưu tiên greedy* — nhanh hơn, ít bộ nhớ, code gọn. Chỉ chuyển sang DP khi greedy sai (có phản ví dụ) hoặc không chứng minh được.

> **📝 Tóm tắt mục 10**
>
> - Greedy rẻ hơn về cả thời gian lẫn bộ nhớ.
> - DP đắt hơn nhưng an toàn.
> - Greedy đúng → luôn chọn greedy.

---

## 11. Cạm bẫy

> **⚠ Lỗi thường gặp — 3 cạm bẫy lớn**
>
> 1. **Dùng greedy không chứng minh → sai âm thầm.** Đây là cái bẫy nguy hiểm nhất: code chạy, ra kết quả, trông hợp lý — nhưng sai trên một số input mà bạn chưa thử. Không có lỗi runtime để cảnh báo. Coin change \`{1,3,4}\` là ví dụ: ra \`3\` đồng thay vì \`2\`, không hề báo lỗi.
>
> 2. **"Greedy chạy đúng trên test" ≠ greedy đúng.** Pass hết test trong đề bài KHÔNG chứng minh thuật toán đúng — chỉ chứng minh nó đúng *trên những test đó*. Cần một trong hai: (a) **chứng minh** (exchange argument / matroid), hoặc (b) thử nhiều và **không tìm được phản ví dụ** kèm lý do tin tưởng. Tốt nhất là viết một bộ kiểm chéo greedy vs brute-force trên input nhỏ ngẫu nhiên.
>
> 3. **Over-engineer DP khi greedy đủ.** Ngược lại với (1): dùng bảng DP \`O(n·W)\` cho bài mà greedy \`O(n log n)\` đã đúng (như activity selection, fractional knapsack) → chậm hơn, tốn bộ nhớ, code phức tạp không cần thiết.

**Mẹo phát hiện cạm bẫy 2 (kiểm chéo):** với input nhỏ, chạy cả greedy và brute-force (thử mọi tổ hợp). Nếu chúng khác nhau ở **bất kỳ** input nhỏ nào → đã có phản ví dụ → greedy sai. Nếu khớp trên hàng nghìn input ngẫu nhiên nhỏ → tăng niềm tin (nhưng vẫn nên chứng minh khi có thể).

> **📝 Tóm tắt mục 11**
>
> - Cạm bẫy 1: greedy không chứng minh → sai im lặng.
> - Cạm bẫy 2: pass test ≠ đúng — cần chứng minh hoặc kiểm chéo brute-force.
> - Cạm bẫy 3: over-engineer DP khi greedy đủ.

---

## Bài tập

Với mỗi bài: **xác định greedy đúng hay sai**. Nếu greedy sai → đưa **phản ví dụ cụ thể** và nói rõ cần DP.

1. **Coin change hệ \`{1, 5, 10, 25}\`**, đổi \`87\` xu, ít đồng nhất. Greedy "lấy đồng lớn nhất" đúng hay sai?
2. **Coin change hệ \`{1, 5, 8}\`**, đổi \`12\` xu. Greedy đúng hay sai?
3. **Jump Game** — mảng \`nums\`, \`nums[i]\` = bước nhảy tối đa từ ô \`i\`. Hỏi: có tới được ô cuối không? Greedy (luôn nhảy tới ô xa nhất reachable) đúng hay sai?
4. **0/1 knapsack** với \`items = {(w=1,v=1), (w=3,v=4), (w=4,v=5), (w=5,v=7)}\`, \`W=7\`. Greedy theo v/w đúng hay sai?
5. **Fractional knapsack** cùng input bài 4 (cho cắt). Greedy theo v/w đúng hay sai?
6. **Activity selection** — chọn nhiều hoạt động không trùng giờ nhất. Greedy "chọn hoạt động kết thúc sớm nhất" đúng hay sai?
7. **Longest Increasing Subsequence (LIS)** — dãy con tăng dài nhất. Greedy "cứ thấy số lớn hơn phần tử cuối thì thêm" đúng hay sai?

---

## Lời giải chi tiết

### Bài 1 — Coin \`{1,5,10,25}\`, đổi 87 — greedy ĐÚNG

**Cách tiếp cận:** \`{1,5,10,25}\` là hệ canonical (kiểu USD), thỏa greedy-choice property → greedy đúng.

**Walk-through:** \`87 → 25\` (62) \`→ 25\` (37) \`→ 25\` (12) \`→ 10\` (2) \`→ 1\` (1) \`→ 1\` (0) = \`25×3 + 10 + 1×2\` = **6 đồng.** Đây là tối ưu.

**Kết luận:** Greedy **đúng**. Độ phức tạp \`O(số mệnh giá)\`.

### Bài 2 — Coin \`{1,5,8}\`, đổi 12 — greedy SAI

**Greedy:** \`12 → 8\` (4) \`→ 1\` (3) \`→ 1\` (2) \`→ 1\` (1) \`→ 1\` (0) = \`8 + 1×4\` = **5 đồng.** ❌

**Tối ưu (DP):** \`12 = 5 + 5 + 1 + 1\` = **4 đồng.** (Hoặc kiểm tra: \`dp[12]\` qua truy hồi \`dp[x]=1+min(dp[x-1],dp[x-5],dp[x-8])\`.)

**Phản ví dụ:** chính là \`amount = 12\`. Greedy ra 5, tối ưu 4.

**Kết luận:** Greedy **sai**. Hệ \`{1,5,8}\` không canonical → phải dùng **DP** \`O(amount × số mệnh giá)\`.

### Bài 3 — Jump Game — greedy ĐÚNG

**Cách tiếp cận:** Duy trì \`reach\` = chỉ số xa nhất tới được. Duyệt \`i\` từ 0; nếu \`i > reach\` thì kẹt (trả false); ngược lại cập nhật \`reach = max(reach, i + nums[i])\`. Tới được cuối nếu \`reach ≥ n−1\`.

**Vì sao greedy đúng:** Bài chỉ hỏi "tới được hay không" (không tối ưu số bước). \`reach\` mở rộng đơn điệu; không có chuyện "hối hận". Mọi ô trong \`[0, reach]\` đều tới được, nên giữ \`reach\` lớn nhất là đủ — exchange argument: bất kỳ đường đi tới đích nào cũng không vượt quá \`reach\` mà greedy duy trì.

**Ví dụ:** \`nums = [2,3,1,1,4]\` → reach: i0→2, i1→4, đã ≥ 4 → **true**. \`nums = [3,2,1,0,4]\` → reach: i0→3, i1→3, i2→3, i3→3, tới i4 thì \`4 > reach=3\` → **false** (đúng, bị kẹt ở ô có giá trị 0).

**Kết luận:** Greedy **đúng**, \`O(n)\`.

> Lưu ý: biến thể "**ít bước nhất**" tới đích (Jump Game II) cũng greedy được (BFS-layer greedy), nhưng "đếm số cách tới đích" thì cần DP. Tùy biến thể mà kết luận khác nhau.

### Bài 4 — 0/1 knapsack \`W=7\` — greedy SAI

**Items:** \`(1,1), (3,4), (4,5), (5,7)\`. v/w: \`1.0, 1.33, 1.25, 1.4\`.

**Greedy theo v/w giảm dần** thứ tự: \`(5,7)[1.4], (3,4)[1.33], (4,5)[1.25], (1,1)[1.0]\`.
- Lấy \`(5,7)\` → cap 2, value 7.
- \`(3,4)\` w=3 > 2 → bỏ. \`(4,5)\` w=4 > 2 → bỏ. \`(1,1)\` w=1 ≤ 2 → lấy → cap 1, value 8.
- Kết quả greedy: **value 8** (w=6).

**Tối ưu (DP):** \`(3,4) + (4,5)\` = w \`7\` ≤ 7, value \`4+5\` = **9.** ❌ greedy thua.

**Phản ví dụ:** chính bộ này, \`W=7\` — greedy 8, tối ưu 9.

**Kết luận:** Greedy **sai**. 0/1 knapsack cần **DP** \`O(n·W)\` (Tier 4 L25).

### Bài 5 — Fractional knapsack cùng input — greedy ĐÚNG

**Cho cắt phần.** Lấy theo v/w giảm dần, đổ đầy tới \`W=7\`:
- \`(5,7)[1.4]\` nguyên → cap 2, value 7.
- \`(3,4)[1.33]\`: chỉ còn 2/3 → cắt \`2/3\` của (3,4): value \`+4 × 2/3 = +2.667\` → cap 0.
- Tổng: \`7 + 2.667\` = **9.667.**

**Kết luận:** Greedy **đúng** (fractional, exchange argument), \`O(n log n)\`. So với 0/1: fractional \`9.667 > 9\` vì được cắt — đúng quy luật fractional ≥ 0/1.

### Bài 6 — Activity selection — greedy ĐÚNG

**Cách tiếp cận:** Sắp các hoạt động theo **thời điểm kết thúc tăng dần**; lần lượt chọn hoạt động kết thúc sớm nhất mà không trùng với hoạt động đã chọn.

**Vì sao đúng (exchange argument):** Gọi \`a\` là hoạt động kết thúc sớm nhất. Có một lời giải tối ưu chứa \`a\`: nếu lời giải tối ưu nào đó dùng hoạt động \`b ≠ a\` đầu tiên, vì \`a\` kết thúc ≤ \`b\`, ta thay \`b\` bằng \`a\` → vẫn hợp lệ, cùng số lượng → tối ưu vẫn giữ. Vậy chọn \`a\` an toàn (greedy-choice property), lặp lại cho phần còn lại.

**Ví dụ:** hoạt động \`[(1,3),(2,5),(4,7),(6,9)]\` (start,end) sort theo end: chọn \`(1,3)\` → \`(4,7)\` → bỏ \`(6,9)\` vì 6<7... thực ra sau (4,7) chọn được hoạt động bắt đầu ≥7; nếu có \`(8,10)\` thì chọn thêm. Greedy cho số lượng tối đa.

**Kết luận:** Greedy **đúng**, \`O(n log n)\` (do sort theo end).

### Bài 7 — LIS — greedy "thêm khi lớn hơn cuối" SAI

**Greedy ngây thơ:** duyệt, nếu phần tử > phần tử cuối của dãy đang dựng thì thêm.

**Phản ví dụ:** \`nums = [3, 4, 1, 2, 5]\`.
- Greedy ngây thơ: \`3 → 4\` (4>3) → \`1\`? 1<4 bỏ → \`2\`? 2<4 bỏ → \`5\` (5>4) thêm. Kết quả \`[3,4,5]\` độ dài **3**.
- Đây tình cờ đúng. Thử \`nums = [10, 1, 2, 3, 4]\`: greedy dựng \`[10]\`, rồi \`1<10\` bỏ, \`2,3,4\` đều \`<10\` bỏ → độ dài **1**. Nhưng LIS thật là \`[1,2,3,4]\` độ dài **4**. ❌

**Vì sao sai:** Greedy "thêm khi lớn hơn cuối" bị **một phần tử lớn ở đầu** phá hỏng — nó cam kết giữ \`10\` và không quay lại được. LIS cần **nhìn lại mọi phần tử trước**: \`dp[i] = 1 + max(dp[j])\` với \`j<i, nums[j]<nums[i]\` — đây là **overlapping subproblems** → DP.

**Kết luận:** Greedy **sai**. LIS cần **DP** \`O(n²)\` (hoặc greedy + binary search \`O(n log n)\` với cấu trúc patience sorting — nhưng đó là greedy *được chứng minh*, khác greedy ngây thơ ở trên).

---

## Tổng kết bài học

| Bài | Greedy | Lý do |
|---|---|---|
| Coin \`{1,5,10,25}\` | ✅ đúng | hệ canonical |
| Coin \`{1,3,4}\`, \`{1,5,8}\` | ❌ sai | không canonical → DP |
| 0/1 knapsack | ❌ sai | lựa chọn không local → DP |
| Fractional knapsack | ✅ đúng | chia được → exchange argument |
| Jump Game (reachability) | ✅ đúng | reach đơn điệu |
| Activity selection | ✅ đúng | matroid / exchange argument |
| LIS (greedy ngây thơ) | ❌ sai | cần nhìn lại → DP |

**Quy trình quyết định:** đoán greedy → săn phản ví dụ → (không thấy) chứng minh exchange → quyết định. Greedy đúng thì luôn ưu tiên (nhanh, gọn); sai thì DP cứu.

---

## Code & Minh họa

- Code Go inline ở các mục 4, 5, 6 (coin change greedy/DP, 0/1 knapsack greedy/DP, fractional knapsack).
- [visualization.html](./visualization.html) — 3 module tương tác: (1) Coin change greedy vs DP, (2) Decision flowchart, (3) 0/1 vs fractional knapsack.

## Bài tiếp theo

Đây là **lesson cuối Tier 3**. Tiếp theo: [Tier 4 — Quy hoạch động (Dynamic Programming)](../tier-4-dynamic-programming/index.html), nơi DP được học bài bản (Lesson 25 — Knapsack DP đào sâu phần đã tease ở mục 5).
`;
