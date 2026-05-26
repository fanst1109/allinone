// solutions.go — Lesson 45: Request Validation
//
// File này biên dịch và chạy được KHÔNG cần external dependency:
//
//	go run solutions.go
//
// README dùng github.com/go-playground/validator/v10 (tag-based). Ở đây ta
// tự cài đặt bằng tay (manual + một engine validate dựa trên reflect cơ bản)
// để tránh `go mod` / mạng. Mỗi chỗ có comment chỉ rõ "trong code thật với lib
// chỉ cần X dòng tag".
//
// Nội dung minh hoạ:
//  1. Manual validation gom hết lỗi vào slice (mục 3).
//  2. Engine validate dựa trên struct tag `validate:"..."` parse bằng reflect
//     (mô phỏng cách go-playground/validator hoạt động — mục 4).
//  3. Custom VN phone validator bằng regex (mục 6).
//  4. Cross-field gtfield (mục 7).
//  5. RFC 7807 Problem Details formatter (mục 10).
//  6. i18n: bảng dịch tag -> message theo locale (mục 11).
package main

import (
	"encoding/json"
	"fmt"
	"reflect"
	"regexp"
	"strconv"
	"strings"
)

// =============================================================================
// PHẦN 1 — Manual validation gom hết lỗi (README mục 3.1)
// =============================================================================

// ValidationError — 1 lỗi cho 1 field. Tách field + message để client render
// inline được, thay vì 1 chuỗi gộp.
type ValidationError struct {
	Field   string `json:"field"`
	Message string `json:"message"`
}

// CreateUserRequest — request mẫu. Tag `validate` ở đây dùng cho ENGINE reflect
// bên dưới (PHẦN 2). Trong code thật với go-playground/validator, CHỈ cần đúng
// các tag này là xong — không phải viết hàm Validate() tay.
type CreateUserRequest struct {
	Name  string `json:"name"  validate:"required,min=2,max=50"`
	Email string `json:"email" validate:"required,email"`
	Age   int    `json:"age"   validate:"required,min=18,max=120"`
	Role  string `json:"role"  validate:"required,oneof=admin user guest"`
}

var emailRegex = regexp.MustCompile(`^[A-Za-z0-9._%+\-]+@[A-Za-z0-9.\-]+\.[A-Za-z]{2,}$`)

// ValidateManual — phiên bản viết tay, gom hết lỗi vào slice (không return early).
// Ưu: rõ ràng, không reflect. Nhược: lặp code, mỗi field 1 block if.
func (r *CreateUserRequest) ValidateManual() []ValidationError {
	var errs []ValidationError
	if r.Name == "" {
		errs = append(errs, ValidationError{"name", "trường bắt buộc"})
	} else if len(r.Name) < 2 || len(r.Name) > 50 {
		errs = append(errs, ValidationError{"name", "độ dài phải trong khoảng 2..50"})
	}
	if r.Email == "" {
		errs = append(errs, ValidationError{"email", "trường bắt buộc"})
	} else if !emailRegex.MatchString(r.Email) {
		errs = append(errs, ValidationError{"email", "phải là email hợp lệ"})
	}
	// Age int: 0 là zero value -> coi như thiếu (giống `required` của lib với int).
	if r.Age == 0 {
		errs = append(errs, ValidationError{"age", "trường bắt buộc"})
	} else if r.Age < 18 || r.Age > 120 {
		errs = append(errs, ValidationError{"age", "phải trong khoảng 18..120"})
	}
	switch r.Role {
	case "":
		errs = append(errs, ValidationError{"role", "trường bắt buộc"})
	case "admin", "user", "guest":
		// OK
	default:
		errs = append(errs, ValidationError{"role", "phải là một trong: admin user guest"})
	}
	return errs
}

// =============================================================================
// PHẦN 2 — Engine validate dựa trên struct tag (mô phỏng go-playground/validator)
//
// Đây là phần "magic reflect" mà README mục 4.1 mô tả: duyệt từng field, đọc tag
// `validate:"rule1,rule2"`, apply từng rule. Trong code thật ta KHÔNG tự viết
// cái này — chỉ cần `validator.New().Struct(req)`. Ở đây tự viết để chạy offline
// và để thấy cơ chế bên trong.
// =============================================================================

// FieldError — kết quả validate 1 field, mô phỏng validator.FieldError của lib.
type FieldError struct {
	Field string // tên JSON (đã map từ tag json), giống RegisterTagNameFunc
	Tag   string // rule fail: required / email / min / oneof / vnphone / gtfield
	Param string // tham số sau dấu '=' của rule, vd "18" trong min=18
	Value any    // giá trị thực tế
}

// CustomRule — chữ ký cho custom validator, mô phỏng validator.FieldLevel.
// value: giá trị field hiện tại. param: phần sau '='.
type CustomRule func(value reflect.Value, param string) bool

// Validator — engine. Giữ map custom rule (mô phỏng RegisterValidation) và
// bảng dịch (mô phỏng i18n translations).
type Validator struct {
	custom map[string]CustomRule
}

func NewValidator() *Validator {
	return &Validator{custom: map[string]CustomRule{}}
}

// RegisterValidation — đăng ký custom rule (giống v.RegisterValidation của lib).
func (v *Validator) RegisterValidation(tag string, fn CustomRule) {
	v.custom[tag] = fn
}

// Struct — validate toàn bộ struct, trả slice FieldError. ptr hoặc value đều nhận.
func (v *Validator) Struct(s any) []FieldError {
	rv := reflect.ValueOf(s)
	for rv.Kind() == reflect.Ptr {
		rv = rv.Elem()
	}
	if rv.Kind() != reflect.Struct {
		return nil
	}
	rt := rv.Type()
	var out []FieldError

	for i := 0; i < rt.NumField(); i++ {
		sf := rt.Field(i)
		if sf.PkgPath != "" { // field unexported -> reflect không đọc được giá trị
			continue
		}
		tag := sf.Tag.Get("validate")
		if tag == "" || tag == "-" {
			continue
		}
		fieldVal := rv.Field(i)
		// Map tên field sang JSON name (mô phỏng RegisterTagNameFunc — README 9.2):
		// luôn expose JSON name, không lộ tên Go field nội bộ.
		name := jsonName(sf)

		for _, rule := range strings.Split(tag, ",") {
			tagName, param := splitRule(rule)

			// 1) Custom rule (vd vnphone) — ưu tiên check trước built-in.
			if fn, ok := v.custom[tagName]; ok {
				if !fn(fieldVal, param) {
					out = append(out, FieldError{name, tagName, param, fieldVal.Interface()})
				}
				continue
			}

			// 2) Built-in rule.
			if !applyBuiltin(tagName, param, fieldVal, rv) {
				out = append(out, FieldError{name, tagName, param, fieldVal.Interface()})
			}
		}
	}
	return out
}

// jsonName — lấy tên JSON từ tag, fallback về tên Go field nếu không có.
func jsonName(sf reflect.StructField) string {
	name := strings.SplitN(sf.Tag.Get("json"), ",", 2)[0]
	if name == "" || name == "-" {
		return sf.Name
	}
	return name
}

// splitRule — tách "min=18" thành ("min", "18"); "required" thành ("required", "").
func splitRule(rule string) (string, string) {
	if idx := strings.IndexByte(rule, '='); idx >= 0 {
		return rule[:idx], rule[idx+1:]
	}
	return rule, ""
}

// applyBuiltin — apply 1 built-in rule. Trả true nếu PASS.
// Hỗ trợ tập tối thiểu README mục 5 dùng: required, email, min, max, oneof,
// alphanum, gt, gtfield. Trả về true cho rule không hỗ trợ (bỏ qua, không fail).
func applyBuiltin(tag, param string, fv, parent reflect.Value) bool {
	switch tag {
	case "required":
		return !isZero(fv)
	case "email":
		return emailRegex.MatchString(fv.String())
	case "alphanum":
		return isAlphaNum(fv.String())
	case "min":
		return cmpNumOrLen(fv, param) >= 0
	case "max":
		return cmpNumOrLen(fv, param) <= 0
	case "gt":
		return cmpNum(fv, param) > 0
	case "oneof":
		opts := strings.Fields(param) // separator là SPACE, không phải phẩy (README 5)
		for _, o := range opts {
			if fv.String() == o {
				return true
			}
		}
		return false
	case "gtfield":
		// Cross-field: so field hiện tại với field `param` trong cùng struct.
		other := parent.FieldByName(param)
		if !other.IsValid() {
			return true
		}
		return asFloat(fv) > asFloat(other)
	default:
		return true // rule không hỗ trợ -> coi như pass (engine demo)
	}
}

// isZero — kiểm tra zero value (mô phỏng semantic của `required`).
func isZero(v reflect.Value) bool {
	switch v.Kind() {
	case reflect.String:
		return v.String() == ""
	case reflect.Int, reflect.Int8, reflect.Int16, reflect.Int32, reflect.Int64:
		return v.Int() == 0
	case reflect.Float32, reflect.Float64:
		return v.Float() == 0
	case reflect.Slice, reflect.Map, reflect.Ptr:
		return v.IsNil() || (v.Kind() != reflect.Ptr && v.Len() == 0)
	default:
		return v.IsZero()
	}
}

// cmpNumOrLen — với số so giá trị, với string/slice so độ dài. Trả -1/0/1.
func cmpNumOrLen(v reflect.Value, param string) int {
	switch v.Kind() {
	case reflect.String:
		return cmpInt(len(v.String()), atoi(param))
	case reflect.Slice, reflect.Map, reflect.Array:
		return cmpInt(v.Len(), atoi(param))
	default:
		return cmpNum(v, param)
	}
}

func cmpNum(v reflect.Value, param string) int {
	f, _ := strconv.ParseFloat(param, 64)
	return cmpFloat(asFloat(v), f)
}

func asFloat(v reflect.Value) float64 {
	switch v.Kind() {
	case reflect.Int, reflect.Int8, reflect.Int16, reflect.Int32, reflect.Int64:
		return float64(v.Int())
	case reflect.Float32, reflect.Float64:
		return v.Float()
	default:
		return 0
	}
}

func cmpInt(a, b int) int { return cmpFloat(float64(a), float64(b)) }
func cmpFloat(a, b float64) int {
	switch {
	case a < b:
		return -1
	case a > b:
		return 1
	default:
		return 0
	}
}
func atoi(s string) int { n, _ := strconv.Atoi(s); return n }

func isAlphaNum(s string) bool {
	if s == "" {
		return false
	}
	for _, r := range s {
		if !(r >= 'a' && r <= 'z' || r >= 'A' && r <= 'Z' || r >= '0' && r <= '9') {
			return false
		}
	}
	return true
}

// =============================================================================
// PHẦN 3 — Custom VN phone validator (README mục 6)
//
// Trong code thật chỉ cần:
//
//	v.RegisterValidation("vnphone", func(fl validator.FieldLevel) bool {
//	    return vnPhoneRegex.MatchString(fl.Field().String())
//	})
// =============================================================================

// +84xxxxxxxxx hoặc 0xxxxxxxxx — 9 chữ số sau prefix.
var vnPhoneRegex = regexp.MustCompile(`^(\+84|0)[0-9]{9}$`)

func vnPhoneRule(value reflect.Value, _ string) bool {
	return vnPhoneRegex.MatchString(value.String())
}

// =============================================================================
// PHẦN 4 — RFC 7807 Problem Details (README mục 10)
// =============================================================================

type Problem struct {
	Type     string         `json:"type"`
	Title    string         `json:"title"`
	Status   int            `json:"status"`
	Detail   string         `json:"detail,omitempty"`
	Instance string         `json:"instance,omitempty"`
	Errors   []FieldProblem `json:"errors,omitempty"`
}

type FieldProblem struct {
	Field   string `json:"field"`
	Message string `json:"message"`
}

// FormatProblem — chuyển slice FieldError thành Problem RFC 7807.
// status 422 (Unprocessable Entity) cho validation fail (README 10.3).
func FormatProblem(errs []FieldError, instance string) Problem {
	p := Problem{
		Type:     "https://example.com/probs/validation",
		Title:    "Validation Failed",
		Status:   422,
		Detail:   "Một hoặc nhiều trường không hợp lệ",
		Instance: instance,
	}
	for _, e := range errs {
		p.Errors = append(p.Errors, FieldProblem{
			Field:   e.Field,
			Message: translate(e, "vi"),
		})
	}
	return p
}

// =============================================================================
// PHẦN 5 — i18n: dịch tag -> message theo locale (README mục 11)
// =============================================================================

// messages[locale][tag] = template. {param} thay bằng e.Param.
var messages = map[string]map[string]string{
	"vi": {
		"required": "trường bắt buộc",
		"email":    "phải là email hợp lệ",
		"min":      "tối thiểu {param}",
		"max":      "tối đa {param}",
		"gt":       "phải lớn hơn {param}",
		"oneof":    "phải là một trong: {param}",
		"alphanum": "chỉ cho phép chữ và số",
		"gtfield":  "phải lớn hơn trường {param}",
		"vnphone":  "phải là số điện thoại VN hợp lệ",
	},
	"en": {
		"required": "is required",
		"email":    "must be a valid email",
		"min":      "minimum {param}",
		"max":      "maximum {param}",
		"gt":       "must be greater than {param}",
		"oneof":    "must be one of: {param}",
		"alphanum": "alphanumeric only",
		"gtfield":  "must be greater than field {param}",
		"vnphone":  "must be a valid VN phone number",
	},
}

func translate(e FieldError, locale string) string {
	tbl, ok := messages[locale]
	if !ok {
		tbl = messages["en"]
	}
	tpl, ok := tbl[e.Tag]
	if !ok {
		return e.Tag + " " + e.Param // fallback: tag thô (README cảnh báo pitfall này)
	}
	return strings.ReplaceAll(tpl, "{param}", e.Param)
}

// =============================================================================
// PHẦN 6 — Cross-field demo struct
// =============================================================================

type DateRange struct {
	// Dùng int (Unix giây) thay time.Time để engine reflect đơn giản so sánh được.
	Start int `json:"start" validate:"required"`
	End   int `json:"end"   validate:"required,gtfield=Start"`
}

// =============================================================================
// main — chạy toàn bộ demo
// =============================================================================

func main() {
	fmt.Println("========== 1. Manual validation (gom hết lỗi) ==========")
	bad := CreateUserRequest{Name: "A", Email: "x@", Age: 10, Role: "superadmin"}
	for _, e := range bad.ValidateManual() {
		fmt.Printf("  %-6s -> %s\n", e.Field, e.Message)
	}

	fmt.Println("\n========== 2. Engine reflect dựa trên tag ==========")
	v := NewValidator()
	v.RegisterValidation("vnphone", vnPhoneRule) // đăng ký custom rule 1 lần

	good := CreateUserRequest{Name: "Alice", Email: "alice@example.com", Age: 30, Role: "user"}
	fmt.Printf("  request hợp lệ -> %d lỗi\n", len(v.Struct(good)))
	for _, e := range v.Struct(bad) {
		fmt.Printf("  FAIL field=%s tag=%s param=%q value=%v\n", e.Field, e.Tag, e.Param, e.Value)
	}

	fmt.Println("\n========== 3. Custom VN phone validator ==========")
	type Contact struct {
		Phone string `json:"phone" validate:"required,vnphone"`
	}
	for _, p := range []string{"0912345678", "+84912345678", "123", "+8491234", "0912345678abc"} {
		errs := v.Struct(Contact{Phone: p})
		if len(errs) == 0 {
			fmt.Printf("  OK   %s\n", p)
		} else {
			fmt.Printf("  FAIL %-16s (tag=%s)\n", p, errs[0].Tag)
		}
	}

	fmt.Println("\n========== 4. Cross-field gtfield (End > Start) ==========")
	for _, dr := range []DateRange{
		{Start: 100, End: 200}, // OK
		{Start: 200, End: 100}, // FAIL: End < Start
		{Start: 100, End: 100}, // FAIL: End == Start (gtfield strict)
	} {
		errs := v.Struct(dr)
		if len(errs) == 0 {
			fmt.Printf("  OK   Start=%d End=%d\n", dr.Start, dr.End)
		} else {
			fmt.Printf("  FAIL Start=%d End=%d (tag=%s)\n", dr.Start, dr.End, errs[len(errs)-1].Tag)
		}
	}

	fmt.Println("\n========== 5. RFC 7807 Problem Details (JSON) ==========")
	prob := FormatProblem(v.Struct(bad), "/users/42")
	out, _ := json.MarshalIndent(prob, "", "  ")
	fmt.Println(string(out))

	fmt.Println("\n========== 6. i18n message (vi vs en) ==========")
	errs := v.Struct(bad)
	for _, e := range errs {
		fmt.Printf("  %-6s vi=%-28q en=%q\n", e.Field, translate(e, "vi"), translate(e, "en"))
	}
}
