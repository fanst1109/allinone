// Package http là DRIVING ADAPTER: nhận HTTP request và gọi vào usecase.
// Mọi thứ framework-specific (đọc body, set status, encode JSON, build URL)
// nằm ở đây — không rò vào usecase/domain.
//
// Handler chỉ phụ thuộc vào các interface NHỎ (driving port) do chính nó
// định nghĩa: Shortener, Resolver, Statser. Các usecase thỏa chúng nhờ
// structural typing của Go, nên handler test được với mock.
package http

import (
	"context"
	"encoding/json"
	"errors"
	"net/http"
	"strings"

	"urlshortener/internal/domain"
)

// --- Driving ports (handler sở hữu) ---

type Shortener interface {
	Shorten(ctx context.Context, original string) (*domain.URL, error)
	ShortenWithAlias(ctx context.Context, original, alias string) (*domain.URL, error)
}

type Resolver interface {
	Resolve(ctx context.Context, code, referrer, ip string) (string, error)
}

type Statser interface {
	Get(ctx context.Context, code string) (*domain.Stats, error)
}

// Handler dịch HTTP <-> usecase.
type Handler struct {
	shortener Shortener
	resolver  Resolver
	statser   Statser
	baseURL   string // vd "http://localhost:8080" để dựng short_url
}

// NewHandler — constructor injection.
func NewHandler(s Shortener, r Resolver, st Statser, baseURL string) *Handler {
	return &Handler{shortener: s, resolver: r, statser: st, baseURL: strings.TrimRight(baseURL, "/")}
}

// Routes mount toàn bộ endpoint. Composition root sẽ bọc middleware quanh nó.
//
// Lưu ý thứ tự: route cụ thể ("/api/...") đăng ký trước, route bắt code
// ("/{code}") đặt sau để không nuốt nhầm "/api".
func (h *Handler) Routes() *http.ServeMux {
	mux := http.NewServeMux()
	mux.HandleFunc("POST /api/shorten", h.shorten)
	mux.HandleFunc("GET /api/stats/{code}", h.stats)
	mux.HandleFunc("GET /healthz", h.health)
	mux.HandleFunc("GET /{code}", h.redirect)
	return mux
}

// --- DTO (hình dạng JSON ở biên hệ thống) ---

type shortenReq struct {
	URL   string `json:"url"`
	Alias string `json:"alias,omitempty"` // tùy chọn (BT1 custom alias)
}

type shortenResp struct {
	Code     string `json:"code"`
	ShortURL string `json:"short_url"`
}

type statsResp struct {
	Code         string                `json:"code"`
	URL          string                `json:"url"`
	TotalClicks  int                   `json:"total_clicks"`
	ClicksByDay  map[string]int        `json:"clicks_by_day"`
	TopReferrers []domain.ReferrerStat `json:"top_referrers"`
}

// --- Handlers ---

// POST /api/shorten
func (h *Handler) shorten(w http.ResponseWriter, r *http.Request) {
	var in shortenReq
	if err := json.NewDecoder(r.Body).Decode(&in); err != nil {
		writeProblem(w, http.StatusBadRequest, "invalid-json", "Body JSON không hợp lệ")
		return
	}

	var (
		u   *domain.URL
		err error
	)
	if in.Alias != "" {
		u, err = h.shortener.ShortenWithAlias(r.Context(), in.URL, in.Alias)
	} else {
		u, err = h.shortener.Shorten(r.Context(), in.URL)
	}
	if err != nil {
		writeDomainErr(w, err)
		return
	}

	writeJSON(w, http.StatusCreated, shortenResp{
		Code:     u.Code,
		ShortURL: h.baseURL + "/" + u.Code,
	})
}

// GET /{code} -> 302 redirect + emit click async.
func (h *Handler) redirect(w http.ResponseWriter, r *http.Request) {
	code := r.PathValue("code")
	original, err := h.resolver.Resolve(r.Context(), code, r.Referer(), clientIP(r))
	if err != nil {
		writeDomainErr(w, err)
		return
	}
	// 302 Found: trình duyệt sẽ GET URL gốc. Click event đã được emit async
	// bên trong Resolve — handler KHÔNG chờ analytics.
	http.Redirect(w, r, original, http.StatusFound)
}

// GET /api/stats/{code}
func (h *Handler) stats(w http.ResponseWriter, r *http.Request) {
	code := r.PathValue("code")
	s, err := h.statser.Get(r.Context(), code)
	if err != nil {
		writeDomainErr(w, err)
		return
	}
	writeJSON(w, http.StatusOK, statsResp{
		Code:         s.Code,
		URL:          s.Original,
		TotalClicks:  s.TotalClicks,
		ClicksByDay:  s.ClicksByDay,
		TopReferrers: s.TopReferrers,
	})
}

// GET /healthz — liveness probe (đầy đủ ở L84).
func (h *Handler) health(w http.ResponseWriter, _ *http.Request) {
	writeJSON(w, http.StatusOK, map[string]string{"status": "ok"})
}

// --- Helpers ---

// clientIP lấy IP client, ưu tiên X-Forwarded-For (sau reverse proxy).
func clientIP(r *http.Request) string {
	if xff := r.Header.Get("X-Forwarded-For"); xff != "" {
		// XFF có thể là "client, proxy1, proxy2" -> lấy phần đầu.
		if i := strings.IndexByte(xff, ','); i >= 0 {
			return strings.TrimSpace(xff[:i])
		}
		return strings.TrimSpace(xff)
	}
	// RemoteAddr dạng "ip:port" -> cắt port.
	host := r.RemoteAddr
	if i := strings.LastIndexByte(host, ':'); i >= 0 {
		host = host[:i]
	}
	return host
}

// writeDomainErr map LỖI MIỀN -> HTTP status theo RFC 7807 (Lesson 40).
func writeDomainErr(w http.ResponseWriter, err error) {
	switch {
	case errors.Is(err, domain.ErrURLNotFound):
		writeProblem(w, http.StatusNotFound, "not-found", err.Error())
	case errors.Is(err, domain.ErrURLExpired):
		writeProblem(w, http.StatusGone, "expired", err.Error())
	case errors.Is(err, domain.ErrCodeTaken):
		writeProblem(w, http.StatusConflict, "code-taken", err.Error())
	case errors.Is(err, domain.ErrInvalidURL),
		errors.Is(err, domain.ErrInvalidCode):
		writeProblem(w, http.StatusBadRequest, "invalid-input", err.Error())
	default:
		writeProblem(w, http.StatusInternalServerError, "internal", "lỗi nội bộ")
	}
}

func writeJSON(w http.ResponseWriter, status int, v any) {
	w.Header().Set("Content-Type", "application/json; charset=utf-8")
	w.WriteHeader(status)
	_ = json.NewEncoder(w).Encode(v)
}

// problemDetail là body lỗi theo RFC 7807 (application/problem+json).
type problemDetail struct {
	Type   string `json:"type"`   // định danh loại lỗi (URI hoặc slug)
	Title  string `json:"title"`  // mô tả ngắn
	Status int    `json:"status"` // HTTP status
}

// writeProblem ghi lỗi RFC 7807. Title dùng tiếng Việt cho dễ đọc.
func writeProblem(w http.ResponseWriter, status int, typ, title string) {
	w.Header().Set("Content-Type", "application/problem+json; charset=utf-8")
	w.WriteHeader(status)
	_ = json.NewEncoder(w).Encode(problemDetail{
		Type:   "/errors/" + typ,
		Title:  title,
		Status: status,
	})
}
