// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: OperatingSystems/01-Foundations-Processes/lesson-06-semaphores-classic-problems/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 06 — Semaphore & Bài toán kinh điển

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Giải thích được **semaphore** là gì: biến đếm + hai thao tác wait(P) và signal(V) — không bị nhầm với mutex.
- Phân biệt **semaphore nhị phân** (binary, 0/1) và **semaphore đếm** (counting, ≥ 0).
- Walk-through giá trị semaphore qua một chuỗi thao tác cụ thể.
- Giải bài toán **producer-consumer** (bounded buffer) dùng 3 semaphore: \`mutex\`, \`empty\`, \`full\`.
- Giải bài toán **readers-writers** — ưu tiên readers và hạn chế starvation.
- Giải thích bài toán **dining philosophers** (5 triết gia): vì sao deadlock xảy ra, cách phá bằng 2 chiến lược khác nhau.

## Kiến thức tiền đề

- [Lesson 05 — Đồng bộ hoá (Synchronization)](../lesson-05-synchronization/): race condition, critical section, 3 yêu cầu, mutex, Test-And-Set.

---

## 1. Semaphore là gì?

### 1.1. Định nghĩa và trực giác

💡 **Trực giác — Semaphore như vé vào bãi đậu xe:**
Bãi đậu xe có 5 chỗ. Tại cổng có một bảng đếm "số chỗ còn trống". Xe vào: bảng giảm 1 (\`wait\`). Xe ra: bảng tăng 1 (\`signal\`). Nếu bảng = 0, xe đến phải xếp hàng chờ ở ngoài — không vào ngay được.

**Semaphore** là một biến nguyên (integer) được bảo vệ bởi 2 thao tác nguyên tử:

| Thao tác | Tên | Ngữ nghĩa |
|---------|-----|----------|
| **wait(S)** còn gọi là **P(S)** | Từ "Proberen" (thử) — tiếng Hà Lan | Giảm S đi 1. Nếu S < 0 thì thread bị block (ngủ chờ). |
| **signal(S)** còn gọi là **V(S)** | Từ "Verhogen" (tăng) | Tăng S lên 1. Nếu có thread đang chờ, đánh thức một thread. |

**Định nghĩa hình thức:**

\`\`\`
wait(S):
    S = S - 1
    if S < 0:
        // Thêm thread này vào hàng đợi của S
        block()   // Thread ngủ

signal(S):
    S = S + 1
    if S <= 0:
        // Có thread đang chờ (vì S còn ≤ 0 trước khi tăng)
        wakeup(thread_from_queue)
\`\`\`

❓ **Câu hỏi tự nhiên của người đọc:**

- *"Semaphore khác mutex như thế nào?"* — Mutex = semaphore nhị phân có quy tắc "chỉ thread giữ mutex mới được unlock". Semaphore tổng quát hơn: một thread có thể signal semaphore mà không cần là người wait. Semaphore cũng có thể dùng để báo hiệu (signaling) giữa các thread, không chỉ mutual exclusion.
- *"S âm có nghĩa gì?"* — Giá trị âm của S = số thread đang bị block chờ. Ví dụ: S = -3 nghĩa là 3 thread đang chờ vào.
- *"wait/P và signal/V — tên nghe kỳ, có cách nhớ nào không?"* — Nhớ đơn giản: **P = "Please wait"** (xin chờ, giảm), **V = "Vacate" / "Voilà, done"** (xong rồi nhường, tăng).

### 1.2. Walk-through giá trị semaphore

**Ví dụ: Semaphore S = 3 (3 tài nguyên dùng chung)**

\`\`\`
Thao tác           S trước → S sau     Kết quả
──────────────────────────────────────────────────────
Khởi tạo                               S = 3
Thread A: wait(S)  3 → 2              A vào, S=2
Thread B: wait(S)  2 → 1              B vào, S=1
Thread C: wait(S)  1 → 0              C vào, S=0
Thread D: wait(S)  0 → -1             D BỊ BLOCK, S=-1
Thread E: wait(S)  -1 → -2            E BỊ BLOCK, S=-2
Thread A: signal(S) -2 → -1           D được đánh thức, S=-1
Thread B: signal(S) -1 → 0            E được đánh thức, S=0
Thread C: signal(S) 0 → 1             Không ai chờ, S=1
\`\`\`

Sau 3 signal: S = 1, D và E đã vào, C ra — hệ thống trở lại bình thường.

### 1.3. Semaphore nhị phân vs Semaphore đếm

| Loại | Giá trị | Dùng để |
|------|---------|---------|
| **Nhị phân (binary)** | 0 hoặc 1 | Mutual exclusion — thay thế mutex |
| **Đếm (counting)** | ≥ 0 (hoặc âm khi có thread chờ) | Kiểm soát số lượng tài nguyên dùng đồng thời |

⚠ **Lỗi thường gặp — Gọi signal trước wait:**

\`\`\`
// SAI: signal trước wait → S = 2 rồi wait chỉ về 1 → không bảo vệ được
signal(mutex)   // ← lẽ ra phải là wait(mutex)
...critical section...
wait(mutex)     // ← lẽ ra phải là signal(mutex)
\`\`\`

Đảo thứ tự \`wait\` và \`signal\` là lỗi phổ biến gây mất mutual exclusion hoặc deadlock.

🔁 **Dừng lại tự kiểm tra:**

Semaphore S = 1. Thread A gọi \`wait(S)\`, rồi Thread B gọi \`wait(S)\`. Giá trị S là bao nhiêu? Thread nào bị block?

<details>
<summary>Đáp án</summary>

Sau \`wait(S)\` của A: S = 1 - 1 = **0**. A không bị block.
Sau \`wait(S)\` của B: S = 0 - 1 = **-1**. S < 0 → B bị block.
S = **-1**. Thread **B** bị block. Thread A đang dùng tài nguyên.
</details>

📝 **Tóm tắt mục 1:**
- Semaphore: biến đếm nguyên tử + wait (giảm/block) + signal (tăng/đánh thức).
- S < 0 → số thread đang chờ = |S|.
- Binary semaphore (0/1) ≈ mutex. Counting semaphore = kiểm soát N tài nguyên.
- P = wait (vào), V = signal (ra).

---

## 2. Bài toán Producer-Consumer (Bounded Buffer)

### 2.1. Bài toán

💡 **Trực giác:** Nhà máy (producer) đóng hàng vào kho có sức chứa 5 ô (buffer). Xe tải (consumer) lấy hàng ra khỏi kho. Nếu kho đầy, nhà máy phải đợi. Nếu kho rỗng, xe tải phải đợi. Hai bên phải không va chạm khi cùng truy cập kho.

**Yêu cầu:**
1. Producer không được ghi vào buffer đầy.
2. Consumer không được đọc từ buffer rỗng.
3. Không được có race condition khi truy cập buffer.

### 2.2. Giải pháp — 3 Semaphore

\`\`\`
n = kích thước buffer (ví dụ n = 5)

Khởi tạo:
  mutex = 1        // semaphore nhị phân — bảo vệ truy cập buffer
  empty = n        // n ô trống ban đầu — producer chờ khi = 0
  full  = 0        // 0 ô đầy ban đầu  — consumer chờ khi = 0
\`\`\`

**Code Producer:**

\`\`\`
loop:
    // Tạo item mới
    wait(empty)     // Chờ có ô trống (empty - 1)
    wait(mutex)     // Lấy khóa truy cập buffer
    buffer[in] = item
    in = (in + 1) % n
    signal(mutex)   // Nhả khóa
    signal(full)    // Báo có thêm 1 ô đầy (full + 1)
\`\`\`

**Code Consumer:**

\`\`\`
loop:
    wait(full)      // Chờ có ô đầy (full - 1)
    wait(mutex)     // Lấy khóa
    item = buffer[out]
    out = (out + 1) % n
    signal(mutex)   // Nhả khóa
    signal(empty)   // Báo có thêm 1 ô trống (empty + 1)
    // Dùng item
\`\`\`

### 2.3. Walk-through — Buffer 2 ô, 1 Producer, 1 Consumer

Khởi tạo: \`mutex=1, empty=2, full=0\`, buffer = \`[_, _]\`.

\`\`\`
Thao tác                              mutex  empty  full  buffer
───────────────────────────────────────────────────────────────────
P: wait(empty)   → 2-1=1              1      1      0     [_, _]
P: wait(mutex)   → 1-1=0              0      1      0     [_, _]
P: buffer[0] = A                      0      1      0     [A, _]
P: signal(mutex) → 0+1=1              1      1      0     [A, _]
P: signal(full)  → 0+1=1              1      1      1     [A, _]
C: wait(full)    → 1-1=0              1      1      0     [A, _]
C: wait(mutex)   → 1-1=0              0      1      0     [A, _]
C: item = buffer[0] = A               0      1      0     [_, _]
C: signal(mutex) → 0+1=1              1      1      0     [_, _]
C: signal(empty) → 1+1=2              1      2      0     [_, _]
\`\`\`

Kết quả: Consumer lấy được item A, buffer về rỗng. Vòng tiếp tục.

❓ **Câu hỏi tự nhiên của người đọc:**

- *"Vì sao phải wait(empty) trước wait(mutex), không đổi thứ tự được không?"* — **Không được**. Nếu Producer wait(mutex) trước wait(empty): khi buffer đầy, Producer giữ mutex rồi mới bị block ở wait(empty). Consumer cần mutex để lấy đồ ra nhưng không được → **deadlock**. Phải đặt điều kiện (empty/full) trước khóa (mutex).
- *"Nếu có nhiều producer và nhiều consumer?"* — Cùng giải pháp, không cần thay đổi. \`mutex\` đảm bảo chỉ 1 thread thao tác buffer tại 1 thời điểm, dù có bao nhiêu producer/consumer.

📝 **Tóm tắt mục 2:**
- Producer-Consumer cần 3 semaphore: \`mutex\` (bảo vệ truy cập), \`empty\` (đếm ô trống), \`full\` (đếm ô đầy).
- Thứ tự bắt buộc: wait(điều-kiện) → wait(mutex) → ... → signal(mutex) → signal(điều-kiện).
- Đảo thứ tự → deadlock.

---

## 3. Bài toán Readers-Writers

### 3.1. Bài toán

💡 **Trực giác:** Thư viện có một cuốn sổ đăng ký. Nhiều người đọc (reader) có thể cùng đọc đồng thời. Người ghi (writer) cần độc quyền — không ai được đọc hay ghi khác trong lúc ghi.

**Yêu cầu:**
1. Nhiều reader có thể đọc **cùng lúc**.
2. Writer cần độc quyền — khi writer ghi, không reader nào được đọc.
3. Không có starvation (writer không chờ vô hạn trong giải pháp ưu tiên reader).

### 3.2. Giải pháp — Ưu tiên Reader

\`\`\`
Khởi tạo:
  mutex   = 1    // bảo vệ biến readCount
  wrt     = 1    // độc quyền ghi — writer/reader-đầu tiên dùng
  readCount = 0  // số reader đang đọc
\`\`\`

**Code Reader:**

\`\`\`
wait(mutex)               // bảo vệ readCount
readCount = readCount + 1
if readCount == 1:
    wait(wrt)             // Reader đầu tiên: ngăn writer vào
signal(mutex)

// ĐỌC DỮ LIỆU...

wait(mutex)
readCount = readCount - 1
if readCount == 0:
    signal(wrt)           // Reader cuối: cho phép writer vào
signal(mutex)
\`\`\`

**Code Writer:**

\`\`\`
wait(wrt)        // Chờ không có ai đang đọc hoặc ghi
// GHI DỮ LIỆU...
signal(wrt)
\`\`\`

❓ **Câu hỏi tự nhiên của người đọc:**

- *"Vì sao cần 2 semaphore mutex và wrt?"* — \`mutex\` bảo vệ biến \`readCount\` (biến chia sẻ, dễ bị race condition). \`wrt\` là cổng chính giữa reader và writer. Hai vai trò khác nhau → cần 2 semaphore.
- *"Giải pháp này có vấn đề gì?"* — Writer có thể bị **starvation**: nếu reader cứ đến liên tục, \`readCount\` không bao giờ về 0, writer chờ mãi. Giải pháp ưu tiên writer phức tạp hơn — khi writer muốn vào, reader mới đến phải đợi, dù reader cũ vẫn đọc xong.

📝 **Tóm tắt mục 3:**
- Readers-Writers: nhiều reader đồng thời OK, writer độc quyền.
- Dùng \`readCount\` + \`mutex\` + \`wrt\`. Reader đầu/cuối quản lý semaphore \`wrt\`.
- Ưu tiên reader → writer có thể bị starvation.

---

## 4. Bài toán Dining Philosophers (5 Triết gia)

### 4.1. Bài toán

💡 **Trực giác:** 5 triết gia ngồi quanh bàn tròn. Giữa mỗi cặp triết gia có 1 chiếc đũa — tổng cộng 5 đũa. Triết gia cần **2 đũa** (trái và phải) để ăn. Khi không ăn, triết gia ngồi suy nghĩ.

**Vấn đề:** Mỗi triết gia cùng lúc cầm đũa trái → tất cả chờ đũa phải → **deadlock**.

Đây là bài toán mô hình hóa tình huống: N process cần N tài nguyên, mỗi process cần 2, phân bổ không cẩn thận → deadlock.

### 4.2. Walk-through Deadlock

\`\`\`
Triết gia  Trạng thái    Cầm        Chờ
─────────────────────────────────────────────
T0         Đói           Đũa 0      Đũa 1
T1         Đói           Đũa 1      Đũa 2
T2         Đói           Đũa 2      Đũa 3
T3         Đói           Đũa 3      Đũa 4
T4         Đói           Đũa 4      Đũa 0
\`\`\`

Mỗi triết gia cầm đũa trái mình → chờ đũa phải → đũa phải đang bị triết gia bên phải cầm → **chu trình chờ đợi tròn → deadlock**.

### 4.3. Giải pháp 1 — Semaphore đơn giản (vẫn deadlock)

\`\`\`
chopstick[5] = {1, 1, 1, 1, 1}  // mỗi đũa là semaphore = 1

// Triết gia i:
think()
wait(chopstick[i])          // cầm đũa trái
wait(chopstick[(i+1)%5])    // cầm đũa phải
eat()
signal(chopstick[i])
signal(chopstick[(i+1)%5])
\`\`\`

Giải pháp này **có thể deadlock** theo kịch bản ở mục 4.2.

### 4.4. Giải pháp 2 — Phá vòng bằng bất đối xứng

Triết gia thứ 4 (T4) cầm ngược chiều: cầm đũa **phải** trước, rồi đũa trái.

\`\`\`
// Triết gia i (i = 0, 1, 2, 3):
wait(chopstick[i])
wait(chopstick[(i+1)%5])

// Triết gia T4 (bất đối xứng):
wait(chopstick[0])    // cầm đũa 0 (phải của T4) trước
wait(chopstick[4])    // rồi mới cầm đũa 4 (trái của T4)
\`\`\`

**Tại sao phá được deadlock?** Trong kịch bản tất cả cùng cầm đũa trái, T4 sẽ cầm đũa 0. Nhưng T0 cũng muốn đũa 0 (đũa trái của T0). Một trong hai phải chờ — **chu trình bị phá**. Không thể có tình trạng mỗi người cầm đúng 1 đũa và chờ đúng 1 đũa đang bị người khác cầm.

### 4.5. Giải pháp 3 — Chỉ cho phép tối đa N-1 triết gia ngồi đồng thời

\`\`\`
room = semaphore(4)  // chỉ 4 triết gia được "ngồi vào bàn" tại 1 lúc

// Triết gia i:
wait(room)
wait(chopstick[i])
wait(chopstick[(i+1)%5])
eat()
signal(chopstick[i])
signal(chopstick[(i+1)%5])
signal(room)
\`\`\`

Với ≤ 4 triết gia ngồi, tổng đũa đang cầm ≤ 4 < 5 → ít nhất 1 đũa rảnh → ít nhất 1 triết gia có thể lấy đũa thứ hai → **không deadlock**.

⚠ **Lỗi thường gặp — Nghĩ rằng semaphore đủ để chống deadlock:** Semaphore chỉ giúp mutual exclusion và synchronization. Deadlock xảy ra khi **phân bổ tài nguyên** không đúng cách. Cần phải thiết kế thứ tự cầm đũa (hay tài nguyên) cẩn thận.

🔁 **Dừng lại tự kiểm tra:**

Trong giải pháp "chỉ N-1 triết gia" (N=5), giả sử 4 triết gia ngồi và mỗi người cầm 1 đũa. Tổng số đũa đang bị giữ là bao nhiêu? Còn lại bao nhiêu đũa tự do?

<details>
<summary>Đáp án</summary>

4 triết gia, mỗi người cầm 1 đũa → **4 đũa đang bị giữ**. Tổng có 5 đũa → **1 đũa tự do**. Triết gia đang đói sẽ có thể cầm đũa thứ hai ngay (vì 1 đũa tự do), ăn xong, thả ra đũa → triết gia khác tiếp tục. Không deadlock.
</details>

📝 **Tóm tắt mục 4:**
- Dining philosophers: 5 triết gia, 5 đũa, mỗi người cần 2 đũa — mô hình deadlock điển hình.
- Giải pháp naive: mỗi người cầm trái rồi phải → deadlock tiềm tàng.
- Phá deadlock: bất đối xứng (T4 cầm ngược) HOẶC giới hạn N-1 người ngồi.
- Deadlock cần thiết kế phân bổ tài nguyên — semaphore chỉ là công cụ.

---

## Bài tập

**Bài 1 — Walk-through semaphore.**

Semaphore S khởi tạo = 2. Thứ tự thao tác:
\`\`\`
T1: wait(S)
T2: wait(S)
T3: wait(S)
T1: signal(S)
T3: signal(S) [T3 bị block — liệu T3 có thể gọi signal không?]
T2: signal(S)
\`\`\`

Theo dõi giá trị S và trạng thái (running/blocked) của từng thread sau mỗi thao tác.

---

**Bài 2 — Producer-Consumer, thứ tự sai.**

Giải thích tại sao đoạn code producer sau gây deadlock khi buffer đầy:

\`\`\`
// Producer (SAI):
wait(mutex)
wait(empty)
buffer[in] = item
in = (in + 1) % n
signal(mutex)
signal(full)
\`\`\`

---

**Bài 3 — Readers-Writers.**

Trong giải pháp Readers-Writers ưu tiên reader: có 3 reader (R1, R2, R3) đang đọc đồng thời và 1 writer (W) muốn ghi. Theo dõi giá trị \`readCount\`, \`mutex\`, \`wrt\` khi:

(a) W gọi \`wait(wrt)\`.
(b) R1 đọc xong, gọi \`wait(mutex)\`, giảm \`readCount\`.
(c) R2 đọc xong.
(d) R3 đọc xong.
(e) Điều gì xảy ra sau khi R3 xong?

---

**Bài 4 — Dining Philosophers.**

5 triết gia áp dụng giải pháp naive (cầm trái rồi phải). T1 và T3 đang ăn. T0, T2, T4 đói.

(a) T0 muốn cầm đũa 0 và đũa 1. Đũa nào còn tự do?
(b) Liệu có deadlock trong tình huống này không? Giải thích.
(c) Đề xuất sắp xếp lại (mà không dùng semaphore \`room\`) để tránh deadlock.

---

## Lời giải chi tiết

**Bài 1 — Walk-through semaphore (S ban đầu = 2)**

\`\`\`
Thao tác    S trước → S sau   T1        T2        T3
────────────────────────────────────────────────────────
Khởi tạo                       ready     ready     ready    S=2
T1: wait(S)  2→1               running   ready     ready    S=1
T2: wait(S)  1→0               running   running   ready    S=0
T3: wait(S)  0→-1              running   running   BLOCKED  S=-1
T1: signal(S) -1→0             done      running   unblocked S=0
                                                   (T3 woken up)
T3: signal(S)  0→1             done      running   running  S=1
  // T3 đã được đánh thức bởi signal của T1, nên T3 có thể gọi signal
T2: signal(S)  1→2             done      done      running  S=2
\`\`\`

Lưu ý: T3 bị block sau \`wait(S)\` và được đánh thức bởi \`signal(S)\` của T1. Khi T3 được đánh thức, T3 "vào" tài nguyên (signal chỉ xảy ra sau khi T3 dùng xong tài nguyên).

---

**Bài 2 — Producer lấy mutex trước wait(empty)**

Kịch bản: buffer đầy (empty = 0).

1. Producer gọi \`wait(mutex)\`: mutex = 0 → thành công, Producer giữ mutex.
2. Producer gọi \`wait(empty)\`: empty = 0 → 0 - 1 = -1 < 0 → **Producer bị block**.
3. Producer đang ngủ nhưng **vẫn đang giữ mutex** (chưa signal(mutex)).
4. Consumer muốn lấy đồ: gọi \`wait(full)\` → ok (có đồ), gọi \`wait(mutex)\` → mutex = 0 → **Consumer bị block** chờ Producer nhả mutex.

Cả Producer lẫn Consumer đều bị block chờ nhau → **deadlock**. Producer chờ empty (cần Consumer lấy đồ), Consumer chờ mutex (cần Producer nhả). Vòng chờ kín.

---

**Bài 3 — Readers-Writers**

Khởi tạo: readCount = 3, mutex = 1, wrt = 0 (đang bị 3 reader dùng).

**(a) W gọi \`wait(wrt)\`:** wrt = 0 → 0 - 1 = -1 → **W bị block**.

**(b) R1 xong, gọi \`wait(mutex)\`:** mutex = 1 → 0. readCount = 3 - 1 = 2 ≠ 0 → không signal(wrt). R1 gọi \`signal(mutex)\` → mutex = 1.

**(c) R2 xong:** tương tự, readCount = 2 - 1 = 1. Không signal(wrt).

**(d) R3 xong:** readCount = 1 - 1 = **0**. Vì readCount = 0: gọi \`signal(wrt)\` → wrt = -1 + 1 = 0 → **W được đánh thức**.

**(e)** W được đánh thức, vào ghi dữ liệu. Khi W xong: \`signal(wrt)\` → wrt = 1. Reader mới có thể vào.

---

**Bài 4 — Dining Philosophers**

Giả sử đũa 0..4 theo vòng tròn: T0 dùng đũa 0 (trái) và 1 (phải). T1 dùng 1 và 2. T2 dùng 2 và 3. T3 dùng 3 và 4. T4 dùng 4 và 0.

T1 đang ăn → giữ đũa 1 và 2. T3 đang ăn → giữ đũa 3 và 4.

**(a)** T0 muốn cầm đũa 0 và 1. Đũa 0: T1 giữ đũa 1 và 2, T3 giữ đũa 3 và 4 → **đũa 0 tự do**. Đũa 1: **T1 đang giữ** → T0 không lấy được đũa 1.

Kết quả: T0 cầm được đũa 0, nhưng chờ đũa 1 (đang bị T1 giữ).

**(b)** Không có deadlock trong tình huống này.

Tại sao? T1 và T3 đang ăn — họ sẽ thả đũa sau khi ăn xong. Sau khi T1 thả đũa 1 và 2: T0 lấy được đũa 1 → T0 ăn. T2 lấy được đũa 2. Không có chu trình chờ kín.

Deadlock chỉ xảy ra khi **tất cả** triết gia đang đói và mỗi người cầm đúng 1 đũa (chưa cầm được cái thứ 2). Vì T1 và T3 đang ăn, không phải tình huống tất cả cùng đói.

**(c)** Đề xuất bất đối xứng (không cần semaphore \`room\`): Triết gia T4 cầm đũa 0 trước (phải), rồi đũa 4 (trái) — ngược lại với các triết gia khác. Lý do: phá chu trình vì T4 và T0 tranh đũa 0 → không thể cả 5 cùng cầm được 1 đũa và chờ 1 đũa theo vòng tròn.

---

## Liên kết và bài tiếp theo

- Tiền đề:
  - [Lesson 05 — Đồng bộ hoá](../lesson-05-synchronization/): race condition, critical section, mutex — nền tảng hiểu semaphore.
- Bài tiếp theo:
  - [Lesson 07 — Deadlock](../lesson-07-deadlock/): điều kiện Coffman, Resource-Allocation Graph, thuật toán Banker — phòng ngừa và xử lý deadlock hệ thống.
  - [Lesson 08 — IPC](../lesson-08-ipc/): các cơ chế giao tiếp giữa process — pipe, message queue, shared memory, signal.

---

## 📝 Tổng kết Lesson 06

1. **Semaphore** = biến đếm nguyên tử + P/wait (giảm/block) + V/signal (tăng/đánh thức). S < 0 → |S| thread đang chờ.
2. **Producer-Consumer** (bounded buffer): 3 semaphore — \`mutex\` (truy cập), \`empty\` (ô trống), \`full\` (ô đầy). Thứ tự: điều kiện trước, mutex sau.
3. **Readers-Writers**: reader đầu tiên lấy \`wrt\`, reader cuối cùng trả \`wrt\`. Writer dùng \`wrt\` độc quyền. Ưu tiên reader → writer có thể starvation.
4. **Dining Philosophers**: deadlock khi tất cả cùng cầm đũa trái. Phá bằng bất đối xứng (1 triết gia đổi chiều) hoặc giới hạn N-1 người ngồi đồng thời.
5. Semaphore là công cụ — phân bổ tài nguyên không đúng vẫn gây deadlock.
`;
