// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: PoliticalScience/03-StrategicInteractions/lesson-04-deterrence-crisis/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 04: Deterrence & Crisis Bargaining

> **Tầng 3 — Strategic Interactions · PoliticalScience**

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Phân tích **Chicken game** (Hawk-Dove): Nash Equilibria và mixed strategy.
- Giải thích tại sao **commitment device** có thể improve your bargaining position.
- Mô tả **brinkmanship**: tạo ra risk of catastrophe như một công cụ đàm phán.
- Phân tích **MAD** (Mutually Assured Destruction) và điều kiện để deterrence stable.
- Hiểu "**rationality of irrationality**" (Schelling) — và khi nào nó works/backfires.

## Kiến thức tiền đề

- **T1-L01**: Nash Equilibrium.
- **T1-L03**: Backward induction.
- **L02** (bài này): Bargaining, outside option, commitment.

---

## 1. Chicken Game — Cấu trúc

> 💡 **Trực giác**: Hai xe chạy thẳng vào nhau. Ai lái sang bên trước = "chicken" (yếu đuối, thua). Ai giữ thẳng = thắng. Nếu cả hai giữ thẳng = collision (cả hai chết). Đây không phải Prisoner's Dilemma — nó nguy hiểm hơn: không có dominant strategy.

### 1.1 Payoff Matrix

Hai players: A và B. Chiến lược: **Swerve (S)** = nhường, **Straight (ST)** = giữ thẳng.

|  | B: Swerve | B: Straight |
|---|---|---|
| **A: Swerve** | (0, 0) | (−1, +1) |
| **A: Straight** | (+1, −1) | (−10, −10) |

**Giải thích**: (0,0) = cả hai nhường = draw, không ai thua. (+1,−1) = A thẳng, B nhường = A thắng. (−10,−10) = collision = catastrophe cho cả hai.

### 1.2 Nash Equilibria

**Pure NE 1**: (Straight, Swerve). Kiểm tra: A giữ Straight — nếu B đang Swerve, A không muốn đổi (1 > 0). B giữ Swerve — nếu A đang Straight, B không muốn đổi (−1 > −10). → NE.

**Pure NE 2**: (Swerve, Straight). Symmetric argument. → NE.

**Mixed NE**: A chọn Straight với xác suất p, Swerve với (1−p). B indifferent khi: p × (−10) + (1−p) × 1 = p × 0 + (1−p) × 0.

→ −10p + 1 − p = 0 → 1 = 11p → **p = 1/11 ≈ 0.09**.

**Expected payoff mixed NE**: E[A] = p × 0 + (1−p) × 0 = 0? No — compute properly:

E[A] = p_A × p_B × (−10) + p_A × (1−p_B) × 1 + (1−p_A) × p_B × (−1) + (1−p_A)(1−p_B) × 0.

Tại mixed NE (p = 1/11): E[A] = ... each pure strategy gives same expected payoff = 0. Confirm: E[Straight | B mixes p=1/11] = (1/11)(−10) + (10/11)(1) = −10/11 + 10/11 = 0. ✓

### 1.3 So sánh với Prisoner's Dilemma

| | Prisoner's Dilemma | Chicken |
|---|---|---|
| Dominant strategy? | Yes (Defect) | No |
| Pure NE | (D, D) | (S,ST) và (ST,S) |
| Nash outcome | Jointly bad | Jointly reasonable (1 wins, 1 loses) |
| Catastrophe outcome | (D,D) = bad but finite | (ST,ST) = catastrophe |
| Commitment value | Moderate | **Extreme** |

> ❓ **Câu hỏi tự nhiên**: Tại sao Chicken quan trọng hơn PD cho phân tích khủng hoảng? Vì trong PD, outcome (D,D) là bad nhưng finite (tù 5 năm). Trong Chicken, (ST,ST) = war, nuclear exchange → catastrophic. Một bên có thể dọa một cách credible — không ai muốn test (ST,ST).

📝 **Tóm tắt mục 1**: Chicken có 2 pure NE (asymmetric) + 1 mixed NE (p = 1/11). Không có dominant strategy. Catastrophe (ST,ST) ảnh hưởng đến cả game structure.

---

## 2. Commitment Devices — Schelling

> 💡 **Trực giác**: Thomas Schelling (Strategy of Conflict, 1960; Nobel 2005). Câu hỏi: tại sao bạn muốn **mất đi** khả năng lựa chọn? Ví dụ: nếu bạn có thể cột tay mình vào vô lăng (không thể lái sang bên), bạn CHẮC CHẮN không nhường — và đối phương biết điều đó → họ buộc phải nhường.

**Formal**: Commitment = loại bỏ một option trước khi game bắt đầu → thay đổi game tree → thay đổi equilibrium.

### 2.1 Burning Bridges

Hernán Cortés đổ bộ vào Mexico (1519): đốt thuyền → binh lính không thể rút lui → chiến đấu hết mình. Đối phương biết → giảm chiến đấu ý chí đối kháng.

**Game theory**: Cortés chuyển từ "có thể rút lui" sang "không thể rút lui." Đối phương backward induct: nếu Cortés không rút, đánh sẽ tốn kém → đàm phán tốt hơn.

### 2.2 Doomsday Machine (Kubrick/Dr. Strangelove)

Automated retaliation device: nếu bị tấn công, hệ thống tự động phóng nuclear → không cần human decision.

**Lý do credibility**: Nếu tấn công nuclear đòi hỏi con người quyết định, đối phương nghĩ: "Sau khi chúng ta tấn công, leader của họ sẽ rational và không muốn chết → sẽ không retaliate." → deterrence fails.

Doomsday machine loại bỏ human decision → no choice → retaliation certain → deterrence works.

**Giá trị**: Chỉ có giá trị nếu **được biết trước** bởi đối phương. Kubrick's Dr. Strangelove: "The whole point of a Doomsday Machine is lost if you keep it a secret!"

### 2.3 Tying Hands

NATO Article 5: nếu một thành viên bị tấn công, tất cả thành viên respond. Một quốc gia có thể không muốn bảo vệ quốc gia nhỏ xa xôi đơn lẻ — nhưng treaty commitment tạo ra credibility.

Giá: mất flexibility. Lợi: deterrence của kẻ xâm lược.

### 2.4 Tripwire Forces

Đặt số lượng nhỏ quân mình tại biên giới đồng minh. Nếu xâm lược bắt đầu, quân này chết → đảm bảo trong nước không thể không respond. "Tripwire" = không phải để thắng mà để tạo commitment.

**Walk-through — Ví dụ số**: US có 50,000 quân ở Tây Đức trong Chiến tranh Lạnh. Ít quá để ngăn Soviet tấn công quân sự. Nhưng đủ để đảm bảo US casualties → Congress phải declare war → escalation certain → Soviet deterred.

> ⚠ **Lỗi thường gặp**: Commitment device chỉ work nếu **đối phương tin bạn**. Nếu không credible, nó không work. Credibility thường đến từ: tính costliness của action (dễ verify), reputation (track record), third-party guarantee, physical impossibility of retreat.

📝 **Tóm tắt mục 2**: Commitment = loại bỏ option để thay đổi game. Works vì đối phương backward induct và thấy bạn sẽ không back down → they back down. Must be observable và credible.

---

## 3. Brinkmanship

> 💡 **Trực giác**: Schelling's brinkmanship = "tạo ra rủi ro mà cả hai không kiểm soát hoàn toàn." Không phải "tôi hứa sẽ tấn công nếu bạn không nhường" (dễ bị gọi bluff) mà là "tôi đẩy chúng ta đến bờ vực mà từ đó tai nạn có thể xảy ra — và bạn có muốn test không?"

### 3.1 Cơ Chế

Khủng hoảng leo thang = tạo ra risk of accident/miscalculation mà không ai muốn. Risk này không phải 0 hay 1 — nó ở đâu đó giữa.

**Walk-through — Cuba Missile Crisis (1962)**:

Kịch bản stylized:
- **Trạng thái ban đầu**: USSR đặt tên lửa ở Cuba.
- **Lựa chọn US**: (a) Accept (= concede), (b) Naval quarantine + demand removal.
- **Lựa chọn USSR nếu US quarantine**: (a) Back down (remove missiles), (b) Escalate (run blockade).
- Nếu USSR escalate: P(war) tăng cao — không ai biết chính xác.

Khrushchev's logic: "Nếu chúng ta escalate, US có thể nổ súng → nổ súng → nuclear exchange → cả hai chết. Risk này đủ lớn để không test."

Kennedy: không dọa all-out war ngay lập tức (không credible), mà tạo ra risk-of-war dần leo thang → forcing USSR to assess: is this worth it?

**Kết quả**: USSR rút missiles; US cam kết (secretly) không xâm lược Cuba và rút missiles khỏi Thổ Nhĩ Kỳ. → Cả hai back down qua backchannel.

### 3.2 Điều Kiện để Brinkmanship Work

1. **Catastrophe phải real và shared**: cả hai bên thực sự sợ (ST, ST) outcome.
2. **Risk phải credible**: không phải "tôi bịa ra risk" mà là tình hình thực sự nguy hiểm.
3. **Có cách de-escalate**: đối phương phải có off-ramp để nhượng mà không hoàn toàn mất mặt.
4. **Communication kênh bí mật**: deal thường closed qua back-channel (Khrushchev-Kennedy letters, Turkey missiles deal).

### 3.3 Ví dụ 2 — MAD (Mutually Assured Destruction)

**Điều kiện**: cả hai bên có second-strike capability (có thể retaliate sau khi bị tấn công lần đầu).

- US tấn công USSR → USSR second-strike destroys US. US không lợi.
- USSR tấn công US → US second-strike destroys USSR. USSR không lợi.
- → **NE là không ai tấn công**.

**Tại sao second-strike matters**: First-strike only capability = bên kia có incentive to "use it or lose it" → unstable. Mutual second-strike = stable deterrence.

**Trò chơi số**:

| | USSR: No strike | USSR: Strike |
|---|---|---|
| **US: No strike** | (100, 100) — status quo | (0, 110) — US loses, USSR wins |
| **US: Strike** | (110, 0) | (−1000, −1000) — MAD |

NE thuần túy: (No strike, No strike) = (100, 100). Nếu mà không có second-strike (US tấn công, USSR không thể retaliate): (110, 0) → US muốn strike. **Second-strike capability đổi payoff và stabilizes peace.**

### 3.4 Ví dụ 3 — Trade War

US dọa tariff 25% nếu China không nhượng bộ thương mại. China dọa retaliate.

Chicken structure: nếu cả hai escalate = mutual damage. Brinkmanship: US impose tariff → China retaliates → US escalates further → risk of full trade war tăng → ai đó back down.

Commitment: Trump tweet "tariffs are beautiful" (costly public commitment → credibility tăng → pressure on China). Risk: nếu China không back down, US stuck with tariffs = self-harm.

---

## 4. Rationality of Irrationality

> 💡 **Trực giác**: Schelling's famous insight: nếu opponent **believes** bạn sẽ không back down no matter what — bạn có power lớn hơn. Nhưng làm sao đáng tin cả "sẽ không back down" khi rõ ràng là costly? Câu trả lời: thực sự **commit** — hoặc **tạo reputation** cho craziness.

### 4.1 Nixon's Madman Theory

Nixon (theo Haldeman) có "Madman Theory": nếu North Vietnam và Liên Xô tin Nixon điên và có thể dùng nuclear → họ nhượng bộ hơn vì không muốn test.

**Logic game theory**: người rational không bluff vì đối phương biết bạn rational và sẽ call bluff. Người "irational" (hoặc committed) có thể bluff credibly vì đối phương không chắc.

### 4.2 Điều kiện để "Rationality of Irrationality" work

1. **Belief phải credible**: opponent phải thực sự không chắc bạn rational.
2. **Costly to fake**: nếu ai cũng có thể claim "tôi điên", claim vô nghĩa. Cần: track record, institutional constraint, emotional temperament observable.
3. **Không overuse**: nếu dùng quá nhiều, becomes predictable = rational again.

> ❓ **Câu hỏi tự nhiên**: North Korea có đang dùng "madman strategy" không? Kim Jong-un: nhiều hành động "irrational" (tests, provocations). Logic: làm US và South Korea không chắc chắn → không tấn công preventively. Trade-off: risk of miscalculation tăng, international isolation deepens.

> ⚠ **Lỗi thường gặp**: "Irrationality là luôn tốt trong conflict." Không — chỉ tốt nếu opponent càng sợ catastrophe hơn bạn. Nếu opponent không care (nihilistic, nothing to lose), irrational threat không deterrence được. Vd: deterrence fails with suicide bombers vì catastrophic outcome không dissuade them.

---

## 5. Bài tập thực hành

**Bài 1**: Chicken game với payoffs (0,0), (−2,+2), (+2,−2), (−20,−20). Tính: (a) pure NE; (b) mixed NE probability; (c) expected payoff ở mixed NE.

**Bài 2**: Schelling scenario. A và B đang bargain. A muốn X ≥ 70. B muốn X ≤ 40. Catastrophe if no deal = (−50, −50). A publicly commits "accept nothing < 70." B public offer = 50. Phân tích: liệu deal xảy ra không? Ai có lợi từ commitment?

**Bài 3**: MAD condition. US second-strike payoff nếu USSR strikes first = u. USS payoff nếu strike first = v. Điều kiện để MAD deterrence stable là gì (dùng game matrix)?

---

## 6. Lời giải chi tiết

### Bài 1

(a) Pure NE: Check (Straight, Swerve): A=+2 > 0 (không muốn đổi sang Swerve), B=−2 > −20 (không muốn đổi sang Straight). → NE. Symmetric: (Swerve, Straight) cũng NE.

(b) Mixed NE: A plays Straight với prob p. B indifferent:

E[B | Straight] = p(−20) + (1−p)(2) = E[B | Swerve] = p(0) + (1−p)(0) = 0.

−20p + 2 − 2p = 0 → 2 = 22p → **p = 1/11 ≈ 0.091**.

(c) E[A] tại mixed NE = 0 (by definition of indifference). Mỗi pure strategy cho expected payoff = 0.

Confirm: E[A | Straight] = (1/11)(−20) + (10/11)(2) = −20/11 + 20/11 = 0. ✓

### Bài 2

Trước commitment: space of deals = [40, 70] = empty (A muốn ≥70, B muốn ≤40). Không có agreement zone → catastrophe risk = real.

Sau commitment của A (X ≥ 70 publicly announced, costly): A's credible minimum = 70.

B: accept X=70 (payoff = −30 từ ideal, nhưng > −50 catastrophe) vs reject (risk catastrophe). If B believe A's commitment 100%: B best response = accept 70. Deal at X=70.

A benefits: lấy được 70 thay vì 50. B suffers: phải accept 70 > 40 ideal. Nhưng B prefers 70 over catastrophe (B gets −50 vs −30 relative to ideal = still better).

**Key**: A's commitment only works if credible. If B thinks A bluffing (50% chance), B might gamble.

### Bài 3

Matrix:

| | USSR: No strike | USSR: Strike |
|---|---|---|
| US: No strike | (s₀, s₀) | (−u, v) |
| US: Strike | (v, −u) | (−w, −w) |

s₀ = status quo payoff. u = damage from being struck without retaliation. v = gain from striking first. w = mutual destruction.

MAD stable (NE = No strike, No strike) requires: (s₀ > v) for both parties — status quo preferred to first strike.

Second-strike capability means: −u < s₀ for opponent (don't strike because retaliation certain). Condition: v − w < 0 → striking first leads to −w (mutual destruction) which is worse than any v.

Specifically: **v − w < 0 and s₀ > v − w** → both parties deter. W must be large (MAD = w >> s₀, v).

---

## Bài tiếp theo

**[L05: Mechanism Design](../lesson-05-mechanism-design/README.md)**: Thiết kế ngược — cho desired outcome, design game để rational agents tự ra outcome đó. Vickrey auction, VCG mechanism, revelation principle.

---

*[visualization.html](./visualization.html) · Tầng 3 — PoliticalScience*
`;
