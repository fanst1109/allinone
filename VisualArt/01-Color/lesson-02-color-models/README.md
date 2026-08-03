# Lesson 02 — Mô hình màu (Color models)

> Cùng một màu "vàng" nhưng trộn **ánh sáng** thì đỏ + lục = vàng, còn trộn **sơn** thì lam + vàng = lục. Vì sao? Vì có hai kiểu trộn màu ngược nhau: **cộng màu (additive)** và **trừ màu (subtractive)**.

## Mục tiêu học tập

- Phân biệt **RGB (cộng màu)** — dùng cho màn hình phát sáng — và **CMY(K) (trừ màu)** — dùng cho in ấn, sơn, mực.
- Chứng minh bằng số: $R+G+B = (255,255,255) = \text{trắng}$ (cộng) đối lập với $C+M+Y = \text{đen}$ (trừ).
- Hiểu **HSL / HSV** — mô hình trực giác cho họa sĩ (màu sắc / độ bão hòa / độ sáng), và chuyển đổi qua lại với RGB bằng công thức kèm ví dụ số.
- Giải thích *vì sao* đỏ + lục (ánh sáng) = vàng, nhưng lam + vàng (sơn) = lục — hai cơ chế vật lý ngược nhau.

## Kiến thức tiền đề

- [Lesson 01 — Vòng thuần sắc & thuộc tính màu](../lesson-01-color-wheel-properties/) — ba màu cơ bản, màu bậc hai, các thuộc tính hue/saturation/value.
- Số học: cộng/trừ, phần trăm, và một chút hệ 16 (hex) — sẽ nhắc lại tại chỗ.

---

## 1. Bức tranh lớn: hai kiểu trộn màu ngược nhau

> 💡 **Trực giác.** Có hai câu hỏi khác nhau khi nói "màu":
> - *"Nguồn sáng phát ra ánh sáng màu gì?"* → càng chồng nhiều ánh sáng, càng **sáng** lên. Chồng đủ ba màu → **trắng**. Đây là **cộng màu (additive)** — của màn hình, đèn sân khấu, mặt trời.
> - *"Bề mặt này hấp thụ bớt ánh sáng, phản xạ lại màu gì?"* → càng phủ nhiều mực/sơn, càng **tối** đi. Phủ đủ ba màu → **đen**. Đây là **trừ màu (subtractive)** — của tranh vẽ, mực in, thuốc nhuộm.

Hai hệ đi **ngược chiều nhau**:

| | Cộng màu (RGB) | Trừ màu (CMY) |
|---|---|---|
| Bản chất | Ánh sáng **phát ra** | Ánh sáng **phản xạ** (bị hấp thụ bớt) |
| Điểm xuất phát | Đen (không ánh sáng) | Trắng (giấy phản xạ hết) |
| Ba màu cơ bản | Đỏ (Red), Lục (Green), Lam (Blue) | Lục lam (Cyan), Hồng cánh sen (Magenta), Vàng (Yellow) |
| Trộn cả ba | → **Trắng** | → **Đen** |
| Càng trộn thì | càng **sáng** | càng **tối** |
| Ứng dụng | màn hình, TV, điện thoại, đèn LED | in offset, máy in phun, tranh sơn |

**Điểm mấu chốt để nhớ cả bài:** ba màu cơ bản của hệ này chính là **màu bậc hai** của hệ kia.

- Cộng: Đỏ + Lục = **Vàng**, Lục + Lam = **Lục lam (Cyan)**, Lam + Đỏ = **Hồng sen (Magenta)**.
- Ba màu bậc hai của RGB (vàng, lục lam, hồng sen) chính là ba màu **cơ bản** của CMY. Hai hệ là hai mặt của cùng một đồng xu.

---

## 2. RGB — mô hình cộng màu (additive)

> 💡 **Trực giác.** Hình dung ba chiếc đèn pin dán kính lọc màu đỏ, lục, lam chiếu chồng lên một bức tường **đen** trong phòng tối. Vùng nào có hai đèn chồng lên → sáng hơn và ra màu mới; vùng chính giữa có cả ba → **trắng**. Không đèn nào bật → vẫn đen. "Thêm ánh sáng" = "cộng".

### 2.1 Định nghĩa

**(a) Là gì.** Mỗi màu được mô tả bằng ba số $R, G, B$, mỗi số trong khoảng $[0, 255]$ (8-bit), cho biết **cường độ** của ba kênh ánh sáng đỏ / lục / lam. Trộn = cộng cường độ từng kênh (có bão hòa ở 255).

**(b) Vì sao cần.** Màn hình gồm hàng triệu điểm ảnh, mỗi điểm là ba đèn con R-G-B. Máy chỉ cần lưu ba con số cho mỗi điểm ảnh là tái tạo được mọi màu → RGB là "ngôn ngữ gốc" của mọi thiết bị phát sáng.

**(c) Vì sao dải là $[0,255]$.** Vì $255 = 2^8 - 1$: mỗi kênh dùng đúng 1 byte (8 bit). Ba kênh = 3 byte = 24-bit color → $256^3 = 16\,777\,216$ màu.

### 2.2 Ví dụ số (cộng màu)

Quy ước: $(R, G, B)$. Trộn hai màu ánh sáng = cộng từng kênh, chặn tối đa ở 255.

| Phép trộn | Tính từng kênh | Kết quả | Màu |
|---|---|---|---|
| Đỏ | $(255, 0, 0)$ | $(255,0,0)$ | 🔴 đỏ |
| Đỏ + Lục | $(255{+}0,\ 0{+}255,\ 0{+}0)$ | $(255,255,0)$ | 🟡 **vàng** |
| Lục + Lam | $(0,\ 255{+}0,\ 0{+}255)$ | $(0,255,255)$ | 🩵 **lục lam (cyan)** |
| Lam + Đỏ | $(0{+}255,\ 0,\ 255{+}0)$ | $(255,0,255)$ | 🟣 **hồng sen (magenta)** |
| Đỏ + Lục + Lam | $(255,255,255)$ | $(255,255,255)$ | ⬜ **trắng** |
| Không màu nào | $(0,0,0)$ | $(0,0,0)$ | ⬛ đen |

**Xác nhận trọng tâm bài:**
$$R + G + B = (255,0,0) + (0,255,0) + (0,0,255) = (255,255,255) = \text{trắng} \checkmark$$

Một ví dụ pha loãng: đỏ đầy + lục **một nửa** $= (255, 128, 0)$ = **cam**. Càng ít lục, càng nghiêng về đỏ; đủ lục thì thành vàng. Đây là cách màn hình vẽ ra dải cam-vàng.

### 2.3 Hệ 16 (hex) — cùng một RGB, viết gọn

Màu web thường viết dạng `#RRGGBB`, mỗi cặp là một kênh ở **hệ 16** (00–FF = 0–255).

- $(255, 0, 0) \to$ `#FF0000` vì $255 = \text{FF}_{16}$.
- $(255, 255, 0) \to$ `#FFFF00` (vàng).
- $(30, 144, 255) \to$ `#1E90FF` vì $30 = \text{1E}_{16},\ 144 = \text{90}_{16},\ 255 = \text{FF}_{16}$ (dodger blue).
- $(128,128,128) \to$ `#808080` (xám trung tính, vì $128 = \text{80}_{16}$).

> ⚠ **Lỗi thường gặp.** Tưởng "trộn ánh sáng đỏ + lục ra màu nâu/bẩn như trộn màu nước". **Sai.** Với ánh sáng, đỏ + lục ra **vàng tươi**. Trực giác "vàng + lam = lục", "trộn nhiều màu ra nâu" là kinh nghiệm trộn **sơn** (trừ màu), không áp dụng cho ánh sáng.

> 🔁 **Dừng lại tự kiểm tra.**
> 1. Trộn ánh sáng $(255, 200, 0)$ với $(0, 55, 255)$ ra kênh nào bằng bao nhiêu?
> 2. Màu `#00FFFF` là màu gì, và nó là tổng của hai ánh sáng cơ bản nào?
>
> <details><summary>Đáp án</summary>
>
> 1. $(255{+}0,\ 200{+}55,\ 0{+}255) = (255, 255, 255) = $ trắng.
> 2. `#00FFFF` $= (0,255,255) = $ lục lam (cyan) $=$ Lục + Lam.
> </details>

---

## 3. CMY(K) — mô hình trừ màu (subtractive)

> 💡 **Trực giác.** Bắt đầu từ tờ giấy **trắng** phản xạ đủ cả ba ánh sáng R-G-B. Mỗi lớp mực là một "bộ lọc" **hấp thụ bớt** một ánh sáng cơ bản:
> - Mực **lục lam (cyan)** hút mất **đỏ** → chỉ còn lục + lam phản xạ → mắt thấy cyan.
> - Mực **hồng sen (magenta)** hút mất **lục**.
> - Mực **vàng (yellow)** hút mất **lam**.
>
> Phủ càng nhiều mực → càng nhiều ánh sáng bị hút → càng **tối**. Phủ cả ba → hút hết → **đen**.

### 3.1 Định nghĩa

**(a) Là gì.** Ba số $C, M, Y$ (thường 0–100%) cho biết **lượng mực** lục lam / hồng sen / vàng phủ lên giấy. Mô hình đơn giản (lý tưởng hóa) liên hệ với ánh sáng phản xạ:

$$R = 255 \cdot (1 - C), \quad G = 255 \cdot (1 - M), \quad B = 255 \cdot (1 - Y)$$

với $C, M, Y$ tính theo tỉ lệ $[0, 1]$. Đây đúng là phép **trừ**: mực lấy đi ánh sáng khỏi màu trắng ban đầu.

**(b) Vì sao đảo ngược RGB.** Vì máy in không tự phát sáng — nó chỉ **bớt** ánh sáng khỏi tờ giấy trắng. Muốn ra màu đỏ trên giấy, ta không "thêm đỏ" mà **hút lục và lam đi** (phủ magenta + yellow), để chỉ còn đỏ phản xạ.

**(c) Vì sao thêm K (đen).** CMYK = Cyan, Magenta, Yellow, **Key (đen)**. Lý thuyết $C+M+Y=$ đen, nhưng mực thật không tinh khiết → trộn cả ba ra **nâu xỉn**, lại tốn ba lớp mực đắt. Nên thêm mực đen riêng cho chữ và vùng tối → sắc nét, tiết kiệm.

### 3.2 Ví dụ số (trừ màu)

Dùng $R = 255(1-C)$, v.v. Coi mỗi mực "đầy" là $C=1$ (100%).

| Phủ mực | Ánh sáng bị hút | Còn phản xạ $(R,G,B)$ | Màu thấy |
|---|---|---|---|
| Chỉ Cyan ($C{=}1$) | hút đỏ | $(0, 255, 255)$ | 🩵 lục lam |
| Chỉ Yellow ($Y{=}1$) | hút lam | $(255, 255, 0)$ | 🟡 vàng |
| Cyan + Yellow | hút đỏ **và** lam | $(0, 255, 0)$ | 🟢 **lục** |
| Cyan + Magenta | hút đỏ **và** lục | $(0, 0, 255)$ | 🔵 lam |
| Magenta + Yellow | hút lục **và** lam | $(255, 0, 0)$ | 🔴 đỏ |
| Cyan + Magenta + Yellow | hút cả ba | $(0, 0, 0)$ | ⬛ **đen** |

**Xác nhận đối lập với additive:**
$$C + M + Y \ \Rightarrow\ (R,G,B) = (0,0,0) = \text{đen} \checkmark$$
(ngược hẳn với $R+G+B=$ trắng ở mục 2).

Một ví dụ mực loãng: cyan **một nửa** $(C = 0.5) \Rightarrow R = 255(1-0.5) = 128 \Rightarrow (128, 255, 255)$ = lục lam **nhạt**. Càng ít mực, càng gần trắng.

> ❓ **Câu hỏi tự nhiên của người đọc.**
> - *"Vì sao 3 màu cơ bản khi in lại là C-M-Y chứ không phải đỏ-vàng-lam như hồi bé học vẽ?"* → C-M-Y là bộ **chính xác về vật lý** để hút từng ánh sáng R-G-B một cách độc lập. "Đỏ-vàng-lam" (RYB) là mô hình cũ, trực giác cho màu vẽ nhưng không phủ hết được gam màu; ngành in dùng CMY.
> - *"Trộn cả ba mực có thật ra đen không?"* → Về lý thuyết có. Thực tế mực không lý tưởng nên ra nâu đậm → phải thêm K.
> - *"Màn hình dùng RGB, máy in dùng CMYK — ảnh in ra khác màn hình?"* → Đúng, đây là lý do phải "convert RGB → CMYK" và một số màu RGB rực (gam rộng) không in ra được (out of gamut).

---

## 4. Vì sao đỏ + lục = vàng (ánh sáng) nhưng lam + vàng = lục (sơn)?

Đây là câu hỏi mở đầu bài. Câu trả lời: **hai phép toán ngược nhau trên cùng ba kênh R-G-B.**

**Trộn ánh sáng (cộng):** đỏ $(255,0,0)$ + lục $(0,255,0)$ = $(255,255,0)$. Hai chùm sáng **cộng** lại, kích thích cả tế bào cảm nhận đỏ lẫn lục trong mắt → não diễn giải thành **vàng**. Thêm sáng vào thêm sáng.

**Trộn sơn/mực (trừ):** "màu lam" của họa sĩ thực chất gần **cyan** (hút đỏ), "màu vàng" hút lam. Phủ chồng hai mực:
- Cyan hút **đỏ** → $R \to 0$.
- Yellow hút **lam** → $B \to 0$.
- Còn lại phản xạ: chỉ **lục** $(0, 255, 0)$ → mắt thấy **lục**.

$$\underbrace{\text{cyan (hút đỏ)}}_{R=0} \ \times\ \underbrace{\text{yellow (hút lam)}}_{B=0}\ \Rightarrow\ (0, 255, 0) = \text{lục}$$

> 💡 **Cùng một sự thật, hai hướng.** Vàng-ánh-sáng $=$ "có đỏ + có lục". Vàng-mực $=$ "đã hút hết lam". Khi hai lớp mực cùng hút (đỏ và lam), thứ **sống sót** là lục — nên trộn mực ra lục, dù trộn ánh sáng ra vàng. Không mâu thuẫn: một bên **cộng cái có**, một bên **trừ cái bị hút**.

> ⚠ **Lỗi thường gặp.** Đem trực giác trộn sơn ("lam + vàng = lục") áp cho đèn LED sân khấu rồi ngạc nhiên khi đỏ + lục ra vàng. Luôn hỏi trước: **đây là ánh sáng phát ra (cộng) hay bề mặt phản xạ (trừ)?**

---

## 5. HSL / HSV — mô hình trực giác cho họa sĩ

> 💡 **Trực giác.** RGB tiện cho máy nhưng phản trực giác với người: "tăng đỏ giảm lam" không giống cách ta nghĩ về màu. Họa sĩ nghĩ theo ba câu hỏi tự nhiên: *(1) Màu gì?* (đỏ hay lục hay lam...), *(2) Đậm hay nhạt?* (rực rỡ hay xám xịt), *(3) Sáng hay tối?*. Ba câu đó chính là **H – S – L**.

### 5.1 Ba trục

- **Hue (màu sắc)** $H \in [0°, 360°)$: vị trí trên vòng thuần sắc. $0°$ đỏ, $60°$ vàng, $120°$ lục, $180°$ lục lam, $240°$ lam, $300°$ hồng sen. (Nối trực tiếp với vòng thuần sắc ở [Lesson 01](../lesson-01-color-wheel-properties/).)
- **Saturation (độ bão hòa)** $S \in [0\%, 100\%]$: $100\%$ = màu tinh khiết rực rỡ, $0\%$ = xám (không còn màu).
- **Lightness (độ sáng)** $L \in [0\%, 100\%]$: $0\%$ = đen, $100\%$ = trắng, $50\%$ = màu "đầy đặn" nhất.

**HSV** (Hue-Saturation-**Value**) là biến thể: thay $L$ bằng $V = $ giá trị kênh lớn nhất. Khác biệt: ở HSL, $L=100\%$ luôn là trắng; ở HSV, $V=100\%,\ S=100\%$ là màu rực nhất (chưa phải trắng). Nhiều phần mềm vẽ (Photoshop color picker) dùng HSV.

### 5.2 Công thức RGB → HSL

Chuẩn hóa $r = R/255,\ g = G/255,\ b = B/255$. Đặt $M = \max(r,g,b)$, $m = \min(r,g,b)$, $\Delta = M - m$.

$$L = \frac{M + m}{2}$$

$$S = \begin{cases} 0 & \Delta = 0 \\ \dfrac{\Delta}{1 - |2L - 1|} & \Delta \neq 0 \end{cases}$$

$$H = 60° \times \begin{cases} \dfrac{g - b}{\Delta} \bmod 6 & M = r \\[4pt] \dfrac{b - r}{\Delta} + 2 & M = g \\[4pt] \dfrac{r - g}{\Delta} + 4 & M = b \end{cases} \qquad (\text{nếu } H < 0,\ \text{cộng } 360°)$$

### 5.3 Ví dụ số RGB → HSL (đa dạng)

**Ví dụ 1 — Đỏ tinh khiết $(255, 0, 0)$.**
$r=1, g=0, b=0 \Rightarrow M=1, m=0, \Delta=1$.
$L = (1+0)/2 = 0.5 = 50\%$.
$S = 1/(1 - |2(0.5)-1|) = 1/(1-0) = 1 = 100\%$.
$M=r \Rightarrow H = 60(\frac{0-0}{1} \bmod 6) = 0°$.
$\Rightarrow$ **HSL$(0°, 100\%, 50\%)$**. Đúng: đỏ rực, sáng vừa. ✓

**Ví dụ 2 — Vàng $(255, 255, 0)$** (chính là Đỏ + Lục ở mục 2).
$r=1, g=1, b=0 \Rightarrow M=1, m=0, \Delta=1,\ L=0.5,\ S=100\%$.
$M=r \Rightarrow H = 60(\frac{1-0}{1} \bmod 6) = 60°$.
$\Rightarrow$ **HSL$(60°, 100\%, 50\%)$** — hue $60°$ đúng là vàng. ✓

**Ví dụ 3 — Xám trung tính $(128, 128, 128)$.**
$r=g=b \approx 0.502 \Rightarrow \Delta = 0$.
$L = 0.502 \approx 50\%$, $S = 0\%$ (không màu), $H = 0°$ (vô nghĩa, quy ước 0).
$\Rightarrow$ **HSL$(0°, 0\%, 50\%)$** — $S=0$ nên là xám, khớp trực giác. ✓

**Ví dụ 4 — Dodger blue $(30, 144, 255)$.**
$r = 0.1176,\ g = 0.5647,\ b = 1 \Rightarrow M = 1\,(b),\ m = 0.1176,\ \Delta = 0.8824$.
$L = (1 + 0.1176)/2 = 0.5588 \approx 55.9\%$.
$S = 0.8824 / (1 - |2(0.5588) - 1|) = 0.8824 / (1 - 0.1176) = 0.8824/0.8824 = 100\%$.
$M = b \Rightarrow H = 60(\frac{r - g}{\Delta} + 4) = 60(\frac{0.1176 - 0.5647}{0.8824} + 4) = 60(-0.507 + 4) = 209.6° \approx 210°$.
$\Rightarrow$ **HSL$(210°, 100\%, 56\%)$** — hue $210°$ nằm giữa lục lam và lam, đúng là xanh dương tươi. ✓

### 5.4 Công thức HSL → RGB (chiều ngược)

Đặt $C = (1 - |2L - 1|) \cdot S$ (chroma), $X = C \cdot (1 - |(H/60) \bmod 2 - 1|)$, $m = L - C/2$. Chọn $(r', g', b')$ theo cung của $H$:

| Cung $H$ | $(r', g', b')$ |
|---|---|
| $[0°, 60°)$ | $(C, X, 0)$ |
| $[60°, 120°)$ | $(X, C, 0)$ |
| $[120°, 180°)$ | $(0, C, X)$ |
| $[180°, 240°)$ | $(0, X, C)$ |
| $[240°, 300°)$ | $(X, 0, C)$ |
| $[300°, 360°)$ | $(C, 0, X)$ |

Rồi $R = (r'+m)\cdot 255$, tương tự $G, B$.

**Ví dụ khứ hồi** — lấy HSL$(210°, 100\%, 56\%)$ vừa tính, chuyển ngược về:
$S=1, L=0.559 \Rightarrow C = (1 - |2(0.559)-1|)\cdot 1 = 0.882$.
$H/60 = 3.5 \Rightarrow (H/60 \bmod 2) = 1.5 \Rightarrow X = 0.882(1 - |1.5 - 1|) = 0.882 \cdot 0.5 = 0.441$.
$m = 0.559 - 0.882/2 = 0.118$.
$H = 210°$ thuộc cung $[180°, 240°) \Rightarrow (r', g', b') = (0, X, C) = (0, 0.441, 0.882)$.
$R = (0 + 0.118)\cdot 255 = 30$, $G = (0.441 + 0.118)\cdot 255 = 143 \approx 144$, $B = (0.882 + 0.118)\cdot 255 = 255$.
$\Rightarrow (30, 144, 255)$ — **quay lại đúng** màu ban đầu. ✓

> ❓ **Câu hỏi tự nhiên của người đọc.**
> - *"Vì sao có cả HSL lẫn HSV, chọn cái nào?"* → HSL đối xứng đen↔trắng ($L$ từ 0 đến 100%), tiện chỉnh sáng/tối cân đối. HSV khớp cách vẽ "chọn màu rực rồi pha đen/trắng" của color picker. Cùng $H$, khác cách định nghĩa "độ sáng".
> - *"Tăng Lightness lên 100% thì ra gì?"* → Trắng, bất kể $H, S$. Đó là lý do vệt sáng trong ảnh mất hết màu.
> - *"Vì sao khi $S=0$ thì $H$ vô nghĩa?"* → Vì màu đã là xám, không còn "màu sắc" để định vị trên vòng thuần sắc.

> 🔁 **Dừng lại tự kiểm tra.**
> 1. Màu $(0, 255, 0)$ (lục tinh khiết) có HSL bằng bao nhiêu?
> 2. HSL$(0°, 0\%, 0\%)$ và HSL$(120°, 100\%, 100\%)$ lần lượt là màu gì?
>
> <details><summary>Đáp án</summary>
>
> 1. $M=1(g), m=0, \Delta=1, L=0.5, S=100\%$. $M=g \Rightarrow H = 60(\frac{b-r}{\Delta}+2) = 60(0+2) = 120°$. $\Rightarrow$ HSL$(120°, 100\%, 50\%)$.
> 2. HSL$(0°,0\%,0\%)$: $L=0\%$ → **đen**. HSL$(120°,100\%,100\%)$: $L=100\%$ → **trắng** (mọi màu ở $L=100\%$ đều là trắng).
> </details>

> 📝 **Tóm tắt bài học.**
> - Hai kiểu trộn ngược nhau: **cộng màu RGB** (ánh sáng, từ đen, trộn ra sáng, $R+G+B=$ trắng) và **trừ màu CMY** (mực trên giấy, từ trắng, trộn ra tối, $C+M+Y=$ đen).
> - Ba màu cơ bản của hệ này là ba màu bậc hai của hệ kia: RGB ↔ CMY.
> - Đỏ + lục = vàng (cộng ánh sáng) nhưng cyan + vàng = lục (trừ mực): cùng ba kênh R-G-B, một bên cộng, một bên bị hút.
> - **HSL/HSV**: mô hình trực giác (màu sắc / bão hòa / sáng). Chuyển đổi RGB↔HSL bằng công thức chính xác, khứ hồi không mất mát.
> - Hex `#RRGGBB` chỉ là cách viết RGB ở hệ 16.

---

## 6. Bài tập

**Bài 1 (cộng màu).** Trộn các cặp ánh sáng sau, cho kết quả $(R,G,B)$ và tên màu:
- a) $(255, 0, 0) + (0, 0, 255)$
- b) $(0, 255, 0) + (0, 0, 255)$
- c) $(255, 128, 0) + (0, 128, 255)$

**Bài 2 (trừ màu).** Máy in phủ mực lên giấy trắng. Với mô hình $R = 255(1-C)$, v.v., tính màu phản xạ $(R,G,B)$:
- a) Magenta đầy + Yellow đầy ($M=1, Y=1$, $C=0$).
- b) Cyan đầy + Magenta đầy + Yellow đầy.
- c) Cyan $=0.25$, còn lại $=0$.

**Bài 3 (chuyển đổi HSL).** Cho $(255, 128, 0)$ (cam):
- a) Tính HSL.
- b) Từ HSL đó, nếu tăng $L$ lên $75\%$ (giữ $H, S$) thì màu sáng hơn hay tối hơn?

**Bài 4 (vận dụng — thiết kế).** Một logo hiển thị đẹp trên màn hình với màu `#1E90FF`. Khi in danh thiếp, thợ in hỏi giá trị CMY gần đúng. Dùng mô hình đơn giản, tính $C, M, Y$ (theo %).

---

## 7. Lời giải chi tiết

**Bài 1 (cộng — cộng từng kênh, chặn 255).**
- a) $(255{+}0,\ 0{+}0,\ 0{+}255) = (255, 0, 255)$ = **hồng sen (magenta)**.
- b) $(0,\ 255,\ 255) = (0, 255, 255)$ = **lục lam (cyan)**.
- c) $(255{+}0,\ 128{+}128,\ 0{+}255) = (255, 256, 255) \to (255, 255, 255)$ = **trắng** (kênh lục $256$ bị chặn về $255$). Đây là hai màu bù nhau, cộng lại ra trắng.

**Bài 2 (trừ — dùng $R=255(1-C),\ G=255(1-M),\ B=255(1-Y)$).**
- a) $C=0, M=1, Y=1 \Rightarrow R=255(1-0)=255,\ G=255(1-1)=0,\ B=255(1-1)=0 = (255,0,0)$ = **đỏ**. (Magenta hút lục, Yellow hút lam, còn đỏ.)
- b) $C=M=Y=1 \Rightarrow (0,0,0)$ = **đen** — xác nhận $C+M+Y=$ đen.
- c) $C=0.25 \Rightarrow R=255(0.75)=191,\ G=255,\ B=255 = (191, 255, 255)$ = **lục lam rất nhạt**.

**Bài 3.**
- a) $(255,128,0)$: $r=1, g=0.502, b=0$. $M=1, m=0, \Delta=1$. $L=0.5=50\%$. $S = 1/(1-0) = 100\%$. $M=r \Rightarrow H = 60(\frac{0.502-0}{1} \bmod 6) = 60(0.502) = 30.1° \approx 30°$. $\Rightarrow$ **HSL$(30°, 100\%, 50\%)$** (hue $30°$ = cam, giữa đỏ $0°$ và vàng $60°$). ✓
- b) Tăng $L$ từ $50\%$ lên $75\%$ → màu **sáng hơn** (nhạt dần về trắng): cam sẽ thành cam phấn / hồng đào nhạt. ($L$ cao hơn = gần trắng hơn.)

**Bài 4 (RGB → CMY).** Cách tiếp cận: đảo công thức $R=255(1-C) \Rightarrow C = 1 - R/255$.
`#1E90FF` $= (30, 144, 255)$.
- $C = 1 - 30/255 = 1 - 0.118 = 0.882 = \mathbf{88\%}$.
- $M = 1 - 144/255 = 1 - 0.565 = 0.435 = \mathbf{44\%}$.
- $Y = 1 - 255/255 = 0 = \mathbf{0\%}$.
$\Rightarrow$ CMY $\approx (88\%, 44\%, 0\%)$ — nhiều cyan, vừa magenta, không vàng: hợp lý cho một màu xanh dương.

Kiểm tra logic: $Y=0$ vì kênh lam $B=255$ (đầy) → không cần hút lam. Đây chính là lý do đổi ngược $C = 1 - R/255$.

> ⚠ **Lưu ý thực tế.** Đây là mô hình **lý tưởng hóa** để học. Máy in thật dùng bảng ICC profile phi tuyến và thêm mực K, nên giá trị CMYK in thực tế sẽ khác con số này. Đừng dùng công thức tuyến tính này cho in ấn chuyên nghiệp.

---

## Bài tiếp theo

**[Lesson 03 — Hòa sắc (Color harmony)](../lesson-03-color-harmony/)**: dùng vòng thuần sắc và HSL để phối màu — bổ túc (complementary), tương đồng (analogous), bộ ba (triadic) — tạo bảng màu hài hòa cho thiết kế.

Minh họa tương tác: [visualization.html](./visualization.html) — kéo slider R/G/B trộn ánh sáng, C/M/Y trộn mực, và xem RGB → hex → HSL cập nhật tức thời.
