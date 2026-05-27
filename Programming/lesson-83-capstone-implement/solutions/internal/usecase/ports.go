// Package usecase chứa application logic và ĐỊNH NGHĨA các port (interface)
// mà nó cần. Đây là điểm cốt lõi của Dependency Inversion: usecase sở hữu
// interface, tầng adapter (memory/Postgres/Redis) implement chúng và được
// tiêm vào qua constructor. Dependency luôn trỏ vào trong.
package usecase

import (
	"context"
	"time"

	"urlshortener/internal/domain"
)

// URLRepository là driven port cho lưu trữ bền (production: Postgres).
// Bản in-memory hiện tại chỉ là một implementation; muốn đổi sang Postgres
// chỉ cần viết struct mới thỏa interface này, KHÔNG sửa usecase.
type URLRepository interface {
	Save(ctx context.Context, u *domain.URL) error
	FindByCode(ctx context.Context, code string) (*domain.URL, error)
	// Exists kiểm tra nhanh code đã tồn tại chưa (cho random collision check).
	Exists(ctx context.Context, code string) (bool, error)
	// NextID trả về một số nguyên tăng dần — dùng cho chiến lược counter.
	// Production: SQL sequence / Redis INCR. In-memory: atomic counter.
	NextID(ctx context.Context) (uint64, error)
}

// Cache là driven port cho cache đọc nhanh (production: Redis).
// Dùng cho cache-aside pattern ở đường redirect (Lesson 58).
type Cache interface {
	// GetURL trả về URL gốc cho code; ok=false nếu cache miss.
	GetURL(ctx context.Context, code string) (original string, ok bool)
	// SetURL ghi vào cache với TTL (0 = không hết hạn).
	SetURL(ctx context.Context, code, original string, ttl time.Duration)
}

// ClickQueue là driven port để EMIT click event bất đồng bộ
// (production: Kafka/NATS/Redis Streams). In-memory: Go channel.
//
// Enqueue PHẢI non-blocking (hoặc gần như vậy) để không làm chậm redirect.
type ClickQueue interface {
	Enqueue(c domain.Click)
}

// StatsStore là driven port cho read model thống kê — nơi analytics worker
// ghi số liệu đã tổng hợp, và usecase GetStats đọc ra.
// Production: Postgres bảng aggregate / ClickHouse. In-memory: map.
type StatsStore interface {
	Snapshot(ctx context.Context, code string) (*domain.Stats, error)
}

// IDProvider trừu tượng hóa việc lấy thời gian hiện tại (cho test xác định).
type Clock interface {
	Now() time.Time
}

// realClock dùng time.Now thật — mặc định ở production.
type realClock struct{}

func (realClock) Now() time.Time { return time.Now() }

// SystemClock là clock mặc định.
var SystemClock Clock = realClock{}
