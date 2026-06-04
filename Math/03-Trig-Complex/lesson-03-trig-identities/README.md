# Lesson 03 — Đồng nhất thức lượng giác

## Mục tiêu

- Thuộc và áp dụng được các công thức **cộng, trừ, nhân đôi, hạ bậc**.
- Biến đổi tích thành tổng và ngược lại.
- Biến **a·sin x + b·cos x** thành dạng **R·sin(x + φ)**.

## Kiến thức tiền đề

- [Lesson 02 — sin, cos, tan](../lesson-02-sin-cos-tan/).

---

## 1. Đồng nhất thức cơ bản

💡 **Trực giác / Hình dung**: các đồng nhất thức cơ bản chỉ là "đọc lại" hình ảnh điểm chạy trên đường tròn đơn vị. `sin²+cos²=1` = định lý Pythagore cho bán kính 1. Tính chẵn/lẻ = soi gương qua trục. Tính tuần hoàn = đi hết một vòng thì lặp lại. Không cần học thuộc rời rạc — tất cả suy từ một bức tranh.

### 1.1. Pythagore lượng giác

```
sin²x + cos²x = 1
```

Suy ra:
- 1 + tan²x = 1/cos²x (chia 2 vế cho cos²x).
- 1 + cot²x = 1/sin²x.

💡 **Vì sao đúng?** Vì điểm (cos x, sin x) nằm trên đường tròn bán kính 1, theo Pythagore khoảng cách² = 1.

### 1.2. Tính chẵn lẻ

- sin(-x) = -sin x (lẻ).
- cos(-x) = cos x (chẵn).
- tan(-x) = -tan x (lẻ).

### 1.3. Tính tuần hoàn

- sin(x + 2π) = sin x.
- cos(x + 2π) = cos x.
- tan(x + π) = tan x.

### 1.4. Quan hệ bù, phụ

- sin(π - x) = sin x. (góc bù → sin bằng nhau)
- cos(π - x) = -cos x.
- sin(π/2 - x) = cos x. (góc phụ → sin = cos đối)
- cos(π/2 - x) = sin x.

**Verify `1 + tan²x = 1/cos²x` bằng số**: lấy x = π/3. `tan(π/3) = √3` → vế trái `1 + (√3)² = 1 + 3 = 4`. `cos(π/3) = 1/2` → vế phải `1/(1/2)² = 1/(1/4) = 4` ✓. Khớp.

⚠ **Lỗi thường gặp — viết `sin²x` thành `sin x²`**. `sin²x` nghĩa là `(sin x)²` (bình phương kết quả), KHÁC `sin(x²)` (sin của x bình phương). Phản ví dụ tại x = π/2: `sin²(π/2) = 1² = 1`, còn `sin((π/2)²) = sin(2.467) ≈ 0.624`. Khác hẳn.

❓ **Câu hỏi tự nhiên của người đọc**

- *"`góc bù` và `góc phụ` khác nhau ra sao?"* **Bù** = cộng lại bằng π (180°), liên quan `sin(π−x)=sin x`. **Phụ** = cộng lại bằng π/2 (90°), liên quan `sin(π/2−x)=cos x`. Đừng lẫn hai cái.
- *"`cos(π−x) = −cos x` có dấu trừ, vì sao sin thì không?"* Vì góc π−x đối xứng với x qua **trục tung**: tung độ (sin) giữ nguyên, hoành độ (cos) đổi dấu. Hình học quyết định dấu.

🔁 **Dừng lại tự kiểm tra**

1. Cho `sin x = 0.6`. Tính `cos²x` rồi `cos x` (giả sử x phần tư I).
2. `sin(π − π/6)` bằng mấy?

<details><summary>Đáp án</summary>

1. `cos²x = 1 − sin²x = 1 − 0.36 = 0.64` → `cos x = 0.8` (phần tư I → dương).
2. `sin(π − π/6) = sin(π/6) = 1/2` (góc bù, sin bằng nhau).

</details>

### 📝 Tóm tắt mục 1

- `sin²+cos²=1` (Pythagore); chia ra `1+tan²=1/cos²`, `1+cot²=1/sin²`.
- Chẵn/lẻ: cos chẵn, sin & tan lẻ. Tuần hoàn: sin/cos chu kỳ 2π, tan chu kỳ π.
- Góc bù (tổng π): sin giữ, cos đổi dấu. Góc phụ (tổng π/2): sin ↔ cos.

---

## 2. Công thức cộng (Sum formulas)

```
sin(a + b) = sin a · cos b + cos a · sin b
sin(a - b) = sin a · cos b - cos a · sin b
cos(a + b) = cos a · cos b - sin a · sin b
cos(a - b) = cos a · cos b + sin a · sin b
tan(a + b) = (tan a + tan b) / (1 - tan a · tan b)
```

💡 **Mẹo nhớ sin**: "sin cùng cos chéo cộng" (sa.cb + ca.sb), với cos thì "cos cùng trừ sin chéo".

**Ví dụ số**: tính sin 75°.
- 75 = 45 + 30.
- sin 75° = sin 45·cos 30 + cos 45·sin 30 = (√2/2)·(√3/2) + (√2/2)·(1/2) = √6/4 + √2/4 = **(√6+√2)/4**.

> 📐 **Định nghĩa đầy đủ — Công thức cộng**
>
> **(a) Là gì**: 5 đồng nhất thức biểu diễn sin/cos/tan của (a+b) qua sin/cos/tan của a và b riêng. KHÔNG đơn giản như sin(a+b) = sin a + sin b (= SAI) — phải có "cross terms".
>
> **(b) Vì sao cần**: Vì cho phép tính sin/cos của góc bất kỳ qua các góc đã biết (30°, 45°, 60°...). Đây là nền tảng để **suy ra mọi công thức** lượng giác khác: nhân đôi (cho b = a), hạ bậc, biến tích thành tổng, v.v. Trong vật lý: cộng 2 dao động cùng tần số → 1 dao động kết quả (giao thoa sóng). Trong đồ hoạ: nối 2 phép quay = 1 phép quay với góc tổng.
>
> **(c) Ví dụ số**: sin 75° = sin(45+30) = (√2/2)(√3/2) + (√2/2)(1/2) = (√6+√2)/4 ≈ **0.9659**. Kiểm tra máy tính sin 75° ≈ 0.9659 ✓. cos 75° = cos 45·cos 30 − sin 45·sin 30 = (√2/2)(√3/2) − (√2/2)(1/2) = (√6−√2)/4 ≈ 0.2588. cos(60°−30°) = cos 30° = √3/2 ≈ 0.866. Verify: cos 60·cos 30 + sin 60·sin 30 = (1/2)(√3/2) + (√3/2)(1/2) = √3/4 + √3/4 = √3/2 ✓.

⚠ **Lỗi thường gặp — số 1 trong trig: `sin(a+b) ≠ sin a + sin b`**. Phản ví dụ bằng số: `sin(30°+60°) = sin 90° = 1`, nhưng `sin 30° + sin 60° = 1/2 + √3/2 ≈ 1.366`. `1 ≠ 1.366`. Phải dùng công thức cộng đầy đủ với "cross terms". Tương tự `cos(a+b) ≠ cos a + cos b`.

⚠ **Lỗi thường gặp 2 — quên dấu của cos: vế phải là TRỪ**. `cos(a+b) = cos a·cos b − sin a·sin b` (dấu **trừ**), ngược dấu với sin. Mẹo: "cos đổi dấu, sin giữ dấu". Phản ví dụ nếu nhầm dấu cộng: `cos 90° = cos(60+30)` lẽ ra = 0, nếu dùng dấu + ra `(1/2)(√3/2)+(√3/2)(1/2)=√3/2 ≠ 0` → sai; dùng dấu − ra `√3/4 − √3/4 = 0` ✓.

❓ **Câu hỏi tự nhiên của người đọc**

- *"Cần thuộc cả 5 công thức không?"* Thuộc kỹ sin(a+b) và cos(a+b). Bốn cái còn lại suy ra: thay b→−b (dùng chẵn/lẻ) cho dạng "trừ", và tan = sin/cos cho tan.
- *"Vì sao tan(a+b) lại có mẫu `1 − tan a·tan b`?"* Vì chia `sin(a+b)/cos(a+b)` rồi chia tử & mẫu cho `cos a·cos b`. Mẫu thành `1 − tan a tan b`. Nó **không xác định** khi `tan a·tan b = 1` (vd a = b = 45°, vì a+b = 90°).

🔁 **Dừng lại tự kiểm tra**

1. Dùng công thức cộng tính `sin 15°` (gợi ý: 45° − 30°).
2. `cos(x + π/2)` rút gọn bằng gì?

<details><summary>Đáp án</summary>

1. `sin 15° = sin(45−30) = sin45 cos30 − cos45 sin30 = (√2/2)(√3/2) − (√2/2)(1/2) = (√6−√2)/4 ≈ 0.2588`.
2. `cos x cos(π/2) − sin x sin(π/2) = cos x·0 − sin x·1 = −sin x`.

</details>

### 📝 Tóm tắt mục 2

- `sin(a±b) = sin a cos b ± cos a sin b`; `cos(a±b) = cos a cos b ∓ sin a sin b`.
- cos đổi dấu (∓), sin giữ dấu (±); tuyệt đối `sin(a+b) ≠ sin a + sin b`.
- Là gốc suy ra mọi công thức nhân đôi, hạ bậc, tích↔tổng.

---

## 3. Công thức nhân đôi

💡 **Trực giác / Hình dung**: nhân đôi không phải công thức mới — chỉ là công thức cộng với `b = a`. "Cộng góc a với chính nó". Nhớ được công thức cộng là tự suy ra được nhân đôi, không cần học riêng.

Thay b = a vào công thức cộng:

```
sin 2a = 2·sin a · cos a
cos 2a = cos²a - sin²a = 2·cos²a - 1 = 1 - 2·sin²a
tan 2a = 2·tan a / (1 - tan²a)
```

**Chứng minh từng bước `cos 2a` có 3 dạng**:
- Dạng gốc: `cos 2a = cos(a+a) = cos a·cos a − sin a·sin a = cos²a − sin²a`.
- Thay `sin²a = 1 − cos²a`: `cos²a − (1 − cos²a) = 2cos²a − 1`.
- Thay `cos²a = 1 − sin²a`: `(1 − sin²a) − sin²a = 1 − 2sin²a`.

**Ví dụ**: sin 60° = sin(2·30°) = 2·sin 30°·cos 30° = 2·(1/2)·(√3/2) = √3/2 ✓.

**4 ví dụ số verify**:
- `cos 60° = cos(2·30°) = 1 − 2sin²30° = 1 − 2·(1/4) = 1/2` ✓.
- `cos 90° = cos(2·45°) = 1 − 2sin²45° = 1 − 2·(1/2) = 0` ✓.
- `sin 90° = 2 sin45 cos45 = 2·(√2/2)·(√2/2) = 2·(1/2) = 1` ✓.
- `tan 60° = tan(2·30°) = 2 tan30/(1−tan²30) = 2·(1/√3)/(1−1/3) = (2/√3)/(2/3) = 3/√3 = √3` ✓.

⚠ **Lỗi thường gặp — viết `sin 2a = 2 sin a`**. Sai. `sin 2a = 2 sin a cos a` (có thêm cos a). Phản ví dụ tại a = 30°: `sin 60° = √3/2 ≈ 0.866`, còn `2 sin 30° = 2·(1/2) = 1`. Khác. Tương tự `cos 2a ≠ 2 cos a`.

❓ **Câu hỏi tự nhiên của người đọc**

- *"Vì sao `cos 2a` có tới 3 dạng?"* Vì dùng `sin²+cos²=1` để thay qua lại. Mỗi dạng tiện cho một mục đích: dạng `1 − 2sin²a` để khử sin, dạng `2cos²a − 1` để khử cos (rất hữu ích khi hạ bậc, mục 4).
- *"Có công thức nhân ba không?"* Có: `sin 3a = 3 sin a − 4 sin³a`, `cos 3a = 4 cos³a − 3 cos a` (suy từ De Moivre, học ở Lesson 07).

🔁 **Dừng lại tự kiểm tra**

1. Cho `sin a = 3/5`, a phần tư I. Tính `sin 2a`.
2. Cho `cos a = 0.6`. Tính `cos 2a` (dùng dạng tiện nhất).

<details><summary>Đáp án</summary>

1. `cos a = 4/5` (phần tư I). `sin 2a = 2·(3/5)·(4/5) = 24/25 = 0.96`.
2. Dùng `cos 2a = 2cos²a − 1 = 2·0.36 − 1 = 0.72 − 1 = −0.28`.

</details>

### 📝 Tóm tắt mục 3

- `sin 2a = 2 sin a cos a`; `cos 2a` có 3 dạng (`cos²−sin²`, `2cos²−1`, `1−2sin²`).
- Tất cả là công thức cộng với b = a — không cần học riêng.
- Cảnh báo: `sin 2a ≠ 2 sin a`.

---

## 4. Công thức hạ bậc

💡 **Trực giác / Hình dung**: "hạ bậc" = biến **bình phương** (sin²a, bậc 2, khó tích phân) thành **bậc nhất** của góc gấp đôi (cos 2a). Đổi độ khó: thay vì bình phương rối, ta có một cos đơn giản. Đây là "đảo ngược" công thức nhân đôi của cos.

Đảo lại từ cos 2a:
```
sin²a = (1 - cos 2a) / 2
cos²a = (1 + cos 2a) / 2
tan²a = (1 - cos 2a) / (1 + cos 2a)
```

**Chứng minh từng bước `sin²a = (1 − cos 2a)/2`**: từ `cos 2a = 1 − 2sin²a`, chuyển vế: `2sin²a = 1 − cos 2a` → chia 2 → `sin²a = (1 − cos 2a)/2`. Xong, không bước nào bỏ qua.

⟶ **Cực hữu ích** khi tích phân (tránh bình phương).

**Ví dụ**: ∫ sin²x dx = ∫ (1 - cos 2x)/2 dx = x/2 - sin(2x)/4 + C.

**Verify bằng số tại a = π/6 (30°)**: `sin²30° = (1/2)² = 1/4`. Theo công thức: `(1 − cos 60°)/2 = (1 − 1/2)/2 = (1/2)/2 = 1/4` ✓. Và `cos²30° = (√3/2)² = 3/4`; công thức: `(1 + cos 60°)/2 = (1 + 1/2)/2 = (3/2)/2 = 3/4` ✓.

⚠ **Lỗi thường gặp — lẫn dấu giữa sin² và cos²**. `sin²` đi với dấu **trừ** (`1 − cos 2a`), `cos²` đi với dấu **cộng** (`1 + cos 2a`). Mẹo: cos là "co-dương" → dấu cộng. Phản ví dụ nếu đảo dấu: tính `cos²0 = 1` nhưng dùng nhầm `(1−cos0)/2 = 0` → sai; đúng phải `(1+cos0)/2 = 1` ✓.

❓ **Câu hỏi tự nhiên của người đọc**

- *"Vì sao tích phân `sin²x` lại cần hạ bậc?"* Vì `∫sin²x dx` không có nguyên hàm sơ cấp ở dạng `sin²`. Hạ bậc biến nó thành `∫(1−cos2x)/2 dx` — chỉ còn tích phân hằng và cos, dễ.
- *"Giá trị trung bình của `sin²x` trên một chu kỳ là bao nhiêu?"* Đúng **1/2** (vì cos 2x trung bình bằng 0). Đây là gốc của "giá trị hiệu dụng" trong điện AC.

🔁 **Dừng lại tự kiểm tra**

1. Viết `cos²x` theo cos 2x rồi tính tại x = π/4.
2. Tính `∫ cos²x dx`.

<details><summary>Đáp án</summary>

1. `cos²x = (1+cos2x)/2`. Tại π/4: `(1 + cos(π/2))/2 = (1+0)/2 = 1/2` (= `(√2/2)²` ✓).
2. `∫(1+cos2x)/2 dx = x/2 + sin(2x)/4 + C`.

</details>

### 📝 Tóm tắt mục 4

- `sin²a = (1−cos2a)/2`, `cos²a = (1+cos2a)/2` — đảo từ nhân đôi của cos.
- sin² đi dấu trừ, cos² đi dấu cộng (đừng lẫn).
- Dùng chủ yếu để **tích phân** bình phương sin/cos.

---

## 5. Biến tích thành tổng

💡 **Trực giác / Hình dung**: **tích** của hai hàm lượng giác rất khó tích phân; **tổng** thì dễ (mỗi hạng tử là một sin/cos riêng). Các công thức này là cây cầu biến phép nhân rối thành phép cộng gọn — y hệt vai trò của logarit ("nhân → cộng") nhưng cho lượng giác.

```
sin a · cos b = ½[sin(a+b) + sin(a-b)]
cos a · cos b = ½[cos(a-b) + cos(a+b)]
sin a · sin b = ½[cos(a-b) - cos(a+b)]
```

**Chứng minh từng bước `sin a cos b = ½[sin(a+b)+sin(a−b)]`**: cộng hai công thức cộng: `sin(a+b) = sin a cos b + cos a sin b` và `sin(a−b) = sin a cos b − cos a sin b`. Cộng lại: `sin(a+b)+sin(a−b) = 2 sin a cos b` (các hạng tử `cos a sin b` triệt tiêu). Chia 2 → đpcm.

**Verify bằng số (a = 60°, b = 30°)**: vế trái `sin60·cos30 = (√3/2)(√3/2) = 3/4`. Vế phải `½[sin90 + sin30] = ½[1 + 1/2] = ½·(3/2) = 3/4` ✓.

⟶ Dùng để **tích phân** sản phẩm sin/cos, hoặc giải PT.

⚠ **Lỗi thường gặp — lẫn thứ tự dấu trong `sin a sin b`**. Công thức là `½[cos(a−b) − cos(a+b)]` — `cos(a−b)` đứng trước với dấu **cộng**, `cos(a+b)` sau với dấu **trừ**. Phản ví dụ a=b=30°: `sin30·sin30 = 1/4`; đúng `½[cos0 − cos60] = ½[1 − 1/2] = 1/4` ✓; nếu đảo dấu `½[cos60 − cos0] = ½[1/2 − 1] = −1/4` < 0 → vô lý vì sin²≥0.

❓ **Câu hỏi tự nhiên của người đọc**

- *"Khi nào dùng tích→tổng thay vì hạ bậc?"* Hạ bậc cho `sin²`, `cos²` (cùng góc). Tích→tổng cho tích **hai góc khác nhau** như `sin 3x cos x`. Khác mục đích.
- *"Có gì liên hệ với hiện tượng 'beat' trong âm thanh?"* Có. Hai âm tần số gần nhau nhân/cộng lại tạo dao động biên độ chậm (beat) — chính là công thức tích↔tổng (mục 6).

🔁 **Dừng lại tự kiểm tra**

1. Viết `2 sin 5x cos 3x` thành tổng.
2. `cos x cos 2x` bằng tổng nào?

<details><summary>Đáp án</summary>

1. `2 sin5x cos3x = sin(5x+3x) + sin(5x−3x) = sin 8x + sin 2x`.
2. `cos x cos 2x = ½[cos(x−2x) + cos(x+2x)] = ½[cos x + cos 3x]` (dùng cos(−x)=cos x).

</details>

### 📝 Tóm tắt mục 5

- Tích hai hàm lượng giác → tổng/hiệu (giống log biến nhân thành cộng).
- `sin a sin b = ½[cos(a−b) − cos(a+b)]` (chú ý thứ tự dấu).
- Dùng để tích phân tích hai góc khác nhau và giải PT.

---

## 6. Biến tổng thành tích

💡 **Trực giác / Hình dung**: chiều ngược của mục 5. Khi giải phương trình, ta muốn đưa về **tích = 0** (vì khi đó từng thừa số bằng 0 cho ngay nghiệm). Một **tổng** sin/cos khó cho ra nghiệm, nhưng nếu biến thành **tích** thì giải được tức thì. Đây là vũ khí chính cho Lesson 04.

```
sin a + sin b = 2·sin((a+b)/2)·cos((a-b)/2)
sin a - sin b = 2·cos((a+b)/2)·sin((a-b)/2)
cos a + cos b = 2·cos((a+b)/2)·cos((a-b)/2)
cos a - cos b = -2·sin((a+b)/2)·sin((a-b)/2)
```

**Verify `sin a + sin b` bằng số (a = 90°, b = 30°)**: vế trái `sin90 + sin30 = 1 + 1/2 = 3/2`. Vế phải `2·sin((90+30)/2)·cos((90−30)/2) = 2·sin60·cos30 = 2·(√3/2)·(√3/2) = 2·(3/4) = 3/2` ✓.

⟶ Dùng để **giải PT** (đưa về dạng tích = 0).

⚠ **Lỗi thường gặp — quên dấu trừ ở `cos a − cos b`**. Công thức này có dấu **âm** đứng đầu: `cos a − cos b = −2 sin(...)·sin(...)`. Phản ví dụ a = 60°, b = 0°: `cos60 − cos0 = 1/2 − 1 = −1/2`; đúng `−2·sin30·sin30 = −2·(1/2)(1/2) = −1/2` ✓; nếu quên dấu trừ ra `+1/2` → sai dấu.

❓ **Câu hỏi tự nhiên của người đọc**

- *"Vì sao công thức có `(a+b)/2` và `(a−b)/2`?"* Vì đặt `p = (a+b)/2`, `q = (a−b)/2` thì `a = p+q`, `b = p−q`. Khai triển `sin(p+q) + sin(p−q)` cho ra `2 sin p cos q` — chính là công thức.
- *"Dùng để giải PT thế nào?"* Vd `sin 3x + sin x = 0` → `2 sin 2x cos x = 0` → `sin 2x = 0` HOẶC `cos x = 0`. Tích bằng 0 tách thành hai PT cơ bản.

🔁 **Dừng lại tự kiểm tra**

1. Viết `cos 5x + cos x` thành tích.
2. `sin 4x − sin 2x` bằng tích nào?

<details><summary>Đáp án</summary>

1. `cos5x + cosx = 2 cos((5x+x)/2) cos((5x−x)/2) = 2 cos 3x cos 2x`.
2. `sin4x − sin2x = 2 cos((4x+2x)/2) sin((4x−2x)/2) = 2 cos 3x sin x`.

</details>

### 📝 Tóm tắt mục 6

- Tổng/hiệu sin/cos → tích (dùng nửa-tổng và nửa-hiệu góc).
- `cos a − cos b = −2 sin(...) sin(...)` có dấu trừ đầu.
- Công cụ chính để đưa PT lượng giác về dạng **tích = 0**.

---

## 7. a·sin x + b·cos x = R·sin(x + φ)

**Quan trọng cho dao động, sóng**.

```
a·sin x + b·cos x = R·sin(x + φ)
```
trong đó:
- R = √(a² + b²) (biên độ tổng hợp).
- tan φ = b/a (pha).

💡 **Trực giác**: 2 dao động cùng tần số (sin x và cos x = sin(x + π/2)) cộng lại = 1 dao động cùng tần số, biên độ R, pha φ.

**Ví dụ**: 3·sin x + 4·cos x = R·sin(x + φ).
- R = √(9 + 16) = 5.
- tan φ = 4/3 → φ ≈ 53.13° ≈ 0.927 rad.
- → 5·sin(x + 0.927).

⟶ **Biên độ thay đổi từ ban đầu 3 hoặc 4 lên 5**.

**Chứng minh từng bước công thức tổng hợp**: khai triển vế phải `R sin(x+φ) = R(sin x cos φ + cos x sin φ) = (R cos φ) sin x + (R sin φ) cos x`. Đối chiếu với `a sin x + b cos x`: cần `R cos φ = a` và `R sin φ = b`. Bình phương cộng lại: `R²(cos²φ + sin²φ) = a² + b²` → `R = √(a²+b²)`. Chia: `tan φ = (R sin φ)/(R cos φ) = b/a`. Xong.

⚠ **Lỗi thường gặp — biên độ tổng hợp KHÔNG phải `a + b`**. Là `√(a²+b²)`. Phản ví dụ: `3 sin x + 4 cos x` có biên độ `√(9+16) = 5`, KHÔNG phải `3+4 = 7`. (Tại x cụ thể không bao giờ vượt 5.) Lý do: sin x và cos x lệch pha 90°, cộng theo kiểu Pythagore chứ không cộng thẳng.

❓ **Câu hỏi tự nhiên của người đọc**

- *"Khi xác định φ từ `tan φ = b/a`, có nguy cơ sai phần tư không?"* Có. `tan φ = b/a` cho hai φ cách nhau π. Phải dùng dấu của `a = R cos φ` và `b = R sin φ` để chọn đúng phần tư của φ (giống `atan2`).
- *"Có viết được dạng `R cos(x − ψ)` không?"* Được. `a sin x + b cos x` cũng = `R cos(x − ψ)` với `R` y hệt và `tan ψ = a/b`. Hai cách tương đương, chọn cái tiện.

🔁 **Dừng lại tự kiểm tra**

1. Biên độ của `5 sin x + 12 cos x` là bao nhiêu?
2. Đưa `sin x + cos x` về dạng `R sin(x+φ)`.

<details><summary>Đáp án</summary>

1. `R = √(5²+12²) = √169 = 13`.
2. `R = √(1+1) = √2`, `tan φ = 1/1 = 1` → `φ = π/4`. Vậy `√2 sin(x + π/4)`.

</details>

### 📝 Tóm tắt mục 7

- `a sin x + b cos x = R sin(x+φ)` với `R = √(a²+b²)`, `tan φ = b/a`.
- Biên độ tổng hợp = √(a²+b²), KHÔNG phải a+b.
- Là cách tổng hợp hai dao động cùng tần số thành một; nền cho giải PT (L04).

---

## 8. Bài tập

### Bài tập

**Bài 1**: Tính cos 75° dùng công thức cộng.

**Bài 2**: Đơn giản (sin x + cos x)².

**Bài 3**: Biểu diễn cos 2x theo sin x, theo cos x.

**Bài 4**: Tính ∫₀^π sin²x dx.

**Bài 5**: Biến đổi √3·sin x + cos x sang dạng R·sin(x + φ).

### Lời giải

**Bài 1**: cos 75° = cos(45+30) = cos 45·cos 30 - sin 45·sin 30 = (√2/2)(√3/2) - (√2/2)(1/2) = **(√6 - √2)/4**.

**Bài 2**: (sin x + cos x)² = sin²x + 2·sin x·cos x + cos²x = **1 + sin 2x**.

**Bài 3**:  
- cos 2x = 1 - 2sin²x.  
- cos 2x = 2cos²x - 1.

**Bài 4**: ∫₀^π sin²x dx = ∫₀^π (1 - cos 2x)/2 dx = [x/2 - sin(2x)/4]₀^π = π/2 - 0 - 0 + 0 = **π/2**.

**Bài 5**: R = √(3 + 1) = **2**. tan φ = 1/√3 → φ = π/6. → **2·sin(x + π/6)**.

---

## 9. Bài tiếp theo

[Lesson 04 — Phương trình lượng giác](../lesson-04-trig-equations/).

## 📝 Tổng kết

1. **sin²+cos² = 1**, công thức cộng, nhân đôi, hạ bậc.
2. **Hạ bậc**: sin²x = (1-cos 2x)/2, cos²x = (1+cos 2x)/2 — dùng để tích phân.
3. **Tích ↔ tổng**: cho giải PT.
4. **a·sin x + b·cos x = √(a²+b²)·sin(x + φ)** — tổng hợp dao động.
