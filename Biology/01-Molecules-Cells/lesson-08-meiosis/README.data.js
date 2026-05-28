// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: Biology/01-Molecules-Cells/lesson-08-meiosis/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 08 — Giảm phân

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Hiểu **vì sao cần giảm phân (meiosis)**: từ một tế bào lưỡng bội (diploid, **2n**) tạo ra **4 tế bào con đơn bội (haploid, n)** — chính là **giao tử (gamete)** dùng cho sinh sản hữu tính.
- Phân biệt rõ **giảm phân I (phân chia giảm nhiễm, reductional)** với **giảm phân II (phân chia tương đương, equational)** — biết tại mỗi kỳ thì cái gì tách khỏi cái gì.
- Mô tả 3 sự kiện đặc trưng của giảm phân I: **tiếp hợp (synapsis)**, **thể lưỡng trị (tetrad/bivalent)** và **trao đổi chéo (crossing over)**.
- Giải thích **3 nguồn tạo đa dạng di truyền** và **tính được** số tổ hợp giao tử **2ⁿ** cũng như số tổ hợp hợp tử khi thụ tinh.
- **So sánh nguyên phân (mitosis) và giảm phân** trên 6 tiêu chí — đối chiếu trực tiếp với [Lesson 07](../lesson-07-cell-cycle-mitosis/).
- Áp dụng bộ NST người (**2n = 46**) để theo dõi số NST qua từng kỳ và tính số tổ hợp giao tử/hợp tử thực tế.

## Kiến thức tiền đề

- **Chu kỳ tế bào và nguyên phân** — [Lesson 07](../lesson-07-cell-cycle-mitosis/): pha S nhân đôi DNA, các kỳ phân chia, nhiễm sắc tử chị em (sister chromatid). Giảm phân **so sánh trực tiếp** với nguyên phân, nên nắm vững bài này trước.
- **Cấu trúc tế bào** — [Lesson 02](../lesson-02-cell-structure/): nhân chứa NST, thoi phân bào (spindle) kéo NST. Nhắc lại khi cần.
- **Nucleic acid và NST** — [Lesson 01](../lesson-01-biomolecules/): DNA cuộn với protein histone thành NST.

---

## 1. Vì sao cần giảm phân? Bài toán "nhân đôi bộ NST"

### 💡 Trực giác / Hình dung

Hãy hình dung mỗi tế bào cơ thể bạn là một **bộ sưu tập 2 cuốn từ điển giống nhau về chủ đề** — một cuốn nhận từ bố, một cuốn nhận từ mẹ. Đó là **2n** (2 bộ NST). Bây giờ nếu bạn sinh con bằng cách **gộp nguyên cả tủ sách của bạn với cả tủ sách của bạn đời**, đời con sẽ có **4 cuốn mỗi chủ đề**, đời cháu có **8 cuốn**... cứ thế gấp đôi mãi — vô lý.

Giải pháp của tự nhiên: trước khi truyền cho đời sau, mỗi người **chỉ đóng gói 1 bộ** (giao tử n) thay vì cả 2. Khi 2 giao tử gặp nhau (thụ tinh), số bộ trở lại đúng **2n**. Giảm phân chính là quá trình "chia đôi bộ sưu tập" đó.

### 1.1. Bài toán cụ thể bằng số

Người có **2n = 46** NST (23 cặp). Giả sử KHÔNG có giảm phân, tế bào sinh dục cũng có 46 NST:

- Đời bố mẹ: trứng 46 + tinh trùng 46 → hợp tử **92**.
- Đời con (nếu lặp lại): 92 + 92 → **184**.
- Đời cháu: **368**... số NST gấp đôi mỗi thế hệ → bộ gen "phình" vô hạn, vô nghĩa.

Có giảm phân, mọi thứ ổn định:

- Trứng **n = 23** + tinh trùng **n = 23** → hợp tử **2n = 46** (giữ nguyên qua mọi thế hệ).

| Loài | 2n (tế bào sinh dưỡng) | n (giao tử) | Hợp tử sau thụ tinh |
|------|:---:|:---:|:---:|
| Người (*Homo sapiens*) | 46 | 23 | 46 |
| Ruồi giấm (*Drosophila*) | 8 | 4 | 8 |
| Đậu Hà Lan (*Pisum*) | 14 | 7 | 14 |
| Ngô (*Zea mays*) | 20 | 10 | 20 |

### 1.2. Tế bào lưỡng bội (2n) và đơn bội (n)

- **Lưỡng bội (diploid, 2n)**: có **cặp NST tương đồng (homologous chromosomes)** — 2 NST cùng kích thước, cùng vị trí gen (locus), một từ bố một từ mẹ. Mọi tế bào sinh dưỡng (somatic) của người là 2n.
- **Đơn bội (haploid, n)**: chỉ có **1 NST mỗi loại** (không thành cặp). Giao tử (trứng, tinh trùng) là n.

> **Lưu ý quan trọng — đừng nhầm "n" với "số NST":** \`n\` là **số bộ** (số lần lặp lại của một bộ NST đầy đủ), không phải tổng số NST. Người n = 23 nghĩa là "1 bộ gồm 23 NST"; 2n = 46 nghĩa là "2 bộ, tổng 46".

### ❓ Câu hỏi tự nhiên của người đọc

**Q: Tế bào nào trong cơ thể trải qua giảm phân?**
A: Chỉ **tế bào sinh dục (germ cell)** ở cơ quan sinh sản (tinh hoàn, buồng trứng). Tế bào sinh dưỡng (da, cơ, gan...) chỉ nguyên phân. Vậy nên đột biến trong giảm phân mới di truyền cho đời sau; đột biến tế bào sinh dưỡng thì không.

**Q: "Tương đồng (homologous)" khác "nhiễm sắc tử chị em (sister chromatid)" thế nào? Hay nhầm chỗ này.**
A: Khác hẳn. **2 NST tương đồng** là 2 NST riêng biệt (một của bố, một của mẹ) — cùng gen nhưng **alen (allele) có thể khác nhau** (vd cùng gen màu mắt, nhưng một cái mang alen nâu, một cái mang alen xanh). **2 nhiễm sắc tử chị em** là 2 bản sao **y hệt** của cùng 1 NST sau khi nhân đôi ở pha S, dính nhau ở tâm động (centromere). Phân biệt được điều này là chìa khóa hiểu giảm phân I vs II.

### 🔁 Dừng lại tự kiểm tra

1. Một loài có 2n = 24. Giao tử của loài này có bao nhiêu NST?
2. Vì sao nếu không có giảm phân thì sinh sản hữu tính sẽ làm bộ NST tăng vô hạn?

<details>
<summary>Đáp án</summary>

1. Giao tử là n = 24 / 2 = **12 NST**.
2. Thụ tinh = gộp 2 tế bào. Nếu cả 2 tế bào đều giữ nguyên 2n thì hợp tử thành 2n + 2n = **4n**, đời sau lại nhân đôi tiếp → bộ NST gấp đôi mỗi thế hệ, không ổn định. Giảm phân đưa giao tử về n để thụ tinh khôi phục đúng 2n.
</details>

### 📝 Tóm tắt mục 1

- Giảm phân biến tế bào **2n → 4 tế bào n** (giao tử), để thụ tinh khôi phục đúng 2n, giữ bộ NST ổn định qua các thế hệ.
- Người: 2n = 46 → giao tử n = 23 → hợp tử 2n = 46.
- Phân biệt **NST tương đồng** (2 NST khác nhau, bố/mẹ, có thể khác alen) với **nhiễm sắc tử chị em** (2 bản sao y hệt sau pha S).

---

## 2. Tổng quan: 1 lần nhân đôi DNA, 2 lần phân chia

### 💡 Trực giác / Hình dung

Nguyên phân giống **photocopy rồi cắt đôi 1 lần** — ra 2 bản giống hệt. Giảm phân giống **photocopy 1 lần rồi cắt đôi HAI lần liên tiếp** — bộ tài liệu được chia nhỏ qua 2 vòng, cuối cùng ra 4 tập mỏng (mỗi tập chỉ 1 bộ). Mấu chốt: **chỉ nhân đôi 1 lần (pha S) nhưng phân chia 2 lần** → số NST giảm một nửa.

### 2.1. Dòng chảy tổng thể

\`\`\`
Tế bào mẹ 2n  ──(pha S: nhân đôi DNA)──►  2n (mỗi NST 2 chromatid)
        │
        ├─ GIẢM PHÂN I (giảm nhiễm): tách 2 NST TƯƠNG ĐỒNG
        │       ▼
        │   2 tế bào n  (mỗi NST vẫn còn 2 chromatid)
        │
        └─ GIẢM PHÂN II (tương đương): tách 2 NHIỄM SẮC TỬ chị em
                ▼
            4 tế bào n  (mỗi NST còn 1 chromatid) = GIAO TỬ
\`\`\`

Điểm dễ quên: **giữa giảm phân I và II KHÔNG có pha S** (không nhân đôi DNA lại). Đó là lý do 2 lần phân chia nhưng chỉ 1 lần nhân đôi → kết quả giảm một nửa.

### 2.2. Theo dõi số NST và số chromatid qua từng giai đoạn (người, 2n = 46)

| Giai đoạn | Số NST | Số chromatid | Số lượng "bộ" |
|-----------|:---:|:---:|:---:|
| Trước pha S (tế bào 2n) | 46 | 46 | 2n |
| Sau pha S (G2) | 46 | 92 | 2n (mỗi NST 2 chromatid) |
| Cuối giảm phân I (mỗi tế bào con) | 23 | 46 | n (mỗi NST 2 chromatid) |
| Cuối giảm phân II (mỗi giao tử) | 23 | 23 | n (mỗi NST 1 chromatid) |

Đọc bảng theo cột "Số NST": 46 → 46 → **23** → 23. Số NST tụt một nửa **ngay ở cuối giảm phân I** (vì tách cặp tương đồng), không phải ở giảm phân II.

### ❓ Câu hỏi tự nhiên của người đọc

**Q: Vì sao gọi giảm phân I là "giảm nhiễm" còn giảm phân II là "tương đương"?**
A: "Giảm nhiễm (reductional)" vì số NST **giảm** từ 2n → n (tách 2 NST tương đồng). "Tương đương (equational)" vì số NST **không đổi** (n → n) — nó giống hệt nguyên phân: chỉ tách 2 nhiễm sắc tử chị em.

**Q: Sau pha S đã có 92 chromatid, sao vẫn gọi là 2n chứ không phải 4n?**
A: Vì \`n\` đếm **số bộ NST**, không đếm chromatid. 2 chromatid chị em vẫn dính nhau ở tâm động → vẫn tính là **1 NST**. Sau pha S ta có 46 NST (mỗi cái 2 chromatid) = vẫn 2n, chỉ là "đã nhân đôi vật chất".

### ⚠ Lỗi thường gặp

- **Nghĩ giảm phân có 2 lần nhân đôi DNA**: SAI. Chỉ **1 lần** (pha S, trước giảm phân I). Đây chính là cơ chế làm giảm số NST.
- **Nghĩ số NST giảm ở giảm phân II**: SAI. Giảm xảy ra ở **cuối giảm phân I** (tách cặp tương đồng). Giảm phân II giữ nguyên số NST.
- **Nghĩ giao tử có "nửa số gen"**: SAI. Giao tử có **đủ 1 bộ gen hoàn chỉnh** (n), chỉ là 1 bản thay vì 2 bản.

### 🔁 Dừng lại tự kiểm tra

1. Loài có 2n = 8. Điền số NST ở 4 giai đoạn của bảng §2.2.
2. Một tế bào kết thúc giảm phân I có 10 NST. Hỏi 2n của loài là bao nhiêu?

<details>
<summary>Đáp án</summary>

1. Trước S: **8** · Sau S: **8** (16 chromatid) · Cuối giảm phân I: **4** · Cuối giảm phân II: **4**.
2. Cuối giảm phân I là n. Vậy n = 10 → **2n = 20**.
</details>

### 📝 Tóm tắt mục 2

- Giảm phân = **1 lần nhân đôi (pha S) + 2 lần phân chia** (I rồi II), KHÔNG có pha S xen giữa.
- **Giảm phân I (giảm nhiễm)**: tách 2 NST tương đồng → 2n thành n. **Giảm phân II (tương đương)**: tách 2 nhiễm sắc tử chị em → n giữ nguyên n.
- Số NST giảm một nửa **ở cuối giảm phân I**, không phải II.

---

## 3. Giảm phân I — phân chia giảm nhiễm

### 💡 Trực giác / Hình dung

Tưởng tượng mỗi NST đã nhân đôi là một **chữ "X"** (2 chromatid chị em là 2 nét, giao nhau ở tâm động). Giảm phân I là vòng "tìm bạn nhảy": mỗi chữ X (của bố) đi tìm chữ X tương đồng (của mẹi), 2 chữ X **ghép sát nhau** thành một cặp (gọi là tetrad), rồi cuối cùng **mỗi chữ X tách về một cực** — nhưng nét của từng chữ X vẫn còn nguyên (chromatid chưa tách).

### 3.1. Bốn kỳ của giảm phân I

| Kỳ | Sự kiện chính |
|----|---------------|
| **Kỳ đầu I (Prophase I)** | NST co xoắn; 2 NST tương đồng **tiếp hợp (synapsis)** thành **thể lưỡng trị / tetrad (4 chromatid)**; xảy ra **trao đổi chéo (crossing over)** tại điểm bắt chéo (chiasma); màng nhân tan, thoi phân bào hình thành |
| **Kỳ giữa I (Metaphase I)** | Các **cặp tương đồng** xếp thành **2 hàng** ở mặt phẳng xích đạo (khác nguyên phân — xếp 1 hàng); hướng "bố/mẹ về cực nào" là **ngẫu nhiên** (phân ly độc lập) |
| **Kỳ sau I (Anaphase I)** | **2 NST tương đồng tách nhau** về 2 cực; **nhiễm sắc tử chị em VẪN dính nhau** |
| **Kỳ cuối I (Telophase I)** | Tạo 2 tế bào con, mỗi tế bào **n NST** (mỗi NST còn 2 chromatid) |

### 3.2. Tiếp hợp, tetrad, và trao đổi chéo — bằng hình dung số

- **Tiếp hợp (synapsis)**: cặp tương đồng ghép sát. Mỗi NST có 2 chromatid → cặp tương đồng có **2 × 2 = 4 chromatid** → gọi là **tetrad** ("tetra" = 4).
- **Trao đổi chéo (crossing over)**: 2 chromatid không-chị-em (một của bố, một của mẹ) **trao đổi đoạn tương ứng** cho nhau tại chiasma.

**Ví dụ số cụ thể:** Giả sử NST từ bố mang chuỗi gen \`A-B-C-D\` và NST tương đồng từ mẹ mang \`a-b-c-d\` (chữ thường = alen khác). Trao đổi chéo tại điểm giữa B và C tạo ra **NST tái tổ hợp (recombinant)**:

- Chromatid 1 (gốc bố): \`A-B-C-D\` (không đổi)
- Chromatid 2 (tái tổ hợp): \`A-B-c-d\` ← lấy nửa đầu của bố, nửa sau của mẹ
- Chromatid 3 (tái tổ hợp): \`a-b-C-D\` ← lấy nửa đầu của mẹ, nửa sau của bố
- Chromatid 4 (gốc mẹ): \`a-b-c-d\` (không đổi)

Từ 2 kiểu ban đầu (\`ABCD\`, \`abcd\`), giờ có **4 kiểu chromatid khác nhau** → đa dạng tăng vọt.

### ❓ Câu hỏi tự nhiên của người đọc

**Q: Kỳ giữa I khác kỳ giữa nguyên phân ở đâu?**
A: Nguyên phân — NST xếp **1 hàng** ở xích đạo, mỗi NST tự đứng riêng. Giảm phân I — các **cặp tương đồng** xếp **2 hàng** (sát nhau từng cặp). Đây là khác biệt then chốt giải thích vì sao giảm phân tách được cặp tương đồng.

**Q: Trao đổi chéo có làm hỏng gen không?**
A: Không (trong điều kiện bình thường). Trao đổi xảy ra giữa **đoạn tương ứng** trên 2 chromatid tương đồng → mỗi chromatid vẫn đủ gen, chỉ là **tổ hợp alen mới**. Lỗi (trao đổi không cân) thì hiếm và có thể gây bệnh, nhưng đó là ngoại lệ.

### ⚠ Lỗi thường gặp

- **Nghĩ kỳ sau I tách chromatid chị em**: SAI. Kỳ sau I tách **2 NST tương đồng**; chromatid chị em vẫn dính, chỉ tách ở **kỳ sau II**.
- **Quên trao đổi chéo chỉ có ở giảm phân**: nguyên phân **không** trao đổi chéo (không có tiếp hợp tetrad). Đây là một trong các điểm so sánh bắt buộc.

### 🔁 Dừng lại tự kiểm tra

1. Một tetrad gồm bao nhiêu chromatid? Bao nhiêu NST? Bao nhiêu tâm động?
2. Ở kỳ sau I, cái gì tách về 2 cực — NST tương đồng hay nhiễm sắc tử chị em?

<details>
<summary>Đáp án</summary>

1. Tetrad = 1 cặp tương đồng đã nhân đôi → **4 chromatid**, **2 NST**, **2 tâm động** (mỗi NST 1 tâm động giữ 2 chromatid của nó).
2. **NST tương đồng** tách về 2 cực; chromatid chị em vẫn dính nhau (chúng chỉ tách ở kỳ sau II).
</details>

### 📝 Tóm tắt mục 3

- Giảm phân I gồm 4 kỳ; đặc trưng ở **kỳ đầu I**: tiếp hợp → tetrad (4 chromatid) → trao đổi chéo tạo NST tái tổ hợp.
- **Kỳ giữa I**: cặp tương đồng xếp 2 hàng; hướng về cực là ngẫu nhiên (phân ly độc lập).
- **Kỳ sau I tách 2 NST tương đồng** (chromatid chị em vẫn dính) → 2 tế bào n.

---

## 4. Giảm phân II — giống nguyên phân

### 💡 Trực giác / Hình dung

Sau giảm phân I, mỗi tế bào n vẫn chứa các "chữ X" (NST 2 chromatid). Giảm phân II đơn giản là **tách mỗi chữ X thành 2 nét** — y hệt động tác của nguyên phân. Không tiếp hợp, không trao đổi chéo, không nhân đôi DNA trước đó.

### 4.1. Bốn kỳ của giảm phân II

| Kỳ | Sự kiện |
|----|---------|
| **Kỳ đầu II** | NST co xoắn lại (đã ở dạng n, mỗi NST 2 chromatid); thoi phân bào hình thành |
| **Kỳ giữa II** | NST xếp **1 hàng** ở xích đạo (giống nguyên phân) |
| **Kỳ sau II** | **Nhiễm sắc tử chị em tách nhau** về 2 cực |
| **Kỳ cuối II** | Tạo tổng cộng **4 tế bào con n** (mỗi NST còn 1 chromatid) = giao tử |

### 4.2. Vì sao "giống nguyên phân"?

Cả nguyên phân và giảm phân II đều **tách nhiễm sắc tử chị em** và **giữ nguyên số NST của tế bào vào** (n → n). Khác biệt duy nhất: tế bào vào nguyên phân là 2n, còn tế bào vào giảm phân II là **n** (đã giảm sẵn ở giảm phân I).

### ❓ Câu hỏi tự nhiên của người đọc

**Q: Tổng cộng từ 1 tế bào mẹ tạo ra mấy giao tử?**
A: **4** giao tử đơn bội. Giảm phân I: 1 → 2 tế bào n. Giảm phân II: mỗi tế bào n → 2 → tổng **2 × 2 = 4**.

**Q: Ở nữ giới có đúng 4 trứng từ 1 tế bào không?**
A: Về nguyên tắc 4, nhưng ở người **nữ**, phân chia tế bào chất không đều: chỉ **1 tế bào trở thành trứng** lớn (giữ phần lớn tế bào chất), 3 tế bào còn lại là **thể cực (polar body)** nhỏ và tiêu biến. Ở **nam**, cả 4 đều thành tinh trùng. Bài này dùng mô hình lý tưởng "4 giao tử".

### 🔁 Dừng lại tự kiểm tra

1. Tế bào vào giảm phân II có bộ NST là gì (2n hay n)? Sau giảm phân II thì sao?
2. Liệt kê sự kiện khác nhau căn bản giữa giảm phân I và II ở "kỳ sau".

<details>
<summary>Đáp án</summary>

1. Vào giảm phân II là **n** (mỗi NST 2 chromatid); ra cũng **n** (mỗi NST 1 chromatid). Số NST không đổi.
2. Kỳ sau **I**: tách **NST tương đồng**. Kỳ sau **II**: tách **nhiễm sắc tử chị em**.
</details>

### 📝 Tóm tắt mục 4

- Giảm phân II giống nguyên phân: **tách nhiễm sắc tử chị em**, n → n.
- Không tiếp hợp, không trao đổi chéo, không nhân đôi DNA.
- Kết thúc: từ 1 tế bào mẹ 2n → tổng **4 tế bào con n** (giao tử).

---

## 5. Đa dạng di truyền — vì sao anh em không giống hệt nhau

### 💡 Trực giác / Hình dung

Vì sao 2 anh em ruột (cùng bố cùng mẹ) lại khác nhau? Vì mỗi giao tử là một **bộ bài được xáo trộn ngẫu nhiên** từ tủ bài của bố mẹ. Giảm phân + thụ tinh là một "máy trộn" cực mạnh, tạo ra số tổ hợp khổng lồ đến mức gần như không bao giờ lặp lại (trừ sinh đôi cùng trứng).

### 5.1. Ba nguồn tạo đa dạng

1. **Phân ly độc lập (independent assortment)**: ở kỳ giữa I, mỗi cặp tương đồng tự định hướng **ngẫu nhiên** về 2 cực, độc lập với các cặp khác. Với **n cặp** → **2ⁿ tổ hợp** giao tử khác nhau.
2. **Trao đổi chéo (crossing over)**: tạo NST tái tổ hợp (§3.2), thêm vô số biến dị ngoài 2ⁿ.
3. **Thụ tinh ngẫu nhiên (random fertilization)**: bất kỳ 1 trong 2ⁿ loại trứng gặp bất kỳ 1 trong 2ⁿ loại tinh trùng → **2ⁿ × 2ⁿ = 2²ⁿ** tổ hợp hợp tử.

### 5.2. Công thức 2ⁿ và walk-through bằng số

Với **n cặp NST**, số kiểu giao tử do phân ly độc lập = **2ⁿ**. Vì sao là 2 mũ n? Mỗi cặp có **2 cách** sắp (NST bố lên trên hay NST mẹ lên trên); n cặp độc lập → nhân các lựa chọn: \`2 × 2 × ... × 2\` (n lần) = 2ⁿ.

| n (số cặp NST) | 2ⁿ = số kiểu giao tử | Cách tính |
|:---:|:---:|---|
| 1 | 2 | 2¹ |
| 2 | 4 | 2² = 2×2 |
| 3 | 8 | 2³ = 2×2×2 |
| 10 | 1.024 | 2¹⁰ |
| 23 (người) | 8.388.608 ≈ **8,4 triệu** | 2²³ |

**Thụ tinh** nhân tiếp lên: với người, số tổ hợp hợp tử = 2²³ × 2²³ = **2⁴⁶ ≈ 70.368.744.177.664 ≈ 70 nghìn tỉ** tổ hợp — đó là chưa kể trao đổi chéo. Con số này lớn hơn rất nhiều tổng số người từng sống → mỗi cá thể gần như độc nhất.

### 5.3. Bốn ví dụ số cụ thể

**Ví dụ 1 — n = 1**: 1 cặp NST → giao tử có 2 kiểu (nhận NST bố HOẶC NST mẹ). 2¹ = **2**.

**Ví dụ 2 — n = 2** (cặp 1: B/b · cặp 2: T/t): liệt kê được 4 kiểu giao tử: **BT, Bt, bT, bt** = 2² = **4**. (Tự đếm bằng tay được — viz mục 4 minh họa.)

**Ví dụ 3 — n = 3**: 2³ = **8** kiểu. Vd với 3 cặp (A/a, B/b, C/c): ABC, ABc, AbC, Abc, aBC, aBc, abC, abc — đúng 8.

**Ví dụ 4 — ruồi giấm n = 4**: 2⁴ = **16** kiểu giao tử chỉ riêng do phân ly độc lập. Thụ tinh: 2⁴ × 2⁴ = 2⁸ = **256** tổ hợp hợp tử.

### ⚠ Lỗi thường gặp

- **Dùng 2n thay vì n trong công thức**: số kiểu giao tử là 2 mũ **n (số cặp)**, không phải 2 mũ 2n. Người: 2²³, không phải 2⁴⁶.
- **Quên trao đổi chéo là nguồn riêng**: 2ⁿ chỉ đếm phân ly độc lập; trao đổi chéo tạo thêm biến dị vượt ngoài con số này.
- **Nhầm "tổ hợp giao tử" với "tổ hợp hợp tử"**: giao tử = 2ⁿ; hợp tử (sau thụ tinh) = 2ⁿ × 2ⁿ = 2²ⁿ.

### ❓ Câu hỏi tự nhiên của người đọc

**Q: Vì sao sinh đôi cùng trứng lại giống hệt nhau dù có giảm phân?**
A: Vì sinh đôi cùng trứng đến từ **1 hợp tử duy nhất** (đã thụ tinh xong, đã cố định 1 tổ hợp), rồi mới tách làm đôi ở giai đoạn phôi sớm bằng **nguyên phân** (sao y bản chính). Đa dạng của giảm phân xảy ra **trước** thụ tinh nên không ảnh hưởng. Sinh đôi khác trứng (2 trứng + 2 tinh trùng) thì khác nhau như anh em thường.

### 🔁 Dừng lại tự kiểm tra

1. Loài có 2n = 10. Số kiểu giao tử do phân ly độc lập là bao nhiêu?
2. Cùng loài đó, số tổ hợp hợp tử khả dĩ khi thụ tinh là bao nhiêu?

<details>
<summary>Đáp án</summary>

1. 2n = 10 → n = 5 → 2⁵ = **32** kiểu giao tử.
2. 2⁵ × 2⁵ = 2¹⁰ = **1.024** tổ hợp hợp tử.
</details>

### 📝 Tóm tắt mục 5

- 3 nguồn đa dạng: **phân ly độc lập** (2ⁿ kiểu giao tử), **trao đổi chéo** (thêm tái tổ hợp), **thụ tinh ngẫu nhiên** (2²ⁿ tổ hợp hợp tử).
- Công thức: số kiểu giao tử = 2^n (n = số cặp NST). Người: 2²³ ≈ 8,4 triệu; hợp tử ≈ 70 nghìn tỉ.
- Dùng **n** (số cặp), không phải 2n, trong công thức.

---

## 6. So sánh nguyên phân và giảm phân

### 💡 Trực giác / Hình dung

Nguyên phân = "máy in bản sao" (ra 2 bản giống hệt, dùng để **lớn lên và thay tế bào**). Giảm phân = "máy chia bài và xáo trộn" (ra 4 bản khác nhau, mỗi bản nửa bộ, dùng để **sinh sản hữu tính**).

### 6.1. Bảng so sánh 6 tiêu chí

| Tiêu chí | Nguyên phân (mitosis) | Giảm phân (meiosis) |
|----------|----------------------|---------------------|
| Số lần phân chia | **1** | **2** (I và II) |
| Số tế bào con | **2** | **4** |
| Bộ NST tế bào con | **2n** (giữ nguyên) | **n** (giảm một nửa) |
| Giống tế bào mẹ? | **Giống hệt** (sao y) | **Khác** (tái tổ hợp + phân ly độc lập) |
| Trao đổi chéo | **Không** | **Có** (kỳ đầu I) |
| Mục đích | Sinh trưởng, sửa chữa, sinh sản vô tính | Tạo giao tử cho sinh sản hữu tính |

### 6.2. Điểm giống nhau (để không quá thiên về khác biệt)

- Cả hai đều có **1 lần nhân đôi DNA (pha S)** trước khi bắt đầu.
- Cả hai dùng **thoi phân bào** kéo NST.
- **Giảm phân II** về cơ chế giống hệt nguyên phân (tách nhiễm sắc tử chị em).

### ❓ Câu hỏi tự nhiên của người đọc

**Q: Tế bào con nguyên phân giống mẹ, vậy đột biến có truyền không?**
A: Có — nếu sao chép DNA bị lỗi (pha S) thì cả 2 tế bào con đều mang lỗi đó. Nhưng đột biến **tế bào sinh dưỡng** chỉ ảnh hưởng cá thể, không di truyền cho đời sau. Chỉ đột biến trong giảm phân (tạo giao tử) mới truyền cho con.

**Q: Vì sao cần cả hai loại phân bào?**
A: Nguyên phân để **xây và duy trì** cơ thể (từ 1 hợp tử thành hàng nghìn tỉ tế bào, thay tế bào chết). Giảm phân để **truyền giống** (tạo giao tử n). Thiếu một trong hai thì hoặc không lớn được, hoặc không sinh sản hữu tính được.

### ⚠ Lỗi thường gặp

- **Nghĩ giảm phân cũng cho tế bào giống mẹ**: SAI — giảm phân tạo biến dị (trao đổi chéo + phân ly độc lập). Đây là khác biệt cốt lõi với nguyên phân.
- **Nghĩ nguyên phân tạo giao tử**: SAI — nguyên phân tạo tế bào sinh dưỡng 2n; giao tử chỉ từ giảm phân.

### 🔁 Dừng lại tự kiểm tra

1. Một quá trình phân bào tạo ra 4 tế bào, mỗi tế bào n, có trao đổi chéo. Đó là nguyên phân hay giảm phân?
2. Tế bào da người (2n = 46) nguyên phân tạo tế bào con có bao nhiêu NST? Còn giảm phân thì sao?

<details>
<summary>Đáp án</summary>

1. **Giảm phân** (4 tế bào, đơn bội n, có trao đổi chéo — cả 3 dấu hiệu đều của giảm phân).
2. Nguyên phân: tế bào con **2n = 46** (giống hệt). Giảm phân không xảy ra ở tế bào da (chỉ tế bào sinh dục); nếu xét tế bào sinh dục thì giao tử **n = 23**.
</details>

### 📝 Tóm tắt mục 6

- 6 tiêu chí then chốt: số lần chia (1 vs 2), số tế bào con (2 vs 4), bộ NST (2n vs n), giống mẹ (có vs không), trao đổi chéo (không vs có), mục đích (sinh trưởng/vô tính vs tạo giao tử/hữu tính).
- Giống nhau: đều 1 lần nhân đôi DNA, đều dùng thoi phân bào; giảm phân II ≈ nguyên phân.

---

## 7. Bài tập + Lời giải chi tiết

### Bài tập

**Bài 1**: Một loài có 2n = 16. Trả lời: (a) giao tử có bao nhiêu NST? (b) Sau pha S, tế bào sinh dục có bao nhiêu NST và bao nhiêu chromatid? (c) Cuối giảm phân I, mỗi tế bào có bao nhiêu NST? (d) Số kiểu giao tử do phân ly độc lập?

**Bài 2**: Sắp xếp các sự kiện sau vào đúng kỳ của giảm phân: (a) nhiễm sắc tử chị em tách nhau; (b) tiếp hợp tạo tetrad; (c) NST tương đồng tách nhau về 2 cực; (d) cặp tương đồng xếp 2 hàng ở xích đạo; (e) trao đổi chéo.

**Bài 3**: Một tế bào sinh dục của loài 2n = 6 mang các cặp tương đồng (Aa), (Bb), (Cc). Liệt kê **tất cả** kiểu giao tử khả dĩ do phân ly độc lập (bỏ qua trao đổi chéo). Đếm số lượng và kiểm tra bằng công thức 2ⁿ.

**Bài 4**: Người có 2n = 46. Tính: (a) số kiểu giao tử do phân ly độc lập; (b) số tổ hợp hợp tử khả dĩ khi 2 người sinh con (bỏ qua trao đổi chéo). So sánh con số (b) với tổng dân số thế giới hiện nay (~8 tỉ) và nêu ý nghĩa.

**Bài 5**: Điền bảng so sánh: với một tế bào mẹ 2n = 8, hãy cho biết kết quả của (a) nguyên phân và (b) giảm phân về: số tế bào con, bộ NST mỗi tế bào con, mức độ giống tế bào mẹ.

**Bài 6**: NST từ bố mang dãy gen \`M-N-O-P\`, NST tương đồng từ mẹ mang \`m-n-o-p\`. Trao đổi chéo xảy ra giữa N và O. Viết ra 4 kiểu chromatid sau trao đổi chéo và chỉ rõ cái nào là tái tổ hợp.

### Lời giải

**Bài 1**:
- (a) Giao tử = n = 16 / 2 = **8 NST**.
- (b) Sau pha S: số NST **không đổi = 16**; mỗi NST có 2 chromatid → **32 chromatid**.
- (c) Cuối giảm phân I: số NST giảm một nửa → **8 NST** (mỗi NST vẫn còn 2 chromatid).
- (d) n = 8 → 2⁸ = **256** kiểu giao tử.

**Bài 2**:
- (a) nhiễm sắc tử chị em tách nhau → **Kỳ sau II (Anaphase II)**.
- (b) tiếp hợp tạo tetrad → **Kỳ đầu I (Prophase I)**.
- (c) NST tương đồng tách nhau → **Kỳ sau I (Anaphase I)**.
- (d) cặp tương đồng xếp 2 hàng ở xích đạo → **Kỳ giữa I (Metaphase I)**.
- (e) trao đổi chéo → **Kỳ đầu I (Prophase I)**.

**Bài 3**:
- n = 3 cặp → công thức cho 2³ = **8** kiểu giao tử.
- Liệt kê đầy đủ (mỗi vị trí chọn 1 alen của mỗi cặp): **ABC, ABc, AbC, Abc, aBC, aBc, abC, abc**.
- Đếm: 8 kiểu. Khớp 2³ = 8 ✓.
- Lý do mỗi alen viết hoa/thường xen kẽ: mỗi cặp đóng góp 2 lựa chọn (A hoặc a, B hoặc b, C hoặc c), độc lập → 2×2×2 = 8 tổ hợp.

**Bài 4**:
- (a) n = 23 → 2²³ = **8.388.608 ≈ 8,4 triệu** kiểu giao tử.
- (b) Mỗi bố mẹ tạo 2²³ kiểu → con = 2²³ × 2²³ = 2⁴⁶ = **70.368.744.177.664 ≈ 70 nghìn tỉ** tổ hợp hợp tử.
- Ý nghĩa: 70 nghìn tỉ lớn hơn dân số thế giới (~8 tỉ) khoảng **8.800 lần**, và lớn hơn tổng số người từng sống. Do đó (chưa kể trao đổi chéo) hầu như không có 2 cá thể nào — trừ sinh đôi cùng trứng — giống hệt nhau về di truyền. Đây là nền tảng của đa dạng sinh học.

**Bài 5** (2n = 8 → n = 4):

| Tiêu chí | (a) Nguyên phân | (b) Giảm phân |
|----------|:---:|:---:|
| Số tế bào con | **2** | **4** |
| Bộ NST mỗi tế bào con | **2n = 8** | **n = 4** |
| Giống tế bào mẹ? | **Giống hệt** | **Khác** (trao đổi chéo + phân ly độc lập) |

**Bài 6**:
- Tetrad gồm 4 chromatid: 2 của bố (\`M-N-O-P\`) và 2 của mẹ (\`m-n-o-p\`). Trao đổi chéo giữa N và O xảy ra giữa 2 chromatid không-chị-em.
- Bốn kiểu chromatid sau trao đổi:
  - Chromatid 1: **\`M-N-O-P\`** (gốc bố, không tham gia → không đổi).
  - Chromatid 2: **\`M-N-o-p\`** ← **tái tổ hợp** (nửa đầu bố \`M-N\`, nửa sau mẹ \`o-p\`).
  - Chromatid 3: **\`m-n-O-P\`** ← **tái tổ hợp** (nửa đầu mẹ \`m-n\`, nửa sau bố \`O-P\`).
  - Chromatid 4: **\`m-n-o-p\`** (gốc mẹ, không tham gia → không đổi).
- Hai chromatid tái tổ hợp là chromatid 2 và 3. Từ 2 kiểu ban đầu, trao đổi chéo tạo ra 4 kiểu khác nhau → tăng đa dạng.

---

## 8. Liên kết và bài tiếp theo

**Đây là bài học cuối cùng của Tầng 1 (Molecules & Cells).** Từ phân tử (Lesson 01) đến tế bào, màng, enzyme, hô hấp, quang hợp, nguyên phân và nay là giảm phân — bạn đã đi hết hành trình "sự sống ở cấp phân tử và tế bào". Giảm phân là **cầu nối tự nhiên sang Tầng 2**, vì giao tử mang NST chính là vật mang **gen** truyền cho đời sau.

- **Đối chiếu trực tiếp**: [Lesson 07 — Chu kỳ tế bào & nguyên phân](../lesson-07-cell-cycle-mitosis/) — bảng so sánh §6 dựa trên bài này.
- **Tầng 2 — Di truyền & Tiến hóa**: [\`Biology/02-Genetics-Evolution\`](../../02-Genetics-Evolution/) — toàn bộ tầng tiếp theo.
  - [Tầng 2, Lesson 01 — Di truyền học Mendel](../../02-Genetics-Evolution/lesson-01-mendelian-genetics/): **phân ly độc lập** và **giảm phân** chính là cơ sở tế bào học của các định luật Mendel. Tỉ lệ 3:1, 9:3:3:1 đến từ cách các cặp alen phân ly trong giảm phân — bạn sẽ thấy lý thuyết §5 "biến thành" toán di truyền.
  - [Tầng 2, Lesson 06 — Di truyền học quần thể](../../02-Genetics-Evolution/lesson-06-population-genetics/): đa dạng giao tử (§5) ở cấp quần thể trở thành **tần số alen** và định luật Hardy–Weinberg — nền tảng định lượng của tiến hóa.
- **Đọc thêm**: mô phỏng tương tác — [\`visualization.html\`](./visualization.html) của bài này.

---

## 📝 Tổng kết Lesson 08

1. **Mục đích giảm phân**: biến tế bào **2n → 4 giao tử n**, để thụ tinh khôi phục 2n, giữ bộ NST ổn định qua các thế hệ (người: 46 → 23 → 46).
2. **1 lần nhân đôi (pha S) + 2 lần phân chia**: giảm phân I tách **NST tương đồng** (giảm nhiễm, 2n → n); giảm phân II tách **nhiễm sắc tử chị em** (tương đương, n → n). Số NST giảm một nửa ở **cuối giảm phân I**.
3. **Kỳ đầu I** là tâm điểm: tiếp hợp → tetrad (4 chromatid) → **trao đổi chéo** tạo NST tái tổ hợp.
4. **Đa dạng di truyền** từ 3 nguồn: phân ly độc lập (**2ⁿ** kiểu giao tử), trao đổi chéo, thụ tinh ngẫu nhiên (**2²ⁿ** tổ hợp hợp tử). Người: 2²³ ≈ 8,4 triệu giao tử, ≈ 70 nghìn tỉ hợp tử.
5. **So sánh với nguyên phân**: 1 vs 2 lần chia; 2 vs 4 tế bào con; 2n vs n; giống mẹ vs khác; không vs có trao đổi chéo; sinh trưởng/vô tính vs tạo giao tử/hữu tính.

---

> **🎓 Tầng 1 (Molecules & Cells) đã hoàn tất.** Bạn đã nắm trọn câu chuyện sự sống ở cấp phân tử và tế bào: từ 4 nhóm phân tử sinh học, qua màng và bào quan, enzyme, hô hấp và quang hợp, đến hai kiểu phân bào. Hành trình tiếp theo đưa bạn lên cấp độ **thông tin di truyền và tiến hóa** — nơi giao tử bạn vừa học sẽ mang gen đi viết tiếp câu chuyện của các thế hệ.

**Tiếp theo**: [Tầng 2 — Di truyền & Tiến hóa](../../02-Genetics-Evolution/) · bắt đầu với [Lesson 01 — Di truyền học Mendel](../../02-Genetics-Evolution/lesson-01-mendelian-genetics/)
`;
