// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: Economics/Tier2-Microeconomics/lesson-07-production-cost/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 07 — Production & Cost (Sản xuất & Chi phí)

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Hiểu **hàm sản xuất** $Q = f(L, K)$ — quan hệ giữa đầu vào (lao động $L$, vốn $K$) và đầu ra $Q$.
- Phân biệt **sản phẩm biên (MP)** và **sản phẩm trung bình (AP)**, hiểu quy luật *lợi tức biên giảm dần*.
- Phân loại **lợi tức theo quy mô (returns to scale)**: tăng dần / không đổi / giảm dần.
- Phân biệt **chi phí cố định (FC)**, **biến (VC)**, **tổng (TC)** và các loại chi phí *trung bình* ($\\text{AFC}, \\text{AVC}, \\text{ATC}$) + chi phí *biên* ($\\text{MC}$).
- Biết tại sao đường MC cắt ATC ở điểm cực tiểu — và ý nghĩa kinh tế.
- Phân biệt **ngắn hạn** (một yếu tố cố định) và **dài hạn** (tất cả linh hoạt).

## Kiến thức tiền đề

- [Lesson 06](../lesson-06-consumer-theory/): nguyên tắc tối ưu, MU.
- Lesson 01: tư duy biên.

## 1. Hàm sản xuất

### 1.1. Định nghĩa

**Hàm sản xuất** $Q = f(L, K)$ cho biết sản lượng tối đa với mức đầu vào $L$ (lao động) và $K$ (vốn) cho trước.

**Cobb-Douglas**: $Q = A \\cdot L^\\alpha \\cdot K^\\beta$. $A$ = năng suất tổng hợp (TFP).

### 1.2. Sản phẩm biên và trung bình

- $\\text{MP}_L = \\dfrac{\\partial Q}{\\partial L}$: thêm 1 đơn vị $L$ tạo thêm bao nhiêu $Q$ (giữ $K$).
- $\\text{AP}_L = \\dfrac{Q}{L}$: trung bình mỗi $L$ làm ra bao nhiêu.

**Walk-through**: $Q = 10 \\cdot \\sqrt{L}$ ($K$ cố định).

| $L$ | $Q = 10\\sqrt{L}$ | $\\text{MP}_L$ (xấp xỉ) | $\\text{AP}_L$ |
|---|----------|----------------|------|
| 1 | 10.00 | — | 10.00 |
| 4 | 20.00 | 1.67 | 5.00 |
| 9 | 30.00 | 1.18 | 3.33 |
| 16 | 40.00 | 0.95 | 2.50 |
| 25 | 50.00 | 0.79 | 2.00 |

MP và AP đều giảm — quy luật lợi tức biên giảm dần.

#### 💡 Trực giác

Nhà bếp có 1 bếp ga (vốn). Thuê 1 đầu bếp → 20 món/giờ. Thuê thêm → 30, 38, 42, 44 món. Đầu bếp thứ 5 chỉ thêm 2 món vì *bếp đã chật*. Đây là *vốn cố định, lao động tăng → $\\text{MP}_L$ giảm*.

### 1.3. Returns to Scale

Khi *cả $L$ và $K$ cùng nhân với $t$*:

- **Tăng dần (IRS)**: $f(tL, tK) > t \\cdot f(L, K)$. Mở rộng có lợi (vd: phần mềm).
- **Không đổi (CRS)**: $f(tL, tK) = t \\cdot f(L, K)$. (Cobb-Douglas với $\\alpha + \\beta = 1$.)
- **Giảm dần (DRS)**: $f(tL, tK) < t \\cdot f(L, K)$. Khó quản lý khi quá lớn.

## 2. Chi phí — Phân loại

### 2.1. Cố định vs biến

- **FC (Fixed Cost)**: không đổi theo sản lượng. Vd: thuê mặt bằng, lương quản lý.
- **VC (Variable Cost)**: tăng theo sản lượng. Vd: nguyên liệu, lương công nhân theo giờ.
- $\\text{TC} = \\text{FC} + \\text{VC}$.

### 2.2. Trung bình và biên

- $\\text{AFC} = \\dfrac{\\text{FC}}{Q}$: giảm dần khi $Q$ tăng (chia cố định cho nhiều đơn vị).
- $\\text{AVC} = \\dfrac{\\text{VC}}{Q}$: thường hình U (giảm rồi tăng).
- $\\text{ATC} = \\dfrac{\\text{TC}}{Q} = \\text{AFC} + \\text{AVC}$: cũng hình U.
- $\\text{MC} = \\dfrac{\\Delta \\text{TC}}{\\Delta Q}$: chi phí biên.

### 2.3. Walk-through số

$\\text{FC} = 100$, $\\text{VC}(Q) = 2Q + 0.5Q^2$ (tăng phi tuyến). $\\text{TC}(Q) = 100 + 2Q + 0.5Q^2$.

| $Q$ | $\\text{TC}$ | $\\text{AFC}$ | $\\text{AVC}$ | $\\text{ATC}$ | $\\text{MC} = 2 + Q$ |
|---|----|----|----|-----|------|
| 10 | 100 + 20 + 50 = 170 | 10.0 | 7.0 | 17.0 | 12 |
| 20 | 100 + 40 + 200 = 340 | 5.0 | 12.0 | 17.0 | 22 |
| 30 | 100 + 60 + 450 = 610 | 3.3 | 17.0 | 20.3 | 32 |
| 40 | 100 + 80 + 800 = 980 | 2.5 | 22.0 | 24.5 | 42 |

### 2.4. MC cắt ATC tại cực tiểu

**Quan hệ**: MC cắt ATC từ dưới lên *tại điểm ATC cực tiểu*.

**Trực giác**: ATC = trung bình. MC = mỗi đơn vị mới. Nếu $\\text{MC} < \\text{ATC}$ → đơn vị mới kéo trung bình XUỐNG. Nếu $\\text{MC} > \\text{ATC}$ → kéo trung bình LÊN. Tại điểm bằng nhau → trung bình đạt cực tiểu.

Tương tự cho AVC.

#### ⚠ Lỗi thường gặp

- **Nhầm ATC với AVC**: ATC cao hơn AVC một lượng AFC. Khi $Q$ lớn, AFC nhỏ → ATC tiệm cận AVC.
- **Bỏ qua chi phí cơ hội của vốn**: TC kế toán chỉ tính chi phí *minh thị*. Chi phí kinh tế gồm cả *implicit cost* (vốn chủ sở hữu, công sức entrepreneur).

## 3. Ngắn hạn vs Dài hạn

### 3.1. Ngắn hạn (SR)

Ít nhất một yếu tố *cố định* (thường K). Hàm chi phí ngắn hạn có FC.

### 3.2. Dài hạn (LR)

Tất cả yếu tố *linh hoạt*. Không có "FC" thực sự — doanh nghiệp có thể thay đổi cả nhà máy. LRATC là *envelope* (đường bao dưới) của các SRATC.

LRATC thường có hình U:

- Phần dốc xuống: **lợi tức tăng theo quy mô** (mở rộng có lợi).
- Đáy: **quy mô tối ưu** (MES — minimum efficient scale).
- Phần dốc lên: **lợi tức giảm** (quản lý phức tạp).

## 4. Bài tập thực hành

### Bài 1 — Tính MP và AP

$Q = 20 \\cdot \\sqrt{L}$ ($K$ cố định). Tính $\\text{MP}_L$ và $\\text{AP}_L$ tại $L = 16$ và $L = 100$. Cả hai giảm hay tăng?

### Bài 2 — Returns to scale

Cho $Q = L^{0.4} \\cdot K^{0.4}$. Nhân $L$ và $K$ với 2 → $Q$ nhân với bao nhiêu? Đây là loại returns nào?

### Bài 3 — Bảng chi phí

$\\text{FC} = 50$, $\\text{VC} = 3Q + Q^2$. Tính $\\text{TC}, \\text{AFC}, \\text{AVC}, \\text{ATC}, \\text{MC}$ cho $Q = 1, 5, 10, 20$.

### Bài 4 — MC cắt ATC

Cho $\\text{TC} = 100 + 10Q + 0.5Q^2$. Tìm $Q$ tại đó $\\text{ATC} = \\text{MC}$. Tính giá trị $\\text{ATC}$ cực tiểu.

## 5. Lời giải chi tiết

### Lời giải Bài 1

$\\text{MP}_L = \\dfrac{dQ}{dL} = \\dfrac{20}{2\\sqrt{L}} = \\dfrac{10}{\\sqrt{L}}$.

- $L = 16$: $\\text{MP} = \\frac{10}{4} = 2.5$. $\\text{AP} = \\frac{Q}{L} = \\frac{80}{16} = 5$. $\\text{AP} > \\text{MP}$.
- $L = 100$: $\\text{MP} = \\frac{10}{10} = 1$. $\\text{AP} = \\frac{200}{100} = 2$. Cả MP và AP giảm.

### Lời giải Bài 2

$f(2L, 2K) = (2L)^{0.4} \\cdot (2K)^{0.4} = 2^{0.8} \\cdot L^{0.4} \\cdot K^{0.4} \\approx 1.74 \\cdot Q$. Tăng 74% khi nhân đôi đầu vào → **DRS** (giảm dần, vì $\\alpha + \\beta = 0.8 < 1$).

### Lời giải Bài 3

$\\text{MC} = \\dfrac{d\\text{TC}}{dQ} = 3 + 2Q$. $\\text{TC} = 50 + 3Q + Q^2$.

| $Q$ | $\\text{TC}$ | $\\text{AFC}$ | $\\text{AVC}$ | $\\text{ATC}$ | $\\text{MC}$ |
|---|----|----|----|----|-----|
| 1 | 54 | 50.0 | 4.0 | 54.0 | 5 |
| 5 | 90 | 10.0 | 8.0 | 18.0 | 13 |
| 10 | 180 | 5.0 | 13.0 | 18.0 | 23 |
| 20 | 510 | 2.5 | 23.0 | 25.5 | 43 |

### Lời giải Bài 4

$\\text{ATC} = \\dfrac{\\text{TC}}{Q} = \\dfrac{100}{Q} + 10 + 0.5Q$. $\\text{MC} = 10 + Q$. Đặt $\\text{MC} = \\text{ATC}$:

$$\\begin{aligned}
10 + Q &= \\frac{100}{Q} + 10 + 0.5Q \\\\
0.5Q &= \\frac{100}{Q} \\\\
Q^2 &= 200 \\\\
Q &\\approx 14.14
\\end{aligned}$$

$\\text{ATC}_{\\min} = \\dfrac{100}{14.14} + 10 + 0.5 \\times 14.14 \\approx 7.07 + 10 + 7.07 = 24.14$.

## 6. Liên kết và bài tiếp theo

- **Bài tiếp theo**: [Lesson 08 — Market Structures](../lesson-08-market-structures/).
- **Bài trước**: [Lesson 06 — Consumer Theory](../lesson-06-consumer-theory/).
- **Minh họa**: [visualization.html](./visualization.html) — vẽ TC, AC, MC tương tác.
`;
