// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: PoliticalScience/02-VotingSocialChoice/lesson-03-median-voter-spatial/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 03: Median Voter Theorem & Spatial Models

> **Tầng 2 — Voting & Social Choice · PoliticalScience**

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Định nghĩa **single-peaked preference** và giải thích tại sao nó là điều kiện đủ để tránh Condorcet cycle.
- Phát biểu và chứng minh **Median Voter Theorem** (Black 1948).
- Dự đoán Nash Equilibrium của 2 ứng viên cạnh tranh: cả 2 converge về vị trí median.
- Giải thích **Downsian model** và hạn chế của nó (bimodal, nhiều chiều, nhiều ứng viên).

## Kiến thức tiền đề

- **Lesson 01**: Plurality, pairwise voting, Condorcet winner.
- **Lesson 02**: Condorcet cycle — lý do median voter quan trọng.
- **Tầng 1 Lesson 02**: Nash Equilibrium — ứng viên rational maximize phiếu.

---

## 1. Single-peaked Preference

> 💡 **Trực giác**: Hãy tưởng tượng cử tri chọn mức thuế lý tưởng. Người A thích 20%: họ happy nhất ở 20%, và càng xa 20% (dù cao hơn hay thấp hơn) họ càng unhappy. Đây là single-peaked — có 1 đỉnh duy nhất. Khác với cyclic preference không có đỉnh, hoặc preference có 2 đỉnh (cử tri ghét trung dung, thích cực đoan).

**Định nghĩa chính thức**: Cử tri i có preference **single-peaked** trên trục thực tuyến nếu:
- Tồn tại ideal point xᵢ ∈ ℝ.
- Hàm utility u(x) đạt max tại xᵢ.
- Với mọi a, b: nếu a và b cùng phía với xᵢ và |a − xᵢ| < |b − xᵢ| thì u(a) > u(b).

Nói gọn: **xa ideal point hơn → thích ít hơn**, bất kể chiều nào.

**4 ví dụ single-peaked**:
1. Cử tri thích thuế 20%: u(18%) > u(15%) > u(10%) và u(22%) > u(25%) > u(30%).
2. Cử tri thích chi tiêu quốc phòng vừa phải (0.5/GDP): u(0.4) > u(0.2) và u(0.6) > u(0.8).
3. Cử tri ở tâm phổ ý kiến (điểm 0 trên trục −5 đến 5): u(−1) = u(1) > u(−2) = u(2).
4. Cử tri cực tả (−5): u(−4) > u(−3) > u(0) > u(5) — vẫn single-peaked, đỉnh ở một đầu.

**Ví dụ KHÔNG single-peaked**:
- Cử tri thích cả 2 cực (thích 0% hoặc 100% thuế, ghét 50%): 2 đỉnh → multi-peaked, có thể gây cycle.

> ⚠ **Lỗi thường gặp**: Single-peaked không nghĩa là symmetric — cử tri có thể "drop off" nhanh một chiều và chậm chiều kia. Điều kiện duy nhất là 1 đỉnh duy nhất.

---

## 2. Condorcet Winner Tồn Tại Khi Single-Peaked

**Định lý Black (1948)**: Nếu tất cả cử tri có single-peaked preference trên cùng một trục, thì **median voter's ideal point là Condorcet winner**.

**Walk-through** — 7 cử tri ở vị trí [−3, −2, −1, 0, 1, 2, 3]. Median = cử tri thứ 4 = vị trí 0.

Kiểm tra x=0 (median) vs x=1:
- Cử tri ở [−3, −2, −1, 0]: prefer 0 (gần hơn hoặc bằng) → 4 cử tri.
- Cử tri ở [1, 2, 3]: prefer 1 (gần hơn) → 3 cử tri.
- 0 thắng 1 với tỷ lệ 4-3.

Kiểm tra x=0 vs x=−1:
- Cử tri ở [−3, −2, −1]: prefer −1 → 3 cử tri.
- Cử tri ở [0, 1, 2, 3]: prefer 0 → 4 cử tri.
- 0 thắng −1 với tỷ lệ 4-3.

Tương tự: 0 thắng mọi điểm khác → **0 là Condorcet winner**.

**Tại sao single-peaked tránh cycle?**
- Cycle xảy ra khi 3 cử tri có "rotating preference": A>B, B>C, C>A (xem Lesson 02).
- Với single-peaked preferences, không thể có rotating pattern — sẽ luôn có candidate nào đó gần median "block" cycle.

> ❓ **Câu hỏi**: Nếu số cử tri chẵn (vd 6 cử tri ở [−3, −2, −1, 1, 2, 3] — không có ai đúng ở 0), median voter là ai?
> <details><summary>Đáp án</summary>Với 6 cử tri, "median" là khoảng giữa cử tri 3 và 4 (−1 và 1). Mọi điểm trong [−1, 1] đều là Condorcet winner (thắng cả 2 phía). Trong game theory, cả 2 ứng viên converge vào đoạn này.</details>

---

## 3. Median Voter Theorem — Nash Equilibrium của 2 ứng viên

**Setup**: 2 ứng viên A và B chọn vị trí chính sách để **maximize phiếu**. Cử tri bỏ phiếu cho ứng viên gần với ideal point của họ hơn (hoặc chia đều nếu bằng nhau).

**Định lý**: NE duy nhất là cả 2 ứng viên đứng tại vị trí median voter.

**Walk-through chi tiết** — Phân phối cử tri uniform trên [−5, 5]. Median = 0.

**Bước 1**: A đứng ở −2, B ở 2.
- Cử tri từ −5 đến 0 (midpoint của −2 và 2) bỏ cho A: 50%.
- Cử tri từ 0 đến 5 bỏ cho B: 50%.
- Tie.

**Bước 2**: A dịch từ −2 → 0 (về median). B vẫn ở 2.
- Midpoint của A(0) và B(2) là 1.
- Cử tri từ −5 đến 1 bỏ cho A: 60%.
- Cử tri từ 1 đến 5 bỏ cho B: 40%.
- A wins với 60%.

**Bước 3**: B thấy A ở 0 → B dịch về 0. Cả 2 ở 0: tie (50-50). Không ai muốn di chuyển vì:
- Nếu A dịch sang −1: midpoint A(−1) và B(0) là −0.5 → A gets [−5, −0.5] = 45%, thua.
- Lý luận tương tự cho B.
- **Nash Equilibrium: cả 2 ở 0 (median)**.

**Verify formally**: Gọi xₘ là median. Nếu A ≠ xₘ:
- Nếu A < xₘ ≤ B: A dịch sang xₘ → lấy thêm cử tri từ khoảng giữa cũ. Deviation profitable.
- Duy nhất NE là A = B = xₘ (dù tie không maximize nhưng không có profitable deviation).

> 💡 **Giải thích thực tiễn**: Đây là lý do Republican và Democrat Mỹ có nhiều policy giống nhau trên trục kinh tế — cả 2 hướng về "voter trung tâm". Disillusionment của cử tri cực (không thấy sự khác biệt) là hệ quả tất yếu.

---

## 4. Hạn chế của Median Voter Theorem

### 4.1. Phân phối cử tri bimodal

> 💡 **Trực giác**: Nếu cử tri tập trung ở 2 cực (xã hội phân cực), "median" nằm ở vùng ít người — lợi ích biên thấp, rủi ro mất base cao. Ứng viên có thể tính toán khác đi.

**Walk-through**: 100 cử tri phân bố: 50 người ở −4, 50 người ở 4 (không ai ở trung tâm). Median = 0.

Nếu A ở −1, B ở 1:
- Mọi 50 cử tri ở −4 bỏ cho A (A gần hơn). Mọi 50 cử tri ở 4 bỏ cho B. 50-50 tie.
- A dịch về 0 và B dịch về 0: vẫn tie — nhưng giờ A mất 10% "base" (cử tri −4 bắt đầu consider third party hay không bỏ phiếu).

Kết quả: trong phân phối bimodal, converging về median có thể mất base nhiều hơn thắng swing voters.

### 4.2. Không gian nhiều chiều — McKelvey Chaos Theorem

**Setup**: Chính sách có 2 chiều (vd chi tiêu quốc phòng × thuế). Mỗi cử tri có ideal point trong ℝ².

**Định lý McKelvey (1976)**: Nếu không có single-peaked order trong ℝ², với mọi điểm x và y, tồn tại chuỗi đề xuất x₁, x₂, ..., xₙ = y sao mà mỗi xᵢ₊₁ đánh bại xᵢ theo majority vote.

Nghĩa là: trong không gian nhiều chiều, **agenda setter có thể dẫn dắt kết quả đến bất kỳ điểm nào**. Chaos.

**Ví dụ**: 3 cử tri với ideal points (0,0), (1,0), (0.5, 1) trong mặt phẳng (thuế, quốc phòng). Không có "trung điểm" ổn định — mọi policy đều bị đánh bại bởi một policy khác theo majority.

### 4.3. Nhiều hơn 2 ứng viên

Với 3+ ứng viên, bài toán phức tạp hơn:
- Ứng viên A và B cạnh tranh gần median → cả 2 có thể thua ứng viên C cực đoan chiếm entire wing.
- Vd: A ở −0.1, B ở 0.1, C ở 3. Cử tri phân phối normal. C lấy toàn bộ cánh hữu > 2.

**Không còn NE đơn giản** → multi-candidate spatial model phức tạp hơn nhiều.

> 📝 **Tóm tắt hạn chế**: MVT là kết quả elegant nhưng giả định mạnh — 1 chiều, 2 ứng viên, single-peaked. Thực tế chính trị hiếm khi thoả cả 3.

---

## 5. Bài tập thực hành

**Bài 1**: 9 cử tri có ideal points: [−4, −3, −2, −1, 0, 1, 2, 3, 4]. Tính:
(a) Median voter ở đâu?
(b) Với A ở −2 và B ở 1, ai thắng? Tính vote share.
(c) Nếu B dịch về 0, ai thắng?

**Bài 2**: 5 cử tri với ideal points [1, 2, 4, 7, 9]. Median là ai?
(a) Xác minh median (cử tri ở 4) là Condorcet winner: kiểm tra 4 vs 3 và 4 vs 5.
(b) Nếu ứng viên A tại 3.5, B tại 5: ai thắng?

**Bài 3** (mở): Downsian convergence có thể giải thích "both parties seem the same"? Nêu 1 bằng chứng ủng hộ và 1 phản chứng từ chính trị thực tế.

---

## 6. Lời giải chi tiết

### Bài 1

**(a)** 9 cử tri → median là cử tri thứ 5 (sau khi xếp thứ tự) = **vị trí 0**.

**(b)** A ở −2, B ở 1. Midpoint = (−2+1)/2 = −0.5.
- Cử tri bên trái −0.5: [−4, −3, −2, −1] → 4 cử tri cho A.
- Cử tri bên phải −0.5: [0, 1, 2, 3, 4] → 5 cử tri cho B.
- Cử tri tại −0.5 không có (integer positions) → **B thắng 5-4**.

**(c)** B dịch về 0, A vẫn ở −2. Midpoint = (−2+0)/2 = −1.
- Cử tri bên trái −1: [−4, −3, −2] → 3 cử tri cho A.
- Cử tri tại −1: prefer B (gần B hơn: |−1−(−2)|=1 < |−1−0|=1 — tie, chia đều).
- Cử tri bên phải −1: [0, 1, 2, 3, 4] → 5 cử tri cho B.
- **B thắng** 5.5-3.5.

### Bài 2

**(a)** 5 cử tri [1, 2, 4, 7, 9], cử tri thứ 3 = 4 là median.

Kiểm tra 4 vs 3: cử tri prefer 4 là ai? [4, 7, 9] (gần 4 hoặc bằng 4) — 3 cử tri. Prefer 3: [1, 2] — 2 cử tri. 4 thắng 3-2 ✓.
Kiểm tra 4 vs 5: cử tri prefer 4: [1, 2, 4] — 3 cử tri. Prefer 5: [7, 9] — 2 cử tri. 4 thắng 3-2 ✓.
→ Cử tri 4 là Condorcet winner.

**(b)** A ở 3.5, B ở 5. Midpoint = (3.5+5)/2 = 4.25.
- Cử tri [1, 2, 4] có |xᵢ − 3.5| < |xᵢ − 5| → prefer A: 3 cử tri.
- Cử tri [7, 9] prefer B: 2 cử tri.
- **A thắng 3-2**.

### Bài 3

**Ủng hộ**: Clinton và Bush Sr. cả 2 ủng hộ NAFTA (free trade) — di chuyển về centre kinh tế. Obama và Romney 2012 có nhiều policy giống nhau về surveillance state, Wall Street bailout — cả 2 targeting median suburban voter.

**Phản chứng**: Trump 2016 thắng với vị trí cực đoan về immigration (không converge về median). AOC và progressive wing của Democrats thắng primary với vị trí far-left — cho thấy trong primary elections, median là median của party base, không của toàn dân → incentive diverge.

---

## Bài tiếp theo

- **Lesson 04: Strategic Voting** — Gibbard-Satterthwaite: mọi voting rule đều có thể bị manipulate.
- **Xem thêm**: [visualization.html](./visualization.html) — kéo 2 ứng viên, thay distribution, xem vote share thay đổi.
`;
