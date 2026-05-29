// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: Astronomy/02-StarsGalaxies/lesson-08-black-holes/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 08 — Lỗ đen (Black Holes)

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Hiểu **lỗ đen (black hole)** là gì qua khái niệm **vận tốc thoát (escape velocity)** bằng tốc độ ánh sáng.
- Tính **bán kính Schwarzschild** \`R_s = 2GM/c²\` và hiểu **chân trời sự kiện (event horizon)**.
- Phân biệt **lỗ đen sao (stellar-mass)** và **lỗ đen siêu khối (supermassive)** — như **Sgr A\\*** (~4 triệu M☉) ở tâm Ngân Hà.
- Hiểu **đĩa bồi tụ (accretion disk)** và vì sao lỗ đen (vốn tối) lại quan sát được.
- Biết các **bằng chứng quan sát**: quỹ đạo sao quanh Sgr A\\*, sóng hấp dẫn, ảnh chân trời sự kiện (EHT).

## Kiến thức tiền đề

- Cái chết của sao: [\`../lesson-05-star-death/\`](../lesson-05-star-death/) — lỗ đen sao là tàn dư lõi > 3 M☉ sau supernova.
- Ngân Hà & thiên hà: [\`../lesson-07-galaxies/\`](../lesson-07-galaxies/) — lỗ đen siêu khối nằm ở tâm hầu hết thiên hà.
- Tốc độ ánh sáng & cơ học: [\`../../../Physics/03-Optics-ModernPhysics/\`](../../../Physics/03-Optics-ModernPhysics/) — c là giới hạn tốc độ; nền cho thuyết tương đối (Tầng 3, [tương đối & không-thời gian](../../03-Cosmology/lesson-07-relativity-spacetime/)).

---

## 1. Lỗ đen là gì? Vận tốc thoát = c

> 💡 **Trực giác / Hình dung.** Ném một quả bóng lên trời, nó rơi lại. Ném đủ nhanh (≥ vận tốc thoát của Trái Đất, ~11.2 km/s), nó thoát hẳn. Bây giờ tưởng tượng nén một vật nặng vào thật nhỏ: trọng lực bề mặt mạnh đến mức **vận tốc thoát vượt tốc độ ánh sáng c**. Vì không gì đi nhanh hơn ánh sáng, **không gì thoát ra được** — kể cả ánh sáng. Đó là một lỗ đen: một vùng mà thoát ra đòi hỏi vượt c, nên là "đen" tuyệt đối.

**Định nghĩa (3 phần) — lỗ đen:**

- **(a) Là gì** — Một vùng không-thời gian nơi trọng lực mạnh tới mức **vận tốc thoát ≥ c**, nên không vật chất hay ánh sáng nào bên trong thoát ra ngoài được. Ranh giới của vùng đó là **chân trời sự kiện**.
- **(b) Vì sao tồn tại / cần** — Khi lõi sao > 3 M☉ sụp đổ ([Lesson 05](../lesson-05-star-death/)), không áp suất nào (electron, neutron) chặn nổi → vật chất nén về một điểm, tạo trọng lực vô hạn cục bộ. Lỗ đen là "ngõ cuối" của vật chất bị nén tột cùng.
- **(c) Ví dụ trực giác bằng số** — Vận tốc thoát: Trái Đất 11.2 km/s; Mặt Trời 618 km/s; sao neutron ~150.000 km/s (~0.5c); lỗ đen tại chân trời = c = 300.000 km/s.

> ⚠ **Lỗi thường gặp.** Tưởng lỗ đen là "máy hút bụi vũ trụ" hút mọi thứ quanh nó. **Không** — ở xa, trọng lực của lỗ đen y hệt một vật cùng khối lượng bình thường. Nếu thay Mặt Trời bằng lỗ đen 1 M☉, các hành tinh vẫn quay y nguyên quỹ đạo (chỉ tối đi). Chỉ khi tới rất gần (cỡ R_s) mới "không thoát được".

> 🔁 **Dừng lại tự kiểm tra.** Vì sao ánh sáng không thoát khỏi lỗ đen?
> <details><summary>Đáp án</summary>Vì bên trong chân trời sự kiện, vận tốc thoát > c. Ánh sáng đi đúng tốc độ c (không nhanh hơn) nên cũng không đủ để thoát.</details>

---

## 2. Bán kính Schwarzschild & chân trời sự kiện

> 💡 **Trực giác.** Có một bán kính tới hạn: nếu nén toàn bộ khối lượng \`M\` vào trong quả cầu bán kính đó, vận tốc thoát ở bề mặt đúng bằng c → thành lỗ đen. Bán kính đó là **bán kính Schwarzschild \`R_s\`**. Mặt cầu bán kính \`R_s\` chính là **chân trời sự kiện** — biên giới một chiều: vượt vào là không quay ra.

**Định nghĩa (3 phần) — bán kính Schwarzschild & chân trời sự kiện:**

- **(a) Là gì** — \`R_s\` là bán kính của chân trời sự kiện của một lỗ đen khối lượng \`M\`, cho bởi \`R_s = 2GM/c²\`. **Chân trời sự kiện** là mặt cầu bán kính \`R_s\`: mọi thứ bên trong không thể gửi tín hiệu ra ngoài.
- **(b) Vì sao cần** — Cho ta một "thước đo kích thước" cụ thể của lỗ đen từ chỉ một con số: khối lượng. \`R_s\` cũng cho biết phải nén một vật tới mức nào để nó thành lỗ đen.
- **(c) Ví dụ trực giác bằng số** — Nén Mặt Trời (1 M☉) vào quả cầu bán kính ~3 km → lỗ đen. Nén Trái Đất vào bán kính ~9 mm (cỡ viên bi nhỏ) → lỗ đen.

> 📐 **Công thức:** \`R_s = 2GM / c²\`, với \`G = 6.674×10⁻¹¹ N·m²/kg²\`, \`c = 3×10⁸ m/s\`, \`M\` tính bằng kg.
>
> **Mẹo tính nhanh:** \`R_s ≈ 2.95 km × (M / M☉)\`. Tức mỗi M☉ ứng với ~3 km bán kính.

**Walk-through số thật (verify cả 3 trường hợp):**

**(i) Mặt Trời** \`M = 1.989×10³⁰ kg\`:
\`\`\`
R_s = 2 × (6.674×10⁻¹¹) × (1.989×10³⁰) / (3×10⁸)²
    = 2 × 6.674×10⁻¹¹ × 1.989×10³⁰ / 9×10¹⁶
    = (2.655×10²⁰) / (9×10¹⁶)
    ≈ 2.95×10³ m ≈ 2.95 km ≈ 3 km. ✓
\`\`\`

**(ii) Trái Đất** \`M = 5.972×10²⁴ kg\`. Dùng mẹo nhanh với tỉ lệ khối lượng:
\`\`\`
M/M☉ = 5.972×10²⁴ / 1.989×10³⁰ = 3.00×10⁻⁶
R_s ≈ 2.95 km × 3.00×10⁻⁶ = 8.85×10⁻⁶ km = 8.85 mm ≈ 9 mm. ✓
\`\`\`

**(iii) Sgr A\\*** (lỗ đen tâm Ngân Hà) \`M ≈ 4×10⁶ M☉\`:
\`\`\`
R_s ≈ 2.95 km × 4×10⁶ = 1.18×10⁷ km ≈ 1.2×10⁷ km.
\`\`\`
→ ~12 triệu km, cỡ ~17 lần bán kính Mặt Trời (R☉ ≈ 696.000 km) — to nhưng nhỏ so với thiên hà.

**4 ví dụ số (R_s theo khối lượng):**

| Vật | M | R_s |
|---|---|---|
| Trái Đất | 1 M⊕ (3×10⁻⁶ M☉) | ~9 mm |
| Mặt Trời | 1 M☉ | ~3 km |
| Lỗ đen sao | 10 M☉ | ~30 km |
| Sgr A\\* | 4×10⁶ M☉ | ~1.2×10⁷ km |

> ❓ **Câu hỏi tự nhiên của người đọc.**
> - *"R_s tỉ lệ thế nào với M?"* — **Tuyến tính:** gấp đôi khối lượng → gấp đôi \`R_s\`. Khác với lùn trắng/sao neutron (nặng hơn thì nhỏ đi). Vì thế lỗ đen siêu khối có chân trời khổng lồ.
> - *"Bên trong chân trời có gì?"* — Theo thuyết tương đối rộng, vật chất rơi về một **kỳ dị (singularity)** ở tâm — điểm mật độ vô hạn nơi vật lý hiện tại không mô tả nổi. Chân trời sự kiện chỉ là "ranh giới không quay lại", không phải bề mặt vật chất.

> 🔁 **Dừng lại tự kiểm tra.** Một lỗ đen 20 M☉ có R_s bao nhiêu?
> <details><summary>Đáp án</summary>\`R_s ≈ 2.95 km × 20 = 59 km\` (≈ 60 km). Tuyến tính theo khối lượng.</details>

---

## 3. Hai loại lỗ đen

> 💡 **Trực giác.** Lỗ đen chia thành 2 "hạng cân" rất khác nhau: nhỏ (vài–vài chục M☉, từ sao chết) và khổng lồ (triệu–tỉ M☉, ở tâm thiên hà). Giữa chúng còn loại trung gian hiếm gặp.

**Định nghĩa (3 phần) — lỗ đen sao vs siêu khối:**

- **(a) Là gì:**
  - **Lỗ đen sao (stellar-mass):** ~3–100 M☉, tàn dư lõi sao khối lượng lớn sau supernova hoặc sụp đổ trực tiếp.
  - **Lỗ đen siêu khối (supermassive):** ~10⁶–10¹⁰ M☉, nằm ở tâm hầu hết thiên hà lớn.
- **(b) Vì sao có 2 loại tách biệt** — Lỗ đen sao hình thành từ một sao đơn lẻ → bị giới hạn khối lượng sao. Lỗ đen siêu khối lớn dần qua hàng tỉ năm bồi tụ khí + sáp nhập với lỗ đen khác → đạt khối lượng triệu-tỉ M☉.
- **(c) Ví dụ trực giác bằng số:**
  - Lỗ đen sao Cygnus X-1: ~21 M☉, R_s ~62 km.
  - **Sgr A\\*** (tâm Ngân Hà): ~4×10⁶ M☉, R_s ~1.2×10⁷ km.
  - M87\\* (lỗ đen được EHT chụp ảnh 2019): ~6.5×10⁹ M☉, R_s ~1.9×10¹⁰ km.

> ❓ **Câu hỏi tự nhiên.** *"Tâm Ngân Hà có lỗ đen, vậy ta có bị hút vào không?"* — Không. Mặt Trời cách Sgr A\\* ~26.000 ly ([Lesson 07](../lesson-07-galaxies/)) và quay quanh tâm ổn định, y như Trái Đất quay quanh Mặt Trời. Ở khoảng cách đó, Sgr A\\* chỉ là một khối ~4 triệu M☉ tạo trọng lực bình thường.

> 🔁 **Dừng lại tự kiểm tra.** Lỗ đen ở tâm Ngân Hà thuộc loại nào, nặng bao nhiêu?
> <details><summary>Đáp án</summary>Siêu khối (supermassive), tên Sgr A*, ~4 triệu (4×10⁶) M☉, R_s ~1.2×10⁷ km.</details>

---

## 4. Đĩa bồi tụ & vì sao lỗ đen quan sát được

> 💡 **Trực giác.** Lỗ đen tự nó không phát sáng. Nhưng khí rơi vào không lao thẳng — nó xoáy quanh thành một **đĩa bồi tụ (accretion disk)** như nước xoáy quanh lỗ thoát bồn rửa. Ma sát trong đĩa nén và đun khí tới hàng triệu độ → đĩa phát **tia X** cực sáng. Ta thấy lỗ đen **gián tiếp** qua ánh sáng dữ dội của đĩa, không phải qua bản thân nó.

- **Đĩa bồi tụ:** vật chất xoáy vào lỗ đen, nóng lên do ma sát/nén, phát bức xạ năng lượng cao (tia X, tia tử ngoại).
- **Phản lực (jet):** một số lỗ đen phun 2 luồng hạt tốc độ gần c vuông góc với đĩa — thấy ở các **nhân thiên hà hoạt động (AGN)** và **quasar**.
- **Hiệu suất khủng:** bồi tụ vào lỗ đen chuyển ~10% khối lượng-năng lượng thành bức xạ (\`E = mc²\`), hiệu quả hơn fusion hạt nhân (~0.7%) nhiều lần — đó là vì sao quasar (lỗ đen siêu khối đang ăn mạnh) là vật sáng nhất vũ trụ.

> ⚠ **Lỗi thường gặp.** Nghĩ "đã thấy lỗ đen sáng thì nó không còn là lỗ đen". Ánh sáng đến từ **đĩa bồi tụ bên ngoài** chân trời sự kiện, không phải từ bên trong. Bản thân lỗ đen vẫn tối; ta nhìn cái "viền sáng" và bóng của nó.

> 🔁 **Dừng lại tự kiểm tra.** Lỗ đen không phát sáng, vậy làm sao ta "thấy" nó?
> <details><summary>Đáp án</summary>Qua đĩa bồi tụ: khí rơi vào xoáy thành đĩa, ma sát đun nóng tới hàng triệu độ, phát tia X sáng. Ta thấy ánh sáng của đĩa (và bóng tối của chân trời sự kiện), không phải bản thân lỗ đen.</details>

---

## 5. Bằng chứng quan sát

> 💡 **Trực giác.** Lỗ đen từng bị coi là "trò chơi toán học" của thuyết tương đối. Giờ có 3 lớp bằng chứng quan sát vững chắc.

1. **Quỹ đạo sao quanh Sgr A\\*:** Theo dõi nhiều năm, các sao (như sao S2) quay quanh một điểm vô hình ở tâm Ngân Hà với quỹ đạo elip; từ quỹ đạo suy ra khối lượng ~4×10⁶ M☉ dồn vào vùng nhỏ → chỉ lỗ đen mới giải thích được. (Nobel Vật lý 2020 cho Genzel & Ghez.)

2. **Sóng hấp dẫn (gravitational waves):** LIGO/Virgo (từ 2015, GW150914) phát hiện gợn sóng không-thời gian từ **hai lỗ đen sáp nhập** — khớp chính xác dự đoán thuyết tương đối rộng. (Nối Tầng 3, [tương đối & không-thời gian](../../03-Cosmology/lesson-07-relativity-spacetime/).)

3. **Ảnh chân trời sự kiện (EHT):** Kính Event Horizon Telescope chụp được "bóng" của lỗ đen siêu khối: **M87\\*** (2019) và **Sgr A\\*** (2022) — vòng sáng (ánh sáng bị bẻ cong quanh chân trời) bao quanh vùng tối.

> ❓ **Câu hỏi tự nhiên.** *"Ánh sáng bị 'bẻ cong' quanh lỗ đen nghĩa là gì?"* — Trọng lực mạnh **uốn cong không-thời gian**, khiến đường đi của ánh sáng cong lại (**thấu kính hấp dẫn — gravitational lensing**). Gần lỗ đen, ánh sáng có thể vòng quanh chân trời nhiều lần, tạo "vòng photon" sáng — đúng cái EHT chụp được. (Cơ sở: thuyết tương đối rộng, Tầng 3 L07.)

> 🔁 **Dừng lại tự kiểm tra.** Bằng chứng nào trực tiếp cho thấy hai lỗ đen sáp nhập?
> <details><summary>Đáp án</summary>Sóng hấp dẫn (LIGO/Virgo, GW150914 năm 2015) — gợn sóng không-thời gian phát ra khi hai lỗ đen xoáy vào nhau và hợp nhất.</details>

---

## 6. Tóm tắt

> 📝 **Tóm tắt toàn bài.**
> - **Lỗ đen:** vùng có vận tốc thoát ≥ c → không gì thoát, kể cả ánh sáng.
> - **Bán kính Schwarzschild:** \`R_s = 2GM/c² ≈ 2.95 km × (M/M☉)\`; mặt cầu R_s = **chân trời sự kiện**. Mặt Trời → 3 km, Trái Đất → 9 mm, Sgr A* → 1.2×10⁷ km. \`R_s ∝ M\` (tuyến tính).
> - **Hai loại:** lỗ đen sao (3–100 M☉, từ supernova) và siêu khối (10⁶–10¹⁰ M☉, tâm thiên hà, vd Sgr A* ~4×10⁶ M☉).
> - **Đĩa bồi tụ:** khí xoáy vào nóng triệu độ, phát tia X → ta thấy lỗ đen gián tiếp.
> - **Bằng chứng:** quỹ đạo sao quanh Sgr A* (Nobel 2020), sóng hấp dẫn (LIGO 2015), ảnh EHT (M87* 2019, Sgr A* 2022).

---

## Bài tập

1. **R_s lỗ đen sao.** Tính bán kính Schwarzschild của một lỗ đen sao 8 M☉ (dùng mẹo nhanh). So với một thành phố nhỏ (~30 km ngang) thì nó to hay nhỏ?

2. **R_s từ công thức gốc.** Tính R_s của một lỗ đen 5 M☉ trực tiếp từ \`R_s = 2GM/c²\` (\`M☉ = 1.989×10³⁰ kg\`, \`G = 6.674×10⁻¹¹\`, \`c = 3×10⁸\`). So sánh với kết quả mẹo nhanh.

3. **Nén thành lỗ đen.** Để biến Mặt Trăng (\`M = 7.35×10²² kg\`) thành lỗ đen, phải nén nó vào bán kính bao nhiêu? (\`M☉ = 1.989×10³⁰ kg\`.)

4. **Mật độ "trung bình" trong chân trời.** So sánh mật độ trung bình (M chia thể tích quả cầu R_s) của một lỗ đen 4×10⁶ M☉ (Sgr A*, R_s ≈ 1.2×10¹⁰ m) với nước (1000 kg/m³). Nhận xét bất ngờ gì?

5. **Quan sát lỗ đen.** Lỗ đen tự nó tối. Nêu 3 cách (gián tiếp) mà các nhà thiên văn xác nhận sự tồn tại của lỗ đen.

---

## Lời giải chi tiết

### Bài 1 — R_s lỗ đen 8 M☉

Dùng mẹo nhanh \`R_s ≈ 2.95 km × (M/M☉)\`:
\`\`\`
R_s = 2.95 km × 8 = 23.6 km ≈ 24 km.
\`\`\`
So với thành phố ~30 km: **nhỏ hơn một chút** — toàn bộ chân trời sự kiện của một lỗ đen 8 M☉ gọn trong một thành phố. (Khối lượng 8 lần Mặt Trời nhưng chân trời chỉ ~24 km!)

### Bài 2 — R_s lỗ đen 5 M☉ từ công thức gốc

\`M = 5 × 1.989×10³⁰ = 9.945×10³⁰ kg\`.
\`\`\`
R_s = 2GM/c²
    = 2 × (6.674×10⁻¹¹) × (9.945×10³⁰) / (3×10⁸)²
    = (1.327×10²¹) / (9×10¹⁶)
    ≈ 1.475×10⁴ m
    ≈ 14.7 km.
\`\`\`
**So với mẹo nhanh:** \`2.95 × 5 = 14.75 km\`. → Khớp. Mẹo nhanh chính là rút gọn của công thức gốc.

### Bài 3 — Nén Mặt Trăng thành lỗ đen

Tỉ lệ khối lượng so với Mặt Trời:
\`\`\`
M/M☉ = 7.35×10²² / 1.989×10³⁰ = 3.70×10⁻⁸.
R_s ≈ 2.95 km × 3.70×10⁻⁸ = 1.09×10⁻⁷ km = 1.09×10⁻⁴ m ≈ 0.11 mm.
\`\`\`
→ Phải nén Mặt Trăng (đường kính ~3.474 km) vào một quả cầu bán kính **~0.1 mm** (cỡ hạt cát mịn) thì nó mới thành lỗ đen. Cho thấy cần mật độ điên rồ thế nào.

### Bài 4 — Mật độ trung bình của Sgr A*

\`M = 4×10⁶ × 1.989×10³⁰ = 7.96×10³⁶ kg\`. \`R_s = 1.2×10¹⁰ m\`.
\`\`\`
V = (4/3)π R_s³ = (4/3)π (1.2×10¹⁰)³ = (4/3)π (1.728×10³⁰) ≈ 7.24×10³⁰ m³.
ρ = M/V = 7.96×10³⁶ / 7.24×10³⁰ ≈ 1.10×10⁶ kg/m³.
\`\`\`
So với nước (1000 kg/m³): đặc hơn ~1100 lần — đặc, nhưng **không** điên rồ như sao neutron.

**Nhận xét bất ngờ:** vì \`R_s ∝ M\` nên thể tích \`∝ M³\`, mật độ "trung bình" \`ρ = M/V ∝ 1/M²\` — **lỗ đen càng nặng thì mật độ trung bình càng THẤP**. Một lỗ đen siêu khối đủ lớn có thể có mật độ trung bình loãng hơn cả nước. (Tất nhiên vật chất thật dồn ở kỳ dị tâm, "mật độ trung bình" chỉ là M chia thể tích chân trời.)

### Bài 5 — Ba cách quan sát lỗ đen

1. **Quỹ đạo sao/khí quanh một điểm vô hình:** đo chuyển động sao (như S2 quanh Sgr A*) → suy khối lượng dồn vào vùng nhỏ → lỗ đen. (Nobel 2020.)
2. **Đĩa bồi tụ phát tia X:** khí rơi vào nóng triệu độ phát tia X mạnh (vd hệ đôi Cygnus X-1) → dấu hiệu lỗ đen đang ăn.
3. **Sóng hấp dẫn** từ sáp nhập lỗ đen (LIGO), và/hoặc **ảnh EHT** chụp bóng chân trời (M87*, Sgr A*).

---

## Code & Minh họa

- **Visualization tương tác**: [visualization.html](./visualization.html) — gồm:
  - **Schwarzschild Calculator**: kéo/nhập khối lượng (từ Trái Đất tới lỗ đen siêu khối) → tính \`R_s\` live, so sánh kích thước với các mốc quen thuộc (viên bi, thành phố, Mặt Trời).
  - **Minh họa bẻ cong ánh sáng**: các tia sáng đi gần lỗ đen bị uốn cong (thấu kính hấp dẫn) quanh chân trời sự kiện; kéo slider khối lượng/khoảng cách để thấy độ cong & vòng photon thay đổi.
  - **Bảng vận tốc thoát**: so vận tốc thoát của Trái Đất / Mặt Trời / sao neutron / chân trời lỗ đen với c.

---

## Kết thúc Tầng 2

→ Đây là bài cuối **Tầng 2 — Stars & Galaxies**. Bạn đã đi từ một ngôi sao đơn lẻ tới cả thiên hà và lỗ đen ở tâm chúng.

→ Bài tiếp: [Tầng 3 — Vũ trụ giãn nở](../../03-Cosmology/lesson-01-expanding-universe/): phóng to lên thang lớn nhất — toàn vũ trụ. Định luật Hubble, dịch chuyển đỏ, và câu hỏi vũ trụ bắt đầu từ đâu.

**Tham khảo chéo:** thuyết tương đối làm nền cho lỗ đen → [\`../../03-Cosmology/lesson-07-relativity-spacetime/\`](../../03-Cosmology/lesson-07-relativity-spacetime/); tốc độ ánh sáng & vật lý hiện đại → [\`../../../Physics/03-Optics-ModernPhysics/\`](../../../Physics/03-Optics-ModernPhysics/).
`;
