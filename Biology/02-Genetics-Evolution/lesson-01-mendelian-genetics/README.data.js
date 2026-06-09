// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: Biology/02-Genetics-Evolution/lesson-01-mendelian-genetics/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 01 — Quy luật Mendel

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Hiểu **vì sao Mendel "đoán đúng" cơ chế di truyền (heredity)** dù năm 1865 khoa học chưa biết gene là gì, chưa biết DNA — chỉ bằng đếm hạt đậu.
- Phân biệt **gene (gen)**, **allele (đẳng vị)**, **kiểu gen (genotype)**, **kiểu hình (phenotype)**; **đồng hợp tử (homozygous)** vs **dị hợp tử (heterozygous)**; **trội hoàn toàn (complete dominance)**.
- Phát biểu được **Quy luật 1 — Phân ly (Law of Segregation)** và liên hệ trực tiếp với **giảm phân (meiosis) I** đã học ở Tầng 1.
- Dựng được **khung Punnett (Punnett square)** 2×2 cho lai một tính và 4×4 cho lai hai tính; đọc ra **tỉ lệ kiểu gen** và **tỉ lệ kiểu hình**.
- Phát biểu được **Quy luật 2 — Phân ly độc lập (Law of Independent Assortment)** và biết khi nào nó **không áp dụng được**.
- Tính được số loại giao tử của cá thể có **n cặp gen dị hợp** ($2^n$), tỉ lệ kiểu hình của lai 2 tính (9:3:3:1), và kết quả của **lai phân tích (test cross)**.
- Đối chiếu **tỉ lệ lý thuyết** với **số liệu thực nghiệm** của Mendel (7324 hạt trơn : 1850 hạt nhăn) và hiểu vì sao "gần 3:1" chứ không "đúng 3:1".

## Kiến thức tiền đề

- [\`Biology/01-Molecules-Cells/lesson-08-meiosis\`](../../01-Molecules-Cells/lesson-08-meiosis/) — **giảm phân I tách cặp NST tương đồng** chính là cơ sở vật lý của Quy luật 1; **trao đổi chéo + sắp xếp ngẫu nhiên kỳ giữa I** là cơ sở của Quy luật 2. Bài này giả định bạn đã hình dung được 2 NST tương đồng tách ra.
- [\`Biology/01-Molecules-Cells/lesson-01-biomolecules\`](../../01-Molecules-Cells/lesson-01-biomolecules/) — DNA là vật chất di truyền; gene là đoạn DNA. Mendel không biết điều này, nhưng để học hiện đại ta cần.
- Xác suất cơ bản (cộng, nhân) — đếm khả năng giao tử và Punnett bản chất là đếm tổ hợp.

---

## 1. Mendel đã làm gì và vì sao quan trọng

### 💡 Trực giác / Hình dung

Hãy hình dung năm 1865: chưa ai biết DNA, chưa ai thấy nhiễm sắc thể (chromosome) phân chia, từ "gene" còn chưa được đặt ra. Một tu sĩ tên **Gregor Mendel** trồng **~28 000 cây đậu Hà Lan** (*Pisum sativum*) trong vườn tu viện, kiên trì lai chéo từng cặp, đếm từng hạt suốt 8 năm — và đoán ra **đúng** cơ chế di truyền mà phải 50 năm sau khoa học mới xác nhận. Mendel làm được vì ông xử lý di truyền như một **bài toán đếm xác suất**, không phải triết học.

### 1.1. Vì sao đậu Hà Lan là lựa chọn thiên tài

| Đặc điểm | Lý do quan trọng |
|----------|------------------|
| Tự thụ phấn (self-pollination) tự nhiên | Dễ duy trì **dòng thuần chủng (pure line)** qua nhiều thế hệ |
| Có thể ép lai chéo bằng tay | Mendel chủ động chọn bố–mẹ |
| 7 tính trạng tương phản rõ ràng | trơn/nhăn, vàng/lục, tím/trắng… đếm được, không "lưng chừng" |
| Vòng đời 1 năm, nhiều hạt/cây | Cỡ mẫu lớn → tỉ lệ ổn định |

7 cặp tính trạng Mendel chọn đều là **trội hoàn toàn (complete dominance)** và **mỗi cặp do 1 gene quy định** — không phải may mắn, ông đã sàng lọc trước bằng các thử nghiệm sơ bộ.

### 1.2. Phương pháp: lai → đếm → tìm tỉ lệ

Mendel làm 3 bước cốt lõi:

1. **Tạo dòng thuần**: cho cây tự thụ phấn nhiều thế hệ đến khi tính trạng không đổi. Vd hạt trơn tự thụ → đời sau 100% trơn → thuần chủng.
2. **Lai chéo có chủ đích** dòng thuần khác nhau (P, parental).
3. **Đếm tỉ lệ kiểu hình** ở F1 (con) và F2 (cháu). Nhận ra tỉ lệ **3:1** quay đi quay lại.

### ❓ Câu hỏi tự nhiên của người đọc

**Q: Trước Mendel người ta nghĩ di truyền như thế nào?**
A: Theo thuyết **"hòa trộn" (blending inheritance)**: tính trạng bố và mẹ pha trộn như trộn sơn đỏ + trắng → hồng. Hệ quả: con luôn "ở giữa", và sau vài đời mọi sinh vật phải đồng đều. Nhưng đời thực không vậy — hạt nhăn biến mất ở F1 rồi **xuất hiện lại** ở F2. Thuyết hòa trộn không giải thích nổi. Mendel thay bằng mô hình "**hạt** rời rạc (particulate)": mỗi tính trạng do **các đơn vị di truyền rời** quy định, không pha trộn, có thể ẩn rồi hiện lại.

**Q: Vì sao công trình Mendel bị bỏ quên 35 năm?**
A: Mendel xuất bản 1866 nhưng (1) ngôn ngữ toán-thống kê khi đó lạ với giới sinh học; (2) không có cơ chế vật lý nào (chưa thấy NST, chưa biết DNA) để gắn vào — bị xem là "lý thuyết suông". Mãi 1900, ba nhà khoa học (de Vries, Correns, Tschermak) độc lập tái phát hiện. Lúc đó NST đã được nhìn thấy → mô hình Mendel có "chỗ tựa".

### ⚠ Lỗi thường gặp

- **Nghĩ "Mendel khám phá DNA"**: SAI. Mendel chưa từng biết DNA, gene, hay NST. Ông chỉ đoán ra **quy luật toán học** của di truyền; vật chất di truyền (DNA) phải đợi tới 1953.
- **Nghĩ mọi tính trạng đều theo Mendel**: nhiều tính trạng phức tạp (chiều cao người, màu da) do **nhiều gene** quy định + môi trường — không cho tỉ lệ 3:1 gọn gàng. Mendel may mắn (và khôn) khi chọn 7 tính trạng "sạch".

### 📝 Tóm tắt mục 1

- Mendel (1865, đậu Hà Lan) tìm ra quy luật di truyền bằng cách lai chéo có chủ đích và đếm tỉ lệ kiểu hình.
- Mô hình "hạt rời rạc" thay thế thuyết "hòa trộn" — giải thích được tại sao tính trạng có thể ẩn rồi hiện lại.
- Công trình bị bỏ quên 35 năm, tái phát hiện 1900 khi đã có nhiễm sắc thể làm bằng chứng vật lý.

---

## 2. Bộ từ vựng nền: gene, allele, genotype, phenotype

### 💡 Trực giác / Hình dung

Hình dung mỗi gene như một **ô trên thẻ căn cước** — vd "ô màu hoa". **Allele** là các **giá trị có thể điền vào ô đó**: vd \`A\` (tím) hoặc \`a\` (trắng). Mỗi cá thể (đậu Hà Lan lưỡng bội, diploid) có **2 bản** của mỗi gene — một từ bố, một từ mẹ — nên thẻ căn cước có **2 ô** cho cùng một tính trạng. Cách điền 2 ô đó = **kiểu gen (genotype)**; cái mắt thấy ngoài đời (màu hoa thực) = **kiểu hình (phenotype)**.

### 2.1. Định nghĩa rõ ràng

- **Gene (gen)**: đoạn DNA mang thông tin cho 1 tính trạng (vd gene quy định màu hoa).
- **Allele (đẳng vị)**: các **phiên bản khác nhau** của cùng một gene. Quy ước viết: chữ in hoa \`A\` cho allele trội, chữ thường \`a\` cho allele lặn của cùng gene.
- **Kiểu gen (genotype)**: cặp allele mà cá thể mang. Có 3 dạng với 1 gene 2 allele:
  - **AA** — đồng hợp trội (homozygous dominant)
  - **aa** — đồng hợp lặn (homozygous recessive)
  - **Aa** — dị hợp (heterozygous)
- **Kiểu hình (phenotype)**: biểu hiện ra ngoài, cái ta đo/quan sát được (màu hoa tím, hạt trơn…).
- **Trội hoàn toàn (complete dominance)**: khi có mặt allele trội, kiểu hình giống đồng hợp trội. Vd \`Aa\` cho hoa tím giống \`AA\`. Allele lặn chỉ biểu hiện khi **đồng hợp lặn** \`aa\`.

### 2.2. Bốn ví dụ số cụ thể

**Ví dụ 1 — Đậu hoa tím/trắng**: gene màu hoa có 2 allele \`A\` (tím, trội) và \`a\` (trắng, lặn).
- \`AA\` → hoa tím (kiểu gen đồng hợp trội).
- \`Aa\` → hoa tím (dị hợp, vẫn tím vì trội hoàn toàn).
- \`aa\` → hoa trắng (đồng hợp lặn).
**Có 3 kiểu gen** nhưng chỉ **2 kiểu hình**.

**Ví dụ 2 — Đậu hạt trơn/nhăn**: \`R\` (trơn, trội), \`r\` (nhăn, lặn).
- \`RR\` → trơn. \`Rr\` → trơn. \`rr\` → nhăn.
- Bố \`RR\` × Mẹ \`rr\` → con luôn \`Rr\` → 100% trơn (mặc dù mẹ nhăn!). Đây là cái thuyết "hòa trộn" KHÔNG giải thích nổi — phải không "hồng" mà trơn hẳn.

**Ví dụ 3 — Hai gene cùng lúc** (chuẩn bị cho §5): gene màu (\`A/a\`) và gene hình hạt (\`R/r\`).
- \`AARR\` → đồng hợp trội cả 2 → tím + trơn.
- \`AaRr\` → dị hợp cả 2 → tím + trơn (vì cả A và R đều trội).
- \`aarr\` → đồng hợp lặn cả 2 → trắng + nhăn.
**Số kiểu gen có thể** = 3 × 3 = **9** (vì mỗi gene có 3 dạng kiểu gen, độc lập).

**Ví dụ 4 — Cây có 4 cặp gene dị hợp** \`AaBbCcDd\`. Đây không phải kiểu gen lạ — sau này dùng để tính số loại giao tử. **4 cặp dị hợp → $2^4 = 16$ loại giao tử khác nhau** (§5.3). Chỉ riêng việc này đã cho thấy độ đa dạng tăng cấp số nhân theo n.

### ⚠ Lỗi thường gặp

- **Nhầm kiểu gen với kiểu hình**: nhìn 1 cây hoa tím KHÔNG đủ để biết kiểu gen — có thể là \`AA\` hoặc \`Aa\`. Phân biệt được bằng **lai phân tích** (§6).
- **Viết \`AA\` và \`aa\` mà coi như cùng kiểu gen**: 2 cá thể đều "đồng hợp" nhưng đồng hợp về allele KHÁC nhau → kiểu gen khác nhau, kiểu hình khác nhau.
- **Viết \`Aa\` rồi nói "kiểu hình lai"**: kiểu hình của \`Aa\` (trội hoàn toàn) giống hệt \`AA\`. Đừng tự bịa ra "kiểu hình trung gian" cho \`Aa\` — đó là trội không hoàn toàn, một quy luật khác (sẽ học sau).

### 🔁 Dừng lại tự kiểm tra

1. Một cây đậu hoa tím lai với cây hoa trắng cho con có 50% hoa tím + 50% hoa trắng. Kiểu gen của bố mẹ là gì?
2. Cây \`AaBb\` có bao nhiêu kiểu gen có thể có ở thế hệ con khi tự thụ phấn? (Chỉ đếm số dạng kiểu gen khác nhau, chưa cần tỉ lệ.)

<details>
<summary>Đáp án</summary>

1. Cây hoa trắng chắc chắn \`aa\` (lặn chỉ biểu hiện khi đồng hợp). Cây hoa tím cho 50% con trắng → phải truyền được \`a\` cho con với xác suất 50% → cây tím phải là **\`Aa\`** (dị hợp). Nếu là \`AA\` thì 100% con tím. Vậy bố/mẹ: **\`Aa\` × \`aa\`**.
2. Mỗi gene có 3 kiểu gen (AA, Aa, aa) → 2 gene → 3 × 3 = **9 kiểu gen** ở con: AABB, AABb, AAbb, AaBB, AaBb, Aabb, aaBB, aaBb, aabb.
</details>

### 📝 Tóm tắt mục 2

- Gene = đoạn DNA cho 1 tính trạng; allele = các phiên bản của 1 gene; kiểu gen = cặp allele; kiểu hình = biểu hiện thật.
- Với 1 gene 2 allele: 3 kiểu gen (AA, Aa, aa) nhưng nếu trội hoàn toàn chỉ có 2 kiểu hình.
- Quy ước: chữ hoa cho trội, chữ thường cho lặn. Đồng hợp = 2 allele giống, dị hợp = 2 allele khác.

---

## 3. Quy luật 1 — Phân ly (Law of Segregation)

### 💡 Trực giác / Hình dung

Mỗi cá thể có **2 lá bài** (allele) của một gene. Khi tạo giao tử (gamete: tinh trùng, trứng, hạt phấn, noãn), cá thể **chia 2 lá bài đó ra 2 giao tử khác nhau** — mỗi giao tử nhận đúng **1 lá**, ngẫu nhiên 50/50. Khi thụ tinh, 2 giao tử (1 từ bố, 1 từ mẹ) hợp lại → con có lại đủ 2 lá. Đó là **phân ly**: cặp allele không bao giờ "đi cùng nhau" qua giao tử.

### 3.1. Phát biểu hình thức

**Quy luật phân ly (Mendel 1)**: *Khi hình thành giao tử, hai allele của một gene phân ly độc lập với nhau; mỗi giao tử chỉ nhận một allele với xác suất 1/2 cho mỗi loại.*

Cơ sở vật lý đã biết ngày nay (Mendel chưa biết): trong **giảm phân I (meiosis I)** (Tầng 1, Lesson 08), cặp **NST tương đồng (homologous chromosomes)** — mỗi cái mang 1 allele — bị **tách ra 2 tế bào con**. Một NST trong cặp đi đường này, NST còn lại đi đường kia → 2 allele tự động vào 2 giao tử khác nhau.

### 3.2. Lai một tính (monohybrid cross) — chứng minh bằng Punnett

**Setup**: P thuần chủng \`AA\` (hoa tím) × \`aa\` (hoa trắng).

**Bước 1 — Tạo giao tử P**:
- \`AA\` chỉ cho 1 loại giao tử: \`A\`.
- \`aa\` chỉ cho 1 loại giao tử: \`a\`.

**Bước 2 — Thụ tinh**: Mọi con đều nhận \`A\` từ bố + \`a\` từ mẹ → **F1 toàn \`Aa\`** → 100% hoa tím.

(Đây đã là bằng chứng đầu tiên rằng tính trạng KHÔNG hòa trộn: không có hoa hồng nhạt, mà toàn tím như bố \`AA\`.)

**Bước 3 — Cho F1 tự thụ phấn**: \`Aa\` × \`Aa\`.

\`Aa\` cho 2 loại giao tử với tỉ lệ ngang nhau: 1/2 \`A\`, 1/2 \`a\`.

Khung Punnett 2×2:

|  | **A (1/2)** | **a (1/2)** |
|---|---|---|
| **A (1/2)** | AA (1/4) | Aa (1/4) |
| **a (1/2)** | Aa (1/4) | aa (1/4) |

**Tỉ lệ kiểu gen F2**: \`1 AA : 2 Aa : 1 aa\`.
**Tỉ lệ kiểu hình F2**: 3 trội : 1 lặn (vì \`AA\` và \`Aa\` đều cho kiểu hình trội) = **3 tím : 1 trắng**.

### 3.3. Bốn ví dụ số cụ thể

**Ví dụ 1 — Xác suất chính xác từ Punnett**:
- P(con là AA) = 1/4 = 25%.
- P(con là Aa) = 2/4 = 50%.
- P(con là aa) = 1/4 = 25%.
- P(kiểu hình trội) = P(AA) + P(Aa) = 1/4 + 2/4 = **3/4 = 75%**.
- P(kiểu hình lặn) = P(aa) = **1/4 = 25%**.

**Ví dụ 2 — Mendel đếm thật**: hạt trơn vs nhăn ở F2:
- Mendel thu **7324 hạt trơn + 1850 hạt nhăn = 9174 hạt**.
- Tỉ lệ thực: 7324 / 1850 ≈ **3.96** — gần 4, hơi nhô so với 3.
- Tính lại theo "tỉ lệ trội:lặn": 7324 : 1850 ≈ **2.96 : 1**, sát 3 : 1.
- Dự đoán lý thuyết: 9174 × 3/4 = 6880.5 trơn ; 9174 × 1/4 = 2293.5 nhăn. Thực tế lệch ±444 — sai số mẫu bình thường khi cỡ ~9k.

**Ví dụ 3 — Khi P không thuần chủng**: lai \`Aa\` × \`Aa\` (cả 2 bố mẹ đều dị hợp): kết quả giống F1×F1, vẫn là 1:2:1 ở kiểu gen và 3:1 ở kiểu hình. Vậy lai \`Aa × Aa\` luôn cho 3:1 — không cần qua F1.

**Ví dụ 4 — Cỡ mẫu nhỏ thì lệch nhiều**: nuôi đúng **4 con** từ \`Aa × Aa\`. Tỉ lệ kỳ vọng: 3 trội : 1 lặn. Nhưng xác suất có đúng 3 trội + 1 lặn = C(4,1) × (3/4)³ × (1/4)¹ = 4 × 27/64 × 1/4 ≈ **0.42 (42%)**. Tức **58%** trường hợp lệch khỏi tỉ lệ "đẹp". Đây là lý do Mendel cần ~9000 hạt, không phải 9 hạt.

### ⚠ Lỗi thường gặp

- **Đảo "tỉ lệ kiểu gen" với "tỉ lệ kiểu hình"**: F2 kiểu **gen** là 1:2:1; kiểu **hình** là 3:1. Trộn lẫn → sai mọi bài tập về sau.
- **Nghĩ "F1 dị hợp luôn = trung gian"**: trong trội hoàn toàn, F1 dị hợp giống y kiểu hình bố hoặc mẹ trội. Chỉ ở "trội không hoàn toàn" (incomplete dominance) mới có kiểu hình trung gian — đó là quy luật khác, sẽ học ở bài sau.
- **Nghĩ "3:1 nghĩa là cứ 4 con thì 3 trội 1 lặn"**: SAI. 3:1 là **tỉ lệ kỳ vọng** khi cỡ mẫu lớn. Cỡ nhỏ có thể lệch nhiều (xem ví dụ 4).
- **Vẽ Punnett mà quên tỉ lệ giao tử**: nếu bố là \`AA\` (chỉ cho \`A\`) chứ không phải \`Aa\`, Punnett sẽ không phải 2×2 mà chỉ 1×2.

### ❓ Câu hỏi tự nhiên của người đọc

**Q: Mendel chưa biết giảm phân, sao đoán đúng được?**
A: Mendel đoán có "nhân tố di truyền" rời rạc đi vào giao tử với xác suất 1/2 — chỉ từ quan sát tỉ lệ 3:1. Cơ chế vật lý (giảm phân I tách NST tương đồng) phải đợi tới ~1900 mới được chứng minh là cơ sở của quy luật này, qua "thuyết NST của di truyền" (chromosome theory of inheritance) — Sutton & Boveri.

**Q: Tỉ lệ 3:1 chỉ đúng với trội hoàn toàn?**
A: Đúng. Khi trội không hoàn toàn (red × white → pink), F2 cho **1:2:1** ở cả kiểu gen lẫn kiểu hình (đỏ:hồng:trắng). Khi đồng trội (codominance, vd nhóm máu AB), cũng không cho 3:1. Bài này giả định trội hoàn toàn — quy luật khác sẽ học sau.

### 🔁 Dừng lại tự kiểm tra

1. Lai \`Aa × Aa\` cho 240 con. Dự đoán số con kiểu gen \`AA\`, \`Aa\`, \`aa\`.
2. Một cặp bố mẹ đều mang gene lặn gây bệnh (\`Aa\`, biểu hiện bình thường). Xác suất sinh con bị bệnh là bao nhiêu? Nếu họ đã có 1 con bị bệnh, xác suất con thứ 2 bị bệnh có thay đổi không?

<details>
<summary>Đáp án</summary>

1. Tỉ lệ kỳ vọng 1:2:1 → 240/4 = 60. \`AA\` ≈ **60**, \`Aa\` ≈ **120**, \`aa\` ≈ **60**. (Thực tế có thể lệch ±vài chục.)
2. P(bệnh) = P(aa) = **1/4 = 25%**. Mỗi lần sinh con là một **biến cố độc lập** — giao tử tạo ra ngẫu nhiên mỗi lần, không nhớ lần trước. Vì vậy xác suất con thứ 2 bị bệnh **vẫn là 1/4**, không thay đổi vì đã có 1 con bệnh trước đó. Đây là sai lầm phổ biến (gambler's fallacy) trong di truyền.
</details>

### 📝 Tóm tắt mục 3

- Quy luật 1 — Phân ly: cặp allele tách ra 2 giao tử khác nhau, mỗi cái 1/2.
- Lai \`Aa × Aa\` cho F2 kiểu gen 1:2:1, kiểu hình 3:1 (trội:lặn).
- Cơ sở vật lý là giảm phân I tách cặp NST tương đồng.
- Cỡ mẫu nhỏ có thể lệch xa khỏi 3:1; cỡ ~9000 của Mendel đủ để thấy quy luật rõ.

---

## 4. Khung Punnett — công cụ đếm xác suất

### 💡 Trực giác / Hình dung

Khung Punnett là **bảng cộng x bảng nhân của di truyền**. Hàng = giao tử mẹ, cột = giao tử bố, ô = kiểu gen con kèm xác suất bằng tích xác suất hàng × xác suất cột. Bản chất chỉ là **đếm tổ hợp**: mỗi giao tử bố có thể gặp mỗi giao tử mẹ → liệt kê tất cả và cộng tỉ lệ giống nhau lại.

### 4.1. Quy trình chuẩn 4 bước

1. **Xác định kiểu gen bố mẹ** (vd \`Aa × Aa\`).
2. **Liệt kê các loại giao tử** mỗi bố/mẹ tạo, kèm xác suất.
   - \`AA\` → chỉ \`A\` (xác suất 1).
   - \`Aa\` → 1/2 \`A\`, 1/2 \`a\`.
   - \`aa\` → chỉ \`a\` (xác suất 1).
3. **Dựng bảng** (số hàng = số loại giao tử mẹ, số cột = số loại giao tử bố). Mỗi ô = ghép 1 giao tử mẹ + 1 giao tử bố.
4. **Đếm**: gom các ô có cùng kiểu gen → tỉ lệ kiểu gen. Gom các ô có cùng kiểu hình → tỉ lệ kiểu hình.

### 4.2. Bốn ví dụ Punnett cụ thể

**Ví dụ 1 — \`AA × aa\`** (P thuần chủng):
- Giao tử: bố chỉ \`A\`, mẹ chỉ \`a\`.
- Bảng 1×1: chỉ 1 ô = \`Aa\`.
- F1: **100% \`Aa\`** → 100% kiểu hình trội.

**Ví dụ 2 — \`Aa × Aa\`** (đã làm ở §3.2):
- Giao tử mỗi bên: 1/2 \`A\`, 1/2 \`a\`.
- Bảng 2×2 → 4 ô, mỗi ô 1/4.
- Kết quả: 1 AA : 2 Aa : 1 aa = kiểu hình 3:1.

**Ví dụ 3 — \`Aa × aa\`** (lai phân tích, sẽ học kỹ ở §6):
- Giao tử bố \`Aa\`: 1/2 \`A\`, 1/2 \`a\`. Giao tử mẹ \`aa\`: chỉ \`a\`.
- Bảng 2×1:

| | a (1) |
|---|---|
| **A (1/2)** | Aa (1/2) |
| **a (1/2)** | aa (1/2) |

- Kết quả: 1 \`Aa\` : 1 \`aa\` = **kiểu hình 1:1 (trội:lặn)**.

**Ví dụ 4 — \`AA × Aa\`**:
- Giao tử bố \`AA\`: chỉ \`A\`. Giao tử mẹ \`Aa\`: 1/2 \`A\`, 1/2 \`a\`.
- Bảng 1×2:

| | A (1/2) | a (1/2) |
|---|---|---|
| **A (1)** | AA (1/2) | Aa (1/2) |

- Kết quả kiểu gen 1 AA : 1 Aa; **kiểu hình 100% trội** (vì cả 2 đều có ít nhất 1 \`A\`).

### ⚠ Lỗi thường gặp

- **Quên tỉ lệ giao tử khi bố/mẹ thuần chủng**: nếu bố là \`AA\` thì chỉ cho 1 loại giao tử (\`A\`), không phải 2 — bảng không phải 2×2 nữa.
- **Cộng kiểu gen sai khi gom kiểu hình**: trong trội hoàn toàn, gom \`AA + Aa\` thành "trội". Đừng quên \`Aa\` xuất hiện **2 ô** (1 hàng × 1 cột rồi cộng đối xứng).
- **Vẽ Punnett 4×4 cho 1 gene 2 allele**: lãng phí. Bảng 4×4 dùng cho lai 2 gene độc lập (§5), không phải 1 gene.

### 🔁 Dừng lại tự kiểm tra

Lai \`AA × Aa\`. Vẽ Punnett. Tỉ lệ kiểu gen và kiểu hình ở F1 là gì?

<details>
<summary>Đáp án</summary>

Đã làm ở ví dụ 4: bảng 1×2 → 1 \`AA\` : 1 \`Aa\`. Kiểu gen 1:1. **Kiểu hình 100% trội** (cả AA lẫn Aa đều trội).
</details>

### 📝 Tóm tắt mục 4

- Punnett = bảng tổ hợp giao tử bố × giao tử mẹ, mỗi ô có xác suất bằng tích xác suất hàng × cột.
- Quy trình: kiểu gen P → liệt kê giao tử kèm xác suất → dựng bảng → đếm.
- Kích thước bảng = (số loại giao tử mẹ) × (số loại giao tử bố), KHÔNG cố định 2×2.

---

## 5. Quy luật 2 — Phân ly độc lập & lai hai tính (Dihybrid)

### 💡 Trực giác / Hình dung

Tưởng tượng 2 gene là **2 đồng xu khác nhau**. Tung xu 1 cho ra mặt sấp/ngửa độc lập với xu 2. Mendel phát hiện: với 2 gene **ở 2 cặp NST khác nhau**, kết quả của gene 1 không "kéo" gene 2 theo. Hệ quả: xác suất tổ hợp = **tích** xác suất của từng gene. Đây chính là Quy luật 2 — phân ly **độc lập**.

### 5.1. Phát biểu hình thức

**Quy luật phân ly độc lập (Mendel 2)**: *Các cặp allele của các gene khác nhau phân ly độc lập với nhau khi tạo giao tử, miễn là các gene đó nằm trên các cặp NST khác nhau.*

Cơ sở vật lý ngày nay: ở **kỳ giữa giảm phân I (metaphase I)**, các cặp NST tương đồng xếp lên mặt phẳng xích đạo **ngẫu nhiên hướng** — cặp 1 quay "đỏ trái–xanh phải" độc lập với cặp 2 quay "đỏ trái–xanh phải" hay "đỏ phải–xanh trái". Mỗi cách xếp cho ra tổ hợp giao tử khác nhau.

⚠ **Quan trọng**: 2 gene **trên cùng 1 NST** thì KHÔNG phân ly độc lập (chúng "đi cùng nhau", gọi là liên kết gene — gene linkage). Bài này giả định 2 gene ở 2 cặp NST khác — sẽ học gene linkage và bản đồ gene ở [Lesson 06 — Di truyền quần thể](../lesson-06-population-genetics/) và các bài sau.

### 5.2. Lai hai tính \`AaBb × AaBb\` — chứng minh 9:3:3:1

**Setup**: bố và mẹ đều dị hợp 2 gene (vd hạt vàng-trơn dị hợp ở cả 2 tính trạng).
- \`A/a\`: vàng/lục. \`B/b\`: trơn/nhăn.

**Bước 1 — Giao tử của \`AaBb\`**: vì A/a và B/b phân ly độc lập, có **2 × 2 = 4** loại giao tử với xác suất bằng nhau **1/4** mỗi loại:
- AB, Ab, aB, ab — mỗi loại 1/4.

**Bước 2 — Khung Punnett 4×4** (16 ô, mỗi ô 1/16):

|  | **AB** | **Ab** | **aB** | **ab** |
|---|---|---|---|---|
| **AB** | AABB | AABb | AaBB | AaBb |
| **Ab** | AABb | AAbb | AaBb | Aabb |
| **aB** | AaBB | AaBb | aaBB | aaBb |
| **ab** | AaBb | Aabb | aaBb | aabb |

**Bước 3 — Đếm kiểu hình** (gom theo "có ít nhất 1 trội mỗi gene"):

| Kiểu hình | Điều kiện | Số ô | Tỉ lệ |
|-----------|-----------|------|-------|
| Vàng-trơn (A_B_) | có ≥ 1 A và ≥ 1 B | 9 | 9/16 |
| Vàng-nhăn (A_bb) | có ≥ 1 A và bb | 3 | 3/16 |
| Lục-trơn (aaB_) | aa và ≥ 1 B | 3 | 3/16 |
| Lục-nhăn (aabb) | aa và bb | 1 | 1/16 |

**→ Tỉ lệ kiểu hình F2 = 9 : 3 : 3 : 1.**

### 5.3. Bốn ví dụ số cụ thể (số loại giao tử và tỉ lệ)

**Ví dụ 1 — Số loại giao tử của cá thể có n cặp dị hợp**:
- 1 cặp dị hợp (\`Aa\`): 2 loại giao tử (A, a).
- 2 cặp dị hợp (\`AaBb\`): $2 \\times 2 =$ **4** loại (AB, Ab, aB, ab).
- 3 cặp dị hợp (\`AaBbCc\`): $2^3 =$ **8** loại.
- 4 cặp dị hợp (\`AaBbCcDd\`): $2^4 =$ **16** loại.
- Tổng quát: $2^n$ **loại giao tử**. (Chứng minh: mỗi gene độc lập cho 2 lựa chọn → nhân lại.)

**Ví dụ 2 — Tách 9:3:3:1 thành tích của 2 lai một tính**: vì 2 gene độc lập, P(vàng-trơn) = P(vàng) × P(trơn) = (3/4) × (3/4) = **9/16**. Tương tự P(vàng-nhăn) = 3/4 × 1/4 = 3/16; P(lục-trơn) = 1/4 × 3/4 = 3/16; P(lục-nhăn) = 1/4 × 1/4 = 1/16. **Không cần vẽ 4×4** — chỉ cần nhân.

**Ví dụ 3 — Áp dụng vào số liệu**: lai \`AaBb × AaBb\` cho 320 con.
- Vàng-trơn: 320 × 9/16 = **180** con.
- Vàng-nhăn: 320 × 3/16 = **60**.
- Lục-trơn: 320 × 3/16 = **60**.
- Lục-nhăn: 320 × 1/16 = **20**.
- Tổng: 180 + 60 + 60 + 20 = 320 ✓.

**Ví dụ 4 — Mendel đếm thật ở lai 2 tính**: Mendel báo cáo tỉ lệ F2 cho hạt vàng-trơn / vàng-nhăn / lục-trơn / lục-nhăn:
- 315 : 101 : 108 : 32 = **315 + 101 + 108 + 32 = 556** hạt.
- Tỉ lệ thực: chia cho 32 → 9.84 : 3.16 : 3.38 : 1.
- Tỉ lệ lý thuyết 9:3:3:1 → kỳ vọng: 556 × 9/16 = 312.75 ; 104.25 ; 104.25 ; 34.75.
- Sát đáng kinh ngạc — chính số liệu này thuyết phục giới khoa học khi tái phát hiện năm 1900.

### ⚠ Lỗi thường gặp

- **Áp 9:3:3:1 cho gene linkage**: nếu 2 gene cùng NST, chúng đi cùng nhau, tỉ lệ KHÔNG còn 9:3:3:1. Quy luật 2 chỉ đúng cho gene **ở NST khác nhau**.
- **Nhầm 9:3:3:1 là tỉ lệ kiểu gen**: 9:3:3:1 là **kiểu hình**. Kiểu gen có 9 dạng khác nhau (3×3 = 9, đã thấy ở §2 ví dụ 3) với tỉ lệ phức tạp hơn.
- **Quên trội hoàn toàn**: 9:3:3:1 chỉ đúng khi **cả 2 gene đều trội hoàn toàn**. Nếu một gene trội không hoàn toàn, tỉ lệ khác.
- **Chỉ đếm 4 loại giao tử cho \`AaBb\`** rồi nghĩ luôn 4 loại với mọi 2 cặp dị hợp**: cẩn thận với \`AABb\` (chỉ dị hợp 1 cặp) — chỉ cho 2 loại giao tử, không 4. Công thức **2ⁿ** với n = số cặp **dị hợp**.

### ❓ Câu hỏi tự nhiên của người đọc

**Q: Vì sao tỉ lệ 9:3:3:1 cộng lại bằng 16 mà không phải 4?**
A: Vì có **2 gene độc lập**, mỗi gene cho 4 cách tổ hợp (Punnett 2×2). Hai gene cùng lúc = 4 × 4 = 16 ô. Mỗi ô là 1/16. Cộng 9/16 + 3/16 + 3/16 + 1/16 = 16/16 = 1 ✓.

**Q: Lai \`AaBb × aabb\` (lai phân tích kép) cho tỉ lệ kiểu hình gì?**
A: \`aabb\` chỉ cho 1 loại giao tử \`ab\`. \`AaBb\` cho 4 loại (AB, Ab, aB, ab) đều 1/4. Tổ hợp: AaBb : Aabb : aaBb : aabb = **1 : 1 : 1 : 1** (vàng-trơn : vàng-nhăn : lục-trơn : lục-nhăn). Đây là cách quan trọng để **xác nhận gene độc lập** — nếu lệch khỏi 1:1:1:1, có thể có liên kết gene.

### 🔁 Dừng lại tự kiểm tra

1. Cá thể \`AaBbCC\` cho bao nhiêu loại giao tử khác nhau?
2. Lai \`AaBb × AaBb\` cho 800 con. Trong số con có kiểu hình **vàng-trơn**, có bao nhiêu con có kiểu gen \`AaBb\` (dị hợp cả 2)?

<details>
<summary>Đáp án</summary>

1. Chỉ có 2 cặp dị hợp (\`Aa\` và \`Bb\`); \`CC\` đồng hợp nên chỉ cho 1 loại allele cho gene C. Số loại giao tử = 2 × 2 × 1 = **4** loại: ABC, AbC, aBC, abC.
2. Trong khung 4×4, \`AaBb\` xuất hiện ở 4 ô (xem bảng §5.2). Tỉ lệ = 4/16 = 1/4. → 800 × 1/4 = **200 con \`AaBb\`**. (Để so sánh: tổng số con vàng-trơn = 800 × 9/16 = 450; trong đó 200 là \`AaBb\`, 100 là \`AaBB\`, 100 là \`AABb\`, 50 là \`AABB\`.)
</details>

### 📝 Tóm tắt mục 5

- Quy luật 2: các cặp allele của các gene **ở NST khác nhau** phân ly độc lập với nhau khi tạo giao tử.
- Cá thể có n cặp gene dị hợp → $2^n$ loại giao tử.
- Lai \`AaBb × AaBb\` cho tỉ lệ kiểu hình F2 = **9 : 3 : 3 : 1**; có thể tính nhanh bằng tích 2 lai một tính (3/4 × 3/4 ...).
- Quy luật 2 KHÔNG áp dụng cho gene cùng NST (gene linkage — học sau).

---

## 6. Lai phân tích (Test Cross) — bí kíp xác định kiểu gen

### 💡 Trực giác / Hình dung

Bạn có 1 cây hoa tím — nhưng không biết nó \`AA\` hay \`Aa\`. Nhìn bằng mắt không phân biệt được (cả 2 đều tím). Mẹo: cho nó lai với một cây **đồng hợp lặn \`aa\`** (cây hoa trắng). Vì \`aa\` chỉ cho giao tử \`a\`, **kiểu hình của con sẽ "tố cáo" giao tử của bố**:
- Nếu bố là \`AA\` → con toàn \`Aa\` → **100% trội**.
- Nếu bố là \`Aa\` → con 1 \`Aa\` : 1 \`aa\` → **1 trội : 1 lặn**.

Quan sát con là đủ kết luận về bố.

### 6.1. Tại sao chọn \`aa\` làm "thuốc thử"?

Vì \`aa\` không "che giấu" giao tử của bố. Allele \`a\` mà cá thể bí ẩn cho ra sẽ thể hiện ngay ở con (vì gặp \`a\` từ mẹ → \`aa\` → lặn lộ ra). Nếu lai với \`Aa\` hay \`AA\`, allele lặn của bố có thể bị "che" → không phân biệt được.

### 6.2. Bốn ví dụ cụ thể

**Ví dụ 1 — Lai phân tích 1 gene**: cây tím chưa biết \`?\` × \`aa\`.
- Lai → đếm 20 con: tất cả đều tím → kết luận **bố là \`AA\`** (xác suất sai cực thấp khi cỡ 20).
- Lai → đếm 20 con: 11 tím + 9 trắng → tỉ lệ ~1:1 → kết luận **bố là \`Aa\`**.
- Lai → đếm 20 con: 18 tím + 2 trắng → không rõ lắm — cỡ mẫu quá nhỏ, cần thêm con để chắc. Đây là cảnh báo về cỡ mẫu (xem §3 ví dụ 4).

**Ví dụ 2 — Lai phân tích 2 gene**: \`??BB\` chưa biết × \`aabb\`.
- Nếu bố là \`AABB\`: con toàn \`AaBb\` → 100% trội-trội.
- Nếu bố là \`AaBb\`: con 1 AaBb : 1 Aabb : 1 aaBb : 1 aabb = **1:1:1:1** kiểu hình.
- Nếu bố là \`AABb\`: con 1 AaBb : 1 Aabb = **1 trội-trội : 1 trội-lặn** (gene A luôn dị hợp ở con → luôn trội).
- Tỉ lệ con tách bố ra rõ ràng.

**Ví dụ 3 — Lai phân tích áp dụng trong nông nghiệp**: người làm giống muốn chắc chắn một cây "trội kiểu hình mong muốn" là **thuần chủng** (\`AA\`) trước khi nhân giống. Lai phân tích với \`aa\`: nếu thấy 1 con lặn xuất hiện → cây bí ẩn **không** thuần chủng (\`Aa\`), loại ngay. Đây là kiểm tra "phải đậu hay không" trong sản xuất giống.

**Ví dụ 4 — Tỉ lệ kỳ vọng khi cỡ mẫu lớn**: bố \`Aa\`, mẹ \`aa\`, 400 con.
- Kỳ vọng: 200 trội + 200 lặn (1:1).
- Sai lệch xác suất thấp khi 400 — đủ để phát hiện \`Aa\`.
- Ngược lại, nếu chỉ có 4 con đẻ ra cả 4 đều trội: P(điều này nếu bố là \`Aa\`) = (1/2)⁴ = 1/16 ≈ 6%, hiếm nhưng có thể xảy ra → KHÔNG đủ để kết luận bố là \`AA\`.

### ⚠ Lỗi thường gặp

- **Quên kiểm tra cỡ mẫu**: lai phân tích chỉ đáng tin khi đẻ đủ nhiều con. 4 con đều trội không bằng chứng đủ; 40 con đều trội mới bằng chứng mạnh.
- **Lai với \`Aa\` thay vì \`aa\`**: lai với \`Aa\` cũng có 1/2 giao tử \`a\` nhưng kết quả khó đọc hơn — vì \`Aa\` × \`Aa\` cho 3:1 dù gì, không phân biệt được bố là \`AA\` hay \`Aa\`.
- **Nhầm lai phân tích với "F2 tự thụ"**: 2 phép lai khác nhau. F2 = \`Aa × Aa\` → 3:1 kiểu hình; lai phân tích = \`?\` × \`aa\` → tỉ lệ phụ thuộc kiểu gen ẩn.

### 🔁 Dừng lại tự kiểm tra

Một cây đậu hoa tím lai phân tích cho 56 con: 28 tím + 28 trắng. Kiểu gen của cây tím ban đầu? Nếu kết quả là 56 tím + 0 trắng (cỡ 56 đủ tin) thì sao?

<details>
<summary>Đáp án</summary>

- 28:28 ≈ 1:1 → bố là **\`Aa\`** (dị hợp).
- 56:0 → bố là **\`AA\`** (đồng hợp trội). Cỡ 56 đủ để xác nhận: nếu bố là \`Aa\`, xác suất 56 con đều trội = (1/2)⁵⁶ ≈ 10⁻¹⁷ — gần như không thể.
</details>

### 📝 Tóm tắt mục 6

- Lai phân tích = lai với cá thể đồng hợp lặn \`aa\` để xác định kiểu gen của cá thể trội bí ẩn.
- Kết quả con toàn trội → bố là \`AA\`; tỉ lệ 1:1 → bố là \`Aa\`.
- Cỡ mẫu phải đủ lớn để kết luận đáng tin (xác suất "may mắn" giảm theo lũy thừa cỡ mẫu).

---

## 7. Bài tập + Lời giải chi tiết

### Bài tập

**Bài 1**: Ở đậu Hà Lan, hạt vàng (\`Y\`) trội hoàn toàn so với hạt lục (\`y\`). Cây thuần chủng vàng lai với cây thuần chủng lục, F1 lai với nhau cho F2. Hỏi: (a) kiểu gen của P; (b) kiểu gen và kiểu hình F1; (c) tỉ lệ kiểu gen và kiểu hình F2.

**Bài 2**: Lai \`Aa × Aa\` thu được 480 con. Tính số con dự kiến cho mỗi kiểu gen và mỗi kiểu hình.

**Bài 3**: Một cây hoa tím lai phân tích thu được 84 cây con: 42 tím + 42 trắng. Hỏi kiểu gen cây tím ban đầu. Giải thích.

**Bài 4**: Lai \`AaBb × AaBb\` (2 gene phân ly độc lập, đều trội hoàn toàn) thu được 1600 con. Tính số con cho mỗi trong 4 kiểu hình.

**Bài 5**: Một cá thể có kiểu gen \`AaBbCcDd\` (4 cặp gene đều dị hợp, 4 gene trên 4 NST khác nhau). Tính: (a) số loại giao tử khác nhau cá thể này có thể tạo; (b) xác suất một giao tử có kiểu gen \`aBcD\`; (c) khi tự thụ phấn, xác suất con có kiểu hình lặn cả 4 tính trạng (\`aabbccdd\`) là bao nhiêu?

**Bài 6**: Mendel báo cáo thí nghiệm hạt trơn/nhăn ở F2: 7324 trơn + 1850 nhăn. (a) Tính tỉ lệ thực và so sánh với 3:1. (b) Nếu tỉ lệ 3:1 đúng tuyệt đối, số hạt trơn và nhăn kỳ vọng từ 9174 hạt là bao nhiêu? (c) Vì sao kết quả thực không khớp tuyệt đối — không phải Mendel sai?

### Lời giải

**Bài 1**:
- (a) P thuần chủng: cây vàng = \`YY\`, cây lục = \`yy\`.
- (b) Lai \`YY × yy\`: cả 2 P chỉ cho 1 loại giao tử (Y và y). F1: 100% \`Yy\` → 100% kiểu hình **vàng** (vì Y trội hoàn toàn).
- (c) F1 × F1 = \`Yy × Yy\`. Khung Punnett 2×2: 1 YY : 2 Yy : 1 yy.
  - **Kiểu gen F2**: 1 YY : 2 Yy : 1 yy (tỉ lệ 1:2:1).
  - **Kiểu hình F2**: 3 vàng (YY + Yy) : 1 lục (yy) = **3:1**.

**Bài 2**:
- Tỉ lệ kiểu gen 1:2:1 → mỗi phần 480/4 = 120.
- \`AA\`: 120; \`Aa\`: 240; \`aa\`: 120. Kiểm tra: 120 + 240 + 120 = 480 ✓.
- Kiểu hình: trội = AA + Aa = 360; lặn = aa = 120. Tỉ lệ 3:1 ✓.

**Bài 3**:
- 42:42 = 1:1 (tỉ lệ trội:lặn).
- Lai phân tích cho 1:1 → cá thể bí ẩn phải là **\`Aa\` (dị hợp)**.
- Lý do: nếu là \`AA\`, con phải toàn \`Aa\` (100% tím). Có 42 con trắng (\`aa\`) → cây tím phải có truyền được \`a\` cho con → kiểu gen có \`a\` → cây tím là \`Aa\`.

**Bài 4**:
- Tỉ lệ kiểu hình 9:3:3:1, tổng 16 phần.
- Mỗi phần = 1600/16 = 100.
- Trội-trội (A_B_): 9 × 100 = **900** con.
- Trội-lặn (A_bb): 3 × 100 = **300** con.
- Lặn-trội (aaB_): 3 × 100 = **300** con.
- Lặn-lặn (aabb): 1 × 100 = **100** con.
- Kiểm tra: 900 + 300 + 300 + 100 = 1600 ✓.

**Bài 5**:
- (a) 4 cặp dị hợp, mỗi cặp cho 2 loại allele độc lập → $2^4 =$ **16** loại giao tử.
- (b) Mỗi giao tử cụ thể có xác suất 1/16 (vì tất cả 16 loại đồng xác suất). → P(\`aBcD\`) = **1/16**. Cách khác (nhân): $P(a) \\times P(B) \\times P(c) \\times P(D) = (1/2)^4 = 1/16$ ✓.
- (c) $P(\\text{con } aabbccdd) = P(aa) \\times P(bb) \\times P(cc) \\times P(dd)$ (vì độc lập) $= (1/4)^4 =$ **1/256**. 4 gene độc lập, mỗi gene cho P(đồng hợp lặn) = 1/4 ở thế hệ con của \`Aa × Aa\`.

**Bài 6**:
- (a) Tỉ lệ thực = 7324 : 1850. Chia 1850: 7324/1850 ≈ **3.96**. Vậy trơn:nhăn ≈ 3.96:1, hoặc xét theo phần: trội/(trội+lặn) = 7324/9174 = 0.7984 ≈ 79.84%. So với 75% kỳ vọng: lệch ~5%, hơi cao hơn 3:1 (~ 2.96:1 mới đúng). Vẫn rất gần.
- (b) Kỳ vọng 3:1: trơn = 9174 × 3/4 = **6880.5**; nhăn = 9174 × 1/4 = **2293.5**.
- (c) Vì di truyền là **biến cố ngẫu nhiên**: mỗi hạt độc lập có xác suất 3/4 trơn, 1/4 nhăn. Với 9174 hạt, dao động thống kê quanh giá trị kỳ vọng vẫn cho lệch vài trăm. Sai lệch ~444 hạt (so với kỳ vọng) hoàn toàn nằm trong phạm vi sai số thống kê bình thường (độ lệch chuẩn ~ √(np(1−p)) = √(9174 × 0.75 × 0.25) ≈ 41 hạt; lệch 444 ≈ 10.7σ thực ra hơi lớn — nhưng tổng thể tỉ lệ vẫn rất sát 3:1, đủ thuyết phục về quy luật). Mendel không "sai" — ông phát hiện đúng quy luật, chỉ có dao động mẫu khi cỡ hữu hạn.

---

## 8. Liên kết và bài tiếp theo

- **Bài tiếp theo trong Biology Tầng 2**: [Lesson 02 — DNA & nhân đôi](../lesson-02-dna-replication/) — từ tỉ lệ Mendel sang **cơ chế vật chất di truyền** thực sự: DNA cấu trúc thế nào và sao chép ra sao trước khi tế bào chia.
- **Tiền đề bắt buộc**:
  - [\`Biology/01-Molecules-Cells/lesson-08-meiosis\`](../../01-Molecules-Cells/lesson-08-meiosis/) — cơ sở vật lý: giảm phân I tách NST tương đồng = Quy luật 1; sắp xếp ngẫu nhiên kỳ giữa I = Quy luật 2.
  - [\`Biology/01-Molecules-Cells/lesson-01-biomolecules\`](../../01-Molecules-Cells/lesson-01-biomolecules/) — gene là đoạn DNA; quy tắc Chargaff.
- **Sẽ học sâu hơn ở các bài sau Tầng 2**:
  - **Trội không hoàn toàn, đồng trội, đa allele** — biến thể của Mendel (Lesson 03/04).
  - **Gene linkage** (liên kết gene) — khi Quy luật 2 không áp dụng — Lesson 06.
  - **Di truyền quần thể (Hardy–Weinberg)** — mở rộng Mendel từ "1 phép lai" lên "cả quần thể" — Lesson 06.
- **Đọc thêm**: \`visualization.html\` của lesson này — dựng Punnett 2×2/4×4 tương tác và mô phỏng F2 ngẫu nhiên.

---

## 📝 Tổng kết Lesson 01

1. **Mendel (1865)** phát hiện quy luật di truyền bằng cách đếm tỉ lệ hạt đậu, KHÔNG biết DNA hay gene là gì. Mô hình "hạt rời rạc" thay thế "hòa trộn".
2. **Từ vựng nền**: gene = đoạn DNA; allele = phiên bản gene; kiểu gen (genotype) AA/Aa/aa; kiểu hình (phenotype) là cái thấy bên ngoài; trội hoàn toàn → Aa giống AA.
3. **Quy luật 1 — Phân ly**: cặp allele tách 2 giao tử (1/2 mỗi loại). Cơ sở vật lý là giảm phân I. Lai \`Aa × Aa\` → kiểu gen 1:2:1, kiểu hình 3:1.
4. **Khung Punnett** = bảng tổ hợp giao tử × giao tử; xác suất mỗi ô = tích xác suất hàng × cột.
5. **Quy luật 2 — Phân ly độc lập**: gene ở NST khác nhau phân ly độc lập. n cặp dị hợp → $2^n$ giao tử. Lai 2 tính \`AaBb × AaBb\` → kiểu hình **9:3:3:1**.
6. **Lai phân tích** (\`?\` × \`aa\`): toàn trội → bố \`AA\`; 1:1 → bố \`Aa\`. Dùng xác định kiểu gen ẩn.
7. **Tỉ lệ Mendel là kỳ vọng thống kê** — cỡ mẫu càng lớn càng sát; cỡ nhỏ có thể lệch xa.

**Tiếp theo**: [Lesson 02 — DNA & nhân đôi](../lesson-02-dna-replication/)
`;
