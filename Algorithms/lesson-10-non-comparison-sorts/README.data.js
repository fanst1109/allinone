// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: Algorithms/lesson-10-non-comparison-sorts/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 10 — Non-comparison Sorts (Counting, Radix, Bucket)

> Tier 1 — Sắp xếp · Lesson 10

Các thuật toán sắp xếp ta đã học (merge sort, quicksort, heap sort) đều thuộc nhóm **comparison sort** — chúng quyết định thứ tự bằng cách **so sánh từng cặp phần tử** (\`a < b ?\`). Bài này trả lời một câu hỏi nền tảng và mở ra một thế giới khác:

> **Liệu có thể sort nhanh hơn $O(n \\log n)$ không?** Câu trả lời: **với comparison sort thì KHÔNG** (có chứng minh chặt dưới đây). Nhưng nếu ta **không dùng so sánh** mà dùng chính giá trị làm chỉ số, ta có thể đạt $O(n)$ — với điều kiện nhất định.

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Chứng minh được **giới hạn dưới $\\Omega(n \\log n)$** cho mọi comparison sort bằng mô hình *decision tree* (cây quyết định).
- Hiểu ý tưởng "phá rào": **dùng giá trị làm index/digit** thay vì so sánh.
- Cài đặt được 3 thuật toán non-comparison: **counting sort**, **radix sort (LSD)**, **bucket sort** — code Go inline, biên dịch chạy được.
- Biết **khi nào dùng / khi nào KHÔNG** từng thuật toán, dựa trên range giá trị, phân phối, và bộ nhớ.
- Nhận diện các **cạm bẫy** thực tế: out-of-memory với range lớn, base sai cho radix, phân phối lệch phá bucket, quên stability.

## Kiến thức tiền đề

- [Lesson 07 — Merge Sort](../lesson-07-merge-sort/) và [Lesson 08 — Quicksort](../lesson-08-quicksort/): hiểu comparison sort $O(n \\log n)$.
- [Lesson 09 — Heap Sort](../lesson-09-heap-sort/): thêm một comparison sort $O(n \\log n)$ tại chỗ.
- Big-O cơ bản (Tier 0): $O(n)$, $O(n \\log n)$, $O(k)$, ký hiệu $\\Omega$ (giới hạn dưới).
- Khái niệm **stability (tính ổn định)** của sort: hai phần tử bằng nhau giữ nguyên thứ tự tương đối ban đầu.

---

## 1. Giới hạn dưới của comparison sort — vì sao không thể nhanh hơn \`Ω(n log n)\`

> 💡 **Trực giác / Hình dung.** Hãy tưởng tượng bạn chơi trò "đoán hoán vị": có một mảng $n$ phần tử bị xáo trộn theo một trong $n!$ cách. Mỗi lần bạn được hỏi "phần tử ở vị trí $i$ có lớn hơn phần tử ở vị trí $j$ không?" — câu trả lời chỉ **có/không** (1 bit thông tin). Để xác định chính xác **một** trong $n!$ hoán vị, bạn cần đủ số câu hỏi để phân biệt $n!$ khả năng. Mỗi câu hỏi nhị phân chia đôi không gian khả năng → cần ít nhất $\\log_2(n!)$ câu hỏi. Đó chính là số phép so sánh tối thiểu.

### 1.1 Mô hình decision tree (cây quyết định)

Bất kỳ comparison sort nào cũng có thể vẽ thành một **cây nhị phân**:

- Mỗi **nút trong** = một phép so sánh \`a[i] < a[j] ?\`.
- Hai nhánh con = kết quả \`yes\` / \`no\`.
- Mỗi **lá** = một hoán vị đầu ra (một thứ tự sắp xếp cụ thể).

Vì thuật toán phải có khả năng sort **mọi** mảng đầu vào, cây phải chứa **đủ tất cả $n!$ hoán vị** ở các lá. (Nếu thiếu một hoán vị nào đó, sẽ có một đầu vào mà thuật toán sort sai.)

\`\`\`
            a[0] < a[1] ?
           /            \\
        yes              no
         /                \\
   a[1] < a[2]?        a[0] < a[2]?
     /     \\             /     \\
  [012]  a[0]<a[2]?   [102]   ...
          /    \\
       [021]  [201]
\`\`\`

(Cây cho $n = 3$ có $3! = 6$ lá: \`[012],[021],[102],[120],[201],[210]\`.)

### 1.2 Chứng minh \`Ω(n log n)\` — từng bước, không lươn lẹo

**Bổ đề.** Một cây nhị phân có chiều cao $h$ (số cạnh dài nhất từ gốc tới lá) có **tối đa $2^h$ lá**.

*Chứng minh bổ đề:* Quy nạp theo $h$. $h = 0$: cây chỉ có 1 lá $= 2^0$. ✓. Giả sử cây cao $h-1$ có $\\leq 2^{h-1}$ lá. Cây cao $h$ = gốc + 2 cây con cao $\\leq h-1$, mỗi cây con $\\leq 2^{h-1}$ lá → tổng $\\leq 2 \\cdot 2^{h-1} = 2^h$ lá. ✓

**Áp dụng.** Cây phải có **ít nhất $n!$ lá** (mọi hoán vị xuất hiện). Gọi $h$ là chiều cao = **số phép so sánh trong trường hợp xấu nhất**. Theo bổ đề:

\`\`\`
n!  ≤  số lá  ≤  2^h
\`\`\`

Lấy $\\log_2$ hai vế (log đơn điệu tăng nên giữ chiều bất đẳng thức):

\`\`\`
h  ≥  log₂(n!)
\`\`\`

**Ước lượng $\\log_2(n!)$.** Dùng cận dưới đơn giản (không cần Stirling): trong tích $n! = 1 \\cdot 2 \\cdot 3 \\cdots n$, **nửa lớn** gồm $n/2$ thừa số, mỗi thừa số $\\geq n/2$:

\`\`\`
n!  ≥  (n/2) · (n/2) · ... · (n/2)   [n/2 thừa số]
    =  (n/2)^(n/2)
\`\`\`

Lấy log:

\`\`\`
log₂(n!)  ≥  (n/2) · log₂(n/2)  =  (n/2)(log₂ n − 1)  =  Ω(n log n)
\`\`\`

**Kết luận.** Mọi comparison sort thực hiện **ít nhất $\\Omega(n \\log n)$** phép so sánh trong worst case. Merge sort / heap sort đạt $O(n \\log n)$ → **tối ưu** trong lớp comparison sort. Không thuật toán so sánh nào phá được rào này.

> 🔢 **Walk-through bằng số.** Với $n = 5$: $5! = 120$. $\\log_2(120) \\approx 6{,}9$ → cần **≥ 7 phép so sánh** để sort 5 phần tử bất kỳ. Kiểm chứng: thuật toán sort 5 phần tử tốt nhất biết được cần đúng 7 so sánh worst-case → khớp $\\lceil \\log_2 120 \\rceil = 7$. Với $n = 10$: $10! = 3\\,628\\,800$, $\\log_2 \\approx 21{,}8$ → ≥ 22 so sánh. Với $n = 100$: $\\log_2(100!) \\approx 524$ so sánh tối thiểu.

> ⚠ **Lỗi thường gặp.** "Lower bound này nói sort luôn cần $n \\log n$" — **SAI**. Nó chỉ áp dụng cho **comparison sort** (sort bằng so sánh). Counting/radix/bucket KHÔNG dựa trên so sánh nên KHÔNG bị rào này chặn → có thể $O(n)$. Rào $\\Omega(n \\log n)$ là rào của **một mô hình tính toán cụ thể**, không phải của "bài toán sort" nói chung.

> 🔁 **Dừng lại tự kiểm tra.**
> 1. Vì sao cây quyết định phải có ít nhất $n!$ lá?
> 2. Với $n = 8$, số so sánh tối thiểu là bao nhiêu?
>
> <details><summary>Đáp án</summary>
>
> 1. Vì thuật toán phải sort đúng **mọi** trong $n!$ thứ tự đầu vào khả dĩ; mỗi đầu vào dẫn tới một lá khác nhau (đường so sánh khác nhau), nên cần đủ $n!$ lá. Thiếu lá nào → có đầu vào sort sai.
> 2. $8! = 40320$, $\\log_2(40320) \\approx 15{,}3$ → tối thiểu **16** so sánh ($\\lceil 15{,}3 \\rceil$).
> </details>

> 📝 **Tóm tắt mục 1.**
> - Mọi comparison sort = một decision tree với ≥ $n!$ lá.
> - Cây cao $h$ có $\\leq 2^h$ lá → $h \\geq \\log_2(n!) = \\Omega(n \\log n)$.
> - Rào $\\Omega(n \\log n)$ **chỉ** áp dụng cho sort bằng so sánh. Đó là lý do merge/heap sort là tối ưu trong lớp đó.
> - Muốn nhanh hơn → phải **không so sánh**.

---

## 2. Phá rào — dùng giá trị làm index thay vì so sánh

> 💡 **Trực giác / Hình dung.** Tưởng tượng bạn phải xếp 1000 lá phiếu, mỗi lá ghi một số từ 0 đến 9. Bạn KHÔNG cần so sánh từng cặp. Bạn chỉ cần **10 cái hộp** đánh số 0–9, ném mỗi lá vào hộp tương ứng với số trên nó, rồi đọc các hộp theo thứ tự 0,1,...,9. Xong! Không một phép so sánh nào. Đây chính là ý tưởng counting/radix/bucket: **giá trị tự nó chỉ ra vị trí**.

Rào $\\Omega(n \\log n)$ chỉ chặn việc "quyết định thứ tự bằng so sánh". Nếu ta thay đổi mô hình:

- **Counting sort**: dùng giá trị \`v\` làm **chỉ số mảng đếm** \`count[v]\`.
- **Radix sort**: dùng từng **chữ số (digit)** làm khóa, sort lặp.
- **Bucket sort**: dùng giá trị để chọn **bucket** (rổ) theo range.

Điều kiện để đạt $O(n)$: **giá trị phải bị giới hạn** (range nhỏ, số digit cố định, hoặc phân phối đều). Khi range vô hạn / khổng lồ, các thuật toán này mất ưu thế (xem mục 7).

> ❓ **Câu hỏi tự nhiên của người đọc.**
> - *"Nếu không so sánh thì sao biết cái nào lớn hơn?"* → Ta không cần biết "lớn hơn". Ta dùng giá trị **trực tiếp làm địa chỉ**: số 5 đi vào ô số 5. Khi đọc các ô theo thứ tự tăng dần của địa chỉ, thứ tự đã đúng.
> - *"Vậy sao không dùng nó cho mọi sort?"* → Vì nó cần giá trị nằm trong một dải hữu hạn nhỏ. Sort tên người (chuỗi tùy ý), số thực bất kỳ, object phức tạp → khó/không áp dụng trực tiếp. Comparison sort tổng quát hơn.

---

## 3. Counting Sort — đếm tần suất

> 💡 **Trực giác / Hình dung.** Như chấm bài thi 100 học sinh, điểm từ 0–10. Bạn không xếp từng bài; bạn **đếm**: bao nhiêu bài 0 điểm, bao nhiêu 1 điểm, ... Rồi viết kết quả: in \`count[0]\` số 0, \`count[1]\` số 1, ... Đó là counting sort ở dạng đơn giản nhất.

### 3.1 Ý tưởng & 3 bước

1. **Đếm tần suất**: \`count[v]\` = số lần giá trị \`v\` xuất hiện.
2. **Prefix sum (cộng dồn)**: biến \`count[v]\` thành "vị trí cuối + 1" của giá trị \`v\` trong mảng output. Sau bước này \`count[v]\` = số phần tử ≤ \`v\`.
3. **Đặt vào output**: duyệt mảng gốc **từ phải sang trái** (để **ổn định**), với mỗi \`x\`, đặt vào \`output[count[x] − 1]\` rồi giảm \`count[x]\`.

$k$ = số giá trị khác nhau khả dĩ (range). Độ phức tạp **$O(n + k)$** thời gian, **$O(n + k)$** bộ nhớ.

### 3.2 Walk-through chi tiết — \`[4, 2, 2, 8, 3, 3, 1]\`, \`k = 9\` (giá trị 0..8)

**Mảng gốc** (index 0..6): \`A = [4, 2, 2, 8, 3, 3, 1]\`, \`n = 7\`.

**Bước 1 — Đếm.** Quét mảng, tăng \`count[A[i]]\`:

| giá trị \`v\` | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 |
|---|---|---|---|---|---|---|---|---|---|
| \`count[v]\` | 0 | 1 | 2 | 2 | 1 | 0 | 0 | 0 | 1 |

(có một số 1, hai số 2, hai số 3, một số 4, một số 8.)

**Bước 2 — Prefix sum** (cộng dồn từ trái): \`count[v] = count[v] + count[v-1]\`.

| \`v\` | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 |
|---|---|---|---|---|---|---|---|---|---|
| trước | 0 | 1 | 2 | 2 | 1 | 0 | 0 | 0 | 1 |
| sau (prefix) | 0 | 1 | 3 | 5 | 6 | 6 | 6 | 6 | 7 |

Đọc nghĩa: có \`count[3] = 5\` phần tử ≤ 3 → phần tử \`3\` cuối cùng nằm ở index \`5−1 = 4\` trong output.

**Bước 3 — Đặt vào output** (duyệt \`A\` **từ phải sang trái**: \`i = 6 → 0\`). \`output\` dài 7.

| i | \`A[i]\` | \`count[A[i]]\` (trước) | đặt vào \`output[count−1]\` | \`count[A[i]]\` (sau, giảm 1) |
|---|---|---|---|---|
| 6 | 1 | 1 | \`output[0] = 1\` | 0 |
| 5 | 3 | 5 | \`output[4] = 3\` | 4 |
| 4 | 3 | 4 | \`output[3] = 3\` | 3 |
| 3 | 8 | 7 | \`output[6] = 8\` | 6 |
| 2 | 2 | 3 | \`output[2] = 2\` | 2 |
| 1 | 2 | 2 | \`output[1] = 2\` | 1 |
| 0 | 4 | 6 | \`output[5] = 4\` | 5 |

**Kết quả** \`output = [1, 2, 2, 3, 3, 4, 8]\` ✓ (đã sort tăng dần).

> ⚠ **Lỗi thường gặp — vì sao duyệt từ PHẢI sang TRÁI?** Để giữ **stability**. Hai số \`2\` ở index 1 và 2 của \`A\`: khi duyệt ngược, \`A[2]\` (số 2 phía sau) được đặt trước vào \`output[2]\`, rồi \`A[1]\` (số 2 phía trước) vào \`output[1]\`. Kết quả: số 2 ban đầu ở trước vẫn ở trước → ổn định. Nếu duyệt từ trái sang phải, hai phần tử bằng nhau bị đảo thứ tự → mất stability (quan trọng khi dùng counting làm bước con của radix!).

### 3.3 Code Go inline

\`\`\`go
package main

import "fmt"

// countingSort sort mảng số nguyên không âm với giá trị trong [0, k-1].
// Trả về mảng mới đã sort, ổn định (stable). O(n + k) thời gian & bộ nhớ.
func countingSort(a []int, k int) []int {
	n := len(a)
	count := make([]int, k) // count[v] = số lần v xuất hiện

	// Bước 1: đếm tần suất. Vd a=[4,2,2,8,3,3,1] → count[2]=2, count[3]=2...
	for _, v := range a {
		count[v]++
	}

	// Bước 2: prefix sum. count[v] thành "số phần tử <= v".
	// Vd count=[0,1,2,2,1,0,0,0,1] → [0,1,3,5,6,6,6,6,7]
	for v := 1; v < k; v++ {
		count[v] += count[v-1]
	}

	// Bước 3: đặt vào output, DUYỆT NGƯỢC để stable.
	output := make([]int, n)
	for i := n - 1; i >= 0; i-- {
		v := a[i]
		count[v]--             // vị trí = count[v]-1, giảm trước rồi dùng
		output[count[v]] = v   // vd i=6,v=1: count[1]=1→0, output[0]=1
	}
	return output
}

func main() {
	a := []int{4, 2, 2, 8, 3, 3, 1}
	fmt.Println(countingSort(a, 9)) // [1 2 2 3 3 4 8]
}
\`\`\`

> 🔁 **Dừng lại tự kiểm tra.** Sort \`[2, 5, 3, 0, 2, 3, 0, 3]\` với \`k = 6\` bằng counting sort, viết bảng count sau prefix sum.
> <details><summary>Đáp án</summary>
>
> Đếm: \`count = [2,0,2,3,0,1]\` (hai số 0, hai số 2, ba số 3, một số 5).
> Prefix: \`[2,2,4,7,7,8]\`. Output: \`[0,0,2,2,3,3,3,5]\`. ✓
> </details>

> 📝 **Tóm tắt mục 3.**
> - Counting sort = đếm → prefix sum → đặt vào output (duyệt ngược).
> - $O(n + k)$ time/space. **Không so sánh** → phá rào $n \\log n$.
> - Ổn định nếu duyệt từ phải sang trái ở bước 3.
> - Chỉ dùng được khi $k$ (range) **không quá lớn** so với $n$.

---

## 4. Radix Sort (LSD) — sort theo từng chữ số

> 💡 **Trực giác / Hình dung.** Như sắp xếp một chồng hồ sơ theo mã 3 chữ số. Bạn không so từng cặp mã. Bạn xếp theo **hàng đơn vị** trước (10 hộp 0–9), gom lại; rồi xếp theo **hàng chục**, gom lại; rồi **hàng trăm**. Sau pass cuối, cả chồng đã sort. Mấu chốt: mỗi pass dùng một sort **ổn định** để các thứ tự đã đúng ở digit nhỏ hơn không bị phá.

### 4.1 Ý tưởng

- **LSD (Least Significant Digit)**: sort từ chữ số **thấp nhất (hàng đơn vị)** lên cao nhất.
- Mỗi pass dùng **counting sort ổn định** trên một digit (base $b$, thường $b = 10$ hoặc $256$).
- Số pass = $d$ = số chữ số của giá trị lớn nhất.
- Độ phức tạp **$O(d \\cdot (n + b))$**. Nếu $d$ và $b$ là hằng → $O(n)$.

### 4.2 Walk-through — \`[170, 45, 75, 90, 2, 802, 24, 66]\`, base 10

Số lớn nhất \`802\` → 3 digit → 3 pass. Ký hiệu digit: đơn vị (1s), chục (10s), trăm (100s).

**Pass 1 — theo hàng đơn vị (1s):**

| số | 170 | 45 | 75 | 90 | 2 | 802 | 24 | 66 |
|---|---|---|---|---|---|---|---|---|
| digit 1s | 0 | 5 | 5 | 0 | 2 | 2 | 4 | 6 |

Counting sort ổn định theo digit này → gom theo thứ tự digit 0,2,4,5,6 (giữ thứ tự ban đầu trong cùng digit):

\`[170, 90, 2, 802, 24, 45, 75, 66]\`

(0: 170,90 — 2: 2,802 — 4: 24 — 5: 45,75 — 6: 66)

**Pass 2 — theo hàng chục (10s):**

| số | 170 | 90 | 2 | 802 | 24 | 45 | 75 | 66 |
|---|---|---|---|---|---|---|---|---|
| digit 10s | 7 | 9 | 0 | 0 | 2 | 4 | 7 | 6 |

Sort ổn định theo 10s → \`[2, 802, 24, 45, 66, 170, 75, 90]\`

(0: 2,802 — 2: 24 — 4: 45 — 6: 66 — 7: 170,75 — 9: 90)

**Pass 3 — theo hàng trăm (100s):**

| số | 2 | 802 | 24 | 45 | 66 | 170 | 75 | 90 |
|---|---|---|---|---|---|---|---|---|
| digit 100s | 0 | 8 | 0 | 0 | 0 | 1 | 0 | 0 |

Sort ổn định theo 100s → \`[2, 24, 45, 66, 75, 90, 170, 802]\` ✓ **đã sort!**

(0: 2,24,45,66,75,90 — 1: 170 — 8: 802)

> ⚠ **Lỗi thường gặp.** Nếu pass nào dùng sort **KHÔNG ổn định**, thứ tự đã đúng từ digit thấp hơn bị phá. Ví dụ ở pass 2, \`170\` và \`75\` cùng digit \`7\`; \`75\` phải đứng sau \`170\` vì ở pass 1 nó được xếp sau (đơn vị 5 > 0). Sort không ổn định có thể đảo → kết quả sai. **Radix BẮT BUỘC dùng counting sort ổn định mỗi pass.**

### 4.3 Code Go inline

\`\`\`go
package main

import "fmt"

// countingSortByDigit: counting sort ỔN ĐỊNH theo 1 digit (base 10).
// exp = 1, 10, 100... chọn digit cần sort. Vd exp=10 → lấy hàng chục.
func countingSortByDigit(a []int, exp int) []int {
	n := len(a)
	output := make([]int, n)
	count := make([]int, 10) // base 10 → 10 hộp digit 0..9

	// Đếm tần suất digit hiện tại. Vd a[i]=802, exp=1 → (802/1)%10 = 2.
	for _, v := range a {
		d := (v / exp) % 10
		count[d]++
	}
	// Prefix sum → vị trí.
	for d := 1; d < 10; d++ {
		count[d] += count[d-1]
	}
	// Đặt vào output, DUYỆT NGƯỢC → ổn định (giữ thứ tự pass trước).
	for i := n - 1; i >= 0; i-- {
		d := (a[i] / exp) % 10
		count[d]--
		output[count[d]] = a[i]
	}
	return output
}

// radixSort (LSD) cho số nguyên không âm. O(d*(n+10)).
func radixSort(a []int) []int {
	if len(a) == 0 {
		return a
	}
	// Tìm max để biết số digit cần xử lý.
	max := a[0]
	for _, v := range a {
		if v > max {
			max = v
		}
	}
	// Lặp từ hàng đơn vị (exp=1) lên: exp = 1, 10, 100...
	for exp := 1; max/exp > 0; exp *= 10 {
		a = countingSortByDigit(a, exp)
	}
	return a
}

func main() {
	a := []int{170, 45, 75, 90, 2, 802, 24, 66}
	fmt.Println(radixSort(a)) // [2 24 45 66 75 90 170 802]
}
\`\`\`

### 4.4 MSD vs LSD

| | **LSD** (Least Significant Digit) | **MSD** (Most Significant Digit) |
|---|---|---|
| Hướng | Từ digit thấp → cao | Từ digit cao → thấp |
| Cách hoạt động | Mỗi pass sort toàn mảng theo 1 digit (cần stable) | Đệ quy: chia nhóm theo digit cao, rồi sort đệ quy từng nhóm |
| Độ dài khóa | Hợp với khóa **độ dài cố định** (số nguyên 32-bit) | Hợp với khóa **độ dài thay đổi** (chuỗi), có thể dừng sớm |
| Ổn định | Có (nếu mỗi pass ổn định) | Cần cẩn thận |
| Đơn giản cài | Đơn giản hơn | Phức tạp hơn (đệ quy + phân nhóm) |

LSD đơn giản và phổ biến cho số nguyên; MSD tốt cho chuỗi (sort như từ điển, không cần đọc hết khóa).

> 🔁 **Dừng lại tự kiểm tra.** Radix LSD base 10 trên \`[53, 3, 542, 9]\`. Liệt kê mảng sau mỗi pass.
> <details><summary>Đáp án</summary>
>
> Max=542 → 3 pass.
> Pass 1 (1s): digit 3,3,2,9 → \`[542, 53, 3, 9]\` (2,3,3,9).
> Pass 2 (10s): digit 4,5,0,0 → \`[3, 9, 542, 53]\` (0:3,9 — 4:542 — 5:53).
> Pass 3 (100s): digit 0,0,5,0 → \`[3, 9, 53, 542]\` ✓.
> </details>

> 📝 **Tóm tắt mục 4.**
> - Radix LSD = lặp counting sort ổn định theo từng digit, thấp → cao.
> - $O(d \\cdot (n+b))$; với $d$, $b$ hằng → $O(n)$.
> - **Bắt buộc** sort con phải ổn định, nếu không kết quả sai.
> - LSD cho khóa độ dài cố định, MSD cho chuỗi.

---

## 5. Bucket Sort — chia rổ rồi sort từng rổ

> 💡 **Trực giác / Hình dung.** Như chia thư vào các hộc theo chữ cái đầu (A–Z), rồi trong mỗi hộc sắp xếp tay vài lá thư. Nếu thư phân bố đều khắp các hộc, mỗi hộc chỉ vài lá → sort nhanh. Bucket sort chia **range giá trị** thành \`m\` rổ đều nhau, ném phần tử vào rổ tương ứng, sort từng rổ (thường bằng insertion sort vì rổ nhỏ), rồi nối các rổ theo thứ tự.

### 5.1 Ý tưởng & độ phức tạp

1. Tạo $m$ bucket (rổ).
2. Với mỗi phần tử $x \\in [0,1)$, ném vào bucket $\\lfloor m \\cdot x \\rfloor$.
3. Sort từng bucket (insertion sort).
4. Nối các bucket theo thứ tự $0,1,\\ldots,m-1$.

- **Average $O(n)$** nếu phân phối **đều** (mỗi bucket ~$n/m$ phần tử, sort mỗi rổ $O((n/m)^2)$, tổng $O(n + n^2/m)$ → chọn $m \\approx n$ cho $O(n)$).
- **Worst $O(n^2)$**: nếu tất cả rơi vào **một** bucket (phân phối lệch) → insertion sort $O(n^2)$.

### 5.2 Walk-through — số thực \`[0.78, 0.17, 0.39, 0.26, 0.72, 0.94, 0.21, 0.12, 0.23, 0.68]\`, \`m = 10\`

Bucket của \`x\` = \`⌊10·x⌋\`:

| x | 0.78 | 0.17 | 0.39 | 0.26 | 0.72 | 0.94 | 0.21 | 0.12 | 0.23 | 0.68 |
|---|---|---|---|---|---|---|---|---|---|---|
| bucket | 7 | 1 | 3 | 2 | 7 | 9 | 2 | 1 | 2 | 6 |

Phân vào rổ:

| Bucket | Nội dung (chưa sort) | Sau insertion sort |
|---|---|---|
| 1 | 0.17, 0.12 | 0.12, 0.17 |
| 2 | 0.26, 0.21, 0.23 | 0.21, 0.23, 0.26 |
| 3 | 0.39 | 0.39 |
| 6 | 0.68 | 0.68 |
| 7 | 0.78, 0.72 | 0.72, 0.78 |
| 9 | 0.94 | 0.94 |

Nối theo thứ tự bucket 0→9:

\`[0.12, 0.17, 0.21, 0.23, 0.26, 0.39, 0.68, 0.72, 0.78, 0.94]\` ✓

### 5.3 Code Go inline

\`\`\`go
package main

import (
	"fmt"
	"sort"
)

// bucketSort cho số thực trong [0, 1). m bucket. Average O(n) nếu phân phối đều.
func bucketSort(a []float64) []float64 {
	n := len(a)
	if n == 0 {
		return a
	}
	m := n // số bucket = n (heuristic cho O(n) average)
	buckets := make([][]float64, m)

	// Ném mỗi x vào bucket ⌊m*x⌋. Vd x=0.78, m=10 → bucket 7.
	for _, x := range a {
		idx := int(float64(m) * x)
		if idx >= m { // phòng x rất sát 1.0
			idx = m - 1
		}
		buckets[idx] = append(buckets[idx], x)
	}

	// Sort từng bucket (rổ nhỏ → insertion/sort nhanh) rồi nối lại.
	result := make([]float64, 0, n)
	for _, b := range buckets {
		sort.Float64s(b) // thực tế dùng insertion sort cho rổ nhỏ
		result = append(result, b...)
	}
	return result
}

func main() {
	a := []float64{0.78, 0.17, 0.39, 0.26, 0.72, 0.94, 0.21, 0.12, 0.23, 0.68}
	fmt.Println(bucketSort(a))
	// [0.12 0.17 0.21 0.23 0.26 0.39 0.68 0.72 0.78 0.94]
}
\`\`\`

> ⚠ **Lỗi thường gặp.** Bucket sort nhanh **chỉ khi phân phối đều**. Với dữ liệu lệch (vd 1000 số đều quanh 0.5), gần như mọi phần tử rơi vào 1–2 bucket → quay về $O(n^2)$. Phải chọn hàm phân bucket khớp với phân phối thực tế của dữ liệu.

> 🔁 **Dừng lại tự kiểm tra.** Với $m = 5$, phần tử \`0.62\` rơi vào bucket nào?
> <details><summary>Đáp án</summary>
>
> $\\lfloor 5 \\cdot 0.62 \\rfloor = \\lfloor 3.1 \\rfloor = 3$ → bucket 3.
> </details>

> 📝 **Tóm tắt mục 5.**
> - Bucket sort = chia rổ theo range → sort từng rổ → nối.
> - Average $O(n)$ khi phân phối **đều**; worst $O(n^2)$ khi lệch.
> - Phù hợp số thực phân bố đều, hoặc làm tầng cho radix.

---

## 6. Khi nào dùng thuật toán nào

| Thuật toán | Dùng khi | Điều kiện then chốt |
|---|---|---|
| **Counting sort** | Số nguyên, range $k$ **nhỏ** (vd tuổi 0–150, điểm 0–100) | $k = O(n)$ thì đạt $O(n)$; cần bộ nhớ $O(k)$ |
| **Radix sort** | Số nguyên/chuỗi **độ dài cố định**, range $k$ lớn nhưng số digit $d$ nhỏ | $d$ nhỏ (vd 32-bit = 4 byte → 4 pass base 256) |
| **Bucket sort** | Số thực phân bố **đều** trên một range | Phân phối càng đều càng tốt; lệch → chậm |

**Quy tắc nhanh:**

- $k$ (range) cỡ $n$ → **counting sort**.
- $k$ lớn (vd tới $2^{32}$) nhưng giá trị có ít digit → **radix sort** (counting sort sẽ tốn $O(2^{32})$ bộ nhớ → loại).
- Float \`[0,1)\` phân bố đều, hoặc dữ liệu phân bố đều biết trước → **bucket sort**.

> 🔢 **Walk-through bằng số (chọn counting hay radix).** Sort 1 triệu số nguyên 32-bit ($n = 10^6$, range tới $\\approx 4 \\cdot 10^9$).
> - Counting sort: cần mảng \`count\` cỡ $4 \\cdot 10^9$ → **~16 GB** (4 byte/ô). Không khả thi. ❌
> - Radix base 256: $d = 4$ byte → 4 pass × $(10^6 + 256) \\approx 4 \\cdot 10^6$ thao tác. Bộ nhớ phụ chỉ $O(n + 256)$. ✓ **Chọn radix.**

---

## 7. Khi nào KHÔNG dùng non-comparison sort

> ❓ **Câu hỏi tự nhiên của người đọc.** *"Nếu counting/radix là $O(n)$, sao không thay luôn quicksort khắp nơi?"* Vì chúng có **điều kiện** ràng buộc. Khi điều kiện vỡ, chúng tệ hơn comparison sort.

- **Range giá trị khổng lồ** → counting sort tốn $O(k)$ bộ nhớ. Sort 100 số nhưng giá trị tới $10^9$ → mảng count $10^9$ ô = vô lý. (Dùng radix hoặc quicksort thay thế.)
- **Phân phối lệch nặng** → bucket sort suy biến về $O(n^2)$. Dữ liệu dồn cục vào vài bucket.
- **Cần so sánh tổng quát / khóa phức tạp** → object với comparator tùy biến (sort theo nhiều tiêu chí, theo locale chuỗi, theo hàm tự định nghĩa) → không có "digit" hay "index" tự nhiên → dùng comparison sort.
- **Khóa là số thực bất kỳ với độ chính xác cao / không chặn** → radix khó áp dụng trực tiếp.

> ⚠ **Cạm bẫy bộ nhớ.** Counting sort có vẻ "nhanh $O(n)$" nhưng $k$ ẩn trong dữ liệu. Lập trình viên nhập 50 số \`[0, 0, ..., 1000000000]\` → vô tình cấp phát mảng tỉ phần tử → out-of-memory / crash. **Luôn kiểm tra $k$ trước khi chọn counting sort.**

---

## 8. So sánh với comparison sort

| Thuật toán | Trung bình | Worst | Bộ nhớ phụ | Ổn định | So sánh? | Điều kiện |
|---|---|---|---|---|---|---|
| Merge sort | $O(n \\log n)$ | $O(n \\log n)$ | $O(n)$ | Có | Có | — |
| Quicksort | $O(n \\log n)$ | $O(n^2)$ | $O(\\log n)$ | Không | Có | — |
| Heap sort | $O(n \\log n)$ | $O(n \\log n)$ | $O(1)$ | Không | Có | — |
| **Counting sort** | $O(n + k)$ | $O(n + k)$ | $O(n + k)$ | Có | **Không** | $k$ nhỏ |
| **Radix sort (LSD)** | $O(d(n + b))$ | $O(d(n + b))$ | $O(n + b)$ | Có | **Không** | $d$ nhỏ |
| **Bucket sort** | $O(n)$ | $O(n^2)$ | $O(n)$ | Có¹ | **Không** | phân phối đều |

¹ Ổn định nếu sort con trong bucket ổn định và phân bucket giữ thứ tự.

> ⚠ **Lỗi thường gặp — "$O(n)$ luôn nhanh hơn $n \\log n$".** Counting/radix là $O(n)$ **có điều kiện**. Hằng số ẩn và $k$/$d$ quan trọng. Với $n = 1000$, $k = 10^6$: counting sort $O(n + k) \\approx 10^6$ thao tác, còn quicksort $O(n \\log n) \\approx 10^4$ → **quicksort nhanh hơn 100 lần**. $O(n)$ chỉ thắng khi $k$ (hoặc $d$) đủ nhỏ.

> 📝 **Tóm tắt mục 8.**
> - Non-comparison đạt $O(n)$ nhưng kèm điều kiện ($k$ nhỏ / $d$ nhỏ / phân phối đều).
> - Comparison sort tổng quát, không điều kiện, nhưng chặn ở $\\Omega(n \\log n)$.
> - So sánh hằng số thực tế, không chỉ Big-O, khi chọn.

---

## 9. Ứng dụng thực tế

- **Radix sort — sort số nguyên/khóa lớn.** Sort hàng triệu ID 64-bit, IP address, timestamp. Nhiều thư viện sort số nguyên dùng radix bên dưới. Sort chuỗi độ dài cố định (mã sản phẩm, biển số).
- **Counting sort — sort theo thuộc tính range nhỏ.** Sort người theo **tuổi** (0–150), sinh viên theo **điểm** (0–100), sản phẩm theo **rating** (1–5). Cũng là bước con của radix.
- **Bucket sort — distribute / phân tải.** Phân phối dữ liệu đều vào các node/partition theo hash range (load balancing). Sort tọa độ/điểm số thực phân bố đều. Histogram.

---

## 10. Cạm bẫy (Pitfalls)

| Cạm bẫy | Hậu quả | Cách tránh |
|---|---|---|
| Counting với range khổng lồ | Cấp phát mảng \`count\` tỉ phần tử → OOM/crash | Kiểm tra $k$; nếu $k \\gg n$ → dùng radix hoặc quicksort |
| Radix chọn **base** sai | Base quá nhỏ → nhiều pass ($d$ lớn); base quá lớn → bộ nhớ $O(b)$ lớn | Chọn $b$ cân bằng: 256 cho byte-level số nguyên |
| Bucket với phân phối **lệch** | Mọi phần tử dồn 1 rổ → $O(n^2)$ | Đo phân phối; chọn hàm phân bucket khớp dữ liệu |
| Quên **stability** cho radix | Sort con không ổn định → kết quả radix SAI | Mỗi pass dùng counting sort ổn định (duyệt ngược) |
| Counting sort với số **âm** mà không offset | Index âm → panic/crash | Dịch giá trị: \`index = v − min\` |
| Bucket index \`= m\` khi \`x = 1.0\` | Truy cập ngoài mảng → panic | Clamp \`idx = min(idx, m-1)\` |

---

## Bài tập

> Làm trước khi xem lời giải. Mọi bài đều có lời giải chi tiết ở mục sau.

1. **Trace counting sort.** Sort \`[1, 4, 1, 2, 7, 5, 2]\` với $k = 8$. Viết bảng count sau bước đếm, sau prefix sum, và mảng output cuối cùng.
2. **Radix theo digit.** Trace radix LSD base 10 trên \`[329, 457, 657, 839, 436, 720, 355]\`. Liệt kê mảng sau từng pass.
3. **Chứng minh lower bound.** Giải thích vì sao mọi comparison sort cần $\\Omega(n \\log n)$ so sánh. Tính số so sánh tối thiểu cho $n = 6$ và $n = 12$.
4. **Counting sort cho range âm.** Sửa counting sort để sort mảng có giá trị âm, ví dụ \`[-3, 1, -2, 0, 4, -2, 1]\`. Viết code Go.
5. **Radix cho string.** Mô tả cách sort \`["bca", "abc", "cab", "aab", "bba"]\` (chuỗi cùng độ dài 3) bằng radix LSD. Liệt kê thứ tự sau từng pass.
6. **Khi nào counting > quicksort?** Cho $n = 10^6$ phần tử. Với những giá trị $k$ nào counting sort nhanh hơn quicksort? Tính cụ thể (giả sử counting $\\approx n + k$, quicksort $\\approx n \\log_2 n$).

---

## Lời giải chi tiết

### Bài 1 — Trace counting sort \`[1, 4, 1, 2, 7, 5, 2]\`, \`k = 8\`

**Cách tiếp cận:** áp dụng 3 bước counting sort.

**Đếm tần suất** (giá trị 0..7):

| \`v\` | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 |
|---|---|---|---|---|---|---|---|---|
| count | 0 | 2 | 2 | 0 | 1 | 1 | 0 | 1 |

(hai số 1, hai số 2, một số 4, một số 5, một số 7.)

**Prefix sum:**

| \`v\` | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 |
|---|---|---|---|---|---|---|---|---|
| prefix | 0 | 2 | 4 | 4 | 5 | 6 | 6 | 7 |

**Đặt vào output** (duyệt \`A\` ngược, \`i=6→0\`):

| i | A[i] | count trước | output[count−1] | count sau |
|---|---|---|---|---|
| 6 | 2 | 4 | output[3]=2 | 3 |
| 5 | 5 | 6 | output[5]=5 | 5 |
| 4 | 7 | 7 | output[6]=7 | 6 |
| 3 | 2 | 3 | output[2]=2 | 2 |
| 2 | 1 | 2 | output[1]=1 | 1 |
| 1 | 4 | 5 | output[4]=4 | 4 |
| 0 | 1 | 1 | output[0]=1 | 0 |

**Output** = \`[1, 1, 2, 2, 4, 5, 7]\` ✓

### Bài 2 — Radix LSD \`[329, 457, 657, 839, 436, 720, 355]\`, base 10

Max = 839 → 3 digit → 3 pass.

**Pass 1 (1s):** digits = 9,7,7,9,6,0,5 → sort ổn định:
- 0: 720 — 5: 355 — 6: 436 — 7: 457,657 — 9: 329,839
- → \`[720, 355, 436, 457, 657, 329, 839]\`

**Pass 2 (10s):** digits của \`[720,355,436,457,657,329,839]\` = 2,5,3,5,5,2,3 → sort ổn định:
- 2: 720,329 — 3: 436,839 — 5: 355,457,657
- → \`[720, 329, 436, 839, 355, 457, 657]\`

**Pass 3 (100s):** digits của \`[720,329,436,839,355,457,657]\` = 7,3,4,8,3,4,6 → sort ổn định:
- 3: 329,355 — 4: 436,457 — 6: 657 — 7: 720 — 8: 839
- → \`[329, 355, 436, 457, 657, 720, 839]\` ✓ **sort xong.**

### Bài 3 — Chứng minh lower bound \`Ω(n log n)\`

**Lập luận** (chi tiết ở mục 1.2): Mọi comparison sort = decision tree nhị phân; mỗi lá là một hoán vị đầu ra. Phải có ≥ \`n!\` lá (đủ mọi hoán vị, nếu không sẽ sort sai một đầu vào nào đó). Cây nhị phân cao \`h\` có ≤ \`2^h\` lá. Do đó:

\`\`\`
n! ≤ 2^h  ⟹  h ≥ log₂(n!) ≥ (n/2)log₂(n/2) = Ω(n log n)
\`\`\`

\`h\` = số so sánh worst-case. Vậy mọi comparison sort cần \`Ω(n log n)\` so sánh.

**Số liệu cụ thể:**
- $n = 6$: $6! = 720$, $\\log_2(720) \\approx 9{,}49$ → tối thiểu **10** so sánh.
- $n = 12$: $12! = 479\\,001\\,600$, $\\log_2 \\approx 28{,}8$ → tối thiểu **29** so sánh.

### Bài 4 — Counting sort cho range âm

**Cách tiếp cận:** dịch (offset) mọi giá trị về không âm bằng cách trừ \`min\`. Index trong mảng count = \`v − min\`. Khi xuất lại cộng \`min\`.

\`\`\`go
package main

import "fmt"

// countingSortSigned sort mảng số nguyên có thể âm. O(n + range).
func countingSortSigned(a []int) []int {
	if len(a) == 0 {
		return a
	}
	// Tìm min, max để xác định range và offset.
	min, max := a[0], a[0]
	for _, v := range a {
		if v < min {
			min = v
		}
		if v > max {
			max = v
		}
	}
	k := max - min + 1        // số giá trị khả dĩ
	count := make([]int, k)

	for _, v := range a {
		count[v-min]++        // offset: -3 với min=-3 → index 0
	}
	for i := 1; i < k; i++ {
		count[i] += count[i-1]
	}
	output := make([]int, len(a))
	for i := len(a) - 1; i >= 0; i-- {
		v := a[i]
		count[v-min]--
		output[count[v-min]] = v // lưu giá trị gốc (đã cộng lại nhờ lưu v)
	}
	return output
}

func main() {
	a := []int{-3, 1, -2, 0, 4, -2, 1}
	fmt.Println(countingSortSigned(a)) // [-3 -2 -2 0 1 1 4]
}
\`\`\`

Với \`[-3, 1, -2, 0, 4, -2, 1]\`: \`min = -3\`, \`max = 4\`, $k = 8$. Index = \`v + 3\`. Kết quả: \`[-3, -2, -2, 0, 1, 1, 4]\` ✓.

### Bài 5 — Radix LSD cho string \`["bca", "abc", "cab", "aab", "bba"]\`

**Cách tiếp cận:** chuỗi cùng độ dài 3 → coi mỗi ký tự là một "digit" (base 26 cho a–z). LSD: sort theo ký tự **cuối** (vị trí 2) trước, rồi vị trí 1, rồi vị trí 0. Mỗi pass dùng counting sort ổn định theo ký tự.

**Pass 1 — ký tự vị trí 2 (cuối):** ký tự cuối = a,c,b,b,a → sort ổn định:
- a: bca, aab — b: cab, bba — c: abc
- → \`["bca", "aab", "cab", "bba", "abc"]\`

**Pass 2 — ký tự vị trí 1 (giữa):** của \`[bca,aab,cab,bba,abc]\` = c,a,a,b,b → sort ổn định:
- a: aab, cab — b: bba, abc — c: bca
- → \`["aab", "cab", "bba", "abc", "bca"]\`

**Pass 3 — ký tự vị trí 0 (đầu):** của \`[aab,cab,bba,abc,bca]\` = a,c,b,a,b → sort ổn định:
- a: aab, abc — b: bba, bca — c: cab
- → \`["aab", "abc", "bba", "bca", "cab"]\` ✓ (thứ tự từ điển đúng).

### Bài 6 — Khi nào counting > quicksort với \`n = 10⁶\`

**Cách tiếp cận:** so chi phí xấp xỉ. Counting $\\approx n + k$. Quicksort $\\approx n \\cdot \\log_2 n$.

- $n = 10^6$. $\\log_2(10^6) \\approx 19{,}93 \\approx 20$.
- Quicksort $\\approx 10^6 \\times 20 = 2 \\times 10^7$ thao tác.
- Counting $\\approx 10^6 + k$.

Counting nhanh hơn khi:

\`\`\`
10⁶ + k  <  2 × 10⁷
k  <  1.9 × 10⁷
\`\`\`

**Kết luận:** khi range $k < \\approx 1{,}9 \\times 10^7$ (gần 19 triệu), counting sort (theo mô hình thao tác) nhanh hơn quicksort. Trong thực tế hằng số của counting nhỏ hơn (chỉ tăng đếm, không so sánh + swap) nên ngưỡng thực còn rộng hơn. Nhưng **bộ nhớ** $O(k)$ mới là ràng buộc chính: $k = 19 \\times 10^6$ ô × 8 byte $\\approx 152$ MB — chấp nhận được; $k = 10^9$ thì $\\approx 8$ GB — loại. Vậy với $k$ cỡ vài triệu trở xuống, counting thắng cả tốc độ lẫn bộ nhớ.

---

## Tổng kết

- Comparison sort bị chặn ở $\\Omega(n \\log n)$ (chứng minh decision tree). Merge/heap sort tối ưu trong lớp đó.
- Non-comparison sort phá rào bằng cách **dùng giá trị làm index/digit**:
  - **Counting sort** $O(n+k)$ — range nhỏ, ổn định.
  - **Radix sort (LSD)** $O(d(n+b))$ — số digit nhỏ, bắt buộc sort con ổn định.
  - **Bucket sort** $O(n)$ average — phân phối đều, worst $O(n^2)$.
- $O(n)$ luôn **có điều kiện**: $k$ nhỏ, $d$ nhỏ, phân phối đều. Khi điều kiện vỡ, comparison sort tổng quát thắng.

## Code & Minh họa

- [visualization.html](./visualization.html) — 3 module tương tác: (1) Counting sort animator (đếm → prefix sum → đặt output), (2) Radix sort animator (bucket mỗi pass), (3) Decision tree lower bound ($n!$ lá → chiều cao $\\log(n!)$).
- Code Go inline ở các mục 3.3, 4.3, 5.3 và lời giải bài 4 — biên dịch chạy được.

## Bài tiếp theo

- [Lesson 11 — Sorting trong thực tế](../lesson-11-sorting-in-practice/) — thuật toán sort dùng trong thư viện thực (introsort, timsort), khi nào hệ thống chọn comparison vs non-comparison, sort lai (hybrid).
- Quay lại [Lesson 09 — Heap Sort](../lesson-09-heap-sort/) để ôn comparison sort tại chỗ.
`;
