# Lesson 74 — Distributed Tracing & OpenTelemetry

> Tier 7 · Production · Quan sát hệ thống (observability) — trụ cột thứ ba

## Mục tiêu học tập

Sau bài này bạn có thể:

- Giải thích **vì sao log và metric không đủ** để debug một request đi qua nhiều microservice, và tracing lấp khoảng trống đó như thế nào.
- Mô hình hóa một request thành cấu trúc **Trace → Span → SpanContext** với `trace_id`/`span_id`, quan hệ cha-con tạo thành cây.
- Hiểu **OpenTelemetry (OTel)** là gì, vì sao nó thay thế OpenTracing + OpenCensus, và kiến trúc API / SDK / Collector.
- Thực hiện **context propagation** qua ranh giới service bằng W3C `traceparent` header (HTTP) và gRPC metadata.
- Gắn **attributes**, **events**, **status** vào span; phân biệt **head-based** và **tail-based sampling**.
- Phân biệt **auto-instrumentation** (middleware) và **manual instrumentation** (`tracer.Start`).
- Đọc một **waterfall view**: tìm span chậm, span lỗi, và "gap" do network/queue.
- Liên kết **ba trụ** (log, metric, trace) qua `trace_id` và exemplar.
- Tránh các **pitfall** kinh điển: quên propagate context (span mồ côi), sampling 100%, quá nhiều span, cardinality bùng nổ.

## Kiến thức tiền đề

- [Lesson 72 — Structured Logging](../lesson-72-structured-logging/README.md): log có cấu trúc, correlation ID.
- [Lesson 73 — Metrics & Prometheus](../lesson-73-metrics-prometheus/README.md): counter/gauge/histogram, RED method, cardinality.
- [Lesson 29 — Context & Cancellation](../lesson-29-context-cancellation/README.md): `context.Context` là phương tiện mang trace context trong Go.
- [Lesson 42 — HTTP net deep](../lesson-42-http-net-deep/README.md) và [Lesson 71 — Mini-project Microservices](../lesson-71-mini-project-microservices/README.md): bối cảnh nhiều service gọi nhau.

---

## 1. Vì sao cần tracing?

> 💡 **Trực giác / Hình dung.** Hãy tưởng tượng bạn gửi một bưu kiện. **Log** giống như mẩu giấy ghi chú ở mỗi bưu cục ("13:02 đã nhận", "13:40 đã phân loại") — nhưng mỗi bưu cục giữ giấy riêng, không ai ghép lại được hành trình. **Metric** giống như bảng thống kê cuối ngày ("hôm nay xử lý 12.000 bưu kiện, trung bình 2 giờ") — biết tổng thể nhưng không biết *gói của BẠN* đi đường nào. **Trace** là tờ vận đơn dán trên chính gói đó: đi qua bưu cục nào, dừng bao lâu ở mỗi nơi, tắc ở khâu nào. Đó là **end-to-end view của một request cụ thể**.

Trong một hệ thống monolith, debug khá đơn giản: một request vào, chạy hết trong một process, stack trace cho bạn biết mọi thứ. Nhưng khi tách thành microservice:

```
[Client] → API Gateway → Order Service → Payment Service → Bank API
                              ↓
                        Inventory Service → DB
```

Một request `POST /checkout` có thể chạm 5 service, 2 database, 1 message queue. Khi nó **chậm 3 giây**, câu hỏi đặt ra: *chậm ở đâu?*

- **Log** trả lời được "service X làm gì lúc 13:02:05" nhưng mỗi service ghi log riêng. Để ghép lại bạn phải `grep` từng service, đoán mò request nào là request nào — trừ khi có một `trace_id` chung (chính là cái tracing cung cấp).
- **Metric** trả lời "p99 latency của Payment Service là 800ms" — tổng hợp, không phải request cá biệt. Không cho biết request chậm *này* dừng ở đâu.
- **Trace** trả lời chính xác: "request `abc123` mất 3.1s, trong đó 2.8s là chờ Bank API, 0.2s là DB query, phần còn lại là overhead". Đó là cái bạn cần.

> ❓ **Câu hỏi tự nhiên của người đọc.**
> - *"Tracing thay thế log/metric à?"* Không. Đây là **ba trụ bổ sung nhau** (mục 10). Metric phát hiện *có vấn đề* (alert p99 tăng), trace chỉ ra *vấn đề ở đâu* (span nào chậm), log cho biết *chi tiết tại sao* (message lỗi cụ thể).
> - *"Tôi đã có request ID rồi, cần gì tracing?"* Request ID (correlation ID, Lesson 72) cho bạn nối các log lại theo một request — đó là tiền thân của `trace_id`. Tracing thêm vào **cấu trúc cây (span cha-con) + thời gian từng bước**, biến danh sách log phẳng thành một bức tranh có chiều sâu.

> 📝 **Tóm tắt mục 1.**
> - Log = sự kiện rời rạc; Metric = tổng hợp số liệu; Trace = hành trình một request.
> - Trong microservice, không có trace thì gần như không thể trả lời "chậm ở đâu".
> - Ba trụ bổ sung nhau, không thay thế nhau.

---

## 2. Trace, Span, SpanContext

### 2.1 Định nghĩa

> 💡 **Trực giác.** Một **trace** giống như toàn bộ chuyến công tác của bạn. Mỗi **span** là một chặng: "bay từ HN vào SG" (4h), "taxi ra khách sạn" (40 phút), "họp" (2h). Chặng có thể lồng nhau: trong "họp" có "thuyết trình" (30 phút) và "Q&A" (20 phút). Đó là quan hệ cha-con.

- **Trace** — đại diện cho **một request** đi xuyên hệ thống. Một trace gồm nhiều span. Định danh bởi `trace_id` (giống nhau cho mọi span trong cùng trace).
- **Span** — đại diện cho **một operation** đơn lẻ: một HTTP call, một DB query, một lần gọi hàm tốn thời gian. Mỗi span có:
  - `span_id` — định danh riêng của span.
  - `trace_id` — định danh trace chứa nó (chung cho cả trace).
  - `parent_span_id` — span cha (rỗng nếu là **root span**).
  - `start_time`, `end_time` → `duration = end - start`.
  - `name` (vd `GET /orders`), `attributes`, `events`, `status`.
- **SpanContext** — phần "danh tính" tối thiểu của một span cần được **truyền qua ranh giới service**: `trace_id` + `span_id` + `trace_flags` (vd cờ sampled). Đây chính là cái được serialize vào HTTP header (mục 4). Khác với Span (chứa toàn bộ dữ liệu, sống trong process), SpanContext chỉ là "tấm danh thiếp" bất biến truyền đi.

### 2.2 Cây span

Vì span có `parent_span_id`, các span của một trace tạo thành **cây**:

```
trace_id = 7be2...  (cả cây dùng chung)

Span A  "POST /checkout"        span_id=01  parent=∅      [root]   2400ms
├── Span B  "validate order"    span_id=02  parent=01               120ms
├── Span C  "charge payment"    span_id=03  parent=01              1900ms
│   └── Span D  "POST bank-api"  span_id=04  parent=03             1850ms
└── Span E  "reserve stock"     span_id=05  parent=01               300ms
    └── Span F  "UPDATE inventory" span_id=06 parent=05             250ms
```

Root span (A) bao trùm toàn bộ request. Span con nằm trong khoảng thời gian của cha. Nhìn cây này biết ngay: tổng 2400ms thì 1900ms nằm ở "charge payment", mà trong đó 1850ms là chờ "POST bank-api". **Thủ phạm là Bank API.**

### 2.3 trace_id và span_id

- `trace_id`: 16 byte (128-bit), thường hiển thị 32 ký tự hex. Ví dụ `7be2f3a1c4d5e6f70011223344556677`. Sinh ngẫu nhiên ở root span, **giữ nguyên** suốt trace.
- `span_id`: 8 byte (64-bit), 16 ký tự hex. Ví dụ `00f067aa0ba902b7`. Sinh mới cho **mỗi** span.

> ❓ **Câu hỏi tự nhiên.** *"Vì sao trace_id dài gấp đôi span_id?"* Vì `trace_id` phải duy nhất toàn cục, qua mọi service, mọi thời điểm — không gian 128-bit đủ để không đụng độ. `span_id` chỉ cần duy nhất *trong một trace* nên 64-bit là dư.

> ⚠ **Lỗi thường gặp.** Nhầm `span_id` của span con với `parent_span_id`. `parent_span_id` của span con = `span_id` của span cha, KHÔNG phải `span_id` của chính nó. Sai chỗ này → cây dựng sai, waterfall hiển thị lệch.

> 🔁 **Dừng lại tự kiểm tra.** Trong cây ở 2.2, span F có `parent_span_id` bằng bao nhiêu? Và `trace_id` của nó?
> <details><summary>Đáp án</summary>
>
> `parent_span_id = 05` (span E "reserve stock" là cha của F). `trace_id = 7be2...` — giống hệt mọi span khác trong trace này. F là con của E, không phải con của root A.
> </details>

> 📝 **Tóm tắt mục 2.**
> - Trace = 1 request; Span = 1 operation; SpanContext = danh thiếp truyền qua service.
> - `trace_id` chung cả trace (128-bit), `span_id` riêng mỗi span (64-bit), `parent_span_id` nối lên cha.
> - Span tạo thành cây → waterfall.

---

## 3. OpenTelemetry (OTel)

> 💡 **Trực giác.** Trước OTel, mỗi vendor tracing (Jaeger, Zipkin, Datadog, New Relic...) có SDK riêng. Đổi vendor = viết lại instrumentation toàn bộ code. OTel giống như **chuẩn cổng USB-C cho tracing**: bạn instrument code MỘT LẦN theo API chuẩn, rồi cắm vào backend nào cũng được chỉ bằng đổi exporter.

**OpenTelemetry** là chuẩn **vendor-neutral** (trung lập nhà cung cấp) cho telemetry: traces, metrics, logs. Là dự án CNCF, hình thành từ việc **hợp nhất hai chuẩn cũ**:

- **OpenTracing** — chuẩn API tracing (chỉ định nghĩa API, không có cài đặt).
- **OpenCensus** — của Google, có cả API lẫn SDK + exporter.

Hai dự án này cạnh tranh nhau giai đoạn 2017–2019, gây phân mảnh. Năm 2019 chúng **gộp lại thành OpenTelemetry**, kế thừa ưu điểm cả hai. Hôm nay OTel là chuẩn de-facto.

Kiến trúc OTel gồm:

| Thành phần | Vai trò |
|------------|---------|
| **API** | Interface để code gọi (`tracer.Start`, `span.End`). Không phụ thuộc cài đặt — thư viện instrument theo API này. |
| **SDK** | Cài đặt thật của API: quản lý span, sampling, batching, đẩy ra exporter. |
| **Exporter** | Chuyển span sang định dạng backend (OTLP, Jaeger, Zipkin...). |
| **Collector** | Process trung gian (tùy chọn): nhận telemetry, xử lý (batch, filter, tail-sampling), rồi forward tới backend. Tách instrumentation khỏi backend. |

> ❓ **Câu hỏi tự nhiên.** *"Vì sao tách API và SDK?"* Để thư viện bên thứ ba (vd một database driver) có thể tạo span chỉ dựa trên **API** mà không ép app dùng SDK cụ thể. App quyết định SDK + cấu hình. Nếu app không cài SDK, các lời gọi API trở thành no-op (không tốn gì).

> 📝 **Tóm tắt mục 3.**
> - OTel = chuẩn trung lập vendor cho trace/metric/log, hợp nhất OpenTracing + OpenCensus (2019).
> - API (interface) tách khỏi SDK (cài đặt) → instrument một lần, đổi backend dễ dàng.
> - Collector là tầng trung gian tùy chọn để xử lý telemetry tập trung.

---

## 4. Context propagation

> 💡 **Trực giác.** Khi service A gọi service B qua HTTP, B là process riêng — nó **không biết** mình đang phục vụ trace nào trừ khi A *nói cho nó biết*. Propagation = A ghim "tấm danh thiếp" (SpanContext) vào request gửi sang B, B đọc danh thiếp ra để span của nó nối đúng vào cây. Quên ghim danh thiếp → B tạo trace MỚI → trace bị đứt (mục 13).

### 4.1 W3C Trace Context — header `traceparent`

Chuẩn W3C định nghĩa một HTTP header tên `traceparent`, định dạng cố định 4 phần ngăn bởi dấu `-`:

```
traceparent: 00-7be2f3a1c4d5e6f70011223344556677-00f067aa0ba902b7-01
             │  │                                │                │
          version   trace_id (32 hex)        parent_id (16 hex)  flags
```

- `version` = `00` (hiện tại).
- `trace_id` = 32 ký tự hex (16 byte).
- `parent_id` = `span_id` của span đang gửi request (sẽ thành `parent_span_id` của span phía B).
- `flags` = 2 hex; bit thấp nhất là **sampled flag** (`01` = trace này được lấy mẫu, hãy ghi lại; `00` = không).

Có thêm header `tracestate` (tùy chọn) mang dữ liệu vendor-specific. Ta tập trung vào `traceparent`.

**Walk-through.** Service A đang ở trong span `span_id=00f067aa0ba902b7`, trace `7be2...`, sampled:

1. Trước khi gọi B, A **inject**: ghi header `traceparent: 00-7be2f3a1c4d5e6f70011223344556677-00f067aa0ba902b7-01`.
2. B nhận request, **extract** header → dựng SpanContext: `trace_id=7be2...`, `parent_span_id=00f067aa0ba902b7`, sampled=true.
3. B tạo span mới `span_id=b7ad6b7169203331`, đặt `parent_span_id = 00f067aa0ba902b7`, **giữ nguyên** `trace_id=7be2...`.
4. Cây nối liền: span của B là con của span A → waterfall thấy cả hai service trong cùng một trace.

> ⚠ **Lỗi thường gặp.** Inject `span_id` của *root* thay vì `span_id` của span *hiện tại* khi gọi đi. Kết quả: cây phẳng (mọi service đều là con trực tiếp của root), mất thông tin lồng nhau. Phải inject span đang active tại điểm gọi.

### 4.2 gRPC metadata

gRPC không dùng HTTP header thuần mà dùng **metadata** (key-value đính kèm RPC). OTel propagator ghi cùng thông tin (`traceparent`) vào metadata. Cơ chế giống hệt: inject ở client interceptor, extract ở server interceptor.

> ❓ **Câu hỏi tự nhiên.**
> - *"Còn message queue (Kafka, RabbitMQ) thì sao?"* Cũng propagate được: nhúng `traceparent` vào **message header**. Producer inject, consumer extract. Nhờ vậy trace nối được cả qua async boundary.
> - *"Ai gọi inject/extract — tôi phải tự làm?"* Thường KHÔNG. Middleware/interceptor tự động (mục 8) làm việc đó. Bạn chỉ cần đảm bảo **truyền `context.Context`** xuyên suốt (mục 11).

> 🔁 **Dừng lại tự kiểm tra.** Service A gửi `traceparent: 00-aaaa...aaaa-1111111111111111-01` sang B. B tạo span mới `span_id=2222...`. Span của B có `parent_span_id` và `trace_id` bằng bao nhiêu?
> <details><summary>Đáp án</summary>
>
> `parent_span_id = 1111111111111111` (lấy từ phần parent_id của header), `trace_id = aaaa...aaaa` (giữ nguyên từ header). `span_id` mới `2222...` chỉ là của riêng span B.
> </details>

> 📝 **Tóm tắt mục 4.**
> - Propagation = inject SpanContext vào request gửi đi, extract ở phía nhận.
> - HTTP dùng header `traceparent` (W3C): `version-trace_id-parent_id-flags`.
> - gRPC dùng metadata, MQ dùng message header — cùng nguyên lý.
> - Trong Go, propagation đi kèm việc truyền `context.Context`.

---

## 5. Span attributes & events

### 5.1 Attributes

**Attribute** = cặp key-value mô tả span, gắn vào lúc nào cũng được trước khi span kết thúc. Dùng để filter/search và để hiểu ngữ cảnh.

```
span "GET /orders/{id}":
  http.method   = "GET"
  http.route    = "/orders/{id}"
  http.status_code = 200
  db.system     = "postgresql"
  order.id      = "ord_9931"          # business attribute
```

OTel có **semantic conventions** — bộ tên attribute chuẩn (`http.method`, `db.system`, `net.peer.name`...) để mọi backend hiểu thống nhất. Dùng chuẩn này thay vì tự đặt tên lung tung.

> ⚠ **Lỗi thường gặp — cardinality.** Đừng nhét giá trị **high-cardinality vô hạn** vào attribute mà bạn định dùng để gom nhóm/đánh index như metric label. `order.id = "ord_9931"` trong **span attribute** thì OK (span lưu cá biệt, không gom nhóm). Nhưng đẩy `order.id` thành **metric label** thì nổ cardinality (Lesson 73). Phân biệt: span attribute cá biệt hóa request (tốt), metric label phải bị chặn cardinality.

### 5.2 Events

**Event** = một mốc thời gian có tên *bên trong* một span (timestamped). Khác attribute (mô tả tĩnh), event ghi "một việc xảy ra lúc T".

```
span "process payment" (start=0ms, end=1900ms):
  event @  50ms  "validation.passed"
  event @ 120ms  "fraud.check.start"
  event @ 480ms  "fraud.check.done"   { score: 0.02 }
  event @1850ms  "bank.response"       { status: "approved" }
```

Event hữu ích để đánh dấu các pha bên trong một span dài mà không cần tách thành span con. Một **exception/lỗi** thường được ghi như một event đặc biệt (`exception` với stacktrace).

> 📝 **Tóm tắt mục 5.**
> - Attribute = key-value mô tả span; dùng semantic conventions chuẩn.
> - Event = mốc thời gian có tên trong span; lỗi ghi dạng event `exception`.
> - High-cardinality OK trong span attribute, KHÔNG OK trong metric label.

---

## 6. Span status

Mỗi span kết thúc với một **status**:

- **Unset** (mặc định) — không khẳng định gì; backend coi như thành công.
- **Ok** — chủ động đánh dấu thành công (ít dùng, vì Unset đã đủ).
- **Error** — operation thất bại. Thường kèm event `exception` mô tả lỗi.

```
span "POST /bank-api":
  status = Error
  event "exception" { type: "TimeoutError", message: "deadline exceeded after 2s" }
```

> ⚠ **Lỗi thường gặp.** HTTP status `4xx` không tự động = span Error. `404 Not Found` có thể là hành vi bình thường (client hỏi resource không tồn tại). Quy ước OTel: `5xx` (lỗi server) → span Error; `4xx` thường để Unset (không phải lỗi của *server*). Đừng đánh dấu Error tràn lan, kẻo dashboard "error rate" sai.

> 🔁 **Dừng lại tự kiểm tra.** Một handler trả `503 Service Unavailable` vì DB sập. Span status nên là gì?
> <details><summary>Đáp án</summary>
>
> **Error** — `503` là `5xx`, lỗi phía server, request không hoàn thành được. Kèm event `exception` ghi "database connection refused".
> </details>

> 📝 **Tóm tắt mục 6.** Status: Unset (mặc định, = OK) / Ok (chủ động) / Error. `5xx` → Error, `4xx` thường Unset.

---

## 7. Sampling

> 💡 **Trực giác.** Một service xử lý 50.000 request/giây. Lưu trace cho TẤT CẢ = lưu trữ và băng thông khổng lồ, lại chậm. **Sampling** = chỉ giữ lại một phần đại diện. Giống thăm dò dư luận: không hỏi cả nước, chỉ hỏi 1.000 người được chọn khéo.

### 7.1 Head-based sampling

Quyết định **lấy mẫu hay không NGAY tại lúc bắt đầu trace** (ở root span), trước khi biết kết quả. Quyết định này được ghi vào `traceparent` flags và propagate xuống — mọi service trong trace cùng giữ hoặc cùng bỏ (nhất quán).

- Ví dụ `TraceIDRatioBased(0.01)` = giữ 1% trace.
- **Ưu**: rẻ, quyết định một lần, không cần buffer.
- **Nhược**: quyết định *mù* — có thể bỏ đúng cái trace bị lỗi/chậm mà bạn cần.

### 7.2 Tail-based sampling

Quyết định **sau khi trace hoàn thành**, dựa trên toàn bộ dữ liệu. Thường chạy ở **Collector**: buffer tất cả span của một trace, đợi trace xong, rồi áp luật.

- Ví dụ luật: "giữ 100% trace có lỗi", "giữ 100% trace > 1s", "giữ 1% trace bình thường".
- **Ưu**: giữ đúng cái đáng giá (lỗi, slow) — thông minh hơn nhiều.
- **Nhược**: tốn — phải buffer mọi span đến khi trace xong; cần Collector có state; phức tạp khi span của một trace tới từ nhiều instance.

> ❓ **Câu hỏi tự nhiên.** *"Vậy chọn cái nào?"* Thực tế thường **kết hợp**: head-based ở SDK giữ một tỉ lệ baseline (vd parent-based để nhất quán), rồi tail-based ở Collector ưu tiên giữ lỗi/slow. Service traffic thấp có thể 100% head-based. Service traffic rất cao gần như bắt buộc tail-based để không bỏ sót lỗi hiếm.

> ⚠ **Lỗi thường gặp.** Dùng head-based 1% rồi than "không thấy trace của lỗi hiếm". Đương nhiên — lỗi xảy ra 0.1% request, head-based 1% mù thì xác suất bắt được lỗi cực thấp. Lỗi hiếm cần **tail-based** mới chắc giữ được.

> 🔁 **Dừng lại tự kiểm tra.** Service 30k req/s, lỗi 0.05% (15 req/s lỗi). Bạn muốn thấy MỌI trace lỗi nhưng chỉ đủ ngân sách lưu ~1% tổng. Dùng sampling gì?
> <details><summary>Đáp án</summary>
>
> **Tail-based**: luật "giữ 100% trace Error + 1% trace OK". Head-based 1% sẽ bỏ ~99% trong số 15 lỗi/s → mất gần hết. Tail-based đợi trace xong, thấy Error thì giữ chắc chắn.
> </details>

> 📝 **Tóm tắt mục 7.**
> - Head-based: quyết định lúc start, rẻ, mù → dễ bỏ sót lỗi hiếm.
> - Tail-based: quyết định sau khi xong, giữ lỗi/slow, tốn buffer (ở Collector).
> - Thực tế kết hợp cả hai.

---

## 8. Instrumentation

**Instrumentation** = chèn code tạo span vào ứng dụng. Hai kiểu:

### 8.1 Auto-instrumentation

Dùng **middleware/interceptor** có sẵn để tự tạo span cho mỗi request/RPC/query mà bạn không viết tay.

```go
// Bọc handler bằng otelhttp → mỗi request HTTP tự có một span,
// tự inject/extract traceparent.
handler := otelhttp.NewHandler(mux, "api-server")
```

Tự động lo: tạo span theo route, set attribute HTTP chuẩn, propagate context. Bao phủ "lớp vỏ" (HTTP, gRPC, DB driver) gần như miễn phí.

### 8.2 Manual instrumentation

Tạo span thủ công cho logic nghiệp vụ mà middleware không biết:

```go
ctx, span := tracer.Start(ctx, "calculate-shipping-cost")
defer span.End()
span.SetAttributes(attribute.String("region", region))
// ... logic ...
```

> ❓ **Câu hỏi tự nhiên.** *"Dùng cái nào?"* Cả hai. Auto cho lớp vỏ (vào/ra service, DB call) — bật là có ngay bức tranh tổng. Manual cho các đoạn nghiệp vụ quan trọng bạn nghi ngờ là bottleneck. Đừng manual mọi hàm — sẽ thành noise (mục 13).

> 📝 **Tóm tắt mục 8.** Auto (middleware `otelhttp`) lo lớp vỏ; Manual (`tracer.Start`) lo nghiệp vụ trọng yếu. Kết hợp, đừng lạm dụng manual.

---

## 9. OTel pipeline

Đường đi của một span từ code đến màn hình:

```
[App code]
   │  tracer.Start / span.End  (API)
   ▼
[SDK: SpanProcessor]  ── BatchSpanProcessor gom span thành lô
   │
   ▼
[Exporter]  ── đổi sang OTLP / Jaeger / Zipkin format
   │   (OTLP = OpenTelemetry Protocol, chuẩn truyền của OTel)
   ▼
[Collector] (tùy chọn)  ── nhận, xử lý (batch, filter, tail-sampling), route
   │
   ▼
[Backend / UI]  ── Jaeger · Grafana Tempo · Zipkin · Datadog · ...
```

- **SpanProcessor** trong SDK quyết định khi nào đẩy span ra exporter. `BatchSpanProcessor` (production) gom lô để giảm I/O; `SimpleSpanProcessor` đẩy ngay (chỉ để debug).
- **Exporter** serialize span. OTLP là format gốc của OTel, được mọi backend hiện đại nhận.
- **Collector** là một binary độc lập, rất hữu ích: app chỉ cần export tới Collector (một địa chỉ cố định), Collector lo việc forward đi đâu — đổi backend không cần đụng app. Đây cũng là nơi chạy **tail-based sampling**.
- **Backend**: nơi lưu + UI để xem waterfall. Jaeger và Grafana Tempo là lựa chọn open-source phổ biến.

> 📝 **Tóm tắt mục 9.** App → SDK (BatchSpanProcessor) → Exporter (OTLP) → Collector (xử lý/route) → Backend (Jaeger/Tempo/Zipkin/Datadog).

---

## 10. Ba trụ liên kết — correlation

> 💡 **Trực giác.** Ba trụ rời rạc thì giá trị giảm một nửa. Liên kết chúng bằng `trace_id` thì 1 + 1 + 1 > 3: từ một alert metric, click vào exemplar → nhảy thẳng tới trace chậm → từ span lỗi, click → ra ngay các dòng log của chính span đó.

Cách liên kết:

- **trace_id trong log**: mỗi dòng log structured nhúng `trace_id` (và `span_id`) hiện hành. Khi điều tra một trace, lọc log theo `trace_id` → thấy mọi chi tiết. (Nối Lesson 72 — correlation ID giờ chính là `trace_id`.)
- **Exemplar trong metric**: một histogram bucket có thể đính kèm vài "exemplar" — mỗi exemplar là một `trace_id` đại diện cho một quan sát rơi vào bucket đó. Trên Grafana, click vào điểm spike của histogram → nhảy tới trace cụ thể gây ra nó. (Nối Lesson 73.)

```
Metric:  http_request_duration_seconds, bucket le=2.0 có exemplar {trace_id: 7be2...}
   └─click─► Trace 7be2... waterfall ──► span "POST bank-api" Error
        └─lọc log theo trace_id=7be2─► log "bank timeout after 2s"
```

> 📝 **Tóm tắt mục 10.** Nhúng `trace_id` vào log + exemplar vào metric → đi lại tự do giữa ba trụ. Đây là "observability" thực sự, không chỉ ba công cụ rời.

---

## 11. OTel trong Go

Package gốc: `go.opentelemetry.io/otel`. Các khái niệm chính:

- **TracerProvider** — factory tạo Tracer; nơi cấu hình SDK (processor, exporter, sampler, resource). Khởi tạo một lần lúc start app, `Shutdown` lúc tắt.
- **Tracer** — lấy từ provider (`otel.Tracer("my-service")`), dùng để tạo span.
- **Span** — đối tượng span; `span.End()`, `span.SetAttributes(...)`, `span.AddEvent(...)`, `span.RecordError(err)`, `span.SetStatus(...)`.

Khung tối giản (lược, tham khảo):

```go
import (
    "go.opentelemetry.io/otel"
    "go.opentelemetry.io/otel/attribute"
    sdktrace "go.opentelemetry.io/otel/sdk/trace"
    "go.opentelemetry.io/contrib/instrumentation/net/http/otelhttp"
)

func initTracer() func() {
    exp, _ := otlptracehttp.New(context.Background()) // exporter OTLP
    tp := sdktrace.NewTracerProvider(
        sdktrace.WithBatcher(exp),                       // BatchSpanProcessor
        sdktrace.WithSampler(sdktrace.TraceIDRatioBased(0.1)), // head-based 10%
    )
    otel.SetTracerProvider(tp)
    return func() { _ = tp.Shutdown(context.Background()) }
}

func handleCheckout(w http.ResponseWriter, r *http.Request) {
    ctx := r.Context() // ctx đã chứa span của otelhttp (auto)
    tr := otel.Tracer("checkout")
    ctx, span := tr.Start(ctx, "validate-order") // manual span con
    defer span.End()
    span.SetAttributes(attribute.String("order.id", "ord_9931"))
    if err := validate(ctx); err != nil {
        span.RecordError(err)
        span.SetStatus(codes.Error, "validation failed")
    }
}

// Auto-instrument toàn bộ HTTP server:
//   handler := otelhttp.NewHandler(mux, "api-server")
```

> ⚠ **Lỗi thường gặp — chìa khóa của cả bài.** Tạo span con bằng `tr.Start(ctx, ...)` nhưng rồi gọi hàm sâu hơn **không truyền `ctx` mới** xuống. Span con sâu hơn sẽ nối nhầm vào root (hoặc thành mồ côi). **Quy tắc sống còn: luôn truyền `ctx` trả về từ `Start` xuống mọi lời gọi con.** Đây cũng là cơ chế propagation nội-process: `context.Context` mang span hiện hành.

> 📝 **Tóm tắt mục 11.** TracerProvider (config SDK) → Tracer (`otel.Tracer`) → Span. `otelhttp.NewHandler` auto-instrument. Luôn truyền `ctx` mới từ `Start` xuống dưới.

---

## 12. Đọc trace — waterfall view

Backend hiển thị trace dạng **waterfall** (thác nước): trục ngang là thời gian, mỗi span là một thanh, span con thụt vào dưới cha.

```
0ms                                                          2400ms
│
██████████████████████████████████████████████████████████████  POST /checkout (2400ms)
  ███                                                            validate order (120ms)
     ██████████████████████████████████████████████████         charge payment (1900ms)
        ████████████████████████████████████████████████        └ POST bank-api (1850ms) ⚠
                                                  ████████        reserve stock (300ms)
                                                   ██████         └ UPDATE inventory (250ms)
```

Cách đọc:

1. **Span dài nhất là nghi phạm.** "charge payment" (1900ms) chiếm 79% tổng → nhìn vào trong nó.
2. **Đi sâu xuống con.** Trong charge payment, "POST bank-api" 1850ms → gần như toàn bộ thời gian. Bank API là bottleneck thật.
3. **Tìm span Error** (thường tô đỏ) → biết chỗ fail.
4. **Tìm gap** — khoảng trống giữa các span con. Nếu cha mất 1000ms nhưng tổng các con chỉ 400ms, 600ms "biến mất" ấy là **gap**: thường do network latency, chờ trong queue, hoặc một đoạn chưa được instrument (manual span thiếu).

> ❓ **Câu hỏi tự nhiên.** *"Hai span con chạy song song hay tuần tự, nhìn waterfall sao biết?"* Nhìn trục thời gian: nếu hai thanh **chồng lấp** theo trục ngang → chạy song song (concurrent). Nếu thanh sau bắt đầu *sau khi* thanh trước kết thúc → tuần tự. Trong ví dụ trên, "reserve stock" bắt đầu sau khi "charge payment" gần xong → tuần tự (có thể tối ưu thành song song!).

> 📝 **Tóm tắt mục 12.** Waterfall: span dài = nghi phạm, đi sâu xuống con, tìm span đỏ (Error) và gap (network/queue/thiếu instrument). Chồng lấp = song song.

---

## 13. Common pitfall

| Pitfall | Triệu chứng | Khắc phục |
|---------|-------------|-----------|
| **Quên propagate context** | Span mồ côi, trace đứt thành nhiều trace nhỏ | Truyền `ctx` xuyên suốt; dùng middleware inject/extract `traceparent` |
| **Sampling 100%** | Hóa đơn lưu trữ + overhead tăng vọt; SDK tốn CPU | Head-based baseline + tail-based giữ lỗi/slow |
| **Quá nhiều span (noise)** | Waterfall hàng trăm span vụn, khó đọc | Chỉ manual-span cho nghiệp vụ trọng yếu; không span mỗi hàm |
| **Không link trace_id vào log** | Có trace nhưng không nối được sang log chi tiết | Nhúng `trace_id`/`span_id` vào mọi dòng log (mục 10) |
| **Cardinality từ attribute** | Nhầm span attribute với metric label → nổ series | Giữ high-cardinality trong span attribute, KHÔNG đẩy thành metric label |

> 💡 **Trực giác về span mồ côi.** Một span "mồ côi" là span có `parent_span_id` trỏ tới một span mà backend chưa từng thấy (vì context không được truyền sang, hoặc thành một `trace_id` khác). Backend không biết treo nó vào đâu → trace vỡ thành mảnh, waterfall mất một nửa hành trình.

> ⚠ **Lỗi thường gặp tổng hợp.** 90% sự cố "trace bị đứt" trong thực tế đều quy về **một nguyên nhân: context không được propagate** — hoặc quên truyền `ctx` trong Go, hoặc client không inject `traceparent`, hoặc server không extract. Khi thấy span mồ côi: kiểm tra lượt inject (client) và extract (server) trước tiên.

> 📝 **Tóm tắt mục 13.** Năm pitfall: quên propagate (mồ côi) · sampling 100% · quá nhiều span · không link trace_id vào log · cardinality. Đa số sự cố trace đứt = lỗi propagation.

---

## 14. Ứng dụng thực tế trong phần mềm

> 💡 **Distributed tracing trả lời câu hỏi không log/metric nào trả được: "request CHẬM ở ĐÂU trong chuỗi 10 service?". Đây là mảnh thứ ba của observability.**

| Trụ cột observability | Trả lời |
|-----------------------|---------|
| **Logs** | Chuyện gì đã xảy ra (chi tiết một sự kiện) |
| **Metrics** | Tổng quan sức khỏe (tỉ lệ/xu hướng) |
| **Traces** | Request đi qua đâu, chậm ở đâu (waterfall xuyên service) |

### 14.1. Ví dụ cụ thể — tìm bottleneck trong chuỗi service

User báo "trang load 5 giây". Request đi gateway → auth → product → inventory → pricing. Metric nói "p99 cao" nhưng **không nói service nào**. Log rải rác khắp nơi. **Trace**: một request có một `trace_id`, mỗi service tạo một **span** (có thời gian bắt đầu/kết thúc) → ghép thành **waterfall**: thấy auth 50ms, product 100ms, **pricing 4.8s** ← thủ phạm. OpenTelemetry chuẩn hóa việc này: instrument code → export sang Jaeger/Tempo/Datadog → xem waterfall. Không có trace, debug "chậm ở đâu" trong microservice gần như mò kim đáy bể.

> 💡 **Context propagation là chìa khóa — và sampling để không vỡ chi phí.** (1) Trace ID + span context phải truyền qua mọi ranh giới service (HTTP header, message metadata) — Go dùng `context.Context` mang span ([nối context](../lesson-29-context-cancellation/)); đứt chuỗi propagation = trace gãy. (2) Trace **mọi** request ở traffic cao = tốn khủng khiếp → **sampling** (vd 1% request, hoặc tail-sampling giữ lại request lỗi/chậm). (3) OpenTelemetry = chuẩn vendor-neutral → đổi backend (Jaeger→Datadog) không sửa code instrument.

### 14.2. 📝 Tóm tắt mục 14

- Ba trụ cột: **logs** (chi tiết), **metrics** (xu hướng/sức khỏe), **traces** (request chậm ở đâu xuyên service).
- Trace = trace_id + spans → **waterfall** chỉ ra service nào là bottleneck; OpenTelemetry chuẩn hóa.
- **Context propagation** (qua header/ctx) bắt buộc; **sampling** để không vỡ chi phí ở traffic cao.

## Bài tập

> Làm thử trước khi xem lời giải. Tất cả lời giải nằm ở mục "Lời giải chi tiết" ngay dưới, và minh họa code chạy được ở [solutions.go](./solutions.go).

1. **BT1 — Trace 3 span lồng nhau.** Cho request `GET /order/42` chạy qua: `handler` (root) → `service.GetOrder` → `db.Query`. Mốc thời gian (ms từ lúc bắt đầu): handler start=0/end=180; service start=10/end=170; db start=30/end=150. Hãy: (a) gán `trace_id`/`span_id`/`parent_span_id` hợp lý cho 3 span; (b) tính `duration` mỗi span; (c) tính "self time" (thời gian span tự làm, trừ phần con) của handler và service.

2. **BT2 — Context propagation HTTP.** Service A đang ở span `trace_id=4bf92f...`, `span_id=00f067aa0ba902b7`, sampled. A gọi `GET /pay` sang B. (a) Viết giá trị header `traceparent` A gửi đi. (b) B tạo span `span_id=b9c7c989f97918e1`. Cho biết `trace_id` và `parent_span_id` của span B. (c) Nếu A KHÔNG inject header thì điều gì xảy ra?

3. **BT3 — Đọc waterfall.** Cho waterfall (tổng 1000ms):
   ```
   root           (1000ms)
     auth          (50ms,  start 0)
     fetch-user    (40ms,  start 50)
     render        (60ms,  start 900)
   ```
   (a) Tổng thời gian các span con là bao nhiêu? (b) Có "gap" nào không, kích thước? (c) Bottleneck/khả nghi nhất là gì?

4. **BT4 — Sampling head vs tail.** Service thanh toán: 20.000 req/s, tỉ lệ lỗi 0.1% (20 lỗi/s), p99 latency 300ms nhưng 0.5% request > 2s. Yêu cầu: thấy gần như MỌI trace lỗi và MỌI trace chậm, đồng thời chỉ lưu ~2% tổng request. (a) Head-based 2% có đạt không? (b) Thiết kế luật tail-based. (c) Nêu chi phí của phương án tail.

5. **BT5 — Link trace_id vào log.** Viết (giả mã hoặc Go) một logger ghi mỗi dòng kèm `trace_id`/`span_id` lấy từ `context.Context`. Khi không có span trong ctx thì xử lý ra sao?

6. **BT6 — Diagnose span mồ côi.** Một trace `GET /checkout` đáng ra có 5 span qua 3 service, nhưng UI hiển thị: trace #1 có 2 span (gateway, order), trace #2 (trace_id khác) có 3 span (payment, bank, inventory). (a) Chẩn đoán nguyên nhân. (b) Chỉ ra chính xác chỗ hỏng. (c) Cách fix.

---

## Lời giải chi tiết

### BT1 — Trace 3 span lồng nhau

(a) Một `trace_id` chung cho cả 3, mỗi span `span_id` riêng, nối cha-con theo lời gọi:

| Span | name | span_id | parent_span_id | start | end |
|------|------|---------|----------------|-------|-----|
| 1 | `GET /order/42` (handler, root) | `01` | ∅ | 0 | 180 |
| 2 | `service.GetOrder` | `02` | `01` | 10 | 170 |
| 3 | `db.Query` | `03` | `02` | 30 | 150 |

`trace_id` = một giá trị duy nhất, vd `a1b2c3...`, dùng chung cả ba.

(b) `duration = end - start`:
- handler: `180 - 0 = 180ms`
- service: `170 - 10 = 160ms`
- db: `150 - 30 = 120ms`

(c) **Self time** = duration của span trừ tổng duration các con *trực tiếp*:
- handler có 1 con trực tiếp (service, 160ms): self = `180 - 160 = 20ms` (handler tự làm 10ms đầu + 10ms cuối, đúng = 20ms).
- service có 1 con trực tiếp (db, 120ms): self = `160 - 120 = 40ms` (service tự làm 20ms đầu [10→30] + 20ms cuối [150→170] = 40ms ✓).
- db không có con: self = `120ms`.

Kiểm tra: tổng self = `20 + 40 + 120 = 180ms` = duration của root ✓ (mọi thời gian được quy về đúng một span). Mã sinh và in ra cây này có ở `solutions.go` (hàm `exampleBT1`).

### BT2 — Context propagation HTTP

(a) `traceparent` định dạng `version-trace_id-parent_id-flags`. Giả sử `trace_id=4bf92f3577b34da6a3ce929d0e0e4736` (32 hex):
```
traceparent: 00-4bf92f3577b34da6a3ce929d0e0e4736-00f067aa0ba902b7-01
```
(`parent_id` = span_id hiện tại của A; `flags=01` vì sampled.)

(b) B extract header:
- `trace_id = 4bf92f3577b34da6a3ce929d0e0e4736` — **giữ nguyên** từ A.
- `parent_span_id = 00f067aa0ba902b7` — lấy từ phần parent_id của header (chính là span_id của A).
- `span_id = b9c7c989f97918e1` — của riêng B.
Span B nối làm con của span A trong cùng trace.

(c) Nếu A không inject: B không thấy `traceparent` → B coi như request gốc → tạo **trace_id MỚI**, span B thành root của một trace khác. Hệ quả: **trace đứt** — hành trình ở B không nối vào A. Đây chính là kịch bản span mồ côi (BT6).

### BT3 — Đọc waterfall

(a) Tổng con = `50 + 40 + 60 = 150ms`.

(b) Có gap lớn. Sắp xếp theo thời gian: auth [0–50], fetch-user [50–90], rồi **không có gì từ 90 đến 900** (810ms trống), render [900–960]. Sau render [960–1000] còn 40ms trống nữa. Gap chính = **810ms** giữa `fetch-user` kết thúc (90ms) và `render` bắt đầu (900ms).

(c) **Bottleneck là cái KHÔNG hiện trên trace** — 810ms gap. Các span hiển thị chỉ tốn 150ms, nhưng tổng 1000ms. 810ms "mất tích" thường là: (1) một đoạn xử lý chưa được instrument (thiếu manual span), (2) chờ I/O/network không được bọc span, hoặc (3) chờ trong queue. Hành động: thêm span vào đoạn giữa `fetch-user` và `render` để lộ thủ phạm. Đây là bài học: **gap lớn = chỗ cần instrument thêm**, không phải "hệ thống nhanh".

### BT4 — Sampling head vs tail

(a) Head-based 2%: quyết định mù lúc start. Trace lỗi (0.1%) chỉ có 2% cơ hội được giữ → giữ được ~`0.1% × 2% = 0.002%` tổng = ~0.4 lỗi/s trong số 20 lỗi/s → **bỏ sót 98% lỗi**. Tương tự với trace chậm. → Head-based 2% **không đạt** yêu cầu "thấy gần như mọi lỗi".

(b) Tail-based ở Collector, áp sau khi trace hoàn thành:
```
luật ưu tiên (theo thứ tự):
  1. status == Error            → giữ 100%
  2. duration > 2s              → giữ 100%
  3. còn lại (OK & nhanh)       → giữ ngẫu nhiên ~1.5%
```
Lỗi 0.1% + chậm 0.5% = 0.6% giữ toàn bộ; phần còn lại 99.4% giữ 1.5% ≈ 1.49%. Tổng ≈ `0.6% + 1.49% = ~2.1%` ≈ ngân sách 2% ✓, mà **giữ gần như 100% lỗi và chậm**.

(c) Chi phí tail-based: Collector phải **buffer mọi span của một trace cho đến khi trace kết thúc** (tốn RAM, có giới hạn thời gian chờ). Cần Collector có state; phức tạp khi span một trace đến từ nhiều instance Collector (phải route theo `trace_id` để gom về cùng chỗ). Đổi lại độ thông minh của sampling — đáng giá cho service quan trọng/traffic cao.

### BT5 — Link trace_id vào log

Ý tưởng: lấy span hiện hành từ `context.Context`, đọc `SpanContext`, gắn `trace_id`/`span_id` vào mỗi dòng log structured.

```go
import (
    "context"
    "log/slog"
    "go.opentelemetry.io/otel/trace"
)

// logWithTrace thêm trace_id/span_id (nếu có) vào structured log.
func logWithTrace(ctx context.Context, logger *slog.Logger, msg string, args ...any) {
    sc := trace.SpanContextFromContext(ctx) // lấy SpanContext từ ctx
    if sc.IsValid() {                        // có span hợp lệ?
        args = append(args,
            "trace_id", sc.TraceID().String(),
            "span_id", sc.SpanID().String(),
        )
    }
    // Không có span → vẫn log bình thường, chỉ thiếu trace_id (không panic).
    logger.InfoContext(ctx, msg, args...)
}
```

Xử lý khi không có span: `SpanContextFromContext` trả về một SpanContext rỗng, `IsValid()` = false → bỏ qua việc thêm field, **không** crash. Log vẫn ghi, chỉ là không correlate được — đúng hành vi mong muốn (degrade gracefully). `solutions.go` có bản mô phỏng (`exampleBT5`) dùng mini-tracer tự viết để minh họa nguyên lý mà không cần import OTel thật.

### BT6 — Diagnose span mồ côi

(a) **Chẩn đoán.** Trace bị **tách làm hai** với hai `trace_id` khác nhau, đúng tại ranh giới giữa nhóm {gateway, order} và nhóm {payment, bank, inventory}. Khi một trace vỡ ngay tại boundary service, nguyên nhân số một là **context không được propagate qua boundary đó** — order service gọi payment service mà KHÔNG mang theo `traceparent`. Payment không thấy header → tự sinh `trace_id` mới → cả nhánh sau thành một trace riêng.

(b) **Chỗ hỏng chính xác.** Tại lời gọi từ **order → payment**. Hoặc: order (client) **không inject** `traceparent` khi gọi đi; hoặc payment (server) **không extract** header khi nhận. Trong Go còn một khả năng phổ biến: order tạo span nhưng gọi HTTP client với `context.Background()` thay vì `ctx` chứa span → client không có gì để inject.

(c) **Cách fix.**
- Phía order (client): dùng HTTP client đã được instrument — bọc transport bằng `otelhttp.NewTransport(...)`, và **truyền đúng `ctx`** (chứa span hiện hành) vào `http.NewRequestWithContext(ctx, ...)`. Propagator sẽ tự inject `traceparent`.
- Phía payment (server): bọc handler bằng `otelhttp.NewHandler(...)` để tự extract header và đặt SpanContext vào `r.Context()`.
- Đảm bảo cả hai service cấu hình cùng **propagator** (`otel.SetTextMapPropagator(propagation.TraceContext{})`).
- Kiểm chứng: sau fix, cả 5 span phải cùng một `trace_id`, waterfall liền mạch qua 3 service. `solutions.go` mô phỏng cả ca hỏng (không truyền ctx → mồ côi) lẫn ca đã fix (`exampleBT6`).

---

## Code & Minh họa

- [solutions.go](./solutions.go) — mini distributed-tracer thuần Go (không cần OTel): sinh `TraceID`/`SpanID`, span cha-con, propagation qua `context.Context` và qua header `traceparent`, export waterfall JSON. Mỗi chỗ có comment trỏ tới API OTel thật. Chạy: `go run solutions.go`.
- [visualization.html](./visualization.html) — 3 module tương tác:
  1. **Trace waterfall** — request qua 4 service, click span xem chi tiết, thấy bottleneck.
  2. **Context propagation** — theo dõi `trace_id`/`traceparent` chảy qua HTTP header giữa các service.
  3. **Sampling** — so head-based vs tail-based, xem trace nào được giữ/bỏ.

---

## Bài tiếp theo

- [Lesson 75 — Docker Multi-stage Build](../lesson-75-docker-multistage/README.md): đóng gói service (đã instrument) thành image gọn nhẹ để deploy.
- Ôn lại: [Lesson 72 — Structured Logging](../lesson-72-structured-logging/README.md) và [Lesson 73 — Metrics & Prometheus](../lesson-73-metrics-prometheus/README.md) — ba trụ giờ đã đủ bộ, liên kết qua `trace_id`.

## Tham khảo

- W3C Trace Context: định dạng `traceparent` / `tracestate`.
- OpenTelemetry Specification & Semantic Conventions.
- Go: `go.opentelemetry.io/otel`, `go.opentelemetry.io/contrib/instrumentation/net/http/otelhttp`.
- Backend: Jaeger, Grafana Tempo, Zipkin.
