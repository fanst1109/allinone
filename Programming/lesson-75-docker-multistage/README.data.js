// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: Programming/lesson-75-docker-multistage/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 75 — Docker Multi-stage build cho Go

> **Tier 7 — Production / DevOps / SWE**
> Đóng gói một Go service thành image siêu nhỏ, an toàn, deploy được ở bất cứ đâu.

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Phân biệt **container** với **máy ảo (VM)**, hiểu vì sao container nhẹ và khởi động nhanh.
- Nắm các khái niệm Docker cốt lõi: **image**, **layer**, **container**, **Dockerfile**, **registry**.
- Viết được một **Dockerfile naive** cho Go và thấy tận mắt vì sao nó ra image ~1GB.
- Áp dụng **multi-stage build** để giảm image từ ~1GB xuống ~10MB.
- Chọn đúng **base image** (\`scratch\` / \`distroless\` / \`alpine\`) cho từng tình huống.
- Sắp xếp **layer caching** đúng để build nhanh hơn 10×.
- Hiểu \`-ldflags="-s -w"\`, \`CGO_ENABLED=0\`, \`.dockerignore\`, multi-arch build, healthcheck, build args.
- Đóng gói **an toàn**: chạy non-root, scan image, không bake secret vào layer.

## Kiến thức tiền đề

- [Lesson 06 — Hello World & Toolchain](../lesson-06-hello-world-toolchain/README.md) — biết \`go build\` sinh ra một binary tĩnh thế nào.
- [Lesson 20 — Packages & Modules](../lesson-20-packages-modules/README.md) — hiểu \`go.mod\`, \`go.sum\`, \`go mod download\`.
- [Lesson 42 — net/http sâu](../lesson-42-http-net-deep/README.md) — service ta đóng gói trong bài này là một HTTP server.
- [Lesson 47 — TLS & Crypto](../lesson-47-tls-crypto-basics/README.md) — vì sao image cần CA certificate để gọi HTTPS.

---

## 1. Container vs Máy ảo (VM)

> 💡 **Trực giác.** Hãy hình dung một toà chung cư. **Máy ảo** giống mỗi hộ dựng riêng một căn nhà hoàn chỉnh: móng, tường, hệ thống điện nước, mái — mọi thứ tách biệt tuyệt đối nhưng nặng nề và tốn đất. **Container** giống các căn hộ trong cùng một toà nhà: dùng chung móng và khung kết cấu (kernel của hệ điều hành host), mỗi hộ chỉ trang trí nội thất riêng. Vì dùng chung phần nặng nhất, container nhẹ hơn rất nhiều và "dọn vào ở" (start) gần như tức thì.

### 1.1 Khác biệt cốt lõi

| Tiêu chí | Máy ảo (VM) | Container |
|----------|-------------|-----------|
| Lớp ảo hoá | Hypervisor giả lập **phần cứng** | Kernel host được **chia sẻ** (namespaces + cgroups) |
| Hệ điều hành | Mỗi VM có **guest OS đầy đủ** (kernel riêng) | **Không có kernel riêng**, chỉ có userspace |
| Kích thước | Hàng GB (vài GB → vài chục GB) | Hàng MB (10–200 MB là phổ biến) |
| Thời gian khởi động | Vài chục giây → vài phút | **Mili-giây → vài giây** |
| Cô lập | Mạnh nhất (ranh giới phần cứng) | Tốt, nhưng yếu hơn (chung kernel) |
| Mật độ trên 1 host | Vài chục VM | Hàng trăm → hàng nghìn container |

### 1.2 Vì sao container nhẹ và nhanh?

Linux cung cấp hai cơ chế kernel mà Docker khai thác:

- **Namespaces** — cô lập *cái mà process nhìn thấy*: tiến trình (PID), mạng (NET), mount point (MNT), user (USER), hostname (UTS). Process trong container tưởng nó là PID 1, không thấy process của host.
- **cgroups (control groups)** — giới hạn *cái mà process được dùng*: CPU, RAM, I/O. Ví dụ "container này tối đa 256MB RAM, 0.5 CPU".

Vì không phải boot một kernel mới (như VM phải làm), container chỉ là một (hay vài) process Linux bình thường được "đóng hộp". Start container = fork một process + áp namespace + cgroup → **mili-giây**.

> ❓ **Câu hỏi tự nhiên của người đọc**
> - *"Container có an toàn bằng VM không?"* — Không tuyệt đối. Vì chung kernel, một lỗ hổng kernel (container escape) có thể ảnh hưởng cả host. VM cô lập mạnh hơn vì ranh giới là phần cứng ảo. Trong môi trường multi-tenant nhạy cảm, người ta đôi khi chạy container *bên trong* VM (vd gVisor, Kata Containers).
> - *"Trên macOS / Windows thì sao? Đâu có kernel Linux?"* — Docker Desktop chạy một VM Linux nhẹ ẩn bên dưới, container vẫn dùng kernel Linux trong VM đó. Vì vậy trên Mac/Windows, container *có* đi qua một lớp VM mỏng.
> - *"Container và image khác gì nhau?"* — Xem mục 2 ngay dưới: image là khuôn (read-only), container là instance đang chạy (read-write).

> 🔁 **Dừng lại tự kiểm tra**
> 1. Vì sao một container Go 10MB có thể start trong mili-giây còn VM mất vài chục giây?
> 2. Cơ chế kernel nào *giới hạn RAM* của container?
> <details><summary>Đáp án</summary>
> 1. Container không boot kernel riêng — nó chỉ là process Linux dùng chung kernel host, chỉ cần áp namespace + cgroup. VM phải khởi động cả một guest OS (kernel + init + service).
> 2. cgroups. (namespaces chỉ *cô lập tầm nhìn*, cgroups mới *giới hạn tài nguyên*.)
> </details>

> 📝 **Tóm tắt mục 1**
> - VM ảo hoá phần cứng + có kernel riêng → nặng (GB), chậm (giây→phút).
> - Container chia sẻ kernel host qua **namespaces** (cô lập tầm nhìn) + **cgroups** (giới hạn tài nguyên) → nhẹ (MB), nhanh (ms).
> - Đánh đổi: container cô lập yếu hơn VM vì chung kernel.

---

## 2. Docker cơ bản: image, layer, container, Dockerfile, registry

### 2.1 Bốn khái niệm phải phân biệt

| Khái niệm | Là gì | Loại |
|-----------|-------|------|
| **Dockerfile** | File text mô tả *cách build* image (công thức nấu ăn) | Mã nguồn |
| **Image** | Snapshot read-only của filesystem + metadata (cái bánh đã nướng) | Khuôn |
| **Container** | Một instance *đang chạy* của image, có lớp ghi (read-write) ở trên cùng | Process |
| **Registry** | Kho lưu/chia sẻ image (Docker Hub, GHCR, ECR...) | Server |

> 💡 **Trực giác.** Dockerfile là *công thức*. Image là *cái bánh* nướng xong đem cất tủ. Container là *miếng bánh* bạn đang ăn (có thể bóc, thêm topping = ghi dữ liệu, nhưng ăn xong vứt đi không ảnh hưởng cái bánh gốc). Registry là *tiệm bánh* để gửi/lấy bánh.

### 2.2 Layer — trái tim của Docker

Image **không** phải một khối liền. Nó là **chồng các lớp (layer)**, mỗi layer là kết quả của một instruction trong Dockerfile (\`FROM\`, \`COPY\`, \`RUN\`...). Mỗi layer chỉ ghi lại *phần thay đổi* so với layer dưới.

\`\`\`
Dockerfile                          Layer sinh ra
─────────────────────────────────   ───────────────────────────
FROM golang:1.22          ──────►    [Layer 0] base image ~800MB
COPY go.mod go.sum ./     ──────►    [Layer 1] +2 file nhỏ
RUN go mod download       ──────►    [Layer 2] +cache dependency
COPY . .                  ──────►    [Layer 3] +toàn bộ source
RUN go build -o server    ──────►    [Layer 4] +binary
\`\`\`

Hai tính chất quan trọng của layer:

1. **Read-only & chia sẻ.** Nhiều image cùng dựa trên \`golang:1.22\` chia sẻ chung layer base — chỉ lưu một lần trên đĩa.
2. **Cache theo từng layer.** Nếu một layer (và mọi thứ phía trên nó) không đổi, Docker tái dùng layer cũ thay vì build lại. Đây là nền tảng của mục 6 (layer caching).

> ❓ **Câu hỏi tự nhiên.** *"Image nặng vì có nhiều layer à?"* — Không hẳn. Image nặng vì *nội dung* các layer nặng (vd layer base \`golang\` chứa cả toolchain ~800MB). Số lượng layer ảnh hưởng nhỏ. Mục tiêu bài này là *bỏ những layer nặng không cần lúc runtime* — đó chính là multi-stage.

> 🔁 **Dừng lại tự kiểm tra.** Chạy \`docker history myimage\` cho ra gì? <details><summary>Đáp án</summary>Danh sách các layer của image kèm kích thước và lệnh tạo ra nó. Dùng để soi layer nào "phình to". Cảnh báo: lệnh trong \`RUN\` *hiện đầy đủ* ở đây → nếu bạn lỡ \`RUN echo $SECRET\` thì secret lộ trong history.</details>

> 📝 **Tóm tắt mục 2**
> - Dockerfile (công thức) → build → image (khuôn, read-only) → run → container (instance, có lớp ghi).
> - Image = chồng các **layer**; mỗi instruction = một layer; layer read-only, chia sẻ được, **cache được**.
> - Registry = kho push/pull image.

---

## 3. Dockerfile naive cho Go — và vì sao nó ~1GB

Cách viết "ngây thơ" đầu tiên ai cũng làm:

\`\`\`dockerfile
# Dockerfile.naive — ĐỪNG dùng kiểu này cho production
FROM golang:1.22
WORKDIR /app
COPY . .
RUN go build -o server ./cmd/server
EXPOSE 8080
ENTRYPOINT ["/app/server"]
\`\`\`

Build và đo:

\`\`\`bash
docker build -f Dockerfile.naive -t myapp:naive .
docker images myapp:naive
# REPOSITORY   TAG     SIZE
# myapp        naive   1.05GB     ◄── khổng lồ!
\`\`\`

### Vì sao tận ~1GB?

Image cuối **chứa nguyên cả base \`golang:1.22\`**, mà base này có:

| Thành phần | Kích thước xấp xỉ | Có cần lúc *runtime* không? |
|------------|-------------------|------------------------------|
| Go compiler + toolchain (\`go\`, \`gofmt\`, linker...) | ~500 MB | ❌ chỉ cần lúc build |
| Standard library source \`.go\` | ~100 MB | ❌ chỉ cần lúc build |
| Debian base OS (apt, bash, coreutils...) | ~120 MB | ⚠ phần lớn không cần |
| Build cache, module cache | ~200 MB | ❌ chỉ cần lúc build |
| **Binary của bạn** | **~10 MB** | ✅ thứ duy nhất cần! |

Vấn đề cốt lõi: **bạn chỉ cần binary ~10MB để *chạy*, nhưng image kéo theo cả ~1GB toolchain chỉ dùng lúc *build*.** Giống như giao một chiếc bánh kèm theo cả cái lò nướng, bao bột mì và quyển công thức.

> ⚠ **Lỗi thường gặp.** Nghĩ rằng "thêm \`RUN rm -rf /usr/local/go\` ở cuối sẽ xoá toolchain và giảm size". **Sai.** Xoá ở một layer *sau* không thu nhỏ layer *trước* — layer trước vẫn nằm trong image (như xoá file rồi nhưng vết tích vẫn trong lịch sử git). Image chỉ *to thêm* (vì có thêm layer "đã xoá"). Cách đúng là **không bao giờ cho toolchain vào image cuối** → multi-stage.

---

## 4. Multi-stage build — giảm 1GB xuống ~10MB

> 💡 **Trực giác.** Tách quá trình thành hai phòng. **Phòng A (builder)** có đầy đủ lò nướng, bột, công thức — nướng ra cái bánh. **Phòng B (final)** trống trơn, ta *chỉ bê cái bánh* từ phòng A sang, bỏ lại toàn bộ lò và bột. Image cuối = phòng B = chỉ có bánh.

Một Dockerfile có thể chứa **nhiều \`FROM\`**. Mỗi \`FROM\` mở một *stage* mới. Chỉ stage *cuối cùng* trở thành image kết quả; các stage trước chỉ dùng để build rồi bị vứt. \`COPY --from=<stage>\` bê artefact giữa các stage.

\`\`\`dockerfile
# syntax=docker/dockerfile:1

# ---------- Stage 1: builder (có toolchain) ----------
FROM golang:1.22 AS builder
WORKDIR /app

# Copy manifest TRƯỚC để tận dụng cache (xem mục 6)
COPY go.mod go.sum ./
RUN go mod download

# Rồi mới copy source
COPY . .
# CGO_ENABLED=0 → binary tĩnh; -s -w → strip debug info
RUN CGO_ENABLED=0 go build -ldflags="-s -w" -o /app/server ./cmd/server

# ---------- Stage 2: final (trống trơn) ----------
FROM scratch
COPY --from=builder /app/server /server
# scratch không có CA cert → copy từ builder để gọi HTTPS được
COPY --from=builder /etc/ssl/certs/ca-certificates.crt /etc/ssl/certs/
EXPOSE 8080
ENTRYPOINT ["/server"]
\`\`\`

Build và đo lại:

\`\`\`bash
docker build -t myapp:slim .
docker images myapp
# REPOSITORY   TAG     SIZE
# myapp        slim    11.2MB    ◄── từ 1.05GB → ~11MB (giảm ~99%)
# myapp        naive   1.05GB
\`\`\`

Phép tính cụ thể về độ giảm:

\`\`\`
Trước: 1050 MB
Sau:     11 MB
Tỉ lệ giảm = (1050 - 11) / 1050 = 1039 / 1050 ≈ 98.95%
Image cuối ≈ 1/95 image cũ.
\`\`\`

### Stage cũng có thể đặt tên hoặc dùng số

- \`FROM golang:1.22 AS builder\` → tham chiếu \`--from=builder\`.
- Không đặt tên: tham chiếu theo số thứ tự \`--from=0\`, \`--from=1\`...

> ❓ **Câu hỏi tự nhiên**
> - *"Stage builder có bị push lên registry không?"* — Không. Chỉ stage cuối thành image. Builder bị Docker vứt sau khi build (trừ khi bạn dùng \`--target builder\` để build dừng ở đó cho mục đích debug).
> - *"Vì sao phải copy \`ca-certificates.crt\`?"* — \`scratch\` rỗng tuyệt đối, không có CA root. Nếu app gọi \`https://...\`, Go cần CA để verify TLS cert; thiếu → lỗi \`x509: certificate signed by unknown authority\`. Đây là pitfall hàng đầu (mục 15).
> - *"Có copy thêm gì nữa không?"* — Tuỳ app: nếu cần timezone thì copy \`/usr/share/zoneinfo\`; nếu binary tham chiếu user thì copy \`/etc/passwd\`. \`scratch\` *không cho* gì miễn phí.

> 🔁 **Dừng lại tự kiểm tra.** Trong Dockerfile trên, nếu xoá dòng \`COPY --from=builder /etc/ssl/certs/...\`, app vẫn chạy bình thường nhưng request HTTPS thất bại. Đúng hay sai? <details><summary>Đáp án</summary>Đúng. App start được, route HTTP \`:8080\` nội bộ vẫn chạy; chỉ khi gọi ra một endpoint HTTPS bên ngoài mới chết với lỗi x509 vì thiếu CA. Đây là loại bug "chạy được lúc test cục bộ, chết trên production".</details>

> 📝 **Tóm tắt mục 4**
> - Multi-stage = nhiều \`FROM\`; chỉ stage cuối thành image; \`COPY --from=\` bê artefact.
> - Builder chứa toolchain (bị vứt); final chỉ chứa binary → image ~10MB.
> - Với \`scratch\` phải tự copy CA cert (và tzdata/passwd nếu cần).

---

## 5. Lựa chọn base image: scratch / distroless / alpine

Stage cuối nên dựa trên base nào? Ba lựa chọn phổ biến:

| Base | Kích thước base | Có shell? | CA cert? | tzdata? | libc | Khi nào dùng |
|------|-----------------|-----------|----------|---------|------|---------------|
| **\`scratch\`** | **0 B** | ❌ | ❌ (tự copy) | ❌ (tự copy) | không (binary tĩnh) | Image nhỏ nhất, attack surface tối thiểu, binary tĩnh \`CGO_ENABLED=0\` |
| **\`distroless\`** (\`gcr.io/distroless/static\`) | ~2 MB | ❌ | ✅ | ✅ | không/glibc tuỳ variant | Cân bằng: nhỏ + có sẵn CA/tzdata + \`nonroot\` variant, vẫn không shell (an toàn) |
| **\`alpine\`** | ~5–8 MB | ✅ (\`sh\`) | ✅ (cài \`ca-certificates\`) | ✅ | **musl** (không glibc) | Cần shell để debug, cần package manager \`apk\`; cẩn thận CGO |

### 5.1 scratch — rỗng tuyệt đối

\`\`\`dockerfile
FROM scratch
COPY --from=builder /app/server /server
COPY --from=builder /etc/ssl/certs/ca-certificates.crt /etc/ssl/certs/
ENTRYPOINT ["/server"]
\`\`\`

- Ưu: image cuối ≈ đúng kích thước binary. Attack surface gần như 0 (không shell, không package, kẻ tấn công vào được cũng không có công cụ nào).
- Nhược: không debug được (\`docker exec ... sh\` → không có \`sh\`). Phải tự copy CA/tzdata. Bắt buộc binary tĩnh.

### 5.2 distroless — "vừa đủ", do Google bảo trì

\`\`\`dockerfile
FROM gcr.io/distroless/static:nonroot
COPY --from=builder /app/server /server
USER nonroot:nonroot
ENTRYPOINT ["/server"]
\`\`\`

- Có sẵn CA cert + tzdata + \`/etc/passwd\` (user \`nonroot\` UID 65532) → không phải copy thủ công.
- Vẫn **không có shell** → an toàn gần như scratch nhưng tiện hơn.
- Variant: \`static\` (binary tĩnh), \`base\` (có glibc cho CGO), \`cc\`...

### 5.3 alpine — nhỏ + có shell

\`\`\`dockerfile
FROM alpine:3.20
RUN apk add --no-cache ca-certificates tzdata
COPY --from=builder /app/server /server
ENTRYPOINT ["/server"]
\`\`\`

- Có \`sh\`, \`apk\` → debug và cài thêm package dễ. CI/CD nhiều người thích vì exec vào xem được.
- Dùng **musl libc** thay vì glibc → nếu binary build với \`CGO_ENABLED=1\` link glibc, **sẽ crash** trong alpine (\`not found\` / \`no such file\`). Hoặc build với \`CGO_ENABLED=0\` (tĩnh, an toàn), hoặc build trong môi trường musl.

> ⚠ **Lỗi thường gặp (alpine + CGO).** Build host glibc, \`CGO_ENABLED=1\` (mặc định nếu có cgo), chạy trong alpine → \`exec /server: no such file or directory\` (thực ra là thiếu dynamic linker glibc). Khắc phục: \`CGO_ENABLED=0\` hoặc đổi base sang debian-slim/distroless base.

> ❓ **Câu hỏi tự nhiên.** *"alpine 5MB còn distroless 2MB, sao không luôn dùng distroless?"* — distroless không có shell → khó debug khi sự cố trên production (không exec vào được). Một số team chấp nhận đánh đổi vài MB để giữ shell. Lựa chọn là *trade-off security vs debuggability*, không có đáp án tuyệt đối.

> 🔁 **Dừng lại tự kiểm tra.** App cần đọc timezone "Asia/Ho_Chi_Minh" và bạn dùng base \`scratch\`. Cần làm gì? <details><summary>Đáp án</summary>Copy tzdata: \`COPY --from=builder /usr/share/zoneinfo /usr/share/zoneinfo\`. Hoặc import \`_ "time/tzdata"\` trong code Go (Go 1.15+) để nhúng tzdata vào binary, khỏi copy.</details>

> 📝 **Tóm tắt mục 5**
> - \`scratch\`: nhỏ nhất, an toàn nhất, nhưng tự lo CA/tzdata, không debug được, cần binary tĩnh.
> - \`distroless\`: nhỏ + có sẵn CA/tzdata + nonroot, vẫn không shell → lựa chọn cân bằng tốt.
> - \`alpine\`: có shell tiện debug, dùng musl → coi chừng CGO.

---

## 6. Layer caching — thứ tự COPY quyết định tốc độ build

> 💡 **Trực giác.** Docker build từ trên xuống, mỗi layer được cache. Khi build lại, Docker đi từng layer: *"layer này có y hệt lần trước không?"* — nếu giống thì dùng cache, **chuyển tiếp**; nếu khác thì build lại layer đó **và mọi layer phía dưới** (cache invalidate dây chuyền). Vậy nên đặt thứ ít thay đổi (dependency) lên trên, thứ hay đổi (source code) xuống dưới.

### 6.1 Thứ tự SAI — cache miss mỗi lần đổi 1 dòng code

\`\`\`dockerfile
FROM golang:1.22
WORKDIR /app
COPY . .                    # ◄── copy CẢ source (kể cả go.mod)
RUN go mod download         # layer này phụ thuộc layer trên
RUN go build -o server .
\`\`\`

Bạn sửa 1 dòng trong \`main.go\` → layer \`COPY . .\` thay đổi → cache invalidate → \`go mod download\` **chạy lại** (tải lại toàn bộ dependency, có thể vài phút) → rồi mới build. Mỗi lần sửa code = tải lại dep.

### 6.2 Thứ tự ĐÚNG — copy manifest trước, source sau

\`\`\`dockerfile
FROM golang:1.22
WORKDIR /app
COPY go.mod go.sum ./       # ◄── chỉ 2 file, hiếm khi đổi
RUN go mod download         # cache HIT khi go.mod/go.sum không đổi
COPY . .                    # source đổi → chỉ layer này + dưới rebuild
RUN go build -o server .
\`\`\`

Bây giờ sửa \`main.go\`:
- \`COPY go.mod go.sum\` → không đổi → **cache HIT**.
- \`RUN go mod download\` → input không đổi → **cache HIT** (bỏ qua, 0 giây!).
- \`COPY . .\` → source đổi → cache MISS → build lại từ đây.

### 6.3 So sánh thời gian (minh hoạ bằng số)

| Tình huống | Thứ tự SAI | Thứ tự ĐÚNG |
|------------|-----------|-------------|
| Build lần đầu (cold) | ~120 s | ~120 s |
| Sửa 1 dòng code, build lại | ~120 s (tải lại dep) | **~15 s** (chỉ build) |
| Đổi go.mod (thêm dep), build lại | ~120 s | ~120 s |

Quy tắc vàng: **xếp instruction theo tần suất thay đổi tăng dần từ trên xuống.** Manifest (go.mod) trên cùng, source dưới cùng.

> ⚠ **Lỗi thường gặp.** \`COPY . .\` rồi mới \`RUN go mod download\` → mọi thay đổi code đều invalidate dep cache. Đây là pitfall #2 ở mục 15.

> 🔁 **Dừng lại tự kiểm tra.** Bạn đổi \`go.sum\` (thêm một dependency). Layer \`RUN go mod download\` cache hit hay miss? <details><summary>Đáp án</summary>Miss — vì \`COPY go.mod go.sum ./\` thay đổi → invalidate layer download và mọi thứ phía dưới. Đây đúng là điều ta muốn: chỉ tải lại dep *khi danh sách dep thực sự đổi*.</details>

> 📝 **Tóm tắt mục 6**
> - Cache invalidate dây chuyền: một layer đổi → mọi layer dưới rebuild.
> - Copy \`go.mod\`/\`go.sum\` + \`go mod download\` **trước** \`COPY . .\` → đổi code không tải lại dep.
> - Tiết kiệm có thể 120s → 15s mỗi lần build.

---

## 7. \`-ldflags="-s -w"\` — strip debug info

Khi \`go build\`, linker chèn vào binary:
- **Symbol table** (\`-s\` để bỏ): bảng ánh xạ tên hàm/biến → địa chỉ, dùng cho debugger.
- **DWARF debug info** (\`-w\` để bỏ): thông tin debug chi tiết (số dòng, biến local...).

\`\`\`bash
go build -o server ./cmd/server                       # binary ~12 MB
go build -ldflags="-s -w" -o server ./cmd/server      # binary ~8 MB
\`\`\`

Phép tính độ giảm xấp xỉ:

\`\`\`
Không strip: 12 MB
Có strip:     8 MB
Giảm = (12 - 8) / 12 = 4/12 ≈ 33%
\`\`\`

- \`-s\`: bỏ symbol table → không stack trace tên hàm khi panic ở mức linker (Go runtime vẫn in được stack trace nhờ thông tin riêng, nên thực tế ít ảnh hưởng).
- \`-w\`: bỏ DWARF → **không debug bằng delve (\`dlv\`) được nữa**. Trade-off: production thường không debug bằng delve nên chấp nhận được; dev build thì giữ lại.

> ❓ **Câu hỏi tự nhiên.** *"Strip rồi panic có còn đọc được stack trace không?"* — Có. Go runtime nhúng \`pclntab\` (program counter line table) riêng để in stack trace, không phụ thuộc DWARF. \`-s -w\` chỉ chặn debugger ngoài (delve, gdb), không chặn panic trace của runtime.

> 📝 **Tóm tắt mục 7.** \`-ldflags="-s -w"\` strip symbol + DWARF, giảm ~30% size binary; mất khả năng debug bằng delve nhưng panic trace vẫn in được.

---

## 8. \`CGO_ENABLED=0\` — binary tĩnh chạy được trong scratch

Mặc định, nếu code (hoặc dependency) dùng cgo, Go build ra binary **động** link với glibc của hệ thống. Binary động này:
- **Không chạy trong \`scratch\`** (scratch không có glibc).
- Crash trong alpine (alpine dùng musl, không glibc).

\`CGO_ENABLED=0\` tắt cgo → Go build ra **binary tĩnh hoàn toàn** (mọi thứ nhúng vào, không phụ thuộc libc ngoài):

\`\`\`bash
CGO_ENABLED=0 go build -o server ./cmd/server
file server
# server: ELF 64-bit ... statically linked   ◄── tĩnh, chạy mọi nơi
\`\`\`

Một số package std dùng cgo mặc định (vd \`net\` dùng cgo resolver, \`os/user\`). \`CGO_ENABLED=0\` ép dùng pure-Go implementation (Go DNS resolver thay vì gọi libc) → vẫn hoạt động, chỉ khác cơ chế nhỏ.

> ⚠ **Lỗi thường gặp.** Quên \`CGO_ENABLED=0\`, dùng base \`scratch\` → container khởi động ngay lập tức chết với \`exec /server: no such file or directory\` (thực ra là thiếu dynamic linker, không phải thiếu file). Pitfall #6 mục 15.

> 🔁 **Dừng lại tự kiểm tra.** Code có \`import "C"\` (cgo), bạn vẫn muốn image scratch nhỏ. Làm được không? <details><summary>Đáp án</summary>Khó. \`import "C"\` ép cgo, không thể \`CGO_ENABLED=0\`. Lựa chọn: (a) bỏ dependency cgo nếu được; (b) build tĩnh với musl/static glibc + dùng distroless \`base\`/\`cc\` thay scratch; (c) chấp nhận base có glibc. Không có cách "scratch + cgo" đơn giản.</details>

---

## 9. \`.dockerignore\` — đừng gửi rác vào build context

Khi \`docker build .\`, Docker gửi **toàn bộ thư mục hiện tại** (build context) cho daemon. Nếu có \`.git/\` 200MB, \`node_modules/\`, test data lớn → gửi chậm + dễ vô tình \`COPY . .\` chúng vào image.

\`.dockerignore\` (giống \`.gitignore\`) loại trừ chúng:

\`\`\`dockerignore
.git
.gitignore
*.md
Dockerfile
.dockerignore
/vendor          # nếu không build từ vendor
/testdata
*.log
.env             # ◄── QUAN TRỌNG: tránh bake secret vào image
bin/
dist/
\`\`\`

Lợi ích:
1. Build context nhỏ → upload nhanh.
2. Tránh \`COPY . .\` kéo theo \`.git\`, \`.env\`, file rác vào image.
3. **Bảo mật**: \`.env\` chứa secret bị loại → không lọt vào layer (mục 11).

> ⚠ **Lỗi thường gặp.** Không có \`.dockerignore\`, \`COPY . .\` kéo cả \`.git\` (chứa toàn bộ lịch sử) vào builder. Trong multi-stage thì builder bị vứt nên image cuối không sao, *nhưng* nếu single-stage thì \`.git\` lọt thẳng vào image production → lộ lịch sử + phình size.

> 📝 **Tóm tắt mục 9.** \`.dockerignore\` thu nhỏ build context, tránh kéo \`.git\`/\`.env\`/testdata vào image. Luôn loại \`.env\` để khỏi bake secret.

---

## 10. Multi-arch build với \`docker buildx\`

Máy dev có thể là arm64 (Apple Silicon) nhưng server production là amd64 (hoặc ngược lại với AWS Graviton arm64). Một image build cho 1 arch sẽ không chạy được trên arch khác.

\`docker buildx\` build **multi-platform** trong một lệnh, tạo *manifest list* (cùng 1 tag nhưng chứa nhiều image theo arch; máy nào pull thì lấy đúng image của mình):

\`\`\`bash
# Tạo builder hỗ trợ multi-platform (một lần)
docker buildx create --name multi --use

# Build cho cả amd64 + arm64, push lên registry
docker buildx build \\
  --platform linux/amd64,linux/arm64 \\
  -t myregistry/myapp:1.0.0 \\
  --push .
\`\`\`

Với Go thì cross-compile rất rẻ — Go biên dịch chéo native, không cần emulator cho phần build. Để build đúng arch trong stage builder:

\`\`\`dockerfile
FROM --platform=$BUILDPLATFORM golang:1.22 AS builder
ARG TARGETOS TARGETARCH
RUN CGO_ENABLED=0 GOOS=$TARGETOS GOARCH=$TARGETARCH \\
    go build -ldflags="-s -w" -o /app/server ./cmd/server
\`\`\`

\`$BUILDPLATFORM\`, \`$TARGETOS\`, \`$TARGETARCH\` là biến do buildx tự inject. Nhờ Go cross-compile, ta build amd64 + arm64 trên cùng một máy nhanh chóng mà không cần QEMU emulation cho bước build.

> 📝 **Tóm tắt mục 10.** \`docker buildx --platform linux/amd64,linux/arm64\` tạo manifest list đa kiến trúc. Go cross-compile bằng \`GOOS\`/\`GOARCH\` nên build multi-arch rất nhanh.

---

## 11. Bảo mật image

### 11.1 Chạy non-root

Mặc định container chạy với UID 0 (root). Nếu kẻ tấn công thoát ra (container escape), có quyền root → nguy hiểm. Hãy chạy non-root:

\`\`\`dockerfile
# Với scratch: tạo /etc/passwd trong builder rồi copy, hoặc dùng UID số
FROM scratch
COPY --from=builder /app/server /server
USER 1000:1000           # ◄── chạy với UID 1000, không phải root
ENTRYPOINT ["/server"]
\`\`\`

Với distroless có sẵn user \`nonroot\`:

\`\`\`dockerfile
FROM gcr.io/distroless/static:nonroot
USER nonroot:nonroot
\`\`\`

> ⚠ **Lưu ý.** App chạy non-root **không bind được port < 1024** (port đặc quyền). Vì thế production thường để app nghe \`:8080\` rồi để reverse proxy/loadbalancer ánh xạ ra \`:80\`/\`:443\`.

### 11.2 Scan image tìm lỗ hổng

Image có thể chứa CVE (lỗ hổng) trong base hoặc dependency. Scan bằng **trivy** hoặc **grype**:

\`\`\`bash
trivy image myapp:slim
# liệt kê CVE theo mức CRITICAL/HIGH/MEDIUM, kèm version vá

grype myapp:slim
\`\`\`

Đưa scan vào CI/CD ([Lesson 77](../lesson-77-ci-cd-pipeline/README.md)) để chặn release khi có CVE CRITICAL.

### 11.3 Attack surface: distroless < alpine < full

\`\`\`
scratch / distroless  ──►  ít công cụ nhất  ──►  attack surface NHỎ nhất
alpine                ──►  có sh, apk        ──►  trung bình
debian/ubuntu full    ──►  bash, apt, hàng nghìn binary ──► LỚN nhất
\`\`\`

Càng ít thứ trong image, kẻ tấn công vào được càng không có công cụ để leo thang (không \`sh\`, không \`curl\`, không \`wget\`...).

### 11.4 KHÔNG bake secret vào image

\`\`\`dockerfile
# ❌ TUYỆT ĐỐI KHÔNG
ENV API_KEY=sk-secret-123
RUN echo "password=hunter2" > /etc/config
\`\`\`

Mọi secret trong layer **lộ vĩnh viễn** qua \`docker history\` / \`docker inspect\`, kể cả khi bạn "xoá" ở layer sau (layer cũ vẫn còn). Cách đúng: inject secret lúc **runtime** qua env var / mounted secret / secret manager ([Lesson 78](../lesson-78-config-management/README.md)). Nếu cần secret *lúc build* (vd token private repo), dùng **BuildKit secret mount** (không lưu vào layer):

\`\`\`dockerfile
RUN --mount=type=secret,id=gh_token \\
    GH_TOKEN=$(cat /run/secrets/gh_token) go mod download
\`\`\`

\`\`\`bash
docker build --secret id=gh_token,src=./gh_token.txt .
\`\`\`

> 🔁 **Dừng lại tự kiểm tra.** Bạn \`ENV DB_PASSWORD=x\` ở stage builder rồi build multi-stage; stage final không có nó. Secret có an toàn không? <details><summary>Đáp án</summary>An toàn *trong image cuối* (vì builder bị vứt, không vào image final). NHƯNG nếu bạn push *cả intermediate stage* (vd cache export) thì vẫn lộ. An toàn nhất: không \`ENV\` secret ở bất kỳ stage nào, dùng BuildKit \`--mount=type=secret\`.</details>

> 📝 **Tóm tắt mục 11**
> - Chạy \`USER 1000\` / distroless \`nonroot\`, đừng chạy root.
> - Scan bằng trivy/grype, đưa vào CI.
> - Image càng tối giản (scratch/distroless) attack surface càng nhỏ.
> - Không bao giờ \`ENV\`/\`COPY\` secret vào layer — dùng runtime injection hoặc BuildKit secret mount.

---

## 12. Build args & env — inject version qua \`--build-arg\`

Phân biệt hai loại biến:

| | \`ARG\` (build arg) | \`ENV\` (environment) |
|---|---|---|
| Có lúc nào | Chỉ lúc **build** | Lúc build **và** runtime |
| Truyền vào | \`--build-arg KEY=val\` | \`-e KEY=val\` lúc \`docker run\` |
| Lộ trong image? | Không (nếu chỉ dùng trong RUN) | Có (\`docker inspect\`) |

Use case kinh điển: nhúng **version** vào binary lúc build, để \`/health\` hay \`--version\` báo đúng phiên bản đang chạy.

\`\`\`dockerfile
FROM golang:1.22 AS builder
WORKDIR /app
COPY go.mod go.sum ./
RUN go mod download
COPY . .
ARG VERSION=dev
# -X main.version=... ghi đè biến package-level \`var version\` lúc link
RUN CGO_ENABLED=0 go build \\
    -ldflags="-s -w -X main.version=$VERSION" \\
    -o /app/server ./cmd/server

FROM scratch
COPY --from=builder /app/server /server
ENTRYPOINT ["/server"]
\`\`\`

Trong code Go:

\`\`\`go
package main

// Biến này để TRỐNG; linker ghi đè qua -ldflags="-X main.version=..."
var version = "dev"
\`\`\`

Build với version cụ thể:

\`\`\`bash
docker build --build-arg VERSION=$(git describe --tags) -t myapp:1.2.3 .
# hoặc
docker build --build-arg VERSION=1.2.3 -t myapp:1.2.3 .
\`\`\`

\`-X importpath.name=value\` là cú pháp linker: ghi đè giá trị một biến \`string\` package-level *lúc link*, không cần đổi code. Thường nhúng cả \`commit\` và \`buildTime\`:

\`\`\`bash
-ldflags="-s -w \\
  -X main.version=$VERSION \\
  -X main.commit=$(git rev-parse --short HEAD) \\
  -X main.buildTime=$(date -u +%Y-%m-%dT%H:%M:%SZ)"
\`\`\`

> ⚠ **Lỗi thường gặp.** \`-X\` chỉ ghi đè được biến **\`string\` package-level** (không phải \`const\`, không phải biến local, không phải \`int\`). Viết \`const version = "dev"\` → \`-X\` *im lặng không có tác dụng*, version mãi là "dev". Phải dùng \`var\`.

> 📝 **Tóm tắt mục 12.** \`ARG\` (build-time) + \`-ldflags="-X main.version=$VERSION"\` nhúng version vào binary. Biến phải là \`var string\` package-level.

---

## 13. Health check

\`HEALTHCHECK\` cho Docker biết container có *thực sự khoẻ* không (khác với "process còn sống"). Một process còn chạy nhưng deadlock/treo vẫn coi là "khoẻ" nếu chỉ check PID — healthcheck kiểm tra logic ứng dụng.

\`\`\`dockerfile
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \\
  CMD ["/server", "-healthcheck"]
\`\`\`

- \`--interval\`: bao lâu check một lần.
- \`--timeout\`: quá thời gian này coi như fail.
- \`--start-period\`: thời gian "khởi động", fail trong giai đoạn này không tính.
- \`--retries\`: fail liên tiếp bao nhiêu lần → đánh dấu \`unhealthy\`.

> ⚠ **scratch không có shell** → không dùng được \`HEALTHCHECK CMD curl ...\` (không có curl, không có sh). Giải pháp: cho chính binary một flag \`-healthcheck\` tự gọi \`/health\` rồi exit 0/1 (xem \`solutions.go\`), hoặc dùng base có shell, hoặc để orchestrator (Kubernetes liveness/readiness probe — [Lesson 76](../lesson-76-kubernetes-basics/README.md)) lo việc này. Thực tế trên K8s, người ta thường dùng probe của K8s thay vì \`HEALTHCHECK\` của Docker.

Endpoint \`/health\` trong app (xem \`solutions.go\`):

\`\`\`go
mux.HandleFunc("/health", func(w http.ResponseWriter, r *http.Request) {
    w.WriteHeader(http.StatusOK)
    fmt.Fprintln(w, "ok")
})
\`\`\`

> 📝 **Tóm tắt mục 13.** \`HEALTHCHECK\` kiểm tra app *khoẻ*, không chỉ *sống*. Với scratch dùng binary self-check flag; trên K8s ưu tiên liveness/readiness probe.

---

## 14. Checklist tối ưu kích thước image

Áp dụng tuần tự, từ tác động lớn → nhỏ:

| # | Việc | Tác động |
|---|------|----------|
| 1 | **Multi-stage build** (bỏ toolchain) | ~1GB → ~12MB (lớn nhất) |
| 2 | Base \`scratch\`/\`distroless\` thay vì \`golang\`/\`debian\` | bỏ ~120MB OS |
| 3 | \`CGO_ENABLED=0\` (binary tĩnh, cho phép scratch) | mở khoá scratch |
| 4 | \`-ldflags="-s -w"\` (strip debug) | ~30% binary |
| 5 | \`.dockerignore\` (loại .git, testdata) | context + tránh rác |
| 6 | Layer caching đúng thứ tự | tốc độ build (không phải size) |
| 7 | Gộp \`RUN\` (ít layer) nếu dùng base có OS | vài MB |
| 8 | Xoá cache trong cùng layer \`RUN\` (vd \`apk add ... && rm -rf /var/cache/apk/*\`) | vài MB |

Kết quả điển hình cho một Go HTTP service: **~8–12 MB** với scratch, **~10–15 MB** với distroless.

---

## 15. Common pitfalls (đọc kỹ — đây là nơi hay sai)

| # | Pitfall | Triệu chứng | Cách sửa |
|---|---------|-------------|----------|
| 1 | **Single-stage** (\`FROM golang\` + chạy luôn) | Image ~1GB | Multi-stage, stage cuối scratch/distroless |
| 2 | **COPY source trước go.mod** | Build chậm, tải lại dep mỗi lần sửa code | \`COPY go.mod go.sum\` + \`go mod download\` *trước* \`COPY . .\` |
| 3 | **scratch quên CA cert** | HTTPS request lỗi \`x509: certificate signed by unknown authority\` | \`COPY --from=builder /etc/ssl/certs/ca-certificates.crt /etc/ssl/certs/\` |
| 4 | **Chạy root** | Rủi ro bảo mật khi escape | \`USER 1000:1000\` / distroless \`nonroot\` |
| 5 | **Secret trong layer** (\`ENV API_KEY=...\`) | Lộ qua \`docker history\`/\`inspect\` | Runtime injection / BuildKit \`--mount=type=secret\` |
| 6 | **CGO enabled + scratch** | \`exec /server: no such file or directory\` | \`CGO_ENABLED=0\` (binary tĩnh) |
| 7 | **\`-X\` vào \`const\`** | Version mãi là "dev" | Dùng \`var version string\` package-level |
| 8 | **\`rm -rf toolchain\` ở layer sau** | Image *to thêm* thay vì nhỏ đi | Không cho toolchain vào image cuối (multi-stage) |
| 9 | **Quên \`.dockerignore\`** | \`.git\`/\`.env\` lọt vào context/image | Thêm \`.dockerignore\` loại \`.git\`, \`.env\`, \`testdata\` |
| 10 | **alpine + binary glibc** | Crash \`not found\` | \`CGO_ENABLED=0\` hoặc base glibc |

> 💡 **Trực giác chung.** Hầu hết lỗi đến từ một trong hai gốc: (a) *kéo theo thứ không cần lúc runtime* (toolchain, .git, secret) → fix bằng multi-stage + .dockerignore; (b) *thiếu thứ cần lúc runtime* mà scratch không cho miễn phí (CA, tzdata, glibc) → fix bằng copy thủ công hoặc đổi base.

---

## Bài tập

> Làm trước, xem [Lời giải chi tiết](#lời-giải-chi-tiết) sau. Có thể đối chiếu với [\`solutions.go\`](./solutions.go) (HTTP server mẫu) và [\`Dockerfile\`](./Dockerfile) (multi-stage hoàn chỉnh).

### BT1 — Multi-stage Dockerfile, base scratch
Cho một Go service có entrypoint \`./cmd/server\`, nghe port 8080. Viết một Dockerfile **multi-stage** với stage cuối là \`scratch\`, binary tĩnh, đã strip, và gọi được HTTPS.

### BT2 — Tối ưu layer caching
Cho Dockerfile sau (build chậm). Reorder để sửa code không phải tải lại dependency:
\`\`\`dockerfile
FROM golang:1.22
WORKDIR /app
COPY . .
RUN go mod download
RUN go build -o server ./cmd/server
\`\`\`

### BT3 — Inject version qua build-arg + ldflags
Cho code có \`var version = "dev"\` ở \`main\`. Viết phần Dockerfile để \`docker build --build-arg VERSION=1.4.2 ...\` làm \`/version\` endpoint trả về \`1.4.2\`. Chỉ ra một lỗi khiến version mãi là "dev".

### BT4 — scratch vs distroless vs alpine
Chọn base phù hợp cho 3 scenario, giải thích:
- (a) Microservice thuần Go, \`CGO_ENABLED=0\`, cần image nhỏ nhất, không cần debug exec.
- (b) Service cần exec vào debug khi sự cố production, team chưa quen scratch.
- (c) Service cần CA + tzdata sẵn, muốn non-root mà không tự cấu hình, không muốn shell vì lý do bảo mật.

### BT5 — Non-root user + healthcheck
Thêm vào Dockerfile scratch: chạy với UID 1000 và một \`HEALTHCHECK\` hoạt động được dù scratch không có shell. (Gợi ý: app hỗ trợ flag self-check.)

### BT6 — Chẩn đoán: image 1.2GB → < 20MB
Một đồng nghiệp đưa image Go 1.2GB. Liệt kê các bước (theo thứ tự tác động) để đưa xuống < 20MB, ước lượng size sau mỗi bước.

---

## Lời giải chi tiết

### Lời giải BT1 — Multi-stage scratch

**Cách tiếp cận.** Hai stage: builder (\`golang:1.22\`, đủ toolchain) build binary tĩnh đã strip; final (\`scratch\`) chỉ chứa binary + CA cert.

\`\`\`dockerfile
# syntax=docker/dockerfile:1
FROM golang:1.22 AS builder
WORKDIR /app
COPY go.mod go.sum ./
RUN go mod download
COPY . .
RUN CGO_ENABLED=0 go build -ldflags="-s -w" -o /app/server ./cmd/server

FROM scratch
COPY --from=builder /app/server /server
COPY --from=builder /etc/ssl/certs/ca-certificates.crt /etc/ssl/certs/
EXPOSE 8080
ENTRYPOINT ["/server"]
\`\`\`

**Giải thích từng phần:**
- \`CGO_ENABLED=0\` → binary tĩnh, chạy được trong scratch rỗng.
- \`-ldflags="-s -w"\` → strip debug, giảm ~30% binary.
- \`COPY --from=builder /etc/ssl/certs/...\` → cấp CA cho HTTPS (nếu thiếu, request HTTPS lỗi x509).
- \`EXPOSE 8080\` → metadata khai báo port (không tự mở, chỉ là tài liệu cho người vận hành).

Kết quả: image ~8–12 MB.

### Lời giải BT2 — Reorder caching

\`\`\`dockerfile
FROM golang:1.22
WORKDIR /app
COPY go.mod go.sum ./        # ◄── tách manifest ra trước
RUN go mod download          # ◄── cache HIT khi go.mod không đổi
COPY . .                     # ◄── source xuống dưới
RUN go build -o server ./cmd/server
\`\`\`

**Vì sao.** Layer cache invalidate dây chuyền: layer đổi → mọi layer dưới rebuild. Bản gốc \`COPY . .\` ở trên cùng → mỗi lần sửa code, layer này đổi → \`go mod download\` (ngay dưới) bị rebuild → tải lại toàn bộ dep. Tách \`go.mod\`/\`go.sum\` lên trên: chúng hiếm đổi → \`go mod download\` cache hit → đổi code chỉ rebuild từ \`COPY . .\`. Thời gian rebuild khi sửa 1 dòng code: ~120s → ~15s.

### Lời giải BT3 — Inject version

Phần Dockerfile:
\`\`\`dockerfile
ARG VERSION=dev
RUN CGO_ENABLED=0 go build \\
    -ldflags="-s -w -X main.version=$VERSION" \\
    -o /app/server ./cmd/server
\`\`\`
Build: \`docker build --build-arg VERSION=1.4.2 -t myapp:1.4.2 .\` → \`/version\` trả \`1.4.2\`.

**Lỗi khiến version mãi là "dev":** khai báo \`const version = "dev"\` thay vì \`var version = "dev"\`. \`-X importpath.name=value\` của linker chỉ ghi đè được biến **\`var string\` package-level**. Với \`const\`, linker không thể ghi đè (const đã được inline lúc compile) → \`-X\` *im lặng không tác dụng*. Các lỗi khác thường gặp: sai importpath (vd \`-X version=\` thiếu \`main.\`), hoặc biến không phải kiểu \`string\`.

### Lời giải BT4 — Chọn base

- **(a) → \`scratch\`.** Thuần Go + \`CGO_ENABLED=0\` → binary tĩnh chạy được trên scratch. Cần nhỏ nhất + không debug exec → scratch là tối ưu (chỉ nhớ copy CA cert). Image ~8–12MB.
- **(b) → \`alpine\`.** Cần exec vào debug → bắt buộc có shell. scratch/distroless không có \`sh\`. Alpine nhỏ (~5MB) lại có \`sh\`, \`apk\` để cài thêm \`curl\`/\`netcat\` lúc cần. Nhớ \`CGO_ENABLED=0\` hoặc build musl để tránh crash glibc.
- **(c) → \`distroless\` (\`gcr.io/distroless/static:nonroot\`).** Có sẵn CA + tzdata + user \`nonroot\` (khỏi cấu hình thủ công) nhưng *không có shell* → đáp ứng "không muốn shell vì bảo mật". scratch cũng không shell nhưng phải tự copy CA/tzdata và tự lo user → distroless tiện hơn cho yêu cầu này.

### Lời giải BT5 — Non-root + healthcheck cho scratch

\`\`\`dockerfile
FROM scratch
COPY --from=builder /app/server /server
COPY --from=builder /etc/ssl/certs/ca-certificates.crt /etc/ssl/certs/
USER 1000:1000
EXPOSE 8080
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \\
  CMD ["/server", "-healthcheck"]
ENTRYPOINT ["/server"]
\`\`\`

**Giải thích.**
- \`USER 1000:1000\` → chạy non-root. scratch không có \`/etc/passwd\` nhưng dùng UID *số* vẫn được (không cần tên user tồn tại). Lưu ý: non-root không bind được port < 1024 → app phải nghe 8080.
- \`HEALTHCHECK ... CMD ["/server", "-healthcheck"]\`: scratch không có shell/curl, nên không dùng \`CMD curl ...\` được. Thay vào đó cho chính binary một flag \`-healthcheck\`: khi chạy \`/server -healthcheck\`, app tự gọi \`http://localhost:8080/health\` rồi \`os.Exit(0)\` nếu ok, \`os.Exit(1)\` nếu fail (xem \`solutions.go\`). Dạng \`exec form\` (\`["...", "..."]\`) không cần shell.

### Lời giải BT6 — 1.2GB → < 20MB

Các bước theo thứ tự tác động:

1. **Áp dụng multi-stage build** (tác động lớn nhất). Stage builder \`golang:1.22\` build binary, stage cuối base nhỏ. Bỏ toolchain + Go stdlib source + module cache (~800MB+).
   → \`1.2GB → ~130MB\` (nếu stage cuối còn là debian) hoặc thẳng xuống nếu chọn base nhỏ.
2. **Đổi base stage cuối sang \`scratch\` hoặc \`distroless\`** thay vì debian/ubuntu. Bỏ ~120MB OS.
   → \`~130MB → ~15MB\`.
3. **\`CGO_ENABLED=0\`** để binary tĩnh chạy được trên scratch (điều kiện để bước 2 dùng scratch). Nếu trước đó dùng cgo, đây là bước bắt buộc trước khi scratch hoạt động.
4. **\`-ldflags="-s -w"\`** strip debug info → binary ~12MB → ~8MB.
   → \`~15MB → ~10MB\`.
5. **\`.dockerignore\`** loại \`.git\`, \`testdata\`, \`node_modules\` → context nhỏ, tránh \`COPY . .\` kéo rác.
   → ổn định ~8–12MB.

Tổng kết: \`1.2GB → ~10MB\`, dưới mốc 20MB. Nếu vẫn > 20MB, kiểm tra: binary có nhúng asset lớn (embed) không, có copy nhầm thư mục nào vào stage cuối không, base cuối có thực sự là scratch/distroless không.

---

## Code & Minh hoạ

- [\`solutions.go\`](./solutions.go) — HTTP server tối giản: route \`/\`, \`/health\`, \`/version\`; biến \`version\` inject-able qua \`-ldflags\`; flag \`-healthcheck\` để self-check (dùng cho \`HEALTHCHECK\` trên scratch). Biên dịch được: \`go run solutions.go\`, hoặc build: \`go build -ldflags="-s -w -X main.version=1.0.0" -o server solutions.go\`.
- [\`Dockerfile\`](./Dockerfile) — multi-stage hoàn chỉnh (builder + scratch), kèm comment tiếng Việt từng dòng, áp dụng mọi best practice của bài.
- [\`visualization.html\`](./visualization.html) — 3 mô phỏng tương tác:
  1. **Single vs multi-stage** — so sánh image size 1GB vs 10MB, breakdown từng layer.
  2. **Layer caching** — đổi thứ tự COPY, xem cache hit/miss dây chuyền và thời gian build.
  3. **Base image comparison** — scratch/distroless/alpine: size, feature, attack surface.

---

## Bài tiếp theo

- **[Lesson 76 — Kubernetes Basics](../lesson-76-kubernetes-basics/README.md)** — chạy image vừa build trên một cụm: Pod, Deployment, Service, ConfigMap/Secret, liveness/readiness probe, HPA. Đây là nơi \`HEALTHCHECK\` (mục 13) được thay bằng probe của K8s.
- Liên quan: [Lesson 77 — CI/CD Pipeline](../lesson-77-ci-cd-pipeline/README.md) (tự động build/scan/push image), [Lesson 78 — Config Management](../lesson-78-config-management/README.md) (inject secret lúc runtime thay vì bake vào image).

## Tham khảo

- Docker docs — Multi-stage builds, BuildKit.
- Google distroless: \`github.com/GoogleContainerTools/distroless\`.
- Go linker flags: \`go doc cmd/link\`.
- Trivy: \`aquasecurity/trivy\`; Grype: \`anchore/grype\`.
`;
