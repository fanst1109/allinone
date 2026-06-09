// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: Physics/03-Optics-ModernPhysics/lesson-06-nucleus-radioactivity/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 06 (T3) — Hạt nhân & Phóng xạ

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Hiểu cấu trúc **hạt nhân** và khái niệm **năng lượng liên kết**.
- Phân biệt 3 loại phóng xạ: **α (alpha)**, **β (beta)**, **γ (gamma)**.
- Tính **chu kỳ bán rã t½** và lượng chất phóng xạ còn lại theo thời gian.
- Hiểu **hiệu ứng phân rã** và ứng dụng (C-14 dating, y tế).
- Biết cảnh báo an toàn phóng xạ.

## Kiến thức tiền đề

- [Lesson 01 Chemistry — Cấu trúc nguyên tử](../../../Chemistry/01-Structure/lesson-01-atom-structure/) — biết đồng vị.

---

## 1. Hạt nhân

### 1.1. Cấu trúc

Hạt nhân = $Z$ proton + $N$ neutron, kích thước $\\sim 10^{-15}\\ \\text{m}$ (femtomet, gấp 100,000 lần nhỏ hơn nguyên tử).

**Lực hạt nhân mạnh** giữ p và n lại với nhau, mạnh hơn lực đẩy điện giữa các proton. Chỉ tác dụng ở cự ly rất ngắn.

### 1.2. Năng lượng liên kết — $E = mc^2$

**Quan sát kỳ lạ**: khối lượng hạt nhân < tổng khối lượng các nucleon riêng lẻ.

Ví dụ — He-4 (2p + 2n):
- $m(2p) + m(2n) = 2(1{,}007276) + 2(1{,}008665) = 4{,}0319\\ \\text{u}$.
- $m(\\text{He-4})$ đo được $= 4{,}0026\\ \\text{u}$.
- **Hụt khối** $\\Delta m = 0{,}0293\\ \\text{u}$.

Phần "hụt khối" này biến thành **năng lượng liên kết** theo Einstein $E = mc^2$:
- $E_\\text{liên kết} = 0{,}0293 \\cdot 931{,}5\\ \\text{MeV/u} =$ **27,3 MeV** ($931{,}5 = c^2$ trong đơn vị MeV/u).

→ Cần $27{,}3\\ \\text{MeV}$ để "tách" He-4 thành 2p + 2n.

**Định nghĩa đầy đủ — năng lượng liên kết (binding energy) $E_\\text{lk}$**:
- **(a) Là gì**: năng lượng (MeV) cần để TÁCH hoàn toàn một hạt nhân thành các proton và neutron riêng lẻ. Tương đương: năng lượng được GIẢI PHÓNG khi ghép các nucleon lại thành hạt nhân. Bằng $E_\\text{lk} = \\Delta m \\cdot c^2$ với $\\Delta m$ = độ hụt khối.
- **(b) Vì sao cần**: để đo "độ bền" của hạt nhân và dự đoán phản ứng nào tỏa năng lượng. Không có nó thì không hiểu được vì sao Mặt Trời sáng (fusion) hay lò phản ứng tạo điện (fission).
- **(c) Ví dụ số kèm đơn vị**: He-4 có $\\Delta m = 0{,}0293\\ \\text{u}$. $E_\\text{lk} = 0{,}0293 \\times 931{,}5\\ \\text{MeV/u} = 27{,}3\\ \\text{MeV}$. Chia cho 4 nucleon → $6{,}8\\ \\text{MeV/nucleon}$ (dùng để so với các hạt nhân khác ở Lesson 07).

💡 **Trực giác**: hạt nhân giống như cục nam châm gắn lại — "tổng cân nặng" cục gắn NHẸ hơn các mảnh rời, vì một phần khối lượng đã "biến thành keo dán" (năng lượng liên kết) theo $E = mc^2$.

❓ **Câu hỏi tự nhiên của người đọc**

- *"Khối lượng tự nhiên 'mất đi' đâu?"* Không mất — nó chuyển thành năng lượng liên kết theo $E = mc^2$. Đây là minh chứng trực tiếp khối lượng và năng lượng là một (xem Lesson 08).
- *"Vì sao proton (cùng dương) không đẩy nhau văng ra?"* Vì **lực hạt nhân mạnh** ở cự ly ngắn ($\\sim 10^{-15}\\ \\text{m}$) mạnh hơn lực đẩy điện. Ngoài cự ly đó lực mạnh tắt nhanh → hạt nhân quá lớn (nhiều proton) trở nên bất ổn.
- *"u là đơn vị gì?"* Đơn vị khối lượng nguyên tử, $1\\ \\text{u} = 1{,}66 \\times 10^{-27}\\ \\text{kg}$, và $1\\ \\text{u} \\cdot c^2 = 931{,}5\\ \\text{MeV}$.

⚠ **Lỗi thường gặp**

- **Lẫn số khối A và số hiệu Z.** $A$ = tổng nucleon (p + n); $Z$ = số proton (= số hiệu, định danh nguyên tố). Số neutron $N = A - Z$. Vd $^{238}\\text{U}$: $A=238$, $Z=92$, $N=146$.
- **Quên hệ số 931.5 khi đổi u → MeV.** $1\\ \\text{u} \\to 931{,}5\\ \\text{MeV}$. Bỏ qua → sai 3 bậc độ lớn.

🔁 **Dừng lại tự kiểm tra**

1. Hạt nhân $^{14}_{6}\\text{C}$ có bao nhiêu proton và neutron?
2. Một hạt nhân có độ hụt khối $\\Delta m = 0{,}05\\ \\text{u}$. Năng lượng liên kết bằng bao nhiêu MeV?

<details><summary>Đáp án</summary>

1. $Z = 6$ → 6 proton; $A = 14$ → $N = 14 - 6 = 8$ neutron.
2. $E_\\text{lk} = 0{,}05 \\times 931{,}5 = 46{,}6\\ \\text{MeV}$.

</details>

### 📝 Tóm tắt mục 1

- Hạt nhân = p + n, giữ bởi lực hạt nhân mạnh.
- Hụt khối = năng lượng liên kết ($E = mc^2$). He-4 có $E_\\text{liên kết} = 27{,}3\\ \\text{MeV}$.

---

## 2. Ba loại phóng xạ

### 2.1. Phóng xạ α (alpha)

**Phát ra hạt α** = hạt nhân He-4 (2p + 2n).

$$^{A}_{Z}\\text{X} \\to {}^{A-4}_{Z-2}\\text{Y} + {}^{4}_{2}\\text{He}$$

Ví dụ: $^{238}\\text{U} \\to {}^{234}\\text{Th} + \\alpha$.

**Đặc điểm**:
- Nặng (so với β, γ), ion hóa mạnh, **đi xa ngắn** (vài cm trong không khí).
- **Tờ giấy** chặn được.
- Nguy hiểm khi **hít vào hoặc nuốt vào cơ thể** (ion hóa mô).

### 2.2. Phóng xạ β (beta)

**Phát ra electron** ($\\beta^-$) hoặc positron ($\\beta^+$).

$\\beta^-$: 1 neutron → 1 proton + 1 electron + 1 antineutrino:

$$^{A}_{Z}\\text{X} \\to {}^{A}_{Z+1}\\text{Y} + \\beta^-$$

Ví dụ: $^{14}\\text{C} \\to {}^{14}\\text{N} + \\beta^-$ (chu kỳ 5730 năm, dùng định tuổi cổ vật).

**Đặc điểm**:
- Nhẹ, đi xa hơn α (vài mét trong không khí).
- **Tấm nhôm** vài mm chặn được.
- Nguy hiểm: gây bỏng phóng xạ trên da.

### 2.3. Phóng xạ γ (gamma)

**Photon năng lượng cực cao** ($E > 100\\ \\text{keV}$, $\\lambda < 10\\ \\text{pm}$).

Phát ra khi hạt nhân từ trạng thái kích thích về trạng thái cơ bản (sau khi đã có phân rã α hoặc β).

**Đặc điểm**:
- Không có khối lượng. Đi xa rất nhiều (km trong không khí).
- Cần **chì dày** (vài cm) hoặc bê tông để chặn.
- **NGUY HIỂM NHẤT**: xuyên qua cả cơ thể, phá DNA, gây ung thư.

💡 **Trực giác**: ba loại phóng xạ giống ba "viên đạn" khác cỡ. α = viên đạn to chậm (ion hóa dữ nhưng đi gần, giấy chặn); β = viên đạn nhỏ nhanh (xuyên sâu hơn, nhôm chặn); γ = tia laser năng lượng cao (không khối lượng, xuyên rất xa, cần chì dày).

❓ **Câu hỏi tự nhiên của người đọc**

- *"Phóng xạ α/β làm số khối và số hiệu thay đổi thế nào?"* α: $A$ giảm 4, $Z$ giảm 2 (mất 2p+2n). $\\beta^-$: $A$ giữ nguyên, $Z$ TĂNG 1 (1 neutron → 1 proton + electron). γ: cả $A$ và $Z$ không đổi (chỉ nhả năng lượng dư).
- *"Tại sao α nguy hiểm khi nuốt vào nhưng giấy lại chặn được?"* Vì ngoài da, lớp tế bào chết + quần áo đã chặn α. Nhưng nếu hít/nuốt, α "bắn" trực tiếp vào tế bào sống → ion hóa cực mạnh tại chỗ → phá hủy nặng.
- *"γ có biến đổi nguyên tố không?"* KHÔNG — γ chỉ là photon năng lượng cao thoát ra khi hạt nhân hạ từ trạng thái kích thích về cơ bản. Không đổi p, n.

⚠ **Lỗi thường gặp**

- **Viết sai bảo toàn số khối/số hiệu khi cân bằng phản ứng.** Phải bảo toàn cả $A$ (tổng trên) và $Z$ (tổng dưới) ở hai vế. Vd $^{238}_{92}\\text{U} \\to {}^{234}_{90}\\text{Th} + {}^{4}_{2}\\text{He}$: $A$: $238 = 234+4$ ✓; $Z$: $92 = 90+2$ ✓.
- **Nghĩ γ "an toàn vì không có khối lượng".** Ngược lại — γ xuyên thấu mạnh nhất, nguy hiểm từ xa, cần chì/bê tông để chặn.
- **Lẫn $\\beta^-$ làm Z giảm.** $\\beta^-$ làm $Z$ TĂNG 1 (n→p), không giảm.

🔁 **Dừng lại tự kiểm tra**

1. $^{226}_{88}\\text{Ra}$ phát ra α. Viết sản phẩm con (số khối, số hiệu).
2. Để che chắn nguồn γ mạnh, dùng tờ giấy, tấm nhôm hay khối chì? Vì sao?

<details><summary>Đáp án</summary>

1. α làm $A$ giảm 4 ($226 \\to 222$), $Z$ giảm 2 ($88 \\to 86$ = Rn). Sản phẩm: **$^{222}_{86}\\text{Rn}$** (radon). Phản ứng: $^{226}_{88}\\text{Ra} \\to {}^{222}_{86}\\text{Rn} + {}^{4}_{2}\\text{He}$.
2. Khối **chì** dày (hoặc bê tông). γ xuyên qua giấy và nhôm dễ dàng; chỉ vật liệu đặc, nguyên tử số cao như chì mới hấp thụ đáng kể.

</details>

### 📝 Tóm tắt mục 2

| Loại | Là gì | Đi xa | Chặn |
|------|-------|-------|------|
| α | Hạt nhân He | vài cm | Giấy |
| β | Electron | vài m | Nhôm |
| γ | Photon E cao | km | Chì dày |

---

## 3. Chu kỳ bán rã

### 3.1. Định nghĩa

💡 **Trực giác — bán rã**: "một nửa biến mất sau mỗi chu kỳ". Cứ qua một chu kỳ, còn lại một nửa; qua hai chu kỳ còn 1/4; ba chu kỳ còn 1/8... không bao giờ về 0 hẳn, chỉ giảm theo cấp số nhân.

**Định nghĩa đầy đủ — chu kỳ bán rã (half-life) $t_{1/2}$**:
- **(a) Là gì**: thời gian (đơn vị: giây, năm...) để LƯỢNG chất phóng xạ giảm còn đúng MỘT NỬA. Đặc trưng cho mỗi đồng vị, không phụ thuộc khối lượng ban đầu hay nhiệt độ.
- **(b) Vì sao cần**: vì phân rã của từng hạt nhân là ngẫu nhiên, không dự đoán được cá thể nào. Nhưng $t_{1/2}$ cho quy luật thống kê chắc chắn cho cả khối → tính được tuổi cổ vật, liều thuốc phóng xạ, thời gian lưu kho chất thải.
- **(c) Ví dụ số kèm đơn vị**: C-14 có $t_{1/2} = 5730$ năm. Bắt đầu 8 g → sau 5730 năm còn 4 g → sau 11 460 năm còn 2 g → sau 17 190 năm còn 1 g.

**Chu kỳ bán rã $t_{1/2}$** = thời gian để **lượng chất phóng xạ giảm còn 1 nửa**.

Phân rã ngẫu nhiên ở quy mô từng hạt nhân, nhưng **tổng số hạt phân rã** tuân theo định luật mũ:

$$N(t) = N_0 \\cdot \\left(\\frac{1}{2}\\right)^{t/t_{1/2}}$$

hoặc tương đương:

$$N(t) = N_0 \\cdot e^{-\\lambda t}$$

trong đó $\\lambda$ = hằng số phân rã $= \\frac{\\ln 2}{t_{1/2}}$.

### 3.2. Bảng t½ một số đồng vị

| Đồng vị | t½ | Ứng dụng |
|---------|-----|----------|
| Carbon-14 | 5,730 năm | Định tuổi cổ vật < 50,000 năm |
| Uranium-238 | 4.5 tỷ năm | Định tuổi đá / Trái Đất |
| Iodine-131 | 8 ngày | Điều trị ung thư giáp |
| Technetium-99m | 6 giờ | Chụp ảnh y tế |
| Plutonium-239 | 24,000 năm | Vũ khí hạt nhân, lò phản ứng |
| Polonium-210 | 138 ngày | Cực độc — vụ Litvinenko 2006 |
| Radon-222 | 3.8 ngày | Khí phóng xạ trong nhà, gây ung thư phổi |

### 3.3. Walk-through — Định tuổi cổ vật bằng C-14

Một mẫu xương có lượng C-14 còn lại 25% so với cây sống.
- $25\\% = \\left(\\frac{1}{2}\\right)^n \\to n = 2$ chu kỳ bán rã.
- $t = 2 \\times 5730 =$ **11,460 năm**.

❓ **Câu hỏi tự nhiên của người đọc**

- *"Hai chu kỳ bán rã có cộng thành 'phân rã hết' không?"* KHÔNG. Sau 1 $t_{1/2}$ còn 1/2, sau 2 $t_{1/2}$ còn 1/4 (KHÔNG phải 0). Bán rã NHÂN nhau ($\\times \\frac{1}{2}$ mỗi chu kỳ), không cộng tuyến tính. Sau $n$ chu kỳ còn $\\left(\\frac{1}{2}\\right)^n$.
- *"Vì sao C-14 chỉ định tuổi được tới ~50 000 năm?"* Sau ~9 chu kỳ ($\\approx 51\\,600$ năm) lượng C-14 còn $\\left(\\frac{1}{2}\\right)^9 \\approx 0{,}2\\%$ — quá ít để đo chính xác. Vật cổ hơn phải dùng đồng vị $t_{1/2}$ dài (U-238, K-Ar).
- *"t½ có đổi theo nhiệt độ/áp suất không?"* KHÔNG (với phân rã hạt nhân) — đó là hằng số nội tại của đồng vị, nên dùng làm "đồng hồ" tin cậy.

⚠ **Lỗi thường gặp**

- **Cộng tuyến tính: "2 chu kỳ → mất hết".** Sai. Mất một nửa, rồi một nửa của phần còn lại → còn 1/4. Mỗi chu kỳ chia đôi phần CÒN LẠI.
- **Lẫn "còn lại 25%" với "đã phân rã 25%".** "Còn 25%" $= \\left(\\frac{1}{2}\\right)^2 \\to 2$ chu kỳ. "Đã phân rã 25%" = còn 75% → chưa tới 1 chu kỳ.
- **Đếm n không nguyên cũng đừng tròn vội.** $\\left(\\frac{1}{2}\\right)^n$ với $n$ có thể là số thực: vd còn 30% → $n = \\frac{\\log 0{,}3}{\\log 0{,}5} \\approx 1{,}74$ chu kỳ.

🔁 **Dừng lại tự kiểm tra**

1. Mẫu Iodine-131 ($t_{1/2} = 8$ ngày) ban đầu 80 mg. Sau 24 ngày còn bao nhiêu?
2. Một cổ vật còn 6.25% lượng C-14. Tuổi bằng bao nhiêu?

<details><summary>Đáp án</summary>

1. 24 ngày / 8 = 3 chu kỳ → còn $\\left(\\frac{1}{2}\\right)^3 = \\frac{1}{8}$ → $80 \\times \\frac{1}{8} = 10\\ \\text{mg}$.
2. $6{,}25\\% = \\left(\\frac{1}{2}\\right)^4$ → 4 chu kỳ → $t = 4 \\times 5730 = 22\\,920$ năm.

</details>

### 📝 Tóm tắt mục 3

- $N(t) = N_0 \\cdot \\left(\\frac{1}{2}\\right)^{t/t_{1/2}}$.
- C-14: $t_{1/2} = 5730$ năm → định tuổi cổ vật.
- U-238: $t_{1/2} = 4{,}5$ tỷ năm → định tuổi đá địa chất.

---

## 4. Ứng dụng

### 4.1. Y tế

- **Chụp PET / SPECT**: tiêm đồng vị (vd Tc-99m), theo dõi nơi nó tập trung → "soi" cơ quan.
- **Điều trị ung thư**: chiếu γ (Co-60) hoặc proton vào khối u → giết tế bào ung thư.
- **Iodine-131**: uống → tập trung ở tuyến giáp → phá tế bào ung thư giáp.

### 4.2. Định tuổi

- **C-14**: cổ vật hữu cơ < 50,000 năm (xương, gỗ, da).
- **K-Ar, U-Pb**: đá và meteorite (triệu đến tỷ năm). Định tuổi Trái Đất = 4.54 tỷ năm.

### 4.3. Cảnh báo — Tác hại

Phóng xạ cao → đột biến DNA → ung thư, sảy thai. Liều an toàn cho người: < 1 mSv/năm (millisievert). Tia X chụp 1 lần ≈ 0.1 mSv. Liều gây bệnh phóng xạ cấp: > 1 Sv (1000 mSv).

💡 **Trực giác**: phóng xạ là "con dao hai lưỡi" — cùng khả năng ion hóa phá tế bào ung thư (xạ trị) cũng có thể gây ung thư nếu liều cao/không kiểm soát. Liều và vị trí quyết định lợi hay hại.

❓ **Câu hỏi tự nhiên của người đọc**

- *"Vì sao chọn đồng vị t½ ngắn cho y tế (Tc-99m 6 giờ, I-131 8 ngày)?"* Để chất phóng xạ phân rã hết nhanh sau khi chẩn đoán/điều trị → giảm liều tích lũy cho bệnh nhân. Đồng vị t½ dài sẽ "ở lại" cơ thể gây hại lâu.
- *"Định tuổi đá triệu/tỷ năm sao dùng được C-14?"* Không dùng được — C-14 t½ chỉ 5730 năm, sau ~50 000 năm là hết. Đá cổ dùng U-Pb hay K-Ar (t½ hàng tỷ năm).
- *"1 lần chụp X-quang có nguy hiểm không?"* ~0.1 mSv, thấp hơn nhiều liều nền tự nhiên hằng năm (~2–3 mSv). Rủi ro rất nhỏ so với lợi ích chẩn đoán.

⚠ **Lỗi thường gặp**

- **Lẫn đơn vị liều.** Sv (sievert) đo tác hại sinh học, khác Bq (becquerel, đo số phân rã/giây) và Gy (gray, đo năng lượng hấp thụ). 1 Sv = 1000 mSv.
- **Dùng C-14 cho mẫu quá cổ.** Giới hạn ~50 000 năm; vượt qua thì không đủ C-14 để đo.

🔁 **Dừng lại tự kiểm tra**

1. Định tuổi một mẫu đá núi lửa ~2 tỷ năm tuổi — nên dùng C-14 hay U-Pb? Vì sao?
2. Liều an toàn hằng năm cho người là bao nhiêu, và 1 lần chụp X-quang chiếm bao nhiêu phần trăm?

<details><summary>Đáp án</summary>

1. Dùng **U-Pb** (t½ hàng tỷ năm). C-14 (t½ 5730 năm) đã phân rã hết từ lâu ở thang tỷ năm → không đo được.
2. < 1 mSv/năm (giới hạn nhân tạo); 1 lần X-quang ≈ 0.1 mSv → khoảng 10% giới hạn đó.

</details>

### 📝 Tóm tắt mục 4

- Y tế: chẩn đoán + điều trị.
- Định tuổi: C-14, U-Pb.
- Phải tuân thủ giới hạn an toàn.

---

## 5. Bài tập

### Bài tập

**Bài 1**: $^{235}\\text{U}$ phát ra α. Sản phẩm là gì?

**Bài 2**: 1 mẫu có 1 g C-14 ban đầu. Sau 11,460 năm còn bao nhiêu?

**Bài 3**: Mẫu xương C-14 còn 12.5%. Tuổi?

**Bài 4**: Tại sao gamma nguy hiểm hơn alpha (về xuyên thấu)?

**Bài 5**: Vì sao radon là khí phóng xạ trong nhà rất nguy hiểm dù chỉ là α?

### Lời giải

**Bài 1**: $^{235}\\text{U} \\to {}^{231}\\text{Th} + \\alpha$. ($Z$ giảm 2, $A$ giảm 4.)

**Bài 2**: $11{,}460 / 5{,}730 = 2$ chu kỳ → còn $\\left(\\frac{1}{2}\\right)^2 = \\frac{1}{4}$ → **0,25 g**.

**Bài 3**: $12{,}5\\% = \\left(\\frac{1}{2}\\right)^3$ → 3 chu kỳ → $t = 3 \\times 5730 =$ **17,190 năm**.

**Bài 4**: Gamma là photon không khối lượng → ít tương tác với vật chất → xuyên qua mô người dễ dàng. Alpha to và nặng → tương tác mạnh ở quy mô gần → chỉ vài cm. Nhưng ngược lại: nếu alpha vào CƠ THỂ (qua hô hấp), nó ion hóa mạnh ngay tại chỗ → tàn phá cục bộ rất nặng. Quy tắc: γ nguy hiểm từ XA, α nguy hiểm từ BÊN TRONG.

**Bài 5**: Radon là khí trong tự nhiên (từ U phân rã trong lòng đất). Có thể thấm vào nhà qua nền móng, nhất là nhà có hầm. Hít vào phổi → α "bắn" vào tế bào phổi → ung thư phổi. Đây là nguyên nhân thứ 2 gây ung thư phổi (sau hút thuốc). Cần xét nghiệm Rn ở nhà, đặc biệt khu đất giàu uranium.

---

## 6. Bài tiếp theo

[Lesson 07 — Phân hạch & Nhiệt hạch](../lesson-07-fission-fusion/).

## 📝 Tổng kết

1. **Hạt nhân**: p + n, lực hạt nhân mạnh. $E_\\text{liên kết} = \\Delta m \\cdot c^2$.
2. **3 loại phóng xạ**: α (He nặng, đi gần), β (e, đi xa), γ (photon, xuyên rất xa).
3. **$t_{1/2}$**: $N(t) = N_0 \\cdot \\left(\\frac{1}{2}\\right)^{t/t_{1/2}}$. C-14 (5730 năm) định tuổi.
4. **Ứng dụng**: y tế (PET, xạ trị), khảo cổ, địa chất.
5. **An toàn**: liều < 1 mSv/năm. Radon trong nhà phải kiểm tra.
`;
