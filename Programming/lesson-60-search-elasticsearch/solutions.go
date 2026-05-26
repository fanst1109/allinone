// Lesson 60 — Search & Elasticsearch
//
// File này implement CỐT LÕI của một search engine bằng Go THUẦN, KHÔNG cần
// Elasticsearch server:
//   1. Analyzer  : tokenize -> lowercase -> bỏ stop word -> stemming đơn giản
//   2. Inverted index : term -> posting list (kèm term frequency + position)
//   3. Search    : match query (OR), trả về doc khớp
//   4. Scoring   : TF-IDF và BM25 (mặc định của Elasticsearch)
//   5. Autocomplete : trie tiền tố cho gợi ý prefix
//
// Mục đích: hiểu cơ chế bên trong ES. Trong production bạn dùng Lucene/ES qua
// github.com/elastic/go-elasticsearch (xem comment cuối file).
//
// Chạy:  go run solutions.go
package main

import (
	"fmt"
	"math"
	"sort"
	"strings"
)

// ===========================================================================
// 1. ANALYZER — pipeline xử lý text khi index VÀ khi search (phải đối xứng)
// ===========================================================================

// stopWords: các từ vô nghĩa, loại bỏ để posting list ngắn + score đúng hơn.
var stopWords = map[string]bool{
	"the": true, "is": true, "a": true, "an": true, "of": true,
	"and": true, "to": true, "in": true, "are": true, "be": true,
}

// stem: stemming RẤT đơn giản (toy) — chỉ cắt vài hậu tố phổ biến.
// Trong thực tế ES dùng thuật toán Porter/Snowball phức tạp hơn nhiều.
// CẢNH BÁO: đây là toy, "running" -> "runn" không hoàn hảo; ta xử lý vài case.
func stem(word string) string {
	switch {
	case strings.HasSuffix(word, "ies") && len(word) > 4:
		return word[:len(word)-3] + "y" // "puppies" -> "puppy"
	case strings.HasSuffix(word, "sses"):
		return word[:len(word)-2] // "classes" -> "class"
	case strings.HasSuffix(word, " running") || word == "running":
		return "run"
	case strings.HasSuffix(word, "ing") && len(word) > 5:
		base := word[:len(word)-3]
		// "running" -> "runn" -> rút gọn phụ âm đôi cuối -> "run"
		if len(base) >= 2 && base[len(base)-1] == base[len(base)-2] {
			base = base[:len(base)-1]
		}
		return base
	case strings.HasSuffix(word, "es") && len(word) > 4:
		return word[:len(word)-2] // "dishes" -> "dish"
	case strings.HasSuffix(word, "s") && len(word) > 3:
		return word[:len(word)-1] // "dogs" -> "dog"
	}
	return word
}

// analyze: pipeline đầy đủ. Trả về list token đã chuẩn hóa, GIỮ thứ tự
// (để lưu position cho phrase query nếu cần).
func analyze(text string) []string {
	// Tokenizer: cắt theo mọi ký tự không phải chữ/số.
	raw := strings.FieldsFunc(strings.ToLower(text), func(r rune) bool {
		return !(r >= 'a' && r <= 'z' || r >= '0' && r <= '9')
	})
	out := make([]string, 0, len(raw))
	for _, tok := range raw {
		if stopWords[tok] { // stop word filter
			continue
		}
		out = append(out, stem(tok)) // stemming filter
	}
	return out
}

// ===========================================================================
// 2. INVERTED INDEX — term -> posting list
// ===========================================================================

// posting: thông tin của 1 document trong posting list của 1 term.
type posting struct {
	docID     int
	tf        int   // term frequency: số lần term xuất hiện trong doc
	positions []int // vị trí (cho phrase query)
}

// document: 1 bản ghi gốc + độ dài (số token sau analyze, dùng cho BM25).
type document struct {
	id    int
	text  string
	tlen  int // tổng số token sau khi analyze
}

// invertedIndex: cấu trúc cốt lõi của search engine.
type invertedIndex struct {
	index map[string][]posting // term -> posting list
	docs  map[int]document     // docID -> document gốc
	avgdl float64              // độ dài trung bình document (cho BM25)
}

func newIndex() *invertedIndex {
	return &invertedIndex{
		index: make(map[string][]posting),
		docs:  make(map[int]document),
	}
}

// add: index một document. Đây là bước "đảo ngược" forward -> inverted.
func (ix *invertedIndex) add(id int, text string) {
	tokens := analyze(text)
	// Gom term -> (tf, positions) trong document này.
	tf := make(map[string]int)
	pos := make(map[string][]int)
	for i, t := range tokens {
		tf[t]++
		pos[t] = append(pos[t], i)
	}
	for term, count := range tf {
		ix.index[term] = append(ix.index[term], posting{
			docID: id, tf: count, positions: pos[term],
		})
	}
	ix.docs[id] = document{id: id, text: text, tlen: len(tokens)}
	ix.recomputeAvgdl()
}

func (ix *invertedIndex) recomputeAvgdl() {
	if len(ix.docs) == 0 {
		return
	}
	total := 0
	for _, d := range ix.docs {
		total += d.tlen
	}
	ix.avgdl = float64(total) / float64(len(ix.docs))
}

// df: document frequency — số document chứa term.
func (ix *invertedIndex) df(term string) int { return len(ix.index[term]) }

// ===========================================================================
// 3. SEARCH — match query (OR mặc định, giống ES `match`)
// ===========================================================================

// scoredDoc: kết quả search kèm điểm relevance.
type scoredDoc struct {
	docID int
	score float64
	text  string
}

// searchTFIDF: query đi qua CÙNG analyzer, cộng dồn TF-IDF trên các term.
func (ix *invertedIndex) searchTFIDF(query string) []scoredDoc {
	terms := analyze(query)
	N := float64(len(ix.docs))
	scores := make(map[int]float64)

	for _, term := range terms {
		postings := ix.index[term]
		if len(postings) == 0 {
			continue
		}
		// IDF = ln(N / df). Term hiếm -> IDF cao -> quan trọng hơn.
		idf := math.Log(N / float64(len(postings)))
		for _, p := range postings {
			scores[p.docID] += float64(p.tf) * idf // TF * IDF, cộng dồn
		}
	}
	return ix.rank(scores)
}

// searchBM25: scoring mặc định của Elasticsearch.
//   score = idf * ( tf*(k1+1) ) / ( tf + k1*(1 - b + b*|d|/avgdl) )
// với idf BM25 = ln(1 + (N - df + 0.5)/(df + 0.5)).
func (ix *invertedIndex) searchBM25(query string) []scoredDoc {
	const k1, b = 1.2, 0.75 // tham số mặc định của ES
	terms := analyze(query)
	N := float64(len(ix.docs))
	scores := make(map[int]float64)

	for _, term := range terms {
		postings := ix.index[term]
		df := float64(len(postings))
		if df == 0 {
			continue
		}
		idf := math.Log(1 + (N-df+0.5)/(df+0.5))
		for _, p := range postings {
			tf := float64(p.tf)
			dl := float64(ix.docs[p.docID].tlen)
			denom := tf + k1*(1-b+b*dl/ix.avgdl)
			scores[p.docID] += idf * (tf * (k1 + 1)) / denom
		}
	}
	return ix.rank(scores)
}

// rank: sắp xếp document theo score giảm dần.
func (ix *invertedIndex) rank(scores map[int]float64) []scoredDoc {
	out := make([]scoredDoc, 0, len(scores))
	for id, s := range scores {
		out = append(out, scoredDoc{docID: id, score: s, text: ix.docs[id].text})
	}
	sort.Slice(out, func(i, j int) bool {
		if out[i].score != out[j].score {
			return out[i].score > out[j].score
		}
		return out[i].docID < out[j].docID // tie-break ổn định
	})
	return out
}

// ===========================================================================
// 4. AUTOCOMPLETE — trie tiền tố (giống completion suggester của ES)
// ===========================================================================

type trieNode struct {
	children map[rune]*trieNode
	isWord   bool
}

type trie struct{ root *trieNode }

func newTrie() *trie { return &trie{root: &trieNode{children: map[rune]*trieNode{}}} }

func (t *trie) insert(word string) {
	n := t.root
	for _, r := range word {
		if n.children[r] == nil {
			n.children[r] = &trieNode{children: map[rune]*trieNode{}}
		}
		n = n.children[r]
	}
	n.isWord = true
}

// suggest: trả về mọi từ bắt đầu bằng prefix. O(len(prefix)) tới node + DFS.
func (t *trie) suggest(prefix string) []string {
	n := t.root
	for _, r := range prefix {
		if n.children[r] == nil {
			return nil // không có từ nào khớp prefix
		}
		n = n.children[r]
	}
	var out []string
	var dfs func(node *trieNode, acc string)
	dfs = func(node *trieNode, acc string) {
		if node.isWord {
			out = append(out, acc)
		}
		// duyệt children theo thứ tự rune để output ổn định
		keys := make([]rune, 0, len(node.children))
		for r := range node.children {
			keys = append(keys, r)
		}
		sort.Slice(keys, func(i, j int) bool { return keys[i] < keys[j] })
		for _, r := range keys {
			dfs(node.children[r], acc+string(r))
		}
	}
	dfs(n, prefix)
	return out
}

// ===========================================================================
// MAIN — demo toàn bộ
// ===========================================================================

func main() {
	fmt.Println("=== 1. ANALYZER pipeline ===")
	demo := "The Running Dogs are playing"
	fmt.Printf("  %q -> %v\n", demo, analyze(demo))
	fmt.Printf("  %q -> %v\n\n", "Cats are Sleeping", analyze("Cats are Sleeping"))

	fmt.Println("=== 2. INVERTED INDEX (BT1-style) ===")
	ix := newIndex()
	corpus := map[int]string{
		1: "Go is a fast language",
		2: "Python is slow",
		3: "Go go gophers love Go",
		4: "The Rust language is fast",
		5: "JavaScript is a web language",
	}
	// index theo thứ tự id để avgdl/posting ổn định
	for id := 1; id <= len(corpus); id++ {
		ix.add(id, corpus[id])
	}
	// in vài posting list tiêu biểu
	for _, term := range []string{"go", "language", "fast"} {
		var parts []string
		for _, p := range ix.index[term] {
			parts = append(parts, fmt.Sprintf("doc%d(tf=%d)", p.docID, p.tf))
		}
		fmt.Printf("  %-10s -> [%s]\n", term, strings.Join(parts, ", "))
	}
	fmt.Printf("  avgdl (độ dài TB) = %.2f token\n\n", ix.avgdl)

	fmt.Println("=== 3. SEARCH query \"go\" — TF-IDF vs BM25 ===")
	fmt.Println("  -- TF-IDF --")
	for _, r := range ix.searchTFIDF("go") {
		fmt.Printf("    doc%d  score=%.4f  %q\n", r.docID, r.score, r.text)
	}
	fmt.Println("  -- BM25 (default ES) --")
	for _, r := range ix.searchBM25("go") {
		fmt.Printf("    doc%d  score=%.4f  %q\n", r.docID, r.score, r.text)
	}

	fmt.Println("\n=== 4. SEARCH query \"fast language\" (match OR) — BM25 ===")
	for _, r := range ix.searchBM25("fast language") {
		fmt.Printf("    doc%d  score=%.4f  %q\n", r.docID, r.score, r.text)
	}

	fmt.Println("\n=== 5. BT2 walk-through: TF-IDF cho \"language\" trên 3 doc ===")
	bt2 := newIndex()
	bt2.add(1, "language is power language") // docA
	bt2.add(2, "go is a system language")    // docB
	bt2.add(3, "python loves data")          // docC
	fmt.Printf("  df(language)=%d, N=%d, idf=ln(3/2)=%.4f\n",
		bt2.df("language"), len(bt2.docs), math.Log(3.0/2.0))
	for _, r := range bt2.searchTFIDF("language") {
		fmt.Printf("    doc%d  score=%.4f  %q\n", r.docID, r.score, r.text)
	}

	fmt.Println("\n=== 6. AUTOCOMPLETE (BT5) — prefix trie ===")
	t := newTrie()
	for _, w := range []string{"laptop", "lapland", "laser", "lamp", "language", "go", "gopher"} {
		t.insert(w)
	}
	for _, prefix := range []string{"lap", "la", "go", "x"} {
		fmt.Printf("  suggest(%q) -> %v\n", prefix, t.suggest(prefix))
	}
}

// ===========================================================================
// THAM KHẢO: dùng Elasticsearch THẬT qua go-elasticsearch
// (chỉ comment — không biên dịch, cần ES server chạy ở localhost:9200)
// ===========================================================================
//
//   import (
//       "strings"
//       "github.com/elastic/go-elasticsearch/v8"
//   )
//
//   es, _ := elasticsearch.NewClient(elasticsearch.Config{
//       Addresses: []string{"http://localhost:9200"},
//   })
//
//   // Index 1 document
//   body := `{"name":"Dell XPS laptop","category":"electronics","price":999}`
//   es.Index("products", strings.NewReader(body), es.Index.WithDocumentID("1"))
//
//   // Search bằng Query DSL (bool: must match + filter term/range)
//   q := `{
//     "query": { "bool": {
//       "must":   [ { "match": { "name": "laptop" } } ],
//       "filter": [
//         { "term":  { "category": "electronics" } },
//         { "range": { "price": { "lt": 1000 } } }
//       ]
//     } } }`
//   res, _ := es.Search(
//       es.Search.WithIndex("products"),
//       es.Search.WithBody(strings.NewReader(q)),
//   )
//   defer res.Body.Close()
//   // parse res.Body (JSON): hits.hits[]._source, _score (ES tự tính BM25)
