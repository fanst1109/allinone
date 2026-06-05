// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: Physics/02-Thermo-Electromagnetism/lesson-07-magnetism-induction/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 07 (T2) — Từ trường & Cảm ứng

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Hiểu **từ trường B** là gì — và nguồn gốc từ "dòng điện di chuyển".
- Tính **lực Lorentz** F = q·v × B trên điện tích chuyển động.
- Hiểu **cảm ứng điện từ Faraday**: từ trường biến đổi sinh ra điện trường (và ngược lại).
- Phân biệt **2 loại nam châm**: nam châm vĩnh cửu vs nam châm điện.
- Biết nguyên lý hoạt động của máy phát điện và động cơ điện.

## Kiến thức tiền đề

- [Lesson 06 — Dòng điện & mạch](../lesson-06-current-circuits/).

---

## 1. Từ trường B

### 1.1. Định nghĩa

**Từ trường B** = trường tác dụng lực lên **điện tích đang chuyển động** (và lên dòng điện, vốn là điện tích di chuyển).

Đơn vị: **Tesla (T) = N·s/(C·m) = N/(A·m)**. Một đơn vị nhỏ hơn: **Gauss (G) = 10⁻⁴ T**.

💡 **Ý nghĩa**: từ trường mô tả "vùng không gian mà nếu có điện tích di chuyển/dòng điện qua, sẽ chịu lực". Khác điện trường (tác dụng lên cả điện tích đứng yên), từ trường **chỉ tác dụng khi điện tích di chuyển**.

**Vì sao tồn tại?** Theo lý thuyết tương đối, từ trường thực ra là "điện trường nhìn từ hệ quy chiếu khác" — khi bạn di chuyển so với điện tích, bạn "thấy" thêm từ trường. Nhưng trong khung làm việc thông thường, ta coi B là đại lượng riêng.

### 1.2. Lực Lorentz

**Lực lên điện tích q di chuyển với vận tốc v trong từ trường B**:

\`\`\`
F = q · v × B   (tích vector!)
\`\`\`

Độ lớn: F = |q|·v·B·sin(θ), với θ = góc giữa v và B.

Hướng: theo **quy tắc bàn tay phải** (cho điện tích dương, bàn tay trái cho điện tích âm).

💡 **Ý nghĩa**: lực Lorentz **vuông góc** với cả v và B. Đó là tại sao trong từ trường đều, điện tích chuyển động vòng tròn — lực Lorentz đóng vai trò lực hướng tâm.

### 1.3. Ví dụ con số

| Tình huống | B |
|------------|---|
| Từ trường Trái Đất (mặt biển) | ~ 5 × 10⁻⁵ T = 0.5 Gauss |
| Nam châm tủ lạnh | ~ 0.01 T = 100 Gauss |
| Nam châm neodymium mạnh | ~ 1 T |
| Máy MRI bệnh viện | 1.5 - 7 T |
| Nam châm phòng thí nghiệm vật lý hạt | 10 - 50 T |
| Sao neutron (bề mặt) | 10⁸ - 10¹¹ T (cực lớn) |

### ❓ Câu hỏi tự nhiên của người đọc

- *"Vì sao từ trường chỉ tác dụng lên điện tích ĐANG chuyển động?"* Vì lực Lorentz F = qv×B chứa vận tốc v. Nếu v = 0 → F = 0. Đây là điểm khác cơ bản với điện trường (tác dụng cả lên điện tích đứng yên).
- *"Lực Lorentz hướng nào?"* Vuông góc với cả v và B (vì là tích vector). Đó là lý do điện tích trong từ trường đều đi vòng tròn — lực luôn vuông góc vận tốc, làm vai trò lực hướng tâm, không tăng tốc độ.
- *"Lực Lorentz có sinh công không?"* Không (vì vuông góc v) → không thay đổi tốc độ, chỉ đổi hướng. Năng lượng động của hạt giữ nguyên.

⚠ **Lỗi thường gặp**

- **Quên sin(θ): F = qvB·sin(θ)**. Khi v song song B (θ = 0) → F = 0 (không có lực). Phản ví dụ: electron bay **dọc** đường sức từ → không bị lệch; chỉ khi bay vuông góc (θ = 90°) lực mới cực đại.
- **Nhầm bàn tay phải/trái**: quy tắc bàn tay phải cho điện tích **dương**; với electron (âm) lực ngược lại.

🔁 **Dừng lại tự kiểm tra**

1. Một proton bay song song với đường sức từ. Lực Lorentz lên nó bằng bao nhiêu?
2. Electron bay v = 2×10⁶ m/s vuông góc B = 0.5 T. Tính lực (e = 1.6×10⁻¹⁹ C).

<details><summary>Đáp án</summary>

1. **0** — v song song B → θ = 0 → sin(0) = 0 → F = 0.
2. F = qvB·sin(90°) = 1.6e-19·2e6·0.5·1 = **1.6 × 10⁻¹³ N**.

</details>

### 📝 Tóm tắt mục 1

- B = từ trường, đơn vị Tesla.
- Lực Lorentz F = q·v × B, vuông góc cả v và B.
- Trái Đất có B ≈ 5 × 10⁻⁵ T (lý do la bàn hoạt động).

---

## 2. Nguồn của từ trường

### 2.1. Hai loại nguồn

**Mọi từ trường đều sinh từ điện tích chuyển động**. Hai dạng phổ biến:

1. **Dòng điện** trong dây dẫn — sinh từ trường xung quanh (định luật Ampère).
2. **Spin/quỹ đạo electron** trong nguyên tử — sinh "từ tính bẩm sinh" của vật liệu sắt, neodymium...

→ Cả nam châm điện và nam châm vĩnh cửu đều là **điện tích di chuyển** ở quy mô vi mô.

### 2.2. Dây dẫn thẳng

Từ trường ở khoảng cách r từ dây dẫn dài có dòng I:
\`\`\`
B = μ₀ · I / (2π · r)
\`\`\`

trong đó **μ₀** = hằng số từ = **4π × 10⁻⁷ T·m/A**.

Hướng: theo quy tắc nắm tay phải (ngón cái theo chiều I, các ngón còn lại theo chiều B vòng quanh dây).

### 2.3. Vòng dây (cuộn solenoid)

Bên trong cuộn solenoid dài có n vòng/m và dòng I:
\`\`\`
B = μ₀ · n · I
\`\`\`

→ B đều và mạnh — nguyên lý nam châm điện công nghiệp.

💡 **Trực giác**: mọi từ trường, từ nam châm tủ lạnh đến từ trường Trái Đất, đều có chung một nguồn gốc — **điện tích chuyển động**. Trong dây dẫn đó là dòng electron; trong nam châm vĩnh cửu đó là spin và quỹ đạo electron của các nguyên tử sắt xếp cùng hướng. Không có "từ tích" đứng yên như điện tích.

### ❓ Câu hỏi tự nhiên của người đọc

- *"Có 'hạt từ' (monopole) như hạt điện tích không?"* Chưa tìm thấy. Cắt đôi nam châm → được 2 nam châm nhỏ, mỗi cái lại có đủ 2 cực N-S. Đây là nội dung ∇·B = 0 (Lesson 08).
- *"Vì sao quấn nhiều vòng (solenoid) thì từ trường mạnh hơn?"* Vì từ trường mỗi vòng cộng dồn: B = μ₀·n·I, với n = số vòng/mét. Nhiều vòng + dòng lớn → B lớn → nam châm điện mạnh.
- *"Nam châm vĩnh cửu khác nam châm điện ra sao?"* Vĩnh cửu: từ spin electron tự xếp hàng (không cần điện), nhưng không tắt được. Điện: từ dòng điện, bật/tắt được bằng dòng — dùng trong cần cẩu nâng sắt, loa, động cơ.

⚠ **Lỗi thường gặp**

- **Quên 2π trong công thức dây thẳng**: B = μ₀I/(2π·r), không phải μ₀I/r. Phản ví dụ: I = 10 A, r = 0.1 m → B = 4π×10⁻⁷·10/(2π·0.1) = **2×10⁻⁵ T**, không phải 4π×10⁻⁷·10/0.1.
- **Lẫn công thức dây thẳng (có r) với solenoid (không có r)**: solenoid B = μ₀nI đều trong lòng, không phụ thuộc khoảng cách tới thành.

🔁 **Dừng lại tự kiểm tra**

1. Cắt đôi một thanh nam châm — mỗi nửa có mấy cực?
2. Solenoid 500 vòng/m, dòng 4 A. Tính B trong lòng (μ₀ = 4π×10⁻⁷).

<details><summary>Đáp án</summary>

1. Mỗi nửa có **đủ 2 cực N và S** — không tách được cực đơn (không có monopole).
2. B = μ₀nI = 4π×10⁻⁷·500·4 = 4π×10⁻⁷·2000 ≈ **2.51 × 10⁻³ T**.

</details>

### 📝 Tóm tắt mục 2

- Nguồn từ trường = điện tích di chuyển.
- Dây thẳng: B = μ₀I/(2πr).
- Solenoid: B = μ₀nI (đều bên trong).

---

## 3. Cảm ứng điện từ (Faraday)

### 3.1. Định luật Faraday

**Hiệu điện thế cảm ứng ε** sinh ra khi **từ thông Φ qua mạch thay đổi**:

\`\`\`
ε = −dΦ / dt
\`\`\`

trong đó **Φ = B·A·cos(θ)** = từ thông (Wb, Weber).

💡 **Ý nghĩa**: nếu từ trường qua 1 cuộn dây **đang thay đổi** (do nam châm di chuyển, B tăng/giảm, hoặc cuộn xoay), sẽ sinh ra hiệu điện thế trong cuộn → dòng điện chạy.

**Dấu trừ** = **định luật Lenz**: dòng cảm ứng có chiều **chống lại** sự thay đổi từ thông (giống "quán tính từ"). Đây là biểu hiện của bảo toàn năng lượng.

### 3.2. Ý nghĩa lịch sử

Faraday (1831) phát hiện: **từ trường biến đổi sinh ra điện**. Đây là phát hiện vĩ đại — mở đường cho:
- **Máy phát điện**: xoay cuộn dây trong từ trường → tạo dòng AC.
- **Máy biến áp**: dòng AC trong cuộn 1 → tạo từ trường biến đổi → cảm ứng dòng vào cuộn 2.
- **Mọi nhà máy điện** ngày nay (trừ pin và panel mặt trời) đều dựa vào nguyên lý này.

### 3.2b. Từ thông Φ — định nghĩa đủ 3 phần

**(a) Là gì**: **Từ thông Φ** = "lượng đường sức từ xuyên qua một diện tích". Công thức Φ = B·A·cos(θ), với A = diện tích, θ = góc giữa B và pháp tuyến mặt. Đơn vị **Weber (Wb) = T·m²**.

**(b) Vì sao cần**: Faraday phát hiện dòng cảm ứng sinh ra không phải do từ trường lớn hay nhỏ, mà do từ thông **thay đổi**. Φ gói gọn cả độ mạnh B, diện tích A và góc θ vào một số → tính ε = −dΦ/dt gọn. Không có Φ thì không phát biểu được định luật Faraday.

**(c) Ví dụ số kèm đơn vị**: cuộn dây diện tích A = 0.02 m² đặt vuông góc (θ = 0) trong B = 0.5 T → Φ = B·A·cos(0) = 0.5·0.02·1 = **0.01 Wb**. Nếu xoay cuộn 90° (θ = 90°) → Φ = 0.5·0.02·cos(90°) = **0 Wb**. Biến thiên ΔΦ = 0.01 Wb trong Δt = 0.1 s → ε = −ΔΦ/Δt = −0.01/0.1 = **−0.1 V** (độ lớn 0.1 V).

### 3.3. Ví dụ — Máy phát điện đơn giản

Cuộn dây N vòng, diện tích A, quay với vận tốc góc ω trong từ trường B đều:
- Φ(t) = B·A·cos(ωt).
- ε = −dΦ/dt = B·A·ω·sin(ωt) — sóng sin (dòng AC).
- ε_max = B·A·ω·N.

### ❓ Câu hỏi tự nhiên của người đọc

- *"Vì sao chỉ từ thông THAY ĐỔI mới sinh điện, từ thông lớn mà đứng yên thì không?"* Vì ε = −dΦ/dt phụ thuộc **tốc độ thay đổi** của Φ, không phụ thuộc giá trị Φ. Nam châm để yên cạnh cuộn dây → Φ không đổi → ε = 0. Phải di chuyển nam châm (Φ thay đổi) mới có dòng.
- *"Dấu trừ trong ε = −dΦ/dt nghĩa là gì?"* Định luật Lenz: dòng cảm ứng có chiều **chống lại** sự thay đổi từ thông. Đẩy nam châm vào cuộn → dòng sinh ra tạo từ trường đẩy lại nam châm. Đây là biểu hiện bảo toàn năng lượng — nếu không "chống lại", ta sẽ tạo năng lượng từ hư không.
- *"Vì sao cuộn nhiều vòng N thì ε lớn hơn?"* Vì mỗi vòng góp một ε, tổng ε = N·(−dΦ/dt). Quấn nhiều vòng → điện áp ra lớn.

⚠ **Lỗi thường gặp**

- **Quên dấu Lenz** dẫn tới kết luận sai về chiều dòng cảm ứng. Phản ví dụ: đẩy cực N của nam châm lại gần cuộn → dòng cảm ứng tạo cực N ở mặt cuộn hướng về nam châm (để **đẩy ra**, chống lại), không phải hút vào.
- **Tưởng nam châm đứng yên (Φ lớn) sinh dòng**. Sai — chỉ khi Φ **biến thiên**. Đó là lý do máy biến áp chỉ chạy với AC (Φ liên tục đổi), không chạy với DC ổn định.

🔁 **Dừng lại tự kiểm tra**

1. Một nam châm để yên bên trong cuộn dây. Có dòng cảm ứng không?
2. Cuộn 200 vòng, A = 0.01 m², B = 0.2 T, quay với ω = 50 rad/s. Tính ε_max.

<details><summary>Đáp án</summary>

1. **Không** — Φ không đổi (dΦ/dt = 0) → ε = 0. Phải có chuyển động/biến thiên mới sinh dòng.
2. ε_max = B·A·ω·N = 0.2·0.01·50·200 = **20 V**.

</details>

### 📝 Tóm tắt mục 3

- ε = −dΦ/dt (Faraday).
- Φ thay đổi → ε sinh → dòng cảm ứng.
- Cơ sở của mọi máy phát điện.

---

## 4. Bài tập

### Bài tập

**Bài 1**: 1 electron bay với v = 10⁶ m/s vuông góc với từ trường B = 0.01 T. Tính lực.

**Bài 2**: Tính B ở khoảng cách 10 cm từ dây dẫn có I = 5 A.

**Bài 3**: Solenoid 1000 vòng/m, I = 2 A. Tính B trong lòng.

**Bài 4**: Cuộn dây 100 vòng, A = 0.01 m², trong B = 0.5 T. Quay với ω = 100 rad/s. Tính ε_max.

**Bài 5**: Vì sao máy biến áp hoạt động được với dòng AC mà không với DC?

### Lời giải

**Bài 1**: F = q·v·B = 1.6e-19 · 10⁶ · 0.01 = **1.6 × 10⁻¹⁵ N**. Lực Lorentz → electron chạy vòng tròn.

**Bài 2**: B = μ₀·I/(2π·r) = 4π·10⁻⁷·5/(2π·0.1) = **10⁻⁵ T** = 0.1 Gauss. (Khoảng 5 lần từ trường Trái Đất.)

**Bài 3**: B = μ₀·n·I = 4π·10⁻⁷·1000·2 = **2.51 × 10⁻³ T** ≈ 25 Gauss.

**Bài 4**: ε_max = B·A·ω·N = 0.5·0.01·100·100 = **50 V**.

**Bài 5**: Máy biến áp dùng nguyên lý cảm ứng Faraday: dòng vào cuộn 1 sinh từ trường → từ trường biến đổi sinh ε ở cuộn 2. **DC (dòng 1 chiều)** = dòng ổn định → từ trường ổn định → KHÔNG thay đổi → không có cảm ứng → cuộn 2 không sinh ε. **AC (dòng xoay chiều)** = liên tục thay đổi → từ trường liên tục thay đổi → có cảm ứng → cuộn 2 có dòng. Đó là lý do điện gia đình dùng AC (220 V, 50 Hz) — dễ biến đổi điện thế qua máy biến áp.

---

## 5. Bài tiếp theo

[Lesson 08 — Sóng điện từ](../lesson-08-em-waves/).

## 📝 Tổng kết

1. **B (Tesla)** = từ trường, tác dụng lực lên điện tích di chuyển.
2. **F = q·v × B** (Lorentz), vuông góc cả v và B.
3. **Nguồn từ trường**: dòng điện (dây thẳng B = μ₀I/2πr, solenoid B = μ₀nI).
4. **Faraday**: ε = −dΦ/dt — từ trường biến đổi sinh điện.
5. **Lenz**: dòng cảm ứng chống lại sự thay đổi từ thông (bảo toàn năng lượng).
`;
