// Lesson 69 — Microservice Patterns
//
// File này minh họa CỐT LÕI của 4 pattern microservice bằng Go THUẦN,
// KHÔNG cần network thật — mọi "service" là hàm in-memory:
//
//  1. API Gateway aggregation : fan-out 3 service SONG SONG, gom thành 1 response
//  2. Anti-corruption layer   : dịch model legacy (CUST_*) sang model sạch
//  3. Strangler fig router    : route theo prefix, migrate dần old -> new, rollback được
//  4. BFF (Backend for Frontend): cùng data, payload may đo cho web vs mobile
//
// Mục đích: hiểu CÁCH các pattern hoạt động. Trong production, các "service"
// này là process riêng gọi nhau qua REST/gRPC (xem comment cuối file).
//
// Chạy:  go run solutions.go
package main

import (
	"fmt"
	"strconv"
	"strings"
	"sync"
	"time"
)

// ===========================================================================
// MOCK SERVICES — mỗi service own "database" riêng (in-memory).
// Đây là minh họa "database per service": KHÔNG service nào đọc map của service
// khác trực tiếp; chúng "gọi" nhau qua các hàm Get* (mô phỏng REST/gRPC call).
// ===========================================================================

// --- OrderService + order_db ---
type Order struct {
	OrderID string
	UserID  string
	Items   []string
	Total   int // đơn vị: nghìn đồng
}

var orderDB = map[string]Order{
	"o1001": {OrderID: "o1001", UserID: "u42", Items: []string{"Sách Go", "Bàn phím"}, Total: 850},
}

// GetOrder mô phỏng OrderService trả về đơn (kèm độ trễ network ~40ms).
func GetOrder(orderID string) (Order, bool) {
	time.Sleep(40 * time.Millisecond)
	o, ok := orderDB[orderID]
	return o, ok
}

// --- UserService + user_db ---
type User struct {
	UserID string
	Name   string
	Email  string
}

var userDB = map[string]User{
	"u42": {UserID: "u42", Name: "Nguyen Van A", Email: "a@example.com"},
}

// GetUser mô phỏng UserService (~35ms).
func GetUser(userID string) (User, bool) {
	time.Sleep(35 * time.Millisecond)
	u, ok := userDB[userID]
	return u, ok
}

// --- ShippingService + shipping_db ---
type Shipping struct {
	OrderID  string
	Status   string
	Tracking string
}

var shippingDB = map[string]Shipping{
	"o1001": {OrderID: "o1001", Status: "in_transit", Tracking: "VN-7788-XYZ"},
}

// GetShipping mô phỏng ShippingService (~40ms).
func GetShipping(orderID string) (Shipping, bool) {
	time.Sleep(40 * time.Millisecond)
	s, ok := shippingDB[orderID]
	return s, ok
}

// ===========================================================================
// 1. API GATEWAY — AGGREGATION (BT2)
//
// Màn "chi tiết đơn hàng" cần dữ liệu từ 3 service. Gateway fan-out SONG SONG
// rồi gom thành 1 response. Tuần tự = 40+35+40 = 115ms; song song = ~40ms.
// ===========================================================================

// OrderDetail là response tổng hợp gateway trả về client.
type OrderDetail struct {
	Order    Order
	User     User
	Shipping Shipping
}

// AggregateOrderDetail gom 3 service call thành 1 response.
//
// Ở đây Order phải xong TRƯỚC để lấy UserID (data dependency thật), sau đó
// User và Shipping chạy song song. Nếu không có dependency, cả 3 có thể song song.
func AggregateOrderDetail(orderID string) (OrderDetail, error) {
	// Bước 1: gọi Order trước (cần UserID của nó).
	order, ok := GetOrder(orderID)
	if !ok {
		return OrderDetail{}, fmt.Errorf("order %q không tồn tại", orderID)
	}

	// Bước 2: fan-out User + Shipping SONG SONG.
	var (
		wg       sync.WaitGroup
		user     User
		shipping Shipping
	)
	wg.Add(2)
	go func() {
		defer wg.Done()
		user, _ = GetUser(order.UserID)
	}()
	go func() {
		defer wg.Done()
		shipping, _ = GetShipping(orderID)
	}()
	wg.Wait()

	return OrderDetail{Order: order, User: user, Shipping: shipping}, nil
}

func demoGateway() {
	fmt.Println("=== 1. API GATEWAY — AGGREGATION ===")

	start := time.Now()
	detail, err := AggregateOrderDetail("o1001")
	elapsed := time.Since(start)
	if err != nil {
		fmt.Println("Lỗi:", err)
		return
	}
	fmt.Printf("1 request -> gateway fan-out 3 service, mất %v (song song, không phải ~115ms tuần tự)\n", elapsed.Round(time.Millisecond))
	fmt.Printf("  Order   : %s, total %dk, items=%v\n", detail.Order.OrderID, detail.Order.Total, detail.Order.Items)
	fmt.Printf("  User    : %s <%s>\n", detail.User.Name, detail.User.Email)
	fmt.Printf("  Shipping: %s (tracking %s)\n", detail.Shipping.Status, detail.Shipping.Tracking)
	fmt.Println()
}

// ===========================================================================
// 2. ANTI-CORRUPTION LAYER (BT4)
//
// Dịch model legacy (UPPER, padding 0, mã trạng thái) sang model sạch.
// Toàn bộ kiến thức về CUST_* bị "nhốt" trong adapter này.
// ===========================================================================

// LegacyCustomer là model "bẩn" từ hệ CRM cũ.
type LegacyCustomer struct {
	CustID string // "00042" — có padding 0
	CustNm string // "NGUYEN VAN A" — UPPER
	StatCd string // "A" = active, "I" = inactive
}

// Customer là model sạch của hệ mới.
type Customer struct {
	ID     int
	Name   string
	Active bool
}

// TranslateLegacyCustomer là ACL: dịch từng field.
func TranslateLegacyCustomer(l LegacyCustomer) Customer {
	// "00042" -> 42 (bỏ padding 0).
	id, _ := strconv.Atoi(strings.TrimLeft(l.CustID, "0"))
	return Customer{
		ID:     id,
		Name:   titleCase(l.CustNm), // "NGUYEN VAN A" -> "Nguyen Van A"
		Active: l.StatCd == "A",     // "A" -> true, còn lại -> false
	}
}

// titleCase: viết hoa chữ cái đầu mỗi từ, còn lại thường.
func titleCase(s string) string {
	words := strings.Fields(strings.ToLower(s))
	for i, w := range words {
		if w == "" {
			continue
		}
		words[i] = strings.ToUpper(w[:1]) + w[1:]
	}
	return strings.Join(words, " ")
}

func demoACL() {
	fmt.Println("=== 2. ANTI-CORRUPTION LAYER ===")
	legacy := LegacyCustomer{CustID: "00042", CustNm: "NGUYEN VAN A", StatCd: "A"}
	clean := TranslateLegacyCustomer(legacy)
	fmt.Printf("Legacy: %+v\n", legacy)
	fmt.Printf("  -> dịch qua ACL ->\n")
	fmt.Printf("Sạch  : %+v\n", clean)
	fmt.Println("  (core domain chỉ thấy Customer{ID,Name,Active}, không biết CUST_* là gì)")
	fmt.Println()
}

// ===========================================================================
// 3. STRANGLER FIG ROUTER (BT3)
//
// Router giữ bảng prefix -> backend. Migrate dần bằng cách đổi mapping.
// Rollback = đổi mapping ngược về "monolith".
// ===========================================================================

// StranglerRouter route request theo prefix path tới backend (tên backend).
type StranglerRouter struct {
	// routes: prefix -> tên backend. Có thứ tự ưu tiên: prefix khớp DÀI nhất thắng.
	routes   map[string]string
	fallback string // backend mặc định (thường là "Monolith")
}

func NewStranglerRouter(fallback string) *StranglerRouter {
	return &StranglerRouter{routes: map[string]string{}, fallback: fallback}
}

// Migrate gán một prefix sang backend mới (vd "/users" -> "UserService").
func (r *StranglerRouter) Migrate(prefix, backend string) {
	r.routes[prefix] = backend
}

// Rollback đưa một prefix về fallback (Monolith) — không downtime lớn.
func (r *StranglerRouter) Rollback(prefix string) {
	delete(r.routes, prefix)
}

// Route trả về backend xử lý path. Chọn prefix khớp DÀI nhất.
func (r *StranglerRouter) Route(path string) string {
	best := ""
	for prefix := range r.routes {
		if strings.HasPrefix(path, prefix) && len(prefix) > len(best) {
			best = prefix
		}
	}
	if best == "" {
		return r.fallback
	}
	return r.routes[best]
}

func demoStrangler() {
	fmt.Println("=== 3. STRANGLER FIG ROUTER ===")
	r := NewStranglerRouter("Monolith")

	paths := []string{"/users/42", "/orders/7", "/payments/9"}

	fmt.Println("Giai đoạn 0 (chưa migrate gì):")
	for _, p := range paths {
		fmt.Printf("  %-14s -> %s\n", p, r.Route(p))
	}

	fmt.Println("Giai đoạn 1 (migrate /users -> UserService):")
	r.Migrate("/users", "UserService")
	for _, p := range paths {
		fmt.Printf("  %-14s -> %s\n", p, r.Route(p))
	}

	fmt.Println("Giai đoạn 2 (migrate thêm /orders -> OrderService):")
	r.Migrate("/orders", "OrderService")
	for _, p := range paths {
		fmt.Printf("  %-14s -> %s\n", p, r.Route(p))
	}

	fmt.Println("Rollback /users (UserService lỗi -> về Monolith ngay):")
	r.Rollback("/users")
	fmt.Printf("  %-14s -> %s\n", "/users/42", r.Route("/users/42"))
	fmt.Println()
}

// ===========================================================================
// 4. BACKEND FOR FRONTEND (BFF)
//
// Cùng dữ liệu (Order) nhưng payload may đo theo client:
//  - BFF-Web   : đầy đủ (màn rộng).
//  - BFF-Mobile: gọn (chỉ field cần, mạng yếu/pin).
// ===========================================================================

// BFFWebPayload — đầy đủ cho dashboard web.
type BFFWebPayload struct {
	OrderID   string
	UserName  string
	UserEmail string
	Items     []string
	Total     int
	Shipping  string
	Tracking  string
}

// BFFMobilePayload — gọn cho mobile.
type BFFMobilePayload struct {
	OrderID string
	Total   int
	Status  string // chỉ trạng thái, không kèm tracking dài
}

// BuildWebPayload gom dữ liệu đầy đủ cho web.
func BuildWebPayload(orderID string) (BFFWebPayload, error) {
	d, err := AggregateOrderDetail(orderID)
	if err != nil {
		return BFFWebPayload{}, err
	}
	return BFFWebPayload{
		OrderID:   d.Order.OrderID,
		UserName:  d.User.Name,
		UserEmail: d.User.Email,
		Items:     d.Order.Items,
		Total:     d.Order.Total,
		Shipping:  d.Shipping.Status,
		Tracking:  d.Shipping.Tracking,
	}, nil
}

// BuildMobilePayload chỉ lấy field tối thiểu.
func BuildMobilePayload(orderID string) (BFFMobilePayload, error) {
	d, err := AggregateOrderDetail(orderID)
	if err != nil {
		return BFFMobilePayload{}, err
	}
	return BFFMobilePayload{
		OrderID: d.Order.OrderID,
		Total:   d.Order.Total,
		Status:  d.Shipping.Status,
	}, nil
}

func demoBFF() {
	fmt.Println("=== 4. BACKEND FOR FRONTEND (BFF) ===")
	web, _ := BuildWebPayload("o1001")
	mob, _ := BuildMobilePayload("o1001")
	fmt.Printf("BFF-Web   (đầy đủ): %+v\n", web)
	fmt.Printf("BFF-Mobile (gọn) : %+v\n", mob)
	fmt.Println("  (cùng backend, payload may đo theo client)")
	fmt.Println()
}

// ===========================================================================
// MAIN
// ===========================================================================

func main() {
	demoGateway()
	demoACL()
	demoStrangler()
	demoBFF()

	fmt.Println("--- Ghi chú production ---")
	fmt.Println("Các 'service' ở đây là hàm in-memory. Thực tế chúng là process riêng:")
	fmt.Println("  - giao tiếp sync qua REST (net/http) hoặc gRPC (google.golang.org/grpc)")
	fmt.Println("  - giao tiếp async qua message queue (Kafka/NATS — xem Lesson 64)")
	fmt.Println("  - mỗi service own database riêng (database per service)")
	fmt.Println("  - gateway thật: Kong/Envoy/Nginx; resilience: sony/gobreaker (circuit breaker)")
}
