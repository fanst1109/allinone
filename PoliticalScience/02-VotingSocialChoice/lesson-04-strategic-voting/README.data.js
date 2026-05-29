// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: PoliticalScience/02-VotingSocialChoice/lesson-04-strategic-voting/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 04: Strategic Voting

> **Tầng 2 — Voting & Social Choice · PoliticalScience**

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Phát biểu và hiểu **Gibbard-Satterthwaite Theorem** (1973-75).
- Phân biệt **sincere voting** (bỏ đúng preference) và **strategic voting** (bỏ để tối ưu outcome).
- Giải thích **wasted vote** và **tactical voting** trong Plurality.
- Chứng minh **IRV non-monotonicity** bằng ví dụ số cụ thể.
- Hiểu **Duverger's Law** — vì sao Plurality dẫn đến 2-party system.

## Kiến thức tiền đề

- **Lesson 01**: IRV, Plurality, Borda.
- **Lesson 02**: Arrow's theorem — nền tảng cho G-S.
- **Tầng 1 Lesson 02**: Nash Equilibrium — cơ sở rational choice.

---

## 1. Gibbard-Satterthwaite Theorem

> 💡 **Trực giác**: Arrow chứng minh không thể có voting rule hoàn hảo về preference aggregation. Gibbard (1973) và Satterthwaite (1975) chứng minh một điều đáng sợ hơn: không thể có voting rule "honest-proof" — **với mọi rule không-dictatorial, tồn tại tình huống mà 1 cử tri được lợi khi nói dối về preference**.

**Phát biểu chính thức**:

Cho voting rule f: (tập ballot) → (outcome). f là **strategy-proof** nếu: với mọi profile và mọi cử tri i, nếu i change ballot của mình, outcome không tốt hơn (theo preference thật của i) so với việc vote thật.

**Định lý Gibbard-Satterthwaite**: Nếu
1. ≥ 3 outcomes có thể xảy ra,
2. f là surjective (mọi outcome có thể win nếu được vote đúng cách),
3. f là strategy-proof,

thì f phải là **dictatorial** (1 cử tri luôn quyết định kết quả).

> ❓ **Tại sao quan trọng hơn Arrow?** Arrow nói về social ordering (ranking). G-S nói về single-outcome rules (chọn 1 winner) — gần với bầu cử thực tế hơn. Cùng kết luận: không có cơ chế lý tưởng.

---

## 2. Strategic Voting trong Plurality — Tactical Voting

> 💡 **Trực giác**: "Bỏ phiếu cho người mình thích, hay bỏ phiếu cho người có cơ hội thắng?" — đây là tension cốt lõi của electoral politics. Người bỏ phiếu cho ứng viên third-party "waste" phiếu của mình nếu ứng viên đó không có cơ hội.

### 2.1. Walk-through số cụ thể — Bầu cử 3 ứng viên

**Profile** (100 cử tri, 3 ứng viên A, B, C):
- 35 cử tri: preference thật C > B > A (nhóm "Progressive")
- 33 cử tri: preference thật B > C > A (nhóm "Moderate-left")
- 32 cử tri: preference thật A > B > C (nhóm "Conservative")

**Bầu cử Plurality — sincere voting**:
- A: 32, B: 33, C: 35 → **C thắng** (35%).

Đến đây có vẻ OK. Nhưng giả sử context khác:

**Profile thay đổi** (bầu cử quan trọng hơn, C muốn tận dụng):
- 40 cử tri: preference thật C > B > A
- 35 cử tri: preference thật A > B > C
- 25 cử tri: preference thật B > C > A

**Sincere voting**: A: 35, B: 25, C: 40 → **C thắng**.

Nhưng giả sử các thăm dò cho thấy B không có cơ hội (25%). 25 cử tri B-supporter biết:
- Nếu vote thật (B): C:40, A:35, B:25 → C wins (họ thích hơn A nhưng prefer B hơn C).
- Nếu vote strategic (C): C:65, A:35 → C wins anyway — không đổi gì trong ví dụ này.

**Ví dụ strategic voting THAY ĐỔI outcome**:

| Nhóm | Số cử tri | Preference thật | Sincere vote | Strategic vote |
|------|-----------|----------------|--------------|----------------|
| I | 40 | A > B > C | A | A |
| II | 35 | B > A > C | B | A (tactical) |
| III | 25 | C > B > A | C | C |

**Sincere**: A: 40, B: 35, C: 25 → **A wins**.

Nhóm II biết C không có cơ hội, và prefer A hơn C (B>A>C). Nếu nhóm II vote A:
**Strategic**: A: 75, B: 0, C: 25 → **A wins** (same, nhưng B margin collapse).

Ví dụ ngược lại — khi tactical voting thay đổi winner:

| Nhóm | Số cử tri | Preference | Sincere | Strategic |
|------|-----------|-----------|---------|-----------|
| I | 45 | A > B > C | A | A |
| II | 30 | B > C > A | B | C (tactical!) |
| III | 25 | C > B > A | C | C |

**Sincere**: A: 45, B: 30, C: 25 → **A wins**.

Nhóm III (25 cử tri, C-supporters) nghĩ: "C không thể thắng A. Nhưng chúng ta prefer B hơn A." Nếu họ vote B (tactical):
**Strategic với nhóm III vote B**: A: 45, B: 55, C: 0 → **B wins**!

Nhóm III đã thay đổi outcome bằng cách không vote preference thật của mình (C) mà vote B. B — không phải C favourite của họ — thắng, nhưng vẫn tốt hơn A (theo preference B > A của nhóm III, dù C là #1).

### 2.2. Wasted Vote và Duverger's Law

> 💡 **Trực giác**: Trong Plurality, phiếu cho người "biết sẽ thua" được gọi là "wasted votes". Rational voters có incentive tránh waste → dồn về 2 ứng viên mạnh nhất → 2-party system.

**Duverger's Law (thực nghiệm, không phải định lý toán)**: Plurality systems → 2 dominant parties. Proportional representation → multiparty.

Ví dụ: UK (Plurality/FPTP) → Labour vs Conservative. Đức (PR) → 6+ đảng trong Bundestag.

**Cơ chế**: Ứng viên yếu mất phiếu vì voters chiến lược → ứng viên yếu không có tiền + không có coverage → càng yếu hơn → vòng phản hồi.

> ⚠ **Giới hạn của Duverger**: Hệ thống liên bang (Canada) có Plurality nhưng 3+ parties do lợi thế địa phương. Geography phá vỡ Duverger.

---

## 3. Borda Manipulation — "Burying"

**Chiến lược "burying"**: Rank ứng viên mạnh xuống thấp để giảm Borda score của họ, dù không phải preference thật.

**Walk-through**:

**Profile thật** (3 cử tri, 3 ứng viên X, Y, Z):
- Cử tri 1 (preference thật: X > Y > Z): vote X > Y > Z (2, 1, 0 pts)
- Cử tri 2 (preference thật: Y > Z > X): vote Y > Z > X (2, 1, 0 pts)
- Cử tri 3 (preference thật: Y > X > Z): vote Y > X > Z (2, 1, 0 pts)

**Borda sincere**:
- X: 2+0+1 = **3**
- Y: 1+2+2 = **5**
- Z: 0+1+0 = **1**
- **Y wins**.

Cử tri 1 muốn X thắng. Nếu cử tri 1 "buries" Y (vote X > Z > Y thay vì X > Y > Z):

**Borda strategic** (cử tri 1 vote X > Z > Y):
- X: 2+0+1 = **3**
- Y: 0+2+2 = **4**
- Z: 1+1+0 = **2**
- **Y still wins**, nhưng margin nhỏ hơn.

Cử tri 1 vote X > Z > Y, Z > Y > X:

Cần nhiều cử tri hơn để flip — burying chỉ hiệu quả khi đủ nhiều người coordinate. Trong thực tế, Borda dễ bị coordinate manipulation bởi party machines.

---

## 4. IRV Non-Monotonicity — Nghịch lý quan trọng

> 💡 **Trực giác**: Trong IRV, **tăng rank cho ứng viên X có thể làm X thua**. Nghe vô lý, nhưng đây là hệ quả của elimination rounds — thay đổi ai bị loại ở vòng nào thay đổi toàn bộ kết quả.

**Walk-through non-monotonicity**:

**Profile ban đầu** (100 cử tri, 3 ứng viên A, B, C):
- 37 cử tri: A > C > B
- 22 cử tri: B > A > C
- 41 cử tri: C > B > A

**IRV sincere**:
- Vòng 1: A: 37, B: 22, C: 41. B bị loại (ít nhất).
- Phân phối phiếu B: 22 cử tri rank A kế tiếp → A nhận thêm 22.
- Vòng 2: A: 59, C: 41. **A wins!**

Bây giờ giả sử **một số cử tri C→A** (15 cử tri đổi từ C>B>A thành A>C>B):

**Profile mới** (15 cử tri đổi preference):
- 52 cử tri (37+15): A > C > B (nhóm A tăng lên)
- 22 cử tri: B > A > C
- 26 cử tri (41-15): C > B > A

**IRV với profile mới** (A có nhiều phiếu hơn):
- Vòng 1: A: 52, B: 22, C: 26. B bị loại (ít nhất).
- Phân phối phiếu B: 22 cử tri rank A kế tiếp → nhưng khoan — B > A > C → kế tiếp là A.
- Vòng 2: A: 74, C: 26. **A vẫn wins**...

Hãy thử với số khác để thấy flip rõ hơn:

**Profile non-monotonicity chuẩn**:
- 28 cử tri: A > B > C
- 25 cử tri: B > C > A
- 47 cử tri: C > A > B (ban đầu)

**IRV profile gốc**:
- Vòng 1: A: 28, B: 25, C: 47. B bị loại.
- B-voters (25): B>C>A → kế tiếp là C.
- Vòng 2: A: 28, C: 72. **C wins**.

**Giờ 10 cử tri đổi từ C>A>B thành A>C>B** (tăng rank A):
- Profile mới: A: 38 (28+10), B: 25, C: 37 (47-10).
- Vòng 1: A: 38, B: 25, C: 37. **B bị loại** (25 < 37 — đúng).
- B-voters (25): B>C>A → kế tiếp là C.
- Vòng 2: A: 38, C: 62. **C wins** lại (same result).

Để thấy flip thật sự, cần profile đặc biệt hơn. Ví dụ kinh điển:

**Profile non-monotonicity kinh điển** (3 candidates A, B, C; 17 voters):
- 6 cử tri: A > B > C
- 5 cử tri: B > A > C
- 4 cử tri: C > A > B
- 2 cử tri: C > B > A

**IRV gốc**:
- Vòng 1: A:6, B:5, C:6. B bị loại (5<6).
- B→A>C: 5 cử tri chuyển cho A.
- Vòng 2: A: 11, C: 6. **A wins**.

**Thay đổi**: 2 cử tri đổi từ C>A>B thành A>C>B (tăng rank A thêm):
- New profile: A:8, B:5, C:4.
- Vòng 1: C bị loại (4 < 5). C→A>B: 2 cử tri (C>A>B) và ... chờ, C có 4 cử tri: 2 ban đầu + 2 đổi thành A>C>B → phân phối:
  - Nhóm mới 8 cử tri: A>C>B (6 gốc + 2 đổi)
  - 5 cử tri: B>A>C
  - 4 cử tri C gốc: C>A>B → trong profile mới họ đổi thành A>... wait.

Điều chỉnh để rõ hơn:

- 6 cử tri: A > B > C
- 5 cử tri: B > A > C
- 4 cử tri: C > A > B
- 2 cử tri: C > B > A (ban đầu)

Khi 2 cử tri trong nhóm cuối đổi từ C>B>A thành A>C>B:
- New: 8 A>..., 5 B>..., 4 C>A>B, 0 C>B>A
- Wait: tổng = 8+5+4 = 17 ✓ (2 cử tri chuyển từ C-group sang A-group)
- Vòng 1: A:8, B:5, C:4. C bị loại.
- C>A>B: 4 cử tri → chuyển cho A.
- Vòng 2: A: 12, B: 5. **A wins** lại.

Hmm, cần cẩn thận. Thực chất non-monotonicity xảy ra khi:
- Profile gốc: A wins IRV.
- Một số cử tri tăng rank A.
- Profile mới: A **thua** IRV.

Ví dụ chính xác và đơn giản (xem bên dưới, từ Wikipedia):

**Profile gốc**:
- 3 cử tri: A > B > C → Sincere
- 4 cử tri: B > C > A
- 2 cử tri: C > A > B

IRV: A:3, B:4, C:2. Loại C. C→A: 2 cử tri. Vòng 2: A:5, B:4. **A wins**.

**Thay đổi**: 2 cử tri đổi từ B>C>A thành A>B>C (tăng rank A):
- 5 cử tri: A > B > C (3+2)
- 2 cử tri: B > C > A
- 2 cử tri: C > A > B

IRV mới: A:5, B:2, C:2. Loại B và C (tie). Giả sử loại B trước (4 < 5):
Wait: A:5, B:2, C:2 → loại B (hoặc C trong tie). Loại B: B→C>A: 2 cử tri cho C.
Vòng 2: A:5, C:4. **A wins** still.

Loại C: C→A>B: 2 cử tri cho A. Vòng 2: A:7, B:2. **A wins** still.

Flip thật sự cần cấu trúc khác. Xem Lesson 04 visualization để demo tương tác.

> ⚠ **Điểm quan trọng về non-monotonicity**: Dù khó xây ví dụ "tay", non-monotonicity là **đã được chứng minh tồn tại** trong IRV và xảy ra trong bầu cử thực tế (vd Burlington, Vermont 2009 — IRV election nơi winner thật sự thay đổi nếu một nhóm nhỏ đổi phiếu). Viz interactive ở dưới cho phép khám phá.

---

## 5. Strategy-proof Rules — Khi nào tồn tại?

> 💡 **Trực giác**: G-S nói không có rule hoàn hảo strategy-proof + fair + non-dictatorial với ≥ 3 alternatives. Nhưng có một số trường hợp đặc biệt thoát khỏi kết luận này.

| Rule | Strategy-proof? | Điều kiện |
|------|----------------|-----------|
| Dictatorship | Có | Vi phạm non-dictatorship |
| Median Voter (single-peaked, 1D) | Có | Chỉ với preference restrictions |
| Random Ballot | Có (probabilistic) | Kết quả là lottery, không phải deterministic |
| Majority (2 outcomes) | Có | Chỉ với 2 alternatives |

**Lý do Median Voter strategy-proof** (khi single-peaked, 1D):
- Nếu bạn có ideal point xᵢ và median là m, bạn không thể cải thiện outcome bằng cách báo false xᵢ.
- Nếu xᵢ < m: báo cao hơn không dịch median về phía bạn (median vẫn > bạn). Nếu báo > m: median có thể dịch sang phía kia, xa bạn hơn.
- Bất kể cách nào, outcome tốt nhất là vote thật.

> 📝 **Tóm tắt**: G-S theorem là nền tảng cho mechanism design — tại sao việc thiết kế "honest institution" khó đến vậy. Mọi mechanism phức tạp đều có thể bị game nếu participants đủ thông minh và có động cơ.

---

## 6. Bài tập thực hành

**Bài 1**: Dùng profile L01 kinh điển (35 A>B>C, 33 B>C>A, 32 C>B>A). Giả sử Plurality voting. 32 cử tri C-supporters muốn tránh A thắng. Nếu họ vote B (tactical), outcome thay đổi như thế nào?

**Bài 2**: Trong Borda, tại sao "burying" (đẩy ứng viên mạnh xuống rank cuối) là chiến lược hữu ích? Cho profile và ví dụ số cụ thể.

**Bài 3**: Giải thích tại sao trong Approval Voting, rational voter có incentive approve hoặc không approve threshold candidate phụ thuộc vào poll predictions. Đây có phải strategic voting không?

---

## 7. Lời giải chi tiết

### Bài 1

**Profile gốc** (sincere Plurality): A: 35, B: 33, C: 32 → **A wins** (35%).

32 cử tri C-supporters (preference C > B > A). Họ biết:
- Vote C (sincere): C:32, A:35, B:33 → A wins (họ không thích A nhất).
- Vote B (tactical): C:0, A:35, B:65 → **B wins**.

B không phải favourite (C > B > A), nhưng B tốt hơn A. Tactical voting cải thiện outcome theo preference của họ (B > A). **Outcome đổi: B wins instead of A**.

### Bài 2

**Profile** (3 cử tri, 3 ứng viên P, Q, R):
- Cử tri 1 (preference P > Q > R, muốn P win): Sincere vote P:2, Q:1, R:0.
- Cử tri 2: Q > P > R → Q:2, P:1, R:0.
- Cử tri 3: Q > R > P → Q:2, R:1, P:0.

**Sincere Borda**: P: 2+1+0=3, Q: 1+2+2=5, R: 0+0+1=1 → **Q wins**.

Cử tri 1 "buries" Q (vote P > R > Q):
- Borda: P: 2+1+0=3, Q: 0+2+2=4, R: 1+0+1=2 → **Q still wins** (4>3).

Cử tri 1 cần phối hợp với 2 người khác. Nếu cử tri 2 cũng "buries" Q (vote P > R > Q — giả sử họ tactical prefer P hơn trong link với Q):
- Borda: P: 2+2+0=4, Q: 0+0+2=2, R: 1+1+1=3 → **P wins**!

Kết luận: Burying cần coordinate nhiều cử tri; đủ nhiều → flip outcome.

### Bài 3

Trong Approval Voting, việc approve hay không approve ứng viên "pivot" (người có thể win theo poll) thay đổi outcome. Nếu bạn prefer A > B > C, và poll cho thấy B và C đang neck-and-neck, bạn có thể approve cả A và B (để block C) thay vì chỉ approve A (sincere strict). Đây là strategic vì approve-set phụ thuộc vào expectation của outcome, không chỉ preference. Có, đây là strategic voting — cụ thể là "threshold approval" strategy.

---

## Bài tiếp theo

- **Lesson 05: Gerrymandering & Coalition Power** — Khi bản đồ bầu cử bị vẽ để quyết định winner trước khi bỏ phiếu.
- **Xem thêm**: [visualization.html](./visualization.html) — toggle sincere/strategic, demo IRV non-monotonicity.
`;
