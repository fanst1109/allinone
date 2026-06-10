# Lesson 24 — Regex & Text Processing trong Go

> **Tier 2 — Go Intermediate · Lesson 24**
> Tiền đề: [Lesson 14 — Strings, Runes, UTF-8](../lesson-14-strings-runes-utf8/), [Lesson 23 — JSON Encoding](../lesson-23-json-encoding/).
> Tiếp theo: [Lesson 25 — Time & Date](../lesson-25-time-date/).

## Mục tiêu học tập

Sau bài này bạn có thể:

- Giải thích **vì sao cần regex** và khi nào KHÔNG nên dùng regex (so với `strings.Contains`/parser viết tay).
- Viết và compile pattern với package `regexp` của Go, hiểu sự khác biệt giữa `Compile` và `MustCompile`.
- Dùng các nhóm method **Find / Replace / Split / Match** đúng cho từng tình huống.
- Đọc và viết được các pattern thực tế: validate email/phone/date, extract URL, parse log line, split CSV đơn giản.
- Hiểu **giới hạn của RE2** (engine Go dùng): không backreference, không lookahead/lookbehind — và **vì sao Go cố tình bỏ** (linear time, không catastrophic backtracking).
- Biết các pitfall phổ biến: quên anchor `^`/`$`, quên escape `.`, greedy quá tay.

> 💡 **Tip đọc nhanh**: nếu đã quen regex từ ngôn ngữ khác, mục **2** (RE2) và **13** (lookahead) là chỗ Go khác nhất. Còn lại 90% giống nhau.

---

## 1. Vì sao cần regex

### 1.1 Một pattern, nhiều input

Mỗi ngày bạn gặp những bài toán dạng *"trong đống text này, tìm tất cả những thứ trông như X"*:

- **Validate** input form: số điện thoại có 10 chữ số bắt đầu 0 không? Email có `@` và domain không?
- **Extract** dữ liệu: tìm tất cả URL trong một bài blog; lấy timestamp từ log line.
- **Replace**: thay `{{name}}` trong template bằng giá trị thật; redact (che) số thẻ tín dụng `1234-5678-...` trong log.
- **Tokenize / split**: tách CSV, tách câu thành từ, tách query string `?a=1&b=2`.

Nếu viết bằng `strings.Index`/`strings.Split` tay, mỗi bài toán trên cần một loop riêng + state machine riêng. **Regex là ngôn ngữ con để mô tả "X trông như thế nào"**, runtime tự sinh ra state machine cho bạn.

### 1.2 Ví dụ cụ thể — validate VN phone

Yêu cầu: số điện thoại VN hợp lệ là `0xxxxxxxxx` (10 chữ số, bắt đầu 0) hoặc `+84xxxxxxxxx` (12 ký tự, bắt đầu `+84`).

**Không dùng regex** (Go thuần):

```go
func validVNPhone(s string) bool {
    if strings.HasPrefix(s, "+84") {
        s = s[3:]
    } else if strings.HasPrefix(s, "0") {
        s = s[1:]
    } else {
        return false
    }
    if len(s) != 9 {
        return false
    }
    for _, r := range s {
        if r < '0' || r > '9' {
            return false
        }
    }
    return true
}
```

**Dùng regex**:

```go
var phoneRe = regexp.MustCompile(`^(\+84|0)[0-9]{9}$`)

func validVNPhone(s string) bool { return phoneRe.MatchString(s) }
```

Cùng output, code regex ngắn hơn 10 lần, **declarative** (mô tả "trông như gì" thay vì "kiểm tra như nào").

### 1.3 Khi nào KHÔNG nên dùng regex

Regex không phải búa vạn năng. Đừng dùng khi:

- **Match cố định một chuỗi**: `strings.Contains(s, "error")` nhanh hơn `regexp.MatchString("error", s)` (regex tốn compile + tạo state machine cho việc tầm thường).
- **Parse cấu trúc lồng nhau**: JSON, HTML, XML, mã nguồn — regex KHÔNG đủ sức (chính thức: regex không match được balanced parentheses). Dùng parser thật sự (`encoding/json`, `golang.org/x/net/html`, `go/parser`).
- **Trích xuất nhiều field từ một string format cố định**: nhiều khi `fmt.Sscanf` hoặc `strings.Split` rõ ràng và nhanh hơn.

> ⚠ **Lỗi nổi tiếng**: cố parse HTML bằng regex. Stack Overflow có cả một [meme câu trả lời điên rồ](https://stackoverflow.com/a/1732454) vì HTML không phải regular language — không regex nào parse đúng được mọi HTML.

> 📝 **Tóm tắt mục 1**:
> - Regex tốt cho: validate format, extract pattern, replace nhiều, split phức tạp.
> - Regex tệ cho: cấu trúc lồng nhau, match literal đơn giản.
> - Code regex ngắn, declarative — nhưng phải compile 1 lần, reuse.

---

## 2. Package `regexp` và RE2 engine

### 2.1 Go dùng RE2, không phải PCRE

Hầu hết ngôn ngữ (Python, Perl, JavaScript, Java, PHP) dùng **PCRE** (Perl-Compatible Regular Expressions) hoặc biến thể của nó. Go dùng **RE2** — engine do Google viết.

Khác biệt cốt lõi:

| Tính năng | PCRE | RE2 (Go) |
|-----------|------|----------|
| Backreference `\1`, `\2` | Có | **Không** |
| Lookahead `(?=...)`, `(?!...)` | Có | **Không** |
| Lookbehind `(?<=...)`, `(?<!...)` | Có | **Không** |
| Worst-case time | Có thể **exponential** | **Luôn linear** $O(m \cdot n)$ |
| Worst-case memory | Lớn | Bị giới hạn |

> 💡 **Trực giác**: PCRE mạnh hơn (làm được nhiều hơn) nhưng có thể **rất chậm** với một số pattern + input độc. RE2 yếu hơn (bỏ vài tính năng) nhưng **bảo đảm linear time** — không bao giờ "treo" service vì regex.

### 2.2 Catastrophic backtracking — vấn đề RE2 né

Pattern PCRE kinh điển gây "treo":

```
^(a+)+$
```

Với input `aaaaaaaaaaX` (10 chữ `a` rồi `X`), PCRE phải thử **mọi cách** chia 10 chữ `a` thành các nhóm `a+` (Catalan number, 2^n cách) trước khi kết luận không match vì có `X` cuối. → **2 mũ n** bước. Input 30 chữ `a` đủ làm engine chạy vài phút.

Go RE2 chạy pattern này trong vài µs vì engine biết hai `+` lồng nhau là tương đương `a+` và compile thành automaton xác định.

> ❓ **Vì sao quan trọng trong production?**
> Vì input của user là untrusted. Nếu app web nhận regex từ user (rare) hoặc match regex internal lên text user (common, vd log), một input độc có thể làm CPU 100%. Đây là **ReDoS** (Regex Denial of Service). Go RE2 miễn nhiễm.

### 2.3 Cái giá phải trả

Không backreference → không viết được "match một chuỗi và lặp lại chính nó":

- PCRE: `(\w+) \1` match `hello hello`.
- RE2: viết thẳng `hello hello` được, nhưng không thể bắt "bất kỳ word nào lặp lại".

Không lookahead → không viết được "match X nhưng không theo sau bởi Y":

- PCRE: `foo(?!bar)` match `foo` không theo sau `bar`.
- RE2: phải chia thành 2 lần Find rồi filter trong Go code.

Trong thực tế, **99% pattern không cần** hai tính năng này. Tradeoff đúng đắn.

> 📝 **Tóm tắt mục 2**:
> - Go dùng RE2 → luôn linear time, miễn nhiễm ReDoS.
> - Không có backreference, không có lookahead/lookbehind.
> - Bù lại: an toàn cho production, không "treo" vì input độc.

---

## 3. Compile và các phương thức cơ bản

### 3.1 `Compile` vs `MustCompile`

Hai cách tạo `*regexp.Regexp`:

```go
// 1. Compile — trả error nếu pattern sai
re, err := regexp.Compile(`^\d+$`)
if err != nil {
    log.Fatal(err)
}

// 2. MustCompile — panic nếu pattern sai. Dùng cho package-level var.
var re = regexp.MustCompile(`^\d+$`)
```

**Quy tắc dùng**:

- Pattern là **constant trong code** (literal string) → `MustCompile`. Pattern sai là bug của lập trình viên, phát hiện ngay lúc start app (panic) tốt hơn ngầm trả err lúc chạy.
- Pattern đến từ **user input / config file** → `Compile` + xử lý error.

### 3.2 Ba method "kiểm tra có match không"

```go
re := regexp.MustCompile(`\d+`)

re.MatchString("abc123")       // true  — có chứa pattern
re.MatchString("abc")          // false — không có chữ số
re.FindString("abc123def456")  // "123" — match đầu tiên
re.FindAllString("abc123def456", -1) // ["123", "456"] — tất cả
re.FindAllString("abc123def456", 1)  // ["123"] — tối đa 1
```

- `MatchString` → `bool`, kiểm tra **có** match không (chỉ cần substring match, không cần toàn chuỗi).
- `FindString` → `string`, trả match đầu tiên hoặc `""` nếu không có.
- `FindAllString(s, n)` → `[]string`, trả tối đa `n` match. `n = -1` = không giới hạn.

### 3.3 Ví dụ: đếm số digit run trong text

```go
re := regexp.MustCompile(`\d+`)
nums := re.FindAllString("Order #123 has 4 items, paid 99 USD", -1)
// nums == ["123", "4", "99"]
fmt.Println(len(nums)) // 3
```

> ⚠ **Pitfall**: nhầm `MatchString` với strict match. `MatchString("\d+", "abc123")` trả `true` vì có CHỨA digit. Muốn cả chuỗi là digit thuần, dùng anchor: `^\d+$`.

> 📝 **Tóm tắt mục 3**:
> - `MustCompile` cho regex hardcode, `Compile` cho regex động.
> - `MatchString` = có chứa pattern không.
> - `FindAllString(s, -1)` = tất cả match.

---

## 4. Character class

### 4.1 Class tự định nghĩa

```
[abc]    → một trong a, b, hoặc c
[a-z]    → một chữ thường
[A-Z]    → một chữ HOA
[0-9]    → một chữ số
[a-zA-Z] → một chữ cái
[^0-9]   → KHÔNG phải chữ số (^ đầu class = phủ định)
[abc-]   → a, b, c, hoặc dấu - (đặt - cuối để không bị hiểu là range)
```

### 4.2 Class định nghĩa sẵn

| Class | Tương đương | Ý nghĩa |
|-------|-------------|---------|
| `\d`  | `[0-9]`     | Digit |
| `\D`  | `[^0-9]`    | Không phải digit |
| `\w`  | `[0-9A-Za-z_]` | Word char (alphanumeric + underscore) |
| `\W`  | `[^0-9A-Za-z_]` | Không phải word char |
| `\s`  | `[ \t\n\r\f\v]` | Whitespace |
| `\S`  | `[^ \t\n\r\f\v]` | Không phải whitespace |
| `.`   | bất kỳ ký tự trừ `\n` | Mặc định không match newline |

### 4.3 Raw string trong Go

Vì Go string literal cũng dùng `\` cho escape (`\n`, `\t`), nếu viết regex `"\d+"` thì Go báo lỗi (vì `\d` không phải Go escape). Phải viết một trong hai cách:

```go
"\\d+"   // string literal: \\ → \, kết quả regex là \d+
`\d+`    // raw string (backtick): \ giữ nguyên, regex là \d+
```

**Quy ước**: trong code Go, **luôn dùng raw string với backtick `` ` ``** cho regex. Dễ đọc, không cần escape `\` hai lần.

### 4.4 Ví dụ

```go
// Một từ tiếng Anh: ≥1 word char
re := regexp.MustCompile(`\w+`)
re.FindAllString("hello world 123", -1) // ["hello", "world", "123"]

// Không phải whitespace, lặp lại
re2 := regexp.MustCompile(`\S+`)
re2.FindAllString("  a  b  c", -1) // ["a", "b", "c"]
```

> 💡 **Lưu ý Unicode**: `\w` trong RE2 mặc định chỉ ASCII (`[A-Za-z0-9_]`). Nếu muốn match cả chữ tiếng Việt có dấu, dùng `\p{L}` (Unicode letter) hoặc class tự viết. Vd `[\p{L}0-9_]+` match `tiếng_việt_123`.

> 📝 **Tóm tắt mục 4**:
> - `[...]` = một ký tự trong class. `[^...]` = phủ định.
> - `\d \w \s` tiện nhưng nhớ là ASCII-only.
> - **Luôn dùng raw string** `` `...` `` cho regex trong Go.

---

## 5. Quantifier

### 5.1 Bảng quantifier

| Quantifier | Số lần lặp | Ví dụ |
|------------|-----------|-------|
| `?` | 0 hoặc 1 | `colou?r` match `color` và `colour` |
| `*` | 0 trở lên | `\d*` match `""`, `"7"`, `"123"` |
| `+` | 1 trở lên | `\d+` match `"7"`, `"123"`, KHÔNG match `""` |
| `{n}` | đúng n | `\d{4}` match `"2024"` |
| `{n,}` | ít nhất n | `\d{2,}` match `"12"`, `"123"`, ... |
| `{n,m}` | n đến m | `\d{2,4}` match `"12"`, `"123"`, `"1234"` |

### 5.2 Greedy vs Lazy

Quantifier mặc định **greedy** — match nhiều nhất có thể.

```go
re := regexp.MustCompile(`<.+>`)
re.FindString("<b>hello</b>") // "<b>hello</b>" — lấy hết
```

`<.+>` greedy → match từ `<` đầu tiên đến `>` cuối cùng, "ngoạm" cả nội dung giữa.

Thêm `?` vào quantifier để biến thành **lazy** (non-greedy) — match ít nhất có thể.

```go
re := regexp.MustCompile(`<.+?>`)
re.FindString("<b>hello</b>") // "<b>"
re.FindAllString("<b>hello</b>", -1) // ["<b>", "</b>"]
```

`<.+?>` lazy → match `<b>` rồi dừng vì đó là tag đầu tiên đóng được.

### 5.3 Khi nào cần lazy

- Extract nhiều "đoạn nhỏ" giữa dấu phân cách (như HTML tag, JSON string).
- Bất cứ khi nào `.+` "ngoạm" quá nhiều.

> ⚠ **Pitfall điển hình**: dùng `.*` để match "phần giữa" mà quên đặt `?` → match nuốt cả string sau đó.

```go
// Sai: muốn lấy chữ trong ngoặc
re := regexp.MustCompile(`\((.+)\)`)
re.FindStringSubmatch("(foo) and (bar)")
// match: "(foo) and (bar)", submatch 1: "foo) and (bar"  ← greedy nuốt hết

// Đúng:
re := regexp.MustCompile(`\((.+?)\)`)
re.FindAllStringSubmatch("(foo) and (bar)", -1)
// [[(foo) foo] [(bar) bar]]
```

### 5.4 Verify bằng số

Pattern `\d{2,4}` match `12`, `123`, `1234`:

| Input | Match? | Giải thích |
|-------|:------:|------------|
| `"1"` | ❌ | dưới 2 chữ |
| `"12"` | ✅ | đúng 2 |
| `"123"` | ✅ | 3 chữ, trong khoảng |
| `"1234"` | ✅ | đúng 4 |
| `"12345"` | ✅ (substring) / ❌ với anchor | greedy lấy 4 đầu nếu không có anchor |

> 📝 **Tóm tắt mục 5**:
> - `?` (0-1), `*` (≥0), `+` (≥1), `{n,m}` (cụ thể).
> - Greedy mặc định. Thêm `?` sau quantifier để lazy.
> - Lazy quan trọng khi extract nhiều đoạn ngắn trong cùng chuỗi.

---

## 6. Anchor

Anchor không match ký tự — chúng match **vị trí**.

| Anchor | Match vị trí | Ví dụ |
|--------|--------------|-------|
| `^` | Đầu string (hoặc đầu line với `(?m)`) | `^abc` |
| `$` | Cuối string (hoặc cuối line với `(?m)`) | `xyz$` |
| `\b` | Word boundary (chỗ chuyển giữa `\w` và `\W`) | `\bcat\b` |
| `\B` | Không phải word boundary | `\Bcat\B` |

### 6.1 Vì sao cần anchor — ví dụ kinh điển

```go
// Mục đích: input phải LÀ chuỗi số thuần.
re := regexp.MustCompile(`\d+`)
re.MatchString("abc123") // true  ← BUG, ta không muốn match
re.MatchString("123")    // true

// Đúng: thêm anchor
re := regexp.MustCompile(`^\d+$`)
re.MatchString("abc123") // false  ✓
re.MatchString("123")    // true   ✓
```

> ⚠ **Đây là lỗi #1 khi dùng regex để validate**. Luôn nhớ: `MatchString` chỉ cần có CHỨA pattern. Muốn match toàn chuỗi → bọc bằng `^...$`.

### 6.2 `\b` — word boundary

`\b` rất hữu ích khi tìm từ cố định mà không muốn match nhầm trong từ dài hơn:

```go
re := regexp.MustCompile(`\bcat\b`)
re.MatchString("a cat")     // true  ← " " và "c" là boundary
re.MatchString("category")  // false ← "c" trong "category" không có \b trước "cat"
re.MatchString("scatter")   // false
```

Verify: trong `"category"`, vị trí trước `c` là đầu string (boundary), nhưng vị trí sau `t` của `cat` là giữa hai word char (`t` và `e`) → KHÔNG phải boundary → không match.

### 6.3 Flag `(?m)` — multiline

Mặc định `^`/`$` là đầu/cuối **toàn string**. Với input nhiều dòng, muốn `^`/`$` match đầu/cuối mỗi **dòng**, thêm flag `(?m)`:

```go
text := "line1\nline2\nline3"

re := regexp.MustCompile(`^line\d$`)
re.FindAllString(text, -1) // []  ← không match vì cả string không phải "line1"

re := regexp.MustCompile(`(?m)^line\d$`)
re.FindAllString(text, -1) // ["line1", "line2", "line3"]
```

> 📝 **Tóm tắt mục 6**:
> - `^`/`$` mặc định = đầu/cuối toàn chuỗi.
> - Quên anchor là pitfall #1 khi validate.
> - `\b` cho từ độc lập. `(?m)` cho match từng dòng.

---

## 7. Group (nhóm)

### 7.1 Ba loại group

```
(abc)        ← capture group, lấy giá trị ra được
(?:abc)      ← non-capture group, chỉ để gộp, không "bắt"
(?P<n>abc)   ← named capture group, truy cập bằng tên
```

### 7.2 Capture — lấy phần khớp

```go
re := regexp.MustCompile(`(\d+)-(\d+)`)
m := re.FindStringSubmatch("range: 10-20, then 30-40")
// m[0] = "10-20"   ← toàn bộ match
// m[1] = "10"      ← group 1
// m[2] = "20"      ← group 2
```

`FindStringSubmatch` trả `[]string`: phần tử 0 là toàn bộ match, phần tử 1+ là các capture group theo thứ tự.

### 7.3 Non-capture — gộp nhưng không lấy

Khi bạn cần gộp để áp dụng quantifier nhưng KHÔNG cần lấy giá trị:

```go
// Match "ha" hoặc "haha" hoặc "hahaha" ...
re := regexp.MustCompile(`(?:ha)+`)
re.FindString("ahahaha!")  // "hahaha"
```

Dùng `(?:...)` thay vì `(...)` khi không cần capture → tiết kiệm bộ nhớ + không làm index của các group khác lệch.

### 7.4 Named capture — đặt tên

Khi pattern có nhiều group, đếm index dễ sai. Đặt tên rõ ràng:

```go
re := regexp.MustCompile(`(?P<year>\d{4})-(?P<month>\d{2})-(?P<day>\d{2})`)
m := re.FindStringSubmatch("Today: 2024-03-15")

yIdx := re.SubexpIndex("year")
mIdx := re.SubexpIndex("month")
dIdx := re.SubexpIndex("day")
fmt.Println(m[yIdx], m[mIdx], m[dIdx]) // 2024 03 15
```

Hoặc dùng `SubexpNames()` để duyệt:

```go
for i, name := range re.SubexpNames() {
    if name != "" && i < len(m) {
        fmt.Printf("%s = %s\n", name, m[i])
    }
}
```

> 💡 **Mẹo**: Named group đặc biệt giá trị khi pattern dài (≥3 group) hoặc khi bạn đọc lại code sau 6 tháng. `m[1]` là cái gì? `m[year]` thì rõ.

> 📝 **Tóm tắt mục 7**:
> - `(...)` capture, `(?:...)` chỉ gộp, `(?P<name>...)` đặt tên.
> - Dùng `FindStringSubmatch` để lấy giá trị các group.
> - Named group → code dễ đọc hơn.

---

## 8. Alternation (lựa chọn)

`|` = "hoặc". Match một trong các nhánh:

```go
re := regexp.MustCompile(`cat|dog|fish`)
re.FindAllString("I have a cat and a dog", -1) // ["cat", "dog"]
```

Kết hợp với group khi chỉ muốn alternation áp dụng một phần:

```go
// Match "Mr." hoặc "Ms." hoặc "Mrs."
re := regexp.MustCompile(`M(?:r|s|rs)\.`)
re.FindAllString("Mr. Smith and Mrs. Doe", -1) // ["Mr.", "Mrs."]
```

> ⚠ **Pitfall**: alternation **không có** anchor implicit. `cat|dog$` = "cat ở bất kỳ đâu" HOẶC "dog ở cuối". Nếu muốn cả hai cùng anchor: `^(cat|dog)$`.

---

## 9. Flags

Flags được đặt **đầu pattern** bằng cú pháp `(?abc)`:

| Flag | Ý nghĩa |
|------|---------|
| `(?i)` | Case-insensitive |
| `(?m)` | Multiline — `^`/`$` match đầu/cuối line |
| `(?s)` | Dotall — `.` match cả `\n` |
| `(?U)` | Đảo greedy: `*` thành lazy mặc định, `*?` thành greedy |

### 9.1 Ví dụ

```go
// Match "go" không phân biệt hoa thường
re := regexp.MustCompile(`(?i)go`)
re.FindAllString("Go GoLang gopher GO", -1) // ["Go", "Go", "go", "GO"]

// `.` match cả newline
text := "line1\nline2"
regexp.MustCompile(`line.+`).FindString(text)     // "line1"     ← . không match \n
regexp.MustCompile(`(?s)line.+`).FindString(text) // "line1\nline2" ← . match \n
```

### 9.2 Áp dụng flag cho 1 phần

Đặt flag trong group để chỉ áp dụng cục bộ:

```go
re := regexp.MustCompile(`Go (?i:lang)`)
re.FindAllString("Go lang Go LANG go lang", -1)
// ["Go lang", "Go LANG"]  ← "Go" phải case đúng, "lang" thì không
// "go lang" không match vì "Go" có G hoa
```

> 📝 **Tóm tắt mục 9**:
> - `(?i)` insensitive, `(?m)` multiline, `(?s)` dotall.
> - Đặt đầu pattern (áp dụng toàn bộ) hoặc trong group `(?i:...)` (cục bộ).

---

## 10. Methods chính — bảng tổng hợp

Package `regexp` có nhiều method, dễ rối. Tóm tắt:

### 10.1 Họ Find

| Method | Trả về | Mục đích |
|--------|--------|----------|
| `FindString(s)` | `string` | Match đầu tiên |
| `FindStringIndex(s)` | `[]int{start, end}` | Vị trí match đầu tiên |
| `FindStringSubmatch(s)` | `[]string` | Match đầu tiên + các capture group |
| `FindStringSubmatchIndex(s)` | `[]int` | Vị trí của toàn match + từng group |
| `FindAllString(s, n)` | `[]string` | Tất cả match (tối đa n; -1 = không giới hạn) |
| `FindAllStringSubmatch(s, n)` | `[][]string` | Tất cả match + group cho mỗi cái |

Mẹo nhớ: **`All` = nhiều, `Submatch` = có group, `Index` = vị trí thay vì giá trị**.

### 10.2 Họ Replace

```go
re := regexp.MustCompile(`\d+`)

// Replace cố định
re.ReplaceAllString("a1b22c333", "X")
// "aXbXcX"

// Replace qua hàm — toàn quyền xử lý mỗi match
re.ReplaceAllStringFunc("a1b22c333", func(m string) string {
    return fmt.Sprintf("[%d]", len(m))
})
// "a[1]b[2]c[3]"

// Replace dùng giá trị capture group bằng $1, $2 hoặc ${name}
re := regexp.MustCompile(`(\w+)\s+(\w+)`)
re.ReplaceAllString("hello world", "$2 $1")
// "world hello"
```

> ⚠ Trong replacement string, `$1` đề cập tới group 1. Để in literal `$1`, escape: `$$1`. Đây là cú pháp khác với capture trong pattern.

### 10.3 Split

```go
re := regexp.MustCompile(`\s+`)
re.Split("hello   world  foo", -1) // ["hello", "world", "foo"]
```

Split theo regex mạnh hơn `strings.Split` vì dấu phân cách có thể là pattern (nhiều space, dấu chấm câu, ...).

### 10.4 Index variant — khi cần biết vị trí

```go
re := regexp.MustCompile(`\d+`)
re.FindStringIndex("abc123def") // [3, 6]  ← match "123" tại index [3,6)
```

Dùng index khi bạn cần "thay tại chỗ" với offset, hoặc lấy phần context xung quanh match.

> 📝 **Tóm tắt mục 10**:
> - `Find` = lấy match. `Replace` = thay. `Split` = tách.
> - Bốn trục: `All`/single, `Submatch`/no, `Index`/value, `String`/`[]byte`.
> - `ReplaceAllStringFunc` là vũ khí mạnh nhất: tự code logic cho mỗi match.

---

## 11. Pattern thực tế

### 11.1 Email (basic)

```
^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$
```

Phân tích:

- `^` đầu chuỗi
- `[a-zA-Z0-9._%+-]+` local part (≥1 char, gồm chữ/số/`.`/`_`/`%`/`+`/`-`)
- `@` ký tự `@`
- `[a-zA-Z0-9.-]+` domain part (chữ/số/`.`/`-`)
- `\.` dấu chấm literal (escape vì `.` mặc định = any char)
- `[a-zA-Z]{2,}` TLD ≥2 chữ
- `$` cuối chuỗi

> ⚠ **Lưu ý**: email RFC 5322 thật sự **phức tạp khủng khiếp** (quoted local part, IP literal, comment). Pattern trên đủ cho 99% input thực tế. Đừng cố viết regex "đúng RFC 100%" — đã có người thử, dài 6300 ký tự.

Verify:

| Input | Match |
|-------|:-----:|
| `user@example.com` | ✅ |
| `a.b+tag@sub.example.co.uk` | ✅ |
| `noAt.com` | ❌ thiếu `@` |
| `user@` | ❌ thiếu domain |
| `user@x.c` | ❌ TLD chỉ 1 chữ |

### 11.2 VN phone

```
^(\+84|0)[0-9]{9}$
```

- `^` đầu
- `(\+84|0)` `+84` hoặc `0`
- `[0-9]{9}` 9 chữ số tiếp theo
- `$` cuối

Verify: `0901234567` ✅ (`0` + 9 số), `+84901234567` ✅ (`+84` + 9 số), `0123` ❌ (chỉ 4 số), `1234567890` ❌ (không bắt đầu 0 hoặc +84).

> 💡 **Lưu ý**: pattern này chấp nhận đầu `0` rồi 9 số → tổng 10 chữ. Một số nhà mạng VN dùng đầu `03/05/07/08/09` cho mobile; nếu muốn strict, đổi thành `^(\+84|0)[35789]\d{8}$`.

### 11.3 URL (http/https)

```
https?://[^\s]+
```

- `https?` — `http` hoặc `https` (`s` là optional)
- `://`
- `[^\s]+` — bất kỳ ký tự không phải whitespace, ≥1

Phù hợp để **extract** URL từ text (không yêu cầu strict). Verify: `https://example.com/path?q=1` ✅; `http://localhost:8080` ✅.

> ⚠ Pattern này không validate URL đúng RFC. Để validate strict, dùng `net/url.Parse` thay vì regex.

### 11.4 Date YYYY-MM-DD

```
^\d{4}-\d{2}-\d{2}$
```

Pattern này **không** check ngày hợp lệ về mặt lịch (vd `2024-13-45` vẫn match). Để validate ngày thật, dùng `time.Parse("2006-01-02", s)` ở Lesson 25.

### 11.5 IPv4 (loose)

```
^\d{1,3}(\.\d{1,3}){3}$
```

- `\d{1,3}` 1-3 chữ số (mỗi octet)
- `(\.\d{1,3}){3}` lặp 3 lần `.NNN`

Match `192.168.1.1` ✅; `999.999.999.999` cũng ✅ (loose). Để strict (mỗi octet 0-255), pattern dài hơn — thường dùng `net.ParseIP` thay vì regex.

### 11.6 UUID v4

```
^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$
```

Cấu trúc: `8-4-4-4-12` hex chars, với ràng buộc UUID v4 (group 3 bắt đầu `4`, group 4 bắt đầu `8/9/a/b`).

### 11.7 Tóm tắt — chọn pattern theo nhu cầu

- **Validate strict**: thường nên dùng package chuyên dụng (`net/mail`, `net/url`, `net`, `time`). Regex chỉ dùng cho pre-filter.
- **Extract / replace**: regex thắng tuyệt đối.

> 📝 **Tóm tắt mục 11**: 6 pattern này cover 80% nhu cầu hằng ngày. Copy & paste — nhưng nhớ thêm `^...$` khi validate, bỏ anchor khi extract.

---

## 12. Performance

### 12.1 Compile 1 lần, reuse vô hạn

`regexp.MustCompile` tốn time để build automaton. **KHÔNG bao giờ compile trong hot loop**:

```go
// SAI — compile mỗi lần gọi hàm
func isPhone(s string) bool {
    re := regexp.MustCompile(`^(\+84|0)\d{9}$`)
    return re.MatchString(s)
}

// ĐÚNG — compile 1 lần ở package level
var phoneRe = regexp.MustCompile(`^(\+84|0)\d{9}$`)

func isPhone(s string) bool {
    return phoneRe.MatchString(s)
}
```

Benchmark thực tế: pattern đơn giản, compile mỗi call có thể chậm hơn 100-1000 lần so với reuse.

### 12.2 Khi nào `strings` nhanh hơn

Cho match đơn giản, **`strings.Contains`/`strings.HasPrefix`/`strings.Index` nhanh hơn regex** vì chúng dùng thuật toán chuyên dụng (Boyer-Moore, ...) và không tốn compile:

```go
// Chậm hơn
re := regexp.MustCompile(`error`)
re.MatchString(line)

// Nhanh hơn 2-10x
strings.Contains(line, "error")
```

Quy tắc: **literal substring match → `strings`. Pattern với ký tự đặc biệt → `regex`**.

### 12.3 `*Regexp` an toàn cho concurrent use

Sau khi compile, `*regexp.Regexp` **không có state**, các method `Find/Match/Replace` thuần đọc → an toàn gọi concurrent từ nhiều goroutine.

```go
var re = regexp.MustCompile(`\d+`)  // compile 1 lần

// Trong 100 goroutine khác nhau, dùng cùng `re` được:
go func() { re.FindAllString(text1, -1) }()
go func() { re.FindAllString(text2, -1) }()
```

> ⚠ Lưu ý: bản thân **`Compile`** không thread-safe — nhưng vì bạn compile 1 lần ở init, điều này không phải vấn đề thực tế.

### 12.4 Benchmark mini

Với pattern `\d+` và input dài 1000 char:

| Method | Time/op |
|--------|---------|
| `strings.ContainsAny(s, "0123456789")` | ~150 ns |
| `re.MatchString(s)` (re reused) | ~500 ns |
| `regexp.MustCompile(...).MatchString(s)` mỗi call | ~50 µs (100x chậm hơn) |

> 📝 **Tóm tắt mục 12**:
> - Compile 1 lần, làm package-level var với `MustCompile`.
> - Match literal → dùng `strings`, không phải regex.
> - Concurrent dùng cùng `*Regexp` an toàn.

---

## 13. Lookahead, lookbehind, backreference — không có trong Go

### 13.1 Vì sao thiếu

Như đã nói ở mục 2, RE2 cố tình bỏ:

- **Lookahead** `(?=...)`, `(?!...)`
- **Lookbehind** `(?<=...)`, `(?<!...)`
- **Backreference** `\1`, `\2`

Lý do: để bảo đảm thời gian chạy luôn linear. Lookaround và backreference khiến regex matching trở thành bài toán NP-hard trong worst case.

### 13.2 Workaround

**Trường hợp 1**: "match X nhưng KHÔNG theo sau bởi Y" (negative lookahead).

PCRE: `foo(?!bar)` → match `foo` không tiếp theo `bar`.

Go workaround:

```go
// Tìm tất cả "foo", lọc lại bằng Go code
re := regexp.MustCompile(`foo(\w*)`)
matches := re.FindAllStringSubmatch(text, -1)
var result []string
for _, m := range matches {
    if !strings.HasPrefix(m[1], "bar") {
        result = append(result, m[0])
    }
}
```

**Trường hợp 2**: "lặp lại chính từ vừa match" (backreference).

PCRE: `(\w+)\s+\1` → match `hello hello`, `the the`.

Go workaround:

```go
re := regexp.MustCompile(`\b(\w+)\s+(\w+)\b`)
for _, m := range re.FindAllStringSubmatch(text, -1) {
    if m[1] == m[2] {
        fmt.Println("Repeated word:", m[1])
    }
}
```

### 13.3 Trade-off

Bù lại sự bất tiện, bạn được:

- **Không bao giờ "treo"** vì regex độc.
- **Không bao giờ nuốt CPU** ngoài kế hoạch.
- **Pattern luôn dễ dự đoán** về performance.

Với hầu hết task (validate, extract, replace), workaround chỉ là vài dòng Go thêm — và rõ ràng hơn pattern PCRE phức tạp.

> 📝 **Tóm tắt mục 13**:
> - Go RE2 không có lookahead/lookbehind/backref.
> - Workaround: dùng nhiều passes hoặc filter trong Go code.
> - Trade-off vì linear-time guarantee — đáng giá trong production.

---

## 14. Common pitfall — checklist khi viết regex

1. **Quên anchor khi validate**: `\d+` match cả `abc123`. Luôn bọc `^...$` khi muốn match toàn chuỗi.
2. **Quên escape `.` khi muốn literal dot**: `example.com` match cả `exampleXcom`. Đúng: `example\.com`.
3. **Greedy quá tay**: `<.+>` match cả tag và nội dung. Dùng `<.+?>` lazy.
4. **Compile trong hot loop**: làm chậm code 100-1000x. Đưa lên package var.
5. **`\w` chỉ ASCII**: không match `tiếng` (có dấu). Dùng `\p{L}` cho Unicode letter.
6. **Replacement nhầm `$` literal**: muốn in `$100` mà có capture group → escape `$$100`.
7. **`MatchString` với pattern không anchor**: tưởng nó check toàn chuỗi, thực ra chỉ check substring.
8. **Thread-safety nhầm `Compile`**: bản thân `Compile` không safe, nhưng vì compile ở init nên không vấn đề.

> 🔁 **Dừng lại tự kiểm tra**: Bạn có regex `^\w+@example.com$` để check email. Hai input sau, cái nào match?
> - `user@example.com`
> - `user@exampleXcom`
>
> <details><summary>Đáp án</summary>
>
> Cả hai đều match! Vì `.` trong pattern KHÔNG được escape, nó là "any char" → `X` cũng match. Sửa: `^\w+@example\.com$`.
>
> </details>

---

## 15. Bài tập

> Lời giải chi tiết trong mục 16. Hãy thử trước khi xem.

### Bài 1 — Validate VN phone

Viết hàm `isVNPhone(s string) bool` chấp nhận:

- `0xxxxxxxxx` (10 chữ số, đầu `0`)
- `+84xxxxxxxxx` (đầu `+84` rồi 9 chữ số)

Giải thích từng phần của pattern.

### Bài 2 — Extract tất cả URL từ text

Cho input string chứa nhiều URL `http://...` hoặc `https://...`, trả về `[]string` tất cả URL. Test với:

```
"Xem tại https://go.dev và http://example.com/path?q=1 hoặc google.com (không có scheme nên bỏ qua)"
```

Expected: `["https://go.dev", "http://example.com/path?q=1"]`.

### Bài 3 — Replace `{{name}}` bằng giá trị từ map

Viết hàm `render(tmpl string, vars map[string]string) string` thay tất cả `{{key}}` trong `tmpl` bằng `vars[key]`. Nếu key không có trong map, giữ nguyên `{{key}}`.

Vd:

```go
render("Hello {{name}}, you have {{count}} messages.", map[string]string{
    "name": "Alice", "count": "5",
})
// "Hello Alice, you have 5 messages."
```

### Bài 4 — Parse log line

Cho format log:

```
[2024-01-15 10:30:45] INFO User alice logged in
[2024-01-15 10:31:02] ERROR Database connection failed
```

Viết hàm `parseLog(line string) (date, level, msg string, ok bool)` extract 3 phần.

### Bài 5 — Split CSV có quote escape

Cho CSV simplified: field bình thường tách bằng `,`, nhưng field bao trong `"..."` được giữ nguyên dấu `,` bên trong. Không cần xử lý escape `""` bên trong quote.

Vd input: `a,"b,c",d` → `["a", "b,c", "d"]`.

### Bài 6 — Detect 3 bug trong các regex sau

```go
// Pattern A: muốn match toàn chuỗi là số
patA := `\d+`

// Pattern B: muốn match domain example.com
patB := `example.com`

// Pattern C: muốn extract giá trị trong ngoặc đơn
patC := `\((.+)\)`
```

Với mỗi pattern, chỉ ra bug và pattern đúng.

---

## 16. Lời giải chi tiết

### Lời giải Bài 1

```go
var vnPhoneRe = regexp.MustCompile(`^(\+84|0)[0-9]{9}$`)

func isVNPhone(s string) bool {
    return vnPhoneRe.MatchString(s)
}
```

Phân tích pattern `^(\+84|0)[0-9]{9}$`:

- `^` — bắt đầu chuỗi
- `(\+84|0)` — group: `+84` hoặc `0`. Cần escape `+` vì `+` là quantifier
- `[0-9]{9}` — 9 chữ số tiếp theo
- `$` — kết thúc chuỗi

Test:

| Input | Kết quả | Vì sao |
|-------|:------:|--------|
| `0901234567` | ✅ | `0` + 9 số |
| `+84901234567` | ✅ | `+84` + 9 số |
| `84901234567` | ❌ | thiếu `+` |
| `0901234` | ❌ | chỉ 6 số sau `0` |
| `0901234567 ` | ❌ | có space cuối, anchor `$` chặn |

Độ phức tạp: $O(n)$ — RE2 chạy linear với độ dài chuỗi.

### Lời giải Bài 2

```go
var urlRe = regexp.MustCompile(`https?://[^\s]+`)

func extractURLs(text string) []string {
    return urlRe.FindAllString(text, -1)
}
```

Phân tích:

- `https?` — `http` hoặc `https` (`s?` = `s` optional)
- `://` literal
- `[^\s]+` — ≥1 ký tự không phải whitespace

Trên input mẫu, `FindAllString` quét trái-qua-phải, tìm match đầu tiên là `https://go.dev`, sau đó tiếp tục từ sau nó, tìm `http://example.com/path?q=1`, rồi tới `google.com` — không match vì thiếu `http(s)://`.

Output: `["https://go.dev", "http://example.com/path?q=1"]`.

> ⚠ Pattern này tham (lấy đến whitespace gần nhất). Trong văn bản có dấu `,` hoặc `)` ngay sau URL, chúng sẽ bị "dính" vào URL. Để strict hơn:

```go
var urlRe = regexp.MustCompile(`https?://[^\s,)<>"']+`)
```

### Lời giải Bài 3

Dùng `ReplaceAllStringFunc` để kiểm soát từng match:

```go
var tmplRe = regexp.MustCompile(`\{\{(\w+)\}\}`)

func render(tmpl string, vars map[string]string) string {
    return tmplRe.ReplaceAllStringFunc(tmpl, func(match string) string {
        // match là cả "{{name}}"; extract tên ở giữa
        // Cách 1: dùng FindStringSubmatch
        sub := tmplRe.FindStringSubmatch(match)
        key := sub[1] // sub[0]="{{name}}", sub[1]="name"
        if val, ok := vars[key]; ok {
            return val
        }
        return match // giữ nguyên nếu không có key
    })
}
```

Pattern `\{\{(\w+)\}\}`:

- `\{\{` — `{{` literal (escape vì `{` có thể là quantifier ở vài engine; Go RE2 hiền hơn nhưng escape vẫn an toàn)
- `(\w+)` — capture tên (≥1 word char)
- `\}\}` — `}}` literal

Test với `"Hello {{name}}, {{count}} messages, missing {{x}}"` + map `{name:Alice, count:5}` → `"Hello Alice, 5 messages, missing {{x}}"`.

**Cách 2 ngắn hơn dùng `$1`**:

```go
// Chỉ dùng được nếu mọi key đều có trong vars; không xử lý được "giữ nguyên khi thiếu"
result := tmplRe.ReplaceAllStringFunc(tmpl, func(m string) string {
    name := tmplRe.FindStringSubmatch(m)[1]
    return vars[name] // "" nếu không có
})
```

Độ phức tạp: $O(n + k)$ với n = len(tmpl), k = số match.

### Lời giải Bài 4

```go
var logRe = regexp.MustCompile(`^\[(\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2})\] (\w+) (.+)$`)

func parseLog(line string) (date, level, msg string, ok bool) {
    m := logRe.FindStringSubmatch(line)
    if m == nil {
        return "", "", "", false
    }
    return m[1], m[2], m[3], true
}
```

Pattern `^\[(\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2})\] (\w+) (.+)$`:

- `^\[` — bắt đầu bằng `[`
- `(\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2})` — group 1: timestamp
- `\]` — đóng `]`
- ` ` — 1 space
- `(\w+)` — group 2: level (INFO/WARN/ERROR/...)
- ` ` — space
- `(.+)$` — group 3: phần còn lại đến cuối

Test với `"[2024-01-15 10:30:45] INFO User alice logged in"`:

- `m[1]` = `"2024-01-15 10:30:45"`
- `m[2]` = `"INFO"`
- `m[3]` = `"User alice logged in"`

**Phiên bản dùng named group** (dễ đọc hơn):

```go
var logRe = regexp.MustCompile(`^\[(?P<date>\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2})\] (?P<level>\w+) (?P<msg>.+)$`)
```

Lúc đó truy cập bằng `re.SubexpIndex("date")`.

### Lời giải Bài 5

Cách regex thuần: match HOẶC nội dung trong quote HOẶC nội dung không có dấu phẩy.

```go
var csvFieldRe = regexp.MustCompile(`"([^"]*)"|([^,]*)`)

func splitCSV(line string) []string {
    var fields []string
    matches := csvFieldRe.FindAllStringSubmatch(line, -1)
    for _, m := range matches {
        // m[0] = toàn match; m[1] = nội dung trong quote nếu có; m[2] = nội dung không quote
        if m[1] != "" || strings.HasPrefix(m[0], `"`) {
            fields = append(fields, m[1])
        } else {
            fields = append(fields, m[2])
        }
    }
    // Loại bỏ entry rỗng cuối (do alternation có thể match "" sau dấu phẩy cuối)
    if len(fields) > 0 && fields[len(fields)-1] == "" && !strings.HasSuffix(line, ",") {
        fields = fields[:len(fields)-1]
    }
    return fields
}
```

Pattern `"([^"]*)"|([^,]*)`:

- Nhánh 1: `"([^"]*)"` — match `"..."`, capture nội dung trong.
- Nhánh 2: `([^,]*)` — match chuỗi không chứa `,`, capture toàn bộ.

Test `a,"b,c",d`:

1. Match nhánh 2: `a` (đến trước `,`)
2. Match nhánh 1: `"b,c"` (capture `b,c`)
3. Match nhánh 2: `d`

Output: `["a", "b,c", "d"]`.

> ⚠ Trong thực tế, **đừng tự viết parser CSV bằng regex** — dùng `encoding/csv` của Go. CSV thật phức tạp hơn (escape `""`, multiline quoted, BOM, encoding). Bài này chỉ là exercise hiểu alternation.

### Lời giải Bài 6

**Pattern A: `\d+`** — quên anchor.

`re.MatchString("abc123")` trả `true` vì có CHỨA digit. Để match toàn chuỗi là số:

```go
patA := `^\d+$`
```

**Pattern B: `example.com`** — quên escape `.`.

`.` trong regex = any char. Pattern này match `exampleXcom`, `example.com`, `example com`. Để match literal:

```go
patB := `example\.com`
```

**Pattern C: `\((.+)\)`** — greedy ambiguous.

Với input `(foo) and (bar)`, `.+` greedy → match từ `foo` đến `bar`. `FindStringSubmatch` trả group 1 = `"foo) and (bar"`. Sửa:

```go
patC := `\((.+?)\)`  // lazy
```

Lazy `.+?` match ít nhất có thể → dừng ở `)` đầu tiên. `FindAllStringSubmatch` lúc đó trả 2 match: `[foo bar]`.

---

## 17. Code & minh họa

- Code chi tiết: [solutions.go](./solutions.go) — chạy `go run solutions.go` để xem từng bài tập demo.
- Tương tác: [visualization.html](./visualization.html) — playground regex, pattern builder, picker pattern thường dùng.

## 18. Bài tiếp theo

→ [Lesson 25 — Time & Date](../lesson-25-time-date/): `time.Time`, parse/format, timezone, ticker và những pitfall kinh điển (`time.Now()` vs UTC, daylight saving, monotonic clock).

## Tham khảo

- [Go `regexp` package documentation](https://pkg.go.dev/regexp)
- [RE2 syntax reference](https://github.com/google/re2/wiki/Syntax)
- [Russ Cox — "Regular Expression Matching Can Be Simple And Fast"](https://swtch.com/~rsc/regexp/regexp1.html) — bài viết kinh điển giải thích vì sao RE2 ra đời
- [regex101.com](https://regex101.com/) — playground online (chọn flavor "Go" hoặc "RE2")
