# DataFoundations — Nền tảng dữ liệu

Thư mục này tập hợp **những kiến thức nền** về cách máy tính biểu diễn và thao tác với dữ liệu — số, bit, byte, text, hash, set, logic. Cần khi học các lĩnh vực dùng tới chúng: [DataStructures](../DataStructures/), [Cryptography](../Cryptography/), [Databases](../Databases/), [AI-ML](../AI-ML/) (numerical precision), [English](../English/)/[Chinese](../Chinese/) (encoding).

Trước đây có 4 bài. Sau khi repo mở rộng, restructure thành **3 nhóm × 8 bài** với các bài mới về floating-point, character encoding, endianness, hashing.

## Mục tiêu

- Hiểu mọi cách máy biểu diễn **số**: hệ nhị phân/hex, hai's complement, bitwise, **IEEE 754 floating-point**.
- Hiểu cách máy biểu diễn **data tổng quát**: **UTF-8 encoding**, **endianness & memory layout**, **hash functions** (mapping data → fixed-size).
- Nắm **math foundations** cho data: lý thuyết tập hợp, đại số Boolean / logic mệnh đề.

## Các nhóm

| Nhóm | Liên kết | Theme | Số bài |
|------|----------|-------|--------|
| 1 — Number & Bit Representation | [01-NumberRepresentation](./01-NumberRepresentation/) | Cách máy lưu *số* | 3 |
| 2 — Encoding & Memory | [02-EncodingMemory](./02-EncodingMemory/) | Cách máy lưu *data tổng quát* | 3 |
| 3 — Math Foundations | [03-MathFoundations](./03-MathFoundations/) | Toán logic cho data | 2 |

## Danh sách bài học

### Nhóm 1 — Number & Bit Representation ([01-NumberRepresentation](./01-NumberRepresentation/))

| # | Bài | Chủ đề |
|---|-----|--------|
| 01 | [Binary & Hex](./01-NumberRepresentation/lesson-01-binary-hex/) | Hệ cơ số, two's complement, overflow, kích thước `intN` |
| 02 | [Bitwise Operations](./01-NumberRepresentation/lesson-02-bitwise-ops/) | AND/OR/XOR/NOT/shift, bitmask, các trick (popcount, isolate lsb) |
| 03 | [Floating-point IEEE 754](./01-NumberRepresentation/lesson-03-floating-point/) | sign/exponent/mantissa, NaN/Inf/denormal, precision pitfalls (0.1+0.2≠0.3) |

### Nhóm 2 — Encoding & Memory ([02-EncodingMemory](./02-EncodingMemory/))

| # | Bài | Chủ đề |
|---|-----|--------|
| 01 | [Character Encoding](./02-EncodingMemory/lesson-01-character-encoding/) | ASCII, Unicode code point, UTF-8 (1-4 byte), UTF-16, BOM, normalization |
| 02 | [Endianness & Memory Layout](./02-EncodingMemory/lesson-02-endianness-memory/) | Big/little endian, htonl/ntohl, alignment + padding, struct size |
| 03 | [Hashing Fundamentals](./02-EncodingMemory/lesson-03-hashing-fundamentals/) | Hash function properties, collision handling (probing/chaining), load factor, birthday paradox |

### Nhóm 3 — Math Foundations ([03-MathFoundations](./03-MathFoundations/))

| # | Bài | Chủ đề |
|---|-----|--------|
| 01 | [Set Theory](./03-MathFoundations/lesson-01-set-theory/) | Tập hợp, phép toán, ánh xạ, quan hệ tương đương |
| 02 | [Boolean Logic](./03-MathFoundations/lesson-02-boolean-logic/) | Mệnh đề, truth table, đại số Boolean, De Morgan, tautology |

## Cách học

- **Học trước**: [DataStructures Nhóm 1 Cơ bản](../DataStructures/01-Basic/) — đủ để hiểu bit và set khi gặp.
- **Học song song**: học DS/Crypto/Databases trước, quay lại đọc bài DF tương ứng khi cần.
- **Bỏ qua nếu đã biết**: nếu quen binary, IEEE 754, UTF-8, set — có thể nhảy thẳng.

## Liên hệ tới các lĩnh vực phụ thuộc

| Bài DataFoundations | Dùng ở đâu |
|---------------------|------------|
| Binary & Hex, Bitwise | [DataStructures](../DataStructures/) (Hash Table, Trie, Segment Tree, bitmask DP), [Cryptography](../Cryptography/) (XOR, modular) |
| Floating-point | [AI-ML](../AI-ML/) (loss precision, learning rate), [Math/04 Calculus](../Math/04-Calculus-1var/) (numerical), DS (epsilon compare) |
| Character encoding | [English](../English/), [Chinese](../Chinese/), [Databases](../Databases/) (collation, charset), [AI-ML/T5](../AI-ML/05-NLP-Applied/) (tokenization) |
| Endianness | [Cryptography](../Cryptography/) (byte order trong protocols), [Databases](../Databases/) (binary format), [Programming](../Programming/) (network I/O) |
| Hashing | [DataStructures Hash Table](../DataStructures/01-Basic/lesson-06-hash-table/), [Cryptography T2-L03](../Cryptography/02-ModernSymmetric/lesson-03-hash-functions/), [AI-ML/T5-L03 Vector DB](../AI-ML/05-NLP-Applied/lesson-03-vector-db-rag/) |
| Set Theory | [Databases](../Databases/) (mô hình quan hệ), [DataStructures](../DataStructures/) (Union-Find, Graph), [Statistics](../Statistics/) (event space) |
| Boolean Logic | Đánh giá điều kiện trong mọi DS, [Cryptography](../Cryptography/) (XOR truth), [PoliticalScience](../PoliticalScience/) (proof formal cho Arrow) |

## Minh họa tương tác

Mở [index.html](./index.html) ở trình duyệt — mọi visualization HTML standalone, mở `file://` chạy ngay.
