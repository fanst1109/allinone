# Lesson 02: Arrow's Impossibility Theorem

> **Tầng 2 — Voting & Social Choice · PoliticalScience**

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Phát biểu chính xác **5 axiom của Arrow** cho một voting rule F.
- Giải thích tại sao **Condorcet cycle** chứng minh vấn đề với transitivity.
- Hiểu **sketch chứng minh** Arrow qua decisive coalition argument.
- Biết rằng mọi voting rule thực tế đều **vi phạm ít nhất 1 axiom** — và lựa chọn axiom nào vi phạm là quyết định chính trị, không phải kỹ thuật.

## Kiến thức tiền đề

- **Lesson 01**: 6 voting rules, Condorcet cycle, Borda count, IRV.
- Khái niệm **preference relation** (quan hệ thứ tự): phản xạ, đối xứng, bắc cầu.

---

## 1. Bài toán đặt ra

> 💡 **Trực giác**: Sau khi thấy 6 voting rule cho 6 winner khác nhau (Lesson 01), câu hỏi tự nhiên là: **"Có tồn tại voting rule hoàn hảo không?"** — một rule thoả mãn đồng thời mọi tiêu chí hợp lý về công bằng và dân chủ?

**Arrow (1951)** định nghĩa một voting rule F là hàm:
> F: (tập tất cả preference profile) → (social preference ordering)

Mỗi profile là tập ranking của mọi cử tri trên tập ứng viên X. F tổng hợp thành một ordering tập thể.

**Câu hỏi Arrow**: Có F nào thoả đồng thời 5 axiom dưới đây không?

---

## 2. Năm axiom của Arrow

### 2.1. Universal Domain (U) — Miền xác định toàn phần

> 💡 **Trực giác**: F phải **chạy được với mọi kịch bản cử tri**, không được từ chối xử lý một số profile. Nếu F chỉ hoạt động khi cử tri "ngoan ngoãn" (vd single-peaked), đó là axiom vi phạm.

**Phát biểu**: F nhận đầu vào là **bất kỳ profile** nào — mọi cách mà n cử tri có thể xếp hạng k ứng viên.

**Ví dụ vi phạm**: Median Voter Rule chỉ hoạt động với single-peaked preference trên trục 1 chiều — vi phạm (U).

### 2.2. Pareto Efficiency (P) — Nguyên tắc đồng thuận

> 💡 **Trực giác**: Nếu **tất cả** cử tri đều thích A hơn B, xã hội cũng phải thích A hơn B. Đây là điều kiện tối thiểu của dân chủ — ít nhất không cưỡng lại ý kiến đồng thuận tuyệt đối.

**Phát biểu**: Nếu với mọi cử tri i: A ≻ᵢ B, thì F(profile) cũng cho A ≻ B.

**Walk-through**: 5 cử tri đều rank A > B > C. Axiom (P) đòi hỏi F phải cho A > B và B > C và A > C trong social ordering.

> ⚠ **Lỗi thường gặp**: (P) không nói về trường hợp cử tri **chia rẽ**. Nó chỉ áp dụng khi 100% đồng thuận về một cặp cụ thể.

### 2.3. Independence of Irrelevant Alternatives (IIA) — Độc lập với ứng viên không liên quan

> 💡 **Trực giác**: Xếp hạng xã hội của A so với B chỉ phụ thuộc vào **cách mỗi cử tri xếp A vs B** — không phụ thuộc C, D, hay bất kỳ ứng viên khác. Nếu không có IIA, ứng viên "trọng tài" C có thể thay đổi kết quả A vs B chỉ bằng cách xuất hiện.

**Phát biểu**: Nếu 2 profile p và p' giống hệt nhau về preference A vs B của mọi cử tri, thì F(p) và F(p') phải cho cùng kết quả A vs B trong social ordering.

**Walk-through vi phạm IIA của Borda**:

Profile p (3 cử tri, 3 ứng viên A, B, C):
- Cử tri 1: A > B > C
- Cử tri 2: A > B > C
- Cử tri 3: B > A > C
- Borda: A = 2×2+2×2+1×1 = ... A: 2+2+1=5, B: 1+1+2=4, C: 0. A > B (xã hội).

Thêm ứng viên C vào một profile p' với C rank cao hơn:
- Cử tri 3 đổi thành: B > C > A (vẫn rank B > A trong cặp này)
- Borda: A: 2+2+0=4, B: 1+1+2=4, C: 0+0+1=1 → Tie A-B.

Cử tri 3 chỉ thay đổi vị trí C, không thay đổi preference B>A — nhưng xã hội đổi từ A>B thành tie. Vi phạm (IIA).

> ❓ **Tại sao IIA quan trọng?** Nếu không có IIA, một ứng viên thứ 3 yếu có thể làm đảo winner chỉ bằng cách tham gia. Đây chính xác là spoiler effect trong Plurality (Lesson 01).

### 2.4. Non-dictatorship (D) — Không có nhà độc tài

> 💡 **Trực giác**: Không được có 1 cử tri j sao cho F luôn phản ánh đúng 100% preference của j, bất kể mọi người khác nghĩ gì.

**Phát biểu**: Không tồn tại cử tri j sao với mọi profile và mọi cặp A, B: nếu A ≻ⱼ B thì A ≻ B trong F(profile).

**Ví dụ thoả mãn (D) nhưng vi phạm khác**: Majority voting với 2 ứng viên thoả (D) nhưng không tổng quát lên ≥ 3 ứng viên (cycle).

### 2.5. Transitivity của output

> 💡 **Trực giác**: Social ordering phải nhất quán — nếu xã hội thích A hơn B, và B hơn C, thì xã hội cũng phải thích A hơn C. Nếu không có property này, voting dẫn đến vòng tròn vô nghĩa.

**Phát biểu**: Nếu F cho A ≻ B và B ≻ C, thì A ≻ C.

---

## 3. Định lý Arrow (1951)

**Định lý**: Với ≥ 3 ứng viên và ≥ 2 cử tri, **không tồn tại** voting rule F thoả đồng thời (U), (P), (IIA), (D), và transitivity.

Nói cách khác: mọi F thoả (U) + (P) + (IIA) + transitivity đều **phải là dictatorial** (vi phạm D).

---

## 4. Condorcet cycle — Trái tim của chứng minh

**Walk-through Condorcet cycle**:

3 cử tri, 3 ứng viên A, B, C:
- Cử tri 1: A > B > C
- Cử tri 2: B > C > A
- Cử tri 3: C > A > B

**Pairwise majority vote**:

| Cặp | Cử tri prefer vế trái | Cử tri prefer vế phải | Kết quả xã hội |
|-----|----------------------|----------------------|----------------|
| A vs B | Cử tri 1, 3 (2 người) | Cử tri 2 (1 người) | A > B (đa số) |
| B vs C | Cử tri 1, 2 (2 người) | Cử tri 3 (1 người) | B > C (đa số) |
| C vs A | Cử tri 2, 3 (2 người) | Cử tri 1 (1 người) | C > A (đa số) |

**Kết quả**: A > B, B > C, nhưng C > A — **vi phạm transitivity**!

Nếu ta **ép** F phải cho output transitive từ profile này, thì theo (P) và (IIA), F phải bỏ qua hoặc đảo ít nhất 1 pairwise preference → vi phạm (P) hoặc (IIA).

> ❓ **Câu hỏi tự nhiên**: Nếu chỉ có 2 ứng viên, Arrow có vấn đề không?
> <details><summary>Đáp án</summary>Không! Với 2 ứng viên, majority voting thoả (U), (P), (IIA), (D), và transitivity. Arrow chỉ áp dụng với ≥ 3 ứng viên. Đây là lý do nhiều hệ thống dùng runoff về 2 người cuối.</details>

---

## 5. Sketch chứng minh Arrow

> 💡 **Trực giác**: Chứng minh Arrow dùng 3 bước ("decisive coalition"): (1) tồn tại decisive group cho ít nhất 1 cặp; (2) decisive cho 1 cặp → decisive cho mọi cặp; (3) group nhỏ nhất có size 1 = dictator.

### 5.1. Định nghĩa decisive coalition

Tập cử tri S là **decisive** cho cặp (A, B) nếu: nếu mọi người trong S đều prefer A > B thì F cũng cho A > B (bất kể phần còn lại nghĩ gì).

### 5.2. Bước 1: Tồn tại decisive coalition

- Từ (P): toàn bộ cử tri N là decisive cho mọi cặp.
- Xét coalition nhỏ nhất T ⊆ N decisive cho 1 cặp nào đó (A, B). T tồn tại vì N tồn tại.

### 5.3. Bước 2: Field expansion

**Claim**: Nếu T decisive cho (A, B) thì T cũng decisive cho mọi cặp khác.

**Sketch**: Gọi cử tri d ∈ T. Tạo profile mà:
- d rank X > A > B > Y
- Mọi người khác trong T rank A > B (nhưng X, Y có thể khác nhau)
- Mọi người ngoài T rank B > A (và X, Y tùy ý không liên quan)

Từ (P): B > Y (mọi người đều prefer B > Y trong profile này).
Từ T decisive cho (A,B): A > B trong xã hội.
Transitivity: A > B > Y → A > Y.
Nhưng chỉ d là người duy nhất trong T xác định X > A → từ (IIA), X > A trong xã hội bắt nguồn từ {d}.

Lặp lại argument → T = {d} là decisive cho mọi cặp → **d là dictator**.

### 5.4. Bước 3: Coalition size 1

Coalition nhỏ nhất có size 1 (nếu size ≥ 2, tách ra và áp dụng (IIA) + transitivity để thu nhỏ hơn nữa → mâu thuẫn với minimal).

> ⚠ **Lưu ý về sketch**: Đây là phác thảo, không phải chứng minh đầy đủ. Chứng minh đầy đủ cần phân tích cẩn thận từng trường hợp; xem Arrow (1951) hoặc Sen (1970).

---

## 6. Mỗi rule vi phạm axiom nào?

| Voting Rule | Vi phạm (U) | Vi phạm (P) | Vi phạm (IIA) | Vi phạm (D) | Vi phạm Trans. |
|-------------|:-----------:|:-----------:|:-------------:|:-----------:|:--------------:|
| Plurality | ✗ | ✗ | ✓ | ✗ | ✗ |
| Borda Count | ✗ | ✗ | ✓ | ✗ | ✗ |
| Condorcet | ✗ | ✗ | ✗ | ✗ | ✓ (cycle) |
| Dictatorial | ✗ | ✗ | ✗ | ✓ | ✗ |
| Majority (2 cands) | ✗ | ✗ | ✗ | ✗ | ✗ (thoả tất cả!)|

→ Majority voting 2 ứng viên thoả cả 5 — nhưng không tổng quát lên ≥ 3 (vi phạm U khi áp cho nhiều cands).

> 📝 **Tóm tắt mục 6**: Không có silver bullet. Chọn Plurality → chấp nhận IIA failure (spoiler effect). Chọn Condorcet → chấp nhận cycle (non-transitivity). Chọn dictatorial → chấp nhận mất dân chủ. Đây là thực chất của Arrow: mọi lựa chọn đều có cái giá.

---

## 7. Bài tập thực hành

**Bài 1**: Cho profile 3 cử tri (A, B, C, D — 4 ứng viên):
- Cử tri 1: A > B > C > D
- Cử tri 2: B > C > D > A
- Cử tri 3: C > D > A > B

Xác định (a) có Condorcet winner không? (b) Tính Borda score.

**Bài 2**: Giải thích tại sao "approval voting" vi phạm IIA. (Gợi ý: thêm ứng viên mới có thể thay đổi approval threshold.)

**Bài 3**: Arrow's theorem giả định cử tri có strict preference (không tie). Nếu cho phép tie (indifference), định lý có còn đúng không? Lý luận ngắn gọn.

---

## 8. Lời giải chi tiết

### Bài 1

**(a) Condorcet winner với 4 ứng viên**:

A vs B: Cử tri 1 (A>B ✓), Cử tri 2 (B>A ✗), Cử tri 3 (A sau D, nhưng A before B trong 3? Không: C>D>A>B nên B < A → A>B ✓). A>B: 2-1.
A vs C: Cử tri 1 (A>C ✓), Cử tri 2 (B>C>D>A → C>A ✗), Cử tri 3 (C>A ✗). A>C: 1-2. C>A.
→ A không phải Condorcet winner.

B vs C: Cử tri 1 (B>C ✓), Cử tri 2 (B>C ✓), Cử tri 3 (C>B ✓ — wait: C>D>A>B → C>B). B>C: 2-1.
B vs D: Cử tri 1 (B>D ✓), Cử tri 2 (B>D ✓), Cử tri 3 (D>A>B... wait D is rank 2, B is rank 4 in cử tri 3: C>D>A>B → D>B). B>D: 2-1.
B vs A: As above, A>B 2-1 → A>B. So B loses to A.
→ B không phải Condorcet winner.

C vs A: 2-1 (C wins). C vs B: 1-2 (B wins). → C loses to B.
D vs A: Cử tri 1 (A>D in A>B>C>D → A>D ✓ A beats D), Cử tri 2 (D>A ✓), Cử tri 3 (D>A ✓). D>A: 2-1.
D vs B: As above B wins 2-1. D loses to B.

Kết quả: A>B, B>C, B>D; C>D (check: cử tri 1 C>D ✓, cử tri 2 C>D ✓, cử tri 3 C>D ✓ → unanimous C>D); D>A.
→ Cycle: A>B, D>A, B>D? B>D (2-1) và D>A (2-1) → B>A? No, A>B (2-1). Có cycle A>B>D>A. Không có Condorcet winner.

**(b) Borda score** (n=4 ứng viên, max 3pt cho rank #1):

| | Cử tri 1 (×1) | Cử tri 2 (×1) | Cử tri 3 (×1) | Tổng |
|--|--|--|--|--|
| A | rank1=3 | rank4=0 | rank3=1 | **4** |
| B | rank2=2 | rank1=3 | rank4=0 | **5** |
| C | rank3=1 | rank2=2 | rank1=3 | **6** |
| D | rank4=0 | rank3=1 | rank2=2 | **3** |

Borda winner: **C** (6 điểm). Kiểm tra: 4+5+6+3 = 18 = 3 cử tri × 6pt tổng/cử tri ✓.

### Bài 2

Approval voting vi phạm IIA: Giả sử ban đầu cử tri approve A, B (không approve C). Kết quả A và B tie. Thêm ứng viên D mạnh → một số cử tri chỉ approve A và D (bỏ B). Bây giờ B có ít approval hơn A dù preference A vs B của mỗi cử tri không thay đổi.

Về mặt kỹ thuật: trong approval voting, "approved set" phụ thuộc vào toàn bộ tập ứng viên (ai worth approving thay đổi khi thêm cạnh tranh) → vi phạm IIA.

### Bài 3

Cho phép indifference (weak orders thay vì strict): Arrow's theorem vẫn đúng — Sen (1970) và Fishburn (1970) đã chứng minh phiên bản generalized. Chứng minh phức tạp hơn nhưng kết luận tương tự: không có social welfare function thoả tất cả axiom (với ≥ 3 alternatives).

---

## Bài tiếp theo

- **Lesson 03: Median Voter Theorem** — Khi preference single-peaked trên 1 trục, thị trường chính trị converge về trung tâm.
- **Xem thêm**: [visualization.html](./visualization.html) — toggle axiom để xem rule nào vi phạm gì.
