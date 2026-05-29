// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: PoliticalScience/02-VotingSocialChoice/lesson-05-gerrymandering-apportionment/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 05: Gerrymandering & Coalition Power

> **Tầng 2 — Voting & Social Choice · PoliticalScience**

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Giải thích **packing** và **cracking** — 2 kỹ thuật gerrymandering chính.
- Tính **efficiency gap** (EG) và diễn giải ý nghĩa.
- Hiểu **Alabama Paradox** trong apportionment và tại sao Hamilton method không ổn định.
- Tính **Shapley-Shubik power index** với walk-through đầy đủ tất cả permutation.
- Phân biệt **quyền lực thực tế** (power index) với **số ghế** trong coalition games.

## Kiến thức tiền đề

- **Lesson 01**: Voting systems, pairwise comparison.
- **Tầng 1 Lesson 01**: Coalitions, N-person games (Shapley value).

---

## 1. Gerrymandering — Vẽ bản đồ để quyết định winner

> 💡 **Trực giác**: Trước khi bỏ phiếu, người vẽ district boundaries có thể quyết định ai thắng. Giống như trong một cuộc thi chia đội, bạn tự sắp xếp đội để đảm bảo thắng. Gerrymandering là "manipulation trước khi bầu cử bắt đầu".

### 1.1. Packing — Dồn cử tri đối thủ vào 1 district

**Định nghĩa**: Tập trung voters của đối thủ vào càng ít district càng tốt → họ thắng lớn trong ít khu nhưng "lãng phí" nhiều phiếu.

**Walk-through** — Grid 8×4 = 32 ô, 16 cử tri Red (R), 16 cử tri Blue (B):

*Layout ban đầu (giả định đan xen đều):*
\`\`\`
R B R B R B R B
B R B R B R B R
R B R B R B R B
B R B R B R B R
\`\`\`

**Chia 4 district theo hàng ngang (compact)**:
- District 1 (hàng 1-2): R:8, B:8 → Tie (hoặc random)
- Kết quả: 2 Red, 2 Blue — proportional.

**Gerrymandering — Pack Blue**:
\`\`\`
District 1 (chia dọc, cột 1-2):
R B | R B R B R B
B R | B R B R B R   →  District 1: R:4, B:4 (cột 1-2, hàng 1-4)
R B |
B R |
\`\`\`

Ví dụ thực tế hơn với phân bố không đều:

**Setup**: 8 cử tri mỗi row, 4 rows, 4 districts:
- Row 1: R R R R R B B B (5R, 3B)
- Row 2: R R R B B B B B (3R, 5B)
- Row 3: R R R R B B B B (4R, 4B)
- Row 4: R R B B B B B B (2R, 6B)

Tổng: 14R, 18B → Blue có 56% phiếu.

**Compact districting (theo hàng)**:
- D1 (row 1): 5R, 3B → **Red wins**
- D2 (row 2): 3R, 5B → **Blue wins**
- D3 (row 3): 4R, 4B → Tie (giả sử Random)
- D4 (row 4): 2R, 6B → **Blue wins**
- Kết quả: ~2 Red, ~2 Blue (proportional với 56% Blue).

**Gerrymandered (Pack + Crack Blue)**:
- D1: Row 1 cột 1-5 + Row 2 cột 1-3: 5+3=8 Red, 0+0=0 Blue → **Red wins** (8-0)
- D2: Row 1 cột 6-8 + Row 4 cột 1-5: 0+2 Red, 3+0 Blue... 

Ví dụ đơn giản hơn để tính EG rõ ràng:

### 1.2. Efficiency Gap — Đo lường gerrymandering

**Định nghĩa**: EG = (Wasted votes R − Wasted votes B) / Total votes.

**Wasted votes**: Phiếu "lãng phí" = (1) phiếu bên thua trong district đó, HOẶC (2) phiếu dư thừa của bên thắng vượt quá số cần thiết (majority).

Công thức: Nếu district có V phiếu, winner có W phiếu, loser có L phiếu:
- Loser wasted: L phiếu (toàn bộ thua).
- Winner wasted: W − ceil(V/2) phiếu (dư quá majority).

**Walk-through** — 4 districts, mỗi district 10 cử tri:

| District | Red | Blue | Winner | Red wasted | Blue wasted |
|----------|-----|------|--------|-----------|------------|
| D1 | 8 | 2 | Red | 8−6=**2** | **2** |
| D2 | 8 | 2 | Red | 8−6=**2** | **2** |
| D3 | 8 | 2 | Red | 8−6=**2** | **2** |
| D4 | 0 | 10 | Blue | **0** | 10−6=**4** |

- Total Red wasted: 2+2+2+0 = **6**
- Total Blue wasted: 2+2+2+4 = **10** — wait, let me recalculate.

D4: Red = 0, Blue = 10. Winner = Blue. Blue wasted = 10 - 6 = 4. Red wasted = 0.

Tổng: Red wasted = 6, Blue wasted = 10. Total votes = 40.

EG = (6 − 10) / 40 = −4/40 = **−0.10** = −10%.

Nghĩa là: Blue "lãng phí" nhiều phiếu hơn Red 10 percentage points → Red lợi thế 10%. |EG| > 7% thường được coi là gerrymandering nghiêm trọng.

**Kết quả seats**: Red wins D1, D2, D3 → **3 ghế** dù chỉ có 24/40 = **60% phiếu**.

> ❓ **Tại sao không chỉ dùng tỷ lệ phiếu = tỷ lệ ghế?** Nhiều hệ thống (winner-takes-all district) không tỷ lệ theo thiết kế — gerrymandering là khai thác feature này. Proportional representation giải quyết được vấn đề nhưng có trade-off khác (fragmentation, instability).

---

## 2. Apportionment Paradox

> 💡 **Trực giác**: Khi chia ghế quốc hội theo dân số, bạn phải làm tròn số từ thập phân. Phương pháp nào cũng có vấn đề — thậm chí tăng tổng ghế có thể làm 1 bang mất ghế.

### 2.1. Hamilton Method

**Thuật toán**:
1. Tính quota: qᵢ = (dân số bang i / tổng dân số) × tổng ghế.
2. Mỗi bang nhận phần nguyên ⌊qᵢ⌋.
3. Phần còn lại (nếu tổng chưa đủ) phân phát theo largest remainder.

**Walk-through** (5 bang, 10 ghế):

| Bang | Dân số | Quota (×10) | Sàn | Phần lẻ |
|------|--------|------------|-----|---------|
| A | 1500 | 3.0 | 3 | 0.0 |
| B | 1200 | 2.4 | 2 | 0.4 |
| C | 800 | 1.6 | 1 | 0.6 |
| D | 300 | 0.6 | 0 | 0.6 |
| E | 200 | 0.4 | 0 | 0.4 |
| **Tổng** | **4000** | **8.0** | 6 ghế | Cần 4 thêm |

Largest remainder: C (0.6), D (0.6), B (0.4), E (0.4). Phân phát 4 ghế: C, D, B, E.

**Kết quả (10 ghế)**: A:3, B:3, C:2, D:1, E:1.

**Alabama Paradox (tăng lên 11 ghế)**:

| Bang | Quota (×11) | Sàn | Phần lẻ |
|------|------------|-----|---------|
| A | 4.125 | 4 | 0.125 |
| B | 3.3 | 3 | 0.3 |
| C | 2.2 | 2 | 0.2 |
| D | 0.825 | 0 | 0.825 |
| E | 0.55 | 0 | 0.55 |
| **Tổng** | | 9 ghế | Cần 2 thêm |

Largest remainder: D (0.825), E (0.55). Phân phát 2 ghế: D, E.

**Kết quả (11 ghế)**: A:4, B:3, C:2, D:1, E:1.

So sánh: Bang B giữ 3 ghế, C giữ 2 ghế. Không có bang nào mất ghế trong ví dụ này. Alabama Paradox xảy ra khi tăng ghế → 1 bang được 11 ghế nhưng bang nào đó lại mất 1 ghế so với 10 ghế.

**Ví dụ Alabama Paradox thực tế** (1880): Với 299 ghế, Alabama có 8 ghế. Tăng lên 300 ghế → Alabama chỉ còn 7 ghế! Xảy ra vì tăng tổng ghế thay đổi quotas và làm đảo thứ tự "largest remainder".

**Webster và Huntington-Hill**: Thay vì largest remainder, dùng rounded quotient (Webster: round tại 0.5; Huntington-Hill: geometric mean). Cả 2 ít bị Alabama Paradox hơn nhưng không hoàn toàn tránh được.

---

## 3. Shapley-Shubik Power Index

> 💡 **Trực giác**: Trong nghị viện, không phải đảng nhiều ghế nhất là đảng có quyền lực nhất. Đảng pivot — đảng mà sự gia nhập của họ tạo ra hoặc phá vỡ majority — có quyền lực thực sự. Shapley-Shubik đo điều này bằng cách đếm bao nhiêu % thứ tự gia nhập mà đảng là "quyết định".

**Định nghĩa**: Cho weighted voting game [q; w₁, w₂, ..., wₙ] (threshold q, parties với w ghế). Với mọi permutation thứ tự gia nhập:
- Tìm **pivot** = đảng đầu tiên làm running total ≥ q.
- Shapley-Shubik của đảng i = (số lần i là pivot) / n!

### 3.1. Walk-through đầy đủ — 3 đảng

**Setup**: A có 45 ghế, B có 35 ghế, C có 20 ghế. Tổng 100 ghế. Threshold q = 51.

**6 permutation** (3! = 6):

| Thứ tự | Running total | Pivot |
|--------|---------------|-------|
| A, B, C | 45 → 80 → 100 | B (45+35=80 ≥ 51, đây là lần đầu total ≥ 51) |
| A, C, B | 45 → 65 → 100 | C (45+20=65 ≥ 51) |
| B, A, C | 35 → 80 → 100 | A (35+45=80 ≥ 51) |
| B, C, A | 35 → 55 → 100 | C (35+20=55 ≥ 51) |
| C, A, B | 20 → 65 → 100 | A (20+45=65 ≥ 51) |
| C, B, A | 20 → 55 → 100 | B (20+35=55 ≥ 51) |

**Đếm pivot**:
- A là pivot: {B,A,C} và {C,A,B} → 2 lần.
- B là pivot: {A,B,C} và {C,B,A} → 2 lần.
- C là pivot: {A,C,B} và {B,C,A} → 2 lần.

**Shapley-Shubik**: A = 2/6 = **1/3**, B = 2/6 = **1/3**, C = 2/6 = **1/3**.

> 💡 **Điều bất ngờ**: Dù A có 45 ghế (nhiều nhất), B có 35, C có 20 — **quyền lực bằng nhau** (1/3 mỗi đảng)! Lý do: với threshold 51, bất kỳ 2 đảng nào kết hợp đều tạo majority (A+B=80, A+C=65, B+C=55 — đều ≥ 51). Không ai là "chắc chắn được hoặc bị loại" → quyền lực đồng đều.

**Kiểm tra**: 1/3 + 1/3 + 1/3 = 1 ✓

### 3.2. Walk-through thứ 2 — Khi quyền lực KHÔNG đồng đều

**Setup**: A có 50 ghế, B có 49 ghế, C có 1 ghế. Threshold q = 51.

**6 permutation**:

| Thứ tự | Running | Pivot |
|--------|---------|-------|
| A, B, C | 50 → 99 → 100 | B (50+49=99 ≥ 51) |
| A, C, B | 50 → 51 → 100 | C (50+1=51 ≥ 51) |
| B, A, C | 49 → 99 → 100 | A (49+50=99 ≥ 51) |
| B, C, A | 49 → 50 → 100 | A (49+1=50 < 51; 50+50=100 ≥ 51 → A) |
| C, A, B | 1 → 51 → 100 | A (1+50=51 ≥ 51) |
| C, B, A | 1 → 50 → 100 | A (1+49=50 < 51; 50+50=100 ≥ 51 → A) |

**Đếm**: A: 4 lần ({A,C,B},{B,A,C},{B,C,A},{C,A,B},{C,B,A} → wait: A,B,C: B pivot; A,C,B: C pivot; B,A,C: A pivot; B,C,A: A pivot; C,A,B: A pivot; C,B,A: A pivot).

A: {B,A,C},{B,C,A},{C,A,B},{C,B,A} → 4 lần.
B: {A,B,C} → 1 lần.
C: {A,C,B} → 1 lần.

**Shapley-Shubik**: A = 4/6 = **2/3**, B = 1/6, C = 1/6.

Dù B có 49 ghế (gần bằng A), quyền lực của B chỉ bằng C (1 ghế)! Vì với q=51, A+C đã đủ — B không cần thiết trong nhiều tình huống.

### 3.3. Banzhaf Power Index

**Khác Shapley-Shubik** ở chỗ: không xét permutation mà xét **coalitions**.

- Với mọi coalition S ⊆ N, cử tri i là **swing voter** trong S nếu S thắng (tổng ≥ q) nhưng S\\{i} thua (tổng < q).
- Banzhaf(i) = số lần i là swing / tổng số swing của tất cả.

**Walk-through** (A:45, B:35, C:20, q=51):

Tất cả coalitions không rỗng (2³ − 1 = 7):
- {A}: 45 < 51 → thua.
- {B}: 35 < 51 → thua.
- {C}: 20 < 51 → thua.
- {A,B}: 80 ≥ 51 → thắng. A swing? {B}=35<51 ✓. B swing? {A}=45<51 ✓.
- {A,C}: 65 ≥ 51 → thắng. A swing? {C}=20<51 ✓. C swing? {A}=45<51 ✓.
- {B,C}: 55 ≥ 51 → thắng. B swing? {C}=20<51 ✓. C swing? {B}=35<51 ✓.
- {A,B,C}: 100 ≥ 51 → thắng. A swing? {B,C}=55≥51 ✗. B swing? {A,C}=65≥51 ✗. C swing? {A,B}=80≥51 ✗. (Không ai swing trong grand coalition!)

**Tổng swing**:
- A: swing trong {A,B} và {A,C} → **2**
- B: swing trong {A,B} và {B,C} → **2**
- C: swing trong {A,C} và {B,C} → **2**

Banzhaf: A = 2/6, B = 2/6, C = 2/6 → **1/3 mỗi đảng** (trùng kết quả Shapley).

> ❓ **Khi nào Shapley ≠ Banzhaf?** Với weighted games phức tạp hơn, 2 index cho kết quả khác nhau. Shapley tính trên permutation (symmetric treatment của ordering); Banzhaf tính trên subsets (không tính order). Cả 2 đều valid, capture khía cạnh khác của "power".

---

## 4. Bài tập thực hành

**Bài 1**: Grid 6×2 = 12 cử tri, 6 Red 6 Blue. Chia 2 districts.
(a) Compact: 3R+3B mỗi district → tỷ lệ ghế?
(b) Gerrymandered: pack 5B + 1R vào D1, 5R + 1B vào D2 → tỷ lệ ghế?
(c) Tính EG cho cả 2 cách chia.

**Bài 2**: Shapley-Shubik cho A:30, B:30, C:30, D:10, q=51 (4 đảng).
(a) Có bao nhiêu permutation? (4! = ?)
(b) Tính power index của D (10 ghế).

**Bài 3**: Hamilton method — 4 bang A:600, B:400, C:300, D:100. Tổng 1400 dân.
(a) 10 ghế: phân phối?
(b) 11 ghế: phân phối? Alabama paradox xảy ra không?

---

## 5. Lời giải chi tiết

### Bài 1

**(a) Compact**:
- D1: 3R, 3B → Tie (giả sử split: 1 ghế mỗi bên hoặc cần tiebreak). Giả sử Tie = coin flip.
- D2: 3R, 3B → Tie.
- Kết quả: có thể 1R-1B hoặc 2R-0B tùy tiebreak. Về kỳ vọng: 1R, 1B.

**(b) Gerrymandered**:
- D1: R:1, B:5 → Blue wins (5-1). Red wasted: 1. Blue wasted: 5−4=1.
- D2: R:5, B:1 → Red wins (5-1). Red wasted: 5−4=1. Blue wasted: 1.
- Kết quả: **1 Red, 1 Blue** — same as compact? Vì 6-6 split balanced, gerrymandering trong trường hợp balanced không giúp được.

Thực tế gerrymandering chỉ hiệu quả khi có majority: vd 7R 5B. Trong 6-6, không có cách chia để 1 phe thắng 2-0.

**(c) EG cho compact (assume D1: 3-3 tie counted as Red wins by single vote rule)**:
- Giả sử tiebreak cả 2 district: Red wins 4-2, Blue wins 4-2.
- D1: Red:4, Blue:2. Red wasted: 4-3=1. Blue wasted: 2.
- D2: Red:4, Blue:2. Same.
- EG = ((1+1)−(2+2))/(12) = (2−4)/12 = −2/12 = −16.7% (Blue disadvantaged).

### Bài 2

**(a)** 4! = **24 permutation**.

**(b)** D (10 ghế) là pivot khi running total trước D < 51 nhưng thêm D ≥ 51. Với tổng 100 và q=51:
- D là pivot trong permutation XY**D**Z khi wₓ+wᵧ ∈ [41,50] (cộng D mới ≥ 51).
- Possible: A+B=60>51 (A,B trước D thì không cần D), B+C=60>51.
- Chỉ khi 1 trong {A,B,C} đứng trước D với tổng=30: chỉ 1 đảng đơn lẻ (30 < 51, 30+10=40 < 51). Cần 2 đảng từ {A,B,C} trước D với tổng 41-50: không có cặp nào vì 30+30=60 > 50.

Kết luận: Không có thứ tự nào làm D là pivot! D có Shapley power = **0**. D không bao giờ là "tiếng nói quyết định" vì bất kỳ 2 trong {A,B,C} đã đủ majority.

### Bài 3

**(a) 10 ghế**:
- Quota: A: 600/1400×10=4.286, B: 400/1400×10=2.857, C: 300/1400×10=2.143, D: 100/1400×10=0.714.
- Sàn: A:4, B:2, C:2, D:0. Tổng=8, cần 2 thêm.
- Largest remainder: B(0.857), A(0.286), D(0.714), C(0.143).
- Thực ra: A:0.286, B:0.857, C:0.143, D:0.714 → top 2: B(0.857), D(0.714).
- **Kết quả: A:4, B:3, C:2, D:1**.

**(b) 11 ghế**:
- Quota: A: 600/1400×11=4.714, B: 400/1400×11=3.143, C: 300/1400×11=2.357, D: 100/1400×11=0.786.
- Sàn: A:4, B:3, C:2, D:0. Tổng=9, cần 2 thêm.
- Remainders: A:0.714, B:0.143, C:0.357, D:0.786.
- Top 2: D(0.786), A(0.714).
- **Kết quả: A:5, B:3, C:2, D:1**.

A tăng từ 4→5. Không có bang nào mất ghế trong ví dụ này. Alabama Paradox KHÔNG xảy ra ở đây. (Alabama Paradox cần phân bố dân số đặc biệt hơn để remainder thứ tự đảo ngược.)

---

## Bài tiếp theo

- **Tầng 3 — Strategic Interactions**: Collective action, bargaining, signaling.
- **Xem thêm**: [visualization.html](./visualization.html) — vẽ gerrymandering grid, tính EG, Shapley permutation.
`;
