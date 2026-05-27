// Package shortener — DESIGN SKELETON cho capstone URL Shortener (Lesson 82).
//
// Đây là DESIGN PHASE: file này chỉ chứa domain types + interface (port)
// và một hàm thuần tuý chạy được (Base62Encode). KHÔNG có implementation
// thật cho repository/cache/queue — đó là việc của Lesson 83 (Implement).
//
// Mục đích: cố định "shape" của hệ thống (kiểu dữ liệu, ranh giới interface)
// theo clean architecture (xem Lesson 79) để L83 chỉ việc hiện thực hoá.
//
// Chạy minh hoạ: `go run solutions.go`
// Kiểm tra:      `go build` / `go vet`
package main

import (
	"context"
	"errors"
	"fmt"
	"strings"
	"time"
)

// ============================================================
// DOMAIN — các thực thể nghiệp vụ thuần (không phụ thuộc DB/HTTP)
// ============================================================

// URL là một liên kết đã được rút gọn.
// Tương ứng bảng `urls` (xem README mục 6.1).
type URL struct {
	ID        int64     // khoá chính tự tăng
	Code      string    // mã ngắn base62, unique (vd "abc1234")
	LongURL   string    // URL gốc đầy đủ
	CreatedAt time.Time // thời điểm tạo
	UserID    int64     // chủ sở hữu (0 nếu ẩn danh)
}

// Click là một lượt truy cập vào mã ngắn.
// Tương ứng bảng `clicks` (xem README mục 6.2).
type Click struct {
	ID        int64
	URLCode   string    // mã được click
	ClickedAt time.Time // thời điểm click
	Referrer  string    // nguồn dẫn tới (vd "twitter.com", "direct")
	UserAgent string    // UA của client
	IPCountry string    // mã quốc gia 2 ký tự (ISO 3166-1 alpha-2)
}

// ClickEvent là message đẩy vào queue cho mỗi redirect (xem README mục 11).
// Cố ý GỌN hơn Click: redirect path chỉ thu thập tối thiểu rồi publish async,
// worker mới enrich (GeoIP, parse referrer) và ghi xuống Postgres.
type ClickEvent struct {
	Code      string
	ClickedAt time.Time
	Referrer  string
	UserAgent string
	IP        string // worker sẽ map IP -> country
}

// ============================================================
// DTO — request/response cho API contract (xem README mục 3)
// ============================================================

// ShortenRequest — body của POST /api/shorten.
type ShortenRequest struct {
	URL string `json:"url"`
}

// ShortenResponse — body trả về của POST /api/shorten (201).
type ShortenResponse struct {
	Code     string `json:"code"`
	ShortURL string `json:"short_url"`
}

// DayCount — một dòng trong clicks_by_day.
type DayCount struct {
	Day   string `json:"day"`   // "2006-01-02"
	Count int64  `json:"count"`
}

// ReferrerCount — một dòng trong top_referrers.
type ReferrerCount struct {
	Referrer string `json:"referrer"`
	Count    int64  `json:"count"`
}

// StatsResponse — body trả về của GET /api/stats/{code} (200).
type StatsResponse struct {
	Code         string          `json:"code"`
	URL          string          `json:"url"`
	TotalClicks  int64           `json:"total_clicks"`
	ClicksByDay  []DayCount      `json:"clicks_by_day"`
	TopReferrers []ReferrerCount `json:"top_referrers"`
}

// ProblemDetails — lỗi theo RFC 7807 (application/problem+json).
type ProblemDetails struct {
	Type     string `json:"type"`
	Title    string `json:"title"`
	Status   int    `json:"status"`
	Detail   string `json:"detail,omitempty"`
	Instance string `json:"instance,omitempty"`
}

// ============================================================
// PORTS (interface) — ranh giới do usecase định nghĩa, adapter hiện thực.
// L83 sẽ viết các implementation Postgres/Redis/NATS cho các interface này.
// ============================================================

// Các lỗi domain chuẩn để usecase phân biệt nhánh xử lý.
var (
	ErrNotFound       = errors.New("url not found")
	ErrCodeCollision  = errors.New("code collision") // unique index bị vi phạm -> sinh lại
	ErrRateLimited    = errors.New("rate limited")
	ErrInvalidURL     = errors.New("invalid url")
)

// URLRepository — lưu/đọc URL bền vững (Postgres ở L83).
type URLRepository interface {
	// Save lưu một URL mới. Trả ErrCodeCollision nếu code đã tồn tại
	// (unique index) -> caller sinh mã khác và thử lại.
	Save(ctx context.Context, u *URL) error
	// FindByCode tra URL gốc theo mã. Trả ErrNotFound nếu không có.
	FindByCode(ctx context.Context, code string) (*URL, error)
}

// Cache — cache code->url cho read path (Redis ở L83).
// Cache-aside: redirect hỏi cache trước, miss thì đọc repo rồi Set lại.
type Cache interface {
	Get(ctx context.Context, code string) (longURL string, ok bool, err error)
	Set(ctx context.Context, code, longURL string, ttl time.Duration) error
}

// ClickQueue — publish click event async (NATS/Kafka ở L83).
// Redirect chỉ Publish (không block); Worker Subscribe và aggregate.
type ClickQueue interface {
	Publish(ctx context.Context, ev ClickEvent) error
	Subscribe(ctx context.Context, handler func(ClickEvent) error) error
}

// RateLimiter — giới hạn tần suất theo client (Redis INCR ở L83).
type RateLimiter interface {
	Allow(ctx context.Context, key string) (bool, error)
}

// StatsRepository — đọc dữ liệu đã aggregate cho endpoint stats.
type StatsRepository interface {
	Stats(ctx context.Context, code string) (*StatsResponse, error)
}

// ============================================================
// USECASE skeleton — chữ ký thể hiện thiết kế, chưa implement (panic).
// L83 sẽ điền thân hàm.
// ============================================================

// ShortenService — write path (xem README mục 8.1, 10).
type ShortenService struct {
	repo  URLRepository
	cache Cache
	rl    RateLimiter
}

// Shorten: validate -> rate limit -> sinh mã random base62 -> Save (retry nếu
// collision) -> optional pre-warm cache -> trả ShortenResponse.
func (s *ShortenService) Shorten(ctx context.Context, req ShortenRequest) (*ShortenResponse, error) {
	panic("DESIGN PHASE: hiện thực ở Lesson 83")
}

// RedirectService — read path (xem README mục 8.2, 9).
type RedirectService struct {
	repo  URLRepository
	cache Cache
	queue ClickQueue
}

// Resolve: cache-aside (cache trước, miss -> repo -> populate cache),
// đồng thời Publish ClickEvent ASYNC (không block). Trả long URL để redirect 302.
func (s *RedirectService) Resolve(ctx context.Context, code string, ev ClickEvent) (string, error) {
	panic("DESIGN PHASE: hiện thực ở Lesson 83")
}

// AnalyticsWorker — consume click event và aggregate (xem README mục 8.3, 11).
type AnalyticsWorker struct {
	queue ClickQueue
}

// Run subscribe queue và UPSERT click_daily cho mỗi event.
func (w *AnalyticsWorker) Run(ctx context.Context) error {
	panic("DESIGN PHASE: hiện thực ở Lesson 83")
}

// ============================================================
// PHẦN CHẠY ĐƯỢC — Base62Encode (thuật toán sinh mã, mục 4.3/5).
// Đây là phần "đủ thuần tuý" để implement ngay trong design phase.
// ============================================================

const base62Alphabet = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"

// Base62Encode đổi một số nguyên không âm sang chuỗi base62.
// Dùng cho chiến lược "counter + base62" (README mục 5.2): ID tăng dần -> mã.
//   Base62Encode(0)     = "0"
//   Base62Encode(61)    = "Z"
//   Base62Encode(62)    = "10"
//   Base62Encode(12345) = "3d7"
func Base62Encode(n uint64) string {
	if n == 0 {
		return string(base62Alphabet[0])
	}
	var sb strings.Builder
	// Sinh chữ số từ phải sang trái rồi đảo lại.
	digits := make([]byte, 0, 11)
	for n > 0 {
		digits = append(digits, base62Alphabet[n%62])
		n /= 62
	}
	for i := len(digits) - 1; i >= 0; i-- {
		sb.WriteByte(digits[i])
	}
	return sb.String()
}

func main() {
	fmt.Println("Capstone L82 — Design skeleton (base62 demo)")
	for _, n := range []uint64{0, 61, 62, 12345, 3521614606207} {
		fmt.Printf("  Base62Encode(%-15d) = %q\n", n, Base62Encode(n))
	}
	// Minh hoạ: 62^7 - 1 là ID lớn nhất biểu diễn được bằng 7 ký tự base62.
	max7 := uint64(1)
	for i := 0; i < 7; i++ {
		max7 *= 62
	}
	fmt.Printf("  62^7 = %d ma kha di voi 7 ky tu (du cho 100M URL)\n", max7)
}
