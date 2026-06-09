// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: Algorithms/lesson-03-recursion-recurrence/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 03 — Đệ quy & Hệ thức truy hồi (Recursion & Recurrence)

> **Tier 0 — Nền tảng phân tích.** Sau khi đo được tốc độ ([Big-O, Lesson 01](../lesson-01-bigo-asymptotic/README.md)) và biết phân tích chi phí trung bình ([Amortized, Lesson 02](../lesson-02-amortized-analysis/README.md)), bài này dạy cách **phân rã** một bài toán thành bản thân nó nhỏ hơn (đệ quy) và **đo độ phức tạp** của hàm đệ quy đó bằng *hệ thức truy hồi (recurrence)*.

## Mục tiêu học tập

Sau bài này bạn có thể:

- Viết hàm đệ quy đúng với **base case** và **recursive case** rõ ràng.
- Hiểu **call stack**: vì sao đệ quy sâu gây *stack overflow*, vì sao space = độ sâu cây gọi.
- Biến một hàm đệ quy thành **hệ thức truy hồi** $T(n)$.
- Giải recurrence bằng **3 cách**: substitution (đoán + quy nạp), recursion tree, Master Theorem.
- Áp dụng **Master Theorem** cho merge sort, binary search, Strassen, và biết khi nào *không* dùng được.
- Chuyển đệ quy sang **iterative + explicit stack** khi cần (Go không có tail-call optimization).
- Nhận diện cạm bẫy: quên base case, base case sai, đệ quy không thu nhỏ, Fibonacci naive exponential.

## Kiến thức tiền đề

- [Lesson 01 — Big-O & phân tích tiệm cận](../lesson-01-bigo-asymptotic/README.md): ký hiệu $O / \\Theta / \\Omega$, so sánh tăng trưởng $\\log n < n < n \\log n < n^2 < 2^n$.
- [Lesson 02 — Phân tích Amortized](../lesson-02-amortized-analysis/README.md): chi phí trung bình trên một chuỗi thao tác.
- Biết đọc một hàm Go cơ bản (tham số, \`return\`, slice).

---

## 1. Đệ quy — hàm gọi chính nó

> 💡 **Trực giác / Hình dung.** Đệ quy giống búp bê Nga (matryoshka): mở một con búp bê ra thấy con nhỏ hơn bên trong, mở tiếp lại thấy con nhỏ hơn nữa, cho tới khi gặp con đặc ruột không mở được nữa. "Con đặc ruột" chính là **base case** — điểm dừng. Mỗi lần "mở" là một lần gọi chính mình với input nhỏ hơn (**recursive case**).

Một hàm đệ quy (recursive) là hàm trong thân của nó **gọi lại chính nó** với một input *nhỏ hơn*. Để không lặp vô hạn, mọi hàm đệ quy phải có hai phần:

1. **Base case** (trường hợp cơ sở): input đủ nhỏ để trả lời ngay, **không gọi đệ quy**. Đây là điểm dừng.
2. **Recursive case** (trường hợp đệ quy): giải bài toán hiện tại bằng cách gọi chính nó trên input nhỏ hơn, rồi tổng hợp kết quả.

### 1.1 Factorial — ví dụ kinh điển

$n! = n \\times (n-1) \\times \\ldots \\times 2 \\times 1$. Định nghĩa đệ quy: $n! = n \\times (n-1)!$, với $0! = 1$.

\`\`\`go
// factorial tính n! bằng đệ quy.
// Base case: 0! = 1 và 1! = 1 (điểm dừng).
// Recursive case: n! = n * (n-1)!
func factorial(n int) int {
	if n <= 1 { // base case — KHÔNG gọi đệ quy
		return 1
	}
	return n * factorial(n-1) // recursive case — input nhỏ hơn (n-1)
}
\`\`\`

**Bốn ví dụ số cụ thể** (tự tính theo được):

| Gọi | Khai triển | Kết quả |
|-----|-----------|---------|
| \`factorial(0)\` | base case | \`1\` |
| \`factorial(1)\` | base case | \`1\` |
| \`factorial(3)\` | \`3 × factorial(2) = 3 × (2 × factorial(1)) = 3 × 2 × 1\` | \`6\` |
| \`factorial(5)\` | \`5 × 4 × 3 × 2 × 1\` | \`120\` |

Cách *unfold* (khai triển) của \`factorial(3)\`:

\`\`\`
factorial(3)
= 3 * factorial(2)
= 3 * (2 * factorial(1))
= 3 * (2 * 1)          ← gặp base case, bắt đầu "thu" về
= 3 * 2
= 6
\`\`\`

### 1.2 Fibonacci — đệ quy hai nhánh

Dãy Fibonacci: \`F(0)=0, F(1)=1, F(n)=F(n−1)+F(n−2)\`. Mỗi lần gọi sinh ra **hai** lời gọi con → cây gọi phân nhánh.

\`\`\`go
// fib naive — đệ quy thẳng theo định nghĩa.
// CẢNH BÁO: chậm theo hàm mũ O(2^n) vì tính lại trùng lặp (xem mục 8).
func fib(n int) int {
	if n < 2 { // base case: F(0)=0, F(1)=1
		return n
	}
	return fib(n-1) + fib(n-2) // hai nhánh đệ quy
}
\`\`\`

**Bốn ví dụ số:** \`fib(0)=0\`, \`fib(1)=1\`, \`fib(5)=5\`, \`fib(10)=55\`.

Cây gọi của \`fib(5)\` (chú ý \`fib(3)\` bị tính **2 lần**, \`fib(2)\` tính **3 lần** — đây là nguồn gốc sự chậm):

\`\`\`
                 fib(5)
              /          \\
          fib(4)         fib(3)
         /     \\         /     \\
     fib(3)  fib(2)  fib(2)  fib(1)
     /   \\    /  \\    /  \\
  fib(2) f(1) f(1) f(0) ...
\`\`\`

### 1.3 Tower of Hanoi — đệ quy "đẹp"

Bài toán: chuyển \`n\` đĩa từ cọc A sang cọc C, dùng cọc B làm trung gian, mỗi lần chỉ chuyển 1 đĩa, không đặt đĩa to lên đĩa nhỏ.

> 💡 **Trực giác.** Để chuyển \`n\` đĩa A→C: (1) chuyển \`n−1\` đĩa trên cùng A→B (đệ quy), (2) chuyển đĩa to nhất A→C (1 bước), (3) chuyển \`n−1\` đĩa B→C (đệ quy). Bài toán \`n\` đĩa quy về **hai** bài toán \`n−1\` đĩa.

\`\`\`go
// hanoi in ra các bước chuyển n đĩa từ cọc 'from' sang 'to', dùng 'via'.
// Trả về tổng số bước (số lần move).
func hanoi(n int, from, via, to string) int {
	if n == 0 { // base case: không có đĩa nào → 0 bước
		return 0
	}
	moves := hanoi(n-1, from, to, via) // (1) n-1 đĩa A->B
	fmt.Printf("Chuyển đĩa %d: %s -> %s\\n", n, from, to)
	moves++ // (2) đĩa to nhất A->C
	moves += hanoi(n-1, via, from, to) // (3) n-1 đĩa B->C
	return moves
}
\`\`\`

Số bước: \`hanoi(1)=1\`, \`hanoi(2)=3\`, \`hanoi(3)=7\`, \`hanoi(4)=15\` → quy luật $2^n - 1$ (sẽ chứng minh ở mục 6).

### 1.4 Ba câu hỏi phải tự trả lời khi viết mọi hàm đệ quy

Trước khi viết một hàm đệ quy, luôn trả lời 3 câu:

1. **Base case là gì?** Input nhỏ nhất mà ta biết câu trả lời ngay, không cần gọi tiếp. (factorial: \`n≤1→1\`; Hanoi: \`n=0→0 bước\`; fib: \`n<2→n\`.)
2. **Recursive case thu nhỏ thế nào?** Input mỗi lời gọi phải *thật sự nhỏ hơn* và *tiến về base case*. (factorial: \`n→n−1\`; merge sort: \`n→n/2\`.)
3. **Ghép kết quả con ra sao?** (factorial: nhân \`n×...\`; merge sort: \`merge(left,right)\`; Hanoi: 3 bước nối tiếp.)

Bỏ sót câu 1 → vô hạn; sai câu 2 → vô hạn hoặc sai; sai câu 3 → sai kết quả. Đây là khung chống cạm bẫy mục 9.

> ❓ **Câu hỏi tự nhiên của người đọc.**
> - *"Một hàm có thể có nhiều base case không?"* — Có. \`fib\` thực chất có 2 base (\`n=0\` và \`n=1\`) gộp thành \`n<2\`. Có bao nhiêu base tuỳ bài.
> - *"Đệ quy có luôn thay được bằng vòng lặp không?"* — Về lý thuyết: có (mọi đệ quy mô phỏng được bằng vòng lặp + explicit stack, xem mục 7). Về thực hành: với cây/quay lui, đệ quy rõ ràng hơn nhiều.
> - *"Vì sao \`factorial(5)\` ra \`120\` mà code dừng ở \`n<=1\`?"* — Vì khi \`n=1\` trả \`1\`, rồi các tầng trên nhân ngược lên: \`2×1=2, 3×2=6, 4×6=24, 5×24=120\`.

> 🔁 **Dừng lại tự kiểm tra.** \`factorial(4)\` khai triển ra sao và bằng bao nhiêu?
>
> <details><summary>Đáp án</summary>
>
> \`factorial(4) = 4 * factorial(3) = 4 * 3 * factorial(2) = 4 * 3 * 2 * factorial(1) = 4 * 3 * 2 * 1 = 24\`.
> </details>

> 📝 **Tóm tắt mục 1.** Đệ quy = base case (điểm dừng, không gọi tiếp) + recursive case (gọi chính nó trên input nhỏ hơn). Factorial 1 nhánh, Fibonacci/Hanoi 2 nhánh. Số nhánh quyết định hình dạng cây gọi → quyết định độ phức tạp.

---

## 2. Call stack — bộ nhớ của đệ quy

> 💡 **Trực giác.** Mỗi lời gọi hàm giống đặt một tờ giấy ghi chú lên một **chồng giấy** (stack): "tôi đang tính \`factorial(3)\`, chờ kết quả \`factorial(2)\`". Khi gọi con, đặt tờ mới lên trên. Khi con trả về, gỡ tờ trên cùng ra (pop) và tiếp tục. Chồng giấy chính là **call stack**.

Mỗi lần gọi hàm, máy tạo một **stack frame** chứa: tham số, biến cục bộ, và *địa chỉ trở về* (chỗ cần quay lại sau khi hàm xong). Frame được **push** lúc gọi, **pop** lúc return.

### 2.1 Diễn tiến stack của \`factorial(3)\`

| Bước | Thao tác | Stack (đáy → đỉnh) |
|------|----------|--------------------|
| 1 | gọi \`factorial(3)\` | \`[f(3)]\` |
| 2 | \`f(3)\` gọi \`f(2)\` | \`[f(3), f(2)]\` |
| 3 | \`f(2)\` gọi \`f(1)\` | \`[f(3), f(2), f(1)]\` |
| 4 | \`f(1)\` base → return 1 | \`[f(3), f(2)]\` ← pop f(1) |
| 5 | \`f(2)\` = 2×1 → return 2 | \`[f(3)]\` ← pop f(2) |
| 6 | \`f(3)\` = 3×2 → return 6 | \`[]\` ← pop f(3) |

Độ sâu tối đa = 3 frame → **space $= O$(độ sâu cây gọi)**, ở đây $O(n)$.

**Bốn ví dụ số về độ sâu stack (space):**

| Hàm | Hình dạng cây | Tổng số node (số call) | Độ sâu tối đa (space) |
|-----|---------------|------------------------|-----------------------|
| \`factorial(n)\` | 1 nhánh, thẳng | $n$ | $O(n)$ |
| \`binary search(n)\` | 1 nhánh, thẳng | $\\log_2 n$ | $O(\\log n)$ |
| \`fib(n)\` naive | 2 nhánh, dày | $\\approx 2 \\cdot F(n+1)-1$ (mũ) | $O(n)$ (chỉ chiều cao!) |
| \`mergeSort(n)\` | 2 nhánh | $O(n)$ node | $O(\\log n)$ chiều cao |

Điểm cốt lõi: **số node và độ sâu là hai đại lượng khác nhau.** \`fib(n)\` có cực nhiều node (chi phí *thời gian* $O(2^n)$) nhưng stack tại một thời điểm chỉ chứa một đường gốc-tới-lá → *space* chỉ $O(n)$.

### 2.2 Stack overflow — đệ quy quá sâu

Stack có giới hạn dung lượng. Đệ quy sâu (hoặc vô hạn vì quên base case) làm stack đầy → chương trình crash (*stack overflow*). Go khởi đầu goroutine với stack nhỏ (~8 KB) nhưng **tự nới rộng** tới giới hạn \`runtime.SetMaxStack\` (mặc định 1 GB trên 64-bit) → Go chịu đệ quy sâu hơn C, nhưng đệ quy *vô hạn* vẫn crash với \`goroutine stack exceeds ... limit\`.

> ❓ **Câu hỏi tự nhiên của người đọc.**
> - *"Đệ quy luôn tốn $O(n)$ bộ nhớ à?"* — Tốn $O$(độ sâu). Với cây 1 nhánh (factorial) độ sâu $= n$. Với Hanoi/Fibonacci dù **tổng số lời gọi** rất lớn, tại mỗi thời điểm stack chỉ chứa **một đường từ gốc xuống lá**, nên space vẫn $O(n)$ (chiều cao cây), không phải số node.
> - *"Vì sao iterative (vòng lặp) thường tốn $O(1)$ bộ nhớ?"* — Vòng lặp không tạo frame mới mỗi vòng; chỉ tái dùng vài biến → không có stack growth.
> - *"Quên base case thì sao?"* — Đệ quy không bao giờ dừng → push frame liên tục → stack overflow (xem mục 9).

> 🔁 **Dừng lại tự kiểm tra.** Độ sâu stack tối đa khi chạy \`fib(5)\` là bao nhiêu?
>
> <details><summary>Đáp án</summary>
>
> Độ sâu = chiều cao cây gọi $= n = 5$ (đường dài nhất \`fib(5)→fib(4)→fib(3)→fib(2)→fib(1)\`). Dù tổng số lời gọi là 15, stack tại một thời điểm chỉ chứa tối đa 5 frame.
> </details>

> 📝 **Tóm tắt mục 2.** Mỗi lời gọi = 1 frame (push lúc gọi, pop lúc return). Space của đệ quy $= O$(độ sâu cây gọi), không phải số node. Đệ quy quá sâu/vô hạn → stack overflow.

---

## 3. Từ đệ quy đến hệ thức truy hồi (recurrence)

> 💡 **Trực giác.** Muốn biết hàm đệ quy chạy bao lâu, ta viết một **phương trình mô tả chính nó**: "thời gian giải bài cỡ $n$ = thời gian giải các bài con + thời gian ghép kết quả". Phương trình tự-tham-chiếu đó gọi là *hệ thức truy hồi* $T(n)$.

Một **recurrence** biểu diễn $T(n)$ (chi phí của input cỡ $n$) theo $T$ của các input nhỏ hơn, cộng chi phí "phi-đệ-quy" tại bước hiện tại.

### 3.1 Quy tắc lập recurrence

Nhìn vào thân hàm:

- Mỗi **lời gọi đệ quy** trên input cỡ $m$ → thêm một số hạng $T(m)$.
- Mọi công việc **không-đệ-quy** trong thân (so sánh, vòng lặp, ghép kết quả) → số hạng $f(n)$.

**Bốn ví dụ:**

| Hàm | Recursive case | Recurrence | Lời giải |
|-----|----------------|-----------|----------|
| factorial(n) | 1 lời gọi \`f(n−1)\`, work $O(1)$ | $T(n) = T(n-1) + O(1)$ | $\\Theta(n)$ |
| fib(n) naive | 2 lời gọi \`f(n−1)\`, \`f(n−2)\`, work $O(1)$ | $T(n) = T(n-1) + T(n-2) + O(1)$ | $\\Theta(\\varphi^n) \\approx \\Theta(1{,}618^n)$ |
| binary search | 1 lời gọi nửa mảng, work $O(1)$ | $T(n) = T(n/2) + O(1)$ | $\\Theta(\\log n)$ |
| merge sort | 2 lời gọi nửa mảng, merge $O(n)$ | $T(n) = 2T(n/2) + O(n)$ | $\\Theta(n \\log n)$ |

### 3.2 Merge sort — recurrence chuẩn để mổ xẻ

\`\`\`go
// mergeSort sắp xếp slice bằng chia-để-trị (divide and conquer).
// Recurrence: T(n) = 2T(n/2) + O(n)
//   - 2T(n/2): hai lời gọi đệ quy trên nửa mảng
//   - O(n)   : chi phí merge hai nửa đã sắp xếp
func mergeSort(a []int) []int {
	if len(a) <= 1 { // base case: mảng 0 hoặc 1 phần tử đã sắp xếp
		return a
	}
	mid := len(a) / 2
	left := mergeSort(a[:mid])  // T(n/2)
	right := mergeSort(a[mid:]) // T(n/2)
	return merge(left, right)   // O(n)
}

// merge ghép hai slice đã sắp xếp thành một, chi phí O(n).
func merge(l, r []int) []int {
	out := make([]int, 0, len(l)+len(r))
	i, j := 0, 0
	for i < len(l) && j < len(r) {
		if l[i] <= r[j] {
			out = append(out, l[i]); i++
		} else {
			out = append(out, r[j]); j++
		}
	}
	out = append(out, l[i:]...) // phần dư bên trái
	out = append(out, r[j:]...) // phần dư bên phải
	return out
}
\`\`\`

> 📝 **Tóm tắt mục 3.** Lập recurrence: đếm số lời gọi đệ quy và kích thước input của chúng → số hạng $T(...)$; cộng chi phí phi-đệ-quy $f(n)$. Merge sort: $T(n) = 2T(n/2) + O(n)$.

---

## 4. Giải recurrence — ba cách

### 4.1 Cách 1 — Substitution (đoán nghiệm + chứng minh quy nạp)

**Ý tưởng:** đoán một dạng nghiệm (ví dụ $T(n) \\leq c \\cdot n \\log n$), rồi dùng **quy nạp toán học** chứng minh nó đúng.

Ví dụ với $T(n) = 2T(n/2) + n$, đoán $T(n) \\leq c \\cdot n \\log_2 n$:

- **Giả thiết quy nạp:** giả sử đúng cho mọi input nhỏ hơn, tức $T(n/2) \\leq c \\cdot (n/2) \\cdot \\log_2(n/2)$.
- **Bước quy nạp:** thay vào recurrence:

\`\`\`
T(n) ≤ 2·[ c·(n/2)·log₂(n/2) ] + n
     = c·n·log₂(n/2) + n
     = c·n·(log₂ n − 1) + n        (vì log₂(n/2) = log₂ n − 1)
     = c·n·log₂ n − c·n + n
     = c·n·log₂ n − (c−1)·n
     ≤ c·n·log₂ n                   (khi c ≥ 1, vì −(c−1)·n ≤ 0)
\`\`\`

Vậy $T(n) = O(n \\log n)$. Mọi bước viết ra, không "dễ thấy".

> ⚠ **Lỗi thường gặp.** Đoán sai dạng (ví dụ đoán $O(n)$ cho merge sort) → bước quy nạp **không đóng được** (vế trái vượt vế phải). Khi không chứng minh được, đó là dấu hiệu đoán sai, phải đổi đoán — chứ không phải recurrence sai.

**Minh họa đoán SAI để thấy vì sao "không đóng được".** Thử đoán $T(n) \\leq c \\cdot n$ cho $T(n) = 2T(n/2)+n$:

\`\`\`
T(n) ≤ 2·[c·(n/2)] + n
     = c·n + n
     = (c+1)·n        ← KHÔNG ≤ c·n với bất kỳ c cố định nào!
\`\`\`

Vế phải $(c+1) \\cdot n$ luôn lớn hơn $c \\cdot n$ → quy nạp **thất bại** → đoán $O(n)$ sai. Phải nâng lên $O(n \\log n)$ (mục 4.1 chứng minh đóng được). Bài học: nếu bước quy nạp ra thừa số dương không triệt tiêu được → đoán quá thấp.

### 4.2 Cách 2 — Recursion tree (cây đệ quy)

> 💡 **Trực giác.** Vẽ ra cây các lời gọi, ghi **chi phí phi-đệ-quy** của mỗi node. Tổng chi phí toàn cây = \`Σ (chi phí mỗi level)\`. Thường mỗi level có tổng dễ tính, nhân với số level → ra đáp án.

**Walk-through $T(n) = 2T(n/2) + n$ → $\\Theta(n \\log n)$:**

| Level | Số node | Kích thước mỗi node | Chi phí mỗi node | Tổng chi phí level |
|------:|--------:|--------------------:|-----------------:|-------------------:|
| 0 | 1 | $n$ | $n$ | $n$ |
| 1 | 2 | $n/2$ | $n/2$ | $2 \\times n/2 = n$ |
| 2 | 4 | $n/4$ | $n/4$ | $4 \\times n/4 = n$ |
| … | … | … | … | $n$ |
| $k$ | $2^k$ | $n/2^k$ | $n/2^k$ | $n$ |

- **Mỗi level đều tốn $n$** (số node ×2, kích thước ÷2 → triệt tiêu).
- Cây dừng khi $n/2^k = 1 \\Rightarrow 2^k = n \\Rightarrow k = \\log_2 n$. Vậy có $\\log_2 n + 1$ level.
- **Tổng** $= n \\times$ (số level) $= n \\times (\\log_2 n + 1) = \\Theta(n \\log n)$. ∎

**Verify bằng số thật $n = 8$:** level 0: $8$; level 1: $2 \\times 4=8$; level 2: $4 \\times 2=8$; level 3: $8 \\times 1=8$. Có $\\log_2 8 + 1 = 4$ level → tổng $4 \\times 8 = 32$. Công thức $n \\log_2 n = 8 \\times 3 = 24$, cùng bậc $\\Theta(n \\log n)$ ✓ (hằng số khác nhau, bậc giống).

### 4.3 Cách 3 — Master Theorem

Công thức "tra bảng" cho recurrence dạng chia-để-trị. Chi tiết ở mục 5.

> 🔁 **Dừng lại tự kiểm tra.** Recursion tree cho $T(n) = T(n/2) + 1$ (binary search): mỗi level tốn bao nhiêu, có bao nhiêu level, tổng là gì?
>
> <details><summary>Đáp án</summary>
>
> Mỗi level chỉ có **1 node** (1 nhánh), chi phí mỗi node $= 1$. Số level $= \\log_2 n + 1$ (kích thước ÷2 tới 1). Tổng $= 1 \\times (\\log_2 n + 1) = \\Theta(\\log n)$.
> </details>

> 📝 **Tóm tắt mục 4.** Ba cách: (1) Substitution — đoán + quy nạp, mạnh nhưng cần đoán đúng; (2) Recursion tree — vẽ cây, tổng $= \\sum$ chi phí mỗi level, trực quan; (3) Master Theorem — tra bảng nhanh cho dạng $aT(n/b)+f(n)$.

---

## 5. Master Theorem

Cho recurrence dạng:

$$ T(n) = a\\,T(n/b) + f(n), \\qquad a \\ge 1,\\; b > 1 $$

- $a$ = số bài toán con, $b$ = hệ số thu nhỏ kích thước, $f(n)$ = chi phí chia + ghép.
- Đặt **ngưỡng** \`n^{\\log_b a}\` (chi phí "lá" của cây) rồi **so sánh \`f(n)\` với ngưỡng**:

| | Điều kiện | Kết quả | Ý nghĩa |
|---|-----------|---------|---------|
| **Case 1** | $f(n) = O(n^{\\log_b a - \\varepsilon})$ (f *nhỏ hơn* ngưỡng) | $\\Theta(n^{\\log_b a})$ | Chi phí dồn ở **lá** |
| **Case 2** | $f(n) = \\Theta(n^{\\log_b a})$ (f *bằng* ngưỡng) | $\\Theta(n^{\\log_b a} \\log n)$ | Chi phí **chia đều** mọi level |
| **Case 3** | $f(n) = \\Omega(n^{\\log_b a + \\varepsilon})$ (f *lớn hơn* ngưỡng) + điều kiện regularity | $\\Theta(f(n))$ | Chi phí dồn ở **gốc** |

> 💡 **Trực giác về 3 case.** Cây đệ quy có $n^{\\log_b a}$ lá. So sánh tổng chi phí *gốc* $f(n)$ với tổng chi phí *lá* $n^{\\log_b a}$: nếu lá nặng hơn → Case 1; nếu hai bên cân → Case 2 (thêm thừa số $\\log n$ vì mọi level cân nhau); nếu gốc nặng hơn → Case 3.

### 5.1 Bốn ví dụ áp dụng

**(a) Merge sort — $T(n) = 2T(n/2) + n$.** $a=2, b=2, f(n)=n$. Ngưỡng $n^{\\log_2 2}=n^1=n$. $f(n)=n=\\Theta(n)$ → **Case 2** → $\\Theta(n \\log n)$. ✓ (khớp recursion tree mục 4.2).

**(b) Binary search — $T(n) = T(n/2) + 1$.** $a=1, b=2, f(n)=1$. Ngưỡng $n^{\\log_2 1}=n^0=1$. $f(n)=1=\\Theta(1)=\\Theta(n^0)$ → **Case 2** → $\\Theta(n^0 \\log n)=\\Theta(\\log n)$. ✓

**(c) Strassen (nhân ma trận) — $T(n) = 7T(n/2) + n^2$.** $a=7, b=2, f(n)=n^2$. Ngưỡng $n^{\\log_2 7} \\approx n^{2{,}807}$. So sánh: $f(n)=n^2=O(n^{2{,}807-\\varepsilon})$ (vì $2 < 2{,}807$) → **Case 1** → $\\Theta(n^{\\log_2 7}) \\approx \\Theta(n^{2{,}81})$. (Nhanh hơn nhân ma trận ngây thơ $O(n^3)$.)

**(d) $T(n) = 3T(n/2) + n$.** $a=3, b=2, f(n)=n$. Ngưỡng $n^{\\log_2 3} \\approx n^{1{,}585}$. So sánh: $f(n)=n=O(n^{1{,}585-\\varepsilon})$ (vì $1 < 1{,}585$) → **Case 1** → $\\Theta(n^{\\log_2 3}) \\approx \\Theta(n^{1{,}585})$.

**Bảng tổng hợp 4 ví dụ** (xem cùng lúc để so sánh 3 case):

| Recurrence | $a$ | $b$ | $f(n)$ | ngưỡng $n^{\\log_b a}$ | so sánh | Case | Kết quả |
|-----------|----:|----:|--------|----------------------|---------|:----:|---------|
| merge sort | 2 | 2 | $n$ | $n^1$ | bằng | 2 | $\\Theta(n \\log n)$ |
| binary search | 1 | 2 | $1$ | $n^0=1$ | bằng | 2 | $\\Theta(\\log n)$ |
| Strassen | 7 | 2 | $n^2$ | $n^{2{,}807}$ | f nhỏ hơn | 1 | $\\Theta(n^{2{,}81})$ |
| $3T(n/2)+n$ | 3 | 2 | $n$ | $n^{1{,}585}$ | f nhỏ hơn | 1 | $\\Theta(n^{1{,}585})$ |

**Một ví dụ Case 3 để đủ bộ 3 case** — $T(n)=2T(n/2)+n^2$: $a=2,b=2,f=n^2$, ngưỡng $n^1=n$. $f=n^2=\\Omega(n^{1+\\varepsilon})$ lớn hơn theo bậc đa thức → **Case 3** → $\\Theta(n^2)$. (Regularity: $2 \\cdot (n/2)^2=n^2/2=(1/2)f(n) \\leq c \\cdot f(n)$ với $c=1/2<1$ ✓.)

> ⚠ **Lỗi thường gặp.** "f lớn hơn ngưỡng" của Case 3 phải lớn hơn theo **bậc đa thức** ($n^{+\\varepsilon}$), không chỉ lớn hơn bằng thừa số $\\log$. Ví dụ $T(n)=2T(n/2)+n \\log n$: ngưỡng $n$, $f=n \\log n$ lớn hơn nhưng **không** lớn hơn theo bậc đa thức ($\\log n$ không phải $n^\\varepsilon$) → **Master Theorem không áp dụng được** ở dạng cơ bản (cần phiên bản mở rộng cho ra $\\Theta(n \\log^2 n)$).

> ❓ **Câu hỏi tự nhiên.**
> - *"$\\log_b a$ tính sao?"* — $\\log_b a = \\ln a / \\ln b$. Ví dụ $\\log_2 7 = \\ln 7/\\ln 2 \\approx 1{,}946/0{,}693 \\approx 2{,}807$.
> - *"Vì sao Case 2 có thêm $\\log n$?"* — Vì mọi level đều cân nhau (cùng tốn $n^{\\log_b a}$), và có $\\Theta(\\log n)$ level → nhân thêm $\\log n$.
> - *"$b$ không chia chẵn $n$ thì sao?"* — Dùng $\\lfloor n/b \\rfloor$ / $\\lceil n/b \\rceil$, kết quả tiệm cận không đổi (Master Theorem vẫn dùng được).

> 📝 **Tóm tắt mục 5.** Master Theorem cho $T(n)=aT(n/b)+f(n)$: so $f(n)$ với ngưỡng $n^{\\log_b a}$. Nhỏ hơn → Case 1 $\\Theta(n^{\\log_b a})$; bằng → Case 2 thêm $\\log n$; lớn hơn (theo bậc đa thức) → Case 3 $\\Theta(f(n))$.

---

## 6. Recurrence không dùng Master Theorem được

Master Theorem chỉ áp dụng cho dạng $aT(n/b)+f(n)$ (thu nhỏ theo **tỉ lệ** $n/b$). Recurrence thu nhỏ theo **hằng số trừ** ($n-1$, $n-2$) **không** dùng được — phải dùng recursion tree / substitution.

### 6.1 \`T(n) = T(n−1) + n\` → \`Θ(n²)\`

Đây là recurrence của factorial-có-vòng-lặp, hoặc selection sort. Khai triển (telescoping):

\`\`\`
T(n) = T(n−1) + n
     = T(n−2) + (n−1) + n
     = T(n−3) + (n−2) + (n−1) + n
     = …
     = T(0) + 1 + 2 + … + n
     = Θ(n(n+1)/2)
     = Θ(n²)
\`\`\`

**Verify $n=4$:** $4+3+2+1 = 10 = 4 \\cdot 5/2$ ✓ → bậc $\\Theta(n^2)$.

### 6.2 \`T(n) = 2T(n−1) + 1\` → \`Θ(2ⁿ)\` (Tower of Hanoi)

Recursion tree là cây nhị phân **đầy** chiều cao $n$ → $2^n$ lá. Khai triển:

\`\`\`
T(n) = 2T(n−1) + 1
     = 2(2T(n−2)+1) + 1 = 4T(n−2) + 2 + 1
     = 8T(n−3) + 4 + 2 + 1
     = …
     = 2ⁿ·T(0) + (2^{n-1} + … + 2 + 1)
     = 2ⁿ − 1                       (với T(0)=0, tổng cấp số nhân = 2ⁿ−1)
\`\`\`

**Verify:** \`hanoi(1)=1\`$=2^1-1$, \`hanoi(2)=3\`$=2^2-1$, \`hanoi(3)=7\`$=2^3-1$, \`hanoi(4)=15\`$=2^4-1$ ✓ → $\\Theta(2^n)$.

> ⚠ **Lỗi thường gặp.** Cố nhét $T(n)=T(n-1)+n$ vào Master Theorem bằng cách "coi $b=1$". **Sai** — Master yêu cầu $b>1$. Recurrence dạng $n-c$ luôn dùng recursion tree / telescoping.

> 📝 **Tóm tắt mục 6.** Recurrence trừ-hằng ($n-1$, $n-2$) → dùng telescoping/recursion tree. $T(n)=T(n-1)+n \\to \\Theta(n^2)$; $T(n)=2T(n-1)+1 \\to \\Theta(2^n)$.

---

## 7. Đệ quy vs lặp — và cạm bẫy Go không có TCO

> 💡 **Trực giác.** Đệ quy "đuôi" (tail recursion) là khi lời gọi đệ quy là *thao tác cuối cùng* của hàm. Nhiều ngôn ngữ (Scheme, một phần Scala/Kotlin) tối ưu nó thành vòng lặp, tái dùng 1 frame → $O(1)$ stack. **Go KHÔNG làm điều này (no tail-call optimization).** Mọi lời gọi đệ quy trong Go đều tốn 1 frame thật.

Hệ quả: trong Go, đệ quy sâu $O(n)$ luôn tốn $O(n)$ stack — đệ quy duyệt một list 1 triệu phần tử có thể stack overflow. **Khi cần độ sâu lớn, chuyển sang iterative + explicit stack.**

### 7.1 Đệ quy → iterative với explicit stack

Ví dụ tổng giai thừa kiểu đệ quy chuyển sang lặp (factorial vốn tail-friendly):

\`\`\`go
// factorialIter — phiên bản lặp, O(1) stack, không bao giờ overflow.
func factorialIter(n int) int {
	result := 1
	for i := 2; i <= n; i++ { // tích lũy thay vì gọi đệ quy
		result *= i
	}
	return result
}
\`\`\`

Với đệ quy **không tail** (ví dụ duyệt cây), ta mô phỏng call stack bằng slice:

\`\`\`go
// sumTreeIter duyệt cây nhị phân tính tổng giá trị, KHÔNG đệ quy.
// Dùng explicit stack ([]*"frame") thay cho call stack của máy → tránh overflow.
type Node struct{ Val int; L, R *Node }

func sumTreeIter(root *Node) int {
	if root == nil {
		return 0
	}
	stack := []*Node{root} // explicit stack thay call stack
	sum := 0
	for len(stack) > 0 {
		n := stack[len(stack)-1]      // peek đỉnh
		stack = stack[:len(stack)-1]  // pop
		sum += n.Val
		if n.L != nil {
			stack = append(stack, n.L) // push trái
		}
		if n.R != nil {
			stack = append(stack, n.R) // push phải
		}
	}
	return sum
}
\`\`\`

Explicit stack sống trên **heap** (slice tự nới rộng), không bị giới hạn stack size → an toàn với cây sâu.

### 7.2 Đệ quy đếm số lời gọi — so sánh thời gian thực

Để *thấy* đệ quy nhiều nhánh đắt thế nào, ta thêm biến đếm toàn cục:

\`\`\`go
var calls int // đếm số lần hàm được gọi

func fibCounted(n int) int {
	calls++ // mỗi lần vào hàm tăng 1
	if n < 2 {
		return n
	}
	return fibCounted(n-1) + fibCounted(n-2)
}
// Sau fibCounted(10): calls == 177 (khớp Bài 2).
// Sau fibCounted(20): calls == 21891.
\`\`\`

Cùng cách, đếm cho \`factorial(n)\` luôn ra \`calls == n\` (1 nhánh, thẳng) — minh chứng \`factorial\` $\\Theta(n)$ còn \`fib\` naive $\\Theta(2^n)$. Biến đếm là công cụ rẻ tiền để kiểm chứng recurrence trên máy thật trước khi tin vào phân tích lý thuyết.

### 7.3 Bảng tăng trưởng — vì sao \`2ⁿ\` "treo máy"

So sánh số phép tính của các bậc xuất hiện trong bài (khớp [Lesson 01](../lesson-01-bigo-asymptotic/README.md)):

| n | $\\log n$ | $n$ | $n \\log n$ | $n^2$ | $2^n$ |
|--:|--------:|----:|----------:|-----:|-----:|
| 10 | ~3 | 10 | ~33 | 100 | 1 024 |
| 20 | ~4 | 20 | ~86 | 400 | ~1 triệu |
| 30 | ~5 | 30 | ~147 | 900 | ~1 tỷ |
| 50 | ~6 | 50 | ~282 | 2 500 | ~10¹⁵ |

\`fib(50)\` naive $\\approx 2^{50}$ lời gọi ≈ vài trăm năm — trong khi \`fibMemo(50)\` chỉ ~99 lời gọi, xong tức thì. Đây là lý do *phải* nhận diện đệ quy nhiều nhánh tính trùng và thêm memo (mục 8).

> ❓ **Câu hỏi tự nhiên.** *"Vậy có nên luôn dùng iterative?"* — Không. Đệ quy thường **rõ ràng hơn** (Hanoi, merge sort, duyệt cây). Chỉ chuyển iterative khi: (1) độ sâu có thể rất lớn → nguy cơ overflow; hoặc (2) cần tối ưu hằng số. Với độ sâu $O(\\log n)$ (binary search, merge sort) đệ quy hoàn toàn an toàn.

> 📝 **Tóm tắt mục 7.** Go không có tail-call optimization → đệ quy luôn tốn frame thật. Đệ quy sâu $O(n)$ nguy hiểm; chuyển sang vòng lặp (tail-friendly) hoặc explicit stack trên heap (duyệt cây/đồ thị) khi cần.

---

## 8. Memoization tease — Fibonacci O(2ⁿ) → O(n)

\`fib\` naive chậm vì **tính lại** các giá trị trùng (xem cây gọi mục 1.2: \`fib(3)\` tính 2 lần). **Memoization** = nhớ kết quả đã tính, lần sau tra bảng thay vì tính lại.

\`\`\`go
// fibMemo — đệ quy + bảng nhớ (memo), O(n) thời gian, O(n) bộ nhớ.
func fibMemo(n int, memo map[int]int) int {
	if n < 2 {
		return n
	}
	if v, ok := memo[n]; ok { // đã tính rồi → tra bảng O(1)
		return v
	}
	memo[n] = fibMemo(n-1, memo) + fibMemo(n-2, memo) // tính 1 lần, lưu lại
	return memo[n]
}
\`\`\`

**So sánh số lời gọi** (đếm thực tế):

| n | \`fib\` naive (số call) | \`fibMemo\` (số call) |
|--:|----------------------:|--------------------:|
| 5 | 15 | 9 |
| 10 | 177 | 19 |
| 20 | 21891 | 39 |
| 30 | 2692537 | 59 |

Naive bùng nổ theo hàm mũ; memo tuyến tính $\\approx 2n-1$. Đây là cửa ngõ vào **Quy hoạch động (Dynamic Programming)** — học kỹ ở [Tier 4](../tier-4-dynamic-programming/index.html).

> 📝 **Tóm tắt mục 8.** \`fib\` naive $O(2^n)$ vì tính trùng; thêm memo → mỗi giá trị tính đúng 1 lần → $O(n)$. Đây là ý tưởng cốt lõi của DP.

---

## 9. Cạm bẫy thường gặp

| Cạm bẫy | Triệu chứng | Sửa |
|---------|-------------|-----|
| **Quên base case** | đệ quy vô hạn → stack overflow | luôn viết base case TRƯỚC |
| **Base case sai** | sai kết quả hoặc dừng quá sớm/muộn | kiểm tra biên (\`n=0\`, \`n=1\`) |
| **Đệ quy không thu nhỏ** | gọi \`f(n)\` thay vì \`f(n−1)\` → vô hạn | đảm bảo input mỗi lần *nhỏ thật sự* |
| **Fibonacci naive** | $O(2^n)$ với $n$ lớn → treo | dùng memo / iterative |

### 9.1 Ví dụ bug & cách sửa

\`\`\`go
// BUG: quên base case → đệ quy vô hạn, stack overflow.
func badCountdown(n int) {
	fmt.Println(n)
	badCountdown(n - 1) // không bao giờ dừng (n đi xuống âm vô tận)
}

// SỬA: thêm base case dừng tại n < 0 (hoặc n == 0).
func goodCountdown(n int) {
	if n < 0 { // base case
		return
	}
	fmt.Println(n)
	goodCountdown(n - 1)
}
\`\`\`

\`\`\`go
// BUG: đệ quy không thu nhỏ input → vô hạn.
func badSum(n int) int {
	if n == 0 {
		return 0
	}
	return n + badSum(n) // SAI: gọi badSum(n), không nhỏ đi → vô hạn
}

// SỬA: gọi badSum(n-1).
func goodSum(n int) int {
	if n == 0 {
		return 0
	}
	return n + goodSum(n-1) // input nhỏ đi mỗi lần
}
\`\`\`

> 📝 **Tóm tắt mục 9.** Bốn cạm bẫy: quên/sai base case, không thu nhỏ input, Fibonacci naive exponential. Quy tắc vàng: (1) viết base case trước, (2) đảm bảo mỗi lời gọi input nhỏ hơn *thật*, (3) cảnh giác đệ quy nhiều nhánh tính trùng.

---

## 10. Bài tập

> Lời giải chi tiết ở mục [11. Lời giải chi tiết](#11-lời-giải-chi-tiết). Tự làm trước khi xem.

1. **Giải 6 recurrence.** Cho biết $\\Theta$ của mỗi recurrence và phương pháp dùng:
   (a) $T(n)=2T(n/2)+n$  (b) $T(n)=T(n/2)+1$  (c) $T(n)=4T(n/2)+n$
   (d) $T(n)=3T(n/2)+n^2$  (e) $T(n)=T(n-1)+1$  (f) $T(n)=2T(n-1)+1$.
2. **Đếm số lời gọi Fibonacci naive** cho \`fib(10)\`. Tính tay theo công thức.
3. **Chuyển đệ quy sang iterative.** Viết lại \`sum(n)=n+sum(n−1)\` thành vòng lặp $O(1)$ stack.
4. **Độ phức tạp Hanoi.** Lập recurrence cho \`hanoi(n)\` và giải ra số bước.
5. **Sửa bug stack overflow.** Tìm và sửa lỗi trong hàm sau:
   \`\`\`go
   func power(base, exp int) int {
       return base * power(base, exp-1)
   }
   \`\`\`
6. **Chứng minh $T(n)=2T(n/2)+n = \\Theta(n \\log n)$** bằng recursion tree (viết rõ từng level, số level, tổng).

---

## 11. Lời giải chi tiết

### Bài 1 — Giải 6 recurrence

| | Recurrence | $a,b,f$ / dạng | Phân tích | Kết quả |
|--|-----------|----------------|-----------|---------|
| (a) | $2T(n/2)+n$ | $a=2,b=2,f=n$; ngưỡng $n^{\\log_2 2}=n$ | $f=\\Theta(n)$ = ngưỡng → **Master Case 2** | $\\Theta(n \\log n)$ |
| (b) | $T(n/2)+1$ | $a=1,b=2,f=1$; ngưỡng $n^0=1$ | $f=\\Theta(1)$ = ngưỡng → **Case 2** | $\\Theta(\\log n)$ |
| (c) | $4T(n/2)+n$ | $a=4,b=2,f=n$; ngưỡng $n^{\\log_2 4}=n^2$ | $f=n=O(n^{2-\\varepsilon})$ < ngưỡng → **Case 1** | $\\Theta(n^2)$ |
| (d) | $3T(n/2)+n^2$ | $a=3,b=2,f=n^2$; ngưỡng $n^{\\log_2 3}\\approx n^{1{,}585}$ | $f=n^2=\\Omega(n^{1{,}585+\\varepsilon})$ > ngưỡng → **Case 3** | $\\Theta(n^2)$ |
| (e) | $T(n-1)+1$ | trừ-hằng → telescoping | $=T(0)+1+1+\\ldots+1$ ($n$ lần) | $\\Theta(n)$ |
| (f) | $2T(n-1)+1$ | trừ-hằng, 2 nhánh → cây nhị phân đầy | $=2^n-1$ | $\\Theta(2^n)$ |

Riêng (d) kiểm tra regularity: $a \\cdot f(n/b) = 3 \\cdot (n/2)^2 = 3n^2/4 = (3/4) \\cdot f(n) \\leq c \\cdot f(n)$ với $c=3/4<1$ ✓ → Case 3 hợp lệ.

### Bài 2 — Số lời gọi \`fib(10)\` naive

Gọi $C(n)$ = số lời gọi hàm khi tính \`fib(n)\`. $C(0)=C(1)=1$, $C(n)=1+C(n-1)+C(n-2)$.

Tính dần: $C(2)=1+1+1=3$, $C(3)=1+3+1=5$, $C(4)=1+5+3=9$, $C(5)=1+9+5=15$, $C(6)=1+15+9=25$, $C(7)=1+25+15=41$, $C(8)=1+41+25=67$, $C(9)=1+67+41=109$, $C(10)=1+109+67=\\boldsymbol{177}$.

(Công thức tổng quát: $C(n)=2 \\cdot F(n+1)-1$, với $F(11)=89$ → $2 \\cdot 89-1=177$ ✓.)

### Bài 3 — \`sum(n)\` iterative

\`\`\`go
// Đệ quy: sum(n) = n + sum(n-1), base sum(0)=0.
// Iterative O(1) stack:
func sumIter(n int) int {
	total := 0
	for i := 1; i <= n; i++ {
		total += i
	}
	return total
}
\`\`\`

Đệ quy gốc tốn $O(n)$ stack ($n$ frame); bản lặp tốn $O(1)$ — không frame mới mỗi vòng. Cả hai cho cùng $n(n+1)/2$.

### Bài 4 — Độ phức tạp Hanoi

\`hanoi(n)\` gọi \`hanoi(n−1)\` **hai lần** + 1 bước chuyển đĩa to → recurrence:

\`\`\`
T(n) = 2T(n−1) + 1,   T(0) = 0
\`\`\`

Telescoping (như mục 6.2): $T(n)=2^n-1$. **Verify:** $T(3)=2^3-1=7$ ✓. Độ phức tạp thời gian $\\Theta(2^n)$, space (độ sâu stack) $\\Theta(n)$.

### Bài 5 — Sửa bug stack overflow

Hàm \`power\` **thiếu base case** → \`exp\` giảm xuống âm vô tận → stack overflow.

\`\`\`go
// SỬA: base case exp == 0 trả về 1 (base^0 = 1).
func power(base, exp int) int {
	if exp == 0 { // base case
		return 1
	}
	return base * power(base, exp-1) // recursive case, exp nhỏ dần về 0
}
\`\`\`

\`power(2,10)=1024\`. Recurrence $T(\\text{exp})=T(\\text{exp}-1)+O(1)=\\Theta(\\text{exp})$.

### Bài 6 — Chứng minh \`T(n)=2T(n/2)+n = Θ(n log n)\` bằng recursion tree

Vẽ cây, ghi chi phí phi-đệ-quy mỗi node:

- **Level 0:** 1 node cỡ $n$, chi phí $n$. Tổng level $= n$.
- **Level 1:** 2 node cỡ $n/2$, mỗi node chi phí $n/2$. Tổng level $= 2 \\cdot (n/2) = n$.
- **Level 2:** 4 node cỡ $n/4$, mỗi $n/4$. Tổng $= 4 \\cdot (n/4) = n$.
- **Level k:** $2^k$ node cỡ $n/2^k$, mỗi $n/2^k$. Tổng $= 2^k \\cdot (n/2^k) = n$.

**Mỗi level đều tốn đúng $n$.** Cây dừng khi kích thước node = 1: $n/2^k = 1 \\Rightarrow k = \\log_2 n$ → có $\\log_2 n + 1$ level.

**Tổng toàn cây** $= n \\times (\\log_2 n + 1) = n \\log_2 n + n = \\Theta(n \\log n)$. ∎

**Verify $n=8$:** 4 level, mỗi level $8$ → $4 \\times 8=32$; bậc khớp $n \\log_2 n = 8 \\times 3 = 24$ (cùng $\\Theta(n \\log n)$) ✓.

---

## 12. Code & Minh họa

- Code Go inline xuyên suốt bài (factorial, fib naive/memo, Hanoi, merge sort, iterative + explicit stack). Không có \`solutions.go\` riêng cho lesson này.
- [visualization.html](./visualization.html) — 3 module tương tác:
  1. **Recursion tree visualizer** — chọn recurrence, vẽ cây, tính tổng mỗi level → kết quả.
  2. **Call stack animator** — animate push/pop frame của \`fib\`/\`factorial\`, đếm số call (naive vs memo).
  3. **Master Theorem solver** — nhập \`a, b, f(n)\`, hiện case + kết quả.

## Bài tiếp theo

→ [Lesson 04 — Tính đúng đắn & Invariant](../lesson-04-correctness-invariant/README.md): sau khi biết đo *tốc độ* đệ quy, học cách chứng minh thuật toán *cho ra kết quả đúng* bằng loop invariant và quy nạp.

## Tham khảo

- CLRS — *Introduction to Algorithms*, ch. 4 (Divide-and-Conquer, Master Theorem).
- [Lesson 01 — Big-O](../lesson-01-bigo-asymptotic/README.md), [Lesson 02 — Amortized](../lesson-02-amortized-analysis/README.md).
- [Tier 4 — Dynamic Programming](../tier-4-dynamic-programming/index.html) (memoization sâu hơn).
`;
