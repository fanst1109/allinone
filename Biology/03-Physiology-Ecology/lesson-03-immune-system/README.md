# Lesson 03 — Hệ miễn dịch

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Phân biệt rõ **2 nhánh** của hệ miễn dịch: **miễn dịch bẩm sinh (innate immunity)** và **miễn dịch thích ứng (adaptive immunity)** — biết nhánh nào *nhanh*, nhánh nào *đặc hiệu*, nhánh nào *có trí nhớ*.
- Gọi tên và mô tả vai trò của các thành phần chủ chốt: hàng rào da/niêm mạc, thực bào (phagocyte), tế bào NK (natural killer), viêm (inflammation), hệ bổ thể (complement), interferon, **tế bào B (B cell)**, **tế bào T (T cell)**, kháng nguyên (antigen), kháng thể (antibody).
- Hiểu **cấu trúc hình Y của kháng thể** và nguyên lý "khóa–chìa" giữa epitope và vùng kết hợp kháng nguyên.
- Vẽ và đọc được **đường cong đáp ứng sơ cấp (primary) vs thứ cấp (secondary)** — giải thích vì sao đáp ứng lần 2 nhanh và mạnh gấp 10–100 lần.
- Áp dụng nguyên lý trí nhớ miễn dịch để giải thích **vaccine** hoạt động thế nào, vì sao thường cần 2 mũi, và vì sao một số vaccine cho miễn dịch suốt đời còn loại khác cần tiêm nhắc.
- Nhận biết khi nào hệ miễn dịch "trục trặc": **bệnh tự miễn (autoimmune)**, **dị ứng (allergy / IgE quá mức)**, **AIDS** (HIV phá tế bào T helper).

## Kiến thức tiền đề

- **Protein và kháng thể là protein** — trình tự amino acid quyết định hình dạng, hình dạng quyết định chức năng. Xem [Lesson 01 — Phân tử sinh học](../../01-Molecules-Cells/lesson-01-biomolecules/) §4.
- **Máu và bạch cầu (leukocyte)** — bạch cầu là "đội quân" của hệ miễn dịch, lưu thông qua hệ tuần hoàn. Xem [Lesson 02 — Tuần hoàn & hô hấp](../lesson-02-circulation-respiration/).
- Khái niệm tế bào, màng tế bào, thụ thể (receptor) trên màng — đã gặp ở Tầng 1.

---

## 1. Hệ miễn dịch là gì và vì sao có 2 nhánh?

### 💡 Trực giác / Hình dung

Hệ miễn dịch giống một **đất nước có 2 lớp phòng thủ**. Lớp 1 là **cảnh sát đường phố + dân phòng**: phản ứng cực nhanh, đập bất cứ kẻ lạ nào — không cần biết tên, không nhớ mặt. Lớp 2 là **đội đặc nhiệm có hồ sơ kẻ thù**: chậm hơn (cần thời gian truy hồ sơ), nhưng đánh trúng đích, và lần sau gặp lại thì xử lý nhanh gấp bội nhờ đã có hồ sơ.

Lớp 1 = miễn dịch bẩm sinh (innate). Lớp 2 = miễn dịch thích ứng (adaptive).

### 1.1. So sánh tổng quan

| Tiêu chí | Bẩm sinh (innate) | Thích ứng (adaptive) |
|----------|------------------|-----------------------|
| Có sẵn từ khi sinh ra? | Có | Phát triển dần khi gặp kháng nguyên |
| Tốc độ phản ứng | Phút–giờ | 5–10 ngày (lần đầu) |
| Đặc hiệu? | Không (phản ứng chung) | Có (1 kháng thể nhận 1 epitope) |
| Có trí nhớ? | Không | **Có** — đây là điểm mấu chốt |
| Tác nhân chính | da, niêm mạc, thực bào, NK, bổ thể, viêm | tế bào B, tế bào T, kháng thể |
| Ví dụ tiến hóa | Có ở mọi động vật | Chỉ có ở động vật có xương sống |

### 1.2. Vì sao cần cả 2?

Chỉ có bẩm sinh: nhanh nhưng yếu — vi khuẩn/virus tiến hóa nhanh sẽ né được những phòng thủ chung chung; cơ thể không "rút kinh nghiệm" sau mỗi lần nhiễm.

Chỉ có thích ứng: đặc hiệu nhưng chậm — 5–10 ngày để xây dựng phản ứng cho mầm bệnh mới thì có thể đã quá muộn.

→ Bẩm sinh **giữ chân kẻ địch** trong vài ngày đầu để thích ứng **kịp triển khai**. Hai nhánh không độc lập: tế bào của miễn dịch bẩm sinh (đại thực bào — macrophage, tế bào tua — dendritic cell) còn làm "người báo tin" — bắt kháng nguyên rồi trình diện cho tế bào T để khởi động nhánh thích ứng.

### ❓ Câu hỏi tự nhiên của người đọc

**Q: Em bé sơ sinh chưa từng gặp mầm bệnh, có miễn dịch thích ứng chưa?**
A: Có nhưng còn "trống rỗng" — chưa có tế bào nhớ cho mầm bệnh nào. Bù lại, em bé nhận **kháng thể thụ động (passive immunity)**: IgG từ mẹ qua nhau thai trong thai kỳ, và IgA qua sữa mẹ. Loại miễn dịch thụ động này hết tác dụng sau vài tháng — đó là lý do tiêm vaccine bắt đầu từ tháng thứ 2.

**Q: Vì sao thực vật không cần hệ miễn dịch thích ứng?**
A: Thực vật có cơ chế phòng thủ riêng (thành tế bào dày, phytochemical, hypersensitive response — tự chết tế bào nhiễm để cô lập), nhưng không có hệ "tế bào lympho có trí nhớ" như động vật. Tiến hóa của miễn dịch thích ứng đi cùng tiến hóa của động vật có xương sống.

### 📝 Tóm tắt mục 1

- Hệ miễn dịch có 2 nhánh: bẩm sinh (nhanh, không đặc hiệu, không nhớ) và thích ứng (chậm hơn, đặc hiệu, có nhớ).
- Bẩm sinh giữ chân địch để thích ứng triển khai; tế bào bẩm sinh cũng "báo tin" cho thích ứng.
- Trí nhớ miễn dịch là nền tảng của vaccine (sẽ làm rõ ở §4 và §5).

---

## 2. Miễn dịch bẩm sinh (innate immunity)

### 💡 Trực giác / Hình dung

Tưởng tượng cơ thể như **một pháo đài**: trước hết phải có **tường thành** ngăn địch vào (da, niêm mạc). Nếu địch lọt qua tường, **đội tuần tra** trong sân (thực bào, NK) tóm gọn. Đồng thời **chuông báo động** vang lên (viêm, sốt) kéo viện binh tới. Tất cả đều **phản ứng chung** — không phân biệt kẻ địch là ai, miễn là "không phải người nhà".

### 2.1. Hàng rào ngoài — chặn ngay từ cửa

| Hàng rào | Cơ chế |
|----------|--------|
| **Da** (skin) | Lớp tế bào chết sừng hóa, khô, không xuyên thủng được; pH hơi acid |
| **Niêm mạc** (mucous membrane) | Đường hô hấp, tiêu hóa, sinh dục — phủ chất nhầy dính bắt vi sinh |
| **Nước mắt, nước bọt** | Chứa **lysozyme** — enzyme phá vỡ thành tế bào vi khuẩn (cắt liên kết peptidoglycan) |
| **Acid dạ dày** | pH ~1.5–3.5 giết phần lớn vi khuẩn nuốt vào |
| **Vi sinh có ích (microbiota)** | Vi khuẩn "tốt" sống trên da/ruột chiếm chỗ, cạnh tranh với vi khuẩn xấu |
| **Lông mao đường hô hấp** | Đẩy chất nhầy bẩn lên họng để nuốt hoặc ho ra |

### 2.2. Hàng rào trong — khi địch đã lọt vào

**Thực bào (phagocyte)** — "ăn thịt" mầm bệnh:
- **Đại thực bào (macrophage)**: cư trú trong mô, sống lâu, ăn liên tục.
- **Bạch cầu trung tính (neutrophil)**: nhiều nhất trong máu, đến nhanh chỗ viêm, sống ngắn (~vài ngày), "lính cảm tử".

Quy trình: phát hiện kháng nguyên lạ qua receptor → ôm trọn (phagocytosis) → nuốt vào trong → enzyme + ROS (reactive oxygen species) phân hủy.

**Tế bào NK (Natural Killer)**: chuyên giết tế bào **của chính cơ thể** đã bị nhiễm virus hoặc thành ung thư. Cơ chế: phát hiện tế bào "lạ hóa" (mất MHC class I bình thường) → tiết perforin (đục lỗ màng) + granzyme (kích hoạt apoptosis).

**Hệ bổ thể (complement system)**: tập hợp ~30 protein huyết tương. Khi gặp vi khuẩn, chúng kích hoạt dây chuyền (cascade) → kết quả có 3 chức năng: (1) đục lỗ màng vi khuẩn (membrane attack complex), (2) "đánh dấu" vi khuẩn (opsonization) để thực bào dễ nhận ra, (3) gọi thực bào tới (chemotaxis).

**Interferon (IFN)**: tế bào nhiễm virus tiết IFN → IFN cảnh báo các tế bào lân cận "có virus đang lây" → các tế bào hàng xóm bật chế độ phòng thủ (giảm tổng hợp protein, phá RNA virus) → virus khó nhân lên.

### 2.3. Viêm (inflammation) — "chuông báo động"

Khi mô bị tổn thương hay nhiễm khuẩn, **tế bào mast (mast cell)** tiết **histamine** → mạch máu giãn rộng và thấm dịch → 4 dấu hiệu kinh điển:

| Triệu chứng | Cơ chế |
|-------------|--------|
| **Đỏ (rubor)** | Mạch giãn → nhiều máu tới |
| **Nóng (calor)** | Máu mang nhiệt từ cơ thể tới |
| **Sưng (tumor)** | Dịch và bạch cầu thoát vào mô |
| **Đau (dolor)** | Chất trung gian (prostaglandin, bradykinin) kích thích đầu dây thần kinh |

→ Viêm là **phản ứng có lợi** dù khó chịu: kéo bạch cầu và kháng thể tới ổ nhiễm.

### 2.4. Sốt (fever)

Khi đại thực bào gặp vi khuẩn, chúng tiết cytokine (vd IL-1) → tác động lên vùng dưới đồi (hypothalamus) → tăng "điểm nhiệt cài đặt" (thermostat) lên 38–40°C. Vì sao có lợi? (1) Nhiệt cao ức chế vi khuẩn nhân lên; (2) tăng tốc phản ứng enzyme của bạch cầu. Quá cao (> 40°C) thì hại — protein bắt đầu biến tính.

### 2.5. Bốn ví dụ số / cơ chế cụ thể

**Ví dụ 1 — lysozyme cắt thành vi khuẩn**: nước mắt người chứa lysozyme ~0.5–1 mg/mL; 1 phân tử lysozyme có thể cắt hàng nghìn liên kết β-1,4 glycosidic trong peptidoglycan/giây.

**Ví dụ 2 — neutrophil chiếm ~50–70% bạch cầu trong máu** (khoảng 4,500–11,000 bạch cầu/μL máu), nhưng sống chỉ ~5 ngày — đó là lý do tủy xương phải sản xuất liên tục ~10¹¹ neutrophil/ngày.

**Ví dụ 3 — sốt 39°C tăng tốc độ phản ứng**: với Q₁₀ ≈ 2 (gấp đôi cho mỗi 10°C tăng), từ 37°C lên 39°C → tốc độ phản ứng enzyme tăng ~15%. Đủ giúp đáp ứng nhanh hơn mà chưa làm hỏng protein.

**Ví dụ 4 — bổ thể đục lỗ**: phức hợp MAC (membrane attack complex) là 1 vòng gồm ~12–18 phân tử C9 ghép lại, tạo lỗ đường kính ~10 nm trên màng vi khuẩn → nước tràn vào → vi khuẩn vỡ.

### ⚠ Lỗi thường gặp

- **Nghĩ "sốt là bệnh"**: sốt là *cơ chế phòng thủ*, không phải bệnh — chỉ cần hạ sốt khi quá cao (> 39°C ở người lớn, > 38.5°C ở trẻ em) hoặc kéo dài.
- **Nghĩ "viêm = nhiễm trùng"**: viêm chỉ là *phản ứng* của cơ thể — có thể do nhiễm trùng, nhưng cũng có thể do chấn thương, dị ứng, tự miễn (không có vi sinh nào cả).
- **Nhầm "thực bào" với "tế bào T diệt"**: thực bào (macrophage, neutrophil) là *bẩm sinh*, nuốt mầm bệnh nguyên con. Tế bào T diệt (cytotoxic T) là *thích ứng*, chỉ giết tế bào nhiễm đã được trình diện đúng kháng nguyên.

### 🔁 Dừng lại tự kiểm tra

1. Một người bị bỏng nhẹ, vùng da quanh vết bỏng đỏ, nóng, sưng, đau dù không có vi khuẩn xâm nhập. Vì sao?
2. Nếu cơ thể không có bổ thể, hệ miễn dịch còn diệt được vi khuẩn không?

<details>
<summary>Đáp án</summary>

1. Bỏng làm tổn thương mô, các tế bào mast tại chỗ tiết histamine → mạch giãn (đỏ, nóng), thấm dịch (sưng), prostaglandin/bradykinin kích thích thần kinh (đau). Đây là **viêm vô trùng (sterile inflammation)** — phản ứng có thể xảy ra mà không cần kẻ địch sinh học, đủ tổn thương mô là khởi phát.
2. Còn, nhưng yếu hơn rõ rệt. Thực bào và NK vẫn hoạt động, nhưng việc "opsonization" (đánh dấu vi khuẩn) bị mất → thực bào nhận diện kém → một số vi khuẩn có vỏ polysaccharide (vd Neisseria) gần như không bị diệt. Người thiếu bổ thể bẩm sinh dễ nhiễm khuẩn nặng.
</details>

### 📝 Tóm tắt mục 2

- Hàng rào ngoài (da, niêm mạc, lysozyme, acid dạ dày) ngăn địch vào; hàng rào trong (thực bào, NK, bổ thể, interferon) diệt địch đã vào.
- Viêm có 4 dấu hiệu (đỏ, nóng, sưng, đau) do histamine → mạch giãn + thấm dịch.
- Sốt tăng tốc phòng thủ nhưng quá cao thì hại; bẩm sinh không đặc hiệu và không nhớ.

---

## 3. Miễn dịch thích ứng — kháng nguyên & kháng thể

### 💡 Trực giác / Hình dung

Miễn dịch thích ứng giống **hệ thống nhận diện khuôn mặt**. Mỗi tế bào B/T mang sẵn 1 "mẫu khuôn mặt" duy nhất (thụ thể đặc hiệu). Cơ thể có **hàng tỉ tế bào B/T** với hàng tỉ "khuôn mặt" khác nhau — nhờ tái tổ hợp gene khi tế bào hình thành. Khi 1 kháng nguyên xuất hiện, chỉ tế bào nào có khuôn mặt khớp mới được "kích hoạt" và **nhân bản (clonal selection)**.

### 3.1. Khái niệm cốt lõi

- **Kháng nguyên (antigen)**: phân tử lạ kích hoạt phản ứng miễn dịch. Thường là protein hoặc polysaccharide trên bề mặt vi khuẩn/virus.
- **Epitope (kháng nguyên quyết định)**: phần *nhỏ* trên kháng nguyên mà kháng thể thực sự gắn vào. 1 kháng nguyên lớn có thể có nhiều epitope khác nhau → kích hoạt nhiều kháng thể khác nhau.
- **Kháng thể (antibody / immunoglobulin Ig)**: protein hình Y do tế bào B tiết ra, gắn đặc hiệu vào epitope. Khái niệm này phụ thuộc Lesson 01 §4 — kháng thể là protein, hình dạng quyết định chức năng.
- **MHC** (Major Histocompatibility Complex — phức hợp tương hợp mô): protein trên màng tế bào, "khoe" mẩu kháng nguyên cho tế bào T xem. Class I có trên *mọi* tế bào có nhân; class II chỉ có trên tế bào trình diện kháng nguyên (APC — antigen presenting cell).

### 3.2. Hai loại tế bào lympho (lymphocyte)

| Loại | Trưởng thành ở | Vai trò chính |
|------|---------------|---------------|
| **Tế bào B** (B cell) | Tủy xương (Bone marrow) | Tiết kháng thể → miễn dịch dịch thể (humoral) |
| **Tế bào T** (T cell) | Tuyến ức (Thymus) | Miễn dịch tế bào (cellular) |

Tế bào T có 2 phân nhóm chính:
- **T gây độc (cytotoxic T / CD8⁺)**: giết tế bào của cơ thể đã nhiễm virus (nhận diện kháng nguyên trình diện trên MHC I).
- **T hỗ trợ (helper T / CD4⁺)**: "nhạc trưởng" — tiết cytokine kích hoạt tế bào B và T gây độc. HIV tấn công chính tế bào này → suy giảm miễn dịch (AIDS).

### 3.3. Cấu trúc kháng thể hình Y

Kháng thể IgG có **4 chuỗi polypeptide**: 2 chuỗi nặng (heavy, ~50 kDa mỗi chuỗi) + 2 chuỗi nhẹ (light, ~25 kDa mỗi chuỗi) — tổng ~150 kDa. Liên kết với nhau bằng cầu disulfide (–S–S–) tạo hình Y.

- **2 đầu trên của Y = vùng biến đổi (variable region / Fab)**: gắn kháng nguyên. *Mỗi kháng thể IgG gắn được 2 kháng nguyên cùng lúc* (2 đầu Y).
- **Cán Y = vùng hằng định (constant region / Fc)**: quyết định lớp kháng thể (IgG/A/M/E/D) và gắn vào thụ thể trên thực bào.

5 lớp kháng thể (Ig):

| Lớp | Đặc điểm | Nơi nhiều nhất |
|-----|----------|----------------|
| **IgG** | Phổ biến nhất (~75% kháng thể huyết tương); qua nhau thai | Máu, mô |
| **IgM** | Đầu tiên được tiết ra khi nhiễm; cấu trúc 5 hình Y ghép lại (10 đầu gắn kháng nguyên) | Máu |
| **IgA** | Niêm mạc, dịch tiết | Nước bọt, sữa mẹ, dịch nhầy |
| **IgE** | Dị ứng, ký sinh trùng — gắn vào mast cell → giải phóng histamine | Mô, da |
| **IgD** | Vai trò chưa rõ hoàn toàn | Bề mặt tế bào B chưa hoạt hóa |

### 3.4. Cơ chế kháng thể "trung hòa" kháng nguyên

Kháng thể không tự "giết" mầm bệnh — nó *đánh dấu* và làm sạch:

1. **Trung hòa (neutralization)**: kháng thể bao quanh virus/độc tố → chặn không cho virus bám vào tế bào.
2. **Ngưng kết (agglutination)**: 1 kháng thể có 2 đầu → có thể "kẹp" 2 vi khuẩn → đám vi khuẩn kết tụ → dễ thực bào nuốt cả đám.
3. **Opsonization**: phần Fc của kháng thể gắn vào thụ thể trên đại thực bào → "kéo" mầm bệnh đến thực bào.
4. **Kích hoạt bổ thể**: phức hợp kháng thể-kháng nguyên kích hoạt cascade bổ thể → đục lỗ vi khuẩn.

### 3.5. Bốn ví dụ số cụ thể

**Ví dụ 1 — sự đa dạng tế bào B**: Cơ thể người có ~10⁹–10¹² tế bào B *khác nhau*, mỗi tế bào mang 1 thụ thể duy nhất (1 epitope khớp). Có được nhờ **tái tổ hợp V(D)J** trong gene tạo Ig. Đây là "thư viện kháng thể" có sẵn.

**Ví dụ 2 — clonal selection (chọn lọc dòng)**: Khi 1 kháng nguyên (vd protein virus cúm) xuất hiện, chỉ ~1 trong 10⁶ tế bào B có thụ thể khớp. Tế bào này được kích hoạt → nhân bản ~1000–10,000 lần trong vài ngày → thành dòng tế bào tiết kháng thể (plasma cell) + dòng tế bào nhớ.

**Ví dụ 3 — kháng thể IgG gắn được 2 kháng nguyên**: 2 đầu vùng biến đổi → 2 vị trí gắn (valency = 2). IgM gồm 5 đơn vị Y ghép lại → 10 vị trí gắn → cực mạnh trong ngưng kết. Đây là lý do IgM tốt cho phản ứng *đầu tiên* dù chưa đặc hiệu cao.

**Ví dụ 4 — tốc độ sản kháng thể**: 1 plasma cell trưởng thành tiết ~2000 phân tử kháng thể/giây. Một dòng 10⁴ plasma cell → ~2 × 10⁷ kháng thể/giây = ~1.7 × 10¹² kháng thể/ngày từ chỉ 1 dòng.

### ❓ Câu hỏi tự nhiên của người đọc

**Q: Vì sao cơ thể không tấn công chính tế bào của mình (self)?**
A: Trong quá trình trưởng thành ở tủy xương (B) hoặc tuyến ức (T), bất kỳ tế bào lympho nào có thụ thể *khớp với kháng nguyên của bản thân* sẽ bị tiêu diệt — gọi là **chọn lọc âm (negative selection)** hoặc *central tolerance*. Khi cơ chế này lỗi → bệnh tự miễn (§6).

**Q: Sao chỉ 1 mầm bệnh mà kích hoạt nhiều loại kháng thể?**
A: Vì 1 mầm bệnh có nhiều **epitope** (nhiều "khuôn mặt") trên bề mặt. Mỗi epitope kích hoạt 1 dòng tế bào B khác → cơ thể tạo ra hỗn hợp **polyclonal antibodies**. Đây là điểm mạnh: nếu virus đột biến 1 epitope, vẫn còn các kháng thể khác đánh trúng.

**Q: Tế bào T helper hoạt hóa tế bào B kiểu gì?**
A: Tế bào B bắt kháng nguyên qua thụ thể bề mặt → nuốt vào, cắt thành mẩu peptide → trình diện lên MHC class II. Tế bào T helper nhận diện peptide này (qua TCR) → tiết cytokine (IL-4, IL-21...) → tế bào B mới được phép nhân bản và tiết kháng thể. Đây là "double check" — cần cả tế bào B và T cùng nhận diện thì mới hoạt hóa, tránh kích hoạt nhầm.

### 🔁 Dừng lại tự kiểm tra

1. Một kháng nguyên virus có 8 epitope khác nhau. Sẽ kích hoạt được bao nhiêu *dòng* tế bào B?
2. Vì sao IgM xuất hiện sớm nhất khi nhiễm khuẩn lần đầu, dù IgG mạnh hơn?

<details>
<summary>Đáp án</summary>

1. Lên tới **8 dòng tế bào B** khác nhau, mỗi dòng đặc hiệu cho 1 epitope. Trên thực tế có thể nhiều hơn nếu mỗi epitope kích hoạt nhiều dòng có ái lực khác nhau. Đây gọi là phản ứng *polyclonal*.
2. Vì tế bào B mới hoạt hóa *mặc định* sản IgM trước (đây là isotype "khởi đầu" — vẫn dùng cùng vùng biến đổi nhưng ghép với vùng hằng định loại μ). Sau khi nhận tín hiệu từ tế bào T helper, tế bào B mới **chuyển lớp (class switching)** sang IgG/A/E. IgM có 10 đầu gắn → ngưng kết rất mạnh, bù lại độ đặc hiệu chưa được tối ưu hóa.
</details>

### 📝 Tóm tắt mục 3

- Kháng nguyên có epitope; kháng thể (Ig) hình Y, 2 chuỗi nặng + 2 nhẹ, có vùng biến đổi (gắn antigen) và hằng định.
- 5 lớp Ig: IgG (phổ biến, qua nhau thai), IgM (đầu tiên), IgA (niêm mạc), IgE (dị ứng), IgD.
- Tế bào B → kháng thể (humoral); tế bào T helper điều phối, T gây độc giết tế bào nhiễm.
- Clonal selection: 1 kháng nguyên kích hoạt đúng dòng tế bào B/T khớp → nhân bản → dòng hiệu lực + dòng nhớ.

---

## 4. Đáp ứng sơ cấp vs thứ cấp — lõi của trí nhớ miễn dịch

### 💡 Trực giác / Hình dung

Hãy hình dung đáp ứng miễn dịch như **lực lượng cứu hỏa**:

- **Lần 1**: chuông báo cháy → phải gọi điện gấp, tập hợp người, lấy xe, đến hiện trường → mất nhiều thời gian. Đám cháy có thể lan to trước khi dập được.
- **Lần 2** (cùng địa điểm, cùng loại cháy): đội đã quen → xe đậu sẵn, danh bạ có sẵn → vài phút là tới, dập tắt nhanh.

Khác biệt là **kinh nghiệm + chuẩn bị sẵn**. Trong cơ thể, "chuẩn bị sẵn" = **tế bào nhớ (memory cells)** đã tồn tại từ lần đầu.

### 4.1. Đáp ứng sơ cấp (primary response)

Lần đầu gặp kháng nguyên X:

1. Ngày 0–2: kháng nguyên xâm nhập, tế bào tua bắt và mang về hạch lympho.
2. Ngày 2–5: kháng nguyên trình diện cho T helper; clonal selection của B và T khớp.
3. Ngày 5–10: nồng độ kháng thể (IgM trước, IgG sau) đạt **đỉnh** — nhưng nồng độ vẫn **thấp**.
4. Ngày 10–14: kháng nguyên bị quét sạch; phần lớn plasma cell chết; **một số tế bào B/T trở thành tế bào nhớ**, sống nhiều năm tới hàng chục năm.

### 4.2. Đáp ứng thứ cấp (secondary response)

Lần 2 gặp kháng nguyên X (có thể vài tháng đến vài chục năm sau):

1. Tế bào nhớ đã có sẵn (số lượng cao gấp ~10–100 lần dòng "ngây thơ").
2. Tế bào nhớ nhân lên cực nhanh — đáp ứng đạt đỉnh trong ~**2–3 ngày**.
3. Nồng độ kháng thể đỉnh gấp **10–100 lần** lần sơ cấp.
4. Kháng thể chủ yếu là **IgG** (đặc hiệu cao, ái lực cao do **affinity maturation** — đột biến điểm trong gene Ig khiến kháng thể ngày càng "khít" với epitope).
5. Mầm bệnh thường bị dập tắt **trước khi xuất hiện triệu chứng** — đó là lý do "miễn dịch suốt đời" với nhiều bệnh sau khi đã mắc 1 lần.

### 4.3. Bốn ví dụ số cụ thể

**Ví dụ 1 — đỉnh kháng thể**: lần sơ cấp đỉnh ~10 đơn vị IgG/mL ở ngày 10–14. Lần thứ cấp đỉnh ~500–1000 đơn vị IgG/mL ở ngày 4–5. Tỉ lệ ~50–100 lần — đủ trung hòa mầm bệnh trước khi nó nhân lên đáng kể.

**Ví dụ 2 — thời gian phản ứng**: sơ cấp mất 5–10 ngày để đạt đỉnh; thứ cấp chỉ 2–3 ngày. Trong khoảng thời gian thứ cấp này, vi khuẩn chia đôi mỗi 20 phút (vd E. coli) sẽ chỉ nhân từ 1 → 2³⁶ ≈ 7 × 10¹⁰ (nếu không bị chặn). Với sơ cấp 5 ngày = 360 chu kỳ → con số vô nghĩa lớn. Khác biệt 2–3 ngày là khác biệt giữa "kịp" và "không kịp".

**Ví dụ 3 — số lượng tế bào nhớ**: sau lần sơ cấp với 1 epitope, từ ~1000 tế bào B ban đầu khớp sẽ còn lại ~10⁵–10⁶ tế bào nhớ → khi gặp lại, không cần "tìm trong thư viện" nữa, có sẵn.

**Ví dụ 4 — affinity maturation**: ái lực (affinity, Kd) của IgG sơ cấp ~10⁻⁶ M; sau affinity maturation, IgG thứ cấp đạt ~10⁻⁹–10⁻¹⁰ M, tức là gắn chặt hơn ~1000–10,000 lần.

### ⚠ Lỗi thường gặp

- **Nghĩ "tế bào nhớ là 1 loại đặc biệt khác hẳn"**: thực ra tế bào nhớ là *biến thể "sống lâu" của tế bào B/T đã được kích hoạt*. Cùng thụ thể đặc hiệu, chỉ khác ở tuổi thọ và trạng thái sẵn sàng.
- **Nghĩ "đáp ứng thứ cấp nhanh vì cơ thể đã có kháng thể sẵn"**: SAI. Kháng thể từ lần sơ cấp phần lớn đã thoái hóa (vài tuần đến vài tháng). Nhanh là vì **tế bào nhớ** kích hoạt và tiết kháng thể mới cực nhanh.
- **Nhầm primary với "lần nhiễm đầu tiên trong đời"**: primary là *lần đầu tiên hệ miễn dịch gặp epitope đó*. Nếu kháng nguyên hoàn toàn mới (vd virus mới), dù bạn 80 tuổi, đó vẫn là primary.

### ❓ Câu hỏi tự nhiên của người đọc

**Q: Có miễn dịch với cảm cúm rồi sao vẫn cúm lại mỗi năm?**
A: Vì virus cúm **đột biến epitope** rất nhanh (antigenic drift) — chủng năm nay khác chủng năm ngoái. Tế bào nhớ cũ không nhận ra epitope mới → lại phải sơ cấp với chủng mới. Đó là lý do phải tiêm vaccine cúm hàng năm.

**Q: Có bệnh nào miễn dịch suốt đời sau khi mắc 1 lần không?**
A: Có — đậu mùa, sởi, quai bị, thủy đậu. Virus của các bệnh này ổn định (ít đột biến epitope), nên tế bào nhớ một lần là đủ trọn đời.

### 🔁 Dừng lại tự kiểm tra

1. Đường cong nồng độ kháng thể theo thời gian: thứ cấp khác sơ cấp ở 3 điểm chính nào?
2. Tế bào nhớ là tế bào B hay tế bào T hay cả hai?

<details>
<summary>Đáp án</summary>

1. (i) **Thời gian đạt đỉnh**: thứ cấp ~2–3 ngày vs sơ cấp ~5–10 ngày. (ii) **Độ cao đỉnh**: thứ cấp gấp 10–100 lần. (iii) **Loại kháng thể chiếm ưu thế**: thứ cấp chủ yếu IgG (ái lực cao sau affinity maturation), sơ cấp đầu là IgM rồi mới IgG.
2. **Cả hai** — có cả **tế bào B nhớ** (memory B cell) và **tế bào T nhớ** (memory T cell, cả CD4⁺ và CD8⁺). Cả hai cùng góp phần vào đáp ứng thứ cấp nhanh.
</details>

### 📝 Tóm tắt mục 4

- Sơ cấp: chậm (5–10 ngày), nồng độ thấp, IgM trước IgG sau, tạo tế bào nhớ.
- Thứ cấp: nhanh (2–3 ngày), nồng độ cao gấp 10–100 lần, chủ yếu IgG ái lực cao.
- Tế bào nhớ là "tài sản" lâu dài của hệ miễn dịch — nền tảng của vaccine ở §5.

---

## 5. Vaccine — kỹ thuật "lừa" hệ miễn dịch để có trí nhớ mà không bị bệnh

### 💡 Trực giác / Hình dung

Vaccine giống **diễn tập phòng cháy chữa cháy**: cho hệ miễn dịch "gặp giả" mầm bệnh (không nguy hiểm) để xây tế bào nhớ. Khi gặp mầm bệnh thật → đáp ứng thứ cấp dập tắt nhanh, người tiêm không hề bị bệnh.

### 5.1. Vaccine là gì

Vaccine là chế phẩm chứa kháng nguyên của mầm bệnh ở dạng **không gây bệnh nhưng vẫn kích hoạt được miễn dịch**. Các dạng:

| Loại | Ví dụ | Cơ chế |
|------|-------|--------|
| Bất hoạt (inactivated) | cúm tiêm thông thường | Mầm bệnh đã bị giết bằng nhiệt/hóa chất |
| Suy yếu (live attenuated) | sởi, quai bị, rubella (MMR), thủy đậu | Mầm bệnh còn sống nhưng đã mất độc lực — gây miễn dịch mạnh, gần như suốt đời |
| Tiểu đơn vị (subunit) | viêm gan B, HPV | Chỉ tiêm 1 protein bề mặt của virus |
| Toxoid | uốn ván, bạch hầu | Độc tố vi khuẩn đã bất hoạt |
| mRNA | COVID-19 (Pfizer, Moderna) | Tiêm mRNA mã hóa protein bề mặt → cơ thể tự dịch mã → tự trình diện kháng nguyên |
| Vector virus | COVID-19 (AstraZeneca) | Virus vô hại mang gene mã hóa kháng nguyên đích |

### 5.2. Lịch trình tiêm và "tiêm nhắc (booster)"

Hầu hết vaccine cần **≥ 2 mũi**:
- Mũi 1: kích hoạt đáp ứng *sơ cấp* → tạo tế bào nhớ ở mức ban đầu.
- Mũi 2 (sau vài tuần): cơ thể coi như "gặp lần 2" → đáp ứng *thứ cấp* → nồng độ kháng thể tăng vọt + tế bào nhớ tăng số lượng và **chất lượng** (affinity maturation).
- Tiêm nhắc (booster) định kỳ: vì tế bào nhớ giảm dần theo năm → tiêm nhắc để "nạp pin".

### 5.3. Bốn ví dụ số cụ thể

**Ví dụ 1 — vaccine sởi**: 1 mũi cho hiệu lực ~93%; 2 mũi cho ~97%. 4% chênh lệch nghe nhỏ, nhưng với 1 triệu trẻ → 40,000 trẻ thêm được bảo vệ. Đó là lý do bắt buộc 2 mũi.

**Ví dụ 2 — vaccine uốn ván**: tế bào nhớ giảm xuống dưới ngưỡng bảo vệ sau ~10 năm → khuyến cáo tiêm nhắc mỗi 10 năm. Người không tiêm nhắc và bị thương dính đất → vẫn có thể nhiễm.

**Ví dụ 3 — vaccine cúm**: hiệu lực thay đổi 20–60% mỗi năm tùy mức "khớp" giữa chủng vaccine và chủng lưu hành thực tế. Vì cúm đột biến epitope nhanh, nên phải dự đoán và sản xuất lại mỗi năm.

**Ví dụ 4 — Miễn dịch cộng đồng (herd immunity)**: với sởi ($R_0 \approx 12\text{–}18$), cần ~95% dân số có miễn dịch để chặn lây lan. Công thức ngưỡng $= 1 - \frac{1}{R_0} \approx 1 - \frac{1}{15} \approx 93\%$. Nếu tỉ lệ tiêm tụt xuống 80%, sởi bùng phát trở lại — điều đã xảy ra ở vài nước châu Âu 2017–2019.

### ⚠ Lỗi thường gặp

- **Nghĩ "vaccine = tiêm vi khuẩn còn sống vào người, rất nguy hiểm"**: phần lớn vaccine không chứa mầm bệnh sống. Ngay cả vaccine sống (MMR) cũng là chủng đã *suy yếu* — không gây bệnh ở người khỏe mạnh.
- **Nghĩ "tiêm vaccine bị sốt nhẹ = bị bệnh từ vaccine"**: sốt nhẹ sau tiêm là *đáp ứng miễn dịch đang khởi động* (cytokine → vùng dưới đồi), không phải bệnh do vaccine. Đó là dấu hiệu vaccine đang hoạt động.
- **Nghĩ "đã khỏi bệnh là không cần tiêm nữa"**: đúng cho bệnh ổn định (sởi, thủy đậu), nhưng SAI cho bệnh đột biến nhanh (cúm) — vẫn nên tiêm nhắc theo chủng mới.

### ❓ Câu hỏi tự nhiên của người đọc

**Q: Vaccine mRNA có "thay đổi DNA" của tôi không?**
A: Không. mRNA tiêm vào tế bào chỉ ở phần **bào tương (cytoplasm)**, được ribosome đọc để tổng hợp protein đích, rồi tự phân hủy trong vài ngày. mRNA không vào nhân, không tích hợp vào DNA. Cơ chế tương tự mRNA tự nhiên trong tế bào — chỉ khác nó mã hóa protein bề mặt virus thay vì protein của bạn.

**Q: Vì sao kháng thể từ tiêm vaccine vẫn được gọi là "miễn dịch chủ động (active)" còn từ sữa mẹ là "thụ động (passive)"?**
A: Vì tiêm vaccine khiến cơ thể *tự sản xuất* kháng thể và tế bào nhớ. Sữa mẹ cho con kháng thể *có sẵn* — không có tế bào nhớ → khi kháng thể đó hết (~vài tháng), không còn miễn dịch nữa. Chủ động bền lâu; thụ động nhanh nhưng tạm thời.

### 🔁 Dừng lại tự kiểm tra

1. Vì sao tiêm vaccine COVID 2 mũi cho hiệu lực cao hơn 1 mũi rất nhiều?
2. Người bị suy giảm miễn dịch (vd HIV nặng) có nên tiêm vaccine sống suy yếu (MMR) không?

<details>
<summary>Đáp án</summary>

1. Vì mũi 1 chỉ kích hoạt được đáp ứng *sơ cấp* (chậm, nồng độ thấp, IgM chiếm phần lớn). Mũi 2 đóng vai trò "lần 2 gặp lại" → kích hoạt đáp ứng *thứ cấp* dùng tế bào nhớ từ mũi 1 → nồng độ IgG tăng vọt 10–100 lần và ái lực cao hơn (affinity maturation). 1 mũi đơn không đủ ngưỡng bảo vệ với phần lớn vaccine.
2. **Không nên** dùng vaccine sống suy yếu — vì virus tuy đã suy yếu nhưng vẫn cần hệ miễn dịch khỏe để khống chế. Người suy giảm miễn dịch có thể bị virus suy yếu phát triển thành bệnh thật. Họ nên dùng vaccine bất hoạt, tiểu đơn vị hoặc mRNA.
</details>

### 📝 Tóm tắt mục 5

- Vaccine = đưa kháng nguyên không gây bệnh vào → kích hoạt sơ cấp → tạo tế bào nhớ → khi gặp thật, đáp ứng thứ cấp dập tắt nhanh.
- Nhiều dạng: bất hoạt, suy yếu, subunit, toxoid, mRNA, vector — mỗi loại có ưu điểm và đối tượng phù hợp khác nhau.
- Cần ≥2 mũi vì mũi 1 mới sơ cấp, mũi 2 mới thứ cấp; tiêm nhắc vì tế bào nhớ giảm theo năm.
- Miễn dịch cộng đồng cần ngưỡng tiêm cao ($\approx 1 - \frac{1}{R_0}$) — tụt xuống thì bùng phát.

---

## 6. Khi hệ miễn dịch "trục trặc"

### 💡 Trực giác / Hình dung

Hệ miễn dịch giống một **đội an ninh nhạy cảm**. Trục trặc theo 3 kiểu: (1) đánh nhầm dân thường (tự miễn), (2) phản ứng thái quá với khách bình thường (dị ứng), (3) bị tê liệt không đánh được ai (suy giảm miễn dịch).

### 6.1. Bệnh tự miễn (autoimmune disease)

Hệ tấn công nhầm tế bào/mô của chính cơ thể vì cơ chế *self-tolerance* (chọn lọc âm khi lympho trưởng thành) bị lỗi. Ví dụ:

- **Đái tháo đường type 1**: tế bào T tự miễn tấn công tế bào β tụy → mất khả năng tiết insulin (sẽ học sâu ở Lesson 04).
- **Lupus ban đỏ hệ thống (SLE)**: kháng thể chống lại DNA, protein nhân của chính cơ thể → tổn thương khớp, da, thận.
- **Viêm khớp dạng thấp**: tự tấn công mô khớp.
- **Đa xơ cứng (multiple sclerosis)**: tự tấn công myelin (lớp bọc dây thần kinh) — liên hệ Lesson 01 cùng tầng (hệ thần kinh).

### 6.2. Dị ứng (allergy)

Hệ phản ứng quá mức với kháng nguyên *vô hại* (phấn hoa, lông mèo, đạm sữa, hải sản). Cơ chế:

1. Lần đầu tiếp xúc: tế bào B sản xuất nhiều **IgE** với kháng nguyên đó.
2. IgE gắn vào bề mặt **tế bào mast**.
3. Lần 2 tiếp xúc: kháng nguyên gắn vào IgE đang ngồi trên mast cell → mast cell **giải phóng histamine** ồ ạt → mạch giãn, niêm mạc sưng, ngứa, hắt hơi, chảy nước mắt mũi.
4. Trường hợp nặng: **sốc phản vệ (anaphylaxis)** — histamine giải phóng toàn thân → huyết áp tụt, đường thở co thắt → có thể tử vong. Xử lý: tiêm **epinephrine** (adrenaline) khẩn cấp.

### 6.3. Suy giảm miễn dịch — AIDS

**HIV** (Human Immunodeficiency Virus) là retrovirus tấn công đặc biệt **tế bào T helper (CD4⁺)** — chính cái "nhạc trưởng" điều phối toàn bộ miễn dịch thích ứng. Khi số CD4⁺ giảm xuống dưới ~200/μL (bình thường 500–1500/μL), người bệnh chuyển sang giai đoạn **AIDS** (Acquired Immunodeficiency Syndrome):

- Mất khả năng kích hoạt tế bào B → kháng thể yếu.
- Mất khả năng kích hoạt tế bào T gây độc → tế bào nhiễm virus không bị diệt.
- Nhiễm trùng cơ hội (Pneumocystis, lao, nấm) và ung thư (Kaposi sarcoma) gây tử vong.

Thuốc kháng retrovirus (ART) hiện nay không diệt được HIV hoàn toàn nhưng giữ tải lượng virus rất thấp → hệ miễn dịch hồi phục, người bệnh sống gần như bình thường.

### 6.4. Bốn ví dụ số cụ thể

**Ví dụ 1**: 5–10% dân số thế giới có ít nhất 1 bệnh tự miễn — phổ biến hơn ung thư + tim mạch ở phụ nữ trẻ. Tự miễn xảy ra ở nữ nhiều hơn nam ~2–10 lần tùy bệnh.

**Ví dụ 2**: Bình thường có 500–1500 tế bào CD4⁺/μL máu. AIDS định nghĩa < 200 CD4⁺/μL. Mất ~80% lượng CD4⁺ là ranh giới giữa "sống chung với HIV" và "AIDS".

**Ví dụ 3**: Sốc phản vệ với dị ứng nặng có thể tụt huyết áp xuống < 70 mmHg trong vài phút (bình thường ~120/80). Epinephrine 0.3–0.5 mg tiêm bắp đảo ngược triệu chứng trong ~5–10 phút.

**Ví dụ 4**: 1 người bị dị ứng phấn hoa có thể có nồng độ IgE máu cao gấp 10–100 lần người bình thường (~100 ng/mL vs <10 ng/mL).

### ❓ Câu hỏi tự nhiên của người đọc

**Q: Vì sao trẻ em ngày nay dị ứng nhiều hơn 50 năm trước?**
A: Giả thuyết "hygiene hypothesis": môi trường quá sạch khiến hệ miễn dịch không có "đối tượng thật" để rèn luyện → quay ra phản ứng với kháng nguyên vô hại (phấn hoa, thức ăn). Bằng chứng: trẻ lớn lên ở trang trại, có vật nuôi, có anh chị em → tỉ lệ dị ứng thấp hơn.

**Q: Cấy ghép tạng (transplant) liên quan miễn dịch thế nào?**
A: Tạng người khác có MHC khác → hệ miễn dịch người nhận coi đó là "kháng nguyên lạ" → đào thải (rejection). Phải (1) chọn người cho có MHC khớp tối đa, (2) dùng thuốc ức chế miễn dịch suốt đời (cyclosporin, tacrolimus). Đánh đổi: dễ nhiễm trùng và ung thư hơn.

### 📝 Tóm tắt mục 6

- Tự miễn: hệ tấn công nhầm "self" (lupus, đái tháo đường type 1, viêm khớp dạng thấp).
- Dị ứng: IgE phản ứng quá mức với kháng nguyên vô hại → histamine ồ ạt → có thể sốc phản vệ.
- AIDS: HIV phá CD4⁺ → suy sụp toàn bộ thích ứng → nhiễm trùng cơ hội, ung thư.
- Cấy ghép: phải chọn MHC khớp + ức chế miễn dịch suốt đời.

---

## 7. Bảng tổng hợp toàn bài

| Thành phần | Nhánh | Vai trò chính | Đặc hiệu? | Nhớ? |
|------------|-------|---------------|----------|------|
| Da, niêm mạc, lysozyme | Bẩm sinh | Hàng rào vật lý/hóa học | Không | Không |
| Đại thực bào, neutrophil | Bẩm sinh | Thực bào | Không | Không |
| Tế bào NK | Bẩm sinh | Giết tế bào nhiễm/ung thư | Không | Không |
| Hệ bổ thể | Bẩm sinh | Đục lỗ vi khuẩn, opsonization | Không | Không |
| Interferon | Bẩm sinh | Cảnh báo tế bào khác về virus | Không | Không |
| Viêm, sốt | Bẩm sinh | Phản ứng tăng dòng máu + nhiệt | Không | Không |
| Tế bào B → kháng thể | Thích ứng | Miễn dịch dịch thể | **Có** | **Có** |
| Tế bào T gây độc (CD8⁺) | Thích ứng | Giết tế bào nhiễm virus | **Có** | **Có** |
| Tế bào T hỗ trợ (CD4⁺) | Thích ứng | Điều phối B và T gây độc | **Có** | **Có** |
| Tế bào nhớ (B/T) | Thích ứng | Đáp ứng thứ cấp nhanh & mạnh | **Có** | **Có (lõi)** |

---

## 8. Bài tập + Lời giải chi tiết

### Bài tập

**Bài 1**: Phân loại các thành phần sau thuộc nhánh nào (bẩm sinh / thích ứng): (a) lysozyme trong nước mắt, (b) IgG, (c) tế bào NK, (d) tế bào T helper, (e) histamine từ mast cell, (f) tế bào B nhớ.

**Bài 2**: Một người bị nhiễm virus X lần đầu vào ngày 0. Kháng thể đạt đỉnh vào ngày 12 với nồng độ 8 đơn vị/mL. Người này khỏi bệnh sau 2 tuần. Một năm sau, nhiễm lại virus X. (a) Đáp ứng lần 2 đạt đỉnh sau bao nhiêu ngày? (b) Nồng độ kháng thể đỉnh khoảng bao nhiêu? (c) Lớp kháng thể chính là gì?

**Bài 3**: Một kháng thể IgG có cấu trúc gồm 2 chuỗi nặng (mỗi chuỗi ~450 amino acid) và 2 chuỗi nhẹ (mỗi chuỗi ~220 amino acid). Tính tổng số liên kết peptide trong 1 phân tử IgG.

**Bài 4**: Vaccine sởi cần 2 mũi để đạt hiệu lực ~97%. Giải thích vì sao 1 mũi không đủ (dùng đường cong sơ cấp/thứ cấp).

**Bài 5**: Người bị HIV nặng có CD4⁺ = 150/μL. So với người bình thường (~1000/μL), mất bao nhiêu phần trăm tế bào CD4⁺? Tại sao mất CD4⁺ lại làm "tê liệt" cả miễn dịch dịch thể (tế bào B) lẫn miễn dịch tế bào (T gây độc), không chỉ một nhánh?

**Bài 6**: Một dòng tế bào B nhân lên thành 10⁴ plasma cell. Nếu mỗi plasma cell tiết 2000 kháng thể/giây, tính tổng số kháng thể được sản xuất trong 1 ngày bởi dòng này.

### Lời giải

**Bài 1**:
- (a) lysozyme — **bẩm sinh** (hàng rào ngoài).
- (b) IgG — **thích ứng** (sản phẩm của tế bào B).
- (c) NK — **bẩm sinh**.
- (d) T helper — **thích ứng**.
- (e) histamine — **bẩm sinh** (qua mast cell, thuộc phản ứng viêm; lưu ý dị ứng dùng IgE từ thích ứng đi gắn mast cell, nhưng bản thân histamine và mast cell là bẩm sinh).
- (f) tế bào B nhớ — **thích ứng** (lõi của trí nhớ miễn dịch).

**Bài 2**:
- (a) Lần 2 = đáp ứng thứ cấp → đạt đỉnh sau **2–3 ngày** (so với 12 ngày của sơ cấp).
- (b) Gấp 10–100 lần đỉnh sơ cấp → khoảng **80–800 đơn vị/mL** (chấp nhận khoảng này; ví dụ điển hình ~400 đơn vị/mL = 50 lần).
- (c) Lớp chính là **IgG** (sau class switching và affinity maturation từ tế bào nhớ), ái lực cao hơn lần sơ cấp.

**Bài 3**:
- Chuỗi nặng: 450 amino acid → 450 − 1 = 449 liên kết peptide. Hai chuỗi nặng → 2 × 449 = 898.
- Chuỗi nhẹ: 220 − 1 = 219 liên kết peptide. Hai chuỗi nhẹ → 2 × 219 = 438.
- **Tổng liên kết peptide = 898 + 438 = 1336**.
- (Lưu ý: các chuỗi nối nhau bằng cầu disulfide –S–S–, không phải liên kết peptide, nên không cộng thêm.)

**Bài 4**:
- Mũi 1 là *lần đầu* hệ miễn dịch gặp kháng nguyên sởi → đáp ứng **sơ cấp**: chậm (5–10 ngày), nồng độ kháng thể thấp, chủ yếu IgM. Sau đó kháng thể giảm; chỉ có 1 lượng tế bào nhớ ở mức cơ bản.
- Mũi 2 (cách mũi 1 vài tuần đến vài tháng) đóng vai trò "**lần 2 gặp lại**" → đáp ứng **thứ cấp**: nhanh (2–3 ngày), nồng độ kháng thể đỉnh gấp 10–100 lần, IgG ái lực cao (affinity maturation), tế bào nhớ tăng cả số lượng và chất lượng.
- Sau mũi 2, lượng tế bào nhớ đủ cao + ái lực kháng thể đủ chặt → khi gặp virus sởi thật, đáp ứng thứ cấp dập tắt mầm bệnh trước khi gây bệnh.
- 1 mũi: ~93% hiệu lực vẫn còn ~7% người không đủ ngưỡng bảo vệ. 2 mũi đẩy lên ~97% — chênh lệch nhỏ này quy mô triệu người là rất lớn (40,000/1M trẻ).

**Bài 5**:
- Mất = (1000 − 150) / 1000 = **85%** tế bào CD4⁺.
- Lý do "tê liệt cả 2 nhánh thích ứng": T helper (CD4⁺) là **nhạc trưởng**. Tế bào B muốn nhân bản và class switching → cần cytokine từ T helper (IL-4, IL-21). Tế bào T gây độc (CD8⁺) muốn được kích hoạt đầy đủ → cũng cần T helper hỗ trợ qua IL-2 và các tín hiệu đồng kích hoạt.
- Mất CD4⁺ ≈ mất nhạc trưởng → cả dàn nhạc (B và T gây độc) không chơi đúng được. Dù bản thân tế bào B, T gây độc, đại thực bào vẫn còn, nhưng không được điều phối → miễn dịch thích ứng sụp đổ.

**Bài 6**:
- 1 ngày = 24 × 3600 = 86,400 giây.
- 1 plasma cell tiết 2000 kháng thể/giây → 1 ngày = 2000 × 86,400 = 1.728 × 10⁸ kháng thể.
- 10⁴ plasma cell × 1.728 × 10⁸ = **1.728 × 10¹² kháng thể/ngày**.
- Con số này (~1.7 ngàn tỉ) đủ để bao phủ và trung hòa lượng virus lớn — đó là sức mạnh của clonal expansion + tiết kháng thể đặc hiệu.

---

## 9. Liên kết và bài tiếp theo

- **Bài tiếp theo trong Biology**: [Lesson 04 — Nội tiết & nội môi](../lesson-04-endocrine-homeostasis/) — học cách hormone điều hòa cơ thể, gồm cả mối liên hệ với tự miễn (đái tháo đường type 1).
- **Liên kết các bài đã học**:
  - [Lesson 01 — Phân tử sinh học](../../01-Molecules-Cells/lesson-01-biomolecules/) §4 (protein, 4 bậc cấu trúc) — nền tảng để hiểu kháng thể.
  - [Lesson 02 — Tuần hoàn & hô hấp](../lesson-02-circulation-respiration/) — bạch cầu lưu thông qua máu; viêm tăng tính thấm thành mạch.
- **Liên kết Chemistry**: pH dạ dày, lysozyme cắt liên kết β-1,4 glycosidic — quay lại [`Chemistry/02-Reactions-Thermo/lesson-08-biochem-preview`](../../../Chemistry/02-Reactions-Thermo/lesson-08-biochem-preview/) nếu cần.
- **Đọc thêm**: [visualization.html](./visualization.html) — bộ công cụ tương tác cho 4 chủ điểm chính của bài.

---

## 📝 Tổng kết Lesson 03

1. **Hệ miễn dịch có 2 nhánh** bổ sung nhau: bẩm sinh (nhanh, không đặc hiệu, không nhớ) và thích ứng (đặc hiệu, **có trí nhớ**).
2. **Bẩm sinh**: da/niêm mạc, thực bào (macrophage, neutrophil), NK, bổ thể, interferon, viêm (đỏ-nóng-sưng-đau), sốt.
3. **Thích ứng**: tế bào B → kháng thể (5 lớp Ig); tế bào T helper điều phối; T gây độc giết tế bào nhiễm. Kháng thể hình Y, 2 đầu gắn antigen.
4. **Đáp ứng thứ cấp** nhanh hơn (~2–3 ngày vs 5–10 ngày) và mạnh hơn (10–100 lần) sơ cấp nhờ **tế bào nhớ** — lõi của vaccine.
5. **Vaccine** = "diễn tập" miễn dịch: đưa kháng nguyên không gây bệnh vào → tạo tế bào nhớ → khi gặp thật, dập nhanh. Cần ≥ 2 mũi; tiêm nhắc khi tế bào nhớ giảm; miễn dịch cộng đồng cần $\approx 1 - \frac{1}{R_0}$.
6. **Trục trặc miễn dịch**: tự miễn (đánh nhầm self), dị ứng (IgE quá mức → histamine), AIDS (HIV phá CD4⁺ → tê liệt thích ứng).

**Tiếp theo**: [Lesson 04 — Nội tiết & nội môi](../lesson-04-endocrine-homeostasis/)
