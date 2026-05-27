package usecase

import (
	"context"
	"errors"

	"urlshortener/internal/domain"
	"urlshortener/pkg/base62"
)

// codeLen là độ dài short code khi sinh ngẫu nhiên.
const codeLen = 7

// maxCollisionRetry giới hạn số lần sinh lại khi random code bị trùng.
const maxCollisionRetry = 5

// ShortenUsecase hiện thực thao tác "rút gọn URL".
// Nó phụ thuộc vào ABSTRACTION (repo, cache, clock), không phải Postgres/Redis.
type ShortenUsecase struct {
	repo  URLRepository
	cache Cache
	clock Clock
	// useCounter = true -> dùng chiến lược counter (NextID + base62).
	// false -> random 7 ký tự + collision check.
	useCounter bool
}

// NewShorten là constructor injection. useCounter chọn chiến lược sinh code.
func NewShorten(repo URLRepository, cache Cache, clock Clock, useCounter bool) *ShortenUsecase {
	if clock == nil {
		clock = SystemClock
	}
	return &ShortenUsecase{repo: repo, cache: cache, clock: clock, useCounter: useCounter}
}

// Shorten nhận URL gốc, sinh code, lưu, trả về entity URL.
// Đây là application logic: orchestrate sinh code + lưu trữ + warm cache.
func (uc *ShortenUsecase) Shorten(ctx context.Context, original string) (*domain.URL, error) {
	code, err := uc.generateCode(ctx)
	if err != nil {
		return nil, err
	}

	// domain.NewURL tự validate URL gốc (business rule).
	u, err := domain.NewURL(code, original, uc.clock.Now())
	if err != nil {
		return nil, err
	}

	if err := uc.repo.Save(ctx, u); err != nil {
		return nil, err
	}

	// Warm cache ngay sau khi tạo: lần redirect đầu tiên sẽ hit cache.
	if uc.cache != nil {
		uc.cache.SetURL(ctx, u.Code, u.Original, 0)
	}
	return u, nil
}

// ShortenWithAlias hiện thực BT1 (custom alias): user tự chọn code.
// Phải kiểm tra trùng — nếu đã tồn tại trả ErrCodeTaken.
func (uc *ShortenUsecase) ShortenWithAlias(ctx context.Context, original, alias string) (*domain.URL, error) {
	u, err := domain.NewURL(alias, original, uc.clock.Now())
	if err != nil {
		return nil, err
	}
	exists, err := uc.repo.Exists(ctx, alias)
	if err != nil {
		return nil, err
	}
	if exists {
		return nil, domain.ErrCodeTaken
	}
	if err := uc.repo.Save(ctx, u); err != nil {
		return nil, err
	}
	if uc.cache != nil {
		uc.cache.SetURL(ctx, u.Code, u.Original, 0)
	}
	return u, nil
}

// generateCode chọn chiến lược theo cấu hình.
func (uc *ShortenUsecase) generateCode(ctx context.Context) (string, error) {
	if uc.useCounter {
		// Chiến lược COUNTER: NextID -> base62. Không bao giờ trùng.
		id, err := uc.repo.NextID(ctx)
		if err != nil {
			return "", err
		}
		// Pad cho code "trông đều" tối thiểu 7 ký tự. Khi id lớn sẽ dài hơn.
		return base62.EncodePadded(id, codeLen), nil
	}

	// Chiến lược RANDOM: sinh 7 ký tự, kiểm tra trùng, sinh lại nếu cần.
	for i := 0; i < maxCollisionRetry; i++ {
		code, err := base62.Random(codeLen)
		if err != nil {
			return "", err
		}
		exists, err := uc.repo.Exists(ctx, code)
		if err != nil {
			return "", err
		}
		if !exists {
			return code, nil
		}
		// Va chạm (rất hiếm với 62^7 không gian) -> thử lại.
	}
	return "", errors.New("không sinh được code duy nhất sau nhiều lần thử")
}
