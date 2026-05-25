// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: Chemistry/02-Reactions-Thermo/lesson-08-biochem-preview/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 08 (Tier 2) — Hóa sinh preview (Biochemistry)

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Hiểu **4 nhóm đại phân tử sinh học (biomolecule)**: **carbohydrate**, **lipid**, **protein**, **nucleic acid (DNA/RNA)** — vai trò và cấu trúc cơ bản.
- Biết các **monomer cơ bản** của mỗi nhóm: monosaccharide (glucose), acid béo, amino acid, nucleotide.
- Hiểu cấu trúc **protein 4 cấp** (primary → secondary → tertiary → quaternary) và vai trò của H-bond, S-S bridge.
- Đọc được cơ chế **enzyme** = xúc tác sinh học có tính chọn lọc cực cao.
- Nắm sơ lược **trao đổi chất**: glucose → ATP qua đường phân + chu trình Krebs + chuỗi vận chuyển electron.
- Hiểu **DNA → RNA → protein** (dogma trung tâm sinh học phân tử).

## Kiến thức tiền đề

- [Lesson 06 (T2) — Nhóm chức](../lesson-06-functional-groups/) — biết các nhóm chức.
- [Lesson 07 (T2) — Polymer](../lesson-07-polymers/) — biết polymer hóa.

---

## 1. Carbohydrate (Đường, Tinh bột)

### 1.1. Phân loại

- **Monosaccharide** (đường đơn): glucose, fructose, ribose. Công thức chung **CₙH₂ₙOₙ** (vd C₆H₁₂O₆).
- **Disaccharide** (2 đơn vị): sucrose (đường mía = glucose + fructose), lactose (sữa = glucose + galactose), maltose (mạch nha = 2 glucose).
- **Polysaccharide** (nhiều đơn vị):
  - **Tinh bột (starch)**: chuỗi glucose α-1,4 → tiêu hóa được.
  - **Cellulose**: chuỗi glucose β-1,4 → không tiêu hóa được (con người).
  - **Glycogen**: dạng dự trữ glucose trong gan và cơ.

### 1.2. Glucose — đường quan trọng nhất

Công thức C₆H₁₂O₆. Tồn tại ở dạng vòng (95%) hoặc mạch thẳng (5%) trong nước:

\`\`\`
   CHO
   |
   CHOH      (mạch thẳng)
   |
   CHOH
   |        ↔  vòng pyranose 6 cạnh (95% trong dung dịch)
   CHOH
   |
   CHOH
   |
   CH₂OH
\`\`\`

Vai trò: **nhiên liệu chính** của tế bào. Glucose + 6O₂ → 6CO₂ + 6H₂O + 2870 kJ/mol. Sản phẩm năng lượng: **ATP** (adenosine triphosphate, ~ 30 phân tử ATP / 1 glucose).

### 📝 Tóm tắt mục 1

- Carbohydrate: đường đơn → đường đôi → polysaccharide.
- Glucose = nhiên liệu chính, tạo ~ 30 ATP.
- Tinh bột vs cellulose khác kiểu liên kết (α vs β-1,4-glycosidic).

---

## 2. Lipid (Chất béo)

### 2.1. Triglyceride — lipid chính

**Triglyceride** = ester của **glycerol** (3 nhóm OH) + 3 **acid béo (fatty acid)**.

\`\`\`
    CH₂-O-CO-R₁
    |
    CH-O-CO-R₂        (3 acid béo R₁, R₂, R₃)
    |
    CH₂-O-CO-R₃
\`\`\`

### 2.2. Phân biệt acid béo

- **Bão hòa (saturated)**: chỉ liên kết đơn C-C → mạch thẳng → xếp khít → chất béo **rắn** ở nhiệt độ phòng. Vd mỡ động vật. **Không tốt** cho sức khỏe (tăng cholesterol xấu).
- **Không bão hòa (unsaturated)**: có ≥ 1 liên kết đôi C=C → mạch gấp khúc → khó xếp khít → **lỏng**. Vd dầu thực vật, dầu cá. **Tốt** hơn cho sức khỏe.
  - **Cis** (2 H cùng phía): tự nhiên, tốt.
  - **Trans** (2 H đối phía): nhân tạo (từ hydrogen hóa một phần), **rất xấu** cho sức khỏe.

### 2.3. Vai trò lipid

- **Dự trữ năng lượng**: 1 g lipid = 9 kcal (so với 4 kcal/g carbohydrate hoặc protein).
- **Cấu trúc màng tế bào**: phospholipid (1 đầu ưa nước + 2 đuôi kỵ nước) → tự sắp xếp thành lớp đôi.
- **Hormone steroid**: cholesterol, testosterone, estrogen, cortisol.

### 📝 Tóm tắt mục 2

- Triglyceride = glycerol + 3 acid béo (ester).
- Bão hòa (rắn) vs không bão hòa (lỏng). Trans béo nhân tạo → xấu nhất.
- Lipid: 9 kcal/g, gấp đôi carbohydrate.

---

## 3. Protein — phân tử đa năng nhất

### 3.1. Amino acid — monomer

Mỗi amino acid có cấu trúc chung:
\`\`\`
       H
       |
   H₂N-C-COOH
       |
       R    (nhóm bên — đặc trưng từng amino acid)
\`\`\`

Có **20 amino acid chuẩn** trong protein. Khác nhau ở nhóm R: hidrophilic (ưa nước), hydrophobic (kỵ nước), acidic (R có −COOH), basic (R có −NH₂).

Một số amino acid:
- Glycine: R = H (đơn giản nhất).
- Alanine: R = CH₃.
- Cysteine: R = CH₂-SH (S quan trọng cho cấu trúc).
- Lysine: R = (CH₂)₄-NH₂ (basic, ưa nước).

### 3.2. Liên kết peptide

2 amino acid nối qua liên kết peptide (−CO−NH−) bằng phản ứng ngưng tụ, mất H₂O (giống polymer hóa ngưng tụ).

\`\`\`
H₂N-CHR₁-COOH + H₂N-CHR₂-COOH 
   → H₂N-CHR₁-CO-NH-CHR₂-COOH + H₂O
\`\`\`

Chuỗi nhiều amino acid → **polypeptide** → khi đủ dài và gấp thành 3D → **protein**.

### 3.3. Cấu trúc protein — 4 cấp

| Cấp | Mô tả | Liên kết |
|-----|-------|----------|
| **Primary (1°)** | Trình tự amino acid trên chuỗi | Peptide (cộng hóa trị) |
| **Secondary (2°)** | Cuộn xoắn (alpha helix) hoặc gấp nếp (beta sheet) | H-bond giữa nhóm C=O và N-H |
| **Tertiary (3°)** | Cấu trúc 3D toàn chuỗi | H-bond, S-S bridge (cysteine), tương tác kỵ nước/ion |
| **Quaternary (4°)** | Nhiều chuỗi ghép lại (nếu có) | Tương tác giữa các chuỗi |

**Ví dụ**: hemoglobin (vận chuyển O₂ trong máu) gồm 4 chuỗi polypeptide → cấp 4. Insulin gồm 2 chuỗi → cấp 4.

### 3.4. Vai trò protein

- **Enzyme** (xúc tác sinh học): amylase, pepsin, ATP synthase...
- **Cấu trúc**: collagen (da, xương), keratin (tóc, móng), actin/myosin (cơ).
- **Vận chuyển**: hemoglobin (O₂), transferrin (Fe).
- **Hormone**: insulin, growth hormone.
- **Kháng thể**: antibody chống bệnh.
- **Lưu trữ**: ferritin (Fe trong gan).

### 📝 Tóm tắt mục 3

- 20 amino acid chuẩn ghép thành chuỗi peptide.
- 4 cấp cấu trúc: trình tự → 2°/3°/4° gấp 3D.
- Protein có hàng triệu loại, đa năng nhất trong các biomolecule.

---

## 4. Enzyme — xúc tác sinh học

### 4.1. Cơ chế

**Enzyme** = protein xúc tác cho phản ứng sinh hóa. Cơ chế **lock and key**:
- Enzyme có **active site** — khe đặc thù khớp **đúng substrate** (như chìa và ổ khóa).
- Substrate vào khe → enzyme gắn → phản ứng xảy ra → sản phẩm thoát ra → enzyme tái sinh.

→ Enzyme **không bị tiêu hao** trong phản ứng, có thể xúc tác cho hàng triệu lần liên tiếp.

### 4.2. Tính chất quan trọng

- **Tăng tốc độ** lên 10⁶ - 10¹² lần so với không xúc tác.
- **Tính chọn lọc cực cao**: 1 enzyme thường chỉ xúc tác cho 1 phản ứng cụ thể.
- **Hoạt động trong điều kiện ôn hòa**: 37°C, pH ~ 7. (Hóa học công nghiệp cần T cao + P cao + xúc tác kim loại.)
- **Bị ức chế** khi T quá cao (denature — protein gấp lại sai) hoặc pH xa optimum.

### 4.3. Ví dụ enzyme

- **Amylase** (trong nước bọt và tụy): phân giải tinh bột → glucose. Đó là lý do nhai cơm lâu thấy ngọt.
- **Pepsin** (trong dạ dày, pH ~ 2): phân giải protein.
- **DNA polymerase**: sao chép DNA.
- **ATP synthase**: tổng hợp ATP từ ADP + Pᵢ trong ti thể.
- **Catalase**: phân hủy H₂O₂ thành H₂O + O₂. Nhanh nhất trong các enzyme (10⁵ phản ứng/giây).

### 📝 Tóm tắt mục 4

- Enzyme = protein xúc tác sinh học. Cơ chế lock-and-key.
- Tốc độ × 10⁶-10¹², tính chọn lọc cao, hoạt ở 37°C.
- Mỗi loại có chức năng cụ thể (amylase, pepsin, DNA polymerase...).

---

## 5. Nucleic Acid — DNA và RNA

### 5.1. Nucleotide — monomer

Mỗi nucleotide gồm 3 phần:
1. **Đường pentose**: deoxyribose (trong DNA), ribose (trong RNA).
2. **Base nitrogen**: 4 loại.
   - DNA: A (adenine), T (thymine), G (guanine), C (cytosine).
   - RNA: A, U (uracil thay T), G, C.
3. **Nhóm phosphate**: -PO₄³⁻ (mang điện âm, làm DNA/RNA mang điện âm tổng thể).

### 5.2. Cấu trúc DNA

- **Chuỗi xoắn kép (double helix)** Watson-Crick (1953).
- 2 chuỗi đối song song quấn quanh nhau.
- Nối bằng **liên kết hydrogen** giữa các base:
  - **A-T**: 2 H-bond.
  - **G-C**: 3 H-bond.
- Mỗi vòng xoắn ~ 10 base pair, dài ~ 3.4 nm.

DNA con người dài tổng cộng ~ 2 mét, gập gọn vào nhân tế bào đường kính ~ 6 μm.

### 5.3. Dogma trung tâm — luồng thông tin di truyền

\`\`\`
DNA → RNA → Protein
     (phiên mã)  (dịch mã)
\`\`\`

1. **Phiên mã (transcription)**: 1 đoạn DNA → mRNA tương ứng.
2. **Dịch mã (translation)**: mRNA + ribosome → chuỗi protein. Mỗi 3 base (codon) mã hóa 1 amino acid.

Mã di truyền: 64 codon → 20 amino acid (có dư thừa, gọi là degeneracy). Phổ quát ở mọi sinh vật (từ vi khuẩn → người).

### 📝 Tóm tắt mục 5

- DNA = chuỗi xoắn kép, 4 base A-T-G-C, nối bằng H-bond.
- A-T (2 H-bond), G-C (3 H-bond).
- Dogma: DNA → mRNA → protein, qua codon (3 base/amino acid).

---

## 6. Trao đổi chất — Glucose → ATP

### 6.1. Bức tranh tổng thể

\`\`\`
Glucose (C₆H₁₂O₆) + 6 O₂ → 6 CO₂ + 6 H₂O + ~ 30 ATP
\`\`\`

Phản ứng tỏa nhiệt (ΔH ≈ −2870 kJ/mol). Năng lượng được "đóng gói" thành **ATP** — đơn vị năng lượng tế bào.

### 6.2. 3 giai đoạn chính

1. **Đường phân (Glycolysis)** — trong cytoplasm:
   - Glucose → 2 pyruvate.
   - Tạo 2 ATP + 2 NADH.

2. **Chu trình Krebs (Citric Acid Cycle)** — trong ti thể (mitochondria):
   - Pyruvate → acetyl-CoA → vào chu trình.
   - Tạo 2 ATP + 6 NADH + 2 FADH₂ + 4 CO₂ (cho 1 glucose).

3. **Chuỗi vận chuyển electron + tổng hợp ATP (ETC + ATP synthase)** — màng ti thể:
   - NADH/FADH₂ "trao" e cho chuỗi protein.
   - Năng lượng từ e đẩy H⁺ qua màng → tạo gradient.
   - ATP synthase dùng gradient này tổng hợp ATP từ ADP + Pᵢ.
   - Cuối cùng e + H⁺ + O₂ → H₂O.
   - Tạo ~ 26 ATP.

**Tổng**: ~ 30-32 ATP / 1 glucose. Năng lượng "nén" gọn gàng để dùng dần.

### 📝 Tóm tắt mục 6

- Glucose oxy hóa hoàn toàn → CO₂ + H₂O + 30 ATP.
- 3 giai đoạn: glycolysis → Krebs → ETC.
- Ti thể là "nhà máy điện" của tế bào.

---

## 7. Bài tập + Lời giải chi tiết

### Bài tập

**Bài 1**: Phân biệt 4 nhóm biomolecule chính: monomer, vai trò, ví dụ.

**Bài 2**: Vì sao acid béo bão hòa rắn ở nhiệt độ phòng, không bão hòa lỏng?

**Bài 3**: Protein có 4 cấp cấu trúc. Cho biết loại liên kết quan trọng nhất ở mỗi cấp.

**Bài 4**: Cho chuỗi mRNA: 5'-AUG-GCU-GAU-UAA-3'. Đoán chuỗi amino acid được dịch ra (dùng bảng codon: AUG=Met (Start), GCU=Ala, GAU=Asp, UAA=Stop).

**Bài 5**: Tại sao ATP synthase trong ti thể được ví như "tuabin nước"?

**Bài 6**: Vì sao 1 g lipid cho năng lượng nhiều hơn 1 g carbohydrate?

### Lời giải

**Bài 1**:

| Nhóm | Monomer | Vai trò | Ví dụ |
|------|---------|---------|--------|
| Carbohydrate | Monosaccharide (glucose) | Nhiên liệu, dự trữ ngắn hạn, cấu trúc thực vật | Glucose, tinh bột, cellulose |
| Lipid | Glycerol + acid béo | Dự trữ năng lượng cao, màng tế bào, hormone | Triglyceride, phospholipid, cholesterol |
| Protein | Amino acid (20 loại) | Enzyme, cấu trúc, vận chuyển, hormone, kháng thể | Hemoglobin, collagen, insulin |
| Nucleic acid | Nucleotide | Lưu trữ và truyền thông tin di truyền | DNA, RNA |

**Bài 2**: Acid béo bão hòa có mạch C **thẳng** → các chuỗi xếp khít nhau → lực London giữa các chuỗi mạnh → kết tinh thành **rắn**. Acid béo không bão hòa có **liên kết đôi cis** tạo "gấp khúc" → khó xếp khít → lực giữa các chuỗi yếu → **lỏng**.

**Bài 3**:
- 1° (primary): **liên kết peptide** (cộng hóa trị, mạnh nhất).
- 2° (secondary): **H-bond** giữa C=O và N-H của liên kết peptide.
- 3° (tertiary): **nhiều loại**: H-bond, cầu S-S (disulfide bridge giữa 2 cysteine), tương tác kỵ nước, ion.
- 4° (quaternary): tương tác giữa các chuỗi polypeptide riêng biệt.

**Bài 4**: Mỗi 3 base = 1 codon = 1 amino acid.
- AUG → Met (Methionine, bắt đầu)
- GCU → Ala (Alanine)
- GAU → Asp (Aspartic acid)
- UAA → STOP (kết thúc)

Chuỗi amino acid: **Met-Ala-Asp** (sau đó dừng).

**Bài 5**: ATP synthase nằm trên màng trong ti thể. Có gradient H⁺ (proton) từ ngoài vào trong (do chuỗi vận chuyển electron bơm). H⁺ chảy qua **kênh xoay** của ATP synthase → làm xoay → cơ chế xoay này **đẩy ADP + Pᵢ vào với nhau → tạo ATP**. Giống tuabin nước: nước chảy → quay → tạo điện. Ở đây "nước" là H⁺, "điện" là ATP.

**Bài 6**: Acid béo có **chuỗi C dài và rất nhiều liên kết C-H**. Khi oxy hóa, mỗi C và H đều tỏa nhiều năng lượng (~ 38 kJ/mol cho C-H). Carbohydrate đã có sẵn nhiều O nối với C → một phần đã "oxy hóa rồi" → khi cháy tỏa ít hơn. Cụ thể:
- 1 g carbohydrate: 4 kcal
- 1 g protein: 4 kcal  
- 1 g lipid: **9 kcal** (gấp 2.25 lần)

→ Đó là lý do mỡ dự trữ năng lượng hiệu quả hơn glycogen — cùng năng lượng nhưng nhẹ hơn ~ 6 lần (tính cả nước đi kèm glycogen).

---

## 8. Liên kết với các môn khác và bài tiếp theo

- **Tiếp theo (Chemistry)**: Hết Tier 2 — **HOÀN THÀNH CHEMISTRY** 🎉.
- **Liên kết Vật lý**: ATP synthase ↔ thủy điện (gradient H⁺ ↔ thế năng nước).
- **Liên kết Math**: 4 cấp cấu trúc protein, mã hóa codon → tổ hợp 4³ = 64 codon → 20 amino acid (degeneracy).
- **Tiếp theo trong Sự sống**: Sinh học phân tử — replication, transcription, translation chi tiết; sinh học tế bào; di truyền học.

---

## 📝 Tổng kết Lesson 08 (T2)

1. **4 nhóm biomolecule**:
   - **Carbohydrate** (glucose, tinh bột, cellulose) — nhiên liệu.
   - **Lipid** (triglyceride, phospholipid) — năng lượng cao, màng tế bào.
   - **Protein** (chuỗi 20 amino acid) — enzyme, cấu trúc, vận chuyển.
   - **Nucleic acid** (DNA, RNA) — lưu trữ + truyền thông tin di truyền.
2. **Protein 4 cấp**: trình tự → 2° (H-bond) → 3° (S-S, kỵ nước) → 4° (nhiều chuỗi).
3. **Enzyme**: xúc tác sinh học, lock-and-key, hoạt ở 37°C.
4. **DNA**: xoắn kép, A-T (2 H-bond), G-C (3 H-bond).
5. **Dogma**: DNA → mRNA → protein. Codon (3 base/amino acid).
6. **Trao đổi chất**: Glucose + O₂ → ATP qua glycolysis → Krebs → ETC.

---

🎉 **HOÀN THÀNH CHEMISTRY!** (16/16 lesson)

Tier 1 — Structure: nguyên tử, electron, liên kết, lực, hình học, mol, dung dịch, cân bằng.
Tier 2 — Reactions & Thermo: acid-base, redox, điện hóa, nhiệt động, hữu cơ, polymer, hóa sinh.

Lộ trình hóa học từ THPT lên đại cương đại học đã hoàn chỉnh. Đường tiếp theo có thể chọn: hóa hữu cơ chuyên sâu, hóa sinh, dược, vật liệu — hoặc tiếp tục với Math, Physics ở các lĩnh vực khác.
`;
