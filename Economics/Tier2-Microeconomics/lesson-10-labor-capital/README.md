# Lesson 10 — Labor & Capital (Lao động & Vốn)

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Hiểu **thị trường lao động** vận hành tương tự thị trường hàng hóa, nhưng *cầu là cầu phái sinh (derived demand)* — hãng thuê lao động vì cần *sản phẩm* lao động tạo ra.
- Tính được **giá trị sản phẩm biên của lao động (VMPL)** = `MP_L × P` và biết tại sao hãng thuê đến điểm `VMPL = wage`.
- Phân tích được tác động của *lương tối thiểu*, *công đoàn*, *monopsony* lên thị trường lao động.
- Hiểu **giá trị hiện tại (PV) và giá trị hiện tại ròng (NPV)** — công cụ chính để đánh giá đầu tư qua thời gian.
- Tính được **lãi kép** (compound interest) và phân biệt với lãi đơn.
- Áp dụng PV/NPV vào: quyết định mua máy, đi học, mua nhà, đầu tư cổ phiếu.

## Kiến thức tiền đề

- [Lesson 07](../lesson-07-production-cost/): MP_L, hàm sản xuất.
- [Lesson 02-04](../../Tier1-Foundations/lesson-02-supply-demand/): cung-cầu.

## 1. Thị trường lao động

### 1.1. Cầu lao động — derived demand

Hãng thuê lao động vì cần sản phẩm. **Giá trị sản phẩm biên của lao động**:

```
VMPL = MP_L × P
```

Hãng thuê thêm 1 lao động nếu `VMPL > wage`. Tối ưu: `VMPL = wage`.

#### 💡 Trực giác

Bạn quản lý quán cà phê, giá ly = `50k`. Nhân viên thứ 5 làm thêm 8 ly/giờ → VMPL = `400k/giờ`. Nếu wage = `100k/giờ` → có lãi `300k/giờ` → tuyển. Tuyển đến khi nhân viên cuối có VMPL = `100k`.

### 1.2. Walk-through bằng số

Quán có hàm sản xuất: ly cà phê/giờ = `20·√L` (L = nhân viên). Giá ly `30k`. Lương `90k/giờ`.

- `MP_L = 20/(2√L) = 10/√L`.
- `VMPL = 30k × 10/√L = 300/√L` (đơn vị k).
- Đặt `VMPL = 90`: `300/√L = 90` → `√L = 10/3` → `L = 11.1`.

Quán nên thuê **11 nhân viên/giờ**.

### 1.3. Cung lao động

Cung lao động dốc lên: wage cao hơn → nhiều người sẵn sàng làm. Yếu tố: thu nhập ngoài lao động, sở thích nghỉ ngơi vs làm, dân số trong tuổi lao động.

**Backward-bending supply**: ở mức wage rất cao, *thu nhập đủ* → người ta chọn nghỉ ngơi nhiều hơn → cung lao động *giảm* khi wage tiếp tục tăng. Quan sát ở giới giàu (CEO, bác sĩ chuyên khoa).

### 1.4. Cân bằng thị trường lao động

`W* = wage` mà tại đó `L_d = L_s`. Lệch ra → áp lực điều chỉnh tương tự thị trường hàng.

### 1.5. Lương tối thiểu

Nếu min wage > W* → thừa cung lao động → *thất nghiệp*. Lập luận chuẩn (Lesson 02 sàn giá).

**Tuy nhiên**: nếu thị trường lao động có *monopsony* (1 người mua chính — nhà tuyển dụng độc quyền), tăng min wage *vừa phải* có thể *tăng* việc làm. Lý do: monopsony thuê dưới mức cạnh tranh để giảm wage cho mọi người → bị min wage chặn → chuyển sang thuê ở mức cạnh tranh.

Đây là tranh luận David Card vs Krueger (1994) về lương tối thiểu — họ tìm thấy *không* có tác động tiêu cực mạnh lên việc làm.

## 2. Giá trị qua thời gian — Lãi và PV

### 2.1. Lãi đơn vs lãi kép

- **Lãi đơn**: tiền lãi *không sinh thêm lãi*. Tổng sau `n` năm với lãi `r`: `A = P(1 + nr)`.
- **Lãi kép**: tiền lãi sinh thêm lãi. Tổng sau `n` năm: `A = P(1 + r)^n`.

**Walk-through**: gửi `100` triệu, `r = 8%/năm`.

| Năm | Lãi đơn | Lãi kép |
|-----|---------|---------|
| 1 | 108 | 108.00 |
| 5 | 140 | 146.93 |
| 10 | 180 | 215.89 |
| 20 | 260 | 466.10 |
| 30 | 340 | 1.006 |

Sau 30 năm: lãi kép cho gấp ~3× lãi đơn. Đây là *sức mạnh của lãi kép* — Einstein được trích "kỳ quan thứ 8".

### 2.2. Present Value (PV)

Câu hỏi: `X` đồng *sau t năm* = bao nhiêu đồng *bây giờ*?

```
PV = X / (1 + r)^t
```

`r` = discount rate (lãi suất phản ánh chi phí cơ hội của vốn).

**Walk-through**: nhận `100` triệu sau 5 năm, `r = 10%`.

```
PV = 100 / (1.10)^5 = 100 / 1.611 = 62.1 triệu
```

Tức là *100 triệu sau 5 năm = 62.1 triệu bây giờ* (về mặt giá trị).

### 2.3. NPV (Net Present Value)

Cho một dự án có dòng tiền `C_0, C_1, C_2, ..., C_n` (`C_0` thường âm = đầu tư ban đầu):

```
NPV = C_0 + C_1/(1+r) + C_2/(1+r)² + ... + C_n/(1+r)^n
```

**Quy tắc**: chấp nhận dự án nếu `NPV > 0`.

**Walk-through**: mua máy giá `1.000` triệu, cho dòng tiền `300` triệu/năm trong 5 năm. `r = 8%`.

```
NPV = -1000 + 300/(1.08) + 300/(1.08)² + ... + 300/(1.08)⁵
    = -1000 + 277.8 + 257.2 + 238.2 + 220.5 + 204.2
    = -1000 + 1197.9 = 197.9
```

`NPV > 0` → chấp nhận.

### 2.4. IRR (Internal Rate of Return)

`r*` mà tại đó `NPV = 0`. Đo "lợi suất nội tại" của dự án. Quy tắc: chấp nhận nếu `IRR > r` (lãi suất thị trường).

Tuy nhiên IRR có vấn đề (nhiều nghiệm khi dòng tiền đổi dấu, không cộng được giữa các dự án). Nguyên tắc thực hành: **dùng NPV làm chuẩn**, IRR chỉ để báo cáo.

## 3. Ứng dụng

### 3.1. Đầu tư giáo dục

Quay lại Lesson 01 Bài 1 với góc nhìn NPV. Học cao học:
- Năm 1, 2: chi `−40` triệu/năm + bỏ qua `15 × 12 = 180` triệu/năm = `−220` triệu/năm.
- Năm 3-5: `+30 × 12 = 360` triệu/năm.

NPV với `r = 8%`:
```
NPV = -220/1.08 - 220/1.08² + 360/1.08³ + 360/1.08⁴ + 360/1.08⁵
    = -203.7 - 188.6 + 285.8 + 264.6 + 245.0 = 403.1
```

NPV > 0 → đáng học. Càng kéo dài thời gian làm việc sau khi xong (vd 30 năm thay vì 3 năm), NPV càng cao.

### 3.2. Mua nhà bằng vay

Mua nhà `2` tỉ. Vay `1.5` tỉ, lãi `r = 8%/năm`, trả đều trong 20 năm. Tiền trả mỗi năm `A`:

```
1500 = A · [1 − (1+r)^(-n)] / r = A · [1 − 1.08^-20] / 0.08
1500 = A · 9.818
A ≈ 152.8 triệu/năm
```

Tổng trả 20 năm = `3.056` tỉ. Trong đó tiền lãi = `3.056 − 1.5 = 1.556` tỉ.

## 4. Bài tập thực hành

### Bài 1 — VMPL và tuyển dụng

Quán có `Q = 30·√L` ly/giờ, giá `40k/ly`, wage `120k/giờ`. Tìm `L*`.

### Bài 2 — Lãi kép

Gửi `50` triệu, `r = 7%/năm`. Sau bao lâu thành `100` triệu?

### Bài 3 — NPV dự án

Dự án: chi `-500` triệu năm 0, thu `200`, `200`, `200`, `200` triệu năm 1-4. `r = 10%`.

- (a) Tính NPV.
- (b) Quyết định?
- (c) Nếu `r = 15%`, NPV bằng bao nhiêu? Quyết định đổi?

### Bài 4 — Lương tối thiểu

Cung lao động: `L_s = 0.5w − 5`, cầu: `L_d = 50 − 0.5w`.

- (a) Tìm cân bằng `(w*, L*)`.
- (b) Áp min wage `w_min = 70`. Tính thất nghiệp.

## 5. Lời giải chi tiết

### Lời giải Bài 1

`MP_L = 30/(2√L) = 15/√L`. `VMPL = 40 × 15/√L = 600/√L`. Đặt = 120: `√L = 5` → `L* = 25` nhân viên.

### Lời giải Bài 2

`100 = 50 × 1.07^n` → `1.07^n = 2` → `n = log(2)/log(1.07) ≈ 10.24` năm. (Quy tắc 72: `72/7 ≈ 10.3` năm — gần đúng.)

### Lời giải Bài 3

(a) `NPV = -500 + 200/1.1 + 200/1.21 + 200/1.331 + 200/1.4641 = -500 + 181.8 + 165.3 + 150.3 + 136.6 = 134.0`.

(b) NPV > 0 → chấp nhận.

(c) `r = 15%`: `NPV = -500 + 200/1.15 + 200/1.3225 + 200/1.5209 + 200/1.7490 = -500 + 173.9 + 151.2 + 131.5 + 114.3 = 70.9`. Vẫn > 0 → vẫn chấp nhận, nhưng biên an toàn ít hơn.

### Lời giải Bài 4

(a) `0.5w − 5 = 50 − 0.5w` → `w = 55`. `L* = 22.5`.

(b) `w_min = 70 > 55` → binding. `L_d = 50 − 35 = 15`. `L_s = 30`. **Thất nghiệp = 30 − 15 = 15** (15 người muốn làm với w=70 nhưng không có chỗ).

## 6. Liên kết và bài tiếp theo

- **Tier 3 — Macroeconomics** (sắp ra): GDP, growth, IS-LM, monetary/fiscal policy, inflation.
- **Bài trước**: [Lesson 09 — Game Theory](../lesson-09-game-theory/).
- **Minh họa**: [visualization.html](./visualization.html) — máy tính NPV, mô phỏng lãi kép, biểu đồ wage - lao động.
