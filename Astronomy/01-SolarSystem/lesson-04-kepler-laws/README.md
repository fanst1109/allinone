# Lesson 04 — Định luật Kepler (Kepler's Laws of Planetary Motion)

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Hiểu hình học **elip (ellipse)**: bán trục lớn `a`, tâm sai `e`, hai **tiêu điểm (foci)**.
- Phát biểu và áp dụng **Định luật 1 Kepler** (quỹ đạo elip, Mặt Trời ở một tiêu điểm).
- Phát biểu **Định luật 2** (định luật diện tích): hành tinh quét diện tích bằng nhau trong thời gian bằng nhau → nhanh ở **cận điểm (perihelion)**, chậm ở **viễn điểm (aphelion)**.
- Phát biểu và dùng **Định luật 3**: `T² = a³` (với `T` tính bằng năm, `a` bằng đơn vị thiên văn AU).

## Kiến thức tiền đề

- Chuyển động tròn & hướng tâm: [`../../../Physics/01-Mechanics/lesson-06-circular-motion/`](../../../Physics/01-Mechanics/lesson-06-circular-motion/) — quỹ đạo tròn là trường hợp đặc biệt của elip (`e = 0`).
- Hình học góc, đại số cơ bản.

---

## 1. Elip — Hình học của quỹ đạo (Ellipse)

> 💡 **Trực giác / Hình dung.** Đóng hai cây đinh xuống bảng, choàng một sợi dây vòng quanh, căng dây bằng đầu bút chì rồi vẽ. Đường khép kín thu được là **elip**. Hai cây đinh là **hai tiêu điểm**. Đặc tính: tổng khoảng cách từ một điểm trên elip tới hai tiêu điểm **luôn không đổi** (= chiều dài dây).

**Định nghĩa các đại lượng (3 phần mỗi cái):**

**Bán trục lớn `a` (semi-major axis):**
- **(a) Là gì** — nửa chiều dài trục dài nhất của elip (từ tâm tới đỉnh xa nhất).
- **(b) Vì sao cần** — `a` là "kích thước" của quỹ đạo, quyết định chu kỳ (Định luật 3) và bằng khoảng cách trung bình tới Mặt Trời.
- **(c) Ví dụ số** — Trái Đất `a = 1 AU = 149.6` triệu km. Sao Hỏa `a = 1.52 AU`. Sao Mộc `a = 5.2 AU`.

**Tâm sai `e` (eccentricity):**
- **(a) Là gì** — số đo độ "dẹt" của elip, `e = c/a` với `c` = khoảng cách từ tâm tới tiêu điểm. `0 ≤ e < 1`.
- **(b) Vì sao cần** — `e = 0` là đường tròn hoàn hảo; `e` gần 1 là elip rất dẹt (sao chổi). Nó cho biết quỹ đạo "tròn" hay "thuôn".
- **(c) Ví dụ số** — Trái Đất `e = 0.017` (gần tròn). Sao Hỏa `e = 0.093`. Sao chổi Halley `e = 0.967` (rất dẹt). Quỹ đạo tròn lý tưởng `e = 0`.

**Cận điểm & viễn điểm:**
- **Cận điểm (perihelion)** — điểm gần Mặt Trời nhất: `r_min = a(1 − e)`.
- **Viễn điểm (aphelion)** — điểm xa nhất: `r_max = a(1 + e)`.

**Walk-through bằng số thật (verify) — Trái Đất `a = 1 AU`, `e = 0.017`:**
```
r_min = 1 × (1 − 0.017) = 0.983 AU ≈ 147.1 triệu km (cận nhật, tháng 1)
r_max = 1 × (1 + 0.017) = 1.017 AU ≈ 152.1 triệu km (viễn nhật, tháng 7)
```
Khớp với số liệu ở Lesson 02 (vì sao mùa không do khoảng cách) ✓.

**4 ví dụ số tâm sai:**

| Thiên thể | a (AU) | e | Mô tả |
|---|---|---|---|
| Sao Kim | 0.72 | 0.007 | gần như tròn hoàn hảo |
| Trái Đất | 1.00 | 0.017 | gần tròn |
| Sao Hỏa | 1.52 | 0.093 | hơi dẹt |
| Sao chổi Halley | 17.8 | 0.967 | cực dẹt |

> ⚠ **Lỗi thường gặp.** Vẽ Mặt Trời ở **tâm** elip. Sai — Mặt Trời ở một **tiêu điểm**, lệch khỏi tâm một đoạn `c = a·e`. Tâm hình học không có vật gì. Tiêu điểm còn lại trống.

> 🔁 **Dừng lại tự kiểm tra.** Một quỹ đạo có `e = 0`. Hình dạng là gì? Hai tiêu điểm ở đâu?
> <details><summary>Đáp án</summary>Đường tròn. Khi `e = 0` thì `c = a·e = 0` → hai tiêu điểm trùng nhau tại tâm. Quỹ đạo tròn là elip đặc biệt.</details>

---

## 2. Định luật 1 — Quỹ đạo elip (Law of Ellipses)

> 💡 **Trực giác.** Trước Kepler, ai cũng tin quỹ đạo phải là **đường tròn** (vì tròn "hoàn hảo"). Kepler, dựa trên số liệu quan sát siêu chính xác của Tycho Brahe về Sao Hỏa, phát hiện tròn không khớp — phải là **elip** mới đúng.

**Phát biểu:** *Mỗi hành tinh chuyển động trên một quỹ đạo elip, với Mặt Trời nằm ở một trong hai tiêu điểm.*

> ❓ **Câu hỏi tự nhiên.**
> - *"Vì sao quỹ đạo các hành tinh nhìn 'gần tròn' nếu là elip?"* — Vì tâm sai rất nhỏ (`e < 0.1` với hầu hết hành tinh). Elip `e = 0.017` của Trái Đất gần như không phân biệt được với đường tròn bằng mắt. Phải đo cực kỳ chính xác mới thấy lệch.
> - *"Tiêu điểm kia (trống) có ý nghĩa gì?"* — Không có vật thể, nhưng có vai trò hình học: tổng khoảng cách tới hai tiêu điểm luôn `= 2a`.

---

## 3. Định luật 2 — Định luật diện tích (Law of Equal Areas)

> 💡 **Trực giác.** Tưởng tượng một sợi dây nối hành tinh với Mặt Trời. Khi hành tinh đi, sợi dây "quét" một hình quạt. Định luật 2 nói: **trong cùng một khoảng thời gian, diện tích quét luôn bằng nhau** — bất kể hành tinh đang ở gần hay xa. Hệ quả: ở **gần** Mặt Trời (cận điểm), dây ngắn → để quét cùng diện tích, hành tinh phải đi **nhanh**; ở **xa** (viễn điểm), dây dài → đi **chậm**.

**Phát biểu:** *Đoạn thẳng nối hành tinh với Mặt Trời quét những diện tích bằng nhau trong những khoảng thời gian bằng nhau.*

Đây thực chất là **bảo toàn mômen động lượng (angular momentum)**: `r × v` không đổi → `r` nhỏ thì `v` lớn.

**Walk-through bằng số (verify) — Trái Đất:**

Tốc độ quỹ đạo trung bình ~`29.8 km/s`. Bảo toàn mômen động lượng cho:
```
v_cận / v_viễn = r_viễn / r_cận = (1+e)/(1−e) = 1.017/0.983 = 1.035
```
- `v_cận ≈ 30.3 km/s` (tháng 1, gần Mặt Trời nhất → nhanh nhất)
- `v_viễn ≈ 29.3 km/s` (tháng 7, xa nhất → chậm nhất)

→ Chênh ~`1 km/s`, đúng theo định luật 2. (Với Trái Đất nhỏ vì `e` nhỏ; sao chổi Halley chênh khủng khiếp: nhanh vùn vụt ở cận điểm, bò chậm ở rìa Hệ Mặt Trời.)

> ⚠ **Lỗi thường gặp.** Nghĩ hành tinh đi **đều** trên quỹ đạo. Sai — tốc độ thay đổi liên tục, nhanh nhất ở cận điểm, chậm nhất ở viễn điểm. Chỉ quỹ đạo tròn (`e = 0`) mới đi đều.

> 🔁 **Dừng lại tự kiểm tra.** Sao chổi Halley dành phần lớn thời gian ở gần hay xa Mặt Trời?
> <details><summary>Đáp án</summary>Ở xa. Vì xa thì đi chậm (định luật 2), nên dành nhiều thời gian ở vùng viễn điểm. Halley chỉ "lướt" qua vùng gần Mặt Trời trong vài tháng mỗi 76 năm.</details>

---

## 4. Định luật 3 — Định luật chu kỳ (Harmonic Law)

> 💡 **Trực giác.** Hành tinh càng **xa** Mặt Trời thì **một năm của nó càng dài** — vì hai lý do: quãng đường quỹ đạo dài hơn VÀ tốc độ chậm hơn (lực hấp dẫn yếu hơn). Kepler tìm ra quy luật định lượng chính xác nối hai đại lượng này.

**Phát biểu:** *Bình phương chu kỳ quỹ đạo tỉ lệ với lập phương bán trục lớn:*

> 📐 **Công thức:**
>
> `T² = a³`
>
> khi `T` tính bằng **năm Trái Đất** và `a` bằng **đơn vị thiên văn (AU)**. (Đơn vị này tiện vì với Trái Đất `T = 1, a = 1`, hằng số tỉ lệ = 1.)

**Walk-through bằng số thật (verify cả 2 vế):**

**Trái Đất** — `a = 1 AU`:
```
T² = a³ = 1³ = 1 → T = 1 năm ✓ (định nghĩa)
```

**Sao Hỏa** — `a = 1.52 AU`:
```
T = √(a³) = √(1.52³) = √(3.512) = 1.874 năm
```
→ ~1.88 năm. Kiểm chứng: chu kỳ Sao Hỏa thực ~687 ngày = `687/365.25 = 1.881` năm ✓.

**Sao Mộc** — `a = 5.2 AU`:
```
T = √(5.2³) = √(140.6) = 11.86 năm
```
→ ~11.86 năm. Chu kỳ Sao Mộc thực ~11.86 năm ✓.

**4 ví dụ số (verify):**

| Hành tinh | a (AU) | T tính = √(a³) | T thực |
|---|---|---|---|
| Sao Thủy | 0.387 | √(0.058) = 0.241 năm | 0.241 năm ✓ |
| Trái Đất | 1.00 | 1.00 năm | 1.00 năm ✓ |
| Sao Hỏa | 1.52 | 1.88 năm | 1.88 năm ✓ |
| Sao Thổ | 9.58 | √(879) = 29.6 năm | 29.5 năm ✓ |

> ❓ **Câu hỏi tự nhiên.**
> - *"Định luật 3 có dùng cho Mặt Trăng quanh Trái Đất không?"* — Có, nhưng hằng số tỉ lệ KHÁC (vì nó phụ thuộc khối lượng vật trung tâm). Dạng `T² = a³` (năm, AU) chỉ đúng cho vật quay quanh **Mặt Trời**. Lesson 05 sẽ cho công thức tổng quát `T² = 4π²a³/(GM)`.
> - *"Vì sao lại là lập phương, không phải bình phương?"* — Suy ra được từ định luật hấp dẫn Newton (`F ∝ 1/r²`). Ta chứng minh ở [Lesson 05](../lesson-05-gravity-orbits/).

> ⚠ **Lỗi thường gặp.** Quên đổi đơn vị: dùng `T` bằng ngày hoặc `a` bằng km thì `T² = a³` KHÔNG còn đúng (hằng số ≠ 1). Phải dùng năm + AU.

> 🔁 **Dừng lại tự kiểm tra.** Một hành tinh giả định có `a = 4 AU`. Chu kỳ?
> <details><summary>Đáp án</summary>`T = √(4³) = √64 = 8 năm`.</details>

> 📝 **Tóm tắt toàn bài.**
> - **Định luật 1**: quỹ đạo elip, Mặt Trời ở một tiêu điểm (không phải tâm).
> - **Định luật 2**: quét diện tích bằng nhau / thời gian bằng nhau → nhanh ở cận điểm, chậm ở viễn điểm (bảo toàn mômen động lượng).
> - **Định luật 3**: `T² = a³` (năm, AU). Sao Hỏa `a=1.52→T=1.88`; Sao Mộc `a=5.2→T=11.86`.
> - Elip: `a` (kích thước), `e = c/a` (độ dẹt). `r_min = a(1−e)`, `r_max = a(1+e)`.

---

## Bài tập

1. **Chu kỳ.** Một tiểu hành tinh có `a = 2.8 AU`. Tính chu kỳ quỹ đạo theo năm.

2. **Bán trục từ chu kỳ.** Sao chổi có chu kỳ `T = 76` năm (Halley). Tính `a` (AU).

3. **Cận/viễn điểm.** Sao Hỏa `a = 1.52 AU`, `e = 0.093`. Tính khoảng cách cận điểm và viễn điểm tới Mặt Trời (AU).

4. **Tốc độ cận/viễn.** Dùng định luật 2, tính tỉ số tốc độ `v_cận/v_viễn` cho Sao Hỏa (`e = 0.093`).

5. **Verify Định luật 3.** Sao Kim có chu kỳ `T = 0.615` năm. Dự đoán `a` rồi so với giá trị thật `0.723 AU`.

---

## Lời giải chi tiết

### Bài 1 — Chu kỳ tiểu hành tinh

`a = 2.8 AU`:
```
T = √(a³) = √(2.8³) = √(21.95) = 4.69 năm
```

### Bài 2 — Bán trục từ chu kỳ

`T = 76` năm. Từ `T² = a³` → `a = (T²)^(1/3) = T^(2/3)`:
```
a = 76^(2/3) = (76²)^(1/3) = (5776)^(1/3) = 17.9 AU
```
→ Halley có `a ≈ 17.9 AU` (gần quỹ đạo Sao Hải Vương ~30 AU ở viễn điểm). Khớp giá trị thật ~17.8 AU ✓.

### Bài 3 — Cận/viễn điểm Sao Hỏa

`a = 1.52`, `e = 0.093`:
```
r_min = a(1 − e) = 1.52 × (1 − 0.093) = 1.52 × 0.907 = 1.379 AU
r_max = a(1 + e) = 1.52 × (1 + 0.093) = 1.52 × 1.093 = 1.661 AU
```
→ Sao Hỏa dao động từ ~1.38 AU (cận điểm) tới ~1.66 AU (viễn điểm). Chênh đáng kể (`e` lớn hơn Trái Đất) → vì sao "đại xung đối" (Sao Hỏa gần Trái Đất khi ở cận điểm) đặc biệt sáng.

### Bài 4 — Tỉ số tốc độ Sao Hỏa

Bảo toàn mômen động lượng: `v_cận × r_min = v_viễn × r_max`:
```
v_cận/v_viễn = r_max/r_min = (1+e)/(1−e) = 1.093/0.907 = 1.205
```
→ Tốc độ tại cận điểm nhanh hơn viễn điểm ~20.5%. (Trái Đất chỉ ~3.5% vì `e` nhỏ hơn.)

### Bài 5 — Verify Sao Kim

`T = 0.615` năm. Dự đoán `a`:
```
a = T^(2/3) = 0.615^(2/3) = (0.615²)^(1/3) = (0.378)^(1/3) = 0.723 AU
```
→ Khớp **chính xác** giá trị thật `0.723 AU` ✓. Định luật 3 đúng tuyệt vời cho mọi hành tinh quanh Mặt Trời.

---

## Code & Minh họa

- **Visualization tương tác**: [visualization.html](./visualization.html) — gồm:
  - **Ellipse Explorer**: kéo slider tâm sai `e` → elip biến dạng từ tròn (`e=0`) sang dẹt, Mặt Trời ở tiêu điểm. Nút "Chạy" cho hành tinh chuyển động + **quét diện tích** (minh họa định luật 2: nhanh ở cận điểm).
  - **Kepler's 3rd Law Calculator**: nhập `a` (hoặc `T`) → tính cái còn lại bằng `T² = a³`, kèm đồ thị log-log `T²` vs `a³` với các hành tinh thật chấm điểm lên đường thẳng.

---

## Bài tiếp theo

→ [Lesson 05 — Hấp dẫn & quỹ đạo](../lesson-05-gravity-orbits/): định luật hấp dẫn Newton `F = GMm/r²`, vận tốc quỹ đạo, vận tốc thoát — và **chứng minh Định luật 3 Kepler từ Newton**.

**Tham khảo chéo:** chuyển động tròn (elip với `e=0`): [`../../../Physics/01-Mechanics/lesson-06-circular-motion/`](../../../Physics/01-Mechanics/lesson-06-circular-motion/).
