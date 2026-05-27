# syntax=docker/dockerfile:1
#
# Dockerfile multi-stage mẫu cho Lesson 75 — đóng gói `solutions.go` thành
# image ~8-12MB, an toàn, deploy được. Comment tiếng Việt từng phần.
#
# Build cơ bản:
#   docker build -t myapp:slim .
# Build kèm version (xem /version endpoint trả về đúng version):
#   docker build --build-arg VERSION=1.2.3 -t myapp:1.2.3 .
# Build multi-arch:
#   docker buildx build --platform linux/amd64,linux/arm64 -t myreg/myapp:1.2.3 --push .

# ---------- Stage 1: builder (CÓ đầy đủ toolchain Go) ----------
# --platform=$BUILDPLATFORM: build trên kiến trúc của máy build (Go cross-compile
# rẻ nên không cần emulator cho bước build).
FROM --platform=$BUILDPLATFORM golang:1.24 AS builder
WORKDIR /app

# (1) Copy MANIFEST trước source để tận dụng layer cache:
#     go.mod/go.sum hiếm đổi → `go mod download` cache HIT khi chỉ sửa code.
#     Lưu ý: lesson này chỉ có 1 file solutions.go nên go.mod là tối thiểu;
#     dòng dưới giữ nguyên pattern chuẩn cho project thật.
COPY go.mod go.sum* ./
RUN go mod download || true

# (2) Rồi mới copy toàn bộ source.
COPY . .

# (3) Build:
#     - CGO_ENABLED=0  → binary TĨNH, chạy được trong scratch (không cần glibc).
#     - GOOS/GOARCH    → buildx tự inject để build đúng kiến trúc đích.
#     - -ldflags -s -w → strip symbol table + DWARF, giảm ~30% binary.
#     - -X main.version=$VERSION → nhúng version (phải là `var string`).
ARG VERSION=dev
ARG TARGETOS
ARG TARGETARCH
RUN CGO_ENABLED=0 GOOS=${TARGETOS:-linux} GOARCH=${TARGETARCH:-amd64} \
    go build -ldflags="-s -w -X main.version=${VERSION}" \
    -o /app/server ./

# ---------- Stage 2: final (scratch — RỖNG tuyệt đối) ----------
FROM scratch

# Copy binary từ builder. Đây là thứ DUY NHẤT cần lúc runtime.
COPY --from=builder /app/server /server

# scratch không có CA root → copy để gọi HTTPS được (tránh lỗi x509).
COPY --from=builder /etc/ssl/certs/ca-certificates.crt /etc/ssl/certs/

# Chạy NON-ROOT (UID 1000). scratch không có /etc/passwd nhưng UID số vẫn dùng được.
# Lưu ý: non-root không bind được port < 1024 → app nghe :8080.
USER 1000:1000

EXPOSE 8080

# HEALTHCHECK cho scratch: không có shell/curl nên dùng chính binary self-check
# (exec form, không cần shell). solutions.go xử lý flag -healthcheck.
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD ["/server", "-healthcheck"]

ENTRYPOINT ["/server"]
