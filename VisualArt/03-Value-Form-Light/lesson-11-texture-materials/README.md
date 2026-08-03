# Lesson 11 — Chất liệu & kết cấu (Texture & materials)

> Cùng một khối cầu, cùng một nguồn sáng — nhưng vẽ ra **gỗ**, **nhựa bóng**, **kim loại** hay **thủy tinh** là ba bốn câu chuyện hoàn toàn khác. Bí mật không nằm ở đường viền, mà ở **cách bề mặt xử lý ánh sáng**.

## Mục tiêu học tập

- Phân biệt rõ **kết cấu (texture)** và **chất liệu (material)** — hai khái niệm hay bị gộp làm một.
- Hiểu hai thành phần ánh sáng quyết định vẻ ngoài của vật: **khuếch tán (diffuse)** và **phản chiếu gương (specular)**.
- Nắm quy luật: **độ nhám (roughness)** điều khiển *kích thước & độ sắc* của đốm sáng (highlight); **cường độ phản chiếu (specular)** điều khiển *độ chói* của nó.
- Vẽ được 4 nhóm chất liệu điển hình — **matte / glossy / metal / glass** — chỉ bằng cách thay đổi hành vi ánh sáng, không cần vẽ chi tiết bề mặt.
- Tránh lỗi kinh điển: tô **mọi vật cùng một kiểu bóng**.

## Kiến thức tiền đề

- [Lesson 10 — Đánh bóng khối cơ bản](../lesson-10-shading-basic-forms/) — 6 vùng sáng-tối trên khối cầu: đỉnh sáng (highlight), vùng sáng (light), nửa tông (halftone), lằn tối lõi (core shadow), ánh phản xạ (reflected light), bóng đổ (cast shadow). Bài này *sửa đổi* các vùng đó theo từng chất liệu.
- [Lesson 01 — Vòng thuộc tính màu](../../01-Color/lesson-01-color-wheel-properties/) — khái niệm sắc độ (value). Ở đây ta dùng thang value 0–10 (0 = đen, 10 = trắng).

Chỉ cần số học cộng/nhân và chút lượng giác (`cos`, `arccos`) cho phần tính đốm sáng.

---

## 1. Kết cấu ≠ Chất liệu

> 💡 **Trực giác.** Sờ tay lên mặt bàn gỗ mộc và mặt bàn kính: bàn gỗ *ram ráp* (kết cấu), kính *trơn láng* (kết cấu). Nhưng khi **nhìn** từ xa, cái làm bạn biết "đây là gỗ, kia là kính" không phải vết vân li ti — mà là *gỗ hắt sáng đục mờ, kính cho sáng xuyên qua và lóe một điểm chói*. Đó là **chất liệu**: nó nói lên vật **làm bằng gì và ánh sáng cư xử ra sao trên nó**.

| Khái niệm | Định nghĩa | Nhìn thấy qua | Ví dụ |
|-----------|-----------|---------------|-------|
| **Kết cấu (texture)** | Cấu trúc **bề mặt vi mô** — gồ ghề, vân, sớ, hạt | chi tiết nhỏ, độ nhám sờ được | vân gỗ, sớ vải, lỗ rỗ đá |
| **Chất liệu (material)** | Vật **làm bằng gì** + ánh sáng phản ứng thế nào | phân bố sáng-tối tổng thể, kiểu đốm sáng | gỗ, nhựa, thép, thủy tinh |

**(a) Là gì.** *Kết cấu* trả lời "bề mặt gồ ghề đến đâu"; *chất liệu* trả lời "vật này là chất gì". Kết cấu là **một trong các yếu tố** cấu thành chất liệu (cụ thể: nó chính là *độ nhám* — xem mục 2), nhưng chất liệu còn gồm màu gốc, độ trong, mức phản chiếu...

**(b) Vì sao cần tách hai khái niệm.** Vì người mới hay nghĩ "vẽ gỗ = vẽ thật nhiều vân". Sai. Bạn có thể vẽ một khối gỗ **không một sợi vân** mà người xem vẫn thấy là gỗ — nhờ đúng kiểu ánh sáng đục mờ. Ngược lại, vẽ đầy vân nhưng để đốm sáng chói sắc như thủy tinh thì nó thành... nhựa giả vân gỗ.

**(c) Ví dụ cụ thể** (≥ 4):

1. **Táo đỏ** — kết cấu gần nhẵn, chất liệu hơi bóng (sáp vỏ) → đốm sáng nhỏ vừa.
2. **Viên gạch** — kết cấu ram ráp, chất liệu matte → gần như không có đốm sáng.
3. **Thìa inox nhẵn bóng** — kết cấu trơn, chất liệu kim loại → phản chiếu cả khung cảnh xung quanh.
4. **Kính mờ (frosted glass)** — kết cấu ráp *vi mô*, chất liệu trong → cho sáng xuyên nhưng khuếch tán, không thấy rõ vật sau.

> ⚠ **Lỗi thường gặp.** *"Muốn ra gỗ thì cứ vẽ vân là xong."* Vân là **kết cấu**, chỉ là lớp trang trí trên cùng. Nếu hành vi ánh sáng sai (đốm sáng chói sắc), khối vẫn không "ra gỗ". Vẽ đúng **chất liệu trước** (ánh sáng đục mờ), thêm **kết cấu (vân) sau** — không làm ngược.

> 🔁 **Dừng lại tự kiểm tra.**
> 1. Một khối cầu bê tông nhám và một khối cầu nhựa nhám cùng độ ráp bề mặt. Cái nào có đốm sáng rõ hơn?
> 2. Kết cấu là thành phần nào trong "chất liệu"?
>
> <details><summary>Đáp án</summary>
>
> 1. **Nhựa nhám** — bê tông là dielectric khuếch tán rất mạnh, phản chiếu gương yếu; nhựa dù nhám vẫn giữ mức phản chiếu cao hơn nên đốm sáng rõ hơn (dù đã bị nhám làm loang).
> 2. Kết cấu ≈ **độ nhám (roughness)** — một trong các tham số của chất liệu, quyết định đốm sáng loang hay gọn (mục 2).
> </details>

---

## 2. Nguyên lý cốt lõi: ánh sáng quyết định chất liệu

Ánh sáng chạm bề mặt tách làm **hai phần** phản xạ. Vẽ đúng chất liệu = pha đúng tỉ lệ và hình dạng của hai phần này.

### 2.1 Khuếch tán (diffuse) — "màu và khối"

**(a) Là gì.** Ánh sáng đâm vào bề mặt rồi **tán ra mọi hướng đều nhau**. Đây là phần cho ta thấy *màu gốc* của vật và *chuyển tông khối* mượt mà (sáng dần → tối dần).

**(b) Vì sao tồn tại.** Bề mặt vật đục (không phải gương) có vô số vi-mặt hướng lung tung → tia phản xạ tỏa đều, mắt nhìn hướng nào cũng thấy độ sáng gần như nhau. Nó **không phụ thuộc vị trí người xem**.

**(c) Ví dụ số — luật cosin (Lambert).** Độ sáng khuếch tán tỉ lệ với `cos θ`, trong đó `θ` là góc giữa **pháp tuyến bề mặt (N)** và **hướng tới nguồn sáng (L)**:

$$I_{diffuse} = k_d \cdot \max(0,\ \cos\theta)$$

Lấy thang value 0–10, giả sử nền môi trường (ambient) = 2 và hệ số khuếch tán trải 8 bậc, tức $V = 2 + 8\cos\theta$:

| Góc `θ` (N vs L) | `cos θ` | Value (0–10) | Vùng trên khối cầu |
|---:|---:|---:|---|
| 0° | 1.00 | **10.0** | vùng sáng nhất (light) |
| 30° | 0.87 | 8.9 | sáng |
| 45° | 0.71 | 7.7 | chuyển sang nửa tông |
| 60° | 0.50 | 6.0 | nửa tông (halftone) |
| 75° | 0.26 | 4.1 | gần lằn tối |
| 90° | 0.00 | **2.0** | đường phân giới (terminator) → vào bóng |

Đây chính là dải chuyển tông mượt đã học ở [Lesson 10](../lesson-10-shading-basic-forms/). **Matte sống nhờ phần này.**

### 2.2 Phản chiếu gương (specular) — "đốm sáng & chất bề mặt"

**(a) Là gì.** Ánh sáng bật khỏi bề mặt theo **đúng góc phản xạ gương** (góc tới = góc phản xạ), tạo ra **đốm sáng (highlight)** — ảnh của chính nguồn sáng in trên vật. Phần này **phụ thuộc vị trí người xem**: bạn nghiêng đầu, đốm sáng chạy theo.

**(b) Vì sao tồn tại / vì sao cần.** Không có nó thì mọi vật trông như đất nặn (chỉ khuếch tán). Đốm sáng chính là **manh mối số 1** báo cho não biết bề mặt nhẵn hay ráp, là nhựa hay kim loại. Vẽ chất liệu = chủ yếu là *tạo hình đúng cái đốm sáng này*.

**(c) Ví dụ số — độ nhám điều khiển kích thước đốm sáng.** Mô hình Phong: cường độ specular giảm theo lũy thừa của `cos`:

$$I_{spec} = k_s \cdot (\cos\alpha)^{n}$$

với `α` = góc lệch khỏi hướng phản xạ hoàn hảo, và `n` = **độ bóng (shininess)** — tỉ lệ nghịch với độ nhám (bề mặt càng nhẵn, `n` càng lớn).

"Đốm sáng to bao nhiêu?" đo bằng **nửa-góc** `α` nơi cường độ rớt còn một nửa, tức $(\cos\alpha)^n = 0.5$, suy ra:

$$\alpha_{1/2} = \arccos\!\left(0.5^{1/n}\right)$$

| Độ bóng `n` | Bề mặt | $0.5^{1/n}$ | Nửa-góc $\alpha_{1/2}$ | Đốm sáng |
|---:|---|---:|---:|---|
| 1 | rất nhám | 0.500 | **60.0°** | loang gần khắp mặt |
| 8 | nhám (gỗ, đất) | 0.917 | **23.5°** | rộng, mờ viền |
| 64 | bán bóng (nhựa mờ) | 0.989 | **8.4°** | vừa, viền rõ dần |
| 512 | rất nhẵn (men, kính) | 0.9986 | **3.0°** | nhỏ, sắc lẹm |

**Đọc bảng:** cứ mỗi lần bề mặt nhẵn hơn khiến `n` **tăng ~8 lần**, bán kính đốm sáng **co lại còn khoảng 37%** (60° → 23.5° → 8.4° → 3.0°). Đây là "cần gạt" trực quan nhất khi vẽ chất liệu: **nhám = đốm to-mờ, nhẵn = đốm bé-sắc.**

> 💡 **Trực giác về hai cần gạt.** Tưởng tượng chiếu đèn pin vào tường:
> - **Độ nhám (roughness)** = "lắc tay" → chấm sáng loang to hay gom nhỏ (đổi *kích thước & độ sắc*).
> - **Cường độ specular (`k_s`)** = "vặn to đèn" → chấm sáng chói hơn hay mờ hơn (đổi *độ chói*, không đổi kích thước).
>
> Hai cần này độc lập. Đó đúng là hai slider trong [visualization](./visualization.html) — kéo và tự xác nhận: **roughness đổi kích thước/độ sắc, specular đổi độ chói.**

> ❓ **Câu hỏi tự nhiên của người đọc.**
> - *"Đốm sáng luôn màu trắng à?"* → **Không.** Với vật *dielectric* (gỗ, nhựa, da, sứ) đốm sáng mang **màu của nguồn sáng** (thường trắng/vàng nhạt). Với **kim loại**, đốm sáng nhuốm **màu của chính kim loại** (vàng thì đốm ánh vàng, đồng thì ánh đỏ) — đây là dấu hiệu cực mạnh để phân biệt kim loại (mục 3.3).
> - *"Nhám thì đốm sáng biến mất hẳn không?"* → Không biến mất, mà **loang rộng và mờ đi** đến mức gần như hòa vào vùng khuếch tán — nên nhìn tưởng không có.
> - *"Tôi có phải tính `arccos` khi vẽ tay không?"* → Không. Bảng trên chỉ để *hiểu quy luật*. Khi vẽ, bạn ước lượng: gỗ → đốm to nhòe; men sứ → đốm bé chói.

> 🔁 **Dừng lại tự kiểm tra.**
> 1. Tăng `k_s` từ 0.3 lên 0.9 (giữ nguyên `n`). Đốm sáng thay đổi *kích thước* hay *độ chói*?
> 2. Bề mặt có `n = 8` và bề mặt `n = 512` — cái nào là men sứ?
>
> <details><summary>Đáp án</summary>
>
> 1. **Độ chói** (sáng hơn). Kích thước do `n` quyết định, không đổi.
> 2. `n = 512` — đốm nhỏ, sắc → men sứ nhẵn bóng. `n = 8` là bề mặt nhám như gỗ.
> </details>

📝 **Tóm tắt mục 2.**
- Ánh sáng phản xạ = **khuếch tán** (màu + khối mượt, không phụ thuộc mắt) + **specular** (đốm sáng, phụ thuộc mắt).
- **Roughness → kích thước & độ sắc** đốm sáng; **specular `k_s` → độ chói** đốm sáng. Hai cần độc lập.
- Luật số: `n` tăng ×8 ⇒ đốm co còn ~37%. Nhẵn = bé-sắc, nhám = to-mờ.

---

## 3. Bốn nhóm chất liệu điển hình

Cùng một khối cầu, cùng nguồn sáng trên-trái. Chỉ đổi *công thức pha ánh sáng*, ta ra bốn vật khác hẳn. Bảng tra nhanh:

| Chất liệu | Khuếch tán | Đốm sáng (specular) | Tương phản | Đặc trưng riêng |
|-----------|:---:|---|:---:|---|
| **Matte / Nhám** | mạnh | to, mờ, dịu | mềm | không phản chiếu; ánh phản xạ nhẹ |
| **Glossy / Bóng** | vừa | nhỏ, sắc, chói | cao (tại đốm) | 1 đốm sáng trắng gọn |
| **Metal / Kim loại** | rất yếu | rất sáng, **nhuốm màu KL** | rất cao, **đảo** | phản chiếu môi trường, dải sáng-tối lộn |
| **Transparent / Trong** | ~0 | nhỏ sắc + **caustics** | tùy nền | thấy xuyên qua, khúc xạ, mép sáng |

### 3.1 Matte / Nhám — gỗ, vải, đất, gạch, da lì

Bề mặt ráp, phản chiếu gương yếu và loang. Gần như **thuần khuếch tán**: chuyển tông mềm mại, đốm sáng (nếu có) là một vùng sáng **rộng và mờ**, không viền. Lằn tối lõi mềm, ánh phản xạ dịu.

- Value trải đều theo luật cosin (bảng mục 2.1), **không** có bậc nhảy đột ngột.
- Đừng đặt đốm trắng chói — sẽ hóa nhựa ngay.
- **Ví dụ:** khối gỗ, quả táo mờ, cái gối vải, tường trát.

### 3.2 Glossy / Bóng — nhựa, gốm men, sơn bóng, nhựa cây

Bề mặt nhẵn nhưng **đục** (không cho sáng xuyên). Vẫn có phần khuếch tán cho màu và khối như matte, **cộng thêm một đốm sáng nhỏ, sắc, gần trắng** (`n` lớn). Tương phản *cục bộ* tại đốm rất cao: đốm value ~10 nằm ngay cạnh thân value ~5.

- Chìa khóa: **kích thước đốm bé + viền rõ**. Càng bé càng bóng.
- Đốm sáng mang **màu nguồn sáng** (trắng/vàng nhạt), *không* nhuốm màu vật.
- **Ví dụ:** cốc sứ men, mũ bảo hiểm nhựa, quả cà chua căng, chai nhựa.

### 3.3 Metal / Kim loại — thép, vàng, đồng, nhôm

Đây là nhóm bị vẽ sai nhiều nhất. Kim loại **hầu như không khuếch tán** — thay vào đó nó **phản chiếu môi trường xung quanh** như một tấm gương (mờ hay rõ tùy độ nhẵn). Hệ quả:

- **Dải sáng-tối bị "đảo"**: chỗ phản chiếu bầu trời/đèn thì rất sáng, chỗ phản chiếu sàn/bóng tối thì rất tối — nên value nhảy **tương phản cao** và thứ tự sáng-tối **không** theo luật cosin mượt của matte.
- **Đốm sáng rất chói và nhuốm màu kim loại**: highlight của vàng ánh vàng, của đồng ánh đỏ-cam. (Dielectric thì đốm trắng — khác biệt cốt lõi.)
- **Ánh phản xạ ở mép** (mép dưới hắt sáng sàn) thường **sáng gần bằng đỉnh sáng** — không dịu như matte.
- Kim loại đánh xước (brushed) → đốm sáng **kéo dài thành vệt** theo hướng xước (anisotropic).
- **Ví dụ:** thìa inox, nhẫn vàng, ấm đồng, lon nhôm.

> ⚠ **Lỗi thường gặp.** Tô kim loại y hệt nhựa xám (khuếch tán mượt + 1 đốm trắng). Kết quả trông như *nhựa xám*, không phải kim loại. Muốn ra kim loại phải: **đảo/nén value tương phản cao + đốm nhuốm màu + mép sáng mạnh**.

### 3.4 Transparent / Trong — thủy tinh, nước, pha lê, đá quý

Ánh sáng **xuyên qua** và **bẻ hướng (khúc xạ)**. Ta thấy *nền phía sau* vật nhưng bị **méo mó**, cùng vài dấu hiệu đặc trưng:

- **Thấy xuyên** — value bên trong lấy theo *nền phía sau*, không phải màu gốc vật.
- **Mép sáng (Fresnel)**: rìa khối sáng lên do phản xạ mạnh ở góc tới xiên → viền phát sáng.
- **Đốm sáng nhỏ sắc** (bề mặt rất nhẵn, `n` lớn) — thường có **2 đốm**: một do phản xạ mặt trước, một do mặt sau.
- **Caustics**: chùm sáng bị thấu kính khối trong hội tụ, in một **đốm sáng gom** trên mặt bàn ngay dưới/cạnh bóng đổ — dấu hiệu "đắt giá" nhất của thủy tinh & nước.
- Kính **mờ (frosted)** = trong + nhám cao → sáng vẫn xuyên nhưng khuếch tán, nền sau nhòe hẳn.
- **Ví dụ:** ly nước, viên bi thủy tinh, giọt nước, khối pha lê.

> ❓ **Câu hỏi tự nhiên.** *"Vẽ thủy tinh có phải mô phỏng khúc xạ bằng công thức không?"* → Không cần chính xác vật lý. Chỉ cần: (1) cho thấy **nền sau bị méo/đảo** qua khối, (2) **mép sáng**, (3) **1–2 đốm sáng sắc**, (4) **một đốm caustic** dưới đáy. Bốn dấu hiệu này đủ để não đọc ra "trong suốt".

> 🔁 **Dừng lại tự kiểm tra.**
> 1. Nhìn một khối cầu: đốm sáng ánh **vàng cam**, value tương phản rất mạnh và như bị đảo. Chất liệu gì?
> 2. Khối cầu cho thấy vân bàn phía sau bị cong, mép phát sáng, có chấm sáng gom trên bàn. Chất liệu gì?
>
> <details><summary>Đáp án</summary>
>
> 1. **Kim loại** (vàng/đồng) — đốm nhuốm màu + value đảo tương phản cao.
> 2. **Thủy tinh/trong** — khúc xạ nền + mép sáng Fresnel + caustic.
> </details>

📝 **Tóm tắt mục 3.**
- **Matte:** thuần khuếch tán, đốm to-mờ hoặc không có, tông mềm.
- **Glossy:** khuếch tán + đốm nhỏ-sắc-trắng, tương phản cục bộ cao.
- **Metal:** ~không khuếch tán, phản chiếu môi trường, value đảo tương phản cao, **đốm nhuốm màu kim loại**, mép sáng mạnh.
- **Glass:** thấy xuyên (khúc xạ nền) + mép sáng Fresnel + đốm sắc + **caustic** dưới đáy.

---

## 4. Lỗi kinh điển: vẽ mọi thứ cùng một kiểu bóng

Đây là lỗi **số một** của người mới, đáng một mục riêng.

> ⚠ **Triệu chứng.** Vẽ tĩnh vật gồm quả táo, thìa inox, ly thủy tinh — cả ba đều tô **một đốm sáng trắng mờ tròn giống hệt nhau** và chuyển tông mượt như nhau. Kết quả: cả ba trông như **ba khối nhựa** khác màu. Người xem không phân biệt được chất liệu.

Vì sao sai và sửa ra sao:

| Vật | Kiểu bóng đúng phải là | Nếu tô "bóng chung" thì hỏng vì |
|-----|------------------------|--------------------------------|
| Táo (matte hơi bóng) | đốm **vừa, mờ**, tông mềm | tạm chấp nhận — nhưng đừng để đốm quá sắc |
| Thìa inox (metal) | value **đảo, tương phản cao**, đốm chói, mép sáng, phản chiếu | đốm mờ tròn + tông mượt → thành thìa nhựa xám |
| Ly thủy tinh (glass) | **thấy xuyên**, mép sáng, caustic | tô đặc mờ → thành ly nhựa đục |

**Cách sửa (quy trình 3 câu hỏi trước khi tô mỗi vật):**
1. *Bề mặt nhẵn hay ráp?* → quyết định **kích thước đốm** (roughness).
2. *Dielectric hay kim loại?* → đốm **trắng** hay **nhuốm màu**; value mượt hay **đảo**.
3. *Đục hay trong?* → có **thấy xuyên + caustic** không.

Trả lời ba câu này cho từng vật *trước khi* đặt bút, mỗi vật sẽ tự có "chữ ký ánh sáng" riêng.

> 💡 **Mẹo kiểm tra nhanh.** Che màu đi, chỉ nhìn **sắc độ (value) và đốm sáng**. Nếu ba vật vẫn phân biệt được chất liệu khi mất màu → bạn đã vẽ đúng chất liệu (không phải chỉ đúng màu).

---

## 5. Bài tập

**Bài 1 (tính đốm sáng).** Cho ba bề mặt có độ bóng `n = 4`, `n = 16`, `n = 256`. Dùng công thức nửa-góc $\alpha_{1/2} = \arccos(0.5^{1/n})$, tính bán kính góc đốm sáng của mỗi bề mặt và gán mỗi cái cho một chất liệu hợp lý (gỗ nhám / nhựa bán bóng / men sứ).

**Bài 2 (nhận diện chất liệu).** Với mỗi mô tả, gọi tên nhóm chất liệu (matte / glossy / metal / glass):
- a) Đốm sáng nhỏ trắng chói nằm trên thân đỏ chuyển tông mượt; tương phản cao ngay tại đốm.
- b) Đốm sáng ánh vàng, các dải sáng-tối tương phản mạnh và như bị lộn ngược, mép dưới sáng gần bằng đỉnh.
- c) Đốm sáng mờ, rộng, viền nhòe; toàn khối chuyển tông đều và mềm, không có phản chiếu sắc nét.
- d) Nhìn thấy hoa văn mặt bàn phía sau bị cong méo xuyên qua khối; rìa phát sáng; có một chấm sáng gom trên mặt bàn cạnh bóng đổ.

**Bài 3 (sửa lỗi — vận dụng).** Một người vẽ tĩnh vật: **quả táo**, **thìa inox**, **ly thủy tinh**, và tô cả ba bằng *cùng một đốm sáng trắng mờ tròn + chuyển tông mượt*. Chỉ ra vì sao thìa và ly bị sai, và nêu cụ thể phải sửa gì cho từng vật.

**Bài 4 (khuếch tán Lambert).** Với mô hình $V = 2 + 8\cos\theta$ (thang value 0–10), tính value tại `θ = 0°, 45°, 60°, 90°`. Value nào ứng với "đường phân giới sáng-tối" (terminator)? Vì sao value tại 90° không bằng 0?

---

## 6. Lời giải chi tiết

**Bài 1.** Áp công thức $\alpha_{1/2} = \arccos(0.5^{1/n})$:

- `n = 4`: $0.5^{1/4} = 0.5^{0.25} = 0.8409 \Rightarrow \alpha = \arccos(0.8409) \approx \mathbf{32.8°}$ → đốm **to** → **gỗ nhám**.
- `n = 16`: $0.5^{1/16} = 0.9576 \Rightarrow \alpha = \arccos(0.9576) \approx \mathbf{16.7°}$ → đốm **vừa** → **nhựa bán bóng**.
- `n = 256`: $0.5^{1/256} = 0.9973 \Rightarrow \alpha = \arccos(0.9973) \approx \mathbf{4.2°}$ → đốm **nhỏ sắc** → **men sứ**.

Cách tiếp cận: `n` càng lớn ⇒ $0.5^{1/n}$ càng gần 1 ⇒ `arccos` càng nhỏ ⇒ đốm sáng càng bé. Quy luật đơn điệu: nhẵn hơn = đốm bé hơn.

**Bài 2.**
- a) **Glossy / bóng** (nhựa, men) — khuếch tán mượt cho màu + 1 đốm nhỏ trắng sắc, tương phản cục bộ cao.
- b) **Metal / kim loại** (vàng) — đốm **nhuốm màu** kim loại + value **đảo, tương phản cao** + mép sáng mạnh.
- c) **Matte / nhám** — thuần khuếch tán, đốm to-mờ hoặc gần như không, tông mềm đều.
- d) **Transparent / thủy tinh** — thấy xuyên (khúc xạ nền méo) + mép sáng Fresnel + **caustic** trên bàn.

**Bài 3.** Cách tiếp cận: chạy "3 câu hỏi" của mục 4 cho từng vật.

- **Quả táo (matte hơi bóng):** tạm ổn với đốm mờ tròn, nhưng nên giữ đốm **vừa và hơi mờ**, tông mềm — không cần sửa nhiều.
- **Thìa inox (metal) — SAI:** đốm mờ tròn + tông mượt biến nó thành *nhựa xám*. **Sửa:** (1) nén value thành các mảng **tương phản cao và đảo** (chỗ phản chiếu sáng rất sáng, chỗ phản chiếu tối rất tối, không mượt); (2) đốm sáng **chói và sắc**, có thể **nhuốm màu môi trường/kim loại**; (3) thêm **mép sáng** ở rìa hắt bàn; (4) gợi phản chiếu vật xung quanh.
- **Ly thủy tinh (glass) — SAI:** tô đặc mờ biến nó thành *nhựa đục*. **Sửa:** (1) cho **thấy xuyên** — value bên trong lấy theo **nền phía sau**, méo đi; (2) **mép sáng** quanh rìa; (3) **1–2 đốm sáng nhỏ sắc**; (4) một **caustic** — chấm sáng gom trên bàn cạnh bóng đổ.

Điểm chốt: mỗi vật phải có **"chữ ký ánh sáng" riêng**; tô chung một kiểu là xóa nhòa chất liệu.

**Bài 4.** $V = 2 + 8\cos\theta$:

| `θ` | `cos θ` | `V = 2 + 8·cos θ` |
|---:|---:|---:|
| 0° | 1.00 | $2 + 8(1.00) = \mathbf{10.0}$ |
| 45° | 0.707 | $2 + 8(0.707) = \mathbf{7.66}$ |
| 60° | 0.500 | $2 + 8(0.500) = \mathbf{6.0}$ |
| 90° | 0.000 | $2 + 8(0.000) = \mathbf{2.0}$ |

- **Terminator (đường phân giới sáng-tối)** ứng với `θ = 90°` → `V = 2`: đây là nơi bề mặt bắt đầu *quay lưng* với nguồn sáng, khuếch tán tắt (`cos 90° = 0`).
- Value tại 90° **không bằng 0** vì còn **ánh sáng môi trường (ambient) = 2**: trong thực tế luôn có sáng dội từ tường/sàn/trời, nên vùng tối không bao giờ đen tuyệt đối. Đây cũng là lý do ta thấy **ánh phản xạ (reflected light)** ở rìa tối của khối ([Lesson 10](../lesson-10-shading-basic-forms/)).

📝 **Tóm tắt bài học.**
- **Kết cấu** = độ ráp bề mặt (chi tiết vi mô); **chất liệu** = vật làm bằng gì + ánh sáng cư xử ra sao. Vẽ chất liệu trước, kết cấu sau.
- Ánh sáng = **khuếch tán** (màu + khối mượt) + **specular** (đốm sáng = manh mối chất liệu).
- **Roughness** đổi *kích thước/độ sắc* đốm; **specular `k_s`** đổi *độ chói*. `n` ×8 ⇒ đốm co còn ~37%.
- Bốn chất liệu: **matte** (đốm to-mờ), **glossy** (đốm nhỏ-sắc-trắng), **metal** (phản chiếu, value đảo, đốm nhuốm màu), **glass** (thấy xuyên + mép sáng + caustic).
- Lỗi số một: **tô mọi vật cùng một kiểu bóng** → mất chất liệu. Chạy "3 câu hỏi" cho từng vật.

---

## Bài tiếp theo

**[Lesson 12 — Từ nét phác tới bản hoàn chỉnh](../lesson-12-line-to-finished/)**: gom tất cả — đường nét, khối, sáng-tối, chất liệu — thành quy trình hoàn thiện một bức vẽ từ nét chì đầu tiên đến bản render cuối.

Minh họa tương tác: **[visualization.html](./visualization.html)** — so sánh 4 chất liệu trên cùng khối cầu, và tự kéo slider **độ nhám** + **cường độ specular** để thấy đốm sáng biến hình.
