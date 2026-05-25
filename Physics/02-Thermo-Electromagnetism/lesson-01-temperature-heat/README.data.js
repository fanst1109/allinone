// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: Physics/02-Thermo-Electromagnetism/lesson-01-temperature-heat/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 01 (Tier 2) — Nhiệt độ & Nhiệt lượng

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Phân biệt rõ **nhiệt độ T** (đo "mức nóng") và **nhiệt lượng Q** (đo "tổng năng lượng nhiệt"). Đây là 2 khái niệm thường nhầm lẫn.
- Hiểu **3 thang nhiệt độ**: Celsius (°C), Fahrenheit (°F), Kelvin (K) — biết chuyển đổi.
- Tính nhiệt lượng cần để **làm nóng** vật: Q = m·c·ΔT.
- Hiểu **nhiệt nóng chảy / nhiệt hóa hơi** (latent heat): Q = m·L.
- Phát biểu **định luật I nhiệt động học** ΔU = Q + W (bảo toàn năng lượng cho hệ nhiệt).
- Nhận diện **3 cách truyền nhiệt**: dẫn nhiệt, đối lưu, bức xạ.

## Kiến thức tiền đề

- [Lesson 04 (T1) — Công & năng lượng](../../01-Mechanics/lesson-04-work-energy/) — biết khái niệm năng lượng.

---

## 1. Nhiệt độ vs Nhiệt lượng

### 1.1. Nhiệt độ T

**Nhiệt độ T** = đại lượng đo "mức độ nóng/lạnh" của một vật. Ở mức vi mô, T tỉ lệ với **năng lượng động trung bình của các phân tử**:

\`\`\`
KE_trung_bình ∝ k_B · T   (k_B = hằng số Boltzmann)
\`\`\`

💡 **Ý nghĩa cụ thể**: nhiệt độ cao = các phân tử chuyển động nhanh (lắc lư, va chạm nhanh). Nhiệt độ thấp = phân tử chuyển động chậm. Tại **0 K** (Kelvin = "không tuyệt đối"), phân tử **gần như đứng yên** (chỉ còn dao động lượng tử nhỏ).

**Vì sao cần khái niệm này (không chỉ dùng năng lượng)?** Vì nhiệt độ không phụ thuộc khối lượng — đo "mức nóng", không phải "tổng nhiệt". 1 cốc nước 80°C và 1 hồ nước 80°C có cùng T, nhưng tổng năng lượng nhiệt của hồ lớn hơn cốc rất nhiều.

### 1.2. Nhiệt lượng Q

**Nhiệt lượng Q** = lượng năng lượng **truyền** giữa các vật do **chênh lệch nhiệt độ**.

Đơn vị: **Joule (J)**. Đơn vị cũ: **calorie (cal)** = 4.184 J (1 cal làm 1 gam nước nóng lên 1°C).

💡 **Sự khác biệt**: T đo "trạng thái" (vật đang nóng ra sao), Q đo "lượng truyền" (đã nhận hay mất bao nhiêu năng lượng). Tương tự:
- Vị trí (m) vs khoảng cách di chuyển (m) — đo "ở đâu" vs "đi bao nhiêu".
- Tài khoản (đồng) vs giao dịch (đồng) — đo "có bao nhiêu" vs "đã trao đổi bao nhiêu".

### 1.3. Ví dụ trực giác

**Ví dụ — 1 que diêm đang cháy vs hồ nước nóng**:
- Que diêm: T ≈ 800°C, m ≈ 0.1 g → tổng nhiệt nhỏ.
- Hồ nước: T ≈ 30°C, m ≈ 10⁶ kg → tổng nhiệt cực lớn.
- Que diêm có T cao hơn nhưng nhiệt lượng (tổng) nhỏ hơn rất nhiều so với hồ. 

→ Đó là tại sao **rơi vào hồ nước 30°C nguy hiểm hơn rơi vào que diêm cùng vài giây** (hồ truyền được nhiều Q hơn).

### 📝 Tóm tắt mục 1

- T: mức độ nóng, ∝ KE trung bình phân tử.
- Q: năng lượng nhiệt truyền do chênh T.
- 2 khái niệm khác nhau — đừng nhầm.

---

## 2. Ba thang nhiệt độ

| Thang | Ký hiệu | Định nghĩa |
|-------|---------|-------------|
| Celsius | °C | 0°C = nước đóng băng, 100°C = nước sôi (ở 1 atm) |
| Fahrenheit | °F | 32°F = đóng băng, 212°F = sôi |
| Kelvin | K | 0 K = không tuyệt đối (vi phân không thể đạt) |

**Chuyển đổi**:
\`\`\`
K = °C + 273.15
°F = (9/5)·°C + 32
°C = (5/9)·(°F − 32)
\`\`\`

💡 **Quy ước SI**: dùng Kelvin trong vật lý. Δ1 K = Δ1°C (cùng kích thước, chỉ khác gốc).

### Ví dụ chuyển đổi

| | °C | °F | K |
|---|----|----|----|
| Không tuyệt đối | −273.15 | −459.67 | 0 |
| Đóng băng nước | 0 | 32 | 273.15 |
| Phòng | 25 | 77 | 298.15 |
| Sôi nước | 100 | 212 | 373.15 |
| Mặt Trời | 5500 | 9932 | 5773 |

### 📝 Tóm tắt mục 2

- K = °C + 273.15. Dùng K trong tính toán vật lý.
- °F = (9/5)°C + 32 (chỉ Mỹ dùng).

---

## 3. Định luật I nhiệt động học

### 3.1. Phát biểu

**Định luật I nhiệt động** = **bảo toàn năng lượng** áp cho hệ nhiệt:

\`\`\`
ΔU = Q + W
\`\`\`

trong đó:
- **ΔU** = biến thiên nội năng của hệ (tổng năng lượng phân tử bên trong).
- **Q** = nhiệt truyền VÀO hệ (Q > 0 nếu hệ nhận nhiệt).
- **W** = công truyền VÀO hệ (W > 0 nếu môi trường làm công vào hệ; W < 0 nếu hệ làm công ra ngoài).

💡 **Ý nghĩa**: nội năng U có thể tăng bằng 2 cách: **bơm nhiệt vào** (Q) hoặc **làm công vào hệ** (W). Năng lượng không tự tạo, không tự mất.

**Vì sao quan trọng?** Đây là cơ sở của mọi máy nhiệt, mọi quá trình hóa học, sinh học. Không có nó, không tồn tại động cơ ô tô, tủ lạnh, nhà máy điện.

### 3.2. Ví dụ trực giác

**Ví dụ — Bơm xe đạp**: Khi bạn bơm nhanh, ống bơm nóng lên. Tại sao? Vì bạn **làm công vào không khí trong ống** (nén nó). W > 0 → ΔU > 0 → T tăng.

**Ví dụ — Nồi cơm điện**: Cấp Q (điện làm dây mayso nóng). W = 0. ΔU = Q → nước trong nồi tăng U → tăng T → cơm chín.

### 📝 Tóm tắt mục 3

- ΔU = Q + W.
- 2 cách tăng nội năng: bơm nhiệt vào hoặc làm công vào.

---

## 4. Q = m·c·ΔT (Nhiệt dung riêng)

### 4.1. Định nghĩa

Để làm nóng 1 vật từ T₁ đến T₂, cần nhiệt lượng:

\`\`\`
Q = m · c · ΔT
\`\`\`

trong đó:
- **m** = khối lượng (kg).
- **c** = **nhiệt dung riêng** (J/(kg·K)) — phụ thuộc chất.
- **ΔT** = biến thiên nhiệt độ (K hoặc °C, cùng giá trị).

💡 **Ý nghĩa của c**: nhiệt dung riêng đo "vật khó nóng lên thế nào". c lớn → cần nhiều Q để tăng 1 K → vật "lưu giữ nhiệt" tốt.

**Vì sao quan trọng?** Vì c **khác nhau giữa các chất** — đó là chìa khóa giải thích nhiều hiện tượng.

### 4.2. Bảng nhiệt dung riêng

| Chất | c (J/(kg·K)) |
|------|----------------|
| **Nước (lỏng)** | **4186** |
| Nước đá | 2090 |
| Hơi nước | 2080 |
| Ethanol | 2440 |
| Dầu ăn | ~ 1670 |
| Không khí | ~ 1005 |
| Sắt | 449 |
| Đồng | 385 |
| Nhôm | 897 |
| Vàng | 129 |
| Cát | ~ 830 |

→ **Nước có c CỰC CAO** (gấp 5-10 lần kim loại). Đó là tại sao:
- Nước "chậm nóng" và "chậm nguội" hơn cát/kim loại.
- Biển/đại dương điều hòa khí hậu (giữ nhiệt rất tốt — mùa hè ấm, mùa đông không quá lạnh).
- Cơ thể con người (70% nước) ổn định T tốt.

### 4.3. Ba ví dụ số

**Ví dụ 1 — Đun 1 L nước**: 1 kg nước, từ 25°C lên 100°C. ΔT = 75 K.
- Q = 1 × 4186 × 75 = **313,950 J ≈ 314 kJ**.

**Ví dụ 2 — So sánh nóng nước vs sắt**: 1 kg, ΔT = 10 K.
- Q_nước = 1·4186·10 = 41,860 J.
- Q_sắt = 1·449·10 = 4,490 J.
- → Nóng 1 kg nước cần năng lượng gấp ~9.3 lần 1 kg sắt cho cùng ΔT.

**Ví dụ 3 — Cân bằng nhiệt**: Bỏ 0.1 kg sắt nóng 200°C vào 0.5 kg nước 20°C. Tính T cân bằng.
- Cân bằng nhiệt: Q_sắt_mất = Q_nước_nhận.
- 0.1·449·(200 − T) = 0.5·4186·(T − 20).
- 8980 − 44.9·T = 2093·T − 41860.
- 50840 = 2137.9·T → T = **23.78°C**.
- → Nhiệt độ chỉ tăng từ 20°C lên 23.78°C — nước hấp thụ rất tốt mà không nóng lên nhiều (vì c cao + m gấp 5).

### 📝 Tóm tắt mục 4

- Q = m·c·ΔT.
- c đo "khó-dễ làm nóng vật".
- Nước có c cao (4186) → khả năng "lưu nhiệt" tốt.

---

## 5. Chuyển pha — Nhiệt nóng chảy & hóa hơi

### 5.1. Định nghĩa

Khi vật **chuyển pha** (rắn → lỏng, lỏng → khí), **nhiệt độ KHÔNG đổi** dù đang nhận nhiệt liên tục. Tất cả Q dùng để phá liên kết phân tử (biến cấu trúc), không tăng T.

\`\`\`
Q = m · L
\`\`\`

trong đó **L** = **nhiệt ẩn (latent heat)**:
- **L_f** = nhiệt nóng chảy (rắn ↔ lỏng), với nước = **334,000 J/kg**.
- **L_v** = nhiệt hóa hơi (lỏng ↔ khí), với nước = **2,260,000 J/kg**.

💡 **Quan sát quan trọng**: L_v (nước) >> L_f (nước). Đó là tại sao bỏng nước sôi nguy hiểm hơn bỏng nước đá tan — hơi nước truyền vô số năng lượng khi ngưng tụ về lại lỏng.

### 5.2. Ví dụ — Làm tan 1 kg nước đá ở 0°C thành nước 100°C

| Giai đoạn | ΔT | Q |
|-----------|-----|----|
| Đá → nước (chuyển pha, 0°C → 0°C) | 0 | m·L_f = 334,000 J |
| Nước 0°C → 100°C | 100 | m·c·ΔT = 418,600 J |
| Nước → hơi (chuyển pha, 100°C → 100°C) | 0 | m·L_v = 2,260,000 J |
| **Tổng** | | **3,012,600 J ≈ 3 MJ** |

→ Phần lớn năng lượng (75%) dành cho **bốc hơi**, không phải làm nóng. Đó là tại sao sôi nước chậm hơn nhiều người tưởng.

### 📝 Tóm tắt mục 5

- Q = m·L cho chuyển pha. T không đổi.
- L_v (hơi nước) >> L_f (nước đá) → hơi nước rất nguy hiểm khi ngưng.

---

## 6. Ba cách truyền nhiệt

### 6.1. Dẫn nhiệt (Conduction)

Năng lượng truyền qua **vật rắn** bằng **va chạm phân tử**. Phân tử nóng (dao động mạnh) đẩy phân tử kế bên → truyền dần. Không có vật chất di chuyển.

Ví dụ: tay cầm thanh sắt đặt 1 đầu vào lửa → đầu kia nóng dần.

### 6.2. Đối lưu (Convection)

Năng lượng truyền nhờ **chất lỏng/khí di chuyển**. Chất nóng giảm mật độ → nổi lên; chất lạnh hạ xuống. Tạo dòng tuần hoàn.

Ví dụ: đun nước trong nồi — nước đáy nóng nổi lên, nước trên lạnh chìm xuống → tạo dòng đối lưu → nước sôi đều.

### 6.3. Bức xạ (Radiation)

Năng lượng truyền bằng **sóng điện từ** (chủ yếu hồng ngoại). Không cần môi trường — truyền được trong chân không.

Ví dụ: Mặt Trời sưởi ấm Trái Đất qua 150 triệu km chân không bằng bức xạ.

### 📝 Tóm tắt mục 6

| Cách | Môi trường | Cơ chế |
|------|------------|--------|
| Dẫn nhiệt | Vật rắn | Va chạm phân tử |
| Đối lưu | Lỏng / khí | Dòng chất di chuyển |
| Bức xạ | Bất kỳ (cả chân không) | Sóng EM |

---

## 7. Bài tập + Lời giải chi tiết

### Bài tập

**Bài 1**: Chuyển đổi 50°C sang K và °F.

**Bài 2**: Tính Q cần để đun 2 L nước từ 20°C lên 100°C.

**Bài 3**: Pha 0.3 kg nước 80°C với 0.7 kg nước 20°C. Tính T cân bằng.

**Bài 4**: Cần Q để hóa hơi 0.5 kg nước ở 100°C thành hơi 100°C?

**Bài 5**: Vì sao đại dương điều hòa khí hậu cho các vùng ven biển?

**Bài 6**: Bình nước nóng 1500 W dùng dây mayso đun nước. Mất bao lâu để đun 5 L nước từ 20°C lên 80°C? (Bỏ qua mất nhiệt.)

### Lời giải

**Bài 1**: K = 50 + 273.15 = **323.15 K**. °F = (9/5)·50 + 32 = **122°F**.

**Bài 2**: m = 2 kg. Q = 2·4186·80 = **669,760 J ≈ 670 kJ**.

**Bài 3**: m₁·c·(80 − T) = m₂·c·(T − 20) → 0.3·(80−T) = 0.7·(T−20) → 24 − 0.3T = 0.7T − 14 → 38 = T → **T = 38°C**.

**Bài 4**: Q = m·L_v = 0.5·2,260,000 = **1,130,000 J = 1.13 MJ**. (Năng lượng khổng lồ — hơn cả đun nóng cùng lượng nước từ 0 đến 100°C 2.7 lần.)

**Bài 5**: Nước có c cực cao (4186, gấp 5 lần đất/cát). Đại dương lưu trữ năng lượng khổng lồ. Mùa hè: hấp thụ nhiệt từ Mặt Trời → không nóng nhanh. Mùa đông: nhả nhiệt từ từ → không lạnh nhanh. Vùng đất ven biển hưởng "buffer" của biển → khí hậu ôn hòa hơn nội địa. Vùng đất xa biển có biên độ nhiệt độ ngày-đêm và mùa lớn hơn.

**Bài 6**: 
- Q = 5·4186·60 = 1,255,800 J.
- t = Q/P = 1,255,800/1500 ≈ **838 s ≈ 14 phút**.

---

## 8. Liên kết và bài tiếp theo

- **Bài tiếp theo**: [Lesson 02 — Khí lý tưởng](../lesson-02-ideal-gas/) — PV = nRT.

---

## 📝 Tổng kết Lesson 01 (T2)

1. **T** (nhiệt độ): mức nóng, ∝ KE phân tử trung bình. **Q** (nhiệt lượng): năng lượng truyền.
2. **Kelvin**: K = °C + 273.15. Dùng trong tính toán.
3. **Định luật I**: ΔU = Q + W.
4. **Q = m·c·ΔT**. Nước c = 4186 (cao bất thường, lý do điều hòa khí hậu).
5. **Chuyển pha**: Q = m·L. T không đổi. L_v (nước) >> L_f.
6. **3 cách truyền**: dẫn (rắn), đối lưu (lỏng/khí), bức xạ (cả chân không).

**Tiếp theo**: [Lesson 02 — Khí lý tưởng PV = nRT](../lesson-02-ideal-gas/)
`;
