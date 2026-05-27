# Lesson 65 — Event-Driven Architecture

> Tier 6 — Distributed & Microservices · Bài 65/79
>
> **Tiền đề**: [Lesson 64 — Message Queue (Kafka/NATS)](../lesson-64-message-queue-nats-kafka/) (pub/sub, partition, at-least-once), [Lesson 62 — Distributed Fundamentals](../lesson-62-distributed-fundamentals/) (eventual consistency, idempotency), [Lesson 51-53 — Transaction](../lesson-51-database-sql/).

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Phân biệt được **event / command / query** và biết khi nào dùng cái nào.
- Hiểu hai cách "đóng gói" event: **event notification** vs **event-carried state transfer**.
- Phân biệt **choreography** (phi tập trung) vs **orchestration** (có nhạc trưởng), và trade-off.
- Cài đặt được **outbox pattern** để ghi DB + publish event một cách atomic.
- Viết **idempotent consumer** chống xử lý trùng khi event được giao at-least-once.
- Nắm event **schema versioning**, **ordering**, **eventual consistency**, **dead letter / retry**.
- Tránh các pitfall kinh điển: write-rồi-publish không atomic, event quá to/quá nhỏ, choreography spaghetti, consumer không idempotent.

---

## 1. Event-driven là gì?

> **💡 Trực giác / Hình dung**
>
> Hãy tưởng tượng một nhà hàng. Cách "request-response" giống bồi bàn đứng cạnh đầu bếp, chờ từng món xong mới đi tiếp — đầu bếp và bồi bàn **kẹt chặt vào nhau** (coupled). Cách "event-driven" giống đầu bếp gắp món lên quầy và **gõ chuông "có món rồi!"** — ai rảnh thì tới bê. Đầu bếp không cần biết ai bê, bao giờ bê. Tiếng chuông chính là **event**: một sự kiện đã xảy ra, broadcast cho bất kỳ ai quan tâm.

**Event-Driven Architecture (EDA)** là kiến trúc trong đó các component giao tiếp với nhau **chủ yếu qua việc phát và phản ứng với sự kiện (event)**, thay vì gọi trực tiếp lẫn nhau.

Trong mô hình request-response truyền thống:

```
OrderService  --(HTTP gọi trực tiếp)-->  PaymentService  --(HTTP)-->  InventoryService  --(HTTP)-->  ShippingService
```

`OrderService` phải **biết** PaymentService tồn tại, biết URL của nó, chờ nó trả lời, và nếu nó chết thì cả luồng hỏng. Đây là **tight coupling** (kết dính chặt).

Trong mô hình event-driven:

```
OrderService  --(publish OrderCreated)-->  [Event Broker: Kafka/NATS]
                                                  |  |  |
                          PaymentService <--------+  |  +--------> AnalyticsService
                          InventoryService <---------+
```

`OrderService` chỉ **phát ra một event** `OrderCreated` rồi quên đi. Nó **không biết** ai đang lắng nghe — có thể là Payment, Inventory, Analytics, hay một service mới ra đời tháng sau. Đây là **loose coupling** (kết dính lỏng).

**Ba đặc tính cốt lõi của EDA:**

| Đặc tính | Ý nghĩa | Lợi ích |
|----------|---------|---------|
| **Loose coupling** | Producer không biết consumer | Thêm consumer mới không sửa producer |
| **Asynchronous** | Phát event xong là xong, không chờ | Producer không bị block, chịu tải cao |
| **Broadcast** | Một event, nhiều consumer | Thêm tính năng = thêm consumer |

> **❓ Câu hỏi tự nhiên của người đọc**
>
> - *"Nếu producer không chờ consumer, làm sao biết consumer xử lý xong?"* → Đây chính là **eventual consistency** (mục 9). EDA đánh đổi tính nhất quán tức thời để lấy độ sẵn sàng và khả năng mở rộng. Nếu bạn CẦN biết kết quả ngay, dùng request-response hoặc saga (mục 10).
> - *"Event đi đâu? Ai giữ nó?"* → Một **event broker** (message queue như Kafka, NATS — đã học Lesson 64). Broker lưu event, đảm bảo giao tới consumer, hỗ trợ retry.
> - *"EDA thay thế hoàn toàn HTTP/gRPC?"* → Không. Hệ thực tế **lai**: query đồng bộ (HTTP), thay đổi trạng thái phát event (async). Đừng "event-hóa" mọi thứ.

> **📝 Tóm tắt mục 1**
> - EDA = component giao tiếp qua event, không gọi trực tiếp.
> - Ba trụ cột: loose coupling, async, broadcast.
> - Đánh đổi: được mở rộng & độc lập, mất tính nhất quán tức thời.
> - Cần một event broker (Kafka/NATS) làm trung gian.

---

## 2. Event vs Command vs Query

Ba loại "thông điệp" này hay bị lẫn lộn. Phân biệt sai dẫn tới coupling sai và đặt tên sai.

> **💡 Trực giác**
>
> - **Command** = mệnh lệnh: *"Hãy làm việc này!"* — như sếp giao việc, mong đợi nó được thực hiện.
> - **Event** = thông báo sự thật: *"Việc này đã xảy ra rồi."* — như tin tức buổi sáng, đã rồi, ai nghe thì nghe.
> - **Query** = câu hỏi: *"Cho tôi xem dữ liệu."* — như tra cứu, không thay đổi gì.

| Loại | Ý nghĩa | Thì (tense) | Ai biết người nhận? | Ví dụ |
|------|---------|-------------|---------------------|-------|
| **Command** | "Do this" — yêu cầu thực hiện | Mệnh lệnh hiện tại | **Có** (gửi tới 1 handler cụ thể) | `CreateOrder`, `ChargePayment`, `ReserveStock` |
| **Event** | "This happened" — sự thật đã xảy ra | **Quá khứ** | **Không** (broadcast) | `OrderCreated`, `PaymentCharged`, `StockReserved` |
| **Query** | "Give me data" — đọc dữ liệu | Câu hỏi | Có (gửi tới 1 service) | `GetOrder`, `ListProducts` |

**Quy tắc đặt tên (rất quan trọng):**

- **Command**: động từ mệnh lệnh + danh từ → `CreateOrder`, `CancelShipment`. Nó có thể bị **từ chối** ("không đủ tiền" → reject `ChargePayment`).
- **Event**: danh từ + động từ **quá khứ** → `OrderCreated`, `PaymentFailed`. Nó là **sự thật bất biến** — đã xảy ra rồi, không thể từ chối. Bạn không "reject" một sự thật.

**Ví dụ phân biệt cụ thể:**

```
1. "CreateOrder { items: [...], userId: 42 }"      → COMMAND (yêu cầu tạo)
2. "OrderCreated { orderId: 1001, total: 250 }"    → EVENT   (đã tạo xong)
3. "GetOrderById { orderId: 1001 }"                → QUERY   (hỏi dữ liệu)
4. "ChargePayment { orderId: 1001, amount: 250 }"  → COMMAND (yêu cầu trừ tiền)
5. "PaymentDeclined { orderId: 1001, reason: ... }"→ EVENT   (đã bị từ chối — sự thật)
6. "ListOrdersByUser { userId: 42 }"               → QUERY   (đọc danh sách)
```

> **⚠ Lỗi thường gặp**
>
> Đặt tên event ở **thì hiện tại / mệnh lệnh**: `CreateOrder` cho event. Sai! Nếu service A phát `CreateOrder` lên broker và service B "nghe", thì A đang ngầm **ra lệnh** cho B — đây là command đội lốt event, tạo coupling ẩn. Một event đúng là `OrderCreated`: A chỉ tuyên bố sự thật, B tự quyết định phản ứng (hay không).
>
> **Đối chứng**: nếu chỉ có **đúng một** consumer được phép xử lý thông điệp và nó **phải** chạy → đó là command, gửi point-to-point. Nếu **nhiều** consumer có thể quan tâm và việc xử lý là tùy chọn → đó là event, broadcast.

> **🔁 Dừng lại tự kiểm tra**
>
> Phân loại: `"ShipmentDelivered"`, `"SendEmail"`, `"GetUserProfile"`.
>
> <details><summary>Đáp án</summary>
>
> - `ShipmentDelivered` → **Event** (quá khứ, sự thật).
> - `SendEmail` → **Command** (mệnh lệnh, một handler thực hiện).
> - `GetUserProfile` → **Query** (đọc dữ liệu).
> </details>

> **📝 Tóm tắt mục 2**
> - Command = "do this" (mệnh lệnh, có thể bị từ chối, có handler cụ thể).
> - Event = "this happened" (quá khứ, sự thật bất biến, broadcast).
> - Query = "give me data" (đọc, không đổi state).
> - Đặt tên event ở **thì quá khứ**; command ở **mệnh lệnh**.

---

## 3. Event notification vs Event-carried state transfer

Khi phát event `OrderCreated`, bao nhiêu dữ liệu nên nhét vào? Có hai thái cực.

### 3.1 Event notification — chỉ báo, không chở data

Event chỉ chứa **ID + tối thiểu metadata**. Consumer muốn chi tiết → tự **query lại** producer.

```json
// OrderCreated (notification)
{ "eventType": "OrderCreated", "orderId": 1001, "occurredAt": "2026-05-26T10:00:00Z" }
```

Consumer nhận được, muốn biết total/items → gọi `GET /orders/1001` về OrderService.

> **💡 Trực giác**: như tin nhắn "Em đăng bài mới rồi, vào xem nhé" — chỉ báo, muốn xem nội dung thì tự click vào.

**Ưu**: event nhỏ, không lộ schema nội bộ, dữ liệu luôn "tươi" (query lúc cần). **Nhược**: thêm một round-trip query, tạo lại **coupling thời gian** (consumer cần OrderService còn sống lúc query), tăng tải đọc lên producer.

### 3.2 Event-carried state transfer — chở luôn data

Event chứa **đầy đủ trạng thái** cần thiết. Consumer **không cần query lại**.

```json
// OrderCreated (state transfer)
{
  "eventType": "OrderCreated", "orderId": 1001, "occurredAt": "...",
  "userId": 42, "total": 250.00, "currency": "USD",
  "items": [{ "sku": "A1", "qty": 2, "price": 100 }, { "sku": "B3", "qty": 1, "price": 50 }],
  "shippingAddress": { "city": "Hanoi", "zip": "100000" }
}
```

> **💡 Trực giác**: như email gửi kèm toàn bộ file đính kèm — mở ra là có hết, không cần vào server tải thêm.

**Ưu**: consumer **tự chủ hoàn toàn** (không cần producer còn sống), không tạo thêm tải đọc, có thể build **local read model** (cache bản sao). **Nhược**: event to hơn, dữ liệu trong event có thể **cũ** (stale) so với DB hiện tại, lộ nhiều schema → versioning khó hơn.

> **❓ Câu hỏi tự nhiên của người đọc**
>
> - *"Nên chọn cái nào?"* → Quy tắc thực dụng: nếu consumer cần dữ liệu **ngay và đầy đủ** để xử lý độc lập (vd tính tiền, dựng read model) → **state transfer**. Nếu dữ liệu lớn / hay đổi / consumer chỉ cần biết "có cái gì đó xảy ra" → **notification + query**.
> - *"Event-carried state transfer có giống event sourcing không?"* → Không hẳn. State transfer chỉ là cách đóng gói một event; event sourcing (mục 11) là dùng **chuỗi event làm nguồn chân lý** cho toàn bộ state.
> - *"Payload to quá thì sao?"* → Dùng **claim check pattern** (mục 13): lưu payload lớn ra blob storage, event chỉ chứa reference.

> **⚠ Lỗi thường gặp**
>
> Nhét **quá nhiều** data vào event "cho chắc" → event 2MB, broker nghẽn, mọi consumer phải parse cả đống field không dùng, và mỗi lần đổi field là một lần versioning đau đớn. Ngược lại nhét **quá ít** → consumer nào cũng phải query lại → producer thành bottleneck, mất luôn lợi ích decoupling. **Cân**: chở đúng data mà *đa số* consumer cần.

> **📝 Tóm tắt mục 3**
> - Notification: chỉ ID, consumer query lại → event nhỏ, nhưng coupling thời gian + tải đọc.
> - State transfer: chở full data, consumer tự chủ → event to, data có thể stale.
> - Chọn theo nhu cầu consumer; payload lớn dùng claim check.

---

## 4. Choreography vs Orchestration

Khi một nghiệp vụ cần **nhiều service phối hợp** (vd: order → payment → inventory → shipping), có hai cách điều phối.

### 4.1 Choreography — vũ điệu phi tập trung

**Không có nhạc trưởng.** Mỗi service tự lắng nghe event và phản ứng, phát ra event mới. Luồng "tự chảy" qua chuỗi event.

```
OrderService:     publish OrderCreated
                       ↓ (PaymentService nghe)
PaymentService:   xử lý → publish PaymentCharged
                       ↓ (InventoryService nghe)
InventoryService: xử lý → publish StockReserved
                       ↓ (ShippingService nghe)
ShippingService:  xử lý → publish ShipmentScheduled
```

> **💡 Trực giác**: như một điệu nhảy tập thể không có biên đạo đứng chỉ — mỗi vũ công nhìn người bên cạnh và tự biết bước tiếp theo. Đẹp khi trơn tru, nhưng nếu một người sai nhịp thì khó biết "ai đang dẫn".

**Ưu**: services **rất độc lập** (decoupled tối đa), thêm service mới chỉ cần subscribe event, không có single point of failure logic. **Nhược**: **luồng nghiệp vụ bị "phân tán" khắp nơi** — muốn hiểu "order đi qua những bước nào" phải đọc code của 4 service. Khó **trace**, khó debug, dễ thành **spaghetti** khi luồng phức tạp.

### 4.2 Orchestration — có nhạc trưởng

Một **orchestrator** trung tâm (vd `OrderSaga`) điều phối: nó gửi command tới từng service, nhận kết quả, quyết định bước tiếp.

```
        OrderOrchestrator
        ┌──────┼──────┬──────────┐
        ↓      ↓      ↓          ↓
   (1)Charge (2)Reserve (3)Schedule
   Payment   Stock     Shipment
        ↑      ↑      ↑
     PaymentCharged / StockReserved / ... (reply về orchestrator)
```

Orchestrator: `gửi ChargePayment` → chờ `PaymentCharged` → `gửi ReserveStock` → chờ `StockReserved` → `gửi ScheduleShipment` → ...

> **💡 Trực giác**: như dàn nhạc có nhạc trưởng vung đũa — mọi người nhìn vào một người. Dễ thấy "đang ở đoạn nào của bản nhạc".

**Ưu**: luồng nghiệp vụ **tập trung một chỗ**, dễ đọc, dễ trace, dễ thêm bước/điều kiện, dễ xử lý lỗi & compensation (xem saga, mục 10). **Nhược**: orchestrator **biết về tất cả** service → coupling cao hơn; orchestrator là điểm tập trung logic (cần làm cho nó resilient).

### 4.3 Trade-off & khi nào dùng

| Tiêu chí | Choreography | Orchestration |
|----------|:---:|:---:|
| Coupling | Thấp (tốt) | Cao hơn |
| Dễ trace / debug | Khó | **Dễ** |
| Dễ thêm consumer | **Dễ** | Phải sửa orchestrator |
| Luồng phức tạp, nhiều rẽ nhánh | Spaghetti | **Quản lý tốt** |
| Compensation (rollback) | Khó điều phối | **Dễ** (orchestrator biết hết) |

**Quy tắc thực dụng:**

- Luồng **đơn giản, ít bước, ít rẽ nhánh**, ưu tiên decoupling → **choreography**.
- Luồng **phức tạp, nhiều bước có điều kiện, cần rollback** (distributed transaction) → **orchestration** (chính là saga orchestration — Lesson 66).

> **❓ Câu hỏi tự nhiên của người đọc**
>
> - *"Có dùng lẫn được không?"* → Có. Nhiều hệ dùng choreography giữa các domain (loose) nhưng orchestration trong một domain phức tạp (vd checkout flow). Không phải chọn một-mất-một.

> **🔁 Dừng lại tự kiểm tra**
>
> Một luồng "đăng ký user → gửi welcome email → tặng voucher → ghi analytics". Nên choreography hay orchestration?
>
> <details><summary>Đáp án</summary>
>
> **Choreography**. Các bước độc lập, không cần rollback, không có điều kiện phức tạp, và rất dễ thêm consumer mới (vd "gửi SMS"). Chỉ cần phát `UserRegistered` và mỗi service tự subscribe.
> </details>

> **📝 Tóm tắt mục 4**
> - Choreography: services tự react, không nhạc trưởng → decoupled nhưng khó trace.
> - Orchestration: orchestrator điều phối → dễ trace/rollback nhưng coupling cao.
> - Đơn giản → choreography; phức tạp + cần rollback → orchestration (saga).

---

## 5. Outbox pattern — ghi DB + publish event atomic

Đây là pattern **quan trọng nhất** của bài. Đọc kỹ.

### 5.1 Vấn đề: "dual write" không atomic

Hãy xem code "ngây thơ" của OrderService:

```go
func CreateOrder(o Order) error {
    db.Save(o)              // (1) ghi order vào DB  → THÀNH CÔNG
    broker.Publish("OrderCreated", o) // (2) publish event
    return nil
}
```

Bạn vừa làm **hai ghi tới hai hệ thống khác nhau** (DB và broker). Không có cách nào làm cả hai **atomic** (cùng thành công hoặc cùng thất bại). Xét các kịch bản hỏng:

```
Kịch bản A: (1) thành công, rồi process CRASH trước (2).
   → Order nằm trong DB, NHƯNG event OrderCreated không bao giờ được phát.
   → Payment/Inventory KHÔNG BAO GIỜ biết order này. Order "treo" mãi mãi. MẤT EVENT.

Kịch bản B: đổi thứ tự — publish trước, ghi DB sau.
   → publish (2) thành công, rồi CRASH trước (1).
   → Event đã phát, Payment trừ tiền, NHƯNG order KHÔNG có trong DB. EVENT MA.
```

> **💡 Trực giác**: như chuyển khoản — trừ tiền tài khoản A và cộng vào B phải **cùng** xảy ra. Nếu trừ A xong điện mất trước khi cộng B → tiền bốc hơi. DB + broker là hai "ngân hàng" khác nhau, không có giao dịch chung.

Đây gọi là **dual-write problem**. Không thể giải bằng cách "cẩn thận hơn" — process có thể crash ở **bất kỳ** điểm nào giữa hai lệnh.

### 5.2 Giải pháp: Outbox pattern

**Ý tưởng**: biến "publish event" thành "ghi vào một bảng trong CÙNG DATABASE" — để nó nằm trong **cùng transaction** với việc ghi order. Sau đó một tiến trình riêng đọc bảng đó và publish.

**Bước 1 — Ghi atomic vào DB:** trong một transaction, ghi cả `order` và một dòng vào bảng `outbox`.

```sql
BEGIN;
  INSERT INTO orders (id, user_id, total) VALUES (1001, 42, 250);
  INSERT INTO outbox (id, event_type, payload, published)
    VALUES (uuid(), 'OrderCreated', '{"orderId":1001,...}', false);
COMMIT;   -- ← cả hai cùng commit, hoặc cùng rollback. ATOMIC.
```

Vì `orders` và `outbox` cùng một DB → transaction của DB đảm bảo **atomic**. Không còn kịch bản "order có nhưng event mất".

**Bước 2 — Poller publish:** một tiến trình riêng (relay/poller) lặp:

```
mỗi 1s:
  rows = SELECT * FROM outbox WHERE published = false ORDER BY created_at LIMIT 100
  for each row:
      broker.Publish(row.event_type, row.payload)
      UPDATE outbox SET published = true WHERE id = row.id
```

> **❓ Câu hỏi tự nhiên của người đọc**
>
> - *"Nếu poller publish xong rồi crash trước khi UPDATE published=true?"* → Lần sau poller lại đọc dòng đó (vẫn `published=false`) và publish **lần nữa**. Tức là event có thể bị giao **>1 lần** → **at-least-once**. Đây là lý do consumer **bắt buộc phải idempotent** (mục 6). Outbox giải quyết "mất event" bằng cách chấp nhận "có thể trùng event".
> - *"Bảng outbox phình to thì sao?"* → Có job dọn dẹp xóa các dòng `published=true` cũ (vd > 7 ngày), hoặc xóa ngay sau khi publish nếu không cần audit.
> - *"Có cách nào không cần poller không?"* → Có: **CDC** (Change Data Capture).

### 5.3 CDC — Change Data Capture (Debezium)

Thay vì poll bảng outbox, dùng công cụ như **Debezium** đọc trực tiếp **Write-Ahead Log (WAL)** của database. Mỗi `INSERT` vào outbox được DB ghi vào WAL; Debezium tail WAL, biến mỗi dòng outbox mới thành một message Kafka tự động.

```
App: INSERT order + INSERT outbox (1 transaction)
         ↓
     DB ghi vào WAL
         ↓
     Debezium tail WAL  →  publish lên Kafka
```

**Ưu so với poller**: không phải poll (giảm tải DB, độ trễ thấp gần real-time), không phải tự viết relay. **Nhược**: thêm hạ tầng (Debezium + Kafka Connect), phụ thuộc DB engine hỗ trợ logical replication.

> **⚠ Lỗi thường gặp**
>
> Tưởng outbox đảm bảo **exactly-once**. Không! Outbox đảm bảo **at-least-once** (không mất, nhưng có thể trùng). Nếu bạn không làm consumer idempotent, một event giao 2 lần sẽ trừ tiền 2 lần. Outbox **luôn** đi kèm idempotent consumer.

> **🔁 Dừng lại tự kiểm tra**
>
> Vì sao ghi `outbox` trong cùng transaction lại an toàn hơn gọi `broker.Publish`?
>
> <details><summary>Đáp án</summary>
>
> Vì `outbox` là một **bảng trong cùng database** với `orders`, nên cả hai `INSERT` nằm trong **một transaction DB** — DB đảm bảo chúng cùng commit hoặc cùng rollback (atomic). `broker.Publish` gọi tới **hệ thống khác** (Kafka), không nằm trong transaction DB, nên không có đảm bảo atomic với việc ghi order.
> </details>

> **📝 Tóm tắt mục 5**
> - Dual-write (ghi DB + publish broker) **không** atomic → crash giữa chừng làm mất/ma event.
> - Outbox: ghi event vào bảng `outbox` **cùng transaction** với data → atomic.
> - Poller/CDC đọc outbox → publish lên broker (at-least-once).
> - Outbox luôn đi kèm idempotent consumer.

---

## 6. Idempotent consumer — chống xử lý trùng

At-least-once nghĩa là consumer **có thể nhận cùng một event nhiều lần** (do retry, do poller publish lại, do broker giao lại khi không nhận được ack). Consumer phải xử lý sao cho **xử lý 1 lần và xử lý 5 lần cho cùng kết quả**.

> **💡 Trực giác**: nút thang máy — bấm 1 lần hay đập 10 lần thì thang vẫn chỉ đến đúng một lần. Đó là idempotent.

**Kỹ thuật phổ biến nhất: dedup bằng processed-events table.**

```go
func handlePaymentCharged(ev Event) error {
    tx := db.Begin()
    // (1) kiểm tra đã xử lý event này chưa
    if tx.Exists("SELECT 1 FROM processed_events WHERE event_id = ?", ev.ID) {
        tx.Rollback()
        return nil   // đã xử lý → bỏ qua, không làm lại
    }
    // (2) làm nghiệp vụ
    tx.Exec("UPDATE orders SET status='paid' WHERE id=?", ev.OrderID)
    // (3) đánh dấu đã xử lý — CÙNG transaction với (2)
    tx.Exec("INSERT INTO processed_events(event_id) VALUES (?)", ev.ID)
    return tx.Commit()   // (2)+(3) atomic
}
```

Điểm mấu chốt: bước (2) nghiệp vụ và bước (3) ghi dấu nằm **cùng một transaction**. Nếu giao lại event đã xử lý, bước (1) thấy có trong `processed_events` → return ngay.

Mỗi event cần một **idempotency key** ổn định: thường là `event_id` (UUID sinh khi tạo event), hoặc business key (vd `orderId + "PaymentCharged"`).

> **⚠ Lỗi thường gặp**
>
> Làm nghiệp vụ rồi mới ghi dấu ở **transaction khác**: nếu crash giữa hai bước → nghiệp vụ chạy nhưng chưa ghi dấu → lần sau chạy lại nghiệp vụ (trừ tiền 2 lần). Phải **cùng transaction**.
>
> Lỗi khác: dùng dedup key không ổn định (vd timestamp lúc nhận) → mỗi lần nhận lại sinh key khác → dedup vô dụng.

> **📝 Tóm tắt mục 6**
> - At-least-once → consumer phải idempotent.
> - Dedup: lưu `event_id` đã xử lý vào bảng, check trước khi xử lý.
> - Ghi nghiệp vụ + ghi dấu **cùng transaction**.
> - Idempotency key phải **ổn định** (event_id / business key).

---

## 7. Event schema & versioning

Event là **hợp đồng (contract)** giữa producer và mọi consumer. Khi producer đổi cấu trúc event mà consumer chưa kịp cập nhật → vỡ.

**Schema registry** (Confluent Schema Registry với **Avro**, hoặc **Protobuf**): nơi đăng ký và kiểm tra schema. Producer/consumer thỏa thuận schema qua registry; registry **từ chối** schema không tương thích.

**Quy tắc vàng: thay đổi phải backward & forward compatible.**

- **Thêm field optional có default** → an toàn. Consumer cũ bỏ qua field mới; consumer mới đọc được event cũ (dùng default).
- **Xóa field / đổi tên / đổi type / thêm field bắt buộc** → **phá vỡ**. Tránh.

```json
// v1
{ "orderId": 1001, "total": 250 }

// v2 — THÊM field optional "currency" có default "USD" → backward compatible
{ "orderId": 1001, "total": 250, "currency": "USD" }
//   consumer cũ (chỉ đọc orderId, total) → vẫn chạy, bỏ qua currency
//   consumer mới gặp event v1 (không có currency) → dùng default "USD"
```

> **⚠ Lỗi thường gặp**
>
> Đổi `total` (int) thành object `{ amount, currency }` "cho gọn" → mọi consumer cũ parse `total` là số sẽ crash. Muốn đổi kiểu → **thêm field mới** `totalMoney`, giữ `total` cũ, deprecate dần, rồi mới xóa sau khi mọi consumer đã chuyển.

> **📝 Tóm tắt mục 7**
> - Event là contract; đổi schema có thể vỡ consumer.
> - Schema registry (Avro/Protobuf) kiểm tra tương thích.
> - An toàn: thêm field optional + default. Nguy hiểm: xóa/đổi tên/đổi type/thêm field bắt buộc.

---

## 8. Event ordering — thứ tự event

EDA thường **không đảm bảo thứ tự toàn cục**. Nếu `AccountCreated` và `AccountClosed` đến lệch thứ tự → tai họa.

**Đảm bảo thứ tự theo partition key.** Kafka đảm bảo thứ tự **trong một partition**. Đặt **partition key** = thực thể cần giữ thứ tự (vd `accountId`) → mọi event của cùng account vào cùng partition → giữ đúng thứ tự cho account đó.

```
publish(topic="accounts", key=accountId, value=event)
   → mọi event cùng accountId → cùng partition → ordered cho account đó
   → event của account khác có thể song song (vẫn ordered riêng từng account)
```

**Sequence number**: nhúng số thứ tự tăng dần vào event (`seq: 1, 2, 3...`). Consumer phát hiện gap (thiếu seq) hoặc out-of-order, có thể buffer/đợi/từ chối.

> **⚠ Lỗi thường gặp**
>
> Tăng số partition để scale → event của một key bị **re-hash** sang partition khác → thứ tự lịch sử bị phá. Đổi số partition của topic đang chạy là thao tác nguy hiểm với hệ cần ordering.

> **📝 Tóm tắt mục 8**
> - Không có thứ tự toàn cục; chỉ ordered trong một partition.
> - Partition key = entity cần giữ thứ tự (vd accountId).
> - Sequence number giúp phát hiện gap / out-of-order.

---

## 9. Eventual consistency — nhất quán dần dần

Vì consumer xử lý **bất đồng bộ**, dữ liệu ở các service **không nhất quán tức thời** mà chỉ **nhất quán dần** (eventually consistent — xem [Lesson 62](../lesson-62-distributed-fundamentals/)).

**Consumer lag**: khoảng trễ giữa lúc event được phát và lúc consumer xử lý xong. Lag cao = dữ liệu downstream cũ lâu.

**Read-after-write issue** (ví dụ kinh điển):

```
1. User POST /orders → OrderService ghi DB + phát OrderCreated. Trả 201.
2. User lập tức GET /orders/me → đọc từ "OrderListView" (read model do consumer dựng).
3. Nhưng consumer chưa kịp xử lý OrderCreated → OrderListView CHƯA có order mới.
4. User: "Tôi vừa đặt mà sao không thấy?!"
```

**Cách giảm đau:**
- **Read-your-writes**: sau khi ghi, đọc tạm từ chính producer (đã có data) thay vì read model.
- **Hiển thị optimistic**: client tự thêm order vào UI ngay, không chờ read model.
- **Đặt kỳ vọng đúng**: "Đơn hàng đang được xử lý" thay vì giả vờ đã xong.

> **📝 Tóm tắt mục 9**
> - Async → eventual consistency, không nhất quán tức thời.
> - Consumer lag = độ trễ xử lý; read model có thể cũ.
> - Read-after-write: vừa ghi đọc lại có thể chưa thấy → cần xử lý UX.

---

## 10. Saga — distributed transaction (preview Lesson 66)

Một nghiệp vụ trải qua nhiều service (trừ tiền, giữ hàng, ship) **không thể** dùng một transaction DB (mỗi service một DB riêng). **Saga** giải quyết bằng **chuỗi các bước cục bộ + compensation** (hành động bù trừ khi lỗi).

```
ChargePayment OK → ReserveStock OK → ScheduleShipment FAIL!
   → compensation chạy ngược: ReleaseStock → RefundPayment
```

Saga không có "rollback" thật như DB; nó **làm các bước ngược lại** (refund để bù cho charge). Hai kiểu: **choreography saga** (mục 4.1) và **orchestration saga** (mục 4.2). Học sâu ở **[Lesson 66 — Saga Pattern](../lesson-66-saga-pattern/)**.

---

## 11. Event sourcing — event là nguồn chân lý (preview Lesson 67)

Thay vì lưu **trạng thái hiện tại** (current state) trong DB, **event sourcing** lưu **toàn bộ chuỗi event** đã xảy ra làm nguồn chân lý. Trạng thái hiện tại = **replay** (phát lại) toàn bộ event từ đầu.

```
Thay vì:  balance = 150  (chỉ biết kết quả)
Lưu:      Deposited(100), Deposited(80), Withdrawn(30)  → replay = 150 (biết cả lịch sử)
```

Lợi: audit hoàn hảo, time-travel, dựng nhiều read model khác nhau. Học sâu ở **[Lesson 67 — CQRS & Event Sourcing](../lesson-67-cqrs-event-sourcing/)**.

---

## 12. Dead letter & retry — xử lý poison event

Một event mà consumer **xử lý mãi không xong** (bug, data hỏng, dependency chết) gọi là **poison event**. Nếu cứ retry vô hạn → kẹt cả luồng (head-of-line blocking).

**Retry với backoff**: thử lại vài lần, mỗi lần chờ lâu hơn (1s, 2s, 4s...). Nếu vẫn fail sau N lần → chuyển sang **Dead Letter Queue (DLQ)**.

```
event → consumer fail → retry (1s) → fail → retry (2s) → ... → fail lần thứ N
     → đẩy vào DLQ  (kèm metadata: lý do lỗi, số lần thử, stack trace)
     → luồng chính tiếp tục với event sau (không bị kẹt)
     → người/đội xử lý DLQ riêng: sửa bug, fix data, rồi replay
```

> **⚠ Lỗi thường gặp**
>
> Retry **không** có giới hạn → poison event lặp vô tận, chiếm tài nguyên, chặn các event sau. Luôn có **max retry → DLQ**. Và phân biệt lỗi **tạm thời** (network → nên retry) vs **vĩnh viễn** (data sai → vào DLQ ngay, retry vô ích).

> **📝 Tóm tắt mục 12**
> - Poison event = event xử lý mãi không xong.
> - Retry có backoff + giới hạn số lần → DLQ.
> - DLQ tách event lỗi ra khỏi luồng chính để xử lý riêng + replay.

---

## 13. Common patterns

| Pattern | Vấn đề giải quyết | Cách làm |
|---------|-------------------|----------|
| **Event-carried state transfer** (mục 3.2) | Consumer cần tự chủ, không query lại | Chở full state trong event |
| **Claim check** | Payload quá lớn (file, ảnh) cho broker | Lưu payload ra blob store (S3), event chỉ chứa **reference** (URL/ID). Consumer tự tải. |
| **Saga** (mục 10) | Distributed transaction qua nhiều service | Chuỗi bước cục bộ + compensation |
| **Outbox** (mục 5) | Atomic DB write + publish | Ghi event vào outbox table cùng transaction |
| **Idempotent consumer** (mục 6) | At-least-once → trùng | Dedup theo event_id |

**Claim check chi tiết:**

```
Producer: upload 50MB ảnh → S3 (key: img/abc123)
          publish ImageUploaded { imageId: "abc123", url: "s3://.../abc123" }  ← event ~200 bytes
Consumer: nhận event → tự GET s3://.../abc123 khi cần xử lý
```

> **💡 Trực giác**: như gửi thư báo "Hàng của bạn ở kho số 7" thay vì nhét cả kiện hàng vào phong bì.

---

## 14. Common pitfall — tổng hợp những cái bẫy

| Pitfall | Hậu quả | Cách tránh |
|---------|---------|-----------|
| **Write DB + publish không atomic** | Mất event / event ma | **Outbox pattern** (mục 5) |
| **Event chứa quá nhiều data** | Broker nghẽn, versioning đau, consumer parse thừa | Chở đúng data đa số consumer cần; payload lớn → claim check |
| **Event chứa quá ít data** | Consumer query lại → producer thành bottleneck | Cân nhắc state transfer cho data hay dùng |
| **Choreography spaghetti** | Luồng phân tán khắp nơi, không trace nổi | Luồng phức tạp → orchestration; có distributed tracing |
| **Consumer không idempotent** | At-least-once → xử lý trùng (trừ tiền 2 lần) | **Dedup table** (mục 6) |
| **No schema versioning** | Đổi event → vỡ consumer cũ | Schema registry + chỉ thay đổi backward-compatible |
| **Đặt tên event ở thì hiện tại** | Command đội lốt event → coupling ẩn | Event = thì **quá khứ** (`OrderCreated`) |
| **Retry vô hạn poison event** | Kẹt luồng, cạn tài nguyên | Max retry → DLQ (mục 12) |

---

## Bài tập

> Làm trước, đối chiếu lời giải bên dưới. Code Go chạy được ở [solutions.go](./solutions.go), minh họa tương tác ở [visualization.html](./visualization.html).

### BT1 — Phân loại event / command / query

Phân loại 6 thông điệp sau, giải thích:

1. `RegisterUser { email, password }`
2. `UserRegistered { userId, email }`
3. `GetUserById { userId }`
4. `SendWelcomeEmail { userId }`
5. `EmailSent { userId, messageId }`
6. `ListActiveUsers { page }`

### BT2 — Outbox pattern

Viết (pseudo-code hoặc Go) một hàm `CreateOrder` ghi `order` và publish event `OrderCreated` một cách **atomic**, dùng outbox. Mô tả luôn vai trò của poller.

### BT3 — Choreography vs orchestration

Cho luồng `order → payment → inventory → ship`. Thiết kế cả **hai** cách (choreography và orchestration). Vẽ luồng event/command và chỉ ra điểm khác biệt khi bước `inventory` thất bại.

### BT4 — Idempotent consumer

Viết handler cho event `PaymentCharged` đảm bảo: nếu event được giao 2 lần thì order chỉ chuyển sang `paid` **một lần** (không trừ số dư 2 lần). Dùng dedup.

### BT5 — Event versioning

Event v1 là `OrderCreated { orderId, total }`. Nghiệp vụ cần thêm `currency`. Hãy đề xuất schema v2 **backward-compatible** và giải thích vì sao consumer cũ lẫn mới đều không vỡ. Sau đó nêu một thay đổi **phá vỡ** và cách làm đúng.

### BT6 — Diagnose

Một dev báo: "OrderService ghi DB thành công (order có trong bảng), nhưng PaymentService không bao giờ nhận `OrderCreated`, thỉnh thoảng thôi — lúc được lúc không." Chẩn đoán nguyên nhân và đề xuất fix.

---

## Lời giải chi tiết

### Lời giải BT1

| # | Thông điệp | Loại | Lý do |
|---|-----------|------|-------|
| 1 | `RegisterUser` | **Command** | Mệnh lệnh, yêu cầu thực hiện, có thể bị từ chối (email trùng), một handler xử lý |
| 2 | `UserRegistered` | **Event** | Thì quá khứ, sự thật đã xảy ra, broadcast (nhiều service quan tâm) |
| 3 | `GetUserById` | **Query** | Đọc dữ liệu, không đổi state |
| 4 | `SendWelcomeEmail` | **Command** | Mệnh lệnh gửi tới EmailService |
| 5 | `EmailSent` | **Event** | Thì quá khứ, sự thật (vd để analytics nghe) |
| 6 | `ListActiveUsers` | **Query** | Đọc danh sách |

Mẹo nhận diện: tên **quá khứ** + "đã xảy ra" → event; **mệnh lệnh** + "hãy làm" + có thể reject → command; "cho tôi xem" → query.

### Lời giải BT2

```go
// CreateOrder ghi order + outbox trong CÙNG transaction → atomic.
func CreateOrder(db *DB, o Order) error {
    tx := db.Begin()
    defer tx.Rollback() // nếu chưa Commit thì rollback

    // (1) ghi order
    if err := tx.Exec("INSERT INTO orders(id,user_id,total) VALUES(?,?,?)",
        o.ID, o.UserID, o.Total); err != nil {
        return err
    }
    // (2) ghi event vào outbox — CÙNG transaction
    payload := toJSON(OrderCreated{OrderID: o.ID, Total: o.Total})
    if err := tx.Exec("INSERT INTO outbox(id,event_type,payload,published) VALUES(?,?,?,false)",
        newUUID(), "OrderCreated", payload); err != nil {
        return err
    }
    return tx.Commit() // (1)+(2) cùng commit hoặc cùng rollback
}
```

**Vai trò poller** (tiến trình riêng, chạy nền): lặp định kỳ, `SELECT * FROM outbox WHERE published=false`, với mỗi dòng → `broker.Publish` → `UPDATE published=true`. Nếu poller crash sau publish trước update → publish lại (at-least-once) → consumer phải idempotent.

**Vì sao atomic**: `orders` và `outbox` cùng một DB → một transaction DB bao cả hai. Không còn cảnh "order có nhưng event mất".

### Lời giải BT3

**Choreography:**

```
OrderService:     publish OrderCreated
PaymentService:   (nghe OrderCreated) charge → publish PaymentCharged
InventoryService: (nghe PaymentCharged) reserve → publish StockReserved
ShippingService:  (nghe StockReserved) ship → publish ShipmentScheduled
```

Khi inventory **fail**: InventoryService publish `StockReservationFailed`. Ai phải bù? PaymentService phải tự nghe event này và **refund** (publish `PaymentRefunded`). OrderService nghe để set order `cancelled`. → Logic bù **rải khắp** các service, mỗi service phải biết "ai bù cho ai" → khó trace.

**Orchestration:**

```
OrchestratorSaga:
  step1: gửi ChargePayment → chờ PaymentCharged
  step2: gửi ReserveStock  → chờ StockReserved
  step3: gửi ScheduleShipment → chờ ShipmentScheduled → DONE
```

Khi inventory **fail** (`step2` trả `StockReservationFailed`): orchestrator **biết** đã làm step1 → tự gửi compensation `RefundPayment`, rồi set order `cancelled`. → Logic bù **tập trung một chỗ** trong orchestrator → dễ đọc, dễ trace, dễ thêm bước.

**Khác biệt cốt lõi**: choreography phân tán logic bù khắp nơi (decoupled nhưng khó nhìn tổng thể); orchestration tập trung (coupling cao hơn nhưng nhìn được toàn luồng + compensation gọn).

### Lời giải BT4

```go
func HandlePaymentCharged(db *DB, ev PaymentCharged) error {
    tx := db.Begin()
    defer tx.Rollback()

    // (1) dedup: đã xử lý event này chưa?
    if tx.Exists("SELECT 1 FROM processed_events WHERE event_id=?", ev.EventID) {
        return nil // đã xử lý → bỏ qua, không làm lại
    }
    // (2) nghiệp vụ: set order paid (idempotent về mặt logic — set, không trừ liên tục)
    if err := tx.Exec("UPDATE orders SET status='paid' WHERE id=?", ev.OrderID); err != nil {
        return err
    }
    // (3) ghi dấu đã xử lý — CÙNG transaction với (2)
    if err := tx.Exec("INSERT INTO processed_events(event_id) VALUES(?)", ev.EventID); err != nil {
        return err
    }
    return tx.Commit() // (2)+(3) atomic
}
```

Giao lần 2 cùng `EventID` → bước (1) thấy đã có trong `processed_events` → return ngay, không làm lại. Mấu chốt: (2) và (3) **cùng transaction** — nếu crash giữa chừng thì rollback cả hai, lần sau làm lại từ đầu an toàn.

### Lời giải BT5

**Schema v2 backward-compatible** — thêm field optional có default:

```json
// v2
{ "orderId": 1001, "total": 250, "currency": "USD" }   // currency optional, default "USD"
```

- **Consumer cũ** (chỉ đọc `orderId`, `total`): gặp v2 → bỏ qua field `currency` lạ → vẫn chạy.
- **Consumer mới** (đọc cả `currency`): gặp event **v1** (không có `currency`) → dùng **default** `"USD"` → vẫn chạy.

→ Cả hai chiều đều không vỡ vì thêm field optional + default là thay đổi tương thích.

**Thay đổi phá vỡ**: đổi `total` từ số `250` thành object `{ "amount": 250, "currency": "USD" }`. Consumer cũ parse `total` là số → crash. **Cách làm đúng**: thêm field mới `totalMoney: { amount, currency }`, **giữ** `total` cũ song song, deprecate `total` dần; sau khi mọi consumer đã chuyển sang `totalMoney` mới xóa `total` (một major version sau).

### Lời giải BT6

**Chẩn đoán**: đây là **dual-write problem** (mục 5.1). OrderService làm hai ghi không atomic:

```go
db.Save(order)              // thành công → order CÓ trong DB
broker.Publish("OrderCreated", ...) // thỉnh thoảng fail (broker timeout / process restart)
```

"Lúc được lúc không" chính là dấu hiệu: phần lớn lần thì publish kịp, nhưng khi broker chậm / process bị restart / network hiccup **ngay giữa** hai lệnh → DB đã commit nhưng event không phát → order treo. Vì DB và broker là hai hệ thống khác nhau, không có transaction chung.

**Fix — Outbox pattern**:
1. Trong **cùng transaction** với `INSERT orders`, `INSERT` một dòng vào `outbox(event_type='OrderCreated', payload=..., published=false)`. → atomic, event không bao giờ mất.
2. Một poller (hoặc CDC/Debezium) đọc `outbox WHERE published=false` → `broker.Publish` → `UPDATE published=true`.
3. Vì poller có thể publish lại (at-least-once), **PaymentService phải idempotent** (dedup theo `event_id`).

Sau fix: dù process crash ở bất kỳ đâu, event nằm an toàn trong outbox và sẽ được publish khi poller chạy lại → không còn "lúc được lúc không".

---

## Code & Minh họa

- **[solutions.go](./solutions.go)** — event bus in-memory, outbox pattern (transaction + outbox table + poller), idempotent consumer, choreography demo (order → payment → inventory). Chạy: `go run solutions.go`.
- **[visualization.html](./visualization.html)** — 3 module tương tác:
  1. **Choreography vs Orchestration** — animate luồng order theo cả hai cách.
  2. **Outbox pattern** — minh họa atomic DB+outbox, poller publish, an toàn khi crash.
  3. **Event vs Command** — phân loại thông điệp tương tác.

---

## Bài tiếp theo

→ **[Lesson 66 — Saga Pattern](../lesson-66-saga-pattern/)**: distributed transaction qua chuỗi event + compensation, choreography saga vs orchestration saga — đi sâu phần đã preview ở mục 10.

Tham khảo: [Lesson 64 — Message Queue](../lesson-64-message-queue-nats-kafka/) (broker, partition, delivery), [Lesson 62 — Distributed Fundamentals](../lesson-62-distributed-fundamentals/) (eventual consistency, idempotency), [Lesson 67 — CQRS & Event Sourcing](../lesson-67-cqrs-event-sourcing/).
