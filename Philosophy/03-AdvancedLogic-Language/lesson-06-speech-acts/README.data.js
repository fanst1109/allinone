// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: Philosophy/03-AdvancedLogic-Language/lesson-06-speech-acts/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 06 — Hành vi ngôn ngữ (Speech Acts)

> **Tầng 3 — Advanced Logic & Language · Bài 6/8**

Từ trước đến nay, logic hình thức giả định rằng ngôn ngữ dùng để **mô tả thực tại** — một câu hoặc đúng hoặc sai. Nhưng J. L. Austin phát hiện ra điều kỳ lạ: không phải câu nào cũng để mô tả. Khi tôi nói *"Tôi hứa sẽ đến"*, tôi không mô tả một lời hứa đang tồn tại — tôi **tạo ra** lời hứa đó ngay trong hành động nói. Ngôn ngữ không chỉ là gương phản chiếu thế giới: nó còn là công cụ **làm biến đổi** thế giới.

Bài học này đi vào triết học ngôn ngữ hành động (philosophy of language and action): tại sao nói là làm, ý định ẩn sau lời nói là gì, và khi nào một phát ngôn "thành" hay "bất thành".

## Mục tiêu học tập

Sau bài này, bạn có thể:

- Giải thích tại sao Austin cho rằng không phải câu nào cũng là mệnh đề mô tả (constative) — và thế nào là câu ngôn hành (performative).
- Phân tích bất kỳ phát ngôn nào thành 3 tầng: hành vi tạo lời (locutionary), hành vi tại lời (illocutionary), hành vi mượn lời (perlocutionary).
- Phân loại illocution theo 5 nhóm của Searle: assertives, directives, commissives, expressives, declarations.
- Xác định điều kiện thành công (felicity conditions) của một performative cụ thể.
- Nhận ra rằng cùng một câu chữ có thể mang nhiều illocutionary force khác nhau tùy ngữ cảnh.

## Kiến thức tiền đề

- [Lesson 01 — Mệnh đề & giá trị chân lý](../../01-FormalLogic/lesson-01-propositions/) — nắm khái niệm mệnh đề (câu đúng/sai) để đối chiếu với câu ngôn hành.
- [Lesson 05 — Ngữ nghĩa & quy chiếu](../lesson-05-sense-reference/) — nắm phân biệt sense và reference, ý nghĩa văn bản và đối tượng trong thế giới.

---

## 1. Austin và câu ngôn hành — nói là làm

> 💡 **Trực giác.** Khi quan tòa tuyên *"Tòa kết án bị cáo ba năm tù"*, câu đó không mô tả một bản án đang tồn tại ở đâu đó — câu đó **tạo ra** bản án ngay trong hành động nói. Nếu ta ghi âm câu đó, phát lại trong nhà hát, nó không tạo ra bản án thứ hai. Chỉ đúng người, đúng chỗ, đúng thủ tục, nói ra câu đó mới "làm" được điều đó.

J. L. Austin (1911–1960) trong tác phẩm *How to Do Things with Words* (1962) chỉ ra rằng triết học ngôn ngữ trước ông có một **thiên kiến mô tả (descriptive fallacy)**: ngầm giả định rằng nhiệm vụ của ngôn ngữ là mô tả (describe) hay khẳng định (state) sự việc.

### 1.1 Câu mô tả (constative) và câu ngôn hành (performative)

Austin phân biệt hai loại câu ban đầu:

**Câu mô tả (constative):** Khẳng định một sự thật, có thể đánh giá đúng/sai.
- "Con mèo đang nằm trên thảm." → đúng hoặc sai tùy thực tế.
- "Hà Nội là thủ đô Việt Nam." → đúng.
- "Trời đang mưa." → đúng hoặc sai tùy lúc.

**Câu ngôn hành (performative):** Không mô tả hành động — **thực hiện** hành động ngay khi nói. Không thể đánh giá đúng/sai, mà chỉ "thành" hoặc "bất thành" (felicitous / infelicitous).

Ví dụ 1 — Lời hứa:
> *"Tôi hứa sẽ trả lại sách vào thứ Sáu."*

Khi nói câu này (trong đúng hoàn cảnh, đúng ý định), tôi **tạo ra** một nghĩa vụ trả sách. Câu đó không mô tả lời hứa — nó **là** lời hứa.

Ví dụ 2 — Hôn nhân:
> *"Tôi tuyên bố hai người là vợ chồng hợp pháp."*

Chỉ người có thẩm quyền (chủ hôn, quan chức hộ tịch) nói trong đúng nghi lễ mới **tạo ra** cuộc hôn nhân. Câu này không mô tả hôn nhân, nó **thực hiện** hôn nhân.

Ví dụ 3 — Đặt tên:
> *"Tôi đặt tên con tàu này là Aurora."*

Nói câu này trong đúng nghi lễ hạ thủy → con tàu có tên. Không phải mô tả tên đang có, mà tạo tên mới.

Ví dụ 4 — Tuyên thệ:
> *"Tôi thề sẽ trung thành với Hiến pháp và pháp luật của nước Cộng hòa Xã hội Chủ nghĩa Việt Nam."*

Phát biểu trong lễ nhậm chức → tạo ra nghĩa vụ pháp lý và đạo đức. Không mô tả — thực hiện.

> ⚠ **Performative không đúng/sai — chỉ thành/bất thành.** Khi một đứa trẻ 8 tuổi nói *"Tôi tuyên bố hai người là vợ chồng"*, không ai kết hôn cả. Câu không sai — nó **bất thành** (infelicitous) vì thiếu điều kiện. Đây là sự khác biệt căn bản: câu mô tả → đúng/sai; câu ngôn hành → thành/bất thành.

> ❓ **Câu hỏi tự nhiên của người đọc.**
> - *"Tôi hứa" có phải lúc nào cũng là performative không?"* — Không. *"Tôi hứa mỗi ngày"* (nói về thói quen) là mô tả. *"Tôi sẽ làm"* không phải lời hứa nếu không có ý định tạo nghĩa vụ. Ngữ cảnh và ý định quyết định.
> - *"Performative có thể nói gián tiếp không?"* — Có. *"Bạn có thể mở cửa không?"* ngữ pháp là câu hỏi, nhưng thực tế là yêu cầu (request). Austin gọi đây là performative ngầm ẩn (implicit performative) — dẫn đến lý thuyết illocution của Searle.

> 🔁 **Dừng lại tự kiểm tra.**
> Câu nào là performative, câu nào là constative?
> 1. *"Mặt Trời mọc ở hướng Đông."*
> 2. *"Tôi xin lỗi vì đã đến muộn."*
> 3. *"Tôi đặt cược 100.000 đồng rằng đội Việt Nam sẽ thắng."*
> 4. *"Anh ấy đặt cược 100.000 đồng."* (câu tường thuật)
>
> <details><summary>Đáp án</summary>
>
> 1. **Constative — T.** Câu mô tả sự kiện thiên nhiên, có thể kiểm tra.
> 2. **Performative.** Nói câu này = thực hiện hành động xin lỗi. Không thể đánh giá "đúng/sai" — chỉ "thành thật/không thành thật", "phù hợp ngữ cảnh/không".
> 3. **Performative.** Nói câu này trong đúng hoàn cảnh cá cược = tạo ra nghĩa vụ trả tiền nếu thua.
> 4. **Constative — T hoặc F.** Mô tả hành động của người khác, có thể đúng hay sai.
> </details>

> 📝 **Tóm tắt mục 1.**
> - Austin phát hiện "thiên kiến mô tả": không phải câu nào cũng để đúng/sai.
> - Câu ngôn hành (performative) = thực hiện hành động bằng cách nói, không mô tả.
> - Performative không đúng/sai — chỉ thành (felicitous) hoặc bất thành (infelicitous).
> - Ví dụ kinh điển: hứa, tuyên bố kết hôn, đặt tên, tuyên thệ, tuyên án.

---

## 2. Ba tầng của một phát ngôn

> 💡 **Trực giác.** Cùng một câu *"Trời lạnh đấy"* có thể được nói theo ba lớp nghĩa: (1) *nội dung ngôn ngữ* — câu có từ "trời", "lạnh"; (2) *ý định ẩn* — tôi đang gợi ý đóng cửa sổ; (3) *hiệu quả thực tế* — bạn đứng dậy đóng cửa sổ. Đây là 3 tầng Austin đặt ra: locutionary / illocutionary / perlocutionary.

Austin, trong giai đoạn sau, nhận ra phân biệt constative/performative chưa đủ tinh tế — vì thực ra MỌI phát ngôn đều có cả ba tầng:

### 2.1 Hành vi tạo lời (Locutionary act)

**Là gì:** Hành động nói ra một câu có nghĩa xác định — gồm âm thanh, cú pháp, và nội dung mệnh đề.

**Vì sao cần:** Đây là tầng vật lý-ngôn ngữ học cơ bản nhất. Không có locution thì không có gì cả.

**Ví dụ:** Khi tôi nói *"Trời lạnh đấy"*, locutionary act gồm: phát ra chuỗi âm thanh tiếng Việt, câu có chủ ngữ "trời", vị ngữ "lạnh", thể xác nhận.

### 2.2 Hành vi tại lời (Illocutionary act)

**Là gì:** Ý định/lực ngôn ngữ ẩn sau câu — điều tôi đang **làm** bằng cách nói câu đó: hứa, ra lệnh, hỏi, cảnh báo, xin lỗi...

**Vì sao cần:** Đây là tầng quan trọng nhất — nó xác định **chức năng giao tiếp** thực sự của phát ngôn. Cùng nội dung mệnh đề có thể mang nhiều illocutionary force khác nhau.

**Ví dụ:** *"Trời lạnh đấy"* có thể là:
- Cảnh báo (warning): *đừng ra ngoài không mặc áo*
- Gợi ý (suggestion): *hãy đóng cửa sổ*
- Nhận xét đơn thuần (assertion): *tôi đang chia sẻ quan sát*

### 2.3 Hành vi mượn lời (Perlocutionary act)

**Là gì:** Hiệu quả thực tế gây ra ở người nghe — hành động, cảm xúc, hay niềm tin được tạo ra sau khi nghe phát ngôn.

**Vì sao cần:** Giao tiếp không chỉ là truyền thông điệp — nó tạo ra kết quả trong thế giới và trong tâm lý người nghe.

**Ví dụ:** *"Trời lạnh đấy"* có thể dẫn đến:
- Người nghe đứng dậy đóng cửa sổ (hành động)
- Người nghe thay đổi kế hoạch đi chơi (quyết định)
- Người nghe cảm thấy lo lắng (cảm xúc)

### 2.4 Walk-through: Một câu — ba tầng

Lấy ví dụ cụ thể: Trong cuộc họp, sếp nói với nhân viên:

> *"Tôi thấy file báo cáo này có vẻ chưa đầy đủ."*

| Tầng | Nội dung |
|---|---|
| **Locutionary** | Câu tiếng Việt, chủ ngữ "tôi", vị ngữ "thấy file báo cáo này có vẻ chưa đầy đủ". Nội dung mệnh đề: nhận xét về trạng thái file. |
| **Illocutionary** | Yêu cầu ngầm (indirect directive): *hãy bổ sung báo cáo*. Hoặc: cảnh báo rằng file sẽ không được chấp nhận. |
| **Perlocutionary** | Nhân viên cảm thấy áp lực, ngay đêm đó bổ sung file; hoặc nhân viên bào chữa; hoặc nhân viên hiểu nhầm và xóa file đi. |

> ⚠ **Tại lời ≠ Mượn lời.** Illocutionary act là ý định của người nói — xác định bởi quy ước xã hội và ngữ cảnh. Perlocutionary act là kết quả thực tế ở người nghe — không do người nói kiểm soát hoàn toàn. Cùng một lời cảnh báo (illocution) có thể khiến người này sợ, người kia giận, người thứ ba thờ ơ (ba perlocution khác nhau).

> ❓ **Câu hỏi tự nhiên của người đọc.**
> - *"Illocutionary force có thể sai lệch so với ý định không?"* — Có. Người nghe có thể hiểu illocution khác với ý định của người nói — đây là nguồn gốc của nhiều hiểu lầm giao tiếp. Ngữ dụng học (pragmatics) nghiên cứu khoảng cách này.
> - *"Perlocution có phải là phần của ngôn ngữ không?"* — Theo nghĩa hẹp, perlocution thuộc tâm lý học và xã hội học hơn là ngôn ngữ học thuần túy. Austin đưa nó vào để cho thấy ngôn ngữ nhúng vào hành động xã hội.
> - *"Locutionary act có phải lúc nào cũng cần không?"* — Không nhất thiết phải là lời nói — gật đầu, ký tên cũng có thể có illocutionary force. Nhưng Austin tập trung vào ngôn ngữ nói.

> 🔁 **Dừng lại tự kiểm tra.**
> Phân tích câu sau thành 3 tầng: *"Anh có biết đèn đỏ không?"* — nói với tài xế vừa vượt đèn đỏ.
>
> <details><summary>Đáp án</summary>
>
> - **Locutionary:** Câu hỏi về nhận thức của tài xế đối với đèn đỏ.
> - **Illocutionary:** Khiển trách (reproach) / cáo buộc vi phạm — không phải hỏi thật về kiến thức.
> - **Perlocutionary:** Tài xế cảm thấy bị trách mắng, xin lỗi, hoặc cãi lại, hoặc bỏ đi.
> </details>

> 📝 **Tóm tắt mục 2.**
> - Mọi phát ngôn có 3 tầng: locutionary (nội dung ngôn ngữ), illocutionary (lực ý định), perlocutionary (hiệu quả ở người nghe).
> - Illocutionary act là tầng trung tâm — xác định chức năng giao tiếp thực sự.
> - Perlocution không do người nói kiểm soát hoàn toàn; illocution thì được xác định bởi quy ước và ngữ cảnh.

---

## 3. Searle — 5 loại hành vi tại lời

> 💡 **Trực giác.** Chúng ta dùng ngôn ngữ để làm những gì? John Searle (học trò Austin) đề xuất câu trả lời: chỉ có 5 thứ chúng ta làm với ngôn ngữ — khẳng định, điều khiển người khác, cam kết, biểu đạt cảm xúc, và tuyên bố làm thay đổi thực tại. Mọi hành vi ngôn ngữ đều rơi vào một trong 5 loại này.

John Searle (1969, *Speech Acts*; 1979, *Expression and Meaning*) hệ thống hóa lý thuyết Austin thành 5 nhóm **illocutionary act**:

### 3.1 Trình bày (Assertives)

**Là gì:** Người nói cam kết với tính đúng/sai của một mệnh đề. Đây là loại duy nhất có thể đánh giá đúng/sai.

**Ví dụ:**
- *"Hà Nội là thủ đô Việt Nam."* → khẳng định (assertion).
- *"Tôi cho rằng dự án sẽ thất bại."* → suy đoán (conjecture).
- *"Lịch sử chứng minh rằng đế chế La Mã sụp đổ vào năm 476."* → khẳng định lịch sử.
- *"Tôi đoán giá vàng sẽ tăng tuần tới."* → dự đoán (prediction).

Điểm đặc trưng: hướng khớp ngôn ngữ → thế giới (words-to-world fit) — câu phải khớp với thực tại.

### 3.2 Điều khiển (Directives)

**Là gì:** Người nói cố gắng khiến người nghe làm gì đó. Hướng khớp: thế giới → ngôn ngữ (world-to-words fit) — người nghe phải thay đổi hành động để khớp với yêu cầu.

**Ví dụ:**
- *"Đóng cửa lại!"* → ra lệnh (order).
- *"Bạn có thể giúp tôi mang hộp này không?"* → yêu cầu (request) ngầm ẩn.
- *"Bạn nghĩ sao về đề xuất này?"* → hỏi (question) — yêu cầu trả lời.
- *"Đừng chạm vào nút đó."* → cấm đoán (prohibition).

> ⚠ **Directives không phải lúc nào cũng là câu mệnh lệnh ngữ pháp.** *"Bạn có thể tắt đèn không?"* — hình thức là câu hỏi, nhưng illocution là yêu cầu. Ngữ pháp câu ≠ illocutionary force.

### 3.3 Cam kết (Commissives)

**Là gì:** Người nói cam kết thực hiện một hành động trong tương lai. Hướng khớp: thế giới → ngôn ngữ — người nói phải thay đổi hành động của mình để khớp với lời cam kết.

**Ví dụ:**
- *"Tôi hứa sẽ gọi điện cho bạn tối nay."* → lời hứa (promise).
- *"Tôi thề sẽ không bao giờ nói dối bạn."* → thề (oath/vow).
- *"Tôi sẽ không đến buổi họp đó."* → từ chối cam kết (refusal).
- *"Tôi xin tình nguyện làm người đầu tiên thử."* → đề nghị tình nguyện (offer/volunteer).

### 3.4 Biểu cảm (Expressives)

**Là gì:** Biểu đạt trạng thái tâm lý/cảm xúc của người nói đối với một sự kiện. Không có hướng khớp (no direction of fit) — không khẳng định sự thật, không yêu cầu hành động.

**Ví dụ:**
- *"Xin lỗi vì đã làm bạn phiền."* → xin lỗi (apology).
- *"Cảm ơn bạn rất nhiều."* → cảm ơn (thanking).
- *"Chúc mừng sinh nhật!"* → chúc mừng (congratulation).
- *"Tôi rất vui khi gặp lại bạn."* → biểu đạt vui mừng (expression of pleasure).

### 3.5 Tuyên bố (Declarations)

**Là gì:** Thay đổi thực tại ngay khi nói ra — phát ngôn làm cho điều được nói trở thành sự thật. Đây chính là loại performative mạnh nhất của Austin. Cần cả hai hướng khớp cùng lúc.

**Ví dụ:**
- *"Tôi tuyên bố phiên tòa khai mạc."* → thay đổi trạng thái phiên tòa.
- *"Tòa kết án bị cáo hai năm tù."* → tạo ra bản án pháp lý.
- *"Anh bị sa thải kể từ hôm nay."* → kết thúc hợp đồng lao động.
- *"Tôi tuyên bố chiến tranh với quốc gia X."* → tạo ra trạng thái chiến tranh pháp lý.

Điểm đặc trưng: **declarations thành công khi và chỉ khi** người nói có đủ thẩm quyền được thể chế xã hội trao cho.

> ❓ **Câu hỏi tự nhiên của người đọc.**
> - *"Một phát ngôn có thể thuộc nhiều loại cùng lúc không?"* — Hiếm nhưng có. *"Tôi hứa và xin lỗi vì đã thất hứa lần trước"* — vừa là commissive (hứa), vừa là expressive (xin lỗi). Thường một illocution chính thống trị.
> - *"Assertives và declarations khác nhau thế nào — cả hai đều khẳng định?"* — Assertives điều chỉnh lời nói cho khớp với thế giới đã có (thế giới không đổi). Declarations **tạo ra** một thực tại mới bằng chính hành động nói (thế giới thay đổi). Sa thải một nhân viên = declaration; nhận xét "anh ấy làm kém" = assertive.
> - *"Expressives có thể sai không?"* — Expressive không sai/đúng về nội dung, nhưng có thể **không thành thật** (insincere). *"Tôi xin lỗi"* mà không thực sự hối hận — đây là expressive thực hiện về mặt xã hội nhưng thiếu điều kiện tâm lý.

> 🔁 **Dừng lại tự kiểm tra.**
> Phân loại mỗi câu theo 5 nhóm Searle:
> 1. *"Trái Đất có 8 hành tinh trong Hệ Mặt Trời."*
> 2. *"Xin hãy im lặng trong khi thi."*
> 3. *"Tôi cam kết hoàn thành dự án trước ngày 30."*
> 4. *"Tôi thấy tiếc khi nghe tin bạn ốm."*
> 5. *"Hội đồng bầu anh Nguyễn Văn A làm chủ tịch."*
>
> <details><summary>Đáp án</summary>
>
> 1. **Assertive** — khẳng định sự kiện thiên văn (đúng/sai được).
> 2. **Directive** — yêu cầu hành động từ người nghe (giữ im lặng).
> 3. **Commissive** — cam kết hành động trong tương lai.
> 4. **Expressive** — biểu đạt cảm xúc tiếc (trạng thái tâm lý của người nói).
> 5. **Declaration** — thay đổi vị trí xã hội của A, tạo ra thực tại mới bằng phát ngôn.
> </details>

> 📝 **Tóm tắt mục 3.**
> - Searle chia illocutionary act thành 5 loại: Assertives (khẳng định đúng/sai), Directives (khiến người nghe làm gì), Commissives (người nói cam kết làm gì), Expressives (biểu đạt cảm xúc), Declarations (tạo ra thực tại mới).
> - Declarations mạnh nhất — yêu cầu thẩm quyền thể chế.
> - Cùng câu chữ có thể mang illocution khác nhau tùy ngữ cảnh.

---

## 4. Điều kiện thành công (Felicity Conditions)

> 💡 **Trực giác.** Một nghi lễ hôn nhân chỉ "ăn" khi có đủ điều kiện: đúng người chứng hôn, đúng thủ tục pháp lý, hai bên tự nguyện, chưa có vợ/chồng khác. Thiếu bất kỳ điều kiện nào → hôn nhân bất thành — dù câu chữ *"Tôi tuyên bố hai người là vợ chồng"* vẫn được nói ra đầy đủ.

Austin đặt ra **felicity conditions** (điều kiện thành công) — tập hợp các điều kiện phải thỏa mãn để một performative (đặc biệt là declaration) có hiệu lực:

### 4.1 Bốn nhóm điều kiện

**A1 — Thủ tục quy ước (conventional procedure):** Phải tồn tại một thủ tục được xã hội thừa nhận cho hành vi ngôn ngữ đó.

**A2 — Đúng người và đúng hoàn cảnh:** Thủ tục đó phải được thực hiện bởi đúng người trong đúng hoàn cảnh.

**B1 — Thực hiện đúng (correctly):** Thủ tục phải được thực hiện đúng theo quy định.

**B2 — Thực hiện đầy đủ (completely):** Thủ tục phải hoàn thành, không dừng giữa chừng.

**Γ1 — Tư tưởng/cảm xúc phù hợp:** Người nói phải có trạng thái tâm lý phù hợp (ví dụ: khi xin lỗi phải thực sự hối hận, khi hứa phải có ý định thực hiện).

**Γ2 — Hành vi nhất quán sau đó:** Người nói phải hành xử nhất quán với phát ngôn trong tương lai.

### 4.2 Ví dụ: Tuyên án (declaration)

Cho câu: *"Tòa kết án bị cáo Nguyễn Văn A hai năm tù."*

| Điều kiện | Thỏa mãn? | Nếu vi phạm |
|---|---|---|
| A1: Tồn tại thủ tục xét xử | ✓ Có hệ thống tòa án | Bản án vô hiệu về pháp lý |
| A2: Thẩm phán có thẩm quyền | ✓ / ✗ tùy trường hợp | Người không có thẩm quyền nói → bất thành |
| B1: Đúng thủ tục (tuyên đọc công khai) | ✓ / ✗ | Bỏ qua thủ tục → bản án bị kháng cáo |
| B2: Hoàn thành (không ngắt giữa chừng) | ✓ / ✗ | Chưa đọc xong → chưa có hiệu lực |
| Γ1: Thẩm phán tin vào căn cứ kết án | ✓ / ✗ | Kết án biết là sai = vi phạm đạo đức tư pháp |

### 4.3 Các loại "bất thành" (infelicity)

Austin phân biệt:

- **Misfire (phát đạn không nổ):** Vi phạm điều kiện A hoặc B → hành vi không thực hiện được, coi như chưa xảy ra. Ví dụ: người không có thẩm quyền tuyên hôn → không có hôn nhân.

- **Abuse (lạm dụng):** Vi phạm điều kiện Γ → hành vi thực hiện về mặt xã hội nhưng không thành thật. Ví dụ: hứa mà biết mình sẽ không giữ lời → lời hứa **thành** về mặt xã hội (người nghe có quyền trông chờ) nhưng là **hành vi không thành thật**.

> ⚠ **Misfire ≠ Abuse.** Khi tôi hứa mà không có ý định giữ lời: lời hứa vẫn **thành** về mặt xã hội (tôi có nghĩa vụ, người nghe có quyền trông chờ) — nhưng tôi đã abuse nó. Khi một người không có thẩm quyền tuyên hôn: không có hôn nhân nào cả — đây là misfire.

> ❓ **Câu hỏi tự nhiên của người đọc.**
> - *"Nếu tôi hứa trong khi say rượu, lời hứa có hiệu lực không?"* — Đây là câu hỏi thú vị: điều kiện A2 ("đúng hoàn cảnh") có thể không thỏa mãn nếu khả năng nhận thức bị ảnh hưởng. Pháp luật nhiều nơi không công nhận hợp đồng ký khi say.
> - *"Felicity conditions có phổ quát không?"* — Không hoàn toàn. Thẩm quyền và thủ tục khác nhau giữa các nền văn hóa. Người đứng đầu bộ tộc có thể có thẩm quyền tuyên hôn mà không cần đăng ký nhà nước.

> 🔁 **Dừng lại tự kiểm tra.**
> Xác định loại "bất thành" (misfire hay abuse):
> 1. Một diễn viên trong vở kịch nói *"Tôi tuyên bố phiên tòa khai mạc"* — có phiên tòa thật không?
> 2. Một quan chức tuyên bố mở phiên họp theo đúng thủ tục, nhưng thầm nghĩ *"buổi họp này vô nghĩa"* — phiên họp có mở không?
>
> <details><summary>Đáp án</summary>
>
> 1. **Misfire.** Diễn viên không có thẩm quyền (vi phạm A2), ngữ cảnh không phải thật (sân khấu). Không có phiên tòa nào được mở. Austin gọi đây là "hollow performative" — lời nói rỗng, không có force.
> 2. **Không phải misfire — là abuse (hoặc không bất thành).** Phiên họp vẫn được mở theo nghĩa thể chế — điều kiện A và B được thỏa. Điều kiện Γ1 (tư tưởng phù hợp) không thỏa, nhưng đây là abuse, không phải misfire. Phiên họp vẫn có hiệu lực pháp lý.
> </details>

> 📝 **Tóm tắt mục 4.**
> - Felicity conditions: thủ tục quy ước (A1), đúng người/hoàn cảnh (A2), thực hiện đúng (B1), đầy đủ (B2), tâm lý phù hợp (Γ1), hành vi nhất quán (Γ2).
> - Misfire: vi phạm A/B → hành vi không xảy ra.
> - Abuse: vi phạm Γ → hành vi xảy ra nhưng không thành thật.

---

## 5. Vấn đề mở: Ngữ cảnh và giao tiếp gián tiếp

> 💡 **Trực giác.** *"Bạn có muốn muối không?"* tại bàn ăn — ai cũng hiểu là *"hãy đưa muối cho tôi"*, không ai trả lời *"Có"* rồi ngồi yên. Illocution không nằm trong từ ngữ, mà nằm trong ngữ cảnh và quy ước xã hội chung.

Lý thuyết speech acts mở ra nhiều câu hỏi nghiên cứu:

**Giao tiếp gián tiếp (indirect speech acts):** Illocution thực sự khác với nội dung bề mặt. Searle gọi đây là "indirect speech acts" — *"Trời nóng quá"* có thể là yêu cầu bật điều hòa.

**Ngữ cảnh quyết định illocution:** Cùng câu *"Tôi sẽ đến"* — nếu nói tự nhiên sau câu hỏi "bạn có đến không?" thì là cam kết; nếu nói sau câu *"đừng đến nhé!"* thì là cảnh báo hoặc cứng đầu. Illocution không "đóng hộp" trong câu chữ.

**Nguyên tắc hợp tác của Grice:** H. P. Grice (1975) bổ sung với Cooperative Principle — người nói ngầm tuân theo các phương châm (maxims): số lượng (đủ thông tin), chất lượng (thành thật), quan hệ (liên quan), cách thức (rõ ràng). Vi phạm có chủ ý một maxim → tạo ra **hàm ngôn (implicature)**: *"Buổi biểu diễn của anh ấy rất... độc đáo"* — vi phạm maxim chất lượng → hàm ý không hay nhưng không nói thẳng.

---

## Bài tập

**Bài 1 — Phân loại performative/constative (Austin).**
Với mỗi câu, xác định là performative hay constative. Nếu performative, nói câu đó **làm** hành động gì:
- (a) *"Hội đồng xét xử tuyên bố phiên tòa khai mạc."*
- (b) *"Nhiệt độ hôm nay là 28°C."*
- (c) *"Tôi thề sẽ không nhậu trong 3 tháng."*
- (d) *"Anh ấy đã thề sẽ không nhậu."* (câu tường thuật)
- (e) *"Tôi xin phép nghỉ học hôm nay."*

**Bài 2 — Ba tầng.**
Phân tích câu *"Bạn có biết mình đang nói chuyện với ai không?"* — được nói bởi một quan chức cấp cao với một nhân viên trẻ — thành 3 tầng: locutionary, illocutionary, perlocutionary.

**Bài 3 — Phân loại Searle.**
Phân loại 5 câu sau theo 5 nhóm của Searle (assertive / directive / commissive / expressive / declaration):
- (a) *"Tôi xin được từ chức kể từ ngày hôm nay."*
- (b) *"Mặt Trăng cách Trái Đất trung bình khoảng 384.400 km."*
- (c) *"Xin chào mừng quý vị đến với hội thảo!"*
- (d) *"Đề nghị anh dừng xe vào lề đường."*
- (e) *"Tôi tình nguyện ở lại làm thêm giờ hôm nay."*

**Bài 4 — Felicity conditions.**
Câu *"Tôi tuyên bố cuộc họp cổ đông kết thúc"* — liệt kê ít nhất 3 felicity conditions phải thỏa mãn để declaration này có hiệu lực. Với mỗi điều kiện, nêu điều gì xảy ra nếu vi phạm.

**Bài 5 — Cùng câu, nhiều illocution.**
Câu *"Cửa sổ đang mở."* — hãy tưởng tượng 3 ngữ cảnh khác nhau trong đó câu này có 3 illocutionary force khác nhau (assertive, directive, và một loại nữa tự chọn). Mô tả ngữ cảnh cụ thể cho mỗi trường hợp.

---

## Lời giải chi tiết

**Bài 1.**

(a) *"Hội đồng xét xử tuyên bố phiên tòa khai mạc."* → **Performative (declaration).** Hành động được thực hiện: mở phiên tòa. Nói câu này trong đúng hoàn cảnh = phiên tòa bắt đầu có hiệu lực pháp lý. Điều kiện A2: phải là người có thẩm quyền (chủ tọa phiên tòa).

(b) *"Nhiệt độ hôm nay là 28°C."* → **Constative.** Mô tả sự kiện khí tượng, có thể đúng hoặc sai.

(c) *"Tôi thề sẽ không nhậu trong 3 tháng."* → **Performative (commissive).** Hành động được thực hiện: tạo ra lời thề — nghĩa vụ đạo đức (và có thể xã hội) không nhậu trong 3 tháng.

(d) *"Anh ấy đã thề sẽ không nhậu."* → **Constative.** Tường thuật hành động của người khác, có thể đúng hoặc sai về mặt sự kiện.

(e) *"Tôi xin phép nghỉ học hôm nay."* → **Performative (directive ngầm / commissive nhẹ).** Hành động được thực hiện: đưa ra yêu cầu chính thức xin nghỉ — tạo ra nghĩa vụ xử lý đơn từ phía giáo viên/cơ quan.

**Bài 2.**

Câu: *"Bạn có biết mình đang nói chuyện với ai không?"* — quan chức cấp cao nói với nhân viên trẻ.

- **Locutionary act:** Câu hỏi về nhận thức của nhân viên (có biết danh tính người đang nói chuyện không). Ngữ pháp: câu hỏi, chủ ngữ "bạn", động từ "biết", tân ngữ "mình đang nói chuyện với ai".

- **Illocutionary act:** Không phải hỏi thật. Đây là **cảnh báo / đe dọa uy quyền** (intimidation/warning) — ẩn ý: *"Tôi là người quan trọng, bạn nên thay đổi thái độ/cách nói chuyện."* Thuộc directive hoặc expressive tùy sắc thái cụ thể.

- **Perlocutionary act (có thể):** Nhân viên cảm thấy bị đe nẹt, e dè hơn, xin lỗi; hoặc nhân viên tự ái, phản bác; hoặc nhân viên trả lời thẳng "Thưa, tôi biết" — tùy tính cách người nghe.

**Bài 3.**

(a) *"Tôi xin được từ chức kể từ ngày hôm nay."* → **Declaration.** Phát ngôn này (nếu đúng thủ tục) tạo ra sự thay đổi thực tại: chức vụ của người nói kết thúc. Cần: viết đơn, đúng thủ tục nội bộ của tổ chức.

(b) *"Mặt Trăng cách Trái Đất trung bình khoảng 384.400 km."* → **Assertive.** Khẳng định sự kiện khoa học, có thể kiểm tra đúng/sai (đúng, theo NASA).

(c) *"Xin chào mừng quý vị đến với hội thảo!"* → **Expressive.** Biểu đạt thái độ đón chào của người nói/ban tổ chức đối với người nghe. Không khẳng định sự thật, không yêu cầu hành động.

(d) *"Đề nghị anh dừng xe vào lề đường."* → **Directive.** Yêu cầu người nghe thực hiện hành động cụ thể (dừng xe).

(e) *"Tôi tình nguyện ở lại làm thêm giờ hôm nay."* → **Commissive.** Người nói cam kết hành động trong tương lai (ở lại làm thêm giờ).

**Bài 4.**

Câu: *"Tôi tuyên bố cuộc họp cổ đông kết thúc."*

| Felicity condition | Nội dung | Hậu quả vi phạm |
|---|---|---|
| A2 — Đúng người | Người nói phải là chủ tọa cuộc họp (thường là Chủ tịch HĐQT hoặc người được ủy quyền) | Người không có thẩm quyền tuyên bố → cuộc họp chưa kết thúc theo quy định pháp lý/điều lệ |
| A2 — Đúng hoàn cảnh | Phải đang trong phiên họp cổ đông đang diễn ra | Nói câu này ngoài phiên họp → bất thành (misfire) |
| B1 — Đúng thủ tục | Các nội dung chương trình nghị sự phải đã được xử lý đầy đủ (hoặc ít nhất được thông qua quyết định bỏ qua) | Bỏ qua điểm nghị sự quan trọng → cổ đông có thể kháng cáo tính hợp lệ của cuộc họp |
| B2 — Hoàn thành | Câu tuyên bố phải được phát ngôn hoàn chỉnh, không bị ngắt giữa chừng | Tuyên bố bị ngắt → chưa kết thúc chính thức |
| Γ1 — Tâm lý phù hợp | Người tuyên bố thực sự có ý định kết thúc cuộc họp (không phải đùa, không phải ngữ cảnh sân khấu) | Nói đùa trong bối cảnh nghiêm túc → có thể tạo mâu thuẫn |

**Bài 5.**

Câu: *"Cửa sổ đang mở."*

**Ngữ cảnh 1 — Assertive:** Thám tử đang khám nghiệm hiện trường báo cáo với đồng nghiệp: *"Cửa sổ đang mở"* — khẳng định sự kiện (cửa sổ thực sự đang ở trạng thái mở), mang giá trị chứng cứ trong điều tra.

**Ngữ cảnh 2 — Directive:** Người mẹ nói với con trong phòng lạnh ngày đông: *"Cửa sổ đang mở."* — illocution thực sự là yêu cầu con đóng cửa sổ lại. Không phải thông báo thông tin mới (con cũng biết), mà là gợi ý hành động.

**Ngữ cảnh 3 — Warning (cảnh báo, dạng directive/expressive):** Bảo vệ tòa nhà gọi điện cho người thuê: *"Cửa sổ phòng anh đang mở"* — trong bối cảnh trời sắp mưa lớn hay có cảnh báo an ninh — đây là cảnh báo (warning), kêu gọi hành động nhưng cũng biểu đạt lo ngại.

---

## Code & Minh họa

- [visualization.html](./visualization.html) — Ba bài tập tương tác: (1) phân loại 5 nhóm Searle, (2) tách 3 tầng của một phát ngôn, (3) đánh giá điều kiện thành công (felicity conditions). JS thuần, không cần build.

---

## Bài tiếp theo

→ **[Lesson 07 — Logic & Tính toán](../lesson-07-logic-computation/)**: từ logic ngôn ngữ sang logic máy tính — Turing, tính toán được, và giới hạn của máy tính.

[⬆ Về Advanced Logic & Language](../index.html) · [🏠 Trang chính Philosophy](../../index.html)
`;
