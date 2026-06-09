# Lesson 08 — Kính thiên văn & Ánh sáng (Telescopes & Light)

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Hiểu vì sao **khẩu độ (aperture)** — đường kính kính — quyết định "sức mạnh" của kính: lượng sáng thu được tỉ lệ với $D^2$.
- Tính **độ phân giải (resolution)** của kính bằng tiêu chuẩn Rayleigh $\theta = 1{,}22 \lambda/D$ và hiểu ý nghĩa của nó.
- Phân biệt **độ phóng đại (magnification)** với khẩu độ — vì sao "zoom to" không phải là tất cả.
- So sánh kính **khúc xạ (refractor)** và **phản xạ (reflector)**.
- Nắm **phổ điện từ (electromagnetic spectrum)**: vô tuyến → hồng ngoại → khả kiến → tử ngoại → tia X → gamma, và vì sao phải quan sát **đa bước sóng (multi-wavelength)**.
- Hiểu **cửa sổ khí quyển (atmospheric window)** và vì sao cần **kính không gian** (Hubble, JWST).

## Kiến thức tiền đề

- Ánh sáng, sóng, bước sóng — quang học & vật lý hiện đại: [`../../../Physics/03-Optics-ModernPhysics/`](../../../Physics/03-Optics-ModernPhysics/).
- Quan sát của Galileo qua kính: [`../lesson-07-history-models/`](../lesson-07-history-models/).
- Góc, đơn vị radian/arcsecond — lượng giác: [`../../../Math/03-Trig-Complex/`](../../../Math/03-Trig-Complex/).

---

## 1. Khẩu độ — "cái xô hứng ánh sáng"

> 💡 **Trực giác / Hình dung.** Mắt thường là một cái xô tí hon hứng "mưa photon" từ trời. Kính thiên văn là một cái **xô khổng lồ**: càng to miệng xô, càng hứng được nhiều photon mỗi giây → thấy được vật mờ hơn. Đây là công dụng QUAN TRỌNG NHẤT của kính, hơn cả phóng đại.

**Định nghĩa (3 phần) — Khẩu độ:**

- **(a) Là gì** — Khẩu độ $D$ là đường kính của thấu kính/gương chính thu sáng. Diện tích thu sáng là hình tròn $A = \pi(D/2)^2 \propto D^2$.
- **(b) Vì sao quan trọng** — Vật ở xa rất mờ; số photon tới ít. Khẩu độ lớn gom nhiều photon hơn → ảnh sáng hơn, thấy được thiên thể mờ hơn. Lượng sáng thu **tỉ lệ với $D^2$**, không phải $D$.
- **(c) Ví dụ số** — Đồng tử mắt người (tối) ~7 mm. Kính 70 mm thu sáng gấp $(70/7)^2 = 100$ lần mắt → thấy được vật mờ hơn 100 lần.

> 📐 **Công thức then chốt:** lượng sáng thu được tỉ lệ bình phương khẩu độ:
>
> $$\frac{\text{Sáng}_1}{\text{Sáng}_2} = \left(\frac{D_1}{D_2}\right)^2$$

**Walk-through số thật (verify):** so kính $D_1 = 1 \ \text{m}$ (1000 mm) với kính $D_2 = 0{,}1 \ \text{m}$ (100 mm):

$$\frac{\text{Sáng}_1}{\text{Sáng}_2} = \left(\frac{1000}{100}\right)^2 = 10^2 = 100 \ \text{lần}$$

→ Kính 1 m thu sáng gấp **100 lần** kính 10 cm (dù đường kính chỉ gấp 10 lần). Đó là vì sao đài thiên văn đua nhau làm gương ngày càng lớn.

**4 ví dụ số (so với mắt 7 mm):**

| Dụng cụ | D | Lượng sáng so mắt $= (D/7\text{mm})^2$ |
|---|---|---|
| Mắt người | 7 mm | 1× |
| Ống nhòm | 50 mm | $(50/7)^2 \approx 51\times$ |
| Kính nghiệp dư | 200 mm | $(200/7)^2 \approx 816\times$ |
| Kính Keck | 10 m = 10000 mm | $(10000/7)^2 \approx 2$ triệu $\times$ |

> ⚠ **Lỗi thường gặp.** "Kính to gấp đôi thì sáng gấp đôi." **Sai.** Sáng theo $D^2$: gấp đôi đường kính → sáng gấp **4** lần. Gấp 10 → sáng gấp 100.

> ❓ **Câu hỏi tự nhiên.**
> - *"Vì sao không cứ tăng phóng đại để thấy vật mờ?"* — Phóng đại chỉ "kéo to" ảnh; nếu không đủ photon thì ảnh vẫn tối và mờ, phóng to chỉ ra mảng xám. Cần khẩu độ để **gom sáng**, không phải zoom.
> - *"Kính nghiệp dư 200 mm thấy được gì?"* — Vành Sao Thổ, các vệ tinh Galileo của Sao Mộc, nhiều tinh vân — vì thu sáng ~800 lần mắt.

> 🔁 **Dừng lại tự kiểm tra.** Kính A có khẩu độ 40 cm, kính B 20 cm. A thu sáng gấp mấy lần B?
> <details><summary>Đáp án</summary>$(40/20)^2 = 2^2 = 4$ lần. (Không phải 2 lần — nhớ bình phương!)</details>

> 📝 **Tóm tắt mục 1.** Khẩu độ = cái xô hứng photon. Lượng sáng $\propto D^2$. Đây là công dụng chính của kính, quan trọng hơn phóng đại.

---

## 2. Độ phân giải — tiêu chuẩn Rayleigh

> 💡 **Trực giác.** Hai đèn pha ô tô ở xa trông như **một** đốm sáng; lại gần mới tách ra **hai**. Khả năng "tách hai điểm gần nhau" gọi là **độ phân giải**. Khẩu độ lớn không chỉ sáng hơn mà còn **phân giải tốt hơn** — thấy chi tiết nhỏ hơn.

**Định nghĩa (3 phần) — Độ phân giải góc:**

- **(a) Là gì** — Góc nhỏ nhất $\theta$ giữa hai điểm mà kính còn tách rời được. $\theta$ càng nhỏ = phân giải càng tốt.
- **(b) Vì sao tồn tại** — Ánh sáng là sóng, qua khẩu độ tròn bị **nhiễu xạ (diffraction)** thành đốm mờ (đĩa Airy). Hai điểm quá gần thì hai đốm chồng lên nhau, không tách được. Giới hạn này là vật lý, không thể vượt bằng cách mài kính tốt hơn.
- **(c) Ví dụ số** — Mắt người ($D \sim 7$ mm, $\lambda \sim 550$ nm) có $\theta \sim 20''$ (giây cung); đó là vì sao bạn không thấy được vành Sao Thổ bằng mắt thường (nó chỉ rộng ~40″ nhưng cần tách khe rất nhỏ).

> 📐 **Tiêu chuẩn Rayleigh:**
>
> $$\theta = 1{,}22 \cdot \frac{\lambda}{D} \quad (\theta \ \text{tính bằng radian}; \ \lambda \ \text{và} \ D \ \text{cùng đơn vị})$$
>
> Đổi sang giây cung (arcsecond): nhân $\times 206265$.

**Walk-through số thật (verify, $\lambda = 550 \ \text{nm} = 550 \times 10^{-9} \ \text{m}$):**

Kính $D = 0{,}1 \ \text{m}$ (10 cm):

$$\begin{aligned}
\theta &= 1{,}22 \times \frac{550 \times 10^{-9}}{0{,}1} = 6{,}71 \times 10^{-6} \ \text{rad} \\
\theta('') &= 6{,}71 \times 10^{-6} \times 206265 \approx 1{,}38''
\end{aligned}$$

Kính $D = 1 \ \text{m}$:

$$\begin{aligned}
\theta &= 1{,}22 \times \frac{550 \times 10^{-9}}{1} = 6{,}71 \times 10^{-7} \ \text{rad} \\
\theta('') &= 6{,}71 \times 10^{-7} \times 206265 \approx 0{,}138''
\end{aligned}$$

→ Kính 1 m phân giải tốt gấp **10 lần** kính 10 cm ($\theta$ nhỏ hơn 10 lần). Vậy khẩu độ lớn vừa sáng hơn ($D^2$) vừa nét hơn ($1/D$).

**4 ví dụ số ($\theta$ tại $\lambda = 550$ nm):**

| Kính | D | $\theta$ (rad) | $\theta$ (giây cung) |
|---|---|---|---|
| Mắt | 7 mm | $9{,}6 \times 10^{-5}$ | ~20″ |
| Kính 10 cm | 0,1 m | $6{,}7 \times 10^{-6}$ | ~1,4″ |
| Hubble | 2,4 m | $2{,}8 \times 10^{-7}$ | ~0,057″ |
| Keck | 10 m | $6{,}7 \times 10^{-8}$ | ~0,014″ |

> ⚠ **Lỗi thường gặp.** Quên đổi đơn vị: $\lambda$ phải cùng đơn vị với $D$ (mét với mét). Và kết quả ra **radian** — phải nhân 206265 để ra giây cung.

> ❓ **Câu hỏi tự nhiên.**
> - *"Nếu Hubble $\theta \sim 0{,}06''$ thì kính mặt đất 10 m phải tốt hơn chứ?"* — Trên lý thuyết có ($\theta \sim 0{,}014''$), nhưng **khí quyển làm nhiễu** (turbulence) khiến kính mặt đất thường chỉ đạt ~0,5–1″ — đó là vì sao Hubble (trên khí quyển) lâu nay thắng về độ nét, dù nhỏ hơn. (Quang học thích nghi — adaptive optics — nay giúp kính mặt đất bù phần nào.)
> - *"Tại sao $\theta$ phụ thuộc $\lambda$?"* — Vì nhiễu xạ mạnh hơn với bước sóng dài. Kính vô tuyến ($\lambda$ rất dài) cần khẩu độ **khổng lồ** (hàng chục–trăm mét) để có cùng độ phân giải.

> 🔁 **Dừng lại tự kiểm tra.** Cùng khẩu độ, quan sát bằng tia hồng ngoại ($\lambda$ lớn hơn khả kiến) thì độ phân giải tốt hơn hay kém hơn?
> <details><summary>Đáp án</summary>**Kém hơn** ($\theta$ lớn hơn) vì $\theta \propto \lambda$. Bước sóng dài → nhiễu xạ mạnh → khó tách hai điểm. Muốn bù phải tăng D.</details>

> 📝 **Tóm tắt mục 2.** Độ phân giải $\theta = 1{,}22\lambda/D$. $\theta$ nhỏ = nét hơn. Khẩu độ lớn → $\theta$ nhỏ ($\propto 1/D$). Bước sóng dài → $\theta$ lớn ($\propto \lambda$). Khí quyển có thể làm kính mặt đất kém hơn lý thuyết.

---

## 3. Độ phóng đại & loại kính

> 💡 **Trực giác.** Phóng đại chỉ là "kéo to góc nhìn", như zoom điện thoại — zoom quá thì ảnh mờ vì hết chi tiết thật. Khẩu độ mới quyết định *có bao nhiêu chi tiết và sáng* để mà zoom.

**Độ phóng đại:** $M = f_{\text{vật}} / f_{\text{thị}}$ (tiêu cự vật kính chia tiêu cự thị kính). Đổi thị kính → đổi phóng đại, nhưng khẩu độ (do vật kính) không đổi.

**4 ví dụ số:** kính có $f_{\text{vật}} = 1000 \ \text{mm}$:

| Thị kính $f_{\text{thị}}$ | $M = 1000/f_{\text{thị}}$ |
|---|---|
| 25 mm | 40× |
| 10 mm | 100× |
| 6 mm | 167× |
| 4 mm | 250× (thường đã quá giới hạn hữu ích) |

> ⚠ **Lỗi thường gặp.** Quảng cáo "kính phóng đại 600×!" cho khẩu độ bé. **Phóng đại hữu ích tối đa $\approx 2\times$ khẩu độ (mm)**: kính 60 mm chỉ hữu ích tới ~120×; zoom hơn chỉ ra ảnh mờ vì thiếu sáng và phân giải.

**Khúc xạ vs Phản xạ:**

| | Khúc xạ (refractor) | Phản xạ (reflector) |
|---|---|---|
| Bộ phận thu sáng | Thấu kính | Gương lõm |
| Galileo dùng | ✓ (1609) | — |
| Newton phát minh | — | ✓ (1668) |
| Nhược | Quang sai màu, khó làm to | Cần chỉnh gương |
| Ưu | Ảnh sắc, ít bảo trì | Làm khẩu độ rất to dễ & rẻ hơn |

> ❓ **Câu hỏi tự nhiên.** *"Vì sao kính lớn đều là phản xạ?"* — Vì thấu kính lớn rất nặng, chỉ đỡ được ở viền (giữa võng xuống), và bị quang sai màu. Gương đỡ được toàn bộ mặt sau và không quang sai màu → mọi kính khổng lồ (Hubble, Keck, JWST) đều dùng gương.

> 🔁 **Dừng lại tự kiểm tra.** Kính khẩu độ 80 mm. Phóng đại hữu ích tối đa khoảng bao nhiêu?
> <details><summary>Đáp án</summary>~2× khẩu độ(mm) $= 2 \times 80 = 160\times$. Zoom quá mức này chỉ phóng to ảnh mờ.</details>

> 📝 **Tóm tắt mục 3.** Phóng đại $= f_{\text{vật}}/f_{\text{thị}}$, đổi bằng thị kính. Hữu ích tối đa ~2× khẩu độ(mm). Kính lớn dùng gương (phản xạ).

---

## 4. Phổ điện từ & quan sát đa bước sóng

> 💡 **Trực giác.** Ánh sáng nhìn thấy chỉ là **một khe hẹp** trong dải sóng điện từ rộng lớn. Mỗi vùng bước sóng kể một câu chuyện khác: vô tuyến thấy khí lạnh, hồng ngoại thấy bụi ấm, tia X thấy khí siêu nóng quanh lỗ đen. Chỉ nhìn khả kiến = nghe một nhạc cụ trong cả dàn nhạc.

**Định nghĩa (3 phần) — Phổ điện từ:**

- **(a) Là gì** — Dải tất cả sóng điện từ, sắp theo bước sóng λ (hay tần số). Tất cả truyền cùng tốc độ ánh sáng, chỉ khác λ.
- **(b) Vì sao quan trọng** — Vật ở nhiệt độ/quá trình khác nhau phát xạ ở bước sóng khác nhau. Quan sát nhiều dải = ghép bức tranh đầy đủ về một thiên thể.
- **(c) Ví dụ số** — Mặt Trời (~5800 K) phát mạnh nhất ở khả kiến (~500 nm); khí giữa các sao lạnh phát vô tuyến (cm–m); đĩa bồi tụ quanh lỗ đen (triệu K) phát tia X (~nm).

**Thứ tự phổ (λ giảm dần → năng lượng tăng dần):**

| Vùng | Bước sóng λ | Quan sát thấy |
|---|---|---|
| Vô tuyến (radio) | > 1 mm | Khí hydro lạnh, pulsar, nền vi sóng vũ trụ |
| Hồng ngoại (infrared) | 700 nm – 1 mm | Bụi ấm, sao đang hình thành, vật xuyên qua bụi |
| Khả kiến (visible) | ~400–700 nm | Sao, hành tinh (mắt người thấy) |
| Tử ngoại (UV) | ~10–400 nm | Sao trẻ nóng, khí ion hóa |
| Tia X | ~0.01–10 nm | Khí siêu nóng, đĩa quanh lỗ đen, tàn dư siêu tân tinh |
| Gamma | < 0.01 nm | Vụ nổ năng lượng cực cao (GRB), hủy hạt |

**4 ví dụ số (λ và năng lượng tương đối):**

| Sóng | λ điển hình | Nóng/quá trình |
|---|---|---|
| Radio 21 cm | 0.21 m | Hydro trung hòa ~100 K |
| IR | 10 μm = 10⁻⁵ m | Bụi ~300 K |
| Visible | 550 nm = 5.5×10⁻⁷ m | Sao ~5800 K |
| X-ray | 1 nm = 10⁻⁹ m | Plasma ~10⁶ K |

> ⚠ **Lỗi thường gặp.** "Tia X, gamma là 'tia', không phải ánh sáng." Sai — chúng **là** sóng điện từ y như ánh sáng nhìn thấy, chỉ khác bước sóng (ngắn hơn, năng lượng cao hơn).

### 4.1 Cửa sổ khí quyển & kính không gian

> 💡 **Trực giác.** Khí quyển Trái Đất như tấm rèm: nó **trong suốt** với khả kiến và một phần vô tuyến (nên ta thấy sao, nghe radio), nhưng **chặn gần hết** UV, tia X, gamma và nhiều dải hồng ngoại. Muốn quan sát các dải bị chặn → phải đưa kính **lên không gian**.

- **Cửa sổ quang học:** khả kiến + chút IR/UV gần → kính mặt đất quan sát được.
- **Cửa sổ vô tuyến:** dải radio → kính vô tuyến mặt đất (như ALMA).
- **Bị chặn (cần kính không gian):** hầu hết UV, tia X, gamma, nhiều dải IR (do hơi nước hấp thụ).

**Kính không gian tiêu biểu:**

| Kính | Khẩu độ | Dải sóng | Phóng (năm) |
|---|---|---|---|
| Hubble (HST) | 2.4 m | Khả kiến, UV gần, IR gần | 1990 |
| JWST | 6.5 m | Hồng ngoại (0.6–28 μm) | 2021 |
| Chandra | (gương lồng) | Tia X | 1999 |

> ❓ **Câu hỏi tự nhiên.**
> - *"Vì sao JWST quan sát hồng ngoại chứ không khả kiến như Hubble?"* — Vì (1) hồng ngoại xuyên qua bụi, thấy sao/thiên hà trẻ; (2) ánh sáng từ thiên hà rất xa bị **dịch đỏ (redshift)** từ khả kiến sang hồng ngoại do vũ trụ giãn nở → muốn thấy vũ trụ sơ khai phải nhìn IR. Vì IR bị khí quyển + chính nhiệt của kính làm nhiễu, JWST đặt ở không gian và làm lạnh sâu.
> - *"Vì sao Hubble vẫn hữu ích dù nhỏ hơn kính mặt đất?"* — Trên khí quyển, không bị turbulence → đạt độ phân giải gần giới hạn lý thuyết θ ~0.06″, ổn định.

> 🔁 **Dừng lại tự kiểm tra.** Muốn quan sát tia X từ đĩa khí quanh một lỗ đen, kính mặt đất có làm được không?
> <details><summary>Đáp án</summary>**Không.** Khí quyển chặn gần hết tia X. Phải dùng kính không gian (như Chandra) đặt trên khí quyển.</details>

> 📝 **Tóm tắt mục 4.** Phổ điện từ: radio → IR → khả kiến → UV → X → gamma (λ giảm, năng lượng tăng). Mỗi dải kể chuyện khác → quan sát đa bước sóng. Khí quyển chỉ mở "cửa sổ" khả kiến + vô tuyến → các dải khác cần kính không gian (Hubble, JWST, Chandra).

---

## Bài tập

1. **Lượng sáng.** So sánh lượng sáng thu được giữa kính Keck ($D = 10$ m) và mắt người ($D = 7$ mm). Bằng bao nhiêu lần?

2. **Độ phân giải Rayleigh.** Tính độ phân giải (giây cung) của Hubble ($D = 2{,}4$ m) ở $\lambda = 550$ nm. (Dùng $\theta = 1{,}22\lambda/D$, rồi $\times 206265$.)

3. **Khẩu độ cần thiết.** Bạn muốn một kính phân giải $\theta = 0{,}1''$ ở $\lambda = 550$ nm. Cần khẩu độ tối thiểu bao nhiêu mét?

4. **Phóng đại hữu ích.** Kính khẩu độ 150 mm, tiêu cự vật kính 1200 mm. (a) Với thị kính 8 mm, phóng đại bằng bao nhiêu? (b) Phóng đại hữu ích tối đa của kính này là bao nhiêu? (c) Thị kính 8 mm có vượt giới hạn không?

5. **Chọn dải sóng.** Bạn muốn nghiên cứu: (a) sao đang hình thành ẩn trong đám mây bụi; (b) khí siêu nóng quanh lỗ đen. Mỗi trường hợp nên quan sát ở dải nào, và kính mặt đất hay không gian?

---

## Lời giải chi tiết

### Bài 1 — Lượng sáng Keck vs mắt

**Cách tiếp cận:** lượng sáng $\propto D^2$. Đổi cùng đơn vị: Keck 10 m = 10000 mm, mắt 7 mm.

$$\frac{\text{Sáng}_{\text{Keck}}}{\text{Sáng}_{\text{mắt}}} = \left(\frac{10000}{7}\right)^2 = (1428{,}6)^2 \approx 2{,}04 \times 10^6$$

→ Keck thu sáng gấp **~2 triệu lần** mắt người. Đó là vì sao nó "nhìn" được những thiên hà cực mờ ở xa hàng tỉ năm ánh sáng.

### Bài 2 — Độ phân giải Hubble

$$\begin{aligned}
\theta &= 1{,}22 \times \frac{\lambda}{D} = 1{,}22 \times \frac{550 \times 10^{-9} \ \text{m}}{2{,}4 \ \text{m}} \\
&= 1{,}22 \times 2{,}292 \times 10^{-7} = 2{,}796 \times 10^{-7} \ \text{rad} \\
\theta('') &= 2{,}796 \times 10^{-7} \times 206265 \approx 0{,}058''
\end{aligned}$$

→ Hubble phân giải ~**0,06 giây cung** — đủ nét để tách hai ngôi sao cách nhau bằng chiều rộng một đồng xu nhìn từ ~70 km.

### Bài 3 — Khẩu độ cần thiết

**Đảo công thức Rayleigh:** muốn $\theta = 0{,}1''$, đổi ra radian trước: $0{,}1/206265 = 4{,}848 \times 10^{-7} \ \text{rad}$.

$$\begin{aligned}
D &= 1{,}22 \frac{\lambda}{\theta} = 1{,}22 \times \frac{550 \times 10^{-9}}{4{,}848 \times 10^{-7}} \\
&= 1{,}22 \times 1{,}134 = 1{,}384 \ \text{m}
\end{aligned}$$

→ Cần khẩu độ tối thiểu **~1,4 m**. (Trên thực tế, từ mặt đất còn phải vượt nhiễu khí quyển bằng quang học thích nghi.)

### Bài 4 — Phóng đại

**(a)** $M = f_{\text{vật}}/f_{\text{thị}} = 1200/8 = 150\times$.

**(b)** Phóng đại hữu ích tối đa $\approx 2\times$ khẩu độ(mm) $= 2 \times 150 = 300\times$.

**(c)** $150\times < 300\times$ → **không vượt giới hạn**, đây là phóng đại hợp lý cho khẩu độ 150 mm.

### Bài 5 — Chọn dải sóng

**(a) Sao hình thành trong bụi:** dùng **hồng ngoại (infrared)** — ánh sáng IR xuyên qua bụi (bụi chặn khả kiến nhưng cho IR đi qua). Vì khí quyển chặn nhiều dải IR và chính nhiệt kính gây nhiễu → ưu tiên **kính không gian** (như JWST).

**(b) Khí siêu nóng quanh lỗ đen:** khí ~triệu K phát mạnh ở **tia X**. Khí quyển chặn tia X → bắt buộc **kính không gian** (như Chandra).

---

## Code & Minh họa

- **Visualization tương tác**: [visualization.html](./visualization.html) — gồm:
  - **Máy tính khẩu độ**: nhập 2 khẩu độ → tính tỉ lệ lượng sáng ($D^2$) và độ phân giải Rayleigh ($\theta$ ở giây cung), kèm thanh so sánh trực quan.
  - **Trình khám phá phổ điện từ**: thanh trượt bước sóng từ gamma → radio; hiển thị vùng, năng lượng tương đối, thiên thể quan sát được, và liệu khí quyển có chặn (→ cần kính không gian) hay không.

---

## Bài tiếp theo

→ **Tầng 2 — Sao & Thiên hà**: [Lesson 01 — Bức xạ & phổ](../../02-StarsGalaxies/lesson-01-radiation-spectra/). Ta đã có công cụ (kính, phổ điện từ); giờ học cách "đọc" ánh sáng sao để biết nhiệt độ, thành phần, vận tốc của chúng.

**Tham khảo chéo:** quang học & sóng ánh sáng → [`../../../Physics/03-Optics-ModernPhysics/`](../../../Physics/03-Optics-ModernPhysics/); quan sát Galileo → [`../lesson-07-history-models/`](../lesson-07-history-models/).
