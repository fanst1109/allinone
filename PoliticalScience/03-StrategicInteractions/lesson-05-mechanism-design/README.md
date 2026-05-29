# Lesson 05: Mechanism Design

> **Tầng 3 — Strategic Interactions · PoliticalScience**

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Phát biểu **Revelation Principle** (Myerson, Maskin) và ý nghĩa cho design mechanism.
- Chứng minh rằng **bidding true value** là weakly dominant strategy trong second-price auction (Vickrey).
- Phân biệt first-price vs second-price auction: strategic behavior khác nhau như thế nào.
- Giải thích **VCG mechanism** và nguyên lý "pay your externality."
- Mô tả **Revenue Equivalence Theorem** (Myerson 1981) và điều kiện áp dụng.

## Kiến thức tiền đề

- **T1-L01**: Dominant strategy, Nash Equilibrium.
- **L03** (bài này): Signaling — asymmetric information về valuations.
- **L05 T1**: Repeated games — optional context for auction reputation.

---

## 1. Mechanism Design — Reverse Engineering

> 💡 **Trực giác**: Game theory thông thường: cho trước rules của game → tìm equilibrium. **Mechanism design = reverse**: cho trước **desired outcome** → thiết kế rules sao cho rational agents tự chọn outcome đó. Cũng gọi là "reverse game theory" hay "implementation theory."

**Ví dụ motivating**: Bạn muốn phân bổ một vật phẩm cho người có giá trị cao nhất (efficient allocation). Nhưng bạn không biết ai trân trọng nhất — mỗi người biết giá trị của mình (private information). Bạn thiết kế mechanism nào để people reveal thật?

**Khái niệm cơ bản**:

- **Mechanism**: (S₁, S₂, ..., Sₙ, g) — tập chiến lược Sᵢ cho mỗi agent, và outcome function g mapping chiến lược đến outcomes (allocation + payments).
- **Social Choice Function (SCF) f**: mapping từ type profiles (θ₁, ..., θₙ) đến outcomes.
- **Implementation**: mechanism M implements SCF f nếu equilibrium của M = f(θ) với mọi θ.

### 1.1 Revelation Principle

> 💡 **Trực giác**: Có vẻ như để implement SCF phức tạp, bạn cần mechanism phức tạp (nhiều rounds, obscure strategy spaces). Revelation Principle nói: không cần! Mọi thứ có thể implement bằng **direct revelation mechanism** (DRM) — hỏi thẳng type, incentivize truth-telling.

**Định lý (Myerson 1979, Maskin)**: Nếu SCF f có thể implement bằng bất kỳ mechanism nào trong dominant strategy (hoặc Bayes-Nash), thì f có thể implement bằng DRM trong đó truth-telling là dominant strategy (hoặc Bayes-Nash).

**Hệ quả thực tiễn**: Để thiết kế mechanism, chỉ cần focus vào **Incentive Compatible** (IC) DRMs — tức mechanisms mà "nói thật là best response."

### 1.2 Incentive Compatibility (IC) và Individual Rationality (IR)

**Dominant-strategy IC (DSIC)**: Nói thật là dominant strategy — best bất kể người khác làm gì.

**Bayesian IC (BIC)**: Nói thật là best response given beliefs về types của người khác.

**IR (Individual Rationality / Participation constraint)**: Mỗi agent muốn participate — expected utility ≥ outside option (thường = 0).

---

## 2. Second-Price Auction (Vickrey 1961)

> 💡 **Trực giác**: N người muốn mua 1 vật phẩm. Mỗi người biết giá trị riêng vᵢ (private). Ai trả giá cao nhất thắng, nhưng **trả giá của người thứ hai**. Tại sao? Vì cơ chế này làm cho truth-telling là dominant strategy.

### 2.1 Cơ chế

1. Mỗi bidder i submit bid bᵢ (sealed).
2. Winner = argmax bᵢ.
3. Winner pays = max{bⱼ : j ≠ i} = second-highest bid = **b₍₂₎**.

### 2.2 Proof: bidding vᵢ là weakly dominant strategy

Fix bidder i với true value vᵢ. Gọi **b_max** = highest bid của tất cả người khác.

**Case 1**: vᵢ > b_max.
- Bid vᵢ: win, pay b_max, surplus = vᵢ − b_max > 0. ✓
- Bid bᵢ > vᵢ: vẫn win (b_max < vᵢ < bᵢ), pay b_max. Same outcome.
- Bid bᵢ ∈ (b_max, vᵢ): still win, pay b_max. Same.
- Bid bᵢ < b_max: lose, surplus = 0 < vᵢ − b_max. **Worse**.
- → Bidding vᵢ (or any bᵢ > b_max) is weakly best.

**Case 2**: vᵢ < b_max.
- Bid vᵢ: lose, surplus = 0.
- Bid bᵢ > b_max: win, pay b_max > vᵢ → surplus = vᵢ − b_max < 0. **Worse**.
- Bid bᵢ ≤ b_max: lose, surplus = 0. Same.
- → Bidding vᵢ is weakly best.

**Case 3**: vᵢ = b_max: indifferent (win or lose with 0 surplus).

**Kết luận**: Với mọi b_max, bidding vᵢ is weakly best. → **Truth-telling là weakly dominant strategy.** □

> ❓ **Câu hỏi tự nhiên**: Tại sao không luôn bid cao hơn? Vì trong second-price, bạn pay second-highest — nếu bạn overbid và win, bạn vẫn pay b_max. Nhưng nếu b_max > vᵢ và bạn overbid trên b_max, bạn win và pay > vᵢ → thua lỗ. Không lợi gì.

> ⚠ **Lỗi thường gặp**: "Second-price auction khuyến khích người ta trả thấp hơn thật (shading)." Không — đó là **first-price auction**. Trong second-price, không có incentive nào để shade (bid thấp hơn vᵢ) hoặc overbid.

### 2.3 Walk-through — Ví dụ 1

4 bidders, valuations: v₁=100, v₂=80, v₃=60, v₄=40.

Second-price auction: tất cả bid thật.
- Highest bid: 100 → Bidder 1 wins.
- Price = second-highest = **80**.
- Bidder 1 surplus = 100 − 80 = **20**.
- Bidders 2,3,4: surplus = 0.

### 2.4 Walk-through — Ví dụ 2 (First-price comparison)

Same valuations, **first-price auction**: winner pays their own bid.

Optimal strategy: **bid shading**. In symmetric equilibrium with n bidders, IPV (Independent Private Values):

b*(v) = v × (n−1)/n.

n=4: b*(v) = 0.75v.
- v₁=100 → b₁ = 75.
- v₂=80 → b₂ = 60.
- v₃=60 → b₃ = 45.
- v₄=40 → b₄ = 30.

Winner: Bidder 1 (bid 75), pays 75. Surplus = 100−75 = **25**.

Revenue: Second-price = 80. First-price = 75. Hmm — in this single instance, first-price gets less. Revenue Equivalence Theorem says expected revenue = same over all v profiles.

### 2.5 Revenue Equivalence Theorem (Myerson 1981)

**Điều kiện**: Risk-neutral bidders, Independent Private Values (IPV), symmetric, efficient allocation.

**Kết quả**: Tất cả standard auction formats (first-price, second-price, English, Dutch) yield **same expected revenue** to the seller.

**Intuition**: Trong second-price, winner pays more per win but wins at same probability. In first-price, winner pays less per win but shades bid → expected payments equal out.

> ⚠ **Điều kiện phải thỏa**: Breakdown nếu: risk aversion (first-price > second-price revenue), correlated values, asymmetric bidders, resale markets.

---

## 3. VCG Mechanism (Vickrey-Clarke-Groves)

> 💡 **Trực giác**: Second-price auction làm gì tốt? Nó làm winner "internalize externality" lên người khác. Nếu bạn win (lấy vật phẩm), bạn "externalize" việc người khác không được nó → bạn pay cho externality đó (= second-highest bid = gì mà người tiếp theo đánh giá nó). VCG tổng quát hóa ý này cho bất kỳ public decision.

### 3.1 Cơ Chế VCG

- n agents, type θᵢ (private).
- Outcome space O.
- Agent i có utility uᵢ(o, θᵢ) cho outcome o ∈ O.
- Social planner chọn outcome f(θ) = argmax Σᵢ uᵢ(o, θᵢ) (social welfare max).

**VCG payment cho agent i**:

tᵢ(θ) = Σⱼ≠ᵢ uⱼ(f(θ_{-i}), θⱼ) − Σⱼ≠ᵢ uⱼ(f(θ), θⱼ)

Tức: agent i pays = (welfare của những người khác nếu i không có mặt) − (welfare của những người khác tại outcome thật).

**Giải nghĩa**: tᵢ = **negative externality i imposes on others** = thiệt hại i gây cho xã hội khi có mặt.

**Theorem**: VCG mechanism là **dominant-strategy incentive compatible** (DSIC) — truth-telling là dominant strategy.

### 3.2 Ví dụ 3 — VCG cho Public Decision

3 công dân (A, B, C) quyết định có xây công viên hay không. Chi phí = 100.

Values: v_A = 60, v_B = 50, v_C = 30.

Total value if build: 60+50+30 = 140 > 100 (cost) → xây là efficient.

**Ai trả gì?**

**Agent A's payment**: Welfare of B+C without A: with build? (50+30−100 = −20, so no build); without A, social welfare max = 0 (don't build). Welfare of B+C WITH A's presence = 50+30 (since A's report enables build) = 80. tₐ = 0 − 80 = ... hmm, let me compute correctly:

t_i = [welfare_others at decision without i] − [welfare_others at decision with i].

Without A: B+C have total value 80. Build cost 100. 80 < 100 → don't build. Welfare of B+C = 0.

With A (A reports v_A=60): total = 140 > 100 → build. Welfare of B+C = (50−share_B) + (30−share_C)... wait, in VCG the payment calculation is:

Actually: t_i = Σⱼ≠ᵢ uⱼ(f(θ₋ᵢ), θⱼ) − Σⱼ≠ᵢ uⱼ(f(θ), θⱼ).

Without A: f(θ₋A) = don't build. B+C utility = 0 each. Σ = 0.

With A: f(θ) = build. B utility = v_B − 0 = 50 (pays nothing to cost in VCG—the mechanism handles cost separately or cost = 0 here). Let's simplify: cost shared equally = 100/3 ≈ 33.3 each.

Simpler version — binary public good, no cost sharing:

Project happens if Σvᵢ > 0 (cost already sunk). Payment:

t_A = Σⱼ≠A vⱼ(f without A) − Σⱼ≠A vⱼ(f with A).

Without A: B+C values = 80. No project → values unrealized = 0.
With A: project → B+C get 80.

t_A = 0 − 80 = −80? That's negative (A gets paid). That doesn't seem right.

Let me use the standard formulation: t_i = negative externality = how much worse are others because of i's presence.

If i's presence HELPS others (enables good project): t_i < 0 → i is subsidized.
If i's presence HURTS others (enables bad project): t_i > 0 → i pays.

**In this example**: A's presence enables project that helps B and C (value 80 > 0). → A's externality = +80 to others. But in VCG: A should be REWARDED (negative payment) for enabling this? That seems weird for a cost-sharing problem.

**Correct formulation with cost**:

v_A = 60, v_B = 50, v_C = 30. Cost = 100.

Net social surplus: 140 − 100 = 40. → Build is socially optimal.

VCG with costs: each agent's net utility = vᵢ − costᵢ where costᵢ = agent i's VCG payment.

Without A: B+C net = 50+30−100 = −20 < 0 → don't build. B+C welfare = 0.
With A reporting 60: 60+50+30 = 140 > 100 → build. B+C welfare = 50+30−0 = 80 (they don't pay cost in VCG directly).

tₐ = (welfare_others_without_A) − (welfare_others_with_A) = 0 − 80 = −80.

Hmm — A gets PAID 80? That's the "Groves subsidy" — in VCG for public goods, the pivotal agent often receives payment. This is why VCG can have budget deficit.

**Pivotal mechanism (Clarke mechanism)** — special case of VCG where payment = 0 unless agent is pivotal:

A is pivotal: without A (v_B+v_C = 80 < 100), don't build. With A, build. A's "Clarke tax" = 100 − 80 = **20** (the amount A's vote pushes total above threshold).

B and C: B is not pivotal (60+30 = 90 < 100 without B — don't build regardless). C same. So tB = tC = 0.

A pays 20. Net utility of A = 60 − 20 = 40. B gets 50, C gets 30. Project funded via A paying 20... but total cost is 100. Still budget problem.

**Note**: VCG requires external budget to cover full cost (deficit problem). In practice, combinated with other mechanisms.

### 3.3 Ví dụ 4 — Spectrum Auctions (FCC)

FCC muốn allocate spectrum licenses đến operators có highest value. Problem: each operator's value = private. Naive approach = just ask → all claim high value.

VCG generalized: combinatorial auction (bidders have values for bundles). DSIC. But computationally hard to implement fully. FCC Incentive Auction 2017: used approximation + clock auction with VCG-inspired payments.

---

## 4. Ứng dụng trong Chính trị

**Ví dụ 1 — Tax design (Mirrlees 1971)**: Chính phủ muốn redistribute income nhưng không biết ai productive. Mechanism: tax schedule T(y) sao để worker reveal true productivity qua labor supply.

**Ví dụ 2 — Electoral mechanism**: Cơ chế bỏ phiếu là mechanism design problem. Nếu bạn muốn aggregate true preferences → Condorcet winner → cần IC mechanism. Arrow's impossibility (T2-L01): no perfect mechanism. Gibbard-Satterthwaite: no DSIC SCF that is non-dictatorial and onto. → Strategy-proofness impossible in general voting.

**Ví dụ 3 — Matching markets (Gale-Shapley)**: Medical residency matching. Mechanism = deferred acceptance (DA). DA is strategy-proof for one side (proposers). Nobel 2012 (Roth, Shapley).

---

## 5. Bài tập thực hành

**Bài 1**: Second-price auction, 5 bidders, valuations = [90, 75, 60, 45, 30]. Tính: (a) winner và price; (b) bidder 1's surplus; (c) nếu bidder 2 overbids đến 95, outcome thay đổi không?

**Bài 2**: First-price auction same valuations, n=5. Tính equilibrium bids dùng b*(v) = v×(n−1)/n. So sánh revenue với second-price.

**Bài 3**: VCG công viên. v_A=70, v_B=40, v_C=20, cost=100. Ai là pivotal agent? Tính VCG Clarke tax cho mỗi người.

---

## 6. Lời giải chi tiết

### Bài 1

(a) Highest valuation: Bidder 1 (90). Price = second-highest = **75**. Winner = Bidder 1.

(b) Surplus = 90 − 75 = **15**.

(c) Bidder 2 overbids to 95. Now highest bid = 95 (bidder 2). Second-highest = 90.

New outcome: Bidder 2 wins, pays 90. Bidder 2 surplus = 75 − 90 = **−15**. Overbidding made bidder 2 worse off! → Confirms truth-telling is dominant strategy (bidder 2 should stick with 75).

### Bài 2

b*(v) = v × 4/5 = 0.8v. Bids: 72, 60, 48, 36, 24.

Winner: Bidder 1 (bid 72), pays **72**. Revenue = **72**.

Second-price revenue = 75. Here first-price = 72 < 75. But Revenue Equivalence holds in **expectation over all realizations of v** (drawn from distribution), not for every specific realization. With these specific values, first-price < second-price.

Expected Revenue Equivalence: over many auctions, average revenue converges.

### Bài 3

v_A=70, v_B=40, v_C=20. Cost=100. Total = 130 > 100 → build is efficient.

Check who is pivotal:

Without A: v_B + v_C = 60 < 100. Don't build.
With A: 130 > 100. Build.
→ **A is pivotal** (A changes decision from no-build to build).

Clarke tax for A = cost − value others would generate = 100 − 60 = **40**.

Without B: v_A + v_C = 90 < 100. Don't build.
With B: build.
→ **B is also pivotal!**

Clarke tax for B = 100 − 90 = **10**.

Without C: v_A + v_B = 110 > 100. Build anyway.
→ **C is NOT pivotal.**

Clarke tax for C = **0**.

Total payments: 40 + 10 = 50. Total cost = 100. Budget deficit = 50. → Consistent with VCG's known budget problem.

Net utilities: A = 70 − 40 = 30; B = 40 − 10 = 30; C = 20 − 0 = 20.

---

## Kết thúc Tầng 3 — PoliticalScience

Bạn đã hoàn thành toàn bộ 5 bài Tầng 3. Tổng quan những gì đã học:

| Lesson | Khái niệm cốt lõi | Công cụ |
|--------|-------------------|---------|
| L01 | Free-rider, public goods | n-player PGG, Olson, Ostrom |
| L02 | Bargaining power, patience | Nash bargaining, Rubinstein SPE |
| L03 | Asymmetric info, costly signals | Spence, Akerlof, Rothschild-Stiglitz |
| L04 | Commitment, deterrence | Chicken, Schelling, MAD |
| L05 | Reverse engineering incentives | VCG, Vickrey, Revelation Principle |

Các tầng tiếp theo (nếu bạn muốn): Comparative Politics (institutions, elections, coalition), International Relations (war models, international cooperation), Political Economy (rent-seeking, bureaucracy).

---

*[visualization.html](./visualization.html) · Tầng 3 — PoliticalScience*
