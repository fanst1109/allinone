// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: VisualArt/03-Value-Form-Light/lesson-10-shading-basic-forms/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 10 — Đổ bóng khối cơ bản (Shading basic forms)

> Ánh sáng chạm vào một khối luôn để lại **cùng một trật tự** năm vùng sáng-tối. Học thuộc trật tự đó một lần, bạn đổ bóng được mọi vật thể — vì mọi vật thể đều rút gọn về cầu, hộp, trụ, nón.

## Mục tiêu học tập

- Gọi tên và **định vị** được 5 yếu tố ánh sáng trên một khối: highlight, vùng sáng (light / half-tone), **bóng lõi (core shadow)**, ánh phản (reflected light), bóng đổ (cast shadow).
- Phân biệt rõ **form shadow** (bóng bản thân vật) và **cast shadow** (bóng vật hắt xuống nền).
- Giải thích *vì sao* core shadow — chứ không phải rìa vật — là chỗ tối nhất trên vật.
- Suy ra vị trí các vùng khi **đổi hướng nguồn sáng** (≥ 4 hướng).
- Áp cùng logic đó lên 4 khối cơ bản: **cầu, lập phương, trụ, nón**, và biết chuyển value của mỗi khối khác nhau ra sao.

## Kiến thức tiền đề

- **Value / thang xám (grayscale)** — cách quy độ sáng-tối về một thang số. Xem [Lesson 09 — Value & thang xám](../lesson-09-value-grayscale/). Toàn bài này dùng **thang value 0–10**: \`0 = trắng tinh\` (giấy trắng), \`10 = đen tuyền\`. Số càng lớn → càng tối.
- Không cần biết vẽ trước. Cần hình dung được "mặt phẳng nghiêng bao nhiêu độ so với nguồn sáng".

---

## 1. Đổ bóng là gì? — phiên dịch ánh sáng thành value

> 💡 **Trực giác.** Bề mặt một vật sáng hay tối **không** vì bản thân nó, mà vì **góc giữa mặt đó và tia sáng**. Mặt nào "quay thẳng" về đèn → hứng nhiều tia → sáng. Mặt nào "né" đèn (nghiêng đi hoặc quay lưng) → hứng ít tia → tối. Đổ bóng chỉ là việc *đọc góc đó rồi ghi lại bằng một con số value*.

Cùng một quả cầu trắng, đặt dưới một bóng đèn, mắt ta thấy nó chuyển từ gần trắng sang gần đen. Không phải vì sơn đổi màu — mà vì **mỗi điểm trên mặt cầu nghiêng một góc khác nhau** so với đèn. Nhiệm vụ của người vẽ: gán cho mỗi vùng một value đúng.

Quy luật gốc (Lambert, đơn giản hoá): độ sáng của một điểm tỉ lệ với **cosin của góc** giữa pháp tuyến mặt (hướng mặt đang "nhìn") và tia sáng.

$$\\text{độ sáng} \\propto \\max(0,\\ \\cos\\theta)$$

- Mặt quay thẳng về đèn: $\\theta = 0^\\circ,\\ \\cos 0^\\circ = 1$ → sáng nhất.
- Mặt nghiêng $60^\\circ$: $\\cos 60^\\circ = 0.5$ → sáng một nửa (half-tone).
- Mặt nghiêng $90^\\circ$ (song song tia sáng): $\\cos 90^\\circ = 0$ → bắt đầu tối. Đây chính là **đường ranh giới sáng-tối (terminator)**.
- Mặt quay lưng ($\\theta > 90^\\circ$): $\\cos\\theta < 0$ → cắt về 0, không nhận sáng trực tiếp nữa.

> ❓ **Câu hỏi tự nhiên.** *"Nếu mặt quay lưng nhận độ sáng = 0, sao vùng tối vẫn nhìn thấy chi tiết chứ không đen tuyền?"* → Vì ngoài đèn chính còn **ánh sáng môi trường (ambient)** và **ánh phản (reflected light)** từ nền, tường, vật xung quanh hắt vào. Đó là lý do vùng tối hiếm khi bằng value 10. Xem yếu tố số 4 ở mục 2.

---

## 2. Năm yếu tố ánh sáng trên một khối

Đây là "bảng chữ cái" của đổ bóng. Lấy chuẩn: **một quả cầu chiếu sáng từ trên-trái**. Value ghi theo thang 0–10.

### 2.1 Highlight (điểm sáng nhất)

**(a) Là gì.** Đốm sáng chói nhất — nơi bề mặt phản chiếu trực tiếp *hình ảnh của nguồn sáng* về phía mắt. Đây là **ánh phản gương (specular)**, khác với vùng sáng khuếch tán.

**(b) Vì sao tách riêng.** Vì nó không tuân theo quy luật cosin ở mục 1 — nó phụ thuộc cả hướng đèn *lẫn* hướng mắt. Vị trí highlight dịch theo mắt người xem, các vùng khác thì không.

**(c) Vị trí & value.** Trên mặt hướng "vừa về đèn vừa về mắt" — với cầu sáng trên-trái, highlight nằm ở **phía trên-trái**, hơi lùi vào trong rìa. Value **0–1**. Vật càng bóng (kim loại, sứ) → highlight càng nhỏ và gắt; vật càng mờ (vải, gỗ mộc) → highlight càng lan, có khi biến mất.

### 2.2 Vùng sáng & half-tone (light / half-tone)

**(a) Là gì.** Mảng bề mặt nhận ánh đèn trực tiếp. Chia hai: **vùng sáng đầy đủ (light)** quanh highlight (mặt gần như quay thẳng về đèn) và **half-tone** — vành chuyển tiếp nơi mặt cong nghiêng dần đi, sáng giảm dần.

**(b) Vì sao cần half-tone.** Half-tone là "bản lề" tạo cảm giác **cong**. Bỏ half-tone, nhảy thẳng từ sáng sang tối → mặt trông như bị gãy cạnh (giống lập phương) chứ không tròn.

**(c) Vị trí & value.** Bao quanh highlight, lan về phía terminator. Vùng sáng value **2–3**, half-tone value **4–5**. Half-tone là chuỗi liên tục 3→4→5 chứ không phải một tông.

### 2.3 Core shadow — bóng lõi (vùng tối NHẤT trên vật)

**(a) Là gì.** Dải tối đậm nhất *trên bản thân vật*, nằm ngay **phía tối của terminator** — tức vùng vừa mới quay khuất khỏi đèn. Đây là phần **form shadow** đậm nhất.

**(b) Vì sao là chỗ tối nhất — và vì sao KHÔNG nằm ở rìa.** Core shadow không nhận tia đèn trực tiếp (đã quay lưng), **đồng thời** chưa nhận được ánh phản từ nền (nền ở xa nó). Nó bị "kẹp" giữa hai nguồn sáng nên tối nhất. Còn **rìa xa của vật** thì tối hơn kỳ vọng lại được **nền hắt sáng vào** → sáng lên (thành reflected light). Vì thế trật tự đúng đi từ terminator ra rìa là: **core shadow (tối nhất) → sáng dần → reflected light ở rìa**. Chỗ tối nhất nằm *lùi vào trong*, không phải ở đường viền ngoài.

**(c) Vị trí & value.** Với cầu sáng trên-trái: một **dải cong** vắt chéo mặt cầu ở phía dưới-phải, cách rìa ngoài một quãng. Value **8–9**.

> ⚠ **Lỗi kinh điển #1.** Tô đậm nhất ở **đường viền ngoài** của vùng tối (như "đồ" lại nét chì contour). Kết quả: quả cầu trông như dán decal phẳng, mất khối. Sửa: đẩy chỗ đậm nhất **vào trong** thành dải core shadow, chừa rìa ngoài sáng hơn cho reflected light.

### 2.4 Reflected light — ánh phản (bounce light)

**(a) Là gì.** Ánh sáng từ đèn đập xuống **nền / vật xung quanh** rồi *hắt ngược* vào phần tối của vật. Là ánh sáng "hạng hai", yếu.

**(b) Vì sao cần — và vì sao dễ vẽ sai.** Reflected light làm vùng tối "thở", cho thấy vật nằm trong một không gian có nền phản xạ, đồng thời tách rìa vật khỏi phông. Nhưng nó là ánh sáng yếu → **phải luôn nằm trong "họ tối"**, không được sáng ngang vùng sáng.

**(c) Vị trí & value.** Ở **rìa phía tối** — với cầu sáng trên-trái, nằm ở mép dưới-phải, sát đường viền. Value **6–7**.

> ⚠ **Lỗi kinh điển #2.** Tô reflected light quá sáng (value 2–3). Mắt đọc ra "hai nguồn sáng" → khối bị bẹt, ảo giác 3D vỡ. **Quy tắc số:** reflected light phải **đậm hơn** half-tone của vùng sáng ít nhất ~2 bậc. Kiểm tra bằng số ở cầu chuẩn: half-tone \`4–5\`, reflected light \`6–7\` → reflected đậm hơn 2 bậc ✓; và reflected \`6–7\` vẫn nhạt hơn core shadow \`8–9\` ✓.

### 2.5 Cast shadow — bóng đổ

**(a) Là gì.** Vùng trên **nền** bị chính vật che khuất khỏi đèn. Khác core shadow (nằm *trên vật*), cast shadow nằm *trên mặt khác* (bàn, tường, sàn).

**(b) Đặc điểm quan trọng.** Cast shadow **đậm và sắc nhất ở sát chân vật** (nơi khe tiếp xúc gần như không lọt tia nào — gọi là *contact shadow / occlusion*), rồi **nhạt và nhoè dần** ra xa vì nhận ambient và tia xiên lọt vào. Hình dạng và độ dài do **hướng + độ cao nguồn sáng** quyết định.

**(c) Vị trí & value.** Đổ về phía **ngược với đèn**: cầu sáng trên-trái → bóng đổ về dưới-phải. Value **9 ở sát chân → 5–6 ở đuôi xa**. Điểm tiếp xúc thường là chỗ **tối nhất của cả bức** (đậm ngang hoặc hơn core shadow).

### Form shadow vs Cast shadow — đừng nhầm

| | **Form shadow** | **Cast shadow** |
|---|---|---|
| Nằm ở đâu | Trên **bản thân** vật (mặt quay khỏi đèn) | Trên **nền / vật khác** vật che tia tới |
| Gồm | Core shadow + reflected light | Vùng bóng trên mặt phẳng |
| Mép (edge) | **Mềm**, chuyển value từ từ (mặt cong) | **Sắc ở gần vật, nhoè ở xa** |
| Đậm nhất ở | Dải core shadow (lùi vào trong) | Khe tiếp xúc sát chân vật |

> 🔁 **Dừng lại tự kiểm tra.**
> 1. Trên quả cầu sáng trên-trái, chỗ tối nhất *trên vật* nằm ở đâu — rìa ngoài hay lùi vào trong? Vì sao?
> 2. Sắp xếp theo value từ NHẠT → ĐẬM: reflected light, half-tone, core shadow.
>
> <details><summary>Đáp án</summary>
>
> 1. Lùi **vào trong** (dải core shadow, ~value 8–9). Rìa ngoài phía tối sáng hơn vì nhận ánh phản từ nền (reflected light ~6–7).
> 2. half-tone (4–5) → reflected light (6–7) → core shadow (8–9).
> </details>

> 📝 **Tóm tắt mục 2.**
> - 5 yếu tố theo thứ tự sáng→tối trên cầu chuẩn: **highlight (0–1) → light (2–3) → half-tone (4–5) → reflected light (6–7) → core shadow (8–9)**; cast shadow trên nền (9 → 5).
> - **Core shadow là chỗ tối nhất TRÊN VẬT**, nằm ở terminator, *lùi vào trong* — không phải ở viền ngoài.
> - **Reflected light luôn ở trong "họ tối"** — đậm hơn half-tone, nhạt hơn core shadow.
> - **Form shadow** ở trên vật (mép mềm), **cast shadow** ở trên nền (sắc ở chân, nhoè ở đuôi).

---

## 3. Hướng nguồn sáng quyết định mọi thứ

> 💡 **Trực giác.** 5 yếu tố ở mục 2 **không dán cứng** vào vật — chúng **xoay theo đèn**. Chỉ cần nhớ một cặp "la bàn": **highlight bám về phía đèn, còn core shadow + cast shadow luôn ở phía ĐỐI DIỆN qua khối.** Biết đèn ở đâu là suy ra được tất cả.

Dưới đây là cùng một quả cầu, đổi hướng đèn (≥ 4 hướng):

| # | Hướng nguồn sáng | Highlight | Core shadow (dải terminator) | Cast shadow đổ về | Đặc điểm đọc khối |
|---|------------------|-----------|------------------------------|-------------------|-------------------|
| 1 | **Trên-trái, cao 45°** | trên-trái | dải cong ở dưới-phải | dưới-phải, dài vừa | "mặc định họa thất" — khối rõ, dễ đọc nhất |
| 2 | **Trên-phải, cao 45°** | trên-phải | dải cong ở dưới-trái | dưới-trái, dài vừa | ảnh gương của #1 |
| 3 | **Chính diện, hơi cao (frontal)** | gần tâm, hơi trên | vành **hẹp** sát rìa quanh khối | rất ngắn, giấu sau khối | khối bị "bẹt", ít chiều sâu vì thiếu half-tone |
| 4 | **Cạnh ngang 90° (bên trái)** | ngay rìa trái | dải **dọc** vắt gần giữa khối | dài, kéo ngang sang phải | tương phản gắt, nửa sáng nửa tối |
| 5 | **Ngược sáng (sau khối)** | chỉ còn **rim light** viền quanh mép | gần như **cả mặt trước** là tối | đổ **về phía người xem** (ra trước) | silhouette — hiệu ứng kịch tính |

**Ví dụ số — dịch highlight theo đèn.** Đặt tâm cầu là gốc, quy ước góc quanh đường tròn: \`0°\` = phải, \`90°\` = trên, \`180°\` = trái, \`270°\` = dưới.

- Đèn ở **trên-trái (135°)** → highlight quanh **135°**, core shadow ở phía đối diện **~315°** (dưới-phải). Hai điểm cách nhau đúng **180°**.
- Đèn ở **trên-phải (45°)** → highlight **~45°**, core shadow **~225°** (dưới-trái). Vẫn lệch **180°**.
- Đèn xoay thêm **90°** (từ trên-trái sang cạnh trái, 180°) → highlight và core shadow **cùng xoay 90°** theo.

Quy tắc kiểm tra nhanh: **nối highlight với chân cast shadow phải đi (gần) xuyên qua tâm khối** — nếu không, bạn đã đặt sai một trong hai. Đây là lý do trong minh hoạ, khi kéo đèn sang trái thì highlight nhảy sang trái còn bóng đổ nhảy sang **phải**.

> ❓ **Câu hỏi tự nhiên.** *"Đèn càng cao thì bóng đổ càng ngắn hay dài?"* → Càng **cao** (gần thẳng đỉnh) → bóng đổ càng **ngắn**, thu về sát chân vật (buổi trưa). Càng **thấp** (gần chân trời) → bóng đổ càng **dài** kéo ra (hoàng hôn). Trong minh hoạ, kéo đèn lên cao / hạ xuống thấp để thấy bóng co giãn.

---

## 4. Áp lên 4 khối cơ bản

> 💡 **Trực giác.** Cùng 5 yếu tố, nhưng **cách value chuyển tiếp** phụ thuộc *hình dạng bề mặt*: mặt cong → chuyển **mượt**; mặt phẳng → mỗi mặt **một tông**, đổi **đột ngột** ở cạnh. Nắm 4 khối này là nắm được phần lớn vật thể (đầu người ≈ cầu + trụ, ly ≈ trụ, hộp quà ≈ lập phương, mái nhà ≈ nón/lăng trụ).

Tất cả chiếu sáng từ **trên-trái**. Value theo thang 0–10.

| Khối | Kiểu chuyển value | Core shadow | Ví dụ số (các vùng) |
|------|-------------------|-------------|---------------------|
| **Cầu (sphere)** | Liên tục, **mượt theo MỌI hướng** (mặt cong 2 chiều) | **Dải cong** vắt chéo | highlight \`1\` → light \`3\` → half-tone \`5\` → core \`8\` → reflected \`6\` |
| **Lập phương (cube)** | **Đột ngột ở cạnh**; mỗi mặt phẳng = **một tông đồng đều** | Không có gradient; "phần tối nhất" = **mặt tối nhất** | mặt trên \`2\` · mặt trái \`4\` · mặt phải \`7\` (3 tông rời rạc) |
| **Trụ (cylinder)** | Liên tục **theo chu vi (ngang)**, KHÔNG đổi **dọc theo trục** | **Dải DỌC** thẳng đứng | cột sáng \`3\` (mặt hứng đèn) → half \`5\` → dải core \`8\` → reflected \`6\` ở mép kia |
| **Nón (cone)** | Như trụ nhưng các dải **hội tụ về đỉnh** | Dải chạy **xiên**, rộng ở đáy, thu về đỉnh | đáy: core \`8\` rộng; càng lên đỉnh value các vùng càng **bó hẹp** lại |

**Walk-through lập phương (3 tông).** Đèn ở trên-trái-trước. Xét góc mỗi mặt so với đèn:
- **Mặt trên** quay thẳng lên, gần như đối diện đèn (cao) → $\\theta$ nhỏ → sáng nhất, value **2**.
- **Mặt trái** hứng đèn xiên → $\\theta$ trung bình (~60°, $\\cos\\approx 0.5$) → value **4**.
- **Mặt phải** quay khỏi đèn → $\\theta > 90^\\circ$, không nhận tia trực tiếp → form shadow, value **7**.
- Ba mặt = ba tông **phẳng, rời rạc**; chuyển value chỉ xảy ra **tại cạnh**, tức thời. Đây là điểm khác cầu rõ nhất: cầu chuyển 2→3→4→5→…, lập phương nhảy 2 | 4 | 7.

**Vì sao trụ có core shadow DỌC còn cầu có dải CONG?** Mặt trụ chỉ cong **một chiều** (quanh trục); dọc theo trục nó phẳng. Nên value chỉ đổi khi ta đi *vòng quanh* (ngang), còn đi *dọc* thì không đổi → mọi vùng (kể cả core shadow) kéo thành **vạch dọc**. Cầu cong **hai chiều** nên value đổi theo mọi hướng → các vùng là **dải cong**.

> ⚠ **Lỗi thường gặp.** Đổ bóng lập phương bằng **gradient mượt** như cầu → mất cảm giác mặt phẳng, cạnh trông "mềm oặt". Mặt phẳng phải giữ **một value đồng đều**; chỉ cho phép sai lệch rất nhẹ do half-tone khí quyển, không phải gradient tròn.

> 🔁 **Dừng lại tự kiểm tra.**
> 1. Vì sao core shadow của trụ là vạch dọc mà của cầu là dải cong?
> 2. Lập phương sáng trên-trái-trước có mấy tông trên 3 mặt nhìn thấy, và mặt nào sáng nhất?
>
> <details><summary>Đáp án</summary>
>
> 1. Trụ cong 1 chiều (quanh trục) → value chỉ đổi theo phương ngang, giữ nguyên dọc trục → vạch dọc. Cầu cong 2 chiều → value đổi theo mọi hướng → dải cong.
> 2. 3 tông rời rạc; **mặt trên sáng nhất** (value ~2) vì quay gần thẳng về đèn ở trên cao.
> </details>

> 📝 **Tóm tắt mục 4.**
> - Mặt **cong** → chuyển value mượt (cầu: mọi hướng; trụ/nón: chỉ theo chu vi).
> - Mặt **phẳng** (lập phương) → mỗi mặt một tông, đổi đột ngột ở cạnh.
> - Core shadow: cầu = dải **cong**, trụ = vạch **dọc**, nón = dải **xiên hội tụ về đỉnh**, lập phương = **mặt** tối nhất.

---

## 5. Bài tập

**Bài 1 (định vị).** Một quả cầu được chiếu sáng từ **trên-phải**. Dùng quy ước góc ở mục 3 (\`0°\`=phải, \`90°\`=trên, \`180°\`=trái, \`270°\`=dưới), hãy cho biết vị trí (theo góc) của: (a) highlight, (b) core shadow, (c) hướng cast shadow đổ về.

**Bài 2 (gán value).** Trên thang 0–10, hãy gán một bộ value hợp lý cho 5 yếu tố của một quả cầu sao cho thoả **đồng thời** hai ràng buộc: reflected light phải nhạt hơn core shadow, và reflected light phải đậm hơn half-tone. Ghi rõ số cho từng yếu tố và chứng minh bộ số thoả 2 ràng buộc.

**Bài 3 (sửa lỗi).** Một bức vẽ quả cầu có hai đặc điểm: (i) đường viền ngoài phía tối được tô là chỗ đậm nhất; (ii) toàn bộ vùng tối tô một tông đều, không có chỗ nào sáng lại. Chỉ ra **2 lỗi** ứng với 2 đặc điểm đó và cách sửa từng lỗi.

**Bài 4 (lập phương).** Một khối lập phương chiếu sáng từ **trên-trái-trước**, nhìn thấy 3 mặt: trên, trái, phải. Sắp xếp 3 mặt theo value từ **sáng → tối** và giải thích bằng góc $\\theta$ giữa mặt và tia sáng (dùng ý tưởng $\\cos\\theta$ ở mục 1).

---

## 6. Lời giải chi tiết

**Bài 1.** Cách tiếp cận: highlight bám phía đèn; core shadow ở đúng phía đối diện (lệch 180°); cast shadow đổ ngược đèn.
- Đèn ở trên-phải ⇒ hướng đèn quanh góc **~45°**.
- (a) **Highlight ≈ 45°** (vùng trên-phải).
- (b) **Core shadow ≈ 225°** (dưới-trái) — đối diện highlight qua tâm, lệch đúng 180°.
- (c) **Cast shadow đổ về dưới-trái** (phía ~225°), tức ngược hướng đèn. Kiểm tra "la bàn": đoạn nối highlight (45°) ↔ chân cast shadow (225°) đi xuyên tâm ✓.

**Bài 2.** Cách tiếp cận: xếp 5 yếu tố theo trật tự sáng→tối rồi chọn số giữ đúng khoảng cách.
- Một bộ thoả: highlight \`1\`, light \`3\`, half-tone \`5\`, reflected light \`7\`, core shadow \`9\`.
- Ràng buộc 1 — reflected light nhạt hơn core shadow: \`7 < 9\` ✓ (nhạt hơn 2 bậc).
- Ràng buộc 2 — reflected light đậm hơn half-tone: \`7 > 5\` ✓ (đậm hơn 2 bậc).
- Kết luận: bộ số hợp lệ. (Nhiều đáp án khác cũng đúng miễn giữ \`half-tone < reflected light < core shadow\`, ví dụ \`4 < 6 < 8\`.)

**Bài 3.** Cách tiếp cận: đối chiếu với "trật tự đúng" ở mục 2.3–2.4.
- **Lỗi (i)** — đặt chỗ tối nhất ở *viền ngoài*. Sai vì viền ngoài phía tối nhận **reflected light** từ nền nên phải sáng lên. **Sửa:** đẩy dải tối nhất (core shadow) *lùi vào trong*, ở terminator; chừa một vệt sáng hơn (value ~6–7) sát viền ngoài làm reflected light.
- **Lỗi (ii)** — vùng tối một tông phẳng, không có reflected light. Sai vì làm khối trông như hình cắt dán, mất chiều sâu ở phần tối. **Sửa:** thêm reflected light ở rìa phía tối (đậm hơn half-tone, nhạt hơn core shadow), để vùng tối có ít nhất 2 sắc độ: core shadow đậm + reflected light nhạt hơn.

**Bài 4.** Cách tiếp cận: độ sáng mặt ~ $\\cos\\theta$, $\\theta$ = góc giữa pháp tuyến mặt và tia sáng; $\\theta$ nhỏ → sáng.
- **Mặt trên**: pháp tuyến chỉ thẳng lên, gần trùng hướng đèn (đèn ở trên cao) → $\\theta$ **nhỏ nhất** → $\\cos\\theta$ lớn nhất → **sáng nhất**.
- **Mặt trái**: hứng đèn xiên → $\\theta$ **trung bình** (~60°, $\\cos 60^\\circ = 0.5$) → sáng vừa.
- **Mặt phải**: quay khỏi đèn → $\\theta > 90^\\circ$ → $\\cos\\theta \\le 0$, cắt về 0 → không nhận tia trực tiếp → **tối nhất** (form shadow).
- Thứ tự value **sáng → tối: mặt trên → mặt trái → mặt phải** (ví dụ \`2 → 4 → 7\`). Ba tông rời rạc, chuyển đột ngột tại cạnh.

> 📝 **Tóm tắt bài học.**
> - Đổ bóng = đọc **góc giữa mặt và tia sáng** rồi ghi thành value ($\\propto \\cos\\theta$).
> - 5 yếu tố: **highlight → light/half-tone → core shadow (tối nhất trên vật) → reflected light → cast shadow**. Core shadow *lùi vào trong*, reflected light luôn trong "họ tối".
> - **Form shadow** trên vật (mép mềm) ≠ **cast shadow** trên nền (sắc ở chân, nhoè ở đuôi).
> - **Highlight bám đèn; core shadow + cast shadow ở phía đối diện** — đổi hướng đèn thì cả cụm xoay theo.
> - Mặt cong → value mượt; mặt phẳng → mỗi mặt một tông, đổi đột ngột ở cạnh.

---

## Bài tiếp theo

**[Lesson 11 — Chất liệu & bề mặt (Texture & materials)](../lesson-11-texture-materials/)**: cùng một khối cầu, nhưng vẽ nó thành *kim loại bóng*, *sứ*, *vải mờ* hay *cao su* khác nhau thế nào — tất cả nằm ở việc điều khiển **kích thước và độ gắt của highlight** cùng độ tương phản vùng tối mà bạn vừa học ở bài này.

Minh họa tương tác: [visualization.html](./visualization.html) — kéo nguồn sáng quanh khối, xem 5 yếu tố cập nhật realtime; đổi giữa cầu / lập phương / trụ.
`;
