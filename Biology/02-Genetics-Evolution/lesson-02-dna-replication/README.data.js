// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: Biology/02-Genetics-Evolution/lesson-02-dna-replication/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 02 — DNA & nhân đôi

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Mô tả được **cấu trúc xoắn kép (double helix)** của DNA: hai mạch **đối song (antiparallel)** 5'→3' và 3'→5', backbone đường–phosphate, base ở bên trong.
- Áp dụng **nguyên tắc bắt cặp bổ sung (complementary base pairing)**: A–T (2 liên kết hydrogen), G–C (3 liên kết hydrogen) — dùng để suy ra mạch bổ sung từ mạch khuôn.
- Hiểu **nhân đôi bán bảo toàn (semiconservative replication)** qua thí nghiệm Meselson–Stahl 1958 và tính được tỉ lệ DNA "nặng/nhẹ/lai" sau n chu kỳ.
- Liệt kê và mô tả vai trò của các enzyme tại **chạc nhân đôi (replication fork)**: helicase, topoisomerase, SSB, primase, DNA polymerase III/I, ligase.
- Phân biệt **mạch dẫn đầu (leading strand)** tổng hợp liên tục và **mạch trễ (lagging strand)** tổng hợp ngắt quãng thành các **đoạn Okazaki (Okazaki fragment)** — vì sao có sự khác biệt này.
- Tính toán định lượng: số nucleotide mỗi loại từ % cho trước, số liên kết hydrogen, thời gian nhân đôi với nhiều **điểm khởi đầu (origin of replication)** song song, số phân tử sau n chu kỳ.

## Kiến thức tiền đề

- Cấu trúc **nucleotide** (đường + phosphate + base) và **quy tắc Chargaff** — [\`../../01-Molecules-Cells/lesson-01-biomolecules/\`](../../01-Molecules-Cells/lesson-01-biomolecules/) mục 6. Bài này coi như đã thuộc.
- Khái niệm **gene** và **allele** — [\`../lesson-01-mendelian-genetics/\`](../lesson-01-mendelian-genetics/). DNA là vật chất *chứa* gene; lesson đó nói về hành vi của gene khi di truyền, lesson này nói về cấu trúc và cơ chế sao chép vật chất chứa gene.
- Liên kết **hydrogen** và liên kết **cộng hóa trị** — \`Chemistry/01-Structure/lesson-04-intermolecular-forces\` (nếu đã đọc). Hai loại lực này giữ DNA: cộng hóa trị giữ backbone, hydrogen giữ 2 mạch lại với nhau (yếu hơn → tách được khi nhân đôi).

---

## 1. Cấu trúc xoắn kép — DNA "trông" thế nào?

### 💡 Trực giác / Hình dung

Hãy hình dung DNA như **cái thang xoắn**:
- Hai **dọc thang** = hai mạch đường–phosphate (sugar–phosphate backbone) chạy song song nhưng **ngược chiều nhau** (đối song).
- Mỗi **bậc thang** = một cặp base (A–T hoặc G–C) nối hai dọc thang qua liên kết hydrogen.
- Cả "cái thang" xoắn về bên phải, ~10 cặp base mỗi vòng xoắn, đường kính cố định ~2 nm.

Đường kính cố định không phải ngẫu nhiên: A và G là **purine** (2 vòng, lớn), T và C là **pyrimidine** (1 vòng, nhỏ). Mỗi cặp luôn có 1 purine + 1 pyrimidine → tổng "bề ngang" bậc thang không đổi. Nếu cặp A–G (2 purine) thì bậc thang phình ra, A–C (2 pyrimidine) thì lép xuống — thang sẽ vẹo. Tự nhiên không cho phép.

### 1.1. Phát hiện ra cấu trúc (lịch sử rất ngắn)

- **1952** — **Rosalind Franklin** chụp được ảnh **X-ray diffraction** của DNA (bức "Photo 51") cho thấy DNA là chuỗi xoắn, có chu kỳ đều.
- **1953** — **James Watson và Francis Crick** dựng mô hình xoắn kép dựa trên dữ liệu của Franklin (cùng quy tắc Chargaff đã có sẵn từ 1950).
- **1962** — Watson, Crick và Maurice Wilkins (đồng nghiệp của Franklin) nhận giải Nobel. Franklin đã mất 1958 vì ung thư, không được trao Nobel (giải Nobel không trao cho người đã mất).

### 1.2. Ba thành phần của một nucleotide

Mỗi nucleotide có 3 thành phần (nhắc lại từ Lesson 01 Tầng 1):

| Thành phần | Vai trò | Vị trí |
|------------|---------|--------|
| Đường **deoxyribose** (5 carbon) | tạo "sườn" của mạch | trung tâm nucleotide |
| Nhóm **phosphate** (PO₄³⁻) | tích điện âm, nối các nucleotide qua liên kết phosphodiester | gắn ở carbon 5' của đường |
| **Base nitơ** (A/T/G/C) | mang "thông tin"; bắt cặp với base ở mạch đối diện | gắn ở carbon 1' của đường |

Các carbon của đường được đánh số 1', 2', 3', 4', 5' (đọc là "một phẩy", "ba phẩy"...). Hai mốc quan trọng:
- **5'** mang nhóm phosphate.
- **3'** mang nhóm –OH (hydroxyl). Đây là điểm sẽ "mọc thêm" nucleotide tiếp theo (cốt lõi cho quy tắc 5'→3' ở §3).

### 1.3. "Đối song" nghĩa là gì?

Một mạch DNA có hướng từ đầu 5' (có phosphate tự do) đến đầu 3' (có –OH tự do). Hai mạch DNA chạy ngược chiều nhau:

\`\`\`
Mạch trên:   5' – A T G C C T A G – 3'
                  | | | | | | | |
Mạch dưới:   3' – T A C G G A T C – 5'
\`\`\`

Đọc mạch trên trái-sang-phải là 5'→3'; mạch dưới trái-sang-phải là 3'→5'. Đó là "**antiparallel**" (đối song).

Vì sao quan trọng? Vì DNA polymerase chỉ tổng hợp được theo chiều 5'→3' (chỉ thêm nucleotide vào đầu 3'-OH). Hai mạch ngược chiều → tại chạc nhân đôi, hai mạch không thể được tổng hợp theo cùng kiểu → sinh ra mạch dẫn đầu và mạch trễ (xem §4).

### 1.4. Bốn ví dụ số cụ thể về cấu trúc

**Ví dụ 1 — Chiều dài vật lý của DNA**: ~10 cặp base/vòng xoắn, mỗi vòng cao ~3.4 nm → mỗi cặp base cao ~0.34 nm. Genome người ~3×10⁹ bp → chiều dài ~3×10⁹ × 0.34 nm = **~1.02 mét** trong mỗi tế bào. (Cuộn xếp vào nhân ~10 µm là kỳ tích vật lý.)

**Ví dụ 2 — Đếm liên kết hydrogen**: DNA 1000 bp với 30% A. Theo Chargaff: %T = 30%, %G = %C = 20% → A=T=300 cặp, G=C=200 cặp. Tổng liên kết H = 300×2 + 200×3 = 600 + 600 = **1200 liên kết hydrogen**.

**Ví dụ 3 — Suy ra mạch bổ sung**: cho mạch khuôn 5'– \`ATGCGTAA\` –3'. Mạch bổ sung viết theo chiều đối song 3'– \`TACGCATT\` –5', hay nếu viết lại 5'→3' (như quy ước chuẩn) là 5'– \`TTACGCAT\` –3'.

**Ví dụ 4 — Bền nhiệt theo GC content**: DNA A có GC=40%, DNA B có GC=60%. Trong 100 bp, A có 40 cặp G–C (×3 = 120 H) + 60 cặp A–T (×2 = 120 H) = 240 H. B có 60×3 + 40×2 = 180 + 80 = 260 H. B nhiều liên kết H hơn → **nhiệt độ "melt" (Tm)** cao hơn. (Vi khuẩn sống ở suối nước nóng thường có GC cao bất thường — đây là lý do.)

### ❓ Câu hỏi tự nhiên của người đọc

**Q: Tại sao DNA cần phải là xoắn KÉP? Một mạch không đủ chứa thông tin sao?**
A: Một mạch chứa đủ thông tin (RNA chỉ có một mạch vẫn dùng được). Nhưng xoắn kép cho 2 lợi ích sống còn: (1) **bảo hiểm thông tin** — mất một base ở mạch này, mạch kia vẫn giữ thông tin để sửa lại; (2) **cơ chế nhân đôi đơn giản** — chỉ cần tách 2 mạch ra rồi mỗi mạch làm khuôn tổng hợp mạch mới (xem §3). Một mạch đơn không có "khuôn" sẵn để copy.

**Q: 2 nm đường kính nhỏ thế, tế bào dùng máy gì để "nhìn" được DNA?**
A: Không "nhìn" — tế bào dùng **enzyme** (protein) có hình dạng khớp với DNA. Helicase ôm lấy DNA và tách 2 mạch; polymerase nhận biết base đối diện theo hình dạng (purine-pyrimidine) chứ không "nhìn" trực quan. Đây lại là nguyên lý "hình dạng quyết định chức năng" của Tầng 1 Lesson 01.

**Q: Có DNA mạch đơn trong tự nhiên không?**
A: Có — một số virus (vd parvovirus, phage M13) có genome DNA mạch đơn. Nhưng trong tế bào sống (vi khuẩn, eukaryote), DNA luôn là xoắn kép. RNA thì ngược lại, thường mạch đơn nhưng có thể gập lại tạo cấu trúc xoắn kép nội tại (Lesson 03).

### ⚠ Lỗi thường gặp

- **Nhầm "song song" và "đối song"**: hai mạch DNA *vừa* song song (cùng phương) *vừa* đối song (ngược chiều 5'↔3'). Cách an toàn: luôn ghi chú 5' và 3' khi vẽ.
- **Quên rằng đường kính xoắn kép không đổi**: nếu một bài tập "cho cặp A–G", đó là bài lỗi hoặc cố tình bẫy. Trong DNA bình thường chỉ có A–T và G–C.
- **Coi backbone (đường–phosphate) là thông tin di truyền**: SAI. Backbone giống nhau ở mọi đoạn DNA. Thông tin nằm ở **trình tự base**.

### 🔁 Dừng lại tự kiểm tra

1. Cho mạch khuôn 5'– \`GATTACA\` –3'. Viết mạch bổ sung theo chiều 5'→3'.
2. Một DNA có 1500 bp, A = 25%. Tính tổng số liên kết hydrogen giữa hai mạch.

<details>
<summary>Đáp án</summary>

1. Mạch khuôn 5'– \`G A T T A C A\` –3'. Bổ sung theo chiều đối song 3'– \`C T A A T G T\` –5'. Đảo lại để viết 5'→3' (quy ước chuẩn): 5'– \`T G T A A T C\` –3'.
2. 1500 bp = 1500 cặp base = 3000 nucleotide tổng. A=25% trên 3000 nucleotide → A=750. T=750 (Chargaff). G=C → G+C = 1500 → G=C=750. Số cặp A–T = 750 (mỗi A đi với 1 T); số cặp G–C = 750. Tổng H = 750×2 + 750×3 = 1500 + 2250 = **3750 liên kết hydrogen**.
</details>

### 📝 Tóm tắt mục 1

- DNA = xoắn kép, 2 mạch đối song (5'→3' và 3'→5'), xoắn phải, ~10 bp/vòng, đường kính ~2 nm.
- Nucleotide = deoxyribose + phosphate + base; carbon 5' mang phosphate, 3' mang –OH.
- A–T (2 H-bond), G–C (3 H-bond); cặp luôn purine + pyrimidine để giữ đường kính ổn định.
- DNA giàu G–C bền nhiệt hơn (Tm cao hơn).

---

## 2. Nhân đôi bán bảo toàn — thí nghiệm Meselson–Stahl

### 💡 Trực giác / Hình dung

Có 3 giả thuyết khi DNA nhân đôi:
- **Bảo toàn (conservative)**: DNA mẹ giữ nguyên, "đẻ" ra 1 DNA con hoàn toàn mới. (Như photocopy: bản gốc giữ, bản sao mới hoàn toàn.)
- **Bán bảo toàn (semiconservative)**: 2 mạch tách ra, mỗi mạch làm khuôn → mỗi DNA con có 1 mạch cũ + 1 mạch mới. (Như kéo khóa đôi: 2 nửa tách, mỗi nửa được lắp thêm nửa mới.)
- **Phân tán (dispersive)**: DNA mẹ vỡ ra thành các mảnh, trộn với mảnh mới, tạo DNA con là "khảm" cũ-mới.

Năm 1958, **Matthew Meselson và Franklin Stahl** thiết kế một thí nghiệm rất đẹp để phân biệt 3 giả thuyết — và xác định cơ chế thật.

### 2.1. Thí nghiệm Meselson–Stahl (1958)

**Ý tưởng**: dùng **isotope** **N15** (nitơ nặng) và **N14** (nitơ nhẹ) làm "nhãn" cho base. Vì base chứa nitơ, DNA tổng hợp trong môi trường N15 sẽ "nặng" hơn DNA tổng hợp trong môi trường N14. Dùng **ly tâm trong gradient CsCl** sẽ tách được DNA "nặng" và "nhẹ" thành các băng riêng.

**Quy trình**:
1. Nuôi vi khuẩn *E. coli* nhiều thế hệ trong môi trường chỉ có N15 → toàn bộ DNA là "**nặng**" (cả 2 mạch đều N15).
2. Chuyển sang môi trường N14, để chúng nhân đôi 1 chu kỳ → thu DNA, ly tâm.
3. Tiếp tục để nhân đôi chu kỳ 2 → thu DNA, ly tâm. Lặp lại.

**Kết quả quan sát**:
- **Chu kỳ 0** (chưa nhân đôi trong N14): 1 băng **nặng** duy nhất.
- **Chu kỳ 1**: 1 băng duy nhất, ở vị trí **trung gian** (giữa nặng và nhẹ).
- **Chu kỳ 2**: 2 băng — một ở vị trí **trung gian**, một ở vị trí **nhẹ**, tỉ lệ 1:1.

### 2.2. Vì sao kết quả này loại bỏ "bảo toàn" và "phân tán"?

| Giả thuyết | Chu kỳ 1 dự đoán | Chu kỳ 2 dự đoán |
|------------|------------------|------------------|
| Bảo toàn | 2 băng (1 nặng + 1 nhẹ) | 2 băng (1 nặng + 3 nhẹ) |
| **Bán bảo toàn** | **1 băng (toàn trung gian)** | **2 băng (1 trung gian + 1 nhẹ), tỉ lệ 1:1** ✓ |
| Phân tán | 1 băng (trung gian, *gần* nặng) | 1 băng (trung gian, *gần* nhẹ — KHÔNG có băng nhẹ riêng) |

Kết quả thực nghiệm chỉ khớp với **bán bảo toàn**. Đây được mệnh danh "thí nghiệm đẹp nhất trong sinh học" vì 1 thí nghiệm loại trừ được 2 giả thuyết cạnh tranh.

### 2.3. Bốn ví dụ số cụ thể về Meselson–Stahl

**Ví dụ 1 — chu kỳ 1**: 1 DNA mẹ nặng (gồm 2 mạch nặng N15) tách thành 2 mạch khuôn. Trong môi trường N14, mỗi mạch khuôn nhặt nucleotide N14 lắp vào. Kết quả: 2 DNA con, mỗi cái = 1 mạch N15 + 1 mạch N14 → **toàn bộ là "trung gian"** (50:50 nặng/nhẹ). Tỉ lệ băng: 0% nặng, 100% trung gian, 0% nhẹ.

**Ví dụ 2 — chu kỳ 2**: 2 DNA "lai" trên tiếp tục nhân đôi. Mỗi DNA lai cho 2 con: con thứ nhất có mạch N15 (cũ) + mạch N14 (mới) → lai; con thứ hai có mạch N14 (cũ) + mạch N14 (mới) → nhẹ hoàn toàn. Vậy từ 2 DNA lai sinh 4 DNA: 2 lai + 2 nhẹ → **tỉ lệ 1:1** trung gian:nhẹ. Khớp quan sát.

**Ví dụ 3 — chu kỳ n tổng quát**: bắt đầu với 1 DNA nặng. Sau n chu kỳ trong N14, có 2ⁿ phân tử DNA. Trong đó **luôn có đúng 2 phân tử "lai"** (giữ 1 mạch N15 gốc), còn lại 2ⁿ − 2 phân tử nhẹ hoàn toàn. Tỉ lệ lai:nhẹ = 2 : (2ⁿ − 2).
- Chu kỳ 1: 2 lai, 0 nhẹ → tỉ lệ 1:0 (chỉ có lai).
- Chu kỳ 2: 2 lai, 2 nhẹ → 1:1.
- Chu kỳ 3: 2 lai, 6 nhẹ → 1:3.
- Chu kỳ 4: 2 lai, 14 nhẹ → 1:7.

**Ví dụ 4 — tỉ lệ phần trăm**: sau 5 chu kỳ, số DNA = 32. Lai = 2, nhẹ = 30. % lai = 2/32 = **6.25%**; % nhẹ = 93.75%. Sau 10 chu kỳ: lai = 2/1024 ≈ **0.2%** — gần như "biến mất" trên thực nghiệm.

### ❓ Câu hỏi tự nhiên của người đọc

**Q: Vì sao luôn có ĐÚNG 2 phân tử lai, không hơn không kém?**
A: Vì DNA mẹ ban đầu chỉ có 2 mạch N15. Hai mạch này không bị phá hủy khi nhân đôi (đó là ý nghĩa "bảo toàn" trong "bán bảo toàn"); chúng chỉ "đi vào" các DNA con. Mỗi mạch N15 ở trong đúng 1 DNA con → tổng 2 DNA chứa mạch N15. Các DNA còn lại đều "mới hoàn toàn" trong N14.

**Q: Thí nghiệm này có chứng minh chiều 5'→3' không?**
A: Không trực tiếp. Meselson–Stahl chỉ chứng minh **cơ chế phân chia mạch**. Chiều 5'→3' của polymerase được xác định qua các thí nghiệm khác (Kornberg 1958+). Hai phát hiện độc lập, ghép lại tạo bức tranh đầy đủ.

### ⚠ Lỗi thường gặp

- **Nói "DNA mẹ giữ nguyên 1 mạch trong 1 con, 1 mạch trong con khác"**: SAI. Mỗi mạch N15 đi vào **một** DNA con; 2 mạch N15 ở 2 DNA con khác nhau. Cả 2 con đều "lai" sau chu kỳ 1.
- **Tính tỉ lệ lai trên tổng là $1/2^n$**: gần đúng nhưng không chính xác — phải là $2/2^n = 1/2^{\\,n-1}$.
- **Nhầm "bán bảo toàn" với "bảo toàn một nửa"**: "bán" ở đây không có nghĩa "một nửa được bảo toàn"; nó nghĩa là "**bảo toàn ở mức mạch**" — toàn bộ thông tin gốc vẫn còn, chỉ là chia đôi vào 2 DNA con.

### 🔁 Dừng lại tự kiểm tra

1. Bắt đầu 1 DNA N15. Sau 6 chu kỳ trong N14, có bao nhiêu DNA con? Bao nhiêu cái là "lai"? Tỉ lệ % lai là bao nhiêu?
2. Nếu Meselson–Stahl thấy ở chu kỳ 1 có **2 băng** (1 nặng + 1 nhẹ), bạn kết luận gì về cơ chế?

<details>
<summary>Đáp án</summary>

1. Sau 6 chu kỳ: 2⁶ = **64 DNA con**. Lai = 2; nhẹ = 62. % lai = 2/64 = **3.125%**.
2. Nếu chu kỳ 1 cho 2 băng tách bạch (1 nặng nguyên gốc + 1 nhẹ hoàn toàn) → cơ chế là **bảo toàn (conservative)**, vì DNA mẹ giữ nguyên còn DNA con mới hoàn toàn. Bán bảo toàn không thể cho kết quả này (cả 2 con đều phải "lai" ở chu kỳ 1).
</details>

### 📝 Tóm tắt mục 2

- 3 giả thuyết nhân đôi: bảo toàn, bán bảo toàn, phân tán. Meselson–Stahl (1958) chứng minh là **bán bảo toàn**.
- Sau n chu kỳ từ 1 DNA gốc nặng (trong môi trường nhẹ): 2ⁿ DNA con; **luôn 2 cái "lai"**, còn lại nhẹ hoàn toàn.
- Mỗi DNA con = 1 mạch cũ (khuôn) + 1 mạch mới (tổng hợp). Mạch cũ không bao giờ bị phá hủy trong nhân đôi.

---

## 3. Quy tắc 5'→3' và "đầu OH" — vì sao polymerase chọn chiều

### 💡 Trực giác / Hình dung

DNA polymerase giống một **thợ may chỉ biết khâu từ một đầu**: nó nắm "đầu kim" là nhóm **3'-OH** của nucleotide cuối cùng trên mạch đang được tổng hợp, rồi đính nucleotide tiếp theo vào đó. Thợ may này không có cách nào khâu ngược lại (không thể đính vào đầu 5'-phosphate).

Hệ quả: **mạch mới luôn được kéo dài theo chiều 5'→3'**, đồng nghĩa với việc nó **đọc mạch khuôn theo chiều 3'→5'**.

### 3.1. Cơ chế hóa học chi tiết

Mỗi nucleotide đến gặp polymerase ở dạng **dNTP** (deoxynucleotide triphosphate) — có 3 nhóm phosphate gắn vào carbon 5'. Phản ứng:

\`\`\`
Mạch đang tổng hợp:   ...– N – N – N – 3'-OH    (đầu mở)

dNTP bay tới:         5'-P-P-P-N (3 phosphate)

Phản ứng:             3'-OH tấn công P đầu tiên của dNTP
                      → 2 phosphate (PPi) thoát ra
                      → mạch dài thêm 1 nucleotide:
                      ...– N – N – N – N – 3'-OH
\`\`\`

Năng lượng để nối đến từ việc tách **pyrophosphate (PPi)** — 2 phosphate sau cùng bị tách rồi thủy phân ngay (PPi → 2 Pi), làm phản ứng **không thuận nghịch** (nhiệt động học đẩy mạnh về phía tổng hợp).

**Hậu quả lớn nhất**: vì cần đầu 3'-OH có sẵn để "đính vào", polymerase **không thể khởi đầu mạch từ con số không** — nó cần một mạch ngắn có sẵn để kéo dài. Đây là lý do cần **primer (mồi)** ở §4.

### 3.2. Vì sao không có polymerase "ngược chiều" (3'→5')?

Nếu có, polymerase này sẽ phải dùng **dNTP có triphosphate ở đầu 3'** để kéo dài về phía 5'. Vấn đề: nếu cần sửa lỗi (proofreading), phải cắt đi nucleotide sai — nhưng cắt đi sẽ làm mất luôn triphosphate "năng lượng" của vị trí kế tiếp → không thể nối tiếp. Tự nhiên chọn 5'→3' vì cho phép proofreading hiệu quả.

(Chi tiết: trong thực tế DNA polymerase có hoạt tính **3'→5' exonuclease** để cắt nucleotide sai ở đầu 3', rồi thay nucleotide đúng. Sai sót cuối cùng ~1 lỗi / 10⁹ base — cực kỳ chính xác.)

### 3.3. Bốn ví dụ số/áp dụng cụ thể

**Ví dụ 1 — Xác định chiều đọc mạch khuôn**: cho mạch khuôn 5'– \`AATGCGTC\` –3'. Polymerase đọc nó theo chiều **3'→5'**, tức bắt đầu từ C (ở 3') và đi về A (ở 5'). Mạch mới được tổng hợp 5'→3': bắt đầu lắp G (đối với C), rồi A, C, G, C, A, T, T → mạch mới 5'– \`GACGCATT\` –3'.

**Ví dụ 2 — Hậu quả của 5'→3' khi gặp 2 mạch đối song**: tại chạc nhân đôi, một mạch khuôn lộ đầu 3' (polymerase đi theo "đúng chiều fork") → mạch mới tổng hợp liên tục (leading). Mạch khuôn còn lại lộ đầu 5' → polymerase phải tổng hợp "ngược chiều fork" → phải đoạn ngắt quãng (lagging, §4).

**Ví dụ 3 — Tốc độ giả định**: nếu polymerase E. coli nối ~1000 nucleotide/giây, để tổng hợp 1 đoạn 3000 bp mất 3 giây — với điều kiện đã có primer. Nếu chưa có primer, không bắt đầu được.

**Ví dụ 4 — Năng lượng phản ứng**: thủy phân PPi → 2 Pi giải phóng ~19 kJ/mol. Đây là "động cơ" làm phản ứng kéo dài DNA không đảo ngược. Nếu PPi không bị thủy phân, phản ứng có thể chạy ngược (cắt mạch) — đó là điểm yếu mà tự nhiên đã "vá".

### ❓ Câu hỏi tự nhiên của người đọc

**Q: Tại sao tế bào không tiến hóa cả hai loại polymerase (cả 5'→3' và 3'→5') để khỏi rắc rối mạch trễ?**
A: Vì lý do nhiệt động ở §3.2 — polymerase 3'→5' không cho phép proofreading hiệu quả. Tự nhiên ưu tiên độ chính xác hơn sự gọn gàng cơ học. Hậu quả là phải có máy móc bổ trợ (primase + ligase + đoạn Okazaki) để xử lý mạch trễ.

**Q: Đầu 3'-OH thì hiểu, nhưng "đầu 5'-phosphate" có ý nghĩa gì khi enzyme không dùng được nó?**
A: 5'-phosphate là "đầu chết" của mạch đang được tổng hợp. Nó không gắn thêm nucleotide tiếp theo, nhưng nó là "neo" để **ligase** (§4) nối hai đoạn lại với nhau (ligase tạo liên kết phosphodiester giữa 3'-OH của đoạn này với 5'-phosphate của đoạn kế tiếp).

### ⚠ Lỗi thường gặp

- **Viết "polymerase đọc mạch khuôn 5'→3'"**: SAI. Polymerase **tổng hợp mạch mới 5'→3'**; muốn vậy nó phải **đọc mạch khuôn 3'→5'**. Hai chiều ngược nhau (vì antiparallel).
- **Nghĩ rằng polymerase có thể khởi đầu một mạch từ con số không**: SAI. Luôn cần primer (mồi).
- **Quên triphosphate**: dNTP có 3 phosphate, không phải 1. Hai phosphate "thừa" cung cấp năng lượng cho phản ứng.

### 🔁 Dừng lại tự kiểm tra

1. Cho mạch khuôn 3'– \`TTACCG\` –5'. Mạch mới tổng hợp có trình tự 5'→3' là gì?
2. Vì sao việc polymerase "không khởi đầu được" lại sinh ra nhu cầu cho primase? (Trả lời ngắn).

<details>
<summary>Đáp án</summary>

1. Mạch khuôn 3'– \`T T A C C G\` –5'. Đọc theo chiều 3'→5', mạch mới tổng hợp 5'→3': bắt cặp T→A, T→A, A→T, C→G, C→G, G→C. Mạch mới 5'– \`A A T G G C\` –3'.
2. Vì polymerase chỉ kéo dài *đã có sẵn* một đoạn mạch (cần đầu 3'-OH). Để khởi đầu từ con số không, cần một mạch ngắn "khởi tạo" — đó là **primer**. Primer được tạo bởi **primase**, làm bằng RNA (vì RNA polymerase không cần đầu 3'-OH có sẵn). Sau đó primer RNA được thay bằng DNA (DNA pol I) và đoạn được ligase nối.
</details>

### 📝 Tóm tắt mục 3

- DNA polymerase tổng hợp mạch mới chiều **5'→3'**, đọc khuôn chiều **3'→5'**, chỉ nối nucleotide vào đầu **3'-OH** có sẵn.
- Năng lượng nối đến từ thủy phân pyrophosphate (PPi) — phản ứng không đảo ngược.
- Polymerase không khởi đầu được từ con số không → cần **primer** (sẽ học ở §4).
- Sai sót cuối cùng ~10⁻⁹ nhờ hoạt tính proofreading 3'→5' exonuclease.

---

## 4. Chạc nhân đôi — đội ngũ enzyme và mạch trễ

### 💡 Trực giác / Hình dung

Tưởng tượng DNA mẹ là một **dây kéo (zipper) đôi**. Để copy nó:
1. Một cái "**răng**" kéo (helicase) đi dọc dây, tách 2 nửa ra → tạo hình chữ Y, gọi là **chạc nhân đôi**.
2. Phía trước răng kéo, dây bị xoắn quá mức → có "công nhân" giải xoắn (topoisomerase).
3. Hai nửa vừa tách lại có xu hướng dính lại — "kẹp giữ" (SSB) ngăn chúng dính.
4. Mỗi nửa làm khuôn để "thợ in" (polymerase) in nửa mới. Nhưng vì 2 nửa ngược chiều, một bên in thuận, một bên in ngắt quãng.

### 4.1. Đội ngũ 6 enzyme chính

| Enzyme | Chức năng | Khi nào dùng |
|--------|-----------|--------------|
| **Helicase** | Tháo xoắn (bẻ liên kết hydrogen giữa 2 mạch) | Mở đầu, di chuyển cùng chạc |
| **Topoisomerase** | Giải xoắn quá mức ở phía trước chạc (cắt – xoay – nối lại) | Phía trước fork, liên tục |
| **SSB** (single-strand binding protein) | Bám lên mạch đơn để không dính lại / không gập | Trên mạch đơn đã tách |
| **Primase** | Tổng hợp **primer RNA** ngắn (~10 nt) tại điểm khởi đầu | Khởi đầu mỗi mạch / mỗi đoạn Okazaki |
| **DNA polymerase III** (vi khuẩn) | Kéo dài mạch mới từ primer, chiều 5'→3' | Tổng hợp chính |
| **DNA polymerase I** | Thay primer RNA bằng DNA | Sau khi pol III hoàn tất đoạn |
| **Ligase** | Nối các đoạn DNA lại (tạo liên kết phosphodiester giữa 3'-OH và 5'-P) | Cuối cùng, hoàn thiện mạch trễ |

(Ở eukaryote, polymerase III ↔ pol δ/ε; pol I ↔ pol δ + FEN1, nhưng nguyên tắc giống nhau.)

### 4.2. Mạch dẫn đầu (leading) vs mạch trễ (lagging)

Tại chạc nhân đôi, chữ Y có 2 nhánh:
- **Mạch khuôn A** (mạch dưới của hình): lộ đầu **3'** vào phía fork đang mở. Polymerase III bám đầu 3' của primer rồi tổng hợp 5'→3' theo cùng hướng fork đi → **mạch dẫn đầu** (leading), tổng hợp **liên tục**.
- **Mạch khuôn B** (mạch trên): lộ đầu **5'** vào phía fork đang mở. Polymerase III muốn tổng hợp 5'→3' phải đi **ngược hướng fork** → chỉ làm được từng đoạn ngắn. Cứ helicase mở thêm 1 đoạn, primase đặt 1 primer mới, polymerase tổng hợp ngược về phía primer trước, rồi ligase nối lại. Đoạn ngắn này gọi là **đoạn Okazaki** (Okazaki fragment).

Độ dài đoạn Okazaki: vi khuẩn ~1000–2000 nt, eukaryote ~100–200 nt.

\`\`\`
                         fork
                    →  →  →  
                       /
Mạch khuôn A: 3' ━━━━━━━━━━━━━ 5'
                       ╲╲╲╲╲╲ ← mạch dẫn đầu (5'→3', liên tục)
Mạch khuôn B: 5' ━━━━━━━━━━━━━ 3'
              ╲╲ ╲╲ ╲╲ ╲╲      ← mạch trễ (5'→3', từng đoạn Okazaki)
              ↑ligase nối các đoạn
\`\`\`

### 4.3. 5 bước cụ thể tại chạc

1. **Helicase** ngồi tại điểm khởi đầu, tách 2 mạch → tạo "bong bóng" (replication bubble).
2. **Topoisomerase** + **SSB** giữ ổn định mạch đơn.
3. **Primase** đặt primer RNA — 1 primer cho mạch dẫn đầu (chỉ cần 1 lần), nhiều primer cho mạch trễ (1 primer cho mỗi đoạn Okazaki).
4. **DNA pol III** kéo dài từ primer (5'→3'). Mạch dẫn đầu chạy liên tục theo fork; mạch trễ làm từng đoạn ngắn.
5. **DNA pol I** đi sau: cắt primer RNA, thay bằng DNA. **Ligase** nối các đoạn DNA lại (đặc biệt quan trọng cho mạch trễ).

### 4.4. Bốn ví dụ số cụ thể

**Ví dụ 1 — Đếm primer**: một bong bóng nhân đôi có 2 chạc đối xứng. Mỗi chạc có 1 mạch dẫn đầu (1 primer) và 1 mạch trễ (nhiều primer). Nếu mạch trễ dài 10,000 nt và mỗi đoạn Okazaki ~1000 nt → cần ~**10 primer** cho riêng mạch trễ đó. Tổng cho cả bong bóng (2 chạc): ~2 primer cho dẫn đầu + ~20 primer cho trễ = **~22 primer**.

**Ví dụ 2 — Đoạn Okazaki ở E. coli vs người**:
- E. coli: genome ~4.6×10⁶ bp, đoạn Okazaki ~1500 nt, mạch trễ chiếm một nửa số chiều dài cần tổng hợp → số đoạn ≈ 4.6×10⁶ / (2 × 1500) ≈ **~1500 đoạn**.
- Người: genome ~3×10⁹ bp, đoạn Okazaki ~150 nt → ~3×10⁹ / (2 × 150) = **~10⁷ đoạn** cho cả genome. Đó là lý do người cần nhiều ligase và nhiều origin parallel hơn.

**Ví dụ 3 — Tốc độ ràng buộc**: E. coli ~1000 nt/giây/fork. 1 bong bóng có 2 chạc → 2000 nt/giây cho cả bong bóng. Genome E. coli 4.6×10⁶ bp với 1 origin: thời gian = 4.6×10⁶ / 2000 ≈ **2300 giây ≈ 38 phút**. Khớp với thời gian nhân đôi tế bào E. coli thực tế (~30–40 phút).

**Ví dụ 4 — Vì sao người cần nhiều origin?**: pol người chỉ ~50 nt/giây. Nếu chỉ 1 origin, thời gian = 3×10⁹ / (2 × 50) = 3×10⁷ giây ≈ **~1 năm** — vô lý. Thực tế người có ~30,000–50,000 origin chạy song song; pha S (nhân đôi DNA trong chu kỳ tế bào) kéo dài ~8 giờ.

### ❓ Câu hỏi tự nhiên của người đọc

**Q: Vì sao primer làm bằng RNA mà không phải DNA?**
A: Vì primer cần khởi đầu *từ con số không*, không có đầu 3'-OH sẵn — chỉ **primase** (một loại RNA polymerase) làm được điều đó (RNA polymerase không cần primer). Sau đó RNA primer được thay bằng DNA để đảm bảo độ ổn định (RNA dễ phân hủy). Đây là sự "tận dụng" của tự nhiên: dùng RNA polymerase để khởi đầu vì nó có khả năng đó.

**Q: Đoạn Okazaki ở người ngắn hơn vi khuẩn (~150 vs ~1500 nt). Vì sao?**
A: Vì cách tổ chức DNA. DNA người được cuộn quanh nucleosome (1 nucleosome ~147 bp); polymerase chỉ tổng hợp được giữa các nucleosome, nên đoạn Okazaki bị "cắt" theo khoảng cách giữa các nucleosome. Vi khuẩn không có nucleosome → đoạn dài hơn.

**Q: Đoạn ở đầu mút (cuối) của mạch trễ thì sao?**
A: Đây là **vấn đề end-replication**: sau khi primer cuối cùng được cắt, mạch trễ có một đoạn ngắn ở đầu không có cách nào điền vào (không có chỗ cho primer "trước nó"). Mỗi lần nhân đôi, đầu mạch ngắn đi vài chục nt. Tế bào eukaryote dùng **telomere** (đoạn DNA lặp ở đầu) để hy sinh, và enzyme **telomerase** để khôi phục — chủ đề các lesson sau.

### ⚠ Lỗi thường gặp

- **Nói cả 2 mạch đều tổng hợp ngắt quãng**: SAI. Chỉ mạch trễ ngắt quãng; mạch dẫn đầu liên tục.
- **Nói helicase tổng hợp DNA**: SAI. Helicase chỉ **tháo** xoắn (bẻ liên kết hydrogen). Polymerase mới tổng hợp.
- **Quên ligase**: thiếu ligase, đoạn Okazaki vẫn rời rạc — mạch trễ không hoàn chỉnh, DNA con bị "rách".
- **Nhầm "Okazaki" cho mạch dẫn đầu**: đoạn Okazaki là đặc trưng riêng của mạch trễ.

### 🔁 Dừng lại tự kiểm tra

1. Vì sao tại 1 chạc nhân đôi cần *ít nhất 2 primer* để khởi đầu cả 2 mạch?
2. Một đoạn DNA 5000 bp được nhân đôi từ 1 origin. Đoạn Okazaki ~500 nt. Mỗi chạc cần bao nhiêu primer cho mạch trễ?

<details>
<summary>Đáp án</summary>

1. Hai mạch khuôn ngược chiều, mỗi mạch cần ít nhất 1 primer riêng để polymerase III bám vào. Mạch dẫn đầu cần 1 primer (vĩnh viễn dùng được cho cả mạch); mạch trễ cần nhiều primer (1 cho mỗi đoạn Okazaki). Vậy mỗi chạc tối thiểu 2 primer (1 dẫn đầu + 1 Okazaki đầu tiên).
2. 1 origin → 2 chạc đi ngược nhau. Mỗi chạc tổng hợp ~2500 bp. Đoạn Okazaki 500 nt → mỗi chạc cần ~2500/500 = **5 primer** cho mạch trễ. (Mạch dẫn đầu cần thêm 1 primer riêng.)
</details>

### 📝 Tóm tắt mục 4

- 6 enzyme tại chạc: helicase (tháo), topoisomerase (giải xoắn), SSB (giữ), primase (mồi), pol III (kéo dài), pol I (thay primer), ligase (nối).
- **Mạch dẫn đầu**: tổng hợp liên tục, 1 primer, theo cùng hướng fork.
- **Mạch trễ**: ngắt quãng thành **đoạn Okazaki** (~1500 nt vi khuẩn, ~150 nt người), mỗi đoạn 1 primer, ligase nối lại.
- Nguyên nhân sâu xa của leading/lagging: polymerase chỉ làm được 5'→3' + 2 mạch antiparallel.

---

## 5. Lượng hóa: tốc độ, origin, sai sót

### 💡 Trực giác / Hình dung

Genome người dài 1 mét DNA, tế bào nhân đôi xong trong 8 giờ. Bài toán: làm thế nào? Đáp án là **song song hóa** (parallelism) — chạy hàng chục nghìn "công trường" cùng lúc, mỗi công trường là 1 origin với 2 chạc đi ngược nhau.

### 5.1. Công thức cơ bản

**Thời gian nhân đôi**:

$$t = \\dfrac{\\text{chiều dài genome}}{\\text{số chạc} \\times \\text{tốc độ mỗi chạc}}$$

Với 1 origin → 2 chạc (đi 2 hướng ngược nhau từ origin). Với $k$ origin → $2k$ chạc.

**Số origin cần để hoàn thành trong T giây**:

$$k \\geq \\dfrac{\\text{chiều dài genome}}{2 \\times \\text{tốc độ} \\times T}$$

### 5.2. Sai sót và sửa lỗi

DNA polymerase có 3 mức sửa lỗi:
1. **Chọn nucleotide đúng**: tỉ lệ chọn sai ~1/10⁴ (do hình dạng cặp base).
2. **Proofreading (3'→5' exonuclease)**: ngay sau khi đính, polymerase kiểm tra; nếu sai, cắt ngược trở lại và thay → giảm sai sót xuống ~1/10⁷.
3. **Mismatch repair** (sau khi xong): protein khác đi tìm cặp lệch và sửa → giảm xuống ~1/10⁹.

### 5.3. Bốn ví dụ số cụ thể

**Ví dụ 1 — Tốc độ E. coli 1 origin**: genome 4.6×10⁶ bp, 1 origin, 1000 nt/s/fork, 2 fork. t = 4.6×10⁶ / (2 × 1000) = 2300 s ≈ **38 phút**. (Khớp thực tế.)

**Ví dụ 2 — Người 1 origin (giả định)**: genome 3×10⁹ bp, 1 origin, 50 nt/s/fork, 2 fork. t = 3×10⁹ / (2 × 50) = 3×10⁷ s ≈ **347 ngày**. → Không khả thi.

**Ví dụ 3 — Người với 30,000 origin**: t = 3×10⁹ / (2 × 50 × 30,000) = 1000 s ≈ **17 phút** *nếu* mọi origin chạy đồng thời. Thực tế ~8h vì các origin khởi động lệch giờ.

**Ví dụ 4 — Sai sót tích lũy**: genome người 3×10⁹ bp nhân đôi với tỉ lệ sai 1/10⁹ → trung bình **3 lỗi/lần nhân đôi**. Cơ thể có ~10¹³ tế bào, mỗi tế bào trong đời nhân đôi nhiều lần → tổng số đột biến tích lũy lớn. Đây là cơ sở phân tử cho **đột biến** (lesson sau) và **ung thư** (lỗi tích lũy ở gene kiểm soát chu kỳ tế bào).

### ❓ Câu hỏi tự nhiên của người đọc

**Q: Vì sao không đơn giản tăng số origin lên đến mức "đầy mặt DNA" để nhân đôi cực nhanh?**
A: Vì 2 lý do. (1) Mỗi origin cần bộ máy enzyme đầy đủ — bộ máy này tốn rất nhiều protein, không thể "vô hạn". (2) Các chạc gần nhau sẽ va vào nhau và phải dừng (terminate) — quá nhiều origin gây tắc nghẽn. Số origin được điều hòa: vừa đủ nhanh, vừa đủ ổn định.

**Q: Sao 3 lỗi/genome/lần nhân đôi không gây ung thư ngay?**
A: Vì (1) phần lớn lỗi rơi vào vùng không mã hóa (intron, vùng giữa gene); (2) ngay cả lỗi trong gene cũng có nhiều cơ chế sửa lỗi *sau* nhân đôi (mismatch repair, base excision repair...); (3) cơ thể có cơ chế **apoptosis** (tự sát có lập trình) để loại tế bào hỏng. Ung thư cần *nhiều* lỗi tích lũy ở các gene then chốt → thường xuất hiện sau 50-60 tuổi.

### ⚠ Lỗi thường gặp

- **Quên rằng 1 origin = 2 chạc**: tính số chạc = số origin là sai. Phải nhân 2.
- **Tính tỉ lệ sai trên 1 lần đính nucleotide vs trên 1 genome**: 1/10⁹ là **trên 1 nucleotide**; trên cả genome người 3×10⁹ bp → kỳ vọng 3 lỗi. Đây là 2 đại lượng khác nhau, đừng nhầm.

### 🔁 Dừng lại tự kiểm tra

1. Một virus có genome 100,000 bp. Nếu chỉ có 1 origin, tốc độ 500 nt/s, thời gian nhân đôi là bao nhiêu?
2. Genome 6×10⁹ bp (giả định một loài lớn), muốn nhân đôi trong 4 giờ, tốc độ 50 nt/s. Cần tối thiểu bao nhiêu origin?

<details>
<summary>Đáp án</summary>

1. t = 100,000 / (2 × 500) = 100 giây = **1 phút 40 giây**.
2. T = 4h = 14,400 s. k ≥ 6×10⁹ / (2 × 50 × 14,400) = 6×10⁹ / 1,440,000 ≈ **4167 origin**. Tối thiểu khoảng 4200 origin.
</details>

### 📝 Tóm tắt mục 5

- $t = \\dfrac{\\text{genome size}}{2k \\times v}$, với $k$ = số origin, $v$ = tốc độ mỗi chạc.
- E. coli: 1 origin, 1000 nt/s → 38 phút (khớp thực tế).
- Người: ~30,000 origin, 50 nt/s → 8 giờ (pha S).
- Sai sót cuối ~10⁻⁹ nhờ 3 lớp sửa lỗi. Genome người vẫn tích lũy ~3 lỗi/nhân đôi → cơ sở đột biến.

---

## 6. Bài tập + Lời giải chi tiết

### Bài tập

**Bài 1**: Cho mạch khuôn DNA 5'– \`ATGCATGCGGTACCGAT\` –3'. (a) Viết mạch bổ sung theo chiều 5'→3'. (b) Tính số liên kết hydrogen giữa 2 mạch.

**Bài 2**: Một phân tử DNA có 30% A. Trong 2000 nucleotide, tính số mỗi loại (A, T, G, C) và tổng số liên kết hydrogen.

**Bài 3**: Bắt đầu với 1 DNA gốc nặng (cả 2 mạch N15) trong môi trường N14. Sau 4 chu kỳ nhân đôi, có bao nhiêu DNA con? Bao nhiêu cái là "lai" (1 mạch N15 + 1 mạch N14)? Tỉ lệ % lai là bao nhiêu?

**Bài 4**: Một đoạn DNA 6000 bp được nhân đôi từ 1 origin. Đoạn Okazaki ~750 nt. Tính: (a) số chạc; (b) cho mỗi chạc, mạch trễ cần bao nhiêu primer; (c) tổng số primer cho toàn bộ bong bóng (cả mạch dẫn đầu và mạch trễ của 2 chạc).

**Bài 5**: Genome một loài vi khuẩn có 5×10⁶ bp, tốc độ polymerase 1000 nt/s/fork. (a) Với 1 origin, nhân đôi mất bao lâu? (b) Nếu loài này muốn nhân đôi trong 10 phút, cần tối thiểu bao nhiêu origin?

**Bài 6**: Vì sao tại chạc nhân đôi, mạch trễ phải tổng hợp ngắt quãng còn mạch dẫn đầu thì không? Trả lời từ nguyên lý 5'→3' của polymerase và tính antiparallel của DNA. Vẽ sơ đồ minh họa.

### Lời giải

**Bài 1**:
- (a) Mạch khuôn 5'– \`ATGCATGCGGTACCGAT\` –3' (17 nt). Bắt cặp đối song cho 3'– \`TACGTACGCCATGGCTA\` –5'. Đảo lại viết 5'→3': **5'– \`ATCGGTACCGCATGCAT\` –3'**.
- (b) Đếm base trên mạch khuôn: A=4, T=3, G=5, C=5. Cặp A–T = 4 (vì mỗi A của khuôn đi với 1 T của bổ sung) + 3 (vì mỗi T của khuôn đi với 1 A của bổ sung) = 7 cặp A–T. Cặp G–C = 5 + 5 = 10 cặp G–C. Tổng H = 7×2 + 10×3 = 14 + 30 = **44 liên kết hydrogen**. Kiểm tra: 17 nucleotide trên 1 mạch ↔ 17 cặp base; 7 + 10 = 17 ✓.

**Bài 2**:
- A = 30% → T = 30% (Chargaff). A+T = 60% → G+C = 40% → G = C = 20%.
- Trong 2000 nucleotide: A = T = 2000 × 30% = **600 mỗi loại**. G = C = 2000 × 20% = **400 mỗi loại**. Kiểm tra: 600+600+400+400 = 2000 ✓.
- 2000 nucleotide = 1000 cặp base (DNA mạch kép). Cặp A–T = 600 (mỗi A đi với 1 T); cặp G–C = 400. Tổng H = 600×2 + 400×3 = 1200 + 1200 = **2400 liên kết hydrogen**.

**Bài 3**:
- Sau 4 chu kỳ: 2⁴ = **16 DNA con**.
- Lai = luôn = **2** (vì chỉ có 2 mạch N15 gốc, mỗi mạch ở trong 1 DNA con).
- Nhẹ = 16 − 2 = 14.
- Tỉ lệ % lai = 2/16 = **12.5%**.

**Bài 4**:
- (a) 1 origin → **2 chạc** đi 2 hướng ngược nhau.
- (b) Mỗi chạc tổng hợp 6000/2 = 3000 bp. Mạch trễ ngắt quãng thành đoạn Okazaki 750 nt → cần 3000/750 = **4 primer/chạc** cho mạch trễ.
- (c) Mỗi chạc: 1 primer cho mạch dẫn đầu + 4 primer cho mạch trễ = 5 primer. Hai chạc: 2 × 5 = **10 primer**.

**Bài 5**:
- (a) t = 5×10⁶ / (2 × 1000) = 2500 s = **41 phút 40 giây**.
- (b) T = 10 phút = 600 s. k ≥ 5×10⁶ / (2 × 1000 × 600) = 5×10⁶ / 1,200,000 ≈ 4.17 → cần ít nhất **5 origin**.

**Bài 6**:
- **Nguyên nhân**: DNA polymerase chỉ tổng hợp được theo chiều **5'→3'** (chỉ thêm nucleotide vào đầu 3'-OH). Hai mạch DNA **đối song** (antiparallel) → tại chạc nhân đôi, hai mạch khuôn lộ ra theo hai chiều ngược nhau.
- **Mạch khuôn lộ đầu 3' về phía fork**: polymerase bám đầu 3' của primer rồi tổng hợp theo cùng chiều fork mở ra → tổng hợp **liên tục** (mạch dẫn đầu).
- **Mạch khuôn lộ đầu 5' về phía fork**: nếu polymerase muốn tổng hợp 5'→3', nó phải đi *ngược* chiều fork. Khi fork mở thêm một đoạn, polymerase đã đi xa rồi không quay lại được — phải **đặt primer mới** và tổng hợp một đoạn ngắn ngược về phía primer trước → tổng hợp **ngắt quãng** (mạch trễ), tạo các **đoạn Okazaki**.

Sơ đồ:
\`\`\`
                        Fork đi →
                          /
Mạch khuôn (lộ 3'): 3'━━━━━━━━━━━ 5'
Mạch mới (leading):      ──────→ 5'→3', liên tục
                          \\
Mạch khuôn (lộ 5'): 5'━━━━━━━━━━━ 3'
Mạch mới (lagging):   ←── ←── ←── từng đoạn Okazaki
                       ligase nối
\`\`\`

---

## 7. Liên kết và bài tiếp theo

- **Tiền đề đã dùng**:
  - Nucleotide, Chargaff — [\`../../01-Molecules-Cells/lesson-01-biomolecules/\`](../../01-Molecules-Cells/lesson-01-biomolecules/) (mục 6).
  - Gene, allele — [\`../lesson-01-mendelian-genetics/\`](../lesson-01-mendelian-genetics/).
  - Liên kết hydrogen — \`Chemistry/01-Structure/lesson-04-intermolecular-forces\`.
- **Bài tiếp theo**: [Lesson 03 — Phiên mã & dịch mã](../lesson-03-transcription-translation/) — DNA → RNA → protein. Lý do nhân đôi đúng quan trọng vì protein được làm theo bản DNA; lỗi ở DNA → lỗi ở protein.
- **Sẽ gặp lại**:
  - Lesson 04 (Điều hòa biểu hiện gene) — khi nào nhân đôi xảy ra trong chu kỳ tế bào (pha S).
  - Lesson 05 (Đột biến & công nghệ sinh học) — lỗi nhân đôi và sửa chữa DNA.

---

## 📝 Tổng kết Lesson 02

1. **Cấu trúc DNA**: xoắn kép, 2 mạch đối song 5'→3' và 3'→5', backbone đường-phosphate, base bên trong; ~10 bp/vòng, đường kính 2 nm.
2. **Bắt cặp bổ sung**: A–T (2 H-bond), G–C (3 H-bond); luôn purine + pyrimidine để giữ đường kính đều.
3. **Nhân đôi bán bảo toàn** (Meselson–Stahl 1958): mỗi DNA con = 1 mạch cũ + 1 mạch mới. Sau n chu kỳ từ 1 DNA nặng trong môi trường nhẹ → 2ⁿ DNA con, luôn 2 cái "lai".
4. **5'→3' và 3'-OH**: polymerase chỉ thêm nucleotide vào 3'-OH, cần primer khởi đầu. Năng lượng từ thủy phân PPi.
5. **6 enzyme tại chạc**: helicase, topoisomerase, SSB, primase, polymerase III/I, ligase. Mạch dẫn đầu (liên tục) vs mạch trễ (ngắt quãng thành đoạn Okazaki).
6. **Lượng hóa**: $t = \\dfrac{\\text{genome}}{2k \\times v}$. E. coli: 1 origin, ~38 phút. Người: ~30,000 origin, ~8 giờ pha S. Sai sót cuối ~10⁻⁹ nhờ 3 lớp sửa lỗi.

**Tiếp theo**: [Lesson 03 — Phiên mã & dịch mã](../lesson-03-transcription-translation/)
`;
