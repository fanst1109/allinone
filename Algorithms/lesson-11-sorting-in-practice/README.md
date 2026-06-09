# Lesson 11 — Sorting trong thực tế

> **Tier 1 · Bài cuối** — Tổng kết toàn bộ thuật toán sort đã học, hiểu các *hybrid sort* mà ngôn ngữ thật dùng (Introsort của C++, Timsort của Python/Java, pdqsort của Go), và quan trọng nhất: **khi nào dùng cái nào** + **vì sao đừng tự viết sort cho production**.

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Đọc và sử dụng thành thạo bảng so sánh đầy đủ 9 thuật toán sort (time/space/stable/in-place).
- Hiểu cơ chế của **hybrid sort** thực tế: Introsort, Timsort, pdqsort — vì sao chúng tồn tại.
- Dùng đúng `sort.Ints`, `sort.Slice`, `sort.SliceStable`, `sort.Sort(Interface)`, `slices.Sort` trong Go.
- Biết cách **chọn thuật toán** theo đặc điểm dữ liệu (decision tree).
- Sort theo **nhiều khóa** đúng cách (comparator phức vs stable multi-pass).
- Tránh các cạm bẫy: comparator dùng `≤`, sort không ổn định bất ngờ, NaN trong float, Unicode trong string.

## Kiến thức tiền đề

- [Lesson 06 — Elementary Sorts](../lesson-06-elementary-sorts/) (bubble, insertion, selection).
- [Lesson 07 — Merge Sort](../lesson-07-merge-sort/) (divide & conquer, ổn định).
- [Lesson 08 — Quicksort](../lesson-08-quicksort/) (partition, pivot, worst O(n²)).
- [Lesson 09 — Heap Sort](../lesson-09-heap-sort/) (in-place, guaranteed O(n log n)).
- [Lesson 10 — Non-comparison Sorts](../lesson-10-non-comparison-sorts/) (counting, radix, bucket).
- `interface` trong Go: [Programming Lesson 18 — Interface](../../Programming/lesson-18-interfaces/).

---

## 1. Tổng kết các thuật toán sort đã học

> 💡 **Trực giác / Hình dung.** Hãy hình dung mỗi thuật toán như một công cụ trong hộp đồ nghề. Búa (quicksort) nhanh và đa năng nhưng có lúc trượt tay (worst case O(n²)). Cờ-lê lực (heapsort) chậm hơn búa một chút nhưng *luôn* siết đúng lực (guaranteed O(n log n)). Tua-vít tí hon (insertion sort) chỉ hợp việc nhỏ. Không có công cụ "tốt nhất tuyệt đối" — chỉ có công cụ *phù hợp với việc*.

Đây là bảng tổng hợp đầy đủ. **Học thuộc cột "Khi dùng" quan trọng hơn học thuộc công thức.**

| Thuật toán | Best | Avg | Worst | Space | Stable | In-place | Khi dùng |
|------------|:----:|:---:|:-----:|:-----:|:------:|:--------:|----------|
| **Bubble sort** | O(n) | O(n²) | O(n²) | O(1) | ✓ | ✓ | Gần như không bao giờ; chỉ để dạy học |
| **Insertion sort** | O(n) | O(n²) | O(n²) | O(1) | ✓ | ✓ | n nhỏ (< ~20), mảng **gần như đã sorted** |
| **Selection sort** | O(n²) | O(n²) | O(n²) | O(1) | ✗ | ✓ | Khi số lần swap phải nhỏ nhất (mỗi phần tử swap ≤ 1 lần) |
| **Merge sort** | O(n log n) | O(n log n) | O(n log n) | O(n) | ✓ | ✗ | Cần **ổn định** + guaranteed; external sort (dữ liệu trên đĩa) |
| **Quicksort** | O(n log n) | O(n log n) | **O(n²)** | O(log n) | ✗ | ✓* | General-purpose, cache-friendly, in-memory nhanh nhất trung bình |
| **Heap sort** | O(n log n) | O(n log n) | O(n log n) | O(1) | ✗ | ✓ | Cần **O(1) space** + **guaranteed** O(n log n) |
| **Counting sort** | O(n+k) | O(n+k) | O(n+k) | O(n+k) | ✓ | ✗ | Integer trong **dải nhỏ** k (k ~ O(n)) |
| **Radix sort** | O(d·(n+k)) | O(d·(n+k)) | O(d·(n+k)) | O(n+k) | ✓ | ✗ | Integer/chuỗi độ dài cố định d |
| **Bucket sort** | O(n+k) | O(n+k) | O(n²) | O(n+k) | ✓† | ✗ | Dữ liệu **phân bố đều** trên một khoảng |

> Ghi chú:
> - **Quicksort in-place (✓*)**: phần partition là in-place, nhưng dùng O(log n) stack cho đệ quy → không phải O(1) tuyệt đối.
> - **Bucket sort stable (✓†)**: ổn định *nếu* thuật toán sort trong mỗi bucket ổn định.
> - **k** = kích thước dải giá trị (counting/bucket); **d** = số chữ số/ký tự (radix).

### Vì sao có nhiều thuật toán đến vậy?

Vì không thuật toán nào tối ưu *mọi* tiêu chí cùng lúc. Định lý nền tảng: **mọi thuật toán sort dựa trên so sánh (comparison sort) có cận dưới Ω(n log n)** ở worst case. Muốn nhanh hơn (counting/radix O(n)) thì phải *không so sánh* — và đánh đổi: chỉ áp dụng cho key đặc biệt (integer dải nhỏ), tốn thêm space.

> ❓ **Câu hỏi tự nhiên của người đọc.**
> - *"Quicksort avg O(n log n) như merge sort, sao thực tế quicksort thường nhanh hơn?"* — Vì hằng số ẩn nhỏ hơn và **cache locality** tốt (truy cập tuần tự, ít cache miss). Big-O bỏ qua hằng số nhưng phần cứng thì không. Xem mục 8.
> - *"Heap sort cũng O(n log n) guaranteed và O(1) space — sao không dùng nó làm mặc định thay quicksort?"* — Vì heap sort nhảy lung tung trong mảng (truy cập index $2i+1$, $2i+2$) → cache miss nhiều → chậm hơn quicksort 2–3 lần trên thực tế dù cùng Big-O.
> - *"Bubble sort có best O(n) (khi đã sorted), sao vẫn nói 'gần như không dùng'?"* — Vì insertion sort cũng có best O(n) **và** avg/worst tốt hơn về hằng số, lại đơn giản tương đương. Bubble không có lợi thế nào.

> 🔁 **Dừng lại tự kiểm tra.**
> 1. Thuật toán nào vừa stable, vừa guaranteed O(n log n), nhưng tốn O(n) space?
> 2. Bạn cần sort 1 triệu số nguyên trong dải [0, 100]. Dùng thuật toán nào?
>
> <details><summary>Đáp án</summary>
>
> 1. **Merge sort**. (Heap sort guaranteed nhưng không stable; quicksort không guaranteed.)
> 2. **Counting sort** — $k = 101$ rất nhỏ so với $n = 10^6$, nên O(n+k) ≈ O(n), nhanh hơn O(n log n) nhiều.
> </details>

> 📝 **Tóm tắt mục 1.**
> - Comparison sort có cận dưới Ω(n log n); muốn nhanh hơn phải non-comparison.
> - Không có "best" tuyệt đối — chọn theo tiêu chí: stable? in-place? guaranteed? dải key?
> - Quicksort thắng thực tế nhờ cache locality dù worst O(n²); heap/merge guaranteed nhưng có nhược điểm riêng.

---

## 2. Hybrid sorts — cái mà ngôn ngữ thật dùng

> 💡 **Trực giác / Hình dung.** Một thợ lành nghề không dùng một công cụ cho mọi việc — họ *đổi công cụ giữa chừng* tùy tình huống. Hybrid sort cũng vậy: bắt đầu bằng thuật toán nhanh nhất trung bình (quicksort), nhưng nếu phát hiện "đang sa lầy" thì đổi sang thuật toán an toàn (heapsort), và với mẩu nhỏ thì dùng công cụ tí hon (insertion). Lấy ưu điểm, né nhược điểm.

Stdlib của các ngôn ngữ **không** dùng quicksort/merge sort thuần. Chúng dùng *hybrid*:

### 2.1 Introsort — `std::sort` của C++

Introsort = **Intro**spective **Sort** (Musser, 1997). Ba thành phần:

1. **Quicksort** cho phần lớn công việc (nhanh trung bình).
2. **Heapsort** khi độ sâu đệ quy vượt ngưỡng $2 \cdot \lfloor \log_2 n \rfloor$ → tránh worst case O(n²) của quicksort. (Heapsort guaranteed O(n log n).)
3. **Insertion sort** cho các đoạn nhỏ (≤ 16 phần tử) → quicksort tốn overhead trên mẩu nhỏ.

> **Walk-through ngưỡng đệ quy.** Với n = 1000: ngưỡng = $2 \cdot \lfloor \log_2 1000 \rfloor = 2 \cdot 9 = $ **18**. Nếu quicksort chọn pivot tệ liên tục và đệ quy sâu hơn 18 tầng (dấu hiệu của worst case), introsort *chuyển* phần còn lại sang heapsort. Như vậy worst case bị chặn ở O(n log n) thay vì O(n²).

Vì sao 3 thuật toán này?

| Thành phần | Giải quyết vấn đề gì |
|-----------|----------------------|
| Quicksort | Nhanh nhất trung bình, cache-friendly |
| Heapsort (fallback) | Chặn worst case O(n²) của quicksort thành O(n log n) |
| Insertion (mẩu nhỏ) | Quicksort tốn overhead đệ quy/partition trên n nhỏ; insertion thắng hằng số |

### 2.2 Timsort — Python `sorted()`, Java `Arrays.sort(Object[])`

Timsort (Tim Peters, 2002) tối ưu cho **dữ liệu thực tế** — vốn thường *gần như đã sorted* (dữ liệu log theo thời gian, danh sách đã sort rồi thêm vài phần tử...).

Ý tưởng cốt lõi: khai thác **"run"** — đoạn con đã sorted sẵn.

1. Quét mảng, gom các **run** (đoạn tăng hoặc giảm liên tiếp). Run giảm thì đảo ngược.
2. Run quá ngắn (< `minrun`, thường 32–64) → kéo dài bằng **insertion sort**.
3. **Merge** các run lại (như merge sort) theo quy tắc giữ stack run cân bằng.

> **Walk-through khai thác run.** Mảng `[1, 2, 3, 7, 4, 5, 6, 9]`:
> - Run 1: `[1, 2, 3, 7]` (đã tăng, dài 4).
> - Run 2: `[4, 5, 6, 9]` (đã tăng, dài 4).
> - Chỉ cần **1 lần merge** 2 run → xong. Merge sort thuần sẽ chia tới đơn lẻ rồi merge log n tầng. Timsort phát hiện sẵn 2 run → **O(n)** cho mảng gần sorted thay vì O(n log n).

Timsort có best case **O(n)** (mảng đã sorted = 1 run duy nhất), avg/worst O(n log n), **stable**, space O(n).

### 2.3 Vì sao hybrid?

Mỗi thuật toán thuần có "gót chân Achilles". Hybrid lắp ghép để không thuật toán nào lộ điểm yếu:

- Quicksort thuần: worst O(n²) → Introsort vá bằng heapsort.
- Merge sort thuần: không khai thác dữ liệu gần sorted → Timsort vá bằng phát hiện run.
- Mọi thuật toán: chậm trên mẩu nhỏ → vá bằng insertion sort.

> ⚠ **Lỗi thường gặp.** Tưởng `std::sort` hay Python `sorted()` là "quicksort" hay "merge sort thuần". **Sai.** Chúng là hybrid được tinh chỉnh hàng chục năm. Đây chính là lý do **đừng tự viết sort cho production** (mục 8) — bạn khó địch được công sức tối ưu này.

> ❓ **Câu hỏi tự nhiên.**
> - *"Timsort có worst case không?"* — Có, O(n log n) khi dữ liệu hoàn toàn ngẫu nhiên (không có run dài). Nhưng nó không bao giờ O(n²).
> - *"Sao Java dùng Timsort cho `Object[]` nhưng quicksort (dual-pivot) cho `int[]`?"* — Vì `Object[]` cần **stable** (giữ thứ tự phần tử bằng nhau, quan trọng khi sort theo nhiều khóa); `int[]` thì hai số `5` không phân biệt được → stable vô nghĩa, ưu tiên tốc độ in-place của quicksort.

> 🔁 **Dừng lại tự kiểm tra.** Introsort chuyển sang heapsort lúc nào, và để giải quyết vấn đề gì?
> <details><summary>Đáp án</summary>Khi độ sâu đệ quy vượt $\approx 2 \cdot \log_2 n$ (dấu hiệu pivot tệ liên tục → nguy cơ O(n²)). Heapsort guaranteed O(n log n) nên chặn worst case lại.</details>

> 📝 **Tóm tắt mục 2.**
> - **Introsort** (C++): quicksort + heapsort (khi đệ quy sâu) + insertion (mẩu nhỏ).
> - **Timsort** (Python/Java Object): merge + insertion, khai thác run → O(n) cho dữ liệu gần sorted, stable.
> - Hybrid = lắp ghép để không thuật toán nào lộ điểm yếu. Stdlib đã làm việc này → đừng tự viết.

---

## 3. Package `sort` trong Go

Go cung cấp sort qua package [`sort`](https://pkg.go.dev/sort) (cũ) và [`slices`](https://pkg.go.dev/slices) (Go 1.21+, generic). Dưới đây là toàn bộ API cần biết.

### 3.1 Hàm tiện lợi cho kiểu cơ bản

```go
package main

import (
	"fmt"
	"sort"
)

func main() {
	ints := []int{5, 2, 8, 1, 9}
	sort.Ints(ints) // sort tăng dần, in-place
	fmt.Println(ints) // [1 2 5 8 9]

	strs := []string{"banana", "apple", "cherry"}
	sort.Strings(strs) // theo thứ tự byte (lexicographic)
	fmt.Println(strs) // [apple banana cherry]

	floats := []float64{3.14, 1.41, 2.72}
	sort.Float64s(floats)
	fmt.Println(floats) // [1.41 2.72 3.14]
}
```

`sort.Ints`/`Strings`/`Float64s` là wrapper tiện cho 3 kiểu phổ biến nhất. Cả 3 sort **in-place, tăng dần**.

### 3.2 `sort.Slice` — comparator tùy chỉnh (KHÔNG ổn định)

```go
package main

import (
	"fmt"
	"sort"
)

type Person struct {
	Name string
	Age  int
}

func main() {
	people := []Person{
		{"An", 30}, {"Bình", 25}, {"Châu", 30}, {"Dũng", 25},
	}
	// Sort theo Age tăng dần. less(i, j) trả về "phần tử i có ĐỨNG TRƯỚC j không".
	sort.Slice(people, func(i, j int) bool {
		return people[i].Age < people[j].Age
	})
	fmt.Println(people)
	// Thứ tự của An vs Châu (cùng Age 30) KHÔNG đảm bảo — sort.Slice không stable.
}
```

`sort.Slice` nhận một closure `less(i, j int) bool`. Nó **không ổn định** vì bên trong dùng pattern kiểu quicksort/introsort (pdqsort từ Go 1.19). Hai phần tử "bằng nhau" theo comparator có thể bị đổi chỗ.

### 3.3 `sort.SliceStable` — ổn định (merge-based)

```go
sort.SliceStable(people, func(i, j int) bool {
	return people[i].Age < people[j].Age
})
// An LUÔN đứng trước Châu nếu ban đầu An đứng trước (cùng Age 30).
```

`sort.SliceStable` giữ nguyên thứ tự tương đối của các phần tử bằng nhau. Bên trong dùng thuật toán kiểu merge (insertion + merge in-place) → **chậm hơn `sort.Slice` một chút** nhưng đảm bảo stable. Dùng khi thứ tự phần tử bằng nhau *có ý nghĩa* (xem mục 6 — sort nhiều khóa).

### 3.4 `sort.Sort(Interface)` — implement Len/Less/Swap

Cách "cổ điển" trước khi có `sort.Slice`. Bạn định nghĩa kiểu thỏa interface `sort.Interface`:

```go
package main

import (
	"fmt"
	"sort"
)

// ByAge implement sort.Interface để sort []Person theo Age.
type ByAge []Person

func (a ByAge) Len() int           { return len(a) }
func (a ByAge) Less(i, j int) bool { return a[i].Age < a[j].Age } // strict <
func (a ByAge) Swap(i, j int)      { a[i], a[j] = a[j], a[i] }

type Person struct {
	Name string
	Age  int
}

func main() {
	people := []Person{{"An", 30}, {"Bình", 25}, {"Châu", 28}}
	sort.Sort(ByAge(people))       // không stable
	// sort.Stable(ByAge(people))  // bản stable
	fmt.Println(people) // [{Bình 25} {Châu 28} {An 30}]
}
```

Liên kết: đây là ứng dụng kinh điển của **interface** ([Programming L18](../../Programming/lesson-18-interfaces/)) — `sort.Sort` không cần biết kiểu cụ thể, chỉ cần nó có `Len/Less/Swap`.

> ❓ Khi nào dùng `sort.Sort(Interface)` thay vì `sort.Slice`? — Khi bạn muốn **tái sử dụng** logic sort ở nhiều nơi (định nghĩa `ByAge` một lần dùng nhiều lần), hoặc cần các phương thức khác trên cùng kiểu. Với sort một lần, `sort.Slice` gọn hơn.

### 3.5 `slices.Sort` — generic (Go 1.21+), dùng pdqsort

```go
package main

import (
	"fmt"
	"slices"
)

func main() {
	ints := []int{5, 2, 8, 1}
	slices.Sort(ints) // generic, không cần sort.Ints riêng cho từng kiểu
	fmt.Println(ints) // [1 2 5 8]

	// slices.SortFunc: comparator trả về int (âm/0/dương), giống strcmp
	type Person struct{ Name string; Age int }
	people := []Person{{"An", 30}, {"Bình", 25}}
	slices.SortFunc(people, func(a, b Person) int {
		return a.Age - b.Age // < 0 nếu a trước b; cẩn thận overflow, dùng cmp.Compare an toàn hơn
	})
	fmt.Println(people)

	// slices.SortStableFunc cho phiên bản ổn định.
}
```

`slices.Sort` (Go 1.21+) là cách *hiện đại* được khuyến nghị. Nội bộ dùng **pdqsort** (mục 4). `slices.SortFunc` nhận comparator kiểu `func(a, b T) int` (giống `strcmp`: âm = a trước, 0 = bằng, dương = b trước) — khác `sort.Slice` dùng `bool`.

> ⚠ **Lỗi thường gặp với `a.Age - b.Age`.** Phép trừ có thể **tràn số** (overflow) khi Age là số lớn (vd `math.MinInt`). An toàn hơn: dùng `cmp.Compare(a.Age, b.Age)` (package `cmp`, Go 1.21+).

> 📝 **Tóm tắt mục 3.**
> - `sort.Ints/Strings/Float64s`: tiện cho kiểu cơ bản.
> - `sort.Slice` (bool less, **không stable**) vs `sort.SliceStable` (stable, chậm hơn chút).
> - `sort.Sort(Interface)`: implement Len/Less/Swap — tái sử dụng, ứng dụng interface.
> - `slices.Sort`/`SortFunc` (Go 1.21+, generic, pdqsort): cách hiện đại; comparator trả `int`.

---

## 4. pdqsort — pattern-defeating quicksort

Go dùng **pdqsort** từ Go 1.19 (cho `sort.Slice` không ổn định và `slices.Sort`). Nó là *cải tiến của introsort*.

Tên "pattern-defeating": nó nhận diện và xử lý nhanh các **pattern** dữ liệu thường gặp mà quicksort cổ điển làm tệ:

| Pattern | pdqsort xử lý thế nào |
|---------|----------------------|
| Đã sorted / gần sorted | Phát hiện qua kiểm tra partition → chuyển sang insertion → **O(n)** |
| Nhiều phần tử trùng nhau | Dùng partition kiểu "fat" (3 ngả) gom phần tử bằng pivot lại |
| Pattern adversarial (cố tình gây O(n²)) | Khi đệ quy sâu bất thường → fallback heapsort (như introsort) |
| Mẩu nhỏ | Insertion sort |

Tóm lại pdqsort = introsort + nhận diện pattern (gần sorted, nhiều trùng) → tốt hơn introsort cổ điển trên dữ liệu thực, vẫn guaranteed O(n log n) worst case.

> 💡 **Vì sao tên "pattern-defeating"?** Quicksort cổ điển có những pattern dữ liệu "đánh bại" được nó (vd mảng đã sorted với pivot = phần tử đầu → O(n²)). pdqsort *đánh bại lại* các pattern đó: nó nhận diện và xử lý chúng riêng thay vì mù quáng partition.

> 📝 **Tóm tắt mục 4.** pdqsort = introsort + nhận diện pattern (gần sorted → insertion, nhiều trùng → 3-way partition). Go dùng từ 1.19. Guaranteed O(n log n), nhanh trên dữ liệu thực.

---

## 5. Chọn thuật toán nào? — Decision tree

> 💡 **Trực giác.** Đừng học thuộc — hãy hỏi *3 câu* theo thứ tự: (1) n có nhỏ không? (2) có cần ổn định không? (3) key có phải integer dải nhỏ không? Mỗi câu loại bớt lựa chọn.

```
START: cần sort một slice
│
├─ n rất nhỏ (< ~20)?  ───────────────────► INSERTION SORT
│                                            (ít overhead, nhanh trên mẩu nhỏ)
│
├─ Dữ liệu GẦN NHƯ đã sorted?  ────────────► INSERTION / TIMSORT
│                                            (best O(n), khai thác run)
│
├─ Key là INTEGER trong dải nhỏ k ~ O(n)? ─► COUNTING / RADIX SORT
│                                            (O(n), phá rào n log n)
│
├─ Cần ỔN ĐỊNH (giữ thứ tự phần tử bằng)? ─► MERGE SORT / sort.SliceStable
│
├─ Cần O(1) SPACE + GUARANTEED O(n log n)? ► HEAP SORT
│                                            (không stable, cache kém)
│
└─ General-purpose, không ràng buộc khác? ─► QUICKSORT / INTROSORT
                                             (Go: sort.Slice / slices.Sort)
```

**Trong Go thực tế:** hầu hết trường hợp dùng `slices.Sort` / `sort.Slice` (general). Cần stable → `sort.SliceStable`. Còn lại (counting/radix/heap thuần) thường chỉ tự viết khi *học* hoặc có ràng buộc rất đặc biệt.

> ❓ *"Sao decision tree để 'n nhỏ → insertion' lên đầu, dù sau đó vẫn có thể là integer dải nhỏ?"* — Vì với n nhỏ (vd 10 phần tử), overhead của counting sort (cấp phát mảng đếm kích thước k) hay đệ quy quicksort không đáng → insertion thắng bất kể tính chất khác. Câu hỏi rẻ nhất hỏi trước.

> 🔁 **Dừng lại tự kiểm tra.** Bạn sort một slice 50 triệu `float64` ngẫu nhiên, không cần ổn định, RAM dư dả. Chọn gì?
> <details><summary>Đáp án</summary>**Quicksort/introsort** (`slices.Sort` trong Go). Float không phải integer dải nhỏ → loại counting/radix. Không cần stable → không cần merge. RAM dư → không bắt buộc O(1) space → không cần ép heap. General-purpose thắng.</details>

> 📝 **Tóm tắt mục 5.** Hỏi theo thứ tự: n nhỏ? gần sorted? integer dải nhỏ? cần stable? cần O(1) space guaranteed? → còn lại là general (quicksort/introsort). Trong Go: mặc định `slices.Sort`, cần stable thì `sort.SliceStable`.

---

## 6. Sort theo nhiều khóa

Ví dụ kinh điển: sort danh sách nhân viên theo **phòng ban tăng dần, rồi (trong cùng phòng) lương giảm dần**. Có 2 cách.

### 6.1 Cách 1 — Comparator phức (so sánh từng khóa)

```go
package main

import (
	"fmt"
	"sort"
)

type Employee struct {
	Dept   string
	Salary int
	Name   string
}

func main() {
	emps := []Employee{
		{"Sales", 50, "An"}, {"Eng", 90, "Bình"},
		{"Sales", 70, "Châu"}, {"Eng", 90, "Dũng"},
	}
	sort.Slice(emps, func(i, j int) bool {
		if emps[i].Dept != emps[j].Dept {
			return emps[i].Dept < emps[j].Dept // khóa 1: Dept tăng
		}
		return emps[i].Salary > emps[j].Salary // khóa 2: Salary GIẢM
	})
	fmt.Println(emps)
	// [{Eng 90 Bình} {Eng 90 Dũng} {Sales 70 Châu} {Sales 50 An}]
}
```

Comparator so sánh khóa 1 trước; **chỉ khi bằng** mới xét khóa 2. Đây là cách phổ biến và rõ ràng nhất. Dùng được với `sort.Slice` (không cần stable vì comparator đã định nghĩa đầy đủ thứ tự).

### 6.2 Cách 2 — Stable multi-pass (sort lần lượt, khóa PHỤ trước)

Mẹo: **sort theo khóa phụ trước, rồi sort stable theo khóa chính.** Vì stable sort giữ thứ tự cũ cho phần tử bằng nhau, kết quả là sort theo khóa chính, ties được phân định bởi khóa phụ.

```go
package main

import (
	"fmt"
	"sort"
)

type Employee struct {
	Dept   string
	Salary int
	Name   string
}

func main() {
	emps := []Employee{
		{"Sales", 50, "An"}, {"Eng", 90, "Bình"},
		{"Sales", 70, "Châu"}, {"Eng", 90, "Dũng"},
	}
	// Pass 1: sort theo khóa PHỤ (Salary giảm).
	sort.SliceStable(emps, func(i, j int) bool {
		return emps[i].Salary > emps[j].Salary
	})
	// Pass 2: sort STABLE theo khóa CHÍNH (Dept tăng).
	// Vì stable, các phần tử cùng Dept giữ nguyên thứ tự Salary từ pass 1.
	sort.SliceStable(emps, func(i, j int) bool {
		return emps[i].Dept < emps[j].Dept
	})
	fmt.Println(emps)
	// Cùng kết quả với cách 1.
}
```

> ⚠ **Lỗi thường gặp.** Multi-pass **bắt buộc dùng stable sort**, và **sort khóa phụ TRƯỚC, khóa chính SAU**. Nếu làm ngược (sort khóa chính trước) thì pass sau xóa sạch thứ tự khóa chính. Nếu dùng `sort.Slice` (không stable) thì pass 2 phá thứ tự khóa phụ → sai.

> ❓ Cách nào tốt hơn? — Comparator phức (cách 1) thường **rõ ràng và nhanh hơn** (1 lần sort). Multi-pass hữu ích khi các khóa đến từ các nguồn rời rạc hoặc khi bạn tái dùng các comparator đơn lẻ có sẵn.

> 📝 **Tóm tắt mục 6.** (1) Comparator phức: so khóa 1, bằng thì so khóa 2... — gọn, 1 pass, dùng `sort.Slice`. (2) Stable multi-pass: sort khóa phụ trước rồi `SliceStable` khóa chính — bắt buộc stable.

---

## 7. Comparator pitfalls — strict weak ordering

Comparator `less(a, b)` phải định nghĩa một **strict weak ordering**. Quy tắc vàng: **dùng `<` (strict), KHÔNG dùng `≤`**.

Tính chất bắt buộc:

1. **Bất phản xạ (irreflexive)**: `less(a, a)` luôn `false` (không phần tử nào < chính nó).
2. **Bất đối xứng (asymmetric)**: nếu `less(a, b)` thì `!less(b, a)`.
3. **Bắc cầu (transitive)**: `less(a,b) && less(b,c)` ⟹ `less(a,c)`.

> ⚠ **Lỗi kinh điển: dùng `<=` thay `<`.**
> ```go
> // SAI: dùng <= vi phạm bất phản xạ — less(a,a) = (a <= a) = true!
> sort.Slice(s, func(i, j int) bool { return s[i] <= s[j] })
> // ĐÚNG:
> sort.Slice(s, func(i, j int) bool { return s[i] < s[j] })
> ```
> Comparator dùng `<=` cho rằng `a < a` là true → vi phạm strict weak ordering → hành vi **không xác định** (undefined): kết quả sai, hoặc trên một số cài đặt có thể **panic** (Go có thể panic `sort: comparator is not a transitive...` hoặc đọc ngoài biên).

> ❓ *"Vì sao `<=` lại nguy hiểm đến mức panic chứ không chỉ sai thứ tự?"* — Thuật toán sort *giả định* các tính chất trên để quyết định vùng partition/biên đệ quy. Comparator hỏng làm thuật toán tin rằng "đã đi hết vùng" sai chỗ → có thể truy cập index ngoài biên (Go runtime sẽ panic) hoặc lặp vô hạn ở cài đặt khác.

> 🔁 **Dừng lại tự kiểm tra.** Comparator `func(i, j) bool { return abs(s[i]) < abs(s[j]) || s[i] < s[j] }` có hợp lệ không?
> <details><summary>Đáp án</summary>**Không** đảm bảo bắc cầu/đối xứng nếu logic mâu thuẫn (vd `abs` bằng nhau nhưng nhánh sau lại quyết định khác → có thể cho cả `less(a,b)` và `less(b,a)` true ở các cặp khác nhau → vi phạm). Comparator phải định nghĩa MỘT thứ tự nhất quán. Sửa: chỉ so theo `abs`, ties để nguyên (`return abs(s[i]) < abs(s[j])`).</details>

> 📝 **Tóm tắt mục 7.** Comparator phải là strict weak ordering: dùng `<` không dùng `≤`; bất phản xạ + bất đối xứng + bắc cầu. Comparator hỏng → undefined behavior, có thể panic.

---

## 8. Performance thực tế — Big-O không phải tất cả

> 💡 **Trực giác.** Big-O đếm *số phép so sánh/hoán đổi* nhưng bỏ qua **chi phí mỗi phép** phụ thuộc phần cứng. Hai thuật toán cùng O(n log n) có thể chênh nhau 2–3× thời gian thực vì cache và branch prediction.

### 8.1 Cache locality — vì sao quicksort thắng heapsort

CPU đọc dữ liệu theo **cache line** (~64 byte). Truy cập *tuần tự* (đọc phần tử kề nhau) → cache hit, nhanh. Truy cập *nhảy lung tung* → cache miss, chậm gấp 10–100×.

- **Quicksort**: partition quét tuyến tính từ hai đầu vào giữa → truy cập gần tuần tự → **cache-friendly**.
- **Heapsort**: liên tục nhảy giữa node `i` và con `2i+1`, `2i+2` (cách xa nhau trong mảng) → **cache-unfriendly**.

Kết quả: dù cùng O(n log n), heapsort thực tế chậm hơn quicksort ~2–3 lần. Đây là lý do quicksort/introsort là lựa chọn mặc định, heapsort chỉ là *fallback*.

### 8.2 Branch prediction

CPU đoán trước nhánh `if`. Comparator với điều kiện khó đoán (dữ liệu ngẫu nhiên) → đoán sai → flush pipeline → chậm. Một số sort hiện đại (pdqsort) thiết kế "branchless partition" để giảm phụ thuộc branch prediction.

### 8.3 Đừng tự viết sort cho production

> ⚠ **Quy tắc thực tế.** **Không tự viết sort cho production.** `sort`/`slices` của Go đã được tối ưu hàng năm (pdqsort, branchless, ngưỡng insertion được tinh chỉnh đo đạc). Code "quicksort tự viết" của bạn gần như chắc chắn **chậm hơn và nhiều bug hơn** (comparator hỏng, worst case O(n²), off-by-one). Tự viết chỉ để **học**.

> 📝 **Tóm tắt mục 8.** Big-O bỏ qua hằng số phần cứng. Quicksort thắng heapsort nhờ cache locality dù cùng O(n log n). Branch prediction ảnh hưởng tốc độ. Stdlib đã tối ưu sâu → dùng nó, đừng tự viết cho production.

---

## 9. Đo & benchmark trong Go

Go có công cụ benchmark built-in (`testing.B`). Dưới đây là khung đo `sort.Slice` vs `sort.SliceStable`:

```go
// file: sort_bench_test.go — chạy: go test -bench=. -benchmem
package main

import (
	"math/rand"
	"sort"
	"testing"
)

func makeData(n int) []int {
	s := make([]int, n)
	for i := range s {
		s[i] = rand.Intn(1000) // nhiều giá trị trùng → khác biệt stable rõ hơn
	}
	return s
}

func BenchmarkSortSlice(b *testing.B) {
	for i := 0; i < b.N; i++ {
		b.StopTimer()
		data := makeData(10000)
		b.StartTimer()
		sort.Slice(data, func(i, j int) bool { return data[i] < data[j] })
	}
}

func BenchmarkSortSliceStable(b *testing.B) {
	for i := 0; i < b.N; i++ {
		b.StopTimer()
		data := makeData(10000)
		b.StartTimer()
		sort.SliceStable(data, func(i, j int) bool { return data[i] < data[j] })
	}
}
```

Kết quả điển hình (máy thật sẽ khác): `SortSlice` nhanh hơn `SortSliceStable` khoảng 1.2–2×. Bài học: **chỉ dùng stable khi thật sự cần** (sort nhiều khóa, giữ thứ tự cũ).

> ⚠ Lưu ý benchmark: phải `StopTimer/StartTimer` quanh phần tạo dữ liệu để không tính thời gian cấp phát/random vào kết quả sort. Và sort *biến đổi* slice in-place → phải tạo dữ liệu mới mỗi vòng, không sort lại slice đã sorted (sẽ đo nhầm best-case).

> 📝 **Tóm tắt mục 9.** Dùng `testing.B` để đo; stable thường chậm hơn 1.2–2×. Cô lập phần setup khỏi timer; tạo dữ liệu mới mỗi vòng. Stdlib đã tối ưu → tự viết chỉ để học.

---

## 10. Cạm bẫy tổng hợp

| Cạm bẫy | Hậu quả | Cách tránh |
|---------|---------|-----------|
| `sort.Slice` cho dữ liệu cần giữ thứ tự ties | Thứ tự phần tử bằng nhau bị xáo (không stable) | Dùng `sort.SliceStable` khi ties có ý nghĩa |
| Comparator dùng `<=` thay `<` | Undefined behavior, có thể **panic** | Luôn dùng `<` (strict weak ordering) |
| Sort `[]float64` có **NaN** | NaN so sánh kiểu nào cũng `false` → thứ tự sai/bất định | Lọc/xử lý NaN trước; `slices.Sort` đặt NaN ổn định hơn nhưng vẫn nên xử lý |
| Sort `string` mong "đúng abc tiếng Việt" | Go sort theo **byte (UTF-8)**, không theo locale | Dùng `golang.org/x/text/collate` cho thứ tự theo ngôn ngữ |
| `a.Age - b.Age` trong SortFunc | **Tràn số** với giá trị lớn | Dùng `cmp.Compare(a.Age, b.Age)` |
| Multi-pass sort khóa chính trước | Pass sau xóa thứ tự khóa chính | Sort khóa **phụ trước**, khóa chính sau, dùng stable |

### 10.1 NaN — chi tiết

```go
import "math"
nan := math.NaN()
fmt.Println(nan < 1.0)  // false
fmt.Println(nan > 1.0)  // false
fmt.Println(nan == nan) // false  <-- NaN không bằng chính nó!
```

Vì mọi so sánh với NaN đều `false`, comparator `s[i] < s[j]` coi NaN "không nhỏ hơn ai và không lớn hơn ai" → vị trí của NaN sau sort **không xác định** với `sort.Float64s` cũ. (Lưu ý: từ Go 1.21, `slices.Sort` đặt NaN ở đầu một cách nhất quán, nhưng vẫn nên xử lý NaN có chủ đích.)

### 10.2 String Unicode — byte order vs locale

```go
strs := []string{"Zebra", "apple", "Äpfel"}
sort.Strings(strs)
// ['Zebra' 'apple' 'Äpfel']  — 'Z'(0x5A) < 'a'(0x61), 'Ä' (multibyte) đứng cuối
```

Go sort string theo **giá trị byte UTF-8**, nên chữ hoa (A–Z = 0x41–0x5A) đứng *trước* chữ thường (a–z = 0x61–0x7A), và ký tự có dấu (multibyte) bị đẩy về cuối. Đây không phải thứ tự "từ điển" theo locale. Cần thứ tự đúng ngôn ngữ → dùng `collate`.

> 📝 **Tóm tắt mục 10.** Sáu cạm bẫy lớn: sort.Slice không stable; comparator `≤`; NaN trong float; Unicode theo byte; tràn số trong SortFunc; multi-pass sai thứ tự. Mỗi cái có cách phòng cụ thể ở bảng trên.

---

## Bài tập

> Làm thử trước khi xem [Lời giải chi tiết](#lời-giải-chi-tiết).

1. **Sort struct theo 2–3 khóa.** Cho `[]Student{Name, Grade, Score}`. Sort theo `Grade` tăng, cùng grade thì `Score` giảm, cùng cả hai thì `Name` tăng. Viết comparator (Go).
2. **Chọn thuật toán cho 5 scenario.** Với mỗi tình huống, chọn thuật toán và giải thích:
   (a) 15 phần tử; (b) 10⁷ số nguyên trong [0, 255]; (c) cần giữ thứ tự bản ghi bằng nhau khi sort theo 1 khóa; (d) RAM cực hạn chế, cần guaranteed O(n log n); (e) mảng 10⁶ phần tử đã *gần như* sorted.
3. **Fix comparator dùng `≤`.** Code sau panic ngẫu nhiên. Tìm và sửa:
   ```go
   sort.Slice(xs, func(i, j int) bool { return xs[i] <= xs[j] })
   ```
4. **Stable multi-pass sort.** Cho `[]Order{Customer, Priority}`. Sort theo `Customer` tăng, trong cùng customer giữ nguyên thứ tự nhập ban đầu (insertion order). Chỉ được dùng các hàm `sort.*`. Làm sao?
5. **Implement `sort.Interface`.** Viết kiểu `ByName []Student` thỏa `sort.Interface` để `sort.Sort(ByName(students))` sort theo `Name`.
6. **Benchmark `sort.Slice` vs `sort.SliceStable`.** Viết hai benchmark đo trên 10⁵ số nguyên ngẫu nhiên dải [0, 100] (nhiều trùng). Dự đoán cái nào nhanh hơn và vì sao.
7. **(Thử thách) NaN-safe sort.** Viết hàm sort `[]float64` đẩy mọi `NaN` về cuối slice, phần còn lại tăng dần.

---

## Lời giải chi tiết

### Bài 1 — Sort theo 2–3 khóa

**Cách tiếp cận:** comparator phức — so khóa 1, bằng thì khóa 2, bằng nữa thì khóa 3.

```go
type Student struct {
	Name  string
	Grade int
	Score int
}

sort.Slice(students, func(i, j int) bool {
	a, b := students[i], students[j]
	if a.Grade != b.Grade {
		return a.Grade < b.Grade // khóa 1: Grade tăng
	}
	if a.Score != b.Score {
		return a.Score > b.Score // khóa 2: Score GIẢM
	}
	return a.Name < b.Name // khóa 3: Name tăng
})
```

Mỗi `if` chỉ "rơi xuống" khóa tiếp theo khi khóa hiện tại bằng nhau — đúng định nghĩa thứ tự từ điển nhiều khóa. **Độ phức tạp:** O(n log n) so sánh, mỗi so sánh O(1) (3 phép so). Không cần stable vì comparator đã định nghĩa thứ tự toàn phần (trừ khi có 2 bản ghi giống hệt 3 khóa — lúc đó thứ tự không quan trọng).

### Bài 2 — Chọn thuật toán cho 5 scenario

| Scenario | Chọn | Lý do |
|----------|------|-------|
| (a) 15 phần tử | **Insertion sort** | n < 20: overhead các thuật toán phức không đáng; insertion thắng hằng số |
| (b) 10⁷ số trong [0, 255] | **Counting sort** | Integer dải nhỏ k = 256 ≪ n → O(n+k) ≈ O(n), phá rào n log n |
| (c) Giữ thứ tự ties | **Merge sort / `sort.SliceStable`** | Cần stable; merge ổn định guaranteed |
| (d) RAM hạn chế, guaranteed | **Heap sort** | O(1) space + O(n log n) worst case đảm bảo (quicksort không guaranteed, merge tốn O(n)) |
| (e) 10⁶ gần như sorted | **Timsort / insertion** | Khai thác run đã sorted → best O(n); trong Go `slices.Sort`/pdqsort cũng nhận diện gần-sorted |

### Bài 3 — Fix comparator dùng `≤`

**Bug:** `xs[i] <= xs[j]` cho `less(a, a) = (a <= a) = true` → vi phạm bất phản xạ của strict weak ordering → undefined behavior → panic ngẫu nhiên.

```go
// SỬA: đổi <= thành <
sort.Slice(xs, func(i, j int) bool { return xs[i] < xs[j] })
```

**Giải thích:** thuật toán sort dựa vào tính bất phản xạ để xác định biên partition. `less(a,a) == true` làm nó tin "a đứng trước chính a" → tính sai vùng → có thể đọc ngoài biên (Go panic) hoặc lặp. Luôn dùng `<`.

### Bài 4 — Stable multi-pass

**Yêu cầu:** sort theo `Customer` tăng, *giữ insertion order* cho cùng customer. "Giữ thứ tự nhập ban đầu cho phần tử bằng nhau" = chính định nghĩa **stable sort**. Chỉ cần **một** lần `sort.SliceStable` theo `Customer`:

```go
sort.SliceStable(orders, func(i, j int) bool {
	return orders[i].Customer < orders[j].Customer
})
// Các order cùng Customer giữ nguyên thứ tự xuất hiện ban đầu (vì stable).
```

Nếu dùng `sort.Slice` (không stable) thì thứ tự nhập trong cùng customer **không đảm bảo** → sai yêu cầu. **Độ phức tạp:** O(n log n), space O(n) (SliceStable cần buffer).

### Bài 5 — Implement `sort.Interface`

```go
type ByName []Student

func (a ByName) Len() int           { return len(a) }
func (a ByName) Less(i, j int) bool { return a[i].Name < a[j].Name } // strict <
func (a ByName) Swap(i, j int)      { a[i], a[j] = a[j], a[i] }

// Dùng:
sort.Sort(ByName(students))       // không stable
// sort.Stable(ByName(students))  // bản stable
```

Ba phương thức là *hợp đồng* mà `sort.Sort` cần. `Less` phải dùng `<` (xem bài 3). Đây là ứng dụng interface kinh điển — `sort.Sort` thao tác qua interface, không biết kiểu cụ thể. **Độ phức tạp:** O(n log n).

### Bài 6 — Benchmark `sort.Slice` vs `sort.SliceStable`

```go
func makeData(n int) []int {
	s := make([]int, n)
	for i := range s {
		s[i] = rand.Intn(100) // dải [0,100): rất nhiều trùng
	}
	return s
}

func BenchmarkSlice(b *testing.B) {
	for i := 0; i < b.N; i++ {
		b.StopTimer(); d := makeData(100000); b.StartTimer()
		sort.Slice(d, func(i, j int) bool { return d[i] < d[j] })
	}
}
func BenchmarkSliceStable(b *testing.B) {
	for i := 0; i < b.N; i++ {
		b.StopTimer(); d := makeData(100000); b.StartTimer()
		sort.SliceStable(d, func(i, j int) bool { return d[i] < d[j] })
	}
}
```

**Dự đoán:** `sort.Slice` (pdqsort) **nhanh hơn** `sort.SliceStable` (merge-based) khoảng 1.2–2×. Lý do: stable cần buffer phụ và làm nhiều phép move hơn để bảo toàn thứ tự. Với 100 giá trị trên 10⁵ phần tử (cực nhiều trùng), pdqsort còn dùng 3-way partition gom phần tử trùng → lợi thế thêm. Chạy `go test -bench=. -benchmem` để xác nhận trên máy thật.

### Bài 7 — NaN-safe sort (thử thách)

**Cách tiếp cận:** comparator coi NaN là "lớn nhất" (đẩy về cuối). Vì mọi so sánh với NaN đều `false`, ta xử lý NaN tường minh:

```go
import "math"

func sortNaNLast(xs []float64) {
	sort.Slice(xs, func(i, j int) bool {
		a, b := xs[i], xs[j]
		aNaN, bNaN := math.IsNaN(a), math.IsNaN(b)
		switch {
		case aNaN && bNaN:
			return false // hai NaN coi như bằng — không cái nào trước
		case aNaN:
			return false // a là NaN → a KHÔNG đứng trước b (đẩy về cuối)
		case bNaN:
			return true // b là NaN → a đứng trước (b về cuối)
		default:
			return a < b // cả hai số thường: tăng dần
		}
	})
}
```

**Giải thích:** ta định nghĩa "NaN > mọi số thường" một cách tường minh nên comparator vẫn là strict weak ordering hợp lệ (hai NaN coi như bằng, không vi phạm bất phản xạ). Kết quả: số thường tăng dần ở đầu, mọi NaN dồn về cuối. **Độ phức tạp:** O(n log n).

---

## Code & Minh họa

- **Code Go inline**: các mục 3, 6, 9 và phần lời giải đã chứa code chạy được (sao chép vào `main.go` / `*_test.go`).
- **[visualization.html](./visualization.html)** — 3 module tương tác:
  1. **Decision tree** — trả lời câu hỏi (n? stable? space? dải key?) → gợi ý thuật toán.
  2. **Hybrid sort animation** — mô phỏng introsort chuyển quicksort → heapsort khi đệ quy sâu, và timsort khai thác run.
  3. **Bảng so sánh tương tác** — click thuật toán xem chi tiết complexity / stable / khi dùng.

---

## Kết thúc Tier 1

Đây là bài cuối của **Tier 1 — Sắp xếp**. Bạn đã đi từ elementary sorts (O(n²)) → divide & conquer (merge/quick) → heap → non-comparison (counting/radix/bucket) → và giờ là **cách dùng thực tế**: hybrid sort, package `sort`/`slices` của Go, và nghệ thuật *chọn đúng công cụ*.

**Tiếp theo:** [Tier 2 — Searching Core](../tier-2-searching-core/index.html) — binary search và các biến thể, dựa nền trên dữ liệu đã sorted mà bạn vừa học cách tạo ra.
