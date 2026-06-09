// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: Physics/03-Optics-ModernPhysics/lesson-03-wave-optics/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 03 (T3) — Quang sóng (Wave Optics)

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Hiểu **giao thoa ánh sáng** — bằng chứng quan trọng nhất rằng ánh sáng là sóng.
- Phân biệt **giao thoa tăng cường** (constructive) và **giao thoa triệt tiêu** (destructive).
- Tính khoảng cách vân sáng/tối trong thí nghiệm **Young hai khe**: $\\Delta y = \\frac{\\lambda L}{d}$.
- Hiểu **nhiễu xạ** — sóng bị "bẻ" khi qua khe hẹp.
- Hiểu vì sao giao thoa và nhiễu xạ chỉ thấy với $\\lambda \\sim$ kích thước khe (quy luật bước sóng so với kích thước).

## Kiến thức tiền đề

- [Lesson 08 (T1) — Sóng cơ](../../01-Mechanics/lesson-08-oscillation-waves/) — biết $v = \\lambda f$.
- [Lesson 08 (T2) — Sóng điện từ](../../02-Thermo-Electromagnetism/lesson-08-em-waves/).

---

## 1. Giao thoa ánh sáng

### 1.1. Khái niệm

**Giao thoa** = hiện tượng 2 sóng kết hợp với nhau → tạo ra vùng **tăng cường** (chỗ sáng hơn) và **triệt tiêu** (chỗ tối).

💡 **Ý nghĩa**: hiện tượng này CHỈ XẢY RA với sóng. Hạt thì không. Nên nếu thấy giao thoa → vật đó là sóng. Thí nghiệm giao thoa của Thomas Young (1801) chứng minh ánh sáng là sóng.

### 1.2. Điều kiện giao thoa

2 sóng **kết hợp** (coherent) = có:
- Cùng tần số (cùng $\\lambda$).
- Hiệu pha không đổi theo thời gian.

→ Để có giao thoa rõ ràng, 2 sóng phải **từ cùng nguồn** (vd cùng đi qua 2 khe từ 1 đèn).

### 1.3. Tăng cường vs Triệt tiêu

Tại điểm P bất kỳ, hiệu đường đi từ 2 khe đến P $= \\Delta l$.

- **$\\Delta l = n\\lambda$** (n nguyên): 2 sóng cùng pha → **tăng cường** → vân **SÁNG**.
- **$\\Delta l = (n + \\frac{1}{2})\\lambda$**: 2 sóng ngược pha → **triệt tiêu** → vân **TỐI**.

**Định nghĩa đầy đủ — hiệu quang lộ (path difference) $\\Delta l$**:
- **(a) Là gì**: hiệu KHOẢNG CÁCH (đơn vị độ dài) mà hai sóng đi từ hai nguồn đến cùng một điểm P. $\\Delta l = r_2 - r_1$.
- **(b) Vì sao cần**: vì hai sóng giao thoa tăng cường hay triệt tiêu hoàn toàn quyết định bởi việc chúng tới P CÙNG PHA hay NGƯỢC PHA, mà điều đó phụ thuộc $\\Delta l$ so với $\\lambda$. $\\Delta l$ gói trọn thông tin "lệch pha" thành một độ dài đo được.
- **(c) Ví dụ số kèm đơn vị**: $\\lambda = 500 \\text{ nm}$. Nếu $\\Delta l = 1000 \\text{ nm} = 2\\lambda$ → số nguyên lần $\\lambda$ → cùng pha → vân SÁNG. Nếu $\\Delta l = 750 \\text{ nm} = 1{,}5\\lambda$ → nửa lẻ → ngược pha → vân TỐI.

❓ **Câu hỏi tự nhiên của người đọc**

- *"Vì sao 2 bóng đèn thường không cho giao thoa?"* Vì chúng không **kết hợp** (coherent): pha ánh sáng mỗi bóng nhảy ngẫu nhiên hàng tỷ lần/giây, độc lập nhau → vân giao thoa "rung lắc" siêu nhanh → mắt thấy trung bình mờ đều. Phải cùng nguồn (chia qua 2 khe) hoặc laser.
- *"Năng lượng đi đâu ở vân tối?"* Không mất — nó được "dồn" sang vân sáng. Tổng năng lượng bảo toàn; giao thoa chỉ phân bố lại sáng-tối.
- *"$\\Delta l = 0$ thì sao?"* $\\Delta l = 0 = 0 \\cdot \\lambda$ → cùng pha → vân sáng trung tâm (chính giữa màn).

⚠ **Lỗi thường gặp**

- **Đảo điều kiện sáng/tối.** Vân SÁNG khi $\\Delta l = n\\lambda$ (nguyên lần); vân TỐI khi $\\Delta l = (n + \\frac{1}{2})\\lambda$ (nửa lẻ). Nhiều người nhớ ngược.
- **Tưởng cần 2 nguồn vật lý riêng.** Thực tế chỉ cần 1 nguồn kết hợp chia làm hai (2 khe) — đó mới đảm bảo hiệu pha cố định.

🔁 **Dừng lại tự kiểm tra**

1. $\\lambda = 600 \\text{ nm}$. Tại điểm P, hiệu quang lộ $\\Delta l = 1500 \\text{ nm}$. Vân sáng hay tối?
2. Tại điểm Q, $\\Delta l = 1800 \\text{ nm}$. Vân gì?

<details><summary>Đáp án</summary>

1. $\\Delta l/\\lambda = 1500/600 = 2{,}5 = (2 + \\frac{1}{2})$ → nửa lẻ → ngược pha → vân **TỐI**.
2. $1800/600 = 3$ → nguyên lần → cùng pha → vân **SÁNG**.

</details>

### 📝 Tóm tắt mục 1

- Giao thoa = bằng chứng sóng (Young 1801).
- 2 nguồn kết hợp + hiệu đường $= n\\lambda$ → sáng; $(n + 0{,}5)\\lambda$ → tối.

---

## 2. Thí nghiệm Young hai khe

### 2.1. Mô tả

Ánh sáng đơn sắc đi qua **2 khe hẹp** cách nhau d, chiếu lên màn xa L. Trên màn xuất hiện các **vân sáng-tối đan xen**.

### 2.2. Công thức khoảng cách vân

$$\\Delta y = \\frac{\\lambda L}{d}$$

trong đó:
- **$\\Delta y$** = khoảng cách giữa 2 vân sáng (hoặc 2 vân tối) liên tiếp.
- **$\\lambda$** = bước sóng ánh sáng.
- **$L$** = khoảng cách từ khe đến màn.
- **$d$** = khoảng cách giữa 2 khe.

### 2.3. Ví dụ số

**Ví dụ**: Đèn laser $\\lambda = 600 \\text{ nm} = 6 \\times 10^{-7} \\text{ m}$. $d = 0{,}2 \\text{ mm} = 2 \\times 10^{-4} \\text{ m}$. $L = 2 \\text{ m}$.
- $\\Delta y = 6 \\times 10^{-7} \\cdot 2 / (2 \\times 10^{-4}) =$ **$6 \\times 10^{-3} \\text{ m} = 6 \\text{ mm}$**.
- Trên màn cách 2 m, vân sáng cách nhau 6 mm.

### 2.4. Vì sao d phải rất nhỏ?

Nếu d quá lớn → $\\Delta y$ quá nhỏ → vân quá sát nhau, không phân biệt được. Đó là tại sao thí nghiệm Young cần khe rất hẹp (sub-mm).

💡 **Trực giác**: $\\Delta y = \\frac{\\lambda L}{d}$ — ba cách "kéo giãn" vân cho dễ thấy: tăng $\\lambda$ (ánh sáng đỏ vân thưa hơn xanh), tăng L (màn xa hơn), hoặc giảm d (khe sát nhau hơn).

❓ **Câu hỏi tự nhiên của người đọc**

- *"Đổi sang ánh sáng đỏ thì vân thưa hay dày hơn?"* Đỏ có $\\lambda$ lớn hơn xanh → $\\Delta y$ lớn hơn → vân **thưa** hơn (cách xa nhau hơn).
- *"Vì sao cần ánh sáng đơn sắc?"* Ánh sáng trắng = nhiều $\\lambda$, mỗi $\\lambda$ cho hệ vân với $\\Delta y$ khác nhau → các vân chồng lên nhau, nhòe màu, khó đo. Đơn sắc (1 $\\lambda$) cho vân sắc nét.
- *"$\\Delta y$ đo giữa 2 vân sáng hay vân sáng-tối?"* Giữa 2 vân SÁNG liên tiếp (hoặc 2 vân tối liên tiếp). Vân sáng và vân tối kề nhau cách $\\Delta y/2$.

⚠ **Lỗi thường gặp**

- **Quên đổi đơn vị về mét.** d thường cho bằng mm ($\\times 10^{-3}$), $\\lambda$ bằng nm ($\\times 10^{-9}$). Trộn đơn vị → sai cả triệu lần. Luôn đưa hết về mét trước khi thay số.
- **Lẫn d và L.** d = khoảng cách GIỮA 2 KHE (rất nhỏ, sub-mm); L = khoảng cách KHE-MÀN (lớn, ~m). Đặt nhầm → kết quả vô lý.
- **Đếm sai số khoảng.** "5 vân sáng liên tiếp" tạo ra **4 khoảng** Δy, không phải 5. Chia tổng độ dài cho 4.

🔁 **Dừng lại tự kiểm tra**

1. $\\lambda = 400 \\text{ nm}$, $d = 0{,}1 \\text{ mm}$, $L = 1{,}5 \\text{ m}$. Tính $\\Delta y$.
2. Đo được 6 vân sáng liên tiếp trải dài 10 mm. Mỗi $\\Delta y$ bằng bao nhiêu?

<details><summary>Đáp án</summary>

1. $\\Delta y = (4 \\times 10^{-7} \\times 1{,}5)/(1 \\times 10^{-4}) = 6 \\times 10^{-7}/10^{-4} = 6 \\times 10^{-3} \\text{ m} = 6 \\text{ mm}$.
2. 6 vân = **5 khoảng** → $\\Delta y = 10 \\text{ mm} / 5 = 2 \\text{ mm}$.

</details>

### 📝 Tóm tắt mục 2

- Young 2 khe: ánh sáng đơn sắc → vân sáng-tối trên màn.
- $\\Delta y = \\frac{\\lambda L}{d}$. $\\lambda$ nhỏ → vân sát nhau.

---

## 3. Nhiễu xạ (Diffraction)

### 3.1. Khái niệm

**Nhiễu xạ** = hiện tượng sóng "bẻ" khi đi qua khe hẹp hoặc qua rìa vật cản.

💡 **Ý nghĩa**: ánh sáng không hoàn toàn đi thẳng — khi gặp khe có kích thước $\\sim \\lambda$, nó tỏa ra mọi hướng phía sau khe (gần như nguồn điểm mới).

### 3.2. Quy luật quan trọng — kích thước khe vs bước sóng

- Khe **lớn** hơn $\\lambda$ rất nhiều → ánh sáng đi thẳng (quang hình áp dụng được).
- Khe **gần bằng** $\\lambda$ → nhiễu xạ rõ rệt, ánh sáng "tỏa".
- Khe **nhỏ hơn** $\\lambda$ → ánh sáng phát ra mọi hướng (gần như nguồn điểm).

→ Đó là tại sao ta dễ thấy giao thoa với khe $\\sim 0{,}1 \\text{ mm}$ (lớn hơn $\\lambda$ ánh sáng 100×) nhưng cần điều kiện đặc biệt.

### 3.3. Nhiễu xạ qua khe đơn

Sau khe có chiều rộng a, vân tối đầu tiên ở góc:

$$\\sin\\theta = \\frac{\\lambda}{a}$$

→ Khe **càng hẹp** → ánh sáng càng tỏa rộng (góc lớn). Khe rộng → đi thẳng.

### 3.4. Ví dụ trực giác

**Ví dụ — Sóng nước trong cảng**: sóng đi qua khe giữa 2 đập biển. Khe hẹp ($\\sim \\lambda$ sóng) → sóng tỏa ra mọi hướng vào trong cảng. Khe rộng → sóng tiếp tục đi thẳng.

**Ví dụ — Sóng âm vòng qua góc**: tiếng nói có $\\lambda \\sim 1 \\text{ m}$ → có thể vòng qua góc tòa nhà (rìa = vật cản, nhiễu xạ). Nhưng ánh sáng có $\\lambda \\sim 500 \\text{ nm}$ → không vòng qua góc được ($a \\gg \\lambda$).

❓ **Câu hỏi tự nhiên của người đọc**

- *"Nhiễu xạ và giao thoa khác nhau thế nào?"* Cùng bản chất (chồng chất sóng). "Nhiễu xạ" nhấn mạnh sóng tỏa ra sau MỘT khe/rìa; "giao thoa" nhấn mạnh sự kết hợp của nhiều sóng (vd 2 khe). Vân Young thực ra là giao thoa của hai sóng đã nhiễu xạ.
- *"Vì sao nghe được người nói sau góc tường nhưng không nhìn thấy họ?"* Vì $\\lambda$ âm ($\\sim 1 \\text{ m}$) cỡ kích thước góc tường → âm nhiễu xạ vòng qua. $\\lambda$ ánh sáng ($\\sim 500 \\text{ nm}$) quá nhỏ so với góc tường → đi gần như thẳng, không vòng → không thấy.
- *"Khe rộng ra thì chùm sáng sau khe rộng hay hẹp?"* Khe RỘNG → góc tỏa NHỎ ($\\sin\\theta = \\frac{\\lambda}{a}$, a lớn thì $\\theta$ nhỏ) → chùm gần như đi thẳng. Khe hẹp → tỏa rộng.

⚠ **Lỗi thường gặp**

- **Tưởng khe càng rộng càng tỏa nhiều.** Ngược lại: khe HẸP tỏa rộng (góc lớn). $\\sin\\theta = \\frac{\\lambda}{a}$ — a nhỏ thì $\\theta$ lớn.
- **Nghĩ ánh sáng "luôn đi thẳng tuyệt đối".** Đó chỉ là xấp xỉ quang hình, đúng khi khe/vật cản $\\gg \\lambda$. Khi kích thước $\\sim \\lambda$ thì nhiễu xạ rõ.

🔁 **Dừng lại tự kiểm tra**

1. Ánh sáng $\\lambda = 500 \\text{ nm}$ qua khe rộng $a = 1 \\text{ μm}$. Tính góc tới vân tối đầu tiên.
2. Vì sao radio ($\\lambda \\sim$ vài trăm m) thu được tín hiệu dù có núi/nhà che, còn ánh sáng thì không "vòng" qua được?

<details><summary>Đáp án</summary>

1. $\\sin\\theta = \\frac{\\lambda}{a} = (500 \\times 10^{-9})/(1 \\times 10^{-6}) = 0{,}5 \\to \\theta = 30^\\circ$. Khe cỡ $2\\lambda$ → tỏa khá rộng.
2. $\\lambda$ sóng radio cỡ hàng chục–trăm mét, tương đương hoặc lớn hơn kích thước núi/nhà → nhiễu xạ vòng qua dễ. $\\lambda$ ánh sáng ($\\sim 500 \\text{ nm}$) bé hơn vật cản hàng triệu lần → không nhiễu xạ đáng kể → đi thẳng, bị chặn.

</details>

### 📝 Tóm tắt mục 3

- Nhiễu xạ: sóng "bẻ" khi qua khe hoặc rìa.
- Nhiễu xạ rõ khi kích thước khe $\\sim \\lambda$.
- Khe nhỏ → tỏa nhiều; khe lớn → đi thẳng.

---

## 4. Bài tập

### Bài tập

**Bài 1**: Thí nghiệm Young với $\\lambda = 500 \\text{ nm}$, $d = 0{,}5 \\text{ mm}$, $L = 1 \\text{ m}$. Tính $\\Delta y$.

**Bài 2**: Trong thí nghiệm Young, khoảng cách 5 vân sáng liên tiếp đo được 4 mm. $d = 0{,}3 \\text{ mm}$, $L = 1{,}5 \\text{ m}$. Tính $\\lambda$.

**Bài 3**: Vì sao ta không thấy giao thoa khi bật 2 bóng đèn?

**Bài 4**: Sóng âm tần số 343 Hz đi qua cửa rộng 1 m ($\\lambda_{\\text{âm}} = 1 \\text{ m}$). Có nhiễu xạ rõ không?

**Bài 5**: Vì sao đĩa CD hoặc tem chuột máy tính có cầu vồng khi quan sát?

### Lời giải

**Bài 1**: $\\Delta y = 5 \\times 10^{-7} \\cdot 1 / (5 \\times 10^{-4}) =$ **$10^{-3} \\text{ m} = 1 \\text{ mm}$**.

**Bài 2**: 5 vân sáng = 4 khoảng → 1 $\\Delta y = 1 \\text{ mm}$. $\\lambda = \\Delta y \\cdot d/L = 10^{-3} \\cdot 3 \\times 10^{-4} / 1{,}5 =$ **$2 \\times 10^{-7} \\text{ m} = 200 \\text{ nm}$** (UV).

**Bài 3**: 2 bóng đèn KHÔNG là 2 nguồn kết hợp. Pha của ánh sáng từ mỗi bóng thay đổi ngẫu nhiên $\\sim 10^9$ lần/giây (do dao động electron trong dây). 2 bóng không đồng bộ → hiệu pha luôn đổi → giao thoa "rung lắc" với tốc độ siêu nhanh → mắt thấy trung bình = không có giao thoa. Phải có nguồn LASER (kết hợp) hoặc chia ánh sáng từ 1 nguồn duy nhất qua 2 khe (như Young).

**Bài 4**: $\\lambda \\approx$ kích thước cửa → CÓ nhiễu xạ rõ. Đó là tại sao bạn nghe được giọng nói từ phòng bên dù không nhìn thấy — âm thanh "vòng" qua cửa và rìa.

**Bài 5**: Mặt CD có hàng triệu rãnh siêu nhỏ, cách nhau $\\sim 1 \\text{ μm}$ — tương đương $\\lambda$ ánh sáng. Mỗi rãnh phản xạ như 1 nguồn → giao thoa giữa các rãnh → các bước sóng (màu) khác nhau bị phản xạ ở các góc khác nhau → cầu vồng. Tương tự cánh bướm, lông công.

---

## 5. Bài tiếp theo

[Lesson 04 — Photon &amp; Lưỡng tính sóng-hạt](../lesson-04-photon-wave-particle/).

## 📝 Tổng kết

1. **Giao thoa** = bằng chứng ánh sáng là sóng. Cần 2 nguồn kết hợp.
2. **Young 2 khe**: $\\Delta y = \\frac{\\lambda L}{d}$.
3. **Nhiễu xạ**: sóng bẻ khi qua khe $\\sim \\lambda$.
4. **Quy luật**: khe $\\ll \\lambda$ → tỏa rộng; khe $\\gg \\lambda$ → đi thẳng.
`;
