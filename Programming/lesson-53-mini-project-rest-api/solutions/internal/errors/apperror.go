// Package errors định nghĩa AppError + mapping sang RFC 7807 (Problem Details).
package errors

import (
	"encoding/json"
	"errors"
	"net/http"
)

// Code là loại lỗi nghiệp vụ — map 1:1 với một HTTP status.
type Code string

const (
	CodeValidation   Code = "validation_failed"
	CodeUnauthorized Code = "unauthorized"
	CodeForbidden    Code = "forbidden"
	CodeNotFound     Code = "not_found"
	CodeConflict     Code = "conflict"
	CodeRateLimited  Code = "rate_limited"
	CodeInternal     Code = "internal_error"
)

// AppError là lỗi nghiệp vụ chuẩn của API.
type AppError struct {
	Code    Code              // mã lỗi nghiệp vụ
	Status  int               // HTTP status code
	Title   string            // tiêu đề ngắn
	Detail  string            // mô tả cụ thể tình huống lỗi
	Fields  map[string]string // chi tiết lỗi theo field (validation)
	wrapped error             // lỗi gốc (cho %w)
}

func (e *AppError) Error() string {
	if e.Detail != "" {
		return string(e.Code) + ": " + e.Detail
	}
	return string(e.Code) + ": " + e.Title
}

func (e *AppError) Unwrap() error { return e.wrapped }

// New tạo AppError mới.
func New(code Code, status int, title, detail string) *AppError {
	return &AppError{Code: code, Status: status, Title: title, Detail: detail}
}

// Wrap bọc một error gốc thành AppError, giữ chain cho errors.Is/As.
func Wrap(err error, code Code, status int, title, detail string) *AppError {
	return &AppError{Code: code, Status: status, Title: title, Detail: detail, wrapped: err}
}

// WithFields gắn map field-error (dùng cho validation).
func (e *AppError) WithFields(f map[string]string) *AppError {
	e.Fields = f
	return e
}

// Helper constructors — gọn cho call site.
func NotFound(detail string) *AppError {
	return New(CodeNotFound, http.StatusNotFound, "Resource not found", detail)
}
func Unauthorized(detail string) *AppError {
	return New(CodeUnauthorized, http.StatusUnauthorized, "Unauthorized", detail)
}
func Forbidden(detail string) *AppError {
	return New(CodeForbidden, http.StatusForbidden, "Forbidden", detail)
}
func Conflict(detail string) *AppError {
	return New(CodeConflict, http.StatusConflict, "Conflict", detail)
}
func Validation(detail string, fields map[string]string) *AppError {
	return New(CodeValidation, http.StatusBadRequest, "Validation failed", detail).WithFields(fields)
}
func Internal(detail string) *AppError {
	return New(CodeInternal, http.StatusInternalServerError, "Internal error", detail)
}

// Problem là payload theo RFC 7807 (application/problem+json).
type Problem struct {
	Type     string            `json:"type"`
	Title    string            `json:"title"`
	Status   int               `json:"status"`
	Detail   string            `json:"detail,omitempty"`
	Instance string            `json:"instance,omitempty"`
	Code     Code              `json:"code,omitempty"`
	Errors   map[string]string `json:"errors,omitempty"`
}

// Write ghi error ra ResponseWriter dạng RFC 7807.
func Write(w http.ResponseWriter, r *http.Request, err error) {
	var ae *AppError
	if !errors.As(err, &ae) {
		ae = Internal(err.Error())
	}
	p := Problem{
		Type:     "https://blog-api/errors/" + string(ae.Code),
		Title:    ae.Title,
		Status:   ae.Status,
		Detail:   ae.Detail,
		Instance: r.URL.Path,
		Code:     ae.Code,
		Errors:   ae.Fields,
	}
	w.Header().Set("Content-Type", "application/problem+json")
	w.WriteHeader(ae.Status)
	_ = json.NewEncoder(w).Encode(p)
}
