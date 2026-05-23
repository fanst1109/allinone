// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: Economics/Tier2-Microeconomics/lesson-09-game-theory/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 09 — Game Theory (Lý thuyết trò chơi)

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Hiểu **trò chơi (game)** trong kinh tế: tập người chơi + chiến lược + payoff.
- Tìm **chiến lược thống trị (dominant strategy)** và **chiến lược bị thống trị (dominated)**.
- Xác định **cân bằng Nash (Nash equilibrium)** — khái niệm cốt lõi.
- Phân tích **prisoner's dilemma** — vì sao hợp tác khó dù cả hai cùng có lợi nếu hợp tác.
- Hiểu **trò chơi lặp lại** và *tit-for-tat* — cách hợp tác xuất hiện qua thời gian.
- Áp dụng game theory vào: đấu giá, gia nhập thị trường, cartel, hành vi nhà nước.

## Kiến thức tiền đề

- [Lesson 08](../lesson-08-market-structures/): oligopoly, Cournot, Bertrand.

## 1. Các yếu tố của một trò chơi

Một trò chơi cần:

1. **Người chơi (players)**: ai tham gia.
2. **Chiến lược (strategies)**: mỗi người có lựa chọn nào.
3. **Payoff**: kết quả nhận được ứng với mỗi tổ hợp chiến lược.

Trò chơi **đồng thời (simultaneous)**: cùng lúc quyết định, không thấy nước đi của đối thủ.
Trò chơi **tuần tự (sequential)**: lần lượt, có thông tin trước.

## 2. Prisoner's Dilemma

### 2.1. Bài toán

Hai nghi phạm bị bắt, thẩm vấn riêng. Mỗi người có 2 lựa chọn: **khai (Defect)** hoặc **giữ im lặng (Cooperate)**.

| | B Cooperate | B Defect |
|---|---|---|
| **A Cooperate** | (−1, −1) | (−10, 0) |
| **A Defect** | (0, −10) | (−5, −5) |

(Số = năm tù; số đầu = A, số sau = B.)

### 2.2. Phân tích

Với A:
- Nếu B Cooperate: A Cooperate \`→ −1\`, A Defect \`→ 0\`. **Defect tốt hơn**.
- Nếu B Defect: A Cooperate \`→ −10\`, A Defect \`→ −5\`. **Defect tốt hơn**.

→ A có **chiến lược thống trị**: Defect (tốt hơn bất kể B làm gì).

Tương tự với B. → Cả hai đều Defect → kết quả \`(−5, −5)\`.

### 2.3. Nghịch lý

Cả hai cùng Cooperate → \`(−1, −1)\` — *tốt hơn cho cả hai* so với \`(−5, −5)\`. Nhưng *từng cá nhân* không có incentive hợp tác vì sợ bị "phản bội".

Đây là **xung đột giữa lợi ích cá nhân và lợi ích tập thể**.

### 2.4. Ví dụ thực

- **Cartel**: mỗi thành viên có incentive sản xuất quá quota → cartel sập.
- **Vũ khí hạt nhân**: chạy đua vũ trang là Defect-Defect.
- **Quảng cáo**: 2 hãng cùng quảng cáo nhiều → khách phân tán → không ai lợi.
- **Khai thác tài nguyên chung**: tragedy of the commons.

## 3. Nash Equilibrium

### 3.1. Định nghĩa

**Cân bằng Nash** = tổ hợp chiến lược trong đó *không ai có incentive đơn phương thay đổi* — biết chiến lược của người khác, bạn không muốn đổi của mình.

Trong PD: \`(D, D)\` là Nash equilibrium. \`(C, C)\` *không* là — vì cho B Cooperate, A muốn Defect.

### 3.2. Walk-through tìm Nash

| | B Left | B Right |
|---|---|---|
| **A Up** | (3, 2) | (1, 1) |
| **A Down** | (0, 0) | (2, 3) |

- \`(Up, Left)\`: A có muốn đổi? Cho B Left: A Up = 3 > A Down = 0 → không đổi. B có muốn đổi? Cho A Up: B Left = 2 > B Right = 1 → không đổi. **Nash ✓**.
- \`(Down, Right)\`: A: Down = 2 > Up = 1 ✓. B: Right = 3 > Left = 0 ✓. **Nash ✓**.

Trò chơi có thể có *nhiều Nash equilibria*. Đôi khi có cả Nash *hỗn hợp* (mixed) — chơi ngẫu nhiên giữa các chiến lược.

### 3.3. Coordination Games

| | B Tech A | B Tech B |
|---|---|---|
| **A Tech A** | (2, 2) | (0, 0) |
| **A Tech B** | (0, 0) | (3, 3) |

Hai Nash: \`(A, A)\` và \`(B, B)\`. Vấn đề: *làm sao chọn cùng cái nào*? Đây là vấn đề điều phối. Có thể có *Pareto-dominant* equilibrium \`(B, B)\` (cả 2 thích hơn) nhưng nếu thị trường đã quen với A, khó chuyển.

Ví dụ: hệ điều hành (Windows vs Linux), bàn phím (QWERTY vs Dvorak), VHS vs Beta.

## 4. Trò chơi tuần tự — Backward Induction

Trò chơi có thứ tự nước đi → vẽ thành **cây trò chơi**. Giải bằng **backward induction**: bắt đầu từ cuối, tìm nước đi tối ưu, lùi về đầu.

### 4.1. Ví dụ — Entry game

Hãng mới (Entrant) quyết định *gia nhập* thị trường hay không. Nếu gia nhập, hãng hiện hữu (Incumbent) chọn *gây chiến giá* hay *chia thị trường*.

\`\`\`
            Entrant
           /        \\
       Enter        Stay out
        |             |
     Incumbent     (0, 10)
      /     \\
   Fight   Share
  (-2, -1) (3, 3)
\`\`\`

Backward induction:
- Nếu Entrant Enter: Incumbent so Fight (-1) vs Share (3) → chọn Share.
- Entrant biết vậy → Enter cho 3 > Stay out cho 0.

→ Kết quả: \`(Enter, Share)\`, payoff \`(3, 3)\`.

Nhưng Incumbent có thể *commit trước* (xây nhà máy lớn) để đe dọa Fight đáng tin → Entrant không vào. Đây là *credible commitment*.

## 5. Trò chơi lặp lại — Tit-for-Tat

### 5.1. PD lặp lại vô hạn

Nếu PD chỉ chơi 1 lần → Defect-Defect. Nhưng nếu chơi *vô hạn lần* và mỗi người *nhớ* nước đi trước → có thể hợp tác.

Chiến lược **tit-for-tat (TFT)**:

- Vòng 1: Cooperate.
- Vòng \`t+1\`: chơi đúng nước của đối thủ ở vòng \`t\`.

Robert Axelrod (1984) tổ chức giải đấu — TFT đứng đầu. Lý do:
- *Tốt bụng* (bắt đầu hợp tác).
- *Trả thù* (defect lại nếu đối thủ defect).
- *Tha thứ* (quay lại cooperate nếu đối thủ cooperate lại).
- *Đơn giản* (đối thủ hiểu được chiến lược của bạn).

### 5.2. Hợp tác cần điều kiện gì

1. **Trò chơi không có hồi kết** (hoặc không biết khi nào kết thúc).
2. **Discount rate thấp** (coi trọng tương lai).
3. **Có thể quan sát hành vi đối thủ**.
4. **Trả thù đáng tin**.

## 6. Bài tập thực hành

### Bài 1 — Tìm Nash

| | B Yes | B No |
|---|---|---|
| **A Yes** | (4, 4) | (1, 5) |
| **A No** | (5, 1) | (2, 2) |

- (a) Có dominant strategy không?
- (b) Tìm tất cả Nash equilibria.
- (c) Đây có phải prisoner's dilemma không?

### Bài 2 — Game oligopoly

Hai hãng chọn: **Hợp tác** (đặt giá cao) hay **Cạnh tranh** (giảm giá).

| | B Coop | B Compete |
|---|---|---|
| **A Coop** | (10, 10) | (2, 12) |
| **A Compete** | (12, 2) | (4, 4) |

- (a) Tìm Nash.
- (b) Vì sao đây là PD?
- (c) Nếu lặp lại nhiều lần với TFT, kết quả thế nào?

### Bài 3 — Sequential entry

Cây trò chơi:
\`\`\`
           Entrant
          /        \\
       Enter       Stay out (0, 5)
         |
      Incumbent
       /     \\
    Fight    Share
   (-1, 1)  (4, 4)
\`\`\`

- (a) Backward induction.
- (b) Nếu Incumbent có thể commit trước (xây dư công suất) để Fight đáng tin (-1, 1 → -2, 3), kết quả đổi thế nào?

### Bài 4 — Coordination

| | B Standard 1 | B Standard 2 |
|---|---|---|
| **A Standard 1** | (5, 5) | (0, 0) |
| **A Standard 2** | (0, 0) | (3, 3) |

- (a) Tìm Nash.
- (b) Pareto-dominant là gì?
- (c) Nếu thị trường đang ở \`(Standard 2, Standard 2)\` và Standard 1 ra đời, làm sao chuyển?

## 7. Lời giải chi tiết

### Lời giải Bài 1

(a) Với A: cho B Yes, A No (5) > A Yes (4). Cho B No, A No (2) > A Yes (1). **A có dominant strategy: No**. Tương tự B: No. **Cả hai dominant: No**.

(b) Cả 2 cùng No → \`(No, No)\`, payoff \`(2, 2)\`. Đây là Nash duy nhất.

(c) Có PD: cả 2 Yes cho \`(4, 4) > (2, 2)\` nhưng dominant strategy lại là No → bẫy cá nhân-tập thể.

### Lời giải Bài 2

(a) Compete dominates Coop cho cả A và B. → Nash duy nhất \`(Compete, Compete) = (4, 4)\`.

(b) PD: \`(Coop, Coop) = (10, 10) > (Compete, Compete) = (4, 4)\` nhưng cá nhân không chọn được.

(c) Với TFT lặp lại vô hạn, hợp tác có thể duy trì nếu discount rate đủ thấp. Cả 2 chơi Coop mỗi vòng → tổng payoff vô hạn \`10t\` thay vì \`4t\`.

### Lời giải Bài 3

(a) Incumbent đối mặt Enter: Fight (1) vs Share (4) → Share. Entrant: Enter (4) vs Stay (0) → Enter. → \`(Enter, Share) = (4, 4)\`.

(b) Commitment làm Share thành (-2, 3): Incumbent vẫn Fight (1) > Share (-2) → Fight. Entrant biết → Enter (-1) < Stay (0) → Stay out. Incumbent có lợi (5 > 4) — *threat đáng tin* loại bỏ đối thủ.

### Lời giải Bài 4

(a) \`(S1, S1) = (5, 5)\` và \`(S2, S2) = (3, 3)\` đều là Nash (cộng với 1 Nash hỗn hợp).

(b) \`(S1, S1)\` Pareto-dominant — cả 2 thích hơn.

(c) Cần điều phối: chính phủ áp đặt chuẩn mới, ai chuyển trước nhận trợ cấp, hoặc 1 nhà sản xuất lớn (như Apple với USB-C) "kéo" thị trường.

## 8. Liên kết và bài tiếp theo

- **Bài tiếp theo**: [Lesson 10 — Labor & Capital](../lesson-10-labor-capital/).
- **Bài trước**: [Lesson 08 — Market Structures](../lesson-08-market-structures/).
- **Minh họa**: [visualization.html](./visualization.html) — máy tìm Nash, mô phỏng PD lặp lại với TFT.
`;
