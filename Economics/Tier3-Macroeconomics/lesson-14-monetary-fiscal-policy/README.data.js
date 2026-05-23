// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: Economics/Tier3-Macroeconomics/lesson-14-monetary-fiscal-policy/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 14 — Monetary & Fiscal Policy

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Hiểu **chính sách tiền tệ** của Ngân hàng Trung ương (NHTW) — công cụ + mục tiêu + cơ chế truyền dẫn.
- Hiểu **chính sách tài khóa** của chính phủ — chi tiêu, thuế, ngân sách.
- Áp dụng **Taylor rule** để dự đoán lãi suất NHTW theo lạm phát + output gap.
- Hiểu **multiplier tài khóa** — \`ΔY / ΔG\` lớn hay nhỏ tùy điều kiện.
- Phân biệt **chính sách phản chu kỳ (countercyclical)** và **thuận chu kỳ (procyclical)**.
- Hiểu **zero lower bound** và **unconventional monetary policy** (QE).

## Kiến thức tiền đề

- [Lesson 13](../lesson-13-is-lm-ad-as/): IS-LM, AD-AS.

## 1. Chính sách tiền tệ

### 1.1. Công cụ của NHTW

1. **Lãi suất chính sách (policy rate)**: ở Việt Nam là lãi suất tái cấp vốn / refi; ở Mỹ là federal funds rate. Khi đặt = X% → ngân hàng thương mại nhận hoặc gửi ở mức gần X% → lãi suất khác trong kinh tế cũng theo.
2. **Open market operations (OMO)**: NHTW mua / bán trái phiếu chính phủ → bơm / hút tiền cơ sở.
3. **Reserve requirement**: tỉ lệ dự trữ bắt buộc của NHTM. Cao → ít cho vay → siết tiền.
4. **Lender of last resort**: cho NHTM vay khẩn cấp khi khủng hoảng.

### 1.2. Mục tiêu

- **Lạm phát** ổn định (thường mục tiêu ~2% ở các nước phát triển; Việt Nam ~4%).
- **Việc làm** (chỉ ở một số NHTW, vd Fed có dual mandate).
- **Ổn định tài chính**.

### 1.3. Cơ chế truyền dẫn

NHTW hạ lãi suất → lãi vay giảm → I tăng, C lâu bền tăng → AD dịch phải → Y tăng. Đồng nội tệ yếu đi → X tăng, M giảm → AD dịch phải thêm. Trong dài hạn → P tăng (nếu vượt LRAS).

### 1.4. Taylor Rule

Quy tắc thực nghiệm cho lãi suất chính sách:
\`\`\`
i = r* + π + 0.5(π − π*) + 0.5·output gap
\`\`\`
- \`r*\` = lãi suất thực cân bằng (~2%).
- \`π\` = lạm phát thực tế.
- \`π*\` = mục tiêu lạm phát.
- Output gap = \`(Y − Y*) / Y*\`.

**Walk-through**: \`r* = 2%, π = 3%, π* = 2%, output gap = 1%\`:
\`\`\`
i = 2 + 3 + 0.5(3−2) + 0.5(1) = 2 + 3 + 0.5 + 0.5 = 6%
\`\`\`

NHTW nên đặt lãi suất \`~6%\`. Lạm phát quá target + nền kinh tế nóng → siết.

### 1.5. Zero Lower Bound

Lãi suất danh nghĩa khó âm (vì tiền mặt = 0% lãi). Khi cần kích thích mạnh hơn (suy thoái sâu) → bị kẹt. Giải pháp:

- **QE (Quantitative Easing)**: mua trái phiếu dài hạn → đẩy lãi suất dài hạn xuống.
- **Forward guidance**: cam kết giữ lãi suất thấp lâu → tác động kỳ vọng.
- **Lãi suất danh nghĩa âm** (vài NHTW: ECB, BoJ, SNB) — tiền gửi NHTM tại NHTW chịu phí.

## 2. Chính sách tài khóa

### 2.1. Công cụ

- **Chi tiêu chính phủ G**: cơ sở hạ tầng, lương công, mua sắm công.
- **Thuế T**: thuế thu nhập, VAT, thuế DN.
- **Chuyển nhượng**: BHXH, trợ cấp.

### 2.2. Multiplier tài khóa

ΔY/ΔG = bao nhiêu? Phụ thuộc nhiều yếu tố:

**Multiplier đơn giản** từ Keynesian: \`1/(1−MPC)\`. Với MPC = 0.6 → multiplier = \`2.5\`. Tăng G 100 → Y tăng 250.

**Thực tế nhỏ hơn** vì:
- Crowding out (r tăng → I giảm).
- Phụ thuộc vào trạng thái nền kinh tế: gần full capacity → nhỏ; suy thoái sâu → lớn (~1.5-2).
- Phụ thuộc loại chi tiêu: chi cơ sở hạ tầng > chi tiêu vận hành > giảm thuế.

### 2.3. Chính sách phản chu kỳ vs thuận chu kỳ

- **Countercyclical**: kích thích khi suy thoái, siết khi bùng nổ → giảm dao động.
- **Procyclical**: cùng chiều với chu kỳ — bad, làm tăng dao động. Nhiều nước đang phát triển có tài khóa procyclical vì khả năng vay hạn chế.

### 2.4. Nợ công và tính bền vững

Nợ/GDP tăng → áp lực lên ngân sách (lãi vay). Bền vững nếu \`r < g\` (lãi suất < tăng trưởng) — vì GDP "tự nuốt" nợ. Khi \`r > g\` → cần thặng dư primary để giảm nợ/GDP.

## 3. Phối hợp tiền tệ + tài khóa

Hai chính sách có thể phối hợp:

- **Suy thoái sâu**: cần cả mở rộng tiền tệ + tài khóa.
- **Lạm phát cao**: cả hai siết → tránh "đẩy nhau".

Phối hợp khó vì:
- NHTW thường *độc lập* về thể chế.
- Mục tiêu khác nhau (NHTW: lạm phát; chính phủ: việc làm, tăng trưởng).

## 4. Bài tập thực hành

### Bài 1 — Taylor rule

\`r* = 2%, π* = 2%\`. Tính lãi suất Taylor cho:
- (a) π = 4%, output gap = 2%.
- (b) π = 1%, output gap = −3%.

### Bài 2 — Multiplier

Nền kinh tế có MPC = 0.7. ΔG = 100.

- (a) Multiplier đơn giản? ΔY?
- (b) Nếu có crowding out 30%, ΔY thực tế?

### Bài 3 — Zero lower bound

Tình huống: π = −1% (giảm phát), output gap = −5%. Taylor rule gợi i = ?. Có khả thi không?

### Bài 4 — Nợ bền vững

Nước có nợ/GDP = 60%, r = 5%, g = 7%. Primary balance = 0. Sau 1 năm, nợ/GDP ≈?

## 5. Lời giải chi tiết

### Lời giải Bài 1

(a) \`i = 2 + 4 + 0.5(4−2) + 0.5(2) = 2 + 4 + 1 + 1 = 8%\`. → Siết mạnh.

(b) \`i = 2 + 1 + 0.5(1−2) + 0.5(−3) = 2 + 1 − 0.5 − 1.5 = 1%\`. → Nới lỏng. (Nếu Taylor rule âm, gặp zero lower bound.)

### Lời giải Bài 2

(a) \`1/(1−0.7) = 3.33\`. ΔY = \`333\`.

(b) Crowding out 30% → ΔY thực = \`333 × 0.7 = 233\`.

### Lời giải Bài 3

\`i = 2 − 1 + 0.5(−1−2) + 0.5(−5) = 2 − 1 − 1.5 − 2.5 = −3%\`. **Âm** → không khả thi với chính sách thông thường (zero lower bound). Cần QE / forward guidance / fiscal expansion.

### Lời giải Bài 4

\`r < g\` (5% < 7%) → nợ/GDP *tự giảm*. Approx: \`debt/GDP_t+1 = debt/GDP_t × (1+r)/(1+g) ≈ 60% × 1.05/1.07 ≈ 58.9%\`. → Bền vững, nợ/GDP giảm tự nhiên.

## 6. Liên kết và bài tiếp theo

- **Bài tiếp theo**: [Lesson 15 — Inflation & Unemployment](../lesson-15-inflation-unemployment/).
- **Bài trước**: [Lesson 13 — IS-LM / AD-AS](../lesson-13-is-lm-ad-as/).
- **Minh họa**: [visualization.html](./visualization.html) — máy tính Taylor rule, multiplier.
`;
