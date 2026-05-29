# Lesson 04: Extensive Form & Subgame Perfect Equilibrium

> **Tầng 1 — Game Theory Foundations · PoliticalScience**

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Biểu diễn game **tuần tự** (sequential) dưới dạng **game tree** (cây trò chơi).
- Xác định **subgame** (trò chơi con) trong game tree.
- Thực hiện **backward induction** (quy nạp lùi) từ lá lên gốc.
- Tìm **Subgame Perfect Equilibrium (SPE)** — NE không có lời đe dọa rỗng (empty threat).
- Phân tích **ultimatum game** và lý giải tại sao kết quả thực nghiệm lệch khỏi SPE.

## Kiến thức tiền đề

- **Lesson 01**: payoff matrix, strategic-form game.
- **Lesson 02**: Nash equilibrium, best response.

---

## 1. Extensive form — Trò chơi tuần tự

> 💡 **Trực giác**: Cờ vua, đàm phán, chiến tranh — tất cả đều là trò chơi **tuần tự**: player 1 hành động, rồi player 2 quan sát và hành động, rồi player 1 lại hành động... Payoff matrix phẳng (normal form) không nắm bắt được thứ tự này. Game tree (cây trò chơi) là công cụ đúng.

### 1.1. Các thành phần của game tree

```
G_ext = (N, T, P, I, U)
```

- **N**: tập players.
- **T**: tập nodes (nút). Gồm: decision nodes (nút quyết định) và terminal nodes (nút lá, kết thúc).
- **P(x)**: player đưa ra quyết định tại node x.
- **I**: information sets — tập nút mà một player không phân biệt được (imperfect information). Trong **perfect information** games, mỗi node là một information set riêng (player biết mình đang ở đâu).
- **U**: payoff tại mỗi terminal node, ghi là (u₁, u₂, ..., uₙ).

### 1.2. Chiến lược trong extensive form

Một **chiến lược** của player i là **kế hoạch đầy đủ**: chỉ định hành động tại **mọi** information set của i, kể cả những nút có thể không đến được.

**Quan trọng**: Chiến lược khác **kế hoạch hành động** đơn thuần — phải đủ đầy đủ ngay cả ở "những nơi không đến". Đây là lý do tại sao ta có thể xét credibility (đáng tin cậy) của lời đe dọa.

---

## 2. Backward Induction — Quy nạp lùi

### 2.1. Thuật toán

**Backward induction**: bắt đầu từ các terminal nodes, làm ngược lên gốc:

1. Tại mỗi decision node của player i **ngay trước lá**: player i chọn action maximizing uᵢ.
2. Gán payoff tại node đó = payoff của action được chọn.
3. Xóa nhánh không chọn, lặp lại lên tầng trên.

**Kết quả**: đường đi từ gốc đến lá = **backward induction path** = SPE outcome.

### 2.2. Walk-through ví dụ 1 — Game tree 3 levels

**Bối cảnh**: Player 1 chọn In hoặc Out. Nếu In, Player 2 chọn Cooperate (C) hoặc Fight (F). Nếu Out, game kết thúc.

```
Payoffs (Player1, Player2):
- Out: (2, 3)
- In → C: (4, 4)
- In → F: (0, 1)
```

**Tree**:
```
P1
├── Out → (2, 3)
└── In
    └── P2
        ├── Cooperate → (4, 4)
        └── Fight → (0, 1)
```

**Backward induction**:
- Step 1 (node P2): C cho P2 payoff 4 > F payoff 1 → P2 chọn C. Gán node P2 = (4, 4).
- Step 2 (node P1): In → (4,4), Out → (2,3). P1 payoff 4 > 2 → P1 chọn In.
- **SPE path**: P1 chọn In, P2 chọn C → (4, 4).

**Chiến lược SPE**: P1 = {In}; P2 = {C nếu P1 chọn In} (C tại mọi node P2, kể cả "không đến được").

**Lời đe dọa rỗng**: Nếu P2 nói "nếu mày vào, tao sẽ Fight (0, 1)" để ngăn P1 chọn In — đây là empty threat. Nếu P1 thật sự vào, P2 sẽ chọn C (4 > 1). Backward induction loại bỏ những lời đe dọa không credible.

### 2.3. Walk-through ví dụ 2 — Trust Game

```
Payoffs (Investor, Trustee):
- Not Invest: (10, 10)
- Invest → Keep: (0, 40)   [Trustee giữ hết]
- Invest → Return: (20, 20) [Chia đều]
```

Backward induction:
- Node Trustee: Keep=(40) > Return=(20) → Trustee chọn Keep.
- Node Investor: Invest→(0), Not Invest→(10). 0 < 10 → Investor chọn Not Invest.
- **SPE**: Not Invest → (10, 10). Mặc dù (20, 20) khả thi và tốt hơn cho cả hai, nó không thể đạt được vì Trustee không credibly commit.

**Ứng dụng chính trị**: Tại sao các nhà nước khó cam kết không tịch thu tài sản sau đầu tư nước ngoài? → Trust game. Giải pháp: institution (luật quốc tế, WTO) = commit device giúp Trustee "buộc" chọn Return.

---

## 3. Subgame Perfect Equilibrium (SPE)

### 3.1. Định nghĩa subgame

**Subgame** của game tree G là một proper subtree G' thỏa:
1. Bắt đầu tại một single decision node x.
2. Gồm tất cả successors của x.
3. Không cắt bất kỳ information set nào (nếu x nằm trong information set {x, y}, phải lấy cả y).

**Điều kiện 3** nghĩa là với **perfect information game**, mọi decision node đều bắt đầu một subgame (vì mỗi node là information set riêng).

### 3.2. SPE — định nghĩa

**Profile chiến lược s* là SPE** nếu nó cấu thành NE trên **mọi subgame**, không chỉ game gốc.

**Hệ quả**: Backward induction cho perfect information game luôn cho ra SPE (Zermelo 1913 với cờ vua). SPE loại bỏ "unreasonable NE" — NE dựa trên empty threats.

### 3.3. Walk-through ví dụ 3 — Ultimatum Game

> 💡 **Trực giác**: Proposer chia 100 đồng cho Responder. Responder có thể Accept hoặc Reject. Nếu Reject — cả hai nhận 0.

**Game tree**:
```
Proposer offer x ∈ {0, 1, 2, ..., 100}
└── Responder
    ├── Accept → (100−x, x)
    └── Reject → (0, 0)
```

**Backward induction**:
- Node Responder khi Proposer offer x: Accept = x, Reject = 0.
  - Nếu x > 0: Accept > Reject → Responder accept.
  - Nếu x = 0: Accept = Reject = 0 → indifferent (tie-breaking: accept).
- Node Proposer: chọn x tối thiểu mà Responder vẫn accept = x = 0 (hoặc x = 1 nếu dùng strict preference).
- **SPE** (với strict preference Responder): Proposer offer x = 1, Responder accept mọi x ≥ 1. Outcome = (99, 1).

**Nhận xét quan trọng**: SPE dự đoán Proposer giữ gần hết, cho Responder ε. Kết quả thực nghiệm (Güth et al. 1982 và hàng trăm replication): người ta typically offer 40-50% và reject offer < 30%. Tại sao?

**Giải thích**: (a) Fairness preferences — utility bao gồm cả "công bằng", không chỉ tiền. (b) Reputation concerns — trong xã hội, reputation matters. (c) Anger/spite — Responder punish Proposer "bất công" dù tự thiệt.

→ SPE đúng về mặt logic, nhưng con người không thuần duy lý kinh tế. Đây là nền tảng cho **Behavioral Game Theory** (Thaler, Kahneman).

> ❓ **Câu hỏi tự nhiên**:
> - "SPE khác NE như thế nào?" → Mọi SPE đều là NE, nhưng không phải NE nào cũng là SPE. NE trong extensive form có thể dựa trên empty threat (đe dọa hành động off-path mà nếu thật sự xảy ra thì player không muốn thực hiện). SPE loại bỏ những NE như vậy.
> - "Backward induction có áp dụng được với games lớn không?" → Khái niệm thì có, nhưng tính toán thì số states tăng theo cây nhị phân. Cờ vua có ~10^120 states — không tính hết. Trong thực tế dùng alpha-beta pruning hoặc Monte Carlo Tree Search.
> - "Ultimatum game SPE có credible không?" → Trong experiments, Responders reject thật — vậy SPE sai? Không hẳn — SPE dựa trên model utility chỉ là tiền. Nếu sửa model (thêm fairness) thì SPE của model mới có thể predict đúng.

---

## 4. Ứng dụng chính trị

### 4.1. Stackelberg game — Người dẫn đầu chiến lược

```
Payoffs (Leader, Follower) trong cạnh tranh số lượng:
Leader chọn q_L trước, Follower quan sát và chọn q_F.
```

Backward induction: Follower best response BRF(qL) → substitute vào utility Leader → Leader tối ưu hóa anticipating BR. Kết quả: Leader có lợi thế (first-mover advantage) — khác Nash đồng thời (Cournot).

**Ứng dụng**: Quốc gia đặt thuế quan trước khi đàm phán → first-mover advantage. Ứng viên công bố chính sách trước → commit và gain credibility.

### 4.2. Credible commitment — Cam kết đáng tin cậy

**Nghịch lý**: Đôi khi bị **giới hạn lựa chọn** lại có lợi. Odysseus cho buộc mình vào cột tàu — không thể lao theo tiếng hát Sirens → tốt hơn cho ông ta. Trên game tree: bằng cách loại bỏ nhánh (Don't cooperate), ô remaining là "must cooperate" → đối phương tin và đầu tư.

**Ví dụ chính trị**: NATO Article 5 — "tấn công một là tấn công tất cả" = commitment device. Nếu không có, mỗi nước có thể không protect đồng minh (vì costly). Với Article 5, hành động "Không protect" bị loại khỏi strategy space → lời cam kết credible.

> 🔁 **Dừng lại tự kiểm tra**:
> 1. Game tree: P1 chọn L hoặc R. Nếu L: P2 chọn A(3,3) hoặc B(1,4). Nếu R: P2 chọn C(2,2) hoặc D(4,1). Tìm SPE path.
> <details><summary>Đáp án</summary>Node P2 sau L: B=(4) > A=(3) → P2 chọn B. Gán L→(1,4). Node P2 sau R: D=(1) vs C=(2) → P2 chọn C. Gán R→(2,2). Node P1: L→P1 nhận 1, R→P1 nhận 2. P1 chọn R. SPE path: P1 chọn R, P2 chọn C → (2, 2).</details>
> 2. Trong ultimatum game, Proposer offer 50% là SPE không?
> <details><summary>Đáp án</summary>Không phải SPE (theo model duy lý chuẩn). SPE là offer ε (gần 0) vì Responder accept mọi x > 0. Offer 50% bị SPE "dominated" vì Proposer có thể offer ít hơn và vẫn được accept. Tuy nhiên trong thực nghiệm, offer ~50% phổ biến vì fairness preferences.</details>

> 📝 **Tóm tắt**:
> - **Extensive form**: game tree biểu diễn thứ tự và thông tin. Chiến lược = kế hoạch đầy đủ tại mọi information set.
> - **Backward induction**: giải từ lá lên gốc, tìm best response tại mỗi node. Cho kết quả SPE trong perfect information game.
> - **SPE**: NE trên mọi subgame. Loại bỏ empty threats. Refinement của NE.
> - **Ultimatum game**: SPE predict (99,1) nhưng experiments cho ~(50,50) vì fairness preferences.
> - **Credible commitment**: đôi khi giới hạn options của mình lại có lợi (Odysseus strategy).

---

## Bài tập

1. Backward induction cho game sau. P1 chọn In hoặc Out. Nếu Out → (1, 3). Nếu In → P2 chọn High hoặc Low. Nếu High → P1 chọn Accept (3, 2) hoặc Reject (0, 0). Nếu Low → (2, 1). Tìm SPE path và payoffs.

2. Ultimatum game với 3 players: Proposer chia 12 đồng. Chia (a, b, c) với a+b+c=12. Mỗi Responder độc lập vote Accept/Reject. Quy tắc majority (2/3 accept → deal; nếu không → tất cả nhận 0). Phân tích SPE bằng backward induction.

3. "Burning money" game: P1 có thể "đốt" 1 đơn vị lợi ích trước khi chơi Stag Hunt. Nếu đốt: P1 giảm mọi payoff đi 1. Nếu không đốt: game Stag Hunt bình thường (S=4, H=2, cần cả hai để bắt Stag). Chứng minh: P1 đốt tiền có thể là SPE signal dẫn đến (S,S) — giải thích tại sao.

4. Bạn là nhà đàm phán trong một cuộc tranh chấp biên giới. Nếu bạn tuyên bố "chúng tôi sẽ không nhượng bộ" (công khai, irreversible), điều này thay đổi game tree như thế nào? Áp dụng logic SPE.

## Lời giải chi tiết

### Bài 1

```
P1
├── Out → (1, 3)
└── In
    └── P2
        ├── High
        │   └── P1: Accept→(3,2) / Reject→(0,0)
        └── Low → (2, 1)
```

Backward induction:
- **Node P1 sau High**: Accept=(3) > Reject=(0) → P1 chọn Accept. Gán High node → (3, 2).
- **Node P2**: High→P2 payoff=2; Low→P2 payoff=1. 2 > 1 → P2 chọn High. Gán In node → (3, 2).
- **Node P1 ban đầu**: In→payoff=3; Out→payoff=1. 3 > 1 → P1 chọn In.

**SPE path**: In → High → Accept → (3, 2).

**SPE strategy**: P1 = {In; Accept if High}; P2 = {High}.

### Bài 2

Đây là "three-person ultimatum" đơn giản hóa. Giả sử Proposer phân chia thành (a, b, c) với a là phần của Proposer.

Backward induction cho Responder 2 và 3: accept nếu phần của mình > 0.

Proposer biết: cần 1 trong 2 responders để accept (majority = 2 trong 3 gồm Proposer). Proposer minimize phần cho Responders: offer minimal amount cho responder b hoặc c, không offer cho người còn lại.

**SPE**: Proposer offer (11, 1, 0) hoặc (11, 0, 1) — cho 1 unit cho 1 Responder (đủ để họ accept), giữ 11 cho mình. Responder nhận 1 accept (1 > 0). Responder nhận 0 reject (0 = 0, indifferent or reject).

**Kết quả**: Proposer giữ 11/12 ≈ 91.7% — thậm chí ít phải chia hơn so với 2-player game.

*(Lưu ý: với tie-breaking accept thì 1 unit đủ. Với strict preference, cần offer 1+ epsilon.)*

### Bài 3

**Setup**: Game 2 stages.
- Stage 1: P1 chọn Burn (B) hoặc Not Burn (NB).
- Stage 2: Stag Hunt bình thường, nhưng nếu P1 đã Burn, tất cả payoffs P1 giảm 1.

**Stag Hunt sau Burn**:
```
              P2: S    P2: H
P1: S (Burn)  (3, 4)  (-1, 3)
P1: H (Burn)  (2, 0)  (1, 2)
```

**Stag Hunt sau No Burn**:
```
              P2: S    P2: H
P1: S          (4, 4)  (0, 3)
P1: H          (3, 0)  (2, 2)
```

**SPE signal argument**: Nếu P1 Burn, P2 quan sát Burn và cập nhật belief: P1 sẽ chơi S (vì tại Burn-Stag Hunt, P1 có S nếu P2=S cho 3 nhưng NB-Stag cho 4 — chỉ khi P1 committed mạnh mới Burn). Bằng cách Burn, P1 credibly signals intention to play Stag → P2 best responds Stag → (3,4) thay vì rủi ro 0. Điều này dẫn đến outcome tốt hơn non-burn scenario nếu burn thuyết phục P2 chọn Stag.

*(Đây là Schelling (1960) — costly signaling làm lời cam kết credible.)*

### Bài 4

**Tuyên bố "không nhượng bộ" thay đổi game tree**:

**Trước tuyên bố**:
```
Bạn: {Nhượng bộ, Không nhượng bộ}
Đối phương: {Nhường, Không nhường}
Payoffs: (Nhượng, Nhường)=(2,2); (Nhượng, KhôngNhường)=(−1,3); (KhôngNhượng, Nhường)=(3,−1); (KhôngNhượng, KhôngNhường)=(−5,−5)
```

Đây là Chicken. NE: (Nhượng, KhôngNhường) hoặc ngược lại.

**Sau tuyên bố công khai không nhượng bộ** (irreversible commitment):

Nhánh "Nhượng bộ" bị loại khỏi strategy space của bạn (hoặc payoff từ nhượng bộ rất xấu do mất face/reputation). Game tree của đối phương now thấy: Bạn = {Không nhượng bộ}. Đối phương: Không nhường → (−5,−5); Nhường → (−1, 3... đổi thành 3, −1). Đối phương chọn Nhường → (3, −1).

**SPE mới**: Bạn không nhượng bộ, Đối phương nhường → bạn "thắng" cuộc đàm phán. Bằng cách commitment (irreversible public statement), bạn giành được lợi thế Stackelberg.

**Rủi ro**: Nếu đối phương cũng committed → cả hai ở (−5,−5). Credibility của commitment và credibility của counter-commitment là yếu tố quyết định.

---

## Bài tiếp theo

[Lesson 05: Repeated Games & Cooperation](../lesson-05-repeated-games/README.md) — Khi game PD lặp lại nhiều lần, hợp tác có thể xuất hiện — Folk theorem, Tit-for-Tat, Grim Trigger.

## Tham khảo

- Tadelis, *Game Theory*, Chương 13-15.
- Watson, *Strategy*, Chương 14-17.
- Güth, Schmittberger & Schwarze (1982). "An experimental analysis of ultimatum bargaining." *Journal of Economic Behavior & Organization.*
- Schelling, T. (1960). *The Strategy of Conflict.* — kinh điển về commitment và credibility.
