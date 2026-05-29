# Lesson 01: Collective Action & Public Goods

> **Tầng 3 — Strategic Interactions · PoliticalScience**

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Phát biểu chính xác định nghĩa **public good** (non-excludable + non-rival) và phân biệt với private good, club good, common-pool resource.
- Giải thích **free-rider problem** bằng toán học: tại sao cá nhân rational không đóng góp dù toàn nhóm có lợi.
- Phân tích **n-player public goods game**: tính payoff, Nash Equilibrium, và social optimum.
- Mô tả **Tragedy of the Commons** và liên kết với n-player PD.
- Đánh giá các giải pháp: selective incentives (Olson), Ostrom's design principles, repeated interaction, centralized enforcement.

## Kiến thức tiền đề

- **T1-L01**: Game theory basics — strategy, payoff, Nash Equilibrium.
- **T1-L02**: Prisoner's Dilemma — cấu trúc 2-player defect/cooperate.
- **T1-L05**: Repeated games — folk theorem, conditional cooperation.

---

## 1. Public Goods — Phân loại hàng hoá

> 💡 **Trực giác**: Bạn không thể "sở hữu riêng" ánh sáng đèn đường — ai đi qua cũng được chiếu sáng (non-excludable), và một người hưởng không làm người khác hưởng ít hơn (non-rival). Đây là bản chất tạo ra vấn đề tập thể.

Bảng phân loại 4 loại hàng hoá:

| | **Rival** | **Non-rival** |
|---|---|---|
| **Excludable** | Private good (bánh mì, điện thoại) | Club good (Netflix, công viên có phí) |
| **Non-excludable** | Common-pool resource (cá biển, rừng chung) | **Public good** (quốc phòng, đèn đường) |

**Public good** = non-excludable **và** non-rival. Đây là loại hàng hoá mà thị trường under-provide — mỗi người đều muốn hưởng nhưng không ai muốn trả tiền.

> ❓ **Câu hỏi tự nhiên**: Tại sao "non-excludable" lại tạo ra vấn đề? Nếu excludable (như Netflix), công ty có thể charge tiền, thị trường tự giải quyết. Non-excludable → không ai chịu trả → phải dựa vào tự nguyện hoặc nhà nước.

> ❓ **Common-pool resource khác public good ở đâu?** Common-pool resource (cá biển) là rival — một người lấy là người khác mất. Non-excludable nhưng rival → cạn kiệt (tragedy of the commons). Public good (quốc phòng) là non-rival → không cạn kiệt nhưng vẫn bị free-ride.

📝 **Tóm tắt mục 1**: Public good = non-excludable + non-rival. Hai tính chất này cùng tạo ra free-rider problem. Common-pool resource = rival + non-excludable → tragedy of the commons.

---

## 2. N-Player Public Goods Game — Mô hình toán học

> 💡 **Trực giác**: Hãy hình dung n người trong một làng quyết định có bỏ tiền xây cầu chung hay không. Tiền ai đóng được nhân lên (công trình tập thể hiệu quả hơn tổng cá nhân), chia đều cho n người. Nhưng nếu bạn không đóng, bạn vẫn dùng cầu — và trong túi còn nguyên tiền.

### 2.1 Thiết lập chính thức

- **n** người chơi.
- Mỗi người có **endowment** e (ví dụ e = 10 đơn vị).
- Mỗi người chọn đóng góp **cᵢ ∈ [0, e]** vào pool chung.
- Tổng pool = Σcᵢ được nhân với **multiplier m** (1 < m < n).
- Số tiền nhân lên chia đều cho n người → mỗi người nhận (m × Σcᵢ)/n.
- **Payoff cá nhân i** = (e − cᵢ) + (m × Σcᵢ)/n.

### 2.2 Walk-through: n=4, e=10, m=2

**Kịch bản 1**: Tất cả đóng đủ (cᵢ = 10).

- Tổng pool = 4 × 10 = 40.
- Sau nhân: 2 × 40 = 80.
- Mỗi người nhận: 80/4 = 20.
- Giữ lại: 0.
- **Payoff mỗi người = 0 + 20 = 20**.

**Kịch bản 2**: Một người defect (cᵢ = 0), 3 người còn lại đóng 10.

- Người defect: giữ 10, nhận (2 × 30)/4 = 15 → **payoff = 10 + 15 = 25**.
- Người cooperate: giữ 0, nhận 15 → **payoff = 0 + 15 = 15**.
- → Defect > Cooperate. Người defect kiếm nhiều hơn.

**Kịch bản 3**: Tất cả defect (cᵢ = 0).

- Tổng pool = 0. Payoff mỗi người = 10 + 0 = **10**.

**So sánh**: Nếu cả 4 cooperate → mỗi người được 20. Nếu cả 4 defect → mỗi người được 10. Nhưng lý lẽ cá nhân luôn dẫn đến defect.

### 2.3 Tại sao defect là Nash Equilibrium?

Xét lợi ích cận biên (marginal benefit) của việc đóng góp thêm 1 đơn vị:

- **Chi phí cá nhân**: 1 đơn vị (mình trả).
- **Lợi ích cá nhân**: m/n × 1 = m/n đơn vị (nhận lại phần chia).
- **Net = m/n − 1**.

Vì m < n → m/n < 1 → **Net < 0**. Đóng góp 1 đơn vị = thua lỗ cho cá nhân.

Với n=4, m=2: net = 2/4 − 1 = −0.5. Mỗi đồng đóng góp mình chỉ nhận lại 0.5 đồng.

→ **Dominant strategy là không đóng góp (cᵢ = 0)** với mọi rational agent.
→ **Nash Equilibrium duy nhất: Σcᵢ = 0, payoff mỗi người = e = 10**.
→ **Social optimum: Σcᵢ = ne, payoff mỗi người = me = 20**.

> ⚠ **Lỗi thường gặp**: Nhiều người nghĩ "nhưng nếu mọi người đều suy nghĩ vậy thì tất cả thua lỗ, nên mọi người nên cooperate." Đây là lập luận phi cá nhân — **trong game theory, mỗi người tối ưu hành động của riêng mình, cho trước hành động của người khác**. Lập luận "nên cooperate vì tốt cho tập thể" không phải là Nash rationality.

### 2.4 Tổng quát với n và m bất kỳ

| n | m | m/n | Net/unit | NE payoff | Social optimum |
|---|---|-----|----------|-----------|----------------|
| 4 | 2 | 0.5 | −0.5 | 10 | 20 |
| 10 | 3 | 0.3 | −0.7 | 10 | 30 |
| 20 | 5 | 0.25 | −0.75 | 10 | 50 |
| 4 | 3 | 0.75 | −0.25 | 10 | 30 |

Nhận xét: m lớn hơn (hiệu quả nhân lên cao hơn) → social benefit lớn hơn nhưng NE vẫn là 0 contribution miễn là m < n.

> 🔁 **Tự kiểm tra**: Với n=5, m=4: (a) tính net/unit đóng góp; (b) NE có phải 0 contribution không? (c) social optimum payoff mỗi người = bao nhiêu nếu e=10?

<details>
<summary>Đáp án</summary>
(a) m/n = 4/5 = 0.8 → net = 0.8 − 1 = −0.2 < 0. Vẫn bị lỗ khi contribute.
(b) Có, NE vẫn = 0 contribution vì net < 0.
(c) Social optimum: mỗi người đóng 10, pool = 50, nhân 4 = 200, chia 5 = 40. Payoff = 40.
</details>

📝 **Tóm tắt mục 2**: NE = 0 contribution; Social optimum = full contribution. Gap = (m−1)×e×n. Điều kiện NE bị fail: m/n ≥ 1 tức m ≥ n — nhưng m < n là assumption của model (không thực tế để mỗi đồng return nhiều hơn tổng input khi chia đều).

---

## 3. Tragedy of the Commons

> 💡 **Trực giác**: Garrett Hardin (1968). Có 10 nông dân chung một đồng cỏ. Mỗi người thêm 1 con bò → ăn nhiều cỏ hơn. Lợi ích riêng = +1 con bò = +1 đơn vị doanh thu. Chi phí chia sẻ = đồng cỏ mỏng hơn cho TẤT CẢ 10 người. Vì cá nhân chịu 100% lợi ích nhưng chỉ 1/10 chi phí → thêm bò là rational → tất cả thêm → đồng cỏ cạn kiệt.

**Ví dụ cụ thể — Nghề cá**: Biển Đông có trữ lượng cá tối đa 1000 tấn/năm để tái sinh bền vững. 10 tàu cá, mỗi tàu quyết định đánh bắt nhiều hay ít.

- Nếu mỗi tàu đánh 80 tấn: tổng = 800 < 1000 → biển hồi phục → sustainable.
- Nếu mỗi tàu đánh 120 tấn: tổng = 1200 > 1000 → biển cạn kiệt trong vài năm.
- Tàu 1 suy nghĩ: "Nếu tôi không đánh 120, tàu khác cũng đánh → biển cạn vẫn vậy. Nếu tôi đánh, ít nhất tôi lợi ngắn hạn" → rational defect.
- **Kết quả**: tất cả đánh 120 → overfishing → collapse.

**Liên hệ public goods game**: Biển = public good (non-excludable: ai cũng vào được; rival: cá bị lấy là mất). Mỗi tàu "contribute" bằng cách kiềm chế. Defect = đánh quá mức. Đây là common-pool resource (rival public good) → tragedy.

> ❓ **Tại sao gọi là "tragedy"?** Hardin gọi là tragedy vì không phải do người xấu — mỗi cá nhân hoàn toàn rational, thậm chí có thể biết hậu quả. Tragedy nằm ở chỗ: **cấu trúc incentive tạo ra kết quả tệ dù tất cả đều biết nó tệ**.

**Ví dụ 2 — Tắc đường**: Mỗi người chọn lái xe riêng vì tiện hơn xe bus → tất cả lái xe → tắc đường → tất cả đều chậm hơn xe bus. Rational individual → irrational collective.

**Ví dụ 3 — Climate change**: Mỗi quốc gia phát thải CO₂ vì lợi ích kinh tế. Cost của phát thải (global warming) chia cho toàn thế giới. Benefit riêng > share of cost → rational phát thải → collective catastrophe.

📝 **Tóm tắt mục 3**: Tragedy = cấu trúc incentive dẫn đến collectively irrational outcome dù mỗi cá nhân rational. Phổ biến: ngư trường, khí thải, tắc đường, kháng sinh.

---

## 4. Voter Turnout Paradox

> 💡 **Trực giác**: Đi bầu mất vài tiếng. Xác suất phiếu của bạn quyết định kết quả (pivot probability) ≈ 1/n, với n hàng triệu cử tri. Expected benefit = (1/n) × benefit_of_preferred_outcome ≈ 0. Expected cost > 0. → Rational không đi bầu.

**Paradox**: Voter turnout thực tế ở nhiều nước dân chủ là 50-80%. Nếu tất cả rational theo kiểu trên, ai đi bầu?

Giải thích hiện có:
1. **Expressive voting**: đi bầu vì cảm giác civic duty, không phải vì pivot.
2. **Group rationality**: nghĩ "nếu mọi người suy nghĩ như tôi, không ai đi → đảng tôi thua → tôi đi".
3. **Social pressure**: nhóm bạn bè, nơi làm biết bạn có đi không.
4. **Information costs**: người ít thông tin không đi, người có thông tin và muốn bày tỏ thì đi → cao turnout ở nhóm có informed preference mạnh.

**Mô hình Palfrey-Rosenthal (1983)**: Mixed strategy NE của turnout game → turnout > 0 ngay cả khi mọi người rational, vì P(pivot) không phải 0 khi số lượng voter nhỏ.

> ⚠ **Lỗi thường gặp**: Không phải "irrational để đi bầu" — đúng hơn là "instrumental rationality không đủ giải thích; phải mở rộng khái niệm utility". Expressive utility (cảm giác tốt khi làm civic duty) là real utility.

---

## 5. Giải pháp cho Collective Action Problem

Mancur Olson (1965) đề xuất và phân tích các điều kiện để nhóm vượt qua free-rider:

### 5.1 Selective Incentives

Reward thành viên đóng góp bằng lợi ích **exclusive** (không chia cho free-rider):

- **Ví dụ 1**: Union benefits — chỉ thành viên union mới được trợ cấp thất nghiệp từ quỹ union, tiếp cận luật sư lao động, discount khóa học.
- **Ví dụ 2**: Public radio pledge drives — tặng tote bag, sticker, access to premium content cho donor.
- **Ví dụ 3**: Party membership — access to internal events, networking, early candidate information.

Cơ chế: phá vỡ non-excludability nhân tạo → club good thay vì pure public good.

### 5.2 Quy mô nhóm (Group Size)

Olson: **nhóm nhỏ dễ giải quyết collective action hơn**. Lý do:

- Trong nhóm nhỏ, contribution của một người có impact observable → social sanction.
- Pivot probability cao hơn → individual effort matters.
- Repeat interaction dễ hơn (xem 5.4).

**Ví dụ số**: 4 người đóng phí chung: ai không đóng bị biết ngay. 10,000 người đóng phí chung: ai không đóng? Không ai biết.

### 5.3 Ostrom's Design Principles for Commons (1990)

Elinor Ostrom (Nobel 2009) chứng minh nhiều cộng đồng tự quản lý commons thành công mà không cần nhà nước hay tư hữu hóa. 8 design principles:

1. **Rõ ranh giới** (clearly defined boundaries): ai được dùng, phạm vi là gì.
2. **Quy tắc khớp địa phương** (match rules to local conditions): fishermen ở vịnh khác ruộng lúa.
3. **Người dùng tham gia thiết kế quy tắc** (collective choice arrangements).
4. **Monitoring hiệu quả**: ai đang giám sát ai?
5. **Graduated sanctions**: vi phạm nhỏ → nhắc nhở; tái phạm → phạt nặng.
6. **Conflict resolution mechanism**: tòa địa phương nhanh, rẻ.
7. **Recognition by state**: chính quyền không can thiệp phá quy tắc địa phương.
8. **Nested enterprises**: commons lớn chia thành nhiều layers tự quản.

**Ví dụ**: Làng đánh cá Alanya (Thổ Nhĩ Kỳ) — ngư dân tự chia khu vực theo mùa, rotate hàng ngày, không cần cảnh sát biển.

### 5.4 Repeated Interaction & Folk Theorem

Khi game lặp lại vô hạn (hoặc indefinitely) với discount factor δ đủ lớn, cooperation có thể sustain như subgame perfect equilibrium. Tit-for-tat: cooperate lần đầu, copy đối phương. Điều kiện:

- δ × (payoff_cooperate) ≥ (payoff_defect_once) → tính toán cụ thể tại [T1-L05 Repeated Games](../../01-GameTheoryFoundations/lesson-05-repeated-games/README.md).

### 5.5 Centralized Enforcement (Hobbes)

Leviathan: nhà nước cưỡng ép đóng thuế, cung cấp public goods (quốc phòng, cơ sở hạ tầng). Loại bỏ free-rider choice bằng legal sanction.

**Trade-off**: hiệu quả trong cung cấp public goods nhưng phụ thuộc vào việc nhà nước không abuse quyền lực thu thuế.

> 🔁 **Tự kiểm tra**: Climate change là collective action problem kiểu nào? Liệt kê ít nhất 3 giải pháp và phân tích tại sao mỗi giải pháp gặp khó khăn gì trong bối cảnh quốc tế.

<details>
<summary>Gợi ý đáp án</summary>
Kiểu: n-player public goods game (n = ~195 quốc gia, m = tổng lợi ích từ khí hậu ổn định / n < 1 cho mỗi quốc gia). Cũng là common-pool problem (atmosphere = common pool bị overcrowded với CO₂).

Giải pháp:
1. Paris Agreement = selective incentive? Không — không binding, không enforcement. Vẫn là cheap talk nếu không kèm sanction.
2. Carbon tax = centralized enforcement? Ai enforce? Không có world government.
3. Carbon border adjustment (EU CBAM): selective incentive kiểu thương mại — excludability thông qua tariff. Promising nhưng chỉ EU làm = không đủ.
4. Repeated interaction? Có — states meet annually ở COP. Nhưng discount factor δ phụ thuộc time horizon, và politicians có horizon ngắn (nhiệm kỳ).
</details>

📝 **Tóm tắt mục 5**: Olson: selective incentives + nhóm nhỏ. Ostrom: self-governance với design principles. Hobbes: nhà nước cưỡng ép. Folk theorem: repeat interaction. Không có giải pháp nào universally optimal — phụ thuộc context.

---

## 6. Bài tập thực hành

**Bài 1**: Một nhóm 5 sinh viên chia sẻ chi phí thuê nhà (5 triệu/tháng). Mỗi người đóng 1 triệu. Tuy nhiên, nhà không có hợp đồng ràng buộc. Phân tích đây là public goods game không? n, m là gì? NE là gì? Giải pháp?

**Bài 2**: Đảo ngược logic Olson: tại sao các nhóm lợi ích tập trung (concentrated interest groups — vd lobby công nghiệp dầu khí) lại thành công trong việc coordinate, còn public (dispersed interest) thì không?

**Bài 3**: Tính xem với n=10, m=3, e=20: (a) net marginal benefit của contribute 1 đơn vị; (b) NE payoff; (c) Social optimum payoff; (d) gap giữa NE và optimum.

---

## 7. Lời giải chi tiết

### Bài 1

Có, đây là public goods game dạng contribution:
- n = 5 (5 sinh viên).
- "Goods" = căn phòng được duy trì (điện, nước, wifi chung).
- e = chi phí thời gian và effort đóng tiền.
- m = 1 (không nhân lên — đây là cost sharing, không phải public goods game thuần túy).

Thực ra đây gần với pure cost-sharing game hơn PGG. NE: nếu một người không đóng, phòng vẫn được thuê nếu 4 người còn lại đóng → free-rider rational. Nhưng 4 người còn lại phải cover thêm → có thể quit → collapse. Giải pháp: hợp đồng ràng buộc (centralized enforcement nhỏ), chia đều + rotate check.

### Bài 2

Tập trung lợi ích (concentrated interest): 10 công ty dầu khí mỗi công ty mất 100 triệu nếu regulation pass → mỗi người có lợi ích cực lớn để lobby. Dễ coordinate (nhóm nhỏ, Olson). Dispersed public: mỗi người trong 300 triệu dân tiết kiệm 10 đô nếu regulation pass → không ai có incentive đủ để lobby. Tragedy ngược: nhóm nhỏ lợi ích lớn thắng nhóm lớn lợi ích nhỏ.

### Bài 3

n=10, m=3, e=20:

(a) Net = m/n − 1 = 3/10 − 1 = **−0.7**. Mỗi đơn vị đóng chỉ nhận lại 0.3 đơn vị → thua 0.7.

(b) NE: mọi người đóng 0. Payoff = e = **20**.

(c) Social optimum: mọi người đóng 20. Pool = 200, nhân 3 = 600, chia 10 = 60. Payoff = 60 − 20 + 0? Sai — payoff = giữ lại (0) + nhận (60) = **60**.

(d) Gap = 60 − 20 = **40 đơn vị/người**, tổng gap = 400 đơn vị.

---

## Bài tiếp theo

**[L02: Bargaining — Nash solution & Rubinstein alternating offers](../lesson-02-bargaining/README.md)**: Khi 2 agent có thể chia surplus, ai lấy bao nhiêu? Nash bargaining solution, Rubinstein model, ultimatum game.

---

*[visualization.html](./visualization.html) · Tầng 3 — PoliticalScience*
