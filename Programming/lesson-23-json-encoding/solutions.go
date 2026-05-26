// Lesson 23 — JSON Encoding với encoding/json
// Chạy: go run solutions.go
//
// File này cover:
//   1. Marshal / Unmarshal cơ bản
//   2. Struct tag (omitempty, đổi tên, ignore, ",string")
//   3. Pointer field để phân biệt "không gửi" vs "zero"
//   4. Custom MarshalJSON / UnmarshalJSON (Date format YYYY-MM-DD)
//   5. RawMessage — defer decode cho polymorphic payload
//   6. Streaming Encoder / Decoder + NDJSON
//   7. HTTP handler pattern với validation

package main

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"net/http/httptest"
	"strings"
	"time"
)

//
// ============================================================
// PHẦN 1 — Marshal / Unmarshal cơ bản
// ============================================================
//

type User struct {
	Name  string `json:"name"`
	Email string `json:"email"`
	Age   int    `json:"age"`
}

func part1MarshalUnmarshal() {
	fmt.Println("\n=== PHẦN 1: Marshal / Unmarshal cơ bản ===")

	// Marshal: struct -> JSON
	u := User{Name: "Alice", Email: "alice@example.com", Age: 30}
	b, _ := json.Marshal(u)
	fmt.Println("Marshal:    ", string(b))

	// MarshalIndent: pretty print
	pretty, _ := json.MarshalIndent(u, "", "  ")
	fmt.Println("Pretty:\n" + string(pretty))

	// Unmarshal: JSON -> struct (nhớ &)
	data := []byte(`{"name":"Bob","email":"b@x.com","age":25}`)
	var u2 User
	if err := json.Unmarshal(data, &u2); err != nil {
		fmt.Println("err:", err)
		return
	}
	fmt.Printf("Unmarshal:   %+v\n", u2)
}

//
// ============================================================
// PHẦN 2 — Struct tag (BT1): bỏ password, omitempty, đổi tên
// ============================================================
//

type UserSafe struct {
	Name     string `json:"name"`
	Email    string `json:"email"`
	Age      int    `json:"age,omitempty"`
	Password string `json:"-"`
}

func part2Tags() {
	fmt.Println("\n=== PHẦN 2: Struct tag (BT1) ===")

	u1 := UserSafe{Name: "Alice", Email: "a@x.com", Age: 30, Password: "secret"}
	b1, _ := json.Marshal(u1)
	fmt.Println("With age:    ", string(b1))
	// {"name":"Alice","email":"a@x.com","age":30}

	u2 := UserSafe{Name: "Bob", Email: "b@x.com", Password: "secret"}
	b2, _ := json.Marshal(u2)
	fmt.Println("Age=0 dropped:", string(b2))
	// {"name":"Bob","email":"b@x.com"}    ← age=0 bị omitempty bỏ
}

//
// ============================================================
// PHẦN 3 — ,string tag cho int64 lớn (Twitter ID pattern)
// ============================================================
//

type Tweet struct {
	ID   int64  `json:"id,string"`
	Text string `json:"text"`
}

func part3StringTag() {
	fmt.Println("\n=== PHẦN 3: ,string tag cho big int ===")

	t := Tweet{ID: 1234567890123456789, Text: "hello"}
	b, _ := json.Marshal(t)
	fmt.Println("Output:", string(b))
	// {"id":"1234567890123456789","text":"hello"}
	// → client JS đọc được string nguyên vẹn, không mất precision như float
}

//
// ============================================================
// PHẦN 4 — Pointer field: phân biệt "không có" vs "zero"
// ============================================================
//

type Filter struct {
	Status *string `json:"status,omitempty"`
	Limit  *int    `json:"limit,omitempty"`
}

func part4PointerField() {
	fmt.Println("\n=== PHẦN 4: Pointer field ===")

	// Case 1: client gửi {"limit":0}
	var f1 Filter
	_ = json.Unmarshal([]byte(`{"limit":0}`), &f1)
	if f1.Limit != nil {
		fmt.Printf("Case 1: client set Limit=%d (có gửi)\n", *f1.Limit)
	}

	// Case 2: client gửi {}
	var f2 Filter
	_ = json.Unmarshal([]byte(`{}`), &f2)
	if f2.Limit == nil {
		fmt.Println("Case 2: client KHÔNG gửi Limit → dùng default")
	}
}

//
// ============================================================
// PHẦN 5 — Custom MarshalJSON / UnmarshalJSON (BT2: Date)
// ============================================================
//

const dateLayout = "2006-01-02"

// Date wrap time.Time, marshal ra "YYYY-MM-DD" thay vì RFC3339.
type Date struct{ time.Time }

func (d Date) MarshalJSON() ([]byte, error) {
	// Wrap trong "..." vì JSON string yêu cầu quote.
	return []byte(`"` + d.Format(dateLayout) + `"`), nil
}

func (d *Date) UnmarshalJSON(b []byte) error {
	s := strings.Trim(string(b), `"`)
	if s == "" || s == "null" {
		return nil
	}
	t, err := time.Parse(dateLayout, s)
	if err != nil {
		return err
	}
	d.Time = t
	return nil
}

type Invoice struct {
	ID       int  `json:"id"`
	IssuedAt Date `json:"issued_at"`
}

func part5CustomMarshaler() {
	fmt.Println("\n=== PHẦN 5: Custom Marshaler — Date ===")

	inv := Invoice{
		ID:       42,
		IssuedAt: Date{time.Date(2024, 1, 15, 0, 0, 0, 0, time.UTC)},
	}
	b, _ := json.Marshal(inv)
	fmt.Println("Marshal:", string(b))
	// {"id":42,"issued_at":"2024-01-15"}

	// Round-trip
	var inv2 Invoice
	_ = json.Unmarshal(b, &inv2)
	fmt.Println("Unmarshal back:", inv2.IssuedAt.Format(dateLayout))

	// Lỗi parse
	var inv3 Invoice
	err := json.Unmarshal([]byte(`{"id":1,"issued_at":"15/01/2024"}`), &inv3)
	fmt.Println("Bad format error:", err)
}

//
// ============================================================
// PHẦN 6 — RawMessage cho polymorphic payload (webhook pattern)
// ============================================================
//

type WebhookEvent struct {
	ID   string          `json:"id"`
	Type string          `json:"type"`
	Data json.RawMessage `json:"data"` // defer decode
}

type PaymentData struct {
	Amount   int    `json:"amount"`
	Currency string `json:"currency"`
}

type SubscriptionData struct {
	Plan     string `json:"plan"`
	CanceledAt string `json:"canceled_at"`
}

func part6RawMessage() {
	fmt.Println("\n=== PHẦN 6: RawMessage — webhook pattern ===")

	events := []string{
		`{"id":"evt_1","type":"payment.succeeded","data":{"amount":1500,"currency":"USD"}}`,
		`{"id":"evt_2","type":"subscription.canceled","data":{"plan":"pro","canceled_at":"2024-01-15"}}`,
	}

	for _, raw := range events {
		var ev WebhookEvent
		if err := json.Unmarshal([]byte(raw), &ev); err != nil {
			fmt.Println("decode err:", err)
			continue
		}
		switch ev.Type {
		case "payment.succeeded":
			var p PaymentData
			_ = json.Unmarshal(ev.Data, &p)
			fmt.Printf("payment %s: %d %s\n", ev.ID, p.Amount, p.Currency)
		case "subscription.canceled":
			var s SubscriptionData
			_ = json.Unmarshal(ev.Data, &s)
			fmt.Printf("sub canceled %s: plan=%s at=%s\n", ev.ID, s.Plan, s.CanceledAt)
		}
	}
}

//
// ============================================================
// PHẦN 7 — Streaming Encoder / Decoder + NDJSON (BT5)
// ============================================================
//

func part7Streaming() {
	fmt.Println("\n=== PHẦN 7: Streaming + NDJSON ===")

	// 7.1 — Ghi NDJSON ra buffer (giả lập file)
	type UserAge struct {
		Name string `json:"name"`
		Age  int    `json:"age"`
	}

	var buf bytes.Buffer
	enc := json.NewEncoder(&buf)
	users := []UserAge{
		{"Alice", 30},
		{"Bob", 15},
		{"Charlie", 22},
		{"Dave", 17},
		{"Eve", 45},
	}
	for _, u := range users {
		_ = enc.Encode(u) // mỗi Encode thêm "\n" cuối → NDJSON
	}
	fmt.Println("NDJSON written:")
	fmt.Print(buf.String())

	// 7.2 — Stream parse NDJSON, đếm user >= 18 (BT5)
	count, err := countAdultsFromReader(&buf)
	if err != nil {
		fmt.Println("err:", err)
		return
	}
	fmt.Printf("Adults (>=18): %d\n", count)
}

// countAdultsFromReader stream-parse NDJSON đếm user age>=18.
// Không bao giờ load cả file vào RAM — chỉ giữ 1 user tại 1 thời điểm.
func countAdultsFromReader(r io.Reader) (int, error) {
	type rec struct {
		Age int `json:"age"`
	}
	dec := json.NewDecoder(r)
	count := 0
	for dec.More() {
		var u rec
		if err := dec.Decode(&u); err != nil {
			return count, err
		}
		if u.Age >= 18 {
			count++
		}
	}
	return count, nil
}

//
// ============================================================
// PHẦN 8 — HTTP handler pattern (BT4)
// ============================================================
//

type CreateUserRequest struct {
	Name  string `json:"name"`
	Email string `json:"email"`
	Age   int    `json:"age"`
}

type CreateUserResponse struct {
	ID   int    `json:"id"`
	Name string `json:"name"`
}

type ErrorResponse struct {
	Error string `json:"error"`
}

func writeJSON(w http.ResponseWriter, status int, v interface{}) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(status)
	_ = json.NewEncoder(w).Encode(v)
}

func createUserHandler(w http.ResponseWriter, r *http.Request) {
	var req CreateUserRequest
	dec := json.NewDecoder(r.Body)
	dec.DisallowUnknownFields() // strict: reject field lạ
	if err := dec.Decode(&req); err != nil {
		writeJSON(w, http.StatusBadRequest, ErrorResponse{Error: "invalid json: " + err.Error()})
		return
	}

	// Validate thủ công (Tier 4 sẽ học validator library)
	if strings.TrimSpace(req.Name) == "" {
		writeJSON(w, http.StatusBadRequest, ErrorResponse{Error: "name required"})
		return
	}
	if !strings.Contains(req.Email, "@") {
		writeJSON(w, http.StatusBadRequest, ErrorResponse{Error: "invalid email"})
		return
	}
	if req.Age < 0 || req.Age > 150 {
		writeJSON(w, http.StatusBadRequest, ErrorResponse{Error: "invalid age"})
		return
	}

	// Giả lập tạo user thành công
	writeJSON(w, http.StatusCreated, CreateUserResponse{ID: 42, Name: req.Name})
}

func part8HTTPHandler() {
	fmt.Println("\n=== PHẦN 8: HTTP handler (BT4) ===")

	// Test với httptest — không cần listen thật.
	tests := []struct {
		name string
		body string
	}{
		{"valid", `{"name":"Alice","email":"a@x.com","age":30}`},
		{"missing email", `{"name":"Alice","email":"axcom","age":30}`},
		{"bad age", `{"name":"Alice","email":"a@x.com","age":999}`},
		{"unknown field", `{"name":"Alice","email":"a@x.com","age":30,"hacker":true}`},
	}
	for _, tc := range tests {
		r := httptest.NewRequest("POST", "/users", strings.NewReader(tc.body))
		w := httptest.NewRecorder()
		createUserHandler(w, r)
		fmt.Printf("[%s] status=%d body=%s", tc.name, w.Code, w.Body.String())
	}
}

//
// ============================================================
// PHẦN 9 — Unknown shape: map[string]interface{} (BT3)
// ============================================================
//

func part9UnknownShape() {
	fmt.Println("\n=== PHẦN 9: Unknown shape (BT3) ===")

	data := []byte(`{
      "status": "ok",
      "data": {
        "users": [{"id":1,"name":"Alice"},{"id":2,"name":"Bob"}],
        "total": 2
      }
    }`)

	var m map[string]interface{}
	_ = json.Unmarshal(data, &m)

	status := m["status"].(string)
	d := m["data"].(map[string]interface{})
	total := int(d["total"].(float64)) // số → float64 default

	users := d["users"].([]interface{})
	names := make([]string, 0, len(users))
	for _, u := range users {
		user := u.(map[string]interface{})
		names = append(names, user["name"].(string))
	}

	fmt.Printf("status=%s total=%d names=%v\n", status, total, names)
}

//
// ============================================================
// PHẦN 10 — Common pitfall demo (BT6)
// ============================================================
//

func part10Pitfalls() {
	fmt.Println("\n=== PHẦN 10: Pitfall demos (BT6) ===")

	// Pitfall (b): field private → bị bỏ.
	// (Dùng interface{} indirection để vet không cảnh báo — đây là demo có chủ ý.)
	up := struct {
		name string // chữ thường, không có tag để vet không complaint
	}{name: "Alice"}
	var upAny interface{} = up
	b, _ := json.Marshal(upAny)
	fmt.Println("Private field:    ", string(b), "← {} vì 'name' không exported")

	type userPublic struct {
		Name string `json:"name"`
	}
	up2 := userPublic{Name: "Alice"}
	b2, _ := json.Marshal(up2)
	fmt.Println("Public field:     ", string(b2))

	// Pitfall (c): quên & khi Unmarshal.
	// Bọc qua interface{} để vet không phát hiện "non-pointer" tại compile time.
	var u1 userPublic
	var u1Any interface{} = u1 // truyền value, không phải pointer
	_ = json.Unmarshal([]byte(`{"name":"Alice"}`), u1Any)
	fmt.Printf("Quên &:            %+v  ← Name vẫn rỗng\n", u1)

	var u2 userPublic
	_ = json.Unmarshal([]byte(`{"name":"Alice"}`), &u2) // ĐÚNG
	fmt.Printf("Có &:              %+v\n", u2)

	// Pitfall (d): tag sai chính tả
	type withTypo struct {
		Email string `json:"emial"` // typo
	}
	wt := withTypo{Email: "a@x.com"}
	b3, _ := json.Marshal(wt)
	fmt.Println("Tag typo:         ", string(b3), "← key sai, API sẽ không nhận")
}

//
// ============================================================
// main — chạy tuần tự tất cả demo
// ============================================================
//

func main() {
	part1MarshalUnmarshal()
	part2Tags()
	part3StringTag()
	part4PointerField()
	part5CustomMarshaler()
	part6RawMessage()
	part7Streaming()
	part8HTTPHandler()
	part9UnknownShape()
	part10Pitfalls()
}
