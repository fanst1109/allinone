// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: Astronomy/02-StarsGalaxies/lesson-04-star-life/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 04 — Vòng đời sao: từ tinh vân tới dải chính (Star Life)

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Hiểu **cân bằng thủy tĩnh (hydrostatic equilibrium)**: cuộc giằng co giữa hấp dẫn và áp suất giữ sao ổn định.
- Hiểu **nhiệt hạch (nuclear fusion)** H → He: **chuỗi proton–proton (p–p)** và **chu trình CNO**.
- Tính **thời gian sống trên dải chính** theo khối lượng: $t \\propto \\dfrac{M}{L} \\approx M^{-2{,}5}$.
- Mô tả **hình thành sao**: từ tinh vân (nebula) → đám mây sụp đổ → tiền sao (protostar) → bật nhiệt hạch.

## Kiến thức tiền đề

- **Hấp dẫn & áp suất** — vật lý cơ học: [\`../../../Physics/\`](../../../Physics/).
- **$E = mc^2$ và nhiệt hạch** — vật lý hiện đại: [\`../../../Physics/03-Optics-ModernPhysics/\`](../../../Physics/03-Optics-ModernPhysics/).
- **Quan hệ khối lượng–độ trưng** $L \\propto M^{3{,}5}$ — [Lesson 03](../lesson-03-hr-diagram/).

---

## 1. Cân bằng thủy tĩnh — vì sao sao không sụp đổ

> 💡 **Trực giác / Hình dung.** Một quả bóng bay căng: vỏ cao su ép vào (giống hấp dẫn ép khối khí vào), khí bên trong đẩy ra (giống áp suất nhiệt). Khi hai lực cân bằng, bóng giữ kích thước ổn định. Sao là một "quả bóng" khổng lồ tự cân bằng: **hấp dẫn kéo vào, áp suất khí nóng đẩy ra**.

**Định nghĩa (3 phần):**

- **(a) Là gì** — **Cân bằng thủy tĩnh** là trạng thái mỗi lớp khí trong sao có lực hấp dẫn (kéo vào tâm) **cân bằng đúng** với chênh lệch áp suất (đẩy ra ngoài). Khi cân bằng, sao không phồng cũng không co — bán kính ổn định.
- **(b) Vì sao tồn tại / cần** — Nếu chỉ có hấp dẫn, đám khí sẽ sụp đổ trong vài chục nghìn năm. Nhiệt hạch ở lõi tạo nhiệt → áp suất → chống đỡ. Cân bằng này giải thích vì sao một sao có thể "sống" ổn định hàng tỉ năm trên dải chính.
- **(c) Ví dụ trực giác bằng số** — Áp suất tại tâm Mặt Trời $\\sim 2{,}5 \\times 10^{16} \\ \\text{Pa}$ (gấp ~250 tỉ lần áp suất khí quyển Trái Đất), nhiệt độ lõi ~15 triệu K — vừa đủ để chống lại sức nén của $2 \\times 10^{30} \\ \\text{kg}$ khối lượng đè xuống.

> 📐 **Cơ chế tự điều chỉnh (thermostat):** nếu lõi co lại một chút → nóng hơn → nhiệt hạch tăng → áp suất tăng → đẩy phồng lại. Nếu phồng quá → nguội → nhiệt hạch giảm → co lại. Vòng phản hồi âm này giữ sao **rất ổn định**.

**4 ví dụ về kết quả của cân bằng (hoặc mất cân bằng):**

| Tình huống | Hấp dẫn vs Áp suất | Kết quả |
|---|---|---|
| Sao dải chính (Mặt Trời) | Cân bằng | Bán kính ổn định hàng tỉ năm |
| Lõi co nhẹ ngẫu nhiên | Áp suất tăng (nóng hơn) | Tự phồng về cân bằng |
| Hết nhiên liệu lõi | Áp suất giảm | Lõi co lại (bước vào giai đoạn cuối) |
| Đám mây tiền sao | Hấp dẫn thắng (chưa có nhiệt hạch) | Co lại, nóng dần lên |

> ⚠ **Lỗi thường gặp.** Tưởng "áp suất do nhiệt hạch nổ tung đẩy ra". Không hẳn — áp suất chủ yếu là **áp suất nhiệt của khí** (và áp suất bức xạ ở sao nặng). Nhiệt hạch chỉ *duy trì nhiệt độ* để giữ áp suất đó. Nếu nhiệt hạch là "vụ nổ" thì sao đã tan; thực ra nó là "lò sưởi" điều hòa.

> 🔁 **Dừng lại tự kiểm tra.** Điều gì xảy ra với một sao nếu nhiệt hạch ở lõi đột ngột yếu đi?
> <details><summary>Đáp án</summary>Áp suất giảm → hấp dẫn thắng → lõi **co lại**. Co lại làm nhiệt độ tăng (nén khí) → có thể khơi lại nhiệt hạch (hoặc đốt nhiên liệu nặng hơn). Đây là động lực của giai đoạn cuối đời sao (Lesson 05).</details>

---

## 2. Nhiệt hạch H → He — nguồn năng lượng

> 💡 **Trực giác.** Ghép 4 hạt nhân hydro (proton) thành 1 hạt nhân heli, sản phẩm **nhẹ hơn** tổng 4 hạt ban đầu một chút. Phần khối lượng "biến mất" hóa thành năng lượng theo $E = mc^2$. Vì $c^2$ cực lớn, một chút khối lượng cho ra năng lượng khổng lồ.

**Định nghĩa (3 phần):**

- **(a) Là gì** — **Nhiệt hạch** là phản ứng hợp nhất các hạt nhân nhẹ thành hạt nhân nặng hơn, giải phóng năng lượng. Trong sao dải chính: $4\\,{}^1\\text{H} \\to {}^4\\text{He} + \\text{năng lượng}$.
- **(b) Vì sao cần** — Đây là *duy nhất* nguồn năng lượng đủ lớn và đủ lâu để giải thích Mặt Trời sáng ổn định ~10 tỉ năm. (Đốt hóa học hay co hấp dẫn chỉ đủ vài triệu năm.)
- **(c) Ví dụ trực giác bằng số** — Mỗi giây Mặt Trời chuyển $\\sim 6 \\times 10^{11} \\ \\text{kg}$ hydro thành heli, trong đó $\\sim 4 \\times 10^9 \\ \\text{kg}$ (4 triệu tấn) **biến mất** thành năng lượng → cho ra $L_\\odot = 3{,}83 \\times 10^{26} \\ \\text{W}$. (Kiểm tra: $E = mc^2 = 4 \\times 10^9 \\times (3 \\times 10^8)^2 = 3{,}6 \\times 10^{26} \\ \\text{J/s} \\approx L_\\odot$ ✓.)

**Hai cơ chế (số liệu thật):**

- **Chuỗi proton–proton (p–p chain):** chuỗi phản ứng ghép proton từng bước. **Chủ đạo ở sao $\\leq \\sim 1{,}3 \\ M_\\odot$** (gồm Mặt Trời), nơi lõi ~15 triệu K. Khoảng 99% năng lượng Mặt Trời từ chuỗi p–p.
- **Chu trình CNO (carbon–nitrogen–oxygen):** dùng C, N, O làm "chất xúc tác" để ghép hydro thành heli (C/N/O không bị tiêu hao, chỉ luân chuyển). **Chủ đạo ở sao nặng hơn ($> \\sim 1{,}3 \\ M_\\odot$)**, lõi nóng hơn (> ~17 triệu K). Cực kỳ nhạy với nhiệt độ ($\\propto T^{\\sim 17}$) → giải thích vì sao sao nặng đốt nhiên liệu dữ dội.

> 📐 **Hiệu suất khối lượng → năng lượng:** ghép 4 proton thành 1 He giải phóng ~0,7% khối lượng dưới dạng năng lượng. Cụ thể: 4 proton $= 4 \\times 1{,}0073 \\ \\text{u} = 4{,}0294 \\ \\text{u}$; He $= 4{,}0015 \\ \\text{u}$; chênh $0{,}0279 \\ \\text{u} \\approx 0{,}7\\%$ → thành năng lượng ($\\sim 26{,}7 \\ \\text{MeV}$ mỗi phản ứng).

**Walk-through số thật (verify):** 1 phản ứng cho $26{,}7 \\ \\text{MeV}$:
$$26{,}7 \\ \\text{MeV} = 26{,}7 \\times 1{,}602 \\times 10^{-13} \\ \\text{J} = 4{,}28 \\times 10^{-12} \\ \\text{J}$$
Để có $L_\\odot = 3{,}83 \\times 10^{26} \\ \\text{W}$ cần số phản ứng/giây:
$$\\frac{3{,}83 \\times 10^{26}}{4{,}28 \\times 10^{-12}} \\approx 8{,}9 \\times 10^{37} \\ \\text{phản ứng/giây}$$
Mỗi phản ứng tiêu 4 proton → tiêu $3{,}6 \\times 10^{38}$ proton/giây $\\approx 6 \\times 10^{11} \\ \\text{kg}$ H/giây — khớp con số ở trên ✓.

> ❓ **Câu hỏi tự nhiên của người đọc.**
> - *"Vì sao cần nhiệt độ hàng triệu độ?"* — Proton đều mang điện dương, đẩy nhau (rào Coulomb). Phải chạy cực nhanh (= rất nóng) để lại đủ gần cho lực hạt nhân mạnh kéo vào. Thực tế còn cần hiệu ứng **xuyên hầm lượng tử** vì 15 triệu K vẫn "hơi thiếu".
> - *"CNO khác p–p ở chỗ nào về mặt tốc độ?"* — CNO nhạy nhiệt độ hơn nhiều ($\\propto T^{17}$ vs p–p $\\propto T^4$). Lõi nóng hơn một chút → CNO tăng vọt → sao nặng cực sáng (khớp $L \\propto M^{3{,}5}$ của Lesson 03).
> - *"Heli sản phẩm có cháy tiếp không?"* — Chưa, trong giai đoạn dải chính. Heli tích lại ở lõi; chỉ khi hydro lõi cạn và lõi co nóng lên ~100 triệu K thì heli mới cháy (Lesson 05).

> 🔁 **Dừng lại tự kiểm tra.** Sao 5 M☉ (lớp B) chủ yếu dùng cơ chế nào? Vì sao?
> <details><summary>Đáp án</summary>**Chu trình CNO.** Vì sao nặng có lõi nóng hơn (>17 triệu K), nơi CNO (nhạy T) vượt trội chuỗi p–p. Đó cũng là lý do nó đốt nhiên liệu cực nhanh.</details>

---

## 3. Thời gian sống trên dải chính

> 💡 **Trực giác.** Tuổi thọ = (lượng nhiên liệu) ÷ (tốc độ đốt). Nhiên liệu $\\propto$ khối lượng $M$; tốc độ đốt $\\propto$ độ trưng $L$. Nghịch lý: sao nặng có *nhiều* nhiên liệu hơn nhưng đốt *nhanh hơn rất nhiều* → sống **ngắn hơn**.

**Định nghĩa (3 phần):**

- **(a) Là gì** — **Thời gian sống dải chính t** là khoảng thời gian sao đốt hydro ở lõi (ổn định trên dải chính). $t \\propto \\dfrac{M}{L}$.
- **(b) Vì sao cần** — Cho biết một sao "trẻ" hay sắp "chết", giải thích vì sao bầu trời đầy sao lùn đỏ già nua còn sao xanh O/B rất hiếm (chúng chết nhanh).
- **(c) Ví dụ trực giác bằng số** — Mặt Trời ~10 tỉ năm; sao $10 \\ M_\\odot$ chỉ ~30 triệu năm (ngắn hơn ~300 lần dù nhiều nhiên liệu gấp 10).

> 📐 **Công thức:** dùng $L \\propto M^{3{,}5}$ (Lesson 03):
> $$t \\propto \\frac{M}{L} = \\frac{M}{M^{3{,}5}} = M^{-2{,}5}$$
>
> Chuẩn hóa theo Mặt Trời ($t_\\odot \\approx 10$ tỉ năm):
> $$\\frac{t}{t_\\odot} = \\left(\\frac{M}{M_\\odot}\\right)^{-2{,}5}$$

**Walk-through số thật (verify):**

1. **Mặt Trời, $M = 1 \\ M_\\odot$:** $t = 10 \\text{ tỉ} \\times 1^{-2{,}5} = 10$ tỉ năm. ✓ (mốc chuẩn)

2. **Sao $10 \\ M_\\odot$:**
   $$\\begin{aligned}
   \\frac{t}{t_\\odot} &= 10^{-2{,}5} = \\frac{1}{316} = 0{,}00316 \\\\
   t &= 10 \\text{ tỉ} \\times 0{,}00316 = 3{,}16 \\times 10^7 \\text{ năm} \\approx 32 \\text{ triệu năm}
   \\end{aligned}$$
   → sao nặng gấp 10 sống chỉ ~32 triệu năm (ngắn hơn ~300 lần). ✓

3. **Sao $0{,}5 \\ M_\\odot$ (lùn đỏ):**
   $$\\begin{aligned}
   \\frac{t}{t_\\odot} &= 0{,}5^{-2{,}5} = 2^{2{,}5} = 5{,}66 \\\\
   t &= 10 \\text{ tỉ} \\times 5{,}66 = 5{,}66 \\times 10^{10} \\text{ năm} \\approx 57 \\text{ tỉ năm}
   \\end{aligned}$$
   → lâu hơn cả tuổi vũ trụ (~13,8 tỉ năm)! Lùn đỏ thực tế chưa con nào kịp chết.

4. **Sao $2 \\ M_\\odot$:**
   $$\\begin{aligned}
   \\frac{t}{t_\\odot} &= 2^{-2{,}5} = \\frac{1}{5{,}66} = 0{,}177 \\\\
   t &= 10 \\text{ tỉ} \\times 0{,}177 = 1{,}77 \\text{ tỉ năm}
   \\end{aligned}$$

> ❓ **Câu hỏi tự nhiên.**
> - *"Vì sao sao nặng đốt nhanh dù nhiều nhiên liệu?"* — Vì $L$ tăng theo $M^{3{,}5}$ (nhanh hơn nhiều so với M tăng tuyến tính). Tốc độ đốt vượt xa lượng nhiên liệu thêm → tuổi thọ giảm. Như một chiếc xe bình xăng to gấp 10 nhưng "uống xăng" gấp 300 lần.
> - *"Sao chỉ đốt được bao nhiêu % nhiên liệu?"* — Chỉ phần hydro ở **lõi** (~10% khối lượng) tham gia nhiệt hạch dải chính. Hệ số này nằm trong hằng số $t_\\odot \\approx 10$ tỉ năm.

> ⚠ **Lỗi thường gặp.** Quên dấu **âm** trong số mũ → kết luận ngược (sao nặng sống lâu). Luôn nhớ: số mũ $-2{,}5$ ⇒ **nặng = ngắn**.

> 🔁 **Dừng lại tự kiểm tra.** Sao $4 \\ M_\\odot$ sống được bao lâu (so với 10 tỉ năm của Mặt Trời)?
> <details><summary>Đáp án</summary>$\\dfrac{t}{t_\\odot} = 4^{-2{,}5} = (2^2)^{-2{,}5} = 2^{-5} = \\dfrac{1}{32} = 0{,}03125$; $t = 10 \\text{ tỉ} \\times 0{,}03125 \\approx 313$ triệu năm.</details>

---

## 4. Hình thành sao — từ tinh vân tới tiền sao

> 💡 **Trực giác.** Một đám mây khí–bụi lạnh, loãng (tinh vân) trôi nổi giữa các sao. Đâu đó nó bị nén (sóng xung kích từ siêu tân tinh gần đó, hoặc tự trọng lực vượt ngưỡng) → bắt đầu **tự co dưới hấp dẫn**. Co lại → nóng lên → tới khi lõi đủ nóng (~10 triệu K) thì **bật nhiệt hạch** → một ngôi sao ra đời.

**Các giai đoạn (định nghĩa từng bước):**

- **(a) Tinh vân (nebula)** — đám mây khí (chủ yếu H) và bụi, lạnh (~10–100 K), loãng. Là "nguyên liệu thô".
- **(b) Đám mây sụp đổ** — khi khối lượng đủ lớn (vượt **khối lượng Jeans**), hấp dẫn thắng áp suất → đám mây co lại, vỡ thành nhiều cụm (→ sinh nhiều sao cùng lúc, thành cụm sao).
- **(c) Tiền sao (protostar)** — lõi co lại nóng lên, phát sáng bằng **năng lượng hấp dẫn** (co lại tỏa nhiệt), bao quanh bởi đĩa bồi tụ. Chưa có nhiệt hạch.
- **(d) Bật nhiệt hạch / lên dải chính** — khi lõi đạt ~10 triệu K, chuỗi p–p khởi động → áp suất chặn đứng sự co → đạt **cân bằng thủy tĩnh** → sao chính thức vào **dải chính**.

> 📐 **Mốc nhiệt độ then chốt:** nhiệt hạch H bắt đầu ở **~10 triệu K**. Dưới ngưỡng đó (vật $< \\sim 0{,}08 \\ M_\\odot$) không bao giờ bật được nhiệt hạch H → thành **sao lùn nâu (brown dwarf)** — "sao hỏng".

**4 ví dụ/mốc cụ thể:**

| Giai đoạn | Nhiệt độ lõi | Nguồn sáng |
|---|---|---|
| Tinh vân | ~10–100 K | Không (lạnh) |
| Tiền sao | tăng dần tới triệu K | Năng lượng hấp dẫn (co lại) |
| Bật nhiệt hạch | ~10 triệu K | Bắt đầu nhiệt hạch |
| Sao dải chính | ổn định ~15 triệu K (Mặt Trời) | Nhiệt hạch H→He |

> ❓ **Câu hỏi tự nhiên.**
> - *"Vì sao co lại làm nóng lên?"* — Khí bị nén → động năng hạt tăng → nhiệt độ tăng (định lý virial: một nửa năng lượng hấp dẫn giải phóng biến thành nhiệt). Đây cũng là nguồn sáng của tiền sao trước khi nhiệt hạch bật.
> - *"Sao lùn nâu là gì?"* — Vật $0{,}013$–$0{,}08 \\ M_\\odot$: đủ để đốt deuteri một thời gian nhưng **không đủ nóng để đốt hydro thường** → không thành sao thật, nguội dần. Ranh giới với hành tinh và sao thật.
> - *"Mặt Trời mất bao lâu để hình thành?"* — Từ đám mây tới dải chính khoảng ~30–50 triệu năm — rất ngắn so với 10 tỉ năm tuổi thọ dải chính.

> ⚠ **Lỗi thường gặp.** Tưởng tiền sao đã "cháy" nhiệt hạch. Chưa — tiền sao sáng nhờ **co hấp dẫn**, nhiệt hạch chỉ bật khi lõi chạm ~10 triệu K. Ranh giới đó mới là lúc "sao thật" ra đời.

> 🔁 **Dừng lại tự kiểm tra.** Một vật khối lượng $0{,}05 \\ M_\\odot$ co lại từ đám mây. Nó có trở thành sao dải chính không?
> <details><summary>Đáp án</summary>**Không.** $0{,}05 \\ M_\\odot < 0{,}08 \\ M_\\odot$ → lõi không bao giờ đạt ~10 triệu K để đốt hydro → thành **sao lùn nâu**, không vào dải chính.</details>

---

## 5. Tóm tắt

> 📝 **Tóm tắt toàn bài.**
> - **Cân bằng thủy tĩnh**: hấp dẫn (vào) cân bằng áp suất (ra); cơ chế tự điều chỉnh giữ sao ổn định.
> - **Nhiệt hạch H→He**: $4\\,{}^1\\text{H} \\to {}^4\\text{He}$, ~0,7% khối lượng thành năng lượng ($E = mc^2$). Chuỗi **p–p** (sao $\\leq \\sim 1{,}3 \\ M_\\odot$, Mặt Trời) vs **CNO** (sao nặng hơn, nhạy T).
> - **Thời gian sống**: $\\dfrac{t}{t_\\odot} = \\left(\\dfrac{M}{M_\\odot}\\right)^{-2{,}5}$; nặng → ngắn ($10 \\ M_\\odot$ ~32 triệu năm; Mặt Trời ~10 tỉ năm; lùn đỏ > tuổi vũ trụ).
> - **Hình thành**: tinh vân → sụp đổ (Jeans) → tiền sao (sáng nhờ co) → bật nhiệt hạch ở ~10 triệu K → dải chính. Dưới $0{,}08 \\ M_\\odot$ → lùn nâu.

---

## Bài tập

1. **Cân bằng thủy tĩnh.** Giải thích bằng vòng phản hồi: nếu lõi sao tình cờ co lại một chút, sao tự điều chỉnh thế nào để trở về cân bằng?

2. **Cơ chế nhiệt hạch.** Với mỗi sao, cho biết cơ chế chủ đạo (p–p hay CNO): (a) Mặt Trời ($1 \\ M_\\odot$); (b) sao Spica ($\\sim 10 \\ M_\\odot$); (c) lùn đỏ ($0{,}3 \\ M_\\odot$).

3. **Năng lượng $E = mc^2$.** Mỗi giây 4 triệu tấn ($4 \\times 10^9 \\ \\text{kg}$) khối lượng Mặt Trời biến thành năng lượng. Tính công suất và so với $L_\\odot = 3{,}83 \\times 10^{26} \\ \\text{W}$.

4. **Thời gian sống.** Tính thời gian sống dải chính của: (a) sao $20 \\ M_\\odot$; (b) sao $0{,}8 \\ M_\\odot$. Lấy $t_\\odot = 10$ tỉ năm.

5. **Lùn nâu.** Một vật co lại từ tinh vân, đạt nhiệt độ lõi cao nhất 5 triệu K. Nó có thành sao dải chính không? Vì sao?

---

## Lời giải chi tiết

### Bài 1 — Cân bằng thủy tĩnh (vòng phản hồi)

Lõi co lại → khí bị nén → **nhiệt độ tăng** → tốc độ nhiệt hạch tăng (rất nhạy với T) → **năng lượng và áp suất tăng** → áp suất đẩy lõi **phồng trở lại** → nguội đi → nhiệt hạch giảm về mức cũ. Đây là **phản hồi âm (thermostat)**: mọi xáo trộn nhỏ tự bị dập tắt → sao cực kỳ ổn định trên dải chính.

### Bài 2 — Cơ chế nhiệt hạch

- **(a) Mặt Trời (1 M☉)** — lõi ~15 triệu K → chủ yếu **chuỗi p–p** (~99% năng lượng).
- **(b) Spica (~10 M☉)** — lõi nóng hơn nhiều (>20 triệu K) → **chu trình CNO** chủ đạo (CNO nhạy T, vượt trội ở nhiệt độ cao).
- **(c) Lùn đỏ (0.3 M☉)** — lõi mát hơn (~vài triệu K) → **chuỗi p–p** (chậm, đốt rất tiết kiệm → sống cực lâu).

### Bài 3 — Năng lượng $E = mc^2$

$$\\begin{aligned}
P = \\frac{dm}{dt} \\times c^2 &= 4 \\times 10^9 \\ \\text{kg/s} \\times (3 \\times 10^8 \\ \\text{m/s})^2 \\\\
  &= 4 \\times 10^9 \\times 9 \\times 10^{16} \\\\
  &= 3{,}6 \\times 10^{26} \\ \\text{W}
\\end{aligned}$$
→ $\\approx 3{,}6 \\times 10^{26} \\ \\text{W}$, khớp với $L_\\odot = 3{,}83 \\times 10^{26} \\ \\text{W}$ (sai lệch nhỏ do "4 triệu tấn" là số tròn). Xác nhận: nguồn sáng Mặt Trời đúng là khối lượng biến thành năng lượng.

### Bài 4 — Thời gian sống

Dùng $\\dfrac{t}{t_\\odot} = \\left(\\dfrac{M}{M_\\odot}\\right)^{-2{,}5}$, $t_\\odot = 10$ tỉ năm.

- **(a) $20 \\ M_\\odot$:**
  $$\\begin{aligned}
  \\frac{t}{t_\\odot} &= 20^{-2{,}5} = \\frac{1}{20^{2{,}5}} \\\\
  20^{2{,}5} &= 20^2 \\times \\sqrt{20} = 400 \\times 4{,}47 = 1789 \\\\
  t &= \\frac{10 \\text{ tỉ}}{1789} = 5{,}6 \\times 10^6 \\text{ năm} \\approx 5{,}6 \\text{ triệu năm}
  \\end{aligned}$$
  → sao $20 \\ M_\\odot$ chỉ sống ~**5,6 triệu năm** (chớp mắt theo thang vũ trụ).

- **(b) $0{,}8 \\ M_\\odot$:**
  $$\\begin{aligned}
  \\frac{t}{t_\\odot} &= 0{,}8^{-2{,}5} \\\\
  \\log &: -2{,}5 \\times \\log(0{,}8) = -2{,}5 \\times (-0{,}0969) = 0{,}242 \\\\
  \\frac{t}{t_\\odot} &= 10^{0{,}242} = 1{,}75 \\\\
  t &= 10 \\text{ tỉ} \\times 1{,}75 = 1{,}75 \\times 10^{10} \\text{ năm} \\approx 17{,}5 \\text{ tỉ năm}
  \\end{aligned}$$
  → ~**17,5 tỉ năm**, lâu hơn tuổi vũ trụ hiện tại.

### Bài 5 — Lùn nâu

Nhiệt độ lõi cao nhất chỉ **5 triệu K** < ngưỡng **~10 triệu K** cần để đốt hydro. → nhiệt hạch H không bật được → vật **không** thành sao dải chính, mà là **sao lùn nâu**. (Tương ứng khối lượng < ~0.08 M☉.) Nó sẽ nguội dần và mờ đi.

---

## Code & Minh họa

- **Visualization tương tác**: [visualization.html](./visualization.html) — gồm:
  - **Cân bằng thủy tĩnh**: kéo slider **khối lượng** (và xáo trộn lõi) → xem hai mũi tên lực (hấp dẫn vào / áp suất ra) co giãn, sao phồng/co rồi tự về cân bằng; báo nhiệt độ lõi và cơ chế (p–p / CNO / chưa bật / lùn nâu).
  - **Calculator thời gian sống**: nhập \`M/M☉\` → ra \`t = 10 tỉ × M^(−2.5)\` năm; so sánh trực quan trên thanh thời gian (nặng = ngắn, nhẹ = vượt tuổi vũ trụ).

---

## Bài tiếp theo

→ [Lesson 05 — Cái chết của sao](../lesson-05-star-death/): khi hydro lõi cạn — sao khổng lồ đỏ, đốt heli, và kết cục theo khối lượng (lùn trắng / sao neutron / lỗ đen). Ta dùng lại **cân bằng thủy tĩnh** (khi mất cân bằng thì sao chết thế nào) và **thời gian sống** của bài này.

**Tham khảo chéo:** E = mc² & vật lý hạt nhân → [\`../../../Physics/03-Optics-ModernPhysics/\`](../../../Physics/03-Optics-ModernPhysics/); quan hệ khối lượng–độ trưng → [Lesson 03](../lesson-03-hr-diagram/).
`;
