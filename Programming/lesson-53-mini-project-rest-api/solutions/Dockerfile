# ===== Stage 1: build =====
# Dùng image Go đầy đủ để biên dịch. Sau khi build xong sẽ vứt stage này đi.
FROM golang:1.22-alpine AS builder

WORKDIR /src

# Copy go.mod trước để tận dụng cache layer (không có dependency ngoài nên rất nhanh).
COPY go.mod ./
RUN go mod download

# Copy toàn bộ source và build.
COPY . .
# CGO_ENABLED=0 → binary tĩnh, chạy được trên image scratch (không có libc).
# -ldflags "-s -w" → strip debug info cho binary nhỏ hơn.
RUN CGO_ENABLED=0 GOOS=linux go build -ldflags "-s -w" -o /out/server ./cmd/server

# ===== Stage 2: runtime =====
# scratch là image RỖNG (0 byte) → image cuối chỉ chứa đúng binary + cert.
FROM scratch

# Copy CA certificates để binary gọi được HTTPS ra ngoài (nếu cần sau này).
COPY --from=builder /etc/ssl/certs/ca-certificates.crt /etc/ssl/certs/

# Copy binary tĩnh từ stage build.
COPY --from=builder /out/server /server

EXPOSE 8080
ENV ADDR=:8080

# Chạy trực tiếp binary (không shell — scratch không có /bin/sh).
ENTRYPOINT ["/server"]
