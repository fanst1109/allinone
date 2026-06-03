# Lesson 06 — Đánh giá bằng chứng & nguồn

> **Tầng 2 — Critical Thinking · Bài 6/8**

Bài này trả lời câu hỏi thực tiễn nhất trong tư duy phản biện: **khi ai đó đưa ra một con số, một nghiên cứu, một câu chuyện — ta đánh giá độ tin cậy của nó như thế nào?** Ta sẽ thấy rằng tương quan không bao giờ tự đủ để kết luận nhân quả, một giai thoại sống động không thay thế được dữ liệu thống kê, và ngay cả nguồn được cho là "khoa học" cũng cần kiểm tra xung đột lợi ích và phương pháp.

## Mục tiêu học tập

Sau bài này, bạn có thể:

- Giải thích tại sao tương quan (correlation) không kéo theo nhân quả (causation) và chỉ ra ba khả năng thay thế.
- Nhận diện biến gây nhiễu (confounder), nhân quả ngược (reverse causation) và tương quan giả (spurious correlation).
- Phân biệt giai thoại (anecdote) với dữ liệu tổng thể và biết khi nào giai thoại có giá trị bổ sung.
- Nhận ra cherry-picking bằng cách tự hỏi "dữ liệu nào bị giấu đi?".
- Đánh giá một nguồn theo 6 tiêu chí: sơ/thứ cấp, chuyên môn, xung đột lợi ích, bình duyệt, ngày tháng, phương pháp.
- Biết cỡ mẫu và tính đại diện ảnh hưởng đến sức mạnh của kết luận như thế nào.

## Kiến thức tiền đề

- [Lesson 05 — Thiên kiến nhận thức](../lesson-05-cognitive-biases/) — đặc biệt availability bias (giai thoại sống động lấn át số liệu) và confirmation bias (xu hướng tìm bằng chứng ủng hộ).
- Khái niệm phân phối, trung bình, phương sai — xem [Inferential Statistics](../../../Statistics/02-Inferential/) nếu cần ôn.
- Thiết kế thí nghiệm và nhân quả — xem [Advanced Statistics](../../../Statistics/03-Advanced/) để hiểu sâu hơn về RCT và quasi-experiment.

---

## 1. Tương quan ≠ nhân quả

> 💡 **Trực giác.** Mùa hè đến, kem được bán nhiều hơn. Cũng mùa hè đó, số vụ đuối nước tăng lên. Nếu vẽ đồ thị doanh số kem và số vụ đuối nước theo tuần, ta thấy hai đường đi lên cùng nhau — tương quan dương rất đẹp. Có nên cấm bán kem để giảm đuối nước không? Tất nhiên là không — vì đây là ví dụ kinh điển nhất về tương quan không phải nhân quả.

**Tương quan (correlation)** là hiện tượng hai biến số X và Y cùng biến thiên — khi X tăng, Y có xu hướng tăng (tương quan dương) hoặc giảm (tương quan âm). Tương quan được đo bằng hệ số r ∈ [−1, 1].

**Nhân quả (causation)** là quan hệ mạnh hơn nhiều: X *gây ra* Y. Thay đổi X dẫn đến thay đổi Y.

Vấn đề: **tương quan mạnh (kể cả r = 0.95) KHÔNG đủ để kết luận nhân quả.** Khi X và Y có tương quan, có bốn khả năng:

| Khả năng | Mô tả | Ví dụ |
|----------|-------|-------|
| **X → Y** | X gây Y | Hút thuốc → ung thư phổi (đã chứng minh qua RCT) |
| **Y → X** | Nhân quả ngược | Bệnh trầm cảm ↔ mất ngủ: có thể ngủ kém *gây* trầm cảm, hoặc trầm cảm *gây* mất ngủ — phải nghiên cứu longitudinal mới rõ |
| **Z → X và Z → Y** | Biến gây nhiễu Z | Nhiệt độ (Z) → kem (X) và nhiệt độ (Z) → đuối nước (Y) |
| **Trùng hợp** | Spurious correlation | Số phim Nicolas Cage ra mắt mỗi năm tương quan cao với số người chết đuối trong bồn tắm ở Mỹ |

### 1.1 Biến gây nhiễu (confounder)

> 💡 **Hình dung.** Z là "nguyên nhân chung" ẩn phía sau cả X lẫn Y. Khi ta nhìn X và Y thấy tương quan, thực ra đó là bóng của Z chiếu lên cả hai.

**Ví dụ 1 — Kem và đuối nước (ví dụ kinh điển):**
- X = doanh số kem (tuần), Y = số vụ đuối nước (tuần), Z = nhiệt độ trung bình.
- Nhiệt độ cao → người mua kem nhiều hơn (X tăng). Nhiệt độ cao → nhiều người đi tắm sông/biển → xác suất đuối nước cao hơn (Y tăng).
- Khi kiểm soát Z (phân tích riêng từng mùa, hoặc đưa nhiệt độ vào mô hình hồi quy), tương quan X↔Y biến mất.

**Ví dụ 2 — Tăng trưởng kinh tế và tỷ lệ béo phì:**
- Nhiều nghiên cứu thấy nước giàu hơn có tỷ lệ béo phì cao hơn (tương quan dương).
- Biến nhiễu có thể là: thu nhập → ăn thức ăn chế biến sẵn nhiều hơn + ít lao động chân tay → béo phì. Bản thân GDP không "gây" béo phì trực tiếp.

> ❓ **Câu hỏi tự nhiên.**
> - *"Làm sao phân biệt được Z thật sự là confounder hay chỉ là giả thuyết?"* — Cần kiểm soát Z trong phân tích (statistical control), hoặc tốt hơn là thiết kế thí nghiệm ngẫu nhiên (RCT) để loại bỏ ảnh hưởng của Z.
> - *"Có thể có nhiều hơn một confounder không?"* — Hoàn toàn có thể. Thực tế xã hội học thường có hàng chục biến nhiễu tiềm năng — đây là lý do tại sao nghiên cứu quan sát phức tạp hơn thí nghiệm có kiểm soát.

### 1.2 Nhân quả ngược (reverse causation)

> 💡 **Hình dung.** Ta thấy bệnh nhân trầm cảm thường xuyên mất ngủ. Liệu mất ngủ gây trầm cảm, hay trầm cảm gây mất ngủ? Chỉ nhìn vào sự tồn tại đồng thời của hai hiện tượng không trả lời được câu hỏi này.

**Ví dụ 3 — Bệnh viện và tỷ lệ tử vong:**
- Người ta thấy bệnh nhân ở bệnh viện có tỷ lệ tử vong cao hơn người không ở bệnh viện. Nếu kết luận "bệnh viện gây chết người" → sai hoàn toàn. Hướng nhân quả là ngược: người bệnh nặng (tình trạng tệ hơn) mới vào bệnh viện → nhân quả đi từ "bệnh nặng → vào viện" chứ không phải "vào viện → bệnh nặng".

**Ví dụ 4 — Lương cao và hài lòng công việc:**
- Một công ty thấy nhân viên hài lòng cao có xu hướng được trả lương cao hơn. Hai giả thuyết đều có lý: (a) lương cao → hài lòng hơn, (b) người có kỹ năng tốt → hài lòng hơn với công việc VÀ được trả lương cao hơn. Chỉ tương quan không phân biệt được.

> ⚠ **Lỗi thường gặp: chọn chiều nhân quả theo mong muốn.** Ai muốn tăng lương sẽ dùng ví dụ (a); ai muốn tuyển nhân viên giỏi sẽ dùng (b). Cả hai đều có thể đúng một phần — nhưng không có thiết kế nghiên cứu phù hợp thì không kết luận được.

### 1.3 Tương quan giả (spurious correlation)

Hai biến số có thể tương quan cao hoàn toàn do trùng hợp thống kê, đặc biệt khi cả hai đều tăng theo thời gian (xu hướng chung) hoặc khi có quá nhiều biến số được kiểm tra đồng thời (vấn đề "multiple comparisons").

**Ví dụ kinh điển (Tyler Vigen, spuriouscorrelations.com):**
- Số phim Nicolas Cage ra mắt mỗi năm (1999–2009): r ≈ 0.67 với số người chết đuối trong bồn tắm tại Mỹ.
- Tiêu thụ pho mát bình quân đầu người tại Mỹ: r ≈ 0.95 với số người chết do bị chăn/ga/gối cuốn.

> ⚠ **Tương quan mạnh vẫn KHÔNG đủ kết luận nhân quả.** r = 0.9 ấn tượng nhưng không nói gì về cơ chế nhân quả. Câu hỏi phải hỏi là: "có cơ chế sinh học/xã hội/vật lý hợp lý nào giải thích X → Y không?" Nếu không, nghi ngờ spurious.

### 1.4 Tiêu chí gợi ý nhân quả (Hill's criteria — sơ lược)

Khi nào ta có thể bắt đầu tin rằng X *có thể* gây Y? Austin Bradford Hill (1965) đề xuất 9 tiêu chí, trong đó quan trọng nhất:

1. **Thứ tự thời gian (temporality)**: X phải xảy ra *trước* Y.
2. **Mạnh (strength)**: hiệu ứng lớn khó giải thích bằng nhiễu.
3. **Nhất quán (consistency)**: nhiều nghiên cứu độc lập cho cùng kết quả.
4. **Liều-đáp ứng (dose-response)**: X tăng thì Y tăng tỷ lệ.
5. **Cơ chế sinh học (plausibility)**: có lý thuyết giải thích cơ chế không?
6. **Thí nghiệm (experiment)**: can thiệp vào X có làm thay đổi Y không?

**Tiêu chuẩn vàng: RCT (Randomized Controlled Trial — thí nghiệm có đối chứng ngẫu nhiên).** Phân ngẫu nhiên đối tượng vào nhóm "có X" và "không có X", đo Y sau đó. Nếu nhóm có X có Y khác biệt có ý nghĩa thống kê → bằng chứng mạnh nhất hiện có cho nhân quả.

> 📝 **Tóm tắt mục 1.**
> - Tương quan ≠ nhân quả: ba khả năng thay thế là confounder, nhân quả ngược, và trùng hợp.
> - Confounder (biến gây nhiễu) Z gây cả X lẫn Y, tạo tương quan giả giữa X và Y.
> - Nhân quả ngược: Y → X thay vì X → Y — cần thiết kế longitudinal hoặc thí nghiệm để phân biệt.
> - Tương quan mạnh (r gần 1) vẫn không đủ — cần cơ chế và thí nghiệm kiểm soát.
> - Tiêu chuẩn vàng cho nhân quả: RCT.

> 🔁 **Dừng lại tự kiểm tra.**
> Một nghiên cứu thấy: trẻ em có nhiều sách trong nhà học tốt hơn ở trường (tương quan dương). Một nhà hoạt động đề xuất: "Hãy tặng sách cho mọi gia đình để nâng cao thành tích học tập."
> 1. Đề xuất này giả định quan hệ nhân quả nào?
> 2. Hãy chỉ ra ít nhất một confounder có thể giải thích tương quan.
> 3. Cần thí nghiệm như thế nào để kiểm tra đề xuất?
>
> <details><summary>Đáp án</summary>
>
> 1. Đề xuất giả định: sách (X) → thành tích học tập (Y). Tức là "có sách" là nguyên nhân.
> 2. Confounder Z có thể là: thu nhập gia đình (nhà giàu → mua nhiều sách VÀ có điều kiện hỗ trợ học tập tốt hơn); trình độ học vấn của cha mẹ (cha mẹ học cao → mua sách VÀ dạy con tốt hơn).
> 3. RCT: phân ngẫu nhiên các gia đình có điều kiện tương đồng thành hai nhóm — nhóm thực nghiệm được tặng sách, nhóm đối chứng không được tặng — theo dõi thành tích học tập sau 1–2 năm. (Thực tế: các RCT như vậy đã được thực hiện — kết quả cho thấy việc tặng sách đơn thuần có hiệu ứng nhỏ hơn nhiều so với can thiệp giáo dục toàn diện, ủng hộ giả thuyết confounder quan trọng.)
> </details>

---

## 2. Cherry-picking — chọn lọc thiên lệch

> 💡 **Hình dung.** Hãy tưởng tượng một cây táo có 100 quả: 30 quả đỏ đẹp và 70 quả xanh chưa chín. Người bán hái 10 quả đỏ nhất ra trưng bày và nói "xem, táo của tôi đỏ đẹp cả!" Đây là cherry-picking: chỉ chọn dữ liệu ủng hộ, giấu phần còn lại.

**Cherry-picking** (hay selective reporting) là hành động chỉ trình bày dữ liệu hoặc bằng chứng ủng hộ luận điểm, trong khi có chủ ý hoặc vô ý bỏ qua dữ liệu không ủng hộ hoặc bác bỏ luận điểm đó.

Cherry-picking có thể xảy ra ở nhiều cấp độ:

- **Cấp dữ liệu**: chọn một vài điểm dữ liệu thuận lợi từ tập lớn hơn.
- **Cấp nghiên cứu**: chỉ trích dẫn các nghiên cứu ủng hộ, bỏ qua nghiên cứu ngược lại (publication bias — bài có kết quả "có ý nghĩa" dễ được đăng hơn).
- **Cấp thời gian**: chọn khoảng thời gian thuận lợi trong đồ thị ("từ năm X đến Y, nhiệt độ không tăng").

**Ví dụ 1 — Chứng khoán:**
Một quỹ đầu tư quảng cáo: "Danh mục A của chúng tôi tăng 40% năm ngoái!" — mà không đề cập danh mục B giảm 25%, danh mục C giảm 15%. Hiệu suất trung bình thực ra âm, nhưng con số được chọn ra trông ấn tượng.

**Ví dụ 2 — Biến đổi khí hậu:**
Lập luận: "Từ 1998 đến 2012, nhiệt độ Trái Đất không tăng — bằng chứng là biến đổi khí hậu bị phóng đại." Năm 1998 là năm El Niño cực mạnh, nhiệt độ đỉnh bất thường — chọn điểm xuất phát này cố tình làm slope trông phẳng. Nhìn toàn chuỗi 1880–nay: xu hướng tăng rõ ràng.

**Ví dụ 3 — Thực phẩm chức năng:**
"Nghiên cứu của TS. X chứng minh sản phẩm Y tăng trí nhớ 30%." Không đề cập: nghiên cứu đó có 12 người, không có nhóm đối chứng, và 5 nghiên cứu khác (có nhóm đối chứng, mẫu lớn hơn) không tìm thấy hiệu quả nào.

> ❓ **Câu hỏi tự nhiên.**
> - *"Cherry-picking vô tình (confirmation bias) và cố ý có khác nhau về hậu quả không?"* — Hậu quả nhận thức như nhau — đều là kết luận sai từ bằng chứng lệch. Cố ý thêm vấn đề đạo đức. Liên hệ: confirmation bias (L05) là phiên bản vô thức của cherry-picking.
> - *"Trích dẫn một nghiên cứu đúng nhưng đại diện cho quan điểm thiểu số — có phải cherry-pick không?"* — Có, nếu không tiết lộ rằng đây là thiểu số. Phải cung cấp bức tranh toàn cảnh (meta-analysis, systematic review) chứ không chỉ một nghiên cứu thuận lợi.

> ⚠ **Câu hỏi chống cherry-pick.** Khi ai đó trích dẫn một con số hoặc nghiên cứu, hãy hỏi: *"Còn dữ liệu nào khác liên quan mà bạn chưa đề cập? Các nghiên cứu khác về cùng chủ đề nói gì? Tập dữ liệu đầy đủ trông như thế nào?"*

> 🔁 **Dừng lại tự kiểm tra.**
> Một ứng viên chính trị nói: "Trong nhiệm kỳ của tôi, tỷ lệ thất nghiệp giảm từ 8% xuống 5%." Dữ liệu đầy đủ: khi ông nhậm chức, tỷ lệ thất nghiệp đang ở đỉnh chu kỳ kinh tế tự nhiên (sau khủng hoảng); xu hướng giảm đã bắt đầu trước nhiệm kỳ ông; các nước khác trong khu vực cùng thời điểm cũng giảm tương tự.
> 1. Ứng viên có đang cherry-pick không? Giải thích.
> 2. Dữ liệu nào cần thiết để đánh giá công bằng?
>
> <details><summary>Đáp án</summary>
>
> 1. Có — ứng viên chọn con số thật (5% đúng là thấp hơn 8%) nhưng bỏ qua bối cảnh: (a) xu hướng đã bắt đầu trước nhiệm kỳ (temporal cherry-picking); (b) yếu tố quốc tế/chu kỳ kinh tế (confounder). Câu phát biểu đúng về con số nhưng gây ấn tượng nhân quả không được chứng minh.
> 2. Cần: đồ thị tỷ lệ thất nghiệp cả giai đoạn dài (trước và sau nhiệm kỳ); so sánh với các nước/khu vực tương đồng; phân tích yếu tố nào khác thay đổi trong cùng thời gian.
> </details>

> 📝 **Tóm tắt mục 2.**
> - Cherry-picking = chọn dữ liệu ủng hộ, giấu dữ liệu còn lại — tạo ấn tượng sai về bức tranh toàn cảnh.
> - Xảy ra ở cấp dữ liệu, cấp nghiên cứu, cấp thời gian.
> - Phòng chống: tìm systematic review/meta-analysis; hỏi "còn dữ liệu nào khác?"; xem xét toàn bộ khoảng thời gian.

---

## 3. Giai thoại vs dữ liệu

> 💡 **Hình dung.** Hãy nghĩ đến một loại thuốc chữa ung thư chưa được kiểm chứng. Hàng ngàn bệnh nhân dùng thuốc đó, 950 người không thuyên giảm, 50 người khỏi bệnh. 50 người đó đến chia sẻ câu chuyện hồi phục kỳ diệu — báo chí đưa tin, người xem cảm động. 950 người kia im lặng (hoặc đã mất). Ta nghe 50 giai thoại sinh động và tưởng thuốc hiệu quả — trong khi thực tế hiệu quả chỉ 5% (có thể không khác gì hồi phục tự nhiên).

**Giai thoại (anecdote)** là câu chuyện cá nhân hoặc trường hợp đơn lẻ. Giai thoại có giá trị để:
- Hình thành giả thuyết cần kiểm tra.
- Minh họa trải nghiệm cá nhân (không phải kết luận tổng quát).
- Tạo sự đồng cảm và hiểu ngữ cảnh.

Giai thoại **không đủ** để:
- Rút ra kết luận về tỷ lệ, xác suất, hiệu quả trung bình của tổng thể.
- Bác bỏ thống kê dân số lớn.
- Làm cơ sở cho chính sách.

**Ví dụ 1 — "Ông tôi hút thuốc tới 90 tuổi":**
- Đây là một giai thoại thật — có người hút thuốc và sống thọ.
- Điều này không bác bỏ thống kê: hút thuốc trung bình làm giảm 10 năm tuổi thọ và tăng nguy cơ ung thư phổi gấp 15–25 lần (dữ liệu từ nghiên cứu trên hàng triệu người).
- Ông bạn là outlier may mắn — outlier không vô hiệu hóa xu hướng chung.

**Ví dụ 2 — Phụ huynh và vaccine:**
- Một phụ huynh thấy con bắt đầu có triệu chứng tự kỷ vài tuần sau khi tiêm vaccine → kết luận "vaccine gây tự kỷ".
- Đây là giai thoại + post hoc ergo propter hoc (sau cái này nên do cái này). Tự kỷ thường được phát hiện ở độ tuổi 18–24 tháng — cùng thời điểm lịch tiêm chủng, nên trùng hợp thời gian.
- Dữ liệu: hàng chục nghiên cứu lớn trên hàng triệu trẻ em, không tìm thấy mối liên hệ.

**Ví dụ 3 — Liệu pháp thay thế:**
Ai đó bị đau lưng mãn tính, thử châm cứu, vài tuần sau hết đau → "châm cứu chữa được đau lưng của tôi." Vấn đề:
- Đau lưng mãn tính thường tự khỏi theo chu kỳ (regression to the mean).
- Hiệu ứng placebo có thực, đặc biệt với đau.
- Câu chuyện cá nhân không phân biệt được điều nào trong số này với hiệu quả thật của châm cứu.

**Ví dụ 4 — Giai thoại có giá trị bổ sung:**
Một bác sĩ báo cáo ca lâm sàng hiếm gặp: bệnh nhân có triệu chứng X lạ sau khi dùng thuốc Y — dữ liệu thử nghiệm lâm sàng trước đó không thấy vì mẫu không đủ lớn để phát hiện tác dụng phụ hiếm. Giai thoại (case report) này kích hoạt nghiên cứu tiếp theo. Đây là vai trò hợp lệ của giai thoại: **báo hiệu cần điều tra**, không phải **kết luận cuối cùng**.

> ⚠ **Availability bias làm giai thoại mạnh hơn thực tế.** (Liên hệ L05) Câu chuyện cụ thể, sống động, cảm xúc cao → dễ nhớ và dễ thuyết phục hơn thống kê trừu tượng. Bộ não ta thiên về câu chuyện cá nhân, không phải xác suất. Nhận biết điều này để tự điều chỉnh khi đánh giá bằng chứng.

> 🔁 **Dừng lại tự kiểm tra.**
> Một người bạn kể: "Tôi không đeo dây an toàn khi lái xe 20 năm và chưa bao giờ gặp tai nạn nào cần dây an toàn. Đeo hay không đeo không quan trọng."
> 1. Đây là loại bằng chứng gì?
> 2. Lỗi lập luận nào đang xảy ra?
> 3. Dữ liệu nào sẽ phản bác lập luận này?
>
> <details><summary>Đáp án</summary>
>
> 1. Giai thoại cá nhân — một trường hợp đơn lẻ.
> 2. (a) Survivorship bias: người bị tai nạn chết hoặc không chia sẻ câu chuyện "không đeo dây và bị thương nặng". (b) Từ "chưa xảy ra với tôi" rút ra "không cần thiết" — lỗi inductive generalization quá mức từ n=1. (c) Không kiểm soát được base rate: bao nhiêu % chuyến đi có va chạm đủ mạnh để cần dây an toàn?
> 3. Dữ liệu: tỷ lệ tử vong và thương tật nặng trong tai nạn xe hơi ở nhóm đeo và không đeo dây an toàn (nghiên cứu trên hàng triệu ca tai nạn — dây an toàn giảm khoảng 45% nguy cơ tử vong).
> </details>

> 📝 **Tóm tắt mục 3.**
> - Giai thoại = bằng chứng cấp độ thấp nhất: có thể gợi giả thuyết, không thể kết luận tổng quát.
> - "Ông tôi hút thuốc sống 90 tuổi" không bác bỏ thống kê về tác hại thuốc lá.
> - Availability bias khiến giai thoại cảm giác thuyết phục hơn dữ liệu — cần chủ động điều chỉnh.
> - Vai trò hợp lệ của giai thoại: báo hiệu cần điều tra, không phải kết luận cuối cùng.

---

## 4. Cỡ mẫu & tính đại diện

> 💡 **Hình dung.** Bạn muốn biết người Việt Nam trung bình cao bao nhiêu. Bạn đo 10 người bạn bè — tất cả là cầu thủ bóng rổ (trung bình 195cm). Kết quả: "người Việt trung bình cao 195cm." Cỡ mẫu nhỏ (10 người) và mẫu lệch (chỉ cầu thủ bóng rổ) cho kết luận sai hoàn toàn.

**Cỡ mẫu (sample size)** ảnh hưởng đến:
- **Độ chính xác (precision)**: mẫu lớn hơn → khoảng tin cậy hẹp hơn → ước lượng chính xác hơn.
- **Khả năng phát hiện hiệu ứng nhỏ (statistical power)**: mẫu nhỏ không đủ để phát hiện hiệu ứng nhỏ, dù hiệu ứng đó có tồn tại.

**Tính đại diện (representativeness)** ảnh hưởng đến:
- Khả năng tổng quát hóa kết quả từ mẫu sang tổng thể.

**Ví dụ 1 — Nghiên cứu thuốc với n=12:**
Nếu một thử nghiệm thuốc có 12 người — kể cả kết quả "p < 0.05" — kết luận yếu vì:
- Cỡ mẫu quá nhỏ, dễ bị ảnh hưởng bởi ngẫu nhiên.
- Không đủ power để phát hiện tác dụng phụ hiếm.
- Rất khó đảm bảo 12 người đại diện cho đa dạng di truyền, giới tính, tuổi, bệnh nền...

**Ví dụ 2 — Khảo sát trực tuyến:**
Một trang web đăng khảo sát "Bạn có ủng hộ chính sách X không?" — 10.000 người trả lời, 70% nói "có". Vấn đề: người trả lời là fan của trang đó, tự chọn vào khảo sát (self-selection bias) — không đại diện cho dân số chung.

**Ví dụ 3 — "Nghiên cứu y học" trên sinh viên đại học Mỹ:**
Một lượng lớn nghiên cứu tâm lý học và hành vi được thực hiện trên sinh viên đại học Mỹ (WEIRD: Western, Educated, Industrialized, Rich, Democratic). Kết quả không nhất thiết tổng quát hóa sang các nền văn hóa khác — vấn đề tính đại diện cấp văn hóa.

**Ví dụ 4 — Khảo sát qua điện thoại cố định (1936):**
Literary Digest dự đoán cuộc bầu cử Mỹ 1936 từ 2.4 triệu phiếu trả lời (n cực lớn!) nhưng mẫu lấy từ danh sách điện thoại và đăng ký xe hơi — vốn thiên về người giàu. Kết quả: dự đoán sai hoàn toàn. Bài học: **n lớn không bù được mẫu lệch**.

> ❓ **Câu hỏi tự nhiên.**
> - *"Cỡ mẫu bao nhiêu là đủ?"* — Phụ thuộc vào: độ biến thiên của tổng thể, kích thước hiệu ứng muốn phát hiện, mức ý nghĩa thống kê và power mong muốn. Công thức tính cỡ mẫu là nội dung của [Inferential Statistics](../../../Statistics/02-Inferential/). Nguyên tắc thô: nghiên cứu lâm sàng thường cần n ≥ 30–100 mỗi nhóm để có kết luận cơ bản.
> - *"p < 0.05 có đảm bảo kết quả đúng không?"* — Không. p < 0.05 chỉ nói: nếu giả thuyết null đúng, xác suất thấy kết quả này (hoặc cực đoan hơn) là < 5%. Với nhiều nghiên cứu đồng thời (multiple testing), xác suất ít nhất một kết quả "dương tính giả" tăng lên đáng kể.

> 🔁 **Dừng lại tự kiểm tra.**
> Một công ty mỹ phẩm quảng cáo: "92% người dùng thấy da sáng hơn sau 4 tuần." Bạn được biết nghiên cứu được thực hiện trên 25 người do công ty tự tuyển chọn, tất cả là phụ nữ, tuổi 25–35, tự đánh giá kết quả.
> 1. Chỉ ra ít nhất 3 vấn đề về cỡ mẫu/tính đại diện/phương pháp.
> 2. Bạn cần thông tin gì thêm để đánh giá con số 92%?
>
> <details><summary>Đáp án</summary>
>
> 1. Vấn đề: (a) Cỡ mẫu nhỏ (n=25) — kết quả không ổn định thống kê. (b) Mẫu lệch — chỉ phụ nữ 25–35, không đại diện cho người dùng rộng hơn. (c) Tự đánh giá (self-reported) — thiên lệch do kỳ vọng (expectation bias); không có nhóm đối chứng (placebo group); không mù đôi (double-blind). (d) Công ty tự tuyển chọn — không phải mẫu ngẫu nhiên; người tham gia có thể được khuyến khích báo cáo tích cực (xung đột lợi ích).
> 2. Cần: nhóm đối chứng (dùng kem không hoạt chất) để loại hiệu ứng placebo; đo lường khách quan (colorimetry, không phải tự đánh giá); cỡ mẫu lớn hơn và đa dạng hơn; nghiên cứu độc lập (không do công ty tài trợ hay thực hiện).
> </details>

> 📝 **Tóm tắt mục 4.**
> - Mẫu nhỏ → khoảng tin cậy rộng → kết luận yếu và dễ bị nhiễu.
> - Mẫu lệch → kết quả không tổng quát hóa được, dù n rất lớn.
> - p < 0.05 không phải bảo đảm chân lý — cần xem kích thước hiệu ứng, power, và replication.
> - Hỏi: "Ai được chọn vào mẫu? Ai bị bỏ sót?"

---

## 5. Đánh giá nguồn

> 💡 **Hình dung.** Cũng như bạn đánh giá một nhân chứng ở tòa án — họ có mặt ở hiện trường không? Họ có lý do để nói dối không? Họ có năng lực phán đoán không? — bạn đánh giá một nguồn thông tin theo các tiêu chí tương tự.

### 5.1 Nguồn sơ cấp vs thứ cấp

**Nguồn sơ cấp (primary source)**: báo cáo trực tiếp về nghiên cứu gốc — bài báo khoa học peer-reviewed, dữ liệu thô, bản thảo gốc, phỏng vấn trực tiếp.

**Nguồn thứ cấp (secondary source)**: giải thích, tóm tắt, phân tích nguồn sơ cấp — bài báo phổ biến khoa học, sách giáo khoa, báo cáo tổng hợp.

**Nguồn tam cấp**: tổng hợp thứ cấp — Wikipedia, bách khoa toàn thư.

Ví dụ:
- Nguồn sơ cấp: bài báo gốc "Smoking and Carcinoma of the Lung" (Doll & Hill, 1950, British Medical Journal).
- Nguồn thứ cấp: bài trên báo "Nghiên cứu mới chứng minh thuốc lá gây ung thư" tóm tắt nghiên cứu đó.
- Nguồn tam cấp: bài Wikipedia về tác hại của thuốc lá trích dẫn cả hai.

> ⚠ **Lỗi phổ biến: tin nguồn thứ cấp hơn nguồn sơ cấp.** Báo chí thường đơn giản hóa, phóng đại, hoặc hiểu sai nghiên cứu. Tiêu đề "Cà phê giúp sống thọ hơn!" thường không khớp với nghiên cứu gốc nói "quan sát thấy tương quan nhỏ giữa tiêu thụ cà phê và tử vong thấp hơn ở một nhóm dân số cụ thể, cần nghiên cứu thêm."

### 5.2 Chuyên môn và thẩm quyền

Ai đang nói là quan trọng — nhưng không theo nghĩa "argument from authority" (ngụy biện). Ta quan tâm chuyên môn vì:
- Người có đào tạo chuyên sâu về lĩnh vực đó ít có khả năng mắc lỗi cơ bản hơn.
- Họ biết các nghiên cứu hiện có và tranh luận trong lĩnh vực.

Câu hỏi cần đặt:
1. Chuyên môn của họ có **liên quan trực tiếp** đến tuyên bố không? (Bác sĩ tim mạch không phải chuyên gia về vaccine học.)
2. Họ có được **cộng đồng chuyên môn** tương ứng công nhận không?
3. Tuyên bố của họ có **nhất quán với đồng thuận khoa học** (scientific consensus) không? Nếu đi ngược đồng thuận, mức độ bằng chứng cần cao hơn nhiều.

> ⚠ **Chuyên gia nói sai chuyên ngành của họ.** Một nhà vật lý lý thuyết có thể sai hoàn toàn về dinh dưỡng học. Một bác sĩ phẫu thuật có thể có quan điểm sai về chính sách y tế công cộng. Chuyên môn không chuyển được tự do sang lĩnh vực khác.

### 5.3 Xung đột lợi ích (conflict of interest)

Ai tài trợ cho nghiên cứu? Ai được lợi nếu kết quả theo chiều nào?

**Ví dụ kinh điển — Công ty thuốc lá:**
Từ thập niên 1950–1990, các công ty thuốc lá tài trợ hàng chục nghiên cứu nội bộ "không tìm thấy bằng chứng" thuốc lá gây hại, trong khi biết rõ kết quả ngược lại từ nghiên cứu nội bộ của chính họ (tài liệu nội bộ bị công khai sau vụ kiện).

**Ví dụ 2 — Nghiên cứu ngành thực phẩm:**
Meta-analysis năm 2016 (PLOS Medicine) thấy nghiên cứu về đồ uống có đường được tài trợ bởi ngành công nghiệp có xác suất gấp 5 lần kết luận "không liên quan đến béo phì" so với nghiên cứu độc lập.

Câu hỏi cần đặt: "Ai tài trợ cho nghiên cứu này? Ai có lợi ích tài chính từ kết quả theo chiều nào? Có disclosure (công bố xung đột lợi ích) không?"

> ❓ **Câu hỏi tự nhiên.**
> - *"Nghiên cứu do ngành công nghiệp tài trợ có nhất thiết là sai không?"* — Không nhất thiết. Nhưng xung đột lợi ích là lý do để đòi hỏi mức độ kiểm chứng cao hơn, tìm nghiên cứu độc lập, và chú ý xem dữ liệu đầy đủ có được công bố không.
> - *"Peer review có loại bỏ được xung đột lợi ích không?"* — Một phần. Peer review giúp bắt lỗi phương pháp, không nhất thiết bắt được manipulation tinh vi hoặc selective reporting trước khi bài được gửi đi.

### 5.4 Bình duyệt (peer review)

**Peer review** là quá trình bài báo khoa học được đánh giá bởi các chuyên gia độc lập trước khi đăng. Đây là tiêu chuẩn tối thiểu cho bằng chứng khoa học — nhưng không phải bảo đảm tuyệt đối.

Peer review giúp:
- Bắt lỗi phương pháp và lập luận cơ bản.
- Đảm bảo bài đáp ứng tiêu chuẩn tối thiểu của lĩnh vực.

Peer review **không đảm bảo**:
- Nghiên cứu là đúng (nhiều kết quả không replicable).
- Không có gian lận dữ liệu (peer reviewer không có dữ liệu gốc).
- Không có predatory journal (tạp chí thu tiền, review không thực chất).

**Replication crisis**: nhiều kết quả nổi tiếng trong tâm lý học, y học, kinh tế học không được tái lập khi thử nghiệm lại bởi nhóm độc lập — ước tính chỉ ~36–60% kết quả tâm lý học replicable (Open Science Collaboration, 2015).

### 5.5 Ngày tháng và phương pháp

- **Ngày tháng**: khoa học tiến triển — bằng chứng tốt hơn thay thế bằng chứng cũ. Nghiên cứu từ 1985 về dinh dưỡng có thể đã bị lật ngược bởi nghiên cứu sau này.
- **Phương pháp**: quan sát hay thí nghiệm? Cross-sectional hay longitudinal? Mù đôi (double-blind) hay không? Placebo-controlled hay không? Cỡ mẫu bao nhiêu? (Xem lại mục 4.)

> 📝 **Tóm tắt mục 5.**
> - Ưu tiên nguồn sơ cấp (peer-reviewed original research) hơn thứ cấp (báo chí, blog).
> - Kiểm tra chuyên môn có phù hợp không — chuyên gia lĩnh vực A không phải chuyên gia lĩnh vực B.
> - Xem xét xung đột lợi ích — ai tài trợ, ai được lợi.
> - Peer review là tiêu chuẩn tối thiểu, không phải bảo đảm tuyệt đối.
> - Ngày tháng và phương pháp nghiên cứu ảnh hưởng trực tiếp đến độ tin cậy.

> 🔁 **Dừng lại tự kiểm tra.**
> Bạn đọc một tin: "Thực phẩm hữu cơ bổ dưỡng hơn thực phẩm thông thường — theo Tiến sĩ Smith, nhà sáng lập công ty thực phẩm hữu cơ XYZ." Tiến sĩ Smith có bằng hóa học, nghiên cứu được đăng trên tạp chí "Journal of Organic Wellness" (do công ty XYZ xuất bản).
> 1. Liệt kê tất cả các dấu hiệu cần nghi ngờ trong trường hợp này.
> 2. Bạn cần tìm nguồn nào để đánh giá tuyên bố này?
>
> <details><summary>Đáp án</summary>
>
> 1. Dấu hiệu: (a) Xung đột lợi ích rõ ràng: người phát biểu là người sáng lập và có lợi ích tài chính trực tiếp từ kết quả "thực phẩm hữu cơ tốt hơn". (b) Tạp chí do công ty tự xuất bản — không có peer review độc lập thực sự. (c) Bằng hóa học có thể liên quan nhưng không phải chuyên môn dinh dưỡng học — cần kiểm tra chuyên môn cụ thể. (d) "Journal of Organic Wellness" không phải tạp chí peer-reviewed uy tín — dấu hiệu predatory journal hoặc trade publication.
> 2. Cần tìm: systematic review và meta-analysis độc lập về thực phẩm hữu cơ vs thông thường trên tạp chí y học/dinh dưỡng uy tín (ví dụ: Annals of Internal Medicine, American Journal of Clinical Nutrition); xem đồng thuận của các tổ chức y tế độc lập (WHO, các hội dinh dưỡng học chuyên ngành).
> </details>

---

## Bài tập

**Bài 1.** Một nghiên cứu quan sát thấy: học sinh trường tư thục đạt điểm thi đại học cao hơn học sinh trường công lập (tương quan dương). Nhà báo đưa tin: "Trường tư thục dạy tốt hơn trường công lập."
1. Hãy đề xuất ít nhất ba confounder có thể giải thích tương quan này.
2. Nhân quả ngược trong trường hợp này có thể xảy ra không? Giải thích.
3. Thiết kế một nghiên cứu tốt hơn để kiểm tra tuyên bố "trường tư thục dạy tốt hơn".

**Bài 2.** Một diễn giả trình bày: "Trong 10 năm qua, mỗi năm chúng tôi tăng ngân sách marketing, và mỗi năm doanh số đều tăng. Rõ ràng marketing là nguyên nhân tăng doanh số." Phân tích lập luận này — nêu các giải thích thay thế và dữ liệu cần thêm.

**Bài 3.** Đánh giá tuyên bố sau đây và chỉ ra tất cả vấn đề về bằng chứng: "Nghiên cứu của chúng tôi trên 15 bệnh nhân cho thấy uống nước gừng mỗi ngày giảm triệu chứng đau khớp 60%. Nghiên cứu được tiến hành trong 2 tuần, bệnh nhân tự báo cáo mức độ đau, không có nhóm đối chứng. Kết quả được công bố trên website của công ty bán nước gừng."

**Bài 4.** Phân tích cherry-pick trong ví dụ sau: Công ty A ra mắt sản phẩm mới tháng 1. Doanh số tháng 1: 100 triệu. Tháng 2: 80 triệu. Tháng 3: 85 triệu. Tháng 4: 70 triệu. Tháng 5: 75 triệu. Tháng 6: 90 triệu. Báo cáo của CEO viết: "Sau giai đoạn điều chỉnh, sản phẩm phục hồi mạnh mẽ — từ tháng 4 đến tháng 6 doanh số tăng 28.6%."
1. Con số 28.6% có đúng về mặt toán học không?
2. Đây có phải cherry-picking không? Tại sao?
3. Bức tranh toàn cảnh thực sự trông như thế nào?

**Bài 5.** Áp dụng bảng kiểm 6 tiêu chí đánh giá nguồn cho tình huống sau: Bạn tìm hiểu về hiệu quả của một loại thực phẩm chức năng mới. Bạn tìm được 3 nguồn: (A) Bài đăng trên blog của người dùng, kể câu chuyện hồi phục ấn tượng; (B) Bài báo đăng trên tạp chí Journal of Nutrition (IF = 5.2), nghiên cứu mù đôi có nhóm đối chứng, n=180, tài trợ bởi quỹ nghiên cứu quốc gia, năm 2023; (C) Tóm tắt trên trang web của nhà sản xuất sản phẩm, trích dẫn "nhiều nghiên cứu" không rõ tên.
Sắp xếp A, B, C theo độ tin cậy và giải thích theo từng tiêu chí.

---

## Lời giải chi tiết

**Bài 1.**

1. **Ba confounder có thể:**
   - *Thu nhập gia đình*: gia đình giàu hơn → con học trường tư (học phí cao) VÀ có điều kiện học thêm, sách vở, thời gian ôn luyện → điểm cao hơn. Trường tư không nhất thiết là nguyên nhân.
   - *Trình độ học vấn của cha mẹ*: cha mẹ học cao hơn → chọn trường tư cho con VÀ hướng dẫn học tốt hơn → điểm cao hơn.
   - *Chọn lọc đầu vào (selection effect)*: nhiều trường tư tuyển chọn học sinh đầu vào — học sinh giỏi hơn vào trường tư → điểm cao hơn. Không phải trường tư "tạo ra" học sinh giỏi, mà là học sinh giỏi đã được chọn vào.

2. **Nhân quả ngược**: không áp dụng trực tiếp ở đây vì học sinh không thể "gây ra" việc được học trường tư. Tuy nhiên có thể có dạng biến thể: gia đình có học sinh học tốt và có động lực → chủ động chọn và trả tiền cho trường tư → điểm thi cao. Hướng nhân quả thực ra là: học sinh có năng lực + gia đình có định hướng → chọn trường tư → điểm cao (trường tư không phải nhân tố quyết định).

3. **Thiết kế tốt hơn:**
   - RCT lý tưởng (khó thực hiện thực tế): phân ngẫu nhiên học sinh cùng năng lực, điều kiện gia đình → một nhóm học trường tư, một nhóm học trường công → đo điểm sau vài năm.
   - Thực tế khả thi hơn: nghiên cứu "value-added" — kiểm soát điểm đầu vào của học sinh, theo dõi tiến bộ trong thời gian học, kiểm soát thu nhập gia đình và trình độ cha mẹ → xem trường tư có thêm giá trị không sau khi loại bỏ các yếu tố trên.

---

**Bài 2.**

**Phân tích:** Lập luận phạm lỗi **post hoc ergo propter hoc** (sau cái này nên do cái này) và suy diễn nhân quả từ tương quan thời gian.

**Giải thích thay thế:**
- *Tăng trưởng thị trường chung*: toàn ngành tăng → doanh số của mọi công ty trong ngành tăng, kể cả không tăng marketing.
- *Chu kỳ kinh tế*: kinh tế tăng trưởng → người tiêu dùng chi tiêu nhiều hơn → doanh số tăng.
- *Cải tiến sản phẩm song song*: nếu cùng thời gian công ty cải tiến chất lượng sản phẩm → doanh số tăng do sản phẩm tốt hơn, không phải do marketing.
- *Giá cả và cạnh tranh*: đối thủ giảm sức mạnh cạnh tranh → doanh số tăng không liên quan marketing.
- *Xu hướng thị trường*: thị hiếu người tiêu dùng thay đổi theo hướng có lợi cho sản phẩm.

**Dữ liệu cần thêm:**
- So sánh với công ty cùng ngành không tăng marketing trong cùng thời gian (counterfactual).
- Kết quả thí nghiệm: chọn ngẫu nhiên thị trường/vùng để tăng/không tăng marketing, đo doanh số — marketing thật sự có hiệu quả không?
- Phân tích attribution: khách hàng mua vì thấy quảng cáo hay vì lý do khác?

---

**Bài 3.**

Liệt kê tất cả vấn đề:

1. **Cỡ mẫu quá nhỏ (n=15)**: không đủ statistical power để kết luận có ý nghĩa; khoảng tin cậy rất rộng; dễ bị ngẫu nhiên chi phối.

2. **Thời gian quá ngắn (2 tuần)**: đau khớp mãn tính thường biến động theo chu kỳ (flare-up và remission tự nhiên) — 2 tuần không đủ để loại trừ regression to the mean (cải thiện tự nhiên).

3. **Tự báo cáo (self-reported)**: bệnh nhân biết mình đang được "điều trị" → expectation bias → có xu hướng báo cáo cải thiện (ngay cả không có hiệu quả thực).

4. **Không có nhóm đối chứng (no control group)**: không thể phân biệt hiệu quả thật với: (a) placebo effect; (b) cải thiện tự nhiên theo thời gian; (c) các thay đổi khác trong lối sống của bệnh nhân trong 2 tuần đó.

5. **Nguồn là website của công ty bán sản phẩm**: xung đột lợi ích nghiêm trọng — công ty có lợi ích tài chính trực tiếp từ kết quả "tốt"; không phải peer-reviewed; không có đánh giá độc lập.

6. **Không rõ phương pháp đo lường**: "giảm triệu chứng 60%" đo theo thang nào? VAS (Visual Analog Scale)? Điểm tuyệt đối hay tương đối?

**Kết luận tổng quát**: Đây là bằng chứng cấp độ thấp nhất — không đủ để có bất kỳ kết luận đáng tin về hiệu quả. Cần nghiên cứu mù đôi, có nhóm đối chứng placebo, cỡ mẫu lớn hơn nhiều, thời gian dài hơn, đo lường khách quan, và đăng trên tạp chí peer-reviewed độc lập.

---

**Bài 4.**

1. **Tính toán 28.6%**: (90 - 70) / 70 × 100% = 20/70 × 100% ≈ **28.6%** — đúng về mặt toán học.

2. **Có phải cherry-picking không?**
   - **Có** — đây là ví dụ điển hình của temporal cherry-picking.
   - Điểm bắt đầu (tháng 4: 70 triệu) được chọn vì là điểm thấp nhất trong chuỗi.
   - Điểm kết thúc (tháng 6: 90 triệu) được chọn vì là điểm phục hồi cao nhất.
   - Khoảng thời gian được chọn (3 tháng) loại bỏ hoàn toàn bức tranh 6 tháng.

3. **Bức tranh toàn cảnh:**
   - Doanh số tháng 1 (ra mắt): 100 triệu.
   - Doanh số tháng 6: 90 triệu.
   - **Giảm 10%** so với ra mắt, không phải "phục hồi mạnh mẽ".
   - Xu hướng 6 tháng: âm tính rõ ràng.
   - Con số 28.6% kỹ thuật đúng nhưng ngữ cảnh hoàn toàn sai lệch.

---

**Bài 5.**

| Tiêu chí | A (Blog cá nhân) | B (Journal of Nutrition) | C (Website nhà sản xuất) |
|----------|:---:|:---:|:---:|
| Sơ/thứ cấp | Giai thoại cá nhân — không phải nghiên cứu | Sơ cấp (nghiên cứu gốc) | Thứ cấp (tóm tắt không rõ nguồn) |
| Chuyên môn | Không rõ — người dùng thông thường | Có — tạp chí dinh dưỡng uy tín (IF 5.2) | Không có — nguồn thương mại |
| Xung đột lợi ích | Không rõ (có thể có) | Thấp — quỹ nghiên cứu quốc gia | Cao — nhà sản xuất tự PR |
| Bình duyệt | Không | Có (peer-reviewed) | Không |
| Ngày tháng | Không rõ | 2023 — cập nhật | Không rõ |
| Phương pháp | Không có (giai thoại) | Tốt: mù đôi, đối chứng, n=180 | Không rõ — "nhiều nghiên cứu" không dẫn nguồn |

**Thứ tự tin cậy: B >> A ≈ C** (B vượt trội; A và C đều rất thấp nhưng vì lý do khác nhau — A là giai thoại, C là nguồn có xung đột lợi ích nghiêm trọng và phương pháp mờ).

**Lưu ý**: B là nguồn tốt nhất nhưng vẫn cần: kiểm tra xem kết quả đã được replicate chưa; xem abstract và full text để đánh giá methodology chi tiết; tìm meta-analysis nếu có.

---

## Code & Minh họa

[visualization.html](./visualization.html) — Ba module tương tác: (1) Biểu đồ phân tán SVG minh họa tương quan và confounder — bật/tắt biến nhiễu để thấy tương quan biến mất trong từng nhóm; (2) Bài tập phát hiện cherry-picking — xem dữ liệu đầy đủ vs trích dẫn chọn lọc; (3) Bảng kiểm đánh giá nguồn tương tác.

---

## Bài tiếp theo

→ **[Lesson 07 — Lập luận quy nạp & loại suy](../lesson-07-inductive-analogy/)**: khi nào quy nạp từ mẫu sang tổng thể là hợp lệ, và loại suy (analogy) mạnh hay yếu phụ thuộc vào điều gì.

[⬆ Về Critical Thinking](../index.html) · [🏠 Trang chính Philosophy](../../index.html)
