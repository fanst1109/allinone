# DataFoundations — Nền tảng cho Cấu trúc dữ liệu

Thư mục này tập hợp **những kiến thức nền** cần có trước/song song khi học [DataStructures](../DataStructures/): cách máy tính biểu diễn số, các phép toán trên bit, và lý thuyết tập hợp.

Không phải bài học nào trong [DataStructures](../DataStructures/) cũng đòi hỏi những phần này, nhưng khi bạn gặp **bitmask**, **Bloom filter**, **Fenwick tree (BIT)**, **HashSet/HashMap**, **Union-Find**, hoặc đơn giản là câu hỏi *"vì sao `int64` chỉ chứa được tới ~9.2·10¹⁸?"* — đây là chỗ trả lời.

## Mục tiêu

- Hiểu hệ nhị phân (binary), hệ thập lục phân (hex), và biểu diễn số âm bằng *two's complement*.
- Sử dụng thành thạo 6 phép toán bit: AND, OR, XOR, NOT, shift trái/phải.
- Nắm các thao tác bitmask thông dụng và các "trick" hay gặp trong thuật toán.
- Hiểu các phép toán tập hợp cơ bản và ánh xạ — nền cho HashSet/HashMap, Union-Find.

## Danh sách bài học

| STT | Bài học | Chủ đề chính | Liên kết |
| --- | --- | --- | --- |
| 01 | Binary & Hex | Hệ cơ số, two's complement, overflow, kích thước `intN` | [lesson-01-binary-hex](./lesson-01-binary-hex/) |
| 02 | Bitwise Operations | AND/OR/XOR/NOT/shift, bitmask, các trick | [lesson-02-bitwise-ops](./lesson-02-bitwise-ops/) |
| 03 | Set Theory | Tập hợp, phép toán, ánh xạ, quan hệ tương đương | [lesson-03-set-theory](./lesson-03-set-theory/) |

## Lộ trình gợi ý

- **Học trước** [DataStructures lesson-00 → 05](../DataStructures/): đủ. Ba bài này không dài và sẽ giúp đọc các lesson sau dễ hơn.
- **Học song song**: học DS trước, khi gặp khái niệm bit/hash/tập hợp thì quay lại đọc bài tương ứng. Cũng được — DS cơ bản (Array, LinkedList, Stack, Queue) không bị chặn bởi DataFoundations.
- **Bỏ qua nếu đã biết**: nếu bạn đã quen với binary, bitwise, set — có thể nhảy thẳng vào DataStructures.

## Liên hệ tới các bài cụ thể trong DataStructures

| DataFoundations | Liên hệ trực tiếp tới |
| --- | --- |
| Binary & Hex | Hiểu giới hạn `int`, dùng khi học [Hash Table](../DataStructures/lesson-05-hash-table/), [Advanced Structures](../DataStructures/lesson-14-advanced-structures/) (Bloom filter) |
| Bitwise Ops | [Trie](../DataStructures/lesson-10-trie/) (binary trie), [Segment Tree / Fenwick](../DataStructures/lesson-13-segment-tree/), bitmask DP |
| Set Theory | [Hash Table](../DataStructures/lesson-05-hash-table/), [Union-Find](../DataStructures/lesson-12-union-find/), [Graph](../DataStructures/lesson-11-graph/) (tập đỉnh, tập cạnh) |
