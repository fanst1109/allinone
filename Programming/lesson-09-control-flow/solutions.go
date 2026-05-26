// Lesson 09 — Điều kiện: if và switch
// Chạy: go run solutions.go
//
// File này demo tất cả pattern điều kiện trong Go:
// - if với init statement
// - switch multi-value và init
// - switch không expression (FizzBuzz-style)
// - Type switch
// - Early return pattern
//
// Mỗi mục có hàm riêng, gọi từ main để xem output.

package main

import (
	"errors"
	"fmt"
	"strconv"
)

// =====================================================================
// 1. if + init statement — pattern idiomatic nhất của Go
// =====================================================================

// parseAndDouble: parse string thành int rồi nhân 2.
// Dùng `if err := ...; err != nil` để giới hạn scope của err.
func parseAndDouble(s string) (int, error) {
	if n, err := strconv.Atoi(s); err != nil {
		// err chỉ tồn tại trong if/else block này
		return 0, fmt.Errorf("không parse được %q: %w", s, err)
	} else {
		// n cũng chỉ tồn tại ở đây
		return n * 2, nil
	}
}

// =====================================================================
// 2. switch multi-value — gộp nhiều giá trị vào 1 case
// =====================================================================

// classifyMonth: trả về mùa của một tháng (Bắc bán cầu).
func classifyMonth(month int) string {
	switch month {
	case 12, 1, 2:
		return "Đông"
	case 3, 4, 5:
		return "Xuân"
	case 6, 7, 8:
		return "Hè"
	case 9, 10, 11:
		return "Thu"
	default:
		return "không hợp lệ"
	}
}

// =====================================================================
// 3. switch không expression — thay if-else if chain
// =====================================================================

// fizzBuzz: trả về string FizzBuzz cho số n.
// Đây là ví dụ kinh điển của switch không expression.
func fizzBuzz(n int) string {
	switch {
	case n%15 == 0:
		return "FizzBuzz"
	case n%3 == 0:
		return "Fizz"
	case n%5 == 0:
		return "Buzz"
	default:
		return strconv.Itoa(n)
	}
}

// =====================================================================
// 4. Type switch — kiểm tra kiểu của interface{}
// =====================================================================

// describe: nhận giá trị bất kỳ, in mô tả tuỳ theo kiểu.
// Dùng `switch v := x.(type)` để v có đúng kiểu trong mỗi case.
func describe(x interface{}) string {
	switch v := x.(type) {
	case int:
		return fmt.Sprintf("int: %d (gấp đôi = %d)", v, v*2)
	case string:
		return fmt.Sprintf("string: %q (độ dài = %d)", v, len(v))
	case bool:
		return fmt.Sprintf("bool: %t", v)
	case nil:
		return "nil"
	case []int:
		return fmt.Sprintf("[]int: %v (độ dài = %d)", v, len(v))
	default:
		return fmt.Sprintf("kiểu khác: %T = %v", v, v)
	}
}

// =====================================================================
// 5. Early return — chữa pyramid of doom
// =====================================================================

// User là model giả lập để demo early return.
type User struct {
	Name       string
	Active     bool
	Permission string
	Quota      int
}

// processUserBad: phiên bản nested 4 tầng (chỉ để so sánh).
func processUserBad(u *User) error {
	if u != nil {
		if u.Active {
			if u.Permission == "write" {
				if u.Quota > 0 {
					return doWork(u)
				} else {
					return errors.New("quota hết")
				}
			} else {
				return errors.New("không có quyền write")
			}
		} else {
			return errors.New("user bị khoá")
		}
	} else {
		return errors.New("nil user")
	}
}

// processUserGood: phiên bản early return — happy path ở indent 0.
// Đây là style Go idiomatic.
func processUserGood(u *User) error {
	if u == nil {
		return errors.New("nil user")
	}
	if !u.Active {
		return errors.New("user bị khoá")
	}
	if u.Permission != "write" {
		return errors.New("không có quyền write")
	}
	if u.Quota <= 0 {
		return errors.New("quota hết")
	}
	// Happy path
	return doWork(u)
}

func doWork(u *User) error {
	fmt.Printf("  → đã xử lý cho user %q (quota còn %d)\n", u.Name, u.Quota)
	return nil
}

// =====================================================================
// 6. Short-circuit: nil check ĐÚNG thứ tự
// =====================================================================

// greet: đặt nil check ở VẾ TRÁI của && để short-circuit cứu khỏi panic.
func greet(u *User) string {
	if u != nil && u.Name != "" {
		return "Xin chào, " + u.Name
	}
	return "Xin chào, khách"
}

// =====================================================================
// main — chạy từng demo
// =====================================================================

func main() {
	fmt.Println("=== 1. if + init statement ===")
	for _, s := range []string{"42", "100", "abc"} {
		if result, err := parseAndDouble(s); err != nil {
			fmt.Printf("  %q → lỗi: %v\n", s, err)
		} else {
			fmt.Printf("  %q → %d\n", s, result)
		}
	}

	fmt.Println("\n=== 2. switch multi-value ===")
	for _, m := range []int{1, 4, 7, 10, 13} {
		fmt.Printf("  tháng %d → %s\n", m, classifyMonth(m))
	}

	fmt.Println("\n=== 3. switch không expression (FizzBuzz) ===")
	for i := 1; i <= 15; i++ {
		fmt.Printf("  %2d → %s\n", i, fizzBuzz(i))
	}

	fmt.Println("\n=== 4. Type switch ===")
	for _, x := range []interface{}{
		42, "hello", true, nil, 3.14, []int{1, 2, 3},
	} {
		fmt.Printf("  %v\n", describe(x))
	}

	fmt.Println("\n=== 5. Early return ===")
	users := []*User{
		nil,
		{Name: "Alice", Active: false},
		{Name: "Bob", Active: true, Permission: "read"},
		{Name: "Carol", Active: true, Permission: "write", Quota: 0},
		{Name: "Dave", Active: true, Permission: "write", Quota: 5},
	}
	for _, u := range users {
		var label string
		if u == nil {
			label = "nil"
		} else {
			label = u.Name
		}
		if err := processUserGood(u); err != nil {
			fmt.Printf("  %s → lỗi: %v\n", label, err)
		}
	}

	fmt.Println("\n=== 6. Short-circuit nil check ===")
	for _, u := range []*User{
		nil,
		{Name: ""},
		{Name: "Eve"},
	} {
		fmt.Printf("  %s\n", greet(u))
	}
}
