# Lesson 07 — Công thức De Moivre & căn bậc n

## Mục tiêu

- Hiểu **công thức De Moivre**: (cos θ + i·sin θ)^n = cos nθ + i·sin nθ.
- Tính lũy thừa số phức nhanh.
- Tìm **n căn bậc n của 1** và của số phức bất kỳ.
- Hình dung n căn = n đỉnh đa giác đều nội tiếp đường tròn.

## Kiến thức tiền đề

- [Lesson 06 — Euler](../lesson-06-complex-polar-euler/).

---

## 1. Công thức De Moivre

💡 **Trực giác / Hình dung**: nâng số phức (mô-đun 1) lên lũy thừa n = **quay n lần liên tiếp**. Mỗi lần nhân cộng thêm góc θ → sau n lần góc thành nθ. Đó là toàn bộ ý tưởng: lũy thừa = quay nhiều lần = nhân góc.

```
(cos θ + i·sin θ)^n = cos(nθ) + i·sin(nθ)
```

💡 **Dùng Euler**: (e^(iθ))^n = e^(inθ). Đó là tất cả!

⟶ **Lũy thừa số phức dạng cực**:
```
(r·e^(iθ))^n = r^n · e^(inθ)
```

**Ví dụ**: Tính (1+i)^10.
- 1+i = √2·e^(iπ/4).
- (1+i)^10 = (√2)^10·e^(i·10π/4) = 32·e^(i·5π/2) = 32·e^(iπ/2) (vì 5π/2 = 2π + π/2) = **32i**.

Cách trực tiếp (đại số) sẽ phải nhân 10 lần → vô cùng phiền. De Moivre giải quyết trong 3 dòng.

> 📐 **Định nghĩa đầy đủ — Công thức De Moivre**
>
> **(a) Là gì**: Quy tắc lũy thừa số phức dưới dạng cực: nâng (cos θ + i sin θ) lên bậc n = chỉ cần **nhân n vào argument**. Hệ quả trực tiếp của Euler (e^(iθ))^n = e^(inθ).
>
> **(b) Vì sao cần**: Lũy thừa số phức dạng đại số (a+bi)^n đòi hỏi nhân n lần — bùng nổ số hạng. De Moivre cho công thức **đóng** (closed-form) chỉ cần r^n + nθ. Quan trọng hơn — nó cho công cụ **giải PT** z^n = w trong ℂ: n căn bậc n nằm đều quanh đường tròn = n đỉnh đa giác đều. Ứng dụng: tìm tất cả căn của 1 (root of unity) — nền tảng FFT (Fast Fourier Transform), cryptography, đa thức nội suy.
>
> **(c) Ví dụ số**: (cos 30° + i sin 30°)^4 = cos 120° + i sin 120° = −1/2 + i·√3/2. Verify: 30°·4 = 120° ✓. (1+i)^10: viết = (√2·e^(iπ/4))^10 = 32·e^(i·10π/4) = 32·e^(iπ/2) = **32i**. Kiểm: (1+i)² = 2i, (2i)^5 = 32·i⁵ = 32·i ✓. n căn bậc 4 của 1: z^4 = 1 = e^0 → z_k = e^(i·k·2π/4), k=0,1,2,3 → {1, i, -1, -i} (4 đỉnh hình vuông).

⚠ **Lỗi thường gặp**: Quên nhân n vào θ. (e^(iθ))^n = e^(inθ), KHÔNG phải e^(iθ).

⚠ **Lỗi thường gặp 2 — quên nâng cả mô-đun lên lũy thừa n**. `(r·e^(iθ))^n = r^n·e^(inθ)` — mô-đun thành `r^n`, KHÔNG giữ nguyên r. Phản ví dụ: `(1+i)^4 = (√2·e^(iπ/4))^4 = (√2)^4·e^(iπ) = 4·(−1) = −4`; nếu quên mũ mô-đun ra `√2·e^(iπ) = −√2` → sai.

❓ **Câu hỏi tự nhiên của người đọc**

- *"De Moivre đúng với n âm hay phân số không?"* Với **n nguyên** (cả âm) luôn đúng. Với n phân số (`1/k`) thì cho **một** trong nhiều căn — phải dùng công thức căn (mục 4) để lấy đủ tất cả nghiệm.
- *"Vì sao De Moivre nhanh hơn nhân trực tiếp?"* Nhân `(a+bi)^10` trực tiếp phải khai triển 10 lần, bùng nổ số hạng. De Moivre chỉ cần `r^10` và `10θ` — 3 dòng.

🔁 **Dừng lại tự kiểm tra**

1. Tính `(cos 20° + i sin 20°)^9`.
2. Tính `(2e^(iπ/6))^3`.

<details><summary>Đáp án</summary>

1. `= cos(9·20°) + i sin(9·20°) = cos 180° + i sin 180° = −1`.
2. `= 2³·e^(i·3·π/6) = 8·e^(iπ/2) = 8i`.

</details>

### 📝 Tóm tắt mục 1

- `(cos θ + i sin θ)^n = cos nθ + i sin nθ`; tổng quát `(r e^(iθ))^n = r^n e^(inθ)`.
- Là hệ quả trực tiếp của Euler; lũy thừa = quay n lần = nhân góc.
- Nhớ nâng **cả mô-đun** lên mũ n và **nhân n vào θ**.

---

## 2. Khai triển cos(nθ), sin(nθ) qua sin/cos

💡 **Trực giác / Hình dung**: De Moivre cho hai cách viết cùng một số phức `(cos θ + i sin θ)^n`. Vế trái khai triển bằng nhị thức Newton thành đa thức của sin θ, cos θ. Vế phải là `cos nθ + i sin nθ`. **So phần thực với phần thực, phần ảo với phần ảo** → tự rơi ra công thức nhân n. Đây là "máy sinh công thức" lượng giác.

Áp dụng De Moivre + nhị thức Newton để chứng minh các đồng nhất thức nhân đôi, nhân ba...

**Ví dụ**: Khai triển (cos θ + i sin θ)³.
- = cos³θ + 3·cos²θ·(i sinθ) + 3·cos θ·(i sinθ)² + (i sinθ)³
- = cos³θ + 3i·cos²θ·sin θ - 3·cos θ·sin²θ - i·sin³θ
- = (cos³θ - 3·cos θ·sin²θ) + i·(3·cos²θ·sin θ - sin³θ)

Vế trái cũng = cos 3θ + i·sin 3θ. Đối chiếu:
- **cos 3θ = cos³θ - 3·cos θ·sin²θ = 4cos³θ - 3cos θ**.
- **sin 3θ = 3·cos²θ·sin θ - sin³θ = 3sin θ - 4sin³θ**.

⟶ De Moivre **sinh ra** các công thức nhân ba (và mọi bậc).

**Verify `cos 3θ = 4cos³θ − 3cos θ` bằng số (θ = 0)**: vế trái `cos 0 = 1`; vế phải `4·1³ − 3·1 = 1` ✓. Thử θ = π/3: vế trái `cos π = −1`; vế phải `4·(1/2)³ − 3·(1/2) = 4/8 − 3/2 = 1/2 − 3/2 = −1` ✓.

⚠ **Lỗi thường gặp — đối chiếu nhầm phần thực/ảo**. Phần thực của vế trái cho `cos nθ`, phần ảo cho `sin nθ`. Phản ví dụ: trong khai triển `(cos θ + i sin θ)³`, hạng tử `3i cos²θ sin θ` thuộc **phần ảo** (góp vào sin 3θ), KHÔNG được gộp nhầm vào cos 3θ.

❓ **Câu hỏi tự nhiên của người đọc**

- *"i^k trong nhị thức xử lý sao?"* Dùng chu kỳ 4 của i: `i⁰=1, i¹=i, i²=−1, i³=−i`. Các số hạng `i^chẵn` cho phần thực, `i^lẻ` cho phần ảo.
- *"Có cần thuộc công thức nhân ba?"* Không bắt buộc — nhớ cách **suy ra** từ De Moivre quan trọng hơn thuộc lòng.

🔁 **Dừng lại tự kiểm tra**

1. Phần ảo khi khai triển `(cos θ + i sin θ)²` cho công thức nào?
2. `sin 3θ` viết qua sin θ là gì?

<details><summary>Đáp án</summary>

1. `(cosθ + isinθ)² = cos²θ + 2i sinθ cosθ − sin²θ`; phần ảo `2 sinθ cosθ = sin 2θ`.
2. `sin 3θ = 3 sin θ − 4 sin³θ`.

</details>

### 📝 Tóm tắt mục 2

- Khai triển `(cosθ+isinθ)^n` bằng nhị thức, đối chiếu với `cos nθ + i sin nθ`.
- Phần thực → cos nθ, phần ảo → sin nθ.
- De Moivre là "máy sinh" mọi công thức nhân n của lượng giác.

---

## 3. Căn bậc n của 1

💡 **Trực giác / Hình dung**: tìm "căn bậc n của 1" = tìm những số mà quay n lần (mỗi lần góc đều) thì về đúng vị trí 1 (góc 0, tức bội của 2π). Cách duy nhất: chia vòng tròn `2π` thành n phần bằng nhau. Vì vậy n nghiệm nằm **cách đều** quanh đường tròn đơn vị → tạo thành **đa giác đều n cạnh**.

**Hỏi**: PT z^n = 1 có bao nhiêu nghiệm trong ℂ?

**Đáp**: **n nghiệm**, mỗi nghiệm tương ứng 1 đỉnh **đa giác đều n cạnh** nội tiếp đường tròn đơn vị.

**Công thức**:
```
z_k = e^(i·2kπ/n)   k = 0, 1, 2, ..., n-1
```

**Ví dụ n=3 (căn bậc 3 của 1)**:
- z₀ = e^0 = **1**.
- z₁ = e^(i·2π/3) = cos 120° + i sin 120° = **-1/2 + i√3/2**.
- z₂ = e^(i·4π/3) = **-1/2 - i√3/2**.

⟶ 3 nghiệm là 3 đỉnh tam giác đều nội tiếp đường tròn r=1.

**Kiểm tra**: z₁³ = (e^(i·2π/3))³ = e^(i·2π) = 1 ✓.

❓ **Vì sao đa giác đều?** Vì n căn cùng mô-đun r=1, argument chia đều quanh đường tròn cứ 2π/n.

### Trường hợp n=4:
z = 1, i, -1, -i → 4 đỉnh hình vuông.

### Trường hợp n=6:
z = e^(i·kπ/3), k=0..5 → 6 đỉnh lục giác đều.

⚠ **Lỗi thường gặp — chỉ lấy 1 nghiệm thực (= 1) mà bỏ các nghiệm phức**. `z^n = 1` có **n** nghiệm, không phải 1. Phản ví dụ: `z³ = 1` không chỉ có `z = 1` — còn `z = −1/2 ± (√3/2)i`. Kiểm: `(−1/2 + √3/2 i)³ = 1` (quay 120° ba lần = 360° về 1). Bỏ chúng là mất 2/3 nghiệm.

⚠ **Lỗi thường gặp 2 — cho k chạy tới n (lặp nghiệm)**. k chỉ chạy `0, 1, ..., n−1` (đúng n giá trị). Tại `k = n`: `e^(i·2nπ/n) = e^(i2π) = 1 = z₀` — trùng lại. Đừng đếm dư.

❓ **Câu hỏi tự nhiên của người đọc**

- *"Tổng tất cả n căn bậc n của 1 bằng mấy?"* Bằng **0** (với n ≥ 2) — vì các đỉnh đa giác đều phân bố đối xứng quanh tâm, vector cộng triệt tiêu. Vd n=3: `1 + (−1/2+√3/2 i) + (−1/2−√3/2 i) = 0`.
- *"Căn bậc n của 1 dùng để làm gì thực tế?"* Là "root of unity" — nền tảng của **FFT** (biến đổi Fourier nhanh, dùng trong nén ảnh/nhạc, xử lý tín hiệu).

🔁 **Dừng lại tự kiểm tra**

1. Liệt kê 4 căn bậc 4 của 1.
2. Tổng 4 căn đó bằng mấy?

<details><summary>Đáp án</summary>

1. `z_k = e^(i·kπ/2)`, k=0..3 → `1, i, −1, −i`.
2. `1 + i + (−1) + (−i) = 0`.

</details>

### 📝 Tóm tắt mục 3

- `z^n = 1` có **n** nghiệm: `z_k = e^(i·2kπ/n)`, k = 0..n−1.
- n nghiệm cách đều quanh đường tròn đơn vị = n đỉnh đa giác đều.
- Tổng n căn (n≥2) = 0; là "root of unity", nền của FFT.

---

## 4. Căn bậc n của số phức bất kỳ

💡 **Trực giác / Hình dung**: căn bậc n của một số phức `w` = "ngược" phép lũy thừa: tìm các z mà `z^n = w`. Hình học: tất cả nằm trên đường tròn bán kính `R^(1/n)` (căn bậc n thực của mô-đun w), chia đều argument. Giống căn của 1 nhưng (a) đường tròn không nhất thiết bán kính 1, (b) "đỉnh đầu tiên" lệch đi `φ/n` thay vì 0.

**Tổng quát**: z^n = w (với w = R·e^(iφ)).

**n nghiệm**:
```
z_k = R^(1/n) · e^(i·(φ + 2kπ)/n)   k = 0, 1, ..., n-1
```

- Mô-đun: tất cả đều bằng **R^(1/n)** (căn bậc n thực của R).
- Argument: chia đều quanh đường tròn, mỗi nghiệm cách nhau 2π/n.

**Ví dụ**: Tìm các căn bậc 3 của -8.
- -8 = 8·e^(iπ).
- z_k = 8^(1/3)·e^(i·(π + 2kπ)/3) = 2·e^(i·(2k+1)π/3), k=0,1,2.
- z₀ = 2·e^(iπ/3) = 2·(½ + i·√3/2) = **1 + i√3**.
- z₁ = 2·e^(iπ) = **-2**.
- z₂ = 2·e^(i·5π/3) = **1 - i√3**.

**Kiểm tra**: (-2)³ = -8 ✓. (1+i√3)³ = ... = -8 (tính bằng De Moivre).

⚠ **Lỗi thường gặp — quên `+2kπ` trong argument trước khi chia cho n**. Phải dùng `(φ + 2kπ)/n`, không chỉ `φ/n`. Phản ví dụ: căn bậc 3 của −8 (φ = π). Nếu chỉ lấy `φ/3 = π/3` ra **một** nghiệm `1 + i√3`; bỏ `+2kπ` thì mất hai nghiệm còn lại `−2` và `1 − i√3`. Phải cho k = 0, 1, 2.

❓ **Câu hỏi tự nhiên của người đọc**

- *"Vì sao mô-đun tất cả các căn bằng nhau?"* Vì `|z_k| = R^(1/n)` không phụ thuộc k — chỉ argument thay đổi. Nên chúng nằm trên cùng một đường tròn.
- *"Khoảng cách góc giữa hai căn liên tiếp là bao nhiêu?"* Đúng `2π/n` (chia đều vòng tròn). Vd căn bậc 3 cách nhau 120°.

🔁 **Dừng lại tự kiểm tra**

1. Tìm các căn bậc 2 của `i`.
2. Mô-đun chung của các căn bậc 4 của `16` là bao nhiêu?

<details><summary>Đáp án</summary>

1. `i = e^(iπ/2)`. `z_k = e^(i(π/2 + 2kπ)/2)`, k=0,1 → `z₀ = e^(iπ/4) = √2/2 + √2/2 i`, `z₁ = e^(i·5π/4) = −√2/2 − √2/2 i`.
2. `16^(1/4) = 2`.

</details>

### 📝 Tóm tắt mục 4

- `z^n = w` (w = R·e^(iφ)): `z_k = R^(1/n)·e^(i(φ+2kπ)/n)`, k=0..n−1.
- Mọi căn cùng mô-đun `R^(1/n)`; argument cách đều `2π/n`.
- Bắt buộc có `+2kπ` để lấy đủ n nghiệm.

---

## 5. Ứng dụng — chứng minh đồng nhất thức trắc đẹp

💡 **Trực giác / Hình dung**: `e^(iθ)` và `e^(−iθ)` là hai điểm đối xứng qua trục thực (góc +θ và −θ). **Cộng** chúng → phần ảo triệt tiêu, còn `2cos θ` (gấp đôi hoành độ). **Trừ** chúng → phần thực triệt tiêu, còn `2i sin θ`. Vì thế sin/cos viết lại được hoàn toàn qua hàm mũ — cầu nối sang giải tích & Fourier.

Phép biến đổi từ ℂ về ℝ thường cho công thức ngắn gọn:
- **cos θ = (e^(iθ) + e^(-iθ))/2** (từ Euler).
- **sin θ = (e^(iθ) - e^(-iθ))/(2i)**.

**Chứng minh từng bước `cos θ = (e^(iθ)+e^(−iθ))/2`**: từ Euler, `e^(iθ) = cos θ + i sin θ` và `e^(−iθ) = cos(−θ) + i sin(−θ) = cos θ − i sin θ`. Cộng: `e^(iθ) + e^(−iθ) = 2cos θ` (hai `i sin θ` triệt tiêu). Chia 2 → đpcm.

**Verify bằng số (θ = π/3)**: `cos π/3 = 1/2`. Vế phải `(e^(iπ/3) + e^(−iπ/3))/2 = ((1/2 + √3/2 i) + (1/2 − √3/2 i))/2 = (1)/2 = 1/2` ✓.

⟶ Đây là cầu nối sang **Fourier** (Tier 5/6) — mọi tín hiệu = tổng các e^(iωt).

⚠ **Lỗi thường gặp — quên `i` ở mẫu công thức sin**. `sin θ = (e^(iθ) − e^(−iθ))/(2i)` — mẫu là `2i`, KHÔNG phải `2`. Phản ví dụ θ = π/2: `e^(iπ/2) − e^(−iπ/2) = i − (−i) = 2i`; chia `2i` ra `1 = sin(π/2)` ✓; nếu chia `2` ra `i` (số ảo) → vô lý vì sin phải thực.

❓ **Câu hỏi tự nhiên của người đọc**

- *"Hai công thức này dùng ở đâu?"* Trong tích phân (biến `cos` thành mũ dễ tích phân hơn), và trong **biến đổi Fourier** — phân tích tín hiệu thành tổng `e^(iωt)`.
- *"Có công thức tương tự cho tan không?"* Có, suy ra: `tan θ = (e^(iθ)−e^(−iθ))/(i(e^(iθ)+e^(−iθ)))`, nhưng ít dùng vì rườm rà.

🔁 **Dừng lại tự kiểm tra**

1. Dùng công thức mũ, tính `cos 0`.
2. Viết `2cos θ` qua `e^(iθ)`.

<details><summary>Đáp án</summary>

1. `(e^0 + e^0)/2 = (1+1)/2 = 1 = cos 0` ✓.
2. `2cos θ = e^(iθ) + e^(−iθ)`.

</details>

### 📝 Tóm tắt mục 5

- `cos θ = (e^(iθ)+e^(−iθ))/2`, `sin θ = (e^(iθ)−e^(−iθ))/(2i)` (chú ý `i` ở mẫu sin).
- Cộng/trừ hai điểm đối xứng `±θ` → triệt tiêu phần ảo/thực.
- Là cầu nối sang Fourier — tín hiệu = tổng các `e^(iωt)`.

---

## 6. Bài tập

### Bài tập

**Bài 1**: Tính (cos π/6 + i·sin π/6)^12.

**Bài 2**: Tính (1 - i)^8.

**Bài 3**: Tìm các căn bậc 4 của 1.

**Bài 4**: Tìm các căn bậc 3 của 8i.

**Bài 5**: Chứng minh cos 2θ = 2·cos²θ - 1 dùng De Moivre.

### Lời giải

**Bài 1**: (e^(iπ/6))^12 = e^(i·2π) = **1**.

**Bài 2**: 1-i = √2·e^(-iπ/4). (√2·e^(-iπ/4))^8 = (√2)^8·e^(-i·2π) = 16·1 = **16**.

**Bài 3**: z_k = e^(i·kπ/2), k=0,1,2,3 → **{1, i, -1, -i}**.

**Bài 4**: 8i = 8·e^(iπ/2). z_k = 2·e^(i·(π/2 + 2kπ)/3), k=0,1,2.  
- z₀ = 2·e^(iπ/6) = 2(√3/2 + i/2) = **√3 + i**.  
- z₁ = 2·e^(i·5π/6) = **-√3 + i**.  
- z₂ = 2·e^(i·9π/6) = 2·e^(i·3π/2) = **-2i**.

**Bài 5**: Khai triển (cos θ + i sin θ)² = cos²θ + 2i·sin θ·cos θ - sin²θ.  
Vế trái = cos 2θ + i sin 2θ.  
Đối chiếu phần thực: **cos 2θ = cos²θ - sin²θ = cos²θ - (1 - cos²θ) = 2cos²θ - 1** ✓.

---

## 7. Bài tiếp theo

[Lesson 08 — Ứng dụng](../lesson-08-trig-applications/).

## 📝 Tổng kết

1. **De Moivre**: (cos θ + i sin θ)^n = cos nθ + i sin nθ. Hệ quả từ Euler.
2. **Lũy thừa cực**: (r·e^(iθ))^n = r^n·e^(inθ).
3. **n căn bậc n của z**: n nghiệm cách đều quanh đường tròn r = |z|^(1/n).
4. **Căn của 1**: n đỉnh đa giác đều nội tiếp đường tròn đơn vị.
