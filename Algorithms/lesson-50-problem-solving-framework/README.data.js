// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: Algorithms/lesson-50-problem-solving-framework/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 50 — Problem-Solving Framework (Khung tiếp cận bài toán)

> **Tier 8 · Lesson đầu tiên của Tier cuối.** Đây là lesson **tổng hợp** toàn bộ lộ trình Algorithms (Tier 0 → 7). Không giới thiệu thuật toán mới — thay vào đó dạy *cách tư duy*: gặp một bài lạ thì làm gì, theo trình tự nào, và làm sao chọn đúng kỹ thuật trong số hàng chục thứ đã học.

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Có một **quy trình 7 bước** lặp lại được cho mọi bài toán lạ — không còn "đọc đề xong ngồi đoán mò".
- Biết **đọc constraint (ràng buộc) để đoán độ phức tạp mục tiêu** trước khi viết một dòng code.
- Thuộc **bản đồ dấu hiệu → kỹ thuật**: nhìn từ khoá trong đề là biết hướng đi (sorted → binary search, subarray liên tục → sliding window, v.v.).
- Có **chiến lược khi bị stuck** và **checklist edge case** để không rớt test ẩn.
- Nhận ra các **anti-pattern** phổ biến khiến giải sai hoặc tốn thời gian.

**Cách dùng lesson này:** đọc một lượt để nắm quy trình + hai bảng tra (mục 3, mục 4). Khi luyện tập, mở [thẻ tra nhanh (mục 9)](#9-thẻ-tra-nhanh-cheat-sheet-một-trang) bên cạnh và áp dụng cho từng bài. Sau vài chục bài, quy trình thành phản xạ và bạn không cần nhìn bảng nữa.

## Kiến thức tiền đề

Bài này *dùng lại* gần như mọi thứ trong lộ trình. Các link quan trọng:

- [Lesson 01 — Big-O & Asymptotic](../lesson-01-bigo-asymptotic/) — đo độ phức tạp.
- [Lesson 05 — Brute-force → Optimize](../lesson-05-bruteforce-to-optimize/) — baseline đúng trước, tối ưu sau.
- [Lesson 12 — Binary Search Variants](../lesson-12-binary-search-variants/), [Lesson 13 — Two Pointers](../lesson-13-two-pointers/), [Lesson 14 — Sliding Window](../lesson-14-sliding-window/), [Lesson 15 — Prefix Sum](../lesson-15-prefix-sum-difference/), [Lesson 16 — Hashing](../lesson-16-hashing-techniques/).
- [Lesson 18 — Backtracking](../lesson-18-backtracking/), [Lesson 19 — Greedy](../lesson-19-greedy-fundamentals/), [Lesson 23 — DP Fundamentals](../lesson-23-dp-fundamentals/).
- [Lesson 31 — Graph Traversal](../lesson-31-graph-traversal/), [Lesson 32 — Topological Sort](../lesson-32-topological-sort/), [Lesson 33 — Dijkstra](../lesson-33-dijkstra/).
- [Lesson 40 — Rabin-Karp](../lesson-40-string-matching-rabin-karp/), [Lesson 41 — KMP](../lesson-41-kmp/), [Lesson 42 — Z-algorithm](../lesson-42-z-algorithm/).

---

## 0. Bản đồ tổng quan — lesson này nằm ở đâu trong lộ trình

> 💡 **Trực giác.** Suốt 49 lesson trước, bạn học *từng* công cụ một: sort, binary search, sliding window, DP, graph, string matching... Giống như mua đủ dụng cụ trong hộp đồ nghề. Lesson 50 không thêm dụng cụ mới — nó dạy **khi nào mở hộp nào**. Đây là lý do nó nằm ở đầu Tier cuối: bạn đã có đủ đồ nghề, giờ học cách *chọn* đồ nghề.

Dòng chảy của một bài giải, nhìn từ trên xuống:

\`\`\`
ĐỀ LẠ
  │
  ├─[B1] Hiểu đề (rephrase, input/output, ràng buộc)
  ├─[B2] Ví dụ nhỏ + edge case (giải tay)
  ├─[B3] Brute-force (baseline ĐÚNG, có thể chậm)
  ├─[B4] Big-O brute + đọc constraint  ──►  ĐỘ PHỨC TẠP MỤC TIÊU  (mục 3)
  ├─[B5] Nhận diện pattern              ──►  CHỌN KỸ THUẬT          (mục 4)
  ├─[B6] Code + test edge case
  └─[B7] Tối ưu nếu chưa đạt mục tiêu
  │
  ▼
LỜI GIẢI
\`\`\`

Hai trục quyết định nằm ở B4 và B5: **constraint cho biết bạn được phép chậm tới đâu** (mục 3), **dấu hiệu trong đề cho biết đi hướng nào** (mục 4). Phần lớn lesson này đào sâu hai trục đó.

**Mỗi Tier trước đã trang bị gì cho hộp đồ nghề:**

| Tier | Cho bạn | Khi nào lấy ra |
|------|---------|----------------|
| 0 — Nền tảng | Big-O, brute-force, đệ quy, bất biến | Mọi bài (B3, B4) |
| 1 — Sorting | Sort, merge/quick/heap sort | Tiền xử lý cho two pointers, đếm nghịch thế |
| 2 — Searching | Binary search, two pointers, window, prefix, hash | "sorted", "liên tục", "cặp tổng", "đếm nhanh" |
| 3 — Greedy | Backtracking, greedy, interval | "mọi tổ hợp", "chọn cục bộ", "lịch/khoảng" |
| 4 — DP | DP 1D/2D, knapsack, interval, bitmask | "tối ưu + bài con chồng nhau" |
| 5 — Graph | BFS/DFS, topo, Dijkstra, MST, flow | "đường đi", "thứ tự DAG", "kết nối" |
| 6 — String | Rabin-Karp, KMP, Z, trie | "khớp mẫu", "nhiều mẫu" |
| 7 — Advanced | Number theory, hình học, randomized | bài chuyên biệt |

> 📝 **Tóm tắt mục 0.** Lesson 50 = "meta-skill": không thêm thuật toán, mà dạy quy trình chọn thuật toán. Hai trục cốt lõi: constraint → độ phức tạp mục tiêu, dấu hiệu → kỹ thuật.

---

## 1. Vì sao cần một framework?

### 1.1 Vấn đề: đọc đề lạ xong ngồi đoán mò

> 💡 **Trực giác / Hình dung.** Hãy tưởng tượng bạn là bác sĩ cấp cứu. Một bệnh nhân mới vào, bạn *không* lao vào mổ ngay. Bạn theo một quy trình cố định: hỏi triệu chứng → đo sinh hiệu → khoanh vùng chẩn đoán → xét nghiệm xác nhận → mới điều trị. Giải thuật toán cũng vậy: bài lạ đến, bạn **không** code ngay mà chạy qua một quy trình. Quy trình bảo vệ bạn khỏi việc "thấy mảng là viết hai vòng for" rồi rớt vì TLE (Time Limit Exceeded).

Khi mới học, phản xạ tự nhiên là: đọc đề → nghĩ ra cách đầu tiên trong đầu → code luôn. Cách này hỏng ở chỗ:

- Cách đầu tiên thường là **brute-force** (vét cạn) — đúng nhưng chậm, dễ TLE.
- Code trước khi hiểu hết ràng buộc → bỏ sót edge case → rớt test ẩn (hidden test).
- Không có "bản đồ" → không biết bài này thuộc *họ* nào (DP? greedy? graph?), nên không tận dụng được kỹ thuật đã học.

### 1.2 Giải pháp: quy trình + bản đồ pattern

Framework gồm 2 thứ:

1. **Quy trình 7 bước** (mục 2) — trình tự cố định áp dụng cho *mọi* bài, kể cả bài chưa từng gặp.
2. **Bản đồ dấu hiệu → kỹ thuật** (mục 4) — bảng tra: thấy từ khoá X trong đề thì nghĩ ngay tới kỹ thuật Y.

Cộng thêm 2 "siêu năng lực" thực dụng:

- **Đọc constraint → đoán độ phức tạp mục tiêu** (mục 3): trước khi nghĩ thuật toán, nhìn $n \\leq ?$ là biết được phép dùng độ phức tạp nào.
- **Chiến lược khi stuck** (mục 5): khi không nghĩ ra, làm gì để không kẹt mãi.

**Ba ví dụ thất bại điển hình khi không có framework:**

1. Đề: "đếm số cặp \`(i,j)\` có \`a[i]+a[j]=k\`, $n \\leq 2 \\cdot 10^5$". Phản xạ: hai vòng for $O(n^2) = 4 \\cdot 10^{10}$ → TLE. Nếu đọc constraint trước (mục 3) đã biết phải $O(n)$/$O(n \\log n)$ → dùng hash/two pointers.
2. Đề: "tìm subarray tổng lớn nhất". Code tham lam "cứ cộng tiếp" mà không xử lý số âm → sai trên \`[-1, -2]\` (quên rằng có thể phải reset). Bỏ qua bước 2 (edge case số âm) là nguyên nhân.
3. Đề: "đổi tiền ít xu nhất". Dùng greedy lấy xu lớn nhất → sai trên \`coins=[1,3,4]\` (mục 7.3). Không kiểm chứng greedy là anti-pattern (mục 8).

> ❓ **Câu hỏi tự nhiên của người đọc.**
> - *"Framework có làm tôi giải chậm hơn không vì phải làm nhiều bước?"* — Ngược lại. 5 phút phân tích đầu tiên tiết kiệm 30 phút debug cách sai. Người mới rớt nhiều nhất ở khâu *chọn sai hướng*, không phải khâu code.
> - *"Tôi có phải làm đủ 7 bước cho bài dễ không?"* — Không. Bài quá quen thì bước nhận diện pattern + code là đủ. Nhưng bài *lạ* thì làm đủ.

> 📝 **Tóm tắt mục 1.** Đừng đoán mò. Có (1) quy trình 7 bước lặp lại được, (2) bản đồ pattern, (3) kỹ năng đọc constraint, (4) chiến lược khi stuck → tiếp cận bài lạ có hệ thống.

---

## 2. Quy trình 7 bước giải một bài toán

> 💡 **Trực giác.** 7 bước này giống dây chuyền lắp ráp: mỗi bước cho ra một "bán thành phẩm" làm đầu vào cho bước sau. Bước 1–2 hiểu bài, bước 3–4 đặt baseline + xác định mục tiêu, bước 5 chọn kỹ thuật, bước 6–7 hiện thực + tối ưu.

### Bước 1 — Hiểu đề (rephrase)

- **Diễn đạt lại đề bằng lời của mình.** Nếu không nói lại được trong 1 câu, bạn chưa hiểu.
- Xác định rõ **input** (kiểu, định dạng) và **output** (trả về gì, định dạng nào).
- Liệt kê **ràng buộc**: $n$ tối đa bao nhiêu? giá trị âm/0 có không? có trùng không? đề bảo đảm gì (đã sorted? liên thông?)?

### Bước 2 — Ví dụ cụ thể (small cases + edge cases)

- Tự tạo 1–2 ví dụ **nhỏ** rồi giải *bằng tay* để chắc chắn mình hiểu đúng yêu cầu.
- Liệt kê **edge case**: mảng rỗng, 1 phần tử, toàn trùng, đã sorted, giá trị max. (Checklist đầy đủ ở mục 6.)
- Ví dụ nhỏ giải tay còn là **bộ test** để kiểm tra code sau này.

### Bước 3 — Brute-force trước (baseline đúng)

> Xem chi tiết tư tưởng này ở [Lesson 05 — Brute-force → Optimize](../lesson-05-bruteforce-to-optimize/).

- Luôn nghĩ ra **cách vét cạn đúng** trước. Nó *chậm* nhưng *chắc đúng*.
- Lợi ích: (a) bạn chắc mình hiểu đề; (b) có baseline để so kết quả khi tối ưu; (c) nhìn brute-force ra chỗ lãng phí → gợi ý hướng tối ưu.
- Nếu constraint nhỏ (mục 3), **brute-force có thể chính là lời giải cuối** — không cần tối ưu.

### Bước 4 — Phân tích Big-O + nhìn constraint để đoán mục tiêu

- Tính độ phức tạp của brute-force. Có vượt giới hạn không?
- Nhìn $n$ tối đa, **đoán độ phức tạp mục tiêu** (mục 3). Ví dụ $n \\leq 10^5$ → cần $O(n \\log n)$ trở xuống.
- Khoảng cách giữa brute-force và mục tiêu cho biết phải tối ưu mạnh cỡ nào.

### Bước 5 — Nhận diện pattern → chọn kỹ thuật

- Dùng **bản đồ dấu hiệu → kỹ thuật** (mục 4). Đề có "subarray liên tục"? → sliding window / prefix sum. Có "tất cả tổ hợp"? → backtracking. Có "tối ưu + bài con chồng nhau"? → DP.
- Một bài có thể có nhiều hướng — chọn hướng đạt được độ phức tạp mục tiêu ở bước 4.

### Bước 6 — Code + test edge case

- Hiện thực kỹ thuật đã chọn. Viết sạch, đặt tên biến rõ.
- Chạy lại các ví dụ ở bước 2 (đặc biệt **edge case**). So với kết quả brute-force nếu có.

### Bước 7 — Tối ưu nếu cần

- Nếu vẫn chậm/tốn bộ nhớ: tìm tính toán lặp lại (→ precompute/memo), đổi cấu trúc dữ liệu (→ heap, hash, segment tree), giảm chiều DP, v.v.
- **Chỉ tối ưu khi cần.** Nếu đã đạt mục tiêu thì dừng — tối ưu sớm là anti-pattern (mục 8).

### 2.1 Áp dụng nhanh 7 bước cho một bài (toàn cảnh)

Đề mẫu: *"Cho mảng \`a\` ($n \\leq 10^5$), tìm độ dài subarray liên tục dài nhất mà tổng $\\leq S$ (mọi \`a[i] > 0\`)."* Chạy nhanh 7 bước:

1. **Hiểu:** input mảng dương + ngưỡng $S$; output 1 số (độ dài).
2. **Ví dụ:** \`a=[2,1,5,1,3], S=8\` → \`3\` (\`[1,5,1]=7≤8\`). Edge: $S$ nhỏ hơn mọi phần tử → 0; mảng rỗng → 0.
3. **Brute-force:** thử mọi \`(i,j)\`, tính tổng → $O(n^2)$.
4. **Constraint:** $n \\leq 10^5$ → $O(n^2)=10^{10}$ TLE → mục tiêu $O(n)$.
5. **Pattern:** "subarray liên tục" + "mọi phần tử dương" → **sliding window** mở rộng/co được (tổng đơn điệu vì toàn dương).
6. **Code + test:** window hai con trỏ, co \`left\` khi tổng vượt $S$; test các ví dụ bước 2.
7. **Tối ưu:** đã $O(n)$ → dừng.

Toàn bộ "suy nghĩ" trên mất ~2 phút và đảm bảo không lao vào $O(n^2)$.

> 🔁 **Dừng lại tự kiểm tra.** Vì sao nên viết brute-force *trước* khi nghĩ cách tối ưu, thay vì nhảy thẳng vào cách hay?
> <details><summary>Đáp án</summary>
> Vì brute-force (1) xác nhận bạn hiểu đúng đề, (2) cho một baseline đúng để đối chiếu, (3) lộ ra chỗ tính toán lãng phí — chính chỗ đó gợi ý hướng tối ưu. Nhảy thẳng vào cách hay mà chưa chắc hiểu đề → dễ giải đúng một bài toán *khác*.
> </details>

> 📝 **Tóm tắt mục 2.** 7 bước: (1) hiểu đề, (2) ví dụ + edge, (3) brute-force, (4) Big-O + đoán mục tiêu từ constraint, (5) nhận pattern → chọn kỹ thuật, (6) code + test edge, (7) tối ưu nếu cần.

---

## 3. Đọc constraint → đoán độ phức tạp mục tiêu

> 💡 **Trực giác.** Constraint $n \\leq ?$ giống biển báo tốc độ. Máy chấm thường cho ~1 giây, CPU làm được cỡ $10^8$–$10^9$ phép tính cơ bản/giây. Vậy nếu biết $n$, ta lật ngược: độ phức tạp nào nhân với $n$ ra dưới $\\sim 10^8$ thì *kịp*. Đây là cách **đoán hướng đi trước khi nghĩ thuật toán**.

Quy tắc ngón tay cái (ước lượng "lọt trong ~1 giây"):

| $n$ tối đa | Độ phức tạp mục tiêu | Kỹ thuật điển hình | Lesson |
|-----------|----------------------|--------------------|--------|
| $\\leq 10\\text{–}12$ | $O(n!)$, $O(2^n \\cdot n)$ | Backtracking đầy đủ, sinh hoán vị | [L18](../lesson-18-backtracking/) |
| $\\leq 18\\text{–}25$ | $O(2^n)$, $O(2^n \\cdot n)$ | Bitmask DP, meet-in-the-middle | [L29](../lesson-29-bitmask-dp/) |
| $\\leq 100\\text{–}500$ | $O(n^3)$ | Floyd-Warshall, interval DP | [L34](../lesson-34-bellman-ford-floyd/), [L27](../lesson-27-interval-dp/) |
| $\\leq 1000\\text{–}5000$ | $O(n^2)$ | DP 2D, mọi cặp \`(i,j)\` | [L26](../lesson-26-dp-grid-2d/) |
| $\\leq 10^4$ | $O(n^2)$ (giáp ranh) | DP $O(n^2)$, đôi khi $O(n^2)$ còn kịp | [L24](../lesson-24-dp-1d/) |
| $\\leq 10^5\\text{–}10^6$ | $O(n \\log n)$ | Sort, heap, binary search, segment tree | [L07](../lesson-07-merge-sort/), [L12](../lesson-12-binary-search-variants/) |
| $\\leq 10^7\\text{–}10^8$ | $O(n)$ | Sliding window, prefix sum, two pointers, đếm | [L14](../lesson-14-sliding-window/), [L15](../lesson-15-prefix-sum-difference/) |
| $\\leq 10^9$ | $O(\\log n)$ hoặc $O(1)$ | Binary search trên đáp án, công thức toán | [L12](../lesson-12-binary-search-variants/) |
| $\\leq 10^{18}$ | $O(\\log n)$ | Binary search, lũy thừa nhanh, công thức | — |

### Ví dụ áp dụng (≥ 4 ví dụ số cụ thể)

1. **$n \\leq 20$, tìm tập con tổng = target.** $2^{20} \\approx 10^6$ → duyệt mọi tập con $O(2^n)$ kịp. Hướng: bitmask / backtracking. *Không* cần DP phức tạp.
2. **$n \\leq 2000$, đếm cặp \`(i, j)\` thoả điều kiện.** $2000^2 = 4 \\cdot 10^6$ → $O(n^2)$ kịp thoải mái. Hai vòng for là đủ.
3. **$n \\leq 200000$, tìm subarray có tổng lớn nhất độ dài ≤ k.** $n^2 = 4 \\cdot 10^{10}$ → **quá lớn**, $O(n^2)$ chết. Phải $O(n \\log n)$ hoặc $O(n)$ → sliding window / prefix sum + deque.
4. **$n \\leq 10^9$, tìm số $x$ nhỏ nhất sao cho $f(x) \\geq T$ ($f$ đơn điệu).** Không thể duyệt $x$. $O(\\log n)$ → **binary search trên đáp án** (~30 vòng lặp).
5. **$n \\leq 12$ thành phố, bài toán người giao hàng (TSP).** $n! = 12! \\approx 4,8 \\cdot 10^8$ hơi căng; $2^n \\cdot n^2 = 4096 \\cdot 144 \\approx 6 \\cdot 10^5$ → **bitmask DP** là lựa chọn đúng.

> ⚠ **Lỗi thường gặp.** Đừng coi bảng là *luật cứng*. Hằng số ẩn (constant factor) và bộ nhớ vẫn quan trọng: $O(n \\log n)$ với hằng số lớn (vd nhiều phép chia, cấp phát động) có thể chậm hơn $O(n^2)$ với $n$ nhỏ. Bảng để *đoán hướng*, không phải để kết luận tuyệt đối.

> ❓ **Câu hỏi tự nhiên.**
> - *"Nếu đề không cho constraint thì sao?"* — Hiếm. Nếu thiếu, hỏi/ước lượng từ ngữ cảnh (vd "username của toàn user" → cỡ triệu). Khi mơ hồ, nhắm $O(n \\log n)$ cho an toàn.
> - *"$10^8$ phép/giây có chính xác không?"* — Ước lượng thô. Phép đơn giản (cộng, so sánh) nhanh hơn; phép nặng (chia, modulo, truy cập bộ nhớ rải rác) chậm hơn. Lấy $10^8$ làm mốc thận trọng.

### 3.1 Walk-through tính thời gian bằng số thật

Cách quy đổi: lấy số phép tính ≈ công thức độ phức tạp thay $n$ vào, rồi chia cho $10^8$ phép/giây để ra giây.

| Bài | $n$ | Độ phức tạp | Số phép ≈ | Ước thời gian | Kết luận |
|-----|-----|-------------|-----------|---------------|----------|
| A | $10^5$ | $O(n^2)$ | $10^{10}$ | ~100 s | TLE — cần tối ưu |
| A | $10^5$ | $O(n \\log n)$ | $10^5 \\cdot 17 \\approx 1,7 \\cdot 10^6$ | ~0,02 s | OK |
| B | $500$ | $O(n^3)$ | $1,25 \\cdot 10^8$ | ~1,25 s | Giáp ranh — coi chừng |
| C | $25$ | $O(2^n)$ | $3,3 \\cdot 10^7$ | ~0,3 s | OK |
| C | $40$ | $O(2^n)$ | $1,1 \\cdot 10^{12}$ | ~3 giờ | Vô vọng — cần meet-in-middle $O(2^{n/2})$ |

Riêng dòng cuối minh hoạ vì sao $n \\leq 20\\text{–}25$ là ranh giới của $2^n$: từ $n = 40$, $2^n$ nhảy lên nghìn tỷ. Mẹo: $2^{40} = (2^{20})^2 \\approx (10^6)^2 = 10^{12}$.

> 🔁 **Dừng lại tự kiểm tra.** Đề cho $n \\leq 5 \\cdot 10^5$, brute-force của bạn là $O(n^2)$. Có cần tối ưu không, và mục tiêu là gì?
> <details><summary>Đáp án</summary>
> $(5 \\cdot 10^5)^2 = 2,5 \\cdot 10^{11} \\gg 10^8$ → chắc chắn TLE, **phải** tối ưu. Mục tiêu: $O(n \\log n)$ (~$5 \\cdot 10^5 \\cdot 19 \\approx 10^7$, kịp). Nghĩ tới sort + two pointers, hoặc binary search, hoặc heap.
> </details>

> 📝 **Tóm tắt mục 3.** Nhìn $n$ tối đa → tra bảng → biết độ phức tạp mục tiêu *trước khi* nghĩ thuật toán. $n$ nhỏ (≤25) cho phép exponential; $n$ cỡ $10^5$ ép $O(n \\log n)$; $n$ khổng lồ ép $O(\\log n)$.

---

## 4. Bản đồ dấu hiệu → kỹ thuật

> 💡 **Trực giác.** Đề bài luôn để lại "dấu vân tay". Cụm từ trong đề là manh mối: "liên tục", "tất cả tổ hợp", "đường đi ngắn nhất", "k lớn nhất"... Học thuộc bảng này biến việc nhận diện pattern từ *cảm tính* thành *tra cứu*.

| Dấu hiệu trong đề | Kỹ thuật gợi ý | Lesson |
|-------------------|----------------|--------|
| Mảng/danh sách **đã sorted**, tìm phần tử/biên | Binary search; two pointers | [L12](../lesson-12-binary-search-variants/), [L13](../lesson-13-two-pointers/) |
| **Subarray / substring liên tục** thoả điều kiện | Sliding window; prefix sum | [L14](../lesson-14-sliding-window/), [L15](../lesson-15-prefix-sum-difference/) |
| **Cặp / bộ ba** có tổng/hiệu cho trước | Two pointers (sau sort); hash | [L13](../lesson-13-two-pointers/), [L16](../lesson-16-hashing-techniques/) |
| Sinh **tất cả tổ hợp / hoán vị / tập con** | Backtracking | [L18](../lesson-18-backtracking/) |
| **Tối ưu** với *lựa chọn* + **bài con chồng nhau** | Dynamic Programming | [L23](../lesson-23-dp-fundamentals/) |
| Tối ưu **chọn cục bộ tốt nhất mỗi bước** (cần chứng minh!) | Greedy | [L19](../lesson-19-greedy-fundamentals/) |
| **Khoảng/lịch (interval)** chồng lấn, gộp, chọn nhiều nhất | Sort theo mốc + greedy / sweep | [L20](../lesson-20-interval-problems/) |
| **Đường đi / kết nối / lan toả** trên đồ thị | BFS / DFS | [L31](../lesson-31-graph-traversal/) |
| Đường đi **ngắn nhất, cạnh không âm** | Dijkstra | [L33](../lesson-33-dijkstra/) |
| Đường đi ngắn nhất, **có cạnh âm** / mọi cặp | Bellman-Ford / Floyd-Warshall | [L34](../lesson-34-bellman-ford-floyd/) |
| **Thứ tự / phụ thuộc** trên DAG ("phải làm A trước B") | Topological sort | [L32](../lesson-32-topological-sort/) |
| **Nhóm / thành phần liên thông**, hợp/tìm nhanh | Union-Find / DFS components | [L36](../lesson-36-connected-components/) |
| **Top-k**, luôn lấy phần tử **min/max** động | Heap (priority queue) | [L33](../lesson-33-dijkstra/) (dùng heap) |
| **Lookup / đếm tần suất** nhanh, kiểm tra tồn tại | Hash map / set | [L16](../lesson-16-hashing-techniques/) |
| **Range query** (tổng/min trên đoạn), có cập nhật | Prefix sum (tĩnh) / segment tree (động) | [L15](../lesson-15-prefix-sum-difference/) |
| **Tìm chuỗi con / khớp mẫu** trong văn bản | KMP / Z / Rabin-Karp | [L41](../lesson-41-kmp/), [L42](../lesson-42-z-algorithm/), [L40](../lesson-40-string-matching-rabin-karp/) |
| Nhiều mẫu cùng lúc / tiền tố chung | Trie / Aho-Corasick | [L43](../lesson-43-trie-aho-corasick/) |
| Chia bài thành **nửa rồi gộp** | Divide & Conquer | [L17](../lesson-17-divide-and-conquer/) |
| $n$ nhỏ (≤ 20), trạng thái là **tập con** | Bitmask DP | [L29](../lesson-29-bitmask-dp/) |

> ⚠ **Lỗi thường gặp.** Một dấu hiệu *không* khoá chết một kỹ thuật. "Tối ưu" có thể là greedy *hoặc* DP — phân biệt: greedy đúng khi *lựa chọn cục bộ tốt nhất dẫn tới tối ưu toàn cục* (phải chứng minh!). Nếu lựa chọn hiện tại ảnh hưởng tương lai theo cách phức tạp → DP. Xem [L22 — Greedy vs DP](../lesson-22-greedy-vs-dp/).

### 4.1 Bốn ví dụ nhận diện pattern từ đề thật

1. *"Cho lịch họp \`[start, end]\`, tìm số phòng tối thiểu để không trùng giờ."* → dấu hiệu **interval** + "tối thiểu phòng" → sort theo mốc + sweep/heap đếm chồng lấn ([L20](../lesson-20-interval-problems/)).
2. *"Trong mảng chưa sorted, có 2 số nào tổng = $k$ không?"* → "cặp tổng" nhưng *chưa* sorted → **hash set** một lượt ($O(n)$), không cần sort ([L16](../lesson-16-hashing-techniques/)).
3. *"Tìm phần tử lớn thứ $k$ trong luồng dữ liệu liên tục."* → "top-k" + "luôn lấy min/max động" → **heap** kích thước $k$ ([L33](../lesson-33-dijkstra/) dùng heap).
4. *"Đếm số đảo (số cặp \`i<j\` mà \`a[i]>a[j]\`)."* → không có từ khoá quen, nhưng "đếm cặp nghịch thế" là biến thể kinh điển → **merge sort đếm trong khi trộn** ([L07](../lesson-07-merge-sort/)) hoặc segment tree. Đây là ví dụ "tìm bài tương tự đã biết" (mục 5).

> ❓ **Câu hỏi tự nhiên.** *"Một bài có nhiều dấu hiệu thì chọn cái nào?"* — Chọn kỹ thuật đạt được **độ phức tạp mục tiêu** (mục 3). Ví dụ "subarray liên tục" gợi sliding window, nhưng nếu có giá trị âm thì window vỡ → chuyển prefix sum + hash. Dùng constraint làm trọng tài.

> 🔁 **Dừng lại tự kiểm tra.** Đề: "Cho mảng số nguyên (có thể âm), tìm độ dài subarray liên tục dài nhất có tổng = k." Dấu hiệu nào? Kỹ thuật nào?
> <details><summary>Đáp án</summary>
> Dấu hiệu: "subarray liên tục" + "tổng = k". Vì *có số âm*, sliding window không dùng được (mở rộng window không đảm bảo tổng tăng). Đúng: **prefix sum + hash map** lưu prefix sum đầu tiên xuất hiện ở mỗi giá trị, tìm \`prefix[j] - prefix[i] = k\`. $O(n)$.
> </details>

> 📝 **Tóm tắt mục 4.** Học thuộc bảng dấu hiệu → kỹ thuật. "sorted" → binary search/two pointers; "liên tục" → window/prefix; "tất cả tổ hợp" → backtracking; "tối ưu + overlap" → DP; "đường đi" → graph; "top-k/min-max" → heap; "đếm nhanh" → hash; "khớp chuỗi" → KMP/Z/RK; "thứ tự DAG" → topo sort.

---

## 5. Khi bị stuck — làm gì?

> 💡 **Trực giác.** Bị kẹt là *bình thường*, kể cả với người giỏi. Khác biệt là người giỏi có **danh sách động tác** để thoát kẹt, thay vì nhìn màn hình trống.

1. **Đơn giản hoá bài toán.** Bỏ bớt một ràng buộc (vd: bỏ trọng số, coi đồ thị vô hướng, giả sử mảng đã sorted). Giải bản dễ trước, rồi thêm ràng buộc lại.
2. **Giải case nhỏ bằng tay.** $n = 1, 2, 3$ rồi tìm quy luật. Nhiều bài DP/toán lộ công thức truy hồi từ vài case đầu.
3. **Vẽ ra.** Đồ thị, cây, lưới, dòng thời gian. Mắt nhìn thấy cấu trúc mà đầu không tưởng tượng ra.
4. **Nghĩ ngược (từ đáp án).** "Nếu đáp án là X thì điều kiện gì phải đúng?" → dẫn tới binary search trên đáp án, hoặc DP truy ngược.
5. **Tìm bài tương tự đã biết.** "Bài này giống bài nào mình từng giải?" Nhận ra nó là biến thể của bài quen → tái dùng khung.
6. **Đổi góc nhìn cấu trúc.** Mảng nghĩ thành đồ thị? Bài chuỗi nghĩ thành DP? Bài tập con nghĩ thành bitmask?

> ❓ **Câu hỏi tự nhiên.** *"Bao lâu thì nên bỏ cách hiện tại?"* — Nếu sau ~10–15 phút không tiến triển và không đạt được độ phức tạp mục tiêu, đổi động tác (1–6). Đừng cố đấm thủng một hướng đã thấy sẽ TLE.

### 5.1 Ví dụ "thoát stuck" bằng nghĩ ngược

**Đề:** mỗi ngày $i$ có giá \`price[i]\`. Mỗi ngày sản xuất tốn $k$ đơn vị. Tìm số $x$ (số sản phẩm/ngày) lớn nhất sao cho tổng chi phí $\\leq \\text{budget}$. $x$ có thể tới $10^9$.

- Nghĩ thẳng "duyệt $x$ từ 1 đi lên" → $10^9$ vòng → TLE, *stuck*.
- **Động tác 4 (nghĩ ngược từ đáp án):** "Nếu đáp án là $x$, điều kiện gì đúng?" → $\\text{cost}(x) \\leq \\text{budget}$. Quan sát: $\\text{cost}(x)$ **tăng đơn điệu** theo $x$ (sản xuất nhiều hơn → tốn hơn).
- Đơn điệu + tìm $x$ lớn nhất thoả điều kiện → đây chính là **binary search trên đáp án** ([L12](../lesson-12-binary-search-variants/))! Khoảng $[1, 10^9]$, mỗi bước kiểm tra $\\text{cost}(\\text{mid})$, ~30 vòng → $O(30 \\cdot \\text{check})$.
- Bài học: từ "duyệt $x$" (TLE) sang "đoán $x$ rồi kiểm tra" (binary search) — đúng động tác *nghĩ ngược*.

> 📝 **Tóm tắt mục 5.** Stuck thì: đơn giản hoá, giải tay case nhỏ, vẽ, nghĩ ngược (→ binary search trên đáp án), tìm bài tương tự, đổi góc nhìn cấu trúc.

---

## 6. Edge cases checklist

> 💡 **Trực giác.** Test ẩn của máy chấm gần như *luôn* có case biên. Chạy checklist này trong đầu (hoặc viết test) trước khi submit.

- [ ] **Rỗng**: mảng/chuỗi $n = 0$. Trả về gì? (0? rỗng? lỗi?)
- [ ] **Một phần tử**: $n = 1$. Vòng lặp/đệ quy có chạy đúng không?
- [ ] **Toàn trùng**: mọi phần tử giống nhau. Two pointers, hash, dedup còn đúng?
- [ ] **Âm / 0**: giá trị âm hoặc bằng 0. Sliding window (giả định dương) có vỡ không? Chia cho 0?
- [ ] **Overflow**: tổng/tích vượt \`int32\`/\`int64\`? Dùng kiểu rộng hơn hoặc modulo.
- [ ] **Đã sorted / sorted ngược**: trường hợp tệ nhất của quicksort, hay best-case của binary search.
- [ ] **Max constraint**: $n$, giá trị ở mức lớn nhất. Có TLE/MLE (Memory Limit) không?
- [ ] **Trùng biên**: target nằm ở đầu/cuối mảng; window dài bằng cả mảng; đồ thị một đỉnh.

> ⚠ **Lỗi thường gặp.** **Overflow** là sát thủ thầm lặng: code chạy đúng mọi test nhỏ, rớt đúng test max vì \`sum\` tràn \`int32\`. Trong Go, \`int\` là 64-bit trên nền 64-bit nhưng vẫn cẩn thận với tích lớn (vd \`a*b\` với $a, b \\sim 10^9$ → cần \`int64\` và đôi khi \`big.Int\`).

> 🔁 **Dừng lại tự kiểm tra.** Hàm tính trung bình \`sum/n\`. Hai edge case nguy hiểm nào?
> <details><summary>Đáp án</summary>
> (1) $n = 0$ → chia cho 0 (panic/lỗi). (2) \`sum\` overflow khi cộng nhiều giá trị lớn. Sửa: kiểm tra \`n == 0\`, và dùng kiểu đủ rộng cho \`sum\` (hoặc cộng dồn cẩn thận).
> </details>

> 📝 **Tóm tắt mục 6.** Luôn thử: rỗng, 1 phần tử, toàn trùng, âm/0, overflow, đã sorted, max constraint, trùng biên.

---

## 7. Ví dụ áp dụng framework đầy đủ (đi qua 7 bước)

Phần này đi qua **đủ 7 bước** cho 3 bài kinh điển, kèm code Go thể hiện *quá trình tư duy* từ brute-force → optimal.

### 7.0 Cây quyết định nhanh (dùng kèm khi nhận pattern)

Khi đã đọc đề ở bước 5, đi theo cây này để khoanh vùng kỹ thuật:

\`\`\`
Bài hỏi gì?
├─ Tối ưu (min/max/đếm cách)?
│   ├─ Lựa chọn ảnh hưởng tương lai + bài con lặp?  → DP            (L23–L30)
│   ├─ Chọn cục bộ tốt nhất + chứng minh được?       → Greedy        (L19–L22)
│   └─ Liệt kê MỌI cấu hình (n nhỏ)?                  → Backtracking  (L18)
├─ Truy vấn trên mảng/đoạn?
│   ├─ Đã sorted, tìm biên/phần tử?                   → Binary search (L12)
│   ├─ Subarray/substring liên tục?                   → Window/prefix (L14,L15)
│   └─ Range query có cập nhật?                        → Segment tree  (L30)
├─ Trên đồ thị/quan hệ?
│   ├─ Lan toả/kết nối/ngắn nhất không trọng số?       → BFS/DFS       (L31)
│   ├─ Ngắn nhất, trọng số ≥ 0?                         → Dijkstra      (L33)
│   ├─ Thứ tự/phụ thuộc (DAG)?                          → Topo sort     (L32)
│   └─ Nhóm/hợp-tìm?                                    → Union-Find    (L36)
└─ Trên chuỗi?
    ├─ Khớp 1 mẫu?                                       → KMP/Z/RK      (L40–L42)
    └─ Nhiều mẫu/tiền tố chung?                          → Trie/Aho      (L43)
\`\`\`

> ⚠ **Lỗi thường gặp.** Cây này là *điểm khởi đầu*, không phải phán quyết. Luôn quay lại bước 4: kỹ thuật chọn ra phải đạt độ phức tạp mục tiêu. Vd "subarray liên tục" mặc định gợi window, nhưng nếu có số âm thì rẽ sang prefix + hash (xem 🔁 ở mục 4).

### 7.1 Longest Substring Without Repeating Characters

**Đề:** Cho chuỗi \`s\`, tìm độ dài chuỗi con (substring) liên tục dài nhất *không có ký tự lặp*. Constraint: \`len(s) ≤ 10^5\`.

- **Bước 1 (hiểu đề):** input là chuỗi, output là một số (độ dài). "Substring" = liên tục (khác "subsequence" = không cần liên tục). Không lặp = mỗi ký tự xuất hiện tối đa 1 lần trong cửa sổ.
- **Bước 2 (ví dụ):** \`"abcabcbb"\` → \`3\` (\`"abc"\`). \`"bbbbb"\` → \`1\`. \`""\` → \`0\`. \`"pwwkew"\` → \`3\` (\`"wke"\`). Edge: rỗng → 0; toàn trùng → 1.
- **Bước 3 (brute-force):** thử mọi substring \`(i, j)\`, kiểm tra không lặp. $O(n^2)$ cặp × $O(n)$ kiểm tra = $O(n^3)$. (Dùng set giảm còn $O(n^2)$.)
- **Bước 4 (constraint):** $n \\leq 10^5$ → $O(n^2) = 10^{10}$ **TLE**. Mục tiêu $O(n)$ hoặc $O(n \\log n)$.
- **Bước 5 (pattern):** "substring liên tục" + "thoả điều kiện" → **sliding window** ([L14](../lesson-14-sliding-window/)) + hash lưu vị trí ký tự.
- **Bước 6 (code + test):** dưới đây. Test các ví dụ bước 2.
- **Bước 7 (tối ưu):** đã $O(n)$, đạt mục tiêu → dừng.

**Mô phỏng từng bước** trên \`s = "abcabcbb"\` (cửa sổ \`[left, right]\`, \`last\` lưu vị trí gần nhất):

| \`right\` | \`c\` | \`last[c]\` trước | \`left\` mới | độ dài \`right-left+1\` | \`best\` |
|:------:|:---:|:--------------:|:----------:|:--------------------:|:-----:|
| 0 | a | — | 0 | 1 | 1 |
| 1 | b | — | 0 | 2 | 2 |
| 2 | c | — | 0 | 3 | **3** |
| 3 | a | 0 (≥ left) → left=1 | 1 | 3 | 3 |
| 4 | b | 1 (≥ left) → left=2 | 2 | 3 | 3 |
| 5 | c | 2 (≥ left) → left=3 | 3 | 3 | 3 |
| 6 | b | 4 (≥ left) → left=5 | 5 | 2 | 3 |
| 7 | b | 6 (≥ left) → left=7 | 7 | 1 | 3 |

Kết quả \`best = 3\` (chuỗi \`"abc"\`). Để ý: \`left\` **chỉ tiến**, không lùi → mỗi chỉ số được \`left\` và \`right\` đi qua tối đa 1 lần → tổng $O(n)$, đây là lý do window nhanh hơn brute $O(n^2)$.

\`\`\`go
package main

import "fmt"

// ----- Bước 3: BRUTE-FORCE (baseline đúng, O(n^2) với set) -----
// Tư duy: thử mọi điểm bắt đầu i, mở rộng tới khi gặp ký tự lặp.
func lengthBrute(s string) int {
	best := 0
	for i := 0; i < len(s); i++ {
		seen := map[byte]bool{}
		for j := i; j < len(s); j++ {
			if seen[s[j]] { // gặp lặp → dừng nhánh i này
				break
			}
			seen[s[j]] = true
			if j-i+1 > best {
				best = j - i + 1
			}
		}
	}
	return best
}

// ----- Bước 5+6: OPTIMAL bằng SLIDING WINDOW (O(n)) -----
// Tư duy: brute lãng phí vì mỗi i lại quét lại. Thay vì vậy,
// duy trì cửa sổ [left, right]; khi s[right] đã có trong cửa sổ,
// nhảy left tới ngay sau lần xuất hiện trước. last[c] = vị trí cuối của c.
func lengthOptimal(s string) int {
	last := make(map[byte]int) // ký tự -> chỉ số xuất hiện gần nhất
	best, left := 0, 0
	for right := 0; right < len(s); right++ {
		c := s[right]
		if idx, ok := last[c]; ok && idx >= left {
			left = idx + 1 // co cửa sổ: bỏ qua phần có ký tự lặp
		}
		last[c] = right
		if right-left+1 > best {
			best = right - left + 1
		}
	}
	return best
}

func main() {
	tests := []string{"abcabcbb", "bbbbb", "", "pwwkew"}
	for _, t := range tests {
		// So brute-force và optimal: phải bằng nhau (kiểm chứng đúng đắn)
		fmt.Printf("%-10q brute=%d optimal=%d\\n", t, lengthBrute(t), lengthOptimal(t))
	}
}
\`\`\`

### 7.2 Course Schedule (phát hiện chu trình trên DAG)

**Đề:** Có $n$ môn học \`0..n-1\` và danh sách điều kiện tiên quyết \`[a, b]\` nghĩa là "phải học \`b\` trước \`a\`". Hỏi có học hết được mọi môn không (tức đồ thị phụ thuộc *không* có chu trình)? Constraint: $n \\leq 10^5$, số điều kiện ≤ $10^5$.

- **Bước 1 (hiểu đề):** input là $n$ + danh sách cạnh có hướng \`a ← b\`. Output: bool. Học hết được ⟺ không có chu trình.
- **Bước 2 (ví dụ):** \`n=2, [[1,0]]\` → true (học 0 rồi 1). \`n=2, [[1,0],[0,1]]\` → false (vòng tròn). Edge: không có điều kiện nào → true; tự phụ thuộc \`[0,0]\` → false.
- **Bước 3 (brute-force):** thử mọi thứ tự học (hoán vị) xem có hợp lệ không → $O(n!)$. Vô vọng.
- **Bước 4 (constraint):** $n \\leq 10^5$ → cần tuyến tính $O(n + E)$.
- **Bước 5 (pattern):** "phụ thuộc / thứ tự" + "DAG" + "phát hiện chu trình" → **topological sort** ([L32](../lesson-32-topological-sort/)). Kahn's algorithm: nếu topo sort xếp được hết đỉnh → không chu trình.
- **Bước 6 (code + test):** dưới đây.
- **Bước 7 (tối ưu):** Kahn đã $O(n + E)$ → dừng.

**Mô phỏng Kahn** với $n = 4$, điều kiện \`[[1,0],[2,0],[3,1],[3,2]]\` (cạnh \`b→a\`: \`0→1, 0→2, 1→3, 2→3\`):

| Bước | indegree \`[0,1,2,3]\` | queue | học (learned) |
|:----:|:--------------------:|:-----:|:-------------:|
| đầu | \`[0,1,1,2]\` | \`[0]\` | 0 |
| lấy 0 → giảm 1,2 | \`[_,0,0,2]\` | \`[1,2]\` | 1 |
| lấy 1 → giảm 3 | \`[_,_,0,1]\` | \`[2]\` | 2 |
| lấy 2 → giảm 3 | \`[_,_,_,0]\` | \`[3]\` | 3 |
| lấy 3 | \`[_,_,_,_]\` | \`[]\` | 4 |

$\\text{learned} = 4 = n$ → **không chu trình** → true. Nếu có chu trình (vd thêm \`0\` phụ thuộc \`3\`), một số đỉnh sẽ kẹt indegree > 0, không bao giờ vào queue → $\\text{learned} < n$ → false.

\`\`\`go
package main

import "fmt"

// OPTIMAL: Topological sort bằng Kahn (BFS theo bậc vào).
// Tư duy: môn nào không còn điều kiện chưa học (indegree=0) thì học được ngay.
// Học xong nó thì giảm indegree các môn phụ thuộc. Nếu học được đủ n môn
// => không có chu trình => true.
func canFinish(n int, prerequisites [][]int) bool {
	adj := make([][]int, n)
	indeg := make([]int, n)
	for _, p := range prerequisites {
		a, b := p[0], p[1] // học b trước a  => cạnh b -> a
		adj[b] = append(adj[b], a)
		indeg[a]++
	}
	queue := []int{}
	for v := 0; v < n; v++ {
		if indeg[v] == 0 {
			queue = append(queue, v)
		}
	}
	learned := 0
	for len(queue) > 0 {
		v := queue[0]
		queue = queue[1:]
		learned++
		for _, w := range adj[v] {
			indeg[w]--
			if indeg[w] == 0 {
				queue = append(queue, w)
			}
		}
	}
	return learned == n // học hết => không chu trình
}

func main() {
	fmt.Println(canFinish(2, [][]int{{1, 0}}))        // true
	fmt.Println(canFinish(2, [][]int{{1, 0}, {0, 1}})) // false
	fmt.Println(canFinish(1, nil))                     // true (không điều kiện)
}
\`\`\`

### 7.3 Coin Change (số đồng xu ít nhất)

**Đề:** Cho các mệnh giá \`coins\` (vô hạn mỗi loại) và số tiền \`amount\`. Tìm **số đồng xu ít nhất** để đạt đúng \`amount\`, hoặc \`-1\` nếu không thể. Constraint: $\\text{amount} \\leq 10^4$, $\\text{len(coins)} \\leq 12$.

- **Bước 1 (hiểu đề):** input \`coins[]\` + \`amount\`. Output: số nguyên (ít xu nhất) hoặc \`-1\`. Mỗi loại xu dùng được nhiều lần (unbounded).
- **Bước 2 (ví dụ):** \`coins=[1,2,5], amount=11\` → \`3\` (5+5+1). \`coins=[2], amount=3\` → \`-1\`. \`amount=0\` → \`0\`. \`coins=[1], amount=2\` → \`2\`.
- **Bước 3 (brute-force):** thử mọi cách chọn xu đệ quy → cây phân nhánh khổng lồ, $O(\\text{coins}^{\\text{amount}})$. Mũ.
- **Bước 4 (constraint):** $\\text{amount} \\leq 10^4$, $\\text{coins} \\leq 12$ → $O(\\text{amount} \\cdot \\text{len(coins)}) = 1,2 \\cdot 10^5$ rất nhỏ. Mục tiêu: DP $O(\\text{amount} \\cdot \\text{coins})$.
- **Bước 5 (pattern):** "tối ưu (ít nhất)" + "lựa chọn (chọn xu nào)" + "bài con chồng nhau (cùng số tiền con xuất hiện nhiều lần)" → **Dynamic Programming** ([L25 — Knapsack family](../lesson-25-knapsack-family/), [L23](../lesson-23-dp-fundamentals/)). *Cảnh báo:* greedy "luôn lấy xu lớn nhất" **sai** (vd \`coins=[1,3,4], amount=6\`: greedy ra $4+1+1=3$ xu, DP ra $3+3=2$ xu).
- **Bước 6 (code + test):** dưới đây.
- **Bước 7 (tối ưu):** DP 1D đã tối ưu cả time lẫn space → dừng.

**Mô phỏng DP** với \`coins = [1, 3, 4]\`, \`amount = 6\`. \`dp[x]\` = số xu ít nhất cho $x$:

| \`x\` | tính \`dp[x] = min(dp[x-c]+1)\` | \`dp[x]\` |
|:---:|------------------------------|:------:|
| 0 | (cơ sở) | 0 |
| 1 | \`dp[0]+1 = 1\` | 1 |
| 2 | \`dp[1]+1 = 2\` | 2 |
| 3 | min(\`dp[2]+1=3\`, \`dp[0]+1=1\`) | 1 |
| 4 | min(\`dp[3]+1=2\`, \`dp[1]+1=2\`, \`dp[0]+1=1\`) | 1 |
| 5 | min(\`dp[4]+1=2\`, \`dp[2]+1=3\`, \`dp[1]+1=2\`) | 2 |
| 6 | min(\`dp[5]+1=3\`, \`dp[3]+1=2\`, \`dp[2]+1=3\`) | **2** |

\`dp[6] = 2\` (dùng $3 + 3$). Greedy lấy xu lớn nhất sẽ ra $4 + 1 + 1 = 3$ xu — **sai**. DP đúng vì nó thử *mọi* lựa chọn xu cuối cùng tại mỗi $x$, không "khoá cứng" vào xu to.

\`\`\`go
package main

import "fmt"

// OPTIMAL: DP 1D. dp[x] = số xu ít nhất để đạt đúng số tiền x.
// Tư duy: muốn đạt x, thử dùng 1 xu mệnh giá c => còn lại x-c.
// dp[x] = min(dp[x], dp[x-c] + 1) với mọi c <= x.
// (Greedy lấy xu lớn nhất SAI, nên dùng DP duyệt mọi lựa chọn.)
func coinChange(coins []int, amount int) int {
	const INF = 1 << 30
	dp := make([]int, amount+1)
	for x := 1; x <= amount; x++ {
		dp[x] = INF
	}
	dp[0] = 0 // 0 tiền cần 0 xu
	for x := 1; x <= amount; x++ {
		for _, c := range coins {
			if c <= x && dp[x-c]+1 < dp[x] {
				dp[x] = dp[x-c] + 1
			}
		}
	}
	if dp[amount] >= INF {
		return -1 // không đạt được
	}
	return dp[amount]
}

func main() {
	fmt.Println(coinChange([]int{1, 2, 5}, 11)) // 3
	fmt.Println(coinChange([]int{2}, 3))         // -1
	fmt.Println(coinChange([]int{1, 3, 4}, 6))   // 2 (greedy sẽ ra 3 — sai)
	fmt.Println(coinChange([]int{1}, 0))         // 0
}
\`\`\`

> 🔁 **Dừng lại tự kiểm tra.** Ở 7.3, vì sao greedy "luôn lấy xu lớn nhất ≤ số còn lại" sai?
> <details><summary>Đáp án</summary>
> Vì lựa chọn cục bộ tốt (lấy xu to) không dẫn tới tối ưu toàn cục. \`coins=[1,3,4], amount=6\`: greedy lấy \`4\` → còn \`2\` → $1+1$ → tổng \`3\` xu. Nhưng $3+3 = 2$ xu mới tối ưu. Greedy chỉ đúng với hệ tiền "canonical" (vd VND, USD chuẩn); đề tổng quát phải DP.
> </details>

> 📝 **Tóm tắt mục 7.** Cùng một quy trình 7 bước cho 3 bài rất khác nhau: window (chuỗi), topo sort (đồ thị), DP (tối ưu). Điểm chung: brute-force trước → đọc constraint → nhận pattern → code → kiểm chứng bằng baseline.

---

## 8. Anti-pattern (những cái bẫy cần tránh)

> ⚠ **Lỗi thường gặp — bốn anti-pattern kinh điển:**

1. **Code ngay khi chưa hiểu đề.** Bỏ qua bước 1–2 → giải đúng một bài *khác*. Triệu chứng: viết được code nhưng sai ví dụ nhỏ. *Sửa:* luôn rephrase đề + giải tay 1 ví dụ trước khi gõ.
2. **Tối ưu sớm (premature optimization).** Lao vào segment tree/cấu trúc phức tạp khi $n \\leq 1000$ chỉ cần $O(n^2)$. Tốn thời gian, dễ bug. *Sửa:* đọc constraint (mục 3) → chỉ tối ưu tới *vừa đủ* mục tiêu.
3. **Không test edge case.** Code đúng case thường, rớt test ẩn (rỗng, max, overflow). *Sửa:* chạy checklist mục 6 trước khi submit.
4. **Chọn greedy mà không kiểm chứng.** "Có vẻ tham lam là được" → sai như coin change 7.3. *Sửa:* greedy phải có lập luận *exchange argument* hoặc đối chiếu với DP trên case nhỏ. Khi nghi ngờ, dùng DP. Xem [L22](../lesson-22-greedy-vs-dp/).

**Ví dụ cụ thể về tối ưu sớm:** đề "tổng đoạn \`[l,r]\`, $n \\leq 1000$, $q \\leq 1000$ truy vấn, *không* cập nhật". Phản xạ "range query → segment tree" → viết 60 dòng cây phân đoạn, dễ bug. Nhưng $n, q \\leq 1000$ cho $O(n \\cdot q)=10^6$ *quá thừa kịp*; thậm chí cộng thẳng mỗi truy vấn cũng được, và **prefix sum** (3 dòng) là quá đủ. Segment tree chỉ cần khi *có cập nhật* hoặc $n, q$ lớn ($10^5+$). Đọc constraint trước → tránh viết thừa.

> ❓ **Câu hỏi tự nhiên.** *"Làm sao biết greedy đúng mà không cần chứng minh hình thức?"* — Cách thực dụng: viết brute-force/DP đúng, sinh ngẫu nhiên *nhiều* case nhỏ, so kết quả greedy với DP (kỹ thuật *stress testing*). Nếu lệch dù chỉ 1 case → greedy sai. Khớp toàn bộ → tăng tự tin (nhưng không thay được chứng minh).

> 📝 **Tóm tắt mục 8.** Tránh: (1) code khi chưa hiểu đề, (2) tối ưu sớm, (3) bỏ test edge, (4) greedy không kiểm chứng.

---

## 9. Thẻ tra nhanh (cheat-sheet một trang)

Gói gọn cả lesson để dán lên màn hình khi luyện tập:

**Quy trình:** Hiểu đề → Ví dụ + edge → Brute-force → Big-O + constraint → Pattern → Code + test → Tối ưu.

**Constraint → mục tiêu (mốc $\\sim 10^8$ phép/giây):**

| $n \\leq$ | Mục tiêu | $n \\leq$ | Mục tiêu |
|:----:|:--------:|:----:|:--------:|
| 12 | $O(n!)$ / backtracking | $10^5\\text{–}10^6$ | $O(n \\log n)$ |
| 20–25 | $O(2^n)$ / bitmask | $10^7\\text{–}10^8$ | $O(n)$ |
| 100–500 | $O(n^3)$ | $10^9$ | $O(\\log n)$ / $O(1)$ |
| 1000–5000 | $O(n^2)$ | $10^{18}$ | $O(\\log n)$ |

**Dấu hiệu → kỹ thuật:** sorted→binary search/two pointers · liên tục→window/prefix · cặp tổng→two pointers/hash · mọi tổ hợp→backtracking · tối ưu+overlap→DP · chọn cục bộ→greedy(chứng minh!) · interval→sort+sweep · đường đi→BFS/DFS · ngắn nhất ≥0→Dijkstra · cạnh âm→Bellman-Ford · DAG thứ tự→topo sort · top-k/min-max→heap · đếm/lookup→hash · range query→prefix/segment tree · khớp chuỗi→KMP/Z/RK.

**Stuck:** đơn giản hoá · giải tay · vẽ · nghĩ ngược · tìm bài tương tự · đổi góc nhìn.

**Edge:** rỗng · 1 phần tử · trùng · âm/0 · overflow · đã sorted · max · trùng biên.

**Tránh:** code khi chưa hiểu đề · tối ưu sớm · bỏ test edge · greedy không kiểm chứng.

> 📝 **Tóm tắt mục 9.** Một trang gói trọn: quy trình 7 bước + bảng constraint + bản đồ dấu hiệu + danh sách thoát stuck + checklist edge + anti-pattern.

---

## 10. Ứng dụng thực tế trong phần mềm

> 💡 **Khung giải bài này không chỉ để thi — nó là quy trình bạn dùng khi gặp bài toán mới trong công việc thật.** Cùng các bước: hiểu → mô hình hóa → chọn công cụ → kiểm.

| Bối cảnh thật | Khung áp dụng thế nào |
|---------------|------------------------|
| **Phỏng vấn coding** | Làm rõ yêu cầu → brute-force → tối ưu → test edge case (đúng 4 bước) |
| **Debug production** | Tái hiện → thu hẹp (binary search nguyên nhân) → giả thuyết → kiểm |
| **System design** | Ước lượng tải → chọn DS/thuật toán theo độ phức tạp → trade-off |
| **Code review** | Nhận diện độ phức tạp, edge case thiếu, cấu trúc dữ liệu sai |
| **Tối ưu hiệu năng** | Profiling tìm hot path → nhận dạng pattern → áp thuật toán phù hợp |

### 10.1. Ví dụ cụ thể — khung này trong phỏng vấn và debug

**Phỏng vấn**: gặp "tìm hai số cộng = target", đừng code ngay. Làm rõ (mảng sắp chưa? có số âm?) → brute-force $O(n^2)$ nói ra → nhận ra hash đưa về $O(n)$ → code → test mảng rỗng/trùng. Đúng khung 4 bước.

**Debug**: API chậm bất thường. Khung: tái hiện (request nào?) → thu hẹp (binary search: tắt từng phần xem phần nào chậm) → giả thuyết (vòng lặp $O(n^2)$ trên data lớn?) → kiểm bằng profiling. Cùng tư duy "hiểu → thu hẹp → kiểm" như giải thuật toán.

> ❓ **"Khung này có thật sự giúp hay chỉ lý thuyết?"** Khác biệt lớn nhất giữa người mới và kỹ sư giỏi không phải "biết nhiều thuật toán" mà là **quy trình ổn định**: không nhảy vào code vội, biết hỏi đúng câu, biết khi nào brute-force đủ. Khung này mã hóa quy trình đó để áp dụng nhất quán.

### 10.2. 📝 Tóm tắt mục 10

- Khung giải bài = quy trình thật cho **phỏng vấn**, **debug production**, **system design**, **code review**, **tối ưu**.
- Cùng tư duy: hiểu/làm-rõ → mô hình hóa (brute-force) → chọn công cụ (tối ưu) → kiểm (test/profiling).
- Giá trị: quy trình ổn định > thuộc nhiều thuật toán.

## Bài tập

Với **mỗi** bài dưới đây, **không cần code đầy đủ** — hãy tập trung vào TƯ DUY: (a) đoán **độ phức tạp mục tiêu** từ constraint, (b) **nhận diện pattern**, (c) **chọn kỹ thuật**, (d) **outline lời giải**.

1. **Two Sum sorted.** Mảng *đã sorted*, tìm 2 chỉ số có tổng = \`target\`. $n \\leq 10^5$.
2. **Subarray tổng = k (có số âm).** Đếm số subarray liên tục có tổng đúng bằng $k$. $n \\leq 10^5$, giá trị có thể âm.
3. **Đường đi ngắn nhất, trọng số không âm.** Đồ thị $n$ đỉnh, $m$ cạnh trọng số ≥ 0, tìm khoảng cách ngắn nhất từ đỉnh \`s\` tới mọi đỉnh. $n \\leq 10^5$, $m \\leq 2 \\cdot 10^5$.
4. **Sinh mọi tập con tổng = target.** \`coins\` không trùng, liệt kê *mọi* tập con có tổng = \`target\`. $\\text{len(coins)} \\leq 16$.
5. **Đếm chữ "ABC" xuất hiện trong văn bản lớn.** Đếm số lần mẫu \`p\` xuất hiện trong \`s\`. $\\text{len}(s) \\leq 10^6$, $\\text{len}(p) \\leq 10^4$.
6. **Lập lịch n việc trên DAG.** Cho $n$ việc và quan hệ "việc A phải xong trước việc B", tìm *một* thứ tự thực hiện hợp lệ, hoặc báo không thể. $n \\leq 10^5$, số quan hệ ≤ $2 \\cdot 10^5$.

---

## Lời giải chi tiết

### Bài 1 — Two Sum sorted

- **(a) Độ phức tạp mục tiêu:** $n \\leq 10^5$ → $O(n^2) = 10^{10}$ TLE. Mục tiêu $O(n)$ (vì đã sorted, không cần cả $O(n \\log n)$).
- **(b) Pattern:** "mảng **đã sorted**" + "tìm **cặp** có tổng cho trước" → dấu hiệu kinh điển của **two pointers**.
- **(c) Kỹ thuật:** two pointers ([L13](../lesson-13-two-pointers/)). (Nếu mảng *chưa* sorted thì dùng hash $O(n)$, [L16](../lesson-16-hashing-techniques/).)
- **(d) Outline:** đặt \`l = 0\`, \`r = n-1\`. Tính \`sum = a[l] + a[r]\`. Nếu \`= target\` → trả về \`(l, r)\`. Nếu \`< target\` → \`l++\` (cần tổng lớn hơn). Nếu \`> target\` → \`r--\`. Mỗi bước thu hẹp khoảng → $O(n)$. *Edge:* $n < 2$ → không có cặp; trùng giá trị vẫn đúng.

### Bài 2 — Subarray tổng = k (có số âm)

- **(a) Mục tiêu:** $n \\leq 10^5$ → $O(n)$ hoặc $O(n \\log n)$. $O(n^2)$ (mọi cặp) = $10^{10}$ TLE.
- **(b) Pattern:** "subarray **liên tục**" + "tổng = k" — *nhưng có số âm* → **sliding window KHÔNG dùng được** (mở rộng window không làm tổng đơn điệu). Cảnh báo này quan trọng.
- **(c) Kỹ thuật:** **prefix sum + hash map** ([L15](../lesson-15-prefix-sum-difference/) + [L16](../lesson-16-hashing-techniques/)).
- **(d) Outline:** \`prefix[j] - prefix[i] = k\` ⟺ subarray \`(i, j]\` có tổng \`k\`. Duyệt \`j\`, với mỗi \`prefix[j]\` tìm số lần \`prefix[j] - k\` đã xuất hiện trước đó (lưu trong hash \`count[prefixValue]\`). Cộng dồn vào đáp án, rồi \`count[prefix[j]]++\`. Nhớ khởi tạo \`count[0] = 1\` (prefix rỗng). $O(n)$. *Edge:* \`k = 0\`; giá trị âm/0; overflow tổng (dùng \`int64\`).

### Bài 3 — Đường đi ngắn nhất, trọng số không âm

- **(a) Mục tiêu:** $n \\leq 10^5$, $m \\leq 2 \\cdot 10^5$ → cần $O((n + m) \\log n) \\approx 3 \\cdot 10^5 \\cdot 17 \\approx 5 \\cdot 10^6$, kịp. $O(n^2)$ Dijkstra dạng mảng = $10^{10}$ TLE.
- **(b) Pattern:** "đường đi **ngắn nhất**" + "trọng số **không âm**" → **Dijkstra**. (Nếu có cạnh âm → Bellman-Ford; nếu không trọng số → BFS.)
- **(c) Kỹ thuật:** Dijkstra với **heap** (priority queue) ([L33](../lesson-33-dijkstra/)). Dấu hiệu phụ "luôn lấy đỉnh khoảng cách nhỏ nhất tiếp theo" → heap.
- **(d) Outline:** \`dist[s] = 0\`, đẩy \`(0, s)\` vào min-heap. Lặp: lấy đỉnh \`u\` có \`dist\` nhỏ nhất; với mỗi cạnh \`(u, v, w)\` nếu \`dist[u] + w < dist[v]\` thì cập nhật và đẩy \`(dist[v], v)\`. Bỏ qua entry cũ trong heap (lazy deletion). *Edge:* đỉnh không tới được → \`dist = ∞\`; đồ thị 1 đỉnh; cạnh trọng số 0.

### Bài 4 — Sinh mọi tập con tổng = target

- **(a) Mục tiêu:** $\\text{len(coins)} \\leq 16$ → $2^{16} = 65536$ tập con → exponential **OK**. Vì đề yêu cầu *liệt kê mọi* tập con (không chỉ đếm), bản chất output đã mũ.
- **(b) Pattern:** "sinh **tất cả** tổ hợp/tập con thoả điều kiện" → **backtracking**.
- **(c) Kỹ thuật:** backtracking ([L18](../lesson-18-backtracking/)). (Có thể duyệt bitmask $2^{16}$ vì $n$ nhỏ, nhưng backtracking cắt nhánh sớm gọn hơn.)
- **(d) Outline:** đệ quy \`dfs(i, remain, cur)\`: tại chỉ số \`i\`, hoặc *bỏ* \`coins[i]\` hoặc *lấy* nó (\`remain - coins[i]\`). Khi \`remain == 0\` → lưu \`cur\` vào kết quả. Cắt nhánh nếu \`remain < 0\`. Sort giảm dần để cắt sớm. *Edge:* \`target = 0\` → tập rỗng là một đáp án; coins lớn hơn target bỏ ngay.

### Bài 5 — Đếm mẫu xuất hiện trong văn bản lớn

- **(a) Mục tiêu:** $\\text{len}(s) \\leq 10^6$ → cần $O(|s| + |p|)$. Naïve so từng vị trí = $O(|s| \\cdot |p|) = 10^{10}$ TLE.
- **(b) Pattern:** "tìm/đếm **chuỗi con khớp mẫu**" trong văn bản → string matching tuyến tính.
- **(c) Kỹ thuật:** **KMP** ([L41](../lesson-41-kmp/)) hoặc **Z-algorithm** ([L42](../lesson-42-z-algorithm/)) hoặc **Rabin-Karp** ([L40](../lesson-40-string-matching-rabin-karp/)). KMP/Z đảm bảo $O(n+m)$ worst-case; Rabin-Karp $O(n+m)$ kỳ vọng (cần xử lý va chạm hash).
- **(d) Outline (KMP):** xây mảng \`fail\` (failure function) của \`p\` trong $O(|p|)$. Quét \`s\`, duy trì độ dài khớp hiện tại \`j\`; khi mismatch nhảy \`j = fail[j-1]\` thay vì lùi về đầu; khi \`j == |p|\` → đếm +1 rồi \`j = fail[j-1]\`. *Edge:* \`p\` rỗng; \`p\` dài hơn \`s\`; mẫu chồng lấp (vd đếm "aa" trong "aaaa" = 3).

### Bài 6 — Lập lịch n việc trên DAG

- **(a) Mục tiêu:** $n \\leq 10^5$, quan hệ ≤ $2 \\cdot 10^5$ → $O(n + E)$ tuyến tính. Thử mọi hoán vị $O(n!)$ vô vọng.
- **(b) Pattern:** "**thứ tự / phụ thuộc** A trước B" trên đồ thị có hướng → **topological sort**. "Hoặc báo không thể" = phát hiện chu trình.
- **(c) Kỹ thuật:** topological sort bằng Kahn (BFS theo indegree) hoặc DFS post-order ([L32](../lesson-32-topological-sort/)).
- **(d) Outline (Kahn):** tính \`indegree\` mọi đỉnh; đẩy mọi đỉnh \`indegree=0\` vào queue; lặp lấy ra đỉnh \`u\`, thêm vào thứ tự, giảm \`indegree\` các đỉnh kề, đỉnh nào về 0 thì đẩy vào queue. Nếu thứ tự có đủ $n$ đỉnh → trả về thứ tự; nếu thiếu → **có chu trình** → báo không thể. $O(n + E)$. *Edge:* không quan hệ nào (mọi thứ tự hợp lệ); tự phụ thuộc \`A → A\` (chu trình); nhiều thành phần rời rạc.

---

## Code & Minh hoạ

- Code Go inline đầy đủ ở **mục 7** (3 bài: longest substring, course schedule, coin change) — thể hiện brute-force → nhận pattern → optimal.
- [visualization.html](./visualization.html) — 3 module tương tác:
  1. **Constraint → Complexity**: nhập $n$, gợi ý độ phức tạp mục tiêu + kỹ thuật khả dĩ.
  2. **Pattern Matcher**: chọn dấu hiệu bài toán → gợi ý kỹ thuật + link lesson.
  3. **7-Step Walkthrough**: chọn bài mẫu, đi qua đủ 7 bước.

## 📝 Tóm tắt toàn bài

- **Framework = quy trình + bản đồ.** 7 bước lặp lại được cho mọi bài lạ; không đoán mò.
- **Constraint → độ phức tạp mục tiêu** (mục 3): $n$ nhỏ (≤25) cho phép exponential; $\\sim 10^5$ ép $O(n \\log n)$; $\\sim 10^9$ ép $O(\\log n)$. Quy đổi qua mốc $\\sim 10^8$ phép/giây.
- **Dấu hiệu → kỹ thuật** (mục 4): học thuộc bảng + cây quyết định (7.0). "sorted/liên tục/tổ hợp/tối ưu/đường đi/top-k/đếm/khớp chuỗi/thứ tự DAG" → kỹ thuật tương ứng.
- **Brute-force trước** làm baseline đúng, rồi tối ưu *vừa đủ* mục tiêu — không tối ưu sớm.
- **Stuck:** đơn giản hoá, giải tay, vẽ, nghĩ ngược, tìm bài tương tự, đổi góc nhìn.
- **Luôn test edge** (rỗng, 1 phần tử, trùng, âm/0, overflow, max) và **kiểm chứng greedy** trước khi tin.

## Bài tiếp theo

- [Lesson 51 — Complexity Trade-offs](../lesson-51-complexity-tradeoffs/) — time vs space, precompute vs query, online vs offline.
- Quay lại [trang chính Algorithms](../index.html) hoặc [Tier 8](../tier-8-problem-solving/index.html).
`;
