# Lesson 01 — Mệnh đề & giá trị chân lý

> **Tầng 1 — Formal Logic · Bài 1/8**

Bài mở đầu trả lời câu hỏi nền tảng nhất của logic hình thức: **một "câu phát biểu" có phải mệnh đề không, và nó đúng hay sai?** Ta sẽ thấy không phải mọi câu nói đều là mệnh đề — câu hỏi, mệnh lệnh, câu chứa biến tự do đều bị loại — và chỉ khi một câu có thể được gán giá trị ĐÚNG hoặc SAI (nhưng không cả hai) thì nó mới là mệnh đề trong logic hình thức.

## Mục tiêu học tập

Sau bài này, bạn có thể:

- Định nghĩa mệnh đề (proposition) và giải thích vì sao câu hỏi/mệnh lệnh không phải mệnh đề.
- Phân biệt mệnh đề đơn (atomic) với mệnh đề phức (compound — học ở L02).
- Xác định giá trị chân lý (truth value) của một mệnh đề: ĐÚNG (T/1) hoặc SAI (F/0).
- Giải thích vì sao "chưa biết là đúng hay sai" không có nghĩa là câu đó không phải mệnh đề.
- Nhận biết các bẫy kinh điển: nghịch lý tự-phủ định, câu mở chứa biến tự do, câu vô nghĩa.
- Dùng ký hiệu biến mệnh đề p, q, r chuẩn mực.

## Kiến thức tiền đề

Bài này là **điểm khởi đầu tuyệt đối** của chuỗi Formal Logic — không yêu cầu bất kỳ kiến thức tiền đề nào về logic hay toán học hình thức. Chỉ cần đọc được tiếng Việt và sẵn sàng suy nghĩ cẩn thận về ngôn ngữ.

---

## 1. Mệnh đề là gì?

> 💡 **Trực giác.** Hãy nghĩ đến một tòa án: thẩm phán hỏi "Bị cáo có ở hiện trường lúc 10 giờ tối không?" — câu đó có thể trả lời ĐÚNG hoặc SAI. Đó là mệnh đề. Nhưng "Hãy mô tả bị cáo!" là yêu cầu — không thể phán "câu này đúng hay sai". Và "Câu này là sai" thì rơi vào nghịch lý. Logic hình thức chỉ làm việc với loại câu đầu tiên.

**Mệnh đề (proposition / statement)** là một câu **khẳng định** (declarative sentence) có thể được gán một và chỉ một trong hai giá trị chân lý:
- **ĐÚNG** (True, viết tắt **T**, ký hiệu **1**)
- **SAI** (False, viết tắt **F**, ký hiệu **0**)

Hai điều kiện *đồng thời* phải thỏa:
1. Câu phải **có giá trị chân lý** (không phải câu hỏi, mệnh lệnh, cảm thán, câu mở...).
2. Giá trị chân lý đó phải **xác định** — ĐÚNG hoặc SAI, **không vừa đúng vừa sai**, **không không-đúng-cũng-không-sai** (trong logic hai giá trị cổ điển).

**Ví dụ mệnh đề (≥ 4):**

| Câu | Mệnh đề? | Giá trị chân lý |
|-----|:---:|:---:|
| "2 + 2 = 4" | ✓ | **T** — đúng theo định nghĩa số học |
| "Hà Nội là thủ đô của Việt Nam" | ✓ | **T** — sự kiện địa lý-chính trị |
| "Mặt Trời quay quanh Trái Đất" | ✓ | **F** — khẳng định sai khoa học |
| "7 là số chẵn" | ✓ | **F** — 7 chia 2 dư 1 |
| "Có sự sống ngoài Trái Đất" | ✓ | Không biết — **nhưng vẫn là mệnh đề!** |
| "Mọi số lẻ đều là nguyên tố" | ✓ | **F** — phản ví dụ: 9 = 3×3 |
| "Số nguyên tố lớn nhất tồn tại" | ✓ | **F** — định lý Euclid chứng minh vô hạn số nguyên tố |
| "√2 là số hữu tỷ" | ✓ | **F** — đã được chứng minh vô tỷ |

> ⚠ **Lỗi thường gặp: nhầm "chưa biết" với "không phải mệnh đề".** Câu "Có sự sống ngoài Trái Đất" — ta chưa biết đúng hay sai, nhưng nó *là* mệnh đề. Vì sao? Vì có *tồn tại* một giá trị chân lý xác định, dù con người chưa khám phá ra. Logic hình thức không đòi ta *biết* giá trị đó — chỉ đòi giá trị đó *phải tồn tại và xác định*. Nếu vũ trụ có sự sống ngoài Trái Đất thì câu là T; nếu không có thì F — không thể cả hai.

> ❓ **Câu hỏi tự nhiên của người đọc.**
> - *"Vậy câu 'Tôi đói bụng' có phải mệnh đề không?"* — Có, đó là mệnh đề, vì nó có thể đúng hoặc sai (tùy trạng thái sinh lý của người nói). Giá trị chân lý có thể thay đổi theo ngữ cảnh — nhưng tại một thời điểm cụ thể, người đó hoặc đang đói hoặc không đói.
> - *"Câu nào cũng phải đúng hoặc sai — vậy mọi câu đều là mệnh đề?"* — Không. Câu hỏi ("Bạn khỏe không?"), mệnh lệnh ("Đóng cửa lại!"), câu cảm thán ("Ôi trời!") không có giá trị chân lý — không thể nói chúng "đúng" hay "sai". Và câu mở ("x + 1 = 5") chưa xác định được vì phụ thuộc biến x chưa gán giá trị.
> - *"Logic hai giá trị có phải duy nhất không?"* — Không. Có logic ba giá trị (true/false/unknown) và logic mờ (fuzzy logic). Nhưng trong chuỗi này ta học logic cổ điển Aristotle — hai giá trị, nền tảng của mọi logic hình thức và khoa học máy tính.

> 🔁 **Dừng lại tự kiểm tra.**
> Câu nào dưới đây là mệnh đề? Nếu là mệnh đề, giá trị chân lý là gì?
> 1. "3 × 5 = 15"
> 2. "Trời đang mưa không?"
> 3. "Paris là thủ đô của Anh"
> 4. "n là số nguyên tố" (n chưa xác định)
> 5. "Hãy học chăm chỉ!"
>
> <details><summary>Đáp án</summary>
>
> 1. **Mệnh đề — T.** Phép nhân đúng.
> 2. **Không phải mệnh đề.** Câu hỏi, không có giá trị chân lý.
> 3. **Mệnh đề — F.** Thủ đô Anh là London; Paris là thủ đô Pháp.
> 4. **Không phải mệnh đề** (khi n chưa được gán giá trị). Đây là **vị từ (predicate)** — sẽ học ở Lesson 05 — Predicate Logic.
> 5. **Không phải mệnh đề.** Mệnh lệnh, không có giá trị chân lý.
> </details>

> 📝 **Tóm tắt mục 1.**
> - Mệnh đề = câu khẳng định có giá trị chân lý xác định: T hoặc F, không vừa đúng vừa sai.
> - Không phải mệnh đề: câu hỏi, mệnh lệnh, cảm thán, câu mở chứa biến tự do, nghịch lý.
> - "Chưa biết đúng/sai" ≠ "không phải mệnh đề" — giá trị tồn tại khách quan dù ta chưa biết.

---

## 2. Những gì KHÔNG phải mệnh đề

> 💡 **Trực giác.** Kiểm tra nhanh: thử đặt "Câu này đúng hay sai?" — nếu câu trả lời vô nghĩa hoặc gây mâu thuẫn, câu đó không phải mệnh đề. "Bạn khỏe không?" — hỏi câu đó "đúng hay sai" là vô nghĩa. "Đóng cửa!" — câu đó không đúng cũng không sai. "x > 3" — đúng/sai phụ thuộc x, chưa gán x thì chưa thể trả lời.

Có bốn loại câu phổ biến **không phải mệnh đề** trong logic cổ điển:

### 2.1 Câu hỏi (interrogative sentences)

Câu hỏi không có giá trị chân lý — nó **yêu cầu** thông tin, không **khẳng định** thông tin.

**Ví dụ:**
- "Mấy giờ rồi?" → không phải mệnh đề
- "Bạn có đến lớp hôm nay không?" → không phải mệnh đề
- "Socrates là ai?" → không phải mệnh đề
- "1 + 1 = 2 phải không?" → *câu hỏi* dù nội dung là mệnh đề — dạng câu hỏi làm mất tính khẳng định

> ⚠ **Phân biệt tinh tế:** "1 + 1 = 2" (câu khẳng định) là mệnh đề T, nhưng "1 + 1 = 2 phải không?" (câu hỏi) thì không. Hình thức ngữ pháp quyết định, không phải nội dung.

### 2.2 Mệnh lệnh / câu cầu khiến (imperative sentences)

Mệnh lệnh yêu cầu hành động — không khẳng định điều gì.

**Ví dụ:**
- "Đóng cửa lại!" → không phải mệnh đề
- "Hãy học logic hình thức!" → không phải mệnh đề
- "Đừng nhìn vào đây." → không phải mệnh đề
- "Xin vui lòng ngồi xuống." → không phải mệnh đề

### 2.3 Câu cảm thán (exclamatory sentences)

Biểu đạt cảm xúc, không khẳng định sự kiện.

**Ví dụ:**
- "Ôi trời ơi!" → không phải mệnh đề
- "Wow, tuyệt vời quá!" → không phải mệnh đề
- "Ôi đau quá!" → không phải mệnh đề

### 2.4 Câu mở chứa biến tự do (open sentences / propositional functions)

Câu có biến số chưa được gán giá trị cụ thể — giá trị chân lý phụ thuộc vào biến, chưa xác định được.

**Ví dụ:**
- "x + 1 = 5" → không phải mệnh đề (khi x chưa xác định; nếu x = 4 thì T, x ≠ 4 thì F)
- "n là số nguyên tố" → không phải mệnh đề (phụ thuộc n)
- "y > 10" → không phải mệnh đề (phụ thuộc y)
- "Người đó là thủ phạm" → không phải mệnh đề (chưa rõ "người đó" là ai)

Câu mở *trở thành* mệnh đề khi gán giá trị cho biến: "4 + 1 = 5" (T), "6 + 1 = 5" (F), "7 là số nguyên tố" (T).

### 2.5 Nghịch lý tự-phủ định (self-referential paradoxes)

Câu tự đề cập đến giá trị chân lý của chính nó theo cách gây mâu thuẫn:

- **"Câu này là sai."** (Nghịch lý Epimenides / Liar's Paradox): Nếu câu đúng → nó là sai → mâu thuẫn. Nếu câu sai → nó là đúng → mâu thuẫn. Không thể gán T hay F mà không tự mâu thuẫn → không phải mệnh đề trong logic cổ điển.

> ❓ **Câu hỏi tự nhiên của người đọc.**
> - *"Câu mở 'x > 3' không phải mệnh đề — nhưng sau này ta hay viết 'Nếu x > 3 thì...' — có mâu thuẫn không?"* — Không. Trong logic vị từ (Lesson 05), ta dùng **lượng từ** (quantifier): "Với mọi x, nếu x > 3 thì..." hay "Tồn tại x sao cho x > 3" — khi đó câu trở thành mệnh đề vì biến x đã được ràng buộc (bound variable).
> - *"'Câu này đúng' thì sao — có phải mệnh đề không?"* — Câu "Câu này đúng" không tạo ra mâu thuẫn (nếu gán T thì tự nhất quán, gán F thì cũng tự nhất quán) — đây là câu "không xác định" chứ không phải nghịch lý. Tuy vậy, vì không có nội dung thực sự, logic hình thức cũng không coi đây là mệnh đề có ý nghĩa.

> 🔁 **Dừng lại tự kiểm tra.** Xác định loại của mỗi câu sau:
> 1. "2x = 10"
> 2. "Hãy giải phương trình này đi."
> 3. "Câu này là sai."
> 4. "Trời Hà Nội hôm nay nhiều mây."
>
> <details><summary>Đáp án</summary>
>
> 1. **Câu mở chứa biến tự do x** → không phải mệnh đề. (Nếu x = 5 thì T, x ≠ 5 thì F.)
> 2. **Mệnh lệnh** → không phải mệnh đề.
> 3. **Nghịch lý tự-phủ định** → không phải mệnh đề.
> 4. **Mệnh đề** → có giá trị T hoặc F tùy thực tế thời tiết hôm đó tại Hà Nội.
> </details>

> 📝 **Tóm tắt mục 2.**
> - Câu hỏi, mệnh lệnh, cảm thán → không có giá trị chân lý → không phải mệnh đề.
> - Câu mở chứa biến tự do → giá trị chân lý chưa xác định → không phải mệnh đề.
> - Nghịch lý tự-phủ định → không thể gán giá trị nhất quán → không phải mệnh đề.

---

## 3. Mệnh đề đơn và ký hiệu biến

> 💡 **Trực giác.** Cũng như đại số dùng x, y, z để đặt tên số, logic dùng p, q, r để đặt tên mệnh đề. Thay vì viết "Hà Nội là thủ đô Việt Nam" cả câu, ta nói "đặt p = 'Hà Nội là thủ đô Việt Nam'" rồi làm việc với p. Gọn hơn và tổng quát hơn — cùng một quy tắc áp dụng cho mọi mệnh đề, không cần biết nội dung cụ thể.

**Mệnh đề đơn (atomic proposition)** là mệnh đề không thể phân tích thành các mệnh đề nhỏ hơn — nó là đơn vị cơ bản, không chứa liên từ logic ("và", "hoặc", "nếu...thì...", "không phải").

**Ký hiệu biến mệnh đề:**
- Thường dùng chữ thường: **p, q, r, s, t** (có thể kèm chỉ số: p₁, p₂, ...).
- Mỗi biến đại diện cho một mệnh đề cụ thể trong ngữ cảnh đang xét.
- Giá trị của biến là T hoặc F.

**Ví dụ đặt biến mệnh đề (≥ 4):**

| Ký hiệu | Mệnh đề | Giá trị chân lý |
|:---:|---|:---:|
| p | "Hà Nội là thủ đô Việt Nam" | T |
| q | "7 là số chẵn" | F |
| r | "Mọi tam giác đều có tổng nội góc = 180°" | T |
| s | "Nước sôi ở 100°C tại áp suất chuẩn" | T |
| t | "Số nguyên tố lớn nhất tồn tại" | F |
| u | "Có sự sống ngoài Trái Đất" | Không biết (nhưng xác định) |

**Phân biệt mệnh đề đơn và phức:**
- **Đơn (atomic):** "Trời đang mưa." — p
- **Phức (compound):** "Trời đang mưa VÀ trời lạnh." — p ∧ q (sẽ học ở Lesson 02)
- **Phức:** "Nếu trời mưa THÌ đường ướt." — p → q (sẽ học ở Lesson 02-03)

Trong bài này ta chỉ làm việc với mệnh đề đơn. Mệnh đề phức được ghép từ mệnh đề đơn bằng **liên từ logic (logical connectives)** — chủ đề của Lesson 02.

> ⚠ **Lỗi thường gặp: coi một câu dài là mệnh đề phức khi thực ra là đơn.** "Hà Nội — thủ đô của nước Việt Nam — là thành phố ngàn năm tuổi" trông dài nhưng chỉ khẳng định MỘT điều (Hà Nội là thành phố ngàn năm tuổi; phần "thủ đô..." là mệnh đề quan hệ bổ nghĩa). Ngược lại, "Trời mưa và tôi quên ô" gồm HAI mệnh đề ghép bằng "và". Tiêu chí: mệnh đề đơn không thể tách thành hai mệnh đề độc lập bằng liên từ logic.

> ❓ **Câu hỏi tự nhiên của người đọc.**
> - *"Tại sao dùng p, q, r chứ không dùng A, B, C?"* — Quy ước tùy sách/tác giả. Một số sách dùng A, B, C. Nhưng p, q, r (viết thường) phổ biến hơn trong logic toán học để phân biệt với **tập hợp** (thường dùng A, B, C viết hoa) và **vị từ** (thường dùng P, Q viết hoa trong logic vị từ — Lesson 05). Quy ước này giúp đọc văn bản logic không bị nhầm lẫn.
> - *"Giá trị chân lý có thể thay đổi không?"* — Trong logic mệnh đề cổ điển, mỗi biến có một giá trị cố định trong một bài toán. Khi làm bảng chân lý (Lesson 02), ta liệt kê tất cả tổ hợp có thể của T/F. Biến p "nhận" giá trị T trong dòng này, F trong dòng khác — nhưng trong mỗi dòng, giá trị là cố định.

> 🔁 **Dừng lại tự kiểm tra.**
> Cho: p = "Mặt Trời là ngôi sao", q = "8 là số lẻ", r = "Nước đóng băng ở 0°C".
> Giá trị chân lý của p, q, r lần lượt là gì?
>
> <details><summary>Đáp án</summary>
>
> - p = T: Mặt Trời là ngôi sao (loại G2V).
> - q = F: 8 = 2×4 là số chẵn.
> - r = T: Ở áp suất tiêu chuẩn, nước đóng băng ở 0°C.
> </details>

> 📝 **Tóm tắt mục 3.**
> - Mệnh đề đơn (atomic) = đơn vị không thể phân tách thêm bằng liên từ logic.
> - Ký hiệu: p, q, r, s... — mỗi biến nhận giá trị T hoặc F.
> - Mệnh đề phức = ghép từ mệnh đề đơn bằng liên từ (∧, ∨, ¬, →, ↔) — chủ đề Lesson 02.

---

## 4. Tại sao "ĐÚNG hoặc SAI" — nền tảng của logic nhị phân

> 💡 **Trực giác.** Máy tính hiện đại hoạt động trên bit: 0 hoặc 1. Tại sao? Vì mạch điện tử chỉ cần phân biệt hai trạng thái: có điện / không điện. Logic hai giá trị (T/F) là cơ sở lý thuyết của cả nền tảng máy tính. Mỗi phép tính trong CPU thực chất là phép logic mệnh đề trên chuỗi bit.

**Vì sao logic cổ điển chỉ dùng hai giá trị?**

**(a) Là gì.** Nguyên tắc **Loại trừ trung gian (Law of Excluded Middle)** phát biểu: với bất kỳ mệnh đề p nào, **(p ĐÚNG) hoặc (p SAI)** — không có trường hợp thứ ba ("vừa đúng vừa sai" hay "không đúng không sai"). Đây là một trong ba luật cơ bản của logic cổ điển Aristotle.

**(b) Vì sao cần.** Nhị phân (0/1) mang lại sự đơn giản tuyệt vời cho suy diễn: nếu không phải T thì phải là F. Không cần phân vân mức độ. Điều này cho phép xây dựng các quy tắc suy diễn chính xác và máy móc (Lesson 03-04) — nền tảng của toán học hình thức và lập trình.

**(c) Ví dụ số cụ thể.**

Ví dụ 1: p = "5 chia hết cho 2". Kiểm tra: 5 = 2×2 + 1, dư 1 ≠ 0. Vậy p = **F**. Không có "nửa đúng" — 5 không chia hết cho 2.

Ví dụ 2: q = "√4 = 2". Kiểm tra: 2² = 4, đúng. Vậy q = **T**. (Lưu ý: √4 theo quy ước là căn bậc hai dương, nên = 2, không phải ±2.)

Ví dụ 3: r = "Tất cả số nguyên tố đều là số lẻ". Phản ví dụ: 2 là số nguyên tố và là số chẵn. Vậy r = **F**.

Ví dụ 4: s = "Có vô hạn số nguyên tố dạng 4k+1" (Định lý Dirichlet). Đây là mệnh đề — giá trị chân lý là **T** (đã chứng minh), dù với người mới học chưa biết.

| Mệnh đề | Giá trị | Lý do |
|---------|:---:|---|
| "15 là số nguyên tố" | F | 15 = 3×5 |
| "Tổng góc tam giác (phẳng) = 180°" | T | Hệ quả từ tiên đề Euclid |
| "0 là số nguyên" | T | Theo định nghĩa số học |
| "−3 < −5" | F | −3 ở bên phải −5 trên trục số |

> ⚠ **Lỗi thường gặp: nghĩ giá trị chân lý phụ thuộc vào "quan điểm".** Trong logic hình thức, mệnh đề toán học và khoa học tự nhiên có giá trị khách quan, không phụ thuộc ai đánh giá. "7 là số nguyên tố" là T — không có "theo quan điểm của tôi thì 7 không phải nguyên tố". Với mệnh đề đánh giá ("bộ phim này hay") thì logic hình thức không áp dụng trực tiếp — đây không phải mệnh đề theo nghĩa hình thức.

> ❓ **Câu hỏi tự nhiên của người đọc.**
> - *"Vậy logic mờ (fuzzy logic) dùng ở đâu?"* — Fuzzy logic mở rộng giá trị chân lý thành khoảng [0, 1]. Ứng dụng: máy giặt "nước hơi bẩn", điều khiển nhiệt độ, AI mờ. Nhưng nền tảng lý thuyết vẫn xây từ logic cổ điển. Ta sẽ học logic cổ điển hoàn chỉnh trước.
> - *"Logic ba giá trị (true/false/unknown) có thực tế không?"* — Có, trong cơ sở dữ liệu: SQL dùng logic ba giá trị (TRUE/FALSE/NULL). Điều này dẫn đến nhiều bẫy lập trình thú vị — ví dụ `NULL = NULL` trong SQL là NULL (không phải TRUE).

> 🔁 **Dừng lại tự kiểm tra.** Xác định giá trị chân lý:
> 1. "100 là số chính phương" (perfect square)
> 2. "Mọi số chẵn lớn hơn 2 đều là tổng của hai số nguyên tố" (Goldbach's conjecture)
> 3. "−1 > −2"
>
> <details><summary>Đáp án</summary>
>
> 1. **T.** 100 = 10² → là số chính phương.
> 2. **Chưa biết** (chưa được chứng minh hay bác bỏ tính đến nay) — nhưng **là mệnh đề** vì giá trị chân lý xác định tồn tại.
> 3. **T.** Trên trục số, −1 nằm bên phải −2, tức −1 > −2.
> </details>

> 📝 **Tóm tắt mục 4.**
> - Luật Loại trừ trung gian: mọi mệnh đề hoặc T hoặc F — không có giá trị thứ ba.
> - Nhị phân T/F là nền tảng của lập trình (bit 0/1) và toán học hình thức.
> - Giá trị chân lý trong logic hình thức là khách quan, không phụ thuộc "quan điểm".

---

## 5. Tổng hợp và bảng kiểm tra nhanh

Để quyết định "có phải mệnh đề không", thực hiện **3 bước kiểm tra**:

**Bước 1 — Hình thức câu:** Câu khẳng định (declarative)? Nếu là câu hỏi, mệnh lệnh, cảm thán → **KHÔNG PHẢI mệnh đề, dừng.**

**Bước 2 — Biến tự do:** Có biến chưa xác định giá trị không? (x, n, "người đó", "hôm qua"...) → Nếu có → **KHÔNG PHẢI mệnh đề** (câu mở), dừng.

**Bước 3 — Nghịch lý:** Gán T → tự mâu thuẫn? Gán F → tự mâu thuẫn? Cả hai → **KHÔNG PHẢI mệnh đề**, dừng.

Nếu qua cả 3 bước → **LÀ mệnh đề**. Giá trị T hay F xác định bởi thực tế hoặc định nghĩa toán học.

**Bảng tổng hợp ví dụ đa dạng:**

| Câu | Kết quả | Lý do |
|-----|:---:|---|
| "2 là số nguyên tố" | Mệnh đề — T | Câu khẳng định, giá trị xác định |
| "Hà Nội là thủ đô Việt Nam" | Mệnh đề — T | Sự kiện địa lý |
| "Mặt Trời quay quanh Trái Đất" | Mệnh đề — F | Sai khoa học |
| "x + 1 = 5" | Không phải | Câu mở, x tự do |
| "Bạn có khỏe không?" | Không phải | Câu hỏi |
| "Hãy im lặng!" | Không phải | Mệnh lệnh |
| "Câu này sai" | Không phải | Nghịch lý tự-phủ định |
| "Có số nguyên tố giữa 10 và 20" | Mệnh đề — T | 11, 13, 17, 19 đều là nguyên tố |
| "Mọi số chẵn > 2 là tổng 2 số nguyên tố" | Mệnh đề — ? | Goldbach: chưa chứng minh, nhưng là mệnh đề |

---

## Bài tập

1. **Phân loại cơ bản.** Với mỗi câu sau, cho biết: (a) có phải mệnh đề không, (b) nếu là mệnh đề thì giá trị chân lý là T hay F (giải thích ngắn):
   - "9 = 3²"
   - "Ai đã viết Hamlet?"
   - "Tất cả chim đều biết bay"
   - "n² + 1 > 0 với mọi số thực n"
   - "Đừng ăn kẹo trước bữa cơm!"
   - "Số π là số hữu tỷ"

2. **Câu mở thành mệnh đề.** Câu "x² = 4" không phải mệnh đề. Hãy gán ba giá trị cụ thể cho x (một giá trị làm câu đúng, hai giá trị làm câu sai) để tạo ra ba mệnh đề với giá trị chân lý tương ứng.

3. **Phát hiện nghịch lý.** Giải thích tại sao "Câu này không phải mệnh đề" bản thân nó cũng không phải mệnh đề theo nghĩa logic hình thức. (Gợi ý: thử gán T và F rồi xem điều gì xảy ra.)

4. **Phân biệt "chưa biết" và "không phải mệnh đề".** Câu "Có ít nhất 100 chữ số 7 liên tiếp trong khai triển thập phân của π" — (a) có phải mệnh đề không? (b) Ta có biết giá trị chân lý của nó không? (c) Giải thích sự khác biệt giữa hai câu hỏi (a) và (b).

5. **Ký hiệu biến.** Cho p = "5 > 3", q = "√2 là số hữu tỷ", r = "Trái Đất có một Mặt Trăng". Xác định giá trị của từng biến. Sau đó đặt thêm hai biến mệnh đề s, t tự chọn — một biến có giá trị T, một biến có giá trị F.

---

## Lời giải chi tiết

**Bài 1.**

**"9 = 3²"** → **(a) Là mệnh đề. (b) T.** Câu khẳng định toán học: 3² = 9, phép kiểm tra: 3×3 = 9. ✓

**"Ai đã viết Hamlet?"** → **(a) Không phải mệnh đề.** Câu hỏi (dạng interrogative), không có giá trị chân lý.

**"Tất cả chim đều biết bay"** → **(a) Là mệnh đề. (b) F.** Câu khẳng định về cả lớp chim. Phản ví dụ: chim cánh cụt (penguin), đà điểu (ostrich), đà điểu emu, chim kiwi — đều là chim nhưng không biết bay. Một phản ví dụ là đủ để bác bỏ mệnh đề "tất cả".

**"n² + 1 > 0 với mọi số thực n"** → **(a) Là mệnh đề. (b) T.** Câu này không chứa biến tự do vì đã có lượng từ "với mọi n" ràng buộc n. Chứng minh: n² ≥ 0 với mọi n ∈ ℝ (bình phương không âm), suy ra n² + 1 ≥ 1 > 0. ✓

**"Đừng ăn kẹo trước bữa cơm!"** → **(a) Không phải mệnh đề.** Câu mệnh lệnh/cấm đoán, không có giá trị chân lý.

**"Số π là số hữu tỷ"** → **(a) Là mệnh đề. (b) F.** π ≈ 3.14159... — đã được chứng minh là số vô tỷ (irrational) từ thế kỷ 18 (Lambert, 1761), thậm chí là số siêu việt (transcendental, Lindemann, 1882).

---

**Bài 2.**

Câu "x² = 4" là câu mở với biến tự do x.

- Gán **x = 2**: "2² = 4" → 4 = 4 → **Mệnh đề T**. ✓
- Gán **x = −2**: "(−2)² = 4" → 4 = 4 → **Mệnh đề T**. ✓ (Có hai nghiệm.)
- Gán **x = 3**: "3² = 4" → 9 ≠ 4 → **Mệnh đề F**.
- Gán **x = 0**: "0² = 4" → 0 ≠ 4 → **Mệnh đề F**.

Câu mở x² = 4 trở thành mệnh đề ngay khi ta thay x bằng giá trị số cụ thể.

---

**Bài 3.**

Xét câu S = "Câu này không phải mệnh đề."

Thử gán **S = T** (câu này đúng): "S không phải mệnh đề" là đúng → S không phải mệnh đề → nhưng ta vừa giả sử S có giá trị T, tức S là mệnh đề → **mâu thuẫn**.

Thử gán **S = F** (câu này sai): "S không phải mệnh đề" là sai → S là mệnh đề (câu này phủ nhận được) → nhưng S = F có nghĩa S là mệnh đề → và nếu S là mệnh đề có giá trị F, thì "câu này không phải mệnh đề" là sai → S là mệnh đề. Không mâu thuẫn? Trông như vậy, nhưng: nếu S là mệnh đề (F), thì câu S nói "S không phải mệnh đề" — câu đó sai. Vậy S là một mệnh đề sai về chính bản thân nó. Đây là dạng tự-tham chiếu (self-reference) — không tạo nghịch lý cứng nhắc nhưng gây bất nhất về metadata. Logic hình thức tránh các câu tự-tham chiếu như thế này, vì chúng gây ra các bất nhất kiểu **Liar's Paradox**.

Kết luận: S nằm trong cùng lớp câu tự-tham chiếu không được phép trong logic hình thức — không phải mệnh đề hợp lệ.

---

**Bài 4.**

**(a)** Câu "Có ít nhất 100 chữ số 7 liên tiếp trong khai triển thập phân của π" **là mệnh đề**. Đây là câu khẳng định về tính chất của số π, không chứa biến tự do, không phải câu hỏi/mệnh lệnh, không tự-tham chiếu.

**(b)** Ta **không biết** giá trị chân lý của nó (tính đến nay). Khai triển của π được tính đến hàng nghìn tỷ chữ số nhưng chưa ai kiểm chứng đủ hay chứng minh lý thuyết câu này.

**(c)** Sự khác biệt mấu chốt:
- Câu hỏi **(a)** hỏi về **bản chất logic**: "Câu này có cấu trúc của mệnh đề không?" → Trả lời: Có, vì nó thỏa định nghĩa.
- Câu hỏi **(b)** hỏi về **trạng thái nhận thức**: "Con người hiện tại có biết giá trị đó không?" → Trả lời: Không.
- Một mệnh đề tồn tại và có giá trị khách quan *độc lập với việc con người có biết hay không*. Logic hình thức quan tâm đến cấu trúc và tính xác định, không phải khả năng nhận thức.

---

**Bài 5.**

- p = "5 > 3": **T** (5 lớn hơn 3 trên trục số).
- q = "√2 là số hữu tỷ": **F** (đã chứng minh √2 vô tỷ — không viết dưới dạng a/b với a, b ∈ ℤ).
- r = "Trái Đất có một Mặt Trăng": **T** (Trái Đất có đúng một vệ tinh tự nhiên là Mặt Trăng / Luna).

Ví dụ đặt thêm:
- s = "10 là số chẵn": **T** (10 = 2×5, chia hết cho 2).
- t = "Tất cả số nguyên tố đều lớn hơn 2": **F** (phản ví dụ: 2 là số nguyên tố nhưng 2 = 2, không lớn hơn 2).

---

## Code & Minh họa

- [visualization.html](./visualization.html) — Máy phân loại mệnh đề tương tác: người dùng đoán từng câu có phải mệnh đề không, nếu là mệnh đề thì giá trị T hay F — chấm điểm và giải thích chi tiết. Kèm bảng biến p, q, r minh họa và bộ kiểm tra tiêu chí 3 bước.

---

## Bài tiếp theo

→ **Lesson 02 — Bảng chân lý & liên từ logic**: cách ghép mệnh đề bằng ∧ (và), ∨ (hoặc), ¬ (phủ định), → (kéo theo), ↔ (tương đương) và cách lập bảng chân lý để tính giá trị mệnh đề phức.

[⬆ Về Formal Logic](../index.html) · [🏠 Trang chính Philosophy](../../index.html)
