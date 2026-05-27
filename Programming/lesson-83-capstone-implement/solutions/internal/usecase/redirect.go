package usecase

import (
	"context"
	"time"

	"urlshortener/internal/domain"
)

// cacheTTL là thời gian sống của entry trong cache khi populate từ repo.
const cacheTTL = 10 * time.Minute

// RedirectUsecase hiện thực đường "tra code -> URL gốc" (HOT PATH).
//
// Hai đặc tính quan trọng (đề bài yêu cầu):
//
//  1. CACHE-ASIDE (Lesson 58): đọc cache trước; miss -> đọc repo -> populate
//     cache. Phần lớn traffic redirect hit cache nên nhanh.
//  2. ASYNC CLICK (Lesson 65): emit Click event vào queue, KHÔNG block để
//     chờ ghi analytics. Worker tiêu thụ và aggregate ở background.
type RedirectUsecase struct {
	repo  URLRepository
	cache Cache
	queue ClickQueue
	clock Clock
}

// NewRedirect — constructor injection.
func NewRedirect(repo URLRepository, cache Cache, queue ClickQueue, clock Clock) *RedirectUsecase {
	if clock == nil {
		clock = SystemClock
	}
	return &RedirectUsecase{repo: repo, cache: cache, queue: queue, clock: clock}
}

// Resolve trả về URL gốc cho code, đồng thời emit một Click event async.
// referrer/ip lấy từ HTTP header ở tầng adapter, truyền xuống đây.
//
// Luồng cache-aside:
//
//  1. cache.GetURL(code) -> hit? trả luôn (đã emit click).
//  2. miss -> repo.FindByCode -> nếu thấy: populate cache rồi trả.
func (uc *RedirectUsecase) Resolve(ctx context.Context, code, referrer, ip string) (string, error) {
	now := uc.clock.Now()

	// (1) CACHE-FIRST.
	if uc.cache != nil {
		if original, ok := uc.cache.GetURL(ctx, code); ok {
			uc.emitClick(code, referrer, ip, now)
			return original, nil
		}
	}

	// (2) CACHE MISS -> đọc nguồn sự thật (repo).
	u, err := uc.repo.FindByCode(ctx, code)
	if err != nil {
		return "", err // thường là domain.ErrURLNotFound
	}

	// Rule miền: URL hết hạn thì coi như không tồn tại (BT2).
	if u.IsExpired(now) {
		return "", domain.ErrURLExpired
	}

	// POPULATE cache để lần sau hit.
	if uc.cache != nil {
		uc.cache.SetURL(ctx, u.Code, u.Original, cacheTTL)
	}

	uc.emitClick(code, referrer, ip, now)
	return u.Original, nil
}

// emitClick gửi Click event vào queue. Đây là điểm "fire-and-forget":
// redirect KHÔNG chờ analytics. ClickQueue.Enqueue phải non-blocking.
func (uc *RedirectUsecase) emitClick(code, referrer, ip string, t time.Time) {
	if uc.queue == nil {
		return
	}
	uc.queue.Enqueue(domain.Click{
		Code:      code,
		Referrer:  referrer,
		IP:        ip,
		Timestamp: t,
	})
}
