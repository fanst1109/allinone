// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: Economics/Tier1-Foundations/lesson-02-supply-demand/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 02 — Cung và cầu

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Vẽ và đọc được **đường cầu (demand curve)** và **đường cung (supply curve)** trong hệ trục \`(Q, P)\`.
- Hiểu **quy luật cầu** (cầu giảm khi giá tăng) và **quy luật cung** (cung tăng khi giá tăng) — biết *vì sao* hai quy luật đó đúng, không chỉ học thuộc.
- Tìm **điểm cân bằng (equilibrium)** bằng đại số và bằng đồ thị; giải thích vì sao thị trường tự "tìm về" điểm này.
- Phân biệt rạch ròi giữa **di chuyển dọc đường (movement along)** và **dịch chuyển đường (shift)** — sai lầm cực phổ biến trong báo chí kinh tế.
- Phân tích được tác động của các can thiệp **trần giá (price ceiling)** và **sàn giá (price floor)** lên cân bằng và lên hiện tượng *thiếu hụt* / *thừa cung*.
- Bước đầu hiểu vì sao Adam Smith nói thị trường là một *"bàn tay vô hình"* (invisible hand) — và khi nào bàn tay đó không hoạt động.

## Kiến thức tiền đề

- [Lesson 01 — Tư duy như nhà kinh tế](../lesson-01-thinking-like-economist/): khan hiếm, đánh đổi, chi phí cơ hội, tư duy biên.
- Đại số mức cơ bản: giải phương trình bậc nhất, hệ 2 phương trình 2 ẩn (để tìm \`(P*, Q*)\`).

## 1. Cầu — Người mua sẵn sàng làm gì

### 1.1. Định nghĩa cầu

**Cầu (demand)** = lượng hàng hóa người mua **sẵn sàng và có khả năng** mua ở mỗi mức giá khác nhau, *giả định mọi thứ khác không đổi* (ceteris paribus).

Hai chữ quan trọng:

- **"Sẵn sàng"** = muốn (willingness). Bạn muốn mua xe Lamborghini nhưng không đủ tiền → không thuộc cầu.
- **"Có khả năng"** = có ngân sách (ability). Có tiền nhưng không muốn → cũng không thuộc cầu.

Cầu CHỈ tồn tại khi cả hai điều kiện đồng thời.

#### 💡 Trực giác / Hình dung

Hình dung bạn đứng trước quầy trà sữa. Nếu giá \`10k/ly\`, bạn sẵn sàng mua **5 ly** (uống cả ngày). Giá tăng lên \`20k/ly\` → bạn còn mua **3 ly**. \`40k/ly\` → chỉ **1 ly**. \`100k/ly\` → **0 ly**. Bảng \`(giá → lượng mua)\` này chính là **cầu cá nhân** của bạn cho trà sữa.

**Cầu thị trường** = tổng tất cả cầu cá nhân ở mỗi mức giá. Nếu thị trường có 1.000 người giống bạn, cầu thị trường = \`1000 × cầu cá nhân\`.

### 1.2. Quy luật cầu (law of demand)

**Khi giá tăng, lượng cầu giảm** (và ngược lại) — giữ mọi thứ khác không đổi. Đây không phải tiên đề toán học mà là *quy luật quan sát*, đúng cho hầu hết hàng hóa.

**Vì sao quy luật cầu đúng?** Hai cơ chế:

1. **Hiệu ứng thay thế (substitution effect)**: giá trà sữa tăng → bạn chuyển một phần sang cà phê (rẻ hơn tương đối).
2. **Hiệu ứng thu nhập (income effect)**: giá tăng → thu nhập thực (sức mua) của bạn giảm → bạn mua ít đi nói chung.

Bốn ví dụ số cụ thể cho cầu trà sữa:

| Giá (k/ly) | Lượng cầu (ly/tuần) |
|------------|---------------------|
| 10 | 5 |
| 20 | 3 |
| 40 | 1 |
| 100 | 0 |

Vẽ trên hệ trục \`(Q, P)\` (Q trên trục hoành, P trên trục tung — quy ước cổ điển): được đường cầu *dốc xuống từ trái sang phải*.

**Hàm cầu tuyến tính**: nhiều bài toán mô hình hóa cầu bằng hàm bậc nhất \`Q_d = a − b·P\`, với \`a > 0\`, \`b > 0\`. Walk-through:

- Nếu \`Q_d = 100 − 2P\`, thì:
  - \`P = 10\`: \`Q_d = 100 − 20 = 80\`.
  - \`P = 30\`: \`Q_d = 100 − 60 = 40\`.
  - \`P = 50\`: \`Q_d = 100 − 100 = 0\` (giá đủ cao thì không ai mua).
  - \`P = 0\`: \`Q_d = 100\` (giá 0 thì cầu vẫn hữu hạn — đây là lý do "miễn phí" không có nghĩa "vô hạn cầu").

#### ⚠ Lỗi thường gặp

- **Nhầm "lượng cầu" với "cầu"**: *Lượng cầu* là một con số tại một mức giá; *cầu* là **cả bảng** giá - lượng. Khi giá đổi → *lượng cầu* đổi (di chuyển dọc đường). Khi yếu tố khác đổi → *cầu* đổi (dịch chuyển cả đường). Sẽ học sâu ở §4.
- **Đường cầu vẽ ngược trục**: Theo quy ước Marshall, \`P\` đặt ở trục tung, \`Q\` ở trục hoành — ngược với toán phổ thông (biến độc lập thường ở trục hoành). Nhớ kỹ.
- **Giả định "tăng giá = doanh thu giảm"**: Không phải lúc nào cũng đúng — phụ thuộc vào độ co giãn (sẽ học ở Lesson 03).

#### ❓ Câu hỏi tự nhiên của người đọc

**Q: Có hàng hóa nào *không* tuân theo quy luật cầu?** Có, gọi là **hàng Giffen** (Giffen goods) — vd lúa mì trong nạn đói Ireland thế kỷ 19: giá lúa mì tăng → người nghèo *mua nhiều lúa mì hơn* vì không còn đủ tiền cho thịt. Hàng Veblen (Rolex, hàng hiệu) cũng có thể có cầu *tăng theo giá* do tâm lý "đắt = sang". Đây là ngoại lệ, không phải luật.

**Q: "Ceteris paribus" có thực tế không?** Không — trong đời thực, nhiều thứ đổi cùng lúc. Nhưng "giữ mọi thứ khác không đổi" là công cụ *tư duy* để tách rời ảnh hưởng của từng yếu tố. Khi phân tích, ta tách từng yếu tố một, rồi cộng lại (additive approximation).

#### 🔁 Dừng lại tự kiểm tra

Cầu của một người cho cà phê: \`Q_d = 20 − 0.5P\` (Q tính theo cốc/tuần, P theo k/cốc).

1. Người này mua bao nhiêu cốc khi \`P = 30k\`?
2. Giá tối đa người này sẵn sàng trả cho cốc đầu tiên là bao nhiêu?

<details>
<summary>Đáp án</summary>

1. \`Q_d = 20 − 0.5 × 30 = 20 − 15 = 5\` cốc/tuần.
2. "Giá tối đa cho cốc đầu tiên" = mức giá làm \`Q_d = 0\` chính là *prohibitive price*. \`0 = 20 − 0.5P → P = 40k\`. Đây cũng chính là **willingness to pay** cao nhất.
</details>

#### 📝 Tóm tắt mục 1

- Cầu = bảng (giá → lượng mua), với điều kiện *sẵn sàng + có khả năng*.
- Quy luật cầu: P↑ → Q_d↓.
- Cơ chế: substitution effect + income effect.
- Hàm cầu thường mô hình hóa tuyến tính \`Q_d = a − bP\`.

## 2. Cung — Người bán sẵn sàng làm gì

### 2.1. Định nghĩa và quy luật cung

**Cung (supply)** = lượng hàng hóa người bán **sẵn sàng và có khả năng** sản xuất / bán ra ở mỗi mức giá khác nhau, ceteris paribus.

**Quy luật cung**: khi giá tăng, lượng cung tăng.

**Vì sao?**

1. **Chi phí biên tăng dần**: sản xuất thêm 1 đơn vị càng về sau càng tốn kém (đất tốt hết → phải dùng đất xấu; lao động giỏi hết → phải tuyển lao động kém hơn). Chỉ khi giá đủ cao mới đáng sản xuất thêm.
2. **Người bán mới gia nhập**: giá cao thu hút thêm người làm → tổng cung thị trường tăng.

#### 💡 Trực giác / Hình dung

Bạn là nông dân trồng cà chua. Đất nhà bạn có 3 mảnh: mảnh tốt (đất phù sa), mảnh trung bình, mảnh xấu (đất sỏi). Chi phí sản xuất 1kg cà chua:

- Mảnh tốt: \`5.000đ/kg\` (đất tốt, ít công).
- Mảnh trung bình: \`15.000đ/kg\`.
- Mảnh xấu: \`30.000đ/kg\`.

Nếu giá thị trường là \`10.000đ/kg\` → bạn chỉ trồng trên mảnh tốt (mảnh khác lỗ).
Nếu giá lên \`20.000đ/kg\` → bạn trồng cả mảnh tốt + trung bình.
Nếu giá lên \`35.000đ/kg\` → bạn trồng cả 3 mảnh.

Đây là cơ chế gốc của quy luật cung: **giá cao = đáng làm thêm = cung nhiều hơn**.

### 2.2. Walk-through bằng số

**Hàm cung tuyến tính** \`Q_s = c + d·P\`, với \`c, d\` là hằng số (\`d > 0\` — cung tăng theo giá).

Bốn ví dụ:

| Giá (k/kg) | Lượng cung (kg) — \`Q_s = −10 + 2P\` |
|------------|---------------------------------------|
| 5 | \`−10 + 10 = 0\` (không ai bán) |
| 20 | \`−10 + 40 = 30\` |
| 50 | \`−10 + 100 = 90\` |
| 100 | \`−10 + 200 = 190\` |

\`P = 5\` cho \`Q_s = 0\` — đây là **giá tối thiểu** để có người bán. Dưới mức này, không ai sản xuất vì lỗ.

#### ⚠ Lỗi thường gặp

- **Nhầm "cung" với "lượng hàng có sẵn"**: Cung là *bảng* giá - lượng, không phải số lượng cụ thể trong kho. Đoạn báo viết "cung khẩu trang là 10 triệu chiếc" là không chính xác — phải nói "ở giá X, lượng cung là 10 triệu".
- **Quên người bán mới**: Khi giá tăng cao đột biến (vd khẩu trang COVID), không chỉ người bán cũ tăng sản lượng mà *nhiều người khác cũng nhảy vào* — đây là phần lớn cung tăng dài hạn.

#### 📝 Tóm tắt mục 2

- Cung = bảng (giá → lượng bán).
- Quy luật cung: P↑ → Q_s↑.
- Cơ chế: chi phí biên tăng dần + người bán mới gia nhập.
- Hàm cung tuyến tính \`Q_s = c + dP\`.

## 3. Cân bằng thị trường

### 3.1. Định nghĩa và cách tìm

**Cân bằng (equilibrium)** = mức giá \`P*\` mà tại đó \`Q_d = Q_s\`. Khi đó:

- **Lượng cân bằng** \`Q*\` = số lượng được giao dịch.
- Không có *dư thừa* (surplus) và không có *thiếu hụt* (shortage).
- Mọi người muốn mua ở giá \`P*\` đều mua được; mọi người muốn bán ở giá \`P*\` đều bán được.

#### 💡 Trực giác / Hình dung

Tại sao thị trường tự tìm về cân bằng? Hãy tưởng tượng:

- **Giá quá cao** (\`P > P*\`): \`Q_s > Q_d\` → hàng tồn kho dư → người bán giảm giá để tống hàng → giá giảm về \`P*\`.
- **Giá quá thấp** (\`P < P*\`): \`Q_d > Q_s\` → người mua tranh giành → người bán tăng giá → giá tăng về \`P*\`.

Cơ chế tự điều chỉnh này chính là **bàn tay vô hình** của Adam Smith.

### 3.2. Walk-through bằng số

Cho hệ:

\`\`\`
Cầu: Q_d = 100 − 2P
Cung: Q_s = −10 + 2P
\`\`\`

**Tìm cân bằng**: đặt \`Q_d = Q_s\`:

\`\`\`
100 − 2P = −10 + 2P
100 + 10 = 2P + 2P
110 = 4P
P* = 27.5
\`\`\`

Thay vào \`Q\`: \`Q* = 100 − 2 × 27.5 = 100 − 55 = 45\`.

Kiểm tra: \`Q_s = −10 + 2 × 27.5 = 45\` ✓.

**Cân bằng**: \`(P*, Q*) = (27.5, 45)\`.

**Xét trường hợp giá bị áp đặt sai**:

- Nếu \`P = 30 > P*\`: \`Q_d = 100 − 60 = 40\`; \`Q_s = −10 + 60 = 50\`. **Dư cung 10 đơn vị** — hàng tồn → áp lực giảm giá.
- Nếu \`P = 20 < P*\`: \`Q_d = 100 − 40 = 60\`; \`Q_s = −10 + 40 = 30\`. **Thiếu hụt 30 đơn vị** — người mua xếp hàng → áp lực tăng giá.

Bốn ví dụ thị trường thật:

1. **Khẩu trang COVID đầu 2020**: Cầu tăng đột biến (dịch bệnh) → đường cầu dịch phải mạnh → giá tăng → cung tăng đáp lại → cân bằng mới ở giá cao và lượng cao hơn.
2. **Giá dầu thô 2014-2016**: Cung shale oil Mỹ tăng mạnh → đường cung dịch phải → giá rớt từ $100 → $30/thùng.
3. **Bất động sản TP.HCM 2008**: Cầu giảm do khủng hoảng tài chính → giá giảm 30-50%.
4. **Vé concert Taylor Swift**: Cung cố định (sức chứa sân vận động) → cung gần như thẳng đứng → giá cân bằng cực cao + thị trường thứ cấp (scalping).

#### ❓ Câu hỏi tự nhiên của người đọc

**Q: Thị trường thật có "luôn ở cân bằng" không?** Không, nhưng có xu hướng *trở về*. Cân bằng là *điểm hấp dẫn* (attractor) — thị trường dao động quanh nó. Trong ngắn hạn có thể lệch xa (giá khẩu trang đầu COVID, GameStop short squeeze), nhưng dài hạn quay lại.

**Q: Vì sao gọi là "bàn tay vô hình"?** Vì không ai *cố tình* tổ chức — mỗi người mua/bán chỉ vì lợi ích riêng, nhưng kết quả tập thể là phân bổ nguồn lực hiệu quả. Đây là quan sát then chốt của Adam Smith (1776) — và là cơ sở của kinh tế thị trường.

## 4. Dịch chuyển vs di chuyển dọc đường

### 4.1. Phân biệt 2 khái niệm

Đây là chỗ **nhầm lẫn lớn nhất** trong kinh tế phổ thông. Phải phân biệt rạch ròi:

| Hiện tượng | Nguyên nhân | Hiệu ứng trên đồ thị |
|------------|-------------|----------------------|
| **Di chuyển dọc đường (movement along)** | Giá \`P\` của chính hàng hóa đó thay đổi | Trượt dọc đường cầu/cung |
| **Dịch chuyển đường (shift)** | Yếu tố KHÁC giá thay đổi (thu nhập, sở thích, giá hàng liên quan, công nghệ...) | Cả đường cầu/cung dịch sang trái/phải |

#### 💡 Trực giác / Hình dung

Hình dung đường cầu là một sợi dây cao su gắn trên hệ trục. Tay bạn (giá) trượt dọc dây → di chuyển dọc đường. Có người *kéo cả sợi dây* sang phải / trái → đường cầu dịch chuyển.

### 4.2. Yếu tố làm dịch chuyển *cầu*

1. **Thu nhập (income)**:
   - Hàng *bình thường (normal good)*: thu nhập tăng → cầu tăng (đường cầu dịch phải). Vd: ăn uống ở nhà hàng.
   - Hàng *thấp cấp (inferior good)*: thu nhập tăng → cầu *giảm*. Vd: mì gói (giàu lên → bớt ăn mì gói).
2. **Giá hàng liên quan**:
   - Hàng *thay thế (substitute)*: giá hàng thay thế tăng → cầu hàng này tăng. Vd: giá Pepsi tăng → cầu Coca tăng.
   - Hàng *bổ sung (complement)*: giá hàng bổ sung tăng → cầu hàng này giảm. Vd: giá xăng tăng → cầu ô tô giảm.
3. **Sở thích (preferences)**: trào lưu, quảng cáo, sức khỏe... Vd: xu hướng ăn keto → cầu bơ tăng.
4. **Kỳ vọng (expectations)**: dự đoán giá tương lai. Vd: kỳ vọng giá xăng ngày mai tăng → cầu hôm nay tăng (đổ xăng đầy).
5. **Số lượng người mua**: dân số tăng → cầu tăng.

### 4.3. Yếu tố làm dịch chuyển *cung*

1. **Giá yếu tố đầu vào** (input prices): nguyên liệu, lao động, năng lượng. Vd: giá thép tăng → cung ô tô giảm.
2. **Công nghệ**: cải tiến → giảm chi phí → cung tăng (dịch phải). Vd: smartphone — công nghệ chip rẻ hơn → giá điện thoại rẻ hơn cho cùng cấu hình.
3. **Kỳ vọng**: kỳ vọng giá mai cao → cung *hôm nay* giảm (giữ hàng).
4. **Số lượng người bán**.
5. **Thuế/trợ giá** lên người bán.

#### ⚠ Lỗi thường gặp

- **"Cầu tăng vì giá giảm"**: SAI. Khi giá giảm, *lượng cầu* tăng (di chuyển dọc đường), không phải *cầu* tăng. Cầu chỉ tăng khi yếu tố khác giá thay đổi.
- **"Cung khẩu trang giảm vì giá quá cao"**: SAI. Giá cao → *lượng cung tăng* (chứ không phải cung giảm).

### 4.4. Walk-through phân tích dịch chuyển

**Tình huống**: Trong dịch COVID, cầu khẩu trang tăng đột biến (sở thích/cần thiết tăng), cung tăng chậm hơn (giới hạn năng lực sản xuất).

- Đường cầu dịch *phải* mạnh → cả \`P*\` và \`Q*\` đều tăng nhiều.
- Đường cung dịch *phải* nhưng chậm → góp phần giảm áp lực giá.

**Kết quả thực tế**: Giá khẩu trang đầu 2020 tăng 5-10 lần. Đến giữa 2021, cung đuổi kịp → giá quay lại bình thường.

#### 🔁 Dừng lại tự kiểm tra

Khi nào các sự kiện sau làm dịch chuyển *đường* (shift), khi nào chỉ di chuyển *dọc đường* (movement)?

1. Giá cà phê thế giới tăng → tác động lên thị trường cà phê.
2. Người dân chuộng đồ uống lành mạnh hơn → tác động lên thị trường nước ngọt.
3. Đường tăng giá → tác động lên thị trường nước ngọt (vì nước ngọt dùng đường).

<details>
<summary>Đáp án</summary>

1. Giá *chính* cà phê tăng → **di chuyển dọc đường** cầu/cung của cà phê (lượng cầu giảm, lượng cung tăng).
2. Sở thích thay đổi → **dịch chuyển trái đường cầu** nước ngọt (cầu giảm ở mọi mức giá).
3. Giá đầu vào tăng → **dịch chuyển trái đường cung** nước ngọt (cung giảm ở mọi mức giá).
</details>

#### 📝 Tóm tắt mục 4

- *Lượng* đổi khi giá đổi → di chuyển dọc đường.
- *Cả đường* đổi khi yếu tố khác đổi → dịch chuyển.
- Yếu tố dịch cầu: thu nhập, hàng liên quan, sở thích, kỳ vọng, số người mua.
- Yếu tố dịch cung: giá đầu vào, công nghệ, kỳ vọng, số người bán, thuế.

## 5. Can thiệp giá — trần giá và sàn giá

### 5.1. Trần giá (price ceiling)

**Trần giá** = mức giá *tối đa* hợp pháp. Chính phủ thường áp dụng để bảo vệ người mua (vd: thuê nhà ở New York, xăng dầu thời chiến).

- Nếu trần giá *trên* \`P*\` → vô tác dụng (thị trường vẫn cân bằng ở \`P*\` hợp lệ).
- Nếu trần giá *dưới* \`P*\` (binding) → tạo **thiếu hụt** (\`Q_d > Q_s\` ở mức trần).

**Walk-through**: Với cầu \`Q_d = 100 − 2P\`, cung \`Q_s = −10 + 2P\`, cân bằng \`(27.5, 45)\`. Chính phủ áp trần \`P = 20\`:

- \`Q_d\` tại \`P=20\` = \`60\`.
- \`Q_s\` tại \`P=20\` = \`30\`.
- **Thiếu hụt 30 đơn vị**.

**Hậu quả phụ**: chợ đen, xếp hàng dài, phân phối theo quan hệ thay vì giá. Đã thấy ở Liên Xô, Venezuela.

### 5.2. Sàn giá (price floor)

**Sàn giá** = mức giá *tối thiểu* hợp pháp. Ví dụ điển hình: lương tối thiểu, giá nông sản hỗ trợ.

- Nếu sàn giá *dưới* \`P*\` → vô tác dụng.
- Nếu sàn giá *trên* \`P*\` (binding) → tạo **dư cung** (\`Q_s > Q_d\` ở mức sàn).

**Walk-through**: Cùng hệ cầu/cung trên, áp sàn \`P = 35\`:

- \`Q_d\` = \`100 − 70 = 30\`.
- \`Q_s\` = \`−10 + 70 = 60\`.
- **Dư cung 30 đơn vị**.

**Trong thị trường lao động**: lương tối thiểu trên mức cân bằng → một số người muốn làm việc với lương đó nhưng không có chỗ → **thất nghiệp**.

Tuy nhiên, lương tối thiểu phức tạp hơn: nếu thị trường lao động không hoàn hảo (một số nhà tuyển dụng có quyền lực thị trường — monopsony), lương tối thiểu vừa phải có thể *tăng việc làm*. Đây là chủ đề tranh luận trong macro/labor economics.

## 6. Bài tập thực hành

### Bài 1 — Tìm cân bằng

Cho cầu \`Q_d = 200 − 5P\`, cung \`Q_s = −40 + 3P\` (Q tính theo nghìn đơn vị, P theo nghìn đồng).

- (a) Tìm \`(P*, Q*)\`.
- (b) Nếu \`P = 25k\`, có thiếu hụt hay dư thừa? Bao nhiêu?
- (c) Nếu cầu dịch phải thành \`Q_d = 240 − 5P\` (do thu nhập tăng), \`(P*, Q*)\` mới là gì?

### Bài 2 — Trần giá

Cùng hệ ở Bài 1 (gốc). Chính phủ áp trần giá \`P = 20k\` để bảo vệ người mua.

- (a) Có *binding* không?
- (b) Tính thiếu hụt.
- (c) Mô tả 2 hậu quả phụ có thể xảy ra trong thực tế.

### Bài 3 — Phân biệt shift vs movement

Với mỗi sự kiện, xác định: ảnh hưởng đến *thị trường nào*, *đường nào* (cầu/cung), *dịch chuyển hay di chuyển*, và *hướng* (phải/trái/lên/xuống).

1. Phát hiện trồng cà phê có lợi cho sức khỏe.
2. Hạn hán làm sản lượng cà phê giảm.
3. Giá trà tăng (cà phê và trà là hàng thay thế).
4. Giá cà phê thế giới tăng do nhu cầu xuất khẩu.

### Bài 4 — Phân tích chính sách

Một thành phố áp trần giá thuê nhà thấp hơn cân bằng để "bảo vệ người thuê". Phân tích trong ngắn hạn vs dài hạn:

- (a) Trong ngắn hạn (cung gần cố định), cầu - cung thay đổi thế nào?
- (b) Trong dài hạn (chủ đất có thể chuyển sang mục đích khác hoặc bỏ bê), cung thay đổi thế nào? Tác động lên thiếu hụt?
- (c) Đề xuất chính sách *tốt hơn* để giúp người thu nhập thấp có nhà.

## 7. Lời giải chi tiết

### Lời giải Bài 1

**(a)** Đặt \`Q_d = Q_s\`: \`200 − 5P = −40 + 3P\` → \`240 = 8P\` → \`P* = 30k\`. Thay vào: \`Q* = 200 − 150 = 50\` nghìn đơn vị. Kiểm tra: \`Q_s = −40 + 90 = 50\` ✓.

**(b)** \`P = 25k < P* = 30k\` → thiếu hụt. \`Q_d = 200 − 125 = 75\`; \`Q_s = −40 + 75 = 35\`. **Thiếu hụt = 75 − 35 = 40 nghìn đơn vị**.

**(c)** Cầu mới: \`240 − 5P = −40 + 3P\` → \`280 = 8P\` → \`P* = 35k\`. \`Q* = 240 − 175 = 65\` nghìn đơn vị. Cả giá và lượng đều tăng — đúng với dự đoán khi cầu dịch phải.

### Lời giải Bài 2

**(a)** Trần \`P = 20k < P* = 30k\` → **binding** (có tác động).

**(b)** Tại \`P = 20\`: \`Q_d = 200 − 100 = 100\`; \`Q_s = −40 + 60 = 20\`. **Thiếu hụt = 80 nghìn đơn vị**.

**(c)** Hậu quả phụ:

1. **Chợ đen**: người mua sẵn sàng trả giá cao hơn 20k → giao dịch lén lút ở giá cao hơn.
2. **Xếp hàng / phân phối theo quan hệ**: ai xếp hàng lâu nhất / quen biết người bán mới mua được — phân bổ nguồn lực không hiệu quả.

### Lời giải Bài 3

1. **Cà phê** — sở thích thay đổi (lợi sức khỏe) → **dịch chuyển PHẢI đường cầu** cà phê.
2. **Cà phê** — yếu tố đầu vào (sản lượng tự nhiên) giảm → **dịch chuyển TRÁI đường cung** cà phê.
3. **Cà phê** — hàng thay thế (trà) đắt hơn → **dịch chuyển PHẢI đường cầu** cà phê (chuyển từ trà sang).
4. **Cà phê** — *giá chính* tăng → **di chuyển dọc đường** cầu (lượng cầu giảm) + **di chuyển dọc đường** cung (lượng cung tăng). KHÔNG phải dịch chuyển.

### Lời giải Bài 4

**(a) Ngắn hạn**: cung gần thẳng đứng. Trần giá → giá giảm → lượng cầu tăng đột biến. Thiếu hụt nhà thuê. Người được thuê ở giá rẻ thì lợi; nhiều người khác không tìm được nhà.

**(b) Dài hạn**: cung co lại đáng kể. Chủ đất chuyển nhà sang bán, sang Airbnb (nếu được), hoặc bỏ bê không sửa chữa (vì doanh thu thấp). Đường cung dịch *trái* → thiếu hụt *trầm trọng hơn* về lâu dài. Nhà thuê chất lượng kém đi (vì chủ không có incentive sửa). Đây là kịch bản nhiều thành phố Mỹ và châu Âu đã chứng kiến (San Francisco, Stockholm).

**(c) Chính sách tốt hơn**:

- **Trợ cấp tiền thuê (housing voucher)** trực tiếp cho người thu nhập thấp → tăng *cầu của họ* mà không méo mó giá thị trường.
- **Tăng cung** bằng giảm hạn chế xây dựng, cho phép mật độ cao hơn (zoning reform) → giảm \`P*\` cân bằng.
- **Xây nhà ở xã hội** ngoài thị trường tự do.

Tất cả các phương án này tốn ngân sách nhưng không tạo thiếu hụt như trần giá.

## 8. Liên kết và bài tiếp theo

- **Bài tiếp theo**: [Lesson 03 — Độ co giãn](../lesson-03-elasticity/) — định lượng "cầu/cung phản ứng mạnh hay yếu với giá".
- **Bài trước**: [Lesson 01 — Tư duy như nhà kinh tế](../lesson-01-thinking-like-economist/).
- **Minh họa tương tác**: [visualization.html](./visualization.html) — vẽ cầu/cung tương tác, dịch chuyển đường, áp trần/sàn giá.
- **Tham khảo**: Mankiw, *Principles of Economics*, chương 4-6.
`;
