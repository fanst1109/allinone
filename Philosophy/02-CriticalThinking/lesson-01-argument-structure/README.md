# Lesson 01 — Cấu trúc lập luận

> **Tầng 2 — Critical Thinking · Bài 1/8**

Bạn đọc một bài báo, nghe một cuộc tranh luận, hay xem một quảng cáo — và tự hỏi: **"Lý lẽ này có thuyết phục không? Tôi có nên tin vào đây không?"** Để trả lời được, bước đầu tiên không phải là đánh giá ngay, mà là **nhận ra đây có phải lập luận không, và nếu có — nó cấu trúc như thế nào?**

Bài này trang bị kỹ năng đó: mổ xẻ bất kỳ đoạn văn nào để tìm tiền đề, kết luận, và xem chúng liên kết với nhau theo kiểu gì.

## Mục tiêu học tập

Sau bài này, bạn có thể:

- Định nghĩa lập luận (argument) và phân biệt với mô tả, giải thích, và trần thuật.
- Nhận diện từ chỉ dẫn (indicator words) cho tiền đề và kết luận.
- Phân biệt ba kiểu sơ đồ lập luận: tiền đề độc lập (convergent), tiền đề liên kết (linked), lập luận chuỗi (serial).
- Tìm tiền đề ẩn (enthymeme) — mắt xích không nói ra nhưng cần thiết cho lập luận.
- Xác định vị trí kết luận trong đoạn văn (đầu, giữa, cuối).

## Kiến thức tiền đề

- [Tầng 1 — Formal Logic](../../01-FormalLogic/) — đặc biệt hữu ích khi đã học qua:
  - [Lesson 04 — Tính hợp lệ & suy diễn](../../01-FormalLogic/lesson-04-validity-inference/) — khái niệm "tiền đề → kết luận" trong logic hình thức là nền tảng cho bài này.
- Nếu chưa học Formal Logic, bạn vẫn có thể đọc bài này — chỉ cần hiểu mệnh đề là câu có thể đúng hoặc sai.

---

## 1. Lập luận là gì?

> 💡 **Trực giác.** Hãy tưởng tượng một thẩm phán. Công tố viên nói: "Bị cáo có mặt ở hiện trường lúc 10 giờ — đó là tội phạm." Đó là lập luận: có bằng chứng (tiền đề) và có kết luận được rút ra. Nhưng nhân chứng nói: "Hôm đó trời mưa to lắm, đường rất trơn." — đó chỉ là mô tả, không kết luận gì. Phân biệt được hai loại này là kỹ năng phân tích đầu tiên.

**Lập luận (argument)** là một tập hợp các mệnh đề trong đó:
- Một hoặc nhiều mệnh đề được gọi là **tiền đề (premise)** — đóng vai trò bằng chứng, lý do, nền tảng.
- Đúng một mệnh đề được gọi là **kết luận (conclusion)** — điều được khẳng định dựa trên tiền đề.

**Tiền đề *ủng hộ* kết luận** — đó là điều làm cho một tập mệnh đề thành lập luận, chứ không phải chỉ là danh sách câu rời rạc.

**Ví dụ lập luận đơn giản (với 2 tiền đề):**

```
[Tiền đề 1] Mọi người đều phải chết.
[Tiền đề 2] Socrates là người.
[Kết luận]  Vậy, Socrates phải chết.
```

Hai tiền đề cùng nhau ủng hộ kết luận. Thiếu một trong hai, kết luận không theo được.

**Ví dụ lập luận 1 tiền đề:**

```
[Tiền đề]  Trời đang mưa.
[Kết luận] Vậy đường sẽ ướt.
```

Một tiền đề là đủ để rút kết luận (dù lập luận này bỏ qua nhiều giả định ngầm — xem mục 4).

**Ví dụ lập luận 3 tiền đề:**

```
[T1] Mọi sinh vật có tế bào đều là sinh vật sống.
[T2] Vi khuẩn có tế bào.
[T3] Vi khuẩn không phải thực vật hay động vật.
[KL] Do đó, vi khuẩn là sinh vật sống thuộc nhóm riêng.
```

**Ví dụ lập luận kết luận đứng đầu:**

```
[KL]  Học triết học có ích trong cuộc sống thực. [← kết luận, nhưng nằm ở đầu]
[T1]  Vì triết học rèn luyện khả năng lập luận mạch lạc.
[T2]  Và khả năng lập luận mạch lạc giúp ra quyết định tốt hơn.
```

> ⚠ **Lỗi thường gặp: nghĩ kết luận luôn nằm ở cuối.** Không phải vậy. Kết luận có thể đứng đầu, giữa, hoặc cuối đoạn. Từ chỉ dẫn (xem mục 2) mới là chìa khóa nhận diện, không phải vị trí.

> ❓ **Câu hỏi tự nhiên của người đọc.**
> - *"Lập luận có cần phải đúng không?"* — Không. Một lập luận có thể có tiền đề sai hoặc kết luận không theo đúng từ tiền đề — đó vẫn là lập luận, chỉ là lập luận *kém*. Bài tiếp theo (Lesson 02) sẽ phân biệt lập luận *hợp lệ* (valid) và *không hợp lệ*.
> - *"Lập luận có phải luôn bằng lời nói không?"* — Không. Lập luận có thể được trình bày qua hình ảnh (một poster "Hút thuốc gây ung thư — hãy bỏ thuốc"), qua số liệu, hay qua hành động. Trong bài này ta tập trung vào lập luận bằng ngôn ngữ để rèn kỹ năng nhận diện cấu trúc.
> - *"Một lập luận có thể có nhiều kết luận không?"* — Theo định nghĩa chuẩn: không. Một lập luận chỉ có một kết luận chính (main conclusion). Nhưng trong lập luận chuỗi (mục 3), có *kết luận phụ* (sub-conclusion) đóng vai tiền đề cho kết luận chính.

> 🔁 **Dừng lại tự kiểm tra.**
> Đoạn nào dưới đây là lập luận?
> 1. "Hôm nay trời nắng. Tôi mặc áo trắng. Đường phố đông người."
> 2. "Bạn nên mang ô vì dự báo thời tiết nói trời sẽ mưa chiều nay."
> 3. "Chiếc xe này màu đỏ, có 4 bánh, và chạy bằng xăng."
>
> <details><summary>Đáp án</summary>
>
> 1. **Không phải lập luận.** Đây là tập hợp ba mô tả rời rạc — không có câu nào ủng hộ câu nào.
> 2. **Là lập luận.** Tiền đề: "dự báo thời tiết nói trời sẽ mưa chiều nay". Kết luận: "Bạn nên mang ô". Tiền đề ủng hộ kết luận.
> 3. **Không phải lập luận.** Đây là mô tả (description) — liệt kê đặc điểm của xe, không kết luận gì từ những đặc điểm đó.
> </details>

> 📝 **Tóm tắt mục 1.**
> - Lập luận = tiền đề (premise) ủng hộ kết luận (conclusion).
> - Có thể có 1 hay nhiều tiền đề; luôn có đúng 1 kết luận chính.
> - Kết luận có thể đứng đầu, giữa, hoặc cuối — không cố định.
> - Lập luận không cần phải đúng để là lập luận — đánh giá chất lượng là bước sau.

---

## 2. Từ chỉ dẫn (Indicator Words)

> 💡 **Trực giác.** Ngôn ngữ có "biển báo" giúp người đọc nhận ra vai trò của từng câu. Khi thấy "vì" hay "bởi vì" — đó thường là biển báo "câu này là lý do". Khi thấy "vậy" hay "do đó" — đó là biển báo "câu này là kết quả được rút ra". Nhận ra các biển báo này giúp bạn mổ xẻ lập luận mà không cần đọc đi đọc lại nhiều lần.

### 2.1 Từ chỉ dẫn tiền đề

Các từ/cụm từ thường đứng trước hoặc kèm theo tiền đề:

| Từ chỉ dẫn | Ví dụ sử dụng |
|---|---|
| **vì** | "Bạn nên nghỉ ngơi, **vì** bạn trông rất mệt." |
| **bởi vì** | "Dự án thành công **bởi vì** đội nhóm làm việc ăn ý." |
| **do** | "Cây chết **do** thiếu nước." |
| **căn cứ vào** | "**Căn cứ vào** dữ liệu khảo sát, ta kết luận..." |
| **xét rằng** | "**Xét rằng** giá cả tăng cao, tiêu dùng sẽ giảm." |
| **được biết rằng** | "**Được biết rằng** virus lây qua không khí, ta nên đeo khẩu trang." |
| **lý do là** | "**Lý do là** thuốc này có tác dụng phụ nghiêm trọng." |

### 2.2 Từ chỉ dẫn kết luận

Các từ/cụm từ thường đứng trước hoặc kèm theo kết luận:

| Từ chỉ dẫn | Ví dụ sử dụng |
|---|---|
| **vậy** | "Giá xăng tăng; **vậy** chi phí vận chuyển sẽ tăng theo." |
| **do đó** | "Nhiệt độ tăng; **do đó** băng tan nhanh hơn." |
| **suy ra** | "Tất cả kim loại đều dẫn điện; thanh này là kim loại; **suy ra** thanh này dẫn điện." |
| **nên** | "Trời sắp mưa, **nên** bạn hãy mang ô." |
| **vì thế** | "Anh ấy không ngủ đủ giấc; **vì thế** anh ấy mất tập trung." |
| **kết luận là** | "Từ những bằng chứng trên, **kết luận là** bị cáo vô tội." |
| **điều này cho thấy** | "Doanh thu tăng 30%; **điều này cho thấy** chiến lược marketing hiệu quả." |

> ⚠ **Lỗi thường gặp 1: "vì" không phải lúc nào cũng chỉ tiền đề.** Đôi khi "vì" đứng trong câu giải thích nguyên nhân của một sự thật đã xảy ra, chứ không phải trong lập luận:
> - **Lập luận**: "Bạn nên mang ô *vì* trời sẽ mưa." — "trời sẽ mưa" là tiền đề ủng hộ khuyến nghị.
> - **Giải thích**: "Cây bị chết *vì* thiếu nước." — câu này giải thích nguyên nhân của sự việc đã xảy ra ("cây chết" là sự thật), không phải lập luận.
> Xem thêm mục 5 để phân biệt lập luận và giải thích.

> ⚠ **Lỗi thường gặp 2: thiếu từ chỉ dẫn không có nghĩa là không có lập luận.** Nhiều lập luận trong tiếng Việt hàng ngày bỏ qua từ chỉ dẫn:
> "Trời sắp mưa. Bạn hãy mang ô." — không có "vì" hay "vậy", nhưng câu 1 rõ ràng là tiền đề cho câu 2.

> 🔁 **Dừng lại tự kiểm tra.**
> Trong mỗi đoạn sau, tìm từ chỉ dẫn và xác định câu nào là tiền đề, câu nào là kết luận:
> 1. "Bởi vì chó là động vật có vú, và mọi động vật có vú đều nuôi con bằng sữa, suy ra chó nuôi con bằng sữa."
> 2. "Nhiệt độ Trái Đất đang tăng do lượng CO₂ trong khí quyển tăng. Vì thế, ta cần giảm sử dụng nhiên liệu hóa thạch."
>
> <details><summary>Đáp án</summary>
>
> 1. Từ chỉ dẫn tiền đề: "bởi vì". Từ chỉ dẫn kết luận: "suy ra".
>    - Tiền đề 1: "chó là động vật có vú"
>    - Tiền đề 2: "mọi động vật có vú đều nuôi con bằng sữa"
>    - Kết luận: "chó nuôi con bằng sữa"
>
> 2. Từ chỉ dẫn nguyên nhân (trong câu 1): "do". Từ chỉ dẫn kết luận: "vì thế".
>    - Câu 1 là tiền đề: "Nhiệt độ Trái Đất đang tăng [do lượng CO₂ tăng — giải thích kèm theo]"
>    - Kết luận: "ta cần giảm sử dụng nhiên liệu hóa thạch"
>    Lưu ý: "do lượng CO₂ tăng" trong câu 1 là giải thích nguyên nhân, không phải tiền đề riêng biệt.
> </details>

> 📝 **Tóm tắt mục 2.**
> - Từ chỉ tiền đề: "vì", "bởi vì", "do", "căn cứ", "xét rằng", "lý do là"...
> - Từ chỉ kết luận: "vậy", "do đó", "suy ra", "nên", "vì thế", "kết luận là"...
> - "Vì" không phải lúc nào cũng chỉ tiền đề — phải xem ngữ cảnh.
> - Thiếu từ chỉ dẫn không có nghĩa là không có lập luận.

---

## 3. Sơ đồ lập luận

> 💡 **Trực giác.** Khi nhiều tiền đề ủng hộ một kết luận, chúng có thể làm điều đó theo cách khác nhau. Giống như nhiều cột trụ đỡ một mái nhà: chúng có thể đứng độc lập (mỗi cột tự giữ một phần mái), hoặc phải ghép lại thành khung (mất một thanh là cả khung sụp). Phân biệt kiểu liên kết quyết định xem lập luận "mạnh" đến mức nào khi ta phản bác một tiền đề.

Ba kiểu sơ đồ lập luận cơ bản:

### 3.1 Tiền đề độc lập (Convergent argument)

Mỗi tiền đề **tự nó** đã ủng hộ kết luận — không cần tiền đề kia để làm điều đó. Loại bỏ một tiền đề, các tiền đề còn lại vẫn ủng hộ kết luận (dù ở mức độ thấp hơn).

```
T1 ──────┐
         ├──→ KL
T2 ──────┘
(Mỗi T tự ủng hộ KL)
```

**Ví dụ:**
```
[T1] Thuốc lá gây ung thư phổi.
[T2] Thuốc lá làm ố vàng răng.
[T3] Thuốc lá tốn tiền.
[KL] Vậy bạn nên bỏ thuốc lá.
```

Ngay cả khi phản bác T2 ("Tôi đánh răng kỹ nên răng không vàng"), T1 và T3 vẫn đứng vững và ủng hộ kết luận.

### 3.2 Tiền đề liên kết (Linked argument)

Các tiền đề **phải kết hợp với nhau** để ủng hộ kết luận. Tách riêng từng tiền đề, chúng không đủ sức ủng hộ kết luận một mình.

```
T1 ──┐
     ├──→ KL
T2 ──┘
(Cần cả T1 lẫn T2 mới ra được KL)
```

**Ví dụ:**
```
[T1] Mọi người đều phải chết.
[T2] Socrates là người.
[KL] Vậy Socrates phải chết.
```

Chỉ có T1 ("Mọi người đều phải chết") thì không rút ra được kết luận về Socrates. Chỉ có T2 ("Socrates là người") cũng không đủ. Cần cả hai.

**Ví dụ nữa:**
```
[T1] Nếu trời mưa thì đường ướt.
[T2] Trời đang mưa.
[KL] Vậy đường đang ướt.
```

T1 là quy tắc, T2 là điều kiện — cần cả hai để ra kết luận.

### 3.3 Lập luận chuỗi (Serial argument)

Có **kết luận phụ (sub-conclusion)** đóng vai tiền đề cho kết luận chính. Lập luận chia thành nhiều tầng.

```
T1 → KL_phụ → KL_chính
          ↑
         (cũng là tiền đề trung gian)
```

**Ví dụ:**
```
[T1]      Carbon dioxide hấp thụ nhiệt từ Mặt Trời.
[KL_phụ] Vì thế, lượng CO₂ tăng sẽ làm Trái Đất ấm hơn.    ← đây là kết luận phụ
                                                                 đồng thời là tiền đề cho...
[KL]     Do đó, đốt than đá nhiều sẽ gây biến đổi khí hậu.  ← kết luận chính
```

**Ví dụ 2 (chuỗi dài hơn):**
```
[T1]        Luyện tập toán thường xuyên cải thiện khả năng lập luận logic.
[KL_phụ_1] Nên, học sinh luyện toán sẽ có khả năng lập luận tốt hơn.
[KL_phụ_2] Khả năng lập luận tốt hơn giúp học tốt các môn học khác.
[KL]        Do đó, luyện toán gián tiếp giúp cải thiện kết quả học tập nói chung.
```

> ❓ **Câu hỏi tự nhiên của người đọc.**
> - *"Làm sao phân biệt tiền đề độc lập và tiền đề liên kết?"* — Thử kiểm tra: nếu loại bỏ một tiền đề, kết luận có còn được ủng hộ (dù yếu hơn) không? Nếu có → tiền đề độc lập. Nếu kết luận hoàn toàn không theo được nữa → tiền đề liên kết.
> - *"Một lập luận có thể kết hợp cả hai kiểu không?"* — Có. Ví dụ: T1+T2 là linked (cần nhau để rút ra KL_phụ), rồi KL_phụ + T3 (independent) cùng ủng hộ KL_chính.
> - *"Vì sao phân biệt ba kiểu này quan trọng?"* — Vì nó quyết định chiến lược phản biện. Với tiền đề độc lập: phải phản bác từng tiền đề một, vì mỗi cái tự đứng vững. Với tiền đề liên kết: chỉ cần phản bác một tiền đề là đủ làm sụp cả lập luận.

> 🔁 **Dừng lại tự kiểm tra.**
> Phân loại sơ đồ lập luận:
> 1. "Bạn nên học thêm tiếng Anh vì tiếng Anh là ngôn ngữ quốc tế, và vì công ty bạn muốn vào yêu cầu tiếng Anh."
> 2. "Nếu bạn thức khuya thì bạn sẽ mệt sáng hôm sau. Bạn đang thức khuya. Vậy sáng mai bạn sẽ mệt."
>
> <details><summary>Đáp án</summary>
>
> 1. **Tiền đề độc lập (convergent).** T1: "tiếng Anh là ngôn ngữ quốc tế" tự mình đã là lý do nên học. T2: "công ty bạn muốn vào yêu cầu tiếng Anh" cũng tự mình là lý do. Bác bỏ T1 không ảnh hưởng đến sức mạnh của T2.
>
> 2. **Tiền đề liên kết (linked).** T1: "Nếu thức khuya thì mệt sáng hôm sau" (quy tắc) cần T2: "Bạn đang thức khuya" (điều kiện) để rút ra kết luận. Thiếu T2, T1 không nói gì về bạn cụ thể.
> </details>

> 📝 **Tóm tắt mục 3.**
> - **Convergent (độc lập)**: mỗi tiền đề tự ủng hộ kết luận. Phản bác một, các tiền đề khác vẫn đứng.
> - **Linked (liên kết)**: các tiền đề cần nhau để rút kết luận. Phản bác một là đủ làm sụp lập luận.
> - **Serial (chuỗi)**: có kết luận phụ làm tiền đề trung gian cho kết luận chính.

---

## 4. Tiền đề ẩn (Enthymeme)

> 💡 **Trực giác.** Trong giao tiếp hàng ngày, ta thường bỏ qua những điều "ai cũng biết". Khi bạn nói "Anh ấy là người Việt Nam, nên anh ấy nói được tiếng Việt" — bạn bỏ qua tiền đề hiển nhiên "Mọi người Việt Nam đều nói được tiếng Việt". Đây là tiền đề ẩn. Vấn đề xảy ra khi tiền đề ẩn đó *không thực sự hiển nhiên* hoặc *sai* — lập luận lúc này nguy hiểm vì người nghe không nhận ra bước nhảy logic.

**Tiền đề ẩn (hidden premise / implicit premise)**, hay còn gọi là **enthymeme**, là tiền đề không được nói ra trong lập luận nhưng cần thiết để lập luận "chạy" được — tức là để kết luận theo được từ các tiền đề còn lại.

**Ví dụ 1 — tiền đề ẩn hiển nhiên và đúng:**
```
Đoạn văn: "Socrates là người, nên Socrates phải chết."

Tiền đề nói ra:  Socrates là người.
Tiền đề ẩn:     [Mọi người đều phải chết.] ← không nói ra
Kết luận:       Socrates phải chết.
```
Tiền đề ẩn ở đây là một chân lý phổ quát quen thuộc — bỏ qua nó không gây nguy hiểm.

**Ví dụ 2 — tiền đề ẩn cần kiểm tra:**
```
Đoạn văn: "Anh ấy mặc đồ đắt tiền, chắc anh ấy giàu."

Tiền đề nói ra:  Anh ấy mặc đồ đắt tiền.
Tiền đề ẩn:     [Người mặc đồ đắt tiền là người giàu.] ← giả định này có đúng không?
Kết luận:       Anh ấy giàu.
```
Tiền đề ẩn ở đây **đáng nghi ngờ**: người có thể mua đồ đắt trả góp, đồ là hàng giả, hay được tặng. Khi tìm ra tiền đề ẩn, bạn biết chỗ nào cần phản biện.

**Ví dụ 3 — tiền đề ẩn sai:**
```
Đoạn văn: "Dân số Mỹ đã dùng sản phẩm này nhiều năm, vậy nó an toàn."

Tiền đề nói ra:  Dân số Mỹ đã dùng sản phẩm này nhiều năm.
Tiền đề ẩn:     [Bất cứ thứ gì được dùng rộng rãi lâu năm đều an toàn.] ← SẮT không đúng!
Kết luận:       Sản phẩm này an toàn.
```
Phản ví dụ: thuốc lá được dùng hàng thế kỷ trước khi biết nó gây ung thư. Tiền đề ẩn sai → lập luận sụp đổ.

**Ví dụ 4 — enthymeme trong quảng cáo:**
```
Quảng cáo: "9/10 nha sĩ khuyên dùng kem đánh răng X. Hãy dùng kem X!"

Tiền đề nói ra:  9/10 nha sĩ khuyên dùng kem X.
Tiền đề ẩn 1:  [Nên làm theo khuyến nghị của đa số nha sĩ.]
Tiền đề ẩn 2:  [Bạn muốn sản phẩm tốt cho răng.]
Kết luận:       Hãy dùng kem X.
```
Nhiều tiền đề ẩn kết hợp — quảng cáo ẩn hết để câu ngắn gọn, nhưng mỗi tiền đề ẩn đều cần kiểm tra.

**Cách tìm tiền đề ẩn:**

1. Xác định kết luận.
2. Xác định tiền đề đã nói ra.
3. Hỏi: "Tiền đề nào cần thêm để kết luận *chắc chắn theo* từ tiền đề đã có?"
4. Đặt câu hỏi: "Tiền đề ẩn đó có đúng không?"

> ⚠ **Lỗi thường gặp: thêm quá nhiều tiền đề ẩn.** Nguyên tắc "từ thiện" (principle of charity) trong phân tích lập luận: chỉ thêm tiền đề ẩn **tối thiểu cần thiết** để lập luận có nghĩa, và chọn **phiên bản hợp lý nhất**. Đừng thêm tiền đề ẩn vô lý chỉ để làm lập luận trông yếu hơn.

> ❓ **Câu hỏi tự nhiên của người đọc.**
> - *"Khi nào bỏ tiền đề ẩn là hợp lý, khi nào là nguy hiểm?"* — Hợp lý: khi tiền đề ẩn là chân lý phổ quát mà mọi người đồng ý (ví dụ "mọi người đều chết"). Nguy hiểm: khi tiền đề ẩn là giả định tranh cãi được, hoặc khi người nghe có thể bị dắt mũi mà không nhận ra.
> - *"Enthymeme có phải là ngụy biện không?"* — Không nhất thiết. Enthymeme là trình bày rút gọn, không sai về bản chất. Ngụy biện (fallacy) là lỗi trong cấu trúc suy luận. Enthymeme *trở thành* vấn đề khi tiền đề ẩn sai mà người nghe không nhận ra.

> 🔁 **Dừng lại tự kiểm tra.**
> Tìm tiền đề ẩn trong lập luận sau:
> "Bạn học CNTT, vậy bạn chắc biết lập trình."
>
> <details><summary>Đáp án</summary>
>
> - Tiền đề nói ra: "Bạn học CNTT."
> - Tiền đề ẩn: "Mọi người học CNTT đều biết lập trình."
> - Kết luận: "Bạn biết lập trình."
>
> Tiền đề ẩn này có đáng ngờ không? Có — sinh viên CNTT có thể tập trung vào mạng, bảo mật, hay quản trị hệ thống mà không code nhiều. Tìm ra tiền đề ẩn cho phép bạn phản biện đúng chỗ.
> </details>

> 📝 **Tóm tắt mục 4.**
> - Enthymeme = lập luận có tiền đề ẩn không nói ra.
> - Phổ biến trong giao tiếp hàng ngày, quảng cáo, và chính trị.
> - Để phân tích: tìm tiền đề ẩn, rồi hỏi "nó có đúng không?"
> - Nguyên tắc từ thiện: thêm tiền đề ẩn tối thiểu và hợp lý nhất.

---

## 5. Lập luận vs. Giải thích — Phân biệt quan trọng

> 💡 **Trực giác.** Giải thích và lập luận trông rất giống nhau — cả hai đều dùng "vì". Nhưng mục đích hoàn toàn khác. Lập luận cố gắng **thuyết phục bạn rằng điều gì đó đúng**. Giải thích **nêu nguyên nhân của điều gì đó mà cả hai bên đã đồng ý là đúng**. Nhầm lẫn hai loại này dẫn đến đánh giá sai lập luận.

**Lập luận (argument)**: cố thuyết phục người nghe chấp nhận kết luận là đúng.
- Kết luận là điều *chưa được thừa nhận* — cần được chứng minh.
- Tiền đề cung cấp *bằng chứng* cho kết luận.

**Giải thích (explanation)**: nêu nguyên nhân hoặc cơ chế của điều gì đó đã được coi là đúng.
- "Sự kiện" là điều *đã được thừa nhận* — không cần chứng minh.
- Giải thích cung cấp *nguyên nhân/cơ chế*, không phải bằng chứng.

**So sánh trực tiếp — cùng một đoạn văn có thể là lập luận hoặc giải thích tùy ngữ cảnh:**

> *"Kính vỡ vì bị rơi mạnh."*

- **Nếu cả hai bên đã biết kính vỡ**: đây là **giải thích** — nêu nguyên nhân kính vỡ.
- **Nếu người nghe chưa biết kính vỡ hay còn**: đây có thể là **lập luận** — "kính bị rơi mạnh (tiền đề)" → "kính vỡ (kết luận)".

**Ví dụ 1 — Giải thích (không phải lập luận):**

```
"Khủng long tuyệt chủng vì một tiểu hành tinh khổng lồ va vào Trái Đất 66 triệu năm trước,
gây bụi che khuất Mặt Trời và làm sụp đổ chuỗi thức ăn."
```

- "Khủng long tuyệt chủng" — sự thật đã được thừa nhận.
- Phần "vì..." — giải thích nguyên nhân, không phải bằng chứng để chứng minh khủng long tuyệt chủng.

**Ví dụ 2 — Lập luận (không phải giải thích):**

```
"Công ty này đang gặp khó khăn tài chính, vì doanh thu quý 3 giảm 40%
và các khoản nợ ngắn hạn đã vượt quá tiền mặt hiện có."
```

- "Công ty gặp khó khăn tài chính" — kết luận chưa được thừa nhận, cần chứng minh.
- "Doanh thu giảm 40%" và "nợ vượt tiền mặt" — tiền đề chứng minh kết luận.

**Ví dụ 3 — Cách kiểm tra nhanh:**

Đặt câu hỏi: *"Sự kiện trong câu này có phải điều ta đã biết và thừa nhận là đúng chưa?"*
- Nếu **có** → đoạn văn giải thích nguyên nhân → đó là **giải thích**.
- Nếu **chưa** → đoạn văn cố thuyết phục → đó là **lập luận**.

> ⚠ **Lỗi thường gặp: đánh giá giải thích như lập luận.** Nếu ai đó nói "Trời mưa vì áp thấp nhiệt đới đổ bộ" — đây là giải thích khoa học. Đòi hỏi người đó "chứng minh trời mưa" là nhầm lẫn — trời mưa là sự thật đã quan sát được, không cần chứng minh.

> 🔁 **Dừng lại tự kiểm tra.**
> Phân biệt lập luận hay giải thích:
> 1. "Anh ấy không đến cuộc họp vì bị ốm."
> 2. "Anh ấy đang bị ốm, vì vậy anh ấy sẽ không đến cuộc họp được."
>
> <details><summary>Đáp án</summary>
>
> 1. **Giải thích.** "Anh ấy không đến cuộc họp" — sự thật đã xảy ra và được thừa nhận. "Vì bị ốm" — nêu nguyên nhân.
>
> 2. **Lập luận.** "Anh ấy đang bị ốm" — tiền đề. "Anh ấy sẽ không đến cuộc họp được" — kết luận về tương lai chưa xảy ra, cần bằng chứng. "Vì vậy" là từ chỉ dẫn kết luận.
> </details>

> 📝 **Tóm tắt mục 5.**
> - **Lập luận**: thuyết phục người nghe rằng kết luận (chưa được thừa nhận) là đúng.
> - **Giải thích**: nêu nguyên nhân/cơ chế của điều đã được thừa nhận là đúng.
> - Cùng một câu có thể là lập luận hoặc giải thích tùy ngữ cảnh.
> - Kiểm tra: "Sự kiện này đã được cả hai bên thừa nhận chưa?" → Có = giải thích; Chưa = lập luận.

---

## Bài tập

**Bài 1.** Xác định tiền đề và kết luận trong các đoạn sau. Chỉ ra từ chỉ dẫn (nếu có):

a) "Vì tốc độ ánh sáng là giới hạn tối đa của vũ trụ, và tàu vũ trụ hiện tại không thể đạt tốc độ ánh sáng, suy ra ta không thể du hành đến các ngôi sao lân cận trong vài năm."

b) "Chính phủ cần tăng đầu tư vào giáo dục công. Căn cứ vào nghiên cứu của OECD, những quốc gia đầu tư mạnh vào giáo dục có GDP bình quân đầu người cao hơn đáng kể sau 20 năm."

c) "Cô ấy vắng mặt trong 5 buổi học liên tiếp và không nộp bài tập nào. Do đó, điểm tổng kết của cô ấy sẽ thấp."

**Bài 2.** Phân loại sơ đồ lập luận (convergent, linked, hay serial):

a) "Bạn nên mua bảo hiểm sức khỏe vì chi phí y tế ngày càng cao, và vì không ai có thể đoán trước khi nào mình bị bệnh."

b) "Nếu A thì B. A đang xảy ra. Vậy B đang xảy ra."

c) "Thực phẩm chế biến sẵn chứa nhiều muối và đường. Muối và đường nhiều gây tăng huyết áp và tiểu đường. Tăng huyết áp và tiểu đường làm tăng nguy cơ đột quỵ. Do đó, ăn nhiều thực phẩm chế biến sẵn làm tăng nguy cơ đột quỵ."

**Bài 3.** Tìm tiền đề ẩn và đánh giá xem nó có đúng không:

a) "Anh ấy có bằng tiến sĩ, nên lý thuyết anh ấy đưa ra chắc chắn đúng."

b) "Bữa ăn này rất đắt, vậy nó chắc chắn ngon."

c) "Hàng triệu người tin vào điều này, vậy nó phải đúng."

**Bài 4.** Phân biệt lập luận và giải thích:

a) "Sản phẩm này bán chạy vì có chất lượng tốt và giá hợp lý."

b) "Sản phẩm này có chất lượng tốt và giá hợp lý, vì vậy nó sẽ bán chạy."

c) "Kim loại dẫn điện vì các electron tự do trong cấu trúc tinh thể của nó di chuyển khi có điện trường."

**Bài 5.** Mổ xẻ lập luận sau: tìm tất cả tiền đề (kể cả ẩn), kết luận, loại sơ đồ, và cho biết tiền đề ẩn có đáng ngờ không:

> *"Mọi quyết định của hội đồng quản trị đều phải tuân theo pháp luật. Quyết định sa thải nhân viên mà không có lý do hợp lệ vi phạm Bộ luật Lao động. Vì vậy, hội đồng quản trị không thể sa thải nhân viên mà không có lý do hợp lệ."*

---

## Lời giải chi tiết

**Bài 1a.**

- Từ chỉ dẫn tiền đề: "vì" (x2). Từ chỉ dẫn kết luận: "suy ra".
- **Tiền đề 1**: "Tốc độ ánh sáng là giới hạn tối đa của vũ trụ."
- **Tiền đề 2**: "Tàu vũ trụ hiện tại không thể đạt tốc độ ánh sáng."
- **Kết luận**: "Ta không thể du hành đến các ngôi sao lân cận trong vài năm."
- Đây là lập luận **linked**: cần cả hai tiền đề. T1 cho biết giới hạn tốc độ, T2 cho biết tàu vũ trụ bị giới hạn đó ràng buộc — thiếu một, kết luận không theo được.

**Bài 1b.**

- Từ chỉ dẫn tiền đề: "căn cứ vào". Không có từ chỉ dẫn kết luận tường minh (kết luận đứng đầu).
- **Kết luận** (câu 1 — đứng đầu): "Chính phủ cần tăng đầu tư vào giáo dục công."
- **Tiền đề**: "Nghiên cứu OECD cho thấy các quốc gia đầu tư mạnh vào giáo dục có GDP bình quân đầu người cao hơn đáng kể sau 20 năm."
- Lưu ý: kết luận đứng đầu — đây là kiểu phổ biến trong văn viết chính thức (kết luận → lý do).

**Bài 1c.**

- Từ chỉ dẫn kết luận: "do đó". Không có từ chỉ dẫn tiền đề tường minh.
- **Tiền đề 1**: "Cô ấy vắng mặt trong 5 buổi học liên tiếp."
- **Tiền đề 2**: "Cô ấy không nộp bài tập nào."
- **Kết luận**: "Điểm tổng kết của cô ấy sẽ thấp."
- Tiền đề **độc lập (convergent)**: T1 và T2 mỗi cái độc lập đã là lý do để kết luận điểm thấp. Cả hai cùng tăng sức mạnh lập luận.

---

**Bài 2a.** **Convergent (tiền đề độc lập).** "Chi phí y tế ngày càng cao" là một lý do riêng để mua bảo hiểm. "Không ai đoán trước được khi nào bị bệnh" là một lý do riêng khác. Bác bỏ một lý do, lý do kia vẫn đứng vững.

**Bài 2b.** **Linked (tiền đề liên kết).** Đây là modus ponens: T1 = quy tắc "Nếu A thì B", T2 = điều kiện "A". Thiếu T2, ta không biết A xảy ra; thiếu T1, ta không biết A dẫn đến B. Cần cả hai.

**Bài 2c.** **Serial (lập luận chuỗi):**
- T1: Thực phẩm chế biến sẵn chứa nhiều muối và đường.
- KL_phụ_1: Dẫn đến tăng huyết áp và tiểu đường. (từ T1 + tiền đề ẩn "muối/đường nhiều gây tăng huyết áp/tiểu đường")
- KL_phụ_2: Dẫn đến tăng nguy cơ đột quỵ. (từ KL_phụ_1 + tiền đề ẩn "tăng huyết áp/tiểu đường gây đột quỵ")
- KL_chính: Ăn nhiều thực phẩm chế biến sẵn làm tăng nguy cơ đột quỵ.

---

**Bài 3a.**

- Tiền đề nói ra: "Anh ấy có bằng tiến sĩ."
- Tiền đề ẩn: "Người có bằng tiến sĩ luôn đưa ra lý thuyết đúng."
- Kết luận: "Lý thuyết anh ấy đưa ra chắc chắn đúng."
- **Đánh giá**: Tiền đề ẩn **sai**. Bằng tiến sĩ chứng minh năng lực nghiên cứu trong lĩnh vực cụ thể, không bảo đảm mọi phát biểu đều đúng. Đây là ngụy biện *argumentum ad verecundiam* (kêu gọi thẩm quyền) — sẽ học kỹ ở Lesson 03.

**Bài 3b.**

- Tiền đề nói ra: "Bữa ăn này rất đắt."
- Tiền đề ẩn: "Đồ ăn đắt tiền thì ngon."
- Kết luận: "Bữa ăn này chắc chắn ngon."
- **Đánh giá**: Tiền đề ẩn **đáng ngờ**. Giá cả phụ thuộc nhiều yếu tố: địa điểm, thương hiệu, phục vụ, nguyên liệu nhập khẩu... Có thể đắt mà không ngon, và ngược lại.

**Bài 3c.**

- Tiền đề nói ra: "Hàng triệu người tin vào điều này."
- Tiền đề ẩn: "Điều gì được nhiều người tin là đúng."
- Kết luận: "Điều này phải đúng."
- **Đánh giá**: Tiền đề ẩn **sai**. Đây là ngụy biện *argumentum ad populum* (kêu gọi số đông). Lịch sử đầy ví dụ: hàng triệu người từng tin Trái Đất phẳng, hay rằng chảy máu chữa bệnh được.

---

**Bài 4a.**

"Sản phẩm này bán chạy vì có chất lượng tốt và giá hợp lý."

- "Sản phẩm này bán chạy" — sự thật đã xảy ra và được thừa nhận (giả sử người nói và người nghe đều biết sản phẩm bán chạy).
- "Vì có chất lượng tốt và giá hợp lý" — nêu nguyên nhân.
- → **Giải thích.**

**Bài 4b.**

"Sản phẩm này có chất lượng tốt và giá hợp lý, vì vậy nó sẽ bán chạy."

- "Sản phẩm này có chất lượng tốt và giá hợp lý" — tiền đề (sự thật hiện tại).
- "Nó sẽ bán chạy" — kết luận về tương lai, chưa xảy ra, cần bằng chứng.
- "Vì vậy" — từ chỉ dẫn kết luận.
- → **Lập luận.**

**Bài 4c.**

"Kim loại dẫn điện vì các electron tự do trong cấu trúc tinh thể của nó di chuyển khi có điện trường."

- "Kim loại dẫn điện" — sự thật khoa học đã được thừa nhận.
- "Vì các electron tự do..." — giải thích cơ chế vật lý.
- → **Giải thích** (giải thích cơ chế, không phải lập luận để chứng minh kim loại dẫn điện).

---

**Bài 5.**

*Đoạn văn:* "Mọi quyết định của hội đồng quản trị đều phải tuân theo pháp luật. Quyết định sa thải nhân viên mà không có lý do hợp lệ vi phạm Bộ luật Lao động. Vì vậy, hội đồng quản trị không thể sa thải nhân viên mà không có lý do hợp lệ."

**Tiền đề nói ra:**
- T1: "Mọi quyết định của hội đồng quản trị đều phải tuân theo pháp luật."
- T2: "Quyết định sa thải nhân viên mà không có lý do hợp lệ vi phạm Bộ luật Lao động."

**Tiền đề ẩn:**
- T_ẩn: "[Bộ luật Lao động là pháp luật mà hội đồng quản trị phải tuân theo.]"

**Kết luận:** "Hội đồng quản trị không thể sa thải nhân viên mà không có lý do hợp lệ."

**Loại sơ đồ:** Linked (tiền đề liên kết). T1 + T2 + T_ẩn phải kết hợp nhau. Thiếu T_ẩn, ta không biết Bộ luật Lao động có ràng buộc hội đồng quản trị không.

**Đánh giá tiền đề ẩn:** T_ẩn hợp lý và đúng — Bộ luật Lao động là luật quốc gia, ràng buộc mọi tổ chức hoạt động trong lãnh thổ. Tiền đề ẩn không đáng ngờ trong ngữ cảnh này.

**Lập luận tổng thể:** Hợp lệ và vững chắc — cả ba tiền đề đều đúng, và kết luận theo đúng logic từ chúng.

---

## Code & Minh họa

- [visualization.html](./visualization.html) — Ba bài tập tương tác: (1) Máy mổ xẻ lập luận tô màu tiền đề/kết luận; (2) Tìm tiền đề ẩn — chọn mắt xích còn thiếu; (3) Lập luận hay không — phân biệt lập luận/mô tả/giải thích.

---

## Bài tiếp theo

→ [**Lesson 02 — Ngụy biện hình thức (Formal Fallacies)**](../lesson-02-formal-fallacies/): khi cấu trúc lập luận sai về mặt logic — affirming the consequent, denying the antecedent, và các lỗi phổ biến khác.

[⬆ Về Critical Thinking](../index.html) · [🏠 Trang chính Philosophy](../../index.html)
