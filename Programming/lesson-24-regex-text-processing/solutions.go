// Lesson 24 — Regex & Text Processing — Lời giải đầy đủ.
//
// Chạy: go run solutions.go
//
// File này gom tất cả 6 bài tập + một vài ví dụ phụ về regex trong Go.
// Comment tiếng Việt giải thích pattern và quyết định thiết kế.
package main

import (
	"fmt"
	"regexp"
	"strings"
)

// =====================================================================
// Bài 1 — Validate số điện thoại VN
// =====================================================================

// Compile 1 lần ở package level, reuse cho mọi lần gọi.
// Pattern: ^(\+84|0)[0-9]{9}$
//   ^             đầu chuỗi
//   (\+84|0)      "+84" hoặc "0"; \+ vì + là quantifier, phải escape
//   [0-9]{9}      đúng 9 chữ số tiếp theo
//   $             cuối chuỗi
var vnPhoneRe = regexp.MustCompile(`^(\+84|0)[0-9]{9}$`)

func isVNPhone(s string) bool {
	return vnPhoneRe.MatchString(s)
}

// =====================================================================
// Bài 2 — Extract tất cả URL từ text
// =====================================================================

// Pattern: https?://[^\s,)<>"']+
//   https?           "http" hoặc "https" (s? = s optional)
//   ://              literal
//   [^\s,)<>"']+    ≥1 char không phải whitespace hoặc dấu kết câu hay gặp
//
// Loại bỏ thêm `,`, `)`, `<`, `>`, `"`, `'` để tránh "ngoạm" dấu câu cuối URL.
var urlRe = regexp.MustCompile(`https?://[^\s,)<>"']+`)

func extractURLs(text string) []string {
	return urlRe.FindAllString(text, -1)
}

// =====================================================================
// Bài 3 — Replace {{name}} bằng giá trị từ map
// =====================================================================

// Pattern: \{\{(\w+)\}\}
//   \{\{       hai dấu { literal (escape an toàn)
//   (\w+)      capture group 1: tên (chỉ chữ/số/_)
//   \}\}       hai dấu } literal
var tmplRe = regexp.MustCompile(`\{\{(\w+)\}\}`)

func render(tmpl string, vars map[string]string) string {
	return tmplRe.ReplaceAllStringFunc(tmpl, func(match string) string {
		// match là cả "{{name}}". Bóc tên từ giữa.
		sub := tmplRe.FindStringSubmatch(match)
		if sub == nil {
			return match
		}
		key := sub[1]
		if val, ok := vars[key]; ok {
			return val
		}
		// Không có key trong map → giữ nguyên placeholder.
		return match
	})
}

// =====================================================================
// Bài 4 — Parse log line
// =====================================================================

// Pattern dùng named group cho dễ đọc.
//   ^\[             bắt đầu bằng "["
//   (?P<date>...)   timestamp YYYY-MM-DD HH:MM:SS
//   \]              đóng "]"
//   \s+             space(s)
//   (?P<level>\w+)  level INFO/WARN/ERROR/...
//   \s+             space(s)
//   (?P<msg>.+)$    phần còn lại đến cuối dòng
var logRe = regexp.MustCompile(`^\[(?P<date>\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2})\] (?P<level>\w+) (?P<msg>.+)$`)

// parseLog trả về date, level, msg và cờ ok.
func parseLog(line string) (date, level, msg string, ok bool) {
	m := logRe.FindStringSubmatch(line)
	if m == nil {
		return "", "", "", false
	}
	// SubexpIndex tra cứu vị trí group theo tên.
	dIdx := logRe.SubexpIndex("date")
	lIdx := logRe.SubexpIndex("level")
	mIdx := logRe.SubexpIndex("msg")
	return m[dIdx], m[lIdx], m[mIdx], true
}

// =====================================================================
// Bài 5 — Split CSV simplified (field quote-aware)
// =====================================================================

// Pattern: "([^"]*)"|([^,]*)
//   Nhánh 1 — "([^"]*)" : match field quote, capture nội dung trong
//   Nhánh 2 — ([^,]*)   : match field thường, đến trước dấu phẩy
//
// Lưu ý: trong thực tế NÊN dùng encoding/csv. Đây chỉ là exercise.
var csvFieldRe = regexp.MustCompile(`"([^"]*)"|([^,]*)`)

func splitCSV(line string) []string {
	var fields []string
	matches := csvFieldRe.FindAllStringSubmatch(line, -1)
	for i, m := range matches {
		// match cuối có thể rỗng (alternation match "" sau dấu phẩy cuối).
		if i == len(matches)-1 && m[0] == "" && !strings.HasSuffix(line, ",") {
			continue
		}
		if strings.HasPrefix(m[0], `"`) {
			fields = append(fields, m[1]) // nội dung trong quote
		} else {
			fields = append(fields, m[2]) // field thường
		}
	}
	return fields
}

// =====================================================================
// Phụ — Validate email và date (basic)
// =====================================================================

var emailRe = regexp.MustCompile(`^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$`)

func isEmail(s string) bool { return emailRe.MatchString(s) }

// Date YYYY-MM-DD: chỉ check FORMAT, không check ngày hợp lệ.
var dateRe = regexp.MustCompile(`^\d{4}-\d{2}-\d{2}$`)

func isDateFormat(s string) bool { return dateRe.MatchString(s) }

// =====================================================================
// Phụ — Demo redact PII (số điện thoại) trong log
// =====================================================================

// Redact thay số điện thoại bằng "***-***-XXXX" giữ 4 số cuối.
var phoneAnywhereRe = regexp.MustCompile(`(\+84|0)(\d{5})(\d{4})`)

func redactPhone(line string) string {
	return phoneAnywhereRe.ReplaceAllString(line, `$1***-***-$3`)
}

// =====================================================================
// main — demo từng bài tập
// =====================================================================

func main() {
	section("Bài 1 — Validate VN phone")
	for _, s := range []string{
		"0901234567", "+84901234567",
		"84901234567", "0901234", "abc",
	} {
		fmt.Printf("  %-15s -> %v\n", s, isVNPhone(s))
	}

	section("Bài 2 — Extract URL")
	text := "Xem tại https://go.dev và http://example.com/path?q=1 hoặc google.com (không scheme)"
	urls := extractURLs(text)
	fmt.Printf("  Tìm thấy %d URL:\n", len(urls))
	for _, u := range urls {
		fmt.Printf("    - %s\n", u)
	}

	section("Bài 3 — Render template")
	tmpl := "Xin chào {{name}}, bạn có {{count}} tin nhắn. Bug: {{missing}}"
	vars := map[string]string{"name": "Alice", "count": "5"}
	fmt.Println("  Input :", tmpl)
	fmt.Println("  Output:", render(tmpl, vars))

	section("Bài 4 — Parse log line")
	lines := []string{
		"[2024-01-15 10:30:45] INFO User alice logged in",
		"[2024-01-15 10:31:02] ERROR Database connection failed",
		"không phải log hợp lệ",
	}
	for _, ln := range lines {
		date, level, msg, ok := parseLog(ln)
		if !ok {
			fmt.Printf("  ✗ Không parse được: %q\n", ln)
			continue
		}
		fmt.Printf("  ✓ date=%s level=%s msg=%q\n", date, level, msg)
	}

	section("Bài 5 — Split CSV có quote")
	for _, line := range []string{
		`a,b,c`,
		`a,"b,c",d`,
		`name,"Doe, John",30`,
	} {
		fields := splitCSV(line)
		fmt.Printf("  %-30s -> %v\n", line, fields)
	}

	section("Phụ — Validate email & date format")
	for _, s := range []string{"user@example.com", "noAt.com", "a.b+tag@sub.co.uk"} {
		fmt.Printf("  email %-25s -> %v\n", s, isEmail(s))
	}
	for _, s := range []string{"2024-03-15", "2024-3-1", "15-03-2024"} {
		fmt.Printf("  date  %-25s -> %v\n", s, isDateFormat(s))
	}

	section("Phụ — Redact phone trong log")
	logLine := "User contacted via 0901234567 and backup +84909876543"
	fmt.Println("  Input :", logLine)
	fmt.Println("  Redact:", redactPhone(logLine))
}

func section(title string) {
	fmt.Println()
	fmt.Println("================================================================")
	fmt.Println(" " + title)
	fmt.Println("================================================================")
}
