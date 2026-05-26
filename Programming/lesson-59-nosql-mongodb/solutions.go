// Lesson 59 — NoSQL & MongoDB
//
// File này mô phỏng (in-memory) một API MongoDB tối giản để CHẠY ĐƯỢC mà
// không cần cài MongoDB. Mục đích: hiểu cơ chế InsertOne / Find / UpdateOne
// với filter dạng bson.M, và một aggregation pipeline đơn giản (group + sort).
//
// CHẠY: go run solutions.go
//
// Trong code production thật, bạn KHÔNG tự viết những thứ này — bạn dùng
// driver chính thức:
//
//     import (
//         "go.mongodb.org/mongo-driver/mongo"
//         "go.mongodb.org/mongo-driver/mongo/options"
//         "go.mongodb.org/mongo-driver/bson"
//     )
//     client, _ := mongo.Connect(ctx, options.Client().ApplyURI("mongodb://localhost:27017"))
//     coll := client.Database("blog").Collection("posts")
//     coll.InsertOne(ctx, Post{...})
//     coll.Find(ctx, bson.M{"views": bson.M{"$gt": 18}})
//
// Ở đây ta tự cài lại phần lõi để thấy "ruột" của nó.

package main

import (
	"errors"
	"fmt"
	"sort"
)

// =====================================================================
// 1. Kiểu dữ liệu mô phỏng BSON
// =====================================================================

// M mô phỏng bson.M — một document/filter dạng map[string]interface{}.
// Document MongoDB về bản chất chính là JSON/BSON; ở đây ta dùng map Go.
type M map[string]interface{}

// Document là một bản ghi trong collection (tương đương 1 row trong SQL,
// nhưng schema-less — mỗi document có thể có field khác nhau).
type Document = M

// =====================================================================
// 2. Collection in-memory + các thao tác CRUD
// =====================================================================

// Collection = nhóm document (tương đương "table" trong SQL).
type Collection struct {
	name   string
	docs   []Document
	nextID int // mô phỏng _id tự tăng (thật ra MongoDB dùng ObjectId)
}

func NewCollection(name string) *Collection {
	return &Collection{name: name, nextID: 1}
}

// InsertOne thêm 1 document. Nếu chưa có "_id" thì tự sinh (giống ObjectId).
// Tương ứng: coll.InsertOne(ctx, doc)
func (c *Collection) InsertOne(doc Document) interface{} {
	cp := cloneDoc(doc)
	if _, ok := cp["_id"]; !ok {
		cp["_id"] = c.nextID
		c.nextID++
	}
	c.docs = append(c.docs, cp)
	return cp["_id"]
}

// Find trả về mọi document khớp filter.
// Tương ứng: cur, _ := coll.Find(ctx, filter); cur.All(ctx, &out)
func (c *Collection) Find(filter M) []Document {
	var out []Document
	for _, d := range c.docs {
		if matches(d, filter) {
			out = append(out, d)
		}
	}
	return out
}

// FindOne trả về document đầu tiên khớp filter, hoặc lỗi nếu không có.
// Tương ứng: coll.FindOne(ctx, filter).Decode(&p)
func (c *Collection) FindOne(filter M) (Document, error) {
	for _, d := range c.docs {
		if matches(d, filter) {
			return d, nil
		}
	}
	return nil, errors.New("mongo: no documents in result")
}

// UpdateOne cập nhật document đầu tiên khớp filter bằng update operator.
// Hỗ trợ $set (gán) và $inc (cộng). Trả về số document bị sửa (0 hoặc 1).
// Tương ứng: coll.UpdateOne(ctx, filter, bson.M{"$set": ...} / {"$inc": ...})
func (c *Collection) UpdateOne(filter M, update M) int {
	for _, d := range c.docs {
		if !matches(d, filter) {
			continue
		}
		applyUpdate(d, update)
		return 1
	}
	return 0
}

// DeleteOne xóa document đầu tiên khớp filter. Trả về số document bị xóa.
func (c *Collection) DeleteOne(filter M) int {
	for i, d := range c.docs {
		if matches(d, filter) {
			c.docs = append(c.docs[:i], c.docs[i+1:]...)
			return 1
		}
	}
	return 0
}

// =====================================================================
// 3. So khớp filter — mô phỏng bson.M với toán tử $gt/$gte/$lt/$lte/$ne/$in
// =====================================================================

// matches kiểm tra document d có khớp toàn bộ điều kiện trong filter không.
// Mọi điều kiện phải đúng (giống AND ngầm định của MongoDB).
func matches(d Document, filter M) bool {
	for field, cond := range filter {
		if !matchField(d[field], cond) {
			return false
		}
	}
	return true
}

// matchField: cond có thể là giá trị trực tiếp (so sánh bằng) hoặc một
// map toán tử như {"$gt": 18}.
func matchField(actual, cond interface{}) bool {
	ops, isOps := cond.(M)
	if !isOps {
		// So sánh bằng trực tiếp: {"author": "alice"}
		return equal(actual, cond)
	}
	// Map toán tử: {"$gt": 18, "$lte": 100}, ...
	for op, want := range ops {
		switch op {
		case "$gt":
			if !(toFloat(actual) > toFloat(want)) {
				return false
			}
		case "$gte":
			if !(toFloat(actual) >= toFloat(want)) {
				return false
			}
		case "$lt":
			if !(toFloat(actual) < toFloat(want)) {
				return false
			}
		case "$lte":
			if !(toFloat(actual) <= toFloat(want)) {
				return false
			}
		case "$ne":
			if equal(actual, want) {
				return false
			}
		case "$in":
			list, _ := want.([]interface{})
			found := false
			for _, v := range list {
				if equal(actual, v) {
					found = true
					break
				}
			}
			if !found {
				return false
			}
		default:
			return false // toán tử chưa hỗ trợ
		}
	}
	return true
}

// applyUpdate áp dụng update operator lên document (in-place).
func applyUpdate(d Document, update M) {
	for op, body := range update {
		fields, _ := body.(M)
		switch op {
		case "$set": // gán giá trị mới
			for k, v := range fields {
				d[k] = v
			}
		case "$inc": // cộng vào giá trị hiện tại (atomic trong DB thật)
			for k, v := range fields {
				d[k] = toFloatToInt(toFloat(d[k]) + toFloat(v))
			}
		}
	}
}

// =====================================================================
// 4. Aggregation pipeline tối giản: $match -> $group(count) -> $sort
// =====================================================================

// Stage là một bước trong pipeline, dạng {"$op": <body>}.
type Stage = M

// Aggregate chạy pipeline gồm các stage tuần tự (output stage trước là
// input stage sau — giống pipe shell). Hỗ trợ $match, $group, $sort.
// Tương ứng: coll.Aggregate(ctx, mongo.Pipeline{...})
func (c *Collection) Aggregate(pipeline []Stage) []Document {
	cur := append([]Document(nil), c.docs...)
	for _, stage := range pipeline {
		for op, body := range stage {
			switch op {
			case "$match":
				cur = matchStage(cur, body.(M))
			case "$group":
				cur = groupStage(cur, body.(M))
			case "$sort":
				cur = sortStage(cur, body.(M))
			}
		}
	}
	return cur
}

func matchStage(docs []Document, filter M) []Document {
	var out []Document
	for _, d := range docs {
		if matches(d, filter) {
			out = append(out, d)
		}
	}
	return out
}

// groupStage gom theo _id = "$field" và đếm bằng {"$sum": 1}.
// Đây là dạng group tối giản: { _id: "$author", count: {$sum: 1} }.
func groupStage(docs []Document, spec M) []Document {
	groupBy, _ := spec["_id"].(string) // vd "$author"
	field := groupBy
	if len(groupBy) > 0 && groupBy[0] == '$' {
		field = groupBy[1:]
	}
	counts := map[interface{}]int{}
	order := []interface{}{}
	for _, d := range docs {
		key := d[field]
		if _, seen := counts[key]; !seen {
			order = append(order, key)
		}
		counts[key]++
	}
	var out []Document
	for _, key := range order {
		out = append(out, Document{"_id": key, "count": counts[key]})
	}
	return out
}

// sortStage sắp xếp theo field với hướng 1 (tăng) / -1 (giảm).
func sortStage(docs []Document, spec M) []Document {
	var field string
	dir := 1
	for k, v := range spec {
		field = k
		dir = int(toFloat(v))
	}
	out := append([]Document(nil), docs...)
	sort.SliceStable(out, func(i, j int) bool {
		a, b := toFloat(out[i][field]), toFloat(out[j][field])
		if dir < 0 {
			return a > b
		}
		return a < b
	})
	return out
}

// =====================================================================
// 5. Helpers
// =====================================================================

func cloneDoc(d Document) Document {
	cp := make(Document, len(d))
	for k, v := range d {
		cp[k] = v
	}
	return cp
}

func equal(a, b interface{}) bool {
	// So sánh số bất kể int/float; còn lại so sánh trực tiếp.
	if isNumber(a) && isNumber(b) {
		return toFloat(a) == toFloat(b)
	}
	return a == b
}

func isNumber(v interface{}) bool {
	switch v.(type) {
	case int, int64, float64:
		return true
	}
	return false
}

func toFloat(v interface{}) float64 {
	switch n := v.(type) {
	case int:
		return float64(n)
	case int64:
		return float64(n)
	case float64:
		return n
	}
	return 0
}

// toFloatToInt giữ kết quả $inc ở dạng int cho gọn khi in.
func toFloatToInt(f float64) interface{} {
	return int(f)
}

// =====================================================================
// 6. Demo — chạy CRUD + aggregation, in kết quả
// =====================================================================

func main() {
	fmt.Println("=== MongoDB (mô phỏng in-memory) — Lesson 59 ===")

	posts := NewCollection("posts")

	// --- InsertOne: thêm vài post (schema-less: field có thể khác nhau) ---
	posts.InsertOne(M{"title": "Học MongoDB", "author": "alice", "views": 5, "published": true})
	posts.InsertOne(M{"title": "Go concurrency", "author": "alice", "views": 42, "published": true})
	posts.InsertOne(M{"title": "Bản nháp bí mật", "author": "bob", "views": 1, "published": false})
	posts.InsertOne(M{"title": "REST API design", "author": "bob", "views": 30, "published": true})
	posts.InsertOne(M{"title": "Index sâu", "author": "carol", "views": 99, "published": true})

	// --- Find: SELECT * FROM posts WHERE views > 18 ---
	fmt.Println("\n[Find] views > 18  (filter: bson.M{\"views\": bson.M{\"$gt\": 18}})")
	for _, d := range posts.Find(M{"views": M{"$gt": 18}}) {
		fmt.Printf("  _id=%v  %-18q author=%s views=%v\n", d["_id"], d["title"], d["author"], d["views"])
	}

	// --- Find với $in ---
	fmt.Println("\n[Find] author in [alice, carol]")
	for _, d := range posts.Find(M{"author": M{"$in": []interface{}{"alice", "carol"}}}) {
		fmt.Printf("  _id=%v  %-18q author=%s\n", d["_id"], d["title"], d["author"])
	}

	// --- UpdateOne: $inc views của post _id=1 ---
	fmt.Println("\n[UpdateOne] $inc views cho _id=1")
	n := posts.UpdateOne(M{"_id": 1}, M{"$inc": M{"views": 10}})
	got, _ := posts.FindOne(M{"_id": 1})
	fmt.Printf("  modified=%d  -> views giờ = %v\n", n, got["views"])

	// --- UpdateOne: $set published cho post của bob đang nháp ---
	fmt.Println("\n[UpdateOne] $set published=true cho _id=3")
	posts.UpdateOne(M{"_id": 3}, M{"$set": M{"published": true}})
	got, _ = posts.FindOne(M{"_id": 3})
	fmt.Printf("  _id=3 published giờ = %v\n", got["published"])

	// --- Aggregation: đếm post per author (chỉ published), sort desc (BT3) ---
	fmt.Println("\n[Aggregate] count post per author (published), sort desc")
	pipeline := []Stage{
		{"$match": M{"published": true}},
		{"$group": M{"_id": "$author", "count": M{"$sum": 1}}},
		{"$sort": M{"count": -1}},
	}
	for _, d := range posts.Aggregate(pipeline) {
		fmt.Printf("  author=%-6v count=%v\n", d["_id"], d["count"])
	}

	// --- DeleteOne ---
	fmt.Println("\n[DeleteOne] xóa _id=2")
	fmt.Printf("  deleted=%d, còn lại %d document\n",
		posts.DeleteOne(M{"_id": 2}), len(posts.Find(M{})))

	fmt.Println("\nLưu ý: đây là mô phỏng. Production dùng go.mongodb.org/mongo-driver.")
}
