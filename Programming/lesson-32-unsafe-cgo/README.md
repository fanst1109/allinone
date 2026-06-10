# Lesson 32 — `unsafe` package & CGo: Hai cách "thoát" khỏi Go safety

> Tier 3 · Go Advanced · Lesson 32
> Kế thừa: [L31 — Reflect](../lesson-31-reflect/README.md) · Tiếp theo: [L33 — Memory & GC](../lesson-33-memory-gc/README.md)

## Mục tiêu học tập

Sau lesson này bạn sẽ:

1. Hiểu **vì sao Go có package tên là `unsafe`** — và vì sao tên đó là cảnh báo, không phải nhãn marketing.
2. Dùng được `unsafe.Pointer`, `unsafe.Sizeof`, `unsafe.Alignof`, `unsafe.Offsetof` để **đo và can thiệp memory layout** của struct.
3. Viết được hàm **zero-copy** giữa `string` và `[]byte` — và biết chính xác nó nguy hiểm ở đâu.
4. Gọi được code **C từ Go qua CGo**: import giả `"C"`, comment header, convert string Go ↔ C.
5. Đo được **overhead thật của một cgo call** (≈ 100–200 ns) và biết khi nào con số đó là quá đắt.
6. Tránh được các pitfall: dangling C pointer, race với GC, modify string immutable, leak `C.CString`.

## Tiền đề

- [L16 — Pointers](../lesson-16-pointers/README.md): hiểu `*T`, địa chỉ, dereference.
- [L15 — Struct & method](../lesson-15-struct-method/README.md): hiểu struct field layout.
- [L31 — Reflect](../lesson-31-reflect/README.md): biết runtime type information. `unsafe` thường được dùng bên trong các implementation của `reflect`.
- Nắm được C cơ bản (biết `printf`, `strlen`, `malloc`/`free`) sẽ rất có lợi cho phần CGo.

---

## 1. Vì sao Go có cái package tên là `unsafe`?

Go định vị mình là một ngôn ngữ **memory-safe**: không có pointer arithmetic, không có cách "tự nhiên" để đọc/ghi sai memory, GC tự dọn rác. Đây là điểm Go khác C/C++.

Nhưng Go không phải Java thuần — nó cần đóng vai trò "ngôn ngữ hệ thống" (system language). Hai tình huống không tránh được:

- **Interop với code C** (thư viện hệ điều hành, SQLite, FFmpeg, ImageMagick...) — phải biết struct layout, phải truyền pointer thô.
- **Hot path performance** — đôi khi muốn cast `string → []byte` không copy, hoặc tự tính offset thay vì dùng reflect (chậm gấp 10–100 lần).

Vì thế Go cung cấp **một cánh cửa sau**: package `unsafe`. Tên `unsafe` là cố ý — đọc xong là phải dừng và hỏi *"mình có thật sự cần không?"*.

> 💡 **Trực giác.** Hình dung Go như một sân chơi có hàng rào: trong hàng rào bạn không thể tự làm mình bị thương. `unsafe` là **cái cổng có khóa**, có biển "Cẩn thận — bạn tự chịu trách nhiệm sau cổng này". Cổng tồn tại vì đôi khi phải ra ngoài (gặp người C ở ngoài kia), nhưng đa số người dùng không bao giờ cần mở.

### Ba lý do cụ thể `unsafe` được coi là "không an toàn"

1. **Compiler không kiểm tra** — `*int → unsafe.Pointer → *string` compile thành công, runtime crash hoặc đọc rác.
2. **API không stable cùng cách như các package khác** — `unsafe` thuộc về compiler internals; code dùng `unsafe` có thể vỡ khi nâng Go version (vd Go 1.17 → 1.20 đã đổi cách hợp lệ của `uintptr` round-trip).
3. **Garbage collector có thể di chuyển object** — nếu bạn cast `*T → uintptr` rồi lưu lại, GC không biết đó vẫn là pointer; nó có thể move object đi → `uintptr` cũ trỏ vào rác.

> ⚠ **Lỗi thường gặp.** Nhiều người mới nghĩ `unsafe` = "C-style pointer arithmetic free-for-all". Sai. Go vẫn không cho cộng/trừ trực tiếp trên `unsafe.Pointer`; muốn dịch chuyển phải đi qua `uintptr` và phải tuân theo **6 pattern hợp lệ** mà Go documentation liệt kê (xem mục 2.3).

### 📝 Tóm tắt mục 1

- `unsafe` là cánh cửa hậu cho interop và hot-path performance.
- Compiler ngừng check, API có thể đổi, GC có thể phá pointer.
- Quy tắc số 1: **luôn ưu tiên giải pháp không dùng `unsafe`** nếu có.

---

## 2. `unsafe.Pointer` — pointer không có kiểu

### 2.1 Khái niệm

`unsafe.Pointer` là **kiểu pointer không gắn kiểu phần tử**, tương đương `void *` của C. Đặc điểm:

- Bất kỳ `*T` nào (T bất kỳ) **convert được sang** `unsafe.Pointer` và ngược lại.
- Bất kỳ `unsafe.Pointer` nào **convert được sang** `uintptr` (số nguyên không dấu chứa địa chỉ).
- `uintptr` convert ngược về `unsafe.Pointer` **được**, nhưng đầy cảnh báo (xem 2.3).

```go
var x int64 = 42
p := unsafe.Pointer(&x)     // *int64 → unsafe.Pointer
pf := (*float64)(p)         // unsafe.Pointer → *float64 (cùng địa chỉ, kiểu khác)
fmt.Println(*pf)            // diễn giải 8 bytes của int64=42 như float64
                            // → một số float rất nhỏ (≈ 2.08e-322)
```

> 💡 **Trực giác.** Memory là một dãy byte. Pointer "có kiểu" nói cho compiler biết *cách diễn giải* các byte đó. `unsafe.Pointer` xóa nhãn diễn giải; bạn cast về `*T2` là tự khẳng định "tôi muốn đọc các byte này như là T2".

### 2.2 Ví dụ số cụ thể

`int64 x = 42` được lưu trong memory (little-endian, x86/ARM64):

```
addr:  0x10  0x11  0x12  0x13  0x14  0x15  0x16  0x17
byte:  0x2A  0x00  0x00  0x00  0x00  0x00  0x00  0x00
```

- Diễn giải như `int64` → `0x000000000000002A` = 42.
- Diễn giải như `float64` (IEEE 754) → exponent 0 (subnormal), mantissa 42 → ≈ `2.08e-322`.
- Diễn giải như `[8]byte` → `[0x2A, 0, 0, 0, 0, 0, 0, 0]`.

Cùng 8 byte, ba câu trả lời khác nhau — đó là điều `unsafe.Pointer` cho phép.

### 2.3 Sáu pattern hợp lệ (Valid Uses of unsafe.Pointer)

Go documentation liệt kê **chính xác 6 pattern** mà compiler/GC bảo đảm hoạt động đúng. Các pattern ngoài 6 này là *"đúng hôm nay, sai ngày mai"*.

1. **Convert `*T1 → unsafe.Pointer → *T2`** với T1 và T2 có cùng memory layout (vd `[4]byte ↔ uint32`).
2. **Convert `unsafe.Pointer → uintptr`** (chỉ để in/log, không lưu lại lâu).
3. **Pointer arithmetic** kiểu `unsafe.Pointer + offset`:
   ```go
   p := unsafe.Pointer(&s.Field)
   // dịch chuyển đến field kế tiếp:
   p = unsafe.Pointer(uintptr(p) + unsafe.Sizeof(int(0)))
   ```
   **Bước cast `uintptr → unsafe.Pointer` PHẢI ở cùng một biểu thức** với cộng offset, không được tách qua biến trung gian. Lý do: GC chỉ "thấy" pointer khi nó ở dạng `unsafe.Pointer`; nếu cứ ngồi ở `uintptr`, GC có thể move object → địa chỉ cũ trỏ vào rác.
4. **Convert pointer ↔ `syscall.Pointer`** khi gọi syscall.
5. **Convert `reflect.Value.Pointer()`** trả về `uintptr` → cast về `unsafe.Pointer` trong cùng expression.
6. **Field access qua `unsafe.Offsetof`** (xem mục 3).

> ❓ **Câu hỏi tự nhiên: "Tách qua `uintptr` rồi cộng có gì sai? Cùng địa chỉ mà?"**
> Cùng địa chỉ — *bây giờ*. Nhưng GC có thể move object giữa hai dòng lệnh:
> ```go
> u := uintptr(unsafe.Pointer(&x))   // (A)
> // ← nếu GC chạy ở đây và move x đi, u vẫn giữ địa chỉ CŨ
> p := unsafe.Pointer(u + 8)         // (B) — u + 8 trỏ vào rác
> ```
> Pattern đúng phải gộp (A) và (B) trong **một biểu thức** để compiler giữ liveness:
> ```go
> p := unsafe.Pointer(uintptr(unsafe.Pointer(&x)) + 8) // OK
> ```

### 📝 Tóm tắt mục 2

- `unsafe.Pointer` = `void*` của Go — pointer không gắn kiểu.
- Cùng địa chỉ, kiểu khác nhau ⇒ diễn giải khác nhau.
- Chỉ 6 pattern là **bảo đảm đúng**; ra ngoài 6 pattern là tự đặt mìn.

---

## 3. `Sizeof`, `Alignof`, `Offsetof` — đo memory layout

Ba hàm này thực ra **không trả về giá trị runtime** — chúng là **compile-time constants**. Compiler tính sẵn lúc build, runtime chỉ đọc số.

| Hàm | Trả về | Ý nghĩa |
|-----|--------|---------|
| `unsafe.Sizeof(x)` | `uintptr` | Số byte chiếm bởi kiểu của `x` (không tính memory mà pointer trỏ đến) |
| `unsafe.Alignof(x)` | `uintptr` | Yêu cầu alignment (1, 2, 4, hoặc 8 byte trên 64-bit) |
| `unsafe.Offsetof(s.Field)` | `uintptr` | Offset của `Field` tính từ đầu struct |

### 3.1 Ví dụ số cụ thể (4 ví dụ)

```go
unsafe.Sizeof(int8(0))     // 1
unsafe.Sizeof(int32(0))    // 4
unsafe.Sizeof(int64(0))    // 8
unsafe.Sizeof("hello")     // 16 (header: data pointer 8 + len 8) — KHÔNG phải 5
unsafe.Sizeof([]int{1,2})  // 24 (header: data 8 + len 8 + cap 8) — KHÔNG phải 16
```

> ❓ **Câu hỏi tự nhiên: "Vì sao `Sizeof("hello")` là 16, không phải 5?"**
> Vì `Sizeof` đo **kiểu của biến**, không phải dữ liệu nó trỏ đến. Biến kiểu `string` là một struct 2 trường (`*byte data`, `int len`) → 16 byte trên 64-bit. 5 byte `h-e-l-l-o` nằm ở vùng nhớ khác mà data pointer trỏ tới.

### 3.2 Alignment — vì sao quan trọng?

CPU đọc memory nhanh nhất khi địa chỉ chia hết cho size. Đọc `int64` ở địa chỉ chia hết cho 8 = 1 lệnh; đọc ở địa chỉ lẻ = 2 lệnh + ghép byte (hoặc fault trên ARM).

`Alignof(int64(0)) == 8` nghĩa là compiler đảm bảo mọi `int64` đặt ở địa chỉ chia hết 8.

### 3.3 Struct padding — minh họa kinh điển

```go
type S1 struct {
    a bool   // offset 0, size 1
    b int64  // offset 8 (bị căn bằng 8), size 8
    c bool   // offset 16, size 1
}
// Sizeof(S1) = 24 (KHÔNG phải 1+8+1=10)
```

Layout thực tế trong memory:

```
offset:  0    1                          8                          16   17                           24
field:  [a] [pad 7 bytes              ] [b: 8 bytes              ] [c]  [pad 7 bytes (tail padding)]
```

- Sau `a` (1 byte), compiler chèn 7 byte padding để `b` rơi vào offset chia hết 8.
- Sau `c` (1 byte ở offset 16), compiler chèn 7 byte **tail padding** để toàn bộ struct có size chia hết cho alignment lớn nhất (8) — cần thiết để khi tạo array `[]S1`, mỗi phần tử vẫn được căn đúng.

**Sắp xếp lại** giảm size:

```go
type S2 struct {
    b int64  // offset 0, size 8
    a bool   // offset 8, size 1
    c bool   // offset 9, size 1
}
// Sizeof(S2) = 16 — tiết kiệm 8 byte (33%)
```

> ⚠ **Lỗi thường gặp.** Người mới đọc `Sizeof(S1) = 24` nghĩ "Go bug". Không phải bug, là **alignment**. Quy tắc thực hành: **sắp xếp field từ lớn → nhỏ** (int64, int32/float32, int16, bool/byte) để giảm padding. Tool `fieldalignment` của Go vet (`go install golang.org/x/tools/go/analysis/passes/fieldalignment/cmd/fieldalignment`) tự phát hiện và sửa.

> 🔁 **Dừng lại tự kiểm tra.**
> Cho struct:
> ```go
> type T struct {
>     a int32
>     b bool
>     c int64
>     d int32
> }
> ```
> Tính `Sizeof(T)`?
> <details><summary>Đáp án</summary>
>
> ```
> offset 0: a (int32, 4 byte)
> offset 4: b (bool, 1 byte)  → cần pad đến offset 8 cho c (int64 align 8)
> offset 5-7: pad 3 byte
> offset 8: c (int64, 8 byte)
> offset 16: d (int32, 4 byte)
> offset 20-23: tail pad 4 byte (để Sizeof chia hết 8 = alignof(c))
> → Sizeof(T) = 24
> ```
>
> Reorder `c, a, d, b` → size 16.
> </details>

### 📝 Tóm tắt mục 3

- `Sizeof/Alignof/Offsetof` là **compile-time constants**, không có chi phí runtime.
- `Sizeof(string) = 16`, `Sizeof([]int) = 24` — đó là header, không phải dữ liệu.
- Struct **padding** do alignment; sắp lại field tiết kiệm memory đáng kể.

---

## 4. Struct field qua `Offsetof` — đọc field không cần tên

```go
type User struct {
    ID   int64   // offset 0
    Age  int32   // offset 8
    _    int32   // offset 12 (padding)
    Name string  // offset 16 (string header)
}

u := User{ID: 7, Age: 30, Name: "Alice"}

// Đọc field Age qua offset:
basePtr := unsafe.Pointer(&u)
agePtr := (*int32)(unsafe.Pointer(uintptr(basePtr) + unsafe.Offsetof(u.Age)))
fmt.Println(*agePtr) // 30
```

Dùng để làm gì trong thực tế?

- **Serializer / deserializer hot path** (vd encoding/json fork hiệu năng cao như `easyjson`, `sonic`): biết offset → đọc/ghi field không qua reflect → nhanh hơn 5–10 lần.
- **Atomic ops trên field** — `atomic.LoadInt64(&u.ID)` chỉ hoạt động nếu `&u.ID` được căn đúng 8 byte. `Offsetof` giúp verify lúc test.

> ❓ **Câu hỏi tự nhiên: "Có cần thật không? Nhanh hơn bao nhiêu?"**
> Trong test thực tế với `encoding/json` vs `easyjson` (parse JSON 10 KB):
> - `encoding/json` (dùng reflect): ~50 µs / parse.
> - `easyjson` (dùng `unsafe.Pointer` + offset): ~5 µs / parse.
> Trên dịch vụ xử lý 100k req/s, chênh 45 µs/req = 4.5 giây CPU mỗi giây. Một core CPU cứu được.

---

## 5. Zero-copy `string` ↔ `[]byte` (cẩn thận với `string` immutability)

Trong Go, `string` và `[]byte` về memory layout **gần như giống nhau** — đều có data pointer và length. `[]byte` có thêm `cap`. Convert qua lại bằng cú pháp `[]byte(s)` / `string(b)` thì **bị copy toàn bộ data** — an toàn nhưng $O(n)$.

Khi xử lý JSON / log / network buffer hàng triệu lần/giây, copy thừa giết performance. Zero-copy:

```go
// String → []byte (Go 1.20+)
func StringToBytes(s string) []byte {
    return unsafe.Slice(unsafe.StringData(s), len(s))
}

// []byte → String (Go 1.20+)
func BytesToString(b []byte) string {
    return unsafe.String(unsafe.SliceData(b), len(b))
}
```

> 💡 **Trực giác.** Cả string và `[]byte` đều "chỉ" là một con trỏ tới dãy byte + độ dài. Zero-copy là *"đọc lại cùng dãy byte với nhãn khác"*, không tạo bản sao mới.

### ⚠ Vì sao nguy hiểm — đọc kỹ

`string` trong Go là **immutable** — runtime, compiler, GC, và rất nhiều library (vd `map` dùng string làm key, hash đã cache) **giả định chuỗi không bao giờ thay đổi**. Nếu bạn:

1. Convert `string → []byte` bằng zero-copy,
2. Sửa byte trong slice,

→ bạn vừa **vi phạm hợp đồng immutability**. Hậu quả không phải crash ngay; thường biểu hiện là:

- Hash map dùng string đó làm key đột nhiên không tìm thấy entry.
- Cùng một string in ra hai giá trị khác nhau ở hai nơi (compiler dedup string literal).
- Race detector (`go run -race`) thường KHÔNG bắt được — vì không có concurrent access, chỉ là sai semantic.

**Quy tắc thực hành**:
- Dùng `StringToBytes` cho **READ-ONLY consumer**: hash, parse, search.
- KHÔNG bao giờ ghi vào slice trả về. Nếu cần ghi, copy ra slice mới rồi sửa.
- Đánh dấu rõ trong comment: `// WARNING: returned slice MUST NOT be mutated`.

### Ví dụ số: lợi ích thật

Hash 1 triệu username (string trung bình 12 ký tự) qua FNV-1a:

| Cách | Thời gian | Allocation |
|------|-----------|------------|
| `[]byte(s)` rồi hash | ~95 ms | 12 MB |
| `StringToBytes(s)` rồi hash (read-only) | ~28 ms | 0 |

3.4× nhanh, không có GC pressure.

> ⚠ **Lỗi thường gặp.** Quên rằng `string` literal được dedup. Đoạn code này có thể crash chương trình:
> ```go
> s := "hello"
> b := StringToBytes(s)
> b[0] = 'H'              // sửa byte đầu
> fmt.Println("hello")    // có thể in ra "Hello" vì cùng địa chỉ literal
> ```
> Compiler đặt `"hello"` ở read-only section của binary; ghi vào có thể gây **segfault** ngay, hoặc tệ hơn — ghi đè được rồi mọi nơi cùng đọc `"hello"` đều thấy `"Hello"`.

### 📝 Tóm tắt mục 5

- Zero-copy string ↔ []byte loại bỏ allocation cho hot path read-only.
- Sửa byte sau khi cast = **undefined behavior** (string immutability bị phá).
- Dùng `unsafe.Slice`/`unsafe.String` (Go 1.20+), không dùng SliceHeader/StringHeader cũ (deprecated).

---

## 6. `unsafe.Slice`, `unsafe.SliceData`, `unsafe.String`, `unsafe.StringData` (Go 1.20+)

Trước Go 1.20, để zero-copy người ta phải cast qua `reflect.SliceHeader` / `reflect.StringHeader`:

```go
// Cách CŨ (deprecated từ Go 1.20)
sh := (*reflect.StringHeader)(unsafe.Pointer(&s))
bh := reflect.SliceHeader{Data: sh.Data, Len: sh.Len, Cap: sh.Len}
return *(*[]byte)(unsafe.Pointer(&bh))
```

Cách này có hai vấn đề: (1) khó đọc, (2) `SliceHeader.Data` kiểu `uintptr` → vi phạm pattern hợp lệ ở mục 2.3 → có thể bị GC phá.

Go 1.20 thêm 4 helper rõ ràng hơn:

| Hàm | Tác dụng | Tương đương khái niệm |
|-----|----------|------------------------|
| `unsafe.SliceData(s)` | Trả về `*T` trỏ tới phần tử 0 của slice | `&s[0]` (an toàn cả khi len==0) |
| `unsafe.Slice(ptr, n)` | Tạo slice `[]T` từ `*T` và length | "wrap" pointer thành slice |
| `unsafe.StringData(s)` | Trả về `*byte` trỏ tới byte 0 | tương tự nhưng cho string |
| `unsafe.String(ptr, n)` | Tạo string từ `*byte` và length | "wrap" byte buffer thành string |

```go
b := []byte{'h','i'}
p := unsafe.SliceData(b)        // *byte trỏ 'h'
s := unsafe.String(p, len(b))   // "hi" (zero-copy)
```

> ❓ **Câu hỏi tự nhiên: "Tại sao không dùng `&s[0]` thay `unsafe.SliceData`?"**
> Vì `&s[0]` panic khi `len(s) == 0` — index out of range. `unsafe.SliceData` trả về pointer "có thể không hợp lệ để dereference" khi rỗng, nhưng KHÔNG panic — dùng được làm sentinel hoặc tham số API.

---

## 7. Khi nào *được phép* dùng `unsafe`?

Một số case "đáng tiền":

1. **Zero-copy parser cho hot path** — `sonic`, `jsoniter` dùng `unsafe.Pointer` đọc trực tiếp struct field.
2. **Interop với C struct layout** — phải khớp memory layout của struct C.
3. **Atomic operations trên struct field** — `atomic.LoadPointer((*unsafe.Pointer)(&someInterfaceField))` để swap interface value lock-free.
4. **Implement library cho slice/map type-erasure** trước Go 1.18 (generics) — vd `sync.Map` dùng `unsafe` để store interface lock-free.

## 8. Khi nào **KHÔNG** nên?

- **Code business logic thông thường** — viết clear code, đo trước rồi mới tối ưu.
- **Khi có alternative an toàn**: `encoding/binary` cho binary parse, `reflect` cho meta-programming (nếu không hot path), `atomic.Value` cho store interface.
- **Khi không hiểu rõ memory model Go** — `unsafe` không tha thứ.
- **Khi code sẽ phải duy trì lâu bởi nhiều người** — `unsafe` tăng hiểu nhầm.

> 🔁 **Dừng lại tự kiểm tra.**
> Bạn đang viết một service tính hash MD5 của tên user để dedup. Có nên dùng `StringToBytes` thay `[]byte(s)` không?
> <details><summary>Đáp án</summary>
> Có, **nếu** đã đo và confirm hash là bottleneck, **và** đoạn dùng slice là read-only (chỉ truyền vào `md5.Sum`), **và** code không bị truyền slice ra ngoài hàm. Nếu chỉ chạy 100 req/s thì copy 12 byte mỗi lần không là gì — không cần `unsafe`. **Đo trước, tối ưu sau.**
> </details>

### 📝 Tóm tắt mục 7-8

- `unsafe` đáng dùng: hot path serialization, C interop, lock-free atomic trên interface.
- Không đáng dùng: business logic thường, micro-optimization không đo được.
- **Quy tắc:** không đo benchmark = không có lý do dùng `unsafe`.

---

## 9. CGo — gọi C từ Go

CGo là **cơ chế interop C↔Go** built-in của toolchain. Cú pháp đặc biệt:

```go
package main

/*
#include <stdio.h>
#include <stdlib.h>
*/
import "C"
import "unsafe"

func main() {
    cs := C.CString("hello from Go")
    defer C.free(unsafe.Pointer(cs))
    C.printf(C.CString("%s\n"), cs) // (đơn giản hoá; thực tế cần free format string)
}
```

Quan sát kỹ:

1. **Comment ngay trên dòng `import "C"`** không phải comment thường — nó là **C source code** mà cgo sẽ biên dịch. Phải dính sát import "C" (không có dòng trống ở giữa).
2. **`import "C"` là pseudo-package** — không tồn tại thư mục `C/`. Toolchain `cgo` đọc comment, sinh ra Go bindings tự động.
3. **`C.printf`**, **`C.CString`**, **`C.GoString`** đều do cgo sinh tự động dựa trên header.

### 9.1 Cơ chế dưới capot

Khi build với CGo, toolchain:

1. Đọc comment phía trên `import "C"` → gọi `gcc`/`clang` biên dịch thành object file.
2. Sinh **stub Go code** mô tả các function C có signature đã thấy.
3. Link object C + Go binary vào cùng executable.

Hệ quả: **bạn cần một C compiler trên máy build** (gcc/clang). Cross-compile cần toolchain cross — không "free" như pure Go.

---

## 10. CGo example đơn giản

```go
package main

/*
#include <math.h>
*/
import "C"
import "fmt"

func Sqrt(x float64) float64 {
    return float64(C.sqrt(C.double(x)))
}

func main() {
    fmt.Println(Sqrt(2)) // 1.4142135623730951
}
```

Quy tắc convert:

| Go | C |
|----|---|
| `C.int(x)` | int |
| `C.double(x)` | double |
| `C.CString(s)` | char* (Go cấp memory, **phải free**) |
| `C.GoString(p)` | Go string (copy từ C) |
| `C.GoBytes(p, n)` | `[]byte` (copy n bytes từ C) |

> ⚠ **Lỗi thường gặp.** `C.CString` cấp memory bằng `malloc` ở **heap của C**. GC Go không thấy memory này. Phải `C.free(unsafe.Pointer(cs))`. Quên free = leak.

---

## 11. Chi phí thật của một cgo call

Mỗi `C.something(...)` không phải chỉ là một jump instruction:

1. Switch goroutine stack → OS thread stack (Go dùng segmented stack, C cần contiguous).
2. Save Go registers theo Go ABI, load theo C ABI (System V trên Linux).
3. **Pin goroutine vào OS thread** trong suốt call — runtime scheduler không thể swap goroutine khác lên thread này.
4. Return: undo các bước trên.

**Chi phí đo được trên Linux x86_64:**

| Loại call | Thời gian |
|-----------|-----------|
| Go function call (inlined) | ~0.3 ns |
| Go function call (non-inlined) | ~1–2 ns |
| **CGo call** (`C.something()`) | **~100–200 ns** |
| `syscall.Syscall` | ~80 ns |

> ❓ **Câu hỏi tự nhiên: "100ns nghe nhỏ, có vấn đề gì?"**
> 100 ns mỗi call, nếu hot path gọi 1 triệu lần/giây = **100 ms CPU** mỗi giây = 10% một core. Một service Go pure dùng 1% CPU có thể bị bloat lên 11% chỉ vì chèn CGo vào hot loop. Đó là lý do `crypto/md5` của Go là pure Go thay vì wrap OpenSSL — dù OpenSSL nhanh hơn vài lần thuật toán, overhead CGo nuốt mất lợi ích.

### 11.1 Tác dụng phụ: scheduler pressure

Khi goroutine pin vào OS thread, nếu C function **chặn lâu** (vd `select()` 1 giây), Go runtime spawn thread M khác để chạy goroutine khác → tăng số OS thread, tăng context-switch cost. Hot path CGo nhiều thread → scheduler thrash.

### 11.2 Cross-compile khó

Pure Go: `GOOS=linux GOARCH=arm64 go build` — chạy được trên macOS, build ra binary Linux ARM64.

CGo: cần cross-compiler C (`aarch64-linux-gnu-gcc`), cần header C của target — phức tạp gấp 10. Đó là lý do nhiều dự án Go (etcd, Prometheus, Kubernetes) né CGo bằng mọi giá.

### 📝 Tóm tắt mục 11

- CGo call ~100-200ns, gấp 100× Go call.
- Pin goroutine → scheduler khó cân bằng.
- Cross-compile từ "chạy 1 lệnh" thành "setup toolchain phức tạp".

---

## 12. Memory management qua biên C↔Go

Hai heap, hai luật chơi:

| Vùng nhớ | Cấp bởi | Giải phóng bởi | GC Go thấy không? |
|----------|---------|-----------------|--------------------|
| Go heap | `make`, `new`, `&T{}` | GC tự động | Có |
| C heap (malloc) | `C.malloc`, `C.CString`, library C | **bạn gọi `C.free`** | KHÔNG |

```go
// Ví dụ ĐÚNG
cs := C.CString("hello")
defer C.free(unsafe.Pointer(cs))   // BẮT BUỘC

// Ví dụ SAI (leak)
cs := C.CString("hello")
result := C.GoString(C.do_something(cs))
return result
// → cs leak. Phải defer C.free trước khi return.
```

> ⚠ **Lỗi thường gặp.** Nghĩ "Go GC sẽ dọn". GC Go chỉ dọn Go heap. Memory cấp bởi C compiler / `malloc` trong C library → bạn tự quản lý.

---

## 13. Pointer rules — luật của cgo về truyền pointer

CGo có **bộ luật riêng** về truyền pointer giữa Go ↔ C, vì GC Go có thể move object:

1. **Go pointer → C**: được phép truyền vào hàm C, nhưng C **không được lưu trữ** pointer đó qua thời điểm function return. Lý do: GC có thể move object Go đi.
2. **Lưu Go pointer trong C lâu**: phải **pin** bằng `runtime.Pinner`:
   ```go
   var p runtime.Pinner
   p.Pin(&someGoObj)
   defer p.Unpin()
   C.some_func_that_stores_ptr(unsafe.Pointer(&someGoObj))
   ```
3. **Go pointer truyền cho C, mà struct Go đó CHỨA pointer khác** → cấm. CGo runtime sẽ panic nếu phát hiện (`cgo argument has Go pointer to Go pointer`).
4. **C pointer → Go**: tự do, không bị GC quản. Nhưng Go không biết khi nào C free → bạn tự đảm bảo không dùng sau khi C đã free.

> ⚠ **Lỗi thường gặp.** Pass `&goSlice[0]` vào C function lưu lại → C giữ pointer; sau đó `goSlice = append(goSlice, ...)` realloc backing array → C pointer trỏ vào rác. Phải pin hoặc copy vào C-allocated buffer.

---

## 14. Khi nào *được phép* dùng CGo?

1. **Wrap thư viện C/C++ trưởng thành mà không có pure Go equivalent**: SQLite (`mattn/go-sqlite3`), libpcap, ImageMagick, FFmpeg, OpenGL, GTK.
2. **System call không có wrapper Go** (hiếm — `syscall` package đã cover phần lớn).
3. **Hot path crypto/compression nếu hardware-accelerated library C nhanh hơn rất nhiều** (sau khi đo) — vd dùng `liblz4` thay implementation Go.
4. **Embedded Lua / V8 / Python interpreter** vào Go service.

## 15. Khi nào **KHÔNG**?

- **Có pure Go alternative**: dùng nó. `modernc.org/sqlite` là pure Go alternative cho `go-sqlite3` (chậm hơn 2-3x nhưng cross-compile được).
- **Cần Docker image scratch / distroless** — CGo link libc động, image scratch không có libc → binary chạy không được. Phải static build `CGO_ENABLED=0` (= pure Go).
- **Cần cross-compile dễ** — CGo phức tạp gấp 10.
- **Hot path latency-sensitive** — 100ns/call có thể là phần lớn budget.
- **Hạn chế chính security**: CGo mở cửa cho memory bug C truyền vào Go process. Hot patch không dễ.

### 📝 Tóm tắt mục 14-15

- CGo đáng dùng: wrap thư viện C trưởng thành không có alternative.
- Né CGo nếu: pure Go có sẵn, cần scratch image, cần cross-compile, hot path.

---

## 16. Common pitfalls — danh sách cụ thể

| Pitfall | Hậu quả | Cách phòng |
|---------|---------|------------|
| Modify byte trong slice từ `StringToBytes` | Undefined behavior, sai semantic ngẫm nhiên | Đánh dấu read-only, không export ra ngoài hàm |
| Lưu `uintptr` rồi convert ngược về pointer | GC move object → trỏ vào rác | Gộp vào 1 expression, không lưu uintptr |
| Quên `C.free(unsafe.Pointer(cs))` sau `C.CString` | Memory leak (C heap) | `defer C.free(...)` ngay sau `C.CString` |
| Pass `&goSlice[0]` vào C, C lưu pointer | Dangling pointer khi slice grow | `runtime.Pinner` hoặc copy vào C buffer |
| Go struct chứa pointer pass vào C | CGo panic ngay | Tách field pointer ra trước, hoặc dùng plain data struct |
| `CGO_ENABLED=1` mà build scratch image | Binary chạy báo "no such file" (libc) | `CGO_ENABLED=0` hoặc copy libc vào image |
| Race detector không bắt unsafe bug | False sense of security | Unit test với input đa dạng + fuzz |

---

## Bài tập

### Bài 1 — Compute struct layout (4 struct)

Cho 4 struct sau, tính `Sizeof` và `Offsetof` của từng field. Không chạy code, tính bằng tay trước (giả định 64-bit).

```go
type A struct {
    x bool
    y int64
    z bool
}

type B struct {
    y int64
    x bool
    z bool
}

type C struct {
    a int32
    b int64
    c int32
    d int16
}

type D struct {
    name string  // header 16 byte
    age  int32
    sex  bool
}
```

Sau đó viết code dùng `unsafe.Sizeof`/`Offsetof` để verify.

### Bài 2 — Zero-copy string ↔ []byte với cảnh báo

Viết package `safezerocopy`:
- `StringToBytes(s string) []byte` — zero-copy, return slice read-only.
- `BytesToString(b []byte) string` — zero-copy.
- Viết unit test demo: dùng đúng (chỉ đọc, dùng làm key hash) và dùng sai (modify byte → chứng minh sai semantic).

### Bài 3 — Wrap C `strlen` qua CGo

Viết function `CStrlen(s string) int` trả về độ dài tính bằng `strlen` của C. So sánh kết quả với `len(s)` cho:
- ASCII string
- UTF-8 string có ký tự non-ASCII (vd "café")
- String chứa byte zero giữa (vd `"a\x00b"`).
Giải thích sự khác biệt.

### Bài 4 — Đo overhead CGo call

Viết benchmark so sánh:
1. Go function `func Add(a, b int) int { return a + b }` gọi 10 triệu lần.
2. CGo function `static int add(int a, int b) { return a + b; }` gọi 10 triệu lần.
Đo thời gian, tính ratio.

### Bài 5 — Sửa 4 antipattern

Sửa các đoạn sau:

```go
// (a) Race với GC
u := uintptr(unsafe.Pointer(&x))
doSomeAllocation() // có thể trigger GC
p := (*int)(unsafe.Pointer(u))
*p = 42

// (b) String mutability bug
s := "hello"
b := unsafe.Slice(unsafe.StringData(s), len(s))
b[0] = 'H'

// (c) C memory leak
func greet() string {
    cs := C.CString("hi")
    return C.GoString(cs)
}

// (d) Cast invalid layout
var x int32 = 1
p := (*int64)(unsafe.Pointer(&x)) // đọc 8 byte ở vùng chỉ có 4
fmt.Println(*p)
```

### Bài 6 — Memory leak demo trong CGo + fix

Viết 2 program:
1. **Leak**: vòng lặp 1 triệu lần `C.CString` không free, in `runtime.ReadMemStats` mỗi 100k iter để thấy memory tăng (note: leak ở C heap → MemStats Go không thấy, dùng `ps -o rss` từ shell).
2. **Fix**: cùng vòng lặp với `defer C.free(...)`, chứng minh memory ổn định.

### Bài 7 — Reorder struct fields

Cho struct sau, sắp xếp lại để có `Sizeof` nhỏ nhất:

```go
type Bad struct {
    flag1  bool
    id     int64
    flag2  bool
    count  int32
    flag3  bool
    weight float64
    code   int16
}
```

Tính size trước/sau, viết code verify.

---

## Lời giải chi tiết

### Lời giải Bài 1 — Layout 4 struct

**Struct A** (`bool, int64, bool`):

```
offset 0:  x (bool, 1)
offset 1-7: pad 7 byte (cho y align 8)
offset 8:  y (int64, 8)
offset 16: z (bool, 1)
offset 17-23: tail pad 7 byte (Sizeof chia hết 8)
→ Sizeof(A) = 24
```

`Offsetof: x=0, y=8, z=16`.

**Struct B** (`int64, bool, bool`):

```
offset 0:  y (int64, 8)
offset 8:  x (bool, 1)
offset 9:  z (bool, 1)
offset 10-15: tail pad 6 byte
→ Sizeof(B) = 16
```

Tiết kiệm 33% so với A chỉ bằng đảo thứ tự.

**Struct C** (`int32, int64, int32, int16`):

```
offset 0:  a (int32, 4)
offset 4-7: pad 4 (cho b align 8)
offset 8:  b (int64, 8)
offset 16: c (int32, 4)
offset 20: d (int16, 2)
offset 22-23: tail pad 2
→ Sizeof(C) = 24
```

Reorder `b, a, c, d` → `8+4+4+2 = 18`, pad đuôi 6 → 24. Reorder `b, c, a, d` → 8+4+4+2 = 18, pad đuôi 6 → 24. Không cải thiện được vì `b` đã align 8 ngay đầu.

**Struct D** (`string, int32, bool`):

```
offset 0:  name (string header, 16) — data ptr 8 + len 8
offset 16: age (int32, 4)
offset 20: sex (bool, 1)
offset 21-23: tail pad 3
→ Sizeof(D) = 24
```

`Offsetof: name=0, age=16, sex=20`.

Verify code: xem [`solutions.go`](./solutions.go) hàm `demoLayout`.

### Lời giải Bài 2 — Zero-copy

```go
package safezerocopy

import "unsafe"

// StringToBytes — zero-copy. Returned slice MUST be treated read-only.
// Modifying the returned slice has undefined behavior because string
// memory may be located in read-only segment of the binary.
func StringToBytes(s string) []byte {
    if len(s) == 0 {
        return nil
    }
    return unsafe.Slice(unsafe.StringData(s), len(s))
}

// BytesToString — zero-copy. The string view is valid only as long as
// the underlying slice is not modified. If slice changes, the string
// silently changes too — vi phạm immutability contract.
func BytesToString(b []byte) string {
    if len(b) == 0 {
        return ""
    }
    return unsafe.String(unsafe.SliceData(b), len(b))
}
```

**Demo dùng đúng** (hash username):
```go
sum := fnv.New64a()
sum.Write(StringToBytes(username)) // chỉ đọc → an toàn
hash := sum.Sum64()
```

**Demo dùng SAI** (sửa byte → race với compiler dedup):
```go
s := "hello"
b := StringToBytes(s)
b[0] = 'H' // segfault NGAY trên macOS/Linux khi s là string literal
            // (vì literal nằm ở read-only segment)
```

### Lời giải Bài 3 — CGo `strlen`

```go
package main

/*
#include <string.h>
*/
import "C"
import (
    "fmt"
    "unsafe"
)

func CStrlen(s string) int {
    cs := C.CString(s)
    defer C.free(unsafe.Pointer(cs))
    return int(C.strlen(cs))
}

func main() {
    fmt.Println("ascii    :", len("hello"), CStrlen("hello"))     // 5 5
    fmt.Println("utf8     :", len("café"), CStrlen("café"))       // 5 5 (é = 2 byte UTF-8)
    fmt.Println("null mid :", len("a\x00b"), CStrlen("a\x00b"))   // 3 1
}
```

Giải thích:
- ASCII: `len` (số byte) = `strlen` (đếm đến `\0`) = số ký tự ASCII.
- UTF-8 "café": `len` = 5 (c, a, f, é-byte1, é-byte2). `strlen` = 5 cũng (đếm byte, không hiểu UTF-8).
- `"a\x00b"`: Go `len` = 3 (string Go giữ length, byte zero là dữ liệu hợp lệ). C `strlen` dừng ở byte zero → trả về 1.

→ Bài học: C string không an toàn cho binary data; Go string thì có.

### Lời giải Bài 4 — Benchmark CGo overhead

```go
package cgocost

/*
static int c_add(int a, int b) { return a + b; }
*/
import "C"
import "testing"

func goAdd(a, b int) int { return a + b }

//go:noinline
func goAddNoInline(a, b int) int { return a + b }

func BenchmarkGoAddInlined(b *testing.B)   { for i := 0; i < b.N; i++ { _ = goAdd(i, i+1) } }
func BenchmarkGoAddNoInline(b *testing.B)  { for i := 0; i < b.N; i++ { _ = goAddNoInline(i, i+1) } }
func BenchmarkCgoAdd(b *testing.B)         { for i := 0; i < b.N; i++ { _ = C.c_add(C.int(i), C.int(i+1)) } }
```

Kết quả tham khảo (Linux x86_64, Go 1.22):
- `GoAddInlined`: ~0.3 ns/op (compiler inline thẳng).
- `GoAddNoInline`: ~1.5 ns/op.
- `CgoAdd`: ~50-100 ns/op (mới đây cgo overhead giảm; cũ ~200ns).

Ratio: cgo gấp ~50-300× Go. Trên hot loop 10 triệu call/s = 0.5-1s CPU overhead.

### Lời giải Bài 5 — 4 antipattern

**(a) Race với GC** — gộp expression:

```go
// SAI
u := uintptr(unsafe.Pointer(&x))
doSomeAllocation()
p := (*int)(unsafe.Pointer(u))

// ĐÚNG — không tách qua biến uintptr
p := (*int)(unsafe.Pointer(&x)) // không cần uintptr ở đây cả
// hoặc nếu thật cần arithmetic:
p := (*int)(unsafe.Pointer(uintptr(unsafe.Pointer(&x)) + offset))
```

**(b) String mutability** — copy ra trước:

```go
// SAI
s := "hello"
b := unsafe.Slice(unsafe.StringData(s), len(s))
b[0] = 'H'

// ĐÚNG
s := "hello"
b := []byte(s) // copy
b[0] = 'H'
s2 := string(b)
```

Nếu mục đích là tránh allocation, đừng tránh — case này allocation 5 byte không đáng risk.

**(c) C memory leak**:

```go
// SAI
func greet() string {
    cs := C.CString("hi")
    return C.GoString(cs) // cs leak
}

// ĐÚNG
func greet() string {
    cs := C.CString("hi")
    defer C.free(unsafe.Pointer(cs))
    return C.GoString(cs) // GoString copy ra Go heap, cs có thể free
}
```

**(d) Cast invalid layout**:

```go
// SAI: đọc 8 byte ở vùng 4 byte → đọc rác từ 4 byte kế tiếp
var x int32 = 1
p := (*int64)(unsafe.Pointer(&x))

// ĐÚNG: cast giữa các kiểu có cùng size
var x int32 = 1
p := (*uint32)(unsafe.Pointer(&x)) // int32 ↔ uint32 OK
fmt.Println(*p) // 1
```

### Lời giải Bài 6 — Memory leak demo + fix

**Leak**:
```go
package main

/*
#include <stdlib.h>
*/
import "C"
import (
    "fmt"
    "runtime"
    "time"
    "unsafe"
)

func main() {
    var m runtime.MemStats
    for i := 0; i < 1_000_000; i++ {
        cs := C.CString("hello world this is a long-ish string")
        _ = cs
        // KHÔNG free → leak C heap
        if i%100_000 == 0 {
            runtime.ReadMemStats(&m)
            fmt.Printf("iter=%d goAlloc=%dKB\n", i, m.Alloc/1024)
        }
    }
    fmt.Println("Sleep 30s để bạn ps -o rss; pid =", procPID())
    time.Sleep(30 * time.Second)
    _ = unsafe.Pointer(nil)
}
```

Quan sát: `m.Alloc` (Go heap) gần như không tăng, nhưng `ps -o rss` của process tăng đều — đó là C heap leak. Sau 1M iter, RSS có thể vượt 100MB.

**Fix**:
```go
for i := 0; i < 1_000_000; i++ {
    cs := C.CString("hello world this is a long-ish string")
    C.free(unsafe.Pointer(cs))
}
```

RSS ổn định ở vài MB.

### Lời giải Bài 7 — Reorder struct

```go
type Bad struct {
    flag1  bool      // 0, 1B + 7 pad
    id     int64     // 8, 8B
    flag2  bool      // 16, 1B + 3 pad
    count  int32     // 20, 4B
    flag3  bool      // 24, 1B + 7 pad
    weight float64   // 32, 8B
    code   int16     // 40, 2B + 6 pad
}
// Sizeof(Bad) = 48
```

**Reorder** từ lớn → nhỏ:

```go
type Good struct {
    id     int64    // 0, 8B
    weight float64  // 8, 8B
    count  int32    // 16, 4B
    code   int16    // 20, 2B
    flag1  bool     // 22, 1B
    flag2  bool     // 23, 1B
    flag3  bool     // 24, 1B + 7 pad
}
// Sizeof(Good) = 32
```

Tiết kiệm 16 byte (33%). Trên slice 10 triệu phần tử = 160MB tiết kiệm.

Code verify trong [`solutions.go`](./solutions.go).

---

## Code & Minh hoạ

- [`solutions.go`](./solutions.go) — demo Sizeof/Alignof/Offsetof, zero-copy, struct layout.
- [`visualization.html`](./visualization.html) — 3 module tương tác:
  1. **Struct memory layout** — chọn struct, xem padding highlight, compare reordered.
  2. **Pointer conversion** — animate `*T1 → unsafe.Pointer → *T2`, cùng memory diễn giải khác.
  3. **Go ↔ C boundary** — animate Go gọi C: pin thread, convert string, return; show 100ns overhead.

---

## Bài tiếp theo

- [L33 — Memory & GC](../lesson-33-memory-gc/README.md): stack/heap, escape analysis, GC tri-color, GOGC tuning. Hiểu memory ở mức cao hơn `unsafe`.
- Tham khảo thêm: [Go memory model](https://go.dev/ref/mem), [cgo documentation](https://pkg.go.dev/cmd/cgo), `dave.cheney.net` series về CGo cost.
