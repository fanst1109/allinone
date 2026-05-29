# Lesson 02: Dominance & Nash Equilibrium

> **Tầng 1 — Game Theory Foundations · PoliticalScience**

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Xác định **strict dominance** và **weak dominance** trong payoff matrix bất kỳ.
- Thực hiện **IESDS** (Iterated Elimination of Strictly Dominated Strategies) từng bước.
- Tính **best response correspondence** BRᵢ(s₋ᵢ) cho mọi chiến lược đối phương.
- Tìm **Nash equilibrium thuần (pure NE)** từ giao của best response.
- Phân biệt: game có NE duy nhất / nhiều NE / không có NE thuần (→ cần mixed, học L03).

## Kiến thức tiền đề

- **Lesson 01**: payoff bimatrix, 4 game kinh điển, player set / strategy space / payoff function.

---

## 1. Dominance — Chiến lược thống trị

> 💡 **Trực giác**: Trong Prisoner's Dilemma, bất kể đối phương làm gì, bạn luôn tốt hơn khi Defect. Đây là "chiến lược thống trị" — một lựa chọn luôn tốt hơn mọi lựa chọn khác, không phụ thuộc đối phương. Người chơi duy lý sẽ KHÔNG BAO GIỜ chọn chiến lược bị thống trị.

### 1.1. Strict dominance (thống trị nghiêm ngặt)

**Định nghĩa**: Chiến lược sᵢ *strictly dominates* sᵢ' nếu:

```
uᵢ(sᵢ, s₋ᵢ) > uᵢ(sᵢ', s₋ᵢ)   với MỌI s₋ᵢ ∈ S₋ᵢ
```

Có nghĩa: sᵢ cho payoff cao hơn sᵢ' bất kể đối phương làm gì. Người chơi duy lý sẽ loại bỏ sᵢ' khỏi cân nhắc.

**Walk-through ví dụ 1 — Prisoner's Dilemma** (PD):

```
              B: Cooperate (C)    B: Defect (D)
A: C              (−1, −1)          (−10, 0)
A: D              ( 0, −10)         (−5, −5)
```

Kiểm tra A: D có strictly dominates C không?
- Nếu B chọn C: payoff(D) = 0 > payoff(C) = −1 ✓
- Nếu B chọn D: payoff(D) = −5 > payoff(C) = −10 ✓

→ D **strictly dominates** C cho A. Tương tự cho B (game symmetric). → Loại C của cả hai → còn lại (D, D) = NE duy nhất.

**Walk-through ví dụ 2 — Game 2×2 đơn giản**:

```
              B: Left (L)    B: Right (R)
A: Up (U)        (4, 1)          (2, 3)
A: Down (D)      (1, 0)          (3, 2)
```

Kiểm tra A: U vs D?
- Nếu B=L: payoff(U)=4 > payoff(D)=1 ✓
- Nếu B=R: payoff(U)=2 < payoff(D)=3 ✗

→ U **không** strictly dominates D (thất bại ở B=R). Không có strict dominance cho A trong game này.

### 1.2. Weak dominance (thống trị yếu)

**Định nghĩa**: sᵢ *weakly dominates* sᵢ' nếu:

```
uᵢ(sᵢ, s₋ᵢ) ≥ uᵢ(sᵢ', s₋ᵢ)   với MỌI s₋ᵢ
uᵢ(sᵢ, s₋ᵢ) > uᵢ(sᵢ', s₋ᵢ)   với ÍT NHẤT MỘT s₋ᵢ
```

**Ví dụ 3 — Weak dominance**:

```
              B: Left    B: Right
A: Up            (3, 2)     (2, 1)
A: Down          (3, 0)     (1, 1)
```

Kiểm tra A: Up vs Down?
- B=L: payoff(Up) = 3 = payoff(Down) = 3 (tie, không strict)
- B=R: payoff(Up) = 2 > payoff(Down) = 1 ✓

→ Up **weakly dominates** Down. A nên chọn Up.

> ⚠ **Lỗi thường gặp**: Nhiều người nghĩ "nếu hai chiến lược cho cùng payoff ở một trường hợp thì không có dominance". Sai — weak dominance cho phép tie ở một số trường hợp, miễn là strict ở ít nhất một trường hợp và không bao giờ thua. Strict dominance yêu cầu tốt hơn ở **mọi** tình huống.

> ❓ **Câu hỏi tự nhiên**:
> - "Tại sao phân biệt strict và weak quan trọng?" → IESDS chỉ hoạt động tốt với strict dominance. Loại bỏ weak dominated strategies có thể xóa một số NE thật — phải cẩn thận. Strict IESDS luôn an toàn: NE còn lại sau IESDS là NE của game gốc.
> - "Có thể cả hai strategy cùng dominant không?" → Không thể — nếu sᵢ dominant sᵢ', sᵢ' không thể dominant sᵢ (vì strict inequality đảo chiều).

---

## 2. IESDS — Iterated Elimination of Strictly Dominated Strategies

**Ý tưởng**: Loại bỏ chiến lược bị strictly dominated một vòng → game nhỏ hơn → lại kiểm tra dominance mới → lặp lại cho đến khi không còn gì bị dominated. Kết quả là tập chiến lược *rationalizable*.

**Tính chất**: Thứ tự loại không quan trọng — kết quả cuối cùng như nhau (uniqueness of IESDS outcome với strict dominance).

### Walk-through ví dụ 4 — Game 3×3 IESDS từng bước

```
Game ban đầu:
              B: L     B: M     B: R
A: T (Top)   (4, 3)   (2, 7)   (0, 4)
A: M (Mid)   (5, 3)   (5, 5)   (3, 3)
A: B (Bot)   (6, 3)   (4, 3)   (2, 3)
```

**Vòng 1 — Kiểm tra dominance cho A**:

So sánh T vs M: T cho (4,2,0) khi B=(L,M,R); M cho (5,5,3). Tại mọi cột: 5>4, 5>2, 3>0 → **M strictly dominates T** cho A.

So sánh B vs M: B cho (6,4,2); M cho (5,5,3). Tại B=M: payoff(Bot)=4 < payoff(Mid)=5 → Bot không strictly dominates Mid.

→ **Loại T** (bị dominated bởi M).

```
Sau vòng 1 (loại T):
              B: L     B: M     B: R
A: M (Mid)   (5, 3)   (5, 5)   (3, 3)
A: B (Bot)   (6, 3)   (4, 3)   (2, 3)
```

**Vòng 2 — Kiểm tra dominance cho B** (trong game thu nhỏ):

B nhìn từ góc của Column: payoff Column ở mỗi cột khi A=Mid: (3,5,3); khi A=Bot: (3,3,3).

M cho Column payoff 5 (nếu A=Mid) hoặc 3 (nếu A=Bot). L cho 3,3. R cho 3,3.

Với A=Mid: payoff(M)=5 > payoff(L)=3 và payoff(M)=5 > payoff(R)=3.
Với A=Bot: payoff(M)=3 = payoff(L)=3 = payoff(R)=3.

→ M **weakly** dominates L và R, không strictly. Không loại được qua strict IESDS.

→ IESDS kết thúc sau vòng 1. Game được rút xuống 2×3 — A chỉ cần xem Mid hoặc Bot. **IESDS không giải được hoàn toàn game này** — cần best response analysis để tìm NE.

> ❓ **Câu hỏi tự nhiên**:
> - "Nếu IESDS cho kết quả duy nhất, đó có phải NE không?" → Có, luôn luôn. Nếu IESDS hội tụ về (s₁*, ..., sₙ*) duy nhất thì đó là NE duy nhất của game.
> - "IESDS có thể xóa một NE không?" → Với *strict* dominance: không bao giờ. Với weak dominance: có thể. Đây là lý do ta ưu tiên strict IESDS.

---

## 3. Best Response và Nash Equilibrium

### 3.1. Best response correspondence

**Định nghĩa**: Best response của player i khi đối thủ chơi s₋ᵢ:

```
BRᵢ(s₋ᵢ) = argmax_{sᵢ ∈ Sᵢ} uᵢ(sᵢ, s₋ᵢ)
```

Nghĩa: tập tất cả chiến lược của i cho payoff cao nhất khi đối phương chơi s₋ᵢ.

**Walk-through ví dụ 5 — Stag Hunt**:

```
              B: Stag (S)    B: Hare (H)
A: Stag (S)    (4, 4)          (0, 3)
A: Hare (H)    (3, 0)          (2, 2)
```

BR của A:
- Khi B=S: payoff(S)=4 > payoff(H)=3 → BR_A(S) = {Stag}
- Khi B=H: payoff(S)=0 < payoff(H)=2 → BR_A(H) = {Hare}

BR của B (symmetric game):
- Khi A=S: BR_B(S) = {Stag}
- Khi A=H: BR_B(H) = {Hare}

### 3.2. Nash Equilibrium thuần (pure strategy NE)

**Định nghĩa**: Profile chiến lược s* = (s₁*, s₂*, ..., sₙ*) là Nash Equilibrium (NE) nếu:

```
sᵢ* ∈ BRᵢ(s₋ᵢ*)   với mọi i ∈ N
```

Diễn giải: không ai muốn đơn phương lệch khỏi s*. Mỗi player đang chơi best response với chiến lược của người khác.

**Cách tìm NE**: Một ô (r, c) là NE khi và chỉ khi:
1. **Row không muốn lệch**: payoff của Row tại (r,c) ≥ payoff của Row tại mọi ô khác trong cột c.
2. **Column không muốn lệch**: payoff của Column tại (r,c) ≥ payoff của Column tại mọi ô khác trong hàng r.

**Walk-through ví dụ 6 — Tìm NE trong Stag Hunt**:

Kiểm tra (S,S)=(4,4):
- A lệch sang H: payoff A = 3 < 4 → A không muốn lệch ✓
- B lệch sang H: payoff B = 3 < 4 → B không muốn lệch ✓
→ (S,S) là NE ✓

Kiểm tra (H,H)=(2,2):
- A lệch sang S: payoff A = 0 < 2 → A không muốn lệch ✓
- B lệch sang S: payoff B = 0 < 2 → B không muốn lệch ✓
→ (H,H) là NE ✓

Kiểm tra (S,H)=(0,3):
- A lệch sang H: payoff A = 2 > 0 → A muốn lệch ✗
→ (S,H) không phải NE ✗

Kiểm tra (H,S)=(3,0):
- B lệch sang H: payoff B = 2 > 0 → B muốn lệch ✗
→ (H,S) không phải NE ✗

**Kết quả**: Stag Hunt có 2 NE thuần: (S,S) và (H,H). (S,S) Pareto-tốt hơn nhưng rủi ro hơn nếu không chắc đối phương hợp tác.

**Walk-through ví dụ 7 — Game có NE duy nhất nhưng không qua dominance**:

```
              B: Left    B: Right
A: Up           (3, 3)     (1, 2)
A: Down         (2, 1)     (2, 2)
```

Kiểm tra dominance A: Up vs Down?
- B=L: 3 > 2 ✓; B=R: 1 < 2 ✗ → không có strict dominance.

Kiểm tra dominance B: Left vs Right?
- A=U: 3 > 2 ✓; A=D: 1 < 2 ✗ → không có strict dominance.

IESDS không loại được gì. Nhưng kiểm tra NE:
- (U,L)=(3,3): A lệch sang D? payoff A=2<3 ✗ không muốn lệch. B lệch sang R? payoff B=2<3 ✗ không muốn lệch. → **(U,L) là NE** ✓
- (U,R)=(1,2): A lệch sang D? payoff A=2>1 → A muốn lệch ✗.
- (D,L)=(2,1): B lệch sang R? payoff B=2>1 → B muốn lệch ✗.
- (D,R)=(2,2): A lệch sang U? payoff A=1<2 ✗. B lệch sang L? payoff B=1<2 ✗. → **(D,R) là NE** ✓

Game có 2 NE dù không có dominance!

> 🔁 **Dừng lại tự kiểm tra**:
> 1. Game: (3,3)(0,2)/(2,0)(1,1). Tìm tất cả NE.
> <details><summary>Đáp án</summary>Kiểm tra (U,L)=(3,3): A lệch D→2<3 ✓; B lệch R→2<3 ✓ → NE ✓. Kiểm tra (D,R)=(1,1): A lệch U→0<1 ✓; B lệch L→0<1 ✓ → NE ✓. Hai NE: (U,L) và (D,R). Game giống Stag Hunt!</details>
> 2. Trong PD: D strictly dominates C. Sau khi loại C của cả hai bằng IESDS, còn lại gì? Đó có phải NE của game gốc không?
> <details><summary>Đáp án</summary>Sau khi loại C, còn lại duy nhất (D,D). Đây là NE của game gốc: payoff(D,D)=(−5,−5); A lệch sang C→(−10)< −5 ✗ không muốn lệch; tương tự B. Vậy (D,D) vừa là kết quả IESDS vừa là NE duy nhất.</details>

---

## 4. Tóm tắt — Quy trình phân tích game

**Bước 1**: Vẽ payoff matrix đầy đủ.

**Bước 2**: Kiểm tra strict dominance — loại chiến lược bị dominated (IESDS).

**Bước 3**: Tìm best response của mỗi player với mỗi chiến lược đối phương.

**Bước 4**: Tìm NE = giao của best responses (ô mà cả hai đều đang best response).

**Bước 5**: Nếu không có NE thuần → chuyển sang mixed strategy (L03).

> 📝 **Tóm tắt mục 4**:
> - **Strict dominance**: sᵢ tốt hơn sᵢ' ở mọi tình huống. Người duy lý không bao giờ chọn chiến lược bị strictly dominated.
> - **IESDS**: loại dần → kết quả không đổi theo thứ tự. Nếu hội tụ về 1 ô → đó là NE duy nhất.
> - **Nash equilibrium**: không ai muốn đơn phương lệch. Không phải "tốt nhất cho tất cả" — là "ổn định cá nhân".
> - Game có thể có 0, 1, hoặc nhiều NE thuần. Nếu 0 → luôn có ít nhất 1 NE mixed (Nash 1950, học L03).
> - NE không nhất thiết là kết quả tốt nhất (PD: NE=(D,D) tệ hơn (C,C)).

---

## Bài tập

1. Tìm tất cả strictly dominated strategies và NE thuần trong game sau:
   ```
                 B: L      B: M      B: R
   A: T (Top)   (2, 4)    (1, 2)    (4, 3)
   A: M (Mid)   (3, 3)    (3, 3)    (2, 1)
   A: B (Bot)   (1, 2)    (2, 2)    (3, 4)
   ```

2. Thực hiện IESDS đầy đủ cho game 3×3 sau và tìm NE:
   ```
                 B: L      B: C      B: R
   A: T          (6, 1)   (2, 5)    (3, 3)
   A: M          (3, 4)   (4, 4)    (5, 2)
   A: B          (1, 6)   (3, 3)    (2, 4)
   ```

3. Trong Chicken: (S,S)=(0,0),(D,D)=(−10,−10),(S,D)=(−1,1),(D,S)=(1,−1). Tìm tất cả NE thuần. Có dominated strategy nào không?

4. Chứng minh: trong bất kỳ game symmetric 2×2 nào có NE (D,D) = (a,a) và (C,C) = (b,b) với b > a, nếu D strictly dominates C thì đây là PD. Đưa ra điều kiện cần và đủ về payoffs.

## Lời giải chi tiết

### Bài 1

Game 3×3 (payoffs cho Row):
T: 2, 1, 4 (khi B=L,M,R). M: 3, 3, 2. B: 1, 2, 3.

Kiểm tra dominance A:
- M vs T: 3>2 (L) ✓, 3>1 (M) ✓, 2<4 (R) ✗ → M không dominate T.
- T vs B: 2>1 (L) ✓, 1<2 (M) ✗ → T không dominate B.
- M vs B: 3>1 (L) ✓, 3>2 (M) ✓, 2<3 (R) ✗ → M không strictly dominate B.

Kiểm tra dominance B (payoffs Column): T: 4,2,3; M: 3,3,1; B: 2,2,4.
- Khi A=T: L>M>R (4>2>3? sai — 4>3>2). Thực ra: L=4, M=2, R=3. → L tốt nhất khi A=T.
- Khi A=M: L=3, M=3, R=1. L và M tie, R tệ nhất.
- Khi A=B: L=2, M=2, R=4. R tốt nhất.

Kiểm tra R vs M cho B: A=T: R=3 > M=2 ✓; A=M: R=1 < M=3 ✗ → không dominate.

Không có strict dominance. Tiếp tục tìm NE trực tiếp:

Tính BR_A và BR_B:
- BR_A(L): max(2,3,1)=3 → A=M. BR_A(M): max(1,3,2)=3 → A=M. BR_A(R): max(4,2,3)=4 → A=T.
- BR_B(T): max(4,2,3)=4 → B=L. BR_B(M): max(3,3,1)=3 → B=L hoặc M. BR_B(B): max(2,2,4)=4 → B=R.

Candidate NE (giao BR):
- (M, L): BR_A(L)=M ✓; BR_B(M)={L,M} → L ✓ → **(M,L) là NE** → payoff (3,3).
- (T, R): BR_A(R)=T ✓; BR_B(T)=L → R ✗ → không phải NE.

Kiểm tra thêm: (M,M)=(3,3): BR_A(M)=M ✓; BR_B(M)={L,M} → M ✓ → **(M,M) là NE** → payoff (3,3).

**Kết quả**: Hai NE: (M,L)=(3,3) và (M,M)=(3,3).

### Bài 2

Payoffs Row: T=(6,2,3); M=(3,4,5); B=(1,3,2).
Payoffs Col: T=(1,5,3); M=(4,4,2); B=(6,3,4).

IESDS vòng 1 — kiểm tra Row:
- M vs B: M=(3,4,5), B=(1,3,2). Tại L: 3>1 ✓; M: 4>3 ✓; R: 5>2 ✓ → **M strictly dominates B**. Loại B.

Sau loại B:
```
       B: L    B: C    B: R
A: T   (6,1)  (2,5)   (3,3)
A: M   (3,4)  (4,4)   (5,2)
```

IESDS vòng 2 — kiểm tra Column (trong game mới):
Payoffs Col: T=(1,5,3); M=(4,4,2).
- Khi A=T: C=5 > L=1, C=5 > R=3 → C best khi A=T.
- Khi A=M: L=4 = C=4 > R=2 → L,C tie best khi A=M.

L vs R: A=T: 1<3 (L tệ hơn R ở A=T). Vậy R vs L: A=T: R=3>L=1 ✓; A=M: R=2<L=4 ✗ → không dominate.
C vs L: A=T: C=5>L=1 ✓; A=M: C=4=L=4 (tie) → C weakly dominates L, nhưng không strictly.
C vs R: A=T: 5>3 ✓; A=M: 4>2 ✓ → **C strictly dominates R**. Loại R.

Sau loại R:
```
       B: L    B: C
A: T   (6,1)  (2,5)
A: M   (3,4)  (4,4)
```

IESDS vòng 3 — Row:
T vs M: L: 6>3 ✓; C: 2<4 ✗ → không dominate.
M vs T: L: 3<6 ✗ → không dominate.

IESDS vòng 3 — Col:
C vs L: A=T: 5>1 ✓; A=M: 4=4 (tie) → C weakly dominates L (không strictly).

IESDS dừng. Tìm NE trong game 2×2 còn lại:
- BR_A(L): max(6,3)=6 → T. BR_A(C): max(2,4)=4 → M.
- BR_B(T): max(1,5)=5 → C. BR_B(M): max(4,4)=4 → L hoặc C.

NE candidates:
- (T, C)=(2,5): BR_A(C)=M ✗ → A muốn lệch sang M.
- (M, L)=(3,4): BR_A(L)=T ✗ → A muốn lệch sang T.
- (M, C)=(4,4): BR_A(C)=M ✓; BR_B(M)={L,C} → C ✓ → **(M, C) là NE** ✓

**Kết quả**: NE duy nhất là (M, C) = (4, 4).

### Bài 3

Chicken: (S,S)=(0,0), (S,D)=(−1,1), (D,S)=(1,−1), (D,D)=(−10,−10).

Kiểm tra dominance Row:
- D vs S: B=S: 1>0 ✓; B=D: −10 < −1 ✗ → D không dominate S.
- S vs D: B=S: 0<1 ✗ → S không dominate D.
→ **Không có dominated strategy** trong Chicken.

Tìm NE:
- (S,S)=(0,0): Row lệch D → 1>0 → Row muốn lệch ✗ → không phải NE.
- (S,D)=(−1,1): Row lệch D → −10 < −1 → Row không muốn lệch ✓; Col lệch S → 0>1? Sai, 0<1 → Col không muốn lệch ✓ → **(S,D) là NE**.
- (D,S)=(1,−1): Row lệch S → 0<1 → Row không muốn lệch ✓; Col lệch D → −10 < −1 → Col không muốn lệch ✓ → **(D,S) là NE**.
- (D,D)=(−10,−10): Row lệch S → −1 > −10 → Row muốn lệch ✗ → không phải NE.

**Kết quả**: Hai NE thuần: (S,D) và (D,S). Không có dominated strategy.

### Bài 4

**Điều kiện PD trong symmetric 2×2 game**:

Gọi game symmetric với strategies {C, D}:
```
       C      D
C   (b, b)  (s, t)
D   (t, s)  (a, a)
```

Với b > a (giả thiết bài cho).

D strictly dominates C cho Row khi:
- Khi Col=C: payoff(D)=t > payoff(C)=b → **t > b**
- Khi Col=D: payoff(D)=a > payoff(C)=s → **a > s**

→ Điều kiện cần và đủ để D strictly dominates C (và game là PD): **t > b > a > s**.

Giải thích: t = temptation (thưởng khi đơn phương defect), b = reward of mutual cooperation, a = punishment of mutual defect, s = sucker's payoff (thiệt khi đơn phương cooperate). PD ⟺ t > b > a > s.

---

## Bài tiếp theo

[Lesson 03: Mixed Strategies & Minimax](../lesson-03-mixed-strategy/README.md) — Khi không có NE thuần, players randomize. Indifference principle và tính tồn tại NE (Nash 1950).

## Tham khảo

- Tadelis, *Game Theory: An Introduction*, Chương 5-6.
- Watson, *Strategy*, Chương 6-7.
- Osborne & Rubinstein, *A Course in Game Theory* (free online), Chương 2.
