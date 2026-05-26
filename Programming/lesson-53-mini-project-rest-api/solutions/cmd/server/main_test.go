package main

import (
	"bytes"
	"encoding/json"
	"io"
	"log/slog"
	"net/http"
	"net/http/httptest"
	"testing"
)

// newTestServer dựng server thật (in-memory) cho integration test.
func newTestServer(t *testing.T) *httptest.Server {
	t.Helper()
	log := slog.New(slog.NewTextHandler(io.Discard, nil))
	h := buildHandler(log, "test-secret", "*")
	return httptest.NewServer(h)
}

func doJSON(t *testing.T, method, url, token string, body any) (*http.Response, map[string]any) {
	t.Helper()
	var buf bytes.Buffer
	if body != nil {
		_ = json.NewEncoder(&buf).Encode(body)
	}
	req, _ := http.NewRequest(method, url, &buf)
	req.Header.Set("Content-Type", "application/json")
	if token != "" {
		req.Header.Set("Authorization", "Bearer "+token)
	}
	resp, err := http.DefaultClient.Do(req)
	if err != nil {
		t.Fatalf("request %s %s: %v", method, url, err)
	}
	var out map[string]any
	b, _ := io.ReadAll(resp.Body)
	resp.Body.Close()
	if len(b) > 0 {
		_ = json.Unmarshal(b, &out)
	}
	return resp, out
}

// TestFullFlow chạy luồng end-to-end: register → me → create post → update → forbidden → delete.
func TestFullFlow(t *testing.T) {
	srv := newTestServer(t)
	defer srv.Close()
	base := srv.URL

	// 1. Đăng ký.
	resp, body := doJSON(t, "POST", base+"/v1/auth/register", "", map[string]string{
		"username": "alice", "email": "alice@example.com", "password": "password123",
	})
	if resp.StatusCode != http.StatusCreated {
		t.Fatalf("register status = %d, body=%v", resp.StatusCode, body)
	}
	token, _ := body["token"].(string)
	if token == "" {
		t.Fatal("register không trả token")
	}

	// 2. GET /users/me với token.
	resp, body = doJSON(t, "GET", base+"/v1/users/me", token, nil)
	if resp.StatusCode != http.StatusOK {
		t.Fatalf("me status = %d", resp.StatusCode)
	}
	if body["username"] != "alice" {
		t.Fatalf("me username = %v", body["username"])
	}
	if _, leaked := body["password_hash"]; leaked {
		t.Fatal("password hash bị lộ ra JSON")
	}

	// 3. /users/me KHÔNG token → 401.
	resp, _ = doJSON(t, "GET", base+"/v1/users/me", "", nil)
	if resp.StatusCode != http.StatusUnauthorized {
		t.Fatalf("me không token phải 401, got %d", resp.StatusCode)
	}

	// 4. Tạo post.
	resp, body = doJSON(t, "POST", base+"/v1/posts", token, map[string]string{
		"title": "Bài đầu tiên", "body": "Nội dung bài viết.",
	})
	if resp.StatusCode != http.StatusCreated {
		t.Fatalf("create post status = %d, body=%v", resp.StatusCode, body)
	}
	postID, _ := body["id"].(string)
	if postID == "" {
		t.Fatal("create post không trả id")
	}

	// 5. Update post (cùng tác giả) → OK.
	resp, body = doJSON(t, "PUT", base+"/v1/posts/"+postID, token, map[string]string{
		"title": "Bài đã sửa", "body": "Nội dung mới.",
	})
	if resp.StatusCode != http.StatusOK {
		t.Fatalf("update post status = %d", resp.StatusCode)
	}
	if body["title"] != "Bài đã sửa" {
		t.Fatalf("title sau update = %v", body["title"])
	}

	// 6. User khác (bob) update bài của alice → 403.
	_, regBob := doJSON(t, "POST", base+"/v1/auth/register", "", map[string]string{
		"username": "bob", "email": "bob@example.com", "password": "password123",
	})
	bobToken, _ := regBob["token"].(string)
	resp, _ = doJSON(t, "PUT", base+"/v1/posts/"+postID, bobToken, map[string]string{
		"title": "Bob chiếm bài", "body": "hehe",
	})
	if resp.StatusCode != http.StatusForbidden {
		t.Fatalf("bob update bài alice phải 403, got %d", resp.StatusCode)
	}

	// 7. Delete (tác giả) → 204.
	resp, _ = doJSON(t, "DELETE", base+"/v1/posts/"+postID, token, nil)
	if resp.StatusCode != http.StatusNoContent {
		t.Fatalf("delete status = %d", resp.StatusCode)
	}

	// 8. GET bài đã xoá → 404.
	resp, _ = doJSON(t, "GET", base+"/v1/posts/"+postID, "", nil)
	if resp.StatusCode != http.StatusNotFound {
		t.Fatalf("get bài đã xoá phải 404, got %d", resp.StatusCode)
	}
}

func TestRegisterValidation(t *testing.T) {
	srv := newTestServer(t)
	defer srv.Close()

	resp, body := doJSON(t, "POST", srv.URL+"/v1/auth/register", "", map[string]string{
		"username": "ab", "email": "khong-phai-email", "password": "123",
	})
	if resp.StatusCode != http.StatusBadRequest {
		t.Fatalf("validation phải 400, got %d", resp.StatusCode)
	}
	errs, ok := body["errors"].(map[string]any)
	if !ok || len(errs) != 3 {
		t.Fatalf("phải có 3 field lỗi, got %v", body["errors"])
	}
}

func TestLoginWrongPassword(t *testing.T) {
	srv := newTestServer(t)
	defer srv.Close()

	doJSON(t, "POST", srv.URL+"/v1/auth/register", "", map[string]string{
		"username": "carol", "email": "carol@example.com", "password": "password123",
	})
	resp, _ := doJSON(t, "POST", srv.URL+"/v1/auth/login", "", map[string]string{
		"username": "carol", "password": "sai-mat-khau",
	})
	if resp.StatusCode != http.StatusUnauthorized {
		t.Fatalf("login sai mật khẩu phải 401, got %d", resp.StatusCode)
	}
}
