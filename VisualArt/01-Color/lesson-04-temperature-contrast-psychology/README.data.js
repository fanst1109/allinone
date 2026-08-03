// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: VisualArt/01-Color/lesson-04-temperature-contrast-psychology/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 04 — Nhiệt độ màu, tương phản & tâm lý màu

> Ba câu hỏi của bài này: màu nào *tiến ra*, màu nào *lùi vào*? Vì sao đặt hai màu cạnh nhau lại "đánh nhau" hoặc "nâng nhau"? Và vì sao cùng một màu lại gợi *cảm xúc* khác nhau ở mỗi người, mỗi nền văn hóa?

## Mục tiêu học tập

- Phân biệt **màu nóng (warm)** và **màu lạnh (cool)** theo góc sắc (hue angle), và giải thích hiệu ứng **tiến/lùi (advancing / receding)** để tạo chiều sâu.
- Nắm 6 loại **tương phản (contrast)** của Johannes Itten: sắc, sáng-tối, nóng-lạnh, bổ túc, **đồng thời (simultaneous)**, và lượng (proportion) — mỗi loại kèm ví dụ số.
- Hiểu **tương phản đồng thời**: *cùng một mã màu* trông khác nhau khi đổi nền — và vì sao mắt gây ra ảo giác đó.
- Đọc được **tâm lý / ý nghĩa màu**, kèm cảnh báo khác biệt văn hóa (không có ý nghĩa "phổ quát" tuyệt đối).

## Kiến thức tiền đề

- Mô hình **HSL** và vòng tròn màu (hue 0–360°) — đã học ở [Lesson 03 — Hòa sắc](../lesson-03-color-harmony/). Nếu chưa rõ *hue*, *saturation*, *lightness*, đọc lại trước.
- Khái niệm **màu bổ túc (complementary)**: hai màu đối nhau 180° trên vòng — cũng từ Lesson 03.

---

## 1. Nhiệt độ màu: nóng, lạnh, và ảo giác chiều sâu

> 💡 **Trực giác.** Hãy hình dung một bức ảnh phong cảnh: đống lửa *cam-đỏ* ở tiền cảnh như nhảy về phía bạn, còn dãy núi *xanh lam* mờ xa như lùi tít sau. Não bộ học được điều này từ đời thực — vật ở xa bị lớp không khí làm *ngả lạnh và nhạt* (hiện tượng *atmospheric perspective*), nên ta *quy ước ngầm*: **màu nóng = gần, màu lạnh = xa**. Họa sĩ mượn đúng phản xạ đó để "vẽ" chiều sâu trên mặt phẳng 2D.

### 1.1 Phân vùng nóng / lạnh theo góc sắc

Trên vòng màu (hue 0–360°), ta chia gần đúng:

| Vùng | Góc sắc (hue) | Màu tiêu biểu | Nhiệt độ |
|------|--------------|---------------|:--------:|
| Đỏ → cam → vàng | ~ 0°–60° | đỏ 0°, cam 30°, vàng 60° | **Nóng** |
| Vàng-lục → lục → lam → tím-lam | ~ 90°–270° | lục 120°, lam 210°, tím-lam 260° | **Lạnh** |
| Tím → hồng cánh sen | ~ 270°–330° | tím 280°, hồng sen 320° | **Pha** (tím ngả lạnh, hồng ngả nóng) |
| Đỏ hồng → đỏ | ~ 330°–360° | đỏ hồng 345° | **Nóng** |

Quy tắc gọn dùng trong bài (và trong viz): **nóng** = hue \`[0°,60°] ∪ [330°,360°]\`; **lạnh** = \`[90°,270°]\`; còn lại (\`60°–90°\` và \`270°–330°\`) là **vùng pha** — không ngả hẳn về bên nào.

Bốn ví dụ số cụ thể (đọc góc → kết luận):

1. \`hsl(15, 90%, 55%)\` → hue **15°** (cam-đỏ) → **nóng**, có xu hướng **tiến**.
2. \`hsl(210, 80%, 55%)\` → hue **210°** (lam) → **lạnh**, có xu hướng **lùi**.
3. \`hsl(60, 95%, 55%)\` → hue **60°** (vàng) → **nóng**, tiến.
4. \`hsl(160, 60%, 45%)\` → hue **160°** (lục-lam) → **lạnh**, lùi.

> ⚠ **Lỗi thường gặp.** *"Ranh giới nóng/lạnh là một con số cứng."* Không. Các dải \`60°–90°\` (vàng-lục) và \`270°–330°\` (tím → hồng sen) là **vùng chuyển tiếp mờ**, không phải vạch kẻ. Vàng-lục (75°) là màu "trung tính nhiệt", tùy ngữ cảnh mà ngả nóng hay lạnh.

### 1.2 Nhiệt độ là *tương đối*

> 💡 **Trực giác.** Không màu nào "nóng tuyệt đối". Đặt cạnh nhau mới biết ai nóng hơn — như nước 30°C là *ấm* so với đá nhưng *mát* so với nước sôi.

Ví dụ: đỏ ngả cam \`hsl(10, ...)\` là **đỏ nóng**; đỏ ngả tím \`hsl(350, ...)\` là **đỏ lạnh** — dù cả hai đều là "đỏ". Trong vẽ da người, họa sĩ đặt vùng gò má hơi *ấm hơn* (nhiều cam) cạnh vùng bóng đổ hơi *lạnh hơn* (nhiều lam) để tạo khối, dù chênh lệch hue chỉ vài độ.

### 1.3 Tiến / lùi (advancing / receding) — dựng chiều sâu

Đặt **hai chấm cùng kích thước** trên nền xám trung tính:

- Chấm **cam** \`hsl(25, 90%, 55%)\` → mắt cảm thấy *gần hơn, to hơn*.
- Chấm **lam** \`hsl(220, 80%, 50%)\` → cảm thấy *xa hơn, nhỏ hơn*.

Dù hai chấm **cùng đường kính pixel**, cảm nhận độ sâu khác nhau. Đây là công cụ số 1 để tạo không gian: **tiền cảnh dùng tông nóng, hậu cảnh dùng tông lạnh**.

> ❓ **Câu hỏi tự nhiên của người đọc.**
> - *"Vậy cứ tô nóng là ra tiền cảnh?"* → Không chỉ nhiệt độ. Độ sâu = nhiệt độ **cộng** độ tương phản (mục 2) **cộng** độ bão hòa: gần thì nóng-tươi-tương phản mạnh, xa thì lạnh-nhạt-tương phản yếu. Ba yếu tố cộng hưởng.
> - *"Nếu nền đang nóng thì sao?"* → Khi đó màu *lạnh* lại nổi bật (tương phản nóng-lạnh, mục 2.3). Tiến/lùi bị chi phối bởi tương quan với nền, không tuyệt đối.

> 🔁 **Dừng lại tự kiểm tra.**
> 1. \`hsl(300, 70%, 50%)\` (hồng cánh sen 300°) nghiêng nóng hay lạnh?
> 2. Muốn dãy núi *lùi xa nhất*, chọn tông nào: cam tươi hay lam nhạt?
>
> <details><summary>Đáp án</summary>
>
> 1. 300° là **vùng pha**: hồng sen ngả *ấm* (do gần đỏ hồng), nhưng lạnh hơn cam/vàng. So với lam thì nó "nóng hơn".
> 2. **Lam nhạt** — vừa lạnh (lùi) vừa nhạt/ít bão hòa (mờ xa), cộng hưởng cả ba yếu tố độ sâu.
> </details>

> 📝 **Tóm tắt mục 1.**
> - Nóng ≈ hue 0–60° & 330–360° (đỏ/cam/vàng/hồng); lạnh ≈ 90–270° (lục/lam/tím).
> - Nhiệt độ là **tương đối** — so cạnh nhau mới rõ ai nóng hơn.
> - Nóng **tiến**, lạnh **lùi** → tiền cảnh nóng, hậu cảnh lạnh để tạo chiều sâu.
> - Chiều sâu = nhiệt độ + tương phản + độ bão hòa, cộng hưởng.

---

## 2. Sáu loại tương phản (Itten)

> 💡 **Trực giác.** *Tương phản (contrast)* là **độ khác biệt** giữa các màu đặt cạnh nhau. Không có tương phản → hình "phẳng lì", chi tiết chìm vào nhau. Nhiều tương phản → mắt bị hút, hình "bật" ra. Johannes Itten (Bauhaus) hệ thống hóa thành các *kiểu* khác biệt — mỗi kiểu là một "cần gạt" riêng để điều khiển sự chú ý.

Định nghĩa đầy đủ cho khái niệm trung tâm:

**(a) Tương phản là gì.** Mức chênh lệch của một *thuộc tính màu* (sắc, độ sáng, nhiệt độ, độ bão hòa...) giữa hai vùng kề nhau.

**(b) Vì sao cần phân loại.** Vì "tương phản mạnh" là câu nói mơ hồ — mạnh về *cái gì*? Hai màu có thể tương phản sắc cực mạnh nhưng cùng độ sáng (chói mắt mà không rõ hình). Tách ra 6 kiểu để điều khiển *đúng cần gạt*.

**(c) Ví dụ số.** \`hsl(0,90%,50%)\` đỏ và \`hsl(0,90%,90%)\` hồng nhạt: **cùng hue 0°, cùng bão hòa 90%**, chỉ khác lightness (50% vs 90%) → đây là tương phản **sáng-tối thuần**, không phải tương phản sắc.

### 2.1 Tương phản sắc (hue contrast)

Khác biệt về **góc sắc**. Mạnh nhất khi dùng 3 màu cơ bản đặt xa nhau trên vòng.

- Ví dụ: đỏ \`hue 0°\` + vàng \`hue 60°\` + lam \`hue 240°\` → ba hue cách nhau lớn → sắc "reo" vui, năng lượng cao (kiểu tranh De Stijl / Mondrian).
- Đo: chênh lệch hue trung bình \`(60 + 180 + 120)/3 = 120°\` → rất cao.

### 2.2 Tương phản sáng-tối (value / light-dark contrast)

Khác biệt về **lightness** — quan trọng nhất để đọc *hình khối* và *chữ*.

- Vàng \`L≈90%\` cạnh tím \`L≈30%\` → chênh \`60\` điểm sáng → chữ đọc rõ.
- Đỏ \`L≈50%\` cạnh lam \`L≈45%\` → chênh chỉ \`5\` điểm → *rung mắt* (vibration), chữ khó đọc dù khác sắc.

> ⚠ **Lỗi thường gặp.** Chọn hai màu "khác nhau rõ" (đỏ trên lục) làm chữ mà quên **giá trị sáng gần bằng nhau** → chữ nhòe, rung. Quy tắc: chữ cần tương phản **sáng-tối** ≥ ~50 điểm lightness, không chỉ khác sắc.

### 2.3 Tương phản nóng-lạnh (warm-cool contrast)

Đặt vùng nóng cạnh vùng lạnh → vùng nóng bật tiến, vùng lạnh lùi (đã nói ở mục 1).

- Ví dụ kinh điển: **cam \`hue 30°\`** cạnh **lam-lục \`hue 195°\`** — gần bổ túc mà lệch nhiệt rõ → chiều sâu mạnh (kiểu poster phim "cam & teal").

### 2.4 Tương phản bổ túc (complementary contrast)

Hai màu **đối nhau ~180°** trên vòng. Khi kề nhau, mỗi màu làm màu kia *rực* lên tối đa.

- Đỏ \`0°\` ↔ lục lam \`180°\`; lam \`240°\` ↔ cam \`60°\`... (thực tế cam bổ túc lam là \`60°↔240°\`).
- Ví dụ số: đỏ \`0°\` và cyan \`180°\`, chênh hue = \`180°\` → bổ túc chuẩn. Đặt cạnh → viền như "sôi".

> ⚠ **Lỗi thường gặp.** Tô **chữ đỏ bão hòa trên nền lục bão hòa** (bổ túc + cùng độ sáng) → hiện tượng *chromostereopsis*: viền rung, mỏi mắt. Bổ túc nên dùng **lệch diện tích và lệch độ sáng**, không 50-50 cùng độ chói.

### 2.5 Tương phản đồng thời (simultaneous contrast) — trọng tâm

> 💡 **Trực giác.** Mắt không đo màu *tuyệt đối*; nó đo *tương quan với xung quanh*. Vì thế **cùng một mã màu** đặt trên hai nền khác nhau sẽ *trông* khác — não tự "trừ đi" ảnh hưởng của nền và đẩy màu về phía **bổ túc của nền**.

Đây không phải mẹo — là cơ chế thị giác (ức chế bên / lateral inhibition ở võng mạc).

**Hai dạng, kèm ví dụ số:**

*Dạng 1 — theo độ sáng.* Một ô xám **\`hsl(0,0%,55%)\`** (mã cố định):
- Trên nền trắng \`L=100%\` → ô trông **tối hơn** thực.
- Trên nền đen \`L=0%\` → *cùng ô đó* trông **sáng hơn**.

Cả hai ô là **y hệt \`#8c8c8c\`**, chỉ nền khác. Mắt phóng đại chênh lệch.

*Dạng 2 — theo sắc (đẩy về bổ túc của nền).* Cùng ô xám \`#8c8c8c\`:
- Trên nền **đỏ** \`hue 0°\` → ô ngả **lục** (bổ túc của đỏ).
- Trên nền **lam** \`hue 240°\` → *cùng ô đó* ngả **cam/vàng** (bổ túc của lam).

> ❓ **Câu hỏi tự nhiên của người đọc.**
> - *"Vậy màu tôi chọn trong phần mềm có bị sai không?"* → Mã màu (hex) **không đổi** — máy đo vẫn ra \`#8c8c8c\`. Chỉ *tri giác* của mắt đổi. Khi thiết kế, phải xét màu **trong ngữ cảnh nền thật**, không xét cô lập.
> - *"Làm sao chống ảo giác này khi cần màu ổn định?"* → Viền trung tính (xám/đen/trắng) quanh vùng màu để "cách ly" khỏi nền, hoặc giữ nền quanh nó đồng nhất.

Xem trực tiếp ở [visualization.html](./visualization.html) — hai ô giữa **dùng chung một mã màu**, chỉ nền đổi.

### 2.6 Tương phản lượng (proportion / extension contrast)

Không chỉ *màu gì* mà **bao nhiêu diện tích** mỗi màu. Goethe gán "trọng số sáng" cho từng màu; để hai màu **cân bằng thị giác**, diện tích phải **tỉ lệ nghịch** với trọng số:

| Màu | Trọng số sáng (Goethe) |
|-----|:---:|
| Vàng | 9 |
| Cam | 8 |
| Đỏ | 6 |
| Lục | 6 |
| Lam | 4 |
| Tím | 3 |

Ví dụ số — cân bằng **vàng ↔ tím** (bổ túc):
- Tỉ lệ sáng vàng:tím = \`9 : 3 = 3 : 1\`.
- Để cân bằng, diện tích phải nghịch đảo → **vàng : tím = 1 : 3**.
- Tức vàng chiếm \`1/4 = 25%\`, tím chiếm \`3/4 = 75%\` diện tích.

Ví dụ số — **cam ↔ lam**:
- Trọng số \`8 : 4 = 2 : 1\` → diện tích cam : lam = \`1 : 2\` → cam \`33%\`, lam \`67%\`.

> ⚠ **Lỗi thường gặp.** Chia đôi 50-50 một cặp lệch trọng số (vàng vs tím) → vàng "hét" át tím. Ít diện tích màu mạnh + nhiều diện tích màu yếu mới hài hòa. Đây là lý do accent color (nút CTA) chỉ chiếm **vài %** diện tích.

> 🔁 **Dừng lại tự kiểm tra.**
> 1. Chữ trên nút: hai màu chênh hue \`150°\` nhưng chênh lightness chỉ \`4\`. Đọc tốt không?
> 2. Cân bằng **đỏ (6) ↔ lục (6)** thì tỉ lệ diện tích bao nhiêu?
>
> <details><summary>Đáp án</summary>
>
> 1. **Không.** Thiếu tương phản *sáng-tối* → chữ rung, khó đọc dù khác sắc mạnh. Cần chênh lightness ≥ ~50.
> 2. Trọng số bằng nhau \`6:6\` → diện tích **1:1 (50-50)** là cân bằng. (Đỏ-lục là cặp hiếm cân theo diện tích đều.)
> </details>

> 📝 **Tóm tắt mục 2.**
> - 6 cần gạt tương phản: **sắc, sáng-tối, nóng-lạnh, bổ túc, đồng thời, lượng**.
> - Tương phản **sáng-tối** quyết định độ đọc được (chữ) — không thay bằng tương phản sắc.
> - **Đồng thời**: cùng mã màu trông khác trên nền khác; mắt đẩy màu về bổ túc của nền.
> - **Lượng**: diện tích tỉ lệ nghịch trọng số sáng → màu mạnh dùng ít, màu yếu dùng nhiều.

---

## 3. Tâm lý & ý nghĩa màu

> 💡 **Trực giác.** Màu chạm cảm xúc qua ba lớp: **sinh học** (đỏ = máu/lửa → cảnh giác, có phần bẩm sinh), **kinh nghiệm cá nhân** (màu áo mẹ hay mặc), và **quy ước văn hóa** (trắng cưới hay trắng tang). Lớp văn hóa mạnh nhất và **khác nhau tùy vùng** — nên *không có* bảng ý nghĩa "đúng cho mọi người".

### 3.1 Ý nghĩa thường gặp (bối cảnh phương Tây, làm mốc)

Sáu ví dụ:

| Màu | Liên tưởng tích cực | Liên tưởng tiêu cực | Ứng dụng điển hình |
|-----|--------------------|--------------------|--------------------|
| **Đỏ** | năng lượng, đam mê, khẩn cấp | nguy hiểm, giận, nợ ("in the red") | nút "Mua ngay", biển STOP, sale |
| **Lam** | bình tĩnh, tin cậy, chuyên nghiệp | lạnh lùng, buồn ("feeling blue") | ngân hàng, tech, mạng xã hội |
| **Lục** | thiên nhiên, tăng trưởng, an toàn | thiếu kinh nghiệm, đố kỵ | app sức khỏe, tài chính "tăng", nút "OK" |
| **Vàng** | vui, lạc quan, chú ý | cảnh báo, hèn nhát ("yellow") | biển báo, giá rẻ, trẻ em |
| **Tím** | sang trọng, sáng tạo, huyền bí | phô trương, khó gần | mỹ phẩm cao cấp, thương hiệu sáng tạo |
| **Cam** | thân thiện, nhiệt tình, giá trị | rẻ tiền, ồn ào | CTA phụ, food & giải trí |

### 3.2 Khác biệt văn hóa — cực kỳ quan trọng

> ⚠ **Lỗi thường gặp (nghiêm trọng).** Áp bảng phương Tây lên mọi thị trường. Bốn ví dụ số/thực tế cho thấy nghĩa **đảo ngược**:
>
> 1. **Trắng**: phương Tây = tinh khiết, cô dâu mặc trắng. Đông Á (Việt Nam, Trung Quốc, Nhật, Hàn) = **tang tóc**, khăn tang trắng.
> 2. **Đỏ**: phương Tây = nguy hiểm/dừng. Việt Nam & Trung Quốc = **may mắn, hỉ sự** — phong bao lì xì đỏ, thiệp cưới đỏ.
> 3. **Vàng**: phương Tây = vui/rẻ. Trung Quốc phong kiến = màu **hoàng đế, tôn quý** (thường dân cấm dùng). Một số vùng = tang/ghen tuông.
> 4. **Lục**: nhiều nơi = thiên nhiên. Đạo Hồi = màu **thiêng liêng** (gắn với thiên đàng); nhưng ở vài văn hóa lại gắn "cắm sừng" (nón lục ở TQ).
>
> Kết luận: **luôn kiểm tra ngữ cảnh văn hóa của người xem trước khi gán ý nghĩa màu.**

### 3.3 Cách vận dụng thực tế

- **Thương hiệu**: chọn màu theo *tính cách* muốn truyền (tin cậy → lam; năng động → cam/đỏ).
- **Giao diện**: dùng đỏ cho *phá hủy/cảnh báo*, lục cho *xác nhận/an toàn* — nhưng vẫn kèm chữ/biểu tượng vì ~8% nam giới **mù màu đỏ-lục** (không thể chỉ dựa vào màu).
- **Diện tích**: màu cảm xúc mạnh (đỏ) dùng làm **accent** ít %, không phủ toàn trang (liên hệ tương phản lượng 2.6).

> ❓ **Câu hỏi tự nhiên của người đọc.**
> - *"Ý nghĩa màu có 'khoa học' không hay chỉ quy ước?"* → Có phần chung (đỏ làm nhịp tim tăng nhẹ — đo được), nhưng đa số là **học được** theo văn hóa. Đừng tuyệt đối hóa.
> - *"Chỉ dùng màu để báo lỗi/thành công được không?"* → **Không nên** — người mù màu không phân biệt được. Luôn kèm icon (✓/✕) và chữ.

> 📝 **Tóm tắt mục 3.**
> - Cảm xúc màu = sinh học + cá nhân + **văn hóa** (lớp văn hóa mạnh và thay đổi theo vùng).
> - Bảng "đỏ=nguy hiểm..." chỉ đúng bối cảnh phương Tây; trắng/đỏ/vàng đổi nghĩa mạnh ở Đông Á.
> - Không bao giờ *chỉ* dùng màu để truyền thông tin quan trọng (mù màu ~8% nam).

---

## 4. Bài tập

**Bài 1 (nhiệt độ).** Với mỗi màu, cho biết nóng/lạnh và xu hướng tiến/lùi:
a) \`hsl(35, 90%, 55%)\`  b) \`hsl(200, 70%, 50%)\`  c) \`hsl(60, 95%, 50%)\`  d) \`hsl(275, 60%, 45%)\`

**Bài 2 (tương phản).** Một trang có tiêu đề màu \`hsl(220, 15%, 45%)\` trên nền \`hsl(40, 20%, 50%)\`.
a) Đây là tương phản kiểu gì (kể tên các kiểu có mặt)?
b) Tiêu đề có dễ đọc không? Giải thích bằng con số lightness.
c) Đề xuất sửa 1 thông số để đọc tốt hơn.

**Bài 3 (tương phản đồng thời).** Giải thích: đặt ô \`#808080\` lên nền \`hsl(120, 60%, 50%)\` (lục), người xem thấy ô ngả về màu nào? Vì sao?

**Bài 4 (tương phản lượng).** Cân bằng thị giác cặp **cam ↔ lam** theo trọng số Goethe (cam 8, lam 4). Tính % diện tích mỗi màu.

**Bài 5 (văn hóa).** Bạn thiết kế bao bì trà cao cấp bán ở cả **Mỹ** và **Trung Quốc**, muốn dùng màu chủ đạo. Vì sao dùng **trắng** làm nền chính là rủi ro? Đề xuất hướng an toàn.

---

## 5. Lời giải chi tiết

**Bài 1.** Đọc góc hue rồi tra mục 1.1:
- a) \`35°\` (cam) → **nóng**, **tiến**.
- b) \`200°\` (lam) → **lạnh**, **lùi**.
- c) \`60°\` (vàng) → **nóng**, tiến (vàng là màu nóng, cũng rất "tiến" vì sáng).
- d) \`275°\` (tím) → thuộc **vùng pha** (270°–330° theo quy tắc mục 1.1). Tím ngả *lam* nên **thiên lạnh**, xu hướng **lùi nhẹ** — nhưng không dứt khoát như lam thuần (210°). Đây chính là điểm "ranh giới mờ" mà callout ⚠ ở 1.1 cảnh báo.

**Bài 2.** Cách tiếp cận: tách từng thuộc tính.
- a) Có **tương phản sắc** (hue 220° vs 40°, chênh 180° → gần bổ túc/lam-cam) và **tương phản nóng-lạnh** (lam lạnh trên nền cam nóng). Tương phản **bão hòa** thấp (15% vs 20%, gần nhau).
- b) Lightness: tiêu đề \`45%\` vs nền \`50%\` → chênh chỉ **5 điểm** → **rất khó đọc** (rung mắt), dù khác sắc mạnh. Đây đúng là lỗi ở mục 2.2.
- c) Sửa **lightness**: hạ tiêu đề xuống \`hsl(220, 15%, 20%)\` (chênh ~30) hoặc nâng nền lên \`hsl(40, 20%, 85%)\` (chênh ~40). Tăng tương phản **sáng-tối** là cách sửa đúng, không phải đổi hue.

**Bài 3.** Theo tương phản đồng thời (2.5): mắt đẩy màu trung tính về **bổ túc của nền**. Bổ túc của lục \`120°\` là đỏ-hồng \`~300°\`. Vậy ô \`#808080\` sẽ **trông ngả hồng/đỏ nhạt** dù mã màu vẫn là xám trung tính. Nguyên nhân: ức chế bên ở võng mạc — vùng nền lục làm tế bào cảm nhận lục "mệt", nên vùng xám kề bên được diễn giải thiên về bổ túc (đỏ).

**Bài 4.** Cách tiếp cận: diện tích tỉ lệ **nghịch** trọng số sáng.
- Trọng số cam:lam = \`8 : 4 = 2 : 1\`.
- Diện tích nghịch đảo → cam : lam = \`1 : 2\`.
- Chuẩn hóa: tổng phần = \`1 + 2 = 3\` → **cam = 1/3 ≈ 33%**, **lam = 2/3 ≈ 67%**.
- Kiểm tra logic: cam "mạnh" hơn (trọng số cao) nên dùng **ít** diện tích, đúng nguyên tắc 2.6.

**Bài 5.** Cách tiếp cận: xét khác biệt văn hóa (3.2).
- Ở **Mỹ**, trắng = tinh khiết/cao cấp → hợp trà sang.
- Ở **Trung Quốc** (và Việt Nam), trắng gắn mạnh với **tang tóc** → bao bì trắng chủ đạo có thể gợi điềm gở, giảm sức mua.
- Hướng an toàn: dùng nền **trung tính ấm** (be/kem) hoặc **đỏ/vàng-kim** (may mắn, tôn quý ở Đông Á) làm chủ đạo, để trắng chỉ làm khoảng thở nhỏ; hoặc **địa phương hóa** bao bì theo từng thị trường. Luôn test với người bản địa.

---

## 6. Code & Minh họa

Mở [visualization.html](./visualization.html) để tương tác:
- **Nhiệt độ & chiều sâu**: kéo slider warm↔cool trên vòng màu, xem cảnh minh họa vật tiến/lùi.
- **Tương phản đồng thời**: hai ô giữa **dùng chung một mã màu foreground**, đổi nền hai bên để thấy chúng "trông khác" nhau (kèm hiển thị hex chung để chứng minh).
- **Bảng tâm lý màu**: click một màu → hiện ý nghĩa + cảnh báo văn hóa.

---

## Bài tiếp theo

Hết **Nhánh I — Màu sắc**. Sang **Nhánh II — Bố cục**:

**[Lesson 05 — Nguyên lý bố cục (Composition Principles)](../../02-Composition/lesson-05-composition-principles/)**: quy tắc một phần ba, đường dẫn mắt, cân bằng, điểm nhấn — cách *sắp đặt* các mảng màu vừa học vào khung hình.
`;
