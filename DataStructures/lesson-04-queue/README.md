# Lesson 04 — Queue (Hàng đợi)

## Mục tiêu học tập

- Hiểu khái niệm **FIFO** và queue.
- Biết các biến thể: **circular queue**, **deque**, **priority queue**.
- Cài đặt được queue bằng array, linked list.
- Nhận ra các bài toán nên dùng queue.

## Kiến thức tiền đề

- [Lesson 03 — Stack](../lesson-03-stack/).

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
| `enqueue(x)` | Thêm vào cuối | `O(1)` |
| `dequeue()` | Lấy ra ở đầu | `O(1)` |
| `front()` | Xem phần tử đầu | `O(1)` |
| `isEmpty()` | Queue rỗng? | `O(1)` |
| `size()` | Số phần tử | `O(1)` |

## 3. Cài đặt

### 3.1. Dùng linked list (đơn giản nhất)

Giữ con trỏ `head` (front) và `tail` (rear).
- `enqueue`: thêm vào `tail.next`, cập nhật `tail`.
- `dequeue`: lấy `head.value`, dịch `head = head.next`.

Tất cả `O(1)`.

### 3.2. Dùng array thường (kém)

Nếu chỉ dùng mảng và `dequeue` bằng cách xóa phần tử đầu → tốn `O(n)` mỗi lần (phải dịch toàn bộ).

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

- `O(1)` mọi thao tác.
- Tiết kiệm bộ nhớ.
- Phải xử lý case "đầy" / "rỗng" (thường dùng biến `size` để phân biệt).

## 4. Các biến thể

### 4.1. Deque (Double-Ended Queue)

Thêm/xóa ở **cả hai đầu** trong `O(1)`. Cài bằng doubly linked list hoặc circular buffer.

Thao tác: `pushFront`, `pushBack`, `popFront`, `popBack`.

### 4.2. Priority Queue (PQ)

**Không tuân theo FIFO**. Mỗi phần tử có **độ ưu tiên (priority)**, `dequeue` luôn lấy phần tử ưu tiên cao nhất.

Cài đặt phổ biến: **heap** (sẽ học ở [Lesson 08](../lesson-08-heap-priority-queue/)).
- `enqueue`, `dequeue`: `O(log n)`.

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

## Bài tập

1. Cài đặt một circular queue dùng mảng kích thước cố định.
2. Cài đặt queue bằng **hai stack** — tham khảo kỹ thuật cổ điển.
3. Cài đặt stack bằng **hai queue** — chiều ngược lại.
4. Cho luồng số đến liên tiếp, viết một cấu trúc tính **trung bình của 5 số gần nhất** trong `O(1)` mỗi thao tác (gợi ý: queue + biến tổng).
5. Mô phỏng BFS trên một đồ thị nhỏ bằng tay, ghi lại trạng thái queue tại mỗi bước.

## Bài tiếp theo

[Lesson 05 — Hash Table](../lesson-05-hash-table/)
