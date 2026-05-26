// Package search cài đặt full-text search bằng INVERTED INDEX + xếp hạng TF-IDF.
//
// Mô phỏng Elasticsearch (L60) nhưng thuần Go in-memory. Kiến trúc:
//   - tokenize: cắt văn bản thành các "term" (lowercase, bỏ ký tự không chữ-số).
//   - inverted index: map term -> danh sách (docID, term frequency).
//   - search: với mỗi term trong query, gộp các posting list, tính điểm TF-IDF.
//
// Đổi sang Elasticsearch thật = viết impl khác của `Index`, service không đổi.
package search

import (
	"math"
	"sort"
	"strings"
	"sync"
	"unicode"
)

// Index là contract của tầng search.
type Index interface {
	// AddOrUpdate đánh chỉ mục 1 document (gọi khi tạo/sửa post).
	AddOrUpdate(docID int64, text string)
	// Remove gỡ document khỏi index (gọi khi xoá post).
	Remove(docID int64)
	// Search trả về danh sách (docID, score) sắp theo điểm giảm dần (TF-IDF).
	Search(query string) []Result
}

// Result — 1 kết quả search: id document + điểm relevance.
type Result struct {
	DocID int64
	Score float64
}

// posting — 1 mục trong posting list: document chứa term + tần suất term đó.
type posting struct {
	docID int64
	tf    int // term frequency: số lần term xuất hiện trong document.
}

// InvertedIndex — impl in-memory.
type InvertedIndex struct {
	mu sync.RWMutex
	// index: term -> posting list.
	index map[string][]posting
	// docLen: docID -> tổng số token (để chuẩn hoá TF nếu cần). Cũng dùng làm
	// "tập document đã index" để tính tổng số doc N cho công thức IDF.
	docLen map[int64]int
}

// NewInvertedIndex tạo index rỗng.
func NewInvertedIndex() *InvertedIndex {
	return &InvertedIndex{
		index:  make(map[string][]posting),
		docLen: make(map[int64]int),
	}
}

// tokenize cắt text thành slice term đã chuẩn hoá (lowercase, chỉ giữ chữ-số).
// Đây là analyzer tối giản — production sẽ thêm stemming, stopword, ...
func tokenize(text string) []string {
	fields := strings.FieldsFunc(strings.ToLower(text), func(r rune) bool {
		return !unicode.IsLetter(r) && !unicode.IsNumber(r)
	})
	return fields
}

func (ix *InvertedIndex) AddOrUpdate(docID int64, text string) {
	ix.mu.Lock()
	defer ix.mu.Unlock()

	// Re-index: gỡ posting cũ của doc này trước (nếu có) để tránh trùng.
	ix.removeLocked(docID)

	tokens := tokenize(text)
	ix.docLen[docID] = len(tokens)

	// Đếm tần suất từng term trong document này.
	tf := make(map[string]int)
	for _, tok := range tokens {
		tf[tok]++
	}
	for term, freq := range tf {
		ix.index[term] = append(ix.index[term], posting{docID: docID, tf: freq})
	}
}

func (ix *InvertedIndex) Remove(docID int64) {
	ix.mu.Lock()
	defer ix.mu.Unlock()
	ix.removeLocked(docID)
}

// removeLocked gỡ mọi posting của docID. Phải gọi khi đã giữ lock.
func (ix *InvertedIndex) removeLocked(docID int64) {
	if _, ok := ix.docLen[docID]; !ok {
		return
	}
	delete(ix.docLen, docID)
	for term, plist := range ix.index {
		filtered := plist[:0]
		for _, p := range plist {
			if p.docID != docID {
				filtered = append(filtered, p)
			}
		}
		if len(filtered) == 0 {
			delete(ix.index, term)
		} else {
			ix.index[term] = filtered
		}
	}
}

// Search tính điểm TF-IDF cho mỗi document khớp ≥ 1 term trong query.
//
// Công thức (BT3):
//
//	idf(term) = ln( 1 + N / (1 + df) )    với N = tổng số doc, df = số doc chứa term.
//	score(doc) = Σ_term [ tf(term, doc) × idf(term) ]
//
// idf đánh trọng số: term hiếm (df nhỏ) -> idf lớn -> đóng góp nhiều hơn.
// Cộng thêm 1 trong log để tránh idf âm/0 khi term có mặt ở mọi doc.
func (ix *InvertedIndex) Search(query string) []Result {
	ix.mu.RLock()
	defer ix.mu.RUnlock()

	terms := tokenize(query)
	if len(terms) == 0 {
		return nil
	}

	n := float64(len(ix.docLen)) // tổng số document đã index.
	scores := make(map[int64]float64)

	// Khử trùng term trong query để không cộng IDF nhiều lần cho cùng term.
	seen := make(map[string]bool)
	for _, term := range terms {
		if seen[term] {
			continue
		}
		seen[term] = true

		plist, ok := ix.index[term]
		if !ok {
			continue // term không có trong corpus.
		}
		df := float64(len(plist))
		idf := math.Log(1 + n/(1+df))
		for _, p := range plist {
			scores[p.docID] += float64(p.tf) * idf
		}
	}

	results := make([]Result, 0, len(scores))
	for id, sc := range scores {
		results = append(results, Result{DocID: id, Score: sc})
	}
	// Sắp theo điểm giảm dần; tie-break theo docID tăng để ổn định.
	sort.Slice(results, func(i, j int) bool {
		if results[i].Score == results[j].Score {
			return results[i].DocID < results[j].DocID
		}
		return results[i].Score > results[j].Score
	})
	return results
}
