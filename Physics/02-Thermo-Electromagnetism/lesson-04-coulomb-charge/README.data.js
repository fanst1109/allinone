// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: Physics/02-Thermo-Electromagnetism/lesson-04-coulomb-charge/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 04 (T2) — Điện tích & Định luật Coulomb

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Hiểu **điện tích** là gì — thuộc tính cơ bản của vật chất, có 2 loại (+ và −).
- Biết **định luật Coulomb F = k·q₁·q₂/r²** — và so sánh với định luật vạn vật hấp dẫn.
- Hiểu **đơn vị điện tích cơ bản e** = 1.6 × 10⁻¹⁹ C — mọi điện tích là bội số của e.
- Áp dụng **nguyên lý chồng chất** cho hệ nhiều điện tích.
- Phân biệt **vật dẫn điện** và **vật cách điện** ở mức vi mô.

## Kiến thức tiền đề

- [Lesson 03 — Các loại lực](../../01-Mechanics/lesson-03-forces/) — biết F vector và lực hấp dẫn.

---

## 1. Điện tích là gì?

### 1.1. Định nghĩa

**Điện tích (electric charge, q)** = một thuộc tính cơ bản của vật chất, khiến vật có thể **tương tác với các vật mang điện khác** qua lực điện.

💡 **Hình dung**: điện tích là 1 trong những **thuộc tính bẩm sinh** của vật chất, tương tự khối lượng. Hai vật có khối lượng → có lực hấp dẫn. Hai vật có điện tích → có lực điện.

**Vì sao cần khái niệm này?** Vì rất nhiều hiện tượng không thể giải thích bằng cơ học thuần (Newton, hấp dẫn):
- Cọ thanh thủy tinh vào lụa → thanh hút giấy.
- Sấm sét.
- Pin sạc điện.
- Mọi thiết bị điện tử.

Tất cả đều cần khái niệm "điện tích" để giải thích.

### 1.2. 2 loại điện tích

Có **2 loại** điện tích, quy ước:
- **Dương (+)**: như proton.
- **Âm (−)**: như electron.

Quy luật cơ bản:
- **Cùng dấu → đẩy nhau**.
- **Trái dấu → hút nhau**.

(So sánh: khối lượng chỉ có "dương" → luôn hút nhau. Điện tích có 2 dấu → có hút và đẩy, tạo nên cấu trúc nguyên tử, phân tử.)

### 1.3. Đơn vị Coulomb (C) và điện tích cơ bản

Đơn vị: **Coulomb (C)** trong hệ SI. 

**Điện tích cơ bản e = 1.602 × 10⁻¹⁹ C** — đây là điện tích nhỏ nhất có thể tồn tại tự do (proton +e, electron −e).

💡 **Quan sát quan trọng**: mọi điện tích đo được trong tự nhiên đều là **bội số nguyên** của e. Không thể có 1.5 e — đó là **quantization** của điện tích.

(Quark có điện tích phân số ±1/3 hoặc ±2/3 e, nhưng quark **không tồn tại tự do** — luôn kẹt trong proton/neutron.)

### 1.4. Bốn ví dụ con số

| Đối tượng | Điện tích | Ghi chú |
|-----------|------------|---------|
| 1 electron | −1.602 × 10⁻¹⁹ C = −e | Đơn vị cơ bản |
| 1 proton | +1.602 × 10⁻¹⁹ C = +e | |
| 1 Coulomb | 6.24 × 10¹⁸ electron | Rất lớn — không phổ biến |
| Sét tia | ~ 5-20 C | Năng lượng khổng lồ |
| Bóng đèn LED 1 mA | 0.001 C/s = 10⁻³ A | Dòng điện = điện tích/thời gian |

### 1.5. Bảo toàn điện tích

**Định luật bảo toàn điện tích**: tổng điện tích của một hệ kín **không đổi**. Điện tích không tự tạo, không tự mất — chỉ chuyển từ vật này sang vật khác.

Ví dụ: cọ thanh nhựa vào tóc → một số electron chuyển từ tóc sang nhựa. Nhựa thừa e → âm. Tóc thiếu e → dương. **Tổng** điện tích (tóc + nhựa) vẫn = 0.

### ❓ Câu hỏi tự nhiên của người đọc

- *"Cọ xát có 'tạo ra' điện tích không?"* Không. Điện tích được **chuyển** (electron đi từ vật này sang vật kia), không sinh ra mới. Tổng vẫn bảo toàn.
- *"Vì sao điện tích lại lượng tử hóa (bội nguyên của e)?"* Vì hạt mang điện tự do nhỏ nhất là electron/proton, mỗi cái mang đúng ±e. Mọi vật tích điện là do thừa/thiếu một số nguyên electron.
- *"Điện tích có giống khối lượng không?"* Giống ở chỗ đều là thuộc tính bẩm sinh của vật chất. Khác: khối lượng chỉ "dương" (luôn hút), điện tích có 2 dấu (hút và đẩy).

⚠ **Lỗi thường gặp**

- **Nhầm điện tích với dòng điện**. Điện tích q (đơn vị Coulomb, C) là "lượng điện"; dòng điện I (Ampere, A = C/s) là "điện tích chảy mỗi giây". Phản ví dụ: "bóng đèn dùng 2 C" sai nghĩa nếu ý là dòng — phải nói "2 A" (2 C mỗi giây).
- **Tưởng có thể có điện tích 1.5e**. Không — điện tích tự do luôn là bội nguyên của e (quark phân số không tồn tại tự do).

🔁 **Dừng lại tự kiểm tra**

1. Một vật mang điện tích −3.2 × 10⁻¹⁹ C. Nó thừa hay thiếu bao nhiêu electron?
2. Cọ bóng bay vào tóc, bóng nhận thêm electron. Tóc mang điện gì?

<details><summary>Đáp án</summary>

1. q = −3.2×10⁻¹⁹ / (−1.6×10⁻¹⁹) = thừa **2 electron** (dấu âm → thừa electron).
2. Tóc **mất** electron → mang điện **dương** (+). Tổng (bóng + tóc) vẫn trung hòa.

</details>

### 📝 Tóm tắt mục 1

- Điện tích = thuộc tính cơ bản, đơn vị Coulomb.
- 2 loại + và −. Cùng dấu đẩy, trái dấu hút.
- Bội nguyên của e = 1.6 × 10⁻¹⁹ C (quantization).
- Bảo toàn điện tích.

---

## 2. Định luật Coulomb

### 2.1. Phát biểu

**Lực giữa 2 điện tích điểm** q₁, q₂ cách nhau khoảng r:

\`\`\`
F = k · |q₁| · |q₂| / r²
\`\`\`

trong đó **k** = hằng số Coulomb = **8.99 × 10⁹ N·m²/C²** ≈ 9 × 10⁹.

Hướng: theo đường nối 2 điện tích. Đẩy nếu cùng dấu, hút nếu trái dấu.

💡 **Ý nghĩa**: lực điện rất giống lực hấp dẫn về dạng (∝ 1/r²) nhưng khác về độ lớn và dấu.

### 2.2. So sánh với hấp dẫn

| | Lực hấp dẫn | Lực Coulomb |
|---|------------|---------------|
| Công thức | G·m₁·m₂/r² | k·q₁·q₂/r² |
| Hằng số | G = 6.67 × 10⁻¹¹ | k = 8.99 × 10⁹ |
| Dấu | Luôn hút | Hút hoặc đẩy |
| Tỉ lệ lực giữa 2 e (cách 1 m) | F_G ≈ 5 × 10⁻⁷¹ N | F_E ≈ 2.3 × 10⁻²⁸ N |

→ **Lực điện giữa 2 electron mạnh hơn lực hấp dẫn 10⁴²-10⁴³ lần!** Đó là tại sao trong nguyên tử, lực điện chi phối hoàn toàn — lực hấp dẫn không đáng kể.

### 2.3. Bốn ví dụ số

**Ví dụ 1 — Lực giữa 1 proton và 1 electron trong nguyên tử H** (cách r = 5.3 × 10⁻¹¹ m):
- F = 9e9 × (1.6e-19)² / (5.3e-11)² = 9e9 × 2.56e-38 / 2.81e-21 ≈ **8.2 × 10⁻⁸ N**. (Lực giữ electron quay quanh.)

**Ví dụ 2 — Hai quả cầu mang điện**: Mỗi quả 1 μC = 10⁻⁶ C, cách 10 cm.
- F = 9e9 × (1e-6)² / 0.01 = 9e9 × 1e-12 / 0.01 = **0.9 N**.

**Ví dụ 3 — Lực giữa 2 người** giả sử mỗi người mang +1% điện thừa của số electron trong cơ thể: cực kỳ lớn.
- Nhưng trong thực tế, cơ thể luôn xấp xỉ trung hòa — sai số rất nhỏ. Đó là tại sao ta không bay đi vì lực điện.

**Ví dụ 4 — Sét**: Mây có khoảng 5-20 C tích lũy ở đáy. Khi phóng xuống đất qua không khí (r ~ 1 km), điện trường mạnh đến mức ion hóa không khí → tia chớp.

### ❓ Câu hỏi tự nhiên của người đọc

- *"Khoảng cách gấp đôi thì lực giảm bao nhiêu?"* Giảm **4 lần** (vì F ∝ 1/r²). Gấp 3 lần khoảng cách → lực giảm 9 lần. Đây là điểm khác với F ∝ 1/r.
- *"Vì sao lực điện mạnh hơn hấp dẫn nhiều vậy nhưng đời thường ta không 'dính' nhau vì lực điện?"* Vì vật thường **trung hòa** (số + ≈ số −) → lực điện gần như triệt tiêu. Chỉ khi mất cân bằng nhỏ (cọ xát) mới thấy hiệu ứng.
- *"r trong công thức đo từ đâu tới đâu?"* Từ **tâm điện tích này tới tâm điện tích kia** (với điện tích điểm). Không phải khoảng cách bề mặt.

⚠ **Lỗi thường gặp**

- **Quên bình phương r**. Phản ví dụ: 2 điện tích 1 μC cách 0.1 m → F = 9e9·(1e-6)²/(0.1)² = 9e9·1e-12/0.01 = **0.9 N**. Nếu quên bình phương (chia 0.1): được 0.09 N — sai 10 lần.
- **Dùng đơn vị μC trực tiếp mà không đổi sang C**: 5 μC = 5×10⁻⁶ C, không phải 5.

🔁 **Dừng lại tự kiểm tra**

1. 2 điện tích cách nhau 2 cm có lực 8 N. Nếu kéo ra 4 cm (gấp đôi), lực còn bao nhiêu?
2. Tính lực giữa 2 điện tích +2 μC và +2 μC cách 10 cm.

<details><summary>Đáp án</summary>

1. r gấp đôi → F giảm 4 lần → còn **2 N** (F ∝ 1/r²).
2. F = 9e9·(2e-6)²/(0.1)² = 9e9·4e-12/0.01 = 0.036/0.01 = **3.6 N** (đẩy nhau, cùng dấu).

</details>

### 📝 Tóm tắt mục 2

- F = k·|q₁q₂|/r², k = 9 × 10⁹ N·m²/C².
- Tương tự dạng hấp dẫn nhưng mạnh hơn ~ 10⁴² lần.

---

## 3. Nguyên lý chồng chất

### 3.1. Phát biểu

Khi có nhiều điện tích, lực tổng tác dụng lên 1 điện tích = **tổng vector** các lực từ từng cái:

\`\`\`
F_tổng = F₁ + F₂ + F₃ + ...
\`\`\`

💡 **Ý nghĩa**: mỗi cặp điện tích tương tác **độc lập** với nhau, không bị "đè" bởi sự có mặt của điện tích khác. Đó là nguyên lý đơn giản nhưng mạnh — giúp giải mọi bài toán nhiều điện tích.

### 3.2. Ví dụ — 3 điện tích thẳng hàng

3 điện tích +1 μC ở vị trí x = 0, 1 m, 2 m. Tính lực tổng lên điện tích ở giữa.

- Lực từ trái (q ở x=0) lên giữa: đẩy về bên phải, F₁ = k·1e-6·1e-6/1 = 9 × 10⁻³ N (+).
- Lực từ phải (q ở x=2) lên giữa: đẩy về bên trái, F₂ = 9 × 10⁻³ N (−).
- F_tổng = F₁ + F₂ = **0** (cân bằng).

(Hệ đối xứng → điện tích giữa cân bằng. Nếu lệch nhẹ → đẩy ra xa, không tự lấy lại trạng thái cũ.)

### ❓ Câu hỏi tự nhiên của người đọc

- *"Tổng vector nghĩa là gì — sao không cộng số thông thường?"* Vì lực là **vector** (có hướng). 2 lực cùng độ lớn ngược chiều → triệt tiêu (tổng = 0), cùng chiều → cộng dồn, vuông góc → dùng định lý Pythagore. Phải tính theo từng thành phần x, y.
- *"Sự có mặt của điện tích thứ 3 có làm yếu lực giữa 2 cái kia không?"* Không. Mỗi cặp tương tác **độc lập** — đó chính là nội dung nguyên lý chồng chất. Điện tích C không "chắn" lực giữa A và B.
- *"Khi nào lực tổng bằng 0?"* Khi các lực thành phần cân bằng (đối xứng), như điện tích giữa trong ví dụ 3 điện tích thẳng hàng.

⚠ **Lỗi thường gặp**

- **Cộng độ lớn các lực như số vô hướng**. Phản ví dụ: 2 lực 3 N vuông góc → tổng KHÔNG phải 6 N mà là √(3²+3²) = √18 ≈ **4.24 N**. Phải cộng vector.
- **Quên hướng (dấu) khi cộng trên cùng một trục**: lực đẩy về phải (+) và lực đẩy về trái (−) phải trừ nhau.

🔁 **Dừng lại tự kiểm tra**

1. Một điện tích chịu 2 lực: 4 N hướng phải và 3 N hướng lên (vuông góc). Lực tổng độ lớn bao nhiêu?
2. 2 điện tích +q đặt 2 bên cách đều một điện tích thử. Lực tổng lên điện tích thử bằng bao nhiêu?

<details><summary>Đáp án</summary>

1. F = √(4² + 3²) = √25 = **5 N** (Pythagore cho 2 lực vuông góc).
2. **0** — 2 lực đẩy ngược chiều, cùng độ lớn (đối xứng) → triệt tiêu.

</details>

### 📝 Tóm tắt mục 3

- Lực tổng = tổng vector các lực riêng.
- Áp dụng được cho mọi cấu hình điện tích.

---

## 4. Vật dẫn điện vs Vật cách điện

💡 **Trực giác**: tưởng tượng electron như những người trong tòa nhà. **Vật dẫn** = hành lang thông suốt, người (electron) đi lại tự do khắp nơi → điện tích lan nhanh. **Vật cách điện** = mỗi người bị khóa trong phòng riêng, không di chuyển được → điện tích đứng yên tại chỗ đặt vào.

### 4.1. Vật dẫn điện (Conductor)

- Có **electron tự do** di chuyển trong toàn vật.
- Vd: kim loại (Cu, Al, Au, Ag).
- Khi đặt điện tích lên → e tự do **phân bố đều** khắp bề mặt.

### 4.2. Vật cách điện (Insulator)

- Electron bị **giữ chặt** quanh nguyên tử.
- Vd: gỗ khô, nhựa, thủy tinh, cao su.
- Điện tích đặt lên → ở **tại chỗ**, không lan.

### 4.3. Chất bán dẫn (Semiconductor)

- Trung gian. Vd: silicon, germanium.
- Có thể "bật-tắt" dẫn điện tùy điều kiện. Cơ sở của mọi chip điện tử.

### ❓ Câu hỏi tự nhiên của người đọc

- *"Vì sao điện tích đặt lên vật dẫn lại dồn ra bề mặt?"* Vì electron tự do đẩy nhau, chúng tản ra càng xa nhau càng tốt → tập trung ở bề mặt ngoài. Bên trong vật dẫn (cân bằng) điện trường = 0.
- *"Nước có dẫn điện không?"* Nước tinh khiết dẫn rất kém, nhưng nước thường (có ion muối khoáng) dẫn được → đó là lý do nguy hiểm khi dùng điện gần nước.
- *"Vì sao bán dẫn quan trọng?"* Vì có thể điều khiển nó dẫn/không dẫn (bằng điện áp, ánh sáng, pha tạp) → làm transistor, nền tảng mọi máy tính.

⚠ **Lỗi thường gặp**

- **Tưởng dây điện nguy hiểm vì electron "chảy nhanh"**. Thực ra electron trôi rất chậm (~mm/s); nguy hiểm vì **năng lượng** truyền nhanh (gần tốc độ ánh sáng dọc dây) và dòng lớn gây nhiệt.
- **Nhầm "cách điện" là "không có điện tích"**: vật cách điện vẫn tích điện được, chỉ là điện tích **không lan** mà ở nguyên chỗ.

🔁 **Dừng lại tự kiểm tra**

1. Đặt điện tích lên một quả cầu kim loại rỗng — điện tích phân bố ở đâu?
2. Gỗ khô và gỗ ướt, cái nào dẫn điện tốt hơn?

<details><summary>Đáp án</summary>

1. Phân bố đều trên **bề mặt ngoài** (electron tự do đẩy nhau ra xa nhất); bên trong không có điện tích dư, điện trường bên trong = 0.
2. Gỗ ướt — nước có ion làm tăng khả năng dẫn. Gỗ khô là chất cách điện khá tốt.

</details>

### 📝 Tóm tắt mục 4

- Dẫn: e tự do → phân bố nhanh. Vd kim loại.
- Cách: e bị giữ → điện ở tại chỗ. Vd nhựa.
- Bán dẫn: trung gian, nền tảng điện tử.

---

## 5. Bài tập + Lời giải chi tiết

### Bài tập

**Bài 1**: Tính lực giữa 2 điện tích +5 μC và −3 μC cách nhau 20 cm.

**Bài 2**: Một quả cầu mang điện được cọ vào tóc → mang điện tích +6.4 × 10⁻¹⁸ C. Đây tương đương bao nhiêu electron đã được lấy đi?

**Bài 3**: 2 điện tích +q và −q cách nhau d. Khoảng cách phải tăng bao nhiêu lần để lực giảm 4 lần?

**Bài 4**: Vì sao trong nguyên tử, lực giữa proton và electron là lực điện mà không phải hấp dẫn?

**Bài 5**: 3 điện tích +1 μC, +1 μC, −2 μC đặt ở 3 đỉnh tam giác đều cạnh 10 cm. Tính lực lên điện tích −2 μC.

**Bài 6**: Cọ thanh nhựa vào len → thanh mang điện −. Vì sao thanh đó hút được mẩu giấy nhỏ (không mang điện)?

### Lời giải

**Bài 1**: F = 9e9 × (5e-6)·(3e-6) / 0.04 = 9e9 × 15e-12/0.04 = **3.375 N**. Lực hút (trái dấu).

**Bài 2**: Số e đã lấy đi = 6.4e-18 / 1.6e-19 = **40 electron**.

**Bài 3**: F ∝ 1/r² → để F giảm 4 lần thì r² tăng 4 lần → r tăng **2 lần**.

**Bài 4**: So sánh lực điện và lực hấp dẫn giữa proton (m = 1.67×10⁻²⁷ kg, +e) và electron (m = 9.11×10⁻³¹, −e) cách r tùy ý:
- F_E / F_G = (k·e²) / (G·m_p·m_e).
- = (9e9 × (1.6e-19)²) / (6.67e-11 × 1.67e-27 × 9.11e-31).
- = 2.3e-28 / 1.01e-67 ≈ **2.3 × 10³⁹**.
→ Lực điện mạnh hơn hấp dẫn ~ 10³⁹ lần. Đó là tại sao trong nguyên tử có thể "bỏ qua" hấp dẫn.

**Bài 5**: 3 điện tích ở 3 đỉnh tam giác đều cạnh 0.1 m. 
- Lực từ +q₁ lên −q (hút): F₁ = 9e9 × 1e-6·2e-6/0.01 = 1.8 N (hướng vào +q₁).
- Lực từ +q₂ tương tự: F₂ = 1.8 N (hướng vào +q₂).
- 2 lực này hợp lực: gốc tại đỉnh (−q), hợp góc 60°. Hợp lực = 2·F·cos(30°) = 2·1.8·(√3/2) = **3.12 N**, hướng vào trung điểm cạnh (+q₁)(+q₂).

**Bài 6**: Thanh nhựa (−) đến gần giấy → các electron trong giấy bị đẩy ra xa thanh → bên gần thanh: ít electron → tích điện dương cục bộ. Bên xa: nhiều electron → âm cục bộ. Đây là **cảm ứng điện** (polarization). Lực hút giữa thanh (−) và phần (+) của giấy MẠNH HƠN lực đẩy với phần (−) (vì r gần hơn) → tổng → hút. Giấy "không có điện" nhưng vẫn bị hút.

---

## 6. Liên kết và bài tiếp theo

- **Bài tiếp theo**: [Lesson 05 — Điện trường & Điện thế](../lesson-05-electric-field-potential/).

---

## 📝 Tổng kết Lesson 04 (T2)

1. **Điện tích**: thuộc tính cơ bản, 2 loại + và −, đơn vị Coulomb.
2. **Điện tích cơ bản** e = 1.6 × 10⁻¹⁹ C. Mọi điện tích là bội nguyên của e.
3. **Định luật Coulomb**: F = k·q₁q₂/r², k = 9 × 10⁹ N·m²/C². Mạnh hơn hấp dẫn ~ 10³⁹ lần.
4. **Nguyên lý chồng chất**: lực tổng = tổng vector từng cặp.
5. **Dẫn / cách / bán dẫn**: tùy electron có tự do hay không.

**Tiếp theo**: [Lesson 05 — Điện trường &amp; Điện thế](../lesson-05-electric-field-potential/)
`;
