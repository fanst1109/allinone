// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: Math/02-Geometry/lesson-03-circles/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 03 — Đường tròn

## Mục tiêu

- Hiểu các thuật ngữ: **tâm, bán kính, dây cung, đường kính, cung, tiếp tuyến, cát tuyến**.
- Biết các **công thức chu vi, diện tích**.
- Hiểu các định lý quan trọng: **góc nội tiếp**, **góc ở tâm**, **tứ giác nội tiếp**.
- Liên hệ đường tròn ngoại tiếp / nội tiếp tam giác.

## Kiến thức tiền đề

- [Lesson 02 — Tam giác](../lesson-02-triangles/).

---

## 1. Đường tròn — Khái niệm

**Đường tròn (O, R)** = tập hợp các điểm cách điểm O cho trước **một khoảng không đổi R**.

- **Tâm**: O.
- **Bán kính**: R = khoảng cách từ tâm đến điểm trên đường tròn.
- **Đường kính** D = 2R = dây dài nhất, đi qua tâm.
- **Dây cung**: đoạn nối 2 điểm trên đường tròn.
- **Cung**: phần đường tròn giữa 2 điểm.

**Hình tròn**: vùng bên trong đường tròn (kèm cả đường tròn).

> 📐 **Định nghĩa đầy đủ — Đường tròn**
>
> **(a) Là gì**: Tập hợp **tất cả** các điểm trong mặt phẳng cách 1 điểm cố định O đúng 1 khoảng R cố định. Không nhiều hơn, không ít hơn — chính xác R.
>
> **(b) Vì sao cần**: Đường tròn là hình "đối xứng cao nhất" — đối xứng quay quanh O với MỌI góc. Đặc trưng này làm nó xuất hiện khắp nơi trong tự nhiên (giọt nước, mặt trăng tròn, sóng lan), kỹ thuật (bánh xe — quay không tịnh tiến), và toán (định nghĩa π = chu vi/đường kính, sin/cos qua đường tròn đơn vị).
>
> **(c) Ví dụ số**: Đường tròn (O, R=5). Điểm A(3, 4) cách O(0,0) = √(9+16) = 5 → A **trên** đường tròn. Điểm B(2, 3) cách O = √13 ≈ 3.6 < 5 → B **trong** hình tròn. Điểm C(6, 0) cách O = 6 > 5 → C **ngoài**. Chu vi = 2π·5 = 10π ≈ 31.4. Diện tích = π·25 ≈ 78.5.

💡 **Trực giác / Hình dung**: hình dung 1 sợi dây buộc cọc ở O, đầu kia gắn bút. Kéo căng dây (độ dài R) rồi quay 1 vòng → vết bút vẽ ra đúng **đường tròn**. Mọi điểm trên đường tròn cách cọc O đúng 1 độ dài dây R — không gần hơn, không xa hơn. Đó là định nghĩa.

❓ **Câu hỏi tự nhiên của người đọc**

- *"Đường tròn và hình tròn khác nhau gì?"* **Đường tròn** chỉ là đường viền (tập điểm cách O đúng R). **Hình tròn** là cả vùng bên trong + viền (tập điểm cách O ≤ R). Chu vi đo đường tròn, diện tích đo hình tròn.
- *"Đường kính có phải dây cung không?"* Có — đường kính là **dây cung dài nhất** (dây đi qua tâm). Mọi dây cung khác ngắn hơn.
- *"Làm sao biết 1 điểm nằm trong/trên/ngoài?"* So khoảng cách tới tâm với R: < R (trong), = R (trên), > R (ngoài).

⚠ **Lỗi thường gặp**: nhầm **bán kính** R với **đường kính** D. Nhớ D = 2R. Phản ví dụ: đường tròn "rộng 10 cm" (đường kính 10) thì R = 5, chu vi = 2π·5 = 10π — nếu lấy R = 10 sẽ ra 20π, sai gấp đôi.

🔁 **Dừng lại tự kiểm tra**

1. Đường tròn (O, R=5). Điểm M cách O 5 đơn vị nằm ở đâu? Điểm N cách O 7 đơn vị?
2. Dây cung dài nhất của đường tròn gọi là gì, dài bao nhiêu nếu R = 6?

<details><summary>Đáp án</summary>

1. M **trên** đường tròn (= R); N **ngoài** (> R).
2. Đường kính, dài 2R = **12**.

</details>

### 📝 Tóm tắt mục 1

- Đường tròn (O, R) = tập điểm cách tâm O đúng R; **hình tròn** = cả vùng trong.
- Đường kính D = 2R = dây cung dài nhất (qua tâm).
- So khoảng cách tới O với R → biết điểm trong/trên/ngoài.
- Đường tròn = hình đối xứng quay cao nhất (đối xứng với mọi góc quay).

---

## 2. Chu vi và diện tích

\`\`\`
C = 2πR = πD
S = πR²
\`\`\`

trong đó **π ≈ 3.14159**.

💡 **Vì sao π?** π là tỉ số chu vi / đường kính của MỌI đường tròn — không phụ thuộc kích thước. Đây là một trong những hằng số nổi tiếng nhất Toán.

💡 **Trực giác / Hình dung**: lăn 1 bánh xe đường kính 1 m trên đất, đi hết đúng 1 vòng → vết lăn dài π ≈ 3.14 m. Nghĩa là chu vi "gấp π lần đường kính", đúng cho mọi bánh xe to nhỏ. Diện tích thì "2 chiều" nên có R² (đường kính lên mũ 2).

**4 ví dụ số đa dạng**:
- R = 1: C = 2π ≈ 6.28; S = π ≈ 3.14.
- R = 5: C = 10π ≈ 31.4; S = 25π ≈ 78.5.
- D = 10 (→ R = 5): giống trên — chú ý cho đường kính phải chia 2 trước.
- R = 0.5: C = π ≈ 3.14; S = 0.25π ≈ 0.785.

❓ **Câu hỏi tự nhiên của người đọc**

- *"Vì sao chu vi có R mũ 1 mà diện tích có R mũ 2?"* Chu vi là độ dài (1 chiều) → tỉ lệ thuận với R. Diện tích (2 chiều) → tỉ lệ với R². Tăng R gấp đôi: chu vi gấp 2, diện tích gấp 4.
- *"π chính xác bằng bao nhiêu?"* π là số vô tỉ (vô hạn không tuần hoàn): 3.14159265... Thường lấy 3.14 hoặc 22/7 để tính nhanh.
- *"Đề cho đường kính thì sao?"* Chia đôi lấy R trước, hoặc dùng C = πD trực tiếp.

⚠ **Lỗi thường gặp**: dùng đường kính vào công thức S = πR². Phản ví dụ: đường kính 10, nếu thay R = 10 → S = 100π (sai); đúng phải R = 5 → S = 25π. Lỗi thứ 2: quên bình phương R trong diện tích (viết πR thay vì πR²).

🔁 **Dừng lại tự kiểm tra**

1. Đường tròn đường kính 14. Tính chu vi (lấy π ≈ 22/7).
2. Tăng bán kính gấp 3 thì diện tích tăng mấy lần?

<details><summary>Đáp án</summary>

1. C = πD = (22/7)·14 = **44**.
2. Diện tích tỉ lệ R² → tăng 3² = **9 lần**.

</details>

### 📝 Tóm tắt mục 2

- **C = 2πR = πD** (chu vi, 1 chiều, tỉ lệ R).
- **S = πR²** (diện tích, 2 chiều, tỉ lệ R²).
- π ≈ 3.14159 = tỉ số chu vi/đường kính của mọi đường tròn.
- Đề cho đường kính → chia 2 lấy R trước khi vào S = πR².

---

## 3. Các loại đường — Tiếp tuyến, Cát tuyến

💡 **Trực giác / Hình dung**: hãy hình dung 1 cây thước thẳng tiến dần về phía đường tròn. Lúc còn xa → không chạm (đường không cắt). Khi vừa "hôn" vào viền tại đúng 1 điểm → **tiếp tuyến**. Đẩy sâu hơn, thước "xuyên" qua đường tròn tại 2 điểm → **cát tuyến**. Khoảng cách từ tâm tới thước quyết định: > R, = R, < R.

- **Tiếp tuyến**: đường thẳng chỉ chạm đường tròn tại **1 điểm** duy nhất. Tại điểm chạm, tiếp tuyến **vuông góc với bán kính**.
- **Cát tuyến**: đường thẳng cắt đường tròn tại **2 điểm**.
- **Đường không cắt**: đường thẳng cách tâm khoảng > R.

**Verify bằng số**: đường tròn (O, R=5). Đường thẳng cách O 3 đơn vị (< 5) → **cắt** (cát tuyến), dây cung dài 2√(5²−3²) = 2·4 = 8. Đường cách O 5 đơn vị (= R) → **tiếp tuyến** (1 điểm). Đường cách O 7 (> 5) → **không cắt**.

❓ **Câu hỏi tự nhiên của người đọc**

- *"Vì sao tiếp tuyến vuông góc với bán kính?"* Vì bán kính tới điểm tiếp xúc là khoảng cách **ngắn nhất** từ tâm tới đường thẳng — mà khoảng cách ngắn nhất luôn là đường vuông góc.
- *"Từ 1 điểm ngoài đường tròn kẻ được mấy tiếp tuyến?"* Đúng **2** tiếp tuyến, và 2 đoạn tiếp tuyến từ điểm đó tới 2 tiếp điểm **bằng nhau**.
- *"Cát tuyến với dây cung khác nhau gì?"* Dây cung là **đoạn** nối 2 giao điểm; cát tuyến là **đường thẳng** chứa dây đó (kéo dài 2 phía).

⚠ **Lỗi thường gặp**: tưởng tiếp tuyến "song song với bán kính". Sai — tiếp tuyến **vuông góc** với bán kính tại điểm tiếp xúc. Phản ví dụ: nếu tiếp tuyến song song bán kính thì nó sẽ cắt đường tròn ở 2 điểm (thành cát tuyến), mâu thuẫn.

🔁 **Dừng lại tự kiểm tra**

1. Đường thẳng cách tâm 4, R = 4. Đường thẳng là loại gì?
2. Tiếp tuyến tạo với bán kính (tại tiếp điểm) góc bao nhiêu?

<details><summary>Đáp án</summary>

1. Khoảng cách = R → **tiếp tuyến**.
2. **90°** (vuông góc).

</details>

### 📝 Tóm tắt mục 3

- So khoảng cách d từ tâm tới đường thẳng với R: d > R không cắt, d = R tiếp tuyến, d < R cát tuyến.
- Tiếp tuyến chạm 1 điểm và **vuông góc với bán kính** tại đó.
- Từ 1 điểm ngoài kẻ được 2 tiếp tuyến, 2 đoạn tiếp tuyến bằng nhau.
- Cát tuyến cắt 2 điểm; đoạn nối 2 điểm đó là dây cung.

---

## 4. Góc trong đường tròn

💡 **Trực giác / Hình dung**: cùng 1 cung tròn AC, nhìn từ **tâm O** thấy "rộng", nhìn từ 1 điểm B **trên viền** thấy "hẹp đúng một nửa". Giống đứng gần sân khấu (tâm) thấy nó choán hết tầm mắt, lùi ra xa lên khán đài (trên viền) thấy nhỏ lại. Quan hệ "một nửa" này là chìa khóa của cả mục.

### 4.1. Góc ở tâm (Central angle)

Góc có đỉnh ở **tâm O**, 2 cạnh là 2 bán kính.

Góc ở tâm = **số đo cung** mà nó chắn.

### 4.2. Góc nội tiếp (Inscribed angle)

Góc có đỉnh **trên đường tròn**, 2 cạnh là 2 dây.

💡 **Định lý nội tiếp**: góc nội tiếp = **½ góc ở tâm** cùng chắn cung đó.

**Hệ quả quan trọng**:
- Mọi góc nội tiếp chắn cung **nửa đường tròn** (đường kính) đều bằng **90°**.
- Mọi góc nội tiếp cùng chắn 1 cung đều bằng nhau.

> 📐 **Định nghĩa đầy đủ — Định lý góc nội tiếp**
>
> **(a) Là gì**: Quan hệ "1/2" giữa 2 loại góc cùng chắn 1 cung. Góc nội tiếp (đỉnh trên đường tròn) = **một nửa** góc ở tâm (đỉnh tại O) cùng chắn cùng cung đó.
>
> **(b) Vì sao cần**: Vì định lý này cho phép **suy góc** mà không cần đo. Trong nhiều bài hình, ta chỉ biết 1 cung hoặc 1 góc tâm, định lý lập tức cho ra mọi góc nội tiếp tương ứng. Hệ quả nổi tiếng: "góc nội tiếp chắn nửa đường tròn = 90°" — dùng để chứng minh vuông góc mà không cần kiểm tra Pythagore. Cốt lõi của xây dựng đường tròn ngoại tiếp tam giác vuông.
>
> **(c) Ví dụ số**: Đường tròn tâm O, cung AC có góc ở tâm AOC = 80°. Lấy B bất kỳ trên cung lớn → góc ABC = 80°/2 = **40°**. Lấy B' khác cũng trên cung lớn → góc AB'C = 40° (bằng ABC). Nếu AC là đường kính (AOC = 180°) → mọi góc ABC = 90° (kinh điển).

### 4.3. Walk-through chứng minh nhanh

Cho góc nội tiếp ABC chắn cung AC. Vẽ đường kính BD qua tâm O.
- Tam giác OAB cân (OA = OB = R) → góc OAB = góc OBA.
- Tam giác OCB cân → góc OCB = góc OBC.
- Góc ABC = OBA + OBC.
- Góc ở tâm = AOC = AOD + DOC = 2·OBA + 2·OBC (góc ngoài tam giác cân) = 2·ABC ✓.

❓ **Câu hỏi tự nhiên của người đọc**

- *"Hai góc nội tiếp cùng chắn 1 cung có bằng nhau không?"* Có — vì đều bằng ½ góc ở tâm (chung 1 góc tâm). Đây là cơ sở để "dời" góc trong nhiều bài chứng minh.
- *"Vì sao góc chắn đường kính = 90°?"* Vì đường kính có góc ở tâm = 180° (góc bẹt) → góc nội tiếp = 180°/2 = 90°. Đây là định lý Thales.
- *"Góc ở tâm và góc nội tiếp phải cùng chắn cung nào?"* Cùng 1 cung. Nếu khác cung thì quan hệ ½ không áp dụng.

⚠ **Lỗi thường gặp**: lấy góc nội tiếp = góc ở tâm (quên chia 2). Phản ví dụ: cung có góc ở tâm 100° → góc nội tiếp = **50°**, không phải 100°. Lỗi ngược: nhân 2 sai chiều — nếu biết góc nội tiếp 30° thì góc ở tâm = 60° (×2), không phải 15°.

🔁 **Dừng lại tự kiểm tra**

1. Góc ở tâm chắn cung AB = 70°. Góc nội tiếp chắn cùng cung AB bằng bao nhiêu?
2. AB là đường kính, C trên đường tròn. Góc ACB bằng bao nhiêu?

<details><summary>Đáp án</summary>

1. 70°/2 = **35°**.
2. **90°** (góc nội tiếp chắn đường kính — định lý Thales).

</details>

### 📝 Tóm tắt mục 4

- **Góc ở tâm** (đỉnh tại O) = số đo cung nó chắn.
- **Góc nội tiếp** (đỉnh trên viền) = ½ góc ở tâm cùng chắn cung đó.
- Hệ quả: góc chắn đường kính = 90°; các góc nội tiếp cùng chắn 1 cung bằng nhau.
- Nhớ chia 2 khi đi từ góc tâm → góc nội tiếp (và nhân 2 khi đi ngược).

---

## 5. Tứ giác nội tiếp

💡 **Trực giác / Hình dung**: không phải tứ giác nào cũng "nhét" được 4 đỉnh lên cùng 1 đường tròn — chỉ những tứ giác "cân đối" mới được. Dấu hiệu nhận biết: 2 góc đối "bù trừ" cho nhau thành 180°. Hình dung 2 góc đối như 2 người ngồi đối diện bàn tròn — góc nhìn của họ cộng lại luôn "khép kín" nửa vòng.

**Tứ giác nội tiếp** = tứ giác có **4 đỉnh nằm trên 1 đường tròn**.

**Định lý**: tứ giác nội tiếp có **tổng 2 góc đối nhau = 180°**.

**Vì sao tổng 2 góc đối = 180°?** Góc A chắn cung BCD, góc C chắn cung BAD — 2 cung này ghép thành cả đường tròn (góc tâm tổng 360°). Mỗi góc nội tiếp = ½ cung → A + C = ½·360° = 180°. □

**Verify bằng số**: tứ giác nội tiếp có A = 85°, C đối diện → C = 180 − 85 = 95°. Nếu B = 110° thì D = 180 − 110 = 70°. Kiểm tổng 4 góc: 85+95+110+70 = 360° ✓ (đúng tổng góc tứ giác).

❓ **Câu hỏi tự nhiên của người đọc**

- *"Hình vuông, chữ nhật có nội tiếp được không?"* Có — 2 góc đối đều 90°, tổng 180° ✓. Mọi hình chữ nhật đều nội tiếp đường tròn (tâm là giao 2 đường chéo).
- *"Hình bình hành (không vuông) có nội tiếp không?"* Không — 2 góc đối của hình bình hành bằng nhau, tổng = 2·góc ≠ 180° trừ khi mỗi góc = 90° (thành chữ nhật).
- *"Dùng để làm gì?"* Chứng minh 4 điểm cùng nằm trên 1 đường tròn (đồng viên) bằng cách chỉ ra tổng 2 góc đối = 180°.

⚠ **Lỗi thường gặp**: nghĩ tổng 2 góc **kề** (không đối) = 180°. Sai — định lý nói 2 góc **đối diện** mới bù nhau. Phản ví dụ: tứ giác nội tiếp A=85, B=110, C=95, D=70 — A và C đối (85+95=180 ✓), nhưng A và B kề (85+110=195 ≠ 180).

🔁 **Dừng lại tự kiểm tra**

1. Tứ giác ABCD nội tiếp, góc B = 95°. Góc D bằng bao nhiêu?
2. Hình thoi (không vuông) có nội tiếp đường tròn được không?

<details><summary>Đáp án</summary>

1. D đối B → D = 180 − 95 = **85°**.
2. Không — 2 góc đối của hình thoi bằng nhau, tổng ≠ 180° trừ khi là hình vuông.

</details>

### 📝 Tóm tắt mục 5

- Tứ giác nội tiếp = 4 đỉnh cùng nằm trên 1 đường tròn.
- Định lý: tổng 2 góc **đối diện** = 180° (góc kề thì không).
- Chứng minh dựa trên góc nội tiếp = ½ cung; 2 cung đối ghép thành cả vòng.
- Dùng để chứng minh 4 điểm đồng viên (cùng nằm trên 1 đường tròn).

---

## 6. Đường tròn nội/ngoại tiếp tam giác

💡 **Trực giác / Hình dung**: đường tròn **ngoại tiếp** giống "vòng đai ôm ngoài" đi qua 3 đỉnh — như sợi dây căng quanh 3 cái cọc. Đường tròn **nội tiếp** giống "viên bi lớn nhất nhét vừa bên trong" tam giác, chạm cả 3 cạnh. Tâm ngoại tiếp cách đều 3 **đỉnh**; tâm nội tiếp cách đều 3 **cạnh**.

### Đường tròn ngoại tiếp

- Đường tròn đi qua **3 đỉnh** tam giác.
- Tâm = giao điểm **3 đường trung trực** của 3 cạnh.

### Đường tròn nội tiếp

- Đường tròn tiếp xúc với **3 cạnh** tam giác (bên trong).
- Tâm = giao điểm **3 đường phân giác** trong.

❓ **Câu hỏi tự nhiên của người đọc**

- *"Vì sao tâm ngoại tiếp là giao 3 đường trung trực?"* Điểm trên trung trực của cạnh thì cách đều 2 đầu cạnh đó. Giao của 3 trung trực cách đều cả 3 đỉnh → là tâm đường tròn đi qua 3 đỉnh.
- *"Vì sao tâm nội tiếp là giao 3 phân giác?"* Điểm trên phân giác 1 góc thì cách đều 2 cạnh của góc đó. Giao 3 phân giác cách đều cả 3 cạnh → tâm đường tròn tiếp 3 cạnh.
- *"Tâm ngoại tiếp luôn nằm trong tam giác?"* Không — với tam giác **tù**, tâm ngoại tiếp nằm **ngoài** tam giác. Tam giác vuông: tâm ngoại tiếp là trung điểm cạnh huyền. Tâm nội tiếp thì **luôn** trong tam giác.

⚠ **Lỗi thường gặp**: lẫn "trung trực" (đường tròn ngoại tiếp) với "phân giác" (nội tiếp). Mẹo: ngoạ**i** tiếp ↔ trung trực (đỉnh ở ngoài viền); nộ**i** tiếp ↔ phân giác (chạm cạnh bên trong). Lỗi thứ 2: tưởng R_ngoại = R_nội — với tam giác đều R_ngoại = 2·R_nội.

🔁 **Dừng lại tự kiểm tra**

1. Tâm đường tròn ngoại tiếp tam giác **vuông** nằm ở đâu?
2. Tam giác đều có quan hệ gì giữa R ngoại tiếp và r nội tiếp?

<details><summary>Đáp án</summary>

1. Trung điểm cạnh huyền (vì cạnh huyền là đường kính — góc vuông chắn đường kính).
2. R = 2r (bán kính ngoại tiếp gấp đôi nội tiếp).

</details>

### 📝 Tóm tắt mục 6

- **Ngoại tiếp**: đi qua 3 đỉnh; tâm = giao 3 đường **trung trực**; cách đều 3 đỉnh.
- **Nội tiếp**: tiếp xúc 3 cạnh; tâm = giao 3 đường **phân giác**; cách đều 3 cạnh.
- Tâm nội tiếp luôn trong tam giác; tâm ngoại tiếp có thể ra ngoài (tam giác tù).
- Tam giác vuông: tâm ngoại tiếp = trung điểm cạnh huyền. Tam giác đều: R = 2r.

---

## 7. Bài tập

### Bài tập

**Bài 1**: Đường tròn R = 5 cm. Tính chu vi và diện tích.

**Bài 2**: Cung AB dài 4π trên đường tròn R = 6. Tính góc ở tâm (radian và độ).

**Bài 3**: Cho tam giác ABC với BC là đường kính đường tròn ngoại tiếp. Chứng minh góc A = 90°.

**Bài 4**: Tứ giác ABCD nội tiếp đường tròn. A = 70°, C = ?

**Bài 5**: Tam giác đều cạnh 6. Tính bán kính đường tròn ngoại tiếp và nội tiếp.

### Lời giải

**Bài 1**: C = 2π·5 = **10π ≈ 31.42 cm**. S = π·25 = **25π ≈ 78.54 cm²**.

**Bài 2**: Độ dài cung = R·θ (rad) → θ = 4π/6 = **2π/3 rad** = 120°.

**Bài 3**: BC là đường kính → góc nội tiếp BAC chắn nửa đường tròn → BAC = 90° (theo định lý nội tiếp + cung nửa = 180°). Đây là **định lý Thales đảo**.

**Bài 4**: Tứ giác nội tiếp: A + C = 180° → C = **110°**.

**Bài 5**: Tam giác đều cạnh a. 
- R_ngoại tiếp = a/√3 = 6/√3 = 2√3 ≈ **3.46**.
- r_nội tiếp = a/(2√3) = 6/(2√3) = √3 ≈ **1.73** (R = 2r cho tam giác đều).

---

## 8. Bài tiếp theo

[Lesson 04 — Đa giác & Diện tích](../lesson-04-polygons-area/).

## 📝 Tổng kết

1. **Đường tròn**: tập điểm cách tâm 1 khoảng R.
2. **C = 2πR, S = πR²**.
3. **Tiếp tuyến** ⊥ bán kính tại điểm tiếp xúc.
4. **Góc nội tiếp = ½ góc ở tâm** cùng chắn cung. Chắn đường kính → 90°.
5. **Tứ giác nội tiếp**: 2 góc đối bù nhau.
6. **Ngoại tiếp** = đi qua 3 đỉnh (giao 3 trung trực); **nội tiếp** = tiếp 3 cạnh (giao 3 phân giác).
`;
