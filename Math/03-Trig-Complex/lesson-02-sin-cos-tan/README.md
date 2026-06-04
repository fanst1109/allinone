# Lesson 02 — sin, cos, tan

## Mục tiêu

- Định nghĩa **sin, cos, tan** qua đường tròn lượng giác (không chỉ trong tam giác vuông).
- Đồ thị 3 hàm — chu kỳ, biên độ, pha.
- Bảng giá trị các góc đặc biệt: 0, 30, 45, 60, 90°...
- Hiểu **biến đổi A·sin(ω·x + φ)** — sóng, dao động, sóng điện xoay chiều.

## Kiến thức tiền đề

- [Lesson 01 — Góc & radian](../lesson-01-angles-radians/).

---

## 1. Định nghĩa (qua đường tròn lượng giác)

💡 **Vì sao dùng đường tròn, không tam giác?** Trong tam giác vuông, góc chỉ có thể từ 0° đến 90°. Nhưng ta cần sin/cos cho mọi góc (kể cả 270°, -50°). Đường tròn lượng giác giải quyết: lấy điểm trên đường tròn r=1, ứng với góc θ.

Cho điểm M trên đường tròn đơn vị, ứng với góc θ:
- **cos θ** = hoành độ của M.
- **sin θ** = tung độ của M.
- **tan θ** = sin θ / cos θ (khi cos θ ≠ 0).

⟶ Sin, cos định nghĩa cho **mọi θ ∈ ℝ**.

> 📐 **Định nghĩa đầy đủ — sin, cos**
>
> **(a) Là gì**: sin θ và cos θ là **toạ độ** của 1 điểm M trên đường tròn bán kính 1, sau khi quay từ trục x dương 1 góc θ ngược chiều kim đồng hồ. cos θ = hoành độ, sin θ = tung độ. tan θ = sin/cos (slope của OM).
>
> **(b) Vì sao cần**: Định nghĩa qua tam giác vuông chỉ hợp lệ cho 0 < θ < 90°. Đường tròn lượng giác mở rộng cho **mọi θ ∈ ℝ** (kể cả âm, lớn hơn 360°). Quan trọng hơn — định nghĩa này làm cho sin/cos **tuần hoàn** chu kỳ 2π một cách tự nhiên (đi quanh đường tròn 1 vòng), và giải thích vì sao sin²+cos² = 1 (vì điểm trên đường tròn r=1 thoả x²+y²=1).
>
> **(c) Ví dụ số**: θ = 0: M = (1, 0) → cos 0 = 1, sin 0 = 0. θ = π/2: M = (0, 1) → cos π/2 = 0, sin π/2 = 1. θ = π: M = (-1, 0). θ = π/4 (45°): M = (√2/2, √2/2). θ = 2π/3 (120°): M = (-1/2, √3/2). Verify: cos² + sin² = (-1/2)² + (√3/2)² = 1/4 + 3/4 = **1** ✓.

⚠ **Lỗi thường gặp — viết `tan π/2 = ∞` như một số**. Tại θ = π/2 thì cos = 0 → `tan = sin/cos = 1/0` **không xác định** (undefined), không phải bằng vô cực như một con số. Khi giải toán phải loại θ = π/2 + kπ khỏi miền của tan.

❓ **Câu hỏi tự nhiên của người đọc**

- *"sin và cos có thể lớn hơn 1 không?"* **Không**. Vì là toạ độ điểm trên đường tròn bán kính 1, luôn `−1 ≤ sin θ ≤ 1` và `−1 ≤ cos θ ≤ 1`. Nếu tính ra `sin x = 1.2` thì chắc chắn sai ở đâu đó. Riêng **tan** thì không bị chặn (chạy khắp ℝ).
- *"Định nghĩa tam giác vuông và định nghĩa đường tròn có mâu thuẫn không?"* Không — chúng **trùng nhau** trong khoảng `0 < θ < π/2` (xem mục 5). Đường tròn chỉ **mở rộng** ra mọi góc, không thay thế.

🔁 **Dừng lại tự kiểm tra**

1. Tại θ = 3π/2, điểm M ở đâu? cos và sin bằng mấy?
2. Có góc nào mà `sin θ = cos θ = 0.8` cùng lúc không?

<details><summary>Đáp án</summary>

1. θ = 3π/2 → điểm (0, −1) (dưới cùng). `cos 3π/2 = 0`, `sin 3π/2 = −1`.
2. Không. Nếu cả hai bằng 0.8 thì `cos² + sin² = 0.64 + 0.64 = 1.28 ≠ 1`, vi phạm hệ thức Pythagore.

</details>

### 📝 Tóm tắt mục 1

- cos θ = hoành độ, sin θ = tung độ điểm M trên đường tròn đơn vị; tan θ = sin/cos.
- Định nghĩa này dùng được cho **mọi θ ∈ ℝ** (vượt 0–90°), khác định nghĩa tam giác vuông.
- Luôn `|sin|, |cos| ≤ 1`; tan không xác định khi cos = 0.

---

## 2. Bảng giá trị đặc biệt

| θ | 0 | π/6 (30°) | π/4 (45°) | π/3 (60°) | π/2 (90°) | π (180°) | 3π/2 (270°) | 2π (360°) |
|---|---|---|---|---|---|---|---|---|
| sin θ | 0 | 1/2 | √2/2 | √3/2 | 1 | 0 | -1 | 0 |
| cos θ | 1 | √3/2 | √2/2 | 1/2 | 0 | -1 | 0 | 1 |
| tan θ | 0 | √3/3 | 1 | √3 | ∞ | 0 | ∞ | 0 |

💡 **Mẹo nhớ "bàn tay"**: sin của 0°, 30°, 45°, 60°, 90° = √0/2, √1/2, √2/2, √3/2, √4/2. Cos thì đảo ngược thứ tự.

**Verify mẹo "bàn tay" bằng số**: `√0/2 = 0` (sin 0°), `√1/2 = 1/2` (sin 30°), `√2/2 ≈ 0.707` (sin 45°), `√3/2 ≈ 0.866` (sin 60°), `√4/2 = 2/2 = 1` (sin 90°). Tăng dần 0 → 1, khớp trực giác "góc lớn dần thì điểm leo cao dần".

⚠ **Lỗi thường gặp — nhớ lẫn `√3/2` với `√2/2`, hoặc gán nhầm cho 30°/60°**. Quy luật: sin **tăng** theo góc (sin 30° = 1/2 < sin 60° = √3/2), cos **giảm** theo góc (cos 30° = √3/2 > cos 60° = 1/2). Phản ví dụ sai hay gặp: viết `sin 60° = 1/2` — sai, đó là `sin 30°`. Kiểm nhanh: 60° gần 90° nên sin phải gần 1 → chọn √3/2 (≈0.87).

❓ **Câu hỏi tự nhiên của người đọc**

- *"Vì sao `sin 30° = cos 60°` và `sin 60° = cos 30°`?"* Vì 30° và 60° là hai góc **phụ nhau** (cộng lại 90°), mà `sin θ = cos(90°−θ)`. Đây cũng là gốc chữ "co" trong cosine = "complement" (phụ).
- *"Phải học thuộc cả bảng không?"* Nên thuộc cột 30°, 45°, 60° (ba góc lõi); các góc 120°, 135°... suy ra bằng quy tắc dấu + góc bù (mục 6).

🔁 **Dừng lại tự kiểm tra**

1. `cos 45°` bằng mấy? So với `cos 30°` lớn hơn hay nhỏ hơn?
2. `tan 60°` bằng mấy? (gợi ý: sin/cos)

<details><summary>Đáp án</summary>

1. `cos 45° = √2/2 ≈ 0.707`, nhỏ hơn `cos 30° = √3/2 ≈ 0.866` (cos giảm khi góc tăng).
2. `tan 60° = sin60°/cos60° = (√3/2)/(1/2) = √3 ≈ 1.732`.

</details>

### 📝 Tóm tắt mục 2

- Ba góc lõi 30°/45°/60° cho sin = 1/2, √2/2, √3/2 (và cos đảo ngược).
- sin tăng, cos giảm khi góc tăng trong [0°, 90°]; góc phụ → sin = cos đối.
- Mẹo "bàn tay" `√n/2` (n = 0,1,2,3,4) verify được bằng số.

---

## 3. Đồ thị 3 hàm

💡 **Trực giác / Hình dung**: tưởng tượng một điểm chạy quanh đường tròn đơn vị với tốc độ đều. **Bóng của nó chiếu lên trục tung** vẽ ra đồ thị sin (lên–xuống theo hình sóng); **bóng chiếu lên trục hoành** vẽ ra cos. Vì điểm quay vòng lặp lại, hai bóng cũng lặp lại → đồ thị là sóng tuần hoàn. cos chỉ là sin "đi trước" một phần tư vòng.

### 3.1. y = sin x

- **D** = ℝ, **E** = [-1, 1].
- **Chu kỳ**: 2π. sin(x + 2π) = sin x.
- **Lẻ**: sin(-x) = -sin x. Đồ thị đối xứng qua O.
- Đi qua O(0, 0), cực đại tại π/2 (= 1), cực tiểu tại 3π/2 (= -1).

### 3.2. y = cos x

- **D** = ℝ, **E** = [-1, 1].
- **Chu kỳ**: 2π.
- **Chẵn**: cos(-x) = cos x. Đối xứng qua trục Oy.
- Đi qua (0, 1), cực đại tại x = 0, cực tiểu tại π.
- **Liên hệ với sin**: cos x = sin(x + π/2). Cos sớm pha hơn sin π/2.

### 3.3. y = tan x

- **D** = ℝ \\ {π/2 + kπ}, **E** = ℝ.
- **Chu kỳ**: π (ngắn hơn sin/cos!).
- **Lẻ**: tan(-x) = -tan x.
- **Tiệm cận đứng** tại x = π/2 + kπ (nơi cos = 0).

❓ **Vì sao tan chu kỳ π chứ không 2π?** Vì tan = sin/cos. Khi x tăng π, cả sin và cos đổi dấu cùng lúc → tỉ số không đổi.

**Verify chu kỳ tan = π bằng số**: `tan(π/4) = 1`. Cộng π: `tan(π/4 + π) = tan(5π/4)`. Tại 5π/4 (phần tư III), sin = −√2/2, cos = −√2/2 → `tan = (−√2/2)/(−√2/2) = 1` ✓ — bằng đúng `tan(π/4)`, đúng là tuần hoàn chu kỳ π.

⚠ **Lỗi thường gặp — nhầm tính chẵn/lẻ giữa sin và cos**. cos là hàm **chẵn** (`cos(−x) = cos x`), sin là hàm **lẻ** (`sin(−x) = −sin x`). Phản ví dụ: viết `cos(−π/3) = −cos(π/3) = −1/2` là **sai**; đúng là `cos(−π/3) = cos(π/3) = +1/2` (cos không đổi dấu khi đảo góc). Còn `sin(−π/3) = −sin(π/3) = −√3/2` mới đúng.

🔁 **Dừng lại tự kiểm tra**

1. Đồ thị `y = cos x` đạt cực đại (= 1) tại những x nào?
2. Hàm tan có tiệm cận đứng tại đâu trong khoảng `(0, 2π)`?

<details><summary>Đáp án</summary>

1. Tại `x = k·2π` (0, 2π, 4π, −2π, ...) — nơi điểm ở mép phải đường tròn (1, 0).
2. Tại `x = π/2` và `x = 3π/2` (những chỗ `cos x = 0`).

</details>

### 📝 Tóm tắt mục 3

- sin & cos: miền ℝ, giá trị [−1, 1], chu kỳ 2π; tan chu kỳ π, giá trị toàn ℝ.
- cos chẵn (đối xứng Oy), sin & tan lẻ (đối xứng O); `cos x = sin(x + π/2)`.
- tan có tiệm cận đứng tại `x = π/2 + kπ` (chỗ cos = 0).

---

## 4. Biến đổi A·sin(ω·x + φ) — Mô hình sóng

💡 **Trực giác / Hình dung**: bốn tham số là 4 "nút chỉnh" trên sóng sin gốc. **A** kéo sóng cao/thấp (vặn âm lượng). **ω** ép sóng chặt/giãn theo chiều ngang (vặn tần số — nốt cao/thấp). **φ** trượt sóng sang trái/phải (chỉnh thời điểm bắt đầu). **k** nâng/hạ cả sóng lên xuống (dịch mức nền). Hiểu 4 nút này là hiểu mọi tín hiệu hình sin.

```
y = A·sin(ω·x + φ) + k
```

- **A** = biên độ (amplitude). Giá trị max-min của y = 2A.
- **ω** = tần số góc (angular frequency). Càng lớn càng "co lại". Chu kỳ T = 2π/ω.
- **φ** = pha ban đầu. Dịch đồ thị sang trái φ/ω đơn vị.
- **k** = dịch dọc.

**Ví dụ**: y = 3·sin(2x + π/4).
- A = 3 → dao động từ -3 đến 3.
- ω = 2 → chu kỳ T = π (đồ thị "nén" lại).
- φ = π/4 → dịch sang trái π/8.

💡 **Ứng dụng thực tế**:
- **Sóng âm**: tai nghe được 20 Hz – 20 kHz, biểu diễn bằng tổng các sin với ω, φ khác nhau.
- **Điện xoay chiều**: U = U₀·sin(ωt). VN dùng 50 Hz → ω = 100π rad/s.
- **Dao động điều hòa**: con lắc, lò xo (Physics).
- **Tín hiệu**: Fourier — mọi hàm tuần hoàn = tổng sin/cos.

⚠ **Lỗi thường gặp — tính chu kỳ là `T = ω/2π` (lộn ngược)**. Đúng là `T = 2π/ω`. ω càng lớn → sóng càng "nén" → chu kỳ càng **ngắn**. Phản ví dụ: `y = sin(2x)` có ω = 2 → `T = 2π/2 = π` (ngắn hơn sin x); nếu tính nhầm `T = 2/2π = 1/π ≈ 0.318` thì vô lý (không khớp đồ thị thực).

❓ **Câu hỏi tự nhiên của người đọc**

- *"φ dịch sang trái hay phải, và bao nhiêu?"* Viết lại `A·sin(ω(x + φ/ω))` → dịch **sang trái** `φ/ω` đơn vị (khi φ > 0). Vd `sin(2x + π/4)` dịch trái `π/4 / 2 = π/8`.
- *"A âm thì sao?"* `A = −3` thì biên độ vẫn là `|A| = 3`, nhưng sóng bị **lật ngược** (đỉnh thành đáy). Tương đương thêm pha π.

🔁 **Dừng lại tự kiểm tra**

1. `y = 4·sin(πx)` có biên độ và chu kỳ bao nhiêu?
2. Giá trị lớn nhất và nhỏ nhất của `y = 2·sin(x) + 5` là bao nhiêu?

<details><summary>Đáp án</summary>

1. Biên độ A = 4; `ω = π` → `T = 2π/π = 2`.
2. `sin` chạy trong [−1, 1] → `y` chạy từ `2·(−1)+5 = 3` đến `2·1+5 = 7`. Max = 7, min = 3.

</details>

### 📝 Tóm tắt mục 4

- `y = A·sin(ωx + φ) + k`: A = biên độ, ω = tần số góc, φ = pha, k = dịch dọc.
- Chu kỳ `T = 2π/ω` (ω lớn → T ngắn); dịch ngang `φ/ω` (φ>0 → trái).
- Là mô hình của sóng âm, điện AC, dao động điều hòa, Fourier.

---

## 5. Quan hệ tam giác vuông (vẫn đúng)

💡 **Trực giác / Hình dung**: định nghĩa tam giác vuông là **trường hợp riêng** của định nghĩa đường tròn. Đặt huyền = bán kính 1, thì cạnh kề = hoành độ (cos), cạnh đối = tung độ (sin). Tam giác chỉ "phóng to/thu nhỏ" tam giác trong đường tròn đơn vị, nên tỉ số cạnh không đổi → cùng giá trị sin/cos.

Khi 0 < θ < π/2:
```
       │╲
       │ ╲ c (huyền)
   a   │  ╲
       │   ╲ θ
       └────╲
          b
```
- sin θ = a/c (đối/huyền).
- cos θ = b/c (kề/huyền).
- tan θ = a/b (đối/kề).

⟶ **Trùng với định nghĩa qua đường tròn** (vì điểm trên đường tròn đơn vị tạo tam giác vuông).

**Verify trùng khớp bằng số**: tam giác 3-4-5 (a=3 đối, b=4 kề, c=5 huyền). `sin θ = 3/5 = 0.6`, `cos θ = 4/5 = 0.8`. Kiểm Pythagore lượng giác: `0.6² + 0.8² = 0.36 + 0.64 = 1` ✓ — đúng như điểm trên đường tròn đơn vị.

⚠ **Lỗi thường gặp — đảo "đối/kề" của sin và cos**. `sin = đối/huyền` (SOH), `cos = kề/huyền` (CAH), `tan = đối/kề` (TOA). Phản ví dụ: trong tam giác 3-4-5 với θ kề cạnh 4, nếu viết `cos θ = 3/5` là sai (3 là cạnh **đối**, không phải kề) → đúng là `cos θ = 4/5`.

❓ **Câu hỏi tự nhiên của người đọc**

- *"Định nghĩa này dùng được cho góc tù (>90°) không?"* Không — tam giác vuông không có góc >90°. Với góc tù phải quay lại định nghĩa đường tròn. Đó chính là lý do ta cần đường tròn.
- *"SOH-CAH-TOA là gì?"* Mẹo nhớ tiếng Anh: **S**in = **O**pposite/**H**ypotenuse, **C**os = **A**djacent/**H**ypotenuse, **T**an = **O**pposite/**A**djacent.

🔁 **Dừng lại tự kiểm tra**

1. Tam giác vuông có cạnh đối θ = 5, huyền = 13. `sin θ`, `cos θ`?
2. `tan θ` trong tam giác đó?

<details><summary>Đáp án</summary>

1. `sin θ = 5/13`. Cạnh kề = `√(13²−5²) = √144 = 12` → `cos θ = 12/13`.
2. `tan θ = đối/kề = 5/12`.

</details>

### 📝 Tóm tắt mục 5

- SOH-CAH-TOA: sin = đối/huyền, cos = kề/huyền, tan = đối/kề.
- Chỉ dùng cho `0 < θ < π/2`; là trường hợp riêng của định nghĩa đường tròn.
- Khớp Pythagore lượng giác (vd tam giác 3-4-5: `0.6²+0.8²=1`).

---

## 6. Quy luật dấu trên 4 góc phần tư

| Phần tư | I (0-90°) | II (90-180°) | III (180-270°) | IV (270-360°) |
|---------|-----------|---------------|----------------|---------------|
| sin | + | + | − | − |
| cos | + | − | − | + |
| tan | + | − | + | − |

💡 **Mẹo "ASTC"**: All – Sin – Tan – Cos (góc phần tư nào hàm nào DƯƠNG). All Students Take Calculus.

**Verify quy luật dấu bằng số (mỗi phần tư 1 góc)**:
- Phần tư I, 30°: sin = 1/2 (+), cos = √3/2 (+), tan = √3/3 (+) → **All** dương ✓.
- Phần tư II, 120°: sin = √3/2 (+), cos = −1/2 (−), tan = −√3 (−) → chỉ **Sin** dương ✓.
- Phần tư III, 210°: sin = −1/2 (−), cos = −√3/2 (−), tan = √3/3 (+) → chỉ **Tan** dương ✓.
- Phần tư IV, 300°: sin = −√3/2 (−), cos = 1/2 (+), tan = −√3 (−) → chỉ **Cos** dương ✓.

⚠ **Lỗi thường gặp — gán nhầm dấu khi giải `sin x = a` ra hai góc**. Một giá trị sin (vd 1/2) ứng với **hai góc** ở hai phần tư khác nhau (30° ở I và 150° ở II), khác nhau ở dấu của cos. Nếu bài cho thêm điều kiện "góc phần tư III" thì cả sin lẫn cos đều âm — phải chọn đúng dấu, đừng mặc định dương.

❓ **Câu hỏi tự nhiên của người đọc**

- *"Biết `sin x = 0.6` và x ở phần tư II thì `cos x` dấu gì?"* Phần tư II → cos **âm**. `cos x = −√(1−0.36) = −0.8`.
- *"Vì sao tan dương ở cả phần tư I và III?"* Vì tan = sin/cos. Ở I cả hai dương → dương; ở III cả hai âm → âm/âm = dương. Cùng dấu thì thương dương.

🔁 **Dừng lại tự kiểm tra**

1. Góc 200° nằm ở phần tư nào? Dấu của sin, cos, tan?
2. `cos x > 0` và `sin x < 0` thì x ở phần tư nào?

<details><summary>Đáp án</summary>

1. 200° ∈ (180°, 270°) → phần tư **III**: sin −, cos −, tan +.
2. cos + (phải I hoặc IV), sin − (phải III hoặc IV) → giao là phần tư **IV**.

</details>

### 📝 Tóm tắt mục 6

- ASTC: phần tư I tất cả dương, II chỉ sin+, III chỉ tan+, IV chỉ cos+.
- tan dương ở I & III (sin, cos cùng dấu), âm ở II & IV.
- Khi giải PT lượng giác, dùng dấu để chọn đúng nghiệm trong phần tư yêu cầu.

---

## 7. Bài tập

### Bài tập

**Bài 1**: Tính sin(2π/3), cos(2π/3), tan(2π/3).

**Bài 2**: Đồ thị y = 2·sin(3x). Biên độ và chu kỳ?

**Bài 3**: y = sin x + cos x. Biên độ là bao nhiêu? (Gợi ý: dùng công thức A·sin(x+φ).)

**Bài 4**: cos x = -1/2. Tìm x trong [0, 2π].

**Bài 5**: Trong góc phần tư III, sin x = -3/5. Tính cos x, tan x.

### Lời giải

**Bài 1**: 2π/3 = 120°.  
- sin(120°) = sin(180-60) = sin 60° = **√3/2**.  
- cos(120°) = -cos 60° = **-1/2**.  
- tan = sin/cos = **-√3**.

**Bài 2**: A = 2, T = 2π/3.

**Bài 3**: sin x + cos x = √2·sin(x + π/4). Biên độ = **√2**.

**Bài 4**: cos x = -1/2 → x = 2π/3 hoặc x = 4π/3.

**Bài 5**: sin²+cos² = 1 → cos² = 1 - 9/25 = 16/25 → cos = ±4/5. Phần tư III: cos < 0 → cos = **-4/5**. tan = sin/cos = (-3/5)/(-4/5) = **3/4**.

---

## 8. Bài tiếp theo

[Lesson 03 — Đồng nhất thức](../lesson-03-trig-identities/) — công thức cộng, nhân đôi, hạ bậc.

## 📝 Tổng kết

1. **sin, cos, tan** định nghĩa qua đường tròn lượng giác, áp dụng mọi θ ∈ ℝ.
2. **Chu kỳ**: sin & cos = 2π, tan = π.
3. **Bảng giá trị**: 0, π/6, π/4, π/3, π/2 — nhớ thuộc lòng.
4. **A·sin(ω·x + φ)**: mô hình sóng. A = biên độ, ω = tần số, φ = pha.
5. **ASTC**: dấu sin/cos/tan trên 4 góc phần tư.
