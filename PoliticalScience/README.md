# PoliticalScience — Chính trị học (Game Theory-centric)

Lĩnh vực này tiếp cận chính trị qua **lý thuyết trò chơi (game theory)**: giải thích thể chế, bầu cử, liên minh, ngoại giao bằng hành vi tối ưu của các tác nhân chiến lược (strategic agents) có lợi ích riêng. Không phải sách giáo khoa "lịch sử chính trị" — đây là cách định lượng để hiểu *vì sao* các kết quả chính trị xảy ra.

## Vì sao tiếp cận này?

- **Định lượng được**: mọi khái niệm có payoff matrix cụ thể, không "nói chung".
- **Viz mạnh**: voting paradoxes, gerrymandering, mixed strategy — đều dễ tương tác trên trang.
- **Cross-link tự nhiên**: bridge với `Economics/` (game theory thị trường), `Statistics/` (empirical), `Algorithms/` (auction, voting algorithms).
- **Cho ra insight phản trực giác**: vì sao majority voting có thể tạo cycle (Arrow), vì sao "look crazy" làm bạn mạnh hơn (Schelling), vì sao 2 ứng viên đều dồn về median.

## Triết lý

- **Strategic agents, not just institutions** — thể chế chỉ là sân chơi; nội dung là người chơi.
- **Lượng hóa**: mỗi khái niệm ≥ 4 ví dụ số (theo CLAUDE.md cho lĩnh vực kỹ thuật/toán).
- **Trực giác trước công thức**: Stag Hunt analogy trước khi vẽ matrix; coordination story trước Nash.
- **Anticipate câu hỏi**: callout ❓ ở mọi mục khó.
- **Bridge tới hiện thực**: mỗi bài có ví dụ chính trị thực (election, war, treaty, auction).

## Lộ trình 3 tầng × 15 bài

### Tầng 1 — Game Theory Foundations (5 bài)

Học công cụ trước khi áp dụng. Tầng này độc lập với chính trị — là toolbox dùng chung.

| # | Bài | Chủ đề |
|---|------|--------|
| 01 | [Strategic-form games](./01-GameTheoryFoundations/lesson-01-strategic-form-games/) | Normal-form, payoff bimatrix; PD, Stag Hunt, Chicken, Battle of Sexes |
| 02 | [Dominance & Nash equilibrium](./01-GameTheoryFoundations/lesson-02-dominance-nash/) | Strict/weak dominance, IESDS, best response, NE pure |
| 03 | [Mixed strategies & minimax](./01-GameTheoryFoundations/lesson-03-mixed-strategy/) | Indifference principle, mixed NE, Nash 1950 |
| 04 | [Extensive form & SPE](./01-GameTheoryFoundations/lesson-04-extensive-form-spe/) | Game tree, backward induction, ultimatum game |
| 05 | [Repeated games & cooperation](./01-GameTheoryFoundations/lesson-05-repeated-games/) | Folk theorem, Tit-for-Tat, Grim Trigger, discount δ |

### Tầng 2 — Voting & Social Choice (5 bài)

Áp dụng game theory vào lựa chọn tập thể: bầu cử, coalition, gerrymandering.

| # | Bài | Chủ đề |
|---|------|--------|
| 01 | [Voting systems](./02-VotingSocialChoice/lesson-01-voting-systems/) | Plurality, runoff, IRV, Borda, Condorcet, approval — cùng ballot 6 winner |
| 02 | [Arrow's impossibility](./02-VotingSocialChoice/lesson-02-arrows-impossibility/) | 5 axiom, Condorcet cycle, sketch chứng minh |
| 03 | [Median voter & spatial models](./02-VotingSocialChoice/lesson-03-median-voter-spatial/) | Single-peaked preference, candidate convergence |
| 04 | [Strategic voting](./02-VotingSocialChoice/lesson-04-strategic-voting/) | Gibbard-Satterthwaite, tactical voting, wasted vote |
| 05 | [Gerrymandering & coalitions](./02-VotingSocialChoice/lesson-05-gerrymandering-apportionment/) | Packing/cracking, efficiency gap; Shapley-Shubik, Banzhaf |

### Tầng 3 — Strategic Interactions (5 bài)

Game theory cho tình huống chính trị: hợp tác, mặc cả, đe doạ, thiết kế cơ chế.

| # | Bài | Chủ đề |
|---|------|--------|
| 01 | [Collective action](./03-StrategicInteractions/lesson-01-collective-action/) | Public goods, free-rider, Olson, tragedy of commons |
| 02 | [Bargaining](./03-StrategicInteractions/lesson-02-bargaining/) | Nash bargaining, Rubinstein alternating offers, ultimatum |
| 03 | [Signaling & screening](./03-StrategicInteractions/lesson-03-signaling-screening/) | Costly signal (Spence), screening menu, cheap talk |
| 04 | [Deterrence & crisis (Schelling)](./03-StrategicInteractions/lesson-04-deterrence-crisis/) | Credibility, commitment device, brinkmanship, Chicken |
| 05 | [Mechanism design](./03-StrategicInteractions/lesson-05-mechanism-design/) | Revelation principle, VCG, second-price auction, voting design |

## Kiến thức tiền đề

- **Bắt buộc**: [`Math/01-Arithmetic-Algebra`](../Math/01-Arithmetic-Algebra/) (giải hệ phương trình tuyến tính cho mixed NE).
- **Khuyến nghị**: [`Vectors/05-Probability/lesson-06`](../Vectors/05-Probability/lesson-06-expectation-variance/) (kỳ vọng cho mixed strategy), [`DataFoundations/03-Logic`](../DataFoundations/03-Logic/) (proof phản chứng cho Arrow).
- **Không cần**: calculus, lập trình.

## Liên kết chéo

| Bài này | Liên kết tới |
|---------|--------------|
| T1 L01–L02 | [`Economics/Tier2-Microeconomics`](../Economics/Tier2-Microeconomics/) — game theory thị trường (oligopoly) |
| T1 L03 | [`Vectors/05-Probability/lesson-06`](../Vectors/05-Probability/lesson-06-expectation-variance/) — expected value |
| T1 L05 | [`Biology/02-Genetics-Evolution`](../Biology/02-Genetics-Evolution/) — evolution of cooperation |
| T2 L02 | [`DataFoundations/03-Logic`](../DataFoundations/03-Logic/) — proof formal |
| T2 L03 | [`Economics/Tier3-Macroeconomics`](../Economics/Tier3-Macroeconomics/) — political business cycle |
| T3 L02–L03 | [`Economics/Tier4-Applied`](../Economics/Tier4-Applied/) — information economics, labor |
| T3 L05 | [`Algorithms/`](../Algorithms/) — auction algorithms, mechanism complexity |
| Empirical | [`Statistics/02-Inferential`](../Statistics/02-Inferential/) — kiểm định hành vi voter, A/B test policy |

## Cách học hiệu quả

1. **Mở `visualization.html`** trước — chơi với payoff slider, voting profile, gerrymandering grid.
2. **Đọc README** để hiểu định nghĩa và walk-through số.
3. **Làm bài tập** ở cuối README — kiểm tra mình thật sự nắm được, đối chiếu lời giải.
4. Bắt đầu: [Tầng 1 — Game Theory Foundations](./01-GameTheoryFoundations/index.html).
