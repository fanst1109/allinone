// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: Electronics/02-Semiconductors/lesson-01-semiconductor-pn/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 01 — Chất bán dẫn & Mối nối P-N

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Hiểu tại sao silicon (Si) là vật liệu "ở giữa" — không dẫn điện tốt như kim loại, không cách điện như nhựa.
- Biết doping tạo ra bán dẫn loại N (thừa electron) và loại P (thừa lỗ trống/hole).
- Giải thích cơ chế hình thành vùng nghèo (depletion region) khi ghép P và N.
- Biết tại sao mối nối P-N chỉ cho dòng chạy một chiều — đây là nền tảng của diode, transistor, và toàn bộ điện tử bán dẫn.
- Tính toán dòng đơn giản qua mối nối khi biết điện áp và rào thế.

## Kiến thức tiền đề

- [Electronics — Tier 1, Lesson 01: Điện áp, Dòng điện, Điện trở](../../01-Fundamentals/lesson-01-voltage-current-resistance/) — khái niệm V, I, R.
- Hóa học cấu trúc nguyên tử và liên kết cộng hóa trị (xem [Chemistry/01-Structure](../../../Chemistry/01-Structure/) nếu đã có).

---

## 1. Dẫn điện, cách điện và bán dẫn

### 1.1. Vì sao vật liệu khác nhau dẫn điện khác nhau?

💡 **Hình dung trước khi học lý thuyết**: Hãy tưởng tượng electron hóa trị (electron lớp ngoài cùng) là những con chim đậu trên dây điện. Kim loại (đồng, bạc) có "dây điện" rất gần đất — chim bay đi dễ dàng, không cần nhiều năng lượng. Đó là tại sao kim loại dẫn điện tốt: electron thoát ra và di chuyển tự do. Nhựa (PVC, rubber) có "dây điện" rất cao — chim bị "giam" chặt, không bay được. Đó là cách điện.

Silicon nằm ở giữa: "dây điện" đủ cao để chim khó bay, nhưng không đến mức hoàn toàn bất động. Nếu ta cung cấp một ít năng lượng (nhiệt độ, ánh sáng, hoặc trường điện mạnh), một số electron sẽ thoát ra và dẫn điện yếu.

### 1.2. Cấu trúc silicon và liên kết cộng hóa trị

Silicon (Si) có **4 electron hóa trị** — đúng bằng số lỗ trống cần để lấp đầy lớp ngoài (cần 8). Mỗi nguyên tử Si **chia sẻ** 4 electron với 4 nguyên tử Si hàng xóm, tạo thành mạng tinh thể hình kim cương:

\`\`\`
     Si — Si — Si
     |    |    |
     Si — Si — Si
     |    |    |
     Si — Si — Si
\`\`\`

Mỗi gạch "—" là một cặp electron dùng chung (liên kết cộng hóa trị). Kết quả: ở 0 K, mọi electron đều bị "khóa" trong liên kết — Si là chất cách điện tuyệt hảo ở nhiệt độ tuyệt đối. Ở nhiệt độ phòng (~300 K), một ít electron có đủ năng lượng nhiệt để **thoát ra**, để lại "lỗ trống" — Si trở thành **chất bán dẫn** với độ dẫn rất nhỏ.

**So sánh điện trở suất (resistivity) ở 300 K:**

| Vật liệu | Điện trở suất (Ω·m) | Phân loại |
|----------|---------------------|-----------|
| Bạc (Ag) | 1.6 × 10⁻⁸ | Kim loại dẫn điện |
| Đồng (Cu) | 1.7 × 10⁻⁸ | Kim loại dẫn điện |
| Silicon (Si) tinh khiết | 6.4 × 10² | Bán dẫn |
| Germanium (Ge) tinh khiết | 4.6 × 10⁻¹ | Bán dẫn |
| Thủy tinh | ~10¹² | Cách điện |
| Nhựa PVC | ~10¹⁵ | Cách điện |

Silicon tinh khiết dẫn điện kém hơn đồng đến **10 tỷ lần** — nhưng cách điện tốt hơn thủy tinh đến **1 tỷ lần**. Nó đứng đúng ở trung điểm của thang logarit.

❓ **Câu hỏi tự nhiên:**

- *"Tại sao dùng Si mà không dùng Ge? Ge có điện trở suất thấp hơn."* — Si có cấu trúc ôxít (SiO₂) ổn định dùng làm lớp cách điện tự nhiên trong chế tạo chip. Ge không có ưu điểm này. Ngoài ra, Si phong phú hơn nhiều trong vỏ Trái Đất (~28% theo khối lượng so với ~0.0014% của Ge).

- *"Bán dẫn tinh khiết dẫn điện quá yếu — có ích gì?"* — Bản thân nó ít hữu ích. Điểm mạnh là ta có thể **kiểm soát chính xác** độ dẫn điện bằng cách pha tạp (mục 2). Đây là điều kim loại không làm được.

📝 **Tóm tắt mục 1:**
- Kim loại: electron hóa trị tự do → dẫn điện tốt.
- Cách điện: electron bị khóa chặt → không dẫn điện.
- Bán dẫn (Si, Ge): electron bị khóa yếu hơn → dẫn điện rất ít ở nhiệt độ phòng, có thể kiểm soát.
- Si có 4 electron hóa trị, tạo 4 liên kết cộng hóa trị với 4 Si hàng xóm.

---

## 2. Pha tạp (Doping) — tạo bán dẫn loại N và P

### 2.1. Tại sao cần pha tạp?

Silicon tinh khiết dẫn điện rất kém và không thể kiểm soát chính xác. Pha tạp là kỹ thuật **thêm một lượng nhỏ nguyên tố khác** (1 nguyên tử tạp trong ~10⁷ nguyên tử Si) để tăng hạt tải điện lên hàng triệu lần — và quan trọng hơn, **xác định loại hạt tải** là electron âm hay lỗ trống dương.

💡 **Hình dung**: Một bàn bida có 4 lỗ ở 4 góc, tất cả bóng đều được "ghim" vào lỗ. Không bóng nào di chuyển. Đó là Si tinh khiết. Bây giờ ta thêm một nguyên tử P (phosphorus) có 5 electron hóa trị vào — nó chiếm chỗ một Si và dùng 4 electron tạo liên kết, nhưng còn **thừa 1 electron** không có chỗ gắn → electron đó tự do di chuyển. Ngược lại, thêm B (boron) có 3 electron hóa trị: nó chỉ tạo được 3 liên kết, để lại **1 lỗ trống** trong mạng. Lỗ trống này hoạt động như hạt mang điện dương.

### 2.2. Bán dẫn loại N (N-type)

Thêm nguyên tử **donor** (cho electron) như Phosphorus (P, nhóm V) hoặc Arsenic (As, nhóm V):

\`\`\`
     Si — Si — Si
     |    |    |
     Si — P* — Si     ← P* có 5 e hóa trị, 4 tạo liên kết, 1 thừa (●)
     |    |    |        electron thừa ● di chuyển tự do
     Si — Si — Si
\`\`\`

- **Hạt tải đa số (majority carriers)**: electron (âm).
- **Hạt tải thiểu số (minority carriers)**: lỗ trống (do nhiệt độ tạo ra, số lượng rất ít).
- Vật liệu vẫn trung hòa điện vì nguyên tử P có thêm 1 proton so với Si — phần ion dương cố định trong mạng tinh thể.

**Ví dụ số**: Si pha P với nồng độ N_D = 10¹⁶ atom/cm³. Ở 300 K, nồng độ electron tự do n ≈ 10¹⁶ /cm³, nồng độ lỗ trống p ≈ n_i²/n = (1.5×10¹⁰)²/10¹⁶ = **2.25×10⁴ /cm³**. Electron nhiều hơn lỗ trống 10¹²/10⁴ = **10¹² lần** — hoàn toàn áp đảo.

### 2.3. Bán dẫn loại P (P-type)

Thêm nguyên tử **acceptor** (nhận electron) như Boron (B, nhóm III) hoặc Indium (In, nhóm III):

\`\`\`
     Si — Si — Si
     |    |    |
     Si — B* — Si     ← B* có 3 e hóa trị, tạo 3 liên kết, để lại 1 lỗ trống (○)
     |    |    |        lỗ trống ○ di chuyển tự do
     Si — Si — Si
\`\`\`

- **Hạt tải đa số**: lỗ trống (dương).
- **Hạt tải thiểu số**: electron.

💡 **Lỗ trống (hole) di chuyển thế nào?** Lỗ trống không phải hạt vật lý — nó là sự "vắng mặt" của electron. Khi electron từ liên kết lân cận "nhảy" vào lỗ trống (di chuyển sang phải), lỗ trống "di chuyển" sang trái. Hiệu ứng tổng thể giống hệt hạt mang điện dương di chuyển theo chiều ngược electron — nên trong phân tích mạch ta coi lỗ trống như hạt mang điện tích +e di chuyển theo chiều điện trường.

**Ví dụ số tương đương**: Si pha B với N_A = 10¹⁶ /cm³ → p ≈ 10¹⁶ /cm³, n ≈ 2.25×10⁴ /cm³.

❓ **Câu hỏi tự nhiên:**

- *"N-type có điện tích âm ròng vì thừa electron?"* — Không. N-type vẫn **trung hòa điện** về tổng thể. Nguyên tử P mang thêm 1 proton trong nhân → bù cho electron thừa. Vật liệu chỉ mang điện tích cục bộ khi có dòng điện chạy hoặc khi tạo mối nối.

- *"Mức pha tạp phổ biến là bao nhiêu?"* — Từ 10¹⁴ đến 10¹⁹ /cm³. Si tinh khiết có mật độ nguyên tử ~5×10²² /cm³ → mức pha tạp 10¹⁶/cm³ tương ứng 1 tạp trong 5 triệu nguyên tử Si. Một con chip CPU hiện đại có thể có nhiều vùng với mức pha tạp khác nhau cách nhau vài nm.

🔁 **Dừng lại tự kiểm tra:**

*Bán dẫn loại P có điện tích âm vì tiếp nhận electron (acceptor). Đúng hay Sai?*

<details>
<summary>Đáp án</summary>

**Sai.** Bán dẫn P-type vẫn trung hòa điện tổng thể. "Acceptor" có nghĩa nguyên tử B sẵn sàng nhận thêm electron từ liên kết Si hàng xóm để hoàn thành 4 liên kết — nhưng nguyên tử B chỉ có 5 proton (thay vì 14 của Si), nên khi nhận thêm 1 electron, nó thành ion âm cố định. Lỗ trống xuất hiện ở chỗ khác trong mạng — hệ thống tổng thể vẫn trung hòa.
</details>

📝 **Tóm tắt mục 2:**
- Doping N: thêm nguyên tố nhóm V (P, As) → electron thừa → hạt tải đa số là electron (-).
- Doping P: thêm nguyên tố nhóm III (B) → lỗ trống → hạt tải đa số là lỗ trống (+).
- Cả N và P đều trung hòa điện tổng thể trước khi ghép lại.
- Nồng độ hạt tải thiểu số rất nhỏ: p·n = n_i² ≈ (1.5×10¹⁰)² ở 300 K.

---

## 3. Mối nối P-N và vùng nghèo (Depletion Region)

### 3.1. Điều gì xảy ra khi ghép P và N?

💡 **Hình dung**: Đặt hai bình nước cạnh nhau — bình trái đầy màu đỏ (lỗ trống), bình phải đầy màu xanh (electron). Khi mở van ở giữa, hai loại nước **khuếch tán** sang nhau tại ranh giới và triệt tiêu nhau. Vùng giữa trở nên trống (không có hạt tải tự do) — đó là vùng nghèo. Áp suất hai bên không đồng đều → hình thành chênh lệch áp suất ngăn cản khuếch tán tiếp. Đây chính là rào thế (built-in potential).

Khi tinh thể Si loại P tiếp xúc với tinh thể loại N tại ranh giới (junction):

**Bước 1 — Khuếch tán (Diffusion):**
- Electron từ N khuếch tán sang P (vùng có ít electron hơn).
- Lỗ trống từ P khuếch tán sang N (vùng có ít lỗ trống hơn).

**Bước 2 — Tái kết hợp (Recombination):**
- Electron khuếch tán vào P gặp lỗ trống → triệt tiêu nhau.
- Lỗ trống khuếch tán vào N gặp electron → triệt tiêu nhau.

**Bước 3 — Hình thành ion cố định:**
- Trong N: vùng gần ranh giới mất electron → còn lại ion donor dương (P⁺) cố định trong mạng.
- Trong P: vùng gần ranh giới mất lỗ trống → còn lại ion acceptor âm (B⁻) cố định trong mạng.

**Bước 4 — Điện trường nội (Built-in Electric Field):**
- Ion dương (phía N) và ion âm (phía P) tạo ra điện trường hướng từ N sang P (từ + sang −).
- Điện trường này **chống lại** khuếch tán tiếp — đẩy electron về N, đẩy lỗ trống về P.

**Bước 5 — Cân bằng:**
- Khi lực khuếch tán = lực điện trường → hệ đạt cân bằng.
- Vùng ranh giới hoàn toàn không có hạt tải tự do = **vùng nghèo**.

### 3.2. Rào thế (Built-in Potential, V₀)

Điện trường nội tạo ra **rào thế** V₀ giữa hai bên mối nối. Đây là hiệu điện thế cần vượt qua để dòng chạy.

**Công thức gần đúng** (dẫn xuất từ thống kê Fermi-Dirac):

\`\`\`
V₀ = (kT/q) × ln(N_A × N_D / n_i²)
\`\`\`

Trong đó:
- k = 1.38 × 10⁻²³ J/K (hằng số Boltzmann).
- T = nhiệt độ tuyệt đối (K).
- q = 1.6 × 10⁻¹⁹ C (điện tích electron).
- N_A, N_D = nồng độ chất pha tạp (acceptor, donor).
- n_i = nồng độ hạt tải nội tại của Si tinh khiết ≈ 1.5 × 10¹⁰ /cm³ ở 300 K.

**Tính ở 300 K**: kT/q = 0.026 V (gọi là "thermal voltage" V_T).

**Ví dụ 1 — Si doping đối xứng thấp** (N_A = N_D = 10¹⁵ /cm³):

\`\`\`
V₀ = 0.026 × ln(10¹⁵ × 10¹⁵ / (1.5×10¹⁰)²)
   = 0.026 × ln(10³⁰ / 2.25×10²⁰)
   = 0.026 × ln(4.44 × 10⁹)
   = 0.026 × 21.2
   = 0.55 V
\`\`\`

**Ví dụ 2 — Si doping cao** (N_A = N_D = 10¹⁷ /cm³):

\`\`\`
V₀ = 0.026 × ln(10¹⁷ × 10¹⁷ / 2.25×10²⁰)
   = 0.026 × ln(4.44 × 10¹³)
   = 0.026 × 31.4
   = 0.82 V
\`\`\`

**Ví dụ 3 — Germanium** (n_i ≈ 2.4 × 10¹³ /cm³ ở 300 K, N_A = N_D = 10¹⁶ /cm³):

\`\`\`
V₀ = 0.026 × ln(10¹⁶ × 10¹⁶ / (2.4×10¹³)²)
   = 0.026 × ln(10³² / 5.76×10²⁶)
   = 0.026 × ln(1.74 × 10⁵)
   = 0.026 × 11.8
   ≈ 0.31 V
\`\`\`

**Ví dụ 4 — GaAs** (n_i ≈ 2 × 10⁶ /cm³, N_A = N_D = 10¹⁷ /cm³):
V₀ ≈ 1.2 V — cao hơn nhiều do n_i cực nhỏ.

**Quy tắc ngón tay cái:**
- Si: V₀ ≈ **0.6–0.7 V** (rào thế điển hình).
- Ge: V₀ ≈ **0.2–0.3 V**.
- GaAs: V₀ ≈ **1.1–1.4 V** (dùng trong LED, laser diode).

⚠ **Lỗi thường gặp**: Nhiều người nhầm rào thế V₀ với "điện áp nguồn cần thiết". Thực ra V₀ là hiệu điện thế nội tại — nó **không xuất hiện** trên đầu đo voltmeter khi bạn đo hai cực của P-N junction không phân cực. Điện trường nội và điện trường trong vùng tiếp xúc kim loại-bán dẫn (ở đầu dây) bù nhau hoàn toàn → voltmeter đọc 0 V. V₀ chỉ có ý nghĩa khi ta áp điện áp ngoài để thu hẹp hoặc mở rộng vùng nghèo.

📝 **Tóm tắt mục 3:**
- Ghép P+N → khuếch tán → tái kết hợp hạt tải → vùng nghèo hình thành.
- Điện trường nội hướng N→P (từ + sang -), tạo rào thế V₀.
- V₀(Si) ≈ 0.6–0.7 V, V₀(Ge) ≈ 0.2–0.3 V.
- Vùng nghèo không có hạt tải tự do → không dẫn điện.

---

## 4. Phân cực thuận và nghịch — Tại sao P-N dẫn một chiều

### 4.1. Phân cực thuận (Forward Bias)

💡 **Hình dung**: Rào thế V₀ như đập nước ngăn dòng chảy. Phân cực thuận = ta dùng máy bơm (nguồn điện ngoài) **đẩy** ngược chiều đập — khi áp suất bơm đủ mạnh (V_ext > V₀), nước vượt qua đập và chảy ào ào.

**Kết nối**: Cực dương nguồn → bên P; cực âm → bên N.

**Cơ chế bước-by-bước:**

1. Điện áp ngoài V_ext tạo điện trường hướng **ngược** với điện trường nội.
2. Điện trường tổng hợp = E_nội − E_ngoài → **nhỏ hơn**.
3. Vùng nghèo **thu hẹp** lại (hàng rào thấp xuống).
4. Khi V_ext ≈ V₀ (≈ 0.7V với Si): rào thế bị triệt tiêu phần lớn.
5. Electron từ N có thể vượt qua sang P; lỗ trống từ P vượt qua sang N.
6. **Dòng điện lớn chạy qua mối nối** — I tăng vọt theo hàm mũ.

**Phương trình diode (Shockley equation):**

\`\`\`
I = I_S × (e^(V / n·V_T) − 1)
\`\`\`

Trong đó:
- I_S = dòng bão hòa ngược (reverse saturation current) ≈ 10⁻¹⁰ đến 10⁻¹⁴ A với Si ở 300 K.
- n = hệ số ideality (1 đến 2, thường ≈ 1 với Si).
- V_T = kT/q ≈ 26 mV ở 300 K.

**Ví dụ tính dòng** (Si, I_S = 10⁻¹² A, n = 1):

| V áp vào | Tính e^(V/0.026) | I (A) |
|----------|-----------------|-------|
| 0 V | e⁰ = 1 → I = 0 | 0 A |
| 0.3 V | e^(11.5) = 9.9×10⁴ → I ≈ 10⁻¹² × 10⁵ | ≈ 0.1 µA |
| 0.5 V | e^(19.2) = 2.2×10⁸ | ≈ 0.22 mA |
| 0.6 V | e^(23.1) = 1.1×10¹⁰ | ≈ 11 mA |
| 0.65 V | e^(25) = 7.2×10¹⁰ | ≈ 72 mA |
| 0.7 V | e^(26.9) = 5×10¹¹ | ≈ 500 mA |

Từ 0.5V đến 0.7V dòng tăng hơn **2000 lần** — đó là "ngưỡng dẫn" điển hình ~0.7V.

⚠ **Lỗi thường gặp**: "Diode Si mở ở đúng 0.7 V." Thực ra không có ngưỡng cứng — dòng tăng theo hàm mũ liên tục. "0.7 V" là điện áp ở đó dòng đủ lớn để mạch hoạt động thực tế (vài mA đến vài chục mA). Ở 0.5 V đã có dòng nhỏ; ở 0.65 V đã có 72 mA.

### 4.2. Phân cực ngược (Reverse Bias)

**Kết nối**: Cực dương nguồn → bên N; cực âm → bên P.

**Cơ chế:**

1. Điện trường ngoài **cùng chiều** với điện trường nội → tăng cường.
2. Vùng nghèo **mở rộng** ra thêm.
3. Rào thế lớn hơn → hạt tải đa số không thể vượt qua.
4. Chỉ có hạt tải thiểu số (electron lẻ trong P, lỗ trống lẻ trong N) bị điện trường kéo qua → **dòng rò (leakage current) I_S** rất nhỏ.

**Dòng rò điển hình:**
- Si: I_S ≈ 10⁻¹² đến 10⁻¹⁰ A (1 pA đến 100 pA) — bỏ qua được.
- Ge: I_S ≈ 10⁻⁶ A (1 µA) — lớn hơn 100–1000 lần do n_i của Ge cao hơn.

**Ví dụ cụ thể với phân cực ngược −5 V** (Si):

\`\`\`
I = 10⁻¹² × (e^(−5/0.026) − 1) = 10⁻¹² × (e^(−192) − 1) ≈ 10⁻¹² × (−1) = −10⁻¹² A = −1 pA
\`\`\`

Gần như bằng 0 — diode Si ngược chiều gần như hở mạch.

### 4.3. Tóm tắt tính chỉnh lưu (rectification)

| Phân cực | Điện trường ngoài | Vùng nghèo | Rào thế | Dòng điện |
|----------|------------------|-----------|---------|-----------|
| Thuận (V > 0.7 V) | Ngược E_nội | Thu hẹp | Giảm | Lớn (mA đến A) |
| Thuận (0 < V < 0.7 V) | Ngược E_nội | Hơi thu hẹp | Còn đáng kể | Nhỏ (µA đến mA) |
| Không phân cực (V = 0) | — | Cân bằng | V₀ đầy đủ | 0 (chỉ dòng nhiệt bù nhau) |
| Ngược (V < 0) | Cùng chiều E_nội | Mở rộng | Tăng | ≈ −I_S ≈ 0 |

**Kết luận**: P-N junction chỉ cho dòng đáng kể **một chiều** (thuận) — đây là **hiệu ứng chỉnh lưu (rectification)**, nền tảng của diode, transistor, và mọi linh kiện bán dẫn.

❓ **Câu hỏi tự nhiên:**

- *"Tại sao Ge lại ít dùng hơn Si nếu rào thế thấp hơn (0.3 V) — tức là cần ít năng lượng hơn để mở?"* — Chính vì n_i của Ge cao hơn (~2.4×10¹³ vs 1.5×10¹⁰), dòng rò ngược I_S lớn hơn Si ~1000 lần. Ở nhiệt độ cao (50–80°C), dòng rò Ge tăng mạnh làm mạch mất kiểm soát. Si ổn định hơn đến ~150°C.

- *"Điện áp phân cực thuận càng lớn thì dòng càng lớn — vậy tại sao không tăng V mãi?"* — Dòng càng lớn → công suất P = V·I → nhiệt tỏa ra → nhiệt độ diode tăng → I_S tăng → dòng tăng thêm → vòng lặp nhiệt dương (thermal runaway). Diode thực tế có điện áp tối đa (IF_max) và công suất tiêu thụ tối đa (P_D_max) ghi trên datasheet.

📝 **Tóm tắt mục 4:**
- Forward bias: vùng nghèo thu hẹp → dòng lớn khi V > V₀ ≈ 0.7 V (Si).
- Reverse bias: vùng nghèo mở rộng → dòng rò cực nhỏ ≈ I_S ≈ 1 pA (Si).
- Tính chỉnh lưu = chỉ dẫn một chiều = cơ sở của diode.
- Phương trình Shockley: I = I_S × (e^(V/V_T) − 1).

---

## 5. Đánh thủng ngược (Breakdown)

### 5.1. Cơ chế đánh thủng

Khi điện áp ngược tăng đủ lớn, dòng đột ngột tăng vọt — gọi là **đánh thủng (breakdown)**. Có hai cơ chế chính:

**1. Đánh thủng thác (Avalanche Breakdown)** — xảy ra ở V_BR > 6 V:
- Hạt tải thiểu số bị điện trường mạnh tăng tốc → va chạm với nguyên tử Si → ion hóa va chạm (impact ionization) → tạo thêm cặp electron-lỗ trống.
- Cặp mới này lại được tăng tốc → tạo thêm cặp → phản ứng dây chuyền (avalanche).
- Dòng tăng đột ngột nhưng điện áp gần như giữ nguyên = **tính điều áp (voltage regulation)**.

**2. Đánh thủng Zener** — xảy ra ở V_Z < 5 V (doping rất cao):
- Điện trường quá mạnh kéo trực tiếp electron ra khỏi liên kết cộng hóa trị (hiệu ứng đường hầm lượng tử — quantum tunneling).
- Không cần ion hóa va chạm — trực tiếp hơn, xảy ra ở điện áp thấp hơn.

**Điện áp đánh thủng điển hình:**
- Diode chỉnh lưu 1N4148 (Si): V_BR ≈ 75 V.
- Diode 1N4007 (Si, 1 A): V_BR ≈ 1000 V.
- Zener 1N4733 (5.1 V): V_Z = 5.1 V (thiết kế đặc biệt để dùng tính chất này).

⚠ **Lỗi thường gặp**: Đánh thủng ≠ hỏng vĩnh viễn. Nếu dòng được giới hạn (bởi điện trở nối tiếp) thì công suất tỏa ra có thể chịu được — diode Zener hoạt động **bình thường** trong vùng đánh thủng Zener vì đây là cơ chế thiết kế. Chỉ khi dòng quá lớn → nhiệt quá cao → hỏng vật lý.

### 5.2. Preview Zener Diode (Lesson 02)

Diode Zener được thiết kế đặc biệt để **làm việc trong vùng đánh thủng Zener**:
- Pha tạp rất nặng cả P lẫn N → vùng nghèo rất mỏng → điện trường mạnh → Zener breakdown ở điện áp thấp và có thể kiểm soát.
- Ứng dụng chính: **ổn áp** (voltage regulator) — giữ điện áp ra gần như cố định dù dòng thay đổi.

**Sẽ học chi tiết tại [Lesson 02 — Diode](../lesson-02-diode/).**

📝 **Tóm tắt mục 5:**
- Avalanche breakdown (V > 6 V): dòng tăng vọt do ion hóa va chạm dây chuyền.
- Zener breakdown (V < 5 V, doping cao): đường hầm lượng tử trực tiếp.
- Cả hai đều có tính điều áp — dùng ở Zener diode.
- Chưa đánh thủng nhiệt → không hỏng vĩnh viễn nếu dòng được kiểm soát.

---

## 6. Bài tập + Lời giải chi tiết

### Bài tập

**Bài 1 (Phân loại vật liệu)**: Ba vật liệu có điện trở suất: A = 2×10⁻⁸ Ω·m, B = 10³ Ω·m, C = 10¹⁴ Ω·m. Phân loại từng loại và cho ví dụ vật liệu thực tế.

**Bài 2 (Pha tạp)**: Silicon pha Phosphorus với nồng độ N_D = 5×10¹⁵ /cm³. Tính nồng độ lỗ trống (hole concentration) ở 300 K. Biết n_i = 1.5×10¹⁰ /cm³. Loại bán dẫn này là N hay P?

**Bài 3 (Rào thế)**: Tính rào thế V₀ của mối nối P-N có N_A = 10¹⁶ /cm³ và N_D = 2×10¹⁶ /cm³ trong Si ở 300 K. Dùng V_T = 26 mV, n_i = 1.5×10¹⁰ /cm³.

**Bài 4 (Dòng forward)**: Một diode Si có I_S = 2×10⁻¹² A, n = 1. Tính dòng khi áp V = 0.65 V lên mối nối ở 300 K (V_T = 26 mV).

**Bài 5 (Phân tích mạch cơ bản)**: Nguồn 5 V nối tiếp với điện trở R = 220 Ω và diode Si (V_D ≈ 0.7 V khi dẫn). Tính dòng qua mạch và điện áp trên điện trở. Nếu đảo chiều diode, dòng bằng bao nhiêu?

**Bài 6 (Định tính)**: Giải thích tại sao vùng nghèo (depletion region) mở rộng khi tăng điện áp ngược và thu hẹp khi tăng điện áp thuận. Kết nối với rào thế.

### Lời giải chi tiết

**Bài 1:**

- **A (2×10⁻⁸ Ω·m)**: Rất nhỏ, điển hình kim loại → **kim loại dẫn điện** (ví dụ: đồng ≈ 1.7×10⁻⁸, nhôm ≈ 2.8×10⁻⁸ Ω·m).
- **B (10³ Ω·m)**: Trung gian → **bán dẫn** (ví dụ: Si tinh khiết ≈ 6.4×10² Ω·m, gần với giá trị này).
- **C (10¹⁴ Ω·m)**: Rất lớn → **cách điện** (ví dụ: thủy tinh ~10¹², PVC ~10¹⁵ Ω·m).

**Bài 2:**

Bán dẫn pha N_D = 5×10¹⁵ /cm³ (Phosphorus, nhóm V) → **bán dẫn loại N** (electron là hạt tải đa số).

Tính nồng độ lỗ trống (minority carriers):
\`\`\`
Dùng luật tác dụng khối: n × p = n_i²
→ p = n_i² / n ≈ n_i² / N_D   (vì n ≈ N_D khi doping >> n_i)
→ p = (1.5×10¹⁰)² / (5×10¹⁵)
     = 2.25×10²⁰ / 5×10¹⁵
     = 4.5×10⁴ /cm³
\`\`\`

Kết quả: electron n ≈ 5×10¹⁵ /cm³, lỗ trống p ≈ **4.5×10⁴ /cm³**. Electron nhiều hơn lỗ trống hơn 10¹¹ lần.

**Bài 3:**

Bước 1 — Tính n_i²:
\`\`\`
n_i² = (1.5×10¹⁰)² = 2.25×10²⁰ /cm⁶
\`\`\`

Bước 2 — Tính N_A × N_D:
\`\`\`
N_A × N_D = 10¹⁶ × 2×10¹⁶ = 2×10³² /cm⁶
\`\`\`

Bước 3 — Tính V₀:
\`\`\`
V₀ = V_T × ln(N_A × N_D / n_i²)
   = 0.026 × ln(2×10³² / 2.25×10²⁰)
   = 0.026 × ln(8.89×10¹¹)
   = 0.026 × ln(8.89×10¹¹)
\`\`\`

Tính ln(8.89×10¹¹): ln(10¹²) = 12×ln(10) = 12×2.303 = 27.6; ln(8.89×10¹¹) ≈ 27.6 − ln(10/8.89) ≈ 27.6 − 0.12 = 27.5.

\`\`\`
V₀ = 0.026 × 27.5 ≈ 0.715 V
\`\`\`

Kết luận: rào thế V₀ ≈ **0.72 V** — hơi cao hơn điển hình do cả hai phía đều có doping cao hơn mức trung bình.

**Bài 4:**

Dùng phương trình Shockley với I_S = 2×10⁻¹² A, V = 0.65 V, V_T = 0.026 V:

\`\`\`
I = I_S × (e^(V/V_T) − 1)
  = 2×10⁻¹² × (e^(0.65/0.026) − 1)
  = 2×10⁻¹² × (e^25 − 1)
\`\`\`

Tính e^25: e^10 ≈ 22026; e^25 = e^10 × e^10 × e^5 ≈ 22026 × 22026 × 148.4 ≈ 7.2×10¹⁰.

\`\`\`
I = 2×10⁻¹² × (7.2×10¹⁰ − 1)
  ≈ 2×10⁻¹² × 7.2×10¹⁰
  = 144×10⁻³
  ≈ 0.144 A = 144 mA
\`\`\`

Kết luận: ở 0.65 V, dòng ≈ **144 mA** — khá lớn, cần giới hạn bằng điện trở nối tiếp trong mạch thực.

**Bài 5:**

Khi diode phân cực thuận (đúng chiều):
\`\`\`
Áp trên điện trở = V_nguồn − V_D = 5 − 0.7 = 4.3 V
Dòng mạch: I = 4.3 / 220 ≈ 0.0195 A ≈ 19.5 mA
\`\`\`

Kiểm tra: áp trên R = 19.5 mA × 220 Ω = **4.29 V** ✓ (cộng V_D = 0.7 V ≈ 5 V ✓).

Khi đảo chiều diode (phân cực ngược):
\`\`\`
Dòng I ≈ I_S ≈ 10⁻¹² A = 1 pA
\`\`\`
Gần như **hở mạch** — không có dòng đáng kể.

**Bài 6 (Định tính):**

**Khi tăng điện áp ngược:**
- Cực dương nối N, cực âm nối P → điện trường ngoài E_ext hướng từ N sang P — **cùng chiều** với điện trường nội E_nội.
- E_tổng = E_nội + E_ext → **tổng trường mạnh hơn**.
- Hạt tải đa số trong N (electron) bị đẩy xa ranh giới hơn; lỗ trống trong P bị đẩy xa hơn.
- Vùng không có hạt tải tự do **mở rộng ra** → vùng nghèo dày hơn.
- Rào thế hiệu dụng tăng = V₀ + |V_ngược| → chắn càng chặt.

**Khi tăng điện áp thuận:**
- Cực dương nối P, cực âm nối N → E_ext hướng từ P sang N — **ngược chiều** E_nội.
- E_tổng = E_nội − E_ext → **tổng trường yếu hơn**.
- Hạt tải đa số không bị "đẩy ngược" mạnh nữa → khuếch tán tiếp, tái kết hợp tiếp ở gần ranh giới.
- Vùng nghèo **thu hẹp lại** → rào thế hiệu dụng = V₀ − V_thuận.
- Khi V_thuận → V₀: rào gần biến mất → dòng lớn chạy qua.

---

## 7. Liên kết và bài tiếp theo

- **Tiên đề đã dùng**: [Lesson 01 T1 — Điện áp, Dòng điện, Điện trở](../../01-Fundamentals/lesson-01-voltage-current-resistance/) — V, I, R cơ bản.
- **Bài tiếp theo**: [Lesson 02 — Diode: Mạch chỉnh lưu, Zener, LED](../lesson-02-diode/) — ứng dụng trực tiếp của mối nối P-N.
- **Minh họa tương tác**: [visualization.html](./visualization.html)

---

## 📝 Tổng kết Lesson 01

1. **Bán dẫn** (Si, Ge): điện trở suất trung gian, kiểm soát được bằng doping.
2. **Doping N** (P, As): thừa electron → hạt tải đa số là e⁻. **Doping P** (B): thừa lỗ trống → hạt tải đa số là h⁺. Cả hai trung hòa điện.
3. **Mối nối P-N**: khuếch tán → tái kết hợp → vùng nghèo + điện trường nội → rào thế V₀ ≈ 0.7 V (Si), 0.3 V (Ge).
4. **Forward bias** (V > V₀): vùng nghèo thu hẹp, dòng tăng theo hàm mũ I = I_S·e^(V/V_T).
5. **Reverse bias**: vùng nghèo mở rộng, dòng rò cực nhỏ ≈ I_S ≈ 1 pA (Si).
6. **Breakdown ngược** ở V_BR đủ lớn: avalanche hoặc Zener — nền tảng của diode Zener (Lesson 02).
`;
