# Lesson 02 — Ngụy biện hình thức

> **Tầng 2 — Critical Thinking · Bài 2/8**

Bạn vừa học cách nhận diện cấu trúc lập luận và phân biệt tiền đề với kết luận ([Lesson 01 — Cấu trúc lập luận](../lesson-01-argument-structure/)). Bài này đi sâu hơn vào một câu hỏi then chốt: **"Lập luận đúng cấu trúc" nghĩa là gì, và khi cấu trúc sai thì xảy ra điều gì?**

Ngụy biện hình thức (formal fallacy) xảy ra khi lập luận **sai về mặt cấu trúc logic** — bất kể các tiền đề có đúng với thực tế hay không, bất kể kết luận nghe có vẻ hợp lý đến đâu. Đây là khái niệm đối lập trực tiếp với modus ponens và modus tollens hợp lệ mà bạn sẽ thấy trong [Lesson 04 — Tính hợp lệ & suy diễn](../../01-FormalLogic/lesson-04-validity-inference/).

---

## Mục tiêu học tập

Sau bài này, bạn có thể:

- Định nghĩa ngụy biện hình thức và phân biệt với ngụy biện phi hình thức.
- Nhận diện và đặt tên hai ngụy biện hình thức phổ biến nhất: khẳng định hậu kiện và phủ định tiền kiện.
- Chứng minh một lập luận không hợp lệ bằng bảng chân lý (tìm dòng phản ví dụ: mọi tiền đề T nhưng kết luận F).
- Giải thích tại sao kết luận "tình cờ đúng" không cứu được một lập luận không hợp lệ.
- So sánh cạnh nhau modus ponens / modus tollens (hợp lệ) với hai ngụy biện tương ứng.

## Kiến thức tiền đề

- [Lesson 01 — Cấu trúc lập luận](../lesson-01-argument-structure/): tiền đề, kết luận, lập luận hợp lệ.
- [Lesson 04 (Formal Logic) — Tính hợp lệ & suy diễn](../../01-FormalLogic/lesson-04-validity-inference/): modus ponens (`p → q, p ∴ q`), modus tollens (`p → q, ¬q ∴ ¬p`), khái niệm hợp lệ hình thức.

---

## 1. Ngụy biện hình thức là gì?

> 💡 **Trực giác.** Tưởng tượng bạn dùng máy tính để tính `5 + 3 × 2`. Nếu bạn nhập sai thứ tự phép tính và tính `(5 + 3) × 2 = 16` thay vì `5 + (3 × 2) = 11`, bạn đã sai quy tắc — dù các con số 5, 3, 2 đều "thật". Logic lập luận cũng vậy: bạn có thể dùng những tiền đề hoàn toàn đúng với thực tế nhưng vẫn rút ra kết luận sai vì áp dụng sai cấu trúc suy diễn.

**Ngụy biện hình thức (formal fallacy)** là lập luận **không hợp lệ** do **cấu trúc logic bị sai**, bất kể nội dung của các tiền đề là đúng hay sai.

Phân biệt rõ ba khái niệm:

| Khái niệm | Định nghĩa | Ví dụ |
|-----------|-----------|-------|
| **Hợp lệ (valid)** | Cấu trúc đúng: không thể có mọi tiền đề T mà kết luận F | Modus ponens: `p → q, p ∴ q` |
| **Không hợp lệ (invalid)** | Tồn tại trường hợp mọi tiền đề T nhưng kết luận F | Khẳng định hậu kiện, phủ định tiền kiện |
| **Ngụy biện hình thức** | Lập luận không hợp lệ mà *nhìn có vẻ* hợp lệ, dễ nhầm lẫn | Xem mục 2 và 3 |

> ⚠ **Lỗi thường gặp: nhầm "kết luận đúng" với "lập luận hợp lệ".** Một lập luận không hợp lệ có thể có kết luận tình cờ đúng với thực tế. Nhưng nếu cấu trúc sai, lập luận vẫn là ngụy biện — ta không thể tin vào kết luận *vì* lập luận đó. Ví dụ: "Mọi cá đều sống dưới nước. Cá heo sống dưới nước. ∴ Cá heo là cá." — kết luận sai (cá heo là thú), dù câu thứ nhất và thứ hai đều đúng. Cấu trúc sai dẫn đến kết luận sai. Nhưng ngay cả khi kết luận tình cờ đúng, lập luận vẫn không hợp lệ nếu cấu trúc sai.

> ❓ **Câu hỏi tự nhiên của người đọc.**
> - *"Ngụy biện hình thức khác ngụy biện phi hình thức như thế nào?"* — Ngụy biện hình thức: lỗi ở **cấu trúc** — bất kể nội dung, đặt vào dạng bảng chân lý là thấy ngay sai. Ngụy biện phi hình thức: cấu trúc có thể ổn nhưng lỗi ở **nội dung, ngữ nghĩa, hoặc ngữ cảnh** (ví dụ: tấn công người thay vì lập luận, viện dẫn quyền lực sai chỗ, v.v.). Bài này chỉ xét ngụy biện hình thức.
> - *"Có bao nhiêu ngụy biện hình thức?"* — Trong logic mệnh đề, có hai cái kinh điển nhất và quan trọng nhất: khẳng định hậu kiện và phủ định tiền kiện. Ngoài ra còn khẳng định một tuyển (affirming a disjunct). Cả ba đều được học trong bài này.

> 📝 **Tóm tắt mục 1.**
> - Ngụy biện hình thức = lập luận không hợp lệ do sai cấu trúc logic.
> - Không hợp lệ = tồn tại dòng phản ví dụ: mọi tiền đề T nhưng kết luận F.
> - Kết luận tình cờ đúng ≠ lập luận hợp lệ.

---

## 2. Khẳng định hậu kiện (Affirming the Consequent)

> 💡 **Trực giác.** Câu điều kiện "Nếu A thì B" (`p → q`) không có nghĩa là "Nếu B thì A". Nếu bạn biết rằng "Nếu là chó thì có bốn chân" và bạn thấy một con vật có bốn chân, bạn **không thể** kết luận nó là chó — nó có thể là mèo, bò, ngựa, hay bàn (không phải sinh vật). Việc nhìn thấy *hậu kiện* (B = "có bốn chân") và kết luận *tiền kiện* (A = "là chó") là sai logic.

### 2.1 Định nghĩa và cấu trúc

**Khẳng định hậu kiện (affirming the consequent)** có dạng:

```
Tiền đề 1: p → q     (Nếu p thì q)
Tiền đề 2: q          (q đúng)
Kết luận:  ∴ p        (Vậy p đúng)   ← SAI
```

Ký hiệu: `{(p → q), q} ⊬ p` — không thể suy diễn hợp lệ.

### 2.2 Chứng minh không hợp lệ bằng bảng chân lý

Bảng chân lý của `p → q, q ∴ p`:

| p | q | p → q | q | **p (kết luận)** |
|:---:|:---:|:---:|:---:|:---:|
| T | T | **T** | **T** | T |
| T | F | F | F | T |
| **F** | **T** | **T** | **T** | **F** ← phản ví dụ |
| F | F | T | F | F |

**Dòng 3** (p = F, q = T): cả hai tiền đề đều **T** (vì `F → T` = T, và `q` = T), nhưng kết luận p = **F**.

Đây là dòng phản ví dụ chứng minh lập luận **không hợp lệ**.

### 2.3 Bốn ví dụ ngôn ngữ tự nhiên

**Ví dụ 1 — Thời tiết:**
- Tiền đề 1: "Nếu trời mưa thì đường ướt." (p = trời mưa, q = đường ướt)
- Tiền đề 2: "Đường ướt."
- Kết luận: "∴ Trời mưa." — **SAI (ngụy biện)**
- Phản ví dụ: Xe tưới nước vừa đi qua, hoặc ai đó đổ nước ra đường. Đường ướt nhưng không mưa.

**Ví dụ 2 — Y tế:**
- Tiền đề 1: "Nếu bị viêm phổi thì sốt cao." (p = viêm phổi, q = sốt cao)
- Tiền đề 2: "Bệnh nhân sốt cao."
- Kết luận: "∴ Bệnh nhân bị viêm phổi." — **SAI (ngụy biện)**
- Phản ví dụ: Sốt cao còn do cúm, nhiễm khuẩn khác, mất nước, v.v.

**Ví dụ 3 — Học tập:**
- Tiền đề 1: "Nếu học chăm thì đạt điểm cao." (p = học chăm, q = điểm cao)
- Tiền đề 2: "Nam đạt điểm cao."
- Kết luận: "∴ Nam học chăm." — **SAI (ngụy biện)**
- Phản ví dụ: Nam có thể thi đề dễ, hoặc được người khác giúp đỡ, v.v.

**Ví dụ 4 — Thám tử:**
- Tiền đề 1: "Nếu là thủ phạm thì có mặt ở hiện trường." (p = thủ phạm, q = có mặt ở hiện trường)
- Tiền đề 2: "Người A có mặt ở hiện trường."
- Kết luận: "∴ Người A là thủ phạm." — **SAI (ngụy biện)**
- Phản ví dụ: Nhiều người có mặt ở hiện trường (nhân chứng, cảnh sát, hàng xóm...) mà không phải thủ phạm.

> ⚠ **Lỗi thường gặp: nhầm với modus ponens.** Modus ponens (`p → q, p ∴ q`) hợp lệ vì biết tiền kiện (p). Khẳng định hậu kiện biết hậu kiện (q) — ngược chiều — nên không hợp lệ. Mũi tên logic `→` chỉ đi một chiều; đi ngược là sai.

> ❓ **Câu hỏi tự nhiên của người đọc.**
> - *"Khi nào thì biết q → p đúng?"* — Khi và chỉ khi câu điều kiện là **tương đương song điều kiện** (`p ↔ q`): p đúng khi và chỉ khi q đúng. Ví dụ: "Tam giác đều khi và chỉ khi ba cạnh bằng nhau" — biết ba cạnh bằng nhau thì kết luận tam giác đều là hợp lệ. Nhưng phải có `↔`, không phải `→`.
> - *"Trong khoa học, người ta có dùng kiểu lập luận này không?"* — Có, và đây là điểm tinh tế: trong khoa học, khi một lý thuyết dự đoán hiện tượng q và quan sát thấy q, đây là bằng chứng *hỗ trợ* lý thuyết nhưng không *chứng minh* lý thuyết. Đây gọi là "xác nhận" (confirmation), không phải "chứng minh" (proof). Triết học khoa học (Popper) nhấn mạnh điều này: khoa học chỉ có thể *bác bỏ* lý thuyết (modus tollens), không bao giờ *chứng minh* hoàn toàn.

> 🔁 **Dừng lại tự kiểm tra.**
> Lập luận sau có phải khẳng định hậu kiện không?
> "Nếu là kim loại thì dẫn điện. Đồng dẫn điện. ∴ Đồng là kim loại."
> <details><summary>Đáp án</summary>
>
> **Có** — đây là khẳng định hậu kiện (`p → q, q ∴ p`). Tuy nhiên kết luận tình cờ đúng (đồng đúng là kim loại). Nhưng lập luận vẫn **không hợp lệ** vì cấu trúc sai: graphite (than chì) cũng dẫn điện nhưng không phải kim loại — phản ví dụ cho thấy dạng lập luận này có thể dẫn đến kết luận sai.
> Lập luận hợp lệ phải là: "Đồng là kim loại. Mọi kim loại dẫn điện. ∴ Đồng dẫn điện." (modus ponens)
> </details>

> 📝 **Tóm tắt mục 2.**
> - Khẳng định hậu kiện: `p → q, q ∴ p` — không hợp lệ.
> - Phản ví dụ: dòng p = F, q = T làm cả hai tiền đề T nhưng kết luận F.
> - Mũi tên `→` không thể đảo chiều; muốn đảo phải dùng `↔`.

---

## 3. Phủ định tiền kiện (Denying the Antecedent)

> 💡 **Trực giác.** "Nếu là chim sẻ thì biết bay." Nếu tôi nói "Con vật này không phải chim sẻ" — tôi có thể kết luận "Nó không biết bay" không? Không — nó có thể là bồ câu, đại bàng, hay máy bay drone. Phủ định tiền kiện (không phải chim sẻ) không nói lên điều gì về hậu kiện (biết bay).

### 3.1 Định nghĩa và cấu trúc

**Phủ định tiền kiện (denying the antecedent)** có dạng:

```
Tiền đề 1: p → q     (Nếu p thì q)
Tiền đề 2: ¬p         (p sai)
Kết luận:  ∴ ¬q       (Vậy q sai)   ← SAI
```

Ký hiệu: `{(p → q), ¬p} ⊬ ¬q` — không thể suy diễn hợp lệ.

### 3.2 Chứng minh không hợp lệ bằng bảng chân lý

Bảng chân lý của `p → q, ¬p ∴ ¬q`:

| p | q | p → q | ¬p | **¬q (kết luận)** |
|:---:|:---:|:---:|:---:|:---:|
| T | T | T | F | F |
| T | F | F | F | T |
| **F** | **T** | **T** | **T** | **F** ← phản ví dụ |
| F | F | T | T | T |

**Dòng 3** (p = F, q = T): cả hai tiền đề đều **T** (`F → T` = T, `¬F` = T), nhưng kết luận ¬q = ¬T = **F**.

Dòng phản ví dụ chứng minh lập luận **không hợp lệ**.

### 3.3 Bốn ví dụ ngôn ngữ tự nhiên

**Ví dụ 1 — Thời tiết (đối xứng với mục 2):**
- Tiền đề 1: "Nếu trời mưa thì đường ướt."
- Tiền đề 2: "Trời không mưa."
- Kết luận: "∴ Đường không ướt." — **SAI (ngụy biện)**
- Phản ví dụ: Xe tưới nước làm đường ướt dù không mưa.

**Ví dụ 2 — Sinh học:**
- Tiền đề 1: "Nếu là cá mập thì là cá."
- Tiền đề 2: "Con này không phải cá mập."
- Kết luận: "∴ Con này không phải cá." — **SAI (ngụy biện)**
- Phản ví dụ: Cá hồi, cá thu, cá ngừ đều là cá nhưng không phải cá mập.

**Ví dụ 3 — Kinh tế:**
- Tiền đề 1: "Nếu lạm phát tăng cao thì lãi suất ngân hàng tăng."
- Tiền đề 2: "Lạm phát không tăng cao."
- Kết luận: "∴ Lãi suất không tăng." — **SAI (ngụy biện)**
- Phản ví dụ: Ngân hàng trung ương có thể tăng lãi suất vì nhiều lý do khác (kiểm soát tín dụng, bảo vệ tỷ giá, v.v.).

**Ví dụ 4 — Pháp lý:**
- Tiền đề 1: "Nếu có bằng chứng ADN trùng khớp thì bị cáo có tội."
- Tiền đề 2: "Không có bằng chứng ADN trùng khớp."
- Kết luận: "∴ Bị cáo vô tội." — **SAI (ngụy biện)**
- Phản ví dụ: Còn nhiều loại bằng chứng khác (camera, nhân chứng, dấu vân tay, v.v.) có thể kết tội mà không cần ADN.

> ⚠ **Lỗi thường gặp: nhầm với modus tollens.** Modus tollens (`p → q, ¬q ∴ ¬p`) hợp lệ vì phủ định *hậu kiện* (¬q). Phủ định tiền kiện phủ định *tiền kiện* (¬p) — sai chiều. Ghi nhớ: modus tollens "tolls" (chuông báo) khi hậu kiện sai, khi đó tiền kiện phải sai theo.

> ❓ **Câu hỏi tự nhiên của người đọc.**
> - *"Hai ngụy biện này có liên hệ gì với nhau không?"* — Có. Khẳng định hậu kiện tương đương với phủ định tiền kiện của câu đảo (converse). Câu đảo của `p → q` là `q → p`. Phủ định tiền kiện của `p → q` cho ra kết luận `¬q`, giống như khẳng định hậu kiện của câu đảo `q → p` cho ra kết luận `¬p` khi biết `¬q`. Cả hai đều nhầm `p → q` với `p ↔ q`.

> 🔁 **Dừng lại tự kiểm tra.**
> "Nếu học đại học thì kiếm được việc tốt. Lan không học đại học. ∴ Lan không kiếm được việc tốt."
> Lập luận này mắc ngụy biện gì?
> <details><summary>Đáp án</summary>
>
> **Phủ định tiền kiện**: `p → q, ¬p ∴ ¬q`. Sai vì Lan có thể học nghề, tự kinh doanh, hay có kỹ năng đặc biệt mà không cần bằng đại học — đây là dòng p = F, q = T (phản ví dụ).
> </details>

> 📝 **Tóm tắt mục 3.**
> - Phủ định tiền kiện: `p → q, ¬p ∴ ¬q` — không hợp lệ.
> - Phản ví dụ: dòng p = F, q = T làm cả hai tiền đề T nhưng kết luận (¬q = F) sai.
> - Khác với modus tollens (phủ định hậu kiện ¬q → ¬p) là hợp lệ.

---

## 4. So sánh: hợp lệ vs. ngụy biện

> 💡 **Trực giác.** Bốn dạng lập luận dùng `p → q` tạo thành hai cặp: một cặp hợp lệ, một cặp không hợp lệ. Nhớ quy tắc đơn giản: **nếu bạn đi theo mũi tên** (từ tiền kiện sang hậu kiện, hoặc từ phủ định hậu kiện sang phủ định tiền kiện) thì hợp lệ. **Nếu đi ngược** hoặc **cắt bỏ từ tiền kiện** thì không hợp lệ.

### 4.1 Bảng so sánh bốn dạng

| Dạng | Cấu trúc | Hợp lệ? | Tên |
|------|---------|:---:|-----|
| Modus Ponens | `p → q, p ∴ q` | **✓ HỢP LỆ** | Khẳng định tiền kiện |
| Modus Tollens | `p → q, ¬q ∴ ¬p` | **✓ HỢP LỆ** | Phủ định hậu kiện |
| Affirming Consequent | `p → q, q ∴ p` | **✗ NGỤy BIỆN** | Khẳng định hậu kiện |
| Denying Antecedent | `p → q, ¬p ∴ ¬q` | **✗ NGỤy BIỆN** | Phủ định tiền kiện |

### 4.2 Bảng chân lý đầy đủ cho modus ponens (hợp lệ)

| p | q | p → q | p | **q (kết luận)** |
|:---:|:---:|:---:|:---:|:---:|
| T | T | T | T | **T** |
| T | F | F | T | F |
| F | T | T | F | T |
| F | F | T | F | F |

Không có dòng nào có cả hai tiền đề (cột 3 và 4) đều T mà kết luận F → **hợp lệ**.

### 4.3 Bảng chân lý cho modus tollens (hợp lệ)

| p | q | p → q | ¬q | **¬p (kết luận)** |
|:---:|:---:|:---:|:---:|:---:|
| T | T | T | F | F |
| T | F | F | T | F |
| F | T | T | F | T |
| F | F | T | T | **T** |

Không có dòng nào mọi tiền đề T mà kết luận F → **hợp lệ**.

### 4.4 Tại sao modus tollens hợp lệ?

Bằng bảng chân lý: `p → q` tương đương với `¬q → ¬p` (contrapositive — câu đảo phủ định, đã học ở Lesson 03 Formal Logic). Nên modus tollens (`p → q, ¬q ∴ ¬p`) chỉ là modus ponens áp dụng cho câu đảo phủ định — hoàn toàn hợp lệ.

> 📝 **Tóm tắt mục 4.**
> - Hợp lệ: modus ponens (đi theo mũi tên) và modus tollens (phủ định từ hậu kiện về tiền kiện).
> - Không hợp lệ: khẳng định hậu kiện và phủ định tiền kiện (đều cố đảo hoặc nghịch chiều `→`).
> - Kiểm tra nhanh: tìm dòng phản ví dụ — nếu tồn tại → không hợp lệ.

---

## 5. Khẳng định một tuyển (Affirming a Disjunct)

> 💡 **Trực giác.** "Hôm nay hoặc tôi ăn phở hoặc ăn bún bò." Nếu tôi đã ăn phở, có thể kết luận tôi không ăn bún bò không? **Phụ thuộc vào nghĩa của "hoặc"!** Trong logic, "∨" (OR) mặc định là OR bao hàm — cả hai có thể cùng đúng. Nếu vậy, biết một vế đúng không loại trừ vế kia.

**Khẳng định một tuyển (affirming a disjunct)** có dạng:

```
Tiền đề 1: p ∨ q     (p hoặc q — OR bao hàm)
Tiền đề 2: p
Kết luận:  ∴ ¬q      (Vậy q sai)   ← SAI với OR bao hàm
```

Bảng chân lý nhanh:

| p | q | p ∨ q | p | **¬q** |
|:---:|:---:|:---:|:---:|:---:|
| T | T | **T** | **T** | **F** ← phản ví dụ |
| T | F | T | T | T |
| F | T | T | F | F |
| F | F | F | F | T |

Dòng 1 (p = T, q = T): cả hai tiền đề T nhưng kết luận ¬q = F → **không hợp lệ**.

**Ví dụ ngôn ngữ tự nhiên:**
- "Sinh viên này học giỏi hoặc chăm chỉ. Sinh viên này học giỏi. ∴ Sinh viên này không chăm chỉ." — SAI. Có thể vừa học giỏi vừa chăm chỉ.
- "Tôi thích cà phê hoặc trà. Tôi thích cà phê. ∴ Tôi không thích trà." — SAI. Tôi có thể thích cả hai.

> ⚠ **Ngoại lệ: OR loại trừ (XOR).** Nếu "hoặc" trong câu có nghĩa *loại trừ* (exclusive OR — chỉ đúng một cái, không cả hai), thì biết một vế đúng xác thực vế kia sai. Nhưng `∨` trong logic chuẩn là OR bao hàm. Cần phân tích ngữ cảnh để xác định nghĩa "hoặc" trong tiếng Việt tự nhiên.

> 📝 **Tóm tắt mục 5.**
> - Khẳng định một tuyển: `p ∨ q, p ∴ ¬q` — không hợp lệ với OR bao hàm.
> - Phản ví dụ: dòng p = T, q = T (cả hai cùng đúng) làm tiền đề T nhưng kết luận F.
> - Nếu biết rõ "hoặc" là OR loại trừ (XOR) thì mới được phép suy ra ¬q.

---

## Bài tập

**Bài 1 — Nhận diện dạng lập luận.**
Xác định mỗi lập luận dưới đây thuộc dạng nào (modus ponens, modus tollens, khẳng định hậu kiện, phủ định tiền kiện, hay dạng khác) và nó có hợp lệ không:

a) "Nếu có sóng thần thì nước biển rút đột ngột. Nước biển không rút đột ngột. ∴ Không có sóng thần."

b) "Nếu hút thuốc lá thì tăng nguy cơ ung thư phổi. Bà Lan hút thuốc lá. ∴ Bà Lan có nguy cơ ung thư phổi cao hơn."

c) "Nếu bị trúng tên thì bị thương. Người lính này bị thương. ∴ Người lính này bị trúng tên."

d) "Nếu học đều thì hiểu bài. Học sinh này không học đều. ∴ Học sinh này không hiểu bài."

e) "Nếu là bác sĩ thì phải học y khoa. Ông Minh không phải bác sĩ. ∴ Ông Minh chưa học y khoa."

**Bài 2 — Tìm phản ví dụ.**
Với mỗi ngụy biện trong Bài 1 (nếu có), hãy tự đặt ra một phản ví dụ (tức là phân công giá trị p = F, q = T hoặc mô tả tình huống thực tế làm mọi tiền đề đúng nhưng kết luận sai).

**Bài 3 — Bảng chân lý.**
Lập bảng chân lý cho lập luận `p → q, q ∴ p` (khẳng định hậu kiện) với đủ 4 dòng. Chỉ rõ dòng phản ví dụ và giải thích tại sao nó chứng minh lập luận không hợp lệ.

**Bài 4 — Phân biệt tinh tế.**
Hai lập luận sau khác nhau thế nào về mặt logic?
- Lập luận A: "Nếu mưa thì đường ướt. Đường ướt. ∴ Trời mưa."
- Lập luận B: "Nếu mưa thì đường ướt. Mưa. ∴ Đường ướt."
Lập luận nào hợp lệ? Giải thích.

**Bài 5 — Kết luận đúng, lập luận sai?**
Lập luận: "Nếu số tự nhiên chia hết cho 4 thì chia hết cho 2. Số 6 chia hết cho 2. ∴ Số 6 chia hết cho 4."
(a) Kết luận có đúng về mặt thực tế không?
(b) Lập luận có hợp lệ không?
(c) Giải thích mối quan hệ giữa tính đúng của kết luận và tính hợp lệ của lập luận.

---

## Lời giải chi tiết

**Bài 1.**

**a)** p = "có sóng thần", q = "nước biển rút đột ngột".
Dạng: `p → q, ¬q ∴ ¬p` — **Modus Tollens** — **hợp lệ**.
Giải thích: Biết rằng nếu sóng thần thì nước rút (p → q), và nước không rút (¬q), nên không có sóng thần (¬p). Đây là phủ định hậu kiện — hoàn toàn hợp lệ.

**b)** p = "hút thuốc lá", q = "tăng nguy cơ ung thư phổi".
Dạng: `p → q, p ∴ q` — **Modus Ponens** — **hợp lệ**.
Giải thích: Biết tiền kiện p đúng (Bà Lan hút thuốc), kết luận hậu kiện q là hoàn toàn hợp lệ.

**c)** p = "bị trúng tên", q = "bị thương".
Dạng: `p → q, q ∴ p` — **Khẳng định hậu kiện** — **không hợp lệ**.
Phản ví dụ: Người lính có thể bị thương do mảnh đạn pháo, lưỡi kiếm, hay té ngã — không nhất thiết do trúng tên.

**d)** p = "học đều", q = "hiểu bài".
Dạng: `p → q, ¬p ∴ ¬q` — **Phủ định tiền kiện** — **không hợp lệ**.
Phản ví dụ: Học sinh có thể tự học ở nhà, có gia sư, hay tài năng thiên phú — hiểu bài mà không cần học đều trên lớp.

**e)** p = "là bác sĩ", q = "đã học y khoa".
Dạng: `p → q, ¬p ∴ ¬q` — **Phủ định tiền kiện** — **không hợp lệ**.
Phản ví dụ: Ông Minh có thể học y khoa để làm nhà nghiên cứu, dược sĩ, hay chỉ vì sở thích — học y khoa mà không cần trở thành bác sĩ.

---

**Bài 2.**

**(c) Phản ví dụ cho câu c:** p = F (không bị trúng tên), q = T (bị thương) — người lính bị thương do mảnh đạn. `F → T` = T (tiền đề 1 đúng), q = T (tiền đề 2 đúng), nhưng kết luận p = F. Mọi tiền đề T, kết luận F — chứng minh không hợp lệ.

**(d) Phản ví dụ cho câu d:** p = F (không học đều), q = T (hiểu bài) — học sinh học theo YouTube và tự nghiên cứu, hiểu bài tốt dù không học đều trên lớp. `F → T` = T, ¬p = T, nhưng ¬q = F. Không hợp lệ.

**(e) Phản ví dụ cho câu e:** p = F (không là bác sĩ), q = T (đã học y khoa) — ông Minh học y khoa 6 năm nhưng chuyển sang nghiên cứu dược học. `F → T` = T, ¬p = T, nhưng ¬q = F. Không hợp lệ.

---

**Bài 3.**

Bảng chân lý `p → q, q ∴ p`:

| p | q | p → q (tiền đề 1) | q (tiền đề 2) | p (kết luận) |
|:---:|:---:|:---:|:---:|:---:|
| T | T | T | T | T |
| T | F | F | F | T |
| **F** | **T** | **T** | **T** | **F** ← phản ví dụ |
| F | F | T | F | F |

Dòng 3 (p = F, q = T):
- Tiền đề 1: `F → T` = T (vì câu điều kiện chỉ sai khi tiền kiện T và hậu kiện F).
- Tiền đề 2: q = T.
- Cả hai tiền đề đều T.
- Kết luận p = F.

Định nghĩa "hợp lệ" yêu cầu: không tồn tại dòng nào có mọi tiền đề T mà kết luận F. Dòng 3 vi phạm điều này → lập luận **không hợp lệ**.

---

**Bài 4.**

- **Lập luận A**: `p → q, q ∴ p` — dạng khẳng định hậu kiện — **không hợp lệ**.
  Biết hậu kiện (đường ướt) không cho phép kết luận tiền kiện (trời mưa).

- **Lập luận B**: `p → q, p ∴ q` — dạng modus ponens — **hợp lệ**.
  Biết tiền kiện (trời mưa) và câu điều kiện (mưa → ướt) → kết luận hậu kiện (ướt) hoàn toàn chính đáng.

Sự khác biệt then chốt: A biết q rồi suy p (ngược chiều), B biết p rồi suy q (đúng chiều mũi tên).

---

**Bài 5.**

**(a)** Số 6 chia hết cho 4? Kiểm tra: 6 ÷ 4 = 1 dư 2 → **Không chia hết**. Kết luận **sai** về mặt thực tế.

**(b)** Dạng lập luận: `p → q, q ∴ p` — khẳng định hậu kiện — **không hợp lệ**.
(p = "chia hết cho 4", q = "chia hết cho 2")

**(c)** Mối quan hệ:
- Lập luận **hợp lệ** + tiền đề **đúng** → kết luận **nhất thiết đúng** (soundness).
- Lập luận **không hợp lệ** → kết luận có thể đúng hoặc sai — không đảm bảo.
- Ở đây, lập luận không hợp lệ (khẳng định hậu kiện) *và* kết luận cũng sai — hai điều cùng xảy ra nhưng kết luận sai không phải vì lập luận không hợp lệ, mà vì p = F (6 không chia hết cho 4) nên tiền đề 2 không áp dụng được cách đó.
- Điều quan trọng: tính hợp lệ của lập luận và tính đúng của kết luận là hai câu hỏi **độc lập**. Lập luận không hợp lệ có thể có kết luận đúng hoặc sai.

---

## Code & Minh họa

- [visualization.html](./visualization.html) — Tương tác tập trung vào: (1) chọn dạng lập luận, xem bảng chân lý, nhận diện dòng phản ví dụ tô màu đỏ; (2) quiz nhận dạng ngụy biện từ ngôn ngữ tự nhiên; (3) so sánh trực quan modus ponens/tollens (hợp lệ) vs. hai ngụy biện.

---

## Bài tiếp theo

→ **[Lesson 03 — Ngụy biện đánh lạc hướng](../lesson-03-informal-fallacies-distraction/)**: các ngụy biện phi hình thức phổ biến nhất — ad hominem, straw man, red herring, appeal to authority — nơi cấu trúc lập luận có thể ổn nhưng nội dung hoặc ngữ cảnh gây lệch hướng suy nghĩ.

[⬆ Về Critical Thinking](../index.html) · [🏠 Trang chính Philosophy](../../index.html)
