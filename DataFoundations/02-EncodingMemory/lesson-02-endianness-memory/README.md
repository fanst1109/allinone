# Lesson 02 — Endianness & Memory Layout (thứ tự byte và layout bộ nhớ)

> **Nhóm 2 — Encoding & Memory · DataFoundations**

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Phân biệt big-endian và little-endian, và biết kiến trúc nào dùng loại nào.
- Giải thích network byte order và hàm `htonl`/`ntohl`.
- Hiểu alignment requirement và cách compiler thêm padding vào struct.
- Tính `sizeof(struct)` chính xác bằng tay cho các layout khác nhau.
- Biết cách reorder fields để giảm kích thước struct.

## Kiến thức tiền đề

- [Lesson 01 — Binary & Hex](../../01-NumberRepresentation/lesson-01-binary-hex/README.md): đọc số hex.
- [Lesson 01 — Character Encoding](../lesson-01-character-encoding/README.md): khái niệm byte, multi-byte value.

---

## 1. Endianness là gì?

💡 **Trực giác**: Khi viết số "1234" lên giấy, người Tây đọc từ trái sang phải — chữ số quan trọng nhất (1) đứng **đầu tiên**. Nhưng khi lưu số nguyên 32-bit vào bộ nhớ, ta phải quyết định: byte **lớn nhất** lưu vào địa chỉ **thấp nhất** hay **cao nhất**? Hai trường phái đó gọi là big-endian và little-endian.

Tên xuất phát từ tiểu thuyết *Gulliver's Travels* của Jonathan Swift — cuộc chiến về việc đập trứng từ đầu nào!

---

## 2. Big-Endian và Little-Endian

### 2.1. Big-Endian (MSB first)

**Most Significant Byte (byte quan trọng nhất) lưu ở địa chỉ thấp nhất.**

Số `uint32_t x = 0x12345678` lưu trong bộ nhớ tại địa chỉ `0x100`:

| Địa chỉ | Giá trị byte | Giải thích |
|---------|-------------|-----------|
| 0x100 | `0x12` | byte cao nhất (MSB) |
| 0x101 | `0x34` | |
| 0x102 | `0x56` | |
| 0x103 | `0x78` | byte thấp nhất (LSB) |

**Kiến trúc dùng big-endian**: SPARC, PowerPC (truyền thống), Motorola 68k, mạng TCP/IP (network byte order).

### 2.2. Little-Endian (LSB first)

**Least Significant Byte lưu ở địa chỉ thấp nhất.**

Cùng số `0x12345678` tại `0x100`:

| Địa chỉ | Giá trị byte | Giải thích |
|---------|-------------|-----------|
| 0x100 | `0x78` | byte thấp nhất (LSB) |
| 0x101 | `0x56` | |
| 0x102 | `0x34` | |
| 0x103 | `0x12` | byte cao nhất (MSB) |

**Kiến trúc dùng little-endian**: x86, x86-64 (tất cả PC/laptop Intel/AMD), ARM (default mode), RISC-V.

❓ **Câu hỏi tự nhiên**:
- *"Little-endian trông ngược, sao lại phổ biến hơn?"* — Lợi thế: khi đọc ít byte hơn (vd chỉ đọc `uint8` từ địa chỉ của `uint32`), ta đọc đúng ngay byte thấp nhất — không cần tính offset. Cũng dễ extend giá trị (add thêm byte vào cuối).
- *"ARM là gì?"* — ARM hỗ trợ cả hai (bi-endian) nhưng default là little-endian. iPhone, Android, Raspberry Pi đều chạy ARM little-endian.

### 2.3. Ví dụ số cụ thể

**Ví dụ 1**: `uint32_t x = 0x12345678`
- Little-endian bytes tại addr 0x200: `[0x78, 0x56, 0x34, 0x12]`
- Big-endian bytes tại addr 0x200: `[0x12, 0x34, 0x56, 0x78]`

**Ví dụ 2**: `uint16_t y = 0xABCD`
- Little-endian: `[0xCD, 0xAB]`
- Big-endian: `[0xAB, 0xCD]`

**Ví dụ 3**: `uint64_t z = 0x0102030405060708`
- Little-endian (8 byte): `[0x08, 0x07, 0x06, 0x05, 0x04, 0x03, 0x02, 0x01]`
- Big-endian (8 byte): `[0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07, 0x08]`

**Ví dụ 4**: `uint8_t` — chỉ 1 byte, **không bị ảnh hưởng bởi endianness**.

---

## 3. Network Byte Order

### 3.1. Vấn đề

Khi máy A (little-endian) gửi số `0x12345678` qua mạng đến máy B (big-endian):
- Máy A lưu trong bộ nhớ: `78 56 34 12`
- Gửi bytes theo thứ tự địa chỉ tăng dần: `78 56 34 12`
- Máy B đọc theo big-endian: `0x78563412` ≠ `0x12345678` — **SAI!**

### 3.2. Giải pháp: Network Byte Order = Big-Endian

RFC 791 (IP) và POSIX chuẩn hóa: **mọi số trong header mạng phải ở big-endian**.

Hàm POSIX để chuyển đổi:

| Hàm | Tên đầy đủ | Chiều |
|-----|-----------|-------|
| `htonl(x)` | **h**ost **to** **n**etwork **l**ong | host → big-endian (32-bit) |
| `htons(x)` | **h**ost **to** **n**etwork **s**hort | host → big-endian (16-bit) |
| `ntohl(x)` | **n**etwork **to** **h**ost **l**ong | big-endian → host (32-bit) |
| `ntohs(x)` | **n**etwork **to** **h**ost **s**hort | big-endian → host (16-bit) |

Trên big-endian machine: các hàm này là **no-op** (không làm gì). Trên little-endian: **byte-swap**.

**Ví dụ 5** — `htonl(0x12345678)` trên little-endian:
```
Input:  0x12345678 → bytes in RAM: 78 56 34 12
htonl:  byte-swap  → bytes: 12 34 56 78
Output: 0x12345678 (nhưng giờ bytes trên wire đúng thứ tự)
```

⚠ **Lỗi thường gặp**:
```c
// SAI — quên htonl
struct sockaddr_in addr;
addr.sin_port = 8080;  // 0x1F90 → gửi lên wire là 90 1F = port 36895!

// ĐÚNG
addr.sin_port = htons(8080);
```

---

## 4. Detection endianness trong code

### C/C++:
```c
#include <stdio.h>
int main() {
    int i = 1;
    char *p = (char *)&i;
    if (*p == 1) printf("Little-endian\n");
    else         printf("Big-endian\n");
}
// p trỏ vào byte địa chỉ thấp nhất của i.
// Nếu byte đó = 1, thì byte thấp của 0x00000001 lưu ở địa chỉ thấp = little-endian.
```

### Go:
```go
import "encoding/binary"
if binary.NativeEndian == binary.LittleEndian {
    fmt.Println("Little-endian")
}
```

---

## 5. Memory Alignment (căn chỉnh bộ nhớ)

### 5.1. Alignment requirement là gì?

💡 **Trực giác**: CPU đọc bộ nhớ theo từng **word** (khối cố định 4 hoặc 8 byte). Nếu `int32` bắt đầu ở địa chỉ lẻ (misaligned), CPU phải đọc 2 word rồi ghép lại → chậm hơn. Một số kiến trúc (ARM cũ, SPARC) thậm chí **crash (bus error)** khi đọc misaligned.

**Alignment requirement** = địa chỉ của type phải chia hết cho kích thước của nó:
| Type | Size | Alignment |
|------|------|-----------|
| `int8` / `char` | 1 byte | 1 (bất kỳ địa chỉ) |
| `int16` | 2 byte | 2 (địa chỉ chẵn) |
| `int32` / `float` | 4 byte | 4 (địa chỉ % 4 == 0) |
| `int64` / `double` / pointer | 8 byte | 8 (địa chỉ % 8 == 0) |

### 5.2. Struct Padding — compiler tự thêm padding

Compiler thêm **byte đệm (padding)** vào struct để đảm bảo mọi field đều aligned.

**Struct A**:
```c
struct A {
    char c;    // 1 byte tại offset 0
               // 3 byte padding (để int căn chỉnh về offset 4)
    int  i;    // 4 byte tại offset 4
};
// sizeof(A) = 8, không phải 5!
```

Layout bộ nhớ:
```
Offset: 0    1    2    3    4    5    6    7
Field:  [c] [PAD][PAD][PAD][ i           ]
```

**Struct B** (đảo thứ tự):
```c
struct B {
    int  i;    // 4 byte tại offset 0
    char c;    // 1 byte tại offset 4
               // 3 byte padding cuối (để array of B aligned)
};
// sizeof(B) = 8
```

Layout:
```
Offset: 0    1    2    3    4    5    6    7
Field:  [ i           ][c] [PAD][PAD][PAD]
```

**Struct C** (tệ nhất — char-int-char):
```c
struct C {
    char a;    // 1 byte tại offset 0
               // 3 byte padding
    int  b;    // 4 byte tại offset 4
    char c2;   // 1 byte tại offset 8
               // 3 byte padding cuối
};
// sizeof(C) = 12
```

Layout:
```
Offset: 0    1    2    3    4    5    6    7    8    9   10   11
Field:  [a] [PAD][PAD][PAD][ b           ][c2][PAD][PAD][PAD]
```

❓ **Câu hỏi tự nhiên**:
- *"Tại sao có padding cuối cùng (trailing padding)?"* — Để khi tạo array `struct C arr[2]`, `arr[1].b` vẫn aligned. Nếu không có trailing padding, `arr[1]` bắt đầu ở offset 9 → `arr[1].b` ở offset 13, không chia hết cho 4.
- *"Làm sao biết struct có bao nhiêu padding?"* — Dùng `printf("%zu\n", sizeof(struct A))` trong C, hoặc `unsafe.Sizeof()` trong Go.

### 5.3. Reorder fields để giảm padding

**Nguyên tắc**: sắp xếp fields từ **lớn nhất đến nhỏ nhất** để giảm padding.

**Struct D** (đã tối ưu):
```c
struct D {
    int   b;    // 4 byte tại offset 0
    char  a;    // 1 byte tại offset 4
    char  c2;   // 1 byte tại offset 5
                // 2 byte padding cuối
};
// sizeof(D) = 8  (tiết kiệm 4 byte so với struct C = 12)
```

**Ví dụ tối ưu hơn**:
```c
// BAD: 24 byte
struct Bad {
    char  a;    // offset 0, pad 7
    double d;   // offset 8
    char  b;    // offset 16, pad 7
};
// sizeof = 24

// GOOD: 16 byte
struct Good {
    double d;   // offset 0
    char  a;    // offset 8
    char  b;    // offset 9
                // pad 6
};
// sizeof = 16
```

⚠ **Lưu ý thực tế**:
- Trong Go, compiler không tự optimize thứ tự field — lập trình viên phải tự sắp xếp.
- Tool `fieldalignment` trong Go: `go install golang.org/x/tools/go/analysis/passes/fieldalignment/cmd/fieldalignment@latest`
- Không nên optimize blindly — chỉ optimize khi struct xuất hiện hàng triệu lần trong bộ nhớ.

---

## 6. Tóm tắt

📝 **Tóm tắt bài**:
- **Big-endian**: MSB ở địa chỉ thấp — mạng TCP/IP, SPARC, PowerPC.
- **Little-endian**: LSB ở địa chỉ thấp — x86, x86-64, ARM (default).
- **htonl/ntohl**: chuyển đổi giữa host byte order và network byte order.
- **Alignment**: mỗi type yêu cầu địa chỉ chia hết cho size của nó.
- **Padding**: compiler thêm byte đệm để đảm bảo alignment → `sizeof(struct)` có thể lớn hơn tổng các field.
- **Tối ưu struct**: sắp xếp field từ lớn đến nhỏ để giảm padding.

---

## 7. Bài tập

**Bài 1**: `uint32_t x = 0xDEADBEEF`. Viết bytes trong bộ nhớ theo thứ tự địa chỉ tăng dần trên: (a) little-endian, (b) big-endian.

**Bài 2**: Tính `sizeof` của struct sau:
```c
struct S {
    char  a;
    short b;
    int   c;
    char  d;
};
```

**Bài 3**: Reorder fields của struct trên để `sizeof` là nhỏ nhất. Vẽ layout bộ nhớ sau khi reorder.

**Bài 4**: Hàm `htonl(0xAABBCCDD)` trả về gì trên máy little-endian? Giải thích từng bước.

---

## 8. Lời giải chi tiết

### Bài 1: 0xDEADBEEF

`0xDEADBEEF` → 4 bytes: `DE`, `AD`, `BE`, `EF` (từ MSB đến LSB).

**(a) Little-endian**: LSB trước → địa chỉ thấp nhất chứa `EF`:
```
Addr+0: EF
Addr+1: BE
Addr+2: AD
Addr+3: DE
```

**(b) Big-endian**: MSB trước → địa chỉ thấp nhất chứa `DE`:
```
Addr+0: DE
Addr+1: AD
Addr+2: BE
Addr+3: EF
```

---

### Bài 2: sizeof struct S

```c
struct S {
    char  a;    // 1 byte, offset 0
                // 1 byte padding (short cần align đến 2)
    short b;    // 2 byte, offset 2
    int   c;    // 4 byte, offset 4
    char  d;    // 1 byte, offset 8
                // 3 byte trailing padding (để int c trong array aligned)
};
```

Layout:
```
Offset: 0   1   2   3   4   5   6   7   8   9  10  11
        [a][PAD][b     ][c               ][d][PAD][PAD][PAD]
```

`sizeof(S) = 12`

Tổng fields thật: 1 + 2 + 4 + 1 = 8 byte. Padding: 4 byte. Tổng: 12.

---

### Bài 3: Reorder fields của struct S

Nguyên tắc: big → small.
`int c` (4) → `short b` (2) → `char a` (1) → `char d` (1)

```c
struct S_opt {
    int   c;    // 4 byte, offset 0
    short b;    // 2 byte, offset 4
    char  a;    // 1 byte, offset 6
    char  d;    // 1 byte, offset 7
                // 0 byte trailing padding (struct size = 8, aligned to 4)
};
```

Layout:
```
Offset: 0   1   2   3   4   5   6   7
        [c               ][b     ][a][d]
```

`sizeof(S_opt) = 8` — tiết kiệm 4 byte (33%).

---

### Bài 4: htonl(0xAABBCCDD) trên little-endian

`0xAABBCCDD` → bytes MSB→LSB: `AA`, `BB`, `CC`, `DD`

Trên little-endian, RAM lưu: `[DD, CC, BB, AA]` (LSB trước).

`htonl` chuyển sang big-endian (network order) = byte-swap:
- Đọc từ RAM: `DD CC BB AA`
- Byte-swap toàn bộ: `AA BB CC DD`
- Giá trị trả về: `0xAABBCCDD` (cùng giá trị số, nhưng bytes trên wire sẽ đúng thứ tự)

Nói cách khác: `htonl(x)` trên little-endian = `bswap32(x)`:
```
0xAABBCCDD → 0xDDCCBBAA
```

Verify: byte thứ 0 trong RAM của result là `AA` (MSB) → gửi lên wire đúng thứ tự big-endian.

---

## Liên kết

- Bài trước: [N2-L01 — Character Encoding](../lesson-01-character-encoding/README.md)
- Bài tiếp: [N2-L03 — Hashing Fundamentals](../lesson-03-hashing-fundamentals/README.md)
- Trang chính nhóm: [02-EncodingMemory](../index.html)
- [visualization.html](./visualization.html)
