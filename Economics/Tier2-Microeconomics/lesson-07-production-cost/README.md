# Lesson 07 — Production & Cost (Sản xuất & Chi phí)

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Hiểu **hàm sản xuất** `Q = f(L, K)` — quan hệ giữa đầu vào (lao động L, vốn K) và đầu ra Q.
- Phân biệt **sản phẩm biên (MP)** và **sản phẩm trung bình (AP)**, hiểu quy luật *lợi tức biên giảm dần*.
- Phân loại **lợi tức theo quy mô (returns to scale)**: tăng dần / không đổi / giảm dần.
- Phân biệt **chi phí cố định (FC)**, **biến (VC)**, **tổng (TC)** và các loại chi phí *trung bình* (AFC, AVC, ATC) + chi phí *biên* (MC).
- Biết tại sao đường MC cắt ATC ở điểm cực tiểu — và ý nghĩa kinh tế.
- Phân biệt **ngắn hạn** (một yếu tố cố định) và **dài hạn** (tất cả linh hoạt).

## Kiến thức tiền đề

- [Lesson 06](../lesson-06-consumer-theory/): nguyên tắc tối ưu, MU.
- Lesson 01: tư duy biên.

## 1. Hàm sản xuất

### 1.1. Định nghĩa

**Hàm sản xuất** `Q = f(L, K)` cho biết sản lượng tối đa với mức đầu vào L (lao động) và K (vốn) cho trước.

**Cobb-Douglas**: `Q = A · L^α · K^β`. `A` = năng suất tổng hợp (TFP).

### 1.2. Sản phẩm biên và trung bình

- **MP_L** = `∂Q/∂L`: thêm 1 đơn vị L tạo thêm bao nhiêu Q (giữ K).
- **AP_L** = `Q/L`: trung bình mỗi L làm ra bao nhiêu.

**Walk-through**: `Q = 10·√L` (K cố định).

| L | Q = 10√L | MP_L (xấp xỉ) | AP_L |
|---|----------|----------------|------|
| 1 | 10.00 | — | 10.00 |
| 4 | 20.00 | 1.67 | 5.00 |
| 9 | 30.00 | 1.18 | 3.33 |
| 16 | 40.00 | 0.95 | 2.50 |
| 25 | 50.00 | 0.79 | 2.00 |

MP và AP đều giảm — quy luật lợi tức biên giảm dần.

#### 💡 Trực giác

Nhà bếp có 1 bếp ga (vốn). Thuê 1 đầu bếp → 20 món/giờ. Thuê thêm → 30, 38, 42, 44 món. Đầu bếp thứ 5 chỉ thêm 2 món vì *bếp đã chật*. Đây là *vốn cố định, lao động tăng → MP_L giảm*.

### 1.3. Returns to Scale

Khi *cả L và K cùng nhân với t*:

- **Tăng dần (IRS)**: `f(tL, tK) > t · f(L, K)`. Mở rộng có lợi (vd: phần mềm).
- **Không đổi (CRS)**: `f(tL, tK) = t · f(L, K)`. (Cobb-Douglas với `α + β = 1`.)
- **Giảm dần (DRS)**: `f(tL, tK) < t · f(L, K)`. Khó quản lý khi quá lớn.

## 2. Chi phí — Phân loại

### 2.1. Cố định vs biến

- **FC (Fixed Cost)**: không đổi theo sản lượng. Vd: thuê mặt bằng, lương quản lý.
- **VC (Variable Cost)**: tăng theo sản lượng. Vd: nguyên liệu, lương công nhân theo giờ.
- **TC = FC + VC**.

### 2.2. Trung bình và biên

- **AFC = FC/Q**: giảm dần khi Q tăng (chia cố định cho nhiều đơn vị).
- **AVC = VC/Q**: thường hình U (giảm rồi tăng).
- **ATC = TC/Q = AFC + AVC**: cũng hình U.
- **MC = ΔTC/ΔQ**: chi phí biên.

### 2.3. Walk-through số

`FC = 100`, `VC(Q) = 2Q + 0.5Q²` (tăng phi tuyến). `TC(Q) = 100 + 2Q + 0.5Q²`.

| Q | TC | AFC | AVC | ATC | MC = 2 + Q |
|---|----|----|----|-----|------|
| 10 | 100 + 20 + 50 = 170 | 10.0 | 7.0 | 17.0 | 12 |
| 20 | 100 + 40 + 200 = 340 | 5.0 | 12.0 | 17.0 | 22 |
| 30 | 100 + 60 + 450 = 610 | 3.3 | 17.0 | 20.3 | 32 |
| 40 | 100 + 80 + 800 = 980 | 2.5 | 22.0 | 24.5 | 42 |

### 2.4. MC cắt ATC tại cực tiểu

**Quan hệ**: MC cắt ATC từ dưới lên *tại điểm ATC cực tiểu*.

**Trực giác**: ATC = trung bình. MC = mỗi đơn vị mới. Nếu MC < ATC → đơn vị mới kéo trung bình XUỐNG. Nếu MC > ATC → kéo trung bình LÊN. Tại điểm bằng nhau → trung bình đạt cực tiểu.

Tương tự cho AVC.

#### ⚠ Lỗi thường gặp

- **Nhầm ATC với AVC**: ATC cao hơn AVC một lượng AFC. Khi Q lớn, AFC nhỏ → ATC tiệm cận AVC.
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

`Q = 20·√L` (K cố định). Tính `MP_L` và `AP_L` tại `L = 16` và `L = 100`. Cả hai giảm hay tăng?

### Bài 2 — Returns to scale

Cho `Q = L^0.4 · K^0.4`. Nhân L và K với 2 → Q nhân với bao nhiêu? Đây là loại returns nào?

### Bài 3 — Bảng chi phí

`FC = 50`, `VC = 3Q + Q²`. Tính `TC, AFC, AVC, ATC, MC` cho `Q = 1, 5, 10, 20`.

### Bài 4 — MC cắt ATC

Cho `TC = 100 + 10Q + 0.5Q²`. Tìm Q tại đó `ATC = MC`. Tính giá trị `ATC` cực tiểu.

## 5. Lời giải chi tiết

### Lời giải Bài 1

`MP_L = dQ/dL = 20 / (2√L) = 10/√L`.

- `L = 16`: MP = `10/4 = 2.5`. AP = `Q/L = 80/16 = 5`. AP > MP.
- `L = 100`: MP = `10/10 = 1`. AP = `200/100 = 2`. Cả MP và AP giảm.

### Lời giải Bài 2

`f(2L, 2K) = (2L)^0.4 · (2K)^0.4 = 2^0.8 · L^0.4 · K^0.4 ≈ 1.74 · Q`. Tăng 74% khi nhân đôi đầu vào → **DRS** (giảm dần, vì α + β = 0.8 < 1).

### Lời giải Bài 3

`MC = dTC/dQ = 3 + 2Q`. `TC = 50 + 3Q + Q²`.

| Q | TC | AFC | AVC | ATC | MC |
|---|----|----|----|----|-----|
| 1 | 54 | 50.0 | 4.0 | 54.0 | 5 |
| 5 | 90 | 10.0 | 8.0 | 18.0 | 13 |
| 10 | 180 | 5.0 | 13.0 | 18.0 | 23 |
| 20 | 510 | 2.5 | 23.0 | 25.5 | 43 |

### Lời giải Bài 4

`ATC = TC/Q = 100/Q + 10 + 0.5Q`. `MC = 10 + Q`. Đặt MC = ATC:
```
10 + Q = 100/Q + 10 + 0.5Q
0.5Q = 100/Q
Q² = 200
Q ≈ 14.14
```
`ATC_min = 100/14.14 + 10 + 0.5×14.14 ≈ 7.07 + 10 + 7.07 = 24.14`.

## 6. Liên kết và bài tiếp theo

- **Bài tiếp theo**: [Lesson 08 — Market Structures](../lesson-08-market-structures/).
- **Bài trước**: [Lesson 06 — Consumer Theory](../lesson-06-consumer-theory/).
- **Minh họa**: [visualization.html](./visualization.html) — vẽ TC, AC, MC tương tác.
