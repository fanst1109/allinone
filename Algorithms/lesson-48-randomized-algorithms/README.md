# Lesson 48 — Thuật toán ngẫu nhiên (Randomized Algorithms)

> Tier 7 · Advanced · Bài 48
>
> Khi ta thêm một xúc xắc vào thuật toán, nhiều vấn đề khó bỗng trở nên đơn giản và nhanh hơn — **theo nghĩa kỳ vọng (expected)**. Bài này học cách dùng ngẫu nhiên như một công cụ thiết kế thuật toán: từ randomized quicksort, quickselect, reservoir sampling, Fisher-Yates shuffle, tới Monte Carlo ước lượng π và test nguyên tố Miller-Rabin.

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Hiểu **vì sao** đưa ngẫu nhiên vào thuật toán lại có ích — tránh worst-case do "đối thủ" (adversary) dựng sẵn, đơn giản hoá code, và đạt hiệu năng kỳ vọng tốt.
- Phân biệt rạch ròi hai họ thuật toán ngẫu nhiên: **Las Vegas** (luôn đúng, thời gian ngẫu nhiên) và **Monte Carlo** (thời gian xác định, kết quả có thể sai với xác suất nhỏ).
- Cài đặt được và phân tích **randomized quicksort**, **quickselect** ($O(n)$ expected), **reservoir sampling** (Algorithm R), **Fisher-Yates shuffle**, **Monte Carlo π**.
- Nắm ý tưởng test nguyên tố **Miller-Rabin** và cấu trúc dữ liệu ngẫu nhiên (**treap**, **skip list**).
- Phân tích **expected** bằng *linearity of expectation* và *indicator variable* — kỹ thuật quyết định để chứng minh quicksort kỳ vọng $O(n \log n)$.
- Phân biệt `math/rand` và `crypto/rand` trong Go, biết khi nào dùng cái nào.

## Kiến thức tiền đề

- [Lesson 08 — Quicksort](../lesson-08-quicksort/README.md): partition, pivot, đệ quy. Bài này nâng cấp pivot lên *random pivot*.
- [Lesson 16 — Hashing Techniques](../lesson-16-hashing-techniques/README.md): hash, collision. Bài này thêm *universal hashing* để chống adversarial collision.
- [Lesson 17 — Divide & Conquer](../lesson-17-divide-and-conquer/README.md): chia để trị (quickselect là một biến thể).
- [Lesson 46 — Number Theory](../lesson-46-number-theory-algos/README.md): modular exponentiation — nền tảng cho Miller-Rabin.
- Một chút xác suất cơ bản: biến cố, kỳ vọng (expectation), độc lập. Không cần sâu — bài tự nhắc lại key context.

---

## 1. Vì sao lại cần ngẫu nhiên?

> 💡 **Trực giác.** Hãy tưởng tượng bạn chơi trò "đoán lá bài". Nếu bạn luôn đoán theo một quy tắc cố định (ví dụ luôn chọn lá đầu tiên), một người chơi xấu (adversary) chỉ cần biết quy tắc đó là sắp xếp bộ bài sao cho bạn luôn sai. Nhưng nếu bạn **tung đồng xu** để chọn, người kia *không thể* dựng sẵn một bộ bài làm bạn luôn thua — vì họ không biết kết quả tung xu. Ngẫu nhiên làm "vô hiệu hoá" kẻ tấn công.

Có ba lý do chính để dùng ngẫu nhiên trong thuật toán:

**(a) Tránh worst-case do input thù địch (adversarial input).**
Quicksort tất định chọn pivot là phần tử đầu mảng có worst-case $O(n^2)$ trên mảng đã sắp xếp. Một kẻ tấn công biết code của bạn có thể *cố tình* gửi mảng đã sắp để làm chậm hệ thống. Random pivot khiến không input cố định nào luôn rơi vào worst-case — worst-case "chạy trốn" sang một xác suất rất nhỏ.

**(b) Đơn giản hoá thuật toán.**
Reservoir sampling chọn $k$ phần tử đều từ một stream **không biết trước độ dài** chỉ với một vòng `for` và một mảng cỡ $k$. Cách tất định tương đương phức tạp và tốn bộ nhớ hơn nhiều.

**(c) Hiệu năng kỳ vọng (expected) tốt.**
Nhiều thuật toán ngẫu nhiên chạy nhanh *trung bình* dù worst-case lý thuyết vẫn xấu. Ta phân tích bằng **giá trị kỳ vọng** thay vì worst-case tuyệt đối.

> ❓ **Câu hỏi tự nhiên của người đọc.**
> - *"Worst-case của randomized quicksort vẫn là $O(n^2)$ mà?"* — Đúng, nhưng **xác suất** rơi vào nó là cực nhỏ (cỡ $1/n!$ với một input cố định). Quan trọng: không có một input cụ thể nào *luôn* làm nó chậm — mỗi lần chạy lại random pivot khác.
> - *"Ngẫu nhiên thì kết quả có khác nhau mỗi lần chạy không?"* — Tuỳ loại. Las Vegas luôn cho cùng kết quả đúng (chỉ thời gian khác). Monte Carlo có thể cho kết quả khác (đôi khi sai).

> 📝 **Tóm tắt mục 1.** Ngẫu nhiên là một *công cụ thiết kế*, không phải mẹo vặt: (1) vô hiệu hoá adversary, (2) đơn giản hoá code, (3) đạt expected performance tốt. Ta đánh đổi sự "chắc chắn tuyệt đối" lấy hiệu năng/đơn giản tính theo kỳ vọng.

---

## 2. Las Vegas vs Monte Carlo

Hai họ thuật toán ngẫu nhiên, phân loại theo *cái gì là ngẫu nhiên*:

| Tiêu chí | **Las Vegas** | **Monte Carlo** |
|----------|---------------|-----------------|
| Tính đúng | **Luôn đúng** | Có thể **sai** với xác suất nhỏ |
| Thời gian chạy | **Ngẫu nhiên** (kỳ vọng tốt) | **Xác định** (cố định, kiểm soát được) |
| Ví dụ điển hình | Randomized quicksort, quickselect | Miller-Rabin, Monte Carlo π |
| Đổi gì lấy gì | Chấp nhận thời gian biến động để giữ đúng | Chấp nhận sai số để giữ thời gian cố định |

> 💡 **Cách nhớ.** *Las Vegas* — bạn **luôn** rời sòng bài với kết quả đúng, nhưng không biết **mất bao lâu**. *Monte Carlo* — bạn chơi đúng số ván định trước (thời gian cố định), nhưng có khả năng **thua** (sai).

**Las Vegas chi tiết.** Randomized quicksort luôn trả về mảng đã sắp đúng. Cái ngẫu nhiên là *số phép so sánh*. Đôi khi may (pivot luôn ở giữa) → nhanh; đôi khi xui → chậm hơn, nhưng **không bao giờ sai**.

**Monte Carlo chi tiết.** Miller-Rabin trả lời "$n$ là số nguyên tố?" trong thời gian cố định $O(k \log^3 n)$ với $k$ vòng test. Nó **có thể** trả "nguyên tố" cho một hợp số (false positive), nhưng xác suất sai $\le 4^{-k}$ — giảm theo cấp số nhân khi tăng $k$.

> ⚠ **Lỗi thường gặp.** Đừng nhầm: Monte Carlo *không* có xác suất sai "tuỳ tiện không kiểm soát". Sai số được *bao* (bound) và *kiểm soát được* bằng số vòng lặp. Với $k = 40$, xác suất sai $\le 4^{-40} \approx 8 \times 10^{-25}$ — nhỏ hơn xác suất lỗi phần cứng máy tính. Trên thực tế ta tin nó tuyệt đối.

> ❓ **Có thể biến Monte Carlo thành Las Vegas không?** Đôi khi có — nếu ta có cách *kiểm tra nhanh* kết quả đúng/sai. Khi đó: chạy Monte Carlo, kiểm tra; nếu sai thì chạy lại. Kết quả luôn đúng (Las Vegas) nhưng thời gian thành ngẫu nhiên. Ngược lại, Las Vegas có thể thành Monte Carlo bằng cách *cắt thời gian*: chạy đến deadline, nếu chưa xong thì đoán bừa.

> 🔁 **Dừng lại tự kiểm tra.** Thuật toán "chạy đúng deadline cố định, nếu chưa tìm được nghiệm thì trả về null" thuộc họ nào?
> <details><summary>Đáp án</summary>Monte Carlo — thời gian cố định (deadline), kết quả có thể "sai" (trả null dù thực ra có nghiệm).</details>

> 📝 **Tóm tắt mục 2.** Las Vegas = đúng chắc chắn, thời gian biến động. Monte Carlo = thời gian chắc chắn, đúng theo xác suất (kiểm soát được bằng số vòng lặp).

---

## 3. Randomized Quicksort

> 💡 **Trực giác.** Quicksort chọn một *pivot*, đẩy phần tử nhỏ hơn sang trái, lớn hơn sang phải, rồi đệ quy. Tốc độ phụ thuộc pivot có chia mảng "cân" không. Nếu pivot luôn là min hoặc max → chia 1 vs $n{-}1$ → $O(n^2)$. **Random pivot** làm pivot rơi "đâu đó giữa" với xác suất cao → cân → $O(n \log n)$.

Recap từ [Lesson 08](../lesson-08-quicksort/README.md): quicksort tất định chọn pivot cố định (vd phần tử cuối) có worst-case $O(n^2)$ trên mảng đã-sắp hoặc nghịch-đảo. Randomized quicksort chỉ đổi **một dòng**: chọn pivot ngẫu nhiên trước khi partition.

```go
package main

import (
	"fmt"
	"math/rand"
)

// randomizedQuicksort sắp xếp a[lo..hi] tăng dần.
// Đây là Las Vegas: LUÔN trả mảng đúng, chỉ số phép so sánh là ngẫu nhiên.
func randomizedQuicksort(a []int, lo, hi int) {
	if lo >= hi {
		return
	}
	p := randomPartition(a, lo, hi) // pivot ngẫu nhiên
	randomizedQuicksort(a, lo, p-1) // đệ quy nửa trái
	randomizedQuicksort(a, p+1, hi) // đệ quy nửa phải
}

// randomPartition: chọn pivot NGẪU NHIÊN trong [lo, hi], đổi về cuối,
// rồi partition kiểu Lomuto. Trả về vị trí cuối cùng của pivot.
func randomPartition(a []int, lo, hi int) int {
	r := lo + rand.Intn(hi-lo+1) // chỉ số ngẫu nhiên trong [lo, hi]
	a[r], a[hi] = a[hi], a[r]     // đưa pivot về cuối — phần còn lại như Lomuto thường
	pivot := a[hi]
	i := lo // i = ranh giới: a[lo..i-1] đều < pivot
	for j := lo; j < hi; j++ {
		if a[j] < pivot {
			a[i], a[j] = a[j], a[i]
			i++
		}
	}
	a[i], a[hi] = a[hi], a[i] // đặt pivot vào đúng vị trí
	return i
}

func main() {
	// Mảng ĐÃ SẮP — đây là worst-case của quicksort tất định (pivot=cuối),
	// nhưng randomized quicksort vẫn nhanh.
	a := []int{1, 2, 3, 4, 5, 6, 7, 8}
	randomizedQuicksort(a, 0, len(a)-1)
	fmt.Println(a) // [1 2 3 4 5 6 7 8]
}
```

**Walk-through trên `[3, 1, 4, 1, 5]`** (giả sử random chọn pivot = `4` ở chỉ số 2):

| Bước | Mảng | Hành động |
|------|------|-----------|
| 0 | `[3,1,4,1,5]` | random pivot = `a[2]=4`, đổi về cuối → `[3,1,5,1,4]`, pivot=4 |
| 1 | quét `j`: 3<4✓ swap(i=0,j=0); 1<4✓ swap(1,1); 5≥4✗; 1<4✓ swap(2,3) | `[3,1,1,5,4]`, i=3 |
| 2 | đặt pivot: swap(i=3, hi=4) | `[3,1,1,4,5]`, pivot ở chỉ số 3 |
| 3 | đệ quy trái `[3,1,1]`, phải `[5]` | ... → `[1,1,3,4,5]` |

**Vì sao tránh được worst-case?** Worst-case xảy ra khi pivot luôn cực trị. Với random pivot, xác suất một input *cố định* luôn cho pivot cực trị qua mọi tầng đệ quy là cực nhỏ. Quan trọng hơn: **không có input cố định nào** mà adversary dựng sẵn để *luôn* gây $O(n^2)$ — vì pivot do ta tung xu, không phụ thuộc input.

> ⚠ **Lỗi thường gặp.** Đừng "random" bằng cách shuffle cả mảng *trước* rồi quicksort tất định — vẫn được nhưng tốn $O(n)$ shuffle thêm và khó suy luận hơn. Chuẩn là random *pivot tại mỗi lần partition*. (Tuy nhiên shuffle trước cũng là một kỹ thuật hợp lệ, gọi là "randomized input".)

> 📝 **Tóm tắt mục 3.** Random pivot biến worst-case $O(n^2)$ (xảy ra với input cụ thể) thành expected $O(n \log n)$ trên *mọi* input. Phân tích chi tiết kỳ vọng ở [mục 12](#12-phân-tích-expected--linearity-of-expectation).

---

## 4. Quickselect — tìm phần tử nhỏ thứ k

> 💡 **Trực giác.** Muốn tìm phần tử nhỏ thứ $k$ (vd trung vị), bạn *không cần* sắp toàn bộ mảng. Quicksort partition rồi đệ quy **hai** phía; quickselect partition rồi chỉ đệ quy **một** phía — phía chứa vị trí $k$. Đệ quy một phía → công việc giảm còn $n + n/2 + n/4 + \dots = O(n)$ expected thay vì $O(n \log n)$.

```go
package main

import (
	"fmt"
	"math/rand"
)

// quickselect trả về phần tử NHỎ THỨ k (k tính từ 0) trong a[lo..hi].
// Expected O(n), worst-case O(n^2) (rất hiếm với random pivot).
func quickselect(a []int, lo, hi, k int) int {
	if lo == hi {
		return a[lo]
	}
	p := randomPartition(a, lo, hi) // dùng lại partition ở mục 3
	switch {
	case k == p:
		return a[k] // pivot chính là phần tử cần tìm
	case k < p:
		return quickselect(a, lo, p-1, k) // CHỈ đệ quy nửa trái
	default:
		return quickselect(a, p+1, hi, k) // CHỈ đệ quy nửa phải
	}
}

func randomPartition(a []int, lo, hi int) int {
	r := lo + rand.Intn(hi-lo+1)
	a[r], a[hi] = a[hi], a[r]
	pivot := a[hi]
	i := lo
	for j := lo; j < hi; j++ {
		if a[j] < pivot {
			a[i], a[j] = a[j], a[i]
			i++
		}
	}
	a[i], a[hi] = a[hi], a[i]
	return i
}

func main() {
	a := []int{7, 2, 9, 1, 5, 8, 3}
	k := 3 // phần tử nhỏ thứ 4 (index 3) — sau khi sắp là [1,2,3,5,7,8,9] -> 5
	fmt.Println(quickselect(a, 0, len(a)-1, k)) // 5
}
```

**Walk-through `[7,2,9,1,5,8,3]`, k=3** (tìm phần tử nhỏ thứ 4, đáp án là `5`):

| Bước | Đoạn `[lo..hi]` | Pivot (giả sử) | p (vị trí pivot) | So với k=3 | Tiếp theo |
|------|-----------------|----------------|------------------|------------|-----------|
| 1 | `[7,2,9,1,5,8,3]` `[0..6]` | `5` | p=3 | k==p | **trả về `5`** |

May mắn pivot=5 ngay lần đầu → xong. Trường hợp khác, ví dụ pivot=`3` (p=2):

| Bước | Đoạn | Pivot | p | So k=3 | Tiếp |
|------|------|-------|---|--------|------|
| 1 | `[0..6]` | `3` | 2 | k>p | đệ quy `[3..6]` (các phần tử >3) |
| 2 | `[5,7,8,9]` `[3..6]` (giả sử) pivot=`5` | `5` | 3 | k==p | **trả về `5`** |

**Phân tích expected $O(n)$.** Mỗi lần partition tốn $O(\text{độ dài đoạn})$. Random pivot kỳ vọng chia đoạn xuống còn $\sim 3/4$ độ dài. Tổng công việc kỳ vọng:
$$E[T(n)] = n + \frac{3}{4}n + \left(\frac{3}{4}\right)^2 n + \dots = n \cdot \frac{1}{1 - 3/4} = 4n = O(n).$$

> ❓ **Sao không dùng median-of-medians để có $O(n)$ chắc chắn?** Median-of-medians cho worst-case $O(n)$ *đảm bảo* nhưng hằng số lớn và code phức tạp. Quickselect random đơn giản hơn nhiều và nhanh hơn trên thực tế — đây chính là lợi ích "đơn giản hoá" của ngẫu nhiên (mục 1b).

> 🔁 **Dừng lại tự kiểm tra.** Để tìm phần tử *lớn* thứ $k$ trong mảng $n$ phần tử, gọi quickselect với chỉ số nào?
> <details><summary>Đáp án</summary>Phần tử lớn thứ $k$ = phần tử nhỏ thứ $(n-k)$. Gọi `quickselect(a, 0, n-1, n-k)`.</details>

> 📝 **Tóm tắt mục 4.** Quickselect = quicksort nhưng đệ quy *một* phía → expected $O(n)$. Dùng để tìm trung vị / top-k mà không sắp toàn mảng.

---

## 5. Reservoir Sampling — Algorithm R

> 💡 **Trực giác.** Bạn đứng cạnh một dòng suối (stream) các con số chảy qua liên tục, **không biết tổng cộng bao nhiêu**, và chỉ có một cái xô chứa được $k$ viên đá. Làm sao để cuối cùng trong xô là $k$ viên được chọn *đều ngẫu nhiên* trong toàn bộ dòng — mà không cần lưu cả dòng? Reservoir sampling: với viên đá thứ $i$, ném nó vào xô với xác suất $k/i$, nếu trúng thì hất ra một viên cũ ngẫu nhiên.

**Bài toán.** Cho stream $a_1, a_2, \dots, a_n$ với $n$ **không biết trước**. Chọn $k$ phần tử sao cho mỗi phần tử có xác suất $k/n$ được chọn, dùng $O(k)$ bộ nhớ.

```go
package main

import (
	"fmt"
	"math/rand"
)

// reservoirSample đọc stream từng phần tử, giữ k mẫu ngẫu nhiên đều.
// Bộ nhớ O(k), thời gian O(n). Không cần biết trước độ dài stream.
func reservoirSample(stream []int, k int) []int {
	reservoir := make([]int, k)
	for i, x := range stream {
		if i < k {
			reservoir[i] = x // k phần tử đầu: nhận hết
		} else {
			// phần tử thứ i (0-indexed) => đây là phần tử thứ (i+1) trong dòng.
			// Nhận nó với xác suất k/(i+1).
			j := rand.Intn(i + 1) // j đều trong [0, i]
			if j < k {
				reservoir[j] = x // thay thế một slot ngẫu nhiên
			}
		}
	}
	return reservoir
}

func main() {
	stream := []int{10, 20, 30, 40, 50, 60, 70}
	fmt.Println(reservoirSample(stream, 3)) // 3 phần tử ngẫu nhiên, mỗi cái xác suất 3/7
}
```

**Walk-through `k=1`, stream `[A, B, C]`** (giữ 1 phần tử, mỗi phần tử cần xác suất $1/3$):

| Bước | Phần tử | i (0-idx) | Xác suất giữ | Reservoir sau bước |
|------|---------|-----------|--------------|--------------------|
| 1 | A | 0 | nhận (i<k) | `[A]` |
| 2 | B | 1 | thay với xác suất 1/2 | `[A]` (1/2) hoặc `[B]` (1/2) |
| 3 | C | 2 | thay với xác suất 1/3 | giữ cũ (2/3) hoặc `[C]` (1/3) |

**Chứng minh xác suất đều $= 1/n$ (cho $k=1$, từng bước rõ ràng):**

- $P(\text{C còn lại}) = P(\text{nhận C ở bước 3}) = \tfrac{1}{3}$. ✓
- $P(\text{B còn lại}) = P(\text{nhận B ở bước 2}) \times P(\text{không thay ở bước 3}) = \tfrac{1}{2} \times (1 - \tfrac{1}{3}) = \tfrac{1}{2} \times \tfrac{2}{3} = \tfrac{1}{3}$. ✓
- $P(\text{A còn lại}) = P(\text{không thay ở bước 2}) \times P(\text{không thay ở bước 3}) = (1-\tfrac{1}{2}) \times (1-\tfrac{1}{3}) = \tfrac{1}{2} \times \tfrac{2}{3} = \tfrac{1}{3}$. ✓

Cả ba đều bằng $1/3$ — đều! **Chứng minh tổng quát** (quy nạp, $k$ bất kỳ): giả sử sau khi xử lý $i$ phần tử, mỗi phần tử trong reservoir có xác suất $k/i$. Khi phần tử thứ $(i+1)$ đến:
- Nó được nhận với xác suất $\frac{k}{i+1}$ (đúng yêu cầu cho phần tử mới). ✓
- Một phần tử cũ vẫn ở reservoir nếu: (không bị nó thay) = $1 - \frac{k}{i+1} \cdot \frac{1}{k} = 1 - \frac{1}{i+1} = \frac{i}{i+1}$. Vậy xác suất còn lại = $\frac{k}{i} \times \frac{i}{i+1} = \frac{k}{i+1}$. ✓

Cả phần tử cũ lẫn mới đều có xác suất $\frac{k}{i+1}$ sau bước $i+1$ → quy nạp đúng, cuối cùng mọi phần tử có xác suất $k/n$.

> ❓ **Câu hỏi tự nhiên.**
> - *"Vì sao `rand.Intn(i+1)` mà không phải `rand.Intn(i)`?"* — Vì phần tử thứ $i$ (0-indexed) là phần tử thứ $(i+1)$ trong dòng. Ta cần xác suất nhận $= k/(i+1)$, tức $P(j < k)$ với $j$ đều trong $[0, i]$ (có $i+1$ giá trị) $= k/(i+1)$. ✓
> - *"Ứng dụng thực tế?"* — Lấy mẫu log khổng lồ không vừa RAM, chọn dòng ngẫu nhiên từ file lớn (`shuf -n`), A/B test trên stream sự kiện.

> ⚠ **Lỗi thường gặp.** Đừng "lưu cả stream rồi random sau" nếu stream quá lớn (terabyte log) — vỡ bộ nhớ. Cũng đừng dùng `rand.Intn(k)` (sai phạm vi) — sẽ bias về các phần tử đầu.

> 📝 **Tóm tắt mục 5.** Reservoir sampling chọn $k$ mẫu đều từ stream độ dài chưa biết, bộ nhớ $O(k)$, một lượt $O(n)$. Bí quyết: nhận phần tử thứ $i$ với xác suất $k/i$.

---

## 6. Fisher-Yates Shuffle

> 💡 **Trực giác.** Xáo bài đúng nghĩa = mỗi hoán vị (permutation) trong $n!$ hoán vị có xác suất bằng nhau $1/n!$. Fisher-Yates làm điều đó bằng cách: đi từ cuối mảng, mỗi vị trí $i$ đổi chỗ với một vị trí ngẫu nhiên trong $[0, i]$ (bao gồm chính nó).

```go
package main

import (
	"fmt"
	"math/rand"
)

// fisherYates xáo trộn a tại chỗ, mỗi hoán vị có xác suất đều 1/n!.
// Thời gian O(n), bộ nhớ O(1).
func fisherYates(a []int) {
	for i := len(a) - 1; i > 0; i-- {
		j := rand.Intn(i + 1) // j đều trong [0, i] (BAO GỒM i)
		a[i], a[j] = a[j], a[i]
	}
}

func main() {
	a := []int{1, 2, 3, 4, 5}
	fisherYates(a)
	fmt.Println(a) // một hoán vị ngẫu nhiên đều
}
```

**Walk-through `[A, B, C]`** ($n=3$, có $3! = 6$ hoán vị, mỗi cái cần xác suất $1/6$):

| Bước i | Phạm vi `rand.Intn(i+1)` | j (ví dụ) | Mảng sau swap |
|--------|---------------------------|-----------|----------------|
| i=2 | $[0,2]$, 3 lựa chọn | j=0 | đổi a[2]↔a[0] → `[C, B, A]` |
| i=1 | $[0,1]$, 2 lựa chọn | j=1 | đổi a[1]↔a[1] → `[C, B, A]` |

Tổng đường đi: $3 \times 2 = 6$ tổ hợp, ánh xạ **song ánh** vào 6 hoán vị → mỗi hoán vị đúng xác suất $1/6$.

**Vì sao naive shuffle BIAS?** Naive: với mỗi $i$, swap với $j$ ngẫu nhiên trong $[0, n-1]$ (toàn dải, không phải $[0, i]$):

```go
// SAI — naive shuffle, KHÔNG đều!
func naiveShuffle(a []int) {
	n := len(a)
	for i := 0; i < n; i++ {
		j := rand.Intn(n) // BUG: dải đầy đủ [0, n-1]
		a[i], a[j] = a[j], a[i]
	}
}
```

Naive sinh ra $n^n$ đường đi, nhưng chỉ có $n!$ hoán vị. Vì $n^n$ **không chia hết** cho $n!$ (với $n \ge 3$), một số hoán vị xuất hiện nhiều đường đi hơn → **bias**.

**Ví dụ số cụ thể, $n=3$:** naive có $3^3 = 27$ đường đi, $3! = 6$ hoán vị. $27 / 6 = 4.5$ — không nguyên! Nên không thể chia đều: thực tế hoán vị "identity" và vài cái khác xuất hiện 4 lần, số khác 5 lần. Đếm thực nghiệm cho thấy hoán vị `[A,B,C]` (giữ nguyên) thường ra nhiều hơn các hoán vị khác.

> ⚠ **Lỗi thường gặp #1.** `j := rand.Intn(i)` (thiếu `+1`) loại trừ chính vị trí $i$ → phần tử không bao giờ "đứng yên" → bias (đây là lỗi *Sattolo* — sinh ra cyclic permutation, không phải mọi hoán vị).
>
> **Lỗi #2.** Dùng naive shuffle (dải đầy đủ) → bias như trên. Năm 2008 Microsoft từng dính lỗi này trong một công cụ "random" browser ballot ở EU.

> ❓ **Trong Go thật có sẵn không?** Có: `rand.Shuffle(n, swap)` (Go 1.10+) cài đặt đúng Fisher-Yates. Không cần tự viết trong production — nhưng phải hiểu nó để không dùng sai.

> 🔁 **Dừng lại tự kiểm tra.** Vì sao Fisher-Yates đều mà naive không? Trả lời bằng số đường đi.
> <details><summary>Đáp án</summary>Fisher-Yates sinh đúng $n \times (n{-}1) \times \dots \times 1 = n!$ đường đi, song ánh với $n!$ hoán vị → đều. Naive sinh $n^n$ đường đi không chia hết cho $n!$ → một số hoán vị xuất hiện nhiều hơn → bias.</details>

> 📝 **Tóm tắt mục 6.** Fisher-Yates: đi từ cuối, swap với vị trí ngẫu nhiên trong $[0, i]$. Đều ($1/n!$), $O(n)$. Naive shuffle (dải đầy đủ) bị bias vì $n^n \nmid n!$.

---

## 7. Test nguyên tố ngẫu nhiên — Miller-Rabin (Monte Carlo)

> 💡 **Trực giác.** Kiểm tra $n$ có nguyên tố không bằng cách thử chia hết tới $\sqrt{n}$ là $O(\sqrt{n})$ — quá chậm khi $n$ có hàng trăm chữ số (mật mã RSA). Miller-Rabin "phỏng vấn" $n$ bằng vài *nhân chứng (witness)* ngẫu nhiên: nếu $n$ thật sự là hợp số, đa số nhân chứng sẽ "tố cáo" được nó. Mỗi nhân chứng độc lập, sai sót giảm theo cấp số nhân.

Ý tưởng dựa trên **định lý Fermat nhỏ** (xem [Lesson 46](../lesson-46-number-theory-algos/README.md#modular-exponentiation)): nếu $p$ nguyên tố thì $a^{p-1} \equiv 1 \pmod{p}$ với mọi $a$ không chia hết cho $p$. Miller-Rabin tinh chỉnh: viết $n - 1 = 2^s \cdot d$ ($d$ lẻ), rồi kiểm tra chuỗi bình phương $a^d, a^{2d}, a^{4d}, \dots$ có "vi phạm" tính chất của số nguyên tố không.

```go
package main

import (
	"fmt"
	"math/big"
)

// millerRabin: Monte Carlo test nguyên tố.
// Trả true => "có thể nguyên tố" (xác suất sai <= 4^-k).
// Trả false => CHẮC CHẮN hợp số.
// (Dùng math/big để minh hoạ ý tưởng; sản phẩm thật dùng big.Int.ProbablyPrime.)
func millerRabin(n *big.Int, k int) bool {
	return n.ProbablyPrime(k) // Go cài sẵn Miller-Rabin + Baillie-PSW
}

func main() {
	n := big.NewInt(0).SetInt64(1000000007) // số nguyên tố nổi tiếng trong CP
	fmt.Println(millerRabin(n, 20))          // true
	c := big.NewInt(0).SetInt64(1000000005)  // 1000000005 = 3 * 5 * ... hợp số
	fmt.Println(millerRabin(c, 20))          // false
}
```

**Vì sao là Monte Carlo:**
- Thời gian **cố định**: $O(k \log^3 n)$ cho $k$ vòng — không phụ thuộc "may rủi".
- Kết quả **có thể sai một chiều**: nếu trả "false" thì $n$ *chắc chắn* hợp số (không sai); nếu trả "true" thì *có thể* sai với xác suất $\le 4^{-k}$.

**Ví dụ số về xác suất sai:**

| Số vòng $k$ | Xác suất sai $\le 4^{-k}$ | Diễn giải |
|-------------|---------------------------|-----------|
| 1 | $0.25$ | 1/4 — quá rủi ro |
| 5 | $\approx 9.8 \times 10^{-4}$ | ~1/1024 |
| 20 | $\approx 9.1 \times 10^{-13}$ | gần như không bao giờ |
| 40 | $\approx 8.3 \times 10^{-25}$ | nhỏ hơn lỗi phần cứng |

> ⚠ **Lỗi thường gặp.** Đừng dùng test Fermat thuần (chỉ kiểm $a^{n-1} \equiv 1$) — có những "số Carmichael" (vd 561) vượt qua test Fermat với *mọi* $a$ dù là hợp số. Miller-Rabin thêm bước kiểm "căn bậc hai phi tầm thường của 1" nên bắt được Carmichael.

> 📝 **Tóm tắt mục 7.** Miller-Rabin = Monte Carlo test nguyên tố, $O(k \log^3 n)$, sai $\le 4^{-k}$. "false" luôn đúng, "true" sai với xác suất nhỏ kiểm soát được. Go có sẵn `big.Int.ProbablyPrime`.

---

## 8. Cấu trúc dữ liệu ngẫu nhiên — Treap & Skip List

Không chỉ thuật toán, *cấu trúc dữ liệu* cũng dùng ngẫu nhiên để đạt cân bằng **kỳ vọng** mà không cần logic xoay phức tạp.

**Treap** (Tree + Heap). Mỗi node có hai khoá: *key* (theo BST) và *priority* (ngẫu nhiên, theo max-heap). Vì priority ngẫu nhiên, cây kỳ vọng cao $O(\log n)$ → insert/delete/search kỳ vọng $O(\log n)$, mà không cần luật xoay cứng nhắc như AVL/Red-Black.

> 💡 **Trực giác Treap.** Gán priority ngẫu nhiên = "trộn thứ tự insert". BST có chiều cao kỳ vọng $O(\log n)$ *nếu* các khoá được insert theo thứ tự ngẫu nhiên. Treap "giả lập" thứ tự insert ngẫu nhiên đó qua priority, dù khoá thật được thêm theo thứ tự nào.

**Skip List.** Danh sách liên kết nhiều tầng; mỗi node "leo" lên tầng cao hơn với xác suất $1/2$. Tầng cao = "đường cao tốc" bỏ qua nhiều node → tìm kiếm kỳ vọng $O(\log n)$. Đây là lựa chọn thay thế cây cân bằng, dễ cài hơn, dùng trong Redis (sorted set), LevelDB.

Chi tiết cài đặt: xem [DataStructures](../../DataStructures/README.md) (BST cân bằng) — bài này chỉ nhắc qua để thấy ngẫu nhiên có mặt ở cả tầng cấu trúc dữ liệu.

> 📝 **Tóm tắt mục 8.** Treap và skip list dùng ngẫu nhiên để đạt $O(\log n)$ *kỳ vọng* mà không cần logic cân bằng phức tạp — ví dụ điển hình của "ngẫu nhiên đơn giản hoá thiết kế".

---

## 9. Hashing & Universal Hashing

Nhắc lại [Lesson 16](../lesson-16-hashing-techniques/README.md): hash table tốt khi va chạm (collision) ít. Nhưng nếu hàm hash **cố định và công khai**, một adversary có thể tạo ra hàng loạt khoá *cùng* hash → tất cả dồn vào một bucket → mọi thao tác suy biến về $O(n)$ (tấn công "hash flooding" / DoS).

> 💡 **Trực giác Universal Hashing.** Thay vì một hàm hash cố định, ta chọn **ngẫu nhiên** một hàm từ một *họ* (family) hàm hash lúc khởi tạo. Adversary không biết ta chọn hàm nào → không dựng được khoá xấu trước. Đây lại là chiêu "vô hiệu hoá adversary" của mục 1a, áp vào hashing.

Một họ phổ biến: $h_{a,b}(x) = ((a \cdot x + b) \bmod p) \bmod m$ với $p$ nguyên tố lớn, $a \in [1, p-1]$, $b \in [0, p-1]$ chọn ngẫu nhiên. Tính chất "universal": với mọi cặp khoá $x \ne y$, $P[h(x) = h(y)] \le 1/m$ — va chạm hiếm *trung bình trên lựa chọn ngẫu nhiên của hàm*.

**Ví dụ số:** $p = 17$, $m = 5$, chọn ngẫu nhiên $a=3, b=4$. Hash $x=2$: $h(2) = ((3 \cdot 2 + 4) \bmod 17) \bmod 5 = (10 \bmod 17) \bmod 5 = 10 \bmod 5 = 0$. Hash $x=7$: $h(7) = ((21) \bmod 17) \bmod 5 = 4 \bmod 5 = 4$. Lần chạy sau chọn $a, b$ khác → bảng phân bố khác → adversary không đoán trước được.

> ⚠ **Thực tế.** Go runtime *đã* dùng hash ngẫu nhiên cho `map`: mỗi tiến trình seed một giá trị ngẫu nhiên lúc khởi động (`aeshash`/`memhash`), nên thứ tự duyệt `map` cũng ngẫu nhiên và không thể bị hash-flood dễ dàng. Đây là lý do `for k := range m` cho thứ tự khác nhau mỗi lần chạy.

> 📝 **Tóm tắt mục 9.** Universal hashing chọn hàm hash ngẫu nhiên từ một họ → chống adversarial collision. $P[\text{collision}] \le 1/m$. Go map dùng kỹ thuật này.

---

## 10. Monte Carlo Estimation — ước lượng π

> 💡 **Trực giác.** Vẽ một hình vuông cạnh 2 (từ $-1$ tới $1$) và một đường tròn bán kính 1 nội tiếp bên trong. Ném phi tiêu ngẫu nhiên đều vào hình vuông. **Tỉ lệ** phi tiêu rơi trong đường tròn $\approx$ tỉ lệ diện tích $= \frac{\pi r^2}{(2r)^2} = \frac{\pi}{4}$. Suy ra $\pi \approx 4 \times \frac{\text{số điểm trong tròn}}{\text{tổng điểm}}$.

```go
package main

import (
	"fmt"
	"math/rand"
)

// estimatePi ước lượng pi bằng Monte Carlo: ném n điểm ngẫu nhiên vào
// hình vuông [-1,1]^2, đếm số điểm rơi trong đường tròn bán kính 1.
// pi ~ 4 * (trong / tổng). Sai số giảm ~ 1/sqrt(n).
func estimatePi(n int) float64 {
	inside := 0
	for i := 0; i < n; i++ {
		x := rand.Float64()*2 - 1 // x đều trong [-1, 1)
		y := rand.Float64()*2 - 1 // y đều trong [-1, 1)
		if x*x+y*y <= 1.0 {       // trong đường tròn?
			inside++
		}
	}
	return 4.0 * float64(inside) / float64(n)
}

func main() {
	for _, n := range []int{100, 10000, 1000000} {
		fmt.Printf("n=%d -> pi ~ %.5f\n", n, estimatePi(n))
	}
	// Ví dụ output (sẽ khác mỗi lần chạy do random):
	// n=100     -> pi ~ 3.04000
	// n=10000   -> pi ~ 3.14160
	// n=1000000 -> pi ~ 3.14182
}
```

**Walk-through nhỏ, $n=4$ điểm** (minh hoạ cơ chế, không phải ước lượng tốt):

| Điểm | (x, y) | $x^2 + y^2$ | $\le 1$? |
|------|--------|-------------|----------|
| 1 | (0.2, 0.3) | 0.13 | trong ✓ |
| 2 | (0.9, 0.8) | 1.45 | ngoài ✗ |
| 3 | (-0.5, 0.1) | 0.26 | trong ✓ |
| 4 | (0.7, -0.6) | 0.85 | trong ✓ |

inside = 3, total = 4 → $\pi \approx 4 \times 3/4 = 3.0$ (thô, vì $n$ quá nhỏ).

**Sai số $\sim 1/\sqrt{n}$.** Để giảm sai số 10 lần, cần tăng $n$ lên **100 lần**. Đây là điểm yếu của Monte Carlo: hội tụ chậm. Nhưng nó cực mạnh cho **tích phân nhiều chiều** — nơi phương pháp lưới (grid) bùng nổ tổ hợp.

| $n$ | Sai số điển hình $\sim 1/\sqrt{n}$ |
|-----|-------------------------------------|
| 100 | $\sim 0.1$ |
| 10 000 | $\sim 0.01$ |
| 1 000 000 | $\sim 0.001$ |

> ❓ **Sao không tính π chính xác bằng cách này?** Vì sai số chỉ giảm $\sim 1/\sqrt{n}$, để có thêm một chữ số đúng cần gấp 100 lần điểm. Monte Carlo *không* thay được công thức giải tích cho π; nó hữu ích khi không có công thức (tích phân hàm phức tạp, mô phỏng vật lý, định giá tài chính).

> 📝 **Tóm tắt mục 10.** Monte Carlo estimation: lấy mẫu ngẫu nhiên để ước lượng đại lượng = tỉ lệ/tích phân. π ≈ 4·(trong/tổng). Sai số $\sim 1/\sqrt{n}$ — hội tụ chậm nhưng không bị "lời nguyền số chiều".

---

## 11. Go: `math/rand` vs `crypto/rand`

Go có **hai** nguồn ngẫu nhiên, dùng cho hai mục đích hoàn toàn khác nhau:

| | `math/rand` | `crypto/rand` |
|--|-------------|----------------|
| Bản chất | PRNG (giả ngẫu nhiên, có công thức) | CSPRNG (an toàn mật mã) |
| Tốc độ | Rất nhanh | Chậm hơn |
| Reproducible | Có (cùng seed → cùng dãy) | Không |
| Dự đoán được? | Có (nếu biết seed/state) | Không (an toàn) |
| Dùng cho | Thuật toán, mô phỏng, game, test | Token, khoá, mật khẩu, nonce, salt |

```go
package main

import (
	"crypto/rand"
	"encoding/hex"
	"fmt"
	mrand "math/rand" // alias để không trùng tên
)

func main() {
	// math/rand: nhanh, reproducible. Go 1.20+ tự seed ngẫu nhiên;
	// muốn reproducible thì tạo nguồn riêng với seed cố định:
	r := mrand.New(mrand.NewSource(42))
	fmt.Println(r.Intn(100)) // cùng 42 -> luôn cùng kết quả (tốt cho test)

	// crypto/rand: an toàn, KHÔNG reproducible, dùng cho bảo mật.
	token := make([]byte, 16)
	rand.Read(token) // đọc từ nguồn entropy hệ điều hành
	fmt.Println(hex.EncodeToString(token)) // vd "9f3a...c2" — khác mỗi lần
}
```

**Khi nào dùng cái nào** (liên hệ [Programming Lesson 47](../../Programming/README.md) về secure coding):
- `math/rand`: shuffle bài trong game thường, sinh dữ liệu test, mô phỏng Monte Carlo, random pivot quicksort. **Reproducible giúp debug.**
- `crypto/rand`: session token, API key, mật khẩu tạm, nonce mã hoá, salt. **Bất kỳ thứ gì kẻ tấn công không được đoán.**

> ⚠ **Lỗi nghiêm trọng.** Dùng `math/rand` để sinh token bảo mật = lỗ hổng. PRNG có thể bị "đảo ngược": biết vài output → suy ra state → đoán mọi output tương lai. Nhiều vụ hack ví tiền điện tử do dùng PRNG yếu sinh khoá. **Bảo mật → luôn `crypto/rand`.**

> 📝 **Tóm tắt mục 11.** `math/rand` = nhanh, reproducible, cho thuật toán/mô phỏng. `crypto/rand` = an toàn, không đoán được, cho bảo mật. Không bao giờ lẫn lộn.

---

## 12. Phân tích Expected — Linearity of Expectation

> 💡 **Trực giác.** Để tính "trung bình số phép so sánh của quicksort", ta *không* tính trực tiếp (rất khó). Thay vào đó: với *mỗi cặp* phần tử, hỏi "xác suất chúng bị so sánh là bao nhiêu?", rồi **cộng tất cả lại**. Linearity of expectation cho phép cộng kỳ vọng kể cả khi các sự kiện *không* độc lập — đây là phép màu của kỹ thuật này.

**Linearity of expectation.** Với *mọi* biến ngẫu nhiên $X_1, \dots, X_m$ (kể cả phụ thuộc nhau):
$$E[X_1 + X_2 + \dots + X_m] = E[X_1] + E[X_2] + \dots + E[X_m].$$

**Indicator variable.** Đặt $X_i = 1$ nếu sự kiện $i$ xảy ra, $0$ nếu không. Khi đó $E[X_i] = P(\text{sự kiện } i)$. Tổng các indicator = "đếm số sự kiện xảy ra".

### Áp dụng: kỳ vọng số so sánh của randomized quicksort

Gọi $z_1 < z_2 < \dots < z_n$ là các phần tử đã sắp. Đặt $X_{ij} = 1$ nếu $z_i$ và $z_j$ *từng bị so sánh* trong suốt thuật toán. Tổng số so sánh $X = \sum_{i<j} X_{ij}$.

**Bước 1 — khi nào $z_i, z_j$ bị so sánh?** Chỉ khi *một trong hai* được chọn làm pivot **trước** mọi phần tử nằm giữa chúng (tập $\{z_i, z_{i+1}, \dots, z_j\}$ có $j - i + 1$ phần tử). Nếu một phần tử giữa được chọn pivot trước → $z_i, z_j$ bị tách sang hai nhánh, không bao giờ gặp nhau.

**Bước 2 — xác suất.** Trong $j - i + 1$ phần tử của đoạn $[z_i, z_j]$, mỗi cái có cơ hội ngang nhau được chọn pivot đầu tiên. $z_i, z_j$ bị so sánh khi $z_i$ *hoặc* $z_j$ là một trong hai cái đầu được chọn:
$$P(X_{ij} = 1) = \frac{2}{j - i + 1}.$$
Do đó $E[X_{ij}] = \frac{2}{j-i+1}$.

**Bước 3 — cộng tất cả (linearity).**
$$E[X] = \sum_{i=1}^{n-1} \sum_{j=i+1}^{n} \frac{2}{j-i+1}.$$
Đặt $d = j - i$, mỗi $d$ có $\le n$ cặp:
$$E[X] \le \sum_{i=1}^{n-1} \sum_{d=1}^{n-i} \frac{2}{d+1} < \sum_{i=1}^{n} 2 \sum_{d=1}^{n} \frac{1}{d} = 2n \cdot H_n,$$
trong đó $H_n = \sum_{d=1}^n \frac{1}{d} \approx \ln n$ là số điều hoà. Vậy:
$$E[X] = O(n \ln n) = O(n \log n). \qquad \blacksquare$$

**Ví dụ số, $n = 4$ phần tử $z_1, z_2, z_3, z_4$:**

| Cặp $(i,j)$ | $j-i+1$ | $P = 2/(j-i+1)$ |
|-------------|---------|------------------|
| (1,2) | 2 | 1.000 |
| (2,3) | 2 | 1.000 |
| (3,4) | 2 | 1.000 |
| (1,3) | 3 | 0.667 |
| (2,4) | 3 | 0.667 |
| (1,4) | 4 | 0.500 |

$E[X] = 3(1.0) + 2(0.667) + 0.5 = 3 + 1.333 + 0.5 = 4.833$ phép so sánh kỳ vọng. (Phần tử liền kề luôn bị so sánh; càng xa nhau, xác suất càng giảm.)

> 🔁 **Dừng lại tự kiểm tra.** Vì sao $z_i$ và $z_{i+1}$ (liền kề) *luôn* bị so sánh ($P=1$)?
> <details><summary>Đáp án</summary>Đoạn $[z_i, z_{i+1}]$ chỉ có 2 phần tử, không có phần tử nào nằm giữa. Cái nào được pivot trước cũng so sánh với cái kia. $P = 2/2 = 1$.</details>

> 📝 **Tóm tắt mục 12.** Indicator variable + linearity of expectation = công cụ chuẩn để phân tích thuật toán ngẫu nhiên. Quicksort: $E[\text{so sánh}] = \sum_{i<j} \frac{2}{j-i+1} = O(n \log n)$.

---

## 13. Cạm bẫy (Pitfalls)

> ⚠ Tổng hợp các lỗi đã rải rác trong bài, để tra cứu nhanh:

1. **Seed cố định nhầm chỗ.** `mrand.NewSource(42)` cho dãy *reproducible* — tốt cho test, **sai** cho production cần ngẫu nhiên thật (mọi lần chạy ra cùng "ngẫu nhiên"). Go 1.20+ mặc định auto-seed; trước đó phải `rand.Seed(time.Now().UnixNano())`.

2. **`math/rand` không thread-safe (Go cũ) khi tạo nguồn riêng.** Hàm top-level `rand.Intn` dùng nguồn global có lock (an toàn). Nhưng `r := rand.New(...)` *riêng* **không** có lock — gọi từ nhiều goroutine → data race. Giải: mỗi goroutine một `*rand.Rand` riêng, hoặc dùng `math/rand/v2` (Go 1.22+).

3. **Naive shuffle bias** (mục 6). Phải dùng Fisher-Yates ($[0,i]$) hoặc `rand.Shuffle`, không tự chế swap dải đầy đủ.

4. **Monte Carlo thiếu iteration.** Sai số $\sim 1/\sqrt{n}$ — quá ít mẫu → ước lượng tệ. Phải đủ $n$ cho độ chính xác cần (mục 10).

5. **`math/rand` cho bảo mật = lỗ hổng.** Token/khoá/nonce **luôn** `crypto/rand` (mục 11). PRNG có thể bị đảo ngược state.

6. **Quên `+1` trong `rand.Intn(i+1)`** (Fisher-Yates, reservoir) → loại trừ một giá trị → bias.

> 📝 **Tóm tắt mục 13.** Sáu cạm bẫy: seed cố định, thread-safety, naive shuffle, thiếu iteration, dùng nhầm rand cho bảo mật, lỗi off-by-one phạm vi `Intn`.

---

## Bài tập

> Mỗi bài có lời giải chi tiết bên dưới — không bỏ ngỏ.

1. **Quickselect tìm phần tử lớn thứ k.** Viết hàm trả về phần tử *lớn* thứ $k$ (k từ 1). Phân tích Big-O expected/worst.
2. **Reservoir sample k từ stream.** Cài `reservoirSample(stream, k)` đầy đủ; giải thích vì sao mỗi phần tử có xác suất $k/n$.
3. **Shuffle mảng (Fisher-Yates).** Cài lại từ đầu, chứng minh đều bằng đếm đường đi. Chỉ ra một lỗi off-by-one làm hỏng tính đều.
4. **Random pick index theo trọng số (weighted).** Cho mảng trọng số `w`, trả về index $i$ với xác suất $w_i / \sum w$. Big-O.
5. **Monte Carlo π estimate.** Cài `estimatePi(n)`; chạy thử với $n = 10^2, 10^4, 10^6$, nhận xét hội tụ và sai số.
6. **Random point trong hình tròn (đều).** Sinh điểm ngẫu nhiên *đều* trong đường tròn bán kính 1. Cảnh báo cạm bẫy bán kính + cách sửa.

---

## Lời giải chi tiết

### Bài 1 — Quickselect phần tử lớn thứ k

**Cách tiếp cận.** Phần tử lớn thứ $k$ = phần tử nhỏ thứ $(n - k)$ (0-indexed). Dùng lại `quickselect` mục 4.

```go
func kthLargest(a []int, k int) int {
	n := len(a)
	return quickselect(a, 0, n-1, n-k) // lớn thứ k = nhỏ thứ (n-k)
}
// Ví dụ: a=[3,2,1,5,6,4], k=2 (lớn thứ 2). n=6 -> nhỏ thứ 4 (index 4).
// Sắp: [1,2,3,4,5,6], index 4 = 5. Đáp án: 5. ✓
```

**Walk-through `[3,2,1,5,6,4]`, k=2:** n=6, gọi `quickselect(a, 0, 5, 4)`. Sau sắp ảo `[1,2,3,4,5,6]`, index 4 = `5`. Đúng (lớn thứ 2 là 5, sau 6).

**Big-O.** Expected $O(n)$ (phân tích chuỗi $n + \frac34 n + \dots = 4n$ ở mục 4). Worst-case $O(n^2)$ nhưng xác suất cực nhỏ với random pivot. Bộ nhớ $O(\log n)$ cho stack đệ quy (kỳ vọng), $O(1)$ nếu viết lặp.

### Bài 2 — Reservoir sample k từ stream

**Cách tiếp cận.** Đúng như Algorithm R mục 5: $k$ phần tử đầu nhận hết; phần tử thứ $i$ (0-indexed) nhận với xác suất $k/(i+1)$ bằng cách lấy $j = \text{Intn}(i+1)$, nếu $j < k$ thì thay `reservoir[j]`.

```go
func reservoirSample(stream []int, k int) []int {
	res := make([]int, 0, k)
	for i, x := range stream {
		if i < k {
			res = append(res, x)
		} else if j := rand.Intn(i + 1); j < k {
			res[j] = x
		}
	}
	return res
}
```

**Vì sao mỗi phần tử xác suất $k/n$:** đã chứng minh quy nạp ở mục 5 — giả thiết "sau $i$ phần tử mỗi cái có xác suất $k/i$" được bảo toàn sau bước $i+1$ thành $k/(i+1)$ cho cả phần tử cũ lẫn mới. Cuối stream ($i=n$) → mọi phần tử có xác suất $k/n$.

**Big-O.** Thời gian $O(n)$ (một lượt), bộ nhớ $O(k)$. Đây là ưu điểm cốt lõi: không cần biết $n$, không lưu cả stream.

### Bài 3 — Fisher-Yates + chứng minh đều

```go
func shuffle(a []int) {
	for i := len(a) - 1; i > 0; i-- {
		j := rand.Intn(i + 1) // [0, i] BAO GỒM i
		a[i], a[j] = a[j], a[i]
	}
}
```

**Chứng minh đều (đếm đường đi).** Tại $i = n-1$ có $n$ lựa chọn $j$; $i=n-2$ có $n-1$ lựa chọn; ...; $i=1$ có 2 lựa chọn. Tổng đường đi $= n \times (n-1) \times \dots \times 2 = n!$. Mỗi đường đi sinh một hoán vị *khác nhau* (song ánh) → mỗi hoán vị xác suất đúng $1/n!$. ✓

**Lỗi off-by-one làm hỏng tính đều.** Nếu viết `j := rand.Intn(i)` (thiếu `+1`), $j$ chỉ trong $[0, i-1]$ → phần tử $i$ không bao giờ đứng yên → chỉ sinh hoán vị *cyclic* (đây là thuật toán Sattolo, dùng cho mục đích khác), tổng đường đi $= (n-1)!$ < $n!$ → **không** đều trên toàn bộ hoán vị.

**Big-O.** Thời gian $O(n)$, bộ nhớ $O(1)$ (xáo tại chỗ).

### Bài 4 — Weighted random pick index

**Cách tiếp cận.** Xây *prefix sum* của trọng số, sinh $r$ ngẫu nhiên trong $[0, \text{tổng})$, dùng **binary search** tìm index đầu tiên có prefix > $r$.

```go
import "sort"

type WeightedPicker struct {
	prefix []int // prefix[i] = w[0]+...+w[i]
	total  int
}

func NewWeightedPicker(w []int) *WeightedPicker {
	p := make([]int, len(w))
	sum := 0
	for i, x := range w {
		sum += x
		p[i] = sum
	}
	return &WeightedPicker{prefix: p, total: sum}
}

func (wp *WeightedPicker) Pick() int {
	r := rand.Intn(wp.total)                 // r đều trong [0, total)
	return sort.SearchInts(wp.prefix, r+1) // index đầu tiên có prefix >= r+1
}
// Ví dụ w=[1,3,6], prefix=[1,4,10], total=10.
// P(index 0)=1/10, index 1=3/10, index 2=6/10. ✓
```

**Walk-through `w=[1,3,6]`:** prefix `[1,4,10]`. Nếu $r=0$ → tìm prefix$\ge 1$ → index 0. Nếu $r \in \{1,2,3\}$ → prefix$\ge 2..4$ → index 1 (3 giá trị → xác suất 3/10). Nếu $r \in \{4..9\}$ → index 2 (6 giá trị → 6/10). Đúng tỉ lệ trọng số.

**Big-O.** Tiền xử lý $O(n)$. Mỗi `Pick()` là $O(\log n)$ (binary search). Bộ nhớ $O(n)$.

### Bài 5 — Monte Carlo π

```go
func estimatePi(n int) float64 {
	inside := 0
	for i := 0; i < n; i++ {
		x, y := rand.Float64()*2-1, rand.Float64()*2-1
		if x*x+y*y <= 1 {
			inside++
		}
	}
	return 4 * float64(inside) / float64(n)
}
```

**Nhận xét hội tụ (số liệu điển hình, khác mỗi lần chạy):**

| $n$ | π ước lượng | Sai số tuyệt đối |
|-----|-------------|-------------------|
| $10^2$ | $\sim 3.04$ | $\sim 0.10$ |
| $10^4$ | $\sim 3.1416$ | $\sim 0.01$ |
| $10^6$ | $\sim 3.14182$ | $\sim 0.001$ |

Sai số giảm $\sim 1/\sqrt{n}$: tăng $n$ 100 lần → sai số giảm 10 lần. **Big-O** thời gian $O(n)$, bộ nhớ $O(1)$.

### Bài 6 — Random point đều trong hình tròn

**Cạm bẫy.** Cách *sai* phổ biến: chọn góc $\theta \in [0, 2\pi)$ đều và bán kính $r \in [0, 1)$ đều, rồi $(r\cos\theta, r\sin\theta)$. Kết quả **dồn về tâm** — vì diện tích vành ngoài lớn hơn nhưng được phân bổ cùng "lượng $r$" như vành trong.

**Cách sửa (2 phương án):**

```go
import "math"

// Phương án 1: rejection sampling — đơn giản, đều, ~78.5% điểm được nhận.
func randPointInCircle() (float64, float64) {
	for {
		x, y := rand.Float64()*2-1, rand.Float64()*2-1
		if x*x+y*y <= 1 {
			return x, y // nằm trong tròn -> nhận
		}
	}
}

// Phương án 2: dùng sqrt để sửa phân bố bán kính.
// r = sqrt(u) với u đều trong [0,1) -> mật độ đúng theo diện tích.
func randPointInCircle2() (float64, float64) {
	theta := rand.Float64() * 2 * math.Pi
	r := math.Sqrt(rand.Float64()) // SQRT là chìa khoá chống dồn tâm
	return r * math.Cos(theta), r * math.Sin(theta)
}
```

**Vì sao `sqrt`?** Muốn mật độ đều theo diện tích, $P(R \le r) = r^2$ (tỉ lệ diện tích tròn bán kính $r$). Nếu $U$ đều trong $[0,1)$ thì $R = \sqrt{U}$ cho $P(R \le r) = P(U \le r^2) = r^2$. ✓ (Đây là phương pháp *inverse transform sampling*.)

**Big-O.** Rejection: kỳ vọng $4/\pi \approx 1.27$ lần thử mỗi điểm → $O(1)$ kỳ vọng. Phương án sqrt: $O(1)$ chắc chắn (2 lần gọi `rand` + sqrt). Bộ nhớ $O(1)$.

---

## Code & Minh hoạ

- Toàn bộ code Go đã **inline** trong bài (randomized quicksort, quickselect, reservoir sampling, Fisher-Yates, Monte Carlo π, weighted pick, random point in circle). Mỗi đoạn có comment + walk-through.
- **[visualization.html](./visualization.html)** — 3 module tương tác:
  1. **Reservoir sampling**: stream chảy qua, animate thay thế ngẫu nhiên giữ $k$ mẫu, đếm xác suất hội tụ về đều.
  2. **Fisher-Yates shuffle**: mảng, animate swap ngẫu nhiên từ cuối, đối chiếu với naive shuffle bias.
  3. **Monte Carlo π**: ném điểm ngẫu nhiên vào hình vuông, đếm trong/ngoài đường tròn, π hội tụ về $\approx 3.14159$.

---

## Bài tiếp theo

- **[Lesson 49 — P vs NP & Intractability](../lesson-49-intractability-np/README.md)**: khi cả ngẫu nhiên cũng không đủ — các bài toán *khó về bản chất* (NP-complete), reduction, và thuật toán xấp xỉ/heuristic. Randomization sẽ tái xuất dưới dạng *randomized approximation* và *Monte Carlo cho TSP*.

## Tham khảo

- CLRS, *Introduction to Algorithms*, Ch. 5 (Probabilistic Analysis), Ch. 7.3 (Randomized Quicksort), Ch. 9.2 (Randomized Select).
- Motwani & Raghavan, *Randomized Algorithms*.
- Go docs: [`math/rand`](https://pkg.go.dev/math/rand), [`crypto/rand`](https://pkg.go.dev/crypto/rand), [`math/rand/v2`](https://pkg.go.dev/math/rand/v2).
