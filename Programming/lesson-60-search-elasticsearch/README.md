# Lesson 60 — Search & Elasticsearch

> Tier 5 · Database & Storage. Cách build công cụ tìm kiếm full-text: inverted index, analyzer, relevance scoring (TF-IDF / BM25), Query DSL, và khi nào dùng Elasticsearch / khi nào dùng alternative nhẹ hơn.

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Hiểu **vì sao `LIKE '%term%'` của SQL không đủ** cho tìm kiếm thật.
- Nắm **inverted index** — cấu trúc cốt lõi của mọi search engine — và tự build được bằng tay.
- Hiểu **analyzer pipeline**: tokenize → lowercase → stem → stop word → synonym.
- Đọc và viết **Query DSL** của Elasticsearch: `match`, `term`, `bool`, `range`, `wildcard`, `fuzzy`.
- Tính **relevance score** bằng TF-IDF và BM25 với số cụ thể.
- Phân biệt **`text` vs `keyword`** trong mapping — lỗi #1 của người mới.
- Biết **khi nào dùng Elasticsearch, khi nào KHÔNG**, và các alternative (Postgres FTS, Meilisearch, Typesense, Bleve).
- Đồng bộ **DB → Elasticsearch** (dual write, CDC, batch reindex) và tránh các pitfall thường gặp.

## Kiến thức tiền đề

- [Lesson 54 — SQL & database/sql](../lesson-54-sql-database-sql/README.md): hiểu index B-Tree, full scan, `EXPLAIN`.
- [Lesson 58 — Redis & Caching](../lesson-58-redis-caching/README.md): tư duy "datastore phụ trợ bên cạnh DB chính".
- [Lesson 59 — NoSQL & MongoDB](../lesson-59-nosql-mongodb/README.md): document model, eventual consistency.
- [Lesson 13 — Maps](../lesson-13-maps/README.md): `map[string][]int` là nền tảng để hiểu inverted index.
- [Lesson 14 — Strings, Runes, UTF-8](../lesson-14-strings-runes-utf8/README.md): tokenize tiếng Việt phụ thuộc vào hiểu rune.

---

## 1. Vì sao cần search engine?

💡 **Trực giác.** Bạn có 1 triệu bài blog trong Postgres. User gõ ô tìm kiếm: *"golang concurrency"*. Bạn viết:

```sql
SELECT * FROM posts
WHERE body LIKE '%golang concurrency%';
```

Câu này **đọc qua TỪNG dòng** trong 1 triệu bản ghi, so khớp chuỗi con. Đây là **full table scan** — O(N) với N = số document, và còn nhân với độ dài mỗi document. Không có index nào giúp được, vì index B-Tree của SQL chỉ tăng tốc cho **prefix** (`LIKE 'golang%'`), KHÔNG tăng tốc cho **chuỗi con bất kỳ** (`LIKE '%golang%'` — wildcard ở đầu vô hiệu hóa index).

### 1.1 Ba thứ SQL `LIKE` không làm được

| Vấn đề | `LIKE '%term%'` | Search engine |
|--------|-----------------|---------------|
| **Tốc độ** | Full scan O(N×L) | Lookup inverted index O(1) lấy posting list |
| **Relevance ranking** | Không có — kết quả vô thứ tự | TF-IDF / BM25 xếp hạng theo độ liên quan |
| **Typo tolerance** | `golng` → 0 kết quả | Fuzzy match `golng` → `golang` |
| **Phân tích ngôn ngữ** | `running` ≠ `run` | Stemming: `running`, `ran`, `runs` → `run` |
| **Tìm nhiều từ bất kỳ thứ tự** | Chỉ khớp đúng chuỗi liền | `"go concurrency"` khớp doc có 2 từ ở bất kỳ đâu |

❓ **Câu hỏi tự nhiên:** *"Postgres có full-text search rồi mà (`tsvector`)?"* — Đúng, và với traffic vừa phải Postgres FTS là lựa chọn tốt (xem [mục 14](#14-alternative-nhẹ-hơn)). Nhưng Postgres FTS không có: phân tán nhiều node, aggregation phức tạp, relevance scoring tinh chỉnh được, autocomplete tốc độ cao trên hàng tỉ document. Đó là lúc cần Elasticsearch.

⚠ **Lỗi thường gặp:** tưởng "thêm `INDEX` trên cột `body` là search nhanh". B-Tree index KHÔNG giúp `LIKE '%x%'`. Bạn cần một cấu trúc khác hẳn: **inverted index**.

📝 **Tóm tắt mục 1:** `LIKE '%term%'` = full scan, không ranking, không typo tolerance, không hiểu ngôn ngữ. Search engine giải quyết cả 4 bằng inverted index + analyzer + scoring.

---

## 2. Inverted index — cấu trúc cốt lõi

💡 **Trực giác.** Mục lục cuối một quyển sách giáo khoa: *"đệ quy ......... trang 12, 45, 78"*. Bạn không lật từng trang tìm chữ "đệ quy"; bạn tra mục lục → nhảy thẳng tới các trang. Inverted index chính là cái mục lục đó cho toàn bộ kho document.

**"Forward" index** (cách lưu tự nhiên) là `document → các từ trong nó`. **"Inverted" index** đảo ngược lại: `từ → các document chứa từ đó`.

### 2.1 Walk-through cụ thể với 3 document

Cho 3 document:

```
doc1: "go is fast"
doc2: "python is slow"
doc3: "go go gophers"
```

**Bước 1 — tokenize + lowercase** mỗi document thành list term:

| Doc | Term sau analyzer |
|-----|-------------------|
| doc1 | `go`, `is`, `fast` |
| doc2 | `python`, `is`, `slow` |
| doc3 | `go`, `go`, `gophers` |

**Bước 2 — đảo ngược** thành term → posting list (kèm số lần xuất hiện = term frequency):

```
go      → [doc1 (×1), doc3 (×2)]
is      → [doc1 (×1), doc2 (×1)]
fast    → [doc1 (×1)]
python  → [doc2 (×1)]
slow    → [doc2 (×1)]
gophers → [doc3 (×1)]
```

**Bước 3 — query "go".** Tra bảng: `go → [doc1, doc3]`. Trả về ngay 2 document, **không đụng đến doc2**, không scan body.

**Bước 4 — query "go fast" (match, OR mặc định).** Tra 2 term:
- `go → [doc1, doc3]`
- `fast → [doc1]`
- Hợp (union) = `{doc1, doc3}`. doc1 khớp cả 2 term → điểm cao hơn.

### 2.2 Vì sao nhanh?

Posting list được lưu trong cấu trúc tra cứu nhanh (hash map hoặc cây sắp xếp). Lookup một term là **O(1)** (hash) hoặc **O(log V)** (V = số term phân biệt) — KHÔNG phụ thuộc số document N. So với full scan O(N×L), với N = 1 triệu thì đây là khác biệt giữa "tức thì" và "vài giây".

❓ **Câu hỏi tự nhiên:**
- *"Posting list dài quá thì sao?"* — Term phổ biến (`is`, `the`) có list rất dài; đó là lý do stop word thường bị loại bỏ (xem [mục 5](#5-analyzer)). Term có nghĩa thì list ngắn hơn nhiều.
- *"Tìm cụm từ liền nhau (phrase) thì sao?"* — Posting list lưu thêm **position** của term trong document, để kiểm tra `"go fast"` có liền nhau không (phrase query).
- *"Có phải tự build không?"* — Trong production dùng Lucene (Elasticsearch). Trong bài này ta tự build bằng Go để hiểu cơ chế (xem [solutions.go](./solutions.go)).

🔁 **Dừng lại tự kiểm tra.** Cho `doc4: "fast go"`. Posting list của `go` và `fast` thay đổi thế nào?

<details><summary>Đáp án</summary>

`go → [doc1, doc3, doc4]`, `fast → [doc1, doc4]`. Cả 2 list đều thêm doc4. Vị trí term trong doc4: `fast`@0, `go`@1 — nếu lưu position thì biết doc4 có cụm "fast go" chứ không phải "go fast".
</details>

📝 **Tóm tắt mục 2:** Inverted index = `term → posting list`. Đảo ngược forward index. Lookup O(1)/O(log V) không scan document. Lưu thêm term frequency (cho scoring) và position (cho phrase query).

---

## 3. Elasticsearch / OpenSearch

**Elasticsearch (ES)** là search engine phân tán, xây trên thư viện **Apache Lucene** (Lucene là engine inverted index lõi, viết bằng Java). ES bọc Lucene thành một service:

- **REST API + JSON** — tương tác qua HTTP, không cần driver đặc biệt.
- **Phân tán (distributed)** — chia index thành nhiều **shard**, sao chép thành **replica**, trải trên nhiều node → scale ngang và chịu lỗi.
- **Near real-time** — document index xong khoảng ~1 giây sau là search được (refresh interval).

**OpenSearch** là bản fork mã nguồn mở của Elasticsearch 7.10 (do AWS dẫn dắt, sau khi ES đổi license năm 2021). API gần như tương thích — kiến thức trong bài áp dụng cho cả hai.

💡 **Trực giác về shard.** Tưởng tượng tủ hồ sơ quá lớn cho một ngăn. Bạn chia thành 5 ngăn (shard), mỗi ngăn là một inverted index độc lập. Query gửi tới cả 5 ngăn song song, gom kết quả lại. Mỗi ngăn lại có một bản photo (replica) ở tủ khác phòng khi tủ chính hỏng.

⚠ **Lỗi thường gặp:** chọn số shard quá lớn "cho chắc". Mỗi shard tốn RAM/file handle; quá nhiều shard nhỏ làm chậm. Quy tắc thô: mỗi shard nên ~10–50GB. Số shard **không đổi được** sau khi tạo index (phải reindex) — cân nhắc kỹ từ đầu.

📝 **Tóm tắt mục 3:** ES/OpenSearch = service phân tán bọc Lucene. Index chia shard (scale ngang) + replica (chịu lỗi). Tương tác qua REST/JSON. Near real-time (~1s).

---

## 4. Document & Index

Bản đồ thuật ngữ — đối chiếu với SQL để dễ nhớ:

| Elasticsearch | SQL tương đương | Ý nghĩa |
|---------------|-----------------|---------|
| **Index** | Table (collection) | Tập hợp document cùng loại |
| **Document** | Row | Một bản ghi, dạng JSON |
| **Field** | Column | Một trường trong document |
| **Mapping** | Schema (DDL) | Định nghĩa kiểu dữ liệu của các field |
| **Shard** | (partition) | Mảnh con của index |

Một document ví dụ trong index `products`:

```json
{
  "name": "Dell XPS 13 laptop",
  "category": "electronics",
  "price": 999.0,
  "in_stock": true,
  "tags": ["ultrabook", "intel"]
}
```

**Mapping** (schema) định nghĩa field nào kiểu gì:

```json
PUT /products
{
  "mappings": {
    "properties": {
      "name":     { "type": "text" },
      "category": { "type": "keyword" },
      "price":    { "type": "float" },
      "in_stock": { "type": "boolean" },
      "tags":     { "type": "keyword" }
    }
  }
}
```

> Sự khác biệt `text` vs `keyword` là trọng tâm — xem kỹ [mục 10](#10-index-design).

📝 **Tóm tắt mục 4:** index ≈ table, document ≈ row (JSON), field ≈ column, mapping ≈ schema. Document là JSON tự do nhưng mapping quyết định cách field được index.

---

## 5. Analyzer

💡 **Trực giác.** Trước khi đưa text vào inverted index, ES "băm nhỏ và chuẩn hóa" nó qua một dây chuyền (pipeline). Cùng pipeline đó áp lên **cả lúc index lẫn lúc search**, nhờ vậy `"Running"` (query) khớp được `"runs"` (document) — vì cả hai bị chuẩn hóa về `run`.

**Analyzer = Character filter → Tokenizer → Token filter(s).**

| Thành phần | Việc làm | Ví dụ |
|------------|----------|-------|
| **Character filter** | Xử lý ký tự thô | gỡ HTML `<b>go</b>` → `go` |
| **Tokenizer** | Cắt text thành token | `"The Running Dogs"` → `["The", "Running", "Dogs"]` |
| **Lowercase filter** | Hạ chữ thường | `["the", "running", "dogs"]` |
| **Stop word filter** | Loại từ vô nghĩa | bỏ `the`, `a`, `is`, `of`... → `["running", "dogs"]` |
| **Stemming filter** | Đưa về gốc từ | `running → run`, `dogs → dog` → `["run", "dog"]` |
| **Synonym filter** | Thêm từ đồng nghĩa | `laptop` → cũng index thành `notebook` |

### 5.1 Walk-through: "The Running Dogs"

```
"The Running Dogs"
  → tokenize:   ["The", "Running", "Dogs"]
  → lowercase:  ["the", "running", "dogs"]
  → stop word:  ["running", "dogs"]        (bỏ "the")
  → stemming:   ["run", "dog"]
```

Kết quả lưu vào inverted index là `["run", "dog"]`. Khi user search `"dogs are running"`:

```
"dogs are running"
  → ["dogs", "are", "running"]
  → lowercase → stop word (bỏ "are") → stemming
  → ["dog", "run"]
```

Cả hai cùng quy về `{run, dog}` → **khớp**, dù chữ gốc khác hẳn.

❓ **Câu hỏi tự nhiên:**
- *"Vì sao phải dùng CÙNG analyzer cho index và search?"* — Nếu index lưu `run` mà search không stem `running`, query `running` tra term `running` → không thấy `run` → 0 kết quả. Phải đối xứng.
- *"Tiếng Việt thì sao?"* — Tokenizer mặc định cắt theo khoảng trắng nên `"công nghệ"` thành 2 token đúng, nhưng KHÔNG hiểu từ ghép, dấu, và đồng nghĩa tiếng Việt. Cần analyzer custom (plugin như `vi_analyzer`, ICU tokenizer). Đây là pitfall lớn — xem [mục 15](#15-common-pitfall).

⚠ **Lỗi thường gặp:** đổi analyzer của một field đã có data → data cũ vẫn được index theo analyzer cũ. Phải **reindex** toàn bộ thì thay đổi mới có hiệu lực.

🔁 **Dừng lại tự kiểm tra.** `"Cats are Sleeping"` qua pipeline (lowercase + stop word `are` + stem) cho ra gì?

<details><summary>Đáp án</summary>

`["cat", "sleep"]`. Tokenize → `["Cats","are","Sleeping"]` → lowercase → bỏ stop word `are` → stem `cats→cat`, `sleeping→sleep`.
</details>

📝 **Tóm tắt mục 5:** analyzer = tokenizer + chuỗi filter (lowercase, stop word, stemming, synonym). Áp CÙNG analyzer cho index và search để query khớp được dù chữ gốc khác. Tiếng Việt cần custom analyzer.

---

## 6. Query DSL

ES dùng **Query DSL** — query viết bằng JSON. Năm loại query cốt lõi:

### 6.1 `match` — full-text, ĐƯỢC analyze

```json
{ "query": { "match": { "name": "running dogs" } } }
```

Text `"running dogs"` đi qua analyzer của field → `["run", "dog"]` → tra inverted index → khớp document có `run` HOẶC `dog` (mặc định OR), document có cả hai xếp hạng cao hơn. Đây là query bạn dùng cho ô search của user.

### 6.2 `term` — exact, KHÔNG analyze

```json
{ "query": { "term": { "category": "electronics" } } }
```

Tra **đúng** chuỗi `electronics`, không hạ chữ, không stem. Dùng cho field `keyword`: status, category, tag, ID.

⚠ **Lỗi kinh điển:** `term` query trên field `text`. Field `text` đã bị analyze (lowercase) khi index, nên `{"term": {"name": "Laptop"}}` tra term `Laptop` (có hoa) → không khớp vì index lưu `laptop`. Dùng `match` cho `text`, `term` cho `keyword`.

### 6.3 `bool` — kết hợp logic

```json
{
  "query": {
    "bool": {
      "must":     [ { "match": { "name": "laptop" } } ],
      "filter":   [ { "term": { "category": "electronics" } },
                    { "range": { "price": { "lt": 1000 } } } ],
      "should":   [ { "match": { "tags": "ultrabook" } } ],
      "must_not": [ { "term": { "in_stock": false } } ]
    }
  }
}
```

| Mệnh đề | Ý nghĩa | Ảnh hưởng score |
|---------|---------|-----------------|
| `must` | BẮT BUỘC khớp (AND) | Có — đóng góp vào score |
| `filter` | BẮT BUỘC khớp | KHÔNG — chỉ lọc, cache được, nhanh |
| `should` | NÊN khớp (OR, tăng điểm) | Có — khớp thì điểm cao hơn |
| `must_not` | KHÔNG được khớp (NOT) | Không |

💡 **`must` vs `filter`:** cùng là "bắt buộc khớp" nhưng `filter` KHÔNG tính điểm relevance (chỉ trả lời yes/no) nên nhanh hơn và **cache được**. Quy tắc: điều kiện lọc cứng (category, range giá, status) → `filter`; điều kiện full-text cần ranking → `must`.

### 6.4 `range`, `wildcard`, `fuzzy`

```json
{ "range":    { "price": { "gte": 100, "lt": 1000 } } }     // 100 <= price < 1000
{ "wildcard": { "name": "lap*" } }                          // prefix/pattern (chậm, tránh dùng *đầu)
{ "fuzzy":    { "name": { "value": "lptop", "fuzziness": 2 } } }  // typo tolerance
```

**Fuzzy** dựa trên **Levenshtein distance** (số phép chèn/xóa/thay tối thiểu để biến chuỗi này thành chuỗi kia). `fuzziness: 2` nghĩa là chấp nhận ≤ 2 phép sửa. `lptop → laptop` cần 1 phép chèn `a` → khớp với fuzziness ≥ 1. Đây là cách xử lý typo của user.

📝 **Tóm tắt mục 6:** `match` (analyzed full-text), `term` (exact, dùng cho keyword), `bool` (must/should/must_not/filter), `range` (khoảng số/ngày), `wildcard` (pattern), `fuzzy` (typo, Levenshtein). Dùng `filter` cho điều kiện cứng (nhanh, cache), `must` cho full-text cần ranking.

---

## 7. Relevance scoring (TF-IDF / BM25)

💡 **Trực giác.** Khi nhiều document khớp query, cái nào "liên quan nhất" hiện đầu? Hai ý chính:
1. Document nhắc term query **nhiều lần** → liên quan hơn (**TF** — term frequency).
2. Term **hiếm** trong cả kho → mang nhiều thông tin hơn term phổ biến (**IDF** — inverse document frequency). `"quantum"` hiếm nên đáng giá; `"the"` ở khắp nơi nên gần như vô nghĩa.

### 7.1 Định nghĩa

> **TF (term frequency)** — *(a) Là gì:* số lần term `t` xuất hiện trong document `d`, thường chuẩn hóa. *(b) Vì sao cần:* phân biệt document nhắc term 5 lần với document nhắc 1 lần. *(c) Ví dụ:* doc nhắc "go" 3 lần có TF cao hơn doc nhắc 1 lần.

> **IDF (inverse document frequency)** — *(a) Là gì:* `idf(t) = ln(N / df(t))` với `N` = tổng số document, `df(t)` = số document chứa `t`. *(b) Vì sao cần:* hạ trọng số của term phổ biến (xuất hiện ở mọi doc → ln(N/N)=0). *(c) Ví dụ:* `N=1000`, term "the" ở 1000 doc → idf = ln(1000/1000) = 0; term "quantum" ở 5 doc → idf = ln(1000/5) ≈ 5.3 → đáng giá hơn nhiều.

**TF-IDF score** = `tf(t,d) × idf(t)`, cộng dồn trên các term của query.

### 7.2 Walk-through TF-IDF với số cụ thể

Cho 3 document, query = `"go"`:

```
doc1: "go is fast go"          (go ×2, tổng 4 từ)
doc2: "python is slow"         (go ×0)
doc3: "go gophers love go go"  (go ×3, tổng 5 từ)
```

`N = 3`. `df("go")` = số doc chứa "go" = 2 (doc1, doc3).

**IDF:** `idf("go") = ln(N / df) = ln(3/2) = ln(1.5) ≈ 0.405`.

**TF** (dùng tf thô = số lần):
- doc1: tf = 2
- doc3: tf = 3

**Score = tf × idf:**
- doc1: `2 × 0.405 = 0.810`
- doc3: `3 × 0.405 = 1.215`

→ **doc3 xếp trên doc1** (nhắc "go" nhiều hơn). doc2 không chứa "go" → loại.

### 7.3 BM25 — bản cải tiến (mặc định của ES)

TF-IDF có nhược điểm: TF tăng tuyến tính vô hạn (nhắc term 100 lần thì điểm gấp 100 lần — vô lý). **BM25** sửa 2 điểm:

1. **TF bão hòa** — nhắc nhiều lần thì điểm tăng chậm dần (có trần), điều khiển bởi tham số `k1` (mặc định 1.2).
2. **Chuẩn hóa độ dài document** — document dài tự nhiên có TF cao hơn, BM25 phạt bằng tỉ lệ `|d| / avgdl` (độ dài doc / độ dài trung bình), điều khiển bởi `b` (mặc định 0.75).

Công thức BM25 cho 1 term:

```
score = idf(t) × ( tf × (k1 + 1) ) / ( tf + k1 × (1 − b + b × |d|/avgdl) )
```

**Walk-through BM25 cho doc3, query "go"** (`k1=1.2`, `b=0.75`):
- `tf = 3`, `|d| = 5`, `avgdl = (4+3+5)/3 = 4`
- `idf` BM25 = `ln(1 + (N − df + 0.5)/(df + 0.5))` = `ln(1 + (3−2+0.5)/(2+0.5))` = `ln(1 + 1.5/2.5)` = `ln(1.6) ≈ 0.470`
- mẫu số = `3 + 1.2 × (1 − 0.75 + 0.75 × 5/4)` = `3 + 1.2 × (0.25 + 0.9375)` = `3 + 1.2 × 1.1875` = `3 + 1.425 = 4.425`
- tử số = `3 × (1.2 + 1) = 6.6`
- `score = 0.470 × 6.6 / 4.425 ≈ 0.470 × 1.492 ≈ 0.701`

❓ **Câu hỏi tự nhiên:** *"Vì sao BM25 tốt hơn TF-IDF trong thực tế?"* — Vì nó không bị "spam keyword" làm lệch (TF bão hòa) và không thiên vị document dài (length normalization). Đó là lý do ES chọn BM25 làm mặc định từ phiên bản 5.0.

📝 **Tóm tắt mục 7:** score = TF (nhắc nhiều = liên quan) × IDF (hiếm = quan trọng). BM25 cải tiến: TF bão hòa (tham số `k1`) + chuẩn hóa độ dài (tham số `b`). BM25 là default của ES.

---

## 8. Aggregation

Aggregation = thống kê trên kết quả, tương tự `GROUP BY` của SQL nhưng mạnh hơn.

| Loại | SQL tương đương | Ví dụ |
|------|-----------------|-------|
| **Metric** | `AVG`, `SUM`, `MAX` | giá trung bình của sản phẩm |
| **Bucket** | `GROUP BY` | đếm sản phẩm theo từng category |
| **Facet** | (kết hợp) | "Electronics (42), Books (31)" cạnh ô filter |

```json
{
  "size": 0,
  "aggs": {
    "by_category": {
      "terms": { "field": "category" },
      "aggs": { "avg_price": { "avg": { "field": "price" } } }
    }
  }
}
```

→ Trả về: mỗi category một bucket (count + avg_price). Đây chính là cách e-commerce dựng sidebar **faceted filter** ("Electronics (42)", "Books (31)").

⚠ **Lỗi thường gặp:** aggregation trên field `text`. Aggregation cần dữ liệu chưa analyze (giá trị nguyên vẹn) → phải dùng field `keyword`. Nếu cần cả search lẫn aggregation trên cùng dữ liệu, dùng **multi-field** (`category` là `text`, `category.keyword` là `keyword`) — xem [mục 10](#10-index-design).

📝 **Tóm tắt mục 8:** aggregation = GROUP BY mạnh: metric (avg/sum), bucket (group), facet (filter sidebar). Aggregation cần field `keyword`, không dùng được trên `text` thuần.

---

## 9. Go client: `github.com/elastic/go-elasticsearch`

```go
import "github.com/elastic/go-elasticsearch/v8"

es, _ := elasticsearch.NewClient(elasticsearch.Config{
    Addresses: []string{"http://localhost:9200"},
})

// Index một document
body := `{"name":"Dell XPS laptop","category":"electronics","price":999}`
es.Index("products", strings.NewReader(body), es.Index.WithDocumentID("1"))

// Search bằng Query DSL
query := `{"query":{"match":{"name":"laptop"}}}`
res, _ := es.Search(
    es.Search.WithIndex("products"),
    es.Search.WithBody(strings.NewReader(query)),
)
defer res.Body.Close()
// parse res.Body (JSON) → hits.hits[]._source, _score
```

Client là wrapper mỏng quanh REST API — bạn vẫn viết Query DSL bằng JSON. Có thư viện cao cấp hơn (`olivere/elastic`) build query bằng Go struct nếu muốn type-safe.

> File [solutions.go](./solutions.go) **không cần ES server** — nó tự implement inverted index + TF-IDF/BM25 bằng Go thuần để bạn hiểu cơ chế bên trong. Phần gọi go-elasticsearch chỉ là comment tham khảo.

---

## 10. Index design

### 10.1 `text` vs `keyword` — phân biệt quan trọng nhất

| | `text` | `keyword` |
|--|--------|-----------|
| **Có analyze?** | CÓ (tokenize, lowercase, stem) | KHÔNG (lưu nguyên chuỗi) |
| **Dùng cho** | Full-text search (`match`) | Filter, aggregation, sort (`term`) |
| **Ví dụ field** | `name`, `description`, `body` | `category`, `status`, `tag`, `email`, `id` |
| **`"iPhone 13 Pro"` lưu thành** | `["iphone", "13", "pro"]` | `"iPhone 13 Pro"` (1 token nguyên) |

💡 **Quy tắc nhớ:** *"Người ta SEARCH trong nó hay LỌC/NHÓM theo nó?"*
- Search (full-text, mờ) → `text`.
- Lọc bằng giá trị chính xác, group, sort → `keyword`.

### 10.2 Multi-field — cả hai cùng lúc

Một field có thể vừa `text` (để search) vừa có sub-field `keyword` (để agg/sort):

```json
{
  "name": {
    "type": "text",
    "fields": { "raw": { "type": "keyword" } }
  }
}
```

→ `name` dùng cho `match` (search), `name.raw` dùng cho `term`/aggregation/sort. ES tạo cấu hình này mặc định cho string khi bạn không khai mapping (`name` text + `name.keyword`).

⚠ **Lỗi #1 của người mới:** để `category` là `text` rồi `term` query không khớp (vì bị lowercase), hoặc aggregation báo lỗi "fielddata disabled". Field dùng để lọc/nhóm phải là `keyword`.

📝 **Tóm tắt mục 10:** `text` = analyzed, để search. `keyword` = nguyên chuỗi, để filter/agg/sort. Multi-field cho cả hai. Chọn sai = search hoặc filter không hoạt động.

---

## 11. Sync DB → Elasticsearch

ES thường là **datastore phụ**, dữ liệu gốc nằm ở Postgres/MySQL. Phải đồng bộ. Ba cách:

| Cách | Mô tả | Ưu | Nhược |
|------|-------|----|----|
| **Dual write** | App ghi DB rồi ghi luôn ES trong cùng flow | Đơn giản | Không nguyên tử — ghi DB xong crash trước khi ghi ES → lệch dữ liệu |
| **CDC (Change Data Capture)** | Đọc WAL/binlog của DB (Debezium → Kafka → ES) | Đáng tin, không sửa app | Hạ tầng phức tạp (Kafka, connector) |
| **Batch reindex** | Job định kỳ quét DB đẩy sang ES | Đơn giản, tự sửa lệch | Trễ (không real-time) |

💡 **Trực giác về CDC.** Thay vì app "nhắc" ES mỗi lần đổi, CDC "nghe lén" nhật ký giao dịch của DB (WAL ở Postgres, binlog ở MySQL) — mọi INSERT/UPDATE/DELETE đều xuất hiện ở đó. Một connector (Debezium) đọc log, đẩy event vào Kafka, một consumer ghi sang ES. App không cần biết ES tồn tại.

⚠ **Lỗi thường gặp:** chỉ dùng dual write rồi tin ES luôn đúng. Khi ghi ES fail (network, ES down) mà DB đã commit → lệch vĩnh viễn. Luôn cần một **batch reindex** định kỳ để "hòa giải" (reconcile).

📝 **Tóm tắt mục 11:** dual write (đơn giản, dễ lệch), CDC (đáng tin, phức tạp), batch reindex (chậm, tự sửa lệch). Thực tế thường kết hợp: dual write/CDC cho real-time + batch reindex để reconcile.

---

## 12. Khi nào DÙNG Elasticsearch

- **Full-text search** — ô tìm kiếm sản phẩm/bài viết với relevance, typo tolerance.
- **Log analytics (ELK stack)** — Elasticsearch + Logstash + Kibana: gom log hàng tỉ dòng, query/visualize. Đây là use case phổ biến NHẤT của ES.
- **Faceted search (e-commerce)** — filter sidebar với count theo category/brand/giá (aggregation).
- **Autocomplete / suggestion** — gợi ý khi gõ (edge n-gram, completion suggester).
- **Geospatial** — tìm "nhà hàng trong bán kính 2km".

## 13. Khi nào KHÔNG dùng Elasticsearch

- **Primary datastore** — ES eventual consistent, không có transaction ACID đa document đáng tin. Mất document = mất data nếu không có nguồn gốc. **Luôn để Postgres/MySQL làm nguồn sự thật.**
- **Cần transaction** — ES không có giao dịch đa document như SQL.
- **Simple lookup theo ID/key** — `SELECT * WHERE id = ?` thì Postgres/Redis nhanh và đơn giản hơn nhiều. ES là overkill, tốn RAM, vận hành nặng.
- **Quan hệ phức tạp nhiều JOIN** — ES không join tốt; phải denormalize.

⚠ **Pitfall lớn nhất:** dùng ES làm DB chính. Nó được thiết kế để **mất một bản ghi không phải thảm họa** (search vẫn chạy, chỉ thiếu 1 kết quả). Dữ liệu quan trọng (đơn hàng, tài khoản) phải nằm ở DB ACID.

📝 **Tóm tắt mục 12-13:** DÙNG ES cho full-text, log analytics, faceted search, autocomplete. KHÔNG dùng làm primary DB, cho transaction, hay simple lookup. ES là index phụ bên cạnh nguồn sự thật.

---

## 14. Alternative nhẹ hơn

Không phải lúc nào cũng cần ES (vận hành nặng, tốn RAM). Cân nhắc:

| Giải pháp | Đặc điểm | Phù hợp khi |
|-----------|----------|-------------|
| **Postgres FTS (`tsvector`)** | Full-text ngay trong Postgres, không thêm hạ tầng | Đã dùng Postgres, traffic vừa, không cần phân tán/agg phức tạp |
| **Meilisearch** | Nhẹ, nhanh, typo-tolerant, dễ dựng | Search UI thân thiện, instant search, dataset vừa |
| **Typesense** | Tương tự Meilisearch, tập trung tốc độ + faceting | Autocomplete, faceted search, latency thấp |
| **Bleve** | Thư viện search **native Go**, embed trong app | App Go đơn lẻ, không muốn service ngoài |

**Postgres FTS** ví dụ:

```sql
-- thêm cột tsvector + GIN index
ALTER TABLE posts ADD COLUMN tsv tsvector
  GENERATED ALWAYS AS (to_tsvector('english', title || ' ' || body)) STORED;
CREATE INDEX posts_tsv_idx ON posts USING GIN(tsv);

-- search với ranking
SELECT *, ts_rank(tsv, query) AS rank
FROM posts, to_tsquery('english', 'golang & concurrency') query
WHERE tsv @@ query
ORDER BY rank DESC;
```

💡 **Quy tắc chọn:** bắt đầu bằng **Postgres FTS** nếu đã có Postgres và quy mô vừa. Lên **Meilisearch/Typesense** khi cần UX search tốt mà không muốn vận hành ES. Lên **Elasticsearch** khi cần phân tán quy mô lớn, log analytics, hoặc aggregation/relevance tinh chỉnh sâu. Dùng **Bleve** nếu muốn nhúng search thẳng trong binary Go.

---

## 15. Common pitfall

1. **Dùng ES làm primary DB** — eventual consistency + không transaction. Để DB ACID làm nguồn sự thật.
2. **`text` vs `keyword` nhầm** — `term` trên `text` không khớp; aggregation trên `text` lỗi. Field lọc/nhóm phải `keyword`.
3. **Reindex KHÔNG zero-downtime** — đổi mapping/analyzer cần reindex. Dùng **alias**: tạo index mới, reindex, rồi đổi alias trỏ sang index mới nguyên tử → app không downtime.
4. **Deep pagination** — `from: 100000, size: 10` bắt mỗi shard sort 100010 kết quả → tốn RAM/CPU khủng khiếp. Dùng `search_after` (cursor) hoặc `scroll` cho phân trang sâu.
5. **No analyzer cho ngôn ngữ** — tiếng Việt với analyzer mặc định không hiểu từ ghép/dấu/đồng nghĩa → kết quả tệ. Cần custom analyzer (ICU, plugin Việt).

💡 **Zero-downtime reindex bằng alias (chi tiết):**
```
1. App đọc/ghi qua alias "products" (trỏ → products_v1).
2. Tạo products_v2 với mapping mới, reindex từ v1 sang v2.
3. Đổi alias "products": gỡ products_v1, thêm products_v2 (1 lệnh nguyên tử).
4. App tự động dùng v2, xóa v1 sau khi xác nhận.
```

---

## Bài tập

> Tự làm trước, đáp án ở mục [Lời giải chi tiết](#lời-giải-chi-tiết).

**BT1.** Build inverted index THỦ CÔNG cho 5 document dưới (chỉ tokenize + lowercase, bỏ stop word `the`, `is`, `a`). Sau đó query term `"go"` → liệt kê các doc.

```
doc1: "Go is a fast language"
doc2: "Python is slow"
doc3: "Go go gophers love Go"
doc4: "The Rust language is fast"
doc5: "JavaScript is a web language"
```

**BT2.** Tính **TF-IDF score** cho query `"language"` trên 3 document, dùng tf thô và `idf = ln(N/df)`:

```
docA: "language is power language"   (4 từ)
docB: "go is a system language"      (5 từ)
docC: "python loves data"            (3 từ)
```

**BT3.** Thiết kế **ES mapping** cho `product` với yêu cầu: `name` cho full-text search, `category` cho filter + aggregation, `price` cho range filter, `created_at` cho sort theo ngày, `brand` vừa search vừa aggregate được.

**BT4.** Viết **bool query** tìm product có `"laptop"` trong `name` AND `price < 1000` AND `category = electronics`. Chỉ rõ mệnh đề nào nên `must`, mệnh đề nào nên `filter` và tại sao.

**BT5.** Mô tả cách implement **autocomplete với prefix** (gõ "lap" gợi ý "laptop", "lapland"...). Cho ý tưởng cấu trúc dữ liệu + cách ES làm.

**BT6.** Với 3 scenario sau, chọn **Postgres FTS / Elasticsearch / Bleve** và giải thích:
- (a) Blog cá nhân, ~5.000 bài, đã dùng Postgres, cần search tiêu đề + nội dung.
- (b) E-commerce 50 triệu sản phẩm, faceted filter, autocomplete, log analytics.
- (c) CLI tool Go offline, search ~10.000 ghi chú local, không muốn service ngoài.

---

## Lời giải chi tiết

### Lời giải BT1

**Bước 1 — analyze mỗi doc** (tokenize, lowercase, bỏ stop word `the`/`is`/`a`):

| Doc | Term |
|-----|------|
| doc1 | `go`, `fast`, `language` |
| doc2 | `python`, `slow` |
| doc3 | `go`, `go`, `gophers`, `love`, `go` |
| doc4 | `rust`, `language`, `fast` |
| doc5 | `javascript`, `web`, `language` |

**Bước 2 — inverted index** (kèm tf):

```
go         → [doc1×1, doc3×3]
fast       → [doc1×1, doc4×1]
language   → [doc1×1, doc4×1, doc5×1]
python     → [doc2×1]
slow       → [doc2×1]
gophers    → [doc3×1]
love       → [doc3×1]
rust       → [doc4×1]
javascript → [doc5×1]
web        → [doc5×1]
```

**Bước 3 — query "go":** tra `go → [doc1, doc3]`. Kết quả: **doc1, doc3**. doc3 có tf=3 nên xếp trên doc1 nếu tính điểm.

### Lời giải BT2

`N = 3`. Term query = `language`. `df("language")` = số doc chứa "language" = 2 (docA, docB; docC không có).

**IDF:** `idf = ln(N/df) = ln(3/2) = ln(1.5) ≈ 0.405`.

**TF (thô):**
- docA: "language" ×2 → tf = 2
- docB: "language" ×1 → tf = 1
- docC: ×0 → loại

**Score = tf × idf:**

| Doc | tf | score = tf × 0.405 |
|-----|----|--------------------|
| docA | 2 | **0.810** |
| docB | 1 | **0.405** |
| docC | 0 | (không khớp) |

→ Xếp hạng: **docA > docB**. docA nhắc "language" 2 lần nên liên quan hơn.

*(Lưu ý: nếu chuẩn hóa tf theo độ dài doc — tf/|d| — docA = 2/4 = 0.5, docB = 1/5 = 0.2, docA vẫn trên. Và BM25 sẽ phạt docA nhẹ vì nó ngắn nhưng nhắc nhiều; thứ hạng không đổi ở ví dụ này.)*

### Lời giải BT3

```json
PUT /products
{
  "mappings": {
    "properties": {
      "name":       { "type": "text" },
      "category":   { "type": "keyword" },
      "price":      { "type": "float" },
      "created_at": { "type": "date" },
      "brand": {
        "type": "text",
        "fields": { "raw": { "type": "keyword" } }
      }
    }
  }
}
```

Giải thích:
- `name`: **text** — full-text search bằng `match`.
- `category`: **keyword** — filter (`term`) + aggregation (faceted count).
- `price`: **float** — range filter (`range`).
- `created_at`: **date** — sort theo ngày, range theo thời gian.
- `brand`: **multi-field** — `brand` (text) để search, `brand.raw` (keyword) để aggregate/sort. Vì yêu cầu "vừa search vừa aggregate".

### Lời giải BT4

```json
{
  "query": {
    "bool": {
      "must":   [ { "match": { "name": "laptop" } } ],
      "filter": [
        { "term":  { "category": "electronics" } },
        { "range": { "price": { "lt": 1000 } } }
      ]
    }
  }
}
```

Lý do phân chia:
- `name: "laptop"` → **`must`** với **`match`**. Đây là điều kiện full-text cần tính relevance (document nhắc "laptop" trong tên nhiều/đúng hơn → điểm cao hơn → xếp trên). `must` đóng góp vào score.
- `category = electronics` → **`filter`** với **`term`**. Lọc cứng yes/no, không cần ranking → `filter` (nhanh + cache được). `category` là `keyword` nên dùng `term`.
- `price < 1000` → **`filter`** với **`range`**. Cũng là lọc cứng, không ảnh hưởng relevance.

Đặt 2 điều kiện cứng vào `filter` (thay vì `must`) giúp ES cache kết quả lọc và bỏ qua bước tính điểm cho chúng → nhanh hơn rõ rệt khi query lặp lại.

### Lời giải BT5

**Ý tưởng:** autocomplete cần khớp **prefix** ("lap" → "laptop"). Hai cách phổ biến:

**(a) Edge n-gram analyzer** — lúc index, sinh sẵn mọi prefix của term:
```
"laptop" → ["la", "lap", "lapt", "lapto", "laptop"]   (edge n-gram, min=2)
```
Lưu các prefix này vào inverted index. Khi user gõ "lap", tra term "lap" → khớp ngay mọi từ bắt đầu bằng "lap". Search-time KHÔNG analyze edge-ngram (chỉ index-time), nếu không "lap" lại bị cắt nhỏ.

**(b) Completion Suggester** — cấu trúc dữ liệu chuyên biệt của ES (dựa trên **FST — Finite State Transducer**, một dạng trie nén) tối ưu cho gợi ý prefix tốc độ cao, có trọng số (weight) để ưu tiên gợi ý phổ biến.

**Trie thủ công (minh họa cơ chế):** lưu các từ vào cây tiền tố:
```
        (root)
         / \
        l   ...
        |
        a
        |
        p ──── (lap...)
       / \
      t   l
     ...  ...
   laptop  lapland
```
Đi theo "l→a→p" tới node, rồi DFS lấy mọi từ con bên dưới = các gợi ý. Tra prefix là O(độ dài prefix). Đây chính là ý tưởng [solutions.go](./solutions.go) implement cho phần autocomplete.

⚠ Tránh dùng `wildcard "lap*"` cho autocomplete trên dữ liệu lớn — nó chậm (quét term). Edge n-gram/completion suggester được thiết kế riêng cho việc này.

### Lời giải BT6

**(a) Blog cá nhân, ~5.000 bài, đã dùng Postgres** → **Postgres FTS (`tsvector`)**.
- Lý do: dataset nhỏ, đã có Postgres → không cần thêm hạ tầng. `tsvector` + GIN index dư sức xử lý 5.000 bài với ranking (`ts_rank`). Dựng ES là overkill (thêm service, RAM, vận hành) cho lợi ích bằng 0.

**(b) E-commerce 50 triệu sản phẩm, faceted, autocomplete, log analytics** → **Elasticsearch**.
- Lý do: quy mô lớn cần phân tán (shard/replica). Faceted filter = aggregation (thế mạnh ES). Autocomplete = completion suggester. Log analytics = ELK stack — đúng use case "đinh" của ES. Postgres FTS không kham nổi aggregation + scale này; Meilisearch/Typesense tốt cho search nhưng không mạnh về log analytics quy mô tỉ dòng.

**(c) CLI tool Go offline, ~10.000 ghi chú local, không service ngoài** → **Bleve**.
- Lý do: yêu cầu "không service ngoài" + "app Go" → Bleve là thư viện native Go, nhúng thẳng vào binary, lưu index ra file local. Không cần Postgres/ES daemon. 10.000 ghi chú là quá nhỏ, Bleve thừa sức.

---

## Code & Minh họa

- [solutions.go](./solutions.go) — implement inverted index + tokenize/analyzer + TF-IDF & BM25 scoring + autocomplete trie bằng **Go thuần** (không cần ES server). Phần go-elasticsearch là comment tham khảo.
- [visualization.html](./visualization.html) — 3 module tương tác: (1) Inverted index builder, (2) Analyzer pipeline animation, (3) TF-IDF/BM25 scoring breakdown.

## Bài tiếp theo

- [Lesson 61 — Mini-project: Blog Backend](../lesson-61-mini-project-blog-backend/README.md): gộp Postgres (CRUD + transaction) + Redis cache + full-text search + migration thành một backend hoàn chỉnh.

## Tham khảo

- Apache Lucene — engine inverted index lõi của Elasticsearch.
- Elasticsearch: The Definitive Guide — chương relevance scoring (BM25).
- Go client: [github.com/elastic/go-elasticsearch](https://github.com/elastic/go-elasticsearch).
- Postgres documentation — Full Text Search (`tsvector`, `tsquery`, GIN).
- Bleve: [blevesearch.com](https://blevesearch.com) — full-text search native Go.
