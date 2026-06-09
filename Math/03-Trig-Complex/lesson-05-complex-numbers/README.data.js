// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: Math/03-Trig-Complex/lesson-05-complex-numbers/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 05 — Số phức

## Mục tiêu

- Hiểu **vì sao cần số phức** (giải được mọi PT đa thức).
- Định nghĩa **$i$**, dạng đại số $z = a + bi$.
- 4 phép toán: cộng, trừ, nhân, chia.
- **Mặt phẳng phức** Argand, **mô-đun**, **liên hợp**.

## Kiến thức tiền đề

- [Lesson 04 — PT bậc 2](../../01-Arithmetic-Algebra/lesson-04-quadratic-equations/) ($\\Delta < 0$).

---

## 1. Vì sao cần số phức?

💡 **Câu chuyện**: Toán phổ thông học rằng $x^2 + 1 = 0$ **vô nghiệm** trong $\\mathbb{R}$ (vì $x^2 \\ge 0$).

Nhưng các nhà toán học Ý thế kỷ 16 (Cardano, Bombelli) khi giải PT bậc 3 phát hiện: trong các bước trung gian, phải lấy căn của số âm — kể cả khi nghiệm cuối là số thực! Họ "phát minh" ra **$i$** với tính chất:

$$i^2 = -1$$

Lúc đầu coi là "ảo" (imaginary), nhưng hóa ra **$i$ thật sự có ý nghĩa hình học**: là phép quay 90° trong mặt phẳng (xem L08).

**Hệ quả**: Mọi PT đa thức bậc $n$ trong $\\mathbb{C}$ có **đúng $n$ nghiệm** (Định lý đại số cơ bản — Gauss).

❓ **Câu hỏi tự nhiên của người đọc**

- *"$i$ 'ảo' nghĩa là không có thật? Vậy học để làm gì?"* "Ảo" (imaginary) chỉ là cái tên lịch sử do người xưa nghi ngờ. $i$ **thật sự hữu dụng**: nó mô tả phép quay 90° (L06), dòng điện xoay chiều, sóng lượng tử. "Số thực" cũng là khái niệm trừu tượng do con người dựng nên không kém.
- *"Tại sao không định nghĩa $\\sqrt{-1}$ trực tiếp mà phải qua $i^2 = -1$?"* Vì ký hiệu $\\sqrt{\\phantom{x}}$ cho số âm gây mâu thuẫn (vd $\\sqrt{-1}\\cdot\\sqrt{-1}$ dễ ra $\\sqrt{1} = 1$ thay vì $-1$). Định nghĩa qua $i^2 = -1$ tránh được bẫy này.
- *"Có 'số phức của số phức' (cấp cao hơn) không?"* Có hướng mở rộng (quaternion 4 chiều, octonion 8 chiều), nhưng $\\mathbb{C}$ đã "đóng đại số" — đủ cho mọi PT đa thức, nên thường dừng ở $\\mathbb{C}$.

⚠ **Lỗi thường gặp — viết $\\sqrt{-4} = \\sqrt{4}\\cdot\\sqrt{-1} = 2i$ rồi áp luật $\\sqrt{a}\\cdot\\sqrt{b} = \\sqrt{ab}$ bừa bãi**. Luật $\\sqrt{a}\\cdot\\sqrt{b} = \\sqrt{ab}$ CHỈ đúng cho $a, b \\ge 0$. Phản ví dụ sai: $\\sqrt{-1}\\cdot\\sqrt{-1}$ nếu áp luật ra $\\sqrt{(-1)(-1)} = \\sqrt{1} = 1$, nhưng đúng phải là $i\\cdot i = i^2 = -1$. Khác dấu hoàn toàn.

🔁 **Dừng lại tự kiểm tra**

1. PT $x^2 + 1 = 0$ có nghiệm thực không? Có nghiệm phức không?
2. Theo định lý Gauss, PT bậc 5 có mấy nghiệm phức (kể cả bội)?

<details><summary>Đáp án</summary>

1. Không có nghiệm thực (vì $x^2 \\ge 0$). Có 2 nghiệm phức: $x = \\pm i$.
2. Đúng **5** nghiệm phức (đếm cả bội).

</details>

### 📝 Tóm tắt mục 1

- $\\mathbb{R}$ không giải được $x^2 + 1 = 0$; "phát minh" $i$ với $i^2 = -1$ để vá lỗ hổng đó.
- Nhờ $\\mathbb{C}$, mọi PT đa thức bậc $n$ có đúng $n$ nghiệm (định lý Gauss).
- $i$ không "huyền bí": nó là phép quay 90° và là công cụ cốt lõi của vật lý, kỹ thuật.

---

## 2. Định nghĩa

💡 **Trực giác / Hình dung**: coi số phức $a + bi$ như một **cặp toạ độ $(a, b)$** — phần thực đi ngang, phần ảo đi dọc. Số thực bình thường chỉ nằm trên một **trục** (1 chiều); số phức cho ta cả **mặt phẳng** (2 chiều). $i$ chính là "hướng đi lên" vuông góc với trục số thực.

**Số phức** là biểu thức dạng:

$$z = a + bi$$

- **$a$** = phần thực (real part), ký hiệu $\\operatorname{Re}(z)$.
- **$b$** = phần ảo (imaginary part), ký hiệu $\\operatorname{Im}(z)$.
- **$i$** = đơn vị ảo, $i^2 = -1$.

**Ví dụ**: $z = 3 + 4i$. $\\operatorname{Re}(z) = 3$, $\\operatorname{Im}(z) = 4$.

**Trường hợp đặc biệt**:
- $b = 0$: $z$ là số thực ($\\mathbb{R} \\subset \\mathbb{C}$).
- $a = 0$: $z$ là số thuần ảo (vd $5i$).

> 📐 **Định nghĩa đầy đủ — Số phức $\\mathbb{C}$**
>
> **(a) Là gì**: 1 cặp $(a, b)$ số thực, viết dưới dạng $a + bi$, với $i$ là 1 ký hiệu mới thoả **$i^2 = -1$**. Tập tất cả số phức = $\\mathbb{C}$. Số thực là trường hợp đặc biệt $b = 0$. Trên mặt phẳng Argand: $z = a+bi$ tương ứng điểm $(a, b)$.
>
> **(b) Vì sao tồn tại**: Trong $\\mathbb{R}$, PT $x^2 = -1$ vô nghiệm. Người ta "phát minh" $i$ với $i^2 = -1$ → mọi PT đa thức bậc $n$ có đủ $n$ nghiệm (Định lý đại số cơ bản — Gauss). Quan trọng hơn — $i$ sinh ra cấu trúc đại số "đầy đủ" và **mang ý nghĩa hình học thực** (xem L06: nhân với $i$ = quay 90°). Cốt lõi của: signal processing (Fourier), điện xoay chiều (phasor), cơ học lượng tử (hàm sóng phức).
>
> **(c) Ví dụ số**: $z = 3 + 4i$: $\\operatorname{Re}(z)=3$, $\\operatorname{Im}(z)=4$. Trên mặt phẳng → điểm $(3, 4)$. Mô-đun $|z| = \\sqrt{9+16} = 5$. Liên hợp $\\bar{z} = 3 - 4i$. $z\\cdot\\bar{z} = 9 + 16 = 25 = |z|^2$ ✓. $(1+i)\\cdot(1-i) = 1 - i + i - i^2 = 1 + 1 = 2$ (số thực!). $i^3 = i\\cdot i^2 = i\\cdot(-1) = $ **$-i$**. $i^4 = 1$. Giải $x^2 + 4 = 0$: $x^2 = -4 \\to x = \\pm 2i$.

**4 ví dụ số đa dạng**:
- Phần thực và ảo đều dương: $z = 2 + 5i$ → $\\operatorname{Re} = 2$, $\\operatorname{Im} = 5$.
- Thuần ảo: $z = -7i$ → $\\operatorname{Re} = 0$, $\\operatorname{Im} = -7$.
- Thuần thực: $z = 4$ (= $4 + 0i$) → $\\operatorname{Re} = 4$, $\\operatorname{Im} = 0$ (số thực là số phức đặc biệt).
- Phần ảo âm: $z = 3 - 2i$ → $\\operatorname{Re} = 3$, $\\operatorname{Im} = $ **$-2$** ($\\operatorname{Im}$ là số $-2$, KHÔNG kèm $i$).

⚠ **Lỗi thường gặp — coi $\\operatorname{Im}(z)$ gồm cả $i$**. Với $z = 3 - 2i$, $\\operatorname{Im}(z) = -2$ (một số thực), KHÔNG phải $-2i$. Phần ảo là **hệ số** của $i$, không kèm $i$. Phản ví dụ: nếu viết $\\operatorname{Im}(3-2i) = -2i$ thì khi tính $z = \\operatorname{Re} + \\operatorname{Im}\\cdot i$ sẽ ra $3 + (-2i)\\cdot i = 3 + 2$ — sai.

❓ **Câu hỏi tự nhiên của người đọc**

- *"Số phức có 'lớn hơn / nhỏ hơn' không?"* **Không** có thứ tự như số thực — không nói $2+3i > 1+i$ được. Chỉ so sánh **độ lớn** qua mô-đun $|z|$.
- *"Hai số phức bằng nhau khi nào?"* Khi **cả phần thực lẫn phần ảo** bằng nhau: $a+bi = c+di \\iff a=c$ VÀ $b=d$. Một PT số phức tương đương hai PT số thực.

🔁 **Dừng lại tự kiểm tra**

1. Cho $z = -5 + 2i$. $\\operatorname{Re}(z)$, $\\operatorname{Im}(z)$?
2. $z = 6$ là số phức không? $\\operatorname{Im}$ của nó?

<details><summary>Đáp án</summary>

1. $\\operatorname{Re}(z) = -5$, $\\operatorname{Im}(z) = 2$.
2. Có (mọi số thực đều là số phức). $\\operatorname{Im}(6) = 0$.

</details>

### 📝 Tóm tắt mục 2

- $z = a + bi$: $a = \\operatorname{Re}(z)$ (phần thực), $b = \\operatorname{Im}(z)$ (phần ảo, là số thực không kèm $i$).
- Số thực ($b=0$) và thuần ảo ($a=0$) là trường hợp đặc biệt.
- Hai số phức bằng nhau $\\iff$ bằng cả phần thực và phần ảo; không có thứ tự lớn/nhỏ.

---

## 3. Mặt phẳng phức (Argand)

💡 **Trực giác**: Coi $z = a + bi$ như **điểm $M(a, b)$** trên mặt phẳng. Trục hoành = phần thực, trục tung = phần ảo.

\`\`\`
   ●(3+4i)
   │
   │
   ●(2)        ●(5)            (trục thực)
   │
   ●(-3i)                       (trục ảo)
\`\`\`

**Mô-đun** (độ dài vector $OM$):

$$|z| = \\sqrt{a^2 + b^2}$$

**Liên hợp** (lật qua trục thực):

$$\\bar{z} = a - bi$$

**Tính chất**:
- $z \\cdot \\bar{z} = (a+bi)(a-bi) = a^2 + b^2 = |z|^2$.
- $z + \\bar{z} = 2a = 2\\cdot\\operatorname{Re}(z)$.
- $z - \\bar{z} = 2bi$.

**Verify bằng số ($z = 3 + 4i$)**: $|z| = \\sqrt{3^2+4^2} = \\sqrt{25} = 5$. $\\bar{z} = 3 - 4i$. $z\\cdot\\bar{z} = (3+4i)(3-4i) = 9 - 12i + 12i - 16i^2 = 9 + 16 = 25 = |z|^2$ ✓. $z + \\bar{z} = 6 = 2\\cdot\\operatorname{Re}(z)$ ✓. $z - \\bar{z} = 8i = 2\\cdot(4)i$ ✓.

⚠ **Lỗi thường gặp — tính mô-đun thiếu bình phương hoặc cộng nhầm**. $|a+bi| = \\sqrt{a^2+b^2}$, KHÔNG phải $a + b$ hay $\\sqrt{a+b}$. Phản ví dụ: $|3+4i|$ đúng là $\\sqrt{9+16}=5$; nếu tính $3+4=7$ hay $\\sqrt{3+4}=\\sqrt{7}\\approx 2.65$ đều sai.

❓ **Câu hỏi tự nhiên của người đọc**

- *"Liên hợp $\\bar{z}$ có ý nghĩa hình học gì?"* Là **ảnh qua gương** của $z$ qua trục thực (trục hoành): điểm $(a, b) \\to (a, -b)$. Giữ phần thực, lật dấu phần ảo.
- *"Vì sao $z\\cdot\\bar{z}$ luôn là số thực không âm?"* Vì $= a^2 + b^2 = |z|^2$. Đây chính là mẹo để "khử ảo" ở mẫu khi chia (mục 4.3).

🔁 **Dừng lại tự kiểm tra**

1. Cho $z = -1 + 2i$. Tính $|z|$ và $\\bar{z}$.
2. $z\\cdot\\bar{z}$ của $z = 5i$ bằng mấy?

<details><summary>Đáp án</summary>

1. $|z| = \\sqrt{(-1)^2+2^2} = \\sqrt{5}$. $\\bar{z} = -1 - 2i$.
2. $z = 0 + 5i$, $\\bar{z} = -5i$ → $z\\cdot\\bar{z} = 25$ (= $|z|^2 = 5^2 = 25$).

</details>

### 📝 Tóm tắt mục 3

- $z = a+bi \\leftrightarrow$ điểm $(a, b)$ trên mặt phẳng Argand (trục x thực, trục y ảo).
- $|z| = \\sqrt{a^2+b^2}$ (độ dài vector); $\\bar{z} = a - bi$ (lật qua trục thực).
- $z\\cdot\\bar{z} = |z|^2$ (luôn thực $\\ge 0$) — mẹo khử ảo ở mẫu.

---

## 4. Bốn phép toán

💡 **Trực giác / Hình dung**: làm số phức **y hệt làm đa thức** theo biến $i$, với một luật phụ duy nhất: $i^2 = -1$. Cộng/trừ = gộp các hạng tử cùng loại (thực với thực, ảo với ảo). Nhân = phân phối (FOIL) rồi thay $i^2$ bằng $-1$. Chia = "khử ảo ở mẫu" bằng liên hợp, giống hữu tỉ hóa mẫu căn. Không có gì mới ngoài $i^2 = -1$.

### 4.1. Cộng / trừ

$$\\begin{aligned}
(a + bi) + (c + di) &= (a+c) + (b+d)i \\\\
(a + bi) - (c + di) &= (a-c) + (b-d)i
\\end{aligned}$$

**Ví dụ**: $(3+2i) + (1-4i) =$ **$4 - 2i$**.

💡 **Hình học**: Cộng số phức = **cộng vector**.

### 4.2. Nhân

Phân phối, dùng $i^2 = -1$:

$$(a+bi)(c+di) = ac + adi + bci + bd\\cdot i^2 = (ac - bd) + (ad + bc)i$$

**Ví dụ**: $(3+2i)(1-4i) = 3 - 12i + 2i - 8i^2 = 3 - 10i + 8 =$ **$11 - 10i$**.

⚠ **Lỗi thường gặp**: Quên $i^2 = -1$, để nguyên $8i^2$ → kết quả sai $3 - 10i$ thay vì $11 - 10i$.

### 4.3. Chia

**Mẹo**: Nhân tử và mẫu với liên hợp của mẫu (để mẫu thành số thực).

$$\\frac{a+bi}{c+di} = \\frac{(a+bi)(c-di)}{(c+di)(c-di)} = \\frac{(a+bi)(c-di)}{c^2+d^2}$$

**Ví dụ**: $\\dfrac{3+2i}{1+i}$.
- Nhân với $(1-i)$:
- Tử: $(3+2i)(1-i) = 3 - 3i + 2i - 2i^2 = 3 - i + 2 = 5 - i$.
- Mẫu: $(1+i)(1-i) = 1^2 + 1^2 = 2$.
- → **$\\dfrac{5-i}{2} = \\dfrac{5}{2} - \\dfrac{1}{2}i$**.

❓ **Câu hỏi tự nhiên của người đọc**

- *"Vì sao nhân tử & mẫu với liên hợp lại khử được ảo ở mẫu?"* Vì $(c+di)(c-di) = c^2 + d^2$ — luôn là số **thực** (theo $z\\cdot\\bar{z} = |z|^2$). Mẫu thành thực thì kết quả tách được phần thực/ảo rõ ràng.
- *"Cộng số phức có ý nghĩa hình học gì?"* Là **cộng vector**: nối hai mũi tên đầu-đuôi (quy tắc hình bình hành). Nhân thì là quay + co giãn (xem L06).

🔁 **Dừng lại tự kiểm tra**

1. Tính $(2 + 3i) + (4 - i)$ và $(2 + 3i)(4 - i)$.
2. Tính $\\dfrac{2 + i}{1 - i}$.

<details><summary>Đáp án</summary>

1. Cộng: $6 + 2i$. Nhân: $8 - 2i + 12i - 3i^2 = 8 + 10i + 3 = 11 + 10i$.
2. Nhân tử & mẫu với $(1+i)$: tử $(2+i)(1+i) = 2 + 2i + i + i^2 = 1 + 3i$; mẫu $(1-i)(1+i) = 2$ → $\\dfrac{1+3i}{2} = \\dfrac{1}{2} + \\dfrac{3}{2}i$.

</details>

### 📝 Tóm tắt mục 4

- Cộng/trừ: gộp phần thực với thực, ảo với ảo.
- Nhân: phân phối (FOIL) rồi thay $i^2 = -1$ (đừng quên bước này).
- Chia: nhân tử & mẫu với **liên hợp mẫu** để mẫu thành thực.

---

## 5. Lũy thừa của i

💡 **Trực giác / Hình dung**: nhân với $i$ = **quay 90°** trên mặt phẳng. Bắt đầu từ 1 (hướng phải): quay 90° → $i$ (lên), quay tiếp → $-1$ (trái), quay tiếp → $-i$ (xuống), quay tiếp → $1$ (về chỗ cũ). Cứ 4 lần quay = 1 vòng đầy → lũy thừa của i lặp lại chu kỳ 4.

| n | $i^n$ |
|---|-----|
| 0 | $1$ |
| 1 | $i$ |
| 2 | $-1$ |
| 3 | $-i$ |
| 4 | $1$ |
| 5 | $i$ |
| ... | tuần hoàn chu kỳ 4 |

⟶ **$i^n = i^{n \\bmod 4}$**.

**Ví dụ**: $i^{2023} = i^{2023 \\bmod 4} = i^3 =$ **$-i$**.

**4 ví dụ số đa dạng**:
- $i^6 = i^{6 \\bmod 4} = i^2 = -1$.
- $i^{12} = i^{12 \\bmod 4} = i^0 = 1$ (bội của 4 → 1).
- $i^{25} = i^{25 \\bmod 4} = i^1 = i$.
- $i^{-1} = \\dfrac{1}{i} = \\dfrac{1}{i}\\cdot\\dfrac{i}{i}\\cdot(-1)\\ldots$ thực ra $i^{-1} = i^3 = -i$ (vì $i\\cdot(-i) = -i^2 = 1$).

⚠ **Lỗi thường gặp — tính $n \\bmod 4$ sai với số có thể chia hết**. Nếu $n$ chia hết cho 4 thì $i^n = 1$ (không phải i). Phản ví dụ: $i^{100}$: $100 \\bmod 4 = 0$ → $i^0 = 1$. Người mới hay nhầm ra $i$.

❓ **Câu hỏi tự nhiên của người đọc**

- *"$i$ mũ âm tính sao?"* Dùng chu kỳ 4 luôn: $i^{-n} = i^{(-n) \\bmod 4}$. Vd $i^{-2} = i^2 = -1$ (vì $-2 \\equiv 2 \\bmod 4$). Hoặc $i^{-n} = \\dfrac{1}{i^n}$.
- *"Vì sao chu kỳ đúng bằng 4, không phải 2?"* Vì một vòng quay đầy (360°) cần 4 lần quay 90°. Sau 2 lần ($i^2=-1$) chưa về chỗ cũ.

🔁 **Dừng lại tự kiểm tra**

1. $i^{50} = ?$
2. $i^7 + i^5 = ?$

<details><summary>Đáp án</summary>

1. $50 \\bmod 4 = 2$ → $i^{50} = i^2 = -1$.
2. $i^7 = i^3 = -i$; $i^5 = i^1 = i$ → tổng $-i + i = 0$.

</details>

### 📝 Tóm tắt mục 5

- $i^n$ tuần hoàn chu kỳ 4: $1, i, -1, -i, 1, \\ldots$ → $i^n = i^{n \\bmod 4}$.
- Nhân với i = quay 90° ngược kim đồng hồ.
- n chia hết cho 4 → $i^n = 1$ (đừng nhầm ra i).

---

## 6. PT bậc 2 với Δ < 0

💡 **Trực giác / Hình dung**: ở Tier 1, khi $\\Delta < 0$ ta kết luận "vô nghiệm" — vì không lấy được căn của số âm trong $\\mathbb{R}$. Nay với $i$, $\\sqrt{-36} = 6i$ có nghĩa, nên công thức nghiệm $x = \\dfrac{-b \\pm \\sqrt{\\Delta}}{2a}$ vẫn chạy, chỉ cho ra **nghiệm phức**. Hai nghiệm luôn **liên hợp** của nhau (gương nhau qua trục thực).

Trước đây vô nghiệm. Nay luôn có 2 nghiệm phức.

**Ví dụ**: $x^2 + 4x + 13 = 0$. $\\Delta = 16 - 52 = -36$.
- $\\sqrt{\\Delta} = \\sqrt{-36} = 6i$.
- $x = \\dfrac{-4 \\pm 6i}{2} =$ **$-2 \\pm 3i$**.

**Kiểm tra**: $(-2+3i)^2 + 4(-2+3i) + 13 = 4 - 12i - 9 - 8 + 12i + 13 = 0$ ✓.

⚠ **Lỗi thường gặp — viết $\\sqrt{-36} = \\pm 6i$ rồi lại đặt thêm ± trong công thức**. Trong công thức nghiệm đã có sẵn dấu $\\pm$ trước căn: $x = \\dfrac{-b \\pm \\sqrt{|\\Delta|}\\cdot i}{2a}$. Lấy $\\sqrt{36} = 6$ (dương) rồi gắn $i$, dấu ± do công thức lo. Phản ví dụ nếu nhân đôi dấu: dễ tạo 4 "nghiệm" sai thay vì 2.

❓ **Câu hỏi tự nhiên của người đọc**

- *"Vì sao hai nghiệm luôn liên hợp khi hệ số là số thực?"* Vì $\\sqrt{\\Delta}$ đi với $\\pm$, một nghiệm $+$, một $-$ phần ảo → $p + qi$ và $p - qi$. Định lý: đa thức hệ số thực có nghiệm phức thì nghiệm liên hợp cũng là nghiệm.
- *"Tổng và tích hai nghiệm phức có còn theo Vieta không?"* Còn nguyên. Vd ở trên: tổng $(-2+3i)+(-2-3i) = -4 = -\\dfrac{b}{a}$ ✓; tích $(-2)^2+3^2 = 13 = \\dfrac{c}{a}$ ✓.

🔁 **Dừng lại tự kiểm tra**

1. Giải $x^2 + 2x + 5 = 0$ trong $\\mathbb{C}$.
2. Hai nghiệm đó có liên hợp nhau không?

<details><summary>Đáp án</summary>

1. $\\Delta = 4 - 20 = -16$ → $\\sqrt{\\Delta} = 4i$ → $x = \\dfrac{-2 \\pm 4i}{2} = -1 \\pm 2i$.
2. Có: $-1+2i$ và $-1-2i$ là cặp liên hợp.

</details>

### 📝 Tóm tắt mục 6

- $\\Delta < 0$: $\\sqrt{\\Delta} = \\sqrt{|\\Delta|}\\cdot i$, công thức nghiệm cho 2 nghiệm phức.
- Hệ số thực → hai nghiệm là **cặp liên hợp** $p \\pm qi$.
- Vieta (tổng $-\\dfrac{b}{a}$, tích $\\dfrac{c}{a}$) vẫn đúng trong $\\mathbb{C}$.

---

## 7. Định lý đại số cơ bản

💡 **Trực giác / Hình dung**: trong $\\mathbb{R}$, "lên đa thức bậc cao thì có khi không đủ nghiệm" (vd $x^2+1$ 0 nghiệm, $x^4+1$ 0 nghiệm thực). $\\mathbb{C}$ "vá" mọi lỗ hổng: hễ bậc n thì **luôn đúng n nghiệm**, không thừa không thiếu. Đó là nghĩa của "đóng đại số" — không cần phát minh thêm loại số nào nữa để giải đa thức.

**Phát biểu**: Mọi PT đa thức bậc $n \\ge 1$ với hệ số phức **có đúng n nghiệm phức** (đếm cả bội).

⟶ $\\mathbb{C}$ là "đóng" cho đại số. Đó là lý do số phức quan trọng dù "ảo" — chúng làm cho hệ thống số hoàn chỉnh.

**4 ví dụ số minh họa "đủ n nghiệm"**:
- $x^2 + 1 = 0$ (bậc 2) → 2 nghiệm: $\\pm i$.
- $x^2 - 2x + 1 = 0$ (bậc 2) → $(x-1)^2 = 0$ → nghiệm $x = 1$ **bội 2** (đếm là 2 nghiệm).
- $x^3 - 1 = 0$ (bậc 3) → 3 nghiệm: $1$, $-\\dfrac{1}{2} \\pm \\dfrac{\\sqrt{3}}{2}i$ (căn bậc 3 của 1, xem L07).
- $x^4 - 1 = 0$ (bậc 4) → 4 nghiệm: $1, -1, i, -i$.

⚠ **Lỗi thường gặp — quên "đếm cả bội"**. $(x-2)^3 = 0$ chỉ có một **giá trị** nghiệm $x = 2$, nhưng tính là **3 nghiệm** (bội 3). Định lý đếm theo bội, không đếm theo giá trị phân biệt.

❓ **Câu hỏi tự nhiên của người đọc**

- *"Vậy còn cần phát minh số nào cao hơn $\\mathbb{C}$ để giải đa thức không?"* **Không** — đó chính là điểm mạnh của định lý: $\\mathbb{C}$ đã đủ. Mọi đa thức hệ số phức đều phân tích hết được trong $\\mathbb{C}$.
- *"Đa thức hệ số thực có thể có nghiệm phức không?"* Có (vd $x^2+1$), nhưng chúng luôn đi theo **cặp liên hợp**, nên số nghiệm phức không-thực luôn chẵn.

🔁 **Dừng lại tự kiểm tra**

1. PT $x^3 + x = 0$ có mấy nghiệm trong $\\mathbb{C}$? Liệt kê.
2. $(x^2+4)(x-1) = 0$ có mấy nghiệm?

<details><summary>Đáp án</summary>

1. Bậc 3 → 3 nghiệm. $x(x^2+1)=0$ → $x = 0, i, -i$.
2. Bậc 3 → 3 nghiệm: $x = \\pm 2i$ (từ $x^2+4=0$) và $x = 1$.

</details>

### 📝 Tóm tắt mục 7

- Định lý Gauss: đa thức bậc n (hệ số phức) có **đúng n nghiệm** trong $\\mathbb{C}$ (đếm cả bội).
- $\\mathbb{C}$ "đóng đại số": không cần mở rộng số thêm để giải đa thức.
- Hệ số thực → nghiệm phức xuất hiện theo cặp liên hợp.

---

## 8. Bài tập

### Bài tập

**Bài 1**: Cho $z = 4 - 3i$. Tính $\\operatorname{Re}(z)$, $\\operatorname{Im}(z)$, $|z|$, $\\bar{z}$.

**Bài 2**: Tính $(2+i)(3-2i)$.

**Bài 3**: Tính $\\dfrac{1+i}{1-i}$.

**Bài 4**: Giải $x^2 + 9 = 0$ trong $\\mathbb{C}$.

**Bài 5**: Tính $i^{100}$.

### Lời giải

**Bài 1**: $\\operatorname{Re} = 4$, $\\operatorname{Im} = -3$, $|z| = \\sqrt{16+9} =$ **$5$**, $\\bar{z} =$ **$4 + 3i$**.

**Bài 2**: $(2+i)(3-2i) = 6 - 4i + 3i - 2i^2 = 6 - i + 2 =$ **$8 - i$**.

**Bài 3**: Nhân tử mẫu với $(1+i)$:  
- Tử: $(1+i)^2 = 1 + 2i + i^2 = 2i$.  
- Mẫu: $(1-i)(1+i) = 2$.  
- → **$i$**.

**Bài 4**: $x^2 = -9$ → $x = \\pm\\sqrt{-9} =$ **$\\pm 3i$**.

**Bài 5**: $100 = 4\\cdot 25$ → $i^{100} = (i^4)^{25} = 1^{25} =$ **$1$**.

---

## 9. Bài tiếp theo

[Lesson 06 — Dạng lượng giác & Euler](../lesson-06-complex-polar-euler/).

## 📝 Tổng kết

1. **$i^2 = -1$**. $\\mathbb{C} = \\{a + bi : a, b \\in \\mathbb{R}\\}$.
2. **$|z| = \\sqrt{a^2+b^2}$**, **$\\bar{z} = a - bi$**, $z\\cdot\\bar{z} = |z|^2$.
3. 4 phép toán: cộng/trừ theo phần thực/ảo, nhân phân phối với $i^2 = -1$, chia nhân liên hợp.
4. **Định lý đại số cơ bản**: PT bậc n có đúng n nghiệm trong $\\mathbb{C}$.
`;
