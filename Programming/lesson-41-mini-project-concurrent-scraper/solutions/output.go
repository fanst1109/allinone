package main

import (
	"bufio"
	"encoding/json"
	"fmt"
	"os"
	"sync"
)

// jsonWriterErrLog là stderr — gom 1 chỗ để dễ refactor sang structured log.
var jsonWriterErrLog = os.Stderr

// JSONWriter ghi kết quả ra file dưới dạng JSON Lines (mỗi Result 1 dòng JSON).
// Format này dễ stream + append, không cần load toàn bộ vào memory trước khi ghi.
//
// Mutex bảo vệ writer khi nhiều worker ghi đồng thời.
type JSONWriter struct {
	mu  sync.Mutex
	f   *os.File
	bw  *bufio.Writer
	enc *json.Encoder
}

// NewJSONWriter mở file output (tạo mới hoặc overwrite). bufio.Writer giảm số
// syscall — gom buffer 4KB rồi ghi một lần.
func NewJSONWriter(path string) (*JSONWriter, error) {
	f, err := os.Create(path)
	if err != nil {
		return nil, err
	}
	bw := bufio.NewWriter(f)
	enc := json.NewEncoder(bw)
	return &JSONWriter{f: f, bw: bw, enc: enc}, nil
}

// Write ghi 1 Result. Encoder tự thêm '\n' cuối mỗi line.
func (w *JSONWriter) Write(r Result) error {
	w.mu.Lock()
	defer w.mu.Unlock()
	if err := w.enc.Encode(r); err != nil {
		return fmt.Errorf("encode: %w", err)
	}
	return nil
}

// Close flush bufio + đóng file. Phải gọi cuối cùng, nếu không buffered data
// chưa ghi xuống disk.
func (w *JSONWriter) Close() error {
	w.mu.Lock()
	defer w.mu.Unlock()
	if err := w.bw.Flush(); err != nil {
		return err
	}
	return w.f.Close()
}
