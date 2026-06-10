# Lesson 02 — Xác suất có điều kiện + Bayes

> Bước nhảy lớn nhất của xác suất hiện đại. Sau bài này, bạn sẽ trả lời được những câu hỏi "đời thật": *"Test dương tính nghĩa là tôi có bệnh không?"*, *"Email này có spam không, biết rằng nó chứa từ 'viagra'?"*, *"Hôm qua nó nhắn 'rảnh không' — thực sự nó thích mình hay nó chỉ buồn?"*. Tất cả đều quy về một công thức: **Bayes' theorem**.

## Mục tiêu học tập

Sau khi học xong, bạn sẽ:

1. **Hiểu** ý nghĩa của $P(A \mid B)$ là "xác suất A khi đã biết B xảy ra", và **diễn tả** được nó dưới góc nhìn "thu hẹp không gian mẫu".
2. **Áp dụng** công thức $P(A \mid B) = \frac{P(A \cap B)}{P(B)}$ (với $P(B) > 0$) cho các bài toán cards, dice, family, medical test.
3. **Dùng** quy tắc nhân (multiplication rule) $P(A \cap B) = P(A \mid B) \cdot P(B)$ để tính xác suất kết hợp khi biết một bên là điều kiện.
4. **Phân biệt** rõ "độc lập" (independence) với "xung khắc" (disjoint), kèm điều kiện kiểm tra $P(A \cap B) = P(A) \cdot P(B)$.
5. **Phát biểu** và **dẫn xuất** định lý Bayes từ quy tắc nhân.
6. **Tính** xác suất hậu nghiệm (posterior) trong bài toán medical test cổ điển, và **giải thích** vì sao P(disease | positive) lại thấp hơn ta tưởng (base rate fallacy).
7. **Xây** một bộ lọc Naive Bayes đơn giản cho spam — tính toán đầy đủ trên giấy.
8. **Liên hệ** Bayes với Bayesian inference trong ML/AI: prior, likelihood, posterior, MAP estimation.

## Kiến thức tiền đề

- [Lesson 01 — Xác suất cơ bản](../lesson-01-probability-basics/) — bạn cần biết $P(A) = \frac{|A|}{|\Omega|}$ và 3 tiên đề Kolmogorov, đặc biệt là phép giao $A \cap B$ và phép hợp $A \cup B$.
- [Algebra L05 — Functions](../../01-Algebra/lesson-05-functions/) — vì $P(\cdot \mid B)$ là một hàm xác suất mới trên không gian $\Omega$ đã thu hẹp.
- Hữu ích nhưng không bắt buộc: [Algebra L04 — Logs](../../01-Algebra/lesson-04-powers-roots-logs/) — Naive Bayes thường tính bằng log để tránh underflow.

> Bài tiếp theo: [Lesson 03 — Biến ngẫu nhiên rời rạc](../lesson-03-discrete-rv/). Sau khi đã làm chủ ngôn ngữ "biến cố", bài 03 sẽ chuyển sang ngôn ngữ "biến ngẫu nhiên" (random variable) — một cách tổng quát hơn để mô tả thí nghiệm xác suất.

---

## 1. Vấn đề: vì sao cần "có điều kiện"?

### 1.1. 💡 Trực giác — thông tin mới làm thay đổi xác suất

Tung một xúc xắc 6 mặt. Trước khi nhìn kết quả:

- $P(\text{"ra 6"}) = \frac{1}{6} \approx 0{,}167$.

Bây giờ ai đó nhìn xúc xắc và bảo "kết quả là số chẵn" (không nói ra cụ thể là gì). Xác suất "ra 6" bây giờ là gì?

- Không gian mẫu *cũ* là $\{1, 2, 3, 4, 5, 6\}$. Ta đếm $\frac{|\{6\}|}{|\Omega|} = \frac{1}{6}$.
- Khi đã biết "ra chẵn", không gian *mới* chỉ còn $\{2, 4, 6\}$. Trong đó, "ra 6" có 1 outcome trên 3 → **xác suất mới $= \frac{1}{3}$**.

Xác suất tăng từ $\frac{1}{6}$ lên $\frac{1}{3}$ chỉ vì có thêm thông tin "chẵn". Đây là ý tưởng cốt lõi: **xác suất có điều kiện = xác suất cập nhật theo thông tin mới**.

> **Cách hình dung**: $P(A \mid B)$ là *xác suất của A, nếu ta sống trong thế giới đã thu hẹp lại chỉ còn B*.

### 1.2. Vì sao quan trọng cho ML/AI

- **Spam filter**: $P(\text{spam} \mid \text{email chứa "free"})$ cao hơn $P(\text{spam})$ chung. Ta cập nhật niềm tin dựa trên từng từ.
- **Medical AI**: $P(\text{bệnh} \mid \text{symptoms})$ — chẩn đoán bằng cách kết hợp các triệu chứng.
- **Recommendation**: $P(\text{user thích phim X} \mid \text{đã thích phim Y, Z})$ — đề xuất theo lịch sử.
- **Language model**: $P(\text{từ tiếp theo} \mid \text{các từ trước đó})$ — chính là cơ chế của GPT/Claude.
- **Bayesian neural network**: cập nhật trọng số từ posterior distribution.

Mọi thứ "thông minh" trong ML đều cập nhật xác suất theo dữ liệu — và Bayes là khung mathematic để làm việc đó.

**📝 Tóm tắt mục 1**:
- Khi có thông tin mới B, không gian mẫu thu hẹp về B → xác suất A thay đổi.
- Trực giác: "$P(A \mid B)$ = phần A *bên trong* B, chia cho B".
- Đây là nền tảng cho hầu hết mọi cập nhật xác suất trong ML.

---

## 2. Định nghĩa hình thức của P(A|B)

### 2.1. Công thức

> **Định nghĩa**. Với hai biến cố $A, B \subseteq \Omega$ và **$P(B) > 0$**:
>
> $$P(A \mid B) = \frac{P(A \cap B)}{P(B)}$$
>
> Đọc là: *"xác suất A khi đã biết B"* hoặc *"xác suất A có điều kiện B"*.

**Lưu ý quan trọng**: điều kiện $P(B) > 0$. Không thể "biết B xảy ra" nếu B không bao giờ xảy ra — phép chia cho 0 không xác định.

### 2.2. 💡 Trực giác — vì sao chia cho P(B)?

Khi ta "biết B xảy ra", không gian mẫu $\Omega$ co lại còn B. Trong không gian mới này:

- Tổng xác suất phải lại bằng 1 (tiên đề Kolmogorov).
- Nhưng ban đầu, tổng xác suất trên B là $P(B)$, không phải 1.

→ Ta phải **rescale** (chia tỷ lệ) toàn bộ xác suất trong B cho $P(B)$. Đó là lý do mẫu số xuất hiện. Phần tử số $P(A \cap B)$ là "phần A nằm trong B" — phần A còn sót lại sau khi thu hẹp về B.

Hình ảnh: trong sơ đồ Venn, B là một "vùng đảo". $P(A \mid B)$ là tỷ lệ diện tích $A \cap B$ so với diện tích $B$:

```
   Ω
 ┌──────────────────────┐
 │           ┌────────┐ │
 │     ┌─────┼───┐    │ │
 │     │  A  │ A∩B │  B │ │
 │     │     │   │    │ │
 │     └─────┼───┘    │ │
 │           └────────┘ │
 └──────────────────────┘

P(A|B) = (diện tích A∩B) / (diện tích B)
```

$$P(A \mid B) = \frac{\text{diện tích } A \cap B}{\text{diện tích } B}$$

### 2.3. Tại sao có thể tính được trên không gian con

Chính xác hơn: khi ta khẳng định "B đã xảy ra", ta đang định nghĩa một **hàm xác suất mới** $Q(\cdot)$ trên không gian $(\Omega, \mathcal{F})$:

$$Q(A) := \frac{P(A \cap B)}{P(B)}$$

Kiểm tra $Q$ thỏa 3 tiên đề Kolmogorov:

1. **Không âm**: $Q(A) = \frac{P(A \cap B)}{P(B)} \ge 0$ vì cả 2 vế đều $\ge 0$.
2. **Chuẩn hóa**: $Q(\Omega) = \frac{P(\Omega \cap B)}{P(B)} = \frac{P(B)}{P(B)} = 1$ ✓.
3. **Cộng tính**: nếu $A_1, A_2$ rời rạc thì $(A_1 \cup A_2) \cap B = (A_1 \cap B) \cup (A_2 \cap B)$, và 2 vế phải cũng rời rạc → cộng tính.

Vậy $Q = P(\cdot \mid B)$ thực sự là một xác suất hợp lệ. Mọi quy tắc đã học cho $P$ áp dụng được cho $P(\cdot \mid B)$. Ví dụ:

$$\begin{aligned}
P(A^c \mid B) &= 1 - P(A \mid B) \\
P((A_1 \cup A_2) \mid B) &= P(A_1 \mid B) + P(A_2 \mid B) - P(A_1 \cap A_2 \mid B)
\end{aligned}$$

### 2.4. ⚠ Lỗi thường gặp

- **Nhầm $P(A \mid B)$ với $P(A \cap B)$**. $P(A \cap B)$ là xác suất *cả hai* xảy ra trong toàn không gian $\Omega$; $P(A \mid B)$ là xác suất A trong không gian *đã thu hẹp* về B. Hai số khác nhau (chia cho $P(B)$).
- **Nhầm $P(A \mid B)$ với $P(B \mid A)$**. Hai số này hoàn toàn khác nhau. Xem mục 8 (medical test) để hiểu rõ tác hại của nhầm lẫn này.
- **Quên kiểm tra $P(B) > 0$**. Nếu B là biến cố không thể xảy ra, $P(A \mid B)$ không xác định.

**❓ Câu hỏi tự nhiên**:

- *"Nếu $B = \Omega$ thì sao?"* → $P(A \mid \Omega) = \frac{P(A \cap \Omega)}{P(\Omega)} = \frac{P(A)}{1} = P(A)$. Biết "$\Omega$ đã xảy ra" không cho thông tin gì mới — đúng trực giác.
- *"Nếu $A \subseteq B$ thì sao?"* → $A \cap B = A$, nên $P(A \mid B) = \frac{P(A)}{P(B)}$. Ví dụ: $P(\text{ra 6} \mid \text{ra chẵn}) = \frac{P(\{6\})}{P(\{2,4,6\})} = \frac{1/6}{3/6} = \frac{1}{3}$.
- *"Nếu $A \cap B = \varnothing$ thì sao?"* → $P(A \mid B) = \frac{0}{P(B)} = 0$. Đúng: nếu A và B xung khắc, biết B xảy ra → A chắc chắn không xảy ra.

**📝 Tóm tắt mục 2**:
- Công thức: $P(A \mid B) = \frac{P(A \cap B)}{P(B)}$ (cần $P(B) > 0$).
- Trực giác: thu hẹp $\Omega$ về B, rescale tổng xác suất về 1.
- $P(\cdot \mid B)$ cũng là hàm xác suất → áp dụng được mọi quy tắc Kolmogorov.

---

## 3. Walk-through bằng số: 4 ví dụ kinh điển

### 3.1. Ví dụ 1 — Lá bài (cards)

Bộ bài 52 lá. Rút 1 lá ngẫu nhiên. Đặt:
- A = "lá đó là J/Q/K (rồng)".
- B = "lá đó là rồng đỏ" → tức là rồng hệ ♥ hoặc ♦.

**Tính $P(A \mid B)$**:

- $|B| = 6$ (3 rank rồng × 2 chất đỏ = J♥, Q♥, K♥, J♦, Q♦, K♦).
- $A \cap B = B$ (vì mọi rồng đỏ đều là rồng) → $|A \cap B| = 6$.
- $P(A \mid B) = \frac{6/52}{6/52} = 1$.

Đúng trực giác: nếu đã biết "lá đó là rồng đỏ", chắc chắn nó là rồng → $P(A \mid B) = 1$.

**Tính $P(B \mid A)$**:

- $|A| = 12$ (3 rank × 4 chất). $|A \cap B| = 6$.
- $P(B \mid A) = \frac{6/52}{12/52} = \frac{6}{12} = \frac{1}{2}$.

Nếu đã biết "lá đó là rồng", thì xác suất nó là rồng đỏ là $\frac{1}{2}$ (vì 2 trong 4 chất là đỏ).

**Bài học**: $P(A \mid B) = 1 \neq P(B \mid A) = 0{,}5$ — hai số khác nhau xa, dù cùng nói về A và B!

### 3.2. Ví dụ 2 — Xúc xắc (dice)

Gieo 1 xúc xắc 6 mặt. Đặt:
- A = "ra 6".
- B = "ra chẵn" $= \{2, 4, 6\}$.

$$\begin{aligned}
P(A) &= \tfrac{1}{6} \\
P(B) &= \tfrac{3}{6} = \tfrac{1}{2} \\
P(A \cap B) &= P(\{6\}) = \tfrac{1}{6} \quad (\text{vì 6 vừa là 6 vừa là chẵn}) \\
P(A \mid B) &= \frac{1/6}{1/2} = \tfrac{1}{3}
\end{aligned}$$

Như vậy, biết "ra chẵn" → xác suất "ra 6" tăng từ $\frac{1}{6}$ lên $\frac{1}{3}$ (gấp đôi).

**Cách khác — đếm trực tiếp trên $\Omega$ thu hẹp**:

- Khi đã biết "ra chẵn", outcome có thể là $\{2, 4, 6\}$ (3 outcome đồng xác suất).
- "Ra 6" có 1 outcome trong 3 → $P = \frac{1}{3}$ ✓.

### 3.3. Ví dụ 3 — Family với 2 con

Một gia đình có 2 con. Giả sử mỗi đứa độc lập là trai/gái với xác suất 1/2. Không gian mẫu (theo thứ tự sinh):

$$\Omega = \{BB, BG, GB, GG\}, \quad \text{mỗi outcome xác suất } \tfrac{1}{4}$$

Trong đó B = boy, G = girl.

**Tình huống A**: bạn biết "ít nhất 1 đứa là trai". Hỏi: xác suất *cả 2* là trai?

- Đặt $E$ = "ít nhất 1 trai" $= \{BB, BG, GB\}$, $|E| = 3$, $P(E) = \frac{3}{4}$.
- $F$ = "cả 2 trai" $= \{BB\}$, $P(F) = \frac{1}{4}$.
- $F \cap E = \{BB\}$ → $P(F \cap E) = \frac{1}{4}$.
- $\mathbf{P(F \mid E) = \frac{1/4}{3/4} = \frac{1}{3}}$.

⚠ Trực giác sai phổ biến: "biết 1 đứa là trai → đứa kia 50/50 → $P(\text{cả 2 trai} \mid \text{ít nhất 1 trai}) = \frac{1}{2}$". **Sai**! Đáp án đúng là $\frac{1}{3}$.

Lý do: "ít nhất 1 trai" *không* đồng nghĩa với "đứa thứ nhất là trai". Trong 3 outcome (BB, BG, GB), chỉ có BB là "cả 2 trai" → $\frac{1}{3}$.

**Tình huống B**: bạn biết "đứa lớn (thứ nhất) là trai". Hỏi: xác suất *cả 2* là trai?

- $E'$ = "thứ nhất trai" $= \{BB, BG\}$, $P(E') = \frac{2}{4} = \frac{1}{2}$.
- $F \cap E' = \{BB\}$, $P = \frac{1}{4}$.
- $\mathbf{P(F \mid E') = \frac{1/4}{1/2} = \frac{1}{2}}$.

Bài học: *thông tin "ít nhất 1 trai" yếu hơn thông tin "đứa thứ nhất là trai"*. Hai phát biểu trông giống nhưng dẫn đến xác suất khác nhau ($\frac{1}{3}$ vs $\frac{1}{2}$). Đây là ví dụ kinh điển về *boy-or-girl paradox*.

### 3.4. Ví dụ 4 — Test y khoa (giới thiệu nhanh)

Một bệnh có tỷ lệ mắc 1% trong dân số. Có một test:
- Sensitivity $= P(\text{test+} \mid \text{bệnh}) = 99\%$ (test rất tốt khi có bệnh).
- Specificity $= P(\text{test−} \mid \text{không bệnh}) = 95\%$ (test khá tốt khi không bệnh).

Bạn test dương tính. **Xác suất bạn thực sự có bệnh là bao nhiêu?**

Nhiều người (và cả bác sĩ!) đoán: "Test 99% chính xác → tôi 99% có bệnh." **Sai**.

Đáp án thực: chỉ khoảng **16,7%**. Tại sao? Vì bệnh hiếm, đa số người test dương tính là *false positive*.

Ta sẽ tính chi tiết ở mục 8. Hãy ghi nhớ con số này — nó là một trong những "shocker" lớn nhất của lý thuyết xác suất ứng dụng.

**🔁 Dừng lại tự kiểm tra**:

> 1. Trong ví dụ family, vì sao "ít nhất 1 trai" cho $\frac{1}{3}$ chứ không phải $\frac{1}{2}$?
> 2. Trong ví dụ cards, vì sao $P(A \mid B) \neq P(B \mid A)$?
>
> <details>
> <summary>Đáp án</summary>
>
> 1. Vì "ít nhất 1 trai" gộp 3 outcome (BB, BG, GB) có xác suất bằng nhau. Trong 3 outcome đó, chỉ 1 (BB) thỏa "cả 2 trai" → $\frac{1}{3}$. Nếu nghĩ $\frac{1}{2}$ là đang ngầm coi BB tương đương với "$BG \cup GB$" — sai vì BG và GB là 2 outcome riêng.
>
> 2. Vì các mẫu số khác nhau: $P(A \mid B)$ chia cho $P(B) = \frac{6}{52}$; $P(B \mid A)$ chia cho $P(A) = \frac{12}{52}$. Tử số $P(A \cap B) = \frac{6}{52}$ thì giống nhau, nhưng mẫu khác nhau → tỷ số khác.
> </details>

**📝 Tóm tắt mục 3**:
- 4 ví dụ minh hoạ tính $P(A \mid B)$: cards, dice, family, medical test.
- Family paradox: "ít nhất 1 trai" cho $\frac{1}{3}$, nhưng "đứa lớn là trai" cho $\frac{1}{2}$. Cách diễn đạt thông tin quan trọng.
- Medical test sẽ "shock" — bệnh hiếm + test 99% không có nghĩa là 99% chắc chắn.

---

## 4. Quy tắc nhân (Multiplication Rule)

### 4.1. Từ công thức conditional → công thức nhân

Định nghĩa $P(A \mid B) = \frac{P(A \cap B)}{P(B)}$ viết lại được thành:

> $$P(A \cap B) = P(A \mid B) \cdot P(B) \qquad (*)$$
>
> Tương tự, từ $P(B \mid A) = \frac{P(A \cap B)}{P(A)}$:
>
> $$P(A \cap B) = P(B \mid A) \cdot P(A) \qquad (**)$$

Vế phải của (*) và (**) bằng nhau → ta có:

$$P(A \mid B) \cdot P(B) = P(B \mid A) \cdot P(A)$$

Đây là "mầm" của định lý Bayes (sẽ thấy ở mục 6).

### 4.2. 💡 Trực giác

Quy tắc nhân nói: muốn tính xác suất "cả hai xảy ra", ta tính:

1. Xác suất một biến cố xảy ra (vd $P(B)$).
2. Xác suất biến cố kia xảy ra *trong điều kiện* biến cố đầu đã xảy ra (vd $P(A \mid B)$).
3. Nhân với nhau.

Hình dung: rút 2 lá bài tuần tự, không hoàn lại. Lá thứ nhất là Át với xác suất $\frac{4}{52}$. *Sau khi* đã rút Át, lá thứ hai cũng là Át chỉ còn xác suất $\frac{3}{51}$ (vì bộ bài chỉ còn 51 lá và 3 Át). Vậy:

$$\begin{aligned}
P(\text{2 lá đều Át}) &= P(\text{lá 1 Át}) \cdot P(\text{lá 2 Át} \mid \text{lá 1 Át}) \\
&= \frac{4}{52} \cdot \frac{3}{51} \\
&= \frac{12}{2652} = \frac{1}{221} \approx 0{,}00452
\end{aligned}$$

### 4.3. Walk-through bằng số

**Bài**: rút 3 lá liên tiếp từ bộ 52 không hoàn lại. Xác suất cả 3 lá đều là rồng (J/Q/K)?

Tổng số rồng = 12.

$$\begin{aligned}
P(R_1) &= \tfrac{12}{52} \\
P(R_2 \mid R_1) &= \tfrac{11}{51} \quad (\text{đã rút 1 rồng, còn 11 rồng trong 51 lá}) \\
P(R_3 \mid R_1 \cap R_2) &= \tfrac{10}{50} \\
P(R_1 \cap R_2 \cap R_3) &= \frac{12}{52} \cdot \frac{11}{51} \cdot \frac{10}{50} \\
&= \frac{1320}{132600} = 0{,}00995 \approx 0{,}995\%
\end{aligned}$$

(Quy tắc nhân mở rộng cho $n$ biến cố: $P(A_1 \cap \dots \cap A_n) = P(A_1) \cdot P(A_2 \mid A_1) \cdot P(A_3 \mid A_1 \cap A_2) \cdots P(A_n \mid A_1 \cap \dots \cap A_{n-1})$.)

**📝 Tóm tắt mục 4**:
- $P(A \cap B) = P(A \mid B) \cdot P(B) = P(B \mid A) \cdot P(A)$ — quy tắc nhân là viết lại của định nghĩa.
- Mở rộng cho $n$ biến cố: chuỗi tích các conditional.
- Cực hữu ích cho các tình huống "tuần tự": rút bài, gieo nhiều xúc xắc, chuỗi sự kiện.

---

## 5. Độc lập (Independence)

### 5.1. 💡 Trực giác

Hai biến cố A và B **độc lập** khi việc biết B xảy ra *không* thay đổi xác suất của A:

$$P(A \mid B) = P(A)$$

Hoặc đối xứng: $P(B \mid A) = P(B)$.

Đây là cách diễn đạt trực giác. Còn cách diễn đạt **toán** thì:

> **Định nghĩa**. A và B độc lập $\iff P(A \cap B) = P(A) \cdot P(B)$.

Hai định nghĩa tương đương khi $P(A), P(B) > 0$ (kiểm tra: chia cả 2 vế cho $P(B)$).

**Ưu điểm định nghĩa thứ hai**: đối xứng (không cần $P(B) > 0$), dễ tổng quát hoá cho nhiều biến cố.

### 5.2. Walk-through — gieo 2 xúc xắc

Gieo 2 xúc xắc độc lập. Đặt:
- A = "xúc xắc 1 ra 6".
- B = "xúc xắc 2 ra số chẵn".

Tính:
- $P(A) = \frac{1}{6}$.
- $P(B) = \frac{3}{6} = \frac{1}{2}$.
- $A \cap B$ = "xúc xắc 1 ra 6 VÀ xúc xắc 2 ra chẵn" $= \{(6,2), (6,4), (6,6)\}$ → 3 outcome trên 36 → $P = \frac{3}{36} = \frac{1}{12}$.
- $P(A) \cdot P(B) = \frac{1}{6} \cdot \frac{1}{2} = \frac{1}{12}$ ✓.

Vậy A và B độc lập, đúng trực giác: 2 xúc xắc khác nhau, không ảnh hưởng nhau.

### 5.3. Ví dụ phản — hai biến cố KHÔNG độc lập

Gieo 1 xúc xắc. Đặt:
- A = "ra 6".
- B = "ra chẵn".

Tính:
- $P(A) = \frac{1}{6}$.
- $P(B) = \frac{1}{2}$.
- $A \cap B = \{6\}$, $P = \frac{1}{6}$.
- $P(A) \cdot P(B) = \frac{1}{6} \cdot \frac{1}{2} = \frac{1}{12}$.
- $P(A \cap B) = \frac{1}{6} \neq \frac{1}{12} = P(A) \cdot P(B)$ → **KHÔNG độc lập**.

Trực giác: biết "ra chẵn" làm xác suất "ra 6" tăng (từ $\frac{1}{6}$ lên $\frac{1}{3}$) → có ảnh hưởng → phụ thuộc.

### 5.4. ⚠ Lỗi thường gặp — độc lập ≠ xung khắc (disjoint)

Hai khái niệm thường bị nhầm:

- **Disjoint / mutually exclusive**: $A \cap B = \varnothing$ (không thể cùng xảy ra).
- **Independent**: $P(A \cap B) = P(A) \cdot P(B)$ (xảy ra của một không ảnh hưởng kia).

Hai khái niệm **ngược nhau** trong nhiều trường hợp! Nếu A, B disjoint và đều có $P > 0$ thì:

$$P(A \mid B) = \frac{P(A \cap B)}{P(B)} = \frac{0}{P(B)} = 0 \neq P(A)$$

→ A, B *không* độc lập. Disjoint với $P > 0$ → biết B xảy ra thì A *chắc chắn* không xảy ra → có rất nhiều ảnh hưởng → ngược nghĩa của độc lập.

Khẩu quyết: *"Disjoint = không thể cùng. Independent = không ảnh hưởng."* Hai chuyện khác nhau.

### 5.5. Độc lập của 3 biến cố — chú ý

Với 3 biến cố A, B, C, "độc lập tổng thể" (mutually independent) đòi hỏi cả 4 điều kiện:

$$\begin{aligned}
P(A \cap B) &= P(A) \cdot P(B) \\
P(A \cap C) &= P(A) \cdot P(C) \\
P(B \cap C) &= P(B) \cdot P(C) \\
P(A \cap B \cap C) &= P(A) \cdot P(B) \cdot P(C)
\end{aligned}$$

Chỉ cần *cặp đôi* (pairwise) độc lập là **chưa đủ**. Ví dụ ngược (Bernstein):

Gieo 2 đồng xu công bằng. Đặt:
- A = "xu 1 ra H".
- B = "xu 2 ra H".
- C = "hai xu cùng kết quả" $= \{HH, TT\}$.

Mỗi $P(\cdot) = \frac{1}{2}$. Mỗi cặp giao nhau: $P(A \cap B) = P(HH) = \frac{1}{4} = P(A) \cdot P(B)$ ✓; $P(A \cap C) = P(HH) = \frac{1}{4} = P(A) \cdot P(C)$ ✓; $P(B \cap C) = P(HH) = \frac{1}{4}$ ✓.

Nhưng $A \cap B \cap C$ = "xu 1 H, xu 2 H, cùng kết quả" $= \{HH\}$, $P = \frac{1}{4} \neq \left(\frac{1}{2}\right)^3 = \frac{1}{8}$. Vậy 3 biến cố không độc lập tổng thể, dù từng cặp đều độc lập.

**❓ Câu hỏi tự nhiên**:

- *"Trong thực tế ML, các 'feature' có độc lập không?"* → Hầu như không. Naive Bayes giả định độc lập (vì đơn giản hoá tính toán) và vẫn hoạt động tốt — vì vậy gọi là "naive".
- *"Có cách nào kiểm tra độc lập từ dữ liệu không?"* → Có: chi-square test, mutual information. Đây là chủ đề thống kê (sẽ gặp ở Lesson 06).

**📝 Tóm tắt mục 5**:
- Độc lập $\iff P(A \cap B) = P(A) \cdot P(B) \iff P(A \mid B) = P(A)$ (khi $P(B) > 0$).
- KHÔNG nhầm với xung khắc — disjoint với $P > 0$ thì *phụ thuộc*.
- Độc lập đa biến cố cần kiểm tra mọi tích hợp lệ, không chỉ pairwise.

---

## 6. Định lý Bayes (Bayes' Theorem)

### 6.1. Phát biểu và dẫn xuất

> **Định lý Bayes**. Với $P(A), P(B) > 0$:
>
> $$P(A \mid B) = \frac{P(B \mid A) \cdot P(A)}{P(B)}$$

**Dẫn xuất** (chỉ 2 dòng):

$$\begin{aligned}
P(A \cap B) &= P(B \mid A) \cdot P(A) && \text{(quy tắc nhân — chia A trước, B sau)} \\
P(A \mid B) &= \frac{P(A \cap B)}{P(B)} && \text{(định nghĩa conditional)} \\
P(A \mid B) &= \frac{P(B \mid A) \cdot P(A)}{P(B)} && \blacksquare
\end{aligned}$$

Đơn giản tới mức gần như tầm thường — nhưng hệ quả thì sâu sắc.

### 6.2. 💡 Trực giác — đảo chiều thông tin

Đôi khi ta dễ tính $P(B \mid A)$ (cause $\to$ effect) nhưng cần $P(A \mid B)$ (effect $\to$ cause).

- **Y khoa**: dễ biết $P(\text{triệu chứng} \mid \text{bệnh})$ (sách giáo khoa), khó biết $P(\text{bệnh} \mid \text{triệu chứng})$ (chẩn đoán).
- **Forensic**: dễ tính $P(\text{bằng chứng} \mid \text{thủ phạm là X})$, khó tính $P(\text{thủ phạm là X} \mid \text{bằng chứng})$ (xét xử).
- **ML**: dễ tính $P(\text{dữ liệu} \mid \text{mô hình } \theta)$ (likelihood), khó tính $P(\theta \mid \text{dữ liệu})$ (posterior, cái ta cần).

Bayes là công cụ **đảo chiều** suy luận này.

### 6.3. Cấu trúc tên các thành phần

Trong cách dùng Bayesian, ta đặt tên cho từng thành phần:

$$\underbrace{P(A \mid B)}_{\text{posterior}} = \frac{\overbrace{P(B \mid A)}^{\text{likelihood}} \cdot \overbrace{P(A)}^{\text{prior}}}{\underbrace{P(B)}_{\text{evidence}}}$$

- **Prior** $P(A)$: niềm tin ban đầu về A *trước khi* thấy B.
- **Likelihood** $P(B \mid A)$: "nếu A đúng, B có khả năng xảy ra cỡ nào?".
- **Evidence** $P(B)$: xác suất tổng để thấy B (chuẩn hoá).
- **Posterior** $P(A \mid B)$: niềm tin cập nhật về A *sau khi* thấy B.

Đây là khung tư duy chuẩn của Bayesian inference.

### 6.4. Walk-through mini

Cho $P(A) = 0{,}2$, $P(B \mid A) = 0{,}9$, $P(B) = 0{,}3$. Tính $P(A \mid B)$.

$$\begin{aligned}
P(A \mid B) &= \frac{P(B \mid A) \cdot P(A)}{P(B)} \\
&= \frac{0{,}9 \cdot 0{,}2}{0{,}3} = \frac{0{,}18}{0{,}3} = 0{,}6
\end{aligned}$$

So sánh: prior $P(A) = 0{,}2$ → posterior $P(A \mid B) = 0{,}6$. Thông tin B làm tin về A *tăng* gấp 3 (vì B "phù hợp" hơn khi có A — likelihood cao).

### 6.5. ⚠ Lỗi thường gặp — "prosecutor's fallacy"

Trong vụ án, công tố viên nói:
> "Xác suất tìm thấy DNA match nếu bị cáo vô tội là $\frac{1}{10^6}$. Vậy xác suất bị cáo vô tội là $\frac{1}{10^6}$ → có tội gần như chắc chắn."

Đây là **prosecutor's fallacy**: nhầm $P(\text{evidence} \mid \text{innocent})$ với $P(\text{innocent} \mid \text{evidence})$.

Bayes:

$$P(\text{innocent} \mid \text{DNA match}) = \frac{P(\text{DNA match} \mid \text{innocent}) \cdot P(\text{innocent})}{P(\text{DNA match})}$$

Nếu prior $P(\text{innocent}) \approx 1$ (vô tội cho đến khi chứng minh có tội) và DNA match có thể đến từ *nhiều* người vô tội khác trong dân số (ví dụ thành phố 1 triệu người → kỳ vọng có 1 người match), thì:

$$\begin{aligned}
P(\text{DNA match}) &\approx \tfrac{1}{10^6} \cdot 10^6 = 1 \quad (\text{kỳ vọng có vài người match trong dân số}) \\
P(\text{innocent} \mid \text{DNA match}) &\ \text{có thể vẫn} \ge 50\%
\end{aligned}$$

Bài học: không có *prior* và *evidence* (mẫu số), một mình $P(B \mid A)$ không cho phép kết luận về $P(A \mid B)$.

**📝 Tóm tắt mục 6**:
- Bayes: $P(A \mid B) = \frac{P(B \mid A) \cdot P(A)}{P(B)}$ — đảo chiều $P(\cdot \mid \cdot)$.
- Khung tên: posterior = likelihood × prior / evidence.
- Cảnh báo prosecutor's fallacy: $P(B \mid A) \neq P(A \mid B)$, đừng nhầm.

---

## 7. Công thức xác suất toàn phần (Law of Total Probability)

### 7.1. Vì sao cần

Trong Bayes, ta thường biết $P(B \mid A)$ và $P(B \mid A^c)$ (likelihood với từng giả thuyết), nhưng *không biết* trực tiếp $P(B)$ (mẫu số).

Câu hỏi: tính $P(B)$ thế nào? Trả lời: dùng **công thức xác suất toàn phần**.

### 7.2. Phát biểu

> **Định lý xác suất toàn phần (Law of Total Probability)**. Cho $A_1, A_2, \dots, A_n$ là một **phân hoạch** của $\Omega$ (rời rạc đôi một, hợp lại bằng $\Omega$, mỗi $P(A_i) > 0$). Khi đó với mọi $B \subseteq \Omega$:
>
> $$P(B) = \sum_i P(B \mid A_i) \cdot P(A_i)$$

Trường hợp đặc biệt 2 phần $A, A^c$:

$$P(B) = P(B \mid A) \cdot P(A) + P(B \mid A^c) \cdot P(A^c)$$

### 7.3. 💡 Trực giác

Để xảy ra B, *phải đi qua một* trong các $A_i$ (vì các $A_i$ lấp đầy $\Omega$, ngoài chúng không còn gì). Vậy:

- Trên nhánh đi qua $A_1$: xác suất là $P(A_1) \cdot P(B \mid A_1)$.
- Trên nhánh đi qua $A_2$: xác suất là $P(A_2) \cdot P(B \mid A_2)$.
- ...

Vì các nhánh rời rạc, ta cộng lại → tổng xác suất B.

Hình dung sơ đồ cây 2 cấp: gốc → các $A_i$ → từng nhánh đi tới B hay không. $P(B)$ là tổng "trọng số đường đi" tới B.

### 7.4. Walk-through

**Bài**: nhà máy có 2 ca sản xuất.
- Ca 1: làm 60% sản phẩm, tỷ lệ lỗi 2%.
- Ca 2: làm 40% sản phẩm, tỷ lệ lỗi 5%.

Lấy ngẫu nhiên 1 sản phẩm. Xác suất nó lỗi?

Đặt:
- $A_1$ = "ca 1", $P(A_1) = 0{,}6$.
- $A_2$ = "ca 2", $P(A_2) = 0{,}4$.
- $B$ = "lỗi". $P(B \mid A_1) = 0{,}02$. $P(B \mid A_2) = 0{,}05$.

$$\begin{aligned}
P(B) &= P(B \mid A_1) \cdot P(A_1) + P(B \mid A_2) \cdot P(A_2) \\
&= 0{,}02 \cdot 0{,}6 + 0{,}05 \cdot 0{,}4 \\
&= 0{,}012 + 0{,}020 = 0{,}032 = 3{,}2\%
\end{aligned}$$

Bonus — Bayes ngược: cho biết sản phẩm lỗi, xác suất nó do ca 2 sản xuất?

$$\begin{aligned}
P(A_2 \mid B) &= \frac{P(B \mid A_2) \cdot P(A_2)}{P(B)} \\
&= \frac{0{,}020}{0{,}032} = 0{,}625 = 62{,}5\%
\end{aligned}$$

Trực giác: ca 2 chỉ làm 40% sản phẩm, nhưng đóng góp 62,5% sản phẩm lỗi → vì tỷ lệ lỗi của ca 2 cao hơn ca 1 (2,5 lần).

**📝 Tóm tắt mục 7**:
- $P(B) = \sum_i P(B \mid A_i) \cdot P(A_i)$ khi $\{A_i\}$ là phân hoạch.
- Là "mảnh ghép cuối" giúp tính mẫu số trong Bayes.
- Trực giác: tổng các "đường đi" đến B qua từng kịch bản Aᵢ.

---

## 8. Ứng dụng kinh điển — Medical Test (test y khoa)

### 8.1. Đặt bài toán

Một bệnh hiếm có **tỷ lệ mắc trong dân số là 1%** (prevalence $= 0{,}01$). Có một test cho bệnh đó với:

- **Sensitivity** (độ nhạy) $= P(\text{test+} \mid \text{bệnh}) = \mathbf{99\%}$. *Khi có bệnh, test phát hiện đúng 99% thời gian.*
- **Specificity** (độ đặc hiệu) $= P(\text{test−} \mid \text{không bệnh}) = \mathbf{95\%}$. *Khi không bệnh, test cho âm tính đúng 95% thời gian.*

Bạn đi test ngẫu nhiên (không có triệu chứng đặc biệt — bạn chỉ là dân số chung). Test ra **dương tính**.

**Câu hỏi**: $P(\text{bệnh} \mid \text{test+}) = ?$

### 8.2. Trực giác sai

"Test 99% chính xác → tôi 99% có bệnh." Hầu hết mọi người (kể cả bác sĩ trong các khảo sát [Eddy 1982, Gigerenzer 2003]) đoán quanh 70-90%.

Đáp án thật $\approx \mathbf{16{,}7\%}$. Không phải 99%, không phải 90%, không phải 50% — chỉ **16,7%**.

### 8.3. Tính bằng Bayes — walk-through từng bước

Đặt:
- $D$ = "có bệnh" (disease).
- $\bar{D}$ = "không bệnh".
- $T$ = "test dương" (test positive).

**Cho biết**:

$$\begin{aligned}
P(D) &= 0{,}01 \\
P(\bar{D}) &= 0{,}99 \\
P(T \mid D) &= 0{,}99 && \text{(sensitivity)} \\
P(\bar{T} \mid \bar{D}) &= 0{,}95 && \text{(specificity)} \\
\Rightarrow P(T \mid \bar{D}) &= 1 - 0{,}95 = 0{,}05 && \text{(false positive rate)}
\end{aligned}$$

**Bước 1: tính $P(T)$** bằng xác suất toàn phần.

$$\begin{aligned}
P(T) &= P(T \mid D) \cdot P(D) + P(T \mid \bar{D}) \cdot P(\bar{D}) \\
&= 0{,}99 \cdot 0{,}01 + 0{,}05 \cdot 0{,}99 \\
&= 0{,}0099 + 0{,}0495 = 0{,}0594
\end{aligned}$$

**Bước 2: áp dụng Bayes**.

$$\begin{aligned}
P(D \mid T) &= \frac{P(T \mid D) \cdot P(D)}{P(T)} \\
&= \frac{0{,}99 \cdot 0{,}01}{0{,}0594} = \frac{0{,}0099}{0{,}0594} \\
&= 0{,}1\overline{6} \approx 0{,}1667 \approx 16{,}67\%
\end{aligned}$$

### 8.4. Hiểu kết quả — vì sao chỉ 16,7%?

Hình dung 10 000 người trong dân số đi test:

| Nhóm | Số người | Phân bố sau test |
|------|----------|------------------|
| **Có bệnh** (1%) | 100 | 99 dương tính (true positive), 1 âm tính (false negative) |
| **Không bệnh** (99%) | 9 900 | 495 dương tính (false positive), 9 405 âm tính (true negative) |

Tổng dương tính $= 99 + 495 = \mathbf{594}$.

Trong 594 người dương tính, chỉ 99 thực sự có bệnh → $\frac{99}{594} \approx \mathbf{16{,}67\%}$.

→ Đa số ($\frac{495}{594} \approx 83\%$) người dương tính là *false positive*, không có bệnh!

Lý do: vì bệnh **rất hiếm** (1%), nên dù tỷ lệ false positive thấp (5%) áp lên 99% dân số khỏe vẫn cho ra rất nhiều false positive — nhiều hơn cả số true positive.

### 8.5. ❓ Câu hỏi tự nhiên

**Q1**: *"Nếu prevalence cao hơn, kết quả có khác không?"*

Có. Giả sử prevalence $= 10\%$ (bệnh phổ biến hơn):

$$\begin{aligned}
P(T) &= 0{,}99 \cdot 0{,}10 + 0{,}05 \cdot 0{,}90 = 0{,}099 + 0{,}045 = 0{,}144 \\
P(D \mid T) &= \frac{0{,}099}{0{,}144} \approx 0{,}6875 \approx 68{,}75\%
\end{aligned}$$

Tăng prevalence từ 1% → 10% kéo posterior từ 16,7% lên 68,75%. **Prior quan trọng cực kỳ**.

**Q2**: *"Nếu sensitivity và specificity đều 100%?"*

Test hoàn hảo: $P(D \mid T) = 1$ (test+ chắc chắn có bệnh). Đúng — đây là test lý tưởng.

**Q3**: *"Nếu prevalence $= 0\%$?"* Không ai có bệnh → mọi test+ đều là false positive → $P(D \mid T) = 0$. (Đúng cả về toán: tử số 0 chia mẫu khác 0.)

**Q4**: *"Nếu tôi test 2 lần đều dương tính thì sao?"*

Posterior sau test 1 trở thành prior cho test 2:

$$\begin{aligned}
P(D \mid T_1) &= 0{,}1667 \quad \to \text{ dùng làm prior cho test 2} \\
P(D \mid T_1 \cap T_2) &= \frac{P(T_2 \mid D) \cdot P(D \mid T_1)}{P(T_2 \mid T_1)} \\
&= \frac{0{,}99 \cdot 0{,}1667}{0{,}99 \cdot 0{,}1667 + 0{,}05 \cdot 0{,}8333} \\
&= \frac{0{,}16503}{0{,}16503 + 0{,}041665} = \frac{0{,}16503}{0{,}206695} \\
&\approx 0{,}7984 \approx 79{,}8\%
\end{aligned}$$

(Giả sử 2 test độc lập có điều kiện trên D, một giả định lý tưởng.) Test 2 lần dương → 80% có bệnh. Đây là vì sao y khoa hay **lặp test** khi gặp positive.

### 8.6. Bài học quan trọng — base rate fallacy

**Base rate** (tỷ lệ cơ sở) $= P(D) = 1\%$. Bỏ qua base rate khi đánh giá test result = base rate fallacy. Trong y khoa thật:

- Đa số screening (mammography, PSA, COVID rapid test...) chịu hiệu ứng này: test+ trong dân số chung KHÔNG đồng nghĩa với bệnh.
- Bác sĩ giỏi luôn cân nhắc prior (tuổi, gia đình, triệu chứng) khi đọc test.

Đây cũng là vì sao test "screening" chỉ nên dùng trong nhóm rủi ro cao (prior cao) — trên dân số chung, false positive đè bẹp true positive.

**📝 Tóm tắt mục 8**:
- Medical test bệnh hiếm + test 99%/95% → $P(\text{bệnh} \mid \text{test+})$ chỉ $\approx 16{,}7\%$.
- Lý do: false positive trong 99% dân số khỏe vượt true positive trong 1% có bệnh.
- Bài học: base rate (prior) là yếu tố quyết định, không thể bỏ qua.

---

## 9. Ứng dụng — Naive Bayes spam filter

### 9.1. Bài toán

Phân loại email thành **spam (S)** hay **ham (H, không phải spam)** dựa trên từ ngữ.

Giả định "naive" — các từ độc lập trong email khi đã biết loại:

$$\begin{aligned}
P(\text{email} \mid S) &\approx \prod_i P(w_i \mid S) \\
P(\text{email} \mid H) &\approx \prod_i P(w_i \mid H)
\end{aligned}$$

(Trong thực tế, "free" và "money" có liên kết — không thực sự độc lập — nhưng giả định này đơn giản hoá rất nhiều và vẫn hoạt động tốt.)

### 9.2. Walk-through 3 từ

Giả sử ta đã train trên dữ liệu và có thống kê:

**Prior**:

$$P(S) = 0{,}3 \quad (\text{30\% email là spam}), \qquad P(H) = 0{,}7$$

**Likelihood (xác suất từ xuất hiện trong mỗi loại)**:

| Từ | $P(\text{từ} \mid S)$ | $P(\text{từ} \mid H)$ |
|----|----------|----------|
| free | 0,5 | 0,02 |
| money | 0,4 | 0,05 |
| meeting | 0,01 | 0,3 |

(Ý nghĩa: 50% email spam chứa "free", chỉ 2% email ham chứa "free". Spam thường có "free money", ham thường có "meeting".)

**Email mới**: chứa các từ {"free", "money", "meeting"}. Phân loại?

**Tính xác suất tỷ lệ** (proportional — đủ để so sánh):

$$\begin{aligned}
P(S \mid \text{email}) &\propto P(S) \cdot P(\text{free} \mid S) \cdot P(\text{money} \mid S) \cdot P(\text{meeting} \mid S) \\
&= 0{,}3 \cdot 0{,}5 \cdot 0{,}4 \cdot 0{,}01 = 0{,}0006 \\[4pt]
P(H \mid \text{email}) &\propto P(H) \cdot P(\text{free} \mid H) \cdot P(\text{money} \mid H) \cdot P(\text{meeting} \mid H) \\
&= 0{,}7 \cdot 0{,}02 \cdot 0{,}05 \cdot 0{,}3 = 0{,}00021
\end{aligned}$$

So sánh: $0{,}0006 > 0{,}00021$ → **classify là SPAM**.

Để có xác suất chuẩn hoá:

$$\begin{aligned}
P(S \mid \text{email}) &= \frac{0{,}0006}{0{,}0006 + 0{,}00021} = \frac{0{,}0006}{0{,}00081} \approx 0{,}741 \\
P(H \mid \text{email}) &= \frac{0{,}00021}{0{,}00081} \approx 0{,}259
\end{aligned}$$

→ 74,1% spam, 25,9% ham.

### 9.3. Vì sao dùng log

Khi nhân nhiều số nhỏ (như $0{,}5 \cdot 0{,}4 \cdot 0{,}01 \cdots$) ta dễ gặp **underflow** (kết quả nhỏ tới mức float không lưu được). Giải pháp: chuyển sang log:

$$\log P(S \mid \text{email}) \propto \log P(S) + \sum_i \log P(w_i \mid S)$$

Mọi nhân trở thành cộng → không underflow, tính nhanh hơn.

Ví dụ tính lại:

$$\begin{aligned}
&\log P(S) + \log 0{,}5 + \log 0{,}4 + \log 0{,}01 + \log 0{,}3 \\
&= \log 0{,}3 + \log 0{,}5 + \log 0{,}4 + \log 0{,}01 \\
&= -1{,}204 + (-0{,}693) + (-0{,}916) + (-4{,}605) = -7{,}418 \\[6pt]
&\log P(H) + \log 0{,}02 + \log 0{,}05 + \log 0{,}3 \\
&= \log 0{,}7 + \log 0{,}02 + \log 0{,}05 + \log 0{,}3 \\
&= -0{,}357 + (-3{,}912) + (-2{,}996) + (-1{,}204) = -8{,}469
\end{aligned}$$

So sánh: $-7{,}418 > -8{,}469$ → spam thắng (cùng kết luận, không sợ underflow).

### 9.4. ⚠ Lỗi thường gặp — zero probability

Nếu một từ chưa từng xuất hiện trong dữ liệu train cho lớp S, ta có $P(w \mid S) = 0$ → cả tích là 0 → posterior $= 0$ luôn, kể cả khi các từ khác mạnh mẽ ủng hộ S.

**Giải pháp**: **Laplace smoothing (add-1 smoothing)**:

$$P(w \mid C) = \frac{\text{count}(w \text{ in } C) + 1}{\text{total\_words\_in\_}C + V}$$

Trong đó $V$ = kích thước vocab. Cộng 1 (hoặc $\alpha$ nhỏ) vào tử và $V$ vào mẫu → mọi xác suất $> 0$.

### 9.5. Liên hệ với ML thực tế

Naive Bayes vẫn được dùng trong:
- Spam filter (cổ điển).
- Sentiment classification (phim/sản phẩm tích cực vs tiêu cực).
- Document categorization (topic classification).

Ưu điểm: đơn giản, train nhanh, hoạt động bất ngờ tốt dù giả định độc lập "naive". Sẽ học sâu hơn khi sang Tầng 6 (AI/ML).

**📝 Tóm tắt mục 9**:
- Naive Bayes: $P(C \mid \text{words}) \propto P(C) \cdot \prod_i P(w_i \mid C)$, giả định các từ độc lập.
- Tính bằng log để tránh underflow.
- Laplace smoothing để tránh zero probability.

---

## 10. Liên hệ ML/AI — Bayesian inference

### 10.1. Tư duy Bayesian

Bayesian inference là một paradigm trong ML/thống kê:

1. Có một mô hình với tham số $\theta$ (vd: trọng số neural net, hệ số linear regression).
2. Bắt đầu với **prior** $P(\theta)$ — niềm tin trước khi thấy dữ liệu.
3. Thu thập dữ liệu D, tính **likelihood** $P(D \mid \theta)$ — "mô hình $\theta$ giải thích D tốt cỡ nào?".
4. Áp Bayes ra **posterior** $P(\theta \mid D) = \frac{P(D \mid \theta) \cdot P(\theta)}{P(D)}$.
5. Mọi dự đoán/quyết định dựa trên posterior.

### 10.2. Posterior ∝ likelihood × prior

Trong Bayes, mẫu số $P(D)$ không phụ thuộc $\theta$ → khi *tìm $\theta$ tốt nhất*, ta chỉ cần so sánh tử:

$$\underbrace{P(\theta \mid D)}_{\text{posterior}} \propto \underbrace{P(D \mid \theta)}_{\text{likelihood}} \cdot \underbrace{P(\theta)}_{\text{prior}}$$

Hai chiến lược tìm $\theta$:

- **MLE (Maximum Likelihood Estimation)**: chọn $\theta$ cực đại $P(D \mid \theta)$ — bỏ qua prior. Sẽ học chi tiết ở **Lesson 07**.
- **MAP (Maximum A Posteriori)**: chọn $\theta$ cực đại $P(D \mid \theta) \cdot P(\theta)$ — kèm prior. MAP = MLE khi prior uniform.

Trong sâu hơn (full Bayesian), ta không "chọn một $\theta$" mà giữ cả posterior → dự đoán bằng tích phân (Bayesian model averaging). Nhưng MLE và MAP là hai bước đệm phổ biến.

### 10.3. Prior là kiến thức trước

Prior cho phép đưa "knowledge" vào model:

- **Regularization** (L2/L1 trong linear regression) tương đương với MAP với prior Gaussian/Laplace trên trọng số.
- **Dropout** có một interpretation Bayesian (Gal & Ghahramani 2016).
- **Transfer learning**: trọng số từ model pre-trained là một dạng prior cho task mới.

### 10.4. Sẽ học sâu hơn ở đâu

- **Lesson 07 (MLE)**: dẫn cross-entropy loss từ MLE, kèm bài tập đầy đủ.
- **Lesson 08 (Cross-entropy + KL)**: kết nối entropy với likelihood và posterior.
- **Tầng 6 (AI/ML)**: ứng dụng vào linear regression, logistic regression, neural network.

**📝 Tóm tắt mục 10**:
- Bayesian inference: prior $\to$ likelihood $\to$ posterior, cập nhật niềm tin theo data.
- MLE = max likelihood; MAP = max likelihood × prior; full Bayesian = giữ cả posterior.
- Regularization, transfer learning đều có "vị" Bayesian.

---

## 11. ❓ Câu hỏi tự nhiên của người đọc

Tổng hợp các thắc mắc tự nhiên — đa số đã được trả lời rải rác. Đây là nơi gom lại:

### 11.1. P(A|B) và P(B|A) khác nhau bao nhiêu?

Chúng *có thể* khác nhau rất xa. Ví dụ: $P(\text{con vật là bốn chân} \mid \text{con vật là chó}) = 1$, nhưng $P(\text{con vật là chó} \mid \text{con vật là bốn chân}) \approx 0{,}1$ (vì còn mèo, ngựa, bò...).

Quan hệ giữa hai số là **Bayes**:

$$\frac{P(A \mid B)}{P(B \mid A)} = \frac{P(A)}{P(B)}$$

→ Tỷ lệ bằng tỷ lệ prior. Nếu $P(A) \ll P(B)$ thì $P(A \mid B) \ll P(B \mid A)$.

### 11.2. Tại sao "Naive" Bayes vẫn hoạt động tốt nếu giả định sai?

Vì để classify (chọn lớp), ta chỉ cần *thứ tự* của các posterior — không cần giá trị chính xác. Ngay cả khi posterior bị bóp méo, thứ tự thường vẫn đúng.

### 11.3. Prosecutor's fallacy là gì?

Là nhầm $P(\text{evidence} \mid \text{innocent})$ (nhỏ) với $P(\text{innocent} \mid \text{evidence})$ (có thể vẫn lớn). Đã giải thích ở mục 6.5.

### 11.4. Khi nào dùng Bayes thay vì đếm trực tiếp?

Khi:
- Bài toán có cấu trúc "đảo chiều": dễ biết $P(B \mid A)$, cần $P(A \mid B)$.
- Có prior cần đưa vào.
- Tình huống "cập nhật theo data tuần tự" (online learning).

### 11.5. Conditional probability có giao hoán không?

**Không**: $P(A \mid B) \neq P(B \mid A)$ nói chung. Chúng chỉ bằng nhau khi $P(A) = P(B)$ (đối xứng prior).

### 11.6. Có cần nhớ công thức không?

Chỉ cần nhớ 2 thứ:
1. Định nghĩa: $P(A \mid B) = \frac{P(A \cap B)}{P(B)}$.
2. Quy tắc nhân: $P(A \cap B) = P(A \mid B) \cdot P(B) = P(B \mid A) \cdot P(A)$.

Mọi thứ khác (Bayes, total prob) là 1-2 bước biến đổi từ hai điều trên.

---

## 12. ⚠ Lỗi thường gặp — checklist nhanh

| Lỗi | Mô tả | Sửa |
|-----|-------|-----|
| Nhầm $P(A \mid B) \leftrightarrow P(B \mid A)$ | "Test dương → 99% có bệnh" | Áp Bayes, tính rõ tử/mẫu |
| Bỏ quên prior | "Sensitivity 99% nên $P(\text{bệnh} \mid \text{test+})$ cao" | Tính lại với $P(D)$ |
| Disjoint ↔ independent | "A, B disjoint nên độc lập" | Disjoint với $P > 0 \Rightarrow$ phụ thuộc |
| Pairwise = mutual | "Từng cặp độc lập nên 3 biến cố độc lập" | Cần $P(A \cap B \cap C) = P(A) \cdot P(B) \cdot P(C)$ |
| Quên $P(B) > 0$ | "$P(A \mid B)$ tính được luôn" | Kiểm tra $P(B) > 0$ trước |
| Zero in Naive Bayes | Một từ chưa thấy → posterior 0 | Laplace smoothing |
| Underflow khi nhân nhiều P | Float về 0 | Chuyển sang log |
| "Naive" assumption | Tin tuyệt đối vào kết quả NB | Thực tế features liên kết nhau |

---

## 13. Bài tập

### Bài 13.1 — Cards có điều kiện

Rút 1 lá từ bộ 52. Tính:
- (a) $P(K \mid \text{rồng J/Q/K})$.
- (b) $P(K \mid \text{đỏ})$.
- (c) $P(\text{đỏ} \mid K)$.
- (d) Kiểm tra: K và đỏ có độc lập không?

### Bài 13.2 — Two dice

Gieo 2 xúc xắc 6 mặt phân biệt. Tính:
- (a) $P(\text{tổng} = 7 \mid \text{xúc xắc 1 ra 3})$.
- (b) $P(\text{xúc xắc 1 ra 3} \mid \text{tổng} = 7)$.
- (c) $P(\text{tổng} = 7 \mid \text{xúc xắc 1 ra chẵn})$.

### Bài 13.3 — Family với 3 con

Một gia đình có 3 con (mỗi đứa độc lập là B/G với $P = \frac{1}{2}$). Biết "có ít nhất 2 trai". Xác suất "cả 3 đều trai" là bao nhiêu?

### Bài 13.4 — Medical test với prevalence khác

Tính $P(D \mid T+)$ cho:
- (a) Prevalence 5%, sensitivity 95%, specificity 90%.
- (b) Prevalence 50%, sensitivity 90%, specificity 90%.
- So sánh và bình luận.

### Bài 13.5 — Naive Bayes 2 lớp

Cho prior $P(A) = 0{,}4$, $P(B) = 0{,}6$. Hai feature $x_1$, $x_2$ với likelihood:

| | $x_1 = 1$ | $x_2 = 1$ |
|-|------|------|
| A | 0,8 | 0,3 |
| B | 0,2 | 0,7 |

Email mới có cả $x_1 = 1$ và $x_2 = 1$. Phân loại bằng Naive Bayes.

### Bài 13.6 — Tổng hợp

Một công ty mua linh kiện từ 3 nhà cung cấp:
- NCC 1: 30% sản lượng, tỷ lệ lỗi 1%.
- NCC 2: 50% sản lượng, tỷ lệ lỗi 2%.
- NCC 3: 20% sản lượng, tỷ lệ lỗi 5%.

Lấy ngẫu nhiên 1 linh kiện và phát hiện lỗi. Xác suất nó đến từ NCC 3?

---

## 14. Lời giải chi tiết

### 14.1 — Cards có điều kiện

$\lvert\Omega\rvert = 52$. Ký hiệu rồng = J/Q/K (12 lá), đỏ = ♥ hoặc ♦ (26 lá), K = 4 lá (1 lá ở mỗi chất).

**(a) P(K | rồng)**:
- "Rồng": 12 lá. Trong đó "là K": 4 lá.
- $P(K \mid \text{rồng}) = \frac{4/52}{12/52} = \frac{4}{12} = \frac{1}{3} \approx 0{,}333$.

**(b) P(K | đỏ)**:
- "Đỏ": 26 lá. K đỏ (K♥, K♦): 2 lá.
- $P(K \mid \text{đỏ}) = \frac{2/52}{26/52} = \frac{2}{26} = \frac{1}{13} \approx 0{,}077$.

**(c) P(đỏ | K)**:
- "K": 4 lá. Trong đó đỏ: 2 lá.
- $P(\text{đỏ} \mid K) = \frac{2/52}{4/52} = \frac{2}{4} = \frac{1}{2} = 0{,}5$.

Kiểm chéo Bayes: $P(\text{đỏ} \mid K) = \frac{P(K \mid \text{đỏ}) \cdot P(\text{đỏ})}{P(K)} = \frac{(1/13)(26/52)}{4/52} = \frac{(1/13)(1/2)}{1/13} = \frac{1}{2}$ ✓.

**(d) Độc lập?**
- $P(K) = \frac{4}{52} = \frac{1}{13}$.
- $P(\text{đỏ}) = \frac{26}{52} = \frac{1}{2}$.
- $P(K \cap \text{đỏ}) = \frac{2}{52} = \frac{1}{26}$.
- $P(K) \cdot P(\text{đỏ}) = (1/13)(1/2) = \frac{1}{26} = P(K \cap \text{đỏ})$ ✓.
- **Có độc lập**. (Đúng trực giác: chất bài và rank là 2 chiều độc lập của bộ bài chuẩn.)

### 14.2 — Two dice

$\lvert\Omega\rvert = 36$.

**(a) P(tổng=7 | xx1=3)**:
- "xx1=3": 6 outcome (3,1)...(3,6). Trong đó tổng=7: chỉ (3,4) → 1 outcome.
- $P = \frac{1}{6} \approx 0{,}167$.

**(b) P(xx1=3 | tổng=7)**:
- "tổng=7": 6 outcome (1,6),(2,5),(3,4),(4,3),(5,2),(6,1). Trong đó xx1=3: chỉ (3,4) → 1 outcome.
- $P = \frac{1}{6} \approx 0{,}167$.

(Trùng — chỉ tình cờ, không phải quy luật.)

**(c) P(tổng=7 | xx1=chẵn)**:
- "xx1=chẵn" = xx1 $\in$ {2,4,6}: 18 outcome. Trong đó tổng=7: (2,5),(4,3),(6,1) → 3 outcome.
- $P = \frac{3}{18} = \frac{1}{6}$.

(Trong cả 3 tình huống, kết quả là 1/6 — vì xx2 độc lập với xx1, và P(xx2 = bất kỳ giá trị nào cụ thể) = 1/6.)

### 14.3 — Family 3 con

$\Omega = \{BBB, BBG, BGB, GBB, BGG, GBG, GGB, GGG\}$, mỗi outcome $\frac{1}{8}$.

- E = "ít nhất 2 trai" = {BBB, BBG, BGB, GBB} → 4 outcome, $P(E) = \frac{4}{8} = \frac{1}{2}$.
- F = "cả 3 trai" = {BBB} → $P(F) = \frac{1}{8}$.
- $F \cap E$ = {BBB} → $P = \frac{1}{8}$.

$P(F \mid E) = \frac{1/8}{1/2} = \frac{1}{4} = 0{,}25$.

(Trực giác: trong 4 outcome có "≥2 trai", chỉ 1 outcome là "cả 3 trai".)

### 14.4 — Medical test khác prevalence

**(a)** $P(D) = 0{,}05$; sens $= 0{,}95$; spec $= 0{,}90$ → $P(T \mid \bar{D}) = 0{,}10$.

$$\begin{aligned}
P(T) &= 0{,}95 \cdot 0{,}05 + 0{,}10 \cdot 0{,}95 \\
     &= 0{,}0475 + 0{,}0950 = 0{,}1425 \\[4pt]
P(D \mid T) &= \frac{0{,}0475}{0{,}1425} \approx 0{,}3333 \approx 33{,}3\%
\end{aligned}$$

**(b)** $P(D) = 0{,}50$; sens $= 0{,}90$; spec $= 0{,}90$ → $P(T \mid \bar{D}) = 0{,}10$.

$$\begin{aligned}
P(T) &= 0{,}90 \cdot 0{,}50 + 0{,}10 \cdot 0{,}50 \\
     &= 0{,}45 + 0{,}05 = 0{,}50 \\[4pt]
P(D \mid T) &= \frac{0{,}45}{0{,}50} = 0{,}90 = 90\%
\end{aligned}$$

**Bình luận**: tăng prevalence từ 5% (33%) lên 50% (90%) → posterior tăng rất mạnh dù test sensitivity/specificity còn thấp hơn case (b) so với case 1% gốc. Bài học: **prior là yếu tố chi phối** posterior cho bệnh hiếm.

### 14.5 — Naive Bayes 2 lớp

$$\begin{aligned}
P(A \mid x_1{=}1, x_2{=}1) &\propto P(A) \cdot P(x_1{=}1 \mid A) \cdot P(x_2{=}1 \mid A) \\
                  &= 0{,}4 \cdot 0{,}8 \cdot 0{,}3 = 0{,}096 \\[4pt]
P(B \mid x_1{=}1, x_2{=}1) &\propto P(B) \cdot P(x_1{=}1 \mid B) \cdot P(x_2{=}1 \mid B) \\
                  &= 0{,}6 \cdot 0{,}2 \cdot 0{,}7 = 0{,}084
\end{aligned}$$

$0{,}096 > 0{,}084$ → classify là **A**.

Chuẩn hoá:

$$\begin{aligned}
P(A \mid \ldots) &= \frac{0{,}096}{0{,}096 + 0{,}084} = \frac{0{,}096}{0{,}180} \approx 0{,}533 \approx 53{,}3\% \\[4pt]
P(B \mid \ldots) &= \frac{0{,}084}{0{,}180} \approx 0{,}467 \approx 46{,}7\%
\end{aligned}$$

Lưu ý: nếu chỉ dùng $x_1{=}1$ (likelihood A mạnh hơn 4 lần), classify chắc chắn là A. Khi thêm $x_2{=}1$ (likelihood B mạnh hơn), posterior bị "pull" về phía B → kết quả cuối còn 53% A. Đây là cách Naive Bayes combine evidence.

### 14.6 — 3 nhà cung cấp + Bayes ngược

Đặt:
- $A_i$ = "đến từ NCC i", $i = 1, 2, 3$.
- B = "lỗi".

$$\begin{aligned}
P(A_1) &= 0{,}30 & P(B \mid A_1) &= 0{,}01 \\
P(A_2) &= 0{,}50 & P(B \mid A_2) &= 0{,}02 \\
P(A_3) &= 0{,}20 & P(B \mid A_3) &= 0{,}05
\end{aligned}$$

$P(B)$ (total probability):

$$\begin{aligned}
P(B) &= 0{,}01 \cdot 0{,}30 + 0{,}02 \cdot 0{,}50 + 0{,}05 \cdot 0{,}20 \\
     &= 0{,}003 + 0{,}010 + 0{,}010 = 0{,}023 = 2{,}3\%
\end{aligned}$$

Bayes:

$$\begin{aligned}
P(A_3 \mid B) &= \frac{P(B \mid A_3) \cdot P(A_3)}{P(B)} = \frac{0{,}05 \cdot 0{,}20}{0{,}023} \\
          &= \frac{0{,}010}{0{,}023} \approx 0{,}4348 \approx 43{,}5\%
\end{aligned}$$

Bonus:

$$\begin{aligned}
P(A_1 \mid B) &= 0{,}003/0{,}023 \approx 13{,}0\% \\
P(A_2 \mid B) &= 0{,}010/0{,}023 \approx 43{,}5\% \\
P(A_3 \mid B) &= 0{,}010/0{,}023 \approx 43{,}5\% \\
\hline
\text{Tổng} &\approx 100\% \ \checkmark
\end{aligned}$$

Bình luận: NCC 3 chỉ làm 20% sản lượng nhưng đóng góp 43,5% lỗi — vì tỷ lệ lỗi của họ cao gấp 2,5-5 lần các NCC khác. NCC 2 cũng đóng góp 43,5% lỗi do sản lượng lớn dù tỷ lệ lỗi thấp.

---

## 15. Tổng kết & Liên kết

### 15.1. Sơ đồ tổng quát

```
P(A) — prior
    │
    │  thấy data B
    ▼
P(A | B) — posterior
    │
    │  công thức Bayes
    │  P(A|B) = P(B|A)·P(A)/P(B)
    │  với   P(B) = Σ P(B|Aᵢ)·P(Aᵢ)   (total probability)
    ▼
ML / AI:
    - Naive Bayes (spam, sentiment)
    - MLE → cross-entropy (Lesson 07-08)
    - MAP, regularization, Bayesian DL
```

### 15.2. Mối liên hệ với các lesson khác

- **Lesson 01 (Probability basics)**: dùng P(A), Ω, đếm tổ hợp — nền để định nghĩa P(A|B).
- **Lesson 03 (Discrete RV)**: P(X = x | Y = y) — conditional sẽ được phát biểu trên biến ngẫu nhiên.
- **Lesson 06 (Expectation/variance)**: **conditional expectation** E[X|Y] — kỳ vọng có điều kiện.
- **Lesson 07 (MLE)**: cực đại hoá $P(D \mid \theta)$ — dùng đúng khung "likelihood" ở mục 6.
- **Lesson 08 (Cross-entropy + KL)**: cross-entropy thật ra là -log likelihood; KL đo độ "khác" của 2 phân phối.
- **Tầng 6 (AI/ML)**: logistic regression, neural net classifier — đều output P(class | input) — chính là conditional probability.

### 15.3. Tham khảo

- **Files trong lesson**: [`README.md`](./README.md) (file này), [`visualization.html`](./visualization.html) — 4 component tương tác (Venn, medical test, Naive Bayes spam, tree).
- **Sách kinh điển**:
  - Sheldon Ross — *A First Course in Probability* (chương 3 phủ chính xác nội dung này).
  - Gigerenzer — *Reckoning with Risk* (giải base rate fallacy bằng ngôn ngữ tự nhiên).
- **Online**: 3Blue1Brown — *Bayes theorem, the geometry of changing beliefs* (visualization tuyệt vời).

### 15.4. 📝 Tóm tắt bài học

1. **$P(A \mid B) = \frac{P(A \cap B)}{P(B)}$** (với $P(B) > 0$): xác suất A khi đã biết B, hiểu như "thu hẹp không gian mẫu".
2. **Quy tắc nhân**: $P(A \cap B) = P(A \mid B) \cdot P(B) = P(B \mid A) \cdot P(A)$.
3. **Độc lập** $\neq$ disjoint: A, B độc lập $\iff P(A \cap B) = P(A) \cdot P(B)$.
4. **Bayes**: $P(A \mid B) = \frac{P(B \mid A) \cdot P(A)}{P(B)}$ — đảo chiều suy luận.
5. **Total probability**: $P(B) = \sum_i P(B \mid A_i) \cdot P(A_i)$ — mảnh ghép cuối tính mẫu số.
6. **Medical test 1% bệnh**: posterior chỉ ~16,7% dù test 99%/95% — base rate quan trọng.
7. **Naive Bayes spam**: assume features độc lập; tính bằng log; cần Laplace smoothing.
8. **Bayesian inference**: prior → likelihood → posterior — khung chuẩn cho ML có "knowledge prior".

**Tiến tới**: [Lesson 03 — Biến ngẫu nhiên rời rạc](../lesson-03-discrete-rv/) — chuyển từ "biến cố" sang "biến ngẫu nhiên", nền cho PMF và các phân phối Bernoulli/Binomial/Poisson.
