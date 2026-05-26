# Lesson 51 — Graceful Shutdown

> "Cắt request giữa chừng là một loại data corruption tinh vi. Service bạn không 'down', nó 'gây hại'."

Bài này dạy cách dừng một process Go server **đúng cách**: không cắt request đang chạy dở, không bỏ rơi message đang xử lý, không drop log/metric chưa flush, không leak goroutine, không panic vì đóng DB pool trước khi handler dùng xong. Kỹ năng này không "fancy" nhưng nó là **ranh giới giữa một service production-ready và một con server đồ chơi**.

## Mục tiêu học tập

Sau bài này, bạn:

- Hiểu **vì sao** phải graceful shutdown, không chỉ "vì nó nghe pro".
- Phân biệt SIGINT, SIGTERM, SIGKILL — cái nào catch được, cái nào không.
- Dùng `signal.Notify` để bắt signal trong Go.
- Dùng `http.Server.Shutdown(ctx)` đúng cách: timeout, sequence.
- Hiểu **shutdown sequence theo dependency** — vì sao đóng DB cuối, vì sao stop accept đầu.
- Dùng `errgroup.WithContext` để quản lý nhiều thành phần chạy song song.
- Cấu hình K8s `preStop` + `terminationGracePeriodSeconds` đồng bộ với app.
- Phân biệt **liveness** và **readiness** — vì sao toggle readiness=false trước khi shutdown.
- Tránh 4 antipattern phổ biến nhất.

## Kiến thức tiền đề

- [Lesson 27 — Goroutines & Channels](../lesson-27-goroutines-channels/) — `select`, `done channel`.
- [Lesson 29 — Context & Cancellation](../lesson-29-context-cancellation/) — `context.WithTimeout`, propagation.
- [Lesson 42 — HTTP `net/http` Deep](../lesson-42-http-net-deep/) — `http.Server`.

## 1. Vì sao graceful shutdown

### 1.1 Câu chuyện thật

Imagine bạn vừa deploy v1.0.3. CI/CD bắn rolling update: K8s kill 1 pod cũ, start 1 pod mới. Pod cũ bị `kill -15` (SIGTERM). Process Go của bạn... thoát ngay lập tức. Đẹp.

Nhưng có 17 request đang xử lý dở trong pod đó. Có 3 request đang ghi vào DB ở giữa transaction. Có 5 request đang upload file lên S3 (đã upload 80%). Có 9 message queue đã đọc nhưng chưa ack.

Pod chết. Kết quả:

- 17 user thấy "502 Bad Gateway".
- 3 transaction DB rollback (may mắn — vì có transaction). Hoặc tệ hơn: commit dở dang (nếu không bọc transaction kỹ).
- 5 file S3 trở thành rác (upload incomplete, không ai cleanup).
- 9 message bị **redeliver** sau visibility timeout → handler chạy lại từ đầu → có thể double-charge user.

Tất cả vì process thoát quá nhanh.

### 1.2 💡 Trực giác

Graceful shutdown = "đóng cửa hàng có quy củ":

- **Treo biển 'không nhận khách mới'** (stop accept).
- **Phục vụ nốt khách đang trong quán** (wait in-flight).
- **Đóng máy tính tiền, đóng bếp** (flush buffer, close worker).
- **Tắt điện, khóa cửa, ra về** (close DB, exit).

Ngược lại — "rút phích" giữa lúc đang đông khách — chính là `kill -9`.

### 1.3 Khi nào graceful shutdown được trigger

| Sự kiện | Signal nhận được | Catch được? |
|---|---|---|
| User bấm `Ctrl+C` trong terminal | SIGINT (2) | ✓ |
| `docker stop <container>` | SIGTERM (15), sau 10s thì SIGKILL | ✓ (SIGTERM) |
| K8s rolling update / scale down | SIGTERM, sau `terminationGracePeriodSeconds` (default 30s) → SIGKILL | ✓ (SIGTERM) |
| `systemctl stop` | SIGTERM | ✓ |
| `kill <pid>` (mặc định) | SIGTERM | ✓ |
| `kill -9 <pid>` / OOM kill | SIGKILL (9) | ✗ — kernel không cho process biết |
| `panic()` không recover | runtime kill | n/a |
| Hardware power loss | — | n/a |

⚠ **SIGKILL không catch được**. Đó là lý do bạn phải làm xong shutdown trong cửa sổ thời gian K8s/docker cho (mặc định 30s). Nếu quá hạn, bạn bị giết, mất kiểm soát.

### 1.4 ❓ Câu hỏi tự nhiên

> **Q: Nếu service chỉ chạy local dev, có cần không?**
> A: Có, ít nhất để tránh leak file/connection khi `Ctrl+C`. Nhưng quan trọng hơn: nếu không viết từ đầu, bạn sẽ không có nó khi cần ở production.

> **Q: Tại sao K8s không gửi sẵn signal "drain" rồi mới SIGTERM?**
> A: Vì SIGTERM **chính là** signal "hãy drain rồi exit". Bạn có khoảng `terminationGracePeriodSeconds` để làm xong. Nó là contract POSIX, không phải K8s phát minh.

> **Q: 30s có đủ không?**
> A: Cho HTTP API tiêu chuẩn (request < 1s): thừa. Cho upload/long-poll/SSE: thường không đủ, phải tăng. Cho batch job nửa giờ: graceful shutdown không phù hợp — phải checkpoint progress.

### 📝 Tóm tắt mục 1

- Graceful shutdown bảo vệ **request/data integrity** trong moment process bị kill.
- Trigger phổ biến nhất ở production: K8s rolling update gửi SIGTERM.
- SIGKILL không catch được — bạn phải xong việc trước khi nó tới.

---

## 2. Signal handling trong Go

### 2.1 API tối thiểu

```go
import (
    "os"
    "os/signal"
    "syscall"
)

sigCh := make(chan os.Signal, 1)
signal.Notify(sigCh, os.Interrupt, syscall.SIGTERM)

<-sigCh // block tới khi nhận signal
fmt.Println("nhận shutdown signal, bắt đầu drain...")
```

Đây là toàn bộ "phép thuật". `signal.Notify` đăng ký channel để nhận signal; channel có buffer = 1 (quan trọng — nếu unbuffered và goroutine chưa kịp read khi signal tới, signal bị **drop** vì runtime không block).

### 2.2 💡 Trực giác về signal

Signal là cách kernel "ngắt" process: gửi một event async tới process, không qua memory share. Trong Go, runtime cài sẵn handler signal ở C-level, rồi forward sang channel bạn đăng ký.

Bạn **không** poll. Bạn block trên channel. Runtime sẽ wake bạn dậy khi signal tới.

### 2.3 SIGINT vs SIGTERM vs SIGKILL — walk-through bằng số

| Tên | Số | Nguồn phổ biến | Hành vi mặc định nếu không catch | Catch được? |
|---|---|---|---|---|
| SIGHUP | 1 | terminal closed; reload config | terminate | ✓ |
| SIGINT | 2 | `Ctrl+C` | terminate | ✓ |
| SIGQUIT | 3 | `Ctrl+\` | terminate + core dump | ✓ |
| SIGTERM | 15 | `kill <pid>`, `docker stop`, K8s | terminate | ✓ |
| SIGKILL | 9 | `kill -9`, OOM killer, K8s timeout | terminate (forced) | ✗ |
| SIGSTOP | 19 | `Ctrl+Z` (qua SIGTSTP), debugger | stop | ✗ |

Ví dụ chạy thử:

```bash
$ ./myserver &
[1] 12345
$ kill 12345     # gửi SIGTERM, server graceful shutdown
$ kill -9 12345  # gửi SIGKILL, server chết tức thì, mất request
```

### 2.4 ⚠ Lỗi thường gặp

**Lỗi 1: Channel unbuffered.**

```go
sigCh := make(chan os.Signal) // BAD
signal.Notify(sigCh, syscall.SIGTERM)
```

Nếu signal đến trước khi có goroutine nào đọc `sigCh`, runtime cố gửi non-blocking, signal **biến mất**. Pattern đúng dùng buffer 1:

```go
sigCh := make(chan os.Signal, 1) // OK
```

**Lỗi 2: Quên `signal.Notify` cho SIGTERM.**

```go
signal.Notify(sigCh, os.Interrupt) // chỉ SIGINT, bị docker/k8s kill cứng
```

Phải:

```go
signal.Notify(sigCh, os.Interrupt, syscall.SIGTERM)
```

**Lỗi 3: `signal.Reset` mid-flight.** Đừng `signal.Reset` cho tới khi shutdown chắc chắn xong, không thì lần signal thứ 2 (user sốt ruột bấm Ctrl+C lần nữa) sẽ kill cứng process.

### 2.5 Pattern "Ctrl+C lần 2 = force exit"

User thường bấm Ctrl+C 2 lần khi sốt ruột. Pattern phổ biến:

```go
sigCh := make(chan os.Signal, 1)
signal.Notify(sigCh, os.Interrupt, syscall.SIGTERM)

<-sigCh
log.Println("shutdown started, press Ctrl+C again to force exit")
go func() {
    <-sigCh
    log.Println("forced exit")
    os.Exit(1)
}()

// ... do graceful shutdown ...
```

### 📝 Tóm tắt mục 2

- Dùng `signal.Notify(ch, os.Interrupt, syscall.SIGTERM)` với channel **buffered 1**.
- SIGKILL không catch được — đừng cố.
- Listen 2 signal liên tiếp để hỗ trợ "Ctrl+C lần 2 = force exit".

---

## 3. HTTP server graceful

### 3.1 Pattern chuẩn

```go
srv := &http.Server{
    Addr:    ":8080",
    Handler: mux,
}

go func() {
    if err := srv.ListenAndServe(); err != nil && err != http.ErrServerClosed {
        log.Fatalf("listen: %v", err)
    }
}()

<-sigCh
ctx, cancel := context.WithTimeout(context.Background(), 30*time.Second)
defer cancel()

if err := srv.Shutdown(ctx); err != nil {
    log.Printf("shutdown error: %v", err)
}
```

### 3.2 `Shutdown(ctx)` làm gì

Theo godoc:

> Shutdown gracefully shuts down the server without interrupting any active connections. Shutdown works by first closing all open listeners, then closing all idle connections, and then waiting indefinitely for connections to return to idle and then shut down.

Đọc kỹ:

1. **Đóng listener** — không accept connection mới. `ListenAndServe` trả về `http.ErrServerClosed` (đó là lý do code trên phải check `!= http.ErrServerClosed`).
2. **Đóng idle connection** — keepalive connection không có request đang chạy: đóng luôn.
3. **Chờ active connection** — request đang xử lý dở: chờ handler return.
4. Nếu `ctx` expired trước khi chờ xong → trả `ctx.Err()` (deadline exceeded), connection bị đóng cứng.

### 3.3 Walk-through số cụ thể

Giả sử server có 100 keepalive connection, trong đó 20 đang xử lý request dài (mỗi cái 5s), 80 idle. Timeout 30s.

- t=0: `srv.Shutdown(ctx)` được gọi.
- t=0+ε: listener đóng, 80 idle connection đóng.
- t=0..5: 20 handler chạy bình thường, mỗi cái trả về dần dần.
- t=5: 20 connection cuối đã idle (do `Connection: close` header HTTP/1.1 hoặc GOAWAY HTTP/2), Server đóng nốt.
- `Shutdown(ctx)` return `nil`. Server thoát clean.

Nếu có 1 handler chạy 40s, t=30s `ctx` expired:

- `Shutdown(ctx)` return `context.DeadlineExceeded`.
- Connection bị force close — handler đang viết response thì gặp `write: broken pipe`.
- Client thấy `502` hoặc connection reset.

Lesson: chọn timeout đủ lớn cho handler dài nhất bạn cho phép.

### 3.4 ❓ Câu hỏi tự nhiên

> **Q: `Shutdown` blocking cho tới khi xong, hay async?**
> A: **Blocking** — gọi xong nghĩa là drain hoàn tất (hoặc timeout). Phải gọi từ goroutine main hoặc dùng error channel để collect.

> **Q: Có cần `srv.Close()` thay vì `Shutdown`?**
> A: `Close()` đóng cứng ngay lập tức, không chờ in-flight. Dùng cho test/dev, không dùng production.

> **Q: Sau `Shutdown` return, server reuse được không?**
> A: **Không**. Phải tạo `http.Server` mới.

> **Q: Listener đóng rồi mà `Shutdown` vẫn chờ in-flight — có race condition với request đến nửa chừng không?**
> A: Không. Request đang trong handler được "đếm" qua `Server.activeConn` map. Đóng listener chỉ chặn `accept()` — connection mới không vào được, connection cũ vẫn chạy.

### 📝 Tóm tắt mục 3

- `http.Server.Shutdown(ctx)` đóng listener, chờ in-flight, return.
- `ListenAndServe` trả `http.ErrServerClosed` khi Shutdown được gọi — không phải lỗi.
- Timeout phải `>= max handler duration` để không cắt request hợp lệ.

---

## 4. Các component cần shutdown

Một service production điển hình có nhiều thành phần cần dừng:

| Component | Cần làm gì | API tham khảo |
|---|---|---|
| HTTP server | Đóng listener, chờ handler | `srv.Shutdown(ctx)` |
| gRPC server | Đóng listener, chờ stream | `grpcSrv.GracefulStop()` |
| Background worker pool | Báo worker dừng, chờ job đang chạy | cancel context + `wg.Wait()` |
| DB connection pool | Đóng tất cả connection | `db.Close()` |
| Message queue consumer | Stop fetch message mới, ack/nack message đang process | tùy library (Kafka: `consumer.Close()`) |
| Cache flush | Flush dirty entry xuống disk | `cache.Flush()` |
| Log buffer | Flush log buffer | `logger.Sync()` (zap) |
| Metric pusher | Push lần cuối | `pusher.Push()` (Prometheus pushgateway) |
| Tracing exporter | Flush span | `tracerProvider.Shutdown(ctx)` |

Không phải service nào cũng có tất cả. Cốt là: **mỗi resource có open thì phải có close**, và **thứ tự close không tùy ý**.

### 4.1 ⚠ Lỗi thường gặp

Quên `defer db.Close()` ở `main` — chương trình thoát, OS dọn TCP connection thô bạo, DB server log "connection reset by peer" hàng loạt.

---

## 5. Shutdown sequence — theo dependency

### 5.1 Nguyên tắc

**Đóng theo thứ tự ngược lại với dependency.** Component A dùng component B → đóng A trước, đóng B sau.

Vì sao? Nếu đóng B trước A thì A vẫn còn đang dùng B, sẽ panic / lỗi.

### 5.2 Sequence chuẩn

```
1. Stop accept new request          ← HTTP listener.Close(), gRPC GracefulStop start
2. Wait in-flight handler done      ← srv.Shutdown ctx
3. Stop background worker           ← cancel worker ctx, wg.Wait()
4. Flush buffer (log, metric, tracer)
5. Close DB connection pool         ← db.Close()
6. Exit
```

### 5.3 Walk-through ví dụ cụ thể

Service có:

- HTTP server xử lý request.
- Worker pool 4 goroutine chạy job từ Redis queue.
- DB pool MySQL.
- Logger zap với buffer.

Cả HTTP handler lẫn worker đều dùng DB.

**Sai sequence**: `db.Close()` ngay khi nhận SIGTERM.

- HTTP handler đang `SELECT ...` → DB connection bị đóng → handler panic / trả 500.
- Worker đang `INSERT ...` → tương tự.
- Client thấy 500 → retry → load DB tăng đột biến.

**Đúng sequence**:

1. `srv.Shutdown(ctx)` — chờ handler done. (5s)
2. `workerCancel()` + `wg.Wait()` — chờ worker job done. (3s)
3. `logger.Sync()` — flush log.
4. `db.Close()` — bây giờ an toàn vì không ai dùng DB nữa.

### 5.4 ❓ Câu hỏi tự nhiên

> **Q: Có thể đóng song song được không?**
> A: HTTP + gRPC có thể song song (chúng độc lập). Nhưng DB phải đóng **sau** mọi thứ dùng DB → tuần tự.

> **Q: Nếu 2 component dependency lẫn nhau (vòng tròn)?**
> A: Vòng tròn là design smell. Refactor lại.

> **Q: Nếu chỉ có HTTP, không có worker, không có DB?**
> A: Sequence chỉ còn bước 1 + flush log.

### 5.5 🔁 Tự kiểm tra

Có service: HTTP server + Kafka consumer + Redis cache + PostgreSQL. Sắp xếp shutdown order.

<details>
<summary>Đáp án</summary>

1. HTTP server shutdown (stop accept request mới).
2. Kafka consumer stop fetch new message (nhưng ack pending).
3. Chờ in-flight HTTP handler và Kafka message handler hoàn tất.
4. Flush log, metric, trace.
5. Redis close (cache thường idempotent, đóng sau handler).
6. PostgreSQL close (handler/worker đã dùng xong).

</details>

### 📝 Tóm tắt mục 5

- Sequence theo **chiều ngược dependency**: outer first, inner last.
- DB pool thường đóng sau cùng vì gần như mọi thứ phụ thuộc.
- Đóng song song chỉ khi 2 component thực sự độc lập.

---

## 6. Timeout overall

### 6.1 Vì sao cần

Nếu một handler stuck vô hạn (ví dụ infinite loop, deadlock), `Shutdown` chờ vô hạn → K8s bắn SIGKILL → mất kiểm soát hoàn toàn.

Phải có **tổng timeout** ngắn hơn `terminationGracePeriodSeconds` của K8s. Quy tắc:

```
app shutdown timeout < K8s terminationGracePeriodSeconds
```

Ví dụ K8s `terminationGracePeriodSeconds: 30` → app timeout = 25s.

### 6.2 Pattern

```go
ctx, cancel := context.WithTimeout(context.Background(), 25*time.Second)
defer cancel()

if err := srv.Shutdown(ctx); err != nil {
    log.Printf("shutdown timeout, force closing: %v", err)
    srv.Close() // force close mọi connection còn lại
}
```

`srv.Close()` sau timeout giúp force connection close, tránh socket leak nếu sau đó còn logic gì khác cần exit clean.

### 6.3 ⚠ Lỗi thường gặp

App timeout 60s, K8s default 30s — K8s SIGKILL trước khi app xong. Phải hoặc tăng `terminationGracePeriodSeconds` ở K8s, hoặc giảm timeout app.

---

## 7. K8s `preStop` hook & terminationGracePeriodSeconds

### 7.1 Vấn đề

Khi K8s rolling update:

- t=0: K8s mark pod "Terminating", remove khỏi Service endpoints, gửi SIGTERM.
- t=0+1s: kube-proxy update iptables / IPVS. Có **delay propagate**.
- t=0+2s..5s: LB (kube-proxy ở các node khác, hoặc cloud LB) có thể còn route request vào pod đang chết.

Pod nhận SIGTERM → bắt đầu shutdown → reject request mới (đóng listener). Nhưng LB chưa biết → vẫn forward → user thấy 502/connection refused.

### 7.2 Giải pháp: `preStop` hook + sleep

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: my-app
spec:
  template:
    spec:
      terminationGracePeriodSeconds: 30
      containers:
      - name: app
        lifecycle:
          preStop:
            exec:
              command: ["/bin/sh", "-c", "sleep 5"]
        readinessProbe:
          httpGet:
            path: /readyz
            port: 8080
          periodSeconds: 2
```

Sequence khi pod terminating:

1. t=0: K8s remove pod khỏi endpoints, chạy `preStop` (sleep 5).
2. t=0..5: LB still routes traffic (do delay), nhưng pod **vẫn accept và xử lý bình thường** (chưa shutdown).
3. t=5: `preStop` done, K8s gửi SIGTERM.
4. t=5+: app graceful shutdown, không còn request mới (vì LB đã update sau 5s).

Lưu ý: **timeline `terminationGracePeriodSeconds` đếm từ lúc K8s bắt đầu terminate, INCLUDE `preStop` time**. Default 30s → `preStop` 5s + app shutdown ≤ 25s.

### 7.3 ❓ Câu hỏi tự nhiên

> **Q: Sao không skip preStop, để app tự nhận SIGTERM và sleep 5s rồi mới shutdown?**
> A: Được, tương đương. Nhưng tách `preStop` rõ ràng hơn về intent ("đây là drain time"), và app code không phải biết về K8s.

> **Q: Readiness probe thì sao?**
> A: Xem mục 8.

---

## 8. Liveness vs Readiness

### 8.1 Định nghĩa

| Probe | Câu hỏi | Hành vi nếu fail |
|---|---|---|
| **Liveness** | "Process còn sống, có hồi đáp không?" | K8s restart container |
| **Readiness** | "Process sẵn sàng nhận traffic mới?" | K8s remove pod khỏi Service endpoints (không restart) |
| Startup (K8s 1.16+) | "Process đã khởi động xong chưa?" | Hoãn liveness/readiness probe |

### 8.2 Vì sao tách 2 probe

Process có thể **alive** (không deadlock, có thể respond `/healthz`) nhưng **không ready** — ví dụ: đang warm up cache, đang chờ DB connection, hoặc đang shutdown.

### 8.3 Pattern: toggle readiness=false khi shutdown bắt đầu

```go
var ready atomic.Bool
ready.Store(true)

mux.HandleFunc("/livez", func(w http.ResponseWriter, r *http.Request) {
    w.WriteHeader(200) // luôn 200 nếu process còn chạy
})
mux.HandleFunc("/readyz", func(w http.ResponseWriter, r *http.Request) {
    if !ready.Load() {
        http.Error(w, "not ready", 503)
        return
    }
    w.WriteHeader(200)
})

// ... khi nhận SIGTERM:
<-sigCh
ready.Store(false)         // toggle ngay
time.Sleep(5 * time.Second) // chờ K8s probe ≥1 lần (period 2s)
srv.Shutdown(ctx)
```

Vì sao toggle trước rồi sleep? K8s readiness probe `periodSeconds: 2` — sleep 5s đảm bảo ≥2 lần probe đã fail → K8s remove pod khỏi endpoints → LB stop forward.

### 8.4 Walk-through số cụ thể

K8s config: `readinessProbe { periodSeconds: 2, failureThreshold: 1 }`.

| t | App | K8s |
|---|---|---|
| 0 | nhận SIGTERM, `ready.Store(false)` | — |
| 1 | trả `503` cho `/readyz` | probe gặp 503, mark NotReady |
| 1+ε | — | xóa pod IP khỏi Service endpoints |
| 1+ε..3 | vẫn nhận request (LB chưa update hết) | — |
| 5 | sleep 5s done, gọi `srv.Shutdown` | — |
| 5..30 | drain handler in-flight | — |
| 30 | exit | — |

### 8.5 ⚠ Lỗi thường gặp

**Liveness probe gọi DB**:

```go
mux.HandleFunc("/livez", func(w http.ResponseWriter, r *http.Request) {
    if err := db.Ping(); err != nil {
        http.Error(w, "db down", 503)
        return
    }
    w.WriteHeader(200)
})
```

Sai vì: DB tạm hỏng → liveness fail → K8s restart pod → pod mới cũng không kết nối DB được → restart loop → khuếch đại sự cố. **Liveness chỉ nên check "process còn alive, không deadlock"**, không check dependency.

DB check → đặt ở `readiness`. DB down → pod không nhận traffic, nhưng không bị restart, sẽ tự phục hồi khi DB lên.

---

## 9. Context propagation

### 9.1 Tinh thần

Tạo **một root context** ở `main`, cancel nó khi nhận signal. Mọi goroutine/worker nhận child context của root → mọi nơi cùng nhận cancel signal.

```go
ctx, cancel := signal.NotifyContext(context.Background(), os.Interrupt, syscall.SIGTERM)
defer cancel()

go runHTTP(ctx)
go runWorkers(ctx)
go runConsumer(ctx)

<-ctx.Done() // chờ tới khi nhận signal
```

`signal.NotifyContext` (Go 1.16+) tự tạo context cancel khi signal tới — gọn hơn pattern manual.

### 9.2 Mỗi worker phải biết check `ctx.Done()`

```go
func worker(ctx context.Context) {
    for {
        select {
        case <-ctx.Done():
            log.Println("worker exiting")
            return
        case job := <-jobCh:
            process(job)
        }
    }
}
```

Nếu worker chỉ `for job := range jobCh` mà không check `ctx`, nó sẽ không bao giờ exit cho tới khi `jobCh` close.

### 9.3 ❓ Câu hỏi tự nhiên

> **Q: HTTP handler nhận context từ đâu?**
> A: `r.Context()` — nó auto-cancel khi client disconnect HOẶC khi `srv.Shutdown` đóng connection. Bạn **không** pass root ctx vào handler.

> **Q: DB query nên dùng request context hay root context?**
> A: Dùng `r.Context()` để query auto-cancel khi client bỏ đi. Nếu dùng `context.Background()` thì query vẫn chạy dù client đã đóng → tốn DB.

---

## 10. `errgroup.WithContext`

### 10.1 Vấn đề

Service có nhiều thành phần chạy song song (HTTP, gRPC, worker, consumer). Mỗi cái có thể fatal-error. Nếu một cái chết, các cái khác cần dừng theo.

Manual với `sync.WaitGroup` thì verbose và dễ sai. `errgroup` từ `golang.org/x/sync/errgroup` giải quyết:

```go
import "golang.org/x/sync/errgroup"

g, ctx := errgroup.WithContext(rootCtx)

g.Go(func() error { return runHTTP(ctx) })
g.Go(func() error { return runGRPC(ctx) })
g.Go(func() error { return runWorker(ctx) })

if err := g.Wait(); err != nil {
    log.Printf("group exited with error: %v", err)
}
```

`errgroup.WithContext` đảm bảo:

- Một goroutine return error → ctx của group bị cancel → các goroutine khác nhận cancel signal.
- `Wait` return error đầu tiên.

### 10.2 Walk-through

3 goroutine chạy:

- t=0: HTTP + gRPC + worker đều chạy.
- t=10: worker gặp lỗi `disk full`, return error.
- t=10+ε: errgroup cancel ctx.
- t=10+ε: HTTP `runHTTP` nhận `ctx.Done()`, gọi `srv.Shutdown(ctx)`, return.
- gRPC tương tự.
- `g.Wait()` return `disk full` error.

### 10.3 Pattern hoàn chỉnh

```go
func main() {
    ctx, stop := signal.NotifyContext(context.Background(), os.Interrupt, syscall.SIGTERM)
    defer stop()

    g, ctx := errgroup.WithContext(ctx)

    srv := &http.Server{Addr: ":8080", Handler: mux}
    g.Go(func() error {
        if err := srv.ListenAndServe(); err != nil && err != http.ErrServerClosed {
            return err
        }
        return nil
    })
    g.Go(func() error {
        <-ctx.Done()
        shutdownCtx, cancel := context.WithTimeout(context.Background(), 25*time.Second)
        defer cancel()
        return srv.Shutdown(shutdownCtx)
    })
    g.Go(func() error { return runWorker(ctx) })

    if err := g.Wait(); err != nil {
        log.Printf("exit: %v", err)
        os.Exit(1)
    }
}
```

Pattern này có một lưu ý: `srv.Shutdown(shutdownCtx)` dùng **context riêng**, không phải `ctx` của errgroup. Vì sao? Vì `ctx` của errgroup ĐÃ bị cancel khi signal tới → `Shutdown(ctx)` sẽ return ngay lập tức (deadline đã expired), không drain gì cả.

---

## 11. Drain pattern (worker pool)

### 11.1 Pattern channel-based

```go
type Pool struct {
    jobs chan Job
    wg   sync.WaitGroup
}

func (p *Pool) Start(ctx context.Context, n int) {
    for i := 0; i < n; i++ {
        p.wg.Add(1)
        go func() {
            defer p.wg.Done()
            for {
                select {
                case <-ctx.Done():
                    return
                case j, ok := <-p.jobs:
                    if !ok {
                        return
                    }
                    p.process(j)
                }
            }
        }()
    }
}

func (p *Pool) Shutdown(timeout time.Duration) error {
    close(p.jobs)
    done := make(chan struct{})
    go func() {
        p.wg.Wait()
        close(done)
    }()
    select {
    case <-done:
        return nil
    case <-time.After(timeout):
        return errors.New("worker pool shutdown timeout")
    }
}
```

Hai phase:

1. **Stop accept new job**: `close(p.jobs)`. Producer (caller) sẽ panic nếu cố `p.jobs <- newJob` sau đó — phải đảm bảo không còn ai send.
2. **Drain**: worker xử lý nốt job còn trong channel (vì range trên closed channel vẫn drain), rồi exit. `wg.Wait()` block tới khi tất cả worker done.

### 11.2 ⚠ Lỗi thường gặp

**Close channel khi vẫn còn sender** → panic `send on closed channel`. Quy tắc: chỉ owner (người tạo channel) được close, và phải đảm bảo không còn sender.

Pattern an toàn hơn: dùng context cancel thay vì close channel. Worker check `ctx.Done()`, không quan tâm channel closed hay không.

---

## 12. Connection draining

### 12.1 HTTP/1.1 keepalive

Khi server gọi `Shutdown`, idle keepalive connection bị đóng ngay. Connection đang xử lý request: handler done → server gửi response với header `Connection: close` → client biết không reuse.

### 12.2 HTTP/2 GOAWAY

HTTP/2 ghép nhiều request lên 1 TCP connection. `Shutdown` gửi frame `GOAWAY` báo client "không stream mới nữa", chờ stream hiện tại xong, đóng connection.

### 12.3 gRPC `GracefulStop`

```go
grpcSrv := grpc.NewServer()
go grpcSrv.Serve(lis)

// shutdown:
grpcSrv.GracefulStop() // chờ pending RPC done, không accept mới
```

`GracefulStop` block tới khi xong. **Không có timeout built-in** — phải bọc trong goroutine với timeout ngoài:

```go
done := make(chan struct{})
go func() {
    grpcSrv.GracefulStop()
    close(done)
}()
select {
case <-done:
case <-time.After(25 * time.Second):
    grpcSrv.Stop() // force
}
```

### 12.4 Streaming RPC

Long-lived stream (bidi stream gRPC, WebSocket, SSE) là vấn đề — chúng có thể chạy giờ. `GracefulStop` chờ stream end → có thể không bao giờ end.

Pattern: server gửi `goodbye` message qua stream, client phải biết close stream sau đó. Hoặc force close sau timeout.

---

## 13. Common pitfalls

### 13.1 Pitfall 1: Force kill < 30s

CI/CD config sai: `terminationGracePeriodSeconds: 5` nhưng app cần 25s drain. Mỗi rolling update mất ~17 request × số pod.

**Fix**: tăng `terminationGracePeriodSeconds` lên ≥ app timeout + 5s buffer.

### 13.2 Pitfall 2: Quên close DB pool

```go
db, _ := sql.Open("postgres", dsn)
// ... main loop ...
// quên db.Close() trước os.Exit
```

OS dọn TCP nhưng:

- DB server thấy connection bị reset → log error.
- Nếu DB pool có statement cached, statement leak (DB-side resource).
- Health check / monitoring nhầm tưởng app crash.

**Fix**: `defer db.Close()` ở `main`, **sau khi mọi handler/worker đã dừng**.

### 13.3 Pitfall 3: Goroutine leak

```go
go func() {
    for j := range jobCh {  // không check ctx
        process(j)
    }
}()
```

Khi nhận shutdown signal, jobCh không close (producer còn chạy) → goroutine block vô hạn → `runtime.NumGoroutine()` vẫn cao → process không exit khi `g.Wait()` xong.

**Fix**: thêm `select { case <-ctx.Done(): return; case j := <-jobCh: ... }`.

### 13.4 Pitfall 4: Sequence sai

```go
<-sigCh
db.Close()           // SAI — handler vẫn đang chạy
srv.Shutdown(ctx)
```

Handler đang `db.QueryContext(...)` → connection bị đóng giữa chừng → query fail → 500.

**Fix**: shutdown listener trước, chờ handler, sau đó mới đóng DB.

### 13.5 Pitfall 5: Readiness vẫn `true` khi shutdown

App không toggle `ready=false` → K8s probe vẫn 200 → LB vẫn forward → request mới đập vào server đang đóng listener → 502.

**Fix**: `ready.Store(false)` là việc **đầu tiên** sau khi nhận signal.

### 📝 Tóm tắt mục 13

5 antipattern: timeout sai cấu hình, quên close, goroutine leak, sequence sai, readiness không toggle. Mỗi cái đều có triệu chứng cụ thể ở production.

---

## Bài tập

### BT1: HTTP server với graceful shutdown 30s timeout

Viết chương trình:

- HTTP server lắng nghe `:8080`, có endpoint `/slow` sleep 3s rồi trả `200 OK`.
- Bắt SIGINT/SIGTERM, `srv.Shutdown(ctx)` với timeout 30s.
- Log: "shutdown started", "shutdown complete".
- Test bằng `curl localhost:8080/slow &` rồi `Ctrl+C` server — xác minh curl nhận response trước khi server exit.

### BT2: HTTP + worker pool shutdown đồng thời với errgroup

- HTTP server (như BT1).
- Worker pool 3 goroutine, mỗi worker đọc job từ channel, xử lý 1s/job.
- Dùng `errgroup.WithContext`. Khi signal: stop HTTP, stop worker, wait cả 2.
- Sequence: stop HTTP listener → wait HTTP handler → wait worker → close DB mock.

### BT3: Readiness toggle false trước khi shutdown

- HTTP server với `/livez` luôn 200, `/readyz` trả 200 nếu `ready=true`, 503 nếu false.
- Khi nhận signal: `ready.Store(false)` → sleep 5s (mô phỏng LB drain) → `srv.Shutdown(ctx)`.
- Test: `curl /readyz` trước/sau khi signal.

### BT4: Detect goroutine leak khi shutdown sai

- Viết 2 phiên bản worker: one không check `ctx.Done()`, one có.
- In `runtime.NumGoroutine()` trước shutdown, sau `g.Wait()`.
- So sánh: phiên bản sai để lại goroutine, phiên bản đúng dọn sạch.

### BT5: K8s deployment với preStop 5s drain

Viết file `deployment.yaml` với:

- `terminationGracePeriodSeconds: 30`.
- `preStop` hook sleep 5s.
- Readiness probe path `/readyz`, period 2s.
- Liveness probe path `/livez`, period 10s.

### BT6: Fix 4 antipattern shutdown

Code sau có 4 lỗi shutdown, tìm và sửa:

```go
func main() {
    db, _ := sql.Open("postgres", dsn)
    mux := http.NewServeMux()
    mux.HandleFunc("/", handler)

    jobCh := make(chan int, 100)
    go func() {
        for j := range jobCh {
            doJob(db, j)
        }
    }()

    srv := &http.Server{Addr: ":8080", Handler: mux}
    go srv.ListenAndServe()

    sigCh := make(chan os.Signal)
    signal.Notify(sigCh, os.Interrupt)

    <-sigCh
    db.Close()
    srv.Close()
    close(jobCh)
}
```

---

## Lời giải chi tiết

### BT1 — HTTP server graceful 30s

```go
package main

import (
    "context"
    "log"
    "net/http"
    "os"
    "os/signal"
    "syscall"
    "time"
)

func main() {
    mux := http.NewServeMux()
    mux.HandleFunc("/slow", func(w http.ResponseWriter, r *http.Request) {
        time.Sleep(3 * time.Second)
        w.Write([]byte("OK\n"))
    })

    srv := &http.Server{Addr: ":8080", Handler: mux}
    go func() {
        if err := srv.ListenAndServe(); err != nil && err != http.ErrServerClosed {
            log.Fatalf("listen: %v", err)
        }
    }()
    log.Println("listening :8080")

    sigCh := make(chan os.Signal, 1)
    signal.Notify(sigCh, os.Interrupt, syscall.SIGTERM)
    <-sigCh

    log.Println("shutdown started")
    ctx, cancel := context.WithTimeout(context.Background(), 30*time.Second)
    defer cancel()
    if err := srv.Shutdown(ctx); err != nil {
        log.Printf("shutdown error: %v", err)
    }
    log.Println("shutdown complete")
}
```

**Cách kiểm**: terminal 1 `go run main.go`. Terminal 2 `curl -v localhost:8080/slow &`. Quay lại terminal 1 bấm Ctrl+C. Quan sát: log "shutdown started" hiện ra, server không exit ngay, ~3s sau curl trả `200 OK`, server log "shutdown complete" rồi exit.

### BT2 — HTTP + worker errgroup

```go
g, ctx := errgroup.WithContext(rootCtx)

srv := &http.Server{Addr: ":8080", Handler: mux}
g.Go(func() error {
    if err := srv.ListenAndServe(); err != nil && err != http.ErrServerClosed {
        return err
    }
    return nil
})
g.Go(func() error {
    <-ctx.Done()
    sCtx, cancel := context.WithTimeout(context.Background(), 25*time.Second)
    defer cancel()
    return srv.Shutdown(sCtx)
})

jobCh := make(chan int, 100)
var workerWg sync.WaitGroup
for i := 0; i < 3; i++ {
    workerWg.Add(1)
    g.Go(func() error {
        defer workerWg.Done()
        for {
            select {
            case <-ctx.Done():
                return nil
            case j := <-jobCh:
                time.Sleep(1 * time.Second)
                _ = j
            }
        }
    })
}

if err := g.Wait(); err != nil {
    log.Printf("group: %v", err)
}
```

**Key**: `Shutdown` dùng context riêng (`sCtx`), không phải `ctx` đã cancel.

### BT3 — Readiness toggle

```go
var ready atomic.Bool
ready.Store(true)

mux.HandleFunc("/livez", func(w http.ResponseWriter, r *http.Request) { w.WriteHeader(200) })
mux.HandleFunc("/readyz", func(w http.ResponseWriter, r *http.Request) {
    if !ready.Load() {
        http.Error(w, "not ready", 503)
        return
    }
    w.WriteHeader(200)
})

// ... main:
<-sigCh
ready.Store(false)
log.Println("readiness=false, waiting 5s for LB drain")
time.Sleep(5 * time.Second)
srv.Shutdown(ctx)
```

**Kiểm**: `curl localhost:8080/readyz` → 200. Bấm Ctrl+C. `curl localhost:8080/readyz` ngay trong 5s đầu → 503.

### BT4 — Goroutine leak

```go
// Sai
go func() {
    for j := range jobCh {
        process(j)
    }
}()
// jobCh không bao giờ close → goroutine leak vĩnh viễn.

// Đúng
go func() {
    for {
        select {
        case <-ctx.Done():
            return
        case j := <-jobCh:
            process(j)
        }
    }
}()
```

**Detect**: in `runtime.NumGoroutine()`. Phiên bản sai: trước shutdown 10, sau 1 (chỉ main). Phiên bản đúng: trước 10, sau khi g.Wait() chỉ còn 1.

Pitfall đặc biệt: `time.Sleep(100*time.Millisecond)` sau `g.Wait()` rồi mới in — vì goroutine cần vài ms để thực sự exit sau khi return.

### BT5 — K8s YAML

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: my-app
spec:
  replicas: 3
  selector:
    matchLabels: { app: my-app }
  template:
    metadata:
      labels: { app: my-app }
    spec:
      terminationGracePeriodSeconds: 30
      containers:
      - name: app
        image: my-app:v1
        ports:
        - containerPort: 8080
        lifecycle:
          preStop:
            exec:
              command: ["/bin/sh", "-c", "sleep 5"]
        readinessProbe:
          httpGet: { path: /readyz, port: 8080 }
          periodSeconds: 2
          failureThreshold: 1
        livenessProbe:
          httpGet: { path: /livez, port: 8080 }
          periodSeconds: 10
          failureThreshold: 3
```

**Tính tổng thời gian rolling**:

- 5s preStop + 25s app graceful = 30s = `terminationGracePeriodSeconds` ✓.

### BT6 — Fix antipattern

4 lỗi trong code đề:

1. **`sigCh` unbuffered** — `make(chan os.Signal)` → signal có thể bị drop. Sửa: `make(chan os.Signal, 1)`.
2. **Quên SIGTERM** — `signal.Notify(sigCh, os.Interrupt)` → docker/k8s kill cứng. Sửa: thêm `syscall.SIGTERM`.
3. **Sequence sai** — `db.Close()` trước `srv.Close()` → handler đang dùng DB bị cắt. Sửa: shutdown HTTP trước, chờ handler, rồi close DB.
4. **`srv.Close()` thay vì `srv.Shutdown(ctx)`** — Close đóng cứng. Sửa: dùng Shutdown với timeout.
5. **Bonus: worker không check ctx** — nếu producer không close `jobCh`, worker leak. Sửa: dùng `select { case <-ctx.Done(); case j := <-jobCh }`.

Code fix:

```go
func main() {
    db, _ := sql.Open("postgres", dsn)
    mux := http.NewServeMux()
    mux.HandleFunc("/", handler)

    rootCtx, stop := signal.NotifyContext(context.Background(),
        os.Interrupt, syscall.SIGTERM)
    defer stop()

    jobCh := make(chan int, 100)
    var workerWg sync.WaitGroup
    workerWg.Add(1)
    go func() {
        defer workerWg.Done()
        for {
            select {
            case <-rootCtx.Done():
                return
            case j := <-jobCh:
                doJob(db, j)
            }
        }
    }()

    srv := &http.Server{Addr: ":8080", Handler: mux}
    go func() {
        if err := srv.ListenAndServe(); err != nil && err != http.ErrServerClosed {
            log.Fatal(err)
        }
    }()

    <-rootCtx.Done()
    log.Println("shutdown started")

    ctx, cancel := context.WithTimeout(context.Background(), 25*time.Second)
    defer cancel()
    srv.Shutdown(ctx)

    workerWg.Wait()
    db.Close()
    log.Println("done")
}
```

---

## Code & Minh họa

- [solutions.go](./solutions.go) — HTTP server + worker pool + signal handling + errgroup + readiness toggle. Chạy: `go run solutions.go`, bấm Ctrl+C để test.
- [visualization.html](./visualization.html) — 3 module tương tác: shutdown sequence, signal timeline, K8s rolling update.

---

## Bài tiếp theo

- [Lesson 52 — Rate Limit & Circuit Breaker →](../lesson-52-rate-limit-circuit-breaker/)
- Tham khảo: [Lesson 29 — Context & Cancellation](../lesson-29-context-cancellation/), [Lesson 42 — HTTP net/http Deep](../lesson-42-http-net-deep/).
