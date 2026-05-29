// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: PoliticalScience/01-GameTheoryFoundations/lesson-03-mixed-strategy/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 03: Mixed Strategies & Minimax

> **Tầng 1 — Game Theory Foundations · PoliticalScience**

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Hiểu tại sao mixed strategies (chiến lược ngẫu nhiên) tồn tại và khi nào cần dùng.
- Tính **mixed Nash Equilibrium** bằng **indifference principle** (nguyên lý vô sai biệt).
- Giải mixed NE cho Matching Pennies, Rock-Paper-Scissors, Battle of Sexes và game 2×2 bất kỳ.
- Phát biểu **định lý Nash 1950**: mọi finite game có ít nhất 1 NE (thuần hoặc mixed).
- Nhận ra khi nào mixed NE có ý nghĩa thực tế trong chính trị (kiểm tra, phòng thủ, bỏ phiếu xen kẽ).

## Kiến thức tiền đề

- **Lesson 01**: payoff bimatrix, 4 game kinh điển.
- **Lesson 02**: Dominance, best response, Nash equilibrium thuần.
- Giải phương trình tuyến tính bậc nhất 1 ẩn (\`../../../Math/\` nếu cần ôn).

---

## 1. Vì sao cần mixed strategies?

> 💡 **Trực giác**: Trong Matching Pennies, bạn và đối phương đồng thời lật đồng xu. Nếu cùng mặt → bạn thắng; nếu khác mặt → đối phương thắng. Bất kỳ chiến lược thuần nào bạn dùng ("luôn lật Heads") đều bị khai thác ngay. Giải pháp duy nhất: **ngẫu nhiên hóa** sao cho đối phương không thể dự đoán và khai thác bạn.

Ta đã thấy ở L02: Chicken có 2 NE thuần nhưng mỗi NE ưu tiên một player. Matching Pennies không có NE thuần nào cả. Định lý Nash 1950 đảm bảo luôn có NE nếu ta mở rộng sang mixed strategies.

**Mixed strategy** σᵢ: phân phối xác suất trên Sᵢ. Ví dụ với Sᵢ = {H, T}: σᵢ = (p, 1−p) có nghĩa chọn H với xác suất p, T với xác suất 1−p.

**Expected payoff**: Với mixed strategy của cả hai:
\`\`\`
E[uᵢ(σ)] = Σ_{s∈S} σ₁(s₁)·σ₂(s₂)·...·uᵢ(s)
\`\`\`

---

## 2. Indifference Principle — Nguyên lý vô sai biệt

### 2.1. Phát biểu

**Định lý**: Tại một Nash Equilibrium mixed, mỗi player phải **indifferent** (vô sai biệt) giữa tất cả các chiến lược thuần nằm trong **support** của mixed strategy của mình.

**Support** của σᵢ = tập strategies sᵢ mà σᵢ(sᵢ) > 0 (được chọn với xác suất dương).

**Vì sao**: Nếu strategy A cho expected payoff cao hơn strategy B trong support, player i sẽ tăng xác suất chơi A (và giảm B về 0) → B không còn trong support → mâu thuẫn. Để cả hai ở trong support → phải indifferent.

**Hệ quả thực tế**: Để tìm mixed NE, không cần "tối ưu hóa" cho chính mình — cần tìm xác suất của **đối phương** sao cho **mình indifferent**. Đây là điểm phản trực giác quan trọng.

### 2.2. Walk-through ví dụ 1 — Matching Pennies

\`\`\`
              B: Heads (H)    B: Tails (T)
A: Heads (H)    (+1, −1)       (−1, +1)
A: Tails (T)    (−1, +1)       (+1, −1)
\`\`\`

Không có NE thuần (kiểm tra L02: mọi ô đều bị ít nhất một player muốn lệch).

**Tìm mixed NE**: Gọi q = xác suất B chọn H. A phải indifferent giữa H và T:

\`\`\`
E[u_A(H)] = E[u_A(T)]
(+1)·q + (−1)·(1−q) = (−1)·q + (+1)·(1−q)
q − 1 + q = −q + 1 − q
2q − 1 = −2q + 1
4q = 2
q = 1/2
\`\`\`

Vậy B phải chơi H với xác suất 1/2 để A indifferent. Tương tự (game symmetric): p = 1/2.

**Mixed NE**: σ_A = (1/2, 1/2), σ_B = (1/2, 1/2). Expected payoff của A = 0.

**Verify**: E[u_A(H)] = 1·(1/2) + (−1)·(1/2) = 0. E[u_A(T)] = (−1)·(1/2) + 1·(1/2) = 0. ✓ Indifferent.

### 2.3. Walk-through ví dụ 2 — Battle of Sexes

\`\`\`
              Cô: Football (F)    Cô: Opera (O)
Anh: F           (3, 2)             (0, 0)
Anh: O           (0, 0)             (2, 3)
\`\`\`

Đã có 2 NE thuần: (F,F) và (O,O). Nhưng còn 1 NE mixed nữa!

**Tìm mixed NE** (các NE thuần không phải mixed NE vì support chỉ có 1 strategy):

Gọi p = xác suất Anh chọn F; q = xác suất Cô chọn F.

**Để Cô indifferent** (cần tìm p):
\`\`\`
E[u_Cô(F)] = E[u_Cô(O)]
2·p + 0·(1−p) = 0·p + 3·(1−p)
2p = 3 − 3p
5p = 3
p = 3/5
\`\`\`

**Để Anh indifferent** (cần tìm q):
\`\`\`
E[u_Anh(F)] = E[u_Anh(O)]
3·q + 0·(1−q) = 0·q + 2·(1−q)
3q = 2 − 2q
5q = 2
q = 2/5
\`\`\`

**Mixed NE thứ 3**: σ_Anh = (3/5 Football, 2/5 Opera), σ_Cô = (2/5 Football, 3/5 Opera).

**Verify**: E[u_Anh(F)] = 3·(2/5) = 6/5. E[u_Anh(O)] = 2·(3/5) = 6/5. ✓

**Lưu ý quan trọng**: Ở mixed NE, payoff mỗi bên = 6/5 = 1.2 — thấp hơn cả hai NE thuần (3 hoặc 2). Mixed NE là kết quả "không phối hợp được" — kém hơn bất kỳ NE thuần nào.

### 2.4. Walk-through ví dụ 3 — Game 2×2 asymmetric

\`\`\`
              B: Left (L)    B: Right (R)
A: Up (U)       (4, 2)         (0, 3)
A: Down (D)     (1, 0)         (3, 4)
\`\`\`

**Kiểm tra NE thuần**:
- (U,L): A lệch D? 1<4 ✓; B lệch R? 3>2 → B muốn lệch ✗ → không phải NE.
- (U,R): A lệch D? 3>0 → A muốn lệch ✗.
- (D,L): A lệch U? 4>1 → A muốn lệch ✗.
- (D,R): A lệch U? 0<3 ✓; B lệch L? 0<4 ✓ → **(D,R) là NE thuần**.

→ Game có NE thuần (D,R). Còn NE mixed không?

Để B indifferent (tìm p):
\`\`\`
E[u_B(L)] = E[u_B(R)]
2p + 0(1−p) = 3p + 4(1−p)
2p = 3p + 4 − 4p
2p = −p + 4
3p = 4
p = 4/3 > 1 → không hợp lệ!
\`\`\`

→ Không có mixed NE với full-support. Chỉ có NE thuần (D,R).

> ❓ **Câu hỏi tự nhiên**:
> - "Vì sao p > 1 nghĩa là không có mixed NE?" → Xác suất phải ∈ [0,1]. Nếu giải ra p > 1 hoặc p < 0, không tồn tại mixed NE với cả hai strategies trong support. NE thuần tương ứng là NE duy nhất.
> - "Mixed NE có ý nghĩa thực tế không?" → Có! Ví dụ: kiểm tra thuế — nếu nhà nước kiểm tra cố định, người nộp thuế thích đúng ngày đó; nếu ngẫu nhiên, người nộp thuế phải honest vì không đoán được. Police patrol tương tự — random deterrence. Bỏ phiếu của swing voter trong election.

### 2.5. Walk-through ví dụ 4 — Rock-Paper-Scissors

\`\`\`
              B: R         B: P         B: S
A: R         (0, 0)       (−1,+1)      (+1,−1)
A: P         (+1,−1)      (0, 0)       (−1,+1)
A: S         (−1,+1)      (+1,−1)      (0, 0)
\`\`\`

Zero-sum, symmetric, 3 strategies. Không có NE thuần. Tìm mixed NE symmetric: σ_A = σ_B = (r, p, s) với r+p+s=1.

Để A indifferent giữa R, P, S — cần B chơi (r, p, s) sao cho:
\`\`\`
E[u_A(R)] = E[u_A(P)] = E[u_A(S)]
0·r + (−1)·p + 1·s = 1·r + 0·p + (−1)·s = (−1)·r + 1·p + 0·s
\`\`\`

Từ E[u_A(R)] = E[u_A(P)]: −p + s = r − s → r = 2s − p
Từ E[u_A(P)] = E[u_A(S)]: r − s = −r + p → 2r = p + s → 2r = 1 − r → 3r = 1 → r = 1/3
Suy ra: r = p = s = 1/3. **Mixed NE duy nhất**: cả hai chơi (1/3, 1/3, 1/3).

> ⚠ **Lỗi thường gặp**: Nhiều người nghĩ "mixed NE là khi mỗi người chọn ngẫu nhiên vì không có chiến lược tốt". Sai — người chơi **cố tình** chọn xác suất cụ thể để làm đối phương indifferent. Đây là chiến lược khéo léo, không phải ngẫu nhiên vô nghĩa. Nếu bạn chơi 40% R, 35% P, 25% S thay vì (1/3,1/3,1/3), đối phương có thể exploit bạn bằng cách tăng P.

---

## 3. Định lý Nash 1950 — Tồn tại NE trong mọi game hữu hạn

**Phát biểu**: Mọi game hữu hạn (finite players, finite strategies) có **ít nhất một Nash Equilibrium** (thuần hoặc mixed).

**Ý tưởng chứng minh** (không đầy đủ):
1. Mở rộng strategy space sang mixed strategies → "best response correspondence" BR: Δ(S) → Δ(S) (từ tập xác suất sang tập xác suất).
2. BR là upper-hemicontinuous convex-valued correspondence trên compact convex set.
3. Áp dụng **Kakutani's Fixed Point Theorem**: tồn tại σ* sao cho σ* ∈ BR(σ*) — tức là mọi player đang best-respond → đây là NE.

**Tại sao cần fixed point?** NE là trạng thái "tự tham chiếu": chiến lược của tôi là best response cho chiến lược của bạn, và ngược lại. Cấu trúc này chính xác là fixed point của correspondence BR.

*(Bằng chứng đầy đủ cần giải tích hàm và topology — học sau trong graduate game theory.)*

> 📝 **Tóm tắt**:
> - **Mixed strategy**: phân phối xác suất trên strategies. Mở rộng không gian game.
> - **Indifference principle**: ở mixed NE, mỗi player indifferent giữa strategies trong support — chính xác suất **của đối phương** tạo ra sự vô sai biệt này.
> - **Nash 1950**: mọi finite game có ≥ 1 NE (thuần hoặc mixed).
> - Mixed NE thường cho payoff thấp hơn NE thuần (ví dụ BoS).
> - Ứng dụng: random deterrence, kiểm tra thuế, poker strategy.

---

## Bài tập

1. Tìm mixed NE của Chicken: (S,S)=(0,0), (D,D)=(−10,−10), (S,D)=(−1,1), (D,S)=(1,−1). Gọi p = xác suất Row chọn S. Tính p và expected payoff tại mixed NE.

2. Game 2×2:
   \`\`\`
                B: L     B: R
   A: U        (5, 1)   (0, 4)
   A: D        (2, 3)   (3, 0)
   \`\`\`
   (a) Tìm NE thuần nếu có. (b) Tìm mixed NE nếu có.

3. Trong Matching Pennies, nếu Row biết Column sẽ chơi Heads với xác suất 0.7 (không phải 0.5), Row nên làm gì? Giải thích tại sao mixed NE yêu cầu q = 0.5 chính xác.

4. Rock-Paper-Scissors biến thể: thêm strategy "Lizard" với payoffs: Lizard beats Spock, Scissors beats Lizard... (dùng RPS chuẩn nhưng tăng payoff Rock thắng Scissors lên +2 thay vì +1). Mixed NE đối xứng có còn là (1/3,1/3,1/3) không? Phân tích định tính.

## Lời giải chi tiết

### Bài 1

Gọi p = xác suất Row chọn S. Để Column indifferent giữa S và D:

\`\`\`
E[u_Col(S)] = E[u_Col(D)]
0·p + (−1)·(1−p) = 1·p + (−10)·(1−p)
−1 + p = p − 10 + 10p
−1 + p = 11p − 10
9 = 10p
p = 9/10
\`\`\`

Tương tự (game symmetric): q = 9/10.

**Mixed NE**: Row chọn S với p = 9/10, D với 1/10. Column tương tự.

Expected payoff Row:
\`\`\`
E[u_Row(S)] = 0·(9/10) + (−1)·(1/10) = −1/10 = −0.1
E[u_Row(D)] = 1·(9/10) + (−10)·(1/10) = 9/10 − 1 = −1/10 ✓
\`\`\`

Expected payoff = −0.1 mỗi bên (rất gần 0 — gần như "ok" hơn là thảm họa −10).

**Nhận xét**: p = 9/10 = 0.9 cao — hầu hết thời gian cả hai swerve. Hợp lý: trong thực tế Chicken, xác suất "điên" (D) phải đủ nhỏ vì hậu quả (D,D) quá tệ.

### Bài 2

**(a) Kiểm tra NE thuần**:
- (U,L)=(5,1): B lệch R? 4>1 → B muốn lệch ✗.
- (U,R)=(0,4): A lệch D? 3>0 → A muốn lệch ✗.
- (D,L)=(2,3): A lệch U? 5>2 → A muốn lệch ✗.
- (D,R)=(3,0): A lệch U? 0<3 ✓; B lệch L? 3>0 → B muốn lệch ✗.

Không có NE thuần.

**(b) Mixed NE**: Gọi p = P(Row=U), q = P(Col=L).

Để Col indifferent (tìm p):
\`\`\`
E[u_Col(L)] = E[u_Col(R)]
1·p + 3·(1−p) = 4·p + 0·(1−p)
p + 3 − 3p = 4p
3 − 2p = 4p
3 = 6p → p = 1/2
\`\`\`

Để Row indifferent (tìm q):
\`\`\`
E[u_Row(U)] = E[u_Row(D)]
5q + 0(1−q) = 2q + 3(1−q)
5q = 2q + 3 − 3q
5q = −q + 3
6q = 3 → q = 1/2
\`\`\`

**Mixed NE**: σ_Row = (1/2 U, 1/2 D), σ_Col = (1/2 L, 1/2 R).

Expected payoff Row = 5·(1/2) + 0·(1/2) = 2.5 (khi Row chọn U, Col indifferent với q=1/2).

### Bài 3

Nếu Column chơi Heads với q = 0.7:
\`\`\`
E[u_Row(H)] = (+1)·0.7 + (−1)·0.3 = 0.4
E[u_Row(T)] = (−1)·0.7 + (+1)·0.3 = −0.4
\`\`\`

→ E[u_Row(H)] > E[u_Row(T)] → Row nên **luôn chọn H** (pure strategy H, không random).

**Tại sao mixed NE yêu cầu q = 0.5**: Chỉ khi q = 0.5, E[u_Row(H)] = E[u_Row(T)] → Row indifferent → Row mới sẵn lòng randomize. Nếu q ≠ 0.5, Row có best response thuần → "mixed strategy" của Row không thể là equilibrium (Row sẽ exploit). Indifference là điều kiện bắt buộc để equilibrium tồn tại.

### Bài 4

Nếu tăng payoff Rock thắng Scissors lên +2: Rock được "thưởng" hơn khi thắng Scissors so với Paper thắng Rock hay Scissors thắng Paper.

Symmetric NE cần tất cả strategies cho cùng expected payoff. Với payoff không đối xứng:

\`\`\`
E[u(Rock)] = 0·r + (−1)·p + 2·s
E[u(Paper)] = 1·r + 0·p + (−1)·s
E[u(Scissors)] = (−1)·r + 1·p + 0·s
\`\`\`

Đặt E[u(R)] = E[u(P)] = E[u(S)]:
- R=P: −p + 2s = r − s → r + p − 3s = 0
- P=S: r − s = −r + p → 2r − p − s = 0
- Kết hợp với r+p+s = 1: giải ra r ≠ p ≠ s.

Từ hệ phương trình: Scissors ít được chơi hơn vì Rock "punish" nó mạnh hơn. **Mixed NE sẽ không còn là (1/3,1/3,1/3)** — Rock sẽ có xác suất thấp hơn để bù đắp cho ưu thế tăng của nó.

---

## Bài tiếp theo

[Lesson 04: Extensive Form & SPE](../lesson-04-extensive-form-spe/README.md) — Khi players hành động **tuần tự** (không đồng thời): game tree, backward induction, subgame perfect equilibrium.

## Tham khảo

- Tadelis, *Game Theory: An Introduction*, Chương 7-8.
- Watson, *Strategy*, Chương 9-11.
- Nash, J. (1950). "Equilibrium points in n-person games." *PNAS* 36(1): 48–49.
- Dixit & Skeath, *Games of Strategy*, Chương 7.
`;
