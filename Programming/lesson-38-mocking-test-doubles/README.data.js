// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: Programming/lesson-38-mocking-test-doubles/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 38 — Mocking & Test Doubles

> "Test mà gọi DB thật là **integration test**, không phải unit test. Muốn unit test nhanh và xác định, ta phải **thay** dependency bằng đồ giả — đó là chuyện của test doubles."

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Phân biệt **5 loại test double** (Dummy / Stub / Spy / Mock / Fake) theo phân loại của Gerard Meszaros và biết khi nào dùng loại nào.
- Biết cách thiết kế code "testable" trong Go bằng **interface + dependency injection**.
- Viết được **hand-written mock** trong vài dòng cho interface nhỏ, và biết khi nào nên chuyển sang **mock generator** (\`mockgen\`, \`mockery\`) hoặc \`testify/mock\`.
- Mock được những thứ thường gây khó cho test: **thời gian** (\`time.Now\`), **random**, **HTTP**, **DB**.
- Hiểu **anti-pattern**: test = restate impl, mock leak, mock-mọi-thứ, để rút ra nguyên tắc "**mock at the edges, real at the core**".
- Đặt mock vào đúng vị trí trong **test pyramid** (unit / integration / e2e).

## Kiến thức tiền đề

- [Lesson 18 — Interfaces](../lesson-18-interfaces/README.md): interface, satisfaction implicit.
- [Lesson 20 — Packages & Modules](../lesson-20-packages-modules/README.md): tổ chức code, import path.
- [Lesson 26 — Testing](../lesson-26-testing-basics/README.md): table-driven, \`t.Run\`, coverage.
- [Lesson 37 — Advanced Testing](../lesson-37-advanced-testing/README.md): fuzz, golden file, race detector.

---

## 1. Vấn đề: vì sao unit test "thật" lại khó

> 💡 **Trực giác.** Hãy tưởng tượng bạn đang test một hàm gửi email khi user đăng ký. Mỗi lần \`go test\` chạy, bạn có muốn:
> - Thực sự gửi mail tới hộp thư thật?
> - Gọi DB Postgres trên server công ty?
> - Đợi 3 giây vì có \`time.Sleep\` để retry?
> - Có internet để gọi API thanh toán?
>
> Đương nhiên là **không**. Test phải: nhanh (mili-giây), xác định (chạy 1000 lần → 1000 lần giống nhau), độc lập (không cần dịch vụ bên ngoài), không có side effect (không gửi mail thật, không ghi DB thật).

Một hàm \`NotifyUser\` đơn giản nhưng "khó test":

\`\`\`go
func NotifyUser(userID int) error {
    user, err := db.Query("SELECT ... FROM users WHERE id=?", userID) // (1) cần DB
    if err != nil { return err }
    body := fmt.Sprintf("Hello %s, today is %s", user.Name, time.Now().Format("2006-01-02")) // (2) phụ thuộc thời gian thực
    return smtp.SendMail("smtp.gmail.com:587", auth, "noreply@x.com",
        []string{user.Email}, []byte(body)) // (3) cần internet, gửi mail thật
}
\`\`\`

Ba vấn đề:

1. **External dependency** (DB, SMTP, HTTP API): chậm, có thể flaky (mạng), tốn tài nguyên, có thể tốn tiền (cloud).
2. **Non-deterministic** (\`time.Now()\`, \`rand\`, UUID): mỗi lần chạy giá trị khác nhau → test không lặp lại được.
3. **Side effect không reversible**: gửi mail thật cho user, ghi production DB, trừ tiền credit card test.

Giải pháp chung: **thay** (substitute) những phần này bằng **test double** — object giả vờ là dependency thật trong môi trường test.

> ❓ **Câu hỏi tự nhiên.** "Vậy nếu mock hết thì test còn nghĩa gì? Code thật chạy với dependency thật cơ mà." — Đúng, nên ta vẫn cần **integration test** chạy với DB/HTTP thật, nhưng số lượng **ít hơn nhiều** so với unit test (xem mục Test Pyramid). Unit test với mock cho phép chạy hàng nghìn case trong < 1 giây mỗi khi save file.

> 📝 **Tóm tắt mục 1.**
> - Test "thật" thường: chậm, flaky, có side effect, không xác định.
> - Test double = thay dependency bằng đồ giả trong test → nhanh, deterministic, isolated.
> - Vẫn cần integration test thật, nhưng ít hơn.

---

## 2. Bảng phân loại test double (Gerard Meszaros, 2007)

> 💡 **Trực giác.** Cả 5 loại đều thay thế dependency thật, nhưng "mức độ thông minh" tăng dần: Dummy (không làm gì) → Stub (trả lời) → Spy (trả lời + ghi nhật ký) → Mock (kiểm tra hành vi) → Fake (giả lập hệ thống thật rút gọn).

| Loại | Vai trò | Có trả về giá trị? | Có ghi nhận call? | Có verify trong test? | Ví dụ điển hình |
|------|---------|:---:|:---:|:---:|---|
| **Dummy** | Lấp chỗ trống | ✗ | ✗ | ✗ | \`nil\` Logger truyền vào constructor |
| **Stub** | Trả giá trị cố định | ✓ | ✗ | ✗ | \`GetUser → return &User{ID: 1}\` |
| **Spy** | Như stub + đếm call | ✓ | ✓ | △ (kiểm tra ngoài stub) | \`MockEmail.SendCount == 1\` |
| **Mock** | Có expectation cứng | ✓ | ✓ | ✓ (fail nếu sai) | \`mock.EXPECT().Send("a@b").Return(nil)\` |
| **Fake** | Implementation rút gọn | ✓ (logic thật) | △ | △ | In-memory user store |

### 2.1 Dummy — chỉ để compile

\`\`\`go
type Logger interface { Info(string) }
type NoopLogger struct{}
func (NoopLogger) Info(string) {}

// Test gọi:
svc := NewService(realDB, NoopLogger{}) // logger không quan trọng trong test này
\`\`\`

> Đặc điểm: bạn truyền nó vì chữ ký hàm yêu cầu, nhưng code path trong test không gọi đến nó (hoặc gọi mà ta không quan tâm).

### 2.2 Stub — "trả lời có sẵn"

\`\`\`go
type StubUserStore struct{}
func (StubUserStore) Get(id int) (*User, error) {
    return &User{ID: id, Name: "alice"}, nil
}
\`\`\`

> Đặc điểm: hardcoded return. Không bận tâm ai gọi, gọi bao nhiêu lần. Dùng khi bạn chỉ cần "fake data đi xuôi" để test happy path.

### 2.3 Spy — stub + ghi nhật ký

\`\`\`go
type SpyEmailSender struct {
    SendCount int
    LastTo    string
}
func (s *SpyEmailSender) Send(to, body string) error {
    s.SendCount++
    s.LastTo = to
    return nil
}

// Test:
spy := &SpyEmailSender{}
service.NotifyUser(spy, 42)
if spy.SendCount != 1 { t.Errorf("want 1 call, got %d", spy.SendCount) }
if spy.LastTo != "alice@x.com" { ... }
\`\`\`

> Đặc điểm: bạn assert "đã gọi" và "gọi với gì" **sau** khi action chạy xong. Spy = stub thụ động + biến đếm.

### 2.4 Mock — kỳ vọng được lập trình sẵn

\`\`\`go
// Pseudo-code dùng testify/mock:
mock := new(MockEmailSender)
mock.On("Send", "alice@x.com", mock.Anything).Return(nil).Once()
service.NotifyUser(mock, 42)
mock.AssertExpectations(t) // fail nếu không gọi đúng "alice@x.com" 1 lần
\`\`\`

> Đặc điểm: bạn **khai báo trước** test gì sẽ xảy ra, framework verify hộ. Khác Spy ở chỗ: nếu code không gọi đúng kỳ vọng → test fail tự động, không cần \`if\` thủ công.

### 2.5 Fake — "hệ thống thật rút gọn"

\`\`\`go
type InMemoryUserStore struct {
    users map[int]*User
}
func (s *InMemoryUserStore) Get(id int) (*User, error) {
    u, ok := s.users[id]
    if !ok { return nil, ErrNotFound }
    return u, nil
}
func (s *InMemoryUserStore) Save(u *User) error {
    s.users[u.ID] = u
    return nil
}
\`\`\`

> Đặc điểm: là **implementation thật** (đầy đủ Get / Save / xoá / list), chỉ không dùng được trong production vì in-memory, không persistent. Trong test bạn chạy logic thật, không cần dạy nó "trả gì".

### 2.6 Khi nào dùng cái nào?

- Bạn chỉ cần signature → **Dummy**.
- Bạn cần dependency trả 1 value cố định → **Stub**.
- Bạn cần verify "đã gọi", "gọi mấy lần", "gọi với param gì" → **Spy** (nhẹ, hand-written).
- Bạn cần verify chuỗi tương tác nghiêm ngặt giữa nhiều method, hoặc interface lớn → **Mock** (generated, testify/mock).
- Bạn cần "DB giả" để test logic dài (CRUD nhiều bước) → **Fake**.

> ❓ **"Spy và Mock khác nhau thật sự ở đâu?"** Trên thực tế ranh giới mờ — \`testify/mock\` gọi nó là "mock" nhưng cách bạn dùng tùy biến giữa "spy-style" (set sẵn rồi assert sau) và "mock-style" (\`AssertExpectations\`). Phân loại Meszaros mang tính khái niệm. Trong Go, hand-written mock thường là **Spy**, generated mock thường là **Mock** strict.

> ⚠ **Lỗi thường gặp.** Gọi mọi test double là "mock" rồi loạn khái niệm. "Mock everything" là anti-pattern (xem mục 14), nhưng "Stub everything" thường ổn — Stub không assert, chỉ cấp data.

> 🔁 **Dừng lại tự kiểm tra.**
>
> 1. Bạn test một hàm \`CalculateTax(price float64, taxRate TaxRateProvider) float64\`. \`taxRate.GetRate()\` luôn trả 0.1. Bạn dùng loại double nào cho \`taxRate\`?
>    <details><summary>Đáp án</summary>
>    Stub. Bạn chỉ cần nó trả \`0.1\` cố định, không cần verify có gọi hay không (vì verify behavior thật là \`CalculateTax(100, ...) == 110\`).
>    </details>
> 2. Bạn test \`SendNotifications\` — nó gọi \`emailSender.Send\` cho mỗi user trong list. Cần verify gọi đúng số lần (= số user). Loại nào?
>    <details><summary>Đáp án</summary>
>    Spy (hand-written) hoặc Mock (generated/testify). Phải đếm calls.
>    </details>
> 3. Bạn test logic CRUD: tạo user → load lại → cập nhật → xóa → load lại → not found. Loại nào?
>    <details><summary>Đáp án</summary>
>    Fake (in-memory store). Stub không đủ vì state phải thay đổi giữa các call.
>    </details>

> 📝 **Tóm tắt mục 2.**
> - 5 loại theo cấp độ "thông minh" tăng dần: Dummy → Stub → Spy → Mock → Fake.
> - Stub = trả lời cố định. Spy = stub + đếm. Mock = stub + expectation strict. Fake = implementation đơn giản hóa.
> - Chọn theo nhu cầu: chỉ cần signature → Dummy; chỉ cần value → Stub; cần verify call → Spy/Mock; cần state qua nhiều bước → Fake.

---

## 3. Làm code "testable": interface + dependency injection

> 💡 **Trực giác.** Để **thay** được dependency, code phải **không hardcoded** dependency cụ thể bên trong. Thay vì \`db := postgres.Connect(...)\` nằm giữa hàm, phải **nhận dependency từ ngoài vào** (qua interface).

### 3.1 Sai: tight coupling, không test được

\`\`\`go
package service

import "myapp/postgres"

func NotifyUser(userID int) error {
    db := postgres.Connect("...")        // ✗ hardcoded
    user, err := db.GetUser(userID)
    if err != nil { return err }
    return smtp.Send(user.Email, "hi")   // ✗ hardcoded SMTP
}
\`\`\`

Test phải có Postgres + SMTP thật chạy → unit test bất khả.

### 3.2 Đúng: interface + DI qua constructor

\`\`\`go
// Định nghĩa interface ở phía CONSUMER (xem mục 3.4 — Go idiom)
type UserStore interface {
    Get(id int) (*User, error)
}
type EmailSender interface {
    Send(to, body string) error
}

type Service struct {
    store UserStore
    email EmailSender
}

// Constructor nhận dependency:
func NewService(store UserStore, email EmailSender) *Service {
    return &Service{store: store, email: email}
}

func (s *Service) NotifyUser(userID int) error {
    user, err := s.store.Get(userID)
    if err != nil { return err }
    return s.email.Send(user.Email, "hi")
}
\`\`\`

Wiring production:

\`\`\`go
svc := NewService(
    postgres.NewUserStore(dbConn),
    smtp.NewSender("smtp.gmail.com:587", auth),
)
\`\`\`

Wiring test:

\`\`\`go
svc := NewService(
    &MockUserStore{GetFunc: func(id int) (*User, error) { return &User{...}, nil }},
    &SpyEmailSender{},
)
\`\`\`

### 3.3 Vì sao **interface** chứ không phải struct?

Go duck-typing: nếu bạn nhận struct cụ thể (\`*postgres.UserStore\`), test không thể thay bằng mock. Chỉ interface mới cho phép "swap implementation" giữa production và test.

### 3.4 Idiom Go: "**accept interface, return struct**"

\`\`\`go
// ✓ TỐT — package service định nghĩa interface NÓ CẦN
package service
type UserStore interface { Get(id int) (*User, error) }

// ✗ XẤU — package postgres định nghĩa interface "tất-cả-method-tao-có"
package postgres
type UserStore interface { Get(int)(*User,error); Save(*User)error; Delete(int)error; List(int,int)([]*User,error); ... }
\`\`\`

Quy tắc: **interface phía consumer**, **implementation phía provider**. Consumer chỉ khai báo method nó **cần** (thường 1-2 method), không phải toàn bộ method provider cung cấp. → Interface nhỏ → mock dễ viết.

> ❓ **"Vậy tôi phải định nghĩa interface ở mỗi consumer? Lặp lại?"** Có, hơi lặp, nhưng đổi lại: mỗi consumer chỉ phụ thuộc method nó dùng (Interface Segregation Principle). Interface nhỏ = dễ mock, dễ refactor.

> ⚠ **Lỗi thường gặp.** Đặt \`interface\` cùng package với implementation production → consumer phải import package production → mục đích "decouple" mất.

> 📝 **Tóm tắt mục 3.**
> - Code testable = nhận dependency từ ngoài qua interface.
> - DI thường qua **constructor injection** (\`NewX(dep1, dep2)\`).
> - Interface khai báo ở **phía consumer**, không phải provider — giữ nhỏ và tập trung.

---

## 4. Hand-written mock — viết tay, đơn giản nhất

Cho interface nhỏ (≤ 3 method), viết mock bằng tay 10 dòng thường nhanh hơn là chạy generator.

### 4.1 Pattern "function field"

\`\`\`go
type MockUserStore struct {
    GetFunc  func(id int) (*User, error)
    SaveFunc func(u *User) error

    // Spy fields:
    GetCalls  int
    SaveCalls int
    LastSaved *User
}

func (m *MockUserStore) Get(id int) (*User, error) {
    m.GetCalls++
    if m.GetFunc != nil { return m.GetFunc(id) }
    return nil, nil
}
func (m *MockUserStore) Save(u *User) error {
    m.SaveCalls++
    m.LastSaved = u
    if m.SaveFunc != nil { return m.SaveFunc(u) }
    return nil
}
\`\`\`

Test sử dụng:

\`\`\`go
mock := &MockUserStore{
    GetFunc: func(id int) (*User, error) {
        if id == 42 { return &User{ID: 42, Name: "alice"}, nil }
        return nil, ErrNotFound
    },
}
svc := NewService(mock, ...)

err := svc.DoSomething(42)
if err != nil { t.Fatal(err) }
if mock.GetCalls != 1 { t.Errorf("want 1 Get call, got %d", mock.GetCalls) }
\`\`\`

### 4.2 Vì sao "function field" thay vì hardcoded return?

- **Linh hoạt giữa các test**: mỗi \`TestXxx\` set \`GetFunc\` khác → cùng một \`MockUserStore\` phục vụ nhiều case.
- **Có thể inspect input**: trong closure bạn so sánh \`id\`, return error nếu input sai.
- **Default nil-safe**: nếu test không quan tâm method nào đó, để \`GetFunc = nil\`, mock vẫn không panic.

### 4.3 Walk-through cụ thể

Test "không gọi \`Save\` nếu \`Get\` fail":

\`\`\`go
mock := &MockUserStore{
    GetFunc: func(int) (*User, error) { return nil, errors.New("db down") },
}
svc := NewService(mock, ...)

_ = svc.UpdateUserName(42, "bob")

if mock.SaveCalls != 0 {
    t.Errorf("Save không nên được gọi khi Get fail, got %d calls", mock.SaveCalls)
}
\`\`\`

> ❓ **"Khi nào hand-written không đủ?"**
> - Interface > 4-5 method → viết tay mỏi.
> - Cần verify thứ tự gọi giữa nhiều method (call \`A\` trước \`B\`) → testify/gomock có sẵn.
> - Muốn refactor interface, generated mock auto-update → đỡ lỗi lệch signature.

> 📝 **Tóm tắt mục 4.**
> - Hand-written mock = struct với field \`func\` cho mỗi method + biến đếm.
> - Set \`Func\` trong test cho mỗi scenario, default \`nil\` thì method trả zero value.
> - Phù hợp interface nhỏ. Interface to → dùng generator.

---

## 5. Generated mock với \`mockgen\` (gomock)

Khi interface to (≥ 4 method) hoặc dự án nhiều test, tự gen tiết kiệm thời gian.

### 5.1 Cài đặt

\`\`\`bash
go install go.uber.org/mock/mockgen@latest
# (bản uber-go là bản fork active sau khi google/mock không còn maintain)
\`\`\`

### 5.2 Generate

\`\`\`bash
# Source mode: đọc trực tiếp source file:
mockgen -source=internal/user/user.go -destination=internal/user/mocks/user_mock.go -package=mocks

# Reflect mode: chỉ định interface theo import path:
mockgen -destination=mocks/user_mock.go -package=mocks myapp/internal/user UserStore,EmailSender
\`\`\`

Sinh ra file \`user_mock.go\` với \`MockUserStore\` struct và helper API.

### 5.3 Sử dụng trong test

\`\`\`go
import (
    "testing"
    "go.uber.org/mock/gomock"
    "myapp/internal/user/mocks"
)

func TestNotifyUser(t *testing.T) {
    ctrl := gomock.NewController(t)
    defer ctrl.Finish()

    mockStore := mocks.NewMockUserStore(ctrl)
    mockStore.EXPECT().
        Get(42).
        Return(&user.User{ID: 42, Email: "a@b.com"}, nil).
        Times(1)

    svc := service.New(mockStore, ...)
    if err := svc.NotifyUser(42); err != nil {
        t.Fatal(err)
    }
    // ctrl.Finish() (qua defer) verify Times(1) đúng.
}
\`\`\`

API thông dụng:

- \`EXPECT().Method(args).Return(values)\` — khai báo kỳ vọng.
- \`.Times(n)\`, \`.MaxTimes(n)\`, \`.AnyTimes()\` — số lần gọi.
- \`.DoAndReturn(func)\` — chạy hàm custom (như function-field).
- \`.InOrder(...)\` — verify thứ tự.
- \`gomock.Any()\`, \`gomock.Eq(x)\` — matcher cho argument.

### 5.4 \`go:generate\` directive

Đặt comment trong source file:

\`\`\`go
//go:generate mockgen -source=$GOFILE -destination=mocks/\${GOFILE}_mock.go -package=mocks
type UserStore interface {
    Get(id int) (*User, error)
    Save(u *User) error
}
\`\`\`

Chạy \`go generate ./...\` ở root, mockgen re-generate toàn dự án.

> ⚠ **Lỗi thường gặp.** Quên gọi \`ctrl.Finish()\` (hoặc trong gomock mới dùng \`gomock.NewController(t)\` tự gọi qua \`t.Cleanup\` — version cũ thì không) → \`Times()\` không được verify, test "fake pass". Luôn \`defer ctrl.Finish()\` (hoặc upgrade gomock).

> 📝 **Tóm tắt mục 5.**
> - \`mockgen\` tự sinh mock từ interface — không phải viết tay.
> - \`.EXPECT().Method(args).Return(values).Times(n)\` là API chính.
> - Dùng \`go:generate\` để auto-regenerate khi interface đổi.

---

## 6. \`testify/mock\` — alternative phổ biến

Nếu không muốn cài tool ngoài, \`testify/mock\` là Go-only, dùng được ngay sau \`go get\`.

### 6.1 Cách dùng

\`\`\`go
import "github.com/stretchr/testify/mock"

type MockUserStore struct {
    mock.Mock
}
func (m *MockUserStore) Get(id int) (*User, error) {
    args := m.Called(id)
    var u *User
    if args.Get(0) != nil { u = args.Get(0).(*User) }
    return u, args.Error(1)
}
func (m *MockUserStore) Save(u *User) error {
    return m.Called(u).Error(0)
}
\`\`\`

Trong test:

\`\`\`go
m := new(MockUserStore)
m.On("Get", 42).Return(&User{ID: 42}, nil).Once()
m.On("Save", mock.AnythingOfType("*main.User")).Return(nil)

svc := NewService(m)
_ = svc.DoSomething(42)

m.AssertExpectations(t)         // verify mọi On() đã được gọi đúng
m.AssertCalled(t, "Get", 42)
m.AssertNumberOfCalls(t, "Get", 1)
\`\`\`

### 6.2 Khác \`mockgen\` chỗ nào?

| | \`mockgen\` (gomock) | \`testify/mock\` |
|---|---|---|
| Cách định nghĩa | Tự gen từ interface | Viết tay (\`m.Called(...)\`) |
| Type-safe arg matcher | ✓ (compile-time) | △ (runtime cast) |
| Phổ biến | Rất phổ biến (Uber/Google) | Rất phổ biến (testify ecosystem) |
| Verbose | Trung bình | Hơi verbose ở method body |

Chọn tùy team. Mới bắt đầu mà repo chưa có quy ước → \`testify/mock\` đơn giản hơn (không cài tool); team lớn / nhiều dev → \`mockgen\` đỡ lỗi cast.

> 📝 **Tóm tắt mục 6.**
> - \`testify/mock\`: nhúng \`mock.Mock\` vào struct, mỗi method gọi \`m.Called(args)\`.
> - Test gọi \`m.On(method, args).Return(values)\` rồi \`m.AssertExpectations(t)\`.
> - Không cần tool ngoài, nhưng method body verbose hơn gomock.

---

## 7. Fake — implementation thật, đơn giản

Fake không phải "trả lời cố định" mà **thực sự chạy logic** — chỉ là logic đơn giản hơn production.

### 7.1 In-memory store cho test CRUD

\`\`\`go
type InMemoryUserStore struct {
    mu    sync.RWMutex
    users map[int]*User
    nextID int
}

func NewInMemoryUserStore() *InMemoryUserStore {
    return &InMemoryUserStore{users: map[int]*User{}}
}
func (s *InMemoryUserStore) Get(id int) (*User, error) {
    s.mu.RLock(); defer s.mu.RUnlock()
    u, ok := s.users[id]
    if !ok { return nil, ErrNotFound }
    cp := *u // copy để tránh mutate ngoài
    return &cp, nil
}
func (s *InMemoryUserStore) Save(u *User) error {
    s.mu.Lock(); defer s.mu.Unlock()
    if u.ID == 0 { s.nextID++; u.ID = s.nextID }
    cp := *u
    s.users[u.ID] = &cp
    return nil
}
\`\`\`

Test:

\`\`\`go
store := NewInMemoryUserStore()
svc := NewUserService(store)

id, _ := svc.CreateUser("alice", "alice@x.com")
u, _ := svc.GetUser(id)
if u.Name != "alice" { t.Fail() }
\`\`\`

> Bạn không cần "dạy" \`store\` trả gì — nó **đang chạy logic thật**.

### 7.2 Khi nào ưu tiên fake hơn mock?

- Logic dài, nhiều bước (CRUD, workflow).
- Mỗi bước phụ thuộc state bước trước.
- Mock-everything sẽ phải khai báo cả chục \`.On()\` → test fragile.

### 7.3 Lưu ý

- Fake **phải behave giống** production interface (đặc biệt ở edge case: not found, conflict, ordering). Viết test **chung** chạy trên cả fake và real → đảm bảo tương thích (contract test).
- Một số lib có sẵn fake: \`sqlmock\` (DB), \`httptest\` (HTTP — học ở L37).
- Đừng dùng fake làm production stub — chỉ vì in-memory **nhanh**, đừng "promote" lên prod.

> 📝 **Tóm tắt mục 7.**
> - Fake = implementation rút gọn (thường in-memory), chạy logic thật.
> - Phù hợp test CRUD nhiều bước, state-heavy.
> - Verify fake tương thích contract của interface — không drift khỏi production.

---

## 8. Mock HTTP

Có 2 hướng tiếp cận:

### 8.1 Inject \`http.Client\`

\`\`\`go
type APIClient struct { http *http.Client }
func (c *APIClient) GetUser(id int) (*User, error) {
    resp, err := c.http.Get(fmt.Sprintf("https://api.x.com/users/%d", id))
    // ...
}
\`\`\`

Test dùng \`httptest.NewServer\` (xem L37) — server fake trả response trên port local, sửa base URL cho client point đến fake server.

### 8.2 Library \`httpmock\`

\`\`\`go
import "github.com/jarcoal/httpmock"

func TestX(t *testing.T) {
    httpmock.Activate()
    defer httpmock.DeactivateAndReset()

    httpmock.RegisterResponder("GET", "https://api.x.com/users/42",
        httpmock.NewStringResponder(200, \`{"id":42,"name":"alice"}\`))

    client := NewAPIClient(http.DefaultClient)
    u, _ := client.GetUser(42)
    if u.Name != "alice" { t.Fail() }
}
\`\`\`

\`httpmock\` intercept ở \`http.DefaultClient.Transport\` — không cần đổi URL.

> ⚠ Khi dùng \`httptest.NewServer\` tốn 1 port mỗi test (cleanup qua \`defer server.Close()\`). \`httpmock\` rẻ hơn nhưng "magic" hơn — debug khó hơn nếu response không khớp.

---

## 9. Mock \`time.Now()\` — non-determinism phổ biến nhất

Time là enemy number 1 của test deterministic. Cách xử lý: **inject \`now func()\`**.

### 9.1 Package-level var

\`\`\`go
package billing

import "time"

// Now là biến chứa hàm trả thời gian hiện tại.
// Production dùng time.Now; test override để cố định.
var Now = time.Now

func IsExpired(deadline time.Time) bool {
    return Now().After(deadline)
}
\`\`\`

Test:

\`\`\`go
func TestIsExpired(t *testing.T) {
    fixed := time.Date(2025, 1, 1, 0, 0, 0, 0, time.UTC)
    old := billing.Now
    billing.Now = func() time.Time { return fixed }
    defer func() { billing.Now = old }() // restore!

    deadline := time.Date(2024, 12, 31, 0, 0, 0, 0, time.UTC)
    if !billing.IsExpired(deadline) { t.Fail() }
}
\`\`\`

> ⚠ Nhược điểm: biến global → test parallel dùng cùng package sẽ race. Trong code production thường ổn vì gán 1 lần lúc init.

### 9.2 Field trong struct (an toàn parallel)

\`\`\`go
type Service struct {
    now func() time.Time
}
func NewService() *Service {
    return &Service{now: time.Now}
}
func (s *Service) IsExpired(d time.Time) bool { return s.now().After(d) }

// Test:
svc := &Service{now: func() time.Time { return fixed }}
\`\`\`

Mỗi instance có \`now\` riêng → test parallel an toàn.

### 9.3 Lib \`clockwork\`, \`jonboulle/clockwork\`

Cung cấp \`Clock\` interface với 2 impl: \`RealClock\` (production) và \`FakeClock\` (test, advance thời gian thủ công).

\`\`\`go
clock := clockwork.NewFakeClock()
svc := NewService(clock)
go func() { <-time.After(5 * time.Second); done <- true }()
clock.Advance(5 * time.Second) // tăng giờ giả lập
<-done
\`\`\`

Hữu ích khi test có \`time.Sleep\`, \`time.After\`, \`time.Tick\`.

> 📝 **Tóm tắt mục 9.**
> - Inject \`now func() time.Time\` qua package var hoặc struct field.
> - Test set fake, **nhớ restore** (defer).
> - Có \`time.Sleep\` / \`time.Tick\` → dùng \`clockwork.FakeClock\`.

---

## 10. Mock random

\`\`\`go
type Service struct {
    rng *rand.Rand
}
func NewService(seed int64) *Service {
    return &Service{rng: rand.New(rand.NewSource(seed))}
}
\`\`\`

Production: \`NewService(time.Now().UnixNano())\`.
Test: \`NewService(42)\` → cùng seed luôn cho cùng chuỗi số.

Hoặc inject \`Float64Func func() float64\` để test đặt giá trị cứng.

---

## 11. Patterns DI

### 11.1 Constructor injection (mặc định)

\`\`\`go
func NewService(s UserStore, e EmailSender) *Service { ... }
\`\`\`

Ưu: dependency rõ ràng trong signature, tất cả set lúc tạo, ít state mutation.

### 11.2 Setter / option injection

\`\`\`go
type Service struct{ store UserStore; logger Logger }
func New() *Service { return &Service{logger: NoopLogger{}} }
func (s *Service) SetStore(st UserStore) { s.store = st }
\`\`\`

Phù hợp khi nhiều optional dep. Thường thay bằng **functional options** (L39):

\`\`\`go
svc := NewService(store, WithLogger(myLogger), WithTimeout(5*time.Second))
\`\`\`

### 11.3 Field injection (struct field public)

\`\`\`go
type Service struct {
    Store UserStore
    Email EmailSender
}
svc := &Service{Store: mock, Email: spy}
\`\`\`

Đơn giản nhất cho test (không cần constructor) nhưng production wiring kém an toàn (quên gán field → nil).

> 💡 **Khi nào dùng cái nào?** Mặc định **constructor injection** cho mọi service. Field injection chỉ cho struct value-only (config, request). Functional options cho service nhiều dep optional.

---

## 12. Khi nào MOCK, khi nào KHÔNG

| Mock ✓ | Không mock (test thật) ✓ |
|---|---|
| External service (HTTP API bên thứ 3) | Pure function (\`strings.Split\`, \`Add(a,b)\`) |
| DB chậm hoặc nhạy cảm dữ liệu | Algorithm / data structure trong cùng module |
| Non-deterministic (\`time.Now\`, random, UUID) | Business logic core của service đang test |
| Side effect không reversible (send email, charge card) | Stdlib (\`encoding/json\`, \`regexp\` — mock cũng vô nghĩa) |
| Dependency chưa được implement (parallel dev) | Helper internal đã có test riêng |

Câu thần chú: "**Mock at the edges, real at the core.**" — chỉ thay những gì giáp ranh **bên ngoài** process (network, disk, time), giữ logic **bên trong** chạy thật.

---

## 13. Anti-pattern

### 13.1 Mock everything → test restate impl

\`\`\`go
// SAI:
func TestCalculateTotal(t *testing.T) {
    m := new(MockMath)
    m.On("Add", 1, 2).Return(3)
    m.On("Multiply", 3, 4).Return(12)
    res := CalculateTotal(1, 2, 4) // hàm tự tính
    // ... + 10 dòng assert mocks
}
\`\`\`

\`Add\`, \`Multiply\` là phép tính thuần — chẳng có lý do mock. Test này không verify gì có ý nghĩa, chỉ "khẳng định impl gọi đúng các operator", lệch ý nghĩa "test".

### 13.2 Test mock interaction nhiều hơn behavior

\`\`\`go
// SAI:
m.AssertCalled(t, "Get", 1)
m.AssertCalled(t, "Get", 2)
m.AssertCalled(t, "Get", 3)
// → test fail nếu impl đổi từ "Get tuần tự" sang "GetBatch([1,2,3])"
//   dù output cuối giống hệt. Test "fragile to impl".
\`\`\`

Đúng: test **output** của function (return value, side effect quan trọng), không phải "đã gọi DB theo thứ tự nào".

### 13.3 Quên \`AssertExpectations\`

\`\`\`go
m.On("Send", "a@b.com").Return(nil)
svc.Notify()                  // forgot to assert
// → test pass kể cả khi Notify không gọi Send.
\`\`\`

Luôn \`defer m.AssertExpectations(t)\` (testify) hoặc \`defer ctrl.Finish()\` (gomock).

### 13.4 Mock signature đổi → tất cả test break

Smell: mock quá deep, interface phụ thuộc detail impl. Refactor: thu hẹp interface về method consumer cần (Interface Segregation).

### 13.5 Mock stdlib

\`\`\`go
// Không mock encoding/json. Test bằng input/output thật.
\`\`\`

Stdlib đã được test bởi tác giả Go. Mock chỉ thêm phức tạp.

---

## 14. Test pyramid — đặt mock vào đúng tầng

\`\`\`
        e2e (vài chục, chậm, real env)
      /                                 \\
    integration (vài trăm, real DB/HTTP)
   /                                       \\
  unit + mock (hàng nghìn, mili-giây)
\`\`\`

- **Unit (mock)**: 80-90% test suite. Tốc độ mili-giây. Phủ mọi branch.
- **Integration**: 10-15%. Verify thực sự gọi DB / HTTP đúng (testcontainer, real Postgres trong Docker).
- **e2e**: 1-5%. Khởi cả hệ thống, kịch bản user-facing.

Pyramid lý do: feedback loop. Save file → unit chạy 1 giây → biết liền. Integration / e2e đẩy về CI.

---

## Bài tập

### BT1. Định nghĩa \`EmailSender\` interface + viết MockEmailSender (spy)

Yêu cầu:
- Interface \`EmailSender\` có 1 method \`Send(to, subject, body string) error\`.
- Viết struct \`MockEmailSender\` thỏa interface, có spy field \`SendCount\` và \`LastCall\` (struct chứa \`To, Subject, Body\`).
- Cho phép set \`SendFunc\` để inject hành vi (return error chẳng hạn).

### BT2. Test \`NotifyService.NotifyUser\` với mock

- Có \`NotifyService\` nhận \`UserStore\` và \`EmailSender\` qua constructor.
- \`NotifyService.NotifyUser(id int)\` đọc user từ store, gửi email "Welcome <name>" tới user.Email.
- Viết test verify: \`EmailSender.Send\` được gọi đúng 1 lần, đúng địa chỉ, đúng subject.
- Test thêm case: nếu \`UserStore.Get\` trả error, \`EmailSender.Send\` KHÔNG được gọi.

### BT3. InMemoryUserStore (fake) + test UserService

- Implement \`InMemoryUserStore\` thỏa \`UserStore\` (Get, Save, Delete).
- \`UserService.CreateUser(name, email)\` → save tới store, return ID.
- \`UserService.RenameUser(id, newName)\` → load, đổi tên, save lại.
- Test toàn workflow create → rename → get → assert tên mới — dùng fake.

### BT4. Mock \`time.Now\` — \`IsAccountExpired\`

- \`Account\` struct có field \`ExpiresAt time.Time\`.
- Hàm \`IsAccountExpired(a *Account) bool\` so sánh với "now".
- Refactor để \`now\` injectable (qua struct field).
- Test 3 case: chưa expired, đúng lúc expired (edge), đã expired.

### BT5. Generate mock với \`mockgen\` (hướng dẫn)

Viết ra:
- Lệnh install mockgen.
- Lệnh generate cho interface \`UserStore\`.
- Code test mẫu dùng \`mocks.NewMockUserStore(ctrl)\` + \`EXPECT()\`.

### BT6. Refactor anti-pattern test

Cho test (file đính kèm trong solutions_test.go, đoạn \`BT6_BadTest\`):

\`\`\`go
// Test này SAI: verify mock thay vì verify behavior.
func TestSumPrices_Bad(t *testing.T) {
    m := new(MockMath)
    m.On("Add", 10, 20).Return(30)
    m.On("Add", 30, 15).Return(45)

    res := SumPrices([]int{10, 20, 15}, m)

    m.AssertExpectations(t)
    if res != 45 { t.Fail() }
}
\`\`\`

Refactor thành test "đúng cách" — không mock \`Math\` (vì cộng số là pure function), chỉ verify output.

---

## Lời giải chi tiết

### BT1. EmailSender + MockEmailSender

Cách tiếp cận:
1. Định nghĩa interface 1 method.
2. Struct mock có:
   - Field \`SendCount int\` đếm số lần gọi.
   - Field \`LastCall EmailCall\` lưu argument lần cuối.
   - Field \`SendFunc func(to, subject, body string) error\` để override behavior (nil = trả nil).
3. Method \`Send\` tăng counter, lưu \`LastCall\`, gọi \`SendFunc\` nếu có.

\`\`\`go
type EmailSender interface {
    Send(to, subject, body string) error
}

type EmailCall struct{ To, Subject, Body string }

type MockEmailSender struct {
    SendCount int
    LastCall  EmailCall
    SendFunc  func(to, subject, body string) error
}

func (m *MockEmailSender) Send(to, subject, body string) error {
    m.SendCount++
    m.LastCall = EmailCall{to, subject, body}
    if m.SendFunc != nil { return m.SendFunc(to, subject, body) }
    return nil
}
\`\`\`

Test sử dụng:

\`\`\`go
mock := &MockEmailSender{}
_ = mock.Send("a@b.com", "Hi", "Hello")
if mock.SendCount != 1 { t.Fail() }
if mock.LastCall.To != "a@b.com" { t.Fail() }
\`\`\`

Độ phức tạp: O(1) mỗi gọi.

### BT2. Test NotifyService

Cách tiếp cận:
- \`NotifyService\` nhận \`UserStore\` và \`EmailSender\`. Test wiring với mock.
- Case 1 (happy path): mock store trả user, kiểm \`email.SendCount == 1\`, đúng \`To\`, đúng \`Subject\`.
- Case 2 (error path): mock store trả error, kiểm \`email.SendCount == 0\`, và \`NotifyUser\` return error đó.

\`\`\`go
func TestNotifyUser_HappyPath(t *testing.T) {
    store := &MockUserStore{
        GetFunc: func(id int) (*User, error) {
            return &User{ID: id, Name: "alice", Email: "alice@x.com"}, nil
        },
    }
    email := &MockEmailSender{}
    svc := NewNotifyService(store, email)

    if err := svc.NotifyUser(42); err != nil { t.Fatal(err) }

    if email.SendCount != 1 { t.Errorf("want 1 send, got %d", email.SendCount) }
    if email.LastCall.To != "alice@x.com" { t.Error(email.LastCall.To) }
    if !strings.Contains(email.LastCall.Subject, "Welcome") { t.Error(email.LastCall.Subject) }
}

func TestNotifyUser_StoreError(t *testing.T) {
    store := &MockUserStore{
        GetFunc: func(int) (*User, error) { return nil, errors.New("db down") },
    }
    email := &MockEmailSender{}
    svc := NewNotifyService(store, email)

    err := svc.NotifyUser(42)
    if err == nil { t.Fatal("muốn error, được nil") }
    if email.SendCount != 0 { t.Errorf("Send không nên gọi, gọi %d lần", email.SendCount) }
}
\`\`\`

Độ phức tạp: O(1) cho mỗi test case.

### BT3. InMemoryUserStore + UserService

Cách tiếp cận:
1. Struct holding \`map[int]*User\` + \`nextID\`.
2. \`Save\`: nếu \`u.ID == 0\`, gán \`nextID\` mới rồi tăng counter; copy user (để tránh test mutate).
3. \`Get\`: lookup map, return \`ErrNotFound\` nếu không có.
4. \`Delete\`: xóa khỏi map.
5. \`UserService\` cầm store, expose \`CreateUser\`, \`RenameUser\`, \`GetUser\`.

\`\`\`go
type InMemoryUserStore struct {
    users  map[int]*User
    nextID int
}
func NewInMemoryUserStore() *InMemoryUserStore {
    return &InMemoryUserStore{users: map[int]*User{}}
}
func (s *InMemoryUserStore) Get(id int) (*User, error) {
    u, ok := s.users[id]
    if !ok { return nil, ErrNotFound }
    cp := *u
    return &cp, nil
}
func (s *InMemoryUserStore) Save(u *User) error {
    if u.ID == 0 { s.nextID++; u.ID = s.nextID }
    cp := *u
    s.users[u.ID] = &cp
    return nil
}
func (s *InMemoryUserStore) Delete(id int) error {
    delete(s.users, id); return nil
}
\`\`\`

Test:

\`\`\`go
func TestUserService_Workflow(t *testing.T) {
    store := NewInMemoryUserStore()
    svc := NewUserService(store)

    id, err := svc.CreateUser("alice", "alice@x.com")
    if err != nil { t.Fatal(err) }
    if id == 0 { t.Fatal("ID = 0") }

    if err := svc.RenameUser(id, "ALICE"); err != nil { t.Fatal(err) }

    u, _ := svc.GetUser(id)
    if u.Name != "ALICE" { t.Errorf("want ALICE got %s", u.Name) }
}
\`\`\`

Ưu điểm fake: workflow nhiều bước, không cần \`.On(...)\` cho từng method.

Độ phức tạp: O(1) cho mỗi op (map lookup).

### BT4. Mock time

\`\`\`go
type ExpiryChecker struct {
    now func() time.Time
}
func NewExpiryChecker() *ExpiryChecker {
    return &ExpiryChecker{now: time.Now}
}
func (e *ExpiryChecker) IsExpired(a *Account) bool {
    return !e.now().Before(a.ExpiresAt) // now >= ExpiresAt → expired
}
\`\`\`

Test 3 case dùng fake \`now\`:

\`\`\`go
func TestIsExpired(t *testing.T) {
    deadline := time.Date(2025, 6, 1, 0, 0, 0, 0, time.UTC)
    acc := &Account{ExpiresAt: deadline}

    cases := []struct {
        name string
        now  time.Time
        want bool
    }{
        {"chưa expired", deadline.Add(-1 * time.Hour), false},
        {"đúng giây expired", deadline, true},
        {"đã expired", deadline.Add(1 * time.Hour), true},
    }
    for _, c := range cases {
        t.Run(c.name, func(t *testing.T) {
            chk := &ExpiryChecker{now: func() time.Time { return c.now }}
            if got := chk.IsExpired(acc); got != c.want {
                t.Errorf("now=%v want=%v got=%v", c.now, c.want, got)
            }
        })
    }
}
\`\`\`

Quan trọng: struct field thay vì package var → test parallel an toàn.

### BT5. Generate mock với mockgen

\`\`\`bash
# 1. Cài:
go install go.uber.org/mock/mockgen@latest

# 2. Generate (source mode):
mockgen -source=user.go -destination=mocks/user_mock.go -package=mocks

# Hoặc reflect mode:
mockgen -destination=mocks/user_mock.go -package=mocks \\
    myapp/internal/user UserStore
\`\`\`

Sử dụng:

\`\`\`go
import (
    "testing"
    "go.uber.org/mock/gomock"
    mocks "myapp/internal/user/mocks"
)
func TestNotify_Mockgen(t *testing.T) {
    ctrl := gomock.NewController(t) // auto Cleanup
    store := mocks.NewMockUserStore(ctrl)

    store.EXPECT().Get(42).
        Return(&User{ID: 42, Email: "a@b.com"}, nil).
        Times(1)

    svc := NewNotifyService(store, &MockEmailSender{})
    if err := svc.NotifyUser(42); err != nil { t.Fatal(err) }
}
\`\`\`

Nếu chưa cài được mockgen (offline / sandbox), file \`solutions_test.go\` đã có MockUserStore hand-written tương đương.

### BT6. Refactor anti-pattern

Test ban đầu mock phép cộng — vô nghĩa. Refactor:

\`\`\`go
// SUT chuẩn:
func SumPrices(prices []int) int {
    s := 0
    for _, p := range prices { s += p }
    return s
}

// Test đúng:
func TestSumPrices(t *testing.T) {
    cases := []struct{
        name string
        in   []int
        want int
    }{
        {"empty", []int{}, 0},
        {"một phần tử", []int{10}, 10},
        {"nhiều phần tử", []int{10, 20, 15}, 45},
        {"có số 0", []int{0, 5, 0}, 5},
    }
    for _, c := range cases {
        t.Run(c.name, func(t *testing.T) {
            if got := SumPrices(c.in); got != c.want {
                t.Errorf("in=%v want=%d got=%d", c.in, c.want, got)
            }
        })
    }
}
\`\`\`

Bài học: **không mock pure function**. Test input/output trực tiếp luôn rõ ràng và đỡ fragile.

---

## Code & Minh họa

- [solutions.go](./solutions.go) — code SUT: \`UserStore\`, \`EmailSender\`, \`NotifyService\`, \`UserService\`, \`ExpiryChecker\`, \`InMemoryUserStore\`.
- [solutions_test.go](./solutions_test.go) — test cho mọi bài tập, chạy bằng \`go test -v ./...\`.
- [visualization.html](./visualization.html) — 3 module tương tác: taxonomy 5 test doubles, DI flow (production vs test wiring), mock interaction trace.

Chạy test:

\`\`\`bash
cd Programming/lesson-38-mocking-test-doubles
go test -v
\`\`\`

---

## Bài tiếp theo

- [Lesson 39 — Design Patterns Go](../lesson-39-design-patterns-go/README.md): functional options, accept interface return struct, composition — củng cố API thiết kế testable.
- [Lesson 40 — Error Handling Deep](../lesson-40-error-handling-deep/README.md): error tree, retry pattern — kết hợp mock để test retry logic xác định.

## Tham khảo

- Gerard Meszaros, *xUnit Test Patterns* (2007) — gốc của phân loại test doubles.
- Martin Fowler, ["Mocks Aren't Stubs"](https://martinfowler.com/articles/mocksArentStubs.html) — kinh điển.
- [go.uber.org/mock](https://github.com/uber-go/mock) — gomock fork active.
- [stretchr/testify](https://github.com/stretchr/testify) — assert + mock package.
- Mitchell Hashimoto, ["Advanced Testing in Go"](https://www.youtube.com/watch?v=8hQG7QlcLBk) — talk GopherCon.
`;
