// build-ipa-dict.go — Sinh tools/ipa-dict.js từ open-dict-data/ipa-dict.
//
// Cách chạy (từ thư mục gốc repo):
//   go run tools/build-ipa-dict.go
//
// Script sẽ:
//   1. Đọc 2 file nguồn ở tools/ipa-source/{en_US,en_UK}.txt nếu có.
//   2. Nếu thiếu thì tự download từ raw.githubusercontent.com/open-dict-data/ipa-dict.
//   3. Parse: mỗi dòng "word\t/ipa1/, /ipa2/, ..." → lấy variant đầu tiên.
//   4. Merge thành map { lowercase_word: "ipa_us|ipa_uk" }.
//      - Nếu UK == US thì bỏ phần sau pipe (chỉ lưu "ipa_us").
//      - Nếu chỉ có UK (không có US): lưu "|ipa_uk".
//   5. Ghi ra tools/ipa-dict.js dưới dạng window.IPA_DICT = {...} (JSON, mỗi
//      entry một dòng để git diff dễ đọc).
//
// File sinh ra ~3-5MB, dùng cho ipa-reader.js (load lazy khi user mở panel).
// KHÔNG sửa tools/ipa-dict.js bằng tay — luôn regenerate bằng script này.

package main

import (
	"bufio"
	"fmt"
	"io"
	"net/http"
	"os"
	"path/filepath"
	"sort"
	"strings"
)

const (
	usURL    = "https://raw.githubusercontent.com/open-dict-data/ipa-dict/master/data/en_US.txt"
	ukURL    = "https://raw.githubusercontent.com/open-dict-data/ipa-dict/master/data/en_UK.txt"
	srcDir   = "tools/ipa-source"
	outFile  = "tools/ipa-dict.js"
)

func fetchOrRead(path, url string) ([]byte, error) {
	if data, err := os.ReadFile(path); err == nil {
		return data, nil
	}
	fmt.Printf("  Download %s\n", url)
	resp, err := http.Get(url)
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()
	if resp.StatusCode != 200 {
		return nil, fmt.Errorf("HTTP %d for %s", resp.StatusCode, url)
	}
	data, err := io.ReadAll(resp.Body)
	if err != nil {
		return nil, err
	}
	if err := os.MkdirAll(filepath.Dir(path), 0o755); err != nil {
		return nil, err
	}
	if err := os.WriteFile(path, data, 0o644); err != nil {
		return nil, err
	}
	return data, nil
}

// parse trả về map[word]ipa (variant đầu tiên, đã strip dấu / / bao quanh).
func parse(data []byte) map[string]string {
	out := make(map[string]string)
	scanner := bufio.NewScanner(strings.NewReader(string(data)))
	scanner.Buffer(make([]byte, 1<<20), 1<<20)
	for scanner.Scan() {
		line := strings.TrimSpace(scanner.Text())
		if line == "" || strings.HasPrefix(line, "#") {
			continue
		}
		parts := strings.SplitN(line, "\t", 2)
		if len(parts) != 2 {
			continue
		}
		word := strings.ToLower(strings.TrimSpace(parts[0]))
		ipas := strings.TrimSpace(parts[1])
		if word == "" || ipas == "" {
			continue
		}
		// Lấy variant đầu (tách bằng dấu phẩy).
		first := strings.SplitN(ipas, ",", 2)[0]
		first = strings.TrimSpace(first)
		first = strings.Trim(first, "/")
		first = strings.TrimSpace(first)
		if first == "" {
			continue
		}
		// Bỏ qua ký tự không an toàn cho JSON string đơn giản.
		if strings.ContainsAny(first, "\\\"") {
			continue
		}
		out[word] = first
	}
	return out
}

// jsonEscape an toàn cho JS string với "" — IPA không có \, ", control chars
// nên chỉ cần thay " và \. Đã filter ở parse() rồi.
func jsonEscape(s string) string {
	return s
}

func main() {
	fmt.Println("[build-ipa-dict] đang chuẩn bị nguồn dữ liệu...")

	usPath := filepath.Join(srcDir, "en_US.txt")
	ukPath := filepath.Join(srcDir, "en_UK.txt")

	usData, err := fetchOrRead(usPath, usURL)
	if err != nil {
		fmt.Fprintln(os.Stderr, "ERROR fetch en_US:", err)
		os.Exit(1)
	}
	ukData, err := fetchOrRead(ukPath, ukURL)
	if err != nil {
		fmt.Fprintln(os.Stderr, "ERROR fetch en_UK:", err)
		os.Exit(1)
	}

	fmt.Println("[build-ipa-dict] parsing...")
	us := parse(usData)
	uk := parse(ukData)
	fmt.Printf("  US entries: %d\n", len(us))
	fmt.Printf("  UK entries: %d\n", len(uk))

	// Gom toàn bộ key.
	seen := make(map[string]struct{}, len(us)+len(uk))
	for w := range us {
		seen[w] = struct{}{}
	}
	for w := range uk {
		seen[w] = struct{}{}
	}
	words := make([]string, 0, len(seen))
	for w := range seen {
		words = append(words, w)
	}
	sort.Strings(words)

	fmt.Println("[build-ipa-dict] writing", outFile)
	f, err := os.Create(outFile)
	if err != nil {
		fmt.Fprintln(os.Stderr, "ERROR create out:", err)
		os.Exit(1)
	}
	defer f.Close()

	bw := bufio.NewWriter(f)
	defer bw.Flush()

	bw.WriteString("// Auto-generated bởi tools/build-ipa-dict.go — KHÔNG sửa tay.\n")
	bw.WriteString("// Nguồn: https://github.com/open-dict-data/ipa-dict (en_US + en_UK).\n")
	bw.WriteString("// Format mỗi entry: \"word\": \"ipa_us|ipa_uk\"\n")
	bw.WriteString("//   - Nếu giá trị KHÔNG có dấu | → US và UK giống nhau (dùng chung).\n")
	bw.WriteString("//   - Nếu bắt đầu bằng | → chỉ có UK (US fallback về UK).\n")
	bw.WriteString("//   - Nếu kết thúc bằng | → chỉ có US (UK fallback về US).\n")
	bw.WriteString("window.IPA_DICT = {\n")

	keptCount := 0
	for i, w := range words {
		usIpa, hasUS := us[w]
		ukIpa, hasUK := uk[w]

		var val string
		switch {
		case hasUS && hasUK:
			if usIpa == ukIpa {
				val = usIpa
			} else {
				val = usIpa + "|" + ukIpa
			}
		case hasUS:
			val = usIpa + "|"
		case hasUK:
			val = "|" + ukIpa
		}
		if val == "" || val == "|" {
			continue
		}

		// Bỏ qua word có ký tự nguy hiểm cho JSON đơn giản.
		if strings.ContainsAny(w, "\\\"") {
			continue
		}

		comma := ","
		if i == len(words)-1 {
			comma = ""
		}
		bw.WriteString("\"")
		bw.WriteString(jsonEscape(w))
		bw.WriteString("\":\"")
		bw.WriteString(jsonEscape(val))
		bw.WriteString("\"")
		bw.WriteString(comma)
		bw.WriteString("\n")
		keptCount++
	}
	bw.WriteString("};\n")

	fmt.Printf("[build-ipa-dict] xong — %d entries\n", keptCount)
}
