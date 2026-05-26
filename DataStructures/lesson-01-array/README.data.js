// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: DataStructures/lesson-01-array/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 01 — Array (Mảng)

## Mục tiêu học tập

- Hiểu khái niệm **array** và cách nó nằm trong bộ nhớ.
- Phân biệt **static array** và **dynamic array**.
- Biết độ phức tạp của các thao tác cơ bản.
- Biết khi nào nên (và không nên) dùng array.

## Kiến thức tiền đề

- [Lesson 00 — Giới thiệu](../lesson-00-introduction/) (đặc biệt phần Big-O).

## 1. Array là gì?

**Array (mảng)** là một dãy các phần tử **cùng kiểu**, được lưu **liên tiếp trong bộ nhớ**. Mỗi phần tử có một **chỉ số (index)**, thường bắt đầu từ 0.

\`\`\`
chỉ số:   0    1    2    3    4
mảng:   [10,  20,  30,  40,  50]
địa chỉ: 100  104  108  112  116   (giả sử mỗi int = 4 byte)
\`\`\`

Vì các phần tử nằm cạnh nhau, máy tính chỉ cần một phép tính \`base + i × size\` để tới được phần tử thứ \`i\` — đây là lý do truy cập chỉ tốn \`O(1)\`.

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

Truy cập \`arr[7]\` không "chậm" — nó vẫn tính địa chỉ trong \`O(1)\`. Vấn đề là **địa chỉ đó không thuộc về mảng**, dẫn tới đọc rác hoặc crash (xem mục lỗi thường gặp).

### 1.2. ❓ Câu hỏi tự nhiên

- **"Vì sao index bắt đầu từ 0 thay vì 1?"** — Để công thức \`base + i × size\` đơn giản. Nếu index từ 1, công thức phải là \`base + (i-1) × size\` → thêm 1 phép trừ mỗi lần truy cập. Lịch sử từ C, ngày nay thành chuẩn.
- **"Sao Python \`list\` hay JavaScript \`[]\` linh hoạt thế? Cũng là array?"** — Chúng là **dynamic array** (xem mục 2): bên trong vẫn là array, nhưng tự resize khi đầy. Đổi lại, thao tác thêm vào cuối **không phải lúc nào cũng \`O(1)\`** — đôi khi đụng resize.
- **"Có thể mix kiểu trong array không?"** — Trong array thuần (C/Java) thì không, vì kích thước mỗi phần tử phải bằng nhau để công thức \`base + i × size\` đúng. Trong Python list/JS array thì được, nhưng bên trong lưu **con trỏ** tới object — kích thước mỗi ô con trỏ vẫn cố định.

## 2. Static array vs Dynamic array

| Loại | Kích thước | Ví dụ ngôn ngữ |
| --- | --- | --- |
| Static array | Cố định khi khai báo | \`int a[10]\` trong C/C++, \`int[] a = new int[10]\` trong Java |
| Dynamic array | Tự động lớn lên khi đầy | \`ArrayList\` (Java), \`vector\` (C++), \`list\` (Python), \`[]\` (JavaScript) |

### Dynamic array hoạt động ra sao?

Bên trong, dynamic array vẫn dùng static array với **dung lượng (capacity)** lớn hơn **số phần tử thực (size)**.

- Khi \`size < capacity\` → thêm vào cuối là \`O(1)\`.
- Khi \`size == capacity\` → cấp một mảng mới gấp **đôi** kích thước, copy toàn bộ → \`O(n)\` cho lần đó.

Trung bình (amortized) thao tác thêm vào cuối là \`O(1)\`.

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

Tổng chi phí cho 8 lần append = \`1+2+3+1+5+1+1+1 = 15\`. Trung bình \`15 / 8 ≈ 1.9\` thao tác/lần → **hằng số** không phụ thuộc \`n\` → \`O(1)\` amortized.

Tổng quát: sau \`n\` lần append, tổng copy là \`1 + 2 + 4 + ... + n/2 ≈ n\` (tổng cấp số nhân). Cộng \`n\` lần ghi giá trị mới → \`2n\` thao tác cho \`n\` lần append → trung bình \`2 = O(1)\`.

### 2.2. ❓ Câu hỏi tự nhiên

- **"Vì sao nhân đôi mà không nhân 1.5 hoặc cộng thêm 100?"** — Nhân đôi (hay nhân theo hệ số \`k > 1\` bất kỳ) đảm bảo amortized \`O(1)\`. **Cộng hằng số** (vd \`+100\`) → tổng chi phí \`O(n²)\` cho \`n\` lần append → amortized \`O(n)\`, rất tệ. Go dùng hệ số ~2 cho \`cap < 1024\`, ~1.25 cho \`cap\` lớn (cân bằng giữa tốc độ và lãng phí bộ nhớ).
- **"Resize có thể trượt lên Time Limit không?"** — Có. Trung bình \`O(1)\` không có nghĩa **mỗi** lần đều \`O(1)\`. Lần resize có thể tốn \`O(n)\` thật sự. Với realtime/game, đôi khi nên **pre-allocate** \`make([]int, 0, expected_size)\` để né hẳn resize.
- **"Sau khi mảng cũ bị copy sang chỗ mới, mảng cũ đi đâu?"** — Bộ nhớ cũ được trả về cho allocator/GC. Trong C/C++ phải \`free()\` thủ công; Go/Java/Python GC tự dọn.

### 2.3. ⚠ Lỗi thường gặp với dynamic array

| Lỗi | Hậu quả | Cách sửa |
|------|---------|----------|
| Giữ con trỏ/slice tới phần tử bên trong rồi append làm trigger resize | Con trỏ trỏ vào vùng nhớ cũ đã giải phóng → bug khó tìm | Dùng index thay vì con trỏ, hoặc append xong rồi mới lấy lại địa chỉ |
| Không pre-allocate khi biết trước size | Bị resize nhiều lần → tốn copy thừa | \`make([]int, 0, n)\` trong Go, \`arr.reserve(n)\` trong C++ |
| Coi \`O(1)\` amortized = \`O(1)\` đảm bảo cho mọi lần | Latency spike khi resize | Dùng deque hoặc pre-allocate nếu cần latency ổn định |

## 3. Các thao tác và độ phức tạp

| Thao tác | Mảng tĩnh / mảng động | Ghi chú |
| --- | --- | --- |
| Truy cập \`arr[i]\` | \`O(1)\` | Tính địa chỉ trực tiếp |
| Cập nhật \`arr[i] = x\` | \`O(1)\` | |
| Tìm kiếm tuần tự | \`O(n)\` | Tệ nhất duyệt hết |
| Tìm kiếm nhị phân (nếu đã sắp xếp) | \`O(log n)\` | Yêu cầu đã sắp xếp |
| Thêm vào cuối | \`O(1)\` amortized | Có thể \`O(n)\` khi resize |
| Thêm vào đầu / giữa | \`O(n)\` | Phải dịch chuyển phần tử |
| Xóa ở cuối | \`O(1)\` | |
| Xóa ở đầu / giữa | \`O(n)\` | Phải dịch chuyển |

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
- Thời gian: \`O(n)\`. Bộ nhớ phụ: \`O(1)\`.

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
- Thời gian: \`O(n)\`. Bộ nhớ phụ: \`O(1)\`.

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
- Thời gian: \`O(log n)\`.

## 5. Mảng nhiều chiều

Mảng 2 chiều \`arr[m][n]\` thực chất là một mảng \`m × n\` ô liên tiếp, hoặc một mảng các con trỏ tới các hàng (tùy ngôn ngữ).

\`\`\`
arr[i][j]  ↔  arr_phang[i * n + j]
\`\`\`

## 6. Ưu / nhược điểm

**Ưu**:
- Truy cập nhanh nhất (\`O(1)\`).
- Cache-friendly: các phần tử liên tiếp dễ vào CPU cache.
- Đơn giản, ít chi phí bộ nhớ phụ.

**Nhược**:
- Chèn / xóa giữa mảng tốn \`O(n)\`.
- Mảng tĩnh: kích thước cố định, dễ tràn hoặc lãng phí.
- Dynamic array khi resize tốn \`O(n)\` (dù trung bình \`O(1)\`).

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
| Chèn vào giữa rồi tưởng là \`O(1)\` | Thực ra \`O(n)\` vì phải dịch chuyển | Dùng linked list nếu chèn giữa là thao tác chính |
| Khai báo mảng tĩnh quá nhỏ so với input | Tràn, mất dữ liệu hoặc crash | Dùng dynamic array hoặc tính kích thước tối đa rồi cộng buffer |
| Khai báo mảng tĩnh quá lớn "cho chắc" | Lãng phí RAM, tệ hơn là stack overflow nếu khai báo trên stack | Cấp phát trên heap (\`new\`/\`make\`) hoặc dùng dynamic array |

### 7.2. 🔁 Tự kiểm tra

1. Cho \`arr = [5, 2, 8, 1, 9]\`. Sau khi \`append(arr, 7)\`, capacity (giả sử ban đầu = 5) là bao nhiêu? Có copy không?
   <details><summary>Đáp án</summary>\`size = 5, capacity = 5\` → đã đầy → **resize lên 10** (nhân đôi) → copy 5 phần tử cũ + ghi \`7\` → mảng mới \`[5,2,8,1,9,7]\` với \`size=6, capacity=10\`. Lần này tốn \`O(n)\`.</details>
2. Vì sao binary search cần mảng đã sort, mà linear search thì không?
   <details><summary>Đáp án</summary>Binary search dựa vào tính chất: "nếu \`arr[mid] < target\`, mọi phần tử \`≤ mid\` đều \`< target\`" — chỉ đúng khi mảng đã sort. Linear search duyệt tuần tự nên không cần thứ tự gì.</details>
3. Đoạn \`for i := 0; i <= len(arr); i++ { print(arr[i]) }\` có lỗi gì?
   <details><summary>Đáp án</summary>**Off-by-one**: khi \`i = len(arr)\`, \`arr[i]\` nằm ngoài mảng → crash. Sửa thành \`i < len(arr)\`.</details>

### 7.3. 📝 Tóm tắt mục — Array

- Array = dãy phần tử cùng kiểu, **liên tiếp trong bộ nhớ** → truy cập \`arr[i]\` là \`O(1)\` qua công thức \`base + i × size\`.
- Cache-friendly nhờ locality of reference — đọc tuần tự nhanh hơn nhiều cấu trúc khác cùng Big-O.
- **Static array**: kích thước cố định. **Dynamic array**: tự nhân đôi capacity khi đầy → \`O(1)\` amortized cho append cuối.
- **Yếu** ở: chèn/xóa giữa (\`O(n)\`), không co lại tự động (lãng phí), latency spike khi resize.
- Lỗi điển hình: out-of-bounds, off-by-one, slice-aliasing, coi amortized = đảm bảo cứng.

## Bài tập

1. Viết hàm trả về tổng các phần tử của một mảng. Tính Big-O.
2. Cho mảng đã sắp xếp tăng dần, viết hàm kiểm tra một số có tồn tại không, dùng binary search.
3. Vì sao thêm vào cuối dynamic array trung bình là \`O(1)\` dù đôi khi phải resize tốn \`O(n)\`? (gợi ý: tính tổng chi phí cho \`n\` lần thêm).
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

- Thời gian: \`O(n)\` — mỗi phần tử thăm đúng 1 lần.
- Bộ nhớ phụ: \`O(1)\` — chỉ một biến \`s\`.

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

- Thời gian: \`O(log n)\` — mỗi vòng chia đôi khoảng tìm kiếm.
- Chú ý: \`mid := (lo + hi) / 2\` có thể tràn số nguyên với mảng cực lớn — dùng \`lo + (hi-lo)/2\` để an toàn.

### Bài 3 — Vì sao dynamic array \`O(1)\` amortized?

Giả sử dung lượng nhân đôi khi đầy, bắt đầu từ 1.

Sau \`n\` lần thêm:
- Có khoảng \`log₂ n\` lần resize, tốn \`1 + 2 + 4 + ... + n/2 + n ≈ 2n\` thao tác copy.
- Cộng thêm \`n\` thao tác ghi giá trị mới.
- Tổng \`≈ 3n\` thao tác cho \`n\` lần thêm.

→ Trung bình mỗi lần thêm \`3n / n = 3 = O(1)\`. Gọi là **amortized \`O(1)\`**: chi phí thực có thể nhảy lên \`O(n)\` ở một số lần, nhưng tính tổng vẫn rẻ.

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

[Lesson 02 — Linked List](../lesson-02-linked-list/)
`;
