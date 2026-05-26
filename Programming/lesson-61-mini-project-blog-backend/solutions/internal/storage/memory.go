// Package storage mô phỏng tầng lưu trữ bền vững (Postgres).
//
// Ý tưởng kiến trúc quan trọng nhất của project: lớp service KHÔNG biết
// dữ liệu nằm ở Postgres hay in-memory. Nó chỉ thấy interface `Repository`.
// => Muốn đổi sang Postgres thật chỉ cần viết 1 impl khác của Repository
//
//	(vd dùng database/sql + lib/pq) rồi inject vào service. Service không đổi.
//
// File này cài đặt `MemoryRepository` — bản in-memory dùng map + RWMutex,
// CÓ MÔ PHỎNG TRANSACTION (commit/rollback) để minh hoạ kiến thức L56.
package storage

import (
	"context"
	"errors"
	"sort"
	"sync"
	"time"

	"blog-backend/internal/model"
)

// ErrNotFound trả về khi không tìm thấy bản ghi (tương đương sql.ErrNoRows).
var ErrNotFound = errors.New("storage: not found")

// Repository là HỢP ĐỒNG (contract) mà tầng service phụ thuộc vào.
// Bất kỳ backend nào (memory, Postgres, ...) chỉ cần thoả interface này.
type Repository interface {
	// CRUD posts.
	CreatePost(ctx context.Context, p *model.Post) (*model.Post, error)
	GetPost(ctx context.Context, id int64) (*model.Post, error)
	UpdatePost(ctx context.Context, p *model.Post) (*model.Post, error)
	DeletePost(ctx context.Context, id int64) error

	// List có phân trang + lọc tag (BT4). Trả về (items, total).
	ListPosts(ctx context.Context, params model.ListParams) ([]*model.Post, int, error)

	// TagFacets (BT4): đếm số post theo từng tag — phục vụ faceted navigation.
	TagFacets(ctx context.Context) map[string]int

	// WithTx chạy fn trong 1 transaction. Nếu fn trả về error => rollback
	// (mọi thay đổi bị huỷ), ngược lại => commit. Đây là mô phỏng L56.
	WithTx(ctx context.Context, fn func(tx Tx) error) error
}

// Tx là handle transaction. Các thao tác gọi qua Tx được "đệm" lại và chỉ
// áp vào store chính khi commit. Comment (BT1) chỉ thao tác qua Tx để đảm
// bảo "tạo comment + tăng comment_count" là atomic.
type Tx interface {
	GetPost(id int64) (*model.Post, error)
	UpdatePost(p *model.Post) error
	AddComment(c *model.Comment) (*model.Comment, error)
	CommentCount(postID int64) int
}

// MemoryRepository — impl in-memory của Repository.
type MemoryRepository struct {
	mu       sync.RWMutex
	posts    map[int64]*model.Post
	comments map[int64]*model.Comment
	// commentCount: postID -> số comment. Trong Postgres thật đây có thể là
	// cột denormalized `posts.comment_count` cập nhật trong cùng transaction.
	commentCount map[int64]int

	nextPostID    int64
	nextCommentID int64
}

// NewMemoryRepository tạo repo rỗng.
func NewMemoryRepository() *MemoryRepository {
	return &MemoryRepository{
		posts:         make(map[int64]*model.Post),
		comments:      make(map[int64]*model.Comment),
		commentCount:  make(map[int64]int),
		nextPostID:    1,
		nextCommentID: 1,
	}
}

// clone trả về bản sao sâu của post để tránh caller sửa trực tiếp dữ liệu
// trong store (giống như Postgres trả về dòng mới mỗi query, không phải con trỏ).
func clonePost(p *model.Post) *model.Post {
	if p == nil {
		return nil
	}
	cp := *p
	cp.Tags = append([]string(nil), p.Tags...)
	return &cp
}

func (r *MemoryRepository) CreatePost(ctx context.Context, p *model.Post) (*model.Post, error) {
	r.mu.Lock()
	defer r.mu.Unlock()

	now := time.Now()
	p.ID = r.nextPostID
	r.nextPostID++
	p.CreatedAt = now
	p.UpdatedAt = now
	r.posts[p.ID] = clonePost(p)
	return clonePost(p), nil
}

func (r *MemoryRepository) GetPost(ctx context.Context, id int64) (*model.Post, error) {
	r.mu.RLock()
	defer r.mu.RUnlock()

	p, ok := r.posts[id]
	if !ok {
		return nil, ErrNotFound
	}
	return clonePost(p), nil
}

func (r *MemoryRepository) UpdatePost(ctx context.Context, p *model.Post) (*model.Post, error) {
	r.mu.Lock()
	defer r.mu.Unlock()

	cur, ok := r.posts[p.ID]
	if !ok {
		return nil, ErrNotFound
	}
	p.CreatedAt = cur.CreatedAt
	p.UpdatedAt = time.Now()
	r.posts[p.ID] = clonePost(p)
	return clonePost(p), nil
}

func (r *MemoryRepository) DeletePost(ctx context.Context, id int64) error {
	r.mu.Lock()
	defer r.mu.Unlock()

	if _, ok := r.posts[id]; !ok {
		return ErrNotFound
	}
	delete(r.posts, id)
	delete(r.commentCount, id)
	return nil
}

func (r *MemoryRepository) ListPosts(ctx context.Context, params model.ListParams) ([]*model.Post, int, error) {
	r.mu.RLock()
	defer r.mu.RUnlock()

	// 1. Thu thập + lọc tag (BT4). Tương đương WHERE $tag = ANY(tags).
	all := make([]*model.Post, 0, len(r.posts))
	for _, p := range r.posts {
		if params.Tag != "" && !hasTag(p, params.Tag) {
			continue
		}
		all = append(all, clonePost(p))
	}

	// 2. Sắp xếp ổn định: mới nhất trước (ORDER BY created_at DESC, id DESC).
	sort.Slice(all, func(i, j int) bool {
		if all[i].CreatedAt.Equal(all[j].CreatedAt) {
			return all[i].ID > all[j].ID
		}
		return all[i].CreatedAt.After(all[j].CreatedAt)
	})

	total := len(all)

	// 3. Phân trang (LIMIT/OFFSET).
	page := params.Page
	if page < 1 {
		page = 1
	}
	per := params.PerPage
	if per < 1 {
		per = 10
	}
	start := (page - 1) * per
	if start >= total {
		return []*model.Post{}, total, nil
	}
	end := start + per
	if end > total {
		end = total
	}
	return all[start:end], total, nil
}

func (r *MemoryRepository) TagFacets(ctx context.Context) map[string]int {
	r.mu.RLock()
	defer r.mu.RUnlock()

	facets := make(map[string]int)
	for _, p := range r.posts {
		for _, t := range p.Tags {
			facets[t]++
		}
	}
	return facets
}

func hasTag(p *model.Post, tag string) bool {
	for _, t := range p.Tags {
		if t == tag {
			return true
		}
	}
	return false
}

// ---------------------------------------------------------------------------
// Transaction simulation
// ---------------------------------------------------------------------------

// WithTx mô phỏng BEGIN / COMMIT / ROLLBACK.
//
// Cách làm: chụp một bản sao (snapshot) của state vào memTx. fn thao tác trên
// memTx. Nếu fn lỗi -> bỏ snapshot (rollback). Nếu thành công -> ghi đè state
// chính bằng snapshot (commit). Vì ta giữ lock ghi suốt transaction nên không
// có write khác xen vào (mô phỏng SERIALIZABLE — đơn giản hoá cho mục đích học).
func (r *MemoryRepository) WithTx(ctx context.Context, fn func(tx Tx) error) error {
	r.mu.Lock()
	defer r.mu.Unlock()

	// Snapshot state hiện tại vào tx-local.
	tx := &memTx{
		posts:         make(map[int64]*model.Post, len(r.posts)),
		comments:      make(map[int64]*model.Comment, len(r.comments)),
		commentCount:  make(map[int64]int, len(r.commentCount)),
		nextCommentID: r.nextCommentID,
	}
	for id, p := range r.posts {
		tx.posts[id] = clonePost(p)
	}
	for id, c := range r.comments {
		cc := *c
		tx.comments[id] = &cc
	}
	for id, n := range r.commentCount {
		tx.commentCount[id] = n
	}

	if err := fn(tx); err != nil {
		// ROLLBACK: vứt bỏ snapshot, state chính không đổi.
		return err
	}

	// COMMIT: áp snapshot vào state chính (atomic vì đang giữ lock).
	r.posts = tx.posts
	r.comments = tx.comments
	r.commentCount = tx.commentCount
	r.nextCommentID = tx.nextCommentID
	return nil
}

// memTx là snapshot tách biệt; mọi thao tác chỉ chạm vào dữ liệu của chính nó.
type memTx struct {
	posts         map[int64]*model.Post
	comments      map[int64]*model.Comment
	commentCount  map[int64]int
	nextCommentID int64
}

func (t *memTx) GetPost(id int64) (*model.Post, error) {
	p, ok := t.posts[id]
	if !ok {
		return nil, ErrNotFound
	}
	return clonePost(p), nil
}

func (t *memTx) UpdatePost(p *model.Post) error {
	cur, ok := t.posts[p.ID]
	if !ok {
		return ErrNotFound
	}
	p.CreatedAt = cur.CreatedAt
	p.UpdatedAt = time.Now()
	t.posts[p.ID] = clonePost(p)
	return nil
}

func (t *memTx) AddComment(c *model.Comment) (*model.Comment, error) {
	if _, ok := t.posts[c.PostID]; !ok {
		return nil, ErrNotFound // FOREIGN KEY violation: post không tồn tại.
	}
	c.ID = t.nextCommentID
	t.nextCommentID++
	c.CreatedAt = time.Now()
	cc := *c
	t.comments[c.ID] = &cc
	t.commentCount[c.PostID]++ // tăng count trong CÙNG transaction => atomic.
	return &cc, nil
}

func (t *memTx) CommentCount(postID int64) int {
	return t.commentCount[postID]
}
