// Lesson 77 — test cho solutions.go.
//
// Đây chính là phần `go test -race -cover ./...` trong pipeline CI sẽ chạy.
// Bao gồm table-driven test (idiom Go) cho 3 thành phần: SemVer.Bump,
// EvaluateCanary, và HTTP /healthz.
package main

import (
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"testing"
)

func TestParseSemVer(t *testing.T) {
	cases := []struct {
		in      string
		want    SemVer
		wantErr bool
	}{
		{"v1.2.3", SemVer{1, 2, 3}, false},
		{"1.2.3", SemVer{1, 2, 3}, false}, // không tiền tố v vẫn ok
		{" v0.0.0 ", SemVer{0, 0, 0}, false},
		{"v1.2", SemVer{}, true},     // thiếu phần
		{"v1.2.x", SemVer{}, true},   // không phải số
		{"v-1.2.3", SemVer{}, true},  // âm
	}
	for _, c := range cases {
		got, err := ParseSemVer(c.in)
		if (err != nil) != c.wantErr {
			t.Errorf("ParseSemVer(%q) err=%v, wantErr=%v", c.in, err, c.wantErr)
			continue
		}
		if !c.wantErr && got != c.want {
			t.Errorf("ParseSemVer(%q)=%v, want %v", c.in, got, c.want)
		}
	}
}

func TestSemVerBump(t *testing.T) {
	base := SemVer{1, 4, 2}
	cases := []struct {
		kind BumpKind
		want string
	}{
		{BumpPatch, "v1.4.3"},
		{BumpMinor, "v1.5.0"}, // minor reset patch
		{BumpMajor, "v2.0.0"}, // major reset minor+patch
	}
	for _, c := range cases {
		if got := base.Bump(c.kind).String(); got != c.want {
			t.Errorf("Bump(%v)=%s, want %s", c.kind, got, c.want)
		}
	}
}

func TestEvaluateCanary(t *testing.T) {
	cases := []struct {
		errorRate, threshold float64
		want                 CanaryDecision
		wantErr              bool
	}{
		{0.005, 0.01, Promote, false},  // dưới ngưỡng → promote
		{0.01, 0.01, Promote, false},   // bằng ngưỡng → promote
		{0.05, 0.01, Rollback, false},  // vượt ngưỡng → rollback
		{0.0, 0.01, Promote, false},    // không lỗi → promote
		{-0.1, 0.01, "", true},         // rate âm → lỗi
		{1.5, 0.01, "", true},          // rate > 1 → lỗi
	}
	for _, c := range cases {
		got, err := EvaluateCanary(c.errorRate, c.threshold)
		if (err != nil) != c.wantErr {
			t.Errorf("EvaluateCanary(%v,%v) err=%v wantErr=%v", c.errorRate, c.threshold, err, c.wantErr)
			continue
		}
		if !c.wantErr && got != c.want {
			t.Errorf("EvaluateCanary(%v,%v)=%v want %v", c.errorRate, c.threshold, got, c.want)
		}
	}
}

func TestHealthzHandler(t *testing.T) {
	rec := httptest.NewRecorder()
	req := httptest.NewRequest(http.MethodGet, "/healthz", nil)
	newRouter().ServeHTTP(rec, req)

	if rec.Code != http.StatusOK {
		t.Fatalf("status=%d, want 200", rec.Code)
	}
	var body healthResponse
	if err := json.Unmarshal(rec.Body.Bytes(), &body); err != nil {
		t.Fatalf("body không phải JSON hợp lệ: %v", err)
	}
	if body.Status != "ok" {
		t.Errorf("status=%q, want %q", body.Status, "ok")
	}
	if body.Version != Version {
		t.Errorf("version=%q, want %q", body.Version, Version)
	}
}
