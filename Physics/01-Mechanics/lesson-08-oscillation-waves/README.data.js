// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: Physics/01-Mechanics/lesson-08-oscillation-waves/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 08 — Dao động & Sóng cơ

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Hiểu **dao động điều hòa (Simple Harmonic Motion, SHM)** — chuyển động tuần hoàn cơ bản nhất.
- Biết phương trình SHM: x(t) = A·cos(ω·t + φ), và các đại lượng A, ω, φ, T, f.
- Tính chu kỳ của 2 hệ dao động cơ bản:
  - **Con lắc lò xo**: T = 2π·√(m/k).
  - **Con lắc đơn**: T = 2π·√(L/g).
- Phân biệt **sóng ngang** (transverse) và **sóng dọc** (longitudinal).
- Áp dụng công thức cơ bản của sóng: **v = λ·f** (vận tốc = bước sóng × tần số).
- Hiểu giao thoa sóng cơ bản (chồng chất, sóng đứng).

## Kiến thức tiền đề

- [Lesson 03 — Các loại lực](../lesson-03-forces/) (Hooke), [Lesson 04 — Công & năng lượng](../lesson-04-work-energy/) (bảo toàn).

---

## 1. Dao động điều hòa (SHM)

### 1.1. Định nghĩa

**Dao động điều hòa SHM** = chuyển động tuần hoàn trong đó **lực kéo về** tỉ lệ với độ lệch khỏi vị trí cân bằng và **luôn hướng về** vị trí đó:

\`\`\`
F = −k · x
\`\`\`

(Tương tự định luật Hooke ở Lesson 03.)

💡 **Ý nghĩa**: bất kỳ hệ nào có lực kéo về tỉ lệ với độ lệch, đều dao động "đơn" — kiểu cơ bản nhất, tạo ra đường cong sin/cos đẹp.

**Vì sao quan trọng?** SHM là **mô hình cơ bản** cho rất nhiều hiện tượng:
- Lò xo, con lắc đồng hồ.
- Dao động của phân tử trong vật rắn (tạo nhiệt).
- Mạch LC điện tử.
- Sóng âm, sóng điện từ (hiểu là dao động lan truyền).
- Cơ học lượng tử: dao động tử điều hòa là 1 trong những bài toán cơ bản nhất.

→ Học SHM kỹ = nắm chìa khóa hiểu hàng loạt vật lý khác.

### 1.2. Phương trình SHM

Nghiệm của F = −kx (kết hợp F = m·a) là:
\`\`\`
x(t) = A · cos(ω·t + φ)
\`\`\`

trong đó:
- **A** = biên độ (amplitude) — độ lệch tối đa khỏi cân bằng (đơn vị m).
- **ω** = tần số góc (rad/s) — quyết định nhanh chậm.
- **φ** = pha ban đầu (phase) — vị trí lúc t = 0.

Liên hệ tần số:
- **Chu kỳ T** = thời gian 1 dao động: T = 2π/ω.
- **Tần số f** = số dao động/giây: f = 1/T = ω/(2π).

Vận tốc và gia tốc (đạo hàm):
- v(t) = dx/dt = −A·ω·sin(ω·t + φ).
- a(t) = d²x/dt² = −A·ω²·cos(ω·t + φ) = −ω²·x.

→ **a = −ω²·x** — đây là đặc trưng của SHM: gia tốc luôn ngược chiều và tỉ lệ với vị trí.

### 1.3. Năng lượng SHM

\`\`\`
E_tổng = (1/2) · k · A² = const
\`\`\`

Năng lượng dao động giữa KE và PE, nhưng **tổng không đổi**:
- Tại vị trí cân bằng (x = 0): KE max, PE = 0. v = A·ω.
- Tại biên (x = ±A): v = 0, KE = 0, PE max = (1/2)·k·A².

### ⚠ Lỗi thường gặp

- **Nghĩ gia tốc lớn nhất ở vị trí cân bằng**: ngược lại. a = −ω²·x → a lớn nhất tại **biên** (x = ±A, lực kéo về mạnh nhất); a = 0 tại cân bằng (x = 0). Còn **vận tốc** thì lớn nhất ở cân bằng, bằng 0 ở biên.
- **Lẫn tần số f (Hz) với tần số góc ω (rad/s)**: ω = 2πf. Quên hệ số 2π → sai 6.28 lần. Phản ví dụ: ω = 10 rad/s thì f = 10/(2π) ≈ 1.59 Hz, KHÔNG phải 10 Hz.
- **Nghĩ chu kỳ phụ thuộc biên độ**: với SHM, T độc lập với A. Kéo lò xo xa hơn → dao động rộng hơn nhưng **cùng chu kỳ**. Đó là lý do đồng hồ con lắc chính xác.

### ❓ Câu hỏi tự nhiên của người đọc

- *"Vì sao SHM lại quan trọng đến vậy?"* Vì bất kỳ hệ nào gần điểm cân bằng ổn định đều dao động xấp xỉ SHM (lực kéo về ≈ tỉ lệ độ lệch). Lò xo, con lắc, phân tử trong vật rắn, mạch điện LC, thậm chí sóng âm/ánh sáng — tất cả là SHM hoặc tổ hợp SHM. Học một mô hình, hiểu vô số hiện tượng.
- *"a = −ω²·x nghĩa là gì?"* Gia tốc luôn **ngược dấu** với vị trí (dấu −) và tỉ lệ với độ lệch. Lệch phải → bị kéo trái; lệch xa → kéo mạnh. Đây chính là đặc trưng nhận diện SHM.
- *"Năng lượng dao động ra sao trong một chu kỳ?"* Liên tục chuyển qua lại giữa động năng và thế năng, nhưng **tổng = ½kA² không đổi**. Ở biên: toàn thế năng (v=0). Ở cân bằng: toàn động năng (x=0, v max).

🔁 **Dừng lại tự kiểm tra**

1. Vật dao động với ω = 5 rad/s, biên độ A = 0.1 m. Tần số f và chu kỳ T?
2. Tại vị trí nào (cân bằng hay biên) thì vận tốc lớn nhất? Gia tốc lớn nhất?

<details><summary>Đáp án</summary>

1. T = 2π/ω = 2π/5 ≈ **1.26 s**. f = 1/T = ω/(2π) = 5/(2π) ≈ **0.80 Hz**.
2. Vận tốc lớn nhất ở **vị trí cân bằng** (x=0); gia tốc lớn nhất ở **biên** (x=±A, vì a = −ω²x).

</details>

### 📝 Tóm tắt mục 1

- SHM: F = −kx. Nghiệm x(t) = A·cos(ωt + φ).
- a = −ω²·x. T = 2π/ω.
- E = (1/2)kA², bảo toàn giữa KE và PE.

---

## 2. Con lắc lò xo

### 2.1. Chu kỳ

Cho vật m gắn lò xo k. Từ định luật Hooke F = −kx và F = m·a = m·(−ω²·x):
\`\`\`
m·ω² = k → ω = √(k/m) → T = 2π·√(m/k)
\`\`\`

💡 **Quan sát quan trọng**: T phụ thuộc m và k, KHÔNG phụ thuộc A (biên độ). Đó là tại sao con lắc đồng hồ giữ thời gian chính xác — biên độ thay đổi (mỏi dần) nhưng chu kỳ không đổi.

### 2.2. Ví dụ số

**Ví dụ**: Lò xo k = 200 N/m gắn vật 0.5 kg.
- T = 2π·√(0.5/200) = 2π·√(0.0025) = 2π × 0.05 = **0.314 s**.
- f = 1/T ≈ **3.18 Hz** (dao động ~3 lần/giây).
- ω = 2π/T ≈ **20 rad/s**.

### ⚠ Lỗi thường gặp

- **Đảo m và k trong công thức**: T = 2π√(m/k) — khối lượng ở **tử**, độ cứng ở **mẫu** dưới căn. Đảo lại → sai. Trực giác kiểm tra: m lớn (nặng) → dao động chậm → T lớn (m ở tử là đúng); k lớn (cứng) → dao động nhanh → T nhỏ (k ở mẫu đúng).
- **Nghĩ T phụ thuộc biên độ**: KHÔNG. T chỉ phụ thuộc m và k. Kéo xa hay gần → cùng T.
- **Quên căn bậc hai**: T ∝ √(m/k), không phải m/k. Khối lượng gấp 4 → T gấp **2** (√4), không gấp 4.

### ❓ Câu hỏi tự nhiên của người đọc

- *"Vì sao vật nặng dao động chậm hơn?"* Vì m lớn → quán tính lớn → khó đổi chiều chuyển động → mỗi dao động lâu hơn → T lớn. Công thức T = 2π√(m/k) phản ánh: m ở tử.
- *"Lò xo cứng hơn (k lớn) thì sao?"* Dao động **nhanh hơn** (T nhỏ). Lực kéo về mạnh hơn → vật bị "giật" về cân bằng nhanh hơn. k ở mẫu nên k lớn → T nhỏ.
- *"Vì sao đồng hồ con lắc giữ giờ chính xác dù biên độ giảm dần?"* Vì chu kỳ độc lập với biên độ. Khi đồng hồ "yếu" dần, biên độ nhỏ lại nhưng mỗi dao động vẫn mất đúng bấy nhiêu thời gian → giờ vẫn chính xác.

🔁 **Dừng lại tự kiểm tra**

1. Lò xo k = 100 N/m gắn vật 1 kg. Tính chu kỳ T.
2. Nếu thay vật bằng vật nặng gấp 4 lần (4 kg), chu kỳ thay đổi thế nào?

<details><summary>Đáp án</summary>

1. T = 2π√(m/k) = 2π√(1/100) = 2π·0.1 = **0.628 s**.
2. m gấp 4 → T gấp √4 = **2 lần** = 1.257 s.

</details>

### 📝 Tóm tắt mục 2

- T = 2π·√(m/k) cho con lắc lò xo.
- T độc lập với biên độ A.

---

## 3. Con lắc đơn

### 3.1. Chu kỳ

Cho con lắc dài L (vật treo dây). Với biên độ nhỏ (góc < 15°):
\`\`\`
T = 2π · √(L / g)
\`\`\`

**Chứng minh**: lực kéo về tại góc θ là F = −m·g·sin(θ) ≈ −m·g·θ (xấp xỉ góc nhỏ). Tương đương Hooke với k_tương_đương = m·g/L. → T = 2π·√(m/k) = 2π·√(L/g).

💡 **Quan sát**: T phụ thuộc L và g, KHÔNG phụ thuộc m. Con lắc nặng và nhẹ có cùng chu kỳ! (Khám phá bởi Galileo qua thí nghiệm ở Tháp Pisa.)

### 3.2. Ví dụ số

**Ví dụ — Đồng hồ con lắc**: cần T = 1 s. Tính L.
- T = 2π·√(L/g) → 1 = 2π·√(L/9.8) → L/9.8 = 1/(4π²) → **L = 0.248 m ≈ 25 cm**.

### ⚠ Lỗi thường gặp

- **Dùng công thức cho biên độ lớn**: T = 2π√(L/g) chỉ đúng với góc nhỏ (< ~15°), nơi sin(θ) ≈ θ. Góc lớn → chu kỳ thực dài hơn công thức cho.
- **Nghĩ con lắc nặng dao động khác con lắc nhẹ**: SAI. T = 2π√(L/g) **không** chứa khối lượng. Con lắc nặng và nhẹ cùng chiều dài có cùng chu kỳ (Galileo phát hiện).
- **Lẫn L (chiều dài dây) với biên độ**: L là chiều dài con lắc; biên độ là góc/khoảng lệch tối đa. T phụ thuộc L, không phụ thuộc biên độ.

### ❓ Câu hỏi tự nhiên của người đọc

- *"Vì sao chu kỳ con lắc không phụ thuộc khối lượng?"* Vì cả lực kéo về (mg·sinθ) và quán tính (m) đều tỉ lệ với m → m triệt tiêu khi tính gia tốc, giống như rơi tự do. Kết quả T = 2π√(L/g) không có m.
- *"Vì sao chỉ đúng với góc nhỏ?"* Vì chứng minh dùng xấp xỉ sin(θ) ≈ θ (chỉ đúng khi θ nhỏ, tính bằng radian). Góc lớn → xấp xỉ sai → SHM không còn chính xác → chu kỳ dài hơn.
- *"Đưa đồng hồ con lắc lên núi cao thì chạy nhanh hay chậm?"* g giảm theo độ cao → T = 2π√(L/g) tăng → mỗi dao động lâu hơn → đồng hồ chạy **chậm** hơn. (Tương tự lên Mặt Trăng chậm hơn nhiều vì g nhỏ.)

🔁 **Dừng lại tự kiểm tra**

1. Con lắc đơn dài 2 m trên Trái Đất. Tính chu kỳ. (g=9.8)
2. Cùng con lắc đó nhưng treo vật nặng gấp đôi. Chu kỳ thay đổi không?

<details><summary>Đáp án</summary>

1. T = 2π√(L/g) = 2π√(2/9.8) = 2π√0.204 = 2π·0.452 ≈ **2.84 s**.
2. **Không đổi** — T không phụ thuộc khối lượng, chỉ phụ thuộc L và g.

</details>

### 📝 Tóm tắt mục 3

- T = 2π·√(L/g) (góc nhỏ).
- Độc lập với m.

---

## 4. Sóng cơ

### 4.1. Định nghĩa

**Sóng cơ** = dao động lan truyền trong môi trường vật chất (chất rắn, lỏng, khí). Không có vật chất chuyển động "dài" — chỉ có **năng lượng và pha** lan truyền.

💡 **Hình dung — Sóng nước**: nước trên hồ nhấp nhô khi có gió. Mỗi giọt nước **chỉ dao động lên xuống tại chỗ**, không "chạy" theo sóng. Chỉ pha (lúc đỉnh, lúc đáy) lan truyền.

### 4.2. Hai loại sóng

**Sóng ngang (transverse)**: dao động vuông góc với chiều truyền sóng.
- Ví dụ: sóng trên sợi dây, sóng nước (gần đúng), sóng điện từ.

**Sóng dọc (longitudinal)**: dao động cùng chiều với chiều truyền.
- Ví dụ: sóng âm trong không khí (nén-giãn).

### 4.3. Các đại lượng đặc trưng

| Đại lượng | Ký hiệu | Đơn vị | Ý nghĩa |
|-----------|---------|--------|---------|
| Biên độ | A | m | Độ lệch tối đa |
| Bước sóng | λ | m | Khoảng cách 2 đỉnh liên tiếp |
| Tần số | f | Hz | Số dao động/giây |
| Chu kỳ | T = 1/f | s | Thời gian 1 dao động |
| Vận tốc truyền | v | m/s | Tốc độ pha lan truyền |

**Công thức cơ bản**:
\`\`\`
v = λ · f
\`\`\`

💡 **Ý nghĩa**: trong 1 chu kỳ T, sóng tiến được 1 bước sóng λ → v = λ/T = λ·f.

### 4.4. Bốn ví dụ số

**Ví dụ 1 — Sóng âm trong không khí**: v ≈ 343 m/s ở 20°C. Tần số tiếng nói ~ 200-500 Hz. λ = v/f = 343/300 ≈ **1.14 m**.

**Ví dụ 2 — Sóng radio FM**: f = 100 MHz = 10⁸ Hz. v = c = 3×10⁸ m/s. λ = c/f = **3 m**. (Đó là tại sao anten radio FM dài ~ 1 m, không cần dài hơn.)

**Ví dụ 3 — Sóng âm trong nước**: v ≈ 1500 m/s (nhanh gấp 4 lần không khí). Cùng tần số 1000 Hz → λ ≈ **1.5 m** (gấp 4 lần trong không khí).

**Ví dụ 4 — Sóng siêu âm y tế**: f = 5 MHz. v ≈ 1500 m/s trong nước (xấp xỉ mô người). λ ≈ **0.3 mm**. Đủ nhỏ để "thấy" chi tiết trong cơ thể.

### ⚠ Lỗi thường gặp

- **Nghĩ vật chất "chạy theo" sóng**: SAI. Trong sóng, mỗi phần tử môi trường chỉ **dao động tại chỗ** — chỉ năng lượng và pha lan truyền. Mẩu gỗ trên mặt nước nhấp nhô lên xuống, không bị sóng cuốn đi.
- **Nghĩ tần số đổi khi sóng chuyển môi trường**: khi sóng âm đi từ không khí sang nước, **tần số giữ nguyên** (do nguồn quyết định), nhưng v đổi → λ đổi theo v = λf. Nhiều người nhầm tưởng f đổi.
- **Lẫn sóng ngang và sóng dọc**: sóng ngang dao động **vuông góc** chiều truyền (sóng dây); sóng dọc dao động **cùng** chiều truyền (sóng âm, nén-giãn).

### ❓ Câu hỏi tự nhiên của người đọc

- *"Sóng truyền năng lượng mà không truyền vật chất — sao có thể?"* Mỗi phần tử dao động tại chỗ và "kéo" phần tử kế bên dao động theo, trễ một chút. Pha (lúc đỉnh/đáy) lan đi từ phần tử này sang phần tử khác, mang theo năng lượng, nhưng bản thân vật chất chỉ dao động quanh chỗ cũ.
- *"v = λf nghĩa là gì trực giác?"* Trong một chu kỳ T, sóng tiến được đúng một bước sóng λ. Vậy tốc độ = quãng đường/thời gian = λ/T = λf. Tần số cao + bước sóng dài → sóng nhanh.
- *"Vì sao siêu âm dùng tần số cao?"* Vì λ nhỏ (λ = v/f). Bước sóng nhỏ "nhìn thấy" được chi tiết nhỏ trong cơ thể (phân giải tốt). Tần số thấp → λ lớn → chỉ thấy được vật to.

🔁 **Dừng lại tự kiểm tra**

1. Sóng có bước sóng 0.5 m và tần số 680 Hz. Tính tốc độ truyền sóng.
2. Sóng âm 256 Hz truyền trong không khí (v = 343 m/s). Bước sóng bằng bao nhiêu?

<details><summary>Đáp án</summary>

1. v = λ·f = 0.5·680 = **340 m/s** (xấp xỉ tốc độ âm thanh — đây là sóng âm).
2. λ = v/f = 343/256 ≈ **1.34 m**.

</details>

### 📝 Tóm tắt mục 4

- Sóng cơ: dao động lan truyền, không phải vật chất di chuyển dài.
- Ngang vs dọc tùy hướng dao động.
- v = λ·f.

---

## 5. Bài tập + Lời giải chi tiết

### Bài tập

**Bài 1**: Lò xo k = 400 N/m gắn vật 0.2 kg. Tính T, f, ω.

**Bài 2**: Con lắc đơn dài 1 m trên Trái Đất. Tính T. Trên Mặt Trăng (g = 1.6 m/s²) thì T bằng bao nhiêu?

**Bài 3**: Vật dao động x = 0.05·cos(10t + π/4). Xác định A, ω, T, f.

**Bài 4**: Sóng âm trong không khí có f = 440 Hz (nốt A4). Tính bước sóng. (v = 343 m/s.)

**Bài 5**: Vì sao đồng hồ quả lắc (con lắc đơn) chạy chậm hơn vào mùa hè?

**Bài 6**: Sóng nước có λ = 2 m, T = 0.5 s. Tính v sóng.

### Lời giải

**Bài 1**: 
- ω = √(k/m) = √(400/0.2) = √2000 ≈ **44.7 rad/s**.
- T = 2π/ω ≈ **0.141 s**.
- f = 1/T ≈ **7.12 Hz**.

**Bài 2**: 
- Trái Đất: T = 2π√(1/9.8) = **2.01 s**.
- Mặt Trăng: T = 2π√(1/1.6) = **4.97 s** (gấp ~2.47 lần). 
- Đồng hồ quả lắc trên Mặt Trăng chạy chậm hơn 2.47 lần.

**Bài 3**: A = 0.05 m, ω = 10 rad/s, T = 2π/10 ≈ **0.628 s**, f = **1.59 Hz**, φ = π/4.

**Bài 4**: λ = v/f = 343/440 = **0.78 m** = 78 cm. (Đây là kích thước "tự nhiên" của tiếng nốt A. Đó là tại sao ống sáo, dây đàn có kích cỡ centimét đến mét.)

**Bài 5**: Mùa hè, thanh treo của đồng hồ giãn nở do nhiệt → L tăng nhẹ → T = 2π√(L/g) tăng → mỗi dao động lâu hơn → đồng hồ chạy chậm hơn. Sai số nhỏ nhưng tích lũy theo tháng. Đồng hồ chính xác dùng vật liệu ít giãn nở (Invar) hoặc bù bằng cơ chế nhiệt.

**Bài 6**: v = λ/T = 2/0.5 = **4 m/s**.

---

## 6. Liên kết và bài tiếp theo

🎉 **Hoàn thành Tier 1 — Mechanics!** (8/8 lesson)

- **Tier 2 — Thermo & Electromagnetism**: [Lesson 01 — Nhiệt độ & nhiệt lượng](../../02-Thermo-Electromagnetism/lesson-01-temperature-heat/).

---

## 📝 Tổng kết Lesson 08

1. **SHM**: F = −kx, x(t) = A·cos(ωt + φ). Đặc trưng: a = −ω²·x.
2. **Năng lượng SHM** = (1/2)kA², bảo toàn giữa KE và PE.
3. **Con lắc lò xo**: T = 2π·√(m/k) (độc lập biên độ).
4. **Con lắc đơn**: T = 2π·√(L/g) (độc lập khối lượng, góc nhỏ).
5. **Sóng cơ**: dao động lan truyền. v = λ·f.
6. **Ngang vs dọc**: theo hướng dao động so với hướng truyền.

🎉 **Hoàn thành Tier 1 Mechanics!** (8/8) Tiếp theo: **Tier 2 — Thermo & Electromagnetism**.
`;
