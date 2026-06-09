// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: Biology/02-Genetics-Evolution/lesson-05-mutation-biotech/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 05 — Đột biến & công nghệ gen

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Hiểu **đột biến (mutation)** là gì, vì sao nó là *nguồn nguyên liệu* cho tiến hóa, và những nguyên nhân chính (lỗi nhân đôi, UV, hóa chất, virus).
- Phân biệt **4 loại đột biến điểm (point mutation)**: silent, missense, nonsense, frameshift — biết hậu quả của từng loại trên protein.
- Phân loại **đột biến nhiễm sắc thể (chromosomal mutation)** (mất, lặp, đảo, chuyển đoạn) và **đột biến số lượng** (dị bội, đa bội).
- Mô tả **PCR (Polymerase Chain Reaction)**: 3 bước/chu kỳ, vai trò của Taq polymerase, công thức nhân lên 2ⁿ.
- Mô tả **CRISPR-Cas9**: vai trò guide RNA, cơ chế cắt, sửa lỗi NHEJ vs HDR.
- Tính được **số bản sao DNA sau n chu kỳ PCR**, dự đoán **kiểu đột biến** từ thay đổi nucleotide cụ thể trên mRNA.

## Kiến thức tiền đề

- [Lesson 02 — Nhân đôi DNA](../lesson-02-dna-replication/) — DNA polymerase, độ chính xác và tỉ lệ lỗi (cơ sở để hiểu đột biến xảy ra ở đâu).
- [Lesson 03 — Phiên mã & dịch mã](../lesson-03-transcription-translation/) — bảng mã di truyền (codon → amino acid), khái niệm STOP codon (UAA/UAG/UGA), mã thoái hóa.
- [Lesson 01 — Phân tử sinh học (Tầng 1)](../../01-Molecules-Cells/lesson-01-biomolecules/) — nucleotide, base nitơ, ví dụ hồng cầu hình liềm (sẽ gặp lại ở đây).

---

## 1. Đột biến là gì và vì sao quan trọng?

### 💡 Trực giác / Hình dung

Hãy hình dung **bộ gen như một cuốn sách** dày 3 tỉ ký tự (chữ A, T, G, C). Đột biến là những **lỗi chính tả** xảy ra khi sao chép cuốn sách. Phần lớn lỗi vô hại (im lặng) hoặc xấu (làm hỏng câu); nhưng đôi khi một lỗi tạo ra **câu hay hơn câu gốc** — và đó chính là nguyên liệu để tiến hóa lựa chọn. Không có lỗi chính tả → không có biến dị → không có tiến hóa.

### 1.1. Định nghĩa hình thức

**Đột biến (mutation)** là *bất kỳ thay đổi nào trong trình tự nucleotide của DNA* — từ 1 bp đến cả nhiễm sắc thể, có thể di truyền (xảy ra ở tế bào sinh dục) hoặc soma (chỉ ảnh hưởng cá thể, vd ung thư).

Ba phần quan trọng của định nghĩa:

- **(a) Là gì**: đột biến đo "lỗi/thay đổi" trong chuỗi DNA — đơn vị có thể là 1 nucleotide, vài chục nucleotide, hay cả NST.
- **(b) Vì sao tồn tại**: không có biến dị → không có nguyên liệu cho chọn lọc tự nhiên → không có tiến hóa. Đột biến **không có mục đích** — nó ngẫu nhiên; chính chọn lọc mới "có hướng".
- **(c) Ví dụ trực giác**: DNA polymerase ở người sai ~1 lần trong 10⁹ bp. Bộ gen người dài ~3×10⁹ bp → mỗi lần nhân đôi tế bào trung bình tạo ra **~3 đột biến mới**. Một đời người ~10¹⁶ lần chia tế bào tổng cộng → hàng triệu tỉ "thử nghiệm" tiềm năng.

### 1.2. Nguyên nhân chính

| Nguyên nhân | Cơ chế | Tần suất tương đối |
|---|---|---|
| Lỗi nhân đôi tự phát | DNA polymerase bắt cặp sai, không kịp sửa | Rất hiếm (~10⁻⁹/bp/lần nhân đôi sau proofreading) |
| Tia UV | Tạo dimer thymine (T-T) → block sao chép → lỗi khi sửa | Cao ở da phơi nắng |
| Tia X, γ | Phá vỡ liên kết phosphodiester → đứt mạch | Cao ở môi trường phóng xạ |
| Chất gây đột biến hóa học (mutagen) | Vd benzopyren (khói thuốc), 5-bromouracil (giả T) | Phụ thuộc tiếp xúc |
| Virus chèn DNA | Vd retrovirus → chèn vào gen → phá hoặc kích hoạt sai | Trung bình |

### ❓ Câu hỏi tự nhiên của người đọc

**Q: Nếu DNA polymerase đã rất chính xác (~10⁻⁹), vì sao vẫn có đột biến nhiều?**
A: Vì cơ thể có ~3×10⁹ bp × ~10¹⁶ lần chia tế bào trong đời = ~3×10²⁵ lần "cơ hội sai". Dù xác suất mỗi vị trí thấp, tổng số sự kiện khổng lồ → đột biến không hề hiếm khi xét trên toàn cơ thể.

**Q: Đột biến có "tốt" hay "xấu"?**
A: Đột biến *ngẫu nhiên*, không có nhãn tốt/xấu. Đa số trung tính (vùng không mã hóa, hoặc silent). Một phần nhỏ có hại (gây bệnh). Cực kỳ hiếm có lợi — nhưng đủ để qua hàng triệu năm tích lũy thành tiến hóa.

### ⚠ Lỗi thường gặp

- **Nghĩ "đột biến luôn có hại"**: sai. Phần lớn là **trung tính** (neutral) — không ảnh hưởng kiểu hình. Có lợi/hại chỉ là thiểu số.
- **Nhầm "đột biến" với "biến dị tổ hợp"**: đột biến *tạo allele mới*; biến dị tổ hợp *tổ hợp lại allele cũ* qua giảm phân + thụ tinh (học ở L1 Mendel).
- **Nghĩ đột biến soma di truyền cho con**: chỉ đột biến ở tế bào sinh dục (germ line) mới truyền cho thế hệ sau. Đột biến soma chỉ ảnh hưởng cá thể (vd nguyên nhân ung thư).

### 🔁 Dừng lại tự kiểm tra

1. Vì sao tia UV gây ung thư da nhưng không gây đột biến di truyền cho con?
2. DNA polymerase sai 1/10⁹ bp. Sau 1 lần nhân đôi bộ gen người (3×10⁹ bp), trung bình bao nhiêu đột biến mới được tạo ra?

<details>
<summary>Đáp án</summary>

1. UV chỉ thâm nhập lớp ngoài da → ảnh hưởng tế bào soma (da), không tới được tế bào sinh dục ở tinh hoàn/buồng trứng. Đột biến soma chỉ truyền cho các tế bào con trong cùng cá thể (gây ung thư cục bộ), không truyền cho thế hệ sau.
2. 3×10⁹ × 10⁻⁹ = **3 đột biến mới** trung bình mỗi lần nhân đôi.
</details>

### 📝 Tóm tắt mục 1

- Đột biến = thay đổi trình tự DNA; là **nguồn nguyên liệu** duy nhất cho tiến hóa.
- Nguyên nhân: lỗi nhân đôi tự phát + tác nhân vật lý (UV, X) + hóa học + virus.
- Đột biến ngẫu nhiên, không có mục đích; đa số trung tính, hiếm có lợi.
- Chỉ đột biến germ line mới di truyền cho con.

---

## 2. Đột biến điểm — 4 loại trên mRNA

### 💡 Trực giác / Hình dung

Mã di truyền giống một câu tiếng Việt được đọc **3 chữ một** (codon). Thay 1 chữ giữa câu có thể (a) câu giữ nguyên nghĩa (silent), (b) đổi 1 từ thành từ khác (missense), (c) thành dấu chấm hết câu (nonsense), hoặc — nếu *thêm/bớt* 1 chữ chứ không *thay* — (d) toàn bộ câu phía sau bị đọc lệch nhịp 3 chữ → vô nghĩa hoàn toàn (frameshift).

### 2.1. Codon refresher (nhắc lại từ Lesson 03)

mRNA đọc 3 nucleotide một lần thành 1 codon → tra bảng mã → ra 1 amino acid. Có **64 codon** mã hóa **20 amino acid** (mã thoái hóa — degenerate code): nhiều codon có thể cùng mã 1 amino acid. **3 codon STOP**: UAA, UAG, UGA.

Ví dụ:

- UAU, UAC → Tyrosine (Tyr).
- UUU, UUC → Phenylalanine (Phe).
- UCU, UCC, UCA, UCG → Serine (Ser).

### 2.2. Đột biến THAY THẾ (substitution) — đổi đúng 1 nucleotide

Đoạn mRNA gốc: \`AUG-UAU-GGG-UAA\` (Met-Tyr-Gly-STOP).

#### (a) Silent (im lặng): codon mới cùng mã 1 amino acid

\`UAU → UAC\`: vẫn là Tyr → protein không đổi → **vô hại**. Do mã thoái hóa, đa số thay thế ở vị trí thứ 3 của codon là silent.

#### (b) Missense (nhầm nghĩa): đổi sang amino acid khác

\`UAU → UCU\`: Tyr → Ser → protein đổi 1 vị trí. Hậu quả tùy thuộc:

- Nếu amino acid mới có tính chất tương tự (vd Tyr→Phe, cả hai đều thơm, kỵ nước) → protein vẫn hoạt động.
- Nếu khác xa (vd Glu acid → Val kỵ nước) → có thể phá chức năng.

**Ví dụ kinh điển — hồng cầu hình liềm (sickle cell anemia)**: ở gen β-globin (mã hóa 1 chuỗi của hemoglobin), codon 6 \`GAG\` (Glu) bị thay thành \`GUG\` (Val). Một amino acid duy nhất đổi từ ưa nước sang kỵ nước → hemoglobin kết tụ lại khi thiếu oxy → hồng cầu biến dạng thành hình liềm → tắc mạch.

#### (c) Nonsense (vô nghĩa): tạo ra STOP codon sớm

\`UAU → UAA\`: Tyr → STOP → ribosome dừng sớm → protein **bị cụt** → thường mất hoàn toàn chức năng. Tệ hơn missense nhiều.

### 2.3. Đột biến FRAMESHIFT — thêm/mất nucleotide

Trình tự gốc: \`AUG-UUU-GGG-CAU-AAA\` (Met-Phe-Gly-His-Lys).

**Mất 1 nucleotide** (vd mất U thứ 4): \`AUG-UUG-GGC-AUA-AA?\` → Met-**Leu-Gly-Ile-...** → toàn bộ codon từ điểm đột biến trở đi đọc lệch khung → chuỗi amino acid hoàn toàn khác, thường vô chức năng.

**Thêm 1 nucleotide** cũng tương tự (dịch khung +1).

**Quy luật vàng**: thêm/mất **bội số của 3** (3, 6, 9...) **không** gây dịch khung — chỉ thêm/bớt vài amino acid. Vẫn có thể có hại nhưng đỡ hơn frameshift.

Frameshift thường gây hậu quả nghiêm trọng hơn substitution vì ảnh hưởng cả phần sau của protein.

### 2.4. Bốn ví dụ số cụ thể (cùng codon gốc UAU = Tyr)

| Đột biến | Codon mới | Amino acid mới | Loại |
|---|---|---|---|
| UAU → UAC | UAC | Tyr (vẫn) | **silent** |
| UAU → UCU | UCU | Ser | **missense** |
| UAU → UAA | UAA | STOP | **nonsense** |
| UAU → UA (mất U) → khung lệch | (cả phần sau đọc lại) | chuỗi mới hoàn toàn | **frameshift** |

### 2.5. Số kiểu thay thế khả dĩ tại 1 vị trí

Ở mỗi vị trí có 4 nucleotide (A, U, G, C). Đột biến thay thế đổi sang 1 trong **3 nucleotide còn lại** → có đúng **3 kiểu** thay thế khả dĩ.

Ví dụ với codon UAU vị trí 3 (U cuối):

- U → A: UAU → UAA = STOP (nonsense).
- U → G: UAU → UAG = STOP (nonsense).
- U → C: UAU → UAC = Tyr (silent).

Vậy ở vị trí này, 2/3 đột biến là nonsense, 1/3 là silent — không có missense vì cả 4 codon dạng UAx đều mã Tyr hoặc STOP.

### ❓ Câu hỏi tự nhiên của người đọc

**Q: Vì sao silent mutation gọi là "im lặng" mà vẫn có thể có tác động?**
A: Đa số silent thực sự vô hại, nhưng có ngoại lệ: (1) đột biến vùng ranh giới intron-exon có thể làm sai cắt nối (splicing); (2) đột biến đổi codon hiếm thành codon thường xuyên có thể đổi tốc độ dịch mã, ảnh hưởng gấp protein. Học sâu hơn ở Tầng 3.

**Q: Frameshift luôn xấu sao?**
A: Gần như luôn xấu *cho cá thể đó*. Nhưng đôi khi tạo ra protein hoàn toàn mới — và rất hiếm là protein mới đó có chức năng có lợi → bị chọn lọc giữ lại → tiến hóa. Đây là cách những gene "mới hoàn toàn" hiếm hoi xuất hiện.

### ⚠ Lỗi thường gặp

- **Cho silent = "không đột biến"**: silent vẫn là đột biến — DNA đã thay đổi; chỉ là protein không đổi.
- **Quên mã thoái hóa**: nhiều người tính bừa "đổi 1 nucleotide chắc chắn đổi 1 amino acid" → bỏ qua silent. Phải tra bảng codon.
- **Nhầm nonsense với "tạo codon vô nghĩa"**: nonsense = tạo STOP codon. Codon STOP có ý nghĩa (kết thúc dịch mã); tên "nonsense" lịch sử là vì nó không mã hóa amino acid nào.
- **Cho frameshift luôn cần thêm/mất 1 bp**: cứ thêm/mất số bp **không chia hết cho 3** đều gây frameshift (1, 2, 4, 5, 7...).

### 🔁 Dừng lại tự kiểm tra

1. Codon \`UUC\` (Phe). Liệt kê tất cả thay thế ở vị trí thứ 3 và phân loại. Tra bảng: UUU=Phe, UUA=Leu, UUG=Leu.
2. Đoạn mRNA \`AUG-AAA-GGG-UAA\` mã hóa Met-Lys-Gly-STOP. Nếu **thêm 1 G** ngay sau AUG, viết lại trình tự dịch khung và xác định loại đột biến.

<details>
<summary>Đáp án</summary>

1. Vị trí 3 của UUC có thể đổi sang U, A, G:
   - UUC → UUU: Phe → Phe = **silent**.
   - UUC → UUA: Phe → Leu = **missense**.
   - UUC → UUG: Phe → Leu = **missense**.
   Không có nonsense ở vị trí này (không có codon STOP dạng UU?).

2. Thêm 1 G sau AUG: \`AUG-GAA-AGG-GUA-A...\` → Met-Glu-Arg-Val-... Toàn bộ codon sau AUG đọc lệch khung, không còn STOP đúng chỗ → **frameshift** (insertion 1 nt). Phần phía sau là chuỗi amino acid hoàn toàn khác, thường mất chức năng.
</details>

### 📝 Tóm tắt mục 2

- 4 loại đột biến điểm: silent (vô hại), missense (đổi 1 amino acid), nonsense (cụt protein), frameshift (lệch khung từ điểm đột biến).
- Mã thoái hóa khiến nhiều thay thế ở vị trí 3 của codon là silent.
- Hồng cầu hình liềm = missense GAG→GUG (Glu→Val) ở β-globin.
- Frameshift = thêm/mất nucleotide không bội số của 3; thường nghiêm trọng nhất.

---

## 3. Đột biến nhiễm sắc thể

### 💡 Trực giác / Hình dung

Nếu đột biến điểm là "lỗi chính tả 1 chữ", **đột biến nhiễm sắc thể (chromosomal mutation)** là **lỗi biên tập cả đoạn văn**: cắt mất 1 đoạn, photocopy thêm 1 đoạn, đảo ngược 1 đoạn, hay dán đoạn từ chương khác sang. Hậu quả thường rộng hơn vì ảnh hưởng nhiều gene cùng lúc.

### 3.1. Bốn kiểu đột biến cấu trúc

Cho NST gốc với 6 gene \`A-B-C-D-E-F\`:

| Kiểu | Ký hiệu sau đột biến | Cơ chế |
|---|---|---|
| **Mất đoạn (deletion)** | A-B-D-E-F (mất C) | Đoạn NST bị mất khi sửa lỗi DSB (double-strand break) |
| **Lặp đoạn (duplication)** | A-B-C-C-D-E-F | Một đoạn được copy thêm lần nữa |
| **Đảo đoạn (inversion)** | A-B-**E-D-C**-F | Một đoạn quay 180° rồi nối lại |
| **Chuyển đoạn (translocation)** | A-B-C-**X-Y** (đoạn D-E-F sang NST khác) | Trao đổi đoạn giữa các NST không tương đồng |

### 3.2. Đột biến số lượng NST (đa bội & dị bội)

- **Thể đa bội (polyploidy)**: cả bộ NST tăng theo bội. Ví dụ lúa mì hexaploid (6n). Phổ biến ở thực vật, hiếm ở động vật. Lúa, chuối, dưa hấu không hạt nhiều giống là đa bội nhân tạo.
- **Thể dị bội (aneuploidy)**: thiếu/thừa 1 NST riêng lẻ. Nguyên nhân chính: **không phân ly (nondisjunction)** trong giảm phân — 2 NST tương đồng/chromatid chị em không tách đúng → 1 giao tử thừa 1 NST, 1 giao tử thiếu.

### 3.3. Ví dụ thực tế

| Bệnh | Đột biến | Hệ quả |
|---|---|---|
| Hội chứng Down | Trisomy 21 (3 bản NST 21) | Chậm phát triển trí tuệ, đặc điểm khuôn mặt riêng |
| Hội chứng Edwards | Trisomy 18 | Tỉ lệ sống sót thấp |
| Hội chứng Turner | Monosomy X (45,X) | Phụ nữ thấp, vô sinh |
| Hội chứng Klinefelter | XXY (47,XXY) | Nam giới, thường vô sinh |
| Bệnh bạch cầu mãn dòng tủy (CML) | Chuyển đoạn t(9;22) → NST Philadelphia | Tạo gene lai BCR-ABL gây ung thư máu |

### 3.4. Bốn ví dụ số cụ thể

- **Người bình thường**: 2n = 46 NST (23 cặp).
- **Down**: 47 NST (cặp 21 có 3 NST).
- **Turner**: 45 NST (chỉ 1 NST X, không Y).
- **Lúa mì bread wheat**: 6n = 42 NST (3 bộ × 14 NST).

### ❓ Câu hỏi tự nhiên của người đọc

**Q: Vì sao đa bội phổ biến ở thực vật mà hiếm ở động vật?**
A: Thực vật thường có thể tự thụ phấn, không cần ghép cặp NST đúng để sinh sản → đa bội vẫn sinh sản được. Động vật có giới tính phụ thuộc cặp NST giới (XX/XY) → đa bội thường gây rối loạn xác định giới tính và phát triển phôi.

**Q: Vì sao trisomy 21 (Down) sống được mà nhiều trisomy khác không?**
A: NST 21 là NST **nhỏ nhất** ở người, chứa ít gene → mất cân bằng liều gene nhẹ hơn so với các NST lớn. Đa số trisomy của các NST lớn (vd 1, 2) gây chết phôi sớm.

### ⚠ Lỗi thường gặp

- **Cho đột biến NST = đột biến lớn hơn đột biến điểm về *số bp***: đúng về kích thước, nhưng quan trọng hơn là đột biến NST **ảnh hưởng nhiều gene cùng lúc** → mất cân bằng liều gene (gene dosage).
- **Nhầm đảo đoạn = mất gene**: đảo đoạn **giữ nguyên tất cả gene**, chỉ đổi thứ tự + chiều đọc. Có thể vô hại nếu không cắt giữa gene.
- **Đếm sai NST trong trisomy**: 47, không phải 46+1=47 "cặp". Là 22 cặp bình thường + 1 bộ 3 (NST 21).

### 🔁 Dừng lại tự kiểm tra

1. Một người có 45 NST với karyotype 45,X. Đây là dạng đột biến gì? Tên hội chứng?
2. NST gốc \`A-B-C-D-E\`. Sau đột biến: \`A-B-D-C-E\`. Đây là kiểu đột biến nào?

<details>
<summary>Đáp án</summary>

1. **Đột biến số lượng — monosomy X**. Hội chứng **Turner**. Người này có 1 NST X duy nhất, không có NST giới tính thứ hai (không X thứ hai, cũng không Y).
2. **Đảo đoạn (inversion)** của đoạn C-D → D-C. Tất cả gene vẫn còn, chỉ đoạn giữa quay 180°.
</details>

### 📝 Tóm tắt mục 3

- Đột biến cấu trúc NST: mất đoạn, lặp đoạn, đảo đoạn, chuyển đoạn — ảnh hưởng nhiều gene cùng lúc.
- Đột biến số lượng: đa bội (cả bộ tăng bội) và dị bội (thừa/thiếu 1 NST do nondisjunction).
- Trisomy 21 = hội chứng Down; monosomy X = Turner; t(9;22) = CML.

---

## 4. PCR — khuếch đại DNA hàng tỉ lần

### 💡 Trực giác / Hình dung

PCR (Polymerase Chain Reaction) giống một **máy photocopy DNA tự động**. Bỏ 1 đoạn DNA vào, sau ~2 giờ máy in cho bạn **hàng tỉ bản sao** của riêng đoạn đó. Nhờ vậy mới có xét nghiệm DNA pháp y, chẩn đoán COVID, kiểm tra ADN cha-con từ 1 sợi tóc.

### 4.1. Định nghĩa và ý nghĩa

**PCR** (Kary Mullis phát minh 1983, Nobel Hóa học 1993) là kỹ thuật **khuếch đại (amplify)** 1 đoạn DNA cụ thể *in vitro* (trong ống nghiệm) — không cần tế bào sống.

Ba phần của định nghĩa:

- **(a) Là gì**: phản ứng dây chuyền dùng enzyme polymerase và nhiệt độ để tự nhân đoạn DNA đích nhiều lần liên tiếp.
- **(b) Vì sao tồn tại**: nhiều ứng dụng cần lượng DNA lớn để phân tích, nhưng mẫu thực tế thường cực ít (1 sợi tóc, 1 giọt máu khô). PCR giải bài toán "không đủ DNA".
- **(c) Ví dụ trực giác**: từ 1 phân tử DNA, sau 30 chu kỳ PCR → $2^{30} \\approx 10^9$ bản sao = ~1 nanogram DNA, đủ để chạy điện di hoặc giải trình tự.

### 4.2. Ba bước của 1 chu kỳ PCR

Mỗi chu kỳ ~2-3 phút, gồm 3 bước:

| Bước | Nhiệt độ | Mục đích |
|---|---|---|
| **1. Biến tính (denature)** | ~95°C | Phá liên kết hydrogen → 2 mạch DNA tách ra thành 2 mạch đơn |
| **2. Gắn mồi (anneal)** | ~50-60°C | 2 đoạn **mồi (primer)** ngắn (~20 nt) bắt cặp với 2 đầu vùng đích |
| **3. Kéo dài (extend)** | ~72°C | **Taq polymerase** kéo dài mồi, tổng hợp mạch bổ sung |

**Taq polymerase** là enzyme polymerase chịu nhiệt, lấy từ vi khuẩn **Thermus aquaticus** sống ở suối nước nóng. Đây là chìa khóa làm PCR khả thi: bước biến tính 95°C sẽ phá hủy polymerase thường, nhưng Taq chịu được → không cần thêm enzyme mới mỗi chu kỳ.

### 4.3. Khuếch đại theo cấp số nhân

Mỗi chu kỳ **gấp đôi** số bản sao. Sau **n chu kỳ** từ 1 phân tử ban đầu → $2^n$ bản sao (giả định hiệu suất 100%).

### 4.4. Bốn ví dụ số cụ thể

| Số chu kỳ n | 2ⁿ bản sao | Ghi chú |
|---|---|---|
| 10 | 2¹⁰ = **1,024** (~10³) | Đủ cho điện di nếu bắt đầu từ nhiều phân tử |
| 20 | 2²⁰ = **1,048,576** (~10⁶) | ~1 triệu bản sao |
| 30 | 2³⁰ ≈ **1,073,741,824** (~10⁹) | ~1 tỉ bản sao — chuẩn cho phân tích |
| 35 | 2³⁵ ≈ **3.4×10¹⁰** | Gần ngưỡng plateau (cạn dNTP, mồi) |

**Bài toán ngược**: cần 1 triệu bản sao từ 1 phân tử → cần ít nhất $\\log_2(10^6) \\approx 20$ **chu kỳ**.

Trong thực tế, hiệu suất ~80-95%/chu kỳ chứ không 100% → công thức chính xác hơn: $N = N_0 \\times (1 + E)^n$, với E là hiệu suất khuếch đại.

### 4.5. Ứng dụng

- **Pháp y / DNA fingerprinting**: khuếch đại STR (short tandem repeat) để xác định cá thể.
- **Chẩn đoán bệnh truyền nhiễm**: phát hiện virus (HIV, SARS-CoV-2) qua RT-PCR (real-time PCR, có thêm bước phiên mã ngược cho RNA virus).
- **Xét nghiệm di truyền trước sinh**: phát hiện đột biến từ vài tế bào.
- **Nhân bản gene** trước khi đưa vào vector biểu hiện.

### ❓ Câu hỏi tự nhiên của người đọc

**Q: Vì sao cần *2* mồi, không phải 1?**
A: Vì DNA có 2 mạch chạy ngược chiều (antiparallel). Mỗi mồi gắn vào 1 mạch và xác định 1 đầu của vùng cần khuếch đại. 2 mồi xác định 2 đầu → chỉ vùng *giữa 2 mồi* được khuếch đại theo cấp số nhân. Đây là cách PCR "nhắm" chính xác vào đoạn đích thay vì cả bộ gen.

**Q: Vì sao không khuếch đại được vô hạn?**
A: Sau ~30-35 chu kỳ, các thành phần (dNTP, mồi, enzyme) cạn dần và sản phẩm bắt đầu cạnh tranh — gọi là **plateau**. Đường cong khuếch đại không còn exponential mà bão hòa.

### ⚠ Lỗi thường gặp

- **Quên hiệu suất**: trong các bài toán thực, hiệu suất 90% nghĩa là sau 30 chu kỳ chỉ ~1.9³⁰ ≈ 2×10⁸ bản sao, không phải 10⁹.
- **Nhầm "denature" trong PCR với "denature" của protein**: PCR denature DNA (tách 2 mạch); protein denature là mất gấp 3D. Cùng từ, khác cơ chế.
- **Nghĩ Taq tự "biết" đâu là đoạn cần copy**: Taq chỉ kéo dài *từ mồi*. Tính đặc hiệu nằm ở thiết kế mồi, không ở enzyme.

### 🔁 Dừng lại tự kiểm tra

1. Bắt đầu với 3 phân tử DNA, làm 25 chu kỳ PCR. Hỏi tối đa bao nhiêu bản sao?
2. Cần ít nhất bao nhiêu chu kỳ để khuếch đại 1 phân tử thành ≥ 1 tỉ bản sao?

<details>
<summary>Đáp án</summary>

1. $3 \\times 2^{25} = 3 \\times 33{,}554{,}432 =$ **100.663.296 bản sao** (~10⁸).
2. Cần $2^n \\geq 10^9$ → $n \\geq \\log_2(10^9) \\approx 9 \\times \\log_2(10) \\approx 9 \\times 3{,}32 = 29{,}9$ → **30 chu kỳ** (giả định hiệu suất 100%).
</details>

### 📝 Tóm tắt mục 4

- PCR khuếch đại 1 đoạn DNA đích thành 2ⁿ bản sao sau n chu kỳ.
- 1 chu kỳ = denature (95°C) + anneal mồi (~55°C) + extend bằng Taq (72°C).
- Taq polymerase chịu nhiệt là chìa khóa — không cần thay enzyme mỗi chu kỳ.
- 30 chu kỳ → ~10⁹ bản sao, đủ cho hầu hết phân tích.

---

## 5. CRISPR-Cas9 — kéo cắt DNA có lập trình

### 💡 Trực giác / Hình dung

CRISPR (Clustered Regularly Interspaced Short Palindromic Repeats) ban đầu là **hệ miễn dịch của vi khuẩn** chống virus. Vi khuẩn lưu "ảnh thẻ căn cước" của virus đã gặp (DNA virus chèn vào CRISPR locus), rồi khi virus quay lại thì dùng *guide RNA* (gRNA) khớp với DNA virus, dẫn enzyme Cas9 tới cắt phá. Năm 2012, Doudna & Charpentier (Nobel 2020) chứng minh: **đổi gRNA tùy ý → cắt được bất cứ chỗ nào trên DNA mình muốn**. Đây là cú đột phá biến CRISPR thành "kéo lập trình" cho chỉnh sửa gen.

### 5.1. Hai thành phần chính

| Thành phần | Vai trò |
|---|---|
| **gRNA (guide RNA)** | RNA ~20 nt, bổ sung với chuỗi DNA đích. Như "địa chỉ GPS" |
| **Cas9** | Enzyme cắt DNA ở cả 2 mạch (tạo DSB — double-strand break) khi gRNA gắn đúng |

Để Cas9 cắt được, ngay sau chuỗi đích trên DNA phải có một motif gọi là **PAM (Protospacer Adjacent Motif)** — thường là \`NGG\`. PAM là "khóa an toàn" sinh học, ngăn Cas9 cắt nhầm DNA CRISPR của chính vi khuẩn.

### 5.2. Quy trình chỉnh sửa gen

1. Thiết kế gRNA dài ~20 nt khớp với chuỗi đích (trước PAM).
2. Đưa Cas9 + gRNA vào tế bào (qua plasmid, virus, hoặc lipid nanoparticle).
3. gRNA dẫn Cas9 tới đúng vị trí → Cas9 cắt cả 2 mạch (DSB).
4. Tế bào tự sửa DSB bằng 1 trong 2 đường:
   - **NHEJ (Non-Homologous End Joining)**: nối 2 đầu lại nhanh nhưng **dễ mắc lỗi** (thêm/mất vài nucleotide) → thường gây frameshift → **tắt gen (knock-out)**.
   - **HDR (Homology-Directed Repair)**: dùng 1 đoạn DNA template do người cung cấp để sửa theo mẫu → **thay/chèn chính xác trình tự mới (knock-in)**. Chính xác nhưng hiệu suất thấp, chỉ hoạt động khi tế bào đang chia (S/G2).

### 5.3. Bốn ví dụ ứng dụng

| Ứng dụng | Đột biến gì | Kết quả |
|---|---|---|
| Chữa bệnh hồng cầu hình liềm (Casgevy, FDA 2023) | NHEJ tắt gene BCL11A → tái kích hoạt fetal hemoglobin | Người bệnh không còn cần truyền máu |
| Tạo cà chua giàu GABA (Sicilian Rouge, Nhật 2021) | Knock-out gene SlGAD3 | Cà chua giảm huyết áp |
| Tạo muỗi không truyền sốt rét (gene drive) | Knock-in gene kháng ký sinh trùng | Đang thử nghiệm thực địa |
| Loại HIV khỏi tế bào người (đang thử nghiệm) | Cắt DNA virus tích hợp | Giai đoạn lâm sàng I |

### 5.4. So sánh CRISPR với công cụ chỉnh sửa trước đó

| Công cụ | Năm | Tốc độ thiết kế | Chi phí |
|---|---|---|---|
| Zinc finger nucleases (ZFN) | 1996 | Vài tháng / gen | Rất đắt |
| TALENs | 2010 | Vài tuần / gen | Đắt |
| **CRISPR-Cas9** | 2012 | **Vài ngày / gen** | **Rẻ (~\\$50 cho gRNA)** |

CRISPR thắng nhờ: chỉ cần thay đổi 20 nt gRNA (rẻ, nhanh) thay vì protein cồng kềnh như ZFN/TALEN.

### ❓ Câu hỏi tự nhiên của người đọc

**Q: CRISPR có *luôn* cắt đúng chỗ không?**
A: Không tuyệt đối. Có hiện tượng **off-target effects** — Cas9 cắt nhầm vị trí gần giống đích (1-3 nt sai khác). Đây là rủi ro lớn cho ứng dụng lâm sàng → các phiên bản cải tiến (high-fidelity Cas9, base editor, prime editor) đang giảm dần off-target.

**Q: Vì sao NHEJ hay gây tắt gen?**
A: Vì NHEJ "vá cắt cụt", hay thêm/bớt 1-2 nt ngẫu nhiên → frameshift → protein cụt → mất chức năng. Khi muốn tắt gen, NHEJ chính là cơ chế bạn cần. Khi muốn sửa chính xác → phải dùng HDR (khó hơn).

**Q: CRISPR có chỉnh sửa được phôi người không?**
A: Về kỹ thuật được (vụ He Jiankui ở Trung Quốc 2018 đã làm và bị lên án). Về đạo đức: bị cấm ở hầu hết quốc gia do nguy cơ off-target, mosaicism, và biến đổi gene di truyền cho thế hệ sau. Đây là chủ đề tranh luận sinh đạo đức học nóng nhất hiện nay.

### ⚠ Lỗi thường gặp

- **Nghĩ CRISPR "chỉnh gene như Word"**: thực tế CRISPR *cắt* gene; phần "sửa" phụ thuộc tế bào tự xử lý (NHEJ ngẫu nhiên / HDR có template). Cas9 không tự viết DNA mới.
- **Bỏ quên PAM**: thiết kế gRNA mà không kiểm tra có NGG ngay sau đích → Cas9 không cắt. Một số biến thể (Cas12, SpCas9-VQR) dùng PAM khác.
- **Cho HDR hoạt động ở mọi tế bào**: HDR yêu cầu tế bào đang nhân đôi DNA (pha S/G2). Tế bào không chia (neuron trưởng thành) chỉ dùng được NHEJ → khó knock-in.

### 🔁 Dừng lại tự kiểm tra

1. Bạn muốn **tắt** gene gây bệnh trong 1 dòng tế bào. Nên dùng NHEJ hay HDR? Vì sao?
2. gRNA dài 20 nt. Có bao nhiêu trình tự 20-nt khả dĩ về mặt toán học? Vì sao trong thực tế Cas9 vẫn có off-target?

<details>
<summary>Đáp án</summary>

1. **NHEJ**. Vì NHEJ thường gây thêm/bớt nucleotide ngẫu nhiên → frameshift → protein cụt → gene mất chức năng. NHEJ dễ thực hiện (không cần template, hoạt động ở mọi giai đoạn chu kỳ tế bào) và hiệu quả cao để tắt gene.
2. $4^{20} \\approx 1{,}1 \\times 10^{12}$ trình tự khả dĩ. Trong khi đó bộ gen người chỉ ~3×10⁹ bp → về lý thuyết mỗi 20-mer là duy nhất. Tuy nhiên thực tế Cas9 chấp nhận 1-3 nucleotide mismatch (nhất là ở đầu 5' xa PAM), nên có thể có nhiều vị trí gần giống đích → off-target. Mặt khác, bộ gen có nhiều vùng lặp lại (repeat) → 20-mer ở các vùng đó không hề duy nhất.
</details>

### 📝 Tóm tắt mục 5

- CRISPR-Cas9 = gRNA (~20 nt, "GPS") + Cas9 (kéo cắt) + PAM (mật khẩu mở khóa).
- Cas9 tạo DSB; tế bào sửa bằng NHEJ (tắt gen) hoặc HDR (sửa chính xác với template).
- CRISPR rẻ và nhanh hơn ZFN/TALEN nhờ chỉ cần thay đổi gRNA (20 nt RNA).
- Off-target và đạo đức chỉnh sửa phôi là 2 thách thức lớn nhất.

---

## 6. Ứng dụng và triển vọng

| Lĩnh vực | Ví dụ cụ thể |
|---|---|
| **Y học** | Vaccine mRNA (Pfizer, Moderna); liệu pháp gen Luxturna chữa mù di truyền (FDA 2017); Casgevy chữa hồng cầu hình liềm (FDA 2023) |
| **Nông nghiệp** | Lúa vàng (Golden Rice) bổ sung vitamin A; cây ngô Bt kháng sâu; cà chua GABA |
| **Pháp y** | DNA fingerprinting xác định nghi phạm, nhận dạng nạn nhân thiên tai |
| **Khoa học cơ bản** | Tạo dòng tế bào knock-out để nghiên cứu chức năng gene |
| **Bảo tồn** | Sửa gene cứu loài sắp tuyệt chủng; thử "hồi sinh" mammoth (đang nghiên cứu) |

**📝 Lưu ý đạo đức**: công nghệ gen mạnh đồng thời mở ra các vấn đề về (1) chỉnh sửa phôi người, (2) GMO trong môi trường tự nhiên, (3) bất bình đẳng truy cập (chữa trị \\$2 triệu/người), (4) quyền riêng tư dữ liệu DNA. Học sâu hơn ở các bài về sinh đạo đức (bioethics).

---

## 7. Bài tập + Lời giải chi tiết

### Bài tập

**Bài 1**: Đoạn mRNA gốc: \`5'-AUG-CGU-UAU-GGG-UAA-3'\` (Met-Arg-Tyr-Gly-STOP). Xác định loại đột biến trong mỗi trường hợp sau và protein kết quả:

(a) CGU → CGC.
(b) UAU → UGU. (UGU = Cysteine)
(c) UAU → UAA.
(d) Mất nucleotide G ở codon CGU (vị trí thứ 3).

**Bài 2**: Bạn có 5 phân tử DNA mẫu. Sau bao nhiêu chu kỳ PCR thì có ≥ 10⁹ bản sao? (Giả định hiệu suất 100%.)

**Bài 3**: Một hỗn hợp PCR có hiệu suất khuếch đại thực tế là 90% (mỗi chu kỳ tăng 1.9 lần). Bắt đầu từ 1 phân tử, sau 30 chu kỳ có bao nhiêu bản sao? So với hiệu suất 100% thì thiếu bao nhiêu lần?

**Bài 4**: NST gốc \`1-2-3-4-5-6-7-8\`. Sau đột biến: \`1-2-3-3-4-5-6-7-8\`. Đây là kiểu đột biến gì? Số gene tăng/giảm bao nhiêu?

**Bài 5**: Một bệnh nhân được chẩn đoán hội chứng Down. Karyotype có 47 NST với 3 bản NST 21. (a) Đột biến này thuộc loại nào? (b) Cơ chế nào ở giảm phân gây ra? (c) Nếu bố/mẹ đều bình thường (46 NST), từ đâu ra NST 21 thứ ba?

**Bài 6**: Bạn muốn dùng CRISPR-Cas9 để **tắt** gene X. Trình tự mục tiêu trong gene X là \`5'-AGTCCGATTGCAGTAGCCTA-3'\` (20 nt) và ngay sau đó là \`TGG\` trên DNA. (a) \`TGG\` có phải PAM hợp lệ cho SpCas9 không? (b) Thiết kế gRNA (viết trình tự RNA tương ứng). (c) Nên dùng NHEJ hay HDR? Vì sao?

### Lời giải

**Bài 1**:

(a) CGU → CGC: Tra bảng → CGU = Arg, CGC = Arg → **silent**. Protein không đổi: Met-Arg-Tyr-Gly-STOP.

(b) UAU → UGU: Tyr → Cysteine → **missense**. Protein: Met-Arg-**Cys**-Gly-STOP. Tyr (vòng thơm, ưa nước nhẹ) và Cys (chứa S, có thể tạo cầu disulfide) khác xa → có thể đổi cấu trúc protein đáng kể.

(c) UAU → UAA: Tyr → STOP → **nonsense**. Protein cụt: Met-Arg-STOP (chỉ 2 amino acid thay vì 4). Mất chức năng gần chắc chắn.

(d) Mất G ở codon CGU → chuỗi mới: \`AUG-CUU-AUG-GGU-AA...\` đọc lệch khung từ codon 2. Met-**Leu-Met-Gly**-... → **frameshift** (deletion 1 nt). Phần phía sau hoàn toàn khác, không có STOP đúng chỗ → protein lệch hoàn toàn.

**Bài 2**:

Cần $5 \\times 2^n \\geq 10^9$ → $2^n \\geq 2 \\times 10^8$ → $n \\geq \\log_2(2 \\times 10^8) = 1 + \\log_2(10^8) \\approx 1 + 26{,}6 = 27{,}6$.

→ Cần ít nhất **28 chu kỳ**. Kiểm tra: $5 \\times 2^{28} = 5 \\times 268{,}435{,}456 \\approx 1{,}34 \\times 10^9$ ✓.

**Bài 3**:

Với hiệu suất 90%, mỗi chu kỳ nhân 1.9 lần ($E=0{,}9$ → $1+E=1{,}9$). Sau 30 chu kỳ:

$$N = 1 \\times 1{,}9^{30} = ?$$

Tính: $\\log_{10}(1{,}9^{30}) = 30 \\times \\log_{10}(1{,}9) = 30 \\times 0{,}2788 = 8{,}36$ → $1{,}9^{30} \\approx 10^{8{,}36} \\approx$ **2,3×10⁸ bản sao**.

So với hiệu suất 100% ($2^{30} \\approx 1{,}07 \\times 10^9$): thiếu **~4,6 lần** ($1{,}07 \\times 10^9 / 2{,}3 \\times 10^8 \\approx 4{,}6$). Hiệu suất giảm 10% mỗi chu kỳ tích lũy thành chênh lệch lớn sau nhiều chu kỳ.

**Bài 4**:

\`1-2-3-4-5-6-7-8\` → \`1-2-3-**3**-4-5-6-7-8\`. Gene 3 xuất hiện 2 lần → đây là **lặp đoạn (duplication)**, lặp đoạn dài 1 gene.

Số gene tăng từ 8 → 9 gene (tăng **1 gene** do bản sao thêm của gene 3).

**Bài 5**:

(a) Đây là **đột biến số lượng NST — thể dị bội (aneuploidy)**, cụ thể là **trisomy 21** (3 bản NST 21).

(b) Cơ chế: **không phân ly (nondisjunction)** trong giảm phân. Hai NST 21 tương đồng (hoặc 2 chromatid chị em) không tách đúng → 1 giao tử nhận 2 NST 21 thay vì 1.

(c) Khi giao tử bất thường (2 NST 21) thụ tinh với giao tử bình thường (1 NST 21) → hợp tử có **3 NST 21**. Cả bố và mẹ đều có karyotype bình thường (46 NST), nhưng quá trình tạo giao tử ở 1 trong 2 người (thường ở mẹ, tỉ lệ nondisjunction tăng theo tuổi mẹ) gặp sự cố nondisjunction.

**Bài 6**:

(a) PAM cho SpCas9 (loại phổ biến nhất) có dạng \`NGG\`. \`TGG\` khớp dạng \`NGG\` (với N=T) → **PAM hợp lệ ✓**.

(b) gRNA bổ sung với DNA target theo nguyên tắc bắt cặp RNA-DNA (A-U, G-C, T-A đổi sang U-A trong RNA). Lưu ý: gRNA *cùng chiều* với mạch không-đích (non-target strand), tức là giống trình tự DNA target trừ T→U:

DNA target: \`5'-AGTCCGATTGCAGTAGCCTA-3'\`
→ gRNA:     \`5'-AGUCCGAUUGCAGUAGCCUA-3'\` (20 nt RNA, đổi T → U).

(c) Mục tiêu là **tắt gene** → dùng **NHEJ**. Vì:
- NHEJ thường thêm/bớt 1-2 nucleotide khi vá DSB → frameshift → protein cụt/sai → gene mất chức năng.
- NHEJ không cần template DNA, hoạt động ở mọi giai đoạn chu kỳ tế bào → đơn giản và hiệu suất cao.
- HDR chỉ cần khi muốn sửa chính xác hoặc chèn trình tự mới (knock-in), không cần thiết khi chỉ muốn knock-out.

---

## Liên kết và bài tiếp theo

- **Bài tiếp theo**: [Lesson 06 — Di truyền quần thể](../lesson-06-population-genetics/) — đột biến cung cấp allele mới; tần số allele và quy luật Hardy-Weinberg.
- **Liên hệ ngược**:
  - [Lesson 02 — Nhân đôi DNA](../lesson-02-dna-replication/) — proofreading và mismatch repair giảm thiểu đột biến.
  - [Lesson 03 — Phiên mã & dịch mã](../lesson-03-transcription-translation/) — bảng mã codon và mã thoái hóa là nền tảng cho silent/missense.
- **Liên hệ Tầng 1**:
  - [Lesson 01 — Phân tử sinh học](../../01-Molecules-Cells/lesson-01-biomolecules/) — bệnh hồng cầu hình liềm minh họa "1 amino acid → thay đổi cả chức năng".
- **Sẽ học sâu hơn**:
  - Tầng 3: ung thư (đột biến tích lũy trong gene proto-oncogene và tumor suppressor).
  - Tầng 3: vaccine mRNA và liệu pháp gen.

---

## 📝 Tổng kết Lesson 05

1. **Đột biến** = thay đổi trình tự DNA; ngẫu nhiên; là **nguồn nguyên liệu duy nhất** cho tiến hóa. Chỉ đột biến germ line di truyền cho con.
2. **4 loại đột biến điểm**: silent (vô hại nhờ mã thoái hóa), missense (đổi amino acid — vd sickle cell), nonsense (tạo STOP sớm — cụt protein), frameshift (lệch khung do thêm/mất bp không bội số 3).
3. Số kiểu thay thế khả dĩ ở 1 vị trí $=$ **3** (đổi sang 3 nucleotide còn lại).
4. **Đột biến NST**: cấu trúc (mất, lặp, đảo, chuyển đoạn) + số lượng (đa bội ở thực vật; dị bội do nondisjunction — vd Down trisomy 21, Turner monosomy X).
5. **PCR**: 3 bước/chu kỳ (denature 95°C → anneal mồi ~55°C → extend bởi Taq 72°C). Sau n chu kỳ → $2^n$ **bản sao**. 30 chu kỳ ≈ 10⁹ bản sao.
6. **CRISPR-Cas9**: gRNA (~20 nt) dẫn Cas9 tới đích (cần PAM \`NGG\`) → cắt DSB → tế bào sửa bằng **NHEJ** (tắt gen) hoặc **HDR** (sửa chính xác có template). Rẻ, nhanh hơn ZFN/TALEN.
7. Công nghệ gen ứng dụng rộng: y học (vaccine mRNA, Casgevy), nông nghiệp (Bt corn), pháp y, bảo tồn — kèm thách thức đạo đức về chỉnh sửa phôi và GMO.

**Tiếp theo**: [Lesson 06 — Di truyền quần thể](../lesson-06-population-genetics/)
`;
