// Lesson 43 — REST API Design (solutions.go)
//
// File này minh hoạ một REST API CRUD users đúng chuẩn bằng net/http,
// dùng ServeMux pattern routing của Go 1.22+ (method + path wildcard).
//
// Bao gồm:
//   - CRUD users (GET list, GET one, POST create, PUT replace, PATCH update, DELETE)
//   - Pagination: offset/limit + cursor-based (demo opaque cursor base64)
//   - RFC 7807 Problem Details cho error response
//   - Idempotency-Key middleware (sync.Map, capture response)
//   - Status code đúng cho từng action
//
// Cách chạy:
//
//	go run solutions.go
//
// Mặc định nếu chạy KHÔNG có biến môi trường RUN_SERVER, file sẽ chạy phần
// demo() (in ra ví dụ) rồi thoát — để `go run` không bị treo chờ server.
// Muốn khởi động server thật:
//
//	RUN_SERVER=1 go run solutions.go   # listen :8080
//
// Sau đó thử:
//
//	curl -i localhost:8080/users
//	curl -i -X POST localhost:8080/users -d '{"name":"Bob","email":"bob@x.io","age":30}'
//	curl -i -X POST localhost:8080/users -d '{"email":"bad","age":-1}'   # 422 RFC7807
//	curl -i localhost:8080/users/1
//	curl -i 'localhost:8080/users?offset=0&limit=2'
//	curl -i 'localhost:8080/users?cursor=&limit=2'   # cursor pagination
//	curl -i -X DELETE localhost:8080/users/1          # 204
package main

import (
	"encoding/base64"
	"encoding/json"
	"errors"
	"fmt"
	"log"
	"net/http"
	"os"
	"sort"
	"strconv"
	"strings"
	"sync"
	"time"
)

// ============================================================================
// 1. Model — resource "User"
// ============================================================================

// User là resource chính. Field dùng snake_case nhất quán trong JSON.
type User struct {
	ID        int64     `json:"id"`
	Name      string    `json:"name"`
	Email     string    `json:"email"`
	Age       int       `json:"age"`
	CreatedAt time.Time `json:"created_at"`
}

// store là in-memory storage có khoá để an toàn khi nhiều goroutine truy cập.
// Production dùng DB thật; đây chỉ minh hoạ.
type store struct {
	mu     sync.RWMutex
	byID   map[int64]*User
	nextID int64
}

func newStore() *store {
	s := &store{byID: map[int64]*User{}, nextID: 1}
	// Seed vài user để demo pagination.
	for i := 0; i < 5; i++ {
		s.create(&User{
			Name:  fmt.Sprintf("user%d", i+1),
			Email: fmt.Sprintf("user%d@x.io", i+1),
			Age:   20 + i,
		})
	}
	return s
}

func (s *store) create(u *User) *User {
	s.mu.Lock()
	defer s.mu.Unlock()
	u.ID = s.nextID
	u.CreatedAt = time.Now().UTC()
	s.nextID++
	s.byID[u.ID] = u
	return u
}

func (s *store) get(id int64) (*User, bool) {
	s.mu.RLock()
	defer s.mu.RUnlock()
	u, ok := s.byID[id]
	return u, ok
}

func (s *store) replace(id int64, u *User) (*User, bool) {
	s.mu.Lock()
	defer s.mu.Unlock()
	old, ok := s.byID[id]
	if !ok {
		return nil, false
	}
	// PUT = replace toàn bộ: giữ id + created_at, thay phần còn lại.
	u.ID = id
	u.CreatedAt = old.CreatedAt
	s.byID[id] = u
	return u, true
}

func (s *store) patch(id int64, patch map[string]any) (*User, bool) {
	s.mu.Lock()
	defer s.mu.Unlock()
	u, ok := s.byID[id]
	if !ok {
		return nil, false
	}
	// PATCH = update một phần: chỉ field nào có mặt trong patch mới đổi.
	if v, ok := patch["name"].(string); ok {
		u.Name = v
	}
	if v, ok := patch["email"].(string); ok {
		u.Email = v
	}
	if v, ok := patch["age"].(float64); ok { // JSON number decode về float64
		u.Age = int(v)
	}
	return u, true
}

func (s *store) delete(id int64) bool {
	s.mu.Lock()
	defer s.mu.Unlock()
	if _, ok := s.byID[id]; !ok {
		return false
	}
	delete(s.byID, id)
	return true
}

// emailExists kiểm tra trùng email (để minh hoạ 409 Conflict).
func (s *store) emailExists(email string, exceptID int64) bool {
	s.mu.RLock()
	defer s.mu.RUnlock()
	for _, u := range s.byID {
		if u.Email == email && u.ID != exceptID {
			return true
		}
	}
	return false
}

// listSorted trả về toàn bộ user sort theo id tăng dần (ổn định cho paginate).
func (s *store) listSorted() []*User {
	s.mu.RLock()
	defer s.mu.RUnlock()
	out := make([]*User, 0, len(s.byID))
	for _, u := range s.byID {
		out = append(out, u)
	}
	sort.Slice(out, func(i, j int) bool { return out[i].ID < out[j].ID })
	return out
}

// ============================================================================
// 2. RFC 7807 — Problem Details
// ============================================================================

// Problem là error response chuẩn RFC 7807 (Content-Type: application/problem+json).
type Problem struct {
	Type     string       `json:"type"`
	Title    string       `json:"title"`
	Status   int          `json:"status"`
	Detail   string       `json:"detail,omitempty"`
	Instance string       `json:"instance,omitempty"`
	Errors   []FieldError `json:"errors,omitempty"`
	TraceID  string       `json:"trace_id,omitempty"`
}

// FieldError mô tả lỗi validation ở mức field (custom extension RFC 7807 cho phép).
type FieldError struct {
	Field   string `json:"field"`
	Code    string `json:"code"`
	Message string `json:"message"`
}

// writeProblem ghi Problem ra response với đúng Content-Type + status code.
func writeProblem(w http.ResponseWriter, p Problem) {
	w.Header().Set("Content-Type", "application/problem+json")
	w.WriteHeader(p.Status)
	_ = json.NewEncoder(w).Encode(p)
}

const problemBase = "https://api.example.com/problems/"

// writeJSON ghi response JSON thường với status code chỉ định.
func writeJSON(w http.ResponseWriter, status int, v any) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(status)
	_ = json.NewEncoder(w).Encode(v)
}

// ============================================================================
// 3. Validation
// ============================================================================

// validateUser trả về danh sách FieldError (rỗng nếu hợp lệ).
func validateUser(name, email string, age int) []FieldError {
	var errs []FieldError
	if strings.TrimSpace(name) == "" {
		errs = append(errs, FieldError{Field: "name", Code: "required", Message: "Name is required"})
	}
	if !strings.Contains(email, "@") {
		errs = append(errs, FieldError{Field: "email", Code: "invalid_format", Message: "Not a valid email"})
	}
	if age < 0 {
		errs = append(errs, FieldError{Field: "age", Code: "out_of_range", Message: "Age must be >= 0"})
	}
	return errs
}

// ============================================================================
// 4. Pagination — offset/limit + cursor
// ============================================================================

// PageMeta là metadata pagination trả kèm data (response format chuẩn mục 7.5).
type PageMeta struct {
	NextCursor string `json:"next_cursor,omitempty"`
	HasMore    bool   `json:"has_more"`
	Total      int    `json:"total,omitempty"`  // optional — đắt khi tính trên bảng lớn
	Offset     int    `json:"offset,omitempty"` // chỉ có với chế độ offset
	Limit      int    `json:"limit"`
}

// listResponse là body của GET /users.
type listResponse struct {
	Data       []*User  `json:"data"`
	Pagination PageMeta `json:"pagination"`
}

// encodeCursor gói last_id thành token opaque (base64 của JSON).
// Client KHÔNG nên tự parse — coi như chuỗi mờ.
func encodeCursor(lastID int64) string {
	raw, _ := json.Marshal(map[string]int64{"last_id": lastID})
	return base64.RawURLEncoding.EncodeToString(raw)
}

// decodeCursor giải mã cursor về last_id. Cursor rỗng = bắt đầu từ đầu (last_id=0).
func decodeCursor(cur string) (int64, error) {
	if cur == "" {
		return 0, nil
	}
	raw, err := base64.RawURLEncoding.DecodeString(cur)
	if err != nil {
		return 0, errors.New("cursor không hợp lệ")
	}
	var m map[string]int64
	if err := json.Unmarshal(raw, &m); err != nil {
		return 0, errors.New("cursor không hợp lệ")
	}
	return m["last_id"], nil
}

// paginateOffset cắt slice theo offset/limit. Đơn giản nhưng OFFSET lớn = chậm.
func paginateOffset(all []*User, offset, limit int) ([]*User, PageMeta) {
	total := len(all)
	if offset > total {
		offset = total
	}
	end := offset + limit
	if end > total {
		end = total
	}
	page := all[offset:end]
	return page, PageMeta{
		HasMore: end < total,
		Total:   total,
		Offset:  offset,
		Limit:   limit,
	}
}

// paginateCursor lấy `limit` user có id > lastID. Index seek thay vì scan-skip
// → performance ổn định kể cả ở "trang sâu". Đánh đổi: không jump page bất kỳ.
func paginateCursor(all []*User, lastID int64, limit int) ([]*User, PageMeta) {
	var page []*User
	for _, u := range all {
		if u.ID > lastID {
			page = append(page, u)
			if len(page) == limit {
				break
			}
		}
	}
	meta := PageMeta{Limit: limit}
	if n := len(page); n > 0 {
		newLast := page[n-1].ID
		// Còn record nào id > newLast không?
		hasMore := false
		for _, u := range all {
			if u.ID > newLast {
				hasMore = true
				break
			}
		}
		meta.HasMore = hasMore
		if hasMore {
			meta.NextCursor = encodeCursor(newLast)
		}
	}
	return page, meta
}

// ============================================================================
// 5. Handlers — CRUD
// ============================================================================

type api struct {
	store *store
}

// handleUsersCollection xử lý /users (không có id): GET list, POST create.
func (a *api) listUsers(w http.ResponseWriter, r *http.Request) {
	q := r.URL.Query()
	all := a.store.listSorted()

	limit := parseIntDefault(q.Get("limit"), 10)
	if limit <= 0 || limit > 100 {
		limit = 10
	}

	// Nếu có query param "cursor" (kể cả rỗng "cursor=") → dùng cursor pagination.
	if _, useCursor := q["cursor"]; useCursor {
		lastID, err := decodeCursor(q.Get("cursor"))
		if err != nil {
			writeProblem(w, Problem{
				Type: problemBase + "bad-cursor", Title: "Bad Request",
				Status: http.StatusBadRequest, Detail: err.Error(), Instance: r.URL.Path,
			})
			return
		}
		page, meta := paginateCursor(all, lastID, limit)
		writeJSON(w, http.StatusOK, listResponse{Data: orEmpty(page), Pagination: meta})
		return
	}

	// Mặc định: offset/limit.
	offset := parseIntDefault(q.Get("offset"), 0)
	if offset < 0 {
		offset = 0
	}
	page, meta := paginateOffset(all, offset, limit)
	writeJSON(w, http.StatusOK, listResponse{Data: orEmpty(page), Pagination: meta}) // 200 kể cả khi rỗng
}

// createUser xử lý POST /users → 201 + Location header.
func (a *api) createUser(w http.ResponseWriter, r *http.Request) {
	var in struct {
		Name  string `json:"name"`
		Email string `json:"email"`
		Age   int    `json:"age"`
	}
	if err := json.NewDecoder(r.Body).Decode(&in); err != nil {
		// JSON sai cú pháp → 400 Bad Request.
		writeProblem(w, Problem{
			Type: problemBase + "bad-json", Title: "Bad Request",
			Status: http.StatusBadRequest, Detail: err.Error(), Instance: r.URL.Path,
		})
		return
	}
	// Validation business → 422 Unprocessable Entity.
	if errs := validateUser(in.Name, in.Email, in.Age); len(errs) > 0 {
		writeProblem(w, Problem{
			Type: problemBase + "validation", Title: "Validation Failed",
			Status: http.StatusUnprocessableEntity, Errors: errs, Instance: r.URL.Path,
		})
		return
	}
	// Trùng email → 409 Conflict.
	if a.store.emailExists(in.Email, 0) {
		writeProblem(w, Problem{
			Type: problemBase + "conflict", Title: "Conflict",
			Status: http.StatusConflict, Detail: "Email already exists", Instance: r.URL.Path,
		})
		return
	}
	u := a.store.create(&User{Name: in.Name, Email: in.Email, Age: in.Age})
	w.Header().Set("Location", fmt.Sprintf("/users/%d", u.ID)) // practice chuẩn của POST tạo mới
	writeJSON(w, http.StatusCreated, u)                        // 201 Created
}

// getUser xử lý GET /users/{id} → 200 hoặc 404.
func (a *api) getUser(w http.ResponseWriter, r *http.Request) {
	id, ok := pathID(w, r)
	if !ok {
		return
	}
	u, found := a.store.get(id)
	if !found {
		a.notFound(w, r)
		return
	}
	writeJSON(w, http.StatusOK, u)
}

// putUser xử lý PUT /users/{id} → replace toàn bộ. 200 (hoặc 404 nếu không có).
func (a *api) putUser(w http.ResponseWriter, r *http.Request) {
	id, ok := pathID(w, r)
	if !ok {
		return
	}
	var in struct {
		Name  string `json:"name"`
		Email string `json:"email"`
		Age   int    `json:"age"`
	}
	if err := json.NewDecoder(r.Body).Decode(&in); err != nil {
		writeProblem(w, Problem{
			Type: problemBase + "bad-json", Title: "Bad Request",
			Status: http.StatusBadRequest, Detail: err.Error(), Instance: r.URL.Path,
		})
		return
	}
	if errs := validateUser(in.Name, in.Email, in.Age); len(errs) > 0 {
		writeProblem(w, Problem{
			Type: problemBase + "validation", Title: "Validation Failed",
			Status: http.StatusUnprocessableEntity, Errors: errs, Instance: r.URL.Path,
		})
		return
	}
	u, found := a.store.replace(id, &User{Name: in.Name, Email: in.Email, Age: in.Age})
	if !found {
		a.notFound(w, r)
		return
	}
	writeJSON(w, http.StatusOK, u)
}

// patchUser xử lý PATCH /users/{id} → update một phần.
func (a *api) patchUser(w http.ResponseWriter, r *http.Request) {
	id, ok := pathID(w, r)
	if !ok {
		return
	}
	var patch map[string]any
	if err := json.NewDecoder(r.Body).Decode(&patch); err != nil {
		writeProblem(w, Problem{
			Type: problemBase + "bad-json", Title: "Bad Request",
			Status: http.StatusBadRequest, Detail: err.Error(), Instance: r.URL.Path,
		})
		return
	}
	u, found := a.store.patch(id, patch)
	if !found {
		a.notFound(w, r)
		return
	}
	writeJSON(w, http.StatusOK, u)
}

// deleteUser xử lý DELETE /users/{id} → 204 No Content (idempotent).
func (a *api) deleteUser(w http.ResponseWriter, r *http.Request) {
	id, ok := pathID(w, r)
	if !ok {
		return
	}
	a.store.delete(id)                  // DELETE idempotent: dù có hay không thì kết quả cuối là "đã xoá"
	w.WriteHeader(http.StatusNoContent) // 204, không body
}

func (a *api) notFound(w http.ResponseWriter, r *http.Request) {
	writeProblem(w, Problem{
		Type: problemBase + "not-found", Title: "Not Found",
		Status: http.StatusNotFound, Detail: "Resource không tồn tại", Instance: r.URL.Path,
	})
}

// ============================================================================
// 6. Helpers
// ============================================================================

func parseIntDefault(s string, def int) int {
	if s == "" {
		return def
	}
	n, err := strconv.Atoi(s)
	if err != nil {
		return def
	}
	return n
}

// pathID đọc {id} từ ServeMux pattern, trả 400 nếu không phải số.
func pathID(w http.ResponseWriter, r *http.Request) (int64, bool) {
	raw := r.PathValue("id")
	id, err := strconv.ParseInt(raw, 10, 64)
	if err != nil {
		writeProblem(w, Problem{
			Type: problemBase + "bad-id", Title: "Bad Request",
			Status: http.StatusBadRequest, Detail: "id phải là số nguyên", Instance: r.URL.Path,
		})
		return 0, false
	}
	return id, true
}

// orEmpty đảm bảo JSON ra `[]` thay vì `null` khi không có record.
func orEmpty(s []*User) []*User {
	if s == nil {
		return []*User{}
	}
	return s
}

// ============================================================================
// 7. Idempotency-Key middleware
// ============================================================================

// cachedResponse lưu lại response đã ghi để trả lại khi retry cùng key.
type cachedResponse struct {
	status  int
	body    []byte
	headers http.Header
}

// responseRecorder bọc http.ResponseWriter để capture status + body.
type responseRecorder struct {
	http.ResponseWriter
	status      int
	body        []byte
	wroteHeader bool
}

func (rec *responseRecorder) WriteHeader(code int) {
	if rec.wroteHeader {
		return
	}
	rec.status = code
	rec.wroteHeader = true
	rec.ResponseWriter.WriteHeader(code)
}

func (rec *responseRecorder) Write(b []byte) (int, error) {
	if !rec.wroteHeader {
		rec.WriteHeader(http.StatusOK)
	}
	rec.body = append(rec.body, b...)
	return rec.ResponseWriter.Write(b)
}

// IdempotencyMiddleware: với POST/PUT/PATCH có header Idempotency-Key, cache
// response (key → response). Retry cùng key → trả lại response cũ, không xử lý lại.
// Production dùng Redis với TTL 24h thay sync.Map.
func IdempotencyMiddleware(next http.Handler) http.Handler {
	var cache sync.Map // key string -> *cachedResponse
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		key := r.Header.Get("Idempotency-Key")
		mutating := r.Method == http.MethodPost || r.Method == http.MethodPut || r.Method == http.MethodPatch
		if key == "" || !mutating {
			next.ServeHTTP(w, r)
			return
		}
		// Đã có response cũ cho key này → trả lại ngay (replay).
		if v, ok := cache.Load(key); ok {
			cr := v.(*cachedResponse)
			for k, vs := range cr.headers {
				for _, val := range vs {
					w.Header().Add(k, val)
				}
			}
			w.Header().Set("Idempotent-Replayed", "true")
			w.WriteHeader(cr.status)
			_, _ = w.Write(cr.body)
			return
		}
		// Lần đầu: capture response rồi lưu cache.
		rec := &responseRecorder{ResponseWriter: w, status: http.StatusOK}
		next.ServeHTTP(rec, r)
		cloned := http.Header{}
		for k, vs := range w.Header() {
			cloned[k] = append([]string(nil), vs...)
		}
		cache.Store(key, &cachedResponse{status: rec.status, body: rec.body, headers: cloned})
	})
}

// ============================================================================
// 8. Router (Go 1.22+ ServeMux: method + path pattern + wildcard {id})
// ============================================================================

func (a *api) routes() http.Handler {
	mux := http.NewServeMux()
	// Collection.
	mux.HandleFunc("GET /users", a.listUsers)
	mux.HandleFunc("POST /users", a.createUser)
	// Instance — {id} là wildcard, đọc qua r.PathValue("id").
	mux.HandleFunc("GET /users/{id}", a.getUser)
	mux.HandleFunc("PUT /users/{id}", a.putUser)
	mux.HandleFunc("PATCH /users/{id}", a.patchUser)
	mux.HandleFunc("DELETE /users/{id}", a.deleteUser)
	// Bọc toàn bộ bằng idempotency middleware.
	return IdempotencyMiddleware(mux)
}

// ============================================================================
// 9. main + demo
// ============================================================================

func main() {
	a := &api{store: newStore()}

	if os.Getenv("RUN_SERVER") == "" {
		// Mặc định: chạy demo rồi thoát (để `go run` không treo).
		demo(a)
		return
	}

	addr := ":8080"
	log.Printf("REST API listening on %s (RUN_SERVER mode)", addr)
	if err := http.ListenAndServe(addr, a.routes()); err != nil {
		log.Fatal(err)
	}
}

// demo in ra một vài ví dụ minh hoạ không cần khởi động server.
func demo(a *api) {
	fmt.Println("=== Lesson 43 — REST API Design (demo) ===")

	all := a.store.listSorted()
	fmt.Printf("\n[Store] %d user seed sẵn (id 1..%d)\n", len(all), len(all))

	// --- Offset pagination ---
	fmt.Println("\n--- Offset pagination: offset=1, limit=2 ---")
	page, meta := paginateOffset(all, 1, 2)
	for _, u := range page {
		fmt.Printf("  id=%d name=%s email=%s\n", u.ID, u.Name, u.Email)
	}
	fmt.Printf("  meta: %+v\n", meta)

	// --- Cursor pagination ---
	fmt.Println("\n--- Cursor pagination: limit=2 (2 trang) ---")
	p1, m1 := paginateCursor(all, 0, 2)
	for _, u := range p1 {
		fmt.Printf("  [trang 1] id=%d %s\n", u.ID, u.Name)
	}
	fmt.Printf("  next_cursor=%q has_more=%v\n", m1.NextCursor, m1.HasMore)
	last, _ := decodeCursor(m1.NextCursor)
	p2, m2 := paginateCursor(all, last, 2)
	for _, u := range p2 {
		fmt.Printf("  [trang 2] id=%d %s\n", u.ID, u.Name)
	}
	fmt.Printf("  next_cursor=%q has_more=%v\n", m2.NextCursor, m2.HasMore)

	// --- Validation → RFC 7807 ---
	fmt.Println("\n--- Validation RFC 7807 cho input xấu {email:'bad', age:-1} ---")
	errs := validateUser("Bob", "bad", -1)
	prob := Problem{
		Type: problemBase + "validation", Title: "Validation Failed",
		Status: http.StatusUnprocessableEntity, Errors: errs, Instance: "/users",
	}
	out, _ := json.MarshalIndent(prob, "  ", "  ")
	fmt.Printf("  HTTP %d application/problem+json\n  %s\n", prob.Status, out)

	// --- Status code map ---
	fmt.Println("\n--- Status code map cho từng action ---")
	cases := []struct{ action, status string }{
		{"POST /users (tạo mới)", "201 Created + Location"},
		{"GET /users (kể cả rỗng)", "200 OK"},
		{"GET /users/999 (không tồn tại)", "404 Not Found"},
		{"POST /users (JSON sai cú pháp)", "400 Bad Request"},
		{"POST /users (email sai format)", "422 Unprocessable Entity"},
		{"POST /users (email trùng)", "409 Conflict"},
		{"DELETE /users/1", "204 No Content"},
	}
	for _, c := range cases {
		fmt.Printf("  %-34s -> %s\n", c.action, c.status)
	}

	fmt.Println("\nĐể chạy server thật: RUN_SERVER=1 go run solutions.go")
}
