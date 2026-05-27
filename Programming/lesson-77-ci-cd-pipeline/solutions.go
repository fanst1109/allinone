// Lesson 77 — CI/CD Pipeline · solutions.go
//
// Đây là một app Go nhỏ — chính là "thứ" mà một pipeline CI sẽ lint + test + build.
// Mục tiêu của file này KHÔNG phải dạy thuật toán, mà minh hoạ một codebase tối giản,
// sạch (lint-friendly), có test, để bạn hình dung pipeline ở README chạy trên cái gì:
//
//	go vet ./...                  # tĩnh, bắt lỗi nghi vấn
//	go build ./...                # compile được?
//	go test -race -cover ./...    # test + race detector + coverage
//	go run solutions.go           # demo: in version + tự kiểm tra /healthz
//
// File test đi kèm: solutions_test.go (cùng package main).
package main

import (
	"encoding/json"
	"errors"
	"fmt"
	"net/http"
	"net/http/httptest"
	"strings"
)

// Version là semver của app — trong pipeline thật giá trị này được inject lúc build
// bằng ldflags, vd: go build -ldflags "-X main.Version=v1.2.3".
var Version = "v0.1.0-dev"

// ---------------------------------------------------------------------------
// Phần 1: Hàm nghiệp vụ thuần (pure) — dễ unit test, không phụ thuộc I/O.
// ---------------------------------------------------------------------------

// BumpKind cho biết loại tăng version theo SemVer.
type BumpKind int

const (
	BumpPatch BumpKind = iota // sửa bug tương thích ngược
	BumpMinor                 // thêm tính năng tương thích ngược
	BumpMajor                 // thay đổi phá vỡ tương thích
)

// SemVer biểu diễn một version MAJOR.MINOR.PATCH.
type SemVer struct {
	Major, Minor, Patch int
}

// String trả về dạng "vMAJOR.MINOR.PATCH".
func (v SemVer) String() string {
	return fmt.Sprintf("v%d.%d.%d", v.Major, v.Minor, v.Patch)
}

// ParseSemVer phân tích chuỗi "v1.2.3" (cho phép có/không tiền tố "v").
func ParseSemVer(s string) (SemVer, error) {
	s = strings.TrimPrefix(strings.TrimSpace(s), "v")
	parts := strings.Split(s, ".")
	if len(parts) != 3 {
		return SemVer{}, fmt.Errorf("semver không hợp lệ %q: cần 3 phần MAJOR.MINOR.PATCH", s)
	}
	var v SemVer
	dst := []*int{&v.Major, &v.Minor, &v.Patch}
	for i, p := range parts {
		n := 0
		if _, err := fmt.Sscanf(p, "%d", &n); err != nil || n < 0 {
			return SemVer{}, fmt.Errorf("phần %q không phải số không âm", p)
		}
		*dst[i] = n
	}
	return v, nil
}

// Bump tăng version theo SemVer. MAJOR reset MINOR/PATCH về 0; MINOR reset PATCH về 0.
// Đây chính là logic versioning ở mục 12 của README.
func (v SemVer) Bump(kind BumpKind) SemVer {
	switch kind {
	case BumpMajor:
		return SemVer{v.Major + 1, 0, 0}
	case BumpMinor:
		return SemVer{v.Major, v.Minor + 1, 0}
	case BumpPatch:
		return SemVer{v.Major, v.Minor, v.Patch + 1}
	default:
		return v
	}
}

// ---------------------------------------------------------------------------
// Phần 2: Quyết định promote/rollback canary dựa trên error rate (mục 9.4 + 13).
// ---------------------------------------------------------------------------

// CanaryDecision là kết quả đánh giá một bước canary.
type CanaryDecision string

const (
	Promote  CanaryDecision = "promote"  // tốt → tăng % traffic
	Rollback CanaryDecision = "rollback" // xấu → lui ngay
)

// errInvalidRate báo error rate ngoài khoảng [0,1].
var errInvalidRate = errors.New("error rate phải nằm trong [0,1]")

// EvaluateCanary quyết định promote hay rollback:
//   - errorRate, threshold trong khoảng [0,1] (vd 0.01 = 1%).
//   - errorRate <= threshold → Promote, ngược lại → Rollback.
//
// Đây là "bộ não" của automated rollback theo metric ở mục 13 README.
func EvaluateCanary(errorRate, threshold float64) (CanaryDecision, error) {
	if errorRate < 0 || errorRate > 1 || threshold < 0 || threshold > 1 {
		return "", errInvalidRate
	}
	if errorRate <= threshold {
		return Promote, nil
	}
	return Rollback, nil
}

// ---------------------------------------------------------------------------
// Phần 3: HTTP handler /healthz — health gate mà pipeline gọi sau deploy (BT6).
// ---------------------------------------------------------------------------

// healthResponse là body JSON của /healthz.
type healthResponse struct {
	Status  string `json:"status"`
	Version string `json:"version"`
}

// healthzHandler trả 200 + JSON {status, version}. Pipeline dùng smoke test
// `curl -fsS /healthz` để xác nhận "app khỏe" trước khi coi deploy là thành công.
func healthzHandler(w http.ResponseWriter, _ *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	_ = json.NewEncoder(w).Encode(healthResponse{Status: "ok", Version: Version})
}

// newRouter tạo mux với các route — tách ra để test dễ (không cần mở port thật).
func newRouter() *http.ServeMux {
	mux := http.NewServeMux()
	mux.HandleFunc("/healthz", healthzHandler)
	return mux
}

// ---------------------------------------------------------------------------
// main: demo nhanh — không mở port, chỉ tự gọi /healthz qua httptest để in kết quả,
// rồi minh hoạ bump version + đánh giá canary. Chạy: go run solutions.go
// ---------------------------------------------------------------------------

func main() {
	fmt.Printf("App version: %s\n", Version)

	// Demo health gate: gọi /healthz qua test recorder (không cần listen socket).
	rec := httptest.NewRecorder()
	req := httptest.NewRequest(http.MethodGet, "/healthz", nil)
	newRouter().ServeHTTP(rec, req)
	fmt.Printf("GET /healthz -> %d  %s", rec.Code, rec.Body.String())

	// Demo versioning (mục 12).
	cur, _ := ParseSemVer("v1.4.2")
	fmt.Printf("Bump patch:  %s -> %s\n", cur, cur.Bump(BumpPatch))
	fmt.Printf("Bump minor:  %s -> %s\n", cur, cur.Bump(BumpMinor))
	fmt.Printf("Bump major:  %s -> %s\n", cur, cur.Bump(BumpMajor))

	// Demo canary decision (mục 13): ngưỡng 1% lỗi.
	for _, er := range []float64{0.005, 0.05} {
		d, _ := EvaluateCanary(er, 0.01)
		fmt.Printf("Canary error rate %.1f%% (threshold 1.0%%) -> %s\n", er*100, d)
	}
}
