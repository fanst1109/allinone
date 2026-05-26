// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: Programming/lesson-11-functions/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 11 — Hàm (Function) trong Go

Tier 1 · Go Basic · Lesson 11

> Lesson trước: [L10 — Vòng lặp](../lesson-10-loops-for/README.md) · Lesson sau: [L12 — Array & Slice](../lesson-12-arrays-slices/README.md)

## Mục tiêu học tập

Sau bài này bạn:

- Viết được hàm Go với 1 hoặc **nhiều giá trị trả về** (multiple return values) — đặc trưng Go.
- Phân biệt **named return** và **regular return**, biết khi nào dùng \`return\` rỗng (naked return).
- Dùng **variadic** (\`...int\`) và spread (\`slice...\`) cho hàm nhận số tham số tuỳ ý.
- Hiểu **function là first-class value**: gán biến, truyền argument, trả về.
- Viết **closure** và giải thích vì sao closure giữ "reference" (không copy) tới biến ngoài.
- Dùng **\`defer\`** đúng cách cho 3 use case kinh điển (close resource, unlock mutex, log entry/exit).
- Biết khi nào nên dùng **recursion** trong Go (và lý do Go không có tail-call optimization).
- Khai báo **function type** (\`type Handler func(...)\`) cho callback / strategy pattern.

## Kiến thức tiền đề

- [L07 — Biến & Kiểu](../lesson-07-variables-types/README.md): biết \`int\`, \`string\`, \`error\`, zero value.
- [L09 — Điều kiện](../lesson-09-control-flow/README.md): \`if\`/\`switch\`.
- [L10 — Vòng lặp](../lesson-10-loops-for/README.md): \`for\`, \`range\`.

---

## 1. Syntax cơ bản

### 1.1 Định nghĩa hàm

\`\`\`go
func add(a int, b int) int {
    return a + b
}
\`\`\`

Cấu trúc:
- \`func\` — keyword bắt đầu khai báo hàm.
- \`add\` — tên hàm. Quy ước Go: \`lowerCamelCase\` cho unexported (chỉ trong package), \`UpperCamelCase\` cho exported (truy cập từ package khác).
- \`(a int, b int)\` — danh sách tham số. Mỗi tham số: \`tên kiểu\`.
- \`int\` (sau dấu đóng ngoặc) — kiểu trả về.
- \`{ ... }\` — thân hàm, **bắt buộc \`{\` cùng dòng với \`func\`** (không như Java/C).

### 1.2 Rút gọn tham số cùng kiểu

Khi nhiều tham số cùng kiểu, gộp lại:

\`\`\`go
func add(a, b int) int { return a + b }     // a và b đều là int

func split(s string, sep string) []string   // không gộp được vì khác kiểu sau s
\`\`\`

### 1.3 Hàm không trả gì

\`\`\`go
func greet(name string) {
    fmt.Println("Hello", name)
}
\`\`\`

Không có kiểu sau \`()\` nghĩa là không trả gì (void trong C/Java).

> 💡 **Trực giác — Hàm là cái máy**
>
> Tưởng tượng một cái máy ép trái cây: bạn đút vào (input = tham số), máy chạy (logic trong thân hàm), nước trái cây chảy ra (return value). Hàm trong Go cũng vậy — đóng gói một quy trình lặp lại để gọi nhiều lần.

---

## 2. Multiple return values — đặc trưng Go

Đây là một trong những điểm khiến Go khác Java/Python/C: hàm có thể trả **nhiều giá trị**.

\`\`\`go
func divmod(a, b int) (int, int) {
    return a / b, a % b
}

q, r := divmod(17, 5)   // q = 3, r = 2
\`\`\`

Lưu ý cú pháp: \`(int, int)\` đặt trong ngoặc, hai giá trị return phân tách bởi dấu phẩy.

### 2.1 Pattern phổ biến nhất: \`(result, error)\`

Go không có exception. Thay vào đó, hàm có thể fail sẽ trả về **2 giá trị: kết quả và error**:

\`\`\`go
n, err := strconv.Atoi("42")
if err != nil {
    log.Fatal(err)
}
// n = 42, err = nil — OK
\`\`\`

Bạn sẽ thấy pattern này ở **mọi nơi** trong stdlib Go. Mặc định cho mọi hàm "có thể fail":

\`\`\`go
file, err := os.Open("config.json")        // I/O fail
body, err := io.ReadAll(resp.Body)         // read fail
req, err := http.NewRequest("GET", url, nil)  // build fail
\`\`\`

### 2.2 ≥ 4 ví dụ thực tế

**Ví dụ 1 — Parse string thành int** (\`strconv.Atoi\`):
\`\`\`go
n, err := strconv.Atoi("123")     // n=123, err=nil
n, err := strconv.Atoi("abc")     // n=0, err="strconv.Atoi: parsing \\"abc\\": invalid syntax"
\`\`\`

**Ví dụ 2 — Lookup trong map (comma-ok idiom)**:
\`\`\`go
m := map[string]int{"alice": 30}
age, ok := m["alice"]   // age=30, ok=true
age, ok := m["bob"]     // age=0,  ok=false   <- ok phân biệt "không có key" vs "có key nhưng value=0"
\`\`\`

**Ví dụ 3 — Type assertion (sẽ học kỹ ở Tier 2)**:
\`\`\`go
var i interface{} = "hello"
s, ok := i.(string)   // s="hello", ok=true
n, ok := i.(int)      // n=0,       ok=false   <- không panic, chỉ trả false
\`\`\`

**Ví dụ 4 — Đọc một dòng từ stdin** (\`bufio.Reader.ReadString\`):
\`\`\`go
line, err := reader.ReadString('\\n')
if err == io.EOF {
    return  // hết input
}
\`\`\`

### 2.3 Bỏ qua giá trị trả về bằng \`_\`

Nếu chỉ cần 1 trong nhiều giá trị, dùng \`_\` (blank identifier):

\`\`\`go
_, err := os.Stat("file.txt")     // chỉ quan tâm có file hay không
if err != nil { ... }

n, _ := strconv.Atoi("42")        // (sai cách — bỏ qua error là anti-pattern,
                                  // nhưng đôi khi chấp nhận được nếu input đã verify trước)
\`\`\`

> ⚠ **Lỗi thường gặp — quên check error**
>
> \`\`\`go
> n, _ := strconv.Atoi(userInput)  // SAI: nếu userInput không phải số, n = 0
> // dùng n sau đó → bug logic, không panic, rất khó debug
> \`\`\`
>
> Luôn check \`err != nil\` trừ khi bạn **chắc chắn** input đã clean. Một lỗi nhỏ ở đây có thể nuốt mất bug suốt nhiều tuần.

### 2.4 Trả về 3+ giá trị

Không có giới hạn cứng. Pattern (result, info, error) cũng thấy:

\`\`\`go
func parseURL(s string) (scheme, host string, err error) { ... }
\`\`\`

Nhưng ≥ 4 giá trị thường là dấu hiệu nên đóng gói thành **struct** (sẽ học ở L15).

> 🔁 **Dừng lại tự kiểm tra 2**
>
> Câu hỏi: hàm \`strings.Cut(s, sep string) (before, after string, found bool)\` trả về 3 giá trị. Vì sao \`found\` không thể suy ra từ \`before\`/\`after\`?
>
> <details><summary>Đáp án</summary>
>
> Vì \`before\` có thể là chuỗi rỗng \`""\` ngay cả khi \`sep\` được tìm thấy (vd \`Cut("=x", "=")\` → before=\`""\`, after=\`"x"\`, found=\`true\`). Không có \`found\`, ta không phân biệt được "không tìm thấy" và "tìm thấy ở vị trí 0".
> </details>

> 📝 **Tóm tắt mục 2**
>
> - Go cho phép hàm trả về nhiều giá trị; cú pháp \`(int, int)\`.
> - Pattern chuẩn nhất: \`(result, error)\`. Mọi hàm fail-able trong stdlib đều theo pattern này.
> - Lookup map dùng \`value, ok := m[key]\` để phân biệt "key không tồn tại" và "key có nhưng value zero".
> - Bỏ qua giá trị bằng \`_\`, nhưng **không bao giờ bỏ qua error mà không cân nhắc**.

---

## 3. Named return values

Bạn có thể đặt **tên** cho giá trị trả về ngay trong chữ ký hàm:

\`\`\`go
func divide(a, b int) (quotient, remainder int) {
    quotient = a / b
    remainder = a % b
    return                     // naked return — tự trả về quotient, remainder
}
\`\`\`

Cách này tương đương:
\`\`\`go
func divide(a, b int) (int, int) {
    q := a / b
    r := a % b
    return q, r
}
\`\`\`

Khác biệt:
- Với named return, biến \`quotient\` và \`remainder\` **đã được khai báo và khởi tạo zero-value** ngay khi hàm bắt đầu.
- \`return\` rỗng (naked return) tự động trả các named variable đó.

### 3.1 Khi nên dùng named return

**Trường hợp 1 — hàm rất ngắn + tên trả về tự giải thích**:

\`\`\`go
func splitHostPort(s string) (host, port string, err error) {
    // ... parse ...
    return
}
\`\`\`

Đọc chữ ký đã hiểu hàm làm gì.

**Trường hợp 2 — defer cần modify giá trị trả về**:

\`\`\`go
func openFile(path string) (f *os.File, err error) {
    f, err = os.Open(path)
    defer func() {
        if err != nil {
            log.Printf("open %s failed: %v", path, err)
        }
    }()
    return
}
\`\`\`

Defer chạy SAU return, có thể đọc/ghi \`f\` và \`err\` vì chúng là named.

### 3.2 Khi KHÔNG nên dùng

**Hàm dài (> 30 dòng)**: naked return ở cuối khiến người đọc phải scroll lên xem named return là gì. Mất time.

**Tránh giả định "tự tài liệu"**: nhiều người chỉ đặt tên cho có, không thực sự rõ nghĩa. Tốt hơn là \`return q, r\` tường minh.

> ⚠ **Lỗi thường gặp — shadow named return**
>
> \`\`\`go
> func bad() (n int) {
>     n := 5      // SAI: := tạo biến mới n trong scope nội, KHÔNG ghi vào named return
>     return      // return giá trị zero (0), không phải 5
> }
> \`\`\`
> Dùng \`=\` (assign), không \`:=\` (declare). Compiler thường catch được, nhưng nếu có scope lồng nhau thì khó hơn.

> 📝 **Tóm tắt mục 3**
>
> - Named return = đặt tên cho return value, biến tự khai báo zero-value.
> - \`return\` rỗng → tự trả các named đó.
> - Dùng cho: hàm ngắn, hoặc defer cần modify return value.
> - Không dùng cho: hàm dài (giảm tính đọc).

---

## 4. Variadic function — số tham số tuỳ ý

\`\`\`go
func sum(nums ...int) int {
    total := 0
    for _, n := range nums {
        total += n
    }
    return total
}

sum(1, 2, 3)        // nums = []int{1, 2, 3} -> 6
sum()               // nums = []int{}        -> 0 (không phải nil — empty slice)
sum(1, 2, 3, 4, 5)  // nums = []int{1..5}    -> 15
\`\`\`

\`...int\` ở cuối parameter list = variadic. Bên trong hàm, \`nums\` là **slice** \`[]int\`.

### 4.1 Spread khi gọi

Nếu đã có sẵn một slice, dùng \`...\` để spread:

\`\`\`go
nums := []int{1, 2, 3, 4}
sum(nums...)        // tương đương sum(1, 2, 3, 4) -> 10

// SAI: sum(nums)   // compile error: cannot use nums (type []int) as type int
\`\`\`

### 4.2 Ví dụ trong stdlib

- \`fmt.Println(a, b, c, d)\` — hàm bạn dùng cả ngày là variadic: \`func Println(a ...interface{})\`.
- \`append(s, x, y, z)\` — variadic ở tham số thứ 2 trở đi.
- \`append(s1, s2...)\` — spread một slice vào append.

### 4.3 Variadic phải là tham số CUỐI

\`\`\`go
func bad(a ...int, b string) {}     // compile error
func good(b string, a ...int) {}    // OK
\`\`\`

> 📝 **Tóm tắt mục 4**
>
> - \`...T\` ở cuối parameter list → variadic, bên trong là \`[]T\`.
> - Gọi: liệt kê các giá trị hoặc dùng \`slice...\` để spread.
> - Phải là tham số cuối cùng.

---

## 5. First-class function — hàm là value

Trong Go, hàm là **giá trị bậc một**: gán biến được, truyền argument được, trả về từ hàm khác được.

### 5.1 Gán hàm vào biến

\`\`\`go
var add func(int, int) int = func(a, b int) int { return a + b }

// hoặc gọn hơn với :=
mul := func(a, b int) int { return a * b }

add(2, 3)   // 5
mul(2, 3)   // 6
\`\`\`

Kiểu của biến \`add\` là \`func(int, int) int\` — đó là **function type**.

### 5.2 Truyền hàm làm argument (callback)

Pattern điển hình: \`sort.Slice\` nhận một hàm so sánh:

\`\`\`go
people := []string{"bob", "alice", "charlie"}
sort.Slice(people, func(i, j int) bool {
    return people[i] < people[j]
})
// people = [alice bob charlie]
\`\`\`

\`sort.Slice\` ký:
\`\`\`go
func Slice(x any, less func(i, j int) bool)
\`\`\`

\`less\` là tham số kiểu function — đó là **HOF (higher-order function)**.

Ví dụ stdlib khác:
- \`http.HandleFunc("/api", handler)\` — handler là \`func(w, r)\`.
- \`strings.Map(mapping, "hello")\` — \`mapping\` là \`func(rune) rune\`.

### 5.3 Trả về hàm từ hàm khác

\`\`\`go
func makeAdder(x int) func(int) int {
    return func(y int) int {
        return x + y
    }
}

add5 := makeAdder(5)
add5(3)    // 8
add5(10)   // 15
\`\`\`

\`makeAdder\` là factory: tạo ra một hàm mới với cấu hình \`x\`. Đây cũng là một ví dụ **closure** (xem mục 6).

> 📝 **Tóm tắt mục 5**
>
> - Hàm là value, có kiểu (\`func(args) returns\`).
> - Gán, truyền, trả về như int/string.
> - HOF = hàm nhận hoặc trả về hàm khác. \`sort.Slice\`, \`http.HandleFunc\` là ví dụ.

---

## 6. Closure — hàm "nhớ" biến ngoài scope

> 💡 **Trực giác — Closure là cái balo của hàm**
>
> Khi một hàm được tạo ra **bên trong** một hàm khác, nó "đeo theo" những biến của hàm cha. Cái "balo" đó gọi là **closure**. Sau khi hàm cha kết thúc, balo vẫn còn — biến trong đó vẫn sống đến khi hàm con không còn ai dùng nữa.

### 6.1 Ví dụ kinh điển: counter

\`\`\`go
func makeCounter() func() int {
    count := 0                      // <- biến trong scope của makeCounter
    return func() int {
        count++                     // <- closure capture count, modify trực tiếp
        return count
    }
}

c := makeCounter()
fmt.Println(c())   // 1
fmt.Println(c())   // 2
fmt.Println(c())   // 3
\`\`\`

\`makeCounter\` đã return, **nhưng \`count\` không bị giải phóng** — vì closure còn giữ reference. Go runtime sẽ giữ \`count\` sống trên heap đến khi \`c\` không còn referenced.

### 6.2 Reference, KHÔNG copy

Đây là điểm dễ gây nhầm:

\`\`\`go
x := 10
f := func() { fmt.Println(x) }
x = 20
f()    // in 20, KHÔNG phải 10
\`\`\`

Closure capture **biến** \`x\`, không phải **giá trị 10**. Khi gọi \`f\`, nó đọc \`x\` lúc đó — đã là 20.

### 6.3 Mỗi closure có balo riêng

\`\`\`go
c1 := makeCounter()
c2 := makeCounter()    // <- gọi makeCounter lần 2, tạo count mới riêng

c1()  // 1
c1()  // 2
c2()  // 1  <- c2 không thấy count của c1
c1()  // 3
\`\`\`

Mỗi lần gọi \`makeCounter\`, một \`count\` mới được cấp phát, một closure mới được tạo gắn với count đó.

### 6.4 Use case thực tế

**(a) Middleware HTTP** — bọc thêm logic quanh handler:

\`\`\`go
func loggingMiddleware(next http.HandlerFunc) http.HandlerFunc {
    return func(w http.ResponseWriter, r *http.Request) {
        start := time.Now()
        next(w, r)                                       // gọi handler gốc
        log.Printf("%s %s took %v", r.Method, r.URL, time.Since(start))
    }
}

http.HandleFunc("/api", loggingMiddleware(myHandler))
\`\`\`

Closure capture \`next\` — handler gốc — và \`start\` — thời điểm bắt đầu request.

**(b) Retry với exponential backoff**:

\`\`\`go
func makeRetrier(maxAttempts int) func(action func() error) error {
    return func(action func() error) error {
        delay := 100 * time.Millisecond
        for i := 0; i < maxAttempts; i++ {
            if err := action(); err == nil {
                return nil
            }
            time.Sleep(delay)
            delay *= 2                  // <- closure modify delay qua các lần gọi action
        }
        return errors.New("max attempts exceeded")
    }
}
\`\`\`

**(c) Memoization (cache kết quả)**:

\`\`\`go
func memoize(f func(int) int) func(int) int {
    cache := map[int]int{}
    return func(n int) int {
        if v, ok := cache[n]; ok {
            return v
        }
        v := f(n)
        cache[n] = v
        return v
    }
}

fastFib := memoize(fib)    // fib gốc chậm, fastFib cache lại
\`\`\`

### 6.5 Gotcha — closure trong loop

Lỗi cổ điển (đã từng trip up cả người dùng Go lâu năm):

\`\`\`go
funcs := []func(){}
for i := 0; i < 3; i++ {
    funcs = append(funcs, func() { fmt.Println(i) })
}
for _, f := range funcs {
    f()
}
// Trước Go 1.22: in 3, 3, 3 (tất cả closure share cùng biến i)
// Từ Go 1.22+:    in 0, 1, 2 (mỗi iteration có i riêng)
\`\`\`

> ⚠ **Lỗi thường gặp — closure share variable trong loop**
>
> Trước Go 1.22, biến loop được tái sử dụng giữa các iteration → tất cả closure capture cùng một \`i\`. Workaround: shadow biến trong loop body.
> \`\`\`go
> for i := 0; i < 3; i++ {
>     i := i                          // shadow — tạo i mới mỗi iteration
>     funcs = append(funcs, func() { fmt.Println(i) })
> }
> \`\`\`
> Từ Go 1.22+ behavior đã đúng theo trực giác. Nhưng code cũ vẫn còn nhiều, cần nhận biết.

> 🔁 **Dừng lại tự kiểm tra 6**
>
> Hãy đoán output:
> \`\`\`go
> x := 1
> f := func() { fmt.Println(x) }
> g := func() { x++ }
> f(); g(); g(); f()
> \`\`\`
> <details><summary>Đáp án</summary>
>
> \`1\` rồi \`3\`. Lần \`f()\` đầu: x = 1. \`g()\` chạy 2 lần: x = 3. \`f()\` cuối: x = 3. Cả \`f\` và \`g\` capture cùng biến \`x\`, không copy.
> </details>

> 📝 **Tóm tắt mục 6**
>
> - Closure = hàm + tham chiếu tới biến từ scope ngoài.
> - Capture là **reference**, không phải copy → modify được biến ngoài.
> - Mỗi lần gọi factory tạo một set biến mới.
> - Use case: middleware, retry, memoization, counter, callback có state.

---

## 7. \`defer\` — hoãn execution đến khi function return

\`\`\`go
func readConfig() {
    f, err := os.Open("config.json")
    if err != nil { return }
    defer f.Close()                    // <- f.Close() chạy KHI readConfig return,
                                       //    dù return từ đâu, error hay không

    // ... đọc f ...
    return                             // f.Close() chạy ngay trước khi thoát
}
\`\`\`

\`defer\` là một trong những feature đặc trưng nhất của Go. Trông đơn giản nhưng có vài rule cần thuộc.

### 7.1 Argument evaluate NGAY, body chạy SAU

\`\`\`go
func main() {
    i := 1
    defer fmt.Println(i)    // i được đọc NGAY tại đây (i=1), nhưng Println bị hoãn
    i = 2
    // hết hàm → defer chạy → in "1"
}
\`\`\`

Lý do: \`defer fmt.Println(i)\` đẩy lên defer stack một **call** đã có argument 1.

Nếu muốn capture giá trị mới nhất, dùng closure:

\`\`\`go
defer func() { fmt.Println(i) }()    // closure capture i, lúc chạy mới đọc → in "2"
\`\`\`

### 7.2 LIFO order — stack of defers

Multiple defer chạy theo thứ tự **ngược** (last in, first out):

\`\`\`go
func main() {
    defer fmt.Println("1")
    defer fmt.Println("2")
    defer fmt.Println("3")
    fmt.Println("main")
}
// output:
// main
// 3
// 2
// 1
\`\`\`

Walk-through:
1. \`defer Println("1")\` → stack: \`[1]\`
2. \`defer Println("2")\` → stack: \`[1, 2]\`
3. \`defer Println("3")\` → stack: \`[1, 2, 3]\`
4. \`fmt.Println("main")\` → in "main"
5. Hàm return → pop stack: in "3", "2", "1".

### 7.3 3 use case kinh điển

**(a) Close resource — file, network, scanner**:
\`\`\`go
f, err := os.Open(path)
if err != nil { return err }
defer f.Close()                     // tự đóng dù return ở đâu, panic ở đâu

scanner := bufio.NewScanner(f)
defer func() {
    if err := scanner.Err(); err != nil {
        log.Println("scan error:", err)
    }
}()
\`\`\`

**(b) Unlock mutex** — pattern cực phổ biến:
\`\`\`go
var mu sync.Mutex

func updateBalance(amt int) {
    mu.Lock()
    defer mu.Unlock()               // tự unlock dù return từ đâu

    // ... critical section ...
    if amt < 0 {
        return                       // unlock vẫn chạy → không deadlock
    }
    balance += amt
}
\`\`\`

Không dùng defer thì phải nhớ unlock ở **mọi** return path → dễ quên → deadlock.

**(c) Log entry/exit cho debug**:
\`\`\`go
func process(req *Request) {
    log.Printf("ENTER process %s", req.ID)
    defer log.Printf("EXIT process %s", req.ID)

    // ... logic ...
}
\`\`\`

### 7.4 Đặt defer NGAY SAU khi acquire resource

\`\`\`go
// Đúng
f, err := os.Open(path)
if err != nil { return err }
defer f.Close()                     // ngay sau check err

// Sai — nếu có code giữa Open và defer mà panic → leak FD
f, err := os.Open(path)
if err != nil { return err }
doSomething()                       // <- panic ở đây = leak
defer f.Close()
\`\`\`

> ⚠ **Lỗi thường gặp — defer trong loop dài**
>
> \`\`\`go
> for _, path := range paths {
>     f, _ := os.Open(path)
>     defer f.Close()              // SAI: defer tích lũy đến khi function return
>                                  //      → mở 10000 file = leak 10000 FD
> }
> \`\`\`
> Defer chỉ chạy khi **enclosing function** return, không phải khi vòng lặp xong. Fix: bọc thân loop thành hàm riêng (xem BT6) hoặc gọi \`f.Close()\` thủ công ở cuối iteration.

### 7.5 Defer có thể modify named return value

\`\`\`go
func divide(a, b int) (result int, err error) {
    defer func() {
        if r := recover(); r != nil {
            err = fmt.Errorf("panic: %v", r)        // <- defer ghi vào named err
        }
    }()
    return a / b, nil
}

divide(10, 0)   // err = "panic: runtime error: integer divide by zero"
\`\`\`

Đây là cách Go panic-to-error: gói panic thành error qua defer + recover.

> 📝 **Tóm tắt mục 7**
>
> - \`defer\` hoãn call đến khi enclosing function return (bình thường hoặc panic).
> - Argument evaluate ngay, body chạy sau.
> - Multiple defer chạy LIFO.
> - Use cases: close resource, unlock mutex, log entry/exit, panic recovery.
> - Đặt \`defer\` **ngay sau** khi acquire resource. Tránh defer trong loop dài.

---

## 8. \`defer\` performance — small cost, nhưng có

Trước Go 1.13, defer có overhead khoảng 50ns/call (~10× function call thường). Từ Go 1.14, runtime tối ưu lại còn ~1-2ns cho most cases.

**Quy tắc thực tế**:
- ✅ Dùng defer thoải mái trong code thường, kể cả handler HTTP, business logic.
- ⚠ Cẩn thận trong **hot loop** chạy hàng triệu lần/giây (vd: serialize binary record). Nếu profile chỉ ra defer là bottleneck, viết lại bằng cách gọi cleanup thủ công.

Sẽ học sâu hơn về defer cost ở **L33 — Performance & Profiling**.

---

## 9. Recursion — hàm gọi chính nó

\`\`\`go
func factorial(n int) int {
    if n <= 1 {
        return 1                    // base case — bắt buộc có để không loop vô tận
    }
    return n * factorial(n-1)       // recursive case
}

factorial(5)   // 5 * 4 * 3 * 2 * 1 = 120
\`\`\`

Walk-through \`factorial(5)\`:
\`\`\`
factorial(5) = 5 * factorial(4)
             = 5 * 4 * factorial(3)
             = 5 * 4 * 3 * factorial(2)
             = 5 * 4 * 3 * 2 * factorial(1)
             = 5 * 4 * 3 * 2 * 1
             = 120
\`\`\`

Mỗi lần gọi đệ quy push 1 stack frame lên call stack. \`factorial(5)\` cần 5 frame; \`factorial(1000000)\` cần 1 triệu frame → **stack overflow**.

### 9.1 Go KHÔNG có tail-call optimization (TCO)

Một số ngôn ngữ (Scheme, Haskell, Scala) tối ưu hoá tail call: nếu recursive call là **lệnh cuối cùng**, compiler tái sử dụng frame thay vì push mới. Go **không làm** điều này — chính sách rõ ràng (tài liệu Go FAQ).

Hệ quả: với input lớn, Go **luôn** ưu tiên iterative version:

\`\`\`go
// Recursive — đẹp nhưng stack-bound
func sum(n int) int {
    if n == 0 { return 0 }
    return n + sum(n-1)
}

// Iterative — xấu hơn nhưng O(1) stack
func sum(n int) int {
    total := 0
    for i := 1; i <= n; i++ { total += i }
    return total
}
\`\`\`

### 9.2 Khi recursion vẫn phù hợp

- **Tree/graph traversal**: parse JSON tree, walk filesystem, DOM. Depth thực tế thường ≤ 50 → safe.
- **Divide & conquer**: merge sort, quick sort. Depth = log n → 30 cho n = 10⁹, hoàn toàn OK.
- **Problem định nghĩa tự nhiên dạng đệ quy**: factorial, Fibonacci dạy học, GCD.

Khi nào tránh:
- Iteration linh hoạt và hiệu suất tốt hơn (cộng dồn, lặp tuần tự).
- Khi input có thể lớn không kiểm soát (depth = O(n)).

### 9.3 Fibonacci — bài học về complexity

\`\`\`go
func fib(n int) int {
    if n < 2 { return n }
    return fib(n-1) + fib(n-2)
}
\`\`\`

Trông đẹp, nhưng \`fib(40)\` đã chậm vì gọi lại các subproblem trùng lặp (cây gọi exponential). Fix: iterative hoặc memoization.

\`\`\`go
func fibIter(n int) int {
    a, b := 0, 1
    for i := 0; i < n; i++ {
        a, b = b, a+b
    }
    return a
}
\`\`\`

\`fibIter(50)\` chạy tức thời; recursive \`fib(50)\` mất phút.

> 📝 **Tóm tắt mục 9**
>
> - Recursion = hàm gọi chính nó, phải có **base case**.
> - Go không TCO → depth lớn = stack overflow.
> - Dùng cho tree/graph/divide & conquer. Tránh cho lặp tuần tự với n lớn.

---

## 10. Anonymous function (IIFE-like)

Hàm **không tên**, dùng tại chỗ:

\`\`\`go
func() {
    fmt.Println("hi")
}()                                  // <- () ở cuối = call ngay
\`\`\`

Tương đương khái niệm IIFE (Immediately Invoked Function Expression) trong JavaScript.

### 10.1 Khi nào dùng

**(a) Scope nhỏ tạm thời** — tách logic phức tạp khỏi flow chính:
\`\`\`go
total := func() int {
    sum := 0
    for _, v := range values {
        if v.Valid() { sum += v.Amount }
    }
    return sum
}()
\`\`\`

**(b) defer cần multiple statement**:
\`\`\`go
defer func() {
    if r := recover(); r != nil {
        log.Println("recovered:", r)
        metrics.PanicCount.Inc()
    }
}()
\`\`\`

**(c) goroutine launch** (sẽ học ở L22):
\`\`\`go
go func() {
    for msg := range ch {
        process(msg)
    }
}()
\`\`\`

Đừng lạm dụng — nếu logic phức tạp/dài, nên tách thành hàm có tên để test được.

---

## 11. Function type & signature

Bạn có thể đặt **tên** cho một function signature thông qua \`type\`:

\`\`\`go
type Handler func(http.ResponseWriter, *http.Request)

func logRequest(h Handler) Handler {
    return func(w http.ResponseWriter, r *http.Request) {
        log.Println(r.Method, r.URL.Path)
        h(w, r)
    }
}
\`\`\`

Lợi ích:
- Đỡ phải lặp \`func(http.ResponseWriter, *http.Request)\` ở mọi nơi.
- Tài liệu hóa intent: \`Handler\` rõ nghĩa hơn \`func(ResponseWriter, *Request)\`.
- Có thể gắn **method** lên function type (sẽ học ở L15):

\`\`\`go
type StringMapper func(string) string

func (m StringMapper) Then(next StringMapper) StringMapper {
    return func(s string) string { return next(m(s)) }
}
\`\`\`

### 11.1 Strategy pattern bằng function type

\`\`\`go
type SortStrategy func([]int)

func bubbleSort(arr []int)  { /* ... */ }
func quickSort(arr []int)   { /* ... */ }

func sortData(data []int, strategy SortStrategy) {
    strategy(data)
}

sortData(arr, quickSort)
sortData(arr, bubbleSort)
\`\`\`

### 11.2 Ví dụ stdlib

- \`http.HandlerFunc\` — alias \`func(ResponseWriter, *Request)\`. Có method \`ServeHTTP\` để implement interface \`http.Handler\`.
- \`sort.SliceFunc\` (qua \`sort.Slice\`) — comparator.
- \`filepath.WalkFunc\` — \`func(path string, info fs.FileInfo, err error) error\`.

> 📝 **Tóm tắt mục 11**
>
> - \`type Name func(...)\` định nghĩa tên cho một function signature.
> - Dùng cho callback, strategy pattern, middleware.
> - Có thể gắn method lên function type.

---

## Bài tập

### BT1: Divmod với error handling

Viết hàm \`divmod(a, b int) (int, int, error)\`:
- Trả về thương và dư.
- Nếu \`b == 0\`, trả về \`(0, 0, error)\` với message rõ ràng.

Test: \`divmod(17, 5)\` → \`(3, 2, nil)\`. \`divmod(10, 0)\` → \`(0, 0, error)\`.

### BT2: Variadic max

Viết \`maxOf(nums ...int) (int, error)\`:
- Trả max của các số.
- Nếu không có argument nào (rỗng), trả error.

Test: \`maxOf(3, 1, 4, 1, 5, 9, 2, 6)\` → \`(9, nil)\`. \`maxOf()\` → \`(0, error)\`.

### BT3: Closure currying

Viết \`makeMultiplier(n int) func(int) int\`:
- Trả về một hàm nhân input với \`n\`.

Test:
\`\`\`go
double := makeMultiplier(2)
triple := makeMultiplier(3)
double(5)   // 10
triple(5)   // 15
double(7)   // 14
\`\`\`

### BT4: Defer LIFO trace

Predict output (không chạy code):
\`\`\`go
func main() {
    fmt.Println("start")
    defer fmt.Println("A")
    defer fmt.Println("B")
    for i := 0; i < 3; i++ {
        defer fmt.Println("loop", i)
    }
    fmt.Println("end")
}
\`\`\`

### BT5: HOF — Map generic

Dùng generics (sẽ học kỹ ở Tier 3 — đây là preview), viết:
\`\`\`go
func Map[T, U any](s []T, f func(T) U) []U
\`\`\`

Hàm áp dụng \`f\` lên từng phần tử của \`s\`, trả về slice mới.

Test:
\`\`\`go
nums := []int{1, 2, 3, 4}
doubled := Map(nums, func(x int) int { return x * 2 })
// doubled = [2 4 6 8]

words := []string{"hello", "world"}
lens := Map(words, func(s string) int { return len(s) })
// lens = [5 5]
\`\`\`

### BT6: Bug defer trong loop

Đoạn code dưới có bug. Tìm và fix:
\`\`\`go
func processFiles(paths []string) error {
    for _, path := range paths {
        f, err := os.Open(path)
        if err != nil { return err }
        defer f.Close()                  // <- bug ở đây

        // ... process f ...
    }
    return nil
}
\`\`\`

Khi \`paths\` có 10000 phần tử, code này có vấn đề gì? Fix thế nào?

---

## Lời giải chi tiết

### Lời giải BT1 — Divmod with error

\`\`\`go
import "errors"

func divmod(a, b int) (int, int, error) {
    if b == 0 {
        return 0, 0, errors.New("divmod: division by zero")
    }
    return a / b, a % b, nil
}
\`\`\`

**Cách dùng**:
\`\`\`go
q, r, err := divmod(17, 5)
if err != nil { log.Fatal(err) }
fmt.Println(q, r)   // 3 2

_, _, err = divmod(10, 0)
fmt.Println(err)    // divmod: division by zero
\`\`\`

**Tại sao return \`(0, 0, error)\` thay vì \`(undefined, undefined, error)\`?** Go bắt buộc khai báo TẤT CẢ return value, ngay cả khi có error. Convention: trả zero value cho các slot non-error khi có error.

**Độ phức tạp**: O(1).

### Lời giải BT2 — Variadic max

\`\`\`go
func maxOf(nums ...int) (int, error) {
    if len(nums) == 0 {
        return 0, errors.New("maxOf: empty input")
    }
    m := nums[0]
    for _, n := range nums[1:] {
        if n > m { m = n }
    }
    return m, nil
}
\`\`\`

**Test**:
\`\`\`go
m, _ := maxOf(3, 1, 4, 1, 5, 9, 2, 6)
fmt.Println(m)   // 9

_, err := maxOf()
fmt.Println(err) // maxOf: empty input
\`\`\`

**Tại sao bắt đầu với \`nums[0]\` thay vì \`math.MinInt\`?** Hai lý do: (1) tránh import math chỉ vì hằng số; (2) \`nums[1:]\` cho phép skip pass đầu tiên — micro-optimization, không quan trọng nhưng pattern phổ biến.

**Độ phức tạp**: O(n) một pass.

### Lời giải BT3 — Currying multiplier

\`\`\`go
func makeMultiplier(n int) func(int) int {
    return func(x int) int {
        return n * x       // closure capture n
    }
}
\`\`\`

**Walk-through**:
\`\`\`go
double := makeMultiplier(2)  // closure tạo ra với n=2
triple := makeMultiplier(3)  // closure tạo ra với n=3 (n riêng)

double(5)   // gọi inner func: return 2 * 5 = 10
triple(5)   // gọi inner func: return 3 * 5 = 15
double(7)   // n vẫn là 2 cho closure double: return 2 * 7 = 14
\`\`\`

Mỗi lần gọi \`makeMultiplier\`, một biến \`n\` mới được cấp phát → closures độc lập.

### Lời giải BT4 — Defer LIFO trace

Output:
\`\`\`
start
end
loop 2
loop 1
loop 0
B
A
\`\`\`

Walk-through:
1. \`fmt.Println("start")\` → in \`start\`.
2. \`defer Println("A")\` → stack: \`[A]\`.
3. \`defer Println("B")\` → stack: \`[A, B]\`.
4. Loop \`i = 0\`: \`defer Println("loop", 0)\` → stack: \`[A, B, loop 0]\`. (Argument \`0\` đã được evaluate ngay tại defer.)
5. \`i = 1\`: stack: \`[A, B, loop 0, loop 1]\`.
6. \`i = 2\`: stack: \`[A, B, loop 0, loop 1, loop 2]\`.
7. \`fmt.Println("end")\` → in \`end\`.
8. Hàm return → pop LIFO: \`loop 2\`, \`loop 1\`, \`loop 0\`, \`B\`, \`A\`.

**Bài học**: argument được "đóng băng" tại lúc defer được register, không phải lúc chạy. Nếu defer là \`defer fmt.Println("loop", &i)\` thì sẽ in cùng giá trị \`i = 3\`.

### Lời giải BT5 — Map generic

\`\`\`go
func Map[T, U any](s []T, f func(T) U) []U {
    result := make([]U, len(s))           // pre-allocate đúng capacity
    for i, v := range s {
        result[i] = f(v)
    }
    return result
}
\`\`\`

**Giải thích generics**:
- \`[T, U any]\` — 2 type parameter, mỗi cái có constraint \`any\` (= \`interface{}\`, nhận mọi kiểu).
- \`s []T\` — slice các phần tử kiểu T.
- \`f func(T) U\` — hàm nhận T trả U.
- Trả về \`[]U\` — slice kiểu mới.

**Test**:
\`\`\`go
nums := []int{1, 2, 3, 4}
doubled := Map(nums, func(x int) int { return x * 2 })
// T=int, U=int suy từ context

words := []string{"hello", "world"}
lens := Map(words, func(s string) int { return len(s) })
// T=string, U=int
\`\`\`

**Độ phức tạp**: O(n).

**Lưu ý**: \`make([]U, len(s))\` tốt hơn \`var result []U\` rồi \`append\` — biết trước size, tránh re-alloc.

### Lời giải BT6 — Defer trong loop

**Bug**: \`defer f.Close()\` không chạy khi mỗi vòng kết thúc — defer chạy khi **enclosing function** (\`processFiles\`) return. Nếu \`paths\` có 10000 phần tử, code mở 10000 file và giữ tất cả handle đến khi hàm kết thúc → **leak file descriptor (FD)**, dễ chạm limit hệ thống (\`ulimit -n\`, mặc định Linux thường 1024).

**Fix 1 — Tách thân loop thành hàm riêng**:
\`\`\`go
func processFiles(paths []string) error {
    for _, path := range paths {
        if err := processOne(path); err != nil {
            return err
        }
    }
    return nil
}

func processOne(path string) error {
    f, err := os.Open(path)
    if err != nil { return err }
    defer f.Close()                       // OK: chạy khi processOne return
    // ... process f ...
    return nil
}
\`\`\`

**Fix 2 — Đóng thủ công ở cuối iteration**:
\`\`\`go
func processFiles(paths []string) error {
    for _, path := range paths {
        f, err := os.Open(path)
        if err != nil { return err }

        // ... process f ...

        if err := f.Close(); err != nil {
            return err
        }
    }
    return nil
}
\`\`\`

**Fix 1 thường tốt hơn** vì:
- Đảm bảo close chạy ngay cả khi \`process f\` panic.
- Code rõ ràng hơn: scope của file = scope của hàm.

---

## Code & Minh họa

- [solutions.go](./solutions.go) — toàn bộ lời giải bài tập + một số demo (defer LIFO, closure counter, file handling).
- [visualization.html](./visualization.html) — 3 module tương tác:
  1. **Function call tracer**: visualize recursion (factorial) push/pop stack frame.
  2. **Closure inspector**: xem \`count\` được share giữa các invocation, so sánh với non-closure.
  3. **Defer stack**: code có 3-5 defer, animate LIFO khi return.

Chạy \`solutions.go\`:
\`\`\`bash
cd Programming/lesson-11-functions
go run solutions.go
\`\`\`

---

## Bài tiếp theo

- [L12 — Array & Slice](../lesson-12-arrays-slices/README.md): tiếp tục với cấu trúc dữ liệu tuyến tính, hiểu \`len\`/\`cap\`/\`append\`, slice tricks.
- Liên kết với các lesson sau:
  - L18 — Interface: sẽ thấy \`http.Handler\` vs \`http.HandlerFunc\` — function-type-implements-interface.
  - L20 — Error: error chính là một interface, error wrapping dựa nhiều vào pattern \`(result, error)\`.
  - L22 — Goroutine: \`go f()\` cũng dùng anonymous function rất nhiều.
  - L33 — Performance: định lượng cost của defer, escape analysis cho closure.
`;
