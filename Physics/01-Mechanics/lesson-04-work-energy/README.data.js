// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: Physics/01-Mechanics/lesson-04-work-energy/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 04 — Công & Năng lượng

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Hiểu **công cơ học** W = F·d·cos(θ) — không phải lực cũng không phải khoảng cách, mà là cách lực "chuyển" năng lượng vào hệ.
- Phân biệt 2 dạng năng lượng cơ bản: **động năng (KE)** và **thế năng (PE)**.
- Biết **định lý động năng-công**: tổng công = ΔKE.
- Áp dụng **định luật bảo toàn năng lượng** cho các bài toán cơ học (con lắc, vật trượt mặt nghiêng, lò xo).
- Hiểu **công suất (P)** = năng lượng/thời gian = F·v, đơn vị Watt.

## Kiến thức tiền đề

- [Lesson 02 — 3 định luật Newton](../lesson-02-newton-laws/) và [Lesson 03 — Các loại lực](../lesson-03-forces/).

---

## 1. Công cơ học

### 1.1. Định nghĩa

**Công cơ học** W = lượng năng lượng được chuyển bởi một lực khi vật dịch chuyển:

\`\`\`
W = F · d · cos(θ)
\`\`\`

trong đó:
- **F** = độ lớn lực (N).
- **d** = độ dịch chuyển (m).
- **θ** = góc giữa F và d.

Đơn vị: **Joule (J)**. 1 J = 1 N·m.

💡 **Ý nghĩa cụ thể**: công là "ai làm gì cho ai". Khi bạn nâng quả tạ lên cao, **bạn làm công lên tạ** = năng lượng được chuyển từ cơ bắp bạn sang tạ (dưới dạng thế năng).

**Vì sao cần khái niệm này (mà không chỉ dùng lực hoặc khoảng cách)?** Vì:
- Đẩy tường với F = 1000 N nhưng tường không di chuyển → **không có công**, không tiêu hao năng lượng cơ học (mặc dù cơ bắp mỏi vì lý do sinh học khác).
- Mang tạ đi ngang qua sàn (lực nâng vuông góc chuyển động) → **không có công** (lực ⊥ d).
- Chỉ khi **lực có thành phần dọc theo chiều chuyển động**, công mới được sinh ra.

Đó là lý do có cos(θ): chỉ lấy phần lực **dọc** chuyển động.

### 1.2. Phân tích cos(θ) — 4 trường hợp

| θ | cos(θ) | W | Ý nghĩa |
|---|--------|---|----------|
| 0° | 1 | F·d (max) | Lực cùng chiều chuyển động: dồn toàn lực vào việc tăng tốc |
| 90° | 0 | 0 | Lực vuông góc chuyển động: không công |
| 180° | −1 | −F·d | Lực ngược chiều: lấy năng lượng đi (vd ma sát) |
| 60° | 0.5 | F·d/2 | Một nửa lực có ích |

### 1.3. Bốn ví dụ số

**Ví dụ 1 — Đẩy hộp 50 N đi 10 m cùng chiều**:
- W = 50 × 10 × cos(0°) = **500 J**.

**Ví dụ 2 — Mang vali nặng 100 N đi ngang 20 m**:
- Lực nâng (lên) ⊥ chuyển động (ngang) → θ = 90° → W = **0 J**.
- Cảm giác mệt vì cơ bắp dùng ATP (sinh học), nhưng cơ học không có công.

**Ví dụ 3 — Kéo xe đẩy với dây nghiêng 30° so với mặt đất, F = 100 N, đi 5 m**:
- W = 100 × 5 × cos(30°) = 100 × 5 × 0.866 = **433 J**.

**Ví dụ 4 — Ma sát chống chuyển động**: hộp trượt 10 m, f_k = 20 N (ngược chiều chuyển động).
- W_ma_sát = 20 × 10 × cos(180°) = **−200 J**.
- Năng lượng này biến thành nhiệt — không lấy lại được.

### 📝 Tóm tắt mục 1

- W = F·d·cos(θ), đơn vị J.
- Lực ⊥ chuyển động → W = 0.
- Lực ngược chiều → W < 0 (lấy năng lượng).

---

## 2. Động năng (Kinetic Energy)

### 2.1. Định nghĩa

**Động năng KE** = năng lượng do vật **chuyển động** mà có:

\`\`\`
KE = (1/2) · m · v²
\`\`\`

Đơn vị: J.

💡 **Ý nghĩa cụ thể**: KE đo "khả năng làm công" của một vật đang chuyển động. Vật càng nhanh, càng nặng → "đập" càng mạnh, gây tác hại càng lớn (lý do tốc độ ô tô càng cao thì tai nạn càng kinh hoàng).

**Vì sao công thức là (1/2)·m·v² và không phải m·v?**

**Chứng minh**: từ định luật II và phương trình chuyển động.

Vật khối lượng m, lực F không đổi tác dụng → gia tốc a = F/m. Từ v² = v₀² + 2·a·d:
- a·d = (v² − v₀²)/2.
- F·d = m·a·d = m·(v² − v₀²)/2 = (1/2)mv² − (1/2)m·v₀².

Vế trái = công W. Vế phải = thay đổi của "đại lượng" (1/2)mv². Đó là động năng KE.

→ **Định lý động năng-công**: W_tổng = ΔKE = (1/2)mv² − (1/2)mv₀².

### 2.2. Bốn ví dụ số

**Ví dụ 1 — Ô tô 1000 kg chạy 20 m/s**: KE = 0.5 × 1000 × 400 = **200,000 J = 200 kJ**.

**Ví dụ 2 — Cùng ô tô chạy 40 m/s** (gấp đôi vận tốc): KE = 0.5 × 1000 × 1600 = **800 kJ** (gấp 4 lần, không phải gấp 2!).

→ **Bài học**: tốc độ tăng 2× → động năng tăng 4× → tai nạn ở 80 km/h gây hại gấp 4 lần ở 40 km/h.

**Ví dụ 3 — Viên đạn 10 g bay 800 m/s**: KE = 0.5 × 0.01 × 640000 = **3,200 J**. Đủ để làm hư hại nghiêm trọng.

**Ví dụ 4 — Vận động viên 60 kg chạy 10 m/s**: KE = 0.5 × 60 × 100 = **3,000 J**. Khoảng tương đương viên đạn (về năng lượng — nhưng do diện tích tiếp xúc khác nhau, viên đạn nguy hiểm hơn vì áp suất cục bộ).

### 📝 Tóm tắt mục 2

- KE = (1/2)mv², chỉ phụ thuộc m và |v| (không hướng).
- Định lý động năng-công: W = ΔKE.

---

## 3. Thế năng (Potential Energy)

### 3.1. Thế năng hấp dẫn

**Thế năng hấp dẫn PE_grav** = năng lượng "tích lũy" khi vật ở **độ cao** h so với điểm gốc:

\`\`\`
PE_grav = m · g · h
\`\`\`

💡 **Ý nghĩa**: thế năng là "tiềm năng" — không tỏ ra ngay, nhưng sẵn sàng biến thành động năng khi vật rơi.

**Vì sao tỉ lệ thuận với h?** Vì để nâng vật lên cao h, phải làm công chống trọng lực = F·d = m·g·h. Công này không mất — nó "đọng lại" trong vật dưới dạng PE.

**Lưu ý**: PE là **tương đối** — phải chọn điểm gốc. Vật ở "cao 5 m so với sàn" hay "cao 105 m so với đáy hầm" — đều cùng vật, nhưng PE khác nhau tùy gốc chọn. Chỉ **biến thiên ΔPE** mới có ý nghĩa vật lý (= công mà trọng lực sẽ làm).

### 3.2. Thế năng đàn hồi

**Thế năng đàn hồi PE_đh** = năng lượng tích lũy khi lò xo bị biến dạng x từ vị trí cân bằng:

\`\`\`
PE_đh = (1/2) · k · x²
\`\`\`

**Chứng minh**: Lực đàn hồi F = k·x (lấy độ lớn). Công để kéo lò xo từ 0 đến x = ∫₀ˣ k·x' dx' = (1/2)·k·x².

### 3.3. Ba ví dụ số

**Ví dụ 1**: Nâng vali 5 kg lên 1.5 m. PE_grav = 5 × 9.8 × 1.5 = **73.5 J**.

**Ví dụ 2**: Lò xo k = 200 N/m nén 0.1 m. PE_đh = 0.5 × 200 × 0.01 = **1 J**.

**Ví dụ 3**: Nước trên thác cao 30 m, 1 kg. PE_grav = 1 × 9.8 × 30 = **294 J**. Khi nước rơi xuống đáy, năng lượng này chuyển thành KE và nhiệt.

### 📝 Tóm tắt mục 3

- PE_grav = m·g·h (chọn gốc đặt h = 0).
- PE_đh = (1/2)·k·x² (gốc tại vị trí tự nhiên của lò xo).
- PE là tương đối; chỉ ΔPE có ý nghĩa.

---

## 4. Định luật bảo toàn năng lượng

### 4.1. Phát biểu

**Trong một hệ kín không có ma sát hoặc các lực không bảo toàn, tổng năng lượng cơ học (KE + PE) là HẰNG SỐ**:

\`\`\`
KE₁ + PE₁ = KE₂ + PE₂ = const
\`\`\`

💡 **Ý nghĩa**: năng lượng không tự tạo, không tự mất — chỉ **chuyển dạng**. Khi vật rơi: PE → KE. Khi vật lên dốc: KE → PE.

**Vì sao quan trọng?** Đây là **một trong những định luật vật lý sâu sắc nhất**. Áp dụng được cho mọi hiện tượng, không chỉ cơ học. Nếu có ma sát, một phần năng lượng cơ học biến thành **nhiệt** — nhưng tổng năng lượng (cơ học + nhiệt) vẫn bảo toàn.

### 4.2. Walk-through — Con lắc đơn

Một con lắc đơn dài 1 m kéo ra góc 30° rồi thả. Tính tốc độ ở vị trí thấp nhất.

**Phân tích bằng bảo toàn**:
- Ở vị trí cao nhất (30°): KE = 0 (đứng yên), PE = m·g·h.
  - h = L − L·cosθ = 1 − cos(30°) = 1 − 0.866 = 0.134 m.
  - PE₁ = m × 9.8 × 0.134 ≈ 1.313·m J.
- Ở vị trí thấp nhất: KE = (1/2)mv², PE = 0 (chọn gốc tại đáy).

Bảo toàn: KE₁ + PE₁ = KE₂ + PE₂ → 0 + 1.313·m = (1/2)mv² + 0.

→ v = √(2 × 1.313) = **1.62 m/s**.

(Lưu ý m hủy lẫn nhau — kết quả không phụ thuộc khối lượng. Con lắc to nhỏ bằng nhau trong vacuum đều dao động cùng tốc độ ở đáy.)

### 4.3. Khi có ma sát

Nếu có ma sát, một phần năng lượng chuyển thành nhiệt:
\`\`\`
KE₁ + PE₁ = KE₂ + PE₂ + Q (nhiệt do ma sát)
\`\`\`

trong đó Q = |W_ma_sát| = f_k × d.

### 📝 Tóm tắt mục 4

- Không ma sát: KE + PE = const.
- Có ma sát: KE + PE + Q = const (năng lượng tổng vẫn bảo toàn).

---

## 5. Công suất (Power)

### 5.1. Định nghĩa

**Công suất P** = công làm được trên đơn vị thời gian:

\`\`\`
P = W / t = F · v
\`\`\`

Đơn vị: **Watt (W)**. 1 W = 1 J/s.

💡 **Ý nghĩa**: công suất đo "nhanh thế nào". Cùng 100 J công, làm trong 1 giây (P = 100 W) "mạnh hơn" làm trong 10 giây (P = 10 W).

**Vì sao quan trọng?** Vì trong thực tế, ta thường quan tâm "máy này có đủ mạnh để làm việc này không" hơn là "tổng năng lượng cuối cùng". Đó là tại sao xe ô tô có chỉ số kW (= công suất động cơ), bóng đèn có công suất W.

### 5.2. Ví dụ con số

| Thiết bị | Công suất |
|----------|-----------|
| Bóng đèn LED | 5-15 W |
| Lò vi sóng | 800-1200 W |
| Máy bơm nước nhỏ | 750 W (1 HP) |
| Ô tô con (động cơ) | 100,000 W = 100 kW |
| Nhà máy điện lớn | 1,000 MW = 1 GW |

**1 HP (mã lực) = 745.7 W** (Watt định nghĩa: công suất nâng 75 kg lên 1 m trong 1 giây).

### 5.3. Walk-through

Một thang máy nâng vật 500 kg lên 20 m trong 10 giây. Tính công suất.
- W = m·g·h = 500 × 9.8 × 20 = 98,000 J.
- P = W/t = 98000/10 = **9,800 W = 9.8 kW** (≈ 13 HP).

### 📝 Tóm tắt mục 5

- P = W/t = F·v. Đơn vị W = J/s.
- 1 HP = 745.7 W.

---

## 6. Bài tập + Lời giải chi tiết

### Bài tập

**Bài 1**: Tính công khi đẩy hộp 30 N đi 5 m theo hướng cùng chiều lực.

**Bài 2**: Một ô tô 1500 kg tăng tốc từ 0 → 25 m/s. Tính công lực động cơ đã làm (bỏ qua ma sát).

**Bài 3**: Vật 2 kg được thả từ độ cao 10 m. Tính tốc độ chạm đất (bỏ qua sức cản).

**Bài 4**: Lò xo k = 500 N/m nén 0.2 m, sau đó thả ra đẩy vật 0.5 kg. Tính tốc độ vật khi lò xo về vị trí cân bằng.

**Bài 5**: Con lắc dài 0.8 m kéo ra 45° rồi thả. Tính tốc độ vật ở vị trí thấp nhất.

**Bài 6**: Vận động viên 70 kg chạy lên cầu thang 5 m trong 6 giây. Tính công suất.

### Lời giải

**Bài 1**: W = 30 × 5 × cos(0) = **150 J**.

**Bài 2**: 
- ΔKE = (1/2)·1500·25² − 0 = 468,750 J.
- W = ΔKE = **468.75 kJ** (định lý động năng-công).

**Bài 3**: PE = KE → m·g·h = (1/2)mv² → v = √(2gh) = √(2·9.8·10) = √196 = **14 m/s**. (Bỏ qua m — đúng với mọi vật.)

**Bài 4**: PE_đh = KE → (1/2)·500·0.04 = (1/2)·0.5·v² → 10 = 0.25·v² → v² = 40 → **v ≈ 6.32 m/s**.

**Bài 5**: h = L(1 − cosθ) = 0.8·(1 − cos45°) = 0.8·(1 − 0.707) = 0.234 m. v = √(2gh) = √(2·9.8·0.234) ≈ **2.14 m/s**.

**Bài 6**: 
- W = m·g·h = 70·9.8·5 = 3430 J.
- P = 3430/6 ≈ **571.7 W** ≈ 0.77 HP.

---

## 7. Liên kết và bài tiếp theo

- **Bài tiếp theo**: [Lesson 05 — Động lượng](../lesson-05-momentum-collisions/) — đại lượng khác để mô tả chuyển động, hữu ích cho va chạm.

---

## 📝 Tổng kết Lesson 04

1. **Công W = F·d·cos(θ)**. Lực ⊥ chuyển động → W = 0.
2. **Động năng KE = (1/2)mv²**. Định lý KE-W: W_tổng = ΔKE.
3. **Thế năng**: PE_grav = m·g·h, PE_đh = (1/2)kx².
4. **Bảo toàn năng lượng**: KE + PE = const (không ma sát).
5. **Công suất P = W/t = F·v**. Đơn vị W (Watt).

**Tiếp theo**: [Lesson 05 — Động lượng & Va chạm](../lesson-05-momentum-collisions/)
`;
