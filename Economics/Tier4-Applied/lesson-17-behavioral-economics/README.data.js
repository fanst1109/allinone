// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: Economics/Tier4-Applied/lesson-17-behavioral-economics/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 17 — Behavioral Economics

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Hiểu vì sao **kinh tế hành vi** xuất hiện — khi nào con người *không* duy lý theo nghĩa kinh tế cổ điển.
- Phân biệt **System 1** (nhanh, cảm tính) và **System 2** (chậm, lý tính) theo Kahneman.
- Áp dụng **Prospect Theory** — *thua đau hơn lợi vui* (loss aversion), nhạy cảm khác nhau với lợi - mất.
- Nhận diện các **biases**: anchoring, framing, status quo, endowment effect, sunk cost (đã gặp Lesson 01), confirmation bias.
- Hiểu **nudge** — thiết kế chính sách dùng biases để hướng hành vi tốt mà không cấm đoán.

## Kiến thức tiền đề

- [Lesson 01](../../Tier1-Foundations/lesson-01-thinking-like-economist/): tư duy duy lý, chi phí cơ hội, sunk cost.

## 1. Khi nào "homo economicus" sai

Kinh tế cổ điển giả định:

1. Con người **duy lý** — tối đa hóa utility.
2. Tính toán *hoàn hảo* mọi chi phí, lợi ích, xác suất.
3. Sở thích *ổn định + nhất quán*.

Thực tế:

- Người ta thường dùng **heuristics** (kinh nghiệm rút gọn), dễ sai lệch.
- Phản ứng *cảm tính* + thiên lệch nhận thức.
- Sở thích *đổi theo bối cảnh* (framing).

## 2. System 1 vs System 2 (Kahneman)

- **System 1**: tự động, nhanh, cảm tính, không tốn năng lượng. Vd: nhìn mặt ai đó biết họ vui hay buồn.
- **System 2**: chủ động, chậm, lý tính, tốn năng lượng. Vd: nhân 17 × 24.

Phần lớn quyết định đời thường dùng System 1 → dễ rơi vào biases.

## 3. Prospect Theory

### 3.1. Thí nghiệm Kahneman-Tversky

A. Bạn được tặng \`1.000\`. Chọn:
- (i) Nhận thêm chắc chắn \`500\`.
- (ii) 50% nhận thêm \`1.000\`, 50% không nhận.

B. Bạn được tặng \`2.000\`. Chọn:
- (iii) Mất chắc chắn \`500\`.
- (iv) 50% mất \`1.000\`, 50% không mất.

Phần lớn người chọn (i) ở A — *risk-averse* với *lợi*. Nhưng cũng chọn (iv) ở B — *risk-loving* với *mất*. Dù 2 tình huống *kết quả cuối cùng giống nhau* (\`+1500\` vs \`+2000\` ± \`1000\`).

→ Sở thích không phụ thuộc *kết quả cuối*, mà phụ thuộc **gain vs loss so với điểm tham chiếu** + **độ cong khác nhau** giữa lợi và mất.

### 3.2. Hàm value của Kahneman

\`\`\`
v(x) = x^α       nếu x ≥ 0 (gain)
     = -λ(-x)^β  nếu x < 0 (loss)
\`\`\`

\`λ ≈ 2-2.5\` — mất đau gấp 2-2.5 lần lợi tương đương. \`α, β ≈ 0.88\` — lõm khi gain, lồi khi loss.

### 3.3. Loss aversion ứng dụng

- **Endowment effect**: sở hữu vật → định giá cao hơn khi bán. Người được tặng cốc trị giá \`5$\` đòi giá \`7$\` để bán — vì *bán* = mất.
- **Status quo bias**: ngại đổi vì *đổi = có thể mất*.
- **Disposition effect**: nhà đầu tư bán cổ phiếu tăng giá nhanh (chốt lời) + giữ cổ phiếu giảm (sợ nhận mất) — ngược tối ưu.

## 4. Các biases quan trọng

### 4.1. Anchoring

Quyết định bị ảnh hưởng bởi số "neo" — kể cả số ngẫu nhiên.

**Thí nghiệm**: hỏi người 2 câu (a) "Dân số Thổ Nhĩ Kỳ lớn hơn hay nhỏ hơn X (X = số quay roulette)?"; (b) "Bạn đoán dân số là bao nhiêu?". Câu trả lời (b) bị neo bởi X — kể cả khi X *hoàn toàn ngẫu nhiên*.

**Ứng dụng**: giá gốc (anchor) → giá sale có vẻ rẻ. Đề xuất "ngân sách \`100M\`" trong thương lượng → kết quả gần \`100M\` hơn.

### 4.2. Framing

Cùng nội dung, cách diễn đạt khác → quyết định khác.

**Thí nghiệm**: "Chính sách cứu 200/600 người" vs "Chính sách 400/600 người chết" — cùng kết quả, nhưng câu đầu được chọn nhiều hơn.

**Ứng dụng**: marketing, chính sách công.

### 4.3. Mental accounting

Coi tiền không thay thế hoàn toàn — "túi tiền" cho từng mục. Vd: đi du lịch tiêu hoang hơn dù tiền giống nhau, "tiền thưởng" tiêu khác "tiền lương".

### 4.4. Hyperbolic discounting

Coi trọng quá mức *hiện tại* so với *tương lai gần*, nhưng *tương lai gần* vs *tương lai xa* lại không chênh nhiều.

**Walk-through**: hỏi:
- Nhận \`100k\` hôm nay vs \`110k\` ngày mai? → Nhiều người chọn hôm nay.
- Nhận \`100k\` sau 1 năm vs \`110k\` sau 1 năm + 1 ngày? → Hầu hết chọn \`110k\`.

Đáng lẽ phải nhất quán — nhưng người ta đảo lựa chọn. Điều này giải thích vì sao khó tiết kiệm, hút thuốc dù biết hại lâu dài.

### 4.5. Overconfidence

Người ta *đánh giá quá cao* khả năng + chính xác bản thân. 80% lái xe tự nghĩ mình giỏi hơn trung bình (không thể có 80%).

## 5. Nudge — Thiết kế hành vi

**Nudge** (Thaler & Sunstein 2008) = thay đổi *kiến trúc lựa chọn* (choice architecture) để hướng người ta đến quyết định tốt, *không* cấm đoán hoặc thay đổi incentive tài chính lớn.

### Ví dụ

1. **Default options**: Áo, Pháp (mặc định ĐĂNG KÝ hiến tạng, ai không muốn opt-out) có tỉ lệ hiến > 90%. Đức (mặc định KHÔNG, ai muốn opt-in) có tỉ lệ ~12%. Cùng dân số tương tự, khác duy nhất ở mặc định.

2. **Auto-enrollment 401(k)**: Mỹ — mặc định ghi danh tiết kiệm hưu trí → tỉ lệ tham gia tăng từ 60% → 90%. Người ta lười opt-out hoặc opt-in.

3. **Fly in urinals**: dán hình con ruồi trong nhà vệ sinh nam → giảm 80% nước tiểu vương vãi (vì người ta nhắm vào nó).

4. **Calorie label**: hiển thị calorie ở menu → giảm trung bình ~5% calo người dùng order.

### Tranh luận

Nudge thay đổi hành vi mà *không* lấy đi tự do lựa chọn — gọi là **libertarian paternalism**. Tuy nhiên có lo ngại:
- Ai quyết định "tốt" cho người khác?
- Có thể bị lạm dụng (nudge để bán hàng kém chất lượng).
- Effect quy mô lớn không phải lúc nào cũng giữ được khi nhân rộng.

## 6. Bài tập

### Bài 1 — Loss aversion

Cho \`λ = 2.25, α = β = 0.88\`. Tính:
- (a) \`v(+1000)\`.
- (b) \`v(−1000)\`.
- (c) Một bet 50/50 thắng \`1000\` hoặc thua \`1000\` — kỳ vọng \`v\` = ?
- (d) Người ta sẽ tránh bet này không? Tại sao?

### Bài 2 — Anchoring

Bạn đi mua xe cũ. Người bán đưa giá khởi điểm \`300\` triệu. Theo nghiên cứu hiệu ứng anchoring, người mua *không* biết giá thị trường sẽ trả gần với \`300\` hơn là gần với giá đúng. Đề xuất chiến lược chống anchoring.

### Bài 3 — Default option

Công ty muốn nhân viên tiết kiệm hưu trí nhiều hơn. Đề xuất 2 cách:
- (A) Tổ chức buổi giáo dục tài chính.
- (B) Thay default option của 401(k) từ opt-in sang opt-out.

So sánh hiệu quả + chi phí + đạo đức.

### Bài 4 — Sunk cost

Bạn đã trả \`5tr\` cho khóa học online, học được 20%. Bạn ghét nó. Còn \`50\` giờ học. Nếu dành 50h đó cho việc khác sẽ lợi nhiều hơn. Bạn nên làm gì? Phân tích sunk cost.

## 7. Lời giải

### Lời giải Bài 1

(a) \`v(+1000) = 1000^0.88 ≈ 468\`.
(b) \`v(−1000) = −2.25 × 1000^0.88 ≈ −1053\`.
(c) \`0.5 × 468 + 0.5 × (−1053) = 234 − 526.5 = −292.5\`.
(d) \`v(bet) < 0\` → tránh bet, dù *kỳ vọng giá trị tiền* = 0. Đây là **loss aversion** — mất \`1000\` đau gấp đôi lợi \`1000\` vui.

### Lời giải Bài 2

Chống anchoring:

1. **Nghiên cứu giá thị trường TRƯỚC** khi gặp người bán. Có "anchor riêng" để so.
2. **Đề xuất giá đầu thấp hơn rõ rệt**: nếu bạn nghĩ đáng \`200tr\`, đề xuất \`170tr\` → kéo trung bình thương lượng xuống.
3. **Bỏ đi**: nếu giá quá cao, đi thử chỗ khác, quay lại sau nếu cần.

### Lời giải Bài 3

(A) Giáo dục: tốn thời gian, hiệu quả thấp (kiến thức không tự động thành hành động).
(B) Default switch: gần như miễn phí, hiệu quả cao (60% → 90% participation). 

→ B hiệu quả hơn nhiều, ít tốn. Đạo đức: nudge — không cấm, ai không muốn vẫn opt-out được.

### Lời giải Bài 4

5tr là **sunk cost** — đã trả, không thu hồi. Quyết định *tương lai*: 50h còn lại có lợi cho việc khác hơn → **bỏ khóa**. "Tiếc 5tr" là sunk cost fallacy — não bị loss aversion. Cách chống: tự hỏi *"nếu KHÔNG đã trả 5tr, tôi có học khóa này không?"* — nếu KHÔNG → bỏ.

## 8. Liên kết và bài tiếp theo

- **Bài tiếp theo**: [Lesson 18 — Development Economics](../lesson-18-development-economics/).
- **Bài trước**: [Lesson 16 — International Trade](../lesson-16-international-trade/).
- **Minh họa**: [visualization.html](./visualization.html) — Prospect theory value function tương tác.
`;
