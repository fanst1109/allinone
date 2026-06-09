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

📝 **Tóm tắt mục 3**

- Giả định = công tắc tắt bớt độ phức tạp; đổi độ chính xác lấy độ giải được.
- Các loại: bỏ yếu tố nhỏ, coi hằng, tuyến tính hóa, rời rạc↔liên tục, trộn đều.
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

## 6. Bài tập

**Bài 1.** Kiểm tra thứ nguyên công thức năng lượng tiềm năng hấp dẫn $E = m\cdot g\cdot h$. Kết quả có đúng thứ nguyên năng lượng ($M\cdot L^2\cdot T^{-2}$) không?

**Bài 2.** Một mô hình tính *vận tốc* cuối của vật rơi tự do từ độ cao $h$ được viết là $v = g\cdot h$. Dùng phân tích thứ nguyên chỉ ra công thức này sai, và đoán dạng đúng.

**Bài 3.** Liệt kê tối thiểu 3 giả định bạn sẽ đặt khi mô hình hóa "thời gian một thang máy đi từ tầng 1 lên tầng 10".

**Bài 4.** (End-to-end rút gọn) Một bồn nước ban đầu có 100 lít, nước chảy ra với tốc độ tỉ lệ lượng nước hiện có: $dV/dt = -0.2\cdot V$ ($V$ tính bằng lít, $t$ bằng phút). (a) Tìm $V(t)$. (b) Sau bao lâu còn 50 lít? (c) Kiểm chứng giới hạn $t\to\infty$.

**Bài 5.** Chu kỳ dao động của một vật khối lượng $m$ gắn vào lò xo độ cứng $\kappa$ (thứ nguyên $[\kappa] = M\cdot T^{-2}$, vì $F = \kappa\cdot x$). Dùng phân tích thứ nguyên đoán dạng công thức chu kỳ $T$ theo $m$ và $\kappa$.

---

## 7. Lời giải chi tiết

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

---

## 8. Bài tiếp theo

[Lesson 02 — Mô hình từ dữ liệu (hồi quy bình phương tối thiểu)](../lesson-02-empirical-curve-fitting/): khi chưa biết quy luật, ta *khớp* mô hình từ số liệu đo được — và cách tìm hằng số k như ở mục 5 sẽ được tổng quát hóa.

## 📝 Tổng kết

1. **Mô hình** = mô tả đơn giản hóa hiện thực bằng biến + phương trình, dưới giả định rõ ràng. "Mọi mô hình đều sai, nhưng một số hữu ích."
2. **Chu trình 6 bước**: Bài toán → Giả định → Lập mô hình → Giải → Kiểm chứng → Tinh chỉnh, lặp lại đến khi *đủ tốt*.
3. **Giả định** là công tắc đánh đổi độ chính xác ↔ độ đơn giản; luôn nêu rõ phạm vi và cảnh báo toy model.
4. **Phân tích thứ nguyên**: hai vế cùng thứ nguyên (điều kiện cần); loại nhanh công thức sai; đoán được *dạng* công thức (vd chu kỳ con lắc $\propto \sqrt{\ell/g}$, không phụ thuộc khối lượng).
5. **Ví dụ cà phê nguội** minh họa trọn chu trình bằng số — khuôn mẫu cho các lesson sau.
