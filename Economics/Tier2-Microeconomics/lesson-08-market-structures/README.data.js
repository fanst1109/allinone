// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: Economics/Tier2-Microeconomics/lesson-08-market-structures/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 08 — Market Structures (Cấu trúc thị trường)

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Phân biệt 4 cấu trúc thị trường: **cạnh tranh hoàn hảo, độc quyền (monopoly), độc quyền nhóm (oligopoly), cạnh tranh độc quyền (monopolistic competition)**.
- Hiểu vì sao trong cạnh tranh hoàn hảo, hãng là *price taker* và $P = \\text{MC}$.
- Hiểu vì sao trong độc quyền, hãng là *price setter* và đặt giá tại $\\text{MR} = \\text{MC}$, gây DWL.
- Tính được mức markup tối ưu cho hãng độc quyền: $\\dfrac{P - \\text{MC}}{P} = \\dfrac{1}{\\lvert \\text{PED} \\rvert}$ (Lerner index).
- Hiểu chiến lược cơ bản trong oligopoly: hợp tác (cartel) vs cạnh tranh (Cournot, Bertrand).

## Kiến thức tiền đề

- [Lesson 02-04](../../Tier1-Foundations/lesson-02-supply-demand/): cung-cầu, thặng dư, DWL.
- [Lesson 07](../lesson-07-production-cost/): MC, ATC.
- Lesson 03: độ co giãn.

## 1. Cạnh tranh hoàn hảo (Perfect Competition)

### 1.1. 4 đặc trưng

1. Nhiều người mua + nhiều người bán; mỗi hãng nhỏ so với thị trường.
2. Hàng hóa **đồng nhất** (không phân biệt giữa các hãng).
3. **Tự do gia nhập / rời thị trường**.
4. Thông tin hoàn hảo.

→ Hãng là **price taker**: giá thị trường $P$ ngoại sinh, hãng chỉ chọn $Q$.

### 1.2. Quyết định sản lượng

Hãng tối đa hóa lợi nhuận $\\pi(Q) = P \\cdot Q - \\text{TC}(Q)$.

Điều kiện bậc 1: $\\dfrac{d\\pi}{dQ} = P - \\text{MC} = 0 \\to$ **$P = \\text{MC}$**.

#### 💡 Trực giác

Ở mỗi đơn vị thêm, nếu $P > \\text{MC} \\to$ có lãi biên → làm thêm. Nếu $P < \\text{MC} \\to$ lỗ biên → làm ít đi. Dừng ở $P = \\text{MC}$.

**Walk-through**: $\\text{TC} = 100 + 2Q + 0.5Q^2$. $\\text{MC} = 2 + Q$. Giá thị trường $P = 12$.

- $P = \\text{MC} \\to 12 = 2 + Q \\to Q^* = 10$.
- $\\pi = 12 \\times 10 - (100 + 20 + 50) = 120 - 170 = -50$ (lỗ!).

Nhưng *lỗ ngắn hạn không có nghĩa đóng cửa*. Quy tắc: tiếp tục sản xuất nếu $P > \\text{AVC}$ (vẫn bù được biến phí). Tại $Q=10$, $\\text{AVC} = 2 + 0.5 \\times 10 = 7 < 12 = P \\to$ tiếp tục.

Trong dài hạn, các hãng lỗ rời thị trường → cung dịch trái → giá tăng → cân bằng dài hạn ở **$P = \\text{ATC}_{\\min}$** (lợi nhuận kinh tế $= 0$).

### 1.3. Hiệu quả

- **Phân bổ (allocative)**: $P = \\text{MC} \\to$ giá phản ánh chi phí biên xã hội → phân bổ tối ưu.
- **Sản xuất (productive)**: hãng ở $\\text{ATC}_{\\min} \\to$ sản xuất với chi phí thấp nhất có thể.

Đây là *benchmark* — mọi cấu trúc khác đo so với điều này.

## 2. Độc quyền (Monopoly)

### 2.1. Đặc trưng

- **Một người bán**, không thay thế gần.
- **Rào cản gia nhập** mạnh (bằng sáng chế, kiểm soát nguồn lực, kinh tế quy mô, quy định).
- Hãng là **price setter**.

### 2.2. Doanh thu biên (MR)

Vì hãng độc quyền đối mặt với *cả đường cầu thị trường* (dốc xuống), khi bán thêm 1 đơn vị, hãng phải giảm giá *cho tất cả*. Doanh thu biên:

$$\\text{MR} = P + Q \\cdot \\frac{dP}{dQ}$$

Vì $\\dfrac{dP}{dQ} < 0 \\to$ **$\\text{MR} < P$** (luôn).

Với cầu tuyến tính $P = a - bQ$: $\\text{TR} = aQ - bQ^2 \\to \\text{MR} = a - 2bQ$. Đường MR dốc gấp đôi đường cầu (cùng intercept).

### 2.3. Tối ưu độc quyền

$\\text{MR} = \\text{MC} \\to$ tìm $Q_m$. Đặt giá $P_m = P(Q_m)$ (đọc từ đường cầu).

**Walk-through**: cầu $P = 100 - Q$, $\\text{MC} = 20$ (cố định).

- $\\text{MR} = 100 - 2Q$. Đặt $\\text{MR} = \\text{MC}$: $100 - 2Q = 20 \\to Q_m = 40, P_m = 60$.
- So sánh với cạnh tranh hoàn hảo: $P = \\text{MC} \\to 100 - Q = 20 \\to Q_c = 80, P_c = 20$.

→ Độc quyền sản xuất *ít hơn*, đặt giá *cao hơn*. DWL = tam giác giữa cầu và MC từ $Q_m$ tới $Q_c$:

$$\\text{DWL} = 0.5 \\times (80 - 40) \\times (60 - 20) = 800$$

### 2.4. Lerner Index

$$\\frac{P - \\text{MC}}{P} = \\frac{1}{\\lvert \\text{PED} \\rvert}$$

Hãng càng ít cạnh tranh (PED càng thấp) → markup càng lớn.

Ví dụ: $\\lvert \\text{PED} \\rvert = 2 \\to$ markup $= 50\\%$ trên giá. $\\lvert \\text{PED} \\rvert = 4 \\to$ markup $= 25\\%$.

### 2.5. Phân biệt giá (Price Discrimination)

Nếu hãng có thể *phân nhóm* khách hàng và *đặt giá khác nhau*, có thể tăng lợi nhuận. 3 cấp:

- **Cấp 1 (perfect)**: mỗi khách trả đúng WTP → toàn bộ CS chuyển sang PS, không có DWL.
- **Cấp 2 (theo lượng)**: giá khác theo lượng mua (gói gia đình, bulk discount).
- **Cấp 3 (theo nhóm)**: giá khác theo loại khách (student, senior).

## 3. Oligopoly (Độc quyền nhóm)

### 3.1. Đặc trưng

- Vài hãng lớn, mỗi hãng có quyền lực thị trường.
- Phụ thuộc lẫn nhau — quyết định của hãng A ảnh hưởng đến hãng B.

### 3.2. Cartel — hợp tác

Nếu các hãng *hợp tác* → hành xử như độc quyền chung → lợi nhuận cao nhất.

Nhưng cartel *không ổn định*: mỗi thành viên có incentive *gian lận* (sản xuất nhiều hơn quota) để tăng lợi nhuận cá nhân → cartel sụp.

Ví dụ: OPEC, các "thoả thuận giá" bị cấm trong nhiều luật cạnh tranh.

### 3.3. Mô hình Cournot — cạnh tranh sản lượng

Hai hãng A, B chọn $Q_A, Q_B$ đồng thời. Cầu thị trường $P = a - b(Q_A + Q_B)$.

Mỗi hãng tối ưu giả định hãng kia cố định → hàm phản ứng → cân bằng Nash.

**Walk-through**: $P = 100 - Q$, $\\text{MC} = 20$, hai hãng đối xứng.

- Hãng A tối ưu: $\\text{MR}_A = 100 - 2Q_A - Q_B = \\text{MC} = 20 \\to Q_A = 40 - 0.5 Q_B$.
- Đối xứng: $Q_B = 40 - 0.5 Q_A$.
- Giải: $Q_A = Q_B = 80/3 \\approx 26.7$. Tổng $Q = 53.3$, $P = 46.7$.

So với monopoly $Q = 40, P = 60$ (cartel): Cournot sản xuất nhiều hơn, giá thấp hơn. So với cạnh tranh hoàn hảo $Q = 80, P = 20$: Cournot vẫn ít hiệu quả hơn.

### 3.4. Mô hình Bertrand — cạnh tranh giá

Hai hãng cùng đặt giá. Người mua chọn rẻ hơn. Cân bằng Nash: cả hai đặt $P = \\text{MC} \\to$ giống cạnh tranh hoàn hảo, dù chỉ có 2 hãng. (Bertrand paradox.)

## 4. Cạnh tranh độc quyền (Monopolistic Competition)

Đặc trưng:
- Nhiều người bán.
- Hàng **phân biệt** (mỗi hãng có sản phẩm độc đáo — thương hiệu, chất lượng, vị trí).
- Tự do gia nhập.

Mỗi hãng có chút quyền lực giá (vì sản phẩm độc đáo) — nhưng tự do gia nhập làm lợi nhuận dài hạn → 0.

Ví dụ: nhà hàng, salon tóc, quán cà phê.

## 5. Bài tập thực hành

### Bài 1 — Cạnh tranh hoàn hảo

Hãng có $\\text{TC} = 100 + 0.5Q^2$, giá thị trường $P = 20$.

- (a) Tìm $Q^*, \\pi$.
- (b) Có nên đóng cửa trong ngắn hạn không?
- (c) Trong dài hạn, điều gì xảy ra với hãng và thị trường?

### Bài 2 — Độc quyền

Cầu $P = 200 - 2Q$, $\\text{MC} = 40$.

- (a) Tìm $Q_m, P_m, \\pi_m$ (giả định $\\text{FC} = 0$).
- (b) So sánh với cạnh tranh: $Q_c, P_c$.
- (c) Tính DWL.

### Bài 3 — Lerner Index

Hãng độc quyền đặt $P = 100$, $\\text{MC} = 60$. Tính $\\lvert \\text{PED} \\rvert$ tại điểm này.

### Bài 4 — Cournot duopoly

Cầu $P = 60 - Q$, hai hãng đối xứng $\\text{MC} = 10$. Tìm $(Q_A, Q_B, P, \\pi)$.

## 6. Lời giải chi tiết

### Lời giải Bài 1

(a) $\\text{MC} = Q$. $P = \\text{MC} \\to 20 = Q \\to Q^* = 20$. $\\pi = 20 \\times 20 - (100 + 200) = 400 - 300 = 100$.

(b) $\\pi = +100 > 0$, không lỗ → tiếp tục. (Kể cả khi lỗ, miễn $P > \\text{AVC} = \\frac{Q}{2} \\times \\frac{Q}{Q} = 0.5Q = 10 \\le P = 20 \\to$ tiếp tục.)

(c) Có lợi nhuận → hãng mới gia nhập → cung tăng → giá giảm. Cân bằng dài hạn: $P = \\text{ATC}_{\\min}$. $\\text{ATC} = \\dfrac{100}{Q} + 0.5Q$. Cực tiểu: $\\dfrac{d\\,\\text{ATC}}{dQ} = -\\dfrac{100}{Q^2} + 0.5 = 0 \\to Q = \\sqrt{200} \\approx 14.14$. $\\text{ATC}_{\\min} \\approx 14.14$. → Dài hạn $P \\to 14.14$, hãng $\\pi = 0$.

### Lời giải Bài 2

(a) $\\text{MR} = 200 - 4Q$. $\\text{MR} = \\text{MC} \\to 200 - 4Q = 40 \\to Q_m = 40$. $P_m = 200 - 80 = 120$. $\\pi_m = (120 - 40) \\times 40 = 3.200$.

(b) $P = \\text{MC} \\to 200 - 2Q = 40 \\to Q_c = 80, P_c = 40$.

(c) $\\text{DWL} = 0.5 \\times (80 - 40) \\times (120 - 40) = 1.600$.

### Lời giải Bài 3

$\\dfrac{100 - 60}{100} = 0.4 = \\dfrac{1}{\\lvert \\text{PED} \\rvert} \\to \\lvert \\text{PED} \\rvert = 2.5$.

### Lời giải Bài 4

Hãng A: $\\text{MR}_A = 60 - 2Q_A - Q_B = 10 \\to Q_A = 25 - 0.5 Q_B$. Đối xứng: $Q_A = Q_B = 50/3 \\approx 16.67$. Tổng $Q \\approx 33.33$, $P \\approx 26.67$. Mỗi hãng $\\pi = (26.67 - 10) \\times 16.67 \\approx 277.8$.

## 7. Liên kết và bài tiếp theo

- **Bài tiếp theo**: [Lesson 09 — Game Theory](../lesson-09-game-theory/).
- **Bài trước**: [Lesson 07 — Production & Cost](../lesson-07-production-cost/).
- **Minh họa**: [visualization.html](./visualization.html) — so sánh cạnh tranh, độc quyền, Cournot trên cùng đồ thị.
`;
