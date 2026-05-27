// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: Programming/lesson-73-metrics-prometheus/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 73 — Metrics & Prometheus

> Tier 7 (Production) · Quan sát hệ thống bằng số liệu — đo để biết, đo để cải thiện.

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Hiểu **vì sao cần metrics** và vị trí của metrics trong 3 trụ observability (logs, metrics, traces).
- Phân biệt rõ **4 loại metric**: Counter, Gauge, Histogram, Summary — khi nào dùng cái nào.
- Nắm **labels** và hiểm họa **cardinality explosion**.
- Đọc/viết được **exposition format** (text format Prometheus scrape).
- Instrument một HTTP service bằng \`prometheus/client_golang\`.
- Áp dụng **RED** (cho service) và **USE** (cho resource) để chọn metric cần đo.
- Viết được **PromQL** cơ bản: \`rate()\`, \`histogram_quantile()\`, error rate %.
- Thiết kế **histogram buckets** và tính **quantile** từ buckets bằng tay (walk-through số thật).
- Viết **alert rule** và hiểu vai trò Alertmanager / Grafana.
- Tránh các **pitfall**: high cardinality, counter reset, sai metric type, averaging quantile.

## Kiến thức tiền đề

- [Lesson 42 — HTTP net/http deep](../lesson-42-http-net-deep/) — middleware, handler.
- [Lesson 43 — REST API design](../lesson-43-rest-api-design/) — endpoint, status code.
- [Lesson 72 — Structured Logging](../lesson-72-structured-logging/) — trụ logs; bài này là trụ metrics.
- Sẽ học tiếp ở [Lesson 74 — Tracing & OpenTelemetry](../lesson-74-tracing-opentelemetry/) — trụ traces.

---

## 1. Vì sao cần metrics

> 💡 **Trực giác / Hình dung.** Hãy tưởng tượng bạn lái xe nhưng bảng điều khiển bị che hết: không đồng hồ tốc độ, không kim xăng, không đèn báo nhiệt. Xe vẫn chạy — cho tới khi hết xăng giữa đường hoặc động cơ quá nhiệt mà bạn không hề biết trước. **Metrics chính là bảng điều khiển (dashboard) của hệ thống phần mềm**: tốc độ request/giây, tỷ lệ lỗi, độ trễ, mức dùng bộ nhớ — tất cả hiển thị real-time.

Một câu nói kinh điển trong vận hành (operations):

> **"If you can't measure it, you can't improve it."** — Không đo được thì không cải thiện được.

Khi service chậm lúc 3 giờ sáng, bạn cần trả lời ngay: *Chậm ở đâu? Bao nhiêu % request bị ảnh hưởng? Bắt đầu từ lúc nào?* Nếu chỉ có log thô, bạn phải grep hàng triệu dòng. Nếu có metrics, bạn nhìn biểu đồ là thấy: "p99 latency nhảy từ 50ms lên 2s lúc 02:47, đúng lúc deploy v1.4.2".

### Metrics trả lời câu hỏi gì

| Câu hỏi vận hành | Metric đo |
|------------------|-----------|
| Hệ thống có đang nhận traffic không? | request rate (counter → rate) |
| Bao nhiêu % request bị lỗi? | error count / total count |
| Người dùng phải chờ bao lâu? | latency histogram (p50/p99) |
| Bộ nhớ sắp cạn chưa? | memory gauge |
| Hàng đợi (queue) có bị tắc không? | queue size gauge |
| Đã đến lúc scale chưa? | CPU utilization, in-flight requests |

> ❓ **Câu hỏi tự nhiên của người đọc.**
> - *"Có log rồi sao còn cần metrics?"* — Log ghi **từng sự kiện riêng lẻ** (event). Metrics là **số liệu tổng hợp theo thời gian** (aggregate). Đếm "có 1 triệu request hôm nay" bằng cách grep 1 triệu dòng log thì chậm và tốn; metrics lưu sẵn con số đó và cập nhật liên tục.
> - *"Metrics có chính xác không nếu chỉ là con số tổng hợp?"* — Chính xác cho **xu hướng và tỷ lệ** (rate, percentile), nhưng **mất chi tiết từng request**. Khi cần soi 1 request cụ thể → dùng log/trace. Đó là lý do cần cả 3 trụ.

---

## 2. Ba trụ observability

Observability (khả năng quan sát) thường được mô tả bằng **3 trụ (three pillars)**:

| Trụ | Là gì | Đơn vị | Trả lời câu hỏi | Chi phí lưu |
|-----|-------|--------|-----------------|-------------|
| **Logs** | Bản ghi sự kiện rời rạc, có timestamp | dòng text/JSON | "Chuyện gì đã xảy ra với request X?" | Cao (nhiều dòng) |
| **Metrics** | Số liệu tổng hợp theo chuỗi thời gian | con số (time-series) | "Hệ thống đang khỏe không? Tỷ lệ lỗi bao nhiêu?" | Thấp (chỉ số) |
| **Traces** | Đường đi của 1 request qua nhiều service | span (cây) | "Request này chậm ở service nào?" | Trung bình (sampling) |

> 💡 **Hình dung.** Hãy ví hệ thống như một bệnh viện:
> - **Metrics** = các chỉ số sống (nhịp tim, huyết áp) đo liên tục → biết bệnh nhân *có ổn không*.
> - **Logs** = bệnh án ghi từng sự việc → biết *chuyện gì đã xảy ra*.
> - **Traces** = phim chụp theo dõi 1 viên thuốc đi qua các cơ quan → biết *tắc ở đâu*.

Metrics có ưu thế: **rẻ để lưu lâu dài** (chỉ là dãy số), **nhanh để query**, **lý tưởng cho alerting** (so sánh số với ngưỡng). Vì thế metrics thường là trụ đầu tiên ta dựng lên.

> 📝 **Tóm tắt mục 2.** Logs = sự kiện; Metrics = số tổng hợp theo thời gian; Traces = đường đi 1 request. Metrics rẻ, nhanh, hợp alerting → dựng trước.

---

## 3. Prometheus — pull-based time-series database

[Prometheus](https://prometheus.io) là hệ thống monitoring + time-series database (TSDB) phổ biến nhất trong hệ sinh thái cloud-native (CNCF). Đặc điểm cốt lõi:

### Pull model (kéo) thay vì push (đẩy)

> 💡 **Trực giác.** Thay vì mỗi service tự "gửi báo cáo" tới server trung tâm (push), Prometheus **chủ động đi gõ cửa từng service và hỏi: "Số liệu hiện tại của anh là gì?"** (pull). Mỗi service chỉ cần mở một endpoint HTTP \`/metrics\` trả về văn bản số liệu. Prometheus **scrape** (cào) endpoint đó theo chu kỳ (mặc định 15s).

\`\`\`
                  scrape mỗi 15s
  Prometheus  ───── GET /metrics ─────▶  Service A  (:8080/metrics)
      │       ───── GET /metrics ─────▶  Service B  (:8081/metrics)
      │       ───── GET /metrics ─────▶  Service C  (:8082/metrics)
      ▼
  TSDB (lưu chuỗi thời gian)
\`\`\`

**Vì sao pull?**

- **Service discovery dễ**: Prometheus biết target nào đang sống (scrape fail = target down → có ngay metric \`up=0\`).
- **Không cần service biết địa chỉ Prometheus**: service chỉ expose \`/metrics\`, ai scrape cũng được (kể cả debug bằng \`curl\`).
- **Kiểm soát tải tập trung**: Prometheus tự quyết scrape bao lâu một lần, không bị service spam.

> ❓ **Câu hỏi tự nhiên.**
> - *"Service chỉ chạy ngắn (batch job) thì pull sao kịp?"* — Đúng, pull không hợp job ngắn. Giải pháp: **Pushgateway** — job đẩy metric lên Pushgateway, Prometheus scrape Pushgateway. Đây là ngoại lệ, không phải mặc định.
> - *"Mỗi service phải tự lưu số liệu à?"* — Service chỉ giữ **giá trị hiện tại** trong RAM. **Lịch sử theo thời gian** do Prometheus lưu trong TSDB. Service không cần database.

### Một time-series là gì

Một **time-series** (chuỗi thời gian) = một metric + một tập label cụ thể, lưu thành dãy \`(timestamp, value)\`:

\`\`\`
http_requests_total{method="GET", status="200"}
  → (12:00:00, 1000), (12:00:15, 1015), (12:00:30, 1027), ...
\`\`\`

Mỗi tổ hợp label khác nhau = **một series riêng**. Đây là gốc rễ của vấn đề cardinality (mục 5).

---

## 4. Bốn loại metric (metric types)

Đây là phần lõi. Prometheus có 4 loại metric. Chọn sai loại = đo sai.

### 4.1 Counter — chỉ tăng (monotonic)

> 💡 **Hình dung.** Counter giống **đồng hồ công-tơ-mét (odometer) của xe**: chỉ tăng, không bao giờ giảm (trừ khi reset về 0 do restart). Bạn không quan tâm giá trị tuyệt đối "xe đã đi 152340 km", mà quan tâm **tốc độ thay đổi**: "đi bao nhiêu km trong giờ vừa rồi".

Counter dùng cho: **đếm số lần xảy ra** — request count, error count, byte sent, task done.

\`\`\`go
requestsTotal.Inc()        // +1
bytesSent.Add(1024)        // +1024
// KHÔNG có .Dec() hay .Set() — counter chỉ tăng
\`\`\`

Vì counter chỉ tăng, **giá trị thô gần như vô nghĩa** (1027 request tính từ lúc nào?). Cái có nghĩa là **tốc độ** — dùng PromQL \`rate()\`:

\`\`\`promql
rate(http_requests_total[5m])   # request/giây, trung bình trong 5 phút
\`\`\`

Ví dụ số cụ thể: tại 12:00:00 counter = 1000, tại 12:00:30 counter = 1027 → trong 30s tăng 27 → \`rate ≈ 27/30 = 0.9 req/s\`.

> ⚠ **Lỗi thường gặp — counter reset.** Khi service restart, counter về 0. Nếu bạn tự lấy hiệu \`value_now - value_before\`, gặp restart sẽ ra **số âm** (sai). \`rate()\` của Prometheus **tự phát hiện reset** (giá trị tụt) và cộng bù — nên **luôn dùng \`rate()\`/\`increase()\`, đừng tự trừ tay**.

### 4.2 Gauge — lên xuống tự do

> 💡 **Hình dung.** Gauge giống **kim đồng hồ tốc độ (speedometer)** hoặc **nhiệt kế**: lên được, xuống được, đo **giá trị hiện tại** tại thời điểm này.

Gauge dùng cho: **đại lượng dao động** — memory đang dùng, số goroutine, kích thước queue, nhiệt độ, số connection đang mở, in-flight requests.

\`\`\`go
goroutines.Set(42)         // gán giá trị tuyệt đối
inFlight.Inc()             // request vào → +1
inFlight.Dec()             // request xong → −1
queueSize.Set(float64(len(queue)))
\`\`\`

Với gauge, **giá trị hiện tại có nghĩa trực tiếp** (khác counter). Bạn alert thẳng: \`memory_bytes > 1.5e9\`.

> ❓ **Câu hỏi tự nhiên.** *"Latency dùng gauge được không?"* — **Không nên.** Gauge chỉ giữ 1 giá trị → bạn mất phân phối. Nếu set \`latency_gauge = 2.0\` rồi \`= 0.01\`, scrape kế tiếp chỉ thấy 0.01 → "p99 = 0.01s" hoàn toàn sai. Latency cần **histogram** (4.3).

### 4.3 Histogram — phân phối qua buckets

> 💡 **Hình dung.** Histogram giống cách **thống kê điểm thi**: thay vì lưu điểm của từng học sinh, ta đếm "bao nhiêu bạn ≤ 5đ, ≤ 6đ, ≤ 7đ, ..." — các **khoảng (bucket)** tích lũy. Từ đó suy ra "p90 điểm thi" mà không cần lưu toàn bộ.

Histogram dùng cho: **đo phân phối** của một đại lượng — latency, response size, queue wait time. Nó chia trục giá trị thành **buckets** (cận trên cố định, gọi là \`le\` = "less than or equal").

Mỗi observation rơi vào **tất cả** bucket có cận \`≥\` giá trị (vì bucket là **tích lũy / cumulative**):

\`\`\`
http_request_duration_seconds_bucket{le="0.005"}  24054   # ≤ 5ms
http_request_duration_seconds_bucket{le="0.01"}   33444   # ≤ 10ms
http_request_duration_seconds_bucket{le="0.05"}   100392  # ≤ 50ms
http_request_duration_seconds_bucket{le="0.1"}    129389  # ≤ 100ms
http_request_duration_seconds_bucket{le="0.5"}    133988  # ≤ 500ms
http_request_duration_seconds_bucket{le="1"}      144320  # ≤ 1s
http_request_duration_seconds_bucket{le="+Inf"}   144320  # tất cả
http_request_duration_seconds_sum                 53423.0 # tổng các giá trị
http_request_duration_seconds_count               144320  # = bucket +Inf
\`\`\`

Từ buckets, Prometheus tính **quantile** server-side bằng \`histogram_quantile()\` (mục 13 có walk-through chi tiết).

> ⚠ **Lỗi thường gặp.** Histogram **không** cho quantile chính xác tuyệt đối — nó **nội suy tuyến tính** trong bucket chứa quantile. Bucket càng thưa → sai số càng lớn. Chọn bucket đúng (mục 13) là chìa khóa.

### 4.4 Summary — quantile tính client-side

Summary cũng đo phân phối, nhưng khác histogram ở chỗ **quantile được tính ngay trong client** (service), rồi expose con số quantile đã tính sẵn:

\`\`\`
http_request_duration_seconds{quantile="0.5"}   0.012
http_request_duration_seconds{quantile="0.9"}   0.087
http_request_duration_seconds{quantile="0.99"}  0.342
http_request_duration_seconds_sum               53423.0
http_request_duration_seconds_count             144320
\`\`\`

| Tiêu chí | Histogram | Summary |
|----------|-----------|---------|
| Quantile tính ở đâu | Server (Prometheus, từ buckets) | Client (service) |
| Chọn quantile lúc query | Linh hoạt (bất kỳ q) | Cố định lúc define |
| **Cộng được giữa nhiều instance** | **CÓ** (cộng buckets rồi tính lại) | **KHÔNG** (không avg quantile được) |
| Tải client | Nhẹ (chỉ tăng bucket) | Nặng hơn (giữ sliding window) |
| Độ chính xác quantile | Phụ thuộc bucket | Chính xác hơn (trong window) |

> ⚠ **Quy tắc thực tế.** Trong môi trường nhiều instance (microservice scale ngang), **dùng histogram** vì nó cộng được. Summary chỉ hợp khi cần quantile rất chính xác trên **một** instance và không cần aggregate. (Xem pitfall mục 15 về "averaging quantile".)

> 🔁 **Dừng lại tự kiểm tra.**
> 1. Số lỗi tích lũy của API → metric gì? <details><summary>Đáp án</summary>Counter (chỉ tăng), query bằng \`rate()\` để ra error/giây.</details>
> 2. Số message đang nằm trong queue → metric gì? <details><summary>Đáp án</summary>Gauge (lên xuống).</details>
> 3. Phân phối latency, cần p99 tổng hợp từ 10 pod → metric gì? <details><summary>Đáp án</summary>Histogram (cộng buckets được giữa các pod, rồi \`histogram_quantile\`).</details>

> 📝 **Tóm tắt mục 4.** Counter = chỉ tăng (dùng rate). Gauge = lên xuống (giá trị hiện tại). Histogram = buckets, quantile tính server, cộng được. Summary = quantile client, không cộng được.

---

## 5. Labels & cardinality

**Label** (nhãn) là **chiều (dimension)** gắn vào metric, cho phép cắt lát số liệu theo nhiều góc:

\`\`\`
http_requests_total{method="GET",  status="200", endpoint="/users"} 1027
http_requests_total{method="POST", status="500", endpoint="/orders"} 13
\`\`\`

Cùng tên metric \`http_requests_total\` nhưng **mỗi tổ hợp label = một time-series riêng**. Nhờ label, bạn query được "request rate của POST /orders bị 500" mà không cần metric riêng cho từng tổ hợp.

### Cardinality — số tổ hợp label

> 💡 **Trực giác.** **Cardinality** = số lượng time-series sinh ra = **tích các giá trị có thể của từng label**. Mỗi series tốn RAM + đĩa trong Prometheus. Cardinality tăng theo **phép nhân**, không phải phép cộng.

Ví dụ tính cụ thể:

\`\`\`
method   : GET, POST, PUT, DELETE        → 4 giá trị
status   : 200, 400, 404, 500, 503       → 5 giá trị
endpoint : 10 route                       → 10 giá trị
─────────────────────────────────────────────────────
cardinality = 4 × 5 × 10 = 200 series     (OK, nhỏ)
\`\`\`

Bây giờ thêm label \`user_id\` với 1 triệu user:

\`\`\`
cardinality = 4 × 5 × 10 × 1_000_000 = 200_000_000 series  (NỔ — sập Prometheus)
\`\`\`

> ⚠ **Lỗi thường gặp — cardinality explosion.** **TUYỆT ĐỐI không** đặt label có giá trị **không giới hạn (unbounded)**: \`user_id\`, \`email\`, \`request_id\`, \`session_id\`, URL có query string, IP đầy đủ. Mỗi giá trị mới = 1 series mới, RAM Prometheus tăng tuyến tính theo số series → OOM (out of memory).
>
> **Quy tắc:** label chỉ nên có **tập giá trị hữu hạn, nhỏ** (low cardinality): method, status, endpoint *đã chuẩn hóa* (\`/users/:id\` chứ không phải \`/users/12345\`), region, instance. Muốn tra theo \`user_id\` → dùng **log** hoặc **trace**, không phải label metric.

> 🔁 **Dừng lại tự kiểm tra.** \`payment_total{currency, gateway, card_last4}\` với currency=10, gateway=5, card_last4=10000. Cardinality? Có vấn đề không?
> <details><summary>Đáp án</summary>10 × 5 × 10000 = 500.000 series. \`card_last4\` là unbounded-ish (10k giá trị) → bỏ nó làm label, ghi vào log nếu cần. Giữ lại currency × gateway = 50 series.</details>

---

## 6. Exposition format (text format)

Khi Prometheus scrape \`/metrics\`, service trả về **text plain** theo định dạng quy ước:

\`\`\`
# HELP http_requests_total Tổng số HTTP request đã xử lý.
# TYPE http_requests_total counter
http_requests_total{method="GET",status="200"} 1027
http_requests_total{method="POST",status="500"} 13

# HELP process_resident_memory_bytes Bộ nhớ RSS hiện tại.
# TYPE process_resident_memory_bytes gauge
process_resident_memory_bytes 5.242880e+07

# HELP http_request_duration_seconds Latency HTTP.
# TYPE http_request_duration_seconds histogram
http_request_duration_seconds_bucket{le="0.005"} 24054
http_request_duration_seconds_bucket{le="0.01"} 33444
http_request_duration_seconds_bucket{le="+Inf"} 144320
http_request_duration_seconds_sum 53423.0
http_request_duration_seconds_count 144320
\`\`\`

Quy tắc đọc:

- \`# HELP <metric> <mô tả>\` — dòng chú thích mô tả.
- \`# TYPE <metric> <counter|gauge|histogram|summary>\` — khai báo loại.
- \`<metric>{<label>="<value>",...} <number> [timestamp]\` — một sample. Timestamp thường để Prometheus tự gán lúc scrape.
- Histogram tự sinh thêm \`_bucket{le=...}\`, \`_sum\`, \`_count\`. Counter \`_total\` là quy ước hậu tố.

Bạn có thể tự xem bằng: \`curl http://localhost:8080/metrics\`.

---

## 7. Go client — \`prometheus/client_golang\`

Thư viện chính thức để instrument Go service. Quy trình 4 bước:

\`\`\`go
import (
    "net/http"
    "github.com/prometheus/client_golang/prometheus"
    "github.com/prometheus/client_golang/prometheus/promauto"
    "github.com/prometheus/client_golang/prometheus/promhttp"
)

// 1) Khai báo metric với labels (Vec = có label). promauto tự register.
var requestsTotal = promauto.NewCounterVec(
    prometheus.CounterOpts{
        Name: "http_requests_total",
        Help: "Tổng số HTTP request, phân theo method và status.",
    },
    []string{"method", "status"},  // tên các label
)

var requestDuration = promauto.NewHistogramVec(
    prometheus.HistogramOpts{
        Name:    "http_request_duration_seconds",
        Help:    "Latency HTTP (giây).",
        Buckets: []float64{0.005, 0.01, 0.05, 0.1, 0.5, 1, 5}, // cận trên các bucket
    },
    []string{"method", "endpoint"},
)

var inFlight = promauto.NewGauge(prometheus.GaugeOpts{
    Name: "http_in_flight_requests",
    Help: "Số request đang xử lý.",
})

// 2) Ghi nhận (observe) trong handler.
func handler(w http.ResponseWriter, r *http.Request) {
    inFlight.Inc()
    defer inFlight.Dec()

    start := time.Now()
    // ... xử lý ...
    status := "200"

    requestsTotal.WithLabelValues(r.Method, status).Inc()
    requestDuration.WithLabelValues(r.Method, "/users").
        Observe(time.Since(start).Seconds())
}

// 3) Expose endpoint /metrics.
func main() {
    http.Handle("/metrics", promhttp.Handler())  // tự trả exposition format
    http.HandleFunc("/users", handler)
    http.ListenAndServe(":8080", nil)
}
\`\`\`

Điểm cần nhớ:

- \`...Vec\` = phiên bản có label; \`.WithLabelValues("GET","200")\` chọn series con rồi \`.Inc()\`/\`.Observe()\`.
- \`promauto.New...\` tự đăng ký vào default registry. Dùng \`prometheus.MustRegister(...)\` nếu tự quản registry.
- \`promhttp.Handler()\` lo phần render exposition format — bạn không tự viết text.

> ❓ **Câu hỏi tự nhiên.** *"Tôi có phải tự viết text format không?"* — **Không.** \`promhttp.Handler()\` lo hết. Bài này có \`solutions.go\` tự cài lại phần đó **chỉ để học cơ chế** — production luôn dùng \`client_golang\`.

---

## 8. RED method — cho services

> 💡 **Trực giác.** Khi không biết đo gì cho một service xử-lý-request (HTTP, gRPC), **RED** cho bạn 3 metric tối thiểu luôn cần:

| Chữ | Nghĩa | Metric | Đo bằng |
|-----|-------|--------|---------|
| **R**ate | tốc độ request | request/giây | counter → \`rate()\` |
| **E**rrors | tỷ lệ lỗi | error/giây hoặc % | counter (status≥500) → \`rate()\` |
| **D**uration | độ trễ | latency p50/p99 | histogram → \`histogram_quantile()\` |

RED trả lời 3 câu hỏi sống còn: *Có đang phục vụ không? (R) Có hỏng không? (E) Có chậm không? (D)*. Hầu hết dashboard service bắt đầu từ RED.

---

## 9. USE method — cho resources

> 💡 **Trực giác.** RED dành cho **service** (thứ xử lý request). **USE** (Brendan Gregg) dành cho **resource** (CPU, RAM, đĩa, network, connection pool) — thứ có **giới hạn năng lực**:

| Chữ | Nghĩa | Ví dụ |
|-----|-------|-------|
| **U**tilization | % thời gian resource bận | CPU 80%, disk 60% |
| **S**aturation | mức độ "xếp hàng" chờ resource | run-queue length, queue depth, swap |
| **E**rrors | số lỗi của resource | disk I/O error, packet drop, conn refused |

USE giúp tìm **bottleneck phần cứng/tài nguyên**. Ví dụ DB connection pool: Utilization = % connection đang dùng; Saturation = số request đang chờ lấy connection; Errors = số lần timeout lấy connection.

> 📝 **Tóm tắt 8–9.** RED = service (Rate/Errors/Duration). USE = resource (Utilization/Saturation/Errors). Dùng cả hai để phủ cả "luồng request" lẫn "tài nguyên".

---

## 10. PromQL — ngôn ngữ truy vấn

PromQL (Prometheus Query Language) truy vấn time-series. Vài mẫu cốt lõi:

### rate / increase (cho counter)

\`\`\`promql
rate(http_requests_total[5m])
# Tốc độ TB (req/s) trong cửa sổ 5 phút trượt. Tự xử lý counter reset.

increase(http_requests_total[1h])
# Tổng số request tăng trong 1 giờ (= rate × số giây).
\`\`\`

### Tổng hợp với \`sum by\`

\`\`\`promql
sum(rate(http_requests_total[5m])) by (status)
# Request/s gộp theo status (gộp hết các label khác).
\`\`\`

### Error rate %

\`\`\`promql
sum(rate(http_requests_total{status=~"5.."}[5m]))
  /
sum(rate(http_requests_total[5m]))
# Tỷ lệ request lỗi 5xx. Nhân 100 để ra %.
# status=~"5.." là regex match: 500, 502, 503...
\`\`\`

### Quantile từ histogram

\`\`\`promql
histogram_quantile(0.99,
  sum(rate(http_request_duration_seconds_bucket[5m])) by (le))
# p99 latency. CHÚ Ý: phải sum rate của _bucket theo (le) TRƯỚC khi tính quantile.
\`\`\`

> ⚠ **Lỗi thường gặp.** Với histogram, **luôn \`rate()\` trên \`_bucket\` rồi \`sum by (le)\` rồi mới \`histogram_quantile\`**. Tính quantile trên từng instance rồi avg lại là **SAI** (xem mục 15).

---

## 11. Alerting — Alertmanager & alert rules

Prometheus đánh giá **alert rules** định kỳ. Khi điều kiện đúng liên tục trong khoảng \`for\`, alert chuyển sang trạng thái **firing** và gửi tới **Alertmanager** — thành phần lo **định tuyến, gom nhóm (grouping), chặn lặp (dedup), im lặng (silence), và gửi đi** (PagerDuty, Slack, email).

\`\`\`yaml
groups:
- name: api-alerts
  rules:
  - alert: HighErrorRate
    expr: |
      sum(rate(http_requests_total{status=~"5.."}[5m]))
        /
      sum(rate(http_requests_total[5m])) > 0.05
    for: 5m            # phải đúng liên tục 5 phút mới fire (tránh nhiễu)
    labels:
      severity: page   # page = đánh thức người trực
    annotations:
      summary: "Error rate > 5% trong 5 phút"
      description: "5xx rate = {{ $value | humanizePercentage }}"
\`\`\`

- \`expr\` — biểu thức PromQL trả về kết quả ⇒ alert active.
- \`for\` — chống nhiễu (flapping): chỉ fire nếu điều kiện kéo dài đủ lâu.
- \`labels.severity\` — Alertmanager route theo đó (page vs ticket vs ignore).

---

## 12. Grafana — visualize

[Grafana](https://grafana.com) là công cụ dựng **dashboard** trực quan từ nhiều nguồn (Prometheus, Loki, ...). Bạn viết PromQL vào panel → Grafana vẽ biểu đồ đường/heatmap/gauge, refresh tự động.

- Prometheus = lưu + query + alert engine.
- Grafana = lớp trình bày (UI), không lưu dữ liệu.
- Một dashboard RED điển hình: panel Rate (req/s), panel Error % , panel Duration (p50/p95/p99) — tất cả từ PromQL ở mục 10.

---

## 13. Histogram buckets & quantile — walk-through số thật

Đây là phần dễ nhầm nhất. Ta đi từng bước.

### 13.1 Chọn buckets

> 💡 **Trực giác.** Bucket nên **dày ở vùng giá trị hay xảy ra** và **bao trùm đuôi (tail)**. Cho API latency, phần lớn request nhanh (vài ms tới trăm ms), nhưng đuôi (p99) có thể tới giây → cần bucket trải đủ:

\`\`\`go
Buckets: []float64{0.005, 0.01, 0.025, 0.05, 0.1, 0.25, 0.5, 1, 2.5, 5}
//                  5ms   10ms  25ms  50ms  100ms 250ms 500ms 1s 2.5s 5s
\`\`\`

\`prometheus.DefBuckets\` mặc định là \`{.005, .01, .025, .05, .1, .25, .5, 1, 2.5, 5, 10}\` — hợp cho API web. Nếu service của bạn luôn < 50ms thì buckets này phí (mọi thứ rơi vào ≤0.05); nên co lại: \`{0.001, 0.0025, 0.005, 0.01, 0.025, 0.05}\`.

### 13.2 Tính quantile từ buckets (công thức nội suy)

Giả sử sau một khoảng có các bucket tích lũy (cumulative count):

| \`le\` (cận trên) | count tích lũy |
|-----------------|----------------|
| 0.01 (10ms)     | 20  |
| 0.05 (50ms)     | 60  |
| 0.1  (100ms)    | 85  |
| 0.5  (500ms)    | 98  |
| +Inf            | 100 |

Tổng count = 100. Tính **p90** (quantile 0.90):

**Bước 1 — vị trí mục tiêu.** rank = \`0.90 × 100 = 90\`. Ta tìm bucket mà count tích lũy lần đầu **≥ 90**.

**Bước 2 — tìm bucket chứa.**
- \`le=0.1\` có 85 (< 90) → chưa tới.
- \`le=0.5\` có 98 (≥ 90) → **p90 nằm trong bucket (0.1, 0.5]**.

**Bước 3 — nội suy tuyến tính trong bucket.** Prometheus giả định giá trị **phân bố đều** trong bucket:
- Cận dưới bucket = 0.1, cận trên = 0.5.
- Count đầu bucket = 85, cuối bucket = 98 → bucket này chứa \`98 − 85 = 13\` quan sát.
- Cần đạt rank 90 → cần thêm \`90 − 85 = 5\` quan sát kể từ đầu bucket.
- Tỷ lệ trong bucket = \`5 / 13 ≈ 0.385\`.

\`\`\`
p90 ≈ cận_dưới + tỷ_lệ × (cận_trên − cận_dưới)
    = 0.1 + 0.385 × (0.5 − 0.1)
    = 0.1 + 0.385 × 0.4
    = 0.1 + 0.154
    ≈ 0.254 s   (≈ 254 ms)
\`\`\`

> ⚠ **Sai số bucket.** Nếu giữa 0.1 và 0.5 không có bucket trung gian, ta chỉ biết "p90 đâu đó trong 100–500ms" và nội suy đoán 254ms. Thực tế có thể là 110ms hoặc 480ms. **Muốn p90 chính xác hơn → thêm bucket** (vd 0.15, 0.2, 0.3). Đây là lý do thiết kế bucket quan trọng.

> 🔁 **Dừng lại tự kiểm tra.** Với bảng trên, tính **p50**.
> <details><summary>Đáp án</summary>rank = 0.5 × 100 = 50. \`le=0.01\`→20 (<50), \`le=0.05\`→60 (≥50) → bucket (0.01, 0.05]. Bucket chứa 60−20=40 quan sát, cần thêm 50−20=30. Tỷ lệ 30/40=0.75. p50 ≈ 0.01 + 0.75×(0.05−0.01) = 0.01 + 0.75×0.04 = 0.01 + 0.03 = **0.04s (40ms)**.</details>

---

## 14. Default Go metrics — runtime tự động

\`client_golang\` mặc định expose sẵn metrics về Go runtime và process khi bạn dùng default registry (\`promhttp.Handler()\`):

\`\`\`
go_goroutines                        42       # số goroutine hiện tại (gauge)
go_memstats_alloc_bytes              5.2e+07  # heap đang cấp phát (gauge)
go_memstats_heap_inuse_bytes         ...
go_gc_duration_seconds{quantile=...} ...      # thời gian GC (summary)
go_threads                           12
process_cpu_seconds_total            134.2    # CPU đã dùng (counter)
process_resident_memory_bytes        ...      # RSS (gauge)
process_open_fds                     38       # file descriptor đang mở
\`\`\`

Những metric này "miễn phí" — rất hữu ích để theo dõi rò rỉ goroutine (\`go_goroutines\` tăng dần không giảm), áp lực GC, hay rò rỉ bộ nhớ. Liên hệ [Lesson 33 — Memory & GC](../lesson-33-memory-gc/).

---

## 15. Common pitfalls — bẫy thường gặp

| Pitfall | Hậu quả | Cách tránh |
|---------|---------|------------|
| **High cardinality label** (\`user_id\`, \`request_id\`, raw URL) | Series nổ → Prometheus OOM | Chỉ label low-cardinality; chuẩn hóa route \`/users/:id\`; chi tiết → log/trace |
| **Không dùng rate cho counter reset** | Tự trừ tay ra giá trị âm khi restart | Luôn \`rate()\`/\`increase()\` |
| **Sai metric type** (latency dùng gauge) | Mất phân phối, p99 sai bét | Latency/size → histogram |
| **Quá nhiều metric / quá nhiều bucket** | Tốn RAM, đĩa, tiền | Đo cái thật sự cần (RED/USE); bucket vừa đủ |
| **Average quantile across instances** | Số p99 sai về mặt toán học | \`sum(rate(_bucket)) by (le)\` rồi mới \`histogram_quantile\` — không avg p99 |
| **Summary trong môi trường scale ngang** | Không aggregate được giữa instance | Dùng histogram |

### 15.1 Vì sao không được average quantile

> 💡 **Trực giác bằng số.** Hai instance, mỗi instance p99:
> - Instance A: p99 = 100ms (nhưng chỉ 10 req/s)
> - Instance B: p99 = 1000ms (và 1000 req/s, đang quá tải)
>
> Average = (100 + 1000)/2 = **550ms** — con số này **không tồn tại** trong thực tế. p99 thật của toàn hệ thống (gộp request) gần 1000ms vì B chiếm 99% traffic. **Quantile không cộng/trung bình được.** Phải gộp **buckets thô** rồi tính lại quantile trên tổng:
>
> \`\`\`promql
> histogram_quantile(0.99, sum(rate(..._bucket[5m])) by (le))
> \`\`\`

> 📝 **Tóm tắt mục 15.** Tránh: label vô hạn, tự trừ counter, gauge cho latency, dư metric, và đặc biệt **không average quantile** — luôn gộp bucket thô trước.

---

## Bài tập

> Làm trước, xem [Lời giải chi tiết](#lời-giải-chi-tiết) sau. Tham khảo [solutions.go](./solutions.go) cho code chạy được và [visualization.html](./visualization.html) để xem mô phỏng.

1. **BT1 — Instrument HTTP handler.** Thêm vào một handler: (a) counter \`http_requests_total{method,status}\`, (b) histogram \`http_request_duration_seconds{method}\`, (c) gauge \`http_in_flight_requests\`. Viết middleware bọc handler để tự động ghi cả 3.

2. **BT2 — RED cho 1 service.** Liệt kê chính xác metric (tên + type + label) để phủ đủ Rate, Errors, Duration cho một REST API \`/orders\`.

3. **BT3 — PromQL.** Viết 3 truy vấn: (a) request rate tổng (req/s); (b) error rate dạng % (5xx); (c) p99 latency.

4. **BT4 — High cardinality.** Cho metric \`api_calls_total{endpoint, user_email, request_id}\`. Chỉ ra vấn đề, tính cardinality tệ nhất, và sửa lại label set.

5. **BT5 — Thiết kế bucket.** API thanh toán có latency thực tế: 70% < 50ms, 25% trong 50–300ms, 5% trong 300ms–2s (đuôi do gọi bank). Đề xuất bucket hợp lý và giải thích.

6. **BT6 — Alert rule.** Viết alert rule fire khi error rate (5xx) > 5% kéo dài 5 phút, severity = page.

---

## Lời giải chi tiết

### Lời giải BT1 — Instrument HTTP handler

**Cách tiếp cận.** Khai báo 3 metric ở package scope (register 1 lần). Viết middleware nhận \`next http.Handler\`, bọc \`ResponseWriter\` để bắt status code, đo thời gian, ghi metric.

\`\`\`go
var (
    reqTotal = promauto.NewCounterVec(prometheus.CounterOpts{
        Name: "http_requests_total", Help: "Tổng request.",
    }, []string{"method", "status"})

    reqDur = promauto.NewHistogramVec(prometheus.HistogramOpts{
        Name: "http_request_duration_seconds", Help: "Latency.",
        Buckets: prometheus.DefBuckets,
    }, []string{"method"})

    inFlight = promauto.NewGauge(prometheus.GaugeOpts{
        Name: "http_in_flight_requests", Help: "Request đang xử lý.",
    })
)

// statusRecorder bọc ResponseWriter để lấy status code thực tế.
type statusRecorder struct {
    http.ResponseWriter
    code int
}
func (r *statusRecorder) WriteHeader(c int) { r.code = c; r.ResponseWriter.WriteHeader(c) }

func instrument(next http.Handler) http.Handler {
    return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
        inFlight.Inc()
        defer inFlight.Dec()                       // luôn giảm dù panic/return sớm

        rec := &statusRecorder{ResponseWriter: w, code: 200}
        start := time.Now()

        next.ServeHTTP(rec, r)                      // chạy handler thật

        dur := time.Since(start).Seconds()
        reqTotal.WithLabelValues(r.Method, strconv.Itoa(rec.code)).Inc()
        reqDur.WithLabelValues(r.Method).Observe(dur)
    })
}
\`\`\`

**Giải thích từng bước.** \`inFlight.Inc()\` ngay đầu + \`defer Dec()\` đảm bảo gauge luôn cân bằng. \`statusRecorder\` cần thiết vì \`http.ResponseWriter\` không cho đọc lại status đã ghi — ta chặn \`WriteHeader\`. \`Observe(dur)\` đẩy giá trị vào histogram (rơi vào bucket phù hợp). **Độ phức tạp:** O(1) mỗi request (Inc/Observe là thao tác hằng số với atomic). Xem cài đặt mô phỏng đầy đủ trong \`solutions.go\`.

### Lời giải BT2 — RED cho \`/orders\`

| Chữ | Metric | Type | Labels | Ghi chú |
|-----|--------|------|--------|---------|
| Rate | \`http_requests_total\` | counter | \`{method, endpoint="/orders"}\` | \`rate()\` ra req/s |
| Errors | \`http_requests_total\` | counter | \`{status=~"5.."}\` lọc lúc query | Tận dụng cùng counter, lọc bằng label status |
| Duration | \`http_request_duration_seconds\` | histogram | \`{method, endpoint="/orders"}\` | \`histogram_quantile\` ra p50/p99 |

**Điểm mấu chốt:** Rate và Errors **dùng chung một counter** \`http_requests_total\` — Errors chỉ là tập con lọc theo \`status=~"5.."\`. Không cần counter lỗi riêng. Như vậy chỉ cần **2 metric** (1 counter + 1 histogram) phủ đủ RED.

### Lời giải BT3 — PromQL

\`\`\`promql
# (a) Request rate tổng (req/s)
sum(rate(http_requests_total[5m]))

# (b) Error rate dạng % (5xx)
100 *
  sum(rate(http_requests_total{status=~"5.."}[5m]))
  /
  sum(rate(http_requests_total[5m]))

# (c) p99 latency
histogram_quantile(0.99,
  sum(rate(http_request_duration_seconds_bucket[5m])) by (le))
\`\`\`

**Giải thích.** (a) \`rate\` ra req/s từng series, \`sum\` gộp lại. (b) tử = rate của riêng 5xx, mẫu = rate tất cả; nhân 100 ra phần trăm. (c) \`rate\` trên \`_bucket\` để đổi counter tích lũy thành tốc độ, \`sum by (le)\` gộp các instance **giữ chiều le**, rồi \`histogram_quantile\` nội suy (mục 13).

### Lời giải BT4 — High cardinality

**Vấn đề.** \`user_email\` và \`request_id\` là **unbounded** — mỗi user/mỗi request là một giá trị mới.

**Cardinality tệ nhất:** giả sử 20 endpoint, 1 triệu user, mỗi request_id duy nhất (vô hạn). Vì \`request_id\` không lặp, **mỗi request tạo 1 series mới vĩnh viễn** → cardinality tăng không giới hạn → Prometheus OOM trong ít phút.

**Sửa:**

\`\`\`
# SAI
api_calls_total{endpoint, user_email, request_id}

# ĐÚNG
api_calls_total{endpoint, status}     # cả 2 đều low-cardinality
\`\`\`

Bỏ \`user_email\` và \`request_id\` khỏi label. Nếu cần điều tra theo user/request cụ thể → ghi vào **structured log** (Lesson 72) hoặc **trace** (Lesson 74) với các trường đó; metric chỉ giữ chiều tổng hợp.

### Lời giải BT5 — Thiết kế bucket

Phân phối: 70% < 50ms, 25% trong 50–300ms, 5% trong 300ms–2s.

**Đề xuất:**
\`\`\`go
Buckets: []float64{0.005, 0.01, 0.025, 0.05, 0.1, 0.2, 0.3, 0.5, 1, 2}
//                  5ms  10ms 25ms  50ms 100ms 200ms 300ms 500ms 1s 2s
\`\`\`

**Giải thích.**
- **Vùng dày 5–50ms** (5,10,25,50): chứa 70% traffic, cần độ phân giải cao để p50/p75 chính xác.
- **Vùng 50–300ms** (100,200,300): 25% traffic, đặt mốc để bắt p90.
- **Đuôi 300ms–2s** (500ms,1s,2s): 5% traffic nhưng là phần quyết định p99 (đuôi do gọi bank). Cần bucket tới 2s để không dồn hết vào \`+Inf\`.
- Nếu chỉ dùng \`DefBuckets\` (tới 10s) thì vùng 5–50ms quá ít mốc và có bucket 5s/10s thừa.

### Lời giải BT6 — Alert rule

\`\`\`yaml
groups:
- name: orders-api
  rules:
  - alert: OrdersHighErrorRate
    expr: |
      sum(rate(http_requests_total{endpoint="/orders",status=~"5.."}[5m]))
        /
      sum(rate(http_requests_total{endpoint="/orders"}[5m]))
        > 0.05
    for: 5m
    labels:
      severity: page
    annotations:
      summary: "Orders API error rate > 5%"
      description: "5xx rate hiện tại = {{ $value | humanizePercentage }} (ngưỡng 5%)."
\`\`\`

**Giải thích.** \`expr\` tính tỷ lệ 5xx / tổng, so \`> 0.05\` (5%). \`for: 5m\` buộc điều kiện đúng **liên tục 5 phút** mới fire — chống alert nhiễu do spike tức thời. \`severity: page\` để Alertmanager route tới on-call (đánh thức người trực) thay vì chỉ tạo ticket.

---

## Tóm tắt toàn bài

- **Metrics** = số liệu tổng hợp theo thời gian; trụ thứ 2 trong observability (logs/metrics/traces).
- **Prometheus** = TSDB **pull-based**, scrape \`/metrics\` mỗi N giây.
- **4 type:** Counter (chỉ tăng, dùng rate), Gauge (lên xuống), Histogram (buckets, quantile server, cộng được), Summary (quantile client, không cộng).
- **Labels** thêm chiều nhưng coi chừng **cardinality explosion** — không label unbounded.
- **RED** (service: Rate/Errors/Duration) + **USE** (resource: Utilization/Saturation/Errors).
- **PromQL:** \`rate()\`, \`histogram_quantile(...)\`, error rate %.
- **Quantile** tính từ buckets bằng nội suy tuyến tính — bucket quyết định độ chính xác.
- **Alerting** qua rules + Alertmanager; **Grafana** để visualize.
- **Pitfalls:** high cardinality, tự trừ counter, sai type, average quantile.

## Bài tiếp theo

- [Lesson 74 — Tracing & OpenTelemetry](../lesson-74-tracing-opentelemetry/) — trụ thứ 3: theo dấu một request đi qua nhiều service.
- Quay lại [Lesson 72 — Structured Logging](../lesson-72-structured-logging/) — trụ logs.
- Tham khảo [Lesson 33 — Memory & GC](../lesson-33-memory-gc/) để hiểu các default Go runtime metrics.
`;
