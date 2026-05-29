# Lesson 05 — Hấp dẫn & Quỹ đạo (Gravity & Orbits)

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Phát biểu và áp dụng **định luật hấp dẫn vạn vật Newton**: `F = G·M·m / r²`.
- Suy ra **vận tốc quỹ đạo tròn**: `v = √(GM/r)` và áp dụng cho ISS, Mặt Trăng, vệ tinh địa tĩnh.
- Tính **vận tốc thoát (escape velocity)**: `v_esc = √(2GM/r)` và hiểu vì sao nó lớn hơn vận tốc quỹ đạo đúng `√2` lần.
- **Suy ra Định luật 3 Kepler từ định luật Newton** — nối hai bài lại với nhau.

## Kiến thức tiền đề

- **Định luật Kepler** (đặc biệt định luật 3 `T² = a³`): [Lesson 04](../lesson-04-kepler-laws/) — bài này chứng minh nó từ vật lý.
- **Công & năng lượng** (động năng, thế năng): [`../../../Physics/01-Mechanics/lesson-04-work-energy/`](../../../Physics/01-Mechanics/lesson-04-work-energy/) — cần cho vận tốc thoát.
- **Lực hướng tâm** trong chuyển động tròn: [`../../../Physics/01-Mechanics/lesson-06-circular-motion/`](../../../Physics/01-Mechanics/lesson-06-circular-motion/).

---

## 1. Định luật hấp dẫn vạn vật Newton

> 💡 **Trực giác / Hình dung.** Newton nhận ra: lực làm **quả táo rơi** xuống đất và lực giữ **Mặt Trăng** quay quanh Trái Đất là **CÙNG MỘT loại lực**. Mọi vật có khối lượng đều hút nhau. Lực này mạnh khi hai vật nặng và gần; yếu đi nhanh khi ra xa (theo bình phương khoảng cách).

**Định nghĩa (3 phần):**

- **(a) Là gì** — Hai vật khối lượng `M` và `m`, cách nhau khoảng `r` (tâm tới tâm), hút nhau bằng lực:
  ```
  F = G · M · m / r²
  ```
  với hằng số hấp dẫn `G = 6.674 × 10⁻¹¹ N·m²/kg²`.
- **(b) Vì sao cần** — Đây là nền tảng giải thích mọi chuyển động thiên thể: vì sao hành tinh quay quanh Mặt Trời, vệ tinh quanh Trái Đất, và (cùng với vật lý) **suy ra được cả 3 định luật Kepler**. Trước Newton, Kepler chỉ *mô tả* quỹ đạo; Newton *giải thích* nguyên nhân.
- **(c) Ví dụ trực giác bằng số** — Lực Trái Đất hút một người `m = 70 kg` đứng trên mặt đất (`M = 5.97×10²⁴ kg`, `r = 6.37×10⁶ m`):
  ```
  F = (6.674e−11 × 5.97e24 × 70) / (6.37e6)²
    = (6.674e−11 × 4.179e26) / (4.058e13)
    = 2.789e16 / 4.058e13
    = 687 N
  ```
  → Đúng bằng trọng lượng `mg = 70 × 9.8 = 686 N` ✓. Trọng lực chính là lực hấp dẫn.

**4 ví dụ số (lực hấp dẫn):**

| Cặp vật | Diễn giải | Ghi chú |
|---|---|---|
| Người 70kg trên mặt đất | ~687 N | = trọng lượng |
| Khoảng cách gấp đôi (`2r`) | F giảm 4 lần | vì `1/r²` |
| Khoảng cách gấp 3 (`3r`) | F giảm 9 lần | |
| Mặt Trăng–Trái Đất | ~2.0×10²⁰ N | giữ Trăng trên quỹ đạo |

> ⚠ **Lỗi thường gặp.** Nghĩ lực giảm **tuyến tính** theo khoảng cách. Sai — giảm theo **bình phương**. Gấp đôi khoảng cách → lực còn `1/4`, không phải `1/2`. Đây là "định luật nghịch đảo bình phương" (inverse-square law).

> 🔁 **Dừng lại tự kiểm tra.** Một vệ tinh ở độ cao khiến khoảng cách tới tâm Trái Đất gấp 4 lần bán kính Trái Đất. Lực hấp dẫn lên nó so với khi ở mặt đất?
> <details><summary>Đáp án</summary>`1/4² = 1/16`. Lực chỉ còn 1/16, không phải 1/4.</details>

---

## 2. Vận tốc quỹ đạo tròn

> 💡 **Trực giác.** Vì sao vệ tinh không rơi xuống? Nó **luôn đang rơi** — nhưng đi ngang đủ nhanh để mặt đất "cong đi" khỏi nó cũng nhanh bằng tốc độ nó rơi. Như ném đá: ném mạnh hơn thì đá bay xa hơn trước khi chạm đất; ném đủ mạnh, mặt đất cứ cong đi mãi và đá "rơi vòng quanh" Trái Đất → đó là quỹ đạo.

**Suy ra công thức:** Lực hấp dẫn đóng vai trò **lực hướng tâm** giữ vật trên quỹ đạo tròn:
```
G·M·m/r² = m·v²/r        (lực hấp dẫn = lực hướng tâm)
G·M/r    = v²            (rút gọn m, nhân r)
v = √(GM/r)
```

> 📐 **Công thức:** `v = √(GM/r)` — vận tốc cần để giữ quỹ đạo tròn bán kính `r` quanh vật khối lượng `M`. Càng xa (`r` lớn) → đi càng chậm.

**Walk-through bằng số thật (verify) — ISS** (độ cao ~420 km, `r = 6.37e6 + 0.42e6 = 6.79×10⁶ m`):
```
v = √(GM/r) = √(6.674e−11 × 5.97e24 / 6.79e6)
  = √(3.984e14 / 6.79e6)
  = √(5.868e7)
  = 7660 m/s ≈ 7.66 km/s
```
→ ~7.7 km/s. Khớp tốc độ ISS thực ~7.66 km/s ✓ (đi vòng quanh Trái Đất ~92 phút).

**4 ví dụ số (vận tốc quỹ đạo quanh Trái Đất, `GM = 3.986×10¹⁴`):**

| Vật | r (tâm Trái Đất) | v = √(GM/r) | Chu kỳ |
|---|---|---|---|
| ISS | 6.79×10⁶ m | ~7.66 km/s | ~92 phút |
| Vệ tinh địa tĩnh | 4.22×10⁷ m | ~3.07 km/s | 24h (đứng yên so với mặt đất) |
| Mặt Trăng | 3.84×10⁸ m | ~1.02 km/s | ~27.3 ngày |
| Sát mặt đất (lý thuyết) | 6.37×10⁶ m | ~7.91 km/s | ~84 phút (tốc độ vũ trụ cấp 1) |

> ❓ **Câu hỏi tự nhiên.**
> - *"Vệ tinh địa tĩnh đứng yên trên trời, sao vẫn cần tốc độ?"* — Nó không đứng yên thật, mà quay quanh Trái Đất đúng 24h — bằng chu kỳ Trái Đất tự quay — nên nhìn từ mặt đất thấy nó "treo" một chỗ. Tốc độ thực ~3.07 km/s.
> - *"Vì sao Mặt Trăng đi chậm hơn ISS?"* — Vì xa hơn nhiều (`r` lớn → `v = √(GM/r)` nhỏ). Mặt Trăng xa gấp ~56 lần ISS → chậm hơn `√56 ≈ 7.5` lần.

> ⚠ **Lỗi thường gặp.** Nghĩ "vệ tinh ở quỹ đạo cao cần đi nhanh hơn". Ngược lại — cao hơn thì đi **chậm** hơn (`v ∝ 1/√r`). Nhưng cần **nhiều năng lượng hơn** để đưa lên đó.

---

## 3. Vận tốc thoát (Escape Velocity)

> 💡 **Trực giác.** Ném một quả bóng lên: nó rơi xuống. Ném mạnh hơn: lên cao hơn rồi vẫn rơi. Có một tốc độ "ma thuật" mà nếu ném đạt tới, quả bóng **không bao giờ rơi lại** — nó thoát hẳn khỏi lực hút (về lý thuyết, bỏ qua khí quyển). Đó là **vận tốc thoát**.

**Định nghĩa (3 phần):**

- **(a) Là gì** — Tốc độ tối thiểu để một vật thoát hoàn toàn khỏi trường hấp dẫn của một thiên thể (đạt khoảng cách vô hạn với vận tốc → 0), không cần lực đẩy thêm.
- **(b) Vì sao cần** — Quyết định cần bao nhiêu "cú hích" để phóng tàu vũ trụ rời Trái Đất, hay vì sao thiên thể nhỏ (Mặt Trăng) không giữ được khí quyển (phân tử khí dễ đạt vận tốc thoát).
- **(c) Suy ra bằng năng lượng** — Cho động năng đủ thắng thế năng hấp dẫn (xem [Physics — Công & năng lượng](../../../Physics/01-Mechanics/lesson-04-work-energy/)):
  ```
  ½mv² = GMm/r       (động năng = trị tuyệt đối thế năng hấp dẫn)
  v² = 2GM/r
  v_esc = √(2GM/r)
  ```

> 📐 **Công thức:** `v_esc = √(2GM/r) = √2 · v_orbit`. Vận tốc thoát lớn hơn vận tốc quỹ đạo tròn (cùng `r`) đúng **`√2 ≈ 1.414` lần**.

**Walk-through bằng số thật (verify) — Trái Đất** (`GM = 3.986×10¹⁴`, `r = 6.37×10⁶ m`):
```
v_esc = √(2 × 3.986e14 / 6.37e6)
      = √(7.972e14 / 6.37e6)
      = √(1.251e8)
      = 11185 m/s ≈ 11.2 km/s
```
→ ~11.2 km/s. Khớp giá trị nổi tiếng ✓ (gọi là "tốc độ vũ trụ cấp 2").

**4 ví dụ số (vận tốc thoát):**

| Thiên thể | v_esc | Ghi chú |
|---|---|---|
| Trái Đất (mặt đất) | ~11.2 km/s | tốc độ vũ trụ cấp 2 |
| Mặt Trăng | ~2.4 km/s | nhỏ → khó giữ khí quyển |
| Sao Mộc | ~59.5 km/s | khổng lồ → giữ khí quyển dày |
| Mặt Trời (từ bề mặt) | ~618 km/s | rất lớn |

> 🔁 **Dừng lại tự kiểm tra.** ISS có vận tốc quỹ đạo ~7.66 km/s. Để thoát hẳn khỏi Trái Đất từ độ cao đó, cần tốc độ bao nhiêu?
> <details><summary>Đáp án</summary>`v_esc = √2 × 7.66 ≈ 10.83 km/s`. Vận tốc thoát = √2 lần vận tốc quỹ đạo tròn ở cùng độ cao.</details>

> ❓ **Câu hỏi tự nhiên.** *"Vì sao Mặt Trăng không có khí quyển?"* — Vận tốc thoát của Mặt Trăng chỉ ~2.4 km/s. Các phân tử khí ở nhiệt độ ban ngày dễ đạt tốc độ này và bay mất dần qua thời gian. Trái Đất (11.2 km/s) và Sao Mộc (59.5 km/s) giữ khí tốt hơn nhiều.

---

## 4. Suy ra Định luật 3 Kepler từ Newton

> 💡 **Trực giác.** Kepler tìm ra `T² ∝ a³` từ **số liệu** (chưa biết vì sao). Newton, với `F = GMm/r²`, **chứng minh được** nó — và còn cho biết hằng số tỉ lệ phụ thuộc khối lượng vật trung tâm. Đây là khoảnh khắc vật lý "giải thích" thiên văn.

**Chứng minh (từng bước, quỹ đạo tròn `r`):**

Bước 1 — Lực hấp dẫn = lực hướng tâm:
```
GMm/r² = m·v²/r
```

Bước 2 — Vận tốc theo chu kỳ: vật đi hết chu vi `2πr` trong thời gian `T`:
```
v = 2πr / T
```

Bước 3 — Thay `v` vào bước 1:
```
GM/r² = v²/r = (2πr/T)² / r = 4π²r² / (T²·r) = 4π²r / T²
```

Bước 4 — Nhân chéo, rút gọn:
```
GM·T² = 4π²·r³
T² = (4π²/GM) · r³
```

> 📐 **Kết quả:** `T² = (4π²/GM)·a³`. Với quỹ đạo elip, `r` thay bằng bán trục lớn `a`. Đây là dạng **tổng quát** của Định luật 3 Kepler.

**Verify ra dạng `T² = a³` (năm, AU):** với vật quay quanh **Mặt Trời** (`M = M☉`), hằng số `4π²/(GM☉)` đúng bằng `1` khi `T` tính bằng năm và `a` bằng AU:
```
Trái Đất: T = 1 năm, a = 1 AU → 4π²/(GM☉) = T²/a³ = 1/1 = 1 ✓
```
→ Đó là vì sao Lesson 04 dùng được dạng gọn `T² = a³`. Newton giải thích hằng số đó từ đâu mà ra.

> ❓ **Câu hỏi tự nhiên.** *"Vì sao Lesson 04 nói hằng số khác nhau cho Mặt Trăng quanh Trái Đất?"* — Vì hằng số là `4π²/(GM)` với `M` = khối lượng vật **trung tâm**. Quanh Mặt Trời thì `M = M☉`; quanh Trái Đất thì `M = M⊕` (nhỏ hơn ~333000 lần) → hằng số khác → không dùng được dạng "năm & AU".

> 🔁 **Dừng lại tự kiểm tra.** Từ `T² = (4π²/GM)a³`, nếu ta đo được `T` và `a` của một vệ tinh quanh hành tinh lạ, ta tính được gì?
> <details><summary>Đáp án</summary>Khối lượng `M` của hành tinh đó: `M = 4π²a³/(G·T²)`. Đây chính là cách các nhà thiên văn "cân" các hành tinh và ngôi sao!</details>

> 📝 **Tóm tắt toàn bài.**
> - **Newton**: `F = GMm/r²` — nghịch đảo bình phương, mọi vật hút nhau.
> - **Vận tốc quỹ đạo tròn**: `v = √(GM/r)`. ISS ~7.7 km/s; địa tĩnh ~3.07 km/s; Mặt Trăng ~1.02 km/s. Cao hơn → chậm hơn.
> - **Vận tốc thoát**: `v_esc = √(2GM/r) = √2·v_orbit`. Trái Đất ~11.2 km/s.
> - **Suy Kepler 3 từ Newton**: `T² = (4π²/GM)·a³`; quanh Mặt Trời (năm, AU) → `T² = a³`. Cho phép "cân" thiên thể.

---

## Bài tập

1. **Nghịch đảo bình phương.** Lực hấp dẫn lên một vệ tinh ở khoảng cách `r` là `F`. Tìm lực khi nó ở `5r`.

2. **Vận tốc quỹ đạo.** Tính vận tốc quỹ đạo tròn của một vệ tinh ở độ cao 2000 km (`r = 8.37×10⁶ m`, `GM = 3.986×10¹⁴`).

3. **Vận tốc thoát Mặt Trăng.** Mặt Trăng có `GM = 4.90×10¹² m³/s²`, bán kính `r = 1.74×10⁶ m`. Tính `v_esc`.

4. **Quan hệ thoát/quỹ đạo.** Một hành tinh có vận tốc quỹ đạo tròn sát bề mặt là 5 km/s. Vận tốc thoát từ bề mặt là bao nhiêu?

5. **Cân hành tinh.** Một mặt trăng quay quanh hành tinh X với `a = 4.0×10⁸ m`, chu kỳ `T = 6.0×10⁵ s`. Tính khối lượng hành tinh X (`G = 6.674×10⁻¹¹`).

---

## Lời giải chi tiết

### Bài 1 — Nghịch đảo bình phương

Lực `∝ 1/r²`. Ở `5r`:
```
F' = F × (r/5r)² = F × (1/5)² = F/25
```
→ Lực còn `1/25` của ban đầu.

### Bài 2 — Vận tốc quỹ đạo ở 2000 km

```
v = √(GM/r) = √(3.986e14 / 8.37e6)
  = √(4.762e7)
  = 6901 m/s ≈ 6.90 km/s
```
→ ~6.9 km/s (chậm hơn ISS ở 420 km vì xa hơn — đúng quy luật `v ∝ 1/√r`).

### Bài 3 — Vận tốc thoát Mặt Trăng

```
v_esc = √(2GM/r) = √(2 × 4.90e12 / 1.74e6)
      = √(9.80e12 / 1.74e6)
      = √(5.632e6)
      = 2373 m/s ≈ 2.37 km/s
```
→ ~2.4 km/s. Nhỏ (so với Trái Đất 11.2 km/s) → vì sao Mặt Trăng không giữ được khí quyển.

### Bài 4 — Thoát/quỹ đạo

`v_esc = √2 × v_orbit = √2 × 5 = 7.07 km/s`.

→ Vận tốc thoát luôn = `√2 ≈ 1.414` lần vận tốc quỹ đạo tròn ở cùng khoảng cách. Đây là quan hệ phổ quát, không phụ thuộc thiên thể.

### Bài 5 — Cân hành tinh X

Từ `T² = (4π²/GM)·a³` → `M = 4π²a³/(G·T²)`:
```
a³ = (4.0e8)³ = 6.4e25
T² = (6.0e5)² = 3.6e11
M = 4π² × 6.4e25 / (6.674e−11 × 3.6e11)
  = (39.48 × 6.4e25) / (2.403e1)
  = 2.527e27 / 24.03
  = 1.05e26 kg
```
→ Hành tinh X nặng ~`1.05×10²⁶ kg` (cỡ Sao Hải Vương ~1.02×10²⁶ kg). Đây chính là cách thiên văn học "cân" các thiên thể từ quỹ đạo vệ tinh của chúng.

---

## Code & Minh họa

- **Visualization tương tác**: [visualization.html](./visualization.html) — gồm:
  - **Orbit Launcher**: slider vận tốc phóng ngang → mô phỏng quỹ đạo: quá chậm rơi xuống, vừa đủ thành tròn, nhanh hơn thành elip, đạt `√2·v` thì thoát hẳn. Thấy trực tiếp ranh giới tròn/elip/thoát.
  - **Cosmic Velocity Calculator**: nhập khối lượng + bán kính thiên thể (hoặc chọn preset Trái Đất/Mặt Trăng/Sao Mộc) → tính `v_orbit = √(GM/r)` và `v_esc = √(2GM/r)`, hiển thị tỉ số `√2`.

---

## Kết thúc Tầng 1

→ [Lesson 06 — Thiên thể nhỏ](../lesson-06-small-bodies/): tiểu hành tinh, sao chổi, vành đai — áp dụng Kepler & hấp dẫn cho các vật nhỏ của Hệ Mặt Trời.

**Tham khảo chéo:** năng lượng cho vận tốc thoát: [`../../../Physics/01-Mechanics/lesson-04-work-energy/`](../../../Physics/01-Mechanics/lesson-04-work-energy/); lực hướng tâm: [`../../../Physics/01-Mechanics/lesson-06-circular-motion/`](../../../Physics/01-Mechanics/lesson-06-circular-motion/); định luật Kepler được chứng minh: [Lesson 04](../lesson-04-kepler-laws/).
