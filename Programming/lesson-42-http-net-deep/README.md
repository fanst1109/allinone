# Lesson 42 — `net/http` Deep: Hiểu sâu HTTP server/client trong Go stdlib

> **Tier 4 — Web & Backend · Lesson 42 / 53**
>
> Tiền đề: [L18 — Interfaces](../lesson-18-interfaces/), [L23 — JSON](../lesson-23-json-encoding/),
> [L27 — Goroutines & Channels](../lesson-27-goroutines-channels/),
> [L29 — Context](../lesson-29-context-cancellation/),
> [L40 — Error Handling Deep](../lesson-40-error-handling-deep/).

## Mục tiêu học tập

Sau lesson này bạn sẽ:

1. Đọc được code của một HTTP service Go viết thuần `net/http` mà không cần framework, hiểu **mỗi dòng đang nói chuyện với ai** trong runtime.
2. Phân biệt rõ `http.Handler` (interface) vs `http.HandlerFunc` (adapter), vs `http.ServeMux` (router); **biết khi nào cần cái nào**.
3. Viết được middleware đúng cách: chain `Logger(Auth(Recover(handler)))`, không leak goroutine, không nuốt panic.
4. Tránh được **5 cái bẫy "im lặng nhưng chết người"** của `net/http`: WriteHeader sau Write, quên close response body, đọc body 2 lần, dùng DefaultServeMux global, set header sau khi đã ghi status.
5. Build được HTTP **client** production-grade: timeout, retry với jitter, custom `Transport`.
6. Hiểu vì sao một reverse proxy 80 dòng (`httputil.NewSingleHostReverseProxy`) có thể đứng giữa nginx + service như thật.

---

## 1. HTTP cơ bản — recap nhanh để nói cùng ngôn ngữ

### 1.1 Anatomy của một HTTP request/response

> 💡 **Trực giác.** HTTP là một cuộc đối thoại bằng văn bản qua TCP. Client gửi 1 message ("request"),
> server trả về 1 message ("response"). Cả hai đều có **dòng đầu**, **block header**, một dòng trống, rồi **body**.

Một HTTP/1.1 request thật trên dây (raw bytes — không phải qua API Go):

```
POST /users HTTP/1.1\r\n
Host: api.example.com\r\n
Content-Type: application/json\r\n
Content-Length: 27\r\n
Authorization: Bearer eyJhbGciOi...\r\n
\r\n
{"name":"alice","age":30}
```

Response:

```
HTTP/1.1 201 Created\r\n
Content-Type: application/json\r\n
Content-Length: 49\r\n
Date: Sun, 26 May 2026 14:00:00 GMT\r\n
\r\n
{"id":"u_42","name":"alice","age":30,"createdAt":"..."}
```

Bốn thứ cấu thành **request**:

- **Request line**: `METHOD PATH HTTP/VERSION` — vd `POST /users HTTP/1.1`.
- **Headers**: cặp `Key: Value`, kết thúc bằng dòng trống.
- **Body**: byte stream tuỳ ý (JSON, form, file binary, v.v.).
- **Trailers** (ít gặp): header gửi sau body, dùng cho chunked encoding.

### 1.2 HTTP method — verb của API

| Method   | Idempotent | Safe | Body | Mục đích chính |
|----------|:---------:|:---:|:---:|------------------|
| `GET`    | ✓ | ✓ | thường không | Đọc tài nguyên |
| `HEAD`   | ✓ | ✓ | không | Như GET nhưng chỉ trả header |
| `POST`   | ✗ | ✗ | ✓ | Tạo / hành động không idempotent |
| `PUT`    | ✓ | ✗ | ✓ | Thay thế toàn bộ tài nguyên |
| `PATCH`  | ✗ | ✗ | ✓ | Sửa một phần (theo RFC 5789) |
| `DELETE` | ✓ | ✗ | thường không | Xoá tài nguyên |
| `OPTIONS`| ✓ | ✓ | không | CORS preflight, capability discovery |

> **Safe** = không thay đổi state. **Idempotent** = gọi nhiều lần cho cùng kết quả như gọi 1 lần.
> `DELETE` được coi là idempotent dù lần 2 trả 404 — vì *state* sau hai lần là như nhau (resource biến mất).

### 1.3 Status code — code số 3 chữ số

5 nhóm theo chữ số đầu:

- `1xx` informational — hiếm dùng tay (`101 Switching Protocols` cho WebSocket).
- `2xx` success.
- `3xx` redirect.
- `4xx` client error (caller sai).
- `5xx` server error (server sai hoặc hạ tầng hỏng).

> ⚠ **Lỗi thường gặp.** Đừng trả `200 OK` kèm body `{"error":"..."}`. Trả `200` báo cho client "mọi thứ OK",
> và **proxy/middleware không thể biết** đó là lỗi nếu chỉ nhìn status. Browser cache, retry library,
> APM (Datadog, NewRelic) sẽ phân loại sai.

### 1.4 Header phổ biến

| Header | Hướng | Mục đích |
|--------|:----:|----------|
| `Content-Type` | cả 2 | MIME type của body (`application/json`, `text/html`, `multipart/form-data`) |
| `Content-Length` | cả 2 | Số byte body (omit khi dùng `Transfer-Encoding: chunked`) |
| `Host` | request | Hostname (bắt buộc với HTTP/1.1) |
| `User-Agent` | request | Client identifier |
| `Accept` | request | Content type mà client muốn nhận |
| `Authorization` | request | Credential (`Bearer xxx`, `Basic xxx`) |
| `Cookie` | request | Cookie client gửi kèm |
| `Set-Cookie` | response | Server set cookie cho client |
| `Cache-Control` | cả 2 | Cache policy (`no-store`, `max-age=3600`) |
| `Location` | response | URL mới cho 3xx redirect hoặc 201 Created |
| `Access-Control-*` | cả 2 | CORS |

### 1.5 Ví dụ số: 4 cặp request/response

| # | Request | Response |
|---|---------|----------|
| 1 | `GET /health HTTP/1.1` | `200 OK\n\nok` |
| 2 | `POST /login` body `{"u":"a","p":"x"}` | `401 Unauthorized\n\n{"error":"bad creds"}` |
| 3 | `GET /users/42` | `404 Not Found\n\n{"error":"user 42 not found"}` |
| 4 | `DELETE /users/42` (gọi lần 2) | `404 Not Found` — vẫn idempotent vì state cuối là "đã xoá" |

> 🔁 **Tự kiểm tra.** Khi nào dùng `409 Conflict` thay vì `422 Unprocessable Entity`?
>
> <details><summary>Đáp án</summary>
>
> `422` — input có cú pháp đúng nhưng giá trị sai luật nghiệp vụ (vd email format hợp lệ nhưng `age = -5`).
> `409` — request hợp lệ về cú pháp **và** giá trị, nhưng xung đột với state hiện tại (vd `POST /users` với
> username đã tồn tại, hoặc `PUT` với `If-Match` ETag không khớp).
>
> </details>

---

## 2. `http.Handler` — trái tim của `net/http`

### 2.1 Interface 1 method

> 💡 **Trực giác.** Toàn bộ `net/http` server xoay quanh **một interface duy nhất**:
> "đưa cho tôi cái gì biết cách phản hồi 1 request, tôi sẽ chạy nó cho bạn".

```go
package http

type Handler interface {
    ServeHTTP(ResponseWriter, *Request)
}
```

Đó là **toàn bộ contract**. Bất cứ struct/function nào implement `ServeHTTP(w, r)` đều dùng được làm handler. Không decorator, không framework, không magic.

Ví dụ Handler dạng struct (giữ state):

```go
type CounterHandler struct {
    mu    sync.Mutex
    count int
}

func (c *CounterHandler) ServeHTTP(w http.ResponseWriter, r *http.Request) {
    c.mu.Lock()
    c.count++
    n := c.count
    c.mu.Unlock()
    fmt.Fprintf(w, "request số %d\n", n)
}
```

### 2.2 `http.HandlerFunc` — adapter cho function

Nhiều handler không cần state, chỉ là một function `(w, r) -> void`. Go cung cấp adapter:

```go
type HandlerFunc func(ResponseWriter, *Request)

// HandlerFunc tự implement Handler bằng cách... gọi chính nó.
func (f HandlerFunc) ServeHTTP(w ResponseWriter, r *Request) {
    f(w, r)
}
```

Đây là trick **convert function → interface** đẹp nhất trong stdlib Go. Cách dùng:

```go
hello := http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
    fmt.Fprintln(w, "hello world")
})
// hello giờ thoả http.Handler — có thể truyền cho mux, middleware, ListenAndServe.
```

> ❓ **Câu hỏi tự nhiên.**
>
> 1. *"Sao không truyền thẳng function thay vì wrap qua HandlerFunc?"* — vì `http.Handler` là interface, function thường **không** thoả interface (function không có method). `HandlerFunc` là type-converted function biết cách gọi chính nó qua `ServeHTTP`.
> 2. *"Tốn performance không?"* — không. Compiler inline gần như hết; chỉ thêm 1 indirection lúc dispatch.
> 3. *"Tôi viết struct hay HandlerFunc?"* — không cần state → `HandlerFunc`. Cần state (counter, DB pool, config) → struct.

### 2.3 Mux cũng là Handler

`http.ServeMux` (router) cũng implement `ServeHTTP` — nó chỉ là một Handler đặc biệt biết cách **dispatch sang Handler khác** dựa trên URL. Đệ quy. Đẹp.

> 📝 **Tóm tắt mục 2.** `http.Handler` = 1 interface 1 method. `HandlerFunc` = adapter biến function thành Handler. Mọi thứ khác trong `net/http` (mux, middleware, server) đều xoay quanh interface này.

---

## 3. `http.ServeMux` — router built-in

### 3.1 Mux mặc định vs mux riêng

```go
http.HandleFunc("/", handler) // dùng DefaultServeMux — GLOBAL, mọi package import http đều dùng chung.
http.ListenAndServe(":8080", nil) // nil = DefaultServeMux.
```

> ⚠ **Cảnh báo lớn.** `DefaultServeMux` là biến toàn cục. Nếu lib bên thứ ba (như `net/http/pprof`) import và gọi `http.HandleFunc("/debug/pprof/...", ...)` thì route đó **xuất hiện trên server của bạn**. Đó là cách `pprof` "auto-register" — tiện cho debug, **nguy hiểm cho production**. Best practice: luôn tạo mux riêng.

```go
mux := http.NewServeMux()
mux.HandleFunc("/health", healthHandler)
mux.HandleFunc("/users/", usersHandler)
http.ListenAndServe(":8080", mux)
```

### 3.2 Pattern matching — Go 1.21 vs Go 1.22+

**Trước Go 1.22** (cũ): mux chỉ match prefix, không có method, không có path param.

- `/users` — match **exact** `/users` only.
- `/users/` — match `/users/` và mọi đường con (`/users/42`, `/users/42/posts`).

**Go 1.22+** (mới): hỗ trợ method và path param.

```go
mux.HandleFunc("GET /users", listUsers)
mux.HandleFunc("POST /users", createUser)
mux.HandleFunc("GET /users/{id}", getUser)
mux.HandleFunc("PUT /users/{id}", updateUser)
mux.HandleFunc("DELETE /users/{id}", deleteUser)
mux.HandleFunc("GET /users/{id}/posts/{postID}", getUserPost)

// Trong handler, lấy param:
id := r.PathValue("id")
postID := r.PathValue("postID")
```

### 3.3 Ví dụ số: 4 pattern + URL match thử

| Pattern (Go 1.22+) | URL `GET /users/42` | URL `POST /users/42` | URL `/users/42/posts/7` |
|--------------------|:----:|:----:|:----:|
| `GET /users/{id}` | ✓ | ✗ (sai method) | ✗ (path dài hơn) |
| `/users/{id}` | ✓ | ✓ | ✗ |
| `/users/` | ✓ | ✓ | ✓ |
| `GET /users/{id}/posts/{postID}` | ✗ | ✗ | ✓ (chỉ với GET) |

### 3.4 Khi nào dùng router ngoài (chi, gin, gorilla/mux)?

ServeMux Go 1.22+ đủ cho **90% nhu cầu CRUD**. Đổi sang router ngoài khi cần:

- Middleware per-route hoặc per-group dễ hơn (chi: `r.Group(func(r) { r.Use(auth); r.Post(...) })`).
- Regex constraint trên param (`/users/{id:[0-9]+}`).
- Sub-router/mount với prefix động.
- URL reversal (gen URL từ tên route).

> 📝 **Tóm tắt mục 3.** ServeMux Go 1.22+ đã đủ tốt cho CRUD. Luôn dùng mux riêng (`http.NewServeMux()`), không bao giờ dùng `DefaultServeMux` trong code production.

---

## 4. `http.ListenAndServe` — kick off server

```go
func ListenAndServe(addr string, handler Handler) error
```

Một dòng start server. Dưới capo:

1. Tạo `net.Listener` bằng `net.Listen("tcp", addr)`.
2. Loop `listener.Accept()` — block tới khi có connection mới.
3. Mỗi connection mở **goroutine riêng** chạy `conn.serve()`.
4. `conn.serve()` parse HTTP frame, build `*Request`, gọi `handler.ServeHTTP(w, r)`.

Server "thật" (configurable):

```go
srv := &http.Server{
    Addr:         ":8080",
    Handler:      mux,
    ReadTimeout:  5 * time.Second,
    WriteTimeout: 10 * time.Second,
    IdleTimeout:  120 * time.Second,
}
log.Fatal(srv.ListenAndServe())
```

> ⚠ **Quan trọng cho production**: `http.ListenAndServe(":8080", mux)` **KHÔNG** set timeout. Một client mở connection rồi không gửi gì → goroutine kẹt vô hạn. Luôn dùng `&http.Server{}` rồi gọi `.ListenAndServe()`.

| Timeout | Đo cái gì | Khuyến nghị |
|---------|-----------|-------------|
| `ReadTimeout` | Toàn bộ thời gian đọc request (headers + body) | 5–30s tuỳ workload |
| `WriteTimeout` | Toàn bộ thời gian ghi response | 10–60s |
| `IdleTimeout` | Connection idle giữa các request (keep-alive) | 60–120s |
| `ReadHeaderTimeout` | Chỉ phần header | 2–10s (chống slowloris) |

---

## 5. Request lifecycle — what happens per request

> 💡 **Trực giác.** Một request đi qua **6 bước** trong Go runtime. Hiểu được thứ tự này = debug được hầu hết bug.

```
[1] listener.Accept()  ──┐
                          ▼
[2] go conn.serve(ctx)   (mỗi conn 1 goroutine)
        ▼
[3] parse request line + headers
        ▼
[4] dispatch: mux.ServeHTTP(w, r) → handler.ServeHTTP(w, r)
        ▼
[5] handler: w.Header().Set(...) → w.WriteHeader(status) → w.Write(body)
        ▼
[6] flush response, decide keep-alive vs close, goroutine quay lại bước [3] nếu keep-alive
```

Ví dụ số cụ thể: server `:8080`, mux có route `GET /users/{id}`, client gửi `GET /users/42`.

| Bước | Ai làm | Output |
|------|--------|--------|
| 1 | runtime | `listener.Accept()` trả `conn` |
| 2 | runtime | `go conn.serve(ctx)` — spawn goroutine |
| 3 | `net/http` parser | tạo `*Request{Method:"GET", URL.Path:"/users/42"}` |
| 4 | mux | match pattern `GET /users/{id}` → gọi handler, `r.PathValue("id")="42"` |
| 5 | handler | set header `Content-Type: application/json`, `WriteHeader(200)`, ghi `{"id":42}` |
| 6 | runtime | flush bytes, check `Connection: keep-alive`, lặp lại bước 3 trên cùng conn |

> ❓ **Câu hỏi tự nhiên.**
>
> 1. *"Mỗi request 1 goroutine — sẽ tốn memory không?"* — goroutine khởi đầu chỉ ~2KB stack. 10k req/s đồng thời = ~20MB. Go scale tốt.
> 2. *"Nếu handler panic thì sao?"* — `conn.serve` có sẵn `defer recover()` cho panic → log + close conn. Nhưng **không tự khôi phục** state đang dở; tốt nhất viết middleware `Recover` riêng để trả 500 cho client.
> 3. *"Goroutine của handler kết thúc khi nào?"* — khi handler return. Nếu handler spawn goroutine khác (vd background job), goroutine đó vẫn sống — **phải tự quản lý**, dùng `r.Context()` để biết client đã hủy chưa.

---

## 6. `http.Request` — input của handler

### 6.1 Field thường dùng

```go
type Request struct {
    Method     string         // "GET", "POST", ...
    URL        *url.URL       // path, query, fragment
    Proto      string         // "HTTP/1.1"
    Header     http.Header    // map[string][]string
    Body       io.ReadCloser  // body stream (close khi xong)
    Host       string         // header Host
    Form       url.Values     // parsed form (sau ParseForm)
    PostForm   url.Values     // chỉ field từ body (không query)
    RemoteAddr string         // "10.0.0.5:54321" — ip:port client (hoặc proxy)
    RequestURI string         // raw URI từ request line
    TLS        *tls.ConnectionState // nil nếu plain HTTP
    // ctx ẩn trong field private, lấy bằng r.Context()
}
```

### 6.2 Truy cập

- `r.Header.Get("Content-Type")` — đọc 1 header (case-insensitive).
- `r.URL.Query().Get("q")` — query param.
- `r.URL.Path` — `"/users/42"`.
- `r.Context()` — `context.Context` của request; tự cancel khi client đóng connection.
- `r.PathValue("id")` (Go 1.22+) — path param từ mux pattern.

### 6.3 Ví dụ số: 4 request và field tương ứng

| Request | `r.Method` | `r.URL.Path` | `r.URL.RawQuery` | `r.Header.Get("Content-Type")` |
|---------|-----------|--------------|------------------|--------------------------------|
| `GET /health` | `GET` | `/health` | `""` | `""` |
| `GET /search?q=go&limit=10` | `GET` | `/search` | `q=go&limit=10` | `""` |
| `POST /users` body JSON | `POST` | `/users` | `""` | `application/json` |
| `POST /upload` body form | `POST` | `/upload` | `""` | `multipart/form-data; boundary=...` |

---

## 7. `http.ResponseWriter` — output của handler

### 7.1 Interface 3 method

```go
type ResponseWriter interface {
    Header() Header                  // header để set TRƯỚC khi WriteHeader
    Write([]byte) (int, error)       // ghi body (implicit WriteHeader(200) nếu chưa gọi)
    WriteHeader(statusCode int)      // ghi status line; gọi ≤ 1 lần
}
```

### 7.2 Thứ tự CỰC KỲ quan trọng

```
       Header().Set("X-Y", "v")
              ↓
       WriteHeader(201)
              ↓
       Write(body)
```

Vi phạm thứ tự sẽ **silent** — không panic, không error, nhưng response sai:

```go
// SAI 1: WriteHeader rồi mới Set header
w.WriteHeader(200)
w.Header().Set("Content-Type", "application/json") // ⚠ KHÔNG có hiệu lực, status line đã gửi
w.Write([]byte(`{"ok":true}`))
// Client nhận: 200 OK, KHÔNG có Content-Type → có thể parse sai.
```

```go
// SAI 2: Write rồi mới WriteHeader
w.Write([]byte(`{"ok":true}`)) // implicit WriteHeader(200)
w.WriteHeader(201) // ⚠ Lỗi "http: superfluous response.WriteHeader call"
```

```go
// SAI 3: WriteHeader 2 lần
w.WriteHeader(201)
w.WriteHeader(500) // ⚠ Bị ignore, log warning. Lần 2 không hiệu lực.
```

> ❓ **Câu hỏi tự nhiên.** *"Tại sao không panic mà chỉ log?"* — vì lúc phát hiện sai, bytes status line đã đẩy ra socket rồi, không thể "rút lại". HTTP là stream forward-only. Go log để dev biết, nhưng không thể fix cho dev.

### 7.3 Helper

```go
http.Error(w, "user not found", http.StatusNotFound)
// = w.Header().Set("Content-Type", "text/plain; charset=utf-8")
//   w.Header().Set("X-Content-Type-Options", "nosniff")
//   w.WriteHeader(404); w.Write([]byte("user not found\n"))

http.Redirect(w, r, "/login", http.StatusSeeOther) // 303
http.NotFound(w, r) // 404 + "404 page not found"
http.ServeFile(w, r, "./public/index.html") // serve file kèm Content-Type + cache headers
```

### 7.4 Ví dụ số: 4 status code và cách write

| Use case | Code | Body | Header |
|----------|------|------|--------|
| Tạo user thành công | 201 | `{"id":42}` | `Location: /users/42` |
| Xoá thành công, không body | 204 | (empty) | (none) |
| Sai input | 400 | `{"error":"missing email"}` | `Content-Type: application/json` |
| DB down | 503 | `{"error":"db unavailable"}` | `Retry-After: 30` |

---

## 8. Reading request body

### 8.1 Ba cách phổ biến

```go
// (a) Read tất cả bytes
body, err := io.ReadAll(r.Body)
if err != nil { ... }
defer r.Body.Close()
```

```go
// (b) Decode JSON trực tiếp
var u User
if err := json.NewDecoder(r.Body).Decode(&u); err != nil {
    http.Error(w, "bad json", 400); return
}
defer r.Body.Close()
```

```go
// (c) Stream lớn — đọc chunk
buf := make([]byte, 4096)
for {
    n, err := r.Body.Read(buf)
    if n > 0 { process(buf[:n]) }
    if err == io.EOF { break }
    if err != nil { http.Error(w, "read error", 500); return }
}
defer r.Body.Close()
```

### 8.2 Pitfall: đọc body 2 lần

```go
body1, _ := io.ReadAll(r.Body) // OK, body1 chứa data
body2, _ := io.ReadAll(r.Body) // ⚠ body2 == [] vì r.Body đã EOF
```

Body là `io.Reader` 1 chiều, đọc xong thì hết. Nếu cần đọc 2 lần (vd middleware log + handler parse), phải clone:

```go
raw, _ := io.ReadAll(r.Body)
r.Body = io.NopCloser(bytes.NewReader(raw)) // gắn lại reader mới cho handler
// dùng raw để log...
```

### 8.3 Pitfall: quên `defer r.Body.Close()`

Server tự close body sau khi handler return, nhưng **đối với HTTP client**, response body **bắt buộc** caller close:

```go
resp, _ := http.Get(url)
defer resp.Body.Close() // BẮT BUỘC, không close = leak FD + connection không quay về pool
```

### 8.4 Giới hạn size để tránh OOM

```go
r.Body = http.MaxBytesReader(w, r.Body, 1<<20) // 1 MB
body, err := io.ReadAll(r.Body)
if err != nil {
    // err là *http.MaxBytesError nếu vượt limit → client thấy 400
    http.Error(w, "request too large", 413); return
}
```

> ⚠ **Lỗi thường gặp.** Không giới hạn size → attacker gửi 10GB body làm OOM server. Luôn `MaxBytesReader` cho public endpoint.

---

## 9. Form data — `application/x-www-form-urlencoded` & `multipart/form-data`

```go
func handler(w http.ResponseWriter, r *http.Request) {
    if err := r.ParseForm(); err != nil {
        http.Error(w, "bad form", 400); return
    }
    name := r.FormValue("name") // tìm trong cả query lẫn body form
    posts := r.PostForm["tag"]  // chỉ body, multiple values
}
```

- `r.ParseForm()` — parse query string + body nếu content type là `x-www-form-urlencoded`.
- `r.ParseMultipartForm(maxMemory)` — parse multipart, ghi temp file nếu vượt `maxMemory`.
- `r.FormValue("k")` — convenience, tự gọi `ParseForm()` (chỉ trả value đầu).
- `r.PostForm` — chỉ field từ body, **không** từ query.

### 9.1 Multipart upload

```go
r.ParseMultipartForm(10 << 20) // 10 MB in memory, lớn hơn → temp file
file, header, err := r.FormFile("avatar")
defer file.Close()
out, _ := os.Create("./uploads/" + header.Filename)
defer out.Close()
io.Copy(out, file)
```

> ⚠ **Bảo mật.** `header.Filename` đến từ client → có thể chứa `../../etc/passwd`. Luôn sanitize (`filepath.Base`) và validate extension.

---

## 10. Query params

```go
// URL: /search?q=go&tag=web&tag=backend&limit=10
q := r.URL.Query()              // url.Values = map[string][]string
keyword := q.Get("q")           // "go" (lấy giá trị đầu)
tags := q["tag"]                // []string{"web","backend"}
limit, _ := strconv.Atoi(q.Get("limit"))
```

| URL | `q.Get("q")` | `q["tag"]` |
|-----|--------------|-----------|
| `/?q=go` | `"go"` | `nil` |
| `/?q=` | `""` | `nil` |
| `/?q=go&tag=x&tag=y` | `"go"` | `["x","y"]` |
| `/` | `""` | `nil` |

> 🔁 **Tự kiểm tra.** Trong URL `/search?empty=&missing`, `q.Get("empty")` vs `q.Has("empty")` vs `q.Get("missing")` trả gì?
>
> <details><summary>Đáp án</summary>
>
> `q.Get("empty") == ""`, `q.Has("empty") == true` (Go 1.17+), `q.Get("missing") == ""`. Dùng `Has` để phân biệt "có nhưng rỗng" với "không có".
>
> </details>

---

## 11. Cookies

```go
// Set cookie
http.SetCookie(w, &http.Cookie{
    Name:     "session",
    Value:    "abc123",
    Path:     "/",
    HttpOnly: true,         // JS không đọc được → chống XSS đánh cắp
    Secure:   true,         // chỉ gửi qua HTTPS
    SameSite: http.SameSiteLaxMode,
    MaxAge:   3600,         // giây
})

// Read cookie
c, err := r.Cookie("session")
if err == http.ErrNoCookie { ... }
val := c.Value
```

### 11.1 Cookie attribute quan trọng

| Attribute | Mục đích |
|-----------|----------|
| `HttpOnly` | Chặn JS truy cập — bảo vệ session khỏi XSS |
| `Secure` | Chỉ truyền qua HTTPS |
| `SameSite=Lax/Strict/None` | Chống CSRF |
| `MaxAge` | Thời gian sống (giây). `0` = session cookie. Âm = xoá ngay |
| `Path` | Cookie chỉ gửi cho path khớp prefix |
| `Domain` | Subdomain scope |

### 11.2 Signed cookie với HMAC

Cookie value plaintext có thể bị giả mạo. Sign bằng HMAC để verify:

```go
func signCookie(name, val, secret string) string {
    mac := hmac.New(sha256.New, []byte(secret))
    mac.Write([]byte(name + "|" + val))
    sig := hex.EncodeToString(mac.Sum(nil))
    return val + "|" + sig
}

func verifyCookie(name, raw, secret string) (string, bool) {
    parts := strings.SplitN(raw, "|", 2)
    if len(parts) != 2 { return "", false }
    val, sig := parts[0], parts[1]
    mac := hmac.New(sha256.New, []byte(secret))
    mac.Write([]byte(name + "|" + val))
    want := hex.EncodeToString(mac.Sum(nil))
    return val, hmac.Equal([]byte(sig), []byte(want))
}
```

> ⚠ Dùng `hmac.Equal` chứ KHÔNG dùng `==` để so chữ ký — `hmac.Equal` constant-time, chống timing attack.

---

## 12. Set header — phải TRƯỚC `WriteHeader`

```go
w.Header().Set("Content-Type", "application/json")
w.Header().Set("Cache-Control", "no-store")
w.Header().Set("X-Request-ID", reqID)
// ↑↑↑ Tất cả phải Set xong TRƯỚC dòng dưới ↓↓↓
w.WriteHeader(http.StatusCreated)
w.Write(body)
```

### 12.1 Header CORS thường dùng

| Header | Khi nào |
|--------|---------|
| `Access-Control-Allow-Origin: https://app.example.com` | Cross-origin allowed |
| `Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS` | Method allowed cho preflight |
| `Access-Control-Allow-Headers: Content-Type, Authorization` | Header allowed |
| `Access-Control-Allow-Credentials: true` | Cho phép cookie cross-origin |
| `Access-Control-Max-Age: 86400` | Cache preflight 1 ngày |

> ❓ *"Vì sao đổi `Origin` rồi mà CORS vẫn fail?"* — browser cache preflight (`OPTIONS`) theo `Access-Control-Max-Age`. Hard reload hoặc đợi cache hết.

---

## 13. Status code — bảng tra cứu chuẩn

| Code | Tên | Khi nào dùng |
|------|-----|-------------|
| **200** | OK | Request thành công, có body |
| **201** | Created | Tạo resource thành công; kèm `Location` header chỉ URL resource mới |
| **204** | No Content | Thành công nhưng không có body (DELETE, PUT cập nhật không trả body) |
| **301** | Moved Permanently | Resource chuyển vĩnh viễn (SEO); client cache |
| **302** | Found | Chuyển tạm (giờ ít dùng, thay bằng 303/307) |
| **303** | See Other | Sau POST chuyển sang GET URL khác (PRG pattern) |
| **304** | Not Modified | Client đã có version mới nhất (ETag/If-None-Match match) |
| **307** | Temporary Redirect | Chuyển tạm, **giữ method** (POST stays POST) |
| **308** | Permanent Redirect | Như 301 nhưng giữ method |
| **400** | Bad Request | Cú pháp request sai (JSON không parse được, missing field bắt buộc) |
| **401** | Unauthorized | Thiếu/sai credential. Phải kèm `WWW-Authenticate` header |
| **403** | Forbidden | Có credential nhưng không đủ quyền |
| **404** | Not Found | Resource không tồn tại |
| **405** | Method Not Allowed | URL tồn tại nhưng method này không support; kèm `Allow: GET, POST` |
| **409** | Conflict | Xung đột state (duplicate, version conflict) |
| **413** | Payload Too Large | Body vượt limit |
| **422** | Unprocessable Entity | Cú pháp đúng nhưng giá trị sai luật nghiệp vụ |
| **429** | Too Many Requests | Rate limited; kèm `Retry-After` |
| **500** | Internal Server Error | Bug server hoặc panic |
| **502** | Bad Gateway | Upstream trả response không hợp lệ |
| **503** | Service Unavailable | Service tạm down (maintenance, overload); kèm `Retry-After` |
| **504** | Gateway Timeout | Upstream timeout |

---

## 14. Middleware pattern — chain các Handler

### 14.1 Định nghĩa

> 💡 **Trực giác.** Middleware = một function nhận Handler và **bọc** nó trong Handler mới với hành vi thêm vào (log, auth, recover...). Vì `Handler` là interface, middleware không quan tâm bên trong là gì — composable hoàn hảo.

```go
type Middleware func(http.Handler) http.Handler

func Logger(next http.Handler) http.Handler {
    return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
        start := time.Now()
        next.ServeHTTP(w, r) // gọi handler tiếp theo
        log.Printf("%s %s %s", r.Method, r.URL, time.Since(start))
    })
}

func Recover(next http.Handler) http.Handler {
    return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
        defer func() {
            if rec := recover(); rec != nil {
                log.Printf("PANIC %v\n%s", rec, debug.Stack())
                http.Error(w, "internal error", 500)
            }
        }()
        next.ServeHTTP(w, r)
    })
}

func RequestID(next http.Handler) http.Handler {
    return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
        id := r.Header.Get("X-Request-ID")
        if id == "" { id = randomID() }
        w.Header().Set("X-Request-ID", id)
        ctx := context.WithValue(r.Context(), ctxKey("reqID"), id)
        next.ServeHTTP(w, r.WithContext(ctx))
    })
}
```

### 14.2 Chain — outer wraps inner

```go
handler := Logger(Recover(RequestID(actualHandler)))
http.ListenAndServe(":8080", handler)
```

Thứ tự execution khi request đến:

```
Logger.before  →  Recover.before  →  RequestID.before  →  actualHandler  →
                                                                          ↓
              ←  Recover.after   ←  RequestID.after   ←  Logger.after  ←
```

Logger ngoài cùng → đo được **toàn bộ** thời gian (kể cả Recover/RequestID). Đặt Recover sát handler → bắt được panic của handler.

### 14.3 Helper chain

```go
func Chain(h http.Handler, mws ...Middleware) http.Handler {
    for i := len(mws) - 1; i >= 0; i-- {
        h = mws[i](h)
    }
    return h
}

handler := Chain(actualHandler, Logger, Recover, RequestID)
// Tương đương: Logger(Recover(RequestID(actualHandler)))
```

### 14.4 Ví dụ số: thời gian từng middleware

Giả sử request đi qua: `Logger(Recover(Handler))`, handler ngủ 100ms.

| Bước | Mốc thời gian (ms) | Ai làm |
|------|-------------------|--------|
| 0 | 0 | Logger before: ghi `start = now()` |
| 1 | 0.1 | Recover before: `defer recover()` |
| 2 | 0.2 | Handler bắt đầu, sleep 100ms |
| 3 | 100.2 | Handler return |
| 4 | 100.2 | Recover after: không có panic |
| 5 | 100.3 | Logger after: `log "100.3ms"` |

> 📝 **Tóm tắt mục 14.** Middleware = `func(Handler) Handler`. Chain bằng cách wrap từ trong ra. Logger ngoài cùng, Recover sát handler. `Chain` helper giúp code đẹp.

---

## 15. HTTP client

### 15.1 Convenience function (DEFAULT — KHÔNG dùng production)

```go
resp, err := http.Get("https://example.com")
resp, err := http.Post(url, "application/json", body)
resp, err := http.Head(url)
```

Các function này dùng `http.DefaultClient` — **timeout = 0 (vô hạn)**. Nếu server treo, client treo luôn. Không bao giờ dùng cho production.

### 15.2 Client thật

```go
client := &http.Client{
    Timeout: 10 * time.Second, // tổng thời gian (connect + read + write)
}

req, err := http.NewRequestWithContext(ctx, "POST", url, bytes.NewReader(body))
if err != nil { ... }
req.Header.Set("Content-Type", "application/json")
req.Header.Set("Authorization", "Bearer " + token)

resp, err := client.Do(req)
if err != nil { ... }
defer resp.Body.Close()

if resp.StatusCode >= 500 {
    // retryable
}
var result Response
json.NewDecoder(resp.Body).Decode(&result)
```

### 15.3 Custom `Transport`

```go
transport := &http.Transport{
    MaxIdleConns:        100,
    MaxIdleConnsPerHost: 10,
    IdleConnTimeout:     90 * time.Second,
    TLSHandshakeTimeout: 10 * time.Second,
}
client := &http.Client{
    Transport: transport,
    Timeout:   30 * time.Second,
}
```

### 15.4 Custom `RoundTripper` (middleware cho client)

```go
type loggingRT struct{ next http.RoundTripper }

func (l *loggingRT) RoundTrip(req *http.Request) (*http.Response, error) {
    start := time.Now()
    resp, err := l.next.RoundTrip(req)
    log.Printf("%s %s → %d in %s", req.Method, req.URL, resp.StatusCode, time.Since(start))
    return resp, err
}

client := &http.Client{
    Transport: &loggingRT{next: http.DefaultTransport},
    Timeout:   10 * time.Second,
}
```

### 15.5 Retry on 5xx

```go
func doWithRetry(client *http.Client, req *http.Request, maxAttempts int) (*http.Response, error) {
    var lastErr error
    for attempt := 1; attempt <= maxAttempts; attempt++ {
        // Clone body cho mỗi attempt (Reader chỉ đọc 1 lần)
        if req.GetBody != nil {
            b, _ := req.GetBody()
            req.Body = b
        }
        resp, err := client.Do(req)
        if err != nil {
            lastErr = err
        } else if resp.StatusCode < 500 {
            return resp, nil // success hoặc 4xx (không retry 4xx)
        } else {
            resp.Body.Close()
            lastErr = fmt.Errorf("status %d", resp.StatusCode)
        }
        backoff := time.Duration(1<<attempt) * 100 * time.Millisecond
        jitter := time.Duration(rand.Int63n(int64(backoff) / 2))
        time.Sleep(backoff + jitter)
    }
    return nil, lastErr
}
```

---

## 16. `httputil.NewSingleHostReverseProxy` — reverse proxy 5 dòng

```go
target, _ := url.Parse("http://backend:8080")
proxy := httputil.NewSingleHostReverseProxy(target)

http.ListenAndServe(":80", proxy)
```

Đó là toàn bộ. Mọi request đến `:80` được forward tới `http://backend:8080`, response trả về client.

Customize:

```go
proxy := httputil.NewSingleHostReverseProxy(target)
proxy.ModifyResponse = func(resp *http.Response) error {
    resp.Header.Set("X-Proxied-By", "go-proxy")
    return nil
}
proxy.ErrorHandler = func(w http.ResponseWriter, r *http.Request, err error) {
    http.Error(w, "upstream down", 502)
}
```

Đa upstream → tự load balance:

```go
upstreams := []*url.URL{u1, u2}
var counter uint64
proxy := func(w http.ResponseWriter, r *http.Request) {
    idx := atomic.AddUint64(&counter, 1) % uint64(len(upstreams))
    httputil.NewSingleHostReverseProxy(upstreams[idx]).ServeHTTP(w, r)
}
```

---

## 17. Pitfall checklist — 5 cái bẫy thường gặp

| # | Triệu chứng | Nguyên nhân | Fix |
|---|------------|------------|-----|
| 1 | FD leak, "too many open files" sau vài giờ | Client không `defer resp.Body.Close()` | Luôn close response body |
| 2 | Handler đọc body trả empty | Middleware đã `io.ReadAll(r.Body)` rồi | Middleware phải khôi phục body: `r.Body = io.NopCloser(bytes.NewReader(raw))` |
| 3 | Log "superfluous WriteHeader call" | Code gọi `WriteHeader` sau `Write` hoặc 2 lần | Đảm bảo gọi đúng 1 lần, trước Write |
| 4 | `Content-Type` header không hiệu lực | Set sau `WriteHeader` | Set trước `WriteHeader` |
| 5 | Test bị nhiễm route của lib khác (vd pprof) | Dùng `DefaultServeMux` | Luôn `mux := http.NewServeMux()` |

> ⚠ **Lỗi tinh vi #6.** Trong middleware bọc `ResponseWriter` để bắt status code, nếu chỉ wrap `WriteHeader` mà quên `Write`, status mặc định 200 sẽ không bao giờ bị bắt:
>
> ```go
> type srw struct {
>     http.ResponseWriter
>     status int
> }
> func (s *srw) WriteHeader(code int) { s.status = code; s.ResponseWriter.WriteHeader(code) }
> // Nhưng nếu handler chỉ Write mà không WriteHeader, s.status vẫn 0!
> // Fix: trong Write nếu status == 0 thì set = 200.
> func (s *srw) Write(b []byte) (int, error) {
>     if s.status == 0 { s.status = 200 }
>     return s.ResponseWriter.Write(b)
> }
> ```

---

## 18. Bài tập

### BT1. HTTP server với 3 endpoint JSON in/out

Build server có:

- `GET /` — trả `{"service":"users","version":"1.0"}`.
- `GET /users` — trả `[{"id":1,"name":"alice"}, ...]` (data trong memory).
- `POST /users` — nhận `{"name":"bob","age":25}`, trả `{"id":N,"name":"bob","age":25}` với status 201.

Yêu cầu: validate input (name non-empty, age 0–150), dùng mux Go 1.22+.

### BT2. Middleware chain Logger + Recover + RequestID

Viết 3 middleware:

- `Logger`: log `method path status duration`. Cần wrap `ResponseWriter` để bắt status.
- `Recover`: bắt panic, trả 500 + log stack.
- `RequestID`: gen `req_<random8hex>` nếu client không gửi, set vào header response + context.

Chain `Logger(Recover(RequestID(handler)))`. Test bằng cách handler nào đó panic.

### BT3. HTTP client với timeout, retry on 5xx

Viết function `Fetch(ctx, url) ([]byte, error)`:

- `http.Client` timeout 5s.
- Retry tối đa 3 lần nếu status ≥ 500 hoặc network error.
- Backoff: `100ms × 2^attempt + jitter`.
- Tôn trọng `ctx` (cancel ngắt retry).

### BT4. Signed cookie với HMAC

Viết 2 function:

- `SetSignedCookie(w, name, value, secret)`: set cookie với value đã sign HMAC-SHA256.
- `GetSignedCookie(r, name, secret) (string, error)`: đọc + verify; trả lỗi nếu sig sai.

### BT5. CORS middleware đầy đủ

Viết `CORS(allowedOrigins []string)` middleware:

- Preflight `OPTIONS`: trả 204 + đủ header `Access-Control-Allow-*`.
- Request thường: thêm `Access-Control-Allow-Origin` nếu `Origin` trong danh sách (echo về, không dùng `*` để bảo mật).

### BT6. Reverse proxy 2 upstream round-robin

`http.ListenAndServe(":8080", ...)` forward request lần lượt sang `http://localhost:9001` và `http://localhost:9002`. In log mỗi request đi đến upstream nào.

---

## 19. Lời giải chi tiết

### Giải BT1 — Server 3 endpoint

```go
type User struct {
    ID   int    `json:"id"`
    Name string `json:"name"`
    Age  int    `json:"age"`
}

var (
    usersMu  sync.Mutex
    usersDB  = []User{{ID: 1, Name: "alice", Age: 30}}
    nextID   = 2
)

func writeJSON(w http.ResponseWriter, status int, v any) {
    w.Header().Set("Content-Type", "application/json")
    w.WriteHeader(status)
    _ = json.NewEncoder(w).Encode(v)
}

func root(w http.ResponseWriter, r *http.Request) {
    writeJSON(w, 200, map[string]string{"service": "users", "version": "1.0"})
}

func listUsers(w http.ResponseWriter, r *http.Request) {
    usersMu.Lock()
    defer usersMu.Unlock()
    writeJSON(w, 200, usersDB)
}

func createUser(w http.ResponseWriter, r *http.Request) {
    r.Body = http.MaxBytesReader(w, r.Body, 1<<20)
    var in struct{ Name string; Age int }
    if err := json.NewDecoder(r.Body).Decode(&in); err != nil {
        http.Error(w, "bad json", 400); return
    }
    if strings.TrimSpace(in.Name) == "" || in.Age < 0 || in.Age > 150 {
        writeJSON(w, 422, map[string]string{"error": "invalid input"})
        return
    }
    usersMu.Lock()
    u := User{ID: nextID, Name: in.Name, Age: in.Age}
    nextID++
    usersDB = append(usersDB, u)
    usersMu.Unlock()
    w.Header().Set("Location", fmt.Sprintf("/users/%d", u.ID))
    writeJSON(w, 201, u)
}

func main() {
    mux := http.NewServeMux()
    mux.HandleFunc("GET /", root)
    mux.HandleFunc("GET /users", listUsers)
    mux.HandleFunc("POST /users", createUser)
    srv := &http.Server{Addr: ":8080", Handler: mux, ReadTimeout: 5*time.Second, WriteTimeout: 10*time.Second}
    log.Fatal(srv.ListenAndServe())
}
```

Test:

```
curl -s localhost:8080/                                    # {"service":"users","version":"1.0"}
curl -s localhost:8080/users                               # [{"id":1,"name":"alice","age":30}]
curl -s -X POST -d '{"name":"bob","age":25}' localhost:8080/users  # {"id":2,"name":"bob","age":25}
curl -s -X POST -d '{"name":"","age":-1}'    localhost:8080/users  # {"error":"invalid input"}
```

### Giải BT2 — Middleware chain

```go
type statusRW struct {
    http.ResponseWriter
    status int
}
func (s *statusRW) WriteHeader(c int) { s.status = c; s.ResponseWriter.WriteHeader(c) }
func (s *statusRW) Write(b []byte) (int, error) {
    if s.status == 0 { s.status = 200 }
    return s.ResponseWriter.Write(b)
}

type ctxKey string

func RequestID(next http.Handler) http.Handler {
    return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
        id := r.Header.Get("X-Request-ID")
        if id == "" {
            buf := make([]byte, 4)
            rand.Read(buf)
            id = "req_" + hex.EncodeToString(buf)
        }
        w.Header().Set("X-Request-ID", id)
        ctx := context.WithValue(r.Context(), ctxKey("reqID"), id)
        next.ServeHTTP(w, r.WithContext(ctx))
    })
}

func Recover(next http.Handler) http.Handler {
    return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
        defer func() {
            if rec := recover(); rec != nil {
                log.Printf("PANIC %v\n%s", rec, debug.Stack())
                http.Error(w, "internal error", 500)
            }
        }()
        next.ServeHTTP(w, r)
    })
}

func Logger(next http.Handler) http.Handler {
    return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
        start := time.Now()
        srw := &statusRW{ResponseWriter: w}
        next.ServeHTTP(srw, r)
        log.Printf("%s %s %d %s", r.Method, r.URL.Path, srw.status, time.Since(start))
    })
}

// Chain:
handler := Logger(Recover(RequestID(actualHandler)))
```

Vì sao thứ tự này? `Logger` ngoài cùng → log được status sau cùng. `Recover` sát handler → bắt panic của handler (và của RequestID nếu có). `RequestID` set ID trước handler chạy.

### Giải BT3 — Client với retry

```go
func Fetch(ctx context.Context, url string) ([]byte, error) {
    client := &http.Client{Timeout: 5 * time.Second}
    var lastErr error
    for attempt := 1; attempt <= 3; attempt++ {
        req, _ := http.NewRequestWithContext(ctx, "GET", url, nil)
        resp, err := client.Do(req)
        if err == nil && resp.StatusCode < 500 {
            defer resp.Body.Close()
            if resp.StatusCode >= 400 {
                return nil, fmt.Errorf("client error: %d", resp.StatusCode)
            }
            return io.ReadAll(resp.Body)
        }
        if resp != nil { resp.Body.Close() }
        lastErr = err
        if lastErr == nil { lastErr = fmt.Errorf("status %d", resp.StatusCode) }

        backoff := time.Duration(100*(1<<attempt)) * time.Millisecond
        jitter := time.Duration(rand.Int63n(int64(backoff) / 2))
        select {
        case <-time.After(backoff + jitter):
        case <-ctx.Done():
            return nil, ctx.Err()
        }
    }
    return nil, fmt.Errorf("after 3 attempts: %w", lastErr)
}
```

Walk-through ví dụ: attempt 1 fail (503) → sleep 200ms±100ms. Attempt 2 fail → sleep 400ms±200ms. Attempt 3 OK → return.

### Giải BT4 — Signed cookie

```go
func sign(name, val, secret string) string {
    mac := hmac.New(sha256.New, []byte(secret))
    mac.Write([]byte(name + "|" + val))
    return hex.EncodeToString(mac.Sum(nil))
}

func SetSignedCookie(w http.ResponseWriter, name, val, secret string) {
    sig := sign(name, val, secret)
    http.SetCookie(w, &http.Cookie{
        Name:     name,
        Value:    val + "|" + sig,
        Path:     "/", HttpOnly: true, SameSite: http.SameSiteLaxMode,
        MaxAge:   3600,
    })
}

func GetSignedCookie(r *http.Request, name, secret string) (string, error) {
    c, err := r.Cookie(name)
    if err != nil { return "", err }
    parts := strings.SplitN(c.Value, "|", 2)
    if len(parts) != 2 { return "", errors.New("malformed") }
    val, gotSig := parts[0], parts[1]
    wantSig := sign(name, val, secret)
    if !hmac.Equal([]byte(gotSig), []byte(wantSig)) {
        return "", errors.New("bad signature")
    }
    return val, nil
}
```

Verify bằng `hmac.Equal` (constant-time) chống timing attack.

### Giải BT5 — CORS middleware

```go
func CORS(allowed []string) func(http.Handler) http.Handler {
    set := make(map[string]bool, len(allowed))
    for _, o := range allowed { set[o] = true }
    return func(next http.Handler) http.Handler {
        return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
            origin := r.Header.Get("Origin")
            if origin != "" && set[origin] {
                w.Header().Set("Access-Control-Allow-Origin", origin)
                w.Header().Set("Vary", "Origin")
                w.Header().Set("Access-Control-Allow-Credentials", "true")
            }
            if r.Method == http.MethodOptions {
                w.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE, OPTIONS")
                w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Request-ID")
                w.Header().Set("Access-Control-Max-Age", "86400")
                w.WriteHeader(http.StatusNoContent) // 204
                return
            }
            next.ServeHTTP(w, r)
        })
    }
}
```

Echo `origin` thay vì `*` vì nếu cần `Allow-Credentials: true` thì `*` không được phép theo spec.

### Giải BT6 — Reverse proxy round-robin

```go
func main() {
    u1, _ := url.Parse("http://localhost:9001")
    u2, _ := url.Parse("http://localhost:9002")
    upstreams := []*url.URL{u1, u2}
    proxies := []*httputil.ReverseProxy{
        httputil.NewSingleHostReverseProxy(u1),
        httputil.NewSingleHostReverseProxy(u2),
    }
    var counter uint64
    http.ListenAndServe(":8080", http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
        idx := int(atomic.AddUint64(&counter, 1)-1) % len(proxies)
        log.Printf("→ %s %s", upstreams[idx], r.URL.Path)
        proxies[idx].ServeHTTP(w, r)
    }))
}
```

Tạo proxy **một lần** ngoài handler (mỗi proxy có connection pool riêng) — đừng tạo trong handler vì mỗi request sẽ tạo connection pool mới → lãng phí.

---

## 20. Code & Minh họa

- **Code đầy đủ**: [`solutions.go`](./solutions.go) — server demo với handler/middleware/client/proxy.
- **Visualization**: [`visualization.html`](./visualization.html) — 3 module tương tác:
  1. Request/response lifecycle animation từ Accept → Handler → Response.
  2. Middleware chain animation Logger → Auth → Recover → Handler.
  3. Status code picker — chọn scenario gợi ý status đúng.

Chạy server demo:

```bash
go run solutions.go
# Server lên cổng :8080, tự test với curl:
curl -v localhost:8080/health
curl -v -X POST -H "Content-Type: application/json" -d '{"name":"x","age":30}' localhost:8080/users
```

---

## 21. Bài tiếp theo

- **[Lesson 43 — REST API Design](../lesson-43-rest-api-design/)** — sau khi đã hiểu cơ chế `net/http`, học **design rest API**: resource modeling, versioning, idempotency, pagination, HATEOAS, RFC 7807 error.
- **Tham khảo sâu**: tài liệu chính thức `net/http` của Go, blog "Writing HTTP services in Go like Mat Ryer", spec RFC 7230-7235 (HTTP/1.1).
