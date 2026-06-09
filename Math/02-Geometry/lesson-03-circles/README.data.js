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
> **(b) Vì sao cần**: Đường tròn là hình "đối xứng cao nhất" — đối xứng quay quanh O với MỌI góc. Đặc trưng này làm nó xuất hiện khắp nơi trong tự nhiên (giọt nước, mặt trăng tròn, sóng lan), kỹ thuật (bánh xe — quay không tịnh tiến), và toán (định nghĩa $\\pi =$ chu vi/đường kính, sin/cos qua đường tròn đơn vị).
>
> **(c) Ví dụ số**: Đường tròn ($O$, $R=5$). Điểm $A(3, 4)$ cách $O(0,0) = \\sqrt{9+16} = 5$ → A **trên** đường tròn. Điểm $B(2, 3)$ cách $O = \\sqrt{13} \\approx 3.6 < 5$ → B **trong** hình tròn. Điểm $C(6, 0)$ cách $O = 6 > 5$ → C **ngoài**. Chu vi $= 2\\pi\\cdot 5 = 10\\pi \\approx 31.4$. Diện tích $= \\pi\\cdot 25 \\approx 78.5$.

💡 **Trực giác / Hình dung**: hình dung 1 sợi dây buộc cọc ở O, đầu kia gắn bút. Kéo căng dây (độ dài R) rồi quay 1 vòng → vết bút vẽ ra đúng **đường tròn**. Mọi điểm trên đường tròn cách cọc O đúng 1 độ dài dây R — không gần hơn, không xa hơn. Đó là định nghĩa.

❓ **Câu hỏi tự nhiên của người đọc**

- *"Đường tròn và hình tròn khác nhau gì?"* **Đường tròn** chỉ là đường viền (tập điểm cách O đúng R). **Hình tròn** là cả vùng bên trong + viền (tập điểm cách $O \\le R$). Chu vi đo đường tròn, diện tích đo hình tròn.
- *"Đường kính có phải dây cung không?"* Có — đường kính là **dây cung dài nhất** (dây đi qua tâm). Mọi dây cung khác ngắn hơn.
- *"Làm sao biết 1 điểm nằm trong/trên/ngoài?"* So khoảng cách tới tâm với R: $< R$ (trong), $= R$ (trên), $> R$ (ngoài).

⚠ **Lỗi thường gặp**: nhầm **bán kính** R với **đường kính** D. Nhớ $D = 2R$. Phản ví dụ: đường tròn "rộng 10 cm" (đường kính 10) thì $R = 5$, chu vi $= 2\\pi\\cdot 5 = 10\\pi$ — nếu lấy $R = 10$ sẽ ra $20\\pi$, sai gấp đôi.

🔁 **Dừng lại tự kiểm tra**

1. Đường tròn ($O$, $R=5$). Điểm M cách O 5 đơn vị nằm ở đâu? Điểm N cách O 7 đơn vị?
2. Dây cung dài nhất của đường tròn gọi là gì, dài bao nhiêu nếu $R = 6$?

<details><summary>Đáp án</summary>

1. M **trên** đường tròn ($= R$); N **ngoài** ($> R$).
2. Đường kính, dài $2R =$ **12**.

</details>

### 📝 Tóm tắt mục 1

- Đường tròn (O, R) = tập điểm cách tâm O đúng R; **hình tròn** = cả vùng trong.
- Đường kính D = 2R = dây cung dài nhất (qua tâm).
- So khoảng cách tới O với R → biết điểm trong/trên/ngoài.
- Đường tròn = hình đối xứng quay cao nhất (đối xứng với mọi góc quay).

---

## 2. Chu vi và diện tích

$$\\begin{aligned}
C &= 2\\pi R = \\pi D \\\\
S &= \\pi R^2
\\end{aligned}$$

trong đó **$\\pi \\approx 3.14159$**.

💡 **Vì sao $\\pi$?** $\\pi$ là tỉ số chu vi / đường kính của MỌI đường tròn — không phụ thuộc kích thước. Đây là một trong những hằng số nổi tiếng nhất Toán.

💡 **Trực giác / Hình dung**: lăn 1 bánh xe đường kính 1 m trên đất, đi hết đúng 1 vòng → vết lăn dài $\\pi \\approx 3.14$ m. Nghĩa là chu vi "gấp $\\pi$ lần đường kính", đúng cho mọi bánh xe to nhỏ. Diện tích thì "2 chiều" nên có $R^2$ (đường kính lên mũ 2).

**4 ví dụ số đa dạng**:
- $R = 1$: $C = 2\\pi \\approx 6.28$; $S = \\pi \\approx 3.14$.
- $R = 5$: $C = 10\\pi \\approx 31.4$; $S = 25\\pi \\approx 78.5$.
- $D = 10$ (→ $R = 5$): giống trên — chú ý cho đường kính phải chia 2 trước.
- $R = 0.5$: $C = \\pi \\approx 3.14$; $S = 0.25\\pi \\approx 0.785$.

❓ **Câu hỏi tự nhiên của người đọc**

- *"Vì sao chu vi có R mũ 1 mà diện tích có R mũ 2?"* Chu vi là độ dài (1 chiều) → tỉ lệ thuận với R. Diện tích (2 chiều) → tỉ lệ với $R^2$. Tăng R gấp đôi: chu vi gấp 2, diện tích gấp 4.
- *"$\\pi$ chính xác bằng bao nhiêu?"* $\\pi$ là số vô tỉ (vô hạn không tuần hoàn): 3.14159265... Thường lấy 3.14 hoặc 22/7 để tính nhanh.
- *"Đề cho đường kính thì sao?"* Chia đôi lấy R trước, hoặc dùng $C = \\pi D$ trực tiếp.

⚠ **Lỗi thường gặp**: dùng đường kính vào công thức $S = \\pi R^2$. Phản ví dụ: đường kính 10, nếu thay $R = 10$ → $S = 100\\pi$ (sai); đúng phải $R = 5$ → $S = 25\\pi$. Lỗi thứ 2: quên bình phương R trong diện tích (viết $\\pi R$ thay vì $\\pi R^2$).

🔁 **Dừng lại tự kiểm tra**

1. Đường tròn đường kính 14. Tính chu vi (lấy $\\pi \\approx 22/7$).
2. Tăng bán kính gấp 3 thì diện tích tăng mấy lần?

<details><summary>Đáp án</summary>

1. $C = \\pi D = (22/7)\\cdot 14 =$ **44**.
2. Diện tích tỉ lệ $R^2$ → tăng $3^2 =$ **9 lần**.

</details>

### 📝 Tóm tắt mục 2

- **$C = 2\\pi R = \\pi D$** (chu vi, 1 chiều, tỉ lệ R).
- **$S = \\pi R^2$** (diện tích, 2 chiều, tỉ lệ $R^2$).
- $\\pi \\approx 3.14159 =$ tỉ số chu vi/đường kính của mọi đường tròn.
- Đề cho đường kính → chia 2 lấy R trước khi vào $S = \\pi R^2$.

---

## 3. Các loại đường — Tiếp tuyến, Cát tuyến

💡 **Trực giác / Hình dung**: hãy hình dung 1 cây thước thẳng tiến dần về phía đường tròn. Lúc còn xa → không chạm (đường không cắt). Khi vừa "hôn" vào viền tại đúng 1 điểm → **tiếp tuyến**. Đẩy sâu hơn, thước "xuyên" qua đường tròn tại 2 điểm → **cát tuyến**. Khoảng cách từ tâm tới thước quyết định: $> R$, $= R$, $< R$.

- **Tiếp tuyến**: đường thẳng chỉ chạm đường tròn tại **1 điểm** duy nhất. Tại điểm chạm, tiếp tuyến **vuông góc với bán kính**.
- **Cát tuyến**: đường thẳng cắt đường tròn tại **2 điểm**.
- **Đường không cắt**: đường thẳng cách tâm khoảng $> R$.

**Verify bằng số**: đường tròn ($O$, $R=5$). Đường thẳng cách O 3 đơn vị ($< 5$) → **cắt** (cát tuyến), dây cung dài $2\\sqrt{5^2-3^2} = 2\\cdot 4 = 8$. Đường cách O 5 đơn vị ($= R$) → **tiếp tuyến** (1 điểm). Đường cách O 7 ($> 5$) → **không cắt**.

❓ **Câu hỏi tự nhiên của người đọc**

- *"Vì sao tiếp tuyến vuông góc với bán kính?"* Vì bán kính tới điểm tiếp xúc là khoảng cách **ngắn nhất** từ tâm tới đường thẳng — mà khoảng cách ngắn nhất luôn là đường vuông góc.
- *"Từ 1 điểm ngoài đường tròn kẻ được mấy tiếp tuyến?"* Đúng **2** tiếp tuyến, và 2 đoạn tiếp tuyến từ điểm đó tới 2 tiếp điểm **bằng nhau**.
- *"Cát tuyến với dây cung khác nhau gì?"* Dây cung là **đoạn** nối 2 giao điểm; cát tuyến là **đường thẳng** chứa dây đó (kéo dài 2 phía).

⚠ **Lỗi thường gặp**: tưởng tiếp tuyến "song song với bán kính". Sai — tiếp tuyến **vuông góc** với bán kính tại điểm tiếp xúc. Phản ví dụ: nếu tiếp tuyến song song bán kính thì nó sẽ cắt đường tròn ở 2 điểm (thành cát tuyến), mâu thuẫn.

🔁 **Dừng lại tự kiểm tra**

1. Đường thẳng cách tâm 4, R = 4. Đường thẳng là loại gì?
2. Tiếp tuyến tạo với bán kính (tại tiếp điểm) góc bao nhiêu?

<details><summary>Đáp án</summary>

1. Khoảng cách $= R$ → **tiếp tuyến**.
2. **$90^\\circ$** (vuông góc).

</details>

### 📝 Tóm tắt mục 3

- So khoảng cách d từ tâm tới đường thẳng với R: $d > R$ không cắt, $d = R$ tiếp tuyến, $d < R$ cát tuyến.
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

💡 **Định lý nội tiếp**: góc nội tiếp = **$\\frac{1}{2}$ góc ở tâm** cùng chắn cung đó.

**Hệ quả quan trọng**:
- Mọi góc nội tiếp chắn cung **nửa đường tròn** (đường kính) đều bằng **$90^\\circ$**.
- Mọi góc nội tiếp cùng chắn 1 cung đều bằng nhau.

> 📐 **Định nghĩa đầy đủ — Định lý góc nội tiếp**
>
> **(a) Là gì**: Quan hệ "1/2" giữa 2 loại góc cùng chắn 1 cung. Góc nội tiếp (đỉnh trên đường tròn) = **một nửa** góc ở tâm (đỉnh tại O) cùng chắn cùng cung đó.
>
> **(b) Vì sao cần**: Vì định lý này cho phép **suy góc** mà không cần đo. Trong nhiều bài hình, ta chỉ biết 1 cung hoặc 1 góc tâm, định lý lập tức cho ra mọi góc nội tiếp tương ứng. Hệ quả nổi tiếng: "góc nội tiếp chắn nửa đường tròn $= 90^\\circ$" — dùng để chứng minh vuông góc mà không cần kiểm tra Pythagore. Cốt lõi của xây dựng đường tròn ngoại tiếp tam giác vuông.
>
> **(c) Ví dụ số**: Đường tròn tâm O, cung AC có góc ở tâm $AOC = 80^\\circ$. Lấy B bất kỳ trên cung lớn → góc $ABC = 80^\\circ/2 =$ **$40^\\circ$**. Lấy B' khác cũng trên cung lớn → góc $AB'C = 40^\\circ$ (bằng ABC). Nếu AC là đường kính ($AOC = 180^\\circ$) → mọi góc $ABC = 90^\\circ$ (kinh điển).

### 4.3. Walk-through chứng minh nhanh

Cho góc nội tiếp ABC chắn cung AC. Vẽ đường kính BD qua tâm O.
- Tam giác OAB cân ($OA = OB = R$) → góc $OAB =$ góc $OBA$.
- Tam giác OCB cân → góc $OCB =$ góc $OBC$.
- Góc $ABC = OBA + OBC$.
- Góc ở tâm $= AOC = AOD + DOC = 2\\cdot OBA + 2\\cdot OBC$ (góc ngoài tam giác cân) $= 2\\cdot ABC$ ✓.

❓ **Câu hỏi tự nhiên của người đọc**

- *"Hai góc nội tiếp cùng chắn 1 cung có bằng nhau không?"* Có — vì đều bằng $\\frac{1}{2}$ góc ở tâm (chung 1 góc tâm). Đây là cơ sở để "dời" góc trong nhiều bài chứng minh.
- *"Vì sao góc chắn đường kính $= 90^\\circ$?"* Vì đường kính có góc ở tâm $= 180^\\circ$ (góc bẹt) → góc nội tiếp $= 180^\\circ/2 = 90^\\circ$. Đây là định lý Thales.
- *"Góc ở tâm và góc nội tiếp phải cùng chắn cung nào?"* Cùng 1 cung. Nếu khác cung thì quan hệ $\\frac{1}{2}$ không áp dụng.

⚠ **Lỗi thường gặp**: lấy góc nội tiếp = góc ở tâm (quên chia 2). Phản ví dụ: cung có góc ở tâm $100^\\circ$ → góc nội tiếp $=$ **$50^\\circ$**, không phải $100^\\circ$. Lỗi ngược: nhân 2 sai chiều — nếu biết góc nội tiếp $30^\\circ$ thì góc ở tâm $= 60^\\circ$ ($\\times 2$), không phải $15^\\circ$.

🔁 **Dừng lại tự kiểm tra**

1. Góc ở tâm chắn cung $AB = 70^\\circ$. Góc nội tiếp chắn cùng cung AB bằng bao nhiêu?
2. AB là đường kính, C trên đường tròn. Góc ACB bằng bao nhiêu?

<details><summary>Đáp án</summary>

1. $70^\\circ/2 =$ **$35^\\circ$**.
2. **$90^\\circ$** (góc nội tiếp chắn đường kính — định lý Thales).

</details>

### 📝 Tóm tắt mục 4

- **Góc ở tâm** (đỉnh tại O) = số đo cung nó chắn.
- **Góc nội tiếp** (đỉnh trên viền) $= \\frac{1}{2}$ góc ở tâm cùng chắn cung đó.
- Hệ quả: góc chắn đường kính $= 90^\\circ$; các góc nội tiếp cùng chắn 1 cung bằng nhau.
- Nhớ chia 2 khi đi từ góc tâm → góc nội tiếp (và nhân 2 khi đi ngược).

---

## 5. Tứ giác nội tiếp

💡 **Trực giác / Hình dung**: không phải tứ giác nào cũng "nhét" được 4 đỉnh lên cùng 1 đường tròn — chỉ những tứ giác "cân đối" mới được. Dấu hiệu nhận biết: 2 góc đối "bù trừ" cho nhau thành $180^\\circ$. Hình dung 2 góc đối như 2 người ngồi đối diện bàn tròn — góc nhìn của họ cộng lại luôn "khép kín" nửa vòng.

**Tứ giác nội tiếp** = tứ giác có **4 đỉnh nằm trên 1 đường tròn**.

**Định lý**: tứ giác nội tiếp có **tổng 2 góc đối nhau $= 180^\\circ$**.

**Vì sao tổng 2 góc đối $= 180^\\circ$?** Góc A chắn cung BCD, góc C chắn cung BAD — 2 cung này ghép thành cả đường tròn (góc tâm tổng $360^\\circ$). Mỗi góc nội tiếp $= \\frac{1}{2}$ cung → $A + C = \\frac{1}{2}\\cdot 360^\\circ = 180^\\circ$. □

**Verify bằng số**: tứ giác nội tiếp có $A = 85^\\circ$, C đối diện → $C = 180 - 85 = 95^\\circ$. Nếu $B = 110^\\circ$ thì $D = 180 - 110 = 70^\\circ$. Kiểm tổng 4 góc: $85+95+110+70 = 360^\\circ$ ✓ (đúng tổng góc tứ giác).

❓ **Câu hỏi tự nhiên của người đọc**

- *"Hình vuông, chữ nhật có nội tiếp được không?"* Có — 2 góc đối đều $90^\\circ$, tổng $180^\\circ$ ✓. Mọi hình chữ nhật đều nội tiếp đường tròn (tâm là giao 2 đường chéo).
- *"Hình bình hành (không vuông) có nội tiếp không?"* Không — 2 góc đối của hình bình hành bằng nhau, tổng $= 2\\cdot$góc $\\neq 180^\\circ$ trừ khi mỗi góc $= 90^\\circ$ (thành chữ nhật).
- *"Dùng để làm gì?"* Chứng minh 4 điểm cùng nằm trên 1 đường tròn (đồng viên) bằng cách chỉ ra tổng 2 góc đối $= 180^\\circ$.

⚠ **Lỗi thường gặp**: nghĩ tổng 2 góc **kề** (không đối) $= 180^\\circ$. Sai — định lý nói 2 góc **đối diện** mới bù nhau. Phản ví dụ: tứ giác nội tiếp $A=85$, $B=110$, $C=95$, $D=70$ — A và C đối ($85+95=180$ ✓), nhưng A và B kề ($85+110=195 \\neq 180$).

🔁 **Dừng lại tự kiểm tra**

1. Tứ giác ABCD nội tiếp, góc $B = 95^\\circ$. Góc D bằng bao nhiêu?
2. Hình thoi (không vuông) có nội tiếp đường tròn được không?

<details><summary>Đáp án</summary>

1. D đối B → $D = 180 - 95 =$ **$85^\\circ$**.
2. Không — 2 góc đối của hình thoi bằng nhau, tổng $\\neq 180^\\circ$ trừ khi là hình vuông.

</details>

### 📝 Tóm tắt mục 5

- Tứ giác nội tiếp = 4 đỉnh cùng nằm trên 1 đường tròn.
- Định lý: tổng 2 góc **đối diện** $= 180^\\circ$ (góc kề thì không).
- Chứng minh dựa trên góc nội tiếp $= \\frac{1}{2}$ cung; 2 cung đối ghép thành cả vòng.
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

⚠ **Lỗi thường gặp**: lẫn "trung trực" (đường tròn ngoại tiếp) với "phân giác" (nội tiếp). Mẹo: ngoạ**i** tiếp ↔ trung trực (đỉnh ở ngoài viền); nộ**i** tiếp ↔ phân giác (chạm cạnh bên trong). Lỗi thứ 2: tưởng $R_\\text{ngoại} = R_\\text{nội}$ — với tam giác đều $R_\\text{ngoại} = 2\\cdot R_\\text{nội}$.

🔁 **Dừng lại tự kiểm tra**

1. Tâm đường tròn ngoại tiếp tam giác **vuông** nằm ở đâu?
2. Tam giác đều có quan hệ gì giữa R ngoại tiếp và r nội tiếp?

<details><summary>Đáp án</summary>

1. Trung điểm cạnh huyền (vì cạnh huyền là đường kính — góc vuông chắn đường kính).
2. $R = 2r$ (bán kính ngoại tiếp gấp đôi nội tiếp).

</details>

### 📝 Tóm tắt mục 6

- **Ngoại tiếp**: đi qua 3 đỉnh; tâm = giao 3 đường **trung trực**; cách đều 3 đỉnh.
- **Nội tiếp**: tiếp xúc 3 cạnh; tâm = giao 3 đường **phân giác**; cách đều 3 cạnh.
- Tâm nội tiếp luôn trong tam giác; tâm ngoại tiếp có thể ra ngoài (tam giác tù).
- Tam giác vuông: tâm ngoại tiếp = trung điểm cạnh huyền. Tam giác đều: $R = 2r$.

---

## 7. Bài tập

### Bài tập

**Bài 1**: Đường tròn $R = 5$ cm. Tính chu vi và diện tích.

**Bài 2**: Cung AB dài $4\\pi$ trên đường tròn $R = 6$. Tính góc ở tâm (radian và độ).

**Bài 3**: Cho tam giác ABC với BC là đường kính đường tròn ngoại tiếp. Chứng minh góc $A = 90^\\circ$.

**Bài 4**: Tứ giác ABCD nội tiếp đường tròn. $A = 70^\\circ$, $C = ?$

**Bài 5**: Tam giác đều cạnh 6. Tính bán kính đường tròn ngoại tiếp và nội tiếp.

### Lời giải

**Bài 1**: $C = 2\\pi\\cdot 5 =$ **$10\\pi \\approx 31.42$ cm**. $S = \\pi\\cdot 25 =$ **$25\\pi \\approx 78.54$ cm²**.

**Bài 2**: Độ dài cung $= R\\cdot\\theta$ (rad) → $\\theta = 4\\pi/6 =$ **$2\\pi/3$ rad** $= 120^\\circ$.

**Bài 3**: BC là đường kính → góc nội tiếp BAC chắn nửa đường tròn → $BAC = 90^\\circ$ (theo định lý nội tiếp + cung nửa $= 180^\\circ$). Đây là **định lý Thales đảo**.

**Bài 4**: Tứ giác nội tiếp: $A + C = 180^\\circ$ → $C =$ **$110^\\circ$**.

**Bài 5**: Tam giác đều cạnh a. 
- $R_\\text{ngoại tiếp} = a/\\sqrt{3} = 6/\\sqrt{3} = 2\\sqrt{3} \\approx$ **3.46**.
- $r_\\text{nội tiếp} = a/(2\\sqrt{3}) = 6/(2\\sqrt{3}) = \\sqrt{3} \\approx$ **1.73** ($R = 2r$ cho tam giác đều).

---

## 8. Bài tiếp theo

[Lesson 04 — Đa giác & Diện tích](../lesson-04-polygons-area/).

## 📝 Tổng kết

1. **Đường tròn**: tập điểm cách tâm 1 khoảng R.
2. **$C = 2\\pi R$, $S = \\pi R^2$**.
3. **Tiếp tuyến** $\\perp$ bán kính tại điểm tiếp xúc.
4. **Góc nội tiếp $= \\frac{1}{2}$ góc ở tâm** cùng chắn cung. Chắn đường kính → $90^\\circ$.
5. **Tứ giác nội tiếp**: 2 góc đối bù nhau.
6. **Ngoại tiếp** = đi qua 3 đỉnh (giao 3 trung trực); **nội tiếp** = tiếp 3 cạnh (giao 3 phân giác).
`;
