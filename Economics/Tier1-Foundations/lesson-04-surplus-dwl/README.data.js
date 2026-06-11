// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: Economics/Tier1-Foundations/lesson-04-surplus-dwl/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 04 — Thặng dư & Deadweight Loss

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Định nghĩa và tính được **thặng dư tiêu dùng (CS)**, **thặng dư sản xuất (PS)**, và **tổng phúc lợi xã hội (total welfare)** từ một thị trường.
- Hiểu vì sao thị trường cạnh tranh tự do *tối đa hóa tổng phúc lợi* — và đó là điều Adam Smith gọi là "bàn tay vô hình".
- Tính được **deadweight loss (DWL)** khi có can thiệp (thuế, trần giá, sàn giá, độc quyền).
- Phân biệt được *chuyển dịch* phúc lợi (từ người này sang người kia — zero-sum) và *mất mát* phúc lợi (DWL — biến mất khỏi xã hội).
- Phân tích được một chính sách thuế cụ thể: ai gánh, mất bao nhiêu, doanh thu thuế bao nhiêu, DWL bao nhiêu.

## Kiến thức tiền đề

- [Lesson 02](../lesson-02-supply-demand/): cung-cầu, cân bằng.
- [Lesson 03](../lesson-03-elasticity/): độ co giãn.
- Hình học: tính diện tích tam giác.

## 1. Thặng dư tiêu dùng (Consumer Surplus)

### 1.1. Định nghĩa

**Thặng dư tiêu dùng (CS)** = chênh lệch giữa số tiền *tối đa* một người sẵn sàng trả (willingness to pay — WTP) và số tiền *thực sự* họ trả.

#### 💡 Trực giác

Bạn sẵn sàng trả tối đa $60\\text{k}$ cho 1 chai bia (khát quá). Quán bán giá $30\\text{k}$. Bạn nhận được "miễn phí" $30\\text{k}$ về mặt phúc lợi — chính là **thặng dư tiêu dùng** của bạn cho chai bia đó.

Tổng CS thị trường = tổng tất cả "miễn phí" này cho mọi người mua. Trên đồ thị: **diện tích giữa đường cầu và đường giá ngang $P^*$**.

### 1.2. Tính bằng diện tích tam giác

Với cầu tuyến tính $Q_d = a - bP$:

- WTP tối đa (cốc đầu tiên) = $P_{\\max} = a/b$ (mức giá làm $Q_d = 0$).
- Tại cân bằng $(P^*, Q^*)$, CS = tam giác:

$$\\text{CS} = \\frac{1}{2} \\times Q^* \\times (P_{\\max} - P^*)$$

**Walk-through**: $Q_d = 100 - 2P$, $P^* = 27.5$, $Q^* = 45$. $P_{\\max} = 50$.

$$\\text{CS} = \\frac{1}{2} \\times 45 \\times (50 - 27.5) = \\frac{1}{2} \\times 45 \\times 22.5 = 506.25$$

Bốn ví dụ số:

1. $Q_d = 200 - 4P,\\ P^* = 20$: $Q^* = 120,\\ P_{\\max} = 50$ $\\to$ CS $= 0.5 \\times 120 \\times 30 = 1800$.
2. $Q_d = 60 - P,\\ P^* = 10$: $Q^* = 50,\\ P_{\\max} = 60$ $\\to$ CS $= 0.5 \\times 50 \\times 50 = 1250$.
3. Nếu giá tăng từ $10$ lên $20$ (cùng đường cầu $60 - P$): $Q' = 40$, CS mới $= 0.5 \\times 40 \\times 40 = 800$. CS giảm $450$.
4. Nếu giá giảm xuống $5$: $Q' = 55$, CS $= 0.5 \\times 55 \\times 55 = 1512.5$. CS tăng $262.5$.

## 2. Thặng dư sản xuất (Producer Surplus)

### 2.1. Định nghĩa

**Thặng dư sản xuất (PS)** = chênh lệch giữa giá thực nhận và chi phí biên thấp nhất (giá người bán *chịu* bán).

#### 💡 Trực giác

Một nông dân sẵn sàng bán cà chua từ $5\\text{k/kg}$ (chi phí trồng trên đất tốt). Thị trường giá $20\\text{k/kg}$. PS cho cân cà chua đầu tiên của họ $= 15\\text{k}$. PS tổng = diện tích **giữa đường giá và đường cung**.

### 2.2. Công thức

Với cung tuyến tính $Q_s = c + dP$, $P_{\\min} = -c/d$ (giá thấp nhất có người bán). Tại cân bằng:

$$\\text{PS} = \\frac{1}{2} \\times Q^* \\times (P^* - P_{\\min})$$

**Walk-through**: $Q_s = -10 + 2P$, $P^* = 27.5$, $Q^* = 45$. $P_{\\min} = 5$.

$$\\text{PS} = 0.5 \\times 45 \\times (27.5 - 5) = 0.5 \\times 45 \\times 22.5 = 506.25$$

Bốn ví dụ:

1. $Q_s = -20 + 2P,\\ P^* = 20$: $P_{\\min} = 10$, PS $= 0.5 \\times 20 \\times 10 = 100$.
2. $Q_s = P,\\ P^* = 30$: $P_{\\min} = 0$, PS $= 0.5 \\times 30 \\times 30 = 450$.
3. Cùng cung 2 ở trên, nếu giá rơi xuống $20$: $Q' = 20$, PS $= 0.5 \\times 20 \\times 20 = 200$.
4. Khi cung dịch phải (công nghệ tiến bộ), với giá không đổi, PS có thể *tăng hoặc giảm* tùy độ dịch — cần tính cụ thể.

## 3. Tổng phúc lợi và hiệu quả

### 3.1. Tổng phúc lợi xã hội (Total Welfare)

$$W = \\text{CS} + \\text{PS}$$

(Khi không có thuế hay can thiệp. Khi có thuế: $W = \\text{CS} + \\text{PS} + \\text{Revenue}$ với Revenue = doanh thu thuế chính phủ thu được.)

Trong thị trường cạnh tranh tự do KHÔNG có can thiệp:

> **Cân bằng thị trường tối đa hóa $W$.**

Đây là **First Welfare Theorem** — định lý phúc lợi thứ nhất. Bất kỳ điểm sản xuất nào khác cân bằng đều cho $W$ nhỏ hơn.

#### 💡 Trực giác — Vì sao cân bằng là tối ưu?

Tại $Q^*$, **WTP của người mua biên = chi phí biên của người bán** $= P^*$. Bất kỳ giao dịch nào thêm ($Q > Q^*$):

- WTP người mua kế tiếp $< P^*$.
- Chi phí biên người bán kế tiếp $> P^*$.
- $\\to$ Giao dịch lỗ: WTP $<$ chi phí $\\to$ giảm phúc lợi.

Tương tự, bất kỳ giao dịch nào *thiếu* ($Q < Q^*$):

- WTP $>$ chi phí $\\to$ có lợi mà bị bỏ $\\to$ giảm phúc lợi tiềm năng.

Vì vậy $Q^* = Q_d = Q_s$ là điểm tối ưu.

## 4. Deadweight Loss khi can thiệp

### 4.1. DWL là gì

**Deadweight loss (DWL)** = phần phúc lợi *mất hẳn* (không chuyển dịch sang bên nào) khi sản lượng giao dịch $\\neq Q^*$.

Trên đồ thị: DWL là **tam giác giữa đường cầu và đường cung, ở vùng $Q' < Q^*$** (giao dịch bị mất).

### 4.2. DWL của thuế

Áp thuế $T$ lên người bán làm:

- Giá người mua trả tăng từ $P^*$ lên $P_b$.
- Giá người bán nhận giảm từ $P^*$ xuống $P_s = P_b - T$.
- Lượng giảm từ $Q^*$ xuống $Q'$.

**CS giảm**: từ tam giác cũ $\\to$ tam giác nhỏ hơn (trên đường cầu, dưới $P_b$).
**PS giảm**: từ tam giác cũ $\\to$ tam giác nhỏ hơn (trên $P_s$, dưới đường cung).
**Revenue chính phủ**: $T \\times Q'$ — đây là phần chuyển dịch *từ CS+PS sang ngân sách*, KHÔNG mất.
**DWL**: $\\frac{1}{2} \\times T \\times (Q^* - Q')$ — phần mất hẳn vì giao dịch không xảy ra.

**Walk-through**: $Q_d = 100 - 2P$, $Q_s = -10 + 2P$. Cân bằng $(27.5, 45)$. Thuế $T = 10$:

- Cung mới: $Q_s' = -10 + 2(P - 10) = -30 + 2P$. Cân bằng mới: $100 - 2P = -30 + 2P$ $\\to$ $P_b = 32.5,\\ P_s = 22.5,\\ Q' = 35$.
- $\\text{CS}_{\\text{mới}} = 0.5 \\times 35 \\times (50 - 32.5) = 0.5 \\times 35 \\times 17.5 = 306.25$ (giảm $200$).
- $\\text{PS}_{\\text{mới}} = 0.5 \\times 35 \\times (22.5 - 5) = 306.25$ (giảm $200$).
- $\\text{Revenue} = 10 \\times 35 = 350$.
- $\\text{DWL} = 0.5 \\times 10 \\times (45 - 35) = 50$.

**Kiểm tra**: tổng mất $\\text{CS} + \\text{PS} = 400$. Trong đó $350$ chuyển sang chính phủ, $50$ mất hẳn = DWL. ✓.

### 4.3. DWL của trần giá / sàn giá

Tương tự, trần giá làm $Q < Q^*$ $\\to$ DWL. Khác biệt: KHÔNG có doanh thu chính phủ $\\to$ toàn bộ phần mất chuyển dịch + DWL nằm trong $\\text{CS} + \\text{PS}$.

### 4.4. DWL phụ thuộc co giãn

DWL **lớn khi cầu/cung co giãn cao** (vì lượng giảm nhiều hơn khi thuế áp). Đây là cơ sở của **Ramsey rule** trong public finance: nên đánh thuế nặng vào hàng *không co giãn* để giảm DWL (vd thuốc lá, rượu, xăng).

Walk-through: với cầu rất không co giãn $Q_d = 50 - 0.5P$ (so với gốc $100 - 2P$), thuế $T = 10$ cho cùng cung sẽ làm:
- $Q' \\approx 48$ (giảm rất ít từ $Q^* \\approx 50$).
- DWL $\\approx 0.5 \\times 10 \\times 2 = 10$ — nhỏ hơn nhiều.

#### ❓ Câu hỏi tự nhiên của người đọc

**Q: Vậy mọi thuế đều xấu vì gây DWL?** Không. DWL là *chi phí*, nhưng chính phủ dùng doanh thu thuế cho hàng hóa công (đường, an ninh, y tế). Câu hỏi đúng là *MB của chi tiêu công* vs *DWL của thuế*. Nếu $\\text{MB} > \\text{DWL}$ $\\to$ thuế đáng. Còn lại là chính trị + đạo đức.

**Q: Liệu có chính sách thay thế thuế không tạo DWL?** Có — *lump-sum tax* (thuế cố định không phụ thuộc hành vi, vd thuế đầu người). Nhưng không công bằng. Thực tế các chính phủ đánh thuế lên *hành vi* (tiêu dùng, thu nhập, sản xuất) $\\to$ luôn có DWL.

#### ⚠ Lỗi thường gặp

- **Coi doanh thu thuế là "mất mát"**: không. Doanh thu là *chuyển dịch* — vẫn ở trong xã hội. Chỉ DWL mới là mất.
- **Bỏ qua DWL khi đánh giá chính sách**: nhiều chính sách "giúp dân" (vd trần giá thuốc) tạo DWL lớn nếu không thiết kế khéo.

## 5. Bài tập thực hành

### Bài 1 — Tính CS, PS, W

Cầu $Q_d = 80 - 2P$, cung $Q_s = -20 + 3P$.

- (a) Tìm $(P^*, Q^*)$.
- (b) Tính CS, PS, W.

### Bài 2 — Thuế và DWL

Cùng hệ Bài 1. Áp thuế $T = 5$ lên người bán.

- (a) Tìm $(P_b, P_s, Q')$.
- (b) Tính CS mới, PS mới, Revenue, DWL.
- (c) Kiểm tra: $(\\text{CS} + \\text{PS} + \\text{Rev} + \\text{DWL})_{\\text{mới}} = W_{\\text{gốc}}$?

### Bài 3 — Trần giá và DWL

Cùng hệ Bài 1. Áp trần $P = 18$ (giả sử bán theo first-come-first-served, không phân bổ qua giá).

- (a) Lượng giao dịch ($= Q_s$ tại $P = 18$) là bao nhiêu?
- (b) Tính DWL (giả định người mua được hàng là *những người có WTP cao nhất*).

### Bài 4 — So sánh DWL theo co giãn

Hai thị trường có cùng cân bằng $(P^* = 20, Q^* = 40)$:

- Thị trường A: cầu rất co giãn ($\\text{PED} = -4$).
- Thị trường B: cầu rất không co giãn ($\\text{PED} = -0.25$).

Áp thuế $T = 5$ lên cả hai (giả sử cung như nhau, $\\text{PES} = 2$). DWL bên nào lớn hơn? Tại sao?

## 6. Lời giải chi tiết

### Lời giải Bài 1

(a) $80 - 2P = -20 + 3P$ $\\to$ $5P = 100$ $\\to$ $P^* = 20,\\ Q^* = 40$. $P_{\\max} = 40$ (từ cầu), $P_{\\min} = 20/3 \\approx 6.67$ (từ cung).

(b)
- CS $= 0.5 \\times 40 \\times (40 - 20) = 400$.
- PS $= 0.5 \\times 40 \\times (20 - 6.67) = 266.7$.
- W $= 666.7$.

### Lời giải Bài 2

(a) Cung sau thuế: $Q_s' = -20 + 3(P - 5) = -35 + 3P$. Cân bằng: $80 - 2P = -35 + 3P$ $\\to$ $5P = 115$ $\\to$ $P_b = 23,\\ P_s = 18$. $Q' = 80 - 46 = 34$.

(b)
- $\\text{CS}_{\\text{mới}} = 0.5 \\times 34 \\times (40 - 23) = 289$.
- $\\text{PS}_{\\text{mới}} = 0.5 \\times 34 \\times (18 - 6.67) = 192.6$.
- $\\text{Revenue} = 5 \\times 34 = 170$.
- $\\text{DWL} = 0.5 \\times 5 \\times (40 - 34) = 15$.

(c) $289 + 192.6 + 170 + 15 = 666.6 \\approx W_{\\text{gốc}} = 666.7$ ✓ (làm tròn).

### Lời giải Bài 3

(a) Tại $P = 18$: $Q_s = -20 + 54 = 34$ (chỉ bán được 34 đơn vị). $Q_d = 80 - 36 = 44$ (cầu vượt). **Thiếu hụt 10**.

(b) Giả định first-come-first-served với WTP cao nhất, người mua nhận 34 đơn vị từ những người có WTP cao. DWL = phần phúc lợi mất do $Q = 34 < Q^* = 40$:

$$\\text{DWL} = \\frac{1}{2} \\times (Q^* - Q') \\times \\big(P_d(Q') - P_s(Q')\\big)$$

- Tại $Q = 34$: $P_d = (80 - 34)/2 = 23$ (WTP của người mua biên), $P_s = (34 + 20)/3 = 18$ (chi phí biên người bán biên).
- $\\text{DWL} = 0.5 \\times (40 - 34) \\times (23 - 18) = 0.5 \\times 6 \\times 5 = 15$.

Trùng với DWL của thuế $T = 5$ — không phải ngẫu nhiên, vì cả hai gây cùng *gap* giữa giá người mua trả và giá người bán nhận.

### Lời giải Bài 4

DWL $\\approx 0.5 \\times T \\times \\Delta Q$. $\\Delta Q$ lớn khi cầu hoặc cung co giãn cao.

- Thị trường A (cầu rất co giãn): $\\Delta Q$ lớn $\\to$ DWL lớn.
- Thị trường B (cầu không co giãn): $\\Delta Q$ nhỏ $\\to$ DWL nhỏ.

**Bài học chính sách**: đánh thuế hàng không co giãn (thuốc lá, xăng, đường) cho DWL thấp + dễ thu doanh thu. Đây là Ramsey rule.

## 7. Liên kết và bài tiếp theo

- **Bài tiếp theo**: [Lesson 05 — Market Failures](../lesson-05-market-failures/) — khi thị trường tự do *không* tối ưu phúc lợi.
- **Bài trước**: [Lesson 03 — Độ co giãn](../lesson-03-elasticity/).
- **Minh họa tương tác**: [visualization.html](./visualization.html) — vẽ CS/PS/Revenue/DWL trên đồ thị, so sánh các kịch bản thuế và trần giá.
`;
