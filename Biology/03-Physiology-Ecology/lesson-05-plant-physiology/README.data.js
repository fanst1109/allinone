// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: Biology/03-Physiology-Ecology/lesson-05-plant-physiology/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 05 — Sinh lý thực vật

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Mô tả được **đường đi của nước và khoáng** từ đất, qua rễ, lên thân, ra lá — phân biệt 2 đường **apoplast** (qua thành tế bào) và **symplast** (qua tế bào chất), và vai trò của **đai Caspary**.
- Hiểu **2 hệ mạch dẫn** trong cây: **mạch gỗ (xylem)** vận chuyển nước đi lên, **mạch rây (phloem)** vận chuyển chất hữu cơ từ **nguồn (source)** tới **đích (sink)** — biết loại tế bào nào sống, loại nào chết, và vì sao.
- Giải thích **thuyết lực kéo–thoát hơi nước (cohesion-tension theory)**: vì sao cây cao hơn 100 m vẫn đưa nước lên ngọn được mà *không* tốn ATP.
- Hiểu cơ chế **đóng/mở khí khổng (stomata)** qua áp suất thẩm thấu của tế bào hạt đậu (guard cell) — và đánh đổi "quang hợp vs giữ nước".
- Phân biệt 5 nhóm **hormone thực vật** (auxin, gibberellin, cytokinin, ABA, ethylene): chức năng chính, nơi tác động, hiện tượng thực tế.
- Lượng hóa được các đại lượng sinh lý: thể tích nước thoát/đời cây, tốc độ vận chuyển phloem, chiều cao tối đa mạch gỗ.

## Kiến thức tiền đề

- **Quang hợp** — phản ứng tổng hợp glucose từ CO₂ + H₂O dưới ánh sáng: [\`../../01-Molecules-Cells/lesson-06-photosynthesis/\`](../../01-Molecules-Cells/lesson-06-photosynthesis/). Bài này dùng lại khái niệm "lá hút CO₂, thải O₂".
- **Vận chuyển qua màng & thẩm thấu (osmosis)** — nước chảy theo gradient thế nước, ion đi qua kênh/bơm: [\`../../01-Molecules-Cells/lesson-03-membrane-transport/\`](../../01-Molecules-Cells/lesson-03-membrane-transport/). Cốt lõi của hấp thụ nước ở rễ và đóng/mở khí khổng.
- **Cấu trúc tế bào thực vật** — thành cellulose, lục lạp, không bào: [\`../../01-Molecules-Cells/lesson-02-cell-structure/\`](../../01-Molecules-Cells/lesson-02-cell-structure/). Thành tế bào là "ống dẫn" của apoplast.

---

## 1. Hấp thụ nước và khoáng ở rễ

### 💡 Trực giác / Hình dung

Hãy hình dung rễ cây như một **chùm ống hút khổng lồ cắm vào miếng bọt biển ẩm**. Bề mặt rễ không trơn — nó có vô số **lông hút (root hair)**, mỗi lông là một tế bào kéo dài ra ngoài đất, tăng diện tích tiếp xúc lên hàng trăm lần. Nước từ đất tự "chảy ngược" vào rễ vì bên trong tế bào rễ "khát" hơn ngoài đất (thế nước thấp hơn). Khoáng (ion) thì khác: chúng phải được **bơm chủ động** vào — như nhân viên ngân hàng "bơm" tiền vào két, tốn năng lượng.

### 1.1. Vì sao rễ có lông hút?

Một cây ngô trưởng thành có thể có **~10 tỉ lông hút**, tổng diện tích bề mặt hấp thụ **~400 m²** (gấp ~130 lần diện tích của 1 sân bóng chuyền). So sánh với một rễ trơn không có lông hút (cùng thể tích): diện tích chỉ vài m². Diện tích lớn → khả năng hấp thụ nước và khoáng tăng vọt.

| Cây | Số lông hút ước tính | Diện tích bề mặt hấp thụ |
|-----|---------------------|--------------------------|
| Lúa mì (1 cây) | ~14 tỉ | ~600 m² |
| Ngô (1 cây) | ~10 tỉ | ~400 m² |
| Cà chua (1 cây) | ~5 tỉ | ~200 m² |
| Cây con không có lông hút | 0 | ~0.05 m² |

### 1.2. Hai đường nước đi vào rễ — apoplast vs symplast

Nước từ lông hút phải đi qua nhiều lớp tế bào (biểu bì → vỏ rễ → trụ giữa) để vào mạch gỗ. Có 2 đường:

| Đường | Đi qua đâu | Có vượt qua màng tế bào không? | Tốc độ |
|-------|------------|-------------------------------|--------|
| **Apoplast** | Khoảng trống giữa các thành tế bào (cell wall) | Không (đi vòng ngoài tế bào chất) | Nhanh |
| **Symplast** | Qua tế bào chất, đi từ tế bào này sang tế bào kia qua **plasmodesmata** (cầu nối tế bào chất) | Có (đi qua màng 1 lần ở lông hút) | Chậm hơn |

### 1.3. Đai Caspary — "trạm kiểm soát" bắt buộc

Ở lớp **nội bì (endodermis)** ngay trước trụ mạch, thành tế bào có một dải **suberin** (sáp kỵ nước) gọi là **đai Caspary (Casparian strip)** bịt kín đường apoplast. Hệ quả: **nước đang đi theo apoplast bị chặn**, buộc phải **xuyên màng** để vào symplast, mới qua được đai Caspary để vào mạch gỗ.

Vì sao cây cần "trạm kiểm soát" này? Vì khi nước phải xuyên màng, cây **chọn lọc được khoáng nào cho qua** (qua kênh/bơm chuyên biệt) và **chặn được ion độc/vi khuẩn** không có "vé". Không có đai Caspary, mọi thứ trong đất sẽ "xông thẳng" vào mạch gỗ.

### 1.4. Hấp thụ khoáng — bơm chủ động tốn ATP

Khoáng (ion K⁺, NO₃⁻, PO₄³⁻, Ca²⁺...) thường ở nồng độ **thấp hơn** trong đất so với trong tế bào rễ. Theo khuếch tán thì ion phải đi ra, không phải vào → cây phải **bơm chủ động (active transport)** ngược gradient, tốn ATP. Ví dụ K⁺ trong tế bào rễ thường ~100 mM, trong đất chỉ ~0.1–1 mM → chênh ~100–1000 lần. Bơm Na⁺/K⁺ và bơm proton H⁺-ATPase đẩy ion vào.

### ❓ Câu hỏi tự nhiên của người đọc

**Q: Nước cũng đi từ nồng độ thấp về cao mà không tốn năng lượng, ion thì phải tốn?**
A: Nước đi theo **gradient thế nước (water potential)** — không phải gradient nồng độ thuần. Trong tế bào rễ có nhiều chất tan (đường, ion) → thế nước thấp hơn đất ngọt → nước tự chảy vào theo thẩm thấu. Ion thì đi theo **gradient nồng độ + điện thế** của chính nó; nếu ngược thì phải bơm.

**Q: Đai Caspary chỉ có ở rễ, không có ở thân?**
A: Đúng. Thân và lá không cần "kiểm soát" vì nước trong xylem đã được lọc; còn rễ là điểm tiếp xúc trực tiếp với đất bẩn → cần "trạm hải quan".

### ⚠ Lỗi thường gặp

- **Nhầm "rễ hút nước bằng cách bơm chủ động"**: SAI — nước đi vào theo **thẩm thấu** (bị động, không tốn ATP). Chỉ **ion** mới được bơm.
- **Nghĩ apoplast và symplast là 2 hệ mạch riêng**: SAI — chúng là 2 **đường đi xuyên qua mô vỏ rễ** trước khi vào mạch gỗ. Mạch gỗ và mạch rây mới là 2 hệ mạch dẫn.
- **Nghĩ đai Caspary chặn nước**: Nó chặn **đường apoplast**, không chặn nước nói chung. Nước vẫn qua được bằng cách xuyên màng (vào symplast).

### 🔁 Dừng lại tự kiểm tra

1. Vì sao cây ngô trồng trong đất tơi xốp lại hút nước tốt hơn cây trồng trong đất nén chặt, dù cùng độ ẩm?
2. Một ion độc (vd Cd²⁺) bám trên hạt đất gần lông hút — đai Caspary có chặn được nó vào mạch gỗ không?

<details>
<summary>Đáp án</summary>

1. Đất tơi xốp có nhiều khoảng trống chứa **không khí** → rễ và lông hút hô hấp tốt → có **ATP** để bơm ion và duy trì áp suất rễ. Đất nén chặt → thiếu O₂ → rễ ngạt thở, không bơm được ion, dẫn tới hút nước kém (mất gradient thế nước). Đây là lý do cây úng nước lâu bị chết: không phải vì thừa nước, mà vì thiếu O₂ ở rễ.
2. **Có thể chặn được** nếu Cd²⁺ đi theo apoplast (bị đai Caspary chặn lại); nhưng nếu Cd²⁺ "lừa" được kênh ion (vd kênh Ca²⁺ vì kích thước tương đương) thì có thể vào symplast và lọt vào mạch gỗ. Đó là lý do cây hấp thụ kim loại nặng — vấn đề an toàn thực phẩm thực tế.
</details>

### 📝 Tóm tắt mục 1

- Lông hút tăng diện tích hấp thụ lên hàng trăm lần (1 cây ngô ~400 m²).
- Nước đi vào theo 2 đường: **apoplast** (qua thành tế bào, nhanh) và **symplast** (qua tế bào chất, có kiểm soát).
- **Đai Caspary** ở nội bì bịt apoplast → buộc nước xuyên màng để cây chọn lọc ion.
- Nước đi vào theo thẩm thấu (bị động); ion phải được **bơm chủ động** tốn ATP.

---

## 2. Hai hệ mạch dẫn — xylem và phloem

### 💡 Trực giác / Hình dung

Cây có **2 đường ống nội bộ** chạy song song nhưng làm 2 việc trái ngược:

- **Mạch gỗ (xylem)** = "ống cấp nước" — chỉ chảy **một chiều, từ rễ lên lá**. Toàn ống chết, rỗng tuếch, nước chảy như qua ống nước cứng.
- **Mạch rây (phloem)** = "ống vận chuyển lương thực" — chảy **2 chiều**, từ "nhà máy" (lá đang quang hợp) tới "nơi tiêu thụ" (quả đang lớn, rễ đang đào sâu). Ống có tế bào **sống**, vì cần năng lượng để bơm.

### 2.1. Bảng so sánh xylem vs phloem

| Đặc điểm | **Xylem (mạch gỗ)** | **Phloem (mạch rây)** |
|----------|---------------------|------------------------|
| Vận chuyển | Nước + khoáng | Sucrose, amino acid, hormone |
| Chiều | Một chiều: **rễ → lá** | Hai chiều: **source → sink** |
| Tế bào | **Chết**, rỗng, có lỗ thông | **Sống**: sieve tube + companion cell |
| Có thành tế bào không? | Có, dày, lignin cứng | Có, mỏng, không lignin |
| Động lực | Lực kéo từ thoát hơi nước (bị động) | Bơm chủ động sucrose (tốn ATP) |
| Tốc độ | ~15–45 m/giờ (đỉnh điểm) | ~0.5–1.5 m/giờ |

### 2.2. Vì sao xylem là tế bào chết?

Lý do tinh tế: nước trong xylem phải chảy nhanh, không gặp vật cản → tế bào cần **rỗng tuyệt đối**. Tế bào sống có tế bào chất, nhân, bào quan — toàn vật cản. Khi tế bào xylem trưởng thành, nó **tự chết theo chương trình (programmed cell death)**, đẩy hết bên trong ra, chỉ để lại "thành ống" lignin cứng. Kết quả: một đường ống thông liền, dài cả mét, không vật cản.

### 2.3. Source và sink — vì sao phloem chảy 2 chiều

**Source (nguồn)** = nơi **tổng hợp** đường (chủ yếu lá đang quang hợp). **Sink (đích)** = nơi **tiêu thụ** đường (quả non, rễ, đỉnh sinh trưởng, củ đang tích trữ).

Quan trọng: source/sink **không cố định** — chúng đổi vai theo mùa và pha sinh trưởng. Ví dụ:

| Mùa/Pha | Source | Sink |
|---------|--------|------|
| Hè (lá nhiều) | Lá | Quả đang lớn, rễ |
| Xuân (lá mới mọc) | Củ (tinh bột dự trữ) | **Lá non** (chưa tự quang hợp được) |
| Lúa chín | Lá → đang chuyển đường vào hạt | **Hạt lúa** |

Đây là lý do phloem **2 chiều** — đôi khi chảy lên (từ rễ tới lá non), đôi khi chảy xuống (từ lá xuống củ).

### 2.4. Bốn ví dụ số cụ thể

**Ví dụ 1 — Tốc độ phloem**: Đo bằng đánh dấu phóng xạ ¹⁴C trong sucrose → tốc độ ~**1 m/giờ**. Vd một cây bí dài 10 m, đường từ lá đỉnh tới rễ mất ~10 giờ.

**Ví dụ 2 — Tốc độ xylem buổi trưa**: Khi nắng gắt + gió, một cây sồi cao 20 m có thể đẩy nước lên với tốc độ ~**40 m/giờ**. Toàn bộ cột nước "đổi mới" trong ~30 phút.

**Ví dụ 3 — Áp suất phloem**: Áp suất bơm sucrose trong phloem ~**2 MPa** (~20 atm) — gấp 2–3 lần áp suất lốp xe đạp. Đây là áp suất turgor được tạo bằng cách nạp sucrose vào sieve tube → nước theo thẩm thấu kéo vào → tăng áp.

**Ví dụ 4 — Năng lượng tốn cho phloem**: Companion cell tiêu thụ ATP để nạp sucrose. Ước tính 1 cây trưởng thành dùng **~10–25%** tổng ATP sản xuất chỉ để vận hành phloem. Đáng kể!

### ❓ Câu hỏi tự nhiên của người đọc

**Q: Bóc vỏ cây thì cây chết, vì sao?**
A: Vỏ cây chứa **phloem** (mạch rây) — nó nằm ở lớp ngoài (gần vỏ), khác xylem nằm ở lõi gỗ trong. Khi bóc vỏ vòng quanh thân ("girdling"), phloem bị cắt đứt → đường từ lá không xuống được rễ → rễ chết đói → cả cây chết (dù xylem vẫn nguyên, lá vẫn hút được nước). Đây là kỹ thuật loại cây dại không dùng cưa.

**Q: Sao xylem chết được mà vẫn "làm việc"?**
A: Vì cơ chế kéo nước là **vật lý thuần túy** (lực căng cohesion + lực hút từ thoát hơi nước), không cần "máy bơm sống". Tế bào chỉ cần là **ống rỗng kín nước** — vai trò "thụ động". Xem mục 3.

### 📝 Tóm tắt mục 2

- **Xylem**: nước + khoáng, một chiều rễ → lá, tế bào chết rỗng (giảm vật cản), động lực **bị động** (thoát hơi nước kéo).
- **Phloem**: sucrose + hormone, hai chiều **source → sink**, tế bào sống, động lực **chủ động** (bơm sucrose tốn ATP).
- Source/sink đổi vai theo mùa: lá non là sink mùa xuân, quả/hạt là sink mùa thu.
- Bóc vỏ cây = cắt phloem = rễ chết đói → cả cây chết.

---

## 3. Lực kéo–thoát hơi nước — cách cây đưa nước lên cao 100 m

### 💡 Trực giác / Hình dung

Hãy hình dung **toàn bộ cột nước trong xylem từ rễ đến ngọn lá là một sợi dây nước liên tục**. Khi lá thoát hơi nước (bay hơi qua khí khổng), đầu trên "sợi dây" bị kéo lên một chút. Vì nước **liên kết với nhau qua liên kết hydrogen** (cohesion), kéo đầu trên sẽ kéo theo toàn bộ cột — như rút khăn ướt: kéo một đầu, toàn bộ khăn dịch chuyển.

Cơ chế này **không tốn ATP** ở phía xylem — toàn bộ "động cơ" là **năng lượng mặt trời** làm bay hơi nước ở lá. Cây chỉ là cái ống dẫn.

### 3.1. Ba lực kết hợp

**Thuyết lực kéo–thoát hơi nước (cohesion-tension theory)** dựa trên 3 lực:

| Lực | Nghĩa | Ý nghĩa |
|-----|-------|---------|
| **Cohesion** | Liên kết hydrogen giữa các phân tử H₂O | Cột nước không đứt khi bị kéo |
| **Adhesion** | H₂O bám vào thành xylem (cellulose, ưa nước) | Cột nước "leo" được lên thành ống mỏng |
| **Tension** | Lực kéo do bay hơi ở lá | "Động cơ" hút cột nước lên |

Cohesion + adhesion giữ cho cột nước **liên tục** (không tạo bọt khí); tension là **lực kéo** ở đầu trên.

### 3.2. Giới hạn vật lý — cao nhất bao nhiêu?

Áp suất khí quyển chỉ đẩy nước lên ~10 m (lý thuyết bơm hút). Vậy sao cây cao **115 m** (Sequoia tại California) đưa nước được tới ngọn?

Vì lực kéo–thoát hơi nước **không bị giới hạn bởi áp suất khí quyển** — cột nước bị "kéo căng" với áp suất **âm** (tension, lên tới −2 MPa). Liên kết hydrogen đủ mạnh để chịu lực kéo này. Giới hạn lý thuyết: ~120–130 m, sau đó tension vượt sức bền của cột nước → cột đứt (cavitation).

### 3.3. Cavitation — khi cột nước đứt

Nếu tension quá lớn, hoặc có khí lọt vào, **bong bóng khí** xuất hiện trong xylem — gọi là **embolism** hay **cavitation**. Đoạn ống có bong bóng mất khả năng dẫn nước. Cây có cơ chế "đi vòng" qua ống khác và sửa chữa ban đêm (khi tension giảm).

### 3.4. Bốn ví dụ số cụ thể

**Ví dụ 1 — Cây Sequoia 115 m**: tension cần ở ngọn ~**−2 MPa** (gồm trọng lượng cột + ma sát + thế nước thấp ở lá). Lực kéo đủ vì liên kết hydrogen của nước có thể chịu tension đến ~−30 MPa trong điều kiện lý tưởng (đo trong ống mao quản sạch).

**Ví dụ 2 — Một cây ngô thoát ~200 L nước/đời**: trong 1 vụ ~120 ngày, trung bình ~**1.7 L/ngày**. Cao điểm trưa nắng có thể lên ~3 L/ngày.

**Ví dụ 3 — Một cây sồi to thoát ~200,000 L/đời** (vài chục năm) — bằng một bể bơi gia đình. So với khối lượng khô của cây (vài tấn), tỷ lệ "nước thoát/sinh khối" lên tới **~500:1**.

**Ví dụ 4 — Áp suất rễ ban đêm (root pressure)**: Ban đêm khí khổng đóng, thoát hơi nước rất thấp → tension không kéo nước; nhưng ion vẫn được bơm vào mạch gỗ → tạo thế nước thấp → nước chảy vào → áp suất rễ dương ~**+0.1 MPa**. Đẩy nước lên cao nhất ~10 m. Hệ quả: ban đêm bạn thấy giọt nước đọng ở mép lá (cỏ, cây con) — gọi là **ứa giọt (guttation)**. Khác với sương! Guttation là nước rỉ ra từ trong cây qua lỗ thủy khổng (hydathode).

### ❓ Câu hỏi tự nhiên của người đọc

**Q: Sao cây không "uống" rồi cần năng lượng đẩy nước lên như chúng ta tưởng tượng?**
A: Vì như vậy quá tốn ATP — một cây cao 100 m phải đẩy hàng tấn nước/ngày. Tiến hóa "khôn" hơn: lợi dụng **năng lượng mặt trời** làm bay hơi ở lá → tạo tension miễn phí. Cây chỉ tốn ATP cho việc bơm ion ở rễ (gián tiếp duy trì gradient).

**Q: Cây có thể bị "nghẹn" không?**
A: Có — đó là **cavitation**. Mùa đông lạnh, nước trong xylem đông → tan ra tạo bong bóng → đoạn ống đó "tắc". Cây ôn đới có cơ chế "đi vòng" qua các ống xylem khác. Đây là một trong lý do cây vùng băng giá hay rụng lá vào đông để giảm thoát hơi nước.

**Q: Cây xương rồng có thoát hơi nước nhiều không?**
A: Rất ít. Chúng đóng khí khổng ban ngày, mở ban đêm (cơ chế CAM); đồng thời giảm diện tích lá thành gai. Đây là thích nghi khô hạn.

### ⚠ Lỗi thường gặp

- **Nghĩ "áp suất rễ đẩy nước lên ngọn cây cao"**: SAI. Áp suất rễ chỉ đẩy được ~10 m. Cây cao 50–100 m hoàn toàn nhờ tension từ thoát hơi nước.
- **Nhầm cohesion với adhesion**: cohesion = nước với nước; adhesion = nước với thành ống. Cả hai cần thiết, nhưng cohesion là chính.
- **Nghĩ thoát hơi nước là "lãng phí"**: thực tế nó là **động cơ vận chuyển** miễn phí. Mất 90% nước là "chi phí cần thiết" để đưa khoáng và làm mát lá.

### 🔁 Dừng lại tự kiểm tra

1. Nếu bạn cắt ngang thân một cây hoa cúc rồi cắm vào bình mực đỏ, sau vài giờ mực leo lên đến ngọn. Mạch nào dẫn mực, và lực nào kéo?
2. Vì sao cây "ứa giọt" lúc rạng đông trên đồng lúa nhưng không thấy lúc trưa nắng?

<details>
<summary>Đáp án</summary>

1. **Xylem (mạch gỗ)** dẫn mực. Lực kéo là **tension từ thoát hơi nước** ở lá (gió + nắng làm bay hơi → tạo lực hút âm trong xylem → kéo cột chất lỏng có mực lên ngọn). Đây là thí nghiệm kinh điển chứng minh thuyết cohesion-tension.

2. **Ban đêm + rạng đông**: khí khổng **đóng** → không thoát hơi nước → không có tension kéo. Nhưng **áp suất rễ vẫn dương** (ion vẫn bơm vào mạch gỗ) → đẩy nước thừa qua lỗ thủy khổng (hydathode) ra mép lá → tạo giọt. **Trưa nắng**: thoát hơi nước rất mạnh → tension âm rất lớn → nước trong cây bị "kéo căng", không có dư để rỉ ra → không có ứa giọt. Đồng thời sương buổi sáng có thể nhầm với guttation, nhưng sương là hơi nước trong không khí ngưng tụ, còn guttation là nước từ bên trong cây ra.
</details>

### 📝 Tóm tắt mục 3

- **Cohesion-tension theory**: 3 lực — cohesion (H₂O – H₂O), adhesion (H₂O – thành ống), tension (lực kéo từ bay hơi ở lá).
- Cây cao đến ~120 m vẫn đưa nước lên ngọn được vì liên kết hydrogen của nước chịu được tension âm cực lớn (~−2 MPa thực tế, lý thuyết tới −30 MPa).
- **Áp suất rễ** chỉ đẩy ~10 m, không đủ cho cây cao; nhưng tạo ra hiện tượng **ứa giọt (guttation)** ban đêm.
- Cavitation = bong bóng khí làm đứt cột nước; cây có cơ chế "đi vòng" và sửa ban đêm.

---

## 4. Khí khổng — cánh cửa đánh đổi giữa quang hợp và giữ nước

### 💡 Trực giác / Hình dung

**Khí khổng (stomata)** là **hàng triệu cái cửa siêu nhỏ** trên mặt dưới của lá. Mỗi cửa có 2 cánh — **tế bào hạt đậu (guard cell)**. Khi 2 cánh **trương nước** thì cong ra → cửa **mở** (như 2 quả bóng dài bơm căng); khi **mất nước** thì duỗi thẳng → cửa **đóng**.

Cái khó: cây phải mở cửa để **CO₂ vào** (cho quang hợp), nhưng mở cửa thì **H₂O ra** (mất nước). Mọi quyết định đóng/mở là một **đánh đổi**.

### 4.1. Cơ chế mở khí khổng

Khi có ánh sáng (hoặc thiếu CO₂ trong lá):

1. Tế bào hạt đậu **bơm K⁺ chủ động vào** (qua bơm proton + kênh K⁺), tốn ATP.
2. K⁺ nội bào tăng → thế nước trong tế bào hạt đậu **giảm** → nước **theo thẩm thấu vào**.
3. Tế bào hạt đậu **trương nước (turgid)** → vì thành tế bào có cấu trúc đặc biệt (sợi cellulose xếp vòng) nên khi trương, 2 tế bào cong ra ngoài → **lỗ khí mở**.
4. CO₂ khuếch tán **vào** (cho quang hợp); H₂O **bay hơi ra** (thoát hơi nước, tạo tension kéo xylem).

### 4.2. Cơ chế đóng khí khổng

Khi cây thiếu nước:

1. Rễ phát hiện thiếu nước → tổng hợp hormone **ABA (abscisic acid)**.
2. ABA theo xylem lên lá → tác động lên tế bào hạt đậu.
3. ABA mở **kênh ion ra** → K⁺ và Cl⁻ **ra khỏi** tế bào hạt đậu.
4. Mất ion → thế nước tăng → nước **ra khỏi** tế bào hạt đậu → tế bào **xẹp (flaccid)** → 2 cánh duỗi thẳng → **lỗ khí đóng**.

Khí khổng cũng đóng khi: ban đêm (không cần CO₂), CO₂ trong lá cao (quang hợp đã đủ), nhiệt độ quá cao (cây bảo vệ chống mất nước).

### 4.3. Bốn ví dụ số cụ thể

**Ví dụ 1 — Mật độ khí khổng**: Một lá ngô bình thường có ~**5,000–25,000 khí khổng/cm²** ở mặt dưới (mặt trên thường ít hoặc không có ở cây trên cạn). Cả lá có hàng triệu khí khổng.

**Ví dụ 2 — Lượng nước thoát qua 1 khí khổng**: Khi mở, một khí khổng để ~**5 × 10⁻¹² L/giây** nước thoát qua. Nhỏ, nhưng nhân với hàng triệu khí khổng → tổng cộng vài mL/giờ trên 1 lá.

**Ví dụ 3 — Đánh đổi lá ngô**: Một lá ngô đang quang hợp tốt mở khí khổng đầy đủ thoát ~**200 mL nước/ngày**. Đổi lại, lá đó tổng hợp được ~**1–2 g đường**. Tỉ lệ nước/đường ~**100–200 : 1** — phải mất 100–200 phân tử nước để có được 1 phân tử CO₂ vào → cây bị "lỗ vốn" nước.

**Ví dụ 4 — Cả đời cây ngô**: Tổng thoát hơi nước ~**200 L/cây/đời** (theo Ví dụ 2 mục 3). Để cho ra ~100 g hạt khô. Tỷ lệ "nước/sinh khối hạt" cực cao — đây là lý do nông nghiệp tốn nước.

### 4.4. Thích nghi của cây khô hạn — cơ chế CAM

Cây xương rồng, dứa, cây lưỡi hổ dùng **CAM (Crassulacean Acid Metabolism)**: **mở khí khổng ban đêm** (lúc mát, ít mất nước) để hút CO₂, tích trữ dưới dạng acid hữu cơ; ban ngày **đóng khí khổng** nhưng vẫn quang hợp bằng CO₂ đã tích trữ. Nhược điểm: chậm sinh trưởng (vì lượng CO₂ tích trữ giới hạn).

### ❓ Câu hỏi tự nhiên của người đọc

**Q: Vì sao khí khổng chỉ ở mặt dưới lá?**
A: Mặt dưới ít ánh sáng và nhiệt trực tiếp hơn mặt trên → bay hơi chậm hơn → giảm mất nước. Lá súng (lá nổi trên mặt nước) thì ngược: khí khổng ở **mặt trên** vì mặt dưới chìm trong nước, không trao đổi khí được.

**Q: Cây có thể "cảm nhận" thiếu nước nhanh đến mức nào?**
A: Rất nhanh — chỉ vài phút sau khi rễ khô là ABA đã tăng và khí khổng đã đóng. Đây là phản xạ sinh lý nhanh nhất ở thực vật (vì không có thần kinh, mọi thứ qua hormone).

### ⚠ Lỗi thường gặp

- **Nghĩ "khí khổng đóng là cây nghỉ"**: SAI — đóng khí khổng cũng đồng nghĩa dừng quang hợp. Cây trong stress khô hạn vừa thiếu nước vừa thiếu năng lượng.
- **Nhầm cơ chế đóng/mở với van cơ học**: nó không phải van — đó là 2 tế bào **trương/xẹp** do thẩm thấu. Lực kéo cong là từ cấu trúc sợi cellulose của thành tế bào.
- **Nghĩ ABA = hormone "tốt"**: ABA là hormone **stress**. Mức ABA cao nghĩa là cây đang trong tình trạng khắc nghiệt.

### 🔁 Dừng lại tự kiểm tra

1. Cây trong nhà bị héo lá khi quên tưới 2 ngày. Sau khi tưới đủ nước, lá hồi lại sau ~30 phút. Giải thích cơ chế.
2. Vì sao xương rồng quang hợp chậm hơn cây ngô dù cùng có lục lạp?

<details>
<summary>Đáp án</summary>

1. Khi đất khô, ABA tăng → khí khổng đóng → tế bào lá mất nước → áp suất trương (turgor) giảm → lá mềm, héo (rủ). Khi tưới nước: rễ hấp thụ nước → nước qua xylem lên lá → tế bào trương lại → ABA giảm → khí khổng mở → áp suất trương phục hồi → lá cứng lại. Toàn bộ cơ chế là **thẩm thấu + hormone**, không có cơ bắp hay vận động chủ động.

2. Xương rồng dùng cơ chế **CAM**: mở khí khổng ban đêm để hút CO₂ (tránh mất nước ban ngày), lưu CO₂ dưới dạng acid hữu cơ. Lượng CO₂ tích trữ ban đêm có giới hạn (dung tích không bào của tế bào lá thịt), nên quang hợp ban ngày bị "đói" CO₂ → chậm. Đổi lại, xương rồng sống được nơi khô hạn mà ngô không sống nổi. Đây là ví dụ đánh đổi tốc độ vs khả năng sống sót.
</details>

### 📝 Tóm tắt mục 4

- Khí khổng = 2 tế bào hạt đậu; mở khi trương nước (K⁺ vào → H₂O vào theo thẩm thấu).
- Đóng khi mất nước hoặc có ABA (hormone stress khô hạn).
- Đánh đổi cốt lõi: mở = CO₂ vào (quang hợp được) + H₂O ra (mất nước); đóng = ngược lại.
- Cây CAM tách 2 chiều: mở ban đêm hút CO₂, đóng ban ngày tiếp tục quang hợp từ CO₂ tích trữ.

---

## 5. Hormone thực vật — 5 nhóm chính

### 💡 Trực giác / Hình dung

Cây không có hệ thần kinh, nhưng nó "ra quyết định": nảy mầm khi nào, ra hoa lúc nào, rụng lá lúc nào, mọc về phía sáng, đóng khí khổng khi hạn... Toàn bộ điều phối qua **hormone (phytohormone)** — phân tử tín hiệu khuếch tán trong cây. Hormone không phải "lệnh tức thời" như thần kinh, mà là "tín hiệu nồng độ" — chậm hơn, nhưng đủ cho cây.

### 5.1. Bảng 5 nhóm hormone

| Hormone | Vai trò chính | Sinh tổng hợp ở | Hiện tượng dễ thấy |
|---------|---------------|-----------------|---------------------|
| **Auxin** (IAA) | Kéo dài tế bào, ra rễ, hướng quang/hướng đất | Đỉnh thân, lá non | Thân nghiêng về phía sáng; cắt cành cắm rễ ra rễ |
| **Gibberellin** (GA) | Nảy mầm hạt, kéo dài thân, nở hoa | Hạt, rễ, lá non | Lúa lùn cao lên nếu phun GA; nho không hạt to ra |
| **Cytokinin** | Phân bào, làm chậm lão hóa, mọc chồi nách | Rễ | Cành cấy mô (tissue culture) cần cytokinin để mọc chồi |
| **ABA** (abscisic acid) | Đóng khí khổng (stress khô), ngủ hạt, ngủ chồi | Rễ, lá khô | Khí khổng đóng khi cây thiếu nước |
| **Ethylene** (C₂H₄, dạng **khí**) | Chín quả, lão hóa, rụng lá | Quả chín, mô già | Quả xanh xếp gần quả chín chín nhanh hơn |

### 5.2. Auxin và hướng động — ví dụ kinh điển

**Hướng quang (phototropism)**: cây con đặt cạnh cửa sổ nghiêng về phía sáng. Cơ chế:

1. Ánh sáng làm **auxin** di chuyển từ phía sáng sang **phía tối** của thân.
2. Auxin kích thích **kéo dài tế bào** → phía tối có nhiều auxin hơn → tế bào phía tối dài hơn phía sáng.
3. Phía tối dài hơn → thân cong **về phía sáng**.

**Hướng đất (gravitropism)**: rễ luôn mọc xuống, thân luôn mọc lên — dù gieo hạt ngược.

- Ở rễ: auxin tích phía dưới → ở rễ, auxin nồng độ cao **ức chế** kéo dài → phía dưới ngắn → rễ cong xuống.
- Ở thân: auxin tích phía dưới → ở thân, auxin **kích thích** kéo dài → phía dưới dài → thân cong lên.

Cùng auxin, **tác động ngược nhau giữa rễ và thân** — vì độ nhạy cảm khác nhau.

**Hướng tiếp xúc (thigmotropism)**: dây leo bám trục → tua cuốn tiếp xúc → auxin tích phía không tiếp xúc → bên đó dài ra → cuốn vòng quanh trục.

### 5.3. Ethylene và chín quả — phản ứng tự kích

Quả chín giải phóng **ethylene (C₂H₄, dạng khí)**. Ethylene kích thích chính quả đó (và các quả lân cận) sản xuất thêm ethylene + enzyme phân giải thành tế bào → quả mềm + chuyển màu + thơm. Đây là **vòng phản hồi dương (positive feedback)** — chín càng nhanh càng kích thích chín nhanh hơn.

Ứng dụng thực tế:

- Người trồng chuối cắt khi còn xanh, vận chuyển đường dài, phun ethylene khi gần bán → chuối chín đồng loạt.
- **Mẹo dân gian**: xếp quả xanh (chuối, bơ) trong túi giấy kín với một quả táo chín → ethylene của táo làm các quả kia chín nhanh hơn.
- Bảo quản lạnh giảm sản xuất ethylene → trái cây tươi lâu.

### 5.4. Bốn ví dụ số cụ thể về liều lượng

**Ví dụ 1 — Auxin trong cây**: nồng độ tự nhiên ~**10⁻⁸ – 10⁻⁵ M**. Phun **10⁻⁵ M auxin tổng hợp** lên cành cắt → ra rễ mạnh; phun **10⁻³ M (quá nồng)** → chết cây. Đó là cách hoạt động của một số thuốc diệt cỏ "auxin tổng hợp" như **2,4-D** — không phải độc trực tiếp, mà là "auxin liều quá tải".

**Ví dụ 2 — Gibberellin trên lúa**: lúa đột biến *dwarf* thiếu enzyme tổng hợp GA → cao chỉ ~30 cm thay vì ~80 cm. Phun GA ngoại sinh → lúa cao lại bình thường. Đây là bằng chứng GA = hormone kéo dài thân.

**Ví dụ 3 — Ethylene và quả**: 1 quả táo chín giải phóng ~**1 μL ethylene/kg/giờ**. Trong túi giấy kín 5 L chứa 5 quả táo + 1 quả bơ xanh → nồng độ ethylene đủ làm bơ chín trong **2–3 ngày** (thay vì 5–7 ngày nếu để riêng).

**Ví dụ 4 — ABA trên khí khổng**: nồng độ ABA bình thường trong lá ~**0.05 μM**; khi cây khô hạn, ABA tăng lên ~**0.5 μM** (gấp 10 lần). Đủ để đóng khí khổng trong **5–10 phút**.

### ⚠ Lỗi thường gặp

- **Nghĩ hormone thực vật giống hormone động vật về tốc độ**: hormone thực vật chậm hơn, đáp ứng tính bằng **phút–giờ–ngày**, không phải giây như thần kinh.
- **Nhầm "auxin = chất kích thích tăng trưởng tuyệt đối"**: SAI — quá liều auxin **ức chế** (đặc biệt ở rễ). Đáp ứng auxin có **đường cong hình chuông** — liều thấp kích thích, liều cao ức chế.
- **Quên ethylene là khí**: vì là khí, ethylene khuếch tán giữa quả → các quả ảnh hưởng lẫn nhau. Đây là điểm đặc biệt: hormone duy nhất ở dạng khí trong thực vật.

### ❓ Câu hỏi tự nhiên của người đọc

**Q: Vì sao cắt ngọn cây thì cây mọc tán rộng hơn?**
A: Đỉnh ngọn tiết auxin xuống dưới, **ức chế chồi nách** (hiện tượng **ưu thế ngọn — apical dominance**). Cắt ngọn → mất nguồn auxin → chồi nách được "giải phóng" → mọc ra → cây bụ rộng. Đây là nguyên lý cắt tỉa cây cảnh, cây ăn quả.

**Q: Tại sao chuối để gần táo chín nhanh, nhưng để trong tủ lạnh thì lâu chín?**
A: Tủ lạnh ức chế tổng hợp ethylene (enzyme cần nhiệt độ ấm). Để gần táo: ethylene từ táo khuếch tán sang → kích thích chuối tự sản xuất ethylene → chín nhanh (phản hồi dương).

### 🔁 Dừng lại tự kiểm tra

1. Một cây con đặt nằm ngang trên bàn (rễ và thân song song mặt bàn). Sau 1 ngày, rễ uốn xuống, thân uốn lên. Giải thích bằng auxin.
2. Vì sao hạt lúa nảy mầm khi ngâm nước, dù trước đó hạt khô ngủ?

<details>
<summary>Đáp án</summary>

1. Trọng lực kéo auxin về phía **dưới** của cả rễ và thân (do amyloplast trong tế bào lắng xuống → tín hiệu phân bố auxin theo trọng lực). Ở **rễ**: phía dưới có nhiều auxin → ức chế kéo dài (vì rễ rất nhạy auxin) → phía trên dài hơn → rễ cong xuống. Ở **thân**: phía dưới có nhiều auxin → kích thích kéo dài (vì thân ít nhạy auxin hơn) → phía dưới dài hơn → thân cong lên. Cùng auxin, hai mô đáp ứng ngược nhau.

2. Hạt khô có **ABA** cao (gây ngủ). Khi ngâm nước, hạt hút nước → **gibberellin (GA)** được tổng hợp → GA kích hoạt enzyme α-amylase (phân giải tinh bột dự trữ thành glucose) → cung cấp năng lượng cho phôi → phôi phát triển → mầm nhú ra. Tỉ lệ GA/ABA tăng đột ngột = "tín hiệu thức dậy".
</details>

### 📝 Tóm tắt mục 5

- 5 nhóm hormone chính: auxin (kéo dài, hướng động), gibberellin (nảy mầm, cao thân), cytokinin (phân bào, chống lão hóa), ABA (stress, đóng khí khổng), ethylene (chín quả, là khí).
- **Auxin** dồn về phía tối → thân nghiêng về phía sáng; ở rễ và thân, đáp ứng ngược nhau theo trọng lực.
- **Ethylene** dạng khí → quả chín lan ra quả khác (mẹo "túi giấy + táo").
- Hormone thực vật chậm hơn hormone động vật (phút–ngày, không phải giây).

---

## 6. Bảng tổng hợp các cơ chế

| Cơ chế | Phương tiện | Tốn ATP? | Động lực |
|--------|-------------|----------|----------|
| Hấp thụ nước ở rễ | Thẩm thấu qua lông hút | Không (gián tiếp vì cần bơm ion) | Gradient thế nước |
| Hấp thụ khoáng | Bơm proton + kênh ion | **Có** | ATP |
| Đẩy nước lên xylem | Tension từ thoát hơi | Không | Năng lượng mặt trời (bay hơi) |
| Vận chuyển phloem | Bơm sucrose chủ động | **Có** | ATP + thẩm thấu nước theo |
| Mở khí khổng | Bơm K⁺ + thẩm thấu | **Có** | ATP |
| Đóng khí khổng (stress) | ABA kích thích ion ra | Không (bị động) | Gradient ngược |
| Hướng quang | Auxin di chuyển + kéo dài tế bào | Không | Phân bố hormone |

---

## 7. Bài tập + Lời giải chi tiết

### Bài tập

**Bài 1**: Phân biệt 2 đường nước đi vào rễ (apoplast vs symplast). Đai Caspary buộc nước đi theo đường nào trước khi vào mạch gỗ? Vì sao điều này có lợi cho cây?

**Bài 2**: Một cây sồi trưởng thành thoát ~**150 L nước/ngày** vào ngày nắng. Biết 1 phân tử nước ($\\text{H}_2\\text{O}$) có khối lượng mol 18 g/mol và $1 \\text{ mol} = 6{,}022 \\times 10^{23}$ phân tử. Tính số phân tử nước thoát ra mỗi giây ở cây sồi đó.

**Bài 3**: Một cây ngô cao 2 m thoát ~200 mL nước/ngày qua 1 lá đầy đủ ánh sáng. Lá có ~10⁷ khí khổng. Tính lượng nước trung bình thoát qua 1 khí khổng trong 1 giờ. So sánh với "lưu lượng" của một vòi nước nhà bếp (~10 L/phút). Bao nhiêu khí khổng mở cùng lúc mới ngang vòi nước?

**Bài 4**: Bóc một dải vỏ vòng quanh thân cây 1 cm — sau 2 tuần, cây có hiện tượng gì? Phần phía trên vết bóc và phía dưới vết bóc khác nhau ra sao? Giải thích theo xylem/phloem.

**Bài 5**: Cây con đặt trong hộp tối, một bên có khe sáng. Sau 3 ngày cây cong về phía khe sáng. Vẽ phân bố auxin trong thân và giải thích cơ chế. Nếu cắt bỏ đỉnh ngọn (nơi sinh auxin) thì cây có còn hướng quang không?

**Bài 6**: Một người nông dân muốn cho buồng chuối xanh chín đồng loạt để xuất ra chợ. Đề xuất 2 cách dựa trên kiến thức về hormone, kèm cơ chế.

**Bài 7**: Cây sequoia cao 115 m. Áp suất cần để đẩy cột nước cao 115 m (không tính ma sát) bằng bao nhiêu? Biết khối lượng riêng nước = 1000 kg/m³ và $g = 9{,}8$ m/s². So sánh với áp suất khí quyển (~0,1 MPa) — vì sao bơm hút thường không kéo nước lên cao hơn 10 m nhưng cây sequoia làm được?

### Lời giải

**Bài 1**:
- **Apoplast** = nước đi qua **khoảng trống giữa các thành tế bào** (cell wall), không qua màng → nhanh, không chọn lọc.
- **Symplast** = nước đi **qua tế bào chất**, từ tế bào này sang tế bào kia qua **plasmodesmata** (cầu nối tế bào chất) → chậm hơn, đã qua sàng lọc.
- **Đai Caspary** ở nội bì là dải suberin kỵ nước → **bịt apoplast** → buộc nước phải **xuyên màng vào symplast** trước khi vào mạch gỗ.
- **Lợi ích**: cây kiểm soát được ion/chất gì cho vào (qua kênh chuyên biệt trên màng), chặn được ion độc và vi khuẩn không có "vé" qua màng. Nếu không có đai Caspary, mọi thứ trong đất sẽ trực tiếp xông vào xylem.

**Bài 2**:
- $150 \\text{ L} = 150\\,000 \\text{ g} = 150\\,000 / 18 \\approx \\mathbf{8\\,333}$ **mol** nước/ngày.
- Số phân tử: $8\\,333 \\times 6{,}022 \\times 10^{23} \\approx \\mathbf{5{,}02 \\times 10^{27}}$ **phân tử/ngày**.
- $1 \\text{ ngày} = 86\\,400$ giây → $\\approx 5{,}02 \\times 10^{27} / 86\\,400 \\approx \\mathbf{5{,}8 \\times 10^{22}}$ **phân tử/giây**.
- So sánh trực giác: một dòng nước hàng tỷ tỷ phân tử/giây len qua hàng triệu khí khổng — đó là quy mô của thoát hơi nước.

**Bài 3**:
- $200 \\text{ mL} / \\text{ngày} / 10^7 \\text{ khí khổng} = 2 \\times 10^{-5} \\text{ mL} = \\mathbf{2 \\times 10^{-5}}$ **mL/ngày/khí khổng**.
- 1 ngày ~ 24 giờ (nhưng khí khổng chỉ mở ban ngày ~12 giờ) → trong giờ mở: $2 \\times 10^{-5} / 12 \\approx \\mathbf{1{,}7 \\times 10^{-6}}$ **mL/giờ/khí khổng** = 1,7 nL/giờ.
- Vòi nước nhà bếp 10 L/phút = 600 L/giờ = $6 \\times 10^5$ mL/giờ.
- Số khí khổng cần để ngang vòi nước $= 6 \\times 10^5 / (1{,}7 \\times 10^{-6}) \\approx \\mathbf{3{,}5 \\times 10^{11}}$ **khí khổng** (350 tỷ).
- Tương đương ~35,000 cây ngô cùng thoát hơi nước cùng lúc mới ngang 1 vòi nước nhà bếp. Cho thấy mỗi khí khổng cá nhân là vi mô, nhưng **tổng cộng cả rừng lá rất đáng kể**.

**Bài 4**:
- Bóc 1 dải vỏ = cắt **phloem** (mạch rây nằm ở lớp gần vỏ, ngay dưới lớp biểu bì). **Xylem** nằm ở lõi gỗ trong, vẫn nguyên.
- **Phần trên vết bóc**: lá vẫn nhận nước từ xylem (đi từ rễ lên qua lõi gỗ, không bị ảnh hưởng) → vẫn quang hợp. Đường tạo ra **không xuống được rễ** (phloem đứt). Đường tích tụ phía trên → **sưng phình** ngay trên vết bóc.
- **Phần dưới vết bóc**: rễ không nhận được đường từ lá → **đói** → ngừng hô hấp → ngừng bơm ion → cuối cùng rễ chết → cả cây chết (sau vài tháng, tùy mùa).
- Đây là kỹ thuật **"khoanh vỏ" (girdling)** dùng để diệt cây dại không cần cưa.

**Bài 5**:
- Khe sáng ở 1 phía → ánh sáng kích hoạt phototropin (thụ thể ánh sáng) → **auxin di chuyển từ phía sáng sang phía tối** của thân.
- Phía tối nhiều auxin hơn → tế bào phía tối **kéo dài** nhiều hơn → thân cong **về phía sáng**.

\`\`\`
   Khe sáng    (thân nhìn ngang)
   ─────────► [phía sáng — auxin ít — tế bào ngắn]
              [trục cây]
              [phía tối — auxin nhiều — tế bào dài]
                                              ▼
              thân cong sang phía sáng (vì phía tối dài hơn)
\`\`\`

- **Cắt đỉnh ngọn**: đỉnh ngọn là nơi tổng hợp auxin chính. Không có auxin → không có cơ chế kéo dài bất đối xứng → cây **mất hướng quang**. Thí nghiệm Darwin và Boysen-Jensen (~1880–1913) đã chứng minh điều này.

**Bài 6**:

Cách 1 — **Phun ethylene tổng hợp** (hoặc khí ethephon — tiền chất phân hủy thành ethylene):
- Cơ chế: ethylene kích thích enzyme phân giải tinh bột → glucose; phân giải chlorophyll (xanh) → carotenoid (vàng); phân giải pectin → quả mềm.
- Phản hồi dương: ethylene kích thích chính quả sản xuất thêm ethylene → đồng loạt.

Cách 2 — **Xếp buồng chuối kín với quả chín (vd táo)**:
- Quả chín tự nhiên giải phóng ethylene → khuếch tán sang chuối → kích thích chuối tự sản xuất ethylene → chín đồng loạt.
- Cơ chế giống cách 1 nhưng không cần hóa chất công nghiệp.

Cả 2 cách đều dùng nguyên lý **ethylene = hormone chín quả, là khí, có phản hồi dương**.

**Bài 7**:
- Áp suất thủy tĩnh của cột nước cao $h$: $P = \\rho g h = 1000 \\times 9{,}8 \\times 115 = \\mathbf{1\\,127\\,000}$ **Pa** $\\approx 1{,}13$ **MPa**.
- Áp suất khí quyển = **0,101 MPa**.
- Bơm hút (suck pump) chỉ kéo được cột nước cao tối đa $= P_{atm} / (\\rho g) = 101\\,300 / (1000 \\times 9{,}8) \\approx \\mathbf{10{,}3}$ **m** — vì bơm hút thực ra là tạo chân không, và áp suất khí quyển đẩy nước lên. Trên 10 m, dù chân không tuyệt đối, áp suất khí quyển không đủ.
- Cây sequoia làm được vì **không dùng áp suất khí quyển đẩy**, mà dùng **tension âm** (lực kéo căng cột nước qua liên kết hydrogen). Tension âm trong xylem có thể đạt **−2 MPa**, đủ kéo cột nước cao 115 m. Đây là điểm tinh tế: cây không "bơm" nước lên, cây "kéo" nước lên — và liên kết hydrogen của nước đủ mạnh để chịu lực kéo này mà không đứt cột.
- Bài này minh họa rõ **sức mạnh cohesion-tension theory** — một cơ chế "kéo thay vì đẩy" mà tiến hóa "phát kiến" hàng trăm triệu năm trước con người.

---

## 8. Liên kết và bài tiếp theo

- **Bài tiếp theo**: [Lesson 06 — Sinh thái quần thể](../lesson-06-ecology-populations/) — chuyển từ sinh lý cá thể (1 cây) sang sinh thái nhóm (quần thể, mật độ, cạnh tranh).
- **Liên kết Biology Tầng 1**:
  - [Lesson 06 — Quang hợp](../../01-Molecules-Cells/lesson-06-photosynthesis/) — phản ứng tổng hợp glucose ở lá; bài này nói về hệ vận chuyển hỗ trợ quang hợp.
  - [Lesson 03 — Vận chuyển qua màng](../../01-Molecules-Cells/lesson-03-membrane-transport/) — thẩm thấu, bơm chủ động — nền tảng của mọi cơ chế trong bài.
  - [Lesson 02 — Cấu trúc tế bào](../../01-Molecules-Cells/lesson-02-cell-structure/) — thành tế bào và bào quan ở rễ/lá.
- **Liên kết Tầng 3 — Sinh lý động vật**: so sánh với [Lesson 02 — Tuần hoàn và hô hấp](../lesson-02-circulation-respiration/) — động vật có tim bơm chủ động (tốn năng lượng); thực vật dùng thoát hơi nước (miễn phí). Hai chiến lược khác nhau cho cùng bài toán "vận chuyển chất lỏng".

---

## 📝 Tổng kết Lesson 05

1. **Hấp thụ ở rễ**: lông hút tăng diện tích bề mặt; nước theo 2 đường apoplast và symplast; đai Caspary buộc nước qua màng để cây chọn lọc ion; nước bị động, ion bơm chủ động.
2. **Hai mạch dẫn**: xylem (chết, rỗng, một chiều rễ → lá, vận chuyển nước) và phloem (sống, hai chiều source → sink, vận chuyển sucrose, tốn ATP).
3. **Cohesion-tension theory**: cây cao đến ~120 m vẫn đưa nước lên ngọn nhờ tension từ thoát hơi nước + liên kết hydrogen giữa các phân tử nước (cohesion) + nước bám thành ống (adhesion). Không tốn ATP ở xylem. Áp suất rễ hỗ trợ nhỏ (~10 m), tạo hiện tượng ứa giọt ban đêm.
4. **Khí khổng**: 2 tế bào hạt đậu; mở khi trương nước (K⁺ vào), đóng khi mất nước hoặc có ABA. Đánh đổi giữa quang hợp (cần CO₂ vào) và giữ nước.
5. **5 nhóm hormone**: auxin (kéo dài, hướng động), gibberellin (nảy mầm, kéo dài thân), cytokinin (phân bào), ABA (stress, đóng khí khổng), ethylene (chín quả, dạng khí).
6. **Lượng hóa**: 1 cây ngô ~200 L nước/đời để cho ~100 g hạt; phloem ~1 m/giờ; xylem ~15–45 m/giờ; áp suất cột nước cây 115 m ~1.13 MPa.

**Tiếp theo**: [Lesson 06 — Sinh thái quần thể](../lesson-06-ecology-populations/)
`;
