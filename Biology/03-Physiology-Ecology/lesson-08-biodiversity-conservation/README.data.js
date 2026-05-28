// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: Biology/03-Physiology-Ecology/lesson-08-biodiversity-conservation/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 08 — Đa dạng sinh học & bảo tồn

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Hiểu **đa dạng sinh học (biodiversity)** ở **3 mức**: gen, loài, và hệ sinh thái — và vì sao mất ở bất kỳ mức nào cũng kéo theo hậu quả lên các mức khác.
- Tính được hai chỉ số đo đa dạng loài thông dụng: **chỉ số Shannon (Shannon diversity index)** \`H = −Σ pᵢ·ln(pᵢ)\` và **chỉ số Simpson (Simpson index)** \`D = 1 − Σ pᵢ²\`, kèm thước đo **độ đều (evenness)**.
- Liệt kê 5 nguyên nhân suy giảm chính theo khẩu quyết **HIPPO** (Habitat loss · Invasive · Pollution · Population · Overharvesting) và xếp hạng tác động.
- So sánh **bảo tồn tại chỗ (in-situ)** vs **bảo tồn chuyển chỗ (ex-situ)** — biết lúc nào dùng cái nào.
- Định lượng được **tốc độ tuyệt chủng** hiện tại so với nền tự nhiên (background extinction rate) và lý giải tại sao thời đại này được gọi là "đợt tuyệt chủng hàng loạt thứ 6".
- Đọc dữ liệu thực (vd ước tính ~8.7 triệu loài, đã mô tả ~1.9 triệu) và rút ra kết luận có ý nghĩa thực tiễn.

## Kiến thức tiền đề

- **Hệ sinh thái và dòng năng lượng** — [\`Lesson 07\`](../lesson-07-ecosystems-energy-flow/). Bạn cần khái niệm bậc dinh dưỡng (trophic level) và quy tắc 10% để hiểu vì sao mất 1 loài bậc đỉnh ảnh hưởng cả lưới thức ăn.
- **Quần thể & sức chứa** — [\`Lesson 06\`](../lesson-06-ecology-populations/). Sức chứa môi trường (carrying capacity), tăng trưởng logistic, và **kích thước quần thể nhỏ (small population)** là nền tảng cho mục "tính khả thi quần thể" (population viability).
- **Loài và phát sinh chủng loại** — [\`../../02-Genetics-Evolution/lesson-08-speciation-phylogeny\`](../../02-Genetics-Evolution/lesson-08-speciation-phylogeny/). Khái niệm "loài" và sự đa dạng dòng họ (lineage) là cơ sở để định nghĩa "đa dạng sinh học".
- **Quần thể nhỏ → mất biến dị di truyền** — \`Tầng 2 Lesson 06\` về dạt gen (genetic drift) và cận huyết (inbreeding). Sẽ nhắc lại nhanh ở §2.

---

## 1. Đa dạng sinh học là gì? Ba mức cần phân biệt

### 💡 Trực giác / Hình dung

Hãy hình dung một thư viện. **Đa dạng gen** là số bản in khác nhau của *cùng một quyển sách* (in lần 1, lần 2, bản đặc biệt — chữ giống nhau nhưng có khác biệt nhỏ). **Đa dạng loài** là số *đầu sách khác nhau* trên kệ. **Đa dạng hệ sinh thái** là số *thư viện chuyên đề khác nhau* trong cùng một thành phố (thư viện văn học, kỹ thuật, thiếu nhi…). Mất một loại nào cũng là tổn thất, nhưng theo cách rất khác nhau.

### 1.1. Ba mức đa dạng

| Mức | Đo cái gì | Ví dụ thực |
|-----|-----------|------------|
| **Đa dạng gen (genetic diversity)** | Biến dị di truyền *trong cùng một loài* | Trong loài lúa *Oryza sativa* có hàng nghìn giống địa phương (rice landrace) khác nhau ở gen kháng sâu, gen chịu mặn. |
| **Đa dạng loài (species diversity)** | Số loài + sự đều giữa các loài trong một khu | Một mảnh rừng Cúc Phương 1 ha có thể ghi nhận > 100 loài cây gỗ; 1 ha rừng trồng keo chỉ có 1. |
| **Đa dạng hệ sinh thái (ecosystem diversity)** | Số kiểu hệ sinh thái trên một vùng | Việt Nam có rừng mưa nhiệt đới, rừng ngập mặn, rạn san hô, đầm phá, cát ven biển, núi đá vôi karst — đa dạng hệ sinh thái rất cao. |

### 1.2. Vì sao 3 mức gắn chặt với nhau?

- Mất đa dạng **hệ sinh thái** (phá rừng ngập mặn) → mất môi trường sống → mất **loài** sống đặc hữu ở đó (cua càng đỏ, các loài chim ven biển).
- Mất đa dạng **loài** (loài thụ phấn biến mất) → mất chức năng (cây không kết quả) → ảnh hưởng cả hệ sinh thái.
- Mất đa dạng **gen** (chỉ trồng 1 giống lúa duy nhất) → cả vùng sụp đổ khi sâu bệnh xuất hiện (như nạn đói khoai tây Ireland 1845 — toàn bộ là 1 giống dễ tổn thương).

### ❓ Câu hỏi tự nhiên của người đọc

**Q: Có phải càng nhiều loài là càng "đa dạng"?**
A: Không hẳn. Số loài (species richness) chỉ là một mặt; mặt thứ hai là **độ đều (evenness)** — các loài có chia đều cá thể không. Một khu có 4 loài, mỗi loài 25 cá thể "đa dạng" hơn một khu có 4 loài nhưng 97 cá thể loài A, mỗi loài còn lại chỉ 1. §3 sẽ định lượng điều này.

**Q: Đa dạng gen quan trọng đến mức nào? Nhỡ chỉ còn 1 cặp con cuối cùng — vẫn cứu được loài đúng không?**
A: Về lý thuyết có thể, nhưng quần thể rất nhỏ rơi vào **bẫy tuyệt chủng** (extinction vortex): cận huyết → con cái yếu → quần thể nhỏ hơn → càng cận huyết. Số học sẽ thấy ở §5.

### 📝 Tóm tắt mục 1

- Đa dạng sinh học có 3 mức: **gen** (trong loài), **loài** (giữa loài), **hệ sinh thái** (giữa các kiểu hệ).
- Ba mức gắn nhau: mất 1 mức kéo theo mức khác.
- Số loài chưa đủ; phải kèm độ đều giữa các loài.

---

## 2. Bức tranh toàn cầu — vài con số căn bản

### 💡 Trực giác / Hình dung

Tưởng tượng bạn đang lập danh sách "tất cả sinh vật trên Trái Đất". Mỗi năm bạn thêm được ~15,000 loài mới vào sổ. Nhưng tổng số loài thật trên hành tinh được ước tính khoảng **8.7 triệu**, mà mới ghi vào sổ được khoảng **1.9 triệu**. Nghĩa là bạn đã làm... **22% công việc**.

### 2.1. Số liệu cốt lõi

| Đại lượng | Giá trị ước tính |
|-----------|------------------|
| Tổng số loài trên Trái Đất | ~8.7 triệu (Mora et al. 2011) |
| Số loài đã được mô tả khoa học | ~1.9 triệu |
| Tỉ lệ đã mô tả | ~21.8% |
| Số khu vực biodiversity hotspot (Conservation International) | 36 |
| Tỉ lệ diện tích đất các hotspot chiếm | ~2.5% |
| Tỉ lệ thực vật đặc hữu (endemic) các hotspot chứa | ~50% |

### 2.2. Bốn ví dụ số cụ thể

**Ví dụ 1 — Tỉ lệ đã mô tả**: 1.9 / 8.7 = **0.218 ≈ 21.8%**. Nghĩa là gần 80% loài trên Trái Đất *chưa được khoa học biết tên*.

**Ví dụ 2 — Khoảng còn lại**: 8.7 − 1.9 = **6.8 triệu** loài chưa mô tả. Với tốc độ ~15,000 loài/năm hiện nay, cần \`6,800,000 / 15,000 ≈ 453 năm\` để mô tả hết — nhưng nhiều loài có thể đã tuyệt chủng trước khi được mô tả.

**Ví dụ 3 — Hotspot tập trung**: 36 hotspot chiếm ~2.5% diện tích đất nhưng chứa ~50% loài thực vật đặc hữu. Nghĩa là 1% diện tích chứa ~20% loài đặc hữu — **tỉ trọng cao gấp ~20 lần** trung bình. Đây là lý do bảo tồn ưu tiên hotspot.

**Ví dụ 4 — Việt Nam**: Việt Nam có ~13,000 loài thực vật, ~10,500 loài động vật đã ghi nhận; nằm trong hotspot **Indo-Burma** — một trong 36 hotspot toàn cầu.

### ⚠ Lỗi thường gặp

- **Nhầm "loài đã mô tả" với "loài còn sống"**: hai con số khác nhau hoàn toàn. Loài đã mô tả có thể đã tuyệt chủng (vd chim dodo).
- **Nghĩ "bảo tồn = giữ tất cả mọi nơi"**: nguồn lực hạn chế. Hotspot là chiến lược tập trung tài nguyên vào nơi có giá trị đa dạng cao nhất.

### 📝 Tóm tắt mục 2

- Trái Đất có ~8.7 triệu loài, mới mô tả ~1.9 triệu (~22%).
- 36 hotspot chiếm ~2.5% đất, chứa ~50% thực vật đặc hữu → ưu tiên bảo tồn.
- Việt Nam thuộc hotspot Indo-Burma.

---

## 3. Định lượng đa dạng loài — Shannon & Simpson

### 💡 Trực giác / Hình dung

Bạn nhặt ngẫu nhiên một cá thể trong khu — bạn có "bất ngờ" về loài của nó không? Nếu khu có 1 loài duy nhất, bạn biết chắc loài gì → 0 bất ngờ → đa dạng = 0. Nếu khu có 4 loài chia đều, mỗi lần nhặt là 1 ván "lật bài" → bất ngờ lớn → đa dạng cao. Chỉ số Shannon đo *trung bình lượng bất ngờ* đó (đơn vị: nats).

### 3.1. Định nghĩa hình thức

Gọi \`pᵢ\` = tỉ lệ cá thể của loài \`i\` trong tổng. Hai chỉ số chính:

- **Shannon H** = \`− Σᵢ pᵢ · ln(pᵢ)\`
  - Đơn vị: nats (vì dùng \`ln\`). Đôi khi dùng \`log₂\` → đơn vị bits.
  - H = 0 khi chỉ có 1 loài. H đạt cực đại \`ln(S)\` khi \`S\` loài chia đều (\`pᵢ = 1/S\` cho mọi i).
- **Simpson D** = \`1 − Σᵢ pᵢ²\`
  - Diễn giải: xác suất 2 cá thể nhặt ngẫu nhiên thuộc 2 loài khác nhau.
  - D = 0 khi chỉ 1 loài; D → 1 khi rất nhiều loài chia đều.
- **Độ đều (evenness)** = \`H / ln(S)\` ∈ [0, 1]. Bằng 1 khi tất cả loài chia hoàn toàn đều.

### 3.2. Walk-through bằng số cụ thể

**Khu A — 3 loài, tỉ lệ 0.5 / 0.3 / 0.2**:

\`H = −[0.5·ln(0.5) + 0.3·ln(0.3) + 0.2·ln(0.2)]\`

Tính từng số hạng:
- \`ln(0.5) ≈ −0.693\` → \`0.5 × (−0.693) = −0.347\`
- \`ln(0.3) ≈ −1.204\` → \`0.3 × (−1.204) = −0.361\`
- \`ln(0.2) ≈ −1.609\` → \`0.2 × (−1.609) = −0.322\`

Tổng: \`−0.347 + (−0.361) + (−0.322) = −1.030\`. Vậy \`H = −(−1.030) = **1.030 nats**\`.

\`D = 1 − (0.5² + 0.3² + 0.2²) = 1 − (0.25 + 0.09 + 0.04) = 1 − 0.38 = **0.62**\`.

Độ đều = \`1.030 / ln(3) = 1.030 / 1.099 = **0.937**\` — khá đều.

**Khu B — 3 loài, tỉ lệ 0.96 / 0.02 / 0.02** (cùng số loài nhưng lệch):

- \`0.96·ln(0.96) ≈ 0.96 × (−0.0408) = −0.0392\`
- \`0.02·ln(0.02) ≈ 0.02 × (−3.912) = −0.0782\` (×2 vì có 2 loài cùng tỉ lệ) → −0.1565

Tổng: \`−0.0392 − 0.1565 = −0.1957\`. \`H = **0.196 nats**\`.

\`D = 1 − (0.96² + 0.02² + 0.02²) = 1 − (0.9216 + 0.0004 + 0.0004) = **0.0776**\`.

Độ đều = \`0.196 / 1.099 = **0.178**\` — rất lệch.

**So sánh**: cùng 3 loài, A đa dạng gấp \`1.030 / 0.196 ≈ 5.3 lần\` B theo Shannon. Đây là minh chứng "số loài giống nhau không có nghĩa đa dạng giống nhau" (§1).

**Khu C — 4 loài chia hoàn toàn đều, pᵢ = 0.25**:

\`H = −4 × 0.25 × ln(0.25) = −1 × (−1.386) = **1.386 nats** = ln(4) ✓\` (cực đại).

\`D = 1 − 4 × 0.0625 = 1 − 0.25 = **0.75**\`.

**Khu D — chỉ 1 loài (pᵢ = 1)**:

\`H = −1 × ln(1) = 0\`. \`D = 1 − 1² = 0\`. Đa dạng bằng 0 — đơn loài.

### 3.3. Khi nào dùng Shannon, khi nào dùng Simpson?

- **Shannon** nhạy với loài hiếm — phù hợp khi quan tâm sự xuất hiện của các loài thiểu số (nghiên cứu hotspot, đánh giá rừng nguyên sinh).
- **Simpson** nhạy với loài ưu thế — phù hợp khi muốn đánh giá "có loài nào áp đảo không" (rừng trồng, đồng cỏ chăn thả).

### ⚠ Lỗi thường gặp

- **Quên dấu trừ trong Shannon**: vì \`pᵢ < 1\` nên \`ln(pᵢ) < 0\`. Quên dấu trừ → H âm (vô lý).
- **Trộn đơn vị**: nếu dùng \`log₂\` thay \`ln\`, H tính ra khác (đơn vị bits). Khi so sánh hai nghiên cứu phải kiểm tra cùng đơn vị.
- **Coi Shannon là "số loài"**: H không phải số loài, mà là "chỉ số". Muốn quy ra "số loài hiệu dụng" thì lấy \`exp(H)\` (Hill number bậc 1).

### 🔁 Dừng lại tự kiểm tra

1. Tính H và D cho khu có 2 loài tỉ lệ 0.5/0.5. Độ đều bằng bao nhiêu?
2. Khu E có 5 loài chia đều. Tính \`H\` cực đại và \`D\` cực đại của khu này.

<details>
<summary>Đáp án</summary>

1. \`H = −2 × 0.5 × ln(0.5) = −1 × (−0.693) = **0.693 nats**\`. \`D = 1 − 2 × 0.25 = **0.5**\`. Độ đều = \`0.693 / ln(2) = 0.693 / 0.693 = **1.0\`** (hoàn toàn đều — không thể đều hơn).
2. \`H = ln(5) = **1.609 nats**\`. \`D = 1 − 5 × (1/5)² = 1 − 1/5 = **0.8**\`. Đây là giá trị tối đa cho 5 loài.

</details>

### 📝 Tóm tắt mục 3

- **Shannon H = −Σ pᵢ ln pᵢ** đo "lượng bất ngờ trung bình"; cực đại = ln(S).
- **Simpson D = 1 − Σ pᵢ²** = xác suất 2 cá thể ngẫu nhiên là 2 loài khác nhau.
- **Độ đều = H / ln(S)** ∈ [0, 1]. Cùng số loài có thể chênh nhau hơn 5 lần khi độ đều khác nhau.

---

## 4. Giá trị của đa dạng sinh học — vì sao phải bảo tồn?

### 💡 Trực giác / Hình dung

Đa dạng sinh học không chỉ là "thiên nhiên đẹp". Nó là **nhà máy miễn phí** đang chạy ngầm: thụ phấn, lọc nước, hấp thụ CO₂, cung cấp thuốc, cân bằng khí hậu. Tắt nhà máy này, con người phải xây nhà máy nhân tạo thay thế — vô cùng tốn kém, có khi không khả thi.

### 4.1. Bốn nhóm giá trị

| Nhóm giá trị | Mô tả | Ví dụ định lượng |
|--------------|-------|-------------------|
| **Sử dụng trực tiếp (direct use)** | Lương thực, gỗ, thuốc | Taxol (paclitaxel) — thuốc trị ung thư vú/buồng trứng — chiết từ vỏ thông đỏ Thái Bình Dương (*Taxus brevifolia*); doanh thu peak vài tỉ USD/năm. |
| **Dịch vụ hệ sinh thái (ecosystem services)** | Thụ phấn, lọc nước, hấp thụ CO₂, kiểm soát sâu hại | Ong (apidae) thụ phấn cho ~75% loài cây nông nghiệp toàn cầu; giá trị dịch vụ thụ phấn ước tính ~235–577 tỷ USD/năm (IPBES 2016). |
| **Văn hóa, tinh thần** | Du lịch sinh thái, di sản, biểu tượng | Vườn quốc gia Cúc Phương đón hàng trăm nghìn lượt khách/năm; thu nhập + việc làm cho cộng đồng địa phương. |
| **Giá trị nội tại (intrinsic)** | Quyền được tồn tại không phụ thuộc lợi ích cho người | Không định lượng được bằng tiền nhưng là cơ sở đạo đức của bảo tồn. |

### 4.2. Ví dụ định lượng cụ thể

**Ví dụ 1 — Rừng nhiệt đới như "kho thuốc"**: ước tính khoảng **25%** thuốc tây hiện đại có nguồn gốc từ thực vật rừng nhiệt đới, nhưng mới chỉ ~1% loài thực vật được sàng lọc dược lý. Mỗi loài mất đi = một loại thuốc tiềm năng mất đi.

**Ví dụ 2 — Rừng ngập mặn (mangrove) chống bão**: 1 km dải rừng ngập mặn dày có thể giảm sóng triều ~ 50–66%. Sau bão Haiyan (2013), các làng có rừng ngập mặn ven biển bị thiệt hại ít hơn rõ rệt so với làng không có.

**Ví dụ 3 — Đất ngập nước (wetland) lọc nước**: 1 ha đất ngập nước có thể xử lý lượng nitrogen tương đương trạm xử lý nước thải nhỏ ~ vài chục nghìn USD/năm chi phí xây lắp.

**Ví dụ 4 — San hô và du lịch**: ngành du lịch dựa trên rạn san hô toàn cầu (Great Barrier Reef, Caribbean, Coral Triangle…) đóng góp >36 tỉ USD/năm. Mất san hô = mất nguồn sinh kế của hàng triệu người.

### ❓ Câu hỏi tự nhiên của người đọc

**Q: Tại sao thay vì bảo tồn mọi loài, mình không chỉ giữ những loài "có ích"?**
A: Vì 3 lý do. (1) Mạng tương tác sinh thái rất phức tạp — loài tưởng vô dụng có thể giữ vai trò khóa (keystone species), mất nó kéo theo sụp đổ chuỗi (Lesson 07). (2) Tiềm năng dược/khoa học chưa khám phá — không thể biết loài nào sẽ "có ích" trong tương lai (taxol chỉ được phát hiện thập niên 1960). (3) Giá trị nội tại — bảo tồn không chỉ vì lợi ích trực tiếp cho người.

**Q: Có cách quy đa dạng sinh học thành tiền để chính sách dễ ra quyết định không?**
A: Có — đó là **kinh tế học sinh thái (ecological economics)**. Ví dụ: định giá "dịch vụ hệ sinh thái" toàn cầu ~ 125 nghìn tỉ USD/năm (Costanza et al. 2014). Tuy nhiên định giá luôn không đầy đủ — nhiều giá trị không quy đổi được.

### 📝 Tóm tắt mục 4

- 4 nhóm giá trị: sử dụng trực tiếp, dịch vụ hệ sinh thái, văn hóa, nội tại.
- Dịch vụ thụ phấn của ong: 235–577 tỉ USD/năm toàn cầu.
- ~25% thuốc tây từ thực vật nhiệt đới; mất loài = mất thuốc tiềm năng.

---

## 5. Nguyên nhân suy giảm — khẩu quyết HIPPO

### 💡 Trực giác / Hình dung

Nhà sinh học E.O. Wilson tóm gọn 5 nguyên nhân chính bằng từ **HIPPO**, theo thứ tự giảm dần tác động:

| Chữ | Tên | Nghĩa | Ví dụ |
|-----|-----|-------|-------|
| **H** | Habitat loss | Mất môi trường sống (phá rừng, đô thị hóa, nông nghiệp mở rộng) | Rừng Amazon mất ~17% diện tích trong 50 năm. |
| **I** | Invasive species | Loài ngoại lai xâm hại | Ốc bươu vàng vào Việt Nam thập niên 1980 → phá lúa, đẩy ốc bản địa suy giảm. |
| **P** | Pollution | Ô nhiễm (hóa chất, nhựa, ánh sáng, tiếng ồn) | DDT làm vỏ trứng chim săn mồi mỏng → bald eagle suýt tuyệt chủng. |
| **P** | Population (of humans) | Dân số người tăng → áp lực mọi mặt | Dân số người 1.6 tỉ (1900) → 8 tỉ (2022). |
| **O** | Overharvesting | Khai thác quá mức | Cá ngừ vây xanh Đại Tây Dương giảm > 80% kể từ 1970. |

Trong 5 cái, **H** (mất môi trường sống) là nguyên nhân lớn nhất — gây ra ~85% các trường hợp tuyệt chủng/đe dọa.

### 5.1. Tốc độ tuyệt chủng — đợt tuyệt chủng hàng loạt thứ 6

**Tốc độ nền (background rate)**: ước tính ~0.1 đến 1 loài / 1 triệu loài / năm trong lịch sử địa chất bình thường.

**Tốc độ hiện tại**: ước tính ~100 đến 1,000 lần cao hơn nền — tức ~10 đến 1,000 loài / 1 triệu loài / năm. Một số nghiên cứu (Ceballos et al. 2015) cho rằng có thể tới 1,000–10,000 lần khi xét nhóm động vật có xương sống.

**Ví dụ 1**: Trên 8 triệu loài, tốc độ nền 1/1tr/năm cho ra ~8 loài tuyệt chủng/năm. Nếu tốc độ hiện tại nhanh gấp 100 lần → ~800 loài/năm. Gấp 1,000 lần → ~8,000 loài/năm.

**Ví dụ 2**: Trong 5 đợt tuyệt chủng hàng loạt lịch sử (cuối Ordovician, Devonian muộn, Permi-Trias, Trias-Jura, Phấn trắng-Cổ sinh), mỗi đợt làm mất 50–95% loài. Đợt 6 hiện nay đang diễn ra nhanh hơn 5 đợt trước nhưng do *một loài duy nhất* (con người) gây ra.

**Ví dụ 3**: Báo cáo *Living Planet Index* (WWF, 2022): quần thể động vật có xương sống được theo dõi giảm trung bình **69%** trong giai đoạn 1970–2018. Lưu ý: đây là chỉ số quần thể (số cá thể), không phải số loài.

**Ví dụ 4**: Loài có nguy cơ trong sách đỏ IUCN (2022): trong ~150,000 loài được đánh giá, ~28% bị xếp vào diện bị đe dọa (vulnerable, endangered, critically endangered). Suy ra \`0.28 × 8.7 triệu ≈ 2.4 triệu loài\` có thể đang bị đe dọa nếu tỉ lệ này áp cho toàn bộ.

### 5.2. Bẫy tuyệt chủng (extinction vortex) — vì sao quần thể nhỏ chết nhanh

Khi quần thể tụt xuống ngưỡng nhỏ (ví dụ < 50 cá thể trưởng thành), 3 vòng xoáy đẩy nó xuống tiếp:

1. **Cận huyết (inbreeding)** → cá thể yếu, ít con — giảm số lượng tiếp.
2. **Dạt gen (genetic drift)** → mất biến dị di truyền ngẫu nhiên — giảm khả năng thích nghi.
3. **Biến động ngẫu nhiên** (1 đợt dịch, 1 mùa hạn) có thể quét sạch quần thể nhỏ trong khi không ảnh hưởng quần thể lớn.

Quy tắc kinh điển bảo tồn: **50/500** — cần ≥50 cá thể sinh sản để tránh cận huyết ngắn hạn, ≥500 để duy trì biến dị dài hạn.

### ⚠ Lỗi thường gặp

- **Đổ hết lỗi cho săn bắt**: săn bắt (Overharvesting) chỉ là 1 trong 5. Mất môi trường sống lớn hơn nhiều.
- **Tách "biến đổi khí hậu" thành nguyên nhân thứ 6 riêng**: thường gộp khí hậu vào "Pollution" (CO₂ là ô nhiễm khí) hoặc xếp thành "thừa số nhân" làm trầm trọng HIPPO.
- **Nghĩ "tuyệt chủng là chuyện tự nhiên"**: đúng — tuyệt chủng nền có thật. Vấn đề là **tốc độ** hiện tại nhanh gấp 100–1000 lần nền, không phải bản chất hiện tượng.

### 🔁 Dừng lại tự kiểm tra

1. Nếu tốc độ tuyệt chủng nền là 1 loài / 1 triệu loài / năm và Trái Đất có 8.7 triệu loài, tính số loài tuyệt chủng nền dự kiến trong 1 năm và trong 100 năm.
2. Nếu tốc độ hiện tại nhanh gấp 500 lần nền, số loài mất trong 100 năm là bao nhiêu?

<details>
<summary>Đáp án</summary>

1. Tốc độ nền: \`1/1,000,000 × 8,700,000 = 8.7 loài/năm\`. Trong 100 năm: \`8.7 × 100 = **870 loài**\`.
2. Nhanh gấp 500: \`8.7 × 500 = 4,350 loài/năm\`. Trong 100 năm: \`4,350 × 100 = **435,000 loài**\` — hơn nửa triệu loài mất trong 1 thế kỷ.

</details>

### 📝 Tóm tắt mục 5

- **HIPPO**: Habitat loss (lớn nhất), Invasive, Pollution, Population, Overharvesting.
- Tốc độ tuyệt chủng hiện tại nhanh gấp 100–1,000 lần nền → "đợt tuyệt chủng hàng loạt thứ 6".
- Quần thể nhỏ rơi vào bẫy tuyệt chủng (cận huyết + dạt gen + biến động). Quy tắc 50/500.

---

## 6. Biện pháp bảo tồn — in-situ vs ex-situ

### 💡 Trực giác / Hình dung

Có 2 chiến lược lớn. **In-situ** (tại chỗ) = bảo vệ loài *ngay trong môi trường sống tự nhiên của nó* — vườn quốc gia, khu bảo tồn. Giống "bảo tồn quyển sách trong thư viện gốc". **Ex-situ** (chuyển chỗ) = đưa ra ngoài tự nhiên — vườn thú, ngân hàng gen, ngân hàng hạt giống. Giống "scan quyển sách rồi lưu vào kho số".

### 6.1. So sánh hai cách tiếp cận

| Tiêu chí | In-situ | Ex-situ |
|----------|---------|---------|
| Ví dụ | Vườn quốc gia (Cúc Phương, Cát Tiên, U Minh Thượng), khu Ramsar, khu bảo tồn biển | Vườn thú, vườn thực vật, ngân hàng gen, ngân hàng hạt giống Svalbard |
| Bảo vệ cả hệ sinh thái? | Có | Không |
| Loài giữ được hành vi/tiến hóa tự nhiên? | Có | Hạn chế (nuôi nhốt thay đổi hành vi) |
| Chi phí dài hạn / cá thể | Thấp hơn | Cao hơn |
| Phù hợp khi nào | Còn môi trường sống đủ tốt | Môi trường gốc đã mất / số cá thể quá ít / cần "ngân hàng dự phòng" |

### 6.2. Bốn ví dụ thực

**Ví dụ 1 — VQG Cúc Phương (Việt Nam)**: thành lập 1962, ~22,000 ha. In-situ bảo vệ voọc, gấu, các loài cây gỗ quý. Cũng có Trung tâm Cứu hộ Linh trưởng — pha trộn in-situ + ex-situ.

**Ví dụ 2 — Svalbard Global Seed Vault (Na Uy)**: kho hạt giống chôn sâu trong núi đá lạnh trên đảo Bắc Cực; lưu > 1.2 triệu mẫu hạt giống cây trồng từ khắp thế giới. Là "bản sao lưu" ex-situ phòng khi ngân hàng gen quốc gia bị phá hủy bởi chiến tranh/thiên tai (đã từng được Syria rút mẫu năm 2015 sau khi ngân hàng Aleppo bị phá).

**Ví dụ 3 — California condor (kền kền California)**: 1987, chỉ còn **27** cá thể trên Trái Đất. Toàn bộ được bắt về nuôi nhốt (ex-situ), nhân giống. Đến 2023: > 500 cá thể, hơn nửa đã thả về tự nhiên. Minh chứng ex-situ cứu được loài cận tuyệt chủng — nhưng phải đi kèm khôi phục môi trường.

**Ví dụ 4 — Tê giác Java (Việt Nam)**: 2010, cá thể cuối cùng ở VQG Cát Tiên bị săn trộm. **Loài tê giác Java tuyệt chủng tại Việt Nam.** Cho thấy in-situ thất bại nếu thực thi yếu — chỉ "có khu bảo tồn trên giấy" không đủ.

### 6.3. Luật pháp và hợp tác quốc tế

- **CITES** (Convention on International Trade in Endangered Species, 1973): kiểm soát buôn bán loài bị đe dọa. Việt Nam là thành viên.
- **CBD** (Convention on Biological Diversity, 1992): khung pháp lý toàn cầu cho bảo tồn.
- **Mục tiêu 30×30**: tới năm 2030, bảo vệ ≥ 30% diện tích đất và biển toàn cầu (thông qua tại COP15 Montreal, 2022).

### ❓ Câu hỏi tự nhiên của người đọc

**Q: Nuôi nhốt giúp sinh sản — sao gọi là bảo tồn? Liệu thả về tự nhiên có sống được không?**
A: Đây là vấn đề thật. Cá thể sinh ra trong nuôi nhốt thường mất các tập tính kiếm ăn, sợ kẻ thù tự nhiên. Chương trình ex-situ nghiêm túc phải có giai đoạn "**huấn luyện tái thả (soft release)**" — tập kiếm ăn trong khu kín dần dần mở rộng. Kền kền California, hổ Amur đều dùng giao thức này.

**Q: Bảo tồn loài lai (hybrid) có được tính không?**
A: Phụ thuộc trường hợp. Cá thể lai có thể "pha loãng" gen của loài thuần — vd hổ vằn × hổ Bengal trong nuôi nhốt. Nguyên tắc chung: ưu tiên giữ loài thuần (purebred). Tuy nhiên nếu loài đã quá hiếm (mèo rừng Florida có dấu hiệu cận huyết nặng), người ta lai có chủ đích để cứu (genetic rescue).

### 📝 Tóm tắt mục 6

- **In-situ** (vườn quốc gia, khu bảo tồn) bảo vệ cả hệ sinh thái, chi phí thấp dài hạn — nhưng cần thực thi nghiêm.
- **Ex-situ** (vườn thú, ngân hàng gen, Svalbard) là cứu cánh khi môi trường mất / quần thể quá nhỏ.
- Khung pháp lý: CITES, CBD, mục tiêu 30×30.

---

## 7. Bài tập + Lời giải chi tiết

### Bài tập

**Bài 1**: Một khu rừng có 4 loài chim với số cá thể: loài X = 40, Y = 30, Z = 20, W = 10. Tính:
(a) Tỉ lệ pᵢ mỗi loài.
(b) Chỉ số Shannon H.
(c) Chỉ số Simpson D.
(d) Độ đều H / ln(S).

**Bài 2**: So sánh hai khu A và B đều có 5 loài. Khu A: tỉ lệ 0.2/0.2/0.2/0.2/0.2. Khu B: 0.8/0.05/0.05/0.05/0.05. Tính Shannon H cho cả hai và xác định khu nào đa dạng hơn. Vì sao "cùng số loài" mà chỉ số khác nhau?

**Bài 3**: Trái Đất ước tính 8.7 triệu loài. Tốc độ tuyệt chủng nền = 1 loài / 1 triệu loài / năm. Hiện tại tốc độ tăng gấp 200 lần nền. Tính:
(a) Số loài tuyệt chủng dự kiến / năm hiện nay.
(b) Tổng số loài mất trong 50 năm tới (giả định tốc độ giữ nguyên).
(c) Tỉ lệ % so với tổng số loài.

**Bài 4**: Một quần thể tê giác trong khu bảo tồn có 18 cá thể trưởng thành. Theo quy tắc 50/500, quần thể này có vấn đề gì? Đề xuất 2 biện pháp.

**Bài 5**: Cho danh sách 6 đối tượng cần bảo tồn: (i) rạn san hô Coral Triangle, (ii) hổ Đông Dương (~ 150 cá thể), (iii) giống lúa nếp địa phương đang dần biến mất, (iv) vùng đất ngập nước U Minh, (v) cá thể cuối cùng của loài *X* trên Trái Đất, (vi) hạt giống của 1,000 giống cà chua. Với mỗi đối tượng, chọn: in-situ, ex-situ, hoặc cả hai. Giải thích.

### Lời giải

**Bài 1**:

(a) Tổng cá thể = 40 + 30 + 20 + 10 = 100.
- pX = 0.40, pY = 0.30, pZ = 0.20, pW = 0.10.

(b) Shannon:
- \`0.40·ln(0.40) = 0.40 × (−0.916) = −0.367\`
- \`0.30·ln(0.30) = 0.30 × (−1.204) = −0.361\`
- \`0.20·ln(0.20) = 0.20 × (−1.609) = −0.322\`
- \`0.10·ln(0.10) = 0.10 × (−2.303) = −0.230\`
- Tổng = −0.367 − 0.361 − 0.322 − 0.230 = −1.280.
- **H = 1.280 nats**.

(c) Simpson:
- 0.40² + 0.30² + 0.20² + 0.10² = 0.16 + 0.09 + 0.04 + 0.01 = 0.30.
- **D = 1 − 0.30 = 0.70**.

(d) Độ đều = \`H / ln(S) = 1.280 / ln(4) = 1.280 / 1.386 = **0.923**\` — khá đều nhưng chưa tối đa.

**Bài 2**:

- **Khu A** (chia đều): \`H = ln(5) ≈ **1.609 nats**\` (giá trị cực đại cho 5 loài).
- **Khu B**:
  - \`0.8·ln(0.8) = 0.8 × (−0.223) = −0.179\`
  - \`0.05·ln(0.05) = 0.05 × (−2.996) = −0.150\` (×4 vì có 4 loài cùng tỉ lệ) → −0.599
  - Tổng = −0.179 − 0.599 = −0.778.
  - \`H ≈ **0.778 nats**\`.
- Khu A đa dạng hơn (\`1.609 > 0.778\`), gấp ~2.07 lần khu B mặc dù **cùng có 5 loài**. Lý do: A có độ đều = 1.0 (cực đại), B có độ đều = \`0.778/1.609 = 0.484\` (lệch về 1 loài chiếm 80%).
- Bài học: số loài (richness) chỉ là một phần; độ đều (evenness) là phần còn lại — chỉ số Shannon kết hợp cả hai.

**Bài 3**:

(a) Tốc độ nền: \`(1 / 1,000,000) × 8,700,000 = 8.7 loài/năm\`. Hiện tại gấp 200 → \`8.7 × 200 = **1,740 loài/năm**\`.

(b) Trong 50 năm: \`1,740 × 50 = **87,000 loài**\`.

(c) Tỉ lệ: \`87,000 / 8,700,000 = 0.01 = **1.0%**\` tổng số loài Trái Đất trong nửa thế kỷ.

**Bài 4**:

- Vấn đề: 18 cá thể < 50 → ngưỡng dưới của quy tắc 50/500 → **nguy cơ cận huyết cấp tính cao**. Cũng < 500 → không đảm bảo biến dị dài hạn → mất khả năng thích nghi với thay đổi môi trường.
- Hệ quả thực: rơi vào extinction vortex (mục 5.2) — cá thể yếu, dị tật, tỉ lệ sống của con non thấp.
- Hai biện pháp đề xuất:
  1. **Tăng kích thước quần thể có chủ đích**: nhập cá thể từ quần thể khác (nếu cùng loài/phụ loài) để "tiếp máu di truyền" (genetic rescue), giảm hệ số cận huyết. Đồng thời bảo vệ nghiêm trong khu in-situ + theo dõi DNA.
  2. **Lập chương trình ex-situ song song**: nuôi nhốt sinh sản với phối giống theo phả hệ (studbook) để giữ biến dị; thả lại tự nhiên theo soft release. Đồng thời cải tạo môi trường gốc để mở rộng sức chứa.

**Bài 5**:

- (i) **Rạn san hô Coral Triangle** → **In-situ**. Không thể "mang san hô về nuôi" toàn bộ hệ; phải bảo vệ vùng biển nguyên trạng.
- (ii) **Hổ Đông Dương 150 cá thể** → **Cả hai**. In-situ giữ môi trường (rừng), ex-situ ngân hàng tinh trùng/phả hệ + sinh sản nuôi nhốt phụ trợ vì 150 đã gần ngưỡng nguy hiểm 500.
- (iii) **Giống lúa nếp địa phương** → **Ex-situ** (ngân hàng hạt giống) là chính, có thể kèm in-situ trên đồng (on-farm conservation). Hạt giống nông nghiệp lưu trữ dễ hơn nhiều so với động vật.
- (iv) **Vùng đất ngập nước U Minh** → **In-situ**. Là hệ sinh thái, không thể "chuyển chỗ".
- (v) **Cá thể cuối cùng của loài X** → **Ex-situ** ngay (lưu mẫu sinh học, đông lạnh tinh trùng/trứng nếu có thể) — vì 1 cá thể không thể tự duy trì quần thể trong tự nhiên. Đây là cứu cánh cuối, không phải bảo tồn thật.
- (vi) **1,000 giống cà chua** → **Ex-situ** (ngân hàng hạt giống). Khối lượng và đa dạng giống lớn → ex-situ tối ưu hơn.

---

## 8. Liên kết và bài tiếp theo

Đây là **bài cuối cùng của khóa Biology** — 24 bài đã hoàn tất. Đây là lúc dừng lại, nhìn toàn cảnh, và chọn hướng đi tiếp.

### Tổng kết 24 bài Biology

- **Tầng 1 — Phân tử & Tế bào** (8 bài): từ phân tử sinh học → cấu trúc tế bào → màng → enzyme → hô hấp → quang hợp → chu kỳ tế bào → ung thư.
- **Tầng 2 — Di truyền & Tiến hóa** (8 bài): Mendel → DNA replication → phiên mã/dịch mã → đột biến → biểu hiện gen → di truyền học quần thể → chọn lọc tự nhiên → phát sinh chủng loại.
- **Tầng 3 — Sinh lý & Sinh thái** (8 bài, kết thúc tại Lesson 08): thần kinh → tuần hoàn/hô hấp → miễn dịch → nội tiết/cân bằng nội môi → sinh lý thực vật → sinh thái quần thể → hệ sinh thái & dòng năng lượng → **đa dạng sinh học & bảo tồn**.

### Quay về trang chính Biology

- [\`Biology/index.html\`](../../index.html) — duyệt mọi tầng/lesson dưới dạng card.
- [\`Biology/README.md\`](../../README.md) — README chính.

### Mở rộng sang các lĩnh vực liên quan

- **\`Chemistry/02-Reactions-Thermo/lesson-08-biochem-preview\`** — preview hóa sinh. Nếu bạn muốn đào sâu cơ chế phân tử (enzyme, năng lượng tự do, ATP) đã chạm tới ở Biology Tầng 1, đây là cầu nối tự nhiên.
- **\`Math/Vectors/05-Probability/\`** (nếu có) hoặc **\`Math/Calculus/\`** — chỉ số Shannon ở mục 3 là **entropy thông tin** (information entropy); xác suất là ngôn ngữ chung của sinh thái quần thể, di truyền, và bảo tồn (mô hình mô phỏng population viability).
- **\`Math/Statistics\`** — đo đạc đa dạng sinh học, đánh giá tác động, ước lượng tốc độ tuyệt chủng đều cần thống kê (hồi quy, lấy mẫu, khoảng tin cậy).
- **\`Physics/Thermodynamics\`** — dòng năng lượng qua hệ sinh thái (Lesson 07) là một ứng dụng của các định luật nhiệt động học.
- **\`Geography\`** / **\`Earth Science\`** (nếu có) — biodiversity hotspot, khí hậu, địa lý loài là giao thoa giữa sinh học và khoa học Trái Đất.

### Đề xuất hướng đào sâu nếu thích Biology

- **Sinh học phân tử / công nghệ sinh học**: gene editing (CRISPR), tin sinh học (bioinformatics).
- **Sinh thái định lượng**: mô hình hóa quần thể, mạng lưới thức ăn, phục hồi sinh thái.
- **Y học và sinh học tiến hóa**: dịch tễ học, đề kháng kháng sinh.
- **Bảo tồn ứng dụng**: di truyền học bảo tồn (conservation genetics), quản lý vườn quốc gia.

---

## 📝 Tổng kết Lesson 08

1. **Đa dạng sinh học 3 mức**: gen (trong loài), loài (giữa loài), hệ sinh thái — mất ở bất kỳ mức nào kéo theo các mức còn lại.
2. **Đo đa dạng loài**:
   - **Shannon H = −Σ pᵢ ln pᵢ** (cực đại = ln(S)).
   - **Simpson D = 1 − Σ pᵢ²** = xác suất 2 cá thể là 2 loài khác nhau.
   - **Độ đều = H / ln(S) ∈ [0,1]**. Cùng số loài có thể khác đa dạng > 5 lần khi độ đều khác.
3. **Bức tranh toàn cầu**: ~8.7 triệu loài (mới mô tả ~22%); 36 hotspot chiếm ~2.5% đất nhưng giữ ~50% thực vật đặc hữu.
4. **4 nhóm giá trị**: sử dụng trực tiếp · dịch vụ hệ sinh thái · văn hóa · nội tại. Dịch vụ thụ phấn toàn cầu ~ 235–577 tỉ USD/năm.
5. **Nguyên nhân — HIPPO**: Habitat loss (lớn nhất) · Invasive · Pollution · Population · Overharvesting. Tốc độ tuyệt chủng hiện tại cao gấp 100–1,000 lần nền → đợt tuyệt chủng hàng loạt thứ 6.
6. **Bẫy tuyệt chủng**: quần thể nhỏ rơi vào cận huyết + dạt gen + biến động ngẫu nhiên. Quy tắc **50/500**.
7. **Bảo tồn**:
   - **In-situ** (vườn quốc gia, khu bảo tồn) — bảo vệ cả hệ sinh thái, chi phí thấp dài hạn.
   - **Ex-situ** (vườn thú, ngân hàng gen, Svalbard Seed Vault) — cứu cánh khi môi trường mất / quần thể quá nhỏ.
   - Pháp lý: CITES, CBD, mục tiêu 30×30 (đến 2030 bảo vệ ≥ 30% đất + biển).

### Ghi chú hoàn tất khóa Biology

Lesson 08 này khép lại 24 bài Biology trên cả 3 tầng. Bài học cuối có chủ ý không phải về cơ chế phân tử hay vẽ sơ đồ, mà về **trách nhiệm** — sau khi học xong cách sự sống vận hành từ phân tử tới hệ sinh thái, câu hỏi tự nhiên kế tiếp là: *ta giữ nó như thế nào?* Tài liệu mở ra, nhưng việc bảo tồn là một bài toán mở chưa có lời giải duy nhất — và đó là điểm hẹn để mỗi người tự tiếp tục từ chỗ này.

← [README tầng](../README.md) · [🏠 Trang chính Biology](../../index.html)
`;
