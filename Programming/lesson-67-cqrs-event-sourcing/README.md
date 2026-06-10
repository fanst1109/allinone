# Lesson 67 — CQRS & Event Sourcing

> **Tier 6 · Distributed & Microservices** — Thay vì lưu **trạng thái hiện tại** của dữ liệu, sẽ ra sao nếu ta lưu **toàn bộ chuỗi sự kiện đã xảy ra**? Bài này tách "ghi" khỏi "đọc" (CQRS) và biến lịch sử thành nguồn chân lý (Event Sourcing) — hai kỹ thuật mạnh nhưng dễ bị lạm dụng.

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Hiểu **CQRS (Command Query Responsibility Segregation)**: vì sao tách model ghi (command) khỏi model đọc (query), và khi nào nên/không nên tách.
- Hiểu **Event Sourcing (ES)**: lưu **chuỗi sự kiện** thay vì state hiện tại, và **dựng lại state bằng cách replay** events.
- Nắm **event store** — append-only log, immutable, là source of truth.
- Biết **rebuild state = fold/reduce events** và vì sao việc này vừa đẹp vừa nguy hiểm về hiệu năng.
- Dùng **snapshot** để khỏi replay từ đầu, và **projection** để dựng nhiều read model từ một event stream.
- Phân biệt **CQRS độc lập với ES** — có thể dùng riêng từng cái.
- Hiểu trade-off thật: **lợi** (audit, time-travel, multiple view) vs **hại** (complexity, eventual consistency, schema evolution).
- Xử lý **event versioning / upcasting** khi schema event đổi theo thời gian.
- Quyết định đúng **khi nào dùng** (banking, healthcare, domain phức tạp) và **khi nào tránh** (CRUD đơn giản).

## Kiến thức tiền đề

- [Lesson 65 — Event-Driven Architecture](../lesson-65-event-driven-architecture/README.md): event là đơn vị giao tiếp; ES đẩy ý tưởng event lên thành nguồn lưu trữ chính.
- [Lesson 66 — Saga Pattern](../lesson-66-saga-pattern/README.md): saga điều phối transaction phân tán bằng event; ES thường cung cấp chính các event đó.
- [Lesson 64 — Message Queue (NATS/Kafka)](../lesson-64-message-queue-nats-kafka/README.md): Kafka log append-only chính là một dạng event store quy mô lớn.
- [Lesson 56 — Transaction & Isolation](../lesson-56-transactions-isolation/README.md): hiểu consistency truyền thống trước khi nói về **eventual consistency**.
- [Lesson 13 — Maps](../lesson-13-maps/README.md) và [Lesson 11 — Functions](../lesson-11-functions/README.md): fold/reduce events là một hàm thuần `(state, event) -> state`.

---

## 1. Vấn đề: lưu state hay lưu lịch sử?

> 💡 **Trực giác.** Hãy nghĩ về tài khoản ngân hàng. Cách "bình thường" (CRUD) là lưu một con số: `balance = 100`. Mỗi lần giao dịch, bạn **ghi đè** con số đó. Nhưng sổ cái kế toán thật **không bao giờ làm vậy** — nó ghi từng dòng: "nạp 50", "nạp 70", "rút 20". Số dư hiện tại chỉ là **kết quả cộng dồn** của các dòng. Bạn không xoá dòng cũ; bạn chỉ thêm dòng mới. Đó chính là Event Sourcing.

Một ứng dụng CRUD điển hình lưu **trạng thái hiện tại** và cập nhật tại chỗ:

```
-- CRUD truyền thống: chỉ biết "bây giờ"
UPDATE accounts SET balance = 100 WHERE id = 'acc-1';
```

Sau câu lệnh này, **thông tin về quá khứ biến mất**. Bạn không biết balance trước đó là bao nhiêu, ai thay đổi, vì sao. Để có audit log, bạn phải tự bịa thêm bảng `account_history` — và phải nhớ ghi vào nó ở **mọi** chỗ sửa balance (rất dễ quên một chỗ).

Event Sourcing lật ngược: **state không phải thứ ta lưu, mà là thứ ta tính ra**.

```
-- Event Sourcing: lưu chuỗi sự kiện, KHÔNG lưu balance
Deposited{amount: 50}   -- balance ngầm = 50
Deposited{amount: 70}   -- balance ngầm = 120
Withdrew{amount: 20}    -- balance ngầm = 100
```

Balance hiện tại = `50 + 70 - 20 = 100` — **tính ra bằng cách replay**. Và bạn được audit log MIỄN PHÍ, vì lịch sử **chính là** dữ liệu.

> ❓ **Câu hỏi tự nhiên.**
> - *"Mỗi lần đọc balance phải cộng lại toàn bộ à? Chậm chết!"* — Đúng là vấn đề, và ta giải quyết bằng **snapshot** (mục 6) + **projection** (mục 7). Đừng lo, ES không ngây thơ replay 1 triệu event mỗi lần đọc.
> - *"Lưu hết event thì phình to vô tận?"* — Có. Đây là trade-off thật (mục 10). Đổi lại bạn có toàn bộ lịch sử — với banking/healthcare, đó là yêu cầu pháp lý, không phải lãng phí.

> 📝 **Tóm tắt mục 1.**
> - CRUD lưu **state hiện tại**, ghi đè → mất lịch sử.
> - Event Sourcing lưu **chuỗi event**, append-only → state = replay events.
> - Audit log là sản phẩm phụ tự nhiên của ES.

---

## 2. CQRS — tách Command khỏi Query

> 💡 **Trực giác.** Một nhà hàng có **bếp** (nơi nấu, phức tạp, kiểm soát chặt nguyên liệu) và **thực đơn ảnh đẹp** (nơi khách xem, tối ưu cho việc trình bày). Bạn không bắt khách vào bếp để gọi món, cũng không trang trí đĩa ngay trong nồi. CQRS tách hệ thống làm hai: **bên ghi** (command — nấu, validate, áp business rule) và **bên đọc** (query — trình bày, tối ưu cho việc xem).

**CQRS = Command Query Responsibility Segregation** — tách trách nhiệm **thay đổi dữ liệu** (command) khỏi trách nhiệm **đọc dữ liệu** (query), thành **hai model riêng biệt**.

| Khía cạnh | Write model (Command side) | Read model (Query side) |
|-----------|----------------------------|-------------------------|
| **Mục tiêu** | Đảm bảo tính đúng đắn khi thay đổi | Trả lời câu hỏi đọc thật nhanh |
| **Hình dạng dữ liệu** | Normalized, ít trùng lặp | Denormalized, gom sẵn cho từng view |
| **Việc chính** | Validate, áp business rule, ghi event | Trả về dữ liệu đã định hình sẵn |
| **Tối ưu cho** | Tính nhất quán, toàn vẹn | Tốc độ đọc, đúng đúng cấu trúc UI |
| **Ví dụ store** | Bảng chuẩn hoá / event store | View vật chất hoá, cache, search index |

### 2.1 Một command trông như thế nào

Command là **ý định thay đổi** ("hãy làm X"), ở thể mệnh lệnh, có thể bị **từ chối**:

```go
// Command = yêu cầu thay đổi, CÓ THỂ thất bại (validate)
type PlaceOrder struct {
    OrderID  string
    Customer string
    Items    []Item
}

// Command handler: validate + áp business rule + ghi
func (h *OrderHandler) Handle(cmd PlaceOrder) error {
    if len(cmd.Items) == 0 {
        return errors.New("đơn hàng phải có ít nhất 1 món") // business rule
    }
    // ... ghi vào write store / phát event
    return nil
}
```

### 2.2 Một query trông như thế nào

Query là **câu hỏi đọc** ("cho tôi biết Y"), **không bao giờ** thay đổi dữ liệu, không bao giờ thất bại vì business rule:

```go
// Query = chỉ đọc, KHÔNG side-effect, trả về read model đã gom sẵn
type OrderSummary struct {
    OrderID     string
    CustomerName string  // đã JOIN sẵn, không cần query thêm bảng customer
    TotalAmount  int
    ItemCount    int
    Status       string
}

func (r *OrderReadStore) GetSummary(id string) (OrderSummary, error) {
    // đọc thẳng từ read model — không JOIN, không tính toán
    return r.summaries[id], nil
}
```

> ⚠ **Lỗi thường gặp.** CQRS **không** bắt buộc phải có **2 database**. Mức nhẹ nhất chỉ là tách **2 lớp model trong code** (command model vs query model) trên cùng một DB. Tách DB riêng là mức nâng cao, chỉ làm khi thật cần scale đọc/ghi độc lập. Nhảy thẳng vào 2-DB cho mọi dự án là over-engineering.

> ❓ **Câu hỏi tự nhiên.**
> - *"CQRS có cần Event Sourcing không?"* — KHÔNG. Chúng độc lập (mục 8). Bạn có thể tách read/write model trên một SQL DB bình thường mà chẳng có event nào.
> - *"Read model lấy dữ liệu từ đâu cho khớp write model?"* — Qua **projection** đồng bộ bằng event (mục 7). Đây là lý do CQRS và ES hay đi đôi.

> 🔁 **Dừng lại tự kiểm tra.** Cho 3 thao tác: (a) "tạo đơn hàng", (b) "lấy danh sách đơn của khách X", (c) "huỷ đơn". Cái nào là command, cái nào là query?
> <details><summary>Đáp án</summary>
> (a) và (c) là **command** — thay đổi dữ liệu, có thể bị từ chối bởi business rule (đơn rỗng, đơn đã giao không huỷ được). (b) là **query** — chỉ đọc, trả read model. Mẹo nhận biết: command ở thể mệnh lệnh ("hãy..."), query ở thể câu hỏi ("cho biết...").
> </details>

> 📝 **Tóm tắt mục 2.**
> - CQRS tách **write model** (validate, business rule, normalized) khỏi **read model** (denormalized, tối ưu đọc).
> - Command = ý định thay đổi (có thể fail); Query = câu hỏi đọc (không side-effect).
> - Mức nhẹ: tách model trong code. Mức nặng: tách DB. Đừng nhảy thẳng mức nặng.

---

## 3. Vì sao CQRS — read và write khác bản chất

Lý do CQRS tồn tại là vì **đọc và ghi gần như luôn có pattern trái ngược nhau**:

| | Write (command) | Read (query) |
|--|-----------------|--------------|
| **Tần suất** | Thấp (vài lần/đơn hàng) | Cao (mỗi lần load trang, refresh) |
| **Tỷ lệ điển hình** | 1 | 10–1000 (read >> write) |
| **Nhu cầu** | Đúng, toàn vẹn, atomic | Nhanh, gom sẵn, nhiều dạng view |
| **Hình dạng tốt nhất** | Normalized (tránh trùng) | Denormalized (tránh JOIN) |

Một ví dụ số cụ thể: trang chi tiết sản phẩm Shopee/Amazon. Mỗi lần **ghi** (đổi giá, sửa mô tả) có thể xảy ra **vài lần/ngày**. Nhưng mỗi lần **đọc** (khách xem) xảy ra **hàng triệu lần/ngày**. Tỷ lệ read:write ở đây có thể là **100000:1**.

Nếu dùng chung một model normalized:
- Mỗi lần đọc phải JOIN bảng `product` × `price` × `review` × `seller` × `stock` → chậm.
- Muốn scale đọc thì phải scale luôn cả phần ghi (dù ghi rất ít) → lãng phí.

CQRS cho phép:
1. **Read model denormalized** — gom sẵn tất cả thành 1 document/row → đọc 1 phát, không JOIN.
2. **Scale riêng** — nhân bản read store thành 10 replica để chịu tải đọc, giữ write store 1 node.
3. **Tối ưu riêng** — read store dùng Elasticsearch (search nhanh), write store dùng Postgres (transaction chặt).

> ❓ **Câu hỏi tự nhiên.**
> - *"Denormalized thì dữ liệu trùng lặp, lỡ lệch nhau thì sao?"* — Read model là **dẫn xuất**, không phải source of truth. Nếu lệch, ta **dựng lại từ write model / event stream** (projection rebuild). Trùng lặp ở đây là cố ý và an toàn vì có thể tái tạo.

> 📝 **Tóm tắt mục 3.**
> - Read thường >> write (10–1000×), và hai bên cần hình dạng dữ liệu trái ngược.
> - CQRS cho phép **denormalize đọc**, **scale riêng**, **tối ưu store riêng**.
> - Read model là dẫn xuất tái tạo được, nên trùng lặp là an toàn.

---

## 4. Event Sourcing — chi tiết

Quay lại tài khoản ngân hàng. Với ES, ta định nghĩa các **event** ở thì quá khứ (event mô tả thứ **đã xảy ra**, bất biến):

```go
// Event ở thì QUÁ KHỨ — mô tả việc đã xảy ra, KHÔNG sửa được nữa
type AccountOpened struct{ Owner string }
type Deposited     struct{ Amount int }
type Withdrew      struct{ Amount int }
```

Aggregate `Account` **không lưu balance trực tiếp**; nó có một hàm `apply` thuần tuý nhận một event và biến đổi state:

```go
type Account struct {
    Balance int
    Version int // số event đã apply — dùng cho optimistic concurrency
}

// apply: hàm THUẦN (state, event) -> state mới. Không I/O, không random.
func (a Account) apply(e Event) Account {
    switch ev := e.(type) {
    case AccountOpened:
        a.Balance = 0
    case Deposited:
        a.Balance += ev.Amount
    case Withdrew:
        a.Balance -= ev.Amount
    }
    a.Version++
    return a
}
```

**Quan trọng:** `apply` chỉ biến đổi state, **không validate**. Validate là việc của command handler **trước khi** sinh event (vì event là sự thật đã xảy ra — không thể từ chối quá khứ). Phân biệt rõ:

```
Command (PlaceWithdraw 200)
   │  command handler validate: balance đủ không?
   ▼
   ├─ nếu THIẾU → từ chối, KHÔNG sinh event
   └─ nếu ĐỦ   → sinh event Withdrew{200}  → apply → balance giảm
```

### 4.1 Walk-through replay bằng số thật

Cho stream event của `acc-1`:

```
[0] AccountOpened{Owner: "Alice"}
[1] Deposited{Amount: 50}
[2] Deposited{Amount: 70}
[3] Withdrew{Amount: 20}
```

Replay = fold từ state rỗng:

| Bước | Event | Phép tính | Balance | Version |
|------|-------|-----------|---------|---------|
| start | — | — | 0 | 0 |
| apply [0] | AccountOpened | balance = 0 | 0 | 1 |
| apply [1] | Deposited 50 | 0 + 50 | 50 | 2 |
| apply [2] | Deposited 70 | 50 + 70 | 120 | 3 |
| apply [3] | Withdrew 20 | 120 − 20 | **100** | 4 |

State cuối: `{Balance: 100, Version: 4}`. Đây chính là `events.reduce(apply, Account{})`.

> ⚠ **Lỗi thường gặp.** Đặt validate **bên trong** `apply`. Nếu apply từ chối một event đã lưu, replay sẽ **gãy** — vì event đó là quá khứ đã ghi. Validate luôn ở command handler, apply chỉ "tin tưởng và biến đổi".

> 🔁 **Dừng lại tự kiểm tra.** Thêm event `[4] Deposited{Amount: 30}` vào stream trên, balance mới và version là bao nhiêu?
> <details><summary>Đáp án</summary>
> Balance = 100 + 30 = **130**, Version = **5**. Không cần tính lại từ đầu nếu đã có state cũ — chỉ cần `apply` thêm event mới lên state hiện tại.
> </details>

> 📝 **Tóm tắt mục 4.**
> - Event ở thì quá khứ, bất biến; `apply` là hàm thuần `(state, event) -> state`.
> - **Validate ở command handler** (trước khi sinh event), KHÔNG ở `apply`.
> - Replay = fold events từ state rỗng. State = `events.reduce(apply)`.

---

## 5. Event store — append-only log

**Event store** là nơi lưu trữ event. Nó có 3 tính chất cốt lõi:

1. **Append-only** — chỉ thêm vào cuối, **không UPDATE, không DELETE** event đã ghi.
2. **Immutable** — event đã ghi là bất biến (quá khứ không sửa được).
3. **Ordered per aggregate** — event của cùng một aggregate (vd `acc-1`) có thứ tự rõ ràng (sequence number).

Giao diện tối giản của một event store:

```go
type EventStore interface {
    // Append: thêm event vào cuối stream của aggregate.
    // expectedVersion: optimistic concurrency — từ chối nếu ai đó vừa ghi.
    Append(aggregateID string, events []Event, expectedVersion int) error

    // Load: đọc TẤT CẢ event của một aggregate, theo đúng thứ tự.
    Load(aggregateID string) ([]Event, error)
}
```

Một bảng SQL đơn giản đủ làm event store:

```sql
CREATE TABLE events (
    aggregate_id TEXT    NOT NULL,
    version      INT     NOT NULL,   -- sequence trong stream của aggregate
    event_type   TEXT    NOT NULL,
    payload      JSONB   NOT NULL,
    occurred_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
    PRIMARY KEY (aggregate_id, version)  -- đảm bảo thứ tự + không trùng version
);
-- KHÔNG có UPDATE/DELETE — chỉ INSERT.
```

`PRIMARY KEY (aggregate_id, version)` làm hai việc: (1) đảm bảo thứ tự, (2) **chống ghi đè** — nếu hai request cùng cố ghi version 5 cho `acc-1`, một trong hai sẽ vi phạm khoá chính → đây là cách hiện thực **optimistic concurrency**.

> 💡 **Trực giác.** Event store giống **camera an ninh** chứ không phải bức ảnh chân dung. Bức ảnh (CRUD) cho biết bạn trông thế nào **bây giờ**. Camera (event store) ghi lại **mọi chuyển động đã xảy ra** — bạn có thể tua lại bất kỳ thời điểm nào.

> ❓ **Câu hỏi tự nhiên.**
> - *"Kafka có phải event store không?"* — Kafka là log append-only, rất gần. Nhưng event store "đúng nghĩa" cần thêm: đọc theo aggregate, optimistic concurrency theo version. Có những DB chuyên dụng (EventStoreDB) và thư viện làm việc này; Kafka thường dùng làm **bus** chuyển event sang projection, không phải nơi load 1 aggregate.

> 📝 **Tóm tắt mục 5.**
> - Event store: **append-only, immutable, ordered per aggregate**.
> - Một bảng SQL với `PRIMARY KEY (aggregate_id, version)` là đủ để bắt đầu.
> - Khoá chính `(aggregate_id, version)` cũng chính là cơ chế optimistic concurrency.

---

## 6. Snapshot — đừng replay từ đầu mỗi lần

Vấn đề rõ ràng của ES: một aggregate sống lâu (vd tài khoản ngân hàng hoạt động 10 năm) có thể có **hàng triệu event**. Replay từ đầu mỗi lần đọc là **không thể chấp nhận** về hiệu năng.

**Snapshot** = lưu lại state đã tính tại một checkpoint, kèm version. Khi cần dựng state:

1. Lấy **snapshot gần nhất** (vd tại version 1000, balance = 53000).
2. Chỉ load **các event SAU snapshot** (version 1001 → hiện tại).
3. Replay từ snapshot, không phải từ 0.

```go
type Snapshot struct {
    AggregateID string
    Version     int
    State       Account  // state đã tính tới version này
}

// loadWithSnapshot: dựng state nhanh nhờ snapshot.
func loadWithSnapshot(store EventStore, snaps SnapshotStore, id string) (Account, error) {
    snap, ok := snaps.Latest(id)
    var acc Account
    fromVersion := 0
    if ok {
        acc = snap.State      // bắt đầu từ snapshot
        fromVersion = snap.Version
    }
    events, _ := store.LoadFrom(id, fromVersion) // chỉ event mới
    for _, e := range events {
        acc = acc.apply(e)
    }
    return acc, nil
}
```

### 6.1 Walk-through số cụ thể

Giả sử aggregate có **1.000.000 event**, snapshot mỗi 100 event:

| Chiến lược | Số event phải replay khi đọc | Tương đối |
|------------|------------------------------|-----------|
| Không snapshot | 1.000.000 | 100% |
| Snapshot tại version 999.900 | 1.000.000 − 999.900 = **100** | 0.01% |

Giảm từ 1 triệu phép `apply` xuống còn 100 — nhanh hơn ~10000 lần. Snapshot **không phải source of truth** — nó chỉ là cache có thể vứt đi và dựng lại từ event store bất cứ lúc nào.

> ⚠ **Lỗi thường gặp.** Coi snapshot là source of truth rồi xoá event cũ → mất luôn audit log và time-travel, đánh mất chính lý do dùng ES. Snapshot chỉ là **tối ưu đọc**; event store mới là chân lý.

> ❓ **Câu hỏi tự nhiên.**
> - *"Snapshot bao lâu một lần?"* — Tuỳ workload. Mỗi 100–1000 event là phổ biến. Đặt quá dày → tốn chỗ lưu; quá thưa → replay vẫn lâu. Đo rồi chỉnh.

> 🔁 **Dừng lại tự kiểm tra.** Aggregate có 5.234 event, snapshot mỗi 1.000 event. Snapshot gần nhất ở version nào, phải replay bao nhiêu event?
> <details><summary>Đáp án</summary>
> Snapshot gần nhất ở version **5.000**. Phải replay 5.234 − 5.000 = **234** event. (Nếu không snapshot: 5.234.)
> </details>

> 📝 **Tóm tắt mục 6.**
> - Snapshot = state đã tính tại checkpoint + version.
> - Load = snapshot gần nhất rồi replay chỉ event SAU đó.
> - Snapshot là cache (vứt đi được), **không** phải source of truth.

---

## 7. Projection — dựng read model từ event stream

**Projection** là quá trình "chiếu" event stream thành một **read model** cụ thể. Một event stream có thể nuôi **nhiều projection khác nhau**, mỗi cái phục vụ một view.

> 💡 **Trực giác.** Cùng một bộ phim (event stream), bạn chiếu lên nhiều màn hình khác nhau: màn 1 hiển thị "số dư hiện tại", màn 2 hiển thị "lịch sử giao dịch dạng bảng", màn 3 hiển thị "biểu đồ chi tiêu theo tháng". Tất cả từ **một** nguồn phim, chiếu (project) theo các cách khác nhau.

Ví dụ từ stream account, dựng read model "lịch sử giao dịch":

```go
// Read model: lịch sử giao dịch — denormalized, sẵn sàng hiển thị
type TxRow struct {
    Seq     int
    Type    string // "deposit" / "withdraw"
    Amount  int
    Balance int    // số dư SAU giao dịch — tính sẵn
}

// Projection: fold event stream thành []TxRow
func projectHistory(events []Event) []TxRow {
    var rows []TxRow
    balance := 0
    for i, e := range events {
        switch ev := e.(type) {
        case Deposited:
            balance += ev.Amount
            rows = append(rows, TxRow{i, "deposit", ev.Amount, balance})
        case Withdrew:
            balance -= ev.Amount
            rows = append(rows, TxRow{i, "withdraw", ev.Amount, balance})
        }
    }
    return rows
}
```

Một projection khác — "thống kê" — đọc **cùng** stream:

```go
type Stats struct{ TotalIn, TotalOut, TxCount int }

func projectStats(events []Event) Stats {
    var s Stats
    for _, e := range events {
        switch ev := e.(type) {
        case Deposited:
            s.TotalIn += ev.Amount; s.TxCount++
        case Withdrew:
            s.TotalOut += ev.Amount; s.TxCount++
        }
    }
    return s
}
```

Trong hệ thống thật, projection chạy **liên tục**: mỗi event mới ghi vào store → một projector cập nhật read model tương ứng (thường bất đồng bộ, qua message bus). Khi cần thêm view mới, bạn viết một projector mới và **rebuild** nó từ đầu event stream — không cần migrate dữ liệu.

> ❓ **Câu hỏi tự nhiên.**
> - *"Thêm read model mới có phải sửa write model không?"* — KHÔNG. Đây là điểm mạnh lớn nhất. Write side chỉ sinh event; muốn view mới thì viết projector mới đọc event cũ. Không đụng đến command side.
> - *"Projector chết giữa chừng thì sao?"* — Projector lưu vị trí (offset/version) đã xử lý. Khởi động lại thì tiếp tục từ đó. Idempotent + ordered → an toàn.

> 📝 **Tóm tắt mục 7.**
> - Projection chiếu event stream → read model cụ thể.
> - **Nhiều projection** từ **một** stream → nhiều view không cần migrate.
> - Thêm view mới = viết projector mới + rebuild, không đụng write side.

---

## 8. CQRS và ES độc lập — 4 tổ hợp

CQRS và Event Sourcing **hay đi cùng nhau** nhưng là hai khái niệm **độc lập**. Bốn tổ hợp:

| | CRUD store (lưu state) | Event Sourcing (lưu event) |
|--|------------------------|----------------------------|
| **Không CQRS** | App CRUD truyền thống (Lesson 54). Một model cho cả đọc/ghi. | ES không CQRS: lưu event, replay để đọc cùng model. Hiếm, vì đọc thường cần projection. |
| **CQRS** | CQRS without ES: tách read/write model trên SQL bình thường, sync read model bằng trigger/event. **Rất phổ biến.** | CQRS + ES: write = event store, read = projection. Tổ hợp "kinh điển" hay được nhắc. |

Hai điều cần nhớ:

- **CQRS without ES** là hợp lệ và phổ biến nhất — chỉ cần tách model đọc/ghi, dùng SQL bình thường.
- **ES without CQRS** ít gặp vì khi đã có event stream, bạn gần như luôn muốn projection để đọc → mà projection chính là read model của CQRS.

> ⚠ **Lỗi thường gặp.** Nghe "CQRS + Event Sourcing" như một cụm rồi tưởng phải làm cả hai cùng lúc. Hãy bắt đầu bằng cái nhẹ hơn — thường là CQRS trong code — và chỉ thêm ES khi thật sự cần audit/time-travel.

> 📝 **Tóm tắt mục 8.**
> - CQRS và ES độc lập. Có thể dùng riêng.
> - CQRS without ES = phổ biến nhất (tách model trên SQL).
> - ES without CQRS = hiếm (có event stream thì gần như luôn cần projection).

---

## 9. Lợi ích của Event Sourcing

1. **Full audit log** — mọi thay đổi là một event bất biến. Bạn biết **ai, làm gì, khi nào** — miễn phí, không thể quên ghi. Yêu cầu bắt buộc với banking/healthcare.
2. **Time travel** — dựng state tại **bất kỳ thời điểm nào** bằng cách replay event tới đúng thời điểm đó. "Số dư của Alice lúc 3h chiều hôm qua là bao nhiêu?" → replay tới event cuối trước 3h chiều.
3. **Debug bằng replay** — gặp bug? Replay đúng chuỗi event để tái hiện chính xác trạng thái lúc bug xảy ra. Không cần "đoán" state.
4. **Multiple read model** — một event stream nuôi nhiều projection. Thêm view mới không cần migrate dữ liệu, chỉ rebuild projector.
5. **Khám phá nhu cầu mới từ dữ liệu cũ** — vì giữ nguyên lịch sử, bạn có thể trả lời các câu hỏi mà lúc thiết kế chưa nghĩ ra (vd "có bao nhiêu lần rút quá 1000 trong 2024?") chỉ bằng một projector mới.

> 💡 **Trực giác về time-travel.** Vì event là quá khứ bất biến và `apply` thuần tuý, replay tới event thứ `k` luôn cho ra **đúng** state tại thời điểm sau event `k`. Không có gì ngẫu nhiên — quá khứ tái hiện y hệt.

> 📝 **Tóm tắt mục 9.**
> - 5 lợi ích: audit log, time-travel, debug-by-replay, multiple read model, khám phá nhu cầu mới.
> - Tất cả đến từ một điều: **giữ nguyên lịch sử thay vì ghi đè**.

---

## 10. Nhược điểm — trade-off thật

ES không miễn phí. Bốn cái giá phải trả:

1. **Complexity cao** — phải nghĩ theo event, viết command handler, apply, projection, snapshot. Nhiều thành phần hơn hẳn CRUD. Đội chưa quen sẽ làm sai.
2. **Eventual consistency phía đọc** — read model cập nhật **sau** khi ghi event (qua projection). Có độ trễ → "read-your-write" issue (mục 11).
3. **Event schema evolution khó** — event đã ghi là bất biến, nhưng nhu cầu thay đổi. Đổi struct event mà không xử lý event cũ → replay gãy (mục 12).
4. **Query current state cần replay/projection** — không thể `SELECT balance FROM accounts WHERE id=...` trực tiếp. Phải replay (chậm nếu không snapshot) hoặc đọc projection (eventual consistency).

Còn vài cái nhỏ hơn nhưng đau:

- **Phình dung lượng** — lưu hết event, dữ liệu chỉ tăng. Cần chiến lược snapshot + (đôi khi) archiving.
- **Rebuild read model tốn** — rebuild projection từ vài trăm triệu event mất hàng giờ.
- **Khó debug "tại sao state sai"** — phải lần theo cả chuỗi event, không phải nhìn một row.

> ⚠ **Lỗi thường gặp.** Dùng ES cho **CRUD đơn giản** (todo app, blog cá nhân) vì nghe "ngầu". Với domain không cần audit/time-travel, ES chỉ thêm complexity mà không thêm giá trị → over-engineering. Đây là pitfall số 1.

> 📝 **Tóm tắt mục 10.**
> - 4 cái giá: complexity, eventual consistency đọc, schema evolution khó, query state cần replay/projection.
> - Cộng thêm: phình dung lượng, rebuild tốn, debug khó.
> - Cân nhắc kỹ trước khi áp dụng — đa số app không cần.

---

## 11. Eventual consistency & read-your-write

Trong CQRS + ES, ghi và đọc đi qua **hai đường khác nhau**:

```
Command → write (ghi event) ──┐
                              ▼
                          Event store
                              │  (projection bất đồng bộ, có ĐỘ TRỄ)
                              ▼
                          Read model ← Query
```

Vì projection cập nhật read model **sau một khoảng trễ** (vài ms tới vài giây), read model **lag** sau write. Hệ quả khó chịu nhất là **read-your-write**: user vừa đặt đơn hàng thành công, refresh ngay → read model **chưa kịp cập nhật** → "không thấy đơn vừa đặt" → user hoang mang.

Vài cách giảm đau:

- **UI optimistic** — frontend tự hiển thị kết quả ngay (giả định thành công) trước khi read model bắt kịp.
- **Read-your-own-write routing** — với chính user vừa ghi, đọc tạm từ write side / cache cho tới khi projection bắt kịp.
- **Hiển thị trạng thái "đang xử lý"** — chấp nhận trễ một cách tường minh thay vì giả vờ tức thời.
- **Đo và giới hạn lag** — đảm bảo độ trễ projection nằm trong ngưỡng chấp nhận được (vd < 1s 99% thời gian).

> ⚠ **Lỗi thường gặp.** Để eventual consistency "rò rỉ" ra UI mà không xử lý → user thấy dữ liệu lúc có lúc không, mất niềm tin. Nếu domain **không chịu được** read-your-write trễ (vd thanh toán hiển thị số dư), cân nhắc đọc đồng bộ phần đó hoặc không dùng eventual consistency cho luồng đó.

> 📝 **Tóm tắt mục 11.**
> - Read model lag sau write vì projection bất đồng bộ.
> - Hệ quả: read-your-write — vừa ghi, đọc lại chưa thấy.
> - Giảm đau: UI optimistic, route read về write side cho user vừa ghi, hiển thị "đang xử lý", giới hạn lag.

---

## 12. Event versioning & upcasting

Event đã ghi là **bất biến** — nhưng phần mềm tiến hoá, schema event sẽ đổi. Ví dụ:

- **v1:** `Deposited{Amount int}` — chỉ có số tiền.
- **v2:** `Deposited{Amount int; Currency string}` — thêm tiền tệ.

Event cũ (v1) đã nằm trong store **không có** trường `Currency`. Khi replay, code v2 đọc phải event v1 → thiếu trường → có thể gãy. Giải pháp: **upcasting** — một hàm biến event schema cũ thành mới **lúc đọc**:

```go
// Upcaster: nâng event v1 lên v2. Chạy LÚC LOAD, trước khi apply.
func upcastDeposited(raw map[string]any) Deposited {
    amount := int(raw["amount"].(float64))
    currency, ok := raw["currency"].(string)
    if !ok {
        currency = "VND" // v1 không có → mặc định (giả định business hợp lệ)
    }
    return Deposited{Amount: amount, Currency: currency}
}
```

Nguyên tắc versioning event:

1. **Chỉ thêm field, đừng đổi/xoá** field cũ khi có thể (additive change dễ upcast nhất).
2. **Đánh version** trong event (`event_version` cột) để biết cần upcaster nào.
3. **Upcaster theo chuỗi** — v1→v2→v3, áp tuần tự để event rất cũ vẫn lên được schema mới nhất.
4. **KHÔNG sửa event đã ghi** — upcast lúc đọc, store vẫn giữ nguyên bản gốc.

> ⚠ **Lỗi thường gặp.** Đổi nghĩa một field cũ (vd `Amount` từ "đồng" sang "xu") mà không version → event cũ bị diễn giải sai → replay ra state sai trên toàn lịch sử. Đây là lỗi rất khó phát hiện vì code chạy bình thường, chỉ số liệu sai.

> 🔁 **Dừng lại tự kiểm tra.** Store có cả event `Deposited` v1 (chỉ Amount) lẫn v2 (Amount + Currency). Làm sao replay cả hai bằng cùng một `apply`?
> <details><summary>Đáp án</summary>
> Chạy **upcaster lúc load**: mọi `Deposited` v1 được nâng lên v2 (gán `Currency` mặc định) **trước khi** vào `apply`. Nhờ vậy `apply` chỉ cần biết một schema duy nhất (v2). Store vẫn giữ nguyên event v1 gốc.
> </details>

> 📝 **Tóm tắt mục 12.**
> - Event bất biến nhưng schema tiến hoá → cần **upcasting** lúc đọc.
> - Ưu tiên additive change; đánh version; upcast theo chuỗi; không sửa event gốc.
> - Đổi nghĩa field cũ mà không version = bom hẹn giờ trên toàn lịch sử.

---

## 13. Khi nào DÙNG CQRS / Event Sourcing

Dùng khi **ít nhất một** điều kiện sau đúng mạnh:

- **Audit là yêu cầu cốt lõi** — banking, kế toán, healthcare, hệ thống pháp lý. Cần biết chính xác mọi thay đổi, ai làm, khi nào. ES cho audit miễn phí.
- **Domain phức tạp (DDD)** — nhiều business rule, nhiều state transition, lợi ích từ mô hình hoá theo event/aggregate. (Lesson 39 — design patterns, DDD.)
- **Cần nhiều read view khác nhau** trên cùng dữ liệu — dashboard, report, search, API — mỗi cái một projection.
- **Read và write có yêu cầu scale rất lệch nhau** — read >> write, cần scale/tối ưu độc lập → CQRS (không nhất thiết ES).
- **Cần time-travel / phân tích lịch sử** — "trạng thái lúc X", "xu hướng theo thời gian".

> 📝 **Tóm tắt mục 13.**
> - Dùng khi: audit critical, domain phức tạp, nhiều read view, scale lệch, cần time-travel.
> - CQRS có thể dùng riêng cho trường hợp scale lệch mà không cần ES.

---

## 14. Khi nào KHÔNG dùng

- **CRUD đơn giản** — todo app, blog cá nhân, form quản trị nội bộ. Không có business rule phức tạp, không cần audit sâu → ES/CQRS chỉ thêm complexity. Dùng CRUD thẳng.
- **Đội chưa quen** — ES/CQRS có learning curve dốc. Áp dụng vội trên dự án quan trọng với đội thiếu kinh nghiệm → rủi ro cao. Bắt đầu nhỏ, học dần.
- **Không cần audit / time-travel / multiple view** — nếu không hưởng lợi ích nào của ES, đừng trả cái giá complexity của nó.
- **Yêu cầu strong consistency tức thời ở mọi nơi** — eventual consistency của read model sẽ gây đau; cân nhắc kỹ hoặc tránh.

> 💡 **Quy tắc ngón tay cái.** Mặc định bắt đầu bằng CRUD đơn giản. Chỉ thêm CQRS khi đo được read/write lệch hoặc cần nhiều view. Chỉ thêm ES khi audit/time-travel là yêu cầu thật. "Có thể dùng" ≠ "nên dùng".

> 📝 **Tóm tắt mục 14.**
> - Tránh với: CRUD đơn giản, đội chưa quen, không cần audit/time-travel, cần strong consistency mọi nơi.
> - Mặc định CRUD; thăng cấp lên CQRS rồi ES chỉ khi có lý do đo được.

---

## 15. Common pitfalls — tổng hợp

| Pitfall | Hậu quả | Cách tránh |
|---------|---------|------------|
| **Over-engineer CRUD đơn giản** | Complexity vô ích, dev chậm, bug nhiều | Mặc định CRUD; chỉ thăng cấp khi đo được nhu cầu |
| **Event schema không version** | Replay gãy hoặc ra state sai khi schema đổi | Đánh version event + viết upcaster ngay từ đầu |
| **No snapshot** | Replay chậm dần theo thời gian, đọc lag | Snapshot mỗi N event; đo và chỉnh N |
| **Rebuild read model tốn** | Rebuild hàng giờ, downtime projection | Projector idempotent + lưu offset; rebuild song song/nền |
| **Eventual consistency confuse user** | Read-your-write, user mất niềm tin | UI optimistic, route read về write cho user vừa ghi, giới hạn lag |
| **Validate trong `apply`** | Replay event quá khứ bị từ chối → gãy | Validate ở command handler; apply chỉ biến đổi |
| **Coi snapshot là source of truth** | Xoá event → mất audit + time-travel | Snapshot là cache; event store là chân lý |

> 📝 **Tóm tắt mục 15.**
> - Pitfall số 1: over-engineer CRUD đơn giản.
> - Luôn version event + viết upcaster sớm.
> - Snapshot bắt buộc cho aggregate sống lâu; nó là cache, không phải chân lý.
> - Validate ở command handler, không ở `apply`.

---

## Bài tập

> Gợi ý: chạy file lời giải bằng `go run solutions.go`.

1. **BT1 — Account event sourcing.** Định nghĩa event `Deposited` và `Withdrew`. Cho stream `[Deposited 50, Deposited 70, Withdrew 20]`, viết hàm `replay` fold các event để tính balance. Kết quả mong đợi: `100`.

2. **BT2 — Snapshot mỗi 100 event.** Cho một stream dài, viết cơ chế tạo snapshot **mỗi 100 event** và hàm `loadWithSnapshot` chỉ replay các event SAU snapshot gần nhất. Với 250 event, chỉ ra số event phải replay khi đọc.

3. **BT3 — Projection lịch sử giao dịch.** Từ event stream của account, dựng read model `[]TxRow` gồm `(Seq, Type, Amount, Balance-sau-giao-dịch)`. Đây là read model denormalized: balance được tính sẵn cho từng dòng.

4. **BT4 — CQRS cho Order.** Tách **write model** (validate: đơn phải có ≥ 1 item, tổng > 0) khỏi **read model** (`OrderSummary` denormalized: gom sẵn `CustomerName`, `TotalAmount`, `ItemCount`). Viết command handler `PlaceOrder` và query `GetSummary`.

5. **BT5 — Event versioning / upcaster.** Event cũ `DepositedV1{Amount}` không có `Currency`. Event mới `Deposited{Amount, Currency}`. Viết upcaster nâng v1 → v2 (mặc định `Currency = "VND"`) **lúc load**, để cùng một `apply` xử lý được cả hai.

6. **BT6 — CQRS+ES có phù hợp không?** Với 4 use case sau, quyết định có nên dùng CQRS+ES không và giải thích ngắn gọn: (a) blog cá nhân, (b) hệ thống ngân hàng, (c) IoT thu thập sensor data, (d) todo app cá nhân.

---

## Lời giải chi tiết

### Lời giải BT1 — Account event sourcing

**Cách tiếp cận.** Event là kiểu ở thì quá khứ. `apply` là hàm thuần `(state, event) -> state`. Replay = fold từ state rỗng.

```go
type Event interface{ isEvent() }
type Deposited struct{ Amount int }
type Withdrew  struct{ Amount int }
func (Deposited) isEvent() {}
func (Withdrew) isEvent()  {}

// apply: biến đổi balance theo event (KHÔNG validate ở đây)
func apply(balance int, e Event) int {
    switch ev := e.(type) {
    case Deposited:
        return balance + ev.Amount
    case Withdrew:
        return balance - ev.Amount
    }
    return balance
}

// replay: fold toàn bộ event từ 0
func replay(events []Event) int {
    balance := 0
    for _, e := range events {
        balance = apply(balance, e)
    }
    return balance
}
```

**Kiểm chứng số:** `replay([Deposited 50, Deposited 70, Withdrew 20])`:
- start: 0
- +50 → 50
- +70 → 120
- −20 → **100** ✓

**Độ phức tạp:** $O(n)$ theo số event, mỗi event $O(1)$. Đây chính là lý do cần snapshot khi n lớn.

### Lời giải BT2 — Snapshot mỗi 100 event

**Cách tiếp cận.** Tạo snapshot tại các version là bội của 100. Khi load: lấy snapshot gần nhất ≤ version hiện tại, replay phần còn lại.

```go
type Snapshot struct {
    Version int
    Balance int
}

// buildSnapshots: tạo snapshot mỗi `every` event
func buildSnapshots(events []Event, every int) []Snapshot {
    var snaps []Snapshot
    balance := 0
    for i, e := range events {
        balance = apply(balance, e)
        version := i + 1
        if version%every == 0 {
            snaps = append(snaps, Snapshot{version, balance})
        }
    }
    return snaps
}

// loadWithSnapshot: dùng snapshot gần nhất rồi replay phần còn lại
func loadWithSnapshot(events []Event, snaps []Snapshot) (balance, replayed int) {
    from := 0
    if len(snaps) > 0 {
        last := snaps[len(snaps)-1] // gần nhất
        balance = last.Balance
        from = last.Version
    }
    for i := from; i < len(events); i++ {
        balance = apply(balance, events[i])
        replayed++
    }
    return
}
```

**Kiểm chứng số:** với **250 event**, snapshot mỗi 100 → có snapshot tại version 100 và 200. Snapshot gần nhất = version 200. Phải replay `250 − 200 = `**`50`** event (thay vì 250). Không snapshot thì phải replay cả 250.

**Độ phức tạp đọc:** O(events sau snapshot) ≤ O(every). Snapshot biến chi phí đọc từ O(tổng-lịch-sử) xuống O(khoảng-snapshot).

### Lời giải BT3 — Projection lịch sử giao dịch

**Cách tiếp cận.** Projection là một fold khác trên cùng stream, sinh ra read model denormalized (balance tính sẵn cho từng dòng).

```go
type TxRow struct {
    Seq     int
    Type    string
    Amount  int
    Balance int // số dư SAU giao dịch
}

func projectHistory(events []Event) []TxRow {
    var rows []TxRow
    balance := 0
    for i, e := range events {
        switch ev := e.(type) {
        case Deposited:
            balance += ev.Amount
            rows = append(rows, TxRow{i, "deposit", ev.Amount, balance})
        case Withdrew:
            balance -= ev.Amount
            rows = append(rows, TxRow{i, "withdraw", ev.Amount, balance})
        }
    }
    return rows
}
```

**Kiểm chứng:** stream `[Deposited 50, Deposited 70, Withdrew 20]`:

| Seq | Type | Amount | Balance |
|-----|------|--------|---------|
| 0 | deposit | 50 | 50 |
| 1 | deposit | 70 | 120 |
| 2 | withdraw | 20 | 100 |

Read model này hiển thị thẳng lên UI — không cần JOIN, không cần tính lại. Dòng cuối balance = 100 khớp BT1. Cùng stream còn có thể nuôi projection khác (vd `Stats{TotalIn, TotalOut}`), minh hoạ "multiple read model từ một stream".

### Lời giải BT4 — CQRS cho Order

**Cách tiếp cận.** Write model: command handler validate business rule. Read model: struct denormalized gom sẵn dữ liệu.

```go
// --- WRITE SIDE (command) ---
type Item struct{ Name string; Price, Qty int }
type Order struct {
    ID       string
    Customer string
    Items    []Item
    Status   string
}

type PlaceOrder struct {
    ID       string
    Customer string
    Items    []Item
}

// Command handler: VALIDATE rồi mới ghi
func handlePlaceOrder(cmd PlaceOrder, store map[string]Order) error {
    if len(cmd.Items) == 0 {
        return errors.New("đơn hàng phải có ít nhất 1 item")
    }
    total := 0
    for _, it := range cmd.Items {
        total += it.Price * it.Qty
    }
    if total <= 0 {
        return errors.New("tổng đơn phải > 0")
    }
    store[cmd.ID] = Order{cmd.ID, cmd.Customer, cmd.Items, "placed"}
    return nil
}

// --- READ SIDE (query) ---
type OrderSummary struct {
    OrderID      string
    CustomerName string
    TotalAmount  int
    ItemCount    int
    Status       string
}

// Projection: write model -> read model denormalized
func projectSummary(o Order) OrderSummary {
    total, count := 0, 0
    for _, it := range o.Items {
        total += it.Price * it.Qty
        count += it.Qty
    }
    return OrderSummary{o.ID, o.Customer, total, count, o.Status}
}
```

**Điểm mấu chốt:** business rule (đơn rỗng, tổng ≤ 0) **chỉ** sống ở write side. Read side `OrderSummary` không validate gì — nó chỉ trình bày dữ liệu đã được write side đảm bảo hợp lệ. `TotalAmount`/`ItemCount` được tính sẵn → query không cần lặp items mỗi lần đọc.

### Lời giải BT5 — Event versioning / upcaster

**Cách tiếp cận.** Lưu event cũ nguyên trạng. Lúc load, upcast v1 → v2 trước khi `apply`, để `apply` chỉ biết một schema.

```go
// Schema mới (v2)
type Deposited struct {
    Amount   int
    Currency string
}

// Event v1 cũ (đã nằm trong store) — không có Currency
type DepositedV1 struct{ Amount int }

// Upcaster: nâng v1 -> v2 LÚC LOAD
func upcast(e Event) Event {
    if v1, ok := e.(DepositedV1); ok {
        return Deposited{Amount: v1.Amount, Currency: "VND"} // mặc định
    }
    return e // v2 giữ nguyên
}

// loadAndUpcast: áp upcaster cho mọi event trước khi dùng
func loadAndUpcast(raw []Event) []Event {
    out := make([]Event, len(raw))
    for i, e := range raw {
        out[i] = upcast(e)
    }
    return out
}
```

**Kiểm chứng:** store có `[DepositedV1{50}, Deposited{70, "USD"}]`. Sau `loadAndUpcast` → `[Deposited{50,"VND"}, Deposited{70,"USD"}]`. Giờ một `apply` duy nhất (chỉ biết `Deposited` v2) xử lý được cả hai. Store **vẫn giữ** `DepositedV1{50}` gốc — không sửa quá khứ.

**Lưu ý:** trong thực tế event lưu dạng JSON, upcaster đọc map và bổ field thiếu. Nguyên tắc bất biến: upcast lúc đọc, không bao giờ rewrite event trong store.

### Lời giải BT6 — CQRS+ES có phù hợp không?

| Use case | Dùng CQRS+ES? | Lý do |
|----------|:-------------:|-------|
| **(a) Blog cá nhân** | ❌ Không | CRUD đơn giản, không cần audit/time-travel, ít read view. ES chỉ thêm complexity. Dùng CRUD thẳng. |
| **(b) Hệ thống ngân hàng** | ✅ Có | Audit là **yêu cầu pháp lý**, cần time-travel (số dư tại thời điểm), domain phức tạp. Đây là ca dùng kinh điển của ES. |
| **(c) IoT thu thập sensor** | ⚠ Một phần | Bản chất dữ liệu **đã là** chuỗi event (append-only). ES-style hợp về lưu trữ (giống Kafka log), nhưng thường dùng time-series DB chuyên dụng hơn là full ES + aggregate. Có thể cần CQRS để tách ghi (ingest khổng lồ) khỏi đọc (dashboard). |
| **(d) Todo app cá nhân** | ❌ Không | CRUD tối giản nhất. Không business rule phức tạp, không audit. ES là over-engineering rõ ràng. |

**Nguyên tắc rút ra:** ES toả sáng khi **audit/time-travel là yêu cầu thật** và **domain phức tạp** (b). Với CRUD đơn giản (a, d), ES chỉ thêm chi phí. Với IoT (c), bản chất append-only hợp ES nhưng công cụ chuyên dụng (time-series DB) thường thực dụng hơn; CQRS phần ghi/đọc có thể hữu ích vì scale lệch.

---

## Code & Minh họa

- [solutions.go](./solutions.go) — event store in-memory, Account aggregate (apply/replay), snapshot, projection. Chạy: `go run solutions.go`.
- [visualization.html](./visualization.html) — 3 module tương tác: (1) Event sourcing replay với time-travel slider, (2) CQRS write vs read model + projection, (3) Snapshot so sánh hiệu năng replay.

## Bài tiếp theo

- [Lesson 68 — Consensus & Raft](../lesson-68-consensus-raft/README.md): khi nhiều node phải đồng thuận về thứ tự event (replicated log), Raft đảm bảo mọi bản sao của log thống nhất — nền tảng cho event store phân tán.
- Ôn lại [Lesson 66 — Saga Pattern](../lesson-66-saga-pattern/README.md): saga điều phối transaction phân tán bằng chính các event mà ES sinh ra.
