// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: Economics/Tier3-Macroeconomics/lesson-11-gdp-measurement/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 11 — GDP & Các thước đo

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Định nghĩa **GDP (Gross Domestic Product)** và biết cách tính 3 cách: chi tiêu (expenditure), thu nhập (income), giá trị gia tăng (production).
- Phân biệt **GDP danh nghĩa (nominal)** và **GDP thực (real)** — và lý do phải có cả hai.
- Tính được **deflator GDP** và **CPI (Consumer Price Index)** — và biết khi nào dùng cái nào.
- Hiểu **GDP per capita** và hạn chế của GDP làm thước đo phúc lợi.
- Phân biệt GDP với **GNI/GNP** và các thước đo bổ sung (HDI, GPI).

## Kiến thức tiền đề

- Tier 1 + Tier 2 — đặc biệt khái niệm thị trường và giá trị.
- Tỉ lệ phần trăm.

## 1. GDP là gì

**GDP** $=$ tổng giá trị thị trường của *tất cả hàng hóa và dịch vụ cuối cùng* được sản xuất *trong lãnh thổ một quốc gia* trong *một khoảng thời gian* (thường là 1 năm hoặc 1 quý).

**Chữ then chốt**:

- "Giá trị thị trường" → đo bằng tiền (cần giá).
- "Cuối cùng" → không tính trung gian (để tránh double-counting).
- "Trong lãnh thổ" → khác GNI (sẽ học §6).
- "Khoảng thời gian" → là *flow* (luồng), không phải *stock* (tồn kho).

#### 💡 Trực giác

GDP của Việt Nam 2023 $\\approx 430$ tỉ USD. Nghĩa là *toàn bộ những gì người Việt + doanh nghiệp trong VN sản xuất ra trong năm 2023, đo bằng giá thị trường, cộng lại $= 430$ tỉ USD*.

## 2. Ba cách tính GDP

### 2.1. Cách chi tiêu (Expenditure)

$$\\text{GDP} = C + I + G + (X - M)$$

- **C** (Consumption): chi tiêu hộ gia đình.
- **I** (Investment): đầu tư doanh nghiệp + hộ (nhà mới, máy móc, tồn kho).
- **G** (Government): chi tiêu chính phủ (không kể chi chuyển nhượng như BHXH).
- $X - M$: xuất khẩu trừ nhập khẩu (cán cân thương mại).

**Walk-through**: nước A có $C=100$, $I=30$, $G=20$, $X=15$, $M=10$. → $\\text{GDP} = 100+30+20+(15-10) = 155$.

### 2.2. Cách thu nhập (Income)

$$\\text{GDP} = \\text{Lương} + \\text{Lợi nhuận} + \\text{Thuê} + \\text{Lãi} + \\text{Thuế gián thu} - \\text{Trợ giá}$$

Tổng tất cả thu nhập từ sản xuất. Về lý thuyết bằng cách chi tiêu (hai mặt của cùng đồng tiền).

### 2.3. Cách sản xuất (Production / Value Added)

Tổng *giá trị gia tăng* của mỗi giai đoạn sản xuất.

**Walk-through**: nông dân bán lúa cho nhà máy gạo $100$. Nhà máy gạo bán cho siêu thị $150$. Siêu thị bán cho người tiêu dùng $200$.

| Giai đoạn | Doanh thu | Đầu vào | Giá trị gia tăng |
|-----------|-----------|---------|-------------------|
| Nông dân | 100 | 0 | 100 |
| Nhà máy | 150 | 100 | 50 |
| Siêu thị | 200 | 150 | 50 |
| Tổng | | | 200 |

Đóng góp vào GDP $= 200$ (không phải $100+150+200 = 450$ — vì sẽ double-count). Bằng đúng giá cuối cùng.

## 3. Nominal vs Real GDP

### 3.1. Vấn đề

Nominal GDP đo bằng giá *hiện hành*. Khi giá tăng (lạm phát), nominal GDP có thể tăng *dù sản lượng không đổi*.

**Real GDP** = GDP tính theo giá *năm gốc* → đo *sản lượng thực*.

### 3.2. Walk-through

Nước A sản xuất 2 hàng: bánh mì và áo. Giá và lượng:

| Năm | $P_{bm}$ | $Q_{bm}$ | $P_{áo}$ | $Q_{áo}$ |
|-----|------|------|------|------|
| 2020 (gốc) | 10 | 100 | 50 | 20 |
| 2024 | 15 | 110 | 70 | 25 |

**Nominal 2020** $= 10 \\times 100 + 50 \\times 20 = 1000 + 1000 = 2000$.
**Nominal 2024** $= 15 \\times 110 + 70 \\times 25 = 1650 + 1750 = 3400$.
**Real 2024** (giá năm 2020) $= 10 \\times 110 + 50 \\times 25 = 1100 + 1250 = 2350$.

So sánh:
- Nominal tăng $\\frac{3400-2000}{2000} = 70\\%$.
- Real tăng $\\frac{2350-2000}{2000} = 17.5\\%$. ← đây mới là *tăng trưởng thực*.

### 3.3. Deflator GDP

$$\\text{Deflator} = \\frac{\\text{Nominal}}{\\text{Real}} \\times 100$$

Năm 2020: $100$. Năm 2024: $\\frac{3400}{2350} \\times 100 \\approx 144.7$. Lạm phát tổng quát $\\approx 44.7\\%$ qua 4 năm.

### 3.4. CPI

**CPI (Consumer Price Index)** đo giá của một *rổ hàng cố định* mà hộ gia đình điển hình tiêu thụ. Khác Deflator GDP ở 2 điểm:

- Rổ CPI *cố định* (Laspeyres); Deflator dùng rổ *năm hiện hành* (Paasche).
- CPI bao gồm cả hàng nhập khẩu; Deflator chỉ sản xuất trong nước.

Trong thực tế, CPI và Deflator gần nhau nhưng *không hoàn toàn trùng*.

#### ⚠ Lỗi thường gặp

- **Dùng nominal so sánh qua năm**: phải dùng real để loại trừ lạm phát.
- **Coi CPI = lạm phát thực sự cảm nhận**: CPI dùng rổ trung bình; cá nhân tiêu khác → cảm nhận khác.
- **Quên hàng chất lượng tăng**: máy tính 2024 mạnh hơn 2014 nhiều với giá tương tự — CPI cố hiệu chỉnh nhưng không hoàn hảo (gọi là *hedonic adjustment*).

## 4. GDP per capita

$$\\text{GDP}_{\\text{per capita}} = \\frac{\\text{GDP}}{\\text{dân số}}$$

Đo "trung bình giàu" của mỗi người. Mỹ ~80k USD/người (2023). Việt Nam ~4.3k USD/người.

**Cảnh báo**: trung bình ẩn bất bình đẳng. Nước có GDP per capita cao có thể có *Gini coefficient* cao (chênh lệch giàu nghèo lớn).

## 5. Hạn chế của GDP

GDP **không đo**:

1. **Phân phối**: ai được hưởng giá trị tăng.
2. **Công việc không trả lương**: việc nhà, chăm con.
3. **Kinh tế ngầm**: thị trường đen, lao động không khai báo.
4. **Tài nguyên + môi trường**: đốn rừng làm GDP tăng (gỗ bán được) nhưng phá tài sản tự nhiên.
5. **Chất lượng sống**: y tế, giáo dục, an toàn không tính bằng đồng.

**Thước đo bổ sung**:

- **HDI** (Human Development Index): kết hợp thu nhập, giáo dục, tuổi thọ.
- **GPI** (Genuine Progress Indicator): điều chỉnh GDP cho môi trường + bất bình đẳng.
- **Better Life Index** (OECD): 11 chiều phúc lợi.

## 6. GDP vs GNI/GNP

- **GDP**: sản xuất *trong lãnh thổ*, bất kể quốc tịch chủ sở hữu.
- **GNI** (Gross National Income, = GNP cũ): thu nhập của *công dân quốc gia*, bất kể địa điểm.

Ví dụ: nhà máy Samsung Bắc Ninh → đóng góp GDP Việt Nam, đóng góp GNI Hàn Quốc (vì chủ sở hữu Hàn).

Với phần lớn nước, $\\text{GDP} \\approx \\text{GNI}$. Nhưng với Ireland (nhiều công ty đa quốc gia đặt trụ sở pháp lý), $\\text{GNI} < \\text{GDP}$ nhiều.

## 7. Bài tập thực hành

### Bài 1 — Tính GDP chi tiêu

Nước có: $C=500$, $I=120$, $G=80$, $X=90$, $M=110$. Tính GDP.

### Bài 2 — Nominal vs Real

| Năm | Apple P | Apple Q | Orange P | Orange Q |
|-----|---------|---------|----------|----------|
| 2022 (gốc) | 5 | 1000 | 8 | 500 |
| 2025 | 7 | 1100 | 10 | 600 |

- (a) Nominal GDP 2022, 2025.
- (b) Real GDP 2025 (giá 2022).
- (c) Deflator 2025.
- (d) Tăng trưởng thực 2022→2025 ($\\%$).

### Bài 3 — Giá trị gia tăng

Chuỗi: thợ rừng bán gỗ $200$ cho nhà máy. Nhà máy chế biến bán gỗ thành phẩm $350$ cho thợ mộc. Thợ mộc làm bàn bán $500$. Tính đóng góp GDP.

### Bài 4 — GDP per capita vs phân phối

Nước A: $\\text{GDP} = 100$ tỉ, dân $= 10$ triệu, $\\text{Gini} = 0.25$.
Nước B: $\\text{GDP} = 200$ tỉ, dân $= 10$ triệu, $\\text{Gini} = 0.55$.

So sánh GDP/người. Có thể kết luận nước nào "tốt hơn để sống"? Vì sao không?

## 8. Lời giải chi tiết

### Lời giải Bài 1

$\\text{GDP} = 500 + 120 + 80 + (90 - 110) = 700 - 20 = 680$.

### Lời giải Bài 2

(a) Nominal 2022 $= 5 \\times 1000 + 8 \\times 500 = 5000 + 4000 = 9000$. Nominal 2025 $= 7 \\times 1100 + 10 \\times 600 = 7700 + 6000 = 13700$.

(b) Real 2025 (giá 2022) $= 5 \\times 1100 + 8 \\times 600 = 5500 + 4800 = 10300$.

(c) Deflator 2025 $= \\frac{13700}{10300} \\times 100 \\approx 133$.

(d) Tăng trưởng thực $= \\frac{10300 - 9000}{9000} \\approx 14.4\\%$.

### Lời giải Bài 3

$\\text{GDP} = 500$ (giá hàng cuối). Hoặc: giá trị gia tăng $200 + 150 + 150 = 500$. ✓

### Lời giải Bài 4

A: GDP/người $= 10.000$ USD. B: GDP/người $= 20.000$ USD. B có thu nhập trung bình cao gấp đôi. **Nhưng** Gini B cao ($0.55$) → bất bình đẳng lớn. Người trung vị của B có thể sống *kém hơn* người trung vị của A. Phải xem thêm:

- Median income.
- Tỷ lệ nghèo.
- Tiếp cận y tế, giáo dục.

GDP/người không đủ để đánh giá phúc lợi tổng quát.

## 9. Liên kết và bài tiếp theo

- **Bài tiếp theo**: [Lesson 12 — Growth Models](../lesson-12-growth-models/).
- **Bài trước**: [Lesson 10 — Labor & Capital](../../Tier2-Microeconomics/lesson-10-labor-capital/).
- **Minh họa**: [visualization.html](./visualization.html) — máy tính GDP, Nominal vs Real, deflator.
`;
