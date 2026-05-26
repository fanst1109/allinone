// Package httpx chứa các helper HTTP dùng chung: decode/encode JSON an toàn.
package httpx

import (
	"encoding/json"
	"errors"
	"io"
	"net/http"

	apperr "blog-api/internal/errors"
)

// MaxBodyBytes giới hạn kích thước request body để tránh tấn công gửi body khổng lồ (1MB).
const MaxBodyBytes = 1 << 20

// DecodeJSON đọc body request thành struct dst.
// - Giới hạn kích thước body.
// - Từ chối field lạ (DisallowUnknownFields) → bắt lỗi typo của client.
// - Trả AppError validation thân thiện thay vì lỗi thô.
func DecodeJSON(w http.ResponseWriter, r *http.Request, dst any) error {
	if r.Body == nil {
		return apperr.Validation("request body rỗng", nil)
	}
	r.Body = http.MaxBytesReader(w, r.Body, MaxBodyBytes)

	dec := json.NewDecoder(r.Body)
	dec.DisallowUnknownFields()

	if err := dec.Decode(dst); err != nil {
		var maxErr *http.MaxBytesError
		switch {
		case errors.As(err, &maxErr):
			return apperr.Validation("request body quá lớn", nil)
		case errors.Is(err, io.EOF):
			return apperr.Validation("request body rỗng", nil)
		default:
			return apperr.Validation("JSON không hợp lệ: "+err.Error(), nil)
		}
	}

	// Đảm bảo chỉ có MỘT JSON object trong body (chống dữ liệu rác phía sau).
	if dec.More() {
		return apperr.Validation("body chứa nhiều hơn một JSON object", nil)
	}
	return nil
}

// WriteJSON ghi v ra response với status code cho trước.
func WriteJSON(w http.ResponseWriter, status int, v any) {
	w.Header().Set("Content-Type", "application/json; charset=utf-8")
	w.WriteHeader(status)
	if v == nil {
		return
	}
	_ = json.NewEncoder(w).Encode(v)
}

// NoContent trả 204 không kèm body.
func NoContent(w http.ResponseWriter) {
	w.WriteHeader(http.StatusNoContent)
}
