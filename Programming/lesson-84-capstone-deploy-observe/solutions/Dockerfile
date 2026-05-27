# =============================================================================
# Dockerfile multi-stage cho URL Shortener (Capstone L82-84)
# Mục tiêu: image production < 20MB, non-root, không shell, không package manager.
# Tham khảo: Lesson 75 — Docker multi-stage build.
# =============================================================================

# -----------------------------------------------------------------------------
# STAGE 1 — builder: có toàn bộ toolchain Go, build ra 1 binary tĩnh.
# Dùng alpine để có ca-certificates + tạo user non-root copy sang stage sau.
# -----------------------------------------------------------------------------
FROM golang:1.24-alpine AS builder

# git + ca-certificates: git cho `go mod download` (private dep), certs cho TLS.
RUN apk add --no-cache git ca-certificates tzdata

WORKDIR /src

# Copy go.mod + go.sum trước -> tận dụng layer cache: chỉ download lại dep
# khi go.mod/go.sum đổi, không phải mỗi lần đổi code.
COPY go.mod go.sum* ./
RUN go mod download

# Giờ mới copy toàn bộ source (layer này đổi thường xuyên).
COPY . .

# Build flags quan trọng:
#   CGO_ENABLED=0   -> binary tĩnh, không link libc -> chạy được trên scratch.
#   -trimpath       -> bỏ path tuyệt đối của máy build (reproducible + bảo mật).
#   -ldflags "-s -w"-> bỏ symbol table (-s) + DWARF debug (-w) -> giảm ~30% size.
#   -X ...Version   -> nhúng version (build-time) vào binary để /healthz báo cáo.
ARG VERSION=dev
ARG COMMIT=unknown
RUN CGO_ENABLED=0 GOOS=linux GOARCH=amd64 \
    go build \
      -trimpath \
      -ldflags="-s -w -X main.Version=${VERSION} -X main.Commit=${COMMIT}" \
      -o /out/urlshortener \
      ./cmd/server

# (Tuỳ chọn) nén thêm bằng upx có thể giảm còn ~5MB, nhưng làm chậm cold start
# và một số scanner cảnh báo -> ở đây bỏ qua, ưu tiên startup nhanh.

# -----------------------------------------------------------------------------
# STAGE 2 — runtime: scratch (rỗng tuyệt đối). Chỉ chứa binary + certs + tz.
# Không shell, không apk, không /bin/sh -> attack surface tối thiểu.
# Nếu cần debug (exec vào container) thì đổi sang gcr.io/distroless/static.
# -----------------------------------------------------------------------------
FROM scratch AS runtime

# ca-certificates: cần để gọi HTTPS ra ngoài (vd OTel collector qua TLS).
COPY --from=builder /etc/ssl/certs/ca-certificates.crt /etc/ssl/certs/
# tzdata: cần nếu code dùng time.LoadLocation; nếu chỉ UTC có thể bỏ.
COPY --from=builder /usr/share/zoneinfo /usr/share/zoneinfo
# /etc/passwd với 1 user nonroot (uid 65532) để chạy non-root trên scratch.
COPY --from=builder /etc/passwd /etc/passwd

COPY --from=builder /out/urlshortener /urlshortener

# Chạy non-root: uid 65532 (chuẩn distroless "nonroot"). Trên scratch ta phải
# tự đảm bảo uid này tồn tại — thực tế K8s securityContext.runAsUser ép cũng đủ,
# nhưng khai báo ở đây để `docker run` mặc định cũng non-root.
USER 65532:65532

EXPOSE 8080

# HEALTHCHECK của Docker cần shell/curl -> scratch không có. Trên K8s ta dùng
# httpGet probe (xem k8s/deployment.yaml) nên KHÔNG khai báo HEALTHCHECK ở đây.
# Nếu chạy docker thuần và muốn healthcheck, đổi base sang distroless:debug
# hoặc thêm 1 binary health-check tĩnh riêng.

ENTRYPOINT ["/urlshortener"]
