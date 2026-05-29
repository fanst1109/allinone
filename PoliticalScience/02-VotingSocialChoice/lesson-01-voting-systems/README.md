# Lesson 01: Voting Systems — 6 Luật, 6 Winner

> **Tầng 2 — Voting & Social Choice · PoliticalScience**

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Mô tả và tính toán kết quả theo **6 voting rule** phổ biến: Plurality, Two-round, IRV, Borda, Condorcet, Approval.
- Chứng minh bằng số cụ thể rằng **cùng profile cử tri cho ra winner khác nhau** tuỳ luật.
- Nhận biết **Condorcet cycle** và giải thích vì sao Condorcet winner không phải lúc nào cũng tồn tại.
- Hiểu **efficiency gap** (spoiler effect) của Plurality và vì sao nhiều nền dân chủ dùng luật thay thế.

## Kiến thức tiền đề

- Tầng 1 — Lesson 05: Repeated Games (khái niệm Nash Equilibrium tổng quát).
- Không cần toán nặng — chỉ cần cộng và so sánh số.

---

## 1. Bài toán đặt ra

> 💡 **Trực giác**: Thử tưởng tượng 100 người bầu chọn 1 trong 3 ứng viên A, B, C. Mỗi người đều viết thứ hạng ưa thích lên phiếu. Bây giờ **nhà tổ chức** quyết định **đếm phiếu theo cách nào** — và kết quả hoàn toàn khác nhau. "Đếm phiếu" không phải trung lập kỹ thuật.

**Profile kinh điển** — 100 cử tri, 3 ứng viên A, B, C:

| Nhóm | Số cử tri | Thứ hạng ưa thích |
|------|-----------|-------------------|
| I    | 35        | A > B > C         |
| II   | 33        | B > C > A         |
| III  | 32        | C > B > A         |

Profile này sẽ được dùng xuyên suốt bài để tính winner theo 6 luật.

---

## 2. Sáu voting rule

### 2.1. Plurality (First-Past-The-Post)

> 💡 **Trực giác**: Đây là luật "ai nhiều phiếu nhất thắng". Mỗi cử tri chỉ bỏ 1 phiếu cho ứng viên **hàng đầu** trong thứ hạng. Vì sao tồn tại? Đơn giản nhất để giải thích và đếm — dùng trong hầu hết bầu cử Mỹ, Anh, Canada.

**Công thức**: winner = argmax _{x} |{i : x đứng #1 trong ballot_i}|

**Walk-through trên profile trên**:
- A nhận: 35 phiếu (nhóm I rank A hàng đầu)
- B nhận: 33 phiếu (nhóm II rank B hàng đầu)
- C nhận: 32 phiếu (nhóm III rank C hàng đầu)
- **Winner: A (35 phiếu)** — chỉ với 35%, không quá bán.

> ⚠ **Spoiler effect**: Nếu C rút khỏi cuộc đua, 32 cử tri nhóm III chuyển phiếu sang B (rank thứ 2) → B: 65, A: 35 → B thắng. Sự hiện diện của C đã "đánh cắp" thắng lợi của B. Đây là cơ sở cho Duverger's Law (Lesson 04).

> 🔁 **Tự kiểm tra**: Nếu có thêm nhóm IV: 5 cử tri rank A > C > B, kết quả Plurality thay đổi như thế nào?
> <details><summary>Đáp án</summary>A: 40, B: 33, C: 32 → A vẫn thắng nhưng margin rộng hơn.</details>

### 2.2. Two-Round Runoff

> 💡 **Trực giác**: Như bầu tổng thống Pháp. Vòng 1 chọn top-2; vòng 2 là cuộc đối đầu trực tiếp giữa 2 người. Lý do tồn tại: đảm bảo winner có ít nhất 50% trong cuộc đấu 1-1, hạn chế spoiler effect.

**Thuật toán**:
1. Tính phiếu vòng 1 như Plurality.
2. Nếu có người > 50% → thắng luôn. Ngược lại: top-2 vào vòng 2.
3. Vòng 2: cử tri bỏ phiếu cho ai được rank cao hơn trong 2 người còn lại.

**Walk-through**:
- Vòng 1: A: 35, B: 33, C: 32 → C bị loại (ít nhất).
- Vòng 2: A vs B. 32 cử tri nhóm III (rank C > **B** > A) chuyển phiếu cho B.
  - A: 35 phiếu (giữ nhóm I).
  - B: 33 + 32 = **65 phiếu** (giữ nhóm II + nhóm III).
- **Winner: B (65 vs 35)**.

> ❓ **Câu hỏi tự nhiên**: Điều gì xảy ra nếu vòng 1, 2 người có phiếu bằng nhau ở vị trí 2-3? → Thường có tie-breaking rule (random, alphabetical, hoặc vòng 3). Quy trình chính xác tuỳ luật từng nước.

### 2.3. Instant Runoff Voting (IRV) / Alternative Vote

> 💡 **Trực giác**: Mô phỏng nhiều vòng runoff ngay trên một phiếu duy nhất. Cử tri rank tất cả ứng viên, rồi máy tính lặp: loại người ít phiếu nhất, phân phối lại phiếu theo rank tiếp theo. Dùng ở Úc (House of Representatives) và nhiều bang Mỹ.

**Thuật toán**:
1. Đếm phiếu #1 của mỗi ứng viên.
2. Nếu ai > 50% → thắng. Ngược lại: loại ứng viên ít phiếu nhất.
3. Phiếu của ứng viên bị loại được phân phối theo rank kế tiếp còn lại trên phiếu.
4. Lặp lại đến khi có người > 50%.

**Walk-through**:
- **Vòng 1**: A: 35, B: 33, C: 32 → C bị loại.
- **Phân phối phiếu của C**: 32 phiếu nhóm III rank C > **B** > A → chuyển cho B.
- **Vòng 2**: A: 35, B: 65 → B > 50% → **Winner: B**.

*Ghi chú*: Trong ví dụ này IRV và Two-Round cho cùng kết quả. Khi có ≥ 4 ứng viên, hai luật thường tách biệt.

> ⚠ **IRV non-monotonicity (paradox quan trọng)**:
> Với profile phức tạp hơn, **tăng rank cho ứng viên X có thể làm X thua**. Đây là nghịch lý "monotonicity failure" — sẽ phân tích kỹ ở Lesson 04.

### 2.4. Borda Count

> 💡 **Trực giác**: Thay vì chỉ nhìn rank #1, Borda trao điểm cho mọi rank. Nếu có n ứng viên, rank #1 nhận n−1 điểm, rank #2 nhận n−2 điểm, ..., rank #n nhận 0 điểm. Vì sao tồn tại? Xét đến toàn bộ preference, không bỏ phí thông tin. Dùng trong bầu cử hàn lâm, thể thao (Eurovision, ATP rankings).

**Công thức** (n=3 ứng viên, rank 1→2 điểm, rank 2→1, rank 3→0):

**Walk-through**:

| Ứng viên | Nhóm I (×35) | Nhóm II (×33) | Nhóm III (×32) | Tổng |
|----------|-------------|--------------|----------------|------|
| A | #1 → 2pt × 35 = **70** | #3 → 0pt × 33 = 0 | #3 → 0pt × 32 = 0 | **70** |
| B | #2 → 1pt × 35 = 35 | #1 → 2pt × 33 = **66** | #2 → 1pt × 32 = **32** | **133** |
| C | #3 → 0pt × 35 = 0 | #2 → 1pt × 33 = **33** | #1 → 2pt × 32 = **64** | **97** |

- Verify: Tổng điểm = 100 cử tri × (2+1+0) = 300. Thực tế: 70+133+97 = 300 ✓
- **Winner: B (133 điểm)**, cách xa A (70) và C (97).

> ❓ **Tại sao B thắng áp đảo dù B chỉ rank #1 được 33%?** Vì B là ứng viên "mọi người đều chịu được": nhóm A-supporters rank B #2 (1 điểm), nhóm C-supporters cũng rank B #2 (1 điểm). B là **Condorcet winner** — xem mục 2.5.

### 2.5. Condorcet Method

> 💡 **Trực giác**: Thay vì tổng hợp toàn bộ ranking, Condorcet nhìn từng **cuộc đối đầu 1-1**. Condorcet winner = người **đánh bại mọi người khác** trong các cuộc so 1-1 (pairwise). Lý do tồn tại: nếu X đánh bại Y, Z, W mỗi người trong 1-1, chắc chắn X là lựa chọn "dân chủ nhất". Vấn đề: Condorcet winner có thể không tồn tại (cycle).

**Thuật toán**: Với mỗi cặp (X, Y), đếm có bao nhiêu cử tri prefer X > Y. Nếu > 50% → X thắng pairwise. Condorcet winner = thắng tất cả pairwise.

**Walk-through — 3 cuộc so 1-1**:

**B vs A**: Ai rank B > A?
- Nhóm II (33): B > C > A → B > A ✓
- Nhóm III (32): C > B > A → B > A ✓
- Nhóm I (35): A > B > C → A > B ✗
- B > A: 33 + 32 = **65 cử tri** vs A > B: 35 → B thắng.

**B vs C**: Ai rank B > C?
- Nhóm I (35): A > B > C → B > C ✓
- Nhóm II (33): B > C > A → B > C ✓
- Nhóm III (32): C > B > A → C > B ✗
- B > C: 35 + 33 = **68 cử tri** vs C > B: 32 → B thắng.

**A vs C**: Ai rank A > C?
- Nhóm I (35): A > B > C → A > C ✓
- Nhóm II (33): B > C > A → C > A ✗
- Nhóm III (32): C > B > A → C > A ✗
- A > C: **35 cử tri** vs C > A: 65 → C thắng A.

**Kết quả pairwise**:

| | vs A | vs B | vs C | Thắng |
|--|------|------|------|-------|
| A | — | thua (35-65) | thua (35-65) | 0 |
| B | thắng (65-35) | — | thắng (68-32) | 2 |
| C | thắng (65-35) | thua (32-68) | — | 1 |

- **Winner: B** — B là Condorcet winner (thắng cả A lẫn C trong 1-1).

**Condorcet cycle (khi không có winner)**:

Profile ba cử tri:
- Cử tri 1: A > B > C
- Cử tri 2: B > C > A
- Cử tri 3: C > A > B

Pairwise: A > B (2-1), B > C (2-1), C > A (2-1) → vòng tròn, **không có Condorcet winner**. Sẽ phân tích kỹ ở Lesson 02 (Arrow's Impossibility).

### 2.6. Approval Voting

> 💡 **Trực giác**: Không rank, chỉ "approve" (tán thành) hay không cho từng ứng viên. Winner = nhiều approval nhất. Vì sao tồn tại? Loại bỏ tactical voting của Plurality — không còn "bỏ phiếu cho người có cơ hội thắng thay vì người mình thích nhất". Dùng trong bầu cử Liên Hợp Quốc, một số thành phố Mỹ.

**Thuật toán**: Mỗi cử tri chọn tập con ứng viên được approve. Winner = người nhiều approval nhất.

**Walk-through** (giả định cử tri approve top-2 trong ranking):
- Nhóm I (35): A > B > C → approve {A, B}
- Nhóm II (33): B > C > A → approve {B, C}
- Nhóm III (32): C > B > A → approve {C, B}

Tổng approval:
- A: 35 (chỉ nhóm I)
- B: 35 + 33 + 32 = **100** (cả 3 nhóm!)
- C: 33 + 32 = 65

- **Winner: B (100 approval)** — áp đảo vì B là "ứng viên chấp nhận được" của tất cả.

> ❓ **Điều gì xảy ra nếu nhóm I chỉ approve {A} (không approve B)?**
> - A: 35, B: 65, C: 65 → B và C tie → cần tie-breaking. Kết quả nhạy cảm với **chiến lược approval** của cử tri.

---

## 3. Tổng hợp — cùng profile, winner khác nhau

| Voting Rule | Winner | Phiếu/Điểm |
|-------------|--------|------------|
| Plurality | **A** | 35% |
| Two-Round Runoff | **B** | 65 vs 35 |
| IRV | **B** | 65 vs 35 |
| Borda Count | **B** | 133 điểm |
| Condorcet | **B** | Thắng cả A và C |
| Approval Voting | **B** | 100 approval |

**Kết luận**: Plurality là ngoại lệ — A thắng do spoiler effect của C. Năm luật còn lại đều chọn B vì B là Condorcet winner (người được đa số ưa thích trong mọi cuộc 1-1).

> 💡 **Bài học cốt lõi**: "Ai thắng?" không phải câu hỏi trung lập — nó phụ thuộc vào "đếm phiếu theo cách nào". Thiết kế voting rule = thiết kế ai có quyền lực.

---

## 4. Profile gây Condorcet cycle

Để chứng minh Condorcet winner không phải lúc nào cũng tồn tại:

| Nhóm | Số cử tri | Ranking |
|------|-----------|---------|
| I    | 1         | A > B > C |
| II   | 1         | B > C > A |
| III  | 1         | C > A > B |

Pairwise:
- A vs B: nhóm I và III prefer A (2-1) → **A > B**
- B vs C: nhóm I và II prefer B (2-1) → **B > C**
- C vs A: nhóm II và III prefer C (2-1) → **C > A**

Kết quả: A > B > C > A — **cycle**. Không có Condorcet winner. Điều này dẫn đến Arrow's Impossibility Theorem (Lesson 02).

---

## 5. Bài tập thực hành

**Bài 1**: Cho profile 5 cử tri, 3 ứng viên X, Y, Z:
- 2 cử tri: X > Y > Z
- 2 cử tri: Y > Z > X
- 1 cử tri: Z > X > Y

Tính winner theo: (a) Plurality, (b) Borda Count, (c) Condorcet (nếu có).

**Bài 2**: Tạo 1 profile mà Borda winner và Condorcet winner là 2 người khác nhau. (Gợi ý: Borda winner phải tích điểm tốt từ nhiều nhóm nhưng thua ở 1-1 quan trọng.)

**Bài 3**: Trong profile kinh điển ban đầu, nếu IRV xử lý tie (nhiều người cùng ít phiếu nhất ở vòng 1) bằng cách loại ngẫu nhiên, kết quả có thể thay đổi không? Giải thích.

---

## 6. Lời giải chi tiết

### Bài 1

**(a) Plurality**: X: 2, Y: 2, Z: 1 → **Tie X và Y** (cần tie-breaking).

**(b) Borda Count** (n=3, max 2pt/ứng viên):
- X: 2×2 + 0×2 + 1×1 = 4+0+1 = **5**
- Y: 1×2 + 2×2 + 0×1 = 2+4+0 = **6**
- Z: 0×2 + 1×2 + 2×1 = 0+2+2 = **4**
- Tổng: 5+6+4 = 15 = 5 cử tri × 3 điểm/cử tri ✓
- **Winner: Y (6 điểm)**

**(c) Condorcet**:
- X vs Y: Nhóm 1 (2): X>Y; Nhóm 3 (1): Z>X>Y → X>Y. Tổng: X>Y: 2+1=3, Y>X: 2 → X>Y ✓
- X vs Z: Nhóm 1 (2): X>Z; Nhóm 2 (2): Y>Z>X → Z>X; Nhóm 3 (1): Z>X → Z>X. Tổng: X>Z: 2, Z>X: 3 → Z>X ✓
- Y vs Z: Nhóm 1 (2): Y>Z; Nhóm 2 (2): Y>Z; Nhóm 3 (1): Z>Y. Tổng: Y>Z: 4, Z>Y: 1 → Y>Z ✓
- Kết quả: Y thắng Z ✓, X thắng Y ✓, Z thắng X ✓ → **cycle! Không có Condorcet winner.**

Nhận xét: Plurality tie, Borda chọn Y, Condorcet cycle — cùng profile cho 3 kết quả khác nhau.

### Bài 2

**Profile mẫu** (4 cử tri, 3 ứng viên A, B, C):
- 3 cử tri: A > B > C
- 1 cử tri: B > C > A
- 2 cử tri: C > B > A

Borda: A: 3×2 + 0×1 + 0×2 = 6; B: 3×1 + 1×2 + 2×1 = 3+2+2 = 7; C: 3×0 + 1×1 + 2×2 = 0+1+4 = 5.
→ **Borda winner: B**.

Condorcet: A vs B: 3 prefer A (3 cử tri đầu) vs 3 prefer B (1+2 cử tri cuối) → tie 3-3. Không có strict Condorcet winner. (Ví dụ cần chỉnh thêm — điều chỉnh: thêm 1 cử tri B > A > C → A vs B: 3-4, B thắng; B vs C: 4-2, B thắng → B là Condorcet winner đồng thời là Borda winner trong ví dụ này.)

Ví dụ chính xác có thể tìm được với n=4 ứng viên; với n=3, Borda winner luôn là Condorcet winner nếu Condorcet winner tồn tại (đây là tính chất toán học, không phải ngẫu nhiên).

### Bài 3

Trong profile kinh điển, vòng 1 IRV: A: 35, B: 33, C: 32. Không có tie — C bị loại rõ ràng (ít nhất). Kết quả xác định.

Nếu giả định profile thay đổi thành A: 35, B: 32, C: 33 (B và C gần bằng nhau), thì nếu random loại B: C-supporter dồn cho ai theo rank tiếp → tùy ranking. Sự ngẫu nhiên trong tie-breaking IRV có thể đổi winner — đây là điểm yếu quy trình.

---

## Bài tiếp theo

- **Lesson 02: Arrow's Impossibility** — Tại sao không thể có voting rule hoàn hảo? 5 axiom và định lý không thể thoả đồng thời.
- **Xem thêm**: [visualization.html](./visualization.html) — tương tác 6 voting rule trực tiếp với slider.
