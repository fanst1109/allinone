// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: Economics/Tier3-Macroeconomics/lesson-13-is-lm-ad-as/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 13 — IS-LM / AD-AS (Chu kỳ kinh tế)

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Hiểu **mô hình IS-LM** mô tả cân bằng đồng thời thị trường hàng hóa (IS) và thị trường tiền tệ (LM) trong ngắn hạn.
- Vẽ và đọc **đường IS** (kết hợp $(r, Y)$ mà thị trường hàng cân bằng) và **đường LM** (cân bằng thị trường tiền).
- Hiểu **đường AD** (tổng cầu) và **AS** ngắn hạn / dài hạn.
- Phân biệt 3 loại sốc: cầu, cung, tiền tệ — và phản ứng của nền kinh tế.
- Đặt nền tảng cho Lesson 14 (chính sách) và Lesson 15 (lạm phát).

## Kiến thức tiền đề

- [Lesson 11-12](../lesson-11-gdp-measurement/): GDP, growth.
- [Lesson 02](../../Tier1-Foundations/lesson-02-supply-demand/): cung-cầu (analogy).

## 1. Đường IS — Thị trường hàng hóa

### 1.1. Xuất phát

Tổng chi tiêu kế hoạch:

$$E = C(Y) + I(r) + G + NX$$

- $C(Y) = a + b \\cdot Y$ (consumption tăng theo thu nhập, $b$ = MPC marginal propensity to consume).
- $I(r) = d - e \\cdot r$ (đầu tư giảm khi lãi suất tăng).

Cân bằng thị trường hàng: $Y = E$.

### 1.2. Đường IS

Giải $Y = a + bY + d - e \\cdot r + G$ cho $Y$:

$$Y = \\frac{a + d + G}{1 - b} - \\frac{e}{1-b} \\cdot r$$

→ Đường IS *dốc xuống* trên hệ $(Y, r)$: $r$ tăng → đầu tư giảm → Y giảm.

**Walk-through**: $a = 100, b = 0.6, d = 200, e = 50, G = 50$. IS: $Y = \\frac{100 + 200 + 50}{0.4} - \\frac{50}{0.4} \\cdot r = 875 - 125r$.

- $r = 5\\%$: $Y = 250$.
- $r = 3\\%$: $Y = 500$.

## 2. Đường LM — Thị trường tiền tệ

### 2.1. Cung cầu tiền

Cầu tiền $M_d = k \\cdot Y - h \\cdot r$ (cần tiền cho giao dịch ↑Y, nhưng giữ tiền tốn cơ hội ↑r → cầu giảm).
Cung tiền $M_s$ cố định (do NHTW).

Cân bằng: $M_d = M_s/P$ (thực).

### 2.2. Đường LM

Giải $M/P = kY - hr$:

$$r = \\frac{k}{h} \\cdot Y - \\frac{M/P}{h}$$

→ Đường LM *dốc lên*: Y tăng → cần thêm tiền giao dịch → r phải tăng để cân bằng.

### 2.3. Cân bằng IS-LM

Giao điểm cho $(Y^*, r^*)$ — cân bằng ngắn hạn của nền kinh tế.

## 3. Dịch chuyển IS-LM

### 3.1. Sốc lên IS

- **G tăng** (chính sách tài khóa mở rộng): IS dịch phải → $Y^*\\uparrow, r^*\\uparrow$.
- **Thuế giảm** → C tăng → IS dịch phải.
- **Xuất khẩu giảm** → IS dịch trái → suy thoái.

### 3.2. Sốc lên LM

- **M tăng** (NHTW mở rộng tiền): LM dịch xuống → $Y^*\\uparrow, r^*\\downarrow$.
- **M giảm** (siết tiền): LM dịch lên → $Y^*\\downarrow, r^*\\uparrow$.

### 3.3. Crowding out

Khi G tăng nhưng M không đổi → r tăng → tư nhân giảm I → một phần tăng G "đẩy ra" (crowd out) đầu tư tư.

## 4. AD-AS

### 4.1. Đường AD

Từ IS-LM, mỗi giá $P$ cho một $Y^*$. Khi $P$ tăng → real money $M/P$ giảm → LM dịch lên → $Y$ giảm. → AD dốc xuống trên $(Y, P)$.

### 4.2. Đường SRAS (Short-Run Aggregate Supply)

Trong ngắn hạn, lương + giá *dính* (sticky) → tăng $P$ → hãng có lợi nhuận cao → sản xuất nhiều → SRAS dốc lên.

### 4.3. Đường LRAS

Dài hạn, mọi giá điều chỉnh → sản lượng = $Y^*$ (sản lượng tiềm năng, determined by Solow). LRAS *thẳng đứng* tại $Y^*$.

### 4.4. Cân bằng SR vs LR

- SR: AD ∩ SRAS = $(Y, P)$ ngắn hạn.
- LR: AD ∩ LRAS = $(Y^*, P)$ dài hạn.

Khi SR $\\neq$ LR → áp lực điều chỉnh giá → SRAS dịch.

### 4.5. Walk-through sốc

**Demand shock (G tăng)**: AD dịch phải. SR: cả Y và P tăng. LR: lương điều chỉnh → SRAS dịch lên → Y quay về $Y^*$, P cuối cùng cao hơn. Kết luận: chính sách tài khóa chỉ tăng Y *tạm thời*.

**Supply shock (giá dầu tăng)**: SRAS dịch lên. SR: Y giảm, P tăng → *stagflation*. Phục hồi LR khó vì NHTW kẹt: nới lỏng → tăng P thêm; siết → giảm Y thêm.

## 5. Bài tập thực hành

### Bài 1 — Tìm cân bằng IS-LM

IS: $Y = 800 - 100r$. LM: $Y = 200 + 200r$ (với r tính %). Tìm $(Y^*, r^*)$.

### Bài 2 — Tác động fiscal

Nếu G tăng làm IS dịch phải 100 (đường mới $Y = 900 - 100r$), $(Y^*, r^*)$ mới?

### Bài 3 — Crowding out

So sánh $\\Delta Y$ trong Bài 2 với $\\Delta Y$ khi LM ngang (r không đổi). Khoảng cách = crowding out.

### Bài 4 — Stagflation

Mô tả định tính kịch bản dầu tăng giá đột biến. Trên đồ thị AD-AS: đường nào dịch, hướng nào, kết quả $(Y, P)$?

## 6. Lời giải chi tiết

### Lời giải Bài 1

$800 - 100r = 200 + 200r \\to 600 = 300r \\to r^* = 2\\%$. $Y^* = 600$.

### Lời giải Bài 2

$900 - 100r = 200 + 200r \\to 700 = 300r \\to r^* \\approx 2.33\\%$. $Y^* \\approx 667$. $\\Delta Y = 67$, $\\Delta r = 0.33\\%$.

### Lời giải Bài 3

Nếu r cố định 2%: $\\Delta Y$ chỉ do IS dịch = 100. Thực tế $\\Delta Y = 67$. **Crowding out $= 100 - 67 = 33$** (33% G tăng bị đẩy ra do r tăng).

### Lời giải Bài 4

Giá dầu tăng → chi phí sản xuất tăng → **SRAS dịch lên** (sang trái nếu nhìn theo Y). Cân bằng mới: $Y\\downarrow, P\\uparrow$ → vừa suy thoái vừa lạm phát = **stagflation**. NHTW kẹt: nới lỏng (AD phải) → P thêm cao; siết (AD trái) → Y thêm thấp. Đây là tình huống của Mỹ 1970s.

## 7. Liên kết và bài tiếp theo

- **Bài tiếp theo**: [Lesson 14 — Monetary & Fiscal Policy](../lesson-14-monetary-fiscal-policy/).
- **Bài trước**: [Lesson 12 — Growth Models](../lesson-12-growth-models/).
- **Minh họa**: [visualization.html](./visualization.html) — IS-LM tương tác + AD-AS tương tác.
`;
