// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: Programming/lesson-77-ci-cd-pipeline/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 77 — CI/CD Pipeline

> Tier 7 (Production) · Từ commit tới production một cách **tự động, an toàn, lặp lại được** — biến deploy từ "sự kiện đáng sợ lúc 3 giờ sáng" thành "việc nhàm chán giữa ban ngày".

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Phân biệt rõ **CI (Continuous Integration)**, **Continuous Delivery** và **Continuous Deployment** — ba khái niệm hay bị gộp làm một.
- Hiểu **vì sao** cần pipeline: catch bug sớm, deploy nhanh + an toàn, kết quả lặp lại được (reproducible).
- Thiết kế được một **pipeline đầy đủ** cho dự án Go: checkout → lint → build → test → vuln scan → build image → push → deploy.
- Viết được **GitHub Actions workflow** thật: jobs, steps, matrix, cache.
- Tăng tốc pipeline bằng **caching** (module cache + build cache) và đo được mức cải thiện.
- Chạy **matrix build** trên nhiều Go version và OS.
- Quản lý **secrets** đúng cách (GitHub Secrets) — không hardcode, không leak trong log.
- Cấu hình **branch protection** để bắt buộc CI pass + review trước khi merge.
- So sánh 4 **deploy strategy**: recreate, rolling, blue-green, canary — chọn đúng cho từng tình huống.
- Hiểu **supply chain security (SLSA)**: signed commit, SBOM, image signing (cosign), provenance, dependency pinning + Dependabot.
- Nắm **GitOps**: Git là source of truth, ArgoCD/Flux tự sync.
- Tự động hoá **versioning** (semver + git tag) với \`goreleaser\`.
- Thiết kế **rollback** nhanh và tự động theo metric.
- Tránh các **pitfall** kinh điển: thiếu test, flaky test, leak secret, không scan, không có rollback plan, pipeline chậm.

## Kiến thức tiền đề

- [Lesson 02 — Dev Environment & Git](../lesson-02-dev-environment-git/) — commit, branch, tag.
- [Lesson 26 — Testing Basics](../lesson-26-testing-basics/) — \`go test\`, \`-race\`, \`-cover\`.
- [Lesson 73 — Metrics & Prometheus](../lesson-73-metrics-prometheus/) — metric để quyết định promote/rollback canary.
- [Lesson 75 — Docker Multistage](../lesson-75-docker-multistage/) — build image gọn để pipeline push.
- [Lesson 76 — Kubernetes Basics](../lesson-76-kubernetes-basics/) — nơi rolling/canary deploy thực sự chạy.
- Sẽ học tiếp ở [Lesson 78 — Config Management](../lesson-78-config-management/) — config tách khỏi code, đưa vào pipeline an toàn.

---

## 1. CI vs CD — ba khái niệm, đừng gộp làm một

> 💡 **Trực giác / Hình dung.** Hãy hình dung một dây chuyền lắp ráp ô tô. **CI** là khâu kiểm tra từng linh kiện ngay khi nó vừa được lắp vào: con ốc có siết đúng lực không, mạch điện có thông không — phát hiện lỗi tại chỗ thay vì để xe lăn ra cuối dây chuyền mới biết. **CD** là khâu đưa chiếc xe đã kiểm tra xong ra showroom: Continuous **Delivery** = xe luôn sẵn sàng giao, nhưng cần một người bấm nút "xuất xưởng"; Continuous **Deployment** = xe tự động lăn thẳng ra đường, không cần ai bấm gì.

Ba thuật ngữ thường bị dùng lẫn lộn. Phân biệt chính xác:

| Khái niệm | Viết tắt | Tự động làm gì | Cần con người bấm nút? |
|-----------|----------|----------------|------------------------|
| **Continuous Integration** | CI | Mỗi commit → build + test + lint tự động | Không (chỉ chạy kiểm tra) |
| **Continuous Delivery** | CD | Pass CI → tự deploy lên **staging**, đóng gói sẵn cho prod | **Có** — prod cần manual approve |
| **Continuous Deployment** | CD | Pass CI + (có thể) staging → tự deploy thẳng **production** | Không — hoàn toàn tự động |

Cùng viết tắt "CD" nhưng hai nghĩa khác nhau. Cách phân biệt nhanh:

- **Delivery**: "Sản phẩm luôn ở trạng thái *có thể* giao bất cứ lúc nào." Bấm-nút-thì-giao.
- **Deployment**: "Sản phẩm *tự* giao." Không-bấm-vẫn-giao.

> ❓ **Câu hỏi tự nhiên của người đọc.**
> - *"Vậy Continuous Deployment có nguy hiểm không?"* — Có, nếu thiếu test và rollback. Nhưng team chín (Netflix, Google) deploy production hàng nghìn lần/ngày tự động vì pipeline của họ có test phủ rộng + canary + auto-rollback. Tự động hoá càng cao thì *yêu cầu về chất lượng kiểm thử* càng cao.
> - *"Team nhỏ mới bắt đầu nên dùng cái nào?"* — Bắt đầu với CI (test mỗi commit), rồi Continuous Delivery (auto staging, manual prod). Lên Continuous Deployment chỉ khi đã tin tưởng test + có canary/rollback.

> ⚠ **Lỗi thường gặp.** Gọi mọi thứ là "CI/CD" rồi chỉ làm CI (chạy test) mà không có CD nào cả. CI không tự deploy — nó chỉ *gác cổng chất lượng*. Nếu sau khi test pass bạn vẫn \`scp\` file lên server bằng tay lúc 2 giờ sáng thì bạn **không có CD**.

> 🔁 **Dừng lại tự kiểm tra.**
> 1. Một team auto deploy lên staging nhưng prod cần lead bấm "Approve" — đây là Delivery hay Deployment?
> 2. Pipeline chỉ chạy \`go test\` rồi báo xanh/đỏ, không deploy gì — đây là CI, CD, hay cả hai?
>
> <details><summary>Đáp án</summary>
>
> 1. **Continuous Delivery** — vì prod cần con người bấm nút.
> 2. Chỉ **CI** — không có khâu deploy nào.
> </details>

---

## 2. Vì sao cần pipeline

Ba lý do cốt lõi, mỗi cái giải một nỗi đau cụ thể:

### 2.1 Catch bug sớm (shift-left)

Chi phí sửa bug tăng theo cấp số nhân theo thời gian phát hiện:

| Phát hiện ở đâu | Chi phí tương đối |
|-----------------|-------------------|
| Lúc gõ code (IDE/lint) | 1× |
| Lúc commit (CI test) | ~5× |
| Lúc QA/staging | ~10× |
| Trên production | ~100× (kèm sự cố, mất uy tín) |

CI đẩy việc phát hiện về phía bên trái (shift-left) của dòng thời gian — bắt bug ở mức 1×–5× thay vì 100×. Một test phát hiện lỗi 30 giây sau commit rẻ hơn rất nhiều so với hotfix lúc khách hàng đang la làng.

### 2.2 Deploy nhanh + an toàn

Nghịch lý: **deploy thường xuyên = deploy an toàn hơn**. Vì sao?

- Deploy nhỏ (vài commit) → ít thay đổi → nếu hỏng, dễ tìm thủ phạm.
- Deploy hiếm (3 tháng/lần, 500 commit) → "big bang", hỏng là không biết commit nào gây ra.

Pipeline tự động cho phép deploy 10 lần/ngày mà không kiệt sức. Báo cáo **DORA** (DevOps Research) chỉ ra: team elite deploy thường xuyên hơn *và* có tỷ lệ lỗi thấp hơn — không phải đánh đổi.

### 2.3 Reproducible (lặp lại được)

> 💡 **Trực giác.** "It works on my machine" là câu nói đùa kinh điển của developer — và là cơn ác mộng của ops. Pipeline chạy trên môi trường sạch, cố định (cùng Go version, cùng dependency được pin) → build trên CI giống hệt build sẽ chạy production. Loại bỏ class lỗi "máy tôi chạy được, server thì không".

Reproducible nghĩa là: cùng commit hash → cùng artifact (cùng binary, cùng image digest). Đây là nền tảng của debug ("tái hiện chính xác bug đó") và security ("chứng minh image này được build từ source code này").

> 📝 **Tóm tắt mục 2.** Pipeline tồn tại vì 3 lý do: (1) catch bug ở mức 1×–5× thay vì 100×; (2) deploy nhỏ + thường xuyên thì an toàn hơn deploy lớn + hiếm; (3) môi trường sạch cố định → build lặp lại được, hết "works on my machine".

---

## 3. Pipeline stages cho Go

Một pipeline production điển hình cho dịch vụ Go gồm các stage nối tiếp. **Stage trước fail → dừng luôn**, không phí công chạy stage sau.

\`\`\`
┌──────────┐   ┌──────┐   ┌───────┐   ┌──────┐   ┌────────────┐   ┌────────────┐   ┌──────┐   ┌────────┐
│ Checkout │──▶│ Lint │──▶│ Build │──▶│ Test │──▶│ Vuln scan  │──▶│ Build image│──▶│ Push │──▶│ Deploy │
└──────────┘   └──────┘   └───────┘   └──────┘   └────────────┘   └────────────┘   └──────┘   └────────┘
   git fetch  golangci    go build   go test     govulncheck      docker build   registry   k8s/argo
                                       -race      + trivy
\`\`\`

Mô tả từng stage và lệnh thật:

### 3.1 Checkout

Lấy source về môi trường CI sạch. Trên GitHub Actions:

\`\`\`yaml
- uses: actions/checkout@v4
\`\`\`

Pin theo SHA hoặc version tag — không dùng \`@main\` (sẽ nói ở mục 10 về pinning).

### 3.2 Lint — \`golangci-lint\`

Lint bắt lỗi *trước cả khi compile chạy test*: biến không dùng, lỗi shadowing, error không check, format sai.

\`\`\`bash
# Cài rồi chạy bộ linter tổng hợp
golangci-lint run ./...
\`\`\`

\`golangci-lint\` gói nhiều linter (\`govet\`, \`staticcheck\`, \`errcheck\`, \`ineffassign\`...) trong một lần chạy, cache kết quả → nhanh.

### 3.3 Build — \`go build\`

Đảm bảo code *compile được* trên môi trường CI (không chỉ máy bạn):

\`\`\`bash
go build ./...
\`\`\`

Nếu cần binary cho nhiều OS:

\`\`\`bash
GOOS=linux  GOARCH=amd64 go build -o bin/app-linux  ./cmd/app
GOOS=darwin GOARCH=arm64 go build -o bin/app-mac    ./cmd/app
\`\`\`

### 3.4 Test — \`go test -race -cover\`

\`\`\`bash
go test -race -cover ./...
\`\`\`

- \`-race\`: bật race detector — bắt data race trong code concurrent. **Bắt buộc bật trong CI** vì race bug thường không tái hiện cục bộ.
- \`-cover\`: in % code được test phủ. Có thể gắn ngưỡng (vd fail nếu < 70%).

Ví dụ output: \`ok  example/app  0.312s  coverage: 84.2% of statements\`.

### 3.5 Vulnerability scan — \`govulncheck\` + trivy

Quét lỗ hổng đã biết (CVE) trong dependency và base image:

\`\`\`bash
# Quét code Go: chỉ báo CVE thực sự reachable từ code của bạn
govulncheck ./...

# Quét filesystem / image: CVE trong dependency và OS package
trivy fs --severity HIGH,CRITICAL .
trivy image myapp:1.2.3
\`\`\`

\`govulncheck\` thông minh ở chỗ nó phân tích call graph — chỉ cảnh báo CVE mà code bạn *thực sự gọi tới*, giảm noise.

### 3.6 Build image — Docker

Dùng multistage build (xem [Lesson 75](../lesson-75-docker-multistage/)) để image gọn:

\`\`\`bash
docker build -t myregistry.io/myapp:\${GIT_SHA} .
\`\`\`

Tag bằng git SHA → mỗi build có image duy nhất, truy ngược được về commit.

### 3.7 Push registry

\`\`\`bash
docker push myregistry.io/myapp:\${GIT_SHA}
\`\`\`

Đăng nhập registry bằng secret (xem mục 7) — **không bao giờ** hardcode password.

### 3.8 Deploy

Cập nhật cluster để chạy image mới:

\`\`\`bash
kubectl set image deployment/myapp myapp=myregistry.io/myapp:\${GIT_SHA}
# hoặc GitOps: sửa file YAML trong repo cấu hình, ArgoCD tự sync (mục 11)
\`\`\`

> ⚠ **Lỗi thường gặp.** Sắp xếp stage sai thứ tự: build image *trước* khi test. Hậu quả: build image tốn 2 phút rồi mới chạy test 30s và test fail → phí 2 phút build vô ích. **Đặt stage rẻ và hay-fail lên trước** (lint, test) để fail-fast. Build image/push (đắt) đặt sau cùng.

> 🔁 **Dừng lại tự kiểm tra.** Vì sao đặt \`lint\` trước \`test\`?
> <details><summary>Đáp án</summary> Lint nhanh hơn nhiều và bắt được lỗi cú pháp/style mà không cần biên dịch toàn bộ + chạy test. Fail sớm ở lint tiết kiệm thời gian chạy test. (Một số team chạy lint + test song song để nhanh hơn nữa — đánh đổi: tốn 2 runner cùng lúc.)</details>

> 📝 **Tóm tắt mục 3.** Pipeline = chuỗi stage nối tiếp, fail-fast. Thứ tự tối ưu: stage rẻ + hay-fail (lint, test) trước; stage đắt (build image, push) sau. Tag image bằng git SHA để truy ngược. \`-race\` bắt buộc bật trong CI.

---

## 4. GitHub Actions — workflow thật

GitHub Actions định nghĩa pipeline bằng file YAML trong \`.github/workflows/\`. Cấu trúc phân cấp:

\`\`\`
workflow (1 file .yml)
 └─ jobs (chạy song song mặc định, mỗi job 1 runner riêng)
     └─ steps (chạy tuần tự trong 1 job)
         └─ uses: action có sẵn  |  run: lệnh shell
\`\`\`

### 4.1 Khái niệm cốt lõi

> 💡 **Định nghĩa tự đủ — Workflow.**
> **(a) Là gì:** một file YAML mô tả toàn bộ pipeline được trigger bởi sự kiện (push, pull_request, tag, schedule).
> **(b) Vì sao cần:** để pipeline *là code* — version, review, lặp lại được; không phải click chuột trên UI.
> **(c) Ví dụ:** \`on: [push]\` → mỗi lần push, workflow này chạy.

| Khái niệm | Là gì |
|-----------|-------|
| **workflow** | 1 file \`.yml\`, tập hợp các job |
| **event / trigger** | sự kiện kích hoạt: \`push\`, \`pull_request\`, \`release\`, \`schedule\`, \`workflow_dispatch\` (chạy tay) |
| **job** | đơn vị chạy trên 1 runner (VM sạch). Các job song song trừ khi khai báo \`needs:\` |
| **step** | 1 lệnh trong job — \`uses:\` (action có sẵn) hoặc \`run:\` (shell) |
| **runner** | máy chạy job: \`ubuntu-latest\`, \`macos-latest\`, \`windows-latest\`, hoặc self-hosted |
| **matrix** | sinh nhiều job từ 1 định nghĩa (vd × Go version × OS) |
| **secret** | biến nhạy cảm lưu mã hoá, inject qua \`\${{ secrets.X }}\` |

### 4.2 Workflow đầy đủ cho Go: lint + test + build + docker

File này có sẵn ở \`.github/workflows/ci.yml\` trong thư mục lesson — đây là bản tham khảo production:

\`\`\`yaml
name: CI

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

# Hủy run cũ khi push mới lên cùng branch/PR (tiết kiệm runner)
concurrency:
  group: ci-\${{ github.ref }}
  cancel-in-progress: true

permissions:
  contents: read

jobs:
  # ---- Job 1: lint + test (chạy trên matrix) ----
  test:
    runs-on: \${{ matrix.os }}
    strategy:
      fail-fast: false          # 1 cell fail không hủy các cell khác
      matrix:
        os: [ubuntu-latest, macos-latest]
        go: ['1.21', '1.22']
    steps:
      - uses: actions/checkout@v4

      - name: Setup Go
        uses: actions/setup-go@v5
        with:
          go-version: \${{ matrix.go }}
          cache: true            # tự cache module + build cache

      - name: Lint
        uses: golangci/golangci-lint-action@v6
        with:
          version: v1.59

      - name: Test (race + cover)
        run: go test -race -coverprofile=cover.out ./...

      - name: Vulnerability scan
        run: |
          go install golang.org/x/vuln/cmd/govulncheck@latest
          govulncheck ./...

  # ---- Job 2: build + push image (chỉ chạy khi test pass + push main) ----
  docker:
    needs: test                  # phụ thuộc job test
    if: github.event_name == 'push' && github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    permissions:
      contents: read
      packages: write            # cần để push lên GHCR
    steps:
      - uses: actions/checkout@v4

      - name: Login to GHCR
        uses: docker/login-action@v3
        with:
          registry: ghcr.io
          username: \${{ github.actor }}
          password: \${{ secrets.GITHUB_TOKEN }}   # token tự cấp, không hardcode

      - name: Build & push
        uses: docker/build-push-action@v6
        with:
          context: .
          push: true
          tags: ghcr.io/\${{ github.repository }}:\${{ github.sha }}
\`\`\`

Đọc workflow này:
- \`on:\` — chạy khi push lên \`main\` hoặc mở PR vào \`main\`.
- Job \`test\` chạy 4 lần (2 OS × 2 Go version) song song.
- Job \`docker\` có \`needs: test\` → chỉ chạy sau khi *toàn bộ* matrix \`test\` pass, và \`if:\` giới hạn chỉ push (không phải PR).
- \`secrets.GITHUB_TOKEN\` được GitHub tự cấp, không cần tạo tay.

> ❓ **Câu hỏi tự nhiên của người đọc.**
> - *"\`needs: test\` với matrix thì sao?"* — \`docker\` đợi *tất cả* 4 cell của \`test\` xong. Một cell fail (và \`fail-fast: false\`) → các cell khác vẫn chạy hết, nhưng \`docker\` sẽ không chạy vì có cell fail.
> - *"\`concurrency\` để làm gì?"* — Nếu bạn push 3 lần liên tiếp, không cần chạy 3 pipeline; hủy 2 cái cũ, chỉ chạy cái mới nhất. Tiết kiệm runner + cho feedback nhanh.

> 📝 **Tóm tắt mục 4.** Workflow = YAML trong \`.github/workflows/\`. Phân cấp workflow → jobs (song song, nối bằng \`needs\`) → steps (tuần tự). \`setup-go\` với \`cache: true\` tự lo caching. \`if:\` + \`needs:\` điều khiển job nào chạy khi nào.

---

## 5. Caching — tăng tốc pipeline

Mỗi lần CI chạy trên runner sạch → mặc định phải tải lại toàn bộ dependency và build lại từ đầu. Caching lưu lại để lần sau dùng.

Hai thứ Go đáng cache:

| Cache | Đường dẫn | Lưu gì |
|-------|-----------|--------|
| **Module cache** | \`~/go/pkg/mod\` | dependency đã tải về (\`go.mod\` → các module) |
| **Build cache** | \`~/.cache/go-build\` | kết quả compile package (đã compile rồi không compile lại) |

Cách đơn giản nhất: dùng \`actions/setup-go@v5\` với \`cache: true\` — nó tự lo cả hai, key dựa trên hash của \`go.sum\`.

Cache thủ công (khi cần kiểm soát hơn):

\`\`\`yaml
- uses: actions/cache@v4
  with:
    path: |
      ~/go/pkg/mod
      ~/.cache/go-build
    key: \${{ runner.os }}-go-\${{ hashFiles('**/go.sum') }}
    restore-keys: \${{ runner.os }}-go-
\`\`\`

Đọc cache key:
- \`key\` chứa hash của \`go.sum\` → khi dependency đổi, key đổi → cache mới.
- \`restore-keys\` là prefix fallback: nếu không tìm thấy key chính xác, dùng cache gần nhất khớp prefix (vẫn đỡ hơn build trắng).

Mức cải thiện thực tế (số minh hoạ cho dự án Go cỡ trung):

| Tình huống | Thời gian \`go test ./...\` |
|------------|---------------------------|
| Không cache (cold) | ~3 phút (tải module + compile hết) |
| Có cache (warm) | ~40 giây (chỉ compile phần đổi) |

> ⚠ **Lỗi thường gặp.** Cache key thiếu \`go.sum\` (dùng key cố định \`go-cache\`). Hậu quả: thêm dependency mới nhưng cache cũ không chứa nó → hoặc build fail, hoặc tệ hơn là *dùng version cũ* gây bug khó hiểu. **Luôn nhúng \`hashFiles('**/go.sum')\` vào key.**

> 📝 **Tóm tắt mục 5.** Cache module (\`~/go/pkg/mod\`) + build cache (\`~/.cache/go-build\`). Dùng \`setup-go\` \`cache: true\` là đủ cho hầu hết. Key phải chứa hash \`go.sum\` để invalidate đúng. Cache tốt biến pipeline 3 phút thành 40 giây.

---

## 6. Matrix build — test trên nhiều version / OS

> 💡 **Trực giác.** Bạn viết code chạy ngon trên máy mình (Go 1.22, macOS). Nhưng user build bằng Go 1.21 trên Linux. Matrix build là "chạy thử trên mọi cấu hình khách hàng có thể dùng" — bắt lỗi đặc thù version/OS *trước khi* khách gặp.

Khai báo matrix sinh ra tích Descartes các job:

\`\`\`yaml
strategy:
  fail-fast: false
  matrix:
    os: [ubuntu-latest, macos-latest]
    go: ['1.21', '1.22']
\`\`\`

→ sinh 4 job: \`(ubuntu,1.21)\`, \`(ubuntu,1.22)\`, \`(macos,1.21)\`, \`(macos,1.22)\`, chạy song song.

Tùy biến matrix:

\`\`\`yaml
matrix:
  go: ['1.21', '1.22']
  os: [ubuntu-latest, macos-latest]
  include:                       # thêm 1 cell đặc biệt
    - os: windows-latest
      go: '1.22'
  exclude:                       # bỏ 1 tổ hợp
    - os: macos-latest
      go: '1.21'
\`\`\`

- \`fail-fast: false\` — quan trọng: mặc định 1 cell fail → GitHub hủy hết. Tắt đi để thấy *tất cả* cell nào fail, debug nhanh hơn.
- \`include\` — thêm tổ hợp riêng lẻ (vd chỉ test Windows ở 1 version).
- \`exclude\` — bỏ tổ hợp không cần.

> ❓ **Câu hỏi tự nhiên.** *"Test trên nhiều OS có chậm không?"* — Không, vì chúng chạy **song song** (mỗi cell một runner). 4 cell × 1 phút = vẫn ~1 phút tổng (không phải 4 phút), miễn bạn còn quota runner.

> 📝 **Tóm tắt mục 6.** Matrix sinh tích Descartes các job chạy song song. \`fail-fast: false\` để thấy mọi cell fail. \`include\`/\`exclude\` tinh chỉnh tổ hợp. Mục đích: bắt lỗi đặc thù version/OS sớm.

---

## 7. Secrets management — không bao giờ hardcode

Secret = thông tin nhạy cảm: API key, registry password, deploy token, DB password.

> ⚠ **Lỗi nghiêm trọng nhất.** Hardcode secret vào code/YAML:
> \`\`\`yaml
> # SAI — secret lộ trong git history MÃI MÃI, ai clone repo cũng thấy
> password: "ghp_abc123realtoken"
> \`\`\`
> Một khi commit, secret nằm trong git history kể cả khi bạn xóa dòng đó sau này. Phải **xoay (rotate)** secret ngay nếu lỡ commit.

Cách đúng — GitHub Secrets:

1. Lưu secret ở **Settings → Secrets and variables → Actions** (mã hoá, write-only qua UI).
2. Inject vào workflow qua \`\${{ secrets.NAME }}\`:

\`\`\`yaml
- name: Login registry
  run: docker login -u "$USER" -p "$PASS" myregistry.io
  env:
    USER: \${{ secrets.REGISTRY_USER }}
    PASS: \${{ secrets.REGISTRY_PASSWORD }}
\`\`\`

**Tránh leak trong log:** GitHub tự mask giá trị secret trong log (hiện \`***\`). Nhưng bạn vẫn có thể vô tình leak:

\`\`\`yaml
# SAI — echo secret ra log
- run: echo "Token is \${{ secrets.TOKEN }}"
# SAI — base64 hoá phá masking
- run: echo "\${{ secrets.TOKEN }}" | base64
\`\`\`

> ❓ **Câu hỏi tự nhiên.** *"\`GITHUB_TOKEN\` khác secret thường thế nào?"* — \`GITHUB_TOKEN\` được GitHub *tự sinh cho mỗi run*, hết hạn khi run xong, phạm vi giới hạn bằng \`permissions:\`. An toàn hơn token cá nhân (PAT) vốn sống lâu. Ưu tiên \`GITHUB_TOKEN\`; chỉ dùng PAT/secret riêng khi cần quyền \`GITHUB_TOKEN\` không có.

> 📝 **Tóm tắt mục 7.** Không bao giờ hardcode secret (git history giữ mãi → phải rotate nếu lỡ). Lưu ở GitHub Secrets, inject qua \`\${{ secrets.X }}\` hoặc \`env:\`. Đừng \`echo\`/\`base64\` secret ra log. Ưu tiên \`GITHUB_TOKEN\` ngắn hạn hơn PAT dài hạn.

---

## 8. Branch protection — gác cổng \`main\`

Branch protection rule bắt buộc điều kiện *trước khi* merge vào \`main\`. Cấu hình ở **Settings → Branches**:

| Rule | Tác dụng |
|------|----------|
| **Require status checks to pass** | CI phải xanh mới merge được (chọn job nào bắt buộc) |
| **Require pull request reviews** | ≥ N người approve (vd 1-2) |
| **Require branches up to date** | PR phải rebase/merge \`main\` mới nhất rồi mới merge |
| **Require signed commits** | mọi commit phải ký GPG/sigstore (mục 10) |
| **Include administrators** | admin cũng phải tuân (không bypass) |
| **Restrict who can push** | chặn push trực tiếp, ép qua PR |

> 💡 **Trực giác.** Branch protection là "người gác cổng" cho \`main\`. Không có nó, ai cũng có thể push thẳng code chưa test (hoặc broken) vào nhánh production. Có nó → mọi thay đổi đi qua PR + CI xanh + review → \`main\` luôn ở trạng thái deploy được.

> ⚠ **Lỗi thường gặp.** Bật "require status checks" nhưng quên chọn job nào → rule rỗng, PR vẫn merge được dù CI đỏ. Phải **chọn cụ thể** các check bắt buộc (vd \`test (ubuntu-latest, 1.22)\`).

> 📝 **Tóm tắt mục 8.** Branch protection ép: CI pass + ≥1 review + branch up-to-date trước khi merge \`main\`. Giữ \`main\` luôn ở trạng thái deploy được. Nhớ *chọn* check bắt buộc, không chỉ bật suông.

---

## 9. Deploy strategies — 4 cách đưa code lên production

Khi có image mới, làm sao thay image cũ? Bốn chiến lược, đánh đổi khác nhau.

### 9.1 Recreate — tắt hết rồi bật mới

\`\`\`
v1 v1 v1   →   (tắt hết)   →   v2 v2 v2
\`\`\`

Tắt toàn bộ instance cũ, rồi bật instance mới. **Có downtime** trong lúc chuyển.

- ✅ Đơn giản nhất; không cần chạy 2 version song song (tốt khi v1/v2 không tương thích, vd schema DB đổi).
- ❌ Downtime — user thấy lỗi trong vài giây/phút.
- **Dùng khi:** môi trường không cần zero-downtime (internal tool, batch job), hoặc hai version *không thể* chạy song song.

### 9.2 Rolling — thay từ từ, zero-downtime

\`\`\`
v1 v1 v1  →  v2 v1 v1  →  v2 v2 v1  →  v2 v2 v2
\`\`\`

Thay từng instance một (hoặc từng nhóm nhỏ). Luôn có instance phục vụ → **không downtime**. Đây là mặc định của Kubernetes Deployment.

- ✅ Zero-downtime, đơn giản, không tốn gấp đôi tài nguyên.
- ❌ Trong lúc rollout, v1 và v2 chạy *đồng thời* → phải tương thích với nhau (và với DB). Rollback chậm (phải roll ngược lại từng cái).
- **Dùng khi:** thay đổi tương thích ngược (backward-compatible), feature thường ngày.

### 9.3 Blue-green — chuyển công tắc tức thì

\`\`\`
[Blue v1] ← traffic        [Blue v1]                   [Blue v1] (chờ sẵn để rollback)
[Green v2] (chưa traffic) → [Green v2] ← traffic switch  [Green v2] ← traffic
\`\`\`

Dựng *toàn bộ* môi trường mới (green = v2) song song môi trường cũ (blue = v1). Test green xong → **chuyển toàn bộ traffic** sang green bằng một thao tác (đổi load balancer). Lỗi → switch ngược về blue *tức thì*.

- ✅ Rollback tức thì (chỉ switch lại); test green với traffic thật trước khi switch.
- ❌ Tốn **gấp đôi tài nguyên** (chạy 2 môi trường đầy đủ); chuyển traffic là "tất cả hoặc không" → nếu green có bug ẩn, 100% user dính ngay.
- **Dùng khi:** cần rollback cực nhanh, có ngân sách gấp đôi tài nguyên tạm thời.

### 9.4 Canary — tăng dần %, theo dõi metric

\`\`\`
v2: 0%  →  5%  →  25%  →  50%  →  100%
        ▲ theo dõi error rate/latency mỗi bước; xấu → rollback
\`\`\`

Cho v2 nhận **một phần nhỏ** traffic (vd 5%), theo dõi metric (error rate, p99 latency). Tốt → tăng dần (25%, 50%, 100%). Xấu → rollback, chỉ 5% user bị ảnh hưởng.

- ✅ Giới hạn "blast radius" — bug chỉ ảnh hưởng 5% user; quyết định promote/rollback dựa trên *dữ liệu thật*.
- ❌ Phức tạp nhất; cần hệ metric tốt ([Lesson 73](../lesson-73-metrics-prometheus/)) và công cụ (Argo Rollouts, Flagger).
- **Dùng khi:** thay đổi rủi ro cao, traffic lớn, có hệ observability đủ tốt.

### Bảng so sánh

| Strategy | Downtime | Rollback | Tài nguyên | 2 version song song? | Độ phức tạp |
|----------|----------|----------|------------|----------------------|-------------|
| Recreate | **Có** | trung bình | 1× | Không | Thấp nhất |
| Rolling | Không | chậm | ~1× | **Có** (bắt buộc tương thích) | Thấp |
| Blue-green | Không | **tức thì** | **2×** | Có (tách biệt) | Trung bình |
| Canary | Không | nhanh | ~1× + chút | **Có** (bắt buộc tương thích) | **Cao** |

> ❓ **Câu hỏi tự nhiên.** *"Schema DB đổi không tương thích thì dùng gì?"* — Rolling/canary nguy hiểm vì v1 và v2 chạy song song trên cùng DB. Lựa chọn: **recreate** (chấp nhận downtime), hoặc làm **migration 2 pha** (expand-contract): v2 đọc được cả schema cũ lẫn mới → rolling an toàn → sau đó mới dọn schema cũ.

> 📝 **Tóm tắt mục 9.** Recreate = đơn giản + downtime. Rolling = zero-downtime mặc định, nhưng 2 version phải tương thích. Blue-green = rollback tức thì, tốn 2× tài nguyên. Canary = an toàn nhất cho thay đổi rủi ro cao, nhưng cần metric + tooling. Chọn theo: tương thích version + ngân sách + mức rủi ro.

---

## 10. Supply chain security (SLSA)

> 💡 **Trực giác.** Supply chain attack = kẻ tấn công không hack thẳng app của bạn, mà hack một *dependency* hoặc *bước build* để cài mã độc — như đầu độc nguyên liệu trước khi nó vào nhà bếp (vụ SolarWinds, xz-utils). **SLSA** (Supply-chain Levels for Software Artifacts, đọc là "salsa") là khung tiêu chuẩn để chứng minh: artifact này được build từ source này, bởi pipeline này, không bị can thiệp.

Các biện pháp, từ dễ tới khó:

### 10.1 Dependency pinning + Dependabot

Pin dependency về **version cụ thể**, không dùng \`latest\`/floating:

\`\`\`go
// go.mod — đã pin sẵn version + go.sum giữ checksum (chống tamper)
require github.com/some/lib v1.4.2
\`\`\`

GitHub Actions cũng nên pin theo **SHA** (an toàn hơn tag, vì tag có thể bị di chuyển):

\`\`\`yaml
# Thay vì @v4 → pin SHA bất biến
- uses: actions/checkout@8ade135a41bc03ea155e62e844d188df1ea18608  # v4.1.0
\`\`\`

**Dependabot** tự mở PR cập nhật dependency khi có version vá lỗi/bảo mật mới:

\`\`\`yaml
# .github/dependabot.yml
version: 2
updates:
  - package-ecosystem: gomod
    directory: /
    schedule: { interval: weekly }
  - package-ecosystem: github-actions
    directory: /
    schedule: { interval: weekly }
\`\`\`

### 10.2 Signed commit / tag

Ký commit/tag bằng GPG hoặc sigstore → chứng minh "commit này thực sự của tôi", chống mạo danh:

\`\`\`bash
git commit -S -m "feat: ..."     # -S ký commit
git tag -s v1.2.3 -m "release"   # -s ký tag
\`\`\`

Bật branch protection "require signed commits" để ép.

### 10.3 SBOM — Software Bill of Materials

> 💡 **Định nghĩa tự đủ — SBOM.**
> **(a) Là gì:** "danh sách nguyên liệu" của phần mềm — liệt kê *mọi* dependency và version trong artifact, dạng máy đọc được (SPDX/CycloneDX).
> **(b) Vì sao cần:** khi một CVE mới công bố (vd "log4j 2.14 dính lỗ hổng"), bạn cần trả lời ngay *"sản phẩm tôi có dùng nó không?"*. Không có SBOM → phải lục từng repo. Có SBOM → query một phát ra.
> **(c) Ví dụ:** sinh SBOM cho image bằng \`syft\`:
> \`\`\`bash
> syft myapp:1.2.3 -o spdx-json > sbom.json
> \`\`\`

### 10.4 Image signing — cosign

Ký image bằng [cosign](https://github.com/sigstore/cosign) (sigstore) → chứng minh image này do pipeline của bạn build, chưa bị thay:

\`\`\`bash
cosign sign --yes ghcr.io/me/myapp@sha256:abc...   # ký theo digest
cosign verify ghcr.io/me/myapp@sha256:abc... \\
  --certificate-identity=... --certificate-oidc-issuer=...
\`\`\`

Cluster có thể bật policy "chỉ chạy image có chữ ký hợp lệ" (Kyverno/Gatekeeper).

### 10.5 Provenance

Provenance = "giấy khai sinh" của artifact: build từ commit nào, workflow nào, lúc nào. GitHub Actions có thể sinh provenance attestation tự động (SLSA level 3):

\`\`\`yaml
permissions:
  id-token: write
  attestations: write
# ...
- uses: actions/attest-build-provenance@v1
  with:
    subject-name: ghcr.io/\${{ github.repository }}
    subject-digest: \${{ steps.build.outputs.digest }}
\`\`\`

> 📝 **Tóm tắt mục 10.** SLSA chống supply chain attack bằng cách *chứng minh* nguồn gốc artifact. Từ dễ tới khó: pin dependency (+ \`go.sum\` checksum) + Dependabot → signed commit/tag → SBOM (danh sách nguyên liệu để tra CVE) → image signing (cosign) → provenance (giấy khai sinh build). Pin action theo SHA, không theo tag.

---

## 11. GitOps — Git là source of truth

> 💡 **Trực giác.** GitOps đảo ngược mô hình deploy. Thay vì pipeline *đẩy* (push) lệnh \`kubectl apply\` vào cluster, ta để trạng thái mong muốn (desired state) nằm **trong Git** dưới dạng file YAML, và một agent trong cluster (ArgoCD/Flux) liên tục *kéo* (pull) — so sánh "Git nói nên thế nào" với "cluster đang thế nào" rồi tự đồng bộ.

Bốn nguyên tắc GitOps:

1. **Declarative** — toàn bộ trạng thái hệ thống mô tả bằng file khai báo (YAML), không phải script tuần tự.
2. **Versioned & immutable** — trạng thái lưu trong Git → có history, rollback = \`git revert\`.
3. **Pulled automatically** — agent trong cluster tự kéo và áp dụng.
4. **Continuously reconciled** — agent liên tục so sánh thực tế vs Git, tự sửa drift (ai đó \`kubectl edit\` tay → agent kéo về đúng Git).

Luồng GitOps điển hình:

\`\`\`
CI build image → push registry → CI sửa tag image trong repo-config (commit)
                                          │
                                          ▼
              ArgoCD/Flux phát hiện repo-config đổi → sync vào cluster
\`\`\`

- **ArgoCD** — UI mạnh, phổ biến, app-of-apps pattern.
- **Flux** — gọn, GitOps Toolkit, hợp CLI-first.

> ❓ **Câu hỏi tự nhiên.** *"Rollback trong GitOps làm sao?"* — \`git revert\` commit đã đổi tag image. Agent thấy Git về tag cũ → tự deploy lại version cũ. Rollback chính là một commit Git → có audit trail.

> ⚠ **Lỗi thường gặp.** Vừa dùng GitOps vừa \`kubectl edit\` tay vào cluster → agent reconcile sẽ *ghi đè* thay đổi tay của bạn (đó là tính năng, không phải bug). Với GitOps, **mọi thay đổi phải qua Git**.

> 📝 **Tóm tắt mục 11.** GitOps: desired state nằm trong Git, agent (ArgoCD/Flux) tự pull + reconcile. Lợi: audit trail, rollback = \`git revert\`, tự sửa drift. Quy tắc vàng: đừng sửa cluster bằng tay, mọi thay đổi qua Git.

---

## 12. Versioning — semver + git tag → release

**SemVer** (Semantic Versioning): \`MAJOR.MINOR.PATCH\`, vd \`v2.4.1\`.

| Phần | Tăng khi | Ví dụ |
|------|----------|-------|
| **MAJOR** | thay đổi *phá vỡ tương thích* (breaking) | \`v1.x → v2.0.0\`: đổi signature API public |
| **MINOR** | thêm tính năng *tương thích ngược* | \`v2.3.x → v2.4.0\`: thêm endpoint mới |
| **PATCH** | sửa bug *tương thích ngược* | \`v2.4.0 → v2.4.1\`: vá lỗi nhỏ |

Quy trình release: tag commit → pipeline build artifact + tạo GitHub Release:

\`\`\`bash
git tag -s v2.4.1 -m "release v2.4.1"
git push origin v2.4.1     # trigger workflow on: push tags
\`\`\`

**goreleaser** tự động hoá toàn bộ: build binary nhiều OS/arch, đóng gói, tạo changelog, đẩy lên GitHub Release, build + push Docker image, sinh SBOM:

\`\`\`yaml
# .goreleaser.yml (rút gọn)
builds:
  - goos: [linux, darwin, windows]
    goarch: [amd64, arm64]
release:
  github: { owner: me, name: myapp }
\`\`\`

\`\`\`yaml
# workflow trigger goreleaser khi push tag
on:
  push:
    tags: ['v*']
jobs:
  release:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with: { fetch-depth: 0 }   # goreleaser cần full history cho changelog
      - uses: goreleaser/goreleaser-action@v6
        with: { args: release --clean }
        env: { GITHUB_TOKEN: \${{ secrets.GITHUB_TOKEN }} }
\`\`\`

> 📝 **Tóm tắt mục 12.** SemVer \`MAJOR.MINOR.PATCH\`: MAJOR=breaking, MINOR=feature tương thích, PATCH=bugfix. Tag (đã ký \`-s\`) → trigger release workflow. \`goreleaser\` tự build đa nền tảng + changelog + Release + Docker + SBOM.

---

## 13. Rollback — quay lui nhanh khi deploy hỏng

Deploy fail là chuyện *khi nào*, không phải *có hay không*. Quan trọng là rollback nhanh.

### 13.1 Rollback thủ công

\`\`\`bash
# Kubernetes: quay về revision trước
kubectl rollout undo deployment/myapp
kubectl rollout undo deployment/myapp --to-revision=3   # về revision cụ thể

# GitOps: revert commit đã đổi tag
git revert <sha> && git push     # ArgoCD tự deploy lại version cũ

# Blue-green: switch traffic về blue
# (đổi service selector về môi trường cũ — tức thì)
\`\`\`

### 13.2 Automated rollback theo metric

Canary/Argo Rollouts có thể **tự rollback** dựa trên metric ([Lesson 73](../lesson-73-metrics-prometheus/)):

\`\`\`
canary nhận 10% traffic → đo error rate trong 5 phút
   error rate < 1%  → promote (tăng %)
   error rate > 5%  → tự rollback, alert team
\`\`\`

Cấu hình (ý niệm, dạng Argo Rollouts AnalysisTemplate):

\`\`\`yaml
metrics:
  - name: error-rate
    interval: 1m
    failureLimit: 3
    provider:
      prometheus:
        query: |
          sum(rate(http_requests_total{status=~"5..",version="canary"}[1m]))
          / sum(rate(http_requests_total{version="canary"}[1m]))
    successCondition: result < 0.01   # < 1% lỗi mới promote
\`\`\`

> 💡 **Trực giác.** Automated rollback = "cầu chì". Bạn không ngồi canh dashboard lúc 3 giờ sáng; hệ thống tự đo error rate, vượt ngưỡng thì tự ngắt (rollback) và đánh thức bạn. Con người chỉ vào cuộc *sau khi* bug đã được giới hạn.

> 📝 **Tóm tắt mục 13.** Rollback phải nhanh: \`kubectl rollout undo\`, \`git revert\` (GitOps), switch traffic (blue-green). Tốt nhất: automated rollback theo metric — canary tự đo error rate, vượt ngưỡng thì tự lui và alert. Luôn có rollback plan *trước khi* deploy.

---

## 14. Common pitfall

| Pitfall | Hậu quả | Cách tránh |
|---------|---------|------------|
| **Không test trong CI** | ship bug ra prod, "CI" chỉ là build | Bắt buộc \`go test -race\` là check required (mục 8) |
| **Flaky test** | test lúc pass lúc fail → block pipeline, dev mất niềm tin | Cô lập, fix hoặc quarantine test flaky; không retry mù |
| **Secret leak trong log** | lộ credential vĩnh viễn trong log/history | Dùng Secrets, đừng \`echo\`/\`base64\` secret (mục 7) |
| **Không vuln scan** | ship dependency có CVE đã biết | Thêm stage \`govulncheck\` + \`trivy\` (mục 3.5) |
| **Không có rollback plan** | deploy hỏng → loay hoay, downtime kéo dài | Chuẩn bị rollback *trước* deploy; canary + auto-rollback (mục 13) |
| **Pipeline chậm, no cache** | feedback 10 phút → dev frustration, hay skip CI | Cache module + build (mục 5); fail-fast (mục 3) |

> ⚠ **Về flaky test.** Cám dỗ lớn nhất là \`retry: 3\` cho test flaky để "nó xanh là được". Đây là *che giấu* bug, không phải sửa. Flaky thường lộ race condition hoặc phụ thuộc thời gian/thứ tự thật — chính là bug bạn cần biết. Cô lập và sửa, đừng retry mù.

> ❓ **Câu hỏi tự nhiên.** *"Pipeline bao lâu là 'chậm'?"* — Quy tắc ngón tay cái: feedback CI cho PR nên < 10 phút (lý tưởng < 5). Quá lâu → dev mất context, ngại push nhỏ, hoặc tìm cách bypass. Tối ưu: cache, song song hoá job, tách stage nhanh (lint/unit) khỏi stage chậm (e2e).

> 📝 **Tóm tắt mục 14.** Sáu pitfall: thiếu test (→ required check), flaky test (→ sửa, đừng retry mù), leak secret (→ Secrets + không echo), không scan (→ govulncheck/trivy), không rollback plan (→ chuẩn bị trước), pipeline chậm (→ cache + song song). Mục tiêu: CI < 10 phút, đáng tin, an toàn.

---

## Bài tập

> Mỗi bài đều có **lời giải chi tiết** ở mục kế tiếp.

1. **BT1 — Workflow CI cơ bản.** Viết một GitHub Actions workflow chạy lint + test + build cho một dự án Go, trigger khi push/PR vào \`main\`.
2. **BT2 — Docker build + push.** Thêm job build Docker image và push lên GitHub Container Registry (GHCR), chỉ chạy khi push \`main\` và sau khi test pass.
3. **BT3 — Matrix test.** Cấu hình matrix test trên Go 1.21 và 1.22, trên \`ubuntu-latest\` và \`macos-latest\`. Đảm bảo một cell fail không hủy các cell khác.
4. **BT4 — Chọn deploy strategy.** Cho 3 tình huống, chọn deploy strategy phù hợp và giải thích: (a) đổi một config nhỏ tương thích ngược; (b) migration schema DB phá vỡ tương thích; (c) feature mới rủi ro cao trên dịch vụ traffic lớn.
5. **BT5 — Vuln scan stage.** Thêm stage quét lỗ hổng bằng \`govulncheck\` (code Go) và \`trivy\` (dependency/filesystem) vào workflow. Fail pipeline khi có CVE HIGH/CRITICAL.
6. **BT6 — Diagnose deploy crash.** Deploy báo "thành công" nhưng app crash ngay khi nhận traffic. Mô tả quy trình rollback nhanh và các bước điều tra nguyên nhân.

---

## Lời giải chi tiết

### Lời giải BT1 — Workflow CI cơ bản

**Cách tiếp cận:** một job \`ci\` trên \`ubuntu-latest\`, dùng \`setup-go\` (có cache), chạy lần lượt lint → test → build.

\`\`\`yaml
# .github/workflows/ci.yml
name: CI
on:
  push: { branches: [main] }
  pull_request: { branches: [main] }
permissions:
  contents: read
jobs:
  ci:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-go@v5
        with:
          go-version: '1.22'
          cache: true                 # cache module + build → nhanh
      - name: Lint
        uses: golangci/golangci-lint-action@v6
        with: { version: v1.59 }
      - name: Test
        run: go test -race -cover ./...
      - name: Build
        run: go build ./...
\`\`\`

**Giải thích từng bước:**
- \`on:\` giới hạn trigger ở push/PR vào \`main\` → không tốn runner cho branch khác.
- \`setup-go\` \`cache: true\` tự cache \`~/go/pkg/mod\` + \`~/.cache/go-build\`, key theo \`go.sum\`.
- Lint trước (rẻ, fail-fast), rồi test (\`-race\` bắt data race, \`-cover\` báo coverage), rồi build (đảm bảo compile sạch).
- \`permissions: contents: read\` — nguyên tắc least-privilege, job chỉ đọc repo.

### Lời giải BT2 — Docker build + push

**Cách tiếp cận:** thêm job \`docker\` với \`needs: ci\` (đợi test pass) và \`if:\` giới hạn chỉ push \`main\`. Login GHCR bằng \`GITHUB_TOKEN\`, dùng \`docker/build-push-action\`.

\`\`\`yaml
  docker:
    needs: ci                          # chỉ chạy sau khi job ci pass
    if: github.event_name == 'push' && github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    permissions:
      contents: read
      packages: write                  # cần để push lên GHCR
    steps:
      - uses: actions/checkout@v4
      - uses: docker/login-action@v3
        with:
          registry: ghcr.io
          username: \${{ github.actor }}
          password: \${{ secrets.GITHUB_TOKEN }}   # token tự cấp, không hardcode
      - uses: docker/build-push-action@v6
        with:
          context: .
          push: true
          tags: |
            ghcr.io/\${{ github.repository }}:\${{ github.sha }}
            ghcr.io/\${{ github.repository }}:latest
\`\`\`

**Giải thích:**
- \`needs: ci\` → fail-fast: image không build nếu test fail (tiết kiệm thời gian build đắt).
- \`if:\` → PR không push image (PR chỉ kiểm tra, không deploy). Chỉ push lên \`main\` mới đẩy image.
- \`packages: write\` → quyền tối thiểu để push GHCR.
- Tag kép: \`:\${{ github.sha }}\` (truy ngược commit) + \`:latest\` (tiện reference).
- \`GITHUB_TOKEN\` tự sinh, hết hạn sau run → an toàn hơn PAT.

### Lời giải BT3 — Matrix test

**Cách tiếp cận:** thêm \`strategy.matrix\` với 2 trục \`go\` × \`os\`, đặt \`fail-fast: false\`.

\`\`\`yaml
  test:
    runs-on: \${{ matrix.os }}
    strategy:
      fail-fast: false                 # 1 cell fail KHÔNG hủy cell khác
      matrix:
        os: [ubuntu-latest, macos-latest]
        go: ['1.21', '1.22']
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-go@v5
        with:
          go-version: \${{ matrix.go }}
          cache: true
      - run: go test -race -cover ./...
\`\`\`

**Giải thích:**
- Sinh 4 job song song: \`(ubuntu,1.21)\`, \`(ubuntu,1.22)\`, \`(macos,1.21)\`, \`(macos,1.22)\`.
- \`fail-fast: false\` quan trọng: mặc định GitHub hủy toàn bộ matrix khi 1 cell fail; tắt đi để thấy *mọi* cell nào fail trong một lần chạy → debug nhanh.
- \`runs-on: \${{ matrix.os }}\` và \`go-version: \${{ matrix.go }}\` tham chiếu biến matrix.
- **Độ phức tạp thời gian:** 4 cell chạy song song → tổng ≈ thời gian 1 cell (không phải 4×), miễn còn quota runner.

### Lời giải BT4 — Chọn deploy strategy

| Tình huống | Strategy chọn | Lý do |
|------------|---------------|-------|
| **(a)** Đổi config nhỏ, tương thích ngược | **Rolling** | Zero-downtime, v1/v2 tương thích nên chạy song song an toàn; mặc định K8s, đơn giản, không tốn 2× tài nguyên. |
| **(b)** Migration schema DB phá vỡ tương thích | **Recreate** (hoặc rolling + migration 2 pha) | Rolling/canary nguy hiểm vì v1 và v2 cùng dùng DB nhưng *không tương thích*. An toàn: recreate (chấp nhận downtime ngắn), hoặc expand-contract: deploy version trung gian đọc được cả 2 schema → rolling → dọn schema cũ. |
| **(c)** Feature rủi ro cao, traffic lớn | **Canary** | Giới hạn blast radius — cho 5% traffic, đo error rate/latency (metric), tốt thì tăng dần, xấu thì auto-rollback chỉ 5% user dính. Cần hệ observability đủ tốt. |

**Điểm mấu chốt:** câu hỏi quyết định luôn là *"hai version có chạy song song an toàn không?"*. Có → rolling/canary. Không → recreate hoặc migration 2 pha. Rủi ro càng cao + traffic càng lớn → càng nghiêng về canary.

### Lời giải BT5 — Vuln scan stage

**Cách tiếp cận:** thêm 2 step — \`govulncheck\` (phân tích call graph code Go) + \`trivy\` (quét filesystem/dependency). Cả hai exit code ≠ 0 khi có lỗ hổng → tự fail pipeline.

\`\`\`yaml
      - name: Govulncheck (Go code)
        run: |
          go install golang.org/x/vuln/cmd/govulncheck@latest
          govulncheck ./...           # exit ≠0 nếu có CVE reachable

      - name: Trivy filesystem scan
        uses: aquasecurity/trivy-action@0.24.0
        with:
          scan-type: fs
          severity: HIGH,CRITICAL     # chỉ fail ở mức nặng
          exit-code: '1'              # có lỗ hổng → fail pipeline
          ignore-unfixed: true        # bỏ qua CVE chưa có bản vá (giảm noise)
\`\`\`

**Giải thích:**
- \`govulncheck\` chỉ báo CVE mà code *thực sự gọi tới* (reachable) → ít false-positive hơn quét thô.
- \`trivy\` \`scan-type: fs\` quét dependency + cấu hình; \`severity: HIGH,CRITICAL\` để không bị ngập cảnh báo LOW/MEDIUM.
- \`exit-code: '1'\` → khi tìm thấy lỗ hổng đạt ngưỡng, step fail → pipeline fail (gác cổng).
- \`ignore-unfixed: true\` → CVE chưa có patch không thể sửa ngay → không block (tránh pipeline kẹt vô tận); xử lý riêng qua review.
- Đặt stage này *sau* test, *trước* build image — không phí công build image nếu dependency có lỗ hổng.

### Lời giải BT6 — Diagnose deploy crash

**Tình huống:** pipeline báo deploy "thành công" (image push xong, \`kubectl apply\` không lỗi) nhưng app crash ngay khi nhận traffic.

**Bước 1 — Rollback NGAY (giảm thiệt hại trước, điều tra sau):**
\`\`\`bash
kubectl rollout undo deployment/myapp        # về version trước đó
kubectl rollout status deployment/myapp      # xác nhận version cũ chạy ổn
# (GitOps: git revert <sha> && git push → ArgoCD tự lui)
# (blue-green: switch traffic về blue)
\`\`\`
Nguyên tắc: **giảm tác động lên user trước, RCA (root cause analysis) sau**. Đừng debug trên production đang cháy.

**Bước 2 — Thu thập bằng chứng từ deploy hỏng:**
\`\`\`bash
kubectl get pods -l app=myapp                # thấy CrashLoopBackOff?
kubectl logs <pod> --previous                 # log của container đã crash (lần trước)
kubectl describe pod <pod>                     # event: OOMKilled? liveness fail? image pull?
\`\`\`

**Bước 3 — Phân loại nguyên nhân thường gặp:**
- **CrashLoopBackOff + log "missing env/config"** → thiếu config/secret ở môi trường mới (xem [Lesson 78](../lesson-78-config-management/)).
- **OOMKilled** → resource limit quá thấp cho version mới.
- **Liveness probe fail** → app khởi động chậm hơn, cần tăng \`initialDelaySeconds\`.
- **App chạy nhưng lỗi runtime với traffic thật** → bug chỉ lộ với dữ liệu/tải thật mà test không phủ.

**Bước 4 — Vì sao "deploy thành công" mà vẫn crash?** Vì "apply thành công" ≠ "app khỏe". \`kubectl apply\` chỉ xác nhận *đã nhận lệnh*, không xác nhận pod chạy ổn. **Bài học:** pipeline phải có **health gate sau deploy** — chờ \`rollout status\` + kiểm tra readiness/smoke test trước khi tuyên bố thành công:
\`\`\`yaml
- run: |
    kubectl rollout status deployment/myapp --timeout=120s
    curl -fsS https://myapp/healthz            # smoke test, fail → coi như deploy fail
\`\`\`

**Bước 5 — Phòng ngừa tái diễn:** thêm smoke test sau deploy; nếu rủi ro cao, chuyển sang **canary + auto-rollback theo metric** (mục 13) để hệ thống tự lui khi error rate vọt — không phụ thuộc con người canh.

---

## Code & Minh họa

- [solutions.go](./solutions.go) — một app Go nhỏ (HTTP handler \`/healthz\` + hàm nghiệp vụ) kèm test, minh hoạ chính thứ mà pipeline CI sẽ lint + test + build. Chạy: \`go test -race -cover ./...\` và \`go run solutions.go\`.
- [.github/workflows/ci.yml](./.github/workflows/ci.yml) — workflow tham khảo đầy đủ (lint + matrix test + vuln scan + docker), khớp với BT1-3-5.
- [visualization.html](./visualization.html) — 3 module tương tác:
  1. **Pipeline stages** — animate commit → lint → test → build → scan → deploy, dừng ngay khi một stage fail (fail-fast).
  2. **Deploy strategies** — so sánh recreate / rolling / blue-green / canary bằng animation instance + traffic.
  3. **Canary rollout** — dịch % traffic từng bước, đo error rate giả lập, tự promote (tốt) hoặc rollback (xấu).

---

## Bài tiếp theo

- [Lesson 78 — Config Management](../lesson-78-config-management/) — tách config khỏi code (12-factor), env/flag/file, secret injection an toàn trong pipeline. Liên hệ trực tiếp với BT6 (crash do thiếu config) và mục 7 (secrets).

## Tham khảo

- [GitHub Actions docs](https://docs.github.com/actions)
- [SLSA framework](https://slsa.dev/)
- [Argo Rollouts (canary/blue-green)](https://argo-rollouts.readthedocs.io/)
- [goreleaser](https://goreleaser.com/)
- [govulncheck](https://pkg.go.dev/golang.org/x/vuln/cmd/govulncheck)
- [DORA / Accelerate metrics](https://dora.dev/)
`;
