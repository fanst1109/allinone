# Lesson 01 — Chu trình mô hình hóa & Phân tích thứ nguyên

## Mục tiêu

- Hiểu **mô hình toán học là gì** và vì sao "mọi mô hình đều sai, nhưng một số hữu ích".
- Nắm **chu trình mô hình hóa 6 bước** và áp dụng được vào một bài toán thực.
- Biết nêu rõ **giả định** và **hạn chế** của mô hình.
- Dùng **phân tích thứ nguyên (dimensional analysis)** để kiểm tra công thức và đoán dạng công thức.
- Đi trọn một ví dụ **end-to-end** bằng số cụ thể.

## Kiến thức tiền đề

- [T4 — Calculus 1 biến](../../04-Calculus-1var/) (đạo hàm = tốc độ thay đổi) — dùng nhẹ ở mục 5.
- Đại số sơ cấp ([T1](../../01-Arithmetic-Algebra/)): giải phương trình, lũy thừa.

---

## 1. Mô hình toán học là gì?

💡 **Trực giác / Hình dung — bản đồ không phải lãnh thổ.** Một tấm bản đồ tỉ lệ 1:50000 *cố tình* bỏ đi từng viên gạch, từng cái cây — nhưng chính nhờ bỏ bớt mà nó **dùng được** để tìm đường. Mô hình toán học cũng vậy: nó là một **mô tả đơn giản hóa** hiện thực bằng ngôn ngữ toán (biến số, phương trình), giữ lại đúng những gì cần cho câu hỏi đang quan tâm và lược bỏ phần còn lại.

> 📐 **Định nghĩa đầy đủ — Mô hình toán học**
>
> **(a) Là gì**: Một tập hợp gồm (i) các **biến** đại diện cho đại lượng thực (vd nhiệt độ $T$, dân số $N$), (ii) các **quan hệ toán học** giữa chúng (phương trình, bất phương trình, hàm), được xây dựng dưới một bộ **giả định** nêu rõ. Mục tiêu: *trả lời một câu hỏi* hoặc *dự đoán* về hệ thực.
>
> **(b) Vì sao cần**: Hiện thực quá phức tạp để tính trực tiếp. Mô hình cho phép ta **suy luận** (giải phương trình) thay vì **thử nghiệm** tốn kém/nguy hiểm. Không thể "thử" thả 1000 quả tên lửa để xem quỹ đạo, cũng không thể cho cả thành phố nhiễm bệnh để xem dịch lan ra sao — nhưng có thể *tính* trên mô hình. Mô hình cũng giúp **hiểu cơ chế**: vì sao logistic bão hòa, vì sao dịch có đỉnh.
>
> **(c) Ví dụ số**: Ném một quả bóng thẳng lên với vận tốc đầu $v_0 = 20$ m/s. Mô hình (bỏ qua sức cản không khí): độ cao $h(t) = v_0 \cdot t - \frac{1}{2} \cdot g \cdot t^2$ với $g = 9.8$ m/s². Tại $t = 1$s: $h = 20 \cdot 1 - \frac{1}{2} \cdot 9.8 \cdot 1^2 = 20 - 4.9 =$ **15.1 m**. Đỉnh khi $h'(t) = v_0 - g \cdot t = 0 \to t = 20/9.8 \approx 2.04$s, $h_{max} = 20^2 / (2 \cdot 9.8) \approx$ **20.4 m**. Mô hình cho ngay dự đoán bằng số — không cần thực sự ném bóng.

❓ **Câu hỏi tự nhiên của người đọc**

- *"Mô hình có cần đúng tuyệt đối không?"* Không — và không thể. Câu nói nổi tiếng của nhà thống kê George Box: *"All models are wrong, but some are useful"* (mọi mô hình đều sai, nhưng một số hữu ích). Mô hình ném bóng ở trên bỏ qua sức cản, gió, độ cong Trái Đất; nó vẫn hữu ích cho quả bóng tennis trong sân, nhưng vô dụng cho tên lửa liên lục địa.
- *"Mô hình khác công thức ở chỗ nào?"* Công thức là *một phần* của mô hình. Mô hình còn bao gồm **giả định** (cái gì bỏ qua), **phạm vi áp dụng** (khi nào dùng được), và **diễn giải** (biến này nghĩa là gì trong thực tế).
- *"Có một mô hình 'đúng nhất' cho mỗi bài toán không?"* Không. Có nhiều mô hình cho cùng hiện tượng, tùy *mục đích* và *độ chính xác cần*. Dự báo thời tiết 1 giờ tới khác mô hình khí hậu 100 năm.

📝 **Tóm tắt mục 1**

- Mô hình toán học = mô tả đơn giản hóa hiện thực bằng biến + phương trình, dưới giả định nêu rõ.
- Mục đích: suy luận/dự đoán thay vì thử nghiệm trực tiếp; hiểu cơ chế.
- "Mọi mô hình đều sai, nhưng một số hữu ích" — đánh giá theo *đủ tốt cho mục đích gì*, không theo *đúng tuyệt đối*.

---

## 2. Chu trình mô hình hóa (6 bước)

💡 **Trực giác / Hình dung.** Mô hình hóa không phải đường thẳng "đề bài → đáp số" mà là một **vòng lặp**: dựng thử → kiểm tra với thực tế → thấy sai chỗ nào → sửa giả định → dựng lại. Giống như nặn tượng: phác thô, lùi lại ngắm, chỉnh, lại ngắm.

Sáu bước:

```
        ┌─────────────────────────────────────────────┐
        ▼                                             │
1. Bài toán thực  →  2. Giả định  →  3. Lập mô hình   │
   (xác định câu       (đơn giản       (biến + phương  │
    hỏi cần trả lời)    hóa)            trình)         │
                                          │            │
                                          ▼            │
6. Tinh chỉnh  ←  5. Kiểm chứng  ←  4. Giải / Phân tích│
   (sửa giả định,    (so dữ liệu,      (tìm nghiệm,    │
    quay lại B2)      ước lượng sai số)  mô phỏng)──────┘
```

| Bước | Tên | Làm gì | Câu hỏi tự hỏi |
|------|-----|--------|----------------|
| 1 | **Xác định bài toán** | Phát biểu rõ câu hỏi cần trả lời, đại lượng quan tâm | "Mình thực sự muốn biết gì? Đầu ra là số nào?" |
| 2 | **Giả định** | Liệt kê cái gì bỏ qua, cái gì coi là hằng | "Yếu tố nào nhỏ, bỏ được? Cái gì gần như không đổi?" |
| 3 | **Lập mô hình** | Chọn biến, đơn vị; viết phương trình/quan hệ | "Quy luật nào nối các biến? Tốc độ thay đổi ra sao?" |
| 4 | **Giải / phân tích** | Giải phương trình, hoặc mô phỏng số | "Nghiệm là gì? Hành vi dài hạn? Có cân bằng không?" |
| 5 | **Kiểm chứng** | So nghiệm với dữ liệu/trực giác; ước lượng sai số | "Khớp thực tế không? Sai bao nhiêu? Có vô lý chỗ nào?" |
| 6 | **Tinh chỉnh** | Nếu chưa đạt: sửa giả định, quay lại bước 2 | "Bỏ giả định nào để khớp hơn? Có đáng phức tạp thêm không?" |

⚠ **Lỗi thường gặp — dừng ở bước 3 hoặc 4.** Rất nhiều người "lập được phương trình" rồi coi như xong. Nhưng nếu không **kiểm chứng** (bước 5), bạn không biết mô hình *đúng* hay chỉ *trông có vẻ đúng*. Một mô hình cho ra "dân số âm" hoặc "xác suất 1.3" là sai dù phương trình giải ra đẹp. Phản ví dụ: mô hình tăng trưởng mũ $N = N_0 \cdot e^{rt}$ dự báo dân số Trái Đất năm 3000 là $10^{20}$ người — vô lý vật lý → phải tinh chỉnh thành logistic (Lesson 04).

❓ **Câu hỏi tự nhiên của người đọc**

- *"Bước 2 và bước 3 khác nhau ra sao?"* Bước 2 là *quyết định bỏ gì* (sức cản? gió?); bước 3 là *viết toán* cho phần giữ lại. Giả định khác → phương trình khác.
- *"Khi nào dừng vòng lặp?"* Khi mô hình **đủ tốt cho mục đích**: sai số nằm trong ngưỡng chấp nhận, và thêm độ phức tạp không đáng so với lợi ích. Đây là đánh đổi *độ chính xác ↔ độ đơn giản*.
- *"Có phải lúc nào cũng lặp nhiều vòng?"* Không nhất thiết. Bài đơn giản có thể 1 vòng là đạt. Nhưng tâm thế "sẵn sàng quay lại bước 2" là cốt lõi.

🔁 **Dừng lại tự kiểm tra**

1. Một bạn lập mô hình dự báo doanh thu, giải ra phương trình, in đồ thị đẹp rồi nộp. Bạn ấy bỏ qua bước nào quan trọng?
2. Trong 6 bước, bước nào quyết định mô hình "đơn giản" hay "phức tạp"?

<details><summary>Đáp án</summary>

1. Bỏ qua **bước 5 (kiểm chứng)** và có thể cả **bước 6 (tinh chỉnh)** — chưa so với dữ liệu thật nên không biết mô hình có dùng được không.
2. **Bước 2 (giả định)** — bỏ qua càng nhiều yếu tố thì mô hình càng đơn giản (nhưng có thể kém chính xác).

</details>

📝 **Tóm tắt mục 2**

- Chu trình 6 bước: Bài toán → Giả định → Lập mô hình → Giải → Kiểm chứng → Tinh chỉnh (rồi lặp lại).
- Đó là **vòng lặp**, không phải đường thẳng — sẵn sàng quay về sửa giả định.
- Đừng dừng ở "lập được phương trình"; phải kiểm chứng và đánh giá sai số.

---

## 3. Giả định & đơn giản hóa

💡 **Trực giác / Hình dung.** Giả định là "công tắc" bạn gạt để tắt bớt độ phức tạp của thế giới. Mỗi công tắc tắt đi một yếu tố ("bỏ qua sức cản", "coi nhiệt độ phòng không đổi"), đổi lại bài toán dễ giải hơn nhưng mô hình xa thực tế hơn. Nghệ thuật mô hình hóa = **tắt đúng công tắc**.

Các loại giả định thường gặp:

- **Bỏ qua yếu tố nhỏ**: bỏ sức cản không khí khi ném vật nặng tốc độ thấp.
- **Coi đại lượng là hằng**: nhiệt độ phòng không đổi trong vài phút; lãi suất cố định.
- **Tuyến tính hóa**: với góc nhỏ, $\sin\theta \approx \theta$ (con lắc — xem [T6 L07](../../06-Advanced/lesson-07-differential-equations/)).
- **Rời rạc ↔ liên tục**: coi dân số (số nguyên) như biến liên tục để dùng ODE.
- **Đồng nhất / trộn đều**: mọi cá thể trong quần thể tiếp xúc như nhau (giả định nền của SIR — Lesson 05).

⚠ **Lỗi thường gặp — quên rằng đây là toy model.** Khi dùng một mô hình đơn giản hóa mạnh, đừng tưởng nó là sự thật. Ví dụ kinh điển: mô hình tăng trưởng mũ cho dân số. Nó đúng *trong giai đoạn đầu* khi tài nguyên dư thừa, nhưng giả định "tốc độ sinh tỉ lệ dân số mãi mãi" là **sai về dài hạn** — thực tế có giới hạn tài nguyên $K$. Luôn ghi rõ: *"mô hình này chỉ dùng được khi ..."*.

> 🧪 **Toy model & phiên bản thật.** Mô hình ném bóng $h(t) = v_0 t - \frac{1}{2}gt^2$ (bỏ sức cản) là *toy model* tốt cho minh họa. Phiên bản thật thêm lực cản tỉ lệ $v$ hoặc $v^2$: $m \cdot \frac{dv}{dt} = -mg - k \cdot v^2$, không còn giải tay gọn được, phải mô phỏng số. Quy tắc: nêu toy model để hiểu cơ chế, **cảnh báo hạn chế**, rồi chỉ ra phiên bản thật ở đâu.

🔁 **Dừng lại tự kiểm tra**

1. Bạn mô hình hóa thời gian rơi của một tờ giấy phẳng từ độ cao 2m. Giả định "bỏ qua sức cản không khí" có hợp lý không?

<details><summary>Đáp án</summary>

**Không hợp lý.** Với tờ giấy, sức cản không khí *là yếu tố chính* (diện tích lớn, khối lượng nhỏ) — bỏ qua nó cho ra thời gian rơi sai hẳn (giấy rơi chậm hơn nhiều so với hòn đá cùng độ cao). Đây đúng là lúc giả định "bỏ sức cản" gãy. Với hòn đá thì giả định đó lại tốt.

</details>

### 3.1 Phân loại giả định theo "mức gây hại" khi sai

Không phải giả định nào cũng nguy hiểm như nhau. Chia ba mức:

| Mức | Loại giả định | Nếu sai thì sao | Ví dụ |
|-----|---------------|-----------------|-------|
| 🟢 An toàn | Bỏ yếu tố thực sự nhỏ | Sai số nhỏ, mô hình vẫn dùng được | Bỏ sức cản với hòn đá rơi 2 m |
| 🟡 Phải canh chừng | Coi hằng cái đang thay đổi chậm | Đúng ngắn hạn, lệch dần dài hạn | "Lãi suất cố định" trong mô hình vay 30 năm |
| 🔴 Gãy mô hình | Bỏ chính cơ chế chi phối | Sai về *chất*, không chỉ về lượng | Bỏ sức cản với tờ giấy rơi; bỏ giới hạn tài nguyên trong tăng trưởng dài hạn |

💡 **Trực giác.** Một giả định 🔴 không làm mô hình "kém chính xác vài %", mà làm nó trả lời **sai loại câu hỏi** — như dùng bản đồ đường bộ để đoán độ sâu biển. Việc đầu tiên khi mô hình hóa: hỏi *"yếu tố tôi định bỏ có phải là cơ chế chính của câu hỏi này không?"* Nếu có → đừng bỏ.

### 3.2 Giả định ngầm (implicit assumptions) — nguy hiểm nhất vì không ai viết ra

⚠ **Lỗi thường gặp — giả định ngầm.** Giả định *viết ra* thì còn kiểm tra được; giả định *ngầm* (bạn không nhận ra mình đang giả định) mới gây tai họa, vì không ai nghĩ tới chuyện kiểm tra nó. Bốn ví dụ:

1. **"Dân số là số thực"** — khi dùng ODE liên tục cho dân số, bạn ngầm cho phép "0.37 con thỏ". Vô hại khi $N$ lớn (làm tròn không đáng kể), nhưng vô lý khi $N$ nhỏ (mô hình nói còn "0.8 cá thể" → tuyệt chủng hay chưa?).
2. **"Tham số không đổi theo thời gian"** — mô hình lan bệnh giả định tỉ lệ lây $\beta$ cố định, ngầm bỏ qua việc người dân *đeo khẩu trang sau khi nghe tin dịch* (β tự giảm). Đây là lý do nhiều dự báo dịch 2020 lệch.
3. **"Đơn vị đồng nhất"** — trộn mét với foot (vụ Mars Climate Orbiter). Không ai *cố ý* giả định "mọi số đều cùng đơn vị", nhưng code ngầm giả định thế.
4. **"Quá khứ giống tương lai"** — mọi mô hình khớp dữ liệu lịch sử rồi ngoại suy đều ngầm giả định quy luật không đổi. Sai khi có "thiên nga đen" (đại dịch, khủng hoảng tài chính).

**Cách phòng**: sau khi liệt kê giả định *tường minh*, tự hỏi thêm *"phương trình của tôi còn lặng lẽ đòi hỏi điều gì đúng?"* — đặc biệt về dấu, về miền giá trị (dân số ≥ 0, xác suất ≤ 1), về đơn vị.

### 3.3 Hai cực sai: quá đơn giản và quá phức tạp

⚠ **Lỗi thường gặp — mô hình quá đơn giản (underfitting).** Bỏ quá nhiều → mô hình không bắt được hành vi cốt lõi. Phản ví dụ: mô hình giá nhà chỉ dùng *diện tích* → bỏ qua vị trí, năm xây; dự đoán lệch xa vì hai căn cùng diện tích ở quận khác nhau giá gấp 3 lần. Dấu hiệu: mô hình sai *có hệ thống* (luôn lệch cùng chiều ở một nhóm dữ liệu).

⚠ **Lỗi thường gặp — mô hình quá phức tạp (overfitting / over-engineering).** Thêm quá nhiều biến → mô hình "học thuộc" cả nhiễu trong dữ liệu, khớp lịch sử hoàn hảo nhưng dự báo tương lai tệ. Phản ví dụ số: 10 điểm dữ liệu nhiễu, khớp đa thức bậc 9 → đi qua *cả 10 điểm* (sai số huấn luyện $= 0$!) nhưng dao động điên loạn giữa các điểm, dự đoán điểm thứ 11 sai thậm tệ; trong khi đường thẳng (bậc 1) bỏ qua nhiễu lại dự báo tốt hơn. Càng nhiều tham số tự do, càng dễ overfit (xem mục 8 về validation).

> 🪒 **Dao cạo Occam (Occam's razor) cho mô hình hóa.** Giữa hai mô hình giải thích dữ liệu *tương đương nhau*, chọn cái **đơn giản hơn** (ít tham số hơn). Lý do không phải "đơn giản thì đẹp" mà là *đơn giản thì ít overfit hơn và dễ kiểm chứng/diễn giải hơn*. "Đủ phức tạp để bắt cơ chế, không hơn."

📝 **Tóm tắt mục 3**

- Giả định = công tắc tắt bớt độ phức tạp; đổi độ chính xác lấy độ giải được.
- Các loại: bỏ yếu tố nhỏ, coi hằng, tuyến tính hóa, rời rạc↔liên tục, trộn đều.
- Phân ba mức theo "mức gây hại": 🟢 an toàn, 🟡 canh chừng, 🔴 gãy mô hình (bỏ chính cơ chế chính).
- Nguy hiểm nhất là **giả định ngầm** — tự hỏi "phương trình còn lặng lẽ đòi hỏi gì?".
- Tránh cả hai cực: quá đơn giản (underfit, sai có hệ thống) và quá phức tạp (overfit, học thuộc nhiễu). Occam: đơn giản nhất mà *đủ*.
- Luôn ghi rõ phạm vi áp dụng; nêu toy model thì phải cảnh báo hạn chế + chỉ phiên bản thật.

---

## 4. Phân tích thứ nguyên (Dimensional Analysis)

💡 **Trực giác / Hình dung.** Mỗi đại lượng vật lý có một "loại tiền tệ": mét (chiều dài), giây (thời gian), kilôgam (khối lượng). Bạn **không thể cộng** 3 mét với 5 giây, cũng như không cộng 3 USD với 5 kg. Phân tích thứ nguyên là việc kiểm tra "đơn vị hai vế có khớp loại tiền tệ không" — một công thức mà thứ nguyên không cân thì **chắc chắn sai**, kể cả khi chưa cần biết nó nói về gì.

> 📐 **Định nghĩa đầy đủ — Thứ nguyên (dimension)**
>
> **(a) Là gì**: Thứ nguyên là *loại* đại lượng, biểu diễn qua các đại lượng cơ bản. Trong cơ học dùng 3 thứ nguyên cơ bản: khối lượng **M**, chiều dài **L**, thời gian **T**. Thứ nguyên của một đại lượng viết trong ngoặc vuông `[ ]`. Vd: vận tốc $[v] = L \cdot T^{-1}$ (mét trên giây); gia tốc $[a] = L \cdot T^{-2}$; lực $[F] = M \cdot L \cdot T^{-2}$ (vì $F = ma$).
>
> **(b) Vì sao cần**: (1) **Bắt lỗi nhanh** — hai vế phương trình phải cùng thứ nguyên; nếu không, công thức sai, khỏi cần kiểm tra gì thêm. (2) **Đoán dạng công thức** — chỉ từ "kết quả phải có thứ nguyên thời gian" ta đoán được cách ghép các biến. (3) **Đổi đơn vị an toàn** và phát hiện nhầm lẫn đơn vị (vụ tàu Mars Climate Orbiter 1999 rơi vì lẫn pound-giây với newton-giây).
>
> **(c) Ví dụ số (4 ví dụ)**:
> - Quãng đường $s = v \cdot t$: $[v \cdot t] = (L \cdot T^{-1}) \cdot T = L = [s]$ ✓. Số: 10 m/s · 3 s = 30 m ($L$) ✓.
> - Động năng $E = \frac{1}{2}mv^2$: $[m \cdot v^2] = M \cdot (L \cdot T^{-1})^2 = M \cdot L^2 \cdot T^{-2} = [\text{năng lượng}]$ ✓.
> - Chu kỳ con lắc $T = 2\pi\sqrt{L/g}$: $[\sqrt{L/g}] = \sqrt{L / (L \cdot T^{-2})} = \sqrt{T^2} = T$ ✓ (thứ nguyên thời gian, đúng là chu kỳ). Số: $L=1$m, $g=9.8 \to 2\pi\sqrt{1/9.8} \approx 2.0$ s.
> - Sai: "$v = \frac{1}{2} \cdot a \cdot t^2$" → $[a \cdot t^2] = (L \cdot T^{-2}) \cdot T^2 = L$ (chiều dài), nhưng $[v] = L \cdot T^{-1}$ → **không khớp** → công thức sai (đúng là quãng đường, không phải vận tốc).

### 4.1 Quy tắc cân bằng thứ nguyên

Hai quy tắc xương sống:

1. **Cộng/trừ chỉ giữa cùng thứ nguyên.** $[A + B]$ đòi $[A] = [B]$. Không có chuyện "3 m + 5 s".
2. **Hai vế phương trình cùng thứ nguyên.** $[\text{vế trái}] = [\text{vế phải}]$, luôn luôn.

Hệ quả: hàm như sin, cos, exp, ln **chỉ nhận đối số không thứ nguyên** (dimensionless). $e^{kt}$ đòi $[k \cdot t] = 1$ (không thứ nguyên) → $[k] = T^{-1}$. Vì sao? Vì khai triển $e^x = 1 + x + x^2/2 + \dots$ cộng các lũy thừa khác bậc của $x$ — chỉ cộng được khi $x$ không thứ nguyên.

### 4.2 Walk-through: đoán công thức chu kỳ con lắc CHỈ bằng thứ nguyên

Đây là sức mạnh thật sự của phương pháp: tìm dạng công thức mà *không cần giải phương trình vi phân*.

**Bài toán**: chu kỳ $T$ của con lắc đơn phụ thuộc gì? Đoán nó phụ thuộc chiều dài dây $\ell$ (thứ nguyên $L$), gia tốc trọng trường $g$ ($L \cdot T^{-2}$), và khối lượng $m$ ($M$).

**Giả định dạng tích lũy thừa**: $T = C \cdot \ell^a \cdot g^b \cdot m^c$ ($C$ là hằng số không thứ nguyên).

**Cân bằng thứ nguyên hai vế** ($[T]$ ở vế trái là thời gian $= T^1$):

$$T^1 = L^a \cdot (L \cdot T^{-2})^b \cdot M^c = L^{a+b} \cdot T^{-2b} \cdot M^c$$

Khớp số mũ từng thứ nguyên cơ bản:
- **M**: $c = 0$  → khối lượng *không* ảnh hưởng chu kỳ (!).
- **T**: $-2b = 1 \to b = -\frac{1}{2}$.
- **L**: $a + b = 0 \to a = -b = \frac{1}{2}$.

Vậy $T = C \cdot \ell^{1/2} \cdot g^{-1/2} = C\sqrt{\ell/g}$. So với công thức thật $T = 2\pi\sqrt{\ell/g}$: **đúng dạng**, chỉ thiếu hằng số $C = 2\pi$ (phân tích thứ nguyên không cho được hằng số không thứ nguyên — đó là hạn chế của phương pháp).

🎯 Kết luận chấn động mà ta rút ra *không cần giải gì*: **chu kỳ con lắc không phụ thuộc khối lượng**. Đây là điều Galileo phát hiện bằng thực nghiệm — phân tích thứ nguyên cho ta thấy ngay.

❓ **Câu hỏi tự nhiên của người đọc**

- *"Thứ nguyên cân rồi thì công thức chắc chắn đúng?"* **Không** — cân thứ nguyên là điều kiện *cần*, không *đủ*. $s = v \cdot t$ và $s = 2 \cdot v \cdot t$ đều cân thứ nguyên nhưng chỉ một đúng. Hằng số không thứ nguyên ($2$, $\pi$...) phương pháp không bắt được. Nhưng nếu *không* cân thứ nguyên thì *chắc chắn sai* — đó là giá trị của nó: bộ lọc loại nhanh công thức sai.
- *"Đơn vị (mét, foot) và thứ nguyên (L) khác nhau không?"* Có. **Thứ nguyên** là loại (chiều dài); **đơn vị** là thước đo cụ thể của loại đó (mét, foot, dặm). Cùng thứ nguyên $L$ có thể đo bằng nhiều đơn vị. Đổi đơn vị không đổi thứ nguyên.
- *"Vì sao sin/cos/log/exp phải nhận số không thứ nguyên?"* Vì chúng định nghĩa qua chuỗi cộng các lũy thừa khác bậc ($\sin x = x - x^3/6 + \dots$); chỉ cộng được khi các số hạng cùng thứ nguyên, tức $x$ không thứ nguyên. Nên $\sin(5 \text{ mét})$ vô nghĩa; phải $\sin(5 \text{ mét} / \text{chiều\_dài\_chuẩn})$.

⚠ **Lỗi thường gặp — đưa đại lượng có thứ nguyên vào exp/sin.** Viết $N(t) = N_0 \cdot e^{-t}$ với $t$ tính bằng giây là *thiếu hằng số tốc độ*: phải $e^{-t/\tau}$ hoặc $e^{-kt}$ với $[\tau] = T$, $[k] = T^{-1}$ để mũ không thứ nguyên. Phản ví dụ: $e^{-5 \text{ giây}}$ không có nghĩa; $e^{-5s / 2s} = e^{-2.5}$ mới đúng.

🔁 **Dừng lại tự kiểm tra**

1. Kiểm tra thứ nguyên công thức động lượng $p = m\cdot v$. Cho biết $[p]$.
2. Một công thức cho ra "năng lượng" nhưng bạn tính được thứ nguyên vế phải là $M\cdot L\cdot T^{-2}$. Có vấn đề gì?
3. Đối số của $\ln(P/P_0)$ ($P$, $P_0$ là áp suất) có hợp lệ không?

<details><summary>Đáp án</summary>

1. $[p] = [m\cdot v] = M\cdot(L\cdot T^{-1}) =$ **$M\cdot L\cdot T^{-1}$**. (Đây cũng là thứ nguyên của xung lực $F\cdot t = (M\cdot L\cdot T^{-2})\cdot T = M\cdot L\cdot T^{-1}$ ✓ — định lý xung lượng.)
2. Năng lượng có thứ nguyên **$M\cdot L^2\cdot T^{-2}$** (từ $E = \frac{1}{2}mv^2$). Vế phải ra $M\cdot L\cdot T^{-2}$ (đó là *lực*, không phải năng lượng) → **công thức sai**, lệch một thừa số chiều dài $L$.
3. **Hợp lệ.** $P/P_0$ là tỉ số hai áp suất → thứ nguyên triệt tiêu → không thứ nguyên → ln nhận được. Đây là lý do công thức vật lý hay viết log của *tỉ số*, không phải log của đại lượng có đơn vị.

</details>

📝 **Tóm tắt mục 4**

- Thứ nguyên = loại đại lượng (M, L, T); đơn vị = thước đo cụ thể của loại đó.
- Hai quy tắc: cộng/trừ cùng thứ nguyên; hai vế cùng thứ nguyên. exp/sin/ln chỉ nhận đối số không thứ nguyên.
- Cân thứ nguyên là điều kiện *cần* (loại nhanh công thức sai), không *đủ* (không bắt được hằng số như 2π).
- Có thể *đoán dạng công thức* chỉ bằng thứ nguyên (vd chu kỳ con lắc $T \propto \sqrt{\ell/g}$, không phụ thuộc khối lượng).

---

## 5. Ví dụ end-to-end: cà phê nguội bao lâu thì uống được?

Đi trọn 6 bước chu trình bằng số cụ thể.

**Bước 1 — Bài toán.** Cốc cà phê 90°C, phòng 25°C. Bao lâu nó nguội xuống 60°C (nhiệt độ uống dễ chịu)?

**Bước 2 — Giả định.**
- Nhiệt độ phòng $T_{\text{phòng}} = 25$°C *không đổi* (phòng lớn, cốc nhỏ).
- Cà phê trộn đều, có một nhiệt độ $T(t)$ duy nhất (bỏ qua chênh lệch trong cốc).
- Tốc độ mất nhiệt tỉ lệ chênh lệch với phòng (định luật nguội Newton).
- Bỏ qua bay hơi (đơn giản hóa — sẽ bàn ở bước 6).

**Bước 3 — Lập mô hình.** Định luật nguội Newton:
$$\frac{dT}{dt} = -k\cdot(T - T_{\text{phòng}}), \quad k > 0 \text{ là hằng số tốc độ}, \quad [k] = T^{-1} \text{ (phút}^{-1})$$
Kiểm thứ nguyên: $[dT/dt] =$ nhiệt độ/thời gian; $[k\cdot(T-T_{\text{phòng}})] = (T^{-1})\cdot(\text{nhiệt độ}) =$ nhiệt độ/thời gian ✓.

**Bước 4 — Giải.** Đây là ODE tách biến (xem [T6 L07 mục 2](../../06-Advanced/lesson-07-differential-equations/)). Đặt $u = T - 25 \to du/dt = -k\cdot u \to u = u_0\cdot e^{-kt}$. Với $T(0) = 90 \to u_0 = 65$:
$$T(t) = 25 + 65\cdot e^{-kt}$$
Cần một điểm dữ liệu để tìm $k$. Giả sử đo được: sau 5 phút cà phê còn 70°C.
- $70 = 25 + 65\cdot e^{-5k} \to 45/65 = e^{-5k} \to -5k = \ln(45/65) = \ln(0.692) = -0.368$
- $\to k = 0.0736$ phút⁻¹.

Tìm $t$ khi $T = 60$°C:
- $60 = 25 + 65\cdot e^{-kt} \to 35/65 = e^{-kt} \to -kt = \ln(0.538) = -0.619$
- $\to t = 0.619 / 0.0736 \approx$ **8.4 phút**.

**Bước 5 — Kiểm chứng.**
- $t = 0$: $T = 25 + 65\cdot 1 = 90$°C ✓ (đúng nhiệt độ đầu).
- $t \to \infty$: $T \to 25 + 0 = 25$°C ✓ (nguội về nhiệt độ phòng, hợp lý).
- $t = 5$: $T = 25 + 65\cdot e^{-0.368} = 25 + 65\cdot 0.692 = 70$°C ✓ (khớp dữ liệu hiệu chỉnh).
- Giá trị 8.4 phút có hợp trực giác không? Cà phê nóng nguội tới mức uống được trong khoảng 8–10 phút — **hợp lý**.

**Bước 6 — Tinh chỉnh.** Mô hình bỏ qua bay hơi (làm nguội nhanh hơn lúc đầu, khi còn rất nóng) và sự nguội không đều trong cốc. Nếu cần chính xác hơn: thêm số hạng bay hơi, hoặc đo nhiều điểm dữ liệu rồi khớp k bằng hồi quy (Lesson 02). Với mục đích "ước lượng uống được khi nào", mô hình hiện tại **đủ tốt** → dừng.

📝 Cả 6 bước gói gọn: bài toán cụ thể → giả định rõ ràng → ODE Newton → giải ra $T(t)$ → khớp dữ liệu tìm $k$ → kiểm chứng giới hạn & trực giác → đánh giá đủ tốt. Đây là khuôn mẫu cho mọi lesson sau.

---

## 6. Biến, tham số và hằng số — phân biệt ba vai

💡 **Trực giác / Hình dung — công thức nấu ăn.** Trong một công thức bánh: *lượng bột* bạn đong là **biến đầu vào** (input, thay đổi mỗi lần làm), *chiếc bánh nở to bao nhiêu* là **biến đầu ra** (output), còn *"180°C trong 25 phút"* là **tham số** — cố định cho một công thức cụ thể, nhưng ai đổi lò/khuôn thì chỉnh lại. Nhầm ba vai này là nhầm "cái gì tôi điều khiển" với "cái gì tôi quan sát".

> 📐 **Định nghĩa đầy đủ — Biến (variable), Tham số (parameter), Hằng số (constant)**
>
> **(a) Là gì**:
> - **Biến**: đại lượng *thay đổi* trong phạm vi bài toán. Chia: **biến độc lập** (ta đặt vào / là trục, vd thời gian $t$) và **biến phụ thuộc** (kết quả ta tính, vd nhiệt độ $T(t)$).
> - **Tham số**: đại lượng *cố định trong một lần chạy mô hình* nhưng *thay đổi giữa các tình huống/bài*. Ta thường phải *hiệu chỉnh* (calibrate) nó từ dữ liệu. Vd hằng số nguội $k$ ở mục 5: cố định cho một cốc cà phê, nhưng cốc khác/chất liệu khác thì $k$ khác.
> - **Hằng số (vật lý/toán)**: cố định *luôn luôn*, không hiệu chỉnh. Vd $g = 9.8$ m/s², $\pi$, $e$.
>
> **(b) Vì sao cần phân biệt**: Vì nó quyết định *cái gì bạn giải tìm* và *cái gì bạn đo để hiệu chỉnh*. Mục tiêu thường là tìm **biến phụ thuộc** theo **biến độc lập**, với **tham số** lấy từ dữ liệu, và **hằng số** tra bảng. Lẫn lộn → giải sai bài.
>
> **(c) Ví dụ số (4 ví dụ)**:
> 1. Ném bóng $h(t) = v_0 t - \tfrac{1}{2} g t^2$: **biến độc lập** $t$; **biến phụ thuộc** $h$; **tham số** $v_0$ (vận tốc đầu, đổi theo cú ném); **hằng số** $g = 9.8$.
> 2. Nguội Newton $T(t) = 25 + 65 e^{-kt}$: **biến độc lập** $t$; **biến phụ thuộc** $T$; **tham số** $k = 0.0736$ (hiệu chỉnh từ 1 điểm đo); "hằng" $25, 65$ thực ra là *điều kiện đầu/biên* (nhiệt độ phòng, chênh lệch đầu).
> 3. Đường thẳng hồi quy $y = a x + b$: **biến độc lập** $x$, **phụ thuộc** $y$; **tham số** $a, b$ (khớp từ dữ liệu — Lesson 02).
> 4. Logistic $N(t) = \dfrac{K}{1 + A e^{-rt}}$: **độc lập** $t$, **phụ thuộc** $N$; **tham số** $K$ (sức chứa), $r$ (tốc độ), $A$ (từ $N(0)$) — cả ba hiệu chỉnh từ dữ liệu.

❓ **Câu hỏi tự nhiên của người đọc**

- *"Tham số và biến khác nhau ở đâu, vì cả hai đều là chữ cái?"* Khác ở **vai trò**, không ở ký hiệu. Trong *một lần chạy*, tham số đứng yên còn biến chạy. Cùng một ký hiệu có thể đổi vai giữa hai bài: $k$ là tham số khi ta giải $T(t)$, nhưng *trở thành biến* khi ta hỏi "$k$ phụ thuộc chất liệu cốc thế nào?".
- *"Bao nhiêu tham số là 'vừa'?"* Càng ít càng tốt *miễn vẫn khớp* (Occam, mục 3.3). Mỗi tham số thêm vào đòi thêm dữ liệu để hiệu chỉnh đáng tin; thừa tham số → overfit.
- *"Điều kiện đầu ($N_0$, $T(0)$) là biến hay tham số?"* Thường coi là **tham số** (cố định cho một lần chạy, đặt bởi hiện trạng ban đầu). Đổi điều kiện đầu = chạy lại mô hình với tham số mới.

⚠ **Lỗi thường gặp — coi tham số là hằng số phổ quát.** Hiệu chỉnh $k = 0.0736$ cho *một* cốc rồi dùng lại cho cốc sứ dày là sai — $k$ là tham số *của tình huống đó*. Phản ví dụ: cốc giữ nhiệt có $k$ nhỏ hơn nhiều; dùng nhầm $k$ → dự báo nguội nhanh gấp đôi thực tế.

🔁 **Dừng lại tự kiểm tra**

1. Trong mô hình lãi kép $A(t) = P(1 + r)^t$, hãy gắn nhãn biến độc lập, biến phụ thuộc, tham số.
2. Số $e$ trong $e^{-kt}$ là biến, tham số hay hằng số?

<details><summary>Đáp án</summary>

1. **Biến độc lập** $t$ (thời gian); **biến phụ thuộc** $A$ (số tiền); **tham số** $P$ (vốn ban đầu) và $r$ (lãi suất) — cố định cho một khoản gửi, đổi giữa các khoản.
2. **Hằng số** toán học ($e \approx 2.718$), không bao giờ hiệu chỉnh. Khác hẳn $k$ (tham số, hiệu chỉnh từ dữ liệu).

</details>

📝 **Tóm tắt mục 6**

- Biến độc lập (ta đặt vào) → mô hình → biến phụ thuộc (ta tính ra).
- Tham số: cố định trong một lần chạy, đổi giữa các tình huống, *hiệu chỉnh từ dữ liệu*.
- Hằng số: cố định luôn luôn (g, π, e), tra bảng không hiệu chỉnh.
- Phân vai sai → giải sai bài. Càng ít tham số càng tốt miễn còn khớp.

---

## 7. Phân loại mô hình

💡 **Trực giác / Hình dung.** Trước khi xây, hỏi ba câu để biết "loại bản đồ" cần vẽ: (1) *Kết quả có chắc chắn không, hay có yếu tố may rủi?* (2) *Thời gian chạy liên tục hay theo bước nhảy?* (3) *Có thay đổi theo thời gian, hay chỉ chụp một khoảnh khắc?* Ba câu này cho ba trục phân loại.

### 7.1 Ba trục phân loại chính

| Trục | Hai cực | Khác nhau ở | Công cụ toán điển hình |
|------|---------|-------------|------------------------|
| **Tất định ↔ Ngẫu nhiên** | Deterministic / Stochastic | Cùng input → luôn cùng output? hay có xác suất? | ODE/đại số ↔ xác suất, xích Markov |
| **Liên tục ↔ Rời rạc** | Continuous / Discrete | Biến (thời gian/không gian) chạy mượt hay nhảy bước? | Vi tích phân ↔ dãy số, sai phân |
| **Tĩnh ↔ Động** | Static / Dynamic | Có biến thời gian không? | Phương trình đại số ↔ ODE/dãy đệ quy |

> 📐 **Định nghĩa — bốn cặp loại**
>
> - **Tất định (deterministic)**: cùng đầu vào và tham số → *luôn* cho cùng đầu ra, không yếu tố may rủi. Vd $h(t) = v_0 t - \tfrac12 g t^2$.
> - **Ngẫu nhiên (stochastic)**: có thành phần xác suất; cùng input có thể ra kết quả khác nhau, ta nói về *phân phối* kết quả. Vd tung xúc xắc, mô hình giá cổ phiếu (chuyển động Brown).
> - **Liên tục (continuous)**: biến nhận *mọi giá trị thực* trong khoảng; dùng đạo hàm. Vd nhiệt độ $T(t)$ theo thời gian thực.
> - **Rời rạc (discrete)**: biến chỉ nhận giá trị tách biệt (bước); dùng dãy/sai phân. Vd dân số đo *mỗi năm* $N_0, N_1, N_2,\dots$
> - **Tĩnh (static)**: không có thời gian, chụp một trạng thái cân bằng. Vd cân bằng cung–cầu $Q_s(p) = Q_d(p)$ tìm giá $p^*$.
> - **Động (dynamic)**: theo dõi tiến hóa theo thời gian. Vd $\dfrac{dN}{dt} = rN$.

### 7.2 Bốn (+) ví dụ phân loại thực tế

Một mô hình mang **một nhãn trên mỗi trục** (vd "tất định, liên tục, động"):

| # | Mô hình thực tế | Tất định/Ngẫu nhiên | Liên tục/Rời rạc | Tĩnh/Động |
|---|------------------|:---:|:---:|:---:|
| 1 | Quỹ đạo ném bóng $h(t)=v_0t-\tfrac12gt^2$ | Tất định | Liên tục | Động |
| 2 | Lãi kép theo tháng $A_{n+1}=A_n(1+r)$ | Tất định | **Rời rạc** | Động |
| 3 | Tung xúc xắc / số khách đến quầy mỗi giờ (Poisson) | **Ngẫu nhiên** | Rời rạc | (tùy) |
| 4 | Giá cổ phiếu (chuyển động Brown hình học) | **Ngẫu nhiên** | Liên tục | Động |
| 5 | Cân bằng cung–cầu tìm giá $p^*$ | Tất định | Liên tục | **Tĩnh** |
| 6 | Lan bệnh SIR (Lesson 05) | Tất định | Liên tục | Động |

**Walk-through chọn loại cho ví dụ 2 (lãi kép tháng).** *Ngẫu nhiên?* — Không, lãi suất $r$ cho trước, $A_{n+1}$ tính chính xác từ $A_n$ → **tất định**. *Liên tục?* — Tiền chỉ cập nhật *cuối mỗi tháng*, không phải mọi khoảnh khắc → **rời rạc** (chỉ số $n = 0,1,2,\dots$). *Tĩnh?* — Có theo dõi qua thời gian → **động**. Kết luận: *tất định, rời rạc, động* → công cụ là **dãy đệ quy** ($A_{n+1} = A_n(1+r)$), không phải ODE.

❓ **Câu hỏi tự nhiên của người đọc**

- *"Rời rạc vs liên tục — chọn cái nào?"* Theo *bản chất dữ liệu/câu hỏi*. Dân số thật là số nguyên (rời rạc), nhưng nếu $N$ lớn và muốn dùng giải tích, ta *xấp xỉ* bằng liên tục (giả định ngầm ở mục 3.2!). Đo mỗi năm → rời rạc tự nhiên.
- *"Khi nào cần mô hình ngẫu nhiên?"* Khi *sự dao động/may rủi chính là điều cần trả lời* (rủi ro đầu tư, xác suất hết hàng), hoặc khi hệ nhỏ (ít cá thể) nên thăng giáng lớn. Nếu chỉ cần xu hướng trung bình và hệ lớn → tất định thường đủ và đơn giản hơn.
- *"Một mô hình có thể vừa rời rạc vừa liên tục?"* Có — mô hình *lai* (hybrid): vd dân số tăng liên tục trong năm nhưng thu hoạch *một lần* cuối năm (cú nhảy rời rạc). Thực tế nhiều mô hình là lai.

⚠ **Lỗi thường gặp — ép sai loại.** Dùng ODE liên tục cho quần thể chỉ còn 3 cá thể → mô hình nói "2.4 cá thể", vô nghĩa và bỏ sót *tuyệt chủng do ngẫu nhiên* (3 con xui rủi chết hết) mà mô hình tất định không bao giờ thấy. Hệ nhỏ → cân nhắc rời rạc + ngẫu nhiên. Phản ví dụ ngược: dùng mô phỏng ngẫu nhiên từng phân tử khí cho 1 mol ($6\times10^{23}$ hạt) là phí phạm — số lớn nên trung bình rất ổn định, mô hình liên tục tất định (nhiệt động lực học) đủ và rẻ hơn vô vàn.

🔁 **Dừng lại tự kiểm tra**

1. Phân loại theo cả 3 trục: *"số người xếp hàng ở quầy ATM theo thời gian"*.
2. Mô hình tìm *giá thuê nhà cân bằng* ở một khu (không quan tâm nó tới đó ra sao) — tĩnh hay động?

<details><summary>Đáp án</summary>

1. **Ngẫu nhiên** (người đến lúc nào là may rủi — quá trình hàng đợi/Poisson), **rời rạc** (số người là số nguyên), **động** (thay đổi theo thời gian). → công cụ: lý thuyết hàng đợi / xích Markov.
2. **Tĩnh** — chỉ tìm trạng thái cân bằng $p^*$ (cung = cầu), không theo dõi đường đi tới đó. Nếu hỏi "giá điều chỉnh dần ra sao theo tuần" thì mới là động.

</details>

📝 **Tóm tắt mục 7**

- Ba trục: tất định↔ngẫu nhiên, liên tục↔rời rạc, tĩnh↔động. Mỗi mô hình một nhãn mỗi trục.
- Loại quyết định công cụ: ODE (liên tục động), dãy đệ quy (rời rạc động), đại số (tĩnh), xác suất/Markov (ngẫu nhiên).
- Chọn loại theo *bản chất câu hỏi & dữ liệu*, không theo thói quen; hệ nhỏ → rời rạc/ngẫu nhiên, hệ lớn → liên tục/tất định thường đủ.

---

## 8. Kiểm chứng (validation) & sai số mô hình

💡 **Trực giác / Hình dung — thử áo trước khi mua.** Khớp mô hình với dữ liệu rồi tự khen "khớp đẹp" giống như thử áo *chính chiếc bạn đã chọn* rồi kết luận "vừa". Phép thử thật là mặc một chiếc *bạn chưa từng thử* (dữ liệu mới). Validation = kiểm tra mô hình trên dữ liệu nó **chưa nhìn thấy** lúc xây.

### 8.1 Ba loại sai số

> 📐 **Định nghĩa — ba nguồn sai số của mô hình**
>
> - **(a) Sai số mô hình (model/structural error)**: do *bản thân cấu trúc* mô hình đơn giản hóa hiện thực (bỏ sức cản, giả định tuyến tính). Không giảm được bằng thêm dữ liệu — chỉ giảm bằng *đổi mô hình*. Vd ném bóng bỏ sức cản: dù đo triệu lần $v_0$ chính xác, vẫn lệch vì thiếu lực cản.
> - **(b) Sai số tham số (parameter error)**: do *hiệu chỉnh $k, r, a, b\dots$ chưa chính xác* (dữ liệu ít hoặc nhiễu). Giảm được bằng *thêm/cải thiện dữ liệu*.
> - **(c) Sai số đo / nhiễu (measurement noise)**: dữ liệu thực luôn có sai số đo. Không phải lỗi mô hình, nhưng làm việc hiệu chỉnh khó hơn.

### 8.2 Đo sai số bằng số — ba thước đo

Gọi $y_i$ là giá trị *thực đo*, $\hat{y}_i$ là giá trị *mô hình dự đoán*, $n$ điểm:

$$
\text{MAE} = \frac{1}{n}\sum_{i=1}^{n} |y_i - \hat{y}_i|,
\qquad
\text{RMSE} = \sqrt{\frac{1}{n}\sum_{i=1}^{n} (y_i - \hat{y}_i)^2}
$$

- **MAE** (sai số tuyệt đối trung bình): dễ hiểu, "trung bình lệch bao nhiêu".
- **RMSE** (căn sai số bình phương trung bình): *phạt nặng* các lệch lớn (bình phương), nhạy với outlier.
- **Sai số tương đối**: $|y_i - \hat{y}_i| / |y_i|$ — để so công bằng giữa đại lượng to/nhỏ.

**Walk-through số.** Mô hình dự đoán nhiệt độ, 4 điểm: thực $y = [70, 60, 52, 46]$, mô hình $\hat{y} = [72, 58, 53, 44]$. Sai lệch $e_i = y_i - \hat{y}_i = [-2, +2, -1, +2]$.

$$
\begin{aligned}
\text{MAE} &= \tfrac{1}{4}(|{-}2| + |2| + |{-}1| + |2|) = \tfrac{1}{4}(2+2+1+2) = \tfrac{7}{4} = 1.75 \\
\text{RMSE} &= \sqrt{\tfrac{1}{4}\big((-2)^2 + 2^2 + (-1)^2 + 2^2\big)} = \sqrt{\tfrac{4+4+1+4}{4}} = \sqrt{\tfrac{13}{4}} = \sqrt{3.25} \approx 1.80
\end{aligned}
$$

RMSE (1.80) > MAE (1.75) vì RMSE phạt nặng các lệch $\pm 2$. Diễn giải: mô hình lệch trung bình ~1.75°C — *đủ tốt* nếu ta chỉ cần ước lượng "khi nào uống được" (±2°C không đổi quyết định).

### 8.3 Train/test split — bí quyết chống overfit

⚠ **Lỗi thường gặp — validation trên chính dữ liệu đã khớp.** Đây là cái bẫy lớn nhất. Nếu hiệu chỉnh tham số trên *toàn bộ* dữ liệu rồi đo sai số trên *cùng dữ liệu đó*, mô hình overfit sẽ cho sai số *giả tạo nhỏ* (đa thức bậc 9 ở mục 3.3 đạt sai số $= 0$ trên 10 điểm khớp) nhưng dự báo thật lại tệ. Đó là "thử lại chính chiếc áo đã chọn".

**Cách đúng — tách dữ liệu**:

```
   Dữ liệu  ┌──────────────── 80% ────────────────┬──── 20% ────┐
            │   TẬP HUẤN LUYỆN (train)             │  TẬP KIỂM   │
            │   — dùng hiệu chỉnh tham số          │  THỬ (test) │
            │                                      │  — mô hình  │
            │                                      │  CHƯA thấy  │
            └──────────────────────────────────────┴─────────────┘
                       hiệu chỉnh ở đây              đánh giá ở đây
```

- Hiệu chỉnh tham số **chỉ** trên tập train.
- Đo sai số (MAE/RMSE) trên tập **test** — dữ liệu mô hình chưa nhìn → ước lượng *trung thực* khả năng dự báo.
- Dấu hiệu overfit: sai số train rất nhỏ nhưng sai số test lớn hơn hẳn (khoảng cách lớn = "học thuộc nhiễu").

💡 **Trực giác bổ sung.** Train = đề ôn có đáp án; test = đề thi thật. Học thuộc lòng đề ôn (overfit) → điểm ôn 10/10 nhưng thi thật rớt. Hiểu bản chất (mô hình đơn giản, đúng cơ chế) → ôn 8 nhưng thi cũng 8.

### 8.4 Kiểm chứng định tính — "sniff test" không cần số

Trước cả khi tính MAE, chạy các kiểm tra rẻ tiền bắt lỗi thô:

1. **Kiểm giới hạn (limits)**: $t\to 0$ và $t\to\infty$ có ra giá trị hợp lý? (Cà phê: $T(0)=90$ ✓, $T(\infty)=25$ ✓.)
2. **Kiểm dấu & miền**: dân số $N \ge 0$? xác suất $\in [0,1]$? Nếu mô hình cho $N = -3$ hay $P = 1.3$ → sai ngay.
3. **Kiểm đơn điệu/hình dạng**: cà phê phải *giảm* đơn điệu về 25°C; nếu mô hình cho nó tăng lại → sai.
4. **Kiểm thứ nguyên** (mục 4): hai vế cùng thứ nguyên.

⚠ **Lỗi thường gặp — bỏ qua sniff test, lao thẳng vào tính.** Một mô hình cho "xác suất khỏi bệnh = 1.4" hay "thời gian rơi âm" là sai *về chất*, bắt được trong 2 giây bằng kiểm dấu/miền — không cần MAE. Luôn chạy sniff test trước.

🔁 **Dừng lại tự kiểm tra**

1. Vì sao đo sai số trên *chính* dữ liệu đã dùng hiệu chỉnh lại cho kết quả lạc quan giả?
2. Sai số mô hình (structural) và sai số tham số khác nhau ở chỗ "thêm dữ liệu có giúp không"?
3. Mô hình dự báo dân số cho ra $N(50) = -120$ người. Đây là loại lỗi gì, bắt bằng kiểm tra nào?

<details><summary>Đáp án</summary>

1. Vì tham số đã được *chỉnh để khớp đúng những điểm đó*; đo lại trên chính chúng là chấm điểm "đề mình tự ra". Mô hình overfit khớp cả nhiễu → sai số giả tạo nhỏ, không phản ánh dự báo thật.
2. **Sai số tham số**: thêm/sửa dữ liệu *giúp* (hiệu chỉnh chính xác hơn). **Sai số mô hình**: thêm dữ liệu *không giúp* — phải đổi cấu trúc mô hình (thêm sức cản, đổi sang logistic...).
3. **Sai về chất** (vi phạm miền giá trị: dân số phải $\ge 0$), bắt bằng **kiểm dấu & miền** trong sniff test — không cần tính MAE. Nguyên nhân thường là mô hình tuyến tính/mũ giảm ngoại suy quá xa miền hợp lệ.

</details>

📝 **Tóm tắt mục 8**

- Ba sai số: mô hình (cấu trúc, thêm dữ liệu vô ích — phải đổi mô hình), tham số (giảm bằng dữ liệu), đo/nhiễu.
- Đo bằng số: MAE (lệch trung bình), RMSE (phạt nặng lệch lớn), sai số tương đối.
- **Train/test split**: hiệu chỉnh trên train, đánh giá trên test (dữ liệu chưa thấy) → chống ngộ nhận overfit. Validation trên chính dữ liệu đã khớp là cái bẫy số một.
- Chạy **sniff test** (giới hạn, dấu/miền, hình dạng, thứ nguyên) trước khi tính số — bắt lỗi thô nhanh.

---

## 9. Bài tập

**Bài 1.** Kiểm tra thứ nguyên công thức năng lượng tiềm năng hấp dẫn $E = m\cdot g\cdot h$. Kết quả có đúng thứ nguyên năng lượng ($M\cdot L^2\cdot T^{-2}$) không?

**Bài 2.** Một mô hình tính *vận tốc* cuối của vật rơi tự do từ độ cao $h$ được viết là $v = g\cdot h$. Dùng phân tích thứ nguyên chỉ ra công thức này sai, và đoán dạng đúng.

**Bài 3.** Liệt kê tối thiểu 3 giả định bạn sẽ đặt khi mô hình hóa "thời gian một thang máy đi từ tầng 1 lên tầng 10".

**Bài 4.** (End-to-end rút gọn) Một bồn nước ban đầu có 100 lít, nước chảy ra với tốc độ tỉ lệ lượng nước hiện có: $dV/dt = -0.2\cdot V$ ($V$ tính bằng lít, $t$ bằng phút). (a) Tìm $V(t)$. (b) Sau bao lâu còn 50 lít? (c) Kiểm chứng giới hạn $t\to\infty$.

**Bài 5.** Chu kỳ dao động của một vật khối lượng $m$ gắn vào lò xo độ cứng $\kappa$ (thứ nguyên $[\kappa] = M\cdot T^{-2}$, vì $F = \kappa\cdot x$). Dùng phân tích thứ nguyên đoán dạng công thức chu kỳ $T$ theo $m$ và $\kappa$.

**Bài 6.** Phân loại các mô hình sau theo cả 3 trục (tất định/ngẫu nhiên, liên tục/rời rạc, tĩnh/động): (a) số tiền trong tài khoản tiết kiệm cộng lãi mỗi cuối tháng; (b) vị trí một hạt phấn hoa trôi trên mặt nước (chuyển động Brown); (c) tìm điểm cân bằng cung–cầu để định giá một sản phẩm.

**Bài 7.** Một mô hình dự báo doanh thu cho 4 tháng: thực đo $y = [100, 120, 90, 110]$ (triệu đồng), mô hình dự đoán $\hat{y} = [96, 124, 95, 108]$. (a) Tính MAE và RMSE. (b) Vì sao RMSE ≥ MAE? (c) Bạn đo sai số này trên *chính* 4 tháng đã dùng để hiệu chỉnh tham số — kết quả có đáng tin để đánh giá khả năng dự báo tháng thứ 5 không? Vì sao?

---

## 10. Lời giải chi tiết

**Bài 1.** $[m\cdot g\cdot h] = M \cdot (L\cdot T^{-2}) \cdot L =$ **$M\cdot L^2\cdot T^{-2}$** ✓. Đúng bằng thứ nguyên năng lượng (so với $\frac{1}{2}mv^2$: $M\cdot(L\cdot T^{-1})^2 = M\cdot L^2\cdot T^{-2}$ — khớp). Kết luận: công thức cân thứ nguyên. Số minh họa: $m=2$kg, $g=9.8$, $h=5$m $\to E = 2\cdot 9.8\cdot 5 = 98$ J (joule $=$ kg·m²/s²) ✓.

**Bài 2.** $[g\cdot h] = (L\cdot T^{-2})\cdot L = L^2\cdot T^{-2}$. Nhưng $[v] = L\cdot T^{-1}$. So sánh: $L^2\cdot T^{-2} \neq L\cdot T^{-1}$ → **không cân thứ nguyên → công thức sai**. Đoán dạng đúng: $v$ phải lấy *căn* để hạ bậc. $[\sqrt{g\cdot h}] = \sqrt{L^2\cdot T^{-2}} = L\cdot T^{-1} = [v]$ ✓. Vậy dạng đúng là $v = C\cdot\sqrt{g\cdot h}$. (Công thức thật $v = \sqrt{2gh}$, $C = \sqrt{2}$ — phân tích thứ nguyên cho đúng dạng, thiếu hằng số $\sqrt{2}$.)

**Bài 3.** Ví dụ các giả định hợp lý (cần ≥ 3):
- Thang máy chạy với vận tốc không đổi ở đoạn giữa (bỏ qua chi tiết gia tốc/giảm tốc), hoặc mô hình gia tốc–vận tốc đều–giảm tốc.
- Không dừng đón khách ở tầng trung gian (đi thẳng 1→10).
- Khoảng cách giữa các tầng bằng nhau (chiều cao mỗi tầng như nhau).
- Bỏ qua thời gian đóng/mở cửa (hoặc cộng một hằng số cố định).
(Mỗi giả định đánh đổi độ chính xác lấy độ đơn giản — đúng tinh thần mục 3.)

**Bài 4.**
- (a) ODE tách biến: $dV/V = -0.2\, dt \to \ln V = -0.2t + C \to$ **$V(t) = 100\cdot e^{-0.2t}$** (dùng $V(0)=100 \to C$ cho hằng số 100).
- (b) $50 = 100\cdot e^{-0.2t} \to 0.5 = e^{-0.2t} \to -0.2t = \ln 0.5 = -0.693 \to$ **$t = 3.47$ phút**. (Đây là "thời gian bán rã" của bồn nước — giống phóng xạ.)
- (c) $t \to \infty$: $V \to 100\cdot e^{-\infty} = 100\cdot 0 =$ **0 lít** ✓ (bồn cạn dần, hợp lý). Kiểm thêm $V(0) = 100\cdot 1 = 100$ ✓.

**Bài 5.** Giả định $T = C\cdot m^a\cdot\kappa^b$. Cân thứ nguyên ($[T] = T^1$):
$$T^1 = M^a \cdot (M\cdot T^{-2})^b = M^{a+b} \cdot T^{-2b}$$
- **T**: $-2b = 1 \to b = -\frac{1}{2}$.
- **M**: $a + b = 0 \to a = \frac{1}{2}$.

$\to T = C\cdot m^{1/2}\cdot\kappa^{-1/2} =$ **$C\cdot\sqrt{m/\kappa}$**. So công thức thật $T = 2\pi\sqrt{m/\kappa}$: đúng dạng, $C = 2\pi$. Diễn giải: lò xo cứng hơn ($\kappa$ lớn) → dao động nhanh hơn ($T$ nhỏ); vật nặng hơn ($m$ lớn) → dao động chậm hơn ($T$ lớn) — khớp trực giác.

**Bài 6.**
- (a) **Tài khoản tiết kiệm cộng lãi cuối tháng**: *tất định* (lãi suất cho trước, tính chính xác), *rời rạc* (cập nhật theo bước tháng $n = 0,1,2,\dots$), *động* (theo dõi qua thời gian). → công cụ: dãy đệ quy $A_{n+1} = A_n(1+r)$.
- (b) **Hạt phấn hoa (chuyển động Brown)**: *ngẫu nhiên* (va chạm phân tử là may rủi, mỗi lần chạy ra quỹ đạo khác), *liên tục* (vị trí và thời gian là biến thực), *động*. → công cụ: quá trình ngẫu nhiên / phương trình vi phân ngẫu nhiên.
- (c) **Cân bằng cung–cầu định giá**: *tất định*, *liên tục* (giá là biến thực), *tĩnh* (chỉ tìm trạng thái cân bằng $p^*$ thỏa $Q_s(p)=Q_d(p)$, không theo dõi đường đi). → công cụ: giải phương trình đại số.

**Bài 7.** Sai lệch $e_i = y_i - \hat{y}_i = [4, -4, -5, 2]$.
- (a)
$$\begin{aligned}
\text{MAE} &= \tfrac{1}{4}(|4|+|{-}4|+|{-}5|+|2|) = \tfrac{1}{4}(4+4+5+2) = \tfrac{15}{4} = 3.75 \\
\text{RMSE} &= \sqrt{\tfrac{1}{4}(4^2 + (-4)^2 + (-5)^2 + 2^2)} = \sqrt{\tfrac{16+16+25+4}{4}} = \sqrt{\tfrac{61}{4}} = \sqrt{15.25} \approx 3.91
\end{aligned}$$
- (b) **RMSE ≥ MAE luôn đúng** (bất đẳng thức về trung bình bình phương ≥ trung bình). RMSE bình phương từng lệch trước khi lấy trung bình rồi căn → các lệch lớn (ở đây $-5$) bị *phạt nặng* hơn, kéo RMSE (3.91) lên cao hơn MAE (3.75). Hai số chỉ bằng nhau khi mọi $|e_i|$ như nhau.
- (c) **Không đáng tin.** Tham số đã được hiệu chỉnh để khớp đúng 4 tháng này; đo sai số trên chính chúng là "chấm bài mình tự ra" → sai số lạc quan giả, có thể che giấu overfit. Muốn ước lượng trung thực khả năng dự báo tháng 5, phải giữ riêng một tập **test** (dữ liệu không dùng hiệu chỉnh) và đo trên đó (mục 8.3).

---

## 11. Bài tiếp theo

[Lesson 02 — Mô hình từ dữ liệu (hồi quy bình phương tối thiểu)](../lesson-02-empirical-curve-fitting/): khi chưa biết quy luật, ta *khớp* mô hình từ số liệu đo được — và cách tìm hằng số k như ở mục 5 sẽ được tổng quát hóa.

## 📝 Tổng kết

1. **Mô hình** = mô tả đơn giản hóa hiện thực bằng biến + phương trình, dưới giả định rõ ràng. "Mọi mô hình đều sai, nhưng một số hữu ích."
2. **Chu trình 6 bước**: Bài toán → Giả định → Lập mô hình → Giải → Kiểm chứng → Tinh chỉnh, lặp lại đến khi *đủ tốt*.
3. **Giả định** là công tắc đánh đổi độ chính xác ↔ độ đơn giản; luôn nêu rõ phạm vi và cảnh báo toy model.
4. **Phân tích thứ nguyên**: hai vế cùng thứ nguyên (điều kiện cần); loại nhanh công thức sai; đoán được *dạng* công thức (vd chu kỳ con lắc $\propto \sqrt{\ell/g}$, không phụ thuộc khối lượng).
5. **Ví dụ cà phê nguội** minh họa trọn chu trình bằng số — khuôn mẫu cho các lesson sau.
6. **Biến / tham số / hằng số**: biến độc lập → mô hình → biến phụ thuộc; tham số cố định mỗi lần chạy và *hiệu chỉnh từ dữ liệu*; hằng số (g, π, e) tra bảng. Phân vai sai → giải sai bài.
7. **Phân loại mô hình** theo 3 trục: tất định↔ngẫu nhiên, liên tục↔rời rạc, tĩnh↔động — loại quyết định công cụ toán (ODE / dãy đệ quy / đại số / xác suất).
8. **Kiểm chứng & sai số**: phân biệt sai số mô hình (đổi cấu trúc mới giảm) ↔ sai số tham số (thêm dữ liệu giảm); đo bằng MAE/RMSE; **train/test split** chống ngộ nhận overfit; chạy *sniff test* (giới hạn, dấu/miền, thứ nguyên) trước khi tính.
