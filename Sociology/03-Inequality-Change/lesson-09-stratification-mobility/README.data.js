// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: Sociology/03-Inequality-Change/lesson-09-stratification-mobility/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 09 — Phân tầng & dịch chuyển xã hội (Stratification & Social Mobility)

> Xã hội xếp con người thành các tầng. Câu hỏi lớn: **một đứa trẻ sinh ở tầng dưới có leo lên được không, và mất bao nhiêu thế hệ?** Ta trả lời bằng một công cụ định lượng: **ma trận chuyển tiếp (Markov)**.

## Mục tiêu học tập

- Định nghĩa được **phân tầng xã hội (stratification)**, **giai tầng (class / strata)**, phân biệt **địa vị gán (ascribed)** với **địa vị đạt được (achieved)** — kèm ví dụ số.
- Phân loại **dịch chuyển xã hội (social mobility)**: dọc/ngang, đi lên/xuống, liên thế hệ (intergenerational) vs trong đời (intragenerational).
- Đọc và dùng **ma trận chuyển tiếp giai tầng** $P$: $P_{ij} = $ xác suất con ở tầng $j$ khi cha ở tầng $i$; hiểu vì sao **mỗi hàng cộng lại bằng 1**.
- Nhân phân bố dân cư qua nhiều thế hệ ($v' = v \\cdot P$), thấy nó **hội tụ về phân bố dừng (stationary distribution)**.
- Đo **"độ dính" (immobility / persistence)** so với **xã hội mở**, và giải thích vì sao xã hội dính trộn chậm hơn.

## Kiến thức tiền đề

- Nhân số thập phân, cộng, tỷ lệ phần trăm.
- Nhân vector với ma trận (sẽ nhắc lại đầy đủ bằng số ở mục 4). Nếu muốn ôn: [Vectors — Đại số tuyến tính](../../../Vectors/01-Algebra/).
- Xác suất cơ bản: một hàng xác suất cộng lại bằng 1.

---

## 1. Phân tầng xã hội là gì?

> 💡 **Trực giác.** Hình dung xã hội như một toà nhà nhiều **tầng**. Người ở tầng trên có nhiều hơn về ba thứ: **của cải, quyền lực, uy tín**. "Phân tầng" là việc toà nhà đó *có nhiều tầng phân biệt rõ*, chứ không phải một mặt sàn phẳng ai cũng ngang nhau. Điểm mấu chốt của xã hội học: các tầng này **không ngẫu nhiên** — chúng có khuôn mẫu, được duy trì qua thời gian và **truyền lại cho đời sau**.

### 1.1 Định nghĩa phân tầng xã hội (social stratification)

**(a) Là gì.** Sự sắp xếp con người trong xã hội thành **các lớp (tầng) xếp hạng trên–dưới** theo mức độ tiếp cận nguồn lực khan hiếm — chủ yếu là **thu nhập & tài sản (kinh tế), quyền lực (chính trị), uy tín (danh vọng xã hội)**. "Phân tầng" nhấn mạnh tính **có cấu trúc, bền vững và truyền đời**, khác với chênh lệch nhất thời giữa hai cá nhân.

**(b) Vì sao cần khái niệm này.** Để phân biệt *"An giàu hơn Bình"* (chênh lệch cá nhân, ngẫu nhiên) với *"nhóm X luôn ở dưới nhóm Y qua nhiều thế hệ"* (khuôn mẫu có hệ thống). Xã hội học quan tâm cái thứ hai: khi vị trí của bạn **dự đoán được** từ nhóm bạn sinh ra, đó là phân tầng chứ không phải may rủi.

**(c) Ví dụ số cụ thể** (≥ 4, đa dạng hệ thống):

| # | Hệ thống phân tầng | Số tầng | Con số minh hoạ |
|---|--------------------|:------:|-----------------|
| 1 | Đẳng cấp Ấn Độ (caste) | 4 varna + Dalit | ~200 triệu Dalit ≈ **16%** dân số, địa vị cố định từ khi sinh |
| 2 | Đẳng cấp Pháp trước 1789 | 3 đẳng cấp | Tăng lữ ~**1%**, quý tộc ~**2%**, thường dân ~**97%** — nhưng 3% trên nắm hầu hết ruộng đất |
| 3 | Ngũ phân vị thu nhập hiện đại | 5 nhóm | Mỗi nhóm đúng **20%** dân số; nhóm giàu nhất thường thu **~10×** nhóm nghèo nhất |
| 4 | Thang uy tín nghề (occupational prestige) | thang 0–100 | Bác sĩ ~**86**, giáo viên ~**60**, lao công ~**20** |
| 5 | Apartheid Nam Phi (đến 1994) | 4 nhóm chủng tộc pháp lý | ~**10%** da trắng kiểm soát ~**90%** đất canh tác |

Ba ví dụ đầu là **kinh tế/pháp lý**, ví dụ 4 là **uy tín**, ví dụ 5 là **chủng tộc–chính trị** — phân tầng có nhiều trục.

### 1.2 Giai tầng / giai cấp (class / strata)

**(a) Là gì.** Một **nhóm người chia sẻ vị trí tương tự** trong hệ thống phân tầng — thu nhập, nghề nghiệp, tài sản, học vấn gần nhau. "Giai tầng" (strata) là cách chia trung tính; "giai cấp" (class) mang thêm hàm ý về quan hệ sản xuất (theo Marx) hoặc cơ hội sống (theo Weber).

**(b) Vì sao cần.** Để **gom** hàng triệu cá nhân thành ít nhóm quản lý được, rồi hỏi câu định lượng: *bao nhiêu % ở mỗi nhóm? con của nhóm này rơi vào nhóm nào?* Không gom thành tầng thì không đo được dịch chuyển.

**(c) Ví dụ số cụ thể:**

| # | Mô hình chia giai tầng | Cách chia | Con số |
|---|------------------------|-----------|--------|
| 1 | Mô hình 3 giai cấp (dân dã) | Thượng / Trung / Lao động | VD một nước: thượng lưu ~**5%**, trung lưu ~**50%**, lao động ~**45%** |
| 2 | Marx — 2 giai cấp | Tư sản (sở hữu tư liệu SX) vs vô sản | ~**1%** sở hữu ~**40%** tài sản quốc gia |
| 3 | Ngũ phân vị (quintile) | 5 tầng, mỗi tầng 20% | Q1..Q5, dùng để tính dịch chuyển thu nhập |
| 4 | NS-SEC (Anh) | 8 nhóm theo nghề | Từ "quản lý cấp cao" đến "lao động chưa qua đào tạo" |
| 5 | Lesson này | 3 tầng | **Thấp / Trung / Cao** — dùng xuyên suốt để mô phỏng |

Từ đây, để mô phỏng được, ta cố định **3 giai tầng: Thấp, Trung, Cao**.

> ⚠ **Lỗi thường gặp.** Coi "giai tầng" chỉ là **thu nhập**. Weber chỉ ra phân tầng **đa chiều**: một giáo sư có uy tín cao (status) nhưng thu nhập trung bình; một trùm cờ bạc có tiền nhưng uy tín thấp. Thu nhập, quyền lực, uy tín **không phải lúc nào cũng đi cùng nhau**.

> 🔁 **Dừng lại tự kiểm tra.**
> 1. "Tuần này An trúng số nên giàu hơn Bình" — đây có phải phân tầng xã hội không?
> 2. Vì sao ta cần gom dân số thành tầng thay vì xét từng cá nhân?
>
> <details><summary>Đáp án</summary>
>
> 1. **Không.** Đó là chênh lệch cá nhân, ngẫu nhiên, không có cấu trúc bền vững hay truyền đời. Phân tầng là khuôn mẫu *có hệ thống* giữa các **nhóm**.
> 2. Vì chỉ khi gom thành ít nhóm ta mới đặt được câu hỏi đo được: *"xác suất con của tầng Thấp lên tầng Cao là bao nhiêu?"* — nền tảng của ma trận chuyển tiếp ở mục 4.
> </details>

---

## 2. Địa vị: gán vs đạt được (ascribed vs achieved status)

> 💡 **Trực giác.** Vị trí xã hội của bạn đến từ hai loại "vé": vé **được phát sẵn lúc sinh** (không xin, không đổi được) và vé **tự mua bằng nỗ lực về sau**. Một xã hội càng công bằng về cơ hội thì vị trí cuối cùng càng phụ thuộc vé loại hai, càng ít phụ thuộc vé loại một.

### 2.1 Địa vị gán (ascribed status)

**(a) Là gì.** Vị trí xã hội **gán cho cá nhân từ khi sinh ra hoặc ngoài ý muốn**, không do nỗ lực cá nhân. Cá nhân không chọn và thường không đổi được.

**(b) Vì sao cần.** Để đo phần bất bình đẳng **không phải "lỗi" của cá nhân** — bạn không chọn nơi sinh, giới tính, gia đình. Nếu vị trí cuối đời phần lớn do địa vị gán quyết định → xã hội **đóng**, ít công bằng cơ hội.

**(c) Ví dụ số cụ thể** (≥ 4):

| # | Địa vị gán | Vì sao là "gán" |
|---|-----------|-----------------|
| 1 | Giới tính sinh học khi sinh | Không chọn lúc sinh |
| 2 | Đẳng cấp caste (Ấn Độ) | Sinh trong gia đình caste nào thì thuộc caste đó suốt đời |
| 3 | Con vua → hoàng tử/công chúa | Dòng dõi, không thi cử |
| 4 | Chủng tộc / dân tộc | Xác định lúc sinh |
| 5 | Quốc tịch nơi sinh | Quyết định tập giáo dục, y tế được tiếp cận |

Con số minh hoạ sức nặng của địa vị gán: ở nhiều nước, đứa trẻ sinh trong nhóm **20% giàu nhất** có xác suất **~30–40%** ở lại nhóm giàu nhất khi trưởng thành, trong khi trẻ sinh nhóm nghèo nhất chỉ **~7–10%** vươn tới đó — con số này chính là các ô của ma trận chuyển tiếp mục 4.

### 2.2 Địa vị đạt được (achieved status)

**(a) Là gì.** Vị trí xã hội **giành được nhờ nỗ lực, lựa chọn, năng lực** của cá nhân trong đời — học tập, sự nghiệp, thành tích.

**(b) Vì sao cần.** Đây là phần vị trí xã hội **có thể thay đổi** — nền tảng của dịch chuyển xã hội. Xã hội "mở" (mục 5) là xã hội nơi địa vị đạt được lấn át địa vị gán.

**(c) Ví dụ số cụ thể** (≥ 4):

| # | Địa vị đạt được | Đạt bằng gì |
|---|-----------------|-------------|
| 1 | Bằng đại học | ~4 năm học + thi cử |
| 2 | Chức giám đốc / CEO | Nhiều năm thăng tiến nghề nghiệp |
| 3 | Vô địch thể thao | Luyện tập, thi đấu |
| 4 | Bác sĩ | Đào tạo 6+ năm + chứng chỉ hành nghề |
| 5 | Kết hôn / lập gia đình | Lựa chọn cá nhân |

> ❓ **Câu hỏi tự nhiên của người đọc.**
> - *"Một địa vị có thể vừa gán vừa đạt được không?"* → Thường **trộn cả hai**. Vào được đại học top (đạt được) nhưng gia đình giàu cho học thêm, trường tốt (gán) làm tăng cơ hội. Thực tế địa vị đạt được **bị nhuốm** bởi địa vị gán — đó chính là "độ dính" ở mục 5.
> - *"Xã hội hiện đại đã hết địa vị gán chưa?"* → Chưa. Lý tưởng "chỉ tính năng lực" (meritocracy) là mục tiêu, không phải hiện thực: nơi sinh, tài sản gia đình vẫn dự đoán mạnh vị trí cuối đời.

> ⚠ **Lỗi thường gặp.** Nghĩ rằng chỉ cần "cố gắng" là chuyển tầng được, phủ nhận vai trò địa vị gán. Số liệu dịch chuyển cho thấy điều ngược lại: con nhà nghèo phải nỗ lực **nhiều hơn nhiều** để đạt cùng vị trí — vì điểm xuất phát khác nhau.

> 🔁 **Dừng lại tự kiểm tra.** Phân loại: (a) là con trưởng dòng họ; (b) đỗ thủ khoa; (c) sinh ra ở quốc gia giàu; (d) được thăng trưởng phòng.
>
> <details><summary>Đáp án</summary>
>
> Gán: (a), (c). Đạt được: (b), (d). Lưu ý (b) và (d) vẫn chịu ảnh hưởng của địa vị gán (gia đình, trường lớp) — thực tế là hỗn hợp.
> </details>

---

## 3. Dịch chuyển xã hội (social mobility)

> 💡 **Trực giác.** Dịch chuyển là **sự di chuyển giữa các tầng của toà nhà xã hội**. Câu hỏi cốt lõi: đứa con kết thúc ở **tầng cao hơn, thấp hơn, hay cùng tầng** với cha mẹ? Nếu ai cũng ở nguyên tầng của cha → xã hội **cứng như bê tông**. Nếu vị trí con gần như độc lập với cha → xã hội **linh động**.

### 3.1 Định nghĩa

**(a) Là gì.** Sự thay đổi vị trí của một cá nhân hoặc nhóm giữa các tầng trong hệ thống phân tầng.

**(b) Vì sao cần.** Để đo **mức độ mở** của một xã hội: cơ hội có được phân bổ theo năng lực hay bị khoá bởi xuất thân? Đây là thước đo trung tâm của công bằng cơ hội.

### 3.2 Các loại dịch chuyển

**(c) Ví dụ số cụ thể** — dùng 3 tầng **Thấp(1) < Trung(2) < Cao(3)**:

| # | Loại | Định nghĩa | Ví dụ số |
|---|------|-----------|----------|
| 1 | **Dọc lên** (upward vertical) | Lên tầng cao hơn | Cha tầng Thấp(1) → con tầng Cao(3): **+2 bậc** |
| 2 | **Dọc xuống** (downward vertical) | Xuống tầng thấp hơn | Cha Cao(3) → con Trung(2): **−1 bậc** |
| 3 | **Ngang** (horizontal) | Đổi vị trí, **cùng tầng** | Giáo viên → nhà báo, cùng uy tín ~60: **0 bậc** |
| 4 | **Liên thế hệ** (intergenerational) | So **cha** với **con** | Cha Trung → con Cao: đo bằng ma trận $P$ ở mục 4 |
| 5 | **Trong đời / nội thế hệ** (intragenerational) | Một người trong **sự nghiệp của mình** | Nhân viên(1) năm 25 tuổi → quản lý(2) năm 40: **+1 bậc** |
| 6 | **Cấu trúc** (structural) | Cả xã hội dịch lên/xuống do nền kinh tế đổi | Công nghiệp hoá: nông dân → công nhân nhà máy hàng loạt |

> ❓ **Câu hỏi tự nhiên của người đọc.**
> - *"Dịch chuyển cấu trúc khác gì dịch chuyển cá nhân?"* → Cấu trúc là do **cái thang đổi** (thêm nhiều việc tầng trên vì kinh tế phát triển), ai cũng được nâng — không phải do một người vượt người khác. Dịch chuyển **thuần trao đổi** (exchange mobility) mới là "người này lên thì người kia xuống".
> - *"Lesson này đo loại nào?"* → Chủ yếu **liên thế hệ** (cha → con), vì đó là loại mô hình hoá gọn nhất bằng ma trận chuyển tiếp.

> ⚠ **Lỗi thường gặp.** Thấy nhiều người "đổi đời" liền kết luận xã hội rất mở. Cần tách: phần lớn có thể là **dịch chuyển cấu trúc** (kinh tế lớn lên kéo mọi người lên) chứ không phải cơ hội được san bằng. Đo độ mở thật phải nhìn **xác suất con nhà nghèo vượt lên**, tức các ô ma trận, không nhìn số tuyệt đối.

> 📝 **Tóm tắt mục 1–3.**
> - **Phân tầng**: xã hội xếp thành tầng trên–dưới theo của cải/quyền lực/uy tín, có cấu trúc & truyền đời.
> - **Giai tầng**: nhóm cùng vị trí; ta cố định 3 tầng Thấp/Trung/Cao.
> - **Địa vị gán** (từ lúc sinh) vs **đạt được** (do nỗ lực); xã hội mở = đạt được lấn át gán.
> - **Dịch chuyển**: dọc (lên/xuống), ngang, liên thế hệ, trong đời, cấu trúc.

---

## 4. Ma trận chuyển tiếp giai tầng (transition matrix — Markov)

> 💡 **Trực giác.** Ta cần một bảng trả lời đúng một câu: *"Cha ở tầng nào thì con có bao nhiêu % rơi vào từng tầng?"* Bảng đó là **ma trận chuyển tiếp** $P$. Đọc theo **hàng**: chọn hàng = tầng của cha, các số trên hàng đó = xác suất con vào Thấp / Trung / Cao. Vì con **chắc chắn** rơi vào *một* tầng nào đó nên các số trên một hàng **cộng lại đúng bằng 1** — đó là toàn bộ "phép màu" giữ mọi thứ nhất quán.

### 4.1 Định nghĩa ma trận chuyển tiếp

**(a) Là gì.** Bảng vuông $P$ kích thước $n \\times n$ (ở đây $n=3$ tầng), trong đó

$$P_{ij} = \\Pr(\\text{con ở tầng } j \\mid \\text{cha ở tầng } i).$$

Hàng $i$ = tầng của **cha**; cột $j$ = tầng của **con**.

**(b) Vì sao cần.** Nó nén toàn bộ "luật di truyền vị trí xã hội" của một xã hội vào $n^2$ con số. Từ đó ta **tính** được tương lai: cho phân bố dân cư hôm nay, dự báo phân bố đời sau — không cần theo dõi từng gia đình.

**(c) Ví dụ số cụ thể — ma trận "xã hội dính"** (dùng suốt lesson):

$$P = \\begin{pmatrix} 0.70 & 0.25 & 0.05 \\\\ 0.20 & 0.60 & 0.20 \\\\ 0.05 & 0.25 & 0.70 \\end{pmatrix} \\begin{matrix} \\leftarrow \\text{cha Thấp} \\\\ \\leftarrow \\text{cha Trung} \\\\ \\leftarrow \\text{cha Cao} \\end{matrix}$$

Đọc vài ô:

- $P_{11} = 0.70$: cha Thấp thì **70%** con vẫn Thấp.
- $P_{13} = 0.05$: cha Thấp thì chỉ **5%** con lên Cao.
- $P_{31} = 0.05$: cha Cao thì chỉ **5%** con rớt xuống Thấp.
- $P_{22} = 0.60$: cha Trung thì **60%** con ở Trung.

Đường chéo cao (0.70, 0.60, 0.70) → "con giống cha" là kịch bản phổ biến → **dính**.

### 4.2 Tính chất bắt buộc: mỗi hàng cộng bằng 1 (row-stochastic)

Với **mỗi** tầng cha $i$, con phải rơi vào **một** trong các tầng, nên:

$$\\sum_{j} P_{ij} = 1 \\quad \\text{cho mọi hàng } i.$$

Kiểm tra ma trận trên **từng hàng**:

$$\\begin{aligned}
\\text{Hàng Thấp:}\\ & 0.70 + 0.25 + 0.05 = 1.00 \\ \\checkmark \\\\
\\text{Hàng Trung:}\\ & 0.20 + 0.60 + 0.20 = 1.00 \\ \\checkmark \\\\
\\text{Hàng Cao:}\\ & 0.05 + 0.25 + 0.70 = 1.00 \\ \\checkmark
\\end{aligned}$$

Ma trận có tính chất này gọi là **ma trận ngẫu nhiên theo hàng (row-stochastic)**. Trong viz, mọi giá trị bạn nhập sẽ được **tự chuẩn hoá** về tổng hàng = 1 (chia mỗi ô cho tổng hàng), nên bạn không cần nhập chính xác — nhập tỷ lệ là đủ.

> ⚠ **Lỗi thường gặp.** Nhầm hàng với cột, hoặc bắt **cột** cộng bằng 1. Chỉ **hàng** cộng bằng 1. Cột cộng bằng 1 mang ý nghĩa khác (và nói chung **không** đúng): $P_{ij}$ là xác suất *có điều kiện theo cha*, nên phải chuẩn hoá theo cha (theo hàng).

### 4.3 Cập nhật phân bố qua một thế hệ: $v' = v \\cdot P$

Gọi $v = (v_1, v_2, v_3)$ là **phân bố dân cư hiện tại** — tỷ lệ dân ở mỗi tầng, với $v_1+v_2+v_3 = 1$. Phân bố đời con là **vector nhân ma trận**:

$$v'_j = \\sum_i v_i \\, P_{ij}, \\qquad \\text{hay gọn: } v' = v \\cdot P.$$

**Vì sao đúng (từng bước, không "dễ thấy"):** số con rơi vào tầng $j$ = tổng, trên mọi tầng cha $i$, của (tỷ lệ cha ở tầng $i$) × (xác suất cha $i$ sinh con tầng $j$). Đó đúng là $\\sum_i v_i P_{ij}$.

**Walk-through số** — bắt đầu từ xã hội nghèo: $v^{(0)} = (0.60,\\ 0.30,\\ 0.10)$ (60% Thấp, 30% Trung, 10% Cao).

$$\\begin{aligned}
v^{(1)}_{\\text{Thấp}} &= 0.60(0.70) + 0.30(0.20) + 0.10(0.05) = 0.42 + 0.06 + 0.005 = 0.485 \\\\
v^{(1)}_{\\text{Trung}} &= 0.60(0.25) + 0.30(0.60) + 0.10(0.25) = 0.15 + 0.18 + 0.025 = 0.355 \\\\
v^{(1)}_{\\text{Cao}} &= 0.60(0.05) + 0.30(0.20) + 0.10(0.70) = 0.03 + 0.06 + 0.07 = 0.160
\\end{aligned}$$

Tổng kiểm tra: $0.485 + 0.355 + 0.160 = 1.000\\ \\checkmark$ — **phân bố mới vẫn cộng bằng 1**.

> ❓ *"Vì sao $v'$ tự động cộng bằng 1?"* Vì mỗi hàng của $P$ cộng bằng 1:
> $$\\sum_j v'_j = \\sum_j \\sum_i v_i P_{ij} = \\sum_i v_i \\underbrace{\\sum_j P_{ij}}_{=\\,1} = \\sum_i v_i = 1.$$
> Dân số không tự sinh ra hay biến mất khi sang thế hệ mới — nó chỉ **được phân bố lại** giữa các tầng.

> 🔁 **Dừng lại tự kiểm tra.** Với cùng $P$ trên và $v^{(0)} = (1, 0, 0)$ (cả xã hội khởi đầu ở Thấp), tính $v^{(1)}$.
>
> <details><summary>Đáp án</summary>
>
> $v^{(1)} = (1{\\cdot}0.70,\\ 1{\\cdot}0.25,\\ 1{\\cdot}0.05) = (0.70,\\ 0.25,\\ 0.05)$ — đúng bằng **hàng Thấp** của $P$. Tổng $= 1\\ \\checkmark$. Trực giác: nếu tất cả cha đều Thấp thì phân bố con chính là hàng "cha Thấp".
> </details>

---

## 5. "Độ dính" vs xã hội mở

> 💡 **Trực giác.** Đường chéo của $P$ = "xác suất con ở nguyên tầng cha". Đường chéo càng **to** → xã hội càng **dính** (con mắc kẹt ở tầng của cha). Đường chéo càng **nhỏ / các ô càng đều nhau** → xã hội càng **mở** (tầng của con gần như độc lập với cha).

### 5.1 Hai thái cực

**Xã hội dính (sticky / high persistence)** — ma trận $P$ ở mục 4, đường chéo $\\{0.70, 0.60, 0.70\\}$: con nhà Thấp có 70% ở lại Thấp, chỉ 5% chạm tới Cao.

**Xã hội mở (open / high mixing)** — các hàng gần giống nhau, tầng con gần như không phụ thuộc cha:

$$O = \\begin{pmatrix} 0.40 & 0.35 & 0.25 \\\\ 0.33 & 0.34 & 0.33 \\\\ 0.25 & 0.35 & 0.40 \\end{pmatrix}, \\quad \\text{mỗi hàng vẫn cộng } = 1.$$

Ở $O$, con nhà Thấp có **25%** lên Cao (so với chỉ 5% ở xã hội dính) — cơ hội gấp **5 lần**.

### 5.2 Đo tốc độ trộn bằng số

Một cách đo "độ dính" chặt chẽ: **giá trị riêng lớn thứ hai** $\\lambda_2$ của $P$ (trị tuyệt đối). Mỗi thế hệ, khoảng cách từ phân bố hiện tại tới phân bố dừng co lại theo hệ số $\\approx \\lambda_2$.

| | Xã hội dính $P$ | Xã hội mở $O$ |
|---|:---:|:---:|
| Giá trị riêng | $1,\\ \\mathbf{0.65},\\ 0.35$ | $1,\\ \\mathbf{0.15},\\ -0.01$ |
| $\\lambda_2$ (tốc độ dính) | **0.65** | **0.15** |
| Mỗi thế hệ, khoảng cách còn lại | 65% | 15% |
| Sau 5 thế hệ còn | $0.65^5 \\approx 0.116$ (**11.6%**) | $0.15^5 \\approx 0.00008$ (**~0%**) |

Ý nghĩa: xã hội mở gần như **trộn xong sau 3–4 thế hệ**; xã hội dính vẫn còn lệch **~12%** sau 5 thế hệ. $\\lambda_2$ nhỏ = trộn nhanh = mở; $\\lambda_2$ gần 1 = trộn chậm = dính.

> ⚠ **Lỗi thường gặp.** Nghĩ "tăng cơ hội một chút là xã hội mở hẳn". Thực ra tốc độ hội tụ phụ thuộc $\\lambda_2$ theo **luỹ thừa**: giảm $\\lambda_2$ từ 0.65 xuống 0.35 rút ngắn thời gian trộn rất nhiều, nhưng chỉ nới nhẹ đường chéo thì $\\lambda_2$ hầu như không đổi — "độ dính" rất lì.

---

## 6. Phân bố dừng (stationary distribution)

> 💡 **Trực giác.** Nếu cứ nhân $v \\cdot P$ mãi qua nhiều thế hệ, phân bố dân cư sẽ **ngừng thay đổi** — chạm tới một phân bố cân bằng mà thế hệ sau giống hệt thế hệ trước. Đó là **"vân tay dài hạn" của xã hội**: bất kể khởi đầu giàu hay nghèo, sau đủ nhiều đời, tỷ lệ các tầng do **chính ma trận $P$** quyết định, không phải do điểm xuất phát.

### 6.1 Định nghĩa

**(a) Là gì.** Phân bố $\\pi = (\\pi_1, \\pi_2, \\pi_3)$ thoả **hai** điều kiện:

$$\\pi \\cdot P = \\pi \\qquad \\text{và} \\qquad \\pi_1 + \\pi_2 + \\pi_3 = 1.$$

Nghĩa là: đưa $\\pi$ qua một thế hệ nữa vẫn ra $\\pi$ — phân bố **đứng yên (dừng)**.

**(b) Vì sao cần.** Nó trả lời câu hỏi dài hạn: *"Nếu luật dịch chuyển này giữ nguyên mãi, xã hội cuối cùng trông thế nào?"* Và (với chuỗi "trộn tốt") $\\pi$ **không phụ thuộc điểm xuất phát** — nên nó là đặc trưng của **hệ thống**, không phải của lịch sử ban đầu.

**(c) Ví dụ số cụ thể — tính $\\pi$ cho $P$ dính.** Vì $P$ đối xứng khi hoán đổi Thấp↔Cao, đoán $\\pi_1 = \\pi_3 = a$, $\\pi_2 = b$. Từ $\\pi P = \\pi$ tại cột Thấp:

$$a = 0.70a + 0.20b + 0.05a \\;\\Rightarrow\\; a = 0.75a + 0.20b \\;\\Rightarrow\\; 0.25a = 0.20b \\;\\Rightarrow\\; b = 1.25a.$$

Kết hợp $a + b + a = 1$: $\\;2a + 1.25a = 1 \\Rightarrow 3.25a = 1 \\Rightarrow a = \\tfrac{4}{13} \\approx 0.3077,\\ b = \\tfrac{5}{13} \\approx 0.3846.$

$$\\boxed{\\ \\pi = \\left(\\tfrac{4}{13},\\ \\tfrac{5}{13},\\ \\tfrac{4}{13}\\right) \\approx (0.308,\\ 0.385,\\ 0.308)\\ }$$

**Kiểm tra $\\pi P = \\pi$** (cột Trung): $0.3077(0.25) + 0.3846(0.60) + 0.3077(0.25) = 0.0769 + 0.2308 + 0.0769 = 0.3846 = \\pi_2\\ \\checkmark$. Tổng $0.308+0.385+0.308 = 1\\ \\checkmark$.

### 6.2 Walk-through: nhân phân bố qua nhiều thế hệ → hội tụ

Bắt đầu từ xã hội rất nghèo $v^{(0)} = (0.60, 0.30, 0.10)$, nhân liên tiếp với $P$ (dính):

| Thế hệ | Thấp | Trung | Cao | Tổng | Khoảng cách tới $\\pi$ (L1) |
|:------:|-----:|------:|----:|:----:|:--:|
| 0 | 0.600 | 0.300 | 0.100 | 1.000 | 0.585 |
| 1 | 0.485 | 0.355 | 0.160 | 1.000 | 0.355 |
| 2 | 0.419 | 0.374 | 0.207 | 1.000 | 0.222 |
| 3 | 0.378 | 0.381 | 0.241 | 1.000 | 0.141 |
| 4 | 0.353 | 0.383 | 0.264 | 1.000 | 0.090 |
| 5 | 0.337 | 0.384 | 0.279 | 1.000 | 0.058 |
| $\\infty$ | **0.308** | **0.385** | **0.308** | 1.000 | 0 |

Nhận xét:

1. **Mọi hàng luôn cộng bằng 1** — dân số bảo toàn.
2. Phân bố **bò dần** về $\\pi = (0.308, 0.385, 0.308)$ — tầng Thấp tụt từ 60% xuống ~31%, tầng Cao leo từ 10% lên ~31%.
3. Cột cuối: khoảng cách tới $\\pi$ giảm mỗi thế hệ theo hệ số $\\approx 0.63$–$0.65$ ($0.355/0.585 \\approx 0.61$; $0.222/0.355 \\approx 0.63$; $0.141/0.222 \\approx 0.64 \\to \\lambda_2 = 0.65$) — đúng như mục 5.2 dự đoán.

> ❓ **Câu hỏi tự nhiên của người đọc.**
> - *"Đổi điểm xuất phát thì $\\pi$ có đổi không?"* → **Không** (với chuỗi trộn tốt như đây). Thử $v^{(0)} = (0.1, 0.1, 0.8)$ hay $(1,0,0)$ đều hội tụ về cùng $\\pi = (0.308, 0.385, 0.308)$. Hãy tự kiểm bằng viz. Đây là tính chất "quên điểm xuất phát" của chuỗi Markov.
> - *"Xã hội mở $O$ có $\\pi$ khác không?"* → Có, $\\pi_O \\approx (0.327, 0.347, 0.327)$ — **gần đều hơn** (sát $1/3$ mỗi tầng). Xã hội càng mở, phân bố dừng càng cân bằng.
> - *"Bao nhiêu thế hệ thì coi như hội tụ?"* → Với $P$ dính ($\\lambda_2 = 0.65$): ~10 thế hệ (khoảng cách $0.65^{10} \\approx 1.3\\%$). Với $O$ mở ($\\lambda_2 = 0.15$): 2–3 thế hệ là gần như xong.

> 🔁 **Dừng lại tự kiểm tra.** Không tính chi tiết, chỉ trả lời định tính: nếu ta **tăng** đường chéo của $P$ (làm xã hội dính hơn), $\\pi$ và **tốc độ** hội tụ thay đổi ra sao?
>
> <details><summary>Đáp án</summary>
>
> $\\pi$ có thể đổi chút ít, nhưng thay đổi lớn là ở **tốc độ**: đường chéo to hơn → $\\lambda_2$ gần 1 hơn → hội tụ **chậm hơn nhiều**, xã hội "nhớ" điểm xuất phát lâu hơn (bất bình đẳng ban đầu tồn tại qua nhiều thế hệ hơn).
> </details>

> 📝 **Tóm tắt mục 4–6.**
> - $P_{ij} = \\Pr(\\text{con } j \\mid \\text{cha } i)$; đọc theo **hàng**; **mỗi hàng cộng bằng 1** (row-stochastic).
> - Một thế hệ: $v' = v \\cdot P$; nếu $\\sum v = 1$ thì $\\sum v' = 1$ (dân số bảo toàn).
> - Đường chéo to = **dính**; giá trị riêng thứ hai $\\lambda_2$ đo tốc độ trộn ($\\lambda_2$ gần 1 = trộn chậm = dính).
> - **Phân bố dừng** $\\pi$: $\\pi P = \\pi$, $\\sum \\pi = 1$; nhân $v$ mãi sẽ hội tụ về $\\pi$, độc lập điểm xuất phát.

---

## 7. Bài tập

**Bài 1 (hàng cộng bằng 1).** Điền ô còn thiếu để mỗi hàng của ma trận chuyển tiếp cộng bằng 1:

$$\\begin{pmatrix} 0.60 & ? & 0.10 \\\\ 0.20 & 0.50 & ? \\\\ ? & 0.20 & 0.75 \\end{pmatrix}$$

**Bài 2 (một thế hệ).** Cho $P$ dính ở mục 4 và phân bố khởi đầu $v^{(0)} = (0.50,\\ 0.40,\\ 0.10)$. Tính $v^{(1)} = v^{(0)} \\cdot P$ và xác nhận tổng bằng 1.

**Bài 3 (phân bố dừng 2 tầng).** Một xã hội chỉ có 2 tầng {Thấp, Cao} với ma trận

$$Q = \\begin{pmatrix} 0.90 & 0.10 \\\\ 0.40 & 0.60 \\end{pmatrix}.$$

Tìm phân bố dừng $\\pi = (\\pi_L, \\pi_C)$.

**Bài 4 (dính qua hai đời).** Với $P$ dính ở mục 4, tính xác suất một **cháu** ở tầng Thấp khi **ông** ở tầng Thấp — tức ô $[\\text{Thấp}][\\text{Thấp}]$ của ma trận hai thế hệ $P^2$. So sánh với xác suất một đời $P_{11} = 0.70$ và giải thích.

---

## 8. Lời giải chi tiết

**Bài 1.** Mỗi ô thiếu = $1 -$ (tổng hai ô còn lại của hàng):

- Hàng 1: $? = 1 - 0.60 - 0.10 = \\mathbf{0.30}$.
- Hàng 2: $? = 1 - 0.20 - 0.50 = \\mathbf{0.30}$.
- Hàng 3: $? = 1 - 0.20 - 0.75 = \\mathbf{0.05}$.

Ma trận đầy đủ: $\\begin{pmatrix} 0.60 & 0.30 & 0.10 \\\\ 0.20 & 0.50 & 0.30 \\\\ 0.05 & 0.20 & 0.75 \\end{pmatrix}$. Kiểm tra 3 hàng đều $= 1\\ \\checkmark$.

**Bài 2.** Cách tiếp cận: mỗi thành phần $v'_j = \\sum_i v_i P_{ij}$ (nhân theo cột của $P$):

$$\\begin{aligned}
v^{(1)}_{\\text{Thấp}} &= 0.50(0.70) + 0.40(0.20) + 0.10(0.05) = 0.350 + 0.080 + 0.005 = \\mathbf{0.435} \\\\
v^{(1)}_{\\text{Trung}} &= 0.50(0.25) + 0.40(0.60) + 0.10(0.25) = 0.125 + 0.240 + 0.025 = \\mathbf{0.390} \\\\
v^{(1)}_{\\text{Cao}} &= 0.50(0.05) + 0.40(0.20) + 0.10(0.70) = 0.025 + 0.080 + 0.070 = \\mathbf{0.175}
\\end{aligned}$$

Tổng: $0.435 + 0.390 + 0.175 = 1.000\\ \\checkmark$. Tầng Thấp tụt từ 0.50 → 0.435, tầng Cao nhích 0.10 → 0.175: xã hội đang chậm rãi mở lên trên.

**Bài 3.** Cách tiếp cận: giải hệ $\\pi Q = \\pi$ với $\\pi_L + \\pi_C = 1$. Viết phương trình cột Thấp:

$$\\pi_L = 0.90\\,\\pi_L + 0.40\\,\\pi_C.$$

Thay $\\pi_C = 1 - \\pi_L$:

$$\\pi_L = 0.90\\,\\pi_L + 0.40(1 - \\pi_L) = 0.90\\pi_L + 0.40 - 0.40\\pi_L = 0.50\\pi_L + 0.40.$$

$$\\Rightarrow 0.50\\,\\pi_L = 0.40 \\Rightarrow \\pi_L = \\mathbf{0.80},\\quad \\pi_C = \\mathbf{0.20}.$$

Kiểm tra $\\pi Q = \\pi$: $(0.80{\\cdot}0.90 + 0.20{\\cdot}0.40,\\ 0.80{\\cdot}0.10 + 0.20{\\cdot}0.60) = (0.72+0.08,\\ 0.08+0.12) = (0.80, 0.20)\\ \\checkmark$. Diễn giải: đường chéo Thấp rất cao (0.90) → xã hội dính về phía dưới → dài hạn 80% dân ở tầng Thấp.

**Bài 4.** Cách tiếp cận: $P^2_{11} = $ hàng 1 của $P$ nhân cột 1 của $P$ (đi hai bước Thấp→?→Thấp, cộng mọi tầng trung gian):

$$P^2_{11} = P_{11}P_{11} + P_{12}P_{21} + P_{13}P_{31} = 0.70(0.70) + 0.25(0.20) + 0.05(0.05).$$

$$= 0.4900 + 0.0500 + 0.0025 = \\mathbf{0.5425}.$$

So sánh: một đời $P_{11} = 0.70$; hai đời $P^2_{11} = 0.5425 < 0.70$. Giải thích: mỗi thế hệ có cơ hội "thoát" khỏi tầng Thấp, nên qua hai đời xác suất còn kẹt lại giảm dần — và sẽ tiếp tục giảm về $\\pi_{\\text{Thấp}} = 0.308$ khi số đời tiến ra vô cùng. Dù vậy 54% cháu vẫn ở Thấp cho thấy "độ dính" liên thế hệ rất mạnh: nghèo có xu hướng truyền qua nhiều đời.

> 📝 **Tóm tắt bài học.**
> - Phân tầng = xã hội xếp thành các tầng trên–dưới có cấu trúc & truyền đời; ta mô hình bằng **3 tầng Thấp/Trung/Cao**.
> - Địa vị **gán** (lúc sinh) vs **đạt được** (nỗ lực); dịch chuyển gồm dọc/ngang, lên/xuống, liên thế hệ & trong đời.
> - **Ma trận chuyển tiếp** $P$: $P_{ij} = \\Pr(\\text{con } j \\mid \\text{cha } i)$, **mỗi hàng cộng bằng 1**.
> - Một thế hệ: $v' = v \\cdot P$ (bảo toàn dân số); lặp mãi → **phân bố dừng** $\\pi$ với $\\pi P = \\pi$, độc lập điểm xuất phát.
> - **Độ dính** đo bằng đường chéo cao & $\\lambda_2$ gần 1 (trộn chậm); **xã hội mở** có $\\lambda_2$ nhỏ (trộn nhanh, $\\pi$ gần đều).

---

## Bài tiếp theo

**Lesson 10 — Bất bình đẳng: Gini & đường cong Lorenz** [→](../lesson-10-inequality-gini-lorenz/): sau khi biết xã hội **có** các tầng và **dịch chuyển** giữa chúng, ta đo **mức độ chênh lệch** giữa các tầng bằng đường cong Lorenz và hệ số Gini — biến "bất bình đẳng" thành một con số từ 0 đến 1.

Minh hoạ tương tác: [visualization.html](./visualization.html) — nhập ma trận chuyển tiếp (tự chuẩn hoá hàng = 1), mô phỏng phân bố dân cư qua nhiều thế hệ, xem nó hội tụ về phân bố dừng; đổi giữa preset "xã hội dính" và "xã hội mở" để so sánh tốc độ trộn.
`;
