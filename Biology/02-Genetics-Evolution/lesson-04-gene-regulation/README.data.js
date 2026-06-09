// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: Biology/02-Genetics-Evolution/lesson-04-gene-regulation/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 04 — Điều hòa gen

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Hiểu **vì sao phải điều hòa gen (gene regulation)** — mọi tế bào trong cùng cơ thể có **cùng một bộ DNA** nhưng tế bào gan, tế bào thần kinh, tế bào da lại làm việc khác nhau hoàn toàn. Tế bào tiết kiệm năng lượng bằng cách chỉ tổng hợp protein khi cần.
- Phân tích được **operon Lac** ở vi khuẩn (Jacob & Monod, Nobel 1965): cấu trúc promoter–operator–gen cấu trúc, vai trò của **repressor LacI** và **chất cảm ứng (inducer)** allolactose, cách CAP/cAMP can thiệp khi có/không có glucose.
- Phân biệt **điều hòa cảm ứng (inducible)** — bình thường tắt, có cơ chất thì bật (operon Lac) — với **điều hòa kìm hãm (repressible)** — bình thường bật, có sản phẩm thì tắt (operon Trp).
- Mô tả được **các cấp điều hòa ở sinh vật nhân thực (eukaryote)**: chromatin → phiên mã → sau phiên mã (alternative splicing, miRNA) → dịch mã → sau dịch mã.
- Hiểu **biểu sinh (epigenetics)**: methylation DNA và acetylation histone ảnh hưởng mức biểu hiện gen như thế nào, và vì sao chúng "di truyền" qua phân chia tế bào.
- Dự đoán được trạng thái BẬT/TẮT phiên mã cho 4 tổ hợp tín hiệu môi trường (có/không lactose × có/không glucose) ở operon Lac.

## Kiến thức tiền đề

- **Phiên mã & dịch mã** — [\`../lesson-03-transcription-translation/\`](../lesson-03-transcription-translation/): biết RNA polymerase, promoter, codon, ribosome là gì. Đây là nền tảng — bài này nói về việc **bật/tắt** chính các quá trình đó.
- **Cấu trúc DNA** — [\`../lesson-02-dna-replication/\`](../lesson-02-dna-replication/): mạch kép, base bắt cặp, đường-phosphate. Bài này cần biết DNA là chất nền cho mọi cơ chế điều hòa.
- **Cấu trúc protein** — [\`../../01-Molecules-Cells/lesson-01-biomolecules/\`](../../01-Molecules-Cells/lesson-01-biomolecules/): repressor, yếu tố phiên mã đều là protein gắn DNA — nguyên lý "hình dạng quyết định chức năng" áp dụng triệt để.

---

## 1. Vì sao tế bào cần điều hòa gen?

### 💡 Trực giác / Hình dung

Hãy hình dung bộ DNA của bạn là **một bộ sách dạy nấu 20.000 món**. Mỗi tế bào trong cơ thể đều có cả bộ sách như nhau. Nhưng:

- Tế bào tuyến nước bọt chỉ mở chương "**amylase**" (men tiêu hóa tinh bột).
- Tế bào gan mở chương "**enzyme giải độc**" + "**albumin**".
- Tế bào thần kinh mở chương "**kênh ion**" + "**neurotransmitter**".

Bộ sách giống hệt nhau — nhưng **chương nào được đọc** thì khác. Đó chính là điều hòa gen: kiểm soát **gen nào được biểu hiện, ở đâu, khi nào, mức độ bao nhiêu**.

### 1.1. Hai lý do cốt lõi

1. **Phân hóa tế bào (cellular differentiation)**. Trong 1 cơ thể người có ~200 loại tế bào khác nhau, tất cả đều có cùng DNA. Sự khác biệt 100% đến từ việc **biểu hiện gen khác nhau**.
2. **Tiết kiệm năng lượng và đáp ứng môi trường**. Tổng hợp 1 protein tốn ATP, amino acid, ribosome — không cần thì không làm. Vi khuẩn E. coli chỉ tổng hợp men chuyển hóa lactose **khi có lactose** trong môi trường; có glucose sẵn thì tắt.

### 1.2. Bốn ví dụ số cụ thể

**Ví dụ 1 — bộ gen người vs số gen biểu hiện trong 1 tế bào**: Người có ~20.000 gen mã hóa protein. Nhưng trong **một tế bào cụ thể** (vd tế bào gan), chỉ khoảng **30–60%** số đó được biểu hiện ở một thời điểm → ~6.000–12.000 gen "đang chạy". Các tế bào khác mở bộ gen khác → cùng DNA, khác kết quả.

**Ví dụ 2 — chi phí năng lượng**: Một tế bào E. coli tổng hợp β-galactosidase (sản phẩm operon Lac) tiêu tốn ~**0.5%** năng lượng tế bào nếu BẬT toàn lực. Khi không có lactose, BẬT operon = lãng phí 0.5% ATP cho công việc vô ích → áp lực chọn lọc cực mạnh để **TẮT mặc định**.

**Ví dụ 3 — số lượng yếu tố phiên mã (transcription factor)**: Bộ gen người mã hóa ~**1.600** yếu tố phiên mã (chiếm ~8% tổng số gen). Một promoter trung bình có **5–15** yếu tố phiên mã gắn lên đồng thời → "biểu quyết" quyết định gen có được phiên mã hay không.

**Ví dụ 4 — tốc độ thay đổi biểu hiện**: Khi E. coli chuyển từ môi trường có glucose sang môi trường chỉ có lactose, mức β-galactosidase tăng **>1000 lần** trong vòng **~2 phút**. Đây là tốc độ phản ứng của hệ điều hòa cảm ứng — gần như bật công tắc.

### ❓ Câu hỏi tự nhiên của người đọc

**Q: Nếu tế bào nào cũng có đủ DNA, sao không cứ phiên mã hết, dùng cái nào thì lấy ra?**
A: Vì 3 lý do. (1) **Năng lượng**: tổng hợp 1 protein tốn rất nhiều ATP — phiên mã + dịch mã + folding. (2) **Không gian**: tế bào không có chỗ chứa 20.000 loại protein cùng lúc. (3) **Nhiễu chức năng**: nhiều protein có chức năng đối lập (tăng đường vs giảm đường, kích thích vs ức chế tế bào)— biểu hiện đồng thời thì hỗn loạn.

**Q: Điều hòa gen khác với đột biến chỗ nào?**
A: Đột biến (mutation) thay đổi **trình tự DNA** — vĩnh viễn, di truyền qua thế hệ. Điều hòa thay đổi **mức biểu hiện** — DNA vẫn nguyên, chỉ là "đọc nhanh / đọc chậm / không đọc". Tế bào gan và tế bào thần kinh khác nhau **không phải vì đột biến** mà vì điều hòa khác.

### ⚠ Lỗi thường gặp

- **Nghĩ "mỗi tế bào có DNA riêng"**: SAI. Mọi tế bào trong cơ thể (trừ tế bào sinh dục đã giảm phân và một số hồng cầu mất nhân) đều có **bộ DNA giống hệt nhau**. Khác biệt nằm ở biểu hiện.
- **Nhầm "gen tắt = gen bị xóa"**: Tắt chỉ là không phiên mã; trình tự vẫn còn nguyên trong DNA, có thể bật lại sau.
- **Nghĩ điều hòa chỉ xảy ra ở cấp phiên mã**: Thực tế có **5 cấp** (chromatin, phiên mã, sau phiên mã, dịch mã, sau dịch mã) — xem §4.

### 🔁 Dừng lại tự kiểm tra

1. Tế bào da và tế bào gan có cùng số gen không? Cùng số gen đang biểu hiện không?
2. Vì sao vi khuẩn cần điều hòa gen mặc dù nó là sinh vật đơn bào "đơn giản"?

<details>
<summary>Đáp án</summary>

1. **Cùng số gen** trong DNA (~20.000 ở người). **Khác số gen biểu hiện**: tế bào da mở các gen như keratin, melanin; tế bào gan mở các gen enzyme giải độc, albumin. Chỉ phần "đang đọc" khác.
2. Vì môi trường vi khuẩn thay đổi liên tục (lúc có lactose, lúc có glucose, lúc đói, lúc no, lúc nhiệt độ cao). Tổng hợp đủ enzyme cho mọi tình huống cùng lúc là phá sản năng lượng. Chọn lọc tự nhiên thưởng cho các chủng vi khuẩn biết "tắt khi không cần".
</details>

### 📝 Tóm tắt mục 1

- Mọi tế bào trong 1 cơ thể có cùng DNA, khác nhau ở **biểu hiện gen**.
- Điều hòa cần thiết để **phân hóa tế bào** và **tiết kiệm năng lượng + đáp ứng môi trường**.
- Đột biến đổi trình tự (vĩnh viễn); điều hòa đổi mức đọc (linh hoạt).

---

## 2. Operon Lac — điều hòa cảm ứng ở vi khuẩn

### 💡 Trực giác / Hình dung

Hình dung operon Lac như **1 dây chuyền sản xuất men tiêu hóa lactose** ở E. coli. Dây chuyền này có:

- **Một công tắc chính (promoter)**: chỗ máy photocopy RNA polymerase đậu.
- **Một thanh chắn (operator)**: nằm ngay sau công tắc, nếu có "bảo vệ" (repressor) ngồi lên thì RNA polymerase không đi qua được.
- **Ba thiết bị cần chế tạo (lacZ, lacY, lacA)**: enzyme + transporter để tiêu hóa lactose.

Câu chuyện: bình thường có bảo vệ ngồi, dây chuyền TẮT. Khi lactose vào tế bào, nó "hối lộ" bảo vệ (gắn vào repressor) → bảo vệ rời khỏi thanh chắn → dây chuyền BẬT, sản xuất men → tiêu hóa lactose → hết lactose → bảo vệ quay lại → TẮT.

### 2.1. Cấu trúc operon Lac

\`\`\`
[ lacI ]   [ Promoter | Operator | lacZ | lacY | lacA ]
   ↓                                ↓        ↓      ↓
 Repressor                    β-galactosidase  permease  transacetylase
 (luôn được tổng hợp,        (cắt lactose →    (đưa     (vai trò
  có hoặc không lactose)      glucose+galactose) lactose phụ)
                                                vào tế bào)
\`\`\`

- **lacI** (regulatory gene): nằm trước operon, có promoter riêng, **luôn tổng hợp** repressor LacI ở mức thấp ổn định.
- **Promoter**: chỗ RNA polymerase gắn để khởi động phiên mã.
- **Operator**: trình tự DNA ngắn (~21 bp) NẰM TRONG promoter hoặc ngay sau, là chỗ repressor gắn.
- **lacZ, lacY, lacA**: 3 gen cấu trúc được phiên mã chung trên **1 mRNA đa cistron (polycistronic)** — đặc trưng prokaryote.

### 2.2. Cơ chế: 2 trạng thái cơ bản

**TRẠNG THÁI A — Không có lactose:**

\`\`\`
Repressor LacI ⟶ gắn chặt vào Operator ⟶ chặn RNA polymerase
                                     ⟶ phiên mã TẮT
\`\`\`

Tế bào không phí năng lượng tổng hợp enzyme chuyển hóa lactose khi không có gì để chuyển hóa.

**TRẠNG THÁI B — Có lactose:**

\`\`\`
Lactose vào tế bào ⟶ chuyển một phần thành allolactose (inducer)
Allolactose ⟶ gắn vào LacI ⟶ LacI đổi hình dạng ⟶ rời operator
RNA polymerase đi qua ⟶ phiên mã BẬT ⟶ tổng hợp lacZ/Y/A
\`\`\`

Đây là điều hòa **cảm ứng âm (negative inducible)**: "âm" vì cơ chế tự nhiên là **chặn** (repressor); "cảm ứng" vì cần tín hiệu (lactose) để **gỡ chặn**.

### 2.3. Điều hòa tinh tế hơn: CAP/cAMP và glucose

Vi khuẩn thích **glucose** hơn lactose (glucose đi thẳng vào đường phân, không cần enzyme thêm). Nếu môi trường có cả glucose và lactose, vi khuẩn ưu tiên ăn glucose — nhưng làm sao tế bào "biết" có glucose hay không?

- Khi **không có glucose** → nồng độ **cAMP** (cyclic AMP) trong tế bào **tăng cao**.
- cAMP gắn vào protein **CAP** (Catabolite Activator Protein) → CAP–cAMP gắn vào trước promoter Lac → **giúp RNA polymerase bám tốt** → phiên mã mạnh.
- Khi **có glucose** → cAMP **thấp** → CAP không hoạt động → ngay cả khi operator mở (có lactose), phiên mã chỉ ở mức thấp.

Đây là điều hòa **dương (positive)** chồng lên cơ chế âm của repressor.

### 2.4. Bảng tổng hợp 4 tổ hợp (BẢNG QUAN TRỌNG)

| Lactose | Glucose | Repressor LacI | CAP–cAMP | RNA polymerase | Phiên mã |
|:-------:|:-------:|:--------------:|:--------:|:--------------:|:--------:|
| Không | Có | Gắn operator (active) | Không hoạt động (cAMP thấp) | Bị chặn | **TẮT** |
| Không | Không | Gắn operator (active) | Hoạt động (cAMP cao) | Bị chặn | **TẮT** |
| Có | Có | Rời operator (allolactose gắn) | Không hoạt động (cAMP thấp) | Vào được nhưng kém hỗ trợ | **BẬT YẾU** |
| Có | Không | Rời operator | Hoạt động, hỗ trợ polymerase | Bám tốt | **BẬT MẠNH** |

Đọc bảng theo logic sinh học: tế bào **chỉ thực sự ăn lactose mạnh** khi (a) có lactose VÀ (b) không có glucose. Đây là chiến lược tối ưu hóa năng lượng.

### 2.5. Bốn ví dụ số cụ thể

**Ví dụ 1 — Môi trường chỉ có glucose, không có lactose**: Lactose vắng → repressor gắn operator → phiên mã ~ **mức cơ bản (basal)** ≈ 0.1% mức tối đa. Vài bản sao mRNA "rò rỉ" để tế bào "thăm dò" môi trường, nhưng cơ bản là TẮT.

**Ví dụ 2 — Môi trường chỉ có lactose, không glucose**: Allolactose gỡ repressor + cAMP cao kích hoạt CAP → phiên mã **≈ 100% mức tối đa**. Mức β-galactosidase trong tế bào tăng **>1000 lần** so với ví dụ 1.

**Ví dụ 3 — Môi trường có cả lactose lẫn glucose**: Repressor bị gỡ (do allolactose) NHƯNG cAMP thấp → CAP không hỗ trợ → phiên mã **≈ 5–10% mức tối đa**. Vi khuẩn "biết" có lactose nhưng vẫn ưu tiên glucose — đây là hiện tượng **diauxic growth** (Monod 1941).

**Ví dụ 4 — Đột biến mất chức năng lacI**: Nếu lacI bị đột biến không tạo được repressor → operator luôn trống → phiên mã **BẬT cả khi không có lactose**. Tế bào phí năng lượng tổng hợp enzyme vô ích. Trong thí nghiệm Jacob–Monod, chính các chủng "constitutive" này giúp chứng minh sự tồn tại của repressor.

### ❓ Câu hỏi tự nhiên của người đọc

**Q: "Allolactose" là gì, có khác lactose không?**
A: Allolactose là một dạng đồng phân (isomer) của lactose. Khi lactose vào tế bào, ~1 phần nhỏ được enzyme β-galactosidase (chính sản phẩm operon Lac!) chuyển thành allolactose. Allolactose mới là phân tử trực tiếp gắn vào repressor. Đây là vòng feedback: chỉ cần một chút β-galactosidase rò rỉ ban đầu → tạo allolactose → gỡ repressor → tổng hợp nhiều enzyme hơn nữa.

**Q: Vì sao gọi là "operon"?**
A: Vì 3 gen lacZ/Y/A được điều khiển bởi **một bộ công tắc chung** (1 promoter + 1 operator) và phiên mã thành **một mRNA chung** (đa cistron). Cụm gen cùng "vận hành" (operate) như một đơn vị → "operon". Khái niệm này do Jacob & Monod đưa ra năm 1961, được Nobel năm 1965.

**Q: Eukaryote có operon không?**
A: Hầu như **không**. Eukaryote phiên mã từng gen riêng (mRNA đơn cistron), điều hòa phức tạp hơn (xem §4). Operon là đặc trưng prokaryote.

### ⚠ Lỗi thường gặp

- **Nhầm lacI là gen trong operon**: lacI là **gen điều hòa** (regulatory) nằm bên ngoài, có promoter riêng. Operon chỉ gồm promoter–operator–lacZ–lacY–lacA.
- **Nghĩ lactose trực tiếp gắn repressor**: không — phải qua allolactose. Đây là chi tiết hay bị bỏ qua.
- **Coi CAP/cAMP là phụ**: thực ra CAP nâng tốc độ phiên mã lên ~**50 lần** so với không có CAP — không phải chi tiết nhỏ.
- **Nhầm "cảm ứng" với "kích hoạt"**: trong operon Lac, lactose KHÔNG trực tiếp kích hoạt phiên mã — nó **gỡ chặn**. RNA polymerase tự đi vào khi không có gì cản. Đây là cảm ứng âm.

### 🔁 Dừng lại tự kiểm tra

1. Một chủng E. coli đột biến mất chức năng lacI. Trong 4 môi trường (lactose ±, glucose ±), trạng thái phiên mã sẽ thế nào?
2. Vì sao tế bào không tổng hợp repressor ở mức cực cao để "đảm bảo" luôn tắt operon khi vắng lactose?

<details>
<summary>Đáp án</summary>

1. lacI mất chức năng → không có repressor → operator luôn trống → phiên mã BẬT bất kể lactose. Nhưng mức cao thấp vẫn phụ thuộc CAP:
   - Không glucose → cAMP cao → CAP hỗ trợ → BẬT MẠNH (dù không có lactose).
   - Có glucose → cAMP thấp → BẬT YẾU.
   Đây là chủng "constitutive" — biểu hiện liên tục, lãng phí năng lượng nếu không có lactose.
2. Vì repressor cũng là protein — tổng hợp tốn ATP. Và quá nhiều repressor sẽ khó "gỡ" khi cần (cần nhiều allolactose hơn). Tự nhiên chọn mức tối thiểu đủ để chặn operator (~10–20 phân tử LacI/tế bào).
</details>

### 📝 Tóm tắt mục 2

- Operon Lac = promoter + operator + lacZ/Y/A; gen điều hòa lacI nằm ngoài.
- **Cảm ứng âm**: không lactose → LacI chặn → TẮT. Có lactose → allolactose gỡ LacI → BẬT.
- **CAP–cAMP**: không glucose → cAMP cao → CAP hỗ trợ → BẬT MẠNH. Có glucose → BẬT YẾU.
- Bảng 4 tổ hợp: chỉ trường hợp (lactose có, glucose không) cho BẬT mạnh.

---

## 3. Operon Trp — điều hòa kìm hãm (repressible)

### 💡 Trực giác / Hình dung

Operon Lac là dây chuyền **bình thường TẮT, có cơ chất thì BẬT**. Operon Trp ngược lại: **bình thường BẬT, có sản phẩm thì TẮT**.

Hình dung như nhà máy gạo: nếu kho cạn gạo → nhà máy chạy hết công suất tự sản xuất gạo. Khi kho đầy → tự tắt để không sản xuất thừa. Trp (tryptophan) là một amino acid mà E. coli **phải tự tổng hợp** nếu môi trường thiếu. Có Trp đủ rồi → tắt dây chuyền.

### 3.1. Cấu trúc và cơ chế

Operon Trp ở E. coli gồm 5 gen cấu trúc (trpE, D, C, B, A) mã hóa các enzyme tổng hợp tryptophan từ chorismic acid. Bên ngoài có **gen điều hòa trpR** mã hóa **repressor TrpR**.

Khác biệt then chốt:

- **TrpR khi mới tổng hợp là "bất hoạt" (inactive)** — không gắn được operator.
- **TrpR + tryptophan → "hoạt hóa" (active)** — gắn operator, chặn phiên mã.

\`\`\`
Không Trp:  TrpR (inactive) ⟶ không gắn operator ⟶ BẬT
                             ⟶ tổng hợp enzyme ⟶ tạo Trp

Đủ Trp:    Trp + TrpR ⟶ TrpR active ⟶ gắn operator ⟶ TẮT
\`\`\`

Tryptophan ở đây gọi là **đồng kìm hãm (corepressor)** — đối lập với inducer của operon Lac.

### 3.2. So sánh Lac vs Trp

| Đặc điểm | Operon Lac | Operon Trp |
|----------|-----------|-----------|
| Loại điều hòa | Cảm ứng (inducible) | Kìm hãm (repressible) |
| Mặc định | TẮT | BẬT |
| Tín hiệu | Lactose (cơ chất → tạo allolactose = **inducer**) | Tryptophan (sản phẩm = **corepressor**) |
| Tác động tín hiệu lên repressor | Gỡ repressor (làm bất hoạt) | Hoạt hóa repressor |
| Loại đường chuyển hóa | **Dị hóa (catabolic)** — phân giải | **Đồng hóa (anabolic)** — tổng hợp |
| Logic sinh học | Có cơ chất mới sản xuất men tiêu hóa | Đủ sản phẩm rồi thì ngừng sản xuất |

Mẹo nhớ: **dị hóa → cảm ứng** (chỉ phân giải khi có cơ chất); **đồng hóa → kìm hãm** (chỉ tổng hợp khi thiếu sản phẩm).

### 3.3. Bốn ví dụ số cụ thể

**Ví dụ 1 — Môi trường thiếu Trp hoàn toàn**: Trp = 0 → TrpR bất hoạt → operator trống → phiên mã ≈ **100% mức tối đa**. Tế bào tăng tốc tổng hợp Trp.

**Ví dụ 2 — Môi trường thừa Trp** (từ thức ăn): Trp dư → mỗi TrpR có Trp gắn vào → tất cả active → operator bị chặn → phiên mã ≈ **5% mức tối đa**. Tế bào không phí năng lượng tự sản xuất Trp.

**Ví dụ 3 — Trp ở mức trung bình** (nồng độ ~10 μM): Khoảng **50% TrpR** ở dạng active → phiên mã ~**40–50% mức tối đa**. Đây là cơ chế điều hòa **theo gradient**, không phải bật/tắt cứng.

**Ví dụ 4 — Đột biến trpR mất chức năng**: Không có repressor → operon luôn BẬT bất kể nồng độ Trp → tế bào sản xuất Trp dư thừa, lãng phí năng lượng. Tương tự chủng constitutive của Lac.

### ❓ Câu hỏi tự nhiên của người đọc

**Q: "Inducer" và "corepressor" khác nhau thế nào?**
A: Cả hai đều là phân tử nhỏ gắn vào repressor để thay đổi hình dạng. Khác ở chiều tác động:
- **Inducer** (allolactose) làm repressor **mất** khả năng gắn DNA → BẬT phiên mã.
- **Corepressor** (Trp) làm repressor **được** khả năng gắn DNA → TẮT phiên mã.
Cùng một cơ chế hóa học (allosteric — gắn ở một chỗ, thay đổi hình dạng ở chỗ khác), nhưng kết quả ngược nhau do hình dạng ban đầu của repressor khác.

**Q: Operon Trp còn có điều hòa khác ngoài repressor không?**
A: Có — **attenuation** (làm suy giảm). Đây là cơ chế thứ 2 dùng cấu trúc kẹp tóc trên mRNA, kết hợp với tốc độ dịch mã của một đoạn leader peptide chứa nhiều Trp. Cơ chế này phức tạp; bài này tạm dừng ở mức repressor để giữ trọng tâm.

### ⚠ Lỗi thường gặp

- **Nghĩ "Trp = inducer giống lactose"**: SAI. Trp là **corepressor**, không phải inducer. Tác dụng ngược nhau hoàn toàn.
- **Nhầm "kìm hãm" với "ức chế đối kháng"**: Kìm hãm (repressible) ở đây nói về kiểu operon mặc định bật, không phải sự ức chế cạnh tranh enzyme.
- **Áp công thức nhớ máy móc**: "thấy có cơ chất thì BẬT" — đúng với Lac, sai với Trp. Phải nhớ Trp là sản phẩm (output), không phải cơ chất (input).

### 🔁 Dừng lại tự kiểm tra

1. Một E. coli sống trong môi trường giàu Trp suốt 100 thế hệ. Operon Trp ở trạng thái nào? Tổng hợp nội tại Trp ở mức nào?
2. Đột biến trpR (mất chức năng) gây hậu quả gì khi sống trong môi trường thừa Trp?

<details>
<summary>Đáp án</summary>

1. Trp cao → TrpR active → operator bị chặn → operon TẮT. Tổng hợp Trp nội tại ở mức **thấp** (chỉ ~5% mức tối đa). Tế bào "vay" Trp từ môi trường thay vì tự làm.
2. Mất TrpR → operon luôn BẬT bất chấp Trp dư thừa → tế bào liên tục tổng hợp enzyme và Trp → lãng phí năng lượng, cạnh tranh thua các chủng wild-type về sinh trưởng. Bằng chứng cho thấy điều hòa là yếu tố sinh tồn, không phải "trang trí".
</details>

### 📝 Tóm tắt mục 3

- Operon Trp: bình thường BẬT, có Trp dư thì TẮT (**kìm hãm**).
- Trp là **corepressor**: gắn TrpR → kích hoạt TrpR → chặn operator.
- Mẹo: **dị hóa → cảm ứng (Lac)**; **đồng hóa → kìm hãm (Trp)**.

---

## 4. Điều hòa gen ở Eukaryote — 5 cấp độ

### 💡 Trực giác / Hình dung

Ở prokaryote, điều hòa gen như **một công tắc đèn** ở cửa phòng — bật hoặc tắt cả phòng. Ở eukaryote, nó như **một bảng mix âm thanh** với nhiều cần gạt: chromatin (đóng/mở quyển sách), phiên mã (đọc nhanh/chậm), splicing (cắt ghép bản nháp), mRNA (giữ lâu/phân hủy nhanh), dịch mã (tổng hợp protein), sửa sau dịch mã (kích hoạt/khóa protein). Mỗi cần gạt thêm 1 lớp tinh chỉnh.

### 4.1. Năm cấp điều hòa (theo dòng thông tin)

\`\`\`
DNA → mRNA tiền thân (pre-mRNA) → mRNA trưởng thành → protein → protein hoạt động
 ↑          ↑                       ↑                   ↑           ↑
 1.        2.                      3.                  4.          5.
Chromatin  Phiên mã              Sau phiên mã         Dịch mã    Sau dịch mã
                                 (splicing, miRNA)
\`\`\`

**Cấp 1 — Chromatin (đóng/mở DNA)**: DNA trong nhân quấn quanh histone tạo nucleosome. Nếu chromatin **đặc** (heterochromatin) → DNA ẩn → không phiên mã. Nếu **lỏng** (euchromatin) → DNA lộ ra → phiên mã được. Điều khiển bởi modifications biểu sinh (xem §5).

**Cấp 2 — Phiên mã (transcription factors)**: Yếu tố phiên mã (TF) gắn vào **enhancer** (kích thích) hoặc **silencer** (ức chế) — có thể nằm xa promoter hàng kilobase. Khoảng 5–15 TF gắn đồng thời, "biểu quyết" để quyết định RNA polymerase II có khởi động hay không.

**Cấp 3 — Sau phiên mã**:
- **Alternative splicing** (cắt ghép thay thế): 1 gen có thể tạo nhiều mRNA khác nhau bằng cách ghép các exon theo các tổ hợp khác nhau. Vd gen DSCAM ở ruồi giấm có thể tạo **>38.000 mRNA khác nhau** từ 1 gen.
- **miRNA / siRNA**: RNA nhỏ (~22 nucleotide) bắt cặp với mRNA mục tiêu → cắt mRNA hoặc chặn dịch mã.

**Cấp 4 — Dịch mã**: Các yếu tố khởi đầu eIF có thể bị phosphoryl hóa → tắt dịch mã toàn cục khi tế bào stress. mRNA có cấu trúc 5' và 3' UTR ảnh hưởng tốc độ ribosome bám.

**Cấp 5 — Sau dịch mã**: Protein được sửa đổi (phosphoryl hóa, glycosyl hóa, ubiquitin hóa). Ubiquitin gắn vào protein → đánh dấu cho proteasome phân hủy. Đây là "tắt protein" sau khi nó đã được tổng hợp.

### 4.2. Bốn ví dụ số cụ thể

**Ví dụ 1 — Tỉ lệ DNA ở dạng euchromatin**: Trong tế bào người, chỉ khoảng **30–40%** DNA ở trạng thái mở (euchromatin) có khả năng phiên mã tại một thời điểm. Còn lại đóng kín (heterochromatin) — gồm cả các vùng telomere, centromere và các gen của các loại tế bào khác.

**Ví dụ 2 — Alternative splicing ở người**: ~**95%** gen người có alternative splicing. Trung bình mỗi gen tạo ra **3–4 mRNA** khác nhau. 20.000 gen × 3.5 = **~70.000 protein khác nhau** từ 20.000 gen — đây là cách bộ gen "nhỏ" tạo ra sự đa dạng "lớn".

**Ví dụ 3 — Số TF gắn 1 promoter**: Một promoter eukaryote điển hình có **5–15** TF gắn lên đồng thời. Ví dụ gen β-globin ở người cần ít nhất **6 TF** (GATA-1, NF-E2, KLF1, BCL11A, ...) cùng hoạt động mới phiên mã hiệu quả.

**Ví dụ 4 — Hiệu quả của miRNA**: 1 miRNA có thể nhắm tới **~100–200 mRNA** khác nhau (do chỉ cần ghép 7 nucleotide). Trong genome người có **~2.500 miRNA** → điều khiển biểu hiện của **>60% mọi gen mã hóa protein**.

### ❓ Câu hỏi tự nhiên của người đọc

**Q: Vì sao eukaryote phức tạp hơn prokaryote nhiều thế?**
A: Vì eukaryote là sinh vật **đa bào** với phân hóa tế bào sâu (>200 loại ở người). Cần kiểm soát rất tinh vi để 1 tế bào trong gan không bật gen của tế bào não. Prokaryote đơn bào chỉ cần đáp ứng môi trường tức thời — phức tạp ít hơn.

**Q: Alternative splicing có nghĩa là "1 gen → nhiều protein"?**
A: Đúng. Đây là lý do bộ gen người chỉ có ~20.000 gen mã hóa protein (không nhiều hơn nhiều so với giun tròn C. elegans với ~20.000 gen) mà vẫn tạo được sinh vật phức tạp hơn — splicing biến mỗi gen thành "nhiều phiên bản protein khác nhau".

### ⚠ Lỗi thường gặp

- **Nghĩ điều hòa chỉ ở cấp phiên mã**: Thực tế 5 cấp. Một số gen quan trọng (như cyclin trong chu kỳ tế bào) chủ yếu điều hòa ở **cấp protein** (ubiquitin hóa → phân hủy).
- **Nhầm "exon = protein"**: Exon là đoạn được giữ lại trong mRNA trưởng thành; nhưng các exon ghép khác nhau qua splicing tạo các protein khác nhau. 1 exon không tự = 1 protein.
- **Bỏ qua miRNA**: miRNA là cơ chế điều hòa rất mạnh ở eukaryote, được phát hiện tương đối muộn (1993) nhưng nay được biết kiểm soát phần lớn biểu hiện gen.

### 🔁 Dừng lại tự kiểm tra

1. Cấp điều hòa nào tạo ra sự khác biệt nhanh nhất (giây/phút)? Cấp nào ảnh hưởng dài hạn?
2. Nếu 1 gen có 5 exon, alternative splicing tối đa tạo được bao nhiêu mRNA khác nhau (giả sử mỗi exon có thể giữ hoặc bỏ độc lập)?

<details>
<summary>Đáp án</summary>

1. **Nhanh nhất**: cấp 5 (sau dịch mã) — phosphoryl hóa/dephosphoryl hóa protein xảy ra trong **mili giây đến giây**. **Dài hạn nhất**: cấp 1 (chromatin / biểu sinh) — methylation có thể duy trì qua nhiều thế hệ tế bào, thậm chí thế hệ cơ thể.
2. Với 5 exon, mỗi exon "có/không" → tối đa $2^5 =$ **32** tổ hợp. Trừ trường hợp tất cả đều bỏ (không còn mRNA) → 31. Trên thực tế bị giới hạn bởi các trình tự nhận biết splice site, nên không bao giờ đạt mức tối đa lý thuyết, nhưng vẫn tạo được hàng chục biến thể.
</details>

### 📝 Tóm tắt mục 4

- Eukaryote có **5 cấp điều hòa**: chromatin → phiên mã → sau phiên mã → dịch mã → sau dịch mã.
- Alternative splicing biến ~20.000 gen thành ~70.000 protein; miRNA điều khiển >60% gen.
- Mỗi cấp có thang thời gian riêng: sau dịch mã nhanh nhất, chromatin chậm nhất nhưng bền nhất.

---

## 5. Biểu sinh (Epigenetics) — di truyền không qua DNA

### 💡 Trực giác / Hình dung

Hình dung DNA là **một quyển sách**. Trình tự (sequence) là chữ in. Nhưng người đọc có thể dán **dấu ngăn**, **giấy nhớ**, **tô vàng** lên trang — không thay đổi chữ, nhưng thay đổi cách đọc. Đó là biểu sinh: thay đổi **biểu hiện gen mà không thay đổi trình tự DNA**, và đôi khi di truyền được.

Hai cơ chế biểu sinh chính:

- **Methylation DNA** — gắn nhóm –CH₃ vào C của cytosine (đặc biệt ở vị trí CpG). Methyl hóa cao → tắt gen.
- **Sửa đổi histone** — acetyl hóa (Ac), methyl hóa (Me), phosphoryl hóa histone. Vd acetyl hóa H3 → mở chromatin → bật gen.

### 5.1. Methylation DNA

Enzyme **DNMT** (DNA methyltransferase) gắn –CH₃ vào C5 của cytosine, tạo **5-methylcytosine** (5mC). Vị trí phổ biến: **CpG dinucleotide** (C theo sau bởi G trên cùng mạch).

\`\`\`
Trạng thái 0% methyl: gen biểu hiện bình thường.
Trạng thái 50% methyl ở promoter: gen giảm biểu hiện ~5-10 lần.
Trạng thái >80% methyl: gen TẮT gần như hoàn toàn.
\`\`\`

Cơ chế: 5mC ở promoter → cản trở TF gắn, đồng thời chiêu mộ protein đọc methyl (MeCP2) → kéo về phức hợp deacetylase → đóng chromatin.

### 5.2. Acetylation histone

Histone là 8 protein quấn quanh bởi 147 bp DNA tạo **nucleosome**. Đuôi histone (đặc biệt H3, H4) có thể được:

- **Acetyl hóa** (gắn nhóm acetyl –COCH₃) bởi **HAT** (Histone AcetylTransferase) → trung hòa điện tích dương của lysine → giảm bám DNA → mở chromatin → **BẬT** phiên mã.
- **Deacetyl hóa** (gỡ acetyl) bởi **HDAC** (Histone DeACetylase) → đóng chromatin → **TẮT**.

Đây là lý do thuốc HDAC inhibitor được dùng trong điều trị ung thư — buộc tế bào ung thư bật lại các gen ức chế khối u đã bị tắt sai cách.

### 5.3. Di truyền biểu sinh

Khi tế bào phân chia, các pattern methyl được **DNMT1** "bảo trì" sao chép sang mạch DNA mới → tế bào con kế thừa pattern methyl của tế bào mẹ. Đây là cách tế bào gan sinh ra tế bào gan, không phải tế bào thần kinh — mặc dù DNA giống nhau.

Một số pattern biểu sinh có thể truyền **qua thế hệ** (transgenerational epigenetic inheritance) — vd nghiên cứu nạn đói Hà Lan 1944: con cháu của những người bị đói trong bụng mẹ vẫn mang dấu vết methylation đặc biệt ảnh hưởng chuyển hóa.

### 5.4. Bốn ví dụ số cụ thể

**Ví dụ 1 — Mức methylation ở promoter gen ức chế khối u p16**: Ở tế bào bình thường: ~5% CpG bị methyl → p16 biểu hiện đầy đủ, kiểm soát chu kỳ tế bào. Ở tế bào ung thư phổi: ~75% CpG methyl → p16 TẮT → mất kiểm soát phân chia → ung thư phát triển.

**Ví dụ 2 — Tỉ lệ giảm biểu hiện theo methylation**: Một nghiên cứu cho thấy biểu hiện gen GSTP1 (gen giải độc) giảm theo công thức xấp xỉ: $\\text{Expression} \\approx E_0 \\times e^{-k \\cdot M}$ với M = % methyl. Ở M=0%: 100%. Ở M=25%: ~50%. Ở M=50%: ~25%. Ở M=75%: ~12%.

**Ví dụ 3 — In dấu di truyền (genomic imprinting)**: Khoảng **150 gen** ở người có hiện tượng "in dấu" — chỉ allele từ mẹ HOẶC từ cha được biểu hiện, allele còn lại bị methyl hóa câm. Vd gen IGF2: chỉ allele cha hoạt động. Đột biến/mất gen này gây hội chứng Beckwith-Wiedemann.

**Ví dụ 4 — Sinh đôi giống hệt nhau khác nhau khi già**: Anh chị em sinh đôi cùng trứng có DNA 100% giống nhau lúc sinh ra. Đến 50 tuổi, pattern methyl giữa 2 người có thể khác nhau **20–30%** ở một số vùng, do môi trường, lối sống, stress. Đây là bằng chứng biểu sinh không "cố định".

### ❓ Câu hỏi tự nhiên của người đọc

**Q: Biểu sinh có "thay đổi" DNA không?**
A: **Không thay đổi trình tự** (A, T, G, C giữ nguyên). Chỉ gắn thêm nhóm hóa học (methyl, acetyl) hoặc đổi vị trí histone. Đây là lý do biểu sinh là "trên DNA" (epi- = trên) chứ không phải "trong DNA".

**Q: Sinh đôi cùng trứng giống hệt DNA, sao tính cách khác?**
A: DNA giống → nhưng biểu sinh có thể khác do trải nghiệm sống, dinh dưỡng, môi trường. Đây là một phần lý do "tự nhiên vs nuôi dưỡng" (nature vs nurture) không phải dichotomy đối lập — môi trường tác động qua biểu sinh.

**Q: Có thuốc nào can thiệp biểu sinh không?**
A: Có. **5-azacytidine** (DNMT inhibitor) và **vorinostat** (HDAC inhibitor) là thuốc được FDA chấp thuận cho một số loại ung thư máu — chúng buộc tế bào ung thư bật lại các gen ức chế đã bị tắt sai cách.

### ⚠ Lỗi thường gặp

- **Nghĩ "biểu sinh = đột biến"**: Không. Biểu sinh **không đổi trình tự**; đột biến đổi trình tự. Biểu sinh có thể đảo ngược (dùng enzyme demethylase, HAT), đột biến hầu như không.
- **Methylation = luôn tắt gen**: Không hoàn toàn. Methyl ở promoter → tắt. Methyl trong vùng coding (gene body) đôi khi liên quan tới **biểu hiện cao** (đang còn tranh luận).
- **Coi epigenetics là "Lamarck đúng"**: Lamarck cho rằng "tính cách kiếm được trong đời" di truyền sang con. Biểu sinh **có** di truyền vài thế hệ trong một số trường hợp, nhưng phần lớn được xóa sạch khi tạo giao tử. Không phải "Lamarck đúng hoàn toàn".

### 🔁 Dừng lại tự kiểm tra

1. Vì sao tế bào gan và tế bào thần kinh khác nhau dù DNA giống hệt?
2. Nếu một gen có promoter methyl hóa 60%, biểu hiện gen sẽ ở mức gần đúng bao nhiêu so với trạng thái 0% methyl (dùng công thức ở Ví dụ 2)?

<details>
<summary>Đáp án</summary>

1. Vì pattern biểu sinh (methylation DNA, sửa đổi histone) khác nhau → các gen "tế bào gan" mở ở tế bào gan và đóng ở tế bào thần kinh, ngược lại. Pattern này được thiết lập trong phát triển phôi và duy trì qua phân chia tế bào.
2. Dùng $\\text{Expression} = e^{-k \\cdot M}$. Từ ví dụ: M=25% → 50%, suy ra $k \\approx \\ln(2)/25 \\approx 0{,}0277$. Ở M=60%: $e^{-0{,}0277 \\times 60} = e^{-1{,}66} \\approx 0{,}19$ → biểu hiện ~**19%** mức gốc. (Đây là mô hình đơn giản hóa; thực tế phụ thuộc từng gen.)
</details>

### 📝 Tóm tắt mục 5

- Biểu sinh = thay đổi biểu hiện không đổi trình tự DNA.
- **Methyl hóa DNA** ở promoter → tắt gen; **acetyl hóa histone** → mở chromatin → bật gen.
- Pattern biểu sinh **được di truyền** qua phân chia tế bào (giữ tế bào phân hóa), ít qua thế hệ cơ thể.
- Bị môi trường ảnh hưởng → giải thích sinh đôi cùng trứng khác nhau khi già.

---

## 6. Bài tập + Lời giải chi tiết

### Bài tập

**Bài 1**: Hoàn thành bảng trạng thái phiên mã operon Lac cho 4 tổ hợp môi trường:

| # | Lactose | Glucose | Phiên mã |
|---|:-------:|:-------:|----------|
| a | Không | Không | ? |
| b | Không | Có | ? |
| c | Có | Không | ? |
| d | Có | Có | ? |

Giải thích cơ chế cho mỗi trường hợp (trạng thái LacI, CAP, RNA polymerase).

**Bài 2**: Một chủng E. coli đột biến **mất chức năng operator** (operator bị xóa). Phiên mã operon Lac sẽ thế nào trong 4 môi trường ở Bài 1? Vì sao?

**Bài 3**: So sánh operon Lac và operon Trp về (a) mặc định, (b) tín hiệu môi trường, (c) cơ chế tín hiệu tác động lên repressor, (d) loại chuyển hóa (dị hóa/đồng hóa). Vì sao 2 operon "ngược nhau" như vậy lại hợp lý sinh học?

**Bài 4**: Một promoter của gen X ở người được methyl hóa theo thời gian: lúc 20 tuổi M=10%, lúc 50 tuổi M=40%, lúc 80 tuổi M=70%. Dùng công thức $\\text{Expression} = e^{-0{,}0277 \\cdot M}$, tính mức biểu hiện gen X ở mỗi độ tuổi (so với M=0%). Hiện tượng này có ý nghĩa gì với lão hóa?

**Bài 5**: Bộ gen của một sinh vật giả định có 25.000 gen. Trong tế bào loại A, có 12.000 gen biểu hiện; trong tế bào loại B có 14.000 gen biểu hiện. Có 8.000 gen biểu hiện ở cả 2 loại tế bào. Tính: (a) số gen chỉ biểu hiện ở A, (b) chỉ ở B, (c) không biểu hiện ở cả hai. Vì sao có thể có "gen không biểu hiện ở bất kỳ tế bào nào" trong sinh vật này?

**Bài 6**: Trong sinh vật eukaryote, một gen có 4 exon (đánh số 1, 2, 3, 4). Cho biết các quy tắc splicing: exon 1 và 4 luôn được giữ; exon 2 và 3 có thể giữ hoặc bỏ độc lập. Tính số mRNA khác nhau có thể tạo ra. Liệt kê các tổ hợp.

### Lời giải

**Bài 1**:

| # | Lactose | Glucose | Phiên mã | Cơ chế |
|---|:-------:|:-------:|----------|--------|
| a | Không | Không | **TẮT** | LacI gắn operator (chặn). Dù cAMP cao và CAP hoạt động, không có gì để phiên mã. |
| b | Không | Có | **TẮT** | LacI gắn operator. cAMP thấp, CAP không hoạt động. Khóa kép. |
| c | Có | Không | **BẬT MẠNH** | Allolactose gỡ LacI; cAMP cao → CAP–cAMP hỗ trợ RNA pol. Trường hợp lý tưởng. |
| d | Có | Có | **BẬT YẾU** (~5–10% max) | LacI bị gỡ, NHƯNG cAMP thấp → CAP không hỗ trợ → polymerase bám yếu. Vi khuẩn ưu tiên glucose. |

**Bài 2**: Operator bị xóa → LacI **không có chỗ gắn** → không bao giờ chặn được phiên mã. Hệ quả:

| # | Lactose | Glucose | Phiên mã | Giải thích |
|---|:-------:|:-------:|----------|------------|
| a | Không | Không | **BẬT MẠNH** | Không có operator → không bị chặn; cAMP cao → CAP hỗ trợ. |
| b | Không | Có | **BẬT YẾU** | Không bị chặn; nhưng CAP không hoạt động (glucose). |
| c | Có | Không | **BẬT MẠNH** | Như a. |
| d | Có | Có | **BẬT YẾU** | Như b. |

Chủng này phiên mã liên tục — gọi là **constitutive expression**. Lãng phí năng lượng → thua thiệt trong cạnh tranh sinh trưởng. Trong thí nghiệm, đây là chủng giúp Jacob & Monod chứng minh sự tồn tại của operator như một "vị trí gắn cụ thể".

**Bài 3**:

| Tiêu chí | Lac | Trp |
|----------|-----|-----|
| Mặc định | TẮT | BẬT |
| Tín hiệu môi trường | Lactose (cơ chất) | Tryptophan (sản phẩm) |
| Tín hiệu tác động lên repressor | **Gỡ** LacI (allolactose làm LacI bất hoạt) | **Hoạt hóa** TrpR (Trp là corepressor) |
| Loại chuyển hóa | Dị hóa (catabolic — phân giải lactose) | Đồng hóa (anabolic — tổng hợp Trp) |

**Vì sao hợp lý?**

- **Dị hóa**: chỉ cần khi có cơ chất. Mặc định tắt → tiết kiệm. Có cơ chất → bật để tận dụng → **inducible**.
- **Đồng hóa**: chỉ cần khi thiếu sản phẩm. Mặc định bật → đảm bảo sản phẩm luôn có. Đủ sản phẩm → tắt → không phí năng lượng → **repressible**.

Logic chung: tế bào không bao giờ làm việc thừa. Hai loại operon ngược nhau vì hai bài toán ngược nhau (input-driven vs output-driven).

**Bài 4**:

Dùng $\\text{Expression} = e^{-0{,}0277 \\cdot M}$:

| Tuổi | M | Expression |
|------|---|------------|
| 20 | 10% | $e^{-0{,}277} \\approx$ **75,8%** |
| 50 | 40% | $e^{-1{,}108} \\approx$ **33,0%** |
| 80 | 70% | $e^{-1{,}939} \\approx$ **14,4%** |

Ý nghĩa: nhiều gen "ổn định" ở tuổi trẻ bị methyl hóa dần theo thời gian → biểu hiện giảm → đóng góp vào quá trình lão hóa. Đặc biệt nguy hiểm khi gen bị tắt là gen ức chế khối u (như p16) → tăng nguy cơ ung thư theo tuổi. Đây là một trong các cơ chế của **đồng hồ biểu sinh (epigenetic clock)** — có thể dự đoán tuổi sinh học từ pattern methyl.

**Bài 5**:

- Gen biểu hiện ở A nhưng không ở B = 12.000 − 8.000 = **4.000**.
- Gen biểu hiện ở B nhưng không ở A = 14.000 − 8.000 = **6.000**.
- Gen biểu hiện ở ít nhất 1 trong 2 loại = 8.000 + 4.000 + 6.000 = 18.000.
- Gen không biểu hiện ở cả hai = 25.000 − 18.000 = **7.000**.

**Vì sao có gen "không biểu hiện ở tế bào nào"?**
- Có thể chỉ biểu hiện ở loại tế bào C, D, E... không khảo sát.
- Có thể chỉ biểu hiện ở giai đoạn phát triển khác (vd phôi thai).
- Có thể là **pseudogene** (giả gen) — gen bị bất hoạt do đột biến trong tiến hóa nhưng còn trong genome.
- Có thể chỉ biểu hiện trong điều kiện môi trường đặc biệt (stress, bệnh).

**Bài 6**: Exon 1, 4 cố định. Exon 2 có 2 lựa chọn (giữ/bỏ), exon 3 có 2 lựa chọn → tổng = 2 × 2 = **4 mRNA khác nhau**.

| # | Tổ hợp | mRNA |
|---|--------|------|
| 1 | Giữ 2, giữ 3 | E1–E2–E3–E4 |
| 2 | Giữ 2, bỏ 3 | E1–E2–E4 |
| 3 | Bỏ 2, giữ 3 | E1–E3–E4 |
| 4 | Bỏ 2, bỏ 3 | E1–E4 |

Mỗi mRNA dịch thành 1 protein khác nhau → 1 gen tạo 4 protein. Tổng quát: gen có k exon thay đổi được → tối đa $2^k$ tổ hợp (trong điều kiện không có ràng buộc khác).

---

## 7. Liên kết và bài tiếp theo

- **Tiền đề (cần biết trước)**:
  - [Lesson 03 — Phiên mã & dịch mã](../lesson-03-transcription-translation/) — biết promoter, RNA polymerase, codon là gì.
  - [Lesson 02 — Nhân đôi DNA](../lesson-02-dna-replication/) — cấu trúc DNA mạch kép.
  - [Lesson 01 — Phân tử sinh học](../../01-Molecules-Cells/lesson-01-biomolecules/) — protein, DNA cấu trúc.
- **Bài tiếp theo**: [Lesson 05 — Đột biến & công nghệ gen](../lesson-05-mutation-biotech/) — khi điều hòa lỗi (đột biến), hậu quả là gì; và con người dùng công nghệ gen để can thiệp ra sao.
- **Liên kết tới các lĩnh vực khác**:
  - Lý thuyết hệ thống ổn định nhờ feedback — gặp lại ở \`Economics/\` (cung-cầu) và \`Physics/\` (điều khiển).
  - Thuốc HDAC inhibitor → liên quan tới \`Chemistry/\` (small molecule drugs).

---

## 📝 Tổng kết Lesson 04

1. **Vì sao điều hòa gen?** Mọi tế bào trong cơ thể có cùng DNA nhưng làm việc khác nhau hoàn toàn. Tiết kiệm năng lượng + đáp ứng môi trường + phân hóa tế bào.
2. **Operon Lac (cảm ứng âm)**: mặc định TẮT. Không lactose → LacI chặn. Có lactose → allolactose gỡ LacI → BẬT. CAP–cAMP hỗ trợ thêm khi không có glucose. Chỉ trường hợp (lactose có, glucose không) cho BẬT mạnh.
3. **Operon Trp (kìm hãm)**: mặc định BẬT. Có Trp dư → corepressor → TrpR active → chặn. Mẹo: **dị hóa → cảm ứng**; **đồng hóa → kìm hãm**.
4. **Eukaryote có 5 cấp điều hòa**: chromatin → phiên mã → sau phiên mã (splicing, miRNA) → dịch mã → sau dịch mã. Alternative splicing biến ~20.000 gen thành ~70.000 protein.
5. **Biểu sinh**: methyl hóa DNA (tắt gen), acetyl hóa histone (bật gen). Pattern di truyền qua phân chia tế bào → giữ tế bào phân hóa. Bị môi trường tác động → giải thích sinh đôi cùng trứng khác nhau khi già.
6. **Khi điều hòa lỗi** → ung thư, bệnh chuyển hóa — chủ đề Lesson 05 và các bài bệnh học.

**Tiếp theo**: [Lesson 05 — Đột biến & công nghệ gen](../lesson-05-mutation-biotech/).
`;
