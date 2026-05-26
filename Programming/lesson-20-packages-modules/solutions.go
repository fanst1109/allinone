// Package main demo các pattern về package & module trong Go (Lesson 20).
//
// File này cố tình giữ trong MỘT FILE để chạy nhanh bằng `go run solutions.go`,
// nhưng các comment dưới đây mô phỏng cách tổ chức thực tế thành nhiều package.
//
// Bao gồm minh hoạ:
//   - Package doc comment (bạn đang đọc nó)
//   - Public (exported) vs Private (unexported) identifier
//   - init() function với log
//   - "External module pattern" — tạo UUID v4 theo idiom của github.com/google/uuid
//     (ở đây tự viết bằng crypto/rand để file chạy không cần internet/go.mod)
//
// Chạy:
//
//	go run solutions.go
//
// Bài học: Lesson 20 — Package & Module
package main

import (
	"crypto/rand"
	"fmt"
	"log"
	"strings"
)

// ============================================================
// 1. INIT FUNCTION
// ============================================================
//
// init() chạy 1 lần khi package được load. Có thể có nhiều init() —
// chạy theo thứ tự xuất hiện trong file.
//
// Pattern hợp lý: precompute, register driver, validate static config.
// Pattern xấu: I/O, đọc env, mở DB. Tránh.

// initTable mô phỏng "đăng ký vào registry" pattern.
var initTable = map[string]int{}

func init() {
	log.SetFlags(0)
	log.Println("[init #1] precompute initTable...")
	for i := 0; i < 5; i++ {
		initTable[fmt.Sprintf("key-%d", i)] = i * i
	}
}

func init() {
	log.Println("[init #2] validate static config...")
	if len(initTable) != 5 {
		// init không return error, chỉ panic.
		// Chỉ dùng panic ở init khi điều kiện thật sự không thể recover.
		panic("initTable build sai!")
	}
}

// ============================================================
// 2. PUBLIC vs PRIVATE
// ============================================================
//
// Quy tắc: chữ HOA = exported (public), chữ thường = unexported (private).
// Áp dụng cho mọi identifier: func, type, var, const, struct field, method.
//
// Để demo "private", chúng ta đặt logic tính toán ở hàm chữ thường,
// và chỉ expose API qua hàm chữ HOA. Bên ngoài (nếu file này là package
// riêng) không thể gọi normalizeName trực tiếp.

// User là struct exported. Caller bên ngoài package có thể tạo &User{...}.
type User struct {
	ID    string // exported — bên ngoài đọc/ghi được
	Name  string // exported
	email string // unexported — bên ngoài KHÔNG truy cập, buộc qua getter / constructor
}

// NewUser là constructor exported. Đây là cách duy nhất bên ngoài đặt email.
func NewUser(name, email string) *User {
	return &User{
		ID:    newUUIDv4(),
		Name:  normalizeName(name), // gọi hàm private
		email: email,
	}
}

// Email là getter exported cho field private.
// Pattern này quen thuộc khi muốn read-only từ bên ngoài.
func (u *User) Email() string { return u.email }

// normalizeName là hàm UNEXPORTED — chỉ dùng nội bộ trong package này.
// Khi bạn refactor, có thể yên tâm đổi signature mà không lo break API.
func normalizeName(s string) string {
	return strings.TrimSpace(strings.ToLower(s))
}

// ============================================================
// 3. "EXTERNAL MODULE" PATTERN — UUID v4
// ============================================================
//
// Trong dự án thật, bạn sẽ chạy:
//
//	go get github.com/google/uuid
//
// rồi:
//
//	import "github.com/google/uuid"
//	id := uuid.NewString()      // gọi func NewString() exported
//
// Để file này chạy được offline không cần go.mod, ta tự viết UUID v4
// theo cùng IDIOM (function exported, helper unexported, comment doc).
// Lý do giáo dục: minh hoạ chính xác cách "external module" được tổ chức.

// newUUIDv4 sinh UUID v4 (random) theo RFC 4122.
//
// Lưu ý: tên chữ thường → unexported. Nếu file này nằm trong package
// riêng vd `pkg/uid`, mình sẽ đổi thành NewUUIDv4 (chữ N hoa) cho
// caller bên ngoài dùng được.
func newUUIDv4() string {
	var b [16]byte
	if _, err := rand.Read(b[:]); err != nil {
		// Pattern: chỉ panic trong helper bất khả thi fail (crypto/rand
		// chỉ fail khi OS broken). Trong code thật, return (string, error).
		panic(fmt.Errorf("crypto/rand failed: %w", err))
	}
	// version (4) và variant (RFC 4122) bits
	b[6] = (b[6] & 0x0f) | 0x40
	b[8] = (b[8] & 0x3f) | 0x80
	return fmt.Sprintf("%x-%x-%x-%x-%x", b[0:4], b[4:6], b[6:8], b[8:10], b[10:16])
}

// ============================================================
// 4. EXPORTED CONSTANT, VAR, TYPE
// ============================================================

// MaxUsername là exported const. Caller import có thể dùng MaxUsername.
const MaxUsername = 64

// defaultRegion là unexported var — chỉ trong package này.
var defaultRegion = "ap-southeast-1"

// Region là exported type alias.
type Region = string

// GetDefaultRegion expose defaultRegion ra ngoài qua function (read-only).
func GetDefaultRegion() Region { return defaultRegion }

// ============================================================
// 5. INTERFACE để minh hoạ "tách interface" tránh import cycle
// ============================================================
//
// Ở bài tập 4 trong README, ta thấy import cycle giữa package user và
// package audit. Giải pháp: tách interface. Dưới đây mô phỏng:

// Auditable là interface (exported). Trong dự án thật, đặt vào package
// contracts/ trung lập — cả user/ và audit/ cùng import contracts/.
type Auditable interface {
	GetName() string
}

// GetName cho User implement Auditable. User KHÔNG cần biết Auditable
// tồn tại (implicit interface).
func (u *User) GetName() string { return u.Name }

// AuditLog mô phỏng package audit — chỉ nhận Auditable, không biết User.
// → audit/ không phải import user/ → cycle hết.
func AuditLog(a Auditable) {
	fmt.Printf("  [audit] saved: %s\n", a.GetName())
}

// ============================================================
// MAIN — chạy tất cả demo
// ============================================================

func main() {
	fmt.Println("=== Lesson 20 — Package & Module demo ===")
	fmt.Println()

	// init đã chạy xong (xem log phía trên).
	fmt.Println("initTable sau khi init chạy:")
	for i := 0; i < 5; i++ {
		k := fmt.Sprintf("key-%d", i)
		fmt.Printf("  %s => %d\n", k, initTable[k])
	}
	fmt.Println()

	// Demo public/private: tạo user qua constructor.
	u := NewUser("  Duy Nguyen  ", "duy@example.com")
	fmt.Println("User created:")
	fmt.Printf("  ID    = %s\n", u.ID) // ID exported, đọc được
	fmt.Printf("  Name  = %q (đã normalize)\n", u.Name)
	fmt.Printf("  Email = %s (truy cập qua getter)\n", u.Email())
	// u.email = "x" // ← COMPILE ERROR nếu User ở package khác (cùng package nên OK).
	fmt.Println()

	// Demo "external module idiom" — UUID v4.
	fmt.Println("Tạo 3 UUID v4 (idiom giống github.com/google/uuid):")
	for i := 0; i < 3; i++ {
		fmt.Printf("  %s\n", newUUIDv4())
	}
	fmt.Println()

	// Demo exported const + var.
	fmt.Printf("MaxUsername = %d\n", MaxUsername)
	fmt.Printf("DefaultRegion = %s\n", GetDefaultRegion())
	fmt.Println()

	// Demo "tách interface" — AuditLog nhận Auditable, không phụ thuộc User.
	fmt.Println("AuditLog gọi qua interface (không import cycle):")
	AuditLog(u)
	fmt.Println()

	fmt.Println("=== Demo xong. ===")
}
