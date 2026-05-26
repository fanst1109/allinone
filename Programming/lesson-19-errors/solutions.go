// Lesson 19 — Error Handling: solutions.go
//
// File tổng hợp toàn bộ pattern + lời giải bài tập của lesson.
// Chạy: go run solutions.go
//
// Lưu ý: file dùng một số path tạm (/tmp/...) cho demo WriteJSON.
// Trên Windows, đổi sang os.TempDir().

package main

import (
	"database/sql"
	"encoding/json"
	"errors"
	"fmt"
	"io"
	"log"
	"net/http"
	"net/http/httptest"
	"os"
	"path/filepath"
	"strconv"
	"strings"
)

// =====================================================================
// Mục 3 — 5 pattern cơ bản
// =====================================================================

// (1) Parse số nguyên từ user input.
func ageFromInput(s string) (int, error) {
	age, err := strconv.Atoi(s)
	if err != nil {
		return 0, fmt.Errorf("tuổi không hợp lệ: %w", err)
	}
	if age < 0 || age > 150 {
		return 0, fmt.Errorf("tuổi ngoài khoảng [0,150]: %d", age)
	}
	return age, nil
}

// (5) Decode JSON.
type Config struct {
	Host string `json:"host"`
	Port int    `json:"port"`
}

func parseConfig(data []byte) (Config, error) {
	var cfg Config
	if err := json.Unmarshal(data, &cfg); err != nil {
		return Config{}, fmt.Errorf("parse config json: %w", err)
	}
	return cfg, nil
}

// =====================================================================
// Mục 4-5 — Sentinel + Custom struct
// =====================================================================

// Sentinel.
var (
	ErrNotFound      = errors.New("not found")
	ErrAlreadyExists = errors.New("already exists")
	ErrInvalidEmail  = errors.New("email không hợp lệ")
)

// Custom error type.
type ValidationError struct {
	Field string
	Msg   string
}

func (e *ValidationError) Error() string {
	return fmt.Sprintf("trường %q: %s", e.Field, e.Msg)
}

// =====================================================================
// BT1 — Sentinel ValidateEmail
// =====================================================================

func ValidateEmail(s string) error {
	if s == "" || !strings.Contains(s, "@") {
		return ErrInvalidEmail
	}
	return nil
}

// =====================================================================
// BT2 — Custom error type + ValidateUser
// =====================================================================

type User struct {
	ID    int
	Name  string
	Email string
	Age   int
}

func ValidateUser(u User) error {
	if u.Name == "" {
		return &ValidationError{Field: "Name", Msg: "rỗng"}
	}
	if !strings.Contains(u.Email, "@") {
		return &ValidationError{Field: "Email", Msg: "thiếu @"}
	}
	if u.Age < 0 {
		return &ValidationError{Field: "Age", Msg: "âm"}
	}
	return nil
}

// =====================================================================
// BT3 — Wrap chain Storage → Repository → Service
// =====================================================================

// Tầng Storage.
func Find(id int) (User, error) {
	if id == 0 {
		return User{}, sql.ErrNoRows
	}
	return User{ID: id, Name: "An"}, nil
}

// Tầng Repository.
func GetUser(id int) (User, error) {
	u, err := Find(id)
	if err != nil {
		return User{}, fmt.Errorf("repo getuser %d: %w", id, err)
	}
	return u, nil
}

// Tầng Service.
func LoadProfile(id int) (User, error) {
	u, err := GetUser(id)
	if err != nil {
		return User{}, fmt.Errorf("service load profile %d: %w", id, err)
	}
	return u, nil
}

// =====================================================================
// BT4 — HTTP middleware recover panic
// =====================================================================

func RecoverMiddleware(next http.HandlerFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		defer func() {
			if rec := recover(); rec != nil {
				log.Printf("panic recovered: %v", rec)
				http.Error(w, "internal server error", http.StatusInternalServerError)
			}
		}()
		next(w, r)
	}
}

// =====================================================================
// BT5 — Predict output cho 4 case wrap / Is
// =====================================================================

func predictIs() {
	// A
	errA := io.EOF
	// B
	errB := fmt.Errorf("read: %v", io.EOF)
	// C
	errC := fmt.Errorf("read: %w", io.EOF)
	// D
	errD := errors.Join(io.EOF, sql.ErrNoRows)

	fmt.Println("BT5 predict:")
	fmt.Println("  A errors.Is(errA, io.EOF) =", errors.Is(errA, io.EOF))                   // true
	fmt.Println("  B errors.Is(errB, io.EOF) =", errors.Is(errB, io.EOF))                   // false
	fmt.Println("  C errors.Is(errC, io.EOF) =", errors.Is(errC, io.EOF))                   // true
	fmt.Println("  D errors.Is(errD, sql.ErrNoRows) =", errors.Is(errD, sql.ErrNoRows))     // true
	fmt.Println("  D errors.Is(errD, io.EOF) =", errors.Is(errD, io.EOF))                   // true
}

// =====================================================================
// BT6 — WriteJSON với defer Close đúng pattern (named return)
// =====================================================================

// failClose: wrap *os.File để mô phỏng close fail.
type failClose struct {
	*os.File
	failOnClose bool
}

func (f *failClose) Close() error {
	if f.failOnClose {
		// Không gọi File.Close để tránh delete file thật khi test;
		// nhưng vẫn cần đóng để OS không leak fd:
		_ = f.File.Close()
		return errors.New("flush err mô phỏng")
	}
	return f.File.Close()
}

// WriteJSON: marshal v và ghi xuống path. failClosing để mô phỏng close fail.
// Dùng named return để defer ghi đè err khi Close fail mà Write thành công.
func WriteJSON(path string, v any, failClosing bool) (err error) {
	raw, err := os.Create(path)
	if err != nil {
		return fmt.Errorf("create %s: %w", path, err)
	}
	f := &failClose{File: raw, failOnClose: failClosing}
	defer func() {
		// Quy tắc: chỉ ghi đè err khi err đang nil (không nuốt lỗi gốc).
		if cerr := f.Close(); err == nil {
			err = cerr
		}
	}()
	data, err := json.Marshal(v)
	if err != nil {
		return fmt.Errorf("marshal: %w", err)
	}
	if _, err = f.Write(data); err != nil {
		return fmt.Errorf("write: %w", err)
	}
	return
}

// =====================================================================
// Mục 7 — errors.Join cho multi-error (validate nhiều field cùng lúc)
// =====================================================================

func ValidateUserAll(u User) error {
	var errs []error
	if u.Name == "" {
		errs = append(errs, &ValidationError{Field: "Name", Msg: "rỗng"})
	}
	if !strings.Contains(u.Email, "@") {
		errs = append(errs, &ValidationError{Field: "Email", Msg: "thiếu @"})
	}
	if u.Age < 0 {
		errs = append(errs, &ValidationError{Field: "Age", Msg: "âm"})
	}
	return errors.Join(errs...)
}

// =====================================================================
// Mục 8-9 — panic + recover demo
// =====================================================================

// safeCall: bắt panic bên trong, biến thành error.
func safeCall() (err error) {
	defer func() {
		if r := recover(); r != nil {
			err = fmt.Errorf("panic được recover: %v", r)
		}
	}()
	var p *int
	fmt.Println(*p) // nil deref → panic
	return nil
}

// =====================================================================
// main — chạy demo từng phần
// =====================================================================

func main() {
	fmt.Println("=== Lesson 19 — Error Handling demo ===")
	fmt.Println()

	// --- BT1 ---
	fmt.Println("BT1: Sentinel ValidateEmail")
	for _, in := range []string{"", "abc", "a@b.c"} {
		err := ValidateEmail(in)
		switch {
		case errors.Is(err, ErrInvalidEmail):
			fmt.Printf("  ValidateEmail(%q) → invalid\n", in)
		case err == nil:
			fmt.Printf("  ValidateEmail(%q) → OK\n", in)
		}
	}
	fmt.Println()

	// --- BT2 ---
	fmt.Println("BT2: Custom ValidationError + errors.As")
	err := ValidateUser(User{Name: "An", Email: "abc", Age: 20})
	var vErr *ValidationError
	if errors.As(err, &vErr) {
		fmt.Printf("  Field %s bị lỗi: %s\n", vErr.Field, vErr.Msg)
	}
	fmt.Println()

	// --- BT3 ---
	fmt.Println("BT3: Wrap chain xuyên 3 tầng")
	_, err = LoadProfile(0)
	fmt.Println("  err:", err)
	fmt.Println("  errors.Is(err, sql.ErrNoRows) =", errors.Is(err, sql.ErrNoRows))
	fmt.Println()

	// --- BT4 ---
	fmt.Println("BT4: HTTP middleware recover")
	boom := func(w http.ResponseWriter, r *http.Request) { panic("boom") }
	wrapped := RecoverMiddleware(boom)
	rec := httptest.NewRecorder()
	req := httptest.NewRequest("GET", "/", nil)
	wrapped(rec, req)
	fmt.Println("  status:", rec.Code)
	fmt.Println()

	// --- BT5 ---
	predictIs()
	fmt.Println()

	// --- BT6 ---
	fmt.Println("BT6: defer Close không nuốt lỗi")
	pathOK := filepath.Join(os.TempDir(), "l19_ok.json")
	pathFail := filepath.Join(os.TempDir(), "l19_fail.json")
	if e := WriteJSON(pathOK, map[string]int{"a": 1}, false); e != nil {
		fmt.Println("  case1 err:", e)
	} else {
		fmt.Println("  case1: write OK + close OK → err nil ✓")
	}
	if e := WriteJSON(pathFail, map[string]int{"a": 1}, true); e != nil {
		fmt.Println("  case2: write OK + close FAIL → err =", e, "✓")
	}
	_ = os.Remove(pathOK)
	_ = os.Remove(pathFail)
	fmt.Println()

	// --- Mục 1 — pattern thực tế ---
	fmt.Println("Mục 3: ageFromInput pattern")
	for _, in := range []string{"25", "200", "abc"} {
		age, err := ageFromInput(in)
		if err != nil {
			fmt.Printf("  ageFromInput(%q) → err: %v\n", in, err)
		} else {
			fmt.Printf("  ageFromInput(%q) → %d\n", in, age)
		}
	}
	fmt.Println()

	// --- Mục 5 — parseConfig ---
	fmt.Println("Mục 3: parseConfig pattern")
	good := []byte(`{"host":"localhost","port":8080}`)
	bad := []byte(`{"host": missing quotes}`)
	if cfg, e := parseConfig(good); e == nil {
		fmt.Printf("  good → %+v\n", cfg)
	}
	if _, e := parseConfig(bad); e != nil {
		fmt.Printf("  bad → err: %v\n", e)
	}
	fmt.Println()

	// --- Mục 7 — errors.Join ---
	fmt.Println("Mục 7: errors.Join multi-error")
	err = ValidateUserAll(User{Name: "", Email: "x", Age: -3})
	fmt.Println("  joined err:")
	fmt.Println(indent(err.Error(), "    "))
	fmt.Println()

	// --- Mục 9 — safeCall demo ---
	fmt.Println("Mục 9: recover trong defer")
	if e := safeCall(); e != nil {
		fmt.Println("  safeCall trả:", e)
	}
	fmt.Println()

	// --- Mục 6 — wrap chain manual ---
	fmt.Println("Mục 6: Wrap chain vẽ tay")
	e0 := os.ErrNotExist
	e1 := fmt.Errorf("open users.json: %w", e0)
	e2 := fmt.Errorf("get user 42: %w", e1)
	fmt.Println("  e2.Error():", e2)
	fmt.Println("  errors.Is(e2, os.ErrNotExist) =", errors.Is(e2, os.ErrNotExist))
	// Unwrap thủ công.
	cur := error(e2)
	depth := 0
	for cur != nil {
		fmt.Printf("  [depth %d] %v\n", depth, cur)
		cur = errors.Unwrap(cur)
		depth++
	}

	fmt.Println()
	fmt.Println("=== Done ===")
}

// indent: prefix mỗi dòng của s bằng prefix.
func indent(s, prefix string) string {
	lines := strings.Split(s, "\n")
	for i, l := range lines {
		lines[i] = prefix + l
	}
	return strings.Join(lines, "\n")
}
