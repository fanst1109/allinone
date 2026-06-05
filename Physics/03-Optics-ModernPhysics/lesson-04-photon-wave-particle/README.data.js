// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: Physics/03-Optics-ModernPhysics/lesson-04-photon-wave-particle/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 04 (T3) — Photon & Lưỡng tính sóng-hạt

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Hiểu **photon** — "hạt ánh sáng", và vì sao ánh sáng vừa là sóng vừa là hạt.
- Phân tích **hiệu ứng quang điện** (Einstein 1905) — chứng minh ánh sáng có tính hạt.
- Tính **năng lượng photon**: E = h·f.
- Hiểu **bước sóng de Broglie**: mọi vật chất đều có tính sóng λ = h/p.
- Hiểu hệ quả: cơ học cổ điển (Newton) là **trường hợp đặc biệt** của cơ học lượng tử.

## Kiến thức tiền đề

- [Lesson 03 (T3) — Quang sóng](../lesson-03-wave-optics/) — biết tính sóng.

---

## 1. Khủng hoảng tia tử ngoại — Black body radiation

💡 **Trực giác**: hãy hình dung năng lượng ánh sáng không "chảy liên tục như nước" mà "đóng gói rời rạc như tiền xu" — bạn chỉ trả được bội số của một đồng xu nhỏ nhất \`hf\`, không trả được nửa xu. Đó là ý tưởng "lượng tử hóa" (quantization) làm sụp đổ vật lý cổ điển.

Trước 1900, lý thuyết sóng cổ điển dự đoán: vật đen ở nhiệt độ T phát ra **năng lượng vô hạn** ở bước sóng cực ngắn (UV). Thực nghiệm: không phải vậy → "khủng hoảng tia tử ngoại".

**Planck (1900)**: Giả sử năng lượng phát xạ chỉ được phát ra theo **gói rời rạc (quanta)**: E = n·h·f, với h = **6.626 × 10⁻³⁴ J·s** (hằng số Planck).

→ Quy luật bức xạ vật đen đúng. Đây là **bước ngoặt** — vật lý lượng tử ra đời.

❓ **Câu hỏi tự nhiên của người đọc**

- *"'Khủng hoảng tia tử ngoại' nghĩa là gì?"* Lý thuyết cổ điển dự đoán vật nóng phát NĂNG LƯỢNG VÔ HẠN ở bước sóng ngắn (UV) — vô lý vì năng lượng phải hữu hạn. Mâu thuẫn này gọi là "khủng hoảng".
- *"Giả thuyết của Planck giải quyết thế nào?"* Bằng cách giả sử năng lượng chỉ phát theo GÓI rời rạc \`E = nhf\` (không liên tục), năng lượng ở UV bị "chặn" → kết quả khớp thực nghiệm.

⚠ **Lỗi thường gặp**: tưởng "lượng tử hóa" nghĩa là ánh sáng yếu đi. Không — nghĩa là năng lượng đến theo BƯỚC rời rạc (bội của hf), không liên tục mượt mà.

🔁 **Dừng lại tự kiểm tra**

1. Giá trị và đơn vị của hằng số Planck h?
2. Theo Planck, năng lượng phát xạ có giá trị bất kỳ hay rời rạc?

<details><summary>Đáp án</summary>

1. \`h = 6.626 × 10⁻³⁴ J·s\`.
2. **Rời rạc** — chỉ là bội nguyên của \`hf\` (E = n·h·f).

</details>

---

## 2. Hiệu ứng quang điện (Einstein 1905)

💡 **Trực giác — photon là "hạt ánh sáng"**: thay vì coi ánh sáng là sóng dàn trải, hãy hình dung nó là chùm "viên đạn" rời rạc (photon), mỗi viên mang năng lượng \`hf\`. Một electron chỉ nuốt được TRỌN một viên — nếu viên đó quá yếu (f thấp) thì dù bắn cả triệu viên electron vẫn không bứt ra.

### 2.1. Hiện tượng

Chiếu ánh sáng vào bề mặt kim loại → electron bật ra (nếu f đủ lớn).

**Quan sát kỳ lạ**:
- Tăng cường độ ánh sáng → nhiều electron hơn, nhưng KE mỗi electron không đổi.
- Tăng tần số f → KE electron tăng.
- Dưới một tần số tới hạn f₀ → KHÔNG có electron nào dù ánh sáng cường độ cao.

Lý thuyết sóng cổ điển: không giải thích được. Phải cần lượng tử.

### 2.2. Einstein — Ánh sáng là "gói photon"

Einstein đề xuất: ánh sáng = chùm **photon** (gói năng lượng rời rạc). Mỗi photon có:
\`\`\`
E = h · f
\`\`\`

Khi photon đập vào electron, **TOÀN BỘ năng lượng h·f** truyền sang. Nếu h·f > Φ (công thoát):
\`\`\`
KE_max = h·f − Φ
\`\`\`

Khớp hoàn toàn quan sát:
- Cường độ ánh sáng = số photon/s → nhiều photon → nhiều electron. Nhưng mỗi photon vẫn có h·f → KE không đổi.
- f thấp (h·f < Φ) → photon không đủ năng lượng → không electron nào bật.

Einstein đoạt **Nobel 1921** cho phát hiện này (không phải tương đối!).

**Định nghĩa đầy đủ — năng lượng photon E = hf**:
- **(a) Là gì**: mỗi photon mang một "gói" năng lượng cố định \`E = h·f\` (J), tỉ lệ thuận với TẦN SỐ f (Hz), với \`h = 6.626 × 10⁻³⁴ J·s\`.
- **(b) Vì sao cần**: mô hình sóng cổ điển nói năng lượng phụ thuộc CƯỜNG ĐỘ (biên độ) → không giải thích nổi quang điện. E = hf chuyển trọng tâm sang TẦN SỐ → giải thích vì sao ánh sáng đỏ yếu (f thấp) không bứt được electron dù rọi mạnh, còn UV yếu (f cao) lại bứt được.
- **(c) Ví dụ số kèm đơn vị**: ánh sáng lục \`f = 5 × 10¹⁴ Hz\`. \`E = (6.63×10⁻³⁴)(5×10¹⁴) = 3.3 × 10⁻¹⁹ J\`. Đổi sang eV: \`3.3×10⁻¹⁹ / 1.6×10⁻¹⁹ ≈ 2.07 eV\`.

❓ **Câu hỏi tự nhiên của người đọc**

- *"Tăng cường độ (độ sáng) có làm electron văng nhanh hơn không?"* KHÔNG. Cường độ = số photon/giây → bứt được NHIỀU electron hơn, nhưng động năng MỖI electron chỉ phụ thuộc f (qua \`KE = hf − Φ\`). Tần số mới quyết định "lực đẩy" mỗi electron.
- *"Vì sao có tần số ngưỡng f₀?"* Cần \`hf ≥ Φ\` (công thoát) thì electron mới bứt ra. \`f₀ = Φ/h\`. Dưới f₀, dù rọi sáng cỡ nào cũng không có electron nào văng ra.
- *"Photon có khối lượng không?"* Khối lượng nghỉ = 0, nhưng vẫn có năng lượng \`E = hf\` và động lượng \`p = E/c = h/λ\`.

⚠ **Lỗi thường gặp**

- **Tưởng năng lượng photon phụ thuộc cường độ ánh sáng.** Sai — chỉ phụ thuộc TẦN SỐ. Đèn đỏ chói (cường độ cao) vẫn không bứt electron mà đèn UV mờ lại bứt được.
- **Lẫn lộn f và λ.** \`E = hf = hc/λ\`. f tăng thì E tăng, nhưng λ tăng thì E GIẢM (vì \`λ = c/f\`). Ánh sáng tím (λ nhỏ) năng lượng cao hơn đỏ (λ lớn).
- **Lẫn eV và J.** \`1 eV = 1.6 × 10⁻¹⁹ J\`. Quên đổi → sai 19 bậc độ lớn.

🔁 **Dừng lại tự kiểm tra**

1. Photon tia X có \`f = 3 × 10¹⁸ Hz\`. Năng lượng bằng bao nhiêu (J và eV)?
2. Kim loại có công thoát Φ = 2 eV. Photon λ = 400 nm (E ≈ 3.1 eV) có bứt được electron không? Nếu có, động năng cực đại bằng bao nhiêu?

<details><summary>Đáp án</summary>

1. \`E = hf = (6.63×10⁻³⁴)(3×10¹⁸) = 1.99 × 10⁻¹⁵ J\`. Đổi eV: \`1.99×10⁻¹⁵ / 1.6×10⁻¹⁹ ≈ 12 400 eV ≈ 12.4 keV\`.
2. \`E = 3.1 eV > Φ = 2 eV\` → CÓ bứt. \`KE_max = hf − Φ = 3.1 − 2 = 1.1 eV\`.

</details>

### 2.3. Ý nghĩa lớn

Trước Einstein, người ta đã biết ánh sáng = sóng (Young, Maxwell). Sau Einstein, biết thêm: ánh sáng cũng = hạt. → **Lưỡng tính sóng-hạt** (wave-particle duality).

### 📝 Tóm tắt mục 1-2

- Planck: năng lượng lượng tử hóa, E = n·h·f.
- Einstein: ánh sáng = photon (gói rời rạc). E = h·f mỗi photon.
- Quang điện: KE_max = h·f − Φ. f phải > f₀ = Φ/h.

---

## 3. Lưỡng tính sóng-hạt

### 3.1. de Broglie (1924) — Vật chất cũng có tính sóng

Nếu ánh sáng (vốn được coi là sóng) có tính hạt, thì **vật chất** (vốn là hạt) cũng có tính sóng?

de Broglie đề xuất: mọi vật có **bước sóng**:
\`\`\`
λ = h / p = h / (m · v)
\`\`\`

Đây là một trong những đề xuất "điên rồ" nhất vật lý, nhưng được xác nhận:
- **Davisson-Germer (1927)**: bắn electron qua tinh thể → thấy giao thoa! Electron có tính sóng.
- Sau đó: neutron, nguyên tử, thậm chí **phân tử C₆₀ (buckyball)** cũng cho giao thoa.

### 3.2. Vì sao ta không thấy vật to có tính sóng?

Vì λ = h/p **cực nhỏ** với vật to.

**Ví dụ — Quả bóng 0.5 kg chạy 10 m/s**:
- λ = 6.6e-34 / (0.5 × 10) = **1.3 × 10⁻³⁴ m**.
- Nhỏ hơn proton 10²⁰ lần — không thể đo được. Trông như "hạt".

**Ví dụ — Electron trong nguyên tử**:
- v ≈ 10⁶ m/s, m = 9.1e-31 kg.
- λ = 6.6e-34 / (9.1e-31 × 10⁶) = **7.3 × 10⁻¹⁰ m** = 0.73 nm.
- Cỡ kích thước nguyên tử → tính sóng rất quan trọng.

→ **Quy luật**: λ_de_Broglie >> kích thước hệ → tính sóng nổi bật. λ << kích thước → tính hạt.

### 3.3. Diễn giải hiện đại — Cơ học lượng tử

Mọi thứ trong vũ trụ vừa là sóng vừa là hạt. Tùy thí nghiệm bạn dùng, sẽ "thấy" mặt nào:
- Thí nghiệm 2 khe → thấy giao thoa → mặt sóng.
- Hiệu ứng quang điện → thấy hạt → mặt hạt.

Đây không phải mâu thuẫn — mà là **bản chất kép** của thực tại lượng tử.

**Định nghĩa đầy đủ — bước sóng de Broglie λ = h/p**:
- **(a) Là gì**: mọi vật chuyển động có một bước sóng \`λ = h/p = h/(mv)\` (m), với p = động lượng (kg·m/s). Vật càng nặng/càng nhanh → p càng lớn → λ càng nhỏ.
- **(b) Vì sao cần**: để định lượng "khi nào tính sóng của vật chất quan trọng". So λ với kích thước hệ: λ ~ kích thước → hiệu ứng sóng (giao thoa) nổi bật; λ << kích thước → vật xử sự như hạt thuần.
- **(c) Ví dụ số kèm đơn vị**: electron \`v = 10⁶ m/s\`, \`m = 9.1×10⁻³¹ kg\`. \`λ = (6.63×10⁻³⁴)/(9.1×10⁻³¹ × 10⁶) = 7.3 × 10⁻¹⁰ m = 0.73 nm\` — cỡ kích thước nguyên tử → tính sóng quyết định.

❓ **Câu hỏi tự nhiên của người đọc**

- *"Vì sao ta không thấy con người hay quả bóng có tính sóng?"* Vì λ = h/p của vật vĩ mô cực nhỏ (h ~ 10⁻³⁴ rất bé). Quả bóng 0.5 kg đi 10 m/s có λ ~ 10⁻³⁴ m — nhỏ hơn hạt nhân, không thiết bị nào đo được.
- *"Sóng vật chất là sóng của cái gì?"* Là **sóng xác suất** — biên độ bình phương cho xác suất tìm thấy hạt tại vị trí đó (diễn giải Born). Không phải sóng "vật chất dao động lên xuống" như sóng nước.
- *"Bắn 1 electron qua 2 khe thì nó qua khe nào?"* Theo lượng tử, electron đi qua **cả hai khe đồng thời** (như sóng), tự giao thoa, rồi "co cụm" thành 1 chấm khi chạm màn.

⚠ **Lỗi thường gặp**

- **Tưởng chỉ ánh sáng mới lưỡng tính.** de Broglie: MỌI vật chất (electron, neutron, nguyên tử, cả phân tử C₆₀) đều có tính sóng — đã xác nhận thực nghiệm.
- **Dùng nhầm vận tốc thay động lượng.** \`λ = h/p\`, với \`p = mv\`. Quên nhân khối lượng → sai hoàn toàn về độ lớn.

🔁 **Dừng lại tự kiểm tra**

1. Tính λ de Broglie của neutron (m = 1.67×10⁻²⁷ kg) đi v = 2000 m/s.
2. Vì sao máy "kính hiển vi điện tử" nhìn được vật nhỏ hơn kính hiển vi quang học?

<details><summary>Đáp án</summary>

1. \`λ = (6.63×10⁻³⁴)/(1.67×10⁻²⁷ × 2000) = 6.63×10⁻³⁴/3.34×10⁻²⁴ ≈ 2.0 × 10⁻¹⁰ m = 0.2 nm\`. Cỡ khoảng cách nguyên tử → neutron dùng để nhiễu xạ tinh thể.
2. Độ phân giải giới hạn bởi bước sóng. Electron tăng tốc có λ de Broglie nhỏ hơn ánh sáng nhìn thấy (~500 nm) hàng nghìn lần → "nhìn" được chi tiết nhỏ hơn nhiều.

</details>

### 📝 Tóm tắt mục 3

- de Broglie: λ = h/p. Mọi vật chất có tính sóng.
- Davisson-Germer xác nhận với electron.
- Vật to: λ quá nhỏ → trông như hạt thuần. Vật nhỏ (electron): λ ~ kích thước → tính sóng nổi.

---

## 4. Bài tập

### Bài tập

**Bài 1**: Tính năng lượng photon ánh sáng vàng λ = 580 nm.

**Bài 2**: Kim loại có công thoát Φ = 4 eV. Bước sóng tới hạn?

**Bài 3**: Tính λ_de_Broglie của electron chạy v = 10⁶ m/s.

**Bài 4**: Tính λ_de_Broglie của xe ô tô 1000 kg chạy 30 m/s. So sánh với kích thước nguyên tử.

**Bài 5**: Vì sao thí nghiệm 2 khe vẫn cho giao thoa khi chỉ bắn 1 electron tại 1 thời điểm?

### Lời giải

**Bài 1**: E = hc/λ = (6.63e-34)(3e8)/5.8e-7 = **3.43 × 10⁻¹⁹ J** = 2.14 eV.

**Bài 2**: f₀ = Φ/h = 4·1.6e-19/6.63e-34 = 9.66e14 Hz. λ₀ = c/f₀ = **310 nm** (UV).

**Bài 3**: λ = h/(m·v) = 6.63e-34/(9.1e-31·10⁶) = **7.3 × 10⁻¹⁰ m**.

**Bài 4**: λ = 6.63e-34/(1000·30) = **2.2 × 10⁻³⁸ m**. Nhỏ hơn nguyên tử 10²⁸ lần → không thể đo, không bao giờ thấy tính sóng. Đó là tại sao ô tô "luôn là hạt".

**Bài 5**: Đây là một trong các thí nghiệm "kỳ diệu" nhất vật lý. Khi bắn từng electron 1, ban đầu trên màn chỉ là các chấm rời rạc (electron = hạt). Nhưng sau nhiều electron tích lũy → **vẫn xuất hiện vân giao thoa**. Diễn giải: mỗi electron là sóng đi qua **cả 2 khe đồng thời**, tự giao thoa với chính mình → định xác suất đến từng vị trí trên màn. Đây là bản chất lượng tử — mỗi electron "biết" về cả 2 khe dù ta chỉ bắn 1.

---

## 5. Bài tiếp theo

[Lesson 05 — Nguyên tử Bohr → Orbital](../lesson-05-atom-bohr-orbital/).

## 📝 Tổng kết

1. **Planck (1900)**: E lượng tử hóa, h = 6.63 × 10⁻³⁴ J·s.
2. **Einstein (1905)**: ánh sáng = photon. E = h·f. Giải thích quang điện.
3. **de Broglie (1924)**: mọi vật có λ = h/p.
4. **Lưỡng tính sóng-hạt**: ánh sáng và vật chất đều có cả 2 mặt.
5. **Quy luật**: vật to → λ quá nhỏ → trông hạt. Vật nhỏ → λ ~ kích thước → sóng nổi.
`;
