# Lesson 05 — Queue (Hàng đợi)

## Mục tiêu học tập

- Hiểu khái niệm **FIFO** và queue.
- Biết các biến thể: **circular queue**, **deque**, **priority queue**.
- Cài đặt được queue bằng array, linked list.
- Nhận ra các bài toán nên dùng queue.

## Kiến thức tiền đề

- [Lesson 04 — Stack](../lesson-04-stack/).

## 1. Queue là gì?

**Queue (hàng đợi)** là ADT hoạt động theo nguyên tắc **FIFO — First In, First Out**: phần tử vào trước thì ra trước.

Hình dung: xếp hàng mua vé. Ai đến trước thì được phục vụ trước.

```
enqueue(1,2,3):    [1,2,3]
dequeue() -> 1
dequeue() -> 2
```

Hai đầu của queue:
- **rear / tail**: nơi `enqueue` (thêm).
- **front / head**: nơi `dequeue` (lấy ra).

## 2. Các thao tác

| Thao tác | Mô tả | Big-O |
| --- | --- | --- |
| `enqueue(x)` | Thêm vào cuối | $O(1)$ |
| `dequeue()` | Lấy ra ở đầu | $O(1)$ |
| `front()` | Xem phần tử đầu | $O(1)$ |
| `isEmpty()` | Queue rỗng? | $O(1)$ |
| `size()` | Số phần tử | $O(1)$ |

## 3. Cài đặt

### 3.1. Dùng linked list (đơn giản nhất)

Giữ con trỏ `head` (front) và `tail` (rear).
- `enqueue`: thêm vào `tail.next`, cập nhật `tail`.
- `dequeue`: lấy `head.value`, dịch `head = head.next`.

Tất cả $O(1)$.

### 3.2. Dùng array thường (kém)

Nếu chỉ dùng mảng và `dequeue` bằng cách xóa phần tử đầu → tốn $O(n)$ mỗi lần (phải dịch toàn bộ).

### 3.3. Circular queue (mảng vòng)

Dùng một mảng cố định `arr[capacity]` với hai chỉ số `front`, `rear` chạy vòng tròn (modulo `capacity`).

```
enqueue(x):
    arr[rear] = x
    rear = (rear + 1) % capacity

dequeue():
    v = arr[front]
    front = (front + 1) % capacity
    return v
```

- $O(1)$ mọi thao tác.
- Tiết kiệm bộ nhớ.
- Phải xử lý case "đầy" / "rỗng" (thường dùng biến `size` để phân biệt).

## 4. Các biến thể

### 4.1. Deque (Double-Ended Queue)

Thêm/xóa ở **cả hai đầu** trong $O(1)$. Cài bằng doubly linked list hoặc circular buffer.

Thao tác: `pushFront`, `pushBack`, `popFront`, `popBack`.

### 4.2. Priority Queue (PQ)

**Không tuân theo FIFO**. Mỗi phần tử có **độ ưu tiên (priority)**, `dequeue` luôn lấy phần tử ưu tiên cao nhất.

Cài đặt phổ biến: **heap** (sẽ học ở [Lesson 03](../../02-Intermediate/lesson-03-heap-priority-queue/)).
- `enqueue`, `dequeue`: $O(\log n)$.

### 4.3. Blocking Queue

Queue dùng trong đa luồng: `dequeue` chờ nếu rỗng; `enqueue` chờ nếu đầy. (Java: `BlockingQueue`.)

## 5. Ứng dụng

- **BFS (Breadth-First Search)**: duyệt đồ thị theo chiều rộng.
- **Scheduler**: hệ điều hành / message queue (RabbitMQ, Kafka).
- **Print queue**, **request queue** trên server.
- **Buffer**: âm thanh, video streaming, IO.
- **Producer-Consumer pattern**.

## 6. Ví dụ pseudocode — BFS

```
function bfs(graph, start):
    visited = set()
    queue = [start]
    visited.add(start)
    while not queue.isEmpty():
        node = queue.dequeue()
        visit(node)
        for neighbor in graph[node]:
            if neighbor not in visited:
                visited.add(neighbor)
                queue.enqueue(neighbor)
```

### 6.1. 💡 Trực giác — vì sao BFS phải dùng queue

Hình dung **cháy lan trên giấy**: bạn châm lửa ở node `start`. Mỗi giây, lửa lan đều từ những điểm đang cháy sang **tất cả** hàng xóm chưa cháy. Sau giây 1, lửa ở các node cách `start` đúng 1 cạnh. Sau giây 2, ở các node cách 2 cạnh. Cứ thế.

Để mô phỏng "lan đều", ta **phải xử lý xong toàn bộ node ở khoảng cách $d$ trước khi đụng tới node ở khoảng cách $d+1$**. Đây chính xác là tính chất **FIFO** của queue:

- Khi `dequeue` ra node `u` ở khoảng cách $d$, mọi node $d$ còn lại đã ở trong queue trước các node $d+1$ (vì chúng được `enqueue` từ trước, do thăm bố mẹ ở khoảng cách $d-1$ xảy ra trước).
- Các node $d+1$ thêm vào sẽ ngồi ở **đuôi queue**, chỉ được xử lý sau khi hết tầng $d$.

Nếu thay queue bằng **stack** (LIFO): node mới đẩy vào sẽ được xử lý ngay → đi sâu trước khi xử lý xong tầng hiện tại → đó chính là **DFS**, không phải BFS.

### 6.2. Walk-through bằng số cụ thể

Đồ thị mẫu (vô hướng):

```
    A ── B ── D
    │    │
    C ── E ── F
```

`adj[A]={B,C}`, `adj[B]={A,D,E}`, `adj[C]={A,E}`, `adj[D]={B}`, `adj[E]={B,C,F}`, `adj[F]={E}`.

Trạng thái queue và visited tại MỖI bước, BFS từ `A`:

| Bước | Action | Queue (front→rear) | Visited | Output |
|------|--------|--------------------|---------|--------|
| 0 | init | `[A]` | `{A}` | — |
| 1 | dequeue A, enqueue B,C | `[B, C]` | `{A,B,C}` | A |
| 2 | dequeue B, enqueue D,E (A đã visited) | `[C, D, E]` | `{A,B,C,D,E}` | B |
| 3 | dequeue C (A,E đã visited) | `[D, E]` | `{A,B,C,D,E}` | C |
| 4 | dequeue D (B đã visited) | `[E]` | `{A,B,C,D,E}` | D |
| 5 | dequeue E, enqueue F (B,C đã visited) | `[F]` | `{A,B,C,D,E,F}` | E |
| 6 | dequeue F (E đã visited) | `[]` | `{A,B,C,D,E,F}` | F |

Thứ tự thăm: **A, B, C, D, E, F** — đúng thứ tự khoảng cách $0, 1, 1, 2, 2, 3$.

Để ý: B và C cùng khoảng cách 1, B được thăm trước **chỉ vì** thứ tự enqueue ở bước 1 (B trước C, do `adj[A]` liệt kê B trước). BFS không cam kết thứ tự **trong cùng một tầng**, chỉ cam kết "tầng trước → tầng sau".

### 6.3. Tính chất quan trọng — BFS tìm đường đi ngắn nhất (đồ thị không trọng số)

**Phát biểu**: với đồ thị **không trọng số** (hoặc trọng số bằng nhau), BFS từ `s` tính được `dist(s, v)` = số cạnh ít nhất từ `s` đến `v`, cho mọi `v` reachable.

**Vì sao đúng?** Quan sát: khi node `v` lần đầu được `enqueue`, nó được phát hiện qua bố mẹ `u` đang ở tầng `d` → `v` ở tầng `d+1`. Giả sử tồn tại đường ngắn hơn từ `s` đến `v` qua node `w` ở tầng `d' < d`. Nhưng `w` được xử lý **trước** `u` (do FIFO), nên khi xử lý `w` lẽ ra `v` đã được phát hiện rồi — mâu thuẫn với "lần đầu enqueue". Vậy `dist(v) = d+1`.

**Track distance** trong pseudocode:

```
function bfsDistance(graph, start):
    dist = map[node → int]
    dist[start] = 0
    queue = [start]
    while not queue.isEmpty():
        u = queue.dequeue()
        for v in graph[u]:
            if v not in dist:
                dist[v] = dist[u] + 1
                queue.enqueue(v)
    return dist
```

Áp lên ví dụ trên, từ A: `dist = {A:0, B:1, C:1, D:2, E:2, F:3}`.

**Reconstruct path** (tái tạo đường đi cụ thể): lưu thêm `parent[v] = u` lúc enqueue → từ đích lùi ngược về.

### 6.4. Biến thể thường gặp

**(a) BFS theo tầng (level-by-level)** — biết "phần tử nào thuộc tầng nào":

```
queue = [start]
level = 0
while not queue.isEmpty():
    size = queue.size()        # CHỐT số node tầng hiện tại
    for i in 1..size:
        u = queue.dequeue()
        visit(u, level)
        for v in graph[u]:
            if not visited[v]:
                visited[v] = true
                queue.enqueue(v)
    level += 1
```

Mẹo: snapshot `size` **trước** khi xử lý tầng. Trong vòng `for`, queue có thể phình thêm — nhưng `size` đã chốt nên không sang nhầm tầng.

**(b) Multi-source BFS** — nhiều nguồn xuất phát cùng lúc, tính khoảng cách đến nguồn **gần nhất**: đẩy hết các nguồn vào queue ban đầu với `dist = 0`, rồi BFS như thường. Ứng dụng: ma trận `01-matrix` (LeetCode 542), nhiệt độ lan từ nhiều ổ lửa, v.v.

**(c) 0-1 BFS** — đồ thị có trọng số ∈ {0, 1}: thay queue bằng **deque**, cạnh trọng số 0 → `pushFront`, cạnh trọng số 1 → `pushBack`. Vẫn $O(V+E)$. (Trọng số bất kỳ → phải dùng Dijkstra ở lesson 11.)

### 6.5. ❓ Câu hỏi tự nhiên

- **"Cần `visited` riêng hay chỉ check `dist[v]`?"** — Cùng tác dụng. Nếu đã track `dist`, kiểm tra `v not in dist` là đủ. Hai biến `visited` + `dist` là dư.
- **"Đánh dấu visited LÚC enqueue hay LÚC dequeue?"** — **Lúc enqueue** mới đúng. Nếu đánh dấu lúc dequeue, một node có thể bị enqueue **nhiều lần** trước khi được xử lý → queue phình to + duplicate output. Đây là lỗi rất phổ biến.
- **"BFS có hoạt động trên đồ thị có chu trình?"** — Có, miễn là check `visited` để không quay lại. Đó là tác dụng chính của `visited`.
- **"Đồ thị vô hướng và có hướng khác gì khi BFS?"** — Code y hệt; khác biệt chỉ là `adj[u]` cấu thành thế nào (vô hướng: cạnh `u-v` xuất hiện ở cả `adj[u]` và `adj[v]`; có hướng: chỉ một chiều).
- **"Độ phức tạp?"** — $O(V + E)$ thời gian, $O(V)$ bộ nhớ (queue + visited). Mỗi đỉnh enqueue/dequeue đúng 1 lần (do visited); mỗi cạnh xét đúng 1-2 lần (vô hướng).

### 6.6. ⚠ Lỗi thường gặp

| Lỗi | Hậu quả | Cách sửa |
|------|---------|----------|
| Đánh dấu visited **lúc dequeue** thay vì lúc enqueue | Một node bị enqueue nhiều lần, queue phình, có thể TLE/OOM | Đánh dấu **ngay khi enqueue** |
| Quên đánh dấu `start` là visited ban đầu | `start` có thể bị enqueue lại qua hàng xóm → vòng lặp lãng phí | `visited.add(start)` trước vòng while |
| Dùng `list.pop(0)` ở Python để dequeue | $O(n)$ mỗi lần → BFS chậm thành $O(V\cdot(V+E))$ | Dùng `collections.deque` (`popleft()` là $O(1)$) |
| BFS trên đồ thị có **trọng số khác nhau** rồi kết luận đường ngắn nhất | Sai kết quả — BFS chỉ đúng cho trọng số bằng nhau | Dùng Dijkstra (lesson 11) |
| Trong level-by-level, đọc `queue.size()` **trong** vòng for thay vì snapshot trước | Sang nhầm tầng do queue phình | Chốt `size = queue.size()` trước `for` |

### 6.7. 🔁 Tự kiểm tra

1. BFS trên cây nhị phân từ root tương đương với cách duyệt nào đã học ở lesson 6?
   <details><summary>Đáp án</summary>**Level-order traversal**. Cây là đồ thị đặc biệt (không chu trình, mỗi node có 1 bố mẹ trừ root), nên không cần `visited`.</details>
2. Nếu thay queue bằng **priority queue** (lấy node có dist nhỏ nhất trước), thuật toán biến thành gì?
   <details><summary>Đáp án</summary>**Dijkstra**. Trên đồ thị không trọng số, Dijkstra suy biến về BFS vì mọi cạnh `w=1` → "dist nhỏ nhất tiếp theo" trùng với "tầng tiếp theo".</details>
3. Cho đồ thị ở mục 6.2, BFS từ `D` ra thứ tự thăm nào?
   <details><summary>Đáp án</summary>`D, B, A, E, C, F`. (D có 1 hàng xóm B; B có {A,D,E} mới = {A,E}; A có {B,C} mới = {C}; E có {B,C,F} mới = {F}; ...)</details>

### 6.8. 📝 Tóm tắt mục 6

- **BFS = duyệt theo tầng** từ node xuất phát, mỗi tầng cách thêm 1 cạnh.
- **Queue (FIFO) là cấu trúc đúng** vì giữ thứ tự "tầng trước hết sạch rồi mới sang tầng sau".
- **Đánh dấu visited lúc enqueue**, không phải lúc dequeue.
- BFS tính **đường ngắn nhất theo số cạnh** trong đồ thị **không trọng số**. Có trọng số → Dijkstra.
- Complexity: $O(V + E)$ thời gian, $O(V)$ bộ nhớ.
- Biến thể quan trọng: level-by-level (snapshot size), multi-source (push hết nguồn vào queue ban đầu), 0-1 BFS (deque).

## 7. Thực hành: dùng trong code thật

> 💡 **§5 liệt kê ứng dụng, §6 dạy BFS. Mục này là 3 thứ backend dùng hằng ngày: rate limiter, job queue (channel Go), ring buffer.** Queue = FIFO, và trong Go nó xuất hiện ở hai dạng: slice (single-thread) và **channel** (thread-safe, giữa goroutine). Code dưới đây `go run` được.

### 7.1. Mini-project A — Rate limiter (sliding-window log)

Bài toán có thật: "mỗi user tối đa N request trong T giây". Giữ một **queue timestamp**: bỏ cái cũ rời cửa sổ (dequeue đầu), đếm cái còn lại:

```go
type RateLimiter struct {
	window int64   // độ rộng cửa sổ (vd 60)
	limit  int     // tối đa N request
	q      []int64 // timestamp gần đây, FIFO
}

func (r *RateLimiter) Allow(now int64) bool {
	for len(r.q) > 0 && r.q[0] <= now-r.window { // dequeue các request đã rời cửa sổ
		r.q = r.q[1:]
	}
	if len(r.q) >= r.limit {
		return false // đủ limit trong cửa sổ → chặn
	}
	r.q = append(r.q, now) // enqueue request mới
	return true
}
```

`window=10, limit=3`: t=1,2,3 cho qua; t=4 **chặn** (đã 3 trong cửa sổ); t=12 cho qua (t=1,2 đã rời cửa sổ [2,12]). Đây là cốt lõi API gateway / chống abuse. FIFO đúng vì request **cũ nhất rời cửa sổ trước**.

### 7.2. Mini-project B — Job queue + worker pool (channel Go LÀ queue)

Go có queue thread-safe sẵn: **channel**. Buffered channel = queue FIFO an toàn giữa nhiều goroutine — nền của mọi worker pool (xử lý job nền, gửi email, resize ảnh):

```go
func workerPool(jobs []int, workers int) int {
	jobCh := make(chan int, len(jobs)) // buffered channel = queue
	var wg sync.WaitGroup
	var mu sync.Mutex
	total := 0
	for w := 0; w < workers; w++ {
		wg.Add(1)
		go func() {
			defer wg.Done()
			for j := range jobCh { // nhận job FIFO tới khi channel đóng
				mu.Lock(); total += j * j; mu.Unlock() // "xử lý"
			}
		}()
	}
	for _, j := range jobs {
		jobCh <- j // enqueue
	}
	close(jobCh) // báo hết job → các worker thoát vòng range
	wg.Wait()
	return total
}
```

Nhiều worker cùng `range jobCh` → mỗi job giao cho đúng **một** worker rảnh, theo thứ tự enqueue. Đây là pattern producer-consumer kinh điển; channel lo toàn bộ khóa/đồng bộ.

> ⚠ **Bẫy — dequeue bằng `q = q[1:]` rò rỉ bộ nhớ ngầm + $O(n)$ nếu làm sai.** `q[1:]` không giải phóng phần tử đầu (mảng nền vẫn giữ), và nếu bạn `append` lại nhiều lần có thể không co. Cho queue nhỏ/ngắn hạn (rate limiter) thì ổn. Queue **lớn, sống lâu** → dùng **circular buffer** (§3.3) hoặc `container/list`, hoặc channel.

### 7.3. Mini-project C — Ring buffer: N mục gần nhất

"Trung bình 5 giá gần nhất" (Bài 4), "100 log gần nhất", moving average trên metrics. Mảng vòng (§3.3) ghi đè cái cũ nhất, cố định bộ nhớ:

```go
type RingBuffer struct {
	buf  []int
	head, size int
}

func NewRing(n int) *RingBuffer { return &RingBuffer{buf: make([]int, n)} }

func (r *RingBuffer) Push(x int) { // ghi đè cái cũ nhất khi đầy
	idx := (r.head + r.size) % len(r.buf)
	if r.size < len(r.buf) {
		r.size++
	} else {
		r.head = (r.head + 1) % len(r.buf) // đầy → dời head, "quên" cái cũ nhất
	}
	r.buf[idx] = x
}
```

Bộ nhớ cố định $O(n)$ bất kể đẩy bao nhiêu — không cấp phát thêm. Dùng cho metrics, audio/video buffer, log gần đây.

### 7.4. 🔁 Tự kiểm tra

> 1. Rate limiter: vì sao phải dequeue timestamp cũ TRƯỚC khi đếm?
>    <details><summary>Đáp án</summary>Các request cũ hơn `now-window` đã rời cửa sổ thời gian → không còn tính vào limit. Không bỏ chúng → đếm dư → chặn nhầm request hợp lệ.</details>
> 2. Vì sao channel Go phù hợp làm job queue hơn slice?
>    <details><summary>Đáp án</summary>Channel <b>thread-safe</b> sẵn: nhiều goroutine producer/consumer cùng dùng không cần tự khóa. Slice cần mutex thủ công. Channel còn block/đợi tự nhiên khi rỗng/đầy.</details>
> 3. Ring buffer khác queue thường ở điểm nào?
>    <details><summary>Đáp án</summary>Ring buffer <b>cố định kích thước</b>, đầy thì ghi đè cái cũ nhất (mất dữ liệu cũ có chủ đích). Queue thường lớn vô hạn (cấp thêm bộ nhớ). Ring hợp khi chỉ cần "N cái gần nhất".</details>

### 7.5. 📝 Tóm tắt mục 7

- **Rate limiter** = queue timestamp; dequeue cái rời cửa sổ rồi đếm. Nền API gateway.
- **Job queue** = **channel Go** (thread-safe FIFO) + worker pool; channel lo đồng bộ.
- **Ring buffer** = mảng vòng cố định, đầy thì ghi đè cũ nhất; dùng cho "N mục gần nhất".
- Bẫy: `q[1:]` dequeue ổn cho queue ngắn; queue lớn/lâu → circular buffer / `container/list` / channel.

## Bài tập

1. Cài đặt một circular queue dùng mảng kích thước cố định.
2. Cài đặt queue bằng **hai stack** — tham khảo kỹ thuật cổ điển.
3. Cài đặt stack bằng **hai queue** — chiều ngược lại.
4. Cho luồng số đến liên tiếp, viết một cấu trúc tính **trung bình của 5 số gần nhất** trong $O(1)$ mỗi thao tác (gợi ý: queue + biến tổng).
5. Mô phỏng BFS trên một đồ thị nhỏ bằng tay, ghi lại trạng thái queue tại mỗi bước.

## Lời giải chi tiết

### Bài 1 — Circular queue dùng mảng cố định
Dùng `front`, `rear`, và `size`. Modulo `capacity` để quay vòng.

```go
type CircQueue struct {
    data []int
    front, size, cap int
}
func New(cap int) *CircQueue { return &CircQueue{data: make([]int, cap), cap: cap} }
func (q *CircQueue) Enqueue(x int) bool {
    if q.size == q.cap { return false } // đầy
    q.data[(q.front+q.size)%q.cap] = x
    q.size++
    return true
}
func (q *CircQueue) Dequeue() (int, bool) {
    if q.size == 0 { return 0, false }
    x := q.data[q.front]
    q.front = (q.front + 1) % q.cap
    q.size--
    return x, true
}
```
Tất cả $O(1)$.

### Bài 2 — Queue bằng 2 stack
Hai stack: `in` (cho enqueue) và `out` (cho dequeue).
- `enqueue(x)`: push vào `in`.
- `dequeue()`: nếu `out` rỗng → đổ toàn bộ `in` sang `out` (đảo thứ tự, đầu thành đỉnh). Pop `out`.

Amortized $O(1)$ mỗi thao tác (mỗi phần tử chuyển sang `out` đúng một lần trong đời).

### Bài 3 — Stack bằng 2 queue
Cách phổ biến: dùng `q1` là chính, `q2` phụ.
- `push(x)`: thêm vào `q2`, đổ toàn bộ `q1` vào `q2`, swap `q1, q2`.
- `pop()`: dequeue từ `q1`.

Push: $O(n)$. Pop/Top: $O(1)$. Có biến thể tốn ngược lại.

### Bài 4 — Trung bình 5 số gần nhất, $O(1)$ mỗi lần
Queue kích thước cố định 5 + biến `sum`.
- Khi thêm `x`: nếu đủ 5 → dequeue đầu (`sum -= old`); enqueue `x`, `sum += x`; trung bình = `sum / size`.

Mỗi thao tác $O(1)$.

### Bài 5 — Mô phỏng BFS bằng tay
Đồ thị:
```
A - B - D
|   |
C - E
```
BFS từ A: queue=[A], visited={A}.
- Dequeue A, thăm B, C → queue=[B,C].
- Dequeue B, thăm D, E → queue=[C,D,E].
- Dequeue C, không có hàng xóm chưa thăm → queue=[D,E].
- Dequeue D → queue=[E].
- Dequeue E → queue=[].

Thứ tự thăm: A, B, C, D, E.

## Code & Minh họa

- [solutions.go](./solutions.go) — circular queue, queue-từ-stack, sliding window average.
- [visualization.html](./visualization.html) — minh họa circular queue với hai con trỏ `front`/`rear`.

## Bài tiếp theo

[Lesson 06 — Hash Table](../lesson-06-hash-table/)
