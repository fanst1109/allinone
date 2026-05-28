// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: Biology/01-Molecules-Cells/lesson-03-membrane-transport/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 03 — Màng & vận chuyển

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Mô tả **mô hình khảm động (fluid mosaic model)** của màng sinh chất: lớp kép phospholipid, protein màng, cholesterol, carbohydrate bề mặt — và vì sao màng "lỏng".
- Giải thích **tính thấm chọn lọc (selective permeability)**: phân tử nào qua được màng tự do, phân tử nào cần protein vận chuyển, và **vì sao**.
- Phân biệt **vận chuyển thụ động (passive transport)** (không tốn ATP, xuôi gradient) gồm khuếch tán đơn giản, khuếch tán có hỗ trợ, thẩm thấu — với **vận chuyển chủ động (active transport)** (tốn ATP, ngược gradient).
- Tính được số ion vận chuyển bởi **bơm Na⁺/K⁺ (sodium-potassium pump)** theo tỉ lệ **3 Na⁺ ra : 2 K⁺ vào / 1 ATP**.
- Dự đoán **hướng di chuyển của nước** và số phận tế bào trong môi trường **nhược trương (hypotonic) / đẳng trương (isotonic) / ưu trương (hypertonic)**, với số nồng độ cụ thể.
- Phân biệt **nhập bào (endocytosis)** và **xuất bào (exocytosis)** cho vận chuyển khối lượng lớn.

## Kiến thức tiền đề

- **Phospholipid lưỡng cực và lớp kép (bilayer)** — [\`Lesson 01 — Phân tử sinh học\`](../lesson-01-biomolecules/) §5 (đầu phosphate ưa nước, đuôi acid béo kỵ nước, tự lắp thành màng kép). Đây là nền tảng trực tiếp.
- **Màng sinh chất là ranh giới tế bào** — [\`Lesson 02 — Cấu trúc tế bào\`](../lesson-02-cell-structure/) (màng bao bọc tế bào và các bào quan).
- **Nồng độ, dung dịch, mol/L** — [\`Chemistry/01-Structure/lesson-07-solutions-concentration\`](../../../Chemistry/01-Structure/lesson-07-solutions-concentration/). Thẩm thấu là một hệ quả trực tiếp của chênh lệch nồng độ chất tan.

---

## 1. Mô hình khảm động — màng được làm bằng gì?

### 💡 Trực giác / Hình dung

Hãy hình dung màng tế bào như một **bể bóng nước nổi**: hàng triệu quả bóng (phospholipid) nổi sát nhau thành một tấm thảm, đầu ưa nước (phosphate) hướng ra hai mặt tiếp xúc nước, đuôi kỵ nước giấu vào giữa. "Khảm" (mosaic) vì có các "viên gạch lạ" (protein) cắm vào tấm thảm; "động" (fluid) vì các quả bóng **trôi qua trôi lại theo chiều ngang** chứ không đứng yên như gạch xi măng. Nhờ "lỏng" mà màng tự lành lại khi bị chọc thủng nhỏ — giống mặt nước khép lại sau khi nhúng ngón tay.

### 1.1. Bốn thành phần của màng

| Thành phần | Vai trò |
|------------|---------|
| **Lớp kép phospholipid (phospholipid bilayer)** | Khung nền: đầu ưa nước (hydrophilic) quay ra ngoài, đuôi kỵ nước (hydrophobic) quay vào trong → tạo "hàng rào" cản phân tử phân cực/tích điện |
| **Protein màng (membrane protein)** | Xuyên màng (transmembrane — kênh, bơm) hoặc bám màng (peripheral); làm cổng vận chuyển, thụ thể, enzyme |
| **Cholesterol** | Cài giữa các phospholipid, giữ độ linh động vừa phải (ấm: cản bớt; lạnh: ngăn đông cứng) |
| **Carbohydrate** | Gắn vào protein (glycoprotein) hoặc lipid (glycolipid) ở mặt ngoài → "thẻ nhận dạng" tế bào |

### 1.2. Vì sao gọi là "khảm động"

- **Khảm (mosaic)**: protein rải rác như mảnh ghép trong tấm thảm phospholipid — không đồng nhất.
- **Động (fluid)**: phospholipid và phần lớn protein **trôi ngang** tự do trong mặt phẳng màng. Đo thực nghiệm: một phospholipid đổi chỗ với hàng xóm bên cạnh ~**10⁷ lần/giây**, còn lật từ mặt này sang mặt kia (flip-flop) thì rất hiếm (~1 lần/tháng) vì phải kéo đầu ưa nước qua lõi kỵ nước.

### ❓ Câu hỏi tự nhiên của người đọc

**Q: Màng "lỏng" thì sao tế bào không bị rã ra?**
A: "Lỏng" chỉ nói chuyển động **ngang trong mặt phẳng màng** — các phân tử vẫn bị giữ trong tấm thảm 2 chiều bởi lực kỵ nước (đuôi không thích nước nên không rời lõi). Giống các quả bóng nổi sát nhau trên mặt hồ: chúng trôi quanh nhưng không chìm cũng không bay ra khỏi mặt nước. Lực kỵ nước giữ cấu trúc bền mà vẫn linh động.

**Q: Cholesterol làm màng cứng hơn hay mềm hơn?**
A: Cả hai, tùy nhiệt độ — nó là "bộ điều hòa". Khi **ấm**, cholesterol chen vào cản phospholipid trôi quá nhanh → màng bớt lỏng. Khi **lạnh**, nó ngăn các phospholipid xếp khít lại đông cứng → màng bớt rắn. Kết quả: giữ độ linh động ổn định trong khoảng nhiệt rộng.

### ⚠ Lỗi thường gặp

- **Nghĩ màng là 1 lớp phospholipid**: SAI, là **lớp kép (bi-layer)** — hai lớp quay đuôi vào nhau. Một lớp đơn không che giấu được đuôi kỵ nước khỏi nước ở cả hai mặt.
- **Nghĩ protein cố định một chỗ**: phần lớn protein trôi được trong màng (động). Chỉ một số bị "neo" vào khung tế bào.
- **Nhầm "đầu kỵ nước quay ra ngoài"**: ngược lại — **đầu ưa nước** (phosphate) quay ra ngoài tiếp xúc nước, đuôi kỵ nước giấu vào trong.

### 🔁 Dừng lại tự kiểm tra

1. Vì sao đuôi acid béo lại quay vào trong lõi màng chứ không ra ngoài?
2. Glycoprotein nằm ở mặt nào của màng và làm gì?

<details>
<summary>Đáp án</summary>

1. Đuôi acid béo là chuỗi C–H **kỵ nước (hydrophobic)** — "ghét" nước. Bên trong và bên ngoài tế bào đều là môi trường nước, nên đuôi tự giấu vào lõi giữa hai lớp để tránh tiếp xúc nước; đầu phosphate ưa nước thì quay ra hai mặt nước. Đây chính là động lực tự lắp thành lớp kép.
2. Glycoprotein nằm ở **mặt ngoài** màng (phần carbohydrate luôn quay ra ngoài tế bào). Vai trò: "thẻ nhận dạng" — giúp tế bào nhận diện nhau, nhận tín hiệu, phân biệt "ta" và "lạ" (ví dụ nhóm máu A/B/O chính là khác biệt ở carbohydrate bề mặt hồng cầu).
</details>

### 📝 Tóm tắt mục 1

- Màng = lớp kép phospholipid + protein + cholesterol + carbohydrate bề mặt.
- "Khảm động": protein rải rác (khảm), phân tử trôi ngang tự do (động); lực kỵ nước giữ cấu trúc.
- Đầu ưa nước ra ngoài, đuôi kỵ nước vào trong; cholesterol điều hòa độ linh động theo nhiệt độ.

---

## 2. Tính thấm chọn lọc — ai qua được, ai không?

### 💡 Trực giác / Hình dung

Lõi kỵ nước của màng giống một **bức tường dầu mỏng**. Thứ gì "ưa dầu" (nhỏ, không phân cực) thì xuyên qua dễ như nhỏ giọt dầu vào dầu. Thứ gì "ưa nước" hoặc tích điện thì bị bức tường dầu chặn lại — phải đi qua một "cánh cửa" (protein) mới sang được. Vì màng chỉ cho một số chất qua tự do, ta gọi nó **thấm chọn lọc (selective permeability)**, không phải "thấm tất cả".

### 2.1. Quy luật ai qua dễ, ai qua khó

| Loại phân tử | Ví dụ | Qua lớp kép trực tiếp? |
|--------------|-------|------------------------|
| Nhỏ, không phân cực | O₂, CO₂, N₂ | **Rất dễ** (tan trong lõi kỵ nước) |
| Nhỏ, phân cực không tích điện | H₂O, ethanol, urea | Chậm (H₂O đủ nhỏ để lách qua, hoặc đi qua kênh aquaporin) |
| Lớn, phân cực | glucose, amino acid | **Không** — cần protein mang |
| Tích điện (ion) | Na⁺, K⁺, Cl⁻, Ca²⁺ | **Không** — cần kênh/bơm; điện tích bị lõi kỵ nước đẩy mạnh |

### 2.2. Bốn ví dụ cụ thể

**Ví dụ 1 — O₂**: phân tử nhỏ, không phân cực → khuếch tán **trực tiếp** qua lõi kỵ nước, từ phổi (nồng độ cao) vào máu, rồi vào tế bào (nồng độ thấp). Không cần protein.

**Ví dụ 2 — Glucose** (180 g/mol, nhiều nhóm –OH phân cực): quá lớn và quá phân cực → **không** lọt lõi kỵ nước. Phải đi qua protein mang **GLUT** (glucose transporter) — khuếch tán có hỗ trợ.

**Ví dụ 3 — Na⁺** (ion, tích điện +1): điện tích bị lõi kỵ nước chặn cứng → chỉ qua được khi có **kênh ion** (xuôi gradient) hoặc **bơm** (ngược gradient, tốn ATP).

**Ví dụ 4 — Nước (H₂O)**: phân tử rất nhỏ và phân cực. Lượng nhỏ lách qua lõi được, nhưng đa số đi qua kênh chuyên biệt **aquaporin** — một quả thận lọc ~180 lít nước/ngày chủ yếu nhờ aquaporin, nhanh gấp nhiều lần so với chỉ "lách qua lipid".

### ❓ Câu hỏi tự nhiên của người đọc

**Q: Vì sao điện tích lại bị màng chặn mạnh đến vậy?**
A: Lõi màng là môi trường **không phân cực, không nước**. Một ion như Na⁺ trong nước được bao quanh bởi lớp vỏ phân tử nước (hydration shell) ổn định nó. Để vào lõi kỵ nước, ion phải "cởi" lớp vỏ nước này — tốn rất nhiều năng lượng. Vì vậy ion gần như không thể tự qua; phải có kênh protein tạo "đường ống ưa nước" xuyên màng cho nó đi.

**Q: "Thấm chọn lọc" khác "bán thấm" thế nào?**
A: **Bán thấm (semipermeable)** trong vật lý/hóa thường nghĩa "cho nước qua, không cho chất tan qua" (màng lọc đơn giản). **Thấm chọn lọc (selective permeability)** của màng sinh học tinh vi hơn: tế bào **chủ động chọn** chất nào qua, qua bao nhiêu, theo chiều nào — nhờ các protein chuyên biệt. Mọi màng thấm chọn lọc đều bán thấm, nhưng không ngược lại.

### ⚠ Lỗi thường gặp

- **Nghĩ phân tử càng nhỏ càng dễ qua**: kích thước chỉ là một yếu tố. Na⁺ nhỏ hơn O₂ nhưng qua **khó hơn nhiều** vì nó tích điện. Tính phân cực/điện tích quan trọng hơn kích thước.
- **Nghĩ glucose tự khuếch tán qua màng**: glucose cần protein mang (GLUT) dù đi xuôi gradient. "Có hỗ trợ" vẫn là thụ động, nhưng không phải "đơn giản".

### 🔁 Dừng lại tự kiểm tra

1. Sắp xếp theo độ dễ qua lớp kép trực tiếp (dễ → khó): glucose, CO₂, Cl⁻.
2. Tại sao CO₂ thải ra từ tế bào có thể đi thẳng ra máu mà không cần protein?

<details>
<summary>Đáp án</summary>

1. **CO₂ > glucose > Cl⁻**. CO₂ nhỏ, không phân cực → qua trực tiếp. Glucose lớn và phân cực → cần protein mang nhưng vẫn "trung tính điện". Cl⁻ tích điện → khó nhất, cần kênh ion.
2. CO₂ là phân tử **nhỏ và không phân cực** → tan được trong lõi kỵ nước của màng nên khuếch tán đơn giản trực tiếp qua lớp kép, xuôi từ nơi nồng độ cao (trong tế bào đang hô hấp) sang nơi thấp (máu). Không cần protein, không tốn ATP.
</details>

### 📝 Tóm tắt mục 2

- Màng thấm **chọn lọc**: nhỏ + không phân cực (O₂, CO₂) qua tự do; lớn/phân cực/tích điện cần protein.
- Điện tích bị lõi kỵ nước chặn mạnh vì phải cởi vỏ nước → tốn năng lượng.
- Glucose cần GLUT; ion cần kênh/bơm; nước đi qua aquaporin là chính.

---

## 3. Vận chuyển thụ động — xuôi gradient, không tốn ATP

### 💡 Trực giác / Hình dung

Tưởng tượng một giọt mực thả vào cốc nước: mực **tự lan đều** mà không cần ai khuấy. Đó là **khuếch tán (diffusion)** — phân tử tự đi từ nơi **đông** (nồng độ cao) sang nơi **thưa** (nồng độ thấp), giống đám đông tự giãn ra khỏi chỗ chen chúc. Không tốn năng lượng vì đây là chiều "tự nhiên" — gọi là đi **xuôi gradient nồng độ (down the concentration gradient)**.

### 3.1. Gradient nồng độ là gì

**Gradient nồng độ** = chênh lệch nồng độ giữa hai phía màng. Phân tử thụ động luôn đi **từ cao sang thấp** cho tới khi **cân bằng (equilibrium)** — không phải hết phân tử một bên, mà là **nồng độ hai bên bằng nhau** (phân tử vẫn qua lại nhưng tốc độ hai chiều bằng nhau).

Ví dụ số: trong tế bào O₂ = 2 đơn vị, ngoài máu O₂ = 10 đơn vị → gradient = 10 − 2 = 8, O₂ đi **vào** tế bào cho tới khi cả hai ≈ 6 (cân bằng).

### 3.2. Ba kiểu vận chuyển thụ động

| Kiểu | Đi qua đâu | Phân tử điển hình |
|------|-----------|-------------------|
| **Khuếch tán đơn giản (simple diffusion)** | Trực tiếp qua lớp kép | O₂, CO₂ |
| **Khuếch tán có hỗ trợ (facilitated diffusion)** | Qua kênh (channel) hoặc protein mang (carrier) | glucose (GLUT), ion qua kênh |
| **Thẩm thấu (osmosis)** | Nước qua màng bán thấm (lớp kép + aquaporin) | H₂O |

Cả ba đều **không tốn ATP** và đều đi **xuôi gradient**.

### 3.3. Thẩm thấu — khuếch tán của NƯỚC

**Thẩm thấu (osmosis)** là khuếch tán của **nước** qua màng bán thấm, **từ nơi loãng chất tan → nơi đặc chất tan**.

> 💡 Điểm dễ rối: nước đi **ngược** với chất tan. Chất tan đặc ở đâu = nước "ít tự do" ở đó (bị chất tan "giữ"), nên nước từ phía loãng (nhiều nước tự do) chảy sang phía đặc để pha loãng nó ra. Nhớ: **"nước chảy về nơi mặn"**.

Bốn ví dụ số (hai phía cách nhau bởi màng chỉ cho nước qua):

**Ví dụ 1**: Trái 5% muối, Phải 1% muối → nước đi **từ Phải sang Trái** (loãng → đặc), Phải co lại.

**Ví dụ 2**: Trái 2% đường, Phải 8% đường → nước đi **từ Trái sang Phải**.

**Ví dụ 3**: Trái 3% muối, Phải 3% muối → **cân bằng**, không có dòng nước ròng.

**Ví dụ 4**: Trái nước cất (0% chất tan), Phải 0.9% NaCl → nước đi **từ Trái sang Phải** mạnh (chênh lệch lớn).

### ❓ Câu hỏi tự nhiên của người đọc

**Q: Khuếch tán có hỗ trợ vẫn cần protein, vậy sao gọi là "thụ động"?**
A: "Thụ động/chủ động" phân loại theo **năng lượng**, không phải theo "có dùng protein hay không". Khuếch tán có hỗ trợ dùng protein chỉ như "cánh cửa mở sẵn" — phân tử vẫn tự đi **xuôi gradient**, protein **không bơm**, **không tốn ATP** → thụ động. Vận chuyển chủ động mới đẩy ngược gradient và tốn ATP.

**Q: Khi đã cân bằng thì phân tử ngừng di chuyển?**
A: Không — chúng vẫn qua lại liên tục, nhưng **tốc độ hai chiều bằng nhau** nên nồng độ ròng không đổi. Đây là cân bằng động (dynamic equilibrium), không phải đứng yên.

### ⚠ Lỗi thường gặp

- **Nói "nước thẩm thấu từ đặc sang loãng"**: SAI. **Chất tan** đi từ đặc sang loãng (nếu qua được), nhưng **NƯỚC** đi **từ loãng sang đặc** (về phía nhiều chất tan). Đảo chiều là sai bản chất.
- **Coi khuếch tán có hỗ trợ là chủ động** vì "có protein": sai — không tốn ATP, vẫn xuôi gradient.
- **Nghĩ cân bằng = một bên hết sạch**: cân bằng là **nồng độ bằng nhau**, không phải dồn hết một bên.

### 🔁 Dừng lại tự kiểm tra

1. Túi màng bán thấm chứa dung dịch đường 10%, thả vào cốc nước đường 2%. Nước đi vào hay ra khỏi túi? Túi phồng hay xẹp?
2. Phân loại: glucose vào tế bào qua GLUT là thụ động hay chủ động? Có tốn ATP không?

<details>
<summary>Đáp án</summary>

1. Trong túi đặc hơn (10%) so với ngoài (2%) → nước đi **vào túi** (từ loãng ngoài → đặc trong) → túi **phồng** lên. Nhớ "nước chảy về nơi mặn/đặc".
2. **Thụ động** (khuếch tán có hỗ trợ — facilitated diffusion). Glucose đi xuôi gradient (ngoài nhiều, trong ít) qua protein mang GLUT, **không tốn ATP**. Protein chỉ làm cửa, không bơm.
</details>

### 📝 Tóm tắt mục 3

- Vận chuyển thụ động: xuôi gradient, **không tốn ATP**. Gồm khuếch tán đơn giản, có hỗ trợ, thẩm thấu.
- Gradient = chênh lệch nồng độ; phân tử đi cao → thấp tới khi cân bằng động.
- Thẩm thấu = khuếch tán của **nước** từ loãng chất tan → đặc chất tan ("nước chảy về nơi mặn").

---

## 4. Tính trương — số phận tế bào trong 3 môi trường

### 💡 Trực giác / Hình dung

Đặt một quả nho (tế bào) vào 3 cốc. Cốc **nước lã** → nho hút nước **căng mọng** (có thể nứt). Cốc **nước muối loãng vừa khớp** → nho **không đổi**. Cốc **nước muối đặc** → nho **teo nhăn nheo như nho khô**. Ba số phận này tùy chênh lệch nồng độ chất tan giữa môi trường và tế bào — gọi là **tính trương (tonicity)**.

### 4.1. Ba loại môi trường

So sánh nồng độ chất tan **bên ngoài** với **bên trong** tế bào:

| Môi trường | Định nghĩa | Hướng nước | Tế bào động vật | Tế bào thực vật |
|------------|-----------|-----------|------------------|------------------|
| **Nhược trương (hypotonic)** | Ngoài **loãng hơn** trong | Nước **vào** | Trương → có thể **vỡ (lysis)** | Trương nước **turgid** (tốt, có vách giữ) |
| **Đẳng trương (isotonic)** | Ngoài **bằng** trong | Ròng = 0 (cân bằng) | Bình thường | Hơi mềm (flaccid) |
| **Ưu trương (hypertonic)** | Ngoài **đặc hơn** trong | Nước **ra** | Co lại (**crenation**) | Co nguyên sinh (**plasmolysis**) |

> Lưu ý quan trọng: tế bào **thực vật** có **vách tế bào (cell wall)** cứng → trong nhược trương không vỡ mà trở nên căng cứng (turgid) — đây là trạng thái **tốt** cho cây. Tế bào động vật không có vách → trong nhược trương dễ **vỡ**.

### 4.2. Bốn ví dụ số (lấy hồng cầu làm chuẩn — nội bào ≈ 0.9% NaCl)

**Ví dụ 1 — NaCl 0.9% (đẳng trương)**: ngoài = trong = 0.9% → nước vào = nước ra → hồng cầu **bình thường**. Đây là lý do dịch truyền tĩnh mạch dùng **NaCl 0.9% (nước muối sinh lý)**.

**Ví dụ 2 — Nước cất 0% (nhược trương cực mạnh)**: ngoài 0% << trong 0.9% → nước ồ ạt **vào** → hồng cầu trương rồi **vỡ (hemolysis)**. Vì vậy **không bao giờ** truyền nước cất thẳng vào tĩnh mạch.

**Ví dụ 3 — NaCl 3% (ưu trương)**: ngoài 3% > trong 0.9% → nước **ra** → hồng cầu **teo, nhăn (crenation)**.

**Ví dụ 4 — So 0.45% với 0.9%**: 0.45% < 0.9% → vẫn **nhược trương** (nhưng nhẹ hơn ví dụ 2) → nước vào, hồng cầu hơi trương. Độ chênh càng nhỏ, dòng nước càng yếu.

### 4.3. Lượng hóa dòng nước theo độ chênh

Tốc độ/độ mạnh của dòng nước ròng tỉ lệ với **độ chênh nồng độ** |ngoài − trong|. Lấy nội bào 0.9% làm mốc:

| Ngoài | Độ chênh so 0.9% | Loại | Hướng nước |
|-------|------------------|------|-----------|
| 0% (nước cất) | 0.9 | nhược trương mạnh | vào (mạnh) → vỡ |
| 0.45% | 0.45 | nhược trương nhẹ | vào (nhẹ) |
| 0.9% | 0 | đẳng trương | cân bằng |
| 1.8% | 0.9 | ưu trương | ra |
| 3% | 2.1 | ưu trương mạnh | ra (mạnh) → teo |

### ❓ Câu hỏi tự nhiên của người đọc

**Q: Vì sao rau héo ngâm nước lã lại tươi lại được?**
A: Nước lã **nhược trương** so với dịch trong tế bào rau → nước thẩm thấu **vào** tế bào → tế bào trương nước (turgid), vách tế bào căng lên → rau cứng giòn trở lại. Đây chính là ứng dụng tính trương trong đời sống.

**Q: Vì sao ướp muối/đường giữ được thực phẩm lâu?**
A: Muối/đường tạo môi trường **ưu trương** quanh vi khuẩn → nước trong tế bào vi khuẩn **ra ngoài** → vi khuẩn mất nước, teo lại, không sinh sản được. Cùng cơ chế plasmolysis nhưng dùng để diệt khuẩn.

### ⚠ Lỗi thường gặp

- **Dịch "trương" theo tế bào**: "nhược trương / ưu trương" mô tả **môi trường ngoài** so với tế bào. Nhược trương = **môi trường ngoài** loãng. Đừng nói "tế bào nhược trương".
- **Quên tế bào thực vật có vách**: trong nhược trương, động vật **vỡ** nhưng thực vật chỉ **căng (turgid)** vì vách giữ lại — kết cục khác nhau.
- **Nghĩ "nước đi về nơi loãng"**: ngược — nước đi về nơi **đặc chất tan** (ưu trương). Trong môi trường ưu trương, nước **rời** tế bào.

### 🔁 Dừng lại tự kiểm tra

1. Đặt hồng cầu vào dung dịch NaCl 5%. Mô tả số phận của nó và giải thích.
2. Tế bào thực vật trong nước cất: trương đến vỡ như hồng cầu không? Vì sao?

<details>
<summary>Đáp án</summary>

1. NaCl 5% > nội bào 0.9% → môi trường **ưu trương (hypertonic)** → nước đi **ra** khỏi hồng cầu → hồng cầu mất nước, **teo và nhăn (crenation)**. Độ chênh 5 − 0.9 = 4.1 rất lớn nên co mạnh.
2. **Không vỡ**. Tế bào thực vật có **vách tế bào (cell wall)** cứng cáp. Trong nước cất (nhược trương) nước vào làm tế bào trương, nhưng vách chịu áp lực và đẩy lại → tế bào đạt trạng thái **căng nước (turgid)** ổn định, không vỡ. Áp lực này (turgor pressure) giúp cây đứng thẳng.
</details>

### 📝 Tóm tắt mục 4

- So nồng độ ngoài với trong: nhược trương (ngoài loãng → nước vào), đẳng trương (cân bằng), ưu trương (ngoài đặc → nước ra).
- Động vật trong nhược trương **vỡ (lysis)**; thực vật chỉ **căng (turgid)** nhờ vách.
- Hồng cầu chuẩn 0.9%: nước cất → vỡ; NaCl 0.9% → bình thường; NaCl 3% → teo.

---

## 5. Vận chuyển chủ động & bơm Na⁺/K⁺

### 💡 Trực giác / Hình dung

Khuếch tán giống quả bóng **tự lăn xuống dốc** (xuôi gradient, miễn phí). Nhưng tế bào nhiều khi cần **đẩy bóng lên dốc** — gom chất từ nơi ít sang nơi đã nhiều (ngược gradient). Đẩy lên dốc cần **động cơ tốn năng lượng** — đó là **vận chuyển chủ động (active transport)**, chạy bằng **ATP**. Ngôi sao của cơ chế này là **bơm Na⁺/K⁺**, hoạt động không ngừng trong mọi tế bào.

### 5.1. Vận chuyển chủ động khác thụ động ở đâu

| Tiêu chí | Thụ động | Chủ động |
|----------|----------|----------|
| Chiều gradient | xuôi (cao → thấp) | **ngược** (thấp → cao) |
| Năng lượng | không | **tốn ATP** |
| Cần protein? | có (trừ khuếch tán đơn giản) | luôn cần **bơm (pump)** |
| Ví dụ | O₂, glucose vào, nước | bơm Na⁺/K⁺, bơm proton |

### 5.2. Bơm Na⁺/K⁺ — số liệu lượng hóa cốt lõi

Bơm Na⁺/K⁺ là một protein xuyên màng. Mỗi chu kỳ tiêu thụ **1 ATP** và:

- Bơm **3 Na⁺ RA ngoài** tế bào,
- Bơm **2 K⁺ VÀO trong** tế bào.

Tỉ lệ cố định **3 Na⁺ : 2 K⁺ : 1 ATP**. Cả hai đều **ngược gradient** (Na⁺ vốn nhiều ở ngoài mà còn bơm thêm ra; K⁺ vốn nhiều ở trong mà còn bơm thêm vào).

Vì mỗi chu kỳ đẩy ra 3 điện tích dương nhưng chỉ đưa vào 2 → mỗi chu kỳ làm **trong tế bào âm hơn ngoài 1 điện tích** → góp phần tạo **điện thế màng (membrane potential)** — nền tảng của xung thần kinh (học sâu ở Tầng sinh lý).

### 5.3. Bốn ví dụ số (dùng tỉ lệ 3:2:1)

**Ví dụ 1 — 1 ATP**: 3 Na⁺ ra, 2 K⁺ vào.

**Ví dụ 2 — 10 ATP**: 10 × 3 = **30 Na⁺ ra**; 10 × 2 = **20 K⁺ vào**. (Đúng số liệu trong đề dẫn.)

**Ví dụ 3 — 150 ATP**: 150 × 3 = **450 Na⁺ ra**; 150 × 2 = **300 K⁺ vào**. Chênh điện tích = 450 − 300 = **150** điện tích dương ròng ra ngoài.

**Ví dụ 4 — ngược lại**: bơm đã đẩy ra 1,200 Na⁺. Vậy đã dùng 1,200 ÷ 3 = **400 ATP**, và đưa vào 400 × 2 = **800 K⁺**.

### ❓ Câu hỏi tự nhiên của người đọc

**Q: Vì sao tế bào tốn năng lượng giữ Na⁺ ngoài, K⁺ trong — chống lại gradient tự nhiên?**
A: Vì gradient ion này là "pin sạc sẵn" để làm việc khác: (1) truyền xung thần kinh (mở kênh cho Na⁺ tràn vào tạo tín hiệu); (2) **đồng vận chuyển (cotransport)** — dùng dòng Na⁺ chảy vào (xuôi gradient) để kéo glucose vào ngược gradient. Như bơm nước lên bồn cao để sau dùng áp lực nước cho nhiều việc.

**Q: Bơm Na⁺/K⁺ chiếm bao nhiêu năng lượng cơ thể?**
A: Rất nhiều — ước tính bơm này tiêu tốn **~20–25% ATP** lúc nghỉ (riêng tế bào thần kinh có thể tới ~70%). Đó là cái giá để duy trì gradient ion cho mọi hoạt động điện sinh học.

### ⚠ Lỗi thường gặp

- **Nhầm tỉ lệ 2:3 thay vì 3:2**: nhớ **3 ra (Na⁺) : 2 vào (K⁺)**. Na nhiều hơn và đi ra.
- **Nghĩ bơm dùng nhiều ATP mỗi ion**: 1 ATP cho **cả** 3 Na⁺ + 2 K⁺ trong một chu kỳ, không phải mỗi ion 1 ATP.
- **Nghĩ vận chuyển chủ động đi xuôi gradient**: không — định nghĩa của nó là đi **ngược** gradient (vì thế mới cần ATP).

### 🔁 Dừng lại tự kiểm tra

1. Sau 25 chu kỳ bơm Na⁺/K⁺, có bao nhiêu Na⁺ ra, K⁺ vào, và bao nhiêu ATP đã dùng?
2. Một tế bào đã đưa vào 60 K⁺ nhờ bơm này. Đã đẩy ra bao nhiêu Na⁺?

<details>
<summary>Đáp án</summary>

1. 25 chu kỳ × tỉ lệ 3:2:1 → **75 Na⁺ ra** (25×3), **50 K⁺ vào** (25×2), dùng **25 ATP** (1/chu kỳ).
2. 60 K⁺ vào → số chu kỳ = 60 ÷ 2 = 30 chu kỳ → Na⁺ ra = 30 × 3 = **90 Na⁺**. (Kiểm tra tỉ lệ 90:60 = 3:2 ✓.)
</details>

### 📝 Tóm tắt mục 5

- Vận chuyển chủ động: **ngược gradient**, **tốn ATP**, luôn cần bơm protein.
- Bơm Na⁺/K⁺: 1 ATP → **3 Na⁺ ra + 2 K⁺ vào**; mỗi chu kỳ đẩy ròng 1 điện tích + ra ngoài.
- Gradient ion là "pin" cho xung thần kinh và cotransport; bơm tiêu ~20–25% ATP cơ thể.

---

## 6. Vận chuyển khối lượng lớn — nhập bào & xuất bào

### 💡 Trực giác / Hình dung

Phân tử nhỏ đi qua "cửa" (protein) như người qua cửa quay. Nhưng vật **quá to** (giọt dịch lớn, vi khuẩn, mảnh tế bào) thì cửa không lọt — màng phải **"nuốt" trọn** bằng cách bọc lại thành túi: đó là **nhập bào (endocytosis)**. Ngược lại, khi cần thải vật lớn ra (hormone, chất nhầy), túi trong tế bào áp vào màng và "nhổ" ra ngoài: **xuất bào (exocytosis)**.

### 6.1. Ba kiểu nhập bào & xuất bào

| Quá trình | Mô tả | Ví dụ |
|-----------|-------|-------|
| **Thực bào (phagocytosis)** — "ăn" | Màng bọc vật rắn lớn thành túi (phagosome) | Bạch cầu nuốt vi khuẩn |
| **Ẩm bào (pinocytosis)** — "uống" | Màng nuốt giọt dịch ngoại bào | Tế bào hấp thụ dịch |
| **Nhập bào qua thụ thể (receptor-mediated)** | Thụ thể bắt phân tử đặc hiệu rồi nuốt | Tế bào lấy cholesterol (LDL) |
| **Xuất bào (exocytosis)** | Túi trong tế bào hòa vào màng, thải nội dung ra | Tế bào tuyến tiết hormone, neuron tiết chất dẫn truyền |

Tất cả đều **tốn ATP** (cần biến dạng màng) → là một dạng vận chuyển chủ động về mặt năng lượng.

### ❓ Câu hỏi tự nhiên của người đọc

**Q: Nhập bào khác vận chuyển chủ động qua bơm thế nào?**
A: Bơm vận chuyển **từng phân tử/ion** qua protein xuyên màng. Nhập/xuất bào vận chuyển **khối lượng lớn** (nhiều phân tử cùng lúc, hoặc vật quá to) bằng cách biến dạng và bọc/nhổ màng. Cả hai tốn ATP, nhưng cơ chế khác hẳn.

### ⚠ Lỗi thường gặp

- **Nghĩ nhập/xuất bào không tốn năng lượng**: SAI — biến dạng màng tạo túi cần ATP.
- **Nhầm "phagocytosis = uống"**: phago = **ăn** (vật rắn); pino = **uống** (dịch lỏng). Nhớ "phago = food".

### 🔁 Dừng lại tự kiểm tra

1. Bạch cầu nuốt một vi khuẩn — đây là quá trình gì? Có tốn ATP không?
2. Neuron giải phóng chất dẫn truyền thần kinh vào synapse — nhập bào hay xuất bào?

<details>
<summary>Đáp án</summary>

1. **Thực bào (phagocytosis)** — màng bạch cầu bọc vi khuẩn thành túi và nuốt vào. **Có tốn ATP** vì cần biến dạng màng.
2. **Xuất bào (exocytosis)** — túi chứa chất dẫn truyền hòa vào màng và thải nội dung ra ngoài synapse. Tốn ATP.
</details>

### 📝 Tóm tắt mục 6

- Vật quá lớn không qua protein → màng bọc (nhập bào) hoặc nhổ (xuất bào).
- Nhập bào: thực bào (ăn rắn), ẩm bào (uống dịch), qua thụ thể (đặc hiệu). Xuất bào: thải ra.
- Tất cả **tốn ATP** vì cần biến dạng màng.

---

## 7. Bảng tổng hợp các kiểu vận chuyển

| Kiểu | Chiều gradient | Tốn ATP? | Cần protein? | Ví dụ |
|------|----------------|:--------:|:------------:|-------|
| Khuếch tán đơn giản | xuôi | Không | Không | O₂, CO₂ |
| Khuếch tán có hỗ trợ | xuôi | Không | Có (kênh/mang) | glucose (GLUT), ion qua kênh |
| Thẩm thấu | xuôi (theo nước) | Không | Không / aquaporin | H₂O |
| Vận chuyển chủ động | **ngược** | **Có** | Có (bơm) | bơm Na⁺/K⁺ |
| Nhập/xuất bào | — (khối lớn) | **Có** | — (biến dạng màng) | bạch cầu nuốt khuẩn, tiết hormone |

---

## 8. Bài tập + Lời giải chi tiết

### Bài tập

**Bài 1**: Phân loại mỗi chất sau theo kiểu vận chuyển qua màng và cho biết có tốn ATP không: (a) O₂ vào tế bào, (b) glucose vào ruột qua GLUT, (c) Na⁺ bị bơm ra ngoài, (d) nước vào hồng cầu, (e) bạch cầu nuốt vi khuẩn.

**Bài 2**: Hồng cầu (nội bào ≈ 0.9% NaCl) được đặt lần lượt vào: (a) NaCl 0.2%, (b) NaCl 0.9%, (c) NaCl 4%. Với mỗi môi trường, nêu loại tính trương, hướng nước, và số phận hồng cầu.

**Bài 3**: Bơm Na⁺/K⁺ chạy 45 chu kỳ. Tính: (a) số Na⁺ bơm ra, (b) số K⁺ bơm vào, (c) số ATP đã dùng, (d) số điện tích dương ròng đã chuyển ra ngoài.

**Bài 4**: Một tế bào đã vận chuyển ra ngoài tổng cộng 210 Na⁺ nhờ bơm Na⁺/K⁺. Tính số chu kỳ, số K⁺ đã đưa vào, và số ATP đã tiêu thụ.

**Bài 5**: Túi màng bán thấm chứa dung dịch sucrose 12%, thả vào cốc sucrose 4%. (a) Túi nhược/đẳng/ưu trương so với cốc? (b) Nước đi vào hay ra khỏi túi? (c) Túi phồng hay xẹp? (d) Khi nào dòng nước ròng dừng?

**Bài 6**: Giải thích vì sao truyền **nước cất** thẳng vào tĩnh mạch lại nguy hiểm, trong khi truyền **NaCl 0.9%** thì an toàn. Dùng khái niệm tính trương và thẩm thấu.

### Lời giải

**Bài 1**:
- (a) O₂ vào: **khuếch tán đơn giản** (nhỏ, không phân cực, xuôi gradient) — **không tốn ATP**.
- (b) glucose qua GLUT: **khuếch tán có hỗ trợ** (xuôi gradient, qua protein mang) — **không tốn ATP**.
- (c) Na⁺ bị bơm ra: **vận chuyển chủ động** (ngược gradient, qua bơm) — **tốn ATP**.
- (d) nước vào hồng cầu: **thẩm thấu (osmosis)** — **không tốn ATP**.
- (e) bạch cầu nuốt vi khuẩn: **thực bào (phagocytosis)** — **tốn ATP**.

**Bài 2**: So với nội bào 0.9%:
- (a) NaCl 0.2% < 0.9% → **nhược trương (hypotonic)** → nước đi **vào** → hồng cầu trương rồi **vỡ (hemolysis)** (chênh 0.7 khá lớn).
- (b) NaCl 0.9% = 0.9% → **đẳng trương (isotonic)** → nước vào = ra, dòng ròng = 0 → hồng cầu **bình thường**.
- (c) NaCl 4% > 0.9% → **ưu trương (hypertonic)** → nước đi **ra** → hồng cầu **teo, nhăn (crenation)** (chênh 3.1 rất lớn → co mạnh).

**Bài 3**: Tỉ lệ 3 Na⁺ : 2 K⁺ : 1 ATP, chạy 45 chu kỳ:
- (a) Na⁺ ra = 45 × 3 = **135**.
- (b) K⁺ vào = 45 × 2 = **90**.
- (c) ATP = 45 × 1 = **45**.
- (d) Điện tích dương ròng ra ngoài = (Na⁺ ra) − (K⁺ vào) = 135 − 90 = **45** (mỗi chu kỳ +1 ra ngoài × 45 chu kỳ). Đây là cơ sở góp phần tạo điện thế màng.

**Bài 4**:
- Số chu kỳ = số Na⁺ ra ÷ 3 = 210 ÷ 3 = **70 chu kỳ**.
- K⁺ vào = 70 × 2 = **140**.
- ATP = 70 × 1 = **70**.
- Kiểm tra tỉ lệ: 210 : 140 = 3 : 2 ✓.

**Bài 5**:
- (a) Túi 12% > cốc 4% → trong túi **đặc hơn** → túi **ưu trương** so với cốc.
- (b) Nước đi từ nơi loãng (cốc 4%) → nơi đặc (túi 12%) → nước đi **vào túi**.
- (c) Túi **phồng** lên.
- (d) Dòng nước ròng dừng khi **nồng độ hai bên cân bằng** (nước vào làm túi loãng dần và cốc đặc dần; tới khi áp suất thẩm thấu hai phía bằng nhau — trên thực tế túi co giãn được nên cân bằng đạt khi nồng độ trong/ngoài xấp xỉ nhau). Đây là cân bằng động, nước vẫn qua lại nhưng dòng ròng = 0.

**Bài 6**:
- **Nước cất (0% chất tan)** so với nội bào hồng cầu (≈ 0.9%) là **nhược trương cực mạnh**. Truyền thẳng vào tĩnh mạch → nước ồ ạt thẩm thấu **vào** hồng cầu (loãng → đặc) → hồng cầu trương quá mức và **vỡ (hemolysis)** hàng loạt → mất tế bào máu, nguy hiểm tính mạng.
- **NaCl 0.9%** bằng nồng độ chất tan nội bào → **đẳng trương** → nước vào = nước ra, dòng ròng = 0 → hồng cầu giữ nguyên hình dạng, không vỡ không teo. Vì vậy nó là **nước muối sinh lý** an toàn để truyền.
- Bản chất: an toàn hay không phụ thuộc môi trường truyền có **đẳng trương** với máu hay không, quyết định hướng và độ mạnh của dòng thẩm thấu.

---

## Liên kết và bài tiếp theo

- **Bài tiếp theo trong Biology**: [Lesson 04 — Enzyme & chuyển hóa](../lesson-04-enzymes-metabolism/) — protein xúc tác và dòng năng lượng (ATP mà bơm vừa tiêu thụ đến từ đâu).
- **Bài trước**: [Lesson 02 — Cấu trúc tế bào](../lesson-02-cell-structure/) — màng bao bọc tế bào và bào quan.
- **Nền tảng phân tử**: [Lesson 01 — Phân tử sinh học](../lesson-01-biomolecules/) §5 — phospholipid lưỡng cực tự lắp thành lớp kép.
- **Liên kết Chemistry**: [\`Chemistry/01-Structure/lesson-07-solutions-concentration\`](../../../Chemistry/01-Structure/lesson-07-solutions-concentration/) — nồng độ dung dịch, cơ sở định lượng cho thẩm thấu và tính trương.
- **Đọc thêm**: mô hình tương tác — [\`visualization.html\`](./visualization.html) của lesson này.

---

## 📝 Tổng kết Lesson 03

1. **Mô hình khảm động**: màng = lớp kép phospholipid (đầu ưa nước ngoài, đuôi kỵ nước trong) + protein + cholesterol + carbohydrate; "khảm" vì protein rải rác, "động" vì phân tử trôi ngang.
2. **Thấm chọn lọc**: nhỏ + không phân cực (O₂, CO₂) qua tự do; lớn/phân cực/tích điện (glucose, ion) cần protein.
3. **Vận chuyển thụ động** (không ATP, xuôi gradient): khuếch tán đơn giản, có hỗ trợ, và **thẩm thấu** (nước từ loãng → đặc chất tan).
4. **Tính trương**: nhược trương → nước vào (động vật vỡ, thực vật turgid); đẳng trương → cân bằng; ưu trương → nước ra (teo/plasmolysis). Hồng cầu chuẩn 0.9%.
5. **Vận chuyển chủ động** (tốn ATP, ngược gradient): bơm Na⁺/K⁺ **3 Na⁺ ra : 2 K⁺ vào / 1 ATP**.
6. **Khối lượng lớn**: nhập bào (thực bào/ẩm bào/qua thụ thể) và xuất bào — đều tốn ATP.

**Tiếp theo**: [Lesson 04 — Enzyme & chuyển hóa](../lesson-04-enzymes-metabolism/)
`;
