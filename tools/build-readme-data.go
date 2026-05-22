// build-readme-data.go — tạo file README.data.js cạnh mỗi cặp
// (README.md + visualization.html) trong repo. File sinh ra chứa nội dung
// README dưới dạng JavaScript template literal gán vào window.README_MD,
// để các visualization có thể load mà không phải fetch (file:// chặn fetch).
//
// Cách chạy (từ thư mục gốc repo):
//
//	go run tools/build-readme-data.go
//
// Hoặc chỉ định thư mục cụ thể:
//
//	go run tools/build-readme-data.go DataFoundations
package main

import (
	"fmt"
	"io/fs"
	"os"
	"path/filepath"
	"strings"
)

func main() {
	root := "."
	if len(os.Args) > 1 {
		root = os.Args[1]
	}

	var lessons []string
	err := filepath.WalkDir(root, func(p string, d fs.DirEntry, err error) error {
		if err != nil {
			return err
		}
		if !d.IsDir() {
			return nil
		}
		name := d.Name()
		// Skip hidden dirs and common build artifact dirs.
		if name != "." && (strings.HasPrefix(name, ".") || name == "node_modules" || name == "tools") {
			return filepath.SkipDir
		}
		entries, err := os.ReadDir(p)
		if err != nil {
			return err
		}
		hasReadme := false
		hasViz := false
		for _, e := range entries {
			switch e.Name() {
			case "README.md":
				hasReadme = true
			case "visualization.html":
				hasViz = true
			}
		}
		if hasReadme && hasViz {
			lessons = append(lessons, p)
		}
		return nil
	})
	if err != nil {
		fmt.Fprintln(os.Stderr, "lỗi khi walk:", err)
		os.Exit(1)
	}

	fmt.Printf("Tìm thấy %d thư mục có cả README.md và visualization.html.\n", len(lessons))

	for _, dir := range lessons {
		mdPath := filepath.Join(dir, "README.md")
		content, err := os.ReadFile(mdPath)
		if err != nil {
			fmt.Println("  ✗", mdPath, err)
			continue
		}

		// Escape các ký tự đặc biệt trong JS template literal `...`:
		//   \  → \\
		//   `  → \`
		//   ${ → \${
		escaped := strings.ReplaceAll(string(content), `\`, `\\`)
		escaped = strings.ReplaceAll(escaped, "`", "\\`")
		escaped = strings.ReplaceAll(escaped, "${", "\\${")

		out := fmt.Sprintf(`// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: %s
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `+"`%s`"+`;
`, filepath.ToSlash(mdPath), escaped)

		outPath := filepath.Join(dir, "README.data.js")
		if err := os.WriteFile(outPath, []byte(out), 0644); err != nil {
			fmt.Println("  ✗", outPath, err)
			continue
		}
		fmt.Println("  →", filepath.ToSlash(outPath))
	}
}
