// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: Economics/Tier4-Applied/lesson-16-international-trade/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 16 — International Trade (Thương mại quốc tế)

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Phân biệt **lợi thế tuyệt đối (absolute)** và **lợi thế so sánh (comparative)** — và hiểu vì sao lợi thế so sánh là cơ sở của thương mại.
- Tính được chi phí cơ hội của sản xuất giữa các nước → xác định ai nên chuyên môn hóa gì.
- Hiểu **mô hình Ricardo** (1 yếu tố — lao động) và **Heckscher-Ohlin** (2 yếu tố — vốn + lao động).
- Phân tích tác động của **thuế quan (tariff)** và **hạn ngạch (quota)** lên welfare.
- Hiểu **tỉ giá hối đoái (exchange rate)** danh nghĩa vs thực, và cách nó ảnh hưởng $X - M$.

## Kiến thức tiền đề

- [Lesson 01-04](../../Tier1-Foundations/lesson-01-thinking-like-economist/): chi phí cơ hội, cung-cầu, thặng dư.

## 1. Lợi thế tuyệt đối vs so sánh

### 1.1. Bài toán Ricardo cổ điển

Hai nước (Anh, Bồ Đào Nha) sản xuất 2 hàng (vải, rượu vang). 1 giờ lao động làm được:

| | Vải (m) | Rượu (chai) |
|---|---------|-------------|
| Anh | 10 | 5 |
| Bồ Đào Nha | 6 | 12 |

**Lợi thế tuyệt đối**: Anh giỏi hơn vải ($10 > 6$); Bồ giỏi hơn rượu ($12 > 5$).

### 1.2. Chi phí cơ hội

Trong Anh: 1 chai rượu $= 2$m vải (giành 1 giờ từ vải sang rượu = bỏ 10m, được 5 chai → 1 chai $= 2$m vải).
Trong Bồ: 1 chai rượu $= 0.5$m vải.

→ Rượu *rẻ hơn* ở Bồ (chi phí cơ hội nhỏ).
→ Vải *rẻ hơn* ở Anh ($1\\text{m} = 0.5$ chai vs $\\frac{1}{6}$ chai).

**Lợi thế so sánh**: Anh có lợi thế so sánh trong vải; Bồ có lợi thế so sánh trong rượu.

### 1.3. Tại sao chuyên môn hóa có lợi

Mỗi nước chuyên sản xuất hàng có lợi thế so sánh + trao đổi → cả 2 nhiều hơn.

**Walk-through không thương mại** (mỗi nước 2 giờ, chia đều):

- Anh: 1h vải $= 10$m, 1h rượu $= 5$ chai → tổng $(10, 5)$.
- Bồ: 1h vải $= 6$m, 1h rượu $= 12$ → tổng $(6, 12)$.
- *Tổng toàn cầu*: 16m vải + 17 chai.

**Với thương mại** (mỗi nước dùng 2h vào hàng có lợi thế so sánh):

- Anh chuyên vải: 2h → 20m vải.
- Bồ chuyên rượu: 2h → 24 chai.
- *Tổng*: 20m vải + 24 chai. **Tăng 4m vải + 7 chai** so với không thương mại.

Sau đó trao đổi → cả 2 đều có nhiều hơn.

#### 💡 Trực giác

Lợi thế so sánh là *lợi thế tương đối*, không tuyệt đối. Ngay cả khi A giỏi hơn B mọi mặt, B vẫn có *lợi thế so sánh* ở thứ B *ít tệ nhất* — và thương mại vẫn có lợi cho cả 2.

Ví dụ đời thường: một bác sĩ giỏi hơn thư ký 100% trong cả 2 việc (chữa bệnh + đánh máy). Nhưng bác sĩ chuyên chữa bệnh, thuê thư ký đánh máy — vì *chi phí cơ hội* của bác sĩ khi đánh máy cao (bỏ giờ chữa bệnh).

## 2. Heckscher-Ohlin

Mở rộng Ricardo với 2 yếu tố sản xuất (K, L). Nước có nhiều K tương đối → xuất hàng K-intensive (vd: máy móc). Nước có nhiều L tương đối → xuất hàng L-intensive (vd: dệt may).

**Hệ quả Stolper-Samuelson**: thương mại làm tăng giá yếu tố dồi dào (vd lao động ở VN) và giảm giá yếu tố khan hiếm. → Có người *thắng*, có người *thua* trong thương mại.

Vì vậy thương mại tự do *về tổng welfare* tăng, nhưng cần **chính sách bồi thường** cho người thua (trợ cấp đào tạo lại, an sinh).

## 3. Thuế quan và hạn ngạch

### 3.1. Thuế quan (tariff)

Nước nhập thép tự do với giá thế giới $P_w = 40$. Cầu trong nước $Q_d = 100 - P$. Cung trong nước $Q_s = P$.

- Không thuế: $P = 40$, $Q_d = 60$, $Q_s = 40$. Nhập $= 20$.

Áp thuế $T = 10$ → giá nội địa $P = 50$:

- $Q_d = 50$, $Q_s = 50$. Nhập $= 0$. (Trong ví dụ này thuế cao đủ để đẩy hết nhập khẩu.)

**Welfare**:
- CS giảm (giá tăng).
- PS tăng (sản xuất trong nước có lợi).
- Revenue thuế: $T \\times \\text{nhập} = 10 \\times Q_m$.
- DWL: 2 tam giác (như Lesson 04 thuế).

### 3.2. Hạn ngạch

Quota giới hạn lượng nhập. Tác động tương tự thuế quan nhưng *không thu được doanh thu* (trừ khi đấu giá quota) — kém hiệu quả hơn.

## 4. Tỉ giá hối đoái

### 4.1. Danh nghĩa vs thực

Tỉ giá danh nghĩa $E$ = số đơn vị nội tệ đổi 1 đơn vị ngoại tệ. Vd $E = 24{.}000$ VND/USD.

Tỉ giá thực:

$$E_{real} = E \\times \\frac{P^*}{P}$$

- $P^*$ = giá ở nước ngoài.
- $P$ = giá trong nước.

Đo *sức cạnh tranh hàng hóa*. $E_{real}$ cao → hàng nội rẻ tương đối → X tăng, M giảm.

### 4.2. PPP — Sức mua tương đương

Lý thuyết PPP: trong dài hạn, $E$ điều chỉnh để giá hàng giống nhau ở mọi nơi. *Burger Index* của The Economist đo PPP qua giá Big Mac.

Thực tế lệch nhiều do: thuế, vận chuyển, hàng phi thương mại, neo tỉ giá.

### 4.3. Cố định vs thả nổi

- **Thả nổi** (floating, vd USD, EUR): tỉ giá tự xác định theo thị trường.
- **Cố định** (fixed, vd CNY trước 2005): NHTW can thiệp duy trì tỉ giá.
- **Cố định mềm** (managed float): can thiệp khi cần.

Trade-off: cố định ổn định nhưng mất tự chủ chính sách tiền tệ.

## 5. Bài tập

### Bài 1 — Lợi thế so sánh

| | Lúa (tấn/giờ) | Cá (kg/giờ) |
|---|--------------|--------------|
| Việt Nam | 5 | 10 |
| Nhật Bản | 8 | 4 |

Tính chi phí cơ hội mỗi nước, ai nên chuyên môn hóa gì?

### Bài 2 — Thương mại

Mỗi nước có 4 giờ. So sánh sản lượng tổng có/không thương mại (mỗi nước chia đôi vs chuyên môn hóa).

### Bài 3 — Thuế quan

Cầu thép: $Q_d = 80 - P$. Cung: $Q_s = P$. Giá thế giới $P_w = 20$. Áp thuế $T = 10$.

- (a) Nhập khẩu trước/sau thuế.
- (b) Doanh thu thuế.
- (c) DWL.

### Bài 4 — Tỉ giá thực

$E = 24{.}000$ VND/USD. CPI VN tăng $5\\%$, CPI Mỹ tăng $2\\%$. $E_{real}$ thay đổi thế nào? Hàng VN cạnh tranh hơn hay kém hơn?

## 6. Lời giải chi tiết

### Lời giải Bài 1

VN: 1 tấn lúa $= 2$ kg cá (vì 1h $= 5$ tấn lúa $= 10$ kg cá → 1 tấn $= 2$ kg).
Nhật: 1 tấn lúa $= 0.5$ kg cá.

→ Lúa rẻ hơn ở Nhật (chi phí cơ hội nhỏ). Cá rẻ hơn ở VN.

VN có lợi thế so sánh trong **cá**; Nhật trong **lúa**.

### Lời giải Bài 2

Không thương mại (mỗi nước 2h lúa + 2h cá):
- VN: 10 tấn lúa + 20 kg cá.
- Nhật: 16 tấn lúa + 8 kg cá.
- Tổng: 26 lúa + 28 cá.

Chuyên môn hóa:
- VN chuyên cá: $4\\text{h} \\times 10 = 40$ kg cá.
- Nhật chuyên lúa: $4\\text{h} \\times 8 = 32$ tấn lúa.
- Tổng: 32 lúa + 40 cá. **Lợi: +6 lúa + 12 cá**.

### Lời giải Bài 3

Không thuế: $P = 20$, $Q_d = 60$, $Q_s = 20$, nhập $40$.

Sau thuế $T = 10$: $P = 30$, $Q_d = 50$, $Q_s = 30$, nhập $20$.

(a) Nhập giảm từ 40 → 20.
(b) Revenue $= T \\times Q_{m,\\text{mới}} = 10 \\times 20 = 200$.
(c) DWL = 2 tam giác:
- Bên cung: $0.5 \\times (30 - 20) \\times (30 - 20) = 50$.
- Bên cầu: $0.5 \\times (60 - 50) \\times (30 - 20) = 50$.
- Tổng $\\text{DWL} = 100$.

### Lời giải Bài 4

$\\dfrac{E_{real,t}}{E_{real,t-1}} = \\dfrac{E_t \\times P^*_t / P_t}{E_{t-1} \\times P^*_{t-1} / P_{t-1}}$. Nếu $E$ không đổi: $E_{real}$ thay đổi $\\frac{1 + 2\\%}{1 + 5\\%} \\approx 0.971$ → $E_{real}$ giảm $2.9\\%$. **Hàng VN ĐẮT hơn** tương đối → kém cạnh tranh. Cần phá giá VND ($E$ tăng) để bù.

## 7. Liên kết và bài tiếp theo

- **Bài tiếp theo**: [Lesson 17 — Behavioral Economics](../lesson-17-behavioral-economics/).
- **Bài trước**: [Lesson 15 — Inflation & Unemployment](../../Tier3-Macroeconomics/lesson-15-inflation-unemployment/).
- **Minh họa**: [visualization.html](./visualization.html) — máy tính lợi thế so sánh + welfare thuế quan.
`;
