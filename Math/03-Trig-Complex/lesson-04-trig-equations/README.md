# Lesson 04 — Phương trình lượng giác

## Mục tiêu

- Giải **PT cơ bản**: sin x = a, cos x = a, tan x = a.
- Áp dụng được nghiệm tổng quát (vô số nghiệm).
- Giải PT bậc 2 theo sin x / cos x.
- Đưa **a·sin x + b·cos x = c** về PT cơ bản.

## Kiến thức tiền đề

- [Lesson 03 — Đồng nhất thức](../lesson-03-trig-identities/).

---

## 1. Phương trình cơ bản sin x = a

💡 **Đặc thù của PT lượng giác**: Vì sin/cos tuần hoàn, một PT có **vô số nghiệm** — phải viết ở dạng tổng quát.

```
sin x = a   (|a| ≤ 1)
```

**Nghiệm tổng quát**: Nếu sin α = a thì:
```
x = α + k·2π   hoặc   x = π - α + k·2π   (k ∈ ℤ)
```

💡 **Vì sao 2 họ nghiệm?** Trên đường tròn đơn vị, có 2 điểm có cùng tung độ a: 1 ở phần tư I/II và 1 ở phần tư III/IV (đối xứng qua trục Oy → góc π - α).

**Ví dụ số**: sin x = 1/2.
- α = π/6 (vì sin π/6 = 1/2).
- x = π/6 + k·2π, hoặc x = π - π/6 + k·2π = 5π/6 + k·2π.

⚠ **Điều kiện**: |a| > 1 → **vô nghiệm**.

> 📐 **Định nghĩa đầy đủ — Nghiệm tổng quát PT sin x = a**
>
> **(a) Là gì**: 1 PT lượng giác có **vô số nghiệm** do tính tuần hoàn. Nghiệm "tổng quát" = toàn bộ tập nghiệm, viết bằng 1 (hoặc 2) công thức kèm số nguyên k ∈ ℤ chạy tự do. Hai họ vì có 2 điểm trên đường tròn cùng tung độ (đối xứng qua trục Oy).
>
> **(b) Vì sao cần**: PT đại số x² = 4 có hữu hạn nghiệm. PT lượng giác KHÔNG — sin tuần hoàn nên nghiệm xuất hiện vô hạn lần. Phải có ký hiệu nén tất cả: "x = α + k·2π, k ∈ ℤ". Trong vật lý: thời điểm dao động đạt giá trị x cụ thể xảy ra lặp đi lặp lại — cần biết tất cả các thời điểm, không chỉ 1.
>
> **(c) Ví dụ số**: sin x = 1/2 → α = π/6. Nghiệm: π/6, 5π/6, π/6+2π, 5π/6+2π, π/6−2π, ... Vô hạn. sin x = √2/2 → α = π/4 → x = π/4 + k·2π hoặc 3π/4 + k·2π. sin x = 1 → α = π/2, 2 họ trùng nhau (vì sin x đạt max chỉ tại 1 điểm/chu kỳ) → x = π/2 + k·2π. sin x = 2 → |a|>1 → **vô nghiệm**.

⚠ **Lỗi thường gặp — chỉ lấy 1 họ nghiệm, quên họ `π − α`**. `sin x = a` (với 0 < |a| < 1) có **hai** họ. Phản ví dụ: giải `sin x = 1/2` mà chỉ ghi `x = π/6 + k2π` là **mất một nửa nghiệm** — góc `5π/6` cũng có `sin = 1/2` nhưng bị bỏ. Luôn nhớ họ thứ hai `x = π − α + k2π`.

⚠ **Lỗi thường gặp 2 — quên `+k·2π`**. Viết `x = π/6` (thiếu `+k2π`) là chỉ nêu 1 nghiệm trong vô hạn nghiệm. PT lượng giác phải ghi nghiệm tổng quát.

❓ **Câu hỏi tự nhiên của người đọc**

- *"Khi nào hai họ nghiệm trùng làm một?"* Khi `a = ±1`. Vd `sin x = 1`: `α = π/2` và `π − π/2 = π/2` — trùng → chỉ 1 họ `x = π/2 + k2π`.
- *"Đề chỉ hỏi nghiệm trong `[0, 2π)` thì sao?"* Vẫn tìm nghiệm tổng quát rồi cho k = 0, 1, ... lấy ra các nghiệm rơi trong khoảng. Vd `sin x = 1/2` trên `[0, 2π)` → `{π/6, 5π/6}`.

🔁 **Dừng lại tự kiểm tra**

1. Giải `sin x = −1/2` (nghiệm tổng quát).
2. `sin x = 1.5` có nghiệm không?

<details><summary>Đáp án</summary>

1. `α = −π/6` (vì sin(−π/6) = −1/2). `x = −π/6 + k2π` hoặc `x = π − (−π/6) + k2π = 7π/6 + k2π`.
2. **Không** — vì `|1.5| > 1` mà `sin` chỉ nhận giá trị trong `[−1, 1]`.

</details>

### 📝 Tóm tắt mục 1

- `sin x = a` cần `|a| ≤ 1`; nghiệm: `x = α + k2π` HOẶC `x = π − α + k2π`.
- Luôn hai họ (trừ khi a = ±1 thì gộp một); đừng quên `+k2π`.
- `|a| > 1` → vô nghiệm.

---

## 2. Phương trình cơ bản cos x = a

💡 **Trực giác / Hình dung**: cắt đường tròn đơn vị bằng một **đường thẳng đứng** `x = a` (vì cos = hoành độ). Đường này cắt đường tròn ở hai điểm **đối xứng qua trục hoành** — một ở trên, một ở dưới, góc `+α` và `−α`. Vì thế nghiệm gọn lại thành `±α + k2π` (một họ với dấu ±), khác sin (hai họ riêng).

```
cos x = a   (|a| ≤ 1)
```

**Nghiệm tổng quát**: Nếu cos α = a thì:
```
x = ±α + k·2π   (k ∈ ℤ)
```

**Ví dụ**: cos x = -√2/2.
- α = 3π/4 (cos 3π/4 = -√2/2).
- x = ±3π/4 + k·2π.

**4 ví dụ số đa dạng**:
- `cos x = 1/2` → α = π/3 → `x = ±π/3 + k2π`.
- `cos x = 0` → α = π/2 → `x = ±π/2 + k2π` (= `π/2 + kπ`).
- `cos x = −1` → α = π → `x = ±π + k2π` = `π + k2π` (hai dấu trùng).
- `cos x = 2` → |a|>1 → **vô nghiệm**.

⚠ **Lỗi thường gặp — viết `cos x = a` thành hai họ kiểu `α` và `π − α` như sin**. Cos dùng `±α`, KHÔNG phải `π − α`. Phản ví dụ: `cos x = 1/2` có nghiệm `π/3` và `−π/3` (≡ `5π/3`), KHÔNG phải `π/3` và `2π/3` (vì `cos(2π/3) = −1/2 ≠ 1/2`).

❓ **Câu hỏi tự nhiên của người đọc**

- *"Vì sao cos dùng `±α` còn sin dùng `α, π−α`?"* Vì cos đối xứng qua trục hoành (Ox), nên hai nghiệm là `+α, −α`. sin đối xứng qua trục tung (Oy), nên hai nghiệm là `α, π−α`. Khác trục đối xứng.
- *"`−α + k2π` có khác `(2π − α) + k2π` không?"* Không khác về tập nghiệm — chỉ là chọn đại diện k khác. `−π/3` và `5π/3` là cùng vị trí.

🔁 **Dừng lại tự kiểm tra**

1. Giải `cos x = √3/2`.
2. `cos x = −1/2` có nghiệm nào trong `[0, 2π)`?

<details><summary>Đáp án</summary>

1. `α = π/6` → `x = ±π/6 + k2π`.
2. `α = 2π/3` → `x = ±2π/3 + k2π`. Trong `[0, 2π)`: `2π/3` và `−2π/3 + 2π = 4π/3`.

</details>

### 📝 Tóm tắt mục 2

- `cos x = a` (|a|≤1): `x = ±α + k2π` (một họ với dấu ±).
- Dùng `±α`, KHÔNG dùng `π−α` (đó là của sin).
- a = ±1 → hai dấu gộp một họ.

---

## 3. Phương trình cơ bản tan x = a

💡 **Trực giác / Hình dung**: tan tuần hoàn chu kỳ **π** (không phải 2π), nên một giá trị tan lặp lại sau mỗi nửa vòng. Trên đường tròn, hai điểm đối tâm (cách nhau π) có cùng tan vì cả sin và cos đều đổi dấu (tỉ số giữ nguyên). Vì thế tan chỉ có **một họ** nghiệm với bước nhảy π, và nhận **mọi** giá trị a ∈ ℝ (không bị chặn |a|≤1 như sin/cos).

```
tan x = a   (mọi a ∈ ℝ)
```

**Nghiệm**:
```
x = α + k·π   (k ∈ ℤ)
```
(chỉ 1 họ, chu kỳ π).

**Ví dụ**: tan x = 1 → x = π/4 + k·π.

**4 ví dụ số đa dạng**:
- `tan x = 0` → α = 0 → `x = kπ`.
- `tan x = √3` → α = π/3 → `x = π/3 + kπ`.
- `tan x = −1` → α = −π/4 → `x = −π/4 + kπ`.
- `tan x = 100` → α = arctan(100) ≈ 1.5608 → `x ≈ 1.5608 + kπ` (tan nhận giá trị lớn tùy ý, gần π/2).

⚠ **Lỗi thường gặp — dùng bước `+k·2π` cho tan**. Tan chu kỳ **π**, nên phải `+kπ`. Phản ví dụ: `tan x = 1` có nghiệm `π/4` và `5π/4` (cách nhau π). Nếu viết `π/4 + k2π` thì bỏ mất `5π/4`. Ngoài ra phải loại `x = π/2 + kπ` (nơi tan không xác định) khỏi miền.

❓ **Câu hỏi tự nhiên của người đọc**

- *"Vì sao tan chỉ một họ mà sin/cos hai họ?"* Vì chu kỳ tan là π, đã "gói" cả hai điểm đối tâm vào một bước nhảy. sin/cos chu kỳ 2π nên trong một chu kỳ có hai nghiệm riêng.
- *"`tan x = a` luôn có nghiệm với mọi a?"* Đúng, vì tan: ℝ → ℝ phủ hết trục số (trừ các điểm gián đoạn). Không có ràng buộc |a| ≤ 1.

🔁 **Dừng lại tự kiểm tra**

1. Giải `tan x = √3/3`.
2. `tan x = −1` có nghiệm nào trong `[0, 2π)`?

<details><summary>Đáp án</summary>

1. `tan(π/6) = √3/3` → `x = π/6 + kπ`.
2. `α = −π/4` → `x = −π/4 + kπ`. Trong `[0, 2π)`: `−π/4 + π = 3π/4` và `−π/4 + 2π = 7π/4`.

</details>

### 📝 Tóm tắt mục 3

- `tan x = a`: một họ `x = α + kπ` (chu kỳ π), với mọi a ∈ ℝ.
- Dùng `+kπ` (KHÔNG +k2π); loại `x = π/2 + kπ` khỏi miền.
- Không có ràng buộc |a| ≤ 1 như sin/cos.

---

## 4. Các trường hợp đặc biệt

💡 **Trực giác / Hình dung**: đây là các giá trị "ở mép" (a = 0, ±1) — nơi hai họ nghiệm gộp lại hoặc rơi đúng trục toạ độ. Thay vì áp công thức tổng quát rồi rút gọn, ta nhớ thẳng các vị trí đặc biệt trên đường tròn: `sin = 0` ở hai đầu trục hoành, `cos = 0` ở hai đầu trục tung...

| PT | Nghiệm |
|----|--------|
| sin x = 0 | x = kπ |
| sin x = 1 | x = π/2 + k·2π |
| sin x = -1 | x = -π/2 + k·2π |
| cos x = 0 | x = π/2 + kπ |
| cos x = 1 | x = k·2π |
| cos x = -1 | x = π + k·2π |
| tan x = 0 | x = kπ |
| tan x = 1 | x = π/4 + kπ |

⚠ **Lỗi thường gặp — nhầm `sin x = 0` (x = kπ) với `cos x = 0` (x = π/2 + kπ)**. Phản ví dụ: tại `x = π/2`, `sin(π/2) = 1 ≠ 0` (nên π/2 KHÔNG là nghiệm của sin x = 0), nhưng `cos(π/2) = 0`. Nhớ: sin = 0 ở **trục hoành** (0, π, 2π...), cos = 0 ở **trục tung** (π/2, 3π/2...).

❓ **Câu hỏi tự nhiên của người đọc**

- *"Vì sao `sin x = 1` chỉ `+k2π` mà `sin x = 0` lại `kπ`?"* Vì `sin = 0` xảy ra **hai lần** mỗi vòng (tại 0 và π) → gộp thành bước π. Còn `sin = 1` chỉ **một lần** mỗi vòng (tại π/2) → bước 2π.
- *"`cos x = 0` viết `±π/2 + k2π` hay `π/2 + kπ`?"* Hai cách cho cùng tập nghiệm; `π/2 + kπ` gọn hơn.

🔁 **Dừng lại tự kiểm tra**

1. Nghiệm của `cos x = 1` là gì?
2. `sin x = −1` có nghiệm nào trong `[0, 2π)`?

<details><summary>Đáp án</summary>

1. `x = k2π` (cos đạt max = 1 chỉ tại mép phải đường tròn).
2. `x = −π/2 + k2π` → trong `[0, 2π)` là `−π/2 + 2π = 3π/2`.

</details>

### 📝 Tóm tắt mục 4

- `sin x = 0`: x = kπ; `cos x = 0`: x = π/2 + kπ (đừng lẫn).
- `sin x = ±1`, `cos x = ±1`: chỉ một họ `+k2π` (max/min đạt một lần/vòng).
- Nhớ theo vị trí trên đường tròn (trục hoành/trục tung) nhanh hơn áp công thức.

---

## 5. PT bậc 2 theo sin / cos

💡 **Trực giác / Hình dung**: nếu trong PT chỉ xuất hiện **một** hàm (toàn sin, hoặc toàn cos), thì coi hàm đó như một ẩn `t` và giải PT bậc 2 đại số quen thuộc. Sau khi ra `t`, mỗi giá trị `t` lại thành một PT lượng giác cơ bản (mục 1-3). Hai tầng: đại số trước, lượng giác sau.

**Ví dụ**: 2·sin²x - sin x - 1 = 0.

Đặt t = sin x (-1 ≤ t ≤ 1):
- 2t² - t - 1 = 0
- t = 1 hoặc t = -1/2.

⟶ Giải tiếp:
- sin x = 1 → x = π/2 + k·2π.
- sin x = -1/2 → x = -π/6 + k·2π hoặc x = π + π/6 + k·2π = 7π/6 + k·2π.

⚠ **Lỗi thường gặp — quên điều kiện `−1 ≤ t ≤ 1` rồi giữ nghiệm t "ảo"**. Vì `t = sin x` (hoặc cos x) bị chặn trong `[−1, 1]`. Phản ví dụ: PT `t² − 3t + 2 = 0` cho `t = 1` và `t = 2`. Nghiệm `t = 2` phải **loại** vì `sin x = 2` vô nghiệm — chỉ giữ `sin x = 1`.

⚠ **Lỗi thường gặp 2 — PT lẫn cả sin và cos bậc 2 mà không quy về một hàm**. Vd `sin²x + cos x = 1` có cả hai. Phải dùng `sin²x = 1 − cos²x` đưa về một ẩn cos trước: `1 − cos²x + cos x = 1` → `cos x − cos²x = 0` → `cos x(1 − cos x) = 0`.

❓ **Câu hỏi tự nhiên của người đọc**

- *"Khi nào đặt ẩn phụ được?"* Khi PT chỉ chứa một hàm lượng giác (hoặc quy được về một hàm nhờ `sin²+cos²=1`). Nếu lẫn `sin x cos x` thì cân nhắc công thức nhân đôi.
- *"Sau khi đặt t, có cần đổi miền k không?"* Không, k vẫn chạy ℤ. Chỉ cần với mỗi t hợp lệ, viết đủ các họ nghiệm của PT cơ bản tương ứng.

🔁 **Dừng lại tự kiểm tra**

1. Giải `2cos²x − 3cos x + 1 = 0`.
2. Trong PT `t² − t − 6 = 0` (với t = sin x), nghiệm nào bị loại?

<details><summary>Đáp án</summary>

1. `t = cos x`: `2t² − 3t + 1 = 0` → `t = 1` hoặc `t = 1/2`. `cos x = 1 → x = k2π`; `cos x = 1/2 → x = ±π/3 + k2π`.
2. `t = 3` hoặc `t = −2`; **cả hai** bị loại (đều ngoài [−1,1]) → PT vô nghiệm.

</details>

### 📝 Tóm tắt mục 5

- Đặt `t = sin x` (hoặc cos x), giải PT bậc 2 đại số, rồi giải PT lượng giác cơ bản.
- Bắt buộc kiểm tra `−1 ≤ t ≤ 1`, loại nghiệm t ngoài khoảng.
- PT lẫn sin & cos: dùng `sin²+cos²=1` quy về một hàm trước.

---

## 6. PT a·sin x + b·cos x = c

💡 **Trực giác / Hình dung**: vế trái là tổng của hai dao động lệch pha — đã biết từ L03 rằng nó gộp lại thành **một** sóng `R sin(x+φ)`. Gộp xong, PT phức tạp biến thành PT cơ bản `sin(x+φ) = c/R`. Cốt lõi: nén hai hàm thành một rồi áp công thức mục 1.

**Cách giải**: dùng công thức tổng hợp ở L03.

```
a·sin x + b·cos x = R·sin(x + φ) = c
```
trong đó R = √(a²+b²), tan φ = b/a.

⟶ Đưa về sin(x + φ) = c/R.

**Điều kiện có nghiệm**: |c/R| ≤ 1 → **c² ≤ a² + b²**.

**Ví dụ**: √3·sin x + cos x = 1.
- R = √(3+1) = 2, tan φ = 1/√3 → φ = π/6.
- 2·sin(x + π/6) = 1 → sin(x + π/6) = 1/2.
- x + π/6 = π/6 + k·2π → x = k·2π.
- x + π/6 = π - π/6 + k·2π = 5π/6 + k·2π → x = 4π/6 + k·2π = 2π/3 + k·2π.

⚠ **Lỗi thường gặp — không kiểm tra điều kiện `c² ≤ a²+b²`**. Sau khi đưa về `sin(x+φ) = c/R`, nếu `|c/R| > 1` thì **vô nghiệm**. Phản ví dụ: `sin x + cos x = 3` có `R = √2 ≈ 1.41`, `c/R = 3/1.41 ≈ 2.12 > 1` → vô nghiệm (tổng `sin x + cos x` không bao giờ vượt √2).

❓ **Câu hỏi tự nhiên của người đọc**

- *"Vì sao điều kiện có nghiệm là `c² ≤ a²+b²`?"* Vì `a sin x + b cos x` có biên độ `R = √(a²+b²)`, tức luôn nằm trong `[−R, R]`. PT `= c` chỉ giải được khi `|c| ≤ R`, tức `c² ≤ a²+b²`.
- *"Có cách nào khác ngoài R·sin(x+φ)?"* Có: chia cả hai vế cho `√(a²+b²)`, hoặc dùng phép thế `t = tan(x/2)` (Weierstrass). Nhưng R·sin(x+φ) trực quan nhất.

🔁 **Dừng lại tự kiểm tra**

1. `3 sin x + 4 cos x = 6` có nghiệm không?
2. `sin x − √3 cos x = 1`: tìm R và đưa về PT cơ bản.

<details><summary>Đáp án</summary>

1. `R = √(9+16) = 5`. `|c|=6 > 5` → **vô nghiệm**.
2. `R = √(1+3) = 2`, viết `2 sin(x − π/3) = 1` (vì hệ số cos âm → φ = −π/3) → `sin(x − π/3) = 1/2`.

</details>

### 📝 Tóm tắt mục 6

- Gộp `a sin x + b cos x = R sin(x+φ)` rồi giải `sin(x+φ) = c/R`.
- Điều kiện có nghiệm: `c² ≤ a²+b²` (tức `|c/R| ≤ 1`).
- Là PT cơ bản mục 1 sau khi nén hai hàm thành một.

---

## 7. PT bằng phương pháp biến tổng thành tích

💡 **Trực giác / Hình dung**: nguyên lý chủ đạo của giải PT là **đưa về tích = 0**, vì khi `A·B = 0` thì `A = 0` HOẶC `B = 0` — tách thành các PT cơ bản. Một **tổng** sin/cos không cho ngay nghiệm, nhưng công thức tổng→tích (L03) biến nó thành tích. Đây là lý do ta học tổng→tích.

**Ví dụ**: sin x + sin 3x = 0.

Biến tổng thành tích: sin x + sin 3x = 2·sin(2x)·cos(x).

⟶ 2·sin 2x·cos x = 0 → sin 2x = 0 hoặc cos x = 0.
- sin 2x = 0 → 2x = kπ → x = kπ/2.
- cos x = 0 → x = π/2 + kπ.

Kết hợp: x = kπ/2 (đã bao gồm cả).

⚠ **Lỗi thường gặp — chuyển vế sai trước khi biến đổi**. Để dùng tổng→tích cần đưa PT về dạng `(tổng) = 0` hoặc `(hiệu) = 0`. Phản ví dụ: `sin 3x = sin x` phải chuyển thành `sin 3x − sin x = 0` rồi mới dùng `sin a − sin b = 2 cos(...) sin(...)`. Nếu để nguyên `sin 3x = sin x` rồi "rút" sin hai vế là **sai** (mất nghiệm, và sin không "rút" được như số).

❓ **Câu hỏi tự nhiên của người đọc**

- *"`sin A = sin B` giải thế nào nhanh?"* Dùng tính chất: `sin A = sin B ⟺ A = B + k2π` HOẶC `A = π − B + k2π`. Tương đương với chuyển vế rồi tổng→tích.
- *"Vì sao đôi khi hai họ nghiệm gộp lại được?"* Vì một họ có thể là tập con của họ kia. Vd `x = kπ/2` đã chứa cả `x = π/2 + kπ`. Nên kiểm tra trùng lặp khi gộp.

🔁 **Dừng lại tự kiểm tra**

1. Giải `cos 3x = cos x` (gợi ý: chuyển vế, dùng cos a − cos b).
2. `sin 2x + sin x = 0` cho ra những PT cơ bản nào?

<details><summary>Đáp án</summary>

1. `cos3x − cosx = 0` → `−2 sin2x sinx = 0` → `sin 2x = 0` (x = kπ/2) HOẶC `sin x = 0` (x = kπ, đã nằm trong kπ/2). Nghiệm: `x = kπ/2`.
2. `sin2x + sinx = 2 sin(3x/2) cos(x/2) = 0` → `sin(3x/2) = 0` HOẶC `cos(x/2) = 0`.

</details>

### 📝 Tóm tắt mục 7

- Đưa PT về **tích = 0** rồi tách thành các PT cơ bản.
- Chuyển hết về một vế trước khi dùng tổng→tích (đừng "rút" sin/cos hai vế).
- `sin A = sin B ⟺ A = B + k2π` hoặc `A = π − B + k2π`; kiểm tra trùng họ khi gộp.

---

## 8. Bài tập

### Bài tập

**Bài 1**: Giải sin x = √2/2.

**Bài 2**: Giải 2·cos²x + cos x - 1 = 0.

**Bài 3**: Giải sin x + √3·cos x = 1.

**Bài 4**: Giải tan x = -1.

**Bài 5**: Giải sin 2x = sin x.

### Lời giải

**Bài 1**: sin x = √2/2 = sin(π/4). x = π/4 + k·2π hoặc x = π - π/4 + k·2π = 3π/4 + k·2π.

**Bài 2**: Đặt t = cos x. 2t² + t - 1 = 0 → t = 1/2 hoặc t = -1.  
- cos x = 1/2 → x = ±π/3 + k·2π.  
- cos x = -1 → x = π + k·2π.

**Bài 3**: R = 2, φ = π/3. 2·sin(x + π/3) = 1 → sin(x + π/3) = 1/2.  
- x + π/3 = π/6 + k·2π → x = -π/6 + k·2π.  
- x + π/3 = 5π/6 + k·2π → x = π/2 + k·2π.

**Bài 4**: tan x = -1 = tan(-π/4). x = -π/4 + kπ.

**Bài 5**: sin 2x - sin x = 0 → 2·cos(3x/2)·sin(x/2) = 0.  
- cos(3x/2) = 0 → 3x/2 = π/2 + kπ → x = π/3 + 2kπ/3.  
- sin(x/2) = 0 → x = 2kπ.

---

## 9. Bài tiếp theo

[Lesson 05 — Số phức](../lesson-05-complex-numbers/) — i, dạng đại số, ý nghĩa.

## 📝 Tổng kết

1. **sin x = a**: x = α + k·2π hoặc π-α + k·2π.
2. **cos x = a**: x = ±α + k·2π.
3. **tan x = a**: x = α + kπ.
4. **Bậc 2 theo sin/cos**: đặt ẩn phụ.
5. **a·sin x + b·cos x = c**: dùng R·sin(x+φ). Có nghiệm khi c² ≤ a²+b².
