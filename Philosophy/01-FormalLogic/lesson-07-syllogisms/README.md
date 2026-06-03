# Lesson 07 — Tam đoạn luận (Syllogisms)

> **Tầng 1 — Formal Logic · Bài 7/8**

Bài này trả lời câu hỏi: **làm thế nào để kiểm tra một lập luận 3 bước có hợp lệ về mặt hình thức hay không?** Đây là hệ thống Aristotle xây dựng hơn 2.300 năm trước — và vẫn là nền tảng của logic hình thức hiện đại. Công cụ chính là **sơ đồ Venn 3 vòng**: tô đúng các vùng theo tiền đề, rồi đọc kết quả.

---

## Mục tiêu học tập

Sau bài này, bạn có thể:

- Phân biệt 4 loại mệnh đề phạm trù: A, E, I, O và viết chúng theo dạng chuẩn.
- Xác định đại từ (P), tiểu từ (S) và trung từ (M) trong một tam đoạn luận.
- Dùng sơ đồ Venn 3 vòng để kiểm tra tính hợp lệ (validity) của tam đoạn luận.
- Nhận diện ngụy biện **trung từ không chu diên** (undistributed middle) — lỗi phổ biến nhất.
- Hiểu vì sao "hai tiền đề đúng + kết luận đúng" KHÔNG đảm bảo lập luận hợp lệ.

## Kiến thức tiền đề

- Mệnh đề, giá trị chân lý và biến vị từ → [Lesson 05 — Logic vị từ](../lesson-05-predicate-logic/)
- Tính hợp lệ của suy luận (validity vs. soundness) → [Lesson 04 — Hợp lệ & Suy luận](../lesson-04-validity-inference/)
- Phương pháp chứng minh và phản chứng → [Lesson 06 — Phương pháp chứng minh](../lesson-06-proof-methods/)

---

## 1. Bốn loại mệnh đề phạm trù (A, E, I, O)

> 💡 **Trực giác.** Khi nói về một tập hợp đồ vật, ta có 4 cách cơ bản để phát biểu mối quan hệ giữa hai tập: "tất cả đều thuộc", "không cái nào thuộc", "một số thuộc", "một số không thuộc". Bốn cách này là nền tảng của mọi suy luận Aristotle.

Mệnh đề **phạm trù (categorical)** là mệnh đề khẳng định hoặc phủ định một tập (S) thuộc về tập khác (P) theo một mức độ nhất định.

| Ký hiệu | Tên đầy đủ | Dạng chuẩn | Ví dụ |
|:-------:|-----------|------------|-------|
| **A** | Toàn xưng khẳng định | *Mọi S là P* | Mọi chó đều là động vật |
| **E** | Toàn xưng phủ định | *Không S nào là P* | Không con cá nào là thú |
| **I** | Đặc xưng khẳng định | *Một số S là P* | Một số sinh viên là nhạc sĩ |
| **O** | Đặc xưng phủ định | *Một số S không là P* | Một số chim không biết bay |

Tên A, E, I, O bắt nguồn từ tiếng Latin: **A**ffirmo (tôi khẳng định) → A, I; n**E**go (tôi phủ định) → E, O.

### 1.1. Chu diên (Distribution)

Một hạn từ (term) được gọi là **chu diên** trong mệnh đề nếu mệnh đề đó nói về **tất cả** các phần tử của tập hợp đó.

| Mệnh đề | S chu diên? | P chu diên? |
|:-------:|:-----------:|:-----------:|
| A: *Mọi S là P* | Có | Không |
| E: *Không S nào là P* | Có | Có |
| I: *Một số S là P* | Không | Không |
| O: *Một số S không là P* | Không | Có |

**Ví dụ (≥ 4) giải thích chu diên:**

1. **A — "Mọi mèo là động vật có vú"**: S = mèo chu diên (nói về *tất cả* mèo); P = động vật có vú *không* chu diên (chỉ nói rằng mèo *thuộc về* tập đó, không nói gì về toàn bộ tập động vật có vú).

2. **E — "Không con cá nào là bò sát"**: Cả S = cá và P = bò sát đều chu diên — mệnh đề xác nhận không có phần tử nào thuộc *giao* của hai tập, nên phải nói đến toàn bộ cả hai.

3. **I — "Một số học sinh là nhà vô địch"**: Cả S = học sinh và P = nhà vô địch đều *không* chu diên — chỉ nói rằng có *một phần* giao nhau, không xác định bao nhiêu.

4. **O — "Một số nghệ sĩ không phải triệu phú"**: S = nghệ sĩ không chu diên (chỉ nói về *một số*); P = triệu phú chu diên — bởi những nghệ sĩ được nhắc tới bị loại ra *khỏi toàn bộ* tập triệu phú.

> ⚠ **Lỗi thường gặp:** Nhầm "Mọi S là P" (A) với "P là S" (đảo ngược). "Mọi chó là động vật" *không* có nghĩa "Mọi động vật là chó." Đảo mệnh đề A là sai logic; chỉ có mệnh đề E mới đảo được nguyên vẹn.

> 🔁 **Dừng lại tự kiểm tra.** Phân loại và xác định chu diên:
> - (a) "Không người nào là thiên thần."
> - (b) "Một số hoa hồng là màu đỏ."
> <details><summary>Đáp án</summary>
>
> (a) **E** — "Không người nào là thiên thần." S = người: chu diên; P = thiên thần: chu diên.
>
> (b) **I** — "Một số hoa hồng là màu đỏ." S = hoa hồng: không chu diên; P = màu đỏ: không chu diên.
> </details>

> 📝 **Tóm tắt mục 1.** Bốn loại mệnh đề phạm trù: A (mọi S là P), E (không S nào là P), I (một số S là P), O (một số S không là P). Chu diên = mệnh đề nói về *toàn bộ* tập đó. A: S chu diên. E: cả hai chu diên. I: không ai. O: chỉ P.

---

## 2. Cấu trúc tam đoạn luận (Syllogism)

> 💡 **Trực giác.** Tam đoạn luận giống chiếc cầu nối: muốn đi từ A đến C, ta đi qua B. "B liên quan đến C, A liên quan đến B, vậy A liên quan đến C." Cái khéo là B phải biến mất ở kết luận — nó chỉ là cầu nối trung gian.

Một **tam đoạn luận phạm trù (categorical syllogism)** gồm:

- **Hai tiền đề** (premises) + **một kết luận** (conclusion).
- Chính xác **3 hạn từ** (terms), mỗi hạn từ xuất hiện đúng 2 lần trong toàn bộ lập luận:
  - **Đại từ (major term, P)**: vị ngữ của kết luận.
  - **Tiểu từ (minor term, S)**: chủ ngữ của kết luận.
  - **Trung từ (middle term, M)**: xuất hiện trong cả hai tiền đề, *không* xuất hiện trong kết luận — đây là "cầu nối" logic.

**Cấu trúc chuẩn:**

```
Tiền đề lớn (Major premise): [liên quan đến M và P]
Tiền đề nhỏ (Minor premise): [liên quan đến S và M]
Kết luận:                    [liên quan đến S và P]
```

### 2.1. Ví dụ giải thích đủ 4 thành phần

**Ví dụ 1 — Barbara (hợp lệ):**
```
Tiền đề lớn: Mọi người đều phải chết.        (M = người, P = phải chết)
Tiền đề nhỏ: Mọi người Hy Lạp là người.      (S = người Hy Lạp, M = người)
Kết luận:    Mọi người Hy Lạp đều phải chết. (S = người Hy Lạp, P = phải chết)
```
- Trung từ M = "người": xuất hiện đúng ở 2 tiền đề, biến mất ở kết luận. ✓

**Ví dụ 2 — Dạng E/I (hợp lệ):**
```
Tiền đề lớn: Không nhà khoa học nào là người lười biếng.  (E)
Tiền đề nhỏ: Một số giáo viên là nhà khoa học.            (I)
Kết luận:    Một số giáo viên không là người lười biếng.  (O)
```
- S = giáo viên, P = người lười biếng, M = nhà khoa học.

**Ví dụ 3 — Ngụy biện (KHÔNG hợp lệ):**
```
Tiền đề lớn: Mọi chó là động vật.   (A)
Tiền đề nhỏ: Mọi mèo là động vật.   (A)
Kết luận:    Mọi mèo là chó.         (A) ← SAI HÌNH THỨC!
```
- M = "động vật": không chu diên ở cả hai tiền đề → ngụy biện **trung từ không chu diên**.

**Ví dụ 4 — Kết luận đúng nhưng lập luận KHÔNG hợp lệ:**
```
Tiền đề lớn: Mọi động vật có vú đều thở.  (A)
Tiền đề nhỏ: Mọi cá heo đều thở.          (A)
Kết luận:    Mọi cá heo là động vật có vú. (A) ← Kết luận đúng thực tế, nhưng...
```
- Lập luận **không hợp lệ** vì cùng lỗi trung từ không chu diên (M = "thở"). Thực tế cá heo có vú là sự thật độc lập — không phải do lập luận này chứng minh được!

> ❓ **Câu hỏi tự nhiên của người đọc.**
> - *"Thứ tự tiền đề có quan trọng không?"* — Theo quy ước, tiền đề lớn (chứa P) đặt trước. Nhưng về mặt logic, thứ tự không ảnh hưởng đến tính hợp lệ — miễn là ta xác định đúng S, P, M.
> - *"Có bao nhiêu dạng tam đoạn luận?"* — Có 4 "hình" (figures) × 64 tổ hợp A/E/I/O = 256 dạng lý thuyết. Chỉ khoảng 15–24 dạng là hợp lệ (tùy hệ thống giải thích existential import).

> 📝 **Tóm tắt mục 2.** Tam đoạn luận = 2 tiền đề + 1 kết luận, 3 hạn từ (S, P, M). M là cầu nối, biến mất ở kết luận. Phân biệt: dạng hợp lệ cần M chu diên ít nhất một lần.

---

## 3. Kiểm tra bằng sơ đồ Venn 3 vòng

> 💡 **Trực giác.** Vẽ 3 vòng tròn chồng lên nhau, mỗi vòng là một tập hợp. Tô (gạch) vùng *rỗng* (không có phần tử). Đặt dấu × vào vùng *có phần tử*. Sau khi áp dụng xong 2 tiền đề, nhìn xem kết luận có "tự hiện ra" trong sơ đồ không — nếu có, lập luận hợp lệ; nếu không, không hợp lệ.

### 3.1. Bố cục sơ đồ Venn 3 vòng

```
         [ S ]
        /     \
   [S∩M]     [S∩P]
  /   [S∩M∩P]   \
[ M ]       [ P ]
   \  [M∩P] /
```

Ba vòng S, P, M tạo ra **8 vùng**:
1. Chỉ S (không M, không P)
2. S ∩ M (không P)
3. S ∩ P (không M)
4. S ∩ M ∩ P (giao cả ba)
5. Chỉ M (không S, không P)
6. M ∩ P (không S)
7. Chỉ P (không S, không M)
8. Ngoài cả ba vòng

### 3.2. Quy tắc tô sơ đồ

| Loại mệnh đề | Nội dung | Hành động |
|:------------:|----------|-----------|
| **A**: Mọi S là P | Không có S nào nằm ngoài P | Tô (gạch) vùng "S nhưng không P" |
| **E**: Không S nào là P | Không có giao S∩P | Tô (gạch) vùng S∩P |
| **I**: Một số S là P | Có ít nhất một phần tử trong S∩P | Đặt × vào S∩P |
| **O**: Một số S không là P | Có ít nhất một phần tử trong S nhưng không P | Đặt × vào "S không P" |

**Quy tắc quan trọng:** Luôn vẽ mệnh đề **toàn xưng (A/E) trước**, mệnh đề đặc xưng (I/O) sau. Lý do: tô vùng trước có thể xác định vị trí dấu × chính xác hơn.

### 3.3. Walk-through: Barbara (AAA-1)

**Tiền đề lớn (A):** "Mọi M là P" → Tô gạch vùng M-không-P (gồm: chỉ M, và M∩S không có P).

**Tiền đề nhỏ (A):** "Mọi S là M" → Tô gạch vùng S-không-M (gồm: chỉ S, và S∩P không có M).

**Sau khi tô xong:** Vùng "S không P" không còn phần tử (đã bị tô bởi cả hai tiền đề).

**Kết luận (A):** "Mọi S là P" ← kiểm tra: vùng "S không P" có rỗng không? → **Có** → Lập luận **HỢP LỆ** ✓

### 3.4. Walk-through: Ngụy biện trung từ không chu diên

**Tiền đề lớn (A):** "Mọi chó là động vật" (M = chó, P = động vật) → Tô vùng M-không-P.

**Tiền đề nhỏ (A):** "Mọi mèo là động vật" (S = mèo, P = động vật) → Tô vùng S-không-P.

**Sau khi tô xong:** Vùng "S không P" và "M không P" đều rỗng — nhưng vùng "S-không-M" *bên trong P* vẫn có thể có phần tử (mèo không phải chó nhưng vẫn là động vật).

**Kết luận:** "Mọi mèo là chó" ← kiểm tra: vùng "S không M" có rỗng không? → **Không** (sơ đồ không đảm bảo điều đó) → Lập luận **KHÔNG HỢP LỆ** ✗

> ⚠ **Ngụy biện trung từ không chu diên (Undistributed Middle):** Xảy ra khi M không chu diên trong *cả hai* tiền đề. Ví dụ: "Mọi A là C; Mọi B là C; vậy Mọi A là B" — sai hoàn toàn về hình thức. Đây là lỗi phổ biến nhất trong lập luận đời thường.

> ❓ **Câu hỏi tự nhiên của người đọc.**
> - *"Nếu kết luận đúng trong thực tế nhưng không ra từ sơ đồ, lập luận có hợp lệ không?"* — Không. Hợp lệ (validity) chỉ xét hình thức: kết luận có *bắt buộc đúng* nếu tiền đề đúng không. Nếu kết luận đúng vì lý do khác, đó là sự trùng hợp — lập luận vẫn là ngụy biện.
> - *"Venn 3 vòng bất tiện ở đâu?"* — Với mệnh đề I/O, đôi khi ta chưa biết đặt × ở tiểu vùng nào (2 vùng chồng nhau có thể cùng hợp lệ) → phải đặt × trên đường biên giữa hai vùng, nghĩa là "ít nhất một vùng không rỗng".

> 🔁 **Dừng lại tự kiểm tra.** Kiểm tra hợp lệ bằng sơ đồ Venn:
> ```
> Mọi nhà thơ là người nhạy cảm.  (A)
> Một số sinh viên là nhà thơ.     (I)
> ∴ Một số sinh viên là người nhạy cảm. (I)
> ```
> <details><summary>Đáp án</summary>
>
> S = sinh viên, P = người nhạy cảm, M = nhà thơ.
>
> Tiền đề lớn A: tô vùng M-không-P (mọi nhà thơ đều nằm trong P).
>
> Tiền đề nhỏ I: đặt × vào S∩M. Vùng S∩M-không-P đã bị tô → × bắt buộc rơi vào S∩M∩P.
>
> Kết luận I: "Một số sinh viên là người nhạy cảm" — cần × trong S∩P → **Có** (dấu × tại S∩M∩P) → **HỢP LỆ** ✓
> </details>

> 📝 **Tóm tắt mục 3.** Sơ đồ Venn 3 vòng: tô vùng rỗng (tiền đề A/E), đặt × vào vùng có phần tử (I/O). Luôn tô A/E trước. Sau đó kiểm tra kết luận có "bắt buộc xuất hiện" không. Nếu sơ đồ không ép buộc kết luận → không hợp lệ.

---

## 4. Các dạng hợp lệ kinh điển

> 💡 **Trực giác.** Aristotle và các học trò đặt tên Latin cho từng dạng hợp lệ như mật mã: các nguyên âm trong tên mã hóa loại (A/E/I/O) của tiền đề lớn, tiền đề nhỏ, và kết luận. "Barbara" = AAA (3 mệnh đề toàn xưng khẳng định).

### 4.1. Barbara (AAA-1) — dạng cơ bản nhất

```
Mọi M là P.  (A)
Mọi S là M.  (A)
∴ Mọi S là P. (A)
```

**Ví dụ:** "Mọi kim loại dẫn điện; Sắt là kim loại; ∴ Sắt dẫn điện." ✓

### 4.2. Celarent (EAE-1)

```
Không M nào là P.   (E)
Mọi S là M.         (A)
∴ Không S nào là P. (E)
```

**Ví dụ:** "Không loài bò sát nào có lông; Mọi rắn là bò sát; ∴ Không con rắn nào có lông." ✓

### 4.3. Darii (AII-1)

```
Mọi M là P.          (A)
Một số S là M.       (I)
∴ Một số S là P.     (I)
```

**Ví dụ:** "Mọi triết gia đều tư duy sâu sắc; Một số giáo sư là triết gia; ∴ Một số giáo sư tư duy sâu sắc." ✓

### 4.4. Ferio (EIO-1)

```
Không M nào là P.         (E)
Một số S là M.            (I)
∴ Một số S không là P.   (O)
```

**Ví dụ:** "Không loài cá nào có phổi; Một số sinh vật biển là cá; ∴ Một số sinh vật biển không có phổi." ✓

> ⚠ **Lỗi thường gặp: tin vào "âm thanh" thay vì "hình thức".** Lập luận nghe có vẻ thuyết phục không có nghĩa là hợp lệ. "Mọi đạo đức gia là người lương thiện; Ông X là người lương thiện; ∴ Ông X là đạo đức gia" — nghe ổn nhưng là ngụy biện khẳng định hệ quả (affirming the consequent / undistributed middle). Phải kiểm tra bằng Venn, không tin vào "cảm giác đúng".

> 📝 **Tóm tắt mục 4.** Bốn dạng hợp lệ kinh điển: Barbara (AAA), Celarent (EAE), Darii (AII), Ferio (EIO) — đều thuộc "Hình 1" (tiền đề lớn chứa M là chủ ngữ). Tên Latin mã hóa loại mệnh đề theo nguyên âm.

---

## 5. Tóm tắt quy tắc hợp lệ

Một tam đoạn luận **HỢP LỆ** khi và chỉ khi thỏa mãn **tất cả** các điều kiện sau:

1. **Trung từ M phải chu diên ít nhất một lần** trong hai tiền đề.
2. **Nếu một hạn từ chu diên ở kết luận, nó phải chu diên ở tiền đề tương ứng** (không được "mở rộng" hạn từ ở kết luận).
3. **Không thể rút ra kết luận khẳng định từ hai tiền đề phủ định.**
4. **Nếu có một tiền đề phủ định, kết luận phải phủ định** (và ngược lại).
5. **Không thể rút ra kết luận toàn xưng từ hai tiền đề đặc xưng.**

> ❓ **Câu hỏi tự nhiên.**
> - *"Nếu lập luận hợp lệ (valid) thì có đảm bảo kết luận đúng không?"* — Không, trừ khi tiền đề cũng đúng. Lập luận **đúng đắn (sound)** = hợp lệ + tiền đề đúng. Hợp lệ đơn thuần chỉ đảm bảo "nếu tiền đề đúng thì kết luận đúng" — còn tiền đề có đúng hay không là câu hỏi riêng.
> - *"Tam đoạn luận có giới hạn gì?"* — Chỉ xử lý 3 hạn từ và các mệnh đề phạm trù đơn giản. Logic vị từ (Lesson 05) mạnh hơn nhiều và bao trùm tam đoạn luận như trường hợp đặc biệt.

---

## Bài tập

**Bài 1.** Phân loại mỗi mệnh đề sau là A, E, I, hay O; và xác định S và P:
- (a) "Không con muỗi nào là đáng mến."
- (b) "Một số bài toán là không thể giải được."
- (c) "Mọi hành tinh đều quay quanh Mặt Trời."
- (d) "Một số nhà chính trị không phải là người trung thực."

**Bài 2.** Xác định S, P, M trong tam đoạn luận sau, và phân loại tiền đề + kết luận:
```
Mọi triệu phú đều giàu có.        (?)
Một số nghệ sĩ là triệu phú.      (?)
∴ Một số nghệ sĩ là giàu có.      (?)
```

**Bài 3.** Kiểm tra hợp lệ bằng sơ đồ Venn:
```
Không con cá nào có lông.   (E)
Mọi cá mập là cá.           (A)
∴ Không con cá mập nào có lông. (E)
```

**Bài 4.** Phát hiện ngụy biện và giải thích:
```
Mọi chính khách đều nói dối.
Một số người nói dối là giáo viên.
∴ Một số giáo viên là chính khách.
```

**Bài 5.** Điền dạng mệnh đề phù hợp để tạo tam đoạn luận hợp lệ:
```
_______________________ (Tiền đề lớn, loại E)
Mọi học sinh lớp này là người trẻ.  (A)
∴ Một số người trẻ không thích toán. (O) ← Gợi ý: xem lại để kết luận hợp lệ
```
*(Viết một tiền đề lớn dạng O để toàn bộ lập luận có ít nhất một tiền đề phủ định.)*

---

## Lời giải chi tiết

**Bài 1.**

- (a) **E** — S = muỗi, P = đáng mến. "Không con muỗi nào là đáng mến." Cả S và P đều chu diên.
- (b) **I** — S = bài toán, P = không thể giải được. "Một số bài toán là không thể giải được." Cả S và P đều không chu diên.
- (c) **A** — S = hành tinh, P = quay quanh Mặt Trời. "Mọi hành tinh đều quay quanh Mặt Trời." S chu diên, P không chu diên.
- (d) **O** — S = nhà chính trị, P = người trung thực. "Một số nhà chính trị không phải là người trung thực." S không chu diên, P chu diên.

**Bài 2.**

- S = nghệ sĩ (chủ ngữ kết luận), P = giàu có (vị ngữ kết luận), M = triệu phú (xuất hiện trong cả hai tiền đề, biến mất ở kết luận).
- Tiền đề lớn: **A** ("Mọi M là P"). Tiền đề nhỏ: **I** ("Một số S là M"). Kết luận: **I** ("Một số S là P").
- Đây là dạng **Darii (AII-1)** — **HỢP LỆ** ✓. M = "triệu phú" chu diên ở tiền đề lớn (dạng A → S chu diên). Kiểm tra Venn: tô vùng M-không-P → đặt × vào S∩M → × bắt buộc nằm trong S∩M∩P ⊂ S∩P → kết luận I hiển thị ✓.

**Bài 3.**

S = cá mập, P = có lông, M = cá.

- Tiền đề lớn E: "Không con cá nào có lông" → Tô (gạch) vùng M∩P (mọi giao điểm của M và P đều rỗng).
- Tiền đề nhỏ A: "Mọi cá mập là cá" → Tô vùng S-không-M (tất cả cá mập phải nằm trong M).
- Kiểm tra kết luận E: "Không con cá mập nào có lông" — cần S∩P rỗng. Vùng S∩M∩P đã bị tô ở tiền đề lớn; vùng S∩P-không-M đã bị tô ở tiền đề nhỏ (vì mọi S thuộc M). → Toàn bộ S∩P rỗng ✓ → **HỢP LỆ** ✓

Đây là dạng **Celarent (EAE-1)**.

**Bài 4.**

S = giáo viên, P = chính khách, M = người nói dối.

- Tiền đề lớn A: "Mọi chính khách đều nói dối." → Đây là mệnh đề về P và M: "Mọi P là M."
- Tiền đề nhỏ I: "Một số người nói dối là giáo viên." → "Một số M là S."
- Kết luận A: "Một số giáo viên là chính khách." → "Một số S là P."

**Phân tích:** Tiền đề lớn có M là *vị ngữ* (M = người nói dối), dạng "Mọi P là M" → M *không chu diên* ở đây (chỉ nói P thuộc M, không nói về toàn bộ M). Tiền đề nhỏ dạng I → M cũng không chu diên. **M không chu diên ở cả hai tiền đề** → **Ngụy biện trung từ không chu diên** → **KHÔNG HỢP LỆ** ✗.

Thực tế: có thể nhiều giáo viên không phải chính khách, dù cả hai nhóm đều có người nói dối.

**Bài 5.**

Để kết luận O ("Một số người trẻ không thích toán") từ tiền đề nhỏ A ("Mọi học sinh lớp này là người trẻ"), tiền đề lớn phải kết nối "học sinh lớp này" với "thích toán" theo kiểu tạo ra O.

Tiền đề lớn hợp lý: **"Một số học sinh lớp này không thích toán."** (dạng O)

```
Một số học sinh lớp này không thích toán.  (O)
Mọi học sinh lớp này là người trẻ.         (A)
∴ Một số người trẻ không thích toán.       (O)
```

S = người trẻ, P = thích toán, M = học sinh lớp này.
Kiểm tra: M chu diên ở tiền đề nhỏ (dạng A → S chu diên, S = học sinh lớp này = M) → **M chu diên ít nhất một lần** ✓. Có tiền đề phủ định → kết luận phủ định ✓. **HỢP LỆ** ✓.

---

## Code & Minh họa

- [visualization.html](./visualization.html) — Sơ đồ Venn tương tác: chọn tiền đề A/E/I/O, xem vùng tô và dấu × xuất hiện tự động, kiểm tra kết luận ngay trong trình duyệt. Bộ sưu tập ví dụ kinh điển + ngụy biện. Bảng 4 loại mệnh đề A/E/I/O có thể tương tác.

---

## Bài tiếp theo

→ **[Lesson 08 — Quy nạp vs Diễn dịch](../lesson-08-induction-deduction/)**: Tam đoạn luận là ví dụ điển hình của suy luận **diễn dịch** (deductive) — đi từ cái chung đến cái riêng, kết luận bắt buộc đúng nếu tiền đề đúng. Lesson 08 so sánh nó với suy luận **quy nạp** (inductive) — đi từ quan sát đến giả thuyết tổng quát, kết luận chỉ có xác suất, không bắt buộc.

[⬆ Về Formal Logic](../index.html) · [🏠 Trang chính Philosophy](../../index.html)
