// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: Programming/lesson-50-graphql/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 50 — GraphQL

> **Tier 4 — Web Backend**. Một query language + runtime cho API, cho phép **client tự chỉ định data cần** thay vì để server cố định shape. Sinh ra ở Facebook (2012, open-source 2015) để giải quyết bài toán newsfeed mobile cần data nested mà bandwidth lại hạn chế.

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Hiểu GraphQL là **query language + runtime**, không phải database, không phải framework.
- Phân biệt rạch ròi **GraphQL vs REST**: shape, endpoint, over/under-fetching, caching.
- Viết được \`schema.graphqls\` với các construct cơ bản: \`type\`, \`Query\`, \`Mutation\`, \`Subscription\`, scalar, list, non-null \`!\`.
- Hiểu **resolver** là gì và resolver chain hoạt động ra sao.
- Nhận diện và sửa **N+1 problem** bằng **DataLoader pattern**.
- Cài bảo mật cơ bản: **query depth limit**, **complexity scoring**, **rate limit by complexity**.
- Biết **khi nào nên / không nên dùng GraphQL** (không phải mọi API đều hợp).
- Thực hành với thư viện \`gqlgen\` (schema-first) và \`graphql-go/graphql\` (code-first).

## Kiến thức tiền đề

- [Lesson 42 — HTTP Net Deep](../lesson-42-http-net-deep/) — biết handler, request, response.
- [Lesson 43 — REST API Design](../lesson-43-rest-api-design/) — biết REST để so sánh.
- [Lesson 23 — JSON Encoding](../lesson-23-json-encoding/) — GraphQL response là JSON.
- [Lesson 27 — Goroutines & Channels](../lesson-27-goroutines-channels/) — DataLoader cần batch async.
- [Lesson 13 — Maps](../lesson-13-maps/) — cache theo ID dùng map.

---

## 1. GraphQL là gì

> 💡 **Trực giác — quầy ăn buffet vs set menu**
>
> REST giống **set menu**: nhà hàng đã chọn sẵn 5 món cho bạn, dù bạn chỉ ăn 2 món vẫn phải trả tiền cả 5 (over-fetching), hoặc thiếu món phải gọi thêm (under-fetching = N+1 request).
>
> GraphQL giống **buffet**: bạn cầm khay đi quanh, **chỉ lấy đúng những món muốn ăn**, một lần duyệt là xong. Server có sẵn mọi món, client tự chọn shape.

### 1.1 Định nghĩa chính thức

**GraphQL** là một **query language cho API** + một **runtime** để thực thi query đó trên server.

Cụ thể là **3 thứ** đi kèm nhau:

1. **Type system** — server khai báo trước **schema** (các type, field, relation).
2. **Query language** — client gửi **query string** mô tả shape của data muốn nhận.
3. **Execution engine** — server **resolve** từng field bằng cách gọi resolver function tương ứng, trả về JSON khớp đúng shape.

> ❓ **GraphQL có phải database không?**
>
> **Không.** GraphQL chỉ là tầng API. Phía sau resolver có thể là PostgreSQL, MongoDB, REST API khác, gRPC service, file hệ thống, gọi ML model — gì cũng được. GraphQL không quan tâm.

> ❓ **GraphQL có thay thế HTTP không?**
>
> **Không.** GraphQL vẫn chạy trên HTTP (thường là \`POST /graphql\` với body chứa query). Subscription mới dùng WebSocket. GraphQL không phải transport protocol, nó nằm **trên** HTTP/WS.

### 1.2 Cấu trúc request/response

**Request** — client gửi 1 query string:
\`\`\`graphql
query {
  user(id: "42") {
    name
    email
  }
}
\`\`\`

**HTTP transport** thực tế:
\`\`\`http
POST /graphql HTTP/1.1
Content-Type: application/json

{"query":"query { user(id: \\"42\\") { name email } }"}
\`\`\`

**Response** — JSON khớp shape query:
\`\`\`json
{
  "data": {
    "user": {
      "name": "Alice",
      "email": "alice@example.com"
    }
  }
}
\`\`\`

> 🔁 **Dừng kiểm tra**: Nếu client thêm field \`posts { title }\` vào query, server phản hồi thế nào?
>
> <details><summary>Đáp án</summary>
>
> Server thêm vào \`data.user\` field \`posts\` là mảng object \`{ title: "..." }\`. Shape response luôn **khớp 1-1 với shape query** — đây là tính chất đặc trưng của GraphQL.
> </details>

---

## 2. GraphQL vs REST — so sánh có số

### 2.1 Bài toán ví dụ

Màn hình mobile cần hiển thị: **tên user, email, 5 post mới nhất của user, mỗi post có title + 3 comment đầu**.

### 2.2 Với REST (cổ điển)

\`\`\`
GET /users/42                       → {id, name, email, ...}
GET /users/42/posts?limit=5         → [{id, title, body, ...}, ...]
GET /posts/101/comments?limit=3     → [{id, text, ...}, ...]
GET /posts/102/comments?limit=3     → ...
GET /posts/103/comments?limit=3     → ...
GET /posts/104/comments?limit=3     → ...
GET /posts/105/comments?limit=3     → ...
\`\`\`

**Tổng cộng: 7 round-trip HTTP.** Trên 3G/4G mobile, mỗi round-trip ~100-300ms → tổng latency 700ms-2s.

Ngoài ra **over-fetching**: API trả về \`body\` đầy đủ của post, nhưng UI chỉ cần \`title\`. Lãng phí bandwidth.

### 2.3 Với GraphQL

\`\`\`graphql
query {
  user(id: "42") {
    name
    email
    posts(limit: 5) {
      title
      comments(limit: 3) { text }
    }
  }
}
\`\`\`

**1 round-trip duy nhất.** Server trả về đúng \`name + email + 5 × (title + 3 × text)\` — không thừa byte nào.

### 2.4 Bảng so sánh

| Khía cạnh | REST | GraphQL |
|-----------|------|---------|
| **Endpoint** | Nhiều (\`/users\`, \`/posts\`, \`/comments\`, ...) | **1** (\`/graphql\`) |
| **Method** | GET/POST/PUT/DELETE | Thường chỉ POST (hoặc GET với query param) |
| **Shape data** | Server quyết | **Client quyết** |
| **Over-fetching** | Hay xảy ra | Không (chỉ lấy field cần) |
| **Under-fetching** | Hay xảy ra → N round-trip | Không (lấy nested 1 lần) |
| **Versioning** | \`/v1\`, \`/v2\` | Thêm field mới, deprecate field cũ — không cần version |
| **Caching HTTP** | **Tự nhiên** (GET + URL = cache key) | Khó (POST + body khác nhau) |
| **File upload** | Dễ (multipart) | Phức tạp (cần spec multipart riêng) |
| **Error handling** | HTTP status code | Luôn 200 OK, error trong \`errors\` field của body |
| **Learning curve** | Thấp (ai cũng biết HTTP) | Trung bình (schema + resolver + N+1) |
| **Tooling** | curl, Postman | GraphiQL, Apollo, Insomnia, Playground |

> ⚠ **Lỗi thường gặp: "GraphQL > REST always"**
>
> Sai. GraphQL **không thay thế REST trong mọi tình huống**. Public API (như GitHub, Twitter, Stripe) vẫn chủ yếu dùng REST vì caching dễ và developer quen. Xem mục 11-12 để biết khi nào chọn cái nào.

### 2.5 Walk-through số cụ thể

Giả sử có 1 user với 5 post, mỗi post 3 comment. Mỗi response object ~200 byte, mỗi round-trip overhead ~150ms.

| Cách | Số request | Bytes về (ước lượng) | Latency tổng (4G) |
|------|-----------:|---------------------:|------------------:|
| REST naive (over-fetch full body) | 7 | ~10 KB | ~1050 ms |
| REST + sparse fieldset (\`?fields=\`) | 7 | ~3 KB | ~1050 ms |
| GraphQL | **1** | **~2 KB** | **~150 ms** |

GraphQL thắng rõ về **latency**, thắng nhẹ về **bytes** (vì có overhead schema query trong body).

> 📝 **Tóm tắt mục 2**:
> - REST: nhiều endpoint, server quyết shape, dễ cache HTTP, hay over/under-fetch.
> - GraphQL: 1 endpoint, client quyết shape, không over-fetch, khó cache.
> - Trên mobile/3G, GraphQL giảm latency rất nhiều vì gom 1 round-trip.

---

## 3. Schema Definition Language (SDL)

GraphQL có một mini-language để **khai báo schema** gọi là SDL. Đây là contract giữa server và client.

### 3.1 Type cơ bản

\`\`\`graphql
type User {
  id: ID!
  name: String!
  email: String!
  age: Int
  posts: [Post!]!
}

type Post {
  id: ID!
  title: String!
  body: String!
  author: User!
  comments: [Comment!]!
}

type Comment {
  id: ID!
  text: String!
  post: Post!
  author: User!
}
\`\`\`

### 3.2 Ý nghĩa ký hiệu

| Ký hiệu | Ý nghĩa | Ví dụ |
|---------|---------|-------|
| \`String\` | Chuỗi UTF-8 | \`"Alice"\` |
| \`Int\` | Số nguyên 32-bit | \`42\` |
| \`Float\` | Số thực 64-bit | \`3.14\` |
| \`Boolean\` | true/false | \`true\` |
| \`ID\` | Định danh — serialize thành string nhưng ý nghĩa là identifier | \`"42"\` |
| \`!\` (sau type) | Non-null, **bắt buộc có** | \`name: String!\` |
| \`[T]\` | List của T (có thể null, phần tử có thể null) | \`[Post]\` |
| \`[T!]\` | List có thể null, phần tử KHÔNG null | \`[Post!]\` |
| \`[T!]!\` | List KHÔNG null, phần tử KHÔNG null | \`posts: [Post!]!\` |

> ❓ **Khác nhau giữa \`[Post]\`, \`[Post!]\`, \`[Post!]!\`?**
>
> - \`[Post]\` — field có thể null; nếu có, là list; phần tử trong list có thể null.
> - \`[Post!]\` — field có thể null; nếu có, mọi phần tử non-null.
> - \`[Post!]!\` — field bắt buộc có list (ít nhất \`[]\`); mọi phần tử non-null.
>
> **Best practice**: với list thường dùng \`[T!]!\` để client không phải check null 2 cấp.

### 3.3 Root operation type

GraphQL có **3 root operation**:

\`\`\`graphql
type Query {
  user(id: ID!): User
  users: [User!]!
  post(id: ID!): Post
}

type Mutation {
  createUser(name: String!, email: String!): User!
  updateUser(id: ID!, name: String): User!
  deletePost(id: ID!): Boolean!
}

type Subscription {
  postAdded: Post!
  commentAdded(postId: ID!): Comment!
}

schema {
  query: Query
  mutation: Mutation
  subscription: Subscription
}
\`\`\`

- **Query** — đọc dữ liệu (idempotent, có thể parallelize các field).
- **Mutation** — ghi dữ liệu (chạy **tuần tự** theo thứ tự field trong query, để side-effect không đua nhau).
- **Subscription** — push real-time (qua WebSocket).

### 3.4 Input type

Không thể truyền \`type\` thường làm argument; phải dùng \`input\`:

\`\`\`graphql
input CreatePostInput {
  title: String!
  body: String!
  authorId: ID!
}

type Mutation {
  createPost(input: CreatePostInput!): Post!
}
\`\`\`

### 3.5 Enum

\`\`\`graphql
enum Role {
  ADMIN
  EDITOR
  VIEWER
}

type User {
  role: Role!
}
\`\`\`

### 3.6 Interface và Union

\`\`\`graphql
interface Node {
  id: ID!
}

type User implements Node { id: ID!, name: String! }
type Post implements Node { id: ID!, title: String! }

union SearchResult = User | Post

type Query {
  node(id: ID!): Node
  search(text: String!): [SearchResult!]!
}
\`\`\`

> 📝 **Tóm tắt mục 3**:
> - SDL có scalar (\`String\`, \`Int\`, ...), \`!\` cho non-null, \`[]\` cho list.
> - 3 root: \`Query\`, \`Mutation\`, \`Subscription\`.
> - \`input\` cho argument phức tạp; \`enum\`, \`interface\`, \`union\` cho polymorphism.

---

## 4. Query — đọc dữ liệu

### 4.1 Query cơ bản

\`\`\`graphql
query {
  user(id: "42") {
    name
    email
    posts {
      title
    }
  }
}
\`\`\`

### 4.2 Đặt tên query (named query)

\`\`\`graphql
query GetUserProfile {
  user(id: "42") {
    name
  }
}
\`\`\`

Tốt cho logging / observability — server biết query nào đến từ đâu.

### 4.3 Variable

Không nên hard-code \`id: "42"\` trong query string. Dùng variable:

\`\`\`graphql
query GetUser($id: ID!) {
  user(id: $id) {
    name
    email
  }
}
\`\`\`

\`\`\`json
{
  "query": "query GetUser($id: ID!) { user(id: $id) { name email } }",
  "variables": { "id": "42" }
}
\`\`\`

Lợi ích: query string là **constant** → server có thể cache parsed AST; variables tách riêng → tránh inject.

### 4.4 Alias

Hỏi cùng field 2 lần với args khác nhau:

\`\`\`graphql
query {
  alice: user(id: "42") { name }
  bob: user(id: "43") { name }
}
\`\`\`

Response:
\`\`\`json
{ "data": { "alice": { "name": "Alice" }, "bob": { "name": "Bob" } } }
\`\`\`

### 4.5 Fragment — DRY

\`\`\`graphql
fragment UserCore on User {
  id
  name
  email
}

query {
  user(id: "42") { ...UserCore }
  users { ...UserCore }
}
\`\`\`

### 4.6 Directive

\`\`\`graphql
query ($withPosts: Boolean!) {
  user(id: "42") {
    name
    posts @include(if: $withPosts) {
      title
    }
  }
}
\`\`\`

\`@include(if:)\` và \`@skip(if:)\` là 2 directive built-in.

> 📝 **Tóm tắt mục 4**:
> - Query có shape lồng nhau, named, có variable, alias, fragment, directive.
> - Variable + named query là pattern production chuẩn.

---

## 5. Mutation — ghi dữ liệu

\`\`\`graphql
mutation CreateUser($input: CreateUserInput!) {
  createUser(input: $input) {
    id
    name
    email
  }
}
\`\`\`

Variables:
\`\`\`json
{ "input": { "name": "Eve", "email": "eve@example.com" } }
\`\`\`

**Khác biệt quan trọng với query:**

- Multiple field trong **query** chạy **song song**; trong **mutation** chạy **tuần tự** theo thứ tự khai báo:

\`\`\`graphql
mutation {
  a: createUser(...) { id }   # chạy xong
  b: createUser(...) { id }   # rồi mới chạy
}
\`\`\`

Lý do: mutation có side-effect, nếu chạy song song có thể đua nhau.

> ⚠ **Lỗi thường gặp: dùng GET cho mutation**
>
> GraphQL spec yêu cầu mutation phải dùng POST (vì có side-effect). Dùng GET có thể bị browser/proxy cache → mutation chạy 1 lần, các lần sau trả cached → bug rất khó tìm.

---

## 6. Subscription — real-time

\`\`\`graphql
subscription OnCommentAdded($postId: ID!) {
  commentAdded(postId: $postId) {
    id
    text
    author { name }
  }
}
\`\`\`

Chạy qua **WebSocket** (protocol \`graphql-ws\` hoặc \`graphql-transport-ws\`). Server giữ connection open, push event khi có comment mới.

> ❓ **Khi nào dùng Subscription?**
>
> Khi cần push real-time: chat, live feed, stock price, collaborative editor. Đơn giản hơn: nếu chỉ poll mỗi vài giây thì dùng \`setInterval\` + query thường vẫn ổn.

---

## 7. Resolver — trái tim của GraphQL

> 💡 **Trực giác**: Mỗi field trong schema gắn với **1 function** trên server. GraphQL engine **gọi function đó** để lấy value cho field.

### 7.1 Resolver chain

Với query:
\`\`\`graphql
query { user(id: "42") { name posts { title } } }
\`\`\`

Engine gọi:

1. \`Query.user(id: "42")\` → trả về object User → ví dụ \`{id:"42", name:"Alice"}\`.
2. \`User.name(parent: aliceObj)\` → trả về \`"Alice"\` (default: lấy \`parent.name\`).
3. \`User.posts(parent: aliceObj)\` → trả về \`[Post{id:101}, Post{id:102}, ...]\`.
4. Với **MỖI** post: \`Post.title(parent: postObj)\` → trả về \`postObj.title\`.

Mỗi field một resolver. Field nào không có custom resolver thì engine **dùng default resolver** = \`return parent[fieldName]\`.

### 7.2 Chữ ký resolver (Go pseudo)

\`\`\`go
type Resolver func(ctx context.Context, parent interface{}, args map[string]interface{}) (interface{}, error)
\`\`\`

- \`ctx\` — request-scoped context (user auth, dataloader cache, ...).
- \`parent\` — object cha từ resolver phía trên.
- \`args\` — argument GraphQL parse từ query.

### 7.3 Resolver có thể async / song song

Trong query (không phải mutation), engine **chạy resolver của các sibling field song song**. Vd:

\`\`\`graphql
query {
  user(id: "42") { name }    # resolver chạy
  post(id: "101") { title }  # song song
}
\`\`\`

→ Cả 2 resolver chạy concurrent, response gộp lại.

### 7.4 Resolver phải biết về context

\`\`\`go
func (r *userResolver) Posts(ctx context.Context, obj *User) ([]*Post, error) {
    loader := ctx.Value("postLoader").(*dataloader.Loader)
    // batch lookup posts của user obj.ID
    return loader.LoadMany(ctx, obj.PostIDs)
}
\`\`\`

Sẽ rõ hơn khi học DataLoader ở mục 10.

---

## 8. \`gqlgen\` — schema-first cho Go

[\`gqlgen\`](https://gqlgen.com/) là thư viện phổ biến nhất cho GraphQL Go (do 99designs phát triển). Pattern: **schema-first + code-gen**.

### 8.1 Workflow

\`\`\`
schema.graphqls  ──gqlgen generate──▶ generated.go (types, dispatcher)
                                       │
                                       └── resolver.go (stub bạn fill code thật)
\`\`\`

### 8.2 Cài đặt

\`\`\`bash
go install github.com/99designs/gqlgen@latest
cd your-project
gqlgen init
\`\`\`

Sinh ra:
- \`gqlgen.yml\` — config
- \`graph/schema.graphqls\` — schema bạn viết
- \`graph/generated.go\` — code generated (đừng sửa tay)
- \`graph/resolver.go\` — root resolver struct
- \`graph/schema.resolvers.go\` — stub resolver, bạn fill code

### 8.3 Ví dụ resolver implementation

\`\`\`go
// graph/schema.resolvers.go
func (r *queryResolver) User(ctx context.Context, id string) (*model.User, error) {
    return r.UserService.GetByID(ctx, id)
}

func (r *userResolver) Posts(ctx context.Context, obj *model.User) ([]*model.Post, error) {
    return r.PostService.GetByUserID(ctx, obj.ID)  // ← nguy cơ N+1!
}
\`\`\`

### 8.4 Run server

\`\`\`go
func main() {
    srv := handler.NewDefaultServer(graph.NewExecutableSchema(graph.Config{Resolvers: &graph.Resolver{}}))
    http.Handle("/", playground.Handler("GraphQL playground", "/query"))
    http.Handle("/query", srv)
    http.ListenAndServe(":8080", nil)
}
\`\`\`

Mở \`http://localhost:8080/\` → GraphiQL playground để test query.

> ❓ **Schema-first vs code-first?**
>
> - **Schema-first** (gqlgen): viết SDL trước → generate code. Tốt khi nhiều người làm chung, schema là source of truth.
> - **Code-first** (\`graphql-go/graphql\`): viết Go code define schema. Tốt khi schema generate động từ struct.
>
> Production Go thường chọn \`gqlgen\` vì type-safe và schema dễ review.

---

## 9. N+1 problem — kẻ giết hiệu năng

### 9.1 Hiện tượng

Query:
\`\`\`graphql
query {
  users {              # 1 query: SELECT * FROM users → N user
    name
    posts {            # với MỖI user: SELECT * FROM posts WHERE user_id = ?
      title
    }
  }
}
\`\`\`

Resolver naive:
\`\`\`go
func (r *queryResolver) Users(ctx context.Context) ([]*User, error) {
    return r.db.QueryUsers(ctx)                        // 1 query
}
func (r *userResolver) Posts(ctx context.Context, u *User) ([]*Post, error) {
    return r.db.QueryPostsByUserID(ctx, u.ID)          // N query (1 cho mỗi user)
}
\`\`\`

→ Tổng cộng **1 + N** query DB cho 1 GraphQL request. Đây là **N+1 problem**.

### 9.2 Walk-through số

Có 100 user, mỗi user 5 post.

| Cách | Số query DB | Thời gian (10ms/query) |
|------|------------:|-----------------------:|
| N+1 naive | 1 + 100 = **101** | **1010 ms** |
| Batch (\`WHERE user_id IN (...)\`) | 1 + 1 = **2** | **20 ms** |

→ **50x chậm hơn**. Đây là pitfall **#1** của GraphQL.

### 9.3 Vì sao N+1 hay xảy ra trong GraphQL hơn REST?

REST endpoint \`/users-with-posts\` thường được viết **1 lần** với JOIN/IN query → người dev nhìn thấy SQL và tự optimize.

GraphQL resolver **rời rạc** — mỗi field một function. Resolver \`User.posts\` không biết nó đang được gọi 100 lần liên tiếp. Cần một cơ chế **batching automatically** → DataLoader.

> 📝 **Tóm tắt mục 9**:
> - N+1 = 1 query parent + N query children (1 per parent).
> - GraphQL phơi bày vấn đề này rõ hơn REST.
> - Cần DataLoader pattern để fix.

---

## 10. DataLoader pattern

> 💡 **Trực giác**: Thay vì mỗi resolver gọi DB ngay, hãy **gom các ID lại trong cùng 1 tick** rồi **batch query 1 lần**, đồng thời **cache theo ID** để không hỏi 2 lần cùng 1 thứ trong cùng request.

### 10.1 Cơ chế 3 bước

\`\`\`
Resolver gọi:  loader.Load(ctx, "userId-1")  ─┐
                loader.Load(ctx, "userId-2")  ├─► collect 1 tick
                loader.Load(ctx, "userId-3")  ─┘
                                              ▼
                Batch fn: fetchUsers([1,2,3])  → DB: SELECT * WHERE id IN (1,2,3)
                                              ▼
                Trả về 3 user theo đúng thứ tự
                                              ▼
                Cache trong loader cho request hiện tại
\`\`\`

### 10.2 Implementation skeleton (Go pseudo)

\`\`\`go
type UserLoader struct {
    fetch     func(ids []string) ([]*User, []error)
    batch     []string        // ID đang chờ
    promises  []chan result   // promise tương ứng
    mu        sync.Mutex
    cache     map[string]*User
    waitTime  time.Duration   // gom ID trong waitTime (vd 1ms)
}

func (l *UserLoader) Load(ctx context.Context, id string) (*User, error) {
    l.mu.Lock()
    if u, ok := l.cache[id]; ok {
        l.mu.Unlock()
        return u, nil
    }
    ch := make(chan result, 1)
    l.batch = append(l.batch, id)
    l.promises = append(l.promises, ch)
    if len(l.batch) == 1 {
        // start timer để dispatch sau waitTime
        time.AfterFunc(l.waitTime, l.dispatch)
    }
    l.mu.Unlock()
    res := <-ch
    return res.user, res.err
}

func (l *UserLoader) dispatch() {
    l.mu.Lock()
    ids := l.batch
    promises := l.promises
    l.batch = nil
    l.promises = nil
    l.mu.Unlock()

    users, errs := l.fetch(ids)  // 1 query: WHERE id IN (...)
    for i := range ids {
        l.cache[ids[i]] = users[i]
        promises[i] <- result{user: users[i], err: errs[i]}
    }
}
\`\`\`

### 10.3 Library production: \`graph-gophers/dataloader\`

\`\`\`go
import "github.com/graph-gophers/dataloader"

loader := dataloader.NewBatchedLoader(func(ctx context.Context, keys dataloader.Keys) []*dataloader.Result {
    ids := make([]string, len(keys))
    for i, k := range keys { ids[i] = k.String() }

    users, err := db.QueryUsersByIDs(ctx, ids)   // batch 1 query
    out := make([]*dataloader.Result, len(keys))
    for i, u := range users {
        out[i] = &dataloader.Result{Data: u, Error: err}
    }
    return out
}, dataloader.WithWait(2*time.Millisecond))

// Trong resolver:
func (r *userResolver) Author(ctx context.Context, obj *Post) (*User, error) {
    thunk := loader.Load(ctx, dataloader.StringKey(obj.AuthorID))
    res, err := thunk()
    return res.(*User), err
}
\`\`\`

### 10.4 DataLoader phải scope theo REQUEST

> ⚠ **Lỗi thường gặp: DataLoader global**
>
> DataLoader cache theo request — nếu dùng global instance, user A có thể đọc data của user B (cache poisoning). Pattern đúng: **tạo loader mới mỗi request**, gắn vào \`context.Context\`:
>
> \`\`\`go
> func loaderMiddleware(next http.Handler) http.Handler {
>     return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
>         ctx := context.WithValue(r.Context(), loadersKey, NewLoaders(db))
>         next.ServeHTTP(w, r.WithContext(ctx))
>     })
> }
> \`\`\`

> 📝 **Tóm tắt mục 10**:
> - DataLoader = batch + cache trong 1 tick (1-10ms thường đủ).
> - Library Go: \`graph-gophers/dataloader\`.
> - **Tạo mới mỗi request**, không dùng global.

---

## 11. Khi nào GraphQL > REST

GraphQL **vượt trội** trong các tình huống:

1. **Mobile / 3G-4G** — bandwidth quan trọng, screen nhỏ chỉ cần 30% field của full resource → over-fetch là đau. Mobile cũng có latency cao → gom round-trip thành 1 quan trọng.
2. **Complex nested data** — màn hình hiển thị object 3-4 cấp lồng nhau. REST cần 4 endpoint hoặc 1 endpoint custom; GraphQL gom 1 query.
3. **Frontend đổi nhanh, backend không kịp** — team frontend muốn thử shape mới mỗi sprint; với GraphQL, schema đã có field thì FE tự lấy, không cần API mới.
4. **Multiple consumer** — cùng 1 backend phục vụ web (cần full data) + mobile (cần ít) + IoT (cần rất ít) + admin dashboard (cần khác). REST phải mở nhiều endpoint hoặc nhiều version; GraphQL: mỗi consumer query đúng shape của mình.
5. **BFF (Backend-for-Frontend) pattern** — GraphQL gateway gom data từ nhiều microservice rồi expose 1 endpoint duy nhất cho client.

Case study thật:
- **Facebook**: tạo ra GraphQL vì newsfeed mobile.
- **GitHub v4 API**: GraphQL (v3 vẫn là REST cho backward compat).
- **Shopify Storefront API**: GraphQL cho merchant tự custom storefront.

---

## 12. Khi nào REST > GraphQL

REST **đơn giản hơn** và **vẫn ưu việt** khi:

1. **Simple CRUD** — bảng \`posts\` với create/read/update/delete cơ bản. GraphQL overkill, REST 4 endpoint là xong.
2. **File upload** — \`multipart/form-data\` là native của HTTP. GraphQL có spec \`graphql-multipart-request\` nhưng phức tạp, lib chưa universal.
3. **Heavy caching** — REST \`GET /post/42\` + URL → HTTP cache (CDN, browser, proxy) tự nhiên. GraphQL POST \`/graphql\` body khác nhau → khó cache; phải dùng persisted query + custom cache key.
4. **Public API** — REST quen thuộc, dev nào cũng biết curl. GraphQL còn phải học. Github GraphQL v4 chỉ ~10% traffic so với REST v3.
5. **Hypermedia / HATEOAS** — REST có Link header, \`_links\` để client tự discover. GraphQL không support natively (phải tự thiết kế).
6. **Streaming binary** — REST với \`Transfer-Encoding: chunked\` hoặc range request rất ổn. GraphQL không có concept stream binary (response luôn là JSON).

> ❓ **Có hybrid không?**
>
> Có. Nhiều công ty làm **REST cho public API + GraphQL cho internal/mobile app**. Hoặc REST cho upload/download + GraphQL cho mọi thứ khác. Không phải zero-sum.

---

## 13. Security concerns

GraphQL **flexible quá mức** → attacker có thể abuse query để DoS.

### 13.1 Query depth limit

Attack:
\`\`\`graphql
query {
  user(id:"1") { friends { friends { friends { friends { friends { name } } } } } }
}
\`\`\`

Nếu schema có \`User.friends: [User!]!\`, query này có thể đệ quy không giới hạn → exponential blowup.

**Fix**: tính depth của query AST; reject nếu > N (vd 10).

\`\`\`go
// pseudo
func computeDepth(node QueryNode) int {
    if !node.HasSelection() { return 1 }
    maxChild := 0
    for _, child := range node.Selections() {
        if d := computeDepth(child); d > maxChild { maxChild = d }
    }
    return 1 + maxChild
}

if computeDepth(query) > 10 { reject() }
\`\`\`

### 13.2 Query complexity scoring

Depth chưa đủ — query phẳng nhưng nhiều list rộng cũng đau:

\`\`\`graphql
query { posts(first: 10000) { comments(first: 10000) { author { name } } } }
\`\`\`

Depth = 4 nhưng "cost" = 10000 × 10000 = 10⁸. Cần score:

\`\`\`
cost(field) = base_cost + (list_multiplier × child_cost)
\`\`\`

Vd \`posts(first: N)\` cost = \`N × cost(children)\`. Reject nếu cost > 1000.

Lib: \`gqlgen\` có \`complexity.Func\`:
\`\`\`go
srv.Use(extension.FixedComplexityLimit(1000))
\`\`\`

### 13.3 Rate limit by complexity

Thay vì "100 req/min", dùng "100k complexity-units/min". Query đắt = ăn nhiều quota; query rẻ = ăn ít.

### 13.4 Disable introspection in production

Introspection query (\`__schema\`, \`__type\`) cho phép client đọc toàn bộ schema → tốt cho dev, nhưng cũng giúp attacker map ra mọi field. Production thường:

- Bật cho staging/dev.
- Tắt cho prod (hoặc chỉ allow với auth token).

\`\`\`go
// gqlgen
srv.Use(extension.Introspection{})  // remove this in prod
\`\`\`

### 13.5 Authorization per field

GraphQL trả về 1 response nested → tránh authorize cấp endpoint, phải **authorize cấp field**:

\`\`\`go
func (r *userResolver) Email(ctx context.Context, obj *User) (string, error) {
    caller := ctx.Value("user").(*User)
    if caller.ID != obj.ID && !caller.IsAdmin { return "", ErrForbidden }
    return obj.Email, nil
}
\`\`\`

> ⚠ **Lỗi thường gặp: chỉ check auth ở root resolver**
>
> Người dev đặt check ở \`Query.user(id)\` nhưng quên rằng \`Post.author\` cũng return User. Attacker query \`posts { author { email } }\` → bypass.

---

## 14. Common pitfall — checklist

| Pitfall | Hậu quả | Cách tránh |
|---------|---------|------------|
| **N+1 không DataLoader** | DB chết, latency 100x | Thêm DataLoader cho mọi 1-to-many field |
| **Resolver làm DB call serial thay vì concurrent** | Latency cộng dồn | Trong query, các sibling resolver tự song song (engine handle); chỉ cần đừng đặt \`sync.Mutex\` lung tung |
| **Expose entire DB qua schema** | Dữ liệu nhạy cảm rò rỉ | Schema phải có boundary; field như \`password_hash\` không có trong schema |
| **Bật introspection prod** | Attacker dễ recon | Tắt hoặc gate by auth |
| **Không limit depth/complexity** | DoS dễ | Setup \`FixedComplexityLimit\` + depth limit |
| **DataLoader global** | Cache poisoning cross-user | Tạo loader mới mỗi request, gắn vào context |
| **Mutation chạy song song** | Race condition | GraphQL spec đã serialize mutation top-level; nhưng mutation gọi mutation khác phải tự sync |
| **HTTP cache không hoạt động** | Nghĩ HTTP cache sẽ giúp | Dùng **persisted query** + Apollo client cache |
| **Trả error qua HTTP 500** | Client không biết partial success | GraphQL trả 200 + \`errors[]\` cho mọi lỗi business; chỉ 500 khi crash thật |
| **Schema versioning bằng \`/v2\`** | Mất ưu điểm GraphQL | Thêm field mới, dùng \`@deprecated\` cho field cũ |

---

## 15. Bài tập

Cố gắng tự làm trước khi xem lời giải.

### BT1 — Thiết kế schema cho blog

Thiết kế GraphQL schema cho blog có:
- \`User\` (id, name, email, role là ADMIN/AUTHOR/READER, posts của user, comment đã viết).
- \`Post\` (id, title, body, author, comments, tags là list string, createdAt).
- \`Comment\` (id, text, post liên quan, author, createdAt).
- Query: \`me\`, \`user(id)\`, \`posts(limit)\`, \`post(id)\`.
- Mutation: \`createPost(input)\`, \`addComment(input)\`, \`deletePost(id)\`.

### BT2 — Viết query

Viết query GraphQL lấy: user id \`"42"\`, kèm tên + email, 5 post mới nhất (title + tags), với mỗi post là 3 comment đầu tiên (text + author.name).

### BT3 — Tìm và fix N+1

Cho đoạn resolver:

\`\`\`go
func (r *queryResolver) Posts(ctx context.Context) ([]*Post, error) {
    return r.db.Query("SELECT * FROM posts LIMIT 100")
}
func (r *postResolver) Author(ctx context.Context, p *Post) (*User, error) {
    return r.db.Query("SELECT * FROM users WHERE id = ?", p.AuthorID)
}
\`\`\`

Với query \`{ posts { author { name } } }\`, có bao nhiêu DB query? Sửa lại dùng DataLoader để giảm xuống còn 2.

### BT4 — Viết mutation \`createPost\`

Schema:
\`\`\`graphql
input CreatePostInput { title: String!, body: String!, authorId: ID! }
type Mutation { createPost(input: CreatePostInput!): Post! }
\`\`\`

Viết query string + variables JSON gọi mutation này, và stub resolver Go.

### BT5 — Compute depth và complexity

Cho query:
\`\`\`graphql
query {
  users {                                  # list
    posts(first: 10) {                     # list × 10
      comments(first: 5) {                 # list × 5
        author { name email }
      }
    }
  }
}
\`\`\`

a) Tính depth của query.
b) Tính complexity với rule: scalar = 1, list = N × child_cost.
c) Nếu limit là \`depth ≤ 5\` và \`complexity ≤ 500\`, query có pass không?

### BT6 — Chọn GraphQL hay REST

Với mỗi scenario, chọn GraphQL hoặc REST và giải thích trong 2-3 câu:

a) Public API cho ngân hàng (dev bên ngoài tích hợp, cần caching mạnh).
b) Mobile app feed Facebook-like với nhiều screen, mỗi screen cần shape data khác nhau.
c) Service upload ảnh kèm metadata.
d) Internal BFF gateway gom 5 microservice (user, order, payment, notification, search) cho web admin dashboard.

---

## 16. Lời giải chi tiết

### Lời giải BT1 — Schema blog

\`\`\`graphql
enum Role { ADMIN AUTHOR READER }

type User {
  id: ID!
  name: String!
  email: String!
  role: Role!
  posts: [Post!]!
  comments: [Comment!]!
}

type Post {
  id: ID!
  title: String!
  body: String!
  author: User!
  comments: [Comment!]!
  tags: [String!]!
  createdAt: String!     # ISO-8601, hoặc dùng custom scalar DateTime
}

type Comment {
  id: ID!
  text: String!
  post: Post!
  author: User!
  createdAt: String!
}

type Query {
  me: User
  user(id: ID!): User
  posts(limit: Int = 20): [Post!]!
  post(id: ID!): Post
}

input CreatePostInput {
  title: String!
  body: String!
  tags: [String!]
}

input AddCommentInput {
  postId: ID!
  text: String!
}

type Mutation {
  createPost(input: CreatePostInput!): Post!
  addComment(input: AddCommentInput!): Comment!
  deletePost(id: ID!): Boolean!
}
\`\`\`

**Giải thích chọn lựa:**
- \`me: User\` (không có \`!\`) — null khi chưa login.
- \`posts(limit: Int = 20)\` — default arg, không cần truyền cũng được.
- \`authorId\` không có trong \`CreatePostInput\` vì lấy từ \`ctx.Value("user")\` (auth), không phải client truyền.

### Lời giải BT2 — Query

\`\`\`graphql
query UserDetail($id: ID!) {
  user(id: $id) {
    name
    email
    posts(limit: 5, order: LATEST) {
      title
      tags
      comments(limit: 3) {
        text
        author { name }
      }
    }
  }
}
\`\`\`

Variables:
\`\`\`json
{ "id": "42" }
\`\`\`

(Giả định schema có argument \`order: PostOrder\` và \`comments(limit:)\` — nếu không, dùng \`posts(first: 5)\` theo Relay convention.)

### Lời giải BT3 — Fix N+1

**Phân tích**: query \`{ posts { author { name } } }\`:
- \`Query.posts\` → 1 query \`SELECT * FROM posts LIMIT 100\`.
- \`Post.author\` được gọi **100 lần**, mỗi lần 1 query → **100 query**.
- **Tổng: 101 query**.

**Fix với DataLoader:**

\`\`\`go
import "github.com/graph-gophers/dataloader"

func NewUserLoader(db *sql.DB) *dataloader.Loader {
    return dataloader.NewBatchedLoader(
        func(ctx context.Context, keys dataloader.Keys) []*dataloader.Result {
            ids := make([]string, len(keys))
            for i, k := range keys { ids[i] = k.String() }

            // 1 query batch
            rows, err := db.QueryContext(ctx,
                "SELECT id, name FROM users WHERE id = ANY($1)", pq.Array(ids))
            if err != nil { /* error tất cả keys */ }

            byID := make(map[string]*User)
            for rows.Next() {
                var u User
                rows.Scan(&u.ID, &u.Name)
                byID[u.ID] = &u
            }

            // QUAN TRỌNG: trả về đúng thứ tự keys
            out := make([]*dataloader.Result, len(keys))
            for i, k := range keys {
                if u, ok := byID[k.String()]; ok {
                    out[i] = &dataloader.Result{Data: u}
                } else {
                    out[i] = &dataloader.Result{Error: fmt.Errorf("not found: %s", k)}
                }
            }
            return out
        },
        dataloader.WithWait(2*time.Millisecond),
    )
}

// Middleware: tạo loader mới mỗi request
func loaderMW(db *sql.DB) func(http.Handler) http.Handler {
    return func(next http.Handler) http.Handler {
        return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
            ctx := context.WithValue(r.Context(), "userLoader", NewUserLoader(db))
            next.ServeHTTP(w, r.WithContext(ctx))
        })
    }
}

// Resolver mới
func (r *postResolver) Author(ctx context.Context, p *Post) (*User, error) {
    loader := ctx.Value("userLoader").(*dataloader.Loader)
    thunk := loader.Load(ctx, dataloader.StringKey(p.AuthorID))
    res, err := thunk()
    if err != nil { return nil, err }
    return res.(*User), nil
}
\`\`\`

**Kết quả**: 1 query posts + 1 query users batch = **2 query** (giảm từ 101).

### Lời giải BT4 — Mutation createPost

**Query string:**
\`\`\`graphql
mutation NewPost($input: CreatePostInput!) {
  createPost(input: $input) {
    id
    title
    author { name }
    createdAt
  }
}
\`\`\`

**Variables:**
\`\`\`json
{
  "input": {
    "title": "GraphQL is cool",
    "body": "...",
    "authorId": "42"
  }
}
\`\`\`

**Resolver Go (gqlgen):**
\`\`\`go
func (r *mutationResolver) CreatePost(ctx context.Context, input model.CreatePostInput) (*model.Post, error) {
    // 1. Auth
    caller, ok := auth.UserFromCtx(ctx)
    if !ok { return nil, ErrUnauth }

    // 2. Validate
    if len(input.Title) == 0 || len(input.Title) > 200 {
        return nil, fmt.Errorf("title length 1..200")
    }
    // ... body validation

    // 3. Persist
    p := &model.Post{
        ID:        uuid.NewString(),
        Title:     input.Title,
        Body:      input.Body,
        AuthorID:  caller.ID,  // KHÔNG dùng input.AuthorID (security)
        CreatedAt: time.Now(),
    }
    if err := r.PostRepo.Insert(ctx, p); err != nil {
        return nil, err
    }
    return p, nil
}
\`\`\`

**Lưu ý security**: \`authorId\` trong input phải bị OVERRIDE bằng caller.ID — không tin client.

### Lời giải BT5 — Depth + complexity

**Query:**
\`\`\`graphql
query {
  users {
    posts(first: 10) {
      comments(first: 5) {
        author { name email }
      }
    }
  }
}
\`\`\`

**a) Depth:**
- \`users\` = level 1
- \`posts\` = level 2
- \`comments\` = level 3
- \`author\` = level 4
- \`name\`/\`email\` = level 5

→ **Depth = 5**.

**b) Complexity** (scalar = 1, list = N × child):

Tính từ trong ra:
- \`name + email\` = 1 + 1 = **2**.
- \`author\` = 2 (chỉ object wrapper, không nhân) = **2**.
- \`comments(first:5)\` = 5 × 2 = **10**.
- \`posts(first:10)\` = 10 × 10 = **100**.
- \`users\` không có \`first\`, giả định mặc định N (vd 100) = 100 × 100 = **10000**.

Nếu \`users\` không có limit → complexity rất lớn. Nếu giả định \`users(limit: 20)\` thì = 20 × 100 = **2000**.

**c) Pass limit không?**
- Depth = 5 → **pass** (≤ 5).
- Complexity ≥ 2000 (hoặc nhiều hơn nếu \`users\` không limit) → **FAIL** (≤ 500).

**Bài học**: phải bắt buộc client truyền limit cho mọi field list, hoặc đặt default limit nhỏ.

### Lời giải BT6 — Chọn GraphQL/REST

**a) Public API ngân hàng** → **REST**. Dev bên ngoài quen REST + curl/Postman; HTTP cache CDN hữu ích cho endpoint read-heavy (lịch sử giao dịch); GraphQL phức tạp hóa onboarding.

**b) Mobile feed Facebook-like** → **GraphQL**. Đa screen heterogeneous; bandwidth 3G/4G; nested data (post → author → friends → ...). Đây chính là use-case GraphQL được tạo ra.

**c) Upload ảnh kèm metadata** → **REST** (với \`multipart/form-data\`). Hoặc hybrid: REST cho upload, GraphQL trả URL/metadata sau khi upload xong. GraphQL upload có spec nhưng chưa universal, lib phức tạp.

**d) Internal BFF gateway 5 microservice** → **GraphQL**. Đây là use-case kinh điển của GraphQL gateway: gom data nhiều service vào 1 endpoint cho FE; FE chọn field cần; backend mỗi service vẫn có thể là REST/gRPC.

---

## 17. Code & Minh họa

- File code Go reference: [solutions.go](./solutions.go) — minimal GraphQL-like engine với map dispatch + DataLoader implementation, kèm reference tới \`gqlgen\` và \`graph-gophers/dataloader\`.
- File visualization: [visualization.html](./visualization.html) — 3 module:
  - **Module 1**: GraphQL vs REST — animate cùng data fetch, REST gửi N request, GraphQL gửi 1 query.
  - **Module 2**: N+1 → DataLoader — gom ID, batch query, hiển thị số DB call.
  - **Module 3**: Query depth limit — nhập query nested, compute depth, accept/reject.

---

## 18. Bài tiếp theo

- [Lesson 51 — Graceful Shutdown](../lesson-51-graceful-shutdown/) (sẽ học sau)
- Xem thêm tier 4: [tier-4-web-backend/](../tier-4-web-backend/)

**Tham khảo:**
- [GraphQL official spec](https://spec.graphql.org/)
- [\`gqlgen\` docs](https://gqlgen.com/)
- [\`graph-gophers/dataloader\`](https://github.com/graph-gophers/dataloader)
- [Apollo Blog — DataLoader explanation](https://www.apollographql.com/blog/batching-client-graphql-queries-a685f5bcd41b/)
- [Production GraphQL ở GitHub](https://github.blog/2016-09-14-the-github-graphql-api/)
`;
