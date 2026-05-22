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
