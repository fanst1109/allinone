// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: Algorithms/lesson-04-correctness-invariant/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 04 — Tính đúng đắn & Loop Invariant

> **Tier 0 — Nền tảng phân tích · Lesson 04**
> Làm sao *biết chắc* một thuật toán cho kết quả đúng — không phải "chạy thử thấy ổn" mà là **chứng minh** nó đúng với MỌI input, và chứng minh nó luôn **dừng**.

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Hiểu vì sao **test không bao giờ chứng minh được "không có bug"**, chỉ chứng minh được "có bug".
- Nắm **loop invariant** (bất biến vòng lặp) và 3 phần phải chứng minh: **Initialization**, **Maintenance**, **Termination**.
- Viết được invariant cho các thuật toán kinh điển: insertion sort, linear max, binary search, sum/factorial.
- Hiểu **chứng minh quy nạp (induction)** và cách nó là "bộ xương" của loop invariant.
- Chứng minh một thuật toán **dừng** bằng cách tìm **variant** (đại lượng giảm dần có chặn dưới).
- Chứng minh tính đúng của **đệ quy** bằng **quy nạp mạnh** trên kích thước input.
- Nhận diện các **cạm bẫy**: off-by-one phá invariant, điều kiện dừng sai → vòng lặp vô hạn, invariant chọn quá yếu / quá mạnh.

## Kiến thức tiền đề

- [Lesson 01 — Big-O & phân tích tiệm cận](../lesson-01-bigo-asymptotic/README.md) — ký hiệu độ phức tạp.
- [Lesson 02 — Amortized analysis](../lesson-02-amortized/README.md) — phân tích chi phí trung bình.
- [Lesson 03 — Đệ quy & Recurrence](../lesson-03-recursion-recurrence/README.md) — đệ quy và quan hệ truy hồi (dùng ở mục 9).
- Biết đọc code Go cơ bản (vòng \`for\`, slice, hàm).

---

## 1. Vì sao phải chứng minh tính đúng đắn?

> 💡 **Trực giác / Hình dung.** Bạn viết một thuật toán sắp xếp, chạy thử 100 mảng ngẫu nhiên — đều đúng. Bạn yên tâm. Nhưng có một mảng — mảng thứ 101 mà bạn chưa thử — làm nó sai. Test giống như **gõ vào tường tìm chỗ rỗng**: nghe thấy chỗ rỗng (bug) thì biết chắc có lỗ hổng, nhưng gõ 100 chỗ đặc *không* chứng minh cả bức tường đặc. Chứng minh tính đúng đắn là **soi X-quang cả bức tường** một lần.

Câu nói kinh điển của Edsger Dijkstra:

> *"Testing shows the presence, not the absence, of bugs."*
> (Test cho thấy **sự hiện diện**, chứ không phải **sự vắng mặt**, của lỗi.)

### 1.1 Vì sao test không đủ?

Một hàm \`sort(a []int)\` nhận input là mảng độ dài tùy ý, mỗi phần tử là số nguyên tùy ý. Số lượng input là **vô hạn**. Test 1 triệu mảng vẫn là một tập con hữu hạn, bỏ sót vô hạn trường hợp còn lại.

**Ví dụ một bug chỉ lộ ở input hiếm:** binary search nổi tiếng của Java (JDK) có bug \`(lo + hi) / 2\` tràn số (overflow) khi $\\text{lo} + \\text{hi} > 2^{31} - 1$. Bug này **tồn tại suốt 9 năm** trong thư viện chuẩn, qua hàng triệu lần test, vì không ai test mảng đủ lớn (~1 tỷ phần tử). Nó chỉ lộ khi \`lo + hi\` vượt \`math.MaxInt32\`. Một chứng minh tính đúng đắn cẩn thận sẽ bắt buộc hỏi "biểu thức \`lo + hi\` có tràn không?" → phát hiện ngay.

> ❓ **Câu hỏi tự nhiên của người đọc.**
> - *"Vậy có nên bỏ test không?"* — Không. Test bắt lỗi rẻ và nhanh; chứng minh bắt lỗi tận gốc. Hai cái **bổ trợ**: chứng minh cho thuật toán cốt lõi (sort, search, parser), test cho phần "dán" và regression.
> - *"Chứng minh có khó không?"* — Với loop và đệ quy đơn giản thì không. Bài này cho bạn một **khuôn mẫu cơ học** (3 bước invariant) để theo, không phải "linh cảm".
> - *"Có công cụ tự chứng minh không?"* — Có (formal verification: Coq, TLA+, Dafny), nhưng tốn công. Lý luận bằng tay với invariant là kỹ năng nền tảng và đủ cho 99% nhu cầu hằng ngày.

### 1.2 Hai câu hỏi của "tính đúng đắn"

Chứng minh một thuật toán "đúng" thực ra là chứng minh **hai** mệnh đề tách biệt:

1. **Partial correctness** (đúng một phần): *NẾU* thuật toán dừng, kết quả trả về đúng đặc tả.
2. **Termination** (tính dừng): thuật toán *luôn* dừng (không treo vô hạn).

**Đúng hoàn toàn (total correctness) = partial correctness + termination.** Nhiều người chỉ chứng minh phần 1 rồi quên phần 2 — một thuật toán treo vô hạn thì "kết quả khi dừng" là vô nghĩa. Mục 2–7 lo phần 1 (qua loop invariant), mục 8 lo phần 2 (qua variant).

> 📝 **Tóm tắt mục 1.**
> - Test chứng minh **có** bug, không chứng minh **không** bug (input vô hạn).
> - Bug JDK binary search sống 9 năm là minh chứng test không đủ.
> - Tính đúng đắn = **partial correctness** (đúng nếu dừng) + **termination** (luôn dừng).
> - Test và chứng minh bổ trợ nhau, không thay thế nhau.

---

## 2. Loop invariant — bất biến vòng lặp

> 💡 **Trực giác / Hình dung.** Tưởng tượng bạn leo cầu thang lên tầng 100, mỗi bước một bậc. Làm sao chắc chắn "khi tôi lên đến đỉnh thì đã đi đúng cầu thang"? Bạn không kiểm tra từng bậc một (100 lần). Thay vào đó bạn lý luận: (a) bậc đầu tiên đúng cầu thang; (b) **nếu** đang đứng ở một bậc đúng cầu thang **thì** bước tiếp theo vẫn ở cầu thang đó. Hai điều này đủ kết luận mọi bậc — kể cả bậc 100 — đều đúng. **Loop invariant chính là "tính chất luôn đúng ở mỗi bậc thang".**

### 2.1 Định nghĩa

**Loop invariant** (bất biến vòng lặp) là một **mệnh đề** (đúng/sai) về trạng thái chương trình, **đúng ngay trước khi bắt đầu mỗi lần lặp** (kể cả lần đầu, và cả lần "thử" cuối cùng khiến điều kiện lặp sai và thoát).

Để dùng invariant chứng minh thuật toán đúng, ta phải chứng minh **3 phần**:

| Phần | Phát biểu | Tương ứng quy nạp |
|------|-----------|-------------------|
| **Initialization** (Khởi tạo) | Invariant đúng **trước** lần lặp **đầu tiên**. | Base case |
| **Maintenance** (Duy trì) | **NẾU** invariant đúng trước một lần lặp **THÌ** nó vẫn đúng trước lần lặp kế tiếp. | Inductive step |
| **Termination** (Kết thúc) | Khi loop dừng, invariant **kết hợp với điều kiện dừng** suy ra **kết quả mong muốn**. | Kết luận |

> ⚠ **Lỗi thường gặp.** "Termination" ở đây **không** phải chứng minh loop *dừng*. Đây là cách dùng thuật ngữ của Cormen (CLRS): "Termination" = phân tích trạng thái **tại lúc** loop kết thúc để rút ra kết quả. Việc chứng minh loop *thật sự dừng* là một chuyện riêng (mục 8 — variant). Dễ lẫn lộn hai khái niệm cùng tên!

### 2.2 Đặc trưng của một invariant "tốt"

Một invariant hữu ích phải đồng thời:

- **Đủ mạnh** để khi loop kết thúc + điều kiện dừng → suy ra ngay kết quả đúng. (Nếu quá yếu, đến cuối vẫn không kết luận được gì.)
- **Đủ yếu** để duy trì được (maintenance). (Nếu quá mạnh — ví dụ "cả mảng đã sắp xếp" ngay từ vòng 1 — thì không đúng ở khởi tạo, không maintain nổi.)

Mục 10 đi sâu vào cạm bẫy "quá mạnh / quá yếu" này.

> 🔁 **Dừng lại tự kiểm tra.**
> 1. Invariant đúng ở *thời điểm* nào trong một vòng lặp?
> 2. Phần nào của "3 phần" tương ứng với base case của quy nạp?
>
> <details><summary>Đáp án</summary>
>
> 1. **Ngay trước** khi vào thân vòng lặp mỗi lần (trước khi kiểm tra điều kiện cũng được, miễn nhất quán). Không phải "giữa thân vòng".
> 2. **Initialization** ↔ base case. **Maintenance** ↔ inductive step.
> </details>

> 📝 **Tóm tắt mục 2.**
> - Loop invariant = mệnh đề đúng **trước mỗi lần lặp**.
> - Chứng minh 3 phần: **Initialization** (base), **Maintenance** (bước quy nạp), **Termination** (kết luận tại lúc dừng).
> - "Termination" của invariant ≠ chứng minh loop dừng (xem mục 8).
> - Invariant tốt = đủ mạnh để kết luận + đủ yếu để duy trì.

---

## 3. Ví dụ 1 — Insertion sort

Bài toán: sắp xếp mảng \`a\` tăng dần. Insertion sort lặp \`i\` từ \`1\` đến \`n−1\`, mỗi bước "chèn" \`a[i]\` vào đúng vị trí trong phần đầu đã sắp xếp.

### 3.1 Code Go với invariant chú thích từng bước

\`\`\`go
package main

import "fmt"

// InsertionSort sắp xếp a tăng dần tại chỗ (in-place).
func InsertionSort(a []int) {
	for i := 1; i < len(a); i++ {
		// ┌─ INVARIANT (đúng tại đây, trước mỗi vòng i) ─────────────┐
		// │ a[0..i-1] chứa ĐÚNG các phần tử ban đầu ở vị trí 0..i-1, │
		// │ và đã được SẮP XẾP tăng dần.                            │
		// └──────────────────────────────────────────────────────────┘
		key := a[i] // phần tử cần chèn vào phần đã sắp
		j := i - 1
		// Dời các phần tử > key sang phải để tạo chỗ trống cho key.
		for j >= 0 && a[j] > key {
			a[j+1] = a[j]
			j--
		}
		a[j+1] = key
		// Sau vòng này: a[0..i] đã sắp xếp → invariant đúng cho i+1.
	}
	// THOÁT khi i == len(a): invariant nói a[0..len(a)-1] đã sắp xếp = CẢ MẢNG.
}

func main() {
	a := []int{5, 2, 4, 6, 1, 3}
	InsertionSort(a)
	fmt.Println(a) // [1 2 3 4 5 6]
}
\`\`\`

### 3.2 Invariant

> **Invariant \`I(i)\`:** *Trước mỗi lần lặp với chỉ số \`i\`, mảng con \`a[0..i-1]\` chứa đúng các phần tử gốc tại vị trí \`0..i-1\`, và đã được sắp xếp tăng dần.*

### 3.3 Chứng minh đủ 3 phần

**Initialization (i = 1).** Trước vòng đầu, \`a[0..0]\` chỉ có một phần tử \`a[0]\`. Một mảng một phần tử luôn "đã sắp xếp" (không có cặp nào sai thứ tự). ✓

**Maintenance.** Giả sử \`I(i)\` đúng: \`a[0..i-1]\` đã sắp xếp. Vòng trong dời mọi phần tử của \`a[0..i-1]\` lớn hơn \`key = a[i]\` sang phải một ô, rồi đặt \`key\` vào khe trống. Kết quả:
- Mọi phần tử ≤ \`key\` vẫn ở bên trái \`key\`, giữ thứ tự (chúng không bị dời).
- Mọi phần tử > \`key\` ở bên phải \`key\`, giữ thứ tự (dời cùng một bước).
- \`key\` nằm đúng giữa hai nhóm.

Vậy \`a[0..i]\` đã sắp xếp, và chứa đúng các phần tử gốc (chỉ hoán vị nội bộ). Đó chính là \`I(i+1)\`. ✓

**Termination.** Vòng dừng khi \`i = n\` (với \`n = len(a)\`). Thay vào invariant: \`a[0..n-1]\` — tức **cả mảng** — đã sắp xếp và chứa đúng phần tử gốc. Đó đúng là đặc tả "sắp xếp". ✓

### 3.4 Walk-through bằng số cụ thể

Mảng \`a = [5, 2, 4, 6, 1, 3]\`, \`n = 6\`. Phần **đậm** là vùng \`a[0..i-1]\` mà invariant khẳng định đã sắp xếp.

| i | key | Trước vòng (vùng đã sắp **đậm**) | Sau khi chèn |
|:-:|:---:|---|---|
| 1 | 2 | **[5]** , 2, 4, 6, 1, 3 | **[2, 5]**, 4, 6, 1, 3 |
| 2 | 4 | **[2, 5]**, 4, 6, 1, 3 | **[2, 4, 5]**, 6, 1, 3 |
| 3 | 6 | **[2, 4, 5]**, 6, 1, 3 | **[2, 4, 5, 6]**, 1, 3 |
| 4 | 1 | **[2, 4, 5, 6]**, 1, 3 | **[1, 2, 4, 5, 6]**, 3 |
| 5 | 3 | **[1, 2, 4, 5, 6]**, 3 | **[1, 2, 3, 4, 5, 6]** |

Tại mỗi dòng, vùng đậm **luôn** đã sắp xếp — đó là invariant được duy trì. Khi \`i = 6\` (loop thoát), vùng đậm là cả mảng \`[1,2,3,4,5,6]\`. ✓

> ❓ **Câu hỏi tự nhiên của người đọc.**
> - *"Tại sao i bắt đầu từ 1 chứ không phải 0?"* — Vì \`a[0..0]\` (một phần tử) hiển nhiên đã sắp xếp; bắt đầu từ \`i=1\` cho phép khởi tạo invariant "miễn phí". Nếu bắt đầu \`i=0\` thì vùng \`a[0..-1]\` rỗng — vẫn đúng (mảng rỗng đã sắp xếp), nhưng vòng đầu không làm gì.
> - *"Invariant có nói gì về \`a[i..n-1]\` không?"* — Không. Phần chưa xét có thể lộn xộn; invariant chỉ ràng buộc phần đã xử lý. Đó là cố ý — đủ mạnh để kết luận, đủ yếu để duy trì.

> 🔁 **Dừng lại tự kiểm tra.** Ở dòng \`i=4, key=1\`: vì sao \`1\` nhảy lên đầu mà \`[2,4,5,6]\` đều dời phải?
> <details><summary>Đáp án</summary>
> Vòng trong chạy \`while a[j] > key\`: \`6>1, 5>1, 4>1, 2>1\` đều đúng → cả 4 phần tử dời phải một ô, \`j\` về \`-1\`, đặt \`key\` vào \`a[0]\`. Invariant \`a[0..4]=[1,2,4,5,6]\` đã sắp xếp.
> </details>

> 📝 **Tóm tắt mục 3.** Insertion sort giữ invariant "\`a[0..i-1]\` đã sắp xếp". Init: 1 phần tử đã sắp. Maintenance: chèn đúng chỗ giữ thứ tự. Termination \`i=n\`: cả mảng sắp xếp.

---

## 4. Ví dụ 2 — Tìm phần tử lớn nhất (linear max)

Bài toán: tìm giá trị lớn nhất trong mảng \`a\` (giả sử \`len(a) ≥ 1\`).

### 4.1 Code Go với invariant

\`\`\`go
// Max trả về giá trị lớn nhất trong a (a không rỗng).
func Max(a []int) int {
	max := a[0]
	for i := 1; i < len(a); i++ {
		// INVARIANT: max == phần tử lớn nhất trong a[0..i-1].
		if a[i] > max {
			max = a[i]
		}
		// Sau vòng: max == lớn nhất trong a[0..i].
	}
	// THOÁT i == len(a): max == lớn nhất trong a[0..len-1] = cả mảng.
	return max
}
\`\`\`

### 4.2 Invariant và chứng minh

> **Invariant \`I(i)\`:** *Trước lần lặp \`i\`, biến \`max\` bằng phần tử lớn nhất trong \`a[0..i-1]\`.*

**Initialization (i = 1).** \`max = a[0]\`, và \`a[0..0]\` chỉ có \`a[0]\` → \`max\` là max của \`a[0..0]\`. ✓

**Maintenance.** Giả sử \`max\` = max(\`a[0..i-1]\`). Vòng so sánh \`a[i]\`:
- Nếu \`a[i] > max\`: gán \`max = a[i]\`. Khi đó max(\`a[0..i]\`) = max(max(\`a[0..i-1]\`), \`a[i]\`) = \`a[i]\` = \`max\` mới. ✓
- Ngược lại \`a[i] ≤ max\`: \`max\` không đổi, và max(\`a[0..i]\`) = \`max\` cũ vì \`a[i]\` không vượt qua. ✓

Cả hai trường hợp: sau vòng, \`max\` = max(\`a[0..i]\`) = \`I(i+1)\`. ✓

**Termination.** Dừng khi \`i = n\`. Invariant: \`max\` = max(\`a[0..n-1]\`) = max cả mảng → trả về đúng. ✓

### 4.3 Walk-through

\`a = [3, 7, 2, 9, 4]\`:

| i | a[i] | max trước (= max a[0..i-1]) | a[i] > max? | max sau |
|:-:|:----:|:---:|:---:|:---:|
| — | —  | 3 (khởi tạo, max a[0..0]) | — | 3 |
| 1 | 7  | 3 | có | 7 |
| 2 | 2  | 7 | không | 7 |
| 3 | 9  | 7 | có | 9 |
| 4 | 4  | 9 | không | 9 |

Thoát \`i=5\`: \`max = 9\` = max(\`a[0..4]\`). ✓ Thử thêm: \`[−5, −2, −9]\` → max = −2 ✓; \`[10]\` → loop không chạy, trả về \`a[0]=10\` ✓; \`[4, 4, 4]\` → max = 4 ✓ (≥4 ví dụ).

> ⚠ **Lỗi thường gặp.** Khởi tạo \`max := 0\` thay vì \`a[0]\` → sai với mảng toàn số âm (trả 0 thay vì giá trị âm lớn nhất). Khởi tạo từ phần tử thật của mảng là điều invariant "ép" bạn làm đúng.

> 📝 **Tóm tắt mục 4.** Invariant "\`max\` = max của tiền tố đã xét" đúng cả 3 phần; khởi tạo từ \`a[0]\` (không phải 0) để đúng với số âm.

---

## 5. Ví dụ 3 — Binary search

Bài toán: tìm \`target\` trong mảng \`a\` **đã sắp xếp tăng dần**; trả về chỉ số nếu có, \`−1\` nếu không.

### 5.1 Code Go với invariant

\`\`\`go
// BinarySearch tìm target trong a đã sắp tăng. Trả index hoặc -1.
func BinarySearch(a []int, target int) int {
	lo, hi := 0, len(a)-1
	for lo <= hi {
		// INVARIANT: NẾU target có trong a, thì nó nằm trong a[lo..hi].
		mid := lo + (hi-lo)/2 // tránh tràn số: KHÔNG dùng (lo+hi)/2
		switch {
		case a[mid] == target:
			return mid
		case a[mid] < target:
			lo = mid + 1 // target (nếu có) ở nửa phải
		default: // a[mid] > target
			hi = mid - 1 // target (nếu có) ở nửa trái
		}
	}
	// THOÁT lo > hi: khoảng [lo..hi] rỗng → target không tồn tại.
	return -1
}
\`\`\`

### 5.2 Invariant

> **Invariant \`I\`:** *Trước mỗi lần lặp, NẾU \`target\` xuất hiện trong \`a\`, thì nó nằm trong đoạn \`a[lo..hi]\`.*

### 5.3 Chứng minh partial correctness (đủ 3 phần)

**Initialization.** Trước vòng đầu, \`lo=0, hi=n−1\`, nên \`a[lo..hi]\` = cả mảng. Nếu \`target\` có trong \`a\`, hiển nhiên nó nằm trong cả mảng. ✓

**Maintenance.** Giả sử invariant đúng: nếu \`target\` tồn tại, nó ∈ \`a[lo..hi]\`. Vì \`a\` đã sắp xếp:
- \`a[mid] < target\`: mọi phần tử \`a[lo..mid]\` đều ≤ \`a[mid] < target\` (do sắp xếp) → \`target\` (nếu có) phải ở \`a[mid+1..hi]\`. Gán \`lo = mid+1\` giữ invariant. ✓
- \`a[mid] > target\`: tương tự, \`target\` (nếu có) ở \`a[lo..mid-1]\`. Gán \`hi = mid−1\`. ✓
- \`a[mid] == target\`: trả về \`mid\` ngay, không cần invariant nữa. ✓

**Termination (kết luận tại lúc dừng).** Nếu loop thoát qua điều kiện \`lo > hi\`, đoạn \`a[lo..hi]\` **rỗng**. Invariant nói "nếu target tồn tại thì nó ∈ đoạn rỗng" — vô lý → **target không tồn tại** → trả \`−1\` đúng. Nếu trả về sớm tại \`a[mid]==target\`, kết quả đúng theo định nghĩa. ✓

### 5.4 Chứng minh termination (loop thật sự DỪNG)

Phần 5.3 mới chỉ là partial correctness. Phải chứng minh loop không treo. **Variant: số phần tử trong đoạn $\\text{hi} - \\text{lo} + 1$.**

- Mỗi vòng (khi chưa tìm thấy) đều thực hiện \`lo = mid+1\` hoặc \`hi = mid−1\`, làm $\\text{hi} - \\text{lo}$ **giảm chặt** ít nhất 1 (vì $\\text{lo} \\leq \\text{mid} \\leq \\text{hi}$).
- Đại lượng $\\text{hi} - \\text{lo} + 1$ là số nguyên, **giảm chặt mỗi vòng**, và bị chặn dưới (khi nó về $\\leq 0$ thì $\\text{lo} > \\text{hi}$ → thoát).

Một số nguyên giảm chặt và có chặn dưới chỉ giảm được hữu hạn lần → loop dừng sau **tối đa** $\\sim \\log_2 n$ vòng. ✓

### 5.5 Walk-through

\`a = [1, 3, 5, 7, 9, 11, 13]\` (\`n=7\`), tìm \`target = 9\`:

| Vòng | lo | hi | mid | a[mid] | So với 9 | Hành động | Đoạn [lo..hi] (số phần tử) |
|:----:|:--:|:--:|:---:|:------:|:--------:|-----------|---|
| 1 | 0 | 6 | 3 | 7 | 7 < 9 | lo = 4 | [4..6] = {9,11,13} (3) |
| 2 | 4 | 6 | 5 | 11 | 11 > 9 | hi = 4 | [4..4] = {9} (1) |
| 3 | 4 | 4 | 4 | 9 | = | **trả về 4** | — |

Đoạn co lại: 7 → 3 → 1 (variant giảm chặt). Invariant "9 ∈ [lo..hi]" đúng mỗi vòng: {1..13} → {9,11,13} → {9}.

Tìm \`target = 8\` (không có): [0..6]→ a[3]=7<8 → [4..6]→ a[5]=11>8 → [4..4]→ a[4]=9>8 → hi=3, \`lo=4 > hi=3\` → thoát, trả \`−1\`. ✓

> ⚠ **Lỗi thường gặp (bug JDK huyền thoại).** \`mid := (lo + hi) / 2\`. Khi \`lo + hi\` vượt \`int\` max → **tràn số** → \`mid\` âm → panic/sai. Sửa: \`mid := lo + (hi - lo) / 2\`. Hai biểu thức bằng nhau về toán học nhưng cái sau **không bao giờ** vượt quá \`hi\`. Một chứng minh tính đúng đắn nghiêm túc sẽ buộc bạn hỏi "\`lo+hi\` có tràn không?".

> ❓ **Câu hỏi tự nhiên.**
> - *"Vì sao \`lo = mid + 1\` chứ không \`lo = mid\`?"* — Vì \`a[mid] < target\` nên \`mid\` chắc chắn không phải đáp án; loại nó luôn. Nếu để \`lo = mid\`, đoạn có thể **không co** khi \`lo, hi\` kề nhau → vòng lặp vô hạn (xem mục 10).
> - *"Có bao nhiêu biến thể binary search?"* — Nhiều (lower_bound, upper_bound, tìm cận). Mỗi biến thể cần invariant riêng. Sẽ học kỹ ở Tier 2.

> 🔁 **Dừng lại tự kiểm tra.** Với \`a=[2,4,6]\`, tìm \`5\`. Đoạn co thế nào, kết quả?
> <details><summary>Đáp án</summary>
> [0..2] mid=1 a[1]=4<5 → lo=2; [2..2] mid=2 a[2]=6>5 → hi=1; \`lo=2>hi=1\` thoát → −1. Đoạn: 3→1→0. ✓
> </details>

> 📝 **Tóm tắt mục 5.** Invariant "target ∈ [lo,hi] nếu tồn tại". 3 phần partial correctness + variant $\\text{hi}-\\text{lo}+1$ giảm chặt cho termination. Dùng \`lo+(hi-lo)/2\` tránh tràn.

---

## 6. Ví dụ 4 — Tổng và giai thừa (invariant đơn giản)

Hai loop tích lũy kinh điển — invariant ở đây "hiển nhiên" nhưng tập cho bạn phản xạ viết ra.

### 6.1 Tổng \`1 + 2 + ... + n\`

\`\`\`go
// SumTo trả về 1+2+...+n.
func SumTo(n int) int {
	sum := 0
	for i := 1; i <= n; i++ {
		// INVARIANT: sum == 0 + 1 + 2 + ... + (i-1)  (tổng các số < i)
		sum += i
		// Sau vòng: sum == 1+...+i
	}
	// THOÁT i == n+1: sum == 1+...+n.
	return sum
}
\`\`\`

> **Invariant:** *Trước lần lặp \`i\`, \`sum = 1 + 2 + ... + (i−1)\`* (quy ước tổng rỗng = 0).

- **Init (i=1):** \`sum = 0 =\` tổng rỗng (các số \`< 1\`). ✓
- **Maintenance:** giả sử \`sum = 1+...+(i−1)\`; sau \`sum += i\` thì \`sum = 1+...+i\` = invariant cho \`i+1\`. ✓
- **Termination (i = n+1):** \`sum = 1+...+(n+1−1) = 1+...+n\`. ✓

Kiểm nhanh: $n=5$ → 0,1,3,6,10,15 → trả 15 $= 5 \\cdot 6/2$. ✓ ($n=1$→1; $n=0$→ loop không chạy, trả 0; $n=3$→6.)

### 6.2 Giai thừa \`n!\`

\`\`\`go
// Factorial trả về n! (n >= 0). 0! = 1.
func Factorial(n int) int {
	f := 1
	for i := 1; i <= n; i++ {
		// INVARIANT: f == (i-1)!  (giai thừa của số ngay trước i)
		f *= i
		// Sau vòng: f == i!
	}
	// THOÁT i == n+1: f == n!.
	return f
}
\`\`\`

> **Invariant:** *Trước lần lặp \`i\`, \`f = (i−1)!\`* (với \`0! = 1\`).

- **Init (i=1):** \`f = 1 = 0! = (1−1)!\`. ✓
- **Maintenance:** \`f = (i−1)!\` → sau \`f *= i\` thì \`f = i!\`. ✓
- **Termination (i=n+1):** \`f = (n+1−1)! = n!\`. ✓

Kiểm: \`n=5\` → f: 1,1,2,6,24,120 → 120 ✓; \`n=0\`→1 (loop bỏ qua) ✓; \`n=1\`→1 ✓; \`n=4\`→24 ✓.

> 💡 **Trực giác.** Cả hai invariant đều có dạng "biến tích lũy chứa **đúng kết quả tính tới NGAY TRƯỚC \`i\`**". Nhận ra khuôn này giúp bạn viết invariant cho mọi loop tích lũy (tổng, tích, đếm, OR/AND bit...) gần như tự động.

> 📝 **Tóm tắt mục 6.** Loop tích lũy → invariant "biến chứa kết quả tới \`i−1\`". Init kiểm với phần tử rỗng/đơn vị; maintenance là một phép cập nhật; termination thay \`i = n+1\`.

---

## 7. Chứng minh quy nạp (induction) — bộ xương của invariant

> 💡 **Trực giác / Hình dung.** Quy nạp toán học = **hàng đô-mi-nô**: (1) đẩy ngã quân đầu tiên (base case); (2) chứng minh "quân \`k\` ngã → quân \`k+1\` ngã" (inductive step). Hai điều đó đủ kết luận **mọi** quân ngã. Loop invariant chỉ là quy nạp khoác áo lập trình: Initialization = đẩy quân đầu, Maintenance = "quân i ngã → quân i+1 ngã".

### 7.1 Khuôn quy nạp toán học

Để chứng minh mệnh đề $P(n)$ đúng với mọi số tự nhiên $n \\geq n_0$:

1. **Base case:** chứng minh $P(n_0)$ đúng.
2. **Inductive step:** giả sử $P(k)$ đúng (giả thiết quy nạp), chứng minh $P(k+1)$ đúng.

Kết luận: $P(n)$ đúng $\\forall n \\geq n_0$.

**Ví dụ số:** chứng minh $P(n): 1+2+...+n = n(n+1)/2$.
- Base $P(1)$: vế trái $= 1$, vế phải $= 1 \\cdot 2/2 = 1$. ✓
- Step: giả sử $P(k)$ đúng → $1+...+k = k(k+1)/2$. Khi đó $1+...+k+(k+1) = k(k+1)/2 + (k+1) = (k+1)(k+2)/2$, đúng dạng $P(k+1)$. ✓
- Verify cụ thể $n=4$: VT $=1+2+3+4=10$, VP $=4 \\cdot 5/2=10$. ✓

### 7.2 Liên hệ với loop invariant

| Quy nạp | Loop invariant |
|---------|----------------|
| Mệnh đề $P(k)$ | Invariant $I(i)$ đúng trước vòng $i$ |
| Base case $P(n_0)$ | **Initialization** (invariant đúng trước vòng đầu) |
| Inductive step $P(k) \\to P(k+1)$ | **Maintenance** ($I(i)$ đúng → $I(i+1)$ đúng) |
| Kết luận $P(n) \\,\\forall n$ | Invariant đúng ở **mọi** vòng, kể cả lúc thoát → **Termination** |

Nhìn lại insertion sort (mục 3): "Init" chứng minh $I(1)$, "Maintenance" chứng minh $I(i) \\to I(i+1)$. Theo nguyên lý quy nạp, $I(i)$ đúng với mọi $i$ từ 1 đến $n$ — bao gồm $I(n)$ lúc thoát. Đó **chính xác** là quy nạp.

> ⚠ **Lỗi thường gặp.** Chứng minh inductive step nhưng quên giả thiết quy nạp — biến nó thành chứng minh trực tiếp $P(k+1)$ từ con số 0 (thường bất khả). Inductive step **được phép dùng** $P(k)$ như đã đúng; đó là sức mạnh của quy nạp.

> 🔁 **Dừng lại tự kiểm tra.** Trong maintenance của Max (mục 4.2), đâu là "giả thiết quy nạp"?
> <details><summary>Đáp án</summary>
> "Giả sử \`max\` = max(\`a[0..i-1]\`)" — đó là \`I(i)\`, đóng vai trò \`P(k)\`. Từ đó suy ra \`I(i+1)\`.
> </details>

> 📝 **Tóm tắt mục 7.** Loop invariant *là* quy nạp: Init=base, Maintenance=inductive step. Luôn dùng giả thiết quy nạp ở bước inductive.

---

## 8. Termination proof — chứng minh thuật toán DỪNG

> 💡 **Trực giác / Hình dung.** Một thuật toán "đúng nếu dừng" mà không bao giờ dừng thì vô dụng. Làm sao chắc loop dừng? Tìm một **đồng hồ đếm ngược** không thể chạy lùi mãi: một đại lượng số nguyên (hoặc số tự nhiên) **giảm chặt mỗi vòng** và **có chặn dưới**. Đồng hồ đếm ngược từ một số hữu hạn về 0 thì phải dừng — không thể đếm ngược vô hạn.

### 8.1 Variant (đại lượng đo / measure)

**Variant** là một biểu thức $V$ (thường nhận giá trị số nguyên không âm) thỏa:

1. **Giảm chặt:** mỗi lần lặp, $V$ giảm ít nhất 1 ($V_\\text{sau} < V_\\text{trước}$).
2. **Chặn dưới:** $V \\geq 0$ (hoặc một hằng số nào đó) luôn đúng.

Vì $V$ là số nguyên giảm chặt và không xuống dưới 0, nó chỉ giảm được **hữu hạn** lần → loop dừng. (So sánh: invariant *không đổi* qua các vòng; variant *giảm dần*. Hai khái niệm bổ nhau.)

### 8.2 Variant cho các ví dụ đã gặp

| Thuật toán | Variant $V$ | Vì sao giảm | Chặn dưới |
|------------|-------------|-------------|-----------|
| Insertion sort (vòng ngoài) | $n - i$ | mỗi vòng \`i++\` | $\\geq 0$, dừng khi $=0$ |
| Binary search | $\\text{hi} - \\text{lo} + 1$ | mỗi vòng \`lo↑\` hoặc \`hi↓\` | $\\geq 0$, thoát khi $<1$ |
| Sum / Factorial | $n - i + 1$ | mỗi vòng \`i++\` | $\\geq 0$ |
| Euclid GCD | $b$ (số chia) | xem 8.3 | $\\geq 0$, dừng khi $=0$ |

### 8.3 Ví dụ — Euclid GCD

Thuật toán Euclid tìm ước chung lớn nhất: $\\gcd(a,b) = \\gcd(b, a \\bmod b)$, dừng khi $b = 0$.

\`\`\`go
// GCD trả về ước chung lớn nhất của a, b (a,b >= 0, không cùng 0).
func GCD(a, b int) int {
	for b != 0 {
		// INVARIANT: gcd(a, b) == gcd(a_gốc, b_gốc)  (UCLN bảo toàn)
		// VARIANT:   b giảm chặt mỗi vòng và b >= 0.
		a, b = b, a%b // a mod b luôn trong [0, b) => b mới < b cũ
	}
	// THOÁT b == 0: gcd(a, 0) == a => trả a.
	return a
}
\`\`\`

**Partial correctness — invariant $\\gcd(a,b)$ bất biến.** Nhờ định lý $\\gcd(a,b) = \\gcd(b, a \\bmod b)$: mỗi vòng thay $(a,b)$ bằng $(b, a \\bmod b)$ giữ nguyên gcd. Khi thoát $b=0$, $\\gcd(a,0)=a$ → trả $a$ đúng.

**Termination — variant $b$.** Sau gán, $b$ mới $= a \\bmod b$, mà $0 \\leq a \\bmod b < b$ (định nghĩa phép mod với $b>0$). Vậy $b$ **giảm chặt** mỗi vòng và **luôn $\\geq 0$**. Một số tự nhiên giảm chặt không thể giảm vô hạn → loop dừng. ✓

**Walk-through \`GCD(48, 18)\`:**

| Vòng | a | b (variant) | a mod b |
|:----:|:-:|:-----------:|:-------:|
| 1 | 48 | 18 | 48 mod 18 = 12 |
| 2 | 18 | 12 | 18 mod 12 = 6 |
| 3 | 12 | 6  | 12 mod 6 = 0 |
| 4 | 6  | 0  | — (thoát) |

$b$: 18 → 12 → 6 → 0 (giảm chặt). Trả $a = 6 = \\gcd(48,18)$. ✓ Verify thêm: \`GCD(17,5)\`: $b$ 5→2→1→0, trả 1 (nguyên tố cùng nhau) ✓; \`GCD(100,100)\`: $b$ 100→0, trả 100 ✓; \`GCD(12,0)\`: loop bỏ qua, trả 12 ✓.

> ⚠ **Lỗi thường gặp.** Quên termination khi loop điều kiện "phức tạp" (vd \`while x != 1\` trong bài Collatz) — không có variant hiển nhiên → **không** kết luận được nó dừng (Collatz là bài toán mở!). Có invariant đúng vẫn KHÔNG đảm bảo dừng.

> 🔁 **Dừng lại tự kiểm tra.** Variant của vòng \`for i := 0; i < n; i++\` là gì?
> <details><summary>Đáp án</summary>
> $V = n - i$, giảm 1 mỗi vòng (do \`i++\`), chặn dưới 0 (thoát khi $i=n$ → $V=0$).
> </details>

> 📝 **Tóm tắt mục 8.** Chứng minh dừng = tìm **variant**: số nguyên giảm chặt + có chặn dưới. Invariant (bất biến) lo phần đúng; variant (giảm dần) lo phần dừng. Euclid: variant là $b$.

---

## 9. Tính đúng của đệ quy — quy nạp mạnh trên kích thước input

> 💡 **Trực giác / Hình dung.** Một hàm đệ quy "tin tưởng chính nó": để giải bài cỡ \`n\`, nó gọi chính nó cho bài cỡ nhỏ hơn và **giả định lời gọi đó đã đúng**. Chứng minh tính đúng = chính thức hóa niềm tin này bằng **quy nạp trên kích thước input**: nếu hàm đúng với mọi input nhỏ hơn \`n\`, thì nó đúng với \`n\`.

### 9.1 Quy nạp mạnh (strong induction)

Khác quy nạp thường (giả định $P(k)$ để suy $P(k+1)$), **quy nạp mạnh** cho phép giả định $P(0), P(1), ..., P(k)$ *tất cả* để suy $P(k+1)$. Đệ quy thường cần quy nạp mạnh vì lời gọi con có thể nhảy tới input nhỏ tùy ý (vd \`power\` chia đôi $n$, không phải $n-1$).

Khuôn chứng minh hàm đệ quy \`f\` đúng với mọi input cỡ $n$:

1. **Base case:** \`f\` đúng với (các) trường hợp cơ sở (input nhỏ nhất, không đệ quy).
2. **Inductive step:** giả sử \`f\` đúng với **mọi** input cỡ $< n$; chứng minh \`f\` đúng với input cỡ $n$, **dùng** giả thiết đó cho các lời gọi đệ quy.

### 9.2 Ví dụ — \`power(x, n) = xⁿ\` bằng đệ quy chia đôi

\`\`\`go
// Power trả về x^n (n >= 0) bằng exponentiation by squaring.
func Power(x float64, n int) float64 {
	if n == 0 { // BASE CASE
		return 1
	}
	half := Power(x, n/2) // gọi đệ quy trên n/2 < n
	if n%2 == 0 {
		return half * half          // x^n = (x^(n/2))^2
	}
	return half * half * x          // n lẻ: thêm một thừa số x
}
\`\`\`

**Mệnh đề $P(n)$:** $\\text{Power}(x, n) = x^n$ với mọi $n \\geq 0$.

**Base case $n = 0$.** \`Power(x,0)\` trả $1 = x^0$. ✓

**Inductive step.** Giả sử $P(m)$ đúng với **mọi** $0 \\leq m < n$ (quy nạp mạnh). Vì $n/2 < n$ (chia nguyên, $n \\geq 1$), giả thiết cho $\\text{half} = \\text{Power}(x, n/2) = x^{n/2}$. Xét hai trường hợp:
- $n$ chẵn ($n = 2k$): trả $\\text{half} \\cdot \\text{half} = x^{n/2} \\cdot x^{n/2} = x^{n/2 + n/2} = x^n$. ✓
- $n$ lẻ ($n = 2k+1$, $n/2 = k$): trả $\\text{half} \\cdot \\text{half} \\cdot x = x^k \\cdot x^k \\cdot x = x^{2k+1} = x^n$. ✓

Vậy $P(n)$ đúng. Theo quy nạp mạnh, \`Power\` đúng $\\forall n \\geq 0$. ∎

**Termination của đệ quy.** Variant: kích thước $n$. Mỗi lời gọi giảm $n$ về $n/2 < n$, chặn dưới $0$ (base case). Số tự nhiên giảm chặt → đệ quy dừng sau $\\sim \\log_2 n$ lời gọi. ✓

**Verify số:** \`Power(2,10)\`: $=\\text{Power}(2,5)^2$; $\\text{Power}(2,5)=\\text{Power}(2,2)^2 \\cdot 2$; $\\text{Power}(2,2)=\\text{Power}(2,1)^2$; $\\text{Power}(2,1)=\\text{Power}(2,0)^2 \\cdot 2=1 \\cdot 1 \\cdot 2=2$; $\\text{Power}(2,2)=2 \\cdot 2=4$; $\\text{Power}(2,5)=4 \\cdot 4 \\cdot 2=32$; $\\text{Power}(2,10)=32 \\cdot 32=1024=2^{10}$. ✓ Thêm: \`Power(3,0)=1\` ✓; \`Power(5,1)=5\` ✓; \`Power(2,3)=8\` ✓.

> ❓ **Câu hỏi tự nhiên.**
> - *"Vì sao cần quy nạp MẠNH chứ không thường?"* — Vì lời gọi nhảy từ $n$ tới $n/2$, không phải $n-1$. Quy nạp thường chỉ cho giả định $P(n-1)$; ta cần $P(n/2)$. Quy nạp mạnh cho giả định *mọi* $m < n$ → bao gồm $n/2$.
> - *"Phải chứng minh termination riêng cho đệ quy không?"* — Có. Đúng kết quả (partial) và dừng là hai chuyện. Variant cho đệ quy chính là "kích thước input giảm về base case".

> 🔁 **Dừng lại tự kiểm tra.** Base case của đệ quy tương ứng phần nào của loop invariant?
> <details><summary>Đáp án</summary>
> Base case (đệ quy) ↔ Initialization (loop) ↔ base case (quy nạp). Cả ba là "điểm neo" để quy nạp khởi động.
> </details>

> 📝 **Tóm tắt mục 9.** Đệ quy đúng ⇐ quy nạp mạnh trên kích thước input: base = trường hợp cơ sở, step = giả định đúng cho input nhỏ hơn. Termination = kích thước input giảm về base.

---

## 10. Cạm bẫy

### 10.1 Off-by-one phá invariant

Một sai lệch chỉ số (\`<\` thay vì \`<=\`, \`i+1\` thay vì \`i\`) thường **phá maintenance** mà test sơ sài không phát hiện. Ví dụ Max sai:

\`\`\`go
func MaxBuggy(a []int) int {
	max := a[0]
	for i := 1; i < len(a)-1; i++ { // BUG: -1 thừa → bỏ sót a[len-1]
		if a[i] > max {
			max = a[i]
		}
	}
	return max
}
\`\`\`

Invariant "\`max\` = max(\`a[0..i-1]\`)" vẫn đúng *trong* loop, nhưng điều kiện dừng \`i < n−1\` khiến loop thoát ở $i = n-1$, lúc đó \`max\` = max(\`a[0..n−2]\`) — **bỏ sót \`a[n−1]\`**. Với \`[3,1,9]\` trả \`3\` thay vì \`9\`. Bài học: **kiểm điều kiện dừng có khớp invariant tại lúc thoát** không.

### 10.2 Điều kiện dừng sai → vòng lặp vô hạn

Binary search dùng \`lo = mid\` (thay vì \`mid+1\`) khi \`a[mid] < target\`:

\`\`\`go
// SAI — có thể lặp vô hạn
for lo < hi {
	mid := lo + (hi-lo)/2
	if a[mid] < target {
		lo = mid // BUG: khi hi = lo+1, mid = lo => lo không đổi => kẹt
	} else {
		hi = mid
	}
}
\`\`\`

Khi $\\text{hi} = \\text{lo} + 1$: $\\text{mid} = \\text{lo} + (1)/2 = \\text{lo}$. Nếu \`a[mid] < target\`, \`lo = mid = lo\` → **variant $\\text{hi} - \\text{lo}$ không giảm** → vòng lặp vô hạn. Đây là minh chứng vì sao **phải chứng minh variant giảm CHẶT** (mục 8): nếu không chứng minh được variant giảm, rất có thể loop treo.

### 10.3 Invariant chọn sai

| Loại lỗi | Hậu quả | Ví dụ |
|----------|---------|-------|
| **Quá yếu** | Đến lúc thoát vẫn không suy ra được kết quả | Insertion sort dùng invariant "a[0] là phần tử nhỏ nhất từng thấy" — đúng nhưng vô dụng, không kết luận "cả mảng đã sắp". |
| **Quá mạnh** | Không đúng ở Init hoặc không maintain nổi | Invariant "cả mảng \`a[0..n-1]\` đã sắp xếp" cho insertion sort — sai ngay từ vòng đầu (mảng chưa sắp), maintenance bất khả. |
| **Sai bản chất** | Đúng vài vòng rồi vỡ | "max = a[i]" (thay vì max a[0..i-1]) — vỡ ngay khi \`a[i]\` không phải max. |

**Cách chọn invariant đúng:** xuất phát từ *kết quả mong muốn lúc thoát*, "tua ngược" xem trạng thái nào phải đúng ở mỗi vòng để dẫn tới kết quả đó. Insertion sort muốn "cả mảng sắp xếp lúc \`i=n\`" → invariant tự nhiên là "\`a[0..i-1]\` sắp xếp".

> ⚠ **Lỗi thường gặp tổng hợp.**
> 1. Chứng minh partial correctness, quên termination (loop có thể treo).
> 2. Off-by-one trong điều kiện dừng (\`<\` vs \`<=\`) phá kết luận lúc thoát.
> 3. Dùng \`(lo+hi)/2\` → tràn số (bug JDK).
> 4. Variant không giảm chặt → vô hạn.
> 5. Invariant quá mạnh (sai Init) hoặc quá yếu (vô dụng).

> 📝 **Tóm tắt mục 10.** Off-by-one phá invariant lúc thoát; điều kiện cập nhật sai làm variant không giảm → treo; invariant phải đủ mạnh để kết luận và đủ yếu để duy trì. Suy invariant từ kết quả mong muốn ngược về.

---

## 11. Ứng dụng thực tế trong phần mềm

> 💡 **Invariant không chỉ để chứng minh thuật toán trên giấy — nó là cách kỹ sư viết code đúng và bắt bug.** Mọi hệ thống đáng tin đều dựa trên các bất biến được giữ vững.

| Ứng dụng | Invariant đóng vai trò gì |
|----------|---------------------------|
| **\`assert\` / precondition / postcondition** | Khẳng định invariant tại runtime → bug lộ ngay tại nguồn |
| **Database constraint (UNIQUE, FK, CHECK)** | Invariant ở tầng dữ liệu: "email không trùng", "balance ≥ 0" |
| **Transaction ACID** | Invariant "tổng tiền không đổi khi chuyển khoản" giữ qua commit/rollback |
| **Property-based testing (QuickCheck, jqwik)** | Test rằng invariant đúng với hàng nghìn input ngẫu nhiên |
| **Loop bug (off-by-one)** | Phân tích invariant vòng lặp = cách tìm ra lỗi biên |

### 11.1. Ví dụ cụ thể — invariant trong chuyển khoản ngân hàng

Chuyển 100k từ A sang B phải giữ invariant **tổng số dư không đổi** (\`A + B\` trước = sau). Nếu trừ A xong mà crash trước khi cộng B → invariant vỡ → mất tiền. Database **transaction** đảm bảo: hoặc cả hai thao tác xảy ra (commit), hoặc không gì cả (rollback) → invariant luôn đúng ở trạng thái nhìn thấy được. Đây chính là chữ **C (Consistency)** trong ACID.

> ❓ **"Assert có nên để trong production không?"** Tùy. Assert chặn invariant nội bộ (lỗi lập trình) thường tắt ở production vì hiệu năng; nhưng validate input người dùng và database constraint **luôn bật** — vì đó là invariant về dữ liệu, không phải về code. Phân biệt: lỗi-của-tôi (assert, dev) vs dữ liệu-không-hợp-lệ (validate, luôn).

### 11.2. 📝 Tóm tắt mục 11

- Invariant thật trong: **assert/pre-postcondition**, **DB constraint**, **transaction ACID**, **property-based testing**, gỡ **off-by-one**.
- Ví dụ ACID: transaction giữ "tổng tiền không đổi" qua commit/rollback.
- Assert (lỗi code) có thể tắt ở prod; validate/constraint (dữ liệu) luôn bật.

## Bài tập

> Tự làm trước khi xem lời giải. Mỗi bài đều có lời giải chi tiết bên dưới.

1. **Loop invariant cho bubble sort.** Viết invariant cho vòng ngoài của bubble sort (sau pass thứ \`k\`, các phần tử lớn nhất đã "nổi" về cuối). Chứng minh đủ 3 phần.
2. **Binary search — đúng & dừng.** Chứng minh đầy đủ partial correctness (3 phần invariant) và termination (variant) cho \`BinarySearch\` ở mục 5.
3. **Tìm invariant cho thuật toán cho sẵn.** Cho đoạn code đếm số phần tử bằng \`target\` (xem lời giải). Viết invariant, chứng minh 3 phần.
4. **Chứng minh GCD dừng.** Chứng minh Euclid GCD dừng với mọi \`a ≥ 0, b ≥ 0\` (không cùng 0). Xác định variant rõ ràng.
5. **Sửa off-by-one phá invariant.** Cho hàm \`SumArrayBuggy\` có off-by-one. Chỉ ra invariant bị phá ở đâu, sửa, chứng minh lại.
6. **Chứng minh \`power(x,n)\` đúng bằng quy nạp.** Chứng minh đầy đủ tính đúng của \`Power\` (mục 9) bằng quy nạp mạnh, và chứng minh nó dừng.
7. **(Nâng cao) Reverse mảng tại chỗ.** Viết invariant cho thuật toán đảo mảng hai con trỏ; chứng minh 3 phần + termination.

---

## Lời giải chi tiết

### Bài 1 — Loop invariant cho bubble sort

\`\`\`go
func BubbleSort(a []int) {
	n := len(a)
	for k := 0; k < n-1; k++ {
		// INVARIANT (vòng ngoài): a[n-k .. n-1] chứa k phần tử LỚN NHẤT
		// của mảng, đã sắp xếp đúng vị trí cuối cùng.
		for j := 0; j < n-1-k; j++ {
			if a[j] > a[j+1] {
				a[j], a[j+1] = a[j+1], a[j]
			}
		}
	}
}
\`\`\`

> **Invariant \`I(k)\`:** *Trước pass thứ \`k\` (k = 0,1,...), đoạn \`a[n−k .. n−1]\` chứa đúng \`k\` phần tử lớn nhất của cả mảng, đã ở đúng vị trí sắp xếp cuối cùng; và mọi phần tử trong \`a[0..n−k−1]\` đều ≤ mọi phần tử trong \`a[n−k..n−1]\`.*

**Cách tiếp cận.** Mỗi pass của vòng trong "đẩy" phần tử lớn nhất của vùng chưa sắp về cuối vùng đó (giống bọt khí nổi lên).

**Initialization (k = 0).** Đoạn \`a[n..n−1]\` rỗng → "0 phần tử lớn nhất đã đúng chỗ" đúng tầm thường; điều kiện "≤" cũng đúng tầm thường (vế phải rỗng). ✓

**Maintenance.** Giả sử \`I(k)\`: \`a[n−k..n−1]\` là \`k\` phần tử lớn nhất đã sắp. Vòng trong duyệt \`j = 0..n−2−k\`, mỗi bước hoán đổi nếu \`a[j] > a[j+1]\`, đẩy phần tử lớn nhất của \`a[0..n−1−k]\` về vị trí \`a[n−1−k]\`. Sau pass: \`a[n−1−k]\` chứa phần tử lớn nhất của vùng chưa sắp, nối với \`k\` phần tử cũ → \`a[n−1−k..n−1]\` là \`k+1\` phần tử lớn nhất đã sắp = \`I(k+1)\`. ✓

**Termination.** Vòng ngoài dừng khi $k = n-1$. Invariant: \`a[1..n−1]\` là $n-1$ phần tử lớn nhất đã sắp; phần còn lại \`a[0]\` $\\leq$ tất cả chúng → \`a[0]\` là nhỏ nhất, đặt đúng chỗ. Cả mảng đã sắp xếp. ✓ (Variant vòng ngoài: $n-1-k$, giảm chặt, chặn dưới 0.)

### Bài 2 — Binary search đúng & dừng

Đây là tổng hợp mục 5.3 + 5.4. **Partial correctness** qua invariant "nếu target tồn tại thì ∈ \`a[lo..hi]\`":
- *Init:* \`[lo,hi]=[0,n−1]\` = cả mảng. ✓
- *Maintenance:* mảng sắp xếp → \`a[mid]<target\` loại nửa trái (\`lo=mid+1\`), \`a[mid]>target\` loại nửa phải (\`hi=mid−1\`), giữ invariant. ✓
- *Termination:* thoát \`lo>hi\` → đoạn rỗng → target không tồn tại → trả \`−1\`; hoặc trả \`mid\` khi khớp. ✓

**Termination (dừng):** variant $V = \\text{hi} - \\text{lo} + 1$, số nguyên $\\geq 0$, giảm chặt mỗi vòng (vì \`lo↑\` hoặc \`hi↓\`, và $\\text{lo} \\leq \\text{mid} \\leq \\text{hi}$) → dừng sau $\\leq \\lfloor \\log_2 n \\rfloor + 1$ vòng. ✓ Độ phức tạp: $\\boldsymbol{O(\\log n)}$ thời gian, $\\boldsymbol{O(1)}$ bộ nhớ.

### Bài 3 — Tìm invariant cho thuật toán cho sẵn

\`\`\`go
// CountEqual đếm số phần tử của a bằng target.
func CountEqual(a []int, target int) int {
	cnt := 0
	for i := 0; i < len(a); i++ {
		// INVARIANT: cnt == số phần tử bằng target trong a[0..i-1].
		if a[i] == target {
			cnt++
		}
	}
	return cnt
}
\`\`\`

> **Invariant \`I(i)\`:** *Trước lần lặp \`i\`, \`cnt\` = số phần tử bằng \`target\` trong \`a[0..i−1]\`.*

- **Init (i=0):** \`cnt = 0\`, \`a[0..−1]\` rỗng → 0 phần tử bằng target. ✓
- **Maintenance:** giả sử \`cnt\` đếm đúng \`a[0..i−1]\`. Nếu \`a[i]==target\` thì \`cnt++\` → đếm đúng \`a[0..i]\`; ngược lại \`cnt\` giữ nguyên, vẫn đúng \`a[0..i]\`. = \`I(i+1)\`. ✓
- **Termination (i=n):** \`cnt\` = số phần tử bằng target trong \`a[0..n−1]\` = cả mảng. ✓

Variant $n - i$ (giảm chặt). Verify \`[1,2,1,3,1]\`, target 1: cnt 0→1→1→2→2→3 → trả 3 ✓.

### Bài 4 — Chứng minh GCD dừng

Xem mục 8.3. **Variant:** giá trị $b$. Sau gán \`a, b = b, a%b\`, giá trị mới của $b$ là $a \\bmod b$ ($b$ cũ), thỏa $0 \\leq a \\bmod b < b$ với $b > 0$. Vậy mỗi vòng $b$ giảm **chặt** ít nhất 1 và luôn $\\geq 0$. Một dãy số tự nhiên giảm chặt là **hữu hạn** (không tồn tại dãy giảm vô hạn trong $\\mathbb{N}$ — well-ordering principle) → loop chạy hữu hạn vòng → dừng. ∎ Số vòng $\\leq O(\\log \\min(a,b))$ (định lý Lamé). Trường hợp đặc biệt: nếu $b=0$ ngay từ đầu, loop bỏ qua, dừng tức thì.

### Bài 5 — Sửa off-by-one phá invariant

\`\`\`go
// BUGGY
func SumArrayBuggy(a []int) int {
	sum := 0
	for i := 1; i <= len(a); i++ { // BUG: i bắt đầu 1, dùng a[i] sẽ vượt mảng
		sum += a[i] // panic index out of range khi i = len(a); và bỏ a[0]
	}
	return sum
}
\`\`\`

**Invariant mong muốn:** "\`sum\` = tổng \`a[0..i−1]\`". Khởi tạo \`i=1\` ngụ ý "đã cộng \`a[0]\`" — nhưng \`sum=0\` chưa cộng \`a[0]\` → **Init sai ngay** (invariant nói \`sum\`=tổng \`a[0..0]\`=\`a[0]\`, thực tế \`sum=0\`). Đồng thời \`i <= len(a)\` cho \`i\` chạm \`len(a)\` → \`a[len(a)]\` vượt biên → panic.


**Sửa:**

\`\`\`go
func SumArray(a []int) int {
	sum := 0
	for i := 0; i < len(a); i++ {
		// INVARIANT: sum == tổng a[0..i-1].
		sum += a[i]
	}
	return sum // sum == tổng a[0..len-1]
}
\`\`\`

- *Init (i=0):* \`sum=0\` = tổng rỗng \`a[0..−1]\`. ✓
- *Maintenance:* \`sum\`=tổng \`a[0..i−1]\` → sau \`sum+=a[i]\` = tổng \`a[0..i]\`. ✓
- *Termination (i=n):* \`sum\` = tổng cả mảng. ✓ Không còn truy cập ngoài biên.

### Bài 6 — \`power(x,n)\` đúng bằng quy nạp + dừng

Xem mục 9.2 đầy đủ. Tóm tắt: **quy nạp mạnh** trên $n$.
- *Base $n=0$:* trả $1 = x^0$. ✓
- *Step:* giả sử đúng $\\forall m < n$. $\\text{half} = \\text{Power}(x,n/2) = x^{n/2}$ (vì $n/2<n$). $n$ chẵn: trả $\\text{half}^2 = x^n$; $n$ lẻ: trả $\\text{half}^2 \\cdot x = x^{2\\lfloor n/2 \\rfloor+1} = x^n$. ✓
- *Dừng:* variant $n$ giảm về $n/2 < n$, chặn dưới 0 (base) → $\\sim \\log_2 n$ lời gọi, dừng. ✓

### Bài 7 — Reverse mảng tại chỗ

\`\`\`go
func Reverse(a []int) {
	lo, hi := 0, len(a)-1
	for lo < hi {
		// INVARIANT: các phần tử a[0..lo-1] và a[hi+1..n-1] ĐÃ ở vị trí
		// đảo đúng (đã hoán đổi); phần a[lo..hi] giữ nguyên thứ tự gốc.
		a[lo], a[hi] = a[hi], a[lo]
		lo++
		hi--
	}
}
\`\`\`

> **Invariant:** *Trước mỗi vòng, mọi cặp đối xứng nằm ngoài \`[lo,hi]\` (tức \`a[0..lo−1]\` và \`a[hi+1..n−1]\`) đã được hoán đổi đúng vị trí đảo; đoạn \`a[lo..hi]\` chưa động tới.*

- **Init:** \`lo=0, hi=n−1\` → vùng ngoài rỗng → đúng tầm thường. ✓
- **Maintenance:** hoán đổi \`a[lo]↔a[hi]\` (cặp đối xứng ngoài cùng còn lại), rồi \`lo++, hi--\`. Cặp vừa đổi giờ thuộc vùng "đã đảo đúng" → invariant đúng cho vòng sau. ✓
- **Termination:** thoát khi \`lo ≥ hi\`. Nếu \`lo > hi\`: mọi cặp đã đảo (n chẵn). Nếu \`lo == hi\`: phần tử giữa (n lẻ) tự đối xứng, không cần đổi. Cả mảng đã đảo. ✓
- **Variant:** $\\text{hi} - \\text{lo}$, giảm 2 mỗi vòng, chặn dưới (thoát khi $\\leq 0$) → dừng sau $\\lfloor n/2 \\rfloor$ vòng. ✓

Verify \`[1,2,3,4]\`: (lo0,hi3)→[4,2,3,1]; (lo1,hi2)→[4,3,2,1]; lo2≥hi1 thoát → \`[4,3,2,1]\` ✓. \`[1,2,3]\`: (0,2)→[3,2,1]; lo1=hi1 thoát → \`[3,2,1]\` ✓.

---

## Độ phức tạp tổng hợp

| Thuật toán | Time | Space | Variant (chứng minh dừng) |
|------------|------|-------|---------------------------|
| Insertion sort | $O(n^2)$ worst, $O(n)$ best | $O(1)$ | $n - i$ |
| Linear max | $O(n)$ | $O(1)$ | $n - i$ |
| Binary search | $O(\\log n)$ | $O(1)$ | $\\text{hi} - \\text{lo} + 1$ |
| Sum / Factorial | $O(n)$ | $O(1)$ | $n - i + 1$ |
| Euclid GCD | $O(\\log \\min(a,b))$ | $O(1)$ | $b$ |
| Power (chia đôi) | $O(\\log n)$ | $O(\\log n)$ stack | $n$ |
| Reverse | $O(n)$ | $O(1)$ | $\\text{hi} - \\text{lo}$ |

---

## Code & Minh họa

- Toàn bộ code Go ở trên là **inline, chạy được** — copy vào file \`.go\` với \`package main\` là build được (lĩnh vực Algorithms để code inline, không tách \`solutions.go\`).
- **[visualization.html](./visualization.html)** — 3 module tương tác:
  1. **Insertion sort invariant** — animate sort, tô sáng vùng \`a[0..i-1]\` thỏa invariant từng bước.
  2. **Binary search invariant** — animate, hiện đoạn \`[lo,hi]\` co lại + invariant "target ∈ [lo,hi]".
  3. **Termination tracker** — chọn loop, hiện variant giảm dần tiến tới chặn dưới.

---

## Tóm tắt cả bài

- **Test ≠ chứng minh.** Test cho thấy *có* bug; chứng minh cho thấy *không* bug.
- **Tính đúng đắn = partial correctness + termination.**
- **Loop invariant** (3 phần: Init / Maintenance / Termination) là cách cơ học chứng minh partial correctness — chính là **quy nạp** khoác áo loop.
- **Variant** (đại lượng số nguyên giảm chặt + chặn dưới) chứng minh thuật toán **dừng**.
- **Đệ quy** đúng ⇐ **quy nạp mạnh** trên kích thước input; dừng ⇐ kích thước giảm về base case.
- Cạm bẫy: off-by-one phá invariant lúc thoát, điều kiện cập nhật sai làm variant không giảm (vô hạn), invariant quá mạnh/quá yếu, quên termination, tràn số \`(lo+hi)/2\`.

## Bài tiếp theo

→ [Lesson 05 — Brute-force → Tối ưu](../lesson-05-bruteforce-to-optimize/README.md): từ lời giải "thô" đúng-nhưng-chậm, tinh chỉnh dần thành thuật toán hiệu quả — mỗi bước tối ưu phải **giữ tính đúng đắn** (invariant không đổi).

## Tham khảo

- Cormen, Leiserson, Rivest, Stein — *Introduction to Algorithms* (CLRS), Ch. 2 (loop invariants), Appendix về induction.
- Dijkstra — *A Discipline of Programming* (gốc của variant/invariant reasoning).
- [Lesson 03 — Đệ quy & Recurrence](../lesson-03-recursion-recurrence/README.md) cho nền tảng đệ quy.
`;
