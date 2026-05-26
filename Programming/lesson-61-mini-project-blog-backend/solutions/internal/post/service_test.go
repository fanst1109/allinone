package post

import (
	"context"
	"testing"
	"time"

	"blog-backend/internal/cache"
	"blog-backend/internal/search"
	"blog-backend/internal/storage"
)

// newTestService dựng service với 3 tầng in-memory tươi cho mỗi test.
func newTestService() (*Service, *cache.MemoryCache, storage.Repository) {
	repo := storage.NewMemoryRepository()
	c := cache.NewMemoryCache()
	ix := search.NewInvertedIndex()
	return NewService(repo, c, ix), c, repo
}

// TestCacheAsideHitMiss kiểm tra cache-aside: lần Get đầu MISS (xuống storage),
// lần Get thứ hai HIT (không xuống storage nữa).
func TestCacheAsideHitMiss(t *testing.T) {
	svc, c, _ := newTestService()
	ctx := context.Background()

	created, err := svc.Create(ctx, CreatePostInput{Title: "Hello", Body: "world"})
	if err != nil {
		t.Fatalf("Create lỗi: %v", err)
	}

	// Lần 1: cache trống -> MISS.
	if _, err := svc.Get(ctx, created.ID); err != nil {
		t.Fatalf("Get lần 1 lỗi: %v", err)
	}
	hits, misses := c.Stats()
	if hits != 0 || misses != 1 {
		t.Fatalf("sau Get lần 1 mong (hits=0, misses=1), được (%d,%d)", hits, misses)
	}

	// Lần 2: đã nạp cache -> HIT.
	if _, err := svc.Get(ctx, created.ID); err != nil {
		t.Fatalf("Get lần 2 lỗi: %v", err)
	}
	hits, misses = c.Stats()
	if hits != 1 || misses != 1 {
		t.Fatalf("sau Get lần 2 mong (hits=1, misses=1), được (%d,%d)", hits, misses)
	}
}

// TestUpdateInvalidatesCache (BT2): sau Update, Get phải trả bản MỚI, không
// phải bản cũ còn trong cache.
func TestUpdateInvalidatesCache(t *testing.T) {
	svc, _, _ := newTestService()
	ctx := context.Background()

	created, _ := svc.Create(ctx, CreatePostInput{Title: "Old title", Body: "old body"})
	// Nạp vào cache.
	if _, err := svc.Get(ctx, created.ID); err != nil {
		t.Fatal(err)
	}
	// Update -> phải invalidate cache.
	if _, err := svc.Update(ctx, created.ID, UpdatePostInput{Title: "New title", Body: "new body"}); err != nil {
		t.Fatalf("Update lỗi: %v", err)
	}
	got, err := svc.Get(ctx, created.ID)
	if err != nil {
		t.Fatal(err)
	}
	if got.Title != "New title" {
		t.Fatalf("cache chưa invalidate: mong 'New title', được %q", got.Title)
	}
}

// TestCacheTTLExpiry kiểm tra TTL: sau khi quá hạn, Get lại MISS.
func TestCacheTTLExpiry(t *testing.T) {
	svc, c, _ := newTestService()
	ctx := context.Background()

	// Đồng hồ giả lập để không phải sleep.
	now := time.Now()
	c.SetClock(func() time.Time { return now })

	created, _ := svc.Create(ctx, CreatePostInput{Title: "TTL", Body: "test"})
	if _, err := svc.Get(ctx, created.ID); err != nil { // miss + populate.
		t.Fatal(err)
	}
	if _, err := svc.Get(ctx, created.ID); err != nil { // hit.
		t.Fatal(err)
	}
	_, _ = c.Stats()

	// Tua thời gian quá TTL.
	now = now.Add(cacheTTL + time.Second)
	if _, err := svc.Get(ctx, created.ID); err != nil { // hết hạn -> miss lại.
		t.Fatal(err)
	}
	hits, misses := c.Stats()
	if misses != 2 {
		t.Fatalf("mong 2 miss (lần đầu + sau hết hạn), được %d (hits=%d)", misses, hits)
	}
}

// TestSearchRanking kiểm tra search trả kết quả xếp theo relevance (TF-IDF).
func TestSearchRanking(t *testing.T) {
	svc, _, _ := newTestService()
	ctx := context.Background()

	// p1 nhắc "redis" 2 lần; p2 nhắc 1 lần -> p1 phải xếp trên.
	p1, _ := svc.Create(ctx, CreatePostInput{Title: "redis redis", Body: "cache với redis"})
	_, _ = svc.Create(ctx, CreatePostInput{Title: "postgres", Body: "đôi khi dùng redis"})
	_, _ = svc.Create(ctx, CreatePostInput{Title: "go", Body: "không liên quan"})

	hits, err := svc.Search(ctx, "redis")
	if err != nil {
		t.Fatalf("Search lỗi: %v", err)
	}
	if len(hits) != 2 {
		t.Fatalf("mong 2 hit, được %d", len(hits))
	}
	if hits[0].Post.ID != p1.ID {
		t.Fatalf("ranking sai: post nhiều term nhất phải đứng đầu, được id=%d", hits[0].Post.ID)
	}
	if hits[0].Score < hits[1].Score {
		t.Fatalf("score phải giảm dần: %.3f < %.3f", hits[0].Score, hits[1].Score)
	}
}

// TestSearchEmptyAndMiss kiểm tra query rỗng và term không tồn tại.
func TestSearchEmptyAndMiss(t *testing.T) {
	svc, _, _ := newTestService()
	ctx := context.Background()
	_, _ = svc.Create(ctx, CreatePostInput{Title: "abc", Body: "def"})

	if hits, _ := svc.Search(ctx, ""); len(hits) != 0 {
		t.Fatalf("query rỗng phải trả 0 hit, được %d", len(hits))
	}
	if hits, _ := svc.Search(ctx, "khongtontai"); len(hits) != 0 {
		t.Fatalf("term không tồn tại phải trả 0 hit, được %d", len(hits))
	}
}

// TestAddCommentTransaction (BT1): tạo comment + tăng count atomic.
func TestAddCommentTransaction(t *testing.T) {
	svc, _, _ := newTestService()
	ctx := context.Background()

	p, _ := svc.Create(ctx, CreatePostInput{Title: "post", Body: "body"})

	c1, count1, err := svc.AddComment(ctx, p.ID, "alice", "hay quá")
	if err != nil {
		t.Fatalf("AddComment lỗi: %v", err)
	}
	if count1 != 1 || c1.ID == 0 {
		t.Fatalf("comment đầu: mong count=1 & có id, được count=%d id=%d", count1, c1.ID)
	}
	_, count2, _ := svc.AddComment(ctx, p.ID, "bob", "đồng ý")
	if count2 != 2 {
		t.Fatalf("comment thứ hai: mong count=2, được %d", count2)
	}
}

// TestAddCommentRollback kiểm tra transaction rollback khi post không tồn tại:
// count phải không thay đổi (vẫn 0) cho post hợp lệ khác.
func TestAddCommentRollback(t *testing.T) {
	svc, _, _ := newTestService()
	ctx := context.Background()

	// Thêm comment vào post không tồn tại -> lỗi -> rollback.
	if _, _, err := svc.AddComment(ctx, 999, "x", "y"); err == nil {
		t.Fatal("mong lỗi khi post không tồn tại")
	}
}

// TestListPagination kiểm tra phân trang.
func TestListPagination(t *testing.T) {
	svc, _, _ := newTestService()
	ctx := context.Background()
	for i := 0; i < 5; i++ {
		_, _ = svc.Create(ctx, CreatePostInput{Title: "p", Body: "b"})
	}
	res, err := svc.List(ctx, ListParams{Page: 1, PerPage: 2})
	if err != nil {
		t.Fatal(err)
	}
	if res.Total != 5 || len(res.Items) != 2 {
		t.Fatalf("mong total=5, items=2; được total=%d items=%d", res.Total, len(res.Items))
	}
	res2, _ := svc.List(ctx, ListParams{Page: 3, PerPage: 2})
	if len(res2.Items) != 1 {
		t.Fatalf("trang 3 mong 1 item, được %d", len(res2.Items))
	}
}

// TestTagFilterAndFacets (BT4): lọc theo tag + đếm facet.
func TestTagFilterAndFacets(t *testing.T) {
	svc, _, _ := newTestService()
	ctx := context.Background()
	_, _ = svc.Create(ctx, CreatePostInput{Title: "a", Body: "a", Tags: []string{"go", "db"}})
	_, _ = svc.Create(ctx, CreatePostInput{Title: "b", Body: "b", Tags: []string{"go"}})
	_, _ = svc.Create(ctx, CreatePostInput{Title: "c", Body: "c", Tags: []string{"db"}})

	res, _ := svc.List(ctx, ListParams{Tag: "go"})
	if res.Total != 2 {
		t.Fatalf("lọc tag=go mong 2, được %d", res.Total)
	}
	facets := svc.TagFacets(ctx)
	if facets["go"] != 2 || facets["db"] != 2 {
		t.Fatalf("facet sai: %v", facets)
	}
}

// TestIncrementViews (BT5): cột views tăng đúng + cache invalidate.
func TestIncrementViews(t *testing.T) {
	svc, _, _ := newTestService()
	ctx := context.Background()
	p, _ := svc.Create(ctx, CreatePostInput{Title: "v", Body: "b"})

	updated, err := svc.IncrementViews(ctx, p.ID)
	if err != nil {
		t.Fatal(err)
	}
	if updated.Views != 1 {
		t.Fatalf("mong views=1, được %d", updated.Views)
	}
	got, _ := svc.Get(ctx, p.ID)
	if got.Views != 1 {
		t.Fatalf("Get sau increment mong views=1, được %d", got.Views)
	}
}
