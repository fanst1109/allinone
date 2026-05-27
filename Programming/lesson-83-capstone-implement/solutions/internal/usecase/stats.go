package usecase

import (
	"context"

	"urlshortener/internal/domain"
)

// StatsUsecase trả về thống kê cho một short code.
//
// Lưu ý: bản thân usecase này KHÔNG tự đếm click — nó đọc read model đã
// được analytics worker tổng hợp (StatsStore). Đây là tách CQRS nhẹ
// (Lesson 67): ghi (worker aggregate) tách khỏi đọc (stats query).
type StatsUsecase struct {
	repo  URLRepository
	store StatsStore
}

// NewStats — constructor injection.
func NewStats(repo URLRepository, store StatsStore) *StatsUsecase {
	return &StatsUsecase{repo: repo, store: store}
}

// Get trả về Stats. Trước tiên xác minh code tồn tại (để trả 404 đúng),
// rồi lấy snapshot số liệu từ store.
func (uc *StatsUsecase) Get(ctx context.Context, code string) (*domain.Stats, error) {
	u, err := uc.repo.FindByCode(ctx, code)
	if err != nil {
		return nil, err // domain.ErrURLNotFound -> adapter map sang 404
	}

	s, err := uc.store.Snapshot(ctx, code)
	if err != nil {
		return nil, err
	}
	if s == nil {
		// Chưa có click nào -> trả stats rỗng (không phải lỗi).
		s = &domain.Stats{
			Code:        code,
			ClicksByDay: map[string]int{},
		}
	}
	// Gắn URL gốc vào read model để client thấy được.
	s.Original = u.Original
	s.Code = code
	return s, nil
}
