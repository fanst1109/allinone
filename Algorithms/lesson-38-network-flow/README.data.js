// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: Algorithms/lesson-38-network-flow/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 38 — Network Flow (Luồng cực đại / Lát cắt cực tiểu)

> **Tier 5 — Thuật toán đồ thị.** Bài này dạy cách mô hình hóa và giải bài toán **luồng cực đại (max flow)** trên mạng có hướng, cùng định lý nền tảng **Max-Flow Min-Cut**. Đây là một trong những "vũ khí ẩn" mạnh nhất của thuật toán đồ thị: rất nhiều bài toán tưởng chừng không liên quan (ghép cặp, phân công, phân vùng ảnh, độ tin cậy mạng) đều **rút gọn (reduce)** được về max flow.

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Hiểu **mạng luồng (flow network)** là gì: capacity, source, sink, ràng buộc bảo toàn luồng.
- Phát biểu chính xác **bài toán max flow** và đo nó.
- Nắm cơ chế **augmenting path** (đường tăng luồng) và **residual graph** (đồ thị thặng dư) — đặc biệt là **vì sao cần cạnh ngược**.
- Cài đặt **Ford-Fulkerson** và phiên bản đảm bảo dừng **Edmonds-Karp** (BFS), hiểu vì sao Ford-Fulkerson "trần" có thể chậm/không dừng.
- Biết **Dinic's algorithm** (level graph + blocking flow) là gì và vì sao nhanh nhất thực tế.
- Phát biểu và **dùng được** định lý **Max-Flow Min-Cut** — tìm min cut từ residual graph.
- Rút gọn các bài: **bipartite matching**, **edge-disjoint paths**, **multiple source/sink**, **vertex capacity** về max flow.

## Kiến thức tiền đề

- [Lesson 31 — Duyệt đồ thị (BFS/DFS)](../lesson-31-graph-traversal/README.md): BFS, DFS, biểu diễn đồ thị. Edmonds-Karp = Ford-Fulkerson + BFS.
- [Lesson 36 — Connected Components](../lesson-36-connected-components/README.md): khái niệm reachability (đỉnh tới được) — dùng để trích min cut.
- Bài tiếp: [Lesson 39 — Bipartite Matching](../lesson-39-bipartite-matching/README.md) sẽ đào sâu ghép cặp, mà bài này đã reduce về flow.

---

## 1. Mạng luồng (Flow network) — mô hình

> 💡 **Trực giác / Hình dung.** Tưởng tượng một **hệ thống ống nước**. Có một **nguồn** \`s\` (trạm bơm) và một **bể chứa** \`t\` (đích). Mỗi đoạn ống \`u → v\` có **đường kính giới hạn** — tối đa bơm được \`c(u,v)\` lít/giây qua nó. Câu hỏi: **bơm được tối đa bao nhiêu lít/giây từ \`s\` tới \`t\`** mà không làm vỡ ống nào? Đó chính là max flow.

Hình thức hơn, một **mạng luồng** là đồ thị có hướng \`G = (V, E)\` với:

- Mỗi cạnh \`(u, v) ∈ E\` có **sức chứa (capacity)** \`c(u, v) ≥ 0\`. Nếu không có cạnh thì quy ước \`c(u,v) = 0\`.
- Một đỉnh **nguồn (source)** \`s\` và một đỉnh **đích (sink)** \`t\`.

Một **luồng (flow)** là hàm \`f(u, v)\` thỏa 3 ràng buộc:

1. **Ràng buộc sức chứa**: \`0 ≤ f(u, v) ≤ c(u, v)\` — không bơm quá đường kính ống.
2. **Bảo toàn luồng (flow conservation)**: tại mọi đỉnh \`v ≠ s, t\`, **tổng vào = tổng ra**.
   \`Σ_u f(u, v) = Σ_w f(v, w)\`. Nước không tự sinh ra hay biến mất ở giữa đường.
3. **Giá trị luồng** \`|f|\` = tổng luồng ra khỏi \`s\` (= tổng luồng vào \`t\`):
   \`|f| = Σ_v f(s, v) − Σ_v f(v, s)\`.

> ❓ **Câu hỏi tự nhiên của người đọc.**
> - *"Capacity là số nguyên hay thực?"* — Trong bài này dùng **số nguyên** (thực tế gần như luôn vậy). Số nguyên đảm bảo các thuật toán dừng (mục 5).
> - *"Nguồn \`s\` có cần ràng buộc bảo toàn không?"* — Không. \`s\` được phép "đẻ ra" luồng, \`t\` được phép "nuốt" luồng. Bảo toàn chỉ áp dụng cho các đỉnh **giữa**.
> - *"Có thể có nhiều nguồn / nhiều đích không?"* — Có, và ta rút gọn về 1 nguồn / 1 đích bằng **super source/sink** (mục 10).

### Ví dụ số cụ thể

Mạng 4 đỉnh \`s, a, b, t\`, capacity ghi trên cạnh:

\`\`\`
        s
      3/   \\2
      a      b
      2\\    /3
        \\  /
         t
   và cạnh a→b capacity 1
\`\`\`

Cụ thể: \`c(s,a)=3, c(s,b)=2, c(a,b)=1, c(a,t)=2, c(b,t)=3\`.

Một luồng hợp lệ: \`f(s,a)=2, f(a,t)=2, f(s,b)=2, f(b,t)=2\`, các cạnh khác = 0.
- Sức chứa: \`2≤3, 2≤2, 2≤2, 2≤3\` ✓.
- Bảo toàn tại \`a\`: vào = \`f(s,a)=2\`, ra = \`f(a,t)=2\` ✓. Tại \`b\`: vào = \`2\`, ra = \`2\` ✓.
- Giá trị: \`|f| = f(s,a)+f(s,b) = 2+2 = 4\`.

Đây có phải max flow? Chưa chắc — ta sẽ thấy ở mục 6 rằng max flow mạng này là **4** (đúng), bị nghẽn bởi cạnh ra khỏi \`s\` (tổng \`3+2=5\`) và vào \`t\` (\`2+3=5\`), nhưng cấu trúc giữa giới hạn ở 4.

> 📝 **Tóm tắt mục 1.**
> - Flow network = đồ thị có hướng + capacity mỗi cạnh + nguồn \`s\` + đích \`t\`.
> - Luồng hợp lệ: ≤ capacity, bảo toàn tại đỉnh giữa, giá trị = luồng ra khỏi \`s\`.
> - Max flow = giá trị luồng lớn nhất có thể.

---

## 2. Bài toán Max Flow

> 💡 **Trực giác.** "Mở van hết cỡ ở \`s\`, nước chảy qua mạng ống tới \`t\`. Lượng nước tối đa chảy được — bị giới hạn bởi **chỗ thắt cổ chai (bottleneck)** nào đó trong mạng — là max flow."

**Bài toán**: cho mạng luồng \`(G, c, s, t)\`, tìm luồng \`f\` có giá trị \`|f|\` **lớn nhất**.

Vì sao bài toán này quan trọng? Vì "lượng tối đa truyền qua mạng có ràng buộc" xuất hiện khắp nơi:

| Bài toán thực | \`s\`, \`t\`, capacity là gì |
|---|---|
| Mạng truyền dữ liệu | s=server, t=client, capacity = băng thông cáp |
| Giao thông | s, t = 2 thành phố, capacity = số làn xe/giờ |
| Phân công người ↔ việc | (mục 9) reduce về flow, capacity = 1 |
| Phân vùng ảnh | (mục 9) pixel ↔ nhãn |

Ý tưởng cốt lõi của **mọi** thuật toán max flow: lặp đi lặp lại **tìm một đường còn chỗ để bơm thêm** rồi **bơm thêm**, cho tới khi không còn đường nào. Đường đó gọi là **augmenting path**.

---

## 3. Augmenting path (Đường tăng luồng)

> 💡 **Trực giác.** Một augmenting path là **một đường đi \`s → t\` mà mọi ống trên đó còn dư chỗ**. Nếu tìm được, ta có thể bơm thêm một lượng = ống hẹp nhất còn lại trên đường (bottleneck của đường), làm tăng tổng luồng.

Định nghĩa: với luồng \`f\` hiện tại, **dung lượng dư (residual capacity)** của cạnh \`(u,v)\` là
\`c_f(u, v) = c(u, v) − f(u, v)\` (còn bơm thêm được bao nhiêu).

Một **augmenting path** là đường từ \`s\` tới \`t\` mà **mọi cạnh đều có \`c_f > 0\`**. Lượng bơm thêm = \`min\` các \`c_f\` trên đường (gọi là **bottleneck**).

### Walk-through tăng luồng

Dùng lại mạng mục 1, bắt đầu \`f = 0\`:

- Đường \`s → a → t\`: residual \`c_f(s,a)=3, c_f(a,t)=2\` → bottleneck \`min(3,2)=2\`. Bơm 2.
  Giờ \`f(s,a)=2, f(a,t)=2\`. \`|f|=2\`.
- Đường \`s → b → t\`: \`c_f(s,b)=2, c_f(b,t)=3\` → bottleneck \`2\`. Bơm 2.
  Giờ \`|f|=4\`.
- Đường \`s → a → b → t\`? \`c_f(s,a)=3−2=1, c_f(a,b)=1, c_f(b,t)=3−2=1\` → bottleneck \`1\`. Bơm 1.
  Giờ \`|f|=5\`?

Khoan — \`|f|=5\` mâu thuẫn với "max=4" ở mục 1? **Không.** Mục 1 chỉ đưa ra **một** luồng cụ thể giá trị 4, không khẳng định đó là max. Tính lại bottleneck mạng này: max flow thật = **5** (cạnh \`a→b\` cho phép \`a\` "đổ bớt" sang nhánh \`b\`). Đây là minh họa quan trọng: **đừng tin một luồng bất kỳ là tối ưu** — phải tăng tới khi hết augmenting path.

> ⚠ **Lỗi thường gặp.** Bơm tham lam theo đường đầu tiên tìm được rồi tưởng đã xong. **Một quyết định bơm sớm có thể "chặn" đường tốt hơn về sau.** Để sửa sai lầm này mà không phải tính lại từ đầu, ta cần **cạnh ngược** trong residual graph (mục 4) — cho phép "rút lại" luồng đã bơm.

> 🔁 **Dừng lại tự kiểm tra.** Trên đường \`s → x → y → t\` với residual \`c_f = 4, 2, 7\`, ta bơm thêm bao nhiêu?
> <details><summary>Đáp án</summary>\`min(4,2,7) = 2\`. Sau đó cạnh \`x→y\` bão hòa (\`c_f\` về 0), không còn dùng được trên đường khác cho tới khi có luồng rút lại nó.</details>

---

## 4. Residual graph (Đồ thị thặng dư) — và vì sao cần cạnh ngược

> 💡 **Trực giác.** Residual graph trả lời câu hỏi: *"Tại trạng thái luồng hiện tại, tôi còn có thể bơm thêm theo những hướng nào?"* Nó gồm **2 loại cạnh**:
> - **Cạnh xuôi (forward)**: với mỗi cạnh \`(u,v)\` còn dư, có cạnh residual \`u→v\` dung lượng \`c(u,v) − f(u,v)\`.
> - **Cạnh ngược (backward)**: với mỗi cạnh \`(u,v)\` đã bơm \`f(u,v) > 0\`, có cạnh residual \`v→u\` dung lượng \`f(u,v)\` — nghĩa là *"có thể rút lại tối đa \`f(u,v)\` đơn vị đã bơm"*.

### Vì sao cần cạnh ngược? (undo quyết định)

Đây là **ý tưởng then chốt** của toàn bộ lý thuyết flow. Cạnh ngược cho phép thuật toán **hoàn (undo)** một quyết định bơm trước đó nếu sau này thấy nó không tối ưu — mà **không cần** quay lui rõ ràng.

Walk-through minh họa kinh điển. Mạng:

\`\`\`
   s →(3)→ a →(1)→ b →(3)→ t
   s →(3)→ b        a →(3)→ t
\`\`\`

Cụ thể: \`c(s,a)=3, c(s,b)=3, c(a,b)=1, c(a,t)=3, c(b,t)=3\`. Max flow thật = **6**.

**Bước 1**: tìm đường \`s → a → b → t\` (giả sử BFS/DFS chọn nó). Residual: \`3, 1, 3\` → bottleneck \`1\`. Bơm 1.
- \`f(s,a)=1, f(a,b)=1, f(b,t)=1\`. \`|f|=1\`.
- **Đây là quyết định "kém"**: ta đã đẩy 1 đơn vị từ \`a\` vòng qua \`b\`, nhưng đáng ra \`a\` nên đi thẳng \`a→t\`.

**Bước 2**: residual graph giờ có cạnh ngược \`b→a\` (dung lượng 1, vì \`f(a,b)=1\`). Tìm đường mới:
- \`s → b → a → t\`: residual \`c_f(s,b)=3, c_f(b,a)=1\` (CẠNH NGƯỢC!), \`c_f(a,t)=3\` → bottleneck \`1\`. Bơm 1.
- Đi qua cạnh ngược \`b→a\` nghĩa là **rút lại** 1 đơn vị luồng \`a→b\`: \`f(a,b)\` về 0. Đồng thời tăng \`f(s,b)+=1, f(a,t)+=1\`.
- Hiệu ứng ròng: như thể luồng giờ là \`s→a→t\` (1 đơn vị) và \`s→b→t\` (1 đơn vị). \`|f|=2\`.

**Bước 3, 4**: tiếp tục bơm \`s→a→t\` (thêm 2) và \`s→b→t\` (thêm 2) → \`|f| = 6\`. Đạt max.

> ❓ **Câu hỏi tự nhiên.**
> - *"Cạnh ngược có làm sai kết quả không?"* — Không. Đẩy luồng qua cạnh ngược chính xác bằng việc giảm luồng cạnh xuôi tương ứng — toán học chứng minh được luồng vẫn hợp lệ (bảo toàn vẫn đúng).
> - *"Nếu quên cạnh ngược thì sao?"* — Thuật toán vẫn cho **một** luồng hợp lệ, nhưng **không tối ưu** — kẹt ở giá trị thấp do không undo được. Đây là cạm bẫy #1 (mục 12).

> ⚠ **Lỗi thường gặp.** Cài residual graph chỉ với cạnh xuôi. Phải lưu **cả cặp cạnh** (xuôi + ngược) và khi bơm \`Δ\` qua cạnh \`e\`, **trừ** \`Δ\` ở residual của \`e\` và **cộng** \`Δ\` ở residual của cạnh đối \`e.rev\`. Mẹo cài: lưu các cạnh trong một mảng, cạnh \`i\` và \`i^1\` là cặp đối nhau (XOR 1).

> 🔁 **Dừng lại tự kiểm tra.** Cạnh \`(u,v)\` có \`c=5, f=3\`. Residual graph có những cạnh nào liên quan cặp này?
> <details><summary>Đáp án</summary>Cạnh xuôi \`u→v\` dung lượng \`5−3=2\` (bơm thêm 2 được) và cạnh ngược \`v→u\` dung lượng \`3\` (rút lại tối đa 3).</details>

> 📝 **Tóm tắt mục 4.**
> - Residual graph = cạnh xuôi (dư = \`c−f\`) + cạnh ngược (= \`f\`, để undo).
> - Cạnh ngược là cơ chế sửa quyết định bơm sai mà không quay lui.
> - Cài đặt: lưu cặp cạnh, dùng XOR-1 trick để tìm cạnh đối.

---

## 5. Ford-Fulkerson — khung lặp augmenting path

> 💡 **Trực giác.** "Cứ tìm bất kỳ đường còn dư chỗ trên residual graph, bơm tới đa theo nó, lặp lại. Khi không còn đường \`s→t\` nào trên residual → đã đạt max flow."

\`\`\`
Ford-Fulkerson(G, s, t):
    f = 0
    while tồn tại augmenting path p từ s tới t trong residual graph G_f:
        Δ = min residual capacity trên p
        bơm Δ dọc p (cập nhật cả cạnh xuôi & ngược)
    return f
\`\`\`

**Định lý dừng (số nguyên)**: nếu mọi capacity là **số nguyên**, mỗi vòng lặp tăng \`|f|\` ít nhất 1 → tối đa \`|f*|\` vòng. Độ phức tạp **O(|f*| · E)** với \`|f*|\` = giá trị max flow (vì mỗi lần tìm đường bằng DFS tốn \`O(E)\`).

> ⚠ **Lỗi thường gặp / vấn đề của Ford-Fulkerson "trần".**
> - **Chọn đường tùy ý (DFS)** có thể chậm tệ hại. Ví dụ kinh điển: mạng có cạnh \`a→b\` capacity 1 ở giữa, 2 cạnh ngoài capacity \`1,000,000\`. Nếu mỗi lần DFS chọn đường đi qua \`a→b\` rồi bù lại bằng cạnh ngược, ta tốn **2,000,000 vòng** dù max flow chỉ là 2,000,000 — \`O(|f*|·E)\` phụ thuộc giá trị flow, không phải kích thước đồ thị. **Tệ hơn**: với capacity **vô tỉ (irrational)**, Ford-Fulkerson DFS có thể **không bao giờ dừng** (chuỗi bottleneck hội tụ nhưng không đạt max).
> - **Cách sửa**: chọn đường thông minh hơn. **Edmonds-Karp** dùng BFS (đường ngắn nhất theo số cạnh) → dừng, độc lập với độ lớn capacity.

---

## 6. Edmonds-Karp — Ford-Fulkerson + BFS

> 💡 **Trực giác.** Giống Ford-Fulkerson, nhưng **mỗi vòng tìm augmenting path NGẮN NHẤT theo số cạnh** (BFS thay vì DFS). Điều này khiến số vòng lặp bị chặn bởi \`O(V·E)\` — **không phụ thuộc capacity** — nên luôn dừng kể cả với capacity thực.

**Độ phức tạp**: \`O(V · E²)\`. Chứng minh (ý tưởng): khoảng cách BFS từ \`s\` tới mỗi đỉnh **không giảm** qua các vòng, và mỗi cạnh chỉ trở thành "tới hạn (critical, tức bottleneck)" \`O(V)\` lần → tổng \`O(V·E)\` lần augment, mỗi lần BFS tốn \`O(E)\`.

### Walk-through đầy đủ Edmonds-Karp trên mạng nhỏ

Mạng 4 đỉnh \`s(0), a(1), b(2), t(3)\`:
\`c(s,a)=3, c(s,b)=2, c(a,b)=1, c(a,t)=2, c(b,t)=3\`.

Khởi tạo \`f=0\`. BFS luôn tìm đường ít cạnh nhất.

**Vòng 1.** BFS từ \`s\` trên residual. Đường ngắn nhất \`s→a→t\` (2 cạnh) hoặc \`s→b→t\` (2 cạnh) — giả sử BFS duyệt \`a\` trước.
- Đường \`s→a→t\`: residual \`c_f(s,a)=3, c_f(a,t)=2\` → bottleneck \`2\`. Bơm 2.
- \`f(s,a)=2, f(a,t)=2\`. \`|f|=2\`. Cạnh \`a→t\` bão hòa.

**Vòng 2.** BFS lại. \`a→t\` đã bão hòa. Đường 2 cạnh còn lại \`s→b→t\`: residual \`c_f(s,b)=2, c_f(b,t)=3\` → bottleneck \`2\`. Bơm 2.
- \`f(s,b)=2, f(b,t)=2\`. \`|f|=4\`. Cạnh \`s→b\` bão hòa.

**Vòng 3.** BFS lại. Từ \`s\`: cạnh \`s→a\` còn dư 1 (\`c_f=3−2=1\`), \`s→b\` bão hòa. Tới \`a\`. Từ \`a\`: \`a→t\` bão hòa, nhưng \`a→b\` còn dư 1 (\`c_f=1\`). Tới \`b\`. Từ \`b\`: \`b→t\` còn dư 1 (\`c_f=3−2=1\`). Tới \`t\`.
- Đường \`s→a→b→t\` (3 cạnh): residual \`1, 1, 1\` → bottleneck \`1\`. Bơm 1.
- \`f(s,a)=3, f(a,b)=1, f(b,t)=3\`. \`|f|=5\`.

**Vòng 4.** BFS lại. Từ \`s\`: \`s→a\` bão hòa (\`f=3=c\`), \`s→b\` bão hòa. **Không tới được đỉnh nào khác.** Không có augmenting path → **dừng**.

**Kết quả: max flow = 5.** (Khớp phân tích lại ở mục 3.)

Bảng tóm tắt các vòng:

| Vòng | Đường BFS | Bottleneck | \`|f|\` sau |
|------|-----------|:----------:|:---------:|
| 1 | s→a→t | 2 | 2 |
| 2 | s→b→t | 2 | 4 |
| 3 | s→a→b→t | 1 | 5 |
| 4 | (không có) | — | 5 (dừng) |

> 🔁 **Dừng lại tự kiểm tra.** Vì sao vòng 3 đi đường 3 cạnh chứ không phải sớm hơn?
> <details><summary>Đáp án</summary>BFS ưu tiên đường ít cạnh. Hai đường 2-cạnh (\`s→a→t\`, \`s→b→t\`) bị "tiêu thụ" trước (vòng 1-2) tới khi bão hòa, lúc đó đường 3-cạnh mới là ngắn nhất còn lại. Khoảng cách BFS từ \`s\` tới \`t\` tăng dần — đặc trưng của Edmonds-Karp.</details>

---

## 7. Dinic's algorithm — level graph + blocking flow (nhanh nhất thực tế)

> 💡 **Trực giác.** Edmonds-Karp augment **từng đường một**. Dinic gom nhiều đường cùng "độ sâu" lại xử lý một lượt: dựng **level graph** (BFS gán mỗi đỉnh một level = khoảng cách từ \`s\`), rồi đẩy **blocking flow** (đẩy hết các đường mà chỉ đi từ level thấp lên level cao) bằng DFS nhiều đường. Sau mỗi pha, level của \`t\` tăng → tối đa \`O(V)\` pha.

Khung (chỉ nhắc qua — chi tiết cài đặt nằm ngoài phạm vi bài này):

\`\`\`
Dinic(G, s, t):
    while BFS dựng được level graph (t có level hữu hạn):
        đẩy blocking flow bằng DFS (dùng con trỏ "current edge" để bỏ qua cạnh chết)
    return f
\`\`\`

**Độ phức tạp**: \`O(V² · E)\` tổng quát. Đặc biệt:
- Trên mạng **đơn vị capacity** (unit capacity, dùng cho bipartite matching): \`O(E·√V)\` — rất nhanh.
- Thực tế Dinic chạy nhanh hơn nhiều so với worst case, là lựa chọn mặc định cho contest / hệ thống thật.

> ❓ **Câu hỏi tự nhiên.** *"Bài này có cần cài Dinic không?"* — Không. Bài này cài **Edmonds-Karp** (dễ hiểu, đủ nhanh cho mạng vài trăm đỉnh). Biết Dinic tồn tại + độ phức tạp là đủ. Khi cần hiệu năng cao (mạng lớn, unit-capacity matching) hãy dùng Dinic.

---

## 8. Định lý Max-Flow Min-Cut

> 💡 **Trực giác.** "Lượng nước tối đa qua mạng đúng bằng **tổng đường kính của bộ ống nhỏ nhất mà nếu cắt đứt sẽ tách hẳn \`s\` khỏi \`t\`**." Bottleneck của toàn mạng = min cut.

**Định nghĩa lát cắt (s-t cut)**: một cách chia \`V\` thành 2 tập \`(S, T)\` với \`s ∈ S\`, \`t ∈ T\`. **Sức chứa của cut** = tổng capacity các cạnh **đi từ \`S\` sang \`T\`** (chỉ chiều \`S→T\`, không tính \`T→S\`):
\`cap(S,T) = Σ_{u∈S, v∈T} c(u,v)\`.

**Định lý Max-Flow Min-Cut**: với mọi mạng,
\`max flow value = min cut capacity\`.

Hệ quả 3 phát biểu tương đương:
1. \`f\` là max flow.
2. Residual graph \`G_f\` **không** còn augmenting path nào.
3. Tồn tại một cut \`(S,T)\` với \`cap(S,T) = |f|\`.

### Tìm min cut từ residual graph (cách thực hành)

Sau khi chạy max flow tới khi dừng:
1. Từ \`s\`, **BFS/DFS trên residual graph** (chỉ đi cạnh \`c_f > 0\`). Tập đỉnh tới được = \`S\`.
2. Phần còn lại = \`T\`. Min cut = các cạnh **gốc** (cạnh xuôi của đồ thị ban đầu) đi từ \`S\` sang \`T\`.

### Walk-through min cut

Dùng mạng mục 6 sau khi đạt max flow = 5 (\`f(s,a)=3, f(s,b)=2\` đều bão hòa).

- BFS từ \`s\` trên residual: \`s→a\`? \`c_f(s,a)=3−3=0\` → **không đi được**. \`s→b\`? \`c_f(s,b)=2−2=0\` → **không đi được**.
- Vậy từ \`s\` không tới được đỉnh nào → \`S = {s}\`, \`T = {a, b, t}\`.
- Cạnh gốc từ \`S\` sang \`T\`: \`s→a\` (cap 3), \`s→b\` (cap 2). \`cap(S,T) = 3+2 = 5\`.
- **Khớp** max flow = 5 ✓. Min cut chính là 2 cạnh ra khỏi \`s\` — đó là bottleneck của mạng này.

> ⚠ **Lỗi thường gặp.** Tính min cut bằng cách "tìm cạnh bão hòa" tùy tiện. **Đúng** phải là: BFS từ \`s\` **trên residual graph** → lấy tập tới được \`S\` → đếm cạnh gốc \`S→T\`. Cạnh bão hòa không nằm trong cut nếu cả 2 đầu cùng phía. Và **không** đếm cạnh ngược \`T→S\`.

> 🔁 **Dừng lại tự kiểm tra.** Một cut có cạnh \`S→T\` capacity tổng 7 và cạnh \`T→S\` capacity tổng 4. \`cap(S,T)\` bằng bao nhiêu?
> <details><summary>Đáp án</summary>\`7\`. Cut capacity **chỉ** tính cạnh chiều \`S→T\`. Cạnh \`T→S\` bị bỏ qua hoàn toàn.</details>

> 📝 **Tóm tắt mục 8.**
> - Max flow = min cut (định lý nền tảng).
> - Min cut: BFS \`s\` trên residual sau khi dừng → \`S\` = tới được → đếm cạnh gốc \`S→T\`.
> - Chỉ tính chiều \`S→T\`, không tính \`T→S\`.

---

## 9. Ứng dụng — vì sao max flow là "vũ khí ẩn"

### 9.1 Bipartite matching (ghép cặp 2 phía) — reduce về max flow

> 💡 **Trực giác.** Cho \`L\` người và \`R\` việc, mỗi người làm được một số việc. Ghép tối đa bao nhiêu cặp người-việc (mỗi người ≤ 1 việc, mỗi việc ≤ 1 người)? **Biến thành flow**: thêm \`s\` nối tới mọi người (cap 1), mọi việc nối tới \`t\` (cap 1), mỗi cạnh người→việc cap 1. **Max flow = số cặp ghép tối đa.**

Cap 1 ở cạnh \`s→người\` ép mỗi người chỉ "phát" 1 đơn vị (1 việc); cap 1 ở \`việc→t\` ép mỗi việc chỉ "nhận" 1. Đây là mối liên hệ chính dẫn sang [Lesson 39 — Bipartite Matching](../lesson-39-bipartite-matching/README.md). Code minh họa ở mục cuối phần Code.

### 9.2 Image segmentation, project selection

- **Phân vùng ảnh**: mỗi pixel = đỉnh, nối \`s\` (nền) và \`t\` (đối tượng) với chi phí gán nhãn, cạnh giữa pixel kề = chi phí "biên". Min cut = phân vùng tối ưu (mô hình Boykov-Kolmogorov).
- **Project selection (chọn dự án có lời tối đa)**: dự án có lợi nhuận / chi phí + ràng buộc phụ thuộc → reduce về min cut.

### 9.3 Edge-disjoint & vertex-disjoint paths

> 💡 **Trực giác.** "Tối đa bao nhiêu đường \`s→t\` mà **không đường nào dùng chung cạnh**?" → đặt **capacity 1 cho mọi cạnh**, max flow = số đường rời cạnh tối đa (định lý Menger). Muốn rời **đỉnh** thì thêm bước split node (mục 10).

### 9.4 Network reliability, baseball elimination

- **Độ tin cậy mạng**: số cạnh tối thiểu phải hỏng để ngắt \`s\`-\`t\` = min cut (cap 1).
- **Baseball elimination**: đội X còn cơ hội vô địch không? Dựng mạng các trận còn lại → nếu max flow < tổng trận thì X bị loại. Bài toán "tưởng số học" hóa ra là flow.

---

## 10. Reduction — các bài "max flow ẩn"

Nhiều bài không nói "max flow" nhưng reduce được:

### 10.1 Multiple source / sink → super source/sink

Nhiều nguồn \`s₁..sₖ\`, nhiều đích \`t₁..tₘ\`:
- Thêm **super source** \`S\` nối tới mỗi \`sᵢ\` với cap \`∞\` (hoặc cap nguồn của \`sᵢ\` nếu mỗi nguồn có giới hạn phát).
- Thêm **super sink** \`T\` nối từ mỗi \`tⱼ\` tới \`T\` cap \`∞\`.
- Chạy max flow từ \`S\` tới \`T\`.

### 10.2 Vertex capacity → split node

Mạng giới hạn lượng đi **qua một đỉnh** \`v\` (không chỉ qua cạnh):
- **Tách đỉnh**: \`v\` → \`v_in\` và \`v_out\`, thêm cạnh \`v_in → v_out\` cap = capacity của đỉnh \`v\`.
- Mọi cạnh tới \`v\` giờ tới \`v_in\`; mọi cạnh từ \`v\` giờ xuất từ \`v_out\`.
- Luồng qua \`v\` buộc đi qua \`v_in→v_out\` → bị giới hạn đúng bằng vertex capacity.

> ❓ **Câu hỏi tự nhiên.** *"Vertex-disjoint paths thì sao?"* — Đặt vertex capacity = 1 (split node, cạnh \`v_in→v_out\` cap 1) cho mọi đỉnh giữa, capacity cạnh = \`∞\` (hoặc 1). Max flow = số đường rời đỉnh.

> 🔁 **Dừng lại tự kiểm tra.** Bài "tối đa hàng từ 3 kho tới 2 cửa hàng, mỗi trạm trung chuyển chỉ qua được 10 đơn vị". Cần kỹ thuật reduce nào?
> <details><summary>Đáp án</summary>**Cả hai**: super source nối 3 kho + super sink nối 2 cửa hàng; **split node** cho trạm trung chuyển (cạnh \`in→out\` cap 10) để áp vertex capacity. Rồi chạy 1 lần max flow.</details>

---

## 11. Độ phức tạp — tổng kết

| Thuật toán | Chọn đường | Độ phức tạp | Dừng với capacity thực? |
|---|---|---|:---:|
| Ford-Fulkerson | DFS tùy ý | \`O(|f*| · E)\` | ❌ (có thể không) |
| **Edmonds-Karp** | BFS (ngắn nhất) | \`O(V · E²)\` | ✅ |
| Dinic | level graph + blocking | \`O(V² · E)\` | ✅ |
| Dinic (unit cap) | — | \`O(E · √V)\` | ✅ |

- \`|f*|\` = giá trị max flow (có thể rất lớn → Ford-Fulkerson tệ).
- Edmonds-Karp là lựa chọn an toàn để học/cài; Dinic khi cần hiệu năng.
- Mọi thuật toán trên đều cho **cùng** giá trị max flow (định lý min cut đảm bảo tính đúng).

---

## 12. Cạm bẫy thường gặp

| Cạm bẫy | Hậu quả | Cách tránh |
|---|---|---|
| **Quên cạnh ngược** trong residual | Kẹt ở luồng không tối ưu | Luôn lưu cặp cạnh; bơm \`Δ\` thì \`e -= Δ\`, \`e.rev += Δ\` |
| **Ford-Fulkerson DFS với capacity thực** | Có thể không dừng | Dùng **Edmonds-Karp (BFS)** |
| **Tính min cut sai** | Cut không khớp max flow | BFS \`s\` **trên residual** sau khi dừng → tập \`S\` tới được → cạnh gốc \`S→T\` |
| **Cạnh vô hướng (undirected)** | Mô hình sai | Tách thành 2 cạnh có hướng, mỗi cạnh cap \`c\`; hoặc 1 cặp residual dùng chung dung lượng |
| **Capacity = ∞ tràn số** | Overflow | Dùng giá trị "đủ lớn" (vd tổng mọi capacity) thay \`MaxInt\` |
| **Đếm cạnh \`T→S\` vào cut** | Cut capacity sai (lớn hơn) | Chỉ tính chiều \`S→T\` |
| **Khởi tạo lại residual sai giữa các vòng** | Kết quả sai | Residual cập nhật **tích lũy** qua các vòng, không reset |

---

## Code & Minh họa (Go inline)

Toàn bộ code dưới đây dùng **biểu diễn cạnh dạng mảng + XOR-1 trick** để truy cập cạnh đối (cạnh ngược). Đây là cách cài Edmonds-Karp gọn và chuẩn.

### Cấu trúc cạnh + thêm cạnh

\`\`\`go
package main

import (
	"fmt"
)

// Edge: cạnh trong residual graph.
// cap = dung lượng dư hiện tại (residual capacity).
// Mỗi cạnh "thật" được lưu thành CẶP: edges[i] (xuôi) và edges[i^1] (ngược).
type Edge struct {
	to  int // đỉnh đích
	cap int // dung lượng dư còn lại
}

type MaxFlow struct {
	n     int
	edges []Edge  // tất cả cạnh (xuôi & ngược xen kẽ)
	graph [][]int // graph[v] = danh sách CHỈ SỐ cạnh xuất phát từ v
}

func NewMaxFlow(n int) *MaxFlow {
	return &MaxFlow{n: n, graph: make([][]int, n)}
}

// AddEdge thêm cạnh có hướng u->v dung lượng cap.
// Tạo CẢ cạnh ngược v->u dung lượng 0 (để undo flow sau này).
// Sau khi push, cạnh xuôi i và cạnh ngược i^1 là cặp đối nhau (XOR 1).
func (mf *MaxFlow) AddEdge(u, v, cap int) {
	mf.graph[u] = append(mf.graph[u], len(mf.edges))
	mf.edges = append(mf.edges, Edge{to: v, cap: cap}) // index chẵn = xuôi
	mf.graph[v] = append(mf.graph[v], len(mf.edges))
	mf.edges = append(mf.edges, Edge{to: u, cap: 0}) // index lẻ = ngược, cap khởi tạo 0
}
\`\`\`

> **Walk-through residual với XOR-1.** Khi \`AddEdge(u,v,5)\`: tạo \`edges[2k] = {v, 5}\` (xuôi) và \`edges[2k+1] = {u, 0}\` (ngược). Nếu bơm \`Δ=2\` qua cạnh \`2k\`: \`edges[2k].cap -= 2\` (còn 3), \`edges[2k^1].cap += 2\` → \`edges[2k+1].cap = 2\` (rút lại được 2). \`2k ^ 1 = 2k+1\` và \`(2k+1) ^ 1 = 2k\` — luôn tìm đúng cạnh đối.

### Edmonds-Karp (BFS tìm augmenting path)

\`\`\`go
// MaxFlowEK chạy Edmonds-Karp từ s tới t, trả về giá trị max flow.
// Lặp: BFS tìm đường ngắn nhất còn dư -> bơm bottleneck -> lặp tới khi hết đường.
// Độ phức tạp O(V * E^2).
func (mf *MaxFlow) MaxFlowEK(s, t int) int {
	flow := 0
	for {
		// BFS: tìm đường s->t trên residual, lưu cạnh tới mỗi đỉnh (parent edge).
		parentEdge := make([]int, mf.n)
		for i := range parentEdge {
			parentEdge[i] = -1
		}
		parentEdge[s] = -2 // đánh dấu s đã thăm (giá trị đặc biệt khác -1)
		queue := []int{s}
		for len(queue) > 0 && parentEdge[t] == -1 {
			u := queue[0]
			queue = queue[1:]
			for _, id := range mf.graph[u] {
				e := mf.edges[id]
				// chỉ đi cạnh còn dung lượng dư và đỉnh chưa thăm
				if e.cap > 0 && parentEdge[e.to] == -1 {
					parentEdge[e.to] = id
					queue = append(queue, e.to)
				}
			}
		}
		if parentEdge[t] == -1 {
			break // không còn augmenting path -> đạt max flow
		}

		// Tìm bottleneck = min residual trên đường (truy ngược từ t về s).
		bottleneck := 1 << 60
		for v := t; v != s; {
			id := parentEdge[v]
			if mf.edges[id].cap < bottleneck {
				bottleneck = mf.edges[id].cap
			}
			v = mf.edges[id^1].to // cạnh ngược id^1 trỏ về đỉnh trước
		}

		// Bơm bottleneck dọc đường: cạnh xuôi -= , cạnh ngược += .
		for v := t; v != s; {
			id := parentEdge[v]
			mf.edges[id].cap -= bottleneck   // giảm dư cạnh xuôi
			mf.edges[id^1].cap += bottleneck // tăng dư cạnh ngược (cho phép undo)
			v = mf.edges[id^1].to
		}
		flow += bottleneck
	}
	return flow
}
\`\`\`

> **Walk-through truy ngược đường.** Đỉnh \`v=t\`, \`parentEdge[t]=id\`. Cạnh \`id\` là cạnh \`?→t\`; đỉnh trước nó là \`edges[id^1].to\` (cạnh ngược trỏ ngược lại). Lặp về tới \`s\`. Trong khi đi, \`min\` các \`cap\` = bottleneck. Lượt 2 đi lại đúng đường đó để bơm.

### Trích Min Cut từ residual

\`\`\`go
// MinCut trả về tập đỉnh S (phía s) của min cut, sau khi đã chạy MaxFlowEK.
// BFS từ s trên residual (chỉ cạnh cap > 0). Đỉnh tới được = S; còn lại = T.
// Các cạnh GỐC từ S sang T chính là min cut.
func (mf *MaxFlow) MinCut(s int) []bool {
	inS := make([]bool, mf.n)
	inS[s] = true
	queue := []int{s}
	for len(queue) > 0 {
		u := queue[0]
		queue = queue[1:]
		for _, id := range mf.graph[u] {
			e := mf.edges[id]
			if e.cap > 0 && !inS[e.to] { // còn dư -> đi tiếp
				inS[e.to] = true
				queue = append(queue, e.to)
			}
		}
	}
	return inS // inS[v] == true nghĩa là v thuộc S
}

func demoMaxFlow() {
	// Mạng mục 6: s=0, a=1, b=2, t=3.
	mf := NewMaxFlow(4)
	mf.AddEdge(0, 1, 3) // s->a
	mf.AddEdge(0, 2, 2) // s->b
	mf.AddEdge(1, 2, 1) // a->b
	mf.AddEdge(1, 3, 2) // a->t
	mf.AddEdge(2, 3, 3) // b->t

	flow := mf.MaxFlowEK(0, 3)
	fmt.Println("Max flow =", flow) // 5

	inS := mf.MinCut(0)
	fmt.Print("S = {")
	for v := 0; v < 4; v++ {
		if inS[v] {
			fmt.Printf(" %d", v)
		}
	}
	fmt.Println(" }") // S = { 0 } -> min cut = cạnh s->a (3) + s->b (2) = 5
}
\`\`\`

### Bipartite matching qua max flow

\`\`\`go
// MaxBipartiteMatching: L người (0..nL-1), R việc (0..nR-1).
// adj[i] = danh sách việc người i làm được.
// Reduce: super source S, super sink T, mọi cạnh cap 1.
// Trả về số cặp ghép tối đa.
func MaxBipartiteMatching(nL, nR int, adj [][]int) int {
	// Đánh số đỉnh: S = nL+nR, T = nL+nR+1.
	// Người i -> đỉnh i; việc j -> đỉnh nL+j.
	S := nL + nR
	T := nL + nR + 1
	mf := NewMaxFlow(nL + nR + 2)
	for i := 0; i < nL; i++ {
		mf.AddEdge(S, i, 1) // S -> người i, cap 1 (mỗi người 1 việc)
	}
	for j := 0; j < nR; j++ {
		mf.AddEdge(nL+j, T, 1) // việc j -> T, cap 1 (mỗi việc 1 người)
	}
	for i := 0; i < nL; i++ {
		for _, j := range adj[i] {
			mf.AddEdge(i, nL+j, 1) // người i -> việc j, cap 1
		}
	}
	return mf.MaxFlowEK(S, T) // = số cặp ghép tối đa
}

func demoMatching() {
	// 3 người, 3 việc. P0:{0,1}, P1:{0}, P2:{1,2}
	adj := [][]int{{0, 1}, {0}, {1, 2}}
	fmt.Println("Max matching =", MaxBipartiteMatching(3, 3, adj)) // 3
}

func main() {
	demoMaxFlow()
	demoMatching()
}
\`\`\`

> Chạy: \`go run README_demo.go\` (gộp các block trên vào 1 file). Kết quả: \`Max flow = 5\`, \`S = { 0 }\`, \`Max matching = 3\`.

Minh họa tương tác: **[visualization.html](./visualization.html)** — 3 module: (1) Edmonds-Karp animator (BFS tìm đường + bơm flow + cập nhật residual), (2) Residual graph (cạnh xuôi/ngược + dung lượng dư), (3) Min cut (highlight cut tách \`s\`/\`t\`).

---

## Bài tập

> Mọi bài đều có lời giải chi tiết ở mục dưới. Thử tự làm trước.

1. **Max flow Edmonds-Karp.** Cho mạng: \`s=0, t=5\`, cạnh \`(0,1,10) (0,2,10) (1,3,4) (1,4,8) (2,4,9) (3,5,10) (4,3,6) (4,5,10)\`. Chạy Edmonds-Karp từng vòng, ghi đường BFS + bottleneck. Max flow = ?

2. **Min cut.** Với kết quả bài 1, trích min cut: tập \`S\`, các cạnh cut, tổng capacity. Verify = max flow.

3. **Maximum bipartite matching qua flow.** 4 ứng viên, 4 việc: \`P0:{0,1}, P1:{1,2}, P2:{0,2}, P3:{2,3}\`. Dựng mạng flow, tính số cặp ghép tối đa.

4. **Edge-disjoint paths.** Cho đồ thị có hướng, đếm số đường \`s→t\` rời cạnh tối đa. Giải thích reduce + capacity dùng.

5. **Super source/sink.** 2 kho \`K1, K2\` (phát tối đa 5, 7), 3 cửa hàng \`C1, C2, C3\` (nhận tối đa 4, 4, 6). Cạnh trung gian không giới hạn. Mô hình hóa thành 1 bài max flow.

6. **Vertex capacity (split node).** Mạng routing: mỗi router chỉ chuyển tối đa 3 gói/giây. Cho biết cách biến đổi đồ thị để áp ràng buộc này, rồi tính max flow \`s→t\` trên mạng 5 đỉnh tự chọn.

7. **(Nâng cao) Vì sao Ford-Fulkerson DFS có thể chậm.** Dựng mạng 4 đỉnh khiến DFS tốn \`O(max_flow)\` vòng còn BFS chỉ 2 vòng. Giải thích.

---

## Lời giải chi tiết

### Bài 1 — Max flow Edmonds-Karp

Đỉnh \`0..5\`. BFS ưu tiên đường ít cạnh; thứ tự duyệt theo thứ tự thêm cạnh.

**Vòng 1.** BFS từ 0. Đường ngắn nhất 3 cạnh, vd \`0→1→3→5\`: residual \`min(10,4,10)=4\`. Bơm 4. \`|f|=4\`. Cạnh \`1→3\` bão hòa.
**Vòng 2.** \`0→1→4→5\`: residual \`min(10−4=6, 8, 10)=6\`. Bơm 6. \`|f|=10\`. Cạnh \`1→4\` bão hòa.
**Vòng 3.** \`0→2→4→5\`: residual \`min(10, 9, 10−6=4)=4\`. Bơm 4. \`|f|=14\`. Cạnh \`4→5\` bão hòa.
**Vòng 4.** Cần đường khác. \`0→2→4→3→5\`: residual \`min(10−4=6, 9−4=5, 6, 10−4=6)=5\`. Bơm 5. \`|f|=19\`. Cạnh \`2→4\` bão hòa (\`9\` đã dùng \`4+5\`).
**Vòng 5.** Từ 0: \`0→1\` còn dư 0? \`f(0,1)=10\` bão hòa. \`0→2\` còn dư \`10−4−5=1\`. Tới 2. Từ 2: \`2→4\` bão hòa. Hết đường tới \`t\`. **Dừng.**

**Max flow = 19.**

(Lưu ý: thứ tự đường BFS có thể khác tùy thứ tự duyệt cạnh, nhưng **giá trị cuối luôn = 19** theo định lý min cut.)

Big-O: Edmonds-Karp \`O(V·E²)\`; ở đây V=6, E=8 → vài chục thao tác.

### Bài 2 — Min cut

Sau vòng 5, BFS từ \`s=0\` trên residual:
- \`0→1\`: bão hòa (cap dư 0) → không đi.
- \`0→2\`: dư 1 → tới \`2\`. \`S\` thêm \`2\`.
- Từ \`2\`: \`2→4\` bão hòa → không đi. Cạnh ngược nào từ 2? không tới đỉnh mới.
- Vậy \`S = {0, 2}\`, \`T = {1, 3, 4, 5}\`.

Cạnh **gốc** từ \`S\` sang \`T\`:
- \`0→1\` (cap 10) — từ \`S\` sang \`T\` ✓.
- \`2→4\` (cap 9) — từ \`S\` sang \`T\` ✓.
- (\`0→2\` nằm trong \`S\`, không tính; \`4→3\`, \`3→5\`, \`4→5\` ở trong \`T\`.)

\`cap(S,T) = 10 + 9 = 19\` = max flow ✓.

Big-O: BFS trích cut \`O(V+E)\`.

### Bài 3 — Maximum bipartite matching qua flow

Đỉnh: người \`0..3\`, việc \`4..7\` (việc j = \`4+j\`), \`S=8, T=9\`.
- \`S→0,1,2,3\` cap 1; \`4,5,6,7→T\` cap 1.
- Cạnh: \`0→4,0→5; 1→5,1→6; 2→4,2→6; 3→6,3→7\`.

Chạy Edmonds-Karp (mỗi augmenting path = 1 cặp, bottleneck luôn 1):
- \`S→0→4→T\` (P0–việc0). |f|=1.
- \`S→1→5→T\` (P1–việc1). |f|=2.
- \`S→2→6→T\` (P2–việc2). |f|=3.
- \`S→3→7→T\` (P3–việc3). |f|=4.

**Max matching = 4** (ghép hết). Một lời ghép: P0–0, P1–1, P2–2, P3–3.

Big-O: bipartite matching qua flow \`O(V·E)\` (mỗi augment tăng 1, tối đa \`V/2\` augment, mỗi BFS \`O(E)\`). Với Dinic unit-cap: \`O(E√V)\`.

### Bài 4 — Edge-disjoint paths

**Reduce**: đặt **capacity = 1 cho mọi cạnh**, chạy max flow \`s→t\`. Theo định lý Menger, **max flow = số đường \`s→t\` rời cạnh tối đa**.

Trực giác: mỗi cạnh cap 1 → mỗi cạnh dùng được nhiều nhất 1 lần → mỗi đơn vị flow là 1 đường không chia sẻ cạnh với đường khác. Số đường = giá trị flow.

Big-O: Edmonds-Karp \`O(V·E²)\`; vì max flow ≤ \`E\` nên thực tế \`O(E²)\` cũng bound bằng số augment ≤ E.

### Bài 5 — Super source/sink

Dựng:
- **Super source** \`S\` → \`K1\` cap 5, \`S → K2\` cap 7 (giới hạn phát của kho).
- \`C1 → T\` cap 4, \`C2 → T\` cap 4, \`C3 → T\` cap 6 (giới hạn nhận của cửa hàng), với \`T\` super sink.
- Cạnh trung gian \`Ki → Cj\` cap \`∞\` (dùng số lớn, vd 1e9).

Chạy max flow \`S→T\`. Kết quả bị chặn bởi \`min(tổng phát = 12, tổng nhận = 14) = 12\` nếu kết nối đầy đủ → max flow = 12.

Big-O: như Edmonds-Karp \`O(V·E²)\` trên đồ thị mở rộng (thêm 2 đỉnh, \`nL+nR\` cạnh).

### Bài 6 — Vertex capacity (split node)

**Biến đổi**: mỗi router \`v\` → \`v_in\`, \`v_out\`, cạnh \`v_in → v_out\` cap 3 (giới hạn router). Cạnh tới \`v\` đổi đích thành \`v_in\`; cạnh từ \`v\` đổi nguồn thành \`v_out\`.

Ví dụ mạng 5 đỉnh \`s, a, b, c, t\`, cạnh cap ∞, router \`a,b,c\` cap 3:
- Tách: \`a_in→a_out\` (3), \`b_in→b_out\` (3), \`c_in→c_out\` (3).
- \`s→a_in, s→b_in\`; \`a_out→c_in, b_out→c_in\`; \`c_out→t\`.
- Cổ chai là \`c_in→c_out\` cap 3 → max flow \`s→t\` = **3** (mọi luồng buộc qua router c).

Big-O: số đỉnh tăng gấp đôi (mỗi đỉnh thành 2), Edmonds-Karp vẫn \`O(V·E²)\` trên đồ thị mới.

### Bài 7 — Ford-Fulkerson DFS chậm

Mạng kinh điển 4 đỉnh \`s, a, b, t\`:
- \`c(s,a)=10⁶, c(s,b)=10⁶, c(a,b)=1, c(a,t)=10⁶, c(b,t)=10⁶\`.

**DFS xấu**: vòng 1 chọn \`s→a→b→t\`, bottleneck = \`c(a,b)=1\`, bơm 1. Vòng 2 chọn \`s→b→a→t\` (qua cạnh ngược \`b→a\`!), bottleneck 1, bơm 1, rút lại cạnh \`a→b\`. Cứ lặp như vậy, **mỗi vòng chỉ tăng 1** → cần \`2·10⁶\` vòng để đạt max flow \`2·10⁶\`. Phụ thuộc giá trị flow!

**BFS (Edmonds-Karp)**: vòng 1 \`s→a→t\` (2 cạnh) bơm \`10⁶\`; vòng 2 \`s→b→t\` (2 cạnh) bơm \`10⁶\`. **Chỉ 2 vòng**, max flow \`2·10⁶\`. BFS tránh đường 3-cạnh qua \`a→b\` nên không bao giờ rơi vào bẫy đẩy-rút.

Đây là lý do Edmonds-Karp \`O(V·E²)\` **độc lập** với capacity, còn Ford-Fulkerson DFS \`O(|f*|·E)\` phụ thuộc.

---

## Bài tiếp theo

- [Lesson 39 — Bipartite Matching](../lesson-39-bipartite-matching/README.md): đào sâu ghép cặp 2 phía (Kuhn/Hungarian, Hopcroft-Karp), mà bài này đã reduce về flow ở mục 9.1.
- Quay lại [Tier 5 — Thuật toán đồ thị](../tier-5-graph/index.html) để xem toàn bộ lộ trình.

## Tham khảo

- CLRS, Chapter 26 — Maximum Flow.
- Định lý Max-Flow Min-Cut (Ford & Fulkerson, 1956), Edmonds-Karp (1972), Dinic (1970).
`;
