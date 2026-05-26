// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: Programming/lesson-29-context-cancellation/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 29 — \`context\` package: cancellation, timeout, deadline, value

> **Tier 2 — lesson cuối.** Đây là package **quan trọng nhất** trong Go production code. Mọi service Go viết đúng chuẩn đều có \`ctx context.Context\` là parameter đầu tiên của mọi function I/O. Không nắm \`context\` thì viết Go production sẽ rò rỉ goroutine, không huỷ được request, không tôn trọng timeout của caller.

## Mục tiêu học tập

Sau lesson này, bạn sẽ:

- Hiểu **vì sao** stdlib phải đẻ ra \`context\` (không phải design ban đầu của Go) và vấn đề nó giải quyết.
- Đọc và viết thông thạo 4 hàm derive: \`WithCancel\`, \`WithTimeout\`, \`WithDeadline\`, \`WithValue\`.
- Biết khi nào dùng \`context.Background()\` vs \`context.TODO()\`.
- Viết function tôn trọng cancellation: select trên \`ctx.Done()\` trong long loop.
- Propagate context xuyên suốt call chain (HTTP handler → service → DB → external API).
- Phân biệt \`context.Canceled\` vs \`context.DeadlineExceeded\` để log đúng.
- Tránh 6 anti-pattern phổ biến (context as struct field, quên \`defer cancel()\`, lạm dụng \`WithValue\`, ...).
- Hiểu **timeout cascading** và **cancellation propagation** — hai tính chất khiến context tree đáng giá.

## Kiến thức tiền đề

- [Lesson 11 — Functions](../lesson-11-functions/README.md): parameter list, function value.
- [Lesson 18 — Interface](../lesson-18-interfaces/README.md): \`context.Context\` là interface, được implement bởi nhiều concrete type ẩn (\`*emptyCtx\`, \`*cancelCtx\`, \`*timerCtx\`, \`*valueCtx\`).
- [Lesson 19 — Error](../lesson-19-errors/README.md): \`ctx.Err()\` trả về sentinel error (\`context.Canceled\`, \`context.DeadlineExceeded\`).
- [Lesson 27 — Goroutine & Channel](../lesson-27-goroutines-channels/README.md): \`ctx.Done()\` là \`<-chan struct{}\` — đọc xong lesson channel mới hiểu cách dùng.
- [Lesson 28 — Sync Primitives](../lesson-28-sync-primitives/README.md): context **không thay thế** \`sync.WaitGroup\` — hai thứ này phối hợp, không loại trừ.

---

## 1. Vì sao cần \`context\`

### 💡 Trực giác

Tưởng tượng bạn là **bếp trưởng** ở nhà hàng. Một khách order một combo gồm: 1 phở, 1 trà tắc, 1 chè. Bạn giao việc cho 3 phụ bếp song song. Khách hàng đột nhiên đứng dậy bỏ về. Bạn cần làm gì?

Bạn phải **báo cho cả 3 phụ bếp dừng tay** ngay — không thì họ vẫn nấu xong, đồ ăn ra mà không có ai ăn, lãng phí. Cách thông báo đó cần:

1. **Truyền 1 chiều, từ trên xuống**: chỉ bếp trưởng (gốc) gửi signal "huỷ" xuống phụ bếp, không ngược lại.
2. **Lan toả**: nếu phụ bếp 1 lại giao 2 sub-task xuống 2 bếp phụ-phụ, signal "huỷ" cũng phải lan tới đó.
3. **Có thể auto-trigger theo thời gian**: nếu khách order rồi đi WC mất 10 phút mà chưa có món, có thể self-cancel.
4. **Có thể đính kèm thông tin**: "order ID", "tên khách" — để các phụ bếp log đúng.

\`context.Context\` chính là cái "hệ thống truyền lệnh huỷ" đó, áp dụng cho goroutine.

### Vấn đề cụ thể trong Go

Code sau là **dở** (pre-context era):

\`\`\`go
func handler(w http.ResponseWriter, r *http.Request) {
    result := slowDBQuery()              // mất 30s
    result2 := callExternalAPI()         // mất 20s
    json.NewEncoder(w).Encode([]any{result, result2})
}
\`\`\`

Vấn đề:

- Client đã tắt browser từ giây thứ 2 → server vẫn cày đủ 50s, **lãng phí CPU + connection DB + quota API**.
- Khi traffic cao, các request "zombie" này chiếm chỗ → server **sập** dù request thật chỉ chiếm 10% capacity.
- Không có cách nào **bảo \`slowDBQuery\` dừng giữa chừng** mà không hack signal global.

\`context\` giải quyết: function nhận \`ctx context.Context\`, periodically check \`ctx.Done()\`, thấy đóng thì return ngay.

### ❓ Câu hỏi tự nhiên

> **Q1: Tại sao không dùng \`chan bool\` cho mỗi cancel?**

Có thể, nhưng phải tự design tree, tự broadcast, tự gắn timeout. \`context\` chuẩn hoá pattern này nên mọi lib (\`net/http\`, \`database/sql\`, \`grpc-go\`...) đều "nói cùng ngôn ngữ" — bạn pass \`ctx\` xuống là tự lan cancel.

> **Q2: Channel không buffered là đủ rồi mà?**

Channel chỉ broadcast được nếu mỗi receiver close nó. Context chuẩn hoá: **đóng channel \`Done()\` là tín hiệu cancel chung**, ai cũng đọc được, nhiều lần đọc vẫn OK (đọc channel đã close trả về ngay zero value).

> **Q3: Goroutine chạy CPU thuần (không có syscall) thì context giúp gì?**

Không giúp tự động. Bạn phải tự code \`select { case <-ctx.Done(): return ... }\` trong vòng lặp. Context **không preempt** goroutine, chỉ là tín hiệu để bạn tự dừng.

### 📝 Tóm tắt mục 1

- Context = standardized cancellation tree cho goroutine.
- Mục đích chính: huỷ cascade khi caller bỏ cuộc, tôn trọng timeout của caller.
- Không tự preempt — code phải tự check \`ctx.Done()\`.

---

## 2. \`context.Context\` interface

### 2.1 Định nghĩa

\`\`\`go
type Context interface {
    Deadline() (deadline time.Time, ok bool)
    Done() <-chan struct{}
    Err() error
    Value(key any) any
}
\`\`\`

| Method | Trả về | Ý nghĩa |
|--------|--------|---------|
| \`Deadline()\` | \`(t, true)\` nếu có deadline; \`(zero, false)\` nếu không | Cho biết khi nào ctx sẽ tự cancel |
| \`Done()\` | \`<-chan struct{}\` (đã close = cancelled) | Channel để select |
| \`Err()\` | \`nil\` (chưa cancel) hoặc \`context.Canceled\`/\`context.DeadlineExceeded\` | Lý do cancel |
| \`Value(key)\` | \`any\` | Lấy giá trị attached |

### 2.2 Tại sao 4 method này

Tại sao đúng 4 cái mà không phải 3 hay 5? Bởi đây là **đủ và tối thiểu** cho usecase chính:

- \`Done()\`: tín hiệu — để select.
- \`Err()\`: lý do — để log đúng (timeout vs user cancel).
- \`Deadline()\`: optimization — nếu function biết deadline còn xa thì có thể batch nhiều việc; nếu sắp hết hạn thì làm gọn.
- \`Value()\`: payload đính kèm request-scoped (request ID, auth user...).

### 💡 Done() là channel, không phải bool

Channel cho phép **select** kết hợp với operation khác:

\`\`\`go
select {
case <-ctx.Done():
    return ctx.Err()
case result := <-doWork():
    return result
case <-time.After(1 * time.Second):
    return errors.New("local timeout")
}
\`\`\`

Nếu \`Done()\` là \`bool\`, bạn phải polling — tốn CPU + miss event giữa 2 lần check.

### ❓ Câu hỏi tự nhiên

> **Q: Đọc \`<-ctx.Done()\` khi ctx chưa cancel thì block luôn?**

Đúng. Đó là lý do bạn dùng nó **trong \`select\`**, không đọc trực tiếp. Khi \`cancel()\` được gọi, channel close, mọi goroutine đang select trên đó sẽ unblock cùng lúc.

> **Q: Đọc channel đã close nhiều lần có sao không?**

Không sao — channel đã close trả về zero value của type ngay tức thì, gọi bao nhiêu lần cũng OK. Đó là cơ chế broadcast của context: 1000 goroutine cùng select \`<-ctx.Done()\`, gọi \`cancel()\` 1 lần, cả 1000 unblock.

### 📝 Tóm tắt mục 2

- Interface 4 method: \`Deadline\`, \`Done\`, \`Err\`, \`Value\`.
- \`Done()\` là channel **đã close** = signal cancel — dùng trong \`select\`.
- \`Err()\` cho biết **vì sao** cancel.

---

## 3. Tạo context gốc — \`Background()\` và \`TODO()\`

### 3.1 \`context.Background()\`

Root của mọi context tree. Không bao giờ cancel, không có deadline, không có value.

**Dùng ở đâu**:

- \`main()\` — entrypoint chương trình.
- \`init()\` — function khởi tạo.
- Test top-level — \`ctx := context.Background()\`.
- Goroutine không có parent context rõ ràng (hiếm — thường nên có parent).

\`\`\`go
func main() {
    ctx := context.Background()
    if err := runServer(ctx); err != nil {
        log.Fatal(err)
    }
}
\`\`\`

### 3.2 \`context.TODO()\`

Y hệt \`Background()\` về behavior, nhưng **ý nghĩa khác**: "tôi chưa biết ctx nào phù hợp, sẽ sửa sau".

- Khi bạn đang refactor code cũ (chưa có context) sang context-aware mà chưa biết caller nào pass ctx xuống.
- Khi viết function mới nhưng chưa quyết được context source.
- Linter và \`go vet\` có thể track \`TODO()\` để nhắc bạn quay lại sửa.

\`\`\`go
// TODO: nhận ctx từ caller sau khi refactor handler chain
func legacyFunction() error {
    return doSomething(context.TODO(), "data")
}
\`\`\`

### ⚠ Lỗi thường gặp

- Dùng \`context.Background()\` mọi chỗ → mất hết cancellation chain.
- Tạo \`Background()\` mới ở mỗi layer thay vì pass \`ctx\` từ caller — request không bao giờ bị cancel nếu user disconnect.

### 4 ví dụ cụ thể

\`\`\`go
// Ví dụ 1 — main entrypoint
ctx := context.Background()

// Ví dụ 2 — test
func TestFoo(t *testing.T) {
    ctx := context.Background()
    result, err := Foo(ctx, "input")
    // ...
}

// Ví dụ 3 — placeholder khi refactor
func oldStyleAPI(payload []byte) error {
    // legacy code, chưa nhận ctx
    return saveToDB(context.TODO(), payload)
}

// Ví dụ 4 — KHÔNG nên: tạo Background giữa chain
func badHandler(w http.ResponseWriter, r *http.Request) {
    // BAD: bỏ qua r.Context() → mất chain cancellation
    ctx := context.Background()
    result, _ := slowQuery(ctx)
    // ...
}
\`\`\`

### 📝 Tóm tắt mục 3

- \`Background()\` = root chính thức.
- \`TODO()\` = root tạm, đánh dấu "phải sửa sau".
- Không tạo root mới giữa call chain — luôn propagate parent.

---

## 4. Derive context — 4 hàm

Mỗi hàm derive nhận \`parent context.Context\` và trả về context con. Cancel parent → cancel hết con. Cancel con → không ảnh hưởng parent.

### 4.1 \`context.WithCancel(parent)\`

Trả về \`(ctx, cancel)\`. Bạn quyết định khi nào gọi \`cancel()\`.

\`\`\`go
ctx, cancel := context.WithCancel(parent)
defer cancel()  // QUAN TRỌNG

go worker(ctx)
go worker(ctx)
go worker(ctx)

if userPressedStop {
    cancel()  // 3 worker dừng cùng lúc
}
\`\`\`

**Khi nào dùng**: bạn muốn cancel thủ công (vd nhận event từ user, hoặc khi 1 trong nhiều worker fail thì cancel hết).

### 4.2 \`context.WithTimeout(parent, d)\`

Trả về \`(ctx, cancel)\`. Tự cancel sau \`d\` (duration).

\`\`\`go
ctx, cancel := context.WithTimeout(parent, 2*time.Second)
defer cancel()

result, err := slowOp(ctx)
if err == context.DeadlineExceeded {
    log.Println("slow op took too long")
}
\`\`\`

**Khi nào dùng**: gọi external service mà bạn không muốn chờ vô hạn (luôn luôn — đừng để function I/O không timeout).

### 4.3 \`context.WithDeadline(parent, t)\`

Trả về \`(ctx, cancel)\`. Tự cancel khi đến thời điểm \`t\` (absolute time).

\`\`\`go
endOfDay := time.Date(2026, 5, 26, 23, 59, 59, 0, time.Local)
ctx, cancel := context.WithDeadline(parent, endOfDay)
defer cancel()
\`\`\`

**Khi nào dùng**: bạn có deadline tuyệt đối (vd "batch job phải xong trước nửa đêm"). Khác \`WithTimeout\` ở chỗ deadline cố định, không phụ thuộc khi nào bạn gọi.

> Tương đương: \`WithTimeout(parent, d)\` chính là \`WithDeadline(parent, time.Now().Add(d))\`.

### 4.4 \`context.WithValue(parent, key, val)\`

Trả về ctx **không** có cancel function — chỉ thêm value.

\`\`\`go
type ctxKey string
const requestIDKey ctxKey = "reqID"

ctx := context.WithValue(parent, requestIDKey, "req-12345")

// downstream
reqID := ctx.Value(requestIDKey).(string)
log.Printf("[%s] processing", reqID)
\`\`\`

**Quy tắc vàng**: chỉ dùng cho **request-scoped data** (request ID, auth user, trace span). KHÔNG dùng cho business parameter.

### 4 ví dụ — chọn đúng hàm

| Tình huống | Dùng |
|------------|------|
| Gọi REST API ngoài, không muốn chờ quá 3s | \`WithTimeout(ctx, 3*time.Second)\` |
| Batch job phải xong trước 02:00 sáng mai | \`WithDeadline(ctx, t02AM)\` |
| User bấm nút "Stop" trên UI | \`WithCancel(ctx)\`, lưu \`cancel\`, gọi khi user click |
| Gắn user ID vào ctx cho log middleware đọc | \`WithValue(ctx, userKey, userID)\` |

### ⚠ Lỗi thường gặp

- Quên \`defer cancel()\` → goroutine timer bên trong leak (xem mục 7).
- Truyền business data qua \`WithValue\` (ví dụ user input, query params) → khó test, magic string key.
- Dùng \`WithTimeout\` lồng nhau không nhất quán: parent có timeout 1s, con \`WithTimeout(ctx, 5s)\` — con vẫn cancel sau **1s** (deadline lấy min của tree).

### 📝 Tóm tắt mục 4

- 4 hàm: \`WithCancel\` (thủ công), \`WithTimeout\` (sau d), \`WithDeadline\` (tại t), \`WithValue\` (gắn data).
- 3 hàm đầu trả \`(ctx, cancel)\` — luôn \`defer cancel()\`.
- \`WithValue\` chỉ cho request-scoped data.

---

## 5. Pattern dùng \`Done()\` trong long-running task

### 5.1 Pattern chuẩn

\`\`\`go
func longTask(ctx context.Context) error {
    for {
        select {
        case <-ctx.Done():
            return ctx.Err()
        case <-time.After(1 * time.Second):
            doOneIteration()
        }
    }
}
\`\`\`

Mỗi vòng lặp: chờ 1s hoặc cancel signal. Khi cancel, return \`ctx.Err()\` ngay.

### 5.2 Pattern cho CPU-heavy loop

\`\`\`go
func crunch(ctx context.Context, items []int) error {
    for i, x := range items {
        // Mỗi N iteration check ctx 1 lần (tránh overhead select mỗi vòng)
        if i%1000 == 0 {
            select {
            case <-ctx.Done():
                return ctx.Err()
            default:
            }
        }
        process(x)
    }
    return nil
}
\`\`\`

> \`select { case <-ctx.Done(): ...; default: }\` là **non-blocking check** — nếu chưa cancel thì rơi vào \`default\` ngay, không chờ.

### 5.3 Pattern cho I/O block

Mature lib đã hỗ trợ ctx sẵn:

\`\`\`go
// Trong HTTP request
req, _ := http.NewRequestWithContext(ctx, "GET", url, nil)
resp, err := http.DefaultClient.Do(req)
// Khi ctx cancel, Do() trả về err ngay, không cần code check

// Trong DB query
rows, err := db.QueryContext(ctx, "SELECT * FROM users WHERE id = ?", id)
\`\`\`

Không cần \`select\` thủ công — driver tự xử lý.

### 5.4 Anti-pattern: long loop quên check

\`\`\`go
// BAD
func badLoop(ctx context.Context) {
    for {
        doExpensiveWork()  // 10s mỗi lần
    }
}
\`\`\`

Cancel ctx → loop vẫn chạy mãi mãi cho đến khi process kill. Phải có check ctx.Done().

### 📝 Tóm tắt mục 5

- Long loop **phải** check \`ctx.Done()\` định kỳ.
- CPU-bound: check mỗi N iteration để giảm overhead select.
- I/O với lib mature: pass ctx vào method \`*Context\`, không cần select thủ công.

---

## 6. Propagation — \`ctx\` là parameter ĐẦU TIÊN

Convention (gần như bắt buộc) trong Go ecosystem:

\`\`\`go
func DoSomething(ctx context.Context, args ...) error
\`\`\`

### Quy tắc

1. **Tên biến luôn là \`ctx\`** (không phải \`c\`, \`context\`, \`cx\`).
2. **Vị trí: parameter đầu tiên**.
3. **Type: \`context.Context\`** (interface), không phải concrete type.
4. **Không bao giờ pass \`nil\` ctx** — pass \`context.TODO()\` hoặc \`Background()\` thay vì.
5. **Không bao giờ lưu ctx vào struct field** (xem mục 14).

### Ví dụ propagation đúng

\`\`\`go
func GetUserOrders(ctx context.Context, userID int) ([]Order, error) {
    user, err := userRepo.FindByID(ctx, userID)        // pass ctx xuống
    if err != nil {
        return nil, err
    }
    orders, err := orderRepo.ListByUser(ctx, user.ID)  // pass tiếp
    if err != nil {
        return nil, err
    }
    return orders, nil
}
\`\`\`

Khi caller cancel ctx → cả 2 query DB dừng ngay.

### Ví dụ propagation SAI

\`\`\`go
func GetUserOrders(ctx context.Context, userID int) ([]Order, error) {
    // BAD: bỏ qua ctx, tạo Background mới
    user, err := userRepo.FindByID(context.Background(), userID)
    // ...
}
\`\`\`

→ Mất hết chain cancel. User disconnect, query vẫn cày.

### 📝 Tóm tắt mục 6

- \`ctx context.Context\` luôn là parameter đầu tiên.
- Pass nguyên ctx xuống các lớp con — không tạo Background giữa chừng.
- Không lưu ctx vào struct.

---

## 7. \`defer cancel()\` — vì sao bắt buộc

### Vấn đề

\`WithCancel\`, \`WithTimeout\`, \`WithDeadline\` tạo ra:

- 1 channel \`Done\` (close khi cancel).
- 1 goroutine internal nếu là timer-based (theo dõi deadline).
- Reference từ parent context tới child (để propagate cancel).

Nếu bạn không gọi \`cancel()\`:

- Goroutine timer chạy đến hết deadline mới giải phóng.
- Reference parent → child vẫn còn → child không được GC.
- 1 leak nhỏ × triệu request = OOM.

### Pattern bắt buộc

\`\`\`go
func process(parent context.Context) error {
    ctx, cancel := context.WithTimeout(parent, 5*time.Second)
    defer cancel()  // <-- DÒNG NÀY KHÔNG ĐƯỢC THIẾU

    // ... dùng ctx
    return nil
}
\`\`\`

\`cancel()\` idempotent — gọi nhiều lần OK, không panic.

### ❓ Câu hỏi tự nhiên

> **Q: Nếu ctx đã tự cancel do timeout, có cần gọi cancel() nữa không?**

CÓ. Dù ctx đã cancel, vẫn có thể còn reference từ parent tree. \`cancel()\` sẽ release các reference đó.

> **Q: Tại sao Go không tự lo việc này?**

Vì Go không có destructor / RAII. \`defer cancel()\` là cách idiomatic để đảm bảo cleanup. \`go vet\` và linter (vd \`govet\`, \`staticcheck\`) flag các trường hợp quên defer cancel.

### ⚠ Lỗi thường gặp

\`\`\`go
// BAD 1 — không gọi cancel
ctx, _ := context.WithTimeout(parent, 5*time.Second)
return doWork(ctx)

// BAD 2 — gọi cancel nhưng không defer (sai luồng error)
ctx, cancel := context.WithTimeout(parent, 5*time.Second)
result, err := doWork(ctx)
cancel()  // không chạy nếu doWork panic
return result, err

// GOOD
ctx, cancel := context.WithTimeout(parent, 5*time.Second)
defer cancel()
return doWork(ctx)
\`\`\`

### 📝 Tóm tắt mục 7

- Luôn \`defer cancel()\` ngay sau khi tạo derived ctx.
- \`cancel()\` idempotent.
- Quên = goroutine leak, accumulate gây OOM.

---

## 8. \`ctx.Err()\` — phân biệt 2 loại cancel

\`\`\`go
var (
    Canceled         = errors.New("context canceled")
    DeadlineExceeded = deadlineExceededError{}  // implement net.Error
)
\`\`\`

| Err | Nghĩa | Log level đề xuất |
|-----|-------|-------|
| \`nil\` | ctx chưa cancel | — |
| \`context.Canceled\` | cancel chủ động (caller gọi \`cancel()\`) | INFO |
| \`context.DeadlineExceeded\` | hết timeout/deadline | WARN (có thể là performance issue) |

### Pattern check

\`\`\`go
result, err := slowOp(ctx)
if err != nil {
    if errors.Is(err, context.Canceled) {
        log.Info("op canceled by caller")
        return nil
    }
    if errors.Is(err, context.DeadlineExceeded) {
        log.Warn("op timed out")
        return fmt.Errorf("slowOp timeout: %w", err)
    }
    return err  // error khác
}
\`\`\`

> Dùng \`errors.Is()\` (xem [Lesson 19](../lesson-19-errors/README.md)) — không so sánh trực tiếp \`err == context.Canceled\` vì lib bên dưới có thể wrap.

### ❓ Câu hỏi tự nhiên

> **Q: Khi nào HTTP client trả \`DeadlineExceeded\` vs \`Canceled\`?**

\`net/http\` trả \`context.Canceled\` khi user disconnect (client gọi \`cancel()\`), trả \`context.DeadlineExceeded\` khi timeout (ctx tự cancel do deadline). 2 case khác nhau về retry strategy: cancel → đừng retry; timeout → có thể retry (với backoff).

### 📝 Tóm tắt mục 8

- 2 sentinel error: \`Canceled\` (chủ động) vs \`DeadlineExceeded\` (timeout).
- Check bằng \`errors.Is\`.
- Khác nhau về log + retry policy.

---

## 9. \`WithValue\` — quy tắc nghiêm khắc

### 9.1 Pattern key chuẩn

\`\`\`go
type contextKey string

const (
    requestIDKey contextKey = "requestID"
    userKey      contextKey = "user"
    traceIDKey   contextKey = "traceID"
)

// Set
ctx = context.WithValue(ctx, requestIDKey, "req-12345")

// Get
reqID, ok := ctx.Value(requestIDKey).(string)
if !ok {
    reqID = "unknown"
}
\`\`\`

### 9.2 Vì sao key phải là custom type

\`\`\`go
// BAD — raw string key
ctx = context.WithValue(ctx, "userID", 42)
\`\`\`

Vấn đề: nếu package A và package B đều dùng key \`"userID"\` (string raw), 1 trong 2 sẽ overwrite cái còn lại. **Tên type khác nhau = key khác nhau**, không collision.

### 9.3 Helper accessor (idiomatic)

\`\`\`go
type contextKey int

const requestIDKey contextKey = iota

// Setter
func WithRequestID(ctx context.Context, id string) context.Context {
    return context.WithValue(ctx, requestIDKey, id)
}

// Getter
func RequestID(ctx context.Context) string {
    if v, ok := ctx.Value(requestIDKey).(string); ok {
        return v
    }
    return ""
}
\`\`\`

→ Caller chỉ thấy 2 hàm \`WithRequestID\` / \`RequestID\`, không thấy key — gọn, không collision, type-safe.

### 9.4 NÊN dùng cho

- Request ID (tracing).
- User ID đã authenticate (middleware set, handler đọc).
- Trace span (OpenTelemetry).
- Locale / timezone của user.

### 9.5 KHÔNG dùng cho

- Business parameters: pass explicitly qua function argument.
- Database connection: dùng DI (inject vào struct).
- Logger: dùng DI hoặc package-level var.
- Anything cần test → khó stub.

### 4 ví dụ cụ thể

\`\`\`go
// Ví dụ 1 — request ID (OK, đúng usecase)
ctx = WithRequestID(ctx, "req-12345")

// Ví dụ 2 — user info từ JWT (OK)
ctx = context.WithValue(ctx, userKey, User{ID: 42, Role: "admin"})

// Ví dụ 3 — query params (KHÔNG nên, pass explicit hơn)
// BAD: ctx = context.WithValue(ctx, "limit", 50)
// GOOD: func List(ctx context.Context, limit int) ...

// Ví dụ 4 — *sql.DB (KHÔNG nên, dùng DI)
// BAD: ctx = context.WithValue(ctx, "db", dbConn)
// GOOD: type Service struct { db *sql.DB } ...
\`\`\`

### ⚠ Lỗi thường gặp

- Key kiểu \`string\` raw → collision.
- Lạm dụng \`WithValue\` thay cho parameter → khó test, magic, không type-safe.
- Quên check \`ok\` khi assert type → panic nếu key không tồn tại.

### 📝 Tóm tắt mục 9

- Key phải là custom type (typed-string hoặc typed-int).
- Chỉ cho request-scoped metadata, không cho business data.
- Provide helper \`With*\` / accessor để type-safe.

---

## 10. Integration với stdlib

### 10.1 \`net/http\`

\`\`\`go
// Server-side: r.Context() là ctx của request
func handler(w http.ResponseWriter, r *http.Request) {
    ctx := r.Context()
    // Khi client disconnect, ctx tự cancel
}

// Client-side: NewRequestWithContext
ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
defer cancel()
req, _ := http.NewRequestWithContext(ctx, "GET", "https://api.example.com", nil)
resp, err := http.DefaultClient.Do(req)
\`\`\`

### 10.2 \`database/sql\`

\`\`\`go
rows, err := db.QueryContext(ctx, "SELECT * FROM users WHERE active = $1", true)
result, err := db.ExecContext(ctx, "UPDATE users SET ... WHERE id = $1", 42)
tx, err := db.BeginTx(ctx, nil)
\`\`\`

→ Khi ctx cancel, driver gửi cancel signal xuống Postgres (\`pg_cancel_backend\`) hoặc đóng connection.

### 10.3 \`os/exec\`

\`\`\`go
ctx, cancel := context.WithTimeout(context.Background(), 30*time.Second)
defer cancel()

cmd := exec.CommandContext(ctx, "ffmpeg", "-i", "input.mp4", "output.webm")
err := cmd.Run()
// Quá 30s → kernel send SIGKILL cho ffmpeg
\`\`\`

### 10.4 \`grpc-go\`, \`redis-go\`, \`mongo-go\`, ...

Mọi lib mature đều có method nhận ctx. Nếu thấy lib nào không có → đó là dấu hiệu lib lỗi thời.

### 📝 Tóm tắt mục 10

- HTTP server: \`r.Context()\`.
- HTTP client: \`http.NewRequestWithContext\`.
- DB: \`db.QueryContext\` / \`ExecContext\` / \`BeginTx\`.
- Exec: \`exec.CommandContext\`.

---

## 11. HTTP server pattern hoàn chỉnh

\`\`\`go
func ordersHandler(w http.ResponseWriter, r *http.Request) {
    ctx := r.Context()

    // Đính kèm request ID
    reqID := uuid.NewString()
    ctx = WithRequestID(ctx, reqID)
    w.Header().Set("X-Request-ID", reqID)

    // Set timeout 10s cho toàn bộ logic (nhỏ hơn server.WriteTimeout)
    ctx, cancel := context.WithTimeout(ctx, 10*time.Second)
    defer cancel()

    // Query DB (truyền ctx)
    orders, err := orderRepo.List(ctx, parseUserID(r))
    if err != nil {
        if errors.Is(err, context.Canceled) {
            // client disconnect — không cần response
            return
        }
        if errors.Is(err, context.DeadlineExceeded) {
            http.Error(w, "timeout", http.StatusGatewayTimeout)
            return
        }
        http.Error(w, "internal", http.StatusInternalServerError)
        return
    }

    w.Header().Set("Content-Type", "application/json")
    json.NewEncoder(w).Encode(orders)
}
\`\`\`

### ❓ Câu hỏi tự nhiên

> **Q: Tại sao cần \`WithTimeout(ctx, 10s)\` nếu server đã có \`WriteTimeout\`?**

\`server.WriteTimeout\` là timeout của HTTP framework cho việc ghi response, không cancel goroutine xử lý. Nếu DB query bị treo 60s, \`WriteTimeout\` không cứu được goroutine đó. Phải tự \`WithTimeout\` để cancel sub-operation.

> **Q: 10s này có nên bằng \`WriteTimeout\`?**

Nên **nhỏ hơn một chút** (vd \`WriteTimeout=15s\`, ctx timeout=10s) để có 5s ghi response error. Nếu ctx timeout > \`WriteTimeout\`, framework đã đóng connection trước, client không nhận được error message.

### 📝 Tóm tắt mục 11

- \`r.Context()\` cho cancellation tự động khi client disconnect.
- Wrap thêm \`WithTimeout\` để cap thời gian xử lý logic.
- Check \`errors.Is\` để phân loại error trả về.

---

## 12. Timeout cascading — cách deadline lan trong tree

### 💡 Trực giác

Khi bạn \`WithTimeout(parent, 10s)\`, deadline của child = **min(parent_deadline, now + 10s)**. Nếu parent đã sắp hết hạn (vd còn 3s), child sẽ cancel sau 3s, **không phải 10s**.

### Ví dụ cụ thể

\`\`\`go
// t = 0s
ctx1, cancel1 := context.WithTimeout(context.Background(), 30*time.Second)
defer cancel1()
// ctx1 hết hạn t = 30s

// t = 5s (giả sử đã xử lý 5s)
ctx2, cancel2 := context.WithTimeout(ctx1, 60*time.Second)
defer cancel2()
// ctx2 sẽ hết hạn ở min(t=30s, t=5+60=65s) = t=30s
// → ctx2 chỉ còn 25s, KHÔNG phải 60s
\`\`\`

### Ứng dụng thực tế

Server có \`total_timeout = 30s\`. Trong handler:

\`\`\`go
ctx := r.Context()  // có deadline 30s

// Gọi 3 sub-service song song, mỗi cái cap 5s
ctxA, cancelA := context.WithTimeout(ctx, 5*time.Second)
defer cancelA()
ctxB, cancelB := context.WithTimeout(ctx, 5*time.Second)
defer cancelB()
ctxC, cancelC := context.WithTimeout(ctx, 5*time.Second)
defer cancelC()

// Mỗi cái sẽ cancel sau MIN(5s, thời gian còn lại của ctx)
// Nếu ctx đã chạy 28s rồi, 3 sub-call sẽ cancel sau 2s, không phải 5s
\`\`\`

→ Tự bảo vệ chống "cộng dồn" timeout.

### 📝 Tóm tắt mục 12

- Deadline của child = min(parent, child_request).
- Không cần lo "tổng timeout" — tree tự cap.

---

## 13. Cancellation propagation — vẽ tree

\`\`\`
context.Background()
    │
    └── WithTimeout(30s) ──── ctxA
            │
            ├── WithCancel ── ctxB ── WithValue("userID", 42) ── ctxB1
            │                      └── WithTimeout(5s) ──────── ctxB2
            │
            └── WithDeadline(end of day) ── ctxC
                                                └── WithCancel ── ctxC1
\`\`\`

Quy tắc lan:

- Cancel \`ctxA\` → cancel \`ctxB\`, \`ctxB1\`, \`ctxB2\`, \`ctxC\`, \`ctxC1\` (cả cây).
- Cancel \`ctxB\` → cancel \`ctxB1\`, \`ctxB2\` (subtree); \`ctxA\`, \`ctxC\`, \`ctxC1\` không ảnh hưởng.
- \`ctxA\` timeout sau 30s → cả cây cancel.
- \`ctxB2\` timeout sau 5s → chỉ \`ctxB2\` cancel; cha (\`ctxB\`, \`ctxA\`) vẫn sống.

### Reason

Mỗi child ctx **subscribe** vào parent's \`Done()\` channel. Khi parent đóng channel, child propagate xuống grand-child. Một cây 10000 goroutine, cancel root 1 lần → tất cả unblock cùng lúc.

### 📝 Tóm tắt mục 13

- Cancel **chỉ lan xuống**, không lan ngang/lên.
- 1 lần cancel root → toàn cây stop.
- Mỗi subtree có thể có timeout/deadline riêng.

---

## 14. 6 Anti-pattern phổ biến

### 14.1 Context as struct field

\`\`\`go
// BAD
type Service struct {
    ctx context.Context
    db  *sql.DB
}

func (s *Service) Get(id int) ... {
    rows, _ := s.db.QueryContext(s.ctx, "...")
}
\`\`\`

Vấn đề: ctx được "đông lạnh" tại thời điểm khởi tạo Service. Khi handler chạy với request ctx khác, không dùng được. Không tái sử dụng được Service cho nhiều request.

**Đúng**:

\`\`\`go
type Service struct {
    db *sql.DB
}

func (s *Service) Get(ctx context.Context, id int) ... {
    rows, _ := s.db.QueryContext(ctx, "...")
}
\`\`\`

> Exception: type ngắn hạn như \`*http.Request\` có ctx attached — đó là design pattern khác, không phải lưu ctx dài hạn.

### 14.2 Quên \`defer cancel()\`

\`\`\`go
// BAD
ctx, _ := context.WithTimeout(parent, 5*time.Second)
return doWork(ctx)
\`\`\`

→ Leak goroutine timer.

### 14.3 Nhét dependency vào context

\`\`\`go
// BAD
ctx = context.WithValue(ctx, "db", dbConn)
ctx = context.WithValue(ctx, "logger", logger)
\`\`\`

→ Khó test, magic, không type-safe. Dùng DI qua constructor:

\`\`\`go
type Service struct {
    db     *sql.DB
    logger Logger
}
\`\`\`

### 14.4 Global context

\`\`\`go
// BAD
var globalCtx = context.Background()
\`\`\`

Không thể cancel cây global. Mỗi entry point (main, request handler) phải tạo root riêng.

### 14.5 Lạm dụng \`WithValue\`

Truyền 10 thứ qua \`WithValue\` thay vì argument → mất type safety, debug khó.

### 14.6 Pass \`nil\` ctx

\`\`\`go
// BAD
foo(nil)  // foo nhận context.Context

// GOOD
foo(context.TODO())
\`\`\`

Hầu hết hàm sẽ panic khi gọi \`ctx.Done()\` trên nil ctx.

---

## 15. Pitfall thường gặp

| Pitfall | Triệu chứng | Cách phát hiện | Fix |
|---------|-------------|----------------|-----|
| Quên check \`ctx.Done()\` trong long loop | Loop không dừng khi cancel | Test: \`WithTimeout(100ms)\` + measure thời gian thật | Thêm \`select { case <-ctx.Done(): return ... }\` |
| Quên \`defer cancel()\` | Goroutine count tăng dần | \`runtime.NumGoroutine()\` tăng, hoặc \`go vet\` báo | Thêm \`defer cancel()\` ngay sau dòng \`WithTimeout\` |
| Pass \`context.Background()\` thay vì propagate | Cancel không lan, request "zombie" | Trace log thấy request vẫn chạy dù client disconnect | Pass nguyên \`ctx\` từ caller |
| Block trên \`<-ctx.Done()\` ngoài select | Deadlock nếu ctx chưa cancel | Goroutine stuck trong stack trace | Bọc trong \`select { ... }\` |
| Race khi đọc value sau cancel | Đôi khi nil đôi khi giá trị | Race detector, hoặc test flaky | Đọc value trước, dùng sau khi check ctx |

---

## 16. Bài tập

### BT1 — \`Fetch(ctx, url)\` với timeout 2s

Viết function \`Fetch(ctx context.Context, url string) ([]byte, error)\`:

- Gọi \`http.Get(url)\` nhưng có timeout 2s (dùng \`WithTimeout\` từ parent ctx).
- Trả \`context.DeadlineExceeded\` nếu quá hạn.
- Đảm bảo không leak goroutine (defer cancel).

### BT2 — Long loop check \`Done()\`

Viết \`func process(ctx context.Context, n int) error\` mô phỏng task nặng:
- Loop \`n\` lần, mỗi lần \`time.Sleep(100ms)\`.
- Sau mỗi iteration check \`ctx.Done()\` → return \`ctx.Err()\` nếu cancel.
- Trong \`main\`, tạo \`WithTimeout(500ms)\`, gọi với \`n=100\`, in số iteration thật sự chạy được.

### BT3 — HTTP handler propagate xuống DB + API

Mock 1 handler \`/orders\`:
- Nhận \`r.Context()\`, wrap \`WithTimeout(5s)\`.
- Gọi \`dbQuery(ctx)\` (simulate sleep 1s, return slice).
- Gọi \`externalAPI(ctx)\` (simulate sleep 1s, return string).
- Trả về JSON kết hợp.
- Test case: client disconnect → cả 2 sub-call cancel.

### BT4 — Request ID via \`WithValue\`

- Định nghĩa \`type ctxKey string\`, key \`requestIDKey = "reqID"\`.
- Viết \`WithRequestID(ctx, id) ctx\` và \`RequestID(ctx) string\`.
- Test: 3 level call chain, mỗi level log request ID.

### BT5 — Cascade cancel: 3 worker

- \`main\` tạo root ctx, derive \`WithCancel\`.
- Spawn 3 goroutine, mỗi cái loop in "worker N: tick" mỗi 300ms, check \`ctx.Done()\`.
- Sau 1s, \`main\` gọi \`cancel()\`.
- Đợi 3 worker dừng (\`sync.WaitGroup\`).
- In tổng số tick mỗi worker.

### BT6 — Fix 4 anti-pattern

Cho code dưới, sửa 4 lỗi:

\`\`\`go
type UserService struct {
    ctx context.Context  // (1)
    db  *sql.DB
}

func NewUserService(db *sql.DB) *UserService {
    return &UserService{
        ctx: context.Background(),
        db:  db,
    }
}

func (s *UserService) Find(id int) (*User, error) {
    ctx, _ := context.WithTimeout(s.ctx, 3*time.Second)  // (2), (3)
    row := s.db.QueryRowContext(ctx, "SELECT ...", id)
    // ...
    return user, nil
}

func main() {
    svc := NewUserService(dbConn)
    user, _ := svc.Find(42)
    foo(nil)  // (4) - foo nhận ctx
}
\`\`\`

---

## 17. Lời giải chi tiết

### Lời giải BT1

\`\`\`go
func Fetch(ctx context.Context, url string) ([]byte, error) {
    ctx, cancel := context.WithTimeout(ctx, 2*time.Second)
    defer cancel()

    req, err := http.NewRequestWithContext(ctx, "GET", url, nil)
    if err != nil {
        return nil, err
    }

    resp, err := http.DefaultClient.Do(req)
    if err != nil {
        if errors.Is(err, context.DeadlineExceeded) {
            return nil, fmt.Errorf("fetch %s: timeout 2s: %w", url, err)
        }
        return nil, err
    }
    defer resp.Body.Close()

    return io.ReadAll(resp.Body)
}
\`\`\`

**Cách tiếp cận**:

1. Wrap parent ctx bằng \`WithTimeout(2s)\` — child sẽ cancel sau **min(parent_deadline, 2s)**.
2. \`defer cancel()\` ngay để tránh leak.
3. Dùng \`http.NewRequestWithContext\` — \`Do()\` sẽ tự return err khi ctx cancel.
4. Phân biệt \`DeadlineExceeded\` để log có ý nghĩa.

**Verify**: gọi \`Fetch(ctx, "https://httpbin.org/delay/5")\` → mất 2s rồi return timeout error.

### Lời giải BT2

\`\`\`go
func process(ctx context.Context, n int) (int, error) {
    done := 0
    for i := 0; i < n; i++ {
        select {
        case <-ctx.Done():
            return done, ctx.Err()
        case <-time.After(100 * time.Millisecond):
            done++
        }
    }
    return done, nil
}

func main() {
    ctx, cancel := context.WithTimeout(context.Background(), 500*time.Millisecond)
    defer cancel()

    done, err := process(ctx, 100)
    fmt.Printf("Ran %d/%d iterations, err=%v\\n", done, 100, err)
    // Output: Ran 4-5/100 iterations, err=context deadline exceeded
}
\`\`\`

**Walk-through**:

- 500ms timeout, mỗi iter 100ms → ~5 iter chạy được.
- Iter thứ 6: \`<-time.After(100ms)\` chưa fire, \`<-ctx.Done()\` fire trước (do đã hết hạn ở t=500ms) → return ngay.
- \`done\` đếm số iter **hoàn thành**, không phải số attempt.

### Lời giải BT3

\`\`\`go
type Response struct {
    Orders []string \`json:"orders"\`
    API    string   \`json:"api"\`
}

func dbQuery(ctx context.Context) ([]string, error) {
    select {
    case <-time.After(1 * time.Second):
        return []string{"order-1", "order-2"}, nil
    case <-ctx.Done():
        return nil, ctx.Err()
    }
}

func externalAPI(ctx context.Context) (string, error) {
    req, _ := http.NewRequestWithContext(ctx, "GET", "https://httpbin.org/delay/1", nil)
    resp, err := http.DefaultClient.Do(req)
    if err != nil {
        return "", err
    }
    defer resp.Body.Close()
    return "api-ok", nil
}

func ordersHandler(w http.ResponseWriter, r *http.Request) {
    ctx, cancel := context.WithTimeout(r.Context(), 5*time.Second)
    defer cancel()

    orders, err := dbQuery(ctx)
    if err != nil {
        if errors.Is(err, context.Canceled) {
            return // client gone
        }
        http.Error(w, err.Error(), http.StatusInternalServerError)
        return
    }

    api, err := externalAPI(ctx)
    if err != nil {
        if errors.Is(err, context.Canceled) {
            return
        }
        http.Error(w, err.Error(), http.StatusBadGateway)
        return
    }

    w.Header().Set("Content-Type", "application/json")
    json.NewEncoder(w).Encode(Response{Orders: orders, API: api})
}
\`\`\`

**Điểm chính**: cả \`dbQuery\` và \`externalAPI\` đều nhận \`ctx\`. Khi client disconnect, \`r.Context()\` close, cancel propagate, cả 2 dừng ngay.

### Lời giải BT4

\`\`\`go
type ctxKey string

const requestIDKey ctxKey = "reqID"

func WithRequestID(ctx context.Context, id string) context.Context {
    return context.WithValue(ctx, requestIDKey, id)
}

func RequestID(ctx context.Context) string {
    if v, ok := ctx.Value(requestIDKey).(string); ok {
        return v
    }
    return "unknown"
}

func levelA(ctx context.Context) {
    log.Printf("[%s] in A", RequestID(ctx))
    levelB(ctx)
}

func levelB(ctx context.Context) {
    log.Printf("[%s] in B", RequestID(ctx))
    levelC(ctx)
}

func levelC(ctx context.Context) {
    log.Printf("[%s] in C", RequestID(ctx))
}

func main() {
    ctx := WithRequestID(context.Background(), "req-12345")
    levelA(ctx)
    // Output:
    // [req-12345] in A
    // [req-12345] in B
    // [req-12345] in C
}
\`\`\`

**Note**: dùng custom type \`ctxKey\` để tránh collision với key string khác.

### Lời giải BT5

\`\`\`go
func worker(ctx context.Context, id int, wg *sync.WaitGroup) int {
    defer wg.Done()
    ticks := 0
    for {
        select {
        case <-ctx.Done():
            fmt.Printf("worker %d: stopped after %d ticks (%v)\\n", id, ticks, ctx.Err())
            return ticks
        case <-time.After(300 * time.Millisecond):
            ticks++
            fmt.Printf("worker %d: tick %d\\n", id, ticks)
        }
    }
}

func main() {
    ctx, cancel := context.WithCancel(context.Background())
    var wg sync.WaitGroup
    for i := 1; i <= 3; i++ {
        wg.Add(1)
        go worker(ctx, i, &wg)
    }
    time.Sleep(1 * time.Second)
    cancel()
    wg.Wait()
    fmt.Println("all workers stopped")
}
\`\`\`

**Walk-through**:

- 3 worker, mỗi cái tick mỗi 300ms.
- 1s → mỗi worker tick được ~3 lần.
- \`cancel()\` → cả 3 cùng nhận signal qua \`<-ctx.Done()\`, cùng return.
- \`wg.Wait()\` đảm bảo main không exit sớm.

### Lời giải BT6

\`\`\`go
type UserService struct {
    db *sql.DB  // FIX (1): bỏ ctx khỏi struct
}

func NewUserService(db *sql.DB) *UserService {
    return &UserService{db: db}
}

func (s *UserService) Find(ctx context.Context, id int) (*User, error) {
    // FIX (2): nhận ctx từ parameter, không lấy từ struct
    // FIX (3): defer cancel
    ctx, cancel := context.WithTimeout(ctx, 3*time.Second)
    defer cancel()

    row := s.db.QueryRowContext(ctx, "SELECT ...", id)
    // ...
    return user, nil
}

func foo(ctx context.Context) { /* ... */ }

func main() {
    svc := NewUserService(dbConn)
    ctx := context.Background()
    user, _ := svc.Find(ctx, 42)
    foo(context.TODO())  // FIX (4): không pass nil
    _ = user
}
\`\`\`

**4 fix**:

1. Xoá field \`ctx\` khỏi struct.
2. Constructor \`NewUserService\` không nhận/lưu ctx.
3. \`Find\` nhận ctx qua parameter, \`defer cancel()\`.
4. \`foo(nil)\` → \`foo(context.TODO())\`.

---

## 18. Code & Minh hoạ

- File code minh hoạ: [solutions.go](./solutions.go) — chạy \`go run solutions.go\` để xem demo cancel chain, timeout, deadline, WithValue.
- Tương tác trực quan: [visualization.html](./visualization.html) — 3 module:
  - Context tree + cancel propagation animation.
  - HTTP request flow với timeout cascade.
  - WithValue walk-up chain.

---

## 19. Bài tiếp theo

Bạn vừa hoàn thành **Tier 2 — Go Intermediate**. Bước tiếp theo:

- [Tier 3 — Go Advanced](../tier-3-advanced/index.html): generics, reflect, GC, profiling, concurrency patterns nâng cao (\`errgroup\`, \`singleflight\`, pipeline, fan-out/fan-in).

Trong Tier 3, \`context\` sẽ tái xuất hiện ở:

- **\`errgroup.WithContext\`** — nhóm goroutine cùng chia sẻ ctx, lỗi 1 cái cancel cả nhóm.
- **\`singleflight\`** — gộp request trùng nhau, ctx của caller đầu tiên giữ quyền.
- **gRPC** — deadline cascade qua các microservice.

Đầu tư hiểu sâu \`context\` lúc này sẽ trả công đậm ở các lesson backend.

## Tham khảo

- [Go Concurrency Patterns: Context (Go blog)](https://go.dev/blog/context).
- [pkg.go.dev — context](https://pkg.go.dev/context).
- Sameer Ajmani, "Go Concurrency Patterns: Context", Go team blog.
- Source: \`runtime\` package — \`propagateCancel\`, \`cancelCtx\`, \`timerCtx\`.
`;
