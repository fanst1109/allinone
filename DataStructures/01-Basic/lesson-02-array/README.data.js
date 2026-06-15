// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: DataStructures/01-Basic/lesson-02-array/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 02 — Array (Mảng)

## Mục tiêu học tập

- Hiểu khái niệm **array** và cách nó nằm trong bộ nhớ.
- Phân biệt **static array** và **dynamic array**.
- Biết độ phức tạp của các thao tác cơ bản.
- Biết khi nào nên (và không nên) dùng array.

## Kiến thức tiền đề

- [Lesson 01 — Giới thiệu](../lesson-01-introduction/) (đặc biệt phần Big-O).

## 1. Array là gì?

**Array (mảng)** là một dãy các phần tử **cùng kiểu**, được lưu **liên tiếp trong bộ nhớ**. Mỗi phần tử có một **chỉ số (index)**, thường bắt đầu từ 0.

\`\`\`
chỉ số:   0    1    2    3    4
mảng:   [10,  20,  30,  40,  50]
địa chỉ: 100  104  108  112  116   (giả sử mỗi int = 4 byte)
\`\`\`

Vì các phần tử nằm cạnh nhau, máy tính chỉ cần một phép tính $\\text{base} + i \\times \\text{size}$ để tới được phần tử thứ $i$ — đây là lý do truy cập chỉ tốn $O(1)$.

### 1.1. 💡 Trực giác — vì sao truy cập \`O(1)\` và vì sao cache thích array

Hình dung **dãy nhà phố** cùng kích thước, được đánh số 0, 1, 2, ... từ đầu phố. Bạn ở nhà số 0 (\`base\`). Muốn tới nhà số 7? Chỉ cần đi \`7 × kích_thước_nhà\` mét — đi thẳng tới, không phải hỏi đường từng nhà. Đó là \`arr[7] = base + 7 × size\`.

Lý do **cache-friendly**: CPU không lấy từng ô nhớ một, mà lấy **cả một cache line** (~64 byte) mỗi lần. Với array \`[10, 20, 30, 40, 50]\` cùng 4-byte int → cả mảng 20 byte nằm gọn trong 1 cache line. Đọc \`arr[0]\` xong, đọc \`arr[1]\` đã có sẵn trong cache → cực nhanh.

Walk-through số cụ thể với \`base = 100, size = 4 byte\`:

| Index \`i\` | Địa chỉ tính được | Giá trị |
|-----------|-------------------|---------|
| 0 | 100 + 0×4 = 100 | 10 |
| 2 | 100 + 2×4 = 108 | 30 |
| 4 | 100 + 4×4 = 116 | 50 |
| 7 | 100 + 7×4 = 128 | **out-of-bounds** (mảng chỉ 5 phần tử) |

Truy cập \`arr[7]\` không "chậm" — nó vẫn tính địa chỉ trong $O(1)$. Vấn đề là **địa chỉ đó không thuộc về mảng**, dẫn tới đọc rác hoặc crash (xem mục lỗi thường gặp).

### 1.2. ❓ Câu hỏi tự nhiên

- **"Vì sao index bắt đầu từ 0 thay vì 1?"** — Để công thức $\\text{base} + i \\times \\text{size}$ đơn giản. Nếu index từ 1, công thức phải là $\\text{base} + (i-1) \\times \\text{size}$ → thêm 1 phép trừ mỗi lần truy cập. Lịch sử từ C, ngày nay thành chuẩn.
- **"Sao Python \`list\` hay JavaScript \`[]\` linh hoạt thế? Cũng là array?"** — Chúng là **dynamic array** (xem mục 2): bên trong vẫn là array, nhưng tự resize khi đầy. Đổi lại, thao tác thêm vào cuối **không phải lúc nào cũng $O(1)$** — đôi khi đụng resize.
- **"Có thể mix kiểu trong array không?"** — Trong array thuần (C/Java) thì không, vì kích thước mỗi phần tử phải bằng nhau để công thức $\\text{base} + i \\times \\text{size}$ đúng. Trong Python list/JS array thì được, nhưng bên trong lưu **con trỏ** tới object — kích thước mỗi ô con trỏ vẫn cố định.

## 2. Static array vs Dynamic array

| Loại | Kích thước | Ví dụ ngôn ngữ |
| --- | --- | --- |
| Static array | Cố định khi khai báo | \`int a[10]\` trong C/C++, \`int[] a = new int[10]\` trong Java |
| Dynamic array | Tự động lớn lên khi đầy | \`ArrayList\` (Java), \`vector\` (C++), \`list\` (Python), \`[]\` (JavaScript) |

### Dynamic array hoạt động ra sao?

Bên trong, dynamic array vẫn dùng static array với **dung lượng (capacity)** lớn hơn **số phần tử thực (size)**.

- Khi $\\text{size} < \\text{capacity}$ → thêm vào cuối là $O(1)$.
- Khi $\\text{size} = \\text{capacity}$ → cấp một mảng mới gấp **đôi** kích thước, copy toàn bộ → $O(n)$ cho lần đó.

Trung bình (amortized) thao tác thêm vào cuối là $O(1)$.

### 2.1. 💡 Walk-through số cụ thể — vì sao amortized \`O(1)\`?

Giả sử capacity bắt đầu = 1 và mỗi lần đầy thì **nhân đôi**. Theo dõi 8 lần \`append\` liên tiếp:

| Lần append | size trước | capacity | Có resize? | Chi phí copy | Chi phí ghi mới | Tổng |
|------------|------------|----------|------------|--------------|------------------|------|
| 1 | 0 | 1 | — | 0 | 1 | 1 |
| 2 | 1 | 1 → 2 | ✓ | 1 | 1 | 2 |
| 3 | 2 | 2 → 4 | ✓ | 2 | 1 | 3 |
| 4 | 3 | 4 | — | 0 | 1 | 1 |
| 5 | 4 | 4 → 8 | ✓ | 4 | 1 | 5 |
| 6 | 5 | 8 | — | 0 | 1 | 1 |
| 7 | 6 | 8 | — | 0 | 1 | 1 |
| 8 | 7 | 8 | — | 0 | 1 | 1 |

Tổng chi phí cho 8 lần append = $1+2+3+1+5+1+1+1 = 15$. Trung bình $15 / 8 \\approx 1{,}9$ thao tác/lần → **hằng số** không phụ thuộc $n$ → $O(1)$ amortized.

Tổng quát: sau $n$ lần append, tổng copy là $1 + 2 + 4 + \\ldots + n/2 \\approx n$ (tổng cấp số nhân). Cộng $n$ lần ghi giá trị mới → $2n$ thao tác cho $n$ lần append → trung bình $2 = O(1)$.

### 2.2. ❓ Câu hỏi tự nhiên

- **"Vì sao nhân đôi mà không nhân 1.5 hoặc cộng thêm 100?"** — Nhân đôi (hay nhân theo hệ số $k > 1$ bất kỳ) đảm bảo amortized $O(1)$. **Cộng hằng số** (vd $+100$) → tổng chi phí $O(n^2)$ cho $n$ lần append → amortized $O(n)$, rất tệ. Go dùng hệ số ~2 cho \`cap < 1024\`, ~1.25 cho \`cap\` lớn (cân bằng giữa tốc độ và lãng phí bộ nhớ).
- **"Resize có thể trượt lên Time Limit không?"** — Có. Trung bình $O(1)$ không có nghĩa **mỗi** lần đều $O(1)$. Lần resize có thể tốn $O(n)$ thật sự. Với realtime/game, đôi khi nên **pre-allocate** \`make([]int, 0, expected_size)\` để né hẳn resize.
- **"Sau khi mảng cũ bị copy sang chỗ mới, mảng cũ đi đâu?"** — Bộ nhớ cũ được trả về cho allocator/GC. Trong C/C++ phải \`free()\` thủ công; Go/Java/Python GC tự dọn.

### 2.3. ⚠ Lỗi thường gặp với dynamic array

| Lỗi | Hậu quả | Cách sửa |
|------|---------|----------|
| Giữ con trỏ/slice tới phần tử bên trong rồi append làm trigger resize | Con trỏ trỏ vào vùng nhớ cũ đã giải phóng → bug khó tìm | Dùng index thay vì con trỏ, hoặc append xong rồi mới lấy lại địa chỉ |
| Không pre-allocate khi biết trước size | Bị resize nhiều lần → tốn copy thừa | \`make([]int, 0, n)\` trong Go, \`arr.reserve(n)\` trong C++ |
| Coi $O(1)$ amortized = $O(1)$ đảm bảo cho mọi lần | Latency spike khi resize | Dùng deque hoặc pre-allocate nếu cần latency ổn định |

## 3. Các thao tác và độ phức tạp

| Thao tác | Mảng tĩnh / mảng động | Ghi chú |
| --- | --- | --- |
| Truy cập \`arr[i]\` | $O(1)$ | Tính địa chỉ trực tiếp |
| Cập nhật \`arr[i] = x\` | $O(1)$ | |
| Tìm kiếm tuần tự | $O(n)$ | Tệ nhất duyệt hết |
| Tìm kiếm nhị phân (nếu đã sắp xếp) | $O(\\log n)$ | Yêu cầu đã sắp xếp |
| Thêm vào cuối | $O(1)$ amortized | Có thể $O(n)$ khi resize |
| Thêm vào đầu / giữa | $O(n)$ | Phải dịch chuyển phần tử |
| Xóa ở cuối | $O(1)$ | |
| Xóa ở đầu / giữa | $O(n)$ | Phải dịch chuyển |

## 4. Ví dụ code (pseudocode)

### Tìm phần tử lớn nhất
\`\`\`
function max(arr):
    best = arr[0]
    for i from 1 to len(arr)-1:
        if arr[i] > best:
            best = arr[i]
    return best
\`\`\`
- Thời gian: $O(n)$. Bộ nhớ phụ: $O(1)$.

### Đảo ngược mảng tại chỗ
\`\`\`
function reverse(arr):
    left = 0
    right = len(arr) - 1
    while left < right:
        swap(arr[left], arr[right])
        left  = left + 1
        right = right - 1
\`\`\`
- Thời gian: $O(n)$. Bộ nhớ phụ: $O(1)$.

### Tìm kiếm nhị phân (binary search)
\`\`\`
function binarySearch(arr, target):    # arr đã sắp xếp tăng
    lo, hi = 0, len(arr) - 1
    while lo <= hi:
        mid = (lo + hi) / 2
        if arr[mid] == target: return mid
        if arr[mid] < target:  lo = mid + 1
        else:                  hi = mid - 1
    return -1
\`\`\`
- Thời gian: $O(\\log n)$.

## 5. Mảng nhiều chiều

Mảng 2 chiều \`arr[m][n]\` thực chất là một mảng $m \\times n$ ô liên tiếp, hoặc một mảng các con trỏ tới các hàng (tùy ngôn ngữ).

\`\`\`
arr[i][j]  ↔  arr_phang[i * n + j]
\`\`\`

## 6. Ưu / nhược điểm

**Ưu**:
- Truy cập nhanh nhất ($O(1)$).
- Cache-friendly: các phần tử liên tiếp dễ vào CPU cache.
- Đơn giản, ít chi phí bộ nhớ phụ.

**Nhược**:
- Chèn / xóa giữa mảng tốn $O(n)$.
- Mảng tĩnh: kích thước cố định, dễ tràn hoặc lãng phí.
- Dynamic array khi resize tốn $O(n)$ (dù trung bình $O(1)$).

## 7. Khi nào dùng?

- Khi cần **truy cập nhanh theo chỉ số**.
- Khi biết trước (hoặc xấp xỉ) số phần tử.
- Khi thao tác chủ yếu là **đọc / cập nhật**, không chèn / xóa nhiều ở giữa.

### 7.1. ⚠ Lỗi thường gặp khi dùng array

| Lỗi | Hậu quả | Cách sửa |
|------|---------|----------|
| Truy cập \`arr[i]\` với \`i < 0\` hoặc \`i >= len\` | Crash (Go panic, Java \`ArrayIndexOutOfBoundsException\`, C/C++ là **undefined behavior** đọc rác hoặc segfault) | Kiểm tra \`0 <= i < len(arr)\` trước khi truy cập |
| Off-by-one: viết \`for i := 0; i <= len(arr); i++\` (\`<=\` thay vì \`<\`) | Vòng cuối truy cập \`arr[len]\` → out-of-bounds | Quy ước: \`<\` với \`len\`, \`<=\` với \`len-1\` |
| Quên rằng \`arr[1:5]\` (slice trong Go/Python) **share** mảng nền | Sửa slice làm sửa mảng gốc → bug ngầm | Copy slice: \`dst := make([]int, len(src)); copy(dst, src)\` |
| Chèn vào giữa rồi tưởng là $O(1)$ | Thực ra $O(n)$ vì phải dịch chuyển | Dùng linked list nếu chèn giữa là thao tác chính |
| Khai báo mảng tĩnh quá nhỏ so với input | Tràn, mất dữ liệu hoặc crash | Dùng dynamic array hoặc tính kích thước tối đa rồi cộng buffer |
| Khai báo mảng tĩnh quá lớn "cho chắc" | Lãng phí RAM, tệ hơn là stack overflow nếu khai báo trên stack | Cấp phát trên heap (\`new\`/\`make\`) hoặc dùng dynamic array |

### 7.2. 🔁 Tự kiểm tra

1. Cho \`arr = [5, 2, 8, 1, 9]\`. Sau khi \`append(arr, 7)\`, capacity (giả sử ban đầu = 5) là bao nhiêu? Có copy không?
   <details><summary>Đáp án</summary>\`size = 5, capacity = 5\` → đã đầy → **resize lên 10** (nhân đôi) → copy 5 phần tử cũ + ghi \`7\` → mảng mới \`[5,2,8,1,9,7]\` với \`size=6, capacity=10\`. Lần này tốn $O(n)$.</details>
2. Vì sao binary search cần mảng đã sort, mà linear search thì không?
   <details><summary>Đáp án</summary>Binary search dựa vào tính chất: "nếu \`arr[mid] < target\`, mọi phần tử \`≤ mid\` đều \`< target\`" — chỉ đúng khi mảng đã sort. Linear search duyệt tuần tự nên không cần thứ tự gì.</details>
3. Đoạn \`for i := 0; i <= len(arr); i++ { print(arr[i]) }\` có lỗi gì?
   <details><summary>Đáp án</summary>**Off-by-one**: khi \`i = len(arr)\`, \`arr[i]\` nằm ngoài mảng → crash. Sửa thành \`i < len(arr)\`.</details>

### 7.3. 📝 Tóm tắt mục — Array

- Array = dãy phần tử cùng kiểu, **liên tiếp trong bộ nhớ** → truy cập \`arr[i]\` là $O(1)$ qua công thức $\\text{base} + i \\times \\text{size}$.
- Cache-friendly nhờ locality of reference — đọc tuần tự nhanh hơn nhiều cấu trúc khác cùng Big-O.
- **Static array**: kích thước cố định. **Dynamic array**: tự nhân đôi capacity khi đầy → $O(1)$ amortized cho append cuối.
- **Yếu** ở: chèn/xóa giữa ($O(n)$), không co lại tự động (lãng phí), latency spike khi resize.
- Lỗi điển hình: out-of-bounds, off-by-one, slice-aliasing, coi amortized = đảm bảo cứng.

## 8. Thực hành: dùng trong code thật

> 💡 **§1–§7 dạy lý thuyết array. Mục này là 3 thứ bạn gõ hằng ngày: slice Go thật (và cái bẫy aliasing), two-pointer, sliding window.** Đây là những pattern xuất hiện trong gần như mọi code xử lý mảng/chuỗi. Code Go dưới đây \`go run\` được.

### 8.1. Slice Go = dynamic array — và cái bẫy aliasing chí mạng

§2 nói dynamic array nhân đôi capacity. Trong Go, \`slice\` chính là nó. Xem \`cap\` nhân đôi thật:

\`\`\`go
s := make([]int, 0, 2)
for i := 0; i < 5; i++ {
	s = append(s, i)
	fmt.Printf("len=%d cap=%d\\n", len(s), cap(s))
}
// len=1 cap=2 / len=2 cap=2 / len=3 cap=4 / len=4 cap=4 / len=5 cap=8
\`\`\`

\`cap\` đi 2→4→8: mỗi lần đầy, Go cấp mảng gấp đôi + copy → đó là "amortized $O(1)$" của §2.1 bằng số thật.

> ⚠ **Bẫy aliasing — \`append\` có thể sửa trộm mảng khác (lỗi #1 với slice Go).** Hai slice chia sẻ cùng mảng nền. Nếu một slice còn \`cap\` dư, \`append\` ghi **đè** lên phần slice kia đang dùng:
> \`\`\`go
> a := []int{1, 2, 3, 4}
> b := a[:2]            // b = [1 2], nhưng CHUNG mảng nền với a, cap(b)=4
> b = append(b, 99)     // ghi vào index 2 của mảng nền → a[2] bị đổi thành 99!
> // giờ a = [1 2 99 4] — sửa b mà a hỏng theo
> \`\`\`
> Cách tránh: \`b := append([]int{}, a[:2]...)\` (copy thật), hoặc \`a[:2:2]\` (full-slice expression giới hạn cap → append buộc cấp mảng mới).

### 8.2. Two-pointer: xử lý $O(n)$ thay vì $O(n^2)$

Hai con trỏ chạy trên mảng — pattern cực phổ biến: xóa trùng tại chỗ, two-sum trên mảng đã sort, đảo chuỗi, kiểm tra palindrome.

\`\`\`go
// Xóa phần tử trùng TẠI CHỖ trên mảng đã sort. w = con trỏ ghi, r = con trỏ đọc.
func removeDuplicates(a []int) int {
	if len(a) == 0 { return 0 }
	w := 1
	for r := 1; r < len(a); r++ {
		if a[r] != a[w-1] { // gặp phần tử mới → ghi vào vị trí w
			a[w] = a[r]
			w++
		}
	}
	return w // a[:w] là phần unique
}

// two-sum trên mảng ĐÃ SORT: O(n), không cần hash. Hai đầu kẹp dần vào.
func twoSumSorted(a []int, target int) (int, int) {
	i, j := 0, len(a)-1
	for i < j {
		switch s := a[i] + a[j]; {
		case s == target: return i, j
		case s < target:  i++ // cần lớn hơn → dời trái phải sang
		default:          j-- // cần nhỏ hơn → dời phải trái sang
		}
	}
	return -1, -1
}
\`\`\`

\`twoSumSorted([2,4,7,11], 15)\` → \`(1,3)\` (4+11). Two-pointer biến nhiều bài $O(n^2)$ (hai vòng lặp lồng) thành $O(n)$ khi mảng đã có thứ tự.

### 8.3. Sliding window: tổng/đếm trên cửa sổ trượt $O(n)$

"Tổng lớn nhất của $k$ phần tử liên tiếp", "chuỗi con dài nhất không lặp ký tự" — đừng tính lại từ đầu mỗi cửa sổ ($O(nk)$). Trượt: **vào phải, ra trái**, mỗi bước $O(1)$:

\`\`\`go
func maxSumWindow(a []int, k int) int {
	sum := 0
	for i := 0; i < k; i++ { sum += a[i] } // cửa sổ đầu
	best := sum
	for i := k; i < len(a); i++ {
		sum += a[i] - a[i-k] // thêm phần tử mới, bỏ phần tử rời cửa sổ
		if sum > best { best = sum }
	}
	return best
}
\`\`\`

\`maxSumWindow([2,1,5,1,3,2], 3)\` → \`9\` (5+1+3). Dùng cho: rate limiting (đếm request trong cửa sổ thời gian), trung bình trượt (moving average) trên metrics, nén/streaming.

### 8.4. 🔁 Tự kiểm tra

> 1. \`b := a[:2]; b = append(b, 99)\` — vì sao \`a\` có thể bị đổi?
>    <details><summary>Đáp án</summary>\`b\` chia sẻ mảng nền với \`a\` và còn \`cap\` dư. \`append\` ghi vào index 2 của mảng nền (đang là \`a[2]\`) thay vì cấp mảng mới → \`a[2]\` bị ghi đè. Tránh bằng copy hoặc full-slice \`a[:2:2]\`.</details>
> 2. Vì sao \`twoSumSorted\` chạy $O(n)$ còn two-sum bằng 2 vòng lặp là $O(n^2)$?
>    <details><summary>Đáp án</summary>Mảng đã sort → mỗi bước loại được 1 đầu: tổng nhỏ quá thì \`i++\`, lớn quá thì \`j--\`. Hai con trỏ chỉ đi tổng cộng $n$ bước. Hai vòng lặp lồng thử mọi cặp = $n^2$.</details>
> 3. Sliding window: vì sao cập nhật \`sum += a[i] - a[i-k]\` mà không cộng lại cả cửa sổ?
>    <details><summary>Đáp án</summary>Cửa sổ mới chỉ khác cửa sổ cũ ở 2 phần tử: thêm \`a[i]\` (vào bên phải), bỏ \`a[i-k]\` (rời bên trái). Tận dụng tổng cũ → mỗi bước $O(1)$ thay vì $O(k)$.</details>

### 8.5. 📝 Tóm tắt mục 8

- **Slice Go** = dynamic array; \`cap\` nhân đôi (amortized $O(1)$). Bẫy **aliasing**: \`append\` có thể sửa trộm slice chung mảng nền → copy hoặc \`a[:n:n]\`.
- **Two-pointer**: $O(n)$ cho xóa-trùng tại chỗ, two-sum-sorted, đảo, palindrome — thay vòng lồng $O(n^2)$.
- **Sliding window**: tổng/đếm cửa sổ trượt, vào-phải-ra-trái $O(1)$/bước; dùng cho rate-limit, moving average.

## Bài tập

1. Viết hàm trả về tổng các phần tử của một mảng. Tính Big-O.
2. Cho mảng đã sắp xếp tăng dần, viết hàm kiểm tra một số có tồn tại không, dùng binary search.
3. Vì sao thêm vào cuối dynamic array trung bình là $O(1)$ dù đôi khi phải resize tốn $O(n)$? (gợi ý: tính tổng chi phí cho $n$ lần thêm).
4. Cho mảng \`[3, 1, 4, 1, 5, 9, 2, 6]\`. Mô phỏng từng bước thuật toán binary search tìm \`5\`.
5. Khi nào nên dùng mảng 2 chiều thay vì mảng 1 chiều? Cho ví dụ.

## Lời giải chi tiết

### Bài 1 — Tổng các phần tử

Duyệt một lần qua mảng, cộng dồn vào biến \`s\`.

\`\`\`go
func sum(arr []int) int {
    s := 0
    for _, v := range arr {
        s += v
    }
    return s
}
\`\`\`

- Thời gian: $O(n)$ — mỗi phần tử thăm đúng 1 lần.
- Bộ nhớ phụ: $O(1)$ — chỉ một biến \`s\`.

### Bài 2 — Binary search

Yêu cầu mảng **đã sắp xếp**. Duy trì khoảng \`[lo, hi]\`, mỗi bước thu hẹp một nửa.

\`\`\`go
func binarySearch(arr []int, target int) int {
    lo, hi := 0, len(arr)-1
    for lo <= hi {
        mid := (lo + hi) / 2
        switch {
        case arr[mid] == target: return mid
        case arr[mid] < target:  lo = mid + 1
        default:                  hi = mid - 1
        }
    }
    return -1
}
\`\`\`

- Thời gian: $O(\\log n)$ — mỗi vòng chia đôi khoảng tìm kiếm.
- Chú ý: \`mid := (lo + hi) / 2\` có thể tràn số nguyên với mảng cực lớn — dùng \`lo + (hi-lo)/2\` để an toàn.

### Bài 3 — Vì sao dynamic array \`O(1)\` amortized?

Giả sử dung lượng nhân đôi khi đầy, bắt đầu từ 1.

Sau $n$ lần thêm:
- Có khoảng $\\log_2 n$ lần resize, tốn $1 + 2 + 4 + \\ldots + n/2 + n \\approx 2n$ thao tác copy.
- Cộng thêm $n$ thao tác ghi giá trị mới.
- Tổng $\\approx 3n$ thao tác cho $n$ lần thêm.

→ Trung bình mỗi lần thêm $3n / n = 3 = O(1)$. Gọi là **amortized $O(1)$**: chi phí thực có thể nhảy lên $O(n)$ ở một số lần, nhưng tính tổng vẫn rẻ.

### Bài 4 — Mô phỏng binary search

Mảng đề bài \`[3, 1, 4, 1, 5, 9, 2, 6]\` **chưa sắp xếp** — binary search yêu cầu sắp xếp trước. Sau khi sort tăng dần: \`[1, 1, 2, 3, 4, 5, 6, 9]\` (chỉ số 0..7).

Tìm \`5\`:
- \`lo=0, hi=7, mid=3\`, \`arr[3]=3 < 5\` → \`lo = 4\`.
- \`lo=4, hi=7, mid=5\`, \`arr[5]=5 == 5\` → trả về chỉ số 5.

→ Tìm thấy sau 2 vòng so sánh.

### Bài 5 — Mảng 2D vs 1D

Dùng **mảng 2D** khi dữ liệu có cấu trúc dạng lưới / ma trận tự nhiên:
- Ma trận toán học (nhân ma trận, đại số tuyến tính).
- Bàn cờ vua / cờ caro (8×8).
- Pixel của ảnh (\`height × width\`).
- Bảng tính (Excel-like).

Mảng 1D vẫn dùng được (bằng cách \`arr[i*cols + j]\`), nhưng mảng 2D giúp code **trong sáng hơn**.

## Code & Minh họa

- [solutions.go](./solutions.go) — Go solutions của 5 bài + thử nghiệm amortized.
- [visualization.html](./visualization.html) — minh họa thao tác array (truy cập, chèn/xóa giữa với hiệu ứng dịch chuyển, binary search từng bước).

## Bài tiếp theo

[Lesson 03 — Linked List](../lesson-03-linked-list/)
`;
