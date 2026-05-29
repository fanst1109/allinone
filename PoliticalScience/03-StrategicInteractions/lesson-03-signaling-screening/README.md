# Lesson 03: Signaling & Screening

> **Tầng 3 — Strategic Interactions · PoliticalScience**

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Phân biệt **signaling** (sender chủ động) vs **screening** (receiver thiết kế menu).
- Phân tích **Spence's job-market signaling** (1973): điều kiện tồn tại separating vs pooling equilibrium.
- Tính khoảng education e* để separating equilibrium xảy ra.
- Giải thích **Akerlof's market for lemons** (1970): adverse selection dẫn đến market collapse.
- Mô tả **Rothschild-Stiglitz screening** (1976): menu design để elicit truthful self-selection.
- Phân tích **cheap talk** (Crawford-Sobel 1982): khi nào communication credible.

## Kiến thức tiền đề

- **T1-L01**: Normal form games.
- **T1-L02**: Bayesian games (private information).
- **L02** (bài này): Bargaining — liên quan đến asymmetric info trong đàm phán.

---

## 1. Asymmetric Information — Tại sao quan trọng?

> 💡 **Trực giác**: Bạn muốn mua xe cũ. Người bán biết xe có lỗi không, bạn không biết. Nếu bạn không thể phân biệt xe tốt và xe xấu, bạn sẽ offer giá trung bình — nhưng người bán xe tốt không chấp nhận → chỉ còn xe xấu trên thị trường → bạn hạ giá → xe tốt hơn rút lui → ... → market collapse.

**Asymmetric information** = một bên biết điều gì đó bên kia không biết. Tạo ra 2 vấn đề:

1. **Adverse selection**: trước giao dịch — loại "xấu" ở lại, loại "tốt" rút lui (Akerlof 1970).
2. **Moral hazard**: sau giao dịch — người được bảo hiểm ít cẩn thận hơn (covered in future courses).

**Giải pháp cơ bản**:
- **Signaling**: bên có thông tin tốt gửi signal đắt tiền để chứng minh chất lượng.
- **Screening**: bên thiếu thông tin thiết kế menu để bên kia tự reveal.

---

## 2. Spence's Job-Market Signaling (1973)

> 💡 **Trực giác**: Công ty không biết năng suất thật của ứng viên. Nhưng họ quan sát được bằng cấp. Câu hỏi: giáo dục có thực sự làm bạn năng suất hơn (human capital view) hay chỉ là costly signal để phân biệt (signaling view)? Spence: **dù giáo dục vô dụng hoàn toàn**, nó vẫn có thể tồn tại như signal nếu chi phí giáo dục khác nhau giữa types.

### 2.1 Setup

- 2 loại worker: **High (H)** và **Low (L)**.
- Firm không biết type, quan sát education level e.
- Productivity: y_H = 100k (năm), y_L = 50k.
- Chi phí education per year: c_H = 5000 (high type) < c_L = 10000 (low type).
- Tại sao c_H < c_L? Low-type find school harder: cùng số năm học → high-type tốn ít effort, ít stress.

### 2.2 Separating Equilibrium

**Định nghĩa**: Separating equilibrium là khi 2 types chọn education levels khác nhau → firm có thể phân biệt.

**Điều kiện**: e* = education threshold. High-type chọn e ≥ e*. Low-type chọn e < e*.

Wage schedule: w(e) = 100k nếu e ≥ e*, w(e) = 50k nếu e < e*.

**Incentive compatibility (IC)**:
- High-type prefer e* over 0: 100k − c_H × e* ≥ 50k → e* ≤ 50k/c_H = 50,000/5,000 = **10 năm**.
- Low-type prefer 0 over e*: 50k ≥ 100k − c_L × e* → c_L × e* ≥ 50k → e* ≥ 50k/c_L = 50,000/10,000 = **5 năm**.

**Separating equilibrium tồn tại** khi e* ∈ [5, 10] năm.

> 💡 **Walk-through với số**:

| e* | High-type net | Low-type nếu pool | Low-type prefer 0? |
|----|--------------|-------------------|-------------------|
| 5 | 100k − 25k = 75k | 100k − 50k = 50k | 50k = 50k — indifferent |
| 7 | 100k − 35k = 65k | 100k − 70k = 30k < 50k | YES — không imitate |
| 10 | 100k − 50k = 50k | 100k − 100k = 0k < 50k | YES |
| 11 | 100k − 55k = 45k < 50k | — | High-type không muốn signal |

Vùng separating: e* ∈ (5, 10]. At e* = 5: low-type indifferent → semi-separating.

**Ví dụ 1 — Kết quả**: e* = 7 năm. High-type lấy bằng tiến sĩ 7 năm, earn 100k. Low-type không học, earn 50k. Firm happy phân biệt được. Xã hội: 7 năm học có thể là waste if giáo dục không tăng năng suất.

### 2.3 Pooling Equilibrium

**Định nghĩa**: Cả hai types chọn cùng e → firm không phân biệt được → trả average wage.

Average wage = p × 100k + (1-p) × 50k, với p = fraction of High-type.

Nếu p = 0.4: w_avg = 40k + 30k = 70k.

**Khi nào pooling sustainable?** Nếu High-type không thể lợi gì từ việc tăng e cao hơn. Dùng **Cho-Kreps intuitive criterion** (refinement) để eliminate "unreasonable" pooling equilibria — không cover deep ở đây.

### 2.4 Ví dụ 2 — Chính trị: Costly Commitment

Candidate muốn signal rằng mình sẽ "tough on crime" (dù mình moderate). Chi phí signal = cam kết policy cứng nhắc (không thể flip-flop sau khi đắc cử nếu không mất credibility).

Low-type (moderate) imitate: costly because they'd have to actually implement harsh policies.
High-type (genuinely tough): signal cheap because consistent with preferences.

→ Separating: chỉ truly tough candidate cam kết rõ ràng.

> ⚠ **Lỗi thường gặp**: "Giáo dục chắc chắn tăng productivity vì employers trả cao cho người có bằng." Không đúng — Spence cho thấy ngay cả trong thế giới giáo dục hoàn toàn vô dụng, employers vẫn trả cao vì bằng = signal, không phải vì human capital. Cả hai giải thích nhất quán với dữ liệu.

📝 **Tóm tắt mục 2**: Separating equilibrium khi 50k/c_L ≤ e* ≤ 50k/c_H. Giáo dục là signal (costly action) — giá trị từ khả năng phân biệt types, không nhất thiết từ nội dung học.

---

## 3. Akerlof's Market for Lemons (1970)

> 💡 **Trực giác**: "Lemons" = xe xấu trong slang Mỹ. Seller biết xe mình có lỗi gì không, buyer không biết. Kết quả: market collapse từng bước.

### 3.1 Model

- Mỗi xe có quality q ∼ Uniform[0, 1] (chỉ seller biết).
- Buyer value: v_B(q) = 1.5q (buyer value cao hơn seller vì buyer có thể dùng hoặc resell).
- Seller value: v_S(q) = q.
- Gains from trade: (1.5 − 1)q = 0.5q > 0 cho mọi q > 0. → Tất cả xe nên được bán nếu không có info problem.

**Với asymmetric info**:
- Buyer offer giá p. Seller sell nếu q ≤ p (lợi hơn giữ).
- Average quality của xe bán khi buyer offer p: E[q | q ≤ p] = p/2.
- Buyer expected value: 1.5 × (p/2) = 0.75p.
- Buyer willing to pay: 0.75p. Nhưng để seller bán, cần p ≥ q → buyer phải offer p mà buyer value ≥ p: 0.75p ≥ p → 0.75 ≥ 1. **Mâu thuẫn**.

→ **Không có giá nào mà buyer và seller đều đồng ý = market collapse.**

**Intuition từng bước**:
1. Buyer offer p = 50 (middle). Seller accept nếu q ≤ 50.
2. Average q trong xe bán = 25. Buyer value = 37.5 < 50. → Buyer hạ offer.
3. Buyer offer p = 37.5. Seller accept nếu q ≤ 37.5.
4. Average q = 18.75. Buyer value = 28.1 < 37.5. → Hạ tiếp.
5. ... converge to p = 0.

### 3.2 Ví dụ 3 — Insurance Market

Người mua bảo hiểm biết sức khỏe của mình, công ty bảo hiểm không. Nếu một mức phí:

- Healthy: "tôi không cần — quá đắt" → rút lui.
- Sick: "tôi cần — worth it" → ở lại.

→ Pool chỉ còn người bệnh → chi phí tăng → phí tăng → người healthier hơn rút lui → ... → adverse selection spiral.

### 3.3 Giải pháp Akerlof

1. **Warranties/Guarantees**: costly signal từ seller xe tốt.
2. **Certification / Carfax**: third-party verify quality.
3. **Reputation**: repeat-interaction sellers care about reputation.
4. **Government regulation**: mandatory disclosure.

> 🔁 **Tự kiểm tra**: Tại sao "adverse selection spiral" không xảy ra cho tất cả thị trường? (Có gì ngăn chặn?)

<details>
<summary>Gợi ý</summary>
Nhiều thị trường có: (1) reputation mechanism cho sellers; (2) warranties / guarantees; (3) intermediaries (dealers, inspectors); (4) government certification (FDA, car inspections). Lemons problem nghiêm trọng nhất khi: market mới, anonymous, one-shot transactions, khó verify quality (health, software, complex services).
</details>

---

## 4. Rothschild-Stiglitz Screening (1976)

> 💡 **Trực giác**: Insurer không biết risk type của bạn. Nhưng thay vì hỏi trực tiếp (không credible), insurer thiết kế menu contracts để mỗi type **tự chọn** contract phù hợp — self-selection. Đây là "screening": receiver thiết kế, sender tự reveal.

### 4.1 Setup

- 2 types: **High-risk (H)** và **Low-risk (L)**.
- H: P(accident) = 0.5. L: P(accident) = 0.1.
- Accident cost = 100 (wealth loss).
- Menu: (premium, coverage) = (t, c). Full coverage = c = 100.

**IC constraints**:
- High-risk prefer H's contract over L's: không muốn imitate L's partial coverage.
- Low-risk prefer L's contract over H's: không muốn trả premium cao của H.
- **Participation (IR) constraints**: mỗi type ít nhất bằng no-insurance.

### 4.2 Separating Equilibrium (Ví dụ 4)

**H contract**: full coverage at actuarially fair premium = 0.5 × 100 = **50**. H-type happy.

**L contract**: partial coverage c_L < 100 at low premium t_L = 0.1 × c_L.

Chọn c_L để H-type không muốn imitate: H-type indifferent between (50, 100) and (t_L, c_L):

Với quadratic utility: U_H(full) = 0.5×(wealth − 50) + 0.5×(wealth − 50) = wealth − 50 (full coverage means same wealth regardless of accident, minus premium).

Xét expected utility (risk averse, sqrt utility):
- H at H-contract: 0.5×√(W−50−0) + 0.5×√(W−50−0+100−100) = ... (simplification: binomial with payoffs W−50 always)
- Tức H at full coverage: certain W−50. U = √(W−50).

IC_H: √(W−50) ≥ 0.5×√(W−t_L) + 0.5×√(W−100+c_L−t_L).

Với t_L = 0.1×c_L và W = 200: √150 ≥ 0.5×√(200−0.1c_L) + 0.5×√(100−0.9c_L).

Xấp xỉ khi c_L nhỏ: partial coverage. Numerically, separation possible at c_L ≈ 60 (low-risk buys partial coverage).

> ⚠ **Key result (Rothschild-Stiglitz theorem)**: Trong competitive market với adverse selection:
> - Pooling equilibrium **không thể** tồn tại (always dominated by cream-skimming entry).
> - Separating equilibrium có thể tồn tại nhưng **low-risk bị undercovered** (distortion to prevent H from mimicking).
> - Nếu fraction of H-type quá cao, separating equilibrium also fails → market unravels.

---

## 5. Cheap Talk (Crawford-Sobel 1982)

> 💡 **Trực giác**: Advisor (S) biết state θ ∈ [0,1], Decision-maker (D) không biết. S nói "θ = 0.7" — tại sao D tin? Nếu nói không tốn gì (cheap talk), S có thể nói bất cứ điều gì. Khi nào communication có thể credible?

### 5.1 Model Cơ Bản

- State θ ∼ Uniform[0, 1].
- S muốn outcome y_S = θ + b (bias b > 0 — S muốn D hành động "hơi nhiều" so với optimal).
- D muốn y_D = θ.
- D choose action a sau khi nghe message m của S.

### 5.2 Babbling Equilibrium

Luôn tồn tại: S gửi message ngẫu nhiên, D ignore và choose a = E[θ] = 0.5.

Không có information transmission.

### 5.3 Partial Revelation

Khi b nhỏ, có **partition equilibrium** với K intervals: [0, θ₁), [θ₁, θ₂), ..., [θ_{K-1}, 1].

S nói "I'm in interval k" khi θ ∈ interval k. D chọn midpoint của interval.

**Số intervals K** phụ thuộc b: K ≈ 1/(2b) heuristically. Bias nhỏ → nhiều intervals → nhiều thông tin.

**Ví dụ**: b = 0.1. K = 2 intervals possible:
- Interval 1: [0, 0.4), S nói "Low".
- Interval 2: [0.4, 1], S nói "High".
- D: nếu "Low" → a = 0.2; nếu "High" → a = 0.7.

Tại boundary θ = 0.4: S indifferent giữa "Low" (D chọn 0.2 → S loss = (0.2 − 0.5)² = 0.09) và "High" (D chọn 0.7 → S loss = (0.7 − 0.5)² = 0.04... với b = 0.1, S target = 0.5, D target = 0.4... cần xác minh consistency của θ₁).

**Hạn chế cheap talk**: dù K > 1, thông tin vẫn coarse. Giải pháp: credible commitment (costly signals, verifiable statements).

### 5.4 Ví dụ 4 — Chính trị

**Intelligence community → President**: IC (S) biết threat level θ. Bias: IC muốn President act (budget, intervention). President muốn act only if threat high.

- Nếu bias lớn: IC luôn nói "threat high" → President ignore → babbling.
- Nếu bias nhỏ: some credibility. President act on "High" but not "Low."

**Expert testimony**: Think tanks, lobbyists với known bias → credibility discount. Legislators biết bias → adjust interpretation accordingly.

---

## 6. Bài tập thực hành

**Bài 1**: c_H = 8000, c_L = 16000, y_H = 120k, y_L = 60k. Tính khoảng e* cho separating equilibrium.

**Bài 2**: Akerlof model. q ∼ Uniform[0, 2]. v_B = 1.8q, v_S = q. Tính: có gains from trade không? Market có collapse không? Vì sao?

**Bài 3**: Rothschild-Stiglitz. Mô tả menu contract cho H và L insurance trong 3 steps.

---

## 7. Lời giải chi tiết

### Bài 1

Gap wage = y_H − y_L = 120k − 60k = 60k.

- IC Low (không imitate): c_L × e* ≥ 60k → e* ≥ 60,000/16,000 = **3.75 năm**.
- IC High (muốn signal): c_H × e* ≤ 60k → e* ≤ 60,000/8,000 = **7.5 năm**.

Separating equilibrium tồn tại khi e* ∈ **[3.75, 7.5]** năm.

### Bài 2

v_B = 1.8q > v_S = q → gains from trade = 0.8q > 0. Có gains from trade.

Buyer offer p. Seller sell if q ≤ p. Average q sold = p/2.
Buyer expected value = 1.8 × (p/2) = 0.9p.
Buyer willing to pay 0.9p. Để profitable: 0.9p ≥ p → 0.9 ≥ 1. Sai.

**Market collapse.** Dù gains from trade dương, adverse selection phá hoàn toàn. Mấu chốt: v_B/v_S = 1.8 < 2. Threshold để market survive: v_B/v_S ≥ 2 (tức buyer value ít nhất gấp đôi seller).

### Bài 3

Bước 1 — Xác định actuary fair premium:
- H: t_H = 0.5 × coverage_H. Full coverage = 100 → t_H = 50.
- L: t_L = 0.1 × coverage_L.

Bước 2 — Set coverage_L để satisfy IC_H (H không imitate L):
- H expected payoff at H's contract: W − 50 (full coverage).
- H expected payoff at L's contract: 0.5×(W − t_L − (100 − coverage_L)) + 0.5×(W − t_L) = W − t_L − 0.5×(100 − coverage_L).
- IC_H: W−50 ≥ W−t_L−0.5×(100−coverage_L) = W−0.1×c_L−50+0.5c_L = W−50+0.4c_L.
- Solve: 0 ≥ 0.4c_L → c_L ≤ 0. Contradiction (can't have negative coverage).

Điều này cho thấy với risk-neutral expected utility, không thể separate. Cần risk aversion (concave utility) để separation work — consistent với Rothschild-Stiglitz original. Với risk-neutral agents: adverse selection unsolvable bằng screening đơn giản.

---

## Bài tiếp theo

**[L04: Deterrence & Crisis Bargaining](../lesson-04-deterrence-crisis/README.md)**: Schelling's commitment devices, chicken game, brinkmanship, MAD — vì sao "rationality of irrationality" có thể work.

---

*[visualization.html](./visualization.html) · Tầng 3 — PoliticalScience*
