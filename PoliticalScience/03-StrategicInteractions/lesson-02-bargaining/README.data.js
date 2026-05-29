// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: PoliticalScience/03-StrategicInteractions/lesson-02-bargaining/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 02: Bargaining — Nash Solution & Rubinstein Alternating Offers

> **Tầng 3 — Strategic Interactions · PoliticalScience**

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Tính **Nash bargaining solution** cho bài toán chia surplus với disagreement point bất kỳ.
- Giải thích tại sao Nash solution maximize tích (Nash product) và ý nghĩa axiomatic.
- Phân tích **Rubinstein alternating offers model** (1982): tính SPE split theo discount factor δ.
- Hiểu cơ chế kinh tế đằng sau: patience = power; outside option = leverage.
- Phân tích **ultimatum game**: SPE là gì vs kết quả thực nghiệm, và ý nghĩa với lý thuyết.

## Kiến thức tiền đề

- **T1-L01**: Nash Equilibrium — concept.
- **T1-L03**: Backward induction, subgame perfect equilibrium.
- **L01** (bài này): collective action context (optional).

---

## 1. Bài toán Bargaining — Ai lấy bao nhiêu?

> 💡 **Trực giác**: Hai người tìm thấy 100 đô. Họ phải đồng ý chia thì mới ai có. Nếu không đồng ý, không ai có. Câu hỏi: ai lấy bao nhiêu? Nghe đơn giản — nhưng đây là vấn đề nền tảng của chính trị: labor negotiations, international treaties, coalition formation, khoanh vùng thuế.

**Cấu trúc chung của bargaining problem**:

- 2 players: i = 1, 2.
- **Feasible set F**: tập hợp phân chia (u₁, u₂) mà cả hai có thể đồng ý.
- **Disagreement point d = (d₁, d₂)**: mỗi người nhận được nếu không đồng ý (outside option, BATNA — Best Alternative To Negotiated Agreement).
- **Surplus** = tổng giá trị của F vượt qua d.

Ví dụ: chia 100 đô, d = (0,0): F = {(x, 100−x) : 0 ≤ x ≤ 100}. Surplus = 100.

---

## 2. Nash Bargaining Solution (1950)

### 2.1 Axioms của Nash

Nash (1950) đề xuất: một "fair" solution phải thỏa mãn 4 axioms:

1. **Pareto efficiency**: không ai có thể làm tốt hơn mà không làm người kia tệ hơn.
2. **Symmetry**: nếu 2 player symmetric (same payoffs, same d), chia đều.
3. **Invariance to affine transformations**: nếu đổi đơn vị utility → solution không thay đổi.
4. **Independence of irrelevant alternatives**: bỏ bớt option không được chọn → solution không đổi.

**Định lý Nash**: Chỉ có **duy nhất một** solution thỏa mãn cả 4 axioms:

$$\\text{maximize } (u_1 - d_1)(u_2 - d_2) \\text{ subject to } (u_1, u_2) \\in F$$

Gọi là **Nash product** — tích của surplus mỗi bên vượt qua disagreement point.

### 2.2 Walk-through 1: Chia 100 đô, d = (0, 0)

F = {(x, 100−x) : 0 ≤ x ≤ 100}. Maximize: x(100−x).

Đạo hàm: d/dx [x(100−x)] = 100 − 2x = 0 → **x = 50**.

Nash solution: **(50, 50)**. Chia đều — vì symmetric problem → symmetric solution.

### 2.3 Walk-through 2: Asymmetric disagreement point

d = (20, 0) — Player 1 có outside option 20 (có thể nhận 20 nếu không đồng ý, ví dụ: công ty A đang trả lương 20k).

Maximize: (x − 20)(100 − x). Đặt y = x − 20:

Maximize y(80 − y) (vì 100 − x = 80 − y). Đạo hàm: 80 − 2y = 0 → y = 40 → x = 60.

Nash solution: **(60, 40)**. Player 1 với outside option 20 lấy 60 (nhiều hơn 10 so với symmetric). Outside option tăng share tương ứng.

> 💡 **Trực giác**: Nếu bạn có thể bước đi khỏi bàn đàm phán và vẫn ổn, bạn mạnh hơn. Outside option = BATNA. Muốn tăng share trong bargaining → tăng BATNA trước khi vào bàn.

### 2.4 Walk-through 3: Asymmetric bargaining power (generalized Nash)

Generalized Nash: maximize (u₁ − d₁)^α × (u₂ − d₂)^(1−α), với α ∈ (0,1) = bargaining power của Player 1.

Ví dụ: α = 0.7, d=(0,0), F = {(x,100−x)}. Maximize x^0.7 × (100−x)^0.3.

FOC: 0.7(100−x) = 0.3x → 70 = x → x = 70. Player 1 lấy 70.

> ❓ **Câu hỏi tự nhiên**: α đến từ đâu? Trong thực tế, nó capture những yếu tố không đo được: ai nói trước, ai kiên nhẫn hơn, quy tắc xã hội về "fair". Rubinstein's model (mục 3) sẽ endogenize patience thành bargaining power cụ thể.

> ⚠ **Lỗi thường gặp**: Nash bargaining solution **không nói về quá trình**. Nó chỉ cho biết kết quả nếu đồng ý đạt được. Rubinstein model mới nói về quá trình đàm phán (ai offer, khi nào accept).

📝 **Tóm tắt mục 2**: Nash solution maximize Nash product (u₁−d₁)(u₂−d₂). Outside option tốt → share lớn hơn. Symmetric problem → chia đều. Đây là static solution concept.

---

## 3. Rubinstein Alternating Offers Model (1982)

> 💡 **Trực giác**: Thực tế đàm phán là **quá trình**: A đề xuất, B từ chối hoặc accept; nếu từ chối, B đề xuất ngược lại; cứ thế... Mỗi vòng mất thời gian → giá trị bị discount. Người kiên nhẫn hơn (discount ít hơn) mạnh hơn. Rubinstein (1982) formalize điều này.

### 3.1 Thiết lập

- Chia 1 đô (normalize). Thời gian = vô hạn rounds t = 0, 1, 2, ...
- Round chẵn: Player 1 offer (x₁, 1−x₁).
- Round lẻ: Player 2 offer (1−x₂, x₂).
- Discount factor: Player i có δᵢ ∈ (0,1). Nếu đồng ý ở round t → giá trị × δᵢᵗ.
- Nếu đồng ý ngay round 0: không discount.

**Đơn giản hóa**: cả hai player cùng δ. Tức δ₁ = δ₂ = δ.

### 3.2 Backward Induction — Tìm SPE

**Bước 1**: Tại round t chẵn, Player 1 propose x₁. Player 2 accept nếu (1−x₁) ≥ δ × (giá trị Player 2 nhận nếu reject và propose ở round t+1).

**Bước 2**: Nếu Player 2 reject và propose ở round t+1 (round lẻ), Player 2 đề xuất x₂. Player 1 accept nếu x₂ ≥ δ × x₁.

**Bước 3**: Symmetric structure → trong SPE, mỗi round proposer sẽ đề xuất đúng amount để responder indifferent.

Gọi s₁ = share của Player 1 khi offer được accept ở round chẵn.

Nếu Player 2 reject, game chuyển sang round lẻ. Player 2 sẽ offer 1−s₁ cho mình = s₁ cho Player 1. Nhưng discount 1 round → Player 1 nhận δs₁. Để Player 2 indifferent giữa accept (nhận 1−s₁) và reject+propose (nhận δ × (1−s₁)):

(1−s₁) = δ(1−s₁) — không đúng. Phải xét: Player 2 khi propose ở t+1 sẽ offer s₂ cho chính mình. Symmetry: s₂ = s₁ (vì game symmetric). Discount: nhận δs₁.

Để Player 2 indifferent: 1−s₁ = δ × s₁. (Player 2 nhận 1−s₁ nếu accept ngay, vs δ × share_khi_propose = δ × (1−s₁)... let me be precise.)

**Cách chuẩn**: Gọi V₁ = share Player 1 nhận trong SPE khi được propose (round chẵn). Player 1 offer x sao cho Player 2 indifferent: (1−x) = δ × V₂ = δ × (1−V₁). Và V₁ = x.

Khi Player 2 propose: offer y sao cho Player 1 indifferent: y = δ × V₁. Player 2 lấy 1−y.

V₂ = 1−y = 1−δV₁.

Từ Player 1's offer: V₁ = 1 − δV₂ = 1 − δ(1 − δV₁) = 1 − δ + δ²V₁.

V₁(1 − δ²) = 1 − δ → **V₁ = (1−δ)/(1−δ²) = 1/(1+δ)**.

V₂ = 1 − δ/(1+δ) = **δ/(1+δ)**.

### 3.3 Ví dụ số

**δ = 0.9**:
- Player 1 (proposer) nhận: 1/(1+0.9) = 1/1.9 ≈ **0.526** (52.6%).
- Player 2 nhận: 0.9/1.9 ≈ **0.474** (47.4%).
- Accept ngay ở round 0 → không mất gì. Split gần đều vì δ cao (cả hai patient).

**δ = 0.5**:
- Player 1: 1/1.5 ≈ **0.667** (66.7%).
- Player 2: 0.5/1.5 ≈ **0.333** (33.3%).
- First-mover advantage lớn hơn vì delay costly (δ thấp).

**δ = 0.99**:
- Player 1: 1/1.99 ≈ **0.503**.
- Player 2: 0.99/1.99 ≈ **0.497**.
- Gần bằng — extreme patience → converge to 50-50.

| δ | Player 1 | Player 2 | First-mover advantage |
|---|---|---|---|
| 0.5 | 66.7% | 33.3% | +16.7% |
| 0.7 | 58.8% | 41.2% | +8.8% |
| 0.9 | 52.6% | 47.4% | +2.6% |
| 0.99 | 50.3% | 49.7% | +0.3% |

> 💡 **Trực giác**: Khi δ → 1 (cả hai cực kỳ patient), split → 50-50. Khi δ → 0 (cực impatient), first-mover lấy hết. First-mover advantage = lợi ích của việc được đề xuất trước.

> ⚠ **Lỗi thường gặp**: "Player 2 bị thiệt vì reject thì mất thời gian." Không — trong SPE, Player 2 KHÔNG reject. Accept ngay ở round 0 với split (1/(1+δ), δ/(1+δ)). Reject là off-equilibrium path.

### 3.4 Asymmetric patience

Nếu Player 1 có δ₁, Player 2 có δ₂ (khác nhau):

V₁ = (1−δ₂)/(1−δ₁δ₂); V₂ = δ₂(1−δ₁)/(1−δ₁δ₂).

**Ví dụ**: δ₁ = 0.8 (Player 1 ít patient), δ₂ = 0.95 (Player 2 rất patient).
V₁ = (1−0.95)/(1−0.8×0.95) = 0.05/0.24 ≈ 0.208.
V₂ = 0.95×0.2/0.24 ≈ 0.792.

Player 2 patient → lấy nhiều hơn dù không phải proposer. **Patience = bargaining power.**

> ❓ **Ứng dụng chính trị**: Cuộc chiến thuế quan: quốc gia nào chịu đựng được đau kinh tế lâu hơn (δ cao) sẽ có ưu thế trong đàm phán. Ví dụ: US-China trade war — ai impatient (election cycle ngắn) sẽ nhượng bộ nhiều hơn.

📝 **Tóm tắt mục 3**: Rubinstein SPE: Player 1 lấy 1/(1+δ), Player 2 lấy δ/(1+δ). First-mover advantage lớn khi δ nhỏ. Patience là power trong bargaining.

---

## 4. Ultimatum Game

> 💡 **Trực giác**: Extreme case của Rubinstein — 1 round, 1 player propose, 1 accept or reject. Đơn giản nhất có thể. Nhưng thực nghiệm cho kết quả "bất hợp lý" nhất.

### 4.1 Cấu trúc và SPE

- Player 1 offer (x, 100−x). Player 2 accept hoặc reject.
- Nếu reject: cả hai nhận 0.
- **SPE**: Player 1 offer (99, 1). Player 2 accept vì 1 > 0. Chuẩn backward induction.

### 4.2 Thực nghiệm vs Lý thuyết

Güth, Schmittberger & Schwarze (1982) và hàng trăm replication:

| Offer từ Player 1 | SPE dự đoán | Thực tế |
|---|---|---|
| (99, 1) | Accept | **Thường bị reject** |
| (80, 20) | Accept | Thường accept |
| (60, 40) | Accept | Gần như luôn accept |
| (50, 50) | Accept | Luôn accept |

**Kết quả**: Người ta thường reject offer < 30% tổng. Và Player 1 biết điều này → offer trung bình ~40-45%.

### 4.3 Giải thích

1. **Fairness preferences (Fehr-Schmidt, Rabin)**: Người ta care về equity, không chỉ payoff tuyệt đối. Utility = payoff − β × max(payoff_other − payoff_self, 0) − α × max(payoff_self − payoff_other, 0).

2. **Evolutionary**: Trong EEA (environment of evolutionary adaptedness), trao đổi là repeated. Brain không có module cho one-shot anonymous games.

3. **Social norms**: "Fairness" là norm mạnh mẽ. Vi phạm → punishment, dù costly.

> ⚠ **Implication**: SPE prediction sai trong ultimatum game. Điều này không phá vỡ toàn bộ game theory — nó cho thấy **standard rationality assumption thiếu**. Mở rộng bằng behavioral models (fairness, reciprocity) giải thích được kết quả.

> ❓ **Câu hỏi tự nhiên**: Ultimatum game có relevant trong chính trị không? Có — coalition negotiations, peace treaties (defeated party offered humiliating terms), debt restructuring. Khi một bên bị offer "take it or leave it" với terms cực kỳ bất lợi, họ có thể reject dù tốn kém, vì dignity/fairness concerns.

---

## 5. Ứng dụng chính trị

**Ví dụ 1 — Labor negotiations**: Union vs management. BATNA của union = strike. BATNA của management = lockout + replacement workers. Rubinstein: ai patience hơn (financial reserves, strike fund) thắng nhiều hơn.

**Ví dụ 2 — Treaty negotiations**: 2 nước tranh chấp lãnh thổ. Disagrement point = không đồng ý = status quo hoặc war. Outside option tốt (ally, strong military) → bargaining position tốt hơn.

**Ví dụ 3 — Coalition formation**: 3 đảng trong parliament. Party A+B = majority. Party A+C = majority. B và C cạnh tranh → Nash bargaining dự đoán B và C bị chia ít hơn (vì A có high BATNA). Xem thêm: [T1-L01 Coalitions](../../01-GameTheoryFoundations/lesson-01-normal-form/README.md).

**Ví dụ 4 — Debt renegotiation**: Greece-EU (2015). Nash bargaining: disagreement = default (cả hai mất). Surplus = debt relief enables repayment. Câu hỏi là BATNA của mỗi bên — Grexit vs EU creditor loss.

---

## 6. Bài tập thực hành

**Bài 1**: Chia 200 đô. d₁ = 30, d₂ = 50. Tính Nash bargaining solution. Player nào có lợi hơn từ outside option?

**Bài 2**: Rubinstein với δ = 0.8: (a) tính split; (b) nếu thay δ₁ = 0.6, δ₂ = 0.9 thì sao?

**Bài 3**: Ultimatum game. Fehr-Schmidt model: Player 2 có β = 0.5 (disutility từ bất bình đẳng bất lợi). Offer nào minimum mà Player 2 accept?

---

## 7. Lời giải chi tiết

### Bài 1

Maximize (u₁ − 30)(u₂ − 50) với u₁ + u₂ = 200, u₁ ≥ 30, u₂ ≥ 50.

Đặt u₁ = x, u₂ = 200 − x. Maximize (x−30)(200−x−50) = (x−30)(150−x).

FOC: (150−x) − (x−30) = 0 → 180 − 2x = 0 → x = 90.

Nash solution: **u₁ = 90, u₂ = 110**.

So sánh với chia đều từ d: surplus = 200 − 80 = 120 chia đều cho mỗi người + d riêng:
u₁ = 30 + 60 = 90, u₂ = 50 + 60 = 110. Khớp! (Symmetric khi tính từ surplus.)

Player 2 có outside option 50 > 30 → nhận 110 > 90. Lợi hơn tuyệt đối nhưng cả hai chia đều surplus = 60 mỗi người.

### Bài 2

(a) δ = 0.8: V₁ = 1/(1+0.8) ≈ **0.556**, V₂ ≈ **0.444**.

(b) δ₁ = 0.6, δ₂ = 0.9:
V₁ = (1−δ₂)/(1−δ₁δ₂) = (1−0.9)/(1−0.54) = 0.1/0.46 ≈ **0.217**.
V₂ = δ₂(1−δ₁)/(1−δ₁δ₂) = 0.9×0.4/0.46 = 0.36/0.46 ≈ **0.783**.

Player 1 ít patient (δ₁=0.6) → chỉ nhận 21.7% dù là proposer. Patient Player 2 thắng lớn.

### Bài 3

Player 2's utility khi accept offer (x, 100−x): U₂ = (100−x) − 0.5 × max(x − (100−x), 0).

Nếu x > 50 (Player 1 lấy nhiều hơn): U₂ = (100−x) − 0.5(2x−100) = (100−x) − x + 50 = 150 − 2x.

Player 2 accept nếu U₂ ≥ 0: 150 − 2x ≥ 0 → x ≤ **75**.

Vậy Player 1 offer x = 75 là tối ưu (lấy 75, Player 2 nhận 25). Player 2 có U₂ = 150−150 = 0 → indifferent.

**Player 2 reject nếu x > 75** (Player 1 lấy > 75%). Note: SPE thuần túy (không fairness) cho x = 99.

---

## Bài tiếp theo

**[L03: Signaling & Screening](../lesson-03-signaling-screening/README.md)**: Khi một bên biết nhiều hơn (asymmetric information) — Spence's education signaling, insurance screening, cheap talk.

---

*[visualization.html](./visualization.html) · Tầng 3 — PoliticalScience*
`;
