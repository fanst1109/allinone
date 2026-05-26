//go:build integration

// Chạy: go test -tags=integration -v ./...
//
// File này chỉ build khi tag `integration` được bật. Mục đích: tách
// test chậm / cần resource thật khỏi test unit nhanh.

package lesson37

import (
	"net/http"
	"net/http/httptest"
	"testing"
)

// TestIntegration_ParseHTTP — end-to-end: client → server → parse.
// Trong dự án thật, đây có thể là Postgres testcontainer.
func TestIntegration_ParseHTTP(t *testing.T) {
	srv := httptest.NewServer(http.HandlerFunc(EchoHandler))
	t.Cleanup(srv.Close)

	c := &Client{BaseURL: srv.URL}
	echoed, err := c.GetEcho("integration")
	if err != nil {
		t.Fatal(err)
	}
	if echoed != "integration" {
		t.Errorf("echoed = %q", echoed)
	}
}
