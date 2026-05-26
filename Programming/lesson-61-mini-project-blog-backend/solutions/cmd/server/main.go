// Command server khởi động blog backend.
//
// Luồng khởi động (giống production):
//  1. Khởi tạo 4 tầng storage: repo (Postgres), cache (Redis), search index,
//     migrator (schema version).
//  2. Chạy migration để đưa schema lên version mới nhất.
//  3. Wire service (inject 3 dependency qua interface).
//  4. Đăng ký routes và nghe HTTP.
//
// Vì không có DB server trong môi trường này, mọi tầng dùng IN-MEMORY impl.
// Kiến trúc interface-based => đổi sang Postgres/Redis/ES thật chỉ cần thay
// dòng khởi tạo, không đụng service/handler.
package main

import (
	"context"
	"log"
	"net/http"
	"os"

	"blog-backend/internal/cache"
	"blog-backend/internal/migration"
	"blog-backend/internal/post"
	"blog-backend/internal/search"
	"blog-backend/internal/storage"
)

func main() {
	ctx := context.Background()

	// (1) Khởi tạo các tầng.
	repo := storage.NewMemoryRepository()
	c := cache.NewMemoryCache()
	ix := search.NewInvertedIndex()

	// (2) Migration: mô phỏng nâng schema từ v0 -> v3.
	m := migration.New()
	m.Register(migration.Migration{Version: 1, Name: "create_posts", Up: func() error { return nil }})
	m.Register(migration.Migration{Version: 2, Name: "create_comments", Up: func() error { return nil }})
	m.Register(migration.Migration{Version: 3, Name: "add_views_column", Up: func() error { return nil }})
	if err := m.Up(); err != nil {
		log.Fatalf("migration lỗi: %v", err)
	}
	log.Printf("schema version = %d, đã áp dụng: %v", m.Current(), m.Applied())

	// (3) Wire service.
	svc := post.NewService(repo, c, ix)

	// Seed vài bài viết để search/list có dữ liệu demo.
	seed(ctx, svc)

	// (4) Routes.
	mux := http.NewServeMux()
	h := post.NewHandler(svc)
	h.Routes(mux)

	// Port lấy từ biến môi trường PORT (mặc định 8080) — tiện đổi khi cổng bận
	// hoặc khi deploy.
	addr := ":8080"
	if p := os.Getenv("PORT"); p != "" {
		addr = ":" + p
	}
	log.Printf("blog backend chạy tại http://localhost%s", addr)
	if err := http.ListenAndServe(addr, mux); err != nil {
		log.Fatal(err)
	}
}

// seed nạp dữ liệu mẫu cho demo.
func seed(ctx context.Context, svc *post.Service) {
	samples := []post.CreatePostInput{
		{Title: "Go concurrency patterns", Body: "Goroutines và channels giúp viết code concurrent dễ đọc.", Tags: []string{"go", "concurrency"}},
		{Title: "Postgres indexing tips", Body: "B-tree index tăng tốc query, nhưng làm chậm write.", Tags: []string{"postgres", "database"}},
		{Title: "Redis cache strategies", Body: "Cache-aside là pattern phổ biến nhất cho read-heavy workload.", Tags: []string{"redis", "cache"}},
		{Title: "Full-text search with inverted index", Body: "Inverted index map term tới document, xếp hạng bằng TF-IDF.", Tags: []string{"search", "database"}},
	}
	for _, s := range samples {
		if _, err := svc.Create(ctx, s); err != nil {
			log.Printf("seed lỗi: %v", err)
		}
	}
}
