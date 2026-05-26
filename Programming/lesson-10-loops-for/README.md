# Lesson 10 — Vòng lặp `for` trong Go

> **Tier 1 — Go Basic · Lesson 10**
> Tiền đề: [L07 — Variables & Types](../lesson-07-variables-types/), L09 — Điều kiện. Sẽ dùng cho: L11 — Hàm, L12 — Slice/Map (vì range chính là cách duyệt slice/map).

Go có **đúng một từ khoá** cho vòng lặp: `for`. Không `while`, không `do-while`, không `foreach`. Một từ khoá nhưng đủ cho mọi tình huống — từ đếm số đơn giản đến duyệt channel concurrent. Bài này dạy đầy đủ 3 dạng `for`, từ khoá `range`, và các pattern thường gặp khi xử lý dữ liệu thực tế (parse CSV, scan log, retry với max attempts...).

## Mục tiêu học tập

Sau bài này, bạn sẽ:

- Viết được cả 3 dạng `for`: C-style, while-style, infinite.
- Dùng `range` đúng cho slice, array, map, string, channel — và biết khi nào `v` là **copy**.
- Tránh được bug closure-trong-loop (Go < 1.22) — và hiểu vì sao Go 1.22 đổi semantics.
- Dùng `break`/`continue` có nhãn (labeled) khi cần thoát nested loop.
- Áp dụng được ≥ 5 loop pattern thực tế: sum, filter, transform, two-pointer, retry.
- Biết khi nào dùng `for range N` (Go 1.22+) — và khi nào C-style vẫn rõ hơn.

## 1. Ba dạng `for` trong Go

> 💡 **Trực giác — vì sao Go bỏ `while`?**
>
> `for` và `while` chỉ khác nhau ở chỗ có **init-statement** và **post-statement** hay không. Go chọn nhập làm một: bỏ qua init/post → bạn có while; bỏ qua hết → bạn có infinite loop. Ít từ khoá hơn → ít quyết định "dùng cái nào" hơn → code consistent hơn giữa các project. Đây là triết lý "less is more" lặp đi lặp lại trong design Go.

### 1.1 Dạng C-style — đếm số biết trước

```go
for i := 0; i < 10; i++ {
    fmt.Println(i)
}
```

Cấu trúc 3 phần, **mỗi phần phân cách bằng `;`** (bắt buộc, kể cả khi rỗng):

| Phần | Khi nào chạy | Mục đích |
|------|--------------|----------|
| Init `i := 0` | 1 lần, trước vòng đầu | Khởi tạo biến đếm |
| Condition `i < 10` | Trước mỗi vòng | Quyết định tiếp tục hay dừng |
| Post `i++` | Sau mỗi vòng | Cập nhật biến đếm |

Scope của `i` là **bên trong `for`** — sau loop `i` không tồn tại.

**Ví dụ thực tế — đọc N record đầu của CSV:**

```go
for i := 0; i < 100 && scanner.Scan(); i++ {
    line := scanner.Text()
    process(line)
}
```

Condition là **biểu thức Bool kết hợp** — kết thúc khi đủ 100 dòng **hoặc** hết file (`Scan()` trả `false`).

### 1.2 Dạng while-style — lặp đến khi điều kiện sai

Bỏ init và post, chỉ giữ condition:

```go
for x < 100 {
    x = x * 2
}
```

Đây là chỗ Go thay thế `while` của C. Cú pháp đồng nhất với C-style, chỉ bỏ 2 phần.

**Ví dụ thực tế — retry với backoff:**

```go
delay := 100 * time.Millisecond
for !connected {
    if err := connect(); err == nil {
        connected = true
        break
    }
    time.Sleep(delay)
    delay *= 2 // exponential backoff
}
```

Loop chạy tới khi `connected` thành true (set bởi nhánh `if err == nil`).

### 1.3 Dạng infinite — chạy mãi đến khi `break`

Bỏ hết, chỉ còn `for { ... }`:

```go
for {
    line, err := reader.ReadString('\n')
    if err != nil {
        break
    }
    handle(line)
}
```

Đây là cách Go viết "event loop" — đọc từ một nguồn cho đến khi cạn (EOF, channel closed, signal stop...).

**Ví dụ thực tế — worker xử lý job từ channel:**

```go
for {
    select {
    case job := <-jobs:
        process(job)
    case <-quit:
        return
    }
}
```

Worker chạy mãi, mỗi vòng chờ event mới (job hoặc tín hiệu dừng).

> ❓ **Câu hỏi tự nhiên — Nếu quên `break`, có sao không?**
>
> Process sẽ treo, ăn 100% CPU một core (nếu loop không có `sleep`/`Recv` blocking) — đây là một trong những lỗi runtime đắt nhất. Linter `staticcheck` không bắt được vì điều kiện thoát có thể nằm sâu trong logic. **Cách phòng**: mỗi infinite loop phải có một điều kiện thoát **rõ ràng ngay khi đọc**, hoặc một timeout.

### 1.4 Bốn ví dụ số đối chiếu 3 dạng

| Yêu cầu | Cú pháp tối ưu | Code |
|---------|----------------|------|
| In `1..5` | C-style | `for i := 1; i <= 5; i++ { ... }` |
| Đôi đi `x` cho tới khi ≥ 1000 | while-style | `for x < 1000 { x *= 2 }` |
| Đọc stdin tới EOF | infinite + break | `for { line, err := r.ReadString('\n'); if err != nil { break } }` |
| Đếm số ký tự trong `"go"` | C-style với `len` | `for i := 0; i < len(s); i++ { ... }` (in 2 vòng: i=0, i=1) |

> 📝 **Tóm tắt mục 1**
> - Go có **đúng 1 từ khoá loop**: `for`.
> - 3 dạng = C-style / while-style / infinite — phân biệt bằng có/không có init & post.
> - Mỗi dạng có use case riêng — không phải "ai cũng chọn C-style".

## 2. `range` — duyệt collection

> 💡 **Trực giác — `range` là gì?**
>
> `range` là một **biểu thức đặc biệt** chỉ dùng được sau `for`, sinh ra một dãy `(key, value)` để duyệt. Nó trừu tượng hoá "cách lấy phần tử kế tiếp" — bạn không phải tự index như C. Đổi sang `range` cho code dễ đọc hơn và tránh off-by-one.

### 2.1 Range slice / array

```go
nums := []int{10, 20, 30, 40}
for i, v := range nums {
    fmt.Printf("nums[%d] = %d\n", i, v)
}
// In:
// nums[0] = 10
// nums[1] = 20
// nums[2] = 30
// nums[3] = 40
```

`i` là **index** (int), `v` là **bản sao** của phần tử. Sửa `v` **KHÔNG** sửa được phần tử trong slice — đây là bẫy #1 của range (xem 2.4).

Nếu chỉ cần index: `for i := range nums { ... }` (bỏ `v`).
Nếu chỉ cần value: `for _, v := range nums { ... }` (dùng `_` bỏ qua index).

### 2.2 Range map

```go
prices := map[string]int{"apple": 30, "banana": 10, "cherry": 25}
for k, v := range prices {
    fmt.Printf("%s = %d\n", k, v)
}
```

**Thứ tự KHÔNG xác định.** Go cố tình randomize thứ tự range qua map — để tránh code lệ thuộc thứ tự (sẽ break khi nâng version Go). Chạy 2 lần in ra 2 thứ tự khác nhau:

```
Lần 1: banana = 10  /  apple = 30  /  cherry = 25
Lần 2: cherry = 25  /  apple = 30  /  banana = 10
Lần 3: apple = 30   /  cherry = 25 /  banana = 10
```

Nếu cần thứ tự, **sort key trước**:

```go
keys := make([]string, 0, len(prices))
for k := range prices {
    keys = append(keys, k)
}
sort.Strings(keys)
for _, k := range keys {
    fmt.Printf("%s = %d\n", k, prices[k])
}
```

### 2.3 Range string — byte index, rune value

```go
s := "héllo"
for i, r := range s {
    fmt.Printf("index=%d  rune=%c  codepoint=U+%04X\n", i, r, r)
}
// In:
// index=0  rune=h  codepoint=U+0068
// index=1  rune=é  codepoint=U+00E9
// index=3  rune=l  codepoint=U+006C    ← nhảy từ 1 → 3 (é là 2 byte)
// index=4  rune=l  codepoint=U+006C
// index=5  rune=o  codepoint=U+006F
```

`i` là **byte index** (vị trí trong slice byte gốc), `r` là **rune** (codepoint Unicode). `len(s) = 6` (5 ký tự nhưng `é` chiếm 2 byte UTF-8: `0xC3 0xA9`).

Đây là khác biệt sống còn với `for i := 0; i < len(s); i++`: cách C-style chỉ trả `byte` (`s[i]` là `byte`, không phải rune), `s[1]` của `"héllo"` là `0xC3` — chỉ nửa của `é`.

> ⚠ **Lỗi thường gặp — dùng `s[i]` để lấy ký tự Unicode**
>
> ```go
> s := "héllo"
> fmt.Println(s[1]) // → 195 (byte 0xC3), KHÔNG phải 'é'
> ```
> Cần dùng `range` hoặc `[]rune(s)` để duyệt theo ký tự thực sự.

### 2.4 Range channel — đọc tới khi close

```go
ch := make(chan int, 3)
go func() {
    ch <- 1
    ch <- 2
    ch <- 3
    close(ch)
}()
for v := range ch {
    fmt.Println(v)
}
// In: 1, 2, 3, rồi loop kết thúc vì ch đã close.
```

**Lưu ý cốt yếu**: nếu **không ai close `ch`**, loop sẽ **block mãi mãi** ở phần tử kế tiếp khi channel cạn — vì range không phân biệt "tạm hết" với "kết thúc". Đây là một trong những deadlock phổ biến nhất khi học channel.

### 2.5 Range với một biến — chỉ lấy index

```go
for i := range []int{10, 20, 30} {
    fmt.Println(i) // 0, 1, 2 — KHÔNG phải 10, 20, 30
}
```

Một biến = index, không phải value. **Đây là bẫy ngược chiều với cảm giác** — nhiều người mới đoán "1 biến nên phải là value như Python".

> 📝 **Tóm tắt mục 2**
> - `range` đa năng: slice / array / map / string / channel — mỗi loại có semantics riêng.
> - Slice/array: `(index, copy_value)`.
> - Map: `(key, value)` — thứ tự **random**.
> - String: `(byte_index, rune)` — bước nhảy không đều với UTF-8.
> - Channel: chỉ trả value, dừng khi close.
> - **Một biến** = index (slice/string/map), không phải value.

## 3. Pitfall — biến `v` là COPY (và bug closure trong loop)

> 💡 **Trực giác — vì sao là copy?**
>
> Mỗi vòng range, Go gán giá trị phần tử vào biến `v`. Vì Go pass-by-value, `v` là **copy** của phần tử, không phải reference. Sửa `v` không sửa slice gốc — bạn phải truy cập qua `s[i]` để sửa.

### 3.1 Lỗi: sửa `v` không có tác dụng

```go
nums := []int{1, 2, 3}
for _, v := range nums {
    v *= 10 // chỉ sửa copy local
}
fmt.Println(nums) // [1 2 3] — KHÔNG đổi!
```

Đúng: dùng index.

```go
for i := range nums {
    nums[i] *= 10
}
fmt.Println(nums) // [10 20 30]
```

### 3.2 Bug closure trong loop (Go < 1.22)

Đây là **lỗi kinh điển** đã quật ngã không biết bao nhiêu lập trình viên Go. Code:

```go
// Go < 1.22 — TỆ
for _, v := range []int{1, 2, 3} {
    go func() {
        fmt.Println(v)
    }()
}
time.Sleep(time.Second)
```

**Bạn mong đợi**: in `1 2 3` (theo thứ tự nào đó vì goroutine concurrent).
**Thực tế (Go < 1.22)**: in **`3 3 3`**.

**Vì sao?** Trong Go < 1.22, biến `v` được **tái sử dụng** giữa các vòng — nó là **một biến duy nhất** mà mỗi vòng gán giá trị mới vào. Closure capture **biến** (reference), không phải **giá trị** tại thời điểm tạo. Đến khi goroutine chạy (sau khi loop xong), `v == 3` (giá trị cuối) → cả 3 goroutine in `3`.

**Fix style cũ — shadow biến trong loop body:**

```go
for _, v := range []int{1, 2, 3} {
    v := v // ← tạo biến MỚI cùng tên, mỗi vòng một biến
    go func() {
        fmt.Println(v)
    }()
}
```

Hoặc truyền qua tham số:

```go
for _, v := range []int{1, 2, 3} {
    go func(v int) {
        fmt.Println(v)
    }(v)
}
```

### 3.3 Go 1.22+: fix tại ngôn ngữ

Go 1.22 (Feb 2024) đổi semantics: **mỗi vòng lặp `for`, biến loop variable là một biến MỚI** (giống như tự động `v := v`). Code lỗi ở 3.2 nay in `1 2 3` (theo thứ tự nào đó) — đúng như mong đợi.

> ❓ **Câu hỏi tự nhiên — Tôi đang dùng Go 1.23, tại sao vẫn cần học bug này?**
>
> Ba lý do:
> 1. **Code legacy còn rất nhiều** — repo viết trước 2024 vẫn theo style cũ. Đọc code không hiểu vì sao có `v := v` sẽ thấy thừa, rồi tự xoá → bug quay lại.
> 2. **Một số file vẫn build với `go.mod` declare version cũ** — semantics theo `go` directive trong `go.mod`, không phải toolchain. `go 1.21` vẫn theo luật cũ kể cả khi compile bằng Go 1.23.
> 3. **Vẫn còn bug closure trong các loop KHÔNG phải `range`/`for`** — ví dụ với goroutine trong slice của hàm, biến outer vẫn capture by reference.

> ⚠ **Lỗi thường gặp — closure capture biến `i` của C-style for**
>
> ```go
> // Go 1.22+ đã fix cho cả 3 dạng for. Nhưng nếu go.mod ghi go 1.21:
> for i := 0; i < 3; i++ {
>     go func() { fmt.Println(i) }() // in 3 3 3, không phải 0 1 2
> }
> ```
> Quy tắc an toàn: **trong mọi loop có goroutine/closure, shadow biến** `i := i` — hoạt động đúng ở mọi version Go.

> 📝 **Tóm tắt mục 3**
> - `v` trong `for _, v := range ...` là **copy** — sửa không tác dụng lên slice gốc.
> - Goroutine + closure trong loop là bẫy #1 — Go < 1.22 in cùng giá trị cuối, Go 1.22+ fix tại ngôn ngữ.
> - Quy tắc an toàn xuyên version: shadow biến `v := v` hoặc truyền tham số.

## 4. `break` và `continue`

Giống C, nhưng vẫn liệt kê vì có vài chi tiết quan trọng.

```go
for i := 0; i < 10; i++ {
    if i == 5 {
        break // thoát loop ngay
    }
    if i % 2 == 0 {
        continue // bỏ qua phần còn lại của vòng, sang vòng kế
    }
    fmt.Println(i)
}
// In: 1, 3 (4 chia hết 2 nên continue; 5 thì break)
```

| Từ khoá | Tác dụng |
|---------|----------|
| `break` | Dừng loop **gần nhất** ngay lập tức |
| `continue` | Bỏ qua phần body còn lại, chạy post-statement (nếu có) rồi check condition cho vòng kế |

### 4.1 Ví dụ thực tế — skip dòng comment trong CSV

```go
for scanner.Scan() {
    line := scanner.Text()
    if strings.HasPrefix(line, "#") || line == "" {
        continue // bỏ qua comment + dòng trống
    }
    processCSVLine(line)
}
```

## 5. Labeled `break` / `continue` — thoát nested loop

> 💡 **Trực giác — vấn đề cần giải**
>
> Khi bạn có 2 loop lồng nhau và muốn **thoát cả hai** khi tìm thấy điều kiện, `break` thường chỉ thoát loop trong. Phải đặt flag, kiểm tra ở loop ngoài, rồi `break` thêm lần nữa — code rườm rà, dễ sai.

Go cho phép gắn **nhãn (label)** cho loop và `break`/`continue` thẳng tới nhãn đó:

```go
matrix := [][]int{
    {1, 2, 3, 4},
    {5, 6, 7, 8},
    {9, 10, 11, 12},
    {13, 14, 15, 16},
}
target := 11

var foundRow, foundCol int = -1, -1

outer:
for i := range matrix {
    for j := range matrix[i] {
        if matrix[i][j] == target {
            foundRow, foundCol = i, j
            break outer // thoát CẢ HAI loop
        }
    }
}
fmt.Printf("Tìm thấy %d tại [%d][%d]\n", target, foundRow, foundCol)
// In: Tìm thấy 11 tại [2][2]
```

**Cú pháp**: label đặt **NGAY TRƯỚC** loop, theo sau là `:`. Quy ước đặt tên: snake hoặc lowercase mô tả vai trò (`outer`, `scan`, `retryLoop`).

### 5.1 `continue label` — bỏ qua vòng còn lại của loop ngoài

```go
words := []string{"hello", "world", "go", "rust"}
banned := map[rune]bool{'r': true}

scan:
for _, w := range words {
    for _, c := range w {
        if banned[c] {
            continue scan // bỏ qua word này, sang word kế của loop ngoài
        }
    }
    fmt.Println(w)
}
// In: hello, world, go ("rust" bị skip vì có 'r')
```

### 5.2 Khi nào cần label?

| Tình huống | Có cần label? |
|------------|---------------|
| 1 loop đơn | Không — `break` thường đủ |
| Tìm phần tử trong matrix 2D | Có |
| Skip outer loop khi inner gặp điều kiện | Có (`continue label`) |
| Thoát khỏi loop + return từ hàm | Không — dùng `return` thẳng |
| Thoát loop + xử lý cleanup | Có thể dùng label, hoặc tách function rồi return |

> ❓ **Câu hỏi tự nhiên — Label có giống `goto` không?**
>
> Không. `goto` nhảy tự do tới bất kỳ chỗ nào trong cùng hàm → khó đọc. Label chỉ dùng với `break`/`continue` → chỉ điều khiển dòng loop, không phá flow. Go có `goto` nhưng cộng đồng hầu như không dùng (xem mục 8).

> 📝 **Tóm tắt mục 5**
> - Label = nhãn đặt trước loop, format `name:`.
> - `break label` thoát luôn loop tại nhãn đó.
> - `continue label` skip vòng còn lại của loop tại nhãn đó.
> - Dùng cho nested loop khi cần thoát/skip outer từ inner.

## 6. Loop patterns — 5 mẫu thực tế

### 6.1 Sum / accumulate

Cộng dồn các phần tử (tổng quát hơn: tính một aggregate).

```go
nums := []int{3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5}
sum := 0
for _, x := range nums {
    sum += x
}
// sum = 44
```

**Walk-through**: vòng 0 `sum = 0+3 = 3`; vòng 1 `sum = 3+1 = 4`; vòng 2 `sum = 4+4 = 8`; ... vòng cuối `sum = 39+5 = 44`. ✓

### 6.2 Filter — chọn phần tử thoả điều kiện

```go
nums := []int{-3, 1, -4, 1, -5, 9, 2, -6, 5}
positives := make([]int, 0, len(nums))
for _, x := range nums {
    if x > 0 {
        positives = append(positives, x)
    }
}
// positives = [1, 1, 9, 2, 5]
```

**Lưu ý hiệu năng**: `make([]int, 0, len(nums))` pre-allocate capacity = `len(nums)` (case xấu nhất) để tránh `append` realloc nhiều lần. Tối ưu nhỏ nhưng quan trọng cho slice lớn.

### 6.3 Map (transform) — biến đổi từng phần tử

```go
nums := []int{1, 2, 3, 4, 5}
doubled := make([]int, len(nums)) // len = len(nums), capacity sẵn
for i, x := range nums {
    doubled[i] = x * 2
}
// doubled = [2, 4, 6, 8, 10]
```

Khi `len(output) == len(input)`, dùng index gán thẳng — nhanh hơn `append`.

### 6.4 Reduce — min/max/avg

```go
nums := []int{3, 1, 4, 1, 5, 9, 2, 6}
// max
maxVal := nums[0]
for _, x := range nums[1:] {
    if x > maxVal {
        maxVal = x
    }
}
// maxVal = 9

// avg
sum := 0
for _, x := range nums {
    sum += x
}
avg := float64(sum) / float64(len(nums))
// avg = 31 / 8 = 3.875
```

> ⚠ **Lỗi thường gặp — `maxVal := 0`**
>
> Nếu khởi tạo `maxVal := 0` rồi tìm max của `[-5, -3, -1]`, ra `maxVal = 0` (sai — đáng lẽ -1). Đúng phải khởi tạo bằng phần tử đầu (`nums[0]`) hoặc `math.MinInt`. Mirror cho min với `math.MaxInt`.

### 6.5 Two-pointer — duyệt từ 2 đầu vào giữa

Pattern này hay dùng cho: check palindrome, reverse, two-sum trên slice đã sort.

```go
// Reverse a slice in place
s := []int{1, 2, 3, 4, 5}
for l, r := 0, len(s)-1; l < r; l, r = l+1, r-1 {
    s[l], s[r] = s[r], s[l]
}
// s = [5, 4, 3, 2, 1]
```

**Walk-through n=5**:
- Vòng 0: `l=0, r=4` → swap `s[0]` (1) và `s[4]` (5) → `[5, 2, 3, 4, 1]`
- Vòng 1: `l=1, r=3` → swap `s[1]` (2) và `s[3]` (4) → `[5, 4, 3, 2, 1]`
- Vòng 2: `l=2, r=2` → `l < r` sai → loop kết thúc.

**Check palindrome:**

```go
func isPalindrome(s string) bool {
    runes := []rune(s)
    for l, r := 0, len(runes)-1; l < r; l, r = l+1, r-1 {
        if runes[l] != runes[r] {
            return false
        }
    }
    return true
}
isPalindrome("level")    // true
isPalindrome("hello")    // false
isPalindrome("")         // true (loop không chạy vòng nào)
isPalindrome("a")        // true (l=0, r=0, l<r sai ngay)
```

**Vì sao dùng `[]rune(s)`?** Vì string `range` trả byte index — không đối xứng với pattern two-pointer cần index liên tục.

> 📝 **Tóm tắt mục 6**
> - 5 pattern lõi: **sum, filter, transform, reduce, two-pointer**.
> - Filter / transform: pre-allocate capacity nếu biết kích thước → tránh realloc.
> - Reduce min/max: khởi tạo bằng `nums[0]`, không phải 0.
> - Two-pointer: dùng cho mọi bài toán đối xứng / sắp xếp.

## 7. `for range N` (Go 1.22+) — đếm gọn

Trước Go 1.22, đếm 0..N-1 bắt buộc phải:

```go
for i := 0; i < 10; i++ { ... }
```

Go 1.22 cho phép range trực tiếp trên **integer**:

```go
for i := range 10 {
    fmt.Println(i) // 0, 1, ..., 9
}
```

Chỉ in 1 biến `i` (giá trị từ 0 đến N-1). Tương đương C-style nhưng ngắn hơn.

Có thể dùng `for range N` (không có biến) nếu chỉ cần lặp N lần mà không quan tâm số đếm:

```go
for range 5 {
    fmt.Println("hi") // in 5 lần
}
```

**Khi nào dùng?** Khi:
- Đếm thuần từ 0 đến N-1 (không cần step ≠ 1).
- Đang ở Go ≥ 1.22 (kiểm `go.mod`).
- Code muốn ngắn gọn — đặc biệt cho test, benchmark.

**Khi nào KHÔNG dùng?** Khi:
- Step khác 1 (`i += 2`, đếm ngược): vẫn phải C-style.
- Tương thích Go cũ < 1.22 (vẫn còn nhiều môi trường).
- Cần biến đếm thay đổi giữa loop body.

## 8. `goto` — có, nhưng đừng dùng

Go có `goto` nhưng hầu như không ai dùng:

```go
i := 0
loop:
if i < 5 {
    fmt.Println(i)
    i++
    goto loop
}
```

Chỉ có 2 use case "tha thứ được":
1. **Cleanup chain trong syscall wrapper** — error handling phức tạp với nhiều bước cleanup.
2. **State machine parser** — đôi khi rõ hơn dùng switch lồng.

Cho mọi trường hợp khác: dùng `for` + `break`/`continue` có nhãn.

## 9. Performance tips

### 9.1 `for i := range slice` vs `for i := 0; i < len(slice); i++`

Hai dạng này **không có khác biệt hiệu năng** — Go compiler tối ưu `len(slice)` thành biến local trước loop (nó nhận ra `len` là pure). Chọn dạng nào tuỳ thẩm mỹ:

- `for i, v := range s` đọc tự nhiên hơn khi cần cả index + value.
- `for i := 0; i < len(s); i++` rõ ràng hơn khi muốn skip phần tử (`i += 2`) hoặc đếm ngược.

### 9.2 Tránh allocate trong loop nóng

```go
// TỆ — mỗi vòng tạo slice mới
for i := 0; i < 1_000_000; i++ {
    buf := make([]byte, 1024)
    process(buf)
}

// TỐT — tái sử dụng buffer
buf := make([]byte, 1024)
for i := 0; i < 1_000_000; i++ {
    process(buf)
    // reset buf nếu cần: buf = buf[:0] cho slice append-style
}
```

Trên 1 triệu vòng, allocate 1 KB mỗi vòng = 1 GB pressure cho GC → app pause hàng giây. Sửa thành reuse → giảm về 1 KB total. Đây là tối ưu top-3 mỗi khi optimize Go.

### 9.3 Range over map chậm hơn range over slice

Map iteration phải:
1. Hash lookup từng bucket.
2. Random offset đầu để không leak order.
3. Skip slot rỗng.

Slice chỉ đọc tuần tự bộ nhớ — friendly với CPU cache. **Benchmark thực tế** với 100k phần tử: range slice ~150µs, range map ~800µs (chậm hơn ~5x). Nếu chỉ cần duyệt tất cả → dùng slice; nếu cần lookup theo key → map (chấp nhận trade-off).

### 9.4 Range slice copy giá trị lớn

```go
type Big struct { data [4096]byte }
arr := make([]Big, 1000)

// TỆ — mỗi vòng copy 4 KB
for _, v := range arr {
    handle(&v)
}

// TỐT — chỉ copy 8 byte index + truy cập qua arr[i]
for i := range arr {
    handle(&arr[i])
}
```

Vì `v` là **copy**, range trên slice của struct lớn = copy struct mỗi vòng. Với struct > 32 byte, dùng index để truy cập trực tiếp.

> 📝 **Tóm tắt mục 9**
> - C-style và range hiệu năng tương đương cho slice (compiler tối ưu).
> - Cấm allocate trong hot loop — reuse buffer.
> - Range map chậm hơn slice ~5x — chọn cấu trúc theo nhu cầu duyệt.
> - Struct lớn: range bằng index thay vì value để tránh copy.

## 10. Common pitfalls — checklist tránh bug

| Pitfall | Triệu chứng | Cách phòng |
|---------|-------------|------------|
| Infinite loop quên update biến | App treo, 1 core 100% | Mỗi while-loop phải có path update biến condition |
| Sửa `v` mong sửa slice | Slice không đổi | Dùng `s[i] = ...` |
| Modify slice while ranging | Behavior không xác định | Range trên copy `s2 := append([]int(nil), s...)`, hoặc duyệt bằng index ngược (`for i := len(s)-1; i >= 0; i--`) |
| `append` trong loop làm grow capacity | Index cũ trỏ vào array cũ | Pre-allocate capacity, hoặc range trên copy |
| Range map kỳ vọng thứ tự | Test flaky | Sort key trước khi duyệt |
| Closure capture biến loop (Go < 1.22) | Goroutine in cùng giá trị cuối | `v := v` shadow, hoặc pass qua param |
| Range channel không close → block | Goroutine treo mãi | Đảm bảo sender close channel khi xong |
| Two-pointer dùng `<=` thay `<` | Swap qua giữa, phá kết quả | Dùng `l < r` (loop dừng khi gặp nhau) |

### 10.1 Walk-through pitfall #3 — modify slice while ranging

```go
nums := []int{1, 2, 3}
for _, v := range nums {
    if v == 2 {
        nums = append(nums, 99) // có thể trigger grow
    }
    fmt.Println(v)
}
```

**Vì sao nguy hiểm?** `range` đánh giá `nums` **một lần** ở đầu loop và lưu lại địa chỉ + len. Khi `append` trigger grow capacity, slice header mới trỏ vào array mới, nhưng range vẫn duyệt array cũ → có thể vẫn thấy data cũ hoặc data partially-written tuỳ implementation.

**Quy tắc an toàn**: không bao giờ modify cấu trúc đang range. Nếu cần thêm phần tử khi duyệt, tạo collector riêng:

```go
toAdd := []int{}
for _, v := range nums {
    if v == 2 {
        toAdd = append(toAdd, 99)
    }
}
nums = append(nums, toAdd...)
```

## 🔁 Dừng lại tự kiểm tra

<details><summary>Q1: Cú pháp Go cho "lặp x từ 0 đến hết slice xs, in từng phần tử"?</summary>

```go
for _, x := range xs {
    fmt.Println(x)
}
```
Hoặc nếu cần index: `for i, x := range xs { ... }`.
</details>

<details><summary>Q2: Code này in gì với Go 1.21?</summary>

```go
funcs := []func(){}
for _, v := range []int{1, 2, 3} {
    funcs = append(funcs, func() { fmt.Println(v) })
}
for _, f := range funcs {
    f()
}
```
In `3 3 3` — vì `v` là một biến duy nhất dùng chung 3 vòng (Go 1.21 trở xuống), closure capture biến. Đến khi gọi `f()`, `v` đã = 3 (giá trị cuối).
Với Go 1.22+, cũng code này in `1 2 3` (semantics đổi).
</details>

<details><summary>Q3: Vì sao `for i := range "héllo"` không in `0 1 2 3 4` mà nhảy index?</summary>

Vì range string trả **byte index**, không phải char index. `é` chiếm 2 byte UTF-8 (0xC3 0xA9), nên index sau `é` là 3 chứ không phải 2. Output là `0 1 3 4 5`.
</details>

<details><summary>Q4: Khi nào BẮT BUỘC dùng labeled break?</summary>

Khi cần thoát ngay **nhiều loop lồng nhau** mà không muốn dùng flag + check ở loop ngoài. Ví dụ: tìm phần tử trong matrix 2D — gặp target → muốn thoát cả 2 loop ngay. Nếu chỉ có 1 loop hoặc cleanup bằng `return` được thì không cần label.
</details>

## Bài tập

> Cố giải hết rồi mới mở phần "Lời giải chi tiết". Code được đặt sẵn skeleton trong [solutions.go](./solutions.go) khi user yêu cầu — nếu không có, viết file Go riêng để chạy.

### BT1 — Tổng các số chia hết cho 3 trong 1..100

Viết hàm `sumDivBy3()` trả về tổng tất cả số nguyên từ 1 đến 100 chia hết cho 3.

**Test**: `sumDivBy3() == 1683`.

### BT2 — Số lớn nhất trong slice

Viết hàm `maxInt(nums []int) int` trả về phần tử lớn nhất. Giả sử slice **không rỗng**.

**Test**:
- `maxInt([]int{3, 1, 4, 1, 5, 9, 2, 6}) == 9`
- `maxInt([]int{-3, -1, -4}) == -1`
- `maxInt([]int{42}) == 42`

### BT3 — Tần suất ký tự

Viết hàm `charFreq(s string) map[rune]int` đếm số lần xuất hiện mỗi ký tự (rune) trong chuỗi `s`.

**Test**: `charFreq("hello")` → `{'h': 1, 'e': 1, 'l': 2, 'o': 1}`.

Gợi ý: range string trả rune, dùng map làm counter.

### BT4 — Two-sum (O(n²))

Viết hàm `twoSum(nums []int, target int) (int, int, bool)` trả về `(i, j, true)` nếu tồn tại `i < j` sao cho `nums[i] + nums[j] == target`; ngược lại trả `(-1, -1, false)`.

**Test**:
- `twoSum([]int{2, 7, 11, 15}, 9)` → `(0, 1, true)` (vì 2+7=9).
- `twoSum([]int{3, 2, 4}, 6)` → `(1, 2, true)` (vì 2+4=6).
- `twoSum([]int{1, 2, 3}, 100)` → `(-1, -1, false)`.

Yêu cầu: **dùng 2 loop lồng (O(n²))** — phiên bản O(n) bằng map sẽ học ở L13.

### BT5 — Detect và sửa bug closure

Cho đoạn code sau (đang dùng `go.mod` declare `go 1.21`):

```go
func bug() []int {
    results := make([]int, 0, 3)
    var wg sync.WaitGroup
    var mu sync.Mutex
    for _, v := range []int{10, 20, 30} {
        wg.Add(1)
        go func() {
            defer wg.Done()
            mu.Lock()
            results = append(results, v*2)
            mu.Unlock()
        }()
    }
    wg.Wait()
    return results
}
```

**Yêu cầu**:
1. Dự đoán output có thể có khi chạy nhiều lần.
2. Sửa code để output **luôn là** một permutation của `[20, 40, 60]` (mọi thứ tự đều OK).

## Lời giải chi tiết

### Lời giải BT1

```go
func sumDivBy3() int {
    sum := 0
    for i := 1; i <= 100; i++ {
        if i%3 == 0 {
            sum += i
        }
    }
    return sum
}
```

**Cách 2 — bước nhảy 3:**

```go
func sumDivBy3() int {
    sum := 0
    for i := 3; i <= 100; i += 3 {
        sum += i
    }
    return sum
}
```

**Kiểm chứng bằng số**: số chia hết 3 trong 1..100 là `3, 6, ..., 99` — có 33 số, tổng = `3·(1+2+...+33) = 3·33·34/2 = 3·561 = 1683`. ✓

**Độ phức tạp**: O(n) với n = 100 — không tối ưu được nhanh hơn ở mức readable.

### Lời giải BT2

```go
func maxInt(nums []int) int {
    maxVal := nums[0] // KHÔNG khởi tạo bằng 0 — sẽ sai với slice toàn số âm
    for _, x := range nums[1:] {
        if x > maxVal {
            maxVal = x
        }
    }
    return maxVal
}
```

**Walk-through cho `[-3, -1, -4]`**:
- `maxVal = -3` (phần tử đầu)
- Vòng 0: `x = -1`, `-1 > -3`? Có → `maxVal = -1`.
- Vòng 1: `x = -4`, `-4 > -1`? Không → giữ nguyên.
- Trả `-1`. ✓

**Độ phức tạp**: O(n) — phải duyệt mọi phần tử để chắc chắn không sót max.

### Lời giải BT3

```go
func charFreq(s string) map[rune]int {
    freq := make(map[rune]int)
    for _, r := range s {
        freq[r]++ // map zero-value của int là 0, ++ an toàn
    }
    return freq
}
```

**Walk-through cho `"hello"`**:
- `r = 'h'`: `freq['h']` chưa có → zero value 0 → `++` thành 1.
- `r = 'e'`: 0 → 1.
- `r = 'l'`: 0 → 1.
- `r = 'l'`: 1 → 2.
- `r = 'o'`: 0 → 1.
- Kết quả: `{'h':1, 'e':1, 'l':2, 'o':1}`. ✓

**Tại sao range string thay vì `s[i]`?** Vì cần đúng `rune` cho ký tự Unicode. Với `"héllo"`, `s[1]` là byte `0xC3`, không phải `'é'` — bug ngay.

**Độ phức tạp**: O(n) với n = số rune.

### Lời giải BT4

```go
func twoSum(nums []int, target int) (int, int, bool) {
    for i := 0; i < len(nums); i++ {
        for j := i + 1; j < len(nums); j++ {
            if nums[i]+nums[j] == target {
                return i, j, true
            }
        }
    }
    return -1, -1, false
}
```

**Tại sao `j := i + 1`?** Tránh:
- `i == j` (cùng phần tử dùng 2 lần — không hợp lệ).
- Đếm cặp 2 lần (i=0,j=1 và i=1,j=0 là cùng một cặp).

**Walk-through cho `[2, 7, 11, 15]`, target=9**:
- i=0 (nums[i]=2):
  - j=1 (nums[j]=7): 2+7=9 ✓ → trả `(0, 1, true)`.
- Dừng.

**Độ phức tạp**: O(n²) — case xấu nhất duyệt mọi cặp. Phiên bản O(n) dùng map sẽ học ở L13.

### Lời giải BT5

**Phần 1 — Dự đoán output (Go 1.21 trở xuống)**:

Closure capture `v` (cùng một biến). Loop chạy nhanh, sau khi xong cả 3 goroutine mới bắt đầu read `v` → cả 3 đều đọc giá trị **cuối cùng** của `v = 30`. Output là `[60, 60, 60]` (theo thứ tự lock acquire ngẫu nhiên — nhưng giá trị cùng là 60).

Lưu ý: nếu goroutine chạy đan xen (rất hiếm với loop ngắn), có thể thấy `[20, 40, 60]` đúng nhưng KHÔNG đáng tin — race condition về giá trị.

**Phần 2 — Sửa code**:

**Cách 1 — Shadow biến** (phổ biến nhất, tương thích mọi version Go):

```go
for _, v := range []int{10, 20, 30} {
    v := v // ← thêm dòng này
    wg.Add(1)
    go func() {
        defer wg.Done()
        mu.Lock()
        results = append(results, v*2)
        mu.Unlock()
    }()
}
```

**Cách 2 — Truyền qua tham số**:

```go
for _, v := range []int{10, 20, 30} {
    wg.Add(1)
    go func(v int) {
        defer wg.Done()
        mu.Lock()
        results = append(results, v*2)
        mu.Unlock()
    }(v)
}
```

**Cách 3 — Nâng `go.mod` lên `go 1.22`**: bug tự biến mất nhờ semantics mới. Nhưng nếu code còn deploy ở môi trường legacy thì không an toàn — nên giữ thói quen shadow để đảm bảo.

**Output sau sửa**: `[20, 40, 60]` theo thứ tự nào đó (vì 3 goroutine concurrent — thứ tự `mu.Lock()` ngẫu nhiên), nhưng giá trị **luôn là permutation** của `[20, 40, 60]`. ✓

## Code & Minh hoạ

- [solutions.go](./solutions.go) — chỉ tạo khi user yêu cầu rõ ràng; gồm code chạy được cho cả 5 bài tập, các pattern, và demo closure pitfall.
- [visualization.html](./visualization.html) — 3 module tương tác: Loop Visualizer (animate từng iteration với input slice tự sửa), Range vs C-style trên UTF-8 string, Labeled Break trên matrix 4×4.

## Bài tiếp theo

- **L11 — Hàm**: định nghĩa hàm, multiple return, named return, variadic, closure (sẽ gặp lại pitfall closure-trong-loop ở dạng tổng quát).
- **L12 — Slice & Map sâu**: capacity, grow strategy, range pitfall khi modify, map internals.
- **L13 — Strings & Bytes**: byte vs rune chi tiết, `[]rune(s)`, `unicode/utf8` package, walk-through two-sum O(n) bằng map.
