// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: Programming/lesson-06-hello-world-toolchain/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 06 — Hello World & Toolchain Go

> Tier 1 — Lesson 1/12. Sau khi đã chạy được hello world ở L05, lesson này đi sâu vào **toolchain Go** — bộ công cụ bạn sẽ dùng MỖI ngày khi viết Go: \`go run\`, \`go build\`, \`go install\`, \`go mod\`, \`go fmt\`, \`go vet\`, \`go doc\`, cross-compile, embed, build flag.

## Mục tiêu học

Sau lesson này, bạn sẽ:

1. Phân biệt rõ \`go run\` vs \`go build\` vs \`go install\` — khi nào dùng cái nào.
2. Hiểu **package** trong Go: cùng folder = cùng package, public/private theo chữ cái đầu.
3. Biết \`import\` 5 dạng: single, group, alias, blank \`_\`, dot \`.\`.
4. Tạo và quản lý **Go module**: \`go mod init\`, \`go.mod\`, \`go.sum\`, \`go mod tidy\`, \`go get\`.
5. Cross-compile binary cho linux/amd64, linux/arm64, darwin/arm64, windows/amd64 bằng \`GOOS\`/\`GOARCH\`.
6. Dùng \`//go:embed\` nhúng file (config, template) vào binary.
7. Inject biến lúc build bằng \`-ldflags="-X main.version=..."\` và giảm size binary bằng \`-ldflags="-s -w"\`.
8. Quen tay với \`go fmt\`, \`go vet\`, \`go doc\`.

## Tiền đề

- [Lesson 05 — Vì sao Go?](../lesson-05-why-go-philosophy/) — đã cài Go, chạy được \`go run hello.go\`.
- [Lesson 03 — Command line](../lesson-03-command-line-mastery/) — biết cd / ls / set biến môi trường.

---

## 1. \`go run\` vs \`go build\` vs \`go install\` — 3 anh em bị nhầm lẫn

> 💡 **Trực giác**: hãy hình dung như nấu ăn. \`go run\` = "ăn ngay tại bếp, không lưu phần thừa" (compile vào folder tạm, chạy, xóa). \`go build\` = "đóng hộp mang về" (lưu binary ra file). \`go install\` = "đóng hộp cất vào tủ chung của cả nhà" (binary copy vào thư mục \`$GOBIN\` để gõ tên ở bất kỳ đâu là chạy được).

### 1.1 \`go run\` — chạy tạm, không lưu

\`\`\`bash
$ go run hello.go
Hello, World!
\`\`\`

**Cơ chế bên trong** (đáng để tận mắt):

\`\`\`bash
$ go run -x hello.go 2>&1 | head -20
# /tmp/go-build3712450/b001/exe/hello   <-- compile vào tempdir
WORK=/tmp/go-build3712450
mkdir -p $WORK/b001/
...
$WORK/b001/exe/hello                    <-- exec rồi xoá khi xong
\`\`\`

Lệnh \`go run\` thực ra **build vào \`/tmp/go-build.../exe/<name>\`, exec, rồi dọn dẹp**. Mỗi lần chạy = build lại (có cache nên lần 2 nhanh).

**Khi nào dùng**:

- Đang **viết / debug** một script ngắn — sửa code → \`go run\` → xem output → sửa tiếp. Vòng lặp REPL-style.
- Chạy **script một lần** (vd migration, seed dữ liệu) — không cần lưu binary.
- Demo / pet project.

**Không nên dùng khi**: deploy production (mỗi lần chạy phải compile lại, máy server thường không có Go installed).

### 1.2 \`go build\` — biên dịch ra binary đứng yên

\`\`\`bash
$ go build hello.go        # output: ./hello (linux/mac) hoặc hello.exe (windows)
$ ./hello
Hello, World!
\`\`\`

Hoặc build từ module:

\`\`\`bash
$ cd myapp/
$ go build .               # build package main ở folder hiện tại → ./myapp
$ go build -o bin/app .    # custom output path
\`\`\`

**Khi nào dùng**:

- Cần **artifact** để chạy sau (CI/CD, Docker image, copy lên server).
- Test thời gian compile thật.
- Phân phối binary cho team / user khác.

> ❓ **Câu hỏi tự nhiên**: "Vậy \`go build\` xong tôi có thể \`scp\` binary qua server không cần Go ở đó?" → **Có!** Đây là điểm bán hàng số 1 của Go: binary là **single static file**, không phụ thuộc runtime/libc (mặc định CGO=off khi cross-compile). Bạn copy file \`./myapp\` qua một Ubuntu 18 hay 24 đều chạy.

### 1.3 \`go install\` — build và copy vào \`$GOBIN\`

\`\`\`bash
$ go install github.com/user/tool@latest
# tải, build, copy binary vào ~/go/bin/tool
$ tool                       # chạy luôn từ bất cứ đâu (nếu $GOBIN trong $PATH)
\`\`\`

Đường đi của binary:

1. \`$GOBIN\` nếu set.
2. Nếu không có thì \`$GOPATH/bin\` (mặc định \`~/go/bin\`).

**Khi nào dùng**:

- Cài CLI tool viết bằng Go từ internet (vd \`staticcheck\`, \`gopls\`, \`air\`, \`migrate\`).
- Cài chính tool của mình vào local để gõ tên là chạy.

> ⚠ **Lỗi thường gặp**: nhầm \`go install ./...\` (cài binary trong project hiện tại) với \`go install github.com/x/y@latest\` (cài từ remote). Cả hai đều hợp lệ nhưng ý nghĩa khác hẳn — cái đầu cần \`go.mod\` của project, cái sau tự fetch module remote.

### 1.4 So sánh bảng tổng

| Lệnh | Output | Vị trí | Khi dùng |
|------|--------|--------|----------|
| \`go run\` | binary tạm | \`/tmp/go-build.../exe/...\` | Dev/debug nhanh, script một lần |
| \`go build\` | binary cố định | folder hiện tại (hoặc \`-o\`) | Deploy, CI artifact, test build time |
| \`go install\` | binary | \`$GOBIN\` (\`~/go/bin\`) | Cài CLI tool dùng toàn máy |

> 🔁 **Tự kiểm tra**: Tôi đang viết một script đọc CSV → tính tổng → in. Đang sửa code 30 lần / phút. Nên dùng \`go run\`, \`go build\`, hay \`go install\`?
>
> <details><summary>Đáp án</summary>
> \`go run\`. Đang ở vòng lặp dev nhanh, không cần binary cố định, không phân phối cho ai.
> </details>

### 1.5 Ví dụ thực tế — Docker multi-stage build

\`\`\`dockerfile
# Stage 1: build
FROM golang:1.22 AS builder
WORKDIR /app
COPY go.mod go.sum ./
RUN go mod download
COPY . .
RUN go build -o /out/app .          # <-- go build, ra binary tĩnh

# Stage 2: chạy
FROM gcr.io/distroless/static
COPY --from=builder /out/app /app
ENTRYPOINT ["/app"]
\`\`\`

Image cuối **không có Go installed**, chỉ có file binary ~10MB → image total ~12MB. Đây là lý do Go rất hợp với container.

---

## 2. Package — đơn vị tổ chức code

> 💡 **Trực giác**: package = "thư mục có một mục đích". Folder \`strings/\` trong stdlib chứa tất cả về xử lý chuỗi; folder \`net/http/\` chứa tất cả về HTTP server/client. Code trong cùng folder = **cùng package**, biên dịch cùng nhau, chia sẻ scope.

### 2.1 Quy tắc package

1. **Mỗi file \`.go\` bắt buộc bắt đầu bằng \`package <tên>\`** ở dòng đầu.
2. **Tất cả file trong cùng folder phải khai báo cùng \`package\`** (trừ \`_test.go\` có thể là \`<pkg>_test\`).
3. Tên folder = tên package theo convention, KHÔNG bắt buộc (folder \`mathutil/\` chứa \`package math\` vẫn được, nhưng lạ).
4. **Đúng một** package có thể là \`package main\` — đây là entry point, **bắt buộc** có hàm \`func main()\`. Package khác không có \`main()\`.

### 2.2 \`package main\` vs \`package <tên>\`

\`\`\`go
// File: cmd/myapp/main.go
package main

import "fmt"

func main() {
    fmt.Println("Hello")
}
\`\`\`

\`\`\`go
// File: greeter/greeter.go
package greeter

import "fmt"

func Hello(name string) {       // 'H' viết hoa = public
    fmt.Println("Hello,", name)
}

func internalLog(msg string) {  // 'i' viết thường = private trong package
    fmt.Println("[debug]", msg)
}
\`\`\`

### 2.3 Public vs Private — quy tắc viết hoa

Đây là điểm Go rất khác Java/Python: **không có từ khóa \`public\`/\`private\`**, mà dùng **chữ cái đầu**:

| Identifier | Visibility |
|------------|------------|
| \`Foo\`, \`BarBaz\`, \`Calculate\` | **Public** — xuất khẩu được, package khác \`import\` rồi dùng \`pkg.Foo\` |
| \`foo\`, \`barBaz\`, \`calculate\` | **Private** — chỉ dùng trong package cùng folder |

Áp dụng cho **tất cả**: hàm, biến, constant, type, struct field, method.

\`\`\`go
type User struct {
    Name     string  // public — JSON marshal được, package khác đọc được
    age      int     // private — chỉ code trong cùng package thấy
}
\`\`\`

> ⚠ **Lỗi thường gặp**: tạo struct dùng cho JSON nhưng field viết thường → \`json.Marshal\` ra \`{}\` rỗng. Phải viết hoa:
>
> \`\`\`go
> // SAI
> type Config struct { port int; host string }     // → {} khi marshal
> // ĐÚNG
> type Config struct { Port int; Host string }     // → {"Port":8080,"Host":"localhost"}
> \`\`\`

> ❓ **Câu hỏi tự nhiên**: "Nếu tôi có 2 file \`a.go\` và \`b.go\` cùng folder, \`a.go\` có \`func compute()\` (private), \`b.go\` gọi được không?" → **Có**. "Cùng package = cùng scope". Private chỉ chặn package KHÁC, không chặn file khác cùng package.

### 2.4 Ví dụ — module với 2 package

Cấu trúc:

\`\`\`
hello/
├── go.mod
├── main.go
└── greeter/
    └── greeter.go
\`\`\`

\`go.mod\`:
\`\`\`
module hello

go 1.22
\`\`\`

\`greeter/greeter.go\`:
\`\`\`go
package greeter

func Hello(name string) string {
    return "Xin chào, " + name + "!"
}
\`\`\`

\`main.go\`:
\`\`\`go
package main

import (
    "fmt"
    "hello/greeter"        // <-- module name (hello) + folder (greeter)
)

func main() {
    fmt.Println(greeter.Hello("Duy"))
}
\`\`\`

Chạy: \`go run .\` → \`Xin chào, Duy!\`

> 📝 **Tóm tắt mục 2**:
> - Mỗi \`.go\` mở đầu bằng \`package <tên>\`.
> - File cùng folder = cùng package.
> - \`package main\` + \`func main()\` = entry point (đúng 1 mỗi binary).
> - Public/private quyết định bằng **chữ cái đầu viết hoa/thường** — không có keyword.

---

## 3. Import — 5 dạng phải biết

\`\`\`go
// (1) Single
import "fmt"

// (2) Group — chuẩn nhất, dùng cho >1 import
import (
    "fmt"
    "os"
    "github.com/google/uuid"
)

// (3) Alias — đổi tên local
import (
    cryptorand "crypto/rand"
    mathrand   "math/rand"
)

// (4) Blank import — chạy init() nhưng không dùng symbol
import _ "github.com/lib/pq"      // register Postgres driver

// (5) Dot import — đưa symbol vào scope hiện tại (TRÁNH)
import . "fmt"
// Println("hi")   // không cần fmt.Println nữa
\`\`\`

### 3.1 Khi nào alias

- **Tránh đụng tên**: 2 package cùng tên \`rand\` (\`crypto/rand\` và \`math/rand\`) → alias 1 trong 2.
- **Rút gọn tên dài**: \`pb "github.com/myorg/myapp/internal/protobuf/v1"\`.

### 3.2 Blank import \`_\` — dùng để làm gì?

Để **chạy \`init()\` của package** mà không dùng symbol nào. Pattern phổ biến nhất: register driver database/SQL:

\`\`\`go
import (
    "database/sql"
    _ "github.com/lib/pq"        // <-- chỉ chạy init(), đăng ký driver "postgres"
)

func main() {
    db, _ := sql.Open("postgres", "...")
    _ = db
}
\`\`\`

Không có blank import → \`sql.Open("postgres", ...)\` báo \`unknown driver\`.

### 3.3 Dot import \`.\` — vì sao tránh

Đưa toàn bộ symbol public của package vào scope local — code đọc như magic, không biết hàm từ đâu ra. Chỉ chấp nhận trong **test file** thỉnh thoảng (vd \`import . "github.com/onsi/ginkgo/v2"\` cho BDD-style test). Ngoài ra: **đừng dùng**.

> ⚠ **Lỗi thường gặp**: import package nhưng không dùng → Go **báo lỗi compile**, không phải warning:
>
> \`\`\`
> ./main.go:4:2: imported and not used: "os"
> \`\`\`
>
> Đây là design có chủ ý — Go ép code sạch. Cách fix: xoá import, hoặc dùng blank \`_ "os"\` nếu thật sự cần init.

> 🔁 **Tự kiểm tra**: package \`github.com/lib/pq\` không có hàm nào tôi gọi trực tiếp, nhưng tôi vẫn cần nó. Import thế nào?
>
> <details><summary>Đáp án</summary>
>
> \`\`\`go
> import _ "github.com/lib/pq"
> \`\`\`
>
> Blank import — chạy \`init()\` đăng ký driver, không cần symbol.
> </details>

---

## 4. Go modules — quản lý dependency

> 💡 **Trực giác**: module = "một project Go có thể release version độc lập". Cũng giống \`package.json\` (npm) / \`Cargo.toml\` (Rust) / \`requirements.txt\` (Python). File \`go.mod\` ghi danh sách dependency + version, \`go.sum\` ghi checksum để verify chống bị thay đổi.

### 4.1 Lịch sử ngắn — GOPATH cũ vs module mới

- **2009–2018 (GOPATH mode)**: mọi code phải đặt trong \`$GOPATH/src/<đường-dẫn>\`. Import path = đường dẫn vật lý. Không có version → khổ sở.
- **2018 (Go 1.11) — modules ra đời**: project ở bất cứ đâu, có file \`go.mod\`. Dependency có version chính xác.
- **2021 (Go 1.16)**: module mode = default. GOPATH legacy.
- **Ngày nay**: **luôn dùng module**. Quên GOPATH đi (chỉ còn là nơi cache + chứa binary từ \`go install\`).

### 4.2 Khởi tạo module

\`\`\`bash
$ mkdir myapp && cd myapp
$ go mod init github.com/duynh/myapp
go: creating new module github.com/duynh/myapp
$ cat go.mod
module github.com/duynh/myapp

go 1.22
\`\`\`

**Quy tắc đặt tên module**:

- Theo convention: \`<host>/<user>/<repo>\`. Vd \`github.com/google/uuid\`.
- Cho dự án private/local có thể đơn giản: \`myapp\`, \`internal/tool\`, ...
- Tên này = **prefix import path** cho mọi package con trong module.

### 4.3 Thêm dependency — \`go get\`

\`\`\`bash
$ go get github.com/google/uuid@v1.6.0       # version cụ thể
$ go get github.com/google/uuid@latest        # latest stable
$ go get github.com/google/uuid               # = @latest

# go.mod được cập nhật:
# require github.com/google/uuid v1.6.0
# go.sum xuất hiện với checksum.
\`\`\`

Dùng trong code:

\`\`\`go
package main

import (
    "fmt"
    "github.com/google/uuid"
)

func main() {
    id := uuid.New()
    fmt.Println(id)        // vd: 7c9e6679-7425-40de-944b-e07fc1f90ae7
}
\`\`\`

### 4.4 Đọc \`go.mod\`

Ví dụ file \`go.mod\` của một service nhỏ:

\`\`\`
module github.com/duynh/api

go 1.22

require (
    github.com/gin-gonic/gin v1.9.1
    github.com/golang-jwt/jwt/v5 v5.2.0
    github.com/google/uuid v1.6.0
)

require (
    github.com/gabriel-vasile/mimetype v1.4.2 // indirect
    github.com/go-playground/validator/v10 v10.14.0 // indirect
    // ... rất nhiều indirect
)
\`\`\`

Giải thích từng dòng:

- \`module github.com/duynh/api\` — tên module này, dùng làm prefix import.
- \`go 1.22\` — version Go tối thiểu để build (không phải bắt buộc, chỉ là gợi ý compiler).
- \`require (...)\` đầu tiên: **direct dependency** — package bạn import trực tiếp trong code.
- \`require (...)\` thứ hai có \`// indirect\`: **transitive dependency** — package mà dependency của bạn cần (vd \`gin\` cần \`mimetype\`).

### 4.5 \`go.sum\` — checksum để chống tampering

\`\`\`
github.com/google/uuid v1.6.0 h1:NIvaJDMOsjHA8n1jAhLSgzrAzy1Hgr+hNrb57e+94F0=
github.com/google/uuid v1.6.0/go.mod h1:TIyPZe4MgqvfeYDBFedMoGGpEw/LqOeaOT+nhxU+yHo=
\`\`\`

Mỗi version có 2 hash: của module và của \`go.mod\`. Khi bạn \`go build\`, Go check hash đã download trùng với \`go.sum\` không — nếu khác → từ chối build (chống ai đó hack mirror để chèn malware).

**Đừng sửa tay \`go.sum\`**. Chỉ commit nó vào git.

### 4.6 \`go mod tidy\` — dọn dẹp

\`\`\`bash
$ go mod tidy
\`\`\`

Làm 3 việc:

1. **Thêm** require cho mọi package mà code đang import nhưng \`go.mod\` chưa ghi.
2. **Xoá** require cho package không còn dùng.
3. **Cập nhật \`go.sum\`** đồng bộ với \`go.mod\`.

Chạy \`go mod tidy\` trước mỗi commit là practice tốt.

### 4.7 \`go mod download\` — pre-download

\`\`\`bash
$ go mod download
\`\`\`

Tải toàn bộ dependency về local cache (\`$GOPATH/pkg/mod/\`) **không build gì cả**. Dùng trong Docker build để tận dụng layer cache:

\`\`\`dockerfile
COPY go.mod go.sum ./
RUN go mod download       # <-- layer này chỉ rebuild khi go.mod/go.sum đổi
COPY . .
RUN go build ...          # <-- code đổi không cần re-download dep
\`\`\`

> ❓ **Câu hỏi tự nhiên**: "Tôi xóa folder \`~/go/pkg/mod/\` thì sao?" → **Không sao**. Lần build tới \`go\` tự re-download từ proxy (\`proxy.golang.org\`). Folder này thuần là cache.

> 🔁 **Tự kiểm tra**: Bạn vừa clone một repo Go từ git. Việc đầu tiên cần làm trước khi \`go build\`?
>
> <details><summary>Đáp án</summary>
> Không cần làm gì — \`go build\` tự đọc \`go.mod\`/\`go.sum\`, tải dependency, rồi build. Một dòng là xong. (Khác hẳn \`npm install\` của Node).
> </details>

### 4.8 Workspace mode (\`go.work\`) — đa module trong 1 repo

Khi nào cần: bạn đang sửa **đồng thời** 2 module liên quan, vd \`myapp\` import \`mylib\`, và muốn thử lib mới chưa publish.

\`\`\`bash
$ mkdir workspace && cd workspace
$ git clone ...mylib   # version đang sửa
$ git clone ...myapp
$ go work init ./mylib ./myapp

$ cat go.work
go 1.22

use (
    ./mylib
    ./myapp
)
\`\`\`

Khi build \`myapp\`, Go thấy \`go.work\` → dùng \`mylib\` ở folder local, không tải bản đã publish. Tiện cho develop monorepo.

Không bao giờ commit \`go.work\` lên repo public — đây là file dev-local.

> 📝 **Tóm tắt mục 4**:
> - \`go mod init <name>\` mở đầu module.
> - \`go get pkg@version\` thêm dep, tự cập nhật \`go.mod\` + \`go.sum\`.
> - \`go mod tidy\` chạy trước commit để đồng bộ.
> - \`go.sum\` = checksum chống tampering, commit nhưng đừng sửa tay.
> - GOPATH = quá khứ, dùng module.
> - \`go.work\` để dev đồng thời nhiều module local.

---

## 5. \`go fmt\`, \`go vet\`, \`go doc\` — 3 trợ thủ hằng ngày

### 5.1 \`go fmt\` — format chuẩn

\`\`\`bash
$ go fmt ./...           # format mọi file .go trong module
\`\`\`

Áp dụng chuẩn format duy nhất của Go (gofmt). **Không thảo luận tab vs space**: Go đã chọn — tab indent, brace cuối dòng. Mọi IDE Go nên cấu hình "format on save".

### 5.2 \`go vet\` — static check

\`\`\`bash
$ go vet ./...
./main.go:12:9: Printf format %d has arg "hi" of wrong type string
\`\`\`

Phát hiện một số lỗi compiler không bắt được nhưng chắc chắn sai: format string mismatch, lock copy, unreachable code, ...

Chạy trước mỗi commit / trong CI.

### 5.3 \`go doc\` — xem docs offline

\`\`\`bash
$ go doc fmt.Println
func Println(a ...any) (n int, err error)
    Println formats using the default formats for its operands and writes to
    standard output. ...

$ go doc -all strings           # tất cả symbol trong package strings
$ go doc strings.Builder        # docs về Builder type
\`\`\`

Cực nhanh, không cần mở browser. Bonus: docs render từ comment ngay trong source — bạn viết comment chuẩn cũng được hiển thị.

---

## 6. Cross-compile — build cho OS/arch khác

> 💡 **Trực giác**: bạn dev trên Mac M1 (darwin/arm64) nhưng deploy trên server Ubuntu Intel (linux/amd64). Go compiler có thể tạo binary chạy được trên **bất kỳ** OS/arch mục tiêu nào, ngay từ Mac của bạn, không cần emulator.

### 6.1 Cú pháp

\`\`\`bash
$ GOOS=linux GOARCH=amd64 go build -o app-linux .
$ GOOS=darwin GOARCH=arm64 go build -o app-mac .
$ GOOS=windows GOARCH=amd64 go build -o app.exe .
\`\`\`

### 6.2 Bảng kết hợp phổ biến

| GOOS | GOARCH | Dùng cho |
|------|--------|----------|
| \`linux\` | \`amd64\` | Server x86-64 (Ubuntu, Debian, CentOS) — **mặc định prod** |
| \`linux\` | \`arm64\` | AWS Graviton, Raspberry Pi 64-bit, server ARM |
| \`darwin\` | \`arm64\` | Mac M1/M2/M3/M4 |
| \`darwin\` | \`amd64\` | Mac Intel (cũ) |
| \`windows\` | \`amd64\` | Windows 10/11 desktop, Windows Server |
| \`windows\` | \`arm64\` | Surface Pro X, Mac M1 với Parallels |
| \`freebsd\` | \`amd64\` | FreeBSD server |

Xem đầy đủ: \`go tool dist list\`.

### 6.3 Ví dụ thực tế — build cho Docker từ Mac

\`\`\`bash
# Mac dev → image cho server linux
$ GOOS=linux GOARCH=amd64 CGO_ENABLED=0 go build -o app .
$ docker build -t myapp .

# Hoặc trong Dockerfile multi-stage, dùng official Go image (đã là linux):
# RUN go build -o /out/app .
\`\`\`

\`CGO_ENABLED=0\` quan trọng — tắt CGO để binary tĩnh hoàn toàn (không link vào libc), chạy được trên image \`scratch\`/\`distroless\` mỏng tang.

> ⚠ **Lỗi thường gặp**: build từ Mac quên set \`GOOS=linux\` → ra binary darwin → copy vào image linux → \`exec format error\`. Luôn set explicit khi build cho prod.

---

## 7. \`//go:embed\` — nhúng file vào binary

> 💡 **Trực giác**: thay vì deploy binary + folder \`templates/\` + folder \`static/\`, ta nhúng **luôn nội dung** các file đó vào binary. Deploy = copy 1 file. Khởi chạy thấy template / config sẵn trong RAM, không đọc disk.

### 7.1 Cú pháp

\`\`\`go
package main

import (
    _ "embed"           // bắt buộc import để dùng //go:embed
    "fmt"
)

//go:embed motd.txt
var motd string         // nội dung motd.txt được nhúng vào biến này lúc build

func main() {
    fmt.Println(motd)
}
\`\`\`

Cấu trúc folder:

\`\`\`
.
├── go.mod
├── main.go
└── motd.txt          // <-- nội dung sẽ được nhúng
\`\`\`

Build xong, **xóa \`motd.txt\` cũng không ảnh hưởng** — binary đã có nội dung bên trong.

### 7.2 3 kiểu biến hỗ trợ

\`\`\`go
//go:embed motd.txt
var motdStr string                  // dạng string

//go:embed motd.txt
var motdBytes []byte                // dạng []byte (binary safe)

//go:embed templates/*.html static/*
var assets embed.FS                 // dạng embed.FS = filesystem ảo
\`\`\`

### 7.3 Ví dụ thực tế — embed templates

\`\`\`go
package main

import (
    "embed"
    "html/template"
    "net/http"
)

//go:embed templates/*.html
var tmplFS embed.FS

var tmpl = template.Must(template.ParseFS(tmplFS, "templates/*.html"))

func main() {
    http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
        tmpl.ExecuteTemplate(w, "index.html", nil)
    })
    http.ListenAndServe(":8080", nil)
}
\`\`\`

→ Deploy = 1 binary, không cần copy folder \`templates/\` riêng.

> ❓ **Câu hỏi tự nhiên**: "Binary có nặng hơn không?" → **Có, đúng bằng size của file gốc** (cộng vài byte metadata). Embed 1MB ảnh → binary to thêm 1MB. Phù hợp cho config/template nhỏ; ảnh/video to nên để CDN.

---

## 8. Build flag — \`-ldflags\`

### 8.1 \`-ldflags="-s -w"\` — giảm size

\`\`\`bash
$ go build -o app .                       # ~7MB
$ go build -ldflags="-s -w" -o app .      # ~5MB (-30%)
\`\`\`

- \`-s\` strip symbol table.
- \`-w\` strip DWARF debug info.

Đánh đổi: **không debug được binary này bằng \`dlv\`** (delve debugger). Áp dụng cho **production**, không cho dev/staging.

**Ví dụ Docker**: Docker image nhỏ hơn 30% → tải xuống nhanh hơn, scale K8s nhanh hơn, image registry tiết kiệm. Đây là lý do hầu hết Dockerfile của Go dùng flag này.

### 8.2 \`-ldflags="-X main.version=..."\` — inject biến

\`\`\`go
// main.go
package main

import "fmt"

var (
    version = "dev"
    commit  = "unknown"
    date    = "unknown"
)

func main() {
    fmt.Printf("myapp %s (%s, built %s)\\n", version, commit, date)
}
\`\`\`

Build:

\`\`\`bash
$ go build -ldflags="-X main.version=1.2.3 -X main.commit=$(git rev-parse --short HEAD) -X main.date=$(date -u +%Y-%m-%d)" -o app .
$ ./app
myapp 1.2.3 (a1b2c3d, built 2026-05-26)
\`\`\`

Inject từ CI/CD pipeline — binary biết chính xác mình là version nào, build từ commit nào.

> ⚠ **Lỗi thường gặp**: chỉ inject được vào biến **\`string\`** ở **package-level**, KHÔNG inject được vào constant (\`const\`) hay local variable. Phải khai báo \`var version = "dev"\` không phải \`const version = "dev"\`.

### 8.3 Kết hợp cả hai

Build prod chuẩn:

\`\`\`bash
$ go build \\
    -trimpath \\
    -ldflags="-s -w -X main.version=$(git describe --tags)" \\
    -o bin/app .
\`\`\`

\`-trimpath\` thêm vào để xóa absolute path của máy build khỏi binary (privacy + reproducible build).

---

## 9. \`go test\`, \`go bench\` (sơ lược)

Sẽ học kỹ ở [Lesson 21 — Testing](#) (Tier 2). Giới thiệu cho biết:

\`\`\`bash
$ go test ./...                # chạy tất cả test
$ go test -v -run TestFoo .    # chạy test khớp regex TestFoo
$ go test -cover ./...         # in coverage %
$ go test -bench=. -benchmem . # chạy benchmark
\`\`\`

File test có suffix \`_test.go\`. Hàm test mở đầu \`Test\`, hàm bench mở đầu \`Benchmark\`. Test built-in, không cần framework ngoài.

---

## 10. Bài tập

### BT1: Module mới + cross-compile

Tạo module \`hello\`, viết hello world, build cho linux/amd64.

### BT2: Module 2 package

Tạo module có 2 package: \`main\` import package con \`greeter\`, package \`greeter\` có hàm \`Hello(name string) string\` trả về \`"Hello, <name>!"\`. Chạy in ra \`Hello, Duy!\`.

### BT3: Đọc go.mod

Cho \`go.mod\` sau, giải thích từng dòng (direct dep vs indirect dep, nghĩa của mỗi dòng):

\`\`\`
module github.com/duynh/shop

go 1.22

require (
    github.com/gin-gonic/gin v1.9.1
    github.com/jackc/pgx/v5 v5.5.1
    github.com/google/uuid v1.6.0
)

require (
    github.com/bytedance/sonic v1.10.2 // indirect
    github.com/jackc/pgpassfile v1.0.0 // indirect
)
\`\`\`

### BT4: Inject version qua \`-ldflags\`

Viết chương trình có biến \`version = "dev"\` mặc định. Build với \`-ldflags\` inject thành \`"1.0.0"\`. Chạy in ra \`myapp 1.0.0\`.

### BT5: Embed file vào binary

Tạo file \`motd.txt\` với nội dung \`"Welcome to my app!"\`. Embed vào binary, chạy in ra. Sau đó **xóa file motd.txt**, chạy lại binary — vẫn in được vì nội dung đã nằm trong binary.

---

## 11. Lời giải chi tiết

### Lời giải BT1

\`\`\`bash
$ mkdir hello && cd hello
$ go mod init hello
go: creating new module hello

$ cat > main.go <<'EOF'
package main

import "fmt"

func main() {
    fmt.Println("Hello, World!")
}
EOF

$ go run .                                # test local trước
Hello, World!

$ GOOS=linux GOARCH=amd64 go build -o hello-linux-amd64 .
$ file hello-linux-amd64
hello-linux-amd64: ELF 64-bit LSB executable, x86-64, ...
\`\`\`

\`file\` xác nhận đây là ELF (Linux) chứ không phải Mach-O (Mac).

### Lời giải BT2

Cấu trúc:

\`\`\`
hello/
├── go.mod        # module hello
├── main.go
└── greeter/
    └── greeter.go
\`\`\`

\`go.mod\`:
\`\`\`
module hello

go 1.22
\`\`\`

\`greeter/greeter.go\`:
\`\`\`go
package greeter

func Hello(name string) string {
    return "Hello, " + name + "!"
}
\`\`\`

\`main.go\`:
\`\`\`go
package main

import (
    "fmt"
    "hello/greeter"
)

func main() {
    fmt.Println(greeter.Hello("Duy"))
}
\`\`\`

Chạy: \`go run .\` → \`Hello, Duy!\`

**Điểm chính**: import path \`"hello/greeter"\` = \`<module-name>/<folder-relative-path>\`. Tên hàm \`Hello\` phải **viết hoa** để main thấy được — viết thường \`hello\` sẽ báo \`undefined: greeter.hello\`.

### Lời giải BT3

\`\`\`
module github.com/duynh/shop       # tên module này (prefix import cho package con)

go 1.22                             # Go version tối thiểu để build

require (                           # === DIRECT DEPENDENCY ===
    github.com/gin-gonic/gin v1.9.1     # framework HTTP, mình \`import gin\` trực tiếp
    github.com/jackc/pgx/v5 v5.5.1      # driver Postgres, \`import pgx\` trực tiếp
    github.com/google/uuid v1.6.0       # tạo UUID, \`import uuid\` trực tiếp
)

require (                           # === INDIRECT (transitive) DEPENDENCY ===
    github.com/bytedance/sonic v1.10.2 // indirect    # gin dùng sonic để parse JSON, mình không gọi trực tiếp
    github.com/jackc/pgpassfile v1.0.0 // indirect    # pgx dùng để đọc ~/.pgpass, mình không gọi trực tiếp
)
\`\`\`

- \`// indirect\`: package được pull về vì dependency của bạn cần, không phải bạn \`import\` trực tiếp.
- Tự động sinh khi chạy \`go mod tidy\`.
- Nếu bạn \`import\` một indirect → \`go mod tidy\` sẽ chuyển nó thành direct (xoá comment \`// indirect\`).

### Lời giải BT4

\`main.go\`:
\`\`\`go
package main

import "fmt"

var version = "dev"

func main() {
    fmt.Println("myapp", version)
}
\`\`\`

Build và inject:
\`\`\`bash
$ go build -ldflags="-X main.version=1.0.0" -o myapp .
$ ./myapp
myapp 1.0.0
\`\`\`

Build không inject:
\`\`\`bash
$ go build -o myapp .
$ ./myapp
myapp dev
\`\`\`

**Điểm chính**:
- \`main.version\` = \`<package>.<biến>\`.
- Biến phải là \`var\` (mutable), không phải \`const\`.
- Phải là \`string\`, không inject được vào \`int\`/\`bool\` trực tiếp.

### Lời giải BT5

Cấu trúc:

\`\`\`
embed-demo/
├── go.mod
├── main.go
└── motd.txt
\`\`\`

\`motd.txt\`:
\`\`\`
Welcome to my app!
\`\`\`

\`main.go\`:
\`\`\`go
package main

import (
    _ "embed"
    "fmt"
)

//go:embed motd.txt
var motd string

func main() {
    fmt.Println(motd)
}
\`\`\`

Build và test:
\`\`\`bash
$ go build -o app .
$ ./app
Welcome to my app!

$ rm motd.txt              # xoá source file
$ ./app                    # vẫn chạy được!
Welcome to my app!

$ ls -lh app               # binary chứa "Welcome..." bên trong
-rwxr-xr-x  1.8M  app
\`\`\`

**Điểm chính**:
- Comment \`//go:embed motd.txt\` phải nằm **NGAY TRÊN** dòng \`var motd string\`, không được có dòng trống ở giữa.
- Phải \`import _ "embed"\` (blank — không dùng symbol nhưng cần để compiler enable directive).
- Sau khi build, nội dung đã copy vào binary → file gốc xoá cũng không sao.

---

## 12. Code & Minh họa

- [\`solutions.go\`](./solutions.go) — chạy \`go run solutions.go\` để xem demo \`runtime.Version()\`, \`runtime.GOOS\`, \`runtime.GOARCH\`, dùng \`flag\` package.
- [\`visualization.html\`](./visualization.html) — 3 module tương tác:
  - **Project structure simulator** — click qua các bước \`go mod init\` → \`go mod tidy\` → \`go build\`, xem tree file thay đổi.
  - **Build target picker** — chọn GOOS + GOARCH, hiện binary name + size.
  - **Import explorer** — click từng dòng import để xem giải thích.

---

## 13. Bài tiếp theo

- [Lesson 07 — Biến & Kiểu dữ liệu](../lesson-07-variables-types/) — \`var\`/\`:=\`/\`const\`, int/float/bool/string, zero value, ép kiểu.
- Tham khảo:
  - [Tour of Go — Modules](https://go.dev/tour/) (chính thức).
  - [Effective Go — Names](https://go.dev/doc/effective_go#names).
  - \`go help mod\`, \`go help build\` — built-in.
`;
