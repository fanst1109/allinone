// Package main — Lesson 14: String, Rune & UTF-8.
//
// Chạy: go run solutions.go
//
// File minh hoạ các khái niệm chính của lesson + lời giải 6 bài tập:
// byte vs rune, len vs utf8.RuneCountInString, for range string,
// strings.Builder, strings/strconv, và xử lý multi-byte an toàn.
package main

import (
	"fmt"
	"strconv"
	"strings"
	"unicode"
	"unicode/utf8"
)

// ---------------------------------------------------------------------------
// 1. byte vs rune — len() đếm BYTE, không phải ký tự
// ---------------------------------------------------------------------------

func demoByteVsRune() {
	fmt.Println("== byte vs rune ==")
	samples := []string{"hello", "xin chào", "Go 🌍", "日本語"}
	for _, s := range samples {
		// len(s) = số byte; RuneCountInString = số ký tự (code point)
		fmt.Printf("%-10q len(byte)=%-2d runes=%-2d\n",
			s, len(s), utf8.RuneCountInString(s))
	}

	// Indexing trả về BYTE, không phải ký tự.
	s := "héllo" // 'é' = 2 byte trong UTF-8
	fmt.Printf("s[0]=%d (byte của 'h'), s[1]=%d (byte đầu của 'é')\n", s[0], s[1])
}

// ---------------------------------------------------------------------------
// 2. for range string — tự decode UTF-8, trả (byteIndex, rune)
// ---------------------------------------------------------------------------

func demoRangeString() {
	fmt.Println("\n== for range string ==")
	s := "xin chào"
	for i, r := range s {
		fmt.Printf("byteIndex=%-2d rune=%q codepoint=U+%04X\n", i, r, r)
	}
	// Lưu ý: i NHẢY số khi gặp ký tự nhiều byte ('à' chiếm 2 byte).
}

// ---------------------------------------------------------------------------
// 3. strings.Builder — nối chuỗi O(n) thay vì O(n^2) với '+'
// ---------------------------------------------------------------------------

func demoBuilder() {
	fmt.Println("\n== strings.Builder ==")
	var b strings.Builder
	b.Grow(16) // pre-allocate nếu biết trước cỡ
	for i := 0; i < 5; i++ {
		fmt.Fprintf(&b, "item%d ", i)
	}
	fmt.Println(strings.TrimSpace(b.String()))
}

// ---------------------------------------------------------------------------
// 4. strconv vs fmt.Sprintf — convert số <-> string
// ---------------------------------------------------------------------------

func demoStrconv() {
	fmt.Println("\n== strconv ==")
	// string(65) = "A" (code point), KHÔNG phải "65" — bẫy kinh điển.
	fmt.Printf("string(65)=%q  strconv.Itoa(65)=%q\n", string(rune(65)), strconv.Itoa(65))

	n, _ := strconv.Atoi("42")
	f, _ := strconv.ParseFloat("3.14", 64)
	fmt.Printf("Atoi(\"42\")=%d  ParseFloat(\"3.14\")=%.2f\n", n, f)
}

// ---------------------------------------------------------------------------
// BT1 — ValidateName: tên hợp lệ nếu chỉ gồm chữ cái (Unicode) + khoảng trắng,
// đếm ký tự THẬT (rune) trong khoảng [2, 50].
// ---------------------------------------------------------------------------

func ValidateName(name string) error {
	name = strings.TrimSpace(name)
	count := utf8.RuneCountInString(name)
	if count < 2 || count > 50 {
		return fmt.Errorf("tên phải có 2-50 ký tự, hiện có %d", count)
	}
	for _, r := range name {
		if !unicode.IsLetter(r) && !unicode.IsSpace(r) {
			return fmt.Errorf("ký tự không hợp lệ: %q", r)
		}
	}
	return nil
}

// ---------------------------------------------------------------------------
// BT2 — Reverse string giữ nguyên ký tự multi-byte ("héllo" -> "olléh").
// Phải đảo theo RUNE, không phải byte (đảo byte sẽ hỏng ký tự UTF-8).
// ---------------------------------------------------------------------------

func Reverse(s string) string {
	r := []rune(s) // decode UTF-8 thành slice code point
	for i, j := 0, len(r)-1; i < j; i, j = i+1, j-1 {
		r[i], r[j] = r[j], r[i]
	}
	return string(r)
}

// ---------------------------------------------------------------------------
// BT3 — Palindrome bỏ qua hoa/thường + khoảng trắng, an toàn multi-byte.
// ---------------------------------------------------------------------------

func IsPalindrome(s string) bool {
	var cleaned []rune
	for _, r := range s {
		if unicode.IsSpace(r) {
			continue
		}
		cleaned = append(cleaned, unicode.ToLower(r))
	}
	for i, j := 0, len(cleaned)-1; i < j; i, j = i+1, j-1 {
		if cleaned[i] != cleaned[j] {
			return false
		}
	}
	return true
}

// ---------------------------------------------------------------------------
// BT4 — Parse 1 dòng CSV cơ bản, hỗ trợ field bọc trong dấu " (chứa dấu phẩy).
// Ví dụ: a,"b,c",d  ->  ["a", "b,c", "d"]
// ---------------------------------------------------------------------------

func ParseCSVLine(line string) []string {
	var fields []string
	var cur strings.Builder
	inQuote := false
	for _, r := range line {
		switch {
		case r == '"':
			inQuote = !inQuote // bật/tắt trạng thái trong ngoặc kép
		case r == ',' && !inQuote:
			fields = append(fields, cur.String())
			cur.Reset()
		default:
			cur.WriteRune(r)
		}
	}
	fields = append(fields, cur.String())
	return fields
}

// ---------------------------------------------------------------------------
// BT5 — Chuỗi số có dấu phẩy phân nhóm -> int. "1,234,567" -> 1234567
// ---------------------------------------------------------------------------

func ParseNumber(s string) (int, error) {
	clean := strings.ReplaceAll(s, ",", "")
	return strconv.Atoi(clean)
}

// ---------------------------------------------------------------------------
// BT6 — Template engine mini: thay "$name" bằng giá trị trong map.
// ---------------------------------------------------------------------------

func RenderTemplate(tpl string, vars map[string]string) string {
	var b strings.Builder
	i := 0
	for i < len(tpl) {
		if tpl[i] == '$' {
			// đọc tên biến (chữ/số) ngay sau '$'
			j := i + 1
			for j < len(tpl) && (unicode.IsLetter(rune(tpl[j])) || unicode.IsDigit(rune(tpl[j]))) {
				j++
			}
			key := tpl[i+1 : j]
			if val, ok := vars[key]; ok {
				b.WriteString(val)
			} else {
				b.WriteString(tpl[i:j]) // giữ nguyên nếu không tìm thấy
			}
			i = j
		} else {
			b.WriteByte(tpl[i])
			i++
		}
	}
	return b.String()
}

func main() {
	demoByteVsRune()
	demoRangeString()
	demoBuilder()
	demoStrconv()

	fmt.Println("\n== Lời giải bài tập ==")

	// BT1
	fmt.Printf("ValidateName(\"An\") -> %v\n", ValidateName("An"))
	fmt.Printf("ValidateName(\"A\") -> %v\n", ValidateName("A"))

	// BT2
	fmt.Printf("Reverse(\"héllo\") -> %q\n", Reverse("héllo"))
	fmt.Printf("Reverse(\"Go🌍\") -> %q\n", Reverse("Go🌍"))

	// BT3
	fmt.Printf("IsPalindrome(\"Anna\") -> %v\n", IsPalindrome("Anna"))
	fmt.Printf("IsPalindrome(\"hello\") -> %v\n", IsPalindrome("hello"))

	// BT4
	fmt.Printf("ParseCSVLine(`a,\"b,c\",d`) -> %q\n", ParseCSVLine(`a,"b,c",d`))

	// BT5
	n, _ := ParseNumber("1,234,567")
	fmt.Printf("ParseNumber(\"1,234,567\") -> %d\n", n)

	// BT6
	out := RenderTemplate("Hello, $name! Bạn $age tuổi.", map[string]string{"name": "An", "age": "25"})
	fmt.Printf("RenderTemplate -> %q\n", out)
}
