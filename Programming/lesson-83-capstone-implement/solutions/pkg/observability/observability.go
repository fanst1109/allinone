// Package observability gom phần khởi tạo log/metrics/trace.
//
// Ở Lesson 83 đây mới là STUB: chỉ một structured logger dựa trên slog.
// Phần đầy đủ (Prometheus metrics — Lesson 73, OpenTelemetry tracing —
// Lesson 74) sẽ làm ở Lesson 84 (deploy & observe). Tách ra package riêng
// để khi nâng cấp không phải đụng usecase/handler.
package observability

import (
	"log/slog"
	"os"
)

// NewLogger trả về một slog.Logger ghi JSON ra stdout (structured logging —
// Lesson 72). JSON dễ cho log aggregator (Loki/ELK) parse.
func NewLogger() *slog.Logger {
	h := slog.NewJSONHandler(os.Stdout, &slog.HandlerOptions{
		Level: slog.LevelInfo,
	})
	return slog.New(h)
}

// --- Stub cho metrics/trace (đầy đủ ở Lesson 84) ---

// RecordRedirect là placeholder cho metric "số lượt redirect".
// L84 sẽ nối vào prometheus.Counter thật.
func RecordRedirect(_ string) {}

// RecordShorten là placeholder cho metric "số URL rút gọn".
func RecordShorten() {}
