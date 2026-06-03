# Lesson 04 — Logic mờ & nhiều giá trị

> **Tầng 3 — Advanced Logic & Language · Bài 4/8**

Logic cổ điển Aristotle khẳng định một điều rõ ràng: mỗi mệnh đề hoặc **đúng** hoặc **sai** — không có trung gian. Nhưng thế giới thực không phải lúc nào cũng rõ ràng như vậy. "Người đó cao." — Cao đến mức nào? 1m75 có cao không? 1m70 thì sao? Ranh giới ở đâu? "Bữa ăn này đắt." — Đắt so với ai, theo tiêu chuẩn nào? Bài học này khám phá hai hướng mở rộng nền tảng: **logic nhiều giá trị** (gồm logic ba trị Łukasiewicz/Kleene) và **logic mờ** (fuzzy logic, Zadeh 1965) — cả hai đều thách thức nguyên lý lưỡng trị cổ điển theo những cách khác nhau.

## Mục tiêu học tập

Sau bài này, bạn có thể:

- Giải thích nguyên lý lưỡng trị (bivalence) và nêu ba tình huống nó gặp khó khăn: câu mơ hồ, sorites, tương lai bất định.
- Tính bảng chân lý đầy đủ cho logic ba trị (Kleene): ¬, ∧, ∨, → với giá trị T/U/F.
- Định nghĩa logic mờ và tính các phép toán mờ cơ bản: ¬x = 1−x; x ∧ y = min(x,y); x ∨ y = max(x,y).
- Vẽ và đọc hàm thành viên (membership function) cho một khái niệm mờ.
- Phân biệt rõ ba điều thường bị nhầm: "không xác định" (logic ba trị) ≠ "0.5" (mờ) ≠ "xác suất 0.5" (xác suất).
- Nêu các ứng dụng thực tế của logic mờ trong hệ điều khiển và AI.

## Kiến thức tiền đề

- **[Lesson 01-01 — Mệnh đề & giá trị chân lý](../../01-FormalLogic/lesson-01-propositions/)**: hiểu T/F, nguyên lý lưỡng trị.
- **[Lesson 01-02 — Bảng chân lý & liên từ logic](../../01-FormalLogic/lesson-02-truth-tables/)**: biết đọc bảng chân lý ¬, ∧, ∨, →.
- **[Lesson 03-02 — Nghịch lý](../lesson-02-paradoxes/)**: đặc biệt nghịch lý sorites (đống cát), động lực cho logic mờ.

---

## 1. Nguyên lý lưỡng trị và những giới hạn của nó

> 💡 **Trực giác.** Bật công tắc đèn: hoặc sáng hoặc tối — không có "hơi sáng". Đó là mô hình lưỡng trị hoàn hảo. Nhưng điều chỉnh biến áp dần dần từ 0% đến 100% ánh sáng: ở mức 40%, đèn "sáng" hay "tối"? Câu trả lời phụ thuộc vào ngữ cảnh và tiêu chuẩn. Logic cổ điển không xử lý được trường hợp này.

**Nguyên lý lưỡng trị (Principle of Bivalence)** phát biểu: mọi mệnh đề đều có đúng một trong hai giá trị chân lý — T (đúng) hoặc F (sai). Đây là nền tảng của logic Aristotle và toàn bộ toán học hình thức cổ điển.

Nhưng ba loại tình huống thách thức nguyên lý này:

### 1.1 Câu mơ hồ (vague predicates)

Vị từ như "cao", "già", "nóng", "đắt", "nhiều" không có ranh giới sắc bén. Xét chuỗi người theo chiều cao:

| Chiều cao | "Người này cao" — T hay F? |
|-----------|--------------------------|
| 1m50 | F rõ ràng |
| 1m60 | Không rõ |
| 1m70 | Ranh giới... |
| 1m75 | Hơi không rõ |
| 1m85 | T rõ ràng |

Logic cổ điển buộc ta phải chọn một điểm cắt: "cao nghĩa là ≥ 1m72". Nhưng lựa chọn đó hoàn toàn tùy tiện và tạo ra nghịch lý: người 1m72 "cao" nhưng người 1m719 (kém 1mm) thì "không cao"?

### 1.2 Nghịch lý sorites (paradox of the heap)

Đã gặp ở [Lesson 03-02 — Nghịch lý](../lesson-02-paradoxes/). Tóm lại:
- 1.000.000 hạt cát = đống cát (T rõ ràng).
- Bỏ đi 1 hạt: vẫn là đống cát (T).
- Lặp lại... đến lúc còn 1 hạt: vẫn là đống cát? (Vô lý!)

Lý do chứng minh lẻn qua được: vị từ "là đống cát" không có ranh giới sắc bén. Logic mờ làm "đỡ nghịch" hơn: độ-là-đống giảm dần liên tục từ 1 xuống 0 khi bỏ từng hạt — không có bước nhảy tùy tiện.

### 1.3 Tương lai bất định (future contingents)

Aristotle tự đặt câu hỏi: "Ngày mai sẽ có trận hải chiến." — câu này hiện tại đúng hay sai? Nếu T ngay từ hôm nay, thì tương lai đã được định sẵn (determinism). Nếu F, thì ta biết trước sẽ không có. Nếu không T cũng không F → cần giá trị thứ ba.

> ❓ **Câu hỏi tự nhiên của người đọc.**
> - *"Không thể chỉ nói là ta chưa biết, nhưng giá trị đã xác định sẵn?"* — Logic cổ điển nói đúng vậy (như với "Có sự sống ngoài Trái Đất"). Nhưng với tương lai bất định, nhiều triết gia lập luận giá trị chưa tồn tại — không chỉ là ta chưa biết. Đây là tranh luận siêu hình học sâu về thời gian và tất định luận.
> - *"Vậy có cần từ bỏ logic cổ điển không?"* — Không nhất thiết. Có thể giữ logic cổ điển cho toán học hình thức và dùng logic mở rộng cho ngôn ngữ tự nhiên và hệ thống AI. Đây là lựa chọn thiết kế, không phải bắt buộc.

> ⚠ **Lỗi thường gặp: nhầm "mơ hồ" với "không biết".** "Trời hôm nay ấm" — câu này không phải là ta thiếu thông tin. Ta biết nhiệt độ là 24°C. Vấn đề là "ấm" tự thân không có ranh giới sắc bén. Đây khác với "Có sự sống trên Sao Hoả" — câu đó rõ ràng T hoặc F, chỉ là ta chưa biết.

> 📝 **Tóm tắt mục 1.**
> - Lưỡng trị (bivalence): mọi mệnh đề T hoặc F, không có trung gian.
> - Ba thách thức: (1) vị từ mờ không có ranh giới; (2) sorites; (3) tương lai bất định.
> - Mờ ≠ thiếu thông tin. Mờ là bản chất ngữ nghĩa của vị từ.

---

## 2. Logic ba trị — Łukasiewicz và Kleene

> 💡 **Trực giác.** Tòa án đôi khi ra phán quyết "không đủ bằng chứng" (hung jury) thay vì chỉ "có tội" hay "vô tội". Đó chính là ý tưởng của logic ba trị: ngoài T và F, có giá trị thứ ba **U** (undefined / unknown / indeterminate — "không xác định").

### 2.1 Hệ giá trị

Logic ba trị dùng ba giá trị:

| Ký hiệu | Tên | Giá trị số |
|:-------:|-----|:----------:|
| T | Đúng (True) | 1 |
| U | Không xác định (Undefined/Unknown) | ½ |
| F | Sai (False) | 0 |

Có nhiều hệ logic ba trị. Bài này tập trung vào hai hệ quan trọng nhất:
- **Kleene (K3)** — 1938: dùng cho ngữ nghĩa và "không xác định".
- **Łukasiewicz (Ł3)** — 1920: dùng cho tương lai bất định; → có công thức khác.

### 2.2 Bảng chân lý ba trị (Kleene K3)

**Phủ định (¬):**

| p | ¬p |
|:-:|:--:|
| T | F |
| U | U |
| F | T |

Trực giác: phủ định "không xác định" vẫn là "không xác định".

**Hội (∧ = AND = min):**

| p ∧ q | T | U | F |
|:-----:|:-:|:-:|:-:|
| **T** | T | U | F |
| **U** | U | U | F |
| **F** | F | F | F |

**Tuyển (∨ = OR = max):**

| p ∨ q | T | U | F |
|:-----:|:-:|:-:|:-:|
| **T** | T | T | T |
| **U** | T | U | U |
| **F** | T | U | F |

**Kéo theo (→) trong Kleene:** p → q được định nghĩa là ¬p ∨ q (giống cổ điển, nhưng tính trên bảng ba trị):

| p → q | T | U | F |
|:-----:|:-:|:-:|:-:|
| **T** | T | U | F |
| **U** | T | U | U |
| **F** | T | T | T |

> ⚠ **Sự khác biệt Kleene vs Łukasiewicz:** Trong Łukasiewicz, U → U = **T** (không phải U như trong Kleene). Lý do: Łukasiewicz muốn U đại diện cho "có thể đúng", và "nếu có-thể-đúng thì có-thể-đúng" nên là T. Kleene muốn U đại diện cho "chưa biết", nên kết quả cũng chưa biết.

### 2.3 Ví dụ tính toán cụ thể

**Ví dụ 1:** p = T, q = U. Tính p ∧ q.
- Lookup bảng: hàng T, cột U → **U**.
- Trực giác: "Trời mưa" (T) VÀ "Ngày mai có trận đấu" (U) = không xác định tổng thể.

**Ví dụ 2:** p = U, q = F. Tính p ∨ q.
- Lookup bảng: hàng U, cột F → **U**.
- Trực giác: "Chưa biết" HOẶC "Sai" = vẫn chưa biết.

**Ví dụ 3:** p = U, q = F. Tính p ∧ q.
- Lookup bảng: hàng U, cột F → **F**.
- Trực giác: "Chưa biết" VÀ "Sai chắc chắn" = Sai (vì một vế đã F).

**Ví dụ 4:** p = T, q = U. Tính ¬p ∨ q.
- ¬T = F; F ∨ U → lookup bảng: hàng F, cột U → **U**.
- Tức là p → q = U khi p = T, q = U. Đúng với bảng → ở trên. ✓

> 🔁 **Dừng lại tự kiểm tra.**
> Cho p = U, q = T. Tính: (a) ¬p; (b) p ∧ q; (c) p ∨ q; (d) p → q.
>
> <details><summary>Đáp án</summary>
>
> (a) ¬U = **U**.
> (b) U ∧ T: hàng U, cột T → **U**.
> (c) U ∨ T: hàng U, cột T → **T**.
> (d) p → q = ¬p ∨ q = U ∨ T = **T**.
> </details>

> 📝 **Tóm tắt mục 2.**
> - Ba giá trị: T(1), U(½), F(0).
> - Phép toán Kleene: ¬U = U; T∧U = U; F∧U = F; T∨U = T; F∨U = U.
> - Kleene và Łukasiewicz khác nhau ở U→U: Kleene = U, Łukasiewicz = T.

---

## 3. Logic mờ (Fuzzy Logic) — Zadeh 1965

> 💡 **Trực giác.** Thay vì hỏi "Bộ phim này hay hay không?" (T/F) hoặc "Hay / Không hay / Chưa biết" (ba trị), hãy hỏi "Bộ phim này hay đến mức nào?" — câu trả lời là con số: 0.3 (hơi không hay), 0.7 (khá hay), 0.95 (rất hay). Logic mờ làm việc với **mức độ** liên tục trong khoảng [0, 1].

**Logic mờ (fuzzy logic)** do Lotfi Zadeh đề xuất năm 1965. Giá trị chân lý không còn bị giới hạn ở T(1) hay F(0) mà là bất kỳ số thực nào trong **[0, 1]** — gọi là **độ đúng (degree of truth)**.

### 3.1 Hàm thành viên (Membership Function)

**Hàm thành viên** μ(x) ánh xạ một phần tử x sang độ thành viên trong [0, 1] đối với một tập mờ (fuzzy set).

> 💡 **Trực giác.** Tập cổ điển: x hoặc thuộc tập A (μ = 1) hoặc không thuộc (μ = 0) — như thẻ thành viên câu lạc bộ: có hoặc không có. Tập mờ: x thuộc A với mức độ μ(x) ∈ [0,1] — như mức độ "quen biết": người lạ (0), quen mặt (0.3), bạn bè (0.7), bạn thân (0.95), tri kỷ (1).

**Ví dụ — Tập mờ "cao" (chiều cao người Việt Nam, đơn vị cm):**

Hàm thành viên dạng hình thang (trapezoidal):

| Chiều cao (cm) | Độ thành viên μ("cao") |
|:--------------:|:----------------------:|
| ≤ 160 | 0.0 |
| 165 | 0.25 |
| 170 | 0.5 |
| 175 | 0.75 |
| ≥ 180 | 1.0 |

Công thức xấp xỉ: μ(h) = max(0, min(1, (h − 160) / 20))

**Tính ví dụ số (≥ 4):**
1. h = 155cm: μ = max(0, min(1, (155−160)/20)) = max(0, min(1, −0.25)) = max(0, 0) = **0.0** (không cao).
2. h = 165cm: μ = max(0, min(1, (165−160)/20)) = max(0, min(1, 0.25)) = **0.25** (hơi thấp / bắt đầu vào ngưỡng).
3. h = 170cm: μ = max(0, min(1, (170−160)/20)) = max(0, min(1, 0.5)) = **0.5** (trung bình).
4. h = 176cm: μ = max(0, min(1, (176−160)/20)) = max(0, min(1, 0.8)) = **0.8** (khá cao).
5. h = 185cm: μ = max(0, min(1, (185−160)/20)) = max(0, min(1, 1.25)) = max(0, 1) = **1.0** (cao hoàn toàn).

> ⚠ **Hàm thành viên là do con người định nghĩa — không tự nhiên tồn tại.** Không có một μ("cao") "đúng" duy nhất. Người ở miền Bắc Âu và người ở Việt Nam sẽ định nghĩa "cao" khác nhau. Đây không phải điểm yếu của logic mờ — đây là tính linh hoạt của nó. Trong ứng dụng thực tế, hàm thành viên được hiệu chỉnh (tuned) từ dữ liệu hoặc chuyên gia.

**Ví dụ — Tập mờ "ấm" (nhiệt độ, °C):**

| Nhiệt độ (°C) | μ("ấm") |
|:-------------:|:-------:|
| ≤ 18 | 0.0 |
| 22 | 0.5 |
| 26 | 1.0 |
| 30 | 1.0 |
| ≥ 35 | 0.0 (chuyển sang "nóng") |

> ❓ **Câu hỏi tự nhiên của người đọc.**
> - *"Vì sao dùng hình thang hay đường thẳng mà không dùng hàm phức tạp hơn?"* — Nhiều dạng hàm thành viên được dùng: hình tam giác (triangular), hình thang (trapezoidal), hình chuông Gauss, hình chữ S (sigmoid). Hình tam giác/thang phổ biến vì đơn giản, dễ tính, đủ tốt cho hầu hết ứng dụng điều khiển.
> - *"Tập mờ có liên hệ gì với xác suất?"* — Xem mục 5 phân biệt rõ.

> 🔁 **Dừng lại tự kiểm tra.**
> Dùng hàm μ("cao") = max(0, min(1, (h−160)/20)). Tính μ cho: (a) h=162; (b) h=178; (c) h=193.
>
> <details><summary>Đáp án</summary>
>
> (a) μ(162) = max(0, min(1, 2/20)) = max(0, 0.1) = **0.1**.
> (b) μ(178) = max(0, min(1, 18/20)) = max(0, 0.9) = **0.9**.
> (c) μ(193) = max(0, min(1, 33/20)) = max(0, min(1, 1.65)) = max(0, 1) = **1.0**.
> </details>

---

## 4. Phép toán logic mờ

> 💡 **Trực giác.** Trong logic cổ điển: T AND T = T; T AND F = F. Trong logic mờ: "rất cao" (0.9) AND "rất trẻ" (0.8) = ? Kết quả phải là một con số trong [0,1] phản ánh cả hai đều phải thỏa mãn. Zadeh chọn min: min(0.9, 0.8) = 0.8 — bị giới hạn bởi điều kiện yếu hơn.

### 4.1 Ba phép toán cơ bản (chuẩn Zadeh)

**Phủ định mờ (fuzzy NOT):**
> ¬x = 1 − x

**Hội mờ (fuzzy AND = t-norm tiêu chuẩn):**
> x ∧ y = min(x, y)

**Tuyển mờ (fuzzy OR = t-conorm tiêu chuẩn):**
> x ∨ y = max(x, y)

**Ví dụ số cụ thể (≥ 4):**

| p | q | ¬p = 1−p | p ∧ q = min | p ∨ q = max |
|:-:|:-:|:--------:|:-----------:|:-----------:|
| 0.7 | 0.3 | 0.3 | **0.3** | **0.7** |
| 0.8 | 0.5 | 0.2 | **0.5** | **0.8** |
| 1.0 | 0.4 | 0.0 | **0.4** | **1.0** |
| 0.6 | 0.6 | 0.4 | **0.6** | **0.6** |
| 0.0 | 0.9 | 1.0 | **0.0** | **0.9** |
| 0.5 | 0.5 | 0.5 | **0.5** | **0.5** |

**Kéo theo mờ (fuzzy implication — Łukasiewicz):**
> x → y = min(1, 1 − x + y)

Ví dụ: p = 0.8, q = 0.5: p → q = min(1, 1 − 0.8 + 0.5) = min(1, 0.7) = **0.7**.

### 4.2 Ví dụ tổng hợp: "Người này khá cao VÀ khá trẻ"

Giả sử:
- p = "Người này khá cao" = μ("cao")(175cm) = max(0, min(1, 15/20)) = **0.75**
- q = "Người này khá trẻ" với định nghĩa μ("trẻ")(28 tuổi) = **0.85** (giả sử từ hàm thành viên riêng)

Tính:
- p ∧ q = min(0.75, 0.85) = **0.75** → "khá cao VÀ khá trẻ" đúng ở mức 0.75.
- p ∨ q = max(0.75, 0.85) = **0.85** → "khá cao HOẶC khá trẻ" đúng ở mức 0.85.
- ¬p = 1 − 0.75 = **0.25** → "không khá cao" đúng ở mức 0.25.
- ¬p ∨ q = max(0.25, 0.85) = **0.85** → p → q (theo định nghĩa ¬p∨q) = 0.85.

### 4.3 Tại sao min/max?

Tại sao không dùng phép nhân (x × y) cho AND? Hoặc (x + y − x×y) cho OR?

- **min/max** là họ toán tử đơn giản nhất, bảo toàn tính idempotent (x ∧ x = x), và không "làm giảm" giá trị khi hai vế bằng nhau.
- **Phép nhân** (algebraic product): 0.8 × 0.8 = 0.64 < 0.8 — cảm giác "hai điều kiện tốt nhân lại thành kém hơn" không tự nhiên.
- **Bounded sum** (Łukasiewicz): max(0, x+y−1) cho AND — chặt hơn min.

> ⚠ **min/max chỉ là một họ toán tử — không phải duy nhất.** Trong nghiên cứu và ứng dụng thực tế, người ta chọn họ t-norm/t-conorm phù hợp với ngữ cảnh. Bài này dùng min/max vì đây là chuẩn Zadeh phổ biến nhất và trực quan nhất.

> ❓ **Câu hỏi tự nhiên của người đọc.**
> - *"Luật De Morgan có còn đúng trong logic mờ không?"* — Có! ¬(x∧y) = ¬x∨¬y vẫn đúng với min/max: ¬min(x,y) = max(¬x,¬y) = max(1−x, 1−y) = 1 − min(x,y). Kiểm tra: x=0.7, y=0.3: ¬min(0.7,0.3) = ¬0.3 = 0.7; max(0.3, 0.7) = 0.7. ✓
> - *"Luật trung gian loại trừ (p∨¬p = T) còn đúng không?"* — Không! p∨¬p = max(p, 1−p). Khi p=0.5: max(0.5, 0.5) = **0.5** ≠ 1. Đây là một trong những thay đổi cơ bản nhất của logic mờ.

> 🔁 **Dừng lại tự kiểm tra.**
> Cho p = 0.6, q = 0.4. Tính: (a) ¬q; (b) p∧q; (c) p∨¬q; (d) ¬(p∧q) vs ¬p∨¬q (kiểm tra De Morgan).
>
> <details><summary>Đáp án</summary>
>
> (a) ¬q = 1−0.4 = **0.6**.
> (b) p∧q = min(0.6, 0.4) = **0.4**.
> (c) ¬q = 0.6; p∨¬q = max(0.6, 0.6) = **0.6**.
> (d) ¬(p∧q) = ¬0.4 = 0.6. ¬p∨¬q = max(0.4, 0.6) = 0.6. Bằng nhau ✓ — De Morgan đúng.
> </details>

> 📝 **Tóm tắt mục 4.**
> - Phép toán Zadeh: ¬x = 1−x; x∧y = min(x,y); x∨y = max(x,y).
> - Luật De Morgan vẫn đúng; luật trung gian loại trừ (p∨¬p=1) không còn đúng.
> - min/max là họ tiêu chuẩn; còn nhiều họ t-norm khác.

---

## 5. Phân biệt ba khái niệm dễ nhầm

> ⚠ **Đây là điểm gây nhầm lẫn thường xuyên nhất.** Ba khái niệm sau có vẻ tương tự nhưng về bản chất hoàn toàn khác nhau:

### 5.1 "Không xác định" (Undefined) trong logic ba trị

- **Nghĩa:** Câu mệnh đề *có* giá trị chân lý xác định (T hoặc F) nhưng ta *chưa biết* giá trị đó là gì. Hoặc: tương lai bất định chưa "chốt" giá trị.
- **Ví dụ:** "Ngày mai sẽ mưa ở Hà Nội" = U (theo Łukasiewicz — chưa xảy ra).
- **Toán học:** Giá trị rời rạc: {T, U, F} = {1, ½, 0}.
- **Câu hỏi mà nó trả lời:** "Câu này đúng hay sai?"

### 5.2 Độ đúng (Degree of truth) trong logic mờ

- **Nghĩa:** Câu mệnh đề *thực sự* đúng ở một mức độ nào đó — không phải vì ta không biết, mà vì vị từ bản thân có bản chất liên tục.
- **Ví dụ:** "Người cao 173cm là cao" = **0.65** — không phải ta không biết; ta biết rõ chiều cao 173cm, nhưng "cao" là mờ.
- **Toán học:** Giá trị liên tục trong [0, 1].
- **Câu hỏi mà nó trả lời:** "Câu này đúng đến mức nào?"

### 5.3 Xác suất (Probability)

- **Nghĩa:** Khả năng một *sự kiện* xảy ra — câu mệnh đề hoặc T hoặc F, nhưng ta không chắc chắn *sự kiện* đó sẽ thực sự xảy ra.
- **Ví dụ:** "Ngày mai mưa" = 0.65 — câu này hoặc đúng hoặc sai (lưỡng trị!), nhưng xác suất nó đúng là 65%.
- **Toán học:** Theo axiom Kolmogorov, P(A) + P(¬A) = 1.
- **Câu hỏi mà nó trả lời:** "Sự kiện này xảy ra với khả năng bao nhiêu?"

### 5.4 Bảng so sánh

| Tiêu chí | Ba trị (U) | Mờ (0.65) | Xác suất (0.65) |
|----------|:---------:|:---------:|:---------------:|
| Bản chất | Thiếu thông tin / tương lai | Bản chất vị từ | Tần suất / niềm tin |
| Giá trị thật của câu | T hoặc F (chưa biết) | *Thực sự* 0.65 (không phải T/F) | T hoặc F (chưa xảy ra) |
| p + ¬p | T∨¬T = T (nếu T); U∨U = U (nếu U) | p∨¬p = max(0.65, 0.35) = **0.65** ≠ 1 | P(A) + P(¬A) = **1** luôn |
| Ví dụ | "Ngày mai mưa" (chưa xảy ra) | "173cm là cao" | "Xúc xắc ra 3" |
| Kết hợp | Bảng ba trị | min/max | Nhân (độc lập) |

> ❓ **Câu hỏi tự nhiên của người đọc.**
> - *"Nhưng trong thực tế, khi máy giặt ra quyết định 'bẩn vừa', nó có dùng xác suất không?"* — Có hệ thống dùng cả hai. Nhưng logic mờ thuần túy không cần mô hình xác suất — nó hoạt động trực tiếp trên độ thành viên. Không cần dữ liệu training, không cần phân phối.
> - *"Bayesian reasoning và logic mờ có thể kết hợp không?"* — Có, trong nghiên cứu hiện đại (fuzzy probability, possibility theory). Nhưng đây là hướng nâng cao vượt quá phạm vi bài này.

---

## 6. Ứng dụng thực tế

### 6.1 Hệ điều khiển mờ (Fuzzy Control Systems)

Logic mờ thực sự tỏa sáng trong điều khiển tự động. Thay vì "if temperature > 25°C: bật máy lạnh" (quy tắc cứng), hệ mờ dùng:

```
IF nhiệt độ là ẤM (μ=0.6) AND độ ẩm là CAO (μ=0.8)
THEN công suất lạnh = max(0.6, 0.8) = 0.8  →  điều chỉnh mức cao
```

**Ứng dụng kinh điển:**
- **Máy giặt mờ (Fuzzy Washing Machine):** cảm biến đo độ đục nước → suy ra "mức bẩn" (0→1) → điều chỉnh thời gian và lượng bột giặt. Tiết kiệm nước và điện.
- **Máy điều hòa mờ:** điều chỉnh trơn tru hơn, không bật/tắt đột ngột → êm và tiết kiệm điện hơn.
- **Hệ thống phanh ABS thế hệ mới:** phân loại "trơn trượt" không phải 0/1 → điều chỉnh lực phanh mịn hơn.
- **Thang máy mờ:** tối ưu thứ tự phục vụ dựa trên "gần" (độ ưu tiên) chứ không phải quy tắc cứng.

### 6.2 Trí tuệ nhân tạo và xử lý ngôn ngữ tự nhiên

- **Hệ chuyên gia mờ (fuzzy expert systems):** chẩn đoán y tế dựa trên triệu chứng có mức độ.
- **Phân loại ảnh:** "ảnh này chứa xe máy" đến mức 0.87 — thay vì T/F cứng.
- **Truy vấn cơ sở dữ liệu mờ:** "Tìm nhà hàng gần, rẻ, ngon" — mỗi tiêu chí có hàm thành viên riêng.
- **Camera tự động lấy nét:** đánh giá độ "sắc nét" liên tục → điều chỉnh mịn.

### 6.3 Logic mờ và sorites

Quay lại nghịch lý đống cát: với logic mờ, câu "N hạt cát tạo thành đống" không phải đột ngột chuyển từ T sang F. Thay vào đó:

| Số hạt | μ("là đống") |
|:------:|:------------:|
| 1.000.000 | 1.0 |
| 500.000 | 0.98 |
| 10.000 | 0.7 |
| 1.000 | 0.4 |
| 100 | 0.15 |
| 10 | 0.02 |
| 1 | 0.0 |

Không có bước nhảy tùy tiện. Logic mờ không "giải" nghịch lý (vẫn còn tranh luận về "ranh giới" hàm thành viên ở đâu), nhưng làm nó kém "nghịch" hơn.

> 📝 **Tóm tắt mục 6.**
> - Hệ điều khiển mờ: máy giặt, điều hòa, ABS — quyết định dựa trên mức độ, không phải quy tắc cứng.
> - AI: phân loại, truy vấn mờ, camera.
> - Sorites: logic mờ không giải nhưng làm "dịu" nghịch lý bằng cách cho độ thành viên giảm liên tục.

---

## Bài tập

**Bài 1 — Ba trị cơ bản.** Cho bảng Kleene ba trị (T/U/F). Tính các biểu thức sau:
- (a) T ∧ U
- (b) U ∨ F
- (c) ¬(U ∧ T)
- (d) (T ∨ U) → F
- (e) U → U (theo Kleene vs Łukasiewicz)

**Bài 2 — Hàm thành viên.** Dùng μ("cao") = max(0, min(1, (h−160)/20)) cm và μ("nặng") = max(0, min(1, (w−55)/25)) kg. Tính:
- (a) μ("cao") cho h = 167cm, 172cm, 183cm, 191cm.
- (b) μ("nặng") cho w = 48kg, 62kg, 75kg, 85kg.
- (c) Với h=172cm, w=68kg: tính "cao VÀ nặng" (p∧q = min), "cao HOẶC nặng" (p∨q = max), "không cao" (¬p).

**Bài 3 — Phép toán mờ.** Cho p = 0.7, q = 0.4, r = 0.9.
- (a) ¬p, ¬q, ¬r.
- (b) p ∧ q, q ∧ r, p ∧ r.
- (c) p ∨ q, q ∨ r.
- (d) (p ∧ q) ∨ r — tính từng bước.
- (e) Kiểm tra De Morgan: ¬(p∧q) = ¬p∨¬q không?

**Bài 4 — Phân biệt ba khái niệm.** Với mỗi câu sau, cho biết nó thuộc loại nào: "không xác định ba trị", "độ đúng mờ", hay "xác suất". Giải thích ngắn.
- (a) "Xúc xắc ra số 5" = 1/6.
- (b) "Người 168cm là cao" = 0.4.
- (c) "Ngày mai có trận đấu" = U.
- (d) "Bài này khó" = 0.8.
- (e) "Tung đồng xu ra mặt ngửa" = 0.5.

**Bài 5 — Hệ điều khiển mờ đơn giản.** Một hệ thống điều khiển quạt dùng quy tắc mờ:
- μ("phòng nóng")(30°C) = max(0, min(1, (T−25)/10)) = ?
- μ("phòng ẩm")(80%) = max(0, min(1, (H−60)/30)) = ?
- Công suất quạt = max(μ("nóng"), μ("ẩm")) × 100%.

Tính công suất quạt khi T = 30°C, H = 80%.

---

## Lời giải chi tiết

### Bài 1

**Cách tiếp cận:** Tra bảng Kleene K3. Thứ tự quan trọng: F "hút xuống" trong ∧; T "kéo lên" trong ∨.

- **(a) T ∧ U:** Hàng T, cột U trong bảng ∧ → **U**.
  Trực giác: "Chắc chắn đúng" VÀ "Chưa biết" = vẫn chưa biết tổng thể.
- **(b) U ∨ F:** Hàng U, cột F trong bảng ∨ → **U**.
  Trực giác: "Chưa biết" HOẶC "Sai chắc" = vẫn chưa biết (có thể U vế trái đúng).
- **(c) ¬(U ∧ T):** Trong ngoặc: U∧T = U (bước a). Rồi ¬U = **U**.
- **(d) (T ∨ U) → F:** Trong ngoặc: T∨U = T. Rồi T→F = **F** (kéo theo từ T đến F = sai).
- **(e) U → U (Kleene):** Tra bảng Kleene → (từ công thức ¬U∨U = U∨U = U) → **U**.
  **U → U (Łukasiewicz):** Łukasiewicz định nghĩa U→U = **T** (nếu cả hai vế đều "có thể đúng" thì kéo theo đúng).

---

### Bài 2

**Công thức:** μ("cao") = max(0, min(1, (h−160)/20)); μ("nặng") = max(0, min(1, (w−55)/25)).

**(a)** Chiều cao:
- h=167: (167−160)/20 = 7/20 = 0.35 → **0.35**.
- h=172: 12/20 = **0.60**.
- h=183: 23/20 = 1.15 → min(1, 1.15) = **1.0**.
- h=191: 31/20 = 1.55 → min(1, 1.55) = **1.0**.

**(b)** Cân nặng:
- w=48: (48−55)/25 = −0.28 → max(0, −0.28) = **0.0**.
- w=62: 7/25 = 0.28 → **0.28**.
- w=75: 20/25 = **0.80**.
- w=85: 30/25 = 1.2 → min(1, 1.2) = **1.0**.

**(c)** h=172cm → μ("cao") = 0.60; w=68kg → μ("nặng") = (68−55)/25 = 13/25 = **0.52**.
- "cao VÀ nặng": min(0.60, 0.52) = **0.52**.
- "cao HOẶC nặng": max(0.60, 0.52) = **0.60**.
- "không cao": 1 − 0.60 = **0.40**.

---

### Bài 3

p = 0.7, q = 0.4, r = 0.9.

**(a)** ¬p = 1−0.7 = **0.3**; ¬q = **0.6**; ¬r = **0.1**.

**(b)** p∧q = min(0.7,0.4) = **0.4**; q∧r = min(0.4,0.9) = **0.4**; p∧r = min(0.7,0.9) = **0.7**.

**(c)** p∨q = max(0.7,0.4) = **0.7**; q∨r = max(0.4,0.9) = **0.9**.

**(d)** (p∧q)∨r: bước 1: p∧q = 0.4; bước 2: 0.4∨r = max(0.4, 0.9) = **0.9**.

**(e)** De Morgan: ¬(p∧q) = ¬0.4 = **0.6**. ¬p∨¬q = max(0.3, 0.6) = **0.6**. Bằng nhau ✓.

---

### Bài 4

- **(a) Xúc xắc ra số 5 = 1/6:** **Xác suất.** Câu "Xúc xắc ra 5" là T hoặc F (lưỡng trị!). 1/6 là tần suất sự kiện xảy ra, không phải độ đúng của câu.
- **(b) Người 168cm là cao = 0.4:** **Độ đúng mờ.** Ta biết chính xác chiều cao 168cm. Nhưng "cao" là vị từ mờ → câu đúng ở mức 0.4.
- **(c) Ngày mai có trận đấu = U:** **Không xác định ba trị.** Câu này hoặc T hoặc F (lưỡng trị về bản chất), nhưng tương lai chưa diễn ra nên theo Łukasiewicz là U.
- **(d) Bài này khó = 0.8:** **Độ đúng mờ.** "Khó" là vị từ mờ, không có ranh giới sắc bén. Câu đúng ở mức 0.8 theo hàm thành viên của người đánh giá.
- **(e) Đồng xu ra ngửa = 0.5:** **Xác suất.** Câu hoặc T hoặc F (lưỡng trị). 0.5 là khả năng sự kiện xảy ra.

---

### Bài 5

- μ("nóng")(30°C) = max(0, min(1, (30−25)/10)) = max(0, min(1, 0.5)) = **0.5**.
- μ("ẩm")(80%) = max(0, min(1, (80−60)/30)) = max(0, min(1, 0.667)) = **0.667**.
- Công suất quạt = max(0.5, 0.667) × 100% = **66.7%**.

Hệ thống bật quạt ở mức khoảng 2/3 công suất — không phải 0% hay 100% — phản ánh điều kiện "vừa hơi nóng, vừa khá ẩm".

---

## Code & Minh họa

- [visualization.html](./visualization.html) — Gồm ba công cụ tương tác: (1) Máy tính chân lý mờ với hai slider p, q ∈ [0,1] hiển thị tất cả phép toán; (2) Đồ thị hàm thành viên SVG kéo thả; (3) Bảng chân lý ba trị đầy đủ (Kleene K3).

---

## Bài tiếp theo

→ **[Lesson 05 — Ngữ nghĩa & quy chiếu: Frege, Russell, Kripke](../lesson-05-sense-reference/)**: khi nào hai từ/cụm từ "cùng nghĩa"? Tại sao "Ngôi sao buổi sáng" và "Ngôi sao buổi tối" đều là Sao Kim nhưng không đồng nghĩa? Lý thuyết nghĩa (sense) và quy chiếu (reference) của Frege và sự phê phán của Kripke.

[⬆ Về Advanced Logic & Language](../index.html) · [🏠 Trang chính Philosophy](../../index.html)
