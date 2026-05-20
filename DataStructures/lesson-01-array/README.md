# Lesson 01 — Array (Mảng)

## Mục tiêu học tập

- Hiểu khái niệm **array** và cách nó nằm trong bộ nhớ.
- Phân biệt **static array** và **dynamic array**.
- Biết độ phức tạp của các thao tác cơ bản.
- Biết khi nào nên (và không nên) dùng array.

## Kiến thức tiền đề

- [Lesson 00 — Giới thiệu](../lesson-00-introduction/) (đặc biệt phần Big-O).

## 1. Array là gì?

**Array (mảng)** là một dãy các phần tử **cùng kiểu**, được lưu **liên tiếp trong bộ nhớ**. Mỗi phần tử có một **chỉ số (index)**, thường bắt đầu từ 0.

```
chỉ số:   0    1    2    3    4
mảng:   [10,  20,  30,  40,  50]
địa chỉ: 100  104  108  112  116   (giả sử mỗi int = 4 byte)
```

Vì các phần tử nằm cạnh nhau, máy tính chỉ cần một phép tính `base + i × size` để tới được phần tử thứ `i` — đây là lý do truy cập chỉ tốn `O(1)`.

## 2. Static array vs Dynamic array

| Loại | Kích thước | Ví dụ ngôn ngữ |
| --- | --- | --- |
| Static array | Cố định khi khai báo | `int a[10]` trong C/C++, `int[] a = new int[10]` trong Java |
| Dynamic array | Tự động lớn lên khi đầy | `ArrayList` (Java), `vector` (C++), `list` (Python), `[]` (JavaScript) |

### Dynamic array hoạt động ra sao?

Bên trong, dynamic array vẫn dùng static array với **dung lượng (capacity)** lớn hơn **số phần tử thực (size)**.

- Khi `size < capacity` → thêm vào cuối là `O(1)`.
- Khi `size == capacity` → cấp một mảng mới gấp **đôi** kích thước, copy toàn bộ → `O(n)` cho lần đó.

Trung bình (amortized) thao tác thêm vào cuối là `O(1)`.

## 3. Các thao tác và độ phức tạp

| Thao tác | Mảng tĩnh / mảng động | Ghi chú |
| --- | --- | --- |
| Truy cập `arr[i]` | `O(1)` | Tính địa chỉ trực tiếp |
| Cập nhật `arr[i] = x` | `O(1)` | |
| Tìm kiếm tuần tự | `O(n)` | Tệ nhất duyệt hết |
| Tìm kiếm nhị phân (nếu đã sắp xếp) | `O(log n)` | Yêu cầu đã sắp xếp |
| Thêm vào cuối | `O(1)` amortized | Có thể `O(n)` khi resize |
| Thêm vào đầu / giữa | `O(n)` | Phải dịch chuyển phần tử |
| Xóa ở cuối | `O(1)` | |
| Xóa ở đầu / giữa | `O(n)` | Phải dịch chuyển |

## 4. Ví dụ code (pseudocode)

### Tìm phần tử lớn nhất
```
function max(arr):
    best = arr[0]
    for i from 1 to len(arr)-1:
        if arr[i] > best:
            best = arr[i]
    return best
```
- Thời gian: `O(n)`. Bộ nhớ phụ: `O(1)`.

### Đảo ngược mảng tại chỗ
```
function reverse(arr):
    left = 0
    right = len(arr) - 1
    while left < right:
        swap(arr[left], arr[right])
        left  = left + 1
        right = right - 1
```
- Thời gian: `O(n)`. Bộ nhớ phụ: `O(1)`.

### Tìm kiếm nhị phân (binary search)
```
function binarySearch(arr, target):    # arr đã sắp xếp tăng
    lo, hi = 0, len(arr) - 1
    while lo <= hi:
        mid = (lo + hi) / 2
        if arr[mid] == target: return mid
        if arr[mid] < target:  lo = mid + 1
        else:                  hi = mid - 1
    return -1
```
- Thời gian: `O(log n)`.

## 5. Mảng nhiều chiều

Mảng 2 chiều `arr[m][n]` thực chất là một mảng `m × n` ô liên tiếp, hoặc một mảng các con trỏ tới các hàng (tùy ngôn ngữ).

```
arr[i][j]  ↔  arr_phang[i * n + j]
```

## 6. Ưu / nhược điểm

**Ưu**:
- Truy cập nhanh nhất (`O(1)`).
- Cache-friendly: các phần tử liên tiếp dễ vào CPU cache.
- Đơn giản, ít chi phí bộ nhớ phụ.

**Nhược**:
- Chèn / xóa giữa mảng tốn `O(n)`.
- Mảng tĩnh: kích thước cố định, dễ tràn hoặc lãng phí.
- Dynamic array khi resize tốn `O(n)` (dù trung bình `O(1)`).

## 7. Khi nào dùng?

- Khi cần **truy cập nhanh theo chỉ số**.
- Khi biết trước (hoặc xấp xỉ) số phần tử.
- Khi thao tác chủ yếu là **đọc / cập nhật**, không chèn / xóa nhiều ở giữa.

## Bài tập

1. Viết hàm trả về tổng các phần tử của một mảng. Tính Big-O.
2. Cho mảng đã sắp xếp tăng dần, viết hàm kiểm tra một số có tồn tại không, dùng binary search.
3. Vì sao thêm vào cuối dynamic array trung bình là `O(1)` dù đôi khi phải resize tốn `O(n)`? (gợi ý: tính tổng chi phí cho `n` lần thêm).
4. Cho mảng `[3, 1, 4, 1, 5, 9, 2, 6]`. Mô phỏng từng bước thuật toán binary search tìm `5`.
5. Khi nào nên dùng mảng 2 chiều thay vì mảng 1 chiều? Cho ví dụ.

## Bài tiếp theo

[Lesson 02 — Linked List](../lesson-02-linked-list/)
