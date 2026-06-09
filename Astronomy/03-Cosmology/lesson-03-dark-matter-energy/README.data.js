// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: Astronomy/03-Cosmology/lesson-03-dark-matter-energy/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 03 — Vật chất tối & Năng lượng tối (Dark Matter & Dark Energy)

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Hiểu vì sao **đường cong quay thiên hà (galaxy rotation curve)** lại "phẳng", trái với dự đoán Kepler — bằng chứng đầu tiên cho **vật chất tối (dark matter)**.
- Liệt kê các bằng chứng khác: **thấu kính hấp dẫn (gravitational lensing)**, động học **đám thiên hà (galaxy clusters)**.
- Hiểu **năng lượng tối (dark energy)** làm giãn nở **tăng tốc**, phát hiện qua **siêu tân tinh loại Ia (Type Ia supernovae)**.
- Đọc "ngân sách năng lượng vũ trụ": vật chất thường **~5%**, vật chất tối **~27%**, năng lượng tối **~68%**.

## Kiến thức tiền đề

- [Lesson 01 — Vũ trụ giãn nở](../lesson-01-expanding-universe/) và [Lesson 02 — Big Bang & CMB](../lesson-02-big-bang-cmb/).
- Lực hấp dẫn & chuyển động tròn (định luật Newton, định luật Kepler): [\`../../../Physics/\`](../../../Physics/) — bài này dùng $v = \\sqrt{\\dfrac{G \\, M}{r}}$.

---

## 1. Đường cong quay thiên hà — bằng chứng vật chất tối

> 💡 **Trực giác / Hình dung.** Hệ Mặt Trời: hành tinh xa quay **chậm** hơn hành tinh gần (Sao Hải Vương bò chậm, Sao Thủy chạy nhanh) — vì gần như toàn bộ khối lượng dồn ở Mặt Trời ở giữa. Newton/Kepler tiên đoán: càng ra xa khối lượng trung tâm, tốc độ quay càng giảm. Vậy **các sao ở rìa thiên hà phải quay chậm dần**. Nhưng quan sát cho thấy chúng quay **nhanh ngang** sao ở trong — đường cong quay **phẳng**. Phải có khối lượng "vô hình" kéo chúng.

**Định nghĩa đường cong quay (3 phần):**

- **(a) Là gì** — Đồ thị **tốc độ quay $v$** của sao/khí quanh tâm thiên hà theo **khoảng cách $r$** tới tâm.
- **(b) Vì sao quan trọng** — Tốc độ quay cho biết **khối lượng** nằm bên trong bán kính đó (qua hấp dẫn). So đường cong đo được với đường cong dự đoán từ khối lượng nhìn thấy → biết có "thiếu hụt" khối lượng hay không.
- **(c) Ví dụ số** — Dự đoán Kepler (chỉ tính khối lượng sáng) cho $v \\propto 1/\\sqrt{r}$: ở $r = 4$ lần xa hơn, $v$ phải giảm $\\sqrt{4} = 2$ lần. Thực đo: $v$ gần như **không đổi** từ $r = 2 \\ \\text{kpc}$ tới $r = 20 \\ \\text{kpc}$.

**Công thức tốc độ quỹ đạo (cân bằng hấp dẫn = hướng tâm):**

$$v(r) = \\sqrt{\\frac{G \\, M(r)}{r}}$$

với $M(r)$ = khối lượng nằm trong bán kính $r$.

**Walk-through bằng số thật (verify):** Nếu toàn bộ khối lượng nằm ở tâm ($M(r) = M$ không đổi với $r$ lớn), thì:

$$\\begin{aligned}
v &\\propto \\frac{1}{\\sqrt{r}} \\\\
r \\text{ tăng 4 lần} &\\Rightarrow v \\text{ giảm } \\sqrt{4} = 2 \\text{ lần} \\\\
v(5 \\ \\text{kpc}) = 200 \\ \\text{km/s} &\\Rightarrow v(20 \\ \\text{kpc}) = \\frac{200}{2} = 100 \\ \\text{km/s}
\\end{aligned}$$

Nhưng quan sát: $v(20 \\ \\text{kpc}) \\approx 200 \\ \\text{km/s}$ (phẳng!). Để $v$ không đổi khi $r$ tăng, cần $M(r) \\propto r$ — tức **khối lượng vẫn tiếp tục tăng** ra tới tận rìa, dù **không thấy** thêm sao nào ⇒ tồn tại **vật chất tối** trải rộng thành quầng (halo).

> ❓ **Câu hỏi tự nhiên của người đọc.**
> - *"Sao biết là vật chất 'tối' chứ không phải mình tính sai khối lượng sáng?"* — Vì đường cong phẳng đòi hỏi khối lượng gấp **5–10 lần** khối lượng của mọi sao + khí nhìn thấy cộng lại. Không thể "quên" nhiều đến vậy. Và nhiều phép đo độc lập (lensing, đám thiên hà) cho cùng kết luận.
> - *"Vật chất tối là gì?"* — Chưa biết chắc. Nó **không phát/hấp thụ ánh sáng** (nên "tối"), chỉ tương tác qua **hấp dẫn**. Ứng viên hàng đầu là các hạt mới ngoài Mô hình Chuẩn (WIMP, axion). Không phải hành tinh/lỗ đen thường (đã loại trừ bằng quan sát).

> ⚠ **Lỗi thường gặp.** "Vật chất tối là lỗ đen / khí lạnh / hành tinh lang thang nên không thấy." Phần lớn đã bị loại: nếu là vật chất thường (baryon) thì sẽ ảnh hưởng tỉ lệ nguyên tố nhẹ (Lesson 04) và CMB theo cách không khớp quan sát. Vật chất tối gần như chắc chắn là **phi-baryon** (không phải proton/neutron).

> 🔁 **Dừng lại tự kiểm tra.** Theo Kepler thuần, một sao ở $r = 9 \\ \\text{kpc}$ so với sao ở $r = 1 \\ \\text{kpc}$ (cùng khối lượng trung tâm) quay nhanh hay chậm hơn, bao nhiêu lần?
> <details><summary>Đáp án</summary>Chậm hơn. $v \\propto 1/\\sqrt{r}$, $r$ tăng 9 lần ⇒ $v$ giảm $\\sqrt{9} = 3$ lần. Nhưng thực tế đường cong phẳng nên nó quay gần bằng — đó là dấu hiệu vật chất tối.</details>

---

## 2. Các bằng chứng khác của vật chất tối

### 2.1 Thấu kính hấp dẫn (gravitational lensing)

> 💡 **Trực giác.** Khối lượng bẻ cong không-thời gian (thuyết tương đối rộng, Lesson 07), nên ánh sáng đi qua gần một khối lượng lớn bị **bẻ cong** như qua một thấu kính. Đo độ bẻ cong → đo tổng khối lượng. Nhiều đám thiên hà bẻ cong ánh sáng **mạnh hơn nhiều** so với khối lượng nhìn thấy cho phép ⇒ có khối lượng vô hình.

Ánh sáng từ thiên hà xa, đi qua một đám thiên hà ở giữa, bị bẻ thành các **cung sáng (arcs)** hoặc nhiều ảnh. Lượng bẻ cong cho "cân" được tổng khối lượng đám — luôn ra gấp nhiều lần khối lượng sáng.

### 2.2 Động học đám thiên hà

Năm 1933, Fritz Zwicky đo tốc độ các thiên hà trong **đám Coma**: chúng chuyển động quá nhanh, lẽ ra đám phải **văng tung** nếu chỉ có khối lượng nhìn thấy. Để giữ đám không tan, cần khối lượng lớn gấp nhiều lần — ông gọi là "vật chất tối" (dunkle Materie). Đây là gợi ý sớm nhất, trước cả đường cong quay.

> ❓ **Câu hỏi tự nhiên.** *"Ba bằng chứng (đường cong quay, lensing, đám thiên hà) có thể cùng sai theo một kiểu không?"* — Khó. Chúng đo ở các thang khác nhau (một thiên hà / ánh sáng bẻ cong / cả đám) bằng phương pháp khác nhau, nhưng đều cho cùng kết luận "thiếu ~5–6 lần khối lượng". Sự nhất quán này khiến vật chất tối rất đáng tin, dù bản chất hạt còn bí ẩn.

> 🔁 **Dừng lại tự kiểm tra.** Vì sao thấu kính hấp dẫn đo được khối lượng mà **không cần** thiên thể đó phát sáng?
> <details><summary>Đáp án</summary>Vì lensing chỉ phụ thuộc khối lượng (qua độ cong không-thời gian), không phụ thuộc thiên thể có phát ánh sáng hay không. Nên nó "thấy" được cả vật chất tối — đo tổng khối lượng kể cả phần vô hình.</details>

---

## 3. Năng lượng tối — giãn nở tăng tốc

> 💡 **Trực giác.** Hấp dẫn của toàn bộ vật chất lẽ ra phải **hãm** giãn nở lại (kéo mọi thứ về nhau, như ném bóng lên thì trọng lực hãm). Cuối thập niên 1990, hai nhóm đo siêu tân tinh loại Ia ở xa và sốc: giãn nở **không hãm mà đang TĂNG TỐC**. Phải có một thứ "đẩy" không gian giãn nhanh hơn — gọi là **năng lượng tối**.

**Định nghĩa năng lượng tối (3 phần):**

- **(a) Là gì** — Một dạng năng lượng tràn ngập không gian, gây **áp suất âm** đẩy không gian giãn **nhanh dần**. Chiếm ~68% tổng năng lượng vũ trụ.
- **(b) Vì sao cần** — Để giải thích vì sao giãn nở tăng tốc (lẽ ra hấp dẫn phải hãm). Không vật chất thường hay vật chất tối nào làm được — chúng chỉ hút, không đẩy.
- **(c) Ví dụ số** — Siêu tân tinh Ia ở $z \\approx 0{,}5$ xuất hiện **mờ hơn ~25%** so với dự đoán trong một vũ trụ chỉ hãm bởi hấp dẫn ⇒ chúng ở **xa hơn** ⇒ giãn nở đã tăng tốc.

**Vì sao dùng siêu tân tinh loại Ia?** Chúng là **"nến chuẩn (standard candle)"**: nổ ở khối lượng giới hạn cố định (giới hạn Chandrasekhar) nên độ sáng thật gần như **luôn bằng nhau**. So **độ sáng biểu kiến** (mờ tới mức nào) với độ sáng thật → biết **khoảng cách**. Kết hợp với redshift → vẽ được lịch sử giãn nở.

> ❓ **Câu hỏi tự nhiên.**
> - *"Tăng tốc nghĩa là gì cụ thể?"* — Tốc độ giãn nở (giữa hai điểm) **tăng dần theo thời gian** thay vì giảm. Khoảng cách giữa các thiên hà xa tăng ngày càng nhanh.
> - *"Năng lượng tối có phải hằng số vũ trụ Λ không?"* — Ứng viên đơn giản nhất là **hằng số vũ trụ (cosmological constant, Λ)** — năng lượng của chân không, mật độ không đổi khi không gian giãn. Bản chất sâu xa vẫn là bài toán mở lớn nhất của vật lý.

> ⚠ **Lỗi thường gặp.** "Năng lượng tối và vật chất tối là một thứ." **Khác hẳn.** Vật chất tối **hút** (gom thành quầng quanh thiên hà, giúp hình thành cấu trúc). Năng lượng tối **đẩy** (tràn đều khắp không gian, làm giãn nở tăng tốc). Hai cái đối lập về tác dụng.

> 🔁 **Dừng lại tự kiểm tra.** Nếu siêu tân tinh Ia ở xa trông **mờ hơn** dự kiến, điều đó nói gì về khoảng cách của nó?
> <details><summary>Đáp án</summary>Nó **ở xa hơn** ta tưởng (độ sáng giảm theo bình phương khoảng cách). Xa hơn dự đoán ⇒ trong quá khứ vũ trụ giãn chậm hơn rồi sau đó tăng tốc, đẩy nó ra xa thêm ⇒ bằng chứng năng lượng tối.</details>

---

## 4. Ngân sách năng lượng vũ trụ

> 💡 **Trực giác.** Gộp mọi bằng chứng (CMB, lensing, siêu tân tinh, cấu trúc lớn), vũ trụ học hiện đại "cân" được tỉ lệ các thành phần. Kết quả gây choáng: thứ ta nhìn thấy (sao, khí, hành tinh, người) chỉ là phần **nhỏ nhất**.

| Thành phần | Tỉ lệ | Bản chất |
|---|---|---|
| **Năng lượng tối** | ~68% | Đẩy giãn nở tăng tốc; có thể là hằng số vũ trụ Λ |
| **Vật chất tối** | ~27% | Hút, phi-baryon, vô hình; tạo quầng quanh thiên hà |
| **Vật chất thường (baryon)** | ~5% | Mọi nguyên tử: sao, khí, hành tinh, con người |

**4 ví dụ số (kiểm tra cộng = 100%):**

| Tổ hợp | Phép tính | Kết quả |
|---|---|---|
| Tối (cả hai) | $68\\% + 27\\%$ | 95% — vũ trụ **chủ yếu là tối** |
| Vật chất (cả hai loại) | $27\\% + 5\\%$ | 32% |
| Tỉ lệ tối/thường | $95 / 5$ | ~19 lần |
| Vật chất tối / thường | $27 / 5$ | ~5,4 lần |

> ❓ **Câu hỏi tự nhiên.** *"Vì sao gọi là 'năng lượng' tối mà 'vật chất' tối — khác nhau chỗ nào về vai trò?"* — Vật chất tối là **vật chất** (có khối lượng, hút, gom cục) nên giúp **hình thành cấu trúc** (thiên hà, đám). Năng lượng tối tràn đều, **không gom cục**, vai trò là **chi phối giãn nở** ở thang lớn. Một thứ xây cấu trúc, một thứ điều khiển số phận giãn nở (Lesson 08 — số phận vũ trụ).

> 📝 **Tóm tắt toàn bài.**
> - **Đường cong quay phẳng**: sao rìa thiên hà quay nhanh ngang sao trong ⇒ cần khối lượng vô hình ⇒ **vật chất tối** ($v \\propto 1/\\sqrt{r}$ của Kepler bị vi phạm).
> - **Bằng chứng vật chất tối**: đường cong quay + thấu kính hấp dẫn + động học đám thiên hà — ba phép đo độc lập đồng thuận.
> - **Năng lượng tối**: giãn nở **tăng tốc**, phát hiện qua siêu tân tinh Ia (nến chuẩn) cuối thập niên 1990.
> - **Ngân sách**: ~68% năng lượng tối, ~27% vật chất tối, ~5% vật chất thường. Vũ trụ ~95% là "tối".

---

## Bài tập

1. **Đường cong quay.** Một thiên hà có khối lượng nhìn thấy hầu hết nằm trong $r = 5 \\ \\text{kpc}$. Theo Kepler, tốc độ tại $r = 20 \\ \\text{kpc}$ sẽ bằng bao nhiêu phần tốc độ tại $r = 5 \\ \\text{kpc}$? Thực đo cho thấy hai tốc độ gần bằng nhau — kết luận gì?

2. **Cần thêm bao nhiêu khối lượng.** Tại $r = 20 \\ \\text{kpc}$, tốc độ đo được là $220 \\ \\text{km/s}$ nhưng khối lượng sáng chỉ cho $100 \\ \\text{km/s}$. Vì $v^2 \\propto M$, khối lượng thực gấp mấy lần khối lượng sáng?

3. **Ngân sách vũ trụ.** Nếu vật chất thường là 5% và vật chất tối là 27%, thì trong mọi **vật chất** (loại trừ năng lượng tối), vật chất thường chiếm bao nhiêu phần trăm?

4. **Nến chuẩn.** Hai siêu tân tinh Ia có cùng độ sáng thật. Cái A trông sáng gấp 4 lần cái B. So sánh khoảng cách của chúng. (Gợi ý: độ sáng biểu kiến $\\propto 1/d^2$.)

5. **Phân biệt tối/tối.** Điền vào chỗ trống: "______ hút và gom thành quầng quanh thiên hà; ______ đẩy và làm giãn nở tăng tốc." Giải thích ngắn vì sao không thể hoán đổi vai trò.

---

## Lời giải chi tiết

### Bài 1 — Đường cong quay

Theo Kepler $v \\propto 1/\\sqrt{r}$ (khi khối lượng dồn ở trong):

$$\\frac{v(20)}{v(5)} = \\sqrt{\\frac{5}{20}} = \\sqrt{\\frac{1}{4}} = \\frac{1}{2}$$

→ Kepler dự đoán tốc độ tại 20 kpc chỉ bằng **một nửa** tại 5 kpc. Nhưng thực đo gần bằng nhau ⇒ phải có **khối lượng tăng theo $r$** (vật chất tối trải rộng), không dồn ở tâm.

### Bài 2 — Cần thêm bao nhiêu khối lượng

$v^2 \\propto M(r)$ (vì $v = \\sqrt{GM/r} \\Rightarrow M = v^2 r/G$, cùng $r$):

$$\\frac{M_{\\text{thực}}}{M_{\\text{sáng}}} = \\left(\\frac{v_{\\text{thực}}}{v_{\\text{sáng}}}\\right)^2 = \\left(\\frac{220}{100}\\right)^2 = 2{,}2^2 = 4{,}84$$

→ Khối lượng thực gấp **~4.8 lần** khối lượng sáng. Phần dư ~3.8 lần là vật chất tối.

### Bài 3 — Ngân sách vũ trụ

Tổng vật chất $= 5\\% + 27\\% = 32\\%$. Tỉ lệ vật chất thường trong vật chất:

$$\\frac{5\\%}{32\\%} = 0{,}156 = 15{,}6\\%$$

→ Vật chất thường chỉ chiếm **~15.6%** của mọi vật chất; ~84.4% còn lại là vật chất tối.

### Bài 4 — Nến chuẩn

Cùng độ sáng thật, độ sáng biểu kiến $\\propto 1/d^2$. A sáng gấp 4 lần B:

$$\\frac{b_A}{b_B} = \\left(\\frac{d_B}{d_A}\\right)^2 = 4 \\Rightarrow \\frac{d_B}{d_A} = 2 \\Rightarrow d_A = \\frac{d_B}{2}$$

→ A **gần hơn 2 lần** so với B. (Đây chính là cách nến chuẩn cho khoảng cách: độ mờ ↔ khoảng cách.)

### Bài 5 — Phân biệt tối/tối

"**Vật chất tối** hút và gom thành quầng quanh thiên hà; **năng lượng tối** đẩy và làm giãn nở tăng tốc."

Không hoán đổi được vì:
- Vật chất tối có **khối lượng** ⇒ hấp dẫn **hút**, gom cục được ⇒ tạo quầng, giúp hình thành cấu trúc.
- Năng lượng tối có **áp suất âm** ⇒ tác dụng **đẩy** ở thang lớn, **không gom cục** (mật độ đều khắp không gian).

Một thứ co cụm, một thứ trải đều — bản chất tác dụng ngược nhau nên vai trò không thể đổi chỗ.

---

## Code & Minh họa

- **Visualization tương tác**: [visualization.html](./visualization.html) — gồm:
  - **Đường cong quay**: vẽ đồng thời đường Kepler dự đoán ($v \\propto 1/\\sqrt{r}$, giảm dần) và đường phẳng quan sát; kéo "khối lượng vật chất tối" để thấy đường phẳng xuất hiện khi thêm quầng tối.
  - **Ngân sách vũ trụ**: biểu đồ tròn 5% / 27% / 68% với các phép tính tỉ lệ live; chỉnh tỉ lệ để thấy tổng phải bằng 100%.

---

## Bài tiếp theo

→ [Lesson 04 — Tổng hợp hạt nhân](../lesson-04-nucleosynthesis/): vũ trụ "nấu" ra ~75% H, ~25% He trong 3 phút đầu thế nào, và các nguyên tố nặng (cacbon, sắt, vàng) sinh ra ở đâu — trong lòng sao và vụ nổ siêu tân tinh.

**Tham khảo chéo:** lực hấp dẫn & chuyển động tròn [\`../../../Physics/\`](../../../Physics/); thuyết tương đối rộng (lensing) sẽ học ở [Lesson 07 — Tương đối & không-thời gian](../lesson-07-relativity-spacetime/).
`;
