# Lesson 01: Strategic-form games — Trò chơi dạng chuẩn

> **Tầng 1 — Game Theory Foundations · PoliticalScience**

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Biểu diễn bất kỳ tình huống chiến lược nào dưới dạng **payoff bimatrix** (ma trận lợi ích).
- Đọc và diễn giải **4 game kinh điển**: Prisoner's Dilemma, Stag Hunt, Chicken, Battle of Sexes.
- Phân biệt **zero-sum** vs **general-sum**, **symmetric** vs **asymmetric**, **cooperative** vs **non-cooperative**.
- Xác định player set N, strategy space Sᵢ, payoff function uᵢ cho game bất kỳ.
- Nhận ra pattern "tốt cho cá nhân ≠ tốt cho tập thể" trong PD — nền tảng mọi nghiên cứu chính trị.

## Kiến thức tiền đề

- Không có — đây là bài đầu tiên của lĩnh vực.
- Khái niệm xác suất cơ bản sẽ cần từ L03 trở đi.

---

## 1. Vì sao cần mô hình hóa tình huống chiến lược?

> 💡 **Trực giác**: Hãy tưởng tượng hai quốc gia đang quyết định có nên giải trừ quân bị không. Nếu cả hai đều giải trừ, chi phí quốc phòng giảm, cả hai hưởng lợi. Nhưng nếu một bên giải trừ còn bên kia không — bên giải trừ trở nên yếu thế. Vậy **quyết định tối ưu của tôi phụ thuộc vào quyết định của bạn** — đây là tình huống **chiến lược** (strategic situation). Game theory là công cụ phân tích chính xác loại tình huống này.

Tình huống chiến lược khác tình huống quyết định đơn lẻ (ví dụ: tối ưu hóa chi phí sản xuất) ở chỗ: **kết quả phụ thuộc vào hành động của nhiều bên cùng lúc**. Bạn không thể tối ưu hóa "một mình" — phải dự đoán đối phương làm gì.

**Ứng dụng chính trị thực tế**:
- Hai đảng chọn chính sách kinh tế: mỗi đảng nhìn đối thủ trước khi quyết định.
- Các quốc gia đàm phán hiệp ước khí hậu: ai chịu chi phí trước?
- Ứng viên tranh cử chọn vị thế trên trục tả-hữu (sẽ học kỹ ở T2).

---

## 2. Định nghĩa hình thức: Trò chơi dạng chuẩn (Normal-form game)

### 2.1. Ba thành phần cốt lõi

Một **normal-form game** (hay strategic-form game) được định nghĩa bởi bộ ba:

```
G = (N, {Sᵢ}ᵢ∈N, {uᵢ}ᵢ∈N)
```

**(a) Là gì**:
- **N = {1, 2, ..., n}**: tập players (người chơi). Ví dụ N = {Row, Column} cho game 2 người.
- **Sᵢ**: không gian chiến lược (strategy space) của player i — tập tất cả hành động có thể chọn.
- **uᵢ: S₁ × S₂ × ... × Sₙ → ℝ**: hàm lợi ích (payoff function) của player i — ánh xạ mỗi tổ hợp chiến lược sang một số thực (lợi ích của i).

**(b) Vì sao cần**: Biểu diễn hình thức giúp so sánh các game khác nhau, chứng minh tính chất chung (ví dụ: mọi game hữu hạn có NE — Nash 1950), và lập trình thuật toán tìm cân bằng.

**(c) Ví dụ trực giác**: Trong PD (Prisoner's Dilemma), N = {Nghi phạm A, Nghi phạm B}, Sᵢ = {Cooperate (C), Defect (D)}, và payoff là số năm tù (âm = xấu).

### 2.2. Payoff bimatrix — đọc như thế nào?

Với game 2 người, ta dùng **bimatrix** (ma trận đôi): mỗi ô chứa cặp (a, b) trong đó **a = payoff của Row, b = payoff của Column**.

```
                Column
                Left (L)     Right (R)
Row   Up (U)   (3, 1)       (0, 2)
      Down (D) (1, 0)       (2, 3)
```

Đọc: nếu Row chọn Up và Column chọn Left → Row nhận 3, Column nhận 1. Nếu Row chọn Down và Column chọn Right → Row nhận 2, Column nhận 3.

> ⚠ **Lỗi thường gặp**: Nhiều người đọc nhầm thứ tự — luôn nhớ **(Row, Column)**. Phần tử đầu LUÔN là payoff của người chơi hàng (Row).

---

## 3. Bốn game kinh điển

### 3.1. Prisoner's Dilemma (PD) — Song đề của tù nhân

> 💡 **Trực giác**: Hai nghi phạm bị bắt và thẩm vấn riêng biệt — không thể liên lạc. Mỗi người có thể "khai" (Defect) hoặc "im lặng" (Cooperate). Lời khai của anh ta ảnh hưởng đến cả hai.

**Payoff matrix** (số năm tù, âm = tồi hơn; ta dùng payoff dương = "lợi ích", âm = "thiệt"):

```
                 Nghi phạm B
                 Cooperate (C)    Defect (D)
Nghi phạm A  C   (-1, -1)         (-10,  0)
             D   ( 0, -10)        ( -5, -5)
```

**Đọc từng ô**:
- (C, C): Cả hai im lặng → cả hai chỉ bị 1 năm tù (nhẹ vì thiếu bằng chứng).
- (D, D): Cả hai khai → cả hai bị 5 năm (nặng hơn).
- (C, D): A im lặng, B khai → A bị 10 năm, B được thả (0 năm).
- (D, C): A khai, B im lặng → A được thả, B bị 10 năm.

**Nghịch lý**: (C, C) = (-1, -1) tốt hơn (D, D) = (-5, -5) cho cả hai, nhưng cả hai sẽ chọn D. Tại sao? Vì **bất kể B làm gì, A luôn tốt hơn khi chọn D** (và ngược lại). Đây là lý do PD quan trọng — nó giải thích vì sao **tập thể duy lý có thể đạt kết quả kém cho tất cả**.

**Ứng dụng chính trị**: Chạy đua vũ trang (cả hai nước đều vũ trang dù cả hai đều thích giải trừ), bảo hộ thương mại, đàm phán khí hậu COP.

### 3.2. Stag Hunt — Trò chơi phối hợp

> 💡 **Trực giác**: Hai thợ săn có thể cùng săn hươu (Stag) — cần cả hai — hoặc mỗi người tự săn thỏ (Hare). Hươu ngon hơn nhiều, nhưng chỉ bắt được khi có cả hai. Thỏ thì ai cũng tự bắt được.

```
               Thợ săn B
               Stag (S)    Hare (H)
Thợ săn A  S   (4, 4)      (0, 3)
           H   (3, 0)      (2, 2)
```

**Đặc điểm**: Có **hai Nash equilibria** (cân bằng Nash):
- (S, S) = (4, 4): cả hai hợp tác → kết quả tốt nhất.
- (H, H) = (2, 2): cả hai an toàn → kết quả "xấu hơn nhưng ổn định".

Nếu B chọn S, A nên chọn S (4 > 3). Nếu B chọn H, A nên chọn H (2 > 0).

**Không có dominance** như PD — kết quả phụ thuộc vào **kỳ vọng** (expectation) về đối phương làm gì. Đây là **coordination game**: vấn đề không phải là xung đột lợi ích mà là **phối hợp**.

**Ứng dụng**: Hình thành liên minh quốc tế, áp dụng chuẩn kỹ thuật chung (IEEE, ISO), cam kết cải cách thể chế.

### 3.3. Chicken / Hawk-Dove — Trò chơi anti-coordination

> 💡 **Trực giác**: Hai lái xe phóng thẳng vào nhau. Ai né trước ("Swerve") là "gà" (chicken). Nếu cả hai không né — tai nạn thảm khốc. Lợi thế thuộc về người **không né** — nhưng chỉ khi đối phương né.

```
              Player B
              Swerve (S)    Drive (D)
Player A  S   (0,  0)      (-1,  1)
          D   (1, -1)      (-10,-10)
```

**Đặc điểm**: Hai NE ở pure strategy: (S, D) và (D, S) — **không ai muốn làm cùng điều đối phương làm**. Đây là **anti-coordination game**. Khác PD ở chỗ: ở PD cả hai đều muốn D bất kể đối phương làm gì; ở Chicken, bạn muốn làm ngược với đối phương.

**Ứng dụng**: Khủng hoảng tên lửa Cuba 1962, "chicken game" tranh chấp biên giới, filibuster trong Quốc hội Mỹ, đàm phán "cliff edge" Brexit.

### 3.4. Battle of the Sexes — Trò chơi phối hợp bất đối xứng

> 💡 **Trực giác**: Một cặp đôi muốn đi chơi cùng nhau nhưng sở thích khác nhau: anh thích bóng đá, cô thích opera. Cả hai thích ở cùng nhau hơn là đi riêng, nhưng mỗi người muốn đến nơi mình thích hơn.

```
              Cô (Column)
              Football (F)    Opera (O)
Anh (Row)  F   (3, 2)         (0, 0)
           O   (0, 0)         (2, 3)
```

**Đọc**: Anh thích Football hơn (anh nhận 3 nếu cả hai đi Football, 2 nếu cả hai đi Opera). Cô thích Opera hơn (cô nhận 3 nếu cả hai đi Opera, 2 nếu cả hai đi Football). Nếu đi khác nhau — cả hai nhận 0 (chán khi ở một mình).

**Hai NE pure**: (F, F) = (3, 2) và (O, O) = (2, 3). Cả hai đồng ý "đi cùng nhau" nhưng không đồng ý "đi đâu". Khác Stag Hunt ở chỗ: ở Stag Hunt cả hai đều thích (S,S) hơn (H,H); ở BoS mỗi người thích NE khác nhau.

**Ứng dụng**: Chọn chuẩn kỹ thuật (HDVD vs Blu-Ray), phân công vai trò trong liên minh chính trị, đàm phán hiệp ước nơi các bên có lợi ích khác nhau nhưng đều muốn có thỏa thuận.

---

## 4. Phân loại game

> ❓ **Câu hỏi tự nhiên**:
> - "Zero-sum là gì? Tất cả game chính trị có phải zero-sum không?" → Không. Zero-sum nghĩa là tổng payoff của tất cả players bằng hằng số (thường = 0): một người thắng đúng bằng người kia thua. Ví dụ: poker (tiền không tạo ra hay mất đi, chỉ chuyển tay). PD, Stag Hunt, BoS đều là **general-sum** — tổng payoff thay đổi theo profile chiến lược. Chính trị thường là general-sum vì hợp tác tạo ra giá trị thêm.
> - "Symmetric nghĩa là gì?" → Payoff của player i không đổi khi hoán vị vai trò. PD và Matching Pennies là symmetric; BoS là asymmetric (anh và cô có sở thích khác nhau).
> - "Cooperative game theory khác gì?" → Non-cooperative (học trong khóa này): mỗi player quyết định độc lập, không có hợp đồng binding. Cooperative game theory (học sau): players có thể hình thành liên minh với hợp đồng enforce được.

### Bảng phân loại 4 game kinh điển

| Game | Zero-sum? | Symmetric? | # NE pure | Vấn đề cốt lõi |
|------|-----------|------------|-----------|----------------|
| Prisoner's Dilemma | Không | Có | 1 (D,D) | Social dilemma: cá nhân vs tập thể |
| Stag Hunt | Không | Có | 2: (S,S),(H,H) | Coordination: kỳ vọng về đối phương |
| Chicken | Không | Có | 2: (S,D),(D,S) | Anti-coordination: ai nhượng bộ? |
| Battle of Sexes | Không | Không | 2: (F,F),(O,O) | Phối hợp bất đối xứng |

> 📝 **Tóm tắt mục 4**:
> - Hầu hết game chính trị là **general-sum** — hợp tác có thể tạo giá trị thêm.
> - **Symmetric**: đổi vai không đổi cấu trúc game. **Asymmetric**: players có quyền lực/sở thích khác nhau.
> - Số lượng NE phụ thuộc vào cấu trúc game — sẽ học cách tìm NE hệ thống ở L02-L03.

---

## 5. Ví dụ số mở rộng — tạo payoff matrix từ mô tả ngôn ngữ

**Kỹ năng quan trọng**: Chuyển mô tả "lợi ích" thành số.

**Ví dụ 1** — Hai công ty quyết định có quảng cáo không:

Mỗi công ty bỏ 2 triệu để quảng cáo. Nếu cả hai quảng cáo: thị phần không đổi (tốn tiền vô ích), mỗi công ty lời 3 triệu. Nếu chỉ A quảng cáo: A giành thêm thị phần, A lời 7 triệu, B lời 1 triệu. Nếu không ai quảng cáo: cả hai lời 5 triệu.

```
                    Công ty B
                    Quảng cáo    Không quảng cáo
Công ty A  Quảng cáo   (3, 3)        (7, 1)
           Không q.cáo (1, 7)        (5, 5)
```

→ Đây là PD! (Không quảng cáo ứng với "Cooperate", Quảng cáo ứng với "Defect".)

**Ví dụ 2** — Hai đảng chọn chính sách: "Cải cách" hay "Giữ nguyên":

Nếu cả hai cải cách: chính sách tốt, cả hai được cử tri ủng hộ (+3 mỗi bên). Nếu chỉ một bên cải cách: bên đó bị chỉ trích vì "thay đổi rủi ro" (−1), bên kia trông có vẻ "ổn định" (+4). Nếu không bên nào cải cách: đình trệ, cả hai bị chỉ trích (−1 mỗi bên).

```
              Đảng B
              Cải cách    Giữ nguyên
Đảng A  C     (3, 3)      (-1, 4)
        G     (4, -1)     (-1, -1)
```

→ Cũng là PD! "Giữ nguyên" dominates "Cải cách" cho cả hai → kết quả là đình trệ dù cả hai thích (Cải cách, Cải cách).

> 🔁 **Dừng lại tự kiểm tra**:
> 1. Trong Stag Hunt (S=4, H=2), nếu A biết chắc B sẽ chọn H, A nên chọn gì?
> <details><summary>Đáp án</summary>A nên chọn H: payoff(H|B=H) = 2 > payoff(S|B=H) = 0. Khi B chọn Hare, Stag trở thành vô ích vì cần cả hai để bắt hươu.</details>
> 2. Bimatrix sau là game gì? (a) (2,2) (0,3) / (3,0) (1,1) — Đây có phải PD không?
> <details><summary>Đáp án</summary>Có — đây là PD. Với Row: D (hàng dưới) cho 3 khi C đối face, và 1 khi D đối face; C (hàng trên) cho 2 khi C và 0 khi D đối face. D dominate C cho Row (3>2 và 1>0). Tương tự cho Column. NE = (D,D) = (1,1), nhưng (C,C) = (2,2) tốt hơn.</details>

---

## 6. Ứng dụng: Đọc game từ tình huống thực

**Ví dụ 3 — Đàm phán thương mại**: Mỹ và EU đàm phán thuế quan.

Mỹ và EU mỗi bên có thể "Giảm thuế" (Free Trade, FT) hay "Giữ bảo hộ" (Protect, P). Lợi ích:
- (FT, FT): GDP tăng ở cả hai: Mỹ +5, EU +4.
- (P, P): Chiến tranh thương mại: Mỹ +1, EU +1.
- (FT, P): Mỹ mở cửa nhưng EU đóng: Mỹ −2 (bị thiệt), EU +6.
- (P, FT): EU mở cửa nhưng Mỹ đóng: Mỹ +6, EU −2.

```
         EU
         Free Trade    Protect
Mỹ  FT    (5, 4)       (-2, 6)
    P     (6, -2)       (1, 1)
```

Phân tích: Với Mỹ — nếu EU chọn FT: P > FT (6 > 5); nếu EU chọn P: P > FT (1 > −2). → P **dominates** FT cho Mỹ. Tương tự EU. → NE = (P, P) = (1, 1). Nhưng (FT, FT) = (5, 4) tốt hơn cho cả hai. → **PD** trong thương mại quốc tế!

> ⚠ **Lỗi thường gặp**: Khi thấy "hai bên đều thiệt hơn nếu không hợp tác" người ta hay kết luận "vậy họ sẽ hợp tác". Sai! Cấu trúc incentive (lợi ích cá nhân) mới quyết định kết quả, không phải mong muốn chung.

---

## Bài tập

1. Vẽ payoff bimatrix cho tình huống sau: Hai ứng viên A và B tranh cử. Mỗi người có thể đầu tư vào "Negative Campaigning" (NC) hay "Positive Campaigning" (PC). Nếu cả hai NC: cả hai tốn 3 triệu, tỷ lệ phiếu không đổi (mỗi người +0). Nếu chỉ A NC: A tăng 5 điểm phần trăm phiếu, B mất 5 điểm. Nếu không ai NC: cả hai giữ nguyên tỷ lệ phiếu, tiết kiệm chi phí (+2 mỗi bên). Giả sử payoff = điểm phần trăm phiếu + tiết kiệm chi phí (quy ra cùng đơn vị).

2. Trong Chicken game: (S,S)=(0,0), (D,D)=(−10,−10), (S,D)=(−1,1), (D,S)=(1,−1). Nếu Row biết chắc Column sẽ chọn D, Row nên làm gì? Nếu biết chắc Column chọn S?

3. Tạo một payoff matrix 2×2 (tự đặt số) sao cho: (a) là zero-sum game, (b) không có NE pure (hint: Matching Pennies). Verify bằng cách kiểm tra: với mỗi ô, xem liệu cả hai players có muốn lệch không.

4. Phân loại 3 game sau vào đúng loại (PD / Stag Hunt / Chicken / BoS / khác):
   - (a): (5,5) (0,4) / (4,0) (2,2)
   - (b): (3,1) (0,0) / (0,0) (1,3)
   - (c): (2,2) (−5,3) / (3,−5) (−3,−3)

## Lời giải chi tiết

### Bài 1

Định nghĩa payoff: payoff = (thay đổi % phiếu) − (chi phí, quy = 3 đơn vị nếu NC, 0 nếu PC).

Nếu A chọn NC, B chọn NC: A tốn 3, +0 điểm phiếu → net = −3. B tốn 3, +0 → net = −3.
Nếu A chọn NC, B chọn PC: A tốn 3, +5 điểm → net = +2. B không tốn, −5 điểm → net = −5.
Nếu A chọn PC, B chọn NC: A không tốn, −5 điểm → net = −5. B tốn 3, +5 điểm → net = +2.
Nếu A chọn PC, B chọn PC: cả hai không tốn, không đổi phiếu, tiết kiệm → net = +2 mỗi bên.

```
              B
              NC          PC
A   NC   (-3, -3)     (2, -5)
    PC   (-5,  2)     (2,  2)
```

Đây là **PD**: Với A — nếu B chọn NC: NC > PC (−3 > −5); nếu B chọn PC: NC = PC (2 = 2) hoặc NC > PC trong biến thể khác. → NC weakly dominates PC. NE = (NC, NC) = (−3, −3) dù (PC, PC) = (2, 2) tốt hơn cho cả hai.

*(Lưu ý: tùy cách quy đổi chi phí, có thể ra PD rõ hơn nếu payoff (PC,NC) = −5 và (NC,PC) = +2 rõ ràng hơn equality.)*

### Bài 2

Nếu Column chọn D: Row so sánh payoff(S, D) = −1 vs payoff(D, D) = −10 → **S tốt hơn** (−1 > −10). Row chọn S.

Nếu Column chọn S: Row so sánh payoff(S, S) = 0 vs payoff(D, S) = 1 → **D tốt hơn** (1 > 0). Row chọn D.

→ Row muốn làm **ngược** với Column: D khi Column chọn S, S khi Column chọn D. Đây là anti-coordination.

### Bài 3

**Zero-sum game ví dụ** (Matching Pennies):

```
              Column
              Heads (H)    Tails (T)
Row   H      (+1, −1)     (−1, +1)
      T      (−1, +1)     (+1, −1)
```

Verify: tổng payoff mỗi ô = 0 → zero-sum. ✓

Không có NE pure: Nếu ô (H,H) = (+1,−1): Column muốn lệch sang T (−1 → +1). Ô (H,T) = (−1,+1): Row muốn lệch sang T (−1 → +1). Ô (T,T) = (+1,−1): Column muốn lệch sang H. Ô (T,H) = (−1,+1): Row muốn lệch sang H. → Vòng tròn, không có ô ổn định → không có NE pure. ✓

### Bài 4

**(a) (5,5) (0,4) / (4,0) (2,2)**: Hai NE: (5,5) và (2,2). Cả hai đồng ý thích (5,5) hơn. → **Stag Hunt** (S=5 tương ứng row/col 1, H=2 tương ứng row/col 2).

**(b) (3,1) (0,0) / (0,0) (1,3)**: Hai NE: (3,1) và (1,3). Row thích NE đầu, Column thích NE sau. → **Battle of the Sexes**.

**(c) (2,2) (−5,3) / (3,−5) (−3,−3)**: Với Row — nếu Col chọn L: D > C (3 > 2); nếu Col chọn R: D > C (−3 > −5). D dominates. Tương tự Col. NE = (D,D) = (−3,−3), nhưng (C,C) = (2,2) tốt hơn. → **Prisoner's Dilemma**.

---

## Bài tiếp theo

[Lesson 02: Dominance & Nash Equilibrium](../lesson-02-dominance-nash/README.md) — Học cách tìm cân bằng Nash một cách có hệ thống: dominance, IESDS, best response.

## Tham khảo

- *Game Theory: An Introduction* — Steven Tadelis (Cambridge, 2013), Chương 3-4.
- *Strategy: An Introduction to Game Theory* — Joel Watson (Norton, 2013), Chương 2-4.
- *An Introduction to Game Theory* — Martin Osborne (Oxford, 2004), Chương 1-2.
- Dixit, Skeath, Reiley: *Games of Strategy* — ví dụ chính trị phong phú.
