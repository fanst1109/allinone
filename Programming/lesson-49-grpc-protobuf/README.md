# Lesson 49 — gRPC & Protocol Buffers

> Tier 4 · Web & Backend — RPC framework hiệu năng cao của Google, dùng Protocol Buffers làm IDL và HTTP/2 làm transport. Là tiêu chuẩn de-facto cho internal microservice tại Google, Netflix, Uber, Square, ByteDance.

## Mục tiêu học tập

Sau lesson này, bạn sẽ:

1. Hiểu **gRPC là gì** và vì sao nó tồn tại — bài toán nào REST không giải tốt mà gRPC giải.
2. Viết được file `.proto` định nghĩa **message** và **service**, hiểu vai trò của **field number** và **reserved**.
3. Phân biệt rõ **4 loại RPC**: Unary, Server streaming, Client streaming, Bidirectional streaming — biết khi nào dùng loại nào.
4. Implement được **server** (`Unimplemented*Server` embed) và **client** (`NewClient` + insecure/TLS) ở mức skeleton.
5. Viết được **interceptor** (auth, logging) và đọc/ghi **metadata** giống HTTP header.
6. Trả lời được "gRPC vs REST: chọn cái nào cho từng kịch bản" (mobile, browser, internal, IoT).
7. Tránh được 4 pitfall lớn: đổi field number, quên `protoc`, insecure ở prod, block stream gây backpressure.

## Kiến thức tiền đề

- [Lesson 42 — HTTP & net/http deep](../lesson-42-http-net-deep/) — hiểu HTTP/1.1 trước khi đến HTTP/2.
- [Lesson 43 — REST API design](../lesson-43-rest-api-design/) — để so sánh được gRPC với REST.
- [Lesson 23 — JSON encoding](../lesson-23-json-encoding/) — để hiểu vì sao binary nhanh hơn JSON.
- [Lesson 27 — Goroutines & Channels](../lesson-27-goroutines-channels/) — streaming gRPC dùng goroutine ngầm.

---

## 1. gRPC là gì — và vì sao nó tồn tại

### 💡 Trực giác

Hãy tưởng tượng bạn có **30 microservice** giao tiếp với nhau qua REST + JSON:

- Mỗi service: HTTP server + router + JSON marshal/unmarshal + validation thủ công.
- Tốn dây thần kinh: viết struct request/response 2 lần (client + server), dễ lệch.
- Tốn CPU: JSON parse 1 message 2KB mất ~10–50µs; tính trên triệu RPS, tiêu hao đáng kể.
- Tốn băng thông: JSON verbose (`{"name":"alice"}` = 16 byte) so với binary (`0a 05 61 6c 69 63 65` = 7 byte).

**gRPC giải bài toán này như sau**:

1. **Một file `.proto` duy nhất** mô tả cả message lẫn service → tự sinh code Go/Java/Python/... → client và server luôn đồng bộ schema.
2. **Binary serialization (Protocol Buffers)** — nhanh hơn JSON 3–7×, nhỏ hơn 2–5×.
3. **HTTP/2** dưới gầm — multiplexing nhiều RPC qua 1 connection, header compression (HPACK), streaming native.
4. **Strong typing end-to-end** — đổi field bị warning lúc compile, không phải lúc runtime.

### Định nghĩa hình thức

**gRPC** = Google RPC framework, mã nguồn mở từ 2015 (kế thừa từ hệ thống nội bộ Stubby). Stack chuẩn:

```
┌─────────────────────────────────────────┐
│  Application code (Go/Java/Python/...) │
├─────────────────────────────────────────┤
│  Generated stubs (từ .proto)            │  ← protoc-gen-go-grpc sinh ra
├─────────────────────────────────────────┤
│  gRPC library                           │  ← google.golang.org/grpc
├─────────────────────────────────────────┤
│  Protocol Buffers serialization         │  ← google.golang.org/protobuf
├─────────────────────────────────────────┤
│  HTTP/2 framing                         │  ← golang.org/x/net/http2
├─────────────────────────────────────────┤
│  TLS (thường) hoặc plaintext            │
├─────────────────────────────────────────┤
│  TCP                                    │
└─────────────────────────────────────────┘
```

### ❓ Câu hỏi tự nhiên của người đọc

**Q: gRPC có phải là một protocol mới hoàn toàn không?**
A: Không. gRPC là **một application protocol chạy trên HTTP/2**. Mỗi RPC = 1 HTTP/2 stream. Header HTTP/2 mang metadata, body mang protobuf-encoded message. Vì vậy proxy/load balancer phải hiểu HTTP/2 (nginx ≥ 1.13, envoy native).

**Q: gRPC có thay được REST không?**
A: Không hoàn toàn. gRPC thắng trong nội bộ (internal microservices), nhưng yếu ở: browser (cần grpc-web + proxy), human debugging (binary khó đọc bằng `curl`), API public (đối tác quen REST/JSON). Đa số kiến trúc lớn dùng **cả hai**: gRPC nội bộ, REST/JSON ở edge.

**Q: Tại sao Google không dùng REST nội bộ luôn cho đỡ phức tạp?**
A: Vì ở scale Google, mỗi 1µs tiết kiệm × triệu RPS × hàng nghìn service = hàng triệu đô tiền compute/năm. Strong typing cũng giảm bug giao tiếp giữa team — bug schema mismatch sản xuất rất tốn.

### 📝 Tóm tắt mục 1

- gRPC = RPC framework, dùng **protobuf** (binary IDL + serialization) + **HTTP/2** (multiplex + streaming).
- Sinh ra để giải bài toán "30 microservice giao tiếp" tốn CPU/dây thần kinh khi dùng REST + JSON.
- Không thay REST hoàn toàn — dùng kèm: gRPC internal, REST external.

---

## 2. Protocol Buffers (protobuf) — IDL và serialization

### 💡 Trực giác

**Protocol Buffers là "JSON cho máy"**: cùng vai trò (mô tả dữ liệu có cấu trúc), nhưng:

- Schema-first (phải khai báo trước, không "dynamic" như JSON).
- Binary (không phải text).
- Compact (mỗi field 1 tag byte + length-prefix).

Bạn viết **một** file `.proto`, công cụ `protoc` sinh ra **stub** cho mọi ngôn ngữ — Go, Java, Python, C++, TypeScript, Rust, Swift, Kotlin, Dart, ... — đảm bảo tất cả nói cùng một ngôn ngữ trên dây.

### Ví dụ `.proto` đầy đủ

```proto
syntax = "proto3";

package user.v1;
option go_package = "example.com/user/v1;userv1";

// User là tài khoản người dùng.
message User {
  int64  id    = 1;
  string name  = 2;
  string email = 3;
  Role   role  = 4;
}

enum Role {
  ROLE_UNSPECIFIED = 0;  // proto3 enum bắt buộc có giá trị 0
  ROLE_USER        = 1;
  ROLE_ADMIN       = 2;
}

message GetUserRequest {
  int64 id = 1;
}

message ListUsersRequest {
  int32  page_size  = 1;
  string page_token = 2;
}

message CreateUserRequest {
  string name  = 1;
  string email = 2;
}

service UserService {
  // Unary: lấy 1 user.
  rpc GetUser(GetUserRequest) returns (User);

  // Server-streaming: trả về N user qua thời gian.
  rpc ListUsers(ListUsersRequest) returns (stream User);

  // Unary: tạo user mới.
  rpc CreateUser(CreateUserRequest) returns (User);
}
```

### Wire format — vì sao binary lại nhỏ và nhanh

Mỗi field encode thành 2 phần:

```
[tag = (field_number << 3) | wire_type] [value]
```

- `wire_type`: 0 = varint, 1 = 64-bit, 2 = length-delimited (string/bytes/message), 5 = 32-bit.
- `field_number`: số bạn gán trong `.proto` (1, 2, 3, ...).

**Ví dụ encode** `User{ id: 5, name: "ada" }`:

```
field 1 (id, int64, varint):
  tag  = (1 << 3) | 0 = 0x08
  value = varint(5)     = 0x05
  → bytes: 08 05

field 2 (name, string, length-delimited):
  tag    = (2 << 3) | 2 = 0x12
  length = 3
  value  = "ada"        = 61 64 61
  → bytes: 12 03 61 64 61
```

Tổng: **7 byte**. JSON tương đương `{"id":5,"name":"ada"}` = **20 byte**. Tỷ lệ ~3× — và parse cũng nhanh hơn vì không cần lex token, chỉ đọc tag → switch.

### ⚠ Lỗi thường gặp

- Quên `syntax = "proto3";` đầu file → `protoc` mặc định proto2, hành vi default value khác.
- Đặt enum value đầu tiên ≠ `0` trong proto3 → compile error. Quy ước đặt `*_UNSPECIFIED = 0`.
- Trùng field number giữa các field trong cùng message → ambiguous.

### 📝 Tóm tắt mục 2

- `.proto` = một file mô tả message + service, sinh stub cho mọi ngôn ngữ.
- Wire format = `tag (field_number + wire_type) | value`, gọn ~3× JSON.
- proto3 yêu cầu enum value đầu = 0; mỗi field một `field_number` duy nhất.

---

## 3. Field number rule — quy tắc tối quan trọng

### 💡 Trực giác

`field_number` không phải là "thứ tự" — đó là **danh tính vĩnh viễn** của một field trên dây. Tên field có thể đổi (`name` → `full_name`), nhưng số **không bao giờ được đổi** nếu đã có client/server đang chạy với nó.

Lý do: wire format chỉ mang **số**, không mang **tên**. Server nhận `08 05` thì tra số `1` → biết field nào. Nếu hôm nay field 1 là `id`, mai đổi thành `age`, server cũ vẫn parse `08 05` thành `id=5` còn server mới parse thành `age=5` → **data corruption thầm lặng**.

### Quy tắc cứng

| Quy tắc | Lý do |
|---|---|
| **Không bao giờ đổi field_number** của field đã release | Wire compatibility với client cũ |
| **Không bao giờ đổi type** của field đã release (`int32` ↔ `int64`, `string` ↔ `bytes`) | Wire format khác → corrupt |
| Có thể **đổi tên** field | Tên không nằm trên dây |
| Có thể **thêm field mới** với số chưa dùng | Old client bỏ qua field unknown |
| Khi xoá field → **reserved** số đó | Tránh tái sử dụng nhầm |

### Vì sao 1–15 đặc biệt — và minh hoạ bằng số

Tag byte = `(field_number << 3) | wire_type`. Mà varint dùng 7 bit/byte (bit cao = "có byte tiếp theo"):

- Field 1, wire_type 2: tag = `(1<<3)|2 = 0x0A` → fit trong 7 bit → **1 byte**.
- Field 15, wire_type 2: tag = `(15<<3)|2 = 0x7A` = 122 → fit → **1 byte**.
- Field 16, wire_type 2: tag = `(16<<3)|2 = 0x82` = 130 → cần varint **2 byte**.

**Best practice**: dành 1–15 cho field hot (xuất hiện gần như mọi message), 16+ cho field hiếm.

### Reserved fields — khi xoá

```proto
message User {
  reserved 4, 7 to 9;             // reserve field number
  reserved "old_phone", "fax";    // reserve tên (để không ai dùng lại)

  int64  id    = 1;
  string name  = 2;
  string email = 3;
  // field 4 đã xoá → reserved
}
```

Sau khi reserve, nếu ai vô tình thêm `string phone = 4;` thì `protoc` báo lỗi: *"Field number 4 has already been used in 'User' by field 'old_phone'."*

### ❓ Câu hỏi tự nhiên của người đọc

**Q: Nếu tôi mới prototype, chưa release, tôi đổi field number được không?**
A: Được, hoàn toàn. Quy tắc chỉ có hiệu lực khi proto đã **release** (có client/server chạy production). Trước đó cứ đổi thoải mái.

**Q: Tôi muốn đổi `int32` → `int64` cho field `id` vì sắp tràn. Làm sao?**
A: **Không đổi number cũ**. Thay vào đó:
1. Thêm field mới `int64 id_v2 = 99;`.
2. Server set cả 2 trong response, đọc cả 2 trong request.
3. Migrate dần client → đọc/ghi `id_v2`.
4. Sau khi không còn client dùng `id`, reserve nó.

**Q: Reserve cả tên lẫn số khác nhau thế nào?**
A: Reserve số → không ai dùng lại được số đó. Reserve tên → không ai đặt lại field cùng tên (tránh nhầm khi đọc proto cũ trong git history).

### 🔁 Dừng lại tự kiểm tra

Cho proto sau:

```proto
message Product {
  string name  = 1;
  double price = 2;
  int32  stock = 3;
}
```

Sau 1 năm, bạn muốn:
- Xoá `stock`.
- Đổi `price` từ `double` sang `int64` (đơn vị cents).
- Thêm `category`.

Viết proto mới sao cho **không break** client cũ.

<details><summary>Đáp án</summary>

```proto
message Product {
  reserved 3;                 // stock đã xoá
  reserved "stock";

  string name        = 1;
  double price       = 2;     // GIỮ NGUYÊN — không đổi type được
  int64  price_cents = 4;     // field mới, số mới
  string category    = 5;     // field mới

  // Trong server: set CẢ price và price_cents.
  // Client mới đọc price_cents, client cũ vẫn đọc price.
  // Sau khi không còn client cũ, reserve field 2.
}
```

</details>

### 📝 Tóm tắt mục 3

- `field_number` = danh tính vĩnh viễn, không đổi sau release.
- 1–15 = tag 1 byte; dành cho field hot.
- Xoá field → `reserved` số và tên.
- Đổi type không cho phép — phải thêm field mới và migrate.

---

## 4. proto3 vs proto2 — chọn cái nào

| Khác biệt | proto2 | proto3 |
|---|---|---|
| `required` / `optional` | Có | **Bỏ** (proto3.15+ thêm lại `optional` cho scalar) |
| Default value | Cho phép custom | **Bỏ** — luôn là zero value của type |
| Unknown field handling | Giữ lại khi serialize | Giữ lại (từ proto3.5) |
| Enum value đầu | Tuỳ | **Phải = 0** |
| Phổ biến | Legacy (Google nội bộ vẫn dùng) | **Default cho code mới** |

**Khuyến nghị**: dùng **proto3** cho mọi project mới. Lý do:

- Đơn giản hơn (không có khái niệm "field has been set vs unset" với scalar — zero value = unset).
- Cross-language nhất quán hơn.
- gRPC tooling chuẩn ưu tiên proto3.

Cú pháp khai báo:

```proto
syntax = "proto3";  // dòng ĐẦU TIÊN, bắt buộc
```

Nếu thiếu dòng này, `protoc` mặc định proto2 → bug hành vi default.

---

## 5. Code generation — protoc

### Tool chain

```
.proto file
   │
   ▼
┌──────────┐
│  protoc  │   ← core compiler, không sinh code Go một mình
└──────────┘
   │
   ├──> protoc-gen-go        → user.pb.go        (message structs + marshaling)
   └──> protoc-gen-go-grpc   → user_grpc.pb.go   (service interface + stubs)
```

### Lệnh chuẩn

```bash
# Cài tool (một lần)
go install google.golang.org/protobuf/cmd/protoc-gen-go@latest
go install google.golang.org/grpc/cmd/protoc-gen-go-grpc@latest

# Sinh code
protoc \
  --go_out=. --go_opt=paths=source_relative \
  --go-grpc_out=. --go-grpc_opt=paths=source_relative \
  api/user/v1/user.proto
```

### File sinh ra — đoán nội dung

Với `user.proto` đầu mục 2, sinh ra:

**`user.pb.go`** — chứa struct + marshal:

```go
type User struct {
    state         protoimpl.MessageState
    sizeCache     protoimpl.SizeCache
    unknownFields protoimpl.UnknownFields

    Id    int64  `protobuf:"varint,1,opt,name=id,proto3" json:"id,omitempty"`
    Name  string `protobuf:"bytes,2,opt,name=name,proto3" json:"name,omitempty"`
    Email string `protobuf:"bytes,3,opt,name=email,proto3" json:"email,omitempty"`
    Role  Role   `protobuf:"varint,4,opt,name=role,proto3,enum=user.v1.Role" json:"role,omitempty"`
}

func (x *User) GetId() int64    { ... }
func (x *User) GetName() string { ... }
// ... các getter khác
func (x *User) Reset()         { ... }
func (x *User) String() string { ... }
func (x *User) ProtoReflect() protoreflect.Message { ... }
```

**`user_grpc.pb.go`** — chứa interface server + client stub:

```go
type UserServiceServer interface {
    GetUser(context.Context, *GetUserRequest) (*User, error)
    ListUsers(*ListUsersRequest, UserService_ListUsersServer) error
    CreateUser(context.Context, *CreateUserRequest) (*User, error)
    mustEmbedUnimplementedUserServiceServer()
}

type UnimplementedUserServiceServer struct{}
func (UnimplementedUserServiceServer) GetUser(...) (*User, error) {
    return nil, status.Errorf(codes.Unimplemented, "method GetUser not implemented")
}
// ... default impls cho mọi method

type UserServiceClient interface {
    GetUser(ctx context.Context, in *GetUserRequest, opts ...grpc.CallOption) (*User, error)
    ListUsers(ctx context.Context, in *ListUsersRequest, opts ...grpc.CallOption) (UserService_ListUsersClient, error)
    CreateUser(ctx context.Context, in *CreateUserRequest, opts ...grpc.CallOption) (*User, error)
}

func NewUserServiceClient(cc grpc.ClientConnInterface) UserServiceClient { ... }
```

### ⚠ Lỗi thường gặp

- **Đổi `.proto` mà quên chạy `protoc`** → code Go vẫn ref struct cũ → bug runtime. Luôn `make generate` hoặc CI check `git diff` sau khi `protoc`.
- **`paths=source_relative` thiếu** → file sinh ra ở chỗ lạ (theo `go_package` option).
- **Phiên bản plugin lệch** giữa team → output khác → diff giả lập git.

---

## 6. Bốn loại RPC

### 💡 Trực giác

Bốn loại = tổ hợp `(client gửi: 1 hay nhiều) × (server trả: 1 hay nhiều)`:

| Loại | Client | Server | Ví dụ |
|---|---|---|---|
| **Unary** | 1 | 1 | `GetUser(id) → User` |
| **Server-streaming** | 1 | N | `ListUsers(filter) → stream User` |
| **Client-streaming** | N | 1 | `UploadChunks(stream Chunk) → UploadResult` |
| **Bidirectional** | N | N | `Chat(stream Message) → stream Message` |

### Khai báo trong proto

```proto
service UserService {
  rpc GetUser     (GetUserRequest)        returns (User);                  // unary
  rpc ListUsers   (ListUsersRequest)      returns (stream User);           // server stream
  rpc UploadAvatar(stream AvatarChunk)    returns (UploadResult);          // client stream
  rpc Chat        (stream ChatMessage)    returns (stream ChatMessage);    // bidi
}
```

### Khi nào dùng loại nào — và lỗi thường gặp

**Unary**:
- 90% RPC thực tế. Đơn giản, dễ trace, dễ retry.
- Dùng khi response size có giới hạn (vài MB trở xuống) và không cần "tin real-time".

**Server-streaming**:
- Tốt cho: list/feed lớn (paginate qua stream), real-time push (price ticker, notifications), download lớn từng chunk.
- Pitfall: client phải đọc đến EOF, nếu không sẽ rò goroutine/connection.

**Client-streaming**:
- Tốt cho: upload lớn (file upload từng chunk), bulk insert.
- Pitfall: server phải `CloseAndRecv` hoặc `Recv` đến EOF rồi `SendAndClose`.

**Bidirectional**:
- Tốt cho: chat, game state sync, two-way telemetry.
- Pitfall: **backpressure**. Nếu một bên ngừng đọc, bên kia send sẽ block (buffer đầy) → deadlock. Phải có goroutine recv riêng và xử lý slow consumer.

### ⚠ Lỗi thường gặp

- Dùng bidi khi unary đủ → tăng complexity không cần thiết.
- Quên close stream → connection leak.
- Stream qua load balancer L7 không hiểu HTTP/2 → bị cắt.

### 📝 Tóm tắt mục 6

- 4 loại = tổ hợp client×server (1 hoặc N).
- 90% case = Unary. Streaming chỉ dùng khi thật sự cần.
- Stream PHẢI close đúng — không sẽ leak.

---

## 7. Server implementation — skeleton chi tiết

```go
package main

import (
    "context"
    "errors"
    "log"
    "net"

    "google.golang.org/grpc"
    "google.golang.org/grpc/codes"
    "google.golang.org/grpc/status"

    pb "example.com/user/v1"
)

// server implements pb.UserServiceServer.
type server struct {
    pb.UnimplementedUserServiceServer // forward-compat: nếu proto thêm method mới, server không break compile
    db map[int64]*pb.User
}

// Unary — trả lỗi typed.
func (s *server) GetUser(ctx context.Context, req *pb.GetUserRequest) (*pb.User, error) {
    u, ok := s.db[req.GetId()]
    if !ok {
        return nil, status.Errorf(codes.NotFound, "user %d not found", req.GetId())
    }
    return u, nil
}

// Server-streaming — gửi từng item rồi return.
func (s *server) ListUsers(req *pb.ListUsersRequest, stream pb.UserService_ListUsersServer) error {
    for _, u := range s.db {
        if err := stream.Context().Err(); err != nil {
            return err // client đã huỷ → dừng
        }
        if err := stream.Send(u); err != nil {
            return err
        }
    }
    return nil // EOF → client nhận io.EOF
}

func main() {
    lis, err := net.Listen("tcp", ":50051")
    if err != nil {
        log.Fatal(err)
    }
    s := grpc.NewServer()
    pb.RegisterUserServiceServer(s, &server{db: map[int64]*pb.User{}})
    log.Println("gRPC server listening on :50051")
    if err := s.Serve(lis); err != nil {
        log.Fatal(err)
    }
}
```

### Vì sao phải embed `UnimplementedUserServiceServer`

Đây là cách gRPC Go đảm bảo **forward compatibility**:

- Bạn implement service version 1 với 3 method.
- Ngày mai team khác thêm method `DeleteUser` vào `.proto` rồi rebuild.
- Code Go của bạn nếu KHÔNG embed `Unimplemented*` → compile error: "missing method DeleteUser".
- Nếu CÓ embed → method `DeleteUser` mặc định return `Unimplemented` → server vẫn chạy, client gọi `DeleteUser` nhận lỗi `Unimplemented` thay vì crash.

Đây là design tốt: bạn chọn "explicit vỡ" hoặc "implicit graceful degrade" tuỳ team policy.

---

## 8. Client call — kết nối và gọi

```go
package main

import (
    "context"
    "log"
    "time"

    "google.golang.org/grpc"
    "google.golang.org/grpc/credentials/insecure"

    pb "example.com/user/v1"
)

func main() {
    // 1. Tạo connection (lazy — không dial ngay).
    conn, err := grpc.NewClient(
        "localhost:50051",
        grpc.WithTransportCredentials(insecure.NewCredentials()),
    )
    if err != nil {
        log.Fatal(err)
    }
    defer conn.Close()

    // 2. Tạo stub.
    client := pb.NewUserServiceClient(conn)

    // 3. Unary call với timeout.
    ctx, cancel := context.WithTimeout(context.Background(), 2*time.Second)
    defer cancel()

    user, err := client.GetUser(ctx, &pb.GetUserRequest{Id: 42})
    if err != nil {
        log.Fatal(err)
    }
    log.Printf("got user: %v", user)

    // 4. Server-streaming call.
    stream, err := client.ListUsers(ctx, &pb.ListUsersRequest{PageSize: 100})
    if err != nil {
        log.Fatal(err)
    }
    for {
        u, err := stream.Recv()
        if err != nil {
            break // io.EOF hoặc lỗi
        }
        log.Printf("got: %v", u)
    }
}
```

### ❓ Câu hỏi tự nhiên của người đọc

**Q: `grpc.NewClient` vs `grpc.Dial` khác gì?**
A: `Dial` là API cũ (đang deprecated), block đến khi connected. `NewClient` là API mới (≥ v1.63), lazy — không dial ngay, chỉ tạo connection state, dial khi RPC đầu tiên được gọi. Code mới luôn dùng `NewClient`.

**Q: Vì sao phải `insecure.NewCredentials()`? Có chạy được "không TLS gì cả" không?**
A: `insecure.NewCredentials()` chính LÀ "không TLS" (plaintext). Phải khai báo explicit để buộc dev "tự biết mình đang insecure" — tránh nhầm chạy prod plaintext.

---

## 9. Interceptor — middleware tương đương

### 💡 Trực giác

Interceptor = middleware HTTP. Một function bọc quanh mỗi RPC để pre/post handle: logging, auth, metric, retry, tracing.

### Unary interceptor — server side

```go
func loggingInterceptor(
    ctx context.Context,
    req any,
    info *grpc.UnaryServerInfo,   // method name, service
    handler grpc.UnaryHandler,    // RPC handler thực sự
) (resp any, err error) {
    start := time.Now()
    resp, err = handler(ctx, req)
    log.Printf("rpc=%s dur=%s err=%v", info.FullMethod, time.Since(start), err)
    return
}

s := grpc.NewServer(grpc.UnaryInterceptor(loggingInterceptor))
```

### Auth interceptor — đọc metadata

```go
func authInterceptor(
    ctx context.Context, req any,
    info *grpc.UnaryServerInfo, handler grpc.UnaryHandler,
) (any, error) {
    md, ok := metadata.FromIncomingContext(ctx)
    if !ok {
        return nil, status.Error(codes.Unauthenticated, "missing metadata")
    }
    tokens := md.Get("authorization")
    if len(tokens) == 0 {
        return nil, status.Error(codes.Unauthenticated, "missing token")
    }
    if !validToken(tokens[0]) {
        return nil, status.Error(codes.Unauthenticated, "bad token")
    }
    return handler(ctx, req)
}
```

### Stream interceptor — bọc stream

```go
func streamLogger(
    srv any, ss grpc.ServerStream,
    info *grpc.StreamServerInfo, handler grpc.StreamHandler,
) error {
    log.Printf("stream start: %s", info.FullMethod)
    err := handler(srv, ss)
    log.Printf("stream end: %s err=%v", info.FullMethod, err)
    return err
}

s := grpc.NewServer(
    grpc.UnaryInterceptor(authInterceptor),
    grpc.StreamInterceptor(streamLogger),
)
```

### Chain nhiều interceptor

Dùng `grpc.ChainUnaryInterceptor(a, b, c)` — chạy theo thứ tự `a → b → c → handler → c → b → a` (kiểu HTTP middleware).

### 📝 Tóm tắt mục 9

- Interceptor = middleware: unary và stream.
- Use case chính: logging, auth, metric, retry, tracing.
- Chain bằng `ChainUnaryInterceptor` / `ChainStreamInterceptor`.

---

## 10. Metadata — HTTP header tương đương

### Server đọc

```go
md, ok := metadata.FromIncomingContext(ctx)
if !ok {
    return nil, status.Error(codes.Internal, "no metadata")
}
userAgents := md.Get("user-agent")
tokens := md.Get("authorization")
```

### Client gửi

```go
md := metadata.New(map[string]string{
    "authorization": "Bearer eyJhbGc...",
    "x-trace-id":    "abc123",
})
ctx = metadata.NewOutgoingContext(ctx, md)
resp, err := client.GetUser(ctx, &pb.GetUserRequest{Id: 1})
```

### Đặc điểm

- Key **case-insensitive** (gRPC chuẩn hoá thành lowercase).
- Value là `[]string` (như HTTP header).
- Key suffix `-bin` → value coi là binary (base64 trên dây).
- Có metadata "leading" (gửi trước data) và "trailing" (sau khi xong, dùng cho status/error detail).

---

## 11. Error handling — status codes

gRPC định nghĩa **17 status codes** chuẩn (giống HTTP nhưng riêng):

| Code | Ý nghĩa |
|---|---|
| `OK` | Thành công |
| `Canceled` | Client huỷ |
| `InvalidArgument` | Request sai (giống HTTP 400) |
| `NotFound` | Resource không tồn tại (404) |
| `AlreadyExists` | Resource đã tồn tại (409) |
| `PermissionDenied` | Thiếu quyền (403) |
| `Unauthenticated` | Chưa auth (401) |
| `ResourceExhausted` | Rate limit / quota |
| `FailedPrecondition` | State không cho phép |
| `Unavailable` | Service down (503, retry-able) |
| `DeadlineExceeded` | Timeout |
| `Internal` | Bug server (500) |
| `Unimplemented` | Method không implement (501) |

### Trả lỗi typed

```go
return nil, status.Error(codes.NotFound, "user not found")

// Hoặc kèm detail proto:
st := status.New(codes.InvalidArgument, "invalid email")
st, _ = st.WithDetails(&errdetails.BadRequest{
    FieldViolations: []*errdetails.BadRequest_FieldViolation{
        {Field: "email", Description: "must be valid"},
    },
})
return nil, st.Err()
```

### Client parse

```go
_, err := client.GetUser(ctx, req)
if err != nil {
    st, ok := status.FromError(err)
    if ok {
        switch st.Code() {
        case codes.NotFound:
            // handle missing
        case codes.Unavailable:
            // retry
        }
    }
}
```

---

## 12. TLS với gRPC

```go
import "google.golang.org/grpc/credentials"

// Server:
creds, _ := credentials.NewServerTLSFromFile("server.crt", "server.key")
s := grpc.NewServer(grpc.Creds(creds))

// Client:
creds, _ := credentials.NewClientTLSFromFile("ca.crt", "")
conn, _ := grpc.NewClient("api.example.com:443", grpc.WithTransportCredentials(creds))
```

Production checklist:
- TLS 1.2+, prefer 1.3.
- Mutual TLS (mTLS) cho service-to-service: server xác minh client cert và ngược lại.
- Rotation cert bằng tool như cert-manager (k8s) hoặc Vault.
- **Không bao giờ** dùng `insecure.NewCredentials()` ở prod.

---

## 13. gRPC-Gateway — REST gateway từ proto

**Vấn đề**: bạn viết service bằng gRPC, nhưng app web (browser) hoặc đối tác external chỉ nói REST/JSON.

**Giải pháp**: gRPC-Gateway sinh **một HTTP reverse proxy** từ chính file `.proto`:

```proto
import "google/api/annotations.proto";

service UserService {
  rpc GetUser(GetUserRequest) returns (User) {
    option (google.api.http) = {
      get: "/v1/users/{id}"
    };
  }
}
```

Generate ra một file `*_gw.go` chứa HTTP handler — nhận `GET /v1/users/42`, unmarshal JSON → call gRPC server → marshal response → trả JSON.

Kiến trúc:

```
Browser ─HTTP/JSON─> gRPC-Gateway ─gRPC─> Server
External API ─HTTP/JSON─> gRPC-Gateway ─gRPC─> Server
Internal service ───────gRPC─────────────────> Server
```

Lợi: **một** source of truth (`.proto`), hai protocol expose.

---

## 14. gRPC vs REST — chọn cái nào

### Bảng so sánh đầy đủ

| Tiêu chí | gRPC | REST/JSON |
|---|---|---|
| Tốc độ wire | 3–7× nhanh hơn | Baseline |
| Kích thước payload | 2–5× nhỏ hơn | Baseline |
| Transport | HTTP/2 (multiplex, streaming) | HTTP/1.1 (thường) |
| Schema | Strong (`.proto`) | Loose (OpenAPI nếu có) |
| Browser support | Cần grpc-web + proxy | Native |
| Tooling | protoc, grpcurl, evans | curl, Postman, Swagger |
| Human readability | Binary — khó debug bằng mắt | Text — đọc thẳng được |
| Streaming | Native 4 kiểu | SSE / WebSocket riêng |
| Auth | Metadata + interceptor | Header + middleware |
| Versioning | Field number + reserved | URL path /v1, /v2 |

### Walk-through số cụ thể

Test giả định: gửi 100,000 message, mỗi cái ~500 byte payload, qua localhost.

| | REST + JSON | gRPC |
|---|---|---|
| Total wire bytes | ~55 MB | ~18 MB |
| Total time | ~4.2 s | ~0.8 s |
| Throughput | ~24k req/s | ~125k req/s |

Tỷ lệ ~5× tốc độ, ~3× băng thông. Số này thay đổi theo payload, nhưng order khá ổn định.

### Best-for matrix

| Kịch bản | Chọn |
|---|---|
| Microservice nội bộ (Go ↔ Go, Java ↔ Go) | **gRPC** |
| Mobile app → backend (Android/iOS) | **gRPC** (HTTP/2, ít data) |
| Browser SPA → backend | **REST** (hoặc gRPC-web qua proxy) |
| Public API cho đối tác | **REST** (tooling phổ biến) |
| IoT (constrained device) | **gRPC** (binary, ít byte) — nếu device đủ mạnh chạy HTTP/2 |
| Webhook (callback từ Stripe, GitHub) | **REST** (chuẩn ngành) |

### 📝 Tóm tắt mục 14

- gRPC thắng về tốc độ/băng thông/streaming/typing.
- REST thắng về human readability, browser native, tooling, public API.
- Kiến trúc lớn dùng cả hai: gRPC internal, REST external (qua gateway).

---

## 15. Common pitfalls — checklist tránh lỗi

| Pitfall | Hậu quả | Fix |
|---|---|---|
| Đổi `field_number` đã release | Wire corruption, data sai thầm lặng | Không đổi; thêm field mới, migrate |
| Quên chạy `protoc` sau đổi `.proto` | Code Go còn struct cũ → compile pass nhưng runtime bug | `make generate` trong CI, fail nếu `git diff` |
| `insecure.NewCredentials()` ở prod | Plaintext, ai sniff được cũng đọc được | TLS bắt buộc; CI grep cấm `insecure.` ở thư mục `cmd/` |
| Stream consumer chậm hơn producer | Backpressure → block → deadlock | Goroutine recv riêng + buffered channel + select với context |
| Quên close stream | Leak goroutine + connection | `defer stream.CloseSend()` client; `defer cancel()` context |
| Không embed `Unimplemented*Server` | Compile vỡ khi proto thêm method | Luôn embed |
| Trùng `field_number` | protoc báo lỗi (catch sớm) | Đặt convention 1–15 cho field hot |
| Đặt service trên domain dùng L7 LB không hiểu HTTP/2 | Stream bị cắt | Dùng envoy / nginx ≥ 1.13 / ALB-mode HTTP/2 |
| Logging request/response cả khi chứa PII | Leak data | Sanitize trong interceptor |

---

## 16. Bài tập

### BT1 — Define `.proto` cho UserService

Yêu cầu:
- Message `User` (id, name, email, role enum), `GetUserRequest`, `CreateUserRequest` (name, email), `ListUsersRequest` (page_size, page_token).
- Service `UserService` với 3 method: `GetUser` (unary), `CreateUser` (unary), `ListUsers` (server-streaming).
- Sử dụng package `user.v1`, go_package option phù hợp.

### BT2 — protoc command + dự đoán output

1. Viết lệnh `protoc` đầy đủ để sinh code Go + gRPC từ file `api/user/v1/user.proto`.
2. Liệt kê các file sinh ra và mô tả nội dung chính của từng file (struct nào, interface nào).

### BT3 — Server skeleton

Implement:
- Struct `userServer` (embed `UnimplementedUserServiceServer`, có map `db`).
- Method `GetUser`: trả `NotFound` nếu thiếu, ngược lại trả user.
- Method `CreateUser`: validate email không rỗng, gán id auto-increment.
- Method `ListUsers`: stream từng user trong db, check `stream.Context().Err()` mỗi vòng.

### BT4 — Auth interceptor

Viết unary interceptor:
- Đọc `authorization` từ metadata.
- Format expected: `Bearer <token>`.
- Validate token (giả định có hàm `validateToken(token) bool`).
- Trả `Unauthenticated` nếu thiếu / sai format / token invalid.
- Pass `userID` được parse từ token vào context bằng `context.WithValue`.

### BT5 — Field versioning (backward compatibility)

Cho proto cũ:

```proto
message User {
  int64  id    = 1;
  string name  = 2;
  string email = 3;
}
```

Yêu cầu thay đổi:
- Đổi `name` thành 2 field: `first_name` + `last_name`.
- Thêm trường `phone` (optional).
- Đảm bảo client cũ (chỉ biết `name`) vẫn đọc được response từ server mới.

Viết proto mới và mô tả strategy migration cho server.

### BT6 — gRPC vs REST: chọn cho 4 kịch bản

Cho mỗi kịch bản, chọn gRPC hoặc REST và **giải thích lý do** (≥ 2 lý do):

1. Backend API cho app mobile iOS/Android internal (cùng team).
2. Microservice `payment-service` gọi `fraud-service` (cả hai Go, cùng datacenter).
3. SPA React gọi API hiển thị dashboard người dùng.
4. Cảm biến IoT (ESP32, RAM 320KB) gửi telemetry mỗi giây.

---

## 17. Lời giải chi tiết

### Lời giải BT1

```proto
syntax = "proto3";

package user.v1;
option go_package = "example.com/api/user/v1;userv1";

enum Role {
  ROLE_UNSPECIFIED = 0;
  ROLE_USER        = 1;
  ROLE_ADMIN       = 2;
}

message User {
  int64  id    = 1;
  string name  = 2;
  string email = 3;
  Role   role  = 4;
}

message GetUserRequest {
  int64 id = 1;
}

message CreateUserRequest {
  string name  = 1;
  string email = 2;
}

message ListUsersRequest {
  int32  page_size  = 1;
  string page_token = 2;
}

service UserService {
  rpc GetUser   (GetUserRequest)    returns (User);
  rpc CreateUser(CreateUserRequest) returns (User);
  rpc ListUsers (ListUsersRequest)  returns (stream User);
}
```

**Điểm cần chú ý**:
- `ROLE_UNSPECIFIED = 0` bắt buộc với proto3 enum.
- `go_package` có `;userv1` — phần sau dấu `;` là tên package Go (import alias).
- Field number 1–4 dùng cho field hot (1 byte tag).

### Lời giải BT2

**Lệnh**:

```bash
protoc \
  --go_out=. --go_opt=paths=source_relative \
  --go-grpc_out=. --go-grpc_opt=paths=source_relative \
  api/user/v1/user.proto
```

**Output**:

- `api/user/v1/user.pb.go` — struct `User`, `GetUserRequest`, `CreateUserRequest`, `ListUsersRequest`; enum `Role` (Go type `Role` + map `Role_name`/`Role_value`); getter (`GetId()`, `GetName()`, ...); marshal/unmarshal qua `proto.Marshal`/`proto.Unmarshal`.
- `api/user/v1/user_grpc.pb.go` — interface `UserServiceServer` (3 method), struct `UnimplementedUserServiceServer` (default impl trả `Unimplemented`); interface `UserServiceClient`; func `NewUserServiceClient(conn) UserServiceClient`; helper register `RegisterUserServiceServer(s, srv)`.

Lý do tách 2 file: `protoc-gen-go` sinh `.pb.go` (message), `protoc-gen-go-grpc` sinh `_grpc.pb.go` (service). Trước v1.30 hai phần này nằm chung; tách ra để decouple version.

### Lời giải BT3

```go
package main

import (
    "context"
    "errors"
    "fmt"
    "net"
    "strings"
    "sync"
    "sync/atomic"

    "google.golang.org/grpc"
    "google.golang.org/grpc/codes"
    "google.golang.org/grpc/status"

    pb "example.com/api/user/v1"
)

type userServer struct {
    pb.UnimplementedUserServiceServer

    mu     sync.RWMutex
    nextID int64
    db     map[int64]*pb.User
}

func newUserServer() *userServer {
    return &userServer{db: make(map[int64]*pb.User)}
}

func (s *userServer) GetUser(ctx context.Context, req *pb.GetUserRequest) (*pb.User, error) {
    s.mu.RLock()
    defer s.mu.RUnlock()
    u, ok := s.db[req.GetId()]
    if !ok {
        return nil, status.Errorf(codes.NotFound, "user %d not found", req.GetId())
    }
    return u, nil
}

func (s *userServer) CreateUser(ctx context.Context, req *pb.CreateUserRequest) (*pb.User, error) {
    if strings.TrimSpace(req.GetEmail()) == "" {
        return nil, status.Error(codes.InvalidArgument, "email is required")
    }
    id := atomic.AddInt64(&s.nextID, 1)
    u := &pb.User{
        Id:    id,
        Name:  req.GetName(),
        Email: req.GetEmail(),
        Role:  pb.Role_ROLE_USER,
    }
    s.mu.Lock()
    s.db[id] = u
    s.mu.Unlock()
    return u, nil
}

func (s *userServer) ListUsers(req *pb.ListUsersRequest, stream pb.UserService_ListUsersServer) error {
    s.mu.RLock()
    users := make([]*pb.User, 0, len(s.db))
    for _, u := range s.db {
        users = append(users, u)
    }
    s.mu.RUnlock()

    for _, u := range users {
        if err := stream.Context().Err(); err != nil {
            return err
        }
        if err := stream.Send(u); err != nil {
            return err
        }
    }
    return nil
}

func main() {
    lis, err := net.Listen("tcp", ":50051")
    if err != nil {
        panic(err)
    }
    s := grpc.NewServer()
    pb.RegisterUserServiceServer(s, newUserServer())
    fmt.Println("listening :50051")
    if err := s.Serve(lis); err != nil && !errors.Is(err, grpc.ErrServerStopped) {
        panic(err)
    }
}
```

**Điểm chú ý**:
- `sync.RWMutex` cho `db` — đọc nhiều, ghi ít.
- `atomic.AddInt64` cho `nextID` — tránh race khi nhiều client tạo song song.
- `stream.Context().Err()` check trước mỗi `Send` — nếu client cancel thì dừng ngay.
- `Role_ROLE_USER` là enum value sinh bởi `protoc-gen-go` (tên = `<EnumName>_<VALUE>`).

### Lời giải BT4

```go
package middleware

import (
    "context"
    "strings"

    "google.golang.org/grpc"
    "google.golang.org/grpc/codes"
    "google.golang.org/grpc/metadata"
    "google.golang.org/grpc/status"
)

type ctxKey string

const userIDKey ctxKey = "userID"

func AuthInterceptor(validate func(token string) (userID string, ok bool)) grpc.UnaryServerInterceptor {
    return func(
        ctx context.Context, req any,
        info *grpc.UnaryServerInfo, handler grpc.UnaryHandler,
    ) (any, error) {
        md, ok := metadata.FromIncomingContext(ctx)
        if !ok {
            return nil, status.Error(codes.Unauthenticated, "missing metadata")
        }

        auths := md.Get("authorization")
        if len(auths) == 0 {
            return nil, status.Error(codes.Unauthenticated, "missing authorization header")
        }

        const prefix = "Bearer "
        if !strings.HasPrefix(auths[0], prefix) {
            return nil, status.Error(codes.Unauthenticated, "expected 'Bearer <token>'")
        }
        token := strings.TrimPrefix(auths[0], prefix)

        userID, ok := validate(token)
        if !ok {
            return nil, status.Error(codes.Unauthenticated, "invalid token")
        }

        ctx = context.WithValue(ctx, userIDKey, userID)
        return handler(ctx, req)
    }
}

// Helper cho handler đọc userID:
func UserIDFromContext(ctx context.Context) (string, bool) {
    s, ok := ctx.Value(userIDKey).(string)
    return s, ok
}
```

**Sử dụng**:

```go
s := grpc.NewServer(grpc.UnaryInterceptor(
    middleware.AuthInterceptor(func(tok string) (string, bool) {
        // parse JWT, validate signature, return claims.sub
        return "user-42", tok == "valid-token"
    }),
))
```

**Điểm chú ý**:
- Dùng `ctxKey` (private type) thay vì `string` cho context key — tránh collision giữa package.
- Hàm `validate` truyền vào → cho phép inject mock trong test.
- Không log token (PII / security risk).

### Lời giải BT5

```proto
syntax = "proto3";

package user.v1;

message User {
  reserved "name";    // tên cũ — không cho ai đặt lại
  // KHÔNG reserve field number 2 — server cũ vẫn cần đọc/ghi vào đó

  int64  id         = 1;
  string name       = 2;  // GIỮ NGUYÊN — duplicate of first_name + " " + last_name
  string email      = 3;
  string first_name = 4;  // mới
  string last_name  = 5;  // mới
  string phone      = 6;  // mới
}
```

**Strategy migration**:

1. **Server mới**:
   - Khi `CreateUser`/`UpdateUser`: nhận `first_name`+`last_name` từ client mới, hoặc `name` từ client cũ. Nếu nhận `name` → tách bằng space (best-effort) để fill `first_name`/`last_name`. Nếu nhận `first_name`/`last_name` → set `name = first_name + " " + last_name`.
   - Khi `GetUser` trả response: **set CẢ 3 field** (`name`, `first_name`, `last_name`). Client cũ đọc `name`, client mới đọc cặp mới.

2. **Sau khi không còn client cũ** (qua telemetry, sau 6 tháng chẳng hạn):
   - Reserve field `2` (cả số và tên).
   - Xoá field `name` khỏi proto.
   - Server không còn duplicate logic.

**Tại sao không đổi `name` thành `first_name`?** Vì wire format chỉ biết số: client cũ gửi `name = "Ada Lovelace"` qua field 2, server mới nếu hiểu field 2 là `first_name` thì ghi sai → corrupt. **Không bao giờ tái sử dụng field number cho ý nghĩa khác**.

### Lời giải BT6

1. **Mobile API (iOS/Android, cùng team)**: **gRPC**.
   - Binary payload nhỏ → tiết kiệm data cho user (đặc biệt thị trường emerging market dùng 3G).
   - HTTP/2 multiplex 1 connection → tốt cho mobile (đỡ overhead handshake/keep-alive).
   - Cùng team → kiểm soát được client lib (đính kèm gRPC-Swift / gRPC-Java).

2. **payment → fraud (Go ↔ Go, cùng DC)**: **gRPC**.
   - Latency-critical: payment check fraud sync, mỗi µs tính → binary nhanh hơn 3–7×.
   - Strong typing tránh bug schema mismatch khi rollout fraud-service mới.
   - Internal → không lo browser compat.

3. **SPA React → API**: **REST**.
   - Browser native fetch/axios, không cần proxy.
   - Dev tool (Chrome DevTools) hiển thị JSON đọc thẳng được → debug nhanh.
   - Nếu vẫn muốn gRPC: dùng grpc-web + envoy proxy. Phức tạp hơn, chỉ chọn khi đã có lý do mạnh.

4. **IoT ESP32 (RAM 320KB)**: **tùy** — nghiêng về **MQTT** hơn là cả gRPC lẫn REST.
   - gRPC: payload nhỏ là điểm cộng, nhưng HTTP/2 + TLS stack tốn RAM khá nhiều cho 320KB.
   - REST/JSON: text verbose → tốn band → battery.
   - MQTT (không thuộc câu hỏi): pub/sub, payload tự định nghĩa (có thể là protobuf), stack rất nhẹ → phù hợp IoT hơn.
   - Nếu **buộc** chọn 2 trong câu hỏi: gRPC vẫn tốt hơn REST cho IoT vì binary, nhưng phải ưu tiên device đủ mạnh chạy HTTP/2.

---

## 18. Code & Minh hoạ

- File code đi kèm: [solutions.go](./solutions.go) — minh hoạ pseudo-RPC qua HTTP/JSON (vì gRPC thật cần `protoc` + generated stub).
- Visualization tương tác: [visualization.html](./visualization.html) — 3 module: proto schema visualizer, animate 4 loại RPC, biểu đồ gRPC vs REST.

---

## Bài tiếp theo

- [Lesson 50 — GraphQL](../lesson-50-graphql/) — schema-first, single endpoint, client chọn field. So sánh GraphQL ↔ gRPC ↔ REST.

## Tham khảo

- [grpc.io documentation](https://grpc.io/docs/)
- [Protocol Buffers language guide (proto3)](https://protobuf.dev/programming-guides/proto3/)
- [Google API design guide — gRPC patterns](https://cloud.google.com/apis/design)
- [grpc-go GitHub](https://github.com/grpc/grpc-go)
- [gRPC-Gateway](https://grpc-ecosystem.github.io/grpc-gateway/)
