// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: OperatingSystems/02-Memory-Storage/lesson-05-page-replacement/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 05 — Thuật toán thay trang (Page Replacement Algorithms)

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Giải thích được **vấn đề thay trang**: khi RAM đầy và cần nạp trang mới, hệ điều hành phải chọn trang nào để đẩy ra đĩa (victim page).
- Thực hiện **walk-through đầy đủ** bốn thuật toán — FIFO, Optimal, LRU, Clock — trên cùng một chuỗi tham chiếu, đếm số page fault ở từng bước.
- Giải thích **nghịch lý Belady (Belady's anomaly)**: thêm frame RAM có thể làm tăng số page fault — hiện tượng xảy ra với FIFO nhưng không xảy ra với LRU hay Optimal.
- So sánh ưu nhược điểm và khả năng triển khai thực tế của từng thuật toán.

## Kiến thức tiền đề

- [Lesson 02 — Paging](../lesson-02-paging/): page, frame, bảng trang, dịch địa chỉ.
- [Lesson 04 — Bộ nhớ ảo & demand paging](../lesson-04-virtual-memory-demand-paging/): page fault, demand paging, khái niệm working set.

---

## 1. Vấn đề thay trang

### 1.1. Bài toán đặt ra

💡 **Trực giác — Analogy bàn làm việc:**
Hãy tưởng tượng bàn làm việc của bạn (= RAM) chỉ đủ chỗ cho 3 cuốn sách (= 3 frame). Bạn đang đọc xen kẽ nhiều cuốn — khi cần cuốn thứ tư, bạn phải cất một cuốn xuống giá (= đẩy ra đĩa). Câu hỏi: cất cuốn nào? Cất cuốn sẽ không đọc nữa → tốt. Cất cuốn mới vừa mở → tệ, ngay sau đó phải lấy lại ngay. **Thuật toán thay trang** quyết định "cuốn nào phải cất" để giảm thiểu số lần phải đi lấy sách từ giá (= số page fault).

**Bối cảnh kỹ thuật:** Khi tiến trình truy cập trang (page) không có trong RAM, CPU sinh ra **page fault**. Hệ điều hành phải:
1. Tìm frame trống — nếu có, nạp trang vào.
2. Nếu không còn frame trống → chọn **victim page** (trang bị đuổi), ghi ra đĩa nếu "dirty", nạp trang mới vào frame đó.

Số page fault càng nhiều → càng nhiều lần truy cập đĩa → hiệu năng giảm nghiêm trọng (đĩa chậm hơn RAM hàng nghìn lần).

### 1.2. Chuỗi tham chiếu (reference string) dùng xuyên suốt

Để so sánh công bằng, tất cả bốn thuật toán sẽ chạy trên:

- **Reference string:** \`7 0 1 2 0 3 0 4 2 3 0 3 2 1 2 0 1 7 0 1\`
- **Số frame:** 3

❓ **Câu hỏi tự nhiên của người đọc:**

- *"Tại sao phải dùng cùng chuỗi tham chiếu?"* — Để so sánh số page fault giữa các thuật toán một cách công bằng. Chuỗi tham chiếu khác nhau có thể cho kết quả hoàn toàn đảo ngược.
- *"Reference string đến từ đâu trong thực tế?"* — Từ chuỗi địa chỉ bộ nhớ mà tiến trình truy cập. OS thu thập và phân tích để chọn thuật toán phù hợp.
- *"Frame 3 là ít hay nhiều?"* — Rất ít, nhưng đủ để thấy sự khác biệt giữa các thuật toán. Thực tế một tiến trình có hàng trăm đến hàng nghìn frame.

📝 **Tóm tắt mục 1:**
- Page fault xảy ra khi trang cần truy cập không có trong RAM.
- Hệ điều hành phải chọn victim page để đuổi ra khi RAM đầy.
- Mục tiêu: tối thiểu số page fault.

---

## 2. Thuật toán FIFO (First-In, First-Out)

### 2.1. Nguyên lý

💡 **Trực giác:** FIFO = hàng đợi. Trang nào vào RAM trước sẽ bị đuổi trước — đơn giản như xếp hàng mua vé. Không quan tâm trang đó có đang được dùng nhiều hay không.

**Cài đặt:** Dùng một hàng đợi (queue). Khi cần đuổi, đuổi trang ở đầu hàng đợi (vào sớm nhất). Trang mới vào thêm vào cuối hàng đợi.

### 2.2. Walk-through với 3 frame

Reference string: \`7 0 1 2 0 3 0 4 2 3 0 3 2 1 2 0 1 7 0 1\`

| Bước | Trang | Frame 0 | Frame 1 | Frame 2 | Fault? | Đuổi |
|------|-------|---------|---------|---------|--------|------|
| 1 | 7 | **7** | — | — | **FAULT** | — |
| 2 | 0 | 7 | **0** | — | **FAULT** | — |
| 3 | 1 | 7 | 0 | **1** | **FAULT** | — |
| 4 | 2 | **2** | 0 | 1 | **FAULT** | 7 (vào đầu) |
| 5 | 0 | 2 | 0 | 1 | HIT | — |
| 6 | 3 | 2 | **3** | 1 | **FAULT** | 0 (vào thứ 2) |
| 7 | 0 | 2 | 3 | **0** | **FAULT** | 1 (vào thứ 3) |
| 8 | 4 | **4** | 3 | 0 | **FAULT** | 2 (vào đầu) |
| 9 | 2 | 4 | **2** | 0 | **FAULT** | 3 (vào thứ 2) |
| 10 | 3 | 4 | 2 | **3** | **FAULT** | 0 (vào thứ 3) |
| 11 | 0 | **0** | 2 | 3 | **FAULT** | 4 (vào đầu) |
| 12 | 3 | 0 | 2 | 3 | HIT | — |
| 13 | 2 | 0 | 2 | 3 | HIT | — |
| 14 | 1 | 0 | **1** | 3 | **FAULT** | 2 (vào thứ 2) |
| 15 | 2 | 0 | 1 | **2** | **FAULT** | 3 (vào thứ 3) |
| 16 | 0 | 0 | 1 | 2 | HIT | — |
| 17 | 1 | 0 | 1 | 2 | HIT | — |
| 18 | 7 | **7** | 1 | 2 | **FAULT** | 0 (vào đầu) |
| 19 | 0 | 7 | **0** | 2 | **FAULT** | 1 (vào thứ 2) |
| 20 | 1 | 7 | 0 | **1** | **FAULT** | 2 (vào thứ 3) |

**Tổng page fault FIFO = 15**

⚠ **Lỗi thường gặp:** Nhiều người nhầm FIFO đuổi trang ít được dùng nhất. Không — FIFO chỉ nhìn vào thứ tự **vào**, không quan tâm tần suất dùng. Một trang vào trước nhưng vẫn đang được dùng rất nhiều vẫn bị đuổi.

📝 **Tóm tắt mục 2:**
- FIFO: đơn giản, dễ cài đặt, chỉ cần queue.
- Không phân biệt trang "nóng" (hay dùng) và "lạnh" (ít dùng) → hiệu năng không tốt.
- **FIFO mắc nghịch lý Belady** (sẽ thấy ở mục 6).

---

## 3. Thuật toán Optimal (OPT / Belady's Optimal)

### 3.1. Nguyên lý

💡 **Trực giác:** Biết tương lai thì chọn được perfect. Optimal đuổi trang sẽ **không được dùng lâu nhất trong tương lai**. Nếu có trang không bao giờ dùng lại → đuổi trang đó trước.

**Vấn đề thực tế:** Không thể cài đặt trong thực tế vì OS không biết trước tương lai. Optimal chỉ dùng để **so sánh lý thuyết** — xác định "tốt nhất có thể đạt được" và so sánh các thuật toán thực tế với ngưỡng này.

### 3.2. Walk-through với 3 frame

| Bước | Trang | Frames (sau xử lý) | Fault? | Đuổi | Lý do |
|------|-------|---------------------|--------|------|-------|
| 1 | 7 | {7, —, —} | **FAULT** | — | — |
| 2 | 0 | {7, 0, —} | **FAULT** | — | — |
| 3 | 1 | {7, 0, 1} | **FAULT** | — | — |
| 4 | 2 | {2, 0, 1} | **FAULT** | 7 | 7 dùng tiếp theo ở bước 18 (xa nhất) |
| 5 | 0 | {2, 0, 1} | HIT | — | — |
| 6 | 3 | {2, 0, 3} | **FAULT** | 1 | 1 tiếp theo ở bước 14 (xa hơn 2 ở bước 9, 0 ở bước 7) |
| 7 | 0 | {2, 0, 3} | HIT | — | — |
| 8 | 4 | {4, 0, 3} | **FAULT** | 2 | 2 tiếp theo ở bước 9; 0 ở bước 11; 3 ở bước 10 → đuổi 2 (bước 9 xa hơn 0 ở bước 11? Không — 3 tiếp theo ở 10, 0 ở 11, 2 ở 9; đuổi 0 vì xa nhất? Xem chi tiết) |

**Giải thích chi tiết bước 8:** Frames hiện tại \`{2, 0, 3}\`. Cần nạp trang 4. Xem tương lai từ bước 9 trở đi (\`2 3 0 3 2 1 2 0 1 7 0 1\`):
- Trang 2: xuất hiện tiếp theo ở bước 9.
- Trang 0: xuất hiện tiếp theo ở bước 11.
- Trang 3: xuất hiện tiếp theo ở bước 10.
→ Đuổi 0 (lần xuất hiện tiếp theo xa nhất, bước 11 > bước 10 > bước 9).

| Bước | Trang | Frames | Fault? | Đuổi |
|------|-------|--------|--------|------|
| 8 | 4 | {2, 4, 3} | **FAULT** | 0 (xa nhất) |
| 9 | 2 | {2, 4, 3} | HIT | — |
| 10 | 3 | {2, 4, 3} | HIT | — |
| 11 | 0 | {2, 0, 3} | **FAULT** | 4 (4 không xuất hiện lại → xa nhất) |
| 12 | 3 | {2, 0, 3} | HIT | — |
| 13 | 2 | {2, 0, 3} | HIT | — |
| 14 | 1 | {2, 0, 1} | **FAULT** | 3 (3 không xuất hiện lại sau bước 12) |
| 15 | 2 | {2, 0, 1} | HIT | — |
| 16 | 0 | {2, 0, 1} | HIT | — |
| 17 | 1 | {2, 0, 1} | HIT | — |
| 18 | 7 | {7, 0, 1} | **FAULT** | 2 (2 không xuất hiện lại) |
| 19 | 0 | {7, 0, 1} | HIT | — |
| 20 | 1 | {7, 0, 1} | HIT | — |

**Tổng page fault Optimal = 9**

🔁 **Dừng lại tự kiểm tra:**

Ở bước 6, tại sao đuổi trang 1 mà không đuổi trang 2?

<details>
<summary>Đáp án</summary>
Frames hiện tại: {2, 0, 1}. Xem tương lai từ bước 7: \`0 4 2 3 0 3 2 1 2 0 1 7 0 1\`.
- Trang 0: xuất hiện tiếp theo ở bước 7 (rất gần).
- Trang 2: xuất hiện tiếp theo ở bước 9.
- Trang 1: xuất hiện tiếp theo ở bước 14 (xa nhất).
→ Đuổi trang 1 vì sẽ không cần lại sớm nhất.
</details>

📝 **Tóm tắt mục 3:**
- Optimal: ít fault nhất về lý thuyết — **9 fault** với chuỗi này.
- Không thể cài đặt thực tế (cần biết tương lai).
- Dùng làm **benchmark** để đánh giá các thuật toán khác.

---

## 4. Thuật toán LRU (Least Recently Used)

### 4.1. Nguyên lý

💡 **Trực giác:** LRU dựa vào **quá khứ gần** để dự đoán tương lai. Nếu trang vừa được dùng gần đây → có khả năng sẽ dùng tiếp. Nếu trang lâu không được dùng → có khả năng sẽ không cần sớm. LRU đuổi trang đã **không được truy cập lâu nhất** (least recently used).

**Lý do LRU hoạt động tốt:** Đây là ứng dụng của **nguyên lý locality (cục bộ)** — chương trình thực tế có xu hướng lặp lại truy cập vùng bộ nhớ gần nhau trong thời gian ngắn (temporal locality).

**Cài đặt thực tế:**
- **Stack:** Mỗi khi truy cập trang, đưa trang đó lên đầu stack. Đuổi trang ở đáy stack (ít dùng nhất gần đây).
- **Counter:** Mỗi trang có counter = timestamp lần dùng cuối. Đuổi trang có counter nhỏ nhất.
- Nhược điểm: tốn chi phí cập nhật mỗi lần truy cập bộ nhớ.

### 4.2. Walk-through với 3 frame

| Bước | Trang | Frames | Fault? | Đuổi | Stack (mới nhất → cũ nhất) |
|------|-------|--------|--------|------|-----------------------------|
| 1 | 7 | {7, —, —} | **FAULT** | — | [7] |
| 2 | 0 | {7, 0, —} | **FAULT** | — | [0, 7] |
| 3 | 1 | {7, 0, 1} | **FAULT** | — | [1, 0, 7] |
| 4 | 2 | {2, 0, 1} | **FAULT** | 7 (LRU) | [2, 1, 0] |
| 5 | 0 | {2, 0, 1} | HIT | — | [0, 2, 1] |
| 6 | 3 | {2, 0, 3} | **FAULT** | 1 (LRU) | [3, 0, 2] |
| 7 | 0 | {2, 0, 3} | HIT | — | [0, 3, 2] |
| 8 | 4 | {4, 0, 3} | **FAULT** | 2 (LRU) | [4, 0, 3] |
| 9 | 2 | {4, 0, 2} | **FAULT** | 3 (LRU) | [2, 4, 0] |
| 10 | 3 | {3, 0, 2} | **FAULT** | 4 (LRU) | [3, 2, 0] |
| 11 | 0 | {3, 0, 2} | HIT | — | [0, 3, 2] |
| 12 | 3 | {3, 0, 2} | HIT | — | [3, 0, 2] |
| 13 | 2 | {3, 0, 2} | HIT | — | [2, 3, 0] |
| 14 | 1 | {1, 3, 2} | **FAULT** | 0 (LRU) | [1, 2, 3] |
| 15 | 2 | {1, 3, 2} | HIT | — | [2, 1, 3] |
| 16 | 0 | {1, 0, 2} | **FAULT** | 3 (LRU) | [0, 2, 1] |
| 17 | 1 | {1, 0, 2} | HIT | — | [1, 0, 2] |
| 18 | 7 | {7, 0, 1} | **FAULT** | 2 (LRU) | [7, 1, 0] |
| 19 | 0 | {7, 0, 1} | HIT | — | [0, 7, 1] |
| 20 | 1 | {7, 0, 1} | HIT | — | [1, 0, 7] |

**Tổng page fault LRU = 12**

⚠ **Lỗi thường gặp:** Nhiều người nhầm LRU với LFU (Least Frequently Used). LRU đuổi trang **lâu nhất không dùng** (về thời gian). LFU đuổi trang **ít dùng nhất** (về tần suất — đếm số lần). Hai thuật toán hoàn toàn khác nhau và cho kết quả khác nhau.

📝 **Tóm tắt mục 4:**
- LRU: **12 fault** — tốt hơn FIFO (15), kém Optimal (9).
- Dựa vào locality của chương trình thực tế → hiệu quả trong thực tế.
- Chi phí cài đặt chính xác cao → thực tế dùng Clock/Second-chance là xấp xỉ LRU.
- **LRU không mắc nghịch lý Belady** (thêm frame luôn giảm hoặc giữ nguyên fault).

---

## 5. Thuật toán Clock (Second-Chance)

### 5.1. Nguyên lý

💡 **Trực giác — Đồng hồ quay:**
Các frame được bố trí thành vòng tròn như mặt đồng hồ. Một con trỏ (kim đồng hồ) quay theo chiều kim đồng hồ. Mỗi trang có một bit \`R\` (reference bit):
- \`R = 1\`: trang vừa được truy cập gần đây.
- \`R = 0\`: trang chưa được truy cập từ lần kiểm tra trước.

Khi cần đuổi trang:
1. Nhìn vào trang mà kim đồng hồ đang trỏ:
   - Nếu \`R = 0\` → đuổi trang này (victim).
   - Nếu \`R = 1\` → đặt \`R = 0\` (cho "cơ hội thứ hai"), chuyển kim sang frame tiếp theo.
2. Lặp lại đến khi tìm được trang có \`R = 0\`.

**Vì sao gọi là Second-Chance?** Trang có \`R = 1\` được "tha bổng" một lần — bit R đặt về 0, nếu vòng sau vẫn không dùng thì bị đuổi.

### 5.2. Walk-through đơn giản với 4 frame

Chuỗi: \`1 2 3 4 1 2 5 1 2 3 4 5\`, 4 frame (ví dụ nhỏ để minh họa rõ cơ chế).

| Bước | Trang | Frames [R-bit] | Fault? | Đuổi | Kim trỏ |
|------|-------|----------------|--------|------|---------|
| 1 | 1 | [1:1, -, -, -] | **FAULT** | — | → F1 |
| 2 | 2 | [1:1, 2:1, -, -] | **FAULT** | — | → F2 |
| 3 | 3 | [1:1, 2:1, 3:1, -] | **FAULT** | — | → F3 |
| 4 | 4 | [1:1, 2:1, 3:1, 4:1] | **FAULT** | — | → F4 |
| 5 | 1 | [1:1, 2:1, 3:1, 4:1] | HIT, R→1 | — | — |
| 6 | 2 | [1:1, 2:1, 3:1, 4:1] | HIT, R→1 | — | — |
| 7 | 5 | [1:0, 2:0, 3:0, 5:1] | **FAULT** | 1→0→0→0; 1 đuổi? Kim ở F0, R=1→0; F1 R=1→0; F2 R=1→0; F3 R=1→0; F0 R=0→đuổi 1, nạp 5 | 1 | → F1 sau đuổi |

**Giải thích bước 7 chi tiết:** Kim bắt đầu ở F0 (trang 1, R=1):
- F0: trang 1, R=1 → đặt R=0, tiến kim.
- F1: trang 2, R=1 → đặt R=0, tiến kim.
- F2: trang 3, R=1 → đặt R=0, tiến kim.
- F3: trang 4, R=1 → đặt R=0, tiến kim.
- F0 (vòng lại): trang 1, R=0 → **đuổi trang 1**, nạp trang 5 vào F0.

Kết quả: \`[5:1, 2:0, 3:0, 4:0]\`, kim ở F1.

**Tổng fault cho ví dụ Clock này = 8/12.**

### 5.3. Clock vs LRU

| Tiêu chí | LRU chính xác | Clock (xấp xỉ LRU) |
|----------|---------------|---------------------|
| Độ chính xác | Chính xác | Xấp xỉ |
| Chi phí | Cao (cập nhật timestamp mỗi access) | Thấp (chỉ 1 bit R, phần cứng hỗ trợ) |
| Cài đặt | Phức tạp | Đơn giản |
| Thực tế | Ít dùng nguyên gốc | **Dùng rộng rãi** (Linux, Windows) |

⚠ **Lỗi thường gặp:** Nhiều người nghĩ Clock = FIFO vì đều quay vòng. Không — FIFO không nhìn vào R bit, cứ đuổi trang vào sớm nhất. Clock nhìn vào R bit — trang vừa dùng (R=1) được cơ hội thứ hai, không bị đuổi ngay.

🔁 **Dừng lại tự kiểm tra:**

Nếu tất cả frame đều có R=1 khi cần đuổi, Clock làm gì?

<details>
<summary>Đáp án</summary>
Kim quay một vòng đầy, đặt tất cả R=1 về R=0. Rồi quay vòng thứ hai: frame đầu tiên nó đến sẽ có R=0 → đuổi. Nghĩa là trong trường hợp này Clock hoạt động gần giống FIFO (đuổi frame nào vào vị trí "đầu" trong vòng quay).
</details>

📝 **Tóm tắt mục 5:**
- Clock/Second-chance: xấp xỉ LRU với chi phí thấp hơn nhiều.
- Dùng R bit (phần cứng MMU cung cấp) → không tốn chi phí cập nhật thủ công mỗi lần truy cập.
- Được dùng thực tế trong hầu hết OS hiện đại.

---

## 6. Nghịch lý Belady (Belady's Anomaly)

### 6.1. Trực giác — điều ngược đời

💡 **Trực giác:** Thêm RAM, hiệu năng phải tăng — đúng không? Với hầu hết thuật toán (LRU, Optimal) thì đúng. Nhưng với **FIFO**, thêm frame đôi khi làm **tăng** số page fault. Đây là nghịch lý Belady.

### 6.2. Minh họa bằng số

Chuỗi: \`1 2 3 4 1 2 5 1 2 3 4 5\`

**FIFO với 3 frame:**

| Bước | Trang | F0 | F1 | F2 | Fault? |
|------|-------|----|----|----|--------|
| 1 | 1 | 1 | — | — | FAULT |
| 2 | 2 | 1 | 2 | — | FAULT |
| 3 | 3 | 1 | 2 | 3 | FAULT |
| 4 | 4 | 4 | 2 | 3 | FAULT (đuổi 1) |
| 5 | 1 | 4 | 1 | 3 | FAULT (đuổi 2) |
| 6 | 2 | 4 | 1 | 2 | FAULT (đuổi 3) |
| 7 | 5 | 5 | 1 | 2 | FAULT (đuổi 4) |
| 8 | 1 | 5 | 1 | 2 | HIT |
| 9 | 2 | 5 | 1 | 2 | HIT |
| 10 | 3 | 5 | 3 | 2 | FAULT (đuổi 1) |
| 11 | 4 | 5 | 3 | 4 | FAULT (đuổi 2) |
| 12 | 5 | 5 | 3 | 4 | HIT |

**FIFO 3 frame: 9 page fault**

**FIFO với 4 frame:**

| Bước | Trang | F0 | F1 | F2 | F3 | Fault? |
|------|-------|----|----|----|----|--------|
| 1 | 1 | 1 | — | — | — | FAULT |
| 2 | 2 | 1 | 2 | — | — | FAULT |
| 3 | 3 | 1 | 2 | 3 | — | FAULT |
| 4 | 4 | 1 | 2 | 3 | 4 | FAULT |
| 5 | 1 | 1 | 2 | 3 | 4 | HIT |
| 6 | 2 | 1 | 2 | 3 | 4 | HIT |
| 7 | 5 | 5 | 2 | 3 | 4 | FAULT (đuổi 1) |
| 8 | 1 | 5 | 1 | 3 | 4 | FAULT (đuổi 2) |
| 9 | 2 | 5 | 1 | 2 | 4 | FAULT (đuổi 3) |
| 10 | 3 | 5 | 1 | 2 | 3 | FAULT (đuổi 4) |
| 11 | 4 | 4 | 1 | 2 | 3 | FAULT (đuổi 5) |
| 12 | 5 | 4 | 5 | 2 | 3 | FAULT (đuổi 1) |

**FIFO 4 frame: 10 page fault**

**Kết luận:** FIFO, 3 frame → 9 fault; FIFO, 4 frame → **10 fault** — thêm 1 frame lại tăng fault! Đây là nghịch lý Belady.

### 6.3. Vì sao xảy ra?

FIFO chỉ nhìn vào **thứ tự vào**, không phản ánh tần suất sử dụng. Khi thêm frame, thứ tự vào thay đổi → trang bị đuổi thay đổi → có thể dẫn đến nhiều miss hơn theo trình tự cụ thể đó.

**LRU và Optimal không mắc nghịch lý Belady** — chúng thuộc lớp thuật toán "stack algorithms" (thêm frame, tập trang trong RAM là superset của tập khi ít frame hơn). FIFO không thuộc lớp này.

❓ **Câu hỏi tự nhiên của người đọc:**

- *"Nghịch lý Belady có thường xảy ra trong thực tế không?"* — Hiếm, nhưng có thể xảy ra với FIFO. Đây là lý do thực tế không dùng FIFO nguyên gốc mà dùng Clock hoặc LRU variants.
- *"Tại sao gọi là 'anomaly' (dị thường)?"* — Vì nó vi phạm kỳ vọng thông thường: thêm tài nguyên → hiệu năng tăng.

📝 **Tóm tắt mục 6:**
- Nghịch lý Belady: FIFO có thể fault nhiều hơn khi thêm frame.
- LRU, Optimal không mắc vì là stack algorithms.
- Clock cũng thường không mắc (xấp xỉ LRU).

---

## 7. So sánh tổng hợp

| Thuật toán | Page fault (3 frame, 20 tham chiếu) | Nghịch lý Belady | Cài đặt thực tế | Cần biết tương lai? |
|------------|-------------------------------------|-----------------|-----------------|---------------------|
| FIFO | 15 | **Có** | Rất dễ | Không |
| Optimal | 9 (lý thuyết tốt nhất) | Không | Không thể | **Có** |
| LRU | 12 | Không | Tốn chi phí | Không |
| Clock | ~12 (xấp xỉ LRU) | Không | **Đơn giản, thực tế** | Không |

**Thực tế OS hiện đại** (Linux, Windows, macOS) dùng biến thể của Clock (second-chance) hoặc LRU approximation với nhiều bit R, không dùng FIFO hay Optimal thuần.

---

## Bài tập

**Bài 1.** Chạy FIFO với reference string \`1 2 3 4 2 1 5 6 2 1 2 3 7 6 3 2 1 2 3 6\` và 3 frame. Đếm page fault.

**Bài 2.** Chứng minh nghịch lý Belady cho bài 1: chạy lại với 4 frame, so sánh số fault.

**Bài 3.** Chạy LRU với reference string \`3 2 1 0 3 2 4 3 2 1 0 4\` và 4 frame. Tại mỗi fault, ghi rõ trang nào bị đuổi và lý do.

**Bài 4.** Cho chuỗi \`0 1 2 3 0 1 4 0 1 2 3 4\` với 3 frame. Chứng minh Optimal cho ít fault hơn LRU.

**Bài 5.** Giải thích vì sao Clock không cần cập nhật stack/timestamp mỗi lần truy cập bộ nhớ, trong khi LRU chính xác phải làm vậy. Điều này ảnh hưởng thế nào đến hiệu năng của OS?

## Lời giải chi tiết

### Bài 1 — FIFO, 3 frame

Reference string: \`1 2 3 4 2 1 5 6 2 1 2 3 7 6 3 2 1 2 3 6\`

| Bước | Trang | F0 | F1 | F2 | Fault? | Đuổi |
|------|-------|----|----|----|--------|------|
| 1 | 1 | **1** | — | — | F | — |
| 2 | 2 | 1 | **2** | — | F | — |
| 3 | 3 | 1 | 2 | **3** | F | — |
| 4 | 4 | **4** | 2 | 3 | F | 1 |
| 5 | 2 | 4 | 2 | 3 | H | — |
| 6 | 1 | 4 | **1** | 3 | F | 2 |
| 7 | 5 | 4 | 1 | **5** | F | 3 |
| 8 | 6 | **6** | 1 | 5 | F | 4 |
| 9 | 2 | 6 | **2** | 5 | F | 1 |
| 10 | 1 | 6 | 2 | **1** | F | 5 |
| 11 | 2 | 6 | 2 | 1 | H | — |
| 12 | 3 | **3** | 2 | 1 | F | 6 |
| 13 | 7 | 3 | **7** | 1 | F | 2 |
| 14 | 6 | 3 | 7 | **6** | F | 1 |
| 15 | 3 | 3 | 7 | 6 | H | — |
| 16 | 2 | **2** | 7 | 6 | F | 3 |
| 17 | 1 | 2 | **1** | 6 | F | 7 |
| 18 | 2 | 2 | 1 | 6 | H | — |
| 19 | 3 | 2 | 1 | **3** | F | 6 |
| 20 | 6 | **6** | 1 | 3 | F | 2 |

**Tổng page fault = 16**

### Bài 2 — FIFO, 4 frame (nghịch lý Belady)

Reference string: \`1 2 3 4 2 1 5 6 2 1 2 3 7 6 3 2 1 2 3 6\`

| Bước | Trang | F0 | F1 | F2 | F3 | Fault? |
|------|-------|----|----|----|----|--------|
| 1 | 1 | 1 | — | — | — | F |
| 2 | 2 | 1 | 2 | — | — | F |
| 3 | 3 | 1 | 2 | 3 | — | F |
| 4 | 4 | 1 | 2 | 3 | 4 | F |
| 5 | 2 | 1 | 2 | 3 | 4 | H |
| 6 | 1 | 1 | 2 | 3 | 4 | H |
| 7 | 5 | 5 | 2 | 3 | 4 | F (đuổi 1) |
| 8 | 6 | 5 | 6 | 3 | 4 | F (đuổi 2) |
| 9 | 2 | 5 | 6 | 2 | 4 | F (đuổi 3) |
| 10 | 1 | 5 | 6 | 2 | 1 | F (đuổi 4) |
| 11 | 2 | 5 | 6 | 2 | 1 | H |
| 12 | 3 | 3 | 6 | 2 | 1 | F (đuổi 5) |
| 13 | 7 | 3 | 7 | 2 | 1 | F (đuổi 6) |
| 14 | 6 | 3 | 7 | 6 | 1 | F (đuổi 2) |
| 15 | 3 | 3 | 7 | 6 | 1 | H |
| 16 | 2 | 3 | 7 | 6 | 2 | F (đuổi 1) |
| 17 | 1 | 1 | 7 | 6 | 2 | F (đuổi 3) |
| 18 | 2 | 1 | 7 | 6 | 2 | H |
| 19 | 3 | 1 | 3 | 6 | 2 | F (đuổi 7) |
| 20 | 6 | 1 | 3 | 6 | 2 | H |

**FIFO 4 frame: 14 fault** vs FIFO 3 frame: 16 fault. Ở ví dụ cụ thể này 4 frame tốt hơn. Nghịch lý Belady không phải luôn xảy ra — nó chỉ xảy ra với một số chuỗi tham chiếu nhất định. Chuỗi minh họa rõ nhất ở mục 6.2 (\`1 2 3 4 1 2 5 1 2 3 4 5\`).

### Bài 3 — LRU, 4 frame

Reference string: \`3 2 1 0 3 2 4 3 2 1 0 4\`

| Bước | Trang | Frames | Fault? | Đuổi (LRU) | Stack |
|------|-------|--------|--------|------------|-------|
| 1 | 3 | {3} | F | — | [3] |
| 2 | 2 | {3,2} | F | — | [2,3] |
| 3 | 1 | {3,2,1} | F | — | [1,2,3] |
| 4 | 0 | {3,2,1,0} | F | — | [0,1,2,3] |
| 5 | 3 | {3,2,1,0} | H | — | [3,0,1,2] |
| 6 | 2 | {3,2,1,0} | H | — | [2,3,0,1] |
| 7 | 4 | {3,2,4,0} | F | 1 (LRU trong {3,2,1,0}: LRU=1) | [4,2,3,0] |
| 8 | 3 | {3,2,4,0} | H | — | [3,4,2,0] |
| 9 | 2 | {3,2,4,0} | H | — | [2,3,4,0] |
| 10 | 1 | {3,2,1,4} | F | 0 (LRU) | [1,2,3,4] |
| 11 | 0 | {3,2,1,0} | F | 4 (LRU) | [0,1,2,3] |
| 12 | 4 | {4,2,1,0} | F | 3 (LRU) | [4,0,1,2] |

**Tổng fault = 8** (6 fault đầu + 3 fault sau = 9... kiểm tra: bước 1-4: 4F, bước 5-6: H, bước 7: F, bước 8-9: H, bước 10-12: 3F → tổng = 4+1+3 = **8 fault**)

### Bài 4 — Optimal vs LRU, 3 frame

Reference string: \`0 1 2 3 0 1 4 0 1 2 3 4\`

**LRU:**

| Bước | Trang | Frames | Fault? |
|------|-------|--------|--------|
| 1 | 0 | {0} | F |
| 2 | 1 | {0,1} | F |
| 3 | 2 | {0,1,2} | F |
| 4 | 3 | {1,2,3} | F (đuổi 0 — LRU) |
| 5 | 0 | {2,3,0} | F (đuổi 1 — LRU) |
| 6 | 1 | {3,0,1} | F (đuổi 2 — LRU) |
| 7 | 4 | {0,1,4} | F (đuổi 3 — LRU) |
| 8 | 0 | {0,1,4} | H |
| 9 | 1 | {0,1,4} | H |
| 10 | 2 | {1,4,2} | F (đuổi 0 — LRU) |
| 11 | 3 | {4,2,3} | F (đuổi 1 — LRU) |
| 12 | 4 | {4,2,3} | H |

**LRU: 9 fault**

**Optimal:**

| Bước | Trang | Frames | Fault? | Đuổi |
|------|-------|--------|--------|------|
| 1 | 0 | {0} | F | — |
| 2 | 1 | {0,1} | F | — |
| 3 | 2 | {0,1,2} | F | — |
| 4 | 3 | {0,1,3} | F | 2 (2 tiếp theo ở bước 10; 0→bước5; 1→bước6) |
| 5 | 0 | {0,1,3} | H | — |
| 6 | 1 | {0,1,3} | H | — |
| 7 | 4 | {0,1,4} | F | 3 (3 tiếp theo ở bước 11; 0→bước8; 1→bước9) |
| 8 | 0 | {0,1,4} | H | — |
| 9 | 1 | {0,1,4} | H | — |
| 10 | 2 | {0,1,2} | F | 4 (4 tiếp theo ở bước 12; 0 và 1 không xuất hiện lại; 4→bước12, gần hơn) → đuổi 4 |
| 11 | 3 | {0,3,2} | F | 1 (1 không xuất hiện lại) |
| 12 | 4 | {4,3,2} | F | 0 (0 không xuất hiện lại) |

**Optimal: 8 fault < LRU: 9 fault** — Optimal tốt hơn.

### Bài 5 — Clock vs LRU: chi phí

**LRU chính xác** cần cập nhật timestamp (hoặc di chuyển trong stack) **mỗi lần truy cập bộ nhớ**. Vì CPU truy cập bộ nhớ hàng triệu lần mỗi giây, chi phí cập nhật phần mềm là không thể chấp nhận. Cài đặt phần cứng (như đặt timestamp trong page table entry) tốn silicon và memory bandwidth.

**Clock** chỉ cần **1 bit R** (reference bit) trong page table entry. Phần cứng MMU (Memory Management Unit) **tự động** đặt R=1 mỗi khi trang được truy cập — không cần OS can thiệp. OS chỉ cần đọc R bit khi chạy thuật toán thay trang (ít thường xuyên hơn nhiều). Khi cần reset R bit, OS quét qua và đặt về 0 theo chu kỳ.

**Kết quả:** Clock hoạt động trong thực tế với chi phí gần bằng FIFO nhưng chất lượng xấp xỉ LRU.

## Liên kết và bài tiếp theo

- [Lesson 04 — Bộ nhớ ảo & demand paging](../lesson-04-virtual-memory-demand-paging/) — nền tảng của bài này
- [Lesson 06 — Filesystem](../lesson-06-filesystem/) — dữ liệu bị đuổi từ RAM sẽ nằm trên đĩa, được quản lý bởi filesystem
- [visualization.html](./visualization.html) — mô phỏng tương tác các thuật toán thay trang

## 📝 Tổng kết Lesson 05

- **FIFO** (15 fault): đơn giản, mắc nghịch lý Belady — không dùng thực tế.
- **Optimal** (9 fault): tốt nhất về lý thuyết, không cài đặt được (cần biết tương lai) — dùng để đánh giá benchmark.
- **LRU** (12 fault): tốt, dựa vào locality, nhưng chi phí cài đặt chính xác cao.
- **Clock/Second-chance** (~12 fault): xấp xỉ LRU, chi phí thấp, được dùng trong OS thực tế.
- **Nghịch lý Belady**: FIFO, thêm frame có thể tăng fault — LRU/Optimal không mắc.
- Mọi trang bị đuổi có dirty bit → phải ghi ra đĩa trước khi frame được tái sử dụng.
`;
