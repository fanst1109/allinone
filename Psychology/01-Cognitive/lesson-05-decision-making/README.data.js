// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: Psychology/01-Cognitive/lesson-05-decision-making/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 05: Decision Making

> **Tầng 1 — Cognitive Psychology · Psychology**

## Mục tiêu học tập

1. Phân biệt System 1 (nhanh, tự động) và System 2 (chậm, cân nhắc) và khi nào mỗi hệ thống lên tiếng.
2. Mô tả Expected Utility Theory và 3 cách Prospect Theory vi phạm nó.
3. Giải thích loss aversion (λ ≈ 2) với số liệu thực nghiệm và hàm value S-shape.
4. Hiểu probability weighting: tại sao người mua vé số lẫn bảo hiểm cùng lúc.

## Kiến thức tiền đề

- [Lesson 04: Cognitive Biases](../lesson-04-cognitive-biases/README.md) — framing, heuristics.
- Xác suất cơ bản, khái niệm expected value.
- Bridge sang Economics: [\`Economics/Tier4-Applied\`](../../Economics/Tier4-Applied/) (behavioral economics).

---

## 1. System 1 và System 2

> 💡 **Trực giác**: Khi lái xe quen thuộc — lái tự động, nghĩ chuyện khác (System 1). Khi lần đầu học lái xe — cần tập trung từng bước, không thể làm gì khác (System 2). Quyết định quan trọng đòi hỏi System 2, nhưng não người thường "lazy" và để System 1 xử lý — với hậu quả đôi khi không tốt.

Kahneman (2011, *Thinking, Fast and Slow*) đặt tên cho 2 systems — thực ra là metaphor cho 2 chế độ xử lý đã được nghiên cứu từ lâu (Stanovich & West, 2000):

| | System 1 | System 2 |
|---|---|---|
| **Tốc độ** | Nhanh (~100ms) | Chậm (~500ms+) |
| **Effort** | Tự động, không cần effort | Cần conscious effort |
| **Capacity** | Không giới hạn | Giới hạn (single thread) |
| **Errors** | Systematic (biased) | Ít bias hơn nhưng chậm |
| **Khi nào dùng** | Kỹ năng quen, ứng phó khẩn cấp | Toán học, logic, ra quyết định mới |
| **Ví dụ** | Nhận mặt bạn bè; "2+2=?"; tránh xe đột ngột | "17×24=?"; đọc hợp đồng lần đầu; học nhảy |

**Bat-and-ball problem** (Frederick, 2005): "Bat và ball giá cộng lại $1.10. Bat đắt hơn ball $1.00. Ball giá bao nhiêu?"

- System 1 answer: $0.10 (sai).
- System 2 check: nếu ball = $0.10, bat = $1.10, tổng = $1.20 ≠ $1.10. Đúng: ball = $0.05, bat = $1.05.
- **53% sinh viên MIT, Princeton, Harvard đưa ra đáp án System 1 sai** (Frederick, 2005).

---

## 2. Expected Utility Theory (EUT)

**Định nghĩa**: Nhà lý thuyết Bernoulli (1738) và von Neumann-Morgenstern (1944) đề xuất: người ra quyết định hợp lý (rational agent) maximize expected utility:

\`\`\`
E[U] = Σ p_i × U(x_i)
\`\`\`

Trong đó U(x) là hàm utility concave (diminishing marginal utility): U(x) = √x hoặc U(x) = ln(x).

**Ví dụ**: U(x) = √x.
- Chọn A: 100% nhận $100 → U = √100 = 10.
- Chọn B: 50% nhận $400, 50% nhận $0 → E[U] = 0.5×√400 + 0.5×√0 = 0.5×20 = 10.

Expected utility bằng nhau → lý thuyết predict indifferent. Thực tế: hầu hết người chọn A (certain $100). Điều này nhất quán với EUT vì U concave (risk-averse).

**Các axioms của EUT** (von Neumann-Morgenstern):
1. Completeness: luôn có preference giữa 2 lựa chọn.
2. Transitivity: nếu A>B và B>C, thì A>C.
3. Independence: thêm cùng gamble vào 2 option không đổi preference.
4. Continuity: luôn có probability p để [p×A + (1-p)×C] ~ B.

**Vấn đề**: Thực nghiệm liên tục vi phạm independence và continuity axioms (Allais Paradox, 1953).

---

## 3. Prospect Theory (Kahneman & Tversky, 1979)

> 💡 **Trực giác**: Mất $100 đau hơn vui khi được $100. Và thêm $100 vào $1000 vui ít hơn thêm $100 vào $10 — ngưỡng cảm nhận giảm dần. Prospect Theory mô hình hóa 2 quan sát này thành lý thuyết.

Kahneman & Tversky (1979) đề xuất 3 sai lệch cơ bản so với EUT:

### 3.1 Reference-Dependence

Người không đánh giá absolute wealth, mà đánh giá **gains và losses so với reference point**.

**Ví dụ số (Kahneman & Tversky, 1979)**:
- Nhóm A (điểm xuất phát: có $1,000): chọn giữa chắc chắn được $500 thêm (total $1,500) vs 50% được $1,000 thêm, 50% không được gì. Expected value bằng nhau ($1,500). **84% chọn chắc chắn**.
- Nhóm B (điểm xuất phát: có $2,000): chọn giữa chắc chắn mất $500 (total $1,500) vs 50% mất $1,000, 50% không mất. Cùng outcomes, khác framing. **69% chọn gamble** để tránh mất chắc chắn.
- Kết quả cuối như nhau ($1,500 certain vs gamble) nhưng majority choice đảo ngược.

### 3.2 Loss Aversion — λ ≈ 2

**Định nghĩa**: Pain of losing $X ≈ 2× pleasure of gaining $X. Hệ số loss aversion λ ≈ 2.

**Walk-through số đo λ**:

Tversky & Kahneman (1991) dùng mixed gamble: "Bet: 50% thắng $X, 50% thua $Y."

**Câu hỏi**: Với Y = $100, cần X tối thiểu bao nhiêu để gamble này attractive?

**Kết quả đo (Tversky & Kahneman, 1991)**:
- Median X: $201 (tức cần thắng ~$200 để chấp nhận rủi ro thua $100).
- λ = X/Y = 200/100 = **2.0**

**4 nghiên cứu đo λ**:

| Nghiên cứu | Phương pháp | λ đo được |
|---|---|---|
| Tversky & Kahneman (1991) | Mixed gambles | 2.0 |
| Novemsky & Kahneman (2005) | Consumer goods trade | 1.5–2.5 |
| Abdellaoui et al. (2007) | Revealed preference | 1.8–2.4 |
| Gächter et al. (2022) — 30,000 người | Large-scale survey | 1.31–2.11 tùy culture |

**Endowment effect (Knetsch, 1989)**: 
- Nhóm A được cho cái cốc (mug). Hỏi: bán với giá tối thiểu bao nhiêu?
- Nhóm B không có cốc. Hỏi: mua với giá tối đa bao nhiêu?
- Kết quả: Median WTA (willingness to accept) = $7.12; WTP (willingness to pay) = $3.50.
- Ratio WTA/WTP = **2.03** — gần λ = 2.

### 3.3 Diminishing Sensitivity

**Hàm value của Prospect Theory**:
- Gains: v(x) = x^α với α ≈ 0.88 (concave — risk-averse)
- Losses: v(x) = −λ(−x)^β với β ≈ 0.88 (convex — risk-seeking)
- λ ≈ 2.25 (loss aversion coefficient từ Tversky & Kahneman 1992)

**Walk-through số**:
- Gain $100 vs gain $200: utility increase = 100^0.88 ≈ 76 → 200^0.88 ≈ 145. Increase = 69 utility units.
- Gain $1000 vs gain $1100: utility = 1000^0.88 ≈ 658 → 1100^0.88 ≈ 718. Increase = 60 units.
- Thêm $100 vào $100 → +69 utils. Thêm $100 vào $1000 → +60 utils. Diminishing sensitivity.

**Gamble asymmetry**:
- Risk-averse for gains: prefer $400 certain > 50% get $1,000 (EV = $500 > $400, nhưng phần lớn chọn $400).
- Risk-seeking for losses: prefer gamble 50% lose $1,000 > lose $400 certain (EV = -$500 < -$400, nhưng phần lớn chọn gamble để avoid certain loss).

---

## 4. Probability Weighting

**Vấn đề với EUT**: Người không treat xác suất tuyến tính — over-weight small probabilities, under-weight large probabilities.

**Hàm probability weighting (Tversky & Kahneman, 1992)**:

\`\`\`
w(p) = p^γ / [p^γ + (1−p)^γ]^(1/γ)     với γ ≈ 0.69
\`\`\`

**Walk-through tính w(p) với γ = 0.69**:
- w(0.01) = 0.01^0.69 / [0.01^0.69 + 0.99^0.69]^(1/0.69) ≈ **0.056** (thực tế ~5.6% thay vì 1%)
- w(0.10) ≈ **0.181** (thay vì 10%)
- w(0.50) ≈ **0.456** (thay vì 50%)
- w(0.90) ≈ **0.708** (thay vì 90%)
- w(0.99) ≈ **0.945** (thay vì 99%)

**Hàm có dạng chữ "S"**: Overweight small (1% → 5.6%), underweight large (90% → 70.8%).

**Hệ quả giải thích paradox hành vi**:
1. **Mua vé số**: P(win jackpot) rất nhỏ (~1/14,000,000) → overweight mạnh → attractive.
2. **Mua bảo hiểm**: P(catastrophic loss) nhỏ (~1–5%) → overweight → willing to pay premium.
3. **Allais Paradox** (1953): vi phạm independence axiom của EUT, giải thích được bằng probability weighting + loss aversion.

---

## 5. Allais Paradox (1953)

Maurice Allais (1953) đưa ra counterexample nổi tiếng cho EUT:

**Problem 1**: Chọn giữa:
- 1A: 100% nhận $1,000,000
- 1B: 89% nhận $1,000,000 + 10% nhận $5,000,000 + 1% nhận $0

**Problem 2**: Chọn giữa:
- 2A: 11% nhận $1,000,000 + 89% nhận $0
- 2B: 10% nhận $5,000,000 + 90% nhận $0

**Kết quả điển hình**: Đa số chọn 1A trong Problem 1 và 2B trong Problem 2.

**Vi phạm EUT**: Nếu 1A > 1B (chọn 1A), theo independence axiom (subtract 89% chance $1M từ cả 2):
- 1A − 89% → 11% get $1M + 89% get $0 = 2A
- 1B − 89% → 10% get $5M + 90% get $0 = 2B
→ Theo independence: phải chọn 2A. Nhưng đa số chọn 2B → vi phạm.

**Giải thích bằng Prospect Theory**: 
- Problem 1: moving từ 99% → 100% certainty → certainty effect (over-weight near-certain) → 1A attractive.
- Problem 2: 11% vs 10% là nhỏ, over-weight nhỏ hơn, $5M > $1M win được do high payoff.

---

## 6. Replication Notes

- **Loss aversion (λ ≈ 2)**: Gächter et al. (2022, 30,000 người, 19 quốc gia) confirm λ trong khoảng 1.3–2.1 tùy cultural context. Strongest ở châu Á, yếu hơn ở Mỹ và Tây Âu.
- **Probability weighting**: Robust qua nhiều paradigm. Parameterization (γ) hơi khác nhau tùy study.
- **Allais Paradox**: Replicates extremely well — 70–80% violation của independence axiom.
- **System 1 vs 2 framework**: Kahneman thừa nhận đây là metaphor, không phải 2 brain structures độc lập. Dual-process theory có nhiều version khác nhau; "System 1" và "System 2" là labels hữu ích nhưng không literal.
- **Endowment effect**: Meta-analysis Morewedge & Giblin (2015) — effect size d ≈ 0.72, robust nhưng nhỏ hơn trong market contexts (Plott & Zeiler, 2005 — effect giảm khi có training và feedback).

---

## 7. Tóm tắt

> 📝 **Các điểm chốt**:
> - System 1 (fast, automatic) vs System 2 (slow, deliberate). Bat-and-ball: 53% MIT students lỗi S1.
> - EUT: maximize E[U], risk-averse với U concave. Thực tế vi phạm.
> - Prospect Theory: reference-dependent (reference point → gain/loss), loss aversion (λ ≈ 2), diminishing sensitivity (S-shape value function).
> - Endowment effect: WTA/WTP ≈ 2 (Knetsch 1989).
> - Probability weighting: over-weight small prob (lottery), under-weight large prob. γ ≈ 0.69.
> - Allais paradox: vi phạm independence axiom EUT, giải thích được bằng PT.

---

## Bài tập

1. Bat-and-ball problem: "Bat và ball cộng lại $1.10, bat đắt hơn ball $1.00." Câu trả lời System 1 là gì? Tính đúng bằng algebra. Giải thích tại sao System 1 fail.

2. Loss aversion: bạn được mời tham gia bet "50% thắng $X, 50% thua $50." Với λ = 2 (Tversky & Kahneman, 1991), X tối thiểu bao nhiêu để bạn accept? Giải thích.

3. Probability weighting: dùng công thức w(p) = p^0.69 / [p^0.69 + (1−p)^0.69]^(1/0.69), tính w(0.01), w(0.05), w(0.50). Giải thích tại sao người đồng thời mua vé số (p nhỏ, payoff lớn) và bảo hiểm (p nhỏ, loss lớn).

4. Prospect Theory value: v(x) = x^0.88 cho gain, v(x) = −2.25 × (−x)^0.88 cho loss. Tính value của: (a) gain $100, (b) loss $100, (c) gain $1000, (d) loss $1000. Tại sao (d) không phải 10× của (b)?

---

## Lời giải chi tiết

### Bài 1

**System 1 answer**: $0.10 — vì $1.10 − $1.00 = $0.10 → nhanh, heuristic subtraction.

**Tính đúng bằng algebra**:
- Gọi ball = b, bat = b + 1.00.
- Tổng: b + (b + 1.00) = 1.10 → 2b = 0.10 → b = **$0.05**.
- Bat = $1.05. Verify: $1.05 + $0.05 = $1.10 ✓; $1.05 − $0.05 = $1.00 ✓.

**Tại sao System 1 fail**: Câu hỏi chứa 2 numbers ($1.10, $1.00) → System 1 tìm phép tính đơn giản nhất: $1.10 − $1.00 = $0.10 → assign cho ball. Không check constraints. System 2 sẽ: đặt ẩn, viết 2 equations, solve — nhưng System 1 "overrides" với pattern matching nhanh hơn.

### Bài 2

**Với λ = 2**: Pain(thua $50) = 2 × Pleasure(thắng $X) để indifferent.

Theo prospect theory, ở điểm indifference:
- w(0.5) × v(X) = w(0.5) × v(50) × λ
- v(X) = λ × v(50) → X = λ × 50 = 2 × 50 = **$100**

**Giải thích**: Thua $50 gây đau như thắng $100. Để bet hấp dẫn, cần X > $100. Điều này giải thích tại sao người thường từ chối gamble fair coin với mức cược không cao — loss quá painful so với equivalent gain.

### Bài 3

**Tính w(p) với γ = 0.69**:

**w(0.01)**:
- Numerator: 0.01^0.69 = e^(0.69 × ln 0.01) = e^(0.69 × (−4.605)) = e^(−3.178) ≈ 0.0416
- 1−0.01 = 0.99; 0.99^0.69 ≈ e^(0.69 × (−0.01005)) ≈ e^(−0.00693) ≈ 0.9931
- Denominator: (0.0416 + 0.9931)^(1/0.69) = (1.0347)^1.449 ≈ 1.051
- w(0.01) = 0.0416/1.051 ≈ **0.0396 ≈ 4%** (thực tế dùng ~4%, không 1%)

**w(0.05)** ≈ **0.128 ≈ 13%** (theo calculation tương tự)

**w(0.50)**:
- 0.5^0.69 ≈ 0.623; denominator = (0.623+0.623)^1.449 = 1.246^1.449 ≈ 1.367
- w(0.5) = 0.623/1.367 ≈ **0.456 ≈ 46%**

**Giải thích vé số và bảo hiểm**:
- Vé số: P(jackpot) = 1/14M ≈ 7×10⁻⁸ → overweight rất mạnh → expected utility với weighting > ticket price.
- Bảo hiểm: P(house fire) ≈ 0.3%/năm → overweight → perceived risk ~1.2% → worth paying premium.
- Cùng cơ chế (overweight small p) giải thích **cả 2 hành vi** — một mâu thuẫn rõ ràng với EUT (risk-seeking ≠ risk-averse) nhưng nhất quán với Prospect Theory.

### Bài 4

**Hàm value**:

**(a) gain $100**: v(100) = 100^0.88 = e^(0.88 × ln 100) = e^(0.88 × 4.605) = e^(4.053) ≈ **57.5**

**(b) loss $100**: v(−100) = −2.25 × (100)^0.88 = −2.25 × 57.5 ≈ **−129.4**

**(c) gain $1000**: v(1000) = 1000^0.88 = e^(0.88 × 6.908) = e^(6.079) ≈ **436**

**(d) loss $1000**: v(−1000) = −2.25 × 436 ≈ **−981**

**Tại sao (d) ≠ 10 × (b)**:
- Nếu linear: loss $1000 = 10 × loss $100 → v = 10 × (−129.4) = −1,294.
- Thực tế (d) = −981, nhỏ hơn 1,294 về trị tuyệt đối.
- Nguyên nhân: diminishing sensitivity — hàm (−x)^0.88 có exponent < 1 → sublinear. Tăng loss 10x chỉ tăng pain ~7.6x (= 10^0.88). Điều này có nghĩa đau khổ thêm khi đánh mất $900→$1000 nhỏ hơn đau khổ khi mất $0→$100 đầu tiên.

---

## Bài tiếp theo

[T2-L01: Social Influence](../../02-Social-Developmental/lesson-01-social-influence/README.md) — Asch conformity, Milgram obedience, bystander effect.

## Tham khảo

- Kahneman, D., & Tversky, A. (1979). Prospect theory: an analysis of decision under risk. *Econometrica*, 47(2), 263–291.
- Tversky, A., & Kahneman, D. (1991). Loss aversion in riskless choice. *Quarterly Journal of Economics*, 106(4), 1039–1061.
- Tversky, A., & Kahneman, D. (1992). Advances in prospect theory. *Journal of Risk and Uncertainty*, 5(4), 297–323.
- Kahneman, D. (2011). *Thinking, Fast and Slow*. Farrar, Straus and Giroux.
- Frederick, S. (2005). Cognitive reflection and decision making. *J. Economic Perspectives*, 19(4), 25–42.
- Knetsch, J.L. (1989). The endowment effect and evidence of nonreversible indifference curves. *American Economic Review*, 79(5), 1277–1284.
- Gächter, S. et al. (2022). Individual-level loss aversion in riskless and risky choices. *Theory and Decision*, 92(3), 599–624.
- Allais, M. (1953). Le comportement de l'homme rationnel devant le risque. *Econometrica*, 21(4), 503–546.
`;
