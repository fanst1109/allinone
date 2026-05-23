// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: Vectors/Probability/lesson-01-probability-basics/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 01 — Xác suất cơ bản (Probability Basics)

> Mở cánh cửa vào Tầng 5. Bài này cho bạn ngôn ngữ để nói về "may rủi" một cách chính xác: không gian mẫu, biến cố, các tiên đề Kolmogorov, đếm tổ hợp, và những ví dụ kinh điển (đồng xu, xúc xắc, lá bài, birthday paradox).

## Mục tiêu học tập

Sau khi học xong bài này, bạn có thể:

1. **Phân biệt** hiện tượng deterministic (chắc chắn) với probabilistic (ngẫu nhiên), và giải thích vì sao ta cần khái niệm xác suất.
2. **Mô tả** không gian mẫu Ω cho một thí nghiệm ngẫu nhiên cụ thể, và viết được các biến cố như tập con của Ω.
3. **Nêu** ba tiên đề Kolmogorov và **dẫn ra** các hệ quả cơ bản: P(∅) = 0, P(Aᶜ) = 1 − P(A), P(A ∪ B) = P(A) + P(B) − P(A ∩ B).
4. **Áp dụng** công thức xác suất cổ điển P(A) = |A|/|Ω| trong các tình huống đồng xác suất (equiprobable).
5. **Sử dụng** ba công cụ đếm — hoán vị n!, chỉnh hợp P(n,k), tổ hợp C(n,k) — để tính được kích thước của Ω và của A.
6. **Tính tay** được birthday paradox (23 người → xác suất trùng ngày sinh ≈ 50,7%).
7. **Phân biệt** "biến cố độc lập" (independent) với "biến cố rời rạc/loại trừ lẫn nhau" (disjoint / mutually exclusive) — hai khái niệm thường bị nhầm.
8. **Liên hệ** xác suất với ba kỹ thuật ML: minibatch sampling, dropout, và bootstrap.

## Kiến thức tiền đề

- [Algebra L04 — Powers, Roots, Logs](../../01-Algebra/lesson-04-powers-roots-logs/) — bạn sẽ tính \`52!\`, \`365!/342!\`, v.v. Khi gặp số khổng lồ, log giúp tính qua phép cộng thay vì nhân.
- [Algebra L05 — Functions](../../01-Algebra/lesson-05-functions/) — xác suất là một hàm P : 𝓕 → [0,1] (hàm từ biến cố sang số thực trong [0,1]).
- [Calculus L08 — Integrals](../../03-Calculus/lesson-08-integrals/) — sẽ cần ở **Lesson 04** khi sang biến ngẫu nhiên liên tục (PDF ∫ thay cho PMF Σ). Bài này chỉ dùng tổng rời rạc nên chưa cần ngay, nhưng bạn nên biết đường đi tới đó.

> Bài tiếp theo: [Lesson 02 — Xác suất có điều kiện + Bayes](../lesson-02-conditional-bayes/). Sau khi định nghĩa được P(A), bài 02 sẽ hỏi: "nếu đã biết B xảy ra, P(A) thay đổi thế nào?"

---

## 1. Trực giác — vì sao cần xác suất?

### 1.1. 💡 Hình dung — deterministic vs probabilistic

Có hai loại hiện tượng:

- **Deterministic** (định nghĩa: kết quả được xác định hoàn toàn bởi điều kiện ban đầu):
  - Thả viên đá từ độ cao 5 m → thời gian rơi \`t = √(2h/g) ≈ 1,01 s\`. Lặp lại 1000 lần, kết quả vẫn vậy (sai số nhỏ do gió/ma sát).
  - Giải phương trình \`2x + 3 = 7\` → \`x = 2\`. Không có "x = 2 với xác suất 90%".
- **Probabilistic** (ngẫu nhiên):
  - Tung 1 đồng xu → có thể H hoặc T, không đoán trước được kết quả cụ thể của lần tung tiếp theo.
  - Lấy bừa một học sinh trong lớp 40 người → ta không biết chính xác đó là ai, nhưng có thể nói "xác suất là một bạn nữ ≈ 22/40".
  - Số người vào quán cà phê trong 1 giờ → biến đổi mỗi ngày.

**Câu hỏi quan trọng**: tung xu *có thực sự* ngẫu nhiên không, hay chỉ là ta thiếu thông tin? Về vật lý, nếu biết chính xác lực, vận tốc, gió, ta có thể tính ra kết quả → deterministic. Nhưng vì ta **không có** đủ thông tin, ta coi nó là ngẫu nhiên và mô hình hóa bằng xác suất. **Xác suất là ngôn ngữ của thiếu thông tin** (incomplete information).

### 1.2. Vì sao ML/AI cần xác suất?

- **Dữ liệu nhiễu**: ảnh blur, văn bản có lỗi chính tả, sensor noise. Model phải học từ dữ liệu không hoàn hảo.
- **Dự đoán không chắc chắn**: model cho ra "ảnh này là mèo với xác suất 0.87, là chó với 0.11..." thay vì "100% là mèo".
- **Khám phá** (exploration): trong reinforcement learning, agent phải thử nhiều hành động ngẫu nhiên trước khi biết hành động nào tốt.
- **Regularization**: dropout bỏ neuron ngẫu nhiên để mạng không overfit.

**📝 Tóm tắt mục 1**:
- Deterministic = một input → một output xác định.
- Probabilistic = một input → phân phối các output có thể.
- Xác suất ra đời để mô tả thiếu thông tin và tính các ưu tiên giữa các kịch bản.
- ML đầy rẫy ngẫu nhiên: data noise, sampling, dropout, exploration → xác suất là ngôn ngữ chính thức.

---

## 2. Không gian mẫu Ω (Sample Space)

### 2.1. 💡 Trực giác

Trước khi nói "xác suất một biến cố", ta phải kể được **tất cả mọi kết quả có thể** của thí nghiệm. Đó là không gian mẫu Ω (omega).

> **Định nghĩa**: Không gian mẫu Ω của một thí nghiệm ngẫu nhiên là tập **tất cả** các kết quả (outcomes) có thể xảy ra, **đôi một loại trừ lẫn nhau** và **vét hết** mọi khả năng.

Ba từ khóa: **đầy đủ** (exhaustive — không sót khả năng nào), **rời rạc đôi một** (mutually exclusive — không có outcome nào trùng nhau), **xác định trước** (định nghĩa rõ trước khi thí nghiệm).

### 2.2. Ví dụ cụ thể

**Ví dụ 2.2.1 — Tung 1 đồng xu**:
\`\`\`
Ω = {H, T}     |Ω| = 2
\`\`\`
(H = head/mặt ngửa, T = tail/mặt sấp.)

**Ví dụ 2.2.2 — Tung 2 đồng xu (phân biệt thứ tự)**:
\`\`\`
Ω = {HH, HT, TH, TT}     |Ω| = 4
\`\`\`
HT (xu thứ nhất H, xu thứ hai T) ≠ TH. Nếu coi 2 đồng xu giống hệt nhau và không quan tâm thứ tự thì Ω rút lại còn \`{2H, 1H1T, 2T}\` nhưng các outcome KHÔNG còn đồng xác suất → tránh dùng.

**Ví dụ 2.2.3 — Tung 3 đồng xu**:
\`\`\`
Ω = {HHH, HHT, HTH, HTT, THH, THT, TTH, TTT}     |Ω| = 8 = 2³
\`\`\`
Tổng quát: tung n xu → |Ω| = 2ⁿ.

**Ví dụ 2.2.4 — Gieo 1 xúc xắc 6 mặt**:
\`\`\`
Ω = {1, 2, 3, 4, 5, 6}     |Ω| = 6
\`\`\`

**Ví dụ 2.2.5 — Gieo 2 xúc xắc**:
\`\`\`
Ω = {(1,1), (1,2), ..., (1,6),
     (2,1), (2,2), ..., (2,6),
     ...
     (6,1), (6,2), ..., (6,6)}     |Ω| = 36
\`\`\`
Mỗi outcome là một cặp \`(a, b)\` với \`a, b ∈ {1..6}\`. Lưu ý: \`(1,2) ≠ (2,1)\` — ta đang phân biệt xúc xắc nào ra số gì.

**Ví dụ 2.2.6 — Rút 1 lá bài từ bộ 52**:
\`\`\`
Ω = {2♠, 3♠, ..., A♠,  2♥, ..., A♥,  2♦, ..., A♦,  2♣, ..., A♣}     |Ω| = 52
\`\`\`

**Ví dụ 2.2.7 — Thí nghiệm "tung xu đến khi ra mặt H đầu tiên"**:
\`\`\`
Ω = {H, TH, TTH, TTTH, ...} = chuỗi vô hạn các outcome
\`\`\`
Đây là **Ω vô hạn đếm được**. Tiên đề Kolmogorov vẫn áp dụng nhưng kỹ thuật tính phức tạp hơn — ta sẽ gặp lại ở Lesson 03 với phân phối Geometric.

**Ví dụ 2.2.8 — Đo nhiệt độ phòng**:
\`\`\`
Ω = [-10, 50]  (ℝ, khoảng số thực)
\`\`\`
Đây là **Ω liên tục, không đếm được**. Cách tính xác suất khác hẳn (tích phân thay tổng) — Lesson 04.

### 2.3. ❓ Câu hỏi tự nhiên của người đọc

- *"Khi tung 2 xu, có thực sự phải phân biệt HT vs TH không? Trông giống nhau mà."*
  → Phải. Vì nếu gộp lại, các outcome không còn đồng xác suất: P("một H một T") = 2/4 ≠ P("hai H") = 1/4. Để áp dụng công thức P(A) = |A|/|Ω| thì mọi outcome trong Ω phải đồng xác suất, mà điều đó **chỉ đúng** khi ta phân biệt.

- *"Ω = {1,2,3,4,5,6} cho xúc xắc — nhưng nhỡ xúc xắc xèo (loaded) thì sao?"*
  → Ω vẫn thế (vẫn 6 outcome). Cái thay đổi là **xác suất gán cho từng outcome**, không phải tập Ω. Ω chỉ kể "có gì có thể xảy ra"; P kể "mỗi cái xảy ra với khả năng bao nhiêu".

- *"Có duy nhất một cách chọn Ω cho mỗi thí nghiệm không?"*
  → Không. Cùng thí nghiệm "tung 2 xu" có thể có Ω = {HH, HT, TH, TT} (chi tiết, 4 outcome) hoặc Ω = {0, 1, 2} (đếm số H, 3 outcome). Chọn Ω nào tùy mục đích, nhưng phải nhất quán: nếu Ω = {0, 1, 2} thì các outcome không đồng xác suất (P(0)=P(2)=1/4, P(1)=1/2).

### 2.4. 🔁 Dừng lại tự kiểm tra

1. Mô tả Ω cho thí nghiệm "rút 2 lá bài đồng thời từ bộ 52" (không quan tâm thứ tự).
2. |Ω| khi tung 5 đồng xu phân biệt là bao nhiêu?

<details>
<summary>Đáp án</summary>

1. Ω = tập tất cả các cặp không thứ tự {x, y} với x, y là lá bài khác nhau. |Ω| = C(52, 2) = 52·51/2 = 1326.
2. |Ω| = 2⁵ = 32.

</details>

**📝 Tóm tắt mục 2**:
- Ω = tập mọi kết quả có thể, đầy đủ và rời rạc đôi một.
- Tung n xu: |Ω| = 2ⁿ. Gieo k xúc xắc: |Ω| = 6ᵏ. Bộ bài: |Ω| = 52.
- Ω có thể hữu hạn, đếm được vô hạn, hoặc liên tục — ba trường hợp xử lý khác nhau.
- Có nhiều cách chọn Ω cho cùng thí nghiệm; chọn cách nào tùy yêu cầu, nhưng phải nhất quán với cách gán xác suất.

---

## 3. Biến cố (Event)

### 3.1. 💡 Trực giác

Sau khi có Ω, ta hỏi: *"Tôi quan tâm tới những kết quả nào?"* Tập các kết quả đó là một **biến cố**.

> **Định nghĩa**: Biến cố A là một **tập con** của Ω. Ta nói "biến cố A xảy ra" nếu kết quả thực tế của thí nghiệm thuộc A.

### 3.2. Ví dụ

Lấy thí nghiệm gieo 1 xúc xắc, Ω = {1, 2, 3, 4, 5, 6}.

| Mô tả | Biến cố (tập con) |
|-------|-------------------|
| "Ra số chẵn" | A = {2, 4, 6} |
| "Ra số ≥ 5" | B = {5, 6} |
| "Ra số chẵn HOẶC ≥ 5" | A ∪ B = {2, 4, 5, 6} |
| "Ra số chẵn VÀ ≥ 5" | A ∩ B = {6} |
| "Không phải số chẵn" | Aᶜ = {1, 3, 5} |
| "Chắc chắn xảy ra" | Ω = {1,2,3,4,5,6} (biến cố chắc chắn) |
| "Không bao giờ xảy ra" | ∅ (biến cố trống) |

Lấy thí nghiệm tung 2 xu, Ω = {HH, HT, TH, TT}.

| Mô tả | Biến cố |
|-------|---------|
| "Ít nhất 1 mặt H" | {HH, HT, TH} |
| "Đúng 1 mặt H" | {HT, TH} |
| "Không có H nào" | {TT} |

### 3.3. Các phép toán trên biến cố

Vì biến cố là tập hợp, ta dùng toán tử tập hợp:

- **Hợp** A ∪ B = "A hoặc B (hoặc cả hai) xảy ra".
- **Giao** A ∩ B = "cả A lẫn B đều xảy ra".
- **Phần bù** Aᶜ = Ω \\ A = "A KHÔNG xảy ra".
- **Hiệu** A \\ B = A ∩ Bᶜ = "A xảy ra nhưng B không".
- **Rời rạc / loại trừ lẫn nhau**: A và B gọi là **disjoint** (hay mutually exclusive) nếu A ∩ B = ∅, tức không thể cùng xảy ra.

### 3.4. ⚠ Lỗi thường gặp

- **Nhầm "biến cố"** với "kết quả". Outcome \`3\` là một phần tử của Ω; biến cố \`{3}\` là tập chỉ chứa outcome đó. Một outcome → một biến cố cơ bản (elementary event).
- **Nhầm disjoint với độc lập**. Hai khái niệm khác nhau hoàn toàn — sẽ rõ ở mục 11. Spoiler: disjoint = không cùng xảy ra; independent = biết một cái xảy ra không ảnh hưởng xác suất cái kia. Hai biến cố disjoint **không thể** độc lập (trừ khi một trong hai có xác suất 0).

### 3.5. 🔁 Dừng lại tự kiểm tra

Tung 1 xúc xắc. Liệt kê các biến cố:

1. C = "số nguyên tố".
2. D = "số lẻ".
3. C ∩ D.

<details>
<summary>Đáp án</summary>

1. C = {2, 3, 5} (2, 3, 5 là nguyên tố trong {1..6}; 1 không phải nguyên tố).
2. D = {1, 3, 5}.
3. C ∩ D = {3, 5}.

</details>

**📝 Tóm tắt mục 3**:
- Biến cố = tập con của Ω.
- Toán tử tập hợp = ngôn ngữ logic của biến cố: ∪ = hoặc, ∩ = và, ᶜ = phủ định.
- Disjoint = không cùng xảy ra (A ∩ B = ∅), KHÁC với independent.

---

## 4. Xác suất P(A) — Hàm trên biến cố

### 4.1. 💡 Trực giác

Sau khi có Ω và các biến cố, ta cần một quy luật gán mỗi biến cố một con số trong [0,1] đo "mức độ xảy ra".

> **Định nghĩa**: Xác suất là một **hàm** P: 𝓕 → [0, 1] gán mỗi biến cố A ∈ 𝓕 một số P(A), thỏa ba tiên đề Kolmogorov (mục 5). Ở đây 𝓕 là tập các biến cố hợp lệ (σ-đại số trên Ω); khi Ω hữu hạn, ta lấy 𝓕 = tập toàn bộ subset của Ω.

- P(A) = 0 → A "gần như không bao giờ" xảy ra.
- P(A) = 1 → A "gần như chắc chắn" xảy ra.
- P(A) = 0.5 → ngang ngửa fifty-fifty.

### 4.2. Ba cách diễn giải

Cùng một con số P(A) = 0.7 nhưng có ba cách hiểu:

1. **Cổ điển (classical)**: nếu Ω hữu hạn và đồng xác suất, P(A) = |A|/|Ω|. Ví dụ "ra số chẵn" trên xúc xắc = 3/6 = 0.5.
2. **Tần suất (frequentist)**: nếu lặp thí nghiệm n lần và A xảy ra m lần thì P(A) ≈ m/n khi n → ∞ (luật số lớn). Tung xu 1 triệu lần → tỉ lệ H xấp xỉ 0.5.
3. **Bayesian (chủ quan)**: P(A) là mức độ tin tưởng của bạn rằng A xảy ra, dựa trên thông tin hiện có. Có thể cập nhật khi có dữ liệu mới (Lesson 02).

Trong bài này ta dùng **cổ điển** là chính. Frequentist sẽ kiểm chứng qua mô phỏng trong viz. Bayesian là chủ đề Lesson 02.

**📝 Tóm tắt mục 4**:
- P là hàm số gán mỗi biến cố một số trong [0,1].
- Ba cách diễn giải: đếm (classical), đếm lặp (frequentist), niềm tin (Bayesian). Cùng một con số P(A), ba câu chuyện khác nhau.

---

## 5. Ba tiên đề Kolmogorov

Andrey Kolmogorov (1933) gói gọn toàn bộ lý thuyết xác suất vào ba quy tắc:

> **Tiên đề K1 (không âm)**: với mọi biến cố A, ta có P(A) ≥ 0.
>
> **Tiên đề K2 (chuẩn hóa)**: P(Ω) = 1.
>
> **Tiên đề K3 (cộng tính rời)**: nếu A₁, A₂, ... là các biến cố **đôi một disjoint** (Aᵢ ∩ Aⱼ = ∅ với mọi i ≠ j), thì
> P(A₁ ∪ A₂ ∪ ...) = P(A₁) + P(A₂) + ...

### 5.1. 💡 Trực giác từng tiên đề

- **K1**: xác suất không thể âm. "Có −0,3 cơ hội ra số 6" là vô nghĩa.
- **K2**: cộng lại tất cả khả năng phải bằng 1. Một thí nghiệm thì có cái xảy ra, nên P(Ω) — xác suất "cái gì đó trong Ω xảy ra" — chính là 1.
- **K3**: nếu hai biến cố không cùng xảy ra được, xác suất "một trong hai" bằng tổng xác suất. Vd: P(xúc xắc ra 1 hoặc ra 6) = P(1) + P(6) = 1/6 + 1/6 = 2/6. Đúng — vì "ra 1" và "ra 6" disjoint.

### 5.2. Walk-through với xúc xắc đồng xác suất

Ω = {1,2,3,4,5,6}, P({i}) = 1/6 với mỗi i.

- K1: P({3}) = 1/6 ≥ 0 ✓.
- K2: P(Ω) = P({1}) + P({2}) + ... + P({6}) = 6 · (1/6) = 1 ✓ (dùng K3 vì các singleton disjoint).
- K3 ví dụ: A = {2}, B = {4} disjoint. P(A ∪ B) = P({2, 4}) = 2/6. Mà P(A) + P(B) = 1/6 + 1/6 = 2/6 ✓.

### 5.3. ⚠ Lỗi thường gặp khi áp K3

K3 chỉ áp dụng khi A, B disjoint. Với A = "số chẵn" = {2,4,6}, B = "≥ 4" = {4,5,6}:

- A ∩ B = {4, 6} ≠ ∅ → A, B KHÔNG disjoint.
- P(A) = 3/6, P(B) = 3/6, P(A) + P(B) = 1 — không thể đúng! P(A ∪ B) phải ≤ 1.
- Thực ra A ∪ B = {2, 4, 5, 6} → P(A ∪ B) = 4/6. Công thức đúng: P(A ∪ B) = P(A) + P(B) − P(A ∩ B) = 3/6 + 3/6 − 2/6 = 4/6 ✓ (mục 7).

**📝 Tóm tắt mục 5**:
- Ba tiên đề: P ≥ 0, P(Ω) = 1, cộng tính với biến cố disjoint.
- Từ ba tiên đề này dẫn ra TẤT CẢ các hệ quả khác của xác suất — không cần thêm giả định gì.

---

## 6. Hệ quả của tiên đề (chứng minh từng bước)

### 6.1. Hệ quả 1: P(∅) = 0

**Chứng minh từng bước**:
1. ∅ và Ω disjoint: ∅ ∩ Ω = ∅ ✓.
2. ∅ ∪ Ω = Ω.
3. Áp K3 với A₁ = Ω, A₂ = ∅: P(Ω ∪ ∅) = P(Ω) + P(∅).
4. Thay P(Ω) = 1 (K2) và P(Ω ∪ ∅) = P(Ω) = 1: 1 = 1 + P(∅).
5. Suy ra P(∅) = 0. ∎

### 6.2. Hệ quả 2: P(Aᶜ) = 1 − P(A)

**Chứng minh**:
1. A và Aᶜ disjoint: A ∩ Aᶜ = ∅ theo định nghĩa phần bù.
2. A ∪ Aᶜ = Ω.
3. Áp K3: P(A ∪ Aᶜ) = P(A) + P(Aᶜ).
4. Mặt khác P(A ∪ Aᶜ) = P(Ω) = 1 (K2).
5. Vậy 1 = P(A) + P(Aᶜ), tức P(Aᶜ) = 1 − P(A). ∎

**Ví dụ**: P("không ra 6" trên xúc xắc) = 1 − P({6}) = 1 − 1/6 = 5/6.

### 6.3. Hệ quả 3: nếu A ⊆ B thì P(A) ≤ P(B)

**Chứng minh**:
1. B = A ∪ (B \\ A), và A, B\\A disjoint.
2. K3: P(B) = P(A) + P(B \\ A).
3. K1 cho P(B \\ A) ≥ 0.
4. Vậy P(B) ≥ P(A). ∎

### 6.4. Hệ quả 4 (quan trọng): P(A) ≤ 1

**Chứng minh**:
1. Mọi biến cố A ⊆ Ω.
2. Áp hệ quả 3: P(A) ≤ P(Ω) = 1. ∎

### 6.5. Hệ quả 5 — Công thức cộng tổng quát (Inclusion-Exclusion 2 tập):

> **P(A ∪ B) = P(A) + P(B) − P(A ∩ B)**

**Chứng minh từng bước**:
1. Viết A ∪ B = A ∪ (B \\ A). Hai tập này disjoint (cái thứ hai loại tất cả phần tử của A).
2. K3: P(A ∪ B) = P(A) + P(B \\ A). **(I)**
3. Viết B = (A ∩ B) ∪ (B \\ A). Hai tập này disjoint (cái đầu nằm trong A, cái sau nằm ngoài A).
4. K3: P(B) = P(A ∩ B) + P(B \\ A).
5. Suy ra P(B \\ A) = P(B) − P(A ∩ B). **(II)**
6. Thay (II) vào (I): P(A ∪ B) = P(A) + P(B) − P(A ∩ B). ∎

**Walk-through với xúc xắc**: A = {2,4,6} (chẵn), B = {4,5,6} (≥4).

- P(A) = 3/6, P(B) = 3/6, P(A ∩ B) = P({4,6}) = 2/6.
- P(A ∪ B) = 3/6 + 3/6 − 2/6 = 4/6.
- Kiểm chứng trực tiếp: A ∪ B = {2,4,5,6} → 4/6 ✓.

### 6.6. Hệ quả mở rộng — Inclusion-Exclusion 3 tập:

> P(A ∪ B ∪ C) = P(A) + P(B) + P(C) − P(A∩B) − P(A∩C) − P(B∩C) + P(A∩B∩C)

Lý do có dấu cộng cuối: khi trừ ba giao đôi một, các phần tử nằm trong cả ba bị trừ ba lần (mỗi giao một lần) mà ban đầu chỉ cộng ba lần → ròng 0, nên phải cộng lại P(A∩B∩C) một lần để đúng.

### 6.7. ❓ Câu hỏi tự nhiên

- *"P(∅) = 0 có ngược không? '∅ không bao giờ xảy ra' nên xác suất 0 thì hợp lý, nhưng vì sao chứng minh được từ tiên đề?"*
  → K2 nói P(Ω) = 1 và K3 (với A = Ω, B = ∅) buộc P(∅) = 0. Tiên đề đã đủ chặt.

- *"Nếu P(A) = 0 thì A có chắc chắn không xảy ra không?"*
  → Trong Ω hữu hạn: có. Trong Ω liên tục: KHÔNG nhất thiết. Ví dụ "lấy số x trong [0,1] đúng bằng 0.5" có xác suất 0 nhưng vẫn có thể xảy ra. Đây là khác biệt giữa "almost never" (xác suất 0) và "impossible". Chi tiết ở Lesson 04.

### 6.8. 🔁 Dừng lại tự kiểm tra

Trong một lớp 30 học sinh:
- 18 thích Toán (M), 12 thích Lý (P), 7 thích cả hai.

1. P(một bạn ngẫu nhiên thích Toán hoặc Lý)?
2. P(không thích cái nào trong hai)?

<details>
<summary>Đáp án</summary>

1. P(M ∪ P) = P(M) + P(P) − P(M ∩ P) = 18/30 + 12/30 − 7/30 = 23/30 ≈ 0,767.
2. P((M ∪ P)ᶜ) = 1 − 23/30 = 7/30 ≈ 0,233.

</details>

**📝 Tóm tắt mục 6**:
- Từ 3 tiên đề ta dẫn được: P(∅)=0, P(Aᶜ)=1−P(A), A⊆B ⇒ P(A)≤P(B), P(A)≤1.
- Inclusion-Exclusion: P(A∪B) = P(A) + P(B) − P(A∩B).
- Mọi định lý xác suất rời rạc đều xuất phát từ ba tiên đề này — không cần thêm gì.

---

## 7. Xác suất cổ điển (Equiprobable / Laplace)

### 7.1. 💡 Trực giác

Khi mọi outcome đồng khả năng (không lý do nào để thiên vị outcome nào), xác suất một biến cố đơn giản là tỉ lệ "thuận lợi trên tổng số".

> **Công thức Laplace**: nếu Ω hữu hạn và mọi outcome đồng xác suất, thì
>
> **P(A) = |A| / |Ω|** = "số outcome thuận lợi" / "tổng số outcome".

**Tiền đề quan trọng**: phải đồng xác suất. Nếu xúc xắc xèo (loaded), công thức này không dùng được.

### 7.2. Vì sao công thức đúng (chứng minh)?

Giả sử Ω = {ω₁, ω₂, ..., ωₙ} có n outcome, mỗi outcome có xác suất p (đồng xác suất).

1. K3 áp cho n singleton disjoint: P(Ω) = P({ω₁}) + ... + P({ωₙ}) = n·p.
2. K2: P(Ω) = 1 → n·p = 1 → p = 1/n = 1/|Ω|.
3. Với A có k outcome: P(A) = k·p = k/n = |A|/|Ω|. ∎

### 7.3. Ví dụ

**Ví dụ 7.3.1 — Xúc xắc, "ra số chẵn"**:
- A = {2, 4, 6}, Ω = {1..6}.
- P(A) = 3/6 = 1/2.

**Ví dụ 7.3.2 — Xúc xắc, "ra số ≥ 5"**:
- A = {5, 6}, |A| = 2.
- P(A) = 2/6 = 1/3.

**Ví dụ 7.3.3 — 2 xu, "ít nhất 1 H"**:
- Ω = {HH, HT, TH, TT}, A = {HH, HT, TH}.
- P(A) = 3/4. Hoặc tính qua phần bù: A = "ít nhất 1 H" = "không phải TT" → P(A) = 1 − P({TT}) = 1 − 1/4 = 3/4 ✓.

**Ví dụ 7.3.4 — Rút 1 lá bài đỏ**:
- Đỏ = ♥ ∪ ♦, |A| = 13 + 13 = 26.
- P(A) = 26/52 = 1/2.

**Ví dụ 7.3.5 — Rút 1 lá bài Át (Ace)**:
- A = {A♠, A♥, A♦, A♣}, |A| = 4.
- P(A) = 4/52 = 1/13 ≈ 0,0769.

### 7.4. ⚠ Lỗi thường gặp

Tung 2 xu, hỏi P(ra 1 H và 1 T). Người mới hay viết:
- "Ω = {2H, 1H1T, 2T}", P("1H1T") = 1/3. SAI.

Thực ra Ω phải có outcome đồng xác suất → Ω = {HH, HT, TH, TT} với 4 outcome. "1H1T" = {HT, TH} → P = 2/4 = 1/2 ✓ (kiểm tra bằng mô phỏng trong viz).

**📝 Tóm tắt mục 7**:
- Công thức Laplace: P(A) = |A|/|Ω|, chỉ áp khi outcome đồng xác suất.
- Bước thực hành: (1) định nghĩa Ω chuẩn sao cho outcome đồng xác suất, (2) đếm |A| và |Ω|, (3) chia.

---

## 8. Đếm tổ hợp (Combinatorics)

Vì Laplace cần |A| và |Ω|, **đếm** là kỹ năng cốt lõi. Ba công thức nền tảng:

### 8.1. Quy tắc nhân (Multiplication Principle)

Nếu một việc gồm 2 bước, bước 1 có m cách, bước 2 có n cách, tổng số cách = m · n.

**Ví dụ**: ăn sáng có 3 món chính và 2 nước → 3·2 = 6 combo.

Tổng quát: k bước, bước i có nᵢ cách → tổng số = n₁·n₂·...·nₖ.

**Ứng dụng**: tung 3 xu có 2·2·2 = 8 outcome. Gieo 4 xúc xắc có 6⁴ = 1296 outcome.

### 8.2. Hoán vị (Permutation) — sắp xếp toàn bộ

> Số cách sắp xếp **n** phần tử khác nhau **theo thứ tự** = **n!** (n factorial).

n! = n · (n−1) · (n−2) · ... · 2 · 1.

**Walk-through 1**: sắp 3 cuốn sách A, B, C lên kệ.
- Vị trí 1: 3 lựa chọn (A, B, hoặc C).
- Vị trí 2: 2 lựa chọn còn lại.
- Vị trí 3: 1 lựa chọn cuối.
- Tổng: 3·2·1 = 6 = 3! ✓

Liệt kê: ABC, ACB, BAC, BCA, CAB, CBA → đúng 6.

**Walk-through 2**: 4 người xếp hàng → 4! = 24 cách.

**Walk-through 3**: 5 người ngồi vào 5 ghế → 5! = 120 cách.

Bảng giá trị (rất nên nhớ):

| n | n! |
|---|-----|
| 0 | 1 |
| 1 | 1 |
| 2 | 2 |
| 3 | 6 |
| 4 | 24 |
| 5 | 120 |
| 6 | 720 |
| 7 | 5040 |
| 10 | 3 628 800 |
| 13 | 6 227 020 800 ≈ 6,23·10⁹ |
| 52 | ≈ 8,07·10⁶⁷ |

Lưu ý: 0! = 1 theo quy ước (cần để các công thức tổ hợp đẹp). Trực giác: có 1 cách sắp 0 phần tử (cách "không làm gì").

### 8.3. Chỉnh hợp (k-Permutation) — chọn k trong n có thứ tự

> Số cách chọn **k phần tử** từ **n phần tử** khác nhau, **có thứ tự** = **P(n,k) = n!/(n−k)!**

Suy luận từ quy tắc nhân:
- Vị trí 1: n cách chọn.
- Vị trí 2: (n−1) cách còn lại.
- ...
- Vị trí k: (n−k+1) cách.
- Tổng: n·(n−1)·...·(n−k+1) = n!/(n−k)!.

**Walk-through 1**: chọn chủ tịch và phó chủ tịch (có thứ tự — vai trò khác) từ 10 ứng cử viên.
- P(10, 2) = 10!/8! = 10·9 = 90 cách.

**Walk-through 2**: chọn 3 vận động viên xếp hạng nhất, nhì, ba từ 8 người.
- P(8, 3) = 8!/5! = 8·7·6 = 336 cách.

**Walk-through 3**: chọn 5 người đứng đầu xếp hàng dọc từ 20 người.
- P(20, 5) = 20·19·18·17·16 = 1 860 480.

### 8.4. Tổ hợp (Combination) — chọn k trong n KHÔNG có thứ tự

> Số cách chọn **k phần tử** từ **n phần tử** khác nhau, **không quan tâm thứ tự** = **C(n,k) = n!/[k!·(n−k)!]**

Ký hiệu khác: ⟨n choose k⟩ hay 𝓒(n,k).

Suy luận: số chỉnh hợp P(n,k) đếm mỗi tập con kích thước k tổng cộng k! lần (vì k phần tử có k! cách xếp), nên chia đi k!:
- C(n,k) = P(n,k)/k! = n!/[k!·(n−k)!]

**Walk-through 1**: chọn 2 người trong 10 vào ban tổ chức (vai trò như nhau, không có thứ tự).
- C(10, 2) = 10!/(2!·8!) = (10·9)/(2·1) = 45 cách.

**Walk-through 2**: chọn 5 lá bài trong 52 (poker hand).
- C(52, 5) = 52·51·50·49·48 / (5·4·3·2·1) = 311 875 200 / 120 = 2 598 960 hand.

**Walk-through 3**: chọn 3 đỉnh trong 7 đỉnh để vẽ tam giác (không thứ tự).
- C(7, 3) = 7!/(3!·4!) = (7·6·5)/(3·2·1) = 35.

Tính chất hay dùng:
- C(n,0) = 1 (chọn 0 phần tử — 1 cách "không chọn").
- C(n,n) = 1 (chọn cả n).
- **C(n,k) = C(n, n−k)** — đối xứng: chọn k để lấy = chọn (n−k) để bỏ. Ví dụ C(10,3) = C(10,7) = 120.
- Σₖ C(n,k) = 2ⁿ (tổng các hàng tam giác Pascal).

### 8.5. ⚠ Hoán vị vs Chỉnh hợp vs Tổ hợp — phân biệt

Hỏi 4 câu để chọn đúng công thức:

| Câu hỏi | Đáp án | Công thức |
|---------|--------|-----------|
| Lấy hết hay chọn một phần? | Lấy hết, có thứ tự | n! |
| Có thứ tự không? | Chọn k, có thứ tự | P(n,k) |
| | Chọn k, không thứ tự | C(n,k) |

**Ví dụ phân biệt**:
- "3 người trong 10 vào podium hạng 1-2-3" → có thứ tự → P(10,3) = 720.
- "3 người trong 10 vào ban tổ chức" → không thứ tự → C(10,3) = 120.

(Đúng quan hệ: P = C · k! → 720 = 120 · 6 ✓)

### 8.6. ❓ Câu hỏi tự nhiên

- *"Tính 52! làm sao khi nó là số 68 chữ số?"*
  → Dùng log: log₁₀(52!) = Σ log₁₀(i) ≈ 67,9. Trong code dùng \`lgamma\` hoặc \`math.Lgamma\` (log Γ). Khi tính C(52, k) thì log-tổng các log thay vì nhân.
- *"Khi nào dùng C(n,k)?"* — bất cứ khi nào chọn "k phần tử trong n" mà thứ tự không quan trọng: chia đội, chọn lá bài, tập con, kết hợp món ăn.
- *"P(n,n) bằng gì?"* → n!/(n−n)! = n!/0! = n!/1 = n!. Đúng — chỉnh hợp tất cả = hoán vị.

### 8.7. 🔁 Dừng lại tự kiểm tra

1. Số cách xếp 6 người vào hàng?
2. Số cách chọn 4 lá trong 52 để xếp lên bàn (có thứ tự)?
3. Số cách chọn 3 món pizza trong 20 vị (không quan tâm thứ tự)?

<details>
<summary>Đáp án</summary>

1. 6! = 720.
2. P(52, 4) = 52·51·50·49 = 6 497 400.
3. C(20, 3) = 20·19·18 / 6 = 1140.

</details>

**📝 Tóm tắt mục 8**:
- Quy tắc nhân: m bước → n₁·n₂·... cách.
- Hoán vị n!: xếp toàn bộ có thứ tự.
- Chỉnh hợp P(n,k) = n!/(n−k)!: chọn k có thứ tự.
- Tổ hợp C(n,k) = n!/[k!(n−k)!]: chọn k không thứ tự.
- Mẹo nhớ: C(n,k) = P(n,k)/k!. Khi nghi ngờ, hỏi "thứ tự có quan trọng không?".

---

## 9. Các ví dụ kinh điển

### 9.1. Tung 2 đồng xu, P(cả 2 đều H)

Ω = {HH, HT, TH, TT}, |Ω| = 4. A = {HH}, |A| = 1.

**P(A) = 1/4 = 0,25.**

### 9.2. Tung 3 đồng xu, P(đúng 2 H)

Ω có 2³ = 8 outcome. A = {HHT, HTH, THH} (chọn 2 vị trí cho H trong 3 vị trí = C(3,2) = 3).

**P(A) = 3/8 = 0,375.**

Tổng quát: tung n xu, P(đúng k mặt H) = C(n,k)/2ⁿ — đây chính là phân phối Binomial(n, 1/2) (sẽ học Lesson 03).

### 9.3. Xúc xắc, P(≥ 5)

A = {5, 6}, |A| = 2. P(A) = 2/6 = **1/3 ≈ 0,333**.

### 9.4. Tổng 2 xúc xắc = 7

|Ω| = 36. Các cặp tổng 7: (1,6), (2,5), (3,4), (4,3), (5,2), (6,1) — 6 cặp.
**P(sum = 7) = 6/36 = 1/6 ≈ 0,167.**

Đây là tổng có xác suất cao nhất trên 2 xúc xắc — dùng nhiều trong board games.

### 9.5. Rút 1 lá bài đỏ

26 lá đỏ / 52 lá. **P = 26/52 = 1/2 = 0,5.**

### 9.6. Rút 5 lá poker, P(four of a kind = 4 lá cùng giá trị)

Số hand 4-of-a-kind:
- Chọn rank cho bộ 4: 13 cách.
- Chọn 4 lá trong 4 lá cùng rank: C(4,4) = 1 cách (lấy cả 4).
- Chọn lá thứ 5 từ 48 lá còn lại: 48 cách.
- Tổng: 13 · 1 · 48 = 624.

P = 624 / C(52,5) = 624 / 2 598 960 ≈ **0,000240** = 1 trên 4165.

### 9.7. Birthday Paradox — câu chuyện hay nhất

**Hỏi**: trong nhóm 23 người ngẫu nhiên, xác suất ít nhất 2 người trùng ngày sinh là bao nhiêu?

**Trực giác sai**: 23/365 ≈ 6,3% → ít. Đáp án thực: **≈ 50,7%** — khá lớn! Vì sao gọi "paradox".

**Cách tính** (dùng phần bù):

1. Ω = mọi cách gán ngày sinh cho 23 người = 365²³ outcome (mỗi người 365 lựa chọn, độc lập).
2. A = "ít nhất 2 người trùng ngày sinh". Tính qua Aᶜ = "tất cả 23 người sinh nhật khác nhau" sẽ dễ hơn.
3. |Aᶜ| = số cách chọn 23 ngày khác nhau từ 365, có thứ tự (vì người 1, người 2,... khác nhau)
   = P(365, 23) = 365 · 364 · 363 · ... · 343 (23 thừa số).
4. P(Aᶜ) = (365 · 364 · ... · 343) / 365²³ = Π_{i=0}^{22} (365−i)/365.
5. P(A) = 1 − P(Aᶜ).

**Walk-through tính** (làm tay vài bước, rồi đưa ra số):

| k người | P(không trùng) | P(có trùng) |
|---------|---------------|-------------|
| 1 | 1.0000 | 0.0000 |
| 5 | 1·(364/365)·(363/365)·(362/365)·(361/365) ≈ 0.9729 | 0.0271 |
| 10 | 0.8831 | 0.1169 |
| 20 | 0.5886 | 0.4114 |
| **23** | **0.4927** | **0.5073** ⭐ |
| 30 | 0.2937 | 0.7063 |
| 50 | 0.0296 | 0.9704 |
| 70 | 0.00084 | 0.99916 |

→ 23 người là ngưỡng đầu tiên P(trùng) > 50%.

**Vì sao trực giác sai**: ta hay đếm "có ai trùng với TÔI" (23 so sánh với 1 người) thay vì "có CẶP nào trùng" (C(23, 2) = 253 cặp). Số cặp lớn hơn 100 lần → cơ hội trùng cao hơn nhiều.

**Liên hệ ML**: hash collision. Nếu hash function có 2^N giá trị output, theo birthday bound, sau ~√(2^N) = 2^(N/2) input ngẫu nhiên là khả năng cao có 2 input bị trùng hash. Đây là lý do MD5 (output 128-bit) chỉ "an toàn" tới khoảng 2^64 input, không phải 2^128.

### 9.8. 🔁 Dừng lại tự kiểm tra

1. Tổng 2 xúc xắc bằng 2 — xác suất?
2. Tung 4 xu, P(đúng 2 H)?

<details>
<summary>Đáp án</summary>

1. Chỉ 1 outcome (1,1) → P = 1/36 ≈ 0,028.
2. C(4, 2)/2⁴ = 6/16 = 3/8 = 0,375.

</details>

**📝 Tóm tắt mục 9**:
- Bài toán xác suất cổ điển = bài toán đếm. Khó hay dễ là khó hay dễ đếm.
- Khi A khó đếm trực tiếp, hãy thử Aᶜ (như birthday paradox).
- Birthday paradox dạy ta: con người underestimate khả năng trùng vì đếm sai (so sánh 1-1 thay vì cặp).

---

## 10. Độc lập (Independence)

### 10.1. 💡 Trực giác

Hai biến cố **độc lập** nếu biết một cái xảy ra **không thay đổi** xác suất cái kia.

- Tung xu lần 1 ra H — có ảnh hưởng xu lần 2 không? **Không** → độc lập.
- Bốc 2 lá bài liên tiếp (không hoàn lại): lá 1 là ♠ → lá 2 có xác suất là ♠ thay đổi (51 lá còn lại, 12 lá ♠) → **không độc lập**.

### 10.2. Định nghĩa hình thức

> A và B **độc lập** ⇔ **P(A ∩ B) = P(A) · P(B)**.

**Walk-through 1**: tung 2 xu phân biệt.
- A = "xu 1 ra H" = {HH, HT}, P(A) = 2/4 = 1/2.
- B = "xu 2 ra H" = {HH, TH}, P(B) = 2/4 = 1/2.
- A ∩ B = {HH}, P(A ∩ B) = 1/4.
- Kiểm tra: P(A)·P(B) = 1/4 = P(A∩B) ✓ → độc lập.

**Walk-through 2**: gieo 1 xúc xắc.
- A = "chẵn" = {2,4,6}, P(A) = 1/2.
- B = "≥ 4" = {4,5,6}, P(B) = 1/2.
- A ∩ B = {4, 6}, P(A∩B) = 2/6 = 1/3.
- P(A)·P(B) = 1/4 ≠ 1/3 → **không độc lập**. Trực giác: biết "≥4" thì khả năng "chẵn" cao hơn (2 trong 3 thay vì 3 trong 6 = 1/2). Có ràng buộc.

**Walk-through 3**: xúc xắc.
- A = "chẵn" = {2,4,6}, P(A) = 1/2.
- C = "≤ 3" = {1,2,3}, P(C) = 1/2.
- A ∩ C = {2}, P(A∩C) = 1/6 = (1/2)(1/2) · (2/3)? Không, 1/6 = 1/4? Sai. Hãy tính lại: 1/2 · 1/2 = 1/4 ≠ 1/6 → KHÔNG độc lập.

  Trực giác: trong A = {2,4,6}, chỉ có 1/3 phần tử trong C; trong tổng thể, C chiếm 1/2 — tỉ lệ khác → biết A thay đổi P(C).

### 10.3. ⚠ Độc lập KHÁC rời rạc

Đây là chỗ nhầm phổ biến nhất.

| Khái niệm | Định nghĩa | Hệ quả |
|-----------|-----------|--------|
| **Disjoint** (rời rạc, loại trừ) | A ∩ B = ∅ | P(A∪B) = P(A) + P(B); KHÔNG cùng xảy ra |
| **Independent** (độc lập) | P(A∩B) = P(A)P(B) | Biết A xảy ra không thay đổi P(B) |

**Phản ví dụ**: nếu A, B disjoint và cả hai có xác suất > 0:
- P(A ∩ B) = P(∅) = 0.
- P(A) · P(B) > 0.
- → P(A∩B) ≠ P(A)·P(B) → **không độc lập**.

Trực giác: nếu disjoint, biết "A đã xảy ra" → biết chắc "B không xảy ra" → cực kỳ phụ thuộc, không độc lập.

**Quy tắc nhớ**: disjoint = "loại nhau" (chống nhau); independent = "không liên quan" (mặc kệ nhau). Hai từ đời sống nghe na ná nhưng toán khác hẳn.

### 10.4. Độc lập của nhiều biến cố

A₁, A₂, ..., Aₙ gọi là **độc lập đôi** (pairwise independent) nếu mỗi cặp Aᵢ, Aⱼ độc lập.

Mạnh hơn: **độc lập toàn phần** (mutual independence) — với mọi tập con I ⊆ {1..n}, P(∩_{i∈I} Aᵢ) = Π_{i∈I} P(Aᵢ).

Trong đa số bài tập (tung n đồng xu độc lập, v.v.), ta giả định **độc lập toàn phần**.

**Ví dụ**: tung 5 xu liên tiếp, P(toàn ra H) = (1/2)⁵ = 1/32.

### 10.5. 🔁 Dừng lại tự kiểm tra

A = "xúc xắc ra số chia hết cho 3" = {3, 6}. B = "xúc xắc ra số > 4" = {5, 6}. Hỏi A, B có độc lập không?

<details>
<summary>Đáp án</summary>

P(A) = 2/6 = 1/3, P(B) = 2/6 = 1/3, A ∩ B = {6}, P(A∩B) = 1/6.

P(A)·P(B) = 1/9.

1/6 ≠ 1/9 → **không độc lập**.

</details>

**📝 Tóm tắt mục 10**:
- A, B độc lập ⇔ P(A∩B) = P(A)P(B).
- ĐỘC LẬP và DISJOINT là hai khái niệm khác nhau hoàn toàn — disjoint với xác suất > 0 thì KHÔNG độc lập.
- Tung n biến cố độc lập: P(tất cả xảy ra) = Π P(Aᵢ).

---

## 11. Liên hệ ML/AI

### 11.1. Data sampling — chọn minibatch ngẫu nhiên

Khi train neural network, ta không đưa toàn bộ dataset (vd 1 triệu ảnh) vào mỗi bước; ta chọn **minibatch** (vd 64 ảnh) ngẫu nhiên.

- Ω = tập tất cả các tập con kích thước 64 trong dataset = C(1_000_000, 64) cách.
- Mỗi minibatch là một outcome đồng xác suất (uniform sampling).

Lý do dùng minibatch: gradient từ batch nhỏ là **ước lượng không lệch** (unbiased estimator) của gradient toàn bộ data; rẻ hơn rất nhiều và làm bước cập nhật stochastic — giúp thoát khỏi điểm cực trị địa phương.

### 11.2. Dropout — bỏ neuron ngẫu nhiên

Trong mỗi forward pass khi training, mỗi neuron của layer dropout bị **tắt** với xác suất p (thường p = 0.5).

- Mỗi neuron i có biến cố "alive_i" với P(alive_i) = 1 − p, độc lập giữa các neuron.
- Một mạng có N neuron với dropout p = 0.5 → 2^N "sub-network" có thể, mỗi cái xác suất 1/2^N.
- Hiệu ứng: chống overfit, tựa như train một ensemble khổng lồ của 2^N mạng nhỏ.

### 11.3. Bootstrap — random sampling with replacement

Có dataset N điểm. Tạo "bootstrap sample" cùng kích thước N nhưng **lấy có hoàn lại** (with replacement).

- Mỗi vị trí trong bootstrap chọn đều trong N điểm gốc → P(điểm i được chọn cho vị trí cụ thể) = 1/N.
- P(điểm i KHÔNG được chọn lần nào trong N lần lấy) = (1 − 1/N)^N → 1/e ≈ 0.368 khi N → ∞.
- → Mỗi bootstrap sample chứa trung bình **63,2%** điểm gốc, có lặp.

Bootstrap dùng để ước lượng phương sai của estimator (random forest = ensemble của tree, mỗi tree học một bootstrap).

### 11.4. Birthday bound trong hash function

Như đã thấy ở mục 9.7, hash output N-bit "va chạm" sau ~2^(N/2) input. Đây là lý do:
- SHA-256 (256-bit) → an toàn tới ~2^128 input — quá lớn để brute-force.
- MD5 (128-bit) → vỡ ở ~2^64 — khả thi cho attacker.

**📝 Tóm tắt mục 11**:
- Sampling minibatch, dropout, bootstrap đều là ứng dụng trực tiếp của xác suất cổ điển.
- Birthday paradox không phải trò vui — nó quyết định độ dài hash trong crypto.
- Hiểu xác suất = hiểu được "vì sao thuật toán làm thế này".

---

## 12. Bài tập

Mỗi bài có lời giải chi tiết ở mục 13. Hãy thử tự làm trước.

### Bài 12.1 — Hai xúc xắc

Gieo 2 xúc xắc 6 mặt phân biệt. Tính:
- (a) P(tổng = 10).
- (b) P(ít nhất một xúc xắc ra 6).
- (c) P(hai xúc xắc ra số khác nhau).

### Bài 12.2 — Rút bài

Rút 1 lá từ bộ 52. Tính:
- (a) P(lá đó là rồng J/Q/K).
- (b) P(lá đó là đỏ HOẶC là J).

### Bài 12.3 — Tổ hợp pizza

Quán có 12 vị topping. Khách chọn pizza 4 vị (không trùng, không thứ tự). Có bao nhiêu cách chọn? Nếu chọn ngẫu nhiên, xác suất pizza đó CHỨA "phô mai" (1 trong 12 vị) là bao nhiêu?

### Bài 12.4 — Birthday cho 30 người

Trong nhóm 30 người, xác suất ít nhất 2 trùng ngày sinh là bao nhiêu? (Cho 365 ngày, bỏ qua năm nhuận.)

### Bài 12.5 — Độc lập

Gieo 2 xúc xắc. Đặt:
- A = "xúc xắc thứ nhất ra chẵn".
- B = "tổng 2 xúc xắc bằng 7".

A và B có độc lập không?

### Bài 12.6 — Poker

Rút 5 lá poker. Tính P(flush = 5 lá cùng chất, không cần liên tiếp).

---

## 13. Lời giải chi tiết

### 13.1 — Hai xúc xắc

|Ω| = 36 outcome.

**(a) P(tổng = 10)**: các cặp (a,b) với a+b=10 là (4,6), (5,5), (6,4) → 3 cặp. P = 3/36 = **1/12 ≈ 0,0833**.

**(b) P(ít nhất một 6)**: dùng phần bù.
- "Không có 6 nào" = mỗi xúc xắc thuộc {1..5} = 5·5 = 25 outcome.
- P("ít nhất 1 sáu") = 1 − 25/36 = **11/36 ≈ 0,306**.

**(c) P(hai số khác nhau)**: 
- |"hai số khác nhau"| = 36 − 6 = 30 (6 outcome khi a=b: (1,1),(2,2),...,(6,6)).
- P = 30/36 = **5/6 ≈ 0,833**.

### 13.2 — Rút bài

**(a) J/Q/K**: mỗi rank 4 lá, 3 rank → 12 lá. P = 12/52 = **3/13 ≈ 0,231**.

**(b) Đỏ HOẶC J** (inclusion-exclusion):
- Đỏ: 26 lá. J: 4 lá. Đỏ ∩ J (J♥, J♦): 2 lá.
- P = 26/52 + 4/52 − 2/52 = 28/52 = **7/13 ≈ 0,538**.

### 13.3 — Pizza

Tổng số pizza 4 vị: C(12, 4) = 12!/(4!·8!) = (12·11·10·9)/(4·3·2·1) = 11 880/24 = **495 cách**.

P(chứa phô mai): cố định phô mai trong 4 vị, chọn 3 vị còn lại trong 11 vị → C(11, 3) = 165.

P = 165/495 = **1/3 ≈ 0,333**.

(Kiểm tra trực giác: P = 4/12 = 1/3 — mỗi vị có cơ hội đều, một vị cụ thể "có mặt" với xác suất 4/12 = 1/3 ✓.)

### 13.4 — Birthday 30 người

P(không trùng) = ∏_{i=0}^{29} (365−i)/365 = (365·364·...·336)/365³⁰.

Tính nhanh bằng log:

log P(không trùng) = Σ_{i=0}^{29} log((365−i)/365) = Σ log(1 − i/365)

Với x nhỏ, log(1 − x) ≈ −x − x²/2. Tổng (xấp xỉ):

Σ_{i=0}^{29} −i/365 = −(0+1+...+29)/365 = −435/365 ≈ −1,192.

→ P(không trùng) ≈ e^(−1,192) ≈ 0,304. Hơi thấp so với tính chính xác (do bỏ x²/2). Tính chính xác cho ra **P(không trùng) ≈ 0,294** → **P(có trùng) ≈ 0,706 ≈ 70,6%**.

### 13.5 — Độc lập

P(A) = "xúc xắc 1 chẵn" = 1/2 (rõ ràng, 3 trong 6).

P(B) = "tổng = 7" = 6/36 = 1/6 (đã tính ở 9.4).

A ∩ B = "xúc xắc 1 chẵn VÀ tổng = 7". Liệt kê: (2,5), (4,3), (6,1) — 3 outcome.
P(A∩B) = 3/36 = 1/12.

So sánh: P(A)·P(B) = (1/2)(1/6) = 1/12 = P(A∩B) → **độc lập**.

(Trực giác: dù xúc xắc 1 ra chẵn hay lẻ, vẫn có 6 cách để tổng = 7 — không có thiên vị.)

### 13.6 — Flush

Tổng số hand 5 lá: C(52, 5) = 2 598 960.

Số hand flush (5 lá cùng chất):
- Chọn 1 trong 4 chất: 4 cách.
- Chọn 5 lá trong 13 lá của chất đó: C(13, 5) = 1287.
- Tổng: 4 · 1287 = 5148.

(Lưu ý: con số này bao gồm "straight flush" và "royal flush" — nếu muốn flush "thuần" thì trừ 40 straight flush ra. Đa số sách lấy 5148 làm tổng flush.)

P(flush) = 5148 / 2 598 960 ≈ **0,001981 ≈ 1/505** ≈ 0,198%.

---

## 14. Tổng kết & Liên kết

### 14.1. Sơ đồ tổng quát

\`\`\`
Thí nghiệm ngẫu nhiên
        │
        ▼
   Không gian mẫu Ω = {mọi outcome}
        │
        ▼
   Biến cố A ⊆ Ω
        │
        ▼
   P(A) ∈ [0, 1]   với 3 tiên đề Kolmogorov
        │
        ├── Cổ điển:     P(A) = |A|/|Ω|   (cần đếm tổ hợp)
        ├── Frequentist: P(A) ≈ m/n khi n → ∞ (luật số lớn)
        └── Bayesian:    cập nhật niềm tin với dữ liệu  → Lesson 02
\`\`\`

### 14.2. Những thứ sẽ học sâu hơn ở các lesson sau

- **Lesson 02**: P(A|B), Bayes' theorem — câu chuyện "biết B thì P(A) là gì?".
- **Lesson 03**: biến ngẫu nhiên rời rạc, PMF, Bernoulli/Binomial — gói gọn các thí nghiệm xác suất rời rạc.
- **Lesson 04**: liên tục, PDF/CDF, ∫ thay Σ — cần tích phân ([Calculus L08](../../03-Calculus/lesson-08-integrals/)).
- **Lesson 05**: phân phối Gaussian + CLT — vì sao đa số dữ liệu "trông giống chuông".
- **Lesson 07-08**: MLE → cross-entropy — gốc của loss function ML.

### 14.3. Tham khảo

- **Files trong lesson**: [\`README.md\`](./README.md) (file này), [\`visualization.html\`](./visualization.html) — viz có 4 component tương tác.
- **Sách**: Sheldon Ross — *A First Course in Probability* (chương 1-2 phủ chính xác nội dung này).
- **Online**: Khan Academy / 3Blue1Brown ("Why is this Pi here? And why squared?" — birthday paradox).

### 14.4. 📝 Tóm tắt bài học

1. Xác suất là ngôn ngữ của thiếu thông tin và ngẫu nhiên.
2. Bộ ba **Ω – biến cố – P** là khung sườn; ba **tiên đề Kolmogorov** đủ định nghĩa mọi thứ.
3. **Xác suất cổ điển**: P(A) = |A|/|Ω| khi đồng xác suất → quy về **đếm**.
4. **Ba công thức đếm**: hoán vị (n!), chỉnh hợp (n!/(n−k)!), tổ hợp (n!/[k!(n−k)!]).
5. **Birthday paradox**: 23 người đủ để P(trùng) > 50% — bài học về đếm cặp, không đếm 1-1.
6. **Độc lập ≠ disjoint** — đừng nhầm.
7. ML cần xác suất ở khắp nơi: sampling, dropout, bootstrap, hash bounds.

**Tiến tới**: [Lesson 02 — Conditional Probability + Bayes](../lesson-02-conditional-bayes/) — bước nhảy lớn nhất của xác suất hiện đại.
`;
