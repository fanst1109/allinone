// Lesson 55 — ORM vs Raw SQL trong Go
//
// File này KHÔNG cần database thật, cũng không import GORM/sqlx/pgx.
// Mục đích: minh hoạ các KHÁI NIỆM của bài học bằng code Go thuần, chạy được
// ngay với `go run solutions.go`:
//
//  1. Repository pattern  — interface UserRepository + impl in-memory (BT5).
//  2. So sánh API kiểu "raw" (viết query string) vs kiểu "ORM" (chain method)
//     trên CÙNG một store, để thấy đánh đổi control ↔ tiện.
//  3. Mô phỏng N+1 vs Preload bằng cách ĐẾM số "query" (BT4) — không cần DB,
//     chỉ tăng biến đếm mỗi lần "chạm store" như một query thật sẽ làm.
//
// Mỗi chỗ tương ứng code thật (GORM/sqlx/sqlc) đều có comment "// THẬT:" tham chiếu.
package main

import (
	"context"
	"errors"
	"fmt"
	"sort"
	"strings"
	"sync"
)

// ============================================================================
// MÔ HÌNH DOMAIN — struct thuần Go, không gắn tag thư viện nào
// ============================================================================

// User là entity nghiệp vụ. Trong code thật, ta có thể thêm tag:
//
//	sqlx:  `db:"id"`        — để db.Get/Select scan tự động
//	gorm:  `gorm:"primaryKey"` — để GORM nhận diện
//
// Ở đây giữ thuần Go vì store là map in-memory.
type User struct {
	ID     int64
	Name   string
	Email  string
	Active bool
}

// Post: quan hệ 1 user có nhiều post — dùng để minh hoạ N+1 (mục 9).
type Post struct {
	ID     int64
	UserID int64
	Title  string
}

// ============================================================================
// 1. REPOSITORY PATTERN (mục 11 + BT5)
//    Interface là "hợp đồng" — không nhắc tới GORM/sqlx/pgx.
//    Mọi service nghiệp vụ chỉ phụ thuộc interface này, nên đổi thư viện DB
//    chỉ cần thay implementation, không sửa service.
// ============================================================================

type UserRepository interface {
	GetByID(ctx context.Context, id int64) (*User, error)
	List(ctx context.Context) ([]*User, error)
	Create(ctx context.Context, u *User) error
	Delete(ctx context.Context, id int64) error
}

var ErrNotFound = errors.New("user: not found")

// ---------------------------------------------------------------------------
// Impl in-memory — dùng cho test, prototype, hoặc demo (BT5).
// Trong code THẬT, đây là chỗ ta thay bằng gormUserRepo / sqlxUserRepo.
// ---------------------------------------------------------------------------

type memUserRepo struct {
	mu      sync.RWMutex
	data    map[int64]*User
	seq     int64
	queries int // đếm số "query" để minh hoạ N+1 (không có trong repo thật)
}

func NewMemUserRepo() *memUserRepo {
	return &memUserRepo{data: make(map[int64]*User)}
}

func (r *memUserRepo) GetByID(_ context.Context, id int64) (*User, error) {
	r.mu.RLock()
	defer r.mu.RUnlock()
	r.queries++ // mỗi lần đọc = 1 query (mô phỏng round-trip tới DB)
	u, ok := r.data[id]
	if !ok {
		// THẬT (sqlx): err == sql.ErrNoRows ; (GORM): gorm.ErrRecordNotFound
		return nil, ErrNotFound
	}
	cp := *u // trả bản copy, tránh caller sửa thẳng store
	return &cp, nil
}

func (r *memUserRepo) List(_ context.Context) ([]*User, error) {
	r.mu.RLock()
	defer r.mu.RUnlock()
	r.queries++
	out := make([]*User, 0, len(r.data))
	for _, u := range r.data {
		cp := *u
		out = append(out, &cp)
	}
	// sort theo ID cho kết quả ổn định (map không có thứ tự)
	sort.Slice(out, func(i, j int) bool { return out[i].ID < out[j].ID })
	return out, nil
}

func (r *memUserRepo) Create(_ context.Context, u *User) error {
	r.mu.Lock()
	defer r.mu.Unlock()
	r.queries++
	r.seq++
	u.ID = r.seq
	cp := *u
	r.data[u.ID] = &cp
	return nil
}

func (r *memUserRepo) Delete(_ context.Context, id int64) error {
	r.mu.Lock()
	defer r.mu.Unlock()
	r.queries++
	if _, ok := r.data[id]; !ok {
		return ErrNotFound
	}
	delete(r.data, id)
	return nil
}

// ============================================================================
// 2. RAW-STYLE vs ORM-STYLE — cùng store, hai phong cách API
//    Minh hoạ trục "control ↔ tiện" của mục 1, ngay trong Go thuần.
// ============================================================================

// rawStyleFind: mô phỏng cảm giác RAW SQL — caller tự "viết query" dạng chuỗi
// điều kiện, rồi tự lọc. Toàn quyền nhưng dài dòng, dễ sai chính tả field.
// THẬT (database/sql): db.Query("SELECT ... WHERE active=$1", true) + loop Scan.
func rawStyleFind(_ context.Context, repo *memUserRepo, whereField string, want bool) ([]*User, error) {
	all, err := repo.List(context.Background())
	if err != nil {
		return nil, err
	}
	var out []*User
	for _, u := range all {
		// "parse" điều kiện bằng tay — đại diện cho việc tự viết WHERE
		switch strings.ToLower(whereField) {
		case "active":
			if u.Active == want {
				out = append(out, u)
			}
		default:
			return nil, fmt.Errorf("raw: không hỗ trợ field %q", whereField)
		}
	}
	return out, nil
}

// ormStyleQuery: mô phỏng cảm giác ORM — builder chain, không cần viết SQL.
// THẬT (GORM): db.Where("active = ?", true).Find(&users)
type ormQuery struct {
	repo       *memUserRepo
	activeOnly bool
	hasFilter  bool
}

func newORMQuery(repo *memUserRepo) *ormQuery { return &ormQuery{repo: repo} }

// WhereActive: tương đương db.Where("active = ?", v) — đọc dễ, không thấy SQL.
func (q *ormQuery) WhereActive(v bool) *ormQuery {
	q.activeOnly = v
	q.hasFilter = true
	return q
}

// Find: tương đương db.Find(&users). "Magic": SQL ẩn sau lời gọi này.
func (q *ormQuery) Find(ctx context.Context) ([]*User, error) {
	all, err := q.repo.List(ctx)
	if err != nil {
		return nil, err
	}
	if !q.hasFilter {
		return all, nil
	}
	var out []*User
	for _, u := range all {
		if u.Active == q.activeOnly {
			out = append(out, u)
		}
	}
	return out, nil
}

// ============================================================================
// 3. N+1 vs PRELOAD (mục 9 + BT4)
//    Đếm số "query" để thấy khác biệt 1+N  vs  2, không cần DB thật.
// ============================================================================

// postStore mô phỏng bảng posts, có biến đếm query riêng.
type postStore struct {
	posts   []Post
	queries int
}

func newPostStore() *postStore {
	return &postStore{posts: []Post{
		{ID: 1, UserID: 1, Title: "Hello"},
		{ID: 2, UserID: 1, Title: "World"},
		{ID: 3, UserID: 2, Title: "Go"},
		{ID: 4, UserID: 3, Title: "ORM"},
	}}
}

// findByUser: lấy post của 1 user = 1 query (giống db.Where("user_id=?", id)).
func (s *postStore) findByUser(userID int64) []Post {
	s.queries++
	var out []Post
	for _, p := range s.posts {
		if p.UserID == userID {
			out = append(out, p)
		}
	}
	return out
}

// findByUsersIN: lấy post của NHIỀU user trong 1 query (giống WHERE user_id IN (...)).
// Đây là cách Preload làm: gom tất cả id lại, query 1 lần.
func (s *postStore) findByUsersIN(ids []int64) map[int64][]Post {
	s.queries++ // CHỈ 1 query bất kể bao nhiêu id
	idset := make(map[int64]bool, len(ids))
	for _, id := range ids {
		idset[id] = true
	}
	out := make(map[int64][]Post)
	for _, p := range s.posts {
		if idset[p.UserID] {
			out[p.UserID] = append(out[p.UserID], p)
		}
	}
	return out
}

// lazyLoad: tái hiện N+1 — 1 query lấy users + N query trong vòng lặp.
// THẬT (GORM, SAI): for _, u := range users { db.Where("user_id=?", u.ID).Find(&posts) }
func lazyLoad(ctx context.Context, repo *memUserRepo, ps *postStore) int {
	users, _ := repo.List(ctx) // query #1 (đã đếm trong repo)
	for _, u := range users {
		_ = ps.findByUser(u.ID) // mỗi vòng +1 query trên postStore
	}
	return ps.queries // số query phía posts = N
}

// eagerLoad: tái hiện Preload — 1 query users + 1 query posts IN(...).
// THẬT (GORM, ĐÚNG): db.Preload("Posts").Find(&users)
func eagerLoad(ctx context.Context, repo *memUserRepo, ps *postStore) int {
	users, _ := repo.List(ctx) // query #1
	ids := make([]int64, len(users))
	for i, u := range users {
		ids[i] = u.ID
	}
	_ = ps.findByUsersIN(ids) // query #2 — gom hết vào IN(...)
	return ps.queries
}

// ============================================================================
// MAIN — chạy demo, in kết quả minh hoạ từng khái niệm
// ============================================================================

func main() {
	ctx := context.Background()

	// --- 1. Repository pattern: service chỉ biết interface ---------------
	var repo UserRepository = NewMemUserRepo() // đổi sang GORM impl chỉ cần đổi dòng này
	seed := []*User{
		{Name: "Alice", Email: "alice@x.com", Active: true},
		{Name: "Bob", Email: "bob@x.com", Active: false},
		{Name: "Carol", Email: "carol@x.com", Active: true},
	}
	for _, u := range seed {
		_ = repo.Create(ctx, u)
	}
	fmt.Println("=== 1. Repository pattern (interface, impl in-memory) ===")
	all, _ := repo.List(ctx)
	for _, u := range all {
		fmt.Printf("  #%d %-6s active=%v\n", u.ID, u.Name, u.Active)
	}
	got, err := repo.GetByID(ctx, 2)
	fmt.Printf("  GetByID(2) -> %+v err=%v\n", *got, err)
	_, err = repo.GetByID(ctx, 99)
	fmt.Printf("  GetByID(99) -> err=%v (giống sql.ErrNoRows)\n", err)

	// --- 2. Raw-style vs ORM-style trên cùng store -----------------------
	fmt.Println("\n=== 2. Raw-style vs ORM-style (cùng kết quả, khác trải nghiệm) ===")
	mem := repo.(*memUserRepo)
	rawRes, _ := rawStyleFind(ctx, mem, "active", true)
	fmt.Printf("  raw  : rawStyleFind(\"active\", true) -> %d user active\n", len(rawRes))
	ormRes, _ := newORMQuery(mem).WhereActive(true).Find(ctx)
	fmt.Printf("  orm  : WhereActive(true).Find()       -> %d user active\n", len(ormRes))
	fmt.Println("  => Cùng kết quả; ORM-style đọc gọn hơn nhưng 'SQL' ẩn sau Find().")

	// --- 3. N+1 vs Preload: đếm query ------------------------------------
	fmt.Println("\n=== 3. N+1 vs Preload (đếm số query) ===")
	repoN := NewMemUserRepo()
	for i := 1; i <= 3; i++ {
		_ = repoN.Create(ctx, &User{Name: fmt.Sprintf("U%d", i)})
	}

	psLazy := newPostStore()
	repoN.queries = 0
	postQ := lazyLoad(ctx, repoN, psLazy)
	fmt.Printf("  Lazy (N+1) : users-query=%d + posts-query=%d = %d query\n",
		repoN.queries, postQ, repoN.queries+postQ)

	psEager := newPostStore()
	repoN.queries = 0
	postQ2 := eagerLoad(ctx, repoN, psEager)
	fmt.Printf("  Preload    : users-query=%d + posts-query=%d = %d query\n",
		repoN.queries, postQ2, repoN.queries+postQ2)
	fmt.Println("  => Lazy tăng theo số user (N+1); Preload luôn 2 query nhờ WHERE user_id IN (...).")
}
