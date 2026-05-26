// Lesson 49 — gRPC & Protocol Buffers: solutions.go
//
// gRPC THẬT cần `protoc` + plugin sinh stub (user.pb.go, user_grpc.pb.go) +
// các package google.golang.org/grpc, google.golang.org/protobuf. Để file này
// BIÊN DỊCH ĐƯỢC mà không cần cài protoc hay module ngoài, ở đây ta mô phỏng
// (pseudo-RPC) toàn bộ KHÁI NIỆM của gRPC chỉ bằng stdlib:
//
//   - Transport     : net/http (HTTP/1.1) thay cho HTTP/2 của gRPC.
//   - Serialization : encoding/json thay cho Protocol Buffers (binary).
//   - 4 loại RPC    : unary + server-stream (newline-delimited JSON / NDJSON,
//                     giống cách gRPC chia frame trên 1 stream).
//   - Interceptor   : closure middleware bọc handler (đúng pattern gRPC).
//   - Metadata      : HTTP header (gRPC metadata bản chất CŨNG là HTTP/2 header).
//
// Mục tiêu: chạy được ngay (`go run solutions.go`) để THẤY pattern hoạt động.
// Code gRPC THẬT tương ứng nằm trong block comment "=== gRPC THẬT ===" ở mỗi mục.
//
// Chạy: go run solutions.go
//   - Lên server :50051 (HTTP), tự gọi client minh hoạ 4 kịch bản rồi in kết quả.
//
//go:build ignore

package main

import (
	"bufio"
	"bytes"
	"context"
	"encoding/json"
	"fmt"
	"io"
	"log"
	"net/http"
	"strings"
	"sync"
	"sync/atomic"
	"time"
)

// =============================================================================
// 1. MESSAGE & SERVICE — tương đương message/service trong .proto
// =============================================================================
//
// === gRPC THẬT (user.proto) ===
//
//	message User { int64 id = 1; string name = 2; string email = 3; Role role = 4; }
//	enum Role { ROLE_UNSPECIFIED = 0; ROLE_USER = 1; ROLE_ADMIN = 2; }
//	message GetUserRequest    { int64 id = 1; }
//	message CreateUserRequest { string name = 1; string email = 2; }
//	message ListUsersRequest  { int32 page_size = 1; string page_token = 2; }
//	service UserService {
//	  rpc GetUser   (GetUserRequest)   returns (User);          // unary
//	  rpc CreateUser(CreateUserRequest) returns (User);         // unary
//	  rpc ListUsers (ListUsersRequest) returns (stream User);   // server-stream
//	  rpc UploadTags(stream TagChunk)  returns (UploadResult);  // client-stream
//	  rpc Chat      (stream ChatMsg)   returns (stream ChatMsg); // bidi
//	}
//
// Ở pseudo-RPC, "message" chỉ là struct Go marshal qua JSON. Field number của
// protobuf KHÔNG có ở đây — JSON dùng tên field, đó chính là khác biệt cốt lõi
// (xem README mục 3: field_number = danh tính vĩnh viễn trên dây).

type Role int

const (
	RoleUnspecified Role = iota // = 0, bắt buộc trong proto3 enum
	RoleUser
	RoleAdmin
)

type User struct {
	ID    int64  `json:"id"`
	Name  string `json:"name"`
	Email string `json:"email"`
	Role  Role   `json:"role"`
}

type GetUserRequest struct {
	ID int64 `json:"id"`
}

type CreateUserRequest struct {
	Name  string `json:"name"`
	Email string `json:"email"`
}

// =============================================================================
// 2. METADATA — tương đương gRPC metadata (bản chất là HTTP header)
// =============================================================================
//
// === gRPC THẬT ===
//
//	// Client gửi:
//	md  := metadata.New(map[string]string{"authorization": "Bearer xxx"})
//	ctx  = metadata.NewOutgoingContext(ctx, md)
//	// Server đọc:
//	md, _ := metadata.FromIncomingContext(ctx)
//	tokens := md.Get("authorization")
//
// Ở pseudo-RPC ta dùng thẳng http.Header. gRPC metadata KEY case-insensitive
// (chuẩn hoá lowercase) — http.Header cũng canonicalize key, nên hành vi rất sát.

// =============================================================================
// 3. INTERCEPTOR — closure middleware bọc quanh mỗi RPC
// =============================================================================
//
// === gRPC THẬT (unary server interceptor) ===
//
//	func loggingInterceptor(ctx context.Context, req any,
//	    info *grpc.UnaryServerInfo, handler grpc.UnaryHandler) (any, error) {
//	    start := time.Now()
//	    resp, err := handler(ctx, req)
//	    log.Printf("rpc=%s dur=%s err=%v", info.FullMethod, time.Since(start), err)
//	    return resp, err
//	}
//	s := grpc.NewServer(grpc.ChainUnaryInterceptor(loggingInterceptor, authInterceptor))
//
// Pattern: interceptor nhận handler "thật", trả về handler "đã bọc". Chain =
// a(b(c(handler))) → chạy a → b → c → handler → c → b → a (giống HTTP middleware).
//
// Ở pseudo-RPC ta mô phỏng đúng pattern đó bằng signature unaryHandler/Interceptor.

// unaryHandler là "RPC handler thật" — nhận context (mang metadata) + request,
// trả về response hoặc error.
type unaryHandler func(ctx context.Context, req any) (any, error)

// unaryInterceptor bọc một handler, trả handler mới. fullMethod giống info.FullMethod.
type unaryInterceptor func(fullMethod string, next unaryHandler) unaryHandler

// chainUnary nối nhiều interceptor: chain(a, b, c)(h) = a(b(c(h))).
// Khi gọi, thứ tự thực thi pre-logic là a → b → c → h (giống grpc.ChainUnaryInterceptor).
func chainUnary(fullMethod string, h unaryHandler, ics ...unaryInterceptor) unaryHandler {
	for i := len(ics) - 1; i >= 0; i-- {
		h = ics[i](fullMethod, h)
	}
	return h
}

// loggingInterceptor — log method + duration + err (BT: logging interceptor).
func loggingInterceptor(fullMethod string, next unaryHandler) unaryHandler {
	return func(ctx context.Context, req any) (any, error) {
		start := time.Now()
		resp, err := next(ctx, req)
		log.Printf("[interceptor] rpc=%s dur=%s err=%v", fullMethod, time.Since(start).Round(time.Microsecond), err)
		return resp, err
	}
}

// ctxKey là private type cho context key — tránh collision giữa package
// (xem lời giải BT4 trong README).
type ctxKey string

const userIDKey ctxKey = "userID"

// authInterceptor — đọc "authorization" từ metadata (header trong ctx),
// validate "Bearer <token>", nhét userID vào context (BT4).
func authInterceptor(validate func(token string) (userID string, ok bool)) unaryInterceptor {
	return func(fullMethod string, next unaryHandler) unaryHandler {
		return func(ctx context.Context, req any) (any, error) {
			md := mdFromContext(ctx)
			auths := md.Values("authorization") // case-insensitive như gRPC
			if len(auths) == 0 {
				return nil, &rpcError{Code: "Unauthenticated", Msg: "missing authorization header"}
			}
			const prefix = "Bearer "
			if !strings.HasPrefix(auths[0], prefix) {
				return nil, &rpcError{Code: "Unauthenticated", Msg: "expected 'Bearer <token>'"}
			}
			token := strings.TrimPrefix(auths[0], prefix)
			userID, ok := validate(token)
			if !ok {
				return nil, &rpcError{Code: "Unauthenticated", Msg: "invalid token"}
			}
			ctx = context.WithValue(ctx, userIDKey, userID)
			return next(ctx, req)
		}
	}
}

// rpcError mô phỏng status.Error(codes.X, msg) của gRPC.
type rpcError struct {
	Code string `json:"code"` // "OK", "NotFound", "InvalidArgument", "Unauthenticated"...
	Msg  string `json:"msg"`
}

func (e *rpcError) Error() string { return e.Code + ": " + e.Msg }

// =============================================================================
// 4. SERVER — implement "service" + 4 loại RPC
// =============================================================================

type userServer struct {
	mu     sync.RWMutex
	nextID int64
	db     map[int64]*User
}

func newUserServer() *userServer {
	return &userServer{db: make(map[int64]*User)}
}

// --- Unary: GetUser ---
// === gRPC THẬT ===
//
//	func (s *userServer) GetUser(ctx context.Context, req *pb.GetUserRequest) (*pb.User, error) {
//	    u, ok := s.db[req.GetId()]
//	    if !ok { return nil, status.Errorf(codes.NotFound, "user %d not found", req.GetId()) }
//	    return u, nil
//	}
func (s *userServer) GetUser(ctx context.Context, req *GetUserRequest) (*User, error) {
	s.mu.RLock()
	defer s.mu.RUnlock()
	u, ok := s.db[req.ID]
	if !ok {
		return nil, &rpcError{Code: "NotFound", Msg: fmt.Sprintf("user %d not found", req.ID)}
	}
	return u, nil
}

// --- Unary: CreateUser (validate email, auto-increment id) ---
func (s *userServer) CreateUser(ctx context.Context, req *CreateUserRequest) (*User, error) {
	if strings.TrimSpace(req.Email) == "" {
		return nil, &rpcError{Code: "InvalidArgument", Msg: "email is required"}
	}
	id := atomic.AddInt64(&s.nextID, 1)
	u := &User{ID: id, Name: req.Name, Email: req.Email, Role: RoleUser}
	s.mu.Lock()
	s.db[id] = u
	s.mu.Unlock()
	return u, nil
}

// --- Server-streaming: ListUsers gửi từng user qua thời gian ---
// === gRPC THẬT ===
//
//	func (s *userServer) ListUsers(req *pb.ListUsersRequest, stream pb.UserService_ListUsersServer) error {
//	    for _, u := range s.db {
//	        if err := stream.Context().Err(); err != nil { return err } // client cancel
//	        if err := stream.Send(u); err != nil { return err }
//	    }
//	    return nil // EOF → client nhận io.EOF
//	}
//
// Ở pseudo-RPC, "stream.Send" = ghi 1 dòng NDJSON xuống http.ResponseWriter rồi
// Flush (đẩy ngay xuống socket, không buffer). Client đọc từng dòng = từng "frame".
func (s *userServer) ListUsers(ctx context.Context, send func(*User) error) error {
	s.mu.RLock()
	users := make([]*User, 0, len(s.db))
	for _, u := range s.db {
		users = append(users, u)
	}
	s.mu.RUnlock()

	for _, u := range users {
		if err := ctx.Err(); err != nil { // client đã huỷ → dừng
			return err
		}
		if err := send(u); err != nil {
			return err
		}
		time.Sleep(80 * time.Millisecond) // giả lập "trả về N user qua thời gian"
	}
	return nil
}

// =============================================================================
// 5. HTTP wiring — biến server thành endpoint (transport layer)
// =============================================================================

// mdFromContext lấy metadata (http.Header) đã nhét vào context bởi transport.
func mdFromContext(ctx context.Context) http.Header {
	md, _ := ctx.Value(mdKey).(http.Header)
	if md == nil {
		return http.Header{}
	}
	return md
}

type mdKeyType struct{}

var mdKey mdKeyType

// writeRPCError map rpcError.Code → HTTP status (giống gRPC map code → HTTP/2 status).
func writeRPCError(w http.ResponseWriter, err error) {
	re, ok := err.(*rpcError)
	if !ok {
		re = &rpcError{Code: "Internal", Msg: err.Error()}
	}
	code := map[string]int{
		"NotFound":        http.StatusNotFound,
		"InvalidArgument": http.StatusBadRequest,
		"Unauthenticated": http.StatusUnauthorized,
		"Internal":        http.StatusInternalServerError,
	}[re.Code]
	if code == 0 {
		code = http.StatusInternalServerError
	}
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(code)
	_ = json.NewEncoder(w).Encode(re)
}

func main() {
	srv := newUserServer()

	// interceptor chain dùng cho mọi UNARY call: logging → auth → handler.
	interceptors := []unaryInterceptor{
		loggingInterceptor,
		authInterceptor(func(tok string) (string, bool) {
			// giả lập validate JWT: chỉ "valid-token" hợp lệ.
			return "user-42", tok == "valid-token"
		}),
	}

	mux := http.NewServeMux()

	// Unary endpoint: GetUser
	mux.HandleFunc("/UserService/GetUser", func(w http.ResponseWriter, r *http.Request) {
		ctx := context.WithValue(r.Context(), mdKey, r.Header) // header = metadata
		var req GetUserRequest
		_ = json.NewDecoder(r.Body).Decode(&req)
		h := chainUnary("/UserService/GetUser", func(ctx context.Context, raw any) (any, error) {
			return srv.GetUser(ctx, raw.(*GetUserRequest))
		}, interceptors...)
		resp, err := h(ctx, &req)
		if err != nil {
			writeRPCError(w, err)
			return
		}
		_ = json.NewEncoder(w).Encode(resp)
	})

	// Unary endpoint: CreateUser
	mux.HandleFunc("/UserService/CreateUser", func(w http.ResponseWriter, r *http.Request) {
		ctx := context.WithValue(r.Context(), mdKey, r.Header)
		var req CreateUserRequest
		_ = json.NewDecoder(r.Body).Decode(&req)
		h := chainUnary("/UserService/CreateUser", func(ctx context.Context, raw any) (any, error) {
			return srv.CreateUser(ctx, raw.(*CreateUserRequest))
		}, interceptors...)
		resp, err := h(ctx, &req)
		if err != nil {
			writeRPCError(w, err)
			return
		}
		_ = json.NewEncoder(w).Encode(resp)
	})

	// Server-streaming endpoint: ListUsers (NDJSON — mỗi dòng 1 "frame").
	mux.HandleFunc("/UserService/ListUsers", func(w http.ResponseWriter, r *http.Request) {
		flusher, ok := w.(http.Flusher)
		if !ok {
			http.Error(w, "streaming unsupported", http.StatusInternalServerError)
			return
		}
		w.Header().Set("Content-Type", "application/x-ndjson")
		enc := json.NewEncoder(w)
		err := srv.ListUsers(r.Context(), func(u *User) error {
			if e := enc.Encode(u); e != nil { // ghi 1 dòng JSON
				return e
			}
			flusher.Flush() // stream.Send: đẩy ngay xuống socket
			return nil
		})
		if err != nil {
			log.Printf("[server] ListUsers stream err: %v", err)
		}
	})

	httpSrv := &http.Server{Addr: "127.0.0.1:50051", Handler: mux}
	go func() {
		if err := httpSrv.ListenAndServe(); err != nil && err != http.ErrServerClosed {
			log.Fatal(err)
		}
	}()
	time.Sleep(150 * time.Millisecond) // chờ server lên (demo cho đơn giản)

	runClientDemo()

	_ = httpSrv.Close()
}

// =============================================================================
// 6. CLIENT — gọi 4 kịch bản (unary OK, unary lỗi auth, unary NotFound, stream)
// =============================================================================
//
// === gRPC THẬT (client) ===
//
//	conn, _ := grpc.NewClient("localhost:50051", grpc.WithTransportCredentials(insecure.NewCredentials()))
//	client := pb.NewUserServiceClient(conn)
//	md  := metadata.New(map[string]string{"authorization": "Bearer valid-token"})
//	ctx  = metadata.NewOutgoingContext(ctx, md)
//	user, err := client.GetUser(ctx, &pb.GetUserRequest{Id: 1})   // unary
//	stream, _ := client.ListUsers(ctx, &pb.ListUsersRequest{})    // server-stream
//	for { u, err := stream.Recv(); if err == io.EOF { break }; ... }

const base = "http://127.0.0.1:50051"

// callUnary gửi 1 request JSON kèm metadata (header), nhận 1 response.
func callUnary(method, token string, reqBody any) (string, error) {
	b, _ := json.Marshal(reqBody)
	req, _ := http.NewRequest(http.MethodPost, base+method, bytes.NewReader(b))
	if token != "" {
		req.Header.Set("Authorization", "Bearer "+token) // metadata
	}
	resp, err := http.DefaultClient.Do(req)
	if err != nil {
		return "", err
	}
	defer resp.Body.Close()
	body, _ := io.ReadAll(resp.Body)
	return fmt.Sprintf("HTTP %d  %s", resp.StatusCode, strings.TrimSpace(string(body))), nil
}

func runClientDemo() {
	fmt.Println("=== Demo gRPC patterns (pseudo-RPC qua HTTP/JSON) ===")

	// 1) CreateUser — unary OK (có token hợp lệ).
	fmt.Println("\n[1] CreateUser (token OK) — UNARY:")
	out, _ := callUnary("/UserService/CreateUser", "valid-token", CreateUserRequest{Name: "Ada", Email: "ada@x.io"})
	fmt.Println("   →", out)

	// 2) CreateUser — thiếu token → auth interceptor chặn (Unauthenticated).
	fmt.Println("\n[2] CreateUser (KHÔNG token) — interceptor auth chặn:")
	out, _ = callUnary("/UserService/CreateUser", "", CreateUserRequest{Name: "Bob", Email: "bob@x.io"})
	fmt.Println("   →", out)

	// 3) GetUser id không tồn tại → NotFound.
	fmt.Println("\n[3] GetUser id=999 (token OK) — typed error NotFound:")
	out, _ = callUnary("/UserService/GetUser", "valid-token", GetUserRequest{ID: 999})
	fmt.Println("   →", out)

	// Tạo thêm vài user để stream có dữ liệu.
	_, _ = callUnary("/UserService/CreateUser", "valid-token", CreateUserRequest{Name: "Linus", Email: "linus@x.io"})
	_, _ = callUnary("/UserService/CreateUser", "valid-token", CreateUserRequest{Name: "Grace", Email: "grace@x.io"})

	// 4) ListUsers — SERVER-STREAM: đọc từng "frame" NDJSON đến EOF.
	fmt.Println("\n[4] ListUsers — SERVER-STREAM (đọc từng frame đến EOF):")
	resp, err := http.Get(base + "/UserService/ListUsers")
	if err != nil {
		fmt.Println("   stream err:", err)
		return
	}
	defer resp.Body.Close()
	sc := bufio.NewScanner(resp.Body)
	n := 0
	for sc.Scan() { // mỗi dòng = 1 stream.Recv()
		var u User
		if json.Unmarshal(sc.Bytes(), &u) == nil {
			n++
			fmt.Printf("   ← frame %d: id=%d name=%s\n", n, u.ID, u.Name)
		}
	}
	fmt.Printf("   (EOF — nhận %d frame)\n", n)
}
