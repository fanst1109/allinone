// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: Programming/lesson-66-saga-pattern/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 66 — Saga Pattern (giao dịch phân tán không cần 2PC)

> Tier 6 · Distributed & Microservices · Lesson 66
> Tiền đề: [L62 — Distributed Fundamentals](../lesson-62-distributed-fundamentals/) (eventual consistency, idempotency), [L64 — Message Queue](../lesson-64-message-queue-nats-kafka/) (at-least-once, consumer group), [L65 — Event-Driven Architecture](../lesson-65-event-driven-architecture/) (event vs command, outbox, choreography vs orchestration).
> Tiếp theo: [L67 — CQRS & Event Sourcing](../lesson-67-cqrs-event-sourcing/).

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Hiểu **vì sao** giao dịch phân tán qua nhiều microservice không thể dùng \`BEGIN ... COMMIT\` như một DB đơn lẻ, và vì sao **2PC (two-phase commit)** không scale.
- Định nghĩa được **Saga**: một chuỗi local transaction, mỗi bước có một **compensating action** (hành động bù) để hoàn tác nếu bước sau thất bại.
- Phân biệt **2 cách implement saga**: **choreography** (mỗi service tự phản ứng event) và **orchestration** (một orchestrator điều phối trung tâm).
- Hiểu **compensation là semantic undo** chứ không phải rollback DB, và vì sao điều đó quan trọng.
- Nắm các vấn đề thực tế: **thiếu isolation**, **idempotency**, **state persistence để recover**, **forward vs backward recovery**, **pivot transaction**.
- Tránh được các **pitfall** kinh điển: compensation không idempotent, dirty read intermediate state, orchestrator là SPOF, compensation cũng fail.

---

## 1. Vấn đề: giao dịch trải dài nhiều service

> 💡 **Trực giác.** Hãy hình dung bạn đặt một combo: vé máy bay (hãng A), khách sạn (hãng B), thuê xe (hãng C). Không ai trong 3 hãng đó cho bạn "khóa cả 3 lại rồi quyết một lần". Bạn phải đặt từng cái — và nếu đặt được vé + khách sạn nhưng hết xe, bạn phải **đi hủy vé và khách sạn vừa đặt**. Đó chính xác là bài toán saga.

### 1.1 Trong một DB đơn lẻ thì dễ

Khi tất cả dữ liệu nằm trong một database, bạn có ACID transaction (xem lại [L56 — Transactions & Isolation](../lesson-56-transactions-isolation/)):

\`\`\`sql
BEGIN;
  INSERT INTO orders (id, status) VALUES (42, 'CREATED');
  UPDATE accounts SET balance = balance - 100 WHERE user_id = 7;   -- trừ tiền
  UPDATE inventory SET qty = qty - 1 WHERE sku = 'BOOK-1';          -- trừ kho
COMMIT;  -- hoặc ROLLBACK: cả 3 thay đổi biến mất nguyên tử
\`\`\`

Nếu bất kỳ câu nào fail, \`ROLLBACK\` đưa mọi thứ về như chưa từng xảy ra. **Atomicity** miễn phí.

### 1.2 Microservice phá vỡ điều đó

Trong kiến trúc microservice, mỗi service có **DB riêng** (database-per-service). Order Service không có quyền \`UPDATE\` bảng của Payment Service hay Inventory Service. Không có một \`BEGIN/COMMIT\` nào bao trùm 3 DB khác nhau ở 3 process khác nhau, có khi ở 3 máy khác nhau.

\`\`\`
  Order Service          Payment Service        Inventory Service
  ┌───────────┐          ┌────────────┐         ┌─────────────┐
  │ orders DB │          │ payments DB│         │ inventory DB│
  └───────────┘          └────────────┘         └─────────────┘
        │                       │                       │
        └────── network ────────┴────────── network ────┘
\`\`\`

Câu hỏi: làm sao đảm bảo "tạo order + trừ tiền + trừ kho" hoặc **tất cả thành công**, hoặc **không có gì xảy ra**, khi chúng nằm ở 3 service riêng?

### 1.3 2PC (Two-Phase Commit) — câu trả lời "đúng" nhưng không scale

2PC là giao thức kinh điển cho distributed transaction, dùng một **coordinator** điều phối:

- **Phase 1 — Prepare (vote):** coordinator hỏi từng participant "mày sẵn sàng commit chưa?". Mỗi participant khóa tài nguyên (lock row), ghi vào log, rồi trả lời \`YES\`/\`NO\`. **Nhưng vẫn chưa commit** — chỉ giữ lock và hứa.
- **Phase 2 — Commit/Abort:** nếu **tất cả** vote \`YES\`, coordinator gửi \`COMMIT\`; nếu có ai \`NO\`, gửi \`ABORT\`. Participant thực thi rồi nhả lock.

Walk-through với 3 service (Order/Payment/Inventory), thời điểm \`t\`:

| t | Coordinator | Order | Payment | Inventory |
|---|-------------|-------|---------|-----------|
| 1 | gửi PREPARE | lock order row, vote YES | lock account row, vote YES | lock sku row, vote YES |
| 2 | nhận 3×YES | (đang giữ lock, chờ) | (đang giữ lock, chờ) | (đang giữ lock, chờ) |
| 3 | gửi COMMIT | commit, nhả lock | commit, nhả lock | commit, nhả lock |

Đúng về mặt ACID — nhưng có 3 vấn đề chí mạng:

- **Blocking:** từ t1 đến t3, **mọi participant đều giữ lock**. Nếu coordinator crash sau khi nhận YES nhưng chưa kịp gửi COMMIT (t2), các participant kẹt giữ lock **vô thời hạn** — không dám commit (sợ người khác abort), không dám abort (sợ người khác commit). Đây gọi là **in-doubt / blocking problem**.
- **Coordinator là SPOF (single point of failure):** cả giao dịch phụ thuộc một thực thể trung tâm. Nó chết → tê liệt.
- **Không scale:** mỗi giao dịch giữ lock xuyên nhiều service trong suốt thời gian round-trip mạng. Throughput sụp đổ khi tải cao, latency tăng. Càng nhiều service tham gia, càng nhiều lock cùng lúc, càng dễ deadlock.

> ❓ **Câu hỏi tự nhiên.**
> - *"Vậy 2PC có còn ai dùng không?"* — Có, trong phạm vi hẹp (vd XA transaction giữa một DB + một message broker trong cùng datacenter, latency thấp). Nhưng xuyên microservice qua mạng public/đa vùng thì gần như không dùng.
> - *"Lock vô thời hạn nghe đáng sợ, có cách giảm không?"* — Có biến thể **3PC** thêm phase để giảm blocking, nhưng phức tạp và vẫn không giải quyết triệt để mạng phân hoạch (network partition). Thực tế ngành chọn hướng khác: **buông atomicity tức thời, đổi lấy eventual consistency** — đó là saga.

> 📝 **Tóm tắt mục 1.** Trong một DB, atomicity miễn phí nhờ ACID transaction. Xuyên microservice (database-per-service) không có \`BEGIN/COMMIT\` chung. 2PC giải được về lý thuyết nhưng **blocking, coordinator SPOF, không scale**. Saga là lựa chọn thực tế.

---

## 2. Saga là gì?

> 💡 **Trực giác.** Saga giống như **đi du lịch và giữ một cuốn sổ "đã làm gì"**: mỗi việc bạn làm (đặt vé, đặt phòng) ghi vào sổ kèm cách hoàn tác (hủy vé, hủy phòng). Nếu giữa chừng gặp sự cố không thể tiếp tục, bạn **lật sổ ngược lại và hoàn tác từng việc đã làm** theo thứ tự đảo. Không có "máy thời gian" đưa mọi thứ về 0; bạn phải tự đi hủy từng cái.

**Định nghĩa.** Một **saga** là một chuỗi các **local transaction** \`T₁, T₂, ..., Tₙ\`. Mỗi \`Tᵢ\` chạy gọn trong một service (và commit ngay vào DB riêng của service đó). Đi kèm mỗi \`Tᵢ\` (trừ một số bước đặc biệt) là một **compensating transaction** \`Cᵢ\` có nhiệm vụ **hoàn tác về mặt nghiệp vụ** những gì \`Tᵢ\` đã làm.

Hai kịch bản:

- **Thành công xuôi (happy path):** \`T₁ → T₂ → ... → Tₙ\`. Mỗi bước commit, không cần compensate.
- **Thất bại ở bước k:** \`T₁ → T₂ → ... → Tₖ (FAIL)\` → chạy compensation **ngược chiều**: \`Cₖ₋₁ → Cₖ₋₂ → ... → C₁\`. (Bản thân \`Tₖ\` fail thì thường tự rollback local DB của nó, hoặc không có gì để bù.)

\`\`\`
Happy path:   T1 ──► T2 ──► T3 ──► T4   ✅ done

Fail tại T3:  T1 ──► T2 ──► T3 ✗
                            │ T3 thất bại
              C1 ◄── C2 ◄───┘   (bù ngược: undo T2, rồi undo T1)
\`\`\`

**Điểm mấu chốt khác 2PC:** mỗi \`Tᵢ\` **commit ngay** (không giữ lock chờ ai). Vì vậy:

- **Non-blocking:** không khóa tài nguyên xuyên service.
- **Scale tốt:** mỗi service làm việc của mình rồi nhả ngay.
- **Đổi lại — chỉ có eventual consistency:** trong khoảng giữa \`T₂\` đã commit nhưng \`T₃\` chưa chạy, hệ thống ở **trạng thái trung gian không nhất quán** (tiền đã trừ nhưng hàng chưa giữ). Người khác có thể nhìn thấy trạng thái này — đây là vấn đề **isolation** (mục 9).

> ⚠ **Lỗi thường gặp.** Tưởng saga = "transaction phân tán có rollback tự động". KHÔNG. Saga **không có rollback**. Mỗi bước đã commit **vĩnh viễn**. "Undo" trong saga là chạy một transaction MỚI làm điều ngược lại (refund, cancel) — gọi là compensation. Trạng thái trung gian **đã từng tồn tại thật** và có thể đã bị quan sát.

> ❓ **Câu hỏi tự nhiên.** *"Eventual consistency nghe rủi ro — khách thấy 'đã trừ tiền' rồi vài giây sau 'đã hoàn tiền' thì khó chịu không?"* — Đúng là có cửa sổ không nhất quán, nhưng nó thường **rất ngắn** (mili-giây tới vài giây) và có thể **giấu khỏi người dùng** bằng semantic lock: hiển thị order ở trạng thái \`ĐANG XỬ LÝ\` thay vì \`THÀNH CÔNG\` cho tới khi saga chốt. Người dùng chỉ thấy kết quả cuối. Đổi lại, hệ thống không bị nghẽn lock như 2PC — đây là đánh đổi mà phần lớn hệ thương mại điện tử chấp nhận.

> 🔁 **Dừng lại tự kiểm tra.**
> 1. Saga có atomicity tức thời như ACID không?
> 2. Khi \`T₃\` fail, ta chạy compensation theo thứ tự nào?
>
> <details><summary>Đáp án</summary>
>
> 1. Không. Saga chỉ cho **eventual consistency**: sau khi xong (hoặc xong compensation), hệ thống về trạng thái nhất quán, nhưng trong lúc chạy thì có trạng thái trung gian.
> 2. Ngược chiều: \`C₂\` (bù \`T₂\`) rồi \`C₁\` (bù \`T₁\`). Không bù \`T₃\` vì nó fail (thường tự rollback local).
> </details>

> 📝 **Tóm tắt mục 2.** Saga = chuỗi local transaction commit-ngay, mỗi bước có compensation để semantic-undo. Fail giữa chừng → bù ngược chiều. Non-blocking, scale tốt, đổi lấy eventual consistency và trạng thái trung gian có thể bị thấy.

---

## 3. Ví dụ kinh điển: đặt hàng (Order Saga)

Flow 4 bước, mỗi bước ở một service:

| Bước | Local transaction \`Tᵢ\` | Service | Compensation \`Cᵢ\` |
|------|------------------------|---------|-------------------|
| 1 | \`CreateOrder\` (status=PENDING) | Order | \`CancelOrder\` (status=CANCELLED) |
| 2 | \`ReservePayment\` (charge $100) | Payment | \`RefundPayment\` (+$100) |
| 3 | \`ReserveInventory\` (qty −1) | Inventory | \`ReleaseInventory\` (qty +1) |
| 4 | \`ShipOrder\` (tạo shipment) | Shipping | \`CancelShipment\` |

**Happy path:** CreateOrder → ReservePayment → ReserveInventory → ShipOrder → order COMPLETED.

**Fail path — inventory hết hàng tại bước 3:**

\`\`\`
T1 CreateOrder    ✓ (order #42 = PENDING)
T2 ReservePayment ✓ (charge $100)
T3 ReserveInventory ✗ (SKU hết hàng!)
                  │
                  ▼  compensate ngược
C2 RefundPayment  ✓ (hoàn $100 — KHÔNG phải "un-charge", mà là giao dịch hoàn tiền mới)
C1 CancelOrder    ✓ (order #42 = CANCELLED)
                  ▼
            kết quả: tiền đã hoàn, order hủy → hệ thống nhất quán
\`\`\`

> ⚠ **Lỗi thường gặp.** Bước 3 fail nhưng **bước 2 đã trừ tiền thật**. Nếu code quên gọi \`C2 RefundPayment\`, khách hàng **bị trừ tiền mà không nhận hàng** — đây là bug saga phổ biến nhất và là nội dung BT6.

---

## 4. Compensating transaction — semantic undo, không phải rollback

> 💡 **Trực giác.** Bạn không thể "tua ngược thời gian" để tiền chưa từng bị trừ. Cái bạn làm được là **gửi tiền trả lại** — một giao dịch MỚI, có dấu vết riêng. Trên sao kê ngân hàng sẽ thấy 2 dòng: \`−$100\` (charge) rồi \`+$100\` (refund), chứ không phải dòng charge biến mất.

**Compensation = một local transaction mới làm điều ngược về mặt nghiệp vụ (semantic), không phải DB rollback.**

| \`Tᵢ\` đã làm | Compensation \`Cᵢ\` đúng (semantic) | KHÔNG phải |
|-------------|-----------------------------------|------------|
| Charge thẻ $100 | Refund $100 (giao dịch mới) | "un-charge" (không tồn tại) |
| Reserve 1 ghế | Cancel reservation / release ghế | DB rollback |
| Gửi email xác nhận | Gửi email "đơn đã hủy" | xóa email đã gửi (không thể) |
| Tạo order PENDING | Set order CANCELLED | DELETE row (mất lịch sử) |

Hệ quả quan trọng:

- **Có loại hành động KHÔNG bù được hoàn toàn.** Đã gửi email/SMS thì không "rút lại" được. Đã in vé/bốc hàng lên xe tải thì khó. Với những bước này, ta thiết kế chúng ở **sau pivot transaction** (mục 13) và dùng **forward recovery** (mục 12).
- **Compensation có thể fail.** Refund cũng là một network call → cũng có thể lỗi → cần retry và cuối cùng là can thiệp thủ công (mục 14, BT4).
- **Thứ tự bù quan trọng:** thường là **ngược chiều** để giữ ràng buộc nghiệp vụ (hủy order cuối cùng vì nó là "khung" chứa các thứ khác).

> ❓ **Câu hỏi tự nhiên.** *"Vì sao không DELETE row order luôn cho sạch?"* — Vì mất audit trail (lịch sử kiểm toán). Trong tài chính/thương mại, một order bị hủy vẫn phải lưu để đối soát, báo cáo, chống gian lận. Compensation chuyển trạng thái sang \`CANCELLED\`, không xóa.

> 📝 **Tóm tắt mục 4.** Compensation là giao dịch nghiệp vụ ngược, không phải rollback DB. Có hành động không bù được (đặt sau pivot, forward recovery). Compensation cũng có thể fail và cần retry + manual.

---

## 5. Hai cách implement saga: Choreography vs Orchestration

Đây là hai trục thiết kế chính (nối tiếp ý từ [L65](../lesson-65-event-driven-architecture/)):

| Tiêu chí | **Choreography** | **Orchestration** |
|----------|------------------|-------------------|
| Điều phối | Phi tập trung — mỗi service tự nghe event, react, emit event tiếp | Tập trung — một **orchestrator** ra lệnh từng bước |
| Coupling | Lỏng (service không biết nhau) | Service biết orchestrator gọi mình |
| Luồng nhìn thấy ở đâu | Rải rác trong nhiều service (khó nhìn tổng thể) | Tập trung một chỗ (dễ đọc, dễ vẽ state machine) |
| Hợp với | Saga ngắn (2–4 bước), ít rẽ nhánh | Saga dài, nhiều bước, logic phức tạp |
| Compensation | Qua event "đã fail" → mỗi service tự bù | Orchestrator chủ động gọi compensation ngược |
| Nhược | Khó debug, dễ phụ thuộc vòng (cyclic), khó biết "đang ở bước nào" | Orchestrator là SPOF (cần HA), tập trung logic |

> 💡 **Trực giác.** Choreography giống **một nhóm nhảy không có biên đạo trực tiếp**: mỗi vũ công thuộc bài, thấy người bên cạnh làm gì thì làm động tác tiếp. Orchestration giống **dàn nhạc có nhạc trưởng**: nhạc trưởng (orchestrator) chỉ tay vào từng nhạc công nói "tới lượt mày".

### 5.1 Khi nào chọn cái nào?

Cây quyết định nhanh:

- Saga **≤ 3–4 bước, tuyến tính, ít rẽ nhánh**, các team muốn coupling lỏng → **choreography**. Vd: "user đăng ký → tạo profile → gửi email chào mừng".
- Saga **dài, nhiều bước, có rẽ nhánh điều kiện** (đơn > $1000 thêm fraud check; khách VIP bỏ qua bước X), hoặc cần **quan sát/audit toàn bộ flow ở một chỗ** → **orchestration**. Vd: quy trình duyệt khoản vay 8 bước.
- **Khó debug** là dấu hiệu chính để rời choreography: nếu bạn không trả lời nhanh được câu "saga 42 đang đứng ở đâu?", đó là lúc cần orchestrator có state tập trung.

> ❓ **Câu hỏi tự nhiên.** *"Có trộn được không?"* — Có. Hệ lớn thường orchestration ở tầng nghiệp vụ chính, nhưng vài service nội bộ vẫn react theo choreography cho các side-effect phụ (gửi notification). Không nhất thiết chọn cứng một kiểu cho toàn hệ.

---

## 6. Choreography saga — walk-through

Không có orchestrator. Các service giao tiếp qua **event** trên message bus (Kafka/NATS — xem [L64](../lesson-64-message-queue-nats-kafka/)). Mỗi service: **nghe event → làm local transaction → emit event tiếp**.

### 6.1 Happy path (events)

\`\`\`
[Order]     CreateOrder          → emit OrderCreated
[Payment]   nghe OrderCreated    → charge $100, emit PaymentReserved
[Inventory] nghe PaymentReserved → qty−1, emit InventoryReserved
[Shipping]  nghe InventoryReserved → tạo shipment, emit OrderShipped
[Order]     nghe OrderShipped    → set order = COMPLETED
\`\`\`

Mỗi mũi tên là một event chảy trên bus. Không service nào gọi trực tiếp service khác — chỉ publish/subscribe.

### 6.2 Fail path (compensation events)

Giả sử Inventory hết hàng:

\`\`\`
[Order]     CreateOrder          → emit OrderCreated
[Payment]   nghe OrderCreated    → charge $100, emit PaymentReserved
[Inventory] nghe PaymentReserved → HẾT HÀNG → emit InventoryFailed   ← event "thất bại"
[Payment]   nghe InventoryFailed → refund $100, emit PaymentRefunded   ← compensation event
[Order]     nghe PaymentRefunded → set order = CANCELLED
\`\`\`

Compensation cũng chảy bằng **event ngược**: \`InventoryFailed\` kích hoạt Payment tự refund, \`PaymentRefunded\` kích hoạt Order tự hủy.

> ❓ **Câu hỏi tự nhiên.**
> - *"Làm sao một service biết nó cần bù gì khi nghe event fail?"* — Mỗi service tự biết mình đã làm gì trong saga đó (qua \`sagaId\` đính kèm event). Nghe \`InventoryFailed\` với \`sagaId=42\`, Payment tra cứu "tôi đã charge gì cho saga 42" rồi refund.
> - *"Nếu có 8 service thì sao?"* — Choreography trở nên rối: ai nghe event nào, vòng phụ thuộc ở đâu, khó vẽ tổng thể. Lúc đó nên chuyển sang orchestration.

> ⚠ **Lỗi thường gặp.** Cyclic dependency: A emit event B nghe, B emit event A nghe lại → vòng lặp khó lần. Choreography dễ dính bẫy này khi flow phình to.

### 6.3 Bảng event với \`sagaId\` cụ thể

Theo dõi một fail path thực tế với \`sagaId = 42\`, từng message trên bus:

| # | Event trên bus | Service emit | Service nghe → hành động |
|---|----------------|--------------|--------------------------|
| 1 | \`OrderCreated{sagaId:42, orderId:42, amount:100, sku:BOOK-1}\` | Order | Payment → charge $100 cho order 42 |
| 2 | \`PaymentReserved{sagaId:42, paymentId:777}\` | Payment | Inventory → thử qty−1 cho BOOK-1 |
| 3 | \`InventoryFailed{sagaId:42, reason:OUT_OF_STOCK}\` | Inventory | Payment → tra "saga 42 charge gì" → refund $100 |
| 4 | \`PaymentRefunded{sagaId:42, paymentId:777}\` | Payment | Order → set order 42 = CANCELLED |

Lưu ý: Payment ở message #1 đóng vai "tiến", ở message #3 đóng vai "bù" — cùng một service, hai handler khác nhau (subscribe \`OrderCreated\` và subscribe \`InventoryFailed\`). \`sagaId:42\` là sợi chỉ xuyên suốt để mỗi service biết hành động thuộc saga nào.

> 📝 **Tóm tắt mục 6.** Choreography = service nghe event → react → emit event tiếp, không coordinator. Compensation cũng qua event fail/đảo. \`sagaId\` đính kèm mọi event để correlate. Gọn cho saga ngắn, rối cho saga dài.

---

## 7. Orchestration saga — state machine trung tâm

Một **Saga Orchestrator** giữ trạng thái và **chủ động gọi** từng service theo thứ tự, đồng thời chịu trách nhiệm gọi compensation khi fail. Orchestrator thường là một **state machine** persistent.

### 7.1 State machine của order saga

\`\`\`
        ┌─────────────────────────────────────────────────────────┐
START ─► CREATE_ORDER ─► RESERVE_PAYMENT ─► RESERVE_INV ─► SHIP ─► DONE
            │ fail           │ fail            │ fail        │ fail
            ▼                ▼                  ▼             ▼
        (không có gì     COMP_CANCEL_ORDER ◄ COMP_REFUND ◄ COMP_RELEASE_INV
         để bù → ABORT)  ◄────────────────────────────────────┘
            │
            ▼
         ABORTED
\`\`\`

Orchestrator chạy như sau (pseudo):

\`\`\`
state = CREATE_ORDER
for each step in [CreateOrder, ReservePayment, ReserveInventory, ShipOrder]:
    ok = call(step.service, step.action)      // gọi đồng bộ hoặc qua command/reply
    persist(state)                              // LƯU state sau mỗi bước (để recover)
    if not ok:
        // bù ngược các bước đã thành công
        for done in reverse(steps_completed):
            call(done.service, done.compensation)
            persist(state)
        state = ABORTED
        return FAIL
state = DONE
return OK
\`\`\`

### 7.2 Vì sao orchestration dễ quản lý hơn

- **Một chỗ nhìn thấy toàn bộ flow** — đọc code orchestrator là biết saga gồm gì.
- **Logic compensation tập trung** — không rải rác qua event handler ở nhiều service.
- **Dễ thêm bước, đổi thứ tự, thêm điều kiện rẽ nhánh** (vd: nếu đơn > $1000 thì thêm bước fraud check).
- **Recover sau crash** dễ hơn: orchestrator lưu state ở đâu nó đang đứng (mục 11), khởi động lại đọc state và tiếp tục.

> ⚠ **Lỗi thường gặp.** Orchestrator thành **SPOF**: nó chết giữa chừng → saga treo. Phải chạy orchestrator **HA** (nhiều replica + leader election, hoặc state ở DB bền + worker stateless pick lại). Đừng giữ state chỉ trong RAM của một process.

> 🔁 **Dừng lại tự kiểm tra.**
> 1. Trong orchestration, ai gọi compensation?
> 2. Trong choreography, ai gọi compensation?
>
> <details><summary>Đáp án</summary>
>
> 1. **Orchestrator** chủ động gọi compensation của từng service đã hoàn thành, theo thứ tự ngược.
> 2. **Không ai trung tâm** — service tự nghe event fail và tự chạy compensation của mình rồi emit event đảo tiếp.
> </details>

### 7.3 Walk-through state transition bằng giá trị thật

Order saga \`sagaId=42\`, Inventory hết hàng ở bước 3. Cột "state lưu" là cái orchestrator ghi xuống DB **sau** mỗi hành động:

| t | Hành động orchestrator | Kết quả | \`currentStep\` | \`status\` | \`completedSteps\` |
|---|------------------------|---------|---------------|----------|------------------|
| 1 | call Order.CreateOrder | ✓ order 42 = PENDING | CREATE_ORDER | RUNNING | [CreateOrder] |
| 2 | call Payment.ReservePayment | ✓ charge $100 | RESERVE_PAYMENT | RUNNING | [CreateOrder, ReservePayment] |
| 3 | call Inventory.ReserveInventory | ✗ OUT_OF_STOCK | RESERVE_INV | COMPENSATING | [CreateOrder, ReservePayment] |
| 4 | compensate ReservePayment → Payment.Refund | ✓ +$100 | COMP_RESERVE_PAYMENT | COMPENSATING | [CreateOrder, ReservePayment] |
| 5 | compensate CreateOrder → Order.Cancel | ✓ order 42 = CANCELLED | COMP_CREATE_ORDER | COMPENSATING | [CreateOrder, ReservePayment] |
| 6 | kết thúc bù | — | — | ABORTED | [CreateOrder, ReservePayment] |

Nếu orchestrator **crash tại t=2** (sau khi ghi \`[CreateOrder, ReservePayment]\`, trước khi gọi Inventory): lúc khởi động lại, nó đọc saga 42 \`status=RUNNING, currentStep=RESERVE_PAYMENT\`, \`completedSteps=[CreateOrder, ReservePayment]\` → biết phải tiếp tục từ bước ReserveInventory. Nhờ idempotency, kể cả ReservePayment thực ra crash *trước khi* kịp ghi mà đã charge thật, gọi lại cũng không charge lần 2.

> 📝 **Tóm tắt mục 7.** Orchestration = state machine trung tâm chủ động gọi step + compensation, persist state mỗi bước để recover. Dễ đọc/đổi, nhưng orchestrator là SPOF nên phải HA.

---

## 8. Saga vs 2PC — bảng đối chiếu

| Tiêu chí | **2PC** | **Saga** |
|----------|---------|----------|
| Consistency | Mạnh (ACID, atomic ngay) | Eventual (có trạng thái trung gian) |
| Khóa tài nguyên | Có — giữ lock xuyên service trong suốt phase | Không — mỗi bước commit ngay, nhả ngay |
| Blocking | Có (in-doubt khi coordinator chết) | Không |
| Scale | Kém (lock + coordinator nghẽn) | Tốt (mỗi service độc lập) |
| SPOF | Coordinator | Orchestrator (nếu dùng orchestration; choreography không có) |
| Isolation | Có (lock đảm bảo) | Không có — phải tự thêm countermeasure (mục 9) |
| Độ phức tạp code | Giao thức chuẩn, ít code app | Phải tự viết compensation + xử lý fail từng bước |
| Khi nào dùng | Phạm vi hẹp, latency thấp, cần atomic tuyệt đối (XA: DB + broker) | Microservice, latency mạng cao, cần scale, chấp nhận eventual |

> ❓ **Câu hỏi tự nhiên.** *"Saga nghe có vẻ tệ hơn (mất isolation, mất atomic) sao lại được chuộng?"* — Vì trong hệ phân tán thật, **bạn không có lựa chọn 2PC khả thi** ở quy mô lớn: lock xuyên mạng + coordinator SPOF giết chết throughput và availability (xem CAP ở [L62](../lesson-62-distributed-fundamentals/)). Saga đánh đổi consistency tức thời lấy **availability + scale**, và các countermeasure (mục 9) bù lại phần isolation đã mất.

---

## 9. Vấn đề Isolation — saga thiếu chữ "I" trong ACID

> 💡 **Trực giác.** Vì mỗi bước commit ngay, trạng thái trung gian **lộ ra ngoài**. Giống như bạn đang dọn nhà giữa chừng (đồ bày khắp sàn) thì khách bước vào — họ thấy "nhà bừa bộn" dù chốc nữa bạn sẽ dọn xong. Trong saga, một transaction khác có thể đọc trúng trạng thái nửa chừng này (**dirty read**) và ra quyết định sai.

Ví dụ cụ thể vấn đề:

- Saga A đang chạy: đã \`ReserveInventory\` (qty 5 → 4) nhưng chưa xong (chờ ship).
- Saga B đọc qty = 4, tưởng "còn 4 cái thật".
- Saga A fail ở bước sau → \`ReleaseInventory\` (qty 4 → 5). Nhưng Saga B đã ra quyết định dựa trên qty=4 sai.

**Countermeasures (các kỹ thuật bù isolation):**

| Kỹ thuật | Ý tưởng | Ví dụ |
|----------|---------|-------|
| **Semantic lock** | Đánh dấu record đang "pending" bằng một cờ trạng thái nghiệp vụ; transaction khác thấy cờ thì chờ/từ chối | Order ở trạng thái \`PENDING\` → không cho sửa cho tới khi \`COMPLETED\`/\`CANCELLED\` |
| **Commutative updates** | Thiết kế update sao cho thứ tự không quan trọng (giao hoán) → bớt lo race | Dùng \`balance += x\` / \`balance -= x\` thay vì \`SET balance = newValue\` |
| **Pessimistic view** | Sắp xếp thứ tự bước để giảm rủi ro đọc bẩn ở dữ liệu nhạy cảm | Trừ tiền (nhạy cảm) đặt muộn nhất có thể trong saga |
| **Reread value** | Đọc lại + kiểm tra ngay trước khi dùng, phát hiện đã đổi thì hủy | Optimistic check: \`WHERE version = ?\` |
| **Version file / by value** | So sánh version để phát hiện dirty | Như optimistic locking ([L56](../lesson-56-transactions-isolation/)) |

### 9.1 Semantic lock — walk-through bằng số

Kho BOOK-1 có \`qty = 5\`, dùng thêm cột \`reserved\` (số đang giữ pending). Khi đọc "còn bán được bao nhiêu", dùng \`available = qty - reserved\`.

| t | Saga A | Saga B | qty | reserved | available |
|---|--------|--------|-----|----------|-----------|
| 1 | ReserveInventory: reserved += 1 | — | 5 | 1 | 4 |
| 2 | (chờ ship) | đọc available = 4 → biết còn 4 thật | 5 | 1 | 4 |
| 3 | fail → ReleaseInventory: reserved −= 1 | — | 5 | 0 | 5 |

So với cách ngây thơ (\`qty = qty − 1\` ngay): ở t=2 Saga B đọc \`qty=4\` và tưởng đã có 4 cái "chắc chắn còn", trong khi thực ra 1 cái đang pending có thể quay lại. Tách \`reserved\` (semantic lock) cho phép phân biệt "đã bán" và "đang giữ tạm", giảm quyết định sai trên trạng thái trung gian.

> ⚠ **Lỗi thường gặp.** Triển khai saga mà **quên hoàn toàn isolation** → người dùng thấy đơn "đang xử lý" như đã thành công, đặt thêm hành động dựa trên đó, rồi saga rollback → dữ liệu mâu thuẫn. **Semantic lock (cờ PENDING)** là countermeasure tối thiểu nên có.

> 📝 **Tóm tắt mục 9.** Saga không có isolation → dirty read trạng thái trung gian. Bù bằng semantic lock (cờ pending), commutative update, pessimistic view, reread/version. Tối thiểu nên có cờ trạng thái PENDING.

---

## 10. Idempotency — bước saga có thể bị retry

Trong hệ phân tán, message bus thường là **at-least-once** ([L64](../lesson-64-message-queue-nats-kafka/)): một command/event có thể giao **nhiều lần**. Network timeout cũng khiến orchestrator gọi lại một bước (không biết lần trước có thành công không).

> 💡 **Trực giác.** Idempotent = "bấm nút thang máy 5 lần cũng chỉ gọi 1 chuyến". \`ReservePayment(orderId=42, amount=100)\` chạy lại 3 lần phải chỉ trừ tiền **đúng 1 lần**, không phải 3 lần.

**Cách làm idempotent:**

- **Idempotency key:** mỗi command mang một key duy nhất (vd \`sagaId + step\`). Service lưu các key đã xử lý; gặp lại key cũ → trả về kết quả cũ, không làm lại.
- **Kiểm tra trạng thái trước khi làm:** \`ReservePayment\` xem order đã ở trạng thái \`PAID\` chưa; nếu rồi → no-op trả OK.
- **Upsert / conditional update:** \`UPDATE ... WHERE status = 'PENDING'\` — chạy lần 2 không match → 0 row, an toàn.

**Compensation cũng phải idempotent:** \`RefundPayment\` gọi 2 lần phải chỉ hoàn tiền 1 lần (kiểm tra "đã refund chưa"). Đây là pitfall hay quên (mục 14).

> 🔁 **Dừng lại tự kiểm tra.** \`ReserveInventory\` làm \`qty = qty - 1\`. Nếu retry 3 lần, kho bị trừ mấy lần? Làm sao sửa?
>
> <details><summary>Đáp án</summary>
>
> Bị trừ **3 lần** (−3) — sai. Sửa: gắn idempotency key theo \`sagaId\`; trước khi trừ, kiểm tra "saga này đã reserve chưa". Đã reserve → no-op. Hoặc dùng bảng reservation \`(sagaId, sku) UNIQUE\` để insert lần đầu thành công, lần sau insert đụng UNIQUE → bỏ qua.
> </details>

### 10.1 Walk-through idempotency key bằng số

\`ChargeCard(sagaId:42, amount:100)\`, message bị giao **3 lần** (at-least-once). Payment giữ bảng \`processed_keys\`:

| Lần giao | idempotencyKey | \`processed_keys\` có chưa? | Hành động | Số dư khách (bắt đầu 500) |
|----------|----------------|---------------------------|-----------|---------------------------|
| 1 | \`42:charge\` | chưa | charge 100, lưu key + result | 400 |
| 2 | \`42:charge\` | rồi | trả result cũ (no-op) | 400 |
| 3 | \`42:charge\` | rồi | trả result cũ (no-op) | 400 |

Kết quả: trừ đúng **1 lần** (500 → 400) dù message giao 3 lần. Không có bảng key (cách sai): 3 lần → 500 → 200, mất 200 oan.

> 📝 **Tóm tắt mục 10.** Message at-least-once + retry → mọi step VÀ mọi compensation phải idempotent (idempotency key / check-trạng-thái / conditional update).

---

## 11. Saga state persistence — recover sau crash

Orchestrator **phải lưu trạng thái saga ra storage bền** (DB) sau mỗi bước, không chỉ giữ trong RAM. Lý do: nếu process orchestrator crash giữa saga, khi khởi động lại nó phải biết "tôi đang dừng ở bước nào" để tiếp tục (forward) hoặc bù (backward).

Bảng saga state điển hình:

| sagaId | type | currentStep | status | completedSteps | payload |
|--------|------|-------------|--------|----------------|---------|
| 42 | order | RESERVE_INV | RUNNING | [CreateOrder, ReservePayment] | {orderId, amount, sku} |

Vòng đời recover:

1. Orchestrator khởi động → quét bảng saga state tìm các saga \`status = RUNNING\` (chưa DONE/ABORTED).
2. Với mỗi saga dở: đọc \`currentStep\` + \`completedSteps\`.
3. Quyết định: tiếp tục forward (gọi lại step hiện tại — nhờ idempotency nên an toàn) hoặc bù backward nếu đã đánh dấu fail.
4. Cập nhật state, tiếp tục cho tới DONE/ABORTED.

> ⚠ **Lỗi thường gặp.** Persist state **không atomic với hành động**. Nếu service làm xong \`ReservePayment\` nhưng orchestrator crash **trước khi** kịp ghi \`completedSteps += ReservePayment\`, lúc recover nó tưởng chưa làm → gọi lại. Đây chính là lý do step phải **idempotent** (mục 10): gọi lại không gây trừ tiền lần 2. Kỹ thuật mạnh hơn: dùng **outbox pattern** ([L65](../lesson-65-event-driven-architecture/)) để ghi state + phát command trong cùng một local transaction.

> 📝 **Tóm tắt mục 11.** Orchestrator persist state mỗi bước ra DB để recover sau crash. Vì persist không atomic với call, step phải idempotent. Outbox giúp ghi state + command nguyên tử.

---

## 12. Forward recovery vs Backward recovery

Khi một bước fail, có 2 hướng xử lý:

- **Backward recovery (compensate):** hoàn tác các bước đã làm bằng compensation, đưa saga về trạng thái "như chưa làm". Dùng khi **có thể bù** và **nên bỏ cuộc**.
- **Forward recovery (retry tới khi thành công):** **không** bù, mà **thử lại** bước đang fail (có thể nhiều lần, backoff) cho tới khi nó thành công. Dùng cho bước **không thể bù** hoặc **bắt buộc phải hoàn thành**.

> 💡 **Trực giác.** Backward = "thôi không mua nữa, trả lại hết". Forward = "đã lỡ in vé rồi, không hủy được; phải cố giao cho bằng được, lỗi tạm thời thì thử lại".

Ví dụ:

| Tình huống | Hướng | Vì sao |
|------------|-------|--------|
| Inventory hết hàng | Backward | Bù được (refund, cancel), nên bỏ cuộc |
| \`ShipOrder\` lỗi mạng tạm thời (sau khi đã charge + trừ kho thành công) | Forward (retry) | Đã qua điểm "chốt đơn"; bù lại tốn kém/không hợp lý → cố ship cho bằng được |
| Gửi email xác nhận fail | Forward (retry) | Không bù được "email đã gửi"; cứ thử gửi lại |

Một saga thực tế thường **kết hợp**: trước một điểm nào đó dùng backward (còn hủy được), sau điểm đó dùng forward (chỉ tiến). Điểm chuyển đó là **pivot transaction** (mục 13).

> 📝 **Tóm tắt mục 12.** Backward = bù & bỏ cuộc (khi còn hủy được). Forward = retry tới khi xong (cho bước không thể bù). Saga thực tế kết hợp cả hai, ranh giới là pivot.

---

## 13. Pivot transaction — điểm không quay đầu

**Pivot transaction** là bước đánh dấu **point of no return**: trước nó, saga có thể bù & abort (backward); **sau (hoặc tại) nó, saga chỉ được tiến tới (forward)**.

Phân loại các bước trong saga:

- **Compensatable transactions:** các bước **trước** pivot — đều có compensation, có thể bị bù.
- **Pivot transaction:** bước "chốt". Có thể là bước **cuối cùng còn bù được** hoặc bước **đầu tiên không thể bù**. Sau khi pivot commit, saga **chắc chắn sẽ hoàn tất** (không abort nữa).
- **Retriable transactions:** các bước **sau** pivot — không có compensation, chỉ retry cho tới khi thành công (forward recovery).

Ví dụ order saga:

\`\`\`
CreateOrder ─ ReservePayment ─ [ReserveInventory = PIVOT] ─ ShipOrder ─ SendEmail
└──── compensatable ────────┘   └─ chốt: hàng đã giữ ─┘   └── retriable (chỉ tiến) ──┘
\`\`\`

Diễn giải: một khi đã \`ReserveInventory\` thành công (hàng đã giữ chắc cho khách này), ta cam kết hoàn tất đơn. \`ShipOrder\` và \`SendEmail\` lỗi tạm thời thì **retry**, không quay lại refund/cancel.

> ❓ **Câu hỏi tự nhiên.** *"Chọn pivot ở đâu?"* — Thường tại bước đầu tiên **không thể (hoặc không nên) bù**, hoặc bước mà sau đó chi phí bù quá lớn / phá trải nghiệm khách. Đặt pivot đúng giúp tránh vừa-charge-vừa-refund liên tục (flapping) cho lỗi mạng tạm thời.

> 📝 **Tóm tắt mục 13.** Pivot = point of no return. Trước pivot: compensatable (bù được). Sau pivot: retriable (chỉ forward). Đặt pivot ở bước đầu tiên không-thể-bù.

---

## 14. Common pitfalls

| # | Pitfall | Hậu quả | Cách phòng |
|---|---------|---------|-----------|
| 1 | **Compensation không idempotent** | Retry refund → hoàn tiền 2 lần (mất tiền) | Idempotency key cho cả compensation; check "đã refund chưa" |
| 2 | **Quên isolation** | Transaction khác dirty-read trạng thái trung gian → quyết định sai | Semantic lock (cờ PENDING), reread/version |
| 3 | **Orchestrator là SPOF** | Orchestrator chết → mọi saga treo | Chạy HA: nhiều replica + state ở DB bền, worker stateless |
| 4 | **Compensation cũng fail** | Bù thất bại → kẹt nửa chừng (đã trừ tiền, refund lỗi) | Retry có backoff; sau N lần → đẩy vào dead-letter + alert + **manual intervention** |
| 5 | **Step không idempotent** | Retry → trừ kho/charge trùng | Idempotency key, conditional update \`WHERE status=PENDING\` |
| 6 | **Persist state không atomic với action** | Crash → tưởng chưa làm → làm lại | Idempotency + outbox pattern |
| 7 | **Cyclic event dependency (choreography)** | Vòng lặp event khó debug | Chuyển sang orchestration khi flow phình to |

> 🔁 **Dừng lại tự kiểm tra.** Orchestrator gọi \`RefundPayment\`, Payment refund thành công nhưng **reply bị mất** (timeout). Orchestrator retry \`RefundPayment\`. Điều gì xảy ra nếu refund **không** idempotent?
>
> <details><summary>Đáp án</summary>
>
> Khách được hoàn tiền **2 lần** — công ty mất tiền. Đây là pitfall #1. Sửa: Payment lưu "đã refund cho saga 42 chưa"; lần gọi thứ 2 thấy đã refund → no-op trả OK (không hoàn thêm).
> </details>

> 📝 **Tóm tắt mục 14.** 7 pitfall: compensation/step không idempotent, quên isolation, orchestrator SPOF, compensation fail không xử lý, persist không atomic, cyclic event. Phòng bằng idempotency key + semantic lock + HA + retry/backoff + dead-letter + outbox.

---

## Bài tập

> Làm trước, xem [Lời giải chi tiết](#lời-giải-chi-tiết) sau. Code mẫu Go ở [solutions.go](./solutions.go), minh họa ở [visualization.html](./visualization.html).

1. **BT1 — Design saga đặt vé máy bay.** Flow: \`ReserveSeat → ChargeCard → IssueTicket\`. Liệt kê: mỗi bước thuộc service nào, compensation của nó, và xác định bước nào là pivot. Vẽ cả happy path và fail path (charge fail).
2. **BT2 — Orchestration saga state machine.** Viết pseudo-code (hoặc Go) cho một orchestrator chạy chuỗi step, persist state sau mỗi bước, và compensate ngược khi một bước fail. Chỉ rõ chỗ nào lưu \`completedSteps\`.
3. **BT3 — Choreography saga order flow.** Cho flow Order → Payment → Inventory. Viết chuỗi **event** cho happy path và chuỗi **compensation event** khi Inventory fail. Ghi rõ service nào nghe event nào.
4. **BT4 — Handle compensation failure.** \`RefundPayment\` fail (Payment service down). Thiết kế cơ chế xử lý: retry mấy lần? backoff? sau đó làm gì? Vì sao cần idempotency ở đây?
5. **BT5 — Identify pivot.** Cho saga: \`CreateBooking → ChargeCard → ConfirmWithHotel → SendVoucherEmail\`. Xác định pivot transaction và phân loại từng bước (compensatable / pivot / retriable). Giải thích.
6. **BT6 — Diagnose & fix.** Production: log cho thấy nhiều đơn ở trạng thái \`PAYMENT_CHARGED\` nhưng \`ORDER_FAILED\`, và **không có refund**. Khách bị trừ tiền mà không nhận hàng. Chẩn đoán nguyên nhân gốc và đề xuất fix bằng compensation đúng + idempotency.

---

## Lời giải chi tiết

### Lời giải BT1 — Saga đặt vé máy bay

| Bước | Local transaction | Service | Compensation | Phân loại |
|------|-------------------|---------|--------------|-----------|
| 1 | \`ReserveSeat\` (giữ ghế tạm) | Inventory/Seat | \`ReleaseSeat\` (nhả ghế) | compensatable |
| 2 | \`ChargeCard\` ($) | Payment | \`RefundCard\` (hoàn tiền) | compensatable |
| 3 | \`IssueTicket\` (phát vé, gửi e-ticket) | Ticketing | (khó bù — vé đã phát) | **pivot / retriable** |

**Vì sao \`IssueTicket\` là pivot:** một khi vé đã phát (mã đặt chỗ + e-ticket gửi đi), việc "rút lại" rất khó/không hợp lý. Mọi bước trước nó (ghế, tiền) còn bù được; tại/sau nó ta cam kết hoàn tất.

**Happy path:**
\`\`\`
ReserveSeat ✓ → ChargeCard ✓ → IssueTicket ✓ → DONE (vé đã phát)
\`\`\`

**Fail path — ChargeCard fail (thẻ bị từ chối):**
\`\`\`
ReserveSeat ✓
ChargeCard  ✗ (thẻ từ chối)
            │ chưa qua pivot → backward recovery
ReleaseSeat ✓ (bù bước 1: nhả ghế)
            → ABORTED (chưa charge nên không cần refund)
\`\`\`

**Fail path — IssueTicket lỗi mạng tạm thời (đã ReserveSeat + ChargeCard thành công):**
\`\`\`
ReserveSeat ✓ → ChargeCard ✓ → IssueTicket ✗ (timeout)
                                → đã qua điểm chốt → FORWARD recovery: retry IssueTicket
                                → IssueTicket ✓ (lần 2) → DONE
\`\`\`
Không refund/release vì đã cam kết; lỗi tạm thời thì retry.

### Lời giải BT2 — Orchestration saga state machine

\`\`\`go
type Step struct {
    Name         string
    Do           func(ctx Ctx) error  // local transaction
    Compensate   func(ctx Ctx) error  // semantic undo
}

func RunSaga(ctx Ctx, steps []Step, store StateStore) error {
    var completed []int
    for i, step := range steps {
        store.Save(ctx.SagaID, step.Name, "RUNNING", completed) // PERSIST trước/sau call
        if err := step.Do(ctx); err != nil {
            // bù ngược các bước đã xong
            for j := len(completed) - 1; j >= 0; j-- {
                idx := completed[j]
                _ = retry(func() error { return steps[idx].Compensate(ctx) }) // compensation idempotent + retry
                store.Save(ctx.SagaID, "COMP_"+steps[idx].Name, "RUNNING", completed)
            }
            store.Save(ctx.SagaID, step.Name, "ABORTED", completed)
            return err
        }
        completed = append(completed, i)          // đánh dấu đã xong
        store.Save(ctx.SagaID, step.Name, "RUNNING", completed) // LƯU completedSteps
    }
    store.Save(ctx.SagaID, "", "DONE", completed)
    return nil
}
\`\`\`

Chỗ lưu \`completedSteps\`: ngay **sau** khi \`step.Do\` thành công và append vào \`completed\`. Khi recover, đọc \`completed\` để biết bước nào cần bù. (Bản chạy được đầy đủ ở \`solutions.go\`.)

### Lời giải BT3 — Choreography saga order flow

**Happy path (event chain):**
\`\`\`
Order:     CreateOrder           → emit OrderCreated
Payment:   [nghe OrderCreated]   → charge → emit PaymentReserved
Inventory: [nghe PaymentReserved]→ qty−1  → emit InventoryReserved
Order:     [nghe InventoryReserved] → set order = COMPLETED
\`\`\`

**Fail path — Inventory hết hàng (compensation event chain):**
\`\`\`
Order:     CreateOrder           → emit OrderCreated
Payment:   [nghe OrderCreated]   → charge → emit PaymentReserved
Inventory: [nghe PaymentReserved]→ HẾT HÀNG → emit InventoryFailed
Payment:   [nghe InventoryFailed]→ refund   → emit PaymentRefunded   (compensation event)
Order:     [nghe PaymentRefunded]→ set order = CANCELLED
\`\`\`

Ai nghe gì: Payment subscribe \`OrderCreated\` + \`InventoryFailed\`; Inventory subscribe \`PaymentReserved\`; Order subscribe \`InventoryReserved\` + \`PaymentRefunded\`. Mỗi event mang \`sagaId\` để service biết bù cho saga nào.

### Lời giải BT4 — Handle compensation failure

\`RefundPayment\` fail vì Payment service down. Thiết kế:

1. **Retry có giới hạn + exponential backoff:** thử lại, vd 5 lần với backoff \`1s, 2s, 4s, 8s, 16s\` (+ jitter). Nhiều lỗi là tạm thời (Payment khởi động lại xong) → tự khỏi.
2. **Idempotency là bắt buộc:** mỗi lần retry gửi cùng \`idempotencyKey = sagaId + ":refund"\`. Payment lưu key đã refund → nếu lần trước thực ra đã refund nhưng reply mất, lần retry không hoàn tiền lần 2.
3. **Sau khi hết số lần retry:** đẩy task vào **dead-letter queue** + **alert** (PagerDuty/Slack) cho on-call. Đánh dấu saga \`COMPENSATION_FAILED\` (không phải DONE, không phải ABORTED sạch).
4. **Manual intervention:** con người vào xử lý (refund tay, liên hệ khách). Cung cấp công cụ replay để retry compensation thủ công sau khi Payment khỏe lại.

Vì sao idempotency cần ở đây: vì retry + reply có thể mất → nếu không idempotent, refund nhiều lần → mất tiền (pitfall #1).

### Lời giải BT5 — Identify pivot

Saga: \`CreateBooking → ChargeCard → ConfirmWithHotel → SendVoucherEmail\`.

| Bước | Phân loại | Lý do |
|------|-----------|-------|
| CreateBooking | compensatable | có thể \`CancelBooking\` |
| ChargeCard | compensatable | có thể \`RefundCard\` |
| **ConfirmWithHotel** | **PIVOT** | sau khi khách sạn xác nhận giữ phòng cho khách, ta cam kết — hủy lúc này phá hợp đồng/trải nghiệm; đây là point of no return |
| SendVoucherEmail | retriable | không bù được "email đã gửi"; lỗi thì retry tới khi gửi được |

Diễn giải: trước \`ConfirmWithHotel\` còn refund/cancel được (backward). Tại \`ConfirmWithHotel\` chốt đơn. Sau đó \`SendVoucherEmail\` chỉ forward (retry).

### Lời giải BT6 — Diagnose & fix (payment charged nhưng order failed, không refund)

**Triệu chứng:** nhiều đơn \`PAYMENT_CHARGED\` + \`ORDER_FAILED\`, không refund → khách mất tiền.

**Chẩn đoán nguyên nhân gốc (các khả năng):**
- Saga **không có compensation** cho bước payment, hoặc có nhưng **không được kích hoạt** khi bước sau (vd ReserveInventory) fail. Code chỉ đánh dấu \`ORDER_FAILED\` mà quên gọi \`RefundPayment\` — đúng pitfall ở mục 3 (Lỗi thường gặp).
- Hoặc orchestrator **crash sau khi charge, trước khi chạy compensation**, và **không persist state / không recover** → saga treo, không ai bù.

**Fix:**
1. **Thêm/đảm bảo compensation được gọi:** trong orchestrator, khi bất kỳ bước sau \`ChargeCard\` fail → bù ngược, **bắt buộc gọi \`RefundPayment\`** trước khi đặt \`ORDER_FAILED\`/\`CANCELLED\`.
   \`\`\`
   if reserveInventory fails:
       refundPayment(sagaId)      // <-- bước bị thiếu
       cancelOrder(sagaId)
       status = ABORTED
   \`\`\`
2. **Idempotency cho RefundPayment:** key \`sagaId:refund\` để chạy lại an toàn (vì sẽ retry).
3. **Persist state + recover:** lưu state mỗi bước; khi orchestrator khởi động lại, quét saga \`RUNNING\`/\`PAYMENT_CHARGED\` chưa hoàn tất → tiếp tục bù.
4. **Backfill dữ liệu hỏng:** viết job quét lịch sử các đơn \`PAYMENT_CHARGED + ORDER_FAILED\` chưa refund → chạy \`RefundPayment\` idempotent cho từng đơn để hoàn tiền những khách đã bị ảnh hưởng.
5. **Thêm semantic lock + alert:** order ở \`PAYMENT_CHARGED\` quá lâu mà chưa \`COMPLETED\`/\`REFUNDED\` → alert để phát hiện sớm.

---

## Triển khai saga trong thực tế (tham khảo)

Bạn hiếm khi tự viết saga engine từ đầu trong production. Một số lựa chọn phổ biến:

| Công cụ | Kiểu | Ghi chú |
|---------|------|---------|
| **Temporal / Cadence** | Orchestration (workflow-as-code) | Bạn viết workflow bằng code (Go/Java); engine lo persist state, retry, recover sau crash. Compensation viết như hàm thường, gọi trong \`defer\`/catch. Rất hợp saga dài. |
| **AWS Step Functions** | Orchestration (state machine khai báo) | Định nghĩa state machine bằng JSON; có sẵn retry/catch; compensation là các state riêng. |
| **NServiceBus / MassTransit Saga** | Cả hai (thiên orchestration) | .NET; saga là một entity persistent phản ứng message. |
| **Kafka + Outbox tự xây** | Choreography | Tự viết handler + outbox để phát event nguyên tử với DB write ([L65](../lesson-65-event-driven-architecture/)). Linh hoạt nhất, nhưng nhiều việc tự lo (idempotency, recover). |

Điểm chung: tất cả đều giải quyết **persist state + retry + recover** giúp bạn — phần khó nhất của saga. \`solutions.go\` trong bài này là một engine orchestration tối giản để hiểu cơ chế, không phải để dùng thẳng cho production.

## Tóm tắt toàn bài

- Microservice (database-per-service) không có \`BEGIN/COMMIT\` chung. **2PC** giải được nhưng **blocking, coordinator SPOF, không scale**.
- **Saga** = chuỗi local transaction commit-ngay, mỗi bước có **compensation** (semantic undo, không phải rollback). Fail giữa chừng → bù ngược chiều. Non-blocking, scale, đổi lấy **eventual consistency**.
- **Choreography** (service nghe event tự react, không coordinator) vs **Orchestration** (state machine trung tâm điều phối). Choreography gọn cho saga ngắn; orchestration dễ quản lý cho saga dài (nhưng orchestrator là SPOF → HA).
- Vấn đề thực tế: **thiếu isolation** (semantic lock, commutative, pessimistic view), **idempotency** (step + compensation đều phải idempotent), **state persistence** để recover, **forward vs backward recovery**, **pivot transaction** (point of no return).
- 7 **pitfall** kinh điển — quan trọng nhất: compensation không idempotent, quên gọi compensation (khách bị trừ tiền), orchestrator SPOF, compensation cũng fail.

## Bài tiếp theo

[Lesson 67 — CQRS & Event Sourcing](../lesson-67-cqrs-event-sourcing/): tách model đọc/ghi, event store, replay, projection — nền tảng thường đi cùng saga trong hệ event-driven.
`;
