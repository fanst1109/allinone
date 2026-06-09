// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: Biology/02-Genetics-Evolution/lesson-03-transcription-translation/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 03 — Phiên mã & dịch mã

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Phát biểu được **luận đề trung tâm (central dogma)** của sinh học phân tử: DNA → RNA → Protein, và biết ngoại lệ ở virus retro (phiên mã ngược, reverse transcription).
- Mô tả chi tiết **phiên mã (transcription)**: RNA polymerase, promoter, mạch khuôn (template strand) so với mạch mã (coding strand), chiều tổng hợp 5'→3', bắt cặp DNA–RNA (A–U, T–A, G–C, C–G).
- Hiểu **xử lý pre-mRNA** ở eukaryote: thêm mũ 5' (5' cap), đuôi poly-A, cắt intron — nối exon (RNA splicing) — và biết vi khuẩn KHÔNG có bước này.
- Đọc thành thạo **mã di truyền (genetic code)**: codon, 64 bộ ba, mã hoá 20 amino acid, codon khởi đầu AUG = Met, 3 codon kết thúc UAA/UAG/UGA, tính chất "thoái hoá" (degenerate).
- Mô tả **dịch mã (translation)** từng bước: ribosome (tiểu phần lớn + nhỏ, vị trí A/P/E), tRNA mang anticodon (đối mã), 3 pha initiation → elongation → termination.
- **Tính được** (a) chiều dài mRNA cần thiết cho 1 chuỗi peptide cho trước, (b) số codon / số amino acid trong 1 đoạn mRNA, (c) số kiểu mRNA khả dĩ mã hoá 1 chuỗi peptide khi tính tới mã thoái hoá, (d) hậu quả của các kiểu đột biến điểm (silent / missense / nonsense / frameshift) lên peptide.

## Kiến thức tiền đề

- **DNA và nhân đôi (replication)** — [\`../lesson-02-dna-replication/\`](../lesson-02-dna-replication/). Cần nhớ: DNA xoắn kép, 2 mạch đối song (antiparallel), chiều 5'→3', bắt cặp A–T / G–C.
- **Nucleic acid và protein** (đơn phân, bậc cấu trúc) — [\`../../01-Molecules-Cells/lesson-01-biomolecules/\`](../../01-Molecules-Cells/lesson-01-biomolecules/). Nhớ §6: nucleotide gồm đường + phosphate + base; RNA dùng U thay T; protein nối từ amino acid bằng liên kết peptide.
- **Ribosome và cấu trúc tế bào** — [\`../../01-Molecules-Cells/lesson-02-cell-structure/\`](../../01-Molecules-Cells/lesson-02-cell-structure/). Nhớ: ribosome có 2 tiểu phần, nằm tự do trong bào tương (cytosol) hoặc bám lưới nội chất hạt (rough ER); ở eukaryote, phiên mã xảy ra trong **nhân**, dịch mã trong **bào tương**.

---

## 1. Luận đề trung tâm — DNA → RNA → Protein

### 💡 Trực giác / Hình dung

Hãy hình dung DNA là **bản thiết kế gốc** cất trong két sắt (nhân tế bào) — quý, dày, không bao giờ đưa ra ngoài. Khi xưởng (ribosome ở bào tương) cần dựng 1 sản phẩm (protein), thư ký không bê két ra; thư ký **photocopy** đúng 1 trang cần dùng (đó là mRNA) rồi gửi ra xưởng. Xưởng đọc bản photo, lắp ráp sản phẩm. Photocopy hỏng → vứt đi, bản gốc vẫn an toàn.

Luận đề trung tâm chính là cái mạch "bản gốc → bản photo → sản phẩm" đó: **DNA → (phiên mã) → RNA → (dịch mã) → Protein**.

### 1.1. Phát biểu chính thức (Crick, 1958)

Thông tin di truyền trong tế bào chảy theo chiều:

\`\`\`
   replication
       ↻
       DNA  ─────────►  RNA  ─────────►  Protein
            phiên mã          dịch mã
         (transcription)    (translation)
\`\`\`

- **DNA → DNA**: nhân đôi (replication), học ở [\`Lesson 02\`](../lesson-02-dna-replication/).
- **DNA → RNA**: phiên mã (transcription) — §2 bài này.
- **RNA → Protein**: dịch mã (translation) — §4 bài này.
- **Không có chiều Protein → RNA hay Protein → DNA**. Thông tin một khi đã thành protein là "đường một chiều".

### 1.2. Ngoại lệ — retrovirus và phiên mã ngược

HIV và các retrovirus mang vật chất di truyền là RNA. Khi xâm nhập tế bào, chúng dùng enzyme **reverse transcriptase** để tổng hợp DNA từ RNA (chiều **RNA → DNA**, ngược luận đề), rồi cài DNA này vào hệ gen người. Đây không phá luận đề mà chỉ **thêm 1 mũi tên** vào sơ đồ.

### 1.3. Bốn ví dụ minh hoạ con đường thông tin

**Ví dụ 1 — Hemoglobin (huyết sắc tố)**: Gen \`HBB\` trên nhiễm sắc thể 11 (DNA) → phiên mã thành mRNA → dịch mã ở ribosome thành chuỗi β-globin (146 amino acid) → 2α + 2β + 4 heme = hemoglobin chở O₂.

**Ví dụ 2 — Insulin**: Gen \`INS\` trên nhiễm sắc thể 11 → preproinsulin mRNA → preproinsulin (110 aa) → cắt → insulin trưởng thành (51 aa, 2 chuỗi A + B nối bằng cầu disulfide).

**Ví dụ 3 — Tóc và móng (keratin)**: Gen \`KRT\` → mRNA → keratin → protein cấu trúc tạo tóc, móng, lớp sừng da.

**Ví dụ 4 — Lactose intolerance**: Người trưởng thành "không dung nạp lactose" vì gen \`LCT\` (mã hoá enzyme lactase) **không còn được phiên mã mạnh** sau cai sữa → ít mRNA → ít enzyme → không phân giải được lactose trong sữa.

### ❓ Câu hỏi tự nhiên của người đọc

**Q: Vì sao không dịch thẳng DNA → Protein mà phải qua RNA trung gian?**
A: 3 lý do. (1) **An toàn**: DNA là bản gốc, không thể đem ra khỏi nhân; mRNA là bản tạm, hỏng thì sao chép lại. (2) **Khuếch đại**: 1 gen có thể được phiên mã thành **hàng nghìn mRNA**, mỗi mRNA dịch ra nhiều protein → 1 gen → triệu protein khi cần. (3) **Điều hoà**: tế bào có thể "tắt mở" gen bằng cách kiểm soát phiên mã (Lesson 04) — linh hoạt hơn nhiều so với việc đụng vào DNA gốc.

**Q: Mọi tế bào trong cơ thể có cùng DNA, sao lại khác chức năng (tế bào gan vs tế bào cơ vs tế bào thần kinh)?**
A: Cùng DNA, nhưng **mỗi loại tế bào phiên mã các gen khác nhau**. Tế bào gan bật gen \`ALB\` (albumin), tế bào cơ bật gen \`MYH\` (myosin), tế bào thần kinh bật gen \`SYN\` (synapsin)... Đây là chủ đề **điều hoà gen** ở [Lesson 04](../lesson-04-gene-regulation/).

### 📝 Tóm tắt mục 1

- Luận đề trung tâm: **DNA → RNA → Protein** (chiều thuận; có ngoại lệ ngược ở retrovirus).
- DNA là bản gốc ở nhân; RNA là bản photo mang ra bào tương; protein là sản phẩm cuối.
- Một bản gốc → nhiều bản photo → nhiều protein → bộ máy khuếch đại + linh hoạt.

---

## 2. Phiên mã (transcription) — DNA thành mRNA

### 💡 Trực giác / Hình dung

Phiên mã giống **chép tay 1 trang sách**. RNA polymerase là "thư ký": tìm đúng trang cần chép (promoter), kéo dây thư ký xuống đọc trang gốc (mạch khuôn), nhưng viết bằng "mực mới" — chữ T trong bản gốc được thay bằng chữ U trong bản chép. Chép xong tới đoạn "hết trang" (terminator) thì rời đi, mang bản chép (mRNA) ra ngoài nhân.

### 2.1. Ba bước phiên mã

| Bước | Tên | Diễn biến |
|------|-----|-----------|
| 1 | **Khởi đầu** (initiation) | RNA polymerase nhận diện và bám vào **promoter** (vùng DNA "biển báo bắt đầu", thường có chuỗi TATA box ở eukaryote). Tháo xoắn DNA tại đó. |
| 2 | **Kéo dài** (elongation) | RNA polymerase đọc **mạch khuôn (template strand)** theo chiều 3'→5', tổng hợp mRNA theo chiều 5'→3', nucleotide vào theo bắt cặp bổ sung. |
| 3 | **Kết thúc** (termination) | Gặp trình tự "terminator" → RNA polymerase rời DNA, mRNA được giải phóng, DNA xoắn lại. |

Chú ý chiều: enzyme đọc **xuôi ngược nhau** — mạch khuôn 3'→5', mRNA 5'→3'. Đây là quy luật bắt buộc của mọi polymerase tổng hợp nucleic acid (giống polymerase nhân đôi DNA ở [Lesson 02](../lesson-02-dna-replication/)).

### 2.2. Mạch khuôn vs mạch mã — chỗ dễ nhầm nhất

DNA có 2 mạch. **Chỉ 1 mạch** được dùng làm khuôn cho 1 gen cụ thể:

- **Mạch khuôn (template strand / antisense strand)**: là mạch enzyme đọc; mRNA bắt cặp bổ sung với nó.
- **Mạch mã (coding strand / sense strand)**: là mạch còn lại; **trình tự của nó giống hệt mRNA, chỉ khác T → U**.

Ví dụ một đoạn DNA:

\`\`\`
Mạch mã (coding):    5'- A T G C G T A A A T G A -3'
Mạch khuôn:          3'- T A C G C A T T T A C T -5'
                          ↓ phiên mã ↓
mRNA:                5'- A U G C G U A A A U G A -3'
\`\`\`

So sánh: mRNA giống mạch mã, chỉ thay T bằng U.

### 2.3. Bắt cặp DNA–RNA

| DNA (mạch khuôn) | RNA (mRNA) | Liên kết H |
|:---:|:---:|:---:|
| A | U | 2 |
| T | A | 2 |
| G | C | 3 |
| C | G | 3 |

**Khác biệt nhân đôi DNA**: ở phiên mã, **A bắt cặp với U** (không phải T), vì sản phẩm là RNA dùng uracil thay thymine.

### 2.4. Xử lý pre-mRNA ở eukaryote — 3 bước trang điểm

Bản chép thô (pre-mRNA) chưa đem dịch mã ngay được; phải qua 3 bước "trang điểm" trong nhân:

1. **Thêm mũ 5' (5' cap)** — gắn 1 nucleotide guanine cải biến (7-methylguanosine) ở đầu 5'. Vai trò: bảo vệ mRNA khỏi enzyme cắt; là tín hiệu cho ribosome bám vào khi dịch mã.
2. **Thêm đuôi poly-A (poly-A tail)** — gắn 50–250 adenine ở đầu 3'. Vai trò: ổn định mRNA; điều khiển tuổi thọ mRNA trong bào tương.
3. **Cắt intron, nối exon (RNA splicing)** — gen eukaryote có vùng "có nghĩa" (**exon**) xen kẽ vùng "không có nghĩa" (**intron**). Bộ máy **spliceosome** cắt intron ra và nối các exon lại. Một số gen còn cho phép **alternative splicing** (nối khác kiểu) → 1 gen sinh nhiều protein khác nhau.

**Vi khuẩn (prokaryote) KHÔNG** có nhân, KHÔNG có intron, KHÔNG có 3 bước này → mRNA vừa phiên mã xong là dịch mã luôn (thậm chí ribosome bám vào khi mRNA chưa hoàn tất).

### 2.5. Bốn ví dụ số cụ thể

**Ví dụ 1 — Viết mRNA từ mạch khuôn**:
- Mạch khuôn: \`3'- T A C G T A C C G A T T -5'\`
- mRNA: \`5'- A U G C A U G G C U A A -3'\`
- Cách làm: với mỗi base trên mạch khuôn, viết base bổ sung trên mRNA (T→A, A→U, C→G, G→C). Lưu ý viết theo chiều 5'→3'.

**Ví dụ 2 — Viết mRNA từ mạch mã**:
- Mạch mã: \`5'- A T G G C T C A A T A A -3'\`
- mRNA: \`5'- A U G G C U C A A U A A -3'\` (giống hệt, T → U).

**Ví dụ 3 — Một gen người dài 9000 base, có 8 exon tổng cộng 1500 base. Tính độ dài mRNA trưởng thành (không tính cap và poly-A)**:
- Phần intron = 9000 − 1500 = 7500 base bị cắt.
- mRNA trưởng thành = tổng exon = **1500 nucleotide**.
- (Nếu tính thêm cap = 1 nt và poly-A ≈ 200 nt thì mRNA ≈ 1701 nt; cap và poly-A không mã hoá amino acid.)

**Ví dụ 4 — Tốc độ phiên mã**:
- RNA polymerase II ở người tổng hợp ~25 nucleotide/giây.
- Gen \`DMD\` (dystrophin) dài ~2.4 triệu base (lớn nhất ở người). Thời gian phiên mã thô ≈ 2,400,000 / 25 = **96,000 giây ≈ 16 giờ** (giải thích vì sao một số gen dài cần thời gian rất lâu để biểu hiện).

### ⚠ Lỗi thường gặp

- **Nhầm "mạch khuôn cho mRNA giống mạch mã"** — SAI. mRNA giống **mạch mã (coding strand)**, không phải khuôn. Mạch khuôn là cái enzyme đọc, không phải cái mRNA bắt chước về trình tự.
- **Quên đổi T → U** khi viết mRNA. Không có thymine trong RNA.
- **Tổng hợp mRNA theo chiều 3'→5'** — SAI. mRNA luôn được tổng hợp 5'→3'; mạch khuôn được đọc 3'→5'.
- **Nghĩ vi khuẩn cũng cắt intron** — vi khuẩn không có intron trong gen mã hoá protein chuẩn; cắt intron là đặc trưng eukaryote.

### ❓ Câu hỏi tự nhiên của người đọc

**Q: RNA polymerase khác DNA polymerase ở chỗ nào?**
A: 3 khác biệt chính. (1) Sản phẩm là RNA chứ không phải DNA. (2) RNA polymerase **không cần primer (đoạn mồi)** — có thể tự khởi đầu chuỗi mới, trong khi DNA polymerase bắt buộc cần primer. (3) RNA polymerase **không có khả năng sửa sai (proofreading)** mạnh như DNA polymerase → mRNA có thể có ~1 lỗi/10,000 base, nhưng vì mRNA chỉ tồn tại ngắn nên hậu quả không trầm trọng.

**Q: Vì sao tế bào "phí phạm" tạo intron rồi cắt bỏ?**
A: Intron không phải "rác". (1) Cho phép **alternative splicing** — 1 gen sinh nhiều protein (gen người trung bình ~3 isoform). (2) Intron là nơi chứa **trình tự điều hoà** (enhancer, silencer). (3) Intron có thể chứa các RNA nhỏ chức năng (microRNA). (4) Tiến hoá: thêm/bớt exon dễ hơn viết lại 1 gen từ đầu.

### 🔁 Dừng lại tự kiểm tra

1. Cho mạch khuôn DNA \`3'- A C G T T A C G G C A T -5'\`. Viết mRNA tạo ra.
2. Một gen ở người dài 12,000 base có 6 exon dài lần lượt 200, 150, 400, 100, 250, 300 base. Tính (a) chiều dài mRNA trưởng thành (không tính cap + poly-A), (b) tổng chiều dài intron.

<details>
<summary>Đáp án</summary>

1. mRNA bổ sung với khuôn, viết theo chiều 5'→3', A↔U, C↔G:
   - Khuôn 3'→5': A C G T T A C G G C A T
   - mRNA 5'→3': **\`5'- U G C A A U G C C G U A -3'\`** (mỗi base: A→U, C→G, G→C, T→A).

2. (a) Tổng exon = 200 + 150 + 400 + 100 + 250 + 300 = **1400 nucleotide**.
   (b) Tổng intron = 12,000 − 1,400 = **10,600 nucleotide** bị cắt.
</details>

### 📝 Tóm tắt mục 2

- Phiên mã gồm 3 bước: initiation (RNA pol bám promoter), elongation (đọc khuôn 3'→5', tổng hợp mRNA 5'→3'), termination.
- Mạch khuôn ≠ mạch mã: mRNA giống mạch mã (chỉ T→U), bổ sung với mạch khuôn.
- Eukaryote xử lý pre-mRNA: cap 5' + poly-A 3' + cắt intron / nối exon. Vi khuẩn không có bước này.

---

## 3. Mã di truyền (genetic code) — bộ chữ của sự sống

### 💡 Trực giác / Hình dung

Mã di truyền giống **bảng chữ cái Morse**: mỗi cụm 3 dấu chấm/gạch tương ứng với 1 chữ cái. Ở đây, **mỗi 3 nucleotide (1 codon) → 1 amino acid**. Có 4 ký tự (A, U, G, C), cụm 3 ký tự → $4^3 = 64$ **codon** khả dĩ, dư thừa để mã hoá 20 amino acid → một số amino acid được mã hoá bởi nhiều codon (gọi là **thoái hoá / degenerate**).

### 3.1. Quy ước đếm codon

mRNA được đọc **từ codon khởi đầu AUG**, theo từng cụm 3 nucleotide liên tục, không gối lên nhau, theo chiều 5'→3', đến khi gặp 1 trong 3 codon kết thúc thì dừng.

\`\`\`
mRNA:     5'- ... A U G | C G U | A A A | G G C | U A A | ... -3'
                 [Met]  [Arg]  [Lys]  [Gly]  [STOP]
              khởi đầu                       kết thúc
\`\`\`

Đoạn trước AUG đầu (5' UTR) và sau codon stop (3' UTR) không được dịch.

### 3.2. Bốn codon đặc biệt phải nhớ

| Codon | Vai trò | Amino acid |
|:---:|---------|:---:|
| **AUG** | Khởi đầu (start) | Methionine (Met, M) |
| **UAA** | Kết thúc (stop, "ochre") | — |
| **UAG** | Kết thúc (stop, "amber") | — |
| **UGA** | Kết thúc (stop, "opal") | — |

3 codon stop không mã hoá amino acid nào → khi ribosome chạm phải, peptide được giải phóng.

### 3.3. Bốn đặc tính của mã di truyền

1. **Phổ thông (universal)** — gần như mọi sinh vật từ vi khuẩn đến người dùng chung bảng mã. Ngoại lệ nhỏ: một số codon trong ti thể (mitochondria) hơi khác.
2. **Không gối lên nhau (non-overlapping)** — codon n và codon n+1 không chia chung nucleotide. Đọc xong 3 nucleotide thì nhảy luôn sang 3 nucleotide kế.
3. **Liên tục, không khoảng trống (continuous)** — không có "dấu cách" giữa các codon; đọc liên tục từ start tới stop.
4. **Thoái hoá (degenerate)** — 64 codon → 20 amino acid (+ stop) → trung bình mỗi amino acid có ~3 codon. Ví dụ Leucine có **6 codon** (UUA, UUG, CUU, CUC, CUA, CUG); Methionine và Tryptophan chỉ có **1 codon** duy nhất.

### 3.4. Bốn ví dụ số cụ thể

**Ví dụ 1 — Đếm codon và amino acid từ chiều dài mRNA**:
- mRNA mã hoá (vùng ORF, không tính UTR) dài 300 nucleotide.
- Số codon = 300 / 3 = 100 codon.
- Trong đó có 1 codon stop không mã hoá → **99 amino acid** trong peptide (kể cả Met khởi đầu).

**Ví dụ 2 — Dịch mã đoạn \`5'- AUG CGU AAA UGA -3'\`**:
- Codon 1: AUG → Met (khởi đầu).
- Codon 2: CGU → Arg.
- Codon 3: AAA → Lys.
- Codon 4: UGA → STOP.
- Peptide: **Met–Arg–Lys** (3 amino acid; stop không tính).

**Ví dụ 3 — Số mRNA khả dĩ mã hoá 1 peptide ngắn**:
- Peptide: Met–Pro (M–P).
- Met có **1** codon (AUG). Pro có **4** codon (CCU, CCC, CCA, CCG). Cộng thêm 1 codon stop (3 lựa chọn).
- Số kiểu mRNA mã hoá: 1 × 4 × 3 = **12 kiểu mRNA** khác nhau cùng cho ra peptide Met–Pro.

**Ví dụ 4 — Hệ quả của tính thoái hoá**:
- Codon \`UUA\` và \`UUG\` đều mã hoá Leu. Nếu đột biến đổi \`UUA\` → \`UUG\`, amino acid **không đổi** → đây là đột biến **đồng nghĩa (silent mutation)**. Đây là lý do nhiều thay đổi DNA "không gây hậu quả".

### ⚠ Lỗi thường gặp

- **Đọc codon theo chiều 3'→5'** — SAI. Codon đọc 5'→3' của mRNA.
- **Tính cả stop là 1 amino acid** — SAI. Stop không mã hoá amino acid. Chiều dài peptide = (số codon đọc trước stop) — tức là không tính codon stop.
- **Nhầm "mã di truyền" với "trình tự gen"** — mã di truyền là cái **bảng tra** codon→amino acid (giống bảng cửu chương), KHÔNG phải trình tự cụ thể của 1 gen.
- **Quên rằng phải đọc đúng khung (reading frame)**. Cùng 1 chuỗi nucleotide, bắt đầu lệch 1 base → ra peptide hoàn toàn khác.

### ❓ Câu hỏi tự nhiên của người đọc

**Q: Vì sao là 3 nucleotide/codon, không phải 2 hay 4?**
A: Tính toán đơn giản. (1) 2 nucleotide: $4^2 = 16$ tổ hợp < 20 amino acid → KHÔNG đủ. (2) 3 nucleotide: $4^3 = 64 \\geq 20$ → ĐỦ (và còn dư để có codon stop + thoái hoá làm "đệm" chống đột biến). (3) 4 nucleotide: $4^4 = 256$ → đủ nhưng phí phạm thông tin. Tự nhiên chọn 3 — tối thiểu mà vẫn đủ.

**Q: Có mã di truyền nào ngoại lệ không?**
A: Có vài ngoại lệ nhỏ:
- Ti thể (mitochondria) người: UGA thường là stop, nhưng trong ti thể UGA = Tryptophan.
- Một số ciliate (động vật nguyên sinh): UAA, UAG mã hoá Gln thay vì stop.
- Selenocysteine và pyrrolysine: 2 amino acid "thứ 21, 22" được mã hoá bởi UGA/UAG trong các điều kiện đặc biệt.

Nhưng nhìn chung, **>99% trường hợp dùng cùng 1 bảng mã** — đó là bằng chứng mạnh cho thuyết tiến hoá: mọi sự sống có **tổ tiên chung**.

**Q: Vì sao 6 codon mã hoá Leu nhưng chỉ 1 codon cho Met?**
A: Mã thoái hoá thường thoái hoá ở **vị trí thứ 3 của codon** ("wobble position"). Các amino acid có gốc R hay xuất hiện trong protein (như Leu, Ser, Arg) được mã hoá bởi nhiều codon → tăng "đệm" chống đột biến. Met hiếm hơn nên không cần nhiều codon. Đây là tối ưu hoá tiến hoá.

### 🔁 Dừng lại tự kiểm tra

1. Một mRNA có vùng ORF dài 1500 nucleotide (tính từ AUG tới stop, gồm cả stop). Peptide tạo ra dài bao nhiêu amino acid?
2. Cho mRNA \`5'- AUG GCU UCG UAA -3'\`. Viết peptide tạo ra (tra: GCU = Ala, UCG = Ser).
3. Cùng chuỗi nhưng đọc lệch 1 base, bắt đầu từ vị trí 2: \`UGG CUU CGU AA\`. Có bao nhiêu codon hoàn chỉnh? Có codon stop không?

<details>
<summary>Đáp án</summary>

1. 1500 / 3 = 500 codon, trừ 1 stop → **499 amino acid**.
2. AUG → Met, GCU → Ala, UCG → Ser, UAA → STOP. Peptide = **Met–Ala–Ser** (3 amino acid).
3. Từ vị trí 2: UGG | CUU | CGU | AA (dở dang). UGG = Trp, CUU = Leu, CGU = Arg. Có 3 codon hoàn chỉnh, không có codon stop → peptide đọc dở: **Trp–Leu–Arg** (và 2 nt thừa). Đây là lý do **đột biến chèn/xoá 1 base (frameshift)** phá huỷ toàn bộ peptide phía sau.
</details>

### 📝 Tóm tắt mục 3

- 1 codon = 3 nucleotide; $4^3 = 64$ codon; mã hoá 20 amino acid + 3 stop (UAA, UAG, UGA).
- AUG vừa là codon khởi đầu vừa mã hoá Met.
- Đặc tính: phổ thông, không gối, liên tục, thoái hoá.
- Đọc đúng khung (reading frame) là tối quan trọng — lệch 1 base = peptide hoàn toàn khác.

---

## 4. Dịch mã (translation) — mRNA thành protein

### 💡 Trực giác / Hình dung

Ribosome là **dây chuyền lắp ráp**; mRNA là **bản hướng dẫn** chạy trên dây chuyền; tRNA là **người giao hàng**: mỗi tRNA mang đúng 1 loại amino acid và có "thẻ tên" (anticodon) khớp với 1 codon trên mRNA. Khi đọc codon, ribosome gọi đúng người giao hàng có thẻ khớp, lấy amino acid, gắn vào chuỗi peptide đang xây.

### 4.1. Ba người chơi chính

| Thành phần | Vai trò |
|------------|---------|
| **Ribosome** | "Dây chuyền" — gồm 2 tiểu phần (lớn + nhỏ); có 3 khe **A** (aminoacyl, nhận tRNA mới), **P** (peptidyl, giữ peptide đang dài ra), **E** (exit, đẩy tRNA rời). |
| **mRNA** | "Bản hướng dẫn" — kéo qua ribosome 1 codon mỗi lần. |
| **tRNA** | "Người giao hàng" — mỗi tRNA có anticodon (đối mã) 3 base ở một đầu, gắn 1 amino acid đặc trưng ở đầu kia. Anticodon bắt cặp bổ sung với codon trên mRNA. |

Có ~45 loại tRNA trong tế bào, tải đủ cho 20 amino acid (nhờ "wobble base pairing" — bắt cặp linh động ở vị trí thứ 3 — một số tRNA đọc được nhiều codon).

### 4.2. Ba pha dịch mã

**Pha 1 — Khởi đầu (initiation)**:
1. Tiểu phần nhỏ của ribosome bám vào mRNA tại mũ 5' (eukaryote) hoặc trình tự Shine-Dalgarno (vi khuẩn).
2. Trượt đến codon AUG đầu tiên.
3. tRNA-Met (mang Met) ghép anticodon \`3'-UAC-5'\` với codon \`5'-AUG-3'\`, đặt vào khe **P**.
4. Tiểu phần lớn lắp vào → ribosome hoàn chỉnh, sẵn sàng.

**Pha 2 — Kéo dài (elongation)**: lặp 3 bước cho mỗi codon mới:
1. **Codon recognition**: tRNA mới (mang amino acid kế tiếp) vào khe **A**, anticodon khớp codon.
2. **Peptide bond formation**: ribosome xúc tác liên kết peptide nối amino acid ở khe A với chuỗi peptide ở khe P. Bây giờ chuỗi peptide nằm ở tRNA tại khe A.
3. **Translocation**: ribosome trượt 1 codon → tRNA cũ (rỗng) sang khe **E** rồi rời ra; tRNA chở peptide từ A sang P; khe A trống, sẵn sàng nhận tRNA tiếp.

Tốc độ ở người: ~5–6 codon/giây ≈ 5–6 amino acid/giây.

**Pha 3 — Kết thúc (termination)**:
1. Ribosome gặp 1 codon stop (UAA / UAG / UGA).
2. Không tRNA nào khớp; thay vào đó là **release factor** (protein) chen vào.
3. Liên kết giữa peptide và tRNA cuối bị thuỷ phân → peptide tự do rơi ra.
4. Ribosome tách thành 2 tiểu phần, mRNA được giải phóng để dịch lại hoặc bị phân huỷ.

### 4.3. Bốn ví dụ số

**Ví dụ 1 — Walk-through đầy đủ \`5'- AUG CGU AAA UGA -3'\`**:

| Vòng | Codon đọc | tRNA vào khe A | Anticodon | Amino acid | Sau khi xảy ra |
|------|-----------|----------------|-----------|------------|----------------|
| Init | AUG | tRNA-Met | 3'-UAC-5' | Met (M) | Met ở khe P, A trống |
| 1 | CGU | tRNA-Arg | 3'-GCA-5' | Arg (R) | Met–Arg ở khe P (sau peptide bond + translocation) |
| 2 | AAA | tRNA-Lys | 3'-UUU-5' | Lys (K) | Met–Arg–Lys ở khe P |
| 3 | UGA | (release factor) | — | STOP | Peptide giải phóng |

Peptide cuối: **Met–Arg–Lys** (M-R-K), 3 amino acid.

**Ví dụ 2 — Một gen người mã hoá protein 300 amino acid. Chiều dài ORF của mRNA?**
- 300 amino acid (kể cả Met khởi đầu) → 300 codon mã hoá + 1 codon stop = 301 codon.
- ORF = 301 × 3 = **903 nucleotide**. (Chưa tính 5' UTR, 3' UTR, cap, poly-A.)

**Ví dụ 3 — Số kiểu mRNA mã hoá peptide Met–Leu–Ser–Stop**:
- Met: 1 codon. Leu: 6 codon. Ser: 6 codon. Stop: 3 codon.
- Số kiểu mRNA = 1 × 6 × 6 × 3 = **108 kiểu mRNA** khác nhau, cùng cho cùng 1 peptide.

**Ví dụ 4 — Thời gian dịch mã một protein 1000 aa**:
- Tốc độ ~5 aa/giây → 1000 / 5 = **200 giây ≈ 3 phút 20 giây**.
- (Mỗi mRNA thường có nhiều ribosome dịch song song — "polysome" — nên tế bào sản xuất protein rất nhanh.)

### ⚠ Lỗi thường gặp

- **Nhầm anticodon viết cùng chiều codon** — codon trên mRNA viết 5'→3', anticodon trên tRNA viết theo chiều **đối song (3'→5')** để cặp đúng. Khi viết "AUG ↔ UAC", phải hiểu UAC là 3'→5' của tRNA.
- **Nghĩ ribosome đọc DNA** — KHÔNG. Ribosome chỉ đọc mRNA. DNA không bao giờ rời nhân (trừ ti thể).
- **Quên rằng Met khởi đầu thường bị cắt sau dịch mã** ở nhiều protein người. Nhưng khi tính từ codon → amino acid, Met vẫn được tính là amino acid đầu chuỗi.
- **Nghĩ 1 mRNA chỉ dịch được 1 protein** — sai, có thể có **nhiều ribosome bám đồng thời** (polysome). 1 mRNA → hàng chục protein cùng lúc.

### ❓ Câu hỏi tự nhiên của người đọc

**Q: Năng lượng cho dịch mã đến từ đâu?**
A: Từ GTP và ATP. (1) Gắn amino acid lên tRNA tốn 1 ATP. (2) Mỗi vòng elongation tốn 2 GTP (1 cho codon recognition, 1 cho translocation). Tổng cộng ~4 liên kết phosphate giàu năng lượng cho mỗi amino acid thêm vào — đắt đỏ, vì vậy tế bào không tổng hợp protein bừa bãi.

**Q: Vì sao Methionine (M) là amino acid khởi đầu? Sao không là amino acid khác?**
A: Mọi sinh vật chọn Met vì lý do tiến hoá — codon AUG vừa "dễ nhận biết" (chỉ có 1 codon cho Met → không nhập nhằng), vừa thường nằm trong vùng dễ tiếp cận của ribosome (gần mũ 5' ở eukaryote, gần Shine-Dalgarno ở vi khuẩn). Nhiều protein cắt bỏ Met đầu chuỗi sau khi dịch mã xong (post-translational modification), nhưng vai trò "biển báo START" của Met không thay được.

**Q: Nếu mRNA đang dịch bị lỗi (thiếu stop, hoặc có lỗi khác), tế bào xử lý ra sao?**
A: Tế bào có cơ chế kiểm soát chất lượng:
- **NMD (Nonsense-Mediated Decay)**: phá huỷ mRNA có codon stop sớm (do đột biến nonsense).
- **No-go decay**: ribosome bị kẹt trên mRNA → mRNA bị phân huỷ.
- **Non-stop decay**: mRNA không có codon stop → ribosome đi tới hết đuôi poly-A → tín hiệu phá huỷ.

### 🔁 Dừng lại tự kiểm tra

1. Một protein người dài 100 amino acid. Tính tổng số nucleotide ở vùng ORF của mRNA.
2. Cho mRNA \`5'- AUG UUC GGC UAG -3'\`. Tra: UUC = Phe, GGC = Gly. Viết peptide.
3. Tính tổng số kiểu mRNA mã hoá peptide Met–Trp–Stop. (Tra: Trp có 1 codon UGG; 3 codon stop.)

<details>
<summary>Đáp án</summary>

1. 100 codon mã hoá + 1 codon stop = 101 codon × 3 = **303 nucleotide**.
2. AUG → Met, UUC → Phe, GGC → Gly, UAG → STOP. Peptide = **Met–Phe–Gly** (3 aa).
3. Met (1) × Trp (1) × Stop (3) = **3 kiểu mRNA** khác nhau (\`AUG-UGG-UAA\`, \`AUG-UGG-UAG\`, \`AUG-UGG-UGA\`).
</details>

### 📝 Tóm tắt mục 4

- Ribosome (2 tiểu phần, khe A/P/E) + mRNA + tRNA = 3 thành phần dịch mã.
- 3 pha: initiation (AUG, tRNA-Met vào khe P) → elongation (codon recognition → peptide bond → translocation) → termination (stop codon + release factor).
- Tốc độ ~5 aa/giây; tốn ~4 phosphate cao năng/aa.
- 1 mRNA có thể được nhiều ribosome dịch song song (polysome).

---

## 5. Đột biến điểm và hậu quả lên peptide

### 💡 Trực giác / Hình dung

Hệ thống phiên mã + dịch mã giống 1 dây chuyền in báo: bản gốc DNA → bản chép mRNA → bản in protein. Một lỗi đánh máy ở DNA → lỗi sao chép sang mRNA → lỗi in trong protein. Nhưng nhờ mã di truyền **thoái hoá**, một số lỗi đánh máy không gây hậu quả (silent), số khác đổi 1 chữ (missense), số khác làm máy ngừng giữa chừng (nonsense), số khác làm cả trang dịch sai (frameshift).

### 5.1. Bốn kiểu đột biến điểm

| Kiểu | Mô tả | Ví dụ ở mức codon | Hậu quả |
|------|------|-------------------|---------|
| **Đồng nghĩa (silent)** | Đổi 1 base, codon mới vẫn mã hoá cùng amino acid | \`UUA → UUG\`: cả 2 = Leu | Không đổi peptide |
| **Sai nghĩa (missense)** | Codon mới mã hoá amino acid khác | \`GAG → GUG\`: Glu → Val (sickle cell anemia) | Đổi 1 amino acid; có thể nặng/nhẹ |
| **Vô nghĩa (nonsense)** | Codon mới = stop sớm | \`UAU → UAA\`: Tyr → STOP | Peptide cụt ngắn, thường mất chức năng |
| **Frameshift** | Chèn/xoá 1-2 base → đổi khung đọc | xoá 1 base làm mọi codon sau lệch | Toàn bộ peptide sau điểm đột biến sai → thường thảm hoạ |

### 5.2. Bốn ví dụ số cụ thể

**Ví dụ 1 — Silent**: codon \`CCU\` (Pro) đột biến thành \`CCC\`. Tra bảng: cả 2 đều là Pro → peptide không đổi. Đây là đột biến "im lặng".

**Ví dụ 2 — Missense (sickle cell)**: ở gen β-globin, codon thứ 6 đổi \`GAG\` (Glu) → \`GUG\` (Val). Glu ưa nước, Val kỵ nước → hemoglobin tụ lại → hồng cầu thành hình liềm. Đây là minh hoạ kinh điển "1 base đổi → bệnh".

**Ví dụ 3 — Nonsense**: peptide đúng đáng lẽ là Met–Tyr–Trp–Gly (4 aa), mRNA = \`AUG UAU UGG GGC UAA\`. Đột biến codon 2 \`UAU → UAA\`: peptide chỉ còn **Met** rồi STOP. Mất 3/4 chiều dài → mất chức năng.

**Ví dụ 4 — Frameshift**: mRNA gốc \`5'- AUG CGU AAA UGA -3'\` (Met–Arg–Lys). Xoá nucleotide thứ 4 (C):
- Gốc: AUG | CGU | AAA | UGA → Met-Arg-Lys-STOP
- Sau xoá C: AUG | GUA | AAU | GA(?) → Met-Val-Asn-... (codon 4 dở dang). Peptide hoàn toàn khác sau điểm xoá. Đây là vì sao frameshift thường thảm hoạ.

### ⚠ Lỗi thường gặp

- **Đếm missense và silent như nhau** — silent thường vô hại, missense có thể nặng (sickle cell) hoặc nhẹ (đổi giữa Ile/Leu/Val không quá hệ trọng). Phải nhìn vào **amino acid mới có cùng tính chất với amino acid cũ không**.
- **Nghĩ frameshift chỉ xảy ra khi xoá/chèn 3 base** — ngược lại: chèn/xoá **bội số của 3** giữ nguyên khung; chèn/xoá **không phải bội của 3** mới gây frameshift.
- **Nhầm mọi đột biến đều có hại** — đa số đột biến trên DNA rơi vào vùng không mã hoá (intron, vùng giữa các gen) → không ảnh hưởng. Đột biến trong vùng mã hoá vẫn có thể là silent.

### ❓ Câu hỏi tự nhiên của người đọc

**Q: Tại sao mã di truyền thoái hoá lại là lợi thế tiến hoá?**
A: Vì nó "đệm" chống lỗi. Nếu mỗi amino acid chỉ 1 codon, mọi đột biến đều thành missense hoặc nonsense — thảm hoạ. Có thoái hoá → ~30% đột biến điểm ngẫu nhiên là silent → vô hại. Đó là lớp "bảo hiểm" miễn phí.

**Q: Đột biến nào nguy hiểm nhất?**
A: Xếp thường (không tuyệt đối): **frameshift ≈ nonsense > missense > silent ≈ 0**. Frameshift và nonsense thường tạo protein cụt hoặc rối toàn diện → mất chức năng. Missense tuỳ thuộc vị trí và tính chất amino acid mới. Silent gần như vô hại.

### 🔁 Dừng lại tự kiểm tra

1. Codon \`UCA\` (Ser) đột biến thành \`UCG\`. Loại đột biến gì?
2. Codon \`CAA\` (Gln) đột biến thành \`UAA\`. Loại đột biến gì? Hậu quả?
3. mRNA gốc \`5'- AUG CAU GUC AAU UAG -3'\`. Chèn 1 base \`A\` sau vị trí thứ 3 (sau AUG). Viết mRNA mới và peptide mới (tra: CAU=His, GUC=Val, AAU=Asn, ACA=Thr, UGU=Cys, CAA=Gln, U-tail).

<details>
<summary>Đáp án</summary>

1. UCA → UCG: tra bảng, cả 2 đều là Ser → **silent (đồng nghĩa)**.
2. CAA (Gln) → UAA: UAA là codon STOP → **nonsense (vô nghĩa)**. Hậu quả: peptide bị cắt ngắn tại đây, thường mất chức năng.
3. Gốc: AUG | CAU | GUC | AAU | UAG → Met-His-Val-Asn-STOP (peptide 4 aa).
   Chèn A sau AUG: mRNA mới \`AUG A CAU GUC AAU UAG\` = \`AUG | ACA | UGU | CAA | UUA | G...\`
   - AUG → Met
   - ACA → Thr
   - UGU → Cys
   - CAA → Gln
   - UUA → Leu (tra bảng: UUA = Leu)
   - G... → dở dang, không có stop nữa
   Peptide mới = **Met–Thr–Cys–Gln–Leu–...** — hoàn toàn khác peptide gốc; thậm chí không có stop → ribosome chạy tiếp tới 3' UTR / poly-A → khả năng cao kích hoạt non-stop decay. Đây là minh hoạ frameshift.
</details>

### 📝 Tóm tắt mục 5

- 4 loại đột biến điểm: silent (vô hại), missense (đổi aa), nonsense (stop sớm), frameshift (đổi khung).
- Frameshift và nonsense thường thảm hoạ; silent gần như vô hại.
- Mã thoái hoá là "đệm" tiến hoá chống lỗi — ~30% đột biến điểm là silent.
- Sickle cell anemia (Glu → Val ở β-globin) là ví dụ kinh điển missense.

---

## 6. So sánh phiên mã & dịch mã — bảng nhanh

| Tiêu chí | Phiên mã (transcription) | Dịch mã (translation) |
|----------|--------------------------|------------------------|
| Khuôn | DNA (mạch khuôn) | mRNA |
| Sản phẩm | mRNA (pre-mRNA → mRNA trưởng thành) | chuỗi polypeptide |
| Enzyme/máy chính | RNA polymerase | ribosome (rRNA + protein) |
| "Người giao hàng" | nucleotide tự do (A, U, G, C) | tRNA mang amino acid |
| Nơi xảy ra (eukaryote) | nhân | bào tương (hoặc rough ER) |
| Nơi xảy ra (prokaryote) | bào tương | bào tương (song song phiên mã) |
| Quy luật | đọc khuôn 3'→5', tổng hợp 5'→3' | đọc mRNA 5'→3' theo codon |
| Bộ chữ | A, U, G, C (4 base) | 20 amino acid |
| Đơn vị | nucleotide | codon (3 nt) ↔ 1 amino acid |

---

## 7. Bài tập + Lời giải chi tiết

### Bài tập

**Bài 1**: Cho mạch khuôn của một gen: \`3'- T A C G G C T T A A T C -5'\`. (a) Viết mRNA tạo ra. (b) Viết peptide do mRNA này mã hoá (giả sử AUG là codon khởi đầu đầu tiên trong mRNA). Tra bảng mã: GCC = Ala; CGA = Arg; AAU = Asn; AGU = Ser; UUA = Leu; AUG = Met.

**Bài 2**: Một gen ở eukaryote dài 30,000 base, có 12 exon với tổng chiều dài 2,400 base. Tính: (a) tổng chiều dài intron, (b) chiều dài mRNA trưởng thành không tính cap + poly-A, (c) số amino acid trong protein cuối (giả sử toàn bộ mRNA trưởng thành đều là ORF, có 1 codon stop).

**Bài 3**: Một peptide gồm 5 amino acid: Met–Phe–Pro–Trp–Ser–STOP. Tra bảng: Phe có 2 codon, Pro có 4 codon, Trp có 1 codon, Ser có 6 codon, Met có 1 codon, Stop có 3 codon. Tính số kiểu mRNA khả dĩ mã hoá peptide này.

**Bài 4**: Codon thứ 6 của gen β-globin là \`GAG\` mã hoá Glu. Đột biến đổi nucleotide thứ 2 thành U → codon mới \`GUG\` mã hoá Val. (a) Loại đột biến gì? (b) Liệt kê **mọi** codon khác có thể tạo ra do đột biến 1 base ở codon \`GAG\` và phân loại từng codon (Glu có codon \`GAA, GAG\`; tra thêm: GCG = Ala, GGG = Gly, GAU = Asp, GAC = Asp, AAG = Lys, CAG = Gln, UAG = STOP).

**Bài 5**: mRNA gốc: \`5'- AUG GCU AGU CCG UAA -3'\`. Cho 3 đột biến độc lập:
- (a) Đổi nucleotide 7 (\`A\` của AGU) thành \`U\` → AGU thành UGU.
- (b) Xoá nucleotide 4 (\`G\` đầu của GCU).
- (c) Đổi nucleotide 11 (\`G\` của CCG) thành \`A\` → CCG thành CCA.

Tra: GCU=Ala, AGU=Ser, CCG=Pro, UGU=Cys, CCA=Pro, GCU(lệch khung 1)= dùng wholistic dưới. Viết peptide tạo ra trong mỗi trường hợp, phân loại đột biến.

**Bài 6**: Tốc độ dịch mã ở người là ~5 amino acid/giây. Một protein dài 600 amino acid. (a) Tính thời gian 1 ribosome dịch xong protein. (b) Nếu trên cùng mRNA có 20 ribosome chạy đồng thời (polysome), mỗi ribosome cách ribosome trước ~80 codon, sau bao lâu protein đầu tiên được hoàn thành và mỗi giây có bao nhiêu protein được phóng thích sau khi dây chuyền đầy?

### Lời giải chi tiết

**Bài 1**:
- (a) Mạch khuôn 3'→5': T A C G G C T T A A T C
  - mRNA 5'→3': A U G C C G A A U U A G
  - Cách: A→U, C→G, G→C, T→A, mỗi base bổ sung.
  - mRNA = **\`5'- AUG CCG AAU UAG -3'\`**.
- (b) Chia codon: AUG | CCG | AAU | UAG.
  - AUG → Met. CCG: tra bảng cùng nhóm Pro → Pro. AAU → Asn. UAG → STOP.
  - **Peptide = Met–Pro–Asn** (3 amino acid).
  - (Lưu ý: đề tra GCC=Ala và CGA=Arg để gây nhiễu — không dùng tới ở bài này.)

**Bài 2**:
- (a) Intron = 30,000 − 2,400 = **27,600 base**.
- (b) mRNA trưởng thành (chỉ exon) = **2,400 nucleotide**.
- (c) Số codon = 2,400 / 3 = 800 codon. Trừ 1 stop → **799 amino acid** trong protein.

**Bài 3**:
- Mỗi vị trí độc lập, nhân số codon: 1 × 2 × 4 × 1 × 6 × 3 = **144 kiểu mRNA** khác nhau cùng cho ra peptide Met–Phe–Pro–Trp–Ser.
- Nhận xét: ngay cả peptide cực ngắn cũng có hàng trăm mRNA khả dĩ → mã thoái hoá tạo "đệm" rất lớn.

**Bài 4**:
- (a) \`GAG\` (Glu) → \`GUG\` (Val). Codon đổi → amino acid đổi (Glu ưa nước → Val kỵ nước) → đây là **missense (sai nghĩa)**. Đây chính là đột biến gây bệnh **sickle cell anemia**.
- (b) Đột biến 1 base ở \`GAG\` có 3 vị trí × 3 base mới mỗi vị trí = 9 codon khả dĩ:
  - Vị trí 1 (G → A/U/C): AAG (Lys, missense), UAG (STOP, nonsense), CAG (Gln, missense).
  - Vị trí 2 (A → U/G/C): GUG (Val, missense — sickle cell), GGG (Gly, missense), GCG (Ala, missense).
  - Vị trí 3 (G → A/U/C): GAA (Glu, **silent**), GAU (Asp, missense), GAC (Asp, missense).
  - Tóm tắt: 1 silent (GAG → GAA), 1 nonsense (GAG → UAG), 7 missense.
  - 1/9 ≈ 11% là silent ở codon này — chứng tỏ thoái hoá thường nằm ở vị trí 3.

**Bài 5**:
Gốc: AUG | GCU | AGU | CCG | UAA = Met-Ala-Ser-Pro-STOP. Peptide gốc = **Met-Ala-Ser-Pro** (4 aa).

- (a) Đổi nt 7 (\`A\` của AGU) → \`U\`: codon 3 AGU → UGU. Mới = AUG | GCU | UGU | CCG | UAA = **Met-Ala-Cys-Pro** → **missense** (Ser → Cys).

- (b) Xoá nt 4 (\`G\` đầu của GCU): mRNA mới = \`5'- AUG CUA GUC CGU AA -3'\`. Chia codon: AUG | CUA | GUC | CGU | AA (dở).
  - AUG = Met. CUA = Leu (UUA = Leu, CUA cũng = Leu, cả gia đình CU* = Leu). GUC = Val. CGU = Arg.
  - Không có stop trong khung mới (UAA gốc bị lệch thành \`UAA\` ở cuối nhưng đã lệch khung, bị tách).
  - Peptide = **Met-Leu-Val-Arg-...** (chạy tiếp tới hết mRNA) → **frameshift**. Peptide cụt vô nghĩa, có thể kích hoạt non-stop decay.

- (c) Đổi nt 11 (\`G\` của CCG) → \`A\`: codon 4 CCG → CCA. Tra: CCA cũng = Pro. Peptide không đổi = Met-Ala-Ser-Pro → **silent (đồng nghĩa)**.

**Bài 6**:
- (a) Thời gian 1 ribosome: 600 aa / (5 aa/s) = **120 giây = 2 phút**.
- (b) 20 ribosome cách nhau 80 codon. Khoảng cách thời gian giữa 2 ribosome liên tiếp ra sản phẩm = 80 codon / (5 codon/s) = **16 giây**.
  - Ribosome đầu tiên phóng peptide sau 120 s; sau đó cứ **16 giây 1 protein** ra lò.
  - Tốc độ phóng (sau khi dây chuyền đầy) = 1 protein / 16 s ≈ **0.0625 protein/giây**, tức ~3.75 protein/phút trên cùng 1 mRNA.
  - Vẫn còn rất nhiều mRNA cùng loại đang được dịch song song → tổng năng suất tế bào cao.

---

## 8. Liên kết và bài tiếp theo

- **Bài trước**: [Lesson 02 — DNA và nhân đôi](../lesson-02-dna-replication/) — nguồn gốc bản gốc DNA.
- **Bài tiếp theo**: [Lesson 04 — Điều hoà gen (gene regulation)](../lesson-04-gene-regulation/) — tế bào quyết định gen nào "bật/tắt" phiên mã ở từng thời điểm.
- **Liên kết Tầng 1**:
  - [\`01-Molecules-Cells/lesson-01-biomolecules\`](../../01-Molecules-Cells/lesson-01-biomolecules/) — protein và nucleic acid (đơn phân, bậc cấu trúc).
  - [\`01-Molecules-Cells/lesson-02-cell-structure\`](../../01-Molecules-Cells/lesson-02-cell-structure/) — nhân (chứa DNA, phiên mã), ribosome (dịch mã).
- **Sẽ học sâu hơn**:
  - Đột biến và công nghệ DNA — [Lesson 05](../lesson-05-mutation-biotech/).
  - Mã di truyền tiến hoá → bằng chứng tổ tiên chung — [Lesson 07 (chọn lọc tự nhiên)](../lesson-07-natural-selection/).
- **Visualization**: [\`./visualization.html\`](./visualization.html) — DNA→mRNA→protein stepper, bảng codon tương tác, mô phỏng ribosome A/P/E, máy tính ảnh hưởng đột biến.

---

## 📝 Tổng kết Lesson 03

1. **Luận đề trung tâm**: DNA → (phiên mã) → RNA → (dịch mã) → Protein. Ngoại lệ: retrovirus (phiên mã ngược).
2. **Phiên mã**: RNA polymerase đọc mạch khuôn 3'→5', tổng hợp mRNA 5'→3'; A–U, T–A, G–C, C–G. mRNA giống mạch mã, chỉ T→U.
3. **Xử lý pre-mRNA (chỉ eukaryote)**: cap 5' + poly-A 3' + cắt intron, nối exon.
4. **Mã di truyền**: $4^3 = 64$ codon; mã hoá 20 amino acid + 3 stop (UAA/UAG/UGA); AUG = Met = start. Đặc tính: phổ thông, không gối, liên tục, thoái hoá.
5. **Dịch mã**: ribosome (A/P/E) + mRNA + tRNA. 3 pha: initiation → elongation (codon recognition → peptide bond → translocation) → termination. ~5 aa/giây.
6. **Đột biến điểm**: silent (vô hại) / missense (đổi aa, vd sickle cell) / nonsense (stop sớm) / frameshift (chèn-xoá lệch khung, thảm hoạ). Mã thoái hoá → ~30% silent → đệm chống đột biến.

**Tiếp theo**: [Lesson 04 — Điều hoà gen](../lesson-04-gene-regulation/) — bật/tắt phiên mã ra sao?
`;
