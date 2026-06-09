# Lesson 07 — Chọn lọc tự nhiên

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Hiểu **bản chất chọn lọc tự nhiên (natural selection)** mà Darwin và Wallace đề xuất: vì sao chỉ cần 3 điều kiện tối thiểu là tiến hóa xảy ra "tự động".
- Định lượng được **độ thích nghi (fitness, w)** và **hệ số chọn lọc (selection coefficient, s)** từ số liệu sinh sản; tính được s khi w cho trước và ngược lại.
- Phân biệt **4 nhân tố tiến hóa (evolutionary forces)**: đột biến, dòng gen (gene flow), phiêu bạt di truyền (genetic drift), chọn lọc tự nhiên — biết mỗi nhân tố thay đổi tần số allele theo cơ chế nào và mạnh ở quần thể nào.
- Phân biệt **3 kiểu chọn lọc** theo tác động lên phân bố kiểu hình: định hướng (directional), ổn định (stabilizing), phân hóa (disruptive) — kèm ví dụ thực tế.
- Vận dụng công thức $q_{n+1} \approx q_n - s \cdot p_n \cdot q_n^2$ để tính tần số allele lặn có hại sau 1 thế hệ chọn lọc.
- Đọc và phân loại được **5 nhóm bằng chứng tiến hóa**: hóa thạch, giải phẫu so sánh, phôi học so sánh, sinh học phân tử, phân bố địa lý.

## Kiến thức tiền đề

- **[Lesson 06 — Di truyền quần thể](../lesson-06-population-genetics/)** — tần số allele, định luật Hardy-Weinberg $p^2 + 2pq + q^2 = 1$. Bài này giả sử bạn đã quen với việc tính p, q từ số kiểu gen.
- **[Lesson 05 — Đột biến & công nghệ sinh học](../lesson-05-mutation-biotech/)** — đột biến là **nguồn duy nhất** tạo biến dị mới ở mức phân tử; nếu không có đột biến thì không có gì để chọn lọc.
- **[Lesson 01 — Di truyền Mendel](../lesson-01-mendelian-genetics/)** — khái niệm allele, kiểu gen (genotype) đồng/dị hợp, kiểu hình (phenotype) trội/lặn.

---

## 1. Bối cảnh lịch sử và cú đột phá của Darwin–Wallace

### 💡 Trực giác / Hình dung

Hãy hình dung bạn có **một vườn rau** với 1000 cây con. Mỗi cây hơi khác nhau một chút (cao, thấp, lá to, lá nhỏ — đây là **biến dị (variation)**). Một đợt sâu bệnh tấn công và ăn sạch những cây nào có lá mỏng; chỉ những cây lá dày sống sót và ra hạt. Vụ sau bạn gieo hạt → con cháu **tự động** có lá dày hơn — bạn không hề "lai tạo" gì cả, chỉ có sâu bệnh đã làm việc đó. Đó chính là cốt lõi của chọn lọc tự nhiên: **môi trường lọc, biến dị di truyền + sinh sản chênh lệch + tính di truyền → tần số allele thay đổi qua thế hệ**.

### 1.1. Trước Darwin: cái gì sai?

Trước 1859, quan điểm phổ biến là sinh vật bất biến (do thần thánh tạo ra), hoặc tiến hóa theo kiểu Lamarck — "dùng thì phát triển, không dùng thì thoái hóa, và đặc tính thu được di truyền sang con". Vd Lamarck giải thích cổ hươu cao cổ dài là do "đời này nỗ lực vươn cổ, đời sau thừa hưởng cổ dài hơn". Sai chỗ nào? Việc bạn tập gym đến đâu thì **DNA tinh trùng/trứng không đổi** — đặc tính cá nhân thu được trong đời không truyền sang con qua gen.

### 1.2. Cú đột phá 1858–1859: Darwin và Wallace

Charles Darwin (sau chuyến đi tàu HMS Beagle) và Alfred Russel Wallace (làm việc ở quần đảo Mã Lai) **độc lập** đề xuất cùng một cơ chế. Năm 1858 cả hai cùng trình bày ở Linnean Society; 1859 Darwin xuất bản *On the Origin of Species*. Cơ chế gồm 3 điều kiện:

1. **Có biến dị di truyền (heritable variation)** giữa các cá thể trong quần thể.
2. **Sinh sản chênh lệch (differential reproduction)**: cá thể nào "khớp" môi trường hơn để lại nhiều con sống sót và sinh sản hơn.
3. Vì biến dị có tính di truyền, **đặc điểm thuận lợi tăng tần số qua thế hệ** → quần thể "trôi" về phía thích nghi hơn với môi trường.

Lưu ý: thời Darwin chưa biết tới DNA, gen, đột biến. Nguồn của biến dị mãi tới thế kỷ 20 mới rõ là **đột biến + tái tổ hợp** (`Lesson 05`).

### ❓ Câu hỏi tự nhiên của người đọc

**Q: Vậy chọn lọc tự nhiên có "chủ đích" không, kiểu môi trường "muốn" loài thích nghi hơn?**
A: KHÔNG. Đây là lỗi diễn đạt phổ biến. Chọn lọc tự nhiên là **kết quả thống kê thụ động** của việc cá thể sống sót/chết và sinh con nhiều/ít. Không có "ý chí" gì cả. Câu nói "loài tiến hóa cổ dài *để* ăn lá cao" sai bản chất — đúng phải là "đột biến ngẫu nhiên tạo ra cá thể cổ dài hơn, *kết quả là* nó ăn được lá cao, sống sót và sinh con nhiều hơn".

**Q: Tiến hóa và chọn lọc tự nhiên có giống nhau không?**
A: Không hoàn toàn. **Tiến hóa (evolution)** = bất kỳ thay đổi nào về tần số allele qua thế hệ. **Chọn lọc tự nhiên (natural selection)** = MỘT trong 4 nhân tố gây ra tiến hóa (xem §3). Phiêu bạt di truyền (drift) cũng làm tiến hóa nhưng không phải do chọn lọc.

### 📝 Tóm tắt mục 1

- Chọn lọc tự nhiên = (a) biến dị di truyền + (b) sinh sản chênh lệch + (c) di truyền được → tần số allele đổi qua thế hệ.
- Darwin & Wallace (1858–1859) đề xuất cơ chế, không cần biết DNA.
- Lamarck (đặc tính thu được di truyền) sai vì DNA giao tử không thay đổi bởi rèn luyện cá nhân.

---

## 2. Độ thích nghi (fitness) và hệ số chọn lọc

### 💡 Trực giác / Hình dung

**Fitness** không phải "khỏe mạnh" theo nghĩa thể hình, mà là **số con sống tới tuổi sinh sản mà bạn để lại**. Một con voi sống 60 năm nhưng đẻ 0 con có fitness = 0. Một con chuột sống 2 năm nhưng đẻ 30 con sống tốt có fitness cao. Cứ hình dung như "điểm số trò chơi" — chỉ tính theo *số bản sao gen bạn truyền vào thế hệ sau*, không tính sức khỏe cá nhân.

### 2.1. Định nghĩa chính thức

**Độ thích nghi tuyệt đối (absolute fitness, W)** = số con trung bình mà 1 cá thể có kiểu gen đó để lại tới tuổi sinh sản.

**Độ thích nghi tương đối (relative fitness, w)** = W chia cho W lớn nhất trong quần thể. Kiểu gen "tốt nhất" có $w = 1$ (chuẩn); các kiểu gen khác có $w \in [0, 1]$.

**Hệ số chọn lọc (selection coefficient, s)** $= 1 - w$. Nó đo "mức độ thiệt thòi" so với kiểu gen tốt nhất:
- $s = 0$ → không bị chọn lọc bất lợi.
- $s = 1$ → kiểu gen gây chết hoàn toàn (lethal), không để lại con.
- $s = 0{,}1$ → giảm 10% sinh sản so với kiểu gen tốt nhất.

### 2.2. Bốn ví dụ số cụ thể

**Ví dụ 1 — Tính w và s từ số con**:
Trong quần thể có 3 kiểu gen, đếm số con trung bình:
- AA: W = 50 con.
- Aa: W = 50 con.
- aa: W = 40 con.

W lớn nhất = 50 → w(AA) = 50/50 = **1**, w(Aa) = **1**, w(aa) = 40/50 = **0.8**.
Hệ số chọn lọc: s(AA) = s(Aa) = **0**; s(aa) = 1 − 0.8 = **0.2** (kiểu gen aa giảm 20% sinh sản).

**Ví dụ 2 — Bệnh lặn hoàn toàn**:
Bệnh di truyền lặn gây chết trước tuổi sinh sản (vd tay-Sachs). Vậy w(aa) = 0 → s(aa) = **1**. Còn AA và Aa khỏe mạnh, w = 1, s = 0.

**Ví dụ 3 — Lợi thế dị hợp (heterozygote advantage)**:
Trong vùng có sốt rét, allele hồng cầu hình liềm (HbS) cho fitness như sau:
- HbA/HbA (bình thường): chết vì sốt rét → w = 0.9.
- HbA/HbS (dị hợp): kháng sốt rét, không bị thiếu máu → w = **1.0** (cao nhất).
- HbS/HbS (đồng hợp lặn): chết do thiếu máu liềm → w = 0.2.

s(HbA/HbA) = 0.1; s(HbA/HbS) = 0; s(HbS/HbS) = **0.8**. Đây là lý do allele HbS được giữ ở tần số ~10% ở Tây Phi mặc dù gây chết khi đồng hợp — chọn lọc cân bằng (balancing selection).

**Ví dụ 4 — Sản lượng so với cá thể chuẩn**:
Giống lúa kháng sâu trung bình đẻ 200 hạt/cây; giống thường đẻ 150 hạt/cây. w(thường) = 150/200 = **0.75**, s(thường) = **0.25**. Nếu nuôi chung trong ruộng có sâu → tần số gen kháng tăng dần qua các vụ.

### ⚠ Lỗi thường gặp

- **Nhầm fitness với "sức khỏe"**: con cọp khỏe sống 20 năm không sinh sản có fitness = 0; con thỏ yếu nhưng đẻ 40 con có fitness cao. Tiêu chí duy nhất là **số bản sao gen truyền sang đời sau**.
- **Quên fitness là TƯƠNG ĐỐI**: $w = W / W_{\max}$, không phải con số tuyệt đối. Cùng 50 con có thể là w=1 (nếu là max) hoặc w=0.5 (nếu max là 100).
- **Tưởng s âm**: theo định nghĩa $s = 1 - w \in [0, 1]$. Nếu kiểu gen được ưu ái, ta chọn nó làm chuẩn (w=1, s=0), không viết "s âm".

### 🔁 Dừng lại tự kiểm tra

1. Một quần thể có 3 kiểu gen với số con trung bình: BB = 80, Bb = 100, bb = 60. Tính w và s cho mỗi kiểu gen.
2. Nếu một allele lặn gây chết khi đồng hợp ở tuổi 5 (trước sinh sản), w(aa) = ? s(aa) = ?

<details>
<summary>Đáp án</summary>

1. W\_max = 100 (Bb). w(BB) = 80/100 = **0.8**, s(BB) = **0.2**. w(Bb) = **1**, s(Bb) = **0**. w(bb) = 60/100 = **0.6**, s(bb) = **0.4**. Lưu ý: Bb có fitness cao nhất → lợi thế dị hợp.
2. Chết trước tuổi sinh sản → để lại 0 con → w(aa) = **0**, s(aa) = **1**.
</details>

### 📝 Tóm tắt mục 2

- Fitness (w) = số con tương đối; s = 1 − w là "mức thiệt thòi".
- w ∈ [0, 1]: w=1 là kiểu gen được ưu ái nhất; w=0 là kiểu gen không để lại con (s=1, lethal).
- Lợi thế dị hợp (heterozygote advantage) — Aa có w cao hơn cả AA và aa — giữ allele "có hại khi đồng hợp" ở tần số nhỏ trong quần thể.

---

## 3. Bốn nhân tố tiến hóa: cái gì làm tần số allele đổi?

### 💡 Trực giác / Hình dung

Hãy hình dung quần thể là **một hũ bi** với 2 màu (allele A đỏ, allele a xanh). Có 4 cách hũ bi thay đổi tỉ lệ màu:

1. **Đột biến**: thỉnh thoảng một viên bi đỏ tự đổi thành xanh (rất hiếm) — tạo allele mới.
2. **Dòng gen**: ai đó thêm/lấy bi sang hũ khác — hòa lẫn tần số giữa các quần thể.
3. **Phiêu bạt di truyền**: bạn chọn ngẫu nhiên 10 viên từ hũ 1000 viên — tỉ lệ trong 10 viên đó có thể lệch nhiều so với 1000 viên gốc, đặc biệt khi N nhỏ.
4. **Chọn lọc tự nhiên**: bi đỏ được "ưu ái" (sống sót hoặc sinh con nhiều hơn) → tỉ lệ đỏ tăng dần.

### 3.1. Bảng so sánh 4 nhân tố

| Nhân tố | Cơ chế | Tốc độ | Định hướng? | Mạnh khi |
|---------|--------|--------|-------------|----------|
| **Đột biến (mutation)** | Lỗi sao chép DNA tạo allele mới | rất chậm (~10⁻⁸/locus/thế hệ) | Ngẫu nhiên | Mọi quần thể (nhưng đóng góp nhỏ trực tiếp) |
| **Dòng gen (gene flow)** | Cá thể di-nhập (migration) đem allele giữa các quần thể | trung bình | Hòa lẫn → giảm khác biệt giữa quần thể | Cá thể di chuyển nhiều |
| **Phiêu bạt di truyền (genetic drift)** | Biến động lấy mẫu ngẫu nhiên | nhanh ở N nhỏ | Ngẫu nhiên (có thể "trôi mất" allele tốt) | Quần thể nhỏ, cổ chai, founder |
| **Chọn lọc tự nhiên (natural selection)** | Sinh sản chênh lệch theo kiểu hình | tỉ lệ với s | Có định hướng → tăng allele có lợi | Có biến dị di truyền + áp lực môi trường |

### 3.2. Đột biến — nguồn duy nhất tạo biến dị mới

Tốc độ đột biến điểm (point mutation) ở người ~**10⁻⁸ lần/cặp base/thế hệ**. Vậy đột biến *một mình* thay đổi tần số allele rất chậm: nếu allele A → a với tốc độ μ = 10⁻⁵/thế hệ, tần số a tăng từ 0 → 0.5 cần khoảng **50,000 thế hệ**. Tuy chậm, nó là **nguồn nguyên liệu duy nhất** cho 3 nhân tố kia hoạt động — không có đột biến, không có biến dị mới để chọn lọc.

### 3.3. Dòng gen — hòa lẫn tần số

Khi cá thể di chuyển giữa hai quần thể, allele đi theo. Hai quần thể tách biệt lâu sẽ có tần số allele khác nhau; dòng gen làm tần số xích lại gần nhau → giảm khác biệt giữa quần thể, tăng khác biệt nội bộ. Vd: chim di cư mang gen từ quần thể Bắc Mỹ sang Nam Mỹ → 2 quần thể không phân hóa thành 2 loài riêng.

### 3.4. Phiêu bạt di truyền — biến động ngẫu nhiên

Đây là nhân tố thường bị bỏ qua nhưng cực mạnh ở **quần thể nhỏ**. Cơ chế: do số cá thể ít, "ai sinh sản" có yếu tố may rủi — không phải allele tốt hơn lúc nào cũng truyền lại. Hai trường hợp nổi tiếng:

**Hiệu ứng cổ chai (bottleneck effect)**: thiên tai/bệnh dịch giết phần lớn quần thể; nhóm sống sót có tần số allele lệch so với gốc, đôi khi mất hẳn allele hiếm. Vd: báo Cheetah hiện đại có đa dạng gen rất thấp do bottleneck cách đây ~10,000 năm.

**Hiệu ứng người sáng lập (founder effect)**: một nhóm nhỏ tách ra lập quần thể mới (vd dân di cư đến đảo); nhóm này không đại diện cho quần thể gốc. Vd: người Amish ở Pennsylvania có tần số một số bệnh lặn (như Ellis-van Creveld) cao bất thường vì cộng đồng sáng lập từ ~200 người.

### 3.5. Bốn ví dụ số (drift mạnh khi N nhỏ)

Xác suất một allele tần số q biến mất do drift sau 1 thế hệ ngẫu nhiên (xấp xỉ binomial sampling):

**Ví dụ 1 — N = 1000, q = 0.5**: số bản allele a = 1000 × 0.5 = 500 (trong tổng 2000 alleles ở quần thể lưỡng bội). Độ lệch chuẩn của tần số $\approx \sqrt{\dfrac{p \cdot q}{2N}} = \sqrt{\dfrac{0{,}5 \cdot 0{,}5}{2000}} \approx$ **0,011**. Tần số dao động trong khoảng [0.489, 0.511] — rất ổn định.

**Ví dụ 2 — N = 100, q = 0.5**: độ lệch chuẩn $\approx \sqrt{0{,}25/200} \approx$ **0,035**. Dao động ±3.5% mỗi thế hệ.

**Ví dụ 3 — N = 10, q = 0.5**: độ lệch chuẩn $\approx \sqrt{0{,}25/20} \approx$ **0,11**. Dao động ±11%/thế hệ → allele có thể "trôi" từ 0.5 xuống 0 trong vài chục thế hệ.

**Ví dụ 4 — N = 4, q = 0.5** (bottleneck cực mạnh): độ lệch chuẩn $\approx \sqrt{0{,}25/8} \approx$ **0,18**. Allele a có khả năng cao biến mất hoàn toàn trong 1-2 thế hệ.

**Kết luận**: drift tỉ lệ nghịch với $\sqrt{N}$ → quần thể nhỏ thì drift áp đảo cả chọn lọc.

### ❓ Câu hỏi tự nhiên của người đọc

**Q: Nếu drift là ngẫu nhiên, sao gọi là "nhân tố tiến hóa"?**
A: Vì nó **làm tần số allele đổi qua thế hệ** — đúng định nghĩa tiến hóa. Khác biệt với chọn lọc là drift KHÔNG có hướng (không ưu ái allele tốt hơn); nó "đẩy" allele đi lung tung và đôi khi làm mất allele tốt, giữ allele xấu.

**Q: Trong tự nhiên 4 nhân tố này có hoạt động riêng lẻ không?**
A: Không — chúng đồng thời tác động lên mọi quần thể. Câu hỏi quan trọng là *nhân tố nào áp đảo*. Quần thể lớn + áp lực môi trường rõ → chọn lọc thắng. Quần thể nhỏ, không cách ly → drift thắng. Hai quần thể gần nhau và di chuyển nhiều → dòng gen làm chúng giống nhau.

### 📝 Tóm tắt mục 3

- 4 nhân tố tiến hóa: đột biến (nguồn biến dị), dòng gen (hòa lẫn), phiêu bạt (ngẫu nhiên, mạnh ở N nhỏ), chọn lọc (định hướng).
- Đột biến chậm nhưng là nguồn duy nhất tạo allele mới.
- Drift làm "trôi" allele ngẫu nhiên; bottleneck và founder làm giảm đa dạng đột ngột.
- Chọn lọc là nhân tố DUY NHẤT có định hướng — tăng allele có lợi.

---

## 4. Ba kiểu chọn lọc theo tác động lên phân bố kiểu hình

### 💡 Trực giác / Hình dung

Hãy hình dung quần thể có một tính trạng liên tục (vd chiều cao, cân nặng) phân bố hình chuông (normal distribution). Có **3 cách** chọn lọc "cắn" vào phân bố này:

1. **Định hướng (directional)**: cắn 1 đầu → đường cong dịch sang đầu kia.
2. **Ổn định (stabilizing)**: cắn cả 2 đầu → đường cong "thắt eo", trung bình không đổi nhưng hẹp hơn.
3. **Phân hóa / phá vỡ (disruptive)**: cắn ở giữa → đường cong chia 2 đỉnh.

### 4.1. Định hướng (directional selection)

Một đầu của phân bố được ưu ái → trung bình quần thể **dịch theo hướng đó** qua các thế hệ.

**Ví dụ kinh điển**: bướm bạch dương (*Biston betularia*) ở Anh thế kỷ 19. Cách mạng công nghiệp làm vỏ cây phủ bồ hóng đen → bướm cánh đen ngụy trang tốt hơn, bướm cánh trắng bị chim ăn nhiều. Trong vài thập kỷ, tần số bướm đen tăng từ <2% lên >90%. Đây là chọn lọc định hướng — cả phân bố dịch về phía "tối màu hơn".

**Ví dụ số**: trung bình chiều cao ngô tăng từ 2.0m → 2.5m sau 20 thế hệ chọn lọc giống cao → hướng dịch trái-phải rõ ràng.

### 4.2. Ổn định (stabilizing selection)

Cả hai đầu phân bố bị bất lợi → trung bình giữ nguyên nhưng độ lệch (variance) giảm. Đây là kiểu phổ biến nhất trong tự nhiên vì hầu hết tính trạng quan trọng có "vùng tối ưu".

**Ví dụ kinh điển**: **cân nặng trẻ sơ sinh người**. Nghiên cứu kinh điển trên ~13,000 ca sinh: tỉ lệ tử vong sơ sinh là **U-shape** — cao ở trẻ < 2.5 kg (thiếu, kém sống sót) và > 4.5 kg (đẻ khó), thấp nhất ở **~3.5 kg**. Kết quả: trung bình cân nặng sơ sinh ổn định quanh 3.5 kg qua mọi thế hệ — chọn lọc ổn định.

**Ví dụ số**: nếu cân nặng sơ sinh phân bố ban đầu trung bình 3.5kg, độ lệch chuẩn σ = 0.8kg, sau 1 thế hệ chọn lọc ổn định σ có thể giảm còn 0.7kg; trung bình giữ nguyên 3.5kg.

### 4.3. Phân hóa / phá vỡ (disruptive selection)

Vùng giữa phân bố bị bất lợi; hai đầu được ưu ái → phân bố tách thành 2 đỉnh. Đây là tiền đề quan trọng cho **hình thành loài (speciation)** — sẽ học ở Lesson 08.

**Ví dụ**: chim sẻ Darwin trên đảo Galápagos có 2 loại hạt: hạt nhỏ (mỏ nhỏ cắn dễ) và hạt to (mỏ to cắn dễ); hạt vừa thiếu. Chim có mỏ nhỏ hoặc mỏ to thắng; chim mỏ trung bình thua → quần thể phân hóa thành 2 nhóm mỏ.

**Ví dụ số**: trong một quần thể giả định 1000 cá thể mỏ phân bố trung bình ~10mm. Sau 5 thế hệ chọn lọc phân hóa, có thể đo được 2 mode: ~7mm và ~13mm, gần như không còn cá thể quanh ~10mm.

### 4.4. Bảng tổng hợp 3 kiểu chọn lọc

| Kiểu | Vùng được ưu ái | Trung bình | Phương sai (variance) | Kết quả lâu dài |
|------|------------------|------------|------------------------|------------------|
| Định hướng | 1 đầu | dịch theo hướng đó | có thể giảm | thích nghi theo môi trường mới |
| Ổn định | giữa | giữ nguyên | **giảm** | duy trì kiểu hình tối ưu |
| Phân hóa | 2 đầu | giữ nguyên (về trung bình) | **tăng**, có 2 đỉnh | tiền đề hình thành loài |

### ⚠ Lỗi thường gặp

- **Nhầm "ổn định" với "không tiến hóa"**: chọn lọc ổn định VẪN là tiến hóa — phương sai đổi, tần số allele đổi (giảm allele cực đoan). Chỉ có *trung bình* không dịch.
- **Tưởng định hướng là duy nhất quan trọng**: thực tế ổn định mới phổ biến nhất. Chỉ khi môi trường thay đổi mạnh (bồ hóng, kháng sinh, biến đổi khí hậu) thì định hướng mới rõ.
- **Coi disruptive = hình thành loài ngay**: disruptive chỉ là *tiền đề*. Hình thành loài cần thêm cách ly sinh sản (Lesson 08).

### 🔁 Dừng lại tự kiểm tra

1. Sau khi dùng kháng sinh penicillin nhiều năm, tỉ lệ vi khuẩn kháng penicillin trong bệnh viện tăng từ 1% lên 80%. Đây là kiểu chọn lọc nào?
2. Trong một loài cá hồ, có 2 loại con mồi rõ rệt (cá nhỏ ăn rong + cá lớn ăn cá khác); cá miệng vừa khó kiếm ăn. Sau nhiều thế hệ, kích thước miệng phân thành 2 mode. Đây là kiểu nào?

<details>
<summary>Đáp án</summary>

1. **Định hướng** — kiểu hình "kháng" được ưu ái, kiểu hình "không kháng" bị loại; trung bình phân bố dịch về phía "kháng nhiều".
2. **Phân hóa (disruptive)** — vùng giữa (miệng vừa) bất lợi; 2 đầu (nhỏ và to) được ưu ái; phân bố tách thành 2 đỉnh.
</details>

### 📝 Tóm tắt mục 4

- 3 kiểu chọn lọc: định hướng (dịch trung bình), ổn định (giảm phương sai), phân hóa (tách thành 2 đỉnh).
- Ổn định phổ biến nhất; định hướng rõ khi môi trường đổi (bướm bạch dương, kháng sinh); phân hóa là tiền đề hình thành loài (chim sẻ Darwin).
- Đừng nhầm ổn định với "không tiến hóa" — vẫn có thay đổi tần số allele.

---

## 5. Tính tần số allele sau 1 thế hệ chọn lọc

### 💡 Trực giác / Hình dung

Nếu kiểu gen aa có hệ số chọn lọc s (tức bị giảm s × 100% sinh sản), thì sau mỗi thế hệ phần allele a do aa đóng góp giảm đi. Câu hỏi: cụ thể giảm bao nhiêu?

### 5.1. Công thức (chọn lọc chống lại đồng hợp lặn)

Giả sử ở thế hệ n, tần số allele A là $p_n$ và a là $q_n$ ($p + q = 1$). Áp lực chọn lọc chỉ chống lại aa (kiểu lặn có hại, dị hợp Aa khỏe), với hệ số s:

$$q_{n+1} = \dfrac{q_n - s \cdot q_n^2}{1 - s \cdot q_n^2}$$

Khi s nhỏ và q nhỏ, mẫu số $\approx 1$ → **xấp xỉ**:

$$q_{n+1} \approx q_n - s \cdot p_n \cdot q_n^2$$

Ý nghĩa: lượng giảm tần số allele lặn mỗi thế hệ tỉ lệ với s, với p (tần số allele "trội tốt") và với $q^2$ (tần số kiểu gen aa bị chọn lọc, từ Hardy-Weinberg).

### 5.2. Bốn ví dụ số

**Ví dụ 1 — $q_0 = 0{,}4$, $s = 0{,}1$**: $q^2 = 0{,}16$, $p = 0{,}6$.
Công thức chính xác: $q_1 = \dfrac{0{,}4 - 0{,}1 \cdot 0{,}16}{1 - 0{,}1 \cdot 0{,}16} = \dfrac{0{,}4 - 0{,}016}{1 - 0{,}016} = \dfrac{0{,}384}{0{,}984} \approx$ **0,390**.
Xấp xỉ: $q_1 \approx 0{,}4 - 0{,}1 \cdot 0{,}6 \cdot 0{,}16 = 0{,}4 - 0{,}0096 \approx$ **0,390**. ✓ (giảm ~0,01 mỗi thế hệ).

**Ví dụ 2 — $q_0 = 0{,}1$, $s = 0{,}5$** (chọn lọc mạnh, allele đã hiếm):
$q^2 = 0{,}01$, $p = 0{,}9$. $q_1 \approx 0{,}1 - 0{,}5 \cdot 0{,}9 \cdot 0{,}01 = 0{,}1 - 0{,}0045 =$ **0,0955** (giảm rất chậm vì $q^2$ nhỏ → ít cá thể aa để loại).

**Ví dụ 3 — $q_0 = 0{,}5$, $s = 1$** (allele lặn gây chết hoàn toàn):
$q^2 = 0{,}25$, $p = 0{,}5$. Chính xác: $q_1 = \dfrac{0{,}5 - 0{,}25}{1 - 0{,}25} = \dfrac{0{,}25}{0{,}75} =$ **0,333**. Giảm rõ trong 1 thế hệ.

**Ví dụ 4 — Vì sao loại bỏ allele lặn rất chậm khi q đã thấp?**
Từ ví dụ 2, dù $s = 0{,}5$ (rất mạnh), giảm chỉ 0,0045/thế hệ. Lý do: khi q = 0.1, chỉ $q^2 = 1\%$ dân số là kiểu hình aa lộ ra để chọn lọc tác động; 99% còn lại là AA hoặc Aa khỏe → chọn lọc không "nhìn thấy" allele a ở dạng dị hợp. Đây là lý do bệnh di truyền lặn (vd PKU, xơ nang) tồn tại dai trong dân số.

### ❓ Câu hỏi tự nhiên của người đọc

**Q: Nếu chọn lọc chống aa mạnh, vì sao a không biến mất hoàn toàn?**
A: Vì khi $q \to 0$, $q^2 \to 0$ nhanh hơn → tốc độ loại bỏ về 0. Allele lặn "ẩn náu" trong dị hợp Aa, không lộ ra để bị chọn lọc. Mặt khác, đột biến mới (A → a với μ ~ 10⁻⁵) bù lại → cân bằng ở $q \approx \sqrt{\mu/s}$ — gọi là cân bằng đột biến-chọn lọc. Vd μ = 10⁻⁵, s = 0.5: $q_\text{cân bằng} = \sqrt{2 \cdot 10^{-5}} \approx$ **0,0045** = ~1 trên 220 alleles.

**Q: Công thức trên giả định gì?**
A: Quần thể lớn (bỏ qua drift), không di-nhập (bỏ qua gene flow), bỏ qua đột biến trở lại, chỉ chọn lọc chống aa với hệ số s, các điều kiện Hardy-Weinberg khác giữ nguyên.

### 🔁 Dừng lại tự kiểm tra

1. $q_0 = 0{,}3$, $s = 0{,}2$. Tính $q_1$ bằng công thức xấp xỉ.
2. Theo công thức cân bằng đột biến-chọn lọc $q_\text{cân bằng} = \sqrt{\mu/s}$, nếu μ = 10⁻⁶ và s = 0.01 thì q ổn định ở mức bao nhiêu?

<details>
<summary>Đáp án</summary>

1. $q^2 = 0{,}09$, $p = 0{,}7$. $q_1 \approx 0{,}3 - 0{,}2 \cdot 0{,}7 \cdot 0{,}09 = 0{,}3 - 0{,}0126 =$ **0,2874**.
2. $q_\text{cân bằng} = \sqrt{10^{-6}/0{,}01} = \sqrt{10^{-4}} =$ **0,01** (1%).
</details>

### 📝 Tóm tắt mục 5

- Công thức: $q_{n+1} \approx q_n - s \cdot p_n \cdot q_n^2$ (chọn lọc chống aa, s nhỏ).
- Allele lặn có hại loại bỏ rất chậm khi q nhỏ vì $q^2$ nhỏ → ít cá thể aa lộ ra.
- Cân bằng đột biến-chọn lọc: $q_\text{cân bằng} \approx \sqrt{\mu/s}$ — giải thích vì sao bệnh di truyền lặn không biến mất hết.

---

## 6. Năm nhóm bằng chứng tiến hóa

### 💡 Trực giác / Hình dung

Tiến hóa không chỉ là lý thuyết suy luận; ta có **5 bộ dữ liệu độc lập** đều chỉ về cùng một câu chuyện (mọi sinh vật chia chung tổ tiên). Sức mạnh của bằng chứng là chúng *không phụ thuộc nhau* nhưng cùng khớp.

### 6.1. Hóa thạch (fossil record)

Lớp đá trầm tích có tuổi xác định bằng đồng vị phóng xạ. Hóa thạch ở lớp cũ hơn (sâu hơn) có hình dạng "tổ tiên" hơn; lớp mới hơn có dạng "phái sinh" hơn. Ví dụ:
- Cá vây thùy → tetrapod (4 chân) qua trung gian Tiktaalik (~375 triệu năm trước).
- Ngựa: từ Hyracotherium (~55 triệu năm, 4 ngón, kích thước chó) → Equus hiện đại (1 ngón, lớn) — chuỗi hóa thạch rõ ràng.

### 6.2. Giải phẫu so sánh (comparative anatomy)

**Cơ quan tương đồng (homologous)**: cấu trúc giống nhau, chức năng có thể khác — chỉ chung tổ tiên. Vd: xương tay người, cánh dơi, vây cá voi, chân ngựa **đều có cấu trúc 1 xương cánh + 2 xương cẳng + nhiều xương cổ tay + ngón** — chỉ tỉ lệ khác. → chung tổ tiên động vật có vú.

**Cơ quan tương tự (analogous)**: chức năng giống, nguồn gốc khác — tiến hóa hội tụ (convergent). Vd cánh chim và cánh côn trùng đều bay nhưng cấu trúc hoàn toàn khác → không cùng tổ tiên cánh.

**Cơ quan vết tích (vestigial)**: cấu trúc đã mất chức năng nhưng còn tồn tại — bằng chứng tổ tiên xa xưa. Vd: ruột thừa người (vốn tiêu hóa cellulose ở tổ tiên ăn cỏ), xương cụt người (đuôi vết tích), xương chậu cá voi (tổ tiên là động vật trên cạn 4 chân).

### 6.3. Phôi học so sánh (comparative embryology)

Phôi của các loài có xương sống (cá, gà, chuột, người) ở giai đoạn đầu rất giống nhau: đều có khe mang, đuôi, cấu trúc cột sống dạng sơ khai. Sau đó mỗi loài "thêm chi tiết riêng". Ý nghĩa: chương trình phát triển sớm bảo tồn từ tổ tiên chung.

### 6.4. Sinh học phân tử (molecular biology)

Đây là bằng chứng *mạnh nhất hiện nay*. So sánh trình tự DNA hoặc protein giữa các loài cho khoảng cách di truyền (genetic distance). Mức tương đồng DNA xấp xỉ:

| Cặp so sánh | % giống DNA |
|-------------|-------------|
| Người – tinh tinh | ~98.8% |
| Người – khỉ Gorilla | ~98.4% |
| Người – chuột | ~85% |
| Người – chuối | ~50% (gene chia sẻ) |
| Mọi sinh vật – ribosome rRNA | giữ rất cao, dùng để dựng cây phát sinh |

Mọi sinh vật dùng chung mã di truyền (DNA/RNA, ribosome, ATP) → bằng chứng tổ tiên chung của sự sống. Sẽ học dựng cây phát sinh ở Lesson 08.

### 6.5. Phân bố địa lý (biogeography)

Loài ở khu vực địa lý gần nhau giống nhau hơn loài ở khu vực xa, **kể cả khi môi trường khác** — chứng tỏ chúng tiến hóa tại chỗ từ tổ tiên chung. Vd: thú có túi (kangaroo, koala, opossum) tập trung ở Úc do tách lục địa cách đây ~150 triệu năm — Úc bị cô lập, thú có túi tiến hóa độc lập thành nhiều dạng.

### 4 ví dụ "đếm khoảng cách di truyền"

**Ví dụ 1**: cytochrome c (protein hô hấp, 104 amino acid). So sánh với người: tinh tinh khác **0 amino acid**, chuột khác 9, cá ngừ khác 21, nấm men khác 51. Khoảng cách ↑ → quan hệ tiến hóa ↓.

**Ví dụ 2**: hemoglobin β người và tinh tinh khác **0/146 amino acid**; người và khỉ Gorilla khác 1/146; người và chó khác 15/146. Khoảng cách tỉ lệ với thời gian phân tách.

**Ví dụ 3**: nếu 2 loài có 10⁶ base DNA so sánh, khác nhau 1.2% → khoảng 12,000 base khác. Với tốc độ đột biến trung tính ~10⁻⁹/base/năm, thời gian phân tách $\approx \dfrac{12000}{2 \times 10^{-9} \times 10^6} =$ **6 triệu năm**. (Hệ số 2 vì cả 2 nhánh đều tích lũy đột biến.)

**Ví dụ 4**: 16S rRNA dài ~1500 base. Vi khuẩn và sinh vật nhân thật cùng có gene này với ~50% giống nhau → bằng chứng chung tổ tiên rất xa của mọi sự sống (~3.5 tỷ năm).

### ⚠ Lỗi thường gặp

- **Coi homology = giống nhau ngẫu nhiên**: cấu trúc tương đồng có chi tiết khớp (số xương, vị trí, phát triển phôi) — không thể giải thích bằng "ngẫu nhiên".
- **Tưởng tiến hóa = "tiến từ thấp lên cao"**: không có "cao/thấp"; chỉ có "thích nghi với môi trường khác nhau". Con người không "tiến hóa hơn" cá; cả hai đều thích nghi.
- **Đọc % giống DNA mà bỏ qua loại trừ chỉnh**: 98.8% người-tinh tinh chỉ tính so trình tự gene khớp; nếu tính cả insertion/deletion thì ~96%. Con số phụ thuộc phương pháp.

### 📝 Tóm tắt mục 6

- 5 nhóm bằng chứng độc lập, cùng chỉ về tổ tiên chung: hóa thạch, giải phẫu so sánh, phôi học, phân tử, địa lý.
- Cơ quan tương đồng (chung tổ tiên) vs tương tự (hội tụ) vs vết tích (tổ tiên cũ).
- Sinh học phân tử mạnh nhất: % giống DNA tỉ lệ với gần gũi tiến hóa.

---

## 7. Bài tập + Lời giải chi tiết

### Bài tập

**Bài 1**: Một quần thể bướm có 3 kiểu gen với số con trung bình để lại tới tuổi sinh sản: AA → 60, Aa → 90, aa → 30. Tính độ thích nghi tương đối (w) và hệ số chọn lọc (s) cho mỗi kiểu gen. Đây có phải lợi thế dị hợp không?

**Bài 2**: Một quần thể có $q_0 = 0{,}5$ (tần số allele lặn có hại a). Hệ số chọn lọc chống aa là $s = 0{,}2$. Tính $q_1$ sau 1 thế hệ chọn lọc, dùng cả công thức chính xác và xấp xỉ.

**Bài 3**: Hãy phân loại các tình huống sau vào 3 kiểu chọn lọc (định hướng / ổn định / phân hóa) và giải thích:
(a) Vi khuẩn trong bệnh viện kháng kháng sinh tăng từ 5% lên 90% sau 10 năm.
(b) Cân nặng trẻ sơ sinh người tập trung quanh 3.5kg ổn định qua nhiều thế hệ.
(c) Trên một đảo có 2 loại hạt (nhỏ và to, không hạt vừa), chim có mỏ rất nhỏ hoặc rất to chiếm tỉ lệ ngày càng lớn.

**Bài 4**: Một quần thể cách ly 50 cá thể (do bị lũ tách khỏi quần thể gốc 5000 cá thể). Sau 100 thế hệ, kết quả khả dĩ nhất là gì về (a) đa dạng allele, (b) tần số allele so với gốc?

**Bài 5**: So sánh trình tự cytochrome c giữa người với 4 loài, thấy số amino acid khác lần lượt: tinh tinh = 0, kangaroo = 10, gà = 13, cá ngừ = 21. Hãy sắp xếp các loài theo thứ tự quan hệ gần với người (gần nhất → xa nhất) và giải thích nguyên tắc.

**Bài 6**: Bệnh xơ nang (cystic fibrosis) là bệnh di truyền lặn ở người với q ≈ 0.02 trong quần thể châu Âu. Giả sử s = 1 (chết trước tuổi sinh sản trong điều kiện không có y học). Tính: (a) tần số kiểu hình bệnh aa, (b) tốc độ giảm q sau 1 thế hệ chọn lọc theo công thức xấp xỉ, (c) tốc độ đột biến μ cần để duy trì q ổn định ở 0.02.

### Lời giải

**Bài 1**:
- W\_max = 90 (Aa). w(AA) = 60/90 = **0.667**, s(AA) = 1 − 0.667 = **0.333**.
- w(Aa) = 90/90 = **1**, s(Aa) = **0**.
- w(aa) = 30/90 = **0.333**, s(aa) = 1 − 0.333 = **0.667**.
- **Có lợi thế dị hợp**: Aa có fitness cao nhất (w = 1), cả 2 đồng hợp (AA và aa) đều bị thiệt thòi. Đây là chọn lọc cân bằng (balancing) — sẽ giữ cả allele A và a ở tần số trung gian trong quần thể.

**Bài 2**:
- $q_0 = 0{,}5$, $p_0 = 0{,}5$, $q^2 = 0{,}25$, $s = 0{,}2$.
- **Chính xác**: $q_1 = \dfrac{q - s \cdot q^2}{1 - s \cdot q^2} = \dfrac{0{,}5 - 0{,}2 \cdot 0{,}25}{1 - 0{,}2 \cdot 0{,}25} = \dfrac{0{,}5 - 0{,}05}{1 - 0{,}05} = \dfrac{0{,}45}{0{,}95} \approx$ **0,4737**.
- **Xấp xỉ**: $q_1 \approx q - s \cdot p \cdot q^2 = 0{,}5 - 0{,}2 \cdot 0{,}5 \cdot 0{,}25 = 0{,}5 - 0{,}025 =$ **0,475**.
- Sai số xấp xỉ vs chính xác = 0.475 − 0.4737 = 0.0013 (rất nhỏ vì s không quá lớn). Tần số allele a giảm ~0,025/thế hệ — chỉ ~5% tương đối, dù s = 0.2.

**Bài 3**:
- (a) **Định hướng**: kiểu hình "kháng kháng sinh" được ưu ái 1 chiều; trung bình quần thể dịch theo hướng "kháng nhiều hơn".
- (b) **Ổn định**: 2 đầu (nhẹ cân hoặc nặng quá) bị bất lợi; vùng giữa (~3.5kg) ổn định → giảm phương sai, giữ trung bình.
- (c) **Phân hóa**: vùng giữa (mỏ vừa) bất lợi; 2 đầu (mỏ rất nhỏ, mỏ rất to) ưu ái → phân bố thành 2 đỉnh, tiền đề hình thành 2 loài/phân loài.

**Bài 4**:
- (a) **Đa dạng allele giảm mạnh** so với quần thể gốc. Lý do: hiệu ứng cổ chai (bottleneck) — 50 cá thể chỉ mang phần nhỏ allele của 5000 gốc; allele hiếm có khả năng cao bị mất hoàn toàn.
- (b) **Tần số allele lệch ngẫu nhiên** so với gốc do phiêu bạt (drift); một số allele có thể trôi tới 0 hoặc 1 (cố định). Vì N nhỏ, drift áp đảo cả chọn lọc → tần số khó dự đoán hướng nào, chỉ chắc là *lệch nhiều* so với gốc.

**Bài 5**:
- Quan hệ gần với người được đo bằng số amino acid khác biệt (càng ít càng gần): tinh tinh (0) < kangaroo (10) < gà (13) < cá ngừ (21).
- Thứ tự gần → xa: **tinh tinh → kangaroo → gà → cá ngừ**.
- Nguyên tắc: trình tự protein/DNA tích lũy đột biến theo thời gian. Nếu 2 loài chia tổ tiên cách đây càng lâu, số đột biến tích lũy ở mỗi nhánh càng nhiều → khoảng cách càng lớn. Đây là cơ sở của "đồng hồ phân tử (molecular clock)".

**Bài 6**:
- (a) Tần số kiểu hình bệnh $= q^2 = (0{,}02)^2 =$ **0,0004 = 4 × 10⁻⁴** = 1 trên 2500 trẻ.
- (b) Xấp xỉ: $q_1 \approx q - s \cdot p \cdot q^2 = 0{,}02 - 1 \cdot 0{,}98 \cdot 0{,}0004 = 0{,}02 - 0{,}000392 =$ **0,019608**. Lượng giảm = ~3.92 × 10⁻⁴ ⇒ chỉ giảm ~2% tương đối/thế hệ. Mặc dù s = 1 (chết hoàn toàn), tốc độ loại bỏ rất chậm vì $q^2$ nhỏ — allele "ẩn náu" trong dị hợp Aa.
- (c) Cân bằng đột biến-chọn lọc: $q_\text{cân bằng}^2 = \mu/s$ → $\mu = q^2 \cdot s = 0{,}0004 \cdot 1 =$ **4 × 10⁻⁴/thế hệ**. Tốc độ đột biến này cao hơn bình thường nhiều (~10⁻⁵ ~ 10⁻⁶); thực tế ở người tốc độ thật ~10⁻⁵ và q cân bằng tự nhiên thấp hơn 0.02. Lý do $q_\text{người} = 0{,}02$ cao hơn cân bằng có thể do: (i) lợi thế dị hợp (Aa kháng tả/lao?), (ii) drift trong lịch sử châu Âu, (iii) cân bằng chưa đạt do thời gian.

---

## 8. Liên kết và bài tiếp theo

- **Bài tiếp theo**: [Lesson 08 — Hình thành loài & cây phát sinh](../lesson-08-speciation-phylogeny/) — cách quần thể tách thành 2 loài, dựng cây phát sinh (phylogenetic tree) từ dữ liệu DNA, cơ chế cách ly sinh sản (reproductive isolation).
- **Liên kết ngược**:
  - [Lesson 05 — Đột biến](../lesson-05-mutation-biotech/) — nguồn duy nhất tạo biến dị mới.
  - [Lesson 06 — Di truyền quần thể](../lesson-06-population-genetics/) — tần số allele, định luật Hardy-Weinberg là cơ sở định lượng cho bài này.
- **Liên kết Math**: phân bố chuẩn (normal distribution), độ lệch chuẩn — sử dụng khi đánh giá drift và ba kiểu chọn lọc.
- **Đọc thêm**: Darwin (1859) *On the Origin of Species* — chương III và IV là tinh hoa lý luận chọn lọc tự nhiên; Dawkins *The Selfish Gene* — góc nhìn gene-centric về chọn lọc.

---

## 📝 Tổng kết Lesson 07

1. **Chọn lọc tự nhiên** = (biến dị di truyền) + (sinh sản chênh lệch) + (di truyền được) → tần số allele đổi qua thế hệ. Darwin & Wallace (1858–1859).
2. **Fitness (w)** = số con tương đối; **s = 1 − w** đo mức thiệt thòi. Lợi thế dị hợp (vd HbS với sốt rét) giữ allele "có hại khi đồng hợp".
3. **4 nhân tố tiến hóa**: đột biến (nguồn biến dị), dòng gen (hòa lẫn), phiêu bạt (ngẫu nhiên, mạnh ở N nhỏ — bottleneck, founder), chọn lọc (định hướng).
4. **3 kiểu chọn lọc**: định hướng (dịch trung bình — bướm bạch dương), ổn định (giảm phương sai — cân nặng sơ sinh), phân hóa (2 đỉnh — chim sẻ Darwin, tiền đề hình thành loài).
5. **Công thức**: $q_{n+1} \approx q_n - s \cdot p_n \cdot q_n^2$. Allele lặn giảm rất chậm khi q nhỏ vì $q^2$ nhỏ. Cân bằng đột biến-chọn lọc: $q \approx \sqrt{\mu/s}$.
6. **5 nhóm bằng chứng tiến hóa**: hóa thạch, giải phẫu so sánh (homologous/analogous/vestigial), phôi học, sinh học phân tử (% giống DNA, đồng hồ phân tử), phân bố địa lý.

**Tiếp theo**: [Lesson 08 — Hình thành loài & cây phát sinh](../lesson-08-speciation-phylogeny/)
