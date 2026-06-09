# Lesson 04 — Enzyme & chuyển hóa

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Hiểu **chuyển hóa (metabolism)** là gì và phân biệt **đồng hóa (anabolic)** với **dị hóa (catabolic)** — biết cái nào thu năng lượng (endergonic), cái nào tỏa năng lượng (exergonic).
- Giải thích **năng lượng hoạt hóa (activation energy, Ea)** là "rào cản" của phản ứng và **vì sao enzyme tăng tốc phản ứng bằng cách HẠ Ea** mà **không** đổi ΔG, không bị tiêu hao — liên hệ trực tiếp tới động học (kinetics) đã học ở `Chemistry`.
- Mô tả **cơ chế xúc tác**: trung tâm hoạt động (active site), phức enzyme–cơ chất (enzyme–substrate complex), mô hình khóa–chìa (lock and key) và khớp cảm ứng (induced fit).
- Phân tích **các yếu tố ảnh hưởng tốc độ enzyme**: nhiệt độ, pH, nồng độ cơ chất — vẽ và đọc được đường cong tối ưu, hiểu hiện tượng **biến tính (denaturation)** và **bão hòa (saturation)**.
- Phân biệt **ức chế cạnh tranh (competitive inhibition)** với **ức chế không cạnh tranh (noncompetitive / allosteric)**.
- Tính được **năng lượng giải phóng từ n phân tử ATP** (~7.3 kcal/mol mỗi liên kết), hiểu **chu trình ATP ⇌ ADP** là "tiền tệ năng lượng (energy currency)" của tế bào.

## Kiến thức tiền đề

- **Protein là gì, cấu trúc 4 bậc, biến tính** — [Lesson 01 — Phân tử sinh học](../lesson-01-biomolecules/) (enzyme là một *loại* protein; nguyên lý "hình dạng quyết định chức năng" là chìa khóa của bài này).
- **Động học & cân bằng (kinetics & equilibrium)**: tốc độ phản ứng, năng lượng hoạt hóa, vai trò chất xúc tác (catalyst) — [`Chemistry/01-Structure/lesson-08-kinetics-equilibrium`](../../../Chemistry/01-Structure/lesson-08-kinetics-equilibrium/). Bài này nói lại phần Ea khi cần.
- **Nhiệt hóa học (thermochemistry)**: phản ứng tỏa nhiệt/thu nhiệt (exothermic/endothermic), ΔH, kcal/mol — [`Chemistry/02-Reactions-Thermo/lesson-04-thermochemistry`](../../../Chemistry/02-Reactions-Thermo/lesson-04-thermochemistry/).

---

## 1. Chuyển hóa — đồng hóa và dị hóa

### 💡 Trực giác / Hình dung

Hãy hình dung tế bào như một **nhà máy LEGO** hoạt động không ngừng. Có hai loại dây chuyền chạy song song: dây chuyền **lắp ráp** (ghép các mảnh nhỏ thành mô hình lớn — *tốn* công, phải bơm năng lượng vào) và dây chuyền **tháo dỡ** (đập mô hình lớn thành mảnh nhỏ — *nhả* năng lượng ra). Lắp ráp là **đồng hóa**, tháo dỡ là **dị hóa**. Tổng tất cả dây chuyền trong nhà máy = **chuyển hóa (metabolism)**.

### 1.1. Định nghĩa

**Chuyển hóa (metabolism)** là tổng tất cả các phản ứng hóa học diễn ra trong tế bào (hoặc cơ thể). Chia làm hai nhánh ngược chiều:

| Nhánh | Tên tiếng Anh | Làm gì | Năng lượng |
|-------|---------------|--------|------------|
| **Đồng hóa** | anabolic | xây phân tử lớn từ phân tử nhỏ (vd: amino acid → protein) | **thu** năng lượng (endergonic, ΔG > 0) |
| **Dị hóa** | catabolic | phân giải phân tử lớn thành nhỏ (vd: glucose → CO₂ + H₂O) | **tỏa** năng lượng (exergonic, ΔG < 0) |

Năng lượng tỏa ra từ dị hóa được "gói" vào ATP, rồi ATP "trả tiền" cho đồng hóa. Đây gọi là **bắt cặp năng lượng (energy coupling)** — học kỹ ở §6.

### 1.2. Endergonic vs exergonic (nhắc lại từ thermochemistry)

- **Exergonic** (ΔG < 0): phản ứng tự diễn ra, **giải phóng** năng lượng tự do. Ví dụ: thủy phân ATP, đốt glucose.
- **Endergonic** (ΔG > 0): phản ứng **không** tự diễn ra, phải **được cấp** năng lượng. Ví dụ: tổng hợp protein, tổng hợp glucose ở thực vật (quang hợp).

> **Lưu ý quan trọng**: ΔG (đổi năng lượng tự do) cho biết phản ứng có **tự diễn ra hay không** — đây là vấn đề **nhiệt động (thermodynamics)**. Còn phản ứng diễn ra **nhanh hay chậm** là vấn đề **động học (kinetics)** — do năng lượng hoạt hóa Ea quyết định (§2). Hai chuyện hoàn toàn khác nhau.

### ❓ Câu hỏi tự nhiên của người đọc

**Q: Phản ứng exergonic (ΔG < 0) "tự diễn ra" thì sao vẫn cần enzyme?**
A: Vì "tự diễn ra" (nhiệt động) **không** có nghĩa "diễn ra nhanh" (động học). Glucose + O₂ → CO₂ + H₂O có ΔG rất âm (rất "muốn" xảy ra), nhưng một bát đường để trên bàn **không** tự bốc cháy ở nhiệt độ phòng — vì rào Ea quá cao. Enzyme hạ rào Ea để phản ứng xảy ra ở tốc độ hữu ích cho sự sống, ở 37°C.

**Q: Sao cơ thể không làm hết bằng dị hóa cho gọn, mà còn đồng hóa làm gì?**
A: Vì cơ thể vừa cần **năng lượng** (lấy từ dị hóa), vừa cần **xây dựng và sửa chữa** (cơ bắp, enzyme, DNA, màng — đều cần đồng hóa). Sống = liên tục phá cái cũ để lấy năng lượng và xây cái mới. Hai nhánh phải cân bằng.

### 🔁 Dừng lại tự kiểm tra

1. Tổng hợp 1 chuỗi protein từ amino acid là đồng hóa hay dị hóa? Thu hay tỏa năng lượng?
2. Tiêu hóa (thủy phân) tinh bột thành glucose là nhánh nào?

<details>
<summary>Đáp án</summary>

1. **Đồng hóa (anabolic)** — xây phân tử lớn (protein) từ phân tử nhỏ (amino acid). **Thu** năng lượng (endergonic), phải dùng ATP.
2. **Dị hóa (catabolic)** — phân giải phân tử lớn (tinh bột) thành nhỏ (glucose) bằng thủy phân. Tỏa năng lượng (exergonic).
</details>

### 📝 Tóm tắt mục 1

- Chuyển hóa = tổng mọi phản ứng trong tế bào, gồm đồng hóa (xây, thu năng lượng) và dị hóa (phá, tỏa năng lượng).
- ΔG cho biết phản ứng *có tự diễn ra không* (nhiệt động); Ea cho biết *nhanh hay chậm* (động học) — hai chuyện khác nhau.
- Năng lượng từ dị hóa được gói vào ATP rồi trả cho đồng hóa (energy coupling).

---

## 2. Năng lượng hoạt hóa và vai trò của enzyme

### 💡 Trực giác / Hình dung

Hình dung một viên đá nằm trong thung lũng, muốn lăn sang thung lũng thấp hơn bên cạnh — nhưng giữa hai thung lũng có một **ngọn đồi** chắn ngang. Dù đích đến thấp hơn (phản ứng exergonic, "muốn" xảy ra), viên đá vẫn phải được đẩy **lên đỉnh đồi trước** mới lăn xuống được. Chiều cao ngọn đồi = **năng lượng hoạt hóa (Ea)**. Enzyme giống một người **đào thấp ngọn đồi xuống** (hoặc mở một đường hầm) — viên đá vượt qua dễ hơn nhiều, nhưng **độ cao hai thung lũng không đổi** (ΔG không đổi).

### 2.1. Năng lượng hoạt hóa (Ea) là gì

**Năng lượng hoạt hóa (activation energy, Ea)** là lượng năng lượng tối thiểu cần cung cấp để phản ứng **bắt đầu** xảy ra — tức để các phân tử cơ chất đạt **trạng thái chuyển tiếp (transition state)**, nơi liên kết cũ bắt đầu gãy và liên kết mới bắt đầu hình thành.

- Ea **cao** → ít phân tử có đủ năng lượng vượt rào → phản ứng **chậm**.
- Ea **thấp** → nhiều phân tử vượt được → phản ứng **nhanh**.

### 2.2. Enzyme = chất xúc tác sinh học (biological catalyst)

**Enzyme** là chất xúc tác sinh học (hầu hết là protein) có 3 tính chất cốt lõi:

1. **Hạ Ea** → tăng tốc phản ứng (thường hàng triệu đến hàng tỉ lần).
2. **Không bị tiêu hao** — sau phản ứng enzyme trở lại nguyên vẹn, tái sử dụng được nhiều lần.
3. **Không đổi ΔG, không đổi điểm cân bằng (equilibrium)** — enzyme chỉ làm phản ứng đến cân bằng **nhanh hơn**, chứ không đẩy cân bằng về một phía. Liên hệ trực tiếp tới `Chemistry/01-Structure/lesson-08-kinetics-equilibrium`: chất xúc tác tăng tốc cả chiều thuận lẫn chiều nghịch như nhau.

### 2.3. Bốn ví dụ số cụ thể về hạ Ea

Tốc độ phản ứng phụ thuộc Ea theo phương trình Arrhenius: tỉ lệ tăng tốc ≈ `e^(ΔEa / RT)`. Với `R = 8.314 J/(mol·K)`, ở `T = 310 K` (37°C, thân nhiệt người): `RT ≈ 2577 J/mol ≈ 2.577 kJ/mol`.

**Ví dụ 1 — hạ Ea đi 10 kJ/mol**: tăng tốc ≈ `e^(10000/2577) = e^3.88 ≈ **48 lần**`.

**Ví dụ 2 — hạ Ea đi 20 kJ/mol**: tăng tốc ≈ `e^(20000/2577) = e^7.76 ≈ **2,350 lần**`.

**Ví dụ 3 — hạ Ea đi 30 kJ/mol**: tăng tốc ≈ `e^(30000/2577) = e^11.64 ≈ **113,000 lần**`. (Mỗi 10 kJ/mol hạ thêm nhân tốc độ lên ~48 lần — số mũ tăng nhanh khủng khiếp.)

**Ví dụ 4 — catalase phân hủy H₂O₂**: phản ứng $2\,\text{H}_2\text{O}_2 \rightarrow 2\,\text{H}_2\text{O} + \text{O}_2$ không enzyme có Ea ≈ 75 kJ/mol; enzyme catalase hạ xuống ≈ 8 kJ/mol — hạ ~67 kJ/mol. Kết quả: catalase phân hủy tới ~**10⁶ phân tử H₂O₂/giây** trên mỗi phân tử enzyme (đây là **turnover number** — sẽ gặp lại ở §3 và §7). Đó là lý do bôi oxy già (H₂O₂) lên vết thương thấy sủi bọt: catalase trong mô giải phóng O₂ cực nhanh.

### ⚠ Lỗi thường gặp

- **Nghĩ "enzyme cung cấp năng lượng cho phản ứng"**: SAI. Enzyme **không** cấp năng lượng và **không** làm phản ứng endergonic tự xảy ra. Nó chỉ **hạ rào Ea**. Năng lượng để đẩy phản ứng đến vẫn đến từ ΔG (hoặc từ ATP qua coupling).
- **Nghĩ "enzyme làm phản ứng tỏa nhiều năng lượng hơn"**: SAI. ΔG (năng lượng giải phóng) **không đổi** dù có hay không enzyme. Chỉ **tốc độ** thay đổi.
- **Nghĩ "enzyme bị dùng hết sau phản ứng"**: SAI. Enzyme tái sử dụng — một phân tử enzyme xử lý hàng nghìn–triệu phân tử cơ chất mỗi giây.
- **Lẫn lộn ΔG với Ea**: ΔG = chênh lệch năng lượng **đầu–cuối** (quyết định tự xảy ra hay không); Ea = chiều cao **rào ở giữa** (quyết định nhanh/chậm). Enzyme đổi Ea, không đổi ΔG.

### ❓ Câu hỏi tự nhiên của người đọc

**Q: Nếu enzyme không đổi cân bằng, dùng nó để làm gì?**
A: Để **tốc độ**. Không enzyme, nhiều phản ứng sống còn (tiêu hóa, hô hấp) sẽ mất hàng giờ, hàng năm — quá chậm để duy trì sự sống. Enzyme đưa chúng về thang giây/mili-giây ở 37°C. Cân bằng vẫn ở chỗ cũ, nhưng ta **đến đó kịp lúc**.

**Q: Nhiệt độ cũng tăng tốc phản ứng — sao cơ thể không cứ tăng nhiệt thay vì dùng enzyme?**
A: Vì protein (kể cả enzyme) **biến tính** khi nóng quá (§4). Đun cơ thể lên 60°C để tăng tốc sẽ làm chính enzyme và mọi protein mất hình dạng — chết. Enzyme cho phép tăng tốc mà giữ nhiệt độ an toàn 37°C.

### 🔁 Dừng lại tự kiểm tra

1. Một phản ứng có ΔG = −50 kJ/mol và Ea = 80 kJ/mol. Thêm enzyme hạ Ea xuống 30 kJ/mol. Hỏi: (a) ΔG mới bằng bao nhiêu? (b) Phản ứng nhanh hơn hay chậm hơn?
2. Vì sao bôi oxy già lên vết thương lại sủi bọt, mà đổ oxy già lên bàn gỗ thì không?

<details>
<summary>Đáp án</summary>

1. (a) ΔG **vẫn = −50 kJ/mol** — enzyme không đổi ΔG. (b) **Nhanh hơn nhiều**, vì Ea hạ từ 80 xuống 30 kJ/mol (hạ 50 kJ/mol). Ước tính tăng tốc ≈ `e^(50000/2577) ≈ e^19.4 ≈ 2.7×10⁸ lần` ở 37°C.
2. Mô sống chứa enzyme **catalase** phân hủy H₂O₂ thành H₂O + O₂ (khí → bọt) cực nhanh. Bàn gỗ không có catalase nên H₂O₂ phân hủy rất chậm (Ea cao), không thấy bọt.
</details>

### 📝 Tóm tắt mục 2

- Ea = rào năng lượng để phản ứng bắt đầu (đạt transition state). Ea cao → chậm; Ea thấp → nhanh.
- Enzyme là chất xúc tác sinh học: **hạ Ea**, **không bị tiêu hao**, **không đổi ΔG/cân bằng** — chỉ đổi tốc độ.
- Hạ Ea theo cấp số nhân tăng tốc độ (mỗi ~10 kJ/mol ≈ ×48 ở 37°C); catalase là ví dụ kinh điển (~10⁶ phản ứng/giây).

---

## 3. Cơ chế: trung tâm hoạt động, khóa–chìa, khớp cảm ứng

### 💡 Trực giác / Hình dung

Enzyme như một **ổ khóa**, cơ chất (substrate) như một **chiếc chìa**. Chỉ đúng chìa mới khớp đúng ổ — đó là **tính đặc hiệu (specificity)** của enzyme: mỗi enzyme thường chỉ xúc tác cho **một** (hoặc một nhóm) phản ứng. Nhưng ổ khóa enzyme còn "thông minh" hơn ổ khóa thường: khi chìa cắm vào, ổ **bóp khít lại ôm lấy chìa** cho vừa vặn hoàn hảo — đó là **khớp cảm ứng (induced fit)**.

### 3.1. Trung tâm hoạt động và phức enzyme–cơ chất

- **Trung tâm hoạt động (active site)**: một "túi" hoặc "rãnh" nhỏ trên bề mặt enzyme, có hình dạng và tính chất hóa học khớp với cơ chất. Hình dạng này do cấu trúc 3 bậc của protein quyết định (nhắc lại Lesson 01: trình tự → hình dạng → chức năng).
- **Cơ chất (substrate)**: chất mà enzyme tác động lên.
- Quá trình:
  ```
  E  +  S   ⇌   ES   →   E  +  P
  enzyme  cơ chất   phức    enzyme   sản phẩm
                  enzyme–cơ chất   (tái sử dụng)
  ```
  Enzyme gắn cơ chất tạo **phức enzyme–cơ chất (enzyme–substrate complex, ES)**, xúc tác biến cơ chất thành **sản phẩm (product, P)**, rồi nhả sản phẩm và **trở lại nguyên vẹn** sẵn sàng cho vòng tiếp theo.

### 3.2. Khóa–chìa vs khớp cảm ứng

| Mô hình | Ý tưởng | Hạn chế / cải tiến |
|---------|---------|--------------------|
| **Khóa–chìa (lock and key)** | active site có hình **cố định**, cơ chất khớp như chìa vào ổ | Mô hình cũ, đơn giản hóa. Giải thích được tính đặc hiệu nhưng không giải thích vì sao enzyme "ôm" cơ chất chặt hơn khi gắn. |
| **Khớp cảm ứng (induced fit)** | khi cơ chất tới, active site **đổi hình một chút để ôm khít** cơ chất | Mô hình hiện đại, đúng hơn. Sự "ôm khít" giúp kéo căng liên kết cơ chất → hạ Ea hiệu quả. |

> **Toy example — cảnh báo**: hình ổ khóa–chìa là minh họa rất đơn giản. Thực tế active site là một "túi" 3D do hàng chục amino acid xếp lại tạo nên, tương tác với cơ chất bằng liên kết hydrogen, lực ion, kỵ nước — không phải khớp cơ học cứng. Mô hình khớp cảm ứng gần thực tế hơn.

### 3.3. Vì sao enzyme hạ được Ea (cơ chế cụ thể)

Active site hạ Ea bằng vài cách: (1) **giữ cơ chất đúng hướng** để va chạm hiệu quả; (2) **kéo căng/làm yếu liên kết** cần gãy của cơ chất; (3) **tạo vi môi trường** (vd pH cục bộ) thuận lợi; (4) **tham gia tạm thời** vào phản ứng rồi nhả ra. Kết quả: trạng thái chuyển tiếp dễ đạt hơn → Ea thấp hơn.

### 3.4. Bốn ví dụ enzyme cụ thể

| Enzyme | Cơ chất | Sản phẩm | Ghi chú |
|--------|---------|----------|---------|
| Amylase (nước bọt) | tinh bột | maltose (đường đôi) | bắt đầu tiêu hóa tinh bột ngay trong miệng |
| Lactase (ruột) | lactose | glucose + galactose | thiếu enzyme này → "không dung nạp lactose" |
| Catalase | H₂O₂ | H₂O + O₂ | turnover ~10⁶/giây — nhanh nhất nhì trong tự nhiên |
| Pepsin (dạ dày) | protein | peptide ngắn | hoạt động ở pH ~2 (§4) |

Quy ước đặt tên: nhiều enzyme có đuôi **-ase**, thường ghép từ tên cơ chất (lact**ase** cắt **lact**ose, malt**ase** cắt **malt**ose).

### ❓ Câu hỏi tự nhiên của người đọc

**Q: Một enzyme xúc tác được mọi phản ứng không?**
A: Không. Enzyme có **tính đặc hiệu** cao — mỗi enzyme thường chỉ khớp một cơ chất (hoặc nhóm rất giống nhau). Lactase cắt lactose nhưng không cắt sucrose. Đặc hiệu đến từ hình dạng active site.

**Q: Sau khi nhả sản phẩm, enzyme "mòn" đi không?**
A: Không — enzyme tái sử dụng nguyên vẹn. Một phân tử lactase có thể cắt hàng triệu phân tử lactose trong đời nó. Đây là lý do tế bào chỉ cần **rất ít** enzyme (lượng nhỏ) mà xử lý được lượng cơ chất lớn.

### 🔁 Dừng lại tự kiểm tra

1. Vì sao enzyme có tính đặc hiệu cao (mỗi enzyme chỉ một loại cơ chất)?
2. Mô hình "khóa–chìa" và "khớp cảm ứng" khác nhau ở điểm cốt lõi nào?

<details>
<summary>Đáp án</summary>

1. Vì **hình dạng và tính chất hóa học của active site** chỉ khớp với một cơ chất (hoặc nhóm rất giống). Hình dạng này do cấu trúc 3 bậc của protein quyết định — đổi vài amino acid ở active site là đổi cả tính đặc hiệu.
2. Khóa–chìa: active site có hình **cố định** sẵn. Khớp cảm ứng: active site **đổi hình ôm khít** cơ chất khi cơ chất tới — sự ôm khít này còn giúp kéo căng liên kết để hạ Ea.
</details>

### 📝 Tóm tắt mục 3

- Active site = "túi" trên enzyme khớp cơ chất; tạo phức ES rồi cho sản phẩm, enzyme tái sử dụng ($E + S \rightleftharpoons ES \rightarrow E + P$).
- Khóa–chìa (hình cố định) → khớp cảm ứng (active site đổi hình ôm khít, đúng hơn).
- Enzyme đặc hiệu cao; tên thường có đuôi -ase theo cơ chất (lactase, amylase).

---

## 4. Yếu tố ảnh hưởng tốc độ enzyme: nhiệt độ, pH, nồng độ

### 💡 Trực giác / Hình dung

Enzyme như **vận động viên**: có một "vùng phong độ đỉnh cao" — không quá lạnh (chậm chạp), không quá nóng (kiệt sức/chấn thương). Quá nóng thì vận động viên "gục" hẳn (biến tính — không hồi phục). Mỗi vận động viên lại quen một "sân nhà" (pH tối ưu) riêng: pepsin quen sân acid của dạ dày, trypsin quen sân kiềm của ruột.

### 4.1. Nhiệt độ (temperature)

- Tăng nhiệt → phân tử chuyển động nhanh hơn → va chạm nhiều hơn → tốc độ **tăng** (đến một mức).
- Vượt **nhiệt độ tối ưu (optimum)** → nhiệt phá vỡ liên kết hydrogen và tương tác giữ hình dạng bậc 2–3 → enzyme **biến tính (denature)**, active site mất hình → mất chức năng → tốc độ **rơi thẳng đứng**.
- Ở người, nhiệt độ tối ưu của hầu hết enzyme ≈ **37°C** (thân nhiệt). Đường cong tốc độ–nhiệt độ có dạng tăng rồi gãy đột ngột (không phải hình chuông đối xứng đẹp như pH).

### 4.2. pH

- Mỗi enzyme có **pH tối ưu** riêng. Đường cong tốc độ–pH có dạng **hình chuông**: tốc độ cao nhất ở pH tối ưu, giảm dần về hai phía.
- pH lệch nhiều → ion H⁺/OH⁻ phá vỡ tương tác ion và hydrogen giữ hình dạng → active site biến dạng → mất hoạt tính.

**Bốn ví dụ pH tối ưu:**

| Enzyme | Nơi hoạt động | pH tối ưu |
|--------|---------------|-----------|
| Pepsin | dạ dày (acid mạnh) | ~**2** |
| Amylase nước bọt | miệng | ~**6.8** |
| Catalase | tế bào | ~**7** (trung tính) |
| Trypsin | ruột non (kiềm) | ~**8** |

Đây là lý do pepsin "chết lặng" khi xuống ruột (pH ~8, quá kiềm với nó), còn trypsin chỉ bật hoạt động ở ruột.

### 4.3. Nồng độ cơ chất (substrate concentration) — hiện tượng bão hòa

- Khi nồng độ cơ chất **thấp**: tăng cơ chất → tốc độ tăng gần như tuyến tính (nhiều active site còn rỗi).
- Khi nồng độ cơ chất **cao**: mọi active site đều **bận** → thêm cơ chất cũng không tăng tốc nữa → tốc độ **bão hòa (saturation)**, đạt tốc độ tối đa **Vmax**.
- Tăng nồng độ **enzyme** (nhiều ổ khóa hơn) sẽ nâng Vmax lên.

### 4.4. Bốn ví dụ số (đường cong & bão hòa)

Dùng mô hình Michaelis–Menten đơn giản: $v = \dfrac{V_{max} \cdot [S]}{K_m + [S]}$. Giả sử $V_{max} = 100$ đơn vị/giây, $K_m = 5$ mM ($K_m$ = nồng độ cơ chất cho tốc độ bằng nửa Vmax).

**Ví dụ 1 — [S] = 5 mM (= Km)**: `v = 100 × 5/(5+5) = 100 × 0.5 = **50**` (đúng nửa Vmax — định nghĩa của Km).

**Ví dụ 2 — [S] = 1 mM (thấp)**: `v = 100 × 1/(5+1) = 100 × 0.167 = **16.7**` (vùng gần tuyến tính, còn nhiều active site rỗi).

**Ví dụ 3 — [S] = 20 mM (cao)**: `v = 100 × 20/(5+20) = 100 × 0.8 = **80**` (đã gần bão hòa).

**Ví dụ 4 — [S] = 100 mM (rất cao)**: `v = 100 × 100/(5+100) = 100 × 0.952 = **95.2**` (gần Vmax = 100; tăng [S] thêm nữa cũng chỉ tiệm cận 100, không vượt được — đó là bão hòa).

### ⚠ Lỗi thường gặp

- **Nghĩ "càng nóng enzyme càng nhanh"**: chỉ đúng **đến nhiệt độ tối ưu**. Quá đó enzyme **biến tính** và tốc độ rơi về 0 — đường cong gãy, không tăng mãi.
- **Nghĩ "biến tính = enzyme bị phân giải/chết hẳn các liên kết peptide"**: biến tính chỉ phá hình dạng bậc 2–3 (liên kết yếu); liên kết peptide bậc 1 vẫn còn. Nhưng mất hình = mất chức năng, và thường **không hồi phục** (như luộc trứng — Lesson 01).
- **Nghĩ "thêm cơ chất luôn tăng tốc"**: chỉ đúng khi chưa bão hòa. Khi mọi active site đã bận, thêm cơ chất vô ích (tốc độ kẹt ở Vmax).
- **Nhầm pH tối ưu là 7 cho mọi enzyme**: sai, pepsin tối ưu ở pH ~2; mỗi enzyme một pH riêng theo nơi nó làm việc.

### ❓ Câu hỏi tự nhiên của người đọc

**Q: Sốt cao (39–40°C) có làm hại enzyme không?**
A: Sốt nhẹ tăng tốc enzyme đôi chút (và làm vi khuẩn khó chịu). Nhưng sốt **rất cao** (>42°C) bắt đầu làm protein/enzyme biến tính — đó là lý do sốt cao nguy hiểm, có thể tổn thương não.
**Q: Vì sao dạ dày dùng pepsin (pH 2) mà ruột dùng trypsin (pH 8)?**
A: Vì mỗi cơ quan có môi trường pH khác nhau (dạ dày acid để diệt khuẩn + hoạt hóa pepsin; ruột kiềm nhờ dịch tụy). Mỗi enzyme tiến hóa để tối ưu đúng môi trường nơi nó làm việc.

### 🔁 Dừng lại tự kiểm tra

1. Với mô hình `v = Vmax·[S]/(Km+[S])`, `Vmax = 60`, `Km = 4` mM: tính v khi [S] = 4 mM và khi [S] = 36 mM.
2. Cho enzyme vào dung dịch ở 70°C, hoạt tính = 0. Hạ về 37°C, hoạt tính **không** trở lại. Giải thích.

<details>
<summary>Đáp án</summary>

1. [S] = 4 mM (= Km): `v = 60 × 4/(4+4) = 60 × 0.5 = **30**` (nửa Vmax). [S] = 36 mM: `v = 60 × 36/(4+36) = 60 × 0.9 = **54**` (90% Vmax — gần bão hòa).
2. Ở 70°C enzyme đã **biến tính** — liên kết hydrogen và tương tác giữ hình bậc 2–3 bị phá vĩnh viễn, chuỗi cuộn rối và kết tụ. Biến tính này **không thuận nghịch**: hạ nhiệt không tự gập lại đúng hình ban đầu → active site không phục hồi → hoạt tính = 0.
</details>

### 📝 Tóm tắt mục 4

- Nhiệt độ: tăng tốc đến **nhiệt độ tối ưu (~37°C ở người)**, vượt qua → biến tính → rơi về 0.
- pH: đường cong hình chuông, mỗi enzyme có pH tối ưu riêng (pepsin ~2, trypsin ~8).
- Nồng độ cơ chất: tăng tốc rồi **bão hòa** ở Vmax (mọi active site bận); tăng enzyme nâng Vmax.

---

## 5. Ức chế enzyme: cạnh tranh và không cạnh tranh

### 💡 Trực giác / Hình dung

Hai cách phá ổ khóa enzyme: (1) **nhét một chìa giả vào ổ** để chìa thật không vào được — đó là **ức chế cạnh tranh**; chìa thật nhiều lên thì vẫn chen được. (2) **bóp méo cả ổ khóa từ bên ngoài** (gắn vào một chỗ khác trên enzyme làm active site biến dạng) — đó là **ức chế không cạnh tranh**; lúc này chìa thật dù nhiều cũng vô dụng vì ổ đã hỏng.

### 5.1. Ức chế cạnh tranh (competitive inhibition)

- Chất ức chế (inhibitor) có hình **giống cơ chất** → tranh chỗ ở **chính active site**.
- Khi inhibitor chiếm active site, cơ chất thật không vào được → tốc độ giảm.
- **Vượt qua được**: tăng nồng độ cơ chất đủ cao → cơ chất "đè" inhibitor về xác suất → tốc độ phục hồi. Vmax **không đổi** (vẫn đạt được nếu đủ cơ chất), nhưng cần nhiều cơ chất hơn (Km biểu kiến tăng).

### 5.2. Ức chế không cạnh tranh / allosteric (noncompetitive)

- Chất ức chế gắn vào **chỗ khác** (allosteric site), **không** phải active site.
- Sự gắn này làm enzyme **đổi hình dạng** → active site biến dạng → cơ chất vào cũng không xúc tác được.
- **Không vượt qua được bằng tăng cơ chất** (vì vấn đề không nằm ở tranh chỗ mà ở hình dạng enzyme). Vmax **giảm**.

### 5.3. Bốn ví dụ / so sánh số

Giả sử enzyme không ức chế đạt v = 80 ở [S] cho trước.

**Ví dụ 1 — ức chế cạnh tranh, [S] thấp**: v giảm mạnh (vd còn 40) vì inhibitor chiếm nhiều active site.

**Ví dụ 2 — ức chế cạnh tranh, [S] rất cao**: v phục hồi gần 80 (≈ Vmax) — vì cơ chất đè được inhibitor.

**Ví dụ 3 — ức chế không cạnh tranh, [S] thấp**: v giảm (vd còn 40).

**Ví dụ 4 — ức chế không cạnh tranh, [S] rất cao**: v **vẫn** thấp (vd ~40, không phục hồi tới 80) — vì tăng cơ chất không sửa được hình dạng enzyme đã hỏng. Đây là dấu hiệu phân biệt: **cạnh tranh phục hồi khi tăng [S], không cạnh tranh thì không**.

> **Ứng dụng thực**: nhiều **thuốc** là chất ức chế enzyme. Ví dụ thuốc ức chế men chuyển (ACE inhibitor) hạ huyết áp; nhiều kháng sinh ức chế enzyme tổng hợp vách vi khuẩn. Hiểu cơ chế ức chế = hiểu cách thuốc hoạt động.

### ⚠ Lỗi thường gặp

- **Nghĩ mọi ức chế đều vượt được bằng tăng cơ chất**: chỉ **cạnh tranh** mới vượt được. Không cạnh tranh thì không (gắn chỗ khác, đổi hình enzyme).
- **Nghĩ ức chế cạnh tranh làm giảm Vmax**: không — Vmax giữ nguyên (đủ cơ chất vẫn đạt), chỉ cần nhiều cơ chất hơn. Ức chế **không** cạnh tranh mới giảm Vmax.
- **Nghĩ allosteric luôn là ức chế**: gắn allosteric có thể **kích hoạt** (tăng hoạt tính) chứ không chỉ ức chế — đây là cơ chế điều hòa enzyme quan trọng (ví dụ điều hòa ngược/feedback).

### ❓ Câu hỏi tự nhiên của người đọc

**Q: Làm sao thí nghiệm phân biệt hai loại ức chế?**
A: Tăng nồng độ cơ chất rất cao và đo lại. Nếu tốc độ **phục hồi** về gần Vmax → **cạnh tranh**. Nếu tốc độ **vẫn thấp** dù cơ chất nhiều → **không cạnh tranh**.

**Q: Ức chế có phải luôn là điều xấu?**
A: Không. Cơ thể dùng ức chế để **điều hòa** chuyển hóa — vd sản phẩm cuối của một chuỗi phản ứng quay lại ức chế enzyme đầu chuỗi (ức chế ngược, feedback inhibition), tránh sản xuất thừa. Đó là điều khiển thông minh, không phải hỏng hóc.

### 🔁 Dừng lại tự kiểm tra

1. Một chất ức chế làm v giảm. Bạn tăng [S] gấp 20 lần, v phục hồi gần Vmax. Đây là loại ức chế nào?
2. Loại ức chế nào làm **giảm Vmax**? Vì sao?

<details>
<summary>Đáp án</summary>

1. **Ức chế cạnh tranh** — vì tăng cơ chất phục hồi được tốc độ (cơ chất đè inhibitor ở active site).
2. **Ức chế không cạnh tranh** — vì nó gắn chỗ khác, đổi hình enzyme, làm một phần enzyme **vĩnh viễn** không hoạt động bất kể bao nhiêu cơ chất → tốc độ tối đa khả dĩ giảm → Vmax giảm.
</details>

### 📝 Tóm tắt mục 5

- Cạnh tranh: inhibitor giống cơ chất, chiếm active site; **vượt được** bằng tăng [S]; Vmax không đổi.
- Không cạnh tranh (allosteric): gắn chỗ khác, đổi hình enzyme; **không vượt được** bằng tăng [S]; Vmax giảm.
- Phân biệt bằng cách tăng [S]: phục hồi → cạnh tranh; không phục hồi → không cạnh tranh. Ức chế cũng là công cụ điều hòa (feedback) và là cơ chế của nhiều thuốc.

---

## 6. ATP — tiền tệ năng lượng của tế bào

### 💡 Trực giác / Hình dung

ATP như **pin sạc** (hoặc tờ tiền) của tế bào. Dị hóa "nạp pin" (gắn nhóm phosphate thứ 3 vào ADP → ATP); khi cần làm việc (co cơ, bơm ion, tổng hợp phân tử), tế bào "xả pin" (cắt nhóm phosphate đó → ADP + năng lượng). Pin nạp–xả liên tục cả ngày: không tích trữ nhiều, nhưng luân chuyển khối lượng khổng lồ.

### 6.1. Cấu tạo ATP

**ATP (adenosine triphosphate)** gồm 3 phần:

1. **Adenine** — một base nitơ (giống base trong DNA, Lesson 01).
2. **Ribose** — đường 5 carbon.
3. **Ba nhóm phosphate** nối tiếp nhau (đó là "tri-phosphate").

Adenine + ribose = **adenosine**. Gắn thêm phosphate: 1 → AMP, 2 → ADP, 3 → ATP.

Điểm mấu chốt: liên kết giữa các nhóm phosphate là **liên kết giàu năng lượng** — các phosphate tích điện âm đẩy nhau mạnh, "lò xo nén căng". Cắt liên kết phosphate cuối giải phóng năng lượng đó.

### 6.2. Chu trình ATP ⇌ ADP

$$\begin{aligned}
\text{ATP} + \text{H}_2\text{O} &\rightarrow \text{ADP} + \text{P}_i + \text{năng lượng } (\sim 7.3\ \text{kcal/mol}) && [\text{thủy phân — xả}] \\
\text{ADP} + \text{P}_i + \text{năng lượng} &\rightarrow \text{ATP} + \text{H}_2\text{O} && [\text{tổng hợp — nạp}]
\end{aligned}$$

- **Thủy phân ATP** (xả): exergonic, giải phóng ~**7.3 kcal/mol** (~30.5 kJ/mol). Năng lượng này "trả tiền" cho công việc endergonic (energy coupling §1).
- **Tổng hợp ATP** (nạp): endergonic, dùng năng lượng từ dị hóa (đốt glucose ở hô hấp tế bào, Lesson 05) để gắn lại Pi vào ADP.

> **Số liệu gây sốc**: cơ thể người chỉ chứa khoảng **50–250 g ATP** tại một thời điểm, nhưng mỗi ngày **luân chuyển một khối lượng ATP xấp xỉ khối lượng cơ thể** (~40–75 kg). Tức mỗi phân tử ATP được nạp–xả **hàng nghìn lần/ngày**. ATP không phải "kho dự trữ" mà là "đồng tiền lưu thông".

### 6.3. Bốn ví dụ số: tính năng lượng từ n ATP

Lấy mốc 1 ATP thủy phân ≈ **7.3 kcal/mol**.

**Ví dụ 1 — 1 ATP**: `1 × 7.3 = **7.3 kcal/mol**`.

**Ví dụ 2 — 2 ATP** (vd giai đoạn đầu đường phân tiêu 2 ATP): `2 × 7.3 = **14.6 kcal/mol**`.

**Ví dụ 3 — 10 ATP**: `10 × 7.3 = **73 kcal/mol**`.

**Ví dụ 4 — 38 ATP** (sản lượng tối đa lý thuyết từ 1 glucose qua hô hấp hiếu khí — Lesson 05): `38 × 7.3 = **277.4 kcal/mol**`.

> So sánh: đốt hoàn toàn 1 mol glucose giải phóng ~686 kcal/mol. Tế bào "gói" được 277/686 ≈ **40%** vào ATP; phần còn lại thoát ra dưới dạng nhiệt (giữ ấm cơ thể). Hiệu suất 40% này tốt hơn nhiều động cơ xăng (~25%).

### ⚠ Lỗi thường gặp

- **Nghĩ "tế bào tích trữ nhiều ATP để dành"**: SAI. ATP rất ít tại một thời điểm; nó được **liên tục nạp–xả**. Kho dự trữ năng lượng dài hạn là **lipid và glycogen**, không phải ATP.
- **Nghĩ "liên kết phosphate là liên kết năng lượng cao vì rất bền"**: ngược lại — nó dễ cắt (Ea thấp với enzyme) và **giải phóng** năng lượng khi cắt, vì các phosphate tích điện âm đẩy nhau (bất ổn định), cắt ra giảm sức đẩy.
- **Lẫn ATP với glucose**: glucose là **nhiên liệu** (kho năng lượng thô); ATP là **đồng tiền** (dạng năng lượng tế bào dùng trực tiếp). Hô hấp tế bào chuyển glucose → ATP.

### ❓ Câu hỏi tự nhiên của người đọc

**Q: Vì sao tế bào không dùng thẳng glucose mà phải đổi qua ATP?**
A: Vì glucose giải phóng năng lượng "cả cục" (~686 kcal/mol) — quá lớn, lãng phí nếu xả hết một lần. ATP là gói **nhỏ, vừa vặn** (~7.3 kcal/mol) cho từng việc cụ thể (1 lần co cơ, 1 lần bơm ion). Giống dùng tiền lẻ thay vì xé cả tờ tiền lớn cho mọi giao dịch.

**Q: 7.3 kcal/mol là con số cố định tuyệt đối?**
A: Đó là giá trị **chuẩn (ΔG°′)** ở điều kiện chuẩn. Trong tế bào thật, do nồng độ ATP/ADP/Pi khác chuẩn, năng lượng thực tế thủy phân ATP thường lớn hơn, khoảng **−11 đến −13 kcal/mol**. Ta dùng 7.3 làm mốc tính toán quy ước.

### 🔁 Dừng lại tự kiểm tra

1. Tính năng lượng (kcal/mol) giải phóng khi thủy phân: (a) 4 ATP, (b) 30 ATP.
2. Một glucose cho 686 kcal/mol khi đốt; tế bào thu được 277 kcal/mol vào 38 ATP. Hiệu suất bao nhiêu %? Phần còn lại đi đâu?

<details>
<summary>Đáp án</summary>

1. (a) `4 × 7.3 = **29.2 kcal/mol**`. (b) `30 × 7.3 = **219 kcal/mol**`.
2. Hiệu suất = `277/686 × 100% ≈ **40.4%**`. Phần còn lại (~60%, ~409 kcal/mol) thoát ra dưới dạng **nhiệt** — góp phần giữ ấm cơ thể (động vật đẳng nhiệt).
</details>

### 📝 Tóm tắt mục 6

- ATP = adenine + ribose + 3 phosphate; liên kết phosphate cuối giàu năng lượng.
- Thủy phân ATP → ADP + Pi giải phóng ~7.3 kcal/mol (xả); tổng hợp lại từ ADP + Pi dùng năng lượng dị hóa (nạp).
- ATP là đồng tiền lưu thông (luân chuyển ~khối lượng cơ thể/ngày), không phải kho dự trữ; glucose mới là nhiên liệu thô. 38 ATP/glucose ≈ 40% hiệu suất.

---

## 7. Bảng tổng hợp khái niệm

| Khái niệm | Ý nghĩa cốt lõi | Con số / ví dụ chốt |
|-----------|-----------------|----------------------|
| Đồng hóa / dị hóa | xây (thu NL) / phá (tỏa NL) | protein tổng hợp / glucose phân giải |
| Ea | rào năng lượng để bắt đầu | enzyme hạ Ea → tăng tốc ×triệu |
| ΔG | quyết định tự xảy ra hay không | enzyme **không** đổi ΔG |
| Active site | túi khớp cơ chất | khóa–chìa → khớp cảm ứng |
| Nhiệt độ tối ưu | ~37°C ở người | vượt → biến tính |
| pH tối ưu | mỗi enzyme một giá trị | pepsin ~2, trypsin ~8 |
| Bão hòa | mọi active site bận → Vmax | `v = Vmax·[S]/(Km+[S])` |
| Ức chế cạnh tranh | chiếm active site; vượt được bằng tăng [S] | Vmax không đổi |
| Ức chế không cạnh tranh | gắn chỗ khác, đổi hình | Vmax giảm |
| ATP | tiền tệ năng lượng | thủy phân ~7.3 kcal/mol |
| Turnover number | số cơ chất/giây mỗi enzyme | catalase ~10⁶/giây |

---

## 8. Bài tập + Lời giải chi tiết

### Bài tập

**Bài 1**: Phân loại các quá trình sau vào đồng hóa (anabolic) hay dị hóa (catabolic), và thu hay tỏa năng lượng: (a) tổng hợp glycogen từ glucose, (b) thủy phân protein thành amino acid trong tiêu hóa, (c) tổng hợp DNA, (d) đốt cháy chất béo lấy năng lượng.

**Bài 2**: Một phản ứng có ΔG = −40 kJ/mol và Ea = 90 kJ/mol. Thêm enzyme hạ Ea xuống 35 kJ/mol. (a) ΔG mới? (b) Phản ứng nhanh hơn hay chậm hơn, và ước tính tăng tốc bao nhiêu lần ở 310 K (dùng `e^(ΔEa/RT)`, `RT ≈ 2577 J/mol`)? (c) Điểm cân bằng có dịch chuyển không?

**Bài 3**: Dùng `v = Vmax·[S]/(Km+[S])` với `Vmax = 120` đơn vị/giây, `Km = 8` mM. Tính v khi: (a) [S] = 8 mM, (b) [S] = 2 mM, (c) [S] = 72 mM. (d) Tốc độ có thể vượt 120 không? Giải thích.

**Bài 4**: Tính năng lượng giải phóng (kcal/mol) khi thủy phân: (a) 1 ATP, (b) 2 ATP, (c) 10 ATP, (d) 38 ATP. Biết 1 ATP ≈ 7.3 kcal/mol.

**Bài 5**: Một enzyme bị một chất X làm giảm tốc độ. Khi tăng nồng độ cơ chất gấp 50 lần, tốc độ **không** phục hồi (vẫn thấp). (a) X là loại ức chế nào? (b) Vmax thay đổi ra sao? (c) Làm sao thí nghiệm phân biệt với loại ức chế còn lại?

**Bài 6**: Catalase có turnover number ~10⁶ phân tử H₂O₂/giây. (a) Một phân tử catalase phân hủy bao nhiêu H₂O₂ trong 1 phút? (b) Nếu có 5×10¹² phân tử catalase, tổng số H₂O₂ phân hủy trong 1 giây là bao nhiêu?

**Bài 7**: Vì sao luộc chín thịt làm các enzyme tiêu hóa trong thịt (vd của chính con vật) ngừng hoạt động, nhưng đường (carbohydrate) đun nóng vẫn ngọt như cũ? Liên hệ với khái niệm biến tính.

### Lời giải

**Bài 1**:
- (a) tổng hợp glycogen từ glucose → **đồng hóa**, **thu** năng lượng (endergonic) — xây phân tử lớn.
- (b) thủy phân protein → amino acid → **dị hóa**, **tỏa** năng lượng (exergonic) — phá phân tử lớn.
- (c) tổng hợp DNA → **đồng hóa**, **thu** năng lượng — xây polymer từ nucleotide.
- (d) đốt cháy chất béo → **dị hóa**, **tỏa** năng lượng — phân giải lấy năng lượng (gói vào ATP).

**Bài 2**:
- (a) ΔG **vẫn = −40 kJ/mol**. Enzyme không bao giờ đổi ΔG — chỉ đổi Ea.
- (b) **Nhanh hơn**, vì Ea hạ từ 90 → 35 kJ/mol (hạ ΔEa = 55 kJ/mol = 55000 J/mol). Tăng tốc ≈ `e^(55000/2577) = e^21.34 ≈ **1.9×10⁹ lần**` (gần 2 tỉ lần).
- (c) **Không** — enzyme tăng tốc cả chiều thuận lẫn nghịch như nhau, nên điểm cân bằng giữ nguyên (liên hệ kinetics: catalyst không dịch cân bằng).

**Bài 3**:
- (a) [S] = 8 mM (= Km): `v = 120 × 8/(8+8) = 120 × 0.5 = **60**` (đúng nửa Vmax).
- (b) [S] = 2 mM: `v = 120 × 2/(8+2) = 120 × 0.2 = **24**` (vùng thấp, gần tuyến tính).
- (c) [S] = 72 mM: `v = 120 × 72/(8+72) = 120 × 0.9 = **108**` (90% Vmax, gần bão hòa).
- (d) **Không thể vượt 120** (= Vmax). Khi [S] → ∞, `v → Vmax = 120` (tiệm cận, không vượt) vì mọi active site đã bận — đó là bão hòa. Muốn nâng trần phải tăng **nồng độ enzyme**.

**Bài 4**:
- (a) `1 × 7.3 = **7.3 kcal/mol**`.
- (b) `2 × 7.3 = **14.6 kcal/mol**`.
- (c) `10 × 7.3 = **73 kcal/mol**`.
- (d) `38 × 7.3 = **277.4 kcal/mol**`.

**Bài 5**:
- (a) **Ức chế không cạnh tranh (noncompetitive / allosteric)** — vì tăng cơ chất rất nhiều mà tốc độ **không** phục hồi. Inhibitor gắn chỗ khác active site, đổi hình enzyme, không thể "đè" được bằng cơ chất.
- (b) **Vmax giảm** — một phần enzyme bị bất hoạt vĩnh viễn (hình hỏng), trần tốc độ tối đa thấp đi.
- (c) Với ức chế **cạnh tranh**, tăng [S] đủ cao sẽ **phục hồi** tốc độ về gần Vmax. Vậy phép thử là: tăng [S] mạnh — nếu phục hồi → cạnh tranh; nếu không (như đề) → không cạnh tranh.

**Bài 6**:
- (a) 1 phút = 60 giây → `10⁶ × 60 = 6×10⁷ = **60 triệu phân tử H₂O₂/phút**` trên mỗi phân tử catalase.
- (b) `5×10¹² × 10⁶ = 5×10¹⁸ phân tử H₂O₂/giây` tổng cộng. (Đây là lý do oxy già sủi bọt gần như tức thì khi gặp mô sống.)

**Bài 7**:
- Enzyme là **protein**, có cấu trúc 3 bậc giữ bằng liên kết hydrogen và tương tác gốc R. Nhiệt độ luộc (≫ nhiệt độ tối ưu) phá vỡ các liên kết yếu này → enzyme **biến tính (denature)**, active site mất hình → mất chức năng vĩnh viễn (không hồi phục khi nguội). Vì vậy enzyme trong thịt luộc ngừng hoạt động.
- Đường (carbohydrate, vd sucrose) là phân tử nhỏ, **không** có cấu trúc gập 3D phụ thuộc liên kết hydrogen nội phân tử như protein. Đun nóng mức thường không phá cấu trúc nên vẫn ngọt (chỉ ở nhiệt **rất** cao mới caramel hóa/phân hủy). Đây chính là sự khác biệt cốt lõi: chức năng enzyme phụ thuộc **hình dạng protein** — mất hình là mất chức năng.

---

## 9. Liên kết và bài tiếp theo

- **Bài tiếp theo trong Biology**: [Lesson 05 — Hô hấp tế bào](../lesson-05-cellular-respiration/) — nơi enzyme và ATP của bài này "vào việc": glucose bị dị hóa qua nhiều bước enzyme để nạp ~38 ATP.
- **Liên kết Chemistry**:
  - [`Chemistry/01-Structure/lesson-08-kinetics-equilibrium`](../../../Chemistry/01-Structure/lesson-08-kinetics-equilibrium/) — năng lượng hoạt hóa, chất xúc tác, cân bằng không bị catalyst dịch chuyển.
  - [`Chemistry/02-Reactions-Thermo/lesson-04-thermochemistry`](../../../Chemistry/02-Reactions-Thermo/lesson-04-thermochemistry/) — phản ứng tỏa/thu nhiệt, ΔH, kcal/mol.
- **Tiền đề trong Biology**: [Lesson 01 — Phân tử sinh học](../lesson-01-biomolecules/) — protein, cấu trúc 4 bậc, biến tính.
- **Đọc thêm**: bộ công cụ tương tác — `visualization.html` của lesson này (sơ đồ năng lượng, đường cong enzyme, chu trình ATP, khóa–chìa).

---

## 📝 Tổng kết Lesson 04

1. **Chuyển hóa** = đồng hóa (xây, thu năng lượng) + dị hóa (phá, tỏa năng lượng); năng lượng nối hai nhánh qua ATP.
2. **Năng lượng hoạt hóa (Ea)** là rào để phản ứng bắt đầu. **Enzyme hạ Ea** → tăng tốc (×triệu–tỉ), **không bị tiêu hao**, **không đổi ΔG hay cân bằng** — chỉ đổi tốc độ.
3. **Cơ chế**: cơ chất khớp active site (khóa–chìa → khớp cảm ứng) tạo phức ES → sản phẩm → enzyme tái sử dụng. Enzyme đặc hiệu cao.
4. **Yếu tố ảnh hưởng**: nhiệt độ (tối ưu ~37°C, vượt → biến tính), pH (mỗi enzyme một pH tối ưu: pepsin ~2, trypsin ~8), nồng độ cơ chất (tăng rồi **bão hòa** ở Vmax).
5. **Ức chế**: cạnh tranh (chiếm active site, vượt được bằng tăng [S], Vmax không đổi) vs không cạnh tranh (gắn chỗ khác, đổi hình, Vmax giảm).
6. **ATP** là tiền tệ năng lượng: thủy phân ATP → ADP + Pi giải phóng ~7.3 kcal/mol; luân chuyển khối lượng khổng lồ mỗi ngày; glucose là nhiên liệu thô, ATP là đồng tiền tiêu dùng.

**Tiếp theo**: [Lesson 05 — Hô hấp tế bào](../lesson-05-cellular-respiration/)
