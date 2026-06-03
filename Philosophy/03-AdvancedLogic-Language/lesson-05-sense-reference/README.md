# Lesson 05 — Ngữ nghĩa & quy chiếu (Sense & Reference)

> **Tầng 3 — Advanced Logic & Language · Bài 5/8**

Bài học này đi sâu vào câu hỏi cốt lõi của triết học ngôn ngữ: **khi ta nói một từ hay cụm từ, nó "có nghĩa" là gì?** Hai tên gọi khác nhau có thể chỉ cùng một thứ — nhưng chúng không hoàn toàn đồng nhất về mặt ngôn ngữ. Frege (1848–1925) là người đầu tiên phân tích chính xác sự phân biệt này, và Russell (1872–1970) tiếp tục giải quyết vấn đề hóc búa hơn: điều gì xảy ra khi một cụm từ không chỉ tới cái gì cả?

## Mục tiêu học tập

Sau bài này, bạn có thể:

- Phân biệt **nghĩa (Sinn/sense)** và **quy chiếu (Bedeutung/reference)** theo Frege, giải thích bằng ví dụ cụ thể.
- Giải thích vì sao câu đồng nhất dạng **a = b** mang thông tin còn **a = a** thì không.
- Phát biểu câu cũng có nghĩa (tư tưởng/thought) và quy chiếu (giá trị chân lý T/F).
- Trình bày lý thuyết mô tả xác định (definite descriptions) của Russell và phân tích logic của nó.
- Nhận biết sự khác nhau giữa tên riêng, mô tả xác định, và chỉ định cứng (rigid designator) theo Kripke.
- Tránh hai lỗi kinh điển: nhầm "cùng quy chiếu" với "cùng nghĩa", và nhầm "không quy chiếu" với "vô nghĩa".

## Kiến thức tiền đề

- [Lesson 05 — Logic vị từ (Predicate Logic)](../../01-FormalLogic/lesson-05-predicate-logic/) — lý thuyết này dùng ký hiệu ∃x, ∀x, và hàm vị từ P(x).
- [Lesson 01 — Mệnh đề & giá trị chân lý](../../01-FormalLogic/lesson-01-propositions/) — khái niệm giá trị chân lý T/F là nền tảng cho phân tích của Frege về câu.
- [Lesson 04 — Logic mờ & đa giá trị](../lesson-04-fuzzy-manyvalued/) — giúp đặt bối cảnh: logic cổ điển hai giá trị mà Frege và Russell dùng.

---

## 1. Bối cảnh: Vấn đề của câu đồng nhất

> 💡 **Trực giác.** Hãy tưởng tượng một người thời cổ đại. Mỗi sáng họ thấy một ngôi sao sáng trên bầu trời trước khi Mặt Trời mọc — họ gọi nó là "Sao Mai" (morning star). Mỗi chiều họ thấy một ngôi sao sáng khác khi Mặt Trời vừa lặn — họ gọi là "Sao Hôm" (evening star). Rồi các nhà thiên văn phát hiện: hai "ngôi sao" đó thực ra là **cùng một thiên thể** — hành tinh Venus (Sao Kim). Thông tin này thật sự mới mẻ và gây ngạc nhiên. Nhưng tại sao? "Sao Mai = Sao Hôm" và "Sao Mai = Sao Mai" — cả hai đều nói về cùng một vật, vậy tại sao cái đầu mang thông tin còn cái sau thì không?

Gottlob Frege đặt câu hỏi này trong bài luận kinh điển **"Über Sinn und Bedeutung" (1892)**. Ông nhận ra rằng logic và toán học của thời đó không thể giải thích hiện tượng này — và để giải quyết, ông cần phân biệt hai thứ mà trước đó người ta vẫn lẫn lộn: **nghĩa** và **quy chiếu**.

Câu hỏi cụ thể: Nếu "a" và "b" cùng chỉ một đối tượng, thì tại sao "a = a" (ví dụ: "Sao Mai = Sao Mai") chỉ là tautology vô nghĩa, còn "a = b" ("Sao Mai = Sao Hôm") lại là phát hiện có thể mở rộng kiến thức con người?

> 📝 **Tóm tắt mục 1.**
> - Câu đồng nhất dạng a = a hiển nhiên, không mang thông tin.
> - Câu đồng nhất dạng a = b (khi a ≠ b về tên gọi nhưng cùng chỉ một vật) lại mang thông tin.
> - Điều này đòi hỏi phân biệt hai cấp độ ý nghĩa — là bài toán mà Frege giải quyết.

---

## 2. Phân biệt Nghĩa (Sinn) và Quy chiếu (Bedeutung) — Frege

> 💡 **Trực giác.** Hãy dùng ẩn dụ của chính Frege: cùng một điểm trên Mặt Trăng, bạn có thể chỉ tới nó bằng kính thiên văn ở Paris, bằng kính thiên văn ở Hà Nội, hay bằng ảnh vệ tinh. Cùng một đích — nhưng ba con đường tiếp cận khác nhau. **Quy chiếu** là cái đích (điểm trên Mặt Trăng). **Nghĩa** là con đường/cách thức dẫn tới đích đó (góc quan sát, phương thức trình hiện).

### 2.1 Định nghĩa chính thức

**(a) Quy chiếu (Bedeutung / reference)** là **đối tượng trong thế giới** mà một biểu thức ngôn ngữ chỉ tới. Nó là "cái được nói đến" — độc lập với cách diễn đạt.

**(b) Nghĩa (Sinn / sense)** là **"cách thức trình hiện" (mode of presentation)** đối tượng đó — cách mà biểu thức dẫn dắt tâm trí đến quy chiếu. Đây là nội dung nhận thức (cognitive content) của biểu thức.

> ⚠ **Lỗi thường gặp:** nhiều người đọc thoáng hiểu "nghĩa" là "định nghĩa" hay "khái niệm" thông thường. Chính xác hơn: nghĩa theo Frege là **mode of presentation** — cách biểu thức xác định quy chiếu của nó. Hai biểu thức có thể có cùng quy chiếu nhưng khác nhau về cách xác định quy chiếu đó → khác nghĩa.

### 2.2 Ví dụ cụ thể (≥ 4)

**Ví dụ 1: Sao Mai / Sao Hôm / Sao Kim**

| Biểu thức | Nghĩa (Sinn) | Quy chiếu (Bedeutung) |
|-----------|-------------|----------------------|
| "Sao Mai" (morning star) | Thiên thể sáng nhất trên bầu trời phía đông vào buổi sáng sớm | Venus (Sao Kim) |
| "Sao Hôm" (evening star) | Thiên thể sáng nhất trên bầu trời phía tây vào buổi hoàng hôn | Venus (Sao Kim) |
| "Sao Kim" / "Venus" | Hành tinh thứ hai tính từ Mặt Trời trong hệ mặt trời | Venus (Sao Kim) |

Ba nghĩa hoàn toàn khác nhau — ba cách xác định đối tượng khác nhau — nhưng đều trỏ về **cùng một quy chiếu**: hành tinh Venus.

**Ví dụ 2: Tác giả Truyện Kiều / Ông Tố Như / Nguyễn Du**

| Biểu thức | Nghĩa (Sinn) | Quy chiếu (Bedeutung) |
|-----------|-------------|----------------------|
| "tác giả của Truyện Kiều" | Người đã viết tác phẩm văn học Truyện Kiều | Nguyễn Du (1766–1820) |
| "Ông Tố Như" | Người có tên hiệu Tố Như | Nguyễn Du (1766–1820) |
| "Nguyễn Du" | Tên riêng chỉ định con người cụ thể | Nguyễn Du (1766–1820) |

Ba cách tiếp cận đến cùng một người thật — quy chiếu giống nhau, nghĩa khác nhau.

**Ví dụ 3: Số chẵn nhỏ nhất dương / Cơ số hệ nhị phân**

| Biểu thức | Nghĩa (Sinn) | Quy chiếu (Bedeutung) |
|-----------|-------------|----------------------|
| "số chẵn nhỏ nhất dương" | Số nguyên dương nhỏ nhất chia hết cho 2 | Số 2 |
| "cơ số của hệ nhị phân" | Số đơn vị trong hệ đếm dùng trong máy tính | Số 2 |
| "số nguyên tố nhỏ nhất" | Số nguyên lớn hơn 1, chỉ có hai ước: 1 và chính nó, và nhỏ nhất | Số 2 |

**Ví dụ 4: "Tổng thống Hoa Kỳ năm 1865" / "người ký Tuyên ngôn giải phóng nô lệ"**

| Biểu thức | Nghĩa (Sinn) | Quy chiếu (Bedeutung) |
|-----------|-------------|----------------------|
| "Tổng thống Hoa Kỳ năm 1865" | Người giữ chức tổng thống Mỹ trong năm 1865 | Abraham Lincoln |
| "người ký Tuyên ngôn Giải phóng Nô lệ" | Người ký sắc lệnh giải phóng nô lệ năm 1863 | Abraham Lincoln |

Câu "Tổng thống Hoa Kỳ năm 1865 là người ký Tuyên ngôn Giải phóng Nô lệ" — mang thông tin thực sự dù cả hai vế cùng quy chiếu về Lincoln.

> ❓ **Câu hỏi tự nhiên của người đọc.**
> - *"Mọi biểu thức đều có cả nghĩa lẫn quy chiếu không?"* — Theo Frege: không nhất thiết. Biểu thức có thể có nghĩa mà không có quy chiếu. Ví dụ: "Vua nước Pháp hiện nay" — có nghĩa rõ ràng (cách xác định: người giữ ngôi vua nước Pháp vào lúc này), nhưng **không có quy chiếu** vì nước Pháp hiện không có vua. Đây là bài toán Russell sẽ giải ở phần sau.
> - *"Nếu hai biểu thức cùng quy chiếu, có thể thay thế cho nhau trong mọi câu không?"* — **Không!** Đây là lỗi quan trọng cần tránh. Xem mục 2.3.
> - *"Tên riêng có nghĩa không?"* — Frege nói có — tên riêng như "Nguyễn Du" có cả nghĩa (mode of presentation) lẫn quy chiếu. Nhưng Kripke (xem mục 5) phản bác: tên riêng là "chỉ định cứng" (rigid designator) không qua trung gian mô tả.

### 2.3 Cùng quy chiếu KHÔNG có nghĩa là cùng nghĩa

> ⚠ **Lỗi nguy hiểm nhất trong chủ đề này.** Nếu "Sao Mai" và "Sao Hôm" cùng quy chiếu về Venus, ta KHÔNG thể thay thế tùy tiện trong mọi ngữ cảnh.

**Ví dụ phản chứng:**

Câu A: "Người Babylon cổ đại biết rằng **Sao Mai** là thiên thể sáng trước bình minh."

Câu B: "Người Babylon cổ đại biết rằng **Sao Hôm** là thiên thể sáng trước bình minh."

Câu A có thể đúng (họ quan sát Sao Mai mỗi sáng). Câu B thì sai — họ không biết Sao Hôm = Sao Mai. Nếu ta chỉ nhìn vào quy chiếu (cùng là Venus) và thay thế, ta sẽ sai.

Ngữ cảnh "biết rằng...", "tin rằng...", "nghĩ rằng..." — gọi là **ngữ cảnh cố tình (intentional context)** — là nơi thay thế đồng quy chiếu có thể thay đổi giá trị chân lý của câu. Trong những ngữ cảnh này, nghĩa (sense), không phải quy chiếu, là yếu tố quyết định.

> 🔁 **Dừng lại tự kiểm tra.** Cho hai mệnh đề:
> (1) "Nguyễn Du là người viết Truyện Kiều."
> (2) "Ông Tố Như là người viết Truyện Kiều."
>
> Hai câu có cùng giá trị chân lý không? Nghĩa (Sinn) có khác không? Quy chiếu của chủ ngữ có khác không?
>
> <details><summary>Đáp án</summary>
>
> - Giá trị chân lý: cả hai đều T — cùng nói đúng về một sự thật lịch sử.
> - Quy chiếu của chủ ngữ: giống nhau — cùng chỉ Nguyễn Du.
> - Nghĩa (Sinn) của chủ ngữ: khác nhau — "Nguyễn Du" là tên riêng trực tiếp; "Ông Tố Như" tiếp cận qua tên hiệu/biệt danh của ông. Hai cách trình hiện khác nhau.
> - Sự khác biệt này trở nên quan trọng trong ngữ cảnh cố tình: "Người học trò không biết tên Nguyễn Du, nhưng biết rằng Ông Tố Như viết Truyện Kiều" — nếu thay "Ông Tố Như" bằng "Nguyễn Du" trong câu này, nó có thể trở thành sai về mặt nhận thức của người học trò đó.
> </details>

> 📝 **Tóm tắt mục 2.**
> - Quy chiếu = đối tượng thực trong thế giới mà biểu thức chỉ tới.
> - Nghĩa = cách thức trình hiện (mode of presentation) — con đường dẫn tới quy chiếu.
> - Hai biểu thức có thể: cùng quy chiếu + khác nghĩa (Sao Mai / Sao Hôm); cùng quy chiếu + cùng nghĩa (hiếm); hoặc cùng nghĩa + cùng quy chiếu.
> - Trong ngữ cảnh cố tình (biết/tin/nghĩ rằng), thay thế đồng quy chiếu có thể đổi giá trị chân lý — vì nghĩa mới là yếu tố quyết định ở đây.

---

## 3. Câu cũng có Nghĩa và Quy chiếu — mở rộng của Frege

> 💡 **Trực giác.** Frege không dừng ở từ và cụm từ — ông hỏi: "Câu như 'Hà Nội là thủ đô Việt Nam' có quy chiếu không?" Câu chỉ tới cái gì? Và cách mà câu "trình hiện" cái đó là gì?

Frege mở rộng lý thuyết sang cả câu (sentence):

- **Nghĩa của câu (sense of a sentence)** = **tư tưởng (Gedanke / thought)** mà câu biểu đạt — nội dung khách quan, có thể được chia sẻ giữa nhiều người, tồn tại độc lập với bất kỳ ai nghĩ đến nó.

- **Quy chiếu của câu (reference of a sentence)** = **giá trị chân lý (Wahrheitswert / truth value)**: ĐÚNG (T) hoặc SAI (F).

**Phân tích 4 ví dụ câu:**

| Câu | Tư tưởng (sense) | Giá trị chân lý (reference) |
|-----|-----------------|---------------------------|
| "Hà Nội là thủ đô Việt Nam" | Tư tưởng về mối quan hệ giữa thành phố Hà Nội và vai trò thủ đô của Việt Nam | **T** |
| "7 là số chẵn" | Tư tưởng về tính chẵn của số 7 | **F** |
| "Mặt Trời quay quanh Trái Đất" | Tư tưởng về chuyển động tương đối của Mặt Trời và Trái Đất | **F** |
| "√2 là số vô tỷ" | Tư tưởng về tính chất số học của √2 | **T** |

**Hệ quả quan trọng:** Tất cả câu đúng đều có cùng quy chiếu (đều chỉ về giá trị T), và tất cả câu sai đều có cùng quy chiếu (đều chỉ về giá trị F). Nhưng tư tưởng (sense) của chúng thì hoàn toàn khác nhau.

> ❓ **Câu hỏi tự nhiên của người đọc.**
> - *"Nếu mọi câu đúng đều có cùng quy chiếu, sao không thể thay câu này bằng câu kia?"* — Đúng vì lý do tương tự ở mục 2.3: trong ngữ cảnh cố tình, thay thế đồng quy chiếu phá vỡ nghĩa. "Galileo tin rằng Trái Đất quay quanh Mặt Trời" — tư tưởng (sense) của mệnh đề phụ quan trọng, không chỉ giá trị chân lý.
> - *"Câu không có giá trị chân lý thì sao?"* — Ví dụ "Vua Pháp hiện nay hói đầu" — nếu chủ ngữ không quy chiếu, câu cũng không có quy chiếu (không có giá trị chân lý xác định). Frege thừa nhận ngôn ngữ tự nhiên có những câu như vậy — đây chính là vấn đề mà Russell giải quyết (mục 4).

> 🔁 **Dừng lại tự kiểm tra.** Theo lý thuyết Frege, hai câu "2 + 2 = 4" và "Paris là thủ đô của Pháp" có cùng quy chiếu không? Có cùng nghĩa không?
>
> <details><summary>Đáp án</summary>
>
> - Quy chiếu: **Cùng nhau** — cả hai đều đúng, quy chiếu về giá trị chân lý **T**.
> - Nghĩa (tư tưởng): **Khác hoàn toàn** — "2+2=4" biểu đạt tư tưởng về số học; "Paris là thủ đô của Pháp" biểu đạt tư tưởng về địa lý chính trị. Đây là hai tư tưởng hoàn toàn độc lập.
> </details>

> 📝 **Tóm tắt mục 3.**
> - Câu có nghĩa = tư tưởng (thought / Gedanke) mà câu biểu đạt.
> - Câu có quy chiếu = giá trị chân lý T hoặc F.
> - Mọi câu đúng cùng quy chiếu (T); mọi câu sai cùng quy chiếu (F) — nhưng nghĩa (tư tưởng) hoàn toàn khác nhau.

---

## 4. Lý thuyết mô tả xác định của Russell

> 💡 **Trực giác.** Frege để lại một vấn đề chưa giải: câu "Vua nước Pháp hiện nay hói đầu" — nếu không có vua Pháp, câu này không có quy chiếu, do đó không có giá trị chân lý T hay F? Nhưng đợi đã — trực giác mách bảo câu này **sai**, không phải "vô nghĩa" hay "không có giá trị". Bertrand Russell đề xuất phân tích khác hẳn.

### 4.1 Vấn đề từ không quy chiếu (non-referring expressions)

Trong ngôn ngữ tự nhiên, nhiều biểu thức trông như tên riêng hay mô tả xác định nhưng không có gì để chỉ tới:

- "Vua nước Pháp hiện nay" — Pháp là cộng hòa, không có vua.
- "Con trai cả của ông A" — nếu ông A không có con trai.
- "Số tự nhiên lớn nhất" — không tồn tại (dãy số tự nhiên vô hạn).
- "Bộ phim đầu tiên được quay trên Mặt Trăng năm 2024" — chưa tồn tại.

Frege giải quyết bằng cách nói: những biểu thức này có nghĩa nhưng không có quy chiếu — và câu chứa chúng cũng không có quy chiếu (không có giá trị chân lý). Russell phản đối: điều này không khớp với trực giác và gây ra vấn đề nghiêm trọng cho logic.

### 4.2 Phân tích của Russell: mô tả xác định không phải tên riêng

Russell lập luận: **mô tả xác định (definite description)** — dạng "the F" (tiếng Anh) hay "cái F" — **không phải là tên riêng** và không trực tiếp chỉ tới đối tượng. Thay vào đó, nó là một cách viết tắt của một **mệnh đề phức** với ký hiệu lượng từ.

**Phân tích dạng chuẩn của "The F is G" (Cái-duy-nhất-F là G):**

```
∃x(F(x) ∧ ∀y(F(y) → y = x) ∧ G(x))
```

Đọc là: "Tồn tại một x sao cho: x là F, và mọi y là F thì y = x (tính duy nhất), và x là G."

Ba điều kiện trong phân tích Russell:
1. **Tồn tại**: có ít nhất một thứ là F.
2. **Duy nhất**: có nhiều nhất một thứ là F (chỉ có duy nhất).
3. **Vị từ**: thứ duy nhất đó là G.

Nếu **thiếu bất kỳ điều kiện nào**, câu là **SAI** — không phải vô nghĩa.

### 4.3 Phân tích cụ thể ≥ 4 ví dụ

**Ví dụ 1: "Vua nước Pháp hiện nay hói đầu" — câu kinh điển của Russell**

```
"Vua nước Pháp hiện nay hói đầu"
= ∃x(Vua_Pháp(x) ∧ ∀y(Vua_Pháp(y) → y=x) ∧ Hói(x))
```

- Điều kiện tồn tại: Có tồn tại vua Pháp hiện nay không? **Không** — Pháp là cộng hòa.
- Kết quả: Câu là **SAI** (vì điều kiện tồn tại không thỏa).

Đây là điểm mấu chốt: Russell không nói câu vô nghĩa — câu có nghĩa hoàn chỉnh (ta hiểu nó nói gì) nhưng là **sai** vì phân tích logic của nó không được thỏa mãn trong thực tế.

**Ví dụ 2: "Tác giả Truyện Kiều là nhà thơ lớn" — câu đúng**

```
"Tác giả của Truyện Kiều là nhà thơ lớn"
= ∃x(TácGiả_TruyệnKiều(x) ∧ ∀y(TácGiả_TruyệnKiều(y) → y=x) ∧ NhàThơLớn(x))
```

- Điều kiện tồn tại: Có tác giả Truyện Kiều không? **Có** (Nguyễn Du).
- Điều kiện duy nhất: Có đúng một tác giả? **Có** (chỉ một người).
- Điều kiện vị từ: Nguyễn Du có phải nhà thơ lớn? **Có**.
- Kết quả: Câu **ĐÚNG**.

**Ví dụ 3: "Số tự nhiên lớn nhất là số lẻ" — câu sai do không tồn tại**

```
= ∃x(SốTNLớnNhất(x) ∧ ∀y(SốTNLớnNhất(y) → y=x) ∧ SốLẻ(x))
```

- Điều kiện tồn tại: Có số tự nhiên lớn nhất không? **Không** — vô hạn.
- Kết quả: Câu **SAI**.

**Ví dụ 4: "Hành tinh gần Mặt Trời nhất có vành đai" — câu sai do vị từ sai**

```
= ∃x(HànhTinhGầnNhất(x) ∧ ∀y(HànhTinhGầnNhất(y) → y=x) ∧ CóVànhĐai(x))
```

- Tồn tại: Có hành tinh gần Mặt Trời nhất không? **Có** (Sao Thủy / Mercury).
- Duy nhất: Có đúng một? **Có**.
- Vị từ: Sao Thủy có vành đai không? **Không** (Saturn mới có vành đai nổi tiếng).
- Kết quả: Câu **SAI** (vì điều kiện 3 không thỏa).

> ⚠ **Lỗi thường gặp:** nghĩ rằng "câu không quy chiếu = câu vô nghĩa". Russell chứng minh ngược lại: câu "Vua Pháp hói đầu" hoàn toàn có nghĩa — ta hiểu nó đòi hỏi gì — nhưng nó **sai** vì điều kiện tồn tại không được thỏa mãn. Vô nghĩa và sai là hai điều khác nhau hoàn toàn.

> ❓ **Câu hỏi tự nhiên của người đọc.**
> - *"Vậy câu phủ định 'Vua Pháp hiện nay không hói đầu' thì đúng hay sai?"* — Đây là câu hỏi tinh tế! Russell phân biệt **phủ định hạn hẹp** (narrow scope negation) và **phủ định rộng** (wide scope negation). "Không phải: [vua Pháp hói]" → phủ định rộng → ĐÚNG (vì câu gốc sai). "Vua Pháp không hói" → phủ định hạn hẹp → SAI theo cùng lý do (điều kiện tồn tại vẫn không thỏa). Đây là nguồn gốc của nhiều tranh luận trong triết học ngôn ngữ.
> - *"Lý thuyết Russell có vấn đề gì không?"* — Có. Strawson (1950) phản bác: khi nói "Vua Pháp hói", người nói **presuppose** (tiền giả định) rằng có vua Pháp — câu không sai mà chỉ đơn giản là không thể đánh giá (presupposition failure). Đây là tranh luận mở.
> - *"Nếu mô tả xác định không phải tên riêng, vậy tên riêng như 'Nguyễn Du' là gì?"* — Russell: tên riêng trong ngôn ngữ thường cũng là mô tả ẩn. Kripke (mục 5) phản bác hoàn toàn.

> 🔁 **Dừng lại tự kiểm tra.** Phân tích theo Russell: "Người đầu tiên đi bộ trên Mặt Trăng là người Mỹ." Câu đúng hay sai? Ba điều kiện là gì?
>
> <details><summary>Đáp án</summary>
>
> Phân tích: ∃x(NTĐầuTiên_MặtTrăng(x) ∧ ∀y(NTĐầuTiên_MặtTrăng(y)→y=x) ∧ NgườiMỹ(x))
>
> 1. **Tồn tại**: Có người đầu tiên đi bộ trên Mặt Trăng không? **Có** — Neil Armstrong (Apollo 11, 1969).
> 2. **Duy nhất**: Có đúng một người đầu tiên không? **Có** — Armstrong là đầu tiên đặt chân, Buzz Aldrin là thứ hai.
> 3. **Vị từ**: Armstrong có phải người Mỹ không? **Có**.
>
> Kết quả: Câu **ĐÚNG** — cả ba điều kiện thỏa mãn.
> </details>

> 📝 **Tóm tắt mục 4.**
> - Mô tả xác định "the F" không phải tên riêng — Russell phân tích thành ∃x(F(x) ∧ duy nhất ∧ G(x)).
> - Câu chứa mô tả không quy chiếu không vô nghĩa mà là **SAI** (điều kiện tồn tại không thỏa).
> - Ba điều kiện: tồn tại + duy nhất + vị từ — thiếu bất kỳ một điều kiện nào → câu sai.
> - Phân biệt "sai" (đánh giá được) vs "vô nghĩa" (không đánh giá được) là điểm mấu chốt.

---

## 5. Chỉ định cứng của Kripke (sơ lược)

> 💡 **Trực giác.** Russell và Frege đều xem tên riêng như "mô tả rút gọn" — "Aristotle" rút gọn cho "người dạy Alexander Đại đế" hay "tác giả Nicomachean Ethics". Kripke (trong *Naming and Necessity*, 1972) phản bác: điều này sai về mặt ngôn ngữ và mô hình thế giới khả dĩ.

### 5.1 Chỉ định cứng (rigid designator)

Kripke lập luận: tên riêng (proper name) là **chỉ định cứng** — nó chỉ tới **cùng một cá thể trong mọi thế giới khả dĩ (possible world)** nơi cá thể đó tồn tại.

Ví dụ: "Aristotle" chỉ tới con người cụ thể đó — Aristotle thật — trong mọi thế giới khả dĩ. Kể cả trong một thế giới khả dĩ nơi Aristotle không dạy Alexander, không viết Nicomachean Ethics, "Aristotle" vẫn chỉ tới ông ấy (nếu ông ấy còn tồn tại trong thế giới đó).

Ngược lại, mô tả xác định "người dạy Alexander Đại đế" là **chỉ định mềm (non-rigid designator)** — nó có thể chỉ tới người khác trong thế giới khả dĩ khác (thế giới nơi người khác dạy Alexander).

### 5.2 Hệ quả quan trọng

| Loại biểu thức | Ví dụ | Chỉ định |
|----------------|-------|----------|
| Tên riêng | "Nguyễn Du", "Venus", "Aristotle" | Cứng (rigid) — cùng cá thể trong mọi thế giới khả dĩ |
| Mô tả xác định | "tác giả Truyện Kiều", "Sao Hôm" | Mềm (non-rigid) — chỉ tới cá thể khác trong thế giới khả dĩ khác |

Kripke kết luận: "Sao Mai = Sao Hôm" (hay "Hesperus = Phosphorus" tiếng Anh) là **tất yếu a posteriori** — nhất thiết đúng (vì cả hai tên cứng chỉ Venus), nhưng chỉ biết được bằng kinh nghiệm (a posteriori), không phải thuần lý luận.

> ⚠ **Lỗi thường gặp:** nhầm "tất yếu" (necessary) với "biết trước được bằng lý luận thuần túy" (a priori). Kripke chứng minh có thứ vừa tất yếu vừa phải tìm ra bằng kinh nghiệm — đây là phát hiện quan trọng của ông.

> 📝 **Tóm tắt mục 5.**
> - Tên riêng = chỉ định cứng: cùng cá thể trong mọi thế giới khả dĩ.
> - Mô tả xác định = chỉ định mềm: có thể chỉ cá thể khác trong thế giới khả dĩ khác.
> - "Sao Mai = Sao Hôm" là tất yếu (necessary) nhưng a posteriori — mang thông tin thực nghiệm.

---

## 6. Tổng hợp: Sơ đồ quan hệ

Dưới đây là bảng so sánh ba nhà triết học và quan điểm chính:

| Nhà triết học | Vấn đề giải quyết | Quan điểm chính | Hạn chế / Phản bác |
|--------------|------------------|-----------------|-------------------|
| **Frege** | Vì sao a=b mang tin còn a=a không? | Phân biệt Sinn (nghĩa) / Bedeutung (quy chiếu); câu có tư tưởng và giá trị chân lý | Câu không quy chiếu không có giá trị chân lý — Russell phản bác |
| **Russell** | Từ không quy chiếu làm gì? | Mô tả xác định = ∃x(F∧duy nhất∧G); câu không quy chiếu là SAI, không vô nghĩa | Strawson: đây là presupposition failure, không phải câu sai |
| **Kripke** | Tên riêng là mô tả rút gọn? | Tên riêng = rigid designator; "tất yếu a posteriori" | Vẫn còn tranh luận về tên hư cấu, tên loài... |

---

## Bài tập

**Bài 1.** Cho các cặp biểu thức sau. Với mỗi cặp: (a) chúng có cùng quy chiếu không? (b) chúng có cùng nghĩa (sense) không? (c) giải thích ngắn gọn.

  - "số chẵn nhỏ nhất" và "số nguyên tố nhỏ nhất"
  - "thủ đô của Việt Nam" và "Hà Nội"
  - "Trái Đất" và "hành tinh thứ ba trong hệ Mặt Trời"
  - "người ký Bản Tuyên ngôn Độc lập Việt Nam năm 1945" và "Hồ Chí Minh"

**Bài 2.** Giải thích tại sao câu "Sao Mai = Sao Mai" hiển nhiên và không mang thông tin, còn "Sao Mai = Sao Hôm" lại là một phát hiện lịch sử quan trọng. Dùng khái niệm Sinn / Bedeutung của Frege.

**Bài 3.** Phân tích theo Russell câu "Người đứng đầu chính quyền Việt Nam Dân chủ Cộng hòa năm 1945 là người yêu nước." Viết dạng logic ∃x(...) và đánh giá giá trị chân lý.

**Bài 4.** Câu "Vua hiện tại của Anh đang ngồi" — theo Frege, câu này có giá trị chân lý không? Theo Russell thì sao? (Lưu ý: Anh có vua/nữ hoàng — hãy kiểm tra bối cảnh thực tế.)

**Bài 5.** Vì sao không thể thay thế "Nguyễn Du" bằng "tác giả Truyện Kiều" trong câu "Nhiều người biết tên Nguyễn Du nhưng chưa đọc tác phẩm của tác giả Truyện Kiều" mà không thay đổi nghĩa? Dùng khái niệm ngữ cảnh cố tình (intentional context).

**Bài 6 (nâng cao).** Kripke lập luận "Sao Mai = Sao Hôm" là tất yếu (necessary) mà lại a posteriori. Hãy giải thích ý nghĩa của luận điểm này và tại sao nó đối lập với quan điểm Frege (theo đó hai biểu thức khác nghĩa → câu là a posteriori nhưng không nhất thiết tất yếu).

---

## Lời giải chi tiết

**Bài 1.**

**(a) "số chẵn nhỏ nhất" và "số nguyên tố nhỏ nhất":**
- Quy chiếu: **cùng nhau** — cả hai đều chỉ tới số 2. (2 là số chẵn nhỏ nhất dương; 2 là số nguyên tố nhỏ nhất.)
- Nghĩa: **khác nhau** — "số chẵn nhỏ nhất" xác định 2 qua tính chẵn và tính cực tiểu; "số nguyên tố nhỏ nhất" xác định 2 qua tính nguyên tố và tính cực tiểu. Hai con đường nhận thức khác nhau.

**(b) "thủ đô của Việt Nam" và "Hà Nội":**
- Quy chiếu: **cùng nhau** — cùng chỉ thành phố Hà Nội.
- Nghĩa: **khác nhau** — "thủ đô của Việt Nam" là mô tả xác định (xác định qua vai trò chính trị-hành chính); "Hà Nội" là tên riêng (theo Kripke: rigid designator, chỉ tới thành phố đó trong mọi thế giới khả dĩ). Ngoài ra: trong một thế giới khả dĩ nơi Hà Nội không được chọn làm thủ đô, "thủ đô của Việt Nam" sẽ chỉ tới thành phố khác, còn "Hà Nội" vẫn chỉ tới Hà Nội.

**(c) "Trái Đất" và "hành tinh thứ ba trong hệ Mặt Trời":**
- Quy chiếu: **cùng nhau** — Trái Đất là hành tinh thứ ba tính từ Mặt Trời (sau Sao Thủy và Sao Kim).
- Nghĩa: **khác nhau** — "Trái Đất" là tên riêng cứng; "hành tinh thứ ba trong hệ Mặt Trời" là mô tả mềm (nếu hệ Mặt Trời thay đổi thứ tự hành tinh trong thế giới khả dĩ, mô tả này chỉ tới hành tinh khác).

**(d) "người ký Bản Tuyên ngôn Độc lập Việt Nam năm 1945" và "Hồ Chí Minh":**
- Quy chiếu: **cùng nhau** — đều chỉ tới Hồ Chí Minh (1890–1969), người đã ký Tuyên ngôn Độc lập ngày 2/9/1945.
- Nghĩa: **khác nhau** — một là mô tả xác định qua sự kiện lịch sử; một là tên riêng cứng.

---

**Bài 2.**

Theo phân biệt Sinn/Bedeutung của Frege:

"Sao Mai = Sao Mai":
- Vế trái và vế phải có **cùng nghĩa** (Sinn giống nhau) và **cùng quy chiếu** (Venus).
- Câu chỉ nói: đối tượng được trình hiện theo cách X bằng cách X — tautology về mặt nhận thức.
- Không mang thông tin mới: ai đã hiểu "Sao Mai" thì biết ngay câu này đúng, không cần quan sát thêm.

"Sao Mai = Sao Hôm":
- Vế trái có **nghĩa khác** (thiên thể sáng buổi sáng) với vế phải (thiên thể sáng buổi chiều).
- Nhưng cả hai có **cùng quy chiếu**: Venus.
- Câu này nối hai **mode of presentation** khác nhau về cùng một đối tượng — thông tin: con đường nhận thức buổi sáng và con đường nhận thức buổi chiều dẫn tới cùng đích!
- Đây là phát hiện thiên văn thực sự: người Babylon cổ đại không biết điều này — họ nghĩ Sao Mai và Sao Hôm là hai thiên thể khác nhau. Phát hiện này đòi hỏi quan sát và tính toán thiên văn.

Kết luận: Câu a=a chỉ nói về quan hệ của một nghĩa với chính nó — vô ích nhận thức. Câu a=b (khác nghĩa, cùng quy chiếu) nói về quan hệ giữa **hai mode of presentation** về cùng đối tượng — đó là thông tin thực sự về thế giới.

---

**Bài 3.**

Câu: "Người đứng đầu chính quyền Việt Nam Dân chủ Cộng hòa năm 1945 là người yêu nước."

Phân tích Russell:

```
∃x(ĐứngĐầu_VNDCCH_1945(x) 
   ∧ ∀y(ĐứngĐầu_VNDCCH_1945(y) → y = x) 
   ∧ YêuNước(x))
```

Đánh giá ba điều kiện:
1. **Tồn tại**: Có người đứng đầu chính quyền VNDCCH năm 1945 không? **Có** — Chủ tịch Hồ Chí Minh, lãnh đạo chính phủ sau tuyên ngôn độc lập 2/9/1945.
2. **Duy nhất**: Có đúng một người đứng đầu không? **Có** — vị trí Chủ tịch nước/người đứng đầu là duy nhất.
3. **Vị từ**: Người đó (Hồ Chí Minh) có phải người yêu nước không? **Có** — lịch sử Việt Nam ghi nhận rõ ràng.

**Kết quả: Câu ĐÚNG (T)**. Cả ba điều kiện đều thỏa mãn.

---

**Bài 4.**

**Theo Frege:**
- "Vua hiện tại của Anh" — biểu thức này có nghĩa (Sinn: người đang trị vì vương quốc Anh).
- Quy chiếu: Nước Anh hiện có vua — Vua Charles III (kế vị sau khi Nữ hoàng Elizabeth II mất năm 2022). Vậy biểu thức CÓ quy chiếu.
- Câu "Vua hiện tại của Anh đang ngồi" — có thể đúng hoặc sai tùy thời điểm và hành vi thực tế của Vua Charles. Về mặt lý thuyết: câu có giá trị chân lý T hoặc F.

**Theo Russell:**
- Phân tích: ∃x(Vua_Anh_HiệnNay(x) ∧ duy nhất ∧ ĐangNgồi(x))
- Điều kiện tồn tại: Có vua Anh hiện nay không? **Có** (Charles III).
- Điều kiện duy nhất: Có đúng một vua? **Có**.
- Điều kiện vị từ: Vua Charles hiện đang ngồi? — phụ thuộc thực tế tại thời điểm nói.
- Câu có giá trị T hoặc F — **không phải trường hợp không quy chiếu** (khác với ví dụ "Vua Pháp" vì Pháp thực sự không có vua).

*Lưu ý: Nếu câu được đặt ra vào thời điểm Anh chưa có vua (giả sử), thì điều kiện tồn tại không thỏa → câu SAI theo Russell.*

---

**Bài 5.**

Câu đầy đủ: "Nhiều người biết tên Nguyễn Du nhưng chưa đọc tác phẩm của tác giả Truyện Kiều."

Giả sử ta thay "tác giả Truyện Kiều" bằng "Nguyễn Du":

Câu mới: "Nhiều người biết tên Nguyễn Du nhưng chưa đọc tác phẩm của Nguyễn Du."

Về mặt quy chiếu: "tác giả Truyện Kiều" và "Nguyễn Du" đều chỉ tới cùng một người — vậy tại sao câu nghĩa khác?

Giải thích qua ngữ cảnh cố tình: Câu gốc mô tả tình huống nhận thức — những người đó **biết** tên "Nguyễn Du" nhưng **không biết** hoặc **chưa tiếp cận** với thực thể được mô tả là "tác giả Truyện Kiều". Điều này có thể xảy ra nếu họ biết tên nhưng không liên kết tên đó với tác phẩm.

Nếu thay bằng "Nguyễn Du" ở cả hai vị trí, câu nghe có vẻ tự mâu thuẫn hoặc kỳ lạ: "biết tên Nguyễn Du nhưng chưa đọc tác phẩm của Nguyễn Du" — thông tin về việc chưa đọc tác phẩm vẫn đúng, nhưng sắc thái nhận thức (biết qua tên vs biết qua vai trò tác giả) bị mất đi.

Trong ngữ cảnh cố tình ("biết rằng", "nhận ra", "tìm kiếm"...), **nghĩa** của biểu thức — không chỉ quy chiếu — quyết định tính đúng đắn của việc thay thế. Đây là tính chất **không transparent** của ngữ cảnh cố tình.

---

**Bài 6 (nâng cao).**

Kripke lập luận: câu "Sao Mai = Sao Hôm" (hay "Hesperus = Phosphorus") là:

**Tất yếu (necessary)**: Vì "Sao Mai" và "Sao Hôm" đều là tên riêng — rigid designators — cùng chỉ Venus trong mọi thế giới khả dĩ. Trong mọi thế giới khả dĩ nơi cả hai tên đề cập đến cùng đối tượng, câu nhất thiết đúng. Không thể có thế giới khả dĩ nơi Sao Mai ≠ Sao Hôm, vì cả hai tên đều cứng chỉ Venus.

**A posteriori**: Dù tất yếu, ta không thể biết câu này đúng chỉ bằng lý luận thuần túy. Ta phải quan sát thiên văn, đo đạc, tính toán để phát hiện rằng hai thiên thể quan sát ở hai thời điểm khác nhau là cùng một hành tinh.

**Tương phản với Frege:** Frege nghĩ "Sao Mai = Sao Hôm" là a posteriori vì hai biểu thức có nghĩa khác nhau — và từ sự khác nghĩa, ông kết luận rằng câu không tất yếu (contingent), chỉ là thực tế. Nhưng Kripke chỉ ra rằng tên riêng không "có nghĩa" theo cách Frege nghĩ — chúng là labels cứng, không qua mode of presentation. Do đó tính tất yếu và tính a posteriori không loại trừ nhau.

Hệ quả: Kripke mở ra lớp chân lý **"tất yếu a posteriori"** — không thể biết thuần lý, nhưng một khi biết, đúng trong mọi thế giới khả dĩ. Đây là phát hiện quan trọng trong siêu hình học và triết học ngôn ngữ thế kỷ 20.

---

## Code & Minh họa

- [visualization.html](./visualization.html) — Ba module tương tác:
  1. Sơ đồ SVG nghĩa ↔ quy chiếu: nhiều biểu thức cùng trỏ về một đối tượng.
  2. So sánh a=a vs a=b: bật/tắt để thấy vì sao cái sau mang thông tin.
  3. Máy phân tích mô tả xác định Russell: nhập mô tả → hiện dạng logic ∃x(...) → đánh giá đúng/sai.

---

## Bài tiếp theo

→ **Lesson 06 — Hành vi ngôn ngữ (Speech Acts)**: khi ta nói không chỉ để mô tả — ta còn hứa hẹn, ra lệnh, tuyên bố, cảnh báo. Austin và Searle phân tích ngôn ngữ như hành động, vượt ra ngoài câu hỏi đúng/sai.

[⬆ Về Advanced Logic & Language](../index.html) · [🏠 Trang chính Philosophy](../../index.html)
