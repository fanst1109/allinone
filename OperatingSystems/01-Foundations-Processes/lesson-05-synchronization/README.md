# Lesson 05 — Đồng bộ hoá (Synchronization)

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Giải thích được **race condition** là gì và tại sao nó xảy ra — minh hoạ bằng dãy lệnh load/add/store xen kẽ cụ thể.
- Phát biểu đúng **3 yêu cầu của critical section**: mutual exclusion, progress, bounded waiting.
- Phân biệt **spinlock** (busy-wait) và **blocking lock** — khi nào dùng loại nào.
- Giải thích nguyên lý lệnh nguyên tử **test-and-set** và vì sao nó giải quyết được race condition.
- Trình bày **thuật toán Peterson** (2 tiến trình) và kiểm tra xem nó thoả mãn 3 yêu cầu chưa.
- Nhận biết được race condition trong code Go thực tế và dùng `sync.Mutex` để khắc phục.

## Kiến thức tiền đề

- [Lesson 02 — Tiến trình (Process)](../lesson-02-process/): khái niệm process, PCB, trạng thái process.
- [Lesson 03 — Luồng & Tương tranh (Threads & Concurrency)](../lesson-03-threads-concurrency/): thread, context switch, tại sao nhiều thread chia sẻ bộ nhớ.
- [Lesson 04 — Lập lịch CPU (CPU Scheduling)](../lesson-04-cpu-scheduling/): scheduler, quantum, preemption — hiểu preemption giải thích tại sao thread bị gián đoạn giữa chừng.

---

## 1. Race Condition là gì?

### 1.1. Bài toán đặt ra

💡 **Trực giác — Analogy tài khoản ngân hàng:**
Hai nhân viên ngân hàng cùng mở file sổ sách, nhìn thấy số dư là 1.000.000 đồng, rồi mỗi người cộng thêm 500.000 đồng của hai giao dịch khác nhau. Cả hai lưu lại 1.500.000 đồng. Kết quả đúng phải là 2.000.000 đồng, nhưng do hai người "đọc cùng lúc rồi ghi đè nhau", một giao dịch bị mất. Đây chính là **race condition** (điều kiện tranh chấp) trong lập trình đa luồng (multi-threaded).

**Race condition** xảy ra khi kết quả của chương trình phụ thuộc vào **thứ tự thực thi** của nhiều thread/process trên dữ liệu chia sẻ, và ít nhất một trong số đó đang ghi (write).

### 1.2. Walk-through bằng lệnh máy — `count++` bị mất

Tưởng `count++` là một lệnh nguyên tử, nhưng thực ra CPU chia thành **3 micro-operation**:

```
LOAD  reg, count    ; đọc giá trị count vào thanh ghi CPU
ADD   reg, 1        ; cộng 1
STORE count, reg    ; ghi kết quả về bộ nhớ
```

Xét 2 thread A và B cùng chạy `count++` khi `count = 0`:

```
Thread A                    Thread B                    count (RAM)
─────────────────────────────────────────────────────────────────────
LOAD  regA, count                                         0
                            LOAD  regB, count             0
ADD   regA, 1  → regA=1
                            ADD   regB, 1  → regB=1
STORE count, regA                                         1
                            STORE count, regB             1   ← MẤT!
```

**Phân tích:** Thread A load `count = 0`, bị preempt (scheduler chuyển CPU sang B). B cũng load `count = 0`, cộng 1 và lưu lại. A tiếp tục, cũng lưu `regA = 1`. Kết quả cuối: `count = 1` thay vì `count = 2` — **một lần tăng bị mất**.

Với 1.000.000 lần tăng từ hai thread, kết quả có thể là bất kỳ giá trị nào giữa 1.000.000 và 2.000.000, tuỳ thuộc vào lịch trình của scheduler. Kết quả **không xác định (non-deterministic)** và **không tái tạo được (non-reproducible)** — đây là đặc điểm đặc trưng của race condition.

❓ **Câu hỏi tự nhiên của người đọc:**

- *"Nếu chạy 100 lần, kết quả có luôn sai không?"* — Không. Đôi khi hai thread không xen kẽ đúng chỗ nguy hiểm, kết quả vẫn đúng. Đây là lý do race condition **rất khó debug** — chỉ thỉnh thoảng mới lộ ra.
- *"Vì sao CPU không làm `count++` là một lệnh nguyên tử?"* — Phần lớn CPU hiện đại không cung cấp atomic increment mặc định. Các kiến trúc x86 có lệnh `LOCK ADD` nguyên tử, nhưng đó là lệnh đặc biệt có giá, không phải lệnh `++` thông thường trong ngôn ngữ bậc cao.
- *"Trong Go, `count++` có an toàn không?"* — Không. Go có race detector (`go run -race`). Mọi truy cập chia sẻ không được bảo vệ đều là race condition. Phải dùng `sync.Mutex` hoặc `sync/atomic`.

### 1.3. Ví dụ trong Go — Thấy rõ race condition

```go
// race_demo.go — ĐÂY LÀ CODE SỬA LỖI — không dùng cách này trong production
import (
    "fmt"
    "sync"
)

var count int
var wg sync.WaitGroup

func increment() {
    defer wg.Done()
    for i := 0; i < 100000; i++ {
        count++ // RACE CONDITION: không an toàn
    }
}

func main() {
    wg.Add(2)
    go increment()
    go increment()
    wg.Wait()
    fmt.Println(count) // Kết quả thường < 200000, thay đổi mỗi lần chạy
}
```

Khi chạy với `go run -race`, Go sẽ báo DATA RACE.

⚠ **Lỗi thường gặp — Nghĩ biến local an toàn:** Biến local trong stack của mỗi goroutine thì an toàn (mỗi goroutine có stack riêng). Biến **heap được chia sẻ** (qua pointer, channel với buffer, map dùng chung, slice header...) mới là nguy hiểm.

📝 **Tóm tắt mục 1:**
- Race condition = kết quả phụ thuộc vào thứ tự thực thi trên dữ liệu chia sẻ — không xác định.
- `count++` thực ra gồm 3 bước: LOAD, ADD, STORE. Bị preempt giữa chừng → mất cập nhật.
- Rất khó debug vì không phải lúc nào cũng tái tạo được.

---

## 2. Critical Section & 3 Yêu cầu

### 2.1. Critical Section (Đoạn tới hạn)

💡 **Trực giác:** Trong một bệnh viện, phòng mổ chỉ có thể có một ekíp phẫu thuật tại một thời điểm. Trong lập trình, **critical section** là đoạn code truy cập tài nguyên chia sẻ — chỉ một thread được phép ở trong đó tại mỗi thời điểm.

**Cấu trúc bắt buộc** khi dùng critical section:

```
// Phần không tới hạn (remainder section)
entry_section()        // xin vào
    CRITICAL SECTION   // truy cập tài nguyên chia sẻ
exit_section()         // thông báo ra
// Phần không tới hạn
```

### 2.2. 3 yêu cầu bắt buộc — Không thiếu cái nào

Bất kỳ giải pháp nào cho bài toán critical section đều phải thoả mãn đồng thời 3 điều kiện sau:

| Yêu cầu | Định nghĩa | Vì sao cần |
|---------|-----------|-----------|
| **1. Mutual Exclusion** (loại trừ lẫn nhau) | Tại mọi thời điểm, tối đa một thread nằm trong critical section | Đây là mục đích chính — ngăn race condition |
| **2. Progress** (tiến triển) | Nếu không có thread nào trong CS và có thread muốn vào, quyết định phải được đưa ra trong thời gian hữu hạn — không bị treo vĩnh viễn | Tránh deadlock lúc vào |
| **3. Bounded Waiting** (chờ có giới hạn) | Sau khi thread T gửi yêu cầu vào CS, có một giới hạn hữu hạn về số lần các thread khác được vào trước T | Tránh starvation — thread không chờ mãi mãi |

❓ **Câu hỏi tự nhiên của người đọc:**

- *"Mutual exclusion là đủ rồi, sao cần thêm Progress và Bounded Waiting?"* — Mutual exclusion không đủ. Ví dụ: nếu giải pháp luôn nói "không ai được vào" → mutual exclusion thoả mãn, nhưng chương trình không chạy được (vi phạm Progress). Hoặc: một thread mãi được ưu tiên, thread kia chờ mãi (vi phạm Bounded Waiting).
- *"Starvation khác deadlock như thế nào?"* — Deadlock: các thread **không ai tiến được** vì chờ nhau. Starvation: **một thread** không được vào CS mặc dù CS rảnh, vì các thread khác luôn được ưu tiên trước. Xem chi tiết ở [Lesson 07 — Deadlock](../lesson-07-deadlock/).

⚠ **Lỗi thường gặp — Chỉ kiểm tra Mutual Exclusion:** Nhiều giải pháp đơn giản (như dùng biến `turn` thay phiên) thoả mãn Mutual Exclusion nhưng vi phạm Progress — nếu một thread thoát khỏi CS và không muốn vào lại, thread kia bị chặn dù CS trống.

🔁 **Dừng lại tự kiểm tra:**

Giải pháp dùng biến `turn = 0/1`: Thread 0 vào CS khi `turn == 0`, thread 1 vào khi `turn == 1`. Sau khi ra, mỗi thread gán `turn` cho bên kia. Giải pháp này có vi phạm yêu cầu nào không?

<details>
<summary>Đáp án</summary>

Vi phạm **Progress**. Nếu Thread 0 không muốn vào CS nữa (đã hoàn thành việc của mình), nó giữ `turn = 1`. Thread 1 muốn vào CS nhưng phải chờ Thread 0 đặt `turn = 1`. Mà Thread 0 không bao giờ đặt nữa → Thread 1 chờ mãi mãi dù CS trống. Quyết định cho phép không được đưa ra → vi phạm Progress.
</details>

📝 **Tóm tắt mục 2:**
- Critical section = đoạn code truy cập tài nguyên chia sẻ — cần bảo vệ.
- 3 yêu cầu: Mutual Exclusion (1 thread tại 1 thời điểm) + Progress (không treo khi CS trống) + Bounded Waiting (không chờ vô hạn).
- Ba yêu cầu phải thoả mãn **đồng thời** — thiếu một thì giải pháp không đầy đủ.

---

## 3. Lệnh Nguyên Tử & Mutex

### 3.1. Tại sao cần lệnh nguyên tử?

Vấn đề cốt lõi: mọi giải pháp bằng phần mềm thuần (dùng biến thông thường) đều có thể bị preempt **giữa các bước kiểm tra và ghi**. Cần có **lệnh nguyên tử (atomic instruction)** — lệnh mà CPU thực hiện như một đơn vị không thể bị ngắt hay quan sát ở trạng thái giữa chừng.

### 3.2. Test-And-Set (TAS)

**Test-And-Set** là lệnh phần cứng nguyên tử hoạt động như sau:

```
// Mã giả — TAS thực ra là một lệnh CPU duy nhất
function TestAndSet(target *bool) bool:
    old = *target       // đọc giá trị cũ
    *target = true      // đặt thành true
    return old          // trả về giá trị cũ
    // Ba bước trên thực hiện NGUYÊN TỬ — không thể bị preempt giữa chừng
```

**Dùng TAS để implement spinlock:**

```go
// lock = false: khóa mở    lock = true: khóa đóng
var lock bool = false

// Vào critical section:
for TestAndSet(&lock) { /* spin — bận chờ */ }
// → vòng lặp thoát khi TAS trả về false (khóa mở) VÀ đặt lock=true

// Trong critical section...

// Ra critical section:
lock = false
```

**Walk-through với 2 thread (lock ban đầu = false):**

```
Thread A                        Thread B                    lock
────────────────────────────────────────────────────────────────
TAS(&lock) → trả về false, set lock=true                   true
// A vào CS ─────────────────────────────────────────────────────
                                TAS(&lock) → trả về true   true
                                // trả true → spin          true
                                TAS(&lock) → trả về true   true
                                // spin tiếp...             true
// A ra CS: lock = false                                    false
                                TAS(&lock) → trả về false, set true
                                // B vào CS                 true
```

### 3.3. Spinlock vs Blocking Lock

| | Spinlock (busy-wait) | Blocking Lock (mutex) |
|---|---|---|
| **Cơ chế chờ** | Thread liên tục kiểm tra (`while loop`) — tiêu tốn CPU | Thread ngủ (sleep), OS đánh thức khi khóa mở |
| **Độ trễ** | Rất thấp — không cần context switch | Cao hơn — cần context switch để ngủ và đánh thức |
| **CPU khi chờ** | Chiếm 100% CPU core đó | Giải phóng CPU cho thread khác |
| **Thích hợp** | Thời gian chờ **rất ngắn** (microsecond) — kernel, interrupt handler | Thời gian chờ **lâu hơn** — ứng dụng user-space |
| **Ví dụ** | Linux kernel spinlock | `sync.Mutex` trong Go, `pthread_mutex_t` trong C |

💡 **Trực giác:** Spinlock như người đứng trước cửa gõ liên tục; blocking lock như người để lại số điện thoại rồi về nhà — khi cửa mở mới được gọi lại. Nếu cửa mở trong vài giây, gõ cửa nhanh hơn; nếu phải chờ cả tiếng, về nhà chờ gọi sẽ tốt hơn.

### 3.4. Mutex trong Go

```go
var mu sync.Mutex
var count int

func increment() {
    defer wg.Done()
    for i := 0; i < 100000; i++ {
        mu.Lock()      // entry section — blocking
        count++        // critical section — an toàn
        mu.Unlock()    // exit section
    }
}
```

`sync.Mutex` trong Go là **blocking mutex**: khi không lấy được khóa, goroutine bị suspend, scheduler chạy goroutine khác. Khi khóa được giải phóng, goroutine bị đánh thức.

⚠ **Lỗi thường gặp — Quên Unlock:**

```go
mu.Lock()
if err != nil {
    return err  // BUG: quên Unlock trước khi return!
}
mu.Unlock()
```

Dùng `defer mu.Unlock()` ngay sau `mu.Lock()` để đảm bảo luôn unlock kể cả khi panic hoặc early return.

📝 **Tóm tắt mục 3:**
- Test-And-Set: lệnh CPU nguyên tử đọc + ghi trong một bước — nền tảng của mọi lock phần mềm.
- Spinlock: chờ bằng vòng lặp — nhanh nhưng tốn CPU. Dùng cho thời gian chờ cực ngắn.
- Blocking mutex: thread ngủ khi chờ — nhẹ nhàng hơn. Dùng cho ứng dụng user-space thông thường.
- Trong Go: `sync.Mutex` + `defer mu.Unlock()`.

---

## 4. Thuật toán Peterson (2 tiến trình)

### 4.1. Giới thiệu

Thuật toán Peterson là giải pháp **phần mềm thuần** (không cần lệnh phần cứng đặc biệt) cho bài toán critical section với **2 thread/process**. Được đề xuất năm 1981. Tuy không còn dùng trực tiếp trong thực tế (do vấn đề memory reordering của CPU hiện đại), thuật toán Peterson có giá trị giáo dục lớn vì nó thoả mãn đủ 3 yêu cầu.

### 4.2. Thuật toán

Dùng hai biến chia sẻ:

```
flag[2]: mảng boolean — flag[i] = true nghĩa là process i muốn vào CS
turn:    biến int — turn = i nghĩa là "đến lượt process i"
```

**Code cho Process i (process kia là j = 1 - i):**

```
// Entry section:
flag[i] = true          // "Tôi muốn vào"
turn = j                // "Nhưng đến lượt bạn trước"

while (flag[j] == true AND turn == j):
    // chờ — busy wait

// Critical section...

// Exit section:
flag[i] = false         // "Tôi đã xong, nhường bạn"
```

### 4.3. Walk-through — Kiểm tra 3 yêu cầu

**Kịch bản 1 — Cả hai cùng vào lúc nhau:**

```
P0:                         P1:                      flag[0]  flag[1]  turn
────────────────────────────────────────────────────────────────────────────
flag[0] = true                                          true     false    ?
turn = 1                                                true     false    1
                            flag[1] = true              true     true     1
                            turn = 0                    true     true     0
// P0 kiểm tra: flag[1]==true VÀ turn==1? → turn==0 (false) → THOÁT vòng lặp
// P0 vào CS ─────────────────────────────────────────────────────────────────
                            // P1 kiểm tra: flag[0]==true VÀ turn==0? → TRUE
                            // P1 CHỜ
flag[0] = false             // P0 ra CS               false     true     0
                            // P1 kiểm tra: flag[0]==false → THOÁT vòng lặp
                            // P1 vào CS
```

**Kịch bản 2 — Chỉ P0 muốn vào:**

```
P0: flag[0]=true, turn=1
// Kiểm tra: flag[1]==false → thoát ngay (P1 không muốn vào) → P0 vào CS
// ✓ Progress: CS trống, P0 được vào ngay
```

**Kiểm tra 3 yêu cầu:**

| Yêu cầu | Thoả mãn? | Giải thích |
|---------|-----------|-----------|
| Mutual Exclusion | ✓ | Để cả P0 và P1 vào CS cùng lúc, cần `turn == 0` AND `turn == 1` — bất khả thi vì `turn` chỉ có một giá trị |
| Progress | ✓ | Nếu P1 không muốn vào (`flag[1] = false`), điều kiện while của P0 sai ngay → P0 vào được |
| Bounded Waiting | ✓ | Sau khi P0 vào CS và ra, P1 phải chờ tối đa 1 lần P0 vào trước. `turn` đảm bảo không có thread nào bị bỏ qua liên tiếp |

⚠ **Hạn chế của Peterson trong thực tế:** CPU hiện đại có thể **reorder** các lệnh ghi bộ nhớ để tối ưu hiệu năng. `flag[i] = true; turn = j` có thể bị thực thi theo thứ tự ngược lại ở cấp độ phần cứng — phá vỡ thuật toán. Giải quyết bằng **memory barrier/fence** — chỉ lệnh phần cứng mới đảm bảo được ordering. Đây là lý do mutex trong OS đều dùng lệnh phần cứng nguyên tử.

🔁 **Dừng lại tự kiểm tra:**

Trong thuật toán Peterson, nếu P0 thực hiện `flag[0] = true` rồi bị preempt ngay (chưa kịp làm `turn = 1`), P1 muốn vào CS thì chuyện gì xảy ra?

<details>
<summary>Đáp án</summary>

P1 thực hiện `flag[1] = true; turn = 0`. Kiểm tra vòng lặp: `flag[0] == true` (đúng) **VÀ** `turn == 0` (đúng) → P1 chờ. Điều này đúng — P0 đang "muốn vào" (flag[0]=true) mặc dù chưa làm xong entry section. Khi P0 tiếp tục, nó đặt `turn = 1`, rồi kiểm tra: `flag[1] == true` VÀ `turn == 1` → P0 cũng chờ! Lúc này `turn = 1` (lần cuối được đặt là bởi P0), nên điều kiện P1 là `flag[0]==true AND turn==0` → `turn==0` là false → P1 thoát vòng lặp và vào CS. Mutual exclusion vẫn đảm bảo.
</details>

📝 **Tóm tắt mục 4:**
- Peterson dùng `flag[]` (ý định) + `turn` (lịch sự nhường nhau).
- Thoả mãn đủ 3 yêu cầu — nhưng chỉ cho 2 thread, và cần memory ordering đảm bảo.
- Giá trị chính: hiểu rõ tại sao 3 yêu cầu đều cần thiết và cách thoả mãn từng cái.

---

## 5. Tổng quan về các cơ chế đồng bộ hoá

| Cơ chế | Cấp độ | Đặc điểm | Bài học chi tiết |
|--------|--------|----------|----------------|
| Mutex (Mutual Exclusion Lock) | User-space | Blocking, 1 owner tại 1 thời điểm | Mục 3 bài này |
| Spinlock | Kernel / low-level | Busy-wait, rất nhanh, tốn CPU | Mục 3 bài này |
| Semaphore | User + Kernel | Biến đếm, wait/signal | [Lesson 06](../lesson-06-semaphores-classic-problems/) |
| Condition Variable | User-space | Ngủ chờ điều kiện, dùng kèm mutex | [Lesson 06](../lesson-06-semaphores-classic-problems/) |
| Monitor | Ngôn ngữ lập trình | Kết hợp mutex + condition variable | [Lesson 06](../lesson-06-semaphores-classic-problems/) |

---

## Bài tập

**Bài 1 — Nhận biết race condition.**

Đoạn code Go sau có race condition không? Nếu có, chỉ ra đúng dòng nào và giải thích cơ chế gây lỗi.

```go
var balance int = 1000

func deposit(amount int, wg *sync.WaitGroup) {
    defer wg.Done()
    for i := 0; i < 1000; i++ {
        balance = balance + amount
    }
}

func main() {
    var wg sync.WaitGroup
    wg.Add(2)
    go deposit(100, &wg)
    go deposit(200, &wg)
    wg.Wait()
    fmt.Println(balance)
}
```

---

**Bài 2 — Walk-through load/add/store.**

Hai thread A và B cùng chạy `x += 5` với `x = 10`. Liệt kê một kịch bản cụ thể (dãy lệnh LOAD/ADD/STORE xen kẽ) cho kết quả sai `x = 15` thay vì `x = 20`.

---

**Bài 3 — Kiểm tra 3 yêu cầu.**

Giải pháp sau dùng cho 2 thread (T0 và T1), biến chia sẻ là `lock` (0 = mở, 1 = đóng):

```
// Thread Ti muốn vào:
while (lock == 1) {}   // chờ
lock = 1               // đóng
// Critical section
lock = 0               // mở
```

Giải pháp này có vi phạm yêu cầu nào không? Cho ví dụ cụ thể nếu có.

---

**Bài 4 — Spinlock hay Blocking Lock?**

Trong mỗi tình huống sau, spinlock hay blocking lock phù hợp hơn? Giải thích:

(a) Kernel interrupt handler cần bảo vệ một biến được cập nhật trong < 10 nanosecond.

(b) Web server: goroutine đọc file từ đĩa (mất vài millisecond) rồi ghi vào biến shared.

(c) Database: transaction lock cho một row, có thể bị giữ vài giây.

---

**Bài 5 — Peterson cho P1.**

Viết đầy đủ thuật toán Peterson cho **P1** (process 1), biết P0 đã được viết trong mục 4. Kiểm tra kịch bản P1 vào CS khi P0 đang trong CS.

---

## Lời giải chi tiết

**Bài 1 — Nhận biết race condition**

Có race condition tại dòng `balance = balance + amount`.

Dòng này biên dịch thành 3 bước: LOAD (đọc `balance`), ADD (cộng `amount`), STORE (ghi lại). Khi hai goroutine chạy đồng thời:

1. Goroutine A load `balance = 1000`.
2. Goroutine B load `balance = 1000` (chưa thấy cập nhật của A).
3. A tính `1000 + 100 = 1100`, store `balance = 1100`.
4. B tính `1000 + 200 = 1200`, store `balance = 1200`.

Cập nhật của A bị mất. Sau 1000 lần mỗi goroutine, kết quả không xác định.

Sửa: bảo vệ bằng `sync.Mutex`:
```go
var mu sync.Mutex
mu.Lock()
balance = balance + amount
mu.Unlock()
```

Hoặc dùng `sync/atomic` nếu chỉ thao tác đơn giản.

---

**Bài 2 — Walk-through load/add/store**

```
Thread A (x += 5)          Thread B (x += 5)          x
─────────────────────────────────────────────────────────
LOAD  rA, x  → rA = 10                                 10
                            LOAD  rB, x  → rB = 10     10
ADD   rA, 5  → rA = 15
STORE x, rA                                            15
                            ADD   rB, 5  → rB = 15
                            STORE x, rB                15  ← x = 15, đúng ra phải là 20
```

Thread B load giá trị cũ (`x = 10`) trước khi A ghi kết quả. B tính xong và ghi đè lên giá trị của A. Một lần cộng 5 bị mất.

---

**Bài 3 — Kiểm tra 3 yêu cầu**

Giải pháp vi phạm **Mutual Exclusion**.

Kịch bản:
1. T0 kiểm tra `lock == 1` → false (lock = 0) → thoát vòng lặp.
2. T0 bị preempt **trước khi** thực hiện `lock = 1`.
3. T1 kiểm tra `lock == 1` → false → thoát vòng lặp.
4. T1 thực hiện `lock = 1`.
5. T1 vào Critical Section.
6. T0 tiếp tục: thực hiện `lock = 1` → vào Critical Section.

Kết quả: **cả T0 và T1 đều trong CS cùng lúc** — vi phạm Mutual Exclusion.

Vấn đề: "kiểm tra" và "đặt khóa" là hai bước riêng biệt, có thể bị xen kẽ. Giải pháp: dùng lệnh nguyên tử Test-And-Set hoặc thuật toán Peterson.

---

**Bài 4 — Spinlock hay Blocking Lock?**

**(a) Kernel interrupt handler, < 10 nanosecond:** Spinlock. Thời gian chờ cực ngắn (< microsecond), context switch sẽ mất thời gian hơn việc spin. Hơn nữa, trong interrupt context, blocking không cho phép (kernel không thể ngủ trong interrupt handler).

**(b) Web server, đọc file vài millisecond:** Blocking lock (mutex). Thời gian chờ hàng millisecond — nếu spin, goroutine chiếm CPU liên tục trong cả khoảng thời gian đó, các goroutine khác không chạy được. Mutex cho phép goroutine ngủ, nhường CPU.

**(c) Database, transaction vài giây:** Blocking lock, thậm chí cần cơ chế phức tạp hơn (lock với timeout, deadlock detection). Giữ spin hàng giây là không thể — lãng phí CPU hoàn toàn.

---

**Bài 5 — Peterson cho P1**

```
// Biến chia sẻ:
flag[2] = {false, false}
turn = 0 hoặc 1 (giá trị ban đầu bất kỳ)

// Code cho P1 (i=1, j=0):
// Entry section:
flag[1] = true           // "Tôi muốn vào"
turn = 0                 // "Nhường P0 trước"
while (flag[0] == true AND turn == 0):
    // chờ busy-wait
// Critical section...
// Exit section:
flag[1] = false
```

**Kiểm tra khi P0 đang trong CS:**

Giả sử P0 đang trong CS: `flag[0] = true`, P0 đã vượt qua while của nó nên `turn != 0` (tức là `turn = 1`, do P0 đã đặt `turn = 1` trong entry section của nó, hoặc `flag[1] == false`).

P1 muốn vào: đặt `flag[1] = true; turn = 0`.

Vòng while của P1: `flag[0] == true` (đúng) **VÀ** `turn == 0` (đúng) → P1 **chờ**.

Khi P0 ra CS: `flag[0] = false`.

Vòng while của P1: `flag[0] == false` → điều kiện sai → P1 **thoát vòng lặp, vào CS**.

Kết quả: mutual exclusion đảm bảo.

---

## Liên kết và bài tiếp theo

- Tiền đề:
  - [Lesson 03 — Luồng & Tương tranh](../lesson-03-threads-concurrency/): thread, chia sẻ bộ nhớ, context switch.
  - [Lesson 04 — Lập lịch CPU](../lesson-04-cpu-scheduling/): preemption — lý do thread bị gián đoạn giữa LOAD và STORE.
- Bài tiếp theo:
  - [Lesson 06 — Semaphore & bài toán kinh điển](../lesson-06-semaphores-classic-problems/): semaphore tổng quát hoá mutex, giải bài toán producer-consumer, readers-writers, dining philosophers.
  - [Lesson 07 — Deadlock](../lesson-07-deadlock/): khi mutex dùng sai → các thread khoá lẫn nhau vĩnh viễn.

---

## 📝 Tổng kết Lesson 05

1. **Race condition** = kết quả không xác định khi nhiều thread cùng truy cập dữ liệu chia sẻ và ít nhất một bên ghi. Gốc rễ: `count++` thực ra là 3 bước riêng biệt có thể bị xen kẽ.
2. **Critical section** cần 3 yêu cầu đồng thời: Mutual Exclusion (1 thread tại 1 thời điểm) + Progress (không treo khi CS trống) + Bounded Waiting (không chờ vô hạn).
3. **Test-And-Set** là lệnh nguyên tử phần cứng: đọc + ghi trong một bước — nền tảng của mọi lock hiện đại.
4. **Spinlock** phù hợp với chờ cực ngắn (kernel); **blocking mutex** phù hợp với ứng dụng thông thường.
5. **Thuật toán Peterson**: giải pháp phần mềm thuần cho 2 thread — thoả mãn đủ 3 yêu cầu nhưng cần memory barrier trong CPU hiện đại.
6. Trong Go: `sync.Mutex` + `defer mu.Unlock()` là pattern chuẩn.
