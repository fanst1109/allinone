package main

import (
	"encoding/json"
	"errors"
	"fmt"
	"os"
)

// dataFile — đường dẫn file lưu state.
// Đơn giản: dùng file trong CWD. Nếu muốn lưu vào $HOME,
// đổi sang filepath.Join(os.UserHomeDir(), ".todo.json").
const dataFile = ".todo.json"

// Store — wrapper bao quanh slice tasks + metadata (nextID).
// Lưu nextID riêng để khi xóa task cuối, ID không bị tái sử dụng.
type Store struct {
	NextID int    `json:"nextId"`
	Tasks  []Task `json:"tasks"`
}

// LoadStore — đọc file JSON, parse vào Store.
// Nếu file chưa tồn tại (lần chạy đầu) → trả về Store rỗng với NextID = 1.
// KHÔNG coi đây là lỗi vì user mới cài cũng cần chạy được.
func LoadStore() (*Store, error) {
	data, err := os.ReadFile(dataFile)
	if err != nil {
		// File chưa tồn tại lần đầu — khởi tạo store rỗng.
		if errors.Is(err, os.ErrNotExist) {
			return &Store{NextID: 1, Tasks: []Task{}}, nil
		}
		return nil, fmt.Errorf("đọc %s lỗi: %w", dataFile, err)
	}

	// File tồn tại nhưng rỗng (0 byte) — cũng khởi tạo store rỗng.
	if len(data) == 0 {
		return &Store{NextID: 1, Tasks: []Task{}}, nil
	}

	var s Store
	if err := json.Unmarshal(data, &s); err != nil {
		return nil, fmt.Errorf("parse JSON lỗi: %w", err)
	}

	// Sanity check: nếu NextID = 0 (file cũ format trước), tự sửa.
	if s.NextID == 0 {
		s.NextID = 1
		for _, t := range s.Tasks {
			if t.ID >= s.NextID {
				s.NextID = t.ID + 1
			}
		}
	}
	return &s, nil
}

// Save — serialize Store sang JSON pretty (indent 2) và ghi xuống file.
// MarshalIndent thay vì Marshal để file dễ đọc bằng mắt khi debug.
func (s *Store) Save() error {
	data, err := json.MarshalIndent(s, "", "  ")
	if err != nil {
		return fmt.Errorf("marshal lỗi: %w", err)
	}
	// 0644 = chủ owner đọc/ghi, khác chỉ đọc — chuẩn cho config file user.
	if err := os.WriteFile(dataFile, data, 0644); err != nil {
		return fmt.Errorf("ghi %s lỗi: %w", dataFile, err)
	}
	return nil
}

// FindByID — trả về POINTER tới task có ID tương ứng (để caller sửa được).
// Trả về nil nếu không tìm thấy — caller chịu trách nhiệm check nil.
// Lưu ý: phải dùng index (&s.Tasks[i]) chứ KHÔNG phải biến `t` trong range,
// vì biến range là COPY, sửa nó không ảnh hưởng slice gốc.
func (s *Store) FindByID(id int) *Task {
	for i := range s.Tasks {
		if s.Tasks[i].ID == id {
			return &s.Tasks[i]
		}
	}
	return nil
}

// FindIndex — trả về vị trí của task trong slice, -1 nếu không có.
// Dùng cho lệnh remove (cần index để cắt slice).
func (s *Store) FindIndex(id int) int {
	for i, t := range s.Tasks {
		if t.ID == id {
			return i
		}
	}
	return -1
}
