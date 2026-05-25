// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: Economics/Tier1-Foundations/lesson-05-market-failures/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 05 — Market Failures

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Hiểu **khi nào thị trường tự do thất bại** — không tối ưu phúc lợi như định lý phúc lợi thứ nhất nói.
- Phân biệt 4 loại thất bại chính: **externality** (ngoại ứng), **public goods** (hàng hóa công), **asymmetric information** (thông tin bất cân xứng), **common-pool resources** (tài sản chung).
- Tính toán được **chênh lệch giữa lợi ích cá nhân (private) và xã hội (social)** trong các trường hợp externality.
- Hiểu được các công cụ chính sách: thuế Pigou, trợ giá, mệnh lệnh - kiểm soát, quyền sở hữu (Coase theorem).
- Áp dụng **Coase theorem** — khi nào thị trường tự giải quyết được externality mà không cần chính phủ.

## Kiến thức tiền đề

- [Lesson 02-04](../lesson-02-supply-demand/): cung-cầu, thặng dư, DWL.
- Khái niệm "cân bằng tối ưu phúc lợi" (Lesson 04 §3).

## 1. Khi nào thị trường thất bại?

### 1.1. Hồi tưởng First Welfare Theorem

Trong Lesson 04, ta thấy thị trường cạnh tranh tự do **tối đa hóa tổng phúc lợi \`W = CS + PS\`**. Nhưng định lý này dựa trên một loạt *giả định*:

1. Người mua + người bán đều *trả/nhận* toàn bộ lợi ích / chi phí của giao dịch (không có *ngoại ứng* lên người ngoài).
2. Hàng hóa có thể *loại trừ* (chỉ ai trả tiền mới được dùng) và *cạnh tranh* (một người dùng → người khác mất phần).
3. Mọi bên đều có *thông tin đầy đủ* về hàng hóa.
4. Có nhiều người mua + nhiều người bán, không ai có *quyền lực thị trường*.

Khi 1+ giả định bị vi phạm → **market failure** → cân bằng thị trường không tối ưu phúc lợi.

#### 💡 Trực giác

Hình dung một nhà máy xả thải ra sông. Người bán + người mua tính chi phí - giá thông thường. Nhưng có một bên thứ 3 (người dân hạ nguồn) chịu hậu quả mà *không có giọng nói* trong giao dịch. Thị trường tự do quyết định sản xuất bao nhiêu mà bỏ qua người này → lượng sản xuất *vượt mức tối ưu xã hội*.

### 1.2. 4 loại thất bại chính

| Loại | Đặc trưng | Ví dụ |
|------|-----------|-------|
| Externality | Bên thứ 3 chịu lợi/hại | Ô nhiễm, tiêm vắc-xin, giáo dục |
| Public goods | Không loại trừ + không cạnh tranh | Quốc phòng, ánh sáng đèn đường, pháo hoa |
| Asymmetric info | Một bên biết nhiều hơn bên kia | Xe cũ (lemon market), bảo hiểm sức khỏe |
| Common-pool | Cạnh tranh + không loại trừ | Cá biển, rừng chung, không khí sạch |

## 2. Externality (Ngoại ứng)

### 2.1. Định nghĩa và phân loại

**Externality** = lợi ích hoặc chi phí *rơi vào bên thứ 3* không tham gia giao dịch.

- **Externality tiêu cực (negative)**: gây hại cho bên thứ 3. Vd: ô nhiễm, ồn, ùn tắc giao thông.
- **Externality tích cực (positive)**: tạo lợi cho bên thứ 3. Vd: vắc-xin (bạn tiêm → người xung quanh ít lây), giáo dục (xã hội văn minh hơn), nghiên cứu khoa học (kiến thức công).

### 2.2. Cơ chế gây mất hiệu quả

Định nghĩa 4 đại lượng:

- **MPC** (Marginal Private Cost) = chi phí biên của *người sản xuất*.
- **MSC** (Marginal Social Cost) = chi phí biên *toàn xã hội* = MPC + chi phí externality.
- **MPB** (Marginal Private Benefit) = lợi ích biên của *người mua*.
- **MSB** (Marginal Social Benefit) = lợi ích biên toàn xã hội.

**Cân bằng thị trường**: \`MPC = MPB\`.
**Cân bằng tối ưu xã hội**: \`MSC = MSB\`.

Khi có externality → hai cân bằng *lệch nhau* → DWL.

### 2.3. Walk-through — Nhà máy gây ô nhiễm

Một nhà máy sản xuất thép. Mỗi tấn thép có:

- Chi phí sản xuất (MPC) = \`100\`.
- Chi phí ô nhiễm gây ra cho cộng đồng (external cost) = \`30\`.
- → MSC = \`100 + 30 = 130\`.
- MPB = MSB = đường cầu của thép (giả sử không có externality bên cầu).

Giả sử cầu cho thép: \`P = 200 − Q\`.

- **Cân bằng thị trường**: \`MPC = MPB\` → \`100 = 200 − Q\` → \`Q_market = 100\`.
- **Cân bằng tối ưu xã hội**: \`MSC = MSB\` → \`130 = 200 − Q\` → \`Q_optimal = 70\`.

→ Thị trường sản xuất **30 tấn thừa** so với mức tối ưu xã hội. Mỗi tấn thừa gây thiệt hại \`(MSC − MPB)\` cho xã hội.

**DWL của externality**: tam giác giữa MSC và MPB từ \`Q_optimal\` đến \`Q_market\`:

\`\`\`
DWL = 0.5 × (Q_market − Q_optimal) × (MSC − MPB tại Q_market)
    = 0.5 × 30 × 30 = 450
\`\`\`

### 2.4. Công cụ chính sách cho externality

#### a) Thuế Pigou (Pigouvian tax)

Đánh thuế \`T = external cost\` lên người gây externality tiêu cực. Hiệu ứng: MPC tăng lên *bằng* MSC → cân bằng mới = cân bằng xã hội tối ưu.

Walk-through ví dụ: thuế \`T = 30/tấn\` lên nhà máy thép. MPC mới = \`130 = MSC\`. Cân bằng mới \`Q = 70 = Q_optimal\`. **DWL = 0**.

**Hệ quả**: thuế Pigou *không gây DWL*, ngược lại nó *xoá DWL của externality*. Đây là khác biệt cốt lõi với thuế thông thường.

Ví dụ thực: thuế carbon, thuế xăng, thuế thuốc lá (nếu xem hút thuốc thụ động là externality).

#### b) Trợ cấp cho externality tích cực

Vắc-xin tạo externality tích cực → MSB > MPB. Thị trường tự do sẽ tiêm *ít hơn tối ưu xã hội*. Chính phủ trợ cấp \`S = external benefit\` → cân bằng dịch lên đúng mức.

Vd: tiêm vắc-xin sởi miễn phí, học phổ thông miễn phí.

#### c) Mệnh lệnh - kiểm soát (command and control)

Quy định hạn ngạch (vd "không xả quá 100kg CO2/ngày"). Đơn giản nhưng kém hiệu quả vì áp đặt cùng mức cho mọi nhà sản xuất, không tận dụng được sự khác biệt về chi phí giảm thải.

#### d) Thị trường quyền phát thải (cap and trade)

Chính phủ phát hành tổng số quyền phát thải cố định, doanh nghiệp mua bán. Doanh nghiệp giảm thải rẻ → bán quyền cho doanh nghiệp giảm thải đắt → tổng chi phí xã hội tối thiểu.

Vd: EU ETS, RGGI ở Bắc Mỹ.

### 2.5. Coase theorem

**Coase theorem (1960)**: Nếu *chi phí thương lượng thấp* và *quyền sở hữu rõ ràng*, các bên liên quan có thể tự thương lượng để đạt cân bằng tối ưu, **bất kể quyền sở hữu thuộc về ai**.

#### 💡 Trực giác

Trong ví dụ nhà máy + dân, có 2 cách:

- **Quyền thuộc dân** (quyền không bị ô nhiễm): nhà máy phải trả \`30/tấn\` cho dân để được sản xuất 70 tấn. Tổng trả = \`2100\`, nhưng nhà máy thu lợi từ giao dịch nhiều hơn → win-win, dân được đền bù.
- **Quyền thuộc nhà máy** (quyền ô nhiễm tự do): dân phải trả nhà máy để nó giảm sản lượng từ 100 xuống 70 tấn. Tổng dân trả ≈ \`30 × giá đền bù\`. Cũng cho cân bằng tối ưu.

**Cùng kết quả Q* = 70**, chỉ khác phân bổ tiền giữa các bên. Đây là insight nổi tiếng — không phải lúc nào cũng cần chính phủ can thiệp; đôi khi chỉ cần quyền sở hữu rõ ràng.

**Hạn chế thực tế**:

- Chi phí thương lượng cao (nhiều bên thứ 3: cả triệu người dân bị ảnh hưởng).
- Free-rider problem (ai cũng muốn người khác trả).
- Quyền sở hữu khó xác định (ai sở hữu không khí?).

Vì vậy Coase theorem áp dụng tốt cho *vài bên*, kém cho *cả xã hội*. Khi đó cần chính phủ.

#### ❓ Câu hỏi tự nhiên của người đọc

**Q: Thuế Pigou có DWL không?** Không (trên nguyên tắc). Thuế Pigou xoá DWL gây bởi externality — đây là *double dividend*: vừa giảm hại, vừa thu doanh thu, không gây DWL. (Trong thực tế thuế thường không khớp chính xác external cost → vẫn còn DWL nhỏ.)

**Q: Vậy thuế nào cũng nên là thuế Pigou?** Không. Pigou chỉ áp dụng cho hàng có externality. Thuế thu nhập, VAT... không phải Pigou — chúng có DWL như Lesson 04 đã nói.

## 3. Public Goods (Hàng hóa công)

### 3.1. Định nghĩa qua 2 thuộc tính

- **Loại trừ (excludable)**: có thể ngăn người không trả tiền dùng.
- **Cạnh tranh (rival)**: một người dùng thì người khác mất phần.

Bảng 4 loại hàng hóa:

| | Loại trừ | Không loại trừ |
|---|---|---|
| **Cạnh tranh** | Tư (private): bánh mì, ô tô | Common-pool: cá biển, không khí sạch |
| **Không cạnh tranh** | Club: phim Netflix, Disneyland | Public: quốc phòng, đèn đường, kiến thức |

**Public good** = không loại trừ + không cạnh tranh.

### 3.2. Vấn đề free-rider

Vì không loại trừ → không thể bán → người tiêu dùng có incentive *không trả* (hy vọng người khác trả). Hệ quả: **thị trường tư cung cấp dưới mức tối ưu**.

**Walk-through**: Một khu phố muốn lắp đèn đường (lợi ích \`1000\`, chi phí \`400\`).

- Lý thuyết: nên lắp (lợi > chi).
- Thực tế: nếu để mỗi hộ tự nguyện đóng góp, mỗi người nghĩ *"hàng xóm sẽ đóng"* → không đủ tiền → không lắp.

Giải pháp: chính phủ *bắt buộc đóng thuế* → cung cấp dịch vụ công.

### 3.3. Ví dụ thực

1. **Quốc phòng**: ai cũng được bảo vệ, không cạnh tranh, không loại trừ. Phải do nhà nước.
2. **Pháo hoa**: lễ Tết — ai cũng xem được, không cạnh tranh. Tư nhân hiếm khi bỏ tiền tự bắn cho cả thành phố xem.
3. **Kiến thức cơ bản** (định luật vật lý): không cạnh tranh, không loại trừ → cần nhà nước / phi lợi nhuận tài trợ R&D.
4. **Tiêm chủng diện rộng**: không hoàn toàn public good, nhưng có yếu tố externality + free-rider → cần chính sách công.

## 4. Asymmetric Information

### 4.1. Adverse Selection — Lemon market

George Akerlof (1970) — "The Market for Lemons":

- Có 100 xe cũ. 50 xe tốt (peach) giá trị \`10.000\`, 50 xe dở (lemon) giá trị \`4.000\`.
- Người bán biết xe của họ; người mua không.
- Người mua chỉ sẵn sàng trả *trung bình* = \`7.000\`.
- Người bán xe tốt: \`7.000 < 10.000\` → rời thị trường.
- Còn lại chỉ xe dở → giá càng giảm → adverse selection.

**Kết quả**: thị trường sụp đổ, chỉ giao dịch xe dở. Đây là lý do xe cũ thường rẻ một cách *hệ thống* (không chỉ là khấu hao).

**Giải pháp**:

- **Signaling**: người bán xe tốt phát tín hiệu (vd: bảo hành, giấy kiểm tra độc lập).
- **Screening**: người mua đặt câu hỏi để phân biệt.
- **Bên thứ 3 tin cậy**: dealer có uy tín, CarFax.

### 4.2. Moral Hazard

Sau khi *ký hợp đồng*, một bên thay đổi hành vi vì biết bên kia không quan sát được.

Ví dụ:

- Mua bảo hiểm xe → lái ẩu hơn (vì có bảo hiểm chi trả).
- Nhân viên có hợp đồng lương cố định → ít cố gắng (vì lương không phụ thuộc effort).
- Ngân hàng "too big to fail" → cho vay rủi ro hơn (vì nếu sập sẽ được cứu).

**Giải pháp**:

- Deductible (đồng chi trả) trong bảo hiểm.
- Thưởng theo kết quả.
- Giám sát + audit.

## 5. Common-Pool Resources và Tragedy of the Commons

### 5.1. Vấn đề

Tài nguyên *không loại trừ + cạnh tranh*: cá biển, rừng chung, đất chăn thả công, nước ngầm, không khí sạch.

Mỗi người dùng có incentive *khai thác tối đa* trước người khác → tổng khai thác vượt khả năng tái tạo → **cạn kiệt**.

Garrett Hardin (1968) gọi đây là **Tragedy of the Commons**.

**Ví dụ thực**:
- Đánh bắt cá quá mức (cá tuyết Bắc Đại Tây Dương sụp đổ 1992).
- Nước ngầm đồng bằng sông Cửu Long bị bơm quá mức.
- Ùn tắc giao thông ở giờ cao điểm.

### 5.2. Giải pháp

1. **Tư hữu hóa**: chuyển common → private. Vd: chia rừng cho từng hộ.
2. **Hạn ngạch (quotas)**: chính phủ phân bổ quyền khai thác. Vd: quota đánh cá.
3. **Cộng đồng quản lý**: Elinor Ostrom (Nobel 2009) chỉ ra *cộng đồng địa phương* thường tự tổ chức được khi có thể chế phù hợp. Vd: làng cá ở Nhật, mương chia nước ở Việt Nam.
4. **Định giá ngoại ứng**: thu phí khi dùng tài nguyên chung (vd: phí tắc nghẽn London, Stockholm).

## 6. Bài tập thực hành

### Bài 1 — Externality tiêu cực

Nhà máy hóa chất có: MPC = \`50\`, external cost = \`20\`. Cầu (= MPB = MSB): \`P = 150 − Q\`.

- (a) Tìm \`Q_market\`, \`Q_optimal\`.
- (b) Tính DWL khi không có chính sách.
- (c) Thuế Pigou tối ưu là bao nhiêu?

### Bài 2 — Externality tích cực

Vắc-xin: MPC = MSC = \`30\`, MPB = \`100 − Q\`, MSB = \`120 − Q\` (mỗi liều tiêm tạo external benefit \`20\` cho xã hội).

- (a) Tìm \`Q_market\`, \`Q_optimal\`.
- (b) Tính DWL.
- (c) Trợ cấp tối ưu cho mỗi liều?

### Bài 3 — Public good

5 người dân muốn lắp đèn đường. Mỗi người định giá lợi ích như sau: \`100, 80, 60, 40, 20\`. Chi phí lắp = \`200\`.

- (a) Có nên lắp xét theo phúc lợi xã hội?
- (b) Nếu để mỗi người tự nguyện đóng, dự đoán ai trả? Có đủ \`200\` không?

### Bài 4 — Adverse selection

Thị trường bảo hiểm sức khỏe. Có 2 nhóm:

- Nhóm khỏe: 60% dân, kỳ vọng chi phí y tế = \`1.000\`/năm.
- Nhóm yếu: 40% dân, kỳ vọng chi phí = \`5.000\`/năm.

Công ty bảo hiểm không phân biệt được.

- (a) Tính premium trung bình nếu cả 2 nhóm tham gia.
- (b) Nhóm khỏe có sẵn sàng trả premium đó không (giả sử họ sẵn sàng trả tối đa = chi phí kỳ vọng + 10% margin)?
- (c) Mô tả vòng xoáy adverse selection.

## 7. Lời giải chi tiết

### Lời giải Bài 1

(a) \`Q_market\`: MPC = MPB → \`50 = 150 − Q\` → \`Q_market = 100\`.
   \`Q_optimal\`: MSC = MSB → \`50 + 20 = 70 = 150 − Q\` → \`Q_optimal = 80\`.

(b) DWL = tam giác giữa MSC và MPB từ \`Q_optimal\` tới \`Q_market\`. Chiều dài = \`100 − 80 = 20\`. Chiều cao tại \`Q_market\`: \`MSC − MPB = 70 − 50 = 20\`. → \`DWL = 0.5 × 20 × 20 = 200\`.

(c) Thuế Pigou = external cost = \`20\`. Áp thuế → MPC tăng lên \`70 = MSC\` → cân bằng = \`Q_optimal = 80\`.

### Lời giải Bài 2

(a) \`Q_market\`: MPC = MPB → \`30 = 100 − Q\` → \`Q_market = 70\`.
   \`Q_optimal\`: MSC = MSB → \`30 = 120 − Q\` → \`Q_optimal = 90\`.

(b) DWL = tam giác giữa MSB và MSC từ \`Q_market\` tới \`Q_optimal\`. Chiều dài = \`20\`. Chiều cao tại \`Q_market\`: \`MSB − MSC = 100 − 30 = 70\` so với MPB = MPC... 

Chính xác hơn: ở \`Q = 70\`, MSB = \`120 − 70 = 50\`, MSC = \`30\`. → khoảng cách = \`20\`. Tại \`Q = 90\`, MSB = MSC = \`30\`, khoảng cách = \`0\`. Tam giác: \`DWL = 0.5 × 20 × 20 = 200\`.

(c) Trợ cấp = external benefit = \`20\`. Trợ cấp dịch MPB lên trùng MSB → cân bằng = \`Q_optimal\`.

### Lời giải Bài 3

(a) Tổng lợi ích xã hội = \`100 + 80 + 60 + 40 + 20 = 300 > 200\` → nên lắp.

(b) Nếu tự nguyện: mỗi người chỉ trả nếu lợi cá nhân > đóng góp. Nhưng *biết rằng lắp được dù mình không trả* (không loại trừ) → free-rider. Dự đoán: chỉ một số ít trả, *không đủ 200*. Đây là vì sao public goods cần chính phủ bắt buộc đóng thuế.

### Lời giải Bài 4

(a) Premium = \`0.6 × 1.000 + 0.4 × 5.000 = 600 + 2000 = 2.600\`/năm (giả định không có markup).

(b) Nhóm khỏe sẵn sàng trả tối đa \`1.000 × 1.1 = 1.100\`. Premium \`2.600 > 1.100\` → nhóm khỏe *rời thị trường*.

(c) Nhóm khỏe rời → chỉ còn nhóm yếu → premium phải tăng lên \`5.000\` (kỳ vọng chi phí nhóm yếu). Có thể vẫn còn người trong nhóm yếu rời nếu họ tương đối khỏe hơn trung bình. → Vòng xoáy adverse selection: thị trường chỉ giữ người *bệnh nhất*, premium leo lên cao.

**Giải pháp**:

- Bảo hiểm bắt buộc (Obamacare individual mandate, ở Việt Nam BHYT bắt buộc).
- Phân nhóm theo yếu tố quan sát được (tuổi, lịch sử bệnh).
- Trợ cấp cho người yếu để giữ họ trong hệ thống.

## 8. Liên kết và bài tiếp theo

- **Tier 2 — Microeconomics** (sắp ra): consumer theory, production & cost, market structures, game theory, labor & capital.
- **Bài trước**: [Lesson 04 — Thặng dư & DWL](../lesson-04-surplus-dwl/).
- **Minh họa tương tác**: [visualization.html](./visualization.html) — vẽ MPC/MSC/MPB/MSB, demo Pigouvian tax xoá DWL.
`;
