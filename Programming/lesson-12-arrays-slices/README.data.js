// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: Programming/lesson-12-arrays-slices/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 12 — Array & Slice

> Tier 1 · Go Basic · Lesson 12 / 17
> Tiền đề: [L11 — Hàm](../lesson-11-functions/README.md). Sau bài này: [L13 — Map](../lesson-13-maps/README.md).

## Mục tiêu học tập

Kết thúc bài này, bạn sẽ:

1. Phân biệt **array** (size cố định, là phần của type) với **slice** (size động).
2. Hiểu slice là **struct 3 field**: \`ptr\` (con trỏ tới underlying array) + \`len\` + \`cap\`.
3. Trace được \`len\` và \`cap\` qua nhiều lần \`append\`, biết khi nào Go re-allocate.
4. Tránh được **bug chia sẻ underlying array** — bug Go nổi tiếng đứng top trong code production.
5. Viết được các slice trick thông dụng: remove, insert, reverse, dedupe, filter in-place.
6. Phân biệt **nil slice** và **empty slice**, hiểu vì sao trong JSON nó khác nhau.
7. Hiểu khi nào pass slice vào function thì caller thấy thay đổi, khi nào không.
8. Pre-allocate slice đúng để code hot-path không tốn allocations vô ích.

> Slice là cấu trúc bạn sẽ dùng **mỗi giờ trong mọi project Go**. Bug slice (đặc biệt chia sẻ underlying array) là loại bug khó truy nhất với người mới. Hiểu sai 5% sẽ trả giá ở Tier 2-3.

---

## 1. Array — fixed size

### 1.1 Định nghĩa

Array trong Go là dãy có **số phần tử cố định ở compile time**:

\`\`\`go
var a [5]int                    // 5 phần tử int, mặc định 0
b := [3]string{"a", "b", "c"}   // literal, đủ 3 phần tử
c := [...]int{1, 2, 3, 4}       // compiler đếm hộ → [4]int
d := [5]int{1: 10, 4: 99}       // chỉ định index → [0, 10, 0, 0, 99]
\`\`\`

💡 **Trực giác**: Array giống một **dãy tủ khoá fixed-size** đặt trong stack frame của function. Khoá nào ở vị trí nào, kích thước bao nhiêu — đã quyết định lúc đúc tủ (compile time), không nới được.

### 1.2 Size là phần của TYPE

Đây là điểm khác biệt lớn nhất so với mảng trong nhiều ngôn ngữ khác:

\`\`\`go
var a [3]int
var b [4]int
a = b  // ❌ Compile error: cannot use b (type [4]int) as type [3]int
\`\`\`

\`[3]int\` và \`[4]int\` là **hai type khác nhau**, không cast được, không assign được. Lý do: compiler cần biết kích thước stack frame chính xác.

### 1.3 Pass-by-value → COPY toàn bộ

\`\`\`go
func modify(arr [5]int) {
    arr[0] = 999  // chỉ sửa BẢN COPY
}

func main() {
    a := [5]int{1, 2, 3, 4, 5}
    modify(a)
    fmt.Println(a) // [1 2 3 4 5] — KHÔNG ĐỔI
}
\`\`\`

Khi truyền \`[1000]int\` vào function → Go copy **8 KB** lên stack. Hiếm khi đây là điều bạn muốn. Đó là lý do trong code Go production bạn **gần như không bao giờ thấy array trực tiếp** — luôn dùng slice (hoặc pointer-to-array nếu thật sự cần fixed size).

⚠ **Lỗi thường gặp**: tưởng array hoạt động như reference (như Python list, Java array). Nó không. Phải \`*[5]int\` mới là reference.

### 1.4 Khi nào dùng array?

- Hằng số nhỏ ở compile time: \`var weekdays = [7]string{...}\`.
- Buffer fixed size cho protocol: \`var hdr [16]byte\` (TCP header).
- Key của map (slice không phải là comparable, nhưng array là): \`map[[32]byte]bool\` (SHA-256 hash).
- 99% còn lại — dùng slice.

### 📝 Tóm tắt mục 1

- Array: \`[N]T\` — N là phần của type.
- Pass-by-value → COPY toàn bộ phần tử.
- Hiếm dùng trực tiếp; thường ở dưới dạng underlying của slice.

---

## 2. Slice — variable size

### 2.1 Định nghĩa

Slice là **view động** lên một array. Cú pháp \`[]T\` (không có số ở trong \`[]\`):

\`\`\`go
s1 := []int{1, 2, 3}            // literal, len=3, cap=3
s2 := make([]int, 5)            // len=5, cap=5, tất cả là 0
s3 := make([]int, 0, 10)        // len=0, cap=10 (dự phòng 10 chỗ)
s4 := []string(nil)             // nil slice, len=0, cap=0
arr := [5]int{10, 20, 30, 40, 50}
s5 := arr[1:4]                  // slice trên array có sẵn: [20, 30, 40]
\`\`\`

💡 **Trực giác**: Slice **không tự sở hữu data** — nó chỉ là một "kính lúp" chỉ vào một đoạn của một array nào đó. Hai slice khác nhau có thể đang nhìn cùng một array.

### 2.2 Slice = struct 3 field

Trong runtime, slice là một struct 24 bytes (trên 64-bit):

\`\`\`
type sliceHeader struct {
    Data unsafe.Pointer  // 8 bytes — trỏ tới phần tử ĐẦU
    Len  int             // 8 bytes — số phần tử hiện có
    Cap  int             // 8 bytes — capacity từ Data tới hết array
}
\`\`\`

ASCII art:

\`\`\`
Slice header (24 bytes):
+-----------+-----+-----+
|   Data    | Len | Cap |
+-----------+-----+-----+
      |
      v
Underlying array:
+----+----+----+----+----+----+----+----+
| 10 | 20 | 30 | 40 | 50 |  ?  |  ?  |  ?  |
+----+----+----+----+----+----+----+----+
            ^               ^                    ^
            Data            Data+Len             Data+Cap
\`\`\`

❓ **Câu hỏi tự nhiên**:
- *"Nếu slice chỉ 24 bytes, vậy phần tử ở đâu?"* → Ở underlying array trên heap (hoặc stack nếu escape analysis chứng minh được không escape).
- *"Copy slice (\`t := s\`) có copy data không?"* → KHÔNG. Chỉ copy 24 bytes header. Hai slice cùng trỏ về một array. Đây là nguồn của 90% bug slice.

### 2.3 Bốn cách tạo slice — đối chiếu

\`\`\`go
// 1. Literal — len=cap=3
s := []int{1, 2, 3}

// 2. make với len — len=5, cap=5, zero-valued
s := make([]int, 5)

// 3. make với len và cap — len=0, cap=10
//    Hữu ích khi biết trước upper bound, tránh nhiều lần grow
s := make([]int, 0, 10)

// 4. Slice từ array — share underlying array
arr := [5]int{1, 2, 3, 4, 5}
s := arr[1:4]  // len=3, cap=4 (từ index 1 tới cuối array)
\`\`\`

### 📝 Tóm tắt mục 2

- \`[]T\` là type slice (KHÔNG có số bên trong \`[]\`).
- Slice = \`{ptr, len, cap}\` 24 bytes.
- \`make([]T, len, cap)\` cho phép pre-allocate cap.
- Slice là view → nhiều slice có thể share array.

---

## 3. \`len\` vs \`cap\`

### 3.1 Định nghĩa

- \`len(s)\` = **số phần tử hiện có** (bạn truy cập được từ \`s[0]\` tới \`s[len(s)-1]\`).
- \`cap(s)\` = **capacity** = số phần tử **có thể chứa** mà không cần re-allocate.

\`\`\`go
s := make([]int, 3, 8)
fmt.Println(len(s), cap(s))  // 3 8

s = append(s, 4)
fmt.Println(len(s), cap(s))  // 4 8 (in-place, không alloc)

s = append(s, 5, 6, 7, 8, 9)
fmt.Println(len(s), cap(s))  // 9 16 (vượt cap → alloc array mới)
\`\`\`

### 3.2 Slice trên array — minh hoạ len/cap

\`\`\`go
arr := [8]int{10, 20, 30, 40, 50, 60, 70, 80}
s := arr[2:5]  // s = [30, 40, 50]
\`\`\`

\`\`\`
arr (index):   0    1    2    3    4    5    6    7
arr (value):  [10][20][30][40][50][60][70][80]
                    └─ s.Data
                       len=3 ──┐
                       cap=6 ──────────────────────┐
                       ↑                            ↑
                       s[0]  s[1]  s[2]            slot trống
                                   (s[2:5][2])    (capacity tới hết arr)
\`\`\`

- \`len(s) = 5 - 2 = 3\` (end - start)
- \`cap(s) = len(arr) - 2 = 6\` (từ start tới hết underlying array)
- Truy cập \`s[3]\` → panic (index out of range), nhưng \`s[:6]\` (re-slice mở rộng tới cap) → hợp lệ, được \`[30, 40, 50, 60, 70, 80]\`.

### 3.3 Re-slice mở rộng

Bạn có thể re-slice tới \`cap\`, không chỉ tới \`len\`:

\`\`\`go
s := make([]int, 3, 8)  // [0 0 0], cap=8
s = s[:6]               // [0 0 0 0 0 0], len=6, cap=8 ✓
s = s[:9]               // ❌ panic: slice bounds out of range [:9] with capacity 8
\`\`\`

⚠ **Lỗi thường gặp**: Tưởng \`s[:n]\` cần \`n ≤ len(s)\`. Thực ra điều kiện là \`n ≤ cap(s)\`. Đây là cách dùng để "hé lộ" dần phần tử trong buffer pre-allocate.

### 🔁 Dừng lại tự kiểm tra

\`\`\`go
s := make([]int, 4, 10)
s[0] = 7
t := s[1:3]
\`\`\`

Hỏi: \`len(t)\`, \`cap(t)\`, \`t[0]\` là gì?

<details>
<summary>Đáp án</summary>

- \`len(t) = 3 - 1 = 2\`.
- \`cap(t) = cap(s) - 1 = 9\` (từ vị trí start mới \`1\` tới hết cap của s).
- \`t[0] = s[1] = 0\` (zero value vì \`s[1]\` chưa được gán).

</details>

### 📝 Tóm tắt mục 3

- \`len\` = số phần tử hiện có; \`cap\` = sức chứa từ start tới hết underlying.
- \`cap\` luôn ≥ \`len\`.
- Có thể re-slice tới \`cap\` mà không cần \`append\`.

---

## 4. \`append\` — phép toán quan trọng nhất của slice

### 4.1 Cú pháp

\`\`\`go
s = append(s, 4)              // thêm 1 phần tử
s = append(s, 4, 5, 6)        // thêm nhiều
s = append(s, other...)       // spread (variadic) — append toàn bộ slice khác
\`\`\`

⚠ **Luôn gán lại**: \`append\` **trả về slice mới** (có thể là cùng header, có thể không). Không gán lại = bug.

### 4.2 Cơ chế — in-place vs re-allocate

\`\`\`
Trường hợp 1: len < cap → in-place (không alloc)
  s = [1, 2, 3], len=3, cap=5
  append(s, 4):
    arr[3] = 4
    s.Len = 4
  Trả về header mới {Data: cùng ptr, Len: 4, Cap: 5}
  Underlying array KHÔNG đổi.

Trường hợp 2: len == cap → grow
  s = [1, 2, 3], len=3, cap=3
  append(s, 4):
    1. Allocate array mới, capacity gấp đôi (hoặc theo công thức growth)
    2. Copy 3 phần tử cũ sang
    3. Đặt 4 vào index 3
    4. Trả về header {Data: ptr mới, Len: 4, Cap: 6}
  Slice CŨ vẫn trỏ về array cũ (đã orphan, GC sẽ thu).
\`\`\`

### 4.3 Growth pattern thực tế

Go runtime dùng công thức (đơn giản hoá):

- Nếu \`cap < 256\`: nhân đôi.
- Nếu \`cap ≥ 256\`: tăng theo \`newcap = oldcap + (oldcap + 3*256) / 4\` (~25%).

Trace 10 lần \`append\` vào slice rỗng (Go ≥ 1.18, có thể khác tuỳ version):

| Sau lần append | len | cap | Có alloc? |
|---:|---:|---:|:---:|
| 1 | 1 | 1 | ✓ |
| 2 | 2 | 2 | ✓ |
| 3 | 3 | 4 | ✓ |
| 4 | 4 | 4 | — |
| 5 | 5 | 8 | ✓ |
| 6 | 6 | 8 | — |
| 7 | 7 | 8 | — |
| 8 | 8 | 8 | — |
| 9 | 9 | 16 | ✓ |
| 10 | 10 | 16 | — |

Pattern: cap chỉ tăng khi \`len == cap\`, và mỗi lần tăng là gấp đôi (cho size nhỏ). Trong 10 lần append, có 5 lần thực sự alloc mới.

❓ **Câu hỏi tự nhiên**:
- *"Tại sao gấp đôi mà không phải +1?"* → Amortize: dù grow tốn $O(n)$, nhưng trung bình mỗi \`append\` chỉ tốn $O(1)$. Nếu +1 mỗi lần → $O(n^2)$ tổng.
- *"Có thể ép Go grow ít hơn không?"* → Có, bằng \`make([]T, 0, n)\` ngay từ đầu. Xem mục 11.

### 4.4 \`append\` spread — gộp 2 slice

\`\`\`go
a := []int{1, 2, 3}
b := []int{4, 5, 6}
c := append(a, b...)  // [1, 2, 3, 4, 5, 6]
\`\`\`

\`b...\` "tháo" b ra thành các đối số rời, tương đương \`append(a, 4, 5, 6)\`.

### 📝 Tóm tắt mục 4

- \`append\` **có thể** alloc array mới, **luôn gán lại** kết quả.
- Khi \`len == cap\` → grow (thường ×2 cho slice nhỏ).
- Amortized cost của n lần append = $O(n)$.

---

## 5. Slice sharing underlying array — GOTCHA quan trọng nhất

Đây là **bug nổi tiếng nhất** với người mới học Go. Đọc kỹ.

### 5.1 Ví dụ kinh điển

\`\`\`go
s := []int{1, 2, 3, 4, 5}
t := s[1:3]              // t = [2, 3]
t[0] = 99
fmt.Println(s)           // [1, 99, 3, 4, 5]  ← s ĐÃ ĐỔI!
fmt.Println(t)           // [99, 3]
\`\`\`

💡 **Vì sao**: \`s[1:3]\` không **copy** dữ liệu. Nó chỉ tạo một slice header mới trỏ vào **cùng underlying array** với \`s\`. Sửa \`t[0]\` chính là sửa \`arr[1]\` mà cả \`s\` lẫn \`t\` đều trỏ tới.

### 5.2 Pitfall #1 — Function modify slice

\`\`\`go
func zeroOut(s []int) {
    for i := range s {
        s[i] = 0
    }
}

orig := []int{1, 2, 3, 4, 5}
zeroOut(orig[1:4])
fmt.Println(orig)  // [1, 0, 0, 0, 5] — orig bị sửa!
\`\`\`

Đây thường là điều bạn **muốn** (ví dụ \`sort.Ints(buf)\` muốn sort tại chỗ), nhưng nếu không cẩn thận, bạn đi đưa "một góc" của data internal cho function bên ngoài, function sửa → bạn không biết.

### 5.3 Pitfall #2 — Append vào sub-slice ghi đè parent

\`\`\`go
s := []int{1, 2, 3, 4, 5}
t := s[:2]              // t = [1, 2], cap = 5 (TỚI HẾT s)
t = append(t, 99)       // t.len < t.cap → in-place: arr[2] = 99
fmt.Println(s)          // [1, 2, 99, 4, 5]  ← s[2] BỊ GHI ĐÈ!
fmt.Println(t)          // [1, 2, 99]
\`\`\`

Đây là pitfall **âm thầm và độc**. Bạn tưởng \`append\` tạo data mới → nó không, vì \`cap(t) > len(t)\`. Có 2 slice cùng trỏ về array; append qua một slice ghi đè vào "vùng nhìn được" của slice kia.

### 5.4 Pitfall #3 — Sub-slice keep alive cả array gốc

\`\`\`go
func firstThree(s []int) []int {
    return s[:3]  // chỉ 3 phần tử, nhưng giữ tham chiếu tới TOÀN BỘ array
}

huge := make([]int, 1_000_000)
small := firstThree(huge)
// \`huge\` không còn được dùng, nhưng GC không thể thu hồi vì \`small\`
// vẫn trỏ vào array gốc của nó!
\`\`\`

Bug: app đáng lẽ chỉ dùng 3 ints (24 bytes) nhưng giữ 8 MB không thể GC.

**Fix**: copy hoàn toàn ra slice mới.

\`\`\`go
func firstThree(s []int) []int {
    out := make([]int, 3)
    copy(out, s[:3])
    return out
    // hoặc 1 dòng:
    // return append([]int(nil), s[:3]...)
}
\`\`\`

### 5.5 Cách fix chung — "copy defensive"

Khi muốn slice mới **độc lập** với parent:

\`\`\`go
// Cách 1 — make + copy
t := make([]int, len(src))
copy(t, src)

// Cách 2 — append vào nil slice (1 dòng, idiomatic)
t := append([]int(nil), src...)

// Cách 3 (Go ≥ 1.21) — slices.Clone từ stdlib
import "slices"
t := slices.Clone(src)
\`\`\`

⚠ **Lỗi thường gặp**: \`t := s\` — chỉ copy 24-byte header. Hai slice vẫn share. Đây không phải copy.

### 📝 Tóm tắt mục 5

- \`t := s[a:b]\` KHÔNG copy data — share underlying array.
- Sửa \`t[i]\` = sửa \`s[i+a]\`.
- Append vào sub-slice có thể ghi đè parent nếu cap đủ.
- Sub-slice giữ alive cả array gốc → memory leak.
- Muốn độc lập: \`slices.Clone(s)\` hoặc \`append([]int(nil), s...)\`.

---

## 6. \`copy\` — copy phần tử giữa 2 slice

\`\`\`go
n := copy(dst, src)
// n = min(len(dst), len(src))
\`\`\`

\`copy\` chỉ chạm tới \`len(dst)\` slot đầu của dst — **không grow dst**. Nếu muốn dst chứa hết src, dst phải có \`len ≥ len(src)\`.

\`\`\`go
src := []int{1, 2, 3, 4, 5}
dst := make([]int, 3)
n := copy(dst, src)  // n = 3, dst = [1, 2, 3]

dst2 := make([]int, 10)
n2 := copy(dst2, src)  // n2 = 5, dst2 = [1, 2, 3, 4, 5, 0, 0, 0, 0, 0]
\`\`\`

**Use case thực tế — pagination**:

\`\`\`go
const pageSize = 20

func page(all []User, pageIdx int) []User {
    start := pageIdx * pageSize
    if start >= len(all) {
        return nil
    }
    end := start + pageSize
    if end > len(all) {
        end = len(all)
    }
    // Defensive copy — caller có thể modify mà không ảnh hưởng all
    out := make([]User, end-start)
    copy(out, all[start:end])
    return out
}
\`\`\`

### 📝 Tóm tắt mục 6

- \`copy(dst, src)\` copy \`min(len(dst), len(src))\` phần tử.
- KHÔNG grow dst — phải pre-size.
- Pattern chuẩn để break shared-array.

---

## 7. Slice tricks

Tổng hợp 6 trick gặp hàng ngày (kèm code thực).

### 7.1 Remove phần tử tại index \`i\`

**Cách A — preserve order, $O(n)$**:

\`\`\`go
s = append(s[:i], s[i+1:]...)
\`\`\`

Walk-through \`s = [10, 20, 30, 40, 50]\`, \`i = 2\`:

\`\`\`
s[:2]   = [10, 20]
s[3:]   = [40, 50]
append([10, 20], 40, 50) → [10, 20, 40, 50]
\`\`\`

⚠ Lưu ý: trick này **modify in-place** underlying array (vì \`append\` vào slice có cap dư). Sau lệnh, \`s\` của caller (nếu được pass vào function) có thể bị ghi đè phần đuôi → xem mục 9.

**Cách B — KHÔNG preserve order, $O(1)$** (swap with last):

\`\`\`go
s[i] = s[len(s)-1]
s = s[:len(s)-1]
\`\`\`

\`s = [10, 20, 30, 40, 50]\`, \`i = 1\`:
- \`s[1] = s[4]\` → \`s = [10, 50, 30, 40, 50]\`
- \`s = s[:4]\` → \`[10, 50, 30, 40]\`

Dùng khi thứ tự không quan trọng (set-like, free-list).

### 7.2 Insert phần tử \`x\` tại index \`i\`

\`\`\`go
s = append(s[:i], append([]int{x}, s[i:]...)...)
\`\`\`

Walk \`s = [10, 20, 30]\`, insert \`99\` tại \`i=1\`:

\`\`\`
s[i:]                       = [20, 30]
append([99], [20, 30]...)   = [99, 20, 30]
s[:1]                       = [10]
append([10], [99, 20, 30]...) = [10, 99, 20, 30] ✓
\`\`\`

Hoặc cách rõ ràng hơn (Go 1.21+):

\`\`\`go
import "slices"
s = slices.Insert(s, i, x)
\`\`\`

### 7.3 Reverse in-place — 2 pointer

\`\`\`go
func reverse(s []int) {
    for i, j := 0, len(s)-1; i < j; i, j = i+1, j-1 {
        s[i], s[j] = s[j], s[i]
    }
}
\`\`\`

\`s = [1, 2, 3, 4, 5]\`:
- i=0, j=4 → swap → [5, 2, 3, 4, 1]
- i=1, j=3 → swap → [5, 4, 3, 2, 1]
- i=2, j=2 → dừng

### 7.4 Clear — giữ cap vs giải phóng

\`\`\`go
s = s[:0]   // len=0, cap giữ nguyên. Tốt nếu sắp ghi tiếp.
s = nil     // giải phóng underlying array (nếu không ai khác trỏ).
clear(s)    // Go 1.21+: ZERO mọi phần tử nhưng giữ len/cap.
\`\`\`

❓ **Khi nào dùng gì?**
- Loop tái sử dụng buffer: \`s = s[:0]\` để khỏi alloc mới.
- Drop slice không còn dùng: \`s = nil\` để GC.
- Reset bộ đệm có data nhạy cảm (password, key): \`clear(s)\` để xoá nội dung.

### 7.5 Dedupe slice **đã sắp xếp**

\`\`\`go
func dedupeSorted(s []int) []int {
    if len(s) < 2 {
        return s
    }
    j := 1
    for i := 1; i < len(s); i++ {
        if s[i] != s[i-1] {
            s[j] = s[i]
            j++
        }
    }
    return s[:j]
}
\`\`\`

Walk \`[1, 1, 2, 2, 2, 3, 4, 4]\`:

| i | s[i] | s[i-1] | khác? | j (trước) | s sau gán | j (sau) |
|---|---|---|---|---|---|---|
| 1 | 1 | 1 | no | 1 | — | 1 |
| 2 | 2 | 1 | yes | 1 | [1,2,2,2,2,3,4,4] | 2 |
| 3 | 2 | 2 | no | 2 | — | 2 |
| 4 | 2 | 2 | no | 2 | — | 2 |
| 5 | 3 | 2 | yes | 2 | [1,2,3,2,2,3,4,4] | 3 |
| 6 | 4 | 3 | yes | 3 | [1,2,3,4,2,3,4,4] | 4 |
| 7 | 4 | 4 | no | 4 | — | 4 |

Cuối cùng \`s[:4] = [1, 2, 3, 4]\`. Phần đuôi vẫn còn rác trong cap nhưng không nhìn được qua slice trả về.

⚠ **Lưu ý**: trick này yêu cầu **đã sort**. Với slice chưa sort, dùng map (xem L13) hoặc sort trước.

### 7.6 Filter in-place

\`\`\`go
func filterEven(s []int) []int {
    n := 0
    for _, v := range s {
        if v%2 == 0 {
            s[n] = v
            n++
        }
    }
    return s[:n]
}
\`\`\`

\`[1, 2, 3, 4, 5, 6]\` → \`[2, 4, 6]\`. Pattern: dùng 2 con trỏ — \`n\` cho output, biến chạy cho input. Không alloc thêm.

### 📝 Tóm tắt mục 7

- Remove preserve order: \`append(s[:i], s[i+1:]...)\`.
- Remove fast (no order): swap with last + drop.
- Insert: nested append.
- Reverse: 2-pointer swap.
- Clear: \`s[:0]\` giữ cap; \`nil\` giải phóng; \`clear(s)\` zero data.
- Dedupe sorted, filter in-place: 2-pointer pattern.

---

## 8. \`nil\` slice vs empty slice

### 8.1 So sánh

\`\`\`go
var a []int      // nil slice
b := []int{}     // empty slice (literal rỗng)
c := make([]int, 0)  // empty slice

fmt.Println(a == nil)   // true
fmt.Println(b == nil)   // false
fmt.Println(c == nil)   // false

fmt.Println(len(a), cap(a))  // 0 0
fmt.Println(len(b), cap(b))  // 0 0
\`\`\`

Cả 3 đều \`len = 0\`, \`cap = 0\`. Khác nhau ở:

| | nil | empty |
|---|---|---|
| \`Data\` pointer | 0 (nil) | non-nil (con trỏ tới zero-length array) |
| \`== nil\` | true | false |
| JSON encode | \`null\` | \`[]\` |
| \`append\` vào | OK (tự allocate) | OK |
| \`range\` | OK (0 iteration) | OK |

### 8.2 Vì sao khác biệt quan trọng — JSON

\`\`\`go
type Response struct {
    Items []string \`json:"items"\`
}

var r1 Response                          // r1.Items = nil
r2 := Response{Items: []string{}}        // r2.Items = []

json.Marshal(r1)  // {"items":null}
json.Marshal(r2)  // {"items":[]}
\`\`\`

Frontend code rất hay sập với \`null\`: \`data.items.length\` → TypeError. Trong API design, nhiều team chuẩn hoá: "luôn trả \`[]\` thay vì \`null\`".

💡 **Quy tắc thực dụng**:
- Nhận về **input** từ user/API: chấp nhận cả \`nil\` và \`[]\` như nhau (\`len(s) == 0\`).
- Trả về **output**: prefer \`[]\` (empty slice) để tránh \`null\` ở client.

### 📝 Tóm tắt mục 8

- \`nil\` slice: ptr=nil, \`== nil\` là true.
- Empty slice: ptr non-nil, \`== nil\` là false, JSON ra \`[]\` không \`null\`.
- Cả 2 đều \`len=cap=0\`, \`range\`/\`append\` đều OK.

---

## 9. Function parameter — slice là "reference-like"

### 9.1 Pass slice = pass header

Khi gọi \`f(s)\`:
- Go copy 24-byte header (\`Data\`, \`Len\`, \`Cap\`) lên stack của f.
- Underlying array KHÔNG copy.
- → Hai slice (caller's và callee's) cùng trỏ về 1 array.

### 9.2 Modify ELEMENT trong function → caller thấy

\`\`\`go
func double(s []int) {
    for i := range s {
        s[i] *= 2
    }
}

s := []int{1, 2, 3}
double(s)
fmt.Println(s)  // [2, 4, 6] — caller THẤY thay đổi
\`\`\`

Vì \`s[i]\` chạm vào underlying array — cùng array với caller.

### 9.3 Append trong function → caller KHÔNG thấy

\`\`\`go
func tryAppend(s []int) {
    s = append(s, 99)  // local s đổi (header mới), không ảnh hưởng caller
}

s := []int{1, 2, 3}
tryAppend(s)
fmt.Println(s)  // [1, 2, 3] — KHÔNG có 99
\`\`\`

Vì \`append\` có thể trả về header mới. \`s\` trong function là **biến local** — gán lại nó không động vào biến \`s\` của caller (cả 2 là 2 biến header riêng).

❓ **Câu hỏi tự nhiên**: *"Nếu cap đủ, append không alloc, thì arr[3] = 99. Caller có thấy không?"* → Underlying array có \`99\` ở index 3, NHƯNG \`len\` của caller vẫn là 3 → caller nhìn \`s[0:3]\` không thấy \`99\`. Phải re-slice tới index 3 mới thấy. Đây là góc khuất rất dễ gây bug.

### 9.4 Cách đúng để function trả slice mở rộng

\`\`\`go
// Pattern 1 — return slice mới
func appendOne(s []int, x int) []int {
    return append(s, x)
}
s = appendOne(s, 99)  // gán lại

// Pattern 2 — pass pointer-to-slice (ít dùng, không idiomatic)
func appendInPlace(sp *[]int, x int) {
    *sp = append(*sp, x)
}
appendInPlace(&s, 99)
\`\`\`

⚠ **Quy tắc nhớ**:
- Modify element → caller thấy.
- Append → caller chỉ thấy nếu function trả slice mới và ta gán lại.

### 📝 Tóm tắt mục 9

- Pass slice = pass 24-byte header (ptr/len/cap), share array.
- \`s[i] = x\` trong function → caller thấy.
- \`s = append(s, x)\` trong function → caller KHÔNG thấy header mới.
- Để function append "ra ngoài": return slice mới, caller gán lại.

---

## 10. Multi-dimensional slice

Go không có \`[][]int\` builtin theo nghĩa matrix. Phải build từng row:

\`\`\`go
rows, cols := 3, 4
matrix := make([][]int, rows)
for i := range matrix {
    matrix[i] = make([]int, cols)
}

matrix[1][2] = 7  // ✓
\`\`\`

Có thể literal trực tiếp:

\`\`\`go
grid := [][]int{
    {1, 2, 3},
    {4, 5, 6},
    {7, 8, 9},
}
\`\`\`

⚠ **Pitfall — share row**: Nếu làm \`for i := range matrix { matrix[i] = sharedRow }\`, tất cả row trỏ về **cùng một slice** → sửa \`matrix[0][0]\` thì \`matrix[1][0]\` cũng đổi. Phải \`make\` riêng cho mỗi row.

**Use case batch processing**: chia dữ liệu 1000 record thành các batch 100:

\`\`\`go
func chunk(data []Record, n int) [][]Record {
    out := make([][]Record, 0, (len(data)+n-1)/n)
    for i := 0; i < len(data); i += n {
        end := i + n
        if end > len(data) {
            end = len(data)
        }
        out = append(out, data[i:end])
    }
    return out
}
\`\`\`

Lưu ý: các sub-slice trong \`out\` **share array** với \`data\` — không alloc thêm. Nhanh nhưng nếu function gọi modify một batch → ảnh hưởng \`data\`.

### 📝 Tóm tắt mục 10

- \`make([][]T, rows)\` rồi loop make từng row.
- Phải \`make\` riêng cho mỗi row, không share.
- \`chunk\` thường trả sub-slice share với input → cẩn thận khi modify.

---

## 11. Hiệu năng — pre-allocate

### 11.1 Vấn đề

Mỗi lần \`append\` mà \`len == cap\` → Go alloc array mới + copy. Lặp 10000 lần với cap 0 → ~14 lần alloc + 10000+8000+4000+... ≈ 20000 phần tử bị copy.

### 11.2 Pre-allocate đúng cap

\`\`\`go
// XẤU — 14 lần alloc
out := []int{}
for i := 0; i < 10000; i++ {
    out = append(out, i)
}

// TỐT — 1 lần alloc
out := make([]int, 0, 10000)
for i := 0; i < 10000; i++ {
    out = append(out, i)
}
\`\`\`

### 11.3 Benchmark thật

\`\`\`
BenchmarkAppendNoCap-8     5000   245000 ns/op   357648 B/op   15 allocs/op
BenchmarkAppendWithCap-8  30000    42000 ns/op    81920 B/op    1 allocs/op
\`\`\`

→ ~6× nhanh hơn, **15× ít allocation** hơn. Trong hot path (server xử lý request), khác biệt này quyết định bạn handle được 10k req/s hay 60k req/s.

### 11.4 Khi nào pre-allocate được?

- Biết trước SIZE: parse JSON \`[]X\` có biết length → alloc đúng.
- Biết upper bound: filter từ slice n phần tử → alloc cap = n (over-allocate chút không sao).
- Stream không biết size: chấp nhận grow, hoặc dùng \`sync.Pool\` để tái sử dụng buffer (Tier 3).

💡 **Trực giác**: cap như "đặt bàn" trước ở nhà hàng — đến đúng giờ không cần chờ ghép bàn. Còn \`len\` là số khách đã vào ngồi.

### 📝 Tóm tắt mục 11

- \`make([]T, 0, n)\` khi biết size → tránh $O(\\log n)$ lần alloc.
- Win lớn trong loop chạy nhiều / hot path.
- Khi không biết size: tạm chấp nhận grow, hoặc dùng \`sync.Pool\` (sau).

---

## Bài tập

### Bài tập 1 — Trace len/cap qua 8 lần append

Cho slice ban đầu \`var s []int\` (nil). Viết bảng \`len, cap\` sau mỗi lần \`append(s, x)\`, 8 lần liên tiếp. Đánh dấu lần nào alloc, lần nào in-place.

### Bài tập 2 — Đoán output (slice sharing pitfall)

\`\`\`go
// A
a := []int{1, 2, 3, 4, 5}
b := a[1:3]
b[0] = 99
fmt.Println(a, b)

// B
s := make([]int, 0, 5)
s = append(s, 1, 2, 3)
t := s[:2]
t = append(t, 88)
fmt.Println(s, t)

// C
s := []int{1, 2, 3}
func() {
    s := append(s, 99)
    s[0] = 999
}()
fmt.Println(s)
\`\`\`

Dự đoán output từng đoạn, giải thích vì sao.

### Bài tập 3 — \`removeAt(s []int, i int) []int\`

Viết hàm xoá phần tử tại index \`i\`, **preserve order**, trả về slice mới (đúng kiểu Go, không nhận \`*[]int\`). Hỏi: caller gọi \`s = removeAt(s, 2)\` có an toàn không? Nếu caller không gán lại thì sao?

### Bài tập 4 — \`reverse(s []int)\`

Viết hàm reverse **in-place** không alloc, không return.

### Bài tập 5 — \`dedupe(s []int) []int\` cho slice ĐÃ SẮP XẾP

Viết hàm dedupe in-place. Yêu cầu: $O(n)$ thời gian, $O(1)$ bộ nhớ phụ.

### Bài tập 6 — \`chunk(s []int, n int) [][]int\`

Chia \`s\` thành các block kích thước \`n\` (block cuối có thể ngắn hơn). \`n ≤ 0\` → trả \`nil\`. Yêu cầu: tránh alloc thừa — pre-allocate slice ngoài đúng số chunk.

---

## Lời giải chi tiết

### Lời giải BT1 — Trace len/cap

Slice \`nil\` ban đầu: \`len=0, cap=0\`.

| Lần append | len | cap | Hành động |
|:---:|:---:|:---:|---|
| 1 | 1 | 1 | alloc mới (cap 0 → 1) |
| 2 | 2 | 2 | alloc (1 → 2, double) |
| 3 | 3 | 4 | alloc (2 → 4, double) |
| 4 | 4 | 4 | in-place |
| 5 | 5 | 8 | alloc (4 → 8) |
| 6 | 6 | 8 | in-place |
| 7 | 7 | 8 | in-place |
| 8 | 8 | 8 | in-place |

5 lần alloc, 3 lần in-place. Pattern: alloc xảy ra khi \`len == cap\` trước append.

### Lời giải BT2 — Slice sharing

**A**:
\`\`\`
a := [1, 2, 3, 4, 5]
b := a[1:3]    // b = [2, 3], share array với a (b.Data = &a[1])
b[0] = 99      // ghi vào a[1]
→ a = [1, 99, 3, 4, 5], b = [99, 3]
\`\`\`

**B**:
\`\`\`
s := make([]int, 0, 5)   // len=0, cap=5
s = append(s, 1, 2, 3)   // s = [1,2,3], len=3, cap=5
t := s[:2]               // t = [1,2], cap=5 (giữ nguyên cap của s)
t = append(t, 88)        // len(t)=2 < cap(t)=5 → in-place: array[2] = 88
                         // t = [1, 2, 88], s vẫn len=3 nhưng s[2] giờ là 88
→ s = [1, 2, 88], t = [1, 2, 88]
\`\`\`

s[2] **bị ghi đè** từ 3 → 88. Đây là pitfall 5.3.

**C**:
\`\`\`
s := [1, 2, 3]              // cap=3
trong closure:
  s := append(s, 99)        // shadowed! local s, append cần grow (cap 3 → 6)
                            // local s = [1,2,3,99], là array MỚI
  s[0] = 999                // sửa local
→ outer s vẫn là [1, 2, 3] (KHÔNG đổi)
\`\`\`

Bẫy double: \`:=\` shadow biến outer + \`append\` cap đầy nên alloc array mới → mọi sửa local không động outer.

### Lời giải BT3 — \`removeAt\`

\`\`\`go
func removeAt(s []int, i int) []int {
    if i < 0 || i >= len(s) {
        return s  // hoặc panic, tuỳ contract
    }
    return append(s[:i], s[i+1:]...)
}
\`\`\`

**Caller cần gán lại**: \`s = removeAt(s, 2)\`. Nếu không gán → caller's \`s.Len\` vẫn cũ, nhưng underlying array đã bị shift trái → caller's \`s[i:]\` chứa data sai. Đây là invariant phải nhớ.

**Cảnh báo**: hàm này MODIFY underlying array của caller. Nếu caller có slice khác share array → cũng bị ảnh hưởng. Muốn an toàn tuyệt đối, copy trước:

\`\`\`go
func removeAt(s []int, i int) []int {
    out := make([]int, 0, len(s)-1)
    out = append(out, s[:i]...)
    out = append(out, s[i+1:]...)
    return out
}
\`\`\`

Trade-off: 1 alloc thêm, nhưng không có side-effect.

### Lời giải BT4 — \`reverse\`

\`\`\`go
func reverse(s []int) {
    for i, j := 0, len(s)-1; i < j; i, j = i+1, j-1 {
        s[i], s[j] = s[j], s[i]
    }
}
\`\`\`

Độ phức tạp: $O(n/2)$ ~ $O(n)$ thời gian, $O(1)$ bộ nhớ phụ. Caller thấy thay đổi vì modify element.

### Lời giải BT5 — \`dedupe\`

\`\`\`go
func dedupe(s []int) []int {
    if len(s) < 2 {
        return s
    }
    j := 1
    for i := 1; i < len(s); i++ {
        if s[i] != s[i-1] {
            s[j] = s[i]
            j++
        }
    }
    return s[:j]
}
\`\`\`

- Biến \`j\` là vị trí ghi tiếp theo trong "vùng kết quả".
- Walk-through đã có ở mục 7.5.
- $O(n)$ thời gian, $O(1)$ phụ. Phần đuôi (từ \`j\` tới \`len(s)\`) còn data cũ trong cap nhưng không truy cập qua slice trả về.

### Lời giải BT6 — \`chunk\`

\`\`\`go
func chunk(s []int, n int) [][]int {
    if n <= 0 {
        return nil
    }
    numChunks := (len(s) + n - 1) / n  // ceil(len/n)
    out := make([][]int, 0, numChunks)
    for i := 0; i < len(s); i += n {
        end := i + n
        if end > len(s) {
            end = len(s)
        }
        out = append(out, s[i:end])
    }
    return out
}
\`\`\`

Walk \`chunk([1,2,3,4,5,6,7], 3)\`:
- \`numChunks = (7+2)/3 = 3\` → \`make([][]int, 0, 3)\`.
- i=0, end=3 → \`s[0:3]\` = \`[1,2,3]\`.
- i=3, end=6 → \`s[3:6]\` = \`[4,5,6]\`.
- i=6, end=7 (do \`end = 9 > 7\`, clamp) → \`s[6:7]\` = \`[7]\`.
- Return \`[[1,2,3], [4,5,6], [7]]\`.

**Lưu ý**: các sub-slice share array với \`s\`. Tổng allocation = 1 (cho slice ngoài). Nếu muốn mỗi chunk độc lập, thay \`s[i:end]\` bằng \`append([]int(nil), s[i:end]...)\`.

---

## Code & Minh hoạ

- Code chạy được: chưa tạo \`solutions.go\` mặc định trong repo này. Khi user yêu cầu sẽ bổ sung.
- Minh hoạ tương tác: [visualization.html](./visualization.html) — vẽ slice header + underlying array, animate \`append\` grow, demo sharing pitfall, playground các trick.

---

## Bài tiếp theo

[Lesson 13 — Map](../lesson-13-maps/README.md): cấu trúc key-value (hash table), khởi tạo, \`delete\`, iteration không thứ tự, comma-ok pattern, dùng map làm set.
`;
