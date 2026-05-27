# Algorithms — Kỹ thuật & paradigm giải thuật

Lộ trình **~52 lesson chia 8 tier**, dạy các **kỹ thuật và paradigm giải quyết vấn đề** bằng thuật toán: phân tích độ phức tạp, sắp xếp, tìm kiếm, greedy, quy hoạch động (DP), thuật toán đồ thị, thuật toán chuỗi, và các chuyên đề nâng cao. Ngôn ngữ minh họa chính: **Go (Golang)**.

## Lĩnh vực này khác `DataStructures` thế nào?

- [`DataStructures`](../DataStructures/) dạy **cấu trúc** — cách *tổ chức* dữ liệu (array, tree, heap, hash, graph...).
- `Algorithms` dạy **kỹ thuật xử lý** — cách *giải quyết bài toán* (sắp xếp, DP, shortest path, string matching...).

Hai lĩnh vực bổ trợ nhau: thuật toán thường chạy *trên* cấu trúc. Khi một lesson cần một cấu trúc cụ thể, nó sẽ link sang `DataStructures` thay vì dạy lại.

## Cấu trúc lộ trình

| Tier | Tên | Số lesson | Trọng tâm |
|------|-----|:--:|----------|
| 0 | [Nền tảng phân tích](./tier-0-foundations/index.html) | 5 | Big-O, amortized, đệ quy, tính đúng đắn |
| 1 | [Sắp xếp](./tier-1-sorting/index.html) | 6 | Elementary → merge/quick/heap → non-comparison |
| 2 | [Tìm kiếm & kỹ thuật cốt lõi](./tier-2-searching-core/index.html) | 7 | Binary search, two pointers, sliding window, prefix sum, D&C |
| 3 | [Greedy](./tier-3-greedy/index.html) | 4 | Exchange argument, interval, Huffman, greedy vs DP |
| 4 | [Quy hoạch động (DP)](./tier-4-dynamic-programming/index.html) | 8 | 1D/2D/interval/tree/bitmask DP + optimization |
| 5 | [Thuật toán đồ thị](./tier-5-graph/index.html) | 9 | BFS/DFS, topo, shortest path, MST, SCC, flow |
| 6 | [Thuật toán chuỗi](./tier-6-string/index.html) | 5 | Rabin-Karp, KMP, Z, Aho-Corasick, suffix |
| 7 | [Nâng cao & chuyên đề](./tier-7-advanced/index.html) | 5 | Bit, number theory, geometry, randomized, NP |
| 8 | [Giải quyết vấn đề & Capstone](./tier-8-problem-solving/index.html) | 3 | Framework, trade-off, pathfinding visualizer |

Tổng: **~52 lesson**.

## Cách học hiệu quả nhất

1. **Đọc tuần tự** — Tier 0 (phân tích độ phức tạp) là nền cho mọi tier sau. DP (Tier 4) giả định đã nắm đệ quy (Tier 0) và D&C (Tier 2).
2. **Trace bằng tay trước, code sau** — với mỗi thuật toán, tự chạy bằng giấy với input nhỏ trước khi đọc code.
3. **Mở `visualization.html`** — sort/DP table/graph traversal "thấm" nhanh hơn nhiều khi xem animate từng bước.
4. **Làm bài tập, không xem lời giải trước** — thuật toán là kỹ năng, phải tự nghĩ mới lên tay.
5. **Phân tích độ phức tạp mọi lời giải** — luôn hỏi "time? space? có tối ưu hơn được không?".

## Tiền đề

- Nên đã đọc qua [`DataStructures`](../DataStructures/) (ít nhất array, hash, tree, heap, graph) — Algorithms reference nhiều sang đây.
- Có ích nếu biết [`DataFoundations`](../DataFoundations/) (binary, bitwise) cho Tier 7.
- Code minh họa bằng Go — nếu chưa quen, xem [`Programming`](../Programming/) Tier 1.

## Mỗi lesson có gì?

- `README.md` — lý thuyết + **code Go inline chạy được** + walk-through từng bước bằng số cụ thể + callouts (💡 Trực giác, ❓ Câu hỏi, ⚠ Lỗi thường gặp, 🔁 Tự kiểm tra, 📝 Tóm tắt) + bài tập **có lời giải chi tiết** + phân tích độ phức tạp.
- `visualization.html` — minh họa tương tác standalone, animate thuật toán từng bước, mở trong browser là chạy.

> Lưu ý: lĩnh vực này để code Go **inline trong README** (không tách file `solutions.go` riêng).

## Bài đầu tiên

Bắt đầu từ [Lesson 01 — Big-O & phân tích tiệm cận](./lesson-01-bigo-asymptotic/README.md).
