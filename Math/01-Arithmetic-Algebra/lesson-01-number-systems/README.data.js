// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: Math/01-Arithmetic-Algebra/lesson-01-number-systems/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 01 — Hệ số học ($\\mathbb{N} \\to \\mathbb{Z} \\to \\mathbb{Q} \\to \\mathbb{R}$)

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Phân biệt 4 tập số chính: **$\\mathbb{N}$ (tự nhiên), $\\mathbb{Z}$ (nguyên), $\\mathbb{Q}$ (hữu tỉ), $\\mathbb{R}$ (thực)**.
- Hiểu **vì sao** mỗi tập tồn tại — không phải ngẫu nhiên, mà là **mở rộng có lý do**.
- Biết bao hàm: **$\\mathbb{N} \\subset \\mathbb{Z} \\subset \\mathbb{Q} \\subset \\mathbb{R}$**.
- Phân biệt **số hữu tỉ** (viết được phân số) và **số vô tỉ** (không viết được).
- Biểu diễn số trên **trục số**, hiểu **giá trị tuyệt đối** $\\lvert x \\rvert$ (khoảng cách tới 0).
- Đổi qua lại **phân số ↔ thập phân**, nhận biết chia hết, số nguyên tố, **GCD/LCM**.
- Hiểu vì sao **máy tính không lưu chính xác 0.1** (sai số float).

## Kiến thức tiền đề

Không. Cần biết cộng/trừ/nhân/chia tiểu học. Nếu đã quen một ngôn ngữ lập trình (đặc biệt Go) thì phần "sai số float" sẽ dễ vào hơn.

> **Bản đồ bài học**: ta đi theo "câu chuyện mở rộng số" — bắt đầu từ đếm ($\\mathbb{N}$), gặp giới hạn, mở rộng để vá lỗ, lặp lại cho tới $\\mathbb{R}$. Mỗi tập mới ra đời để giải **một** vấn đề cụ thể của tập trước.

### 💡 Trực giác xuyên suốt — vì sao cần mở rộng tập số?

Đừng coi $\\mathbb{N} \\to \\mathbb{Z} \\to \\mathbb{Q} \\to \\mathbb{R}$ là "danh sách phải học thuộc". Đó là **4 lần loài người buộc phải phát minh số mới** vì số cũ không đủ dùng. Câu chuyện đời sống:

\`\`\`
   ĐẾM        →  "3 con bò"                    → cần ℕ = {0,1,2,...}
   NỢ         →  "thiếu 5 đồng" = −5           → cần ℤ (thêm số âm)
   CHIA       →  "1 cái bánh / 3 người" = 1/3  → cần ℚ (thêm phân số)
   ĐO         →  "đường chéo hình vuông" = √2  → cần ℝ (thêm vô tỉ)
\`\`\`

Mỗi mũi tên là một **phép toán làm "thoát" khỏi tập hiện tại**: trừ thoát khỏi $\\mathbb{N}$, chia thoát khỏi $\\mathbb{Z}$, lấy căn thoát khỏi $\\mathbb{Q}$. Toán học vá lỗ bằng cách "thêm vừa đủ số mới để phép đó luôn có kết quả". Đây là sợi chỉ đỏ của cả bài.

---

## 1. $\\mathbb{N}$ — Tập số tự nhiên

### 1.1. Định nghĩa

**$\\mathbb{N} = \\{0, 1, 2, 3, 4, \\ldots\\}$** — các số dùng để **đếm**.

💡 **Là gì**: $\\mathbb{N}$ là tập "nguyên thủy" — đủ để đếm vật rời rạc (số quả táo, số người).

**Vì sao tồn tại**: Đây là khái niệm số sớm nhất loài người dùng. Có trước cả khái niệm "số 0" (số 0 chỉ xuất hiện ở Ấn Độ ~ thế kỷ 7).

**Quy ước**: Trong tài liệu này, $\\mathbb{N}$ **bao gồm 0** (theo chuẩn ISO và lập trình). Một số sách Việt Nam phổ thông cũ định nghĩa $\\mathbb{N} = \\{1, 2, 3, \\ldots\\}$, có ký hiệu riêng $\\mathbb{N}^* = \\{1, 2, \\ldots\\}$. Khi đọc tài liệu, luôn kiểm tra quy ước.

**Bốn ví dụ thuộc $\\mathbb{N}$**: $0$ (số nhỏ nhất), $7$, $42$, $1000000$. **Bốn ví dụ KHÔNG thuộc**: $-3$ (âm), $0.5$ (thập phân), $\\frac{2}{3}$ (phân số), $\\sqrt{2}$ (vô tỉ).

### 1.2. Tính đóng (closure) — khái niệm chìa khóa

💡 **Là gì**: "Tập $S$ **đóng** (closed) dưới phép toán $\\ast$" nghĩa là — lấy hai phần tử bất kỳ của $S$, áp dụng $\\ast$, **kết quả vẫn nằm trong $S$**. Đây chính là thước đo "tập này còn thiếu gì": nếu một phép toán làm ta "thoát" khỏi tập, ta cần mở rộng.

Walk-through cho $\\mathbb{N}$ — kiểm tra từng phép bằng số thật:

- **Cộng**: $3 + 7 = 10 \\in \\mathbb{N}$ ✓; $0 + 5 = 5 \\in \\mathbb{N}$ ✓; $100 + 200 = 300 \\in \\mathbb{N}$ ✓ → đóng.
- **Nhân**: $3 \\times 4 = 12 \\in \\mathbb{N}$ ✓; $0 \\times 999 = 0 \\in \\mathbb{N}$ ✓; $7 \\times 1 = 7 \\in \\mathbb{N}$ ✓ → đóng.
- **Trừ**: $5 - 3 = 2 \\in \\mathbb{N}$ ✓, **nhưng** $3 - 5 = -2 \\notin \\mathbb{N}$ ✗ → **KHÔNG đóng**.
- **Chia**: $6 \\div 2 = 3 \\in \\mathbb{N}$ ✓, **nhưng** $6 \\div 4 = 1.5 \\notin \\mathbb{N}$ ✗ → **KHÔNG đóng**.

⚠ **Quy tắc vàng**: chỉ cần **MỘT** phản ví dụ là đủ để khẳng định tập không đóng. Để khẳng định tập *có* đóng thì phải đúng với *mọi* cặp — không thể "thử vài cái rồi kết luận".

→ Vì $\\mathbb{N}$ không đóng dưới $-$ ($3 - 5 = -2$ thoát ra ngoài), ta phải **mở rộng** thành tập lớn hơn để phép trừ luôn có kết quả. Đó là $\\mathbb{Z}$ ở mục sau.

❓ **Câu hỏi tự nhiên của người đọc**

- *"Vì sao bắt buộc có số 0?"* Vì $0$ trả lời câu "có bao nhiêu lỗi trong code?" khi đáp án là "không có". Lịch sử: số 0 xuất hiện ở Ấn Độ ~ thế kỷ 5-7, muộn hơn hẳn các số đếm. Trong lập trình, chỉ số mảng \`arr[0]\` cũng cần 0 → đây là lý do tài liệu này theo quy ước $0 \\in \\mathbb{N}$.
- *"$\\mathbb{N}$ có vô hạn không?"* Có — vô hạn "đếm được": với mọi $n$ luôn còn $n+1$. Khi gặp $\\mathbb{R}$ (§4) ta sẽ thấy $\\mathbb{R}$ "vô hạn nhiều hơn" $\\mathbb{N}$ (kết quả Cantor).
- *"\`int\` trong Go có phải là $\\mathbb{N}$/$\\mathbb{Z}$ không?"* Không hẳn — \`int64\` bị chặn ($-2^{63}$ tới $2^{63}-1$), còn $\\mathbb{N}$, $\\mathbb{Z}$ vô hạn không chặn. Tính giai thừa lớn → \`int\` bị tràn (overflow), $\\mathbb{N}$ thì không.

🔁 **Dừng lại tự kiểm tra**: số nào thuộc $\\mathbb{N}$: $7$, $-2$, $0$, $3.14$, $\\sqrt{9}$, $0.5$? $\\mathbb{N}$ có đóng dưới lũy thừa $a^b$ không?

<details><summary>Đáp án</summary>

$7, 0, \\sqrt{9}=3$ thuộc $\\mathbb{N}$. $-2$ (âm), $3.14$ và $0.5$ (thập phân) thì không. Lũy thừa: **đóng** (với quy ước $0^0=1$) — vd $2^3=8$, $5^0=1$, $0^5=0$, đều $\\in \\mathbb{N}$.

</details>

### 📝 Tóm tắt mục 1

- $\\mathbb{N} = \\{0,1,2,\\ldots\\}$ (quy ước tài liệu này, có 0). Dùng để **đếm**, rời rạc.
- **Đóng** dưới $+$, $\\times$; **KHÔNG đóng** dưới $-$, $\\div$.
- Chỉ cần 1 phản ví dụ để bác bỏ tính đóng.
- Không đóng dưới $-$ → buộc mở rộng sang $\\mathbb{Z}$.

---

## 2. $\\mathbb{Z}$ — Tập số nguyên

### 2.1. Định nghĩa

**$\\mathbb{Z} = \\{\\ldots, -3, -2, -1, 0, 1, 2, 3, \\ldots\\}$** — số tự nhiên + số nguyên âm.

💡 **Là gì**: $\\mathbb{Z}$ thêm vào $\\mathbb{N}$ các số âm để **phép trừ luôn có nghĩa**.

**Vì sao tồn tại**: Để mô hình hóa các khái niệm như "nợ", "nhiệt độ dưới 0", "tọa độ trái/phải".

**Bốn ví dụ thuộc $\\mathbb{Z}$**: $-5$, $0$, $42$, $-1000$. Ký hiệu $\\mathbb{Z}$ đến từ tiếng Đức *Zahlen* ("các con số").

### 2.2. Tính đóng và quy tắc dấu

$\\mathbb{Z}$ đóng dưới $+$, $-$, $\\times$ — walk-through:

- **Trừ** (cái $\\mathbb{N}$ thiếu): $3 - 5 = -2 \\in \\mathbb{Z}$ ✓; $(-4) - (-9) = 5 \\in \\mathbb{Z}$ ✓; $0 - 100 = -100 \\in \\mathbb{Z}$ ✓ → **đóng**. Đây chính là vấn đề $\\mathbb{Z}$ ra đời để giải.
- **Nhân**: $(-3) \\times 4 = -12 \\in \\mathbb{Z}$ ✓; $(-5)\\times(-2) = 10 \\in \\mathbb{Z}$ ✓ → đóng.
- **Chia**: $6 \\div (-2) = -3 \\in \\mathbb{Z}$ ✓, **nhưng** $1 \\div 2 = 0.5 \\notin \\mathbb{Z}$ ✗; $(-5)\\div 3 = -1.666\\ldots \\notin \\mathbb{Z}$ ✗ → **KHÔNG đóng**.

**Quy tắc dấu khi nhân** — bốn trường hợp:

$$2 \\times 3 = 6, \\quad 2 \\times (-3) = -6, \\quad (-2) \\times 3 = -6, \\quad (-2) \\times (-3) = +6$$

💡 **Vì sao âm × âm = dương?** Không phải "quy ước tùy tiện" mà là **hệ quả bắt buộc** của luật phân phối. Chứng minh từng bước rằng $(-1)\\times(-1)$ phải bằng $+1$:

$$\\begin{aligned}
0 &= (-1) \\times 0 &&\\text{(vì } x \\times 0 = 0\\text{)} \\\\
  &= (-1) \\times \\big(1 + (-1)\\big) &&\\text{(vì } 1 + (-1) = 0\\text{)} \\\\
  &= (-1)\\times 1 + (-1)\\times(-1) &&\\text{(phân phối)} \\\\
  &= -1 + (-1)\\times(-1)
\\end{aligned}$$

Để vế cuối bằng $0$, bắt buộc $(-1)\\times(-1) = +1$. Nếu nó bằng $-1$ thì ta được $0 = -2$, vô lý.

⚠ **Lỗi thường gặp**

- **Tưởng $-x$ luôn âm.** Sai. $-x$ là "số đối của $x$". Nếu $x = -3$ thì $-x = -(-3) = 3$ — **dương**. Đừng nhìn dấu $-$ rồi vội kết luận.
- **Nhầm $-3^2 = 9$.** Theo thứ tự ưu tiên, $-3^2 = -(3^2) = -9$ (lũy thừa trước, dấu trừ sau). Còn $(-3)^2 = 9$. Đây là nguồn bug kinh điển khi viết code.

❓ **Câu hỏi tự nhiên của người đọc**

- *"Vì sao ký hiệu $\\mathbb{Z}$ chứ không phải $I$ (Integer)?"* Vì $I$ thường để dành cho ma trận đơn vị (identity). Người Đức (Dedekind, Kronecker) dùng $Z$ từ *Zahlen* — thành chuẩn quốc tế.

🔁 **Dừng lại tự kiểm tra**: tính $(-4) \\times (-5) + (-2) \\times 3 - (-1)$.

<details><summary>Đáp án</summary>

$= 20 + (-6) - (-1) = 20 - 6 + 1 = 15 \\in \\mathbb{Z}$.

</details>

### 📝 Tóm tắt mục 2

- $\\mathbb{Z} = \\{\\ldots,-2,-1,0,1,2,\\ldots\\}$, mở rộng $\\mathbb{N}$ bằng số âm để **phép trừ luôn được**.
- Đóng dưới $+$, $-$, $\\times$; **KHÔNG đóng** dưới $\\div$.
- Quy tắc dấu $(-)\\times(-)=(+)$ là hệ quả của phân phối, không phải quy ước.
- Không đóng dưới $\\div$ → mở rộng sang $\\mathbb{Q}$.

---

## 3. $\\mathbb{Q}$ — Tập số hữu tỉ (Rational)

### 3.1. Định nghĩa

**$\\mathbb{Q} = \\{p/q : p \\in \\mathbb{Z}, q \\in \\mathbb{Z}, q \\neq 0\\}$** — mọi số viết được dưới dạng **phân số**.

💡 **Là gì**: $\\mathbb{Q}$ thêm vào $\\mathbb{Z}$ các số phân số để phép chia luôn được (trừ chia 0).

**Vì sao tồn tại**: Để chia rời, đo lường, biểu thị tỉ lệ.

**Bốn (và hơn) ví dụ thuộc $\\mathbb{Q}$** — đọc kỹ từng cái:
- $\\frac{1}{2} = 0.5$ — phân số đơn giản, thập phân **dừng** sau 1 chữ số.
- $-\\frac{7}{2} = -3.5$ — phân số âm (tử âm).
- $\\frac{1}{3} = 0.333\\ldots$ — thập phân **vô hạn tuần hoàn** (lặp chữ số "3") nhưng **vẫn hữu tỉ**.
- $\\frac{22}{7} \\approx 3.142857142857\\ldots$ — hữu tỉ (chu kỳ "142857"). **KHÔNG** phải $\\pi$ — chỉ xấp xỉ.
- $-7 = \\frac{-7}{1}$ — mọi số nguyên đều là hữu tỉ (mẫu 1) → đây là lý do $\\mathbb{Z} \\subset \\mathbb{Q}$.
- $0 = \\frac{0}{1}$ — số 0 cũng hữu tỉ (tử 0, mẫu khác 0).

### 3.2. Đặc trưng

Số hữu tỉ khi viết dưới dạng thập phân thì:
- **Hữu hạn**: $1/4 = 0.25$.
- **Vô hạn LẶP LẠI tuần hoàn**: $1/3 = 0.333\\ldots$, $1/7 = 0.142857142857\\ldots$

**Đổi ngược thập phân lặp → phân số** (chứng minh $0.333\\ldots = 1/3$): đặt $x = 0.333\\ldots$. Nhân 10: $10x = 3.333\\ldots$. Trừ: $10x - x = 3.333\\ldots - 0.333\\ldots$ → $9x = 3$ → $x = 3/9 = 1/3$ ✓. Mọi số thập phân lặp tuần hoàn đều đổi về $p/q$ được như vậy → đó là lý do chúng là **hữu tỉ**.

#### 3.2.1. Vì sao khi nào "dừng", khi nào "tuần hoàn"?

💡 Quy luật gọn: phân số tối giản $\\frac{p}{q}$ cho thập phân **dừng** $\\iff$ mẫu $q$ chỉ có thừa số nguyên tố $2$ và/hoặc $5$ (tức $q = 2^a 5^b$). Vì sao? Vì $10 = 2 \\times 5$ — hệ thập phân chỉ "hợp" với 2 và 5. Walk-through:

- $\\frac{1}{8} = \\frac{1}{2^3} = \\frac{1 \\times 5^3}{2^3 \\times 5^3} = \\frac{125}{1000} = 0.125$ → **dừng** (mẫu chỉ có 2).
- $\\frac{3}{20} = \\frac{3}{2^2 \\cdot 5} = \\frac{3 \\times 5}{2^2 \\cdot 5 \\times 5} = \\frac{15}{100} = 0.15$ → **dừng** (mẫu chỉ 2, 5).
- $\\frac{1}{3}$: mẫu có thừa số $3$ (khác 2, 5) → **tuần hoàn** $0.333\\ldots$
- $\\frac{1}{7}$: mẫu có thừa số $7$ → **tuần hoàn** $0.142857142857\\ldots$ (chu kỳ 6 chữ số).
- $\\frac{1}{6} = \\frac{1}{2 \\cdot 3}$: có thừa số $3$ → **tuần hoàn** $0.1666\\ldots$

#### 3.2.2. Đổi phân số ↔ thập phân — bốn ví dụ hai chiều

**Phân số → thập phân** (chia tử cho mẫu): $\\frac{3}{4} = 0.75$; $\\frac{5}{8} = 0.625$; $\\frac{2}{3} = 0.666\\ldots$; $\\frac{7}{11} = 0.636363\\ldots$ (chu kỳ "63").

**Thập phân dừng → phân số** (đặt trên lũy thừa 10 rồi rút gọn):
- $0.6 = \\frac{6}{10} = \\frac{3}{5}$.
- $0.625 = \\frac{625}{1000} = \\frac{5}{8}$ (chia cả hai cho 125).
- $-0.125 = -\\frac{125}{1000} = -\\frac{1}{8}$.

**Thập phân tuần hoàn → phân số** (kỹ thuật "nhân rồi trừ"):
- $0.7777\\ldots$: đặt $x = 0.777\\ldots$, $10x = 7.777\\ldots$, trừ: $9x = 7 \\Rightarrow x = \\frac{7}{9}$.
- $0.121212\\ldots$: chu kỳ 2 chữ số → nhân $100$: $100x = 12.1212\\ldots$, trừ: $99x = 12 \\Rightarrow x = \\frac{12}{99} = \\frac{4}{33}$.

### 3.3. Tính đóng và vấn đề của $\\mathbb{Q}$

#### 3.3.1. Tính đóng của $\\mathbb{Q}$

Lấy $a = \\frac{2}{3}$, $b = \\frac{5}{4}$, kiểm tra 4 phép:
- **Cộng**: $\\frac{2}{3} + \\frac{5}{4} = \\frac{8}{12} + \\frac{15}{12} = \\frac{23}{12} \\in \\mathbb{Q}$ ✓.
- **Trừ**: $\\frac{2}{3} - \\frac{5}{4} = -\\frac{7}{12} \\in \\mathbb{Q}$ ✓.
- **Nhân**: $\\frac{2}{3} \\times \\frac{5}{4} = \\frac{10}{12} = \\frac{5}{6} \\in \\mathbb{Q}$ ✓.
- **Chia** (nhân với nghịch đảo): $\\frac{2}{3} \\div \\frac{5}{4} = \\frac{2}{3} \\times \\frac{4}{5} = \\frac{8}{15} \\in \\mathbb{Q}$ ✓.

Tổng quát: $\\frac{p_1}{q_1} + \\frac{p_2}{q_2} = \\frac{p_1 q_2 + p_2 q_1}{q_1 q_2}$ — vẫn là phân số. Nên $\\mathbb{Q}$ **đóng** dưới cả 4 phép (trừ chia cho 0). Vậy là đã đủ chưa? **Chưa.**

#### 3.3.2. √2 — số đầu tiên không hữu tỉ

Có những số **không** viết được dưới dạng $p/q$. Ví dụ kinh điển: **$\\sqrt{2}$** (đường chéo hình vuông cạnh 1: $c^2 = 1^2 + 1^2 = 2$).

💡 **Trực giác**: nếu $\\sqrt{2} = \\frac{p}{q}$ thì ta đo được đường chéo bằng đơn vị $\\frac{1}{q}$ — đúng $p$ đơn vị, không thừa không thiếu. Người Hy Lạp cổ (phái Pythagoras) tin "mọi đoạn thẳng đều chung một đơn vị đo đủ nhỏ". Khi Hippasus chứng minh không có đơn vị nào "vừa" cả cạnh 1 lẫn đường chéo, đó là cú sốc lớn cho toán học cổ đại.

**Chứng minh $\\sqrt{2}$ vô tỉ — phản chứng, từng bước** (Pythagoras ~500 TCN):

**Bước 1 — Giả thiết phản chứng.** Giả sử ngược lại: $\\sqrt{2} = \\frac{p}{q}$ với $p, q$ nguyên, $q \\neq 0$, và **đã tối giản** ($\\gcd(p,q) = 1$). *Vì sao đòi tối giản?* Vì nếu chưa, ta luôn rút gọn được — nên nếu $\\sqrt{2}$ hữu tỉ thì luôn có một biểu diễn tối giản. Giả thiết này khiến mâu thuẫn lộ ra ở Bước 5.

**Bước 2 — Bình phương hai vế.**

$$(\\sqrt{2})^2 = \\left(\\frac{p}{q}\\right)^2 \\Longrightarrow 2 = \\frac{p^2}{q^2} \\Longrightarrow p^2 = 2q^2 \\quad (*)$$

**Bước 3 — Suy ra $p$ chẵn.** Từ $(*)$, $p^2 = 2q^2$ chia hết cho 2 → $p^2$ chẵn.

*Bổ đề:* nếu $p^2$ chẵn thì $p$ chẵn. *Chứng minh (đối ngẫu):* giả sử $p$ lẻ, $p = 2m+1$. Khi đó $p^2 = (2m+1)^2 = 4m^2 + 4m + 1 = 2(2m^2 + 2m) + 1$ — số **lẻ**. Vậy $p$ lẻ $\\Rightarrow p^2$ lẻ; đảo lại, $p^2$ chẵn $\\Rightarrow p$ chẵn. □

Áp dụng: $p$ chẵn → tồn tại $k$ để $p = 2k$.

**Bước 4 — Suy ra $q$ chẵn.** Thay $p = 2k$ vào $(*)$:

$$2q^2 = (2k)^2 = 4k^2 \\Longrightarrow q^2 = 2k^2$$

Vế phải chia hết cho 2 → $q^2$ chẵn → (dùng lại bổ đề) → $q$ chẵn.

**Bước 5 — Mâu thuẫn.** Cả $p$ và $q$ đều chẵn → cả hai chia hết cho 2 → $\\gcd(p,q) \\geq 2$, **trái** giả thiết $\\gcd(p,q) = 1$.

**Bước 6 — Kết luận.** Giả thiết "$\\sqrt{2}$ hữu tỉ" dẫn tới mâu thuẫn → giả thiết sai → **$\\sqrt{2}$ vô tỉ**, tức $\\sqrt{2} \\in \\mathbb{R} \\setminus \\mathbb{Q}$. ∎

❓ **Câu hỏi tự nhiên của người đọc**

- *"Vì sao chứng minh trên KHÔNG hoạt động cho $\\sqrt{4}$?"* Vì $\\sqrt{4} = 2$ thật sự hữu tỉ. Nếu áp máy móc: $p^2 = 4q^2 \\Rightarrow p = 2k \\Rightarrow 4k^2 = 4q^2 \\Rightarrow k^2 = q^2$ — **không** suy ra $q$ chẵn → không có mâu thuẫn. Đúng như mong đợi.
- *"Áp dụng được cho số nào khác?"* Cho $\\sqrt{p}$ với mọi số nguyên tố $p$ (dùng "nếu $p \\mid a^2$ thì $p \\mid a$"). Tổng quát: $\\sqrt{n}$ hữu tỉ $\\iff n$ là số chính phương.

→ Trục số còn "lỗ" tại $\\sqrt{2}$, $\\pi$, $e$ → cần mở rộng nữa thành $\\mathbb{R}$.

⚠ **Lỗi thường gặp**

- **Nhầm "chia cho 0 = vô cùng".** Sai. $\\frac{5}{0}$ **không xác định** (undefined), không phải $\\infty$ — không có $x$ nào để $0 \\cdot x = 5$.
- **Nhầm $0$ không phải hữu tỉ.** Sai: $0 = \\frac{0}{1}$.
- **Nhầm "phân số tối giản là cách viết duy nhất".** Một hữu tỉ có vô hạn cách viết: $\\frac{1}{2} = \\frac{2}{4} = \\frac{3}{6} = \\ldots$; tối giản chỉ là cách **chính tắc**.

🔁 **Dừng lại tự kiểm tra**: $0.625$ có hữu tỉ không, viết $p/q$ tối giản? $\\frac{1}{11}$ thập phân ra gì?

<details><summary>Đáp án</summary>

$0.625 = \\frac{625}{1000} = \\frac{5}{8}$ (mẫu $8 = 2^3$ → dừng). $\\frac{1}{11} = 0.090909\\ldots$ — tuần hoàn "09", hữu tỉ.

</details>

### 📝 Tóm tắt mục 3

- $\\mathbb{Q} = \\{p/q : p,q \\in \\mathbb{Z}, q \\neq 0\\}$. Đặc trưng: thập phân **dừng** hoặc **tuần hoàn**.
- Dừng $\\iff$ mẫu tối giản $= 2^a 5^b$.
- $\\mathbb{Q}$ đóng dưới $+,-,\\times,\\div$ (trừ chia 0). $\\mathbb{Z} \\subset \\mathbb{Q}$.
- $\\sqrt{2}$ vô tỉ (chứng minh phản chứng) → $\\mathbb{Q}$ vẫn "thủng lỗ" → cần $\\mathbb{R}$.

---

## 4. $\\mathbb{R}$ — Tập số thực (Real)

### 4.1. Định nghĩa

**$\\mathbb{R}$** = mọi số trên **trục số liên tục**, gồm cả hữu tỉ và vô tỉ.

💡 **Là gì**: $\\mathbb{R}$ là tập số đầy đủ nhất ta dùng trong giải tích, vật lý — tương ứng với "độ dài liên tục".

**Vì sao tồn tại**: Để có thể nói về độ dài, vị trí, thời gian một cách **liên tục** (không bị "lỗ hổng" như $\\mathbb{Q}$).

### 4.2. Số vô tỉ phổ biến

- **$\\sqrt{2}$** $\\approx 1.41421356\\ldots$ (đường chéo hình vuông cạnh 1)
- **$\\sqrt{3}$** $\\approx 1.73205080\\ldots$, **$\\sqrt{5}$** $\\approx 2.23606797\\ldots$ (căn số không chính phương)
- **$\\pi$** $\\approx 3.14159265\\ldots$ (tỉ số chu vi / đường kính hình tròn)
- **$e$** $\\approx 2.71828182\\ldots$ (cơ số log tự nhiên)
- **$\\varphi = (1+\\sqrt{5})/2$** $\\approx 1.61803398\\ldots$ (tỉ lệ vàng)

**Đặc trưng quyết định**: phần thập phân **vô hạn và KHÔNG tuần hoàn**. Đến 2024 đã có người tính $\\pi$ đến hơn 200 nghìn tỷ chữ số — không có chu kỳ nào.

#### 4.2.1. Phân tầng: vô tỉ đại số vs siêu việt

Bên trong $\\mathbb{R} \\setminus \\mathbb{Q}$ còn chia tiếp:

- **Đại số (algebraic)**: là nghiệm của một đa thức hệ số nguyên. Vd $\\sqrt{2}$ là nghiệm của $x^2 - 2 = 0$; $\\sqrt[3]{5}$ là nghiệm của $x^3 - 5 = 0$; $\\varphi$ là nghiệm của $x^2 - x - 1 = 0$.
- **Siêu việt (transcendental)**: **không** là nghiệm của bất kỳ đa thức hệ số nguyên nào. $\\pi$ và $e$ là siêu việt — chứng minh khó hơn nhiều so với chỉ chứng minh chúng vô tỉ.

Hệ quả thực tế: $\\pi$ siêu việt → bài toán cổ "cầu phương hình tròn" (dựng hình vuông cùng diện tích hình tròn bằng compa-thước) là **bất khả thi**.

### 4.3. Bao hàm

$$\\mathbb{N} \\subset \\mathbb{Z} \\subset \\mathbb{Q} \\subset \\mathbb{R}$$

Mỗi tập sau bao gồm tập trước. $\\mathbb{R} \\setminus \\mathbb{Q}$ = tập các số vô tỉ.

**Sơ đồ Venn (ASCII)** — các tập lồng nhau như búp bê Nga, vô tỉ nằm trong $\\mathbb{R}$ nhưng ngoài $\\mathbb{Q}$:

\`\`\`
   +-----------------------------------------------+
   |  ℝ  (số thực)                                 |
   |   +-----------------------+   +------------+   |
   |   |  ℚ  (hữu tỉ)          |   |  ℝ\\ℚ       |   |
   |   |   +---------------+   |   |  (vô tỉ)   |   |
   |   |   |  ℤ (nguyên)   |   |   |            |   |
   |   |   |   +-------+   |   |   |  √2  π     |   |
   |   |   |   |  ℕ    |   |   |   |  e   √3    |   |
   |   |   |   | 0,1,2 |   |   |   |            |   |
   |   |   |   +-------+   |   |   |            |   |
   |   |   |   -1, -2      |   |   +------------+   |
   |   |   +---------------+   |                    |
   |   |   1/2, -3/4, 0.333…   |                    |
   |   +-----------------------+                    |
   +-----------------------------------------------+
\`\`\`

**Bảng so sánh nhanh** (ví dụ thuộc / không thuộc):

| Tập | Ký hiệu | Ví dụ thuộc | Ví dụ KHÔNG thuộc |
|-----|---------|-------------|-------------------|
| Tự nhiên | $\\mathbb{N}$ | $0, 1, 42, 1000$ | $-3, 0.5, \\sqrt{2}$ |
| Nguyên | $\\mathbb{Z}$ | $-5, 0, 42$ | $0.5, \\frac{1}{3}, \\pi$ |
| Hữu tỉ | $\\mathbb{Q}$ | $-5, 0.5, \\frac{1}{3}, \\frac{22}{7}$ | $\\sqrt{2}, \\pi, e$ |
| Vô tỉ | $\\mathbb{R}\\setminus\\mathbb{Q}$ | $\\sqrt{2}, \\pi, e, \\sqrt{3}+1$ | $0, 0.5, \\frac{22}{7}$ |
| Thực | $\\mathbb{R}$ | tất cả phía trên | số phức $i = \\sqrt{-1}$ |

**Mẹo phân loại nhanh một số**: (1) rút gọn trước — $\\sqrt{4} = 2 \\in \\mathbb{N}$, đừng nhìn dấu căn rồi vội xếp vô tỉ; (2) số nguyên không âm → $\\mathbb{N}$; (3) nguyên có dấu âm → $\\mathbb{Z}$; (4) phân số / thập phân dừng-hoặc-tuần-hoàn → $\\mathbb{Q}$; (5) thập phân vô hạn không tuần hoàn → vô tỉ.

### 4.4. Tính chất quan trọng

- **$\\mathbb{R}$ liên tục (dày đặc)**: giữa 2 số thực bất kỳ luôn có vô số số thực khác.
- **$\\mathbb{R}$ không đếm được**: số phần tử $\\mathbb{R}$ "lớn hơn" số phần tử $\\mathbb{N}$ (chứng minh đường chéo Cantor — sẽ học ở tầng cao hơn).

**Ví dụ "dày đặc" bằng số**: giữa $0.1$ và $0.2$ có $0.15$; giữa $0.1$ và $0.15$ có $0.125$; cứ thế lấy trung điểm mãi không hết → vô số số ở giữa.

⚠ **Lỗi thường gặp**: tưởng "vô tỉ = số rất lớn" hoặc "vô tỉ = số thập phân dài". Sai — vô tỉ nghĩa là **không viết được dưới dạng $p/q$**. $0.333\\ldots$ dài vô hạn nhưng vẫn **hữu tỉ** ($=1/3$); còn $\\pi$ mới là vô tỉ. Độ dài thập phân không quyết định, **tính lặp tuần hoàn** mới quyết định.

❓ **Câu hỏi tự nhiên của người đọc**

- *"$0.999\\ldots = 1$ thật à?"* Đúng, **bằng nhau** (không phải xấp xỉ). Vì $1/3 = 0.333\\ldots$, nhân 3: $1 = 0.999\\ldots$. Đây là 2 cách viết của cùng một số.
- *"Có 'nhiều' số vô tỉ hơn hữu tỉ không?"* Có — $\\mathbb{Q}$ đếm được còn $\\mathbb{R}$ thì không, nên số vô tỉ "nhiều hơn vô hạn lần". Hầu hết số thực là vô tỉ.

🔁 **Dừng lại tự kiểm tra**: $\\sqrt{4}$ là số gì (hữu tỉ hay vô tỉ)? Còn $\\sqrt{5}$?

<details><summary>Đáp án</summary>

$\\sqrt{4} = 2$ → **hữu tỉ** (số nguyên). $\\sqrt{5} \\approx 2.236\\ldots$ không viết được $p/q$ → **vô tỉ** (chứng minh tương tự $\\sqrt{2}$).

</details>

### 📝 Tóm tắt mục 1-4

| Tập | Định nghĩa | Mở rộng để có |
|-----|-----------|-----------------|
| $\\mathbb{N}$ | $\\{0, 1, 2, \\ldots\\}$ | Đếm |
| $\\mathbb{Z}$ | + số âm | Phép trừ |
| $\\mathbb{Q}$ | Phân số $p/q$ | Phép chia |
| $\\mathbb{R}$ | + số vô tỉ ($\\sqrt{2}$, $\\pi$, $e$) | Liên tục (giải tích) |

---

## 5. Trục số và giá trị tuyệt đối

### 5.1. Trục số (number line)

💡 **Trực giác**: trục số là **bản đồ 1 chiều của $\\mathbb{R}$** — mỗi số là một địa chỉ, mỗi địa chỉ ứng với đúng một số (tương ứng 1-1). Số nhỏ bên trái, số lớn bên phải.

\`\`\`
       -3   -2   -1    0    1    2    3
   ────┼────┼────┼────┼────┼────┼────┼────►
        ↑              ↑         ↑
      -3             gốc 0     x = 2
\`\`\`

**Định vị 4 số**: $-2.5$ nằm giữa $-3$ và $-2$; $\\frac{1}{3} \\approx 0.333$ giữa $0$ và $1$ (gần $0$); $\\sqrt{2} \\approx 1.414$ giữa $1$ và $2$; $\\pi \\approx 3.14$ giữa $3$ và $4$.

### 5.2. Thứ tự — <, >, ≤, ≥

| Ký hiệu | Đọc | Ví dụ |
|---------|-----|-------|
| $a < b$ | a nhỏ hơn b | $-3 < 1$ |
| $a > b$ | a lớn hơn b | $\\pi > 3$ |
| $a \\leq b$ | a nhỏ hơn hoặc bằng b | $x \\leq 5$ |
| $a \\geq b$ | a lớn hơn hoặc bằng b | $x \\geq 0$ (không âm) |

Mẹo: ký hiệu $<$ luôn "há miệng về phía số lớn". $3 < 5$: miệng há về 5.

**Walk-through so sánh** (4 ví dụ):
- $-2.7$ vs $-1.5$: $-2.7$ xa gốc về trái hơn → $-2.7 < -1.5$. ⚠ Bẫy: $2.7 > 1.5$ nhưng $-2.7 < -1.5$ — càng âm càng nhỏ.
- $\\frac{1}{3}$ vs $\\frac{2}{5}$: quy đồng $\\frac{5}{15}$ vs $\\frac{6}{15}$ → $\\frac{1}{3} < \\frac{2}{5}$.
- $\\sqrt{3}$ vs $\\sqrt{5}$: căn đơn điệu tăng, $3 < 5 \\Rightarrow \\sqrt{3} < \\sqrt{5}$.
- $\\pi$ vs $\\sqrt{10}$: $\\pi^2 \\approx 9.87 < 10 = (\\sqrt{10})^2$ → $\\pi < \\sqrt{10}$.

⚠ **Lỗi #1 khi giải bất phương trình**: nhân/chia hai vế với số **âm** phải **đổi chiều**. $-2x < 6 \\Rightarrow x > -3$ (KHÔNG phải $x < -3$). Kiểm tra $x = 0$: $-2\\cdot 0 = 0 < 6$ ✓, và $0 > -3$ ✓.

### 5.3. Giá trị tuyệt đối |x|

💡 **Trực giác — khoảng cách tới 0**: đứng tại vị trí $x$ trên trục số, hỏi "cách gốc 0 bao xa?" Câu trả lời là $\\lvert x \\rvert$. Khoảng cách không bao giờ âm → $\\lvert x \\rvert \\geq 0$ luôn.

\`\`\`
        |−3| = 3            |2| = 2
       ←──────────┤    ├──────────►
       -3   -2   -1   0   1    2
\`\`\`

Cả $-3$ và $3$ cách 0 đúng 3 đơn vị → $\\lvert -3 \\rvert = \\lvert 3 \\rvert = 3$.

**Định nghĩa hình thức** (hàm từng khúc):

$$\\lvert x \\rvert = \\begin{cases} x & \\text{nếu } x \\geq 0 \\\\ -x & \\text{nếu } x < 0 \\end{cases}$$

Nhiều người gọi $\\lvert x \\rvert$ là "bỏ dấu trừ" — đúng, nhưng cách hiểu **khoảng cách** đẹp hơn vì mở rộng được sang vector ($\\lVert v \\rVert$ = khoảng cách tới gốc trong $\\mathbb{R}^n$).

**Bốn (và hơn) ví dụ tính tay** — luôn tính bên trong $\\lvert\\ \\rvert$ trước:

| Biểu thức | Bước tính | Kết quả |
|-----------|-----------|---------|
| $\\lvert -7 \\rvert$ | $-7 < 0 \\to -(-7)$ | $7$ |
| $\\lvert 3 \\rvert$ | $3 \\geq 0$ | $3$ |
| $\\lvert 0 \\rvert$ | $0 \\geq 0$ | $0$ |
| $\\lvert 3 - 8 \\rvert$ | trong: $-5$, rồi $\\lvert -5 \\rvert$ | $5$ |
| $\\lvert -2 + 5 \\rvert$ | trong: $3$, rồi $\\lvert 3 \\rvert$ | $3$ |

**Khoảng cách giữa hai số**: $\\text{kc}(a,b) = \\lvert a - b \\rvert = \\lvert b - a \\rvert$. Vd $\\lvert 3 - 7 \\rvert = 4 = \\lvert 7 - 3 \\rvert$.

#### 5.3.1. Bốn tính chất (cần thuộc)

- $\\lvert x \\rvert \\geq 0$, và $\\lvert x \\rvert = 0 \\iff x = 0$.
- $\\lvert -x \\rvert = \\lvert x \\rvert$ (vd $\\lvert -5 \\rvert = 5 = \\lvert 5 \\rvert$).
- $\\lvert xy \\rvert = \\lvert x \\rvert \\cdot \\lvert y \\rvert$ (vd $\\lvert (-3)\\cdot 4 \\rvert = 12 = 3 \\cdot 4$).
- $\\lvert x + y \\rvert \\leq \\lvert x \\rvert + \\lvert y \\rvert$ — **bất đẳng thức tam giác**.

Walk-through bất đẳng thức tam giác:
- Cùng dấu: $\\lvert 3 + 4 \\rvert = 7 = \\lvert 3 \\rvert + \\lvert 4 \\rvert$ → **bằng**.
- Khác dấu: $\\lvert 3 + (-4) \\rvert = 1 < 3 + 4 = 7$ → **nhỏ hơn thực sự** (ngược chiều triệt tiêu một phần).

⚠ **Lỗi thường gặp**

- **Tưởng $\\lvert x - y \\rvert = \\lvert x \\rvert - \\lvert y \\rvert$.** Sai hẳn: $\\lvert 3 - 5 \\rvert = 2$ nhưng $\\lvert 3 \\rvert - \\lvert 5 \\rvert = -2$. $\\lvert\\cdot\\rvert$ **không** phân phối qua $+$, $-$ (chỉ có $\\leq$ tam giác).
- **Tưởng $\\lvert -3 \\rvert = -3$.** Giá trị tuyệt đối luôn $\\geq 0$.

❓ **Câu hỏi tự nhiên của người đọc**

- *"Quan hệ với $\\sqrt{x^2}$?"* $\\lvert x \\rvert = \\sqrt{x^2}$ (căn quy ước trả về giá trị không âm). Vd $\\sqrt{(-3)^2} = \\sqrt{9} = 3 = \\lvert -3 \\rvert$.
- *"$\\lvert \\cdot \\rvert$ trong code Go?"* Dùng \`math.Abs(x)\` cho \`float64\`; với \`int\` viết tay \`if x < 0 { x = -x }\`.

🔁 **Dừng lại tự kiểm tra**: bất đẳng thức $\\lvert x - 5 \\rvert < 2$ mô tả tập số nào?

<details><summary>Đáp án</summary>

"Khoảng cách từ $x$ tới $5$ nhỏ hơn 2" → $3 < x < 7$, tức khoảng $(3, 7)$.

</details>

### 📝 Tóm tắt mục 5

- Trục số: ánh xạ 1-1 với $\\mathbb{R}$; số nhỏ bên trái.
- Bất phương trình: nhân/chia số âm → **đổi chiều**.
- $\\lvert x \\rvert$ = khoảng cách tới 0, luôn $\\geq 0$; $\\lvert x \\rvert = \\sqrt{x^2}$.
- 4 tính chất, đỉnh là bất đẳng thức tam giác $\\lvert x+y \\rvert \\leq \\lvert x \\rvert + \\lvert y \\rvert$.

---

## 6. Chia hết, số nguyên tố, GCD & LCM

Đây là số học của riêng $\\mathbb{Z}$ (và $\\mathbb{N}$) — nền tảng cho rút gọn phân số, mã hóa (RSA), và nhiều thuật toán.

### 6.1. Chia hết (divisibility)

💡 **Là gì**: nói "$a$ chia hết cho $b$" (viết $b \\mid a$) nghĩa là tồn tại số nguyên $k$ sao cho $a = b \\cdot k$ — chia **không dư**. Vd $12 = 3 \\times 4$ nên $3 \\mid 12$.

**Bốn ví dụ**: $3 \\mid 12$ ($12 = 3\\cdot 4$) ✓; $5 \\mid 35$ ✓; $4 \\nmid 14$ ($14 = 4\\cdot 3 + 2$, dư 2) ✗; $7 \\mid 0$ ✓ (mọi số đều chia hết 0, vì $0 = 7\\cdot 0$).

**Dấu hiệu chia hết hay dùng**: chia hết 2 (chữ số cuối chẵn), 3 (tổng các chữ số chia hết 3), 5 (cuối là 0 hoặc 5), 9 (tổng chữ số chia hết 9). Vd $171$: $1+7+1 = 9$ chia hết 9 → $171 = 9 \\times 19$ ✓.

### 6.2. Số nguyên tố (prime)

💡 **Là gì**: số nguyên tố là số tự nhiên $> 1$ chỉ chia hết cho $1$ và chính nó. Vd $2, 3, 5, 7, 11, 13, \\ldots$ Số $> 1$ không nguyên tố gọi là **hợp số** (composite): $4 = 2\\cdot 2$, $6 = 2\\cdot 3$, $9 = 3\\cdot 3$.

⚠ **Lỗi thường gặp**: tưởng $1$ là số nguyên tố. **Không** — theo định nghĩa số nguyên tố phải $> 1$. ($1$ bị loại để **phân tích thừa số nguyên tố là duy nhất**: nếu $1$ là nguyên tố thì $6 = 2\\cdot 3 = 1\\cdot 2\\cdot 3 = 1\\cdot 1\\cdot 2\\cdot 3$, không còn duy nhất.) Cũng lưu ý: $2$ là số nguyên tố **chẵn duy nhất**.

**Phân tích thừa số nguyên tố** (định lý cơ bản của số học — mọi số $>1$ viết duy nhất thành tích nguyên tố):
- $360 = 2^3 \\times 3^2 \\times 5$. Walk-through: $360 = 2\\cdot 180 = 2\\cdot 2\\cdot 90 = 2\\cdot 2\\cdot 2\\cdot 45 = 2^3 \\cdot 9 \\cdot 5 = 2^3 \\cdot 3^2 \\cdot 5$.
- $84 = 2^2 \\times 3 \\times 7$; $100 = 2^2 \\times 5^2$; $17 = 17$ (đã là nguyên tố).

❓ **Câu hỏi tự nhiên của người đọc**: *"Có hữu hạn số nguyên tố không?"* Không — Euclid chứng minh có **vô hạn** số nguyên tố (phản chứng: nếu chỉ có hữu hạn $p_1,\\ldots,p_n$, xét $N = p_1\\cdots p_n + 1$; $N$ không chia hết cho bất kỳ $p_i$ nào → hoặc $N$ nguyên tố mới, hoặc có ước nguyên tố mới → mâu thuẫn).

### 6.3. GCD — ước chung lớn nhất

💡 **Là gì**: $\\gcd(a, b)$ (greatest common divisor) là số lớn nhất chia hết **cả** $a$ và $b$. Dùng để **rút gọn phân số**.

**Cách 1 — qua thừa số nguyên tố** (lấy thừa số chung, mũ nhỏ nhất):
$$12 = 2^2 \\cdot 3, \\quad 18 = 2 \\cdot 3^2 \\;\\Rightarrow\\; \\gcd(12,18) = 2^1 \\cdot 3^1 = 6.$$

**Cách 2 — thuật toán Euclid** (nhanh, dùng trong code) — lặp "lấy dư" cho tới khi dư 0:

$$\\begin{aligned}
\\gcd(48, 18): \\quad 48 &= 2 \\times 18 + 12 \\\\
18 &= 1 \\times 12 + 6 \\\\
12 &= 2 \\times 6 + 0 \\;\\;\\to\\; \\gcd = 6.
\\end{aligned}$$

Dư cuối khác 0 trước khi ra 0 chính là GCD. Walk-through thêm: $\\gcd(35, 14)$: $35 = 2\\cdot 14 + 7$; $14 = 2\\cdot 7 + 0$ → $\\gcd = 7$.

**Ứng dụng rút gọn phân số**: $\\frac{48}{18} = \\frac{48/6}{18/6} = \\frac{8}{3}$.

### 6.4. LCM — bội chung nhỏ nhất

💡 **Là gì**: $\\text{lcm}(a,b)$ (least common multiple) là số nhỏ nhất là bội của **cả** $a$ và $b$. Dùng để **quy đồng mẫu số**.

**Công thức vàng** (liên hệ với GCD):
$$\\text{lcm}(a, b) = \\frac{a \\times b}{\\gcd(a, b)}.$$

Walk-through: $\\text{lcm}(12, 18) = \\frac{12 \\times 18}{\\gcd(12,18)} = \\frac{216}{6} = 36$. Kiểm tra: $36 = 3\\times 12 = 2\\times 18$ ✓.

Bốn ví dụ: $\\text{lcm}(4,6) = \\frac{24}{2} = 12$; $\\text{lcm}(5,7) = \\frac{35}{1} = 35$ (nguyên tố cùng nhau); $\\text{lcm}(8,12) = \\frac{96}{4} = 24$; $\\text{lcm}(9,6) = \\frac{54}{3} = 18$.

**Ứng dụng quy đồng**: cộng $\\frac{1}{12} + \\frac{1}{18}$, mẫu chung là $\\text{lcm} = 36$: $\\frac{3}{36} + \\frac{2}{36} = \\frac{5}{36}$.

🔁 **Dừng lại tự kiểm tra**: tính $\\gcd(24, 36)$ và $\\text{lcm}(24, 36)$.

<details><summary>Đáp án</summary>

Euclid: $36 = 1\\cdot 24 + 12$; $24 = 2\\cdot 12 + 0 \\to \\gcd = 12$. $\\text{lcm} = \\frac{24\\cdot 36}{12} = \\frac{864}{12} = 72$.

</details>

### 📝 Tóm tắt mục 6

- $b \\mid a$: $a = b\\cdot k$ với $k$ nguyên (chia không dư).
- Số nguyên tố: $> 1$, chỉ chia hết 1 và chính nó; $1$ **không** nguyên tố; $2$ là nguyên tố chẵn duy nhất.
- $\\gcd$: số chung lớn nhất → rút gọn phân số (Euclid: lặp lấy dư).
- $\\text{lcm}(a,b) = \\frac{a\\cdot b}{\\gcd(a,b)}$ → quy đồng mẫu.

---

## 7. Preview — số phức (mở rộng ngoài ℝ)

💡 Câu chuyện mở rộng chưa dừng ở $\\mathbb{R}$. $\\mathbb{R}$ đóng dưới $+,-,\\times,\\div$ và lấy căn số **dương**, nhưng KHÔNG đóng dưới căn số **âm**: $\\sqrt{-1}$ không có nghiệm thực (mọi số thực bình phương ra $\\geq 0$). Để giải $x^2 = -1$, ta phát minh đơn vị ảo $i$ với $i^2 = -1$.

**Số phức** (complex) $\\mathbb{C} = \\{a + bi : a, b \\in \\mathbb{R}\\}$ — chứa $\\mathbb{R}$ (lấy $b = 0$). Vd $3 + 2i$, $-1 + i$, $5 = 5 + 0i$. Đây là tập số rộng hơn $\\mathbb{R}$:

$$\\mathbb{N} \\subset \\mathbb{Z} \\subset \\mathbb{Q} \\subset \\mathbb{R} \\subset \\mathbb{C}$$

⚠ **Lỗi thường gặp**: nhầm "vô tỉ" với "ảo/phức". $\\sqrt{2}$ là số **thực** (vô tỉ, nằm trên trục số). $\\sqrt{-2} = \\sqrt{2}\\,i$ mới là số phức (ngoài trục số thực). Tiếng Anh: *irrational* (vô tỉ) $\\neq$ *imaginary* (ảo).

Lesson này không đi sâu $\\mathbb{C}$ — chỉ cần biết "còn tập lớn hơn $\\mathbb{R}$" để khỏi tưởng $\\mathbb{R}$ là tận cùng. Số phức sẽ gặp lại khi học lượng giác và biến đổi Fourier.

---

## 8. Sai số float trong máy tính

### 8.1. Máy tính dùng nhị phân

Máy tính lưu số ở dạng **nhị phân** (cơ số 2). Một số hữu tỉ thập phân hoàn hảo (vd 0.1) lại là số "lặp vô hạn" trong nhị phân:
- 0.1 (thập phân) = 0.000110011001100... (nhị phân, lặp vô hạn).

Vì máy tính chỉ có hữu hạn bit (64-bit double) → bị **làm tròn** → mất chính xác.

**Vì sao $0.1$ lặp trong nhị phân?** Vì $0.1 = \\frac{1}{10}$ và $10 = 2 \\times 5$ — thừa số $5$ trong mẫu khiến biểu diễn nhị phân tuần hoàn (giống §3.2.1: hệ 2 chỉ "hợp" với lũy thừa của 2). Walk-through "nhân 2 lấy phần nguyên":

| Bước | $\\times 2$ | Bit | Còn lại |
|------|-----------|-----|---------|
| 1 | $0.1 \\to 0.2$ | $0$ | $0.2$ |
| 2 | $0.2 \\to 0.4$ | $0$ | $0.4$ |
| 3 | $0.4 \\to 0.8$ | $0$ | $0.8$ |
| 4 | $0.8 \\to 1.6$ | $1$ | $0.6$ |
| 5 | $0.6 \\to 1.2$ | $1$ | $0.2$ ← lặp lại! |

Sau bước 5 quay về $0.2$ → chu kỳ "0011" lặp vô hạn: $0.1_{10} = 0.0001100110011\\ldots_2$. \`float64\` chỉ có 52 bit mantissa → phải cắt → sai số $\\approx 10^{-17}$.

### 8.2. Hệ quả nổi tiếng

Trong mọi ngôn ngữ lập trình (Python, JavaScript, Go...):
\`\`\`python
0.1 + 0.2 == 0.3   # False!
0.1 + 0.2          # 0.30000000000000004
\`\`\`

### 8.3. Ý nghĩa và cách so sánh đúng

Khi tính toán số thực trên máy, **luôn có sai số nhỏ**. Đây là lý do:
- So sánh hai số thực dùng \`abs(a - b) < epsilon\` thay vì \`a == b\`.
- Trong ML/AI: thuật toán cần ổn định với sai số float (robust).

\`\`\`go
func almostEqual(a, b, eps float64) bool {
    diff := a - b
    if diff < 0 { diff = -diff }
    return diff < eps          // eps thường 1e-9
}
// almostEqual(0.1+0.2, 0.3, 1e-9) == true
\`\`\`

⚠ **Lỗi nghiêm trọng**: **không bao giờ lưu tiền tệ bằng float**. $0.1 + 0.2 \\neq 0.3$ nghĩa là "1 hào + 2 hào ≠ 3 hào" trong code. Tiền tệ dùng số nguyên (đơn vị nhỏ nhất, vd xu) hoặc decimal type.

❓ **Câu hỏi tự nhiên của người đọc**: *"Số nào trong float là chính xác?"* Số viết được dạng $m \\times 2^e$ ($m, e$ nguyên, $m$ vừa 53 bit): $0.5 = 2^{-1}$, $0.25 = 2^{-2}$, $0.75 = 3\\cdot 2^{-2}$ đều chính xác. $0.1, 0.2, 0.3, \\frac{1}{3}$ thì không.

🔁 **Dừng lại tự kiểm tra**: \`0.5 + 0.25 == 0.75\` trả về gì trong Go? \`0.1 + 0.1 + 0.1 == 0.3\`?

<details><summary>Đáp án</summary>

\`true\` (cả ba đều là phân số mẫu lũy thừa của 2 → chính xác). \`false\` ($0.1$ không chính xác → cộng ra $0.30000000000000004 \\neq 0.3$).

</details>

### 📝 Tóm tắt mục 8

- Máy tính lưu số dạng nhị phân hữu hạn bit → không lưu được 0.1 chính xác (lặp "0011").
- $0.1 + 0.2 \\neq 0.3$ trong mọi ngôn ngữ dùng IEEE 754.
- So sánh float bằng \`almostEqual(a, b, eps)\`, KHÔNG dùng \`==\`.
- Tiền tệ KHÔNG dùng float — dùng integer hoặc decimal.

---

## 9. Bài tập

### Bài tập

**Bài 1**: Số nào thuộc tập nào: $-3$, $0$, $0.5$, $\\sqrt{2}$, $\\pi$, $22/7$, $0.333\\ldots$ (lặp)?

**Bài 2**: Là gì khác nhau giữa $22/7$ và $\\pi$?

**Bài 3**: Chứng minh $\\sqrt{3}$ cũng là số vô tỉ (theo Pythagoras).

**Bài 4**: Tính \`(0.1 + 0.2) - 0.3\` trong Python. Vì sao không bằng 0?

**Bài 5**: Sắp xếp từ tập nhỏ nhất tới lớn nhất: $\\mathbb{R}$, $\\mathbb{N}$, $\\mathbb{Z}$, $\\mathbb{Q}$.

**Bài 6**: Tính $\\lvert -7 \\rvert$, $\\lvert 3 - 8 \\rvert$, $\\lvert -4 \\rvert \\cdot \\lvert -2 \\rvert$, $\\lvert \\lvert -5 \\rvert - \\lvert 3 \\rvert \\rvert$.

**Bài 7**: Đổi $0.36$ và $0.4444\\ldots$ sang phân số tối giản.

**Bài 8**: Tính $\\gcd(60, 48)$ (dùng Euclid) và $\\text{lcm}(60, 48)$. Rồi rút gọn $\\frac{60}{48}$.

**Bài 9**: Phân tích $\\sqrt{-9}$: nó thuộc tập số nào? Viết theo $i$.

### Lời giải

**Bài 1**:
- **$-3$**: $\\mathbb{Z}$ (cũng thuộc $\\mathbb{Q}$, $\\mathbb{R}$; KHÔNG thuộc $\\mathbb{N}$).
- **$0$**: $\\mathbb{N}$, $\\mathbb{Z}$, $\\mathbb{Q}$, $\\mathbb{R}$.
- **$0.5 = 1/2$**: $\\mathbb{Q}$, $\\mathbb{R}$. KHÔNG $\\mathbb{N}$, $\\mathbb{Z}$.
- **$\\sqrt{2}$**: chỉ $\\mathbb{R}$ (vô tỉ).
- **$\\pi$**: chỉ $\\mathbb{R}$ (vô tỉ).
- **$22/7$**: $\\mathbb{Q}$, $\\mathbb{R}$.
- **$0.333\\ldots$ (lặp)**: $\\mathbb{Q}$ ($= 1/3$), $\\mathbb{R}$.

**Bài 2**: $22/7$ là số HỮU TỈ, viết được dưới dạng phân số. $\\pi$ là số VÔ TỈ, không viết được. $22/7 \\approx 3.142857$ — chỉ là **xấp xỉ** cho $\\pi$. Hai số khác nhau.

**Bài 3**: Tương tự $\\sqrt{2}$:
- Giả sử $\\sqrt{3} = p/q$ (đã rút gọn). Bình phương: $3 = p^2/q^2$ → $p^2 = 3q^2$.
- $p^2$ chia hết cho 3 → $p$ chia hết cho 3. Đặt $p = 3k$.
- $9k^2 = 3q^2$ → $q^2 = 3k^2$ → $q$ chia hết cho 3.
- Cả $p$ và $q$ chia hết cho 3 → trái giả thiết. Mâu thuẫn. → $\\sqrt{3}$ vô tỉ.

**Bài 4**: Kết quả $\\approx 5.55 \\times 10^{-17}$. Lý do: 0.1 và 0.2 đều bị làm tròn khi lưu trong nhị phân → kết quả phép cộng bị sai số nhỏ.

**Bài 5**: **$\\mathbb{N} \\subset \\mathbb{Z} \\subset \\mathbb{Q} \\subset \\mathbb{R}$**.

**Bài 6**: Tính bên trong $\\lvert\\ \\rvert$ trước.
- $\\lvert -7 \\rvert = 7$.
- $\\lvert 3 - 8 \\rvert = \\lvert -5 \\rvert = 5$.
- $\\lvert -4 \\rvert \\cdot \\lvert -2 \\rvert = 4 \\cdot 2 = 8$.
- $\\lvert \\lvert -5 \\rvert - \\lvert 3 \\rvert \\rvert = \\lvert 5 - 3 \\rvert = \\lvert 2 \\rvert = 2$ (dấu lồng nhau, tính từ trong ra).

**Bài 7**:
- $0.36 = \\frac{36}{100} = \\frac{9}{25}$ (chia cả hai cho 4). Mẫu $25 = 5^2$ → khớp (thập phân dừng).
- $0.4444\\ldots$: đặt $x = 0.444\\ldots$, $10x = 4.444\\ldots$, trừ: $9x = 4 \\Rightarrow x = \\frac{4}{9}$.

**Bài 8**: Euclid: $60 = 1\\cdot 48 + 12$; $48 = 4\\cdot 12 + 0 \\to \\gcd(60,48) = 12$. $\\text{lcm} = \\frac{60\\cdot 48}{12} = \\frac{2880}{12} = 240$. Rút gọn $\\frac{60}{48} = \\frac{60/12}{48/12} = \\frac{5}{4}$.

**Bài 9**: $\\sqrt{-9}$ **không** thuộc $\\mathbb{R}$ (không số thực nào bình phương ra số âm). Nó là số **phức**: $\\sqrt{-9} = \\sqrt{9}\\cdot\\sqrt{-1} = 3i$. Thuộc $\\mathbb{C}$, ngoài trục số thực. ⚠ Đừng nhầm với vô tỉ — vô tỉ vẫn là số thực.

---

## 10. Bài tiếp theo

[Lesson 02 — Biểu thức đại số](../lesson-02-algebraic-expressions/).

## 📝 Tổng kết

1. **$\\mathbb{N}$** đếm; mở rộng **$\\mathbb{Z}$** (số âm cho trừ); **$\\mathbb{Q}$** (phân số cho chia); **$\\mathbb{R}$** (số vô tỉ cho liên tục); **$\\mathbb{C}$** (số ảo cho căn âm).
2. **Tính đóng** là động cơ mở rộng: mỗi tập ra đời để vá phép toán mà tập trước không đóng.
3. **Số vô tỉ**: $\\sqrt{2}$, $\\pi$, $e$, $\\varphi$ — không viết được $p/q$; phân tầng đại số vs siêu việt.
4. **Số hữu tỉ**: thập phân hữu hạn (mẫu $2^a 5^b$) hoặc lặp vô hạn tuần hoàn; đổi hai chiều phân số ↔ thập phân.
5. **Trục số & $\\lvert x \\rvert$**: $\\lvert x \\rvert$ = khoảng cách tới 0; bất đẳng thức tam giác; nhân số âm đổi chiều bất phương trình.
6. **Số học $\\mathbb{Z}$**: chia hết, số nguyên tố, $\\gcd$ (Euclid, rút gọn phân số), $\\text{lcm} = \\frac{ab}{\\gcd}$ (quy đồng).
7. **Máy tính**: không lưu chính xác số thập phân → sai số float; so sánh bằng \`almostEqual\`, không \`==\`.
`;
