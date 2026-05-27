# Lesson 71 — Mini-project: Microservices với Saga (tổng kết Tier 6)

> **Loại lĩnh vực**: Kỹ thuật / lập trình (Go). Có `visualization.html` (3 module tương tác) và `solutions/` (Go project chạy được). Đây là **bài cuối Tier 6** — gom mọi khái niệm distributed đã học thành một hệ thống nhỏ nhưng hoàn chỉnh.

## Mục tiêu học tập (learning objectives)

Sau bài này bạn sẽ:

- Hiểu **vì sao** một transaction "đặt hàng" trải trên nhiều service lại KHÔNG dùng được transaction ACID kiểu một database, và saga giải quyết điều đó ra sao.
- Tự dựng được **3 microservice độc lập** (Order, Payment, Inventory) giao tiếp qua **message bus** thay vì gọi hàm trực tiếp.
- Viết được một **saga orchestrator**: chuỗi bước tiến (forward) + chuỗi bồi hoàn (compensation) khi thất bại.
- Áp dụng **idempotency** (mỗi event có ID, consumer dedup) để chịu được giao hàng lặp (at-least-once).
- Mô phỏng các tính chất production: **timeout** mỗi bước, **retry + backoff** cho lỗi tạm thời, **trace ID** (correlation ID) xuyên 3 service.
- Nhìn rõ ranh giới: cái gì mô phỏng được in-memory, cái gì cần infra thật (Kafka/NATS, gRPC, K8s).

## Kiến thức tiền đề (prerequisites)

Bài này là **tổng kết Tier 6**, dùng lại trực tiếp:

| Lesson | Khái niệm dùng trong bài này |
|--------|------------------------------|
| L62 — Distributed Fundamentals | **Idempotency**, at-least-once delivery, vì sao "exactly-once" khó |
| L64 — Message Queue (NATS/Kafka) | **Pub/sub**, topic, consumer, delivery guarantee |
| L65 — Event-Driven Architecture | **Event** là sự thật bất biến; outbox; loose coupling |
| L66 — Saga Pattern | **Saga** orchestration vs choreography, compensation |
| L69 — Microservice Patterns | Service độc lập, ranh giới (boundary), giao tiếp async |

Nếu chưa chắc về idempotency hoặc saga, hãy đọc lại L62 và L66 trước.

---

## 1. Project goal & features

### 1.1 Bài toán

Một khách bấm **"Đặt hàng"**. Để đơn hàng hoàn tất, hệ thống phải làm 3 việc ở 3 nơi khác nhau:

1. **Order service** — tạo bản ghi đơn hàng (trạng thái `PENDING`).
2. **Inventory service** — giữ chỗ (trừ tồn kho) cho sản phẩm.
3. **Payment service** — trừ tiền khách.

Và chỉ khi cả 3 thành công thì đơn mới `CONFIRMED`.

> 💡 **Trực giác / Hình dung.** Hãy tưởng tượng 3 nhân viên ở 3 phòng ban KHÁC TÒA NHÀ, không dùng chung một quyển sổ cái. Bạn không thể "khóa cả 3 quyển sổ rồi ghi đồng thời" (đó là transaction ACID của một database). Thay vào đó bạn làm tuần tự: nhờ phòng kho giữ hàng, rồi nhờ phòng tài chính trừ tiền. Nếu phòng tài chính báo "thẻ bị từ chối", bạn phải **quay lại** nhờ phòng kho **trả hàng về**. Cái "quay lại trả hàng" đó chính là **compensation** của saga.

### 1.2 Vì sao không dùng transaction ACID một phát?

> ❓ **Câu hỏi tự nhiên của người đọc.**
>
> - *"Sao không nhét cả 3 vào một database rồi `BEGIN ... COMMIT`?"* — Vì 3 service là 3 hệ độc lập (database riêng, đội phát triển riêng, scale riêng). Đó là cả lý do tồn tại của microservices (L69). Một transaction ACID không trải được qua nhiều database/network.
> - *"Vậy dùng 2-Phase Commit (2PC)?"* — 2PC có thật nhưng: nó **khóa tài nguyên** suốt thời gian commit (kho bị khóa trong khi chờ payment) → giảm throughput; và nếu coordinator chết giữa chừng, các participant **treo vô hạn**. Trong microservices ở quy mô lớn, 2PC bị tránh. Saga là giải pháp thực dụng: chấp nhận **nhất quán cuối cùng (eventual consistency)** đổi lấy tính sẵn sàng (availability).

**Định nghĩa: transaction phân tán (distributed transaction).**

- **(a) Là gì** — một chuỗi thao tác trải qua ≥ 2 hệ thống độc lập (database/service khác nhau) mà ta muốn có tính chất "tất cả thành công hoặc không thay đổi gì cả" (atomicity). "Đặt hàng" của ta là ví dụ: 3 thao tác ở 3 service phải cùng thành công.
- **(b) Vì sao cần khái niệm riêng** — vì transaction ACID của MỘT database (`BEGIN/COMMIT/ROLLBACK`) không vượt qua được ranh giới process/network. Khi dữ liệu nằm ở nhiều nơi, ta cần một cơ chế khác để giữ được "all-or-nothing".
- **(c) Ví dụ số cụ thể** — đặt hàng `ord-1` (qty=2, amount=200): nếu chỉ trừ kho `5→3` mà KHÔNG trừ tiền (vì payment lỗi), hệ thống "rò rỉ" 2 đơn vị hàng — kho sai. Distributed transaction (qua saga) đảm bảo: hoặc cả trừ kho + trừ tiền + confirm, hoặc trả kho về `3→5` và hủy đơn. Không có trạng thái nửa vời.

**Định nghĩa: nhất quán cuối cùng (eventual consistency).**

- **(a) Là gì** — hệ thống KHÔNG nhất quán tức thì sau mỗi thao tác, nhưng nếu ngừng ghi mới, sau một khoảng thời gian hữu hạn nó SẼ hội tụ về trạng thái nhất quán.
- **(b) Vì sao cần** — vì giữ nhất quán tức thì (strong consistency) qua mạng đòi hỏi khóa/đồng bộ tốn kém, hi sinh tính sẵn sàng (định lý CAP, L62). Saga chấp nhận một "cửa sổ" ngắn mà order đang PENDING (chưa biết confirmed hay cancelled) để đổi lấy availability.
- **(c) Ví dụ số cụ thể** — giữa lúc `inventory.reserved` đã phát nhưng `payment.charged` chưa xong: kho đã là `3` nhưng order vẫn `PENDING`. Đây là trạng thái "tạm thời không nhất quán toàn cục" — vài mili-giây sau, ConfirmOrder chạy và mọi thứ khớp lại.

### 1.3 Tính năng (features) của project

- 3 service độc lập, mỗi service một package, **không gọi hàm chéo** — chỉ qua event bus.
- Message bus in-memory: pub/sub, fan-out, **at-least-once** (có thể giao lặp) + helper **dedup**.
- Saga orchestrator: 4 bước forward + bồi hoàn ngược.
- Idempotency ở cả consumer (dedup theo event ID) và service (reserve/charge theo `orderID`).
- Timeout mỗi bước, retry + exponential backoff, trace ID.
- Demo CLI chạy 3 kịch bản: thành công, hết hàng → bồi hoàn, payment từ chối → bồi hoàn.
- Bộ test: saga success, 2 nhánh compensate, retry thành công, retry cạn kiệt, dedup idempotency.

> 📝 **Tóm tắt mục 1.** "Đặt hàng" là transaction phân tán qua 3 service. Không có ACID/2PC tiện lợi → dùng **saga**: làm tuần tự, mỗi bước có hành động hoàn tác, thất bại thì chạy hoàn tác ngược. Đổi lại ta chấp nhận nhất quán cuối cùng.

---

## 2. Ba services

Mỗi service là một **package độc lập** trong `solutions/internal/`. Quan trọng: chúng KHÔNG import lẫn nhau cho logic nghiệp vụ — chỉ orchestrator (saga) biết cả ba.

### 2.1 Order service (`internal/order`)

**Trách nhiệm**: tạo order, theo dõi vòng đời trạng thái.

```
PENDING ──(saga thành công)──> CONFIRMED
   │
   └────(saga thất bại)──────> CANCELLED
```

API chính:

```go
func (s *Service) Create(o *Order) *Order      // tạo order PENDING
func (s *Service) Get(id string) (*Order, bool) // tra cứu
```

Order còn **lắng nghe bus**: khi saga phát `order.confirm` hoặc `order.cancel`, Order tự cập nhật trạng thái — và **dedup theo event ID** để không xử lý 2 lần.

### 2.2 Payment service (`internal/payment`)

**Trách nhiệm**: `Charge` (trừ tiền) và `Refund` (hoàn tiền — bước bồi hoàn).

```go
func (s *Service) Charge(orderID string, amount int) (*Charge, error)
func (s *Service) Refund(orderID string) error
```

- **Idempotent theo `orderID`**: gọi `Charge("ord-1", 200)` hai lần chỉ trừ tiền **một lần** (lần sau trả về charge cũ).
- Quy ước demo: `Charge` **thất bại nếu `amount <= 0`** (giả lập thẻ bị từ chối) — để minh họa nhánh failure.
- `Refund` an toàn khi gọi với order chưa từng charge (no-op).

### 2.3 Inventory service (`internal/inventory`)

**Trách nhiệm**: `Reserve` (giữ chỗ, trừ kho) và `Release` (trả kho — bồi hoàn).

```go
func (s *Service) Reserve(orderID, sku string, qty int) error
func (s *Service) Release(orderID string) error
func (s *Service) Stock(sku string) int
```

- **Idempotent theo `orderID`**: `Reserve` cùng `orderID` 2 lần chỉ trừ kho 1 lần.
- `Reserve` **thất bại nếu không đủ tồn kho** → đây là điểm kích hoạt saga compensate trong demo.
- `Release` trả lại đúng lượng đã giữ; gọi lại không cộng dồn (idempotent).

> ⚠ **Lỗi thường gặp.** Đặt logic idempotency vào CHỖ KHÁC nhau giữa các service (chỗ dùng `orderID`, chỗ dùng event ID) mà không nhất quán → bug khó tìm. Trong project này ta phân tầng rõ:
> - **Consumer-level dedup** (theo *event ID*): chống xử lý lặp một event đã nhận.
> - **Service-level idempotency** (theo *orderID*): chống side-effect lặp (trừ kho/tiền 2 lần) kể cả khi gọi từ nhiều nguồn.

> 🔁 **Dừng lại tự kiểm tra.** Vì sao `Reserve` idempotent theo `orderID` mà không phải theo `(sku, qty)`?
>
> <details><summary>Đáp án</summary>
> Vì hai order khác nhau có thể cùng `(sku, qty)` nhưng là 2 lần giữ chỗ HỢP LỆ — phải trừ kho 2 lần. Chỉ khi CÙNG `orderID` mới là "cùng một yêu cầu bị lặp" → mới được bỏ qua. `orderID` là khóa tự nhiên của một lần đặt hàng.
> </details>

> 📝 **Tóm tắt mục 2.** Order theo dõi trạng thái và phản ứng với quyết định của saga. Payment charge/refund, Inventory reserve/release. Cả ba idempotent theo `orderID`. Payment fail khi `amount<=0`, Inventory fail khi thiếu hàng — hai cò súng cho nhánh compensate.

---

## 3. Distributed transaction "place order" qua SAGA

### 3.1 Chuỗi forward và compensation

> 💡 **Trực giác.** Saga giống chơi cờ domino dựng đứng: bạn đặt từng quân (forward). Nếu một quân không đứng được, bạn phải **gỡ ngược** những quân đã đặt — không gỡ theo thứ tự đặt mà theo **thứ tự ngược** (cái đặt cuối gỡ trước), vì cái sau có thể phụ thuộc cái trước.

```
FORWARD (thứ tự tiến):
  CreateOrder ─► ReserveInventory ─► ChargePayment ─► ConfirmOrder
       │                │                 │
       ▼                ▼                 ▼
COMPENSATION (chạy NGƯỢC nếu một bước sau fail):
  CancelOrder ◄─ ReleaseInventory ◄─ RefundPayment
```

Bảng ánh xạ bước ↔ bồi hoàn:

| # | Bước forward | Hành động | Bồi hoàn (compensation) |
|---|--------------|-----------|--------------------------|
| 1 | CreateOrder | tạo order PENDING + phát `order.created` | CancelOrder → phát `order.cancel` |
| 2 | ReserveInventory | trừ kho + phát `inventory.reserved` | ReleaseInventory → trả kho + `inventory.released` |
| 3 | ChargePayment | trừ tiền + phát `payment.charged` | RefundPayment → hoàn tiền + `payment.refunded` |
| 4 | ConfirmOrder | phát `order.confirm` (order → CONFIRMED) | no-op (bước cuối, thành công thì không hoàn) |

### 3.2 Walk-through bằng số cụ thể — kịch bản THÀNH CÔNG

Đặt hàng `ord-1`: SKU `BOOK-GO`, qty `2`, amount `200`. Kho ban đầu `BOOK-GO = 5`.

| Bước | Việc làm | Kết quả | Trạng thái sau bước |
|------|----------|---------|----------------------|
| CreateOrder | tạo `ord-1` | order PENDING | order=PENDING |
| ReserveInventory | `5 - 2 = 3` | OK | kho=3 |
| ChargePayment | trừ 200 (amount>0) | OK | charge=200 |
| ConfirmOrder | phát `order.confirm` | order → CONFIRMED | order=CONFIRMED |

Kết quả cuối: order `CONFIRMED`, kho `3`, charge `200` chưa refund. **Không bồi hoàn nào chạy.**

### 3.3 Walk-through — kịch bản HẾT HÀNG (fail sớm)

Đặt hàng `ord-2`: qty `10`, kho chỉ còn `3`.

| Bước | Việc làm | Kết quả |
|------|----------|---------|
| CreateOrder | tạo `ord-2` PENDING | OK (forward=[CreateOrder]) |
| ReserveInventory | cần 10 > còn 3 | **FAIL** |

Vì ReserveInventory fail, chỉ có CreateOrder đã xong → bồi hoàn nó:

| Bồi hoàn (ngược) | Việc làm | Kết quả |
|------------------|----------|---------|
| CancelOrder | phát `order.cancel` | order → CANCELLED |

Kết quả: order `CANCELLED`, kho **giữ nguyên 3** (chưa từng trừ), **không có charge**. Đúng — không trừ tiền khách khi không có hàng.

### 3.4 Walk-through — kịch bản PAYMENT TỪ CHỐI (fail muộn → bồi hoàn 2 bước)

Đặt hàng `ord-3`: qty `1`, amount `0` (giả lập thẻ từ chối), kho `3`.

| Bước | Kết quả |
|------|---------|
| CreateOrder | OK |
| ReserveInventory | `3 - 1 = 2`, OK |
| ChargePayment | amount=0 → **FAIL** |

Bồi hoàn NGƯỢC (ReserveInventory rồi CreateOrder):

| Bồi hoàn | Việc làm | Kết quả |
|----------|----------|---------|
| ReleaseInventory | trả 1 về kho → `2 + 1 = 3` | kho=3 |
| CancelOrder | phát `order.cancel` | order → CANCELLED |

Kết quả: order `CANCELLED`, kho **về lại 3** (đã release), không charge. Hệ thống trở lại trạng thái như chưa từng đặt — đó là mục tiêu của compensation.

> ⚠ **Lỗi thường gặp.** Bồi hoàn theo thứ tự XUÔI thay vì NGƯỢC. Nếu ChargePayment đã trừ tiền và ReserveInventory đã trừ kho, mà bạn release kho TRƯỚC khi refund... thực ra ở đây thứ tự release/refund độc lập nên không sao, NHƯNG nguyên tắc chung: **bồi hoàn ngược** để tôn trọng phụ thuộc (bước sau có thể đọc trạng thái bước trước). Luôn unwind theo LIFO.

#### Bốn ví dụ số cho quy tắc "fail ở bước k → bồi hoàn 1..k-1 ngược"

Để thấy rõ quy luật, đây là 4 trường hợp với chuỗi 4 bước `[Create, Reserve, Charge, Confirm]`:

| Fail ở bước | done (đã xong) | Bồi hoàn chạy (thứ tự ngược) | Số bồi hoàn |
|-------------|----------------|------------------------------|-------------|
| Create (bước 1) | `[]` | (không có) | 0 |
| Reserve (bước 2) | `[Create]` | `Cancel` | 1 |
| Charge (bước 3) | `[Create, Reserve]` | `Release` → `Cancel` | 2 |
| Confirm (bước 4) | `[Create, Reserve, Charge]` | `Refund` → `Release` → `Cancel` | 3 |

Quy luật chung: fail ở bước thứ `k` (1-indexed) → đúng `k-1` bồi hoàn chạy, theo thứ tự `k-1, k-2, ..., 1`. (Trường hợp Confirm fail hiếm vì nó chỉ phát event, nhưng nếu thêm Shipping vào — xem BT1 — thì kiểu fail muộn này rất thực tế.)

> 🔁 **Dừng lại tự kiểm tra.** Trong kịch bản 3.4, vì sao RefundPayment KHÔNG nằm trong danh sách bồi hoàn?
>
> <details><summary>Đáp án</summary>
> Vì ChargePayment **thất bại** — nó chưa bao giờ "xong" nên không được thêm vào danh sách `done`. Chỉ các bước ĐÃ thành công mới cần bồi hoàn. ChargePayment chính là bước gây fail, không phải bước đã xong. (Dù vậy, `Refund` được viết an toàn để gọi cả khi chưa charge — nguyên tắc bồi hoàn "best effort".)
> </details>

> 📝 **Tóm tắt mục 3.** Forward: Create → Reserve → Charge → Confirm. Fail ở bước k → chạy compensation của các bước `1..k-1` theo thứ tự NGƯỢC. Idempotency khiến mọi bồi hoàn an toàn dù gọi lặp.

---

## 4. Architecture (kiến trúc)

```
                          ┌───────────────────────────┐
                          │     SAGA ORCHESTRATOR      │
                          │  (place-order coordinator) │
                          │  forward steps + compensate│
                          └─────────────┬─────────────┘
                                        │ publish / subscribe
                          ┌─────────────▼─────────────┐
                          │       MESSAGE BUS          │
                          │  (in-memory, pub/sub,      │
                          │   at-least-once + dedup)   │
                          └──┬───────────┬──────────┬──┘
            order.* events   │           │          │  payment.* events
                     ┌───────▼──┐   ┌────▼─────┐  ┌─▼──────────┐
                     │  ORDER   │   │INVENTORY │  │  PAYMENT   │
                     │ service  │   │ service  │  │  service   │
                     │ PENDING/ │   │ reserve/ │  │  charge/   │
                     │ CONFIRMED│   │ release  │  │  refund    │
                     │ CANCELLED│   │ stock[]  │  │ charges[]  │
                     └──────────┘   └──────────┘  └────────────┘
```

Điểm mấu chốt:

- **Service không gọi nhau trực tiếp.** Tất cả đi qua bus → loose coupling (L65). Order không biết Payment tồn tại.
- **Orchestrator là người duy nhất "biết toàn cảnh"** saga. Đây là kiểu **orchestration** (L66); kiểu còn lại là **choreography** (mỗi service tự phản ứng event của service khác, không có coordinator trung tâm).
- **Bus + dedup** đảm bảo at-least-once mà vẫn an toàn.

> ❓ **Câu hỏi tự nhiên.** *"Orchestration hay choreography tốt hơn?"* — Orchestration dễ đọc/debug (luồng nằm một chỗ) nhưng orchestrator thành điểm tập trung. Choreography phi tập trung, co giãn tốt nhưng luồng "ẩn" trong các handler rải rác → khó truy vết. Dự án nhỏ/luồng phức tạp → orchestration. Ta chọn orchestration cho bài này vì dễ học.

> 📝 **Tóm tắt mục 4.** 3 service + 1 bus + 1 orchestrator. Service giao tiếp 100% qua event. Orchestrator nắm toàn cảnh saga (kiểu orchestration).

---

## 5. Step-by-step build (10 bước)

Đây là lộ trình dựng `solutions/` từ đầu. Mỗi bước build được độc lập.

**Bước 1 — `go.mod`.** Khởi tạo module `microservices`, stdlib only (không dependency ngoài).

**Bước 2 — Message bus (`internal/bus/bus.go`).** Struct `Bus` với `map[topic][]Handler`. `Subscribe`, `Publish` (giao bất đồng bộ qua goroutine), `Wait`, `Log`. Thêm `Dedup` (map event ID → đã thấy) cho idempotency.

**Bước 3 — Event type.** `Event{ID, Topic, TraceID, Payload, Time}`. `ID` để dedup, `TraceID` để tracing (BT5).

**Bước 4 — Order service (`internal/order`).** `Order` + `Status`. `Create` (PENDING), `Get`. Subscribe `order.confirm`/`order.cancel`, dedup theo event ID, đổi trạng thái.

**Bước 5 — Payment service (`internal/payment`).** `Charge` idempotent theo `orderID`, fail khi `amount<=0`. `Refund` idempotent.

**Bước 6 — Inventory service (`internal/inventory`).** `Reserve` idempotent + fail khi thiếu hàng. `Release` idempotent. `Stock` để inspect.

**Bước 7 — Saga steps (`internal/saga`).** Định nghĩa `Step{Name, Action, Compensate}`. Liệt kê 4 step Create→Reserve→Charge→Confirm + compensation từng cái.

**Bước 8 — Orchestrator forward + compensate.** `PlaceOrder`: chạy forward, nhớ `done []Step`; gặp lỗi → `compensate(done)` theo thứ tự ngược.

**Bước 9 — Timeout + retry/backoff.** `runWithRetry`: bọc `Action` trong `context.WithTimeout` (BT2), retry với exponential backoff cho lỗi tạm thời (BT4). Lỗi nghiệp vụ (hết hàng/từ chối) KHÔNG retry.

**Bước 10 — Demo CLI (`cmd/app/main.go`) + test.** Dựng bus + 3 service + orchestrator; chạy 3 kịch bản; in luồng event. Viết test cho success/compensate/retry/dedup.

> ❓ **Câu hỏi tự nhiên.** *"Vì sao lỗi 'hết hàng' không retry mà lỗi 'tạm thời' lại retry?"* — Phân biệt **lỗi nghiệp vụ vĩnh viễn** (hết hàng, thẻ từ chối — thử lại 100 lần vẫn fail) với **lỗi hạ tầng tạm thời** (network blip, timeout — thử lại có thể qua). Retry mù quáng lỗi nghiệp vụ chỉ tốn thời gian rồi vẫn phải compensate.

---

## 6. Kiến thức Tier 6 được dùng ở đâu

| Khái niệm (lesson) | Hiện diện trong code |
|--------------------|----------------------|
| **Idempotency** (L62) | `bus.Dedup.Seen(id)` ở consumer; `Reserve`/`Charge` idempotent theo `orderID` |
| **Message queue / pub-sub** (L64) | `bus.Subscribe` + `bus.Publish`, fan-out nhiều handler/topic |
| **Event-driven, outbox** (L65) | Mọi bước phát event (`order.created`, `payment.charged`...) thay vì gọi hàm; event là sự thật |
| **Saga** (L66) | `saga.Orchestrator`: forward steps + compensation ngược |
| **Microservice boundary** (L69) | Mỗi service một package, không import chéo logic; chỉ orchestrator biết cả ba |

> 📝 **Tóm tắt mục 6.** Bài này không dạy khái niệm mới — nó **ghép** L62/L64/L65/L66/L69 thành một hệ thống chạy được. Đó là ý nghĩa của "mini-project tổng kết".

### 6.1 Ghi chú về outbox (L65)

Trong project này, sau khi một bước thay đổi trạng thái (vd `Reserve` trừ kho), ta phát event NGAY. Production "thật" thường dùng **outbox pattern**: ghi thay đổi trạng thái + event vào **cùng một transaction DB**, rồi một process riêng đọc bảng outbox và publish lên bus. Mục đích: tránh trường hợp "đã trừ kho nhưng app chết trước khi publish event" → mất event. Ở đây in-memory nên ta gộp một bước cho gọn, nhưng hãy nhớ giới hạn này.

---

## 7. Communication: events qua bus

Danh sách topic (event) trong hệ thống:

| Topic | Ai phát | Ý nghĩa |
|-------|---------|---------|
| `order.created` | orchestrator (CreateOrder) | đơn vừa tạo, PENDING |
| `inventory.reserved` | orchestrator (ReserveInventory) | đã giữ chỗ |
| `payment.charged` | orchestrator (ChargePayment) | đã trừ tiền |
| `order.confirm` | orchestrator (ConfirmOrder) | yêu cầu Order → CONFIRMED |
| `inventory.released` | orchestrator (compensate) | đã trả kho |
| `payment.refunded` | orchestrator (compensate) | đã hoàn tiền |
| `order.cancel` | orchestrator (compensate) | yêu cầu Order → CANCELLED |

Order service **subscribe** `order.confirm` và `order.cancel`. Các event còn lại chủ yếu để **quan sát/audit** (và trong production sẽ kích hoạt downstream như gửi email, cập nhật analytics...).

> 💡 **Trực giác.** Event là "thông báo việc đã rồi", không phải mệnh lệnh. `payment.charged` nghĩa là "tiền ĐÃ bị trừ" — bất kỳ ai quan tâm cứ phản ứng. Đây là khác biệt cốt lõi giữa **event** (đã xảy ra, quá khứ) và **command** (yêu cầu làm, tương lai). Ngoại lệ trong bài: `order.confirm`/`order.cancel` mang tính command vì orchestrator chủ động ra lệnh cho Order đổi trạng thái.

---

## 8. Idempotency: mỗi event có ID, consumer dedup

### 8.1 Vì sao cần

> 💡 **Trực giác.** Bus của ta (và Kafka/NATS thật) hứa **at-least-once**: "tôi sẽ giao event ít nhất một lần" — tức CÓ THỂ giao 2-3 lần (do retry mạng, do consumer crash sau khi xử lý nhưng trước khi ack). Nếu consumer không phòng bị, một event `payment.charged` giao 2 lần → trừ tiền 2 lần. Idempotency = "xử lý lại cũng cho cùng kết quả như xử lý 1 lần".

### 8.2 Cơ chế dedup (walk-through)

`bus.Dedup` giữ một `map[string]bool` các event ID đã thấy:

```go
func (d *Dedup) Seen(id string) bool {
    if d.seen[id] { return true }   // đã xử lý -> báo "bỏ qua"
    d.seen[id] = true               // lần đầu -> đánh dấu, báo "hãy xử lý"
    return false
}
```

Walk-through với event `evt-dup` giao 3 lần:

| Lần giao | `Seen("evt-dup")` trả về | Hành động consumer |
|----------|--------------------------|---------------------|
| 1 | `false` (chưa thấy) | xử lý — `processed = 1` |
| 2 | `true` (đã thấy) | bỏ qua |
| 3 | `true` | bỏ qua |

Kết quả: side-effect chỉ xảy ra **1 lần** dù event tới 3 lần. (Đây chính là `TestDedupIdempotency`.)

### 8.3 Hai tầng idempotency

| Tầng | Khóa dedup | Chống điều gì |
|------|-----------|----------------|
| **Consumer** | event ID | xử lý LẶP một event đã nhận |
| **Service** | `orderID` | side-effect LẶP (trừ kho/tiền 2 lần) từ bất kỳ nguồn nào |

> ⚠ **Lỗi thường gặp.** Chỉ dedup ở consumer mà quên idempotent ở service. Nếu cùng `orderID` đến từ 2 đường khác nhau (retry của orchestrator + replay event), consumer dedup theo *event ID khác nhau* sẽ KHÔNG bắt được → vẫn trừ kho 2 lần. Vì vậy `Reserve`/`Charge` phải idempotent theo `orderID` ở tầng service — đây là phòng tuyến cuối.

> 🔁 **Dừng lại tự kiểm tra.** Map `seen` cứ lớn mãi không xóa — production làm sao?
>
> <details><summary>Đáp án</summary>
> Production gắn **TTL** cho mỗi entry (vd 24h) hoặc lưu trong Redis với expiry, vì event quá cũ sẽ không bị replay nữa. Ngoài ra có thể dùng chính DB: insert với unique constraint trên event ID — trùng thì insert fail = đã xử lý. Bài này in-memory đơn giản nên giữ map vô hạn.
> </details>

> 📝 **Tóm tắt mục 8.** At-least-once → consumer PHẢI idempotent. Dedup theo event ID (consumer) + idempotent theo orderID (service). Cùng event/lệnh lặp lại cho cùng một kết quả.

---

## 9. Failure scenario: inventory không đủ → saga compensate

Đây là kịch bản 2 ở mục 3.3, nhìn dưới góc độ luồng event trên bus:

```
[time] orchestrator                bus                    services
  t0   PlaceOrder(ord-2, qty=10)
  t1   CreateOrder ───────────►  order.created  ─────► (audit)
  t2   ReserveInventory ──────►  inventory.Reserve(10) ► FAIL: còn 3
  t3   << bước fail, bắt đầu compensate các bước done=[CreateOrder] >>
  t4   CancelOrder ───────────►  order.cancel   ─────► Order: PENDING→CANCELLED
  t5   << saga kết thúc: Success=false, FailedStep=ReserveInventory >>
```

Bất biến (invariant) sau compensate: **không có tài nguyên nào bị giữ "mồ côi"**. Kho không bị trừ (vì reserve fail), order về CANCELLED, không có charge. Hệ thống nhất quán trở lại.

> ❓ **Câu hỏi tự nhiên.** *"Nếu chính bước COMPENSATE cũng fail thì sao?"* — Đây là vấn đề thật. Chiến lược production: (a) compensation phải idempotent + retry liên tục cho đến khi thành công; (b) nếu vẫn fail sau N lần → đẩy vào **dead-letter queue** + cảnh báo cho người vận hành xử lý tay. Saga giả định compensation "cuối cùng sẽ thành công". Trong code ta gọi compensation "best effort" (`_ = st.Compensate(ctx)`); production sẽ bọc retry quanh nó.

---

## 10. cURL / CLI test examples

Project này chạy 3 service trong **một process** (in-memory bus), nên "API" là CLI demo chứ không phải HTTP server. Chạy:

```bash
cd solutions
go run ./cmd/app
```

Output (rút gọn) cho 3 kịch bản:

```
KỊCH BẢN 1 — Đặt hàng thành công
  [bus] order.created        trace=trace-ord-1 ...
  [bus] inventory.reserved   trace=trace-ord-1 ...
  [bus] payment.charged      trace=trace-ord-1 ...
  [bus] order.confirm        trace=trace-ord-1 ...
  Kết quả: success=true
  Trạng thái order: CONFIRMED   |  Tồn kho còn: 3  |  Payment: 200

KỊCH BẢN 2 — Hết hàng -> COMPENSATE
  Kết quả: success=false failedStep="ReserveInventory"
  Bồi hoàn (ngược): [CreateOrder]
  Trạng thái order: CANCELLED   |  Tồn kho còn: 3  |  Payment: (không có charge)

KỊCH BẢN 3 — Payment từ chối -> release inventory
  Kết quả: success=false failedStep="ChargePayment"
  Bồi hoàn (ngược): [ReserveInventory CreateOrder]
  Trạng thái order: CANCELLED   |  Tồn kho còn: 3
```

Chạy test:

```bash
cd solutions
go build ./...    # phải sạch
go test ./...     # tất cả PASS
go vet ./...      # không cảnh báo
```

> 💡 **Hình dung cách "lên HTTP thật".** Nếu muốn biến thành REST: thêm `cmd/order-api`, `cmd/payment-api`... mỗi cái một `http.Server`, và `POST /orders` sẽ gọi `orchestrator.PlaceOrder`. Khi đó cURL sẽ là: `curl -X POST localhost:8080/orders -d '{"sku":"BOOK-GO","qty":2,"amount":200}'`. Logic saga giữ nguyên — chỉ thêm lớp HTTP ở rìa.

---

## 11. Mở rộng lên production thật

| Phần in-memory | Thay bằng (production) | Lợi ích |
|----------------|------------------------|---------|
| `bus.Bus` (channel) | **NATS JetStream / Kafka** | persistence, replay, partition, scale ngang |
| 1 process | **mỗi service một pod K8s** | scale & deploy độc lập, fault isolation |
| event-only | thêm **gRPC** cho sync call cần kết quả ngay (vd kiểm tra tồn kho realtime) | latency thấp, type-safe |
| `TraceID` in log | **OpenTelemetry + Jaeger** (distributed tracing) | nhìn trace xuyên service trên UI |
| map dedup vô hạn | **Redis với TTL** hoặc unique constraint DB | bộ nhớ có giới hạn, sống qua restart |
| compensation best-effort | **retry queue + dead-letter** | đảm bảo bồi hoàn cuối cùng thành công |
| phát event trực tiếp | **outbox pattern** (L65) | không mất event khi crash giữa chừng |

> ❓ **Câu hỏi tự nhiên.** *"Khi nào nên dùng saga, khi nào dùng 2PC?"* — Saga khi: nhiều service/database độc lập, ưu tiên availability, chấp nhận eventual consistency, có hành động bồi hoàn hợp lý. 2PC khi: ít participant, cùng một hạ tầng hỗ trợ XA transaction, cần strong consistency tức thì, và chấp nhận khóa + risk treo. Microservices ở quy mô lớn gần như luôn chọn saga.

---

## Bài tập

> Mỗi bài có lời giải chi tiết ở mục "Lời giải chi tiết" bên dưới. Code tham khảo nằm trong `solutions/` — phần lớn BT đã được mô phỏng sẵn ở đó (timeout, retry, dedup), bài tập là để bạn tự suy luận và mở rộng.

**BT1 — Thêm Shipping service vào saga.** Thêm service `internal/shipping` với `Schedule(orderID)` (đặt lịch giao) và `Cancel(orderID)` (hủy lịch — bồi hoàn). Chèn bước `ScheduleShipping` vào saga **giữa** ChargePayment và ConfirmOrder. Cho biết: nếu ScheduleShipping fail thì những compensation nào chạy, theo thứ tự nào?

**BT2 — Timeout cho saga step.** Cho ChargePayment có thể "treo" (chờ một cổng thanh toán chậm). Nếu charge không trả lời trong 5s → coi như fail → compensate. Giải thích cơ chế `context.WithTimeout` + `select` đã dùng trong `runWithRetry`, và viết test mô phỏng một step treo.

**BT3 — Idempotency: duplicate `order.created`.** Bus giao `order.created` 2 lần cho một consumer. Chứng minh consumer chỉ xử lý 1 lần. Viết test.

**BT4 — Retry với backoff cho lỗi tạm thời.** Cho ReserveInventory fail "tạm thời" 1 lần đầu (network blip) rồi thành công. Saga phải retry và cuối cùng thành công. Tính tổng thời gian backoff với `BaseBackoff=10ms`, `MaxRetries=2`. Phân biệt với BT khi lỗi là vĩnh viễn (hết hàng).

**BT5 — Distributed tracing: correlation ID xuyên 3 service.** Mỗi event của cùng một saga phải mang chung một `TraceID`. Cho biết làm sao từ log, ghép lại được toàn bộ luồng của order `ord-2`.

**BT6 (nâng cao) — Choreography thay vì orchestration.** Phác thảo: nếu bỏ orchestrator, mỗi service tự subscribe event của service trước (Inventory nghe `order.created` → tự reserve → phát `inventory.reserved`...). So sánh ưu/nhược với orchestration. Compensation sẽ phức tạp hơn ở chỗ nào?

---

## Lời giải chi tiết

### Lời giải BT1 — Thêm Shipping service

**Cách tiếp cận.** Shipping là một service độc lập giống 3 service kia, và là một step saga có compensation.

```go
// internal/shipping/shipping.go
package shipping

import "sync"

type Service struct {
    mu        sync.Mutex
    scheduled map[string]bool // orderID -> đã đặt lịch
}

func New() *Service { return &Service{scheduled: map[string]bool{}} }

// Schedule idempotent theo orderID.
func (s *Service) Schedule(orderID string) error {
    s.mu.Lock(); defer s.mu.Unlock()
    s.scheduled[orderID] = true
    return nil
}
func (s *Service) Cancel(orderID string) error {
    s.mu.Lock(); defer s.mu.Unlock()
    delete(s.scheduled, orderID) // idempotent
    return nil
}
```

Chèn step vào saga, **giữa ChargePayment và ConfirmOrder**:

```go
{
    Name: "ScheduleShipping",
    Action: func(ctx context.Context) error {
        if err := o.shipping.Schedule(ord.ID); err != nil { return err }
        o.emit(traceID, "shipping.scheduled", ord.ID, map[string]any{"orderID": ord.ID})
        return nil
    },
    Compensate: func(ctx context.Context) error {
        err := o.shipping.Cancel(ord.ID)
        o.emit(traceID, "shipping.cancelled", ord.ID, nil)
        return err
    },
},
```

**Nếu ScheduleShipping fail:** các bước đã xong là `[CreateOrder, ReserveInventory, ChargePayment]`. Bồi hoàn ngược (LIFO):

1. RefundPayment (hoàn tiền)
2. ReleaseInventory (trả kho)
3. CancelOrder (hủy đơn)

Thứ tự ngược tôn trọng phụ thuộc: hoàn tiền trước khi trả kho/hủy đơn, đúng như thứ tự đã tạo ra chúng nhưng đảo lại.

**Độ phức tạp:** không đổi — saga vẫn O(số bước) cho forward và O(số bước đã xong) cho compensate.

### Lời giải BT2 — Timeout cho step

**Cơ chế (đã có trong `runWithRetry`):**

```go
ctx, cancel := context.WithTimeout(context.Background(), o.cfg.StepTimeout)
errCh := make(chan error, 1)
go func() { errCh <- st.Action(ctx) }()   // chạy Action trong goroutine
select {
case err := <-errCh:        // Action trả lời trước timeout
    cancel(); ...
case <-ctx.Done():          // hết giờ trước khi Action trả lời
    cancel()
    lastErr = fmt.Errorf("bước %s timeout sau %s", st.Name, o.cfg.StepTimeout)
}
```

`select` chờ **cái nào tới trước**: kết quả Action (`errCh`) hay tín hiệu hết giờ (`ctx.Done()`). Channel `errCh` có buffer 1 nên goroutine không leak dù ta đã bỏ qua kết quả muộn.

**Test mô phỏng step treo:**

```go
func TestStepTimeout(t *testing.T) {
    cfg := DefaultConfig()
    cfg.StepTimeout = 50 * time.Millisecond
    cfg.MaxRetries = 0
    // tạo orchestrator với một step Action ngủ 200ms > timeout 50ms
    // => runWithRetry trả lỗi timeout => saga fail => compensate
}
```

Lưu ý: vì timeout là lỗi *hạ tầng tạm thời*, nó ĐƯỢC retry (theo `MaxRetries`); chỉ khi cạn retry mới fail hẳn và compensate. Đặt `MaxRetries=0` để fail ngay trong test.

**Độ phức tạp:** mỗi step tốn tối đa `StepTimeout × (MaxRetries+1)` thời gian.

### Lời giải BT3 — Duplicate `order.created`

Đây chính là `TestDedupIdempotency` trong `internal/bus/bus_test.go`:

```go
d := NewDedup()
processed := 0
b.Subscribe("order.created", func(e Event) error {
    if d.Seen(e.ID) { return nil }   // event lặp -> bỏ qua
    processed++
    return nil
})
dup := Event{ID: "evt-dup", Topic: "order.created"}
b.Publish(dup); b.Publish(dup); b.Publish(dup)  // giao 3 lần CÙNG ID
b.Wait()
// processed == 1
```

**Giải thích:** `Seen` trả `false` đúng một lần (lần đầu), sau đó luôn `true`. Vì side-effect (`processed++`) đặt SAU kiểm tra `Seen`, nó chỉ chạy lần đầu. Mấu chốt: **dedup theo ID, không theo nội dung** — 3 event có cùng `ID` được coi là một.

**Độ phức tạp:** `Seen` là O(1) trung bình (map lookup).

### Lời giải BT4 — Retry với backoff

**Cách tiếp cận (đã có trong `runWithRetry` + `backoff`):**

```go
func (o *Orchestrator) backoff(attempt int) {
    d := o.cfg.BaseBackoff * (1 << attempt) // 10ms * 2^attempt
    time.Sleep(d)
}
```

Với `BaseBackoff=10ms`, `MaxRetries=2` (tức tối đa 3 lần thử, attempt = 0,1,2):

| attempt | backoff = 10ms × 2^attempt |
|---------|----------------------------|
| 0 | 10ms |
| 1 | 20ms |
| 2 | 40ms |

Nếu lỗi tạm thời chỉ xảy ra 1 lần (`transientFails["ReserveInventory"]=1`): attempt 0 fail (ngủ 10ms), attempt 1 thành công → tổng backoff = 10ms. Đây là `TestRetryTransient` (kết quả CONFIRMED, kho giảm).

Nếu lỗi tạm thời 5 lần > số attempt (3): cạn retry → fail → compensate → `TestRetryExhausted` (kho giữ nguyên, order CANCELLED).

**Phân biệt với lỗi vĩnh viễn:** hết hàng/payment từ chối trả lỗi qua nhánh `case err := <-errCh: return err` → **không** retry. Chỉ timeout và lỗi tạm thời mô phỏng mới đi qua nhánh backoff. Vì retry lỗi vĩnh viễn vô nghĩa (thử lại vẫn hết hàng).

**Độ phức tạp:** exponential backoff giúp tránh "retry storm" (đập dồn dập vào service đang quá tải). Tổng thời gian chờ là cấp số nhân, bị chặn bởi `MaxRetries`.

### Lời giải BT5 — Correlation ID (distributed tracing)

**Cách tiếp cận.** Orchestrator sinh `traceID = "trace-" + orderID` MỘT lần ở đầu `PlaceOrder`, rồi gắn vào MỌI event qua `emit`:

```go
func (o *Orchestrator) emit(traceID, topic, orderID string, payload map[string]any) {
    o.seq++
    o.bus.Publish(bus.Event{
        ID:      fmt.Sprintf("%s-%s-%d", traceID, topic, o.seq),
        Topic:   topic,
        TraceID: traceID,  // <- correlation ID chung cho cả saga
        Payload: payload,
    })
}
```

**Ghép luồng từ log.** Trong `main.go`, mọi handler in `trace=...`. Để xem toàn bộ luồng của `ord-2`, lọc log theo `trace=trace-ord-2`:

```
[bus] order.created   trace=trace-ord-2 id=trace-ord-2-order.created-5
[bus] order.cancel    trace=trace-ord-2 id=trace-ord-2-order.cancel-6
```

Nhìn 2 dòng này biết ngay: order tạo rồi bị cancel (saga fail). Trong production, `TraceID` được truyền qua HTTP header (`X-Trace-Id`) / gRPC metadata / Kafka header, và Jaeger/Tempo dựng cây span từ đó → bạn thấy timeline xuyên 3 service trên một màn hình.

**Lưu ý đặt tên:** `ID` của event (dùng dedup) PHẢI khác nhau giữa các event; `TraceID` thì CHUNG cho cả saga. Đừng nhầm hai cái — dedup theo `TraceID` sẽ khiến chỉ 1 event/saga được xử lý (sai).

### Lời giải BT6 — Choreography (nâng cao)

**Phác thảo choreography:** không có orchestrator. Mỗi service tự subscribe event của bước trước:

```
Order publishes   order.created
  └─ Inventory subscribes order.created → reserve → publishes inventory.reserved
       └─ Payment subscribes inventory.reserved → charge → publishes payment.charged
            └─ Order subscribes payment.charged → confirm
```

Compensation cũng theo event: nếu Payment charge fail, nó phát `payment.failed`; Inventory subscribe `payment.failed` → release; Order subscribe → cancel.

**So sánh:**

| Tiêu chí | Orchestration (bài này) | Choreography |
|----------|--------------------------|--------------|
| Luồng saga | tập trung một chỗ, dễ đọc/debug | rải rác trong các handler, khó truy vết |
| Coupling | service không biết nhau, chỉ biết orchestrator | service biết "event tiếp theo của ai" |
| Điểm lỗi tập trung | orchestrator (cần HA) | không có điểm tập trung |
| Compensation | coordinator điều phối ngược, rõ ràng | phải thiết kế chuỗi event bù trừ cẩn thận, dễ sót |
| Mở rộng thêm bước | sửa một chỗ (orchestrator) | sửa nhiều service (ai nghe ai) |

**Compensation phức tạp hơn ở đâu:** trong choreography, không ai "nắm danh sách bước đã xong". Mỗi service phải tự biết khi nhận event-failure thì nên bồi hoàn gì, và phải đảm bảo event-failure lan đủ xa ngược dòng. Dễ xảy ra trạng thái "nửa vời" nếu một service quên subscribe event-failure. Orchestration tránh được vì coordinator giữ `done []Step` và unwind tường minh.

**Kết luận:** dự án nhỏ/luồng tuyến tính → orchestration dễ học và bảo trì hơn (lý do bài này chọn nó). Hệ rất lớn, nhiều team độc lập → choreography giảm coupling tổ chức, nhưng trả giá bằng độ khó quan sát.

---

## Code & Minh họa

- Solutions (Go, chạy được): [solutions/](./solutions/)
  - `internal/bus/` — message bus in-memory + dedup
  - `internal/order/`, `internal/payment/`, `internal/inventory/` — 3 service
  - `internal/saga/` — orchestrator (forward + compensation + timeout/retry)
  - `cmd/app/main.go` — demo 3 kịch bản
  - Test: `internal/bus/bus_test.go`, `internal/saga/saga_test.go`
  - Chạy: `cd solutions && go build ./... && go test ./... && go run ./cmd/app`
- Minh họa trực quan: [visualization.html](./visualization.html) — 3 module: Architecture (clickable), Saga flow (success + compensate animate), Event flow (events bay qua bus + dedup).

---

## Kết thúc Tier 6

Đây là bài cuối **Tier 6 — Distributed & Microservices**. Bạn đã đi từ nền tảng (L62 idempotency, CAP) qua message queue (L64), event-driven (L65), saga (L66), CQRS/event-sourcing (L67), consensus/Raft (L68), microservice patterns (L69), service mesh (L70), và gói lại thành mini-project này.

- Lesson trước: [L70 — Service Mesh Intro](../lesson-70-service-mesh-intro/)
- Tier tiếp theo: [Tier 7 — Production](../tier-7-production/) — đưa hệ thống lên môi trường thật: observability, CI/CD, deployment, reliability.
