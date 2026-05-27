// solutions.go — HTTP server tối giản dùng làm "ứng dụng mẫu" để đóng gói
// bằng Dockerfile multi-stage trong Lesson 75.
//
// Tính năng minh hoạ đúng các điểm bài học đề cập:
//   - Route "/"          : trang chủ, in version + thông tin build.
//   - Route "/health"    : health endpoint trả "ok" (cho HEALTHCHECK / K8s probe).
//   - Route "/healthz"   : alias quen thuộc trong hệ sinh thái K8s.
//   - Route "/version"   : trả về version đã inject lúc build.
//   - Biến `version` (var string package-level) → ghi đè được qua:
//         -ldflags="-X main.version=1.2.3"
//   - Flag `-healthcheck`: app TỰ gọi /healthz rồi exit 0 (ok) / 1 (fail).
//     Dùng cho `HEALTHCHECK CMD ["/server","-healthcheck"]` trên base `scratch`
//     (scratch không có shell/curl nên không thể `CMD curl ...`).
//
// Chạy thử cục bộ:
//   go run solutions.go                 # nghe :8080
//   go run solutions.go -healthcheck    # self-check (cần server đang chạy)
//
// Build production (binary tĩnh, đã strip, có version):
//   CGO_ENABLED=0 go build \
//       -ldflags="-s -w -X main.version=1.0.0 -X main.commit=abc123" \
//       -o server solutions.go
package main

import (
	"flag"
	"fmt"
	"io"
	"log"
	"net/http"
	"os"
	"time"
)

// CÁC BIẾN NÀY PHẢI LÀ `var string` package-level để linker `-X` ghi đè được.
// Nếu khai báo `const version = "dev"` thì -ldflags="-X ..." sẽ IM LẶNG không
// có tác dụng (const đã inline lúc compile) — đây là pitfall #7 trong README.
var (
	version   = "dev"     // ghi đè: -X main.version=1.2.3
	commit    = "none"    // ghi đè: -X main.commit=$(git rev-parse --short HEAD)
	buildTime = "unknown" // ghi đè: -X main.buildTime=$(date -u +%Y-%m-%dT%H:%M:%SZ)
)

func main() {
	// Cho phép đổi địa chỉ nghe qua flag / env (không bake cứng).
	addr := flag.String("addr", envOr("ADDR", ":8080"), "địa chỉ HTTP server lắng nghe")
	// Flag self-check: dùng cho HEALTHCHECK trên scratch (không cần shell/curl).
	healthcheck := flag.Bool("healthcheck", false, "tự gọi /healthz rồi exit 0/1 (dùng cho Docker HEALTHCHECK)")
	flag.Parse()

	if *healthcheck {
		// Chế độ self-check: gọi vào chính mình rồi exit theo kết quả.
		runHealthcheck(*addr)
		return // (runHealthcheck đã os.Exit; dòng này chỉ cho rõ ý)
	}

	mux := http.NewServeMux()

	// Trang chủ — in thông tin phiên bản đã inject lúc build.
	mux.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		if r.URL.Path != "/" {
			http.NotFound(w, r)
			return
		}
		w.Header().Set("Content-Type", "text/plain; charset=utf-8")
		fmt.Fprintf(w, "Lesson 75 — Docker multi-stage demo\n")
		fmt.Fprintf(w, "version=%s commit=%s buildTime=%s\n", version, commit, buildTime)
		fmt.Fprintf(w, "Thử: /healthz  /version\n")
	})

	// Health endpoint — trả "ok" + 200. Dùng cho HEALTHCHECK của Docker hoặc
	// liveness/readiness probe của Kubernetes (Lesson 76).
	healthHandler := func(w http.ResponseWriter, r *http.Request) {
		w.WriteHeader(http.StatusOK)
		fmt.Fprintln(w, "ok")
	}
	mux.HandleFunc("/health", healthHandler)
	mux.HandleFunc("/healthz", healthHandler) // alias kiểu K8s

	// Version endpoint — trả về phiên bản đã inject.
	mux.HandleFunc("/version", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "text/plain; charset=utf-8")
		fmt.Fprintln(w, version)
	})

	srv := &http.Server{
		Addr:              *addr,
		Handler:           mux,
		ReadHeaderTimeout: 5 * time.Second, // chặn slowloris cơ bản
	}

	log.Printf("server bắt đầu nghe %s (version=%s commit=%s)", *addr, version, commit)
	if err := srv.ListenAndServe(); err != nil && err != http.ErrServerClosed {
		log.Fatalf("server lỗi: %v", err)
	}
}

// runHealthcheck gọi http://localhost<addr>/healthz và os.Exit(0) nếu nhận 200,
// ngược lại os.Exit(1). Đây là cách làm HEALTHCHECK cho image `scratch` (rỗng,
// không có shell/curl): chính binary tự kiểm tra bản thân.
func runHealthcheck(addr string) {
	// addr dạng ":8080" → ghép thành "http://localhost:8080/healthz".
	url := "http://localhost" + addr + "/healthz"
	client := &http.Client{Timeout: 2 * time.Second}

	resp, err := client.Get(url)
	if err != nil {
		fmt.Fprintf(os.Stderr, "healthcheck FAIL: %v\n", err)
		os.Exit(1)
	}
	defer resp.Body.Close()
	_, _ = io.Copy(io.Discard, resp.Body) // đọc hết body để tái dùng connection

	if resp.StatusCode != http.StatusOK {
		fmt.Fprintf(os.Stderr, "healthcheck FAIL: status=%d\n", resp.StatusCode)
		os.Exit(1)
	}
	fmt.Println("healthcheck OK")
	os.Exit(0)
}

// envOr trả về giá trị env `key` nếu có, ngược lại trả `def`.
func envOr(key, def string) string {
	if v := os.Getenv(key); v != "" {
		return v
	}
	return def
}
