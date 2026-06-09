// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: Math/05-NumberTheory-Combinatorics-Logic/lesson-06-induction/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 06 — Quy nạp toán học

## Mục tiêu

- Hiểu **nguyên lý quy nạp toán học** — kỹ thuật chứng minh cốt lõi cho mệnh đề về số tự nhiên.
- Phân biệt **quy nạp yếu** và **quy nạp mạnh**.
- Áp dụng vào: tổng dãy số, bất đẳng thức, chia hết.

## Kiến thức tiền đề

- [Lesson 03 — Tổ hợp](../lesson-03-permutations-combinations/).

---

## 1. Quy nạp là gì?

💡 **Trực giác (domino)**: Có vô số quân domino đặt thẳng hàng. Nếu:
- (1) Quân đầu tiên đổ.
- (2) Mỗi quân đổ làm quân tiếp theo đổ.

Thì **TẤT CẢ quân đều đổ**.

Trong toán: chứng minh $P(n)$ đúng với mọi $n \\ge n_0$ bằng cách:
1. **Cơ sở**: chứng minh $P(n_0)$ đúng.
2. **Quy nạp**: giả sử $P(k)$ đúng ($k \\ge n_0$), chứng minh $P(k+1)$ đúng.

❓ **Câu hỏi tự nhiên của người đọc**

- *"Giả sử $P(k)$ đúng — chẳng phải đó là điều cần chứng minh sao? Vòng tròn luẩn quẩn?"* Không. Ta KHÔNG giả sử $P(n)$ đúng với mọi n; ta chỉ giả sử nó đúng **tại 1 giá trị k** rồi chứng minh **kéo theo** k+1. Như domino: ta không giả định "mọi quân đổ", chỉ giả định "nếu quân k đổ thì quân k+1 đổ". Cộng với "quân đầu đổ" → tất cả đổ.
- *"Vì sao chỉ 2 bước mà phủ được vô hạn n?"* Cơ sở cho $P(n_0)$. Bước quy nạp cho $P(n_0) \\implies P(n_0+1) \\implies P(n_0+2) \\implies \\dots$ — dây chuyền vô tận. Mỗi n cụ thể đạt được sau hữu hạn bước.

⚠ **Lỗi thường gặp — bỏ qua bước cơ sở**. Chỉ chứng minh $P(k) \\implies P(k+1)$ mà không kiểm $P(n_0)$ thì vô nghĩa: domino đổ dây chuyền nhưng nếu không ai đẩy quân đầu thì chẳng quân nào đổ. Phản ví dụ (mục 7): "mọi số tự nhiên bằng nhau" có bước quy nạp hình thức nhưng cơ sở sai → mệnh đề sai.

🔁 **Dừng lại tự kiểm tra**

1. Hai thành phần bắt buộc của một chứng minh quy nạp là gì?
2. Trong analogy domino, "bước cơ sở" tương ứng điều gì?

<details><summary>Đáp án</summary>

1. (1) Cơ sở $P(n_0)$ đúng; (2) Bước quy nạp $P(k) \\implies P(k+1)$.
2. Quân domino đầu tiên đổ (có người đẩy).

</details>

### 📝 Tóm tắt mục 1

- Quy nạp = domino: cơ sở + hiệu ứng dây chuyền.
- Giả thuyết quy nạp chỉ giả định P đúng tại **1 mốc k**, không phải mọi n.
- Thiếu cơ sở → toàn bộ chứng minh sụp.

---

## 2. Quy nạp yếu — Mẫu chuẩn

🎯 **Nguyên lý**: Cho $P(n)$ là mệnh đề về số tự nhiên n.
1. Cơ sở: $P(n_0)$ đúng (thường $n_0 = 0$ hoặc 1).
2. Bước quy nạp: $\\forall k \\ge n_0$, $P(k) \\implies P(k+1)$.

Thì $P(n)$ đúng $\\forall n \\ge n_0$.

> 📐 **Định nghĩa đầy đủ — Quy nạp toán học**
>
> **(a) Là gì**: 1 phương pháp chứng minh mệnh đề $P(n)$ đúng với **vô hạn** số tự nhiên, bằng cách chỉ kiểm tra 2 điều: (1) $P(n_0)$ đúng, (2) $P(k) \\implies P(k+1)$. Khi đó P đúng với mọi $n \\ge n_0$ — không cần kiểm từng cái.
>
> **(b) Vì sao cần**: Vì có vô hạn số tự nhiên — không thể kiểm tra mọi giá trị. Quy nạp là **cách duy nhất** chứng minh nghiêm túc các mệnh đề "$\\forall n \\in \\mathbb{N}, P(n)$". Là tiên đề thứ 5 của Peano (định nghĩa $\\mathbb{N}$). Áp dụng khắp toán: chứng minh công thức tổng ($\\sum i = \\frac{n(n+1)}{2}$), bất đẳng thức, chia hết, thuật toán đúng (correctness), đệ quy. Trong CS: chứng minh thuật toán đệ quy đúng (tower of Hanoi, merge sort) bằng quy nạp.
>
> **(c) Ví dụ số**: CM $1+2+\\dots+n = \\frac{n(n+1)}{2}$. Cơ sở n=1: $1 = 1\\cdot 2/2$ ✓. Quy nạp: giả sử $1+\\dots+k = \\frac{k(k+1)}{2}$, thì $1+\\dots+k+(k+1) = \\frac{k(k+1)}{2} + (k+1) = \\frac{(k+1)(k+2)}{2}$ ✓. CM $2^n > n$ với $n \\ge 1$: cơ sở $2 > 1$ ✓. Quy nạp: $2^k > k \\implies 2^{k+1} = 2\\cdot 2^k > 2k \\ge k+1$ (khi $k \\ge 1$) ✓. CM $n^3 + 2n$ chia hết 3: cơ sở $1+2 = 3$ ✓. Quy nạp: $(k+1)^3+2(k+1) = (k^3+2k) + 3(k^2+k+1)$ — cả 2 phần chia hết 3 ✓. **Pitfall**: "Mọi n: $n^2+n+41$ nguyên tố" — đúng n=0..39, SAI tại n=40 ($= 41^2$). Quy nạp không thay được bằng "kiểm vài giá trị".

❓ **Câu hỏi tự nhiên của người đọc**

- *"Chọn $n_0$ thế nào?"* Là giá trị nhỏ nhất mệnh đề cần đúng. Thường $n_0 = 0$ hoặc 1, nhưng có thể lớn hơn: $2^n > n^2$ chỉ đúng từ $n \\ge 5$ → cơ sở $n_0 = 5$.
- *"Trong bước quy nạp, dùng giả thuyết ở đâu?"* Phải dùng ở 1 chỗ rõ ràng (đánh dấu "theo giả thuyết quy nạp"). Nếu chứng minh $P(k+1)$ mà KHÔNG dùng $P(k)$ thì đó không phải quy nạp (và thường là sai sót).

🔁 **Dừng lại tự kiểm tra**

1. Viết bước cơ sở cho mệnh đề $1+3+5+\\dots+(2n-1) = n^2$ với $n_0 = 1$.
2. Trong bước quy nạp của tổng $1+2+\\dots+n$, ta cộng thêm hạng tử nào để đi từ k tới k+1?

<details><summary>Đáp án</summary>

1. n = 1: VT = 1, VP = $1^2 = 1$ ✓.
2. Cộng thêm $(k+1)$: $\\frac{k(k+1)}{2} + (k+1) = \\frac{(k+1)(k+2)}{2}$.

</details>

### 📝 Tóm tắt mục 2

- Mẫu chuẩn: cơ sở $P(n_0)$ + bước $\\forall k \\ge n_0: P(k) \\implies P(k+1)$.
- $n_0$ = giá trị nhỏ nhất mệnh đề cần đúng (không nhất thiết 0/1).
- Bước quy nạp PHẢI dùng giả thuyết $P(k)$, nếu không thì sai.

---

## 3. Ví dụ kinh điển — Tổng 1 + 2 + ... + n = n(n+1)/2

**Bước 1 (cơ sở)**: n = 1.
- VT = 1. VP = $1\\cdot 2/2 = 1$. ✓.

**Bước 2 (quy nạp)**: Giả sử $P(k)$ đúng: $1 + 2 + \\dots + k = \\frac{k(k+1)}{2}$.

Cần chứng minh $P(k+1)$: $1 + 2 + \\dots + k + (k+1) = \\frac{(k+1)(k+2)}{2}$.

Tính:

$$\\begin{aligned}
1 + 2 + \\dots + k + (k+1) &= \\frac{k(k+1)}{2} + (k+1) &&\\text{(giả thuyết quy nạp)} \\\\
&= (k+1)\\cdot\\left[\\frac{k}{2} + 1\\right] \\\\
&= (k+1)\\cdot\\frac{k+2}{2} \\quad\\checkmark
\\end{aligned}$$

Vậy $P(n)$ đúng $\\forall n \\ge 1$. □

---

## 4. Ví dụ — Bất đẳng thức 2^n > n (n ≥ 5)

**Cơ sở n = 5**: $2^5 = 32 > 5$ ✓.

**Quy nạp**: Giả sử $2^k > k$. Cần CM $2^{k+1} > k+1$.
- $2^{k+1} = 2\\cdot 2^k > 2k$ (giả thuyết).
- $2k = k + k \\ge k + 5 > k + 1$ (vì $k \\ge 5$).
- → $2^{k+1} > k+1$ ✓. □

⚠ **Lưu ý**: Phải chọn cơ sở đủ lớn. Ví dụ n = 2: $2^2 = 4 > 2$ ✓, n = 3: $8 > 3$ ✓, ... thực ra $2^n > n$ đúng từ n = 1, nhưng nếu bài hỏi $n \\ge 5$ thì làm theo.

---

## 5. Ví dụ — Chia hết 7 | (8^n - 1)

💡 **Trực giác / Hình dung**: với bài chia hết, mẹo là **tách số ở bước k+1 thành "phần đã biết chia hết" cộng "phần thấy rõ chia hết"**. Ở đây $8^{k+1} - 1 = 8\\cdot(8^k - 1) + 7$: phần đầu chia hết 7 theo giả thuyết, phần $7$ hiển nhiên chia hết 7 → tổng chia hết 7.

**Cơ sở n = 1**: $8 - 1 = 7$. $7 \\mid 7$ ✓.

**Quy nạp**: Giả sử $7 \\mid (8^k - 1)$. CM $7 \\mid (8^{k+1} - 1)$.
- $8^{k+1} - 1 = 8\\cdot 8^k - 1 = 8\\cdot(8^k - 1) + 7$.
- $7 \\mid (8^k - 1)$ (giả thuyết) → $7 \\mid 8\\cdot(8^k - 1)$.
- $7 \\mid 7$.
- → $7 \\mid$ tổng $= 8^{k+1} - 1$. □

❓ **Câu hỏi tự nhiên của người đọc**

- *"Vì sao tách $8^{k+1} - 1 = 8\\cdot(8^k-1) + 7$?"* Để **lộ ra** $(8^k - 1)$ — đúng cái giả thuyết quy nạp cho ta. Đây là kỹ thuật chung: cố biến đổi biểu thức bước k+1 để xuất hiện biểu thức bước k.
- *"Bài tổng (mục 3), bất đẳng thức (mục 4), chia hết (mục 5) khác nhau chỗ nào?"* Cấu trúc 2 bước giống hệt; chỉ khác **cách dùng giả thuyết**: tổng → thay thế; bất đẳng thức → chặn trên/dưới; chia hết → tách phần chia hết.

🔁 **Dừng lại tự kiểm tra**

1. Trong bước quy nạp $3 \\mid (4^n - 1)$, tách $4^{k+1} - 1$ thế nào?
2. Cơ sở n=1 của $7 \\mid (8^n - 1)$ cho giá trị gì?

<details><summary>Đáp án</summary>

1. $4^{k+1} - 1 = 4\\cdot(4^k - 1) + 3$; phần đầu chia hết 3 (giả thuyết), phần $3$ hiển nhiên.
2. $8^1 - 1 = 7$, và $7 \\mid 7$ ✓.

</details>

### 📝 Tóm tắt mục 3–5

- 3 dạng quy nạp phổ biến: tổng dãy, bất đẳng thức, chia hết — cùng khung 2 bước.
- Chia hết: tách $f(k+1) = (\\text{bội cũ chia hết}) + (\\text{phần hiển nhiên chia hết})$.
- Luôn biến đổi để **lộ ra biểu thức bước k** dùng giả thuyết.

---

## 6. Quy nạp mạnh (Strong Induction)

💡 **Trực giác / Hình dung**: quy nạp yếu là domino "mỗi quân chỉ đẩy quân kế tiếp". Quy nạp mạnh là domino "quân k+1 được đẩy bởi **tất cả** quân trước đó cùng lúc". Dùng khi P(k+1) cần dựa vào nhiều bước trước (vd P(k) và P(k−1)), không chỉ P(k) liền trước.

🎯 **Khác**: Thay vì giả sử chỉ $P(k)$, giả sử $P(n_0), P(n_0+1), \\dots, P(k)$ **tất cả** đúng.

$$[P(n_0) \\land P(n_0+1) \\land \\dots \\land P(k)] \\implies P(k+1)$$

⟶ Dùng khi P(k+1) cần kết quả của nhiều bước trước, không chỉ P(k).

### Ví dụ — Phân tích thừa số nguyên tố

**Mệnh đề**: Mọi $n \\ge 2$ viết được thành tích các số nguyên tố.

**Cơ sở n = 2**: 2 nguyên tố → biểu diễn là chính nó. ✓.

**Quy nạp (mạnh)**: Giả sử mọi $2 \\le m \\le k$ viết được. CM k+1 viết được.
- Nếu k+1 nguyên tố: xong.
- Nếu k+1 hợp số: $k+1 = a\\cdot b$ với $1 < a, b < k+1$. Theo giả thuyết, **a** và **b** đều viết được thành tích nguyên tố. → k+1 = (tích của a) · (tích của b) cũng viết được. □

⟶ Đây là **chứng minh định lý cơ bản số học** (L02).

❓ **Câu hỏi tự nhiên của người đọc**

- *"Khi nào BẮT BUỘC dùng quy nạp mạnh thay vì yếu?"* Khi bước k+1 cần $\\ge 2$ bước trước, hoặc 1 bước **không liền kề**. Vd phân tích thừa số: $k+1 = a\\cdot b$ với $a, b < k+1$ nhưng KHÔNG nhất thiết bằng k → cần giả thuyết cho mọi giá trị $\\le k$, không chỉ $P(k)$.
- *"Quy nạp mạnh có 'mạnh hơn' thật không?"* Về sức biểu đạt thì **tương đương** quy nạp yếu (chứng minh được lẫn nhau), nhưng quy nạp mạnh tiện hơn cho các bài đệ quy phân nhánh.

⚠ **Lỗi thường gặp**: dùng quy nạp yếu cho bài cần nhiều bước trước. Phản ví dụ: CM số Fibonacci $F_n \\le 2^n$ — bước $F_{k+1} = F_k + F_{k-1}$ cần CẢ $P(k)$ và $P(k-1)$. Chỉ giả sử $P(k)$ (quy nạp yếu) là **thiếu** → phải dùng quy nạp mạnh (và cần 2 cơ sở: n=1 và n=2).

🔁 **Dừng lại tự kiểm tra**

1. Vì sao chứng minh "mọi $n \\ge 2$ phân tích được thành tích nguyên tố" cần quy nạp mạnh?
2. Quy nạp mạnh cần mấy bước cơ sở cho bài Fibonacci $F_n \\le 2^n$?

<details><summary>Đáp án</summary>

1. Vì $k+1 = a\\cdot b$ với a, b bất kỳ trong $[2, k]$ — cần giả thuyết đúng cho **mọi** $m \\le k$, không riêng k.
2. Hai cơ sở: $F_1 = 1 \\le 2$ và $F_2 = 1 \\le 4$ (vì bước dùng cả 2 giá trị trước).

</details>

### 📝 Tóm tắt mục 6

- Quy nạp mạnh giả sử P đúng cho **mọi** giá trị từ $n_0$ tới k.
- Dùng khi P(k+1) cần nhiều bước trước (đệ quy phân nhánh, Fibonacci, phân tích thừa số).
- Tương đương sức mạnh với quy nạp yếu, nhưng tiện hơn; có thể cần nhiều cơ sở.

---

## 7. Lỗi thường gặp

### ⚠ Lỗi 1: Quên cơ sở

Nếu chỉ chứng minh bước quy nạp mà không cơ sở, mệnh đề có thể sai!

**Ví dụ sai**: "Mọi số tự nhiên = 1." Giả sử k = 1, k+1 = ... ?  → Cơ sở $0 = 1$ đã sai → không thể bắt đầu.

### ⚠ Lỗi 2: "Tất cả ngựa đều cùng màu" (bài toán nổi tiếng)

Mệnh đề sai: "Mọi tập n con ngựa đều cùng màu."  
- n=1 đúng (1 con tự nó cùng màu mình).  
- Giả sử mọi tập k ngựa cùng màu. Tập k+1 ngựa: lấy ra 1 con → còn k → cùng màu A. Lấy ra con khác → cùng màu A. → Cả k+1 cùng màu A.  
- **Lỗi**: khi k = 1 → "lấy ra 1 con" → còn 0 con. 2 tập 0 con không "trùng giao" được → bước k → k+1 sai khi k = 1.

⟶ Bài học: **Kiểm tra bước quy nạp với k nhỏ nhất**.

❓ **Câu hỏi tự nhiên của người đọc**

- *"Làm sao biết bước quy nạp 'lươn lẹo'?"* Kiểm tra nó tại **k nhỏ nhất** (thường $k = n_0$). Bài "ngựa cùng màu" sập vì khi k=1, lập luận "lấy ra 1 con, 2 nhóm con giao nhau" không còn giao → bước k→k+1 sai tại k=1.
- *"Kiểm vài giá trị đầu đúng có đủ kết luận không?"* **Không bao giờ đủ**. Xem mệnh đề $n^2+n+41$: đúng từ n=0 tới 39 nhưng sai tại n=40. Quan sát $\\neq$ chứng minh.

🔁 **Dừng lại tự kiểm tra**

1. "Chứng minh" mọi nhóm n người có cùng chiều cao sai ở bước nào?
2. $n^2 + n + 41$ nguyên tố với n = 0,1,2 — kết luận "đúng mọi n" sai vì sao?

<details><summary>Đáp án</summary>

1. Giống "ngựa cùng màu": bước k→k+1 cần 2 nhóm con giao nhau, nhưng tại k=1 chúng không giao → đứt dây chuyền.
2. Chỉ kiểm vài giá trị, không phải quy nạp. Thực tế sai tại n=40: $40^2+40+41 = 1681 = 41^2$.

</details>

### 📝 Tóm tắt mục 7

- Quên cơ sở → toàn bộ sụp (dù bước quy nạp đúng).
- Bước k→k+1 phải đúng cả tại **k nhỏ nhất** (bẫy "ngựa cùng màu").
- Kiểm vài giá trị KHÔNG thay được chứng minh (phản ví dụ $n^2+n+41$).

---

## 8. Bài tập

### Bài tập

**Bài 1**: CM $1^2 + 2^2 + \\dots + n^2 = \\frac{n(n+1)(2n+1)}{6}$.

**Bài 2**: CM $3 \\mid (n^3 - n)$ với mọi $n \\ge 0$.

**Bài 3**: CM dãy Fibonacci $F_n \\le 2^n$.

**Bài 4**: CM $1 + 2 + 4 + \\dots + 2^n = 2^{n+1} - 1$.

**Bài 5**: Sai ở đâu trong "chứng minh" sau? Mệnh đề: $n^2 + n + 41$ là số nguyên tố $\\forall n \\ge 0$. Cơ sở n=0: 41 nguyên tố ✓. n=1: 43 ✓. n=2: 47 ✓. ... → "Đúng $\\forall n$".

### Lời giải

**Bài 1**: Cơ sở n=1: $1 = 1\\cdot 2\\cdot 3/6 = 1$ ✓.  
Bước: giả sử $\\sum_{i=1}^k i^2 = \\frac{k(k+1)(2k+1)}{6}$. CM $\\sum_{i=1}^{k+1} i^2 = \\frac{(k+1)(k+2)(2k+3)}{6}$.  
$\\text{LHS} = \\frac{k(k+1)(2k+1)}{6} + (k+1)^2 = (k+1)\\left[\\frac{k(2k+1)}{6} + (k+1)\\right] = (k+1)\\cdot\\frac{2k^2+k+6k+6}{6} = (k+1)\\cdot\\frac{2k^2+7k+6}{6} = \\frac{(k+1)(k+2)(2k+3)}{6}$ ✓.

**Bài 2**: $n^3 - n = n(n-1)(n+1)$. 3 số liên tiếp → có 1 số $\\vdots\\ 3$.

**Bài 3**: $F_1 = 1 \\le 2$ ✓, $F_2 = 1 \\le 4$. Quy nạp mạnh: $F_{k+1} = F_k + F_{k-1} \\le 2^k + 2^{k-1} = 3\\cdot 2^{k-1} \\le 2\\cdot 2^k = 2^{k+1}$. □

**Bài 4**: Cơ sở n=0: $1 = 2-1$ ✓. Bước: giả sử $= 2^{k+1}-1$. Thêm $2^{k+1}$: $= 2^{k+1}-1+2^{k+1} = 2\\cdot 2^{k+1}-1 = 2^{k+2}-1$ ✓.

**Bài 5**: **Không** kiểm tra mọi n — chỉ kiểm tra vài giá trị không phải quy nạp! Thực tế n=40: $40^2+40+41 = 1681 = 41^2$. → KHÔNG nguyên tố. Mệnh đề sai. "Quan sát vài trường hợp" $\\neq$ chứng minh.

---

## 9. Bài tiếp theo

[Lesson 07 — Logic, tập hợp, ánh xạ](../lesson-07-logic-sets-maps/).

## 📝 Tổng kết

1. **Quy nạp** = domino: cơ sở $P(n_0)$ + bước $P(k) \\implies P(k+1)$.
2. **Quy nạp mạnh**: giả sử $P(n_0)..P(k)$ cùng đúng. Dùng cho phân tích, đệ quy phức tạp.
3. **Lỗi phổ biến**: quên cơ sở; bước k→k+1 không đúng khi k nhỏ.
4. Kiểm tra vài giá trị **không** thay được chứng minh quy nạp.
`;
