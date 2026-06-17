# Lesson 64 — Message Queue (Kafka / NATS / RabbitMQ)

> Tier 6 — Distributed & Microservices · Bài 3/10

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Hiểu **vì sao** cần message queue (MQ): decouple, buffer load spike, async, fan-out.
- Phân biệt giao tiếp **đồng bộ (sync)** REST/gRPC với **bất đồng bộ (async)** qua MQ, và trade-off của mỗi bên.
- Nắm 2 messaging pattern nền tảng: **point-to-point (queue)** và **pub/sub (topic)**.
- Hiểu mô hình của 3 broker phổ biến: **Kafka** (distributed log), **NATS** (lightweight), **RabbitMQ** (traditional broker).
- Phân biệt 3 mức **delivery guarantee**: at-most-once, at-least-once, exactly-once — và vì sao "exactly-once" thực tế gần như luôn là **at-least-once + idempotent**.
- Hiểu **partition & ordering**, **consumer offset**, **consumer lag / backpressure**, **dead letter queue (DLQ)**, **idempotent consumer**.
- Biết **khi nào** chọn Kafka vs NATS vs RabbitMQ.
- Tránh các pitfall kinh điển (assume exactly-once, ordering cross-partition, consumer không idempotent, không monitor lag, poison message).

## Kiến thức tiền đề

- [Lesson 62 — Distributed Fundamentals](../lesson-62-distributed-fundamentals/) — CAP, eventual consistency, **idempotency** (rất quan trọng cho bài này).
- [Lesson 63 — Service Discovery & LB](../lesson-63-service-discovery-lb/) — cách service tìm nhau (MQ là một cách giao tiếp khác, không cần biết địa chỉ nhau).
- Hiểu cơ bản về goroutine/channel ([Lesson 27](../lesson-27-goroutines-channels/)) — `solutions.go` dùng channel để mô phỏng broker.

> Sẽ học kỹ ở [Lesson 65 — Event-Driven Architecture](../lesson-65-event-driven-architecture/): outbox pattern, choreography vs orchestration — xây trên nền MQ của bài này.

---

## 1. Vì sao cần message queue

### 1.1 💡 Trực giác: bưu điện vs gọi điện trực tiếp

Hình dung hai cách gửi thông tin:

- **Gọi điện trực tiếp (sync)**: bạn quay số, người kia phải đang rảnh và nhấc máy *ngay*. Nếu họ bận → bạn chờ hoặc cuộc gọi thất bại. Bạn phải biết số của họ.
- **Gửi thư qua bưu điện (async)**: bạn bỏ thư vào hòm. Bưu điện (broker) giữ thư, người nhận lấy *khi nào rảnh*. Bạn không cần biết người nhận đang ở đâu, online hay không. Một lá thư có thể gửi cho nhiều người (fan-out).

Message queue chính là "bưu điện" giữa các service: **producer** bỏ message vào, **broker** giữ, **consumer** lấy ra xử lý khi sẵn sàng.

### 1.2 Bốn lý do dùng MQ

**(a) Decouple producer và consumer.** Producer không cần biết ai sẽ xử lý, có bao nhiêu consumer, họ đang chạy hay không. Nó chỉ "publish rồi quên". Thêm consumer mới (vd: thêm service gửi email khi có order) → producer **không phải sửa code**.

**(b) Buffer load spike.** Giả sử bình thường hệ thống nhận 100 order/giây, consumer xử lý được 120/giây → ổn. Nhưng giờ flash sale: 5000 order/giây ập tới trong 10 giây.

- **Không có MQ**: consumer (hoặc DB) quá tải → sập, request fail, mất order.
- **Có MQ**: 5000 order/giây được nhét vào queue (broker chịu được burst). Consumer vẫn xử lý 120/giây, queue dồn lại ~50000 message, rồi *từ từ rút xuống* sau khi spike qua. Không mất order, chỉ chậm hơn. Đây gọi là **load leveling** (san bằng tải).

  Số cụ thể: spike 10 giây × 5000 = 50000 message vào. Consumer rút 120/giây. Sau spike, để xử lý hết backlog 50000 cần `50000 / 120 ≈ 417` giây ≈ 7 phút. Đổi lại: 0 order bị mất.

**(c) Async processing.** Gửi email xác nhận order không cần làm *trong* request HTTP của user. Bỏ "gửi email" vào queue → trả response cho user *ngay* (vd 20ms), email được gửi sau (vd 2 giây sau) bởi consumer riêng. User không phải chờ.

**(d) Fan-out.** Một event "order created" cần kích hoạt nhiều việc: gửi email, cập nhật kho, ghi analytics, push notification. Với pub/sub, producer publish **1 message** → **4 consumer** mỗi cái làm việc của mình, song song, độc lập.

### 1.3 ❓ Câu hỏi tự nhiên

<details>
<summary><b>MQ có làm hệ thống chậm hơn không? (thêm 1 hop)</b></summary>

Có thêm latency cho *một message cụ thể* (phải qua broker thay vì gọi thẳng). Nhưng:
- Throughput tổng và độ ổn định tăng mạnh (buffer spike).
- Với việc không cần kết quả ngay (gửi email, ghi log), user *cảm thấy* nhanh hơn vì response trả về sớm.
- Kafka/NATS có latency rất thấp (NATS sub-ms, Kafka vài ms) nên hop thêm thường không đáng kể.
</details>

<details>
<summary><b>Nếu broker sập thì sao? Có phải single point of failure?</b></summary>

Broker production luôn chạy **cluster** (Kafka: nhiều broker + replication factor; NATS JetStream: RAFT cluster; RabbitMQ: mirrored queue / quorum queue). Một node chết, node khác tiếp quản. Đây là lý do MQ thường phức tạp vận hành hơn một REST call.
</details>

### 📝 Tóm tắt mục 1

- MQ = "bưu điện" async giữa các service.
- 4 lý do: decouple, buffer spike (load leveling), async, fan-out.
- Đánh đổi: thêm 1 hop + cần vận hành broker cluster, đổi lấy độ ổn định + mở rộng.

---

## 2. Sync vs Async communication

### 2.1 💡 Hai kiểu giao tiếp

| | **Sync (REST / gRPC)** | **Async (Message Queue)** |
|---|---|---|
| Mô hình | Request → chờ → Response | Publish → quên (consumer xử lý sau) |
| Caller có chờ kết quả? | Có (blocking) | Không |
| Coupling theo thời gian | Cao — cả 2 phải online cùng lúc | Thấp — consumer có thể offline lúc publish |
| Coupling theo địa chỉ | Caller phải biết địa chỉ callee | Chỉ cần biết topic/subject |
| Phù hợp khi | Cần kết quả ngay (vd: query số dư) | Không cần kết quả ngay (vd: gửi email, event) |
| Lỗi xử lý | Thấy lỗi ngay, retry tại chỗ | Broker retry, DLQ, eventual |

### 2.2 Trade-off

**Sync** mạnh khi bạn **cần câu trả lời để tiếp tục**: "user này có đủ tiền không?" → phải hỏi payment service và chờ. Đơn giản để suy luận (gọi → có kết quả → tiếp). Nhược: nếu callee chậm/chết, caller bị kéo theo (cascading failure). Cần circuit breaker, timeout.

**Async** mạnh khi việc **có thể làm sau** và bạn muốn decouple. Nhược: khó suy luận hơn — "order đã được ship chưa?" không trả lời được ngay, phải tra trạng thái. Phải xử lý duplicate, ordering, eventual consistency.

> ⚠ **Lỗi thường gặp**: dùng MQ cho thứ vốn cần sync. Ví dụ: "kiểm tra còn hàng không" qua queue rồi chờ message phản hồi → bạn vừa tự chế lại RPC trên MQ, mất hết ưu điểm async mà thêm độ phức tạp. Việc cần *request-reply tức thì* → dùng gRPC/REST. (NATS có hỗ trợ request-reply nhưng đó là exception có chủ đích.)

### 🔁 Dừng lại tự kiểm tra

<details>
<summary>Chọn sync hay async: (a) lấy thông tin profile để render trang, (b) ghi audit log mỗi action?</summary>

(a) **Sync** — cần data *ngay* để render, không có nó thì trang trống. (b) **Async** — audit log không cần xong trước khi trả response cho user; bỏ vào queue, consumer ghi sau.
</details>

---

## 3. Hai messaging pattern nền tảng

Mọi broker đều xoay quanh 2 pattern này (hoặc kết hợp).

### 3.1 Point-to-point (Queue): 1 message → 1 consumer

💡 **Hình dung**: một hàng người xếp trước **một** quầy. Có 3 nhân viên (consumer) cùng phục vụ hàng đó. Mỗi khách (message) được **đúng một** nhân viên xử lý — không ai bị phục vụ 2 lần.

```
                    ┌──► Consumer A  (xử lý msg 1, 4)
Producer ──► [Queue] ──► Consumer B  (xử lý msg 2, 5)
                    └──► Consumer C  (xử lý msg 3, 6)
```

- Dùng cho **task distribution / work queue**: chia việc cho nhiều worker để xử lý song song.
- Thêm consumer → mỗi consumer làm ít hơn → throughput tăng (scale out).
- Ví dụ: queue "resize ảnh", 100000 ảnh chia cho 10 worker → mỗi worker ~10000 ảnh.

### 3.2 Pub/Sub (Topic): 1 message → N subscriber

💡 **Hình dung**: đài phát thanh. Đài (producer) phát **một** chương trình lên tần số (topic). **Mọi** radio đang bắt tần số đó (subscriber) đều nghe được **bản sao** của chương trình.

```
                       ┌──► Subscriber 1 (Email service)     — nhận bản sao
Producer ──► [Topic] ──┼──► Subscriber 2 (Inventory service) — nhận bản sao
                       └──► Subscriber 3 (Analytics service)  — nhận bản sao
```

- Dùng cho **event broadcast / fan-out**: một sự kiện → nhiều bên quan tâm.
- Mỗi subscriber nhận **bản sao riêng** của message (khác hẳn queue — không chia nhau).
- Thêm subscriber → không ảnh hưởng producer hay các subscriber khác.
- Ví dụ: event "OrderCreated" → email + kho + analytics, mỗi service nhận một bản.

### 3.3 ⚠ Đừng nhầm queue với topic

| | Queue (point-to-point) | Topic (pub/sub) |
|---|---|---|
| 1 message tới mấy consumer? | **1** (chia nhau) | **N** (mỗi sub 1 bản) |
| Mục đích | chia tải / parallel work | broadcast event |
| Thêm consumer | tăng throughput | thêm 1 bên nhận bản sao |

> Mẹo nhớ: **Queue = chia bánh** (mỗi miếng cho 1 người). **Topic = phát loa** (ai cũng nghe).

**Kafka khéo léo kết hợp cả hai** bằng **consumer group** (mục 4.3): nhiều group trên cùng topic = pub/sub (mỗi group 1 bản); trong 1 group = queue (chia partition cho member). Đó là vì sao Kafka "1 mô hình làm được cả 2".

### 🔁 Dừng lại tự kiểm tra

<details>
<summary>Bạn cần: (a) chia 1 triệu job gửi SMS cho 20 worker, (b) thông báo "user đăng ký" cho 3 service. Chọn pattern nào?</summary>

(a) **Queue** — mỗi SMS chỉ gửi 1 lần, chia cho 20 worker chạy song song. (b) **Pub/Sub** — cả 3 service đều cần biết, mỗi service 1 bản sao.
</details>

### 📝 Tóm tắt mục 3

- Queue: 1 msg → 1 consumer, dùng chia tải.
- Topic: 1 msg → N subscriber, dùng broadcast.
- Kafka dùng consumer group để làm được cả hai.

---

## 4. Kafka — distributed commit log

### 4.1 💡 Trực giác: Kafka KHÔNG phải queue, nó là cuốn sổ ghi nối tiếp

Nhiều người tưởng Kafka là "queue lớn". Sai. Kafka là một **append-only log** (sổ ghi chỉ thêm vào cuối, không xóa/sửa) — giống cuốn nhật ký bạn chỉ viết thêm dòng mới, không tẩy dòng cũ.

- Đọc message **không xóa** nó (khác queue truyền thống). Consumer chỉ ghi nhớ "tôi đọc tới dòng số mấy" (**offset**).
- Vì không xóa, **nhiều consumer độc lập** đọc cùng log ở các tốc độ khác nhau, và có thể **tua lại (replay)** từ đầu.

### 4.2 Topic → Partition → offset

Một **topic** được chia thành nhiều **partition**. Mỗi partition là một log riêng, message được đánh số tăng dần gọi là **offset**.

```
Topic "orders" (3 partition):

partition 0:  [o:0][o:1][o:2][o:3]            ← append vào cuối
partition 1:  [o:0][o:1][o:2]
partition 2:  [o:0][o:1][o:2][o:3][o:4]
                                  ▲
                          consumer đọc tới offset 4 của P2
```

- **Producer write**: chọn partition (theo key — xem 4.4 và mục 8), append vào cuối, message nhận offset kế tiếp.
- **Consumer read by offset**: đọc tuần tự theo offset. Lưu offset đã đọc để lần sau đọc tiếp.

**Walk-through cụ thể**: producer gửi 4 message vào partition 0 → chúng nhận offset 0,1,2,3. Consumer đọc, xử lý xong tới offset 2 → commit offset = 3 (offset *kế tiếp* sẽ đọc). Nếu consumer restart, nó đọc lại từ offset 3, không đọc lại 0–2.

### 4.3 Consumer group — chìa khóa scale

Các consumer trong cùng một **consumer group** *chia nhau* các partition của topic. **Một partition chỉ được gán cho đúng 1 consumer trong group** tại một thời điểm.

```
Topic "orders" có 3 partition. Consumer group "billing" có 3 consumer:

  P0 ──► consumer C1
  P1 ──► consumer C2        ← mỗi consumer 1 partition → song song hoàn toàn
  P2 ──► consumer C3
```

Nếu group có **2** consumer cho 3 partition:

```
  P0, P1 ──► C1            ← C1 ôm 2 partition
  P2     ──► C2
```

Nếu group có **4** consumer cho 3 partition → 1 consumer **rảnh** (không có partition nào):

```
  P0 ──► C1
  P1 ──► C2
  P2 ──► C3
        C4  ← idle (số consumer hữu ích tối đa = số partition)
```

> ⚠ **Quy tắc vàng**: số consumer hữu ích trong 1 group ≤ số partition. Muốn scale lên 10 consumer → cần ≥ 10 partition. Đặt số partition là quyết định *kiến trúc* khó đổi về sau (đổi số partition làm thay đổi key→partition mapping).

**Rebalance**: khi consumer join/leave group, Kafka *gán lại* partition. Trong lúc rebalance, consumption tạm dừng. Module 2 của visualization mô phỏng đúng quá trình này.

**Nhiều group = pub/sub**: group "billing" và group "analytics" cùng đọc topic "orders" → mỗi group nhận **đầy đủ** mọi message (offset độc lập). Đây là cách Kafka làm fan-out.

### 4.4 Retention & replay

Kafka giữ message theo **retention policy**, không phải "xóa khi đọc xong":

- **Time-based**: giữ 7 ngày (mặc định), message cũ hơn bị xóa.
- **Size-based**: giữ tối đa 50GB/partition, vượt thì xóa cái cũ nhất.
- **Compaction**: chỉ giữ message mới nhất cho mỗi key (dùng cho changelog/state).

Vì message còn đó, bạn có thể **replay**: tạo consumer group mới đọc từ offset 0 → xử lý lại toàn bộ lịch sử (vd: build lại một read model, debug, hoặc service mới cần data quá khứ).

### 4.5 Ordering — chỉ trong 1 partition

**Kafka chỉ đảm bảo thứ tự TRONG một partition, KHÔNG đảm bảo cross-partition.** Đây là điểm cực kỳ hay nhầm — xem mục 8.

### 📝 Tóm tắt mục 4

- Kafka = append-only log, đọc không xóa, có offset.
- Topic chia thành partition; consumer group chia partition cho member để scale.
- Số consumer hữu ích ≤ số partition.
- Retention time/size → replay được.
- Ordering chỉ trong 1 partition.

---

## 5. NATS — lightweight messaging

NATS đặt trọng tâm vào **đơn giản và tốc độ**.

### 5.1 Core NATS: fire-and-forget

- Mô hình **at-most-once**, **không lưu trữ**: message chỉ gửi cho subscriber *đang online*. Subscriber offline → bỏ lỡ, không có lại.
- Cực nhanh (latency sub-millisecond), throughput hàng triệu msg/giây, binary nhỏ (~15MB).
- Dùng khi mất 1 message không sao: metrics, telemetry tần suất cao, service discovery ping, broadcast trạng thái.

### 5.2 JetStream: thêm persistence

JetStream là lớp lưu trữ của NATS, thêm:

- **Persistence**: message lưu vào stream (file/memory), replay được như Kafka.
- **At-least-once**: consumer phải **ack**; chưa ack thì redeliver. (Cũng hỗ trợ exactly-once theo nghĩa dedup bằng message ID trong cửa sổ thời gian.)
- **Consumer** với nhiều chính sách ack/replay.

### 5.3 Subject-based routing với wildcard

NATS định tuyến theo **subject** (chuỗi phân cấp ngăn bằng dấu chấm), hỗ trợ wildcard:

- `*` khớp **đúng 1 token**: `orders.*.created` khớp `orders.vn.created`, `orders.us.created` — KHÔNG khớp `orders.vn.eu.created`.
- `>` khớp **phần còn lại**: `orders.>` khớp `orders.vn.created`, `orders.us.shipped.late`, ...

Walk-through:

| Subject publish | `orders.*` | `orders.*.created` | `orders.>` |
|---|:---:|:---:|:---:|
| `orders.created` | ✓ | ✗ | ✓ |
| `orders.vn.created` | ✗ | ✓ | ✓ |
| `orders.vn.shipped.late` | ✗ | ✗ | ✓ |

> Routing linh hoạt này là điểm mạnh của NATS — subscriber chọn lọc đúng thứ cần mà không cần broker config phức tạp.

### 📝 Tóm tắt mục 5

- Core NATS: at-most-once, không lưu, siêu nhanh.
- JetStream: persistence + at-least-once + replay.
- Subject routing với `*` (1 token) và `>` (phần còn lại).

---

## 6. RabbitMQ — traditional broker

RabbitMQ là broker "cổ điển" theo chuẩn AMQP, mạnh ở **routing linh hoạt** và **task queue**.

### 6.1 Mô hình Exchange → Binding → Queue

Producer KHÔNG gửi thẳng vào queue, mà gửi vào **exchange**. Exchange định tuyến vào các queue theo **binding** + **routing key**.

```
Producer ──► [Exchange] ──(binding rule)──► [Queue A] ──► Consumer
                        └──────────────────► [Queue B] ──► Consumer
```

Ba loại exchange chính:

- **direct**: routing key phải khớp *chính xác* binding key. Vd key `error` → chỉ vào queue bind `error`.
- **topic**: routing key khớp pattern có wildcard (`*` = 1 từ, `#` = nhiều từ). Vd `log.*.error`.
- **fanout**: bỏ qua routing key, gửi vào **mọi** queue đã bind → giống pub/sub.

### 6.2 Ack & redelivery

- Consumer nhận message → xử lý → gửi **ack**. Broker chỉ xóa message khỏi queue khi nhận ack.
- Consumer chết trước khi ack → broker **redeliver** message cho consumer khác → **at-least-once**.
- Có thể `nack` (negative ack) để báo xử lý thất bại → requeue hoặc đẩy sang DLQ.

> Khác Kafka: RabbitMQ *xóa* message sau khi ack (queue thật sự), không phải log giữ lại để replay. Muốn nhiều bên đọc cùng message → fanout exchange vào nhiều queue.

### 📝 Tóm tắt mục 6

- RabbitMQ: producer → exchange → (binding) → queue → consumer ack.
- Exchange: direct (khớp chính xác), topic (wildcard), fanout (broadcast).
- Ack-based, redeliver khi không ack → at-least-once. Xóa sau ack (không replay như Kafka).

---

## 7. Delivery guarantees — 3 mức

Đây là phần **quan trọng nhất** và hay hiểu sai nhất.

### 7.1 At-most-once: có thể MẤT

Gửi rồi quên, không retry, không ack. Message có thể tới 0 hoặc 1 lần.

- Cơ chế: fire-and-forget (Core NATS), hoặc commit offset *trước* khi xử lý.
- Dùng khi: mất 1 message chấp nhận được (metrics, log không quan trọng).

### 7.2 At-least-once: có thể TRÙNG

Retry tới khi nhận ack. Message tới **≥ 1 lần** → có thể **duplicate**.

- Cơ chế: ack-based, redeliver nếu chưa ack; commit offset *sau* khi xử lý.
- Đây là mức **mặc định và phổ biến nhất** trong production (Kafka, JetStream, RabbitMQ ack).
- **Yêu cầu**: consumer phải **idempotent** (xử lý cùng message 2 lần = 1 lần) — xem mục 12.

### 7.3 Exactly-once: khó & đắt

Mỗi message tác động **đúng 1 lần**, không mất, không trùng.

> ⚠ **Hiểu lầm kinh điển**: "tôi bật exactly-once nên không lo duplicate." Thực tế:
>
> - "Exactly-once **delivery**" qua mạng là **bất khả thi** về lý thuyết (two generals problem — không thể vừa không mất vừa không trùng khi network có thể fail bất cứ lúc nào).
> - Cái tồn tại là "exactly-once **processing**", đạt được bằng **at-least-once + dedup/idempotency** hoặc **transaction**.
> - Kafka có "exactly-once semantics" (EOS) qua **transactional producer + idempotent producer**, nhưng chỉ áp dụng trong phạm vi Kafka (read-process-write trong Kafka). Khi side-effect ra ngoài (gọi API, ghi DB khác) → bạn vẫn phải tự lo idempotency.

Kết luận thực dụng: **đừng dựa vào "exactly-once" của broker cho side-effect bên ngoài. Hãy thiết kế consumer idempotent trên nền at-least-once.**

### 7.4 Walk-through crash scenario (xem Module 3 viz)

| Mức | Khi nào commit/ack | Crash giữa chừng → kết quả |
|---|---|---|
| At-most-once | commit **trước** process | process chưa xong đã commit → restart bỏ qua → **MẤT** |
| At-least-once | commit **sau** process | process xong, commit chưa kịp → restart xử lý **LẠI** → **TRÙNG** |
| Exactly-once | transaction / idempotent | dedup loại bản trùng → **đúng 1 lần** |

### 🔁 Dừng lại tự kiểm tra

<details>
<summary>Consumer trừ tiền user rồi mới commit offset. Crash sau khi trừ tiền, trước khi commit. Chuyện gì xảy ra? Cách sửa?</summary>

Đây là **at-least-once**. Restart → đọc lại message → **trừ tiền lần 2** (duplicate effect, user mất tiền oan). Sửa: làm consumer **idempotent** — lưu `transaction_id` đã xử lý, lần 2 thấy đã có thì bỏ qua việc trừ tiền (mục 12).
</details>

### 📝 Tóm tắt mục 7

- At-most-once: có thể mất (commit trước). At-least-once: có thể trùng (commit sau). Exactly-once: khó.
- "Exactly-once delivery" không tồn tại; cái thực dùng = at-least-once + idempotent.
- Kafka EOS chỉ trong phạm vi Kafka; side-effect ngoài vẫn phải tự idempotent.

---

## 8. Partition & ordering

### 8.1 💡 Cùng key → cùng partition → giữ thứ tự

Producer chọn partition theo công thức (mặc định Kafka):

```
partition = hash(key) mod (số partition)
```

Vì cùng key → cùng hash → cùng partition, và **trong 1 partition message được đọc đúng thứ tự ghi** → mọi message cùng key được xử lý **theo thứ tự**.

**Walk-through** với topic `orders`, 3 partition, dùng `orderId` làm key:

| Message | key (orderId) | hash(key) mod 3 | → partition |
|---|---|---|---|
| OrderCreated | "A100" | giả sử = 1 | P1 |
| PaymentDone  | "A100" | = 1 | P1 |
| OrderShipped | "A100" | = 1 | P1 |
| OrderCreated | "B200" | giả sử = 2 | P2 |

→ Cả 3 event của order **A100** vào **cùng P1**, được consumer xử lý đúng thứ tự `Created → Payment → Shipped`. Event của B200 ở P2, độc lập.

### 8.2 ⚠ Cross-partition KHÔNG có thứ tự

Message ở partition khác nhau → **không** đảm bảo thứ tự tương đối.

- Nếu bạn KHÔNG set key (hoặc key khác nhau), event của *cùng một order* có thể rơi vào partition khác nhau → consumer có thể xử lý `Shipped` trước `Created` → **sai logic**.
- Vì vậy: **chọn key sao cho mọi message cần giữ thứ tự với nhau có cùng key.** Với order events → key = `orderId`. (Xem BT2.)

### 8.3 ❓ Câu hỏi tự nhiên

<details>
<summary>Nếu cho hết vào 1 partition để chắc chắn có thứ tự toàn cục thì sao?</summary>

Được, nhưng **mất khả năng song song**: 1 partition = tối đa 1 consumer hữu ích trong group → throughput bị giới hạn bởi 1 consumer. Đánh đổi giữa ordering toàn cục và scale. Thực tế: partition theo entity (orderId, userId) → giữ thứ tự *trong từng entity* mà vẫn song song giữa các entity.
</details>

### 📝 Tóm tắt mục 8

- `partition = hash(key) mod N`. Cùng key → cùng partition → giữ thứ tự.
- Cross-partition không có thứ tự.
- Chọn key = entity cần ordering (orderId, userId).

---

## 9. Consumer offset

### 9.1 Offset là "bookmark"

Offset là vị trí consumer đã đọc tới trong partition. Consumer **commit** offset để broker (hoặc Kafka `__consumer_offsets` topic) ghi nhớ → restart thì đọc tiếp từ đó.

### 9.2 Auto vs manual commit

- **Auto commit**: broker tự commit offset định kỳ (vd mỗi 5 giây). Tiện nhưng **nguy hiểm**: có thể commit offset của message *chưa xử lý xong* → mất message khi crash.
- **Manual commit**: bạn commit *sau khi xử lý xong*. Kiểm soát chính xác guarantee.

### 9.3 Thứ tự commit quyết định guarantee

```
// At-least-once (commit SAU process):
msg = poll()
process(msg)        // nếu crash ở đây → restart xử lý lại msg → TRÙNG (an toàn nếu idempotent)
commit(msg.offset)

// At-most-once (commit TRƯỚC process):
msg = poll()
commit(msg.offset)  // nếu crash ở đây → restart bỏ qua msg → MẤT
process(msg)
```

> ⚠ Mặc định nên **commit sau process** (at-least-once) + consumer idempotent. Đây là pattern an toàn nhất cho hầu hết hệ thống.

### 📝 Tóm tắt mục 9

- Offset = bookmark đã đọc tới đâu.
- Auto commit tiện nhưng dễ mất/trùng ngoài ý muốn; manual commit kiểm soát được.
- Commit sau process = at-least-once; commit trước = at-most-once.

---

## 10. Backpressure & consumer lag

### 10.1 💡 Lag = khoảng cách producer bỏ xa consumer

**Consumer lag** = (offset mới nhất producer ghi) − (offset consumer đã commit). Nó cho biết consumer đang **tụt lại bao nhiêu message**.

- Lag ổn định ở mức thấp → consumer theo kịp.
- Lag **tăng dần** → consumer xử lý chậm hơn producer → backlog phình → cuối cùng có thể vượt retention (mất data) hoặc latency end-to-end tăng vô hạn.

**Walk-through**: producer ghi 100 msg/giây, consumer xử lý 80 msg/giây. Mỗi giây lag tăng 20. Sau 60 giây → lag = 1200 message. Người dùng thấy event "trễ" ~15 giây (1200 / 80) và càng lúc càng trễ.

### 10.2 Backpressure

Khi consumer không theo kịp, cần **backpressure** — tín hiệu làm chậm/điều tiết:

- Tăng số consumer (nếu còn partition trống) hoặc tăng partition + consumer.
- Tối ưu xử lý (batch, async I/O).
- Giảm tốc producer (rate limit) nếu được.

### 10.3 Phải MONITOR lag

> ⚠ Không monitor lag = mù. Lag tăng âm thầm tới khi data quá retention bị xóa → mất vĩnh viễn. Luôn alert khi lag vượt ngưỡng. (Kafka: `kafka-consumer-groups --describe`; tool: Burrow, Prometheus exporter.)

### 📝 Tóm tắt mục 10

- Lag = latest offset − committed offset.
- Lag tăng dần = nguy hiểm (backlog phình, có thể mất data quá retention).
- Fix: scale consumer/partition, tối ưu xử lý. Luôn monitor + alert lag.

---

## 11. Dead Letter Queue (DLQ)

### 11.1 💡 "Hộp thư chết" cho message không xử lý nổi

Một message có thể fail lặp đi lặp lại (data lỗi, bug, dependency chết). Nếu cứ retry mãi → kẹt. **DLQ** là một queue/topic riêng để **đẩy message fail quá số lần cho phép** vào, để:

- Không block các message khác.
- Inspect sau (debug, sửa tay, replay khi đã fix).

```
msg fail → retry (1) → fail → retry (2) → fail → retry (3) → vượt limit → ──► [DLQ]
```

### 11.2 Poison message

> ⚠ **Poison message**: một message luôn fail. Nếu không có DLQ + retry limit, nó kẹt **đầu partition** → vì partition giữ thứ tự, mọi message sau nó **bị block** không xử lý được (head-of-line blocking). DLQ giải cứu: sau N lần, đẩy nó sang DLQ và đi tiếp.

### 📝 Tóm tắt mục 11

- DLQ chứa message fail quá retry limit để inspect/replay sau.
- Không có DLQ + limit → poison message block cả partition.

---

## 12. Idempotent consumer

### 12.1 Vì sao bắt buộc

Vì production gần như luôn là **at-least-once** → duplicate là chuyện *bình thường*, không phải ngoại lệ. Consumer phải xử lý cùng message 2+ lần mà **kết quả không đổi** = **idempotent**.

### 12.2 Cách làm: dedup bằng message ID

Mỗi message có ID duy nhất. Consumer giữ một **dedup store** (set các ID đã xử lý). Trước khi xử lý:

```
nếu id ∈ dedup_store:  bỏ qua (đã xử lý rồi)
ngược lại:             xử lý + thêm id vào dedup_store
```

Walk-through: message `{id: "tx-99", action: "trừ 100k"}` tới lần 1 → chưa có "tx-99" → trừ tiền, ghi "tx-99". Tới lần 2 (duplicate) → thấy "tx-99" đã có → **bỏ qua**, không trừ lần nữa. Kết quả: trừ đúng 1 lần dù nhận 2 lần.

> ⚠ Dedup store phải **bền** (DB / Redis với TTL hợp lý), không chỉ in-memory — vì consumer có thể restart và mất state in-memory → lại trừ tiền 2 lần. TTL nên ≥ cửa sổ redeliver tối đa.

### 12.3 Idempotent tự nhiên

Một số thao tác vốn đã idempotent → không cần dedup store:

- `SET status = 'paid'` (gán giá trị) — chạy 2 lần vẫn = 'paid'. **Idempotent**.
- `balance = balance - 100` (tăng/giảm tương đối) — chạy 2 lần trừ 200. **KHÔNG idempotent**.
- `INSERT ... ON CONFLICT DO NOTHING` với unique key — lần 2 không insert thêm. **Idempotent**.

Mẹo: thiết kế thao tác thành "gán trạng thái cuối" thay vì "cộng/trừ tương đối" khi có thể.

### 🔁 Dừng lại tự kiểm tra

<details>
<summary>"INSERT order vào DB" có idempotent không? Làm sao cho idempotent?</summary>

Mặc định KHÔNG (chạy 2 lần → 2 row). Cho idempotent: dùng `orderId` làm primary/unique key + `INSERT ... ON CONFLICT (orderId) DO NOTHING`, hoặc check tồn tại trước. Lần 2 thấy đã có → không insert thêm.
</details>

### 📝 Tóm tắt mục 12

- At-least-once → duplicate bình thường → consumer PHẢI idempotent.
- Dedup bằng message ID + dedup store BỀN (DB/Redis), không chỉ in-memory.
- Ưu tiên thao tác idempotent tự nhiên (gán trạng thái, ON CONFLICT).

---

## 13. Khi nào Kafka vs NATS vs RabbitMQ

| Tiêu chí | **Kafka** | **NATS** | **RabbitMQ** |
|---|---|---|---|
| Mô hình | Distributed log | Lightweight pub/sub | Traditional broker (AMQP) |
| Mạnh nhất ở | High throughput, event streaming, **replay**, log | **Low latency**, đơn giản, edge/IoT | **Routing phức tạp**, task queue cổ điển |
| Persistence | Có (mặc định, retention) | Core: không / JetStream: có | Có (xóa sau ack, không replay) |
| Ordering | Trong partition | Trong subject (JetStream) | Trong queue |
| Replay lịch sử | ✓ (điểm mạnh) | JetStream ✓ | ✗ (xóa sau ack) |
| Routing | Theo partition/key | Subject + wildcard | Exchange (direct/topic/fanout) |
| Vận hành | Nặng (Zookeeper/KRaft, tuning) | Rất nhẹ (1 binary) | Trung bình |
| Chọn khi | Event sourcing, audit log, stream lớn, cần replay | Cần nhanh & đơn giản, microservice nội bộ, IoT | Cần routing linh hoạt, work queue, hệ legacy AMQP |

Tóm gọn:

- **Kafka**: "tôi cần lưu mọi event, throughput cao, replay được" → event streaming, log.
- **NATS**: "tôi cần nhanh, nhẹ, đơn giản" → pub/sub nội bộ, telemetry.
- **RabbitMQ**: "tôi cần routing rule phức tạp / task queue truyền thống" → job queue.

### 📝 Tóm tắt mục 13

- Kafka = log + replay + throughput. NATS = nhanh + nhẹ. RabbitMQ = routing + task queue.
- Chọn theo nhu cầu, không có "cái tốt nhất" tuyệt đối.

---

## 14. Common pitfalls

⚠ Năm cái bẫy kinh điển:

1. **Assume exactly-once.** Thực tế gần như luôn at-least-once → phải idempotent. Đừng dựa vào "broker lo hết".
2. **Trông chờ ordering cross-partition.** Chỉ có thứ tự *trong* 1 partition. Cần thứ tự → cùng key.
3. **Consumer không idempotent.** Duplicate là bình thường → xử lý 2 lần gây tác hại (trừ tiền 2 lần, gửi 2 email). Phải dedup.
4. **Không monitor lag.** Lag tăng âm thầm → mất data quá retention. Luôn alert.
5. **Poison message không có DLQ.** 1 message lỗi block cả partition (head-of-line). Cần retry limit + DLQ.

### 📝 Tóm tắt mục 14

Năm bẫy: exactly-once ảo, ordering cross-partition, consumer không idempotent, không monitor lag, poison message không DLQ.

---

## 15. Ứng dụng thực tế trong phần mềm

> 💡 **Message queue tách rời (decouple) service, hấp thụ tải đột biến, và cho xử lý bất đồng bộ — nền của kiến trúc event-driven.**

| Nhu cầu | MQ làm gì | Công cụ |
|---------|-----------|---------|
| **Xử lý nền (không bắt user chờ)** | Đẩy job vào queue, worker xử lý sau | RabbitMQ, NATS, SQS |
| **Hấp thụ burst** | Queue đệm khi traffic tăng vọt → worker xử lý theo tốc độ | Kafka, SQS |
| **Tách rời service** | A publish event, B/C/D subscribe — A không biết ai nghe | Kafka, NATS |
| **Event log / replay** | Lưu event để xử lý lại, audit | Kafka (giữ log) |

### 15.1. Ví dụ cụ thể — đăng ký user, gửi mail bất đồng bộ

Đăng ký: nếu gửi email chào mừng **đồng bộ** trong request → user chờ SMTP chậm, và nếu mail lỗi thì cả đăng ký fail. Tách: lưu user → **publish event `UserRegistered`** → trả response ngay (user không chờ). Worker riêng consume event → gửi mail (retry nếu lỗi, không ảnh hưởng đăng ký). Các service khác (analytics, CRM) cũng subscribe cùng event mà không cần sửa code đăng ký. Đây là decoupling + async — pattern lõi của hệ event-driven ([nối event-driven](../lesson-65-event-driven-architecture/)).

> ⚠ **Kafka vs queue truyền thống + bẫy delivery semantics.** (1) **Kafka** = log giữ lại (replay được, nhiều consumer đọc độc lập, throughput cao) hợp event streaming/analytics; **RabbitMQ/NATS/SQS** = queue (message tiêu thụ xong là hết) hợp task/job. Chọn sai = phức tạp thừa. (2) **At-least-once là mặc định** → consumer phải **idempotent** (xử lý trùng OK, [nối distributed](../lesson-62-distributed-fundamentals/)). (3) **Dead letter queue** cho message xử lý hoài không được → tránh kẹt queue. (4) Thứ tự message chỉ đảm bảo trong cùng partition (Kafka).

### 15.2. 📝 Tóm tắt mục 15

- MQ: **decouple** service, **async** (không bắt user chờ), **hấp thụ burst**, event log replay.
- **Kafka** (log, replay, streaming) vs **RabbitMQ/NATS/SQS** (queue, task/job) — chọn theo nhu cầu.
- At-least-once → consumer **idempotent**; dùng **dead letter queue**; thứ tự chỉ trong partition.

## Bài tập

> Lời giải chi tiết ở mục [Lời giải chi tiết](#lời-giải-chi-tiết) bên dưới. Hãy tự làm trước.

**BT1 — Pub/Sub vs Queue.** Với mỗi scenario, chọn **queue (point-to-point)** hay **topic (pub/sub)** và giải thích:
- (a) 1 triệu email cần gửi, có 30 worker.
- (b) Event "user đăng ký" cần: gửi welcome email + tạo profile analytics + thêm vào CRM.
- (c) Xử lý job resize 500000 ảnh upload, chia cho nhiều worker.
- (d) Phát giá cổ phiếu real-time cho mọi client đang xem.

**BT2 — Partition key design.** Topic `order-events` có 6 partition, nhận các event `OrderCreated`, `PaymentReceived`, `OrderShipped` cho nhiều order. Yêu cầu: mọi event của *cùng một order* phải được xử lý **đúng thứ tự**. Chọn partition key và giải thích vì sao đảm bảo ordering. Điều gì xảy ra nếu dùng key ngẫu nhiên?

**BT3 — Idempotent consumer.** Viết (pseudocode hoặc Go) một consumer xử lý message `{id, userId, amount}` để trừ tiền, đảm bảo duplicate không trừ 2 lần. Dùng dedup store. Nêu rõ vì sao dedup store phải bền.

**BT4 — At-least-once + handle duplicate.** Cho vòng lặp consumer dưới đây. (a) Nó là guarantee gì? (b) Chỉ ra điểm crash gây duplicate. (c) Sửa để duplicate vô hại.
```
for {
    msg := poll()
    process(msg)        // ghi DB
    commit(msg.offset)
}
```

**BT5 — DLQ với retry limit.** Thiết kế cơ chế: message fail tối đa 3 lần thì đẩy sang DLQ. Mô tả state cần lưu (retry count theo message), luồng xử lý, và vì sao tránh được poison message block partition.

**BT6 — Diagnose consumer lag.** Một consumer group đọc topic `events` (4 partition). Monitor cho thấy lag tăng đều 500 msg/phút suốt 1 giờ. Producer rate ổn định. (a) Nêu các nguyên nhân khả dĩ. (b) Đề xuất hướng fix theo thứ tự ưu tiên. (c) Nếu group đang có 4 consumer (đủ 1 consumer/partition) thì còn cách scale nào?

---

## Lời giải chi tiết

### Lời giải BT1 — Pub/Sub vs Queue

- **(a) Queue.** Mỗi email gửi **đúng 1 lần**; 30 worker trong cùng consumer group chia nhau công việc → song song. Không cần ai nhận bản sao.
- **(b) Topic (pub/sub).** Một event "user đăng ký" → **3 bên độc lập** đều cần biết (email, analytics, CRM). Mỗi service là một subscriber (Kafka: consumer group riêng) nhận **bản sao đầy đủ**.
- **(c) Queue.** Giống (a): mỗi ảnh resize 1 lần, chia cho nhiều worker. Work distribution.
- **(d) Topic (pub/sub).** Phát **một** message giá → **mọi** client đang xem nhận bản sao. Fan-out broadcast.

Quy tắc rút ra: **"chia việc cho nhiều worker" → queue. "nhiều bên cùng cần biết một sự kiện" → topic.**

### Lời giải BT2 — Partition key design

**Chọn `key = orderId`.**

Vì partition được tính `partition = hash(orderId) mod 6`, mọi event có cùng `orderId` → cùng hash → **cùng partition**. Trong 1 partition, message đọc đúng thứ tự ghi (theo offset tăng dần) → consumer xử lý `OrderCreated → PaymentReceived → OrderShipped` đúng trình tự.

Walk-through cho order "A123" (giả sử `hash("A123") mod 6 = 4`):

| Event | key | partition | offset |
|---|---|---|---|
| OrderCreated   | A123 | P4 | 10 |
| PaymentReceived| A123 | P4 | 11 |
| OrderShipped   | A123 | P4 | 12 |

→ Cùng P4, đọc theo offset 10→11→12 → đúng thứ tự.

**Nếu dùng key ngẫu nhiên** (hoặc không set key → round-robin): 3 event của A123 rải ra 3 partition khác nhau. Các partition được nhiều consumer đọc song song với tốc độ khác nhau → consumer có thể thấy `OrderShipped` (P2) trước `OrderCreated` (P5) → **xử lý sai** (ship một order chưa tồn tại). Cross-partition không có ordering.

Lưu ý đánh đổi: dùng `orderId` làm key vẫn cho phép song song *giữa các order khác nhau* (order khác → có thể partition khác), chỉ ràng buộc thứ tự *trong từng order*. Đây là cân bằng tốt.

### Lời giải BT3 — Idempotent consumer

```go
// dedupStore: bền (DB/Redis), KHÔNG chỉ in-memory.
func handle(msg Message, store DedupStore, bank Bank) error {
    // 1. Đã xử lý message này chưa?
    seen, err := store.Exists(msg.ID)
    if err != nil { return err }
    if seen {
        return nil // duplicate → bỏ qua, không trừ lại
    }
    // 2. Trừ tiền + ghi nhận đã xử lý — lý tưởng là trong CÙNG 1 transaction DB
    //    để tránh "trừ rồi nhưng chưa kịp ghi dedup → crash → trừ lại".
    return store.WithTx(func(tx Tx) error {
        if err := bank.Withdraw(tx, msg.UserID, msg.Amount); err != nil {
            return err
        }
        return store.Mark(tx, msg.ID)
    })
}
```

Giải thích:
- Check `Exists(msg.ID)` trước → duplicate bị chặn.
- **Vì sao dedup store phải bền**: nếu chỉ in-memory, consumer restart → mất danh sách ID đã xử lý → message redeliver sau restart sẽ được xử lý *lại* → trừ tiền 2 lần. Dùng DB/Redis với TTL ≥ cửa sổ redeliver.
- **Vì sao gói trong transaction**: nếu trừ tiền và ghi dedup là 2 bước rời, crash *giữa* hai bước → tiền đã trừ nhưng ID chưa ghi → lần sau lại trừ. Atomic hóa cả hai loại bỏ kẽ hở này.

### Lời giải BT4 — At-least-once + handle duplicate

**(a) Guarantee gì?** **At-least-once** — vì `commit` nằm **sau** `process`. Message chắc chắn được xử lý ≥ 1 lần.

**(b) Điểm crash gây duplicate**: crash **sau `process(msg)` nhưng trước `commit`**. DB đã ghi nhưng offset chưa commit → restart đọc lại message → `process` chạy **lần 2** → duplicate.

**(c) Sửa cho duplicate vô hại** = làm `process` idempotent:
```go
for {
    msg := poll()
    if !store.Seen(msg.ID) {        // dedup
        processInTx(msg, store)     // ghi DB + mark ID trong 1 transaction
    }
    commit(msg.offset)              // commit lần 2 chỉ là no-op vô hại
}
```
Giờ dù `process` chạy 2 lần, lần 2 thấy ID đã seen → bỏ qua side-effect → kết quả đúng 1 lần.

### Lời giải BT5 — DLQ với retry limit

**State cần lưu**: với mỗi message, một **retry count**. Có 2 cách:
- Đính kèm count trong header message (mỗi lần redeliver tăng lên), hoặc
- Lưu ngoài: `map[messageID]int` trong store bền.

**Luồng xử lý**:
```
nhận msg:
  try process(msg)
  nếu OK:        commit/ack; xóa retry count
  nếu FAIL:
     count = inc(msg.ID)
     nếu count <= 3:  requeue/redeliver (sẽ thử lại)
     nếu count > 3:   publish msg sang DLQ topic
                      commit/ack msg ở topic chính (để KHÔNG block nữa)
                      (tuỳ chọn) alert
```

**Vì sao tránh poison message block partition**: nếu không có limit, message luôn-fail kẹt đầu partition; vì partition giữ thứ tự, mọi message sau **không được xử lý** (head-of-line blocking). Có limit + DLQ: sau 3 lần, message độc được **chuyển khỏi luồng chính** (publish DLQ rồi commit offset) → partition tiếp tục với message kế tiếp. Message độc nằm trong DLQ để người vận hành inspect/sửa/replay sau.

### Lời giải BT6 — Diagnose consumer lag

**(a) Nguyên nhân khả dĩ** (lag tăng đều = consumer xử lý chậm hơn producer):
- Consumer xử lý mỗi message tốn quá lâu (vd gọi API/DB chậm, không batch).
- Số consumer < số partition → một số partition không được đọc song song tối đa.
- Dependency phía sau chậm (DB write chậm, downstream service chậm).
- GC pause / rebalance lặp / poison message làm retry liên tục.
- Producer thực ra tăng tải (cần xác nhận: đề bài nói rate ổn định → loại).

**(b) Hướng fix theo ưu tiên**:
1. **Tối ưu xử lý** (rẻ nhất): batch DB write, dùng async I/O, giảm việc nặng per-message, cache. Thường lấy lại được nhiều throughput nhất.
2. **Scale consumer** lên = số partition (nếu chưa đủ): mỗi partition 1 consumer → song song tối đa.
3. **Tăng số partition + consumer**: nếu đã 1 consumer/partition mà vẫn chậm → cần thêm partition (vd 4 → 12) rồi thêm consumer tương ứng. Lưu ý tăng partition đổi key→partition mapping (cân nhắc ordering).
4. Kiểm tra & loại poison message (DLQ) nếu lag do retry vô hạn.

**(c) Nếu đã 4 consumer cho 4 partition** (đã bão hòa song song theo partition): thêm consumer thứ 5 sẽ **idle** (không có partition). Cách scale duy nhất để tăng song song là **tăng số partition** (vd 4 → 8) rồi thêm consumer (lên 8). Song song với đó, **tối ưu code consumer** để mỗi consumer xử lý nhanh hơn (không cần thêm partition). Hai hướng này bổ sung cho nhau.

---

## Code & Minh họa

- [solutions.go](./solutions.go) — in-memory message broker bằng Go thuần: topic/partition, consumer group + rebalance, offset commit (at-least-once vs at-most-once), DLQ với retry limit, idempotent consumer với dedup store. Comment tham chiếu client Kafka/NATS thật. Chạy: `go run solutions.go`.
- [visualization.html](./visualization.html) — 3 module tương tác:
  1. **Pub/Sub vs Queue** — animate cách 1 message được phân phối (chia cho 1 consumer vs broadcast N subscriber).
  2. **Kafka partition** — nhập key → xem rơi vào partition nào (`hash mod N`), thêm/bớt consumer trong group → xem rebalance gán lại partition.
  3. **Delivery guarantees** — chạy kịch bản crash cho at-most-once / at-least-once / exactly-once, thấy rõ mất / trùng / đúng.

---

## Bài tiếp theo

→ [Lesson 65 — Event-Driven Architecture](../lesson-65-event-driven-architecture/): dùng MQ làm nền để xây kiến trúc hướng sự kiện — event vs command, outbox pattern (publish event đáng tin cùng transaction DB), choreography vs orchestration, idempotent consumer (nối tiếp mục 12 bài này).

## Tham khảo

- Kafka: *Kafka: The Definitive Guide* (Narkhede, Shapira, Palino).
- NATS docs: https://docs.nats.io (Core NATS & JetStream).
- RabbitMQ tutorials: https://www.rabbitmq.com/getstarted.html.
- "You Cannot Have Exactly-Once Delivery" — Tyler Treat (về vì sao exactly-once delivery bất khả thi).
