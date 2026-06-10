// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: Vectors/01-Algebra/lesson-01-numbers/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 01 — Số và trục số

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Phân biệt được năm tập số quen thuộc — $\\mathbb{N}$ (tự nhiên), $\\mathbb{Z}$ (nguyên), $\\mathbb{Q}$ (hữu tỉ), $\\mathbb{R}$ (thực), và $\\mathbb{R} \\setminus \\mathbb{Q}$ (vô tỉ) — biết tập nào nằm trong tập nào và khi nào dùng tập nào.
- Biết biểu diễn một số trên **trục số**, đọc thứ tự ($<$, $>$, $=$, $\\leq$, $\\geq$), số đối, số nghịch đảo.
- Hiểu **giá trị tuyệt đối** $\\lvert x \\rvert$ theo nghĩa hình học (khoảng cách tới 0), không chỉ "bỏ dấu trừ".
- Biết vì sao $\\sqrt{2}$, $\\pi$, $e$ là vô tỉ, và cảm nhận được "vô tỉ" nghĩa là gì (không viết được dưới dạng phân số $p/q$).
- Hiểu vì sao trong máy tính $0.1 + 0.2 \\neq 0.3$, và hệ quả của điều này khi làm ML/AI (mọi tính toán đều có sai số).
- Liên hệ được "số thực" với các tầng sau: vector là một danh sách các số thực, embedding là điểm trong không gian $\\mathbb{R}^n$.

## Kiến thức tiền đề

Không có. Bạn chỉ cần biết cộng, trừ, nhân, chia ở mức tiểu học. Nếu đã quen với một ngôn ngữ lập trình (đặc biệt là Go) thì phần "máy tính và số thực" sẽ dễ vào hơn.

## 1. Các loại số — ℕ, ℤ, ℚ, ℝ

Toán học "phân loại" các số theo cách bạn xây dựng nó: bắt đầu từ những số đơn giản nhất (đếm), rồi mỗi lần gặp một phép tính cho kết quả "không thuộc tập hiện tại", ta phải **mở rộng** tập đó. Năm tập dưới đây chính là 5 lần mở rộng liên tiếp.

### 1.1. ℕ — số tự nhiên (natural numbers)

$$\\mathbb{N} = \\{0, 1, 2, 3, 4, 5, 6, \\ldots\\}$$

Số ta dùng để **đếm**: 0 con mèo, 3 quả táo, 42 dòng code. Một số sách định nghĩa $\\mathbb{N}$ bắt đầu từ $1$, một số bắt đầu từ $0$ — trong tài liệu này dùng quy ước **bao gồm 0** (giống Go: chỉ số mảng bắt đầu từ 0).

#### 💡 Trực giác / Hình dung

Hãy hình dung bạn đứng ở **vạch xuất phát** của một đường chạy có các mốc cách đều: 0, 1, 2, 3, ... Mỗi lần đếm một vật, bạn nhảy sang mốc tiếp theo. $\\mathbb{N}$ là **danh sách các mốc bạn có thể dừng lại được nếu chỉ biết "đi tiếp"** — chưa biết "đi lùi" (số âm), chưa biết "dừng giữa hai mốc" (số thập phân). Đây là tập số nguyên thủy nhất, dùng để **đếm**, không phải để **đo**.

#### Bốn đặc trưng cốt lõi của ℕ

1. Có **phần tử nhỏ nhất** là $0$ (theo quy ước của tài liệu này).
2. **Không có phần tử lớn nhất** — với mọi $n \\in \\mathbb{N}$, vẫn còn $n + 1 \\in \\mathbb{N}$.
3. Mỗi phần tử có **phần tử kế tiếp duy nhất** ($n \\to n+1$). Đây là cơ sở cho định nghĩa hình thức của $\\mathbb{N}$ qua tiên đề Peano.
4. $\\mathbb{N}$ là **rời rạc** (discrete): giữa hai số tự nhiên liền kề không có số tự nhiên nào khác. Trái ngược hoàn toàn với $\\mathbb{R}$ (dày đặc) mà ta sẽ gặp ở §1.5.

#### Tính đóng (closure) — ý nghĩa và ví dụ

$\\mathbb{N}$ **đóng** dưới phép cộng và nhân: cộng hai số tự nhiên ra số tự nhiên, nhân cũng vậy. Nhưng phép trừ có thể "thoát" khỏi $\\mathbb{N}$: $3 - 5 = -2$ không thuộc $\\mathbb{N}$. Để chứa được trừ, ta cần mở rộng.

"Đóng dưới phép X" nghĩa là: lấy bất kỳ phần tử nào của tập, áp dụng phép X, kết quả vẫn ở trong tập. Walk-through cụ thể với $\\mathbb{N}$:

- **Cộng**: $3 + 7 = 10 \\in \\mathbb{N}$ ✓ ; $0 + 5 = 5 \\in \\mathbb{N}$ ✓ ; $100 + 200 = 300 \\in \\mathbb{N}$ ✓ ; $0 + 0 = 0 \\in \\mathbb{N}$ ✓ → $\\mathbb{N}$ đóng dưới cộng.
- **Nhân**: $3 \\times 4 = 12 \\in \\mathbb{N}$ ✓ ; $0 \\times 999 = 0 \\in \\mathbb{N}$ ✓ ; $7 \\times 1 = 7 \\in \\mathbb{N}$ ✓ → $\\mathbb{N}$ đóng dưới nhân.
- **Trừ**: $5 - 3 = 2 \\in \\mathbb{N}$ ✓ , nhưng $3 - 5 = -2 \\notin \\mathbb{N}$ ✗ → **không đóng**. Chỉ cần MỘT phản ví dụ là đủ để khẳng định tập không đóng dưới phép đó.
- **Chia**: $6 \\div 2 = 3 \\in \\mathbb{N}$ ✓ , nhưng $6 \\div 4 = 1.5 \\notin \\mathbb{N}$ ✗ → **không đóng**.

#### ⚠ Lỗi thường gặp

- **Nhầm $0 \\notin \\mathbb{N}$**: Trong nhiều sách Pháp / Bourbaki / Việt Nam phổ thông cũ, $\\mathbb{N} = \\{1, 2, 3, \\ldots\\}$ và có ký hiệu riêng $\\mathbb{N}^*$ cho $\\{1, 2, \\ldots\\}$. Trong CS / ML hiện đại (và tài liệu này), $0 \\in \\mathbb{N}$. Khi đọc tài liệu, luôn kiểm tra quy ước của tác giả.
- **Nhầm "đếm được" với "tự nhiên"**: $\\mathbb{Q}$ cũng đếm được (chứng minh bằng cách của Cantor) nhưng không phải số tự nhiên. "Đếm được" là khái niệm về **lực lượng** (cardinality), không phải về dạng số.
- **Coi $-0$ là số khác $0$**: $-0 = 0$ trong toán học. (Trong float IEEE 754 thì $+0$ và $-0$ có bit pattern khác nhau, nhưng \`+0 == −0\` trả về \`true\`.)

#### ❓ Câu hỏi tự nhiên của người đọc

**Q: Vì sao phải bao gồm $0$?** Vì $0$ đại diện cho "không có gì" — một trạng thái hợp lệ khi đếm. "Có bao nhiêu lỗi trong code?" Câu trả lời $0$ phải là một câu trả lời hợp lệ. Trong CS, chỉ số mảng \`arr[0]\` cũng cần $0$. Lịch sử: người Ấn Độ phát hiện số 0 vào thế kỷ thứ 5 — trước đó toán học La Mã không có $0$, viết số rất khổ.

**Q: ℕ có vô hạn không?** Có, vô hạn đếm được (countably infinite). Lực lượng (cardinality) của $\\mathbb{N}$ ký hiệu là $\\aleph_0$ (aleph-không). Sau này khi gặp $\\mathbb{R}$, ta sẽ thấy $\\mathbb{R}$ "vô hạn nhiều hơn" $\\mathbb{N}$ — đây là kết quả nổi tiếng của Cantor.

#### 🔁 Dừng lại tự kiểm tra

1. Trong các số sau, số nào thuộc $\\mathbb{N}$: $7$, $-2$, $0$, $3.14$, $\\sqrt{9}$, $0.5$?
2. $\\mathbb{N}$ có đóng dưới phép lũy thừa $a^b$ không?

<details>
<summary>Đáp án</summary>

1. $7 \\in \\mathbb{N}$, $0 \\in \\mathbb{N}$, $\\sqrt{9} = 3 \\in \\mathbb{N}$. $-2 \\notin \\mathbb{N}$ (âm), $3.14 \\notin \\mathbb{N}$ (thập phân), $0.5 \\notin \\mathbb{N}$.
2. Có (với quy ước $0^0 = 1$): với mọi $a, b \\in \\mathbb{N}$, $a^b \\in \\mathbb{N}$. Vd $2^3 = 8$, $5^0 = 1$, $0^5 = 0$.
</details>

#### 📝 Tóm tắt mục 1.1

- $\\mathbb{N} = \\{0, 1, 2, 3, \\ldots\\}$ (quy ước tài liệu này, có 0).
- Đóng dưới $+$, $\\times$; KHÔNG đóng dưới $-$, $\\div$.
- Rời rạc (không có số giữa hai số liền kề).
- Đếm được vô hạn ($\\aleph_0$).

### 1.2. ℤ — số nguyên (integers)

$$\\mathbb{Z} = \\{\\ldots, -3, -2, -1, 0, 1, 2, 3, \\ldots\\}$$

#### 💡 Trực giác / Hình dung

$\\mathbb{N}$ là đường chạy chỉ có thể "đi tiếp". $\\mathbb{Z}$ là đường chạy **có thể đi LÙI** — bạn vượt qua vạch xuất phát rồi tiếp tục về phía âm. Đời thực: nhiệt độ ($-5°C$), số dư tài khoản ($-500.000$ đ), độ cao so với mực nước biển ($-10$m cho đáy sông), điểm số (mất 3 điểm $= -3$). Bất cứ khi nào có khái niệm "thiếu hụt" hoặc "ngược hướng", ta cần $\\mathbb{Z}$.

#### Định nghĩa hình thức và tại sao cần mở rộng

Thêm các số âm. Ký hiệu $\\mathbb{Z}$ đến từ tiếng Đức *Zahlen* ("các con số"). Bây giờ trừ đã đóng: $3 - 5 = -2 \\in \\mathbb{Z}$. Nhưng phép chia chưa: $3 \\div 2 = 1.5$ không thuộc $\\mathbb{Z}$.

Walk-through tính đóng của $\\mathbb{Z}$:

- **Cộng**: $5 + (-3) = 2 \\in \\mathbb{Z}$ ✓ ; $(-7) + (-4) = -11 \\in \\mathbb{Z}$ ✓ ; $0 + (-1) = -1 \\in \\mathbb{Z}$ ✓ ; $(-2) + 2 = 0 \\in \\mathbb{Z}$ ✓.
- **Trừ**: $3 - 5 = -2 \\in \\mathbb{Z}$ ✓ ; $(-4) - (-9) = 5 \\in \\mathbb{Z}$ ✓ ; $0 - 100 = -100 \\in \\mathbb{Z}$ ✓ → đóng.
- **Nhân**: $(-3) \\times 4 = -12 \\in \\mathbb{Z}$ ✓ ; $(-5) \\times (-2) = 10 \\in \\mathbb{Z}$ ✓ ; $0 \\times (-7) = 0 \\in \\mathbb{Z}$ ✓ → đóng.
- **Chia**: $6 \\div (-2) = -3 \\in \\mathbb{Z}$ ✓ , nhưng $7 \\div 2 = 3.5 \\notin \\mathbb{Z}$ ✗ ; $(-5) \\div 3 = -1.666\\ldots \\notin \\mathbb{Z}$ ✗ → **không đóng**.

#### Cách dấu nhân hoạt động (quy tắc dấu)

Khi mở rộng từ $\\mathbb{N}$ sang $\\mathbb{Z}$, có một quy tắc mới mà nhiều người thấy "phép màu": $(-1) \\times (-1) = +1$. Walk-through bằng số:

- $2 \\times 3 = 6$ (dương × dương = dương)
- $2 \\times (-3) = -6$ (dương × âm = âm)
- $(-2) \\times 3 = -6$ (âm × dương = âm)
- $(-2) \\times (-3) = +6$ (âm × âm = dương) ← quy tắc gây tranh cãi

**Vì sao âm × âm = dương?** Có thể nhìn qua phân phối: nếu $(-1) \\times (-1) = -1$ thì $0 = (-1) \\times 0 = (-1) \\times (1 + (-1)) = (-1) + (-1)(-1) = (-1) + (-1) = -2$, vô lý. Vậy $(-1) \\times (-1)$ phải bằng $+1$. Đây là hệ quả bắt buộc từ phân phối và tính đóng của phép nhân với phép cộng.

#### ⚠ Lỗi thường gặp

- **Coi $-x$ là "luôn âm"**: Sai. $-x$ chỉ có nghĩa "số đối của x". Nếu $x = -3$, thì $-x = -(-3) = 3$, là số DƯƠNG. Khi viết $-x$, đừng vội kết luận "đây là số âm" mà không biết $x$ mang giá trị gì.
- **Nhầm $\\lvert -3 \\rvert = -3$**: $\\lvert -3 \\rvert = 3$ (sẽ học ở §3).
- **$-3^2 \\neq (-3)^2$**: Trong toán quy ước, $-3^2 = -(3^2) = -9$ (lũy thừa trước, dấu trừ sau). Còn $(-3)^2 = 9$. Cẩn thận thứ tự ưu tiên — nguyên nhân nhiều bug khi viết code.

#### ❓ Câu hỏi tự nhiên của người đọc

**Q: Vì sao ký hiệu là $\\mathbb{Z}$ mà không phải $I$ (Integer)?** Vì $I$ thường bị dùng cho ma trận đơn vị (identity matrix). Người Đức (Dedekind, Kronecker) đặt nền móng cho lý thuyết số, dùng $Z$ từ *Zahlen*. Quy ước này đã thành chuẩn quốc tế.

**Q: Trong Go, \`int\` có phải là $\\mathbb{Z}$?** Không hẳn — \`int\` trong Go là số nguyên có chặn (vd \`int64\` từ $-2^{63}$ tới $2^{63}-1$). $\\mathbb{Z}$ là tập vô hạn không chặn. Khi $n$ lớn (vd factorial), \`int\` bị overflow trong khi $\\mathbb{Z}$ thì không. Để có $\\mathbb{Z}$ thật, dùng \`math/big.Int\`.

#### 🔁 Dừng lại tự kiểm tra

Tính: $(-4) \\times (-5) + (-2) \\times 3 - (-1)$.

<details>
<summary>Đáp án</summary>

$= 20 + (-6) - (-1) = 20 - 6 + 1 = 15$. Kết quả $15 \\in \\mathbb{Z}$ (như mong đợi).
</details>

#### 📝 Tóm tắt mục 1.2

- $\\mathbb{Z} = \\{\\ldots, -2, -1, 0, 1, 2, \\ldots\\}$, mở rộng $\\mathbb{N}$ bằng số âm.
- Đóng dưới $+$, $-$, $\\times$; KHÔNG đóng dưới $\\div$.
- Quy tắc dấu: $(-) \\times (-) = (+)$ (hệ quả của phân phối).
- $\\mathbb{N} \\subset \\mathbb{Z}$ (mọi tự nhiên đều là nguyên).
- \`int\` trong Go có chặn — khác với $\\mathbb{Z}$ vô hạn.

### 1.3. ℚ — số hữu tỉ (rational numbers)

$$\\mathbb{Q} = \\left\\{ \\frac{p}{q} : p \\in \\mathbb{Z}, \\ q \\in \\mathbb{Z}, \\ q \\neq 0 \\right\\}$$

Đọc: "tập tất cả các phân số $p/q$ mà tử là số nguyên, mẫu là số nguyên khác 0". Chữ "Q" đến từ *Quotient* (thương).

#### 💡 Trực giác / Hình dung

Trên trục số, $\\mathbb{Z}$ chỉ là những **mốc cách đều 1 đơn vị**. Nhưng giữa $0$ và $1$ rõ ràng phải có "cái gì đó" — đó là $\\frac{1}{2}$, $\\frac{1}{3}$, $\\frac{2}{5}$, $\\frac{7}{100}$, ... Hãy hình dung mỗi lần bạn **chia một quãng** thành nhiều phần bằng nhau, bạn tạo ra một số hữu tỉ. Cụ thể: cắt một cái bánh thành 4 phần, lấy 3 → $\\frac{3}{4}$. Bạn không thể "cắt một cái bánh thành $\\sqrt{2}$ phần" — đó là chỗ $\\mathbb{Q}$ thấy đủ tự nhiên cho đời sống.

Cách hình dung khác: $\\mathbb{Q}$ là tập của **mọi tỉ lệ giữa hai đại lượng nguyên** — "đi 3 km hết 2 giờ" → tốc độ $\\frac{3}{2} = 1.5$ km/h. "Mua 7 quả táo với 5 nghìn" → giá $\\frac{5}{7}$ nghìn/quả. Toàn bộ đời sống định lượng "đếm rồi chia" nằm trong $\\mathbb{Q}$.

#### Bốn ví dụ thuộc ℚ (đọc kỹ từng cái)

- $\\frac{3}{4} = 0.75$ — phân số đơn giản, phần thập phân **dừng** sau 2 chữ số.
- $-\\frac{7}{2} = -3.5$ — phân số âm (do tử âm). Có thể viết $\\frac{7}{-2}$ cũng cho cùng giá trị, nhưng quy ước viết dấu trừ ở tử.
- $5 = \\frac{5}{1}$ — mọi số nguyên đều là hữu tỉ (viết mẫu 1). Đây là lý do $\\mathbb{Z} \\subset \\mathbb{Q}$.
- $0.333\\ldots = \\frac{1}{3}$ — số thập phân **vô hạn tuần hoàn** vẫn là hữu tỉ. Phần lặp là chữ số "3".
- $0.142857142857\\ldots = \\frac{1}{7}$ — chu kỳ dài hơn ("142857" lặp). Chu kỳ tối đa của $\\frac{1}{q}$ là $q - 1$ chữ số.
- $\\frac{22}{7} \\approx 3.142857142857\\ldots$ — hữu tỉ (chu kỳ "142857"). **Không** phải $\\pi$ — chỉ xấp xỉ.
- $0.5 = \\frac{1}{2}$ — thập phân dừng sau 1 chữ số.
- $-0.125 = -\\frac{1}{8}$ — thập phân âm dừng sau 3 chữ số.

#### Đặc trưng quyết định (very important)

Một số là hữu tỉ $\\Leftrightarrow$ phần thập phân của nó **dừng** hoặc **tuần hoàn**.

Walk-through cho mỗi loại:

- **Dừng** (terminating): $0.5$, $0.75$, $0.125$, $3.14$. Khi viết $0.5 = \\frac{5}{10} = \\frac{1}{2}$ ta thấy ngay là hữu tỉ.
- **Tuần hoàn** (repeating): $0.333\\ldots$, $0.142857142857\\ldots$, $0.1666\\ldots$. Mọi phân số có mẫu không chỉ là $2^a \\cdot 5^b$ đều cho thập phân tuần hoàn — vì hệ thập phân chỉ "hợp" với 2 và 5.

Vì sao mẫu $2^a \\cdot 5^b$ thì dừng? Vì $10 = 2 \\times 5$, nhân tử mẫu lên thành lũy thừa của 10:
- $\\frac{1}{8} = \\frac{1}{2^3} = \\frac{125}{1000} = 0.125$ (nhân cả tử và mẫu với $5^3$).
- $\\frac{3}{20} = \\frac{3}{2^2 \\cdot 5} = \\frac{15}{100} = 0.15$ (nhân cả hai với $5$).

Còn $\\frac{1}{3}$, $\\frac{1}{7}$, $\\frac{1}{6}$ (mẫu có ước khác 2, 5) thì luôn tuần hoàn.

#### Walk-through tính đóng của ℚ

Lấy $a = \\frac{2}{3}$, $b = \\frac{5}{4}$:

- **Cộng**: $\\frac{2}{3} + \\frac{5}{4} = \\frac{8}{12} + \\frac{15}{12} = \\frac{23}{12} \\in \\mathbb{Q}$ ✓.
- **Trừ**: $\\frac{2}{3} - \\frac{5}{4} = \\frac{8}{12} - \\frac{15}{12} = -\\frac{7}{12} \\in \\mathbb{Q}$ ✓.
- **Nhân**: $\\frac{2}{3} \\times \\frac{5}{4} = \\frac{10}{12} = \\frac{5}{6} \\in \\mathbb{Q}$ ✓.
- **Chia**: $\\frac{2}{3} \\div \\frac{5}{4} = \\frac{2}{3} \\times \\frac{4}{5} = \\frac{8}{15} \\in \\mathbb{Q}$ ✓.

Tổng quát: với $\\frac{p_1}{q_1}$, $\\frac{p_2}{q_2} \\in \\mathbb{Q}$ ($q_1, q_2 \\neq 0$):
- Cộng: $\\frac{p_1 q_2 + p_2 q_1}{q_1 q_2}$ — vẫn là phân số.
- Nhân: $\\frac{p_1 p_2}{q_1 q_2}$ — vẫn là phân số.
- Chia: nhân với nghịch đảo (mẫu phải khác 0).

Nên $\\mathbb{Q}$ **đóng** dưới 4 phép toán cơ bản (trừ chia cho 0). Vậy là đã đủ chưa? Chưa.

#### ⚠ Lỗi thường gặp

- **Nhầm "chia cho 0 = vô cùng"**: Sai. Chia cho 0 **không xác định** (undefined), không phải $\\infty$. Cụ thể: $\\frac{5}{0}$ không có nghĩa, vì không tồn tại số $x$ nào sao cho $0 \\cdot x = 5$. Còn $\\frac{0}{0}$ thì tệ hơn — có vô số $x$ thỏa $0 \\cdot x = 0$, tức là không xác định duy nhất.
- **Nhầm $0$ không phải hữu tỉ**: Sai. $0 = \\frac{0}{1} = \\frac{0}{2} = \\frac{0}{100} = \\ldots$ — tử là 0, mẫu khác 0 → hữu tỉ.
- **Nhầm "phân số tối giản là phân số duy nhất"**: Một số hữu tỉ có **vô hạn cách viết** dưới dạng $p/q$: $\\frac{1}{2} = \\frac{2}{4} = \\frac{3}{6} = \\ldots$. Phân số tối giản ($\\gcd(p,q) = 1$) là cách viết **chính tắc**, không phải duy nhất.
- **Nhầm $0.999\\ldots \\neq 1$**: Như bài tập 3b, $0.999\\ldots = 1$ chính xác (không xấp xỉ). Trực giác sai vì bộ não nghĩ "có infinity số 9 thì còn thiếu một chút" — không thiếu gì cả.

#### ❓ Câu hỏi tự nhiên của người đọc

**Q: Vì sao đòi mẫu $q \\neq 0$?** Vì chia cho 0 không xác định. Nếu cho phép $q = 0$, ta phá hệ thống — vd $\\frac{1}{0} = ?$. Để có một con số duy nhất, phải có $0 \\times ? = 1$, nhưng $0 \\times$ bất-kỳ-số-nào $= 0 \\neq 1$. Mâu thuẫn. Vậy $\\frac{1}{0}$ không thể là số. Cấm mẫu = 0 để giữ $\\mathbb{Q}$ là một hệ thống nhất quán.

**Q: $0$ có phải là số hữu tỉ không?** Có. $0 = \\frac{0}{1}$. Tử là 0 (số nguyên), mẫu là 1 (khác 0). Hợp lệ.

**Q: $\\frac{-3}{0}$ nằm ở đâu?** Không ở đâu cả — không phải số. $q = 0$ bị cấm, nên $\\frac{-3}{0}$ không phải phần tử của $\\mathbb{Q}$. Trong code Go, \`1/0\` với int gây panic "division by zero"; còn \`1.0/0.0\` với float trả về \`+Inf\` (theo IEEE 754) — nhưng \`Inf\` không phải số thực, là quy ước riêng của IEEE 754.

**Q: ℚ có "đầy" trục số không?** Không. Dù giữa hai số hữu tỉ bất kỳ luôn có vô số số hữu tỉ khác (tính **trù mật** — density), trục số vẫn có "lỗ" tại các vị trí vô tỉ như $\\sqrt{2}$. Sẽ phân tích ở §1.5.

**Q: ℚ có đếm được không?** Có (lực lượng $\\aleph_0$, bằng $\\mathbb{N}$). Cantor chứng minh bằng cách liệt kê toàn bộ phân số $p/q$ theo đường zigzag trong bảng 2D. Đây là kết quả phản trực giác — "có vẻ $\\mathbb{Q}$ nhiều hơn $\\mathbb{N}$" nhưng thật ra bằng nhau về cardinality.

#### 🔁 Dừng lại tự kiểm tra

1. $0.625$ có phải hữu tỉ không? Viết dưới dạng $p/q$ tối giản.
2. Phần thập phân của $\\frac{1}{11}$ là gì? Có tuần hoàn không?
3. $\\frac{2}{0}$ thuộc tập nào?

<details>
<summary>Đáp án</summary>

1. Có. $0.625 = \\frac{625}{1000} = \\frac{5}{8}$ (chia cả tử mẫu cho 125). Mẫu $8 = 2^3$, không có thừa số khác 2/5 → thập phân dừng (đúng như ta thấy).
2. $\\frac{1}{11} = 0.090909\\ldots$ — tuần hoàn "09". Vẫn là hữu tỉ.
3. Không thuộc tập số nào — không phải số. Mẫu = 0 bị cấm.
</details>

#### 📝 Tóm tắt mục 1.3

- $\\mathbb{Q}$ = tập các phân số $p/q$ với $p, q \\in \\mathbb{Z}$, $q \\neq 0$.
- Đặc trưng: thập phân **dừng** hoặc **tuần hoàn**.
- $\\mathbb{Q}$ đóng dưới $+$, $-$, $\\times$, $\\div$ (trừ chia 0).
- $\\mathbb{Z} \\subset \\mathbb{Q}$ (mọi nguyên = nguyên/1).
- Chia cho 0 không xác định, không phải $\\infty$.

### 1.4. ℝ\\ℚ — số vô tỉ (irrational numbers)

#### 💡 Trực giác / Hình dung

Hãy hình dung trục số đã được "đắp đầy" bởi các số hữu tỉ. Mật độ rất cao — giữa hai số hữu tỉ bất kỳ luôn có vô số hữu tỉ khác. Vậy có còn chỗ trống không? Có. Có những vị trí trên trục số mà **không một phân số nào trúng đích** — đó là các **lỗ** mà số vô tỉ lấp đầy. Vị trí $\\sqrt{2} = 1.41421356\\ldots$ là một lỗ như vậy: dù ta liệt kê tất cả hữu tỉ với mẫu đến 1 triệu, không có cái nào trùng đúng $\\sqrt{2}$, mặc dù vô số gần nó.

Người Hy Lạp cổ phát hiện chuyện này gây khủng hoảng triết học: trường phái Pythagoras tin "mọi thứ là số" (số = số nguyên / phân số). Khi Hippasus chứng minh $\\sqrt{2}$ không phải phân số, theo truyền thuyết ông bị đuổi khỏi trường phái (có thuyết nói bị nhấn chết).

#### Định nghĩa và 4 ví dụ chi tiết

Khi người Hy Lạp cổ chứng minh $\\sqrt{2}$ không viết được dưới dạng phân số, họ phát hiện ra **một loại số mới**, không nằm trong $\\mathbb{Q}$. Đó là **số vô tỉ**.

- $\\sqrt{2} \\approx 1.41421356237309504880\\ldots$ — đường chéo của hình vuông cạnh 1 (Pythagoras: $c^2 = 1^2 + 1^2 = 2$).
- $\\sqrt{3} \\approx 1.73205080756887729352\\ldots$ — chiều cao của tam giác đều cạnh 2 chia 2, hoặc đường chéo của khối lập phương cạnh 1 chiếu xuống mặt.
- $\\sqrt{5} \\approx 2.23606797749978969640\\ldots$ — gặp trong tỉ lệ vàng $\\varphi = \\frac{1+\\sqrt{5}}{2} \\approx 1.618$.
- $\\pi \\approx 3.14159265358979323846\\ldots$ — chu vi chia đường kính của mọi hình tròn. Không phụ thuộc kích thước hình tròn — quan hệ phổ quát.
- $e \\approx 2.71828182845904523536\\ldots$ — cơ số logarit tự nhiên. Định nghĩa cổ điển: $e = \\lim_{n \\to \\infty} \\left(1 + \\frac{1}{n}\\right)^n$. Xuất hiện trong lãi kép liên tục, xác suất, entropy.
- $\\ln(2) \\approx 0.69314718055994530941\\ldots$ — logarit tự nhiên của 2. Cũng vô tỉ.
- $\\varphi = \\frac{1+\\sqrt{5}}{2} \\approx 1.61803398874989484820\\ldots$ — tỉ lệ vàng. Vô tỉ vì $\\sqrt{5}$ vô tỉ.

#### Đặc trưng quyết định

Phần thập phân **vô hạn và KHÔNG tuần hoàn**. Bạn không bao giờ tìm thấy một "đoạn lặp lại" trong $\\pi$ cho dù xem bao nhiêu chữ số. Đến năm 2024 đã có người tính $\\pi$ đến **202 nghìn tỷ** chữ số — không có chu kỳ nào.

So sánh trực tiếp:

| Loại | Ví dụ | Phần thập phân |
|------|-------|----------------|
| Hữu tỉ — dừng | $0.5$, $0.125$ | Có hữu hạn chữ số |
| Hữu tỉ — tuần hoàn | $\\frac{1}{3} = 0.333\\ldots$, $\\frac{1}{7} = 0.142857142857\\ldots$ | Vô hạn, lặp |
| Vô tỉ | $\\sqrt{2} = 1.41421356\\ldots$, $\\pi = 3.14159265\\ldots$ | Vô hạn, không lặp |

#### Phân loại sâu hơn: vô tỉ đại số vs siêu việt

Trong $\\mathbb{R} \\setminus \\mathbb{Q}$ vẫn còn phân tầng:

- **Đại số (algebraic)**: là nghiệm của một đa thức hệ số nguyên. Vd $\\sqrt{2}$ là nghiệm của $x^2 - 2 = 0$. $\\sqrt[3]{5}$ là nghiệm của $x^3 - 5 = 0$. Tỉ lệ vàng $\\varphi$ là nghiệm của $x^2 - x - 1 = 0$.
- **Siêu việt (transcendental)**: **không** là nghiệm của bất kỳ đa thức hệ số nguyên nào. $\\pi$ và $e$ là siêu việt — chứng minh khó hơn nhiều so với chứng minh chúng vô tỉ.

Hệ quả thực tế: $\\pi$ siêu việt → không thể "vẽ hình vuông có diện tích bằng hình tròn" bằng compa và thước kẻ (bài toán cổ "cầu phương hình tròn" — bất khả thi).

#### ⚠ Lỗi thường gặp

- **Nhầm vô tỉ với số phức**: Sai. Vô tỉ vẫn là số **thực** — nằm trên trục số. Số phức như $i = \\sqrt{-1}$ thì ngoài trục số, không phải $\\mathbb{R}$. Cẩn thận khi đọc tiếng Anh: *irrational* (vô tỉ) ≠ *imaginary* (ảo, tức số phức).
- **Nhầm "vô tỉ = vô hạn chữ số"**: Vô tỉ thì vô hạn chữ số KHÔNG tuần hoàn. Nhưng $\\frac{1}{3} = 0.333\\ldots$ cũng vô hạn chữ số (tuần hoàn) — vẫn là hữu tỉ. Phải nhấn mạnh **không tuần hoàn**.
- **Nhầm $\\frac{22}{7} = \\pi$**: Sai. $\\frac{22}{7} = 3.142857142857\\ldots$ (tuần hoàn, hữu tỉ) — chỉ xấp xỉ $\\pi$. Tương tự $3.14$, $3.14159$ đều hữu tỉ, không phải $\\pi$.
- **Nhầm $\\sqrt{4}$ vô tỉ**: Sai. $\\sqrt{4} = 2$ là số tự nhiên! Chỉ căn của các số **không chính phương** (như 2, 3, 5, 6, 7, ...) mới vô tỉ. Căn của số chính phương (1, 4, 9, 16, 25, ...) ra số nguyên.

#### ❓ Câu hỏi tự nhiên của người đọc

**Q: Số vô tỉ "nhiều" hay số hữu tỉ "nhiều" hơn?** Vô tỉ nhiều hơn rất nhiều. $\\mathbb{Q}$ đếm được (lực lượng $\\aleph_0$), $\\mathbb{R} \\setminus \\mathbb{Q}$ không đếm được (lực lượng $2^{\\aleph_0} = c$). Trên trục số, "hầu hết" các điểm là vô tỉ — nếu ném ngẫu nhiên một mũi tên vào trục số, **xác suất trúng số hữu tỉ là 0**.

**Q: Vậy sao đời thường chỉ thấy hữu tỉ?** Vì ta đo bằng dụng cụ có độ chính xác hữu hạn — mọi phép đo trả về một số thập phân hữu hạn, tức là hữu tỉ. Vô tỉ xuất hiện ở các **quan hệ lý tưởng**: chu vi/đường kính của hình tròn "lý tưởng", đường chéo của hình vuông "lý tưởng".

**Q: Tổng hai số vô tỉ có phải vô tỉ?** Không nhất thiết. $\\sqrt{2} + (-\\sqrt{2}) = 0$, hữu tỉ. $(1 + \\sqrt{2}) + (1 - \\sqrt{2}) = 2$, hữu tỉ. Vậy $\\mathbb{R} \\setminus \\mathbb{Q}$ **không đóng** dưới phép cộng. Tuy nhiên, **tổng/tích của một hữu tỉ khác 0 và một vô tỉ luôn là vô tỉ** (chứng minh dễ bằng phản chứng).

#### 🔁 Dừng lại tự kiểm tra

1. Trong các số sau, số nào vô tỉ: $\\sqrt{9}$, $\\sqrt{10}$, $\\pi - 3$, $1.414$, $e^2$, $\\frac{0}{\\pi}$?
2. Nếu $a$ hữu tỉ và $b$ vô tỉ, $a + b$ thuộc tập nào?

<details>
<summary>Đáp án</summary>

1. $\\sqrt{9} = 3$ hữu tỉ. $\\sqrt{10}$ vô tỉ (10 không chính phương). $\\pi - 3$ vô tỉ (hữu tỉ trừ vô tỉ = vô tỉ). $1.414$ hữu tỉ (thập phân dừng). $e^2$ vô tỉ ($e$ siêu việt nên $e^2$ cũng vô tỉ). $\\frac{0}{\\pi} = 0$ hữu tỉ (tử là 0).
2. Vô tỉ. Phản chứng: giả sử $a + b = r$ hữu tỉ. Thì $b = r - a$, hiệu hai hữu tỉ, là hữu tỉ. Mâu thuẫn với $b$ vô tỉ.
</details>

#### 📝 Tóm tắt mục 1.4

- Vô tỉ = không viết được $p/q$ với $p, q \\in \\mathbb{Z}$.
- Phần thập phân vô hạn, **không** tuần hoàn.
- Ví dụ: $\\sqrt{2}$, $\\sqrt{3}$, $\\pi$, $e$, $\\varphi$.
- Phân tầng: đại số ($\\sqrt{2}$) vs siêu việt ($\\pi$, $e$).
- $\\mathbb{R} \\setminus \\mathbb{Q}$ **không đóng** dưới $+$, $\\times$ (vd $\\sqrt{2} + (-\\sqrt{2}) = 0$).

### 1.5. ℝ — số thực (real numbers)

$$\\mathbb{R} = \\mathbb{Q} \\cup (\\mathbb{R} \\setminus \\mathbb{Q}) \\quad \\text{(hợp của hữu tỉ và vô tỉ)}$$

#### 💡 Trực giác / Hình dung

$\\mathbb{R}$ là trục số **không có lỗ** — mọi điểm trên đường thẳng đều ứng với đúng một số, và ngược lại. Nói cách khác: nếu ta cắt trục số tại một vị trí bất kỳ, **luôn có đúng một số** ở vết cắt. Tính chất này gọi là **tính đầy đủ** (completeness) — đặc trưng cốt lõi phân biệt $\\mathbb{R}$ với $\\mathbb{Q}$.

So sánh:
- $\\mathbb{Q}$ giống như sàn nhà có nhiều lỗ rỗng — bạn có thể "rơi" xuống lỗ tại $\\sqrt{2}$, $\\pi$, $e$.
- $\\mathbb{R}$ giống như sàn nhà bê tông đặc — không lỗ hổng nào.

Đây là lý do mọi giải tích (đạo hàm, tích phân, giới hạn) đều cần $\\mathbb{R}$. Trong $\\mathbb{Q}$, giới hạn của một dãy hữu tỉ có thể "vô tỉ" — tức là rơi ngoài $\\mathbb{Q}$. Vd dãy $1, 1.4, 1.41, 1.414, 1.4142, \\ldots$ (các xấp xỉ thập phân của $\\sqrt{2}$) toàn là hữu tỉ, nhưng giới hạn $\\sqrt{2}$ không nằm trong $\\mathbb{Q}$. $\\mathbb{R}$ "thêm" tất cả các giới hạn đó vào.

#### Bốn ví dụ về số thực

- $5$ — số nguyên, đồng thời thuộc $\\mathbb{R}$.
- $-3.7$ — hữu tỉ, cũng thuộc $\\mathbb{R}$.
- $\\pi$ — vô tỉ, cũng thuộc $\\mathbb{R}$.
- $\\sqrt{2} + e$ — tổng hai vô tỉ, vẫn thuộc $\\mathbb{R}$.

Tóm gọn: **mọi số bạn từng viết ra dưới dạng thập phân** (dù hữu hạn, tuần hoàn, hay vô hạn không tuần hoàn) đều là số thực. Cái KHÔNG phải số thực là số phức (vd $i = \\sqrt{-1}$), $\\infty$, \`NaN\`.

#### Tính trù mật và đầy đủ — phát biểu chính xác

- **Trù mật** (density): giữa hai số thực bất kỳ $a < b$, luôn tồn tại số thực $c$ với $a < c < b$. Vd giữa $1.41421$ và $1.41422$, có $1.414215$, $1.414213567$, vô số khác.
- **Đầy đủ** (completeness): mọi tập con $S \\subset \\mathbb{R}$ không rỗng, bị chặn trên đều có **cận trên đúng** (supremum) thuộc $\\mathbb{R}$. Đây là tính chất $\\mathbb{Q}$ không có — vd tập $\\{x \\in \\mathbb{Q} : x^2 < 2\\}$ bị chặn trên (vd bởi 2) nhưng cận trên đúng của nó là $\\sqrt{2}$, không nằm trong $\\mathbb{Q}$.

#### ⚠ Lỗi thường gặp

- **Nhầm "trù mật" với "đầy đủ"**: $\\mathbb{Q}$ trù mật nhưng không đầy đủ. $\\mathbb{R}$ vừa trù mật vừa đầy đủ. Đầy đủ mạnh hơn.
- **Coi $\\infty$ là số thực**: Sai. $\\infty$ (vô cực) là **khái niệm về giới hạn**, không phải phần tử của $\\mathbb{R}$. Trong giải tích, ta viết $\\lim_{x \\to \\infty}$ chứ không đối xử với $\\infty$ như một số. Trong IEEE 754, \`+Inf\` là quy ước riêng.
- **Coi \`NaN\` là số thực**: Không. \`NaN\` (Not a Number) là kết quả của phép tính không xác định trong float (vd $\\frac{0}{0}$, $\\log(-1)$, $\\sqrt{-1}$).

#### ❓ Câu hỏi tự nhiên của người đọc

**Q: Sao không học thẳng ℝ luôn cho gọn?** Vì hiểu được "vì sao cần $\\mathbb{R}$" thì phải đi qua $\\mathbb{N} \\to \\mathbb{Z} \\to \\mathbb{Q} \\to \\mathbb{R}$ — mỗi lần mở rộng giải quyết một vấn đề cụ thể. Học thẳng $\\mathbb{R}$ thì không biết tại sao phải có nó.

**Q: Còn tập nào lớn hơn ℝ không?** Có. $\\mathbb{C}$ (số phức) chứa $\\mathbb{R}$. $\\mathbb{R}^n$ là không gian n chiều. Quaternion $\\mathbb{H}$ chứa $\\mathbb{C}$. Lý thuyết tập hợp còn xa hơn — vd $2^{\\mathbb{R}}$ lớn hơn $\\mathbb{R}$.

**Q: Vector embedding 768 chiều có gì liên quan?** Mỗi embedding là một điểm trong $\\mathbb{R}^{768}$ — tức danh sách 768 số thực. Để hiểu "khoảng cách" giữa hai embedding, phải hiểu khoảng cách trong $\\mathbb{R}$ — chính là $\\lvert a - b \\rvert$ mà ta sẽ học ở §3.

#### 🔁 Dừng lại tự kiểm tra

Tập $\\{x \\in \\mathbb{Q} : x^2 < 3\\}$ có cận trên đúng (sup) thuộc $\\mathbb{Q}$ không? Thuộc $\\mathbb{R}$ không?

<details>
<summary>Đáp án</summary>

$\\sup = \\sqrt{3}$. $\\sqrt{3} \\notin \\mathbb{Q}$ (vô tỉ, bài tập 4). $\\sqrt{3} \\in \\mathbb{R}$. Đây là ví dụ tiêu biểu cho thấy $\\mathbb{Q}$ **không đầy đủ** còn $\\mathbb{R}$ thì đầy đủ.
</details>

#### 📝 Tóm tắt mục 1.5

- $\\mathbb{R} = \\mathbb{Q} \\cup (\\mathbb{R} \\setminus \\mathbb{Q})$, trục số "không lỗ".
- Trù mật + đầy đủ (cận trên đúng luôn tồn tại).
- "Không gian sống" của giải tích và ML (embedding $\\in \\mathbb{R}^n$).
- $\\infty$, \`NaN\` không thuộc $\\mathbb{R}$.

### 1.6. Quan hệ bao hàm

$$\\mathbb{N} \\subset \\mathbb{Z} \\subset \\mathbb{Q} \\subset \\mathbb{R}$$

Đọc: $\\mathbb{N}$ là tập con thực sự của $\\mathbb{Z}$, $\\mathbb{Z}$ là tập con thực sự của $\\mathbb{Q}$, và $\\mathbb{Q}$ là tập con thực sự của $\\mathbb{R}$. Mỗi mũi tên là một lần mở rộng. Vô tỉ $\\mathbb{R} \\setminus \\mathbb{Q}$ nằm trong $\\mathbb{R}$ nhưng không nằm trong $\\mathbb{Q}$.

Sơ đồ Venn (vẽ bằng ASCII):

\`\`\`
   +---------------------------------------------+
   |  ℝ  (số thực)                               |
   |                                             |
   |   +-------------------+    +-------------+  |
   |   |  ℚ  (hữu tỉ)      |    |  ℝ\\ℚ        |  |
   |   |                   |    |  (vô tỉ)    |  |
   |   |  +-------------+  |    |             |  |
   |   |  |  ℤ          |  |    |   √2, π, e  |  |
   |   |  |             |  |    |             |  |
   |   |  |  +-------+  |  |    |             |  |
   |   |  |  |  ℕ    |  |  |    |             |  |
   |   |  |  | 0,1,2 |  |  |    |             |  |
   |   |  |  +-------+  |  |    +-------------+  |
   |   |  |  -1, -2     |  |                     |
   |   |  +-------------+  |                     |
   |   |  1/2, -3/4, 0.333.|                     |
   |   +-------------------+                     |
   +---------------------------------------------+
\`\`\`

Bảng so sánh nhanh:

| Tập | Ký hiệu | Ví dụ thuộc | Ví dụ KHÔNG thuộc |
|-----|---------|-------------|-------------------|
| Tự nhiên | $\\mathbb{N}$ | $0, 1, 2, 42, 1000$ | $-3, 0.5, \\sqrt{2}$ |
| Nguyên | $\\mathbb{Z}$ | $-5, 0, 42$ | $0.5, \\frac{1}{3}, \\pi$ |
| Hữu tỉ | $\\mathbb{Q}$ | $-5, 0.5, \\frac{1}{3}, 0.333\\ldots, \\frac{22}{7}$ | $\\sqrt{2}, \\pi, e$ |
| Vô tỉ | $\\mathbb{R} \\setminus \\mathbb{Q}$ | $\\sqrt{2}, \\pi, e, \\sqrt{3} + 1$ | $0, 0.5, \\frac{22}{7}$ |
| Thực | $\\mathbb{R}$ | tất cả ví dụ phía trên | số phức $i = \\sqrt{-1}$ |

**Câu hỏi tự nhiên ở đây**: *"22/7 có phải là π không?"* Không. $\\frac{22}{7} = 3.142857142857\\ldots$ (tuần hoàn) là một số **hữu tỉ** xấp xỉ $\\pi$. Bản thân $\\pi$ thì vô tỉ. Tương tự $1.414$ không phải $\\sqrt{2}$; nó chỉ là 4 chữ số đầu.

#### Bốn ví dụ minh họa quan hệ bao hàm

- $5 \\in \\mathbb{N} \\to 5 \\in \\mathbb{Z} \\to 5 \\in \\mathbb{Q}$ ($= \\frac{5}{1}$) $\\to 5 \\in \\mathbb{R}$. Một số có thể thuộc nhiều tập (vì các tập lồng nhau).
- $-3 \\in \\mathbb{Z} \\to -3 \\in \\mathbb{Q} \\to -3 \\in \\mathbb{R}$. Nhưng $-3 \\notin \\mathbb{N}$.
- $\\frac{1}{2} \\in \\mathbb{Q} \\to \\frac{1}{2} \\in \\mathbb{R}$. Nhưng $\\frac{1}{2} \\notin \\mathbb{Z}$.
- $\\pi \\in \\mathbb{R} \\setminus \\mathbb{Q} \\to \\pi \\in \\mathbb{R}$. Nhưng $\\pi \\notin \\mathbb{Q}$ (và do đó $\\notin \\mathbb{Z}$, $\\notin \\mathbb{N}$).

#### ⚠ Lỗi thường gặp

- **Nhầm "phân số ⇒ không phải nguyên"**: Sai. $\\frac{6}{2} = 3 \\in \\mathbb{Z}$. Một số viết dưới dạng phân số vẫn có thể là nguyên — rút gọn trước khi phân loại.
- **Nhầm $\\mathbb{R} \\setminus \\mathbb{Q}$ là tập con của $\\mathbb{Q}$**: Sai. Ký hiệu $A \\setminus B$ là "A trừ B" (A nhưng không trong B). $\\mathbb{R} \\setminus \\mathbb{Q}$ = số thực không phải hữu tỉ = số vô tỉ. Khác hoàn toàn với $\\mathbb{Q} \\setminus \\mathbb{R}$ (rỗng vì $\\mathbb{Q} \\subset \\mathbb{R}$).
- **Nhầm "tập con thực sự" ($\\subset$) với "tập con" ($\\subseteq$)**: $\\subset$ thường dùng cho "tập con thực sự" ($A \\subset B$, $A \\neq B$). $\\subseteq$ cho phép bằng. Quy ước tài liệu này: $\\mathbb{N} \\subset \\mathbb{Z}$ nghĩa là $\\mathbb{N} \\subseteq \\mathbb{Z}$ và $\\mathbb{N} \\neq \\mathbb{Z}$.

#### ❓ Câu hỏi tự nhiên của người đọc

**Q: Làm sao phân loại một số bất kỳ nhanh?** Dùng quy trình:
1. Có dấu trừ và là số nguyên? → $\\mathbb{Z}$ (không $\\mathbb{N}$).
2. Là số nguyên không âm? → $\\mathbb{N}$.
3. Là phân số $p/q$ hoặc thập phân **dừng/tuần hoàn**? → $\\mathbb{Q}$.
4. Còn lại (thập phân vô hạn không tuần hoàn)? → $\\mathbb{R} \\setminus \\mathbb{Q}$.

Ví dụ phân loại $\\sqrt{25}$: đầu tiên tính ra $5$ → $\\mathbb{N}$. Đừng nhìn dấu căn rồi vội xếp vào vô tỉ.

**Q: Có số nào "ngoài ℝ" không?** Có. Số phức $\\mathbb{C}$ (chứa $i = \\sqrt{-1}$). Trong lesson này không xét.

#### 📝 Tóm tắt mục 1.6

- $\\mathbb{N} \\subsetneq \\mathbb{Z} \\subsetneq \\mathbb{Q} \\subsetneq \\mathbb{R}$ — mỗi mở rộng giải quyết một hạn chế (đóng dưới phép gì).
- $\\mathbb{R} \\setminus \\mathbb{Q}$ = số vô tỉ, nằm trong $\\mathbb{R}$ nhưng không trong $\\mathbb{Q}$.
- Rút gọn trước khi phân loại ($\\sqrt{4} = 2 \\in \\mathbb{N}$).
- Một số có thể thuộc nhiều tập (do bao hàm).

## 2. Trục số (number line)

### 2.1. Biểu diễn

#### 💡 Trực giác / Hình dung

Trục số là **bản đồ 1 chiều của $\\mathbb{R}$**: mỗi số là một địa chỉ, mỗi địa chỉ tương ứng đúng một số. Đây gọi là **tương ứng 1-1** (bijection) giữa $\\mathbb{R}$ và đường thẳng. Tính chất này khiến trục số trở thành công cụ trực quan mạnh — mọi câu hỏi đại số đều có thể "vẽ ra" để hiểu.

Trục số là một đường thẳng nằm ngang, có chiều dương (sang phải), gốc là \`0\`, và mỗi điểm tương ứng với **đúng một số thực** (và ngược lại).

\`\`\`
       -3   -2   -1    0    1    2    3
   ────┼────┼────┼────┼────┼────┼────┼────►
                      ↑              ↑
                     gốc           x = 2
\`\`\`

Số nhỏ nằm bên trái, số lớn nằm bên phải. Đây là cách trực quan nhất để hình dung *thứ tự*.

#### Định vị 4 số trên trục

- $-2.5$: nằm giữa $-3$ và $-2$, gần giữa hơn về phía $-2$.
- $\\frac{1}{3} \\approx 0.333$: nằm giữa $0$ và $1$, gần $0$ hơn ($\\frac{1}{3} < \\frac{1}{2}$).
- $\\sqrt{2} \\approx 1.414$: nằm giữa $1$ và $2$, hơi gần $1$ hơn. Trong hình học: dài bằng đường chéo hình vuông cạnh 1.
- $\\pi \\approx 3.14$: nằm giữa $3$ và $4$, gần $3$ hơn.

#### ❓ Câu hỏi tự nhiên của người đọc

**Q: Số vô tỉ có "thấy được" trên trục số không?** Có. $\\sqrt{2}$ chấm chính xác tại vị trí đường chéo hình vuông cạnh 1 — bạn có thể dựng bằng compa. $\\pi$ thì khó dựng bằng compa-thước kẻ (do siêu việt) nhưng vẫn là một điểm xác định.

**Q: Vì sao chiều dương sang phải mà không sang trái?** Quy ước. Trong hệ tọa độ Descartes, trục $x$ tăng sang phải, trục $y$ tăng lên trên. Quy ước này thống nhất toàn cầu (trừ một vài đồ thị tài chính lịch sử).

### 2.2. Thứ tự — <, >, =, ≤, ≥

| Ký hiệu | Đọc | Ví dụ |
|---------|-----|-------|
| $a < b$ | a nhỏ hơn b | $-3 < 1$, $1.414 < \\sqrt{2}$ |
| $a > b$ | a lớn hơn b | $5 > 2$, $\\pi > 3$ |
| $a = b$ | a bằng b | $\\frac{1}{2} = 0.5$ |
| $a \\leq b$ | a nhỏ hơn hoặc bằng b | $x \\leq 5$ (cho phép x = 5) |
| $a \\geq b$ | a lớn hơn hoặc bằng b | $x \\geq 0$ (số không âm) |

Mẹo: ký hiệu $<$ luôn "miệng há về phía số lớn". $3 < 5$: miệng há về 5.

#### Walk-through so sánh bằng trục số

So sánh $-2.7$ và $-1.5$:
- Trên trục số: $-2.7$ nằm xa gốc về bên trái hơn $-1.5$.
- Vậy $-2.7 < -1.5$.
- ⚠ Bẫy: $2.7 > 1.5$ nhưng $-2.7 < -1.5$. Số càng âm thì càng nhỏ.

So sánh $\\frac{1}{3}$ và $\\frac{2}{5}$:
- Quy đồng mẫu: $\\frac{1}{3} = \\frac{5}{15}$, $\\frac{2}{5} = \\frac{6}{15}$.
- $5 < 6$ nên $\\frac{5}{15} < \\frac{6}{15}$, tức $\\frac{1}{3} < \\frac{2}{5}$.
- Kiểm tra bằng thập phân: $\\frac{1}{3} \\approx 0.333$, $\\frac{2}{5} = 0.4$. Đúng.

So sánh $\\sqrt{3}$ và $\\sqrt{5}$:
- Hàm $\\sqrt{\\ }$ đơn điệu tăng trên $[0, \\infty)$: $a < b \\Rightarrow \\sqrt{a} < \\sqrt{b}$ (khi $a, b \\geq 0$).
- $3 < 5 \\Rightarrow \\sqrt{3} < \\sqrt{5}$.

So sánh $\\pi$ và $\\sqrt{10}$:
- $\\pi^2 \\approx 9.87$, $(\\sqrt{10})^2 = 10$. Vì cả hai dương: $\\pi^2 < 10 \\Rightarrow \\pi < \\sqrt{10}$.

#### Tính chất của thứ tự (cần nhớ)

1. **Phản xạ**: $a \\leq a$ luôn đúng.
2. **Phản đối xứng**: nếu $a \\leq b$ và $b \\leq a$ thì $a = b$.
3. **Bắc cầu**: nếu $a \\leq b$ và $b \\leq c$ thì $a \\leq c$. Vd: $2 < 5 < 10 \\Rightarrow 2 < 10$.
4. **Toàn phần**: với mọi $a, b \\in \\mathbb{R}$, một trong ba thứ luôn đúng: $a < b$, $a = b$, hoặc $a > b$ (luật ba khả năng — trichotomy).
5. **Bảo toàn dưới cộng**: $a < b \\Rightarrow a + c < b + c$ với mọi $c$.
6. **Bảo toàn dưới nhân với số dương**: $a < b$ và $c > 0 \\Rightarrow ac < bc$.
7. **ĐỔI DẤU dưới nhân với số âm**: $a < b$ và $c < 0 \\Rightarrow ac > bc$. ← bẫy lớn nhất khi giải bất phương trình.

Walk-through quy tắc 7: nhân hai vế của $2 < 5$ với $-3$. Kết quả: $-6 > -15$ (đổi chiều), không phải $-6 < -15$. Kiểm tra: $-6$ nằm bên phải $-15$ trên trục số, nên $-6 > -15$. Đúng.

#### ⚠ Lỗi thường gặp

- **Quên đổi chiều khi nhân/chia với số âm**: Giải $-2x < 6 \\Rightarrow x < -3$ là SAI. Chia hai vế cho $-2$, phải đổi chiều: $x > -3$. Đây là nguyên nhân #1 làm sai bất phương trình.
- **Nhầm $\\leq$ với $<$**: Trong code, \`>=\` cho phép bằng, \`>\` thì không. Lặp \`for i := 0; i <= n; i++\` chạy $n+1$ lần (bao gồm $i = n$), còn \`i < n\` chạy $n$ lần. Sai một chút là off-by-one bug.
- **Bắc cầu hỏng khi có dấu $=$**: $a \\leq b$ và $b < c$ thì $a < c$ (không phải $a \\leq c$). Phải cẩn thận khi mix $\\leq$ với $<$.

#### ❓ Câu hỏi tự nhiên của người đọc

**Q: Có thứ tự cho số phức không?** Không có thứ tự "tự nhiên" cho $\\mathbb{C}$ — không thể nói $i < 1$ hay $i > 1$. $\\mathbb{R}$ có thứ tự toàn phần; $\\mathbb{C}$ thì không (chỉ có thứ tự một phần qua module $\\lvert z \\rvert$).

**Q: $0.1 + 0.2 > 0.3$ đúng hay sai?** Trong float IEEE 754, $0.1 + 0.2 = 0.30000000000000004 > 0.3$. Đúng theo so sánh bit. Nhưng "về toán", chúng bằng nhau. Đây là một bẫy khi viết code với float.

#### 🔁 Dừng lại tự kiểm tra

Giải bất phương trình $-3x + 5 > 11$.

<details>
<summary>Đáp án</summary>

$-3x + 5 > 11 \\Rightarrow -3x > 6$ (trừ 5 hai vế, không đổi chiều) $\\Rightarrow x < -2$ (chia cho $-3$, **ĐỔI CHIỀU**).
Kiểm tra: lấy $x = -3$ (thỏa $x < -2$), thay vào: $-3 \\cdot (-3) + 5 = 9 + 5 = 14 > 11$. ✓
</details>

### 2.3. Số đối (additive inverse)

**Số đối** của $a$ là số $-a$ — số mà cộng với $a$ ra $0$.

$$a + (-a) = 0$$

Trên trục số, $a$ và $-a$ đối xứng qua gốc 0. Ví dụ số đối của $3$ là $-3$; số đối của $-2.5$ là $2.5$. Số đối của $0$ là chính nó.

#### 5 ví dụ về số đối

| $a$ | Số đối $-a$ | Tổng $a + (-a)$ |
|-----|-------------|-----------------|
| $7$ | $-7$ | $0$ |
| $-4$ | $4$ (vì $-(-4) = 4$) | $0$ |
| $0$ | $0$ | $0$ |
| $\\frac{1}{2}$ | $-\\frac{1}{2}$ | $0$ |
| $\\pi$ | $-\\pi$ | $0$ |
| $\\sqrt{2}$ | $-\\sqrt{2}$ | $0$ |

#### ⚠ Lỗi thường gặp

- **Nhầm $-a$ luôn âm**: Như đã nói ở §1.2 — nếu $a = -5$ thì $-a = 5$ (dương). "Số đối" không phải "số âm". Ký hiệu $-$ ở đây là toán tử "đổi dấu", không phải "âm tuyệt đối".

### 2.4. Số nghịch đảo (multiplicative inverse)

**Số nghịch đảo** của $a$ (với $a \\neq 0$) là $\\frac{1}{a}$ — số mà nhân với $a$ ra $1$.

$$a \\times \\frac{1}{a} = 1$$

Ví dụ: nghịch đảo của $2$ là $0.5$; nghịch đảo của $-3$ là $-\\frac{1}{3} \\approx -0.333\\ldots$. **Số 0 không có nghịch đảo** — đó là lý do chia cho 0 vô nghĩa.

Phân biệt: *đối* dùng với phép cộng, *nghịch đảo* dùng với phép nhân. Đừng nhầm $-3$ (đối của 3) với $\\frac{1}{3}$ (nghịch đảo của 3).

#### 5 ví dụ về số nghịch đảo

| $a$ | Nghịch đảo $\\frac{1}{a}$ | Tích $a \\times \\frac{1}{a}$ |
|-----|------------------|-------------------|
| $5$ | $\\frac{1}{5} = 0.2$ | $1$ |
| $-2$ | $-\\frac{1}{2} = -0.5$ | $1$ |
| $\\frac{2}{3}$ | $\\frac{3}{2} = 1.5$ | $1$ |
| $\\sqrt{2}$ | $\\frac{1}{\\sqrt{2}} = \\frac{\\sqrt{2}}{2} \\approx 0.707$ | $1$ |
| $0$ | KHÔNG TỒN TẠI | — |

Mẹo với phân số: nghịch đảo của $\\frac{p}{q}$ là $\\frac{q}{p}$ (lật ngược). Vd nghịch đảo của $\\frac{2}{3}$ là $\\frac{3}{2}$, nghịch đảo của $-\\frac{7}{4}$ là $-\\frac{4}{7}$.

#### ❓ Câu hỏi tự nhiên của người đọc

**Q: Vì sao 0 không có nghịch đảo?** Vì không tồn tại $x$ nào sao cho $0 \\cdot x = 1$. Mọi $0 \\cdot x = 0$. Nếu cho phép $\\frac{1}{0}$, ta phá tính nhất quán của hệ thống số.

**Q: Số đối + số nghịch đảo cùng tồn tại với mọi số khác 0?** Đúng. Mọi $a \\in \\mathbb{R}$ đều có số đối $-a \\in \\mathbb{R}$. Mọi $a \\in \\mathbb{R} \\setminus \\{0\\}$ có nghịch đảo $\\frac{1}{a} \\in \\mathbb{R}$. Đây là hai tính chất "có nghịch đảo" của $\\mathbb{R}$ dưới $+$ và $\\times$, biến $\\mathbb{R}$ thành **trường** (field) trong đại số trừu tượng.

#### 📝 Tóm tắt mục 2

- Trục số: ánh xạ 1-1 với $\\mathbb{R}$.
- Thứ tự: phản xạ + phản đối xứng + bắc cầu + toàn phần.
- Quy tắc nhân với số âm: **đổi chiều bất đẳng thức** — bẫy phổ biến.
- Số đối: $a + (-a) = 0$, đối xứng qua 0.
- Số nghịch đảo: $a \\times \\frac{1}{a} = 1$, không tồn tại với 0.

## 3. Giá trị tuyệt đối |x|

### 3.1. Định nghĩa hình học (cách nên nhớ)

#### 💡 Trực giác / Hình dung

Hãy hình dung bạn đang đứng tại vị trí $x$ trên trục số. Câu hỏi: "Bạn cách gốc 0 bao xa?" Câu trả lời chính là $\\lvert x \\rvert$. **Khoảng cách không bao giờ âm** — dù bạn đứng bên phải (vị trí dương) hay bên trái (vị trí âm) của gốc.

Đây là lý do $\\lvert x \\rvert$ luôn $\\geq 0$, dù $x$ có âm hay dương.

$\\lvert x \\rvert$ = **khoảng cách từ x tới 0 trên trục số**. Vì khoảng cách luôn không âm, $\\lvert x \\rvert \\geq 0$ luôn đúng.

\`\`\`
        |−3|=3              |2|=2
       ←─────────────│─────────────►
       -3    -2   -1   0    1    2
\`\`\`

Cả $-3$ và $3$ cách $0$ đúng 3 đơn vị, nên $\\lvert -3 \\rvert = \\lvert 3 \\rvert = 3$.

### 3.2. Định nghĩa hình thức

$$\\lvert x \\rvert = \\begin{cases} x & \\text{nếu } x \\geq 0 \\\\ -x & \\text{nếu } x < 0 \\end{cases}$$

Đọc bằng tiếng Việt: "nếu x không âm thì lấy luôn x; nếu x âm thì lấy $-x$ để biến thành dương".

→ Đây là lý do nhiều người gọi $\\lvert x \\rvert$ là "bỏ dấu trừ" — đúng, nhưng định nghĩa hình học (khoảng cách) tổng quát và đẹp hơn, vì nó mở rộng được sang vector: $\\lVert v \\rVert$ của vector cũng là "khoảng cách tới gốc".

### 3.3. Khoảng cách giữa hai số

$$\\text{khoảng cách}(a, b) = \\lvert a - b \\rvert = \\lvert b - a \\rvert$$

Ví dụ khoảng cách giữa $3$ và $7$: $\\lvert 3 - 7 \\rvert = \\lvert -4 \\rvert = 4$. Cũng bằng $\\lvert 7 - 3 \\rvert = 4$ — đối xứng.

### 3.4. Tính tay 5 ví dụ

| Biểu thức | Bước tính | Kết quả |
|-----------|-----------|---------|
| $\\lvert -7 \\rvert$ | $-7 < 0$ → lấy $-(-7)$ | $7$ |
| $\\lvert 3 \\rvert$ | $3 \\geq 0$ → lấy chính nó | $3$ |
| $\\lvert 0 \\rvert$ | $0 \\geq 0$ → lấy chính nó | $0$ |
| $\\lvert 3 - 8 \\rvert$ | $3 - 8 = -5$, sau đó $\\lvert -5 \\rvert$ | $5$ |
| $\\lvert -2 + 5 \\rvert$ | $-2 + 5 = 3$, sau đó $\\lvert 3 \\rvert$ | $3$ |

**Lưu ý quan trọng**: tính bên trong dấu $\\lvert\\ \\rvert$ trước, rồi mới lấy giá trị tuyệt đối. $\\lvert 3 - 8 \\rvert$ không phải $\\lvert 3 \\rvert - \\lvert 8 \\rvert = 3 - 8 = -5$. Phép $\\lvert \\cdot \\rvert$ không phân phối qua phép trừ.

### 3.5. Tính chất (cần thuộc)

- $\\lvert x \\rvert \\geq 0$ luôn, và $\\lvert x \\rvert = 0 \\Leftrightarrow x = 0$.
- $\\lvert -x \\rvert = \\lvert x \\rvert$.
- $\\lvert xy \\rvert = \\lvert x \\rvert \\cdot \\lvert y \\rvert$.
- $\\lvert x + y \\rvert \\leq \\lvert x \\rvert + \\lvert y \\rvert$ — **bất đẳng thức tam giác** (sẽ xuất hiện lại khi học vector).

#### Walk-through từng tính chất

**Tính chất 1: $\\lvert x \\rvert \\geq 0$ và $\\lvert x \\rvert = 0 \\Leftrightarrow x = 0$.**
- Ví dụ $\\lvert 3 \\rvert = 3 \\geq 0$ ✓, $\\lvert -7 \\rvert = 7 \\geq 0$ ✓, $\\lvert 0 \\rvert = 0$ (chỉ khi $x = 0$).
- Diễn giải hình học: khoảng cách luôn $\\geq 0$, và bằng 0 chỉ khi bạn đứng ngay tại gốc.

**Tính chất 2: $\\lvert -x \\rvert = \\lvert x \\rvert$.**
- Ví dụ $\\lvert -5 \\rvert = 5 = \\lvert 5 \\rvert$ ✓, $\\lvert -\\pi \\rvert = \\pi = \\lvert \\pi \\rvert$ ✓, $\\lvert -(-3) \\rvert = \\lvert 3 \\rvert = 3$ ✓.
- Diễn giải hình học: $x$ và $-x$ đối xứng qua 0, nên khoảng cách tới 0 bằng nhau.

**Tính chất 3: $\\lvert xy \\rvert = \\lvert x \\rvert \\cdot \\lvert y \\rvert$ (phân phối qua phép nhân).**
- Ví dụ: $\\lvert (-3) \\cdot 4 \\rvert = \\lvert -12 \\rvert = 12 = 3 \\cdot 4 = \\lvert -3 \\rvert \\cdot \\lvert 4 \\rvert$ ✓.
- Ví dụ: $\\lvert 2 \\cdot (-5) \\rvert = \\lvert -10 \\rvert = 10 = 2 \\cdot 5 = \\lvert 2 \\rvert \\cdot \\lvert -5 \\rvert$ ✓.
- Chứng minh ngắn: bốn trường hợp dấu của $x, y$. Trường hợp nào cũng cho $\\lvert xy \\rvert = \\lvert x \\rvert \\cdot \\lvert y \\rvert$.

**Tính chất 4: $\\lvert x + y \\rvert \\leq \\lvert x \\rvert + \\lvert y \\rvert$ — bất đẳng thức tam giác.**
- Ví dụ cùng dấu: $\\lvert 3 + 4 \\rvert = 7 = 3 + 4 = \\lvert 3 \\rvert + \\lvert 4 \\rvert$ → bằng (dấu $=$).
- Ví dụ khác dấu: $\\lvert 3 + (-4) \\rvert = \\lvert -1 \\rvert = 1 < 3 + 4 = 7$ → nhỏ hơn thực sự.
- Ví dụ khác dấu cân bằng: $\\lvert 5 + (-5) \\rvert = 0 < 10$ → cực đoan.
- Diễn giải: khi $x, y$ cùng dấu, đi cùng chiều, tổng quãng đường cộng lại. Khi khác dấu, ngược chiều, triệt tiêu một phần → ngắn hơn.

#### Bất đẳng thức tam giác đảo

Ít người biết: $\\lvert \\lvert x \\rvert - \\lvert y \\rvert \\rvert \\leq \\lvert x - y \\rvert$.

Walk-through:
- $x = 5, y = 3$: $\\lvert \\lvert 5 \\rvert - \\lvert 3 \\rvert \\rvert = 2$, $\\lvert 5 - 3 \\rvert = 2$. Bằng nhau.
- $x = 5, y = -3$: $\\lvert \\lvert 5 \\rvert - \\lvert -3 \\rvert \\rvert = \\lvert 5 - 3 \\rvert = 2$, $\\lvert 5 - (-3) \\rvert = 8$. $2 \\leq 8$ ✓.
- $x = -7, y = 2$: $\\lvert \\lvert -7 \\rvert - \\lvert 2 \\rvert \\rvert = \\lvert 7 - 2 \\rvert = 5$, $\\lvert -7 - 2 \\rvert = 9$. $5 \\leq 9$ ✓.

#### ⚠ Lỗi thường gặp với tính chất

- **Tưởng $\\lvert x + y \\rvert = \\lvert x \\rvert + \\lvert y \\rvert$**: Sai. Chỉ bằng khi cùng dấu (hoặc một trong hai = 0). Còn lại là nhỏ hơn ($<$).
- **Tưởng $\\lvert x - y \\rvert = \\lvert x \\rvert - \\lvert y \\rvert$**: Sai hoàn toàn. Ví dụ $\\lvert 3 - 5 \\rvert = 2$ nhưng $\\lvert 3 \\rvert - \\lvert 5 \\rvert = -2$. Không có công thức "phân phối" cho phép trừ qua $\\lvert \\cdot \\rvert$.
- **Trong code Go**: dùng \`math.Abs(x)\` cho float64. Với int, viết tay: \`if x < 0 { x = -x }\`. Cẩn thận: \`math.Abs(math.MinInt32)\` overflow (vì $-\\text{MinInt32} > \\text{MaxInt32}$).

#### ❓ Câu hỏi tự nhiên của người đọc

**Q: Vì sao gọi là "bất đẳng thức TAM GIÁC"?** Vì nó tổng quát hóa thành: trong tam giác, độ dài một cạnh $\\leq$ tổng độ dài hai cạnh kia. Trên trục số (1 chiều), tam giác "suy biến" thành đoạn thẳng — bất đẳng thức vẫn đúng, dấu bằng xảy ra khi tam giác "dẹp" (3 đỉnh thẳng hàng cùng phía). Khi học vector ở Tầng 4, ta thấy $\\lVert u + v \\rVert \\leq \\lVert u \\rVert + \\lVert v \\rVert$ — chính là phiên bản đa chiều.

**Q: $\\lvert \\cdot \\rvert$ có hoạt động được trên số phức không?** Có. $\\lvert a + bi \\rvert = \\sqrt{a^2 + b^2}$ — khoảng cách từ điểm $(a, b)$ tới gốc trong mặt phẳng phức. Tất cả 4 tính chất trên đều vẫn đúng.

**Q: Mối liên hệ với $\\sqrt{x^2}$?** $\\lvert x \\rvert = \\sqrt{x^2}$. Quy ước $\\sqrt{\\ }$ luôn trả về giá trị **không âm**. Vd $\\sqrt{(-3)^2} = \\sqrt{9} = 3 = \\lvert -3 \\rvert$. Đây là một cách tính $\\lvert x \\rvert$ bằng phép đại số (không cần phân tích case).

#### 🔁 Dừng lại tự kiểm tra

1. Tính $\\lvert 3 - \\sqrt{2} \\cdot \\sqrt{2} \\rvert$.
2. Bất đẳng thức $\\lvert x - 5 \\rvert < 2$ mô tả tập số nào?

<details>
<summary>Đáp án</summary>

1. $\\sqrt{2} \\cdot \\sqrt{2} = 2$. $\\lvert 3 - 2 \\rvert = \\lvert 1 \\rvert = 1$.
2. Khoảng cách từ $x$ tới $5$ nhỏ hơn 2 ⇒ $x$ nằm trong khoảng $(3, 7)$. Tức $3 < x < 7$.
</details>

#### 📝 Tóm tắt mục 3

- $\\lvert x \\rvert$ = khoảng cách từ $x$ tới 0; luôn $\\geq 0$.
- 4 tính chất: dương, đối xứng, phân phối qua nhân, bất đẳng thức tam giác.
- $\\lvert \\cdot \\rvert$ KHÔNG phân phối qua $+$, $-$. Chỉ $\\leq$ (tam giác).
- Trong code Go: \`math.Abs(x)\` cho float, viết tay cho int.

## 4. Số vô tỉ — vì sao √2 không phải hữu tỉ?

#### 💡 Trực giác / Hình dung

Tại sao "đường chéo của hình vuông cạnh 1 không phải phân số"? Thử nghĩ thế này: nếu $\\sqrt{2} = \\frac{p}{q}$ thì ta có thể "đo" đường chéo bằng đơn vị $\\frac{1}{q}$ — đúng $p$ đơn vị, không thừa không thiếu. Người Hy Lạp cổ tin chuyện này — họ tin "mọi đoạn thẳng đều có chung một đơn vị đo nhỏ đủ" (gọi là *commensurable*). Khi Hippasus chứng minh không có đơn vị nào "vừa" cả cạnh 1 lẫn đường chéo, đó là cú sốc lớn cho toán học cổ đại.

Khẳng định: **không tồn tại hai số nguyên $p, q$ ($q \\neq 0$) sao cho $\\sqrt{2} = \\frac{p}{q}$** (giả sử phân số đã tối giản).

Chứng minh bằng **phản chứng** (proof by contradiction). Lập luận: giả sử điều ngược lại là đúng, dẫn đến mâu thuẫn → giả thiết sai → điều ban đầu đúng.

**Bước 1 — Giả thiết phản chứng.** Giả sử ngược lại: $\\sqrt{2} = \\frac{p}{q}$ với $p, q$ nguyên, $q \\neq 0$, và phân số $\\frac{p}{q}$ **đã tối giản** (tức là $\\gcd(p, q) = 1$, không có ước chung > 1).

*Vì sao đòi tối giản?* Vì nếu $\\frac{p}{q}$ chưa tối giản, ta luôn rút gọn được (chia cả tử lẫn mẫu cho $\\gcd$) để thành dạng tối giản. Vd $\\sqrt{2} = \\frac{4}{2} \\cdot ?$ — nếu là thế thì rút gọn thành $\\frac{2}{1}$, cho $\\sqrt{2} = 2$ (sai). Tóm lại: nếu $\\sqrt{2}$ là hữu tỉ, **luôn có** một biểu diễn tối giản. Giả thiết tối giản giúp mâu thuẫn lộ ra ở Bước 5.

**Bước 2 — Bình phương hai vế.** Vì $\\sqrt{2} = \\frac{p}{q}$, bình phương cả hai vế:

$$(\\sqrt{2})^2 = \\left(\\frac{p}{q}\\right)^2 \\quad\\Longrightarrow\\quad 2 = \\frac{p^2}{q^2}$$

Nhân chéo hai vế với $q^2$ (luôn dương, không đổi chiều nếu có bất đẳng thức — ở đây là đẳng thức nên không quan trọng):

$$2q^2 = p^2 \\qquad (*) \\text{ — đây là phương trình chìa khóa}$$

*Vì sao bình phương được?* Vì cả hai vế dương ($\\sqrt{2} > 0$ và $\\frac{p}{q}$ cùng dấu sau khi quy ước $p, q$ cùng dấu hoặc ta lấy giá trị tuyệt đối). Bình phương không làm mất nghiệm trong tình huống này.

**Bước 3 — Suy ra \`p\` chẵn.**

Từ (*), $p^2 = 2q^2$ chia hết cho 2 (vì vế phải có thừa số 2). Tức $p^2$ chẵn.

*Bổ đề:* nếu $p^2$ chẵn thì $p$ chẵn.

*Chứng minh bổ đề (đối ngẫu — contrapositive):* giả sử $p$ lẻ, viết $p = 2m + 1$ với $m$ nguyên. Khi đó:

$$p^2 = (2m+1)^2 = 4m^2 + 4m + 1 = 2(2m^2 + 2m) + 1$$

Đây là số lẻ (dạng $2k + 1$). Vậy $p$ lẻ $\\Rightarrow p^2$ lẻ. Đối ngẫu: $p^2$ chẵn $\\Rightarrow p$ chẵn. □ bổ đề.

Áp dụng bổ đề: từ $p^2$ chẵn, suy ra $p$ chẵn. Tức tồn tại số nguyên $k$ để $p = 2k$.

**Bước 4 — Suy ra \`q\` chẵn.**

Thay $p = 2k$ vào (*):

$$\\begin{aligned}
2q^2 &= (2k)^2 \\\\
2q^2 &= 4k^2 \\\\
q^2 &= 2k^2 \\qquad \\text{(chia hai vế cho 2)}
\\end{aligned}$$

Vế phải $2k^2$ chia hết cho 2 $\\Rightarrow q^2$ chẵn. Áp dụng lại bổ đề ở Bước 3: $q^2$ chẵn $\\Rightarrow q$ chẵn.

**Bước 5 — Mâu thuẫn.**

Đã chứng minh: $p$ chẵn và $q$ chẵn. Tức cả $p$ và $q$ chia hết cho 2. Nghĩa là $\\gcd(p, q) \\geq 2$, **mâu thuẫn** với giả thiết "phân số tối giản" ($\\gcd(p, q) = 1$).

**Bước 6 — Kết luận.**

Giả thiết "$\\sqrt{2}$ hữu tỉ" dẫn tới mâu thuẫn. Theo logic phản chứng, giả thiết sai. Vậy **$\\sqrt{2}$ không hữu tỉ**, tức $\\sqrt{2} \\in \\mathbb{R} \\setminus \\mathbb{Q}$. □

#### ❓ Câu hỏi tự nhiên của người đọc

**Q: Vì sao chứng minh phản chứng "hợp lệ"?** Vì logic cổ điển có luật bài trung (law of excluded middle): mỗi mệnh đề hoặc đúng, hoặc sai, không có khả năng thứ ba. Nếu phủ định dẫn tới mâu thuẫn, mệnh đề gốc phải đúng. (Lưu ý: logic trực giác — intuitionistic — không công nhận điều này, nhưng đó là chuyện chuyên sâu.)

**Q: Bổ đề "p² chẵn ⇒ p chẵn" có dễ tổng quát không?** Có. Tổng quát: với mọi số nguyên tố $p$, nếu $p \\mid a^2$ (đọc: $p$ chia hết $a^2$) thì $p \\mid a$. Đây là hệ quả của **bổ đề Euclid**: nếu $p$ nguyên tố và $p \\mid ab$ thì $p \\mid a$ hoặc $p \\mid b$. Áp dụng cho $a^2 = a \\cdot a$ cho ngay kết quả.

**Q: Nếu thay 2 bằng số không nguyên tố thì sao?** Vd $\\sqrt{4} = 2$ — rõ là hữu tỉ. $\\sqrt{6}$ thì sao? Vẫn vô tỉ, vì $6 = 2 \\cdot 3$ và bổ đề Euclid áp dụng được cho thừa số nguyên tố 2 (hoặc 3). Tổng quát: $\\sqrt{n}$ hữu tỉ $\\Leftrightarrow n$ là số chính phương.

**Q: Vì sao chứng minh $\\pi$ vô tỉ khó hơn?** Vì $\\pi$ không phải nghiệm của đa thức hệ số nguyên (siêu việt) — không có "phương trình đại số" để khai thác. Chứng minh của Lambert (1761) dùng phân số liên tục cho $\\tan(x)$; chứng minh hiện đại dùng giải tích phức. Ngoài phạm vi của bài này.

Cách chứng minh tương tự áp dụng được cho $\\sqrt{3}$, $\\sqrt{5}$, $\\sqrt{p}$ với mọi số nguyên tố $p$ (sẽ làm $\\sqrt{3}$ ở bài tập 4).

#### 🔁 Dừng lại tự kiểm tra

Tại sao chứng minh trên KHÔNG hoạt động cho $\\sqrt{4}$? (Tức nếu áp dụng máy móc các bước thì lỗi ở đâu?)

<details>
<summary>Đáp án</summary>

Bước 3 sẽ ra $p^2 = 4q^2$, nói rằng $p^2$ chia hết cho 4. Suy ra $p$ chia hết cho 2, viết $p = 2k$. Thay vào: $4k^2 = 4q^2 \\Rightarrow k^2 = q^2$. Đây **không** suy ra $q$ chia hết cho 2 — $q$ có thể là bất kỳ số nào. Vậy không có mâu thuẫn. Đúng — vì $\\sqrt{4} = 2 = \\frac{2}{1}$ thật sự là hữu tỉ.
</details>

#### 📝 Tóm tắt mục 4

- Chứng minh phản chứng: giả định ngược, dẫn ra mâu thuẫn.
- Bước cốt lõi: bổ đề "$p^2$ chẵn $\\Rightarrow p$ chẵn" (đối ngẫu của "$p$ lẻ $\\Rightarrow p^2$ lẻ").
- Áp dụng được cho $\\sqrt{p}$ với mọi nguyên tố $p$.
- $\\sqrt{n}$ hữu tỉ $\\Leftrightarrow n$ chính phương.
- $\\pi$, $e$ vô tỉ và siêu việt — chứng minh khó hơn nhiều.

**Còn π và e thì sao?** Chứng minh $\\pi$ và $e$ vô tỉ khó hơn nhiều ($e$ được Euler chứng minh năm 1737, $\\pi$ được Lambert chứng minh năm 1761). Ở trình độ này, chỉ cần nhớ kết quả: cả hai đều vô tỉ và là số **siêu việt** (transcendental) — không phải nghiệm của bất kỳ đa thức hệ số nguyên nào.

### 4.1. "Vô tỉ" nghĩa là gì trực quan?

Theo nghĩa đen: *không có tỉ lệ* (no ratio). Tiếng Anh *irrational* cũng vậy — "ir-" (không) + "rational" (có ratio, tức tỉ lệ). **Vô tỉ = không viết được dưới dạng tỉ số $p/q$**.

Hệ quả thực tế:

- Phần thập phân **vô hạn và không tuần hoàn** (nếu tuần hoàn thì sẽ ra phân số).
- Mọi xấp xỉ thập phân hữu hạn của số vô tỉ đều là số **hữu tỉ khác**, không phải nó. $3.14159$ không phải $\\pi$; $1.41421$ không phải $\\sqrt{2}$.

## 5. Máy tính và số thực — vì sao 0.1 + 0.2 ≠ 0.3?

Đây là phần cầu nối tới ML/AI. Mọi mạng neural đều cộng-nhân các số thực; nếu bạn không hiểu sai số float, bạn sẽ debug được rất ít vấn đề "vì sao loss không hội tụ".

### 5.1. Thử trong Go

\`\`\`go
package main

import "fmt"

func main() {
    a := 0.1
    b := 0.2
    c := a + b
    fmt.Println(c)            // 0.30000000000000004
    fmt.Println(c == 0.3)     // false  ← sốc lần đầu nhìn
}
\`\`\`

Kết quả: $0.30000000000000004$, **không phải** $0.3$. Mọi ngôn ngữ dùng IEEE 754 (Go, Python, JavaScript, C++, Java, ...) đều cho cùng kết quả này. Đây không phải lỗi Go.

### 5.2. Vì sao? — IEEE 754 và nhị phân

#### 💡 Trực giác / Hình dung

Tưởng tượng bạn muốn ghi số $\\frac{1}{3}$ chính xác trong hệ 10. Bạn viết $0.333333333\\ldots$ — vô hạn chữ số 3. Nếu chỉ có 5 ô để ghi, bạn ghi $0.33333$ và **chấp nhận sai số** ở các chữ số sau.

$0.1$ trong hệ 10 trông tròn trịa, **nhưng trong hệ 2 thì giống như $\\frac{1}{3}$ trong hệ 10**: vô hạn chữ số tuần hoàn. Máy tính chỉ có 52 bit để ghi → phải cắt → có sai số.

#### Cấu trúc float64 (IEEE 754 double precision)

Máy tính lưu \`float64\` (\`double\`) dưới dạng nhị phân: 1 bit dấu + 11 bit mũ + 52 bit phần định trị (mantissa), tổng 64 bit.

\`\`\`
[sign: 1 bit] [exponent: 11 bits] [mantissa: 52 bits]
   s              eeee...e             mmmm...m
\`\`\`

Giá trị (cho số bình thường — normalized):

$$\\text{giá trị} = (-1)^s \\times (1.mmm\\ldots m)_2 \\times 2^{(e - 1023)}$$

Trong đó:
- $s$ (1 bit): dấu — 0 là dương, 1 là âm.
- $e$ (11 bit): mũ (exponent), được lưu với "bias" 1023. Tức $e_{\\text{thực}} = e - 1023$, phạm vi từ $-1022$ tới $+1023$.
- $mantissa$ (52 bit): phần định trị, ngầm hiểu có "1." ở đầu (gọi là **implicit leading 1**), cho tổng cộng 53 bit có nghĩa.

Với cấu trúc này, **số float64 hữu hạn nhất luôn có dạng**:

$$m \\times 2^e \\quad \\text{với } m \\text{ nguyên}, \\ \\lvert m \\rvert < 2^{53}, \\ e \\text{ nguyên}$$

Số nào không viết được dưới dạng này thì **không** lưu chính xác.

#### Walk-through: chuyển \`0.1\` sang nhị phân

Để chuyển phần thập phân từ hệ 10 sang hệ 2, **nhân với 2 liên tục, lấy phần nguyên làm bit**.

Bắt đầu với $0.1$:

| Bước | Phép tính | Phần nguyên (bit) | Phần thập phân còn lại |
|------|-----------|-------------------|------------------------|
| 1 | $0.1 \\times 2 = 0.2$ | $0$ | $0.2$ |
| 2 | $0.2 \\times 2 = 0.4$ | $0$ | $0.4$ |
| 3 | $0.4 \\times 2 = 0.8$ | $0$ | $0.8$ |
| 4 | $0.8 \\times 2 = 1.6$ | $1$ | $0.6$ |
| 5 | $0.6 \\times 2 = 1.2$ | $1$ | $0.2$ ← lặp lại! |
| 6 | $0.2 \\times 2 = 0.4$ | $0$ | $0.4$ |
| 7 | $0.4 \\times 2 = 0.8$ | $0$ | $0.8$ |
| 8 | $0.8 \\times 2 = 1.6$ | $1$ | $0.6$ |
| 9 | $0.6 \\times 2 = 1.2$ | $1$ | $0.2$ ← lặp tiếp |

Ta thấy: ngay sau 4 bước đầu ($0.0001$), phần thập phân quay về $0.2$ — chu kỳ "0011" lặp vô hạn.

$$0.1_{10} = 0.00011\\,0011\\,0011\\,0011\\ldots_2 \\quad \\text{(lặp \`\`0011'' vô hạn)}$$

*Vì sao lặp?* Vì $0.1 = \\frac{1}{10}$, và $10 = 2 \\cdot 5$. Hệ 2 chỉ "hợp" với lũy thừa của 2; thừa số 5 trong mẫu khiến biểu diễn nhị phân tuần hoàn. Tổng quát: $\\frac{1}{n}$ có biểu diễn hữu hạn trong hệ 2 $\\Leftrightarrow n = 2^k$.

#### Vì sao IEEE 754 chỉ giữ 52 bit?

Mantissa 52 bit + leading 1 ngầm = 53 bit có nghĩa. Đây là quyết định cân bằng:
- Nhiều bit hơn → chính xác hơn nhưng tốn RAM.
- 64 bit tổng (8 byte) khớp với word size phổ biến của CPU.

53 bit nghĩa cho **độ chính xác tương đối $\\approx 2^{-53} \\approx 1.11 \\times 10^{-16}$**. Tức \`float64\` chính xác đến khoảng **15-17 chữ số thập phân**.

#### Cụ thể: 52 bit đầu của \`0.1\`

Cắt sau 52 bit mantissa (lấy normalized form):

\`\`\`
0.1₁₀ ≈ 1.1001100110011001100110011001100110011001100110011010 × 2⁻⁴
        ↑                                                       ↑
   leading "1" ngầm                              bit cuối (làm tròn)
\`\`\`

Bit cuối là $0$ hay $1$ tùy quy tắc làm tròn (round-to-nearest, ties-to-even — quy tắc mặc định của IEEE 754). Số được lưu thực ra là:

$$0.1 \\ (\\text{lưu}) = 0.1000000000000000055511151231257827021181583404541015625$$

Hai số "$0.1_{10}$ thật" và "$0.1$ (lưu)" lệch nhau ở chữ số thứ 17. Tương tự "$0.2$ (lưu)" cũng lệch.

#### Cộng \`0.1 + 0.2\`

Khi cộng hai số đã có sai số nhỏ, sai số có thể **không triệt tiêu** mà cộng lại:

$$\\begin{aligned}
0.1 \\ (\\text{lưu}) &\\approx 0.1000000000000000055\\ldots \\\\
0.2 \\ (\\text{lưu}) &\\approx 0.2000000000000000111\\ldots \\\\[4pt]
\\text{tổng} &\\approx 0.3000000000000000166\\ldots
\\end{aligned}$$

Tổng này tiếp tục được làm tròn về 53 bit → ra $0.30000000000000004$ (như Go in ra).

So với "$0.3$ (lưu) $\\approx 0.2999999999999999889\\ldots$", ta thấy $0.1 + 0.2 \\neq 0.3$ trong IEEE 754.

#### Bảng các số float "chính xác" và "không chính xác"

| Số (hệ 10) | Có chính xác trong float64? | Lý do |
|------------|------------------------------|-------|
| $0$ | ✓ | $0 \\times 2^0$ |
| $0.5$ | ✓ | $1 \\times 2^{-1}$ |
| $0.25$ | ✓ | $1 \\times 2^{-2}$ |
| $0.75$ | ✓ | $3 \\times 2^{-2}$ ($3 = 11_2$ vừa) |
| $1.0$ | ✓ | $1 \\times 2^0$ |
| $0.1$ | ✗ | Mẫu có thừa số 5, lặp vô hạn |
| $0.2$ | ✗ | Tương tự |
| $0.3$ | ✗ | Tương tự |
| $\\frac{1}{3}$ | ✗ | Mẫu có thừa số 3 |
| $\\pi$ | ✗ | Vô tỉ, vô hạn không tuần hoàn |
| $2^{53} + 1$ | ✗ | Quá lớn, vượt 53 bit có nghĩa |

#### ⚠ Lỗi thường gặp

- **So sánh float bằng \`==\`**: như đã nói. Luôn dùng \`almostEqual\`.
- **Cộng dồn nhiều lần**: sai số tích lũy. \`for { s += 0.1 }\` 100 lần ra một số khá lệch.
- **Trừ hai số gần nhau** (catastrophic cancellation): $(1.0 + 10^{-15}) - 1.0$ ra $1.1 \\times 10^{-15}$ thay vì $10^{-15}$ — mất hầu hết bit nghĩa.
- **Lưu tiền tệ bằng float**: SAI nghiêm trọng. $0.1 + 0.2 \\neq 0.3$ nghĩa là "1 đồng + 2 đồng ≠ 3 đồng" trong code. Tiền tệ phải dùng integer (đơn vị nhỏ nhất, vd cent) hoặc decimal type.

### 5.3. Cộng xấp xỉ — \`almostEqual\`

Hệ quả: **không bao giờ so sánh trực tiếp hai số float bằng \`==\`**. Thay vào đó, so sánh "đủ gần".

\`\`\`go
func almostEqual(a, b, eps float64) bool {
    // Lấy giá trị tuyệt đối hiệu, so với epsilon
    diff := a - b
    if diff < 0 {
        diff = -diff
    }
    return diff < eps
}

// Dùng:
almostEqual(0.1+0.2, 0.3, 1e-9)   // true
\`\`\`

\`eps\` thường chọn $10^{-9}$ cho \`float64\` thông thường. Cẩn thận hơn (relative epsilon) thì chia cho $\\max(\\lvert a \\rvert, \\lvert b \\rvert)$, nhưng $10^{-9}$ đủ dùng cho phần lớn trường hợp ML.

### 5.4. Câu hỏi tự nhiên

**Q: Số nào trong float là chính xác?**

Bất kỳ số nào viết được dưới dạng $m \\times 2^e$ với $m, e$ nguyên và $m$ vừa trong 52 bit. Ví dụ $0.5 = 2^{-1}$, $0.25 = 2^{-2}$, $0.125 = 2^{-3}$ đều chính xác. Cộng/trừ/nhân chúng vẫn chính xác. Nhưng $0.1, 0.2, 0.3$ đều không.

**Q: Sai số có tích lũy không?**

Có. Nếu cộng $0.1$ mười lần:

\`\`\`go
s := 0.0
for i := 0; i < 10; i++ { s += 0.1 }
fmt.Println(s)        // 0.9999999999999999, không phải 1.0
\`\`\`

Trong huấn luyện neural network, hàng tỷ phép cộng/nhân tích lũy sai số là chuyện thường. Đây là lý do người ta dùng kỹ thuật như **Kahan summation**, **mixed precision** (fp16 + fp32), **gradient clipping**.

**Q: Có cách nào tính \`0.1 + 0.2 = 0.3\` chính xác không?**

Có — dùng số thập phân (decimal) hoặc phân số (rational/big-rational). Go có \`math/big\`: \`big.Float\`, \`big.Rat\`. Nhưng chậm hơn nhiều, chỉ dùng khi cần (vd tiền tệ — không bao giờ lưu tiền bằng float).

**Q: Có liên quan gì đến ML?**

Rất nhiều. Loss function của bạn được tính bằng float, gradient được tính bằng float, weight được cập nhật bằng float. Khi loss "không hội tụ" hoặc "NaN", thường là do sai số float (vd $\\log(0)$, $\\frac{0}{0}$, overflow). Hiểu được điều này giúp bạn debug nhanh hơn 10 lần.

#### 🔁 Dừng lại tự kiểm tra

1. \`0.5 + 0.25 == 0.75\` trả về gì trong Go?
2. \`0.1 + 0.1 + 0.1 == 0.3\` trả về gì?

<details>
<summary>Đáp án</summary>

1. \`true\`. Vì $0.5$, $0.25$, $0.75$ đều có biểu diễn nhị phân chính xác (đều là phân số mẫu lũy thừa của 2).
2. \`false\`. $0.1$ không chính xác → cộng 3 lần ra $0.30000000000000004$, không bằng $0.3$ (cũng không chính xác).
</details>

#### 📝 Tóm tắt mục 5

- Float64 = 1 dấu + 11 mũ + 52 mantissa, độ chính xác $\\approx$ 15-17 chữ số thập phân.
- $0.1$ trong nhị phân lặp "0011" vô hạn → phải cắt → sai số.
- KHÔNG so sánh float bằng \`==\`. Dùng \`almostEqual(a, b, eps)\`.
- Sai số tích lũy trong vòng lặp dài (ML training).
- Tiền tệ KHÔNG dùng float. Dùng int (cent) hoặc decimal.

## 6. Liên hệ với các tầng sau

Bài này có vẻ "tủn mủn" — sao lại học những thứ tiểu học khi mục tiêu là ML/AI? Vì tất cả tầng sau xây trên nó:

- **Vector arithmetic** (Tầng 4): vector là tuple $(x_1, x_2, \\ldots, x_n)$ với $x_i \\in \\mathbb{R}$. Cộng vector = cộng từng thành phần. Để hiểu, phải hiểu cộng số thực trước.
- **Norm L1** = $\\lVert v \\rVert_1 = \\lvert v_1 \\rvert + \\lvert v_2 \\rvert + \\ldots + \\lvert v_n \\rvert$. Đây chính là giá trị tuyệt đối, áp dụng từng thành phần rồi cộng.
- **Norm L2** = $\\lVert v \\rVert_2 = \\sqrt{v_1^2 + v_2^2 + \\ldots + v_n^2}$. Có căn — cần biết căn thì vô tỉ.
- **Embedding space**: BERT embedding 768 chiều là một điểm trong $\\mathbb{R}^{768}$. "Cosine similarity" đo góc giữa hai điểm ở đó.
- **Logarit và cross-entropy loss** (Tầng 1, Lesson 04 + 07): loss $= -\\log(p)$. Khi $p$ rất nhỏ (do float underflow), $\\log$ ra $-\\infty$ → NaN. Cần "log-sum-exp trick".
- **So sánh và thứ tự**: \`argmax\` chọn chỉ số có giá trị lớn nhất; \`top-k\` chọn k phần tử lớn nhất. Cả hai đều cần phép $<$/$>$ mà ta định nghĩa ở §2.

→ Nếu §1–§5 của bài này là "bê tông móng", thì cả ML/AI là tòa nhà ngồi trên móng đó.

#### Walk-through nhỏ: từ số tới embedding

Giả sử ta có một embedding 3 chiều cho từ "mèo": $v = (0.42, -0.31, 0.78)$. Đây là 3 số thực, mỗi số thuộc $\\mathbb{R}$. Tính:

- **Norm L2**: $\\lVert v \\rVert_2 = \\sqrt{0.42^2 + (-0.31)^2 + 0.78^2} = \\sqrt{0.1764 + 0.0961 + 0.6084} = \\sqrt{0.8809} \\approx 0.9386$.
  - Bên trong dùng: bình phương (mỗi thành phần $\\in \\mathbb{R}$ → bình phương vẫn $\\in \\mathbb{R}$), cộng (đóng trong $\\mathbb{R}$), căn bậc hai (kết quả $\\in \\mathbb{R}$).
  - Tất cả là phép trên số thực mà bạn đã học ở bài này.

- **Norm L1**: $\\lVert v \\rVert_1 = \\lvert 0.42 \\rvert + \\lvert -0.31 \\rvert + \\lvert 0.78 \\rvert = 0.42 + 0.31 + 0.78 = 1.51$. Dùng $\\lvert \\cdot \\rvert$ từ §3.

- **So sánh hai embedding**: muốn biết "mèo" gần "chó" hơn hay "máy bay" hơn? Tính \`cosine_similarity(v_mèo, v_chó)\` và \`cosine_similarity(v_mèo, v_máybay)\`, dùng $>$ (§2.2) để so sánh.

Bạn thấy đấy — không có khái niệm nào trong ML mà không xài ít nhất một thứ từ Lesson 01 này.

#### 📝 Tóm tắt mục 6

- $\\mathbb{R}$ là "không gian sống" của vector ML.
- Norm L1 = tổng $\\lvert \\cdot \\rvert$ từng thành phần.
- Norm L2 = căn của tổng bình phương — cần vô tỉ.
- So sánh embedding cần thứ tự $<$, $>$.
- Float precision (§5) là gốc rễ của nhiều bug trong training.

## 7. Bài tập

**Bài 1.** Phân loại các số sau vào $\\mathbb{N}$, $\\mathbb{Z}$, $\\mathbb{Q}$, $\\mathbb{R} \\setminus \\mathbb{Q}$ (mỗi số ghi đầy đủ các tập mà nó thuộc):

$0$, $-3$, $0.5$, $\\sqrt{2}$, $\\pi$, $-1.5$, $\\frac{22}{7}$, $0.333\\ldots$, $\\sqrt{4}$, $-0$

**Bài 2.** Tính:

$\\lvert -7 \\rvert$, $\\lvert 3 \\rvert$, $\\lvert 0 \\rvert$, $\\lvert 3 - 8 \\rvert$, $\\lvert -2 + 5 \\rvert$, $\\lvert -4 \\rvert \\cdot \\lvert -2 \\rvert$, $\\lvert \\lvert -5 \\rvert - \\lvert 3 \\rvert \\rvert$

**Bài 3.** So sánh (đặt $<$, $>$, hoặc $=$):

a) $\\frac{22}{7}$ vs $\\pi$
b) $0.999\\ldots$ vs $1$
c) $\\sqrt{2}$ vs $1.414$
d) $-\\lvert -3 \\rvert$ vs $-3$
e) $\\lvert -5 \\rvert$ vs $\\lvert 3 - 8 \\rvert$

**Bài 4.** Chứng minh $\\sqrt{3}$ vô tỉ. (Gợi ý: phản chứng tương tự $\\sqrt{2}$ ở §4. Lưu ý chỗ "p chẵn vì $p^2$ chẵn" phải đổi: với mod 3, dùng "nếu $p^2$ chia hết cho 3 thì $p$ chia hết cho 3".)

**Bài 5.** Viết hàm Go:

\`\`\`go
func almostEqual(a, b, eps float64) bool
\`\`\`

trả về \`true\` nếu $\\lvert a - b \\rvert < eps$. Sau đó:

a) Giải thích vì sao **không** dùng \`a == b\` trực tiếp với \`float64\`.
b) Cho ví dụ một cặp $(a, b)$ mà bằng nhau "về toán" nhưng \`a == b\` trả về \`false\`.
c) Cảnh báo: với $eps = 10^{-9}$, hàm này hoạt động đúng với số "vừa phải" (vd 0.1..1000), nhưng có thể sai với số rất lớn hoặc rất nhỏ. Vì sao?

## Lời giải chi tiết

### Bài 1

Lưu ý $\\mathbb{N} \\subset \\mathbb{Z} \\subset \\mathbb{Q} \\subset \\mathbb{R}$, nên một số thuộc $\\mathbb{N}$ cũng tự động thuộc $\\mathbb{Z}, \\mathbb{Q}, \\mathbb{R}$.

| Số | $\\mathbb{N}$ | $\\mathbb{Z}$ | $\\mathbb{Q}$ | $\\mathbb{R} \\setminus \\mathbb{Q}$ | Giải thích |
|----|---|---|---|------|------------|
| $0$ | ✓ | ✓ | ✓ | | Số tự nhiên (theo quy ước có 0). |
| $-3$ | | ✓ | ✓ | | Nguyên âm, không tự nhiên. |
| $0.5$ | | | ✓ | | $= \\frac{1}{2}$, hữu tỉ. |
| $\\sqrt{2}$ | | | | ✓ | Vô tỉ (chứng minh §4). |
| $\\pi$ | | | | ✓ | Vô tỉ (cả siêu việt). |
| $-1.5$ | | | ✓ | | $= -\\frac{3}{2}$, hữu tỉ. |
| $\\frac{22}{7}$ | | | ✓ | | Phân số, hữu tỉ. **Không phải $\\pi$**, chỉ xấp xỉ. |
| $0.333\\ldots$ | | | ✓ | | $= \\frac{1}{3}$, tuần hoàn → hữu tỉ. |
| $\\sqrt{4}$ | ✓ | ✓ | ✓ | | $\\sqrt{4} = 2$, là số tự nhiên! Mẹo: căn của số chính phương ra số nguyên. |
| $-0$ | ✓ | ✓ | ✓ | | $-0 = 0$, là số 0. |

Hai cái bẫy ở bài này: (1) $\\sqrt{4} = 2$ thuộc $\\mathbb{N}$ — phải tính ra trước khi phân loại; (2) $\\frac{22}{7} \\neq \\pi$ — $\\frac{22}{7}$ hữu tỉ, $\\pi$ vô tỉ.

### Bài 2

| Biểu thức | Tính | Kết quả |
|-----------|------|---------|
| $\\lvert -7 \\rvert$ | $-7 < 0 \\to -(-7)$ | $7$ |
| $\\lvert 3 \\rvert$ | $3 \\geq 0$ | $3$ |
| $\\lvert 0 \\rvert$ | $0 \\geq 0$ | $0$ |
| $\\lvert 3 - 8 \\rvert$ | bên trong: $-5$, sau: $\\lvert -5 \\rvert$ | $5$ |
| $\\lvert -2 + 5 \\rvert$ | bên trong: $3$, sau: $\\lvert 3 \\rvert$ | $3$ |
| $\\lvert -4 \\rvert \\cdot \\lvert -2 \\rvert$ | $4 \\cdot 2$ | $8$ |
| $\\lvert \\lvert -5 \\rvert - \\lvert 3 \\rvert \\rvert$ | $\\lvert 5 - 3 \\rvert = \\lvert 2 \\rvert$ | $2$ |

Bẫy ở câu cuối: dấu $\\lvert\\ \\rvert$ lồng nhau. Tính từ trong ra ngoài: $\\lvert -5 \\rvert = 5$, $\\lvert 3 \\rvert = 3$, hiệu là $2$, rồi $\\lvert 2 \\rvert = 2$.

### Bài 3

a) $\\frac{22}{7} = 3.142857142857\\ldots$ còn $\\pi = 3.14159265358\\ldots$. So sánh chữ số thứ 3 sau dấu phẩy: $8 > 1$, nên $\\frac{22}{7} > \\pi$.

b) $0.999\\ldots = 1$. Bằng nhau! Chứng minh ngắn: gọi $x = 0.999\\ldots$. Khi đó $10x = 9.999\\ldots = 9 + x$, suy ra $9x = 9$, suy ra $x = 1$. Đây là một trong những "sự thật toán học gây sốc" nhưng đúng — $0.999\\ldots$ (với vô hạn số 9) chính là $1$, chỉ là cách viết khác.

c) $\\sqrt{2} = 1.41421356\\ldots$, còn $1.414$ đứng yên (không có dấu "..."). $1.414 < \\sqrt{2}$. (Lưu ý: $1.4142 < \\sqrt{2}$ vẫn đúng; chỉ $\\sqrt{2}$ mới bằng chính nó.)

d) $-\\lvert -3 \\rvert = -3$ (vì $\\lvert -3 \\rvert = 3$, dấu trừ ngoài → $-3$). Vế phải cũng $-3$. Bằng nhau: $-\\lvert -3 \\rvert = -3$.

e) $\\lvert -5 \\rvert = 5$, $\\lvert 3 - 8 \\rvert = \\lvert -5 \\rvert = 5$. Bằng nhau: $\\lvert -5 \\rvert = \\lvert 3 - 8 \\rvert$.

### Bài 4 — √3 vô tỉ

Giả sử ngược lại: $\\sqrt{3} = \\frac{p}{q}$ với $p, q$ nguyên, $q \\neq 0$, $\\gcd(p, q) = 1$.

Bình phương: $3 = \\frac{p^2}{q^2}$, nên $3q^2 = p^2$. (*)

Suy ra $p^2$ chia hết cho 3. Cần bổ đề: *nếu $p^2$ chia hết cho 3 thì $p$ chia hết cho 3*. Chứng minh ngắn: viết $p = 3k + r$ với $r \\in \\{0, 1, 2\\}$. Khi đó $p^2 = 9k^2 + 6kr + r^2$, và $p^2 \\bmod 3 = r^2 \\bmod 3$. Lấy ba trường hợp:

- $r = 0$: $r^2 = 0 \\to p^2 \\equiv 0 \\pmod 3$
- $r = 1$: $r^2 = 1 \\to p^2 \\equiv 1 \\pmod 3$
- $r = 2$: $r^2 = 4 \\equiv 1 \\pmod 3 \\to p^2 \\equiv 1 \\pmod 3$

Vậy $p^2 \\equiv 0 \\pmod 3$ chỉ khi $r = 0$, tức $p$ chia hết cho 3. □ bổ đề.

Quay lại: từ (*) suy ra $p$ chia hết cho 3, viết $p = 3k$. Thay vào (*):

$$\\begin{aligned}
3q^2 &= 9k^2 \\\\
q^2 &= 3k^2
\\end{aligned}$$

Suy ra $q^2$ chia hết cho 3 → $q$ chia hết cho 3. Vậy cả $p$ và $q$ chia hết cho 3, mâu thuẫn với $\\gcd(p, q) = 1$. □

(Cách chứng minh y hệt áp dụng được cho $\\sqrt{p}$ với mọi số nguyên tố $p$.)

### Bài 5

\`\`\`go
func almostEqual(a, b, eps float64) bool {
    diff := a - b
    if diff < 0 {
        diff = -diff
    }
    return diff < eps
}
\`\`\`

a) **Vì sao không dùng \`a == b\`**: vì \`float64\` lưu số nhị phân, mà $0.1$, $0.2$, $0.3$ không có biểu diễn nhị phân hữu hạn. Khi cộng hai số đã lệch, kết quả lệch thêm. $0.1 + 0.2 = 0.30000000000000004$, không bằng $0.3$. Tổng quát: hai số "bằng nhau về toán" có thể bị lưu bằng hai bit pattern khác nhau trong RAM, nên \`==\` so sánh bit pattern thì trả về \`false\`.

b) Ví dụ cụ thể:

\`\`\`go
a := 0.1 + 0.2
b := 0.3
fmt.Println(a == b)         // false
fmt.Println(a)              // 0.30000000000000004
fmt.Println(b)              // 0.3
\`\`\`

Hoặc:

\`\`\`go
s := 0.0
for i := 0; i < 10; i++ { s += 0.1 }
fmt.Println(s == 1.0)       // false (s = 0.9999999999999999)
\`\`\`

c) **Vì sao $eps = 10^{-9}$ có thể sai**: vì $eps$ là **sai số tuyệt đối**, không cân nhắc độ lớn của $a, b$.

- Với số rất lớn (vd $a = 10^{20}$, $b = 10^{20} + 100$), hiệu là 100, lớn hơn $10^{-9}$ rất nhiều — hàm trả về \`false\`. Nhưng $\\frac{100}{10^{20}} = 10^{-18}$, hai số gần như giống hệt nhau về **tương đối**. Đây là trường hợp "đáng lẽ bằng" nhưng hàm nói "không bằng".
- Với số rất nhỏ (vd $a = 10^{-20}$, $b = 2 \\times 10^{-20}$), hiệu là $10^{-20}$, nhỏ hơn $10^{-9}$ — hàm trả về \`true\`. Nhưng $b$ gấp đôi $a$, rất khác nhau về tương đối. Đây là trường hợp "đáng lẽ không bằng" nhưng hàm nói "bằng".

Cách khắc phục: dùng **relative epsilon** $\\lvert a - b \\rvert < eps \\cdot \\max(\\lvert a \\rvert, \\lvert b \\rvert)$, hoặc kết hợp cả tuyệt đối và tương đối:

\`\`\`go
func almostEqualBetter(a, b, eps float64) bool {
    diff := math.Abs(a - b)
    if diff < eps { return true }              // tuyệt đối
    largest := math.Max(math.Abs(a), math.Abs(b))
    return diff < eps*largest                  // tương đối
}
\`\`\`

Code đầy đủ và các test case trong [solutions.go](./solutions.go).

## Tham khảo và bài tiếp theo

- Bài tiếp: [Lesson 02 — Biến và biểu thức](../lesson-02-variables-expressions/) — đại số ký hiệu, đơn giản hóa, khai triển.
- Code: [solutions.go](./solutions.go).
- Minh họa tương tác: [visualization.html](./visualization.html) — trục số click chọn điểm, phân loại số, demo float precision.
- Bài liên quan ở các tầng sau:
  - Tầng 1 Lesson 04 — lũy thừa và logarit (sẽ gặp lại \`e\`).
  - Tầng 4 — vector arithmetic (cộng số thực theo từng thành phần).
  - DataFoundations [Lesson 01 — Binary & Hex](../../../DataFoundations/01-NumberRepresentation/lesson-01-binary-hex/) — vì sao máy lưu số dưới dạng bit.
`;
