// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: Programming/lesson-20-packages-modules/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 20 — Package & Module (Tier 2)

> Tier 2 — Intermediate · Lesson 20  
> Tiền đề: [Lesson 06 — Hello World & Toolchain](../lesson-06-hello-world-toolchain/) (đã biết \`go run\`, \`go build\`, \`go mod init\` cơ bản), [Lesson 11 — Functions](../lesson-11-functions/), [Lesson 18 — Interfaces](../lesson-18-interfaces/), [Lesson 19 — Errors](../lesson-19-errors/).

## Mục tiêu học tập

Sau bài này bạn sẽ:

1. Hiểu **package** là gì, vì sao \`1 folder = 1 package\`, và quan hệ giữa **tên file** vs **tên package**.
2. Biết quy tắc **Public / Private** dựa trên ký tự đầu của tên (\`Foo\` exported, \`foo\` private). Đây là cơ chế access control duy nhất của Go.
3. Phân biệt **import path** (chuỗi để \`import\`) vs **module path** (định danh module trong \`go.mod\`) vs **package name** (định danh dùng trong code).
4. Hiểu **\`internal/\` package** như tường lửa chống lạm dụng API nội bộ.
5. Sử dụng **\`init()\` function** đúng cách — và biết vì sao nó dễ thành "side-effect ngầm" nếu lạm dụng.
6. Đọc, viết, và sửa **\`go.mod\`** thành thạo: \`module\`, \`go\`, \`require\`, \`replace\`, \`exclude\`. Hiểu vai trò **\`go.sum\`**.
7. Hiểu **SemVer** trong Go, đặc biệt quy tắc **major v2+ phải đổi import path** (\`pkg/v2\`).
8. Biết **Minimum Version Selection (MVS)** — thuật toán chọn version của Go khác hẳn npm.
9. Dùng \`replace\` cho **local development** và **fork**.
10. Biết khi nào dùng **vendoring**, **GOPRIVATE**, **workspace mode** (\`go.work\`).
11. Tránh các pitfall phổ biến: **import cycle**, quên \`internal/\`, edit \`go.sum\` bằng tay, không đổi import path khi bump v2.

---

## 0. Tóm tắt nhanh (cheat sheet)

| Khái niệm | Tóm tắt |
|---|---|
| **Package** | 1 folder = 1 package. Mọi file trong folder cùng khai báo \`package X\`. |
| **Module** | Tập hợp package được phát hành cùng nhau, định danh bằng \`module github.com/...\` trong \`go.mod\`. |
| **Import path** | Đường dẫn để \`import\` — gồm module path + sub-folder. |
| **Exported** | Tên bắt đầu chữ HOA → public ra ngoài package. |
| **Unexported** | Tên bắt đầu chữ thường → private, chỉ trong package. |
| **\`internal/\`** | Sub-package chỉ import được từ con cháu cây cha gần nhất. |
| **\`go.sum\`** | Checksum, đảm bảo build reproducible. KHÔNG edit tay. |
| **MVS** | Go chọn version **thấp nhất** thoả mãn mọi constraint. |
| **v2+** | Import path phải có hậu tố \`/v2\` (\`/v3\`, …). |
| **\`replace\`** | Đè đường dẫn của một dependency — dùng cho fork hoặc local dev. |
| **\`vendor/\`** | Folder chứa copy của tất cả dep, build offline. |

---

## 1. Package — đơn vị tổ chức code

> 💡 **Trực giác.** Package giống "tủ tài liệu" trong văn phòng. Mỗi tủ chứa các file (\`.go\`) cùng chủ đề. Bên ngoài chỉ cần biết "tủ này tên gì, có ngăn nào mở được" (exported), không cần biết bên trong sắp xếp ra sao (unexported).

### 1.1 Quy tắc cứng: 1 folder = 1 package

Mọi file \`.go\` **trong cùng 1 folder** phải khai báo **cùng 1 tên package** ở dòng đầu:

\`\`\`
myapp/
└── stats/
    ├── mean.go      // package stats
    ├── median.go    // package stats
    └── mode.go      // package stats
\`\`\`

Cả 3 file mở đầu bằng \`package stats\`. Nếu file thứ 4 ghi \`package geometry\` → compiler báo lỗi \`found packages stats and geometry\`.

> ⚠ **Lỗi thường gặp.** Người mới nghĩ "1 file = 1 package" như Java. SAI. Trong Go, **folder mới là ranh giới**. Bạn được phép chia 1 package thành nhiều file (vd: \`user.go\`, \`user_repository.go\`, \`user_service.go\` cùng \`package user\`) — Go compile chúng như một.

### 1.2 Tên file không quan trọng

Tên file **không liên quan** đến tên package, không liên quan đến tên symbol bên trong. Bạn có thể đặt:

\`\`\`
stats/
├── aaa.go     // chứa func Mean()
├── bbb.go     // chứa func Median()
└── xyz.go     // chứa type Histogram
\`\`\`

Tất cả đều \`package stats\`, import vẫn là \`import "myapp/stats"\`. Người dùng gọi \`stats.Mean(...)\` bất kể nó nằm trong file nào.

> 💡 **Quy ước thực tế.** Dù compiler không bắt, cộng đồng Go vẫn đặt tên file theo nội dung (\`mean.go\` chứa \`Mean\`, \`errors.go\` chứa các sentinel error). Lý do: dễ navigate trong IDE.

### 1.3 Tên package vs tên thư mục

Mặc định **nên trùng** (\`stats/\` → \`package stats\`) nhưng không bắt buộc.

\`\`\`
myapp/
└── pkg-stats/
    └── x.go    // package stats — vẫn hợp lệ
\`\`\`

Khi \`import "myapp/pkg-stats"\` thì code gọi \`stats.Mean(...)\` (theo \`package\` declaration, không phải theo tên folder).

> ❓ **Câu hỏi tự nhiên.**  
> **Hỏi:** Vậy có nên đặt khác nhau không?  
> **Đáp:** Không. Đặt khác chỉ làm người đọc rối. Trừ trường hợp folder có dấu gạch nối (\`my-pkg/\` thì package phải đặt \`mypkg\` vì identifier Go không cho dấu \`-\`).

### 1.4 Một ngoại lệ: \`package main\`

Package tên \`main\` đặc biệt: nó được Go toolchain biên dịch thành **executable**, phải có \`func main()\`. Mọi package khác là **library**.

\`\`\`go
// myapp/cmd/server/main.go
package main

func main() { /* ... */ }
\`\`\`

> 📝 **Tóm tắt mục 1.**  
> • 1 folder = 1 package. Mọi file trong folder cùng \`package X\`.  
> • Tên file tuỳ, nhưng quy ước đặt theo nội dung.  
> • Tên package ≠ tên folder cũng OK nhưng tránh.  
> • \`package main\` đặc biệt — sinh executable.

---

## 2. Public vs Private — visible scope

Go không có \`public\`, \`private\`, \`protected\`. Chỉ có **một quy tắc**:

> **Tên bắt đầu chữ HOA → exported (public). Tên bắt đầu chữ thường (hoặc \`_\`) → unexported (private).**

Quy tắc này áp dụng cho **mọi identifier**: \`func\`, \`type\`, \`var\`, \`const\`, \`field\` trong struct, \`method\`.

### 2.1 Bốn ví dụ cụ thể

\`\`\`go
package user

// Exported — gọi được từ ngoài: user.User{}
type User struct {
    ID    int    // exported field
    Name  string // exported field
    email string // unexported — chỉ truy cập trong package user
}

// Exported function
func NewUser(name string) *User { return &User{Name: name} }

// Unexported — chỉ dùng nội bộ package user
func validate(name string) bool { return len(name) > 0 }

// Exported method trên unexported receiver type
type cache struct{ /* ... */ }
func (c *cache) Get() string { return "" } // method exported nhưng type cache thì không → user ngoài không tạo được cache, vô dụng từ ngoài
\`\`\`

### 2.2 Hệ quả: struct field cũng theo quy tắc

\`\`\`go
package db

type Connection struct {
    Host     string // OK, người dùng set được
    password string // ẩn — buộc set qua constructor
}

func NewConnection(host, pwd string) *Connection {
    return &Connection{Host: host, password: pwd}
}
\`\`\`

Ngoài package \`db\`:

\`\`\`go
c := db.NewConnection("localhost", "secret") // OK
c.Host = "127.0.0.1"  // OK
c.password = "leak"   // ❌ COMPILE ERROR: c.password undefined (cannot refer to unexported field)
\`\`\`

### 2.3 Không có \`protected\` / \`friend\`

Java có \`protected\` (con cháu thấy), C++ có \`friend\`. Go **không có**. Hoặc public với cả thế giới, hoặc private chỉ package này.

> ❓ **Câu hỏi tự nhiên.**  
> **Hỏi:** Vậy nếu tôi muốn share một function chỉ giữa 2 package liền kề mà không muốn ai ngoài thấy thì sao?  
> **Đáp:** Đặt vào package thứ ba, để 2 package kia cùng import. Hoặc dùng **\`internal/\`** (mục 4) — Go cung cấp một dạng visibility theo cây thư mục.

> ⚠ **Lỗi thường gặp.** Đặt struct field chữ thường rồi muốn \`json.Marshal\` ra → encoding/json **không nhìn thấy** unexported field, output sẽ thiếu. Cách fix: viết hoa field, hoặc viết MarshalJSON tay.

\`\`\`go
type Order struct {
    ID    int
    total float64 // sẽ bị json bỏ qua!
}
\`\`\`

> 🔁 **Dừng lại tự kiểm tra.**  
> Trong \`package shop\`, hàm \`calcTax(price float64) float64\` có thể được dùng từ \`package main\` không?
>
> <details><summary>Đáp án</summary>
> Không. \`calcTax\` chữ \`c\` thường → unexported. Muốn dùng từ \`package main\` phải đổi thành \`CalcTax\`.
> </details>

> 📝 **Tóm tắt mục 2.**  
> • Chữ HOA = export, chữ thường = private.  
> • Quy tắc áp dụng cho mọi identifier (func/type/var/const/field/method).  
> • Không có \`protected\`. Cần visibility middle-ground → dùng \`internal/\`.

---

## 3. Import path — module + sub-package

### 3.1 Ba khái niệm dễ lẫn

| Tên | Định nghĩa | Ví dụ |
|---|---|---|
| **Module path** | Định danh module, ghi ở dòng \`module ...\` trong \`go.mod\` | \`github.com/google/uuid\` |
| **Import path** | Chuỗi xuất hiện sau \`import\` — = module path + sub-folder | \`github.com/google/uuid\` hoặc \`myapp/internal/auth\` |
| **Package name** | Tên dùng trong code (sau \`package X\`) | \`uuid\`, \`auth\` |

\`\`\`go
// go.mod: module myapp
//
// myapp/internal/auth/jwt.go khai báo: package auth

import "myapp/internal/auth"     // ← import path
// rồi gọi:
auth.GenerateJWT(...)            // ← package name
\`\`\`

### 3.2 Bốn ví dụ import path thực tế

\`\`\`go
import (
    "fmt"                               // standard library
    "encoding/json"                     // standard library, sub-package
    "github.com/google/uuid"            // external module trên GitHub
    "github.com/gin-gonic/gin"          // external module
    "myapp/internal/auth"               // internal package trong module myapp
    "myapp/pkg/logger"                  // public package trong module myapp
)
\`\`\`

### 3.3 Cùng import path → cùng package, single instance

Go cache mỗi package thành một bản duy nhất trong runtime. Bất kể bao nhiêu file import \`"fmt"\`, runtime chỉ có **một** instance của \`fmt\`. Vì vậy:

- \`var X int\` ở package-level sẽ shared giữa mọi file import nó.
- \`func init()\` chạy **đúng một lần** (mục 5).

### 3.4 Aliased import & dot import

\`\`\`go
import (
    j "encoding/json"           // alias: gọi j.Marshal thay vì json.Marshal
    . "math"                    // dot import: gọi trực tiếp Sqrt(), Pi (không khuyến khích)
    _ "github.com/lib/pq"       // blank import: chỉ chạy init(), không dùng tên
)
\`\`\`

- **Alias** dùng khi 2 package trùng tên (vd cả \`crypto/rand\` và \`math/rand\` trong cùng file).
- **Dot import** chỉ dùng trong **test** (vd \`. "github.com/onsi/ginkgo"\`). Trong production code → đọc khó, dễ nhầm scope.
- **Blank import** dùng khi cần \`init()\` side-effect (vd database driver \`pq\` đăng ký vào \`database/sql\`).

> 📝 **Tóm tắt mục 3.**  
> • Import path = module path + sub-folder.  
> • Package name có thể khác folder name nhưng nên trùng.  
> • Cùng import path = single instance khi runtime.  
> • \`_\` import cho side-effect, \`.\` import chỉ dùng test.

---

## 4. \`internal/\` package — tường lửa visibility theo cây

> 💡 **Trực giác.** Bình thường một function \`Public\` xuất ra là cả thế giới thấy. Với module lớn (vd \`github.com/mycompany/platform\`) có những helper mình muốn export cho 5 service nội bộ dùng chung, nhưng **không muốn user bên ngoài import** (vì nó không stable, có thể đổi bất kỳ lúc nào). \`internal/\` giải quyết đúng nhu cầu này.

### 4.1 Quy tắc

> Một package nằm tại \`…/internal/…\` **chỉ có thể được import từ code nằm trong cây thư mục có \`internal\` là con**. Code ngoài cây đó sẽ bị compiler chặn.

Cụ thể: nếu có \`myapp/foo/internal/bar\`, thì:

- \`myapp/foo/baz\` import được (\`foo\` là cha của \`internal\`).
- \`myapp/foo/qux/quux\` import được.
- \`myapp/other/x\` **KHÔNG** import được (không nằm dưới \`foo/\`).
- Bên ngoài module \`myapp\` **chắc chắn KHÔNG** import được.

### 4.2 Minh hoạ cây thư mục

\`\`\`
github.com/mycompany/platform/
├── go.mod                                  (module github.com/mycompany/platform)
├── service-a/
│   ├── main.go                             import "...platform/shared/internal/auth" ✓
│   └── handler.go
├── service-b/
│   └── main.go                             import "...platform/shared/internal/auth" ✓
├── shared/
│   ├── public.go                           ai cũng import được
│   └── internal/                           ← biên giới
│       └── auth/
│           └── jwt.go                      chỉ shared/* hoặc cây con shared/ thấy
└── public-sdk/
    └── client.go                           import "...platform/shared/internal/auth" ✗
                                            không phải con của shared/, blocked!
\`\`\`

Và bên ngoài, từ \`github.com/another/repo\` mà thử \`import "github.com/mycompany/platform/shared/internal/auth"\` → compile error:

\`\`\`
use of internal package github.com/mycompany/platform/shared/internal/auth not allowed
\`\`\`

### 4.3 Khi nào nên đặt \`internal/\`?

| Tình huống | Nên đặt \`internal/\`? |
|---|---|
| Helper chỉ phục vụ module này, không muốn external user phụ thuộc | ✓ |
| Code đang trong giai đoạn unstable, API hay đổi | ✓ |
| Utility ai cũng cần (logger, time utils) — muốn open-source dùng được | ✗ |
| Constructor cho test thấy nhưng prod không thấy | ✗ (dùng file \`_test.go\` + package suffix \`_test\`) |

> 💼 **Ví dụ thực tế (monorepo công ty).** Công ty có repo \`github.com/acme/backend\` chứa 12 microservice. Có folder \`backend/shared/\` dùng chung. Trong đó:
>
> - \`backend/shared/public/httpx\` — wrapper trên \`net/http\`, export ra cho cả các open-source SDK của công ty. → KHÔNG đặt internal.
> - \`backend/shared/internal/dbpool\` — connection pool tối ưu, dùng chung 12 service nhưng external repo không nên dựa vào (signature có thể thay đổi). → Đặt \`internal/\`.

> ⚠ **Lỗi thường gặp.** Quên đặt vào \`internal/\` rồi sau này muốn refactor function — phát hiện đã có 3 repo bên ngoài import và phụ thuộc → bị mắc kẹt, đổi sẽ break user. Nguyên tắc: **mặc định mọi thứ chưa cần share rộng → đặt trong \`internal/\`**.

> 🔁 **Dừng lại tự kiểm tra.**  
> Bạn có module \`github.com/me/lib\` với package \`lib/util/internal/strutil\`. Người ngoài chạy \`go get\` rồi \`import "github.com/me/lib/util/internal/strutil"\`. Việc gì xảy ra?
>
> <details><summary>Đáp án</summary>
> \`go build\` fail với error \`use of internal package not allowed\`. Họ buộc phải fork hoặc bạn phải mở interface ở \`lib/util/public/strutil\` (re-export).
> </details>

> 📝 **Tóm tắt mục 4.**  
> • \`internal/\` = visibility middle-ground giữa exported và unexported.  
> • Chỉ cây con của cha \`internal\` thấy được.  
> • Default mọi helper nội bộ → để trong \`internal/\`. Khi quyết định stable thì mới mở ra ngoài.

---

## 5. \`init()\` function — load-time hook

\`\`\`go
package db

import "log"

var pool *Pool

func init() {
    log.Println("db package loading...")
    pool = newPool()
}
\`\`\`

### 5.1 Đặc tính

- **Không tham số, không return**. Signature cố định: \`func init()\`.
- Chạy **tự động** khi package load (khi runtime resolve mọi import lần đầu).
- Một package có thể có **nhiều \`init()\`** (trong cùng file hoặc khác file). Thứ tự:
  1. Theo thứ tự khai báo trong cùng 1 file.
  2. Giữa các file: theo thứ tự **lexical** tên file (\`a.go\` → \`b.go\` → ...).
- Tất cả init của package phụ thuộc chạy **trước** init của package phụ thuộc nó.

### 5.2 Khi nào nên dùng

✅ **Nên dùng:**

- Đăng ký driver vào registry (kinh điển: \`database/sql\` driver như \`lib/pq\`).
- Tính trước bảng tra cứu phức tạp (precomputed table).
- Validate config compile-time (vd: regex pre-compile).

\`\`\`go
package main

import _ "github.com/lib/pq"        // blank import — init() của pq đăng ký driver
\`\`\`

\`\`\`go
// pq/conn.go
package pq

import "database/sql"

func init() {
    sql.Register("postgres", &Driver{})
}
\`\`\`

❌ **Không nên dùng:**

- Khởi tạo connection ngoài (DB, HTTP) — sẽ block khởi động, khó test, gây side-effect ngầm.
- Đọc file, biến môi trường rồi panic — biến binary thành "thiêng" với một bộ env.
- Logic phức tạp có thể fail — vì init không return error, chỉ panic, mà panic ở init = process die ngay.

### 5.3 Bốn ví dụ init hợp lý

\`\`\`go
// Ví dụ 1: precompile regex
package validator
var emailRe = regexp.MustCompile(\`^[^@]+@[^@]+\\.[^@]+$\`) // không cần init, var init OK
\`\`\`

\`\`\`go
// Ví dụ 2: precompute Fibonacci 64 phần tử
package math2
var fib [64]uint64
func init() {
    fib[0], fib[1] = 0, 1
    for i := 2; i < 64; i++ { fib[i] = fib[i-1] + fib[i-2] }
}
\`\`\`

\`\`\`go
// Ví dụ 3: validate enum tại compile time
package status
const (
    Pending = iota
    Active
    Closed
    numStatuses
)
var labels = map[int]string{Pending: "pending", Active: "active", Closed: "closed"}
func init() {
    if len(labels) != numStatuses {
        panic("status label table mismatch")
    }
}
\`\`\`

\`\`\`go
// Ví dụ 4: đăng ký driver (đúng usecase init)
package mydriver
import "database/sql"
func init() { sql.Register("mydb", &Driver{}) }
\`\`\`

> ⚠ **Anti-pattern.**
>
> \`\`\`go
> func init() {
>     conn, err := sql.Open("postgres", os.Getenv("DB_URL"))
>     if err != nil { panic(err) }
>     globalDB = conn
> }
> \`\`\`
> Sai vì: (1) test không thay được DB, (2) \`os.Getenv\` rỗng → panic ngay khi \`go test\` cũng load package, (3) implicit dependency từ ngoài. **Đúng**: viết \`func New(cfg Config) (*DB, error)\` và để caller quyết định.

> ❓ **Câu hỏi tự nhiên.**  
> **Hỏi:** Có order rõ giữa các package?  
> **Đáp:** Có. Compiler tính topological sort của graph import: package nào không phụ thuộc gì init trước, package phụ thuộc nó init sau. Trong cùng level, theo thứ tự file lexical.

> 📝 **Tóm tắt mục 5.**  
> • \`init()\` chạy 1 lần khi load package, theo topological sort.  
> • Dùng cho: đăng ký driver, precompute, validate static config.  
> • Tránh: I/O, side-effect, code có thể fail runtime.

---

## 6. Package documentation — comment ngay trên \`package\`

\`\`\`go
// Package stats cung cấp các phép thống kê cơ bản: mean, median, mode, stddev.
//
// Tất cả hàm operate trên []float64 và return float64. NaN nếu input rỗng.
//
// Ví dụ:
//
//	m := stats.Mean([]float64{1, 2, 3})
//	fmt.Println(m) // 2
package stats
\`\`\`

### Quy tắc

- Comment ngay TRƯỚC dòng \`package X\` (không cách dòng) = **package doc**.
- Phải bắt đầu bằng \`Package X ...\` (Go convention).
- Nếu nhiều file cùng package có doc-comment, \`godoc\` chỉ lấy **một** (thường file \`doc.go\` riêng).
- pkg.go.dev tự render thành trang doc khi module public.

### \`doc.go\` convention

Khi package doc dài, tách ra file riêng:

\`\`\`
stats/
├── doc.go     // chỉ chứa package comment + dòng package stats
├── mean.go
└── median.go
\`\`\`

\`doc.go\`:

\`\`\`go
// Package stats provides ...
//
// (vài đoạn dài giới thiệu, ví dụ, FAQ)
package stats
\`\`\`

> 💡 **Trực giác.** Coi như README riêng cho từng package, nằm ngay trong code, godoc/pkg.go.dev hiển thị tự động.

---

## 7. Go modules — \`go.mod\` & \`go.sum\`

### 7.1 Cấu trúc \`go.mod\`

\`\`\`go.mod
module github.com/mycompany/backend

go 1.22

require (
    github.com/google/uuid v1.6.0
    github.com/gin-gonic/gin v1.9.1
    golang.org/x/crypto v0.21.0
)

require (
    github.com/bytedance/sonic v1.9.1 // indirect
    github.com/gabriel-vasile/mimetype v1.4.2 // indirect
)

replace github.com/mycompany/legacy-lib => ../legacy-lib

exclude github.com/oldpkg/buggy v0.5.0
\`\`\`

| Directive | Ý nghĩa |
|---|---|
| \`module\` | Module path của chính module này |
| \`go\` | Phiên bản Go tối thiểu cần để build. Ảnh hưởng tới ngữ pháp + một số default |
| \`require\` | Dependency trực tiếp. Khối thứ hai có comment \`// indirect\` = dep được dùng bởi một dep khác, không phải code mình import trực tiếp |
| \`replace\` | Đè đường dẫn của một dep (mục 9) |
| \`exclude\` | Loại trừ version cụ thể (rất ít dùng, thường khi version đó có lỗi bảo mật) |

### 7.2 \`go.sum\` — bảng checksum

\`\`\`
github.com/google/uuid v1.6.0 h1:NIvaJDMOsjHA8n1jAhLSgzrAzy1Hgr+hNrb57e+94F0=
github.com/google/uuid v1.6.0/go.mod h1:TIyPZe4MgqvfeYDBFedMoGGpEw/LqOeaOT+nhxU+yHo=
\`\`\`

- Mỗi dòng = \`<module> <version> <type> <hash>\`.
- \`h1:...\` = SHA-256 của zip module.
- \`/go.mod h1:...\` = SHA-256 của riêng file \`go.mod\` dep đó.
- Khi \`go build/test\`, Go so checksum thực tế với \`go.sum\`. Nếu khác → **fail**, chống supply-chain attack.
- **KHÔNG** sửa bằng tay. Để \`go mod tidy\` / \`go mod download\` tự update.

### 7.3 SemVer trong Go

Go bắt buộc dependency có **SemVer tag** dạng \`vMAJOR.MINOR.PATCH\`:

- \`v0.x.y\` — pre-stable. Breaking change được phép giữa minor.
- \`v1.x.y\` — stable. Minor/patch phải backward compatible.
- \`v2+\` — phải đổi import path (mục 13). \`github.com/x/y/v2\`.

### 7.4 Các lệnh thường dùng

| Lệnh | Tác dụng |
|---|---|
| \`go mod init <path>\` | Tạo \`go.mod\` mới |
| \`go get pkg@latest\` | Thêm/update dep tới version mới nhất |
| \`go get pkg@v1.2.3\` | Pin version cụ thể |
| \`go get pkg@<commit-hash>\` | Pin commit chưa có tag — Go sinh "pseudo-version" \`v0.0.0-yyyymmdd-hash\` |
| \`go get pkg@none\` | Xoá dep |
| \`go mod tidy\` | Sync: thêm dep thiếu, xoá dep thừa |
| \`go mod why pkg\` | Giải thích vì sao có pkg này trong dep graph |
| \`go mod graph\` | In ra toàn bộ DAG dependency |
| \`go mod download\` | Tải sẵn vào module cache (\`$GOPATH/pkg/mod\`) |
| \`go list -m all\` | List mọi module + version trong build |
| \`go list -m -u all\` | Như trên, kèm gợi ý "có update lên X" |

> 💡 **Pseudo-version giải thích.** Khi pin commit chưa tag, format: \`v0.0.0-20240115093200-abc123def456\`. Trong đó \`20240115093200\` là timestamp UTC của commit, \`abc123def456\` là 12 ký tự đầu hash. Go sinh tự động — bạn copy/paste thoải mái.

> ❓ **Câu hỏi tự nhiên.**  
> **Hỏi:** \`go.sum\` có push lên git không?  
> **Đáp:** Có. Cả \`go.mod\` và \`go.sum\` đều phải commit. Lý do: build reproducible. Người clone repo về \`go build\` lần đầu — Go verify dep hash với \`go.sum\` đúng như bạn đã build.

> 🔁 **Dừng lại tự kiểm tra.**  
> Bạn xoá hết \`go.sum\`, chạy \`go build\`. Việc gì xảy ra?
>
> <details><summary>Đáp án</summary>
> Go sẽ download dep, tính lại checksum, ghi lại \`go.sum\`. Build thành công. NHƯNG nếu attacker đổi nội dung dep từ lần này tới lần sau, bạn không biết. Vì vậy commit \`go.sum\` là quan trọng.
> </details>

> 📝 **Tóm tắt mục 7.**  
> • \`go.mod\` = manifest, \`go.sum\` = checksum, cả 2 commit.  
> • \`go mod tidy\` sau mọi lần thêm/bớt import.  
> • Pseudo-version cho commit chưa tag.

---

## 8. Minimum Version Selection (MVS)

> 💡 **Trực giác.** Bạn dùng \`uuid v1.3.0\`. Bạn cũng dùng \`gin\`, mà gin yêu cầu \`uuid v1.4.0\`. Câu hỏi: phiên bản nào được build?

### 8.1 Trả lời của npm vs Go

- **npm/yarn:** Chọn **highest compatible** trong các caret range (\`^\`). Có thể có nhiều bản uuid trong \`node_modules\` (nested).
- **Go (MVS):** Chọn **minimum version satisfy mọi require**. Single instance trong toàn bộ build.

Trong ví dụ trên:

\`\`\`
my-app    require uuid v1.3.0
gin       require uuid v1.4.0
────────────────────────────────
Go chọn: uuid v1.4.0  (= max của các minimum requirement)
\`\`\`

> Lưu ý: "minimum" trong tên MVS hơi gây nhầm. Cách diễn đạt chính xác hơn: "Go chọn **version nhỏ nhất** mà **không nhỏ hơn** bất kỳ require nào". Tương đương \`max(req_1, req_2, ..., req_n)\` trong các requirement.

### 8.2 Ví dụ 3-module phức tạp

Giả sử cây dependency:

\`\`\`
my-app (v0.0.0)
├─ require A v1.2.0
├─ require B v1.5.0
└─ A v1.2.0
   └─ require C v1.0.0
B v1.5.0
   ├─ require A v1.1.0   ← yếu hơn root, bị "nâng" lên 1.2.0
   └─ require C v1.3.0
\`\`\`

Build set cuối:

| Module | Version chọn | Lý do |
|---|---|---|
| A | v1.2.0 | max(1.2.0 từ root, 1.1.0 từ B) = 1.2.0 |
| B | v1.5.0 | chỉ có yêu cầu duy nhất từ root |
| C | v1.3.0 | max(1.0.0 từ A, 1.3.0 từ B) = 1.3.0 |

### 8.3 Ưu điểm so với npm

- **Reproducible**: cùng \`go.mod\` → cùng kết quả, không cần lockfile như package-lock.json.
- **Đơn giản**: thuật toán deterministic, không có heuristic phức tạp.
- **An toàn**: dep auto-update không kéo theo bản mới chưa kiểm chứng. Phải \`go get\` chủ động.

> ❓ **Câu hỏi tự nhiên.**  
> **Hỏi:** Nếu C v1.3.0 release v1.4.0 với bug fix, Go có tự lên không?  
> **Đáp:** **KHÔNG**. Chỉ khi bạn \`go get\` hoặc một dep nào đó bump require của mình lên. Chủ động > tự động.

> ⚠ **Bẫy.** Nếu A v1.2.0 require C v1.0.0 mà C v1.0.0 có security vuln, build mặc định sẽ dùng v1.3.0 (do B yêu cầu). NHƯNG nếu bạn xoá B → MVS chọn C v1.0.0 → lỗ hổng quay lại. Vì vậy sau khi xoá dep luôn \`go mod tidy\` + audit lại.

> 🔁 **Dừng lại tự kiểm tra.**  
> A require D v1.1.0. B require D v1.0.0. Root require A và B. MVS chọn D version nào?
>
> <details><summary>Đáp án</summary>
> v1.1.0 — max của 1.1.0 và 1.0.0.
> </details>

> 📝 **Tóm tắt mục 8.**  
> • Go MVS = chọn **max** trong các yêu cầu (≠ npm chọn highest compatible).  
> • Single instance dep trong build, không nested.  
> • Update chủ động qua \`go get\`, không tự động.

---

## 9. \`replace\` directive

Đè đường dẫn (và/hoặc version) một dep. Hai usecase chính:

### 9.1 Local development

Đang sửa song song 2 module:

\`\`\`
~/code/
├── my-app/         (module example.com/me/app)
│   └── go.mod
└── my-lib/         (module example.com/me/lib)
    └── go.mod
\`\`\`

Trong \`my-app/go.mod\`:

\`\`\`go.mod
module example.com/me/app

go 1.22

require example.com/me/lib v1.0.0

replace example.com/me/lib => ../my-lib
\`\`\`

→ \`go build\` trong \`my-app\` sẽ build từ folder \`../my-lib\` thay vì module cache. Tiện cho dev: sửa lib xong test luôn ở app, không cần publish.

> ⚠ **Đừng commit replace local lên main.** \`replace ... => ../something\` chỉ hợp lý trên máy bạn. Commit lên CI sẽ fail (CI không có folder). Pattern thực tế: dùng tạm rồi \`git checkout -- go.mod\` trước khi push, hoặc thay bằng \`go.work\` (mục 12).

### 9.2 Fork

Library upstream có bug, chưa merge PR, bạn fork để fix:

\`\`\`go.mod
require github.com/upstream/awesome-lib v1.5.0

replace github.com/upstream/awesome-lib => github.com/yourname/awesome-lib v1.5.1-hotfix
\`\`\`

Trong fork, bạn tag \`v1.5.1-hotfix\` rồi push. App build sẽ kéo từ fork. Khi upstream merge, đổi \`require\` về phiên bản chính thức, xoá \`replace\`.

### 9.3 Downgrade dep

Dep release bản mới có bug. Trong khi chờ fix, đè về bản cũ:

\`\`\`go.mod
require github.com/buggy/lib v1.3.0           // bản mình muốn (có vẻ)
replace github.com/buggy/lib v1.3.0 => github.com/buggy/lib v1.2.5  // nhưng thực tế lấy bản cũ hơn
\`\`\`

> 💡 **Khi nào dùng replace.**
> | Tình huống | Pattern |
> |---|---|
> | Sửa 2 module song song trên máy | \`replace mod => ../local\` (tạm thời) |
> | Đợi upstream merge fix | \`replace mod => fork v1.x.y\` |
> | Tránh version có bug | \`replace mod vX => mod vY\` |
> | Production mono-repo nhiều module | tốt hơn dùng \`go.work\` (mục 12) |

> 📝 **Tóm tắt mục 9.**  
> • \`replace\` đè dep cho local dev / fork / downgrade.  
> • Đừng commit \`replace => ../path\` local lên CI.  
> • Modern alternative cho local dev: \`go.work\`.

---

## 10. Vendoring — \`go mod vendor\`

\`\`\`bash
$ go mod vendor
\`\`\`

Sinh folder \`vendor/\` chứa **copy đầy đủ** mọi dep. Build sau đó:

\`\`\`bash
$ go build -mod=vendor ./...    # build từ vendor/, bỏ qua module cache
\`\`\`

Hoặc tự động nếu Go version ≥ 1.14 và folder \`vendor/\` tồn tại + sync với \`go.mod\`.

### 10.1 Khi nào dùng vendoring

| Trường hợp | Vendor? |
|---|---|
| Build trong air-gapped network (không internet) | ✓ |
| Cần deterministic 100% (production critical) | ✓ (kèm \`go.sum\`) |
| Audit toàn bộ source dep (security) | ✓ |
| CI bình thường, có internet | ✗ — không cần, lãng phí disk |
| Quan tâm git repo size | ✗ — vendor/ thường 50MB-1GB |

### 10.2 Workflow vendor

\`\`\`bash
go mod tidy           # đảm bảo go.mod sạch
go mod vendor         # sinh vendor/
git add vendor/ go.mod go.sum
git commit -m "vendor deps"
\`\`\`

Mỗi lần bump dep:

\`\`\`bash
go get pkg@v1.2.3
go mod tidy
go mod vendor          # đừng quên
git add ...
\`\`\`

> ⚠ **Lỗi thường gặp.** Sửa dep ngay trong \`vendor/\` để hotfix gấp. Sau lần \`go mod vendor\` tiếp theo, sửa biến mất. Đúng phải là: fork + \`replace\` (mục 9).

> 📝 **Tóm tắt mục 10.**  
> • \`vendor/\` = copy local của dep.  
> • Build với \`-mod=vendor\` (auto trên Go 1.14+).  
> • Dùng cho air-gap, audit, paranoia về reproducibility.

---

## 11. Private module — \`GOPRIVATE\` & SSH auth

Mặc định Go fetch module qua **module proxy** (\`proxy.golang.org\`) và verify checksum qua **checksum database** (\`sum.golang.org\`). Cả hai service không truy cập được repo private của bạn → cần config.

### 11.1 \`GOPRIVATE\`

\`\`\`bash
export GOPRIVATE='*.mycompany.com,github.com/mycompany/*'
\`\`\`

Pattern dấu phẩy. Module match pattern sẽ:

- Skip proxy → Go fetch trực tiếp từ origin (git).
- Skip checksum database.

Tương đương:

\`\`\`bash
export GONOPROXY='*.mycompany.com'
export GONOSUMCHECK='*.mycompany.com'   # ít dùng — thường GOPRIVATE đã đủ
\`\`\`

### 11.2 SSH auth thay vì HTTPS

Repo private trên GitHub: HTTPS đòi token, dễ lộ. SSH key tiện hơn:

\`\`\`bash
git config --global url."git@github.com:".insteadOf "https://github.com/"
\`\`\`

Sau đó khi \`go get github.com/mycompany/secret-lib\`, git sẽ dùng SSH (\`git@github.com:mycompany/secret-lib.git\`), authenticate bằng \`~/.ssh/id_ed25519\`.

### 11.3 Workflow setup mới cho lập trình viên mới vào công ty

\`\`\`bash
# 1. config Go biết module nào là private
go env -w GOPRIVATE='github.com/acme/*'

# 2. config git dùng SSH
git config --global url."git@github.com:".insteadOf "https://github.com/"

# 3. thêm SSH key vào GitHub account

# 4. clone + build
git clone git@github.com:acme/backend.git
cd backend
go build ./...
\`\`\`

> 📝 **Tóm tắt mục 11.**  
> • \`GOPRIVATE\` báo Go bỏ qua proxy + checksum cho match pattern.  
> • \`insteadOf\` rewrite HTTPS → SSH để dùng SSH key.  
> • Setup 1 lần per machine.

---

## 12. Workspace mode — \`go.work\` (Go 1.18+)

> 💡 **Vấn đề.** Bạn có 5 module trong monorepo (\`service-a/\`, \`service-b/\`, \`shared-lib/\`, ...). Khi sửa \`shared-lib\`, mỗi service phải có \`replace ... => ../shared-lib\`. Quá nhiều. \`go.work\` giải quyết.

### 12.1 Khởi tạo

\`\`\`bash
cd ~/code/myorg
go work init ./service-a ./service-b ./shared-lib
\`\`\`

Sinh \`go.work\`:

\`\`\`go.work
go 1.22

use (
    ./service-a
    ./service-b
    ./shared-lib
)
\`\`\`

Lúc này, khi build trong bất kỳ module nào của workspace, các \`import "shared-lib/..."\` sẽ resolve tới folder local (\`./shared-lib\`), **không cần** \`replace\` trong từng \`go.mod\`.

### 12.2 Workflow

\`\`\`bash
go work use ./service-c        # thêm module mới
go work edit -dropuse=./old    # xoá
go work sync                   # sync require giữa các module
\`\`\`

### 12.3 \`go.work\` không nên commit?

Khuyến nghị Go team: **gitignore \`go.work\`** (như \`.env\`). Lý do:

- Cấu trúc workspace phụ thuộc cách dev tổ chức folder.
- CI build từng module độc lập, không cần workspace.
- Commit go.work dễ gây xung đột giữa các dev có folder khác nhau.

Nhưng monorepo (mọi dev clone cùng cây) thì commit \`go.work\` lại tiện.

> ❓ **Câu hỏi tự nhiên.**  
> **Hỏi:** \`go.work\` vs \`replace\` nên dùng cái nào?  
> **Đáp:** \`replace\` cho **1 lần fix nhanh / fork**. \`go.work\` cho **dev nhiều module song song**, mạnh hơn, không phải sửa \`go.mod\` của từng module.

> 📝 **Tóm tắt mục 12.**  
> • \`go.work\` = dev nhiều module local mà không cần \`replace\`.  
> • \`go work init/use/sync\`.  
> • Thường gitignore (trừ monorepo cố định).

---

## 13. Versioning rules — quy tắc SemVer của Go

### 13.1 Ba dải

| Dải | Backward compat? | Có thể publish? |
|---|---|---|
| \`v0.x.y\` | Không bảo đảm | Có. Phần lớn lib mới ra ở v0. |
| \`v1.x.y\` | Bảo đảm trong nội bộ \`v1\`. Bump minor/patch không break. | Có. |
| \`v2.x.y+\` | Break từ v1. **Phải đổi import path**. | Có. |

### 13.2 Quy tắc đặc biệt cho v2+

Đây là điểm khác biệt lớn của Go so với npm/Cargo:

> Khi module bump major lên v2+, **import path phải có hậu tố \`/v2\`**.

Ví dụ: module \`github.com/spf13/cobra\` ở v1 import như:

\`\`\`go
import "github.com/spf13/cobra"
\`\`\`

Nếu họ release v2, code mới phải:

\`\`\`go
import "github.com/spf13/cobra/v2"
\`\`\`

Và \`go.mod\` của upstream phải declare:

\`\`\`go.mod
module github.com/spf13/cobra/v2

go 1.22
\`\`\`

**Lý do**: với MVS chọn single instance, nếu v1 và v2 có cùng import path thì compiler không phân biệt được; với \`/v2\` suffix chúng được coi là 2 module khác nhau → có thể coexist trong build, dep nào cần v1 dùng v1, cần v2 dùng v2.

### 13.3 Workflow bump major

Cách tổ chức repo upstream khi release v2:

**Option A: subdirectory** (giữ v1 hoạt động)

\`\`\`
my-lib/
├── go.mod                  module github.com/me/my-lib  (v1)
├── ...
└── v2/
    ├── go.mod              module github.com/me/my-lib/v2  (v2)
    └── ...
\`\`\`

**Option B: branch** (mainline = v2)

\`\`\`
master branch:  go.mod module github.com/me/my-lib/v2
v1 branch:      go.mod module github.com/me/my-lib
\`\`\`

> ⚠ **Lỗi rất phổ biến.** Maintainer release \`v2.0.0\` mà quên đổi import path trong \`go.mod\`. User \`go get pkg@v2.0.0\` sẽ thấy:
>
> \`\`\`
> module declares its path as: github.com/me/my-lib
>         but was required as: github.com/me/my-lib/v2
> \`\`\`
> → user confused, raise issue. Cách fix: maintainer phải đổi \`module github.com/me/my-lib/v2\` trong \`go.mod\` của branch v2.

### 13.4 v0 → v1 và "lock in"

Khi release v1.0.0, bạn cam kết: trong toàn bộ v1.x.y, API không break. Vì vậy **nên ở v0** càng lâu càng tốt cho tới khi API thật sự ổn. Ngược lại, nhiều dự án OSS Go ở v0.X.Y nhiều năm là chuyện bình thường.

> 📝 **Tóm tắt mục 13.**  
> • v0 = unstable, v1 = stable, v2+ = đổi import path \`/v2\`.  
> • Bump major mà quên đổi import path → user xài không được.  
> • Ở v0 lâu cũng OK.

---

## 14. Publish module — push lên GitHub với SemVer tag

Module Go không cần "publish to registry" như npm. Chỉ cần:

1. Push code lên VCS public (GitHub/GitLab/Bitbucket).
2. Tạo SemVer tag.
3. pkg.go.dev tự index.

### 14.1 Sáu bước concrete

\`\`\`bash
# 1. Init module với path tương ứng repo
go mod init github.com/yourname/awesome-lib

# 2. Code, viết test, viết package doc comment
# 3. Commit
git add . && git commit -m "initial release"

# 4. Tag SemVer
git tag v1.0.0

# 5. Push code và tag
git push origin main
git push origin v1.0.0

# 6. Trigger pkg.go.dev (optional)
# Truy cập https://pkg.go.dev/github.com/yourname/awesome-lib
# hoặc:
curl "https://proxy.golang.org/github.com/yourname/awesome-lib/@v/v1.0.0.info"
\`\`\`

### 14.2 Yêu cầu tag

- Tag phải đúng format \`vX.Y.Z\` (chữ \`v\` thường).
- \`vX.Y.Z-pre.1\`, \`vX.Y.Z+build1\` OK cho prerelease/metadata.
- Tag nên trỏ vào commit \`go.mod\` đã đúng (đặc biệt với v2+, phải có suffix \`/v2\`).

### 14.3 Module cache của Go

Sau khi push tag, lần đầu ai đó \`go get github.com/yourname/awesome-lib@v1.0.0\`:

- Go proxy (\`proxy.golang.org\`) clone repo, zip lên, cache.
- Lần sau ai khác \`go get\` cùng version → lấy từ proxy cache (nhanh hơn, không kéo trực tiếp từ GitHub).
- Checksum database (\`sum.golang.org\`) lưu hash bất biến.

→ Khi bạn lỡ push một tag rồi muốn "sửa" code và force-push lại: **không sửa được**. Proxy đã cache hash khác. Phải release tag mới (\`v1.0.1\`).

> ⚠ **Lỗi thường gặp.** Push \`v1.0.0\` xong phát hiện bug. \`git tag -d v1.0.0 && git push origin :v1.0.0\` rồi tạo lại tag với commit khác. Người dùng cũ build vẫn lấy bản cũ từ proxy, người dùng mới có thể lấy bản mới — chaos. Đúng: tag tiếp \`v1.0.1\`.

> 📝 **Tóm tắt mục 14.**  
> • Push code + tag SemVer = publish.  
> • Proxy cache vĩnh viễn từng version → đừng "rewrite" tag.  
> • Đảm bảo path \`go.mod\` khớp repo URL.

---

## 15. Common pitfalls — sai lầm phổ biến

### 15.1 Import cycle (A ↔ B)

\`\`\`go
// package a
import "myapp/b"
type User struct { Logger b.Logger }
\`\`\`

\`\`\`go
// package b
import "myapp/a"
type Logger struct{}
func (l Logger) Log(u a.User) { /* ... */ }
\`\`\`

→ Compile error: \`import cycle not allowed\`.

**Cách fix: tách interface ra package thứ ba (hoặc package cha)**.

\`\`\`go
// package contracts  (không phụ thuộc a hay b)
type User interface { GetName() string }
type Logger interface { Log(User) }
\`\`\`

\`\`\`go
// package a
import "myapp/contracts"
type User struct { Name string }
func (u User) GetName() string { return u.Name }
// dùng contracts.Logger, không import b
\`\`\`

\`\`\`go
// package b
import "myapp/contracts"
type ConsoleLogger struct{}
func (cl ConsoleLogger) Log(u contracts.User) { /* ... */ }
\`\`\`

Cả \`a\` và \`b\` chỉ import \`contracts\` (one-way). Hết cycle.

### 15.2 Quên \`internal/\` cho code chưa stable

→ Nửa năm sau, có 4 repo bên ngoài đã phụ thuộc API → bạn muốn đổi tên function → mọi user gặp breaking change.

**Quy tắc thủ tục.** Khi code chưa quyết định là public API → để trong \`internal/\` trước. Chỉ "promote" ra ngoài khi chắc chắn ổn định.

### 15.3 Edit \`go.sum\` bằng tay

\`\`\`
github.com/google/uuid v1.6.0 h1:abc...   ← bạn sửa thành xyz... bằng tay
\`\`\`

→ Lần build sau: \`verifying github.com/google/uuid@v1.6.0: checksum mismatch\`. Bạn vừa làm hỏng module.

**Quy tắc.** Không bao giờ edit \`go.sum\`. Mọi update qua \`go get\` / \`go mod tidy\`.

### 15.4 Bump v2 mà không đổi import path

Maintainer:

\`\`\`bash
git tag v2.0.0 && git push origin v2.0.0
\`\`\`

Nhưng \`go.mod\` vẫn:

\`\`\`go.mod
module github.com/me/my-lib   ← thiếu /v2!
\`\`\`

→ User báo lỗi \`module declares its path as: github.com/me/my-lib but was required as: github.com/me/my-lib/v2\`. Bạn phải xoá tag (gây chaos), sửa go.mod, tag lại \`v2.0.1\`.

**Quy tắc.** Mỗi khi bump major, **đầu tiên đổi \`module\` line** trong \`go.mod\`, **rồi mới tag**.

### 15.5 Dùng \`init()\` cho I/O

Đã nói ở mục 5. Quá phổ biến nên nhắc lại.

### 15.6 \`go.mod\` \`go\` directive sai version

\`\`\`go.mod
go 1.25     ← chưa tồn tại
\`\`\`

→ Tool chain mới sẽ tự download Go 1.25 (Go 1.21+ có feature \`toolchain\` auto-download). Bản cũ thì fail.

**Quy tắc.** Đặt \`go 1.X\` ở version Go hiện tại bạn dùng.

> 📝 **Tóm tắt mục 15.**  
> 1. Import cycle → tách interface.  
> 2. Default → \`internal/\`.  
> 3. Không sửa \`go.sum\`.  
> 4. v2 phải đổi import path \`/v2\`.  
> 5. Không I/O trong init.  
> 6. \`go\` directive khớp Go bạn dùng.

---

## 16. Ứng dụng thực tế trong phần mềm

> 💡 **Package/module quyết định codebase dễ bảo trì hay thành "big ball of mud".** Quản lý dependency + bố cục package là kỹ năng kiến trúc thật.

| Khái niệm | Trong dự án thật |
|-----------|------------------|
| **\`go.mod\` + semantic versioning** | Khóa version dependency, reproducible build |
| **Exported (Hoa) vs unexported (thường)** | API công khai của package vs nội bộ ẩn |
| **\`internal/\`** | Code chỉ dùng nội bộ module, cấm import từ ngoài |
| **Bố cục theo domain** | \`user/\`, \`order/\`, \`payment/\` thay vì \`models/\`, \`controllers/\` |
| **\`go.sum\` + vendoring** | Đảm bảo dependency không bị đổi ngầm (supply chain) |

### 16.1. Ví dụ cụ thể — \`internal/\` chặn import sai

Đặt code vào \`myapp/internal/db\` → **chỉ** code trong \`myapp/\` import được; package ngoài (\`github.com/other/...\`) import sẽ **lỗi compile**. Dùng để: ẩn chi tiết triển khai, giữ API công khai nhỏ, ngăn người khác phụ thuộc vào nội bộ bạn có thể đổi. Đây là cách thư viện/service Go kiểm soát ranh giới — encapsulation ở tầng package.

> ⚠ **Bẫy — import cycle (A import B, B import A) không compile.** Go cấm vòng import. Gặp khi tách package sai (vd \`user\` và \`order\` import nhau). Sửa: tách interface ra package thứ ba, hoặc gộp/đảo phụ thuộc. Quy tắc: phụ thuộc nên một chiều (domain → không phụ thuộc ngược lên handler). Bố cục **theo domain** (user/order/payment) thường ít cycle hơn theo layer (models/controllers).

### 16.2. 📝 Tóm tắt mục 16

- \`go.mod\`/semver khóa dependency; **\`internal/\`** ẩn code nội bộ (cấm import ngoài); Hoa/thường = public/private.
- **Import cycle cấm** trong Go → tách interface hoặc đảo phụ thuộc; phụ thuộc một chiều.
- Bố cục **theo domain** (user/order) dễ bảo trì hơn theo layer; \`go.sum\` chống supply-chain.

## 17. Bài tập

### Bài tập 1 — Module mới có 2 sub-package

Tạo module \`math-utils\` (path: \`github.com/me/math-utils\`) với cấu trúc:

\`\`\`
math-utils/
├── go.mod
├── stats/
│   └── stats.go        package stats — chứa Mean, Median
└── geom/
    └── geom.go         package geom — chứa Circle{Radius float64} + (Circle) Area()
\`\`\`

Viết một file \`main.go\` ở root (\`package main\`) demo dùng cả 2.

### Bài tập 2 — Đọc \`go.mod\` mẫu

Cho \`go.mod\` sau, giải thích từng dòng:

\`\`\`go.mod
module github.com/acme/api

go 1.22

require (
    github.com/gin-gonic/gin v1.9.1
    github.com/jackc/pgx/v5 v5.5.0
)

require (
    github.com/bytedance/sonic v1.9.1 // indirect
    golang.org/x/sys v0.18.0 // indirect
)

replace github.com/acme/legacy => ./vendor-local/legacy

exclude github.com/badpkg/lib v0.4.0
\`\`\`

### Bài tập 3 — MVS scenario

Cho 3 module với các yêu cầu (tất cả version dùng SemVer):

\`\`\`
my-app:
  require A v1.2.0
  require B v1.0.0

A v1.2.0:
  require X v1.5.0
  require Y v0.3.0

B v1.0.0:
  require X v1.7.0
  require Y v0.4.0
  require Z v2.1.0
\`\`\`

Hỏi: build set cuối cùng (X, Y, Z, A, B) là version nào?

### Bài tập 4 — Sửa import cycle

Code dưới đây có cycle. Refactor cho compile được:

\`\`\`go
// package user
import "myapp/audit"
type User struct{ Name string }
func (u User) Save() { audit.Log(u) }
\`\`\`

\`\`\`go
// package audit
import "myapp/user"
func Log(u user.User) { /* ghi log */ }
\`\`\`

### Bài tập 5 — \`replace\` local dev

Bạn có hai module:

\`\`\`
~/code/myorg-fork/
~/code/my-app/
\`\`\`

\`my-app\` dùng \`github.com/myorg/lib v1.2.0\`. Bạn vừa clone fork về \`myorg-fork\`, muốn \`my-app\` build từ folder local đó để test. Viết các dòng cần thêm vào \`my-app/go.mod\`.

### Bài tập 6 — Publish module

Bạn vừa code xong lib \`github.com/duy/strutils\`. Liệt kê các bước (command line) để release \`v1.0.0\` lên pkg.go.dev.

### Bài tập 7 — Phát hiện anti-pattern trong \`init()\`

Code dưới đây có anti-pattern gì? Refactor lại:

\`\`\`go
package db

import (
    "database/sql"
    "os"
)

var DB *sql.DB

func init() {
    var err error
    DB, err = sql.Open("postgres", os.Getenv("DB_URL"))
    if err != nil {
        panic(err)
    }
}
\`\`\`

### Bài tập 8 — \`internal/\` quy tắc visibility

Có cấu trúc:

\`\`\`
github.com/me/proj/
├── go.mod
├── cmd/
│   └── server/
│       └── main.go
├── pkg/
│   └── public.go
└── shared/
    ├── util.go
    └── internal/
        └── helper/
            └── helper.go
\`\`\`

Hỏi: file nào import được \`github.com/me/proj/shared/internal/helper\`?  
(a) \`cmd/server/main.go\`?  
(b) \`pkg/public.go\`?  
(c) \`shared/util.go\`?  
(d) Một module khác hoàn toàn \`github.com/another/x/y.go\`?

---

## 18. Lời giải chi tiết

### Giải bài 1

**\`go.mod\`:**

\`\`\`go.mod
module github.com/me/math-utils

go 1.22
\`\`\`

**\`stats/stats.go\`:**

\`\`\`go
// Package stats cung cấp phép thống kê cơ bản.
package stats

// Mean trả về trung bình cộng. Trả 0 nếu input rỗng.
func Mean(xs []float64) float64 {
    if len(xs) == 0 { return 0 }
    var sum float64
    for _, x := range xs { sum += x }
    return sum / float64(len(xs))
}

// Median trả về trung vị (input giả định đã sort).
func Median(sorted []float64) float64 {
    n := len(sorted)
    if n == 0 { return 0 }
    if n%2 == 1 { return sorted[n/2] }
    return (sorted[n/2-1] + sorted[n/2]) / 2
}
\`\`\`

**\`geom/geom.go\`:**

\`\`\`go
// Package geom cung cấp hình học phẳng.
package geom

import "math"

type Circle struct {
    Radius float64
}

func (c Circle) Area() float64 { return math.Pi * c.Radius * c.Radius }
\`\`\`

**\`main.go\`:**

\`\`\`go
package main

import (
    "fmt"

    "github.com/me/math-utils/geom"
    "github.com/me/math-utils/stats"
)

func main() {
    fmt.Println(stats.Mean([]float64{1, 2, 3, 4, 5})) // 3
    fmt.Println(geom.Circle{Radius: 2}.Area())        // 12.566...
}
\`\`\`

### Giải bài 2

\`\`\`go.mod
module github.com/acme/api         // module path — định danh khi import từ ngoài

go 1.22                            // version Go tối thiểu để build

require (
    github.com/gin-gonic/gin v1.9.1                 // dep trực tiếp (code mình import)
    github.com/jackc/pgx/v5 v5.5.0                  // dep trực tiếp, v5+ → có /v5 trong path
)

require (
    github.com/bytedance/sonic v1.9.1 // indirect   // gin dùng sonic, mình ko import trực tiếp
    golang.org/x/sys v0.18.0 // indirect            // tương tự
)

replace github.com/acme/legacy => ./vendor-local/legacy   // đè path dep tới folder local

exclude github.com/badpkg/lib v0.4.0                       // cấm dùng bản 0.4.0 (có bug)
\`\`\`

### Giải bài 3

Áp dụng MVS = max của các requirement cho từng module:

| Module | Requirements thấy | Chọn |
|---|---|---|
| A | v1.2.0 (root) | **v1.2.0** |
| B | v1.0.0 (root) | **v1.0.0** |
| X | v1.5.0 (A), v1.7.0 (B) | max = **v1.7.0** |
| Y | v0.3.0 (A), v0.4.0 (B) | max = **v0.4.0** |
| Z | v2.1.0 (B) | **v2.1.0** (lưu ý: Z có suffix \`/v2\` trong import path) |

### Giải bài 4

Tách interface ra package trung gian (hoặc inline interface trong audit/user).

**Cách A: package \`contracts\`:**

\`\`\`go
// package contracts
type AuditableUser interface { GetName() string }
\`\`\`

\`\`\`go
// package user
package user

import "myapp/audit"

type User struct{ Name string }
func (u User) GetName() string { return u.Name }
func (u User) Save() { audit.Log(u) } // truyền user.User, audit nhận interface
\`\`\`

\`\`\`go
// package audit
package audit

import "myapp/contracts"

func Log(u contracts.AuditableUser) {
    // ghi log u.GetName()
}
\`\`\`

\`audit\` không còn import \`user\` → cycle gone.

**Cách B (đơn giản hơn): inline interface trong \`audit\`:**

\`\`\`go
// package audit
package audit

type Auditable interface { GetName() string }
func Log(u Auditable) { /* ... */ }
\`\`\`

\`user\` import \`audit\`, \`audit\` không import \`user\`. Cycle hết.

### Giải bài 5

Thêm vào \`~/code/my-app/go.mod\`:

\`\`\`go.mod
require github.com/myorg/lib v1.2.0    // giữ require gốc, đề tham chiếu

replace github.com/myorg/lib => ../myorg-fork
\`\`\`

Cụ thể đường dẫn tương đối: \`my-app\` ở \`~/code/my-app/\`, fork ở \`~/code/myorg-fork/\` → \`../myorg-fork\` đúng.

Sau khi xong việc dev: xoá dòng \`replace\`, đổi \`require\` về version chính thức (vd \`v1.2.1\`).

### Giải bài 6

\`\`\`bash
# 0. đảm bảo go.mod đúng path
cd ~/code/strutils
cat go.mod          # module github.com/duy/strutils

# 1. commit code
git add . && git commit -m "v1.0.0"

# 2. tag SemVer
git tag v1.0.0

# 3. push code + tag
git remote add origin git@github.com:duy/strutils.git   # nếu chưa có
git push origin main
git push origin v1.0.0

# 4. trigger module proxy index (optional, nó tự index sau vài phút)
GOPROXY=https://proxy.golang.org go list -m github.com/duy/strutils@v1.0.0

# 5. mở pkg.go.dev/github.com/duy/strutils để xem doc
\`\`\`

### Giải bài 7

**Anti-pattern.**

1. \`sql.Open\` trong \`init()\` → mọi consumer của package \`db\` (kể cả test) đều phải có \`DB_URL\` env, fail loud (panic) nếu không có.
2. Không có cách inject mock cho test.
3. \`init()\` chạy lúc load — connection có thể stale khi process chạy lâu, không retry.

**Refactor:**

\`\`\`go
package db

import "database/sql"

type Config struct {
    DSN string
    // future: maxConns, timeouts, ...
}

// New khởi tạo connection. Trả về (*sql.DB, error) — caller xử lý.
func New(cfg Config) (*sql.DB, error) {
    db, err := sql.Open("postgres", cfg.DSN)
    if err != nil {
        return nil, err
    }
    if err := db.Ping(); err != nil {
        _ = db.Close()
        return nil, err
    }
    return db, nil
}
\`\`\`

\`main.go\`:

\`\`\`go
db, err := db.New(db.Config{DSN: os.Getenv("DB_URL")})
if err != nil { log.Fatal(err) }
defer db.Close()
\`\`\`

Test:

\`\`\`go
mockDB, _ := db.New(db.Config{DSN: "file::memory:?mode=memory"})
\`\`\`

### Giải bài 8

Quy tắc: package \`internal/X\` chỉ import được từ cây có cha gần nhất chứa \`internal\`. Ở đây cha = \`shared/\`. Mọi code dưới \`shared/...\` import được. Bên ngoài \`shared/\` thì không.

| File | Đường dẫn | Có thể import \`shared/internal/helper\`? |
|---|---|---|
| (a) | \`cmd/server/main.go\` | ❌ (không nằm dưới \`shared/\`) |
| (b) | \`pkg/public.go\` | ❌ |
| (c) | \`shared/util.go\` | ✅ (con của \`shared/\`) |
| (d) | repo khác | ❌ |

Để (a), (b) dùng được helper, bạn phải re-export qua \`shared/public.go\`:

\`\`\`go
// shared/public.go
package shared

import "github.com/me/proj/shared/internal/helper"

func DoX() { helper.Internal() }    // re-export gián tiếp
\`\`\`

---

## 19. Code & Minh hoạ

- File code mẫu: [\`solutions.go\`](./solutions.go) — chạy bằng \`go run solutions.go\`. Demo: package doc, public/private, init, dùng \`github.com/google/uuid\`.
- Visualization: [\`visualization.html\`](./visualization.html) — 3 module tương tác:
  - **Module 1**: Internal package boundary — animate import từ trong cây (xanh) vs ngoài cây (đỏ).
  - **Module 2**: MVS selector — cho 3 module + constraint, animate Go chọn version cuối cùng.
  - **Module 3**: Module dependency graph — paste \`go.mod\` text, parse, vẽ DAG.

---

## 20. Bài tiếp theo

- [Lesson 21 — IO Streaming](../lesson-21-io-streaming/) (tiếp theo): \`io.Reader\`, \`io.Writer\`, pipe, file streaming, buffered IO.
- Để đào sâu hơn về toolchain: \`go vet\`, \`go test\`, \`go test -race\`, \`staticcheck\`, \`golangci-lint\` — sẽ học ở các lesson chuyên về testing & quality (Tier 3).
- Tham khảo:
  - [Go Modules Reference](https://go.dev/ref/mod) — bản chính thức, đáng đọc.
  - [Russ Cox — Minimum Version Selection](https://research.swtch.com/vgo-mvs) — paper gốc MVS.
  - [Effective Go — Names](https://go.dev/doc/effective_go#names) — quy ước đặt tên.

---

*Lesson này thuộc Tier 2 — Intermediate. Sau khi học, bạn nên có khả năng cấu trúc project Go thực tế, hiểu dependency graph, và xử lý mọi vấn đề liên quan tới module trong code review.*
`;
