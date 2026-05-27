// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: Programming/lesson-84-capstone-deploy-observe/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 84 — Capstone: Deploy & Observe

> Tier 8 (Capstone) · **LESSON CUỐI CÙNG của toàn lộ trình Programming** · Lấy service URL Shortener đã implement ở [Lesson 83](../lesson-83-capstone-implement/) và đưa nó lên production: dockerize → deploy Kubernetes → thêm observability (log/metrics/trace) → load test → runbook → SLO.

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Viết được **Dockerfile multi-stage** sinh image production **< 20MB**, chạy **non-root**, dùng base \`scratch\`/\`distroless\`.
- Cài đủ **3 trụ observability**: structured logging (slog JSON), metrics (Prometheus, RED method), tracing (OTel) — và *propagate* context qua async worker.
- Deploy lên **Kubernetes** đầy đủ: Deployment + Service + Ingress + ConfigMap + Secret + HPA, chạy trên **kind** cluster local.
- Cài **graceful shutdown** đúng: drain in-flight redirect + flush click queue trước khi exit.
- Dựng **CI/CD** GitHub Actions: build → test → docker → push → deploy.
- Chạy **load test** (k6/hey), đọc p50/p99 + error rate, **tìm bottleneck** rồi optimize, đo before/after.
- Dựng **Grafana dashboard** + **alert** dựa trên RED metrics.
- Định nghĩa **SLO** + tính **error budget**; viết **runbook** xử lý sự cố.
- Hoàn thành **production checklist** và nhìn lại toàn bộ lộ trình T0→T8.

## Kiến thức tiền đề

Bài này là điểm hội tụ — nó *dùng lại* gần như mọi lesson production:

- [Lesson 83 — Capstone Implement](../lesson-83-capstone-implement/) — service ta sắp deploy.
- [Lesson 75 — Docker Multi-stage](../lesson-75-docker-multistage/) — build image nhỏ.
- [Lesson 72 — Structured Logging](../lesson-72-structured-logging/) — slog JSON.
- [Lesson 73 — Metrics & Prometheus](../lesson-73-metrics-prometheus/) — counter/histogram/gauge, RED.
- [Lesson 74 — Tracing & OpenTelemetry](../lesson-74-tracing-opentelemetry/) — span, trace propagation.
- [Lesson 76 — Kubernetes Basics](../lesson-76-kubernetes-basics/) — Deployment/Service/Ingress/HPA.
- [Lesson 77 — CI/CD Pipeline](../lesson-77-ci-cd-pipeline/) — GitHub Actions.
- [Lesson 51 — Graceful Shutdown](../lesson-51-graceful-shutdown/) — drain trước exit.
- [Lesson 81 — Incident & Postmortem](../lesson-81-incident-postmortem/) — SLO, error budget, runbook.
- [Lesson 34 — Profiling pprof](../lesson-34-profiling-pprof/) — tìm bottleneck.
- [Lesson 52 — Rate Limiting & Circuit Breaker](../lesson-52-rate-limiting-circuit-breaker/) — bảo vệ service.

---

## 1. Recap — ta đang đứng ở đâu?

> 💡 **Trực giác / Hình dung.** Hãy hình dung 3 lesson capstone như xây một ngôi nhà: **L82 (Design)** là bản vẽ kiến trúc — phòng nào ở đâu, móng chịu lực ra sao. **L83 (Implement)** là xây xong phần thô — tường, mái, điện nước chạy được trong nhà. **L84 (lesson này)** là *dọn vào ở thật*: lắp công tơ điện (metrics), gắn camera an ninh (logging/tracing), nối vào lưới điện thành phố (Kubernetes), mời khách tới đông (load test) và viết sổ tay "khi mất điện thì bật cầu dao nào" (runbook). Nhà xây đẹp mà không có điện kế, không biết khi nào quá tải, mất điện không biết sửa — thì không ai dám ở.

Nhắc lại spec dự án (nhất quán L82 design, L83 implement) — **URL Shortener có Analytics**:

| Endpoint | Mô tả | Đặc tính |
|----------|-------|----------|
| \`POST /api/shorten\` | Nhận URL dài → trả short code | Write, ít QPS |
| \`GET /{code}\` | Redirect tới URL gốc + ghi nhận click (async) | **Read-heavy, đường nóng** |
| \`GET /api/stats/{code}\` | Trả số liệu click | Read, vừa phải |

Kiến trúc đã có sau L83:

\`\`\`
Client ──HTTP──> [URL Shortener service]
                   ├─ Postgres   (source of truth: code -> URL, click count)
                   ├─ Redis      (cache: code -> URL, giảm tải DB)
                   └─ Click queue (async worker ghi click, KHÔNG chặn redirect)
\`\`\`

Điểm mấu chốt cho L84: redirect là **đường nóng read-heavy** — phải nhanh (p99 < 50ms), chịu được 1000+ req/s, và **không bao giờ để việc ghi click làm chậm việc redirect**. Click được đẩy vào queue, worker xử lý sau.

> 📝 **Tóm tắt mục 1.**
> - L82 = design, L83 = code chạy local, **L84 = đưa lên production + quan sát được**.
> - Đường nóng cần tối ưu là \`GET /{code}\` redirect — read-heavy.
> - Async click queue tách việc ghi click khỏi latency redirect.

---

## 2. Dockerize — image < 20MB, non-root (Lesson 75)

> 💡 **Trực giác.** Một image Docker giống một "hộp cơm mang đi": bạn chỉ cần *đồ ăn* (binary), không cần mang theo cả *cái bếp* (compiler, package manager, shell). Image \`golang:1.24\` nặng ~800MB vì có cả bếp. Ta nấu xong (build) trong bếp rồi chỉ **bỏ phần cơm sang hộp rỗng** (\`scratch\`) — ra image vài MB.

### 2.1 Multi-stage: tách build khỏi runtime

\`\`\`dockerfile
# STAGE 1 — builder: có toolchain, build binary tĩnh
FROM golang:1.24-alpine AS builder
WORKDIR /src
COPY go.mod go.sum* ./
RUN go mod download              # cache layer: chỉ tải lại dep khi go.mod đổi
COPY . .
RUN CGO_ENABLED=0 go build \\
      -trimpath \\
      -ldflags="-s -w" \\
      -o /out/urlshortener ./cmd/server

# STAGE 2 — runtime: scratch rỗng, chỉ binary + certs
FROM scratch
COPY --from=builder /etc/ssl/certs/ca-certificates.crt /etc/ssl/certs/
COPY --from=builder /out/urlshortener /urlshortener
USER 65532:65532
ENTRYPOINT ["/urlshortener"]
\`\`\`

Giải thích từng flag (đây là chỗ người ta hay copy-paste mà không hiểu):

| Flag | Tác dụng | Vì sao quan trọng |
|------|----------|-------------------|
| \`CGO_ENABLED=0\` | Binary tĩnh, không link libc | Chạy được trên \`scratch\` (không có libc) |
| \`-trimpath\` | Bỏ path tuyệt đối máy build | Reproducible + không lộ \`/home/duy/...\` |
| \`-ldflags="-s -w"\` | Bỏ symbol table (\`-s\`) + DWARF debug (\`-w\`) | Giảm ~30% size binary |
| \`-X main.Version=...\` | Nhúng version vào binary | \`/healthz\` báo cáo version đang chạy |

### 2.2 Tại sao image nhỏ lại quan trọng (số cụ thể)

Đo thực tế cùng 1 service URL Shortener:

| Cách build | Base image | Size cuối | Cold pull |
|------------|-----------|----------:|----------:|
| Naive (1 stage) | \`golang:1.24\` | **~850 MB** | ~25s |
| Alpine 1 stage | \`alpine\` + binary | ~25 MB | ~2s |
| **Multi-stage scratch** | \`scratch\` | **~12 MB** | **~0.5s** |

Image nhỏ → pull nhanh khi scale (HPA thêm pod), bề mặt tấn công nhỏ (scratch không có shell/curl → kẻ tấn công lọt vào cũng không có công cụ), CVE scanner báo ít lỗi hơn (ít package).

> ⚠ **Lỗi thường gặp.**
> - **Quên \`CGO_ENABLED=0\`** → binary cần libc → \`scratch\` báo \`no such file or directory\` lúc start (rất khó hiểu, vì lỗi không nói rõ là thiếu libc).
> - **Copy nhầm thứ tự**: \`COPY . .\` trước \`go mod download\` → mỗi lần đổi 1 dòng code phải tải lại toàn bộ dependency (cache miss). Luôn copy \`go.mod\`/\`go.sum\` trước.
> - **Chạy root trong container** (mặc định). Quên \`USER\` → nếu app bị RCE, kẻ tấn công là root trong container. Luôn non-root.
> - **\`HEALTHCHECK\` trong Dockerfile dùng \`curl\`** → \`scratch\` không có curl → fail. Trên K8s dùng \`httpGet\` probe thay vì \`HEALTHCHECK\`.

> ❓ **Câu hỏi tự nhiên của người đọc.**
> - *"\`scratch\` vs \`distroless\` chọn cái nào?"* → \`scratch\` nhỏ nhất nhưng KHÔNG debug được (không exec vào). \`gcr.io/distroless/static\` lớn hơn ~2MB, có sẵn certs + \`/etc/passwd\` + (bản \`:debug\`) có shell. Production thường chọn distroless để debug được.
> - *"Sao không nén bằng UPX cho nhỏ nữa?"* → UPX giải nén lúc start → cold start chậm + một số scanner cảnh báo "packed binary". Với service cần scale nhanh, không nên.
> - *"Image 12MB rồi, tối ưu thêm có đáng?"* → Không. Dừng ở đây. Tối ưu thêm là *gold-plating*.

> 🔁 **Dừng lại tự kiểm tra.**
> 1. Vì sao \`CGO_ENABLED=0\` bắt buộc khi dùng \`scratch\`?
> 2. \`-s -w\` trong ldflags làm gì?
> <details><summary>Đáp án</summary>
> 1. \`scratch\` không có libc; CGO bật → binary link động vào libc → start fail. Tắt CGO → binary tĩnh, tự chứa.
> 2. \`-s\` bỏ symbol table, \`-w\` bỏ DWARF debug info → binary nhỏ hơn ~30%, đổi lại không debug bằng gdb được (chấp nhận được ở production).
> </details>

> 📝 **Tóm tắt mục 2.** Multi-stage = build trong image to, ship binary trong image rỗng. \`CGO_ENABLED=0\` + \`scratch\` + \`-ldflags="-s -w"\` + \`USER nonroot\` → image ~12MB, an toàn, pull nhanh.

---

## 3. Observability — 3 trụ (Lessons 72, 73, 74)

> 💡 **Trực giác.** Observability = khả năng *trả lời câu hỏi về hệ thống mà không cần deploy code mới*. 3 trụ trả lời 3 loại câu hỏi khác nhau:
> - **Logs** → *"Chuyện gì đã xảy ra ở request cụ thể này?"* (sự kiện rời rạc, chi tiết).
> - **Metrics** → *"Hệ thống đang khoẻ không? Xu hướng ra sao?"* (số tổng hợp, rẻ, theo thời gian).
> - **Traces** → *"Request này chậm ở BƯỚC nào trong chuỗi xử lý?"* (đường đi qua các thành phần).
>
> Ví dụ đời thực: bác sĩ khám bệnh. Metrics = nhiệt kế + huyết áp (số tổng quát, đo liên tục, rẻ). Logs = lời kể bệnh nhân (chi tiết từng triệu chứng). Traces = chụp X-quang theo dõi máu chảy qua từng cơ quan (thấy tắc ở đâu).

### 3.1 Trụ 1 — Structured Logging (slog JSON)

Log phải là **JSON có cấu trúc**, không phải text tự do. Lý do: log JSON query được theo field (\`status=500 AND path="/api/shorten"\`), text thì phải regex mong manh.

\`\`\`go
logger := slog.New(slog.NewJSONHandler(os.Stdout, &slog.HandlerOptions{Level: slog.LevelInfo}))
logger.Info("http.request", "method", "GET", "path", "/abcd", "status", 302, "duration_ms", 4)
\`\`\`

In ra (1 dòng = 1 JSON object, dễ index):

\`\`\`json
{"ts":"2026-05-27T04:29:13Z","level":"INFO","msg":"http.request","method":"GET","path":"/abcd","status":302,"duration_ms":4}
\`\`\`

**Correlation qua request ID** — đây là phần hay bị bỏ sót. Một redirect sinh ra: (1) log của request HTTP, (2) log của worker xử lý click *sau đó, ở goroutine khác*. Nếu không có ID chung, hai log này rời rạc, không nối được.

\`\`\`go
const requestIDKey ctxKey = "request_id"

// Middleware gắn request_id vào context
rid := r.Header.Get("X-Request-Id")
if rid == "" { rid = genID() }
ctx := context.WithValue(r.Context(), requestIDKey, rid)

// Khi đẩy click vào queue, MANG THEO request_id/trace_id
queue <- clickJob{code: code, traceID: rid}

// Worker log CÙNG request_id -> nối được chuỗi
loggerFromCtx(ctx, base).Info("worker.process_click", "code", code)
\`\`\`

Giờ grep \`request_id=abc123\` ra cả 2 dòng — "request đến, rồi click được ghi" thành 1 câu chuyện liền mạch.

### 3.2 Trụ 2 — Metrics (Prometheus, RED method)

> 💡 **Trực giác RED.** Với mọi service request-driven, chỉ cần 3 nhóm metric là biết nó khoẻ hay ốm:
> - **R**ate — bao nhiêu request/giây? (tải)
> - **E**rrors — bao nhiêu % lỗi? (chất lượng)
> - **D**uration — chậm cỡ nào (p50/p99)? (trải nghiệm)
>
> RED là "3 chỉ số sinh tồn" của service — như mạch, huyết áp, nhịp thở của con người.

4 metric bắt buộc cho service này (đề bài), ánh xạ vào kiểu Prometheus:

| Metric | Kiểu | RED | Trả lời câu hỏi |
|--------|------|-----|-----------------|
| \`http_requests_total{path,status}\` | Counter | Rate + Errors | Tải bao nhiêu? Lỗi bao nhiêu %? |
| \`http_request_duration_seconds{path}\` | Histogram | Duration | p50/p99 latency? |
| \`cache_hit_ratio\` | Gauge | — | Cache có hiệu quả không? |
| \`click_queue_depth\` | Gauge | — | Worker có theo kịp không? |
| \`clicks_processed_total\` | Counter | — | Worker đã xử lý bao nhiêu click? |

**Vì sao mỗi kiểu khác nhau** (định nghĩa tự đủ):

- **Counter** — *chỉ tăng*, không bao giờ giảm (trừ khi process restart về 0). Dùng cho thứ "đếm dồn": tổng request, tổng click. Câu hỏi đặt lên counter luôn là *tốc độ tăng*: \`rate(http_requests_total[1m])\` = req/s. Ví dụ số cụ thể: counter từ 12000 lúc 10:00:00 lên 12600 lúc 10:00:10 → rate = (12600−12000)/10 = **60 req/s**.
- **Gauge** — *lên xuống tự do*, đo "giá trị hiện tại". \`click_queue_depth\` lúc rảnh = 0, lúc bão = 3500. \`cache_hit_ratio\` = 0.92 nghĩa 92% request lấy được từ cache. Ví dụ: hits=920, misses=80 → ratio = 920/(920+80) = **0.92**.
- **Histogram** — *phân phối* giá trị, để tính quantile. Latency KHÔNG dùng average (trung bình che giấu đuôi xấu): nếu 99 request 5ms + 1 request 5000ms thì avg = 54.9ms nhìn "ổn", nhưng p99 = 5000ms — có 1% user đau khổ. Histogram cho biết **p99 = 5000ms** → thấy ngay đuôi.

> ⚠ **Lỗi thường gặp với latency.** Dùng **average latency** để đánh giá. Avg che đuôi. Luôn nhìn **p99** (và p999 nếu khắt khe). Một service "avg 10ms" có thể có "p99 800ms" — 1% user trải nghiệm tệ, đủ để mất khách.

\`/metrics\` endpoint — Prometheus *scrape* (kéo) mỗi 15s:

\`\`\`
# HELP http_requests_total Tổng số HTTP request
# TYPE http_requests_total counter
http_requests_total 124500
# TYPE cache_hit_ratio gauge
cache_hit_ratio 0.92
# TYPE click_queue_depth gauge
click_queue_depth 12
\`\`\`

> ❓ **Câu hỏi tự nhiên.**
> - *"Push hay pull?"* → Prometheus **pull** (tự đến scrape \`/metrics\`). Ưu điểm: Prometheus biết target nào "im lặng" (down) vì scrape fail; service không cần biết Prometheus ở đâu.
> - *"Đếm metric có làm chậm request không?"* → Counter.Inc() là 1 atomic add (~vài ns), không đáng kể. Histogram.Observe() cũng rẻ. Đừng tối ưu sớm chuyện này.
> - *"Cardinality là gì mà ai cũng cảnh báo?"* → Mỗi tổ hợp label = 1 time series riêng. Nếu thêm label \`user_id\` (hàng triệu giá trị) → hàng triệu series → Prometheus OOM. **KHÔNG để label có cardinality cao** (user_id, request_id, URL đầy đủ). Chỉ label giá trị hữu hạn: \`status\`, \`method\`, \`path\` (đã chuẩn hoá).

### 3.3 Trụ 3 — Tracing (OpenTelemetry)

> 💡 **Trực giác.** Trace giống *bưu kiện có mã vận đơn*. Một redirect đi qua: HTTP handler → cache lookup → đẩy vào queue → worker ghi DB. Mỗi chặng là một **span** (có start/end + thuộc tính). Tất cả span của cùng 1 request mang chung 1 **trace_id** (mã vận đơn) → ghép lại thành cây, thấy *chặng nào lâu*.

\`\`\`go
ctx, span := tracer.Start(r.Context(), "redirect")
defer span.End()
span.SetAttr("code", code)
span.SetAttr("cache", "hit")   // hay "miss"
\`\`\`

**Propagate qua async worker** — điểm khó nhất. Worker chạy ở goroutine khác, context HTTP đã hết. Phải *mang trace_id theo job*:

\`\`\`go
tid, _ := ctx.Value(traceIDKey).(string)
queue <- clickJob{code: code, traceID: tid}   // gửi trace_id kèm job

// Trong worker: tái tạo context với CÙNG trace_id
ctx := context.WithValue(context.Background(), traceIDKey, job.traceID)
_, span := tracer.Start(ctx, "worker.process_click")  // span con cùng trace
\`\`\`

Kết quả: trên Jaeger/Tempo bạn thấy 1 trace \`redirect\` → có span con \`worker.process_click\` *dù nó xảy ra sau, ở goroutine khác* — biết được "redirect trả về 4ms, nhưng click được ghi 200ms sau khi worker bận".

> 🔁 **Dừng lại tự kiểm tra.**
> 1. Khi nào dùng log, khi nào dùng metric để điều tra "tại sao p99 tăng"?
> 2. Vì sao latency phải xem p99 chứ không xem average?
> <details><summary>Đáp án</summary>
> 1. **Metric** trước: dashboard cho thấy *khi nào* p99 tăng + tương quan (cache_hit_ratio giảm? queue_depth tăng?). **Trace** để thấy *chặng nào* chậm. **Log** để xem chi tiết request lỗi cụ thể. Đi từ tổng quan (metric) → khoanh vùng (trace) → chi tiết (log).
> 2. Average bị kéo bởi số đông request nhanh, che mất đuôi chậm. p99 = "request chậm thứ 1% từ dưới lên" — phản ánh trải nghiệm tệ nhất của 1% user, thứ làm họ bỏ đi.
> </details>

> 📝 **Tóm tắt mục 3.** Logs (sự kiện chi tiết, có request_id để correlate) + Metrics (RED: Rate/Errors/Duration, đừng dùng cardinality cao) + Traces (span theo trace_id, propagate qua worker). Code wiring đầy đủ ở [\`solutions/observability.go\`](./solutions/observability.go) — build + chạy được.

---

## 4. Kubernetes deploy (Lesson 76)

> 💡 **Trực giác.** Kubernetes (K8s) là "người quản lý nhà hàng tự động": bạn nói *"tôi muốn LUÔN có 3 đầu bếp (replica) phục vụ"*, K8s lo phần còn lại — đầu bếp ốm (pod crash) thì thuê người thay, đông khách (CPU cao) thì gọi thêm (HPA), khách vào cửa nào (Ingress) thì dẫn tới bàn trống (Service load-balance). Bạn khai báo **trạng thái mong muốn**, K8s liên tục kéo thực tế về khớp.

### 4.1 Các tài nguyên cần

| Tài nguyên | Vai trò | File |
|------------|---------|------|
| **Deployment** | Quản lý replica + rolling update + probe | [\`deployment.yaml\`](./solutions/k8s/deployment.yaml) |
| **Service** | 1 IP/DNS ổn định load-balance qua pod | [\`service.yaml\`](./solutions/k8s/service.yaml) |
| **Ingress** | Định tuyến HTTP từ ngoài vào (/api + /{code}) | [\`ingress.yaml\`](./solutions/k8s/ingress.yaml) |
| **ConfigMap** | Config non-sensitive (PORT, REDIS_ADDR) | [\`configmap.yaml\`](./solutions/k8s/configmap.yaml) |
| **Secret** | DB creds (nhạy cảm) | [\`secret.yaml\`](./solutions/k8s/secret.yaml) |
| **HPA** | Tự scale theo CPU/QPS | [\`hpa.yaml\`](./solutions/k8s/hpa.yaml) |

### 4.2 Deployment: replica, resource, probes

\`\`\`yaml
spec:
  replicas: 3
  strategy:
    rollingUpdate:
      maxSurge: 1
      maxUnavailable: 0   # zero-downtime: pod mới Ready rồi mới giết pod cũ
  template:
    spec:
      containers:
        - name: urlshortener
          resources:
            requests: { cpu: "100m", memory: "64Mi" }   # cấp tối thiểu (scheduling + HPA %)
            limits:   { cpu: "500m", memory: "128Mi" }   # trần cứng
          readinessProbe:  { httpGet: { path: /healthz, port: http } }  # có nhận traffic?
          livenessProbe:   { httpGet: { path: /healthz, port: http } }  # còn sống?
          startupProbe:    { httpGet: { path: /healthz, port: http } }  # warmup
\`\`\`

**3 loại probe khác nhau** (cực hay nhầm):

- **readinessProbe** — *"Pod đã sẵn sàng nhận traffic chưa?"* Fail → K8s **gỡ pod khỏi Service** (không gửi request) nhưng **không restart**. Dùng khi pod đang warmup hoặc dependency tạm chưa nối được.
- **livenessProbe** — *"Pod còn sống không?"* Fail liên tục → kubelet **restart** pod. ⚠ **KHÔNG check Redis/DB trong liveness** — nếu Redis down, liveness fail → mọi pod bị restart đồng loạt → cascading failure. Liveness chỉ check "process còn chạy".
- **startupProbe** — cho service khởi động chậm thời gian warmup trước khi liveness bắt đầu chấm (tránh bị giết lúc cold start).

> ⚠ **Lỗi kinh điển: liveness check dependency.** Đặt \`livenessProbe\` gọi endpoint mà *bên trong có ping Redis*. Redis chập chờn 5 giây → toàn bộ 20 pod fail liveness → K8s restart tất cả cùng lúc → service sập hoàn toàn dù Redis chỉ hiccup. **Liveness phải nhẹ, độc lập dependency.** Dependency check để cho readiness.

> ⚠ **Lỗi: quên resource limit.** Không đặt \`limits.memory\` → 1 pod rò rỉ memory ăn hết RAM node → kéo sập các pod khác trên cùng node (noisy neighbor). Luôn đặt limit. Không đặt \`requests\` → HPA không tính được % CPU.

### 4.3 HPA: tự scale

\`\`\`yaml
spec:
  minReplicas: 3
  maxReplicas: 20
  metrics:
    - type: Resource          # scale theo CPU
      resource: { name: cpu, target: { type: Utilization, averageUtilization: 70 } }
    - type: Pods              # scale theo QPS (custom metric)
      pods: { metric: { name: http_requests_per_second }, target: { averageValue: "200" } }
  behavior:
    scaleDown: { stabilizationWindowSeconds: 300 }  # chờ 5 phút mới scale xuống (chống flapping)
\`\`\`

Ví dụ số: mỗi pod xử lý tốt ~200 req/s. Tải tăng lên 1000 req/s → cần \`ceil(1000/200) = 5\` pod → HPA scale từ 3 lên 5. Tải về 400 req/s → cần 2, nhưng \`minReplicas=3\` → giữ 3, và chờ 5 phút (stabilization) mới giảm để tránh giật.

### 4.4 kind cluster local

\`\`\`bash
kind create cluster --name urlshortener      # tạo cluster Docker-in-Docker
kubectl cluster-info --context kind-urlshortener
make kind-load                                # nạp image vào kind (bỏ qua registry)
kubectl apply -f k8s/                          # apply toàn bộ manifest
kubectl rollout status deployment/urlshortener
kubectl port-forward svc/urlshortener 8080:80  # truy cập từ máy
\`\`\`

> ❓ **Câu hỏi tự nhiên.**
> - *"Pod, Deployment, ReplicaSet khác gì?"* → Pod = đơn vị chạy nhỏ nhất (1+ container). ReplicaSet = đảm bảo N pod sống. Deployment = quản lý ReplicaSet + rolling update (tạo RS mới, chuyển dần). Bạn khai báo Deployment, K8s lo RS + Pod.
> - *"Vì sao cần Service khi pod đã có IP?"* → Pod IP thay đổi mỗi lần restart/scale. Service cho 1 DNS *cố định* (\`urlshortener.default.svc\`) + tự load-balance qua pod đang Ready.
> - *"ConfigMap vs Secret?"* → Cùng inject env, nhưng Secret để dữ liệu nhạy cảm (chỉ base64, KHÔNG mã hoá — cần encryption-at-rest hoặc external secret manager ở production).

> 📝 **Tóm tắt mục 4.** Deployment (replica + zero-downtime rollout + 3 probe) + Service (DNS ổn định) + Ingress (route /api & /{code}) + ConfigMap/Secret (config tách code) + HPA (scale CPU 70% & QPS 200/pod). Liveness KHÔNG check dependency. Luôn đặt resource requests/limits.

---

## 5. Graceful shutdown (Lesson 51)

> 💡 **Trực giác.** Khi K8s rollout hay scale-down, nó gửi **SIGTERM** rồi đợi \`terminationGracePeriodSeconds\` (mặc định 30s) trước khi **SIGKILL** (giết cứng). Graceful shutdown = "đóng cửa hàng lịch sự": *ngừng nhận khách mới, phục vụ nốt khách đang trong quán, dọn dẹp (flush queue), rồi mới tắt đèn*. Nếu SIGKILL ngay → redirect đang dở bị cắt (user thấy lỗi), click trong queue chưa flush → **mất dữ liệu analytics**.

\`\`\`go
func main() {
    srv := &http.Server{Addr: ":8080", Handler: handler}
    go srv.ListenAndServe()

    // Chờ tín hiệu dừng
    stop := make(chan os.Signal, 1)
    signal.Notify(stop, syscall.SIGTERM, syscall.SIGINT)
    <-stop

    log.Info("nhận SIGTERM, bắt đầu graceful shutdown")

    // 1) Ngừng nhận request mới + drain in-flight redirect (đợi tối đa 15s)
    ctx, cancel := context.WithTimeout(context.Background(), 15*time.Second)
    defer cancel()
    srv.Shutdown(ctx)   // không nhận conn mới, chờ request đang chạy xong

    // 2) Đóng click queue + chờ worker flush nốt
    close(clickQueue)
    workerWG.Wait()     // worker xử lý hết job còn lại rồi return

    log.Info("graceful shutdown hoàn tất")
}
\`\`\`

**Phối hợp với K8s** (chi tiết hay bị sót):

1. \`preStop: sleep 5\` trong Deployment → cho Ingress/Endpoints kịp gỡ pod khỏi rotation *trước khi* SIGTERM. Nếu không, có "race": pod nhận SIGTERM nhưng Service vẫn route request tới nó vài trăm ms → request lỗi.
2. \`terminationGracePeriodSeconds: 30\` phải **≥** tổng thời gian (preStop sleep + drain + flush). Nếu drain cần 15s mà grace = 10s → bị SIGKILL giữa chừng.

> ⚠ **Lỗi thường gặp.** Gọi \`srv.Shutdown()\` nhưng **quên flush queue** → in-flight HTTP xong nhưng click trong buffer mất. Hoặc \`terminationGracePeriodSeconds\` quá ngắn → SIGKILL cắt ngang drain. Hoặc quên \`preStop\` → request lỗi trong cửa sổ vài trăm ms lúc gỡ pod.

> 📝 **Tóm tắt mục 5.** SIGTERM → \`srv.Shutdown(ctx)\` drain redirect → \`close(queue)\` + \`wg.Wait()\` flush click → exit. \`preStop sleep 5\` chống race với Service. \`terminationGracePeriodSeconds\` ≥ tổng thời gian drain.

---

## 6. CI/CD (Lesson 77) — tóm tắt

Pipeline GitHub Actions: **build → test → docker → push → deploy**. Mỗi push lên \`main\` chạy tự động.

\`\`\`yaml
name: ci-cd
on: { push: { branches: [main] } }
jobs:
  build-test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-go@v5
        with: { go-version: '1.24' }
      - run: go vet ./... && go test ./...        # gate 1: test phải pass
  docker:
    needs: build-test                              # chỉ chạy nếu test pass
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: docker/build-push-action@v6
        with:
          push: true
          tags: ghcr.io/you/urlshortener:\${{ github.sha }}  # tag = commit SHA
          build-args: VERSION=\${{ github.sha }}
  deploy:
    needs: docker
    runs-on: ubuntu-latest
    steps:
      - run: |
          kubectl set image deployment/urlshortener \\
            urlshortener=ghcr.io/you/urlshortener:\${{ github.sha }}
          kubectl rollout status deployment/urlshortener --timeout=90s
\`\`\`

Nguyên tắc: **tag image bằng commit SHA** (không dùng \`latest\` cho deploy) → biết chính xác commit nào đang chạy, rollback dễ (\`kubectl set image ...:<sha-cũ>\`). Test fail → pipeline dừng, không deploy. Đây là **quality gate** tự động.

> 📝 **Tóm tắt mục 6.** CI/CD = build → test (gate) → docker (tag SHA) → push → \`kubectl set image\` + rollout. Mỗi bước phụ thuộc bước trước pass. Tag SHA để rollback chính xác.

---

## 7. Load testing — tìm và sửa bottleneck

> 💡 **Trực giác.** Load test = "diễn tập đông khách trước khi khai trương thật". Bạn bắn traffic giả với tốc độ tăng dần, quan sát service *gãy ở đâu* — và quan trọng hơn: *gãy như thế nào* (latency tăng từ từ? hay error đột ngột?).

### 7.1 Công cụ & scenario

Dùng **k6** (script ở [\`solutions/loadtest/script.js\`](./solutions/loadtest/script.js)) hoặc load tester Go đơn giản ([\`solutions/loadtest/loadtest.go\`](./solutions/loadtest/loadtest.go)).

Scenario: **1000 req/s vào \`GET /{code}\`** (redirect, read-heavy) trong 1 phút, đo p50/p99/error.

\`\`\`bash
# k6
k6 run -e BASE=http://localhost:8080 loadtest/script.js
# hoặc load tester Go (chạy được ngay, có chế độ -dry mô phỏng)
cd loadtest && go run ./loadtest.go -url http://localhost:8080/r/abcd -rps 1000 -dur 60s -c 100
\`\`\`

\`script.js\` dùng \`ramping-arrival-rate\` (giữ *tốc độ* cố định, không phụ thuộc latency) + threshold = SLO:

\`\`\`js
thresholds: {
  http_req_duration: ['p(99)<50'],   // p99 < 50ms
  http_req_failed:   ['rate<0.01'],  // error < 1%
}
\`\`\`

Vi phạm threshold → k6 exit code ≠ 0 → CI chặn deploy. Load test trở thành **gate**.

### 7.2 Đọc kết quả & tìm bottleneck (before/after)

**Lần 1 (before)** — chạy load test thấy:

\`\`\`
Throughput thực  : 640 req/s   (mục tiêu 1000 — KHÔNG đạt!)
Latency p50      : 8ms
Latency p99      : 420ms        (SLO p99<50ms — VI PHẠM)
Lỗi              : 3.2%
cache_hit_ratio  : 0.55         (thấp!)
click_queue_depth: 3800         (gần đầy buffer 4096!)
\`\`\`

Đọc các dấu hiệu này như "triệu chứng" — đi từ metric khoanh vùng:

1. **p99 = 420ms nhưng p50 = 8ms** → đa số nhanh, *đuôi* chậm. Có gì đó thỉnh thoảng chậm.
2. **cache_hit_ratio = 0.55** → 45% request *miss cache* → phải đi DB → chậm. Đây là nghi phạm số 1 của đuôi.
3. **queue_depth ~3800** → worker không theo kịp → queue sắp đầy → bắt đầu drop click.

Dùng **pprof** (Lesson 34) xác nhận: \`go tool pprof http://.../debug/pprof/profile\` → CPU profile cho thấy phần lớn thời gian ở \`db.QueryRow\` (cache miss path) và contention ở 1 mutex của queue.

**Sửa (2 thay đổi nhỏ, không over-engineer):**
- **Tăng cache TTL** từ 60s → 3600s (\`CACHE_TTL_SECONDS\` trong ConfigMap) — short link gần như bất biến, TTL ngắn vô nghĩa → hit ratio tăng.
- **Tăng số worker** click queue từ 1 → 4 (\`CLICK_WORKERS\`) — queue tiêu thụ nhanh hơn → depth giảm.

**Lần 2 (after):**

\`\`\`
Throughput thực  : 1000 req/s   (đạt mục tiêu)
Latency p50      : 3ms
Latency p99      : 28ms          (SLO p99<50ms — ĐẠT)
Lỗi              : 0.1%
cache_hit_ratio  : 0.94          (đã cao)
click_queue_depth: 12            (worker theo kịp)
\`\`\`

| Chỉ số | Before | After | Cải thiện |
|--------|-------:|------:|-----------|
| Throughput | 640 req/s | 1000 req/s | +56% |
| p99 latency | 420ms | 28ms | **−93%** |
| Error rate | 3.2% | 0.1% | −97% |
| Cache hit | 0.55 | 0.94 | +71% |

> ⚠ **Lỗi thường gặp khi load test.**
> - **Đo từ 1 máy yếu** → bottleneck là *máy bắn*, không phải service. Dùng nhiều worker / nhiều máy.
> - **Follow redirect** trong load test → đo cả latency đi tới \`example.com\`, sai lệch. Tắt follow (\`redirects: 0\`).
> - **Dùng \`constant-vus\` (N VU lặp)** thay vì \`arrival-rate\` → khi service chậm, VU chậm theo → RPS thực giảm → bạn tưởng service chịu được vì "không thấy error", thực ra chỉ là bắn ít đi. Dùng arrival-rate để giữ tốc độ thật.
> - **Tối ưu mò không profile** → đoán sai chỗ. Luôn profile (pprof) trước khi sửa.

> 📝 **Tóm tắt mục 7.** Load test redirect ở arrival-rate, threshold = SLO. Đọc metric khoanh vùng (p99 cao + cache_hit thấp + queue đầy) → pprof xác nhận → sửa đúng chỗ (TTL + worker). Đo before/after để chứng minh. Không tắt follow-redirect = đo sai.

---

## 8. Dashboards & Alerts

### 8.1 Grafana dashboard — RED + cache + queue

Dashboard tối thiểu cho service này (mỗi ô là 1 PromQL query):

| Panel | PromQL | Ý nghĩa |
|-------|--------|---------|
| Rate | \`sum(rate(http_requests_total[1m]))\` | req/s tổng |
| Error rate | \`sum(rate(http_requests_total{status=~"5.."}[1m])) / sum(rate(http_requests_total[1m]))\` | % lỗi 5xx |
| p99 latency | \`histogram_quantile(0.99, rate(http_request_duration_seconds_bucket[5m]))\` | đuôi latency |
| Cache hit | \`cache_hit_ratio\` | hiệu quả cache |
| Queue depth | \`click_queue_depth\` | worker theo kịp? |
| Clicks/s | \`rate(clicks_processed_total[1m])\` | throughput worker |

### 8.2 Alert rules

\`\`\`yaml
groups:
  - name: urlshortener
    rules:
      - alert: HighErrorRate
        expr: sum(rate(http_requests_total{status=~"5.."}[5m])) / sum(rate(http_requests_total[5m])) > 0.01
        for: 2m                # phải vượt liên tục 2 phút mới báo (chống nhiễu)
        labels: { severity: page }
        annotations: { summary: "Error rate > 1% trong 5 phút" }

      - alert: HighLatencyP99
        expr: histogram_quantile(0.99, rate(http_request_duration_seconds_bucket[5m])) > 0.1
        for: 5m
        labels: { severity: page }
        annotations: { summary: "p99 latency > 100ms" }

      - alert: QueueBacklog
        expr: click_queue_depth > 3000
        for: 3m
        labels: { severity: warn }
        annotations: { summary: "Click queue backlog > 3000 (worker không theo kịp)" }
\`\`\`

> ⚠ **Alert fatigue (nhắc lại từ L81).** Mỗi alert phải **actionable** (có việc để làm) + có \`for:\` (chống flap). Alert báo mỗi spike nhỏ → người trực bỏ qua hết → bỏ sót alert thật. Chỉ alert thứ *cần con người hành động ngay*.

> 📝 **Tóm tắt mục 8.** Dashboard = RED + cache_hit + queue_depth. Alert chỉ những thứ actionable (error>1%, p99>100ms, queue>3000) + \`for:\` chống nhiễu.

---

## 9. SLO & error budget (Lesson 81)

> 💡 **Trực giác.** SLO là "lời hứa định lượng" về độ tin cậy. Error budget là "ngân sách được phép sai" = \`100% − SLO\`. Nó biến cuộc cãi nhau "ship feature hay lo reliability" thành con số: còn budget → ship; cháy budget → freeze, lo ổn định.

Định nghĩa SLO cho URL Shortener:

| SLI (đo cái gì) | SLO (ngưỡng hứa) | Đo bằng |
|-----------------|------------------|---------|
| Availability | **99.9%** request thành công (non-5xx) | \`http_requests_total\` |
| Latency | **p99 < 50ms** cho redirect | \`http_request_duration_seconds\` |

**Error budget tính ra số cụ thể** (định nghĩa tự đủ + ví dụ số):

- SLO 99.9% → được phép fail **0.1%**. Trong 30 ngày = 43200 phút → budget downtime = \`43200 × 0.001 = 43.2 phút/tháng\`.
- Nếu tháng này đã có 30 phút downtime → còn \`43.2 − 30 = 13.2\` phút budget → *thận trọng*, hạn chế thay đổi rủi ro.
- Nếu mới 5 phút → còn nhiều budget → thoải mái ship feature, thử nghiệm.

Với 1000 req/s, 0.1% lỗi = \`1000 × 0.001 = 1 request lỗi/giây\` vẫn nằm trong SLO availability.

> ❓ **Câu hỏi tự nhiên.** *"Sao không đặt SLO 100%?"* → 100% là bất khả thi (mọi hệ thống đều fail đôi lúc) và *cực đắt* (mỗi "số 9" thêm tốn gấp bội). Quan trọng: 100% reliability nghĩa **0 budget** → không bao giờ được ship gì rủi ro → đứng yên. SLO < 100% chừa chỗ để cải tiến.

> 📝 **Tóm tắt mục 9.** SLO 99.9% avail + p99<50ms. Error budget = 43.2 phút/tháng. Còn budget → ship; cháy budget → freeze. 100% là sai lầm (đắt + đóng băng đổi mới).

---

## 10. Runbook — xử lý sự cố

Runbook = "sổ tay khi cháy nhà": triệu chứng → chẩn đoán → giảm thiểu (mitigate trước, fix sau — L81). Ba kịch bản hay gặp nhất:

### 10.1 Redis down

| | Nội dung |
|---|---|
| **Triệu chứng** | \`cache_hit_ratio\` rơi về 0, p99 tăng vọt (mọi request đi DB), error 5xx tăng nếu DB quá tải |
| **Chẩn đoán** | \`kubectl get pods -l app=redis\`; xem log có \`connection refused redis:6379\` |
| **Mitigate** | (1) Service phải **degrade gracefully**: cache miss → đọc thẳng DB, KHÔNG sập (đảm bảo code có fallback). (2) Restart Redis pod. (3) Nếu DB quá tải theo → bật rate limit ở ingress để bảo vệ DB |
| **Fix sau** | Thêm Redis replica/Sentinel cho HA; circuit breaker quanh cache call (L52) |

### 10.2 Click queue backlog

| | Nội dung |
|---|---|
| **Triệu chứng** | \`click_queue_depth\` tăng đều, gần \`CLICK_QUEUE_SIZE\` (4096), \`clicks_processed_total\` tăng chậm → bắt đầu drop click (mất analytics) |
| **Chẩn đoán** | So \`rate(clicks_processed)\` vs tốc độ redirect; worker bị block ở DB write? |
| **Mitigate** | (1) Tăng \`CLICK_WORKERS\` (ConfigMap) + rollout. (2) Batch insert click thay vì từng cái. (3) Quan trọng: redirect VẪN nhanh — chỉ analytics trễ, không phải sự cố user-facing |
| **Fix sau** | Chuyển queue sang Kafka/NATS (L64) bền hơn in-memory; batch write |

### 10.3 Redirect latency tăng đột biến (xem BT5)

| | Nội dung |
|---|---|
| **Triệu chứng** | Alert \`HighLatencyP99\`: p99 redirect từ 28ms → 300ms |
| **Chẩn đoán** | Dashboard: cache_hit giảm? queue đầy? CPU chạm limit (throttle)? Trace 1 request chậm xem chặng nào lâu |
| **Mitigate** | Tuỳ root cause: cache hit giảm → kiểm tra Redis; CPU throttle → HPA scale / tăng limit; DB chậm → kiểm tra slow query |
| **Fix sau** | Cải thiện theo nguyên nhân; thêm alert sớm hơn |

> 📝 **Tóm tắt mục 10.** Runbook = triệu chứng → chẩn đoán → mitigate (stop the bleeding) → fix sau. 3 sự cố chính: Redis down (degrade về DB), queue backlog (tăng worker, redirect vẫn nhanh), latency spike (theo dashboard tìm root cause).

---

## 11. Production checklist

Trước khi gọi service là "production-ready", tick đủ:

- [ ] **Health check**: \`/healthz\` + readiness/liveness/startup probe đúng (liveness KHÔNG check dependency).
- [ ] **Resource limit**: \`requests\` + \`limits\` cho cpu/memory mọi container.
- [ ] **Graceful shutdown**: drain in-flight + flush queue; \`terminationGracePeriodSeconds\` đủ; \`preStop\` chống race.
- [ ] **Observability**: log JSON + request_id; metrics RED + /metrics; trace propagate qua worker.
- [ ] **Rate limit**: tầng ingress + (tuỳ chọn) trong app (L52) bảo vệ khi quá tải.
- [ ] **Secret management**: KHÔNG hardcode/commit creds; encryption-at-rest hoặc external secret manager.
- [ ] **Backup**: Postgres có backup định kỳ + test restore (backup chưa test = không có backup).
- [ ] **HPA**: scale theo CPU/QPS, min ≥ 2 (HA), max có trần.
- [ ] **Zero-downtime deploy**: \`maxUnavailable: 0\`, rollout có \`rollout status\` gate.
- [ ] **SLO + alert**: SLO định nghĩa, alert actionable + \`for:\`, dashboard RED.
- [ ] **Runbook**: ít nhất 3 sự cố hay gặp có quy trình mitigate.
- [ ] **Image**: multi-stage < 20MB, non-root, scan CVE.

> ⚠ **Cái bẫy "backup chưa test".** Có script backup chạy hằng đêm KHÔNG có nghĩa bạn có backup. Backup chỉ tồn tại nếu bạn đã **restore thử thành công**. Nhiều công ty mất dữ liệu vì backup hỏng âm thầm hàng tháng.

---

## 12. Tổng kết toàn lộ trình — Capstone tích hợp T0→T8

Bạn vừa hoàn thành **lesson cuối cùng** của lộ trình Programming. Nhìn lại, capstone URL Shortener đã *dùng thật* kiến thức của gần như mọi tier:

| Tier | Đóng góp vào capstone |
|------|------------------------|
| **T0** Foundation | Tư duy chia nhỏ vấn đề, Git, đọc code |
| **T1-T2** Go basic/intermediate | Struct, interface, error, goroutine, channel, context (async queue), testing |
| **T3** Advanced | Profiling (pprof tìm bottleneck §7), benchmark, concurrency pattern (worker pool) |
| **T4** Web backend | REST API, routing, validation, graceful shutdown (§5), rate limit |
| **T5** Data | Postgres (source of truth), Redis cache, migration |
| **T6** Distributed | Async queue, event-driven (click processing) |
| **T7** Production | Logging (§3.1), metrics (§3.2), tracing (§3.3), Docker (§2), K8s (§4), CI/CD (§6), SLO/runbook (§9,10) |
| **T8** Capstone | **Gắn tất cả thành 1 sản phẩm chạy thật, deploy được, quan sát được** |

**Bạn giờ có thể:** đọc 1 yêu cầu → design (L82) → implement clean (L83) → dockerize + deploy K8s + observe + load test + viết runbook (L84). Đây là vòng đời đầy đủ của một service production.

### Next steps cho người học

- **Đào sâu 1 trụ observability**: tự host Prometheus + Grafana + Tempo/Jaeger thật, wire \`client_golang\` + OTel SDK thật (thay mock trong \`observability.go\`).
- **Chuyển queue sang Kafka/NATS** (L64) để bền hơn in-memory; thêm batch write.
- **Multi-region / HA**: Redis Sentinel, Postgres replica, multi-AZ.
- **Chaos engineering**: tự giết Redis/pod giữa load test, xác minh degrade gracefully.
- **Đóng góp open-source / portfolio**: capstone này là 1 portfolio piece — viết blog post mô tả design → implement → deploy → load test before/after.
- **Học sâu hơn**: service mesh thật (Istio/Linkerd, L70), cost optimization, FinOps.

> 🔁 **Dừng lại tự kiểm tra (toàn lộ trình).**
> 1. Vì sao redirect đẩy click vào queue thay vì ghi DB ngay tại chỗ?
> 2. Khi p99 tăng, bạn dùng 3 trụ observability theo thứ tự nào để điều tra?
> 3. Vì sao liveness probe không nên check Redis?
> <details><summary>Đáp án</summary>
> 1. Ghi DB đồng bộ sẽ cộng latency DB write vào mọi redirect → chậm đường nóng. Async queue tách việc ghi click khỏi latency redirect; redirect trả về ngay, click ghi sau.
> 2. **Metric** (dashboard khoanh vùng *khi nào* + tương quan) → **Trace** (chặng nào chậm) → **Log** (chi tiết request lỗi cụ thể, lọc theo request_id).
> 3. Redis chập chờn → liveness fail → mọi pod restart đồng loạt → cascading failure dù vấn đề chỉ là dependency tạm. Liveness chỉ check "process còn sống"; dependency check để cho readiness.
> </details>

---

## Bài tập

> Mọi bài tập có lời giải chi tiết ở mục [Lời giải chi tiết](#lời-giải-chi-tiết).

1. **BT1 — Dockerfile multi-stage.** Viết Dockerfile multi-stage cho service, tối ưu size xuống < 20MB, non-root. Giải thích mỗi build flag.
2. **BT2 — K8s manifest.** Viết Deployment + Service + HPA YAML với 3 replica, resource limit, 3 loại probe, autoscale theo CPU 70%.
3. **BT3 — Instrument service.** Thêm 4 Prometheus metric (request counter, latency histogram, cache hit gauge, queue depth gauge) + 1 trace span cho redirect, propagate trace qua worker.
4. **BT4 — Load test & bottleneck.** Lập kế hoạch load test 1000 req/s redirect; đọc kết quả mẫu, xác định bottleneck, đề xuất sửa, ước lượng before/after.
5. **BT5 — Runbook.** Viết runbook cho sự cố "redirect latency tăng đột biến": chẩn đoán từng nghi phạm + mitigate tương ứng.

---

## Lời giải chi tiết

### Lời giải BT1 — Dockerfile multi-stage

**Cách tiếp cận:** tách 2 stage — builder (có toolchain) và runtime (\`scratch\` rỗng). Chỉ copy binary sang stage runtime.

\`\`\`dockerfile
FROM golang:1.24-alpine AS builder
WORKDIR /src
COPY go.mod go.sum* ./
RUN go mod download                 # cache: chỉ tải lại dep khi go.mod đổi
COPY . .
RUN CGO_ENABLED=0 GOOS=linux go build \\
      -trimpath -ldflags="-s -w" \\
      -o /out/urlshortener ./cmd/server

FROM scratch
COPY --from=builder /etc/ssl/certs/ca-certificates.crt /etc/ssl/certs/
COPY --from=builder /etc/passwd /etc/passwd
COPY --from=builder /out/urlshortener /urlshortener
USER 65532:65532
EXPOSE 8080
ENTRYPOINT ["/urlshortener"]
\`\`\`

**Giải thích flag (từng bước):**
- \`CGO_ENABLED=0\` → binary tĩnh, không link libc → chạy trên \`scratch\`. *Bắt buộc.*
- \`-trimpath\` → bỏ path tuyệt đối máy build → reproducible + không lộ đường dẫn nội bộ.
- \`-ldflags="-s -w"\` → \`-s\` bỏ symbol table, \`-w\` bỏ DWARF debug → giảm ~30% size.
- \`USER 65532\` → non-root (chuẩn distroless nonroot uid).
- Copy \`ca-certificates.crt\` → cần để gọi HTTPS (OTel collector qua TLS).

**Size:** với service này, multi-stage scratch ra **~12MB** (< 20MB ✓). So với naive \`golang:1.24\` (~850MB) là giảm ~98%.

**Vì sao copy \`go.mod\` trước:** layer cache. Đổi 1 dòng code mà copy hết trước \`go mod download\` → cache miss → tải lại toàn bộ dep (chậm CI). Copy \`go.mod\`/\`go.sum\` riêng → dep chỉ tải lại khi chúng đổi.

File đầy đủ: [\`solutions/Dockerfile\`](./solutions/Dockerfile).

### Lời giải BT2 — K8s Deployment + Service + HPA

**Cách tiếp cận:** Deployment quản replica + rolling update + 3 probe; Service expose; HPA scale.

\`\`\`yaml
# Deployment (rút gọn — bản đầy đủ ở solutions/k8s/deployment.yaml)
apiVersion: apps/v1
kind: Deployment
metadata: { name: urlshortener }
spec:
  replicas: 3
  selector: { matchLabels: { app: urlshortener } }
  strategy:
    rollingUpdate: { maxSurge: 1, maxUnavailable: 0 }   # zero-downtime
  template:
    metadata: { labels: { app: urlshortener } }
    spec:
      securityContext: { runAsNonRoot: true, runAsUser: 65532 }
      containers:
        - name: urlshortener
          image: ghcr.io/you/urlshortener:latest
          ports: [{ containerPort: 8080, name: http }]
          resources:
            requests: { cpu: "100m", memory: "64Mi" }
            limits:   { cpu: "500m", memory: "128Mi" }
          readinessProbe: { httpGet: { path: /healthz, port: http }, periodSeconds: 5 }
          livenessProbe:  { httpGet: { path: /healthz, port: http }, periodSeconds: 10 }
          startupProbe:   { httpGet: { path: /healthz, port: http }, failureThreshold: 15 }
---
apiVersion: v1
kind: Service
metadata: { name: urlshortener }
spec:
  type: ClusterIP
  selector: { app: urlshortener }
  ports: [{ port: 80, targetPort: http }]
---
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata: { name: urlshortener }
spec:
  scaleTargetRef: { apiVersion: apps/v1, kind: Deployment, name: urlshortener }
  minReplicas: 3
  maxReplicas: 20
  metrics:
    - type: Resource
      resource: { name: cpu, target: { type: Utilization, averageUtilization: 70 } }
\`\`\`

**Giải thích quyết định:**
- \`replicas: 3\` → HA (1 pod chết còn 2). \`maxUnavailable: 0\` → rollout không bao giờ giảm dưới mức phục vụ.
- 3 probe khác vai trò (xem §4.2): readiness (gỡ khỏi traffic), liveness (restart), startup (warmup). Liveness dùng \`/healthz\` nhẹ, KHÔNG check Redis.
- HPA \`averageUtilization: 70\` → CPU trung bình > 70% request → thêm pod. Ví dụ: 3 pod đang 90% CPU → HPA tính cần \`ceil(3 × 90/70) = 4\` pod.

File đầy đủ: [\`solutions/k8s/\`](./solutions/k8s/).

### Lời giải BT3 — Instrument service (4 metric + trace)

**Cách tiếp cận:** định nghĩa 4 metric + middleware đo tự động + trace span propagate qua worker.

\`\`\`go
// 4 metric (production: prometheus.NewCounterVec / NewHistogram / NewGauge)
RequestsTotal   *Counter   // counter — Rate + Errors
RequestDuration *Histogram // histogram — Duration p50/p99
CacheHitRatio   *Gauge     // gauge — hiệu quả cache
QueueDepth      *Gauge     // gauge — worker theo kịp?

// Middleware: đo MỌI request 1 lần, không lặp ở từng handler
func instrument(m *Metrics, tr *Tracer, base *slog.Logger, next http.Handler) http.Handler {
    return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
        start := time.Now()
        ctx, span := tr.Start(r.Context(), "http "+r.Method+" "+r.URL.Path)
        defer span.End()
        rec := &statusRecorder{ResponseWriter: w, status: 200}
        next.ServeHTTP(rec, r.WithContext(ctx))
        m.RequestsTotal.Inc()
        m.RequestDuration.Observe(time.Since(start).Seconds())  // -> p50/p99
    })
}

// Trace propagate qua worker: mang trace_id theo job
tid, _ := ctx.Value(traceIDKey).(string)
queue <- clickJob{code: code, traceID: tid}
// trong worker:
ctx := context.WithValue(context.Background(), traceIDKey, job.traceID)
_, span := tracer.Start(ctx, "worker.process_click")   // CÙNG trace
\`\`\`

**Cache hit gauge cập nhật mỗi lookup:**
\`\`\`go
func (m *Metrics) recordCache(hit bool) {
    if hit { m.cacheHits.Add(1) } else { m.cacheMisses.Add(1) }
    h, miss := m.cacheHits.Load(), m.cacheMisses.Load()
    m.CacheHitRatio.Set(float64(h) / float64(h+miss))  // vd 920/1000 = 0.92
}
\`\`\`

**Verify:** \`go run solutions/observability.go\` → in self-test với \`requests_total\`, \`clicks_processed\`, \`cache_hit_ratio\`, \`p50_ms\`, \`p99_ms\`. Code đầy đủ (build + chạy): [\`solutions/observability.go\`](./solutions/observability.go).

**Độ phức tạp:** mỗi metric op O(1) (atomic add / mutex set). Histogram mock lưu samples O(n) RAM — production dùng bucket cố định O(số bucket).

### Lời giải BT4 — Load test plan & bottleneck

**Kế hoạch:**
1. **Mục tiêu**: redirect \`GET /{code}\` chịu 1000 req/s, p99 < 50ms, error < 1%.
2. **Tool**: k6 \`ramping-arrival-rate\` (giữ tốc độ thật) hoặc \`loadtest.go\` (-c 100 -rps 1000).
3. **Không follow redirect** (\`redirects: 0\`) — đo đúng latency endpoint.
4. **Bật scrape metrics** trong lúc test để quan sát cache_hit, queue_depth.

**Đọc kết quả mẫu (before):**
\`\`\`
Throughput 640/1000 req/s | p50 8ms | p99 420ms | error 3.2%
cache_hit 0.55 | queue_depth 3800
\`\`\`

**Phân tích bottleneck:**
- p50=8ms nhưng p99=420ms → đuôi chậm, không phải toàn bộ chậm.
- cache_hit=0.55 → 45% phải đi DB → đó là đuôi. Nghi phạm #1.
- queue_depth≈3800 (buffer 4096) → worker không kịp → drop click.
- pprof xác nhận: thời gian dồn ở \`db.QueryRow\` (miss path) + mutex queue.

**Sửa (đúng chỗ, không over-engineer):** tăng cache TTL (60s→3600s) + tăng worker (1→4).

**Before/after:**
| | Before | After |
|---|--:|--:|
| Throughput | 640 | 1000 req/s |
| p99 | 420ms | 28ms |
| error | 3.2% | 0.1% |
| cache_hit | 0.55 | 0.94 |

Chi tiết §7. Chạy mô phỏng: \`cd solutions/loadtest && go run ./loadtest.go -rps 1000 -dur 5s -c 100\`.

### Lời giải BT5 — Runbook "redirect latency tăng đột biến"

**Trigger:** alert \`HighLatencyP99\` (p99 redirect từ 28ms → 300ms).

**Quy trình (mitigate trước, fix sau — L81):**

**Bước 1 — Chẩn đoán (loại trừ từng nghi phạm bằng dashboard/trace):**

| Nghi phạm | Kiểm tra | Dấu hiệu xác nhận |
|-----------|----------|-------------------|
| Cache hiệu quả giảm | \`cache_hit_ratio\` | Rơi từ 0.94 → thấp → nhiều request đi DB |
| Worker/queue tắc | \`click_queue_depth\` | Tăng cao → backpressure |
| CPU throttle | CPU usage vs limit | Chạm 500m limit → throttle → chậm |
| DB chậm | trace span \`db.query\` | Span DB lâu bất thường |
| Dependency (Redis) | log \`connection refused\`, Redis pod status | Redis down |
| Traffic spike thật | \`rate(http_requests_total)\` | Tăng đột biến → cần scale |

Dùng **trace** 1 request chậm: xem span nào chiếm phần lớn duration → khoanh đúng chặng.

**Bước 2 — Mitigate (theo root cause):**
- Cache hit giảm / Redis chập chờn → restart Redis, đảm bảo code degrade về DB (không sập).
- CPU throttle → HPA scale thêm pod (hoặc tạm tăng \`limits.cpu\`).
- Traffic spike → để HPA scale; nếu chưa kịp, bật rate limit ingress bảo vệ.
- DB slow query → kiểm tra query/index; tạm tăng cache TTL giảm tải DB.

**Bước 3 — Xác nhận:** p99 về < 50ms trên dashboard, alert clear.

**Bước 4 — Fix sau (postmortem):** thêm alert sớm hơn (p99 > 50ms cảnh báo trước khi chạm 100ms), circuit breaker quanh cache, capacity planning cho spike.

**Nguyên tắc xuyên suốt:** *stop the bleeding* trước (scale/restart/rate-limit) → tìm root cause → fix bền sau. Đừng debug sâu trong lúc đang cháy.

---

## Code & Minh họa

- **Deployment artifacts + observability code**: [\`solutions/\`](./solutions/) — Dockerfile, \`k8s/\` (6 manifest), \`observability.go\` (build + chạy được), \`loadtest/\` (k6 + Go tester), \`Makefile\`, \`README\`.
- **Minh họa tương tác**: [\`visualization.html\`](./visualization.html) — 3 module: (1) Deploy pipeline (code → docker → k8s → pods chạy), (2) Observability dashboard (RED + cache + queue live), (3) Load test (ramp req/s → p50/p99 + error + bottleneck).

Chạy nhanh:
\`\`\`bash
cd solutions
go run ./observability.go              # demo 3 trụ + self-test
cd loadtest && go run ./loadtest.go    # load test mô phỏng
make help                              # mọi target build/docker/deploy
\`\`\`

---

## Kết thúc

Đây là **lesson cuối cùng của toàn bộ lộ trình Programming** (84 lesson, 9 tier). Bạn đã đi từ *tư duy lập trình thuần* (T0) tới *deploy + vận hành + quan sát một service production trên Kubernetes* (T8). Capstone URL Shortener là một sản phẩm thật, chạy được, có thể demo cho nhà tuyển dụng.

Chúc mừng — bạn đã hoàn thành lộ trình.

- ← Bài trước: [Lesson 83 — Capstone Implement](../lesson-83-capstone-implement/)
- 🏁 Quay về [Tier 8 — Capstone](../tier-8-capstone/index.html) · [Programming](../index.html)
`;
