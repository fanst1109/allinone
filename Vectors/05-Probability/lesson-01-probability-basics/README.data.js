// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: Vectors/05-Probability/lesson-01-probability-basics/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 01 — Xác suất cơ bản (Probability Basics)

> Mở cánh cửa vào Tầng 5. Bài này cho bạn ngôn ngữ để nói về "may rủi" một cách chính xác: không gian mẫu, biến cố, các tiên đề Kolmogorov, đếm tổ hợp, và những ví dụ kinh điển (đồng xu, xúc xắc, lá bài, birthday paradox).

## Mục tiêu học tập

Sau khi học xong bài này, bạn có thể:

1. **Phân biệt** hiện tượng deterministic (chắc chắn) với probabilistic (ngẫu nhiên), và giải thích vì sao ta cần khái niệm xác suất.
2. **Mô tả** không gian mẫu $\\Omega$ cho một thí nghiệm ngẫu nhiên cụ thể, và viết được các biến cố như tập con của $\\Omega$.
3. **Nêu** ba tiên đề Kolmogorov và **dẫn ra** các hệ quả cơ bản: $P(\\varnothing) = 0$, $P(A^c) = 1 - P(A)$, $P(A \\cup B) = P(A) + P(B) - P(A \\cap B)$.
4. **Áp dụng** công thức xác suất cổ điển $P(A) = \\frac{|A|}{|\\Omega|}$ trong các tình huống đồng xác suất (equiprobable).
5. **Sử dụng** ba công cụ đếm — hoán vị $n!$, chỉnh hợp $P(n,k)$, tổ hợp $C(n,k)$ — để tính được kích thước của $\\Omega$ và của $A$.
6. **Tính tay** được birthday paradox (23 người → xác suất trùng ngày sinh ≈ 50,7%).
7. **Phân biệt** "biến cố độc lập" (independent) với "biến cố rời rạc/loại trừ lẫn nhau" (disjoint / mutually exclusive) — hai khái niệm thường bị nhầm.
8. **Liên hệ** xác suất với ba kỹ thuật ML: minibatch sampling, dropout, và bootstrap.

## Kiến thức tiền đề

- [Algebra L04 — Powers, Roots, Logs](../../01-Algebra/lesson-04-powers-roots-logs/) — bạn sẽ tính $52!$, $\\frac{365!}{342!}$, v.v. Khi gặp số khổng lồ, log giúp tính qua phép cộng thay vì nhân.
- [Algebra L05 — Functions](../../01-Algebra/lesson-05-functions/) — xác suất là một hàm $P : \\mathcal{F} \\to [0,1]$ (hàm từ biến cố sang số thực trong $[0,1]$).
- [Calculus L08 — Integrals](../../03-Calculus/lesson-08-integrals/) — sẽ cần ở **Lesson 04** khi sang biến ngẫu nhiên liên tục (PDF ∫ thay cho PMF Σ). Bài này chỉ dùng tổng rời rạc nên chưa cần ngay, nhưng bạn nên biết đường đi tới đó.

> Bài tiếp theo: [Lesson 02 — Xác suất có điều kiện + Bayes](../lesson-02-conditional-bayes/). Sau khi định nghĩa được $P(A)$, bài 02 sẽ hỏi: "nếu đã biết B xảy ra, $P(A)$ thay đổi thế nào?"

---

## 1. Trực giác — vì sao cần xác suất?

### 1.1. 💡 Hình dung — deterministic vs probabilistic

Có hai loại hiện tượng:

- **Deterministic** (định nghĩa: kết quả được xác định hoàn toàn bởi điều kiện ban đầu):
  - Thả viên đá từ độ cao 5 m → thời gian rơi $t = \\sqrt{2h/g} \\approx 1{,}01$ s. Lặp lại 1000 lần, kết quả vẫn vậy (sai số nhỏ do gió/ma sát).
  - Giải phương trình $2x + 3 = 7$ → $x = 2$. Không có "$x = 2$ với xác suất 90%".
- **Probabilistic** (ngẫu nhiên):
  - Tung 1 đồng xu → có thể H hoặc T, không đoán trước được kết quả cụ thể của lần tung tiếp theo.
  - Lấy bừa một học sinh trong lớp 40 người → ta không biết chính xác đó là ai, nhưng có thể nói "xác suất là một bạn nữ $\\approx \\frac{22}{40}$".
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

Trước khi nói "xác suất một biến cố", ta phải kể được **tất cả mọi kết quả có thể** của thí nghiệm. Đó là không gian mẫu $\\Omega$ (omega).

> **Định nghĩa**: Không gian mẫu $\\Omega$ của một thí nghiệm ngẫu nhiên là tập **tất cả** các kết quả (outcomes) có thể xảy ra, **đôi một loại trừ lẫn nhau** và **vét hết** mọi khả năng.

Ba từ khóa: **đầy đủ** (exhaustive — không sót khả năng nào), **rời rạc đôi một** (mutually exclusive — không có outcome nào trùng nhau), **xác định trước** (định nghĩa rõ trước khi thí nghiệm).

### 2.2. Ví dụ cụ thể

**Ví dụ 2.2.1 — Tung 1 đồng xu**:

$$\\Omega = \\{H, T\\}, \\qquad |\\Omega| = 2$$

(H = head/mặt ngửa, T = tail/mặt sấp.)

**Ví dụ 2.2.2 — Tung 2 đồng xu (phân biệt thứ tự)**:

$$\\Omega = \\{HH, HT, TH, TT\\}, \\qquad |\\Omega| = 4$$

HT (xu thứ nhất H, xu thứ hai T) $\\neq$ TH. Nếu coi 2 đồng xu giống hệt nhau và không quan tâm thứ tự thì $\\Omega$ rút lại còn $\\{2H, 1H1T, 2T\\}$ nhưng các outcome KHÔNG còn đồng xác suất → tránh dùng.

**Ví dụ 2.2.3 — Tung 3 đồng xu**:

$$\\Omega = \\{HHH, HHT, HTH, HTT, THH, THT, TTH, TTT\\}, \\qquad |\\Omega| = 8 = 2^3$$

Tổng quát: tung $n$ xu → $|\\Omega| = 2^n$.

**Ví dụ 2.2.4 — Gieo 1 xúc xắc 6 mặt**:

$$\\Omega = \\{1, 2, 3, 4, 5, 6\\}, \\qquad |\\Omega| = 6$$

**Ví dụ 2.2.5 — Gieo 2 xúc xắc**:

$$\\Omega = \\{(1,1), (1,2), \\dots, (1,6),\\ (2,1), \\dots, (2,6),\\ \\dots,\\ (6,1), \\dots, (6,6)\\}, \\qquad |\\Omega| = 36$$

Mỗi outcome là một cặp $(a, b)$ với $a, b \\in \\{1, \\dots, 6\\}$. Lưu ý: $(1,2) \\neq (2,1)$ — ta đang phân biệt xúc xắc nào ra số gì.

**Ví dụ 2.2.6 — Rút 1 lá bài từ bộ 52**:

$$\\Omega = \\{2\\spadesuit, 3\\spadesuit, \\dots, A\\spadesuit,\\ 2\\heartsuit, \\dots, A\\heartsuit,\\ 2\\diamondsuit, \\dots, A\\diamondsuit,\\ 2\\clubsuit, \\dots, A\\clubsuit\\}, \\qquad |\\Omega| = 52$$

**Ví dụ 2.2.7 — Thí nghiệm "tung xu đến khi ra mặt H đầu tiên"**:

$$\\Omega = \\{H, TH, TTH, TTTH, \\dots\\} = \\text{chuỗi vô hạn các outcome}$$

Đây là **$\\Omega$ vô hạn đếm được**. Tiên đề Kolmogorov vẫn áp dụng nhưng kỹ thuật tính phức tạp hơn — ta sẽ gặp lại ở Lesson 03 với phân phối Geometric.

**Ví dụ 2.2.8 — Đo nhiệt độ phòng**:

$$\\Omega = [-10, 50] \\quad (\\mathbb{R}, \\text{khoảng số thực})$$

Đây là **$\\Omega$ liên tục, không đếm được**. Cách tính xác suất khác hẳn (tích phân thay tổng) — Lesson 04.

### 2.3. ❓ Câu hỏi tự nhiên của người đọc

- *"Khi tung 2 xu, có thực sự phải phân biệt HT vs TH không? Trông giống nhau mà."*
  → Phải. Vì nếu gộp lại, các outcome không còn đồng xác suất: $P(\\text{một H một T}) = \\frac{2}{4} \\neq P(\\text{hai H}) = \\frac{1}{4}$. Để áp dụng công thức $P(A) = \\frac{|A|}{|\\Omega|}$ thì mọi outcome trong $\\Omega$ phải đồng xác suất, mà điều đó **chỉ đúng** khi ta phân biệt.

- *"$\\Omega = \\{1,2,3,4,5,6\\}$ cho xúc xắc — nhưng nhỡ xúc xắc xèo (loaded) thì sao?"*
  → $\\Omega$ vẫn thế (vẫn 6 outcome). Cái thay đổi là **xác suất gán cho từng outcome**, không phải tập $\\Omega$. $\\Omega$ chỉ kể "có gì có thể xảy ra"; $P$ kể "mỗi cái xảy ra với khả năng bao nhiêu".

- *"Có duy nhất một cách chọn $\\Omega$ cho mỗi thí nghiệm không?"*
  → Không. Cùng thí nghiệm "tung 2 xu" có thể có $\\Omega = \\{HH, HT, TH, TT\\}$ (chi tiết, 4 outcome) hoặc $\\Omega = \\{0, 1, 2\\}$ (đếm số H, 3 outcome). Chọn $\\Omega$ nào tùy mục đích, nhưng phải nhất quán: nếu $\\Omega = \\{0, 1, 2\\}$ thì các outcome không đồng xác suất ($P(0)=P(2)=\\frac{1}{4}$, $P(1)=\\frac{1}{2}$).

### 2.4. 🔁 Dừng lại tự kiểm tra

1. Mô tả $\\Omega$ cho thí nghiệm "rút 2 lá bài đồng thời từ bộ 52" (không quan tâm thứ tự).
2. $|\\Omega|$ khi tung 5 đồng xu phân biệt là bao nhiêu?

<details>
<summary>Đáp án</summary>

1. $\\Omega$ = tập tất cả các cặp không thứ tự $\\{x, y\\}$ với $x, y$ là lá bài khác nhau. $|\\Omega| = C(52, 2) = \\frac{52 \\cdot 51}{2} = 1326$.
2. $|\\Omega| = 2^5 = 32$.

</details>

**📝 Tóm tắt mục 2**:
- $\\Omega$ = tập mọi kết quả có thể, đầy đủ và rời rạc đôi một.
- Tung $n$ xu: $|\\Omega| = 2^n$. Gieo $k$ xúc xắc: $|\\Omega| = 6^k$. Bộ bài: $|\\Omega| = 52$.
- $\\Omega$ có thể hữu hạn, đếm được vô hạn, hoặc liên tục — ba trường hợp xử lý khác nhau.
- Có nhiều cách chọn $\\Omega$ cho cùng thí nghiệm; chọn cách nào tùy yêu cầu, nhưng phải nhất quán với cách gán xác suất.

---

## 3. Biến cố (Event)

### 3.1. 💡 Trực giác

Sau khi có $\\Omega$, ta hỏi: *"Tôi quan tâm tới những kết quả nào?"* Tập các kết quả đó là một **biến cố**.

> **Định nghĩa**: Biến cố $A$ là một **tập con** của $\\Omega$. Ta nói "biến cố $A$ xảy ra" nếu kết quả thực tế của thí nghiệm thuộc $A$.

### 3.2. Ví dụ

Lấy thí nghiệm gieo 1 xúc xắc, $\\Omega = \\{1, 2, 3, 4, 5, 6\\}$.

| Mô tả | Biến cố (tập con) |
|-------|-------------------|
| "Ra số chẵn" | $A = \\{2, 4, 6\\}$ |
| "Ra số $\\geq 5$" | $B = \\{5, 6\\}$ |
| "Ra số chẵn HOẶC $\\geq 5$" | $A \\cup B = \\{2, 4, 5, 6\\}$ |
| "Ra số chẵn VÀ $\\geq 5$" | $A \\cap B = \\{6\\}$ |
| "Không phải số chẵn" | $A^c = \\{1, 3, 5\\}$ |
| "Chắc chắn xảy ra" | $\\Omega = \\{1,2,3,4,5,6\\}$ (biến cố chắc chắn) |
| "Không bao giờ xảy ra" | $\\varnothing$ (biến cố trống) |

Lấy thí nghiệm tung 2 xu, $\\Omega = \\{HH, HT, TH, TT\\}$.

| Mô tả | Biến cố |
|-------|---------|
| "Ít nhất 1 mặt H" | $\\{HH, HT, TH\\}$ |
| "Đúng 1 mặt H" | $\\{HT, TH\\}$ |
| "Không có H nào" | $\\{TT\\}$ |

### 3.3. Các phép toán trên biến cố

Vì biến cố là tập hợp, ta dùng toán tử tập hợp:

- **Hợp** $A \\cup B$ = "A hoặc B (hoặc cả hai) xảy ra".
- **Giao** $A \\cap B$ = "cả A lẫn B đều xảy ra".
- **Phần bù** $A^c = \\Omega \\setminus A$ = "A KHÔNG xảy ra".
- **Hiệu** $A \\setminus B = A \\cap B^c$ = "A xảy ra nhưng B không".
- **Rời rạc / loại trừ lẫn nhau**: $A$ và $B$ gọi là **disjoint** (hay mutually exclusive) nếu $A \\cap B = \\varnothing$, tức không thể cùng xảy ra.

### 3.4. ⚠ Lỗi thường gặp

- **Nhầm "biến cố"** với "kết quả". Outcome $3$ là một phần tử của $\\Omega$; biến cố $\\{3\\}$ là tập chỉ chứa outcome đó. Một outcome → một biến cố cơ bản (elementary event).
- **Nhầm disjoint với độc lập**. Hai khái niệm khác nhau hoàn toàn — sẽ rõ ở mục 11. Spoiler: disjoint = không cùng xảy ra; independent = biết một cái xảy ra không ảnh hưởng xác suất cái kia. Hai biến cố disjoint **không thể** độc lập (trừ khi một trong hai có xác suất 0).

### 3.5. 🔁 Dừng lại tự kiểm tra

Tung 1 xúc xắc. Liệt kê các biến cố:

1. $C$ = "số nguyên tố".
2. $D$ = "số lẻ".
3. $C \\cap D$.

<details>
<summary>Đáp án</summary>

1. $C = \\{2, 3, 5\\}$ (2, 3, 5 là nguyên tố trong $\\{1, \\dots, 6\\}$; 1 không phải nguyên tố).
2. $D = \\{1, 3, 5\\}$.
3. $C \\cap D = \\{3, 5\\}$.

</details>

**📝 Tóm tắt mục 3**:
- Biến cố = tập con của $\\Omega$.
- Toán tử tập hợp = ngôn ngữ logic của biến cố: $\\cup$ = hoặc, $\\cap$ = và, $^c$ = phủ định.
- Disjoint = không cùng xảy ra ($A \\cap B = \\varnothing$), KHÁC với independent.

---

## 4. Xác suất P(A) — Hàm trên biến cố

### 4.1. 💡 Trực giác

Sau khi có Ω và các biến cố, ta cần một quy luật gán mỗi biến cố một con số trong [0,1] đo "mức độ xảy ra".

> **Định nghĩa**: Xác suất là một **hàm** $P: \\mathcal{F} \\to [0, 1]$ gán mỗi biến cố $A \\in \\mathcal{F}$ một số $P(A)$, thỏa ba tiên đề Kolmogorov (mục 5). Ở đây $\\mathcal{F}$ là tập các biến cố hợp lệ ($\\sigma$-đại số trên $\\Omega$); khi $\\Omega$ hữu hạn, ta lấy $\\mathcal{F}$ = tập toàn bộ subset của $\\Omega$.

- $P(A) = 0$ → A "gần như không bao giờ" xảy ra.
- $P(A) = 1$ → A "gần như chắc chắn" xảy ra.
- $P(A) = 0.5$ → ngang ngửa fifty-fifty.

### 4.2. Ba cách diễn giải

Cùng một con số $P(A) = 0.7$ nhưng có ba cách hiểu:

1. **Cổ điển (classical)**: nếu $\\Omega$ hữu hạn và đồng xác suất, $P(A) = \\frac{|A|}{|\\Omega|}$. Ví dụ "ra số chẵn" trên xúc xắc $= \\frac{3}{6} = 0.5$.
2. **Tần suất (frequentist)**: nếu lặp thí nghiệm $n$ lần và A xảy ra $m$ lần thì $P(A) \\approx \\frac{m}{n}$ khi $n \\to \\infty$ (luật số lớn). Tung xu 1 triệu lần → tỉ lệ H xấp xỉ 0.5.
3. **Bayesian (chủ quan)**: $P(A)$ là mức độ tin tưởng của bạn rằng A xảy ra, dựa trên thông tin hiện có. Có thể cập nhật khi có dữ liệu mới (Lesson 02).

Trong bài này ta dùng **cổ điển** là chính. Frequentist sẽ kiểm chứng qua mô phỏng trong viz. Bayesian là chủ đề Lesson 02.

**📝 Tóm tắt mục 4**:
- $P$ là hàm số gán mỗi biến cố một số trong $[0,1]$.
- Ba cách diễn giải: đếm (classical), đếm lặp (frequentist), niềm tin (Bayesian). Cùng một con số $P(A)$, ba câu chuyện khác nhau.

---

## 5. Ba tiên đề Kolmogorov

Andrey Kolmogorov (1933) gói gọn toàn bộ lý thuyết xác suất vào ba quy tắc:

> **Tiên đề K1 (không âm)**: với mọi biến cố $A$, ta có $P(A) \\geq 0$.
>
> **Tiên đề K2 (chuẩn hóa)**: $P(\\Omega) = 1$.
>
> **Tiên đề K3 (cộng tính rời)**: nếu $A_1, A_2, \\dots$ là các biến cố **đôi một disjoint** ($A_i \\cap A_j = \\varnothing$ với mọi $i \\neq j$), thì
> $$P(A_1 \\cup A_2 \\cup \\cdots) = P(A_1) + P(A_2) + \\cdots$$

### 5.1. 💡 Trực giác từng tiên đề

- **K1**: xác suất không thể âm. "Có $-0{,}3$ cơ hội ra số 6" là vô nghĩa.
- **K2**: cộng lại tất cả khả năng phải bằng 1. Một thí nghiệm thì có cái xảy ra, nên $P(\\Omega)$ — xác suất "cái gì đó trong $\\Omega$ xảy ra" — chính là 1.
- **K3**: nếu hai biến cố không cùng xảy ra được, xác suất "một trong hai" bằng tổng xác suất. Vd: $P(\\text{xúc xắc ra 1 hoặc ra 6}) = P(1) + P(6) = \\frac{1}{6} + \\frac{1}{6} = \\frac{2}{6}$. Đúng — vì "ra 1" và "ra 6" disjoint.

### 5.2. Walk-through với xúc xắc đồng xác suất

$\\Omega = \\{1,2,3,4,5,6\\}$, $P(\\{i\\}) = \\frac{1}{6}$ với mỗi $i$.

- K1: $P(\\{3\\}) = \\frac{1}{6} \\geq 0$ ✓.
- K2: $P(\\Omega) = P(\\{1\\}) + P(\\{2\\}) + \\cdots + P(\\{6\\}) = 6 \\cdot \\frac{1}{6} = 1$ ✓ (dùng K3 vì các singleton disjoint).
- K3 ví dụ: $A = \\{2\\}$, $B = \\{4\\}$ disjoint. $P(A \\cup B) = P(\\{2, 4\\}) = \\frac{2}{6}$. Mà $P(A) + P(B) = \\frac{1}{6} + \\frac{1}{6} = \\frac{2}{6}$ ✓.

### 5.3. ⚠ Lỗi thường gặp khi áp K3

K3 chỉ áp dụng khi $A, B$ disjoint. Với $A = \\text{"số chẵn"} = \\{2,4,6\\}$, $B = \\text{"} \\geq 4 \\text{"} = \\{4,5,6\\}$:

- $A \\cap B = \\{4, 6\\} \\neq \\varnothing$ → $A, B$ KHÔNG disjoint.
- $P(A) = \\frac{3}{6}$, $P(B) = \\frac{3}{6}$, $P(A) + P(B) = 1$ — không thể đúng! $P(A \\cup B)$ phải $\\leq 1$.
- Thực ra $A \\cup B = \\{2, 4, 5, 6\\}$ → $P(A \\cup B) = \\frac{4}{6}$. Công thức đúng: $P(A \\cup B) = P(A) + P(B) - P(A \\cap B) = \\frac{3}{6} + \\frac{3}{6} - \\frac{2}{6} = \\frac{4}{6}$ ✓ (mục 7).

**📝 Tóm tắt mục 5**:
- Ba tiên đề: $P \\geq 0$, $P(\\Omega) = 1$, cộng tính với biến cố disjoint.
- Từ ba tiên đề này dẫn ra TẤT CẢ các hệ quả khác của xác suất — không cần thêm giả định gì.

---

## 6. Hệ quả của tiên đề (chứng minh từng bước)

### 6.1. Hệ quả 1: P(∅) = 0

**Chứng minh từng bước**:
1. $\\varnothing$ và $\\Omega$ disjoint: $\\varnothing \\cap \\Omega = \\varnothing$ ✓.
2. $\\varnothing \\cup \\Omega = \\Omega$.
3. Áp K3 với $A_1 = \\Omega$, $A_2 = \\varnothing$: $P(\\Omega \\cup \\varnothing) = P(\\Omega) + P(\\varnothing)$.
4. Thay $P(\\Omega) = 1$ (K2) và $P(\\Omega \\cup \\varnothing) = P(\\Omega) = 1$: $1 = 1 + P(\\varnothing)$.
5. Suy ra $P(\\varnothing) = 0$. $\\blacksquare$

### 6.2. Hệ quả 2: P(Aᶜ) = 1 − P(A)

**Chứng minh**:
1. $A$ và $A^c$ disjoint: $A \\cap A^c = \\varnothing$ theo định nghĩa phần bù.
2. $A \\cup A^c = \\Omega$.
3. Áp K3: $P(A \\cup A^c) = P(A) + P(A^c)$.
4. Mặt khác $P(A \\cup A^c) = P(\\Omega) = 1$ (K2).
5. Vậy $1 = P(A) + P(A^c)$, tức $P(A^c) = 1 - P(A)$. $\\blacksquare$

**Ví dụ**: $P(\\text{"không ra 6" trên xúc xắc}) = 1 - P(\\{6\\}) = 1 - \\frac{1}{6} = \\frac{5}{6}$.

### 6.3. Hệ quả 3: nếu A ⊆ B thì P(A) ≤ P(B)

**Chứng minh**:
1. $B = A \\cup (B \\setminus A)$, và $A, B \\setminus A$ disjoint.
2. K3: $P(B) = P(A) + P(B \\setminus A)$.
3. K1 cho $P(B \\setminus A) \\geq 0$.
4. Vậy $P(B) \\geq P(A)$. $\\blacksquare$

### 6.4. Hệ quả 4 (quan trọng): P(A) ≤ 1

**Chứng minh**:
1. Mọi biến cố $A \\subseteq \\Omega$.
2. Áp hệ quả 3: $P(A) \\leq P(\\Omega) = 1$. $\\blacksquare$

### 6.5. Hệ quả 5 — Công thức cộng tổng quát (Inclusion-Exclusion 2 tập):

> $$P(A \\cup B) = P(A) + P(B) - P(A \\cap B)$$

**Chứng minh từng bước**:
1. Viết $A \\cup B = A \\cup (B \\setminus A)$. Hai tập này disjoint (cái thứ hai loại tất cả phần tử của A).
2. K3: $P(A \\cup B) = P(A) + P(B \\setminus A)$. **(I)**
3. Viết $B = (A \\cap B) \\cup (B \\setminus A)$. Hai tập này disjoint (cái đầu nằm trong A, cái sau nằm ngoài A).
4. K3: $P(B) = P(A \\cap B) + P(B \\setminus A)$.
5. Suy ra $P(B \\setminus A) = P(B) - P(A \\cap B)$. **(II)**
6. Thay (II) vào (I): $P(A \\cup B) = P(A) + P(B) - P(A \\cap B)$. $\\blacksquare$

**Walk-through với xúc xắc**: $A = \\{2,4,6\\}$ (chẵn), $B = \\{4,5,6\\}$ ($\\geq 4$).

- $P(A) = \\frac{3}{6}$, $P(B) = \\frac{3}{6}$, $P(A \\cap B) = P(\\{4,6\\}) = \\frac{2}{6}$.
- $P(A \\cup B) = \\frac{3}{6} + \\frac{3}{6} - \\frac{2}{6} = \\frac{4}{6}$.
- Kiểm chứng trực tiếp: $A \\cup B = \\{2,4,5,6\\}$ → $\\frac{4}{6}$ ✓.

### 6.6. Hệ quả mở rộng — Inclusion-Exclusion 3 tập:

> $$P(A \\cup B \\cup C) = P(A) + P(B) + P(C) - P(A \\cap B) - P(A \\cap C) - P(B \\cap C) + P(A \\cap B \\cap C)$$

Lý do có dấu cộng cuối: khi trừ ba giao đôi một, các phần tử nằm trong cả ba bị trừ ba lần (mỗi giao một lần) mà ban đầu chỉ cộng ba lần → ròng 0, nên phải cộng lại $P(A \\cap B \\cap C)$ một lần để đúng.

### 6.7. ❓ Câu hỏi tự nhiên

- *"$P(\\varnothing) = 0$ có ngược không? '$\\varnothing$ không bao giờ xảy ra' nên xác suất 0 thì hợp lý, nhưng vì sao chứng minh được từ tiên đề?"*
  → K2 nói $P(\\Omega) = 1$ và K3 (với $A = \\Omega$, $B = \\varnothing$) buộc $P(\\varnothing) = 0$. Tiên đề đã đủ chặt.

- *"Nếu $P(A) = 0$ thì A có chắc chắn không xảy ra không?"*
  → Trong $\\Omega$ hữu hạn: có. Trong $\\Omega$ liên tục: KHÔNG nhất thiết. Ví dụ "lấy số $x$ trong $[0,1]$ đúng bằng 0.5" có xác suất 0 nhưng vẫn có thể xảy ra. Đây là khác biệt giữa "almost never" (xác suất 0) và "impossible". Chi tiết ở Lesson 04.

### 6.8. 🔁 Dừng lại tự kiểm tra

Trong một lớp 30 học sinh:
- 18 thích Toán (M), 12 thích Lý (P), 7 thích cả hai.

1. $P(\\text{một bạn ngẫu nhiên thích Toán hoặc Lý})$?
2. $P(\\text{không thích cái nào trong hai})$?

<details>
<summary>Đáp án</summary>

1. $P(M \\cup P) = P(M) + P(P) - P(M \\cap P) = \\frac{18}{30} + \\frac{12}{30} - \\frac{7}{30} = \\frac{23}{30} \\approx 0{,}767$.
2. $P((M \\cup P)^c) = 1 - \\frac{23}{30} = \\frac{7}{30} \\approx 0{,}233$.

</details>

**📝 Tóm tắt mục 6**:
- Từ 3 tiên đề ta dẫn được: $P(\\varnothing)=0$, $P(A^c)=1-P(A)$, $A \\subseteq B \\Rightarrow P(A) \\leq P(B)$, $P(A) \\leq 1$.
- Inclusion-Exclusion: $P(A \\cup B) = P(A) + P(B) - P(A \\cap B)$.
- Mọi định lý xác suất rời rạc đều xuất phát từ ba tiên đề này — không cần thêm gì.

---

## 7. Xác suất cổ điển (Equiprobable / Laplace)

### 7.1. 💡 Trực giác

Khi mọi outcome đồng khả năng (không lý do nào để thiên vị outcome nào), xác suất một biến cố đơn giản là tỉ lệ "thuận lợi trên tổng số".

> **Công thức Laplace**: nếu $\\Omega$ hữu hạn và mọi outcome đồng xác suất, thì
>
> $$P(A) = \\frac{|A|}{|\\Omega|} = \\frac{\\text{số outcome thuận lợi}}{\\text{tổng số outcome}}.$$

**Tiền đề quan trọng**: phải đồng xác suất. Nếu xúc xắc xèo (loaded), công thức này không dùng được.

### 7.2. Vì sao công thức đúng (chứng minh)?

Giả sử $\\Omega = \\{\\omega_1, \\omega_2, \\dots, \\omega_n\\}$ có $n$ outcome, mỗi outcome có xác suất $p$ (đồng xác suất).

1. K3 áp cho $n$ singleton disjoint: $P(\\Omega) = P(\\{\\omega_1\\}) + \\cdots + P(\\{\\omega_n\\}) = n \\cdot p$.
2. K2: $P(\\Omega) = 1$ → $n \\cdot p = 1$ → $p = \\frac{1}{n} = \\frac{1}{|\\Omega|}$.
3. Với $A$ có $k$ outcome: $P(A) = k \\cdot p = \\frac{k}{n} = \\frac{|A|}{|\\Omega|}$. $\\blacksquare$

### 7.3. Ví dụ

**Ví dụ 7.3.1 — Xúc xắc, "ra số chẵn"**:
- $A = \\{2, 4, 6\\}$, $\\Omega = \\{1, \\dots, 6\\}$.
- $P(A) = \\frac{3}{6} = \\frac{1}{2}$.

**Ví dụ 7.3.2 — Xúc xắc, "ra số $\\geq 5$"**:
- $A = \\{5, 6\\}$, $|A| = 2$.
- $P(A) = \\frac{2}{6} = \\frac{1}{3}$.

**Ví dụ 7.3.3 — 2 xu, "ít nhất 1 H"**:
- $\\Omega = \\{HH, HT, TH, TT\\}$, $A = \\{HH, HT, TH\\}$.
- $P(A) = \\frac{3}{4}$. Hoặc tính qua phần bù: $A = \\text{"ít nhất 1 H"} = \\text{"không phải TT"}$ → $P(A) = 1 - P(\\{TT\\}) = 1 - \\frac{1}{4} = \\frac{3}{4}$ ✓.

**Ví dụ 7.3.4 — Rút 1 lá bài đỏ**:
- Đỏ $= \\heartsuit \\cup \\diamondsuit$, $|A| = 13 + 13 = 26$.
- $P(A) = \\frac{26}{52} = \\frac{1}{2}$.

**Ví dụ 7.3.5 — Rút 1 lá bài Át (Ace)**:
- $A = \\{A\\spadesuit, A\\heartsuit, A\\diamondsuit, A\\clubsuit\\}$, $|A| = 4$.
- $P(A) = \\frac{4}{52} = \\frac{1}{13} \\approx 0{,}0769$.

### 7.4. ⚠ Lỗi thường gặp

Tung 2 xu, hỏi $P(\\text{ra 1 H và 1 T})$. Người mới hay viết:
- "$\\Omega = \\{2H, 1H1T, 2T\\}$", $P(\\text{1H1T}) = \\frac{1}{3}$. SAI.

Thực ra $\\Omega$ phải có outcome đồng xác suất → $\\Omega = \\{HH, HT, TH, TT\\}$ với 4 outcome. "1H1T" $= \\{HT, TH\\}$ → $P = \\frac{2}{4} = \\frac{1}{2}$ ✓ (kiểm tra bằng mô phỏng trong viz).

**📝 Tóm tắt mục 7**:
- Công thức Laplace: $P(A) = \\frac{|A|}{|\\Omega|}$, chỉ áp khi outcome đồng xác suất.
- Bước thực hành: (1) định nghĩa $\\Omega$ chuẩn sao cho outcome đồng xác suất, (2) đếm $|A|$ và $|\\Omega|$, (3) chia.

---

## 8. Đếm tổ hợp (Combinatorics)

Vì Laplace cần $|A|$ và $|\\Omega|$, **đếm** là kỹ năng cốt lõi. Ba công thức nền tảng:

### 8.1. Quy tắc nhân (Multiplication Principle)

Nếu một việc gồm 2 bước, bước 1 có $m$ cách, bước 2 có $n$ cách, tổng số cách $= m \\cdot n$.

**Ví dụ**: ăn sáng có 3 món chính và 2 nước → $3 \\cdot 2 = 6$ combo.

Tổng quát: $k$ bước, bước $i$ có $n_i$ cách → tổng số $= n_1 \\cdot n_2 \\cdots n_k$.

**Ứng dụng**: tung 3 xu có $2 \\cdot 2 \\cdot 2 = 8$ outcome. Gieo 4 xúc xắc có $6^4 = 1296$ outcome.

### 8.2. Hoán vị (Permutation) — sắp xếp toàn bộ

> Số cách sắp xếp **$n$** phần tử khác nhau **theo thứ tự** $= n!$ ($n$ factorial).

$$n! = n \\cdot (n-1) \\cdot (n-2) \\cdots 2 \\cdot 1.$$

**Walk-through 1**: sắp 3 cuốn sách A, B, C lên kệ.
- Vị trí 1: 3 lựa chọn (A, B, hoặc C).
- Vị trí 2: 2 lựa chọn còn lại.
- Vị trí 3: 1 lựa chọn cuối.
- Tổng: $3 \\cdot 2 \\cdot 1 = 6 = 3!$ ✓

Liệt kê: ABC, ACB, BAC, BCA, CAB, CBA → đúng 6.

**Walk-through 2**: 4 người xếp hàng → $4! = 24$ cách.

**Walk-through 3**: 5 người ngồi vào 5 ghế → $5! = 120$ cách.

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
| 13 | $6\\ 227\\ 020\\ 800 \\approx 6{,}23 \\cdot 10^9$ |
| 52 | $\\approx 8{,}07 \\cdot 10^{67}$ |

Lưu ý: $0! = 1$ theo quy ước (cần để các công thức tổ hợp đẹp). Trực giác: có 1 cách sắp 0 phần tử (cách "không làm gì").

### 8.3. Chỉnh hợp (k-Permutation) — chọn k trong n có thứ tự

> Số cách chọn **$k$ phần tử** từ **$n$ phần tử** khác nhau, **có thứ tự** $= P(n,k) = \\dfrac{n!}{(n-k)!}$

Suy luận từ quy tắc nhân:
- Vị trí 1: $n$ cách chọn.
- Vị trí 2: $(n-1)$ cách còn lại.
- ...
- Vị trí $k$: $(n-k+1)$ cách.
- Tổng: $n \\cdot (n-1) \\cdots (n-k+1) = \\dfrac{n!}{(n-k)!}$.

**Walk-through 1**: chọn chủ tịch và phó chủ tịch (có thứ tự — vai trò khác) từ 10 ứng cử viên.
- $P(10, 2) = \\dfrac{10!}{8!} = 10 \\cdot 9 = 90$ cách.

**Walk-through 2**: chọn 3 vận động viên xếp hạng nhất, nhì, ba từ 8 người.
- $P(8, 3) = \\dfrac{8!}{5!} = 8 \\cdot 7 \\cdot 6 = 336$ cách.

**Walk-through 3**: chọn 5 người đứng đầu xếp hàng dọc từ 20 người.
- $P(20, 5) = 20 \\cdot 19 \\cdot 18 \\cdot 17 \\cdot 16 = 1\\ 860\\ 480$.

### 8.4. Tổ hợp (Combination) — chọn k trong n KHÔNG có thứ tự

> Số cách chọn **$k$ phần tử** từ **$n$ phần tử** khác nhau, **không quan tâm thứ tự** $= C(n,k) = \\dfrac{n!}{k! \\cdot (n-k)!}$

Ký hiệu khác: $\\binom{n}{k}$ hay $\\mathcal{C}(n,k)$.

Suy luận: số chỉnh hợp $P(n,k)$ đếm mỗi tập con kích thước $k$ tổng cộng $k!$ lần (vì $k$ phần tử có $k!$ cách xếp), nên chia đi $k!$:
- $C(n,k) = \\dfrac{P(n,k)}{k!} = \\dfrac{n!}{k! \\cdot (n-k)!}$

**Walk-through 1**: chọn 2 người trong 10 vào ban tổ chức (vai trò như nhau, không có thứ tự).
- $C(10, 2) = \\dfrac{10!}{2! \\cdot 8!} = \\dfrac{10 \\cdot 9}{2 \\cdot 1} = 45$ cách.

**Walk-through 2**: chọn 5 lá bài trong 52 (poker hand).
- $C(52, 5) = \\dfrac{52 \\cdot 51 \\cdot 50 \\cdot 49 \\cdot 48}{5 \\cdot 4 \\cdot 3 \\cdot 2 \\cdot 1} = \\dfrac{311\\ 875\\ 200}{120} = 2\\ 598\\ 960$ hand.

**Walk-through 3**: chọn 3 đỉnh trong 7 đỉnh để vẽ tam giác (không thứ tự).
- $C(7, 3) = \\dfrac{7!}{3! \\cdot 4!} = \\dfrac{7 \\cdot 6 \\cdot 5}{3 \\cdot 2 \\cdot 1} = 35$.

Tính chất hay dùng:
- $C(n,0) = 1$ (chọn 0 phần tử — 1 cách "không chọn").
- $C(n,n) = 1$ (chọn cả $n$).
- $C(n,k) = C(n, n-k)$ — đối xứng: chọn $k$ để lấy = chọn $(n-k)$ để bỏ. Ví dụ $C(10,3) = C(10,7) = 120$.
- $\\sum_k C(n,k) = 2^n$ (tổng các hàng tam giác Pascal).

### 8.5. ⚠ Hoán vị vs Chỉnh hợp vs Tổ hợp — phân biệt

Hỏi 4 câu để chọn đúng công thức:

| Câu hỏi | Đáp án | Công thức |
|---------|--------|-----------|
| Lấy hết hay chọn một phần? | Lấy hết, có thứ tự | $n!$ |
| Có thứ tự không? | Chọn $k$, có thứ tự | $P(n,k)$ |
| | Chọn $k$, không thứ tự | $C(n,k)$ |

**Ví dụ phân biệt**:
- "3 người trong 10 vào podium hạng 1-2-3" → có thứ tự → $P(10,3) = 720$.
- "3 người trong 10 vào ban tổ chức" → không thứ tự → $C(10,3) = 120$.

(Đúng quan hệ: $P = C \\cdot k!$ → $720 = 120 \\cdot 6$ ✓)

### 8.6. ❓ Câu hỏi tự nhiên

- *"Tính $52!$ làm sao khi nó là số 68 chữ số?"*
  → Dùng log: $\\log_{10}(52!) = \\sum \\log_{10}(i) \\approx 67{,}9$. Trong code dùng \`lgamma\` hoặc \`math.Lgamma\` (log $\\Gamma$). Khi tính $C(52, k)$ thì log-tổng các log thay vì nhân.
- *"Khi nào dùng $C(n,k)$?"* — bất cứ khi nào chọn "$k$ phần tử trong $n$" mà thứ tự không quan trọng: chia đội, chọn lá bài, tập con, kết hợp món ăn.
- *"$P(n,n)$ bằng gì?"* → $\\dfrac{n!}{(n-n)!} = \\dfrac{n!}{0!} = \\dfrac{n!}{1} = n!$. Đúng — chỉnh hợp tất cả = hoán vị.

### 8.7. 🔁 Dừng lại tự kiểm tra

1. Số cách xếp 6 người vào hàng?
2. Số cách chọn 4 lá trong 52 để xếp lên bàn (có thứ tự)?
3. Số cách chọn 3 món pizza trong 20 vị (không quan tâm thứ tự)?

<details>
<summary>Đáp án</summary>

1. $6! = 720$.
2. $P(52, 4) = 52 \\cdot 51 \\cdot 50 \\cdot 49 = 6\\ 497\\ 400$.
3. $C(20, 3) = \\dfrac{20 \\cdot 19 \\cdot 18}{6} = 1140$.

</details>

**📝 Tóm tắt mục 8**:
- Quy tắc nhân: $m$ bước → $n_1 \\cdot n_2 \\cdots$ cách.
- Hoán vị $n!$: xếp toàn bộ có thứ tự.
- Chỉnh hợp $P(n,k) = \\dfrac{n!}{(n-k)!}$: chọn $k$ có thứ tự.
- Tổ hợp $C(n,k) = \\dfrac{n!}{k!(n-k)!}$: chọn $k$ không thứ tự.
- Mẹo nhớ: $C(n,k) = \\dfrac{P(n,k)}{k!}$. Khi nghi ngờ, hỏi "thứ tự có quan trọng không?".

---

## 9. Các ví dụ kinh điển

### 9.1. Tung 2 đồng xu, P(cả 2 đều H)

$\\Omega = \\{HH, HT, TH, TT\\}$, $|\\Omega| = 4$. $A = \\{HH\\}$, $|A| = 1$.

$$P(A) = \\frac{1}{4} = 0{,}25.$$

### 9.2. Tung 3 đồng xu, P(đúng 2 H)

$\\Omega$ có $2^3 = 8$ outcome. $A = \\{HHT, HTH, THH\\}$ (chọn 2 vị trí cho H trong 3 vị trí $= C(3,2) = 3$).

$$P(A) = \\frac{3}{8} = 0{,}375.$$

Tổng quát: tung $n$ xu, $P(\\text{đúng } k \\text{ mặt H}) = \\dfrac{C(n,k)}{2^n}$ — đây chính là phân phối Binomial$(n, \\tfrac{1}{2})$ (sẽ học Lesson 03).

### 9.3. Xúc xắc, P(≥ 5)

$A = \\{5, 6\\}$, $|A| = 2$. $P(A) = \\frac{2}{6} = \\frac{1}{3} \\approx 0{,}333$.

### 9.4. Tổng 2 xúc xắc = 7

$|\\Omega| = 36$. Các cặp tổng 7: $(1,6), (2,5), (3,4), (4,3), (5,2), (6,1)$ — 6 cặp.

$$P(\\text{sum} = 7) = \\frac{6}{36} = \\frac{1}{6} \\approx 0{,}167.$$

Đây là tổng có xác suất cao nhất trên 2 xúc xắc — dùng nhiều trong board games.

### 9.5. Rút 1 lá bài đỏ

26 lá đỏ / 52 lá. $P = \\frac{26}{52} = \\frac{1}{2} = 0{,}5$.

### 9.6. Rút 5 lá poker, P(four of a kind = 4 lá cùng giá trị)

Số hand 4-of-a-kind:
- Chọn rank cho bộ 4: 13 cách.
- Chọn 4 lá trong 4 lá cùng rank: $C(4,4) = 1$ cách (lấy cả 4).
- Chọn lá thứ 5 từ 48 lá còn lại: 48 cách.
- Tổng: $13 \\cdot 1 \\cdot 48 = 624$.

$$P = \\frac{624}{C(52,5)} = \\frac{624}{2\\ 598\\ 960} \\approx 0{,}000240 = \\frac{1}{4165}.$$

### 9.7. Birthday Paradox — câu chuyện hay nhất

**Hỏi**: trong nhóm 23 người ngẫu nhiên, xác suất ít nhất 2 người trùng ngày sinh là bao nhiêu?

**Trực giác sai**: $\\frac{23}{365} \\approx 6{,}3\\%$ → ít. Đáp án thực: **≈ 50,7%** — khá lớn! Vì sao gọi "paradox".

**Cách tính** (dùng phần bù):

1. $\\Omega$ = mọi cách gán ngày sinh cho 23 người $= 365^{23}$ outcome (mỗi người 365 lựa chọn, độc lập).
2. $A$ = "ít nhất 2 người trùng ngày sinh". Tính qua $A^c$ = "tất cả 23 người sinh nhật khác nhau" sẽ dễ hơn.
3. $|A^c|$ = số cách chọn 23 ngày khác nhau từ 365, có thứ tự (vì người 1, người 2,... khác nhau)
   $= P(365, 23) = 365 \\cdot 364 \\cdot 363 \\cdots 343$ (23 thừa số).
4. $P(A^c) = \\dfrac{365 \\cdot 364 \\cdots 343}{365^{23}} = \\displaystyle\\prod_{i=0}^{22} \\frac{365-i}{365}$.
5. $P(A) = 1 - P(A^c)$.

**Walk-through tính** (làm tay vài bước, rồi đưa ra số):

| $k$ người | $P(\\text{không trùng})$ | $P(\\text{có trùng})$ |
|---------|---------------|-------------|
| 1 | 1.0000 | 0.0000 |
| 5 | $1 \\cdot \\frac{364}{365} \\cdot \\frac{363}{365} \\cdot \\frac{362}{365} \\cdot \\frac{361}{365} \\approx 0.9729$ | 0.0271 |
| 10 | 0.8831 | 0.1169 |
| 20 | 0.5886 | 0.4114 |
| **23** | **0.4927** | **0.5073** ⭐ |
| 30 | 0.2937 | 0.7063 |
| 50 | 0.0296 | 0.9704 |
| 70 | 0.00084 | 0.99916 |

→ 23 người là ngưỡng đầu tiên $P(\\text{trùng}) > 50\\%$.

**Vì sao trực giác sai**: ta hay đếm "có ai trùng với TÔI" (23 so sánh với 1 người) thay vì "có CẶP nào trùng" ($C(23, 2) = 253$ cặp). Số cặp lớn hơn 100 lần → cơ hội trùng cao hơn nhiều.

**Liên hệ ML**: hash collision. Nếu hash function có $2^N$ giá trị output, theo birthday bound, sau $\\sim \\sqrt{2^N} = 2^{N/2}$ input ngẫu nhiên là khả năng cao có 2 input bị trùng hash. Đây là lý do MD5 (output 128-bit) chỉ "an toàn" tới khoảng $2^{64}$ input, không phải $2^{128}$.

### 9.8. 🔁 Dừng lại tự kiểm tra

1. Tổng 2 xúc xắc bằng 2 — xác suất?
2. Tung 4 xu, P(đúng 2 H)?

<details>
<summary>Đáp án</summary>

1. Chỉ 1 outcome $(1,1)$ → $P = \\frac{1}{36} \\approx 0{,}028$.
2. $\\dfrac{C(4, 2)}{2^4} = \\dfrac{6}{16} = \\dfrac{3}{8} = 0{,}375$.

</details>

**📝 Tóm tắt mục 9**:
- Bài toán xác suất cổ điển = bài toán đếm. Khó hay dễ là khó hay dễ đếm.
- Khi A khó đếm trực tiếp, hãy thử $A^c$ (như birthday paradox).
- Birthday paradox dạy ta: con người underestimate khả năng trùng vì đếm sai (so sánh 1-1 thay vì cặp).

---

## 10. Độc lập (Independence)

### 10.1. 💡 Trực giác

Hai biến cố **độc lập** nếu biết một cái xảy ra **không thay đổi** xác suất cái kia.

- Tung xu lần 1 ra H — có ảnh hưởng xu lần 2 không? **Không** → độc lập.
- Bốc 2 lá bài liên tiếp (không hoàn lại): lá 1 là $\\spadesuit$ → lá 2 có xác suất là $\\spadesuit$ thay đổi (51 lá còn lại, 12 lá $\\spadesuit$) → **không độc lập**.

### 10.2. Định nghĩa hình thức

> $A$ và $B$ **độc lập** $\\Leftrightarrow P(A \\cap B) = P(A) \\cdot P(B)$.

**Walk-through 1**: tung 2 xu phân biệt.
- $A$ = "xu 1 ra H" $= \\{HH, HT\\}$, $P(A) = \\frac{2}{4} = \\frac{1}{2}$.
- $B$ = "xu 2 ra H" $= \\{HH, TH\\}$, $P(B) = \\frac{2}{4} = \\frac{1}{2}$.
- $A \\cap B = \\{HH\\}$, $P(A \\cap B) = \\frac{1}{4}$.
- Kiểm tra: $P(A) \\cdot P(B) = \\frac{1}{4} = P(A \\cap B)$ ✓ → độc lập.

**Walk-through 2**: gieo 1 xúc xắc.
- $A$ = "chẵn" $= \\{2,4,6\\}$, $P(A) = \\frac{1}{2}$.
- $B$ = "$\\geq 4$" $= \\{4,5,6\\}$, $P(B) = \\frac{1}{2}$.
- $A \\cap B = \\{4, 6\\}$, $P(A \\cap B) = \\frac{2}{6} = \\frac{1}{3}$.
- $P(A) \\cdot P(B) = \\frac{1}{4} \\neq \\frac{1}{3}$ → **không độc lập**. Trực giác: biết "$\\geq 4$" thì khả năng "chẵn" cao hơn (2 trong 3 thay vì 3 trong 6 $= \\frac{1}{2}$). Có ràng buộc.

**Walk-through 3**: xúc xắc.
- $A$ = "chẵn" $= \\{2,4,6\\}$, $P(A) = \\frac{1}{2}$.
- $C$ = "$\\leq 3$" $= \\{1,2,3\\}$, $P(C) = \\frac{1}{2}$.
- $A \\cap C = \\{2\\}$, $P(A \\cap C) = \\frac{1}{6}$. Kiểm tra: $P(A) \\cdot P(C) = \\frac{1}{2} \\cdot \\frac{1}{2} = \\frac{1}{4} \\neq \\frac{1}{6}$ → KHÔNG độc lập.

  Trực giác: trong $A = \\{2,4,6\\}$, chỉ có $\\frac{1}{3}$ phần tử trong $C$; trong tổng thể, $C$ chiếm $\\frac{1}{2}$ — tỉ lệ khác → biết $A$ thay đổi $P(C)$.

### 10.3. ⚠ Độc lập KHÁC rời rạc

Đây là chỗ nhầm phổ biến nhất.

| Khái niệm | Định nghĩa | Hệ quả |
|-----------|-----------|--------|
| **Disjoint** (rời rạc, loại trừ) | $A \\cap B = \\varnothing$ | $P(A \\cup B) = P(A) + P(B)$; KHÔNG cùng xảy ra |
| **Independent** (độc lập) | $P(A \\cap B) = P(A)P(B)$ | Biết A xảy ra không thay đổi $P(B)$ |

**Phản ví dụ**: nếu $A, B$ disjoint và cả hai có xác suất $> 0$:
- $P(A \\cap B) = P(\\varnothing) = 0$.
- $P(A) \\cdot P(B) > 0$.
- → $P(A \\cap B) \\neq P(A) \\cdot P(B)$ → **không độc lập**.

Trực giác: nếu disjoint, biết "A đã xảy ra" → biết chắc "B không xảy ra" → cực kỳ phụ thuộc, không độc lập.

**Quy tắc nhớ**: disjoint = "loại nhau" (chống nhau); independent = "không liên quan" (mặc kệ nhau). Hai từ đời sống nghe na ná nhưng toán khác hẳn.

### 10.4. Độc lập của nhiều biến cố

$A_1, A_2, \\dots, A_n$ gọi là **độc lập đôi** (pairwise independent) nếu mỗi cặp $A_i, A_j$ độc lập.

Mạnh hơn: **độc lập toàn phần** (mutual independence) — với mọi tập con $I \\subseteq \\{1, \\dots, n\\}$, $P\\left(\\bigcap_{i \\in I} A_i\\right) = \\prod_{i \\in I} P(A_i)$.

Trong đa số bài tập (tung $n$ đồng xu độc lập, v.v.), ta giả định **độc lập toàn phần**.

**Ví dụ**: tung 5 xu liên tiếp, $P(\\text{toàn ra H}) = \\left(\\frac{1}{2}\\right)^5 = \\frac{1}{32}$.

### 10.5. 🔁 Dừng lại tự kiểm tra

$A$ = "xúc xắc ra số chia hết cho 3" $= \\{3, 6\\}$. $B$ = "xúc xắc ra số $> 4$" $= \\{5, 6\\}$. Hỏi $A, B$ có độc lập không?

<details>
<summary>Đáp án</summary>

$P(A) = \\frac{2}{6} = \\frac{1}{3}$, $P(B) = \\frac{2}{6} = \\frac{1}{3}$, $A \\cap B = \\{6\\}$, $P(A \\cap B) = \\frac{1}{6}$.

$P(A) \\cdot P(B) = \\frac{1}{9}$.

$\\frac{1}{6} \\neq \\frac{1}{9}$ → **không độc lập**.

</details>

**📝 Tóm tắt mục 10**:
- $A, B$ độc lập $\\Leftrightarrow P(A \\cap B) = P(A)P(B)$.
- ĐỘC LẬP và DISJOINT là hai khái niệm khác nhau hoàn toàn — disjoint với xác suất $> 0$ thì KHÔNG độc lập.
- Tung $n$ biến cố độc lập: $P(\\text{tất cả xảy ra}) = \\prod P(A_i)$.

---

## 11. Liên hệ ML/AI

### 11.1. Data sampling — chọn minibatch ngẫu nhiên

Khi train neural network, ta không đưa toàn bộ dataset (vd 1 triệu ảnh) vào mỗi bước; ta chọn **minibatch** (vd 64 ảnh) ngẫu nhiên.

- $\\Omega$ = tập tất cả các tập con kích thước 64 trong dataset $= C(1{,}000{,}000,\\ 64)$ cách.
- Mỗi minibatch là một outcome đồng xác suất (uniform sampling).

Lý do dùng minibatch: gradient từ batch nhỏ là **ước lượng không lệch** (unbiased estimator) của gradient toàn bộ data; rẻ hơn rất nhiều và làm bước cập nhật stochastic — giúp thoát khỏi điểm cực trị địa phương.

### 11.2. Dropout — bỏ neuron ngẫu nhiên

Trong mỗi forward pass khi training, mỗi neuron của layer dropout bị **tắt** với xác suất $p$ (thường $p = 0.5$).

- Mỗi neuron $i$ có biến cố "alive$_i$" với $P(\\text{alive}_i) = 1 - p$, độc lập giữa các neuron.
- Một mạng có $N$ neuron với dropout $p = 0.5$ → $2^N$ "sub-network" có thể, mỗi cái xác suất $\\frac{1}{2^N}$.
- Hiệu ứng: chống overfit, tựa như train một ensemble khổng lồ của $2^N$ mạng nhỏ.

### 11.3. Bootstrap — random sampling with replacement

Có dataset $N$ điểm. Tạo "bootstrap sample" cùng kích thước $N$ nhưng **lấy có hoàn lại** (with replacement).

- Mỗi vị trí trong bootstrap chọn đều trong $N$ điểm gốc → $P(\\text{điểm } i \\text{ được chọn cho vị trí cụ thể}) = \\frac{1}{N}$.
- $P(\\text{điểm } i \\text{ KHÔNG được chọn lần nào trong } N \\text{ lần lấy}) = \\left(1 - \\frac{1}{N}\\right)^N \\to \\frac{1}{e} \\approx 0.368$ khi $N \\to \\infty$.
- → Mỗi bootstrap sample chứa trung bình **63,2%** điểm gốc, có lặp.

Bootstrap dùng để ước lượng phương sai của estimator (random forest = ensemble của tree, mỗi tree học một bootstrap).

### 11.4. Birthday bound trong hash function

Như đã thấy ở mục 9.7, hash output $N$-bit "va chạm" sau $\\sim 2^{N/2}$ input. Đây là lý do:
- SHA-256 (256-bit) → an toàn tới $\\sim 2^{128}$ input — quá lớn để brute-force.
- MD5 (128-bit) → vỡ ở $\\sim 2^{64}$ — khả thi cho attacker.

**📝 Tóm tắt mục 11**:
- Sampling minibatch, dropout, bootstrap đều là ứng dụng trực tiếp của xác suất cổ điển.
- Birthday paradox không phải trò vui — nó quyết định độ dài hash trong crypto.
- Hiểu xác suất = hiểu được "vì sao thuật toán làm thế này".

---

## 12. Bài tập

Mỗi bài có lời giải chi tiết ở mục 13. Hãy thử tự làm trước.

### Bài 12.1 — Hai xúc xắc

Gieo 2 xúc xắc 6 mặt phân biệt. Tính:
- (a) $P(\\text{tổng} = 10)$.
- (b) $P(\\text{ít nhất một xúc xắc ra 6})$.
- (c) $P(\\text{hai xúc xắc ra số khác nhau})$.

### Bài 12.2 — Rút bài

Rút 1 lá từ bộ 52. Tính:
- (a) $P(\\text{lá đó là rồng J/Q/K})$.
- (b) $P(\\text{lá đó là đỏ HOẶC là J})$.

### Bài 12.3 — Tổ hợp pizza

Quán có 12 vị topping. Khách chọn pizza 4 vị (không trùng, không thứ tự). Có bao nhiêu cách chọn? Nếu chọn ngẫu nhiên, xác suất pizza đó CHỨA "phô mai" (1 trong 12 vị) là bao nhiêu?

### Bài 12.4 — Birthday cho 30 người

Trong nhóm 30 người, xác suất ít nhất 2 trùng ngày sinh là bao nhiêu? (Cho 365 ngày, bỏ qua năm nhuận.)

### Bài 12.5 — Độc lập

Gieo 2 xúc xắc. Đặt:
- $A$ = "xúc xắc thứ nhất ra chẵn".
- $B$ = "tổng 2 xúc xắc bằng 7".

$A$ và $B$ có độc lập không?

### Bài 12.6 — Poker

Rút 5 lá poker. Tính $P(\\text{flush = 5 lá cùng chất, không cần liên tiếp})$.

---

## 13. Lời giải chi tiết

### 13.1 — Hai xúc xắc

$|\\Omega| = 36$ outcome.

**(a) $P(\\text{tổng} = 10)$**: các cặp $(a,b)$ với $a+b=10$ là $(4,6), (5,5), (6,4)$ → 3 cặp. $P = \\frac{3}{36} = \\frac{1}{12} \\approx 0{,}0833$.

**(b) $P(\\text{ít nhất một 6})$**: dùng phần bù.
- "Không có 6 nào" = mỗi xúc xắc thuộc $\\{1, \\dots, 5\\}$ = $5 \\cdot 5 = 25$ outcome.
- $P(\\text{"ít nhất 1 sáu"}) = 1 - \\frac{25}{36} = \\frac{11}{36} \\approx 0{,}306$.

**(c) $P(\\text{hai số khác nhau})$**:
- $|\\text{"hai số khác nhau"}| = 36 - 6 = 30$ (6 outcome khi $a=b$: $(1,1),(2,2),\\dots,(6,6)$).
- $P = \\frac{30}{36} = \\frac{5}{6} \\approx 0{,}833$.

### 13.2 — Rút bài

**(a) J/Q/K**: mỗi rank 4 lá, 3 rank → 12 lá. $P = \\frac{12}{52} = \\frac{3}{13} \\approx 0{,}231$.

**(b) Đỏ HOẶC J** (inclusion-exclusion):
- Đỏ: 26 lá. J: 4 lá. Đỏ $\\cap$ J ($J\\heartsuit, J\\diamondsuit$): 2 lá.
- $P = \\frac{26}{52} + \\frac{4}{52} - \\frac{2}{52} = \\frac{28}{52} = \\frac{7}{13} \\approx 0{,}538$.

### 13.3 — Pizza

Tổng số pizza 4 vị: $C(12, 4) = \\dfrac{12!}{4! \\cdot 8!} = \\dfrac{12 \\cdot 11 \\cdot 10 \\cdot 9}{4 \\cdot 3 \\cdot 2 \\cdot 1} = \\dfrac{11\\ 880}{24} = 495$ cách.

$P(\\text{chứa phô mai})$: cố định phô mai trong 4 vị, chọn 3 vị còn lại trong 11 vị → $C(11, 3) = 165$.

$$P = \\frac{165}{495} = \\frac{1}{3} \\approx 0{,}333.$$

(Kiểm tra trực giác: $P = \\frac{4}{12} = \\frac{1}{3}$ — mỗi vị có cơ hội đều, một vị cụ thể "có mặt" với xác suất $\\frac{4}{12} = \\frac{1}{3}$ ✓.)

### 13.4 — Birthday 30 người

$$P(\\text{không trùng}) = \\prod_{i=0}^{29} \\frac{365-i}{365} = \\frac{365 \\cdot 364 \\cdots 336}{365^{30}}.$$

Tính nhanh bằng log:

$$\\log P(\\text{không trùng}) = \\sum_{i=0}^{29} \\log\\left(\\frac{365-i}{365}\\right) = \\sum \\log\\left(1 - \\frac{i}{365}\\right)$$

Với $x$ nhỏ, $\\log(1 - x) \\approx -x - \\frac{x^2}{2}$. Tổng (xấp xỉ):

$$\\sum_{i=0}^{29} -\\frac{i}{365} = -\\frac{0+1+\\cdots+29}{365} = -\\frac{435}{365} \\approx -1{,}192.$$

→ $P(\\text{không trùng}) \\approx e^{-1{,}192} \\approx 0{,}304$. Hơi thấp so với tính chính xác (do bỏ $\\frac{x^2}{2}$). Tính chính xác cho ra $P(\\text{không trùng}) \\approx 0{,}294$ → $P(\\text{có trùng}) \\approx 0{,}706 \\approx 70{,}6\\%$.

### 13.5 — Độc lập

$P(A)$ = "xúc xắc 1 chẵn" $= \\frac{1}{2}$ (rõ ràng, 3 trong 6).

$P(B)$ = "tổng = 7" $= \\frac{6}{36} = \\frac{1}{6}$ (đã tính ở 9.4).

$A \\cap B$ = "xúc xắc 1 chẵn VÀ tổng = 7". Liệt kê: $(2,5), (4,3), (6,1)$ — 3 outcome.
$P(A \\cap B) = \\frac{3}{36} = \\frac{1}{12}$.

So sánh: $P(A) \\cdot P(B) = \\frac{1}{2} \\cdot \\frac{1}{6} = \\frac{1}{12} = P(A \\cap B)$ → **độc lập**.

(Trực giác: dù xúc xắc 1 ra chẵn hay lẻ, vẫn có 6 cách để tổng = 7 — không có thiên vị.)

### 13.6 — Flush

Tổng số hand 5 lá: $C(52, 5) = 2\\ 598\\ 960$.

Số hand flush (5 lá cùng chất):
- Chọn 1 trong 4 chất: 4 cách.
- Chọn 5 lá trong 13 lá của chất đó: $C(13, 5) = 1287$.
- Tổng: $4 \\cdot 1287 = 5148$.

(Lưu ý: con số này bao gồm "straight flush" và "royal flush" — nếu muốn flush "thuần" thì trừ 40 straight flush ra. Đa số sách lấy 5148 làm tổng flush.)

$$P(\\text{flush}) = \\frac{5148}{2\\ 598\\ 960} \\approx 0{,}001981 \\approx \\frac{1}{505} \\approx 0{,}198\\%.$$

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

- **Lesson 02**: $P(A \\mid B)$, Bayes' theorem — câu chuyện "biết B thì $P(A)$ là gì?".
- **Lesson 03**: biến ngẫu nhiên rời rạc, PMF, Bernoulli/Binomial — gói gọn các thí nghiệm xác suất rời rạc.
- **Lesson 04**: liên tục, PDF/CDF, $\\int$ thay $\\sum$ — cần tích phân ([Calculus L08](../../03-Calculus/lesson-08-integrals/)).
- **Lesson 05**: phân phối Gaussian + CLT — vì sao đa số dữ liệu "trông giống chuông".
- **Lesson 07-08**: MLE → cross-entropy — gốc của loss function ML.

### 14.3. Tham khảo

- **Files trong lesson**: [\`README.md\`](./README.md) (file này), [\`visualization.html\`](./visualization.html) — viz có 4 component tương tác.
- **Sách**: Sheldon Ross — *A First Course in Probability* (chương 1-2 phủ chính xác nội dung này).
- **Online**: Khan Academy / 3Blue1Brown ("Why is this Pi here? And why squared?" — birthday paradox).

### 14.4. 📝 Tóm tắt bài học

1. Xác suất là ngôn ngữ của thiếu thông tin và ngẫu nhiên.
2. Bộ ba **$\\Omega$ – biến cố – $P$** là khung sườn; ba **tiên đề Kolmogorov** đủ định nghĩa mọi thứ.
3. **Xác suất cổ điển**: $P(A) = \\frac{|A|}{|\\Omega|}$ khi đồng xác suất → quy về **đếm**.
4. **Ba công thức đếm**: hoán vị $(n!)$, chỉnh hợp $\\left(\\frac{n!}{(n-k)!}\\right)$, tổ hợp $\\left(\\frac{n!}{k!(n-k)!}\\right)$.
5. **Birthday paradox**: 23 người đủ để $P(\\text{trùng}) > 50\\%$ — bài học về đếm cặp, không đếm 1-1.
6. **Độc lập ≠ disjoint** — đừng nhầm.
7. ML cần xác suất ở khắp nơi: sampling, dropout, bootstrap, hash bounds.

**Tiến tới**: [Lesson 02 — Conditional Probability + Bayes](../lesson-02-conditional-bayes/) — bước nhảy lớn nhất của xác suất hiện đại.
`;
