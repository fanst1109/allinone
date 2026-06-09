// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: Astronomy/03-Cosmology/lesson-07-relativity-spacetime/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 07 — Tương đối & không-thời gian (Relativity & Spacetime)

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Tóm tắt **tương đối hẹp (special relativity)**: tốc độ ánh sáng $c$ là bất biến với mọi người quan sát → thời gian và không gian "co giãn".
- Hiểu ý tưởng cốt lõi của **tương đối tổng quát (general relativity)**: khối lượng-năng lượng làm **cong không-thời gian (spacetime)**, hấp dẫn = hình học chứ không phải lực.
- Giải thích **thấu kính hấp dẫn (gravitational lensing)** và **giãn nở thời gian hấp dẫn (gravitational time dilation)** — vì sao **GPS phải hiệu chỉnh** thời gian.
- Biết **sóng hấp dẫn (gravitational waves)** là gì và sự kiện lịch sử **GW150914** (LIGO, 2015) — hai lỗ đen sáp nhập.
- Nắm các kiểm chứng thực nghiệm chính của thuyết tương đối.

## Kiến thức tiền đề

- **Năng lượng, khối lượng, $E = mc^2$**: [\`../../../Physics/03-Optics-ModernPhysics/\`](../../../Physics/03-Optics-ModernPhysics/).
- **Vi thấu kính** (ứng dụng bẻ cong ánh sáng để săn ngoại hành tinh): [\`../lesson-06-exoplanets/\`](../lesson-06-exoplanets/).
- Hình học cơ bản, khái niệm "độ cong" trực giác.

---

## 1. Tương đối hẹp — \`c\` là bất biến

> 💡 **Trực giác / Hình dung.** Trên xe lửa chạy 100 km/h, bạn ném quả bóng về phía trước 20 km/h → người đứng ngoài thấy bóng đi 120 km/h. Vận tốc *cộng* lại. Nhưng nếu bạn bật đèn pin, người ngoài **vẫn đo ánh sáng đúng $c$**, không phải $c + 100 \\ \\text{km/h}$. Tốc độ ánh sáng *từ chối* cộng vào. Để dung hòa điều kỳ lạ này, chính **thời gian và không gian** phải co giãn.

**Định nghĩa — bất biến tốc độ ánh sáng (3 phần):**

- **(a) Là gì** — Mọi người quan sát quán tính, dù chuyển động thế nào, đều đo tốc độ ánh sáng trong chân không bằng đúng $c \\approx 299\\,792\\,458 \\ \\text{m/s}$.
- **(b) Vì sao quan trọng** — Nếu $c$ bất biến mà vận tốc thông thường thì cộng được, hai điều mâu thuẫn. Lối thoát của Einstein: chấp nhận $c$ bất biến và hi sinh khái niệm "thời gian tuyệt đối". Hệ quả: **giãn thời gian** và **co độ dài**.
- **(c) Ví dụ trực giác bằng số** — Hệ số Lorentz $\\gamma = \\dfrac{1}{\\sqrt{1 - v^2/c^2}}$. Ở $v = 0{,}866c$: $\\gamma = \\dfrac{1}{\\sqrt{1 - 0{,}75}} = \\dfrac{1}{\\sqrt{0{,}25}} = 2$ → đồng hồ chuyển động chạy **chậm gấp đôi** so với đồng hồ đứng yên.

**4 ví dụ số — hệ số Lorentz $\\gamma$:**

| $v/c$ | $v^2/c^2$ | $\\gamma = \\dfrac{1}{\\sqrt{1 - v^2/c^2}}$ | Hệ quả |
|---|---|---|---|
| 0,1 | 0,01 | ≈ 1,005 | gần như không đáng kể |
| 0,5 | 0,25 | ≈ 1,155 | thời gian chậm ~15% |
| 0,866 | 0,75 | = 2 | thời gian chậm gấp đôi |
| 0,99 | 0,9801 | ≈ 7,09 | thời gian chậm 7 lần |

> ⚠ **Lỗi thường gặp.** Tưởng giãn thời gian là "ảo giác đo đạc". Không — nó **thật**: hạt muon sinh ở thượng tầng khí quyển, lẽ ra phân rã trước khi tới mặt đất, nhưng vì bay gần \`c\` nên "đồng hồ riêng" của chúng chạy chậm → kịp tới mặt đất. Ta đo được nhiều muon hơn dự đoán cổ điển → bằng chứng trực tiếp.

> 🔁 **Dừng lại tự kiểm tra.** Ở $v = 0{,}6c$, tính $\\gamma$.
> <details><summary>Đáp án</summary>$v^2/c^2 = 0{,}36$; $1 - 0{,}36 = 0{,}64$; $\\sqrt{0{,}64} = 0{,}8$; $\\gamma = 1/0{,}8 = $ **1.25**. Đồng hồ chuyển động chạy chậm 25%.</details>

---

## 2. Tương đối tổng quát — khối lượng làm cong không-thời gian

> 💡 **Trực giác / Hình dung — tấm cao su.** Căng một tấm cao su (hoặc tấm bạt lò xo). Đặt quả bóng bowling nặng vào giữa → tấm **lõm xuống**. Lăn một viên bi nhỏ ngang qua → nó **lượn cong** quanh chỗ lõm, không phải vì quả bóng "kéo" nó bằng dây, mà vì mặt sàn nó lăn trên đã *cong*. Trong tương đối tổng quát, **khối lượng-năng lượng làm cong không-thời gian**, và các vật (kể cả ánh sáng) đi theo đường "thẳng nhất có thể" trên bề mặt cong đó. Đó chính là cái ta gọi là "hấp dẫn".

**Định nghĩa (3 phần):**

- **(a) Là gì** — Tương đối tổng quát phát biểu: hấp dẫn không phải một *lực* tác động từ xa, mà là biểu hiện của **độ cong không-thời gian** do khối lượng-năng lượng gây ra. Vật chất nói cho không-thời gian biết phải cong thế nào; không-thời gian cong nói cho vật chất biết phải đi thế nào.
- **(b) Vì sao cần** — Lý thuyết Newton mô tả hấp dẫn như lực tức thời, tỉ lệ $1/r^2$. Nó cực kỳ chính xác ở vận tốc nhỏ/trường yếu, nhưng *sai* với trường mạnh (quỹ đạo Sao Thủy lệch) và không tương thích tốc độ ánh sáng hữu hạn. Tương đối tổng quát sửa cả hai.
- **(c) Ví dụ trực giác bằng số** — Tương đối tổng quát tiên đoán quỹ đạo Sao Thủy *tiến động* thêm **43 giây cung/thế kỷ** so với Newton — đúng khớp quan sát, là một trong những thắng lợi đầu tiên của lý thuyết.

> ⚠ **Lỗi thường gặp với analogy tấm cao su.** Đây là *toy model* 2D: tấm cao su lõm "xuống" nhờ chính... hấp dẫn của Trái Đất kéo quả bóng — tức nó dùng cái nó định giải thích. Hạn chế: (1) thực tế là **không-thời gian 4D** cong, không phải mặt 2D; (2) thời gian cũng cong, không chỉ không gian; (3) không có "phía dưới" để lõm vào. Dùng để *hình dung*, đừng coi là cơ chế thật.

> 🔁 **Dừng lại tự kiểm tra.** Theo tương đối tổng quát, vì sao ánh sáng (không có khối lượng nghỉ) vẫn bị hấp dẫn bẻ cong?
> <details><summary>Đáp án</summary>Vì ánh sáng đi theo đường "thẳng nhất" trong không-thời gian, mà chính không-thời gian đã cong gần khối lượng. Không cần ánh sáng "có khối lượng để bị kéo" — nó chỉ đang đi thẳng trên một sàn cong. (Newton không giải thích nổi điều này một cách nhất quán.)</details>

---

## 3. Thấu kính hấp dẫn (Gravitational Lensing)

> 💡 **Trực giác.** Đáy ly thủy tinh dày bẻ cong ánh sáng → nhìn vật phía sau thấy méo, phóng to, có khi thành nhiều ảnh. Một khối lượng lớn (đám thiên hà) làm y vậy với không-thời gian: ánh sáng từ thiên hà xa phía sau bị bẻ cong khi lướt qua → ta thấy thiên hà nền **bị kéo thành cung, nhân đôi, hoặc thành "vòng Einstein"**.

Vì ánh sáng đi trên không-thời gian cong, một thiên thể nặng đóng vai "thấu kính". Các dạng:
- **Thấu kính mạnh (strong lensing)**: cung sáng, nhiều ảnh, vòng Einstein.
- **Thấu kính yếu (weak lensing)**: méo nhẹ thống kê — dùng để **lập bản đồ vật chất tối** (vật chất tối có khối lượng nên bẻ cong ánh sáng dù không phát sáng).
- **Vi thấu kính (microlensing)**: khuếch đại tạm thời ánh sao nền — chính cơ chế săn ngoại hành tinh ở [Lesson 06](../lesson-06-exoplanets/).

Lần kiểm chứng nổi tiếng: **nhật thực 1919**, Eddington đo vị trí sao gần rìa Mặt Trời lệch ~1.75 giây cung so với khi không có Mặt Trời — đúng tiên đoán tương đối tổng quát (gấp đôi giá trị Newton ngây thơ).

> ❓ **Câu hỏi tự nhiên.** *"Thấu kính hấp dẫn có ích gì ngoài chuyện đẹp?"* — Rất nhiều: (1) đo khối lượng đám thiên hà kể cả phần tối; (2) phóng to thiên hà cực xa để nghiên cứu vũ trụ sơ khai (đám thiên hà làm "kính thiên văn tự nhiên"); (3) lập bản đồ phân bố vật chất tối qua thấu kính yếu.

---

## 4. Giãn nở thời gian hấp dẫn — vì sao GPS phải hiệu chỉnh

> 💡 **Trực giác.** Càng gần khối lượng lớn (không-thời gian cong mạnh), **thời gian chạy chậm hơn**. Đồng hồ dưới chân núi (gần tâm Trái Đất hơn) chạy chậm hơn đồng hồ trên đỉnh núi — chênh lệch nhỏ xíu nhưng đo được.

**Định nghĩa (3 phần):**

- **(a) Là gì** — Giãn nở thời gian hấp dẫn: đồng hồ ở nơi thế hấp dẫn sâu hơn (gần khối lượng) chạy *chậm* hơn đồng hồ ở nơi thế nông hơn.
- **(b) Vì sao quan trọng** — Đây không phải lý thuyết suông: **GPS** dựa vào đồng hồ nguyên tử trên vệ tinh. Nếu không hiệu chỉnh hai hiệu ứng tương đối, định vị sẽ sai lệch ngày càng lớn (cỡ ~10 km mỗi ngày) — vô dụng.
- **(c) Ví dụ trực giác bằng số** — Đồng hồ vệ tinh GPS (cao ~20 200 km) chịu **hai** hiệu ứng ngược chiều:
  - Tương đối **hẹp** (vệ tinh bay nhanh ~3.9 km/s) → đồng hồ chạy *chậm* đi ~7 µs/ngày.
  - Tương đối **tổng quát** (xa Trái Đất → thế hấp dẫn nông hơn → thời gian *nhanh* hơn) → +45 µs/ngày.
  - Tổng: $+45 - 7 = +38 \\ \\mu\\text{s/ngày}$ đồng hồ vệ tinh chạy nhanh hơn mặt đất.

**Walk-through — vì sao 38 µs/ngày là khổng lồ với GPS:**

GPS định vị bằng cách đo thời gian tín hiệu truyền với tốc độ ánh sáng. Sai 38 µs:

$$\\text{sai khoảng cách} = c \\times \\Delta t = 3 \\times 10^{8} \\ \\text{m/s} \\times 38 \\times 10^{-6} \\ \\text{s} \\approx 11\\,400 \\ \\text{m} \\approx 11{,}4 \\ \\text{km}$$

→ Mỗi ngày không hiệu chỉnh, vị trí lệch ~**11 km**. Vì vậy đồng hồ vệ tinh được chỉnh sẵn để bù chính xác +38 µs/ngày.

**4 ví dụ số — chênh lệch nhịp đồng hồ (định tính, dấu):**

| Vị trí đồng hồ | Hiệu ứng SR (tốc độ) | Hiệu ứng GR (thế hấp dẫn) | Xu hướng tổng |
|---|---|---|---|
| Mặt đất (gốc) | 0 | 0 | chuẩn |
| Vệ tinh GPS | chậm ~−7 µs/ngày | nhanh +45 µs/ngày | nhanh +38 µs/ngày |
| Đỉnh Everest | ~0 | nhanh hơn mặt biển (yếu) | nhanh hơn chút |
| Gần lỗ đen | chậm cực mạnh | chậm cực mạnh | chậm rõ rệt |

> ⚠ **Lỗi thường gặp.** Nghĩ chỉ có một hiệu ứng. GPS có **hai** hiệu ứng *ngược chiều*: tốc độ (SR) làm chậm, độ cao (GR) làm nhanh. Phải cộng cả hai (kết quả ròng +38 µs/ngày). Bỏ qua một cái → vẫn sai.

> 🔁 **Dừng lại tự kiểm tra.** Nếu kỹ sư chỉ hiệu chỉnh hiệu ứng tương đối hẹp (−7 µs) mà quên tương đối tổng quát (+45 µs), sai số đồng hồ còn lại mỗi ngày là bao nhiêu?
> <details><summary>Đáp án</summary>Còn +45 µs/ngày chưa bù → tương đương ~13.5 km sai vị trí mỗi ngày. Vẫn hỏng. Cả hai hiệu ứng đều bắt buộc.</details>

---

## 5. Sóng hấp dẫn (Gravitational Waves)

> 💡 **Trực giác.** Quẫy tay trong hồ → gợn nước lan ra. Khi khối lượng lớn tăng tốc dữ dội (vd hai lỗ đen xoáy vào nhau), chúng làm **không-thời gian gợn sóng** — sóng hấp dẫn lan ra với tốc độ ánh sáng, kéo-nén khoảng cách khi đi qua.

**Định nghĩa (3 phần):**

- **(a) Là gì** — Sóng hấp dẫn là gợn lan truyền của độ cong không-thời gian, sinh ra khi khối lượng tăng tốc bất đối xứng. Khi sóng đi qua, nó làm khoảng cách giữa hai điểm *co-giãn* tuần hoàn (theo phương ngang nhau thì ngược pha).
- **(b) Vì sao quan trọng** — Mở ra "thiên văn học sóng hấp dẫn": quan sát các sự kiện *không phát ánh sáng* (lỗ đen sáp nhập) mà kính quang học không bao giờ thấy. Là kiểm chứng trực tiếp cuối cùng còn thiếu của tương đối tổng quát.
- **(c) Ví dụ trực giác bằng số** — **GW150914** (LIGO, 14/9/2015): hai lỗ đen ~36 và ~29 lần khối lượng Mặt Trời sáp nhập thành một lỗ đen ~62 M☉, cách ta ~1.3 tỉ năm ánh sáng. **~3 khối lượng Mặt Trời "biến mất"**, chuyển thành năng lượng sóng hấp dẫn (theo $E = mc^2$). Biến dạng đo được tại LIGO chỉ $\\sim 10^{-21}$ — nhỏ hơn 1/1000 đường kính một proton trên cánh tay 4 km.

**Vì sao 3 M☉ ↔ năng lượng khổng lồ ($E = mc^2$):**

$$\\begin{aligned}
\\Delta E = \\Delta m \\cdot c^2 &= 3 \\times (2 \\times 10^{30} \\ \\text{kg}) \\times (3 \\times 10^{8} \\ \\text{m/s})^2 \\\\
&= 6 \\times 10^{30} \\times 9 \\times 10^{16} \\approx 5{,}4 \\times 10^{47} \\ \\text{J}
\\end{aligned}$$

Trong vài phần nghìn giây, đỉnh công suất sóng hấp dẫn của GW150914 vượt **tổng công suất ánh sáng của mọi ngôi sao trong vũ trụ quan sát được cộng lại** — dù không phát ra ánh sáng nào.

> ❓ **Câu hỏi tự nhiên.** *"Đo biến dạng $10^{-21}$ kiểu gì?"* — LIGO là một giao thoa kế: hai cánh tay laser dài 4 km vuông góc. Sóng hấp dẫn co cánh này, giãn cánh kia → đường đi laser lệch → vân giao thoa đổi. Cách ly rung động cực kỳ tinh vi mới đọc nổi tín hiệu nhỏ hơn proton.

---

## 6. Các kiểm chứng & tóm tắt

| Kiểm chứng | Tiên đoán | Quan sát |
|---|---|---|
| Tiến động Sao Thủy | +43″/thế kỷ | Khớp |
| Lệch ánh sáng (nhật thực 1919) | 1.75″ ở rìa Mặt Trời | Khớp |
| Giãn thời gian hấp dẫn | đồng hồ cao chạy nhanh hơn | GPS, đồng hồ nguyên tử |
| Thấu kính hấp dẫn | cung/vòng Einstein | Quan sát hàng loạt |
| Sóng hấp dẫn | gợn không-thời gian | GW150914 (2015) trở đi |

> 📝 **Tóm tắt toàn bài.**
> - **Tương đối hẹp**: $c$ bất biến → thời gian/không gian co giãn ($\\gamma = \\dfrac{1}{\\sqrt{1 - v^2/c^2}}$).
> - **Tương đối tổng quát**: khối lượng-năng lượng làm cong không-thời gian; hấp dẫn = hình học (analogy tấm cao su, nhớ hạn chế).
> - **Thấu kính hấp dẫn**: khối lượng bẻ cong ánh sáng → cung/vòng/nhiều ảnh; đo cả vật chất tối.
> - **Giãn thời gian hấp dẫn**: GPS phải bù +38 µs/ngày (GR +45, SR −7), nếu không lệch ~11 km/ngày.
> - **Sóng hấp dẫn**: GW150914 — 2 lỗ đen sáp nhập, ~3 M☉ → năng lượng theo $E = mc^2$.

---

## Bài tập

1. **Hệ số Lorentz.** Tính $\\gamma$ cho $v = 0{,}8c$. Một phi hành gia bay $v = 0{,}8c$ trong 5 năm theo đồng hồ riêng. Trên Trái Đất trôi qua bao lâu?

2. **Lệch GPS.** Nếu một hệ định vị bỏ qua *toàn bộ* hiệu chỉnh tương đối (ròng +38 µs/ngày), sau 3 ngày sai số vị trí tích lũy khoảng bao nhiêu km? ($c = 3 \\times 10^{8} \\ \\text{m/s}$.)

3. **Bẻ cong ánh sáng.** Giải thích bằng ngôn ngữ tương đối tổng quát vì sao đám thiên hà có thể tạo "vòng Einstein" từ một thiên hà nền phía sau. Vòng đầy đủ xuất hiện khi nào?

4. **$E = mc^2$ của GW150914.** Hai lỗ đen 36 + 29 M☉ sáp nhập thành 62 M☉. Khối lượng "mất" là bao nhiêu M☉? Đổi sang năng lượng ($1 \\ \\text{M}_\\odot \\approx 2 \\times 10^{30} \\ \\text{kg}$, $c = 3 \\times 10^{8} \\ \\text{m/s}$).

5. **Hai hiệu ứng GPS.** Nêu rõ hiệu ứng nào làm đồng hồ vệ tinh chạy nhanh, hiệu ứng nào làm chậm, và vì sao kết quả ròng là vệ tinh nhanh hơn mặt đất.

---

## Lời giải chi tiết

### Bài 1 — Hệ số Lorentz

$$\\begin{aligned}
\\frac{v^2}{c^2} &= 0{,}8^2 = 0{,}64 \\\\
1 - 0{,}64 &= 0{,}36 \\\\
\\sqrt{0{,}36} &= 0{,}6 \\\\
\\gamma &= \\frac{1}{0{,}6} \\approx 1{,}667
\\end{aligned}$$

Đồng hồ riêng phi hành gia trôi 5 năm. Thời gian Trái Đất:

$$t_{\\text{Trái Đất}} = \\gamma \\times t_{\\text{riêng}} = 1{,}667 \\times 5 \\approx 8{,}33 \\ \\text{năm}$$

→ Trên Trái Đất trôi qua ~**8.3 năm** trong khi phi hành gia chỉ già 5 năm. (Nghịch lý anh em sinh đôi — người bay trẻ hơn.)

### Bài 2 — Lệch GPS tích lũy

Mỗi ngày lệch +38 µs. Sau 3 ngày:

$$\\begin{aligned}
\\Delta t &= 3 \\times 38 \\ \\mu\\text{s} = 114 \\ \\mu\\text{s} = 114 \\times 10^{-6} \\ \\text{s} \\\\
\\text{sai khoảng cách} &= c \\times \\Delta t = 3 \\times 10^{8} \\times 114 \\times 10^{-6} \\approx 34\\,200 \\ \\text{m} \\approx 34{,}2 \\ \\text{km}
\\end{aligned}$$

→ Sau 3 ngày, sai số vị trí tích lũy ~**34 km** — hoàn toàn vô dụng cho dẫn đường. (Khớp với "~11 km/ngày" × 3.)

### Bài 3 — Vòng Einstein

**Lập luận từng bước:**

1. Khối lượng đám thiên hà làm cong không-thời gian quanh nó.
2. Ánh sáng từ thiên hà nền phía sau đi theo đường "thẳng nhất" trên không-thời gian cong → bị bẻ cong khi lướt qua đám.
3. Nếu thiên hà nền, đám (thấu kính), và người quan sát **thẳng hàng gần như hoàn hảo**, ánh sáng bị bẻ đều quanh mọi phía của đám → ta thấy ảnh thiên hà nền *trải thành một vòng tròn* bao quanh đám: **vòng Einstein**.
4. Khi lệch hàng một chút → vòng vỡ thành các **cung** hoặc **nhiều ảnh** thay vì vòng đầy đủ.

Vòng đầy đủ chỉ xuất hiện khi **căn chỉnh nguồn–thấu kính–quan sát viên gần như thẳng hàng tuyệt đối**.

### Bài 4 — $E = mc^2$ của GW150914

**Khối lượng mất:**

$$\\Delta m = (36 + 29) - 62 = 65 - 62 = 3 \\ \\text{M}_\\odot$$

**Đổi sang kg rồi năng lượng:**

$$\\begin{aligned}
\\Delta m &= 3 \\times 2 \\times 10^{30} = 6 \\times 10^{30} \\ \\text{kg} \\\\
E = \\Delta m \\cdot c^2 &= 6 \\times 10^{30} \\times (3 \\times 10^{8})^2 = 6 \\times 10^{30} \\times 9 \\times 10^{16} \\\\
&= 5{,}4 \\times 10^{47} \\ \\text{J}
\\end{aligned}$$

→ **3 khối lượng Mặt Trời** biến mất, phát ra ~**5.4×10⁴⁷ J** dưới dạng sóng hấp dẫn — không một photon ánh sáng nào, nhưng đỉnh công suất vượt cả vũ trụ quan sát được.

### Bài 5 — Hai hiệu ứng GPS

- **Tương đối hẹp (tốc độ):** vệ tinh bay nhanh (~3.9 km/s) → so với mặt đất, đồng hồ chuyển động chạy **chậm** đi (~−7 µs/ngày). Đây là hiệu ứng giãn thời gian do vận tốc.
- **Tương đối tổng quát (độ cao):** vệ tinh ở xa Trái Đất hơn → ở thế hấp dẫn **nông hơn** → đồng hồ chạy **nhanh** hơn (~+45 µs/ngày).
- **Ròng:** GR (+45) lớn hơn SR (−7) về độ lớn → tổng \`+38 µs/ngày\`: đồng hồ vệ tinh chạy **nhanh hơn** mặt đất. Hệ thống GPS chỉnh sẵn tần số đồng hồ vệ tinh để bù đúng lượng này.

---

## Code & Minh họa

- **Visualization tương tác**: [visualization.html](./visualization.html) — gồm:
  - **Tấm cao su (độ cong không-thời gian)**: lưới phẳng bị một khối lượng kéo lõm; slider khối lượng → độ lõm sâu thêm; có hạt thử lượn theo đường cong.
  - **Demo bẻ cong ánh sáng / thấu kính**: nguồn sáng phía sau một khối lượng; slider khối lượng → tia sáng bẻ cong mạnh dần, từ lệch nhẹ tới tạo nhiều ảnh / vòng Einstein.
  - **Calculator $\\gamma$ & GPS**: nhập $v/c$ → $\\gamma$; minh họa hai hiệu ứng tương đối cộng lại thành +38 µs/ngày và sai khoảng cách tương ứng.

---

## Bài tiếp theo

→ [Lesson 08 — Số phận vũ trụ](../lesson-08-fate-of-universe/): bài cuối lộ trình. Dùng lại hấp dẫn (kéo co lại) đối đầu năng lượng tối (đẩy giãn ra) để hỏi: vũ trụ kết thúc bằng Big Freeze, Big Rip hay Big Crunch?

**Tham khảo chéo:** $E = mc^2$ và vật lý hiện đại → [\`../../../Physics/03-Optics-ModernPhysics/\`](../../../Physics/03-Optics-ModernPhysics/).
`;
