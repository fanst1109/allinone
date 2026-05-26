// solutions.go — Lesson 50: GraphQL
//
// File này KHÔNG dùng thư viện ngoài. Nó dựng một "GraphQL-like engine"
// tối giản bằng map-dispatch để minh họa các khái niệm cốt lõi của bài:
//
//   1. Schema struct (type + field + resolver).
//   2. Resolver pattern (Query.user, User.posts, Post.author...).
//   3. Resolver chain (engine duyệt cây query, gọi resolver từng field).
//   4. N+1 problem demo + đếm số "DB query".
//   5. DataLoader (batch + cache trong cùng một request) để fix N+1.
//
// Trong production Go ta KHÔNG tự viết engine. Thông thường:
//   - Schema-first: github.com/99designs/gqlgen  (viết SDL → codegen).
//   - Code-first:   github.com/graph-gophers/graphql-go.
//   - DataLoader:   github.com/graph-gophers/dataloader.
// Mục tiêu file này chỉ là làm lộ ra cơ chế bên trong, không phải bản thay thế.
//
// Chạy:  go run solutions.go

package main

import (
	"fmt"
	"sort"
	"strings"
	"sync"
)

// ===========================================================================
// 1. MODEL — dữ liệu domain (đóng vai "database trong RAM")
// ===========================================================================

type User struct {
	ID    string
	Name  string
	Email string
}

type Post struct {
	ID       string
	Title    string
	AuthorID string // foreign key → User.ID
}

// fakeDB mô phỏng database. Mỗi lần gọi truy vấn ta tăng queryCount lên để
// ĐẾM số round-trip xuống DB — đây là chỉ số quyết định N+1 có xảy ra hay không.
type fakeDB struct {
	users      map[string]*User
	postsByUID map[string][]*Post
	queryCount int // tổng số "query" đã chạy (đếm để demo N+1)
}

func newDB() *fakeDB {
	db := &fakeDB{
		users:      map[string]*User{},
		postsByUID: map[string][]*Post{},
	}
	// 3 user, mỗi user vài post — đủ nhỏ để in ra nhìn được, đủ để thấy N+1.
	seed := []struct {
		id, name, email string
		posts           []string
	}{
		{"1", "Alice", "alice@example.com", []string{"GraphQL 101", "Schema design"}},
		{"2", "Bob", "bob@example.com", []string{"REST vs GraphQL"}},
		{"3", "Carol", "carol@example.com", []string{"N+1 problem", "DataLoader", "Depth limit"}},
	}
	pid := 100
	for _, s := range seed {
		db.users[s.id] = &User{ID: s.id, Name: s.name, Email: s.email}
		for _, title := range s.posts {
			pid++
			p := &Post{ID: fmt.Sprintf("%d", pid), Title: title, AuthorID: s.id}
			db.postsByUID[s.id] = append(db.postsByUID[s.id], p)
		}
	}
	return db
}

// queryAllUsers — 1 query lấy tất cả user (đóng vai SELECT * FROM users).
func (db *fakeDB) queryAllUsers() []*User {
	db.queryCount++
	out := make([]*User, 0, len(db.users))
	for _, u := range db.users {
		out = append(out, u)
	}
	sort.Slice(out, func(i, j int) bool { return out[i].ID < out[j].ID })
	return out
}

// queryPostsByUserID — 1 query cho MỘT user (SELECT * FROM posts WHERE user_id = ?).
// Đây chính là nguồn gốc N+1: gọi 1 lần cho mỗi user.
func (db *fakeDB) queryPostsByUserID(uid string) []*Post {
	db.queryCount++
	return db.postsByUID[uid]
}

// queryUsersByIDs — 1 query batch (SELECT * FROM users WHERE id IN (...)).
// DataLoader sẽ gọi hàm này MỘT lần cho cả nhóm ID đã gom.
func (db *fakeDB) queryUsersByIDs(ids []string) map[string]*User {
	db.queryCount++
	out := make(map[string]*User, len(ids))
	for _, id := range ids {
		if u, ok := db.users[id]; ok {
			out[id] = u
		}
	}
	return out
}

// queryPostsByUserIDs — batch cho nhiều user một lần.
func (db *fakeDB) queryPostsByUserIDs(ids []string) map[string][]*Post {
	db.queryCount++
	out := make(map[string][]*Post, len(ids))
	for _, id := range ids {
		out[id] = db.postsByUID[id]
	}
	return out
}

// ===========================================================================
// 2. ENGINE TỐI GIẢN — Schema + Resolver + Resolver chain
// ===========================================================================
//
// Trong GraphQL thật, schema được mô tả bằng SDL (xem README mục 3). Ở đây ta
// rút gọn schema thành: mỗi (TypeName, FieldName) → một ResolverFn.
//
// ResolverFn nhận:
//   - parent: object cha trả về từ resolver phía trên (giống `obj` trong gqlgen).
//   - args:   argument GraphQL đã parse (vd id: "1").
//   - exec:   con trỏ tới executor để truyền context request (db, dataloader).
// và trả về (value, error). Đây chính là chữ ký mô tả ở README mục 7.2.

type ResolverFn func(parent any, args map[string]any, exec *Executor) (any, error)

// Schema = bảng dispatch field → resolver. resolvers["User"]["posts"] = fn.
type Schema struct {
	resolvers map[string]map[string]ResolverFn
}

func NewSchema() *Schema {
	return &Schema{resolvers: map[string]map[string]ResolverFn{}}
}

func (s *Schema) Field(typeName, field string, fn ResolverFn) {
	if s.resolvers[typeName] == nil {
		s.resolvers[typeName] = map[string]ResolverFn{}
	}
	s.resolvers[typeName][field] = fn
}

// resolver tra cứu resolver cho (typeName, field); fallback = default resolver
// (đọc field từ struct cha) — giống cách GraphQL engine xử lý field không custom.
func (s *Schema) resolver(typeName, field string) (ResolverFn, bool) {
	if m, ok := s.resolvers[typeName]; ok {
		if fn, ok := m[field]; ok {
			return fn, true
		}
	}
	return nil, false
}

// queryField = một node trong cây query của client.
// Ví dụ { users { name posts { title } } } → cây 3 cấp.
type queryField struct {
	name     string         // tên field (vd "posts")
	typeName string         // type mà field này trả về (vd "Post")
	args     map[string]any // argument (vd {"id": "1"})
	children []queryField   // sub-selection
}

// Executor giữ state cho MỘT request: db + loader (loader scope theo request).
type Executor struct {
	schema    *Schema
	db        *fakeDB
	userLoad  *DataLoader // dùng ở module DataLoader; nil khi chạy naive
	postLoad  *DataLoader
}

// execute duyệt cây query, gọi resolver từng field — đây là "resolver chain".
// parentType là type của object cha; sel là các field con cần resolve.
func (e *Executor) execute(parentType string, parent any, sel []queryField) (any, error) {
	result := map[string]any{}
	for _, f := range sel {
		fn, ok := e.schema.resolver(parentType, f.name)
		var val any
		var err error
		if ok {
			val, err = fn(parent, f.args, e) // custom resolver
		} else {
			val, err = defaultResolve(parent, f.name) // default: đọc field struct
		}
		if err != nil {
			return nil, err
		}
		// Nếu field có sub-selection → tiếp tục resolve xuống dưới.
		if len(f.children) > 0 {
			val, err = e.resolveChildren(f.typeName, val, f.children)
			if err != nil {
				return nil, err
			}
		}
		result[f.name] = val
	}
	return result, nil
}

// resolveChildren xử lý cả 2 trường hợp: value là list (vd []*Post) hay là 1 object.
func (e *Executor) resolveChildren(childType string, val any, children []queryField) (any, error) {
	switch v := val.(type) {
	case []*User:
		out := make([]any, 0, len(v))
		for _, item := range v {
			r, err := e.execute(childType, item, children)
			if err != nil {
				return nil, err
			}
			out = append(out, r)
		}
		return out, nil
	case []*Post:
		out := make([]any, 0, len(v))
		for _, item := range v {
			r, err := e.execute(childType, item, children)
			if err != nil {
				return nil, err
			}
			out = append(out, r)
		}
		return out, nil
	default:
		// object đơn (vd *User trả về từ Post.author)
		return e.execute(childType, val, children)
	}
}

// defaultResolve = lấy giá trị scalar từ struct cha theo tên field. GraphQL thật
// dùng reflection; ở đây ta switch tay cho gọn và dễ đọc.
func defaultResolve(parent any, field string) (any, error) {
	switch p := parent.(type) {
	case *User:
		switch field {
		case "id":
			return p.ID, nil
		case "name":
			return p.Name, nil
		case "email":
			return p.Email, nil
		}
	case *Post:
		switch field {
		case "id":
			return p.ID, nil
		case "title":
			return p.Title, nil
		}
	}
	return nil, fmt.Errorf("không có default resolver cho field %q trên %T", field, parent)
}

// ===========================================================================
// 3. DATALOADER — batch + cache trong một request (README mục 10)
// ===========================================================================
//
// Engine tối giản của ta thực thi tuần tự (không có event-loop tick như JS),
// nên thay vì gom theo thời gian, DataLoader ở đây gom theo "hai pha":
//
//   Pha 1 (collect):  resolver gọi Load(id) → chỉ GHI NHẬN id vào danh sách chờ,
//                     trả về placeholder; CHƯA chạm DB.
//   Pha 2 (dispatch): khi tầng trên cần giá trị thật, gọi Dispatch() → batch
//                     toàn bộ id còn pending bằng MỘT query (WHERE id IN (...)),
//                     đổ vào cache.
//   Đọc:              Get(id) lấy từ cache (đã có sau Dispatch).
//
// Cache map đảm bảo "không hỏi 2 lần cùng một id" trong cùng request.
// batchFn = hàm batch thật (gọi DB IN-query) — tương đương callback của
// dataloader.NewBatchedLoader trong thư viện graph-gophers/dataloader.

type DataLoader struct {
	mu       sync.Mutex
	pending  []string             // id đang chờ batch
	seen     map[string]bool      // tránh thêm trùng vào pending
	cache    map[string]any       // id → value đã load
	batchFn  func(ids []string) map[string]any
}

func NewDataLoader(batchFn func(ids []string) map[string]any) *DataLoader {
	return &DataLoader{
		seen:    map[string]bool{},
		cache:   map[string]any{},
		batchFn: batchFn,
	}
}

// Load: pha collect — ghi nhận id, KHÔNG chạm DB. Idempotent với id trùng.
func (l *DataLoader) Load(id string) {
	l.mu.Lock()
	defer l.mu.Unlock()
	if _, cached := l.cache[id]; cached {
		return // đã có trong cache, khỏi load lại
	}
	if l.seen[id] {
		return // đã pending
	}
	l.seen[id] = true
	l.pending = append(l.pending, id)
}

// Dispatch: pha batch — gom mọi id pending thành MỘT query, đổ vào cache.
func (l *DataLoader) Dispatch() {
	l.mu.Lock()
	ids := l.pending
	l.pending = nil
	l.mu.Unlock()
	if len(ids) == 0 {
		return
	}
	loaded := l.batchFn(ids) // ← đúng 1 DB query cho cả nhóm
	l.mu.Lock()
	for id, v := range loaded {
		l.cache[id] = v
	}
	l.mu.Unlock()
}

// Get: lấy giá trị đã load (sau Dispatch).
func (l *DataLoader) Get(id string) any {
	l.mu.Lock()
	defer l.mu.Unlock()
	return l.cache[id]
}

// ===========================================================================
// 4. SCHEMA SETUP — đăng ký resolver cho 2 chế độ: naive (N+1) và batched
// ===========================================================================

// buildNaiveSchema: resolver User.posts gọi DB cho TỪNG user → N+1.
func buildNaiveSchema() *Schema {
	s := NewSchema()
	s.Field("Query", "users", func(_ any, _ map[string]any, e *Executor) (any, error) {
		return e.db.queryAllUsers(), nil // 1 query
	})
	s.Field("User", "posts", func(parent any, _ map[string]any, e *Executor) (any, error) {
		u := parent.(*User)
		return e.db.queryPostsByUserID(u.ID), nil // gọi 1 lần / user → N query
	})
	return s
}

// ===========================================================================
// 5. DEMO 1 — Resolver chain cơ bản (1 query lồng nhau, shape khớp query)
// ===========================================================================

func demoResolverChain() {
	fmt.Println("=== DEMO 1: Resolver chain (GraphQL 1 query, shape khớp) ===")
	db := newDB()
	schema := buildNaiveSchema()
	exec := &Executor{schema: schema, db: db}

	// Tương đương query GraphQL:
	//   query { users { name posts { title } } }
	query := []queryField{
		{name: "users", typeName: "User", children: []queryField{
			{name: "name"},
			{name: "posts", typeName: "Post", children: []queryField{
				{name: "title"},
			}},
		}},
	}
	res, err := exec.execute("Query", nil, query)
	if err != nil {
		fmt.Println("lỗi:", err)
		return
	}
	printResult(res)
	fmt.Printf(">> Một GraphQL request → server resolve nhiều field, trả JSON lồng đúng shape.\n\n")
}

// ===========================================================================
// 6. DEMO 2 — N+1 problem và cách fix bằng DataLoader (README mục 9-10)
// ===========================================================================

func demoNPlusOne() {
	fmt.Println("=== DEMO 2: N+1 problem (naive) ===")
	db := newDB()
	exec := &Executor{schema: buildNaiveSchema(), db: db}

	query := []queryField{
		{name: "users", typeName: "User", children: []queryField{
			{name: "posts", typeName: "Post", children: []queryField{{name: "title"}}},
		}},
	}
	if _, err := exec.execute("Query", nil, query); err != nil {
		fmt.Println("lỗi:", err)
		return
	}
	n := len(db.users)
	fmt.Printf("Số user = %d\n", n)
	fmt.Printf("Số DB query = %d  (1 query users + %d query posts = N+1)\n\n", db.queryCount, n)
}

// demoDataLoaderFix: chạy lại cùng query nhưng resolver posts dùng DataLoader.
// Vì engine tối giản chạy tuần tự, ta áp dụng pattern 2 pha thủ công:
//   Pha 1: lấy danh sách user, gọi loader.Load cho mọi user ID.
//   Pha 2: loader.Dispatch() → 1 batch query duy nhất cho posts.
func demoDataLoaderFix() {
	fmt.Println("=== DEMO 2b: Fix N+1 bằng DataLoader (batch + cache) ===")
	db := newDB()

	postLoader := NewDataLoader(func(ids []string) map[string]any {
		// 1 batch query: WHERE user_id IN (ids)
		byUID := db.queryPostsByUserIDs(ids)
		out := make(map[string]any, len(byUID))
		for uid, posts := range byUID {
			out[uid] = posts
		}
		return out
	})

	schema := NewSchema()
	schema.Field("Query", "users", func(_ any, _ map[string]any, e *Executor) (any, error) {
		return e.db.queryAllUsers(), nil
	})
	schema.Field("User", "posts", func(parent any, _ map[string]any, e *Executor) (any, error) {
		// Resolver KHÔNG chạm DB; chỉ đọc từ cache loader đã batch sẵn.
		u := parent.(*User)
		return e.postLoad.Get(u.ID), nil
	})

	exec := &Executor{schema: schema, db: db, postLoad: postLoader}

	// Pha 1 — collect: lấy users + ghi nhận id vào loader.
	users := db.queryAllUsers()
	for _, u := range users {
		postLoader.Load(u.ID)
	}
	// Pha 2 — dispatch: gom tất cả thành 1 query.
	postLoader.Dispatch()

	// Bây giờ resolver chỉ đọc cache, không sinh thêm DB query nào.
	query := []queryField{
		{name: "users", typeName: "User", children: []queryField{
			{name: "posts", typeName: "Post", children: []queryField{{name: "title"}}},
		}},
	}
	if _, err := exec.execute("Query", nil, query); err != nil {
		fmt.Println("lỗi:", err)
		return
	}
	fmt.Printf("Số DB query = %d  (1 query users + 1 batch query posts = 2)\n", db.queryCount)
	fmt.Printf(">> Từ N+1 (%d) xuống còn 2. Trong gqlgen ta gắn loader vào context per-request.\n\n", len(users)+1)
}

// demoLoaderCache: chứng minh cache — Load cùng id 2 lần chỉ tốn 1 query.
func demoLoaderCache() {
	fmt.Println("=== DEMO 2c: DataLoader cache (không hỏi 2 lần cùng 1 id) ===")
	db := newDB()
	userLoader := NewDataLoader(func(ids []string) map[string]any {
		got := db.queryUsersByIDs(ids)
		out := make(map[string]any, len(got))
		for id, u := range got {
			out[id] = u
		}
		return out
	})
	// Cùng request, nhiều resolver cùng cần user "1" và "2".
	userLoader.Load("1")
	userLoader.Load("2")
	userLoader.Load("1") // trùng → bị bỏ qua, không thêm vào batch
	userLoader.Dispatch()
	u1 := userLoader.Get("1").(*User)
	fmt.Printf("Load 1,2,1 (trùng) → DB query = %d (chỉ 1 batch), Get(\"1\") = %s\n\n",
		db.queryCount, u1.Name)
}

// ===========================================================================
// 7. DEMO 3 — Query depth limit (README mục 13.1)
// ===========================================================================
//
// computeDepth đệ quy trên cây query (giống pseudo-code trong README):
//   - field không có con (scalar) → depth 1.
//   - field có con → 1 + max(depth của các con).

func computeDepth(fields []queryField) int {
	max := 0
	for _, f := range fields {
		d := 1
		if len(f.children) > 0 {
			d = 1 + computeDepth(f.children)
		}
		if d > max {
			max = d
		}
	}
	return max
}

func demoDepthLimit() {
	fmt.Println("=== DEMO 3: Query depth limit (chống DoS) ===")
	const limit = 5

	// Query nông: { users { posts { title } } } → depth 3.
	shallow := []queryField{
		{name: "users", children: []queryField{
			{name: "posts", children: []queryField{{name: "title"}}},
		}},
	}
	// Query sâu kiểu friends-of-friends → depth lớn.
	deep := []queryField{
		{name: "user", children: []queryField{
			{name: "friends", children: []queryField{
				{name: "friends", children: []queryField{
					{name: "friends", children: []queryField{
						{name: "friends", children: []queryField{
							{name: "name"},
						}},
					}},
				}},
			}},
		}},
	}

	for _, tc := range []struct {
		label string
		q     []queryField
	}{
		{"shallow { users { posts { title } } }", shallow},
		{"deep   user>friends×4>name", deep},
	} {
		d := computeDepth(tc.q)
		verdict := "ACCEPT"
		if d > limit {
			verdict = "REJECT (vượt limit)"
		}
		fmt.Printf("depth = %d  (limit %d) → %-20s | %s\n", d, limit, verdict, tc.label)
	}
	fmt.Println()
}

// ===========================================================================
// Helper in kết quả gọn gàng
// ===========================================================================

func printResult(res any) {
	m := res.(map[string]any)
	users := m["users"].([]any)
	for _, uAny := range users {
		u := uAny.(map[string]any)
		posts := u["posts"].([]any)
		titles := make([]string, 0, len(posts))
		for _, pAny := range posts {
			titles = append(titles, pAny.(map[string]any)["title"].(string))
		}
		fmt.Printf("  %-6s → [%s]\n", u["name"], strings.Join(titles, ", "))
	}
}

func main() {
	demoResolverChain()
	demoNPlusOne()
	demoDataLoaderFix()
	demoLoaderCache()
	demoDepthLimit()
}
