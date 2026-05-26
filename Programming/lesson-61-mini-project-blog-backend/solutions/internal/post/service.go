package post

import (
	"context"
	"encoding/json"
	"errors"
	"fmt"
	"strings"
	"time"

	"blog-backend/internal/cache"
	"blog-backend/internal/search"
	"blog-backend/internal/storage"
)

// ErrValidation trả về khi input không hợp lệ.
var ErrValidation = errors.New("validation error")

// cacheTTL — thời gian sống của 1 post trong cache (mô phỏng Redis TTL).
const cacheTTL = 5 * time.Minute

// Service chứa toàn bộ logic nghiệp vụ. Nó nhận 3 dependency qua INTERFACE
// (Repository, Cache, Index) — đây là điểm mấu chốt giúp swap memory <-> real DB
// mà không sửa service.
type Service struct {
	repo  storage.Repository
	cache cache.Cache
	index search.Index
}

// NewService khởi tạo service với các dependency đã inject.
func NewService(repo storage.Repository, c cache.Cache, ix search.Index) *Service {
	return &Service{repo: repo, cache: c, index: ix}
}

// cacheKey sinh key cache cho 1 post (giống Redis key "post:42").
func cacheKey(id int64) string { return fmt.Sprintf("post:%d", id) }

// Create tạo post mới. FLOW chính của project:
//  1. validate input
//  2. ghi vào storage (Postgres)
//  3. index vào search (title + body)
//  4. KHÔNG cần invalidate cache vì post mới chưa từng được cache.
func (s *Service) Create(ctx context.Context, in CreatePostInput) (*Post, error) {
	if strings.TrimSpace(in.Title) == "" {
		return nil, fmt.Errorf("%w: title bắt buộc", ErrValidation)
	}
	p := &Post{
		Title: in.Title,
		Body:  in.Body,
		Tags:  in.Tags,
	}
	saved, err := s.repo.CreatePost(ctx, p)
	if err != nil {
		return nil, err
	}
	// Index full-text: gộp title + body để search bắt được cả hai.
	s.index.AddOrUpdate(saved.ID, saved.Title+" "+saved.Body)
	return saved, nil
}

// Get đọc 1 post theo CACHE-ASIDE (L58):
//
//  1. thử đọc cache  -> HIT  -> trả về luôn (không chạm storage).
//  2. MISS -> đọc storage.
//  3. nạp (populate) kết quả vào cache với TTL cho lần sau.
func (s *Service) Get(ctx context.Context, id int64) (*Post, error) {
	key := cacheKey(id)

	// (1) Cache lookup.
	if raw, ok := s.cache.Get(key); ok {
		var p Post
		if err := json.Unmarshal(raw, &p); err == nil {
			return &p, nil // CACHE HIT.
		}
		// Nếu giải mã lỗi (dữ liệu cache hỏng) -> coi như miss, xoá rồi đọc DB.
		s.cache.Delete(key)
	}

	// (2) CACHE MISS -> storage.
	p, err := s.repo.GetPost(ctx, id)
	if err != nil {
		return nil, err
	}

	// (3) Populate cache cho lần sau.
	if raw, err := json.Marshal(p); err == nil {
		s.cache.Set(key, raw, cacheTTL)
	}
	return p, nil
}

// Update sửa post. Sau khi ghi storage + re-index, BẮT BUỘC invalidate cache
// (BT2) — nếu không, Get sẽ trả dữ liệu cũ từ cache cho tới khi TTL hết.
func (s *Service) Update(ctx context.Context, id int64, in UpdatePostInput) (*Post, error) {
	if strings.TrimSpace(in.Title) == "" {
		return nil, fmt.Errorf("%w: title bắt buộc", ErrValidation)
	}
	// Đọc thẳng storage (không qua cache) để lấy bản gốc + giữ Views.
	cur, err := s.repo.GetPost(ctx, id)
	if err != nil {
		return nil, err
	}
	cur.Title = in.Title
	cur.Body = in.Body
	cur.Tags = in.Tags
	updated, err := s.repo.UpdatePost(ctx, cur)
	if err != nil {
		return nil, err
	}
	// Re-index nội dung mới.
	s.index.AddOrUpdate(updated.ID, updated.Title+" "+updated.Body)
	// INVALIDATE cache: xoá key cũ. Lần Get sau sẽ miss -> nạp lại bản mới.
	s.cache.Delete(cacheKey(id))
	return updated, nil
}

// Delete xoá post khỏi cả storage, search index và cache.
func (s *Service) Delete(ctx context.Context, id int64) error {
	if err := s.repo.DeletePost(ctx, id); err != nil {
		return err
	}
	s.index.Remove(id)
	s.cache.Delete(cacheKey(id))
	return nil
}

// List phân trang + lọc tag.
func (s *Service) List(ctx context.Context, params ListParams) (*PageResult, error) {
	items, total, err := s.repo.ListPosts(ctx, params)
	if err != nil {
		return nil, err
	}
	page := params.Page
	if page < 1 {
		page = 1
	}
	per := params.PerPage
	if per < 1 {
		per = 10
	}
	return &PageResult{Items: items, Page: page, PerPage: per, Total: total}, nil
}

// Search tìm post theo inverted index + TF-IDF, rồi nạp đầy đủ post từ storage
// cho mỗi hit. Trả về danh sách đã xếp hạng (relevance giảm dần).
func (s *Service) Search(ctx context.Context, query string) ([]SearchHit, error) {
	results := s.index.Search(query)
	hits := make([]SearchHit, 0, len(results))
	for _, r := range results {
		p, err := s.repo.GetPost(ctx, r.DocID)
		if err != nil {
			// Document có trong index nhưng đã bị xoá ở storage -> bỏ qua.
			continue
		}
		hits = append(hits, SearchHit{Post: p, Score: r.Score})
	}
	return hits, nil
}

// TagFacets (BT4) trả về số post theo mỗi tag.
func (s *Service) TagFacets(ctx context.Context) map[string]int {
	return s.repo.TagFacets(ctx)
}

// AddComment (BT1) thêm comment trong 1 TRANSACTION sao cho việc tạo comment
// và tăng comment_count là ATOMIC. Nếu bất kỳ bước nào lỗi -> rollback toàn bộ.
//
// Trả về comment vừa tạo + tổng số comment sau khi thêm.
func (s *Service) AddComment(ctx context.Context, postID int64, author, body string) (*Comment, int, error) {
	if strings.TrimSpace(body) == "" {
		return nil, 0, fmt.Errorf("%w: comment body bắt buộc", ErrValidation)
	}
	var created *Comment
	var count int
	err := s.repo.WithTx(ctx, func(tx storage.Tx) error {
		// Bước 1: kiểm tra post tồn tại (trong tx).
		if _, err := tx.GetPost(postID); err != nil {
			return err
		}
		// Bước 2: thêm comment (tx tự tăng comment_count).
		c := &Comment{PostID: postID, Author: author, Body: body}
		out, err := tx.AddComment(c)
		if err != nil {
			return err
		}
		created = out
		count = tx.CommentCount(postID)
		return nil
	})
	if err != nil {
		return nil, 0, err
	}
	// Comment mới có thể ảnh hưởng hiển thị post -> invalidate cache post đó.
	s.cache.Delete(cacheKey(postID))
	return created, count, nil
}

// IncrementViews (BT5) tăng số lượt xem của post và invalidate cache.
func (s *Service) IncrementViews(ctx context.Context, id int64) (*Post, error) {
	cur, err := s.repo.GetPost(ctx, id)
	if err != nil {
		return nil, err
	}
	cur.Views++
	updated, err := s.repo.UpdatePost(ctx, cur)
	if err != nil {
		return nil, err
	}
	s.cache.Delete(cacheKey(id))
	return updated, nil
}
