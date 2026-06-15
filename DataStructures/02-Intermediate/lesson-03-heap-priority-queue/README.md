# Lesson 03 — Heap & Priority Queue

## Mục tiêu học tập

- Hiểu khái niệm **heap** (min-heap, max-heap) và tính chất.
- Biết cách biểu diễn heap bằng **mảng**.
- Cài đặt `insert`, `extractMin/Max`, `heapify`.
- Hiểu **priority queue** và ứng dụng trong sắp xếp / thuật toán đồ thị.

## Kiến thức tiền đề

- [Lesson 01 — Tree](../lesson-01-tree/) (cây nhị phân, complete binary tree).
- [Lesson 05 — Queue](../../01-Basic/lesson-05-queue/) (priority queue intro).

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

Với node tại chỉ số $i$ (0-based):
- **Cha**: $(i - 1) / 2$
- **Con trái**: $2i + 1$
- **Con phải**: $2i + 2$

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

### 2.1. 💡 Trực giác — vì sao công thức `2i+1`, `2i+2` đúng

Đây là cách 2 trong [lesson 01 — Tổ chức bộ nhớ](../lesson-01-tree/#8-tổ-chức-bộ-nhớ-cách-1--pointer-based). Ý tưởng cốt lõi: **đánh số BFS** cho mọi node của một cây nhị phân đầy đặt, rồi chính cái index ấy đã mã hoá "vị trí trong cây" — không cần thêm pointer.

Quan sát bằng 1-based (đẹp nhất, để hiểu trước):

```
       1                level 0
      / \
     2   3              level 1
    / \ / \
   4  5 6  7            level 2
```

- Level 0: chỉ có index 1 ($2^0$ node, bắt đầu từ $2^0$).
- Level 1: index 2, 3 ($2^1$ node, bắt đầu từ $2^1$).
- Level 2: index 4, 5, 6, 7 ($2^2$ node, bắt đầu từ $2^2$).

Hai con của node $i$ là $2i$ và $2i+1$. Nhìn ở dạng **bit nhị phân**:

```
i = 2      = 0b10        left(2)  = 0b100 = 4    ← thêm bit '0' vào cuối
                         right(2) = 0b101 = 5    ← thêm bit '1' vào cuối
i = 5      = 0b101       parent   = 0b10  = 2    ← bỏ bit cuối cùng
```

**Insight bit-level**: index nhị phân của node = "đường đi từ root", trong đó bit `0` = rẽ trái, bit `1` = rẽ phải (bỏ qua bit dẫn đầu = root). Ví dụ `i = 5 = 0b101`: bỏ bit dẫn đầu → `01` → từ root rẽ trái rồi rẽ phải → đúng vị trí node 5 trong cây trên.

Khi chuyển sang **0-based** (chuẩn của Go, C, Python), shift toàn bộ xuống 1: $parent(i) = (i-1)/2$, $left(i) = 2i+1$, $right(i) = 2i+2$. Cùng nguyên lý, chỉ lệch một đơn vị.

### 2.2. Byte-layout trong RAM

Với heap `[1, 3, 2, 5, 4]` kiểu `int32` (4 byte/phần tử), mảng nằm **liên tiếp** trong RAM. Giả sử mảng bắt đầu ở địa chỉ `0x1000`:

```
địa chỉ:  0x1000      0x1004      0x1008      0x100C      0x1010
         ┌──────────┬──────────┬──────────┬──────────┬──────────┐
         │   01     │   03     │   02     │   05     │   04     │  giá trị
         │ idx 0    │ idx 1    │ idx 2    │ idx 3    │ idx 4    │
         └──────────┴──────────┴──────────┴──────────┴──────────┘
           4 byte     4 byte     4 byte     4 byte     4 byte
```

20 byte tổng cộng. **Zero metadata**: không pointer, không padding (vì `int32` tự align 4-byte).

Đi từ idx 0 xuống con trái idx 1: chỉ là `addr + 4 byte`. Đi xuống tầng dưới (idx 3): `addr + 12 byte`. CPU **prefetcher** đã kéo sẵn cả block 64 byte vào L1 cache → mọi truy cập đều cache hit.

So với pointer-based (lesson 6, cách 1):

| Tiêu chí | Pointer-based (cây 5 node) | Array-based (cây 5 node) |
|----------|----------------------------:|--------------------------:|
| Bộ nhớ | 120 byte | **20 byte** |
| Tỉ lệ overhead | 83% | **0%** |
| Cache miss khi đi xuống | Cao (địa chỉ rời rạc) | Rất thấp (liên tiếp) |
| Chèn/xoá ở giữa | $O(1)$ nếu có pointer cha | $O(n)$ (phải dịch mảng) |

### 2.3. Vì sao cách này CHỈ phù hợp với complete binary tree

Heap luôn complete → mảng đặc, không có lỗ hổng. Nếu áp lên cây **không complete** (vd cây skewed lệch hẳn 1 bên), phải để slot trống → tốn rất nhiều bộ nhớ.

Ví dụ cây "chuỗi" 4 node (chỉ rẽ phải):

```
1 → null    null     null    null  null  null  3 → null  null   ...
```

Wait — để node `1` ở idx 0, con phải ở idx 2, con phải tiếp ở idx 6, idx 14, ... → cần **mảng dài $2^h - 1$** cho cây độ sâu $h$. Với $h = 30$, mảng cần ~1 tỉ slot dù chỉ có 30 node thật. Khi đó pointer-based thắng tuyệt đối.

→ **Quy tắc**: array-based dùng được khi tree gần đầy (heap, segment tree dạng đầy, một số dạng BST cân bằng "đông đúc"). Cây thưa hoặc dynamic không đoán được hình dạng → dùng pointer-based.

### 2.4. ❓ Câu hỏi tự nhiên

- **"Sao Go `heap.Interface` không buộc dùng mảng?"** — Thực ra có: nó yêu cầu các method `Len/Less/Swap/Push/Pop` thao tác trên một backing slice. Slice trong Go = mảng động → chính là array-based.
- **"1-based hay 0-based tốt hơn?"** — 0-based đồng nhất với ngôn ngữ; 1-based công thức gọn hơn ($2i$, $2i+1$ thay vì $2i+1$, $2i+2$). Sách giáo khoa thường 1-based; code thực tế 0-based. Bài này dùng 0-based.
- **"Nếu mảng đầy, làm sao chèn thêm?"** — Resize giống slice/`ArrayList`: cấp mảng mới gấp đôi, copy sang. Amortized $O(1)$ cho mỗi `append`.
- **"Sao không thay `/2` bằng `>> 1`?"** — Trình biên dịch hiện đại đã làm thay, không cần tay. Nhưng nếu phải cài trong C/C++ tốc độ tới hạn, viết `i >> 1` rõ ý đồ hơn.
- **"Có node nào KHÔNG có con không? Làm sao biết?"** — So sánh `left(i) = 2i+1` với `n = len(heap)`. Nếu `2i+1 >= n` → không có con. Trong heap, các node từ index `n/2` trở đi đều là leaf (không có con).

### 2.5. ⚠ Lỗi thường gặp

| Lỗi | Hậu quả | Cách sửa |
|------|---------|----------|
| Nhầm 1-based với 0-based (vd `left = 2i` trong code 0-based) | Truy cập sai node, heap property vỡ | Cố định 1 convention từ đầu file |
| `parent(0)` trả về index âm hoặc 0 | Loop sift-up sai khi đến root | Check `i > 0` trước khi tính parent |
| Quên check `right < n` trước khi so sánh | Truy cập out-of-bounds | `if r < n && heap[r] < heap[smallest]` |
| Áp array-based cho cây thưa | Mảng phình theo $2^h$ slot trống | Dùng pointer-based |
| Resize mảng nhưng quên copy hết | Heap rỗng ngẫu nhiên | Dùng slice/`vector` thay vì mảng cố định |

### 2.6. 🔁 Tự kiểm tra

1. Heap `[10, 20, 15, 30, 40, 25, 50]` (0-based). Cha của idx 5 là ai? Con trái của idx 2 là ai?
   <details><summary>Đáp án</summary>Cha của idx 5: $(5-1)/2 = 2$ → giá trị `15`. Con trái của idx 2: $2\cdot 2+1 = 5$ → giá trị `25`.</details>
2. Cây nhị phân 1000 node nhưng skewed (mỗi node chỉ rẽ phải). Array-based 0-based tốn bao nhiêu slot?
   <details><summary>Đáp án</summary>Node sâu nhất ở idx $2^{999} - 1 \approx 10^{300}$. Không khả thi. Đây là lý do array-based chỉ hợp với complete tree.</details>
3. Trong heap $n$ phần tử (0-based), số leaf chính xác là bao nhiêu?
   <details><summary>Đáp án</summary>Các index từ $\lfloor n/2 \rfloor$ tới $n-1$ là leaf → có $\lceil n/2 \rceil$ leaf. Đây là lý do `buildHeap` chỉ chạy `siftDown` từ $n/2 - 1$ xuống (các node trước đó không phải leaf).</details>

### 2.7. 📝 Tóm tắt mục 2

- Heap = complete binary tree → lưu bằng **mảng liên tiếp**, không pointer.
- Công thức 0-based: $parent = (i-1)/2$, $left = 2i+1$, $right = 2i+2$.
- Bản chất bit: thêm/bỏ bit cuối của index = đi xuống/lên 1 tầng.
- Tiết kiệm bộ nhớ tối đa (0% overhead), cache-friendly tối đa.
- **Chỉ phù hợp khi cây gần đầy**. Cây thưa/skewed → quay về pointer-based (lesson 6).

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

Bất ngờ: xây heap từ mảng có sẵn chỉ tốn $O(n)$, không phải $O(n \log n)$.

```
function buildHeap(arr):
    for i from n/2 - 1 down to 0:
        siftDown(arr, i)
```

## 4. Độ phức tạp

| Thao tác | Big-O |
| --- | --- |
| `peek` | $O(1)$ |
| `insert` | $O(\log n)$ |
| `extractMin/Max` | $O(\log n)$ |
| `buildHeap` từ mảng $n$ phần tử | $O(n)$ |
| Tìm phần tử bất kỳ | $O(n)$ (heap không hỗ trợ tìm tốt) |

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
Build heap ($O(n)$), rồi extract $n$ lần → mảng sắp xếp. Tổng $O(n \log n)$. Sắp xếp tại chỗ, không cần bộ nhớ phụ.

### 6.2. Top-K
Tìm K phần tử lớn nhất trong dãy $n$ phần tử bằng min-heap kích thước K → $O(n \log K)$.

**💡 Trực giác — vì sao dùng MIN-heap để tìm LỚN nhất?** Nghe ngược đời, nhưng đây là mẹo: giữ một "phòng VIP" sức chứa đúng K. Người gác cửa đứng ngay cửa và là **người nhỏ nhất trong phòng** (= gốc min-heap). Có ứng viên mới: nếu nó còn **nhỏ hơn cả người gác cửa** → khỏi vào (chắc chắn không thuộc top-K); nếu **lớn hơn** → đá người gác cửa ra, cho nó vào, rồi tìm người gác cửa mới. Cuối cùng phòng VIP chứa đúng K người lớn nhất.

**Walk-through** — tìm **Top-3** trong `[4, 1, 7, 3, 9, 2, 8]` bằng min-heap size 3:

| Phần tử | So với gốc (min) | Hành động | Heap (sau) |
|--------:|------------------|-----------|------------|
| `4` | — | heap chưa đầy → thêm | `[4]` |
| `1` | — | chưa đầy → thêm | `[1, 4]` |
| `7` | — | chưa đầy → thêm | `[1, 4, 7]` |
| `3` | `3 > 1`? Có | đầy rồi: `3 > min(1)` → bỏ `1`, thêm `3` | `[3, 4, 7]` |
| `9` | `9 > 3`? Có | bỏ `3`, thêm `9` | `[4, 9, 7]` |
| `2` | `2 > 4`? Không | bỏ qua (quá nhỏ) | `[4, 9, 7]` |
| `8` | `8 > 4`? Có | bỏ `4`, thêm `8` | `[7, 9, 8]` |

Kết quả: `{7, 8, 9}` — đúng 3 phần tử lớn nhất. Heap luôn chỉ giữ **3** phần tử → bộ nhớ $O(K)$, thời gian $O(n \log K)$. So với "sắp xếp cả mảng rồi lấy 3 cuối" ($O(n \log n)$), cách này thắng rõ khi $K \ll n$ (vd top-10 trong 1 tỉ log). Đây là cách `heapq.nlargest` (Python) và nhiều hệ thống xếp hạng/streaming hoạt động.

### 6.3. Thuật toán đồ thị
- **Dijkstra** (đường đi ngắn nhất).
- **Prim** (cây khung nhỏ nhất).
- Cả hai đều dùng priority queue để chọn cạnh / đỉnh tiếp theo.

### 6.4. Lập lịch (scheduler)
Job có deadline / priority — lấy job ưu tiên cao nhất tiếp theo.

### 6.5. Median streaming
Duy trì median của dòng số bằng **hai heap** (max-heap chứa nửa nhỏ, min-heap chứa nửa lớn).

## 7. Thực hành: dùng trong code thật

> 💡 **Mục 6 nói heap "dùng ở đâu". Mục này là code bạn thật sự gõ.** Trong Go đời thực bạn **gần như không bao giờ** tự viết sift-up/sift-down — bạn implement interface `container/heap` rồi để thư viện chuẩn lo phần khó. Dưới đây là 5 mini-project chạy được (`go run`), mỗi cái là một bài toán có thật trong backend/hệ thống.

### 7.1. `container/heap` — boilerplate ai cũng cần thuộc

Go stdlib **không** cho bạn một kiểu `Heap` sẵn dùng. Nó cho một **interface** — bạn khai báo dữ liệu + 5 method, thư viện cung cấp thuật toán. Đây là mẫu tối thiểu cho min-heap số nguyên — copy là chạy:

```go
package main

import (
	"container/heap"
	"fmt"
)

// IntHeap là min-heap các int. Backing store là slice (đúng "array-based" §2).
type IntHeap []int

func (h IntHeap) Len() int            { return len(h) }
func (h IntHeap) Less(i, j int) bool  { return h[i] < h[j] } // '<' = min-heap. Đổi thành '>' ra max-heap.
func (h IntHeap) Swap(i, j int)       { h[i], h[j] = h[j], h[i] }
func (h *IntHeap) Push(x any)         { *h = append(*h, x.(int)) }       // thêm vào CUỐI slice
func (h *IntHeap) Pop() any {                                            // lấy từ CUỐI slice
	old := *h
	n := len(old)
	x := old[n-1]
	*h = old[:n-1]
	return x
}

func main() {
	h := &IntHeap{5, 2, 8, 1}
	heap.Init(h) // build-heap O(n)
	heap.Push(h, 3)
	for h.Len() > 0 {
		fmt.Print(heap.Pop(h), " ") // 1 2 3 5 8 — tăng dần
	}
}
```

> ⚠ **Bẫy #1 — `Push`/`Pop` của BẠN không phải hàm bạn gọi.** Bạn cài `(*IntHeap).Push/Pop` thao tác **cuối slice** (rẻ), nhưng trong code bạn gọi `heap.Push(h, x)` / `heap.Pop(h)` (package-level). Package mới là phần sift-up/sift-down để giữ heap property. Gọi nhầm `h.Pop()` (method của bạn) → lấy bừa phần tử cuối, **không** phải min. Đây là lỗi #1 của người mới dùng `container/heap`.

> ❓ **"Sao `Push`/`Pop` nhận `any` (interface{})?"** Vì `container/heap` viết trước generics (Go 1.18). Muốn type-safe + đỡ boilerplate, có thể dùng generic wrapper hoặc thư viện ngoài, nhưng `container/heap` vẫn là chuẩn mọi codebase Go gặp.

### 7.2. Mini-project A — Task scheduler theo độ ưu tiên

Bài toán có thật: một worker xử lý job, job nào **priority cao** chạy trước (job thường < job gấp < job khẩn). Đây là PQ thuần (§5):

```go
type Job struct {
	Name     string
	Priority int // càng lớn càng ưu tiên
}
type JobQueue []*Job

func (q JobQueue) Len() int           { return len(q) }
func (q JobQueue) Less(i, j int) bool { return q[i].Priority > q[j].Priority } // '>' = max theo priority
func (q JobQueue) Swap(i, j int)      { q[i], q[j] = q[j], q[i] }
func (q *JobQueue) Push(x any)        { *q = append(*q, x.(*Job)) }
func (q *JobQueue) Pop() any          { old := *q; n := len(old); x := old[n-1]; *q = old[:n-1]; return x }

func main() {
	q := &JobQueue{}
	heap.Init(q)
	heap.Push(q, &Job{"gửi-email", 1})
	heap.Push(q, &Job{"reset-mật-khẩu", 5}) // khẩn
	heap.Push(q, &Job{"tạo-báo-cáo", 2})
	for q.Len() > 0 {
		j := heap.Pop(q).(*Job)
		fmt.Printf("Chạy %s (priority %d)\n", j.Name, j.Priority)
	}
	// reset-mật-khẩu (5) → tạo-báo-cáo (2) → gửi-email (1)
}
```

So với "duyệt cả slice tìm max mỗi lần lấy job" ($O(n)$/lần): heap cho `Push`/`Pop` đều $O(\log n)$. Với hàng nghìn job đến/đi liên tục, đây là khác biệt sống còn.

### 7.3. Mini-project B — Dijkstra dùng priority queue

Đây là ứng dụng §6.3 thành code thật. PQ chứa cặp `(đỉnh, khoảng cách tạm)`; luôn lấy đỉnh **gần nguồn nhất** chưa xử lý:

```go
type Item struct {
	node, dist int
}
type PQ []Item
func (p PQ) Len() int            { return len(p) }
func (p PQ) Less(i, j int) bool  { return p[i].dist < p[j].dist } // min theo dist
func (p PQ) Swap(i, j int)       { p[i], p[j] = p[j], p[i] }
func (p *PQ) Push(x any)         { *p = append(*p, x.(Item)) }
func (p *PQ) Pop() any           { o := *p; n := len(o); x := o[n-1]; *p = o[:n-1]; return x }

// adj[u] = list cạnh (v, trọng số). Trả về khoảng cách ngắn nhất từ src tới mọi đỉnh.
func dijkstra(n, src int, adj map[int][][2]int) []int {
	const INF = 1 << 30
	dist := make([]int, n)
	for i := range dist { dist[i] = INF }
	dist[src] = 0
	pq := &PQ{{src, 0}}
	for pq.Len() > 0 {
		cur := heap.Pop(pq).(Item)
		if cur.dist > dist[cur.node] { continue } // bản cũ lỗi thời → bỏ
		for _, e := range adj[cur.node] {
			v, w := e[0], e[1]
			if nd := cur.dist + w; nd < dist[v] {
				dist[v] = nd
				heap.Push(pq, Item{v, nd}) // "lazy deletion": đẩy bản mới, không xóa bản cũ
			}
		}
	}
	return dist
}
```

> ⚠ **Bẫy #2 — heap không có "decrease-key" rẻ.** Khi tìm được đường ngắn hơn tới `v`, lý thuyết bảo "giảm key của `v` trong heap". Nhưng `container/heap` (và hầu hết PQ thực dụng) **không** cho tìm `v` trong $O(1)$. Mẹo **lazy deletion**: cứ `Push` bản mới `(v, nd)`, để bản cũ nằm lại; khi `Pop` ra bản cũ thì dòng `if cur.dist > dist[cur.node] { continue }` vứt nó đi. Heap to hơn chút nhưng code đơn giản và vẫn $O((V+E)\log V)$.

### 7.4. Mini-project C — Top-K trending (streaming)

Code hóa §6.2: đếm hashtag trong stream khổng lồ, giữ **top-K** mà chỉ tốn bộ nhớ $O(K)$. Min-heap size K = "phòng VIP", gốc = người gác cửa nhỏ nhất:

```go
type Tag struct {
	name  string
	count int
}
type MinK []Tag
func (m MinK) Len() int           { return len(m) }
func (m MinK) Less(i, j int) bool { return m[i].count < m[j].count } // MIN-heap để tìm MAX (§6.2)
func (m MinK) Swap(i, j int)      { m[i], m[j] = m[j], m[i] }
func (m *MinK) Push(x any)        { *m = append(*m, x.(Tag)) }
func (m *MinK) Pop() any          { o := *m; n := len(o); x := o[n-1]; *m = o[:n-1]; return x }

func topK(counts map[string]int, k int) []Tag {
	h := &MinK{}
	heap.Init(h)
	for name, c := range counts {
		if h.Len() < k {
			heap.Push(h, Tag{name, c})
		} else if c > (*h)[0].count { // lớn hơn người gác cửa?
			heap.Pop(h)                // đá người gác cửa
			heap.Push(h, Tag{name, c}) // cho ứng viên vào
		}
	}
	return *h // K tag lớn nhất (chưa sắp xếp — sort nếu cần thứ tự)
}
```

$O(n \log K)$, bộ nhớ $O(K)$ — chạy được trên 1 tỉ log với K=10 mà chỉ giữ 10 phần tử. Đây đúng cơ chế `heapq.nlargest` (Python) và backend "top trending" thật.

### 7.5. Mini-project D — Median của dòng số (hai heap)

Code hóa §6.5 / Bài 4. Hai heap: `lo` (max-heap, nửa nhỏ) + `hi` (min-heap, nửa lớn). Median nằm ở **đỉnh** hai heap → $O(1)$ lấy, $O(\log n)$ thêm:

```go
type MedianFinder struct {
	lo *MaxHeap // nửa nhỏ, đỉnh = lớn nhất của nửa nhỏ
	hi *MinHeap // nửa lớn, đỉnh = nhỏ nhất của nửa lớn
}
func (m *MedianFinder) Add(x int) {
	heap.Push(m.lo, x)               // luôn vào lo trước
	heap.Push(m.hi, heap.Pop(m.lo)) // chuyển max của lo sang hi → giữ lo ≤ hi
	if m.hi.Len() > m.lo.Len() {     // cân lại: lo được phép nhiều hơn hi đúng 1
		heap.Push(m.lo, heap.Pop(m.hi))
	}
}
func (m *MedianFinder) Median() float64 {
	if m.lo.Len() > m.hi.Len() {
		return float64((*m.lo)[0]) // lẻ → đỉnh lo
	}
	return float64((*m.lo)[0]+(*m.hi)[0]) / 2 // chẵn → trung bình 2 đỉnh
}
```

Mẹo "đẩy qua lại": mọi số vào `lo` rồi nhả max sang `hi`, sau đó cân kích thước. Bất biến `|lo| - |hi| ∈ {0, 1}` luôn giữ → median luôn ở đỉnh.

### 7.6. Mini-project E — Merge K sorted lists

Gộp K danh sách đã sắp xếp (vd K file log đã sort theo timestamp) thành một dòng sắp xếp, không nạp hết vào RAM. Heap giữ đúng **K con trỏ đầu** mỗi list:

```go
type Node struct {
	val, list, idx int // giá trị, list nào, vị trí trong list
}
// ... (PQ min theo val, giống §7.3) ...
func mergeK(lists [][]int) []int {
	pq := &PQ{}
	for li, l := range lists {
		if len(l) > 0 { heap.Push(pq, Node{l[0], li, 0}) }
	}
	var out []int
	for pq.Len() > 0 {
		n := heap.Pop(pq).(Node)
		out = append(out, n.val)
		if n.idx+1 < len(lists[n.list]) { // còn phần tử trong list đó?
			heap.Push(pq, Node{lists[n.list][n.idx+1], n.list, n.idx + 1})
		}
	}
	return out
}
```

$O(N \log K)$ với $N$ = tổng phần tử. Đây là **merge step** của external merge-sort (sort dữ liệu lớn hơn RAM) và cách nhiều DB gộp kết quả từ nhiều partition.

### 7.7. ⚠ Khi nào KHÔNG dùng heap

| Tình huống | Vì sao heap sai | Dùng gì |
|------------|------------------|---------|
| Cần tìm/sửa **phần tử bất kỳ** thường xuyên | Heap tìm 1 phần tử = $O(n)$ | `map`, hoặc indexed-heap (lưu vị trí) |
| Cần **range query** / duyệt theo thứ tự | Heap chỉ biết min/max, phần còn lại vô thứ tự | BST cân bằng / `TreeMap` ([L02](../lesson-02-binary-search-tree/), [L04](../lesson-04-balanced-trees/)) |
| Chỉ cần lấy min/max **một lần** | Build heap $O(n)$ thừa | Quét tuyến tính $O(n)$ tìm min |
| Cần phần tử thứ k cố định nhiều lần trên data tĩnh | — | Sort 1 lần $O(n\log n)$ rồi index $O(1)$ |

> 🔁 **Tự kiểm tra**
> 1. Trong `container/heap`, vì sao gọi `h.Pop()` (method của bạn) thay vì `heap.Pop(h)` lại sai?
>    <details><summary>Đáp án</summary>Method `Pop` của bạn chỉ cắt phần tử <b>cuối slice</b> — không phải min. `heap.Pop(h)` của package mới đổi root xuống cuối, cắt nó ra, rồi sift-down để khôi phục heap property. Phải gọi bản package-level.</details>
> 2. Trong Dijkstra §7.3, vì sao không cần xóa bản `(v, dist cũ)` khỏi heap?
>    <details><summary>Đáp án</summary>Lazy deletion: khi `Pop` lấy ra bản cũ, `cur.dist > dist[cur.node]` đúng (vì `dist[v]` đã được cập nhật nhỏ hơn) → `continue` bỏ qua. Bản cũ vô hại, chỉ tốn chút bộ nhớ.</details>
> 3. Top-K §7.4 dùng min-heap hay max-heap để tìm K phần tử LỚN nhất? Vì sao?
>    <details><summary>Đáp án</summary><b>Min-heap</b> size K. Gốc = phần tử nhỏ nhất trong K hiện giữ = "người gác cửa". Ứng viên mới chỉ vào nếu lớn hơn gốc. Dùng max-heap thì gốc là lớn nhất — không giúp loại phần tử nhỏ.</details>

### 7.8. 📝 Tóm tắt mục 7

- Go: cài `container/heap` (5 method `Len/Less/Swap/Push/Pop`) rồi gọi `heap.Push`/`heap.Pop` package-level — **đừng** gọi method `Push`/`Pop` của mình.
- `Less` dùng `<` → min-heap, `>` → max-heap. Đổi 1 ký tự là đảo loại.
- 5 pattern thực chiến: **PQ scheduler**, **Dijkstra** (lazy deletion thay decrease-key), **top-K streaming** ($O(K)$ bộ nhớ), **median 2-heap**, **merge-K** (external sort).
- Heap mạnh ở min/max + insert/extract $O(\log n)$; **yếu** ở tìm/sửa phần tử bất kỳ và range query → khi đó dùng map / BST cân bằng.

## Bài tập

1. Cho mảng `[4, 1, 7, 3, 2, 6, 5]`, vẽ min-heap kết quả khi chèn lần lượt.
2. Cài đặt min-heap với `insert`, `extractMin`, `peek`.
3. Sắp xếp mảng bằng heap sort, tự cài đặt.
4. Cho dòng số đến liên tiếp, viết cấu trúc trả về **median** sau mỗi lần thêm trong $O(\log n)$.
5. Vì sao `buildHeap` chỉ tốn $O(n)$? (Gợi ý: tính tổng `siftDown` theo độ cao node.)

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
`Insert`, `ExtractMin`: $O(\log n)$.

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
$O(n \log n)$, sắp xếp tại chỗ.

### Bài 4 — Median streaming
Dùng **hai heap**:
- Max-heap `lo` chứa nửa nhỏ.
- Min-heap `hi` chứa nửa lớn.
- Giữ $|lo| - |hi| \in \{0, 1\}$.

Median = `lo.top()` nếu lẻ; `(lo.top() + hi.top()) / 2` nếu chẵn.

Mỗi insert: $O(\log n)$. Lấy median: $O(1)$.

### Bài 5 — Vì sao `buildHeap` chỉ `O(n)`?
Phân tích: ở chiều cao $h$, có khoảng $n/2^{h+1}$ node, mỗi node `siftDown` tốn $O(h)$.

Tổng chi phí:
```
T(n) = Σ (h từ 0 tới log n) (n / 2^(h+1)) · h
     = n · Σ h / 2^(h+1)
```
Tổng $\sum h / 2^h$ hội tụ về **hằng số** (xấp xỉ 2) → $T(n) = O(n)$.

Trực giác: phần lớn node nằm gần đáy, chỉ phải sift xuống rất ít tầng.

## Code & Minh họa

- [solutions.go](./solutions.go) — min-heap đầy đủ + heap sort + median streaming.
- [visualization.html](./visualization.html) — heap dạng cây + mảng, animate sift-up khi insert và sift-down khi extract.

## Bài tiếp theo

[Lesson 04 — Balanced Trees](../lesson-04-balanced-trees/)
