package post

import (
	"encoding/json"
	"errors"
	"net/http"
	"strconv"
	"strings"

	"blog-backend/internal/storage"
)

// Handler là lớp HTTP — chuyển request thành lời gọi service, rồi encode JSON.
// Nó không chứa logic nghiệp vụ (mọi thứ nằm ở Service).
type Handler struct {
	svc *Service
}

// NewHandler tạo handler bọc quanh service.
func NewHandler(svc *Service) *Handler { return &Handler{svc: svc} }

// Routes đăng ký các endpoint vào mux. Dùng pattern method-aware của Go 1.22.
//
//	POST   /posts            tạo post
//	GET    /posts            list (phân trang + ?tag=)
//	GET    /posts/search     full-text search (?q=)
//	GET    /posts/{id}       get 1 post (cache-aside)
//	PUT    /posts/{id}       update post
//	DELETE /posts/{id}       xoá post
//	POST   /posts/{id}/comments  thêm comment (transaction)
//	POST   /posts/{id}/view      tăng lượt xem
//	GET    /facets           đếm post theo tag (faceted)
func (h *Handler) Routes(mux *http.ServeMux) {
	mux.HandleFunc("POST /posts", h.create)
	mux.HandleFunc("GET /posts", h.list)
	mux.HandleFunc("GET /posts/search", h.search)
	mux.HandleFunc("GET /posts/{id}", h.get)
	mux.HandleFunc("PUT /posts/{id}", h.update)
	mux.HandleFunc("DELETE /posts/{id}", h.delete)
	mux.HandleFunc("POST /posts/{id}/comments", h.addComment)
	mux.HandleFunc("POST /posts/{id}/view", h.incrViews)
	mux.HandleFunc("GET /facets", h.facets)
}

// writeJSON encode v thành JSON với status code cho trước.
func writeJSON(w http.ResponseWriter, status int, v any) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(status)
	_ = json.NewEncoder(w).Encode(v)
}

// writeErr chuyển error nghiệp vụ thành HTTP status phù hợp.
func writeErr(w http.ResponseWriter, err error) {
	switch {
	case errors.Is(err, storage.ErrNotFound):
		writeJSON(w, http.StatusNotFound, map[string]string{"error": "not found"})
	case errors.Is(err, ErrValidation):
		writeJSON(w, http.StatusBadRequest, map[string]string{"error": err.Error()})
	default:
		writeJSON(w, http.StatusInternalServerError, map[string]string{"error": err.Error()})
	}
}

func pathID(r *http.Request) (int64, error) {
	return strconv.ParseInt(r.PathValue("id"), 10, 64)
}

func (h *Handler) create(w http.ResponseWriter, r *http.Request) {
	var in CreatePostInput
	if err := json.NewDecoder(r.Body).Decode(&in); err != nil {
		writeJSON(w, http.StatusBadRequest, map[string]string{"error": "JSON không hợp lệ"})
		return
	}
	p, err := h.svc.Create(r.Context(), in)
	if err != nil {
		writeErr(w, err)
		return
	}
	writeJSON(w, http.StatusCreated, p)
}

func (h *Handler) get(w http.ResponseWriter, r *http.Request) {
	id, err := pathID(r)
	if err != nil {
		writeJSON(w, http.StatusBadRequest, map[string]string{"error": "id không hợp lệ"})
		return
	}
	p, err := h.svc.Get(r.Context(), id)
	if err != nil {
		writeErr(w, err)
		return
	}
	writeJSON(w, http.StatusOK, p)
}

func (h *Handler) update(w http.ResponseWriter, r *http.Request) {
	id, err := pathID(r)
	if err != nil {
		writeJSON(w, http.StatusBadRequest, map[string]string{"error": "id không hợp lệ"})
		return
	}
	var in UpdatePostInput
	if err := json.NewDecoder(r.Body).Decode(&in); err != nil {
		writeJSON(w, http.StatusBadRequest, map[string]string{"error": "JSON không hợp lệ"})
		return
	}
	p, err := h.svc.Update(r.Context(), id, in)
	if err != nil {
		writeErr(w, err)
		return
	}
	writeJSON(w, http.StatusOK, p)
}

func (h *Handler) delete(w http.ResponseWriter, r *http.Request) {
	id, err := pathID(r)
	if err != nil {
		writeJSON(w, http.StatusBadRequest, map[string]string{"error": "id không hợp lệ"})
		return
	}
	if err := h.svc.Delete(r.Context(), id); err != nil {
		writeErr(w, err)
		return
	}
	w.WriteHeader(http.StatusNoContent)
}

func (h *Handler) list(w http.ResponseWriter, r *http.Request) {
	q := r.URL.Query()
	page, _ := strconv.Atoi(q.Get("page"))
	per, _ := strconv.Atoi(q.Get("per_page"))
	params := ListParams{Page: page, PerPage: per, Tag: strings.TrimSpace(q.Get("tag"))}
	res, err := h.svc.List(r.Context(), params)
	if err != nil {
		writeErr(w, err)
		return
	}
	writeJSON(w, http.StatusOK, res)
}

func (h *Handler) search(w http.ResponseWriter, r *http.Request) {
	query := r.URL.Query().Get("q")
	hits, err := h.svc.Search(r.Context(), query)
	if err != nil {
		writeErr(w, err)
		return
	}
	writeJSON(w, http.StatusOK, map[string]any{"query": query, "hits": hits})
}

func (h *Handler) addComment(w http.ResponseWriter, r *http.Request) {
	id, err := pathID(r)
	if err != nil {
		writeJSON(w, http.StatusBadRequest, map[string]string{"error": "id không hợp lệ"})
		return
	}
	var in struct {
		Author string `json:"author"`
		Body   string `json:"body"`
	}
	if err := json.NewDecoder(r.Body).Decode(&in); err != nil {
		writeJSON(w, http.StatusBadRequest, map[string]string{"error": "JSON không hợp lệ"})
		return
	}
	c, count, err := h.svc.AddComment(r.Context(), id, in.Author, in.Body)
	if err != nil {
		writeErr(w, err)
		return
	}
	writeJSON(w, http.StatusCreated, map[string]any{"comment": c, "comment_count": count})
}

func (h *Handler) incrViews(w http.ResponseWriter, r *http.Request) {
	id, err := pathID(r)
	if err != nil {
		writeJSON(w, http.StatusBadRequest, map[string]string{"error": "id không hợp lệ"})
		return
	}
	p, err := h.svc.IncrementViews(r.Context(), id)
	if err != nil {
		writeErr(w, err)
		return
	}
	writeJSON(w, http.StatusOK, p)
}

func (h *Handler) facets(w http.ResponseWriter, r *http.Request) {
	writeJSON(w, http.StatusOK, h.svc.TagFacets(r.Context()))
}
