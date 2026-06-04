// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: Math/04-Calculus-1var/lesson-01-sequences-limits/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 01 — Dãy số & Giới hạn dãy

## Mục tiêu

- Hiểu **dãy số** (sequence) — danh sách số có thứ tự.
- Định nghĩa **giới hạn dãy** một cách trực giác và hình thức (ε-N).
- Quy tắc tính giới hạn: tổng, hiệu, tích, thương.
- Hai giới hạn nổi tiếng: (1 + 1/n)^n → **e**, sin(1/n)/(1/n) → 1.

## Kiến thức tiền đề

- [Tier 1 — Hàm số](../../01-Arithmetic-Algebra/lesson-07-functions-intro/).

---

## 1. Dãy số là gì?

💡 **Trực giác**: Dãy số = một danh sách các số đánh số 1, 2, 3, ... vô hạn.

**Ký hiệu**: (a_n)_{n=1}^∞ hoặc gọn hơn a_n.

**Ví dụ**:
- a_n = 1/n: 1, 1/2, 1/3, 1/4, ... → tiến dần về 0.
- b_n = n²: 1, 4, 9, 16, ... → tăng vô hạn.
- c_n = (-1)^n: -1, 1, -1, 1, ... → dao động.
- d_n = (1 + 1/n)^n: 2, 2.25, 2.37, 2.44, ..., → tiến về **e ≈ 2.718**.

⟶ Câu hỏi: dãy "dẫn về đâu" khi n rất lớn?

❓ **Câu hỏi tự nhiên của người đọc**

- *"Dãy số khác hàm số ở chỗ nào?"* Dãy chỉ nhận đầu vào là số nguyên dương \`n ∈ {1, 2, 3, ...}\`, còn hàm số nhận đầu vào là số thực bất kỳ. Dãy \`a_n = 1/n\` chỉ định nghĩa tại \`n = 1, 2, 3\` (cho \`1, 1/2, 1/3\`), không có \`a_{1.5}\`. Có thể coi dãy là "hàm số mà miền xác định là ℕ".
- *"Dãy phải có công thức không?"* Không bắt buộc. Dãy Fibonacci \`1, 1, 2, 3, 5, 8, ...\` định nghĩa bằng quy luật \`a_n = a_{n-1} + a_{n-2}\` (đệ quy), không có công thức trực tiếp đơn giản. Miễn mỗi \`n\` ứng với đúng 1 số là một dãy hợp lệ.

⚠ **Lỗi thường gặp — "vài số hạng đầu giống nhau" KHÔNG có nghĩa hai dãy bằng nhau**. Dãy \`a_n = n\` cho \`1, 2, 3, 4, ...\` và dãy \`b_n = n + (n−1)(n−2)(n−3)(n−4)\` cũng cho \`1, 2, 3, 4\` ở 4 số hạng đầu, nhưng \`b_5 = 5 + 24 = 29 ≠ 5\`. Nhìn vài số đầu rồi "đoán quy luật" là không chặt chẽ — luôn cần công thức/định nghĩa rõ ràng.

🔁 **Dừng lại tự kiểm tra**

1. Viết 4 số hạng đầu của dãy \`a_n = (−1)^n / n\`.
2. Dãy \`a_n = 2^n\` tiến về đâu khi \`n → ∞\`?

<details><summary>Đáp án</summary>

1. \`a_1 = −1, a_2 = 1/2, a_3 = −1/3, a_4 = 1/4\`. Dấu xen kẽ, độ lớn giảm dần → tiến về 0.
2. \`2, 4, 8, 16, ...\` tăng vô hạn → phân kỳ về \`+∞\` (không có giới hạn hữu hạn).

</details>

### 📝 Tóm tắt mục 1

- Dãy số = hàm số có miền xác định là ℕ; mỗi \`n\` ứng với đúng 1 số \`a_n\`.
- Ký hiệu \`(a_n)\` hoặc \`a_n\`; định nghĩa bằng công thức trực tiếp hoặc đệ quy.
- Câu hỏi trung tâm: khi \`n\` rất lớn, dãy "dẫn về đâu" → khái niệm giới hạn.

---

## 2. Giới hạn dãy — Định nghĩa trực giác

💡 **Là gì**: Số L được gọi là giới hạn của dãy a_n nếu khi n đủ lớn, a_n **gần L tùy ý**.

**Ký hiệu**: \`lim_{n→∞} a_n = L\` hoặc \`a_n → L\`.

**Ví dụ số cụ thể** (a_n = 1/n):
- n=10 → a = 0.1.
- n=100 → a = 0.01.
- n=1000 → a = 0.001.
- n=10⁶ → a = 10⁻⁶.
- ⟶ **lim 1/n = 0**.

❓ **"Đủ gần" nghĩa là gì?** Đáp: với mọi sai số ε > 0 (dù nhỏ), tồn tại N sao cho mọi n ≥ N thì |a_n - L| < ε.

### Định nghĩa hình thức (ε-N) — Cauchy

\`\`\`
lim_{n→∞} a_n = L
⟺
∀ε > 0, ∃N ∈ ℕ, ∀n ≥ N : |a_n - L| < ε
\`\`\`

💡 **Đọc trực giác**: "Cho dù tôi đòi sai số bé đến đâu (ε), bạn luôn tìm được một mốc N để từ N trở đi, dãy nằm trong khoảng (L-ε, L+ε)."

⟶ Đây là **một trong những định nghĩa quan trọng nhất của Toán cấp cao**. Nó làm cho khái niệm "đủ gần" trở nên chính xác, không còn mơ hồ.

> 📐 **Định nghĩa đầy đủ — Giới hạn dãy (ε-N)**
>
> **(a) Là gì**: Phát biểu chính xác bằng logic: cho mọi sai số ε > 0 (dù nhỏ thế nào tùy chọn), TỒN TẠI 1 mốc N sao cho mọi a_n với n ≥ N đều nằm trong khoảng (L−ε, L+ε). "Game" giữa người đòi sai số và người phải đáp ứng.
>
> **(b) Vì sao cần**: Trước Cauchy (~1820), giới hạn được hiểu mơ hồ "tiến gần dần" — không thể chứng minh nghiêm túc. Định nghĩa ε-N biến mơ hồ thành 1 mệnh đề logic kiểm tra được. Đây là **nền tảng toàn bộ Giải tích** — không có nó, không có đạo hàm, tích phân, chuỗi, không gian Banach... Cuộc cách mạng "rigorisation" của Toán thế kỷ 19 bắt đầu từ đây.
>
> **(c) Ví dụ số**: Chứng minh lim 1/n = 0. Cho ε = 0.01: cần |1/n − 0| < 0.01 → n > 100. Chọn N = 101 → mọi n ≥ 101 thoả. Cho ε = 10⁻⁶: cần n > 10⁶. Chọn N = 10⁶+1 thoả. Cho ε bất kỳ > 0: chọn N = ⌈1/ε⌉ + 1 → xong. Vậy lim = 0 ✓. Phản ví dụ: dãy (-1)^n không hội tụ — chọn ε = 0.5, không N nào làm |(-1)^n − L| < 0.5 ∀n≥N (vì dãy nhảy giữa ±1).

❓ **Câu hỏi tự nhiên của người đọc**

- *"Vì sao phải \`∀ε\` rồi mới \`∃N\` — đảo thứ tự được không?"* Không. Thứ tự "với MỌI ε, TỒN TẠI N" nghĩa là N được phép **phụ thuộc vào ε** (ε nhỏ hơn → cần N lớn hơn). Nếu đảo thành "∃N, ∀ε" thì 1 mốc N phải thoả mọi ε — quá mạnh, gần như không dãy nào đạt. Thứ tự lượng từ là linh hồn của định nghĩa.
- *"Giới hạn có thể có 2 giá trị khác nhau không?"* Không — giới hạn nếu tồn tại thì **duy nhất**. Giả sử dãy hội tụ về cả \`L₁\` và \`L₂\` với \`L₁ ≠ L₂\`: chọn \`ε = |L₁−L₂|/2\`, thì từ một mốc nào đó dãy phải đồng thời nằm trong hai khoảng rời nhau quanh \`L₁\` và \`L₂\` — vô lý.
- *"\`a_n\` có cần thực sự 'đạt' tới L không?"* Không. \`1/n\` không bao giờ bằng đúng 0, nhưng vẫn \`lim = 0\`. Giới hạn nói về xu hướng tiến gần, không phải về việc chạm tới.

⚠ **Lỗi thường gặp — nhầm "có vô hạn số hạng gần L" với "hội tụ về L"**. Dãy \`0, 1, 0, 1/2, 0, 1/3, ...\` (các số hạng lẻ = 0, chẵn = \`1/k\`) có vô hạn số hạng bằng 0, nhưng KHÔNG hội tụ về 0: với \`ε = 0.4\`, dãy vẫn có vô hạn số hạng (các \`1/k\` đầu) nằm ngoài \`(−0.4, 0.4)\`. Hội tụ đòi hỏi **từ N trở đi TẤT CẢ** nằm trong, không phải "có nhiều".

🔁 **Dừng lại tự kiểm tra**

1. Với dãy \`a_n = 1/n\` và \`ε = 0.02\`, mốc \`N\` nhỏ nhất thoả \`|a_n| < ε\` với mọi \`n ≥ N\` là bao nhiêu?
2. Dãy hằng \`a_n = 7\` có hội tụ không? Về đâu?

<details><summary>Đáp án</summary>

1. Cần \`1/n < 0.02 ⟺ n > 50\`. Vậy \`N = 51\` (từ \`n = 51\` trở đi \`1/n < 0.02\`).
2. Có, \`lim = 7\`. Với mọi \`ε > 0\`, \`|7 − 7| = 0 < ε\` đúng với mọi \`n\` → chọn \`N = 1\`.

</details>

### 📝 Tóm tắt mục 2

- \`lim a_n = L\`: khi \`n\` đủ lớn, \`a_n\` gần \`L\` tùy ý.
- Định nghĩa ε-N: \`∀ε>0, ∃N, ∀n≥N: |a_n − L| < ε\` — thứ tự lượng từ là cốt lõi.
- Giới hạn nếu tồn tại thì **duy nhất**; dãy không cần "đạt" tới L, chỉ cần tiến gần.

---

## 3. Phân loại dãy

| Loại | Ý nghĩa | Ví dụ |
|------|---------|-------|
| **Hội tụ** | lim tồn tại, hữu hạn | 1/n → 0 |
| **Phân kỳ về ±∞** | a_n → ∞ hoặc -∞ | n² → +∞ |
| **Phân kỳ (dao động)** | không có lim | (-1)^n |

💡 **Trực giác**: ba loại tương ứng ba "số phận" của dãy khi \`n → ∞\`: ổn định lại tại 1 số (hội tụ), bay ra vô cực (phân kỳ ±∞), hay mắc kẹt nhảy qua nhảy lại không bao giờ ổn định (dao động).

❓ **Câu hỏi tự nhiên của người đọc**

- *"Phân kỳ về \`+∞\` và dao động — đều không có giới hạn hữu hạn, sao tách ra?"* Vì hành vi khác hẳn: \`n²\` đi theo MỘT hướng rõ ràng (lớn dần mãi), ta nói \`lim = +∞\` (giới hạn vô cực — vẫn dự đoán được). Còn \`(−1)^n\` không theo hướng nào — không gán được cả \`±∞\`.
- *"Dãy \`(−1)^n · n\` thuộc loại nào?"* Cho \`−1, 2, −3, 4, −5, ...\`: độ lớn ra vô cực nhưng dấu đổi → **dao động không bị chặn**, không có giới hạn (kể cả vô cực).

⚠ **Lỗi thường gặp — tưởng "bị chặn" thì "hội tụ"**. \`(−1)^n\` bị chặn (luôn nằm trong \`[−1, 1]\`) nhưng KHÔNG hội tụ. Bị chặn chỉ là điều kiện cần, không đủ. (Điều kiện đủ kinh điển: bị chặn **và** đơn điệu → hội tụ.)

🔁 **Dừng lại tự kiểm tra**

1. Dãy \`a_n = (−1)^n · (1/n)\` (\`−1, 1/2, −1/3, ...\`) thuộc loại nào?
2. Dãy \`a_n = n − 1/n\` thuộc loại nào?

<details><summary>Đáp án</summary>

1. **Hội tụ** về 0 (dù dấu xen kẽ, độ lớn \`1/n → 0\`, bị kẹp giữa \`−1/n\` và \`1/n\`).
2. **Phân kỳ về \`+∞\`** (\`n\` áp đảo, \`1/n → 0\`).

</details>

### 📝 Tóm tắt mục 3

- 3 loại: hội tụ (lim hữu hạn), phân kỳ ±∞ (đi 1 hướng ra vô cực), dao động (không hướng).
- Bị chặn là điều kiện **cần** chứ không **đủ** để hội tụ (\`(−1)^n\` phản ví dụ).
- "Phân kỳ về \`+∞\`" vẫn có dự đoán được; "dao động" thì không.

---

## 4. Quy tắc tính giới hạn

Cho a_n → A, b_n → B (hữu hạn):

\`\`\`
lim(a_n + b_n) = A + B
lim(a_n - b_n) = A - B
lim(a_n · b_n) = A · B
lim(a_n / b_n) = A / B   (nếu B ≠ 0)
lim(c · a_n) = c · A
\`\`\`

⟶ Giống như "đại số bình thường" — cộng/trừ/nhân/chia tự nhiên.

⚠ **Dạng không xác định** (cần biến đổi):
- ∞ - ∞, 0 · ∞, ∞/∞, 0/0, 1^∞, 0⁰, ∞⁰.

💡 **Trực giác — vì sao quy tắc đúng**: nếu \`a_n\` ổn định quanh \`A\` và \`b_n\` quanh \`B\` thì \`a_n + b_n\` ổn định quanh \`A + B\` (sai số tổng = tổng sai số, vẫn nhỏ tùy ý). Đây là lý do "đại số giới hạn" hoạt động như đại số số thực bình thường — nhưng **chỉ khi cả hai giới hạn hữu hạn và tồn tại**.

**Verify quy tắc bằng số** (\`a_n = 2 + 1/n → 2\`, \`b_n = 3 − 1/n² → 3\`):
- \`a_n + b_n = 5 + 1/n − 1/n²\`: tại \`n=1000\` ≈ \`5.000999\` → \`lim = 5 = 2+3\` ✓.
- \`a_n · b_n\`: tại \`n=1000\` ≈ \`2.001 · 2.999999 ≈ 6.00198\` → \`lim = 6 = 2·3\` ✓.
- \`a_n / b_n\`: tại \`n=1000\` ≈ \`2.001/2.999999 ≈ 0.66700\` → \`lim = 2/3 ≈ 0.6667\` ✓.

❓ **Câu hỏi tự nhiên của người đọc**

- *"Tại sao \`∞ − ∞\` lại 'không xác định' — chẳng phải bằng 0?"* Không. Nó tùy biểu thức cụ thể: \`(n+5) − n = 5 → 5\`; \`(n²) − n → +∞\`; \`n − (n − 7) = 7 → 7\`. Cùng dạng \`∞−∞\` mà ra ba kết quả khác nhau → phải biến đổi trước khi kết luận.
- *"Quy tắc thương cần \`B ≠ 0\` — nếu \`B = 0\` thì sao?"* Rơi vào dạng vô định \`0/0\` (nếu \`A = 0\`) hoặc tiến ra \`±∞\` (nếu \`A ≠ 0\`). Cả hai trường hợp đều cần xử lý riêng, không dùng được quy tắc thương trực tiếp.

⚠ **Lỗi thường gặp — áp quy tắc khi giới hạn KHÔNG tồn tại**. \`lim[(−1)^n + (−1)^{n+1}]\`: từng hạng không có giới hạn, nhưng tổng \`= 0\` với mọi \`n\` → \`lim = 0\`. Không được viết "\`= lim(−1)^n + lim(−1)^{n+1}\`" vì hai lim đó không tồn tại — quy tắc tổng chỉ áp khi cả hai lim tồn tại.

🔁 **Dừng lại tự kiểm tra**

1. Tính \`lim (5 − 3/n)·(2 + 1/n)\`.
2. Dạng của \`lim (n² − n)\` khi \`n → ∞\` là gì, và bằng bao nhiêu?

<details><summary>Đáp án</summary>

1. \`= 5·2 = 10\` (cả hai thừa số hội tụ → dùng quy tắc tích).
2. Dạng \`∞ − ∞\`; biến đổi \`n²−n = n(n−1) → +∞\`.

</details>

### 📝 Tóm tắt mục 4

- Khi \`a_n → A\`, \`b_n → B\` hữu hạn: lim phân phối qua \`+, −, ·, /\` (thương cần \`B ≠ 0\`).
- Quy tắc chỉ áp khi **cả hai giới hạn tồn tại** — không thì phải biến đổi trước.
- 7 dạng vô định (\`0/0\`, \`∞/∞\`, \`∞−∞\`, \`0·∞\`, \`1^∞\`, \`0⁰\`, \`∞⁰\`) cần xử lý riêng.

---

## 5. Hai giới hạn nổi tiếng

### 5.1. (1 + 1/n)^n → e

\`\`\`
lim_{n→∞} (1 + 1/n)^n = e ≈ 2.71828...
\`\`\`

**Tính cụ thể**:
- n=1: (1+1)^1 = 2.
- n=10: 1.1^10 ≈ 2.5937.
- n=100: 1.01^100 ≈ 2.7048.
- n=1000: ≈ 2.7169.
- n=10⁶: ≈ 2.71828.

💡 **Vì sao quan trọng**: Định nghĩa số e. Liên quan đến lãi kép, e^x là duy nhất hàm có đạo hàm = chính nó.

### 5.2. sin(x)/x → 1 khi x → 0

(Áp dụng cho dãy x_n → 0):
\`\`\`
lim sin(x)/x = 1   khi x → 0
\`\`\`

**Hệ quả** (dùng nhiều khi tính đạo hàm sin x):
- lim(1 - cos x)/x = 0.
- lim tan(x)/x = 1.

❓ **Câu hỏi tự nhiên của người đọc**

- *"\`(1 + 1/n)^n\` là dạng \`1^∞\` — sao không bằng 1?"* Vì đây đúng là dạng **vô định**: cơ số \`1 + 1/n\` tiến tới 1 (đẩy kết quả về 1) nhưng số mũ \`n\` ra vô cực (đẩy kết quả lên). Hai lực đối nghịch "cân bằng" tại \`e ≈ 2.718\`, không phải 1 cũng không phải ∞. Bảng số ở trên cho thấy nó hội tụ chầm chậm về 2.718.
- *"\`sin(x)/x\` tại \`x = 0\` là \`0/0\` — sao bằng 1?"* Vì khi \`x\` rất nhỏ (radian), \`sin x ≈ x\` (cung gần bằng dây). Tại \`x = 0.01\`: \`sin(0.01)/0.01 = 0.00999983/0.01 ≈ 0.99998\` → tiến 1. **Bắt buộc dùng radian**, không phải độ.

⚠ **Lỗi thường gặp — dùng độ thay vì radian cho \`sin x / x\`**. Nếu \`x\` tính bằng độ, \`sin(1°)/1 = 0.01745.../1 ≈ 0.01745\`, KHÔNG tiến về 1. Giới hạn \`sin x/x → 1\` chỉ đúng với **radian** — đây là một trong các lý do giải tích luôn dùng radian.

🔁 **Dừng lại tự kiểm tra**

1. \`lim (1 + 1/n)^{2n} = ?\`
2. \`lim_{x→0} sin(5x)/x = ?\`

<details><summary>Đáp án</summary>

1. \`(1+1/n)^{2n} = [(1+1/n)^n]^2 → e^2 ≈ 7.389\`.
2. Viết \`sin(5x)/x = 5·sin(5x)/(5x) → 5·1 = 5\`.

</details>

### 📝 Tóm tắt mục 5

- \`(1 + 1/n)^n → e ≈ 2.71828\` — dạng vô định \`1^∞\`, định nghĩa số \`e\`.
- \`sin x / x → 1\` khi \`x → 0\` (radian); kéo theo \`(1−cos x)/x → 0\`, \`tan x/x → 1\`.
- Hai giới hạn này là nền tảng cho đạo hàm hàm mũ và lượng giác (L03).

---

## 6. Định lý kẹp (Squeeze Theorem)

Nếu a_n ≤ b_n ≤ c_n và lim a_n = lim c_n = L, thì **lim b_n = L**.

💡 **Trực giác**: Nếu b bị "kẹp" giữa 2 dãy đều dần về L, thì b cũng phải dần về L.

**Ví dụ**: Tính lim sin(n)/n.
- |sin n| ≤ 1 → -1/n ≤ sin(n)/n ≤ 1/n.
- Cả 2 đầu → 0. ⟶ lim sin(n)/n = **0**.

❓ **Câu hỏi tự nhiên của người đọc**

- *"Sao không tính \`lim sin(n)\` trực tiếp rồi chia cho \`lim n\`?"* Vì \`lim sin(n)\` KHÔNG tồn tại (\`sin n\` dao động vô tận trong \`[−1,1]\` khi \`n\` chạy), còn \`lim n = ∞\` → rơi vào dạng vô định. Định lý kẹp né hẳn việc đó: ta không cần biết \`sin(n)/n\` xử sự ra sao, chỉ cần hai dãy chặn đều về 0.
- *"Hai dãy chặn phải về CÙNG một giới hạn?"* Đúng, bắt buộc. Nếu \`lim a_n = 0\` nhưng \`lim c_n = 1\` thì định lý không kết luận gì — \`b_n\` có thể lảng vảng bất kỳ đâu trong \`[0, 1]\`.

⚠ **Lỗi thường gặp — chặn không đúng chiều hoặc hai cận khác giới hạn**. Muốn kẹp \`b_n\`, phải có \`a_n ≤ b_n ≤ c_n\` **đúng từ một mốc trở đi** và \`lim a_n = lim c_n\`. Vd chặn \`sin(n)/n\` bằng \`−1 ≤ sin(n)/n ≤ 1\` là vô dụng (hai cận \`−1, 1\` không bằng nhau) — phải chia thêm \`n\` để có \`−1/n ≤ ... ≤ 1/n\`.

🔁 **Dừng lại tự kiểm tra**

1. Dùng định lý kẹp tính \`lim cos(n²)/n\`.
2. Tại sao không kẹp được \`lim sin(n)\` (không chia \`n\`)?

<details><summary>Đáp án</summary>

1. \`−1/n ≤ cos(n²)/n ≤ 1/n\`, hai cận → 0 → \`lim = 0\`.
2. Cận tự nhiên là \`−1 ≤ sin(n) ≤ 1\` nhưng \`lim(−1) = −1 ≠ 1 = lim(1)\` → không kẹp được; thực tế \`lim sin(n)\` không tồn tại.

</details>

### 📝 Tóm tắt mục 6

- Định lý kẹp: \`a_n ≤ b_n ≤ c_n\` và \`lim a_n = lim c_n = L\` ⟹ \`lim b_n = L\`.
- Dùng cho dãy "khó trực tiếp" nhưng bị chặn giữa hai dãy đơn giản (vd có \`sin n\`, \`cos n\`).
- Hai cận **bắt buộc cùng giới hạn**; chặn lệch chiều/khác L là vô dụng.

---

## 7. Bài tập

### Bài tập

**Bài 1**: Tính lim (3n + 5)/(2n - 1).

**Bài 2**: Tính lim (n² + 2)/n³.

**Bài 3**: Tính lim (√(n²+1) - n). (Gợi ý: nhân liên hợp.)

**Bài 4**: Tính lim (1 + 2/n)^n.

**Bài 5**: Dãy a_n = cos(nπ/3)/n. Tính lim a_n.

### Lời giải

**Bài 1**: Chia tử mẫu cho n: lim (3 + 5/n)/(2 - 1/n) = (3+0)/(2-0) = **3/2**.

**Bài 2**: Chia cho n³: lim (1/n + 2/n³) = 0 + 0 = **0**.

**Bài 3**: (√(n²+1) - n)(√(n²+1) + n)/(√(n²+1) + n) = (n²+1 - n²)/(√(n²+1) + n) = 1/(√(n²+1) + n) → 1/(∞+∞) = **0**.

**Bài 4**: (1 + 2/n)^n = [(1 + 1/(n/2))^(n/2)]² → e² ≈ **7.389**.

**Bài 5**: |cos(nπ/3)| ≤ 1 → -1/n ≤ a_n ≤ 1/n → kẹp về **0**.

---

## 8. Bài tiếp theo

[Lesson 02 — Giới hạn hàm & liên tục](../lesson-02-function-limits-continuity/).

## 📝 Tổng kết

1. **Dãy số**: a_n = một số ứng với mỗi n ∈ ℕ.
2. **Giới hạn**: lim a_n = L (∀ε>0, ∃N, ∀n≥N: |a_n - L| < ε).
3. **3 loại dãy**: hội tụ, phân kỳ ±∞, dao động.
4. **(1+1/n)^n → e**, **sin x/x → 1**.
5. **Định lý kẹp** cho dãy phức tạp bị kẹp giữa 2 dãy đơn giản.
`;
