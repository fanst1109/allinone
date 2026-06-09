# Lesson 08 — Hình thành loài & phát sinh

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Phát biểu được **khái niệm loài sinh học (biological species concept)** của Ernst Mayr và biết **giới hạn** của khái niệm này (không áp dụng cho sinh vật vô tính, hóa thạch).
- Liệt kê và phân biệt **các rào cản cách ly sinh sản (reproductive isolation)** — 5 loại trước hợp tử (prezygotic) và 3 loại sau hợp tử (postzygotic).
- Phân biệt **hình thành loài khác khu (allopatric speciation)** và **cùng khu (sympatric speciation)** — cơ chế, ví dụ kinh điển, vì sao một loại phổ biến hơn.
- Hiểu cơ chế **đa bội hóa (polyploidy)** và tính được số bộ nhiễm sắc thể (NST) sau tự đa bội hoặc lai khác loài + đa bội.
- Đọc và xây dựng **cây phát sinh chủng loại (phylogenetic tree)** — phân biệt nút (node), nhánh (branch), tổ tiên chung gần nhất (MRCA — most recent common ancestor) và nhóm đơn nguyên (monophyletic / clade).
- Vận dụng **đồng hồ phân tử (molecular clock)** để ước lượng thời gian phân kỳ từ % khác biệt DNA và tốc độ đột biến.

## Kiến thức tiền đề

- [Lesson 07 — Chọn lọc tự nhiên](../lesson-07-natural-selection/) — cơ chế tạo ra sự khác biệt giữa quần thể. Hình thành loài là *hậu quả* khi sự khác biệt đó tích lũy đủ để chặn giao phối.
- [Lesson 06 — Di truyền quần thể](../lesson-06-population-genetics/) — cân bằng Hardy–Weinberg, sự thay đổi tần số allele. Nắm vững khái niệm "quần thể" trước khi học "loài".
- Bộ NST, giảm phân, đột biến số lượng NST — đã đề cập ở [Lesson 01 — Di truyền Mendel](../lesson-01-mendelian-genetics/) và [Lesson 05 — Đột biến & Công nghệ sinh học](../lesson-05-mutation-biotech/).

---

## 1. Khái niệm loài (species concept)

### 💡 Trực giác / Hình dung

Hãy hình dung sinh giới như một mạng lưới khổng lồ các cá thể, mỗi cá thể là một "chấm". Có chấm nào kết nối được với chấm nào (tức **giao phối được và sinh con có khả năng sinh sản**) thì cùng thuộc một "cụm". Một **loài** là một cụm như thế: bên trong dày đặc kết nối, ranh giới ra ngoài là "khoảng trắng" — không kết nối được với cụm khác.

### 1.1. Định nghĩa chính: Khái niệm loài sinh học (Mayr, 1942)

> **Loài (species) là nhóm các quần thể tự nhiên có thể giao phối với nhau và sinh ra con CÓ KHẢ NĂNG SINH SẢN, đồng thời bị cách ly sinh sản với các nhóm khác.**

Ba từ khóa cần khắc cốt:

1. **"Tự nhiên"** — phải giao phối được *trong điều kiện tự nhiên*. Trong sở thú, sư tử × hổ ra "liger" nhưng ngoài tự nhiên 2 loài không gặp nhau → vẫn là 2 loài khác nhau.
2. **"Có khả năng sinh sản"** — con lai phải sinh sản tiếp được. Ngựa × lừa ra **con la (mule)** sống khỏe nhưng *vô sinh* → ngựa và lừa vẫn là 2 loài.
3. **"Cách ly sinh sản"** — phải có rào cản (xem §2) ngăn dòng gen (gene flow) giữa 2 nhóm.

### 1.2. Vì sao cần khái niệm loài? Vì sao không chỉ dùng "loài hình thái"?

Trước Mayr, người ta phân loài dựa vào **hình dáng (morphology)**: trông giống nhau thì cùng loài. Hai vấn đề:

- **Đa hình trong loài (polymorphism)**: chim cánh cụt đực-cái khác hẳn nhau, ấu trùng ếch và ếch trưởng thành trông như 2 loài → hình thái nhầm lẫn.
- **Loài "anh em sinh đôi" (sibling species)**: hai loài muỗi *Anopheles* trông y hệt nhưng không giao phối được — chỉ phân biệt qua DNA hoặc tiếng đập cánh. Hình thái không phát hiện ra.

Khái niệm Mayr dựa vào **tiêu chí sinh học** (giao phối + con hữu sinh) → khách quan hơn, phản ánh đúng "cụm dòng gen" thực sự.

### 1.3. Hạn chế của khái niệm loài sinh học

Không phải sinh vật nào cũng áp được. Khi nào "thất bại":

| Trường hợp | Vì sao? | Khái niệm thay thế |
|------------|---------|---------------------|
| **Vi khuẩn** (sinh sản vô tính, chuyển gen ngang) | Không có "giao phối" theo nghĩa truyền thống | Loài hình thái + DNA (ngưỡng ≥97% giống 16S rRNA) |
| **Hóa thạch** | Không kiểm tra giao phối được | Loài hình thái (morphospecies) |
| **Sinh sản đơn tính** (vd thằn lằn cái tự sinh) | Không có giao phối | Loài hình thái + sinh thái |
| **Quần thể đang phân hóa** (chưa cách ly hoàn toàn) | Ranh giới mờ — vẫn lai được một phần | Khái niệm phát sinh (phylogenetic), sinh thái |

Trong thực tế, các nhà sinh học dùng **nhiều khái niệm song song** (sinh học, hình thái, sinh thái, phát sinh) tùy bối cảnh.

### ❓ Câu hỏi tự nhiên của người đọc

**Q: Liger (sư tử × hổ) sinh ra được, vậy sư tử và hổ có cùng loài không?**
A: **Không**. Lý do (1) trong tự nhiên 2 loài không gặp nhau (sư tử ở châu Phi/Á, hổ ở rừng châu Á); (2) liger thường **vô sinh hoặc giảm sinh sản** mạnh; (3) lai trong điều kiện nuôi nhốt không tính là "giao phối tự nhiên". Tiêu chí của Mayr không thỏa mãn.

**Q: Vì sao con la lại vô sinh dù bố mẹ đều bình thường?**
A: Ngựa có 2n = 64 NST, lừa có 2n = 62 NST. Con la nhận 32 NST từ ngựa + 31 NST từ lừa → 2n = 63 NST **lẻ**. Khi giảm phân tạo giao tử, các NST không có cặp tương đồng đầy đủ để bắt cặp → giảm phân thất bại → giao tử bất thường → vô sinh. Đây là **rào cản sau hợp tử** điển hình (xem §2.2).

**Q: Có "loài đang hình thành"không, hay luôn rạch ròi?**
A: Có. Hình thành loài là **quá trình liên tục**, không phải sự kiện đột ngột. Có những quần thể đã cách ly *một phần* (giao phối khó khăn, con lai một số vô sinh) — gọi là **loài chớm phát sinh (incipient species)**. Cá hồi sockeye và kokanee là ví dụ: cùng tổ tiên, đang phân hóa thành 2 loài khác nhau.

### ⚠ Lỗi thường gặp

- **Nghĩ "trông khác = loài khác"**: chó nhà có hàng trăm giống (chihuahua → great dane) trông cực khác nhau nhưng vẫn **cùng một loài** *Canis lupus familiaris* vì giao phối được, sinh con hữu sinh.
- **Nghĩ "lai được = cùng loài"**: liger, mule, beefalo đều là lai *được* nhưng vô sinh hoặc không tự nhiên → vẫn khác loài.
- **Áp khái niệm Mayr cho vi khuẩn / hóa thạch**: không phù hợp, phải dùng khái niệm khác.

### 🔁 Dừng lại tự kiểm tra

1. Hai con chim trông giống hệt, sống cùng khu rừng, nhưng tiếng hót khác hẳn và chưa từng quan sát thấy giao phối lẫn nhau. Chúng có cùng loài không? Cần kiểm tra thêm gì?
2. Lúa mì hoang dã (2n = 14) lai tự nhiên với cỏ goat-grass (2n = 14), con lai 2n = 14 nhưng vô sinh. Sau khi đa bội hóa thành 4n = 28 thì hữu sinh và tạo dòng riêng. Đây có phải hình thành loài không?

<details>
<summary>Đáp án</summary>

1. **Có khả năng là 2 loài khác nhau** — đây có thể là "loài anh em sinh đôi" (sibling species). Cần kiểm tra: (a) đem giao phối thử trong điều kiện kiểm soát, xem có sinh con hữu sinh không; (b) so sánh DNA; (c) quan sát có rào cản hành vi (tiếng hót khác → không nhận diện nhau làm bạn tình). Nếu giao phối không thành / con lai vô sinh → 2 loài khác nhau.
2. **Có** — đây là hình thành loài cùng khu (sympatric) qua đa bội hóa (xem §3.2). Dạng 4n = 28 cách ly sinh sản với cả hai bố mẹ 2n = 14 (lai ra 3n vô sinh) → một loài mới. Thực tế, lúa mì bánh mì hiện đại (6n = 42) được hình thành theo chuỗi đa bội như vậy.
</details>

### 📝 Tóm tắt mục 1

- Khái niệm loài sinh học (Mayr): nhóm quần thể tự nhiên giao phối được + sinh con hữu sinh + cách ly sinh sản với nhóm khác.
- Khắc phục giới hạn của khái niệm hình thái (loài anh em sinh đôi, đa hình trong loài).
- Không áp được cho vi khuẩn, hóa thạch, sinh sản đơn tính → có khái niệm thay thế (hình thái, phát sinh, sinh thái).
- Hình thành loài là quá trình liên tục, có "loài chớm phát sinh".

---

## 2. Các rào cản cách ly sinh sản (reproductive isolation)

### 💡 Trực giác / Hình dung

Cách ly sinh sản giống các **trạm chặn trên đường** không cho 2 quần thể trộn gen với nhau. Có trạm chặn *trước khi 2 giao tử gặp nhau* (rào cản trước hợp tử) — ví dụ "2 người không cùng giờ tan tầm nên không bao giờ chạm mặt". Có trạm chặn *sau khi giao tử đã kết hợp* (rào cản sau hợp tử) — ví dụ "đã kết hôn nhưng con không sinh ra được, hoặc sinh ra mà không có cháu".

### 2.1. Năm rào cản TRƯỚC hợp tử (prezygotic)

Ngăn việc tạo hợp tử ngay từ đầu.

| # | Rào cản | Cơ chế | Ví dụ kinh điển |
|---|---------|--------|-----------------|
| 1 | **Sinh thái / nơi sống (habitat)** | Hai loài sống ở môi trường khác nhau trong cùng khu vực → không gặp nhau | 2 loài rắn nước *Thamnophis*: 1 sống trong ao, 1 sống trên đất khô |
| 2 | **Thời gian (temporal)** | Mùa sinh sản khác nhau, hoặc giờ hoạt động khác | Hoa loa kèn miền Đông nở tháng 3; miền Tây nở tháng 5 — không bao giờ gặp phấn |
| 3 | **Hành vi (behavioral)** | Tín hiệu giao phối (tiếng kêu, vũ điệu, mùi) khác nhau → không nhận diện | Đom đóm: mỗi loài có mã chớp khác; chim sẻ Darwin: tiếng hót khác |
| 4 | **Cơ học (mechanical)** | Cơ quan sinh dục/cấu trúc hoa không khớp về vật lý | Một số ốc sên: vỏ xoắn trái và xoắn phải không giao phối được; hoa thụ phấn nhờ loài côn trùng khác nhau |
| 5 | **Giao tử (gametic)** | Tinh trùng không xâm nhập được trứng khác loài; hoặc protein bề mặt không khớp | Nhím biển: protein **bindin** trên tinh trùng chỉ khớp trứng cùng loài |

### 2.2. Ba rào cản SAU hợp tử (postzygotic)

Hợp tử đã hình thành nhưng vẫn không "đi đến đâu".

| # | Rào cản | Cơ chế | Ví dụ |
|---|---------|--------|-------|
| a | **Con lai không sống được (hybrid inviability)** | Hợp tử phát triển bất thường, chết sớm | Lai ếch *Rana* khác loài: phôi chết trong giai đoạn phôi nang |
| b | **Con lai vô sinh (hybrid sterility)** | Con lai sống khỏe nhưng không sinh sản được — thường do NST không bắt cặp đúng khi giảm phân | **Con la** (ngựa × lừa), **liger** (sư tử × hổ) |
| c | **Suy thoái con lai F2 (hybrid breakdown)** | F1 hữu sinh, nhưng F2 (con của F1) yếu, dị dạng, hoặc vô sinh | Một số giống lúa lai: F1 năng suất cao, F2 thoái hóa nặng |

### 2.3. Bốn ví dụ số / phân tích cụ thể

**Ví dụ 1 — Con la, vì sao vô sinh (số NST):**
Ngựa (mare): 2n = 64 → giao tử n = 32.
Lừa (donkey): 2n = 62 → giao tử n = 31.
Con la: 32 + 31 = **63 NST (lẻ)**. Khi giảm phân, NST tìm cặp tương đồng để bắt cặp — nhưng 63 lẻ, không chia đôi đẹp → giao tử bất thường → vô sinh. Đây là rào cản (b) hybrid sterility.

**Ví dụ 2 — Hoa loa kèn miền Đông/Tây Bắc Mỹ (rào cản thời gian):**
Loa kèn miền Đông nở rộ tuần 1–2 tháng 3, loa kèn miền Tây nở tuần 4 tháng 5. Tuần chồng lấn ≈ 0. Dù trồng cạnh nhau trong vườn, phấn của 2 loài chưa kịp gặp nhau → cách ly thời gian gần tuyệt đối.

**Ví dụ 3 — Ốc sên xoắn trái/phải (rào cản cơ học):**
Loài *Bradybaena similaris* có 2 biến thể vỏ: xoắn phải (dextral) chiếm ~95%, xoắn trái (sinistral) ~5%. Khi giao phối, ốc 2 dạng phải áp ngược chiều — cơ quan sinh dục không khớp về vị trí → tỉ lệ giao phối thành công giữa 2 biến thể giảm ~80% so với cùng biến thể. Đây là khởi đầu của hình thành loài cùng khu qua cơ học.

**Ví dụ 4 — Nhím biển và protein bindin (rào cản giao tử):**
Hai loài nhím biển *Strongylocentrotus purpuratus* và *S. franciscanus* sống chung vùng biển California, đẻ trứng/tinh trùng vào cùng nước cùng mùa. Nhưng protein **bindin** trên đầu tinh trùng khác trình tự amino acid → chỉ gắn được receptor tương ứng trên trứng cùng loài. Tỉ lệ thụ tinh chéo < 1%.

### ❓ Câu hỏi tự nhiên của người đọc

**Q: Một loài có cần đủ tất cả các rào cản này mới được coi là "khác loài"?**
A: **Không**. Chỉ cần **một** rào cản đủ mạnh để chặn dòng gen (gene flow) là đủ. Trong thực tế thường có vài rào cản chồng chất nhau, nhưng có khi chỉ cần 1 rào cản trước hợp tử (vd thời gian nở hoa) cũng đủ giữ 2 loài tách biệt qua hàng triệu năm.

**Q: Vì sao rào cản trước hợp tử "hiệu quả" hơn sau hợp tử?**
A: Vì rào cản trước hợp tử **tiết kiệm năng lượng** — cá thể không lãng phí giao tử / công sức nuôi con vào cá thể lai vô vọng. Chọn lọc tự nhiên thường củng cố rào cản trước hợp tử khi 2 loài tiếp xúc lại — gọi là **reinforcement (củng cố)**.

**Q: "Vùng lai (hybrid zone)" là gì?**
A: Vùng địa lý nơi 2 loài chớm phát sinh vẫn còn giao phối được một phần. Có 3 kết cục: (1) **kết hợp lại** (rào cản yếu, 2 quần thể sáp nhập); (2) **ổn định lai liên tục** (vùng lai duy trì lâu); (3) **củng cố** (chọn lọc tăng rào cản → 2 loài thực sự tách).

### ⚠ Lỗi thường gặp

- **Nhầm "vô sinh" với "không lai được"**: con la vô sinh là rào cản *sau* hợp tử (hợp tử đã hình thành, đứa con đã ra đời, chỉ là không sinh tiếp được). Còn "không lai được" mới là *trước* hợp tử.
- **Coi rào cản hành vi là "kém quan trọng"**: thực ra hành vi (tiếng hót, vũ điệu) là rào cản phổ biến và mạnh nhất ở chim, ếch — đủ tách hàng nghìn loài.
- **Nghĩ rào cản phải tuyệt đối 100%**: không cần. Chỉ cần đủ mạnh để dòng gen giữa 2 quần thể nhỏ hơn nhiều so với dòng gen nội bộ.

### 🔁 Dừng lại tự kiểm tra

1. Hai loài ếch sống chung 1 ao, mùa sinh sản trùng nhau, nhưng tiếng kêu của con đực khác nhau — con cái mỗi loài chỉ tiến lại gần con đực kêu đúng "giọng". Rào cản nào?
2. Lai chuột nhà với chuột đồng được phôi nhưng phôi chết trước khi sinh. Rào cản nào?

<details>
<summary>Đáp án</summary>

1. **Hành vi (behavioral)** — tiếng kêu là tín hiệu nhận diện bạn tình, "không đúng giọng" thì không phản ứng → trước hợp tử, loại 3.
2. **Hybrid inviability** — hợp tử đã tạo nhưng phôi không sống được → sau hợp tử, loại (a).
</details>

### 📝 Tóm tắt mục 2

- Rào cản trước hợp tử (5 loại): sinh thái, thời gian, hành vi, cơ học, giao tử — ngăn không cho tạo hợp tử.
- Rào cản sau hợp tử (3 loại): con lai chết sớm, con lai vô sinh, suy thoái F2.
- Chỉ cần **một** rào cản đủ mạnh là đủ tách loài. Rào cản trước thường được củng cố vì tiết kiệm năng lượng.
- Con la = ví dụ kinh điển hybrid sterility (NST 63, không bắt cặp được khi giảm phân).

---

## 3. Hai kiểu hình thành loài (modes of speciation)

### 💡 Trực giác / Hình dung

Tưởng tượng 1 lớp học đang ổn định 30 học sinh. Hai kịch bản:

- **Khác khu (allopatric)**: chia lớp đôi, 15 bạn chuyển sang phòng khác, 2 phòng học chương trình riêng vài năm. Khi gặp lại, "ngôn ngữ" + "thói quen" khác hẳn — không hòa lại được. Quá trình tách cần *cách ly địa lý* trước.
- **Cùng khu (sympatric)**: vẫn cùng 1 phòng, nhưng 1 nhóm bạn dần thành "câu lạc bộ" riêng (ăn riêng, học khác môn, lấy nhau). Sau vài thế hệ, dù cùng phòng, vẫn thành 2 nhóm khác. Không cần *tách địa lý*.

### 3.1. Hình thành loài KHÁC KHU (allopatric speciation)

**Bước 1 — Cách ly địa lý**: dãy núi nhô lên, sông đổi dòng, hồ tách thành nhiều hồ con, eo biển dâng nước → quần thể bị chia thành ≥ 2 nhóm địa lý cách biệt. Dòng gen giữa các nhóm = 0.

**Bước 2 — Tiến hóa độc lập**: mỗi nhóm chịu (a) chọn lọc tự nhiên khác nhau (môi trường khác), (b) đột biến độc lập (cái này có, cái kia không), (c) dòng gen ngẫu nhiên (genetic drift) đặc biệt mạnh nếu quần thể nhỏ (xem Lesson 06).

**Bước 3 — Cách ly sinh sản phát sinh**: sau N thế hệ, sự khác biệt đủ lớn → khi 2 nhóm gặp lại (nếu địa lý hợp nhất), chúng không nhận diện nhau làm bạn tình, hoặc con lai vô sinh. Bây giờ chúng là **2 loài**.

**Ví dụ kinh điển — Chim sẻ Darwin trên Galápagos**: 1 loài chim từ Nam Mỹ bay đến quần đảo Galápagos ~2 triệu năm trước → tách thành các quần thể trên các đảo riêng → mỗi đảo có nguồn thức ăn khác (hạt to/hạt nhỏ/côn trùng) → chọn lọc kích thước/hình mỏ khác nhau → ngày nay có **~15 loài chim sẻ** không lai được với nhau dù trông tương tự. Đây là phương thức **phổ biến nhất** trong tự nhiên.

### 3.2. Hình thành loài CÙNG KHU (sympatric speciation)

**KHÔNG cần** cách ly địa lý. Cơ chế chính:

**(a) Đa bội hóa (polyploidy) — phổ biến ở thực vật:**

Hai biến thể:

- **Tự đa bội (autopolyploidy)**: nội bộ 1 loài. Khi giảm phân bất thường, một số giao tử có 2n NST (thay vì n). Nếu 2 giao tử 2n hợp nhất → hợp tử **4n**. Cây 4n (tứ bội) lai với cây 2n (lưỡng bội) ra 3n (tam bội) → vô sinh. Vậy cây 4n bị "cô lập sinh sản" ngay trong quần thể bố mẹ → loài mới.
- **Dị đa bội (allopolyploidy)**: lai 2 loài, rồi đa bội hóa. 2 loài A (2n_A) và B (2n_B) lai → con (n_A + n_B), thường vô sinh vì NST không bắt cặp. Nếu đa bội hóa lên (2n_A + 2n_B) → mỗi NST bây giờ có cặp tương đồng → hữu sinh. Đây là cơ chế chính tạo **lúa mì bánh mì hiện đại** (6n = 42 NST, tổ hợp 3 bộ loài tổ tiên).

**(b) Phân hóa sinh thái nội bộ**: trong cùng khu, một nhóm chuyển sang ăn vật chủ / cây mới → giao phối trên vật chủ mới → cách ly với nhóm cũ. **Sâu táo (Rhagoletis pomonella)** ở Bắc Mỹ: vốn đẻ trên cây táo gai (hawthorn). Khi người Châu Âu mang táo nhà (apple) đến ~1860, một nhóm chuyển sang táo nhà → giao phối trên táo nhà → bắt đầu cách ly với nhóm hawthorn. Sau ~150 năm đã có khác biệt di truyền rõ rệt — chớm phát sinh loài.

**(c) Chọn lọc phân hóa cực mạnh** (disruptive selection): cá *Cichlid* hồ Victoria — chọn lọc theo màu của con đực, hai cực màu (đỏ và xanh) khiến cá cái chỉ chọn đúng cực → tách thành 2 loài dù cùng hồ.

### 3.3. Bốn ví dụ số / tính toán

**Ví dụ 1 — Tự đa bội ở thực vật:**
Cây mẹ 2n = 24. Một giao tử bất thường mang 2n = 24 (thay vì n = 12) hợp với giao tử bình thường n = 12 → con 3n = **36**. Cây 3n vô sinh (giảm phân không chia đều 3 bộ). Nếu 2 giao tử bất thường 2n × 2n gặp nhau → con **4n = 48**, có cặp tương đồng → hữu sinh. 4n × 2n → 3n vô sinh → cây 4n cách ly với 2n → **loài mới**.

**Ví dụ 2 — Dị đa bội (lúa mì):**
Loài A: 2n_A = 14 (n_A = 7). Loài B: 2n_B = 14 (n_B = 7).
Lai A × B → con (n_A + n_B) = 14 NST, *nhưng* không bắt cặp được vì 7 NST của A không tương đồng với 7 của B → giảm phân thất bại → vô sinh.
Đa bội hóa lên: mỗi NST nhân đôi → con có **2n_A + 2n_B = 14 + 14 = 28** NST. Bây giờ 7 cặp của A + 7 cặp của B, mỗi NST có cặp tương đồng (chính bản sao của nó) → bắt cặp đúng → giảm phân ổn → hữu sinh → loài mới 4n = 28.

**Ví dụ 3 — Lúa mì hiện đại (3 bộ tổ tiên):**
Lúa mì bánh mì *Triticum aestivum* có **6n = 42 NST**. Sinh ra qua 2 lần đa bội:
- Tổ tiên 1 + 2 (mỗi loài 2n = 14) → con lai 2n = 14 vô sinh → đa bội hóa → 4n = 28 (lúa mì cứng *T. turgidum*, hữu sinh).
- 4n = 28 lai với tổ tiên thứ 3 (2n = 14) → con 3n + 7 = 21 NST vô sinh → đa bội hóa → **6n = 42** (lúa mì bánh mì hiện đại).

**Ví dụ 4 — Tốc độ hình thành loài chim sẻ Darwin:**
~15 loài chim sẻ trên Galápagos hình thành trong ~2 triệu năm = 2,000,000 năm.
Tốc độ ≈ 2,000,000 / 15 ≈ **133,000 năm/loài** (1 loài mới sinh ra trung bình mỗi ~133 nghìn năm). So với hình thành loài ở hồ Cichlid Đông Phi: ~500 loài trong ~12,000 năm → ~24 năm/loài → cực nhanh, kỷ lục tiến hóa.

### ❓ Câu hỏi tự nhiên của người đọc

**Q: Vì sao đa bội hóa phổ biến ở thực vật mà hiếm ở động vật?**
A: Vì (1) thực vật nhiều loài tự thụ phấn được — cây 4n cô đơn vẫn sinh con; động vật cần bạn tình cùng bộ NST. (2) Thực vật chịu được rối loạn sinh lý do đa bội tốt hơn. (3) Ở động vật, đa bội thường gây rối loạn xác định giới tính (hệ NST X/Y) → chết. Ước tính: **~50–70% loài thực vật có hoa** từng trải qua đa bội hóa trong lịch sử tiến hóa, vs < 1% loài động vật có xương sống.

**Q: "Bao lâu" thì 2 quần thể đủ cách ly để thành 2 loài?**
A: Không có thời gian cố định. Phụ thuộc (a) cường độ chọn lọc, (b) kích thước quần thể (nhỏ → drift mạnh → tách nhanh), (c) độ khác biệt môi trường. Khoảng phổ biến: 100,000 – 10,000,000 năm cho hình thành loài khác khu. Đa bội ở thực vật có thể tách trong **1 thế hệ** (cực nhanh).

**Q: Hình thành loài cùng khu có thật không, hay chỉ là khác khu "lén lút"?**
A: Có thật, nhưng phải chứng minh chặt: bằng chứng địa lý + phân tích di truyền + lịch sử. Đa bội thực vật là ví dụ chắc chắn nhất (cô lập sinh sản tức thì, không cần cách ly địa lý). Cá *Cichlid* hồ Mỹ La Tinh (hồ tròn nhỏ, không có rào địa lý) cũng là bằng chứng mạnh.

### ⚠ Lỗi thường gặp

- **Nghĩ "khác khu = ở 2 châu lục"**: thực ra chỉ cần đủ rào cản địa lý ngăn dòng gen — 1 dòng sông, 1 dãy núi, 1 ngọn đồi cũng đủ.
- **Nhầm "polyploidy" với "đột biến điểm"**: polyploidy là **nhân đôi cả bộ NST**, không phải đổi 1 base. Hệ quả là *bước nhảy* về số NST, không phải đổi từ từ.
- **Coi sympatric là "không cần cách ly"**: vẫn cần cách ly *sinh sản* (rào cản giao phối), chỉ không cần cách ly *địa lý*.

### 🔁 Dừng lại tự kiểm tra

1. Một quần thể cá vàng (2n = 100) trong hồ A có một số cá thể bị tự đa bội thành 4n = 200. Cá 4n lai với 2n ra con 3n. Tại sao con 3n vô sinh? Cá 4n có thành loài mới không?
2. Hai loài thực vật P (2n = 18) và Q (2n = 12) lai → con vô sinh. Đa bội hóa → loài mới có bao nhiêu NST?

<details>
<summary>Đáp án</summary>

1. Con 3n có 3 bộ NST. Khi giảm phân, các NST không chia đều thành 2 nhóm vì 3 không chia hết cho 2 → giao tử có số NST loạn (vd 50, 51, 49 thay vì đều 50) → không sống được. Vậy cá 4n không lai được với 2n (con 3n chết / vô sinh) → **cá 4n cách ly sinh sản với 2n** → đúng, đó là loài mới (qua tự đa bội).
2. P (2n_P = 18, n_P = 9). Q (2n_Q = 12, n_Q = 6). Con lai = n_P + n_Q = 9 + 6 = 15 NST, vô sinh (NST không bắt cặp). Đa bội hóa: 2 × (n_P + n_Q) = 2 × 15 = **30 NST**. Loài mới: 2n = 30 = 4n (xét theo bộ gốc) → hữu sinh.
</details>

### 📝 Tóm tắt mục 3

- **Khác khu (allopatric)**: cách ly địa lý → tiến hóa độc lập → cách ly sinh sản. Phổ biến nhất. Vd chim sẻ Darwin.
- **Cùng khu (sympatric)**: không cần cách ly địa lý. Cơ chế chính: (a) đa bội hóa (chủ yếu thực vật), (b) phân hóa sinh thái, (c) chọn lọc phân hóa.
- **Đa bội**: tự đa bội (4n từ 2n) hoặc dị đa bội (lai 2 loài + nhân đôi NST). Lúa mì 6n = 42 là dị đa bội kép.
- Tốc độ hình thành loài: từ ~24 năm (Cichlid) đến hàng triệu năm; đa bội thực vật có thể tách trong 1 thế hệ.

---

## 4. Cây phát sinh chủng loại (phylogenetic tree)

### 💡 Trực giác / Hình dung

Cây phát sinh chủng loại giống **cây phả hệ gia tộc**, nhưng cho cả sinh giới. Mỗi điểm chia nhánh = "ông tổ chung" của các con cháu phía trên. Đi từ ngọn xuống gốc = lùi về quá khứ; đi từ gốc lên ngọn = thời gian tiến tới hiện tại. Khoảng cách giữa 2 loài trên cây = mức độ họ hàng (gần gốc hơn = phân kỳ lâu hơn → "xa họ" hơn).

### 4.1. Các thành phần của một cây

```
         (con người)   (tinh tinh)    (gorilla)         (đười ươi)
              |             |              |                 |
              +------+------+              |                 |
                     |                     |                 |
                     +----------+----------+                 |
                                |                            |
                                +-------------+--------------+
                                              |
                                          GỐC (root)
```

- **Gốc (root)**: tổ tiên chung xa nhất trong cây — thường ở dưới hoặc bên trái.
- **Nút (node)**: điểm chia nhánh — đại diện cho **tổ tiên chung** của các nhánh phía trên.
- **Nhánh (branch)**: đoạn nối; độ dài có thể biểu diễn thời gian hoặc lượng thay đổi DNA.
- **Ngọn (tip / leaf)**: các loài hiện đại (hoặc đơn vị phân loại tận cùng) được nghiên cứu.
- **MRCA (most recent common ancestor)**: tổ tiên chung GẦN NHẤT của 1 nhóm. Ví dụ: MRCA của người + tinh tinh + gorilla là nút chia 3 nhánh ngay phía dưới chúng.

### 4.2. Nhóm đơn nguyên (monophyletic / clade)

Một **clade** = tổ tiên chung + **TẤT CẢ** hậu duệ của nó. Đây là khái niệm gốc của phân loại học hiện đại — nhóm "đúng" phải là clade.

Ba loại nhóm:

| Loại | Định nghĩa | Có "đúng" không? |
|------|-----------|------------------|
| **Đơn nguyên (monophyletic / clade)** | Tổ tiên + tất cả hậu duệ | ✓ Đúng |
| **Phụ nguyên (paraphyletic)** | Tổ tiên + một số (không phải tất cả) hậu duệ | ✗ Sai — bỏ sót thành viên |
| **Đa nguyên (polyphyletic)** | Nhóm các loài không cùng tổ tiên gần | ✗ Sai — gom nhầm |

Ví dụ kinh điển: "Bò sát (Reptilia)" theo cách hiểu cũ (rắn, thằn lằn, cá sấu, rùa) là **paraphyletic** vì bỏ sót **chim** (chim chính là hậu duệ trực tiếp của khủng long, thuộc cùng clade). Phân loại hiện đại gộp lại thành clade **Sauropsida** = bò sát + chim.

### 4.3. Đồng hồ phân tử (molecular clock)

**Giả thuyết cơ bản**: tốc độ tích lũy đột biến trung tính (neutral mutation) trên một đoạn gen gần như **hằng số** theo thời gian. Vì vậy:

> **% khác biệt DNA giữa 2 loài $\approx$ 2 × tốc độ đột biến × thời gian phân kỳ**

Hệ số 2 là vì hai dòng tiến hóa độc lập (mỗi dòng tích đột biến từ tổ tiên đến hiện tại).

Công thức rút gọn:

$$t = \dfrac{D}{2 \times \mu}$$

Trong đó:
- $t$ = thời gian phân kỳ (năm)
- $D$ = phần khác biệt DNA (vd 0.012 = 1.2%)
- $\mu$ = tốc độ đột biến trên mỗi base mỗi năm

### 4.4. Bốn ví dụ số cụ thể

**Ví dụ 1 — Người và tinh tinh:**
DNA khác ~1.2% → $D = 0{,}012$. Tốc độ đột biến trung tính $\mu \approx 10^{-9}$ thay đổi/base/năm (giả định).
$t = \dfrac{0{,}012}{2 \times 10^{-9}} = 6 \times 10^6 =$ **6 triệu năm**. Khớp với hóa thạch (5–7 triệu năm trước).

**Ví dụ 2 — Người và chuột:**
Khác ~15% DNA, $D = 0{,}15$. Cùng $\mu = 10^{-9}$.
$t = \dfrac{0{,}15}{2 \times 10^{-9}} = 7{,}5 \times 10^7 =$ **75 triệu năm**. Khớp với phân kỳ giữa động vật có vú nguyên thủy trong kỷ Phấn Trắng.

**Ví dụ 3 — Hai loài chim sẻ Darwin:**
$D = 0{,}003$ (rất gần). $\mu = 10^{-9}$.
$t = \dfrac{0{,}003}{2 \times 10^{-9}} = 1{,}5 \times 10^6 =$ **1,5 triệu năm** — phù hợp lịch sử Galápagos.

**Ví dụ 4 — Đếm clade trong một cây:**
Cho cây 6 loài: (((A,B),(C,D)),(E,F))
- Clade 1: {A, B} (đơn nguyên — tổ tiên + cả 2 hậu duệ).
- Clade 2: {C, D}.
- Clade 3: {A, B, C, D} (gồm tổ tiên chung của 2 clade nhỏ + tất cả 4 loài).
- Clade 4: {E, F}.
- Clade 5: {A, B, C, D, E, F} (cả cây — luôn là 1 clade).
- Tổng cộng **5 clade**.
- Nhóm {A, B, C} thì sao? **Paraphyletic** vì có tổ tiên chung với D nhưng bỏ D ra → không phải clade.
- Nhóm {A, C} thì sao? **Polyphyletic** vì tổ tiên gần nhất của A và C cũng là tổ tiên của B và D → không bao gồm B, D nên không phải clade.

### ❓ Câu hỏi tự nhiên của người đọc

**Q: Đồng hồ phân tử có chính xác tuyệt đối không?**
A: **Không**. Giả định "tốc độ đột biến hằng số" chỉ đúng *trung bình*, có sai số. Tốc độ thực biến đổi theo (a) loại gen (gen quan trọng tiến hóa chậm hơn), (b) loài (chuột tích đột biến nhanh hơn người vì đời ngắn), (c) thời điểm. Sai số cỡ ±20–50% là bình thường. Cần **hiệu chuẩn** với hóa thạch ở các nút biết tuổi để tính chính xác.

**Q: Vì sao chim là "khủng long"?**
A: Chim là hậu duệ trực tiếp của một nhánh khủng long chân thú (theropods, gồm Velociraptor, T. rex). Họ chia sẻ MRCA với khủng long không phải chim. Nếu định nghĩa "khủng long" là **clade** (tổ tiên + tất cả hậu duệ), chim là một phần của clade này. Nếu định nghĩa theo cảm quan "thằn lằn to" → tự ý loại chim → paraphyletic (sai).

**Q: Làm sao xây cây từ DNA?**
A: Có nhiều phương pháp: (1) **Maximum parsimony** (cây nào ít thay đổi nhất); (2) **Maximum likelihood** (cây nào xác suất sinh ra dữ liệu cao nhất); (3) **Bayesian inference** (xác suất hậu nghiệm). Đầu vào: trình tự DNA / protein của các loài. Đầu ra: cây có độ tin cậy thống kê.

### ⚠ Lỗi thường gặp

- **Đọc cây ngược** — nghĩ "ngọn = tổ tiên, gốc = hiện tại". SAI: gốc luôn là quá khứ xa, ngọn là hiện tại.
- **Nghĩ "gần ngọn = giống nhau"** — gần *theo nhánh* mới giống, không phải gần *theo không gian vẽ*. Có thể vẽ rotate nhánh mà cây vẫn cùng một cây.
- **Nghĩ "loài hiện đại tiến hóa từ loài hiện đại khác"** — SAI. Hai loài hiện đại cùng tiến hóa từ tổ tiên *đã tuyệt chủng*. Người KHÔNG tiến hóa từ tinh tinh; cả hai tiến hóa từ tổ tiên chung (đã không còn).
- **Tin tuyệt đối đồng hồ phân tử** — chỉ là ước lượng, có sai số.

### 🔁 Dừng lại tự kiểm tra

1. Hai loài có DNA khác 2.4%. $\mu = 10^{-9}$. Thời gian phân kỳ là bao nhiêu?
2. Trong cây ((A,B),(C,(D,E))), MRCA của D và E là ai? MRCA của A và E? Nhóm {C, D, E} có phải clade không?

<details>
<summary>Đáp án</summary>

1. $t = \dfrac{0{,}024}{2 \times 10^{-9}} = 1{,}2 \times 10^7 =$ **12 triệu năm**.
2. MRCA(D,E) là nút chia 2 nhánh D và E (nút sâu nhất chứa cả 2). MRCA(A,E) là **gốc cả cây** (nút chia ((A,B)) và ((C,(D,E)))). Nhóm {C, D, E} là **clade** đơn nguyên vì C là chị em với clade (D,E), tổ tiên chung của 3 con này tồn tại và đủ cả 3 hậu duệ.
</details>

### 📝 Tóm tắt mục 4

- Cây phát sinh: gốc → nút (tổ tiên chung) → nhánh → ngọn (loài hiện đại).
- MRCA = tổ tiên chung gần nhất; clade = tổ tiên + TẤT CẢ hậu duệ.
- Phân loại đúng dựa vào clade (monophyletic). Paraphyletic / polyphyletic là phân loại sai.
- Đồng hồ phân tử: $t = \dfrac{D}{2 \times \mu}$. Có sai số, cần hiệu chuẩn với hóa thạch.
- Người KHÔNG tiến hóa từ tinh tinh — cả 2 từ tổ tiên chung đã tuyệt chủng ~6 triệu năm trước.

---

## 5. Bài tập + Lời giải chi tiết

### Bài tập

**Bài 1**: Phân loại các rào cản sau là *trước hợp tử* hay *sau hợp tử*, và nêu tên cụ thể (loại 1–5 hoặc a–c):
- (a) Hai loài cá tuna sống ở tầng nước khác nhau (mặt vs sâu).
- (b) Con la (ngựa × lừa) sinh ra khỏe mạnh nhưng không sinh con tiếp được.
- (c) Hai loài ếch có tiếng kêu giao phối khác nhau hoàn toàn.
- (d) Phôi lai giữa hai loài chuột chết trước khi sinh.
- (e) Cơ quan giao cấu của 2 loài bọ rùa không khớp.

**Bài 2**: Một loài cây 2n = 20 trải qua tự đa bội thành 4n. Một cây 4n lai với cây 2n bố mẹ.
(a) Cây 4n có bao nhiêu NST? Cây 2n có bao nhiêu?
(b) Con lai giữa 4n và 2n có bao nhiêu NST? Hữu sinh hay vô sinh? Vì sao?
(c) Cây 4n có được coi là loài mới so với 2n không? Giải thích.

**Bài 3**: Hai loài thực vật X (2n_X = 16) và Y (2n_Y = 22) lai khác loài tạo con vô sinh. Sau đa bội hóa, dòng mới hình thành.
(a) Con lai trước đa bội có bao nhiêu NST? Vì sao vô sinh?
(b) Sau đa bội hóa, loài mới có bao nhiêu NST?
(c) Đây là tự đa bội hay dị đa bội?

**Bài 4**: Hai loài có DNA khác nhau 4.8%. Tốc độ đột biến trung tính $\mu = 1{,}2 \times 10^{-9}$ thay đổi/base/năm.
(a) Tính thời gian phân kỳ giữa 2 loài.
(b) Nếu thay μ bằng 2 × 10⁻⁹ (tốc độ thật ở loài đời ngắn), kết quả đổi thế nào? Bài học gì?

**Bài 5**: Cho cây phát sinh: `(((A, B), C), (D, E))`. Trả lời:
(a) MRCA của A và B là ai? MRCA của A và E?
(b) Liệt kê tất cả các clade (nhóm đơn nguyên) trong cây.
(c) Nhóm {A, B, D} có phải clade không? Vì sao?
(d) Nhóm {A, C, E} có phải clade không? Vì sao?

**Bài 6**: Trong ~12,000 năm, hồ Cichlid Đông Phi (hồ Victoria) đã hình thành ~500 loài cá *Cichlid*. Trên Galápagos, ~15 loài chim sẻ Darwin hình thành trong ~2 triệu năm.
(a) Tính tốc độ hình thành loài (năm/loài) cho cả hai.
(b) Vì sao Cichlid nhanh hơn nhiều? (Gợi ý: liên hệ với cơ chế hình thành loài cùng khu, chọn lọc giới tính, kích thước quần thể.)

### Lời giải chi tiết

**Bài 1**:
- (a) **Trước hợp tử — sinh thái (1)**. Hai quần thể không gặp nhau vì tầng nước khác → không có cơ hội tạo hợp tử.
- (b) **Sau hợp tử — hybrid sterility (b)**. Hợp tử đã hình thành, con đã sinh ra khỏe; chỉ là không sinh con tiếp. Lý do: NST 63 lẻ, không bắt cặp được khi giảm phân.
- (c) **Trước hợp tử — hành vi (3)**. Tiếng kêu là tín hiệu nhận diện bạn tình; con cái không phản ứng với tiếng "lạ" → không giao phối.
- (d) **Sau hợp tử — hybrid inviability (a)**. Phôi đã hình thành (đã có hợp tử) nhưng chết trước sinh.
- (e) **Trước hợp tử — cơ học (4)**. Cơ quan sinh dục không khớp về vật lý.

**Bài 2**:
(a) Cây 4n: 4 × (n) = 4 × 10 = **40 NST** (vì 2n = 20 → n = 10). Cây 2n vẫn 20.
(b) Con lai = giao tử 4n (n_4n = 2n = 20) + giao tử 2n (n_2n = 10) = **30 NST = 3n** (tam bội). Khi tam bội giảm phân, 3 bộ NST không chia đều thành 2 nhóm (vì 3 không chia hết cho 2) → giao tử có số NST bất thường (vd 14, 16) → **vô sinh**.
(c) **Có, là loài mới**. Vì cây 4n không thể có con cháu hữu sinh với 2n (con 3n vô sinh) → **cách ly sinh sản** với 2n → thỏa khái niệm loài sinh học của Mayr. Đây là tự đa bội (autopolyploidy).

**Bài 3**:
(a) Con lai trước đa bội: n_X + n_Y = 8 + 11 = **19 NST**. Vô sinh vì 8 NST của X không có cặp tương đồng với 11 của Y → giảm phân thất bại.
(b) Đa bội hóa = nhân đôi bộ NST → loài mới có **2n_X + 2n_Y = 16 + 22 = 38 NST**. Bây giờ mỗi NST đều có "anh em sinh đôi" để bắt cặp → giảm phân ổn → hữu sinh.
(c) **Dị đa bội (allopolyploidy)** — vì kết hợp bộ NST của 2 loài *khác nhau* X và Y, không phải nhân đôi nội bộ 1 loài.

**Bài 4**:
(a) $D = 0{,}048$, $\mu = 1{,}2 \times 10^{-9}$.
$t = \dfrac{D}{2 \times \mu} = \dfrac{0{,}048}{2 \times 1{,}2 \times 10^{-9}} = \dfrac{0{,}048}{2{,}4 \times 10^{-9}} = 2 \times 10^7 =$ **20 triệu năm**.
(b) Với $\mu = 2 \times 10^{-9}$: $t = \dfrac{0{,}048}{4 \times 10^{-9}} = 1{,}2 \times 10^7 =$ **12 triệu năm**.
**Bài học**: ước lượng đồng hồ phân tử *rất nhạy* với giá trị μ giả định. Sai số ~67% chỉ vì đổi μ × 1.67. Trong thực tế, μ phải được hiệu chuẩn với hóa thạch (vd biết MRCA chuột-chuột nâu phân kỳ 12 triệu năm → suy ngược ra μ cho dòng đó) chứ không dùng giá trị "chuẩn" cho mọi nhóm.

**Bài 5**: Cây `(((A, B), C), (D, E))`. Phân tích cấu trúc:
- Nút sâu nhất: chia (A,B). Nút trên: chia ((A,B), C). Nút trên nữa: chia D, E. Gốc: chia toàn cây.

(a) MRCA(A, B) = nút chia A và B (nút sâu nhất bên trái).
MRCA(A, E) = **gốc cả cây** — vì A nằm trong nhánh trái, E nằm trong nhánh phải; tổ tiên chung gần nhất là gốc.
(b) Tất cả clade:
- {A, B} — đơn nguyên (tổ tiên chung + cả 2 hậu duệ).
- {A, B, C} — đơn nguyên (clade lớn hơn bao gồm cả MRCA(A,B,C)).
- {D, E} — đơn nguyên.
- {A, B, C, D, E} — clade gốc, luôn là clade.
→ **4 clade**.
(c) {A, B, D} — **không phải clade**. MRCA của A, B, D là gốc cả cây — nhưng gốc còn có hậu duệ C và E mà không gồm trong nhóm. Tổ tiên + một số (không phải tất cả) hậu duệ → **paraphyletic**.
(d) {A, C, E} — **không phải clade**. MRCA của A và E là gốc, gồm cả B và D không trong nhóm. Tệ hơn, A và C có MRCA gần hơn (nút {A,B,C}) mà bỏ qua B → đây là tổ hợp không tự nhiên — **paraphyletic hoặc polyphyletic** tùy cách nhìn; điểm chính: không thỏa định nghĩa clade.

**Bài 6**:
(a) Cichlid: 12,000 / 500 = **24 năm/loài** (cực nhanh).
Chim sẻ Darwin: 2,000,000 / 15 ≈ **133,000 năm/loài**.
Tỉ số: ~5,500 lần — Cichlid nhanh hơn ~5,500 lần.
(b) Lý do Cichlid nhanh:
- **Chọn lọc giới tính cực mạnh** (sexual selection): cá đực có màu rực rỡ; cá cái chọn lọc khắt khe theo màu → chọn lọc phân hóa nhanh giữa các "thị hiếu màu".
- **Cùng khu, đa dạng vi sinh thái**: hồ Victoria nhiều ổ sinh thái (đá, cát, bùn, vùng sâu nông) → đa dạng nguồn thức ăn → đa dạng kích thước hàm/răng.
- **Quần thể nhỏ trong các vùng riêng** trong cùng hồ → drift mạnh.
- Chim sẻ Galápagos hình thành chủ yếu khác khu (mỗi đảo 1 quần thể) — bị "giới hạn" bởi số đảo, tách chậm hơn.

---

## 6. Liên kết và bài tiếp theo

Đây là **bài cuối của Tầng 2 (Genetics & Evolution)**. Sau khi hoàn thành Tầng 1 (phân tử & tế bào) và Tầng 2 (di truyền & tiến hóa), bạn có nền tảng để bước sang Tầng 3 — sinh lý học và sinh thái học, nơi áp dụng toàn bộ kiến thức di truyền/tiến hóa vào hệ cơ quan và quần thể sinh vật thật.

- **Tầng 3 — Sinh lý & Sinh thái**: [`Biology/03-Physiology-Ecology/`](../../03-Physiology-Ecology/)
  - [Lesson 01 — Hệ thần kinh](../../03-Physiology-Ecology/lesson-01-nervous-system/) — bài đầu tiên Tầng 3, học cách tế bào (Tầng 1) tổ chức thành hệ truyền tin trong cơ thể.
- **Liên kết ngược trong Tầng 2**:
  - [Lesson 06 — Di truyền quần thể](../lesson-06-population-genetics/) — nền tảng "tần số allele" cho hình thành loài.
  - [Lesson 07 — Chọn lọc tự nhiên](../lesson-07-natural-selection/) — động cơ phân hóa giữa các quần thể.
  - [Lesson 05 — Đột biến & Công nghệ sinh học](../lesson-05-mutation-biotech/) — nguồn biến dị (đa bội là dạng đột biến số lượng NST).
- **Liên kết ngang**:
  - [Tầng 1 — Lesson 01 (Phân tử sinh học)](../../01-Molecules-Cells/lesson-01-biomolecules/) — DNA là nền tảng cho đồng hồ phân tử.
  - `Math/` — xác suất + thống kê (sẽ dùng khi học phương pháp Bayes để xây cây phát sinh).

---

## 📝 Tổng kết Lesson 08

1. **Khái niệm loài (Mayr)**: nhóm quần thể tự nhiên giao phối được + sinh con hữu sinh + cách ly sinh sản với nhóm khác. Có giới hạn → cần khái niệm thay thế cho vi khuẩn / hóa thạch.
2. **Rào cản cách ly sinh sản**: 5 loại trước hợp tử (sinh thái, thời gian, hành vi, cơ học, giao tử) + 3 loại sau hợp tử (con lai chết, vô sinh, suy thoái F2). Chỉ cần 1 rào cản đủ mạnh.
3. **Hình thành loài khác khu (allopatric)**: cách ly địa lý → tiến hóa độc lập → cách ly sinh sản. Phổ biến nhất. Vd chim sẻ Darwin.
4. **Hình thành loài cùng khu (sympatric)**: không cần cách ly địa lý. Đa bội hóa chủ yếu ở thực vật (lúa mì 6n = 42); phân hóa sinh thái và chọn lọc phân hóa ở động vật.
5. **Cây phát sinh chủng loại**: gốc → nút (MRCA) → nhánh → ngọn. Phân loại đúng dùng clade (monophyletic). Paraphyletic / polyphyletic là sai.
6. **Đồng hồ phân tử**: $t = \dfrac{D}{2 \times \mu}$. Người-tinh tinh ~1.2% DNA → ~6 triệu năm trước. Có sai số, cần hiệu chuẩn với hóa thạch.

### 🎓 Ghi chú: Tầng 2 hoàn tất

Hoàn thành Lesson 08 nghĩa là bạn đã đi qua trọn vẹn **Tầng 2 — Genetics & Evolution**:

| # | Lesson | Trọng tâm |
|---|--------|-----------|
| 01 | Mendelian genetics | Quy luật di truyền cơ bản |
| 02 | DNA replication | Cơ chế tự sao bản gốc |
| 03 | Transcription & translation | Từ DNA → RNA → protein |
| 04 | Gene regulation | Khi nào gen bật/tắt |
| 05 | Mutation & biotech | Nguồn biến dị + ứng dụng |
| 06 | Population genetics | Tần số allele trong quần thể |
| 07 | Natural selection | Động cơ tiến hóa |
| 08 | **Speciation & phylogeny** | **Hậu quả tiến hóa: loài mới** |

Bạn đã sẵn sàng cho **Tầng 3 — Physiology & Ecology**: cách các cơ thể đã tiến hóa tổ chức hệ cơ quan và sinh thái thật. Khởi động ở [Lesson 01 — Hệ thần kinh](../../03-Physiology-Ecology/lesson-01-nervous-system/).
