// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: Physics/02-Thermo-Electromagnetism/lesson-08-em-waves/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 08 (T2) — Sóng điện từ

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Hiểu **sóng điện từ (Electromagnetic wave, EM wave)** là gì — và vì sao chúng tồn tại.
- Biết **tốc độ ánh sáng c** $= 3 \\times 10^8 \\text{ m/s}$, hằng số cơ bản của vũ trụ.
- Hiểu **phổ điện từ**: từ radio ($\\lambda$ lớn) đến tia gamma ($\\lambda$ nhỏ), với ánh sáng nhìn thấy chỉ là 1 dải nhỏ.
- Áp dụng $v = \\lambda \\cdot f = c$ cho sóng điện từ trong chân không.
- Biết **Maxwell preview**: 4 phương trình thống nhất điện và từ — dự đoán sóng EM (1865).

## Kiến thức tiền đề

- [Lesson 07 — Từ trường & cảm ứng](../lesson-07-magnetism-induction/).
- [Lesson 08 (T1) — Sóng cơ](../../01-Mechanics/lesson-08-oscillation-waves/).

---

## 1. Maxwell preview — Thống nhất điện và từ

### 1.1. 4 phương trình Maxwell (1865)

James Clerk Maxwell tổng hợp toàn bộ điện-từ vào **4 phương trình**:

1. **Định luật Gauss cho điện**: $\\nabla \\cdot \\vec{E} = \\frac{\\rho}{\\varepsilon_0}$ — điện tích sinh điện trường.
2. **Định luật Gauss cho từ**: $\\nabla \\cdot \\vec{B} = 0$ — **không có** "từ tích" đơn lẻ (không có monopole).
3. **Định luật Faraday**: $\\nabla \\times \\vec{E} = -\\frac{\\partial \\vec{B}}{\\partial t}$ — từ trường biến đổi sinh điện trường.
4. **Định luật Ampère-Maxwell**: $\\nabla \\times \\vec{B} = \\mu_0 \\vec{J} + \\mu_0 \\varepsilon_0 \\frac{\\partial \\vec{E}}{\\partial t}$ — **điện trường biến đổi sinh từ trường** (Maxwell thêm vào).

### 1.2. Hệ quả vĩ đại — Sóng EM

Maxwell phát hiện: nếu $\\vec{E}$ biến đổi → sinh $\\vec{B}$ biến đổi → sinh $\\vec{E}$ biến đổi → ... một chuỗi tự duy trì lan truyền trong không gian. Đó là **sóng điện từ**.

Hơn nữa, từ phương trình tính ra vận tốc:
$$c = \\frac{1}{\\sqrt{\\mu_0 \\cdot \\varepsilon_0}} \\approx 3 \\times 10^8 \\text{ m/s}$$

**Đây chính là tốc độ ánh sáng đo được trong thí nghiệm!** → Ánh sáng = sóng EM. Sự thống nhất hoành tráng nhất vật lý cổ điển.

💡 **Ý nghĩa**: trước Maxwell, điện và từ là 2 hiện tượng riêng. Ánh sáng là... ánh sáng. Sau Maxwell: cả 3 là **cùng 1 thứ** — điện trường và từ trường dao động lan truyền.

### ❓ Câu hỏi tự nhiên của người đọc

- *"Vì sao 4 phương trình lại 'thống nhất' điện và từ?"* Vì phương trình 3 (Faraday) và 4 (Ampère-Maxwell) **kết nối chéo**: $\\vec{E}$ biến đổi sinh $\\vec{B}$, $\\vec{B}$ biến đổi sinh $\\vec{E}$. Hai trường không độc lập mà nuôi nhau → tạo sóng tự lan truyền.
- *"Maxwell 'thêm vào' gì?"* Số hạng $\\mu_0 \\varepsilon_0 \\frac{\\partial \\vec{E}}{\\partial t}$ trong phương trình 4 — "điện trường biến đổi sinh từ trường". Chính số hạng này làm sóng EM tồn tại và cho ra $c = \\frac{1}{\\sqrt{\\mu_0 \\varepsilon_0}}$.
- *"Vì sao ánh sáng = sóng EM?"* Vì $c$ tính từ $\\mu_0, \\varepsilon_0$ (hai hằng số đo từ thí nghiệm điện-từ) khớp đúng tốc độ ánh sáng đo độc lập. Trùng khớp này quá chính xác để là ngẫu nhiên.

⚠ **Lỗi thường gặp**

- **Tưởng $\\nabla \\cdot \\vec{B} = 0$ nghĩa là không có từ trường**. Sai — nó nghĩa là **không có monopole** (từ tích đơn lẻ); đường sức từ luôn khép kín, không có điểm "bắt đầu/kết thúc". Từ trường vẫn tồn tại.
- **Nhầm c phụ thuộc nguồn sáng**: $c = \\frac{1}{\\sqrt{\\mu_0 \\varepsilon_0}}$ là hằng số của chân không, không phụ thuộc nguồn hay người quan sát (nền tảng thuyết tương đối).

🔁 **Dừng lại tự kiểm tra**

1. Phương trình Maxwell nào nói "không có từ tích đơn lẻ"?
2. Tốc độ sóng EM trong chân không được tính từ những hằng số nào?

<details><summary>Đáp án</summary>

1. Phương trình 2: $\\nabla \\cdot \\vec{B} = 0$ (định luật Gauss cho từ) — đường sức từ khép kín, không có monopole.
2. $c = \\frac{1}{\\sqrt{\\mu_0 \\varepsilon_0}}$ — từ hằng số từ $\\mu_0$ và hằng số điện $\\varepsilon_0$, cho ra $\\approx 3 \\times 10^8 \\text{ m/s}$.

</details>

### 📝 Tóm tắt mục 1

- 4 phương trình Maxwell thống nhất điện + từ.
- Hệ quả: $c = \\frac{1}{\\sqrt{\\mu_0 \\varepsilon_0}}$ = tốc độ ánh sáng → ánh sáng = sóng EM.

---

## 2. Sóng điện từ

💡 **Trực giác**: sóng EM giống một "chuỗi domino tự dựng": điện trường biến đổi làm đổ domino từ trường kế bên, từ trường biến đổi lại dựng domino điện trường tiếp theo... cứ thế lan đi mãi trong không gian, không cần môi trường vật chất. Đó là lý do ánh sáng đi được qua chân không vũ trụ.

### 2.1. Cấu trúc

Sóng EM gồm:
- **Điện trường $\\vec{E}$** dao động vuông góc chiều truyền.
- **Từ trường $\\vec{B}$** dao động vuông góc với cả $\\vec{E}$ và chiều truyền.
- Cả 2 đồng pha, biên độ liên hệ: $E = c \\cdot B$.

→ Sóng **ngang** (transverse), không cần môi trường vật chất (lan truyền cả trong chân không).

### 2.2. $v = \\lambda \\cdot f = c$

Trong chân không, mọi sóng EM (radio, ánh sáng, tia X) đều có cùng tốc độ:
$$c = \\lambda \\cdot f = 2{,}998 \\times 10^8 \\text{ m/s}$$

### 2.3. Năng lượng và động lượng

Sóng EM mang năng lượng (qua công thức Poynting) **và** động lượng. Đó là tại sao:
- Ánh sáng Mặt Trời sưởi ấm Trái Đất (năng lượng).
- Áp suất bức xạ — cánh buồm mặt trời hoạt động (động lượng).

### ❓ Câu hỏi tự nhiên của người đọc

- *"Sóng EM cần môi trường như sóng âm không?"* Không. Sóng âm cần không khí/nước (sóng cơ). Sóng EM tự lan truyền ($\\vec{E}$ và $\\vec{B}$ nuôi nhau) → đi qua chân không → ánh sáng Mặt Trời tới ta qua 150 triệu km chân không.
- *"$v = \\lambda f$ hay $c = \\lambda f$?"* Trong chân không mọi sóng EM cùng $v = c = 3 \\times 10^8 \\text{ m/s}$, nên $c = \\lambda f$. Tần số $f$ lớn → bước sóng $\\lambda$ nhỏ (nghịch nhau), tích luôn $= c$.
- *"Sóng EM có khối lượng không? Sao lại mang động lượng?"* Photon không khối lượng nghỉ, nhưng vẫn mang động lượng ($p = E/c$). Đó là cơ sở của áp suất bức xạ và cánh buồm mặt trời.

⚠ **Lỗi thường gặp**

- **Tưởng sóng tần số cao đi nhanh hơn**. Sai — trong chân không **mọi** sóng EM (radio, ánh sáng, gamma) đi cùng $c$. Tần số khác nhau chỉ làm $\\lambda$ khác nhau, không làm $v$ khác.
- **Lẫn $c = \\lambda f$**: nếu $f$ tăng gấp đôi thì $\\lambda$ giảm một nửa (vì tích cố định $= c$). Phản ví dụ: $f = 10^{15} \\text{ Hz}$ → $\\lambda = 3 \\times 10^8/10^{15} = 3 \\times 10^{-7} \\text{ m} = 300 \\text{ nm}$.

🔁 **Dừng lại tự kiểm tra**

1. Sóng radio và tia X — cái nào đi nhanh hơn trong chân không?
2. Sóng EM có $f = 6 \\times 10^{14} \\text{ Hz}$. Tính bước sóng $\\lambda$.

<details><summary>Đáp án</summary>

1. **Bằng nhau** — cả hai cùng $v = c = 3 \\times 10^8 \\text{ m/s}$ trong chân không. Chỉ khác $\\lambda$ và $f$.
2. $\\lambda = c/f = 3 \\times 10^8 / 6 \\times 10^{14} =$ **$5 \\times 10^{-7} \\text{ m} = 500 \\text{ nm}$** (ánh sáng nhìn thấy, màu xanh lục).

</details>

### 📝 Tóm tắt mục 2

- Sóng EM: $\\vec{E}$ và $\\vec{B}$ vuông góc nhau và vuông góc chiều truyền.
- $v = c = 3 \\times 10^8 \\text{ m/s}$ trong chân không (không phụ thuộc $\\lambda$).
- Mang cả năng lượng và động lượng.

---

## 3. Phổ điện từ

💡 **Trực giác**: phổ EM giống như một cây "đàn piano khổng lồ" — cùng một loại sóng (E-B dao động) nhưng tần số trải từ rất thấp (radio, "nốt trầm") tới rất cao (gamma, "nốt cao"). Mắt người chỉ "nghe" được một quãng tám hẹp ở giữa (ánh sáng nhìn thấy). Tất cả "nốt" đều là cùng một nhạc cụ — chỉ khác tần số.

Phổ EM trải dài qua **20 bậc 10** về tần số!

| Loại sóng | f (Hz) | λ | Ứng dụng / Đặc điểm |
|-----------|--------|---|----------------------|
| **Radio AM** | $0{,}5\\text{-}1{,}5 \\times 10^6$ | $200\\text{-}600 \\text{ m}$ | Phát thanh AM |
| **Radio FM** | $88\\text{-}108 \\times 10^6$ | $2{,}8\\text{-}3{,}4 \\text{ m}$ | Phát thanh FM, TV cổ |
| **Microwave** | $1\\text{-}300 \\times 10^9$ | $1 \\text{ mm}\\text{-}30 \\text{ cm}$ | Lò vi sóng, WiFi, 5G |
| **Hồng ngoại** | $0{,}3\\text{-}400 \\times 10^{12}$ | $0{,}7 \\text{ μm}\\text{-}1 \\text{ mm}$ | Điều khiển TV, nhiệt cơ thể |
| **Ánh sáng nhìn thấy** | $400\\text{-}790 \\times 10^{12}$ | $380\\text{-}780 \\text{ nm}$ | Mắt người thấy được |
| **Tử ngoại UV** | $0{,}79\\text{-}30 \\times 10^{15}$ | $10\\text{-}380 \\text{ nm}$ | Đèn UV, da rám, vitamin D |
| **Tia X** | $30 \\times 10^{15} - 30 \\times 10^{18}$ | $0{,}01\\text{-}10 \\text{ nm}$ | Chụp X-quang |
| **Tia Gamma** | $> 30 \\times 10^{18}$ | $< 0{,}01 \\text{ nm}$ | Phóng xạ, vũ trụ, điều trị ung thư |

### 3.1. Ánh sáng nhìn thấy — chi tiết

Mắt người chỉ "thấy" được dải hẹp: $\\sim 400\\text{-}790 \\text{ THz} = 380\\text{-}780 \\text{ nm}$. Trong dải này:

| Màu | λ (nm) | f (THz) |
|-----|--------|---------|
| Tím | $380\\text{-}450$ | $670\\text{-}790$ |
| Xanh dương | $450\\text{-}490$ | $610\\text{-}670$ |
| Lục | $490\\text{-}570$ | $530\\text{-}610$ |
| Vàng | $570\\text{-}590$ | $510\\text{-}530$ |
| Cam | $590\\text{-}620$ | $480\\text{-}510$ |
| Đỏ | $620\\text{-}780$ | $400\\text{-}480$ |

→ "7 màu cầu vồng" thực ra là dải liên tục, mắt nhìn thành từng "vùng màu".

### 3.2. Vì sao mắt người chỉ thấy được dải này?

Vì Mặt Trời phát ra ánh sáng tập trung mạnh nhất ở dải nhìn thấy (do nhiệt độ ~ 5800 K). Tiến hóa "tối ưu" mắt cho dải có ánh sáng nhiều nhất. Côn trùng (ong) thấy được UV, rắn thấy được hồng ngoại — đều hữu ích cho môi trường sống của chúng.

### ❓ Câu hỏi tự nhiên của người đọc

- *"Vì sao tia gamma nguy hiểm còn radio thì không, dù cùng là sóng EM?"* Vì năng lượng mỗi photon $E = h \\cdot f$. Tần số càng cao → photon càng "mạnh". Gamma ($f \\sim 10^{20} \\text{ Hz}$) đủ năng lượng phá liên kết DNA; radio ($f \\sim 10^6 \\text{ Hz}$) photon quá yếu, vô hại.
- *"Bước sóng và tần số liên hệ ra sao trong phổ?"* Nghịch nhau: $\\lambda = c/f$. Radio $\\lambda$ lớn (mét), gamma $\\lambda$ cực nhỏ ($< 0{,}01 \\text{ nm}$). Đi từ trái sang phải phổ: $f$ tăng, $\\lambda$ giảm, năng lượng photon tăng.
- *"Lò vi sóng dùng sóng gì và vì sao làm nóng nước?"* Vi sóng ($\\sim 2{,}45 \\text{ GHz}$). Tần số này "lắc" phân tử nước (có moment lưỡng cực) → ma sát → nhiệt. Đồ không chứa nước (sứ, thủy tinh) ít hấp thụ → vẫn nguội.

⚠ **Lỗi thường gặp**

- **Tưởng năng lượng sóng EM phụ thuộc biên độ, giống sóng cơ**. Năng lượng **mỗi photon** chỉ phụ thuộc $f$ ($E = h \\cdot f$), không phụ thuộc cường độ. Cường độ lớn = nhiều photon, không phải photon mạnh hơn. Phản ví dụ: đèn radio cực sáng vẫn không phá được DNA vì mỗi photon quá yếu.
- **Lẫn thứ tự phổ**: từ năng lượng thấp đến cao là radio → vi sóng → hồng ngoại → ánh sáng → UV → tia X → gamma. Đừng đảo.

🔁 **Dừng lại tự kiểm tra**

1. Tia tử ngoại (UV) hay hồng ngoại (IR) — cái nào có photon năng lượng cao hơn?
2. Photon ánh sáng tím $f = 7{,}5 \\times 10^{14} \\text{ Hz}$ có năng lượng bao nhiêu ($h = 6{,}63 \\times 10^{-34} \\text{ J·s}$)?

<details><summary>Đáp án</summary>

1. **UV** — tần số cao hơn IR → photon mạnh hơn (đó là lý do UV gây cháy nắng, IR chỉ làm ấm).
2. $E = h \\cdot f = 6{,}63 \\times 10^{-34} \\cdot 7{,}5 \\times 10^{14} =$ **$4{,}97 \\times 10^{-19} \\text{ J}$** ($\\approx 3{,}1 \\text{ eV}$).

</details>

### 📝 Tóm tắt mục 3

- Phổ EM: radio → micro → hồng ngoại → ánh sáng → UV → X → gamma.
- Tất cả cùng v = c.
- Ánh sáng nhìn thấy = dải 380-780 nm (chỉ 1 octave!).

---

## 4. Bài tập

### Bài tập

**Bài 1**: Tính $\\lambda$ của sóng radio FM 100 MHz.

**Bài 2**: Đèn LED đỏ phát $\\lambda = 700 \\text{ nm}$. Tính $f$ và năng lượng 1 photon ($E = h \\cdot f$, $h = 6{,}63 \\times 10^{-34} \\text{ J·s}$).

**Bài 3**: Vì sao lò vi sóng làm nóng nước nhưng không làm nóng đĩa sứ?

**Bài 4**: Tia X có $f = 10^{18} \\text{ Hz}$. Tính $\\lambda$.

**Bài 5**: Vì sao tia gamma từ phóng xạ rất nguy hiểm với DNA?

### Lời giải

**Bài 1**: $\\lambda = c/f = 3 \\times 10^8/10^8 =$ **$3 \\text{ m}$**. (Đó là tại sao anten radio FM dài $\\sim 1 \\text{ m}$.)

**Bài 2**: $f = c/\\lambda = 3 \\times 10^8/7 \\times 10^{-7} = 4{,}29 \\times 10^{14} \\text{ Hz}$. $E = h \\cdot f = 6{,}63 \\times 10^{-34} \\times 4{,}29 \\times 10^{14} =$ **$2{,}84 \\times 10^{-19} \\text{ J}$** $= 1{,}77 \\text{ eV}$.

**Bài 3**: Lò vi sóng phát ở tần số $\\sim 2{,}45 \\text{ GHz}$, $\\lambda \\approx 12 \\text{ cm}$. Tần số này gần với tần số dao động của phân tử nước ($\\text{H}_2\\text{O}$ có moment lưỡng cực). Sóng vi sóng "lắc" các phân tử nước → nhiệt. Đĩa sứ không chứa nước (hoặc rất ít) → không hấp thụ → vẫn lạnh.

**Bài 4**: $\\lambda = 3 \\times 10^8/10^{18} = 3 \\times 10^{-10} \\text{ m} =$ **$0{,}3 \\text{ nm}$**. Đủ nhỏ để xuyên qua mô mềm và bị xương cản → chụp X-quang.

**Bài 5**: Tia gamma có $f$ cực cao → mỗi photon có **năng lượng cực lớn** ($E = h \\cdot f$). Đủ để "phá liên kết" trong phân tử DNA → đột biến gen, ung thư. Đó là tại sao chì che phóng xạ — Pb hấp thụ tia gamma rất tốt.

---

## 5. Kết thúc Tier 2 — Thermo & Electromagnetism

🎉 **HOÀN THÀNH 8/8 LESSON TIER 2!**

Tổng Physics: 16/24 lesson. Còn Tier 3 — Optics & Modern Physics.

[Lesson 01 — Quang hình](../../03-Optics-ModernPhysics/lesson-01-geometric-optics/).

## 📝 Tổng kết

1. **Maxwell** (1865): 4 phương trình thống nhất điện + từ. Dự đoán sóng EM với $v = \\frac{1}{\\sqrt{\\mu_0 \\varepsilon_0}} = c$.
2. **Sóng EM**: $\\vec{E}$ và $\\vec{B}$ dao động vuông góc nhau và vuông góc chiều truyền. Sóng ngang, không cần môi trường.
3. **$c = \\lambda \\cdot f$** trong chân không. Không phụ thuộc $\\lambda$.
4. **Phổ EM**: 20 bậc 10. Mắt người thấy 1 octave hẹp ($380\\text{-}780 \\text{ nm}$).
5. **Năng lượng photon**: $E = h \\cdot f$. Tần số cao = photon "mạnh" → tia gamma nguy hiểm.
`;
