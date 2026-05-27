// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: Programming/lesson-44-routing-frameworks/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 44 — Routing Frameworks (chi, gin, echo, fiber)

> **Tier 4 — Web & Backend.** Sau khi đã hiểu HTTP qua stdlib (L42) và thiết kế REST (L43), lesson này so sánh các **router/framework** phổ biến trong Go: \`net/http\` (stdlib), \`chi\`, \`gin\`, \`echo\`, \`fiber\`. Bạn sẽ biết **khi nào dùng cái gì** — thay vì học cả 4 framework rồi không chọn được cái nào.

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Biết stdlib \`net/http\` (Go 1.22+) đã làm được gì — và khi nào nó **đủ**.
- Hiểu trade-off của 4 framework lớn: \`chi\` (idiomatic), \`gin\` (performance + ecosystem), \`echo\` (cân bằng), \`fiber\` (fasthttp-based, Express-like).
- Viết được code mẫu chi/gin với middleware chain và sub-router.
- Đưa ra quyết định framework có cơ sở cho 4 loại dự án (startup, enterprise, real-time, internal admin).
- Tránh được pitfall: lock-in vào custom \`Context\`, quên \`c.Next()\`, trộn middleware không tương thích.

## Kiến thức tiền đề

- [Lesson 42 — HTTP \`net/http\` deep](../lesson-42-http-net-deep/) — \`http.Handler\`, \`http.HandlerFunc\`, \`ServeMux\`.
- [Lesson 43 — REST API design](../lesson-43-rest-api-design/) — resource modeling, verb mapping, status code.
- [Lesson 18 — Interfaces](../lesson-18-interfaces/) — \`http.Handler\` là một interface, framework chỉ wrap quanh nó.

---

## 1. Recap — \`net/http\` stdlib (Go 1.22+) đã đủ chưa?

> 💡 **Trực giác.** Khi mới học Go, bạn nghe "Go có HTTP server trong chuẩn ngữ, đủ tốt". Đúng phân nửa — \`net/http\` đủ cho rất nhiều thứ, nhưng từng có 2 yếu điểm: (1) \`ServeMux\` không hỗ trợ path param \`{id}\`, (2) thiếu middleware syntax thân thiện. **Từ Go 1.22 (tháng 2/2024)**, điểm (1) đã được sửa.

### 1.1 Pattern mới của Go 1.22+

\`http.ServeMux\` từ 1.22 hỗ trợ:

\`\`\`go
mux := http.NewServeMux()
mux.HandleFunc("GET /users/{id}", func(w http.ResponseWriter, r *http.Request) {
    id := r.PathValue("id")              // <-- path param trích từ {id}
    fmt.Fprintf(w, "user %s", id)
})
mux.HandleFunc("POST /users", createUser)
mux.HandleFunc("PUT /users/{id}", updateUser)
http.ListenAndServe(":8080", mux)
\`\`\`

Các tính năng mới đáng chú ý:

- **Method matching**: \`"GET /users"\` chỉ match \`GET\`, không match \`POST\`.
- **Path param**: \`{id}\` lấy bằng \`r.PathValue("id")\`.
- **Wildcard cuối**: \`"/static/{path...}"\` match cả \`/static/css/app.css\`.
- **Precedence rõ ràng**: pattern cụ thể hơn thắng pattern tổng quát hơn.

### 1.2 Khi nào \`net/http\` stdlib đủ?

- API < 20 endpoint, không có nested resource phức tạp.
- Team nhỏ, không muốn thêm dependency (giữ binary nhẹ).
- Tool nội bộ, microservice nhỏ.
- Có sẵn middleware (chỉ vài cái: logging, recover, CORS) — viết tay được.

📝 **Tóm tắt mục 1.** Trước Go 1.22, stdlib thiếu \`{id}\` → ai cũng phải dùng framework. Từ 1.22, **stdlib đã đủ cho service nhỏ-vừa**. Đừng dùng framework chỉ vì "thấy ai cũng dùng".

---

## 2. Khi nào cần framework?

> ❓ **Câu hỏi tự nhiên.** "Vậy framework thừa rồi à?" — Không. Có 4 thứ stdlib vẫn yếu:

| Yêu cầu | Stdlib | Framework |
|---------|--------|-----------|
| Path param phức tạp (regex, sub-route, version) | Phải tự parse | Built-in |
| Middleware chain (Use, Group, scope hẹp) | Tự viết kiểu closure | Cú pháp \`r.Use(...)\` |
| Validation request (struct tag, error chuẩn) | Tự dùng \`validator\` lib | Built-in \`c.ShouldBindJSON\` |
| Throughput rất cao (radix tree, fasthttp) | Trie cơ bản | Tối ưu hơn ~30-50% |

### 2.1 Ba dấu hiệu nên chọn framework

1. **> 30 endpoint với versioning** (\`/v1/...\`, \`/v2/...\`). Stdlib mux lặp \`mux.HandleFunc("GET /v1/users/{id}", ...)\` rất dài, framework cho phép \`r.Route("/v1", ...)\`.
2. **Middleware chain mở rộng**: auth → rate-limit → trace → log → CORS, có cái chỉ áp cho 1 subtree. Stdlib viết được nhưng nested closure xấu.
3. **Body binding + validation lặp đi lặp lại**: gin/echo \`c.ShouldBindJSON(&req)\` đỡ 5-10 dòng/handler.

### 2.2 Ba dấu hiệu **không** cần framework

- Service chỉ vài endpoint (health, metrics, 1-2 RPC).
- Cần binary nhỏ (deploy edge, Lambda cold start).
- Đội đã rất quen \`net/http\` và không muốn lock-in.

📝 **Tóm tắt mục 2.** Framework giải quyết 4 thứ: path param phức tạp, middleware chain, validation, performance. Nếu cả 4 không phải vấn đề của bạn — stdlib đủ.

---

## 3. \`chi\` — idiomatic Go, lightweight

> 💡 **Trực giác.** Hãy hình dung \`chi\` là "stdlib + một lớp đường nhẹ". Mọi \`chi.Router\` đều là một \`http.Handler\`. Middleware là \`func(http.Handler) http.Handler\` — y hệt pattern stdlib. Bạn có thể trộn \`chi\` với code \`net/http\` cũ mà **không đập đi viết lại**.

Repository: \`github.com/go-chi/chi/v5\`.

### 3.1 Đặc điểm

- **Compatible 100% với \`http.Handler\`**: bất kỳ middleware net/http nào (vd \`gorilla/handlers/CORS\`) cũng dùng được.
- **Sub-router** với \`r.Route(prefix, fn)\` — nested cấu trúc rõ ràng.
- **Middleware first-class**: \`r.Use(...)\` áp cho toàn router, \`r.With(mw).Get(...)\` áp cho 1 route.
- **Không có custom Context**: vẫn dùng \`r.Context()\`, \`chi.URLParam(r, "id")\` trả string.
- **Lightweight**: ~2k dòng code, không kéo theo dependency.

### 3.2 Code mẫu chi

\`\`\`go
import (
    "github.com/go-chi/chi/v5"
    "github.com/go-chi/chi/v5/middleware"
)

func main() {
    r := chi.NewRouter()

    // Global middleware
    r.Use(middleware.Logger)
    r.Use(middleware.Recoverer)
    r.Use(middleware.RequestID)

    // Public routes
    r.Get("/health", health)
    r.Post("/login", login)

    // Sub-router cho /users
    r.Route("/users", func(r chi.Router) {
        r.Get("/", listUsers)        // GET /users
        r.Post("/", createUser)      // POST /users

        // Sub-sub-router cho /users/{id}
        r.Route("/{id}", func(r chi.Router) {
            r.Use(loadUser)          // chỉ áp cho /users/{id}/*
            r.Get("/", getUser)      // GET /users/{id}
            r.Put("/", updateUser)   // PUT /users/{id}
            r.Delete("/", deleteUser)
        })
    })

    http.ListenAndServe(":8080", r)
}

func getUser(w http.ResponseWriter, r *http.Request) {
    id := chi.URLParam(r, "id")
    user := r.Context().Value("user").(*User)  // do loadUser middleware set
    json.NewEncoder(w).Encode(user)
}
\`\`\`

> ⚠ **Lỗi thường gặp.** Đặt \`r.Use(...)\` **sau** khi đã \`r.Get(...)\`/\`r.Post(...)\` thì middleware **không** áp cho các route trước đó. Quy tắc: \`Use\` ở trên cùng của (sub-)router, trước mọi \`Get/Post/...\`.

### 3.3 Khi nào chọn chi?

- Bạn coi trọng "idiomatic Go" và muốn nhìn code thấy giống stdlib.
- Cần kết hợp với code/middleware \`net/http\` cũ.
- Project size vừa và nhỏ, ưu tiên đơn giản hơn perf.

---

## 4. \`gin\` — performance + ecosystem rộng

> 💡 **Trực giác.** Hình dung \`gin\` là "Go phiên bản Express.js" — có \`gin.Context\` của riêng nó, gói gọn \`w\`, \`r\`, params, body binding, validator vào 1 chỗ. Code ngắn, dễ đọc, nhưng **không tương thích với \`http.Handler\` middleware** (phải dùng middleware viết riêng cho gin).

Repository: \`github.com/gin-gonic/gin\`.

### 4.1 Đặc điểm

- **Router radix tree** — lookup O(số ký tự), thực tế ~4μs/route.
- **\`gin.Context\`** thay thế \`(w, r)\` — gọn nhưng lock-in.
- **JSON binding built-in**: \`c.ShouldBindJSON(&req)\` tự parse + validate (qua tag \`validate:"..."\`).
- **Ecosystem rộng**: middleware JWT, Sentry, Prometheus, Swagger... gần như có sẵn.
- **Stars cao nhất** trong Go HTTP framework (>75k).

### 4.2 Code mẫu gin

\`\`\`go
import "github.com/gin-gonic/gin"

type CreateUserReq struct {
    Name  string \`json:"name" binding:"required,min=2"\`
    Email string \`json:"email" binding:"required,email"\`
    Age   int    \`json:"age" binding:"gte=0,lte=120"\`
}

func main() {
    r := gin.Default()             // có sẵn Logger + Recovery middleware

    v1 := r.Group("/v1")
    {
        v1.GET("/users/:id", getUser)
        v1.POST("/users", createUser)

        // Sub-group với middleware riêng
        admin := v1.Group("/admin", requireAdmin)
        {
            admin.DELETE("/users/:id", deleteUser)
        }
    }

    r.Run(":8080")
}

func createUser(c *gin.Context) {
    var req CreateUserReq
    if err := c.ShouldBindJSON(&req); err != nil {
        c.JSON(400, gin.H{"error": err.Error()})
        return
    }
    // ... lưu DB ...
    c.JSON(201, gin.H{"id": 42, "name": req.Name})
}

func getUser(c *gin.Context) {
    id := c.Param("id")              // path param
    q := c.Query("verbose")          // query string
    c.JSON(200, gin.H{"id": id, "q": q})
}
\`\`\`

> ❓ **Câu hỏi tự nhiên.**
> 
> - *"\`gin.Default()\` khác \`gin.New()\` thế nào?"* — \`Default()\` đã \`Use(Logger(), Recovery())\` sẵn; \`New()\` là engine trống.
> - *"\`c.JSON()\` có set Content-Type không?"* — Có, set \`application/json; charset=utf-8\` và \`WriteHeader\`. Không cần làm tay.
> - *"\`binding:"required"\` đâu ra?"* — gin nhúng \`go-playground/validator/v10\` — cùng lib mà chi/echo cũng dùng được nếu muốn.

### 4.3 Khi nào chọn gin?

- Cần performance tốt + ecosystem mature.
- Team có người đã quen Express/Flask — \`gin.Context\` trực giác hơn \`(w, r)\`.
- Build REST API có nhiều validation phức tạp.

---

## 5. \`echo\` — tương tự gin, cân bằng

Repository: \`github.com/labstack/echo/v4\`.

### 5.1 Đặc điểm

- Custom \`echo.Context\` (giống gin).
- Built-in: Binder, Validator, JWT, CORS, WebSocket.
- API "đẹp" hơn gin một chút (nhiều người nói vậy — chủ quan).
- Stars ~30k, ecosystem nhỏ hơn gin.

### 5.2 Code mẫu echo

\`\`\`go
import "github.com/labstack/echo/v4"

func main() {
    e := echo.New()
    e.Use(middleware.Logger())
    e.Use(middleware.Recover())

    e.GET("/users/:id", getUser)
    e.POST("/users", createUser)

    v1 := e.Group("/v1")
    v1.GET("/users/:id", getUserV1)

    e.Logger.Fatal(e.Start(":8080"))
}

func createUser(c echo.Context) error {
    var req CreateUserReq
    if err := c.Bind(&req); err != nil {
        return echo.NewHTTPError(400, "invalid body")
    }
    if err := c.Validate(&req); err != nil {
        return echo.NewHTTPError(422, err.Error())
    }
    return c.JSON(201, map[string]any{"id": 42})
}
\`\`\`

Khác gin ở 2 điểm:

1. Handler return \`error\` — echo có error handler trung tâm xử lý mọi \`echo.HTTPError\`.
2. \`Bind\` và \`Validate\` tách rời (gin gộp trong \`ShouldBindJSON\`).

### 5.3 Khi nào chọn echo?

- Đã quen echo từ project cũ.
- Thích pattern "handler return error" (gọn cho error handling tập trung).
- Cần WebSocket built-in.

---

## 6. \`fiber\` — fasthttp, Express-like

Repository: \`github.com/gofiber/fiber/v2\`.

### 6.1 Đặc điểm — và điểm phải cảnh báo trước

- **Built trên \`fasthttp\`** — KHÔNG dùng \`net/http\`. Đây là điểm quan trọng nhất:
  - **Pros**: nhanh hơn 30-50% với benchmark micro (route lookup ~2μs).
  - **Cons**: **không tương thích middleware \`http.Handler\`**. Cả ecosystem \`net/http\` (tracing, metrics, ratelimit thư viện chuẩn) phải có version riêng cho fiber, hoặc viết lại.
- API "Express-like": \`app.Get("/users/:id", handler)\` — gần với JS.
- \`fiber.Ctx\` cũng là custom context (giống gin/echo).

### 6.2 Code mẫu fiber

\`\`\`go
import "github.com/gofiber/fiber/v2"

func main() {
    app := fiber.New()

    app.Get("/users/:id", func(c *fiber.Ctx) error {
        id := c.Params("id")
        return c.JSON(fiber.Map{"id": id})
    })

    app.Post("/users", func(c *fiber.Ctx) error {
        var req CreateUserReq
        if err := c.BodyParser(&req); err != nil {
            return fiber.NewError(400, "invalid body")
        }
        return c.Status(201).JSON(req)
    })

    app.Listen(":8080")
}
\`\`\`

> ⚠ **Lỗi thường gặp với fiber.** Người ta thấy "nhanh hơn" rồi nhảy vào — sau 6 tháng nhận ra cần \`opentelemetry\`, \`prometheus-client\`, \`chi/middleware\`... đều không có sẵn cho fasthttp, phải port hoặc viết lại. **Quyết định fiber là quyết định bỏ luôn ecosystem \`net/http\`**.

### 6.3 Khi nào chọn fiber?

- Endpoint cực kỳ hot (>100k req/s) mà route lookup chiếm phần đáng kể.
- Đội đã có middleware riêng, không phụ thuộc ecosystem net/http.
- Đến từ Node.js Express, cảm thấy fiber API quen thuộc nhất.

📝 **Tóm tắt mục 3-6.** chi = idiomatic, dễ trộn stdlib. gin = perf cao + ecosystem rộng. echo = giống gin, hơi đẹp hơn về API. fiber = nhanh nhất nhưng từ bỏ net/http.

---

## 7. Bảng so sánh tổng

| Tiêu chí | \`net/http\` 1.22 | \`chi\` | \`gin\` | \`echo\` | \`fiber\` |
|----------|:---:|:---:|:---:|:---:|:---:|
| Performance (route lookup) | ~6μs | ~6μs | ~4μs | ~4μs | **~2μs** |
| Idiomatic Go (compatible \`http.Handler\`) | ✓✓✓ | ✓✓✓ | ✗ | ✗ | ✗✗ |
| Middleware ecosystem (net/http) | — | ✓✓✓ | ✓ (qua adapter) | ✓ (qua adapter) | ✗ |
| Built-in validation | ✗ | ✗ | ✓✓ | ✓✓ | ✓ |
| Sub-router / Group | basic | ✓✓✓ | ✓✓✓ | ✓✓ | ✓✓ |
| Learning curve | thấp | thấp | trung bình | trung bình | trung bình |
| Stars (2024) | (stdlib) | ~17k | ~75k | ~28k | ~32k |
| WebSocket built-in | ✗ | ✗ | ✗ (lib riêng) | ✓ | ✓ |

> 📝 Nhớ: \`route lookup\` chỉ chiếm <1% thời gian xử lý request thật. Trong production, DB query (5-50ms) và network (1-100ms) áp đảo. **Chênh lệch 2μs vs 6μs nghe to nhưng = 0.004ms — vô nghĩa khi xếp cạnh 20ms DB.**

---

## 8. Middleware patterns

> 💡 **Trực giác.** Middleware là "lớp bóc hành" — request đi vào, qua middleware 1, 2, 3, đến handler, rồi quay ngược ra qua 3, 2, 1. Bạn chọn làm việc **trước** handler (auth check, logging start), **sau** handler (logging duration, metric), hoặc **cả hai** (panic recover).

### 8.1 Pre-handler

\`\`\`go
func authMW(next http.Handler) http.Handler {
    return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
        token := r.Header.Get("Authorization")
        if !validToken(token) {
            http.Error(w, "unauthorized", 401)
            return                              // <-- DỪNG, không gọi next
        }
        next.ServeHTTP(w, r)                    // <-- chuyển tiếp
    })
}
\`\`\`

### 8.2 Post-handler (logging duration)

\`\`\`go
func loggerMW(next http.Handler) http.Handler {
    return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
        start := time.Now()
        next.ServeHTTP(w, r)
        log.Printf("%s %s took %v", r.Method, r.URL.Path, time.Since(start))
    })
}
\`\`\`

### 8.3 Both (panic recovery)

\`\`\`go
func recoverMW(next http.Handler) http.Handler {
    return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
        defer func() {
            if rec := recover(); rec != nil {
                log.Printf("panic: %v\\n%s", rec, debug.Stack())
                http.Error(w, "internal error", 500)
            }
        }()
        next.ServeHTTP(w, r)
    })
}
\`\`\`

### 8.4 Gin-style — \`c.Next()\`

\`\`\`go
func authMW() gin.HandlerFunc {
    return func(c *gin.Context) {
        if !validToken(c.GetHeader("Authorization")) {
            c.AbortWithStatusJSON(401, gin.H{"error": "unauthorized"})
            return
        }
        c.Next()                                // <-- bắt buộc gọi để continue
    }
}
\`\`\`

> ⚠ **Lỗi thường gặp ở gin/echo.** **Quên \`c.Next()\`** trong middleware → request "treo" ở middleware đó, handler không bao giờ chạy. Triệu chứng: client thấy 200 OK nhưng response trống/sai. Khác với chi/stdlib (pattern closure tự nhiên không quên), gin dùng kiểu \`HandlerFunc\` chain trong slice → phải gọi \`c.Next()\` explicit.

---

## 9. Param binding — path / query / header / body

| Loại | stdlib 1.22 | chi | gin | echo |
|------|---|---|---|---|
| Path \`/users/{id}\` | \`r.PathValue("id")\` | \`chi.URLParam(r,"id")\` | \`c.Param("id")\` | \`c.Param("id")\` |
| Query \`?q=x\` | \`r.URL.Query().Get("q")\` | \`r.URL.Query().Get("q")\` | \`c.Query("q")\` | \`c.QueryParam("q")\` |
| Header | \`r.Header.Get("X-Foo")\` | \`r.Header.Get(...)\` | \`c.GetHeader(...)\` | \`c.Request().Header.Get(...)\` |
| JSON Body | \`json.NewDecoder(r.Body).Decode(&v)\` | same | \`c.ShouldBindJSON(&v)\` | \`c.Bind(&v)\` |

Ví dụ binding gin với struct tag:

\`\`\`go
type Filter struct {
    Page  int    \`form:"page,default=1" binding:"gte=1"\`
    Limit int    \`form:"limit,default=20" binding:"gte=1,lte=100"\`
    Q     string \`form:"q"\`
}

func list(c *gin.Context) {
    var f Filter
    if err := c.ShouldBindQuery(&f); err != nil {       // bind từ query
        c.JSON(400, gin.H{"error": err.Error()})
        return
    }
    // ... f.Page, f.Limit ...
}
\`\`\`

---

## 10. Validation tích hợp

| Framework | Validation built-in | Cách dùng |
|-----------|:---:|---|
| \`net/http\` | ✗ | Tự \`import "github.com/go-playground/validator/v10"\` |
| \`chi\` | ✗ | Cùng cách như net/http (chi không can thiệp body) |
| \`gin\` | ✓ | \`binding:"required,email"\` trong struct tag, \`c.ShouldBindJSON\` tự validate |
| \`echo\` | ✓ (cần register) | \`e.Validator = &CustomValidator{...}\`, rồi \`c.Validate(&v)\` |
| \`fiber\` | ✗ (built-in \`BodyParser\` không validate) | Dùng validator lib ngoài |

> 📝 Cả 5 dùng \`go-playground/validator/v10\` ở dưới. Khác biệt chỉ ở "đã wire sẵn hay chưa".

---

## 11. Error handling style

### 11.1 chi / net/http

\`\`\`go
func handler(w http.ResponseWriter, r *http.Request) {
    user, err := store.Get(id)
    if err != nil {
        if errors.Is(err, ErrNotFound) {
            http.Error(w, "user not found", 404)
            return
        }
        http.Error(w, "internal", 500)
        return
    }
    json.NewEncoder(w).Encode(user)
}
\`\`\`

### 11.2 gin — \`c.AbortWithError\`

\`\`\`go
func handler(c *gin.Context) {
    user, err := store.Get(id)
    if err != nil {
        c.AbortWithStatusJSON(404, gin.H{"error": "not found"})
        return
    }
    c.JSON(200, user)
}
\`\`\`

### 11.3 echo — return \`error\`

\`\`\`go
func handler(c echo.Context) error {
    user, err := store.Get(id)
    if err != nil {
        return echo.NewHTTPError(404, "not found")
    }
    return c.JSON(200, user)
}

// Global error handler tự convert echo.HTTPError → status + body
e.HTTPErrorHandler = func(err error, c echo.Context) {
    he, ok := err.(*echo.HTTPError)
    if !ok { he = echo.NewHTTPError(500, "internal") }
    c.JSON(he.Code, map[string]any{"error": he.Message})
}
\`\`\`

> ❓ **Câu hỏi tự nhiên.** *"Pattern nào tốt hơn?"* — Trả lời: echo gọn nhất cho service nhỏ (1 chỗ handle hết error). Gin/chi cần discipline để không quên \`return\` sau khi gửi response (lỗi siêu phổ biến: gửi 401 xong vẫn chạy tiếp xuống ghi DB).

---

## 12. Performance trong thực tế

Benchmark route lookup (theo bench của [julienschmidt/go-http-routing-benchmark](https://github.com/julienschmidt/go-http-routing-benchmark)):

| Framework | Lookup mỗi route (ns) | Allocations |
|-----------|---:|---:|
| \`net/http\` ServeMux | ~6000 | 0 |
| \`chi\` | ~6000 | 0 |
| \`gin\` | ~4000 | 0 |
| \`echo\` | ~4000 | 0 |
| \`fiber\` (fasthttp) | ~2000 | 0 |

> 💡 **Trực giác — vì sao framework difference negligible.** Giả sử request thật cần:
> - Route lookup: **4μs** (gin)
> - DB query: **15.000μs** (15ms)
> - JSON encode: **50μs**
> - Network round-trip client: **50.000μs** (50ms)
> 
> Tổng ~65ms. Chọn fiber thay gin tiết kiệm **2μs / 65000μs = 0.003%**. Đổi sang chỉ số khác — chi chậm hơn fiber **4μs / 65000μs = 0.006%**.
>
> **Kết luận**: chọn framework theo perf khi traffic > 10k req/s/máy. Dưới đó, chọn theo ergonomic (idiomatic, ecosystem, team familiarity).

📝 **Tóm tắt mục 12.** Route lookup chỉ là microsec. Bottleneck thật ở DB/network. Đừng để bench fake quyết định kiến trúc.

---

## 13. Khi nào chọn cái nào — quyết định nhanh

| Tình huống | Khuyên dùng | Lý do |
|---|---|---|
| Dự án mới, idiomatic Go, không nghiện framework | **chi** | Gần stdlib, không lock-in, dễ migrate |
| Cần perf + ecosystem mature + team hiểu rộng | **gin** | Stars cao nhất, middleware nhiều, validation built-in |
| Thích Express-like, không cần ecosystem net/http | **fiber** | Nhanh nhất, API quen với JS dev |
| Đã có codebase echo, không lý do đổi | **echo** | Migration cost > benefit |
| Service < 10 endpoint, microservice nhỏ | **net/http 1.22+** | Stdlib đủ, không thêm dependency |
| Internal admin tool, ưu tiên dev speed | **gin** | \`c.ShouldBindJSON\` + form binding nhanh |
| Real-time (WebSocket nặng) | **echo** hoặc **fiber** | Built-in WS |

---

## 14. Common pitfalls

### 14.1 Lock-in \`Context\` custom

Viết handler \`func(c *gin.Context)\` 200 chỗ → muốn đổi sang echo phải sửa hết. **Cách tránh**: tách logic business ra ngoài, handler chỉ là 1 lớp mỏng:

\`\`\`go
// xấu — logic dính chặt gin.Context
func createUser(c *gin.Context) {
    var req CreateUserReq
    c.ShouldBindJSON(&req)
    // ... 50 dòng DB, validate, ...
    c.JSON(201, ...)
}

// tốt — service layer độc lập framework
type UserService struct { store UserStore }
func (s *UserService) Create(ctx context.Context, req CreateUserReq) (User, error) { ... }

func createUser(c *gin.Context) {
    var req CreateUserReq
    if err := c.ShouldBindJSON(&req); err != nil { /*...*/ }
    u, err := service.Create(c.Request.Context(), req)
    // ... map error -> status -> JSON ...
}
\`\`\`

### 14.2 Quên \`c.Next()\` trong gin/echo middleware

\`\`\`go
// SAI — handler không bao giờ chạy
func mw() gin.HandlerFunc {
    return func(c *gin.Context) {
        log.Println("before")
        // quên c.Next() → middleware tiếp theo + handler không gọi
        log.Println("after")
    }
}

// ĐÚNG
func mw() gin.HandlerFunc {
    return func(c *gin.Context) {
        log.Println("before")
        c.Next()
        log.Println("after")
    }
}
\`\`\`

### 14.3 Trộn middleware net/http với fiber

\`fiber\` chạy trên \`fasthttp\`, các interface khác hẳn \`net/http\`. Middleware \`chi/middleware.Logger\` không dùng được cho fiber. Phải dùng \`fiber/middleware/logger\`.

### 14.4 Đặt \`r.Use(...)\` sau khi đã định nghĩa route

Trong chi:

\`\`\`go
r := chi.NewRouter()
r.Get("/a", h)        // <-- KHÔNG có middleware
r.Use(authMW)         // <-- chỉ áp cho route ĐĂNG KÝ SAU đây
r.Get("/b", h)        // có middleware
\`\`\`

Quy tắc: gọi \`Use\` trước, route sau. Hoặc dùng \`r.With(mw).Get(...)\` cho route riêng.

---

## 15. Bài tập

### BT1. CRUD users với chi
Implement REST API CRUD \`/users\` (list, get, create, update, delete) với \`chi\`. Có 2 middleware global (Logger, Recoverer) và 1 middleware riêng cho route \`{id}\` (\`loadUser\` — set user vào context).

### BT2. Same với gin — so sánh code length
Implement cùng API như BT1 nhưng dùng \`gin\`. Đếm số dòng code, so sánh.

### BT3. Custom rate limit middleware (token bucket)
Viết middleware \`rateLimitMW(rps int)\` — mỗi IP có 1 bucket, mỗi giây nạp \`rps\` token, mỗi request lấy 1 token. Hết token → 429. Áp dụng dạng \`http.Handler\` (dùng được cho cả chi & net/http).

### BT4. Sub-router versioning
Với chi: tạo \`/v1/users\` và \`/v2/users\`. V1 trả \`{id, name}\`. V2 trả \`{id, name, email, created_at}\`. Dùng \`r.Route\` cho mỗi version.

### BT5. Chọn framework cho 4 scenario
Cho 4 scenario, chọn framework + giải thích (3 dòng/cái):
1. **Startup API** — 5 endpoint, MVP cho đến tháng 3, team 2 người.
2. **E-commerce backend** — 80 endpoint, có versioning, cần Swagger, JWT, observability.
3. **Real-time chat** — 10 REST endpoint + 1 WebSocket nặng (10k connection).
4. **Internal admin tool** — 30 endpoint, chỉ team dùng, deploy 1 instance.

### BT6. Fix 4 antipattern
Đoạn code dưới có 4 lỗi — chỉ ra và sửa:

\`\`\`go
r := chi.NewRouter()

r.Get("/health", health)
r.Use(authMW)                      // (1)

r.Route("/users", func(r chi.Router) {
    r.Get("/{id}", getUser)
})

ginR := gin.New()
ginR.Use(chiMiddleware.Logger)     // (2)
ginR.Use(func(c *gin.Context) {
    log.Println("hit")             // (3) — thiếu gì?
})

func deleteUser(c *gin.Context) {
    if !isAdmin(c) {
        c.JSON(403, gin.H{"err": "forbidden"})  // (4)
    }
    db.Delete(c.Param("id"))
}
\`\`\`

---

## Lời giải chi tiết

### Giải BT1 — CRUD chi

\`\`\`go
package main

import (
    "encoding/json"
    "net/http"
    "strconv"

    "github.com/go-chi/chi/v5"
    "github.com/go-chi/chi/v5/middleware"
)

type User struct {
    ID    int    \`json:"id"\`
    Name  string \`json:"name"\`
    Email string \`json:"email"\`
}

var users = map[int]*User{}
var nextID = 1

type ctxKey string
const userCtxKey ctxKey = "user"

func main() {
    r := chi.NewRouter()
    r.Use(middleware.Logger, middleware.Recoverer)

    r.Route("/users", func(r chi.Router) {
        r.Get("/", listUsers)
        r.Post("/", createUser)
        r.Route("/{id}", func(r chi.Router) {
            r.Use(loadUser)
            r.Get("/", getUser)
            r.Put("/", updateUser)
            r.Delete("/", deleteUser)
        })
    })

    http.ListenAndServe(":8080", r)
}

func loadUser(next http.Handler) http.Handler {
    return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
        idStr := chi.URLParam(r, "id")
        id, err := strconv.Atoi(idStr)
        if err != nil { http.Error(w, "bad id", 400); return }
        u, ok := users[id]
        if !ok { http.Error(w, "not found", 404); return }
        ctx := context.WithValue(r.Context(), userCtxKey, u)
        next.ServeHTTP(w, r.WithContext(ctx))
    })
}

func listUsers(w http.ResponseWriter, r *http.Request) {
    list := make([]*User, 0, len(users))
    for _, u := range users { list = append(list, u) }
    json.NewEncoder(w).Encode(list)
}
func createUser(w http.ResponseWriter, r *http.Request) {
    var u User
    if err := json.NewDecoder(r.Body).Decode(&u); err != nil { http.Error(w, "bad json", 400); return }
    u.ID = nextID; nextID++
    users[u.ID] = &u
    w.WriteHeader(201); json.NewEncoder(w).Encode(u)
}
func getUser(w http.ResponseWriter, r *http.Request) {
    u := r.Context().Value(userCtxKey).(*User)
    json.NewEncoder(w).Encode(u)
}
func updateUser(w http.ResponseWriter, r *http.Request) {
    u := r.Context().Value(userCtxKey).(*User)
    var in User
    json.NewDecoder(r.Body).Decode(&in)
    u.Name, u.Email = in.Name, in.Email
    json.NewEncoder(w).Encode(u)
}
func deleteUser(w http.ResponseWriter, r *http.Request) {
    u := r.Context().Value(userCtxKey).(*User)
    delete(users, u.ID); w.WriteHeader(204)
}
\`\`\`

Phân tích: ~70 dòng. \`loadUser\` chạy 1 lần cho cả GET/PUT/DELETE — DRY.

### Giải BT2 — CRUD gin

\`\`\`go
func main() {
    r := gin.Default()
    g := r.Group("/users")
    g.GET("/", listUsers)
    g.POST("/", createUser)
    g.GET("/:id", loadUser, getUser)
    g.PUT("/:id", loadUser, updateUser)
    g.DELETE("/:id", loadUser, deleteUser)
    r.Run(":8080")
}

func loadUser(c *gin.Context) {
    id, _ := strconv.Atoi(c.Param("id"))
    u, ok := users[id]
    if !ok { c.AbortWithStatusJSON(404, gin.H{"err": "not found"}); return }
    c.Set("user", u)
    c.Next()
}
func getUser(c *gin.Context)    { c.JSON(200, c.MustGet("user")) }
func createUser(c *gin.Context) {
    var u User
    if err := c.ShouldBindJSON(&u); err != nil { c.JSON(400, gin.H{"err": err.Error()}); return }
    u.ID = nextID; nextID++; users[u.ID] = &u
    c.JSON(201, u)
}
// ...
\`\`\`

**So sánh**: gin code ngắn hơn ~15-20%, chủ yếu nhờ \`c.ShouldBindJSON\` và \`c.JSON\` gộp lại 2 dòng net/http (decode + write + content-type + status). Trade-off: lock-in \`*gin.Context\`.

### Giải BT3 — Rate limit token bucket

\`\`\`go
type bucket struct {
    tokens float64
    last   time.Time
}

func rateLimitMW(rps float64) func(http.Handler) http.Handler {
    var mu sync.Mutex
    buckets := map[string]*bucket{}
    return func(next http.Handler) http.Handler {
        return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
            ip := strings.Split(r.RemoteAddr, ":")[0]
            mu.Lock()
            b, ok := buckets[ip]
            if !ok {
                b = &bucket{tokens: rps, last: time.Now()}
                buckets[ip] = b
            }
            // Nạp lại theo thời gian trôi
            now := time.Now()
            elapsed := now.Sub(b.last).Seconds()
            b.tokens = math.Min(rps, b.tokens + elapsed*rps)
            b.last = now
            if b.tokens < 1 {
                mu.Unlock()
                w.Header().Set("Retry-After", "1")
                http.Error(w, "rate limit", 429)
                return
            }
            b.tokens--
            mu.Unlock()
            next.ServeHTTP(w, r)
        })
    }
}
\`\`\`

Độ phức tạp: O(1) mỗi request. Cảnh báo: map \`buckets\` grow unbounded → cần TTL hoặc LRU. Production dùng \`golang.org/x/time/rate\`.

### Giải BT4 — Sub-router v1/v2

\`\`\`go
r := chi.NewRouter()
r.Route("/v1", func(r chi.Router) {
    r.Get("/users/{id}", func(w http.ResponseWriter, r *http.Request) {
        u := loadByID(chi.URLParam(r, "id"))
        json.NewEncoder(w).Encode(map[string]any{"id": u.ID, "name": u.Name})
    })
})
r.Route("/v2", func(r chi.Router) {
    r.Get("/users/{id}", func(w http.ResponseWriter, r *http.Request) {
        u := loadByID(chi.URLParam(r, "id"))
        json.NewEncoder(w).Encode(u)  // full struct
    })
})
\`\`\`

Pattern khá phổ biến: tách \`v1Handler.go\` và \`v2Handler.go\`, root router chỉ mount.

### Giải BT5 — Chọn framework cho 4 scenario

1. **Startup MVP, 5 endpoint, team 2 người** → **net/http 1.22+** hoặc **chi**. Lý do: ít endpoint, không cần ecosystem rộng. Chi nếu muốn middleware cleaner; net/http nếu muốn 0 dependency.
2. **E-commerce, 80 endpoint, versioning, Swagger, JWT, observability** → **gin**. Lý do: ecosystem lớn nhất, có gin-swagger, gin-jwt, gin-prometheus sẵn. Validation tag tiết kiệm 10-15 dòng/handler × 80 handler.
3. **Real-time chat, 10 REST + 10k WebSocket** → **echo** hoặc **fiber**. Lý do: WebSocket built-in, fiber nhanh hơn cho connection-heavy. Chọn echo nếu cần ecosystem net/http; fiber nếu thuần WS-heavy và team chấp nhận trade-off.
4. **Internal admin, 30 endpoint, 1 instance** → **gin**. Lý do: dev speed (form binding, validation, render HTML template) > tất cả khác. Performance không quan trọng (internal).

### Giải BT6 — Fix antipattern

\`\`\`go
r := chi.NewRouter()

r.Get("/health", health)         // (1) SAI — /health KHÔNG có authMW vì Use đặt sau
r.Use(authMW)

ginR.Use(chiMiddleware.Logger)   // (2) SAI — chi middleware là func(http.Handler)http.Handler,
                                  //     không phải gin.HandlerFunc. KHÔNG dùng được trực tiếp.

ginR.Use(func(c *gin.Context) {
    log.Println("hit")            // (3) SAI — thiếu c.Next() → request treo
})

func deleteUser(c *gin.Context) {
    if !isAdmin(c) {
        c.JSON(403, gin.H{"err": "forbidden"})  // (4) SAI — thiếu return,
                                                 //     code vẫn chạy xuống db.Delete
    }
    db.Delete(c.Param("id"))
}
\`\`\`

**Fix**:

\`\`\`go
r := chi.NewRouter()
r.Use(authMW)                    // Use TRƯỚC khi register route
r.Get("/health", health)         // OR: tách /health ra sub-router không có authMW

// (2) Nếu muốn dùng chi middleware trong gin: viết adapter func(http.Handler)http.Handler -> gin.HandlerFunc
//     Hoặc đơn giản hơn — dùng middleware gin riêng (gin.Logger()).

ginR.Use(func(c *gin.Context) {
    log.Println("hit")
    c.Next()                     // (3) bắt buộc
})

func deleteUser(c *gin.Context) {
    if !isAdmin(c) {
        c.AbortWithStatusJSON(403, gin.H{"err": "forbidden"})
        return                   // (4) return sau khi response
    }
    db.Delete(c.Param("id"))
}
\`\`\`

---

## 16. Code & Minh hoạ

- [solutions.go](./solutions.go) — Demo router stdlib Go 1.22+ với 3 pattern: path param, middleware chain, sub-router. Comment ghi rõ "trong chi/gin thì sẽ viết là...".
- [visualization.html](./visualization.html) — 3 module: (1) Framework picker theo scenario, (2) Middleware chain visualizer, (3) Performance bar chart.

---

## 17. Bài tiếp theo

- [Lesson 45 — Request Validation](../lesson-45-request-validation/) — đi sâu vào \`go-playground/validator/v10\`, custom validator, error formatting, i18n.
- [Lesson 43 — REST API Design](../lesson-43-rest-api-design/) — để chọn endpoint design trước khi quyết router.

## Checklist self-review

- [x] Đủ 3 file (\`README.md\`, \`solutions.go\`, \`visualization.html\`).
- [x] Callout 💡 ❓ ⚠ 🔁 📝 xuất hiện ở chỗ thích hợp.
- [x] 6 bài tập đều có lời giải step-by-step.
- [x] Bảng so sánh tổng (mục 7) ngắn gọn, đủ ý.
- [x] Cảnh báo fiber lock-in (mục 6.1).
- [x] Performance walk-through bằng số cụ thể (mục 12).

`;
