# DataFoundations — Nền tảng cho Cấu trúc dữ liệu

Thư mục này tập hợp **những kiến thức nền** cần có trước/song song khi học [DataStructures](../DataStructures/): cách máy tính biểu diễn số, các phép toán trên bit, lý thuyết tập hợp, và logic mệnh đề / đại số Boolean.

Không phải bài học nào trong [DataStructures](../DataStructures/) cũng đòi hỏi những phần này, nhưng khi bạn gặp **bitmask**, **Bloom filter**, **Fenwick tree (BIT)**, **HashSet/HashMap**, **Union-Find**, hoặc đơn giản là câu hỏi *"vì sao `int64` chỉ chứa được tới ~9.2·10¹⁸?"* — đây là chỗ trả lời.

## Mục tiêu

- Hiểu hệ nhị phân (binary), hệ thập lục phân (hex), và biểu diễn số âm bằng *two's complement*.
- Sử dụng thành thạo 6 phép toán bit: AND, OR, XOR, NOT, shift trái/phải.
- Nắm các thao tác bitmask thông dụng và các "trick" hay gặp trong thuật toán.
- Hiểu các phép toán tập hợp cơ bản và ánh xạ — nền cho HashSet/HashMap, Union-Find.
- Đọc/viết được truth table, áp dụng đại số Boolean (De Morgan, absorption…) để rút gọn điều kiện trong code.

## Các nhóm (tier)

4 bài chia thành 3 nhóm theo chủ đề:

| Nhóm | Liên kết | Nội dung chính |
| --- | --- | --- |
| 1 — Biểu diễn số & bit | [01-NumberRepresentation](./01-NumberRepresentation/) | Binary & Hex, Bitwise Operations |
| 2 — Lý thuyết tập hợp | [02-SetTheory](./02-SetTheory/) | Set Theory (ánh xạ, quan hệ tương đương) |
| 3 — Logic & Boolean | [03-Logic](./03-Logic/) | Boolean Logic (truth table, đại số Boolean) |

## Danh sách bài học

### Nhóm 1 — Biểu diễn số & bit ([01-NumberRepresentation](./01-NumberRepresentation/))

| STT | Bài học | Chủ đề chính | Liên kết |
| --- | --- | --- | --- |
| 01 | Binary & Hex | Hệ cơ số, two's complement, overflow, kích thước `intN` | [lesson-01-binary-hex](./01-NumberRepresentation/lesson-01-binary-hex/) |
| 02 | Bitwise Operations | AND/OR/XOR/NOT/shift, bitmask, các trick | [lesson-02-bitwise-ops](./01-NumberRepresentation/lesson-02-bitwise-ops/) |

### Nhóm 2 — Lý thuyết tập hợp ([02-SetTheory](./02-SetTheory/))

| STT | Bài học | Chủ đề chính | Liên kết |
| --- | --- | --- | --- |
| 01 | Set Theory | Tập hợp, phép toán, ánh xạ, quan hệ tương đương | [lesson-01-set-theory](./02-SetTheory/lesson-01-set-theory/) |

### Nhóm 3 — Logic & Boolean ([03-Logic](./03-Logic/))

| STT | Bài học | Chủ đề chính | Liên kết |
| --- | --- | --- | --- |
| 01 | Boolean Logic | Mệnh đề, truth table, đại số Boolean, De Morgan, tautology | [lesson-01-boolean-logic](./03-Logic/lesson-01-boolean-logic/) |

## Lộ trình gợi ý

- **Học trước** [Nhóm Cơ bản của DataStructures](../DataStructures/01-Basic/): đủ. Ba nhóm này không dài và sẽ giúp đọc các lesson sau dễ hơn.
- **Học song song**: học DS trước, khi gặp khái niệm bit/hash/tập hợp thì quay lại đọc bài tương ứng. Cũng được — DS cơ bản (Array, LinkedList, Stack, Queue) không bị chặn bởi DataFoundations.
- **Bỏ qua nếu đã biết**: nếu bạn đã quen với binary, bitwise, set — có thể nhảy thẳng vào DataStructures.

## Liên hệ tới các bài cụ thể trong DataStructures

| DataFoundations | Liên hệ trực tiếp tới |
| --- | --- |
| Binary & Hex | Hiểu giới hạn `int`, dùng khi học [Hash Table](../DataStructures/01-Basic/lesson-06-hash-table/), [Advanced Structures](../DataStructures/03-Advanced/lesson-04-advanced-structures/) (Bloom filter) |
| Bitwise Ops | [Trie](../DataStructures/02-Intermediate/lesson-05-trie/) (binary trie), [Segment Tree / Fenwick](../DataStructures/03-Advanced/lesson-03-segment-tree/), bitmask DP |
| Set Theory | [Hash Table](../DataStructures/01-Basic/lesson-06-hash-table/), [Union-Find](../DataStructures/03-Advanced/lesson-02-union-find/), [Graph](../DataStructures/03-Advanced/lesson-01-graph/) (tập đỉnh, tập cạnh) |
| Boolean Logic | Đánh giá điều kiện trong mọi DS (BST search, hash collision, predicate filter), simplify code, formal reasoning |

## Minh họa tương tác

Mở file [index.html](./index.html) trong trình duyệt để vào trang chính của lĩnh vực — có liên kết tới visualization của từng lesson. Mỗi visualization là HTML standalone (không cần build, không phụ thuộc CDN), mở `file://` chạy ngay.
