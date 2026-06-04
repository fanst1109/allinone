// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: Math/03-Trig-Complex/lesson-05-complex-numbers/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 05 — Số phức

## Mục tiêu

- Hiểu **vì sao cần số phức** (giải được mọi PT đa thức).
- Định nghĩa **i**, dạng đại số z = a + bi.
- 4 phép toán: cộng, trừ, nhân, chia.
- **Mặt phẳng phức** Argand, **mô-đun**, **liên hợp**.

## Kiến thức tiền đề

- [Lesson 04 — PT bậc 2](../../01-Arithmetic-Algebra/lesson-04-quadratic-equations/) (Δ < 0).

---

## 1. Vì sao cần số phức?

💡 **Câu chuyện**: Toán phổ thông học rằng x² + 1 = 0 **vô nghiệm** trong ℝ (vì x² ≥ 0).

Nhưng các nhà toán học Ý thế kỷ 16 (Cardano, Bombelli) khi giải PT bậc 3 phát hiện: trong các bước trung gian, phải lấy căn của số âm — kể cả khi nghiệm cuối là số thực! Họ "phát minh" ra **i** với tính chất:

\`\`\`
i² = -1
\`\`\`

Lúc đầu coi là "ảo" (imaginary), nhưng hóa ra **i thật sự có ý nghĩa hình học**: là phép quay 90° trong mặt phẳng (xem L08).

**Hệ quả**: Mọi PT đa thức bậc n trong ℂ có **đúng n nghiệm** (Định lý đại số cơ bản — Gauss).

❓ **Câu hỏi tự nhiên của người đọc**

- *"\`i\` 'ảo' nghĩa là không có thật? Vậy học để làm gì?"* "Ảo" (imaginary) chỉ là cái tên lịch sử do người xưa nghi ngờ. \`i\` **thật sự hữu dụng**: nó mô tả phép quay 90° (L06), dòng điện xoay chiều, sóng lượng tử. "Số thực" cũng là khái niệm trừu tượng do con người dựng nên không kém.
- *"Tại sao không định nghĩa \`√(−1)\` trực tiếp mà phải qua \`i² = −1\`?"* Vì ký hiệu \`√\` cho số âm gây mâu thuẫn (vd \`√(−1)·√(−1)\` dễ ra \`√1 = 1\` thay vì \`−1\`). Định nghĩa qua \`i² = −1\` tránh được bẫy này.
- *"Có 'số phức của số phức' (cấp cao hơn) không?"* Có hướng mở rộng (quaternion 4 chiều, octonion 8 chiều), nhưng ℂ đã "đóng đại số" — đủ cho mọi PT đa thức, nên thường dừng ở ℂ.

⚠ **Lỗi thường gặp — viết \`√(−4) = √4·√(−1) = 2i\` rồi áp luật \`√a·√b = √(ab)\` bừa bãi**. Luật \`√a·√b = √(ab)\` CHỈ đúng cho a, b ≥ 0. Phản ví dụ sai: \`√(−1)·√(−1)\` nếu áp luật ra \`√((−1)(−1)) = √1 = 1\`, nhưng đúng phải là \`i·i = i² = −1\`. Khác dấu hoàn toàn.

🔁 **Dừng lại tự kiểm tra**

1. PT \`x² + 1 = 0\` có nghiệm thực không? Có nghiệm phức không?
2. Theo định lý Gauss, PT bậc 5 có mấy nghiệm phức (kể cả bội)?

<details><summary>Đáp án</summary>

1. Không có nghiệm thực (vì x² ≥ 0). Có 2 nghiệm phức: \`x = ±i\`.
2. Đúng **5** nghiệm phức (đếm cả bội).

</details>

### 📝 Tóm tắt mục 1

- ℝ không giải được \`x² + 1 = 0\`; "phát minh" \`i\` với \`i² = −1\` để vá lỗ hổng đó.
- Nhờ ℂ, mọi PT đa thức bậc n có đúng n nghiệm (định lý Gauss).
- \`i\` không "huyền bí": nó là phép quay 90° và là công cụ cốt lõi của vật lý, kỹ thuật.

---

## 2. Định nghĩa

💡 **Trực giác / Hình dung**: coi số phức \`a + bi\` như một **cặp toạ độ (a, b)** — phần thực đi ngang, phần ảo đi dọc. Số thực bình thường chỉ nằm trên một **trục** (1 chiều); số phức cho ta cả **mặt phẳng** (2 chiều). \`i\` chính là "hướng đi lên" vuông góc với trục số thực.

**Số phức** là biểu thức dạng:
\`\`\`
z = a + bi
\`\`\`
- **a** = phần thực (real part), ký hiệu Re(z).
- **b** = phần ảo (imaginary part), ký hiệu Im(z).
- **i** = đơn vị ảo, i² = -1.

**Ví dụ**: z = 3 + 4i. Re(z) = 3, Im(z) = 4.

**Trường hợp đặc biệt**:
- b = 0: z là số thực (ℝ ⊂ ℂ).
- a = 0: z là số thuần ảo (vd 5i).

> 📐 **Định nghĩa đầy đủ — Số phức ℂ**
>
> **(a) Là gì**: 1 cặp (a, b) số thực, viết dưới dạng a + bi, với i là 1 ký hiệu mới thoả **i² = −1**. Tập tất cả số phức = ℂ. Số thực là trường hợp đặc biệt b = 0. Trên mặt phẳng Argand: z = a+bi tương ứng điểm (a, b).
>
> **(b) Vì sao tồn tại**: Trong ℝ, PT x² = −1 vô nghiệm. Người ta "phát minh" i với i² = -1 → mọi PT đa thức bậc n có đủ n nghiệm (Định lý đại số cơ bản — Gauss). Quan trọng hơn — i sinh ra cấu trúc đại số "đầy đủ" và **mang ý nghĩa hình học thực** (xem L06: nhân với i = quay 90°). Cốt lõi của: signal processing (Fourier), điện xoay chiều (phasor), cơ học lượng tử (hàm sóng phức).
>
> **(c) Ví dụ số**: z = 3 + 4i: Re(z)=3, Im(z)=4. Trên mặt phẳng → điểm (3, 4). Mô-đun |z| = √(9+16) = 5. Liên hợp z̄ = 3 − 4i. z·z̄ = 9 + 16 = 25 = |z|² ✓. (1+i)·(1−i) = 1 − i + i − i² = 1 + 1 = 2 (số thực!). i³ = i·i² = i·(−1) = **−i**. i⁴ = 1. Giải x² + 4 = 0: x² = -4 → x = ±2i.

**4 ví dụ số đa dạng**:
- Phần thực và ảo đều dương: \`z = 2 + 5i\` → Re = 2, Im = 5.
- Thuần ảo: \`z = −7i\` → Re = 0, Im = −7.
- Thuần thực: \`z = 4\` (= 4 + 0i) → Re = 4, Im = 0 (số thực là số phức đặc biệt).
- Phần ảo âm: \`z = 3 − 2i\` → Re = 3, Im = **−2** (Im là số −2, KHÔNG kèm i).

⚠ **Lỗi thường gặp — coi \`Im(z)\` gồm cả \`i\`**. Với \`z = 3 − 2i\`, \`Im(z) = −2\` (một số thực), KHÔNG phải \`−2i\`. Phần ảo là **hệ số** của i, không kèm i. Phản ví dụ: nếu viết \`Im(3−2i) = −2i\` thì khi tính \`z = Re + Im·i\` sẽ ra \`3 + (−2i)·i = 3 + 2\` — sai.

❓ **Câu hỏi tự nhiên của người đọc**

- *"Số phức có 'lớn hơn / nhỏ hơn' không?"* **Không** có thứ tự như số thực — không nói \`2+3i > 1+i\` được. Chỉ so sánh **độ lớn** qua mô-đun \`|z|\`.
- *"Hai số phức bằng nhau khi nào?"* Khi **cả phần thực lẫn phần ảo** bằng nhau: \`a+bi = c+di ⟺ a=c VÀ b=d\`. Một PT số phức tương đương hai PT số thực.

🔁 **Dừng lại tự kiểm tra**

1. Cho \`z = −5 + 2i\`. Re(z), Im(z)?
2. \`z = 6\` là số phức không? Im của nó?

<details><summary>Đáp án</summary>

1. \`Re(z) = −5\`, \`Im(z) = 2\`.
2. Có (mọi số thực đều là số phức). \`Im(6) = 0\`.

</details>

### 📝 Tóm tắt mục 2

- \`z = a + bi\`: a = Re(z) (phần thực), b = Im(z) (phần ảo, là số thực không kèm i).
- Số thực (b=0) và thuần ảo (a=0) là trường hợp đặc biệt.
- Hai số phức bằng nhau ⟺ bằng cả phần thực và phần ảo; không có thứ tự lớn/nhỏ.

---

## 3. Mặt phẳng phức (Argand)

💡 **Trực giác**: Coi z = a + bi như **điểm M(a, b)** trên mặt phẳng. Trục hoành = phần thực, trục tung = phần ảo.

\`\`\`
   ●(3+4i)
   │
   │
   ●(2)        ●(5)            (trục thực)
   │
   ●(-3i)                       (trục ảo)
\`\`\`

**Mô-đun** (độ dài vector OM):
\`\`\`
|z| = √(a² + b²)
\`\`\`

**Liên hợp** (lật qua trục thực):
\`\`\`
z̄ = a - bi
\`\`\`

**Tính chất**:
- z · z̄ = (a+bi)(a-bi) = a² + b² = |z|².
- z + z̄ = 2a = 2·Re(z).
- z - z̄ = 2bi.

**Verify bằng số (z = 3 + 4i)**: \`|z| = √(3²+4²) = √25 = 5\`. \`z̄ = 3 − 4i\`. \`z·z̄ = (3+4i)(3−4i) = 9 − 12i + 12i − 16i² = 9 + 16 = 25 = |z|²\` ✓. \`z + z̄ = 6 = 2·Re(z)\` ✓. \`z − z̄ = 8i = 2·(4)i\` ✓.

⚠ **Lỗi thường gặp — tính mô-đun thiếu bình phương hoặc cộng nhầm**. \`|a+bi| = √(a²+b²)\`, KHÔNG phải \`a + b\` hay \`√(a+b)\`. Phản ví dụ: \`|3+4i|\` đúng là \`√(9+16)=5\`; nếu tính \`3+4=7\` hay \`√(3+4)=√7≈2.65\` đều sai.

❓ **Câu hỏi tự nhiên của người đọc**

- *"Liên hợp \`z̄\` có ý nghĩa hình học gì?"* Là **ảnh qua gương** của z qua trục thực (trục hoành): điểm (a, b) → (a, −b). Giữ phần thực, lật dấu phần ảo.
- *"Vì sao \`z·z̄\` luôn là số thực không âm?"* Vì \`= a² + b² = |z|²\`. Đây chính là mẹo để "khử ảo" ở mẫu khi chia (mục 4.3).

🔁 **Dừng lại tự kiểm tra**

1. Cho \`z = −1 + 2i\`. Tính \`|z|\` và \`z̄\`.
2. \`z·z̄\` của \`z = 5i\` bằng mấy?

<details><summary>Đáp án</summary>

1. \`|z| = √((−1)²+2²) = √5\`. \`z̄ = −1 − 2i\`.
2. \`z = 0 + 5i\`, \`z̄ = −5i\` → \`z·z̄ = 25\` (= \`|z|² = 5² = 25\`).

</details>

### 📝 Tóm tắt mục 3

- z = a+bi ↔ điểm (a, b) trên mặt phẳng Argand (trục x thực, trục y ảo).
- \`|z| = √(a²+b²)\` (độ dài vector); \`z̄ = a − bi\` (lật qua trục thực).
- \`z·z̄ = |z|²\` (luôn thực ≥ 0) — mẹo khử ảo ở mẫu.

---

## 4. Bốn phép toán

💡 **Trực giác / Hình dung**: làm số phức **y hệt làm đa thức** theo biến \`i\`, với một luật phụ duy nhất: \`i² = −1\`. Cộng/trừ = gộp các hạng tử cùng loại (thực với thực, ảo với ảo). Nhân = phân phối (FOIL) rồi thay \`i²\` bằng \`−1\`. Chia = "khử ảo ở mẫu" bằng liên hợp, giống hữu tỉ hóa mẫu căn. Không có gì mới ngoài \`i² = −1\`.

### 4.1. Cộng / trừ

\`\`\`
(a + bi) + (c + di) = (a+c) + (b+d)·i
(a + bi) - (c + di) = (a-c) + (b-d)·i
\`\`\`

**Ví dụ**: (3+2i) + (1-4i) = **4 - 2i**.

💡 **Hình học**: Cộng số phức = **cộng vector**.

### 4.2. Nhân

Phân phối, dùng i² = -1:
\`\`\`
(a+bi)(c+di) = ac + adi + bci + bd·i² = (ac - bd) + (ad + bc)i
\`\`\`

**Ví dụ**: (3+2i)(1-4i) = 3 - 12i + 2i - 8i² = 3 - 10i + 8 = **11 - 10i**.

⚠ **Lỗi thường gặp**: Quên i² = -1, để nguyên 8i² → kết quả sai 3 - 10i thay vì 11 - 10i.

### 4.3. Chia

**Mẹo**: Nhân tử và mẫu với liên hợp của mẫu (để mẫu thành số thực).

\`\`\`
(a+bi) / (c+di) = (a+bi)(c-di) / [(c+di)(c-di)] = (a+bi)(c-di) / (c²+d²)
\`\`\`

**Ví dụ**: (3+2i) / (1+i).
- Nhân với (1-i):
- Tử: (3+2i)(1-i) = 3 - 3i + 2i - 2i² = 3 - i + 2 = 5 - i.
- Mẫu: (1+i)(1-i) = 1² + 1² = 2.
- → **(5-i)/2 = 5/2 - (1/2)i**.

❓ **Câu hỏi tự nhiên của người đọc**

- *"Vì sao nhân tử & mẫu với liên hợp lại khử được ảo ở mẫu?"* Vì \`(c+di)(c−di) = c² + d²\` — luôn là số **thực** (theo \`z·z̄ = |z|²\`). Mẫu thành thực thì kết quả tách được phần thực/ảo rõ ràng.
- *"Cộng số phức có ý nghĩa hình học gì?"* Là **cộng vector**: nối hai mũi tên đầu-đuôi (quy tắc hình bình hành). Nhân thì là quay + co giãn (xem L06).

🔁 **Dừng lại tự kiểm tra**

1. Tính \`(2 + 3i) + (4 − i)\` và \`(2 + 3i)(4 − i)\`.
2. Tính \`(2 + i)/(1 − i)\`.

<details><summary>Đáp án</summary>

1. Cộng: \`6 + 2i\`. Nhân: \`8 − 2i + 12i − 3i² = 8 + 10i + 3 = 11 + 10i\`.
2. Nhân tử & mẫu với \`(1+i)\`: tử \`(2+i)(1+i) = 2 + 2i + i + i² = 1 + 3i\`; mẫu \`(1−i)(1+i) = 2\` → \`(1+3i)/2 = 1/2 + (3/2)i\`.

</details>

### 📝 Tóm tắt mục 4

- Cộng/trừ: gộp phần thực với thực, ảo với ảo.
- Nhân: phân phối (FOIL) rồi thay \`i² = −1\` (đừng quên bước này).
- Chia: nhân tử & mẫu với **liên hợp mẫu** để mẫu thành thực.

---

## 5. Lũy thừa của i

💡 **Trực giác / Hình dung**: nhân với \`i\` = **quay 90°** trên mặt phẳng. Bắt đầu từ 1 (hướng phải): quay 90° → \`i\` (lên), quay tiếp → \`−1\` (trái), quay tiếp → \`−i\` (xuống), quay tiếp → \`1\` (về chỗ cũ). Cứ 4 lần quay = 1 vòng đầy → lũy thừa của i lặp lại chu kỳ 4.

| n | i^n |
|---|-----|
| 0 | 1 |
| 1 | i |
| 2 | -1 |
| 3 | -i |
| 4 | 1 |
| 5 | i |
| ... | tuần hoàn chu kỳ 4 |

⟶ **i^n = i^(n mod 4)**.

**Ví dụ**: i^2023 = i^(2023 mod 4) = i^3 = **-i**.

**4 ví dụ số đa dạng**:
- \`i^6 = i^(6 mod 4) = i^2 = −1\`.
- \`i^12 = i^(12 mod 4) = i^0 = 1\` (bội của 4 → 1).
- \`i^25 = i^(25 mod 4) = i^1 = i\`.
- \`i^(−1) = 1/i = 1/i · (i/i)·(−1)... \` thực ra \`i^(−1) = i^3 = −i\` (vì \`i·(−i) = −i² = 1\`).

⚠ **Lỗi thường gặp — tính \`n mod 4\` sai với số có thể chia hết**. Nếu \`n\` chia hết cho 4 thì \`i^n = 1\` (không phải i). Phản ví dụ: \`i^100\`: \`100 mod 4 = 0\` → \`i^0 = 1\`. Người mới hay nhầm ra \`i\`.

❓ **Câu hỏi tự nhiên của người đọc**

- *"\`i\` mũ âm tính sao?"* Dùng chu kỳ 4 luôn: \`i^(−n) = i^((−n) mod 4)\`. Vd \`i^(−2) = i^2 = −1\` (vì \`−2 ≡ 2 mod 4\`). Hoặc \`i^(−n) = 1/i^n\`.
- *"Vì sao chu kỳ đúng bằng 4, không phải 2?"* Vì một vòng quay đầy (360°) cần 4 lần quay 90°. Sau 2 lần (\`i²=−1\`) chưa về chỗ cũ.

🔁 **Dừng lại tự kiểm tra**

1. \`i^50 = ?\`
2. \`i^7 + i^5 = ?\`

<details><summary>Đáp án</summary>

1. \`50 mod 4 = 2\` → \`i^50 = i² = −1\`.
2. \`i^7 = i^3 = −i\`; \`i^5 = i^1 = i\` → tổng \`−i + i = 0\`.

</details>

### 📝 Tóm tắt mục 5

- \`i^n\` tuần hoàn chu kỳ 4: \`1, i, −1, −i, 1, ...\` → \`i^n = i^(n mod 4)\`.
- Nhân với i = quay 90° ngược kim đồng hồ.
- n chia hết cho 4 → \`i^n = 1\` (đừng nhầm ra i).

---

## 6. PT bậc 2 với Δ < 0

💡 **Trực giác / Hình dung**: ở Tier 1, khi \`Δ < 0\` ta kết luận "vô nghiệm" — vì không lấy được căn của số âm trong ℝ. Nay với \`i\`, \`√(−36) = 6i\` có nghĩa, nên công thức nghiệm \`x = (−b ± √Δ)/(2a)\` vẫn chạy, chỉ cho ra **nghiệm phức**. Hai nghiệm luôn **liên hợp** của nhau (gương nhau qua trục thực).

Trước đây vô nghiệm. Nay luôn có 2 nghiệm phức.

**Ví dụ**: x² + 4x + 13 = 0. Δ = 16 - 52 = -36.
- √Δ = √(-36) = 6i.
- x = (-4 ± 6i) / 2 = **-2 ± 3i**.

**Kiểm tra**: (-2+3i)² + 4(-2+3i) + 13 = 4 - 12i - 9 - 8 + 12i + 13 = 0 ✓.

⚠ **Lỗi thường gặp — viết \`√(−36) = ±6i\` rồi lại đặt thêm ± trong công thức**. Trong công thức nghiệm đã có sẵn dấu \`±\` trước căn: \`x = (−b ± √|Δ|·i)/(2a)\`. Lấy \`√36 = 6\` (dương) rồi gắn \`i\`, dấu ± do công thức lo. Phản ví dụ nếu nhân đôi dấu: dễ tạo 4 "nghiệm" sai thay vì 2.

❓ **Câu hỏi tự nhiên của người đọc**

- *"Vì sao hai nghiệm luôn liên hợp khi hệ số là số thực?"* Vì \`√Δ\` đi với \`±\`, một nghiệm \`+\`, một \`−\` phần ảo → \`p + qi\` và \`p − qi\`. Định lý: đa thức hệ số thực có nghiệm phức thì nghiệm liên hợp cũng là nghiệm.
- *"Tổng và tích hai nghiệm phức có còn theo Vieta không?"* Còn nguyên. Vd ở trên: tổng \`(−2+3i)+(−2−3i) = −4 = −b/a\` ✓; tích \`(−2)²+3² = 13 = c/a\` ✓.

🔁 **Dừng lại tự kiểm tra**

1. Giải \`x² + 2x + 5 = 0\` trong ℂ.
2. Hai nghiệm đó có liên hợp nhau không?

<details><summary>Đáp án</summary>

1. \`Δ = 4 − 20 = −16\` → \`√Δ = 4i\` → \`x = (−2 ± 4i)/2 = −1 ± 2i\`.
2. Có: \`−1+2i\` và \`−1−2i\` là cặp liên hợp.

</details>

### 📝 Tóm tắt mục 6

- \`Δ < 0\`: \`√Δ = √|Δ|·i\`, công thức nghiệm cho 2 nghiệm phức.
- Hệ số thực → hai nghiệm là **cặp liên hợp** \`p ± qi\`.
- Vieta (tổng \`−b/a\`, tích \`c/a\`) vẫn đúng trong ℂ.

---

## 7. Định lý đại số cơ bản

💡 **Trực giác / Hình dung**: trong ℝ, "lên đa thức bậc cao thì có khi không đủ nghiệm" (vd \`x²+1\` 0 nghiệm, \`x⁴+1\` 0 nghiệm thực). ℂ "vá" mọi lỗ hổng: hễ bậc n thì **luôn đúng n nghiệm**, không thừa không thiếu. Đó là nghĩa của "đóng đại số" — không cần phát minh thêm loại số nào nữa để giải đa thức.

**Phát biểu**: Mọi PT đa thức bậc n ≥ 1 với hệ số phức **có đúng n nghiệm phức** (đếm cả bội).

⟶ ℂ là "đóng" cho đại số. Đó là lý do số phức quan trọng dù "ảo" — chúng làm cho hệ thống số hoàn chỉnh.

**4 ví dụ số minh họa "đủ n nghiệm"**:
- \`x² + 1 = 0\` (bậc 2) → 2 nghiệm: \`±i\`.
- \`x² − 2x + 1 = 0\` (bậc 2) → \`(x−1)² = 0\` → nghiệm \`x = 1\` **bội 2** (đếm là 2 nghiệm).
- \`x³ − 1 = 0\` (bậc 3) → 3 nghiệm: \`1\`, \`−1/2 ± (√3/2)i\` (căn bậc 3 của 1, xem L07).
- \`x⁴ − 1 = 0\` (bậc 4) → 4 nghiệm: \`1, −1, i, −i\`.

⚠ **Lỗi thường gặp — quên "đếm cả bội"**. \`(x−2)³ = 0\` chỉ có một **giá trị** nghiệm \`x = 2\`, nhưng tính là **3 nghiệm** (bội 3). Định lý đếm theo bội, không đếm theo giá trị phân biệt.

❓ **Câu hỏi tự nhiên của người đọc**

- *"Vậy còn cần phát minh số nào cao hơn ℂ để giải đa thức không?"* **Không** — đó chính là điểm mạnh của định lý: ℂ đã đủ. Mọi đa thức hệ số phức đều phân tích hết được trong ℂ.
- *"Đa thức hệ số thực có thể có nghiệm phức không?"* Có (vd \`x²+1\`), nhưng chúng luôn đi theo **cặp liên hợp**, nên số nghiệm phức không-thực luôn chẵn.

🔁 **Dừng lại tự kiểm tra**

1. PT \`x³ + x = 0\` có mấy nghiệm trong ℂ? Liệt kê.
2. \`(x²+4)(x−1) = 0\` có mấy nghiệm?

<details><summary>Đáp án</summary>

1. Bậc 3 → 3 nghiệm. \`x(x²+1)=0\` → \`x = 0, i, −i\`.
2. Bậc 3 → 3 nghiệm: \`x = ±2i\` (từ x²+4=0) và \`x = 1\`.

</details>

### 📝 Tóm tắt mục 7

- Định lý Gauss: đa thức bậc n (hệ số phức) có **đúng n nghiệm** trong ℂ (đếm cả bội).
- ℂ "đóng đại số": không cần mở rộng số thêm để giải đa thức.
- Hệ số thực → nghiệm phức xuất hiện theo cặp liên hợp.

---

## 8. Bài tập

### Bài tập

**Bài 1**: Cho z = 4 - 3i. Tính Re(z), Im(z), |z|, z̄.

**Bài 2**: Tính (2+i)(3-2i).

**Bài 3**: Tính (1+i)/(1-i).

**Bài 4**: Giải x² + 9 = 0 trong ℂ.

**Bài 5**: Tính i^100.

### Lời giải

**Bài 1**: Re = 4, Im = -3, |z| = √(16+9) = **5**, z̄ = **4 + 3i**.

**Bài 2**: (2+i)(3-2i) = 6 - 4i + 3i - 2i² = 6 - i + 2 = **8 - i**.

**Bài 3**: Nhân tử mẫu với (1+i):  
- Tử: (1+i)² = 1 + 2i + i² = 2i.  
- Mẫu: (1-i)(1+i) = 2.  
- → **i**.

**Bài 4**: x² = -9 → x = ±√(-9) = **±3i**.

**Bài 5**: 100 = 4·25 → i^100 = (i^4)^25 = 1^25 = **1**.

---

## 9. Bài tiếp theo

[Lesson 06 — Dạng lượng giác & Euler](../lesson-06-complex-polar-euler/).

## 📝 Tổng kết

1. **i² = -1**. ℂ = {a + bi : a, b ∈ ℝ}.
2. **|z| = √(a²+b²)**, **z̄ = a - bi**, z·z̄ = |z|².
3. 4 phép toán: cộng/trừ theo phần thực/ảo, nhân phân phối với i² = -1, chia nhân liên hợp.
4. **Định lý đại số cơ bản**: PT bậc n có đúng n nghiệm trong ℂ.
`;
