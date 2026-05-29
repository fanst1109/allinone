// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: PoliticalScience/01-GameTheoryFoundations/lesson-05-repeated-games/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 05: Repeated Games & Cooperation

> **Tầng 1 — Game Theory Foundations · PoliticalScience**

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Hiểu tại sao **lặp lại** game (repeated game) có thể làm xuất hiện hợp tác trong PD.
- Tính **discount factor δ** và tổng payoff discounted của game lặp lại vô hạn.
- Phân tích chiến lược **Grim Trigger** và điều kiện δ để cooperation là SPE.
- So sánh **Tit-for-Tat**, **Grim Trigger**, **Pavlov** — ưu nhược điểm từng loại.
- Phát biểu trực giác của **Folk Theorem** — mọi payoff feasible-individually-rational đều sustain được khi δ → 1.
- Giải thích tại sao **finitely repeated PD** (T lần cố định) luôn kết thúc bằng defect.

## Kiến thức tiền đề

- **Lesson 01**: Prisoner's Dilemma.
- **Lesson 02**: Nash equilibrium, best response.
- **Lesson 04**: Backward induction (cần cho finitely repeated game).

---

## 1. Vì sao lặp lại tạo ra hợp tác?

> 💡 **Trực giác**: Trong PD một lần, cả hai defect vì không có hậu quả tương lai. Nhưng nếu bạn và tôi sẽ gặp nhau **mãi mãi** (hoặc một thời gian dài), tôi sẽ suy nghĩ: "Nếu tôi defect hôm nay, ngày mai anh ta sẽ trả thù." Mối đe dọa trả thù trong tương lai có thể kỷ luật hành vi hôm nay — đây là nền tảng của hợp tác trong xã hội, ngoại giao, thương mại.

Hai loại repeated game:
1. **Finitely repeated** (T lần, T biết trước): backward induction cho kết quả bất ngờ.
2. **Infinitely repeated** (hoặc T ngẫu nhiên với xác suất kết thúc 1−δ mỗi vòng): hợp tác có thể xuất hiện.

---

## 2. Discount factor δ và tổng payoff

### 2.1. Tại sao discount?

Payoff nhận được t rounds tương lai có giá trị hiện tại thấp hơn vì:
- **Lãi suất**: 100 đồng hôm nay đầu tư cho ra 100/δ đồng sau 1 năm (với δ = r/(1+r)).
- **Không chắc chắn**: xác suất game kết thúc trước round t.
- **Kiên nhẫn**: δ đo mức "quan tâm đến tương lai". δ gần 1 = rất kiên nhẫn; δ gần 0 = chỉ quan tâm hôm nay.

### 2.2. Tổng payoff discounted

Nếu payoff mỗi round là u, discount factor là δ, game lặp vô hạn:

\`\`\`
V = u + δu + δ²u + ... = u / (1 − δ)
\`\`\`

Đây là chuỗi hình học vô hạn với ratio δ < 1.

**Ví dụ số**: u = 3, δ = 0.8:
- V = 3 + 0.8·3 + 0.64·3 + ... = 3 / (1 − 0.8) = 3 / 0.2 = **15**
- Kiểm tra: 3 + 2.4 + 1.92 + 1.536 + ... → tổng ≈ 15 ✓

**Ví dụ số 2**: u = 3, δ = 0.5:
- V = 3 / (1 − 0.5) = 3 / 0.5 = **6**

**Ví dụ số 3**: u = 5, δ = 0.9:
- V = 5 / (1 − 0.9) = 5 / 0.1 = **50**

**Ví dụ số 4**: u thay đổi theo thời gian — round 1: u₁; round 2 trở đi: u₂ liên tục:
- V = u₁ + δ·(u₂/(1−δ))

---

## 3. Chiến lược trong repeated games

### 3.1. Grim Trigger (GT) — Cò súng mạnh nhất

**Định nghĩa**: Cooperate (C) ở round 1 và mọi round sau nếu đối phương luôn C. Nếu đối phương defect **một lần** → defect mãi mãi (không tha thứ).

**Phân tích**: Xét PD với payoffs:
\`\`\`
              C          D
C         (R, R)     (S, T)
D         (T, S)     (P, P)
\`\`\`
với T > R > P > S (điều kiện PD chuẩn).

**Payoff nếu cooperate (khi đối phương cũng GT)**:
\`\`\`
V(C forever) = R / (1 − δ)
\`\`\`

**Payoff nếu defect một lần** (round 1 defect → GT của đối phương kích hoạt → cả hai defect mãi):
\`\`\`
V(deviate) = T + δ·P/(1−δ)
\`\`\`
(Round 1: T. Từ round 2 trở đi: P mỗi round)

**Điều kiện để GT sustain cooperation** (cooperation là SPE):
\`\`\`
R/(1−δ) ≥ T + δP/(1−δ)
\`\`\`

Giải cho δ:
\`\`\`
R ≥ (1−δ)T + δP
R − P ≥ (1−δ)(T−P)  [trừ δP hai vế]
(R−P)/(T−P) ≥ 1−δ
δ ≥ 1 − (R−P)/(T−P) = (T−R)/(T−P)
\`\`\`

**Walk-through số ví dụ 1** — PD cụ thể: R=3, T=5, P=1, S=0.

\`\`\`
δ* = (T−R)/(T−P) = (5−3)/(5−1) = 2/4 = 1/2
\`\`\`

→ Nếu δ ≥ 1/2, Grim Trigger sustain cooperation.

**Verify δ = 0.6**:
- V(coop) = 3/(1−0.6) = 3/0.4 = **7.5**
- V(deviate) = 5 + 0.6·1/(1−0.6) = 5 + 0.6/0.4 = 5 + 1.5 = **6.5**
- 7.5 > 6.5 ✓ → Không muốn deviate → Cooperation là NE (và SPE) ✓

**Verify δ = 0.4**:
- V(coop) = 3/(1−0.4) = 3/0.6 = **5.0**
- V(deviate) = 5 + 0.4·1/(1−0.4) = 5 + 0.4/0.6 = 5 + 0.667 = **5.667**
- 5.0 < 5.667 → Deviate có lợi → Cooperation không sustainable ✗

> ⚠ **Lỗi thường gặp**: "Grim Trigger sustain cooperation → cả hai luôn chọn C". Đúng — nếu cả hai chơi GT và không ai defect, không bao giờ trigger. Nhưng Grim Trigger không phải chiến lược tốt nhất trong mọi hoàn cảnh: nó **không tha thứ** nên có thể dẫn đến war of attrition nếu có nhiễu (noise, mistake).

### 3.2. Tit-for-Tat (TfT) — Sao chép đối phương

**Định nghĩa**: Round 1: Cooperate. Round t ≥ 2: làm y chang điều đối phương làm ở round t−1.

**Ưu điểm**: Nice (bắt đầu C), Provocable (punish ngay D), Forgiving (nếu đối phương quay lại C, ta cũng C), Clear (dễ hiểu).

**Nhược điểm trong noisy environment**: Nếu có mistake (nhầm D thành C), TfT có thể bắt đầu vòng alternating C-D-C-D... không bao giờ recover.

**TfT vs GT — Axelrod tournaments (1980, 1984)**: TfT thắng 2 giải đấu nổi tiếng của Robert Axelrod — rất successful trong environments hỗn hợp.

**Walk-through số ví dụ 2** — PD R=3, T=5, P=1, S=0, δ=0.6:

Nếu một player defect một lần khi đối phương chơi TfT:
\`\`\`
Round 1: Deviate (D), đối phương C → Deviate nhận T=5
Round 2: Đối phương D (revenge), Deviate C (TfT copies D) → Deviate nhận S=0 (đối phương D, deviate C... wait)
\`\`\`

Thực ra, sau khi Deviate chọn D round 1, nếu deviate sau đó muốn quay lại C và đối phương (TfT) cũng C → cả hai tiếp tục C. Pattern: D, C, C, C... (nếu deviate chọn C từ round 2).

\`\`\`
V(deviate then cooperate) = T + δR/(1−δ) = 5 + 0.6·3/0.4 = 5 + 4.5 = 9.5
V(cooperate forever) = R/(1−δ) = 7.5
\`\`\`

Hmm, 9.5 > 7.5 → Deviate once then cooperate tốt hơn! Nhưng đây vì chúng ta không tính đúng — khi deviate, TfT sẽ punish (D) ở round 2, deviate nhận S nếu deviate C hoặc P nếu deviate D.

Phân tích đúng: Deviate D round 1, TfT D round 2, Deviate C round 2, TfT C round 3 (TfT copies Deviate round 2 = C) → từ round 3 cả hai C. Payoffs: T, S, R, R, R... = 5 + 0·0.6 + 3·0.36/(1−0.6) = 5 + 0 + 1.08/0.4 = 5 + 2.7 = 7.7 > 7.5.

→ TfT không sustain cooperation nếu có "one-shot defect then cooperate" strategy. Grim Trigger mạnh hơn về mặt sustaining cooperation, nhưng kém linh hoạt.

### 3.3. Pavlov / Win-Stay-Lose-Shift (WSLS)

**Định nghĩa**: Nếu outcome "good" (CC hoặc DC) → repeat same action. Nếu "bad" (CD hoặc DD) → switch.

**Walk-through số ví dụ 3**: PD R=3, T=5, P=1, S=0.

Round 1: Cả hai C → (C,C)=R=3 (good cho cả hai) → cả hai stay at C. Round 2: C,C → lặp lại.

Nếu ai đó bị exploit: (C, D) → C nhận S=0 (bad) → C switches to D. (D, C) → D nhận T=5 (good) → D stays at D. Round 2: (D,D)=P=1 (bad cho cả hai) → cả hai switch to C. Round 3: C,C. → Recover!

**WSLS tự sửa sau noise** — đây là ưu điểm lớn hơn TfT.

---

## 4. Finitely repeated game — Tại sao hợp tác không tồn tại

> 💡 **Trực giác**: Nếu bạn biết chắc trò chơi kết thúc sau round 100, bạn sẽ defect ở round 100 (vì không có tương lai để lo). Đối phương cũng biết vậy, nên sẽ defect ở round 99 (vì round 100 họ biết cả hai defect). Và cứ thế backwards — "unraveling" về round 1.

**Định lý**: Trong finitely repeated PD với T rounds (T biết trước, T hữu hạn), **duy nhất SPE là defect ở tất cả T rounds**.

**Chứng minh bằng backward induction**:
- **Round T (cuối)**: Đây là "game một lần" — D strictly dominates C → cả hai defect.
- **Round T−1**: Biết round T sẽ là (D,D), không ai cần "giữ reputation" nữa → D strictly dominates C → cả hai defect.
- **Round T−2**: Tương tự...
- **→ Round 1**: Cả hai defect.

**Walk-through số ví dụ 4**: PD với R=3, T=5, P=1, S=0. Repeated T=3 lần.

Stage 3 (cuối): (D,D)=(1,1) — unique SPE.
Stage 2: Biết stage 3 cho (1,1) bất kể. Payoff tương lai đã biết = 1. Stage 2 isolated → D dominates → (D,D).
Stage 1: Tương tự → (D,D).

Tổng payoff với δ=0.8: 1 + 0.8·1 + 0.64·1 = 1 + 0.8 + 0.64 = **2.44**.
So với hợp tác nếu có thể: 3 + 2.4 + 1.92 = **7.32** — bỏ phí!

> ❓ **Câu hỏi tự nhiên**:
> - "Nếu PD lặp lại T lần nhưng T là ngẫu nhiên (không biết khi nào kết thúc), có hợp tác không?" → Có! Nếu T ngẫu nhiên với xác suất kết thúc (1−δ) mỗi round, đây tương đương infinitely repeated game với discount factor δ. Vì "có thể vẫn còn nhiều round nữa", backward induction không unravel được.
> - "Folk theorem nghĩa là gì chính xác?" → Với δ đủ lớn, BẤT KỲ payoff nào trong tập "feasible and individually rational" đều có thể là payoff trung bình của một SPE. "Individually rational" = không thấp hơn minimax payoff. Rất nhiều equilibria tồn tại khi δ → 1.
> - "Thực tế có ai chơi Grim Trigger không?" → Không ai nói rõ "tôi chơi Grim Trigger", nhưng các tổ chức, quốc gia thường có policy tương tự: "vi phạm một lần → cắt đứt quan hệ". Ví dụ: ban trade của WTO, quan hệ ngoại giao sau spy scandal.

---

## 5. Folk Theorem — Trực giác

**Phát biểu không chính thức**: Với infinitely repeated game và discount factor δ đủ gần 1, bất kỳ payoff vector nào thỏa mãn:
1. **Feasible**: nằm trong convex hull của payoffs của game gốc.
2. **Individually rational**: mỗi player nhận ít nhất minimax payoff của mình.

→ Có thể đạt được như trung bình payoff của một SPE.

**Ý nghĩa**: Folk Theorem nói rằng khi δ lớn, gần như MỌI thứ có thể là equilibrium outcome. Điều này vừa là kết quả mạnh (cooperation possible) vừa là giới hạn (không predict được kết quả unique).

**Tập feasible-individually-rational cho PD** (R=3, T=5, P=1, S=0):
- Minimax của Row = 1 (đối phương defect, Row có thể đảm bảo ít nhất 1 bằng cách defect).
- Minimax của Col = 1.
- Tập IR feasible: {(v₁, v₂) | v₁ ≥ 1, v₂ ≥ 1, và (v₁,v₂) là convex combination của {(3,3),(5,0),(0,5),(1,1)}}.

Mọi payoff trong tập này có thể sustain được với δ đủ lớn bằng cách dùng "punishment strategies" phù hợp.

> 📝 **Tóm tắt**:
> - **Infinitely repeated game**: discount factor δ đo kiên nhẫn. V(u forever) = u/(1−δ).
> - **Grim Trigger**: cooperation là SPE khi δ ≥ (T−R)/(T−P). Threshold phụ thuộc temptation (T−R) và cost of punishment (T−P).
> - **Tit-for-Tat**: nice, provocable, forgiving — thắng Axelrod tournament nhưng yếu hơn GT về sustaining cooperation nếu "one-shot deviate then return".
> - **Finitely repeated PD**: backward induction → defect mọi round (unraveling). Cooperation chỉ possible khi T ngẫu nhiên hoặc vô hạn.
> - **Folk Theorem**: δ → 1 → gần như mọi feasible-IR payoff có thể sustain được.

---

## Bài tập

1. PD với R=4, T=7, P=2, S=0. Tính δ* tối thiểu để Grim Trigger sustain cooperation. Verify với δ=0.8: so sánh V(coop) và V(deviate).

2. PD với R=3, T=5, P=1, S=0, δ=0.7. Nếu thay vì Grim Trigger, player dùng chiến lược "punish T=2 rounds rồi tha thứ" (defect 2 rounds sau khi đối phương defect, sau đó cooperate lại). Điều kiện cooperation có sustain không?

3. Trong Arms Race PD: R=3 (hòa bình), T=5 (vũ trang đơn phương), P=1 (cả hai vũ trang), S=−1 (bị vũ trang đơn phương). Tính δ* Grim Trigger. Nếu độ kiên nhẫn δ = 0.6, hợp tác có bền vững không? Ứng dụng: giải thích tại sao đàm phán SALT/START có điều kiện tiên quyết về "transparency" (verify each other's disarmament).

4. Finitely repeated Stag Hunt (T=3 lần, không discount). Game: (S,S)=(4,4), (H,H)=(2,2), (S,H)=(0,3), (H,S)=(3,0). Tìm tất cả SPE. (Stag Hunt khác PD — có 2 NE thuần trong stage game.)

## Lời giải chi tiết

### Bài 1

Điều kiện: δ ≥ (T−R)/(T−P) = (7−4)/(7−2) = 3/5 = **0.6**.

**Verify δ = 0.8**:
- V(coop) = R/(1−δ) = 4/(1−0.8) = 4/0.2 = **20**
- V(deviate) = T + δP/(1−δ) = 7 + 0.8·2/(1−0.8) = 7 + 0.8·2/0.2 = 7 + 8 = **15**
- 20 > 15 ✓ → Grim Trigger sustain cooperation với δ=0.8.

**Thêm verify**: Nếu δ = 0.5 < δ*:
- V(coop) = 4/0.5 = **8**
- V(deviate) = 7 + 0.5·2/0.5 = 7 + 2 = **9**
- 8 < 9 → Deviate có lợi → Không sustain ✗ (nhất quán với δ*=0.6)

### Bài 2

Chiến lược "punish 2 then forgive" (P2F): Cooperate mọi lúc trừ khi đối phương defect → defect 2 rounds rồi cooperate.

Payoff nếu deviate (deviate round t, đối phương P2F):
- Round t: T=5 (deviate D, đối phương C)
- Round t+1: S=0 (deviate C, đối phương D) — nếu deviate chọn C sau khi bị punish
- Round t+2: S=0 (deviate C, đối phương D vẫn punish)
- Round t+3 trở đi: R=3 (cả hai C)

V(deviate then cooperate) = 5 + δ·0 + δ²·0 + δ³·R/(1−δ)
= 5 + (0.7)³·3/(1−0.7)
= 5 + 0.343·10
= 5 + 3.43 = **8.43**

V(coop forever) = 3/(1−0.7) = **10**

10 > 8.43 ✓ → Không muốn deviate → P2F **sustain cooperation** với δ=0.7.

*(Lưu ý: Có thể deviate và cũng defect trong 2 rounds punishment, nhưng điều đó còn tệ hơn vì sau đó cả hai tiếp tục D-D. Tính: 5 + 0.7·1 + 0.49·1 + 0.343·3/0.3 = 5+0.7+0.49+3.43 = 9.62 < 10. Vẫn không deviate.)*

### Bài 3

Arms Race PD: R=3, T=5, P=1, S=−1.

δ* = (T−R)/(T−P) = (5−3)/(5−1) = **2/4 = 0.5**.

Với δ=0.6 > 0.5: Grim Trigger sustain cooperation. Kiểm tra:
- V(coop) = 3/(1−0.6) = **7.5**
- V(deviate) = 5 + 0.6·1/(1−0.6) = 5 + 0.6/0.4 = 5 + 1.5 = **6.5**
- 7.5 > 6.5 ✓ → Cooperation sustain.

**Ứng dụng SALT/START**: Điều kiện δ ≥ 0.5 cần "quan tâm đủ đến tương lai" — cả hai nước phải tin rằng quan hệ kéo dài. Transparency (kiểm tra vũ khí lẫn nhau) đảm bảo: (a) Phát hiện cheating ngay lập tức → Grim Trigger kích hoạt đúng lúc. Không có verify → Grim Trigger không hoạt động vì cheating không bị phát hiện. (b) Tăng δ hiệu quả bằng cách giảm uncertainty về tương lai. Đây là lý do Article VII của SALT II quy định "national technical means" (vệ tinh) cho verification.

### Bài 4

Stage game Stag Hunt có **2 NE thuần**: (S,S)=(4,4) và (H,H)=(2,2).

Trong **finitely repeated game với multiple stage NE**, có thể xây dựng SPE phức tạp hơn so với unique-NE stage game (không unravel hoàn toàn).

**SPE 1** (trivial): Cả hai chơi (H,H) ở mọi stage → tổng payoff = 2+2+2=6. Đây là SPE vì (H,H) là NE mỗi stage.

**SPE 2**: Cả hai chơi (S,S) ở mọi stage → tổng payoff = 4+4+4=12. SPE vì (S,S) là NE mỗi stage.

**SPE 3 (phức tạp hơn)**: Chơi (S,S) ở stages 1-2, chơi (H,H) ở stage 3 nếu cooperation tốt; switch sang (H,H) ở stage 3 bất kể. Đây là SPE vì stage 3 là (H,H) NE bất kể, và stages 1-2 cooperation là profitable vì không cần "punish" theo cách PD.

**Nhận xét**: Stag Hunt finitely repeated **không unravel** như PD vì có NE thuần (S,S) tốt. Players có thể sustain (S,S) mọi stage mà không cần trigger mechanism. Đây là điểm khác biệt với PD: Stag Hunt là coordination problem, PD là social dilemma — behavior khác nhau dù cùng cấu trúc repeated game.

---

## Bài tiếp theo

Tầng 2: [Voting Systems & Social Choice](../../02-VotingSocialChoice/lesson-01-voting-systems/README.md) — Áp dụng game theory vào bầu cử: plurality, IRV, Borda, Condorcet, Arrow's impossibility theorem.

## Tham khảo

- Tadelis, *Game Theory*, Chương 10-11.
- Watson, *Strategy*, Chương 22-23.
- Axelrod, R. (1984). *The Evolution of Cooperation.* — Kinh điển về TfT và tournaments.
- Fudenberg & Maskin (1986). "The Folk Theorem in Repeated Games with Discounting." *Econometrica.*
- Schelling, T. (1960). *The Strategy of Conflict.* — Commitment và cooperation.
`;
