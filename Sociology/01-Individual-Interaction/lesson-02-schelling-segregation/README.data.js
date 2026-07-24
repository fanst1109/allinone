// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: Sociology/01-Individual-Interaction/lesson-02-schelling-segregation/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 02 — Mô hình phân ly Schelling (Schelling Segregation Model)

> Câu chuyện gây choáng của xã hội học tính toán: ngay cả khi **không một ai** muốn sống tách biệt, một xã hội vẫn có thể **tự phân ly** thành các khu ken đặc cùng nhóm. Ý muốn cá nhân "khoan dung" cộng lại ra một kết cục tập thể "kỳ thị".

## Mục tiêu học tập

- Phát biểu được **luật chơi Schelling**: lưới có 2 nhóm + ô trống, ngưỡng khoan dung $\\tau$, quy tắc "hài lòng thì ở, không thì chuyển".
- Định nghĩa và tính được **chỉ số phân ly (segregation index)** — tỉ lệ hàng xóm cùng nhóm trung bình.
- Hiểu *vì sao* phân ly mạnh **tự nổi lên** dù mỗi cá nhân chỉ đòi hỏi rất ít (≈ 1/3 hàng xóm giống mình).
- Nắm được bài học nền tảng: **hành vi vi mô (micromotives) ≠ kết cục vĩ mô (macrobehavior)** — tổng của các ý định "hiền" có thể là một hệ quả "dữ".
- Đọc được bảng $\\tau$ ↔ mức phân ly kết quả và giải thích được xu hướng.

## Kiến thức tiền đề

- [Lesson 01 — Chuẩn mực, vai trò & xã hội hóa](../lesson-01-norms-roles-socialization/) — hiểu khái niệm "tác nhân (agent)" hành động theo quy tắc.
- Số học phần trăm và trung bình cộng. Không cần lập trình.

---

## 1. Bức tranh lớn: vì sao mô hình này lại nổi tiếng?

> 💡 **Trực giác.** Hãy tưởng tượng một thành phố nơi *ai cũng* thoải mái sống chung với nhóm khác, chỉ với một điều kiện rất nhẹ: "tôi không muốn thành kẻ *quá* lạc lõng — ít nhất **1/3** hàng xóm quanh tôi nên giống nhóm mình". Nghe cực kỳ khoan dung, đúng không? Vậy mà nếu để từng người tự quyết định theo đúng nguyên tắc hiền lành đó, thành phố sẽ **tự vỡ ra** thành những mảng đồng nhất — khu này toàn nhóm A, khu kia toàn nhóm B. Không ai *muốn* điều đó, nhưng nó vẫn xảy ra.

Nhà kinh tế học **Thomas Schelling** (Nobel 2005) đề xuất mô hình này năm 1971 để trả lời một câu hỏi thật của nước Mỹ: *vì sao các khu dân cư lại phân ly chủng tộc mạnh đến vậy?* Câu trả lời trực giác thời đó là "vì con người kỳ thị nặng". Schelling chỉ ra điều đáng kinh ngạc: **không cần kỳ thị nặng**. Một sở thích rất nhẹ về hàng xóm, khi nhân lên qua hàng nghìn quyết định cá nhân, cũng đủ tạo ra phân ly gần như tuyệt đối.

Đây là ví dụ kinh điển nhất của một hiện tượng gọi là **emergence (nổi lên)**: một quy luật ở cấp *hệ thống* xuất hiện mà không nằm trong ý định của bất kỳ *thành phần* nào. Cuốn sách của Schelling — *Micromotives and Macrobehavior* — đặt tên cho chính bài học này: **động cơ vi mô ≠ hành vi vĩ mô**.

> ❓ **Câu hỏi tự nhiên của người đọc.**
> - *"Đây chỉ là chuyện chủng tộc à?"* → Không. Mô hình áp dụng cho mọi phân ly theo nhóm: tôn giáo, ngôn ngữ, thu nhập, thậm chí "người thích yên tĩnh vs người thích náo nhiệt". Nhóm là gì không quan trọng — chỉ cần có *hai loại* và một *sở thích về hàng xóm*.
> - *"Nếu ai cũng khoan dung thì tại sao lại vỡ?"* → Vì mỗi lần một người chuyển đi, họ *thay đổi khu phố cho những người còn lại*. Cơ chế dây chuyền này là trái tim của bài — sẽ mổ xẻ ở mục 6.

> 📝 **Tóm tắt mục 1.**
> - Schelling (1971) mô hình hóa phân ly khu dân cư bằng một lưới đơn giản.
> - Phát hiện cốt lõi: **sở thích cá nhân nhẹ → phân ly tập thể mạnh**.
> - Đây là ví dụ mẫu của *emergence* và của thông điệp "micromotives ≠ macrobehavior".

---

## 2. Luật chơi Schelling

Mô hình chỉ có 4 thành phần. Đơn giản đến mức có thể chơi bằng tay trên giấy kẻ ô.

**(1) Sân chơi.** Một lưới ô vuông (như bàn cờ). Mỗi ô hoặc **trống**, hoặc chứa đúng một **tác nhân (agent)**.

**(2) Hai nhóm.** Mỗi tác nhân thuộc một trong hai nhóm — gọi là **A** (🔴 đỏ hồng) và **B** (🔵 xanh). Ví dụ: 45% ô là A, 45% là B, 10% để trống.

**(3) Hàng xóm.** Hàng xóm của một ô là **8 ô bao quanh** nó (trên, dưới, trái, phải, 4 chéo) — gọi là *lân cận Moore (Moore neighborhood)*. Ô ở biên/góc có ít hàng xóm hơn (5 hoặc 3).

**(4) Quy tắc hài lòng.** Đây là linh hồn của mô hình:

> Một tác nhân **hài lòng (satisfied)** nếu tỉ lệ hàng xóm **cùng nhóm** (trên tổng số hàng xóm *có người*) **≥ ngưỡng khoan dung $\\tau$**. Ngược lại thì **không hài lòng** và sẽ tìm cách chuyển đi.

**Vòng lặp:** mỗi vòng, mọi tác nhân không hài lòng **chuyển tới một ô trống ngẫu nhiên**. Sau khi chuyển, khu phố thay đổi → tính lại sự hài lòng → lặp tiếp. Dừng khi **mọi tác nhân đều hài lòng** (hệ ổn định) hoặc không cải thiện thêm.

### 2.1 Ngưỡng khoan dung $\\tau$ — định nghĩa đầy đủ

**(a) Là gì.** $\\tau$ (tau) là **tỉ lệ hàng xóm cùng nhóm tối thiểu** mà một tác nhân đòi hỏi để chịu ở yên. Nó đo mức "kén hàng xóm" của cá nhân. $\\tau = 0{,}33$ nghĩa là "tôi ổn miễn là ít nhất 1/3 số hàng xóm giống nhóm tôi".

**(b) Vì sao cần khái niệm này.** Ta cần một con số duy nhất, điều chỉnh được, để biểu diễn "mức độ muốn ở gần người giống mình". Nhờ có $\\tau$, ta trả lời được câu hỏi định lượng: *phải kén tới mức nào thì xã hội mới phân ly?* Câu trả lời (mục 5) mới là điều gây sốc.

**(c) Ví dụ số cụ thể** (≥ 4, đa dạng số hàng xóm):

| Tình huống hàng xóm | Tỉ lệ cùng nhóm | $\\tau = 33\\%$? | $\\tau = 50\\%$? |
|---------------------|:---------------:|:--------------:|:--------------:|
| 8 hàng xóm, 3 cùng nhóm | $3/8 = 37{,}5\\%$ | Hài lòng ✓ | Không ✗ |
| 8 hàng xóm, 2 cùng nhóm | $2/8 = 25\\%$ | Không ✗ | Không ✗ |
| 5 hàng xóm (ở biên), 2 cùng | $2/5 = 40\\%$ | Hài lòng ✓ | Không ✗ |
| 4 hàng xóm, 1 cùng | $1/4 = 25\\%$ | Không ✗ | Không ✗ |
| 3 hàng xóm (ở góc), 1 cùng | $1/3 = 33{,}3\\%$ | Hài lòng ✓ (sát ngưỡng) | Không ✗ |
| 8 hàng xóm, 8 cùng nhóm | $8/8 = 100\\%$ | Hài lòng ✓ | Hài lòng ✓ |

> ⚠ **Lỗi thường gặp.** Hiểu $\\tau$ là "mức độ *ghét* nhóm kia". **Sai.** Với $\\tau = 0{,}33$, tác nhân hoàn toàn vui vẻ khi **đa số (tới 5/8 = 62,5%) hàng xóm khác nhóm** — họ chỉ không muốn *gần như cô độc*. Đây chính là điểm mấu chốt: sở thích rất khoan dung, không hề bài xích, mà kết cục vẫn phân ly.

> ⚠ **Lỗi thường gặp thứ 2.** Nghĩ rằng ô trống hay ô không có hàng xóm nào cũng "tính". Một tác nhân **không có hàng xóm nào** (bị bao quanh toàn ô trống) được coi là **hài lòng** theo quy ước — không có ai để so sánh thì không có gì để phàn nàn.

> 🔁 **Dừng lại tự kiểm tra.**
> 1. Một tác nhân A có 8 hàng xóm, trong đó 3 là A, 5 là B. Với $\\tau = 0{,}40$, tác nhân này hài lòng không?
> 2. Cũng tác nhân đó với $\\tau = 0{,}30$ thì sao?
>
> <details><summary>Đáp án</summary>
>
> 1. Tỉ lệ cùng nhóm $= 3/8 = 37{,}5\\% < 40\\%$ → **không hài lòng**, sẽ chuyển đi.
> 2. $37{,}5\\% \\ge 30\\%$ → **hài lòng**, ở yên. Cùng một khu phố, chỉ đổi $\\tau$, hai kết luận ngược nhau — cho thấy $\\tau$ là "công tắc" quyết định.
> </details>

> 📝 **Tóm tắt mục 2.**
> - 4 thành phần: lưới, 2 nhóm, ô trống, quy tắc hài lòng theo $\\tau$.
> - Hàng xóm = 8 ô Moore quanh mình; tính tỉ lệ cùng nhóm trên số hàng xóm *có người*.
> - $\\tau$ = tỉ lệ cùng nhóm tối thiểu để ở yên; $\\tau$ thấp = rất khoan dung.
> - Không hài lòng → chuyển tới ô trống ngẫu nhiên → lặp tới khi ổn định.

---

## 3. Chỉ số phân ly — đo mức "tách nhóm" của cả xã hội

Để nói "xã hội này phân ly mạnh hay yếu" ta cần một con số cho **toàn hệ**, không chỉ cho một người.

**(a) Là gì.** **Chỉ số phân ly $S$** là **tỉ lệ hàng xóm cùng nhóm, lấy trung bình trên tất cả tác nhân**. Nó trả lời: "trung bình, một người có bao nhiêu phần hàng xóm giống nhóm mình?"

$$S = \\frac{1}{N}\\sum_{i=1}^{N} \\frac{\\text{số hàng xóm cùng nhóm của } i}{\\text{số hàng xóm có người của } i}$$

trong đó $N$ là số tác nhân có ít nhất một hàng xóm.

**(b) Vì sao cần.** "% tác nhân hài lòng" chỉ nói *bao nhiêu người thấy đủ* — nó có thể cao ngay cả khi trộn lẫn. Ta cần một thước đo *mức trộn lẫn thực tế của không gian*. $S$ làm đúng việc đó: $S = 50\\%$ nghĩa là trộn đều như tung đồng xu; $S = 90\\%$ nghĩa là gần như ai cũng bị bao quanh bởi người cùng nhóm — phân ly nặng.

**(c) Ví dụ số cụ thể** (≥ 4):

- **Trộn hoàn hảo (bàn cờ xen kẽ)**: mỗi ô A chỉ có hàng xóm B và ngược lại → mỗi tỉ lệ cùng nhóm $= 0\\%$ → $S = 0\\%$. Đây là mức phân ly *thấp nhất* có thể.
- **Ngẫu nhiên, 2 nhóm 50/50**: một hàng xóm bất kỳ cùng nhóm với xác suất $0{,}5$ → $S \\approx 50\\%$. Đây là **đường cơ sở (baseline)** để so sánh.
- **Ngẫu nhiên, 2 nhóm 60/40**: tác nhân A (60% dân) có $P(\\text{hàng xóm là A}) = 0{,}6$; tác nhân B có $P(\\text{cùng}) = 0{,}4$. Trung bình có trọng số: $0{,}6 \\times 0{,}6 + 0{,}4 \\times 0{,}4 = 0{,}36 + 0{,}16 = 0{,}52$ → $S \\approx 52\\%$.
- **Phân ly hoàn toàn (hai khối tách rời)**: hầu hết tác nhân bị bao quanh bởi người cùng nhóm, chỉ các tác nhân ở *đường biên* giữa hai khối mới có hàng xóm khác → $S \\approx 85\\text{–}95\\%$ (không đạt 100% vì biên luôn tồn tại).

> 💡 **Trực giác.** Hãy nghĩ $S$ như "nhiệt kế phân ly". Kim ở 50% = xã hội trộn đều. Kim leo lên 75–90% = các nhóm đã co cụm thành ốc đảo. Điều kỳ diệu của Schelling là: chỉ cần vặn nhẹ công tắc $\\tau$ lên chút, nhiệt kế $S$ vọt từ 50% lên 75%+ **mà không cần ai có ý định tách biệt**.

> ❓ **Câu hỏi tự nhiên của người đọc.** *"$S$ và '% hài lòng' khác nhau chỗ nào?"* → $S$ đo *thực trạng không gian* (mức co cụm). "% hài lòng" đo *cảm nhận cá nhân* (bao nhiêu người thấy đủ ngưỡng). Ở trạng thái ổn định, "% hài lòng" $= 100\\%$ (theo định nghĩa: dừng khi ai cũng đủ), nhưng $S$ cho biết cái giá không gian phải trả để đạt được sự "đủ" đó — thường là phân ly cao. Viz hiển thị **cả hai** để bạn thấy rõ khoảng cách này.

> 📝 **Tóm tắt mục 3.**
> - $S$ = tỉ lệ hàng xóm cùng nhóm trung bình toàn hệ.
> - Trộn đều 50/50 → $S \\approx 50\\%$ (baseline); xen kẽ hoàn hảo → $0\\%$; tách khối → $85\\text{–}95\\%$.
> - $S$ đo *không gian*; "% hài lòng" đo *cảm nhận*. Hai con số kể hai câu chuyện khác nhau.

---

## 4. Walk-through bằng số: một hàng phố tự phân ly

Để *thấy* cơ chế bằng con số cụ thể, ta thu nhỏ về một **hàng phố 1 chiều** (Schelling cũng dùng phiên bản này). Quy ước cho ví dụ này:

- Hàng xóm = **ô ngay bên trái + ô ngay bên phải** (tối đa 2 người).
- Ngưỡng $\\tau = 0{,}5$: hài lòng nếu $\\ge$ 50% hàng xóm có người là cùng nhóm.
- 🔴 = nhóm A, 🔵 = nhóm B, \`·\` = ô trống.

*(Với 2 hàng xóm, các tỉ lệ khả dĩ chỉ là 0%, 50%, 100% → $\\tau = 1/3$ và $\\tau = 1/2$ cho cùng kết quả. Muốn phân biệt hai ngưỡng này cần lân cận 8 người của lưới 2 chiều — chính là thứ viz cung cấp.)*

### Vòng 0 — trạng thái ban đầu

\`\`\`
Vị trí:  1   2   3   4   5   6   7   8
Ô:      🔴  🔴  🔵  🔴  🔵  🔵   ·   ·
\`\`\`

Tính tỉ lệ cùng nhóm cho từng tác nhân (chỉ đếm hàng xóm *có người*):

| Vị trí | Nhóm | Hàng xóm có người | Cùng nhóm | Tỉ lệ | $\\tau=0{,}5$ |
|:------:|:----:|:-----------------:|:---------:|:-----:|:------------:|
| 1 | 🔴 | {2:🔴} | 1 | $1/1 = 100\\%$ | Hài lòng ✓ |
| 2 | 🔴 | {1:🔴, 3:🔵} | 1 | $1/2 = 50\\%$ | Hài lòng ✓ |
| 3 | 🔵 | {2:🔴, 4:🔴} | 0 | $0/2 = 0\\%$ | **Không** ✗ |
| 4 | 🔴 | {3:🔵, 5:🔵} | 0 | $0/2 = 0\\%$ | **Không** ✗ |
| 5 | 🔵 | {4:🔴, 6:🔵} | 1 | $1/2 = 50\\%$ | Hài lòng ✓ |
| 6 | 🔵 | {5:🔵} | 1 | $1/1 = 100\\%$ | Hài lòng ✓ |

- **Chỉ số phân ly** $S = \\dfrac{100 + 50 + 0 + 0 + 50 + 100}{6} = \\dfrac{300}{6} = \\mathbf{50\\%}$.
- **% hài lòng** $= 4/6 \\approx \\mathbf{66{,}7\\%}$. Hai kẻ lạc lõng: 🔵 ở vị trí 3 (kẹt giữa hai 🔴) và 🔴 ở vị trí 4 (kẹt giữa hai 🔵).

### Vòng 1 — hai kẻ không hài lòng chuyển đi

Hai tác nhân ở vị trí 3 và 4 rời chỗ, tìm ô trống. Mô hình xếp họ vào ô trống làm họ hết lạc lõng: 🔴 (từ vị trí 4) dịch về cạnh cụm 🔴, 🔵 (từ vị trí 3) dịch về cạnh cụm 🔵:

\`\`\`
Vị trí:  1   2   3   4   5   6   7   8
Ô:      🔴  🔴  🔴   ·  🔵  🔵  🔵   ·
\`\`\`

Tính lại:

| Vị trí | Nhóm | Hàng xóm có người | Cùng nhóm | Tỉ lệ |
|:------:|:----:|:-----------------:|:---------:|:-----:|
| 1 | 🔴 | {2:🔴} | 1 | $100\\%$ |
| 2 | 🔴 | {1:🔴, 3:🔴} | 2 | $100\\%$ |
| 3 | 🔴 | {2:🔴} | 1 | $100\\%$ |
| 5 | 🔵 | {6:🔵} | 1 | $100\\%$ |
| 6 | 🔵 | {5:🔵, 7:🔵} | 2 | $100\\%$ |
| 7 | 🔵 | {6:🔵} | 1 | $100\\%$ |

- **Chỉ số phân ly** $S = \\dfrac{100 \\times 6}{6} = \\mathbf{100\\%}$.
- **% hài lòng** $= 6/6 = \\mathbf{100\\%}$ → **hệ ổn định**, dừng.

**Điều vừa xảy ra:** từ một hàng phố trộn khá đều ($S = 50\\%$), chỉ với ngưỡng khoan dung $\\tau = 0{,}5$ và **đúng 2 lần chuyển nhà**, xã hội bé xíu này biến thành **hai khối tách bạch hoàn toàn** ($S = 100\\%$). Không ai "kỳ thị", không ai lên kế hoạch tách biệt — nó tự xảy ra.

> ⚠ **Lưu ý (toy example).** Đây là minh họa cực nhỏ nên $S$ nhảy thẳng lên 100%. Trên lưới 2 chiều thật (hàng trăm–nghìn ô), phân ly **không đạt 100%** vì luôn còn các tác nhân ở *đường biên* giữa hai vùng; $S$ điển hình dừng ở **70–90%** tùy $\\tau$. Cơ chế thì y hệt, chỉ khác quy mô. Hãy dùng viz để chạy phiên bản đầy đủ.

> 📝 **Tóm tắt mục 4.**
> - Chạy tay: hàng phố $S = 50\\%$, 2 kẻ lạc lõng → sau 1 vòng chuyển → $S = 100\\%$, ổn định.
> - $\\tau$ chỉ 0,5 mà kết cục là tách khối hoàn toàn — bản chất của phát hiện Schelling.
> - Lưới thật: cơ chế giống hệt, $S$ dừng quanh 70–90% vì có đường biên.

---

## 5. Bảng $\\tau$ ↔ mức phân ly: con số gây sốc

Đây là kết quả trung tâm. Các số dưới đây là **giá trị điển hình** khi chạy mô phỏng trên lưới lớn (2 nhóm ~ 50/50, ~10% ô trống, lân cận Moore 8 ô) — bạn tự kiểm chứng được bằng viz.

| $\\tau$ (ngưỡng) | Diễn giải (trên 8 hàng xóm) | Chỉ số phân ly $S$ kết quả | Ghi chú |
|:---------------:|-----------------------------|:--------------------------:|---------|
| $0\\%$ | không quan tâm hàng xóm | $\\approx 50\\%$ | = ngẫu nhiên, **không ai chuyển** |
| $30\\%$ | chịu được thiểu số ~3/8 | $\\approx 72\\%$ | phân ly rõ rệt dù rất khoan dung |
| $33\\%$ (**1/3**) | cần $\\ge 3$ trong 8 giống mình | $\\approx 74\\%$ | **con số gây sốc của bài** |
| $40\\%$ | cần ~3–4 trong 8 giống | $\\approx 78\\%$ | ~ tất cả hài lòng, phân ly mạnh |
| $50\\%$ | cần đa số hàng xóm giống | $\\approx 83\\%$ | phân ly rất mạnh, hội tụ chậm |
| $70\\%+$ | đòi đa số áp đảo | thường **không ổn định** | nhiều tác nhân kẹt, chuyển mãi không xong |

**Đọc bảng thế nào?** Nhìn dòng $\\tau = 33\\%$: mỗi người chỉ cần **1/3 hàng xóm giống mình** — họ sẵn sàng làm *thiểu số* trong chính khu phố (5/8 hàng xóm khác nhóm vẫn OK). Vậy mà kết cục là $S \\approx 74\\%$: trung bình mỗi người rốt cuộc bị bao quanh bởi ~3/4 người cùng nhóm. **Khoảng cách giữa ý muốn (33%) và kết cục (74%) chính là "emergence".**

> ❓ **Câu hỏi tự nhiên của người đọc.**
> - *"Vì sao $\\tau = 0\\%$ lại cho $S \\approx 50\\%$?"* → Vì không ai chuyển đi (ai cũng hài lòng ngay), nên lưới giữ nguyên trạng thái ngẫu nhiên ban đầu, mà ngẫu nhiên 50/50 thì $S \\approx 50\\%$ (xem mục 3).
> - *"Vì sao $\\tau$ quá cao (70%) lại 'không ổn định'?"* → Vì đòi hỏi khắt khe đến mức khó có ô trống nào thỏa mãn; tác nhân chuyển từ chỗ này sang chỗ khác mãi mà vẫn không ai đủ hài lòng → hệ dao động, không hội tụ. Phân ly kết quả có thể rất cao *hoặc* hỗn loạn.
> - *"Số 74% có phải hằng số không?"* → Không tuyệt đối. Nó phụ thuộc mật độ ô trống, tỉ lệ 2 nhóm, kích thước lưới. Nhưng **hình dạng của quy luật** — $S$ leo dốc mạnh ngay ở $\\tau$ thấp rồi bão hòa cao — thì rất ổn định qua các thiết lập.

Bốn ví dụ số về $\\tau$ ↔ phân ly (rút từ bảng, nhấn mạnh yêu cầu "≥4 ví dụ"): $\\tau=30\\%\\to S\\approx72\\%$; $\\tau=33\\%\\to S\\approx74\\%$; $\\tau=40\\%\\to S\\approx78\\%$; $\\tau=50\\%\\to S\\approx83\\%$. Cả bốn đều cho $S$ **cao hơn nhiều** so với baseline 50% — dù không $\\tau$ nào vượt quá "muốn phân nửa hàng xóm giống mình".

> 📝 **Tóm tắt mục 5.**
> - $\\tau$ nhỏ (30–33%) đã đẩy $S$ lên ~72–74%, gấp rưỡi baseline.
> - $\\tau$ càng cao, $S$ càng cao; nhưng $\\tau$ quá cao (70%+) làm hệ mất ổn định.
> - Khoảng cách "ý muốn 33% → kết cục 74%" là bằng chứng định lượng của emergence.

---

## 6. Vì sao phân ly lại TỰ nổi lên? (cơ chế dây chuyền)

Ta đã thấy *rằng* nó xảy ra. Giờ giải thích *vì sao*, từng bước:

**Bước 1 — Đường biên là nơi bất ổn.** Tác nhân ở giữa một khối đồng nhất luôn hài lòng (100% hàng xóm cùng nhóm). Chỉ những tác nhân ở *ranh giới* giữa hai nhóm mới có nguy cơ không đủ ngưỡng. Bất ổn luôn khởi phát ở biên.

**Bước 2 — Một cú chuyển gây hiệu ứng dây chuyền.** Khi một tác nhân A không hài lòng rời khu phố trộn lẫn, hai điều xảy ra cùng lúc:
1. Ở **nơi đến**: A lấp vào ô trống thường nằm gần cụm A khác → chỗ đó bớt trống, cụm A đặc thêm.
2. Ở **nơi đi**: A biến mất khỏi khu cũ → những **A còn lại** ở đó mất một hàng xóm cùng nhóm → tỉ lệ cùng nhóm của họ *tụt xuống* → có thể tới lượt họ không hài lòng và cũng bỏ đi.

Đây là **hiệu ứng domino**: một người đi kéo theo người khác đi, khu phố trộn lẫn "rỗng dần" người của một nhóm cho tới khi chỉ còn nhóm kia.

**Bước 3 — Cái bẫy một chiều (ratchet).** Hệ chỉ **dừng** khi *mọi* tác nhân hài lòng — mà cấu hình duy nhất khiến ai cũng hài lòng là cấu hình **co cụm** (mỗi người ở gần đủ người cùng nhóm). Trạng thái trộn đều không bao giờ là điểm dừng (luôn có kẻ ở biên chưa đủ ngưỡng). Vì thế hệ **buộc phải** trôi từ "trộn" về "co cụm" — như hòn bi luôn lăn xuống đáy thung lũng.

> 💡 **Trực giác đời sống.** Giống như tiệc đứng: ban đầu khách trộn lẫn, nhưng ai cũng hơi ngại nếu quanh mình toàn người lạ nên **nhích** về phía một hai người quen. Mỗi cú nhích lại làm người vừa bị bỏ lại thấy trống trải hơn, nên họ cũng nhích. Cuối buổi, phòng tiệc **tự vón** thành các cụm bạn bè — dù không ai *muốn* chia phe, và ai cũng sẵn lòng nói chuyện với người lạ.

> ⚠ **Hiểu lầm nguy hiểm về mặt chính sách.** Từ mô hình này, đừng kết luận "phân ly là tự nhiên nên đừng can thiệp". Bài học đúng là ngược lại: vì phân ly nổi lên **kể cả khi không ai kỳ thị**, nên *quan sát thấy xã hội phân ly KHÔNG chứng minh người dân kỳ thị*. Và vì cơ chế là dây chuyền quanh **ngưỡng $\\tau$ tập thể**, một can thiệp nhỏ (hạ ngưỡng cảm nhận, trộn nhẹ ở điểm bùng phát) có thể lật hệ về phía hòa nhập — đây là ý tưởng "tipping point" mà Lesson 03 khai thác.

> 🔁 **Dừng lại tự kiểm tra.** Trong bước 2, vì sao việc một tác nhân *rời đi* lại có thể làm *tăng* số người không hài lòng, dù tổng số tác nhân giảm?
>
> <details><summary>Đáp án</summary>
>
> Vì tác nhân rời đi từng là **hàng xóm cùng nhóm** của những người ở lại. Khi nó biến mất, tỉ lệ cùng nhóm của hàng xóm cũ tụt xuống — có người rơi từ "vừa đủ $\\tau$" xuống "dưới $\\tau$" → chuyển từ hài lòng sang không hài lòng. Sự hài lòng của A phụ thuộc vào *sự hiện diện* của các A khác, nên mỗi lần rút lui đều làm suy yếu những người còn lại → domino.
> </details>

> 📝 **Tóm tắt mục 6.**
> - Bất ổn khởi phát ở **đường biên** giữa hai nhóm.
> - Một cú chuyển vừa làm nơi đến đặc thêm, vừa làm nơi đi bất ổn thêm → **domino**.
> - Hệ chỉ dừng ở cấu hình **co cụm** (điểm cân bằng duy nhất) → phân ly là kết cục *bị ép*, không phải ý định.

---

## 7. Bài học xã hội học: micromotives ≠ macrobehavior

| Cấp độ | Nội dung | Trong mô hình Schelling |
|--------|----------|-------------------------|
| **Vi mô (cá nhân)** | Sở thích nhẹ: "≥ 1/3 hàng xóm giống tôi" | $\\tau \\approx 0{,}33$, khoan dung |
| **Vĩ mô (hệ thống)** | Phân ly gần như tuyệt đối | $S \\approx 74\\%$, tách khối |

Ba hàm ý lớn cho tư duy xã hội học:

1. **Không suy ngược từ kết cục ra động cơ.** Thấy một thành phố phân ly *không* cho phép kết luận "dân ở đó kỳ thị". Cấu trúc vĩ mô có thể sinh ra từ những động cơ vi mô hoàn toàn ôn hòa.
2. **Tổng thể có tính chất mà thành phần không có.** "Phân ly" là thuộc tính của *bố cục*, không nằm trong đầu bất kỳ ai. Đây là ý nghĩa của "cái toàn thể lớn hơn tổng các phần".
3. **Can thiệp phải nhắm vào cơ chế, không vào 'thái độ'.** Nếu phân ly do dây chuyền quanh ngưỡng, thì thay đổi *cấu trúc lựa chọn* (nhà ở, quy hoạch, điểm tiếp xúc) hiệu quả hơn là chỉ "kêu gọi mọi người bớt kỳ thị".

> 📝 **Tóm tắt mục 7.** Bài học cốt lõi: **kết cục tập thể không phải là phép cộng đơn giản của ý định cá nhân**. Hệ thống xã hội có logic riêng nổi lên từ tương tác — chủ đề xuyên suốt Tầng 1.

---

## 8. Bài tập

**Bài 1 (đọc hiểu ngưỡng).** Một tác nhân B có 6 hàng xóm có người: 2 là B, 4 là A.
- a) Tỉ lệ hàng xóm cùng nhóm là bao nhiêu?
- b) Với $\\tau = 0{,}30$, tác nhân hài lòng không?
- c) Với $\\tau = 0{,}40$ thì sao? Với $\\tau = 0{,}50$?

**Bài 2 (chạy tay một vòng).** Cho hàng phố 1 chiều ($\\tau = 0{,}5$, hàng xóm = 2 ô kề, 🔴=A, 🔵=B, \`·\`=trống):

\`\`\`
Vị trí:  1   2   3   4   5   6   7
Ô:      🔵  🔴  🔵  🔴  🔴   ·  🔵
\`\`\`
- a) Tính tỉ lệ cùng nhóm cho từng tác nhân. Ai không hài lòng?
- b) Tính chỉ số phân ly $S$ và % hài lòng ở vòng 0.

**Bài 3 (đường cơ sở).** Một lưới lớn được rải ngẫu nhiên với **70% nhóm A, 30% nhóm B**. Ước lượng chỉ số phân ly $S$ *trước khi* bất kỳ ai di chuyển (baseline ngẫu nhiên).

**Bài 4 (vận dụng / phản biện).** Bạn của bạn xem viz rồi nói: "Thấy chưa, phân ly là bản chất con người — ai cũng thích ở gần người giống mình thôi." Dùng đúng các con số trong bài để **bác bỏ** kết luận này.

---

## 9. Lời giải chi tiết

**Bài 1.**
- a) Tỉ lệ cùng nhóm $= 2/6 = 1/3 \\approx 33{,}3\\%$.
- b) $33{,}3\\% \\ge 30\\%$ → **hài lòng** ✓.
- c) $\\tau = 0{,}40$: $33{,}3\\% < 40\\%$ → **không hài lòng** ✗. $\\tau = 0{,}50$: $33{,}3\\% < 50\\%$ → **không hài lòng** ✗.
- *Nhận xét:* cùng một khu phố, chỉ nâng $\\tau$ từ 0,30 lên 0,40 đã lật tác nhân từ "ở yên" sang "bỏ đi" — minh họa vì sao $\\tau$ là biến điều khiển quyết định của cả hệ.

**Bài 2.** Cách tiếp cận: với mỗi vị trí, liệt kê hàng xóm *có người* (ô kề trái/phải, bỏ qua ô trống và ngoài biên), đếm cùng nhóm, chia.

| Vị trí | Nhóm | Hàng xóm có người | Cùng nhóm | Tỉ lệ | $\\tau=0{,}5$ |
|:------:|:----:|:-----------------:|:---------:|:-----:|:------------:|
| 1 | 🔵 | {2:🔴} | 0 | $0/1 = 0\\%$ | **Không** ✗ |
| 2 | 🔴 | {1:🔵, 3:🔵} | 0 | $0/2 = 0\\%$ | **Không** ✗ |
| 3 | 🔵 | {2:🔴, 4:🔴} | 0 | $0/2 = 0\\%$ | **Không** ✗ |
| 4 | 🔴 | {3:🔵, 5:🔴} | 1 | $1/2 = 50\\%$ | Hài lòng ✓ |
| 5 | 🔴 | {4:🔴, 6:·} | 1 | $1/1 = 100\\%$ | Hài lòng ✓ |
| 7 | 🔵 | {6:·} | — | không có hàng xóm | Hài lòng ✓ (quy ước) |

- a) **Không hài lòng:** vị trí 1 (🔵), 2 (🔴), 3 (🔵). Vị trí 7 cô lập (hàng xóm duy nhất là ô trống) → coi là hài lòng.
- b) Chỉ số phân ly (trung bình trên các tác nhân *có* hàng xóm — vị trí 1–5, bỏ vị trí 7 vì không có hàng xóm):
$$S = \\frac{0 + 0 + 0 + 50 + 100}{5} = \\frac{150}{5} = \\mathbf{30\\%}.$$
% hài lòng (tính trên toàn bộ 6 tác nhân): hài lòng = {4, 5, 7} = 3 người → $3/6 = \\mathbf{50\\%}$.
- *Nhận xét:* đây là hàng phố trộn mạnh (nhiều xen kẽ), $S$ thấp và quá nửa dân bất mãn → hệ chắc chắn sẽ xáo trộn về phía co cụm ở các vòng sau.

**Bài 3.** Cách tiếp cận: baseline ngẫu nhiên = xác suất một hàng xóm bất kỳ cùng nhóm, lấy trung bình có trọng số theo tỉ lệ nhóm.
- Tác nhân A (chiếm 70% dân): một hàng xóm ngẫu nhiên là A với xác suất $0{,}70$.
- Tác nhân B (chiếm 30% dân): một hàng xóm ngẫu nhiên là B với xác suất $0{,}30$.
- Trung bình có trọng số:
$$S \\approx 0{,}70 \\times 0{,}70 + 0{,}30 \\times 0{,}30 = 0{,}49 + 0{,}09 = 0{,}58 = \\mathbf{58\\%}.$$
- *Nhận xét:* baseline lệch khỏi 50% vì nhóm không cân bằng — nhóm đa số "tự nhiên" có nhiều hàng xóm cùng nhóm hơn. Đây là điểm xuất phát; sau khi chạy Schelling với $\\tau$ khiêm tốn, $S$ sẽ còn leo cao hơn 58% nữa.

**Bài 4.** Cách tiếp cận: chỉ ra khoảng cách định lượng giữa *sở thích* và *kết cục*, và vai trò của cơ chế thay vì thái độ.
- Trong mô hình, mỗi cá nhân chỉ đòi $\\tau \\approx 33\\%$ — tức **hoàn toàn hài lòng khi là thiểu số**, với 5/8 hàng xóm khác nhóm. Đó **không** phải "thích ở gần người giống mình" theo nghĩa muốn tách biệt; đó là "không muốn gần như cô độc". Rất khác nhau.
- Vậy mà kết cục là $S \\approx 74\\%$. Con số 74% **không** phản ánh sở thích 33% của bất kỳ ai — nó là sản phẩm của **cơ chế dây chuyền** (mục 6), không phải của thái độ bài xích.
- Kết luận đúng: phân ly quan sát được **không chứng minh** con người thích tách biệt. Suy từ kết cục vĩ mô (74%) ra động cơ vi mô (kỳ thị) là một **ngụy biện** — chính là sai lầm mà Schelling cảnh báo. Muốn biết người ta có kỳ thị hay không phải đo *trực tiếp* $\\tau$, không suy từ $S$.

> 📝 **Tóm tắt bài học.**
> - **Luật chơi:** lưới 2 nhóm + ô trống; hài lòng nếu tỉ lệ hàng xóm cùng nhóm $\\ge \\tau$; ai bất mãn chuyển tới ô trống ngẫu nhiên; lặp tới ổn định.
> - **Chỉ số phân ly** $S$ = tỉ lệ hàng xóm cùng nhóm trung bình; baseline ngẫu nhiên 50/50 $\\approx 50\\%$.
> - **Kết quả gây sốc:** $\\tau$ thấp (30–33%) đã đẩy $S$ lên ~72–74% — phân ly mạnh dù ai cũng khoan dung.
> - **Cơ chế:** bất ổn ở biên → domino → hệ chỉ dừng ở cấu hình co cụm.
> - **Bài học xã hội học:** micromotives ≠ macrobehavior; đừng suy động cơ từ kết cục.

---

## Bài tiếp theo

**[Lesson 03 — Mô hình ngưỡng & hành vi tập thể (Threshold models of collective behavior)](../lesson-03-threshold-collective-behavior/)**: Schelling cho thấy *ngưỡng cá nhân* $\\tau$ tạo ra kết cục vĩ mô bất ngờ. Lesson 03 tổng quát hóa ý tưởng "ngưỡng" của **Granovetter** để giải thích bạo động, tin đồn, thời trang, và các "điểm bùng phát (tipping point)" — nơi một thay đổi nhỏ lật cả hệ.

Minh họa tương tác: [visualization.html](./visualization.html) — kéo thanh ngưỡng khoan dung $\\tau$, tỉ lệ 2 nhóm, mật độ ô trống; bấm **Bước / Chạy / Đặt lại** và xem chỉ số phân ly leo dốc theo từng vòng dù $\\tau$ rất thấp.
`;
