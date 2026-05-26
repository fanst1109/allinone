// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: Programming/lesson-13-maps/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 13 — Map (hash table)

> **Tier 1 — Go Basic** · Lesson 13/12 · Tiền đề: [Lesson 12 — Array & Slice](../lesson-12-arrays-slices/), [Lesson 11 — Hàm](../lesson-11-functions/).

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Biết Map là gì, vì sao nó là cấu trúc lookup **O(1) amortized** quan trọng nhất trong mọi backend.
- Khai báo và khởi tạo map đúng cách (literal, \`make\`, hint capacity); hiểu vì sao **nil map ghi sẽ panic** nhưng đọc thì OK.
- Thành thạo các operation: set, get, **comma-ok**, \`delete\`, \`len\`.
- Hiểu **vì sao iteration thứ tự random** (Go cố tình) và cách extract sorted keys khi cần thứ tự ổn định.
- Tránh các pitfall: key không comparable, value struct không modify trực tiếp được, map không concurrent-safe.
- Dùng map cài **Set** (\`map[T]struct{}\`), counter, group-by, dedupe — các pattern xuất hiện hàng ngày trong code production.

## Vì sao Map quan trọng?

Hầu hết bài toán "tìm nhanh", "đếm", "nhóm", "dedupe" trong code Go thật đều quy về map. Vài ví dụ rút ra từ backend thực tế ở Hasaki:

- **Cache user session** theo \`sessionID\` → user info. Lookup mọi request, phải O(1).
- **Group transaction by date**: \`map[string][]Transaction\` — gom giao dịch theo ngày để báo cáo.
- **Dedupe email list** trước khi gửi marketing: bỏ tất cả email đã unsubscribe → \`map[string]struct{}\` chứa email đã unsub, check \`_, ok := unsub[mail]\` cực nhanh.
- **Đếm tần suất** sản phẩm xuất hiện trong giỏ hàng: \`map[productID]int\`.

Không có map, bạn sẽ phải duyệt slice mỗi lần → O(n) cho từng lookup. Với 1 triệu user session, 1 request = 500ms duyệt slice. Với map = 1µs. Khoảng cách 500.000×.

---

## 1. Map là gì?

> **💡 Trực giác.** Tưởng tượng tủ tài liệu có ô đánh số. Bạn cho tôi cái tên "alice@x.com", tôi có **công thức** biến tên đó thành số ô (ví dụ ô 47), đi thẳng tới ô 47 lấy hồ sơ ra. Không cần duyệt từng ô. Đó là map: **một bảng tra cứu Key → Value mà lookup không phụ thuộc số phần tử**.
>
> "Công thức" đó là **hash function**. Map = mảng các "bucket" + hash function quyết định key nào vào bucket nào.

**Định nghĩa hình thức:** Map (hash table) trong Go là cấu trúc dữ liệu lưu trữ cặp \`(key, value)\` với:

- **Lookup** trung bình **O(1) amortized** — không phụ thuộc số phần tử.
- **Insert / delete** trung bình **O(1) amortized**.
- **Iteration thứ tự không xác định** (random hoá có chủ ý).

> **❓ "Amortized" là gì?** Nghĩa là *trung bình theo thời gian dài*. Đôi khi 1 thao tác đơn lẻ chậm (vì map cần "resize" — cấp phát lại lớn hơn, copy hết phần tử qua bucket mới — tốn O(n)). Nhưng tính trên **n** thao tác liên tiếp thì tổng chi phí ~O(n), nên trung bình mỗi cái vẫn O(1). Đây là cùng kỹ thuật mà \`append\` cho slice dùng (đã học L12).

**Cú pháp khai báo:**

\`\`\`go
var m1 map[string]int                   // nil map — declare suông
m2 := map[string]int{}                  // empty map (literal rỗng)
m3 := map[string]int{"a": 1, "b": 2}    // literal có giá trị
m4 := make(map[string]int)              // empty map qua make
m5 := make(map[string]int, 100)         // hint: dự kiến ~100 phần tử
\`\`\`

Cú pháp tổng quát: \`map[KeyType]ValueType\`.

---

## 2. Khởi tạo — 3 cách + 1 cái bẫy

### 2.1 Literal

\`\`\`go
ages := map[string]int{
    "alice": 30,
    "bob":   25,
    "carol": 27,
}
\`\`\`

Dùng khi đã biết dữ liệu ngay tại compile-time (config, hằng số, mock data).

### 2.2 \`make\`

\`\`\`go
m := make(map[string]int)         // không hint capacity
m2 := make(map[string]int, 1000)  // hint: chuẩn bị slot cho ~1000 entry
\`\`\`

\`make\` luôn trả về map **đã cấp phát**, sẵn sàng ghi. Hint capacity (đối số thứ 2) giúp Go pre-allocate đủ bucket → tránh nhiều lần resize khi insert. Nếu biết trước số lượng, **luôn nên hint**.

### 2.3 Nil map — cái bẫy lớn nhất

\`\`\`go
var m map[string]int   // m là nil!
v := m["foo"]          // OK — đọc nil map trả zero value (0 cho int)
fmt.Println(v)         // 0
m["foo"] = 1           // PANIC: assignment to entry in nil map
\`\`\`

> **⚠ Lỗi thường gặp.** Khai báo \`var m map[string]int\` rồi quên \`make\` → đọc thì im lặng trả 0 (bug thầm lặng), ghi thì runtime panic. Quy tắc: **chưa \`make\` thì chưa ghi.**

**Phân biệt với struct embedding:**

\`\`\`go
type Cache struct {
    data map[string]string  // field map zero value = nil
}

c := Cache{}
c.data["k"] = "v"  // PANIC! Phải khởi tạo trong constructor
\`\`\`

Pattern đúng:

\`\`\`go
func NewCache() *Cache {
    return &Cache{data: make(map[string]string)}
}
\`\`\`

> **❓ Tại sao không panic luôn khi đọc nil map?** Vì zero value là contract chuẩn của Go. Đọc nil map trả zero value cho phép pattern \`if m["key"] == 0 { ... }\` chạy mà không sợ nil panic — code reader thân thiện hơn.

---

## 3. Operations cơ bản

### 3.1 Set & Get

\`\`\`go
m := make(map[string]int)
m["alice"] = 30          // set
m["bob"] = 25
v := m["alice"]          // get → 30
v2 := m["nobody"]        // get key không tồn tại → 0 (zero value)
\`\`\`

### 3.2 Comma-ok — idiom kiểm tra tồn tại

Vì Get trả zero value cho key không có, bạn **không phân biệt được** "key tồn tại với value 0" vs "key không tồn tại". Idiom **comma-ok** giải quyết:

\`\`\`go
v, ok := m["alice"]
// v = 30, ok = true

v, ok = m["nobody"]
// v = 0, ok = false
\`\`\`

Dùng khi cần biết key có thực sự ở đó hay không (ví dụ: cache hit/miss).

\`\`\`go
if user, ok := sessionCache[sid]; ok {
    return user, nil
}
// cache miss → query DB
\`\`\`

> **⚠ Lỗi thường gặp.** Viết \`if m["k"] != 0\` để check "key có tồn tại" — sai khi value 0 là hợp lệ. Vd \`m["alice"] = 0\` (số đơn hàng hôm nay = 0) → \`m["alice"] != 0\` cho \`false\`, nhưng key vẫn tồn tại. **Luôn dùng comma-ok cho check tồn tại.**

### 3.3 Delete

\`\`\`go
delete(m, "alice")   // xoá key "alice"
delete(m, "nobody")  // OK — delete key không có không panic, không lỗi
\`\`\`

\`delete\` là built-in function (không phải method). Không trả về gì.

### 3.4 Len

\`\`\`go
len(m)  // số phần tử hiện tại
\`\`\`

\`len(nil_map) = 0\` — đây cũng là lý do đọc nil map an toàn.

> **🔁 Dừng lại tự kiểm tra.**
>
> 1. Cho \`m := map[string]int{"a": 0}\`. \`m["a"]\` trả về gì? Còn \`m["b"]\`? Phân biệt 2 cái bằng cách nào?
>
> <details><summary>Đáp án</summary>
>
> Cả 2 đều trả \`0\`. Phân biệt bằng comma-ok: \`_, ok := m["a"]\` → \`ok=true\`, còn \`_, ok := m["b"]\` → \`ok=false\`.
>
> </details>
>
> 2. \`var m map[int]string; len(m)\` trả về gì? Có panic không?
>
> <details><summary>Đáp án</summary>
>
> Trả về \`0\`. Không panic — len trên nil map an toàn. Chỉ **ghi** vào nil map mới panic.
>
> </details>

---

## 4. Iteration — thứ tự RANDOM (cố ý)

\`\`\`go
m := map[string]int{"a": 1, "b": 2, "c": 3}
for k, v := range m {
    fmt.Println(k, v)
}
\`\`\`

Output mỗi lần chạy chương trình có thể khác nhau:

\`\`\`
b 2
a 1
c 3
\`\`\`

\`\`\`
c 3
a 1
b 2
\`\`\`

**Đây là feature, không phải bug.** Go runtime **cố tình** randomize thứ tự range mỗi lần để dev không phụ thuộc vào thứ tự (vì hash table thật sự không có thứ tự — phụ thuộc vào hash function và bucket layout, có thể đổi giữa các phiên bản Go).

> **❓ Lịch sử ngắn:** Trước Go 1.0, iteration không random — và một số code dựa vào điều đó. Khi Go 1.0 thay đổi internal map, code đó breaks ngoài ý muốn. Để răn đe, Go runtime intentionally randomize iteration → bug lộ ra ngay, không âm ỉ.

**Khi cần thứ tự ổn định**, extract keys ra rồi sort:

\`\`\`go
import "sort"

keys := make([]string, 0, len(m))
for k := range m {
    keys = append(keys, k)
}
sort.Strings(keys)

for _, k := range keys {
    fmt.Println(k, m[k])
}
\`\`\`

Lưu ý \`make([]string, 0, len(m))\` — pre-allocate đủ cap để \`append\` không realloc.

> **⚠ Lỗi thường gặp.** Test in ra map rồi so chuỗi exact với expected output. Sẽ flaky vì thứ tự random. Cách đúng: so từng (key, value) sau khi sort, hoặc dùng \`reflect.DeepEqual\` so 2 map.

---

## 5. Key types — phải comparable

Key phải là **comparable type** — type so sánh được bằng \`==\`:

| Comparable (làm key OK) | Không comparable (KHÔNG làm key được) |
|---|---|
| \`int\`, \`int64\`, \`float64\`, ... | \`slice\` (\`[]T\`) |
| \`string\`, \`bool\` | \`map[K]V\` |
| \`pointer\` (\`*T\`) | \`func\` (function value) |
| \`interface\` (nếu underlying comparable) | struct chứa field không comparable |
| \`struct\` (mọi field comparable) | array của type không comparable |
| \`array\` cố định (\`[N]T\`) nếu T comparable | |

\`\`\`go
type Point struct{ X, Y int }
m1 := map[Point]string{{0, 0}: "origin"}  // OK — Point comparable

type Bad struct{ Tags []string }
// m2 := map[Bad]int{}  // COMPILE ERROR: invalid map key type Bad
\`\`\`

> **❓ Vì sao slice không làm key được?** Hash function cần đọc nội dung key để tính hash. Slice là (pointer, len, cap) — pointer trỏ tới mảng có thể bị mutate sau khi insert vào map. Nếu cho phép, sau khi mutate, hash thay đổi → không tìm lại key được nữa. Go chặn ngay từ compile time để không tạo bug ngầm.

### Workaround khi cần "slice-like key"

Convert sang string hoặc array cố định:

\`\`\`go
// Sai: m := map[[]int]string{}  → compile error
// Đúng: chuyển slice thành string
key := fmt.Sprintf("%v", []int{1, 2, 3})  // "[1 2 3]"
m := map[string]string{key: "hello"}

// Hoặc array cố định nếu biết length:
m2 := map[[3]int]string{{1, 2, 3}: "hello"}  // OK
\`\`\`

---

## 6. Value — type gì cũng được

Khác với key, value có thể là **bất kỳ type nào**:

\`\`\`go
type User struct {
    Name string
    Age  int
}

users := map[int]User{1: {"alice", 30}}              // map of struct
groups := map[string][]string{"admin": {"a", "b"}}    // map of slice
handlers := map[string]func(int) int{"sq": square}    // map of function
matrix := map[string]map[string]int{}                 // nested map (cẩn thận init)
\`\`\`

Nested map (\`matrix["row"]["col"]\`) là chỗ rất dễ panic — trước khi ghi vào inner map phải \`make\` nó trước:

\`\`\`go
matrix := map[string]map[string]int{}
matrix["a"] = map[string]int{}  // PHẢI khởi tạo inner trước
matrix["a"]["b"] = 1            // OK
matrix["c"]["d"] = 1            // PANIC: matrix["c"] là nil map!
\`\`\`

---

## 7. Map of struct — gotcha kinh điển

Đoạn code dưới **không compile**:

\`\`\`go
type Point struct{ X, Y int }
m := map[string]Point{"origin": {0, 0}}
m["origin"].X = 5
// compile error: cannot assign to struct field m["origin"].X in map
\`\`\`

> **❓ Tại sao?** Khi bạn đọc \`m["origin"]\`, Go **copy** struct ra ngoài (vì map có thể resize → địa chỉ struct không stable). Bạn đang cố modify một bản copy chưa được gán đi đâu, Go biết chắc bạn sẽ mất change đó → cấm thẳng từ compile.

**Fix 1: lấy ra, modify, gán lại.**

\`\`\`go
p := m["origin"]   // copy ra biến p
p.X = 5            // modify copy
m["origin"] = p    // gán lại
\`\`\`

**Fix 2: dùng map of pointer.**

\`\`\`go
m2 := map[string]*Point{"origin": {0, 0}}
m2["origin"].X = 5   // OK: pointer dereference rồi set field
\`\`\`

> **⚠ Cảnh báo trade-off.** Map of pointer thì mọi reader đều thấy thay đổi (alias) — đôi khi muốn, đôi khi không. Nếu chỉ thỉnh thoảng modify, \`map[K]V\` + lấy ra gán lại an toàn hơn (giữ tính immutable của value). Nếu modify thường xuyên, \`map[K]*V\` tránh copy tốn.

---

## 8. Counter pattern — \`m[k]++\` an toàn

Vì \`m["k"]\` trả zero value (0) cho key chưa tồn tại, idiom counter cực gọn:

\`\`\`go
count := make(map[string]int)
for _, word := range words {
    count[word]++  // tự động: nếu chưa có → 0+1 = 1; nếu có → tăng 1
}
\`\`\`

Tương đương:

\`\`\`go
if _, ok := count[word]; !ok {
    count[word] = 0
}
count[word] = count[word] + 1
\`\`\`

Nhưng \`m[k]++\` là Go-idiomatic — dùng đi đừng ngại.

---

## 9. Set bằng map — \`map[T]struct{}\`

Go **không có** kiểu Set built-in. Idiom: dùng map với value rỗng:

\`\`\`go
set := make(map[string]struct{})
set["alice"] = struct{}{}
set["bob"] = struct{}{}

if _, ok := set["alice"]; ok {
    // tồn tại
}

delete(set, "alice")
\`\`\`

> **❓ Tại sao \`struct{}\` thay vì \`bool\`?** Vì \`struct{}\` (empty struct) chiếm **0 byte** trong Go. \`bool\` chiếm 1 byte. Với 10 triệu entry, dùng \`struct{}\` tiết kiệm 10 MB. Trên backend với set siêu lớn (vd dedupe 50M email), đây là khác biệt thật.

**Helper functions** thường viết:

\`\`\`go
type StringSet map[string]struct{}

func (s StringSet) Add(x string)    { s[x] = struct{}{} }
func (s StringSet) Has(x string) bool { _, ok := s[x]; return ok }
func (s StringSet) Remove(x string) { delete(s, x) }
func (s StringSet) Len() int        { return len(s) }
\`\`\`

Ví dụ thực tế: list email đã unsubscribe ở Hasaki:

\`\`\`go
unsub := make(StringSet, 100_000)
// load từ DB
for _, e := range loadUnsubFromDB() {
    unsub.Add(e)
}
// trước khi gửi marketing:
for _, recipient := range list {
    if unsub.Has(recipient) {
        continue  // bỏ qua
    }
    send(recipient)
}
\`\`\`

---

## 10. Map KHÔNG concurrent-safe

\`\`\`go
m := make(map[string]int)
go func() { m["a"] = 1 }()
go func() { m["b"] = 2 }()
// fatal error: concurrent map writes
\`\`\`

Go runtime tự detect (đối với write/write) và **panic luôn**, không phải UB ngầm như C. Nhưng read/write song song vẫn race condition và có thể corrupt — phải tránh.

**Cách xử lý:**

1. **\`sync.Mutex\`** bọc quanh map:

   \`\`\`go
   var mu sync.Mutex
   mu.Lock()
   m["k"] = 1
   mu.Unlock()
   \`\`\`

2. **\`sync.RWMutex\`** nếu đọc nhiều hơn ghi (RLock cho reader).

3. **\`sync.Map\`** — map concurrent-safe built-in, optimize cho 2 use case: "ghi 1 lần đọc nhiều", "key disjoint giữa các goroutine". Không phải drop-in replacement cho mọi case. Sẽ học chi tiết ở **Lesson 23 — sync & atomic**.

> **⚠ Sai lầm phổ biến.** Nghĩ "tôi chỉ ghi 1 goroutine, đọc N goroutine thì OK" — KHÔNG. Một khi có write song song với read, Go memory model không bảo đảm gì. Bắt buộc đồng bộ.

---

## 11. Performance — một vài fact

- **Load factor:** Go map resize (gấp đôi số bucket, rehash hết) khi số phần tử / số bucket > 6.5. Resize tốn O(n) — đó là chi phí "amortized" đã nói.
- **Pre-allocate hint:** \`make(map[K]V, n)\` cho Go biết "tôi sẽ chèn ~n phần tử" để cấp đủ bucket từ đầu, tránh resize giữa chừng. Test thực tế của Go team cho thấy hint đúng tiết kiệm 20–40% thời gian insert với map lớn.
- **Hash function nhanh:** với key string, Go runtime dùng **AESHASH** trên CPU có AES-NI (mọi x86 hiện đại) — hash 1 string dài 16 byte chỉ vài chục cycle. Đây là lý do \`map[string]X\` rất nhanh trong thực tế.
- **Memory overhead:** mỗi bucket Go giữ ~8 entry + metadata. Map nhỏ có overhead tương đối lớn — với < 8 entry, slice + linear search còn nhanh hơn vì cache-friendly.

> **❓ Hỏi tự nhiên: vậy lúc nào dùng slice thay map?**
>
> Khi:
> - Dataset rất nhỏ (≤ 10 phần tử). Linear search trên slice cache-friendly, thường nhanh hơn map.
> - Cần thứ tự ổn định.
> - Cần iterate nhiều, lookup ít.
> - Memory cực kỳ chật (map overhead lớn hơn slice).

---

## 12. Common idioms — học một lần dùng cả đời

\`\`\`go
// 1. Đếm tần suất
count := map[string]int{}
for _, w := range words { count[w]++ }

// 2. Group by
groups := map[string][]Item{}
for _, it := range items {
    groups[it.Category] = append(groups[it.Category], it)
}

// 3. First-seen / dedupe
seen := map[string]struct{}{}
unique := []string{}
for _, x := range list {
    if _, ok := seen[x]; !ok {
        seen[x] = struct{}{}
        unique = append(unique, x)
    }
}

// 4. Cache check-or-fill
if v, ok := cache[key]; ok {
    return v
}
v := compute(key)
cache[key] = v
return v
\`\`\`

Tất cả đều idiomatic, đọc Go thật bạn sẽ gặp hàng ngày.

> **📝 Tóm tắt nhanh trước khi vào bài tập:**
>
> - Map = hash table built-in, lookup O(1) amortized.
> - 3 cách khởi tạo: literal, \`make\`, \`make(..., hint)\`. **Nil map đọc OK, ghi PANIC.**
> - Operations: set \`m[k]=v\`, get \`v=m[k]\`, comma-ok \`v,ok=m[k]\`, \`delete(m,k)\`, \`len(m)\`.
> - Iteration thứ tự **random cố ý**. Cần thứ tự → extract keys + sort.
> - Key phải comparable. **Slice/map/func KHÔNG làm key được.**
> - **Map of struct: không modify field trực tiếp.** Lấy ra → modify → gán lại; hoặc dùng \`*Struct\`.
> - Set = \`map[T]struct{}\` (0 byte value).
> - Map **không** concurrent-safe — cần \`sync.Mutex\` hoặc \`sync.Map\`.

---

## Bài tập

### BT1 — Đếm tần suất từ

Cho \`words := []string{"go", "is", "fun", "go", "is", "go"}\`. Trả về \`map[string]int\` đếm số lần xuất hiện mỗi từ.

### BT2 — Group user theo Department

Cho \`type User struct{ Name, Department string }\` và slice \`[]User\`. Trả về \`map[string][]User\` — gom user theo department.

### BT3 — Phần tử xuất hiện đúng 1 lần

Cho \`nums := []int{1, 2, 3, 2, 1, 4, 3}\`. Trả về slice các số **xuất hiện đúng 1 lần** (ở đây là \`[4]\`). Thứ tự không quan trọng.

### BT4 — Implement Set

Viết type \`StringSet\` có 4 method: \`Add(x string)\`, \`Has(x string) bool\`, \`Remove(x string)\`, \`Len() int\`. Dùng \`map[string]struct{}\` bên trong. Viết function \`NewStringSet() StringSet\`.

### BT5 — Đoán output

Đoán output / lỗi của 4 đoạn code:

**(a)**
\`\`\`go
var m map[string]int
fmt.Println(m["x"])
m["x"] = 1
\`\`\`

**(b)**
\`\`\`go
type Point struct{ X, Y int }
m := map[string]Point{"o": {0, 0}}
m["o"].X = 5
fmt.Println(m["o"])
\`\`\`

**(c)**
\`\`\`go
m := map[string]int{"a": 0}
if v := m["a"]; v != 0 {
    fmt.Println("found")
} else {
    fmt.Println("not found")
}
\`\`\`

**(d)**
\`\`\`go
type Bad struct{ Tags []string }
m := map[Bad]int{}
m[Bad{[]string{"x"}}] = 1
\`\`\`

### BT6 — Cache LRU đơn giản

Viết struct \`SimpleCache\` với:
- \`New(capacity int) *SimpleCache\` — tạo cache.
- \`Get(key string) (string, bool)\` — trả value & ok.
- \`Set(key, value string)\` — chèn key/value. Nếu vượt \`capacity\`, **xoá 1 key bất kỳ** (chấp nhận chưa LRU thật, chỉ cần giữ size ≤ capacity).

Sau đó giải thích tại sao "chỉ map" chưa đủ để làm LRU thật (cần thêm gì?).

---

## Lời giải chi tiết

### Giải BT1 — Đếm tần suất

\`\`\`go
func wordCount(words []string) map[string]int {
    count := make(map[string]int, len(words))
    for _, w := range words {
        count[w]++
    }
    return count
}
\`\`\`

**Cách tiếp cận:** counter pattern — \`m[k]++\` an toàn vì zero value của int là 0. Pre-allocate hint = \`len(words)\` (worst case mỗi word unique).

**Độ phức tạp:** O(n) thời gian, O(k) bộ nhớ với k = số word distinct.

Với input bài: kết quả \`{"go": 3, "is": 2, "fun": 1}\`.

### Giải BT2 — Group by Department

\`\`\`go
func groupByDept(users []User) map[string][]User {
    groups := make(map[string][]User)
    for _, u := range users {
        groups[u.Department] = append(groups[u.Department], u)
    }
    return groups
}
\`\`\`

**Cách tiếp cận:** \`append\` trên \`groups[key]\` an toàn vì nếu key chưa có, value là \`nil\` slice — và \`append(nil, x)\` hợp lệ trong Go (trả về slice mới với len=1).

**Độ phức tạp:** O(n) thời gian. Mỗi user duyệt 1 lần.

### Giải BT3 — Số xuất hiện đúng 1 lần

\`\`\`go
func onlyOnce(nums []int) []int {
    count := make(map[int]int, len(nums))
    for _, n := range nums {
        count[n]++
    }
    var result []int
    for n, c := range count {
        if c == 1 {
            result = append(result, n)
        }
    }
    return result
}
\`\`\`

**Cách tiếp cận:** Pass 1 đếm, pass 2 lọc các phần tử có count == 1.

**Độ phức tạp:** O(n) thời gian, O(n) bộ nhớ.

Với input \`{1,2,3,2,1,4,3}\` → counts \`{1:2, 2:2, 3:2, 4:1}\` → kết quả \`[4]\`.

### Giải BT4 — StringSet

\`\`\`go
type StringSet map[string]struct{}

func NewStringSet() StringSet {
    return make(StringSet)
}

func (s StringSet) Add(x string)    { s[x] = struct{}{} }
func (s StringSet) Has(x string) bool { _, ok := s[x]; return ok }
func (s StringSet) Remove(x string) { delete(s, x) }
func (s StringSet) Len() int        { return len(s) }
\`\`\`

**Lưu ý:**

- Định nghĩa \`type StringSet map[string]struct{}\` cho phép gắn method (Go cấm gắn method lên type mặc định của map).
- Method receiver là \`StringSet\` (value, không phải pointer) vì map vốn đã là reference type — copy header nhưng share data.
- \`Has\` trả \`bool\` qua comma-ok, không phải so sánh value.

### Giải BT5 — Đoán output

**(a) PANIC.**
- Dòng 1: \`m\` là nil map.
- \`m["x"]\` đọc → 0, in ra "0" — OK.
- \`m["x"] = 1\` — ghi nil map → \`panic: assignment to entry in nil map\`.

**(b) COMPILE ERROR.**
- \`m["o"].X = 5\` — không compile vì map trả copy struct, Go cấm gán lên field của giá trị tạm.
- Lỗi: \`cannot assign to struct field m["o"].X in map\`.
- Fix: \`p := m["o"]; p.X = 5; m["o"] = p\`.

**(c) "not found".**
- Key \`"a"\` tồn tại với value 0.
- Nhưng condition \`v != 0\` cho \`false\` → in "not found".
- **Bug**: nhầm "value 0" với "key không tồn tại". Phải dùng comma-ok: \`if _, ok := m["a"]; ok\`.

**(d) COMPILE ERROR.**
- \`Bad\` chứa field \`[]string\` (slice) — slice không comparable → struct chứa nó cũng không comparable.
- Lỗi: \`invalid map key type Bad\`.
- Phát hiện ở compile time, không phải runtime.

### Giải BT6 — Cache đơn giản

\`\`\`go
type SimpleCache struct {
    cap  int
    data map[string]string
}

func New(capacity int) *SimpleCache {
    return &SimpleCache{
        cap:  capacity,
        data: make(map[string]string, capacity),
    }
}

func (c *SimpleCache) Get(key string) (string, bool) {
    v, ok := c.data[key]
    return v, ok
}

func (c *SimpleCache) Set(key, value string) {
    if _, exists := c.data[key]; !exists && len(c.data) >= c.cap {
        // Vượt capacity → xoá 1 key bất kỳ
        // (iteration random của Go — nên đây cũng là "random eviction")
        for k := range c.data {
            delete(c.data, k)
            break
        }
    }
    c.data[key] = value
}
\`\`\`

**Vì sao "chỉ map" chưa đủ làm LRU thật?**

LRU (Least Recently Used) cần evict **key cũ nhất theo thời gian truy cập**. Map không lưu thứ tự. Để biết key nào cũ nhất:

- **Option A**: lưu thêm timestamp \`map[string]struct{value string; lastUsed time.Time}\` — Set/Get O(1), nhưng **eviction** phải duyệt toàn map tìm \`min(lastUsed)\` → O(n). Không production-ready.
- **Option B (đúng)**: map + **doubly linked list**. List giữ thứ tự truy cập, map trỏ tới node trong list. Mỗi Get đưa node lên đầu list (O(1) nhờ doubly linked). Evict là remove tail (O(1)). Đây là cách \`groupcache\`, Redis LRU, Java \`LinkedHashMap\` đều dùng.

Sẽ học chi tiết khi vào **Tier 5 — Database & Caching**.

**Độ phức tạp** của bản đơn giản: Get O(1), Set O(1) trung bình (eviction trong vòng \`for break\` thực tế ~O(1) vì chỉ lấy phần tử đầu của iteration).

---

## Code & Minh hoạ

- [\`solutions.go\`](./solutions.go) — code Go chạy được, demo tất cả khái niệm trong bài: nil map panic, comma-ok, set, counter, group-by, map of struct gotcha, iteration random (chạy 3 lần để thấy).
- [\`visualization.html\`](./visualization.html) — 3 module tương tác:
  - **Module 1: Hash table internals** — vẽ bucket array, animate insert/lookup với hash function đơn giản, demo collision.
  - **Module 2: Counter playground** — nhập danh sách từ, watch \`m[w]++\` chạy từng bước, bảng map update real-time.
  - **Module 3: Iteration random** — chạy iteration 5 lần liên tiếp, mỗi lần thứ tự khác nhau.

---

## Bài tiếp theo

→ [**Lesson 14 — String & Rune & UTF-8**](../lesson-14-strings-runes-utf8/) — string trong Go thực ra là \`[]byte\`, hiểu rune để xử lý Unicode đúng. Sau đó ta dùng map để demo "đếm ký tự tiếng Việt" — gặp lại pattern hôm nay.
`;
