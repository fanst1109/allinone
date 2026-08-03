// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: VisualArt/01-Color/lesson-01-color-wheel-properties/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 01 — Bánh xe màu & thuộc tính màu (Color Wheel & Color Properties)

> Mọi màu bạn thấy đều mô tả được bằng **ba con số**: nó *ngả về sắc nào*, *đậm đặc bao nhiêu*, và *sáng tối cỡ nào*. Bánh xe màu (color wheel) là cách sắp xếp các sắc đó thành một vòng tròn để nhìn ra quan hệ giữa chúng.

## Mục tiêu học tập

- Gọi tên và định nghĩa được **ba thuộc tính của màu**: sắc màu (hue), độ bão hòa (saturation), độ sáng (value/lightness) — kèm giá trị số cụ thể.
- Đọc và viết được một màu dưới ba dạng ký hiệu: **HSV/HSL**, **RGB**, **mã hex** — và chuyển qua lại.
- Sắp được 12 cung màu trên **bánh xe họa sĩ (RYB)** thành ba bậc: bậc 1 (primary), bậc 2 (secondary), bậc 3 (tertiary).
- Phân biệt ba cách pha loãng một màu: **tint** (thêm trắng), **shade** (thêm đen), **tone** (thêm xám) — kèm ví dụ số.

## Kiến thức tiền đề

Chỉ cần số học cơ bản (phần trăm, cộng/trừ) và biết hệ đếm 16 (hex) ở mức nhận mặt — sẽ nhắc lại ngay trong bài. Không cần nền hội họa.

---

## 1. Bức tranh lớn: một màu được mô tả bằng ba con số

> 💡 **Trực giác.** Đứng trước hộp bút màu, bạn phân loại một cây bút theo ba câu hỏi, gần như vô thức:
> 1. *Nó là màu gì?* — đỏ, cam, hay lam? Đây là **sắc màu (hue)**.
> 2. *Nó tươi hay nhợt?* — đỏ chót của xe cứu hỏa, hay đỏ hồng nhạt phai? Đây là **độ bão hòa (saturation)**.
> 3. *Nó sáng hay tối?* — đỏ chói dưới nắng, hay đỏ thẫm trong bóng? Đây là **độ sáng (value)**.
>
> Ba câu hỏi này **độc lập** với nhau: đổi độ sáng không làm màu "đỏ" biến thành "lam". Chính vì độc lập nên ta tách được màu thành ba trục riêng — đó là nền của mọi hệ mô tả màu.

Ba trục đó cho ta bộ số **HSV** (Hue–Saturation–Value) hoặc **HSL** (Hue–Saturation–Lightness). Còn **bánh xe màu (color wheel)** chỉ là cách vẽ trục thứ nhất — sắc màu — thành một vòng tròn khép kín, vì sắc màu tuần hoàn: đi hết vòng từ đỏ → vàng → lục → lam → tím rồi **quay lại đỏ**.

Cùng một màu, ba cách viết khác nhau nhưng chỉ về đúng một điểm:

| Cách viết | Ví dụ (đỏ tươi) | Đọc là gì |
|-----------|-----------------|-----------|
| **HSV** | \`hsv(0°, 100%, 100%)\` | sắc 0°, bão hòa 100%, sáng 100% |
| **HSL** | \`hsl(0°, 100%, 50%)\` | sắc 0°, bão hòa 100%, độ sáng 50% |
| **RGB** | \`rgb(255, 0, 0)\` | trộn 255 đỏ + 0 lục + 0 lam |
| **hex** | \`#FF0000\` | cùng RGB, viết hệ 16 |

Bài này tập trung vào **cách con người cảm nhận** màu (HSV/HSL + bánh xe). Còn *vì sao máy tính lại dùng RGB, máy in dùng CMYK, họa sĩ dùng RYB* — ba "mô hình màu" khác nhau — sẽ mổ xẻ ở [Lesson 02](../lesson-02-color-models/).

---

## 2. Ba thuộc tính của màu

### 2.1 Sắc màu (Hue)

**(a) Là gì.** Hue là **vị trí của màu trên vòng tròn sắc**, đo bằng **độ (0°–360°)**. Nó trả lời câu "đây là màu *gì*" — đỏ, cam, lục... — mà bỏ qua chuyện đậm nhạt hay sáng tối.

**(b) Vì sao cần.** Vì sắc màu tuần hoàn (đỏ nối lại với tím rồi về đỏ), không thể xếp trên một đoạn thẳng "thấp → cao" được. Vòng tròn 360° là cách tự nhiên: 0° và 360° trùng nhau.

**(c) Ví dụ số cụ thể** (theo vòng HSV/RGB — vòng mà màn hình dùng):

| Sắc màu | Góc Hue | RGB (ở S=100%, V=100%) | hex |
|---------|--------:|------------------------|-----|
| Đỏ (red) | 0° | \`rgb(255, 0, 0)\` | \`#FF0000\` |
| Cam (orange) | 30° | \`rgb(255, 128, 0)\` | \`#FF8000\` |
| Vàng (yellow) | 60° | \`rgb(255, 255, 0)\` | \`#FFFF00\` |
| Lục (green) | 120° | \`rgb(0, 255, 0)\` | \`#00FF00\` |
| Lơ / lục lam (cyan) | 180° | \`rgb(0, 255, 255)\` | \`#00FFFF\` |
| Lam (blue) | 240° | \`rgb(0, 0, 255)\` | \`#0000FF\` |
| Cánh sen (magenta) | 300° | \`rgb(255, 0, 255)\` | \`#FF00FF\` |

> ⚠ **Lỗi thường gặp — lẫn hai loại bánh xe.** Trên **vòng HSV/RGB** (màn hình), ba màu ở 0°/120°/240° là **đỏ / lục / lam**. Nhưng trên **bánh xe họa sĩ RYB** (mực, màu nước), ba màu gốc lại là **đỏ / vàng / lam**, và "đối diện" của đỏ là lục *lam*, không phải lơ. Đừng trộn lẫn: khi nói góc độ (như \`120°\`) là đang nói vòng HSV; khi nói "bậc 1/2/3" là đang nói vòng RYB (mục 3).

### 2.2 Độ bão hòa (Saturation)

**(a) Là gì.** Saturation đo **độ tinh khiết / độ tươi** của sắc màu, tính theo **phần trăm (0%–100%)**. 100% là màu nguyên chất, rực nhất; 0% là **xám** hoàn toàn (không còn nhận ra sắc gì).

**(b) Vì sao cần.** Vì hai vật có cùng sắc "đỏ" nhưng rất khác nhau: đỏ tem thư chói mắt (bão hòa cao) và đỏ gạch nung trầm đục (bão hòa thấp). Nếu chỉ có hue, ta không phân biệt được hai cái đỏ này.

**(c) Ví dụ số cụ thể** (giữ Hue = 0° đỏ, Value = 100%, chỉ hạ Saturation):

| Saturation | RGB | hex | Cảm nhận |
|-----------:|-----|-----|----------|
| 100% | \`rgb(255, 0, 0)\` | \`#FF0000\` | đỏ chót, nguyên chất |
| 66% | \`rgb(255, 87, 87)\` | \`#FF5757\` | đỏ hồng, đã nhạt |
| 33% | \`rgb(255, 171, 171)\` | \`#FFABAB\` | hồng phấn |
| 0% | \`rgb(255, 255, 255)\` | \`#FFFFFF\` | trắng — mất sắc hoàn toàn |

Quy luật: **S = 0% ⇒ màu xám/trắng/đen** (tùy Value), không còn hue. Đó là các màu **vô sắc (achromatic)**.

### 2.3 Độ sáng — Value (HSV) và Lightness (HSL)

**(a) Là gì.** Value/Lightness đo **màu sáng hay tối**, tính theo **phần trăm (0%–100%)**. Ở đây có một điểm tinh tế: **HSV dùng "Value (V)"** còn **HSL dùng "Lightness (L)"**, và hai cái **không giống nhau**:

- **V (Value)** = độ sáng của kênh mạnh nhất. \`V = 0%\` là **đen tuyền**; \`V = 100%\` là màu **rực nhất có thể** (chưa chắc là trắng).
- **L (Lightness)** = độ sáng "trung bình" giữa tối và sáng. \`L = 0%\` là đen, \`L = 100%\` là **trắng tuyền**, còn **màu rực nhất nằm ở \`L = 50%\`**.

**(b) Vì sao có hai định nghĩa.** HSV tiện cho **chọn màu** (kéo V lên tối đa để lấy màu rực nhất). HSL tiện cho **thiết kế giao diện** (L đối xứng: 50% là màu chuẩn, >50% là các sắc nhạt, <50% là các sắc đậm — dễ sinh bảng màu). Cùng một màu, hai bộ số khác nhau:

| Màu | HSV | HSL | RGB / hex |
|-----|-----|-----|-----------|
| Đỏ rực nhất | \`hsv(0, 100%, 100%)\` | \`hsl(0, 100%, 50%)\` | \`rgb(255,0,0)\` \`#FF0000\` |
| Đỏ tối một nửa | \`hsv(0, 100%, 50%)\` | \`hsl(0, 100%, 25%)\` | \`rgb(128,0,0)\` \`#800000\` |
| Trắng | \`hsv(0, 0%, 100%)\` | \`hsl(0, 0%, 100%)\` | \`rgb(255,255,255)\` \`#FFFFFF\` |

**(c) Walk-through bằng số — dựng một màu từ HSV.** Lấy **\`hsv(210°, 80%, 70%)\`** (một màu lam trầm) và tính ra RGB từng bước. Đặt $H=210, S=0.8, V=0.7$:

$$
\\begin{aligned}
C &= V \\times S = 0.7 \\times 0.8 = 0.56 \\quad (\\text{"biên độ" màu}) \\\\
X &= C \\times \\left(1 - \\left|\\left(\\tfrac{H}{60} \\bmod 2\\right) - 1\\right|\\right) = 0.56 \\times (1 - |3.5 \\bmod 2 - 1|) = 0.56 \\times (1 - 0.5) = 0.28 \\\\
m &= V - C = 0.70 - 0.56 = 0.14 \\quad (\\text{"nền" cộng vào cả ba kênh})
\\end{aligned}
$$

$H = 210°$ rơi vào cung $[180°, 240°)$, nên $(R', G', B') = (0,\\ X,\\ C) = (0,\\ 0.28,\\ 0.56)$. Cộng nền $m$ rồi nhân 255:

$$
\\begin{aligned}
R &= (0 + 0.14)\\times 255 = 35.7 \\approx 36 \\\\
G &= (0.28 + 0.14)\\times 255 = 107.1 \\approx 107 \\\\
B &= (0.56 + 0.14)\\times 255 = 178.5 \\approx 179
\\end{aligned}
$$

Vậy \`hsv(210,80,70) = rgb(36, 107, 179) = #246BB3\`. Kiểm tra ngược mã hex: $36_{10}=24_{16}$, $107_{10}=6\\text{B}_{16}$, $179_{10}=\\text{B}3_{16}$ → \`#246BB3\` ✓. Viz ở cuối bài cho bạn kéo slider và **thấy đúng các con số này** cập nhật trực tiếp.

> ❓ **Câu hỏi tự nhiên của người đọc.**
> - *"Hex đọc thế nào?"* → \`#RRGGBB\`: mỗi cặp hai chữ số hệ 16 là một kênh 0–255. \`FF = 255\` (đầy), \`00 = 0\` (tắt), \`80 = 128\` (một nửa). Ví dụ \`#FF8000\` = đỏ đầy + lục 128 + lam 0 = cam.
> - *"S=0 mà V=50% thì màu gì?"* → Xám trung tính \`rgb(128,128,128) = #808080\`. Không hue vì không bão hòa.
> - *"Tại sao dân web hay dùng HSL hơn HSV?"* → Vì L đối xứng quanh 50% giúp sinh nhanh "màu nhạt / màu đậm" của cùng một hue cho theme sáng/tối. Sẽ dùng nhiều ở các bài về phối màu.

> 🔁 **Dừng lại tự kiểm tra.**
> 1. \`#00FF00\` là màu gì, hue bao nhiêu độ?
> 2. Một màu có \`S = 0%\`. Đổi Hue từ 40° sang 250° thì màu đổi không?
>
> <details><summary>Đáp án</summary>
>
> 1. Lục nguyên chất — \`rgb(0,255,0)\`, Hue = **120°**, S=100%, V=100%.
> 2. **Không đổi.** S=0 nghĩa là vô sắc (xám); hue là "hướng" của sắc, nhưng khi không có sắc nào thì đổi hướng chẳng ảnh hưởng gì. Vẫn là cùng một mức xám.
> </details>

> 📝 **Tóm tắt mục 2.**
> - Mọi màu = **(Hue, Saturation, Value/Lightness)** — ba trục độc lập.
> - **Hue** 0–360° = *màu gì*; **Saturation** 0–100% = *tươi/nhợt*; **Value/Lightness** 0–100% = *sáng/tối*.
> - **HSV** và **HSL** dùng chung Hue & Saturation nhưng khác trục sáng: V=100% là *màu rực nhất*, còn L=100% là *trắng* (màu rực nhất ở L=50%).
> - \`S = 0%\` ⇒ vô sắc (đen/xám/trắng), hue vô nghĩa.

---

## 3. Bánh xe họa sĩ (RYB): bậc 1, bậc 2, bậc 3

> 💡 **Trực giác.** Với **màu vẽ** (mực, màu nước — pha bằng cách *chồng sắc tố*), có ba màu **không thể pha ra từ màu khác**: **đỏ, vàng, lam**. Chúng là "nguyên tố". Trộn từng cặp nguyên tố ra ba màu mới; trộn tiếp lại ra sáu màu nữa. Xếp cả 12 quanh vòng tròn ta được **bánh xe màu 12 cung** của họa sĩ.

**Bậc 1 — màu gốc (primary):** đỏ, vàng, lam. Không pha ra được, là điểm xuất phát.

**Bậc 2 — màu bậc hai (secondary):** trộn **hai** màu gốc kề nhau, đặt vào **giữa** chúng trên vòng:

$$
\\text{đỏ} + \\text{vàng} = \\textbf{cam} \\qquad \\text{vàng} + \\text{lam} = \\textbf{lục} \\qquad \\text{lam} + \\text{đỏ} = \\textbf{tím}
$$

**Bậc 3 — màu bậc ba (tertiary):** trộn một màu gốc với màu bậc hai **kề nó**, được sáu màu "trung gian", mỗi màu tên ghép: **đỏ-cam, vàng-cam, vàng-lục, lam-lục, lam-tím, đỏ-tím**.

Xếp hết 12 cung theo thứ tự (mỗi cung cách nhau 30° trên vòng RYB):

| Vị trí | Cung màu | Bậc |
|-------:|----------|-----|
| 1 | Đỏ (red) | **1 — primary** |
| 2 | Đỏ-cam (red-orange) | 3 — tertiary |
| 3 | Cam (orange) | **2 — secondary** |
| 4 | Vàng-cam (yellow-orange) | 3 — tertiary |
| 5 | Vàng (yellow) | **1 — primary** |
| 6 | Vàng-lục (yellow-green) | 3 — tertiary |
| 7 | Lục (green) | **2 — secondary** |
| 8 | Lam-lục (blue-green) | 3 — tertiary |
| 9 | Lam (blue) | **1 — primary** |
| 10 | Lam-tím (blue-violet) | 3 — tertiary |
| 11 | Tím (violet) | **2 — secondary** |
| 12 | Đỏ-tím (red-violet) | 3 — tertiary |

Đếm lại cho khớp: **3** bậc 1 + **3** bậc 2 + **6** bậc 3 = **12 cung**. Ba màu gốc chia đều vòng tròn, cách nhau đúng 4 cung (120° trên vòng RYB).

> ⚠ **Lỗi thường gặp.** *"Trên màn hình lam + vàng cũng ra lục, y như màu vẽ."* — **Không đúng.** Màn hình trộn **ánh sáng** (cộng màu — additive): lam + vàng ánh sáng ra gần **trắng/xám**. Màu vẽ trộn **sắc tố** (trừ màu — subtractive): lam + vàng sắc tố mới ra lục. Cùng chữ "trộn" nhưng hai cơ chế ngược nhau — đây chính là lý do RYB (vẽ), RGB (màn hình), CMYK (in) là ba mô hình riêng, học kỹ ở [Lesson 02](../lesson-02-color-models/).

> ❓ **Câu hỏi tự nhiên của người đọc.**
> - *"Đỏ-tím với tím-đỏ có khác nhau không?"* → Quy ước: tên **màu gốc đứng trước** khi ghép ở bậc 3? Không — chuẩn phổ biến đặt **màu bậc thấp hơn trước** hoặc theo thứ tự vòng; bài này dùng tên vòng chuẩn "đỏ-tím". Cả hai đều chỉ cùng một cung, miễn nhất quán.
> - *"Vì sao họa sĩ chọn RYB mà không chọn đỏ-lục-lam như màn hình?"* → Vì mắt/mực thời xưa và trực giác pha màu vật lý hợp với RYB; RYB không "sai", chỉ là mô hình khác mục đích. Mô hình in hiện đại thực ra dùng CMY (lục lam–cánh sen–vàng) chính xác hơn.

---

## 4. Sắc độ: tint / shade / tone

> 💡 **Trực giác.** Có một sắc màu rồi (ví dụ đỏ), ba cách "làm dịu" nó — và đây là kỹ thuật cốt lõi để một bức tranh có chiều sâu thay vì chỉ toàn màu chói:
> - **Tint** = màu **+ trắng** → nhạt và sáng hơn (đỏ → hồng).
> - **Shade** = màu **+ đen** → tối và trầm hơn (đỏ → đỏ booc-đô).
> - **Tone** = màu **+ xám** → dịu, đục, bớt gắt (đỏ → đỏ gạch).

**Ví dụ số cụ thể.** Xuất phát từ đỏ nguyên chất \`rgb(255, 0, 0)\`, pha 50% với trắng / đen / xám (trộn tuyến tính từng kênh):

| Kiểu | Trộn 50% với | Tính từng kênh | RGB | hex | HSV tương ứng |
|------|--------------|----------------|-----|-----|----------------|
| **Tint** | trắng \`(255,255,255)\` | $(255,\\ \\tfrac{0+255}{2},\\ \\tfrac{0+255}{2})$ | \`rgb(255,128,128)\` | \`#FF8080\` | \`hsv(0, 50%, 100%)\` |
| **Shade** | đen \`(0,0,0)\` | $(\\tfrac{255}{2},\\ 0,\\ 0)$ | \`rgb(128,0,0)\` | \`#800000\` | \`hsv(0, 100%, 50%)\` |
| **Tone** | xám \`(128,128,128)\` | $(\\tfrac{255+128}{2},\\ \\tfrac{0+128}{2},\\ \\tfrac{0+128}{2})$ | \`rgb(192,64,64)\` | \`#C04040\` | \`hsv(0, 67%, 75%)\` |

Đọc theo trục HSV, ba thao tác này ánh xạ rất gọn — và đây là cách kiểm tra nhanh bạn có pha đúng không:

- **Tint** hạ **Saturation**, giữ Value cao (S: 100% → 50%, V vẫn 100%).
- **Shade** hạ **Value**, giữ Saturation (V: 100% → 50%, S vẫn 100%).
- **Tone** hạ **cả hai** (S: 100% → 67%, V: 100% → 75%).

> ⚠ **Lỗi thường gặp.** Gọi *mọi* màu nhạt là "tint". Sai: hồng phấn \`#FFABAB\` là tint (chỉ thêm trắng), nhưng đỏ gạch \`#C04040\` là **tone** (thêm xám) — tuy cũng "nhạt hơn đỏ" nhưng đục chứ không sáng. Phân biệt bằng Value: tint làm Value **không giảm**; tone làm Value **giảm** đi kèm Saturation giảm.

> 🔁 **Dừng lại tự kiểm tra.**
> 1. Trộn lục \`rgb(0,255,0)\` với 50% đen. Kết quả RGB & hex? Là tint, shade hay tone?
> 2. Một màu có \`hsv(120, 40%, 100%)\`. So với lục nguyên chất \`hsv(120,100,100)\`, đây là kiểu sắc độ gì?
>
> <details><summary>Đáp án</summary>
>
> 1. $(0/2,\\ 255/2,\\ 0/2) = (0, 128, 0)$ → \`rgb(0,128,0) = #008000\`. Thêm đen ⇒ **shade** (Value giảm 100%→50%, Saturation vẫn 100%).
> 2. Value vẫn 100% (không giảm) nhưng Saturation tụt 100%→40% ⇒ thêm trắng ⇒ **tint** (lục → lục phấn).
> </details>

> 📝 **Tóm tắt mục 4.**
> - **Tint** = +trắng (↓S, V cao); **Shade** = +đen (↓V, giữ S); **Tone** = +xám (↓S và ↓V).
> - Trộn màu tuyến tính = trung bình từng kênh RGB theo tỉ lệ pha.
> - Nhìn HSV để phân biệt: chỉ V giảm → shade; chỉ S giảm → tint; cả hai giảm → tone.

---

## 5. Bài tập

**Bài 1 (đọc màu).** Cho các mã hex sau, hãy nói mỗi màu ngả về sắc nào và ước lượng Hue:
\`#FF0000\`, \`#00FF00\`, \`#0000FF\`, \`#FFFF00\`, \`#808080\`.

**Bài 2 (chuyển HSV → RGB → hex).** Tính RGB và mã hex cho \`hsv(120°, 100%, 100%)\` và cho \`hsv(30°, 100%, 100%)\`, trình bày các bước ($C, X, m$).

**Bài 3 (bánh xe RYB).** 
- a) Kể ba màu bậc 1 và ba màu bậc 2 của bánh xe họa sĩ.
- b) Trên bánh xe 12 cung, màu **đối diện** (cách 6 cung) của **lam** là màu gì? Của **vàng** là màu gì?

**Bài 4 (sắc độ).** Xuất phát từ lam \`rgb(0, 0, 255)\`. Tính RGB & hex cho:
- a) tint 25% (trộn 25% trắng),
- b) shade 50% (trộn 50% đen),
- c) tone 50% (trộn 50% xám \`rgb(128,128,128)\`).

---

## 6. Lời giải chi tiết

**Bài 1.** Đọc từng kênh \`#RRGGBB\` (FF=255 đầy, 00=0 tắt, 80=128 nửa):
- \`#FF0000\` = \`rgb(255,0,0)\` → chỉ đỏ đầy → **đỏ**, Hue **0°**.
- \`#00FF00\` = \`rgb(0,255,0)\` → chỉ lục đầy → **lục**, Hue **120°**.
- \`#0000FF\` = \`rgb(0,0,255)\` → chỉ lam đầy → **lam**, Hue **240°**.
- \`#FFFF00\` = \`rgb(255,255,0)\` → đỏ + lục đầy, lam tắt → **vàng**, Hue **60°**.
- \`#808080\` = \`rgb(128,128,128)\` → ba kênh bằng nhau → **xám vô sắc**, S=0%, hue không xác định.

**Bài 2.** Dùng công thức HSV→RGB (như walk-through mục 2.3).

*Với \`hsv(120, 100, 100)\`:* $C = 1\\times1 = 1$; $\\tfrac{H}{60}=2$, $2 \\bmod 2 = 0$, $X = 1\\times(1-|0-1|) = 0$; $m = 1-1 = 0$. $H=120°$ ở cung $[120,180)$ → $(R',G',B') = (0, C, X) = (0,1,0)$. Nhân 255 → \`rgb(0,255,0) = #00FF00\` (lục nguyên chất) ✓.

*Với \`hsv(30, 100, 100)\`:* $C=1$; $\\tfrac{H}{60}=0.5$, $X = 1\\times(1-|0.5-1|) = 1\\times0.5 = 0.5$; $m=0$. $H=30°$ ở cung $[0,60)$ → $(C,X,0) = (1, 0.5, 0)$. Nhân 255 → \`rgb(255, 128, 0) = #FF8000\` (cam) ✓.

**Bài 3.**
- a) Bậc 1 (primary): **đỏ, vàng, lam**. Bậc 2 (secondary): **cam, lục, tím**.
- b) Đối diện nhau (cách 6/12 cung = 180° trên vòng RYB) là cặp **màu bổ túc (complementary)**:
  - Đối của **lam** (vị trí 9) là vị trí 3 = **cam**.
  - Đối của **vàng** (vị trí 5) là vị trí 11 = **tím**.
  
  (Ghi nhớ nhanh: mỗi màu gốc bổ túc với màu bậc 2 tạo từ *hai màu gốc còn lại* — lam ⇄ cam (=đỏ+vàng), vàng ⇄ tím (=đỏ+lam), đỏ ⇄ lục (=vàng+lam).)

**Bài 4.** Trộn tuyến tính: $\\text{kết quả} = (1-t)\\cdot\\text{màu} + t\\cdot\\text{màu pha}$, tính từng kênh. Lam = $(0,0,255)$.
- a) **Tint 25%** với trắng $(255,255,255)$, $t=0.25$:
  $R = 0.75\\cdot0 + 0.25\\cdot255 = 63.75 \\approx 64$; $G$ giống $R = 64$; $B = 0.75\\cdot255 + 0.25\\cdot255 = 255$.
  → \`rgb(64, 64, 255) = #4040FF\` (lam phấn). Kiểm tra: $64=40_{16}$, $255=\\text{FF}_{16}$ ✓.
- b) **Shade 50%** với đen $(0,0,0)$, $t=0.5$:
  $R=G=0$; $B = 0.5\\cdot255 = 127.5 \\approx 128$. → \`rgb(0, 0, 128) = #000080\` (lam navy).
- c) **Tone 50%** với xám $(128,128,128)$, $t=0.5$:
  $R = 0.5\\cdot0 + 0.5\\cdot128 = 64$; $G = 64$; $B = 0.5\\cdot255 + 0.5\\cdot128 = 191.5 \\approx 192$.
  → \`rgb(64, 64, 192) = #4040C0\` (lam trầm). Kiểm tra: $192 = \\text{C0}_{16}$ ✓.

Đối chiếu HSV để xác nhận đúng kiểu: (a) V vẫn cao, S giảm → tint ✓; (b) S vẫn 100%, V giảm còn 50% → shade ✓; (c) cả S và V đều giảm → tone ✓.

---

## Bài tiếp theo

**[Lesson 02 — Mô hình màu (Color Models: RGB, CMYK, RYB, HSL/HSV)](../lesson-02-color-models/)** *(sắp ra)*: vì sao màn hình cộng màu (RGB), máy in trừ màu (CMYK), họa sĩ dùng RYB — và cách chuyển đổi giữa chúng.

Minh họa tương tác: **[visualization.html](./visualization.html)** — bánh xe màu kéo-chọn được, slider Saturation/Value cập nhật hex & RGB tức thời, và nút hiện dải tint/shade/tone của màu đang chọn.
</content>
</invoke>
`;
