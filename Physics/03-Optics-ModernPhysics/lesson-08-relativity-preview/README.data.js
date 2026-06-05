// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: Physics/03-Optics-ModernPhysics/lesson-08-relativity-preview/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 08 (T3) — Tương đối hẹp preview

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Hiểu **2 nguyên lý** của Tương đối hẹp Einstein (1905).
- Biết các hệ quả "kỳ lạ": **dãn thời gian, co độ dài, đồng thời tương đối**.
- Hiểu **E = mc²** — phương trình nổi tiếng nhất vật lý.
- Biết khi nào dùng tương đối (v gần c) và khi nào dùng Newton (v << c).

## Kiến thức tiền đề

Cơ học Newton (Lesson 02 T1) và sóng EM (Lesson 08 T2).

---

## 1. Hai nguyên lý của Tương đối hẹp

Einstein (1905) đặt ra 2 tiền đề đơn giản nhưng cách mạng:

1. **Nguyên lý tương đối**: Các định luật vật lý có cùng dạng trong mọi hệ quy chiếu quán tính (không gia tốc). Không thể xác định bạn đang "đứng yên" hay "chuyển động đều" trong vũ trụ.

2. **Bất biến tốc độ ánh sáng**: Tốc độ ánh sáng **c = 3 × 10⁸ m/s** trong chân không **giống nhau cho mọi quan sát viên**, bất kể họ chuyển động thế nào hay nguồn ánh sáng chuyển động thế nào.

💡 **Tại sao "kỳ lạ"?** Vì:
- Trong Newton: nếu xe chạy 100 km/h và bạn ném bóng về phía trước 30 km/h, người đứng yên thấy bóng đi **130 km/h** (cộng vận tốc).
- Theo Einstein: nếu xe chạy 0.5c và bạn bật đèn pin về phía trước, người đứng yên KHÔNG thấy ánh sáng đi 1.5c. Họ thấy ánh sáng đi **đúng c** (không phải 1.5c). 

Điều này dường như mâu thuẫn — nhưng được xác nhận trong **mọi thí nghiệm**.

❓ **Câu hỏi tự nhiên của người đọc**

- *"Nếu ánh sáng luôn đi đúng c với mọi người, thì cái gì 'co giãn' để bù lại?"* Chính KHÔNG GIAN và THỜI GIAN. Để tốc độ (= quãng đường/thời gian) giữ nguyên c cho mọi quan sát viên, độ dài và nhịp thời gian phải thay đổi tùy người quan sát → dẫn tới co độ dài và dãn thời gian.
- *"Hệ quy chiếu quán tính là gì?"* Hệ không gia tốc (đứng yên hoặc chuyển động thẳng đều). Tương đối HẸP chỉ xét hệ quán tính; có gia tốc/hấp dẫn cần tương đối TỔNG QUÁT.
- *"Vì sao Galileo/Newton cộng vận tốc lại sai?"* Không hẳn sai — chỉ là xấp xỉ rất tốt khi v << c. Ở v gần c, công thức cộng vận tốc cổ điển sụp đổ, phải dùng công thức tương đối.

⚠ **Lỗi thường gặp**

- **Cộng vận tốc kiểu Newton với ánh sáng.** "Xe 0.5c bật đèn → ánh sáng đi 1.5c" là SAI. Người ngoài vẫn đo ánh sáng đi đúng c.
- **Tưởng hiệu ứng tương đối thấy rõ ở mọi tốc độ.** Chỉ đáng kể khi v GẦN c. Ở tốc độ đời thường (máy bay, tên lửa) hiệu ứng nhỏ tới mức cần đồng hồ nguyên tử mới đo được.

🔁 **Dừng lại tự kiểm tra**

1. Một phi thuyền bay 0.6c và bắn một tia laser về phía trước. Người đứng yên đo tốc độ tia laser bằng bao nhiêu?
2. Hai nguyên lý của tương đối hẹp là gì?

<details><summary>Đáp án</summary>

1. Đúng **c** (3×10⁸ m/s) — KHÔNG phải 1.6c. Tốc độ ánh sáng bất biến với mọi quan sát viên.
2. (1) Định luật vật lý giống nhau trong mọi hệ quán tính; (2) Tốc độ ánh sáng c bất biến với mọi quan sát viên.

</details>

### 📝 Tóm tắt mục 1

- Hai tiên đề: định luật vật lý như nhau trong mọi hệ quán tính + tốc độ ánh sáng c bất biến.
- Hệ quả: không gian và thời gian không tuyệt đối — chúng "co giãn" để giữ c không đổi.
- Cộng vận tốc Newton chỉ là xấp xỉ khi v << c.

---

## 2. Hệ quả 1 — Dãn thời gian (Time Dilation)

Đồng hồ chuyển động **đi chậm hơn** so với đồng hồ đứng yên (theo quan sát của người đứng yên):

\`\`\`
Δt' = Δt / √(1 − v²/c²) = γ · Δt
\`\`\`

trong đó γ = 1/√(1 − v²/c²) = **hệ số Lorentz**.

💡 **Trực giác — dãn thời gian**: "đồng hồ chuyển động chạy chậm". Với người đứng yên nhìn theo, mỗi tích tắc của đồng hồ bay nhanh kéo dài hơn → thời gian của vật chuyển động "trôi chậm lại".

**Định nghĩa đầy đủ — hệ số Lorentz γ**:
- **(a) Là gì**: hệ số KHÔNG đơn vị \`γ = 1/√(1 − v²/c²)\`, luôn ≥ 1, cho biết thời gian dãn / độ dài co bao nhiêu lần. v = 0 → γ = 1 (không hiệu ứng); v → c → γ → ∞.
- **(b) Vì sao cần**: γ là "số nhân" gói trọn mọi hiệu ứng tương đối — nhân vào Δt (dãn thời gian), chia vào L (co độ dài), nhân vào khối lượng-năng lượng. Một con số, dùng cho tất cả.
- **(c) Ví dụ số kèm đơn vị**: v = 0.8c → \`γ = 1/√(1 − 0.64) = 1/√0.36 = 1/0.6 ≈ 1.667\`. Nghĩa là đồng hồ bay 0.8c chạy chậm 1.667 lần; 1 giây của nó = 1.667 giây của người đứng yên.

### 2.1. Ví dụ

**Phi hành gia bay với v = 0.9c trong 10 năm (theo đồng hồ của họ)**. Đồng hồ Trái Đất chạy bao nhiêu năm?
- γ = 1/√(1 − 0.81) = 1/√0.19 ≈ 2.29.
- Trái Đất: 10 × 2.29 = **22.9 năm** đã trôi.
- → Phi hành gia "trẻ hơn" 12.9 năm so với người ở Trái Đất.

Đây là **paradox sinh đôi** nổi tiếng (paradox chỉ là tên gọi — không có mâu thuẫn).

### 2.2. Thí nghiệm thực

- **Muon trong tia vũ trụ**: muon có chu kỳ phân rã 2.2 μs. Sinh ra ở 60 km trên cao, nếu không có dãn thời gian, chỉ đi được 660 m trước khi tan rã. Nhưng thực tế chúng tới mặt đất → dãn thời gian thật.
- **Đồng hồ trên máy bay**: đồng hồ atomic trên máy bay chạy chậm hơn đồng hồ trên mặt đất một chút (~ nano giây). Đã được đo (Hafele-Keating 1971).

❓ **Câu hỏi tự nhiên của người đọc**

- *"Δt và Δt' cái nào là thời gian của người chuyển động?"* \`Δt\` (thời gian riêng) đo bởi đồng hồ ĐI CÙNG sự kiện (trên phi thuyền). \`Δt' = γΔt\` là thời gian DÀI HƠN đo bởi người đứng yên nhìn theo. Người bay già chậm hơn.
- *"Paradox sinh đôi mâu thuẫn ở đâu?"* Thực ra KHÔNG mâu thuẫn. Người bay phải tăng/giảm tốc (đổi hệ quy chiếu) để quay về → tình huống hai người không đối xứng → người bay trẻ hơn rõ ràng, không nghịch lý.
- *"Hiệu ứng này thật không hay chỉ lý thuyết?"* Hoàn toàn thật — muon vũ trụ tới được mặt đất và đồng hồ máy bay (Hafele-Keating) là bằng chứng đo được.

⚠ **Lỗi thường gặp**

- **Đảo Δt và Δt'.** Thời gian riêng (đo trên vật chuyển động) là NGẮN nhất. Người ngoài đo được thời gian DÀI hơn (×γ). Nhầm chiều → kết luận ngược (tưởng người bay già nhanh hơn).
- **Áp công thức khi v << c rồi ngạc nhiên thấy hiệu ứng ~0.** Đúng vậy — ở tốc độ thường γ ≈ 1, dãn thời gian không đáng kể. Đó là lý do đời sống hằng ngày không thấy.

🔁 **Dừng lại tự kiểm tra**

1. Phi hành gia bay v = 0.6c trong 8 năm theo đồng hồ riêng. Trên Trái Đất trôi qua bao lâu? (γ ở 0.6c ?)
2. Trong hai người (một bay nhanh, một ở yên), ai già chậm hơn?

<details><summary>Đáp án</summary>

1. \`γ = 1/√(1 − 0.36) = 1/√0.64 = 1/0.8 = 1.25\`. Trái Đất: \`8 × 1.25 = 10 năm\`.
2. Người **bay nhanh** già chậm hơn (đồng hồ chuyển động chạy chậm).

</details>

### 📝 Tóm tắt mục 2

- Dãn thời gian: \`Δt' = γΔt\`, đồng hồ chuyển động chạy chậm.
- Hệ số Lorentz \`γ = 1/√(1 − v²/c²) ≥ 1\`; v=0 → γ=1, v→c → γ→∞.
- Xác nhận thực nghiệm: muon vũ trụ, đồng hồ nguyên tử trên máy bay (Hafele-Keating 1971).

---

## 3. Hệ quả 2 — Co độ dài (Length Contraction)

Vật chuyển động **ngắn hơn** theo chiều chuyển động:

\`\`\`
L = L₀ · √(1 − v²/c²) = L₀ / γ
\`\`\`

**Ví dụ**: Một thanh dài 1 m đứng yên. Bay với v = 0.9c → quan sát viên đứng yên đo được L = 1/2.29 = **0.437 m**.

(Theo trục vuông góc chuyển động, không co.)

💡 **Trực giác — co độ dài**: vật chuyển động "dẹt lại" theo chiều di chuyển dưới mắt người đứng yên. Càng gần c càng dẹt; vuông góc với hướng đi thì không đổi.

❓ **Câu hỏi tự nhiên của người đọc**

- *"L₀ là độ dài nào?"* \`L₀\` = độ dài RIÊNG, đo trong hệ vật đứng yên (dài nhất). Người thấy vật chuyển động đo được \`L = L₀/γ\` ngắn hơn.
- *"Vật co theo mọi chiều không?"* CHỈ co theo chiều CHUYỂN ĐỘNG. Chiều vuông góc giữ nguyên — nên vật bay nhanh "dẹt" lại chứ không "nhỏ đều".
- *"Muon vũ trụ giải thích bằng co độ dài thế nào?"* Theo hệ của muon, thời gian sống ngắn nhưng quãng đường 60 km bị CO lại còn vài trăm mét → muon đủ thời gian tới mặt đất. Hai cách nhìn (dãn thời gian / co độ dài) cùng kết luận.

⚠ **Lỗi thường gặp**

- **Nhân thay vì chia γ.** Độ dài CO lại: \`L = L₀/γ\` (chia, ra ngắn hơn). Thời gian DÃN ra: \`Δt' = γΔt\` (nhân, ra dài hơn). Lẫn hai cái → sai chiều.
- **Co cả chiều vuông góc.** Không — chỉ chiều dọc theo vận tốc bị co.

🔁 **Dừng lại tự kiểm tra**

1. Phi thuyền dài 100 m (đứng yên) bay v = 0.8c (γ = 1.667). Người ở Trái Đất đo dài bao nhiêu?
2. Một quả cầu bay nhanh — người đứng yên thấy nó thành hình gì?

<details><summary>Đáp án</summary>

1. \`L = L₀/γ = 100/1.667 ≈ 60 m\`.
2. Hình **dẹt** (ellipsoid) — co theo chiều chuyển động, giữ nguyên hai chiều vuông góc.

</details>

### 📝 Tóm tắt mục 3

- Co độ dài: \`L = L₀/γ\`, vật chuyển động ngắn lại theo chiều di chuyển.
- Chỉ co theo phương chuyển động; phương vuông góc không đổi.
- Độ dài riêng L₀ (đo trong hệ vật) là dài nhất.

---

## 4. Hệ quả 3 — E = mc²

Hệ thức nổi tiếng nhất:
\`\`\`
E = m · c²
\`\`\`

trong đó m là **khối lượng nghỉ**. E là năng lượng tổng (khi đứng yên).

💡 **Ý nghĩa**: khối lượng và năng lượng là **2 dạng của cùng một thứ**. m chỉ là "năng lượng đông đặc" — có thể chuyển hóa thành năng lượng (vd phản ứng hạt nhân) và ngược lại.

### Ví dụ trực giác

**1 gam khối lượng = ?**
- E = 0.001 × (3 × 10⁸)² = **9 × 10¹³ J** = 90 TJ.
- Đủ điện cho **20,000 hộ gia đình trong 1 năm**.
- Bom Hiroshima (~ 15 kt TNT) tương đương ~ 0.7 gam khối lượng chuyển hóa.

Đó là tại sao phản ứng hạt nhân (chuyển m → E theo công thức này) cực kỳ mạnh.

❓ **Câu hỏi tự nhiên của người đọc**

- *"Vì sao một lượng khối lượng nhỏ cho năng lượng khổng lồ?"* Vì hệ số \`c² = 9×10¹⁶\` cực lớn. Chỉ 1 g (0.001 kg) cho \`E = 0.001 × 9×10¹⁶ = 9×10¹³ J\` = 90 TJ. c² là "tỉ giá quy đổi" khối lượng ↔ năng lượng, rất cao.
- *"E = mc² áp dụng cho mọi thứ hay chỉ phản ứng hạt nhân?"* Mọi thứ — cả phản ứng hóa học cũng giảm khối lượng cực nhỏ. Nhưng chỉ phản ứng HẠT NHÂN có Δm đủ lớn để đo và khai thác (hụt khối ~0.1%, gấp triệu lần hóa học).
- *"Khối lượng có thật sự 'biến mất'?"* Nó CHUYỂN thành năng lượng. Tổng (khối lượng + năng lượng) bảo toàn; chỉ là một dạng đổi sang dạng kia.

⚠ **Lỗi thường gặp**

- **Quên bình phương c.** \`E = mc²\`, KHÔNG phải \`mc\`. Bỏ bình phương → sai 8 bậc độ lớn.
- **Lẫn đơn vị: m phải tính bằng kg.** Đề cho gram phải đổi sang kg (1 g = 0.001 kg) trước khi thay vào, nếu không sai 1000 lần.

🔁 **Dừng lại tự kiểm tra**

1. Tính năng lượng tương đương của 2 g khối lượng (J).
2. Vì sao phản ứng hạt nhân tỏa năng lượng lớn hơn phản ứng hóa học hàng triệu lần?

<details><summary>Đáp án</summary>

1. \`E = mc² = 0.002 × (3×10⁸)² = 0.002 × 9×10¹⁶ = 1.8 × 10¹⁴ J\`.
2. Vì độ hụt khối Δm trong phản ứng hạt nhân (~0.1% khối lượng) lớn hơn hóa học (~10⁻⁹) khoảng triệu lần. Nhân với c² khổng lồ → năng lượng lớn hơn triệu lần.

</details>

### 📝 Tóm tắt mục 4

- \`E = mc²\`: khối lượng và năng lượng là hai dạng của cùng một thứ.
- c² là "tỉ giá quy đổi" cực lớn → khối lượng nhỏ cho năng lượng khổng lồ (1 g = 9×10¹³ J).
- Phản ứng hạt nhân khai thác hụt khối ~0.1% → mạnh gấp triệu lần phản ứng hóa học.

---

## 5. Khi nào dùng Newton vs Einstein?

| v/c | γ | Newton sai số | Dùng |
|-----|---|---------------|------|
| 0.01 | 1.00005 | 0.005% | Newton OK |
| 0.1 | 1.005 | 0.5% | Newton xấp xỉ |
| 0.5 | 1.155 | 15% | Phải dùng Einstein |
| 0.9 | 2.29 | Không thể dùng Newton |
| 0.99 | 7.09 | Einstein bắt buộc |
| 1.0 | ∞ | Chỉ đạt được cho photon |

→ Trong đời sống thường ngày (v ≤ 1000 km/h), v/c ~ 10⁻⁶ → Newton chính xác đến vài ppm. Chỉ ở quy mô hạt cao năng (máy gia tốc), GPS (chính xác cao), du hành vũ trụ tốc độ cao mới cần Einstein.

💡 **Trực giác**: Einstein không "phủ nhận" Newton — Newton là TRƯỜNG HỢP RIÊNG của Einstein khi v << c (γ ≈ 1). Giống như bản đồ phẳng vẫn dùng tốt cho khu phố, chỉ sai khi vẽ cả Trái Đất cong.

❓ **Câu hỏi tự nhiên của người đọc**

- *"Khi nào BẮT BUỘC dùng Einstein?"* Khi v đủ gần c để γ lệch đáng kể khỏi 1 — thường từ ~10% c trở lên (γ ≈ 1.005, sai số 0.5%). Hạt trong máy gia tốc, tia vũ trụ, electron tốc độ cao.
- *"GPS đời thường có cần tương đối không?"* CÓ — dù vệ tinh chỉ ~14 000 km/h, độ chính xác yêu cầu nano giây nên sai lệch tương đối tích lũy ~10 km/ngày nếu bỏ qua. Đây là ứng dụng hằng ngày thật sự.
- *"v/c của máy bay phản lực bằng bao nhiêu?"* ~1000 km/h ≈ 280 m/s → \`v/c ≈ 10⁻⁶\` → γ lệch khỏi 1 chỉ ~10⁻¹² → hoàn toàn bỏ qua được, Newton chính xác.

⚠ **Lỗi thường gặp**

- **Dùng Newton cho hạt gần c.** Ở v = 0.9c, Newton sai hoàn toàn (γ = 2.29). Phải dùng Einstein.
- **Tưởng GPS không cần tương đối vì vệ tinh 'chậm'.** Sai — yêu cầu độ chính xác cực cao khuếch đại hiệu ứng nhỏ thành lỗi km/ngày.

🔁 **Dừng lại tự kiểm tra**

1. Một electron đi v = 0.99c. Dùng Newton hay Einstein? (γ ≈ ?)
2. Vì sao ta không cảm nhận hiệu ứng tương đối khi đi máy bay?

<details><summary>Đáp án</summary>

1. \`γ = 1/√(1 − 0.9801) = 1/√0.0199 ≈ 7.09\` → lệch xa 1 → **bắt buộc Einstein**.
2. v máy bay ~280 m/s, \`v/c ≈ 10⁻⁶\` → γ ≈ 1 tới ~10⁻¹² → hiệu ứng nhỏ hơn mọi khả năng cảm nhận; Newton chính xác.

</details>

### 📝 Tóm tắt mục 5

- Newton là trường hợp riêng của Einstein khi v << c (γ ≈ 1).
- Cần Einstein khi v ≳ 10% c (máy gia tốc, tia vũ trụ) hoặc khi đòi độ chính xác cực cao (GPS).
- Đời sống thường (v/c ~ 10⁻⁶): Newton chính xác tới vài ppm.

---

## 6. Bài tập

### Bài tập

**Bài 1**: Tính γ cho v = 0.8c.

**Bài 2**: Phi hành gia bay 5 năm với v = 0.95c. Trái Đất trôi qua bao nhiêu năm?

**Bài 3**: Tính năng lượng 1 kg theo E = mc².

**Bài 4**: Vì sao không thể đạt v = c?

**Bài 5**: GPS có cần tính tương đối không?

### Lời giải

**Bài 1**: γ = 1/√(1 − 0.64) = 1/√0.36 = 1/0.6 = **5/3 ≈ 1.667**.

**Bài 2**: γ = 1/√(1 − 0.9025) = 1/√0.0975 ≈ 3.2. Đồng hồ Trái Đất: 5 × 3.2 = **16 năm**.

**Bài 3**: E = 1 · (3×10⁸)² = **9 × 10¹⁶ J = 90 PJ**. Đủ cho cả thành phố lớn dùng vài tháng.

**Bài 4**: γ = 1/√(1 − v²/c²). Khi v → c, γ → ∞. Năng lượng cần để gia tốc tiếp = γ·mc² → ∞ → cần năng lượng vô hạn. Chỉ photon (m = 0) đạt được c.

**Bài 5**: CÓ. GPS vệ tinh chuyển động khoảng 14,000 km/h và ở quỹ đạo cao → cả tương đối hẹp (đồng hồ chậm) và tương đối tổng quát (g khác, đồng hồ nhanh hơn) đều có hiệu lực. Nếu không hiệu chỉnh, lỗi vị trí sẽ ~ 10 km/ngày. Hiệu chỉnh → chính xác 5-10 m. **Đây là ứng dụng thực tế hằng ngày của thuyết tương đối**.

---

## 7. 🎉 HOÀN THÀNH PHYSICS!

Bạn vừa hoàn thành **24/24 lesson** trên 3 tier:
- **Tier 1 — Mechanics**: từ động học → Newton → công năng lượng → vật rắn → dao động.
- **Tier 2 — Thermo & EM**: nhiệt → khí lý tưởng → entropy → điện tích → mạch → từ trường → sóng EM.
- **Tier 3 — Optics & Modern**: quang hình → quang sóng → photon → Bohr → hạt nhân → fission/fusion → tương đối.

Vật lý cơ bản từ Newton đến Einstein — đầy đủ trong tầm tay.

## 📝 Tổng kết

1. **2 tiên đề Einstein**: định luật giống nhau ở mọi hệ quán tính + tốc độ c bất biến.
2. **Dãn thời gian**: Δt' = γ·Δt. Đồng hồ chuyển động chạy chậm.
3. **Co độ dài**: L = L₀/γ. Vật chuyển động ngắn lại theo chiều di chuyển.
4. **E = mc²**: m và E là 2 dạng của cùng 1 thứ. 1 g = 9 × 10¹³ J.
5. **Khi nào Einstein**: v gần c (~ 10% c trở lên). Newton OK đến đó.
`;
