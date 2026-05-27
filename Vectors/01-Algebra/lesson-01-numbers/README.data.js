// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: Vectors/01-Algebra/lesson-01-numbers/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 01 — Số và trục số

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Phân biệt được năm tập số quen thuộc — ℕ (tự nhiên), ℤ (nguyên), ℚ (hữu tỉ), ℝ (thực), và ℝ\\ℚ (vô tỉ) — biết tập nào nằm trong tập nào và khi nào dùng tập nào.
- Biết biểu diễn một số trên **trục số**, đọc thứ tự (\`<\`, \`>\`, \`=\`, \`≤\`, \`≥\`), số đối, số nghịch đảo.
- Hiểu **giá trị tuyệt đối** \`|x|\` theo nghĩa hình học (khoảng cách tới 0), không chỉ "bỏ dấu trừ".
- Biết vì sao \`√2\`, \`π\`, \`e\` là vô tỉ, và cảm nhận được "vô tỉ" nghĩa là gì (không viết được dưới dạng phân số \`p/q\`).
- Hiểu vì sao trong máy tính \`0.1 + 0.2 != 0.3\`, và hệ quả của điều này khi làm ML/AI (mọi tính toán đều có sai số).
- Liên hệ được "số thực" với các tầng sau: vector là một danh sách các số thực, embedding là điểm trong không gian ℝⁿ.

## Kiến thức tiền đề

Không có. Bạn chỉ cần biết cộng, trừ, nhân, chia ở mức tiểu học. Nếu đã quen với một ngôn ngữ lập trình (đặc biệt là Go) thì phần "máy tính và số thực" sẽ dễ vào hơn.

## 1. Các loại số — ℕ, ℤ, ℚ, ℝ

Toán học "phân loại" các số theo cách bạn xây dựng nó: bắt đầu từ những số đơn giản nhất (đếm), rồi mỗi lần gặp một phép tính cho kết quả "không thuộc tập hiện tại", ta phải **mở rộng** tập đó. Năm tập dưới đây chính là 5 lần mở rộng liên tiếp.

### 1.1. ℕ — số tự nhiên (natural numbers)

\`\`\`
ℕ = {0, 1, 2, 3, 4, 5, 6, ...}
\`\`\`

Số ta dùng để **đếm**: \`0 con mèo\`, \`3 quả táo\`, \`42 dòng code\`. Một số sách định nghĩa ℕ bắt đầu từ \`1\`, một số bắt đầu từ \`0\` — trong tài liệu này dùng quy ước **bao gồm 0** (giống Go: chỉ số mảng bắt đầu từ 0).

#### 💡 Trực giác / Hình dung

Hãy hình dung bạn đứng ở **vạch xuất phát** của một đường chạy có các mốc cách đều: 0, 1, 2, 3, ... Mỗi lần đếm một vật, bạn nhảy sang mốc tiếp theo. ℕ là **danh sách các mốc bạn có thể dừng lại được nếu chỉ biết "đi tiếp"** — chưa biết "đi lùi" (số âm), chưa biết "dừng giữa hai mốc" (số thập phân). Đây là tập số nguyên thủy nhất, dùng để **đếm**, không phải để **đo**.

#### Bốn đặc trưng cốt lõi của ℕ

1. Có **phần tử nhỏ nhất** là \`0\` (theo quy ước của tài liệu này).
2. **Không có phần tử lớn nhất** — với mọi \`n ∈ ℕ\`, vẫn còn \`n + 1 ∈ ℕ\`.
3. Mỗi phần tử có **phần tử kế tiếp duy nhất** (\`n\` → \`n+1\`). Đây là cơ sở cho định nghĩa hình thức của ℕ qua tiên đề Peano.
4. ℕ là **rời rạc** (discrete): giữa hai số tự nhiên liền kề không có số tự nhiên nào khác. Trái ngược hoàn toàn với ℝ (dày đặc) mà ta sẽ gặp ở §1.5.

#### Tính đóng (closure) — ý nghĩa và ví dụ

ℕ **đóng** dưới phép cộng và nhân: cộng hai số tự nhiên ra số tự nhiên, nhân cũng vậy. Nhưng phép trừ có thể "thoát" khỏi ℕ: \`3 − 5 = −2\` không thuộc ℕ. Để chứa được trừ, ta cần mở rộng.

"Đóng dưới phép X" nghĩa là: lấy bất kỳ phần tử nào của tập, áp dụng phép X, kết quả vẫn ở trong tập. Walk-through cụ thể với ℕ:

- **Cộng**: \`3 + 7 = 10 ∈ ℕ\` ✓ ; \`0 + 5 = 5 ∈ ℕ\` ✓ ; \`100 + 200 = 300 ∈ ℕ\` ✓ ; \`0 + 0 = 0 ∈ ℕ\` ✓ → ℕ đóng dưới cộng.
- **Nhân**: \`3 × 4 = 12 ∈ ℕ\` ✓ ; \`0 × 999 = 0 ∈ ℕ\` ✓ ; \`7 × 1 = 7 ∈ ℕ\` ✓ → ℕ đóng dưới nhân.
- **Trừ**: \`5 − 3 = 2 ∈ ℕ\` ✓ , nhưng \`3 − 5 = −2 ∉ ℕ\` ✗ → **không đóng**. Chỉ cần MỘT phản ví dụ là đủ để khẳng định tập không đóng dưới phép đó.
- **Chia**: \`6 ÷ 2 = 3 ∈ ℕ\` ✓ , nhưng \`6 ÷ 4 = 1.5 ∉ ℕ\` ✗ → **không đóng**.

#### ⚠ Lỗi thường gặp

- **Nhầm \`0 ∉ ℕ\`**: Trong nhiều sách Pháp / Bourbaki / Việt Nam phổ thông cũ, \`ℕ = {1, 2, 3, ...}\` và có ký hiệu riêng \`ℕ*\` cho \`{1, 2, ...}\`. Trong CS / ML hiện đại (và tài liệu này), \`0 ∈ ℕ\`. Khi đọc tài liệu, luôn kiểm tra quy ước của tác giả.
- **Nhầm "đếm được" với "tự nhiên"**: ℚ cũng đếm được (chứng minh bằng cách của Cantor) nhưng không phải số tự nhiên. "Đếm được" là khái niệm về **lực lượng** (cardinality), không phải về dạng số.
- **Coi \`−0\` là số khác \`0\`**: \`−0 = 0\` trong toán học. (Trong float IEEE 754 thì \`+0\` và \`−0\` có bit pattern khác nhau, nhưng \`+0 == −0\` trả về \`true\`.)

#### ❓ Câu hỏi tự nhiên của người đọc

**Q: Vì sao phải bao gồm \`0\`?** Vì \`0\` đại diện cho "không có gì" — một trạng thái hợp lệ khi đếm. "Có bao nhiêu lỗi trong code?" Câu trả lời \`0\` phải là một câu trả lời hợp lệ. Trong CS, chỉ số mảng \`arr[0]\` cũng cần \`0\`. Lịch sử: người Ấn Độ phát hiện số 0 vào thế kỷ thứ 5 — trước đó toán học La Mã không có \`0\`, viết số rất khổ.

**Q: ℕ có vô hạn không?** Có, vô hạn đếm được (countably infinite). Lực lượng (cardinality) của ℕ ký hiệu là \`ℵ₀\` (aleph-không). Sau này khi gặp ℝ, ta sẽ thấy ℝ "vô hạn nhiều hơn" ℕ — đây là kết quả nổi tiếng của Cantor.

#### 🔁 Dừng lại tự kiểm tra

1. Trong các số sau, số nào thuộc ℕ: \`7\`, \`−2\`, \`0\`, \`3.14\`, \`√9\`, \`0.5\`?
2. ℕ có đóng dưới phép lũy thừa \`aᵇ\` không?

<details>
<summary>Đáp án</summary>

1. \`7 ∈ ℕ\`, \`0 ∈ ℕ\`, \`√9 = 3 ∈ ℕ\`. \`−2 ∉ ℕ\` (âm), \`3.14 ∉ ℕ\` (thập phân), \`0.5 ∉ ℕ\`.
2. Có (với quy ước \`0⁰ = 1\`): với mọi \`a, b ∈ ℕ\`, \`aᵇ ∈ ℕ\`. Vd \`2³ = 8\`, \`5⁰ = 1\`, \`0⁵ = 0\`.
</details>

#### 📝 Tóm tắt mục 1.1

- ℕ = \`{0, 1, 2, 3, ...}\` (quy ước tài liệu này, có 0).
- Đóng dưới \`+\`, \`×\`; KHÔNG đóng dưới \`−\`, \`÷\`.
- Rời rạc (không có số giữa hai số liền kề).
- Đếm được vô hạn (\`ℵ₀\`).

### 1.2. ℤ — số nguyên (integers)

\`\`\`
ℤ = {..., -3, -2, -1, 0, 1, 2, 3, ...}
\`\`\`

#### 💡 Trực giác / Hình dung

ℕ là đường chạy chỉ có thể "đi tiếp". ℤ là đường chạy **có thể đi LÙI** — bạn vượt qua vạch xuất phát rồi tiếp tục về phía âm. Đời thực: nhiệt độ (\`−5°C\`), số dư tài khoản (\`−500.000 đ\`), độ cao so với mực nước biển (\`−10m\` cho đáy sông), điểm số (mất 3 điểm = \`−3\`). Bất cứ khi nào có khái niệm "thiếu hụt" hoặc "ngược hướng", ta cần ℤ.

#### Định nghĩa hình thức và tại sao cần mở rộng

Thêm các số âm. Ký hiệu \`ℤ\` đến từ tiếng Đức *Zahlen* ("các con số"). Bây giờ trừ đã đóng: \`3 − 5 = −2 ∈ ℤ\`. Nhưng phép chia chưa: \`3 ÷ 2 = 1.5\` không thuộc ℤ.

Walk-through tính đóng của ℤ:

- **Cộng**: \`5 + (−3) = 2 ∈ ℤ\` ✓ ; \`(−7) + (−4) = −11 ∈ ℤ\` ✓ ; \`0 + (−1) = −1 ∈ ℤ\` ✓ ; \`(−2) + 2 = 0 ∈ ℤ\` ✓.
- **Trừ**: \`3 − 5 = −2 ∈ ℤ\` ✓ ; \`(−4) − (−9) = 5 ∈ ℤ\` ✓ ; \`0 − 100 = −100 ∈ ℤ\` ✓ → đóng.
- **Nhân**: \`(−3) × 4 = −12 ∈ ℤ\` ✓ ; \`(−5) × (−2) = 10 ∈ ℤ\` ✓ ; \`0 × (−7) = 0 ∈ ℤ\` ✓ → đóng.
- **Chia**: \`6 ÷ (−2) = −3 ∈ ℤ\` ✓ , nhưng \`7 ÷ 2 = 3.5 ∉ ℤ\` ✗ ; \`(−5) ÷ 3 = −1.666... ∉ ℤ\` ✗ → **không đóng**.

#### Cách dấu nhân hoạt động (quy tắc dấu)

Khi mở rộng từ ℕ sang ℤ, có một quy tắc mới mà nhiều người thấy "phép màu": \`(−1) × (−1) = +1\`. Walk-through bằng số:

- \`2 × 3 = 6\` (dương × dương = dương)
- \`2 × (−3) = −6\` (dương × âm = âm)
- \`(−2) × 3 = −6\` (âm × dương = âm)
- \`(−2) × (−3) = +6\` (âm × âm = dương) ← quy tắc gây tranh cãi

**Vì sao âm × âm = dương?** Có thể nhìn qua phân phối: nếu \`(−1) × (−1) = −1\` thì \`0 = (−1) × 0 = (−1) × (1 + (−1)) = (−1) + (−1)(−1) = (−1) + (−1) = −2\`, vô lý. Vậy \`(−1) × (−1)\` phải bằng \`+1\`. Đây là hệ quả bắt buộc từ phân phối và tính đóng của phép nhân với phép cộng.

#### ⚠ Lỗi thường gặp

- **Coi \`−x\` là "luôn âm"**: Sai. \`−x\` chỉ có nghĩa "số đối của x". Nếu \`x = −3\`, thì \`−x = −(−3) = 3\`, là số DƯƠNG. Khi viết \`−x\`, đừng vội kết luận "đây là số âm" mà không biết \`x\` mang giá trị gì.
- **Nhầm \`|−3| = −3\`**: \`|−3| = 3\` (sẽ học ở §3).
- **\`−3² ≠ (−3)²\`**: Trong toán quy ước, \`−3² = −(3²) = −9\` (lũy thừa trước, dấu trừ sau). Còn \`(−3)² = 9\`. Cẩn thận thứ tự ưu tiên — nguyên nhân nhiều bug khi viết code.

#### ❓ Câu hỏi tự nhiên của người đọc

**Q: Vì sao ký hiệu là \`ℤ\` mà không phải \`I\` (Integer)?** Vì \`I\` thường bị dùng cho ma trận đơn vị (identity matrix). Người Đức (Dedekind, Kronecker) đặt nền móng cho lý thuyết số, dùng \`Z\` từ *Zahlen*. Quy ước này đã thành chuẩn quốc tế.

**Q: Trong Go, \`int\` có phải là ℤ?** Không hẳn — \`int\` trong Go là số nguyên có chặn (vd \`int64\` từ \`−2⁶³\` tới \`2⁶³−1\`). ℤ là tập vô hạn không chặn. Khi \`n\` lớn (vd factorial), \`int\` bị overflow trong khi ℤ thì không. Để có ℤ thật, dùng \`math/big.Int\`.

#### 🔁 Dừng lại tự kiểm tra

Tính: \`(−4) × (−5) + (−2) × 3 − (−1)\`.

<details>
<summary>Đáp án</summary>

\`= 20 + (−6) − (−1) = 20 − 6 + 1 = 15\`. Kết quả \`15 ∈ ℤ\` (như mong đợi).
</details>

#### 📝 Tóm tắt mục 1.2

- ℤ = \`{..., −2, −1, 0, 1, 2, ...}\`, mở rộng ℕ bằng số âm.
- Đóng dưới \`+\`, \`−\`, \`×\`; KHÔNG đóng dưới \`÷\`.
- Quy tắc dấu: \`(−) × (−) = (+)\` (hệ quả của phân phối).
- \`ℕ ⊂ ℤ\` (mọi tự nhiên đều là nguyên).
- \`int\` trong Go có chặn — khác với ℤ vô hạn.

### 1.3. ℚ — số hữu tỉ (rational numbers)

\`\`\`
ℚ = { p/q : p ∈ ℤ, q ∈ ℤ, q ≠ 0 }
\`\`\`

Đọc: "tập tất cả các phân số \`p/q\` mà tử là số nguyên, mẫu là số nguyên khác 0". Chữ "Q" đến từ *Quotient* (thương).

#### 💡 Trực giác / Hình dung

Trên trục số, ℤ chỉ là những **mốc cách đều 1 đơn vị**. Nhưng giữa \`0\` và \`1\` rõ ràng phải có "cái gì đó" — đó là \`1/2\`, \`1/3\`, \`2/5\`, \`7/100\`, ... Hãy hình dung mỗi lần bạn **chia một quãng** thành nhiều phần bằng nhau, bạn tạo ra một số hữu tỉ. Cụ thể: cắt một cái bánh thành 4 phần, lấy 3 → \`3/4\`. Bạn không thể "cắt một cái bánh thành √2 phần" — đó là chỗ ℚ thấy đủ tự nhiên cho đời sống.

Cách hình dung khác: ℚ là tập của **mọi tỉ lệ giữa hai đại lượng nguyên** — "đi 3 km hết 2 giờ" → tốc độ \`3/2 = 1.5 km/h\`. "Mua 7 quả táo với 5 nghìn" → giá \`5/7 nghìn/quả\`. Toàn bộ đời sống định lượng "đếm rồi chia" nằm trong ℚ.

#### Bốn ví dụ thuộc ℚ (đọc kỹ từng cái)

- \`3/4 = 0.75\` — phân số đơn giản, phần thập phân **dừng** sau 2 chữ số.
- \`−7/2 = −3.5\` — phân số âm (do tử âm). Có thể viết \`7/(−2)\` cũng cho cùng giá trị, nhưng quy ước viết dấu trừ ở tử.
- \`5 = 5/1\` — mọi số nguyên đều là hữu tỉ (viết mẫu 1). Đây là lý do \`ℤ ⊂ ℚ\`.
- \`0.333... = 1/3\` — số thập phân **vô hạn tuần hoàn** vẫn là hữu tỉ. Phần lặp là chữ số "3".
- \`0.142857142857... = 1/7\` — chu kỳ dài hơn ("142857" lặp). Chu kỳ tối đa của \`1/q\` là \`q − 1\` chữ số.
- \`22/7 ≈ 3.142857142857...\` — hữu tỉ (chu kỳ "142857"). **Không** phải \`π\` — chỉ xấp xỉ.
- \`0.5 = 1/2\` — thập phân dừng sau 1 chữ số.
- \`−0.125 = −1/8\` — thập phân âm dừng sau 3 chữ số.

#### Đặc trưng quyết định (very important)

Một số là hữu tỉ ⇔ phần thập phân của nó **dừng** hoặc **tuần hoàn**.

Walk-through cho mỗi loại:

- **Dừng** (terminating): \`0.5\`, \`0.75\`, \`0.125\`, \`3.14\`. Khi viết \`0.5 = 5/10 = 1/2\` ta thấy ngay là hữu tỉ.
- **Tuần hoàn** (repeating): \`0.333...\`, \`0.142857142857...\`, \`0.1666...\`. Mọi phân số có mẫu không chỉ là \`2^a · 5^b\` đều cho thập phân tuần hoàn — vì hệ thập phân chỉ "hợp" với 2 và 5.

Vì sao mẫu \`2^a · 5^b\` thì dừng? Vì \`10 = 2 × 5\`, nhân tử mẫu lên thành lũy thừa của 10:
- \`1/8 = 1/2³ = 125/1000 = 0.125\` (nhân cả tử và mẫu với \`5³\`).
- \`3/20 = 3/(2²·5) = 15/100 = 0.15\` (nhân cả hai với \`5\`).

Còn \`1/3\`, \`1/7\`, \`1/6\` (mẫu có ước khác 2, 5) thì luôn tuần hoàn.

#### Walk-through tính đóng của ℚ

Lấy \`a = 2/3\`, \`b = 5/4\`:

- **Cộng**: \`2/3 + 5/4 = 8/12 + 15/12 = 23/12 ∈ ℚ\` ✓.
- **Trừ**: \`2/3 − 5/4 = 8/12 − 15/12 = −7/12 ∈ ℚ\` ✓.
- **Nhân**: \`2/3 × 5/4 = 10/12 = 5/6 ∈ ℚ\` ✓.
- **Chia**: \`(2/3) ÷ (5/4) = (2/3) × (4/5) = 8/15 ∈ ℚ\` ✓.

Tổng quát: với \`p₁/q₁\`, \`p₂/q₂\` ∈ ℚ (\`q₁, q₂ ≠ 0\`):
- Cộng: \`(p₁q₂ + p₂q₁) / (q₁q₂)\` — vẫn là phân số.
- Nhân: \`(p₁p₂) / (q₁q₂)\` — vẫn là phân số.
- Chia: nhân với nghịch đảo (mẫu phải khác 0).

Nên ℚ **đóng** dưới 4 phép toán cơ bản (trừ chia cho 0). Vậy là đã đủ chưa? Chưa.

#### ⚠ Lỗi thường gặp

- **Nhầm "chia cho 0 = vô cùng"**: Sai. Chia cho 0 **không xác định** (undefined), không phải \`∞\`. Cụ thể: \`5/0\` không có nghĩa, vì không tồn tại số \`x\` nào sao cho \`0 · x = 5\`. Còn \`0/0\` thì tệ hơn — có vô số \`x\` thỏa \`0 · x = 0\`, tức là không xác định duy nhất.
- **Nhầm \`0\` không phải hữu tỉ**: Sai. \`0 = 0/1 = 0/2 = 0/100 = ...\` — tử là 0, mẫu khác 0 → hữu tỉ.
- **Nhầm "phân số tối giản là phân số duy nhất"**: Một số hữu tỉ có **vô hạn cách viết** dưới dạng \`p/q\`: \`1/2 = 2/4 = 3/6 = ...\`. Phân số tối giản (gcd(p,q) = 1) là cách viết **chính tắc**, không phải duy nhất.
- **Nhầm \`0.999... ≠ 1\`**: Như bài tập 3b, \`0.999... = 1\` chính xác (không xấp xỉ). Trực giác sai vì bộ não nghĩ "có infinity số 9 thì còn thiếu một chút" — không thiếu gì cả.

#### ❓ Câu hỏi tự nhiên của người đọc

**Q: Vì sao đòi mẫu \`q ≠ 0\`?** Vì chia cho 0 không xác định. Nếu cho phép \`q = 0\`, ta phá hệ thống — vd \`1/0 = ?\`. Để có một con số duy nhất, phải có \`0 × ? = 1\`, nhưng \`0 × bất-kỳ-số-nào = 0\` ≠ 1. Mâu thuẫn. Vậy \`1/0\` không thể là số. Cấm mẫu = 0 để giữ ℚ là một hệ thống nhất quán.

**Q: \`0\` có phải là số hữu tỉ không?** Có. \`0 = 0/1\`. Tử là 0 (số nguyên), mẫu là 1 (khác 0). Hợp lệ.

**Q: \`−3/0\` nằm ở đâu?** Không ở đâu cả — không phải số. \`q = 0\` bị cấm, nên \`−3/0\` không phải phần tử của ℚ. Trong code Go, \`1/0\` với int gây panic "division by zero"; còn \`1.0/0.0\` với float trả về \`+Inf\` (theo IEEE 754) — nhưng \`Inf\` không phải số thực, là quy ước riêng của IEEE 754.

**Q: ℚ có "đầy" trục số không?** Không. Dù giữa hai số hữu tỉ bất kỳ luôn có vô số số hữu tỉ khác (tính **trù mật** — density), trục số vẫn có "lỗ" tại các vị trí vô tỉ như \`√2\`. Sẽ phân tích ở §1.5.

**Q: ℚ có đếm được không?** Có (lực lượng \`ℵ₀\`, bằng ℕ). Cantor chứng minh bằng cách liệt kê toàn bộ phân số \`p/q\` theo đường zigzag trong bảng 2D. Đây là kết quả phản trực giác — "có vẻ ℚ nhiều hơn ℕ" nhưng thật ra bằng nhau về cardinality.

#### 🔁 Dừng lại tự kiểm tra

1. \`0.625\` có phải hữu tỉ không? Viết dưới dạng \`p/q\` tối giản.
2. Phần thập phân của \`1/11\` là gì? Có tuần hoàn không?
3. \`2/0\` thuộc tập nào?

<details>
<summary>Đáp án</summary>

1. Có. \`0.625 = 625/1000 = 5/8\` (chia cả tử mẫu cho 125). Mẫu \`8 = 2³\`, không có thừa số khác 2/5 → thập phân dừng (đúng như ta thấy).
2. \`1/11 = 0.090909...\` — tuần hoàn "09". Vẫn là hữu tỉ.
3. Không thuộc tập số nào — không phải số. Mẫu = 0 bị cấm.
</details>

#### 📝 Tóm tắt mục 1.3

- ℚ = tập các phân số \`p/q\` với \`p, q ∈ ℤ\`, \`q ≠ 0\`.
- Đặc trưng: thập phân **dừng** hoặc **tuần hoàn**.
- ℚ đóng dưới \`+\`, \`−\`, \`×\`, \`÷\` (trừ chia 0).
- ℤ ⊂ ℚ (mọi nguyên = nguyên/1).
- Chia cho 0 không xác định, không phải \`∞\`.

### 1.4. ℝ\\ℚ — số vô tỉ (irrational numbers)

#### 💡 Trực giác / Hình dung

Hãy hình dung trục số đã được "đắp đầy" bởi các số hữu tỉ. Mật độ rất cao — giữa hai số hữu tỉ bất kỳ luôn có vô số hữu tỉ khác. Vậy có còn chỗ trống không? Có. Có những vị trí trên trục số mà **không một phân số nào trúng đích** — đó là các **lỗ** mà số vô tỉ lấp đầy. Vị trí \`√2 = 1.41421356...\` là một lỗ như vậy: dù ta liệt kê tất cả hữu tỉ với mẫu đến 1 triệu, không có cái nào trùng đúng \`√2\`, mặc dù vô số gần nó.

Người Hy Lạp cổ phát hiện chuyện này gây khủng hoảng triết học: trường phái Pythagoras tin "mọi thứ là số" (số = số nguyên / phân số). Khi Hippasus chứng minh \`√2\` không phải phân số, theo truyền thuyết ông bị đuổi khỏi trường phái (có thuyết nói bị nhấn chết).

#### Định nghĩa và 4 ví dụ chi tiết

Khi người Hy Lạp cổ chứng minh \`√2\` không viết được dưới dạng phân số, họ phát hiện ra **một loại số mới**, không nằm trong ℚ. Đó là **số vô tỉ**.

- \`√2 ≈ 1.41421356237309504880...\` — đường chéo của hình vuông cạnh 1 (Pythagoras: \`c² = 1² + 1² = 2\`).
- \`√3 ≈ 1.73205080756887729352...\` — chiều cao của tam giác đều cạnh 2 chia 2, hoặc đường chéo của khối lập phương cạnh 1 chiếu xuống mặt.
- \`√5 ≈ 2.23606797749978969640...\` — gặp trong tỉ lệ vàng \`φ = (1+√5)/2 ≈ 1.618\`.
- \`π ≈ 3.14159265358979323846...\` — chu vi chia đường kính của mọi hình tròn. Không phụ thuộc kích thước hình tròn — quan hệ phổ quát.
- \`e ≈ 2.71828182845904523536...\` — cơ số logarit tự nhiên. Định nghĩa cổ điển: \`e = lim (1 + 1/n)ⁿ\` khi \`n → ∞\`. Xuất hiện trong lãi kép liên tục, xác suất, entropy.
- \`ln(2) ≈ 0.69314718055994530941...\` — logarit tự nhiên của 2. Cũng vô tỉ.
- \`φ = (1+√5)/2 ≈ 1.61803398874989484820...\` — tỉ lệ vàng. Vô tỉ vì \`√5\` vô tỉ.

#### Đặc trưng quyết định

Phần thập phân **vô hạn và KHÔNG tuần hoàn**. Bạn không bao giờ tìm thấy một "đoạn lặp lại" trong \`π\` cho dù xem bao nhiêu chữ số. Đến năm 2024 đã có người tính \`π\` đến **202 nghìn tỷ** chữ số — không có chu kỳ nào.

So sánh trực tiếp:

| Loại | Ví dụ | Phần thập phân |
|------|-------|----------------|
| Hữu tỉ — dừng | \`0.5\`, \`0.125\` | Có hữu hạn chữ số |
| Hữu tỉ — tuần hoàn | \`1/3 = 0.333...\`, \`1/7 = 0.142857142857...\` | Vô hạn, lặp |
| Vô tỉ | \`√2 = 1.41421356...\`, \`π = 3.14159265...\` | Vô hạn, không lặp |

#### Phân loại sâu hơn: vô tỉ đại số vs siêu việt

Trong ℝ\\ℚ vẫn còn phân tầng:

- **Đại số (algebraic)**: là nghiệm của một đa thức hệ số nguyên. Vd \`√2\` là nghiệm của \`x² − 2 = 0\`. \`√[3]{5}\` là nghiệm của \`x³ − 5 = 0\`. Tỉ lệ vàng \`φ\` là nghiệm của \`x² − x − 1 = 0\`.
- **Siêu việt (transcendental)**: **không** là nghiệm của bất kỳ đa thức hệ số nguyên nào. \`π\` và \`e\` là siêu việt — chứng minh khó hơn nhiều so với chứng minh chúng vô tỉ.

Hệ quả thực tế: \`π\` siêu việt → không thể "vẽ hình vuông có diện tích bằng hình tròn" bằng compa và thước kẻ (bài toán cổ "cầu phương hình tròn" — bất khả thi).

#### ⚠ Lỗi thường gặp

- **Nhầm vô tỉ với số phức**: Sai. Vô tỉ vẫn là số **thực** — nằm trên trục số. Số phức như \`i = √(−1)\` thì ngoài trục số, không phải ℝ. Cẩn thận khi đọc tiếng Anh: *irrational* (vô tỉ) ≠ *imaginary* (ảo, tức số phức).
- **Nhầm "vô tỉ = vô hạn chữ số"**: Vô tỉ thì vô hạn chữ số KHÔNG tuần hoàn. Nhưng \`1/3 = 0.333...\` cũng vô hạn chữ số (tuần hoàn) — vẫn là hữu tỉ. Phải nhấn mạnh **không tuần hoàn**.
- **Nhầm \`22/7 = π\`**: Sai. \`22/7 = 3.142857142857...\` (tuần hoàn, hữu tỉ) — chỉ xấp xỉ π. Tương tự \`3.14\`, \`3.14159\` đều hữu tỉ, không phải π.
- **Nhầm \`√4\` vô tỉ**: Sai. \`√4 = 2\` là số tự nhiên! Chỉ căn của các số **không chính phương** (như 2, 3, 5, 6, 7, ...) mới vô tỉ. Căn của số chính phương (1, 4, 9, 16, 25, ...) ra số nguyên.

#### ❓ Câu hỏi tự nhiên của người đọc

**Q: Số vô tỉ "nhiều" hay số hữu tỉ "nhiều" hơn?** Vô tỉ nhiều hơn rất nhiều. ℚ đếm được (lực lượng \`ℵ₀\`), ℝ\\ℚ không đếm được (lực lượng \`2^ℵ₀ = c\`). Trên trục số, "hầu hết" các điểm là vô tỉ — nếu ném ngẫu nhiên một mũi tên vào trục số, **xác suất trúng số hữu tỉ là 0**.

**Q: Vậy sao đời thường chỉ thấy hữu tỉ?** Vì ta đo bằng dụng cụ có độ chính xác hữu hạn — mọi phép đo trả về một số thập phân hữu hạn, tức là hữu tỉ. Vô tỉ xuất hiện ở các **quan hệ lý tưởng**: chu vi/đường kính của hình tròn "lý tưởng", đường chéo của hình vuông "lý tưởng".

**Q: Tổng hai số vô tỉ có phải vô tỉ?** Không nhất thiết. \`√2 + (−√2) = 0\`, hữu tỉ. \`(1 + √2) + (1 − √2) = 2\`, hữu tỉ. Vậy ℝ\\ℚ **không đóng** dưới phép cộng. Tuy nhiên, **tổng/tích của một hữu tỉ khác 0 và một vô tỉ luôn là vô tỉ** (chứng minh dễ bằng phản chứng).

#### 🔁 Dừng lại tự kiểm tra

1. Trong các số sau, số nào vô tỉ: \`√9\`, \`√10\`, \`π − 3\`, \`1.414\`, \`e²\`, \`0/π\`?
2. Nếu \`a\` hữu tỉ và \`b\` vô tỉ, \`a + b\` thuộc tập nào?

<details>
<summary>Đáp án</summary>

1. \`√9 = 3\` hữu tỉ. \`√10\` vô tỉ (10 không chính phương). \`π − 3\` vô tỉ (hữu tỉ trừ vô tỉ = vô tỉ). \`1.414\` hữu tỉ (thập phân dừng). \`e²\` vô tỉ (\`e\` siêu việt nên \`e²\` cũng vô tỉ). \`0/π = 0\` hữu tỉ (tử là 0).
2. Vô tỉ. Phản chứng: giả sử \`a + b = r\` hữu tỉ. Thì \`b = r − a\`, hiệu hai hữu tỉ, là hữu tỉ. Mâu thuẫn với \`b\` vô tỉ.
</details>

#### 📝 Tóm tắt mục 1.4

- Vô tỉ = không viết được \`p/q\` với \`p, q ∈ ℤ\`.
- Phần thập phân vô hạn, **không** tuần hoàn.
- Ví dụ: \`√2\`, \`√3\`, \`π\`, \`e\`, \`φ\`.
- Phân tầng: đại số (\`√2\`) vs siêu việt (\`π\`, \`e\`).
- ℝ\\ℚ **không đóng** dưới \`+\`, \`×\` (vd \`√2 + (−√2) = 0\`).

### 1.5. ℝ — số thực (real numbers)

\`\`\`
ℝ = ℚ ∪ (ℝ\\ℚ)     // hợp của hữu tỉ và vô tỉ
\`\`\`

#### 💡 Trực giác / Hình dung

ℝ là trục số **không có lỗ** — mọi điểm trên đường thẳng đều ứng với đúng một số, và ngược lại. Nói cách khác: nếu ta cắt trục số tại một vị trí bất kỳ, **luôn có đúng một số** ở vết cắt. Tính chất này gọi là **tính đầy đủ** (completeness) — đặc trưng cốt lõi phân biệt ℝ với ℚ.

So sánh:
- ℚ giống như sàn nhà có nhiều lỗ rỗng — bạn có thể "rơi" xuống lỗ tại \`√2\`, \`π\`, \`e\`.
- ℝ giống như sàn nhà bê tông đặc — không lỗ hổng nào.

Đây là lý do mọi giải tích (đạo hàm, tích phân, giới hạn) đều cần ℝ. Trong ℚ, giới hạn của một dãy hữu tỉ có thể "vô tỉ" — tức là rơi ngoài ℚ. Vd dãy \`1, 1.4, 1.41, 1.414, 1.4142, ...\` (các xấp xỉ thập phân của \`√2\`) toàn là hữu tỉ, nhưng giới hạn \`√2\` không nằm trong ℚ. ℝ "thêm" tất cả các giới hạn đó vào.

#### Bốn ví dụ về số thực

- \`5\` — số nguyên, đồng thời thuộc ℝ.
- \`−3.7\` — hữu tỉ, cũng thuộc ℝ.
- \`π\` — vô tỉ, cũng thuộc ℝ.
- \`√2 + e\` — tổng hai vô tỉ, vẫn thuộc ℝ.

Tóm gọn: **mọi số bạn từng viết ra dưới dạng thập phân** (dù hữu hạn, tuần hoàn, hay vô hạn không tuần hoàn) đều là số thực. Cái KHÔNG phải số thực là số phức (vd \`i = √(−1)\`), \`∞\`, \`NaN\`.

#### Tính trù mật và đầy đủ — phát biểu chính xác

- **Trù mật** (density): giữa hai số thực bất kỳ \`a < b\`, luôn tồn tại số thực \`c\` với \`a < c < b\`. Vd giữa \`1.41421\` và \`1.41422\`, có \`1.414215\`, \`1.414213567\`, vô số khác.
- **Đầy đủ** (completeness): mọi tập con \`S ⊂ ℝ\` không rỗng, bị chặn trên đều có **cận trên đúng** (supremum) thuộc ℝ. Đây là tính chất ℚ không có — vd tập \`{x ∈ ℚ : x² < 2}\` bị chặn trên (vd bởi 2) nhưng cận trên đúng của nó là \`√2\`, không nằm trong ℚ.

#### ⚠ Lỗi thường gặp

- **Nhầm "trù mật" với "đầy đủ"**: ℚ trù mật nhưng không đầy đủ. ℝ vừa trù mật vừa đầy đủ. Đầy đủ mạnh hơn.
- **Coi \`∞\` là số thực**: Sai. \`∞\` (vô cực) là **khái niệm về giới hạn**, không phải phần tử của ℝ. Trong giải tích, ta viết \`lim x→∞\` chứ không đối xử với \`∞\` như một số. Trong IEEE 754, \`+Inf\` là quy ước riêng.
- **Coi \`NaN\` là số thực**: Không. \`NaN\` (Not a Number) là kết quả của phép tính không xác định trong float (vd \`0/0\`, \`log(−1)\`, \`sqrt(−1)\`).

#### ❓ Câu hỏi tự nhiên của người đọc

**Q: Sao không học thẳng ℝ luôn cho gọn?** Vì hiểu được "vì sao cần ℝ" thì phải đi qua ℕ → ℤ → ℚ → ℝ — mỗi lần mở rộng giải quyết một vấn đề cụ thể. Học thẳng ℝ thì không biết tại sao phải có nó.

**Q: Còn tập nào lớn hơn ℝ không?** Có. ℂ (số phức) chứa ℝ. ℝⁿ là không gian n chiều. Quaternion ℍ chứa ℂ. Lý thuyết tập hợp còn xa hơn — vd \`2^ℝ\` lớn hơn ℝ.

**Q: Vector embedding 768 chiều có gì liên quan?** Mỗi embedding là một điểm trong ℝ⁷⁶⁸ — tức danh sách 768 số thực. Để hiểu "khoảng cách" giữa hai embedding, phải hiểu khoảng cách trong ℝ — chính là \`|a − b|\` mà ta sẽ học ở §3.

#### 🔁 Dừng lại tự kiểm tra

Tập \`{x ∈ ℚ : x² < 3}\` có cận trên đúng (sup) thuộc ℚ không? Thuộc ℝ không?

<details>
<summary>Đáp án</summary>

\`sup = √3\`. \`√3 ∉ ℚ\` (vô tỉ, bài tập 4). \`√3 ∈ ℝ\`. Đây là ví dụ tiêu biểu cho thấy ℚ **không đầy đủ** còn ℝ thì đầy đủ.
</details>

#### 📝 Tóm tắt mục 1.5

- ℝ = ℚ ∪ (ℝ\\ℚ), trục số "không lỗ".
- Trù mật + đầy đủ (cận trên đúng luôn tồn tại).
- "Không gian sống" của giải tích và ML (embedding ∈ ℝⁿ).
- \`∞\`, \`NaN\` không thuộc ℝ.

### 1.6. Quan hệ bao hàm

\`\`\`
ℕ ⊂ ℤ ⊂ ℚ ⊂ ℝ
\`\`\`

Đọc: ℕ là tập con thực sự của ℤ, ℤ là tập con thực sự của ℚ, và ℚ là tập con thực sự của ℝ. Mỗi mũi tên là một lần mở rộng. Vô tỉ \`ℝ\\ℚ\` nằm trong ℝ nhưng không nằm trong ℚ.

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
| Tự nhiên | ℕ | 0, 1, 2, 42, 1000 | −3, 0.5, √2 |
| Nguyên | ℤ | −5, 0, 42 | 0.5, 1/3, π |
| Hữu tỉ | ℚ | −5, 0.5, 1/3, 0.333..., 22/7 | √2, π, e |
| Vô tỉ | ℝ\\ℚ | √2, π, e, √3 + 1 | 0, 0.5, 22/7 |
| Thực | ℝ | tất cả ví dụ phía trên | số phức \`i = √(−1)\` |

**Câu hỏi tự nhiên ở đây**: *"22/7 có phải là π không?"* Không. \`22/7 = 3.142857142857...\` (tuần hoàn) là một số **hữu tỉ** xấp xỉ π. Bản thân \`π\` thì vô tỉ. Tương tự \`1.414\` không phải \`√2\`; nó chỉ là 4 chữ số đầu.

#### Bốn ví dụ minh họa quan hệ bao hàm

- \`5 ∈ ℕ\` → \`5 ∈ ℤ\` → \`5 ∈ ℚ\` (\`= 5/1\`) → \`5 ∈ ℝ\`. Một số có thể thuộc nhiều tập (vì các tập lồng nhau).
- \`−3 ∈ ℤ\` → \`−3 ∈ ℚ\` → \`−3 ∈ ℝ\`. Nhưng \`−3 ∉ ℕ\`.
- \`1/2 ∈ ℚ\` → \`1/2 ∈ ℝ\`. Nhưng \`1/2 ∉ ℤ\`.
- \`π ∈ ℝ\\ℚ\` → \`π ∈ ℝ\`. Nhưng \`π ∉ ℚ\` (và do đó \`∉ ℤ\`, \`∉ ℕ\`).

#### ⚠ Lỗi thường gặp

- **Nhầm "phân số ⇒ không phải nguyên"**: Sai. \`6/2 = 3 ∈ ℤ\`. Một số viết dưới dạng phân số vẫn có thể là nguyên — rút gọn trước khi phân loại.
- **Nhầm \`ℝ\\ℚ\` là tập con của ℚ**: Sai. Ký hiệu \`A\\B\` là "A trừ B" (A nhưng không trong B). \`ℝ\\ℚ\` = số thực không phải hữu tỉ = số vô tỉ. Khác hoàn toàn với \`ℚ\\ℝ\` (rỗng vì \`ℚ ⊂ ℝ\`).
- **Nhầm "tập con thực sự" (\`⊂\`) với "tập con" (\`⊆\`)**: \`⊂\` thường dùng cho "tập con thực sự" (\`A ⊂ B\`, \`A ≠ B\`). \`⊆\` cho phép bằng. Quy ước tài liệu này: \`ℕ ⊂ ℤ\` nghĩa là \`ℕ ⊆ ℤ\` và \`ℕ ≠ ℤ\`.

#### ❓ Câu hỏi tự nhiên của người đọc

**Q: Làm sao phân loại một số bất kỳ nhanh?** Dùng quy trình:
1. Có dấu trừ và là số nguyên? → ℤ (không ℕ).
2. Là số nguyên không âm? → ℕ.
3. Là phân số \`p/q\` hoặc thập phân **dừng/tuần hoàn**? → ℚ.
4. Còn lại (thập phân vô hạn không tuần hoàn)? → ℝ\\ℚ.

Ví dụ phân loại \`√25\`: đầu tiên tính ra \`5\` → ℕ. Đừng nhìn dấu căn rồi vội xếp vào vô tỉ.

**Q: Có số nào "ngoài ℝ" không?** Có. Số phức ℂ (chứa \`i = √(−1)\`). Trong lesson này không xét.

#### 📝 Tóm tắt mục 1.6

- \`ℕ ⊊ ℤ ⊊ ℚ ⊊ ℝ\` — mỗi mở rộng giải quyết một hạn chế (đóng dưới phép gì).
- \`ℝ\\ℚ\` = số vô tỉ, nằm trong ℝ nhưng không trong ℚ.
- Rút gọn trước khi phân loại (\`√4 = 2 ∈ ℕ\`).
- Một số có thể thuộc nhiều tập (do bao hàm).

## 2. Trục số (number line)

### 2.1. Biểu diễn

#### 💡 Trực giác / Hình dung

Trục số là **bản đồ 1 chiều của ℝ**: mỗi số là một địa chỉ, mỗi địa chỉ tương ứng đúng một số. Đây gọi là **tương ứng 1-1** (bijection) giữa ℝ và đường thẳng. Tính chất này khiến trục số trở thành công cụ trực quan mạnh — mọi câu hỏi đại số đều có thể "vẽ ra" để hiểu.

Trục số là một đường thẳng nằm ngang, có chiều dương (sang phải), gốc là \`0\`, và mỗi điểm tương ứng với **đúng một số thực** (và ngược lại).

\`\`\`
       -3   -2   -1    0    1    2    3
   ────┼────┼────┼────┼────┼────┼────┼────►
                      ↑              ↑
                     gốc           x = 2
\`\`\`

Số nhỏ nằm bên trái, số lớn nằm bên phải. Đây là cách trực quan nhất để hình dung *thứ tự*.

#### Định vị 4 số trên trục

- \`−2.5\`: nằm giữa \`−3\` và \`−2\`, gần giữa hơn về phía \`−2\`.
- \`1/3 ≈ 0.333\`: nằm giữa \`0\` và \`1\`, gần \`0\` hơn (1/3 < 1/2).
- \`√2 ≈ 1.414\`: nằm giữa \`1\` và \`2\`, hơi gần \`1\` hơn. Trong hình học: dài bằng đường chéo hình vuông cạnh 1.
- \`π ≈ 3.14\`: nằm giữa \`3\` và \`4\`, gần \`3\` hơn.

#### ❓ Câu hỏi tự nhiên của người đọc

**Q: Số vô tỉ có "thấy được" trên trục số không?** Có. \`√2\` chấm chính xác tại vị trí đường chéo hình vuông cạnh 1 — bạn có thể dựng bằng compa. \`π\` thì khó dựng bằng compa-thước kẻ (do siêu việt) nhưng vẫn là một điểm xác định.

**Q: Vì sao chiều dương sang phải mà không sang trái?** Quy ước. Trong hệ tọa độ Descartes, trục \`x\` tăng sang phải, trục \`y\` tăng lên trên. Quy ước này thống nhất toàn cầu (trừ một vài đồ thị tài chính lịch sử).

### 2.2. Thứ tự — \`<\`, \`>\`, \`=\`, \`≤\`, \`≥\`

| Ký hiệu | Đọc | Ví dụ |
|---------|-----|-------|
| \`a < b\` | a nhỏ hơn b | \`−3 < 1\`, \`1.414 < √2\` |
| \`a > b\` | a lớn hơn b | \`5 > 2\`, \`π > 3\` |
| \`a = b\` | a bằng b | \`1/2 = 0.5\` |
| \`a ≤ b\` | a nhỏ hơn hoặc bằng b | \`x ≤ 5\` (cho phép x = 5) |
| \`a ≥ b\` | a lớn hơn hoặc bằng b | \`x ≥ 0\` (số không âm) |

Mẹo: ký hiệu \`<\` luôn "miệng há về phía số lớn". \`3 < 5\`: miệng há về 5.

#### Walk-through so sánh bằng trục số

So sánh \`−2.7\` và \`−1.5\`:
- Trên trục số: \`−2.7\` nằm xa gốc về bên trái hơn \`−1.5\`.
- Vậy \`−2.7 < −1.5\`.
- ⚠ Bẫy: \`2.7 > 1.5\` nhưng \`−2.7 < −1.5\`. Số càng âm thì càng nhỏ.

So sánh \`1/3\` và \`2/5\`:
- Quy đồng mẫu: \`1/3 = 5/15\`, \`2/5 = 6/15\`.
- \`5 < 6\` nên \`5/15 < 6/15\`, tức \`1/3 < 2/5\`.
- Kiểm tra bằng thập phân: \`1/3 ≈ 0.333\`, \`2/5 = 0.4\`. Đúng.

So sánh \`√3\` và \`√5\`:
- Hàm \`√\` đơn điệu tăng trên \`[0, ∞)\`: \`a < b ⇒ √a < √b\` (khi \`a, b ≥ 0\`).
- \`3 < 5 ⇒ √3 < √5\`.

So sánh \`π\` và \`√10\`:
- \`π² ≈ 9.87\`, \`(√10)² = 10\`. Vì cả hai dương: \`π² < 10 ⇒ π < √10\`.

#### Tính chất của thứ tự (cần nhớ)

1. **Phản xạ**: \`a ≤ a\` luôn đúng.
2. **Phản đối xứng**: nếu \`a ≤ b\` và \`b ≤ a\` thì \`a = b\`.
3. **Bắc cầu**: nếu \`a ≤ b\` và \`b ≤ c\` thì \`a ≤ c\`. Vd: \`2 < 5 < 10 ⇒ 2 < 10\`.
4. **Toàn phần**: với mọi \`a, b ∈ ℝ\`, một trong ba thứ luôn đúng: \`a < b\`, \`a = b\`, hoặc \`a > b\` (luật ba khả năng — trichotomy).
5. **Bảo toàn dưới cộng**: \`a < b ⇒ a + c < b + c\` với mọi \`c\`.
6. **Bảo toàn dưới nhân với số dương**: \`a < b\` và \`c > 0\` ⇒ \`ac < bc\`.
7. **ĐỔI DẤU dưới nhân với số âm**: \`a < b\` và \`c < 0\` ⇒ \`ac > bc\`. ← bẫy lớn nhất khi giải bất phương trình.

Walk-through quy tắc 7: nhân hai vế của \`2 < 5\` với \`−3\`. Kết quả: \`−6 > −15\` (đổi chiều), không phải \`−6 < −15\`. Kiểm tra: \`−6\` nằm bên phải \`−15\` trên trục số, nên \`−6 > −15\`. Đúng.

#### ⚠ Lỗi thường gặp

- **Quên đổi chiều khi nhân/chia với số âm**: Giải \`−2x < 6\` ⇒ \`x < −3\` là SAI. Chia hai vế cho \`−2\`, phải đổi chiều: \`x > −3\`. Đây là nguyên nhân #1 làm sai bất phương trình.
- **Nhầm \`≤\` với \`<\`**: Trong code, \`>=\` cho phép bằng, \`>\` thì không. Lặp \`for i := 0; i <= n; i++\` chạy \`n+1\` lần (bao gồm \`i = n\`), còn \`i < n\` chạy \`n\` lần. Sai một chút là off-by-one bug.
- **Bắc cầu hỏng khi có dấu \`=\`**: \`a ≤ b\` và \`b < c\` thì \`a < c\` (không phải \`a ≤ c\`). Phải cẩn thận khi mix \`≤\` với \`<\`.

#### ❓ Câu hỏi tự nhiên của người đọc

**Q: Có thứ tự cho số phức không?** Không có thứ tự "tự nhiên" cho ℂ — không thể nói \`i < 1\` hay \`i > 1\`. ℝ có thứ tự toàn phần; ℂ thì không (chỉ có thứ tự một phần qua module \`|z|\`).

**Q: \`0.1 + 0.2 > 0.3\` đúng hay sai?** Trong float IEEE 754, \`0.1 + 0.2 = 0.30000000000000004 > 0.3\`. Đúng theo so sánh bit. Nhưng "về toán", chúng bằng nhau. Đây là một bẫy khi viết code với float.

#### 🔁 Dừng lại tự kiểm tra

Giải bất phương trình \`−3x + 5 > 11\`.

<details>
<summary>Đáp án</summary>

\`−3x + 5 > 11\` ⇒ \`−3x > 6\` (trừ 5 hai vế, không đổi chiều) ⇒ \`x < −2\` (chia cho \`−3\`, **ĐỔI CHIỀU**).
Kiểm tra: lấy \`x = −3\` (thỏa \`x < −2\`), thay vào: \`−3·(−3) + 5 = 9 + 5 = 14 > 11\`. ✓
</details>

### 2.3. Số đối (additive inverse)

**Số đối** của \`a\` là số \`−a\` — số mà cộng với \`a\` ra \`0\`.

\`\`\`
a + (−a) = 0
\`\`\`

Trên trục số, \`a\` và \`−a\` đối xứng qua gốc 0. Ví dụ số đối của \`3\` là \`−3\`; số đối của \`−2.5\` là \`2.5\`. Số đối của \`0\` là chính nó.

#### 5 ví dụ về số đối

| \`a\` | Số đối \`−a\` | Tổng \`a + (−a)\` |
|-----|-------------|-----------------|
| \`7\` | \`−7\` | \`0\` |
| \`−4\` | \`4\` (vì \`−(−4) = 4\`) | \`0\` |
| \`0\` | \`0\` | \`0\` |
| \`1/2\` | \`−1/2\` | \`0\` |
| \`π\` | \`−π\` | \`0\` |
| \`√2\` | \`−√2\` | \`0\` |

#### ⚠ Lỗi thường gặp

- **Nhầm \`−a\` luôn âm**: Như đã nói ở §1.2 — nếu \`a = −5\` thì \`−a = 5\` (dương). "Số đối" không phải "số âm". Ký hiệu \`−\` ở đây là toán tử "đổi dấu", không phải "âm tuyệt đối".

### 2.4. Số nghịch đảo (multiplicative inverse)

**Số nghịch đảo** của \`a\` (với \`a ≠ 0\`) là \`1/a\` — số mà nhân với \`a\` ra \`1\`.

\`\`\`
a × (1/a) = 1
\`\`\`

Ví dụ: nghịch đảo của \`2\` là \`0.5\`; nghịch đảo của \`−3\` là \`−1/3 ≈ −0.333...\`. **Số 0 không có nghịch đảo** — đó là lý do chia cho 0 vô nghĩa.

Phân biệt: *đối* dùng với phép cộng, *nghịch đảo* dùng với phép nhân. Đừng nhầm \`−3\` (đối của 3) với \`1/3\` (nghịch đảo của 3).

#### 5 ví dụ về số nghịch đảo

| \`a\` | Nghịch đảo \`1/a\` | Tích \`a × (1/a)\` |
|-----|------------------|-------------------|
| \`5\` | \`1/5 = 0.2\` | \`1\` |
| \`−2\` | \`−1/2 = −0.5\` | \`1\` |
| \`2/3\` | \`3/2 = 1.5\` | \`1\` |
| \`√2\` | \`1/√2 = √2/2 ≈ 0.707\` | \`1\` |
| \`0\` | KHÔNG TỒN TẠI | — |

Mẹo với phân số: nghịch đảo của \`p/q\` là \`q/p\` (lật ngược). Vd nghịch đảo của \`2/3\` là \`3/2\`, nghịch đảo của \`−7/4\` là \`−4/7\`.

#### ❓ Câu hỏi tự nhiên của người đọc

**Q: Vì sao 0 không có nghịch đảo?** Vì không tồn tại \`x\` nào sao cho \`0 · x = 1\`. Mọi \`0 · x = 0\`. Nếu cho phép \`1/0\`, ta phá tính nhất quán của hệ thống số.

**Q: Số đối + số nghịch đảo cùng tồn tại với mọi số khác 0?** Đúng. Mọi \`a ∈ ℝ\` đều có số đối \`−a ∈ ℝ\`. Mọi \`a ∈ ℝ\\{0}\` có nghịch đảo \`1/a ∈ ℝ\`. Đây là hai tính chất "có nghịch đảo" của ℝ dưới \`+\` và \`×\`, biến ℝ thành **trường** (field) trong đại số trừu tượng.

#### 📝 Tóm tắt mục 2

- Trục số: ánh xạ 1-1 với ℝ.
- Thứ tự: phản xạ + phản đối xứng + bắc cầu + toàn phần.
- Quy tắc nhân với số âm: **đổi chiều bất đẳng thức** — bẫy phổ biến.
- Số đối: \`a + (−a) = 0\`, đối xứng qua 0.
- Số nghịch đảo: \`a × (1/a) = 1\`, không tồn tại với 0.

## 3. Giá trị tuyệt đối \`|x|\`

### 3.1. Định nghĩa hình học (cách nên nhớ)

#### 💡 Trực giác / Hình dung

Hãy hình dung bạn đang đứng tại vị trí \`x\` trên trục số. Câu hỏi: "Bạn cách gốc 0 bao xa?" Câu trả lời chính là \`|x|\`. **Khoảng cách không bao giờ âm** — dù bạn đứng bên phải (vị trí dương) hay bên trái (vị trí âm) của gốc.

Đây là lý do \`|x|\` luôn ≥ 0, dù \`x\` có âm hay dương.

\`|x|\` = **khoảng cách từ x tới 0 trên trục số**. Vì khoảng cách luôn không âm, \`|x| ≥ 0\` luôn đúng.

\`\`\`
        |−3|=3              |2|=2
       ←─────────────│─────────────►
       -3    -2   -1   0    1    2
\`\`\`

Cả \`−3\` và \`3\` cách \`0\` đúng 3 đơn vị, nên \`|−3| = |3| = 3\`.

### 3.2. Định nghĩa hình thức

\`\`\`
       ⎧  x   nếu x ≥ 0
|x| = ⎨
       ⎩ −x   nếu x < 0
\`\`\`

Đọc bằng tiếng Việt: "nếu x không âm thì lấy luôn x; nếu x âm thì lấy \`−x\` để biến thành dương".

→ Đây là lý do nhiều người gọi \`|x|\` là "bỏ dấu trừ" — đúng, nhưng định nghĩa hình học (khoảng cách) tổng quát và đẹp hơn, vì nó mở rộng được sang vector: \`|v|\` của vector cũng là "khoảng cách tới gốc".

### 3.3. Khoảng cách giữa hai số

\`\`\`
khoảng cách(a, b) = |a − b| = |b − a|
\`\`\`

Ví dụ khoảng cách giữa \`3\` và \`7\`: \`|3 − 7| = |−4| = 4\`. Cũng bằng \`|7 − 3| = 4\` — đối xứng.

### 3.4. Tính tay 5 ví dụ

| Biểu thức | Bước tính | Kết quả |
|-----------|-----------|---------|
| \`|−7|\` | −7 < 0 → lấy −(−7) | \`7\` |
| \`|3|\` | 3 ≥ 0 → lấy chính nó | \`3\` |
| \`|0|\` | 0 ≥ 0 → lấy chính nó | \`0\` |
| \`|3 − 8|\` | \`3 − 8 = −5\`, sau đó \`|−5|\` | \`5\` |
| \`|−2 + 5|\` | \`−2 + 5 = 3\`, sau đó \`|3|\` | \`3\` |

**Lưu ý quan trọng**: tính bên trong dấu \`| |\` trước, rồi mới lấy giá trị tuyệt đối. \`|3 − 8|\` không phải \`|3| − |8| = 3 − 8 = −5\`. Phép \`|·|\` không phân phối qua phép trừ.

### 3.5. Tính chất (cần thuộc)

- \`|x| ≥ 0\` luôn, và \`|x| = 0\` ⇔ \`x = 0\`.
- \`|−x| = |x|\`.
- \`|xy| = |x| · |y|\`.
- \`|x + y| ≤ |x| + |y|\` — **bất đẳng thức tam giác** (sẽ xuất hiện lại khi học vector).

#### Walk-through từng tính chất

**Tính chất 1: \`|x| ≥ 0\` và \`|x| = 0 ⇔ x = 0\`.**
- Ví dụ \`|3| = 3 ≥ 0\` ✓, \`|−7| = 7 ≥ 0\` ✓, \`|0| = 0\` (chỉ khi \`x = 0\`).
- Diễn giải hình học: khoảng cách luôn ≥ 0, và bằng 0 chỉ khi bạn đứng ngay tại gốc.

**Tính chất 2: \`|−x| = |x|\`.**
- Ví dụ \`|−5| = 5 = |5|\` ✓, \`|−π| = π = |π|\` ✓, \`|−(−3)| = |3| = 3\` ✓.
- Diễn giải hình học: \`x\` và \`−x\` đối xứng qua 0, nên khoảng cách tới 0 bằng nhau.

**Tính chất 3: \`|xy| = |x| · |y|\` (phân phối qua phép nhân).**
- Ví dụ: \`|(−3) · 4| = |−12| = 12 = 3 · 4 = |−3| · |4|\` ✓.
- Ví dụ: \`|2 · (−5)| = |−10| = 10 = 2 · 5 = |2| · |−5|\` ✓.
- Chứng minh ngắn: bốn trường hợp dấu của \`x, y\`. Trường hợp nào cũng cho \`|xy| = |x| · |y|\`.

**Tính chất 4: \`|x + y| ≤ |x| + |y|\` — bất đẳng thức tam giác.**
- Ví dụ cùng dấu: \`|3 + 4| = 7 = 3 + 4 = |3| + |4|\` → bằng (dấu \`=\`).
- Ví dụ khác dấu: \`|3 + (−4)| = |−1| = 1 < 3 + 4 = 7\` → nhỏ hơn thực sự.
- Ví dụ khác dấu cân bằng: \`|5 + (−5)| = 0 < 10\` → cực đoan.
- Diễn giải: khi \`x, y\` cùng dấu, đi cùng chiều, tổng quãng đường cộng lại. Khi khác dấu, ngược chiều, triệt tiêu một phần → ngắn hơn.

#### Bất đẳng thức tam giác đảo

Ít người biết: \`||x| − |y|| ≤ |x − y|\`.

Walk-through:
- \`x = 5, y = 3\`: \`||5| − |3|| = 2\`, \`|5 − 3| = 2\`. Bằng nhau.
- \`x = 5, y = −3\`: \`||5| − |−3|| = |5 − 3| = 2\`, \`|5 − (−3)| = 8\`. \`2 ≤ 8\` ✓.
- \`x = −7, y = 2\`: \`||−7| − |2|| = |7 − 2| = 5\`, \`|−7 − 2| = 9\`. \`5 ≤ 9\` ✓.

#### ⚠ Lỗi thường gặp với tính chất

- **Tưởng \`|x + y| = |x| + |y|\`**: Sai. Chỉ bằng khi cùng dấu (hoặc một trong hai = 0). Còn lại là nhỏ hơn (\`<\`).
- **Tưởng \`|x − y| = |x| − |y|\`**: Sai hoàn toàn. Ví dụ \`|3 − 5| = 2\` nhưng \`|3| − |5| = −2\`. Không có công thức "phân phối" cho phép trừ qua \`|·|\`.
- **Trong code Go**: dùng \`math.Abs(x)\` cho float64. Với int, viết tay: \`if x < 0 { x = -x }\`. Cẩn thận: \`math.Abs(math.MinInt32)\` overflow (vì \`-MinInt32 > MaxInt32\`).

#### ❓ Câu hỏi tự nhiên của người đọc

**Q: Vì sao gọi là "bất đẳng thức TAM GIÁC"?** Vì nó tổng quát hóa thành: trong tam giác, độ dài một cạnh ≤ tổng độ dài hai cạnh kia. Trên trục số (1 chiều), tam giác "suy biến" thành đoạn thẳng — bất đẳng thức vẫn đúng, dấu bằng xảy ra khi tam giác "dẹp" (3 đỉnh thẳng hàng cùng phía). Khi học vector ở Tầng 4, ta thấy \`||u + v|| ≤ ||u|| + ||v||\` — chính là phiên bản đa chiều.

**Q: \`|·|\` có hoạt động được trên số phức không?** Có. \`|a + bi| = √(a² + b²)\` — khoảng cách từ điểm \`(a, b)\` tới gốc trong mặt phẳng phức. Tất cả 4 tính chất trên đều vẫn đúng.

**Q: Mối liên hệ với \`sqrt(x²)\`?** \`|x| = √(x²)\`. Quy ước \`√\` luôn trả về giá trị **không âm**. Vd \`√((-3)²) = √9 = 3 = |−3|\`. Đây là một cách tính \`|x|\` bằng phép đại số (không cần phân tích case).

#### 🔁 Dừng lại tự kiểm tra

1. Tính \`|3 − √2 · √2|\`.
2. Bất đẳng thức \`|x − 5| < 2\` mô tả tập số nào?

<details>
<summary>Đáp án</summary>

1. \`√2 · √2 = 2\`. \`|3 − 2| = |1| = 1\`.
2. Khoảng cách từ \`x\` tới \`5\` nhỏ hơn 2 ⇒ \`x\` nằm trong khoảng \`(3, 7)\`. Tức \`3 < x < 7\`.
</details>

#### 📝 Tóm tắt mục 3

- \`|x|\` = khoảng cách từ \`x\` tới 0; luôn ≥ 0.
- 4 tính chất: dương, đối xứng, phân phối qua nhân, bất đẳng thức tam giác.
- \`|·|\` KHÔNG phân phối qua \`+\`, \`−\`. Chỉ ≤ (tam giác).
- Trong code Go: \`math.Abs(x)\` cho float, viết tay cho int.

## 4. Số vô tỉ — vì sao \`√2\` không phải hữu tỉ?

#### 💡 Trực giác / Hình dung

Tại sao "đường chéo của hình vuông cạnh 1 không phải phân số"? Thử nghĩ thế này: nếu \`√2 = p/q\` thì ta có thể "đo" đường chéo bằng đơn vị \`1/q\` — đúng \`p\` đơn vị, không thừa không thiếu. Người Hy Lạp cổ tin chuyện này — họ tin "mọi đoạn thẳng đều có chung một đơn vị đo nhỏ đủ" (gọi là *commensurable*). Khi Hippasus chứng minh không có đơn vị nào "vừa" cả cạnh 1 lẫn đường chéo, đó là cú sốc lớn cho toán học cổ đại.

Khẳng định: **không tồn tại hai số nguyên \`p, q\` (\`q ≠ 0\`) sao cho \`√2 = p/q\`** (giả sử phân số đã tối giản).

Chứng minh bằng **phản chứng** (proof by contradiction). Lập luận: giả sử điều ngược lại là đúng, dẫn đến mâu thuẫn → giả thiết sai → điều ban đầu đúng.

**Bước 1 — Giả thiết phản chứng.** Giả sử ngược lại: \`√2 = p/q\` với \`p, q\` nguyên, \`q ≠ 0\`, và phân số \`p/q\` **đã tối giản** (tức là \`gcd(p, q) = 1\`, không có ước chung > 1).

*Vì sao đòi tối giản?* Vì nếu \`p/q\` chưa tối giản, ta luôn rút gọn được (chia cả tử lẫn mẫu cho \`gcd\`) để thành dạng tối giản. Vd \`√2 = 4/2 · ?\` — nếu là thế thì rút gọn thành \`2/1\`, cho \`√2 = 2\` (sai). Tóm lại: nếu \`√2\` là hữu tỉ, **luôn có** một biểu diễn tối giản. Giả thiết tối giản giúp mâu thuẫn lộ ra ở Bước 5.

**Bước 2 — Bình phương hai vế.** Vì \`√2 = p/q\`, bình phương cả hai vế:

\`\`\`
(√2)² = (p/q)²
2     = p² / q²
\`\`\`

Nhân chéo hai vế với \`q²\` (luôn dương, không đổi chiều nếu có bất đẳng thức — ở đây là đẳng thức nên không quan trọng):

\`\`\`
2q² = p²        // (*) — đây là phương trình chìa khóa
\`\`\`

*Vì sao bình phương được?* Vì cả hai vế dương (\`√2 > 0\` và \`p/q\` cùng dấu sau khi quy ước \`p, q\` cùng dấu hoặc ta lấy giá trị tuyệt đối). Bình phương không làm mất nghiệm trong tình huống này.

**Bước 3 — Suy ra \`p\` chẵn.**

Từ (*), \`p² = 2q²\` chia hết cho 2 (vì vế phải có thừa số 2). Tức \`p² chẵn\`.

*Bổ đề:* nếu \`p²\` chẵn thì \`p\` chẵn.

*Chứng minh bổ đề (đối ngẫu — contrapositive):* giả sử \`p\` lẻ, viết \`p = 2m + 1\` với \`m\` nguyên. Khi đó:
\`\`\`
p² = (2m+1)² = 4m² + 4m + 1 = 2(2m² + 2m) + 1
\`\`\`
Đây là số lẻ (dạng \`2k + 1\`). Vậy \`p\` lẻ ⇒ \`p²\` lẻ. Đối ngẫu: \`p²\` chẵn ⇒ \`p\` chẵn. □ bổ đề.

Áp dụng bổ đề: từ \`p²\` chẵn, suy ra \`p\` chẵn. Tức tồn tại số nguyên \`k\` để \`p = 2k\`.

**Bước 4 — Suy ra \`q\` chẵn.**

Thay \`p = 2k\` vào (*):

\`\`\`
2q² = (2k)² 
2q² = 4k²
q²  = 2k²              // chia hai vế cho 2
\`\`\`

Vế phải \`2k²\` chia hết cho 2 ⇒ \`q²\` chẵn. Áp dụng lại bổ đề ở Bước 3: \`q²\` chẵn ⇒ \`q\` chẵn.

**Bước 5 — Mâu thuẫn.**

Đã chứng minh: \`p\` chẵn và \`q\` chẵn. Tức cả \`p\` và \`q\` chia hết cho 2. Nghĩa là \`gcd(p, q) ≥ 2\`, **mâu thuẫn** với giả thiết "phân số tối giản" (\`gcd(p, q) = 1\`).

**Bước 6 — Kết luận.**

Giả thiết "\`√2\` hữu tỉ" dẫn tới mâu thuẫn. Theo logic phản chứng, giả thiết sai. Vậy **\`√2\` không hữu tỉ**, tức \`√2 ∈ ℝ\\ℚ\`. □

#### ❓ Câu hỏi tự nhiên của người đọc

**Q: Vì sao chứng minh phản chứng "hợp lệ"?** Vì logic cổ điển có luật bài trung (law of excluded middle): mỗi mệnh đề hoặc đúng, hoặc sai, không có khả năng thứ ba. Nếu phủ định dẫn tới mâu thuẫn, mệnh đề gốc phải đúng. (Lưu ý: logic trực giác — intuitionistic — không công nhận điều này, nhưng đó là chuyện chuyên sâu.)

**Q: Bổ đề "p² chẵn ⇒ p chẵn" có dễ tổng quát không?** Có. Tổng quát: với mọi số nguyên tố \`p\`, nếu \`p | a²\` (đọc: \`p\` chia hết \`a²\`) thì \`p | a\`. Đây là hệ quả của **bổ đề Euclid**: nếu \`p\` nguyên tố và \`p | ab\` thì \`p | a\` hoặc \`p | b\`. Áp dụng cho \`a² = a · a\` cho ngay kết quả.

**Q: Nếu thay 2 bằng số không nguyên tố thì sao?** Vd \`√4 = 2\` — rõ là hữu tỉ. \`√6\` thì sao? Vẫn vô tỉ, vì \`6 = 2 · 3\` và bổ đề Euclid áp dụng được cho thừa số nguyên tố 2 (hoặc 3). Tổng quát: \`√n\` hữu tỉ ⇔ \`n\` là số chính phương.

**Q: Vì sao chứng minh \`π\` vô tỉ khó hơn?** Vì \`π\` không phải nghiệm của đa thức hệ số nguyên (siêu việt) — không có "phương trình đại số" để khai thác. Chứng minh của Lambert (1761) dùng phân số liên tục cho \`tan(x)\`; chứng minh hiện đại dùng giải tích phức. Ngoài phạm vi của bài này.

Cách chứng minh tương tự áp dụng được cho \`√3\`, \`√5\`, \`√p\` với mọi số nguyên tố \`p\` (sẽ làm \`√3\` ở bài tập 4).

#### 🔁 Dừng lại tự kiểm tra

Tại sao chứng minh trên KHÔNG hoạt động cho \`√4\`? (Tức nếu áp dụng máy móc các bước thì lỗi ở đâu?)

<details>
<summary>Đáp án</summary>

Bước 3 sẽ ra \`p² = 4q²\`, nói rằng \`p² chia hết cho 4\`. Suy ra \`p chia hết cho 2\`, viết \`p = 2k\`. Thay vào: \`4k² = 4q²\` ⇒ \`k² = q²\`. Đây **không** suy ra \`q\` chia hết cho 2 — \`q\` có thể là bất kỳ số nào. Vậy không có mâu thuẫn. Đúng — vì \`√4 = 2 = 2/1\` thật sự là hữu tỉ.
</details>

#### 📝 Tóm tắt mục 4

- Chứng minh phản chứng: giả định ngược, dẫn ra mâu thuẫn.
- Bước cốt lõi: bổ đề "\`p²\` chẵn ⇒ \`p\` chẵn" (đối ngẫu của "\`p\` lẻ ⇒ \`p²\` lẻ").
- Áp dụng được cho \`√p\` với mọi nguyên tố \`p\`.
- \`√n\` hữu tỉ ⇔ \`n\` chính phương.
- \`π\`, \`e\` vô tỉ và siêu việt — chứng minh khó hơn nhiều.

**Còn π và e thì sao?** Chứng minh \`π\` và \`e\` vô tỉ khó hơn nhiều (\`e\` được Euler chứng minh năm 1737, \`π\` được Lambert chứng minh năm 1761). Ở trình độ này, chỉ cần nhớ kết quả: cả hai đều vô tỉ và là số **siêu việt** (transcendental) — không phải nghiệm của bất kỳ đa thức hệ số nguyên nào.

### 4.1. "Vô tỉ" nghĩa là gì trực quan?

Theo nghĩa đen: *không có tỉ lệ* (no ratio). Tiếng Anh *irrational* cũng vậy — "ir-" (không) + "rational" (có ratio, tức tỉ lệ). **Vô tỉ = không viết được dưới dạng tỉ số \`p/q\`**.

Hệ quả thực tế:

- Phần thập phân **vô hạn và không tuần hoàn** (nếu tuần hoàn thì sẽ ra phân số).
- Mọi xấp xỉ thập phân hữu hạn của số vô tỉ đều là số **hữu tỉ khác**, không phải nó. \`3.14159\` không phải \`π\`; \`1.41421\` không phải \`√2\`.

## 5. Máy tính và số thực — vì sao \`0.1 + 0.2 != 0.3\`?

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

Kết quả: \`0.30000000000000004\`, **không phải** \`0.3\`. Mọi ngôn ngữ dùng IEEE 754 (Go, Python, JavaScript, C++, Java, ...) đều cho cùng kết quả này. Đây không phải lỗi Go.

### 5.2. Vì sao? — IEEE 754 và nhị phân

#### 💡 Trực giác / Hình dung

Tưởng tượng bạn muốn ghi số \`1/3\` chính xác trong hệ 10. Bạn viết \`0.333333333...\` — vô hạn chữ số 3. Nếu chỉ có 5 ô để ghi, bạn ghi \`0.33333\` và **chấp nhận sai số** ở các chữ số sau.

\`0.1\` trong hệ 10 trông tròn trịa, **nhưng trong hệ 2 thì giống như \`1/3\` trong hệ 10**: vô hạn chữ số tuần hoàn. Máy tính chỉ có 52 bit để ghi → phải cắt → có sai số.

#### Cấu trúc float64 (IEEE 754 double precision)

Máy tính lưu \`float64\` (\`double\`) dưới dạng nhị phân: 1 bit dấu + 11 bit mũ + 52 bit phần định trị (mantissa), tổng 64 bit.

\`\`\`
[sign: 1 bit] [exponent: 11 bits] [mantissa: 52 bits]
   s              eeee...e             mmmm...m
\`\`\`

Giá trị (cho số bình thường — normalized):

\`\`\`
giá trị = (−1)^s × (1.mmm...m)₂ × 2^(e − 1023)
\`\`\`

Trong đó:
- \`s\` (1 bit): dấu — 0 là dương, 1 là âm.
- \`e\` (11 bit): mũ (exponent), được lưu với "bias" 1023. Tức \`e_thực = e − 1023\`, phạm vi từ \`−1022\` tới \`+1023\`.
- \`mantissa\` (52 bit): phần định trị, ngầm hiểu có "1." ở đầu (gọi là **implicit leading 1**), cho tổng cộng 53 bit có nghĩa.

Với cấu trúc này, **số float64 hữu hạn nhất luôn có dạng**:

\`\`\`
m × 2^e   với m nguyên, |m| < 2^53, e nguyên
\`\`\`

Số nào không viết được dưới dạng này thì **không** lưu chính xác.

#### Walk-through: chuyển \`0.1\` sang nhị phân

Để chuyển phần thập phân từ hệ 10 sang hệ 2, **nhân với 2 liên tục, lấy phần nguyên làm bit**.

Bắt đầu với \`0.1\`:

| Bước | Phép tính | Phần nguyên (bit) | Phần thập phân còn lại |
|------|-----------|-------------------|------------------------|
| 1 | \`0.1 × 2 = 0.2\` | \`0\` | \`0.2\` |
| 2 | \`0.2 × 2 = 0.4\` | \`0\` | \`0.4\` |
| 3 | \`0.4 × 2 = 0.8\` | \`0\` | \`0.8\` |
| 4 | \`0.8 × 2 = 1.6\` | \`1\` | \`0.6\` |
| 5 | \`0.6 × 2 = 1.2\` | \`1\` | \`0.2\` ← lặp lại! |
| 6 | \`0.2 × 2 = 0.4\` | \`0\` | \`0.4\` |
| 7 | \`0.4 × 2 = 0.8\` | \`0\` | \`0.8\` |
| 8 | \`0.8 × 2 = 1.6\` | \`1\` | \`0.6\` |
| 9 | \`0.6 × 2 = 1.2\` | \`1\` | \`0.2\` ← lặp tiếp |

Ta thấy: ngay sau 4 bước đầu (\`0.0001\`), phần thập phân quay về \`0.2\` — chu kỳ "0011" lặp vô hạn.

\`\`\`
0.1₁₀ = 0.00011 0011 0011 0011 0011 0011 ...₂   ← lặp "0011" vô hạn
\`\`\`

*Vì sao lặp?* Vì \`0.1 = 1/10\`, và \`10 = 2 · 5\`. Hệ 2 chỉ "hợp" với lũy thừa của 2; thừa số 5 trong mẫu khiến biểu diễn nhị phân tuần hoàn. Tổng quát: \`1/n\` có biểu diễn hữu hạn trong hệ 2 ⇔ \`n = 2^k\`.

#### Vì sao IEEE 754 chỉ giữ 52 bit?

Mantissa 52 bit + leading 1 ngầm = 53 bit có nghĩa. Đây là quyết định cân bằng:
- Nhiều bit hơn → chính xác hơn nhưng tốn RAM.
- 64 bit tổng (8 byte) khớp với word size phổ biến của CPU.

53 bit nghĩa cho **độ chính xác tương đối ≈ 2⁻⁵³ ≈ 1.11 × 10⁻¹⁶**. Tức \`float64\` chính xác đến khoảng **15-17 chữ số thập phân**.

#### Cụ thể: 52 bit đầu của \`0.1\`

Cắt sau 52 bit mantissa (lấy normalized form):

\`\`\`
0.1₁₀ ≈ 1.1001100110011001100110011001100110011001100110011010 × 2⁻⁴
        ↑                                                       ↑
   leading "1" ngầm                              bit cuối (làm tròn)
\`\`\`

Bit cuối là \`0\` hay \`1\` tùy quy tắc làm tròn (round-to-nearest, ties-to-even — quy tắc mặc định của IEEE 754). Số được lưu thực ra là:

\`\`\`
0.1 (lưu) = 0.1000000000000000055511151231257827021181583404541015625
\`\`\`

Hai số \`0.1₁₀ thật\` và \`0.1 (lưu)\` lệch nhau ở chữ số thứ 17. Tương tự \`0.2 (lưu)\` cũng lệch.

#### Cộng \`0.1 + 0.2\`

Khi cộng hai số đã có sai số nhỏ, sai số có thể **không triệt tiêu** mà cộng lại:

\`\`\`
0.1 (lưu) ≈ 0.1000000000000000055...
0.2 (lưu) ≈ 0.2000000000000000111...
─────────────────────────────────────
tổng      ≈ 0.3000000000000000166...
\`\`\`

Tổng này tiếp tục được làm tròn về 53 bit → ra \`0.30000000000000004\` (như Go in ra).

So với \`0.3 (lưu) ≈ 0.2999999999999999889...\`, ta thấy \`0.1 + 0.2 ≠ 0.3\` trong IEEE 754.

#### Bảng các số float "chính xác" và "không chính xác"

| Số (hệ 10) | Có chính xác trong float64? | Lý do |
|------------|------------------------------|-------|
| \`0\` | ✓ | \`0 × 2⁰\` |
| \`0.5\` | ✓ | \`1 × 2⁻¹\` |
| \`0.25\` | ✓ | \`1 × 2⁻²\` |
| \`0.75\` | ✓ | \`3 × 2⁻²\` (\`3 = 11₂\` vừa) |
| \`1.0\` | ✓ | \`1 × 2⁰\` |
| \`0.1\` | ✗ | Mẫu có thừa số 5, lặp vô hạn |
| \`0.2\` | ✗ | Tương tự |
| \`0.3\` | ✗ | Tương tự |
| \`1/3\` | ✗ | Mẫu có thừa số 3 |
| \`π\` | ✗ | Vô tỉ, vô hạn không tuần hoàn |
| \`2⁵³ + 1\` | ✗ | Quá lớn, vượt 53 bit có nghĩa |

#### ⚠ Lỗi thường gặp

- **So sánh float bằng \`==\`**: như đã nói. Luôn dùng \`almostEqual\`.
- **Cộng dồn nhiều lần**: sai số tích lũy. \`for { s += 0.1 }\` 100 lần ra một số khá lệch.
- **Trừ hai số gần nhau** (catastrophic cancellation): \`(1.0 + 1e-15) − 1.0\` ra \`1.1e-15\` thay vì \`1e-15\` — mất hầu hết bit nghĩa.
- **Lưu tiền tệ bằng float**: SAI nghiêm trọng. \`0.1 + 0.2 ≠ 0.3\` nghĩa là "1 đồng + 2 đồng ≠ 3 đồng" trong code. Tiền tệ phải dùng integer (đơn vị nhỏ nhất, vd cent) hoặc decimal type.

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

\`eps\` thường chọn \`1e-9\` cho \`float64\` thông thường. Cẩn thận hơn (relative epsilon) thì chia cho \`max(|a|, |b|)\`, nhưng \`1e-9\` đủ dùng cho phần lớn trường hợp ML.

### 5.4. Câu hỏi tự nhiên

**Q: Số nào trong float là chính xác?**

Bất kỳ số nào viết được dưới dạng \`m × 2^e\` với \`m, e\` nguyên và \`m\` vừa trong 52 bit. Ví dụ \`0.5 = 2⁻¹\`, \`0.25 = 2⁻²\`, \`0.125 = 2⁻³\` đều chính xác. Cộng/trừ/nhân chúng vẫn chính xác. Nhưng \`0.1, 0.2, 0.3\` đều không.

**Q: Sai số có tích lũy không?**

Có. Nếu cộng \`0.1\` mười lần:

\`\`\`go
s := 0.0
for i := 0; i < 10; i++ { s += 0.1 }
fmt.Println(s)        // 0.9999999999999999, không phải 1.0
\`\`\`

Trong huấn luyện neural network, hàng tỷ phép cộng/nhân tích lũy sai số là chuyện thường. Đây là lý do người ta dùng kỹ thuật như **Kahan summation**, **mixed precision** (fp16 + fp32), **gradient clipping**.

**Q: Có cách nào tính \`0.1 + 0.2 = 0.3\` chính xác không?**

Có — dùng số thập phân (decimal) hoặc phân số (rational/big-rational). Go có \`math/big\`: \`big.Float\`, \`big.Rat\`. Nhưng chậm hơn nhiều, chỉ dùng khi cần (vd tiền tệ — không bao giờ lưu tiền bằng float).

**Q: Có liên quan gì đến ML?**

Rất nhiều. Loss function của bạn được tính bằng float, gradient được tính bằng float, weight được cập nhật bằng float. Khi loss "không hội tụ" hoặc "NaN", thường là do sai số float (vd \`log(0)\`, \`0/0\`, overflow). Hiểu được điều này giúp bạn debug nhanh hơn 10 lần.

#### 🔁 Dừng lại tự kiểm tra

1. \`0.5 + 0.25 == 0.75\` trả về gì trong Go?
2. \`0.1 + 0.1 + 0.1 == 0.3\` trả về gì?

<details>
<summary>Đáp án</summary>

1. \`true\`. Vì \`0.5\`, \`0.25\`, \`0.75\` đều có biểu diễn nhị phân chính xác (đều là phân số mẫu lũy thừa của 2).
2. \`false\`. \`0.1\` không chính xác → cộng 3 lần ra \`0.30000000000000004\`, không bằng \`0.3\` (cũng không chính xác).
</details>

#### 📝 Tóm tắt mục 5

- Float64 = 1 dấu + 11 mũ + 52 mantissa, độ chính xác ≈ 15-17 chữ số thập phân.
- \`0.1\` trong nhị phân lặp "0011" vô hạn → phải cắt → sai số.
- KHÔNG so sánh float bằng \`==\`. Dùng \`almostEqual(a, b, eps)\`.
- Sai số tích lũy trong vòng lặp dài (ML training).
- Tiền tệ KHÔNG dùng float. Dùng int (cent) hoặc decimal.

## 6. Liên hệ với các tầng sau

Bài này có vẻ "tủn mủn" — sao lại học những thứ tiểu học khi mục tiêu là ML/AI? Vì tất cả tầng sau xây trên nó:

- **Vector arithmetic** (Tầng 4): vector là tuple \`(x₁, x₂, ..., xₙ)\` với \`xᵢ ∈ ℝ\`. Cộng vector = cộng từng thành phần. Để hiểu, phải hiểu cộng số thực trước.
- **Norm L1** = \`||v||₁ = |v₁| + |v₂| + ... + |vₙ|\`. Đây chính là giá trị tuyệt đối, áp dụng từng thành phần rồi cộng.
- **Norm L2** = \`||v||₂ = √(v₁² + v₂² + ... + vₙ²)\`. Có căn — cần biết căn thì vô tỉ.
- **Embedding space**: BERT embedding 768 chiều là một điểm trong ℝ⁷⁶⁸. "Cosine similarity" đo góc giữa hai điểm ở đó.
- **Logarit và cross-entropy loss** (Tầng 1, Lesson 04 + 07): loss = \`−log(p)\`. Khi \`p\` rất nhỏ (do float underflow), \`log\` ra \`−∞\` → NaN. Cần "log-sum-exp trick".
- **So sánh và thứ tự**: \`argmax\` chọn chỉ số có giá trị lớn nhất; \`top-k\` chọn k phần tử lớn nhất. Cả hai đều cần phép \`<\`/\`>\` mà ta định nghĩa ở §2.

→ Nếu §1–§5 của bài này là "bê tông móng", thì cả ML/AI là tòa nhà ngồi trên móng đó.

#### Walk-through nhỏ: từ số tới embedding

Giả sử ta có một embedding 3 chiều cho từ "mèo": \`v = (0.42, −0.31, 0.78)\`. Đây là 3 số thực, mỗi số thuộc ℝ. Tính:

- **Norm L2**: \`||v||₂ = √(0.42² + (−0.31)² + 0.78²) = √(0.1764 + 0.0961 + 0.6084) = √0.8809 ≈ 0.9386\`.
  - Bên trong dùng: bình phương (mỗi thành phần ∈ ℝ → bình phương vẫn ∈ ℝ), cộng (đóng trong ℝ), căn bậc hai (kết quả ∈ ℝ).
  - Tất cả là phép trên số thực mà bạn đã học ở bài này.

- **Norm L1**: \`||v||₁ = |0.42| + |−0.31| + |0.78| = 0.42 + 0.31 + 0.78 = 1.51\`. Dùng \`|·|\` từ §3.

- **So sánh hai embedding**: muốn biết "mèo" gần "chó" hơn hay "máy bay" hơn? Tính \`cosine_similarity(v_mèo, v_chó)\` và \`cosine_similarity(v_mèo, v_máybay)\`, dùng \`>\` (§2.2) để so sánh.

Bạn thấy đấy — không có khái niệm nào trong ML mà không xài ít nhất một thứ từ Lesson 01 này.

#### 📝 Tóm tắt mục 6

- ℝ là "không gian sống" của vector ML.
- Norm L1 = tổng \`|·|\` từng thành phần.
- Norm L2 = căn của tổng bình phương — cần vô tỉ.
- So sánh embedding cần thứ tự \`<\`, \`>\`.
- Float precision (§5) là gốc rễ của nhiều bug trong training.

## 7. Bài tập

**Bài 1.** Phân loại các số sau vào ℕ, ℤ, ℚ, ℝ\\ℚ (mỗi số ghi đầy đủ các tập mà nó thuộc):

\`0\`, \`−3\`, \`0.5\`, \`√2\`, \`π\`, \`−1.5\`, \`22/7\`, \`0.333...\`, \`√4\`, \`−0\`

**Bài 2.** Tính:

\`|−7|\`, \`|3|\`, \`|0|\`, \`|3 − 8|\`, \`|−2 + 5|\`, \`|−4| · |−2|\`, \`||−5| − |3||\`

**Bài 3.** So sánh (đặt \`<\`, \`>\`, hoặc \`=\`):

a) \`22/7\` vs \`π\`
b) \`0.999...\` vs \`1\`
c) \`√2\` vs \`1.414\`
d) \`−|−3|\` vs \`−3\`
e) \`|−5|\` vs \`|3 − 8|\`

**Bài 4.** Chứng minh \`√3\` vô tỉ. (Gợi ý: phản chứng tương tự \`√2\` ở §4. Lưu ý chỗ "p chẵn vì p² chẵn" phải đổi: với mod 3, dùng "nếu p² chia hết cho 3 thì p chia hết cho 3".)

**Bài 5.** Viết hàm Go:

\`\`\`go
func almostEqual(a, b, eps float64) bool
\`\`\`

trả về \`true\` nếu \`|a − b| < eps\`. Sau đó:

a) Giải thích vì sao **không** dùng \`a == b\` trực tiếp với \`float64\`.
b) Cho ví dụ một cặp \`(a, b)\` mà bằng nhau "về toán" nhưng \`a == b\` trả về \`false\`.
c) Cảnh báo: với \`eps = 1e-9\`, hàm này hoạt động đúng với số "vừa phải" (vd 0.1..1000), nhưng có thể sai với số rất lớn hoặc rất nhỏ. Vì sao?

## Lời giải chi tiết

### Bài 1

Lưu ý ℕ ⊂ ℤ ⊂ ℚ ⊂ ℝ, nên một số thuộc ℕ cũng tự động thuộc ℤ, ℚ, ℝ.

| Số | ℕ | ℤ | ℚ | ℝ\\ℚ | Giải thích |
|----|---|---|---|------|------------|
| \`0\` | ✓ | ✓ | ✓ | | Số tự nhiên (theo quy ước có 0). |
| \`−3\` | | ✓ | ✓ | | Nguyên âm, không tự nhiên. |
| \`0.5\` | | | ✓ | | \`= 1/2\`, hữu tỉ. |
| \`√2\` | | | | ✓ | Vô tỉ (chứng minh §4). |
| \`π\` | | | | ✓ | Vô tỉ (cả siêu việt). |
| \`−1.5\` | | | ✓ | | \`= −3/2\`, hữu tỉ. |
| \`22/7\` | | | ✓ | | Phân số, hữu tỉ. **Không phải π**, chỉ xấp xỉ. |
| \`0.333...\` | | | ✓ | | \`= 1/3\`, tuần hoàn → hữu tỉ. |
| \`√4\` | ✓ | ✓ | ✓ | | \`√4 = 2\`, là số tự nhiên! Mẹo: căn của số chính phương ra số nguyên. |
| \`−0\` | ✓ | ✓ | ✓ | | \`−0 = 0\`, là số 0. |

Hai cái bẫy ở bài này: (1) \`√4 = 2\` thuộc ℕ — phải tính ra trước khi phân loại; (2) \`22/7 ≠ π\` — \`22/7\` hữu tỉ, \`π\` vô tỉ.

### Bài 2

| Biểu thức | Tính | Kết quả |
|-----------|------|---------|
| \`|−7|\` | \`−7 < 0\` → \`−(−7)\` | \`7\` |
| \`|3|\` | \`3 ≥ 0\` | \`3\` |
| \`|0|\` | \`0 ≥ 0\` | \`0\` |
| \`|3 − 8|\` | bên trong: \`−5\`, sau: \`|−5|\` | \`5\` |
| \`|−2 + 5|\` | bên trong: \`3\`, sau: \`|3|\` | \`3\` |
| \`|−4| · |−2|\` | \`4 · 2\` | \`8\` |
| \`||−5| − |3||\` | \`|5 − 3| = |2|\` | \`2\` |

Bẫy ở câu cuối: dấu \`| |\` lồng nhau. Tính từ trong ra ngoài: \`|−5| = 5\`, \`|3| = 3\`, hiệu là \`2\`, rồi \`|2| = 2\`.

### Bài 3

a) \`22/7 = 3.142857142857...\` còn \`π = 3.14159265358...\`. So sánh chữ số thứ 3 sau dấu phẩy: \`8 > 1\`, nên \`22/7 > π\`.

b) \`0.999... = 1\`. Bằng nhau! Chứng minh ngắn: gọi \`x = 0.999...\`. Khi đó \`10x = 9.999... = 9 + x\`, suy ra \`9x = 9\`, suy ra \`x = 1\`. Đây là một trong những "sự thật toán học gây sốc" nhưng đúng — \`0.999...\` (với vô hạn số 9) chính là \`1\`, chỉ là cách viết khác.

c) \`√2 = 1.41421356...\`, còn \`1.414\` đứng yên (không có dấu \`...\`). \`1.414 < √2\`. (Lưu ý: \`1.4142\` < √2 vẫn đúng; chỉ \`√2\` mới bằng chính nó.)

d) \`−|−3| = −3\` (vì \`|−3| = 3\`, dấu trừ ngoài → \`−3\`). Vế phải cũng \`−3\`. Bằng nhau: \`−|−3| = −3\`.

e) \`|−5| = 5\`, \`|3 − 8| = |−5| = 5\`. Bằng nhau: \`|−5| = |3 − 8|\`.

### Bài 4 — \`√3\` vô tỉ

Giả sử ngược lại: \`√3 = p/q\` với \`p, q\` nguyên, \`q ≠ 0\`, \`gcd(p, q) = 1\`.

Bình phương: \`3 = p²/q²\`, nên \`3q² = p²\`. (*)

Suy ra \`p²\` chia hết cho 3. Cần bổ đề: *nếu \`p²\` chia hết cho 3 thì \`p\` chia hết cho 3*. Chứng minh ngắn: viết \`p = 3k + r\` với \`r ∈ {0, 1, 2}\`. Khi đó \`p² = 9k² + 6kr + r²\`, và \`p² mod 3 = r² mod 3\`. Lấy ba trường hợp:

- \`r = 0\`: \`r² = 0\` → \`p² ≡ 0 (mod 3)\`
- \`r = 1\`: \`r² = 1\` → \`p² ≡ 1 (mod 3)\`
- \`r = 2\`: \`r² = 4 ≡ 1 (mod 3)\` → \`p² ≡ 1 (mod 3)\`

Vậy \`p² ≡ 0 (mod 3)\` chỉ khi \`r = 0\`, tức \`p\` chia hết cho 3. □ bổ đề.

Quay lại: từ (*) suy ra \`p\` chia hết cho 3, viết \`p = 3k\`. Thay vào (*):

\`\`\`
3q² = 9k²
q² = 3k²
\`\`\`

Suy ra \`q²\` chia hết cho 3 → \`q\` chia hết cho 3. Vậy cả \`p\` và \`q\` chia hết cho 3, mâu thuẫn với \`gcd(p, q) = 1\`. □

(Cách chứng minh y hệt áp dụng được cho \`√p\` với mọi số nguyên tố \`p\`.)

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

a) **Vì sao không dùng \`a == b\`**: vì \`float64\` lưu số nhị phân, mà \`0.1\`, \`0.2\`, \`0.3\` không có biểu diễn nhị phân hữu hạn. Khi cộng hai số đã lệch, kết quả lệch thêm. \`0.1 + 0.2 = 0.30000000000000004\`, không bằng \`0.3\`. Tổng quát: hai số "bằng nhau về toán" có thể bị lưu bằng hai bit pattern khác nhau trong RAM, nên \`==\` so sánh bit pattern thì trả về \`false\`.

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

c) **Vì sao \`eps = 1e-9\` có thể sai**: vì \`eps\` là **sai số tuyệt đối**, không cân nhắc độ lớn của \`a, b\`.

- Với số rất lớn (vd \`a = 1e20\`, \`b = 1e20 + 100\`), hiệu là 100, lớn hơn \`1e-9\` rất nhiều — hàm trả về \`false\`. Nhưng \`100 / 1e20 = 1e-18\`, hai số gần như giống hệt nhau về **tương đối**. Đây là trường hợp "đáng lẽ bằng" nhưng hàm nói "không bằng".
- Với số rất nhỏ (vd \`a = 1e-20\`, \`b = 2e-20\`), hiệu là \`1e-20\`, nhỏ hơn \`1e-9\` — hàm trả về \`true\`. Nhưng \`b\` gấp đôi \`a\`, rất khác nhau về tương đối. Đây là trường hợp "đáng lẽ không bằng" nhưng hàm nói "bằng".

Cách khắc phục: dùng **relative epsilon** \`|a − b| < eps · max(|a|, |b|)\`, hoặc kết hợp cả tuyệt đối và tương đối:

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
