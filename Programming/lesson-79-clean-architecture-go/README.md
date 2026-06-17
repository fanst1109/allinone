# Lesson 79 — Clean Architecture trong Go

> "Kiến trúc tốt là kiến trúc cho phép bạn **trì hoãn quyết định** — chọn database, chọn web framework, chọn message queue — đến phút cuối, và **đổi chúng** mà không phải viết lại business logic." — diễn giải tinh thần của Robert C. Martin.

## Mục tiêu học tập (learning objectives)

Sau bài này, bạn sẽ:

- Hiểu **vấn đề coupling** mà clean architecture giải quyết, và vì sao "code chạy được" chưa đủ.
- Phát biểu chính xác **Dependency Rule** (quy tắc phụ thuộc): mọi mũi tên trỏ **vào trong**.
- Phân biệt 4 tầng — **entities / use cases / interface adapters / frameworks & drivers** — và biết cái gì thuộc tầng nào.
- Hiểu **Hexagonal Architecture (Ports & Adapters)** và mối liên hệ với clean architecture.
- Áp dụng **Dependency Inversion** trong Go bằng interface + constructor injection (không cần DI container).
- Bố trí một **Go project layout** chuẩn (`cmd/`, `internal/`, `domain/`, `usecase/`, `adapter/`).
- Hiểu **composition root** — nơi duy nhất nối mọi tầng lại.
- Viết được **unit test cho use case bằng mock repository**, không cần database thật.
- Nhận diện **anti-pattern**: anemic domain, logic trong handler, domain import infra, over-layering.
- Biết **khi nào nên / không nên** dùng clean architecture (trade-off).
- Có một liên hệ ngắn tới **DDD (Domain-Driven Design)**.

## Kiến thức tiền đề (prerequisites)

- [Lesson 18 — Interfaces](../lesson-18-interfaces/) — nền tảng cho Dependency Inversion. **Bắt buộc nắm vững.**
- [Lesson 19 — Errors](../lesson-19-errors/) — phân biệt lỗi miền (domain error) vs lỗi kỹ thuật.
- [Lesson 20 — Packages & Modules](../lesson-20-packages-modules/) — biết `internal/`, import path, package boundary.
- [Lesson 38 — Mocking & Test Doubles](../lesson-38-mocking-test-doubles/) — kỹ thuật mock dùng để test use case.
- [Lesson 39 — Design Patterns trong Go](../lesson-39-design-patterns-go/) — đặc biệt là dependency injection.
- [Lesson 43 — REST API Design](../lesson-43-rest-api-design/) — tầng HTTP adapter sẽ phơi ra REST.

---

## 1. Vấn đề: vì sao "code chạy được" chưa đủ

> 💡 **Trực giác / Hình dung.** Hình dung một quán ăn nơi đầu bếp tự ra bàn nhận order, tự thu tiền, tự rửa bát, tự đi chợ. Hôm nay quán đông, bạn muốn thuê thêm thu ngân — nhưng không thể, vì "thu tiền" dính chặt vào "nấu ăn" trong cùng một con người. Code coupling cũng vậy: khi *logic nghiệp vụ* dính chặt *chi tiết kỹ thuật* (SQL, HTTP, JSON), bạn không thể đổi cái này mà không đụng cái kia.

### 1.1 Một handler "tất cả trong một" — phản ví dụ

Đây là cách rất nhiều dự án Go bắt đầu (và mắc kẹt):

```go
func RegisterUser(w http.ResponseWriter, r *http.Request) {
    // (1) đọc HTTP
    var in struct{ Name, Email string }
    json.NewDecoder(r.Body).Decode(&in)

    // (2) business rule trộn lẫn ngay đây
    if in.Name == "" {
        http.Error(w, "tên rỗng", 400)
        return
    }
    if !strings.Contains(in.Email, "@") {
        http.Error(w, "email sai", 400)
        return
    }

    // (3) truy vấn DB trực tiếp — SQL nằm trong handler
    var count int
    db.QueryRow("SELECT count(*) FROM users WHERE email=$1", in.Email).Scan(&count)
    if count > 0 {
        http.Error(w, "email đã dùng", 409)
        return
    }

    // (4) ghi DB
    db.Exec("INSERT INTO users(id,name,email) VALUES($1,$2,$3)",
        uuid.New(), in.Name, in.Email)

    w.WriteHeader(201)
}
```

Chạy được. Demo ngon. Nhưng:

- **Không test được logic** mà không dựng một Postgres thật (vì SQL nhúng cứng).
- **Đổi từ Postgres sang MongoDB** = viết lại handler.
- **Tái sử dụng logic "đăng ký user"** cho một CLI hay một gRPC endpoint = copy-paste.
- **Business rule (email phải unique, tên không rỗng) bị trộn** với chi tiết HTTP/SQL → đọc một chỗ không biết "luật" thật sự là gì.
- Khi rule đổi (vd thêm "email phải thuộc domain công ty"), phải dò trong mớ HTTP + SQL.

> ❓ **Câu hỏi tự nhiên của người đọc.**
> - *"Code trên đâu có lỗi cú pháp, sao gọi là sai?"* — Nó không sai về **chức năng**, nó sai về **khả năng thay đổi**. Phần mềm sống lâu là phần mềm dễ đổi; "soft" trong software nghĩa là mềm dẻo.
> - *"Vậy tách ra thì phức tạp hơn, có đáng không?"* — Với script 50 dòng dùng một lần: không. Với hệ thống sống nhiều năm, nhiều người sửa: rất đáng. Mục 9 bàn kỹ trade-off.

### 1.2 Coupling là gì, đo bằng cách nào

**Coupling (độ dính kết)** = mức độ một module phụ thuộc vào chi tiết của module khác. Đo nhanh bằng câu hỏi: *"Nếu tôi đổi X, có bao nhiêu chỗ khác phải sửa theo?"*

- Handler trên: đổi schema DB → sửa handler. Đổi web framework → sửa logic. Coupling **cao**.
- Mục tiêu clean arch: đổi DB → sửa **đúng 1 file adapter**. Logic đứng yên. Coupling **thấp**.

> 📝 **Tóm tắt mục 1.**
> - "Chạy được" ≠ "kiến trúc tốt". Tiêu chí thật là **dễ thay đổi, dễ test**.
> - Coupling cao = đổi một chỗ kéo theo sửa nhiều chỗ.
> - Nguồn gốc coupling: trộn lẫn *business rule* với *chi tiết kỹ thuật* (HTTP/SQL/JSON).

---

## 2. Dependency Rule — quy tắc xương sống

> 💡 **Trực giác.** Hình dung các vòng tròn đồng tâm như củ hành. Lõi trong cùng là *luật nghiệp vụ* — thứ ít đổi nhất, quý nhất. Vỏ ngoài là *chi tiết kỹ thuật* (web, DB) — thứ hay đổi nhất, "rẻ" nhất. **Luật vàng: vỏ ngoài biết về lõi, lõi KHÔNG biết về vỏ.** Cũng như tim không cần biết bạn mặc áo gì.

### 2.1 Phát biểu chính xác

> **Dependency Rule:** Source code dependency chỉ được trỏ **vào trong** (từ tầng ngoài → tầng trong). Không gì ở tầng trong được phép biết bất cứ thứ gì ở tầng ngoài.

"Biết" ở đây nghĩa là **import**. Tầng trong (domain) **không được `import`** package của tầng ngoài (database, http). Cụ thể trong [`solutions/internal/domain/user.go`](./solutions/internal/domain/user.go), import chỉ gồm `errors`, `strings` — stdlib trung lập, không có `database/sql`, không `net/http`.

### 2.2 Bốn vòng tròn (4 layers)

Từ trong ra ngoài:

| # | Tầng | Chứa gì | Trong solutions/ |
|---|------|---------|------------------|
| 1 | **Entities** (domain) | Business rule cốt lõi, entity + invariant | `internal/domain/user.go` |
| 2 | **Use Cases** (application) | Orchestration của business rule, định nghĩa port | `internal/usecase/user_usecase.go` |
| 3 | **Interface Adapters** | Chuyển đổi dữ liệu: HTTP handler, repository impl, DTO | `internal/adapter/http/`, `internal/adapter/memory/` |
| 4 | **Frameworks & Drivers** | Web server, DB driver, thư viện ngoài | `cmd/server/main.go` wiring `net/http` |

Mũi tên dependency: `cmd → adapter → usecase → domain`. Không bao giờ ngược lại.

### 2.3 Bốn ví dụ "thuộc tầng nào" (luyện phản xạ)

1. *"Email phải có dấu @"* → **Entities** (luật bản chất của User, đúng ở mọi ngữ cảnh). Xem `setEmail` trong domain.
2. *"Email phải duy nhất toàn hệ thống"* → **Use Cases** (cần hỏi toàn bộ tập user, là rule cấp ứng dụng — `Register` gọi `repo.FindByEmail`).
3. *"Trả 409 Conflict khi email trùng"* → **Interface Adapters** (409 là khái niệm của HTTP, không phải của miền — `writeDomainErr` trong handler).
4. *"Dùng pgx pool kết nối Postgres"* → **Frameworks & Drivers** (composition root chọn driver).

> ⚠ **Lỗi thường gặp.** Đặt rule (2) "email duy nhất" vào trong entity `User`. Sai, vì một `User` đơn lẻ **không biết** về toàn bộ tập user — nó không có quyền truy cập repository. Rule cần truy vấn tập hợp → thuộc use case.

> 🔁 **Dừng lại tự kiểm tra.**
> 1. Domain `user.go` có được phép `import "net/http"` không? Vì sao?
> 2. Mũi tên dependency giữa `usecase` và `adapter/memory` trỏ theo chiều nào?
>
> <details><summary>Đáp án</summary>
>
> 1. **Không.** `net/http` là tầng ngoài (adapter/framework). Domain import nó = vi phạm Dependency Rule, lõi dính chi tiết kỹ thuật. Nếu thấy domain import http/sql → đỏ cờ ngay.
> 2. `adapter/memory` **import** `usecase` (để thỏa interface `UserRepository`) và `domain`. Tức mũi tên trỏ **vào trong**: `memory → usecase → domain`. `usecase` hoàn toàn không biết package `memory` tồn tại.
> </details>

> 📝 **Tóm tắt mục 2.**
> - Dependency Rule: import chỉ trỏ vào trong. Lõi không biết vỏ.
> - 4 tầng: Entities → Use Cases → Adapters → Frameworks.
> - Phân loại rule theo "cần biết bao nhiêu ngữ cảnh": bản chất 1 entity → domain; cần tập hợp / DB → usecase; khái niệm giao thức (HTTP status) → adapter.

---

## 3. Hexagonal Architecture (Ports & Adapters)

> 💡 **Trực giác.** Hình dung lõi ứng dụng là một con chip có nhiều **chân cắm (ports)**. Mỗi chân là một interface. Bạn cắm vào đó các **adapter** khác nhau — chân "lưu trữ" cắm được Postgres, MySQL, hay RAM; chân "đầu vào" cắm được HTTP, gRPC, CLI. Con chip (lõi) **không quan tâm** cắm cái gì, miễn đúng hình dạng chân.

Hexagonal Architecture (Alistair Cockburn) là một cách nhìn **tương đương** clean architecture, nhấn vào **port & adapter**:

- **Port** = interface do lõi **sở hữu và định nghĩa**.
  - **Driven port** (outbound): lõi gọi ra ngoài. Vd `usecase.UserRepository` — usecase cần lưu trữ.
  - **Driving port** (inbound): thế giới ngoài gọi vào lõi. Vd interface `UserService` mà HTTP handler phụ thuộc.
- **Adapter** = implementation cụ thể của port.
  - **Driven adapter**: `memory.UserRepo` (RAM), hay `postgres.UserRepo` (DB).
  - **Driving adapter**: `http.Handler` dịch request HTTP thành lời gọi use case.

### 3.1 Điểm mấu chốt: ai sở hữu interface?

Trong [`solutions/internal/usecase/user_usecase.go`](./solutions/internal/usecase/user_usecase.go):

```go
// Port do USECASE định nghĩa, không phải do DB định nghĩa.
type UserRepository interface {
    Save(ctx context.Context, u *domain.User) error
    FindByID(ctx context.Context, id string) (*domain.User, error)
    FindByEmail(ctx context.Context, email string) (*domain.User, error)
}
```

Interface này nằm **cùng package với người dùng nó** (usecase), không nằm cùng package với người implement nó (memory/postgres). Đây là idiom Go: *"accept interfaces, define them where you consume them"*. Nhờ vậy usecase tự khai báo "tôi cần gì", còn adapter có nghĩa vụ đáp ứng.

> ❓ **Câu hỏi tự nhiên.**
> - *"Clean architecture và hexagonal khác nhau gì?"* — Về tinh thần gần như giống hệt (đảo phụ thuộc, cô lập lõi). Clean arch vẽ 4 vòng tròn chi tiết hơn; hexagonal nhấn vào ẩn dụ port/adapter và thường gộp entity + usecase thành "lõi". Trong thực tế, dùng lẫn lộn được.
> - *"Vì sao interface để ở package usecase mà không phải package memory?"* — Nếu để ở `memory`, thì `usecase` phải `import memory` để biết interface → mũi tên trỏ ra ngoài → vi phạm Dependency Rule. Để ở `usecase` thì `memory import usecase`, mũi tên trỏ vào trong. Đúng chiều.

> 📝 **Tóm tắt mục 3.**
> - Port = interface do lõi định nghĩa. Adapter = implementation.
> - Driven port (lõi gọi ra: repository) vs driving port (ngoài gọi vào: service).
> - Idiom Go: interface đặt ở nơi **dùng** nó, không phải nơi implement.

---

## 4. Dependency Inversion trong Go

> 💡 **Trực giác.** Bình thường "module cao cấp" (logic) phụ thuộc "module thấp cấp" (DB). Dependency Inversion *lật ngược*: cả hai cùng phụ thuộc vào một **abstraction (interface)** ở giữa. Như ổ cắm điện chuẩn: cả nhà máy điện lẫn cái quạt đều tuân theo "chuẩn ổ cắm", không ai phụ thuộc trực tiếp ai.

### 4.1 Dependency Inversion Principle (DIP)

Phát biểu (chữ "D" trong SOLID):

1. Module cấp cao **không** phụ thuộc module cấp thấp. Cả hai phụ thuộc **abstraction**.
2. Abstraction **không** phụ thuộc chi tiết. Chi tiết phụ thuộc abstraction.

Trong Go, "abstraction" = `interface`, và cơ chế tiêm = **constructor injection** (không cần framework DI):

```go
// usecase phụ thuộc INTERFACE, nhận implementation qua constructor.
func New(repo UserRepository, ids IDGenerator) *UserUsecase {
    return &UserUsecase{repo: repo, ids: ids}
}
```

`UserUsecase` không hề biết `repo` thật là RAM hay Postgres — nó chỉ biết "cái gì đó thỏa `UserRepository`".

### 4.2 Compile-time guarantee

Go cho phép khẳng định adapter khớp port ngay lúc biên dịch. Trong [`solutions/internal/adapter/memory/user_repo.go`](./solutions/internal/adapter/memory/user_repo.go):

```go
var _ usecase.UserRepository = (*UserRepo)(nil)
```

Dòng này không tạo biến (gán vào `_`), chỉ để **trình biên dịch kiểm tra**: nếu `*UserRepo` thiếu một method của `UserRepository`, code **không compile**. Đây là "test khớp interface" miễn phí, chạy ở compile time.

> ⚠ **Lỗi thường gặp.** Định nghĩa interface khổng lồ với 20 method ("fat interface"). DIP đi đôi với ISP (Interface Segregation): interface càng **nhỏ** càng dễ implement và mock. `UserRepository` chỉ có 3 method đúng những gì usecase cần — không thừa.

> 🔁 **Dừng lại tự kiểm tra.** Nếu bỏ dòng `var _ usecase.UserRepository = (*UserRepo)(nil)` đi, code còn compile không? Lợi ích của việc giữ nó là gì?
> <details><summary>Đáp án</summary>
> Vẫn compile (Go là structural typing — `*UserRepo` tự động khớp interface khi được dùng làm tham số). Nhưng nếu một ngày bạn lỡ đổi signature method trong port mà quên sửa adapter, lỗi sẽ chỉ lộ ra ở chỗ **dùng** (composition root), thông báo khó hiểu. Giữ dòng assert → lỗi báo **ngay tại adapter**, rõ ràng: "*UserRepo does not implement UserRepository (missing method X)".
> </details>

> 📝 **Tóm tắt mục 4.**
> - DIP: cao cấp + thấp cấp cùng phụ thuộc abstraction (interface).
> - Go thực hiện bằng interface + constructor injection, không cần DI container.
> - `var _ Interface = (*Impl)(nil)` = kiểm tra khớp port lúc compile.
> - Interface nhỏ (ISP) dễ implement & mock.

---

## 5. Go project layout

Bố cục thực tế của [`solutions/`](./solutions/):

```
solutions/
├── go.mod                       # module cleanarch
├── cmd/
│   └── server/
│       └── main.go              # composition root (tầng 4, wiring)
└── internal/                    # không cho package ngoài module import
    ├── domain/
    │   ├── user.go              # tầng 1: entity + business rule
    │   └── user_test.go
    ├── usecase/
    │   ├── user_usecase.go      # tầng 2: application logic + ports
    │   └── user_usecase_test.go # test bằng mock repo
    └── adapter/                 # tầng 3: interface adapters
        ├── http/
        │   ├── handler.go       # driving adapter (HTTP -> usecase)
        │   └── handler_test.go
        └── memory/
            ├── user_repo.go     # driven adapter (RAM impl của repo port)
            └── idgen.go         # driven adapter (ID generator port)
```

Quy ước (theo [Standard Go Project Layout](https://github.com/golang-standards/project-layout), nhưng vận dụng vừa phải):

- **`cmd/<name>/main.go`**: mỗi binary một thư mục. Chỉ chứa wiring, càng mỏng càng tốt.
- **`internal/`**: Go cấm package ngoài module import bất cứ gì trong `internal/`. Đây là rào chắn ngôn ngữ giúp giữ ranh giới — code ngoài không "móc" thẳng vào domain.
- **Đặt tên package theo tầng**, không theo loại: `domain`, `usecase`, `adapter/http`. Tránh `models`, `utils`, `helpers` (vô nghĩa về kiến trúc).

> ❓ **Câu hỏi tự nhiên.** *"Phải tách đúng `cmd/internal/adapter` mới là clean arch à?"* — Không. Layout chỉ là **biểu hiện vật lý** của ranh giới. Bản chất là Dependency Rule (import chỉ trỏ vào trong). Bạn có thể đặt mọi thứ trong vài package, miễn import không vi phạm. Nhưng tách thư mục giúp ranh giới **hiện rõ** và khó vô tình phá.

> 📝 **Tóm tắt mục 5.**
> - `cmd/` = binary + wiring; `internal/` = rào chắn import.
> - Đặt tên package theo **tầng kiến trúc**, không theo loại file.
> - Layout phục vụ Dependency Rule, không thay thế nó.

---

## 6. Composition Root — nơi mọi thứ gặp nhau

> 💡 **Trực giác.** Composition root là **bàn lắp ráp** ở cuối dây chuyền. Mọi linh kiện (adapter, usecase) được sản xuất rời rạc, không biết nhau. Tại bàn này, ai đó cầm từng cái lắp lại thành sản phẩm hoàn chỉnh. Đây là nơi **duy nhất** được phép biết tất cả.

Toàn bộ wiring nằm trong [`solutions/cmd/server/main.go`](./solutions/cmd/server/main.go):

```go
func main() {
    repo := memory.NewUserRepo()        // chọn adapter lưu trữ
    idgen := memory.NewSeqIDGen()       // chọn adapter sinh ID
    uc := usecase.New(repo, idgen)      // tiêm vào usecase
    handler := httpadapter.NewHandler(uc) // tiêm usecase vào HTTP adapter
    http.ListenAndServe(":8080", handler.Routes())
}
```

Vì sao quan trọng:

- **Một nơi duy nhất** biết implementation cụ thể. Muốn đổi `memory.NewUserRepo()` thành `postgres.NewUserRepo(db)` → sửa **đúng 1 dòng**. Domain + usecase + HTTP handler đứng yên.
- Composition root nằm ở tầng **ngoài cùng** (cmd) → được phép import tất cả. Không vi phạm Dependency Rule vì không có ai import ngược vào nó.

> ⚠ **Lỗi thường gặp.** Rải lời gọi `postgres.Connect()` khắp nơi (trong usecase, trong handler). Khi đó "quyết định dùng Postgres" lan ra toàn hệ thống → không còn đổi được. Quy tắc: **mọi quyết định về implementation cụ thể tập trung tại composition root.**

> 📝 **Tóm tắt mục 6.**
> - Composition root (`main`) = nơi duy nhất nối các tầng và chọn implementation.
> - Nằm ở tầng ngoài cùng, được import mọi thứ.
> - Đổi DB / framework = sửa tại đây, lõi không động.

---

## 7. Testability — test use case bằng mock

Đây là **phần thưởng cụ thể** của clean architecture: vì usecase chỉ phụ thuộc interface, ta test logic mà **không cần database, không cần network**.

Trong [`solutions/internal/usecase/user_usecase_test.go`](./solutions/internal/usecase/user_usecase_test.go), `mockRepo` implement `UserRepository` bằng map:

```go
type mockRepo struct {
    saved   map[string]*domain.User
    byEmail map[string]*domain.User
    saveErr error // ép Save trả lỗi để test nhánh lỗi hạ tầng
    findErr error // ép FindByEmail lỗi bất thường
}
// ... Save/FindByID/FindByEmail thao tác trên map
```

Test "đăng ký trùng email" chạy trong micro-giây, không dựng container:

```go
func TestRegister_DuplicateEmail(t *testing.T) {
    repo := newMockRepo()
    uc := usecase.New(repo, stubIDGen{id: "u1"})
    _, _ = uc.Register(ctx, "Alice", "a@x.com")

    _, err := uc.Register(ctx, "Bob", "a@x.com")
    if !errors.Is(err, domain.ErrEmailTaken) {
        t.Fatalf("mong đợi ErrEmailTaken, nhận: %v", err)
    }
}
```

`stubIDGen` cho ID cố định để assert dễ. `saveErr/findErr` cho phép test **nhánh lỗi hạ tầng** — điều gần như bất khả thi nếu dùng DB thật (làm sao ép Postgres lỗi giữa chừng?).

Tầng HTTP cũng test được tương tự ([`handler_test.go`](./solutions/internal/adapter/http/handler_test.go)): dùng `httptest` + một `fakeSvc` thỏa driving port, assert status code mapping (409 cho `ErrEmailTaken`, 404 cho `ErrUserNotFound`).

> ❓ **Câu hỏi tự nhiên.**
> - *"Mock với stub khác gì?"* — Thông thường: **stub** chỉ trả giá trị định sẵn (như `stubIDGen`); **mock** còn ghi lại/kiểm tra tương tác. Ở đây gọi `mockRepo` vì nó lưu state và ta assert "đã lưu chưa". Không cần thư viện mock — Go interface đủ dùng.
> - *"Vẫn cần integration test với DB thật không?"* — Có. Unit test (mock) kiểm tra **logic**; integration test kiểm tra **adapter Postgres có chạy đúng SQL không**. Clean arch giúp tách 2 loại: phần lớn test nhanh (mock), số ít test chậm (DB thật) chỉ cho adapter.

Chạy thử:

```bash
cd solutions
go test ./...        # tất cả pass, không cần DB
go test -v ./internal/usecase
```

> 📝 **Tóm tắt mục 7.**
> - Phụ thuộc interface → mock dễ → test logic không cần DB/network.
> - Mock cho phép test cả **nhánh lỗi hạ tầng** (ép `saveErr`).
> - Vẫn cần integration test cho adapter thật, nhưng số lượng ít.

---

## 8. DDD touch — một chạm nhẹ Domain-Driven Design

Clean architecture là **kiến trúc**; DDD là **cách mô hình hóa miền nghiệp vụ**. Chúng bổ trợ nhau. Vài khái niệm DDD xuất hiện ngay trong solutions:

- **Entity**: đối tượng có **danh tính (identity)** kéo dài theo thời gian. `User` có `ID` — hai User cùng tên/email nhưng khác ID là hai người khác nhau.
- **Value Object**: đối tượng định nghĩa bởi **giá trị**, bất biến (immutable). Vd có thể tách `Email` thành value object tự validate, thay vì `string`. (Bài này giữ `string` cho gọn — xem bài tập 2 mở rộng.)
- **Ubiquitous Language (ngôn ngữ chung)**: tên trong code khớp ngôn ngữ nghiệp vụ. Lỗi `ErrEmailTaken`, `ErrUserNotFound` là một phần "ngôn ngữ miền", không phải lỗi kỹ thuật `ErrSQLConstraint`.
- **Repository**: trừu tượng "kho lưu trữ entity" như thể một collection trong bộ nhớ. `UserRepository` chính là pattern này.
- **Aggregate**: cụm entity được xử lý như một đơn vị nhất quán (vd `Order` + các `OrderLine`). Bài này User đơn lẻ nên chưa cần.

> ❓ **Câu hỏi tự nhiên.** *"Phải học DDD mới làm clean arch được không?"* — Không. Clean arch chỉ yêu cầu **cô lập domain + đảo phụ thuộc**. DDD cho bạn *công cụ mô hình hóa* domain đó tốt hơn (entity, value object, aggregate, bounded context). Nắm clean arch trước, học DDD sau khi domain phức tạp lên.

> 📝 **Tóm tắt mục 8.**
> - DDD = cách mô hình miền; clean arch = cách bố trí phụ thuộc. Bổ trợ nhau.
> - Entity (có identity) vs Value Object (định nghĩa bởi giá trị).
> - Repository, Ubiquitous Language (lỗi miền), Aggregate là khái niệm DDD hữu ích.

---

## 9. Khi nào dùng / không dùng — trade-off

Clean architecture **không miễn phí**. Cái giá: nhiều file hơn, nhiều interface hơn, một lớp gián tiếp (indirection).

### 9.1 Nên dùng khi

- Hệ thống **sống lâu**, nhiều người sửa, domain có luật nghiệp vụ thật (banking, e-commerce, bảo hiểm).
- Cần **đổi/thử nhiều adapter**: nhiều DB, nhiều giao thức (REST + gRPC), nhiều nguồn dữ liệu.
- **Test là ưu tiên** — cần test logic nhanh, độc lập hạ tầng.
- Domain logic **phức tạp** hơn CRUD thuần.

### 9.2 Không nên (hoặc làm nhẹ) khi

- **Script / công cụ dùng một lần**, prototype, hackathon.
- **CRUD thuần** không có business rule (chỉ map HTTP ↔ DB) — lớp usecase chỉ chuyển tiếp, trở thành "ceremony" vô ích.
- Team nhỏ, vòng đời ngắn, yêu cầu ổn định không đổi.
- Microservice **siêu nhỏ** (một endpoint, một bảng) — over-engineering.

> ⚠ **Lỗi thường gặp (over-layering).** Áp clean arch full lên một CRUD 3 bảng → mỗi thao tác phải đi qua 4 file (handler → usecase → repo interface → repo impl) dù không có logic gì. Kết quả: code nhiều gấp 3, đọc mệt hơn, **không** dễ đổi hơn (vì vốn chẳng có gì để đổi). Hãy dùng **lượng kiến trúc tương xứng** độ phức tạp domain.

> 🔁 **Dừng lại tự kiểm tra.** Một dịch vụ "rút gọn URL" (nhận URL dài, trả URL ngắn, redirect) — nên clean arch full hay không?
> <details><summary>Đáp án</summary>
> Tùy quy mô, nhưng thường **làm nhẹ**: logic chính chỉ là "sinh mã ngắn + lưu + tra cứu", gần như CRUD. Đủ để tách *một* port `Store` (để đổi RAM ↔ Redis ↔ DB) là hợp lý, nhưng không cần tách entity/usecase/adapter thành 4 tầng đầy đủ. Tách port lưu trữ: lợi ích rõ (đổi backend). Tách thêm tầng usecase rỗng: chi phí > lợi ích.
> </details>

> 📝 **Tóm tắt mục 9.**
> - Clean arch tốn chi phí: nhiều file + indirection.
> - Dùng khi domain phức tạp, hệ thống sống lâu, cần test/đổi adapter.
> - Tránh với script / CRUD thuần / microservice siêu nhỏ.
> - Dùng **lượng kiến trúc tương xứng** — không full mọi nơi.

---

## 10. Anti-patterns — bốn cờ đỏ

| Anti-pattern | Triệu chứng | Vì sao hại | Cách sửa |
|--------------|-------------|------------|----------|
| **Anemic Domain** | Entity chỉ có field, getter/setter; mọi logic nằm trong "service" | Domain mất ý nghĩa, rule rải rác, dễ tạo entity ở trạng thái sai | Đưa invariant vào entity (`NewUser` validate, `Rename` enforce rule) |
| **Logic trong handler** | `if`/validate/SQL trộn trong HTTP handler (mục 1.1) | Không test được, không tái dùng, coupling HTTP+DB | Rút logic vào usecase, handler chỉ dịch HTTP ↔ usecase |
| **Domain import infra** | `domain` package `import "database/sql"` / `gorm` / `net/http` | Phá Dependency Rule, lõi dính chi tiết, không đổi được | Đảo phụ thuộc: domain định nghĩa interface, infra implement |
| **Over-layering** | 4 file cho một CRUD không logic (mục 9.2) | Tốn công, code phình, không lợi gì | Giảm tầng cho domain đơn giản; chỉ tách port cần thiết |

> 💡 **Trực giác về Anemic Domain.** "Anemic" = thiếu máu, yếu ớt. Một entity anemic giống một con rối — tự nó không làm gì, phải có "service" giật dây mới động. Domain "khỏe" thì tự bảo vệ tính hợp lệ của mình: không ai tạo được `User` email sai, vì `NewUser` chặn ngay.

> 📝 **Tóm tắt mục 10.**
> - 4 cờ đỏ: anemic domain, logic trong handler, domain import infra, over-layering.
> - Hai cái đầu = logic sai chỗ; cái thứ ba = phụ thuộc sai chiều; cái thứ tư = thừa kiến trúc.

---

## 11. Ứng dụng thực tế trong phần mềm

> 💡 **Clean architecture giữ logic nghiệp vụ độc lập với framework/DB — nhưng áp dụng máy móc gây over-engineering. Tinh thần quan trọng hơn cấu trúc thư mục.**

| Nguyên tắc | Lợi thực tế |
|------------|-------------|
| **Dependency hướng vào trong** | Domain không phụ thuộc DB/web → đổi Postgres→Mongo không sửa logic |
| **Interface ở ranh giới** | Domain định nghĩa `UserRepo` interface, infra hiện thực → dễ test ([nối mocking](../lesson-38-mocking-test-doubles/)) |
| **Logic nghiệp vụ thuần** | Test logic không cần DB/HTTP → nhanh, đáng tin |
| **Framework là chi tiết** | Đổi Gin→Echo, REST→gRPC không động tới core |

### 11.1. Ví dụ cụ thể — vì sao domain không import DB

```
domain/      → User, Order + interface UserRepo (KHÔNG import sql/gorm)
usecase/     → logic nghiệp vụ, dùng interface UserRepo
infra/db/    → PostgresUserRepo implements UserRepo (import gorm)
infra/http/  → handler gọi usecase
```

Mũi tên phụ thuộc hướng **vào trong** (infra → usecase → domain), không bao giờ ngược. Lợi: (1) test usecase với fake repo, không cần Postgres; (2) đổi DB chỉ sửa `infra/db`, domain/usecase không động; (3) logic nghiệp vụ không lẫn SQL/HTTP → đọc hiểu được. Đây là [dependency inversion](../lesson-39-design-patterns-go/) + [package boundary](../lesson-20-packages-modules/) áp ở quy mô kiến trúc.

> ⚠ **Đừng áp máy móc — over-engineering với CRUD đơn giản.** (1) App CRUD thuần (admin panel, blog) áp full clean architecture (4 tầng, interface khắp nơi, mapping DTO↔domain↔entity) → nhiều boilerplate hơn logic, chậm phát triển. (2) Tạo interface cho thứ chỉ có **một** hiện thực và không cần mock → trừu tượng thừa. Tinh thần thật: **giữ logic nghiệp vụ tách khỏi I/O** để test được + đổi được — không phải copy đúng 4 vòng tròn. Bắt đầu đơn giản (handler→service→repo), thêm tầng khi độ phức tạp thật sự cần. "Pragmatic, không dogmatic".

### 11.2. 📝 Tóm tắt mục 11

- Clean arch: dependency hướng **vào trong** (infra→usecase→domain), interface ở ranh giới → domain độc lập DB/framework.
- Lợi: test logic không cần hạ tầng, đổi DB/framework không sửa core.
- Đừng dogmatic: CRUD đơn giản không cần 4 tầng + interface khắp nơi; giữ tinh thần (tách logic khỏi I/O), thêm tầng khi cần.

## Bài tập

> Giải đầy đủ ở mục **Lời giải chi tiết** bên dưới. Hãy thử tự làm trước.

1. **Tách CRUD thành các tầng.** Cho hàm `CreateProduct(w, r)` kiểu "tất cả trong một" (đọc JSON, validate giá > 0, INSERT SQL, trả 201). Hãy phác họa cách tách thành domain `Product` + usecase + repo port + HTTP adapter. Chỉ rõ rule nào về tầng nào.

2. **Repository port + 2 adapter.** Định nghĩa port `ProductRepository` (Save, FindByID). Viết 2 adapter: một in-memory, một "giả Postgres" (chỉ cần struct giữ `*sql.DB` và phác signature, không cần SQL thật). Chỉ ra: đổi giữa hai adapter cần sửa ở đâu.

3. **Test usecase với mock.** Viết test cho một usecase `ChangePrice(id, newPrice)` dùng mock repo, kiểm tra: (a) giá ≤ 0 bị từ chối, (b) product không tồn tại trả `ErrProductNotFound`, (c) trường hợp thành công lưu đúng giá.

4. **Phát hiện vi phạm phụ thuộc.** Cho danh sách import của 4 package, chỉ ra package nào vi phạm Dependency Rule và sửa thế nào.

5. **Clean arch có cần cho 3 scenario?** Với mỗi scenario, quyết định "full clean arch / làm nhẹ / không cần" và giải thích: (a) script đọc CSV in ra tổng; (b) hệ thống đặt vé máy bay nhiều năm tuổi thọ; (c) microservice trả tỉ giá hối đoái từ một API ngoài.

---

## Lời giải chi tiết

### Bài 1 — Tách CRUD thành các tầng

**Cách tiếp cận:** đi từ trong ra ngoài (domain trước), phân loại từng phần của hàm gốc.

Hàm gốc gộp 4 việc: (1) parse JSON, (2) validate `price > 0`, (3) INSERT SQL, (4) trả 201.

**Tầng 1 — Domain** (`internal/domain/product.go`): entity tự bảo vệ.
```go
package domain

import "errors"

var (
    ErrInvalidPrice    = errors.New("giá phải dương")
    ErrEmptyProductName = errors.New("tên sản phẩm rỗng")
    ErrProductNotFound = errors.New("không tìm thấy sản phẩm")
)

type Product struct {
    ID    string
    Name  string
    Price int // cents
}

func NewProduct(id, name string, price int) (*Product, error) {
    if name == "" { return nil, ErrEmptyProductName }
    if price <= 0 { return nil, ErrInvalidPrice } // rule "giá > 0" thuộc domain
    return &Product{ID: id, Name: name, Price: price}, nil
}
```

**Tầng 2 — Usecase** (`internal/usecase/product_usecase.go`): định nghĩa port + orchestrate.
```go
type ProductRepository interface {
    Save(ctx context.Context, p *domain.Product) error
    FindByID(ctx context.Context, id string) (*domain.Product, error)
}
type ProductUsecase struct{ repo ProductRepository; ids IDGenerator }
func NewProductUC(r ProductRepository, ids IDGenerator) *ProductUsecase { return &ProductUsecase{r, ids} }

func (uc *ProductUsecase) Create(ctx context.Context, name string, price int) (*domain.Product, error) {
    p, err := domain.NewProduct(uc.ids.NewID(), name, price) // domain validate
    if err != nil { return nil, err }
    if err := uc.repo.Save(ctx, p); err != nil { return nil, err }
    return p, nil
}
```

**Tầng 3 — HTTP adapter**: chỉ parse JSON, gọi usecase, map lỗi → status.
```go
func (h *Handler) create(w http.ResponseWriter, r *http.Request) {
    var in struct{ Name string; Price int }
    if json.NewDecoder(r.Body).Decode(&in) != nil { writeErr(w, 400, "JSON sai"); return }
    p, err := h.svc.Create(r.Context(), in.Name, in.Price)
    if errors.Is(err, domain.ErrInvalidPrice) { writeErr(w, 400, err.Error()); return }
    if err != nil { writeErr(w, 500, "lỗi"); return }
    writeJSON(w, 201, toDTO(p))
}
```

**Phân loại rule:**
- "giá > 0", "tên không rỗng" → **domain** (bản chất của Product).
- orchestration "sinh ID rồi lưu" → **usecase**.
- "trả 201", "parse JSON", "map lỗi → 400" → **HTTP adapter**.
- "INSERT vào bảng products" → **adapter repository** (Postgres impl của port).

**Độ phức tạp:** không phải về thời gian chạy — đây là tổ chức code. Số file tăng từ 1 lên ~4, đổi lại logic test được độc lập và đổi DB không đụng logic.

### Bài 2 — Repository port + 2 adapter

**Port** (đặt ở package usecase):
```go
type ProductRepository interface {
    Save(ctx context.Context, p *domain.Product) error
    FindByID(ctx context.Context, id string) (*domain.Product, error)
}
```

**Adapter in-memory:**
```go
package memory
type ProductRepo struct{ mu sync.RWMutex; m map[string]*domain.Product }
func NewProductRepo() *ProductRepo { return &ProductRepo{m: map[string]*domain.Product{}} }
var _ usecase.ProductRepository = (*ProductRepo)(nil)
func (r *ProductRepo) Save(_ context.Context, p *domain.Product) error {
    r.mu.Lock(); defer r.mu.Unlock(); cp := *p; r.m[p.ID] = &cp; return nil
}
func (r *ProductRepo) FindByID(_ context.Context, id string) (*domain.Product, error) {
    r.mu.RLock(); defer r.mu.RUnlock()
    if p, ok := r.m[id]; ok { cp := *p; return &cp, nil }
    return nil, domain.ErrProductNotFound
}
```

**Adapter "giả Postgres"** (phác signature, không cần SQL chạy thật):
```go
package postgres
type ProductRepo struct{ db *sql.DB }
func NewProductRepo(db *sql.DB) *ProductRepo { return &ProductRepo{db: db} }
var _ usecase.ProductRepository = (*ProductRepo)(nil)
func (r *ProductRepo) Save(ctx context.Context, p *domain.Product) error {
    _, err := r.db.ExecContext(ctx,
        `INSERT INTO products(id,name,price) VALUES($1,$2,$3)
         ON CONFLICT(id) DO UPDATE SET name=$2, price=$3`, p.ID, p.Name, p.Price)
    return err
}
func (r *ProductRepo) FindByID(ctx context.Context, id string) (*domain.Product, error) {
    var p domain.Product
    err := r.db.QueryRowContext(ctx,
        `SELECT id,name,price FROM products WHERE id=$1`, id).Scan(&p.ID, &p.Name, &p.Price)
    if errors.Is(err, sql.ErrNoRows) { return nil, domain.ErrProductNotFound }
    return &p, err
}
```

**Đổi giữa hai adapter cần sửa ở đâu?** Chỉ **composition root**:
```go
// repo := memory.NewProductRepo()
repo := postgres.NewProductRepo(db) // đổi đúng dòng này
uc := usecase.NewProductUC(repo, idgen) // usecase không đổi
```
Domain, usecase, HTTP handler: **không sửa dòng nào**. Đó là minh chứng "đổi DB = 1 dòng".

### Bài 3 — Test usecase với mock

```go
type mockProductRepo struct {
    m       map[string]*domain.Product
    saveErr error
}
func (r *mockProductRepo) Save(_ context.Context, p *domain.Product) error {
    if r.saveErr != nil { return r.saveErr }
    r.m[p.ID] = p; return nil
}
func (r *mockProductRepo) FindByID(_ context.Context, id string) (*domain.Product, error) {
    if p, ok := r.m[id]; ok { return p, nil }
    return nil, domain.ErrProductNotFound
}

func TestChangePrice(t *testing.T) {
    // (c) thành công
    repo := &mockProductRepo{m: map[string]*domain.Product{
        "p1": {ID: "p1", Name: "Sách", Price: 100},
    }}
    uc := usecase.NewProductUC(repo, stubIDGen{"x"})
    if _, err := uc.ChangePrice(ctx, "p1", 200); err != nil {
        t.Fatalf("không mong lỗi: %v", err)
    }
    if repo.m["p1"].Price != 200 { t.Fatal("giá chưa cập nhật") }

    // (a) giá <= 0 bị từ chối
    if _, err := uc.ChangePrice(ctx, "p1", 0); !errors.Is(err, domain.ErrInvalidPrice) {
        t.Fatalf("mong ErrInvalidPrice, nhận %v", err)
    }
    // (b) không tồn tại
    if _, err := uc.ChangePrice(ctx, "ghost", 50); !errors.Is(err, domain.ErrProductNotFound) {
        t.Fatalf("mong ErrProductNotFound, nhận %v", err)
    }
}
```
Với usecase tương ứng:
```go
func (uc *ProductUsecase) ChangePrice(ctx context.Context, id string, newPrice int) (*domain.Product, error) {
    p, err := uc.repo.FindByID(ctx, id)
    if err != nil { return nil, err } // (b)
    if newPrice <= 0 { return nil, domain.ErrInvalidPrice } // (a)
    p.Price = newPrice
    if err := uc.repo.Save(ctx, p); err != nil { return nil, err }
    return p, nil // (c)
}
```
**Điểm mấu chốt:** cả 3 case chạy bằng map, micro-giây, không cần Postgres. So sánh với cách handler-trộn-SQL: không thể test "giá ≤ 0" mà không dựng DB.

### Bài 4 — Phát hiện vi phạm phụ thuộc

Giả sử import như sau:

| Package | Import |
|---------|--------|
| `domain` | `errors`, `time`, **`database/sql`** |
| `usecase` | `context`, `domain` |
| `adapter/postgres` | `database/sql`, `usecase`, `domain` |
| `adapter/http` | `net/http`, `encoding/json`, `usecase`, `domain` |

**Vi phạm:** `domain` import `database/sql`. Domain là tầng trong cùng — nó **không được biết** chi tiết hạ tầng. Đây là anti-pattern "domain import infra", phá Dependency Rule.

**Vì sao hại:** domain dính `database/sql` → không build/test được nếu thiếu driver; không dùng lại domain cho ngữ cảnh non-SQL; mũi tên phụ thuộc trỏ ra ngoài.

**Sửa:** gỡ `database/sql` khỏi domain. Nếu domain cần lưu thời gian, dùng `time.Time` (trung lập). Nếu có field kiểu `sql.NullString`, đổi sang kiểu Go thuần (`string` + bool, hoặc con trỏ) và để **adapter postgres** lo chuyện NULL khi map. Sau khi sửa:

| Package | Import sau sửa |
|---------|----------------|
| `domain` | `errors`, `time` — ✅ chỉ stdlib trung lập |
| `usecase` | `context`, `domain` — ✅ trỏ vào trong |
| `adapter/postgres` | `database/sql`, `usecase`, `domain` — ✅ tầng ngoài, import vào trong hợp lệ |
| `adapter/http` | `net/http`, ..., `usecase`, `domain` — ✅ hợp lệ |

Các package còn lại đều hợp lệ vì mọi import của chúng trỏ **vào trong** (adapter → usecase → domain) hoặc dùng stdlib.

### Bài 5 — Clean arch có cần cho 3 scenario?

**(a) Script đọc CSV in tổng.** → **Không cần.** Vòng đời cực ngắn, không business rule, không đổi adapter. Một hàm `main` đọc file, cộng, in. Áp clean arch = over-engineering thuần. (Nếu sau này cần đọc từ nhiều nguồn thì mới tách một interface `Reader`, nhưng đừng làm sớm.)

**(b) Hệ thống đặt vé máy bay sống nhiều năm.** → **Full clean arch.** Domain phức tạp (chỗ ngồi, giá động, hủy/hoàn, hạng vé), nhiều người sửa lâu dài, chắc chắn cần test logic độc lập và có thể đổi/ghép nhiều hạ tầng (DB, payment gateway, hệ đặt chỗ bên thứ ba). Đây là ca kinh điển hưởng lợi tối đa.

**(c) Microservice trả tỉ giá từ API ngoài.** → **Làm nhẹ.** Logic mỏng (gọi API, cache, trả về). Nhưng *nên tách một port* cho nguồn tỉ giá (`RateProvider`) để: (1) test bằng mock không gọi mạng thật, (2) đổi nhà cung cấp tỉ giá / thêm cache không đụng handler. Không cần tầng usecase đầy đủ + entity phong phú; một port + adapter là đủ. Đây là "vừa đủ kiến trúc".

**Nguyên tắc rút ra:** lượng kiến trúc tỉ lệ thuận với (độ phức tạp domain) × (vòng đời) × (nhu cầu đổi hạ tầng). Thấp cả ba → không cần; cao cả ba → full; ở giữa → tách đúng những port mang lại lợi ích test/đổi.

---

## Code & Minh họa

- **Project mẫu**: [`solutions/`](./solutions/) — chạy `cd solutions && go build ./... && go test ./...`. Khởi động server demo: `go run ./cmd/server` rồi thử `curl -X POST localhost:8080/users -d '{"name":"Alice","email":"a@x.com"}'`.
- **Visualization tương tác**: [visualization.html](./visualization.html) — 3 module: (1) vòng tròn đồng tâm Dependency Rule + chiều mũi tên; (2) tráo adapter Postgres ↔ InMemory thấy lõi không đổi; (3) request flow handler → usecase → repository → response.

## Bài tiếp theo

- ← Trước: [Lesson 78 — Config Management](../lesson-78-config-management/)
- → Tiếp: [Lesson 80 — Code Review & Style](../lesson-80-code-review-style/)

### Tham khảo

- Robert C. Martin — *Clean Architecture* (2017).
- Alistair Cockburn — *Hexagonal Architecture (Ports and Adapters)*.
- Eric Evans — *Domain-Driven Design* (2003).
- [Standard Go Project Layout](https://github.com/golang-standards/project-layout).
