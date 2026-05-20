# Lesson 08 — Heap & Priority Queue

## Mục tiêu học tập

- Hiểu khái niệm **heap** (min-heap, max-heap) và tính chất.
- Biết cách biểu diễn heap bằng **mảng**.
- Cài đặt `insert`, `extractMin/Max`, `heapify`.
- Hiểu **priority queue** và ứng dụng trong sắp xếp / thuật toán đồ thị.

## Kiến thức tiền đề

- [Lesson 06 — Tree](../lesson-06-tree/) (cây nhị phân, complete binary tree).
- [Lesson 04 — Queue](../lesson-04-queue/) (priority queue intro).

## 1. Heap là gì?

**Heap** là một **complete binary tree** thỏa **tính chất heap**:

- **Min-heap**: giá trị mỗi node ≤ giá trị các con → root là **nhỏ nhất**.
- **Max-heap**: giá trị mỗi node ≥ giá trị các con → root là **lớn nhất**.

```
Min-heap:                Max-heap:
       1                      9
      / \                    / \
     3   2                  7   6
    / \                    / \
   5   4                  3   5
```

**Heap không phải BST**: heap chỉ ràng buộc cha-con, không ràng buộc trái-phải.

## 2. Biểu diễn bằng mảng

Vì heap là **complete binary tree**, ta có thể lưu nó bằng mảng, không cần con trỏ.

Với node tại chỉ số `i` (0-based):
- **Cha**: `(i - 1) / 2`
- **Con trái**: `2i + 1`
- **Con phải**: `2i + 2`

```
mảng:   [1, 3, 2, 5, 4]
chỉ số:  0  1  2  3  4

cây:        1 (0)
           / \
       (1)3   2(2)
         / \
     (3)5   4(4)
```

→ Rất tiết kiệm bộ nhớ, cache-friendly.

## 3. Thao tác cơ bản (min-heap)

### 3.1. Insert (`O(log n)`)

1. Thêm phần tử vào cuối mảng.
2. **Sift up**: nếu nhỏ hơn cha, đổi chỗ; lặp lại tới khi đúng vị trí.

```
function insert(heap, x):
    heap.append(x)
    i = len(heap) - 1
    while i > 0 and heap[(i-1)/2] > heap[i]:
        swap(heap[i], heap[(i-1)/2])
        i = (i - 1) / 2
```

### 3.2. Extract min (`O(log n)`)

1. Kết quả = `heap[0]`.
2. Đưa phần tử cuối lên vị trí 0.
3. **Sift down**: đổi chỗ với con nhỏ hơn cho tới khi đúng vị trí.

```
function extractMin(heap):
    min = heap[0]
    heap[0] = heap.pop()        # lấy phần tử cuối lên đầu
    siftDown(heap, 0)
    return min

function siftDown(heap, i):
    n = len(heap)
    while true:
        l = 2*i + 1; r = 2*i + 2; smallest = i
        if l < n and heap[l] < heap[smallest]: smallest = l
        if r < n and heap[r] < heap[smallest]: smallest = r
        if smallest == i: return
        swap(heap[i], heap[smallest])
        i = smallest
```

### 3.3. Peek min (`O(1)`)

Trả về `heap[0]`.

### 3.4. Build heap từ mảng (`O(n)`)

Bất ngờ: xây heap từ mảng có sẵn chỉ tốn `O(n)`, không phải `O(n log n)`.

```
function buildHeap(arr):
    for i from n/2 - 1 down to 0:
        siftDown(arr, i)
```

## 4. Độ phức tạp

| Thao tác | Big-O |
| --- | --- |
| `peek` | `O(1)` |
| `insert` | `O(log n)` |
| `extractMin/Max` | `O(log n)` |
| `buildHeap` từ mảng `n` phần tử | `O(n)` |
| Tìm phần tử bất kỳ | `O(n)` (heap không hỗ trợ tìm tốt) |

## 5. Priority Queue

**Priority Queue (PQ)** là ADT trong đó mỗi phần tử có **độ ưu tiên**, lấy ra theo ưu tiên cao nhất.

Cài đặt phổ biến nhất: **dùng heap**.
- `enqueue` ≡ `insert`.
- `dequeue` ≡ `extractMin` (hoặc max).

Ngôn ngữ:
- Java: `PriorityQueue` (min-heap mặc định).
- Python: `heapq` (min-heap).
- C++: `priority_queue` (max-heap mặc định).

## 6. Ứng dụng

### 6.1. Heap sort
Build heap (`O(n)`), rồi extract `n` lần → mảng sắp xếp. Tổng `O(n log n)`. Sắp xếp tại chỗ, không cần bộ nhớ phụ.

### 6.2. Top-K
Tìm K phần tử lớn nhất trong dãy `n` phần tử bằng min-heap kích thước K → `O(n log K)`.

### 6.3. Thuật toán đồ thị
- **Dijkstra** (đường đi ngắn nhất).
- **Prim** (cây khung nhỏ nhất).
- Cả hai đều dùng priority queue để chọn cạnh / đỉnh tiếp theo.

### 6.4. Lập lịch (scheduler)
Job có deadline / priority — lấy job ưu tiên cao nhất tiếp theo.

### 6.5. Median streaming
Duy trì median của dòng số bằng **hai heap** (max-heap chứa nửa nhỏ, min-heap chứa nửa lớn).

## Bài tập

1. Cho mảng `[4, 1, 7, 3, 2, 6, 5]`, vẽ min-heap kết quả khi chèn lần lượt.
2. Cài đặt min-heap với `insert`, `extractMin`, `peek`.
3. Sắp xếp mảng bằng heap sort, tự cài đặt.
4. Cho dòng số đến liên tiếp, viết cấu trúc trả về **median** sau mỗi lần thêm trong `O(log n)`.
5. Vì sao `buildHeap` chỉ tốn `O(n)`? (Gợi ý: tính tổng `siftDown` theo độ cao node.)

## Lời giải chi tiết

### Bài 1 — Chèn `[4, 1, 7, 3, 2, 6, 5]` vào min-heap rỗng
Mảng sau từng lần (in-place):
```
4
1 4              (1<4 → sift up đổi chỗ)
1 4 7
1 3 7 4          (3<4 → sift up)
1 2 7 4 3        (2<3 → sift up)
1 2 6 4 3 7      (6<7 → không cần)
1 2 5 4 3 7 6    (5<6 → sift up)
```
Heap cuối: `[1, 2, 5, 4, 3, 7, 6]`.

### Bài 2 — Min-heap với insert/extractMin/peek
```go
type MinHeap struct{ data []int }
func (h *MinHeap) Peek() int { return h.data[0] }
func (h *MinHeap) Insert(x int) {
    h.data = append(h.data, x)
    for i := len(h.data) - 1; i > 0; {
        p := (i - 1) / 2
        if h.data[p] <= h.data[i] { break }
        h.data[p], h.data[i] = h.data[i], h.data[p]
        i = p
    }
}
func (h *MinHeap) ExtractMin() int {
    min := h.data[0]
    h.data[0] = h.data[len(h.data)-1]
    h.data = h.data[:len(h.data)-1]
    siftDown(h.data, 0)
    return min
}
```
`Insert`, `ExtractMin`: `O(log n)`.

### Bài 3 — Heap sort
Xây max-heap từ mảng, lần lượt swap root xuống cuối, giảm size, sift down.
```go
func heapSort(arr []int) {
    n := len(arr)
    for i := n/2 - 1; i >= 0; i-- { siftDownMax(arr, i, n) }  // buildHeap
    for end := n - 1; end > 0; end-- {
        arr[0], arr[end] = arr[end], arr[0]
        siftDownMax(arr, 0, end)
    }
}
```
`O(n log n)`, sắp xếp tại chỗ.

### Bài 4 — Median streaming
Dùng **hai heap**:
- Max-heap `lo` chứa nửa nhỏ.
- Min-heap `hi` chứa nửa lớn.
- Giữ `|lo| - |hi| ∈ {0, 1}`.

Median = `lo.top()` nếu lẻ; `(lo.top() + hi.top()) / 2` nếu chẵn.

Mỗi insert: `O(log n)`. Lấy median: `O(1)`.

### Bài 5 — Vì sao `buildHeap` chỉ `O(n)`?
Phân tích: ở chiều cao `h`, có khoảng `n/2^(h+1)` node, mỗi node `siftDown` tốn `O(h)`.

Tổng chi phí:
```
T(n) = Σ (h từ 0 tới log n) (n / 2^(h+1)) · h
     = n · Σ h / 2^(h+1)
```
Tổng `Σ h / 2^h` hội tụ về **hằng số** (xấp xỉ 2) → `T(n) = O(n)`.

Trực giác: phần lớn node nằm gần đáy, chỉ phải sift xuống rất ít tầng.

## Code

- [solutions.go](./solutions.go) — min-heap đầy đủ + heap sort + median streaming.

## Bài tiếp theo

[Lesson 09 — Balanced Trees](../lesson-09-balanced-trees/)
