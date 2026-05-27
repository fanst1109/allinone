// Lesson 80 — Code Review & Go Style
//
// File này minh hoạ các fix code review dưới dạng cặp "before (bad) -> after (idiomatic)".
// Mỗi cặp đặt trong một hàm để biên dịch được; comment tiếng Việt giải thích từng fix.
//
// Chạy:  go run solutions.go
// (hoặc) go vet ./...   để thấy linter bắt được gì.
package main

import (
	"errors"
	"fmt"
	"os"
	"strings"
	"sync"
)

// ---------------------------------------------------------------------------
// BT1 — Review đoạn code có 5 issue: error ignore, no defer Close,
//       magic number, deep nesting, naming/signature.
// ---------------------------------------------------------------------------

const readBufSize = 1024 // (fix 5a) magic number 1024 -> const có tên

// readDataBad là bản LỖI (chỉ để đối chiếu — không gọi nó trong production):
//
//	func ReadData(FileName string) []byte {
//	    f, _ := os.Open(FileName)        // (1) bỏ qua error -> f có thể nil -> panic
//	    data := make([]byte, 1024)       // (5) magic number
//	    n, _ := f.Read(data)             // (2) bỏ qua error
//	    if n > 0 { if data[0]=='{' { if len(data)>10 { ... } } } // (5) nested 3 tầng
//	    return data[:n]                  // (4) "có thể lỗi" nhưng không trả error
//	}
//
// readData là bản ĐÃ FIX, idiomatic.
//
// readData reads up to readBufSize bytes from path and reports the bytes read.
// (fix 4) doc comment cho hàm, tên param thường, trả về error.
func readData(path string) ([]byte, error) {
	f, err := os.Open(path) // (fix 1) check error
	if err != nil {
		return nil, fmt.Errorf("open %s: %w", path, err) // wrap với context bằng %w
	}
	defer f.Close() // (fix 3) defer Close ngay sau khi mở

	buf := make([]byte, readBufSize)
	n, err := f.Read(buf) // (fix 2) check error
	if err != nil {
		return nil, fmt.Errorf("read %s: %w", path, err)
	}

	// (fix 5b) early-return / điều kiện gộp thay 3 tầng if lồng nhau.
	if n > 10 && buf[0] == '{' {
		// chỉ là nhận diện sơ bộ "trông giống JSON"
		_ = "json"
	}
	return buf[:n], nil
}

// ---------------------------------------------------------------------------
// BT2 — Refactor hàm dài (làm 3 việc) thành các hàm nhỏ, mỗi hàm một việc.
// ---------------------------------------------------------------------------

const taxRate = 0.10 // 10% thuế — đặt tên thay magic number

// Item, Order, Totals — model đơn giản cho ví dụ.
type Item struct {
	Price float64
	Qty   int
}

type Order struct {
	ID           string
	Items        []Item
	DiscountRate float64 // 0.0 .. 1.0
}

type Totals struct {
	Subtotal float64
	Discount float64
	Tax      float64
	Grand    float64
}

// validateOrder kiểm tra đầu vào — tách riêng để test độc lập.
func validateOrder(o Order) error {
	if len(o.Items) == 0 {
		return errors.New("order has no items")
	}
	for i, it := range o.Items {
		if it.Price < 0 || it.Qty <= 0 {
			return fmt.Errorf("item %d invalid: price=%v qty=%v", i, it.Price, it.Qty)
		}
	}
	return nil
}

// computeTotals chỉ tính toán — thuần, không IO, dễ unit test.
func computeTotals(o Order) Totals {
	var sub float64
	for _, it := range o.Items {
		sub += it.Price * float64(it.Qty)
	}
	discount := sub * o.DiscountRate
	taxable := sub - discount
	return Totals{
		Subtotal: sub,
		Discount: discount,
		Tax:      taxable * taxRate,
		Grand:    taxable * (1 + taxRate),
	}
}

// formatReport chỉ lo định dạng output.
func formatReport(o Order, t Totals) string {
	var b strings.Builder
	fmt.Fprintf(&b, "Order %s\n", o.ID)
	fmt.Fprintf(&b, "  Subtotal: %.2f\n", t.Subtotal)
	fmt.Fprintf(&b, "  Discount: %.2f\n", t.Discount)
	fmt.Fprintf(&b, "  Tax:      %.2f\n", t.Tax)
	fmt.Fprintf(&b, "  Total:    %.2f\n", t.Grand)
	return b.String()
}

// Report giờ chỉ ĐIỀU PHỐI — đọc như mục lục: validate -> compute -> format.
func Report(o Order) (string, error) {
	if err := validateOrder(o); err != nil {
		return "", fmt.Errorf("validate: %w", err)
	}
	totals := computeTotals(o)
	return formatReport(o, totals), nil
}

// ---------------------------------------------------------------------------
// BT3 — Naming idiomatic. Bản "after" được đặt trong package con giả lập
//       bằng cách dùng type tên ngắn (mô phỏng package `user`).
// ---------------------------------------------------------------------------
//
// ❌ Trước:
//	package userManagement                              // mixedCaps, dài
//	type UserManagerService struct{ DB_Connection ... } // stutter + underscore
//	func (s *UserManagerService) GetUserByUserId(theUserId int) ... // stutter "User" x3
//	type IUserReader interface{ ReadUser() }            // tiền tố "I" không idiomatic
//
// ✅ Sau (giả lập trong package `main`; tên type đã bỏ stutter):

// User là một bản ghi người dùng.
type User struct {
	ID   int
	Name string
}

// userStore mô phỏng *sql.DB; tên field thường `db` trong code thật.
type userStore struct {
	rows map[int]*User
}

// Service cung cấp truy vấn người dùng. Dùng là user.Service (không stutter).
type Service struct {
	store *userStore
}

// ByID trả về user theo id. Gọi: svc.ByID(1). Param `id` ngắn cho scope nhỏ.
func (s *Service) ByID(id int) (*User, error) {
	u, ok := s.store.rows[id]
	if !ok {
		return nil, fmt.Errorf("user %d not found", id)
	}
	return u, nil
}

// Reader đọc một user — hậu tố -er thay vì tiền tố "I".
type Reader interface {
	Read() (*User, error)
}

// ---------------------------------------------------------------------------
// BT (mục 8) — Mutex copy: bug kinh điển reviewer phải bắt.
// ---------------------------------------------------------------------------

// Counter đếm an toàn giữa nhiều goroutine.
type Counter struct {
	mu sync.Mutex
	n  int
}

// Inc dùng POINTER receiver — nếu để value receiver (c Counter) thì mỗi lần gọi
// sẽ COPY cả mutex -> mất tác dụng khoá -> race. govet bắt được lỗi này.
func (c *Counter) Inc() {
	c.mu.Lock()
	c.n++
	c.mu.Unlock()
}

// Value đọc giá trị hiện tại.
func (c *Counter) Value() int {
	c.mu.Lock()
	defer c.mu.Unlock()
	return c.n
}

// ---------------------------------------------------------------------------
// Mục 9.3 — Nested sâu -> early return (guard clause).
// ---------------------------------------------------------------------------

var (
	errNilUser     = errors.New("user is nil")
	errInactive    = errors.New("user inactive")
	errZeroBalance = errors.New("zero balance")
)

type Account struct {
	Active  bool
	Balance int
}

// processBad (chỉ minh hoạ trong comment — nesting 4 tầng):
//
//	if u != nil { if u.Active { if u.Balance>0 { return charge } else {...} } else {...} } ...
//
// processGood — early return, happy path ở cuối lề trái, mỗi điều kiện loại trừ ngay.
func processGood(a *Account) error {
	if a == nil {
		return errNilUser
	}
	if !a.Active {
		return errInactive
	}
	if a.Balance <= 0 {
		return errZeroBalance
	}
	// charge(a) ...
	return nil
}

// ---------------------------------------------------------------------------
// main — demo các fix chạy được.
// ---------------------------------------------------------------------------

func main() {
	fmt.Println("=== BT2: refactor hàm dài -> nhỏ ===")
	order := Order{
		ID:           "A-001",
		Items:        []Item{{Price: 100, Qty: 2}, {Price: 50, Qty: 1}},
		DiscountRate: 0.1,
	}
	report, err := Report(order)
	if err != nil {
		fmt.Println("lỗi:", err)
	} else {
		fmt.Print(report)
	}

	// Order lỗi -> validate bắt được, không panic.
	bad := Order{ID: "A-002", Items: nil}
	if _, err := Report(bad); err != nil {
		fmt.Println("order lỗi (đúng như mong đợi):", err)
	}

	fmt.Println("\n=== BT3: naming idiomatic — user.Service.ByID ===")
	svc := &Service{store: &userStore{rows: map[int]*User{
		1: {ID: 1, Name: "Mai"},
	}}}
	if u, err := svc.ByID(1); err == nil {
		fmt.Printf("tìm thấy: %+v\n", *u)
	}
	if _, err := svc.ByID(99); err != nil {
		fmt.Println("không thấy (đúng):", err)
	}

	fmt.Println("\n=== Mục 8: Counter dùng pointer receiver (mutex không bị copy) ===")
	var c Counter
	var wg sync.WaitGroup
	for i := 0; i < 1000; i++ {
		wg.Add(1)
		go func() {
			defer wg.Done()
			c.Inc()
		}()
	}
	wg.Wait()
	fmt.Println("counter =", c.Value(), "(mong đợi 1000)")

	fmt.Println("\n=== Mục 9.3: early return ===")
	for _, a := range []*Account{
		nil,
		{Active: false},
		{Active: true, Balance: 0},
		{Active: true, Balance: 100},
	} {
		err := processGood(a)
		fmt.Printf("process(%v) -> %v\n", a, err)
	}

	// readData chỉ demo signature đúng — gọi với file không tồn tại để thấy
	// error được trả về (không panic) thay vì bị nuốt như bản bad.
	fmt.Println("\n=== BT1: readData trả error thay vì nuốt ===")
	if _, err := readData("khong-ton-tai.json"); err != nil {
		fmt.Println("đọc file lỗi (đúng — error có context):", err)
	}
}
