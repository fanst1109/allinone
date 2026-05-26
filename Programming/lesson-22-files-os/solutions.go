// Lesson 22 — File & OS
// File này gom các pattern chính: mở file, append, walk, atomic write, tail,
// permission demo, stdin demo. Chạy: `go run solutions.go [demo]`
// Trong đó [demo] là một trong: open | append | walk | atomic | tail | perm | stdin
// Không truyền tham số → chạy hết các demo (trừ stdin để khỏi chờ input).
package main

import (
	"bufio"
	"bytes"
	"encoding/json"
	"errors"
	"fmt"
	"io"
	"io/fs"
	"os"
	"path/filepath"
	"runtime"
	"strings"
	"time"
)

func main() {
	demo := "all"
	if len(os.Args) > 1 {
		demo = os.Args[1]
	}

	switch demo {
	case "open":
		demoOpen()
	case "append":
		demoAppend()
	case "walk":
		demoWalk(".")
	case "atomic":
		demoAtomic()
	case "tail":
		demoTail()
	case "perm":
		demoPerm()
	case "stdin":
		demoStdin()
	case "all":
		demoOpen()
		demoAppend()
		demoWalk(".")
		demoAtomic()
		demoTail()
		demoPerm()
		demoOSInfo()
	default:
		fmt.Fprintln(os.Stderr, "Unknown demo:", demo)
		os.Exit(1)
	}
}

// ---------------------------------------------------------------------------
// Demo 1: os.Open / Create / OpenFile — 3 cách mở file phổ biến.
// ---------------------------------------------------------------------------
func demoOpen() {
	fmt.Println("=== Demo 1: Open / Create / OpenFile ===")
	tmpDir, err := os.MkdirTemp("", "l22-open-*")
	must(err)
	defer os.RemoveAll(tmpDir)

	// (1) Create — ghi mới, truncate nếu đã có
	path := filepath.Join(tmpDir, "hello.txt")
	f, err := os.Create(path)
	must(err)
	_, _ = f.WriteString("Xin chào Go!\n")
	_ = f.Close()
	fmt.Println("Đã tạo:", path)

	// (2) Open — read-only, file phải tồn tại
	rf, err := os.Open(path)
	must(err)
	data, _ := io.ReadAll(rf)
	_ = rf.Close()
	fmt.Println("Đọc lại:", strings.TrimRight(string(data), "\n"))

	// (3) OpenFile với O_EXCL — fail nếu file đã có (pattern lock file)
	_, err = os.OpenFile(path, os.O_CREATE|os.O_EXCL|os.O_WRONLY, 0644)
	if errors.Is(err, os.ErrExist) {
		fmt.Println("OpenFile EXCL fail như mong đợi: file đã tồn tại")
	}
	fmt.Println()
}

// ---------------------------------------------------------------------------
// Demo 2: Append — ghi vào cuối file với O_APPEND.
// ---------------------------------------------------------------------------
func demoAppend() {
	fmt.Println("=== Demo 2: Append ===")
	tmpDir, err := os.MkdirTemp("", "l22-append-*")
	must(err)
	defer os.RemoveAll(tmpDir)

	logPath := filepath.Join(tmpDir, "app.log")

	// Append 3 lần
	for i := 1; i <= 3; i++ {
		f, err := os.OpenFile(logPath,
			os.O_APPEND|os.O_CREATE|os.O_WRONLY,
			0644)
		must(err)
		_, _ = fmt.Fprintf(f, "[INFO] dòng %d lúc %s\n", i, time.Now().Format(time.RFC3339Nano))
		_ = f.Close()
	}

	// Đọc lại để verify
	content, _ := os.ReadFile(logPath)
	fmt.Print(string(content))
	fmt.Println()
}

// ---------------------------------------------------------------------------
// Demo 3: filepath.WalkDir — duyệt cây thư mục, đếm file .go và tổng size.
// ---------------------------------------------------------------------------
func demoWalk(root string) {
	fmt.Println("=== Demo 3: WalkDir (đếm file .go trong", root, ") ===")
	var (
		count int
		total int64
	)
	err := filepath.WalkDir(root, func(p string, d fs.DirEntry, err error) error {
		if err != nil {
			return err
		}
		if d.IsDir() {
			name := d.Name()
			if name == "vendor" || name == ".git" || name == "node_modules" {
				return filepath.SkipDir
			}
			return nil
		}
		if filepath.Ext(p) != ".go" {
			return nil
		}
		info, err := d.Info()
		if err != nil {
			return err
		}
		count++
		total += info.Size()
		return nil
	})
	if err != nil {
		fmt.Fprintln(os.Stderr, "walk err:", err)
		return
	}
	fmt.Printf("File .go: %d, tổng size: %d byte (~%.2f KB)\n", count, total, float64(total)/1024)
	fmt.Println()
}

// ---------------------------------------------------------------------------
// Demo 4: Atomic write — write tmp + rename. Pattern chống corrupt.
// ---------------------------------------------------------------------------

type Config struct {
	Version string `json:"version"`
	Port    int    `json:"port"`
	Env     string `json:"env"`
}

func atomicWrite(path string, data []byte, perm os.FileMode) error {
	dir := filepath.Dir(path)
	tmp, err := os.CreateTemp(dir, ".tmp-*")
	if err != nil {
		return err
	}
	tmpName := tmp.Name()
	success := false
	defer func() {
		if !success {
			_ = os.Remove(tmpName) // cleanup nếu fail
		}
	}()

	if _, err := tmp.Write(data); err != nil {
		_ = tmp.Close()
		return err
	}
	if err := tmp.Sync(); err != nil { // flush page cache xuống disk
		_ = tmp.Close()
		return err
	}
	if err := tmp.Close(); err != nil {
		return err
	}
	if err := os.Chmod(tmpName, perm); err != nil {
		return err
	}
	if err := os.Rename(tmpName, path); err != nil {
		return err
	}
	success = true
	return nil
}

func saveConfigAtomic(path string, cfg Config) error {
	data, err := json.MarshalIndent(cfg, "", "  ")
	if err != nil {
		return err
	}
	return atomicWrite(path, data, 0644)
}

func demoAtomic() {
	fmt.Println("=== Demo 4: Atomic write JSON config ===")
	tmpDir, err := os.MkdirTemp("", "l22-atomic-*")
	must(err)
	defer os.RemoveAll(tmpDir)

	cfgPath := filepath.Join(tmpDir, "config.json")
	cfg := Config{Version: "1.0.0", Port: 8080, Env: "production"}
	must(saveConfigAtomic(cfgPath, cfg))

	// Đọc lại verify
	data, _ := os.ReadFile(cfgPath)
	fmt.Println("Config đã ghi atomic:")
	fmt.Println(string(data))

	// Stat để check perm
	info, _ := os.Stat(cfgPath)
	fmt.Printf("Mode: %v (octal: %o)\n\n", info.Mode(), info.Mode().Perm())
}

// ---------------------------------------------------------------------------
// Demo 5: Tail — 10 dòng cuối file mà không đọc toàn bộ.
// ---------------------------------------------------------------------------
func tail(path string, n int) ([]string, error) {
	f, err := os.Open(path)
	if err != nil {
		return nil, err
	}
	defer f.Close()

	info, err := f.Stat()
	if err != nil {
		return nil, err
	}
	size := info.Size()

	const chunkSize = 4096
	var buf []byte
	offset := size
	newlines := 0

	for offset > 0 && newlines <= n {
		readSize := int64(chunkSize)
		if offset < readSize {
			readSize = offset
		}
		offset -= readSize

		chunk := make([]byte, readSize)
		if _, err := f.ReadAt(chunk, offset); err != nil {
			return nil, err
		}
		buf = append(chunk, buf...) // prepend
		newlines = bytes.Count(buf, []byte{'\n'})
	}

	text := strings.TrimRight(string(buf), "\n")
	if text == "" {
		return nil, nil
	}
	lines := strings.Split(text, "\n")
	if len(lines) > n {
		lines = lines[len(lines)-n:]
	}
	return lines, nil
}

func demoTail() {
	fmt.Println("=== Demo 5: Tail 5 dòng cuối ===")
	tmpDir, err := os.MkdirTemp("", "l22-tail-*")
	must(err)
	defer os.RemoveAll(tmpDir)

	// Tạo file 20 dòng
	path := filepath.Join(tmpDir, "big.log")
	f, _ := os.Create(path)
	w := bufio.NewWriter(f)
	for i := 1; i <= 20; i++ {
		fmt.Fprintf(w, "line %02d — content abcdef\n", i)
	}
	_ = w.Flush()
	_ = f.Close()

	lines, err := tail(path, 5)
	must(err)
	for _, l := range lines {
		fmt.Println(l)
	}
	fmt.Println()
}

// ---------------------------------------------------------------------------
// Demo 6: Permission octal — minh hoạ cách Mode hiển thị + Chmod.
// ---------------------------------------------------------------------------
func demoPerm() {
	fmt.Println("=== Demo 6: Permission octal ===")
	tmpDir, err := os.MkdirTemp("", "l22-perm-*")
	must(err)
	defer os.RemoveAll(tmpDir)

	path := filepath.Join(tmpDir, "secret.txt")
	// Tạo file với mode 0600
	must(os.WriteFile(path, []byte("only owner can read\n"), 0600))

	info, _ := os.Stat(path)
	fmt.Printf("Sau WriteFile(0600): %v  (octal: %#o)\n", info.Mode(), info.Mode().Perm())

	// Chmod thành 0755 (executable-ish, ai cũng đọc)
	must(os.Chmod(path, 0755))
	info, _ = os.Stat(path)
	fmt.Printf("Sau Chmod(0755):    %v  (octal: %#o)\n", info.Mode(), info.Mode().Perm())

	// Chmod thành 0644 (chuẩn file thường)
	must(os.Chmod(path, 0644))
	info, _ = os.Stat(path)
	fmt.Printf("Sau Chmod(0644):    %v  (octal: %#o)\n", info.Mode(), info.Mode().Perm())
	fmt.Println()
}

// ---------------------------------------------------------------------------
// Demo 7: OS info — runtime.GOOS, hostname, env, args.
// ---------------------------------------------------------------------------
func demoOSInfo() {
	fmt.Println("=== Demo 7: OS info ===")
	fmt.Println("GOOS:    ", runtime.GOOS)
	fmt.Println("GOARCH:  ", runtime.GOARCH)
	host, _ := os.Hostname()
	fmt.Println("Hostname:", host)
	fmt.Println("HOME env:", os.Getenv("HOME"))
	fmt.Println("os.Args: ", os.Args)
	fmt.Println()
}

// ---------------------------------------------------------------------------
// Demo 8: Stdin — đọc dòng user nhập, echo lại. KHÔNG chạy mặc định.
// Test: `go run solutions.go stdin` rồi gõ vài dòng, Ctrl+D để dừng.
// ---------------------------------------------------------------------------
func demoStdin() {
	fmt.Println("=== Demo 8: Stdin echo (Ctrl+D để dừng) ===")
	scanner := bufio.NewScanner(os.Stdin)
	for scanner.Scan() {
		line := scanner.Text()
		_, _ = fmt.Fprintln(os.Stdout, "Echo:", line)
	}
	if err := scanner.Err(); err != nil {
		fmt.Fprintln(os.Stderr, "scanner err:", err)
	}
}

// ---------------------------------------------------------------------------
// Helper
// ---------------------------------------------------------------------------
func must(err error) {
	if err != nil {
		fmt.Fprintln(os.Stderr, "FATAL:", err)
		os.Exit(1)
	}
}
