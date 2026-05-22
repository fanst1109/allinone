# Lesson 03 — Độ co giãn

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Hiểu **độ co giãn (elasticity)** là gì — *phần trăm thay đổi của một biến khi biến khác thay đổi 1%* — và biết khi nào dùng nó thay vì độ dốc thô.
- Tính được **co giãn cầu theo giá (price elasticity of demand — PED)**, phân biệt cầu *co giãn (elastic)*, *không co giãn (inelastic)*, *đơn vị (unit elastic)*.
- Áp dụng quy tắc **PED ↔ doanh thu**: khi nào tăng giá làm tăng doanh thu, khi nào giảm.
- Hiểu co giãn cầu theo **thu nhập (YED)** và co giãn **chéo (XED)** — phân biệt hàng bình thường vs thấp cấp, hàng thay thế vs bổ sung.
- Tính được **co giãn cung (PES)** và biết tại sao ngắn hạn cung thường ít co giãn hơn dài hạn.
- Phân tích được **gánh nặng thuế (tax incidence)** rơi vào ai (người mua hay người bán) phụ thuộc vào độ co giãn nào lớn hơn.

## Kiến thức tiền đề

- [Lesson 02 — Cung và cầu](../lesson-02-supply-demand/): hiểu đường cầu, đường cung, cân bằng.
- Toán: tỉ lệ phần trăm, đạo hàm cơ bản (đối với phần co giãn điểm).

## 1. Vì sao cần độ co giãn?

### 1.1. Vấn đề với độ dốc thô

Đường cầu `Q_d = 100 − 2P` có "độ dốc" `−2`. Đường cầu khác `Q_d = 1000 − 20P` cũng có "độ dốc" `−20`. So sánh "độ dốc" giữa hai thị trường khác đơn vị không có ý nghĩa — vì nó phụ thuộc vào *đơn vị đo*. Nếu đổi P từ "nghìn đồng" sang "triệu đồng", độ dốc đổi 1000 lần.

**Độ co giãn** là *tỉ số phần trăm* — vô đơn vị (unitless) — nên so sánh được giữa các thị trường.

#### 💡 Trực giác / Hình dung

Hai câu hỏi rất khác nhau:

1. *"Giá xăng tăng 5.000đ → lượng tiêu thụ giảm bao nhiêu?"* — phụ thuộc đơn vị, khó so sánh.
2. *"Giá xăng tăng 20% → lượng tiêu thụ giảm bao nhiêu phần trăm?"* — vô đơn vị, đo được phản ứng *tương đối*.

Co giãn trả lời câu hỏi 2.

### 1.2. Công thức cơ bản

**Co giãn của biến Y theo biến X**:

```
E_YX = (%ΔY) / (%ΔX) = (ΔY/Y) / (ΔX/X)
```

Có 2 phiên bản:

1. **Co giãn cung/đoạn (arc elasticity)**: dùng cho 2 điểm rời rạc. Thường dùng "midpoint formula" để tránh bất đối xứng:
   ```
   E = ((Q2 − Q1) / ((Q1+Q2)/2)) / ((P2 − P1) / ((P1+P2)/2))
   ```
2. **Co giãn điểm (point elasticity)**: dùng cho 1 điểm cụ thể trên đường:
   ```
   E = (dQ/dP) × (P/Q)
   ```

## 2. Co giãn cầu theo giá (PED)

### 2.1. Định nghĩa

**PED** = `(%ΔQ_d) / (%ΔP)`. Vì cầu giảm khi giá tăng → PED **âm**. Quy ước phổ biến: lấy *trị tuyệt đối* `|PED|` để phân loại.

| `|PED|` | Tên | Ý nghĩa |
|---------|-----|---------|
| `> 1` | Co giãn (elastic) | Lượng cầu phản ứng *mạnh hơn* giá |
| `= 1` | Đơn vị (unit elastic) | Phản ứng tỉ lệ 1:1 |
| `< 1` | Không co giãn (inelastic) | Phản ứng yếu |
| `= 0` | Hoàn toàn không co giãn | Lượng không đổi (vd thuốc cứu mạng) |
| `→ ∞` | Hoàn toàn co giãn | Một thay đổi giá nhỏ làm cầu nhảy về 0 |

#### 💡 Trực giác / Hình dung

- **Co giãn cao** = "không thiết yếu, dễ thay thế" → mất giá là người ta đi chỗ khác. Ví dụ: một thương hiệu pizza cụ thể (đối thủ thay thế dễ).
- **Co giãn thấp** = "thiết yếu, ít thay thế" → giá tăng người ta vẫn phải mua. Ví dụ: insulin (thuốc cứu mạng), muối ăn, xăng trong ngắn hạn.

### 2.2. Walk-through bằng số

**Ví dụ 1**: Giá Coca tăng từ `10k` → `12k`, lượng cầu giảm từ `100` → `80`.

- `%ΔP = (12−10)/10 = 20%`.
- `%ΔQ = (80−100)/100 = −20%`.
- `PED = −20% / 20% = −1` → `|PED| = 1` → **đơn vị co giãn**.

**Ví dụ 2 — midpoint formula**:

```
%ΔQ = (80 − 100) / ((80+100)/2) = −20/90 = −22.2%
%ΔP = (12 − 10) / ((12+10)/2) = 2/11 = 18.2%
PED = −22.2 / 18.2 = −1.22 → |PED| = 1.22 → co giãn
```

Midpoint cho kết quả khác chút vì đối xứng giữa "tăng" và "giảm".

**Ví dụ 3 — Insulin**: giá tăng `50%` → lượng cầu chỉ giảm `2%`. `PED = −0.04` → cực không co giãn. Đây là vì sao thị trường insulin dễ bị độc quyền lạm dụng (đã thấy ở Mỹ).

**Ví dụ 4 — Một thương hiệu cụ thể**: giá Pepsi tăng `10%`, lượng cầu Pepsi giảm `30%` (vì người dùng chuyển sang Coca). `PED = −3` → rất co giãn.

### 2.3. PED phụ thuộc gì?

1. **Sẵn có hàng thay thế**: nhiều thay thế → co giãn cao.
2. **Mức độ thiết yếu**: thiết yếu → ít co giãn (thuốc, lương thực cơ bản).
3. **Tỉ lệ trong ngân sách**: chiếm tỉ lệ lớn → co giãn cao (ô tô vs muối).
4. **Thời gian thích nghi**: ngắn hạn ít co giãn (chưa kịp đổi thói quen); dài hạn co giãn hơn.

#### ❓ Câu hỏi tự nhiên của người đọc

**Q: Cùng một đường cầu tuyến tính có thể có PED khác nhau ở từng điểm không?** Có! Trên `Q_d = 100 − 2P`:
- Tại `(P=10, Q=80)`: `PED = (dQ/dP)(P/Q) = −2 × (10/80) = −0.25` → không co giãn.
- Tại `(P=40, Q=20)`: `PED = −2 × (40/20) = −4` → rất co giãn.

Giải thích: trên đường tuyến tính, **phần trên (giá cao)** co giãn hơn, **phần dưới (giá thấp)** không co giãn. Trung điểm có `|PED| = 1`.

### 2.4. PED và doanh thu — quy tắc vàng

**Tổng doanh thu** `TR = P × Q`. Khi giá thay đổi:

| `|PED|` | Tăng giá | Giảm giá |
|---------|----------|----------|
| `> 1` (co giãn) | TR **giảm** | TR **tăng** |
| `= 1` | TR không đổi | TR không đổi |
| `< 1` (không co giãn) | TR **tăng** | TR **giảm** |

**Walk-through**: bán pizza. Hai kịch bản:

- Đối thủ pizza nhiều → `PED = −2`. Bạn giảm giá `10%` → lượng cầu tăng `20%`. TR đổi: `0.9 × 1.2 = 1.08` → **tăng 8%**.
- Pizza đặc sản, không có thay thế → `PED = −0.5`. Bạn giảm giá `10%` → lượng cầu tăng `5%`. TR đổi: `0.9 × 1.05 = 0.945` → **giảm 5.5%**.

**Hệ quả thực tế**:
- Hàng xa xỉ (PED cao): muốn tăng doanh thu → giảm giá (sale).
- Hàng thiết yếu / độc quyền (PED thấp): muốn tăng doanh thu → tăng giá.

Đây là vì sao nhà cung cấp điện thường có giá cao + ổn định, còn quần áo hay khuyến mãi.

#### ⚠ Lỗi thường gặp

- **PED là số đơn**: SAI. PED khác nhau ở từng điểm trên cùng đường cầu.
- **Dùng số tuyệt đối thay vì phần trăm**: nói "giá tăng 5k làm cầu giảm 20 đơn vị" → không phải co giãn.
- **Coi PED dương**: PED luôn âm (cho hàng thường); chỉ lấy giá trị tuyệt đối khi *phân loại*.

#### 🔁 Dừng lại tự kiểm tra

Cầu thị trường: `Q_d = 60 − 2P`. Tính PED tại:

1. `P = 10`.
2. `P = 20`.
3. `P = 25`.

<details>
<summary>Đáp án</summary>

`dQ/dP = −2`. PED = `−2 × P/Q`.

1. `P=10, Q=40`: PED = `−2 × 10/40 = −0.5` → không co giãn.
2. `P=20, Q=20`: PED = `−2 × 20/20 = −2` → co giãn.
3. `P=25, Q=10`: PED = `−2 × 25/10 = −5` → rất co giãn.

Tại `P=15, Q=30`, PED = `−1` (đơn vị co giãn) — trung điểm.
</details>

#### 📝 Tóm tắt mục 2

- PED = `%ΔQ / %ΔP`, lấy `|PED|` để phân loại.
- PED phụ thuộc: thay thế, thiết yếu, ngân sách, thời gian.
- Trên đường cầu tuyến tính, PED đổi theo điểm.
- Quy tắc TR: co giãn → tăng giá *giảm* doanh thu; không co giãn → tăng giá *tăng* doanh thu.

## 3. Co giãn cầu theo thu nhập (YED)

```
YED = (%ΔQ_d) / (%ΔY)
```

`Y` = thu nhập. YED phân loại hàng hóa:

| YED | Tên | Ví dụ |
|-----|-----|-------|
| `> 1` | Hàng xa xỉ (luxury) | Du lịch, hàng hiệu |
| `0 < YED < 1` | Hàng bình thường, thiết yếu | Lương thực cơ bản |
| `< 0` | Hàng thấp cấp (inferior) | Mì gói, xe bus công cộng (khi giàu lên thì giảm dùng) |
| `= 0` | Hàng "trung tính" | Muối ăn |

**Ví dụ số**: thu nhập tăng `10%`, lượng cầu du lịch quốc tế tăng `25%`. `YED = 2.5` → xa xỉ.

Thu nhập tăng `10%`, lượng cầu mì gói giảm `3%`. `YED = −0.3` → hàng thấp cấp.

#### ❓ Tại sao xe bus công cộng lại là hàng thấp cấp?

Vì khi giàu lên, người ta chuyển sang ô tô riêng / Grab → cầu xe bus giảm. KHÔNG có nghĩa xe bus "kém về chất lượng" — chỉ là quan hệ thống kê.

## 4. Co giãn chéo (XED)

```
XED_AB = (%ΔQ_A) / (%ΔP_B)
```

Đo cầu hàng A phản ứng với giá hàng B.

| XED | Quan hệ | Ví dụ |
|-----|---------|-------|
| `> 0` | Thay thế (substitute) | Coca - Pepsi |
| `< 0` | Bổ sung (complement) | Xe ô tô - xăng |
| `= 0` | Không liên quan | Muối - giày dép |

**Ví dụ**: giá Pepsi tăng `10%`, cầu Coca tăng `5%`. `XED = 0.5` → thay thế (yếu).

Giá xăng tăng `20%`, cầu ô tô giảm `4%`. `XED = −0.2` → bổ sung (yếu).

## 5. Co giãn cung (PES)

```
PES = (%ΔQ_s) / (%ΔP)
```

PES dương (cung tăng theo giá).

| PES | Tên |
|-----|-----|
| `> 1` | Co giãn |
| `= 1` | Đơn vị |
| `< 1` | Không co giãn |
| `= 0` | Hoàn toàn không co giãn (cung cố định — vd đất ở trung tâm) |
| `→ ∞` | Hoàn toàn co giãn (sản xuất linh hoạt vô hạn) |

**Yếu tố ảnh hưởng PES**:

1. **Khả năng tăng/giảm sản lượng**: nhà máy có công suất dư → PES cao.
2. **Thời gian**: ngắn hạn PES thấp (chưa kịp xây thêm nhà máy); dài hạn PES cao.
3. **Khả năng lưu kho**: lưu được thì cung linh hoạt hơn.

**Ví dụ**:
- Cung dầu thô ngắn hạn: `PES ≈ 0.1` (rất không co giãn — đã đầu tư cố định).
- Cung dầu thô dài hạn: `PES ≈ 0.5-1` (có thể khoan thêm giếng).
- Cung tranh nguyên bản Mona Lisa: `PES = 0` (1 bức, không thể nhân bản).

## 6. Ứng dụng — gánh nặng thuế

### 6.1. Câu hỏi cơ bản

Khi chính phủ đánh thuế `T` đồng/đơn vị lên người bán, ai *thực sự* gánh? Người bán hay người mua?

Trả lời: phụ thuộc **độ co giãn tương đối**:

> Bên *nào ít co giãn hơn* sẽ gánh phần lớn thuế.

#### 💡 Trực giác

- Co giãn cao = "linh hoạt, có thể bỏ thị trường" → tránh được thuế.
- Co giãn thấp = "kẹt, không có lựa chọn" → phải gánh thuế.

### 6.2. Walk-through bằng số

Cầu `Q_d = 100 − 2P`, cung `Q_s = −10 + 2P`. Cân bằng `(P=27.5, Q=45)`.

Thuế `T = 10` đồng/đơn vị lên người bán. Cung dịch lên: người bán giờ cần nhận `P − 10` để cung tương đương. Cung mới: `Q_s' = −10 + 2(P − 10) = −30 + 2P`.

Cân bằng mới: `100 − 2P = −30 + 2P` → `4P = 130` → `P_buyer = 32.5`. Người bán thực nhận `P_seller = 22.5`. Lượng mới `Q' = 35`.

- Người mua gánh: `32.5 − 27.5 = 5` đồng.
- Người bán gánh: `27.5 − 22.5 = 5` đồng.

Chia 50-50 vì *PED và PES có cùng độ lớn* trong ví dụ này.

**Thay đổi co giãn**: nếu cầu rất co giãn (`Q_d = 200 − 10P` chẳng hạn), cân bằng + thuế sẽ làm người mua gánh ít hơn, người bán gánh nhiều hơn. Đây là cách thuế thuốc lá rơi gần như toàn bộ vào người mua (cầu rất không co giãn vì nghiện).

#### ⚠ Lỗi thường gặp

- **"Thuế lên ai thì người đó gánh"**: SAI. Pháp luật quy định người *nộp* thuế, nhưng thuế *thực tế* được chia theo độ co giãn — gọi là *tax incidence*.

## 7. Bài tập thực hành

### Bài 1 — Tính PED ở các điểm

Cầu `Q_d = 200 − 4P`.

- (a) Tính PED tại `P=10`, `P=25`, `P=40`.
- (b) Tại điểm nào `|PED| = 1`?
- (c) Doanh thu cực đại ở giá nào?

### Bài 2 — Phân loại hàng hóa qua YED và XED

| Quan sát | YED hoặc XED |
|----------|--------------|
| Thu nhập tăng 10%, cầu thịt bò tăng 15% | (a) YED của thịt bò = ? |
| Thu nhập tăng 10%, cầu mì gói giảm 5% | (b) YED của mì gói = ? |
| Giá vé máy bay tăng 10%, cầu khách sạn (cùng điểm đến) giảm 7% | (c) XED khách sạn / vé máy bay = ? |

Hãy phân loại từng hàng.

### Bài 3 — Doanh thu của một dịch vụ

Bạn đang vận hành dịch vụ subscription. PED ước tính `−0.7` (không co giãn). Bạn cân nhắc tăng giá 10%.

- (a) Lượng đăng ký thay đổi bao nhiêu?
- (b) Doanh thu thay đổi bao nhiêu?
- (c) Đề xuất khi nào không nên tăng giá dù PED < 1.

### Bài 4 — Gánh nặng thuế

Cầu `Q_d = 80 − P`, cung `Q_s = −20 + P`. Tìm cân bằng. Sau đó áp thuế `T = 10` lên người bán.

- (a) Tính `(P*, Q*)` ban đầu.
- (b) Tính `P_buyer, P_seller, Q'` sau thuế.
- (c) Ai gánh bao nhiêu? Vì sao là tỉ lệ này?

## 8. Lời giải chi tiết

### Lời giải Bài 1

`dQ/dP = −4`. PED = `−4 × P/Q`.

- (a) `P=10, Q=160`: PED = `−4 × 10/160 = −0.25` → không co giãn.
  `P=25, Q=100`: PED = `−4 × 25/100 = −1` → đơn vị.
  `P=40, Q=40`: PED = `−4 × 40/40 = −4` → rất co giãn.
- (b) `|PED|=1` khi `4P = Q = 200 − 4P` → `8P = 200` → `P = 25`.
- (c) Doanh thu cực đại tại điểm `|PED| = 1` → `P = 25, Q = 100, TR = 2500`.

### Lời giải Bài 2

- (a) YED = `15/10 = 1.5` → hàng xa xỉ (hoặc bình thường cao cấp).
- (b) YED = `−5/10 = −0.5` → hàng thấp cấp.
- (c) XED = `−7/10 = −0.7` → bổ sung. (Vé máy bay + khách sạn cùng điểm đến đi đôi với nhau.)

### Lời giải Bài 3

- (a) `%ΔQ = PED × %ΔP = −0.7 × 10% = −7%`. Đăng ký giảm 7%.
- (b) `%ΔTR ≈ %ΔP + %ΔQ = 10% − 7% = +3%` (xấp xỉ cho thay đổi nhỏ). Hoặc tính chính xác: `TR_new / TR_old = 1.1 × 0.93 = 1.023` → tăng 2.3%.
- (c) Không nên tăng giá nếu:
  - Có đối thủ chuẩn bị giảm giá → PED dài hạn sẽ cao hơn ước tính.
  - Tăng giá ảnh hưởng *thương hiệu* (cảm giác "tham lam").
  - Tăng giá làm khách rời và *không quay lại* (churn không thể đảo ngược).

### Lời giải Bài 4

- (a) `80 − P = −20 + P` → `2P = 100` → `P* = 50, Q* = 30`.
- (b) Cung sau thuế: `Q_s' = −20 + (P − 10) = −30 + P`. Cân bằng: `80 − P = −30 + P` → `P_buyer = 55`. `P_seller = 45`. `Q' = 25`.
- (c) Người mua gánh `55 − 50 = 5`. Người bán gánh `50 − 45 = 5`. **Chia đều 50-50** vì độ dốc cầu (`|−1|`) bằng độ dốc cung (`+1`) → PED và PES ở điểm cân bằng bằng nhau. (PED = `−1 × 50/30 = −1.67`, PES = `1 × 50/30 = 1.67`.)

## 9. Liên kết và bài tiếp theo

- **Bài tiếp theo**: [Lesson 04 — Thặng dư & Deadweight Loss](../lesson-04-surplus-dwl/) — định lượng phúc lợi của thị trường + tổn thất khi can thiệp.
- **Bài trước**: [Lesson 02 — Cung và cầu](../lesson-02-supply-demand/).
- **Minh họa tương tác**: [visualization.html](./visualization.html) — máy tính PED ở mọi điểm, mô phỏng doanh thu theo giá, demo gánh nặng thuế.
