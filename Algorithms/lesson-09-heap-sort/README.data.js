// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: Algorithms/lesson-09-heap-sort/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 09 — Heap Sort

> **Tier 1 — Sắp xếp** · Bài 4/6
> Tiền đề: [Lesson 03 — Đệ quy & quan hệ truy hồi](../lesson-03-recursion-recurrence/), [Lesson 07 — Merge Sort](../lesson-07-merge-sort/), [Lesson 08 — Quicksort](../lesson-08-quicksort/), và [DataStructures — Heap & Priority Queue](../../DataStructures/).

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Hiểu **binary heap** là gì và vì sao nó lưu được trong một mảng phẳng (không cần con trỏ).
- Cài và giải thích được hai thao tác cốt lõi: **sift-down (heapify)** và **sift-up**.
- Hiểu vì sao **build heap chỉ tốn O(n)** chứ không phải O(n log n) — và chứng minh được điều đó bằng tổng chuỗi.
- Cài **heap sort** in-place, O(n log n) mọi trường hợp, O(1) bộ nhớ phụ.
- Biết heap sort **không ổn định**, và so sánh được với merge sort / quicksort để chọn đúng tình huống.
- Dùng heap như **priority queue** cho các bài toán thực tế: top-k, k-th largest, median of stream, merge k lists, và tease Dijkstra ở [Tier 5](../tier-5-graph/index.html).

## Kiến thức tiền đề

- **Big-O** ([Tier 0](../tier-0-foundations/index.html)): bạn cần thoải mái với O(n), O(log n), O(n log n).
- **Đệ quy & cây** ([Lesson 03](../lesson-03-recursion-recurrence/)): sift-down có thể viết đệ quy; chiều cao cây là log n.
- **Sắp xếp so sánh** ([Lesson 07](../lesson-07-merge-sort/), [Lesson 08](../lesson-08-quicksort/)): heap sort là thành viên thứ ba của bộ ba O(n log n) — nó bù đắp đúng nhược điểm của hai cái kia (merge tốn bộ nhớ, quick có worst-case O(n²)).
- **Heap & priority queue** ([DataStructures](../../DataStructures/)): bài đó dạy heap như một *cấu trúc dữ liệu*; bài này dùng nó để *sắp xếp* và giải thuật toán.

---

## 1. Recap heap — cây nhị phân đầy đủ nhét vừa một mảng

> 💡 **Trực giác / Hình dung**
> Tưởng tượng một giải đấu loại trực tiếp, nhưng "ngược": ở mỗi cặp đấu, **người mạnh hơn ngồi phía trên**. Cứ thế lên đến đỉnh — đỉnh là người mạnh nhất toàn giải. Đó chính là **max-heap**: ai cũng yếu hơn (hoặc bằng) "sếp" ngay trên mình. Bạn không cần nhìn cả giải để biết ai mạnh nhất — chỉ cần nhìn đỉnh.

### 1.1 Định nghĩa

**(a) Là gì** — **Binary heap** là một **cây nhị phân đầy đủ (complete binary tree)** thỏa **heap property**:

- **Max-heap**: mỗi nút cha **≥** cả hai con. → gốc là phần tử **lớn nhất**.
- **Min-heap**: mỗi nút cha **≤** cả hai con. → gốc là phần tử **nhỏ nhất**.

"Đầy đủ" nghĩa là: mọi mức đều được lấp đầy, trừ mức cuối cùng được lấp **từ trái sang phải** không có lỗ hổng.

**(b) Vì sao tồn tại** — Ta thường cần lấy nhanh phần tử **lớn nhất (hoặc nhỏ nhất)** ra khỏi một tập đang thay đổi (thêm/bớt liên tục). Mảng đã sắp thì lấy max O(1) nhưng chèn O(n); mảng chưa sắp thì chèn O(1) nhưng tìm max O(n). Heap cân bằng: **lấy max O(1) để xem, O(log n) để gỡ, chèn O(log n)**. Đó là cấu trúc của *priority queue*.

**(c) Ví dụ trực giác bằng số** — Mảng \`[9, 5, 6, 2, 4, 1]\` hiểu như cây:

\`\`\`
            9            ← index 0 (gốc, max)
          /   \\
        5       6        ← index 1, 2
       / \\     /
      2   4   1          ← index 3, 4, 5
\`\`\`

Kiểm tra heap property: 9 ≥ 5, 9 ≥ 6 ✓; 5 ≥ 2, 5 ≥ 4 ✓; 6 ≥ 1 ✓. Đây là max-heap hợp lệ.

### 1.2 Vì sao một MẢNG biểu diễn được CÂY (không cần con trỏ)

Đây là điểm tinh tế nhất của heap. Vì cây *đầy đủ*, ta có thể đánh số các nút theo thứ tự từ trên xuống, từ trái sang phải — và **vị trí trong mảng quyết định quan hệ cha-con bằng công thức số học**:

Với phần tử ở index \`i\` (mảng 0-based):

| Quan hệ | Công thức |
|---------|-----------|
| Con trái | \`2*i + 1\` |
| Con phải | \`2*i + 2\` |
| Cha | \`(i - 1) / 2\` (chia nguyên) |

> ❓ **Câu hỏi tự nhiên của người đọc**
> - *"Tại sao là \`2i+1\` mà không phải \`2i\`?"* — Vì mảng 0-based. Nếu dùng 1-based (như sách CLRS) thì con trái là \`2i\`, con phải \`2i+1\`, cha \`i/2\`. Chọn quy ước nào cũng được, miễn nhất quán. Bài này dùng **0-based** vì khớp Go.
> - *"Lưu trong mảng thì tiết kiệm gì?"* — Không tốn bộ nhớ cho con trỏ (mỗi nút cây thường cần 2 con trỏ = 16 byte trên 64-bit). Quan trọng hơn: mảng nằm liền nhau trong bộ nhớ → **cache locality** tốt hơn cây con trỏ rải rác.

**Walk-through công thức** với mảng \`[9, 5, 6, 2, 4, 1]\`:

- Index 0 (giá trị 9): con trái = \`2*0+1 = 1\` → giá trị 5; con phải = \`2*0+2 = 2\` → giá trị 6. ✓ (khớp hình trên)
- Index 1 (giá trị 5): con trái = \`2*1+1 = 3\` → giá trị 2; con phải = \`2*1+2 = 4\` → giá trị 4. ✓
- Index 2 (giá trị 6): con trái = \`2*2+1 = 5\` → giá trị 1; con phải = \`2*2+2 = 6\` → **vượt mảng** (n=6) → không có con phải. ✓
- Index 4 (giá trị 4): cha = \`(4-1)/2 = 1\` (chia nguyên) → giá trị 5. ✓ Đúng là 5 đứng trên 4 trong hình.
- Index 5 (giá trị 1): cha = \`(5-1)/2 = 2\` → giá trị 6. ✓

> ⚠ **Lỗi thường gặp**
> - Quên \`(i-1)/2\` mà viết \`i/2\` cho mảng 0-based → sai. Với 0-based: cha của index 2 phải là \`(2-1)/2 = 0\`, còn \`2/2 = 1\` là SAI.
> - Quên kiểm tra con có vượt mảng không (\`< n\`) trước khi truy cập → panic index out of range.

### 1.3 Một vài tính chất cần nhớ

- Với heap n phần tử, **chiều cao** là \`⌊log₂ n⌋\` → mọi thao tác đi từ gốc xuống lá tốn tối đa O(log n) bước.
- Các phần tử từ index \`⌊n/2⌋\` đến \`n-1\` đều là **lá** (không có con) — đây là điểm khởi đầu quan trọng cho build heap (mục 3).
- Heap **không** sắp xếp đầy đủ: nó chỉ đảm bảo cha ≥ con. Ví dụ \`[9, 5, 6, ...]\` — số 5 (con trái) nhỏ hơn 6 (con phải) là chuyện bình thường, heap không quan tâm thứ tự giữa anh em.

> 🔁 **Dừng lại tự kiểm tra**
> 1. Trong max-heap, phần tử nhỏ nhất chắc chắn nằm ở đâu?
> 2. Cho mảng \`[8, 4, 7, 1, 3]\`, con của index 1 là những index nào, giá trị bao nhiêu?
>
> <details><summary>Đáp án</summary>
>
> 1. Ở một trong các **lá** (index \`⌊n/2⌋..n-1\`). Heap KHÔNG đảm bảo lá ngoài cùng bên phải là nhỏ nhất — chỉ chắc chắn nhỏ nhất là một lá nào đó, vì mọi nút không-lá đều ≥ con của nó nên không thể nhỏ nhất.
> 2. Con của index 1: trái = \`2*1+1 = 3\` (giá trị 1), phải = \`2*1+2 = 4\` (giá trị 3).
> </details>

> 📝 **Tóm tắt mục 1**
> - Heap = complete binary tree + heap property (cha ≥ con cho max-heap).
> - Lưu trong **mảng**: con trái \`2i+1\`, con phải \`2i+2\`, cha \`(i-1)/2\`.
> - Gốc (index 0) là max (max-heap) hoặc min (min-heap), xem O(1).
> - Chiều cao O(log n) → mọi thao tác đi dọc cây tốn O(log n).
> - Lá nằm ở index \`⌊n/2⌋..n-1\`.

---

## 2. Hai thao tác cốt lõi: sift-down và sift-up

Mọi thứ về heap (build, sort, push, pop) đều xây trên hai động tác sửa-vi-phạm này.

### 2.1 sift-down (còn gọi heapify, percolate-down, max-heapify)

> 💡 **Trực giác**
> Bạn vừa đặt một phần tử "yếu" vào ghế sếp (gốc một cây con). Nó không xứng. Vậy nó **chìm xuống**: ở mỗi bước, so với con lớn hơn; nếu con lớn hơn nó thì đổi chỗ và đi tiếp xuống. Như bong bóng nặng chìm trong nước cho tới khi tới đúng tầng của mình.

**Ý tưởng**: giả sử hai cây con của node \`i\` đã là max-heap hợp lệ, nhưng bản thân \`i\` có thể nhỏ hơn con. sift-down đẩy \`i\` xuống đúng chỗ:

1. Tìm con lớn nhất trong hai con (nếu có).
2. Nếu con lớn nhất **> cha**: đổi chỗ cha với con đó, rồi lặp lại từ vị trí mới.
3. Nếu cha đã ≥ cả hai con (hoặc đã thành lá): dừng.

\`\`\`go
// siftDown đẩy phần tử ở index i xuống đúng vị trí trong max-heap a[0..n-1].
// Tiền đề: hai cây con của i đã là max-heap hợp lệ.
// Độ phức tạp: O(log n) — đi dọc một nhánh từ i xuống lá.
func siftDown(a []int, i, n int) {
	for {
		largest := i           // giả định cha lớn nhất
		left := 2*i + 1        // con trái
		right := 2*i + 2       // con phải

		// nếu con trái tồn tại và lớn hơn "largest" hiện tại
		if left < n && a[left] > a[largest] {
			largest = left
		}
		// nếu con phải tồn tại và lớn hơn "largest" hiện tại
		if right < n && a[right] > a[largest] {
			largest = right
		}
		// nếu cha đã lớn nhất → đúng chỗ, dừng
		if largest == i {
			return
		}
		// đổi chỗ cha với con lớn hơn, rồi tiếp tục chìm xuống
		a[i], a[largest] = a[largest], a[i]
		i = largest
	}
}
\`\`\`

**Walk-through sift-down** trên \`[3, 9, 6, 2, 4, 1]\`, gọi \`siftDown(a, 0, 6)\` (gốc giá trị 3 đang vi phạm):

\`\`\`
Bước 0:  i=0, a=[3, 9, 6, 2, 4, 1]
         left=1 (9), right=2 (6). largest: 9 > 3 → largest=1; 6 < 9 → giữ. largest=1≠0.
         swap a[0]↔a[1] → [9, 3, 6, 2, 4, 1].  i=1.
Bước 1:  i=1, a=[9, 3, 6, 2, 4, 1]
         left=3 (2), right=4 (4). largest: 2<3 → giữ; 4>3 → largest=4. largest=4≠1.
         swap a[1]↔a[4] → [9, 4, 6, 2, 3, 1].  i=4.
Bước 2:  i=4, left=9 vượt n=6 → không con. largest=4=i → dừng.
Kết quả: [9, 4, 6, 2, 3, 1]  (max-heap hợp lệ).
\`\`\`

Số lần lặp = 2 ≈ chiều cao cây. Với n=6, log₂6 ≈ 2.58 → khớp O(log n).

### 2.2 sift-up (percolate-up)

> 💡 **Trực giác**
> Ngược lại với sift-down: bạn vừa **thêm** một phần tử "mạnh" vào cuối mảng (một lá mới). Nếu nó mạnh hơn cha, nó **nổi lên**: đổi chỗ với cha, rồi tiếp tục so với cha mới, cho tới khi gặp cha mạnh hơn hoặc lên tới gốc.

Dùng khi **chèn (push)** một phần tử mới vào heap: thêm vào cuối mảng (giữ tính đầy đủ), rồi sift-up.

\`\`\`go
// siftUp đẩy phần tử ở index i lên đúng vị trí trong max-heap a[0..i].
// Dùng sau khi append một phần tử mới vào cuối mảng.
// Độ phức tạp: O(log n).
func siftUp(a []int, i int) {
	for i > 0 {
		parent := (i - 1) / 2
		if a[i] <= a[parent] { // cha đã ≥ → đúng chỗ
			return
		}
		a[i], a[parent] = a[parent], a[i] // nổi lên
		i = parent
	}
}

// push chèn x vào max-heap, trả về heap mới.
func push(a []int, x int) []int {
	a = append(a, x)   // thêm vào cuối (lá mới)
	siftUp(a, len(a)-1)
	return a
}
\`\`\`

**Walk-through sift-up**: heap \`[9, 4, 6, 2, 3, 1]\`, push \`8\`:

\`\`\`
append 8 → [9, 4, 6, 2, 3, 1, 8].  i=6.
Bước 0:  parent=(6-1)/2=2 (giá trị 6). a[6]=8 > 6 → swap → [9, 4, 8, 2, 3, 1, 6]. i=2.
Bước 1:  parent=(2-1)/2=0 (giá trị 9). a[2]=8 ≤ 9 → dừng.
Kết quả: [9, 4, 8, 2, 3, 1, 6]  (max-heap hợp lệ, 8 đã vào tầng đúng).
\`\`\`

> ❓ **Câu hỏi tự nhiên của người đọc**
> - *"Khi nào dùng sift-down, khi nào sift-up?"* — **Chèn mới** → thêm vào cuối → **sift-up** (phần tử có thể quá mạnh so với vị trí lá). **Gỡ gốc / build heap** → đặt phần tử vào gốc cây con → **sift-down** (phần tử có thể quá yếu so với gốc). Nhớ: build heap và heap sort chỉ dùng sift-down.
> - *"Sao build heap không dùng sift-up cho gọn?"* — Có thể, nhưng build bằng sift-up tốn **O(n log n)**, còn build bằng sift-down chỉ **O(n)** (chứng minh ở mục 9). Đó là lý do heap sort luôn build bằng sift-down.

> ⚠ **Lỗi thường gặp**
> - Dùng sift-up để build heap (đúng nhưng chậm hơn — O(n log n) thay vì O(n)).
> - Trong sift-down, so cha với **một** con cố định thay vì **con lớn hơn** → phá heap property. Phải chọn con lớn nhất trước khi đổi chỗ.

> 🔁 **Dừng lại tự kiểm tra**
> Heap \`[10, 7, 9, 3, 4]\`, push \`8\`. Trace sift-up.
>
> <details><summary>Đáp án</summary>
>
> append → \`[10, 7, 9, 3, 4, 8]\`, i=5. parent=(5-1)/2=2 (giá trị 9). 8 ≤ 9 → dừng ngay. Kết quả \`[10, 7, 9, 3, 4, 8]\`. (8 đứng yên vì cha 9 đã lớn hơn.)
> </details>

> 📝 **Tóm tắt mục 2**
> - **sift-down**: đẩy xuống, so với con LỚN hơn, dùng cho build heap & pop. O(log n).
> - **sift-up**: đẩy lên, so với cha, dùng cho push. O(log n).
> - Chèn = append + sift-up. Gỡ gốc = swap gốc với cuối + sift-down.

---

## 3. Build heap — biến mảng bất kỳ thành heap

> 💡 **Trực giác**
> Bạn có một đám đông xếp lộn xộn. Bạn không sửa từ gốc xuống (vì gốc phụ thuộc con). Bạn **sửa từ dưới lên**: bắt đầu từ các "quản lý cấp thấp nhất có nhân viên" (node không-lá cuối cùng), heapify từng cây con nhỏ; khi lên đến tầng cao hơn, các cây con bên dưới đã hợp lệ rồi nên sift-down từ trên xuống chạy đúng.

**Ý tưởng**: Lá (index \`⌊n/2⌋..n-1\`) đã là heap kích thước 1 — không cần làm gì. Ta gọi sift-down cho mọi node **không-lá**, đi từ node không-lá cuối cùng (\`⌊n/2⌋ - 1\`) lùi về gốc (index 0). Khi xử lý node \`i\`, hai cây con của nó đã được heapify trước rồi (vì ta đi từ dưới lên) → tiền đề của sift-down được thỏa.

\`\`\`go
// buildHeap biến mảng a thành max-heap tại chỗ.
// Chạy sift-down từ node không-lá cuối (n/2-1) lùi về gốc 0.
// Độ phức tạp: O(n) — KHÔNG phải O(n log n), chứng minh ở mục 9.
func buildHeap(a []int) {
	n := len(a)
	for i := n/2 - 1; i >= 0; i-- {
		siftDown(a, i, n)
	}
}
\`\`\`

> ❓ **Câu hỏi tự nhiên**
> - *"Sao bắt đầu từ \`n/2 - 1\`?"* — Các index \`n/2 .. n-1\` đều là lá (không có con) → đã là heap, bỏ qua. Node không-lá lớn nhất là \`n/2 - 1\`. Với n=6: lá là index 3,4,5; node không-lá cuối là index 2 = \`6/2-1\`.
> - *"Sao đi LÙI (từ cao index về 0)?"* — Để khi sift-down node \`i\`, hai con (index lớn hơn) đã được xử lý → đã là max-heap → tiền đề sift-down đúng. Đi xuôi sẽ phá tiền đề này.

**Walk-through build heap** trên \`[5, 2, 4, 1, 3]\` (n=5):

\`\`\`
Cây ban đầu:
         5
       /   \\
      2     4
     / \\
    1   3
Index lá: 5/2=2 → lá là index 2,3,4. Node không-lá cuối = 5/2-1 = 1.
Lặp i = 1, rồi i = 0.

i=1 (giá trị 2): siftDown(a,1,5)
   left=3 (1), right=4 (3). largest: 1<2 giữ; 3>2 → largest=4.
   swap a[1]↔a[4] → [5, 3, 4, 1, 2]. i=4 → lá, dừng.
                  5
                /   \\
               3     4
              / \\
             1   2
i=0 (giá trị 5): siftDown(a,0,5)
   left=1 (3), right=2 (4). largest: 3<5 giữ; 4<5 giữ → largest=0=i → dừng ngay.
Kết quả build: [5, 3, 4, 1, 2]  (max-heap hợp lệ).
\`\`\`

> ⚠ **Lỗi thường gặp**
> - Tưởng build heap là O(n log n). KHÔNG — là **O(n)**. Đây là cạm bẫy phỏng vấn kinh điển (xem mục 9 & 10).
> - Bắt đầu lặp từ index 0 đi xuôi → sai vì con chưa heapify.
> - Quên \`-1\`: lặp từ \`n/2\` thay vì \`n/2 - 1\` → bỏ sót node không-lá cuối cùng.

> 🔁 **Dừng lại tự kiểm tra**
> Build max-heap từ \`[1, 5, 3]\`. Trace.
>
> <details><summary>Đáp án</summary>
>
> n=3, node không-lá cuối = 3/2-1 = 0. Chỉ lặp i=0. siftDown(a,0,3): left=1(5), right=2(3). largest: 5>1 → largest=1; 3<5 giữ → largest=1. swap a[0]↔a[1] → \`[5,1,3]\`. i=1 lá, dừng. Kết quả \`[5, 1, 3]\`.
> </details>

> 📝 **Tóm tắt mục 3**
> - Build heap = sift-down mọi node không-lá, từ \`n/2-1\` lùi về 0.
> - Đi lùi để con luôn được heapify trước cha.
> - Lá \`n/2..n-1\` đã là heap, bỏ qua.
> - **O(n)** — không phải O(n log n).

---

## 4. Heap sort — sắp xếp bằng heap

> 💡 **Trực giác**
> Max-heap cho bạn lấy phần tử lớn nhất ở gốc rất rẻ. Vậy sắp xếp tăng dần = lặp đi lặp lại: **"nhổ" max ra, đặt nó về cuối vùng chưa sắp, thu nhỏ heap lại, sửa heap, lặp"**. Như rút quân bài lớn nhất khỏi bộ và xếp về cuối hàng, lặp tới khi hết.

### 4.1 Thuật toán

Hai pha:

1. **Build max-heap** từ mảng đầu vào (O(n)).
2. **Sortdown**: lặp \`n-1\` lần — mỗi vòng:
   - Đổi chỗ gốc \`a[0]\` (max hiện tại) với phần tử cuối vùng heap \`a[end]\`. → max đã về đúng chỗ cuối cùng.
   - Thu nhỏ vùng heap (\`end--\`): phần tử vừa đặt không còn thuộc heap.
   - sift-down gốc để khôi phục max-heap cho vùng heap mới.

\`\`\`go
// heapSort sắp xếp mảng a tăng dần, IN-PLACE.
// Pha 1: build max-heap O(n). Pha 2: extract-max n-1 lần, mỗi lần O(log n).
// Tổng: O(n log n) mọi trường hợp. Bộ nhớ phụ: O(1).
func heapSort(a []int) {
	n := len(a)

	// Pha 1: build max-heap
	for i := n/2 - 1; i >= 0; i-- {
		siftDown(a, i, n)
	}

	// Pha 2: lặp lấy max về cuối
	for end := n - 1; end > 0; end-- {
		a[0], a[end] = a[end], a[0] // max về cuối vùng chưa sắp
		siftDown(a, 0, end)         // sửa heap với size mới = end
	}
}
\`\`\`

> ❓ **Câu hỏi tự nhiên**
> - *"Sao max về cuối lại cho mảng TĂNG dần?"* — Lần đầu max về index \`n-1\`, lần hai max-còn-lại về \`n-2\`, ... → các phần tử lớn lấp dần từ phải sang trái → cuối cùng mảng tăng dần. (Muốn giảm dần thì dùng min-heap.)
> - *"Sao \`siftDown(a, 0, end)\` chứ không \`end+1\`?"* — Vì sau swap, phần tử vừa đặt ở index \`end\` đã "đông cứng", không thuộc heap nữa. Vùng heap còn lại là \`a[0..end-1]\`, tức size = \`end\`. Truyền \`n=end\` để sift-down không chạm vào phần đã sắp.

### 4.2 Walk-through ĐẦY ĐỦ trên \`[5, 2, 4, 1, 3]\`

**Pha 1 — build max-heap** (đã trace ở mục 3): \`[5, 2, 4, 1, 3]\` → \`[5, 3, 4, 1, 2]\`.

\`\`\`
Heap sau build:
         5
       /   \\
      3     4
     / \\
    1   2
Mảng: [5, 3, 4, 1, 2]
\`\`\`

**Pha 2 — extract-max** (vùng đã sắp ghi trong \`|...|\`):

\`\`\`
─── end=4 ───
swap a[0]↔a[4]: [2, 3, 4, 1, |5|].  (5 về đúng chỗ cuối)
siftDown(a, 0, 4): i=0(2). left=1(3),right=2(4). largest=2(giá trị 4>3).
   swap a[0]↔a[2] → [4, 3, 2, 1, |5|]. i=2. left=5 vượt n=4 → dừng.
Heap [4,3,2,1], đã sắp |5|.

─── end=3 ───
swap a[0]↔a[3]: [1, 3, 2, |4, 5|].
siftDown(a, 0, 3): i=0(1). left=1(3),right=2(2). largest=1(giá trị 3).
   swap a[0]↔a[1] → [3, 1, 2, |4,5|]. i=1. left=3 vượt n=3 → dừng.
Heap [3,1,2], đã sắp |4,5|.

─── end=2 ───
swap a[0]↔a[2]: [2, 1, |3, 4, 5|].
siftDown(a, 0, 2): i=0(2). left=1(1),right=2 vượt n=2. largest=0 (2>1) → dừng ngay.
Heap [2,1], đã sắp |3,4,5|.

─── end=1 ───
swap a[0]↔a[1]: [1, |2, 3, 4, 5|].
siftDown(a, 0, 1): i=0(1), left=1 vượt n=1 → dừng.
Heap [1], đã sắp |2,3,4,5|.

─── end=0 → vòng lặp kết thúc ───
Kết quả: [1, 2, 3, 4, 5]  ✓ tăng dần.
\`\`\`

Đếm công: build = 2 lần sift-down nhẹ; sortdown = 4 lần swap + 4 lần sift-down (mỗi cái ≤ log n). Tổng O(n log n).

> 🔁 **Dừng lại tự kiểm tra**
> Sau khi build max-heap, vì sao swap gốc với **cuối** rồi \`siftDown(a,0,end)\` lại không làm hỏng phần đã sắp ở các index ≥ end?
>
> <details><summary>Đáp án</summary>
>
> Vì sift-down chỉ thao tác trên \`a[0..end-1]\` (tham số n=end giới hạn \`left < n\`, \`right < n\`). Các index ≥ end không bao giờ bị đọc/ghi → phần đã sắp được "khóa".
> </details>

> 📝 **Tóm tắt mục 4**
> - Heap sort = build max-heap (O(n)) + extract-max n-1 lần (mỗi lần O(log n)).
> - Mỗi extract: swap gốc↔cuối, thu nhỏ heap, sift-down gốc.
> - Max về cuối → mảng tăng dần.
> - Tổng O(n log n), in-place.

---

## 5. Độ phức tạp

| Pha | Chi phí | Ghi chú |
|-----|---------|---------|
| Build max-heap | **O(n)** | Chứng minh ở mục 9 |
| Extract-max (n-1 lần) | **O(n log n)** | Mỗi lần 1 swap + 1 sift-down O(log n) |
| **Tổng thời gian** | **O(n log n)** | best = average = worst |
| **Bộ nhớ phụ** | **O(1)** | IN-PLACE — chỉ vài biến tạm |

**Điểm vàng**: heap sort cho **O(n log n) đảm bảo ở MỌI trường hợp** (kể cả worst-case), đồng thời **O(1) bộ nhớ phụ**. Đây là sự kết hợp mà merge sort (O(n) bộ nhớ) và quicksort (O(n²) worst-case) đều không có.

> ❓ **Câu hỏi tự nhiên**
> - *"Build O(n), sort O(n log n), tổng sao là O(n log n)?"* — Vì O(n) + O(n log n) = O(n log n) (số hạng lớn nuốt số hạng nhỏ). Build rẻ nhưng pha extract mới quyết định tổng.
> - *"Heap sort có chạy nhanh hơn trên mảng đã sắp không?"* — KHÔNG đáng kể. Khác bubble/insertion (best-case O(n) trên mảng sắp sẵn), heap sort vẫn O(n log n) vì vẫn phải build + extract toàn bộ. Không có "đường tắt" cho input thuận lợi.

> 📝 **Tóm tắt mục 5**
> - Build O(n), extract O(n log n), tổng **O(n log n)** mọi trường hợp.
> - **O(1) bộ nhớ phụ — in-place**.
> - Không có best-case nhanh hơn; ổn định về thời gian (no worst-case blow-up như quick).

---

## 6. Stability — heap sort KHÔNG ổn định

**Stable (ổn định)**: hai phần tử có khóa bằng nhau giữ nguyên thứ tự tương đối ban đầu sau khi sắp. Merge sort ổn định; heap sort **không**.

> 💡 **Trực giác vì sao không ổn định**
> Heap sort "nhảy" phần tử qua những khoảng cách xa (swap gốc với cuối, sift-down băng qua nhiều tầng). Các bước nhảy này không tôn trọng thứ tự ban đầu của hai phần tử bằng nhau.

**Ví dụ phản chứng cụ thể** — sắp theo khóa số, ghi nhãn để theo dõi:

\`\`\`
Input: [(2,a), (2,b), (1,c)]   ← hai phần tử khóa 2: a trước b
So sánh chỉ theo khóa số.

Build max-heap (n=3): siftDown(0): left=(2,b), right=(1,c).
   a[1]=2 không > a[0]=2 (dùng > nghiêm ngặt) → giữ; (1,c)<2 giữ → đứng yên.
   Heap: [(2,a),(2,b),(1,c)]
Pha 2:
  end=2: swap a[0]↔a[2] → [(1,c),(2,b),|(2,a)|]. siftDown(0,2):
     left=(2,b)>(1,c) → swap → [(2,b),(1,c),|(2,a)|].
  end=1: swap a[0]↔a[1] → [(1,c),|(2,b),(2,a)|]. siftDown(0,1): dừng.
Kết quả: [(1,c), (2,b), (2,a)]
\`\`\`

Thứ tự cuối của hai khóa 2 là **b trước a** — đảo ngược so với input (a trước b). → **không ổn định**.

> ❓ **Câu hỏi tự nhiên**
> - *"Làm sao để heap sort ổn định?"* — Gắn thêm chỉ số gốc (original index) vào khóa: so sánh \`(key, originalIndex)\`. Nhưng việc này tốn O(n) bộ nhớ phụ → mất luôn ưu điểm in-place. Nếu cần ổn định, dùng merge sort.

> 📝 **Tóm tắt mục 6**
> - Heap sort **không ổn định** — các bước nhảy xa phá thứ tự ban đầu của khóa bằng nhau.
> - Cần ổn định → merge sort (xem [Lesson 07](../lesson-07-merge-sort/)).

---

## 7. So sánh: heap sort vs merge sort vs quicksort

| Tiêu chí | Heap sort | Merge sort | Quicksort |
|----------|-----------|------------|-----------|
| Thời gian (best/avg/worst) | n log n / n log n / **n log n** | n log n / n log n / n log n | n log n / n log n / **n²** |
| Bộ nhớ phụ | **O(1)** | O(n) | O(log n) (stack) |
| Ổn định? | Không | **Có** | Không (bản thường) |
| Cache locality | Kém (nhảy xa) | Tốt (quét tuyến tính) | **Tốt** (quét liền) |
| Thực tế nhanh nhất? | Không | Vừa | **Thường nhanh nhất** |

> 💡 **Trực giác về cache**
> Quicksort/merge quét bộ nhớ gần như tuần tự → CPU prefetch giỏi, hit cache. Heap sort thì \`a[i]\` nhảy tới \`a[2i+1]\` — khoảng cách càng lớn khi i lớn → cache miss nhiều. Nên dù cùng O(n log n), heap sort **chậm hơn** quick trên thực tế (hằng số lớn hơn) dù cùng cấp Big-O.

**Khi nào chọn heap sort?**

- Cần **đảm bảo O(n log n) worst-case** (không chấp nhận O(n²) của quick) **và** không được dùng O(n) bộ nhớ phụ (loại merge). Ví dụ: hệ thống real-time, embedded ít RAM.
- Là backup trong **introsort**: quicksort chạy bình thường, nhưng nếu đệ quy quá sâu (dấu hiệu sắp rơi vào O(n²)) thì chuyển sang heap sort để cứu worst-case. (Sẽ học ở [Lesson 11 — Sorting thực tế](../lesson-11-sorting-in-practice/).)

> ❓ **Câu hỏi tự nhiên**
> - *"Heap sort O(n log n) đảm bảo, sao thực tế không dùng làm default?"* — Vì hằng số lớn (cache kém) và không ổn định. Quicksort trung bình nhanh hơn ~2-3 lần; merge ổn định hơn. Heap sort tỏa sáng đúng ở vai trò "lưới an toàn worst-case".

> 📝 **Tóm tắt mục 7**
> - Heap: O(1) space + O(n log n) đảm bảo, nhưng cache kém, không ổn định.
> - Merge: ổn định nhưng O(n) space.
> - Quick: nhanh nhất thực tế (cache tốt) nhưng worst-case O(n²), không ổn định.
> - Heap sort = lưới an toàn worst-case (introsort) + môi trường ít RAM.

---

## 8. Heap như priority queue — không chỉ để sort

Heap quan trọng vì nó là cài đặt của **priority queue (hàng đợi ưu tiên)**: cấu trúc cho phép lấy phần tử "ưu tiên cao nhất" (max hoặc min) ra liên tục. Sort chỉ là một ứng dụng. Vài ứng dụng quan trọng hơn:

### 8.1 Top-k phần tử lớn nhất — dùng MIN-heap size k

> 💡 **Trực giác**
> Để giữ k phần tử lớn nhất, ta giữ một **min-heap size k**. Gốc min-heap là phần tử **nhỏ nhất trong k cái đang giữ** — tức "ngưỡng cửa". Phần tử mới nào lớn hơn ngưỡng thì thay thế ngưỡng. Cuối cùng heap chứa đúng k phần tử lớn nhất. Chi phí O(n log k) — rẻ hơn sort O(n log n) khi k nhỏ.

\`\`\`go
import "container/heap"

// IntMinHeap: min-heap các int dùng container/heap.
type IntMinHeap []int

func (h IntMinHeap) Len() int            { return len(h) }
func (h IntMinHeap) Less(i, j int) bool  { return h[i] < h[j] } // min-heap: nhỏ lên đầu
func (h IntMinHeap) Swap(i, j int)       { h[i], h[j] = h[j], h[i] }
func (h *IntMinHeap) Push(x any)         { *h = append(*h, x.(int)) }
func (h *IntMinHeap) Pop() any {
	old := *h
	n := len(old)
	x := old[n-1]
	*h = old[:n-1]
	return x
}

// topK trả về k phần tử lớn nhất của nums (thứ tự bất kỳ).
// Dùng min-heap size k: O(n log k) thời gian, O(k) bộ nhớ.
func topK(nums []int, k int) []int {
	h := &IntMinHeap{}
	heap.Init(h)
	for _, x := range nums {
		if h.Len() < k {
			heap.Push(h, x)        // chưa đủ k → cứ nạp
		} else if x > (*h)[0] {    // x lớn hơn ngưỡng (gốc = nhỏ nhất trong k)
			heap.Pop(h)            // bỏ phần tử nhỏ nhất
			heap.Push(h, x)        // nạp x
		}
	}
	return *h // k phần tử lớn nhất (thứ tự heap, không sắp)
}
\`\`\`

**Walk-through** \`topK([4, 1, 7, 3, 9, 2], k=3)\`:

\`\`\`
x=4: heap<3 → push → min-heap {4}
x=1: heap<3 → push → {1,4}
x=7: heap<3 → push → {1,4,7}   (gốc=1)
x=3: heap đủ 3, 3>gốc(1)? có → pop 1, push 3 → {3,4,7} (gốc=3)
x=9: 9>gốc(3)? có → pop 3, push 9 → {4,7,9} (gốc=4)
x=2: 2>gốc(4)? không → bỏ qua
Kết quả: {4,7,9} = 3 phần tử lớn nhất ✓
\`\`\`

### 8.2 Median of stream — dùng 2 heap

> 💡 **Trực giác**
> Để biết **trung vị (median)** của dòng số đang đến liên tục, chia đôi: một **max-heap** giữ nửa nhỏ (gốc = lớn nhất nửa nhỏ), một **min-heap** giữ nửa lớn (gốc = nhỏ nhất nửa lớn). Hai gốc kề nhau ở giữa → median nằm ngay đó. Giữ kích thước hai heap chênh nhau ≤ 1.

\`\`\`go
// MedianFinder duy trì trung vị của dòng số.
// lo = max-heap (nửa nhỏ), hi = min-heap (nửa lớn).
// Bất biến: len(lo) == len(hi) hoặc len(lo) == len(hi)+1.
type MedianFinder struct {
	lo *IntMaxHeap // max-heap
	hi *IntMinHeap // min-heap
}

// AddNum: O(log n) mỗi lần thêm.
func (m *MedianFinder) AddNum(x int) {
	heap.Push(m.lo, x)                 // tạm đẩy vào nửa nhỏ
	heap.Push(m.hi, heap.Pop(m.lo))    // chuyển lớn nhất của nửa nhỏ sang nửa lớn
	if m.hi.Len() > m.lo.Len() {       // rebalance: lo luôn ≥ hi về size
		heap.Push(m.lo, heap.Pop(m.hi))
	}
}

// FindMedian: O(1).
func (m *MedianFinder) FindMedian() float64 {
	if m.lo.Len() > m.hi.Len() {
		return float64((*m.lo)[0]) // lẻ → gốc nửa nhỏ
	}
	return (float64((*m.lo)[0]) + float64((*m.hi)[0])) / 2 // chẵn → trung bình hai gốc
}
\`\`\`

**Walk-through** thêm lần lượt \`5, 2, 8, 1\`:

\`\`\`
add 5: push lo{5}; move max(5)→hi{5}; hi(1)>lo(0)→move back: lo{5},hi{}. median=5.
add 2: push lo{5,2}(gốc5); move 5→hi{5}; lo{2},hi{5} size cân. median=(2+5)/2=3.5.
add 8: push lo{2,8}(gốc8); move 8→hi{5,8}(gốc5); hi(2)>lo(1)→move 5 back: lo{2,5},hi{8}. median=5.
add 1: push lo{2,5,1}(gốc5); move 5→hi{5,8}; lo{2,1},hi{5,8} size cân. median=(2+5)/2=3.5.
       (mảng đã thấy {5,2,8,1} sắp = [1,2,5,8], median=(2+5)/2=3.5 ✓)
\`\`\`

> ❓ **Câu hỏi tự nhiên**
> - *"Sao không cứ sort lại mỗi lần thêm?"* — Sort lại O(n log n) mỗi lần → O(n² log n) cho cả dòng. Hai heap chỉ O(log n) mỗi lần → O(n log n) tổng. Khác biệt khổng lồ khi dòng dài.

### 8.3 Các ứng dụng khác (tease)

- **Merge k sorted lists**: min-heap chứa "đầu" của k danh sách, pop nhỏ nhất → đẩy phần tử kế tiếp của list đó vào. O(N log k).
- **Dijkstra (đường đi ngắn nhất)**: min-heap chứa các đỉnh theo khoảng cách tạm thời, luôn lấy đỉnh gần nhất chưa xử lý. Sẽ học kỹ ở [Tier 5 — Thuật toán đồ thị](../tier-5-graph/index.html).
- **Huffman coding**: liên tục lấy 2 tần suất nhỏ nhất gộp lại — min-heap (xem [Tier 3 — Greedy](../tier-3-greedy/index.html)).

> 📝 **Tóm tắt mục 8**
> - Heap = cài đặt priority queue → lấy max/min liên tục O(log n).
> - **Top-k**: min-heap size k, O(n log k).
> - **Median stream**: 2 heap (max nửa nhỏ + min nửa lớn), O(log n)/thêm.
> - Còn merge k lists, Dijkstra, Huffman — heap ở khắp nơi.

---

## 9. Build heap O(n) — chứng minh đầy đủ

> 💡 **Trực giác trước hình thức**
> Tại sao build heap chỉ O(n) chứ không O(n log n)? Vì **đa số node là lá hoặc gần lá → sift-down của chúng rất ngắn**. Chỉ duy nhất gốc mới sift-down dài tới log n, nhưng có đúng 1 gốc. Số node nhiều (gần n/2 là lá) thì sift-down 0 bước; số node sift dài thì cực ít. Tổng lại hội tụ về O(n).

### 9.1 Đếm công theo chiều cao

Trong heap n phần tử (chiều cao \`h = ⌊log₂ n⌋\`), một node ở **chiều cao \`k\`** (lá có chiều cao 0, gốc chiều cao h) tốn tối đa **\`k\` bước sift-down** (đi xuống tối đa k tầng).

Số node ở chiều cao \`k\` trong heap đầy đủ là **tối đa \`⌈n / 2^(k+1)⌉\`**. Trực giác: lá (k=0) khoảng n/2 node; node chiều cao 1 khoảng n/4; chiều cao 2 khoảng n/8; ... — mỗi tầng cao hơn thì số node giảm một nửa.

Tổng công của build heap:

\`\`\`
T(n) = Σ_{k=0}^{h}  (số node ở chiều cao k) × (công mỗi node)
     ≤ Σ_{k=0}^{h}  (n / 2^(k+1)) × k
     = (n/2) × Σ_{k=0}^{h}  k / 2^k
\`\`\`

### 9.2 Tổng chuỗi hội tụ

Chuỗi \`Σ_{k=0}^{∞} k / 2^k\` là chuỗi hội tụ nổi tiếng, giá trị = **2**:

\`\`\`
Σ_{k=0}^{∞} k·x^k = x / (1-x)²   với |x|<1.
Thay x = 1/2:  (1/2) / (1/2)² = (1/2)/(1/4) = 2.
\`\`\`

Vậy:

\`\`\`
T(n) ≤ (n/2) × 2 = n   →  T(n) = O(n).
\`\`\`

### 9.3 Walk-through bằng SỐ — heap n=15 (cây đầy 4 tầng)

Heap đầy 15 node, chiều cao h=3. Đếm chính xác:

| Chiều cao k | Số node | Công/node (≤ k) | Tổng công tầng |
|:-----------:|:-------:|:---------------:|:--------------:|
| 0 (lá) | 8 | 0 | 0 |
| 1 | 4 | 1 | 4 |
| 2 | 2 | 2 | 4 |
| 3 (gốc) | 1 | 3 | 3 |
| **Tổng** | **15** | — | **11** |

Tổng công = **11 bước** cho n=15. So sánh: nếu là O(n log n) thì ≈ 15 × log₂15 ≈ 15 × 3.9 ≈ **58 bước**. Thực tế 11 ≪ 58 → rõ ràng tuyến tính chứ không phải n log n. Khi n lớn, tỉ số công/n hội tụ về hằng số ~2 (vì \`11/15 ≈ 0.73\`, và giới hạn lý thuyết là \`< 2\`).

> ❓ **Câu hỏi tự nhiên**
> - *"Vậy sao chèn n phần tử từng cái (push + sift-up) lại là O(n log n)?"* — Vì sift-up đi từ **lá lên gốc**: lá ở tầng đông nhất (n/2 node) lại tốn nhiều bước nhất (tới log n), ngược hẳn với sift-down. Tổng \`Σ (n/2^(k+1)) × (h-k)\` không hội tụ thành tuyến tính → O(n log n). Chính vì vậy build heap **luôn dùng sift-down từ dưới lên**, không dùng sift-up.

> ⚠ **Lỗi thường gặp**
> - Trả lời phỏng vấn "build heap là O(n log n)" — sai. Đúng là **O(n)**. (Heap sort tổng thể vẫn O(n log n) vì pha extract, nhưng riêng build là O(n).)

> 🔁 **Dừng lại tự kiểm tra**
> Heap đầy n=7 (3 tầng). Tính tổng công build heap theo bảng chiều cao.
>
> <details><summary>Đáp án</summary>
>
> | k | số node | công/node | tổng |
> |---|---------|-----------|------|
> | 0 | 4 | 0 | 0 |
> | 1 | 2 | 1 | 2 |
> | 2 | 1 | 2 | 2 |
>
> Tổng = **4 bước** cho n=7. (So với O(n log n) ≈ 7×2.8 ≈ 20.) Tuyến tính.
> </details>

> 📝 **Tóm tắt mục 9**
> - Node ở chiều cao k tốn ≤ k bước; số node ở chiều cao k ≈ n/2^(k+1).
> - Tổng = (n/2)·Σ k/2^k = (n/2)·2 = **n** → O(n).
> - Đa số node là lá (sift 0 bước); rất ít node sift dài → hội tụ tuyến tính.
> - sift-up (lá→gốc) thì ngược lại → O(n log n), nên build luôn dùng sift-down.

---

## 10. Cạm bẫy thường gặp (tổng hợp)

| Cạm bẫy | Hậu quả | Cách tránh |
|---------|---------|------------|
| Tưởng build heap O(n log n) | Sai phân tích phỏng vấn | Build là **O(n)** (mục 9); chỉ tổng heap sort mới O(n log n) |
| Công thức index sai (\`i/2\` thay \`(i-1)/2\`) | Truy cập sai cha → phá heap | 0-based: cha \`(i-1)/2\`, con \`2i+1\`, \`2i+2\` |
| Quên kiểm tra \`child < n\` | Panic index out of range | Luôn check \`left < n\`, \`right < n\` trước khi đọc |
| sift-down so với một con cố định | Phá heap property | So với **con lớn hơn** (max-heap) trước khi swap |
| Dùng sift-up để build | Đúng kết quả nhưng O(n log n) | Build = sift-down từ \`n/2-1\` lùi về 0 |
| Dùng nhầm sift-up cho pop / sift-down cho push | Heap hỏng | push→sift-up; pop/build→sift-down |
| Dùng max-heap cho bài cần min (vd Dijkstra) | Lấy sai phần tử ưu tiên | Chọn loại heap theo "ai cần ra trước": min nhỏ trước, max lớn trước |
| \`siftDown(a,0,end+1)\` ở pha extract | Sửa luôn phần đã sắp → hỏng | Truyền \`n=end\` (phần tử ở \`end\` đã đông cứng) |

> 💡 **Mẹo nhớ chọn min vs max heap**
> Hỏi: *"phần tử cần lấy ra TRƯỚC là lớn nhất hay nhỏ nhất?"* — Sort tăng dần thì cần max ở gốc để đẩy về cuối → **max-heap**. Top-k lớn nhất thì giữ **min-heap** (gốc = ngưỡng nhỏ nhất để loại). Dijkstra cần đỉnh gần nhất ra trước → **min-heap**.

---

## 11. container/heap của Go — không phải tự viết

Go có sẵn package \`container/heap\` trong stdlib. Bạn cài interface \`heap.Interface\` (5 method: \`Len, Less, Swap, Push, Pop\`) và stdlib lo phần sift-up/sift-down.

\`\`\`go
package main

import (
	"container/heap"
	"fmt"
)

// IntMaxHeap: max-heap dùng container/heap.
type IntMaxHeap []int

func (h IntMaxHeap) Len() int           { return len(h) }
func (h IntMaxHeap) Less(i, j int) bool { return h[i] > h[j] } // Less đảo → max-heap
func (h IntMaxHeap) Swap(i, j int)      { h[i], h[j] = h[j], h[i] }
func (h *IntMaxHeap) Push(x any)        { *h = append(*h, x.(int)) }
func (h *IntMaxHeap) Pop() any {
	old := *h
	n := len(old)
	x := old[n-1]
	*h = old[:n-1]
	return x
}

func main() {
	h := &IntMaxHeap{5, 2, 4, 1, 3}
	heap.Init(h)              // build heap, O(n)
	heap.Push(h, 8)           // chèn, O(log n)
	fmt.Println("max:", (*h)[0]) // gốc = max = 8

	// pop liên tục → ra giảm dần
	for h.Len() > 0 {
		fmt.Print(heap.Pop(h), " ") // 8 5 4 3 2 1
	}
	fmt.Println()
}
\`\`\`

> ❓ **Câu hỏi tự nhiên**
> - *"Tự viết hay dùng \`container/heap\`?"* — Production: dùng \`container/heap\` (đã test kỹ, ít bug). Học/phỏng vấn: viết tay để hiểu cơ chế. Lưu ý: \`Less(i,j) bool { return h[i] > h[j] }\` đảo dấu để biến thành **max-heap** — đây là chỗ hay nhầm.

---

## Bài tập

> Làm trước, xem [Lời giải chi tiết](#lời-giải-chi-tiết) sau.

1. **Trace build max-heap** từ \`[4, 10, 3, 5, 1]\`. Vẽ cây từng bước, ghi rõ mỗi sift-down.
2. **Heap sort full trace** trên \`[7, 3, 9, 1, 5]\`: build heap + extract-max đầy đủ, ghi mảng sau mỗi bước.
3. **Top-k largest bằng min-heap size k**: dùng \`topK([10, 4, 3, 20, 15, 1], k=3)\`, trace heap sau mỗi phần tử.
4. **Chứng minh build heap O(n)**: với heap đầy n=31 (5 tầng), lập bảng chiều cao và tính tổng công, so với ước lượng O(n log n).
5. **K-th largest**: viết hàm trả về phần tử lớn thứ k của mảng dùng heap, phân tích độ phức tạp; so 2 cách (min-heap size k vs max-heap pop k lần).
6. **Median of stream bằng 2 heap**: trace \`AddNum\` cho dòng \`[6, 10, 2, 6, 5]\`, ghi median sau mỗi lần thêm.
7. **(Nâng cao)** Sửa heap sort để sắp **giảm dần** mà không đảo mảng cuối. Heap loại nào? Giải thích.

---

## Lời giải chi tiết

### Bài 1 — Trace build max-heap \`[4, 10, 3, 5, 1]\`

n=5. Lá: index 2,3,4. Node không-lá cuối = \`5/2-1 = 1\`. Lặp i=1, i=0.

\`\`\`
Ban đầu:
         4(0)
       /     \\
     10(1)    3(2)
    /  \\
   5(3) 1(4)

i=1 (giá trị 10): siftDown(1,5). left=3(5),right=4(1). largest: 5<10 giữ; 1<10 giữ
   → largest=1=i → dừng (10 đã lớn nhất nhánh). Mảng không đổi: [4,10,3,5,1].

i=0 (giá trị 4): siftDown(0,5). left=1(10),right=2(3). largest: 10>4 → largest=1; 3<10 giữ.
   swap a[0]↔a[1] → [10,4,3,5,1]. i=1.
   left=3(5),right=4(1). largest: 5>4 → largest=3; 1<5 giữ.
   swap a[1]↔a[3] → [10,5,3,4,1]. i=3. left=7 vượt n=5 → dừng.

Kết quả max-heap: [10, 5, 3, 4, 1]
         10
        /   \\
       5     3
      / \\
     4   1
\`\`\`
Kiểm tra: 10≥5, 10≥3, 5≥4, 5≥1 ✓.

### Bài 2 — Heap sort full trace \`[7, 3, 9, 1, 5]\`

**Build** (n=5, lặp i=1,0):
\`\`\`
i=1 (3): left=3(1),right=4(5). largest=4(5>3). swap a[1]↔a[4] → [7,5,9,1,3]. i=4 lá dừng.
i=0 (7): left=1(5),right=2(9). largest=2(9>7). swap a[0]↔a[2] → [9,5,7,1,3]. i=2.
         left=5 vượt n=5 → dừng.
Heap sau build: [9, 5, 7, 1, 3]
\`\`\`

**Extract** (đã sắp trong |...|):
\`\`\`
end=4: swap a[0]↔a[4] → [3,5,7,1,|9|]. siftDown(0,4): left=1(5),right=2(7).largest=2(7).
       swap a[0]↔a[2] → [7,5,3,1,|9|]. i=2,left=5≥4 dừng. → [7,5,3,1,|9|]
end=3: swap a[0]↔a[3] → [1,5,3,|7,9|]. siftDown(0,3): left=1(5),right=2(3).largest=1(5).
       swap a[0]↔a[1] → [5,1,3,|7,9|]. i=1,left=3≥3 dừng. → [5,1,3,|7,9|]
end=2: swap a[0]↔a[2] → [3,1,|5,7,9|]. siftDown(0,2): left=1(1),right=2≥2.largest=0(3>1)dừng.
       → [3,1,|5,7,9|]
end=1: swap a[0]↔a[1] → [1,|3,5,7,9|]. siftDown(0,1): left=1≥1 dừng.
Kết quả: [1, 3, 5, 7, 9] ✓
\`\`\`

### Bài 3 — \`topK([10, 4, 3, 20, 15, 1], k=3)\` (min-heap size k)

\`\`\`
x=10: heap<3 → {10}
x=4:  heap<3 → {4,10}
x=3:  heap<3 → {3,4,10}      gốc=3
x=20: đủ 3, 20>gốc(3) → pop 3, push 20 → {4,10,20}  gốc=4
x=15: 15>gốc(4) → pop 4, push 15 → {10,15,20}        gốc=10
x=1:  1>gốc(10)? không → bỏ
Kết quả: {10, 15, 20} = 3 lớn nhất ✓
\`\`\`
Độ phức tạp: O(n log k) = O(6 log 3). Rẻ hơn sort O(n log n) khi k ≪ n.

### Bài 4 — Build heap O(n) cho n=31 (5 tầng)

| Chiều cao k | Số node = ⌈n/2^(k+1)⌉ | Công/node ≤ k | Tổng tầng |
|:-----------:|:---------------------:|:-------------:|:---------:|
| 0 (lá) | 16 | 0 | 0 |
| 1 | 8 | 1 | 8 |
| 2 | 4 | 2 | 8 |
| 3 | 2 | 3 | 6 |
| 4 (gốc) | 1 | 4 | 4 |
| **Tổng** | **31** | — | **26** |

Tổng công = **26 bước**. So O(n log n) ≈ 31 × log₂31 ≈ 31 × 4.95 ≈ **153 bước**. 26 ≪ 153 → tuyến tính. Tỉ số \`26/31 ≈ 0.84 < 2\` (giới hạn lý thuyết). Khi n→∞, tỉ số tiến tới hằng số → O(n). ✓

### Bài 5 — K-th largest

**Cách A — min-heap size k**: giữ k phần tử lớn nhất (như bài 3). Phần tử lớn thứ k = **gốc min-heap** (nhỏ nhất trong k cái lớn nhất). O(n log k) thời gian, O(k) bộ nhớ.

\`\`\`go
func kthLargest(nums []int, k int) int {
	h := &IntMinHeap{}
	for _, x := range nums {
		if h.Len() < k {
			heap.Push(h, x)
		} else if x > (*h)[0] {
			heap.Pop(h)
			heap.Push(h, x)
		}
	}
	return (*h)[0] // gốc = phần tử lớn thứ k
}
\`\`\`

**Cách B — max-heap, pop k lần**: build max-heap O(n), pop k-1 lần bỏ, lần thứ k là kết quả. O(n + k log n) thời gian, O(n) bộ nhớ (chứa cả mảng trong heap).

**So sánh**: khi k nhỏ và n lớn → cách A tốt hơn (bộ nhớ O(k), thời gian O(n log k)). Khi cần lấy nhiều phần tử lớn nhất theo thứ tự hoặc k gần n → cách B đơn giản hơn. Trace cách A với \`[3,2,1,5,6,4], k=2\`: heap giữ \`{5,6}\`, gốc=5 → lớn thứ 2 = **5** ✓.

### Bài 6 — Median of stream \`[6, 10, 2, 6, 5]\`

lo = max-heap (nửa nhỏ), hi = min-heap (nửa lớn). Bất biến \`len(lo) ∈ {len(hi), len(hi)+1}\`.

\`\`\`
add 6:  push lo{6}; move 6→hi{6}; hi(1)>lo(0)→move back: lo{6},hi{}. median=6.
add 10: push lo{6,10}(gốc10); move 10→hi{10}; lo{6},hi{10} cân. median=(6+10)/2=8.
add 2:  push lo{6,2}(gốc6); move 6→hi{6,10}(gốc6); hi(2)>lo(1)→move 6 back: lo{2,6},hi{10}. median=6.
add 6:  push lo{2,6,6}(gốc6); move 6→hi{6,10}(gốc6); lo{2,6},hi{6,10} cân. median=(6+6)/2=6.
add 5:  push lo{2,6,5}(gốc6); move 6→hi{6,6,10}(gốc6); hi(3)>lo(2)→move 6 back: lo{2,5,6},hi{6,10}. median=6.
\`\`\`
Kiểm tra cuối: thấy \`{6,10,2,6,5}\` sắp = \`[2,5,6,6,10]\`, median (phần tử giữa) = **6** ✓.

### Bài 7 — Sắp giảm dần không đảo mảng cuối

Dùng **min-heap** thay max-heap. Logic giống hệt heap sort: build min-heap, lặp swap gốc (min) về cuối + sift-down (so với con NHỎ hơn). Mỗi vòng đẩy min hiện tại về cuối → các phần tử nhỏ lấp dần từ phải sang trái → mảng **giảm dần**. Chỉ cần đổi mọi phép so trong sift-down từ \`>\` thành \`<\`:

\`\`\`go
func siftDownMin(a []int, i, n int) {
	for {
		smallest := i
		l, r := 2*i+1, 2*i+2
		if l < n && a[l] < a[smallest] { smallest = l }
		if r < n && a[r] < a[smallest] { smallest = r }
		if smallest == i { return }
		a[i], a[smallest] = a[smallest], a[i]
		i = smallest
	}
}
// heapSort giảm dần: thay siftDown bằng siftDownMin, phần còn lại y hệt.
\`\`\`
Vậy: **đổi loại heap (min thay max)** là cách đúng, không cần đảo mảng sau khi sort.

---

## Code & Minh họa

- **Visualization tương tác**: [visualization.html](./visualization.html) — 3 module:
  1. **Heap dạng cây + mảng song song** — vẽ binary tree đồng bộ với array, animate sift-down từng bước.
  2. **Heap sort animator** — build max-heap rồi extract-max về cuối, animate cả cây lẫn mảng.
  3. **Build heap O(n)** — visualize tổng công mỗi tầng (lá đông nhưng sift ngắn → tuyến tính).
- Toàn bộ code Go ở trên là **inline trong README** (theo quy ước lĩnh vực Algorithms) — không có \`solutions.go\` riêng.

---

## Bài tiếp theo

→ [Lesson 10 — Non-comparison Sorts](../lesson-10-non-comparison-sorts/): counting sort, radix sort, bucket sort — phá rào O(n log n) khi khóa có cấu trúc đặc biệt (số nguyên giới hạn). Heap sort là sort so sánh cuối cùng ta học; bài sau cho thấy khi nào **không cần so sánh** ta có thể nhanh hơn.

## Tham khảo

- [Lesson 07 — Merge Sort](../lesson-07-merge-sort/) — O(n log n) ổn định nhưng O(n) bộ nhớ.
- [Lesson 08 — Quicksort](../lesson-08-quicksort/) — nhanh thực tế nhưng worst-case O(n²).
- [Lesson 11 — Sorting thực tế](../lesson-11-sorting-in-practice/) — introsort dùng heap sort làm lưới an toàn.
- [DataStructures — Heap & Priority Queue](../../DataStructures/) — heap như cấu trúc dữ liệu.
- [Tier 5 — Thuật toán đồ thị](../tier-5-graph/index.html) — Dijkstra dùng min-heap.
`;
