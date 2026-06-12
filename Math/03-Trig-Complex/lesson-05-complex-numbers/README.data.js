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

💡 **Trực giác**: Coi $z = a + bi$ như **điểm $M(a, b)$** trên mặt phẳng. Trục hoành = phần thực, trục tung = phần ảo. Mỗi số phức **vừa là điểm vừa là mũi tên (vector)** từ gốc $O$ tới điểm đó — cách nhìn "mũi tên" giúp hiểu phép cộng (nối vector) và phép nhân (quay + co giãn, L06).

Trục hoành (Re) chứa các số thực thuần ($b=0$); trục tung (Im) chứa số thuần ảo ($a=0$). Bốn số phức $3+4i$, $-2+i$, $-3i$, $4$ đặt lên mặt phẳng Argand:

\`\`\`
                    Im (trục ảo)
                     ↑
                   4 +        ● 3+4i
                     |       ╱:
                   3 +      ╱ :
                     |     ╱  :
        ● -2+i     2 +    ╱   :
          ╲          |   ╱    :
         1 +●··········  ╱     :         |z|=5 (độ dài mũi tên OM)
            ╲        | ╱      :
  ──────┼────┼────┼──O────┼────┼────┼──→ Re (trục thực)
       -3   -2   -1   |  1   2   3  4 ●(số thực 4)
                      |              :
                   -1 +              :
                      |              :
                   -2 +              :
                      |              :
                   -3 +              ● -3i (thuần ảo)
                      |
\`\`\`

- $3+4i$ → điểm $(3,4)$, góc phần tư I (cả Re lẫn Im dương).
- $-2+i$ → điểm $(-2,1)$, góc phần tư II.
- $-3i = 0-3i$ → điểm $(0,-3)$, nằm trên trục ảo (đi xuống).
- $4 = 4+0i$ → điểm $(4,0)$, nằm trên trục thực (số thực bình thường).

**Mô-đun** (độ dài vector $OM$):

$$|z| = \\sqrt{a^2 + b^2}$$

💡 **Vì sao là $\\sqrt{a^2+b^2}$?** Vì $z=a+bi \\leftrightarrow$ điểm $(a,b)$, và độ dài đoạn từ gốc $O(0,0)$ tới $(a,b)$ chính là **định lý Pythagoras**: cạnh ngang $a$, cạnh dọc $b$, cạnh huyền $\\sqrt{a^2+b^2}$. Mô-đun đo "$z$ ở xa gốc bao nhiêu", luôn là số thực $\\ge 0$.

**Liên hợp** (lật qua trục thực):

$$\\bar{z} = a - bi$$

**Tính chất**:
- $z \\cdot \\bar{z} = (a+bi)(a-bi) = a^2 + b^2 = |z|^2$.
- $z + \\bar{z} = 2a = 2\\cdot\\operatorname{Re}(z)$.
- $z - \\bar{z} = 2bi$.
- $\\overline{\\bar{z}} = z$ (liên hợp hai lần về chỗ cũ — lật gương hai lần).
- $|\\bar{z}| = |z|$ (gương không đổi độ dài), $|z\\cdot w| = |z|\\cdot|w|$, $\\overline{z\\cdot w} = \\bar{z}\\cdot\\bar{w}$.

**Verify bằng số ($z = 3 + 4i$)**: $|z| = \\sqrt{3^2+4^2} = \\sqrt{25} = 5$. $\\bar{z} = 3 - 4i$. $z\\cdot\\bar{z} = (3+4i)(3-4i) = 9 - 12i + 12i - 16i^2 = 9 + 16 = 25 = |z|^2$ ✓. $z + \\bar{z} = 6 = 2\\cdot\\operatorname{Re}(z)$ ✓. $z - \\bar{z} = 8i = 2\\cdot(4)i$ ✓.

#### 3.1. Walk-through mô-đun |z| — 4 ví dụ đa dạng

| $z$ | $a$ | $b$ | $a^2+b^2$ | $\\lvert z\\rvert=\\sqrt{a^2+b^2}$ |
|-----|-----|-----|-----------|----------------|
| $3+4i$ | $3$ | $4$ | $9+16=25$ | $\\sqrt{25}=\\mathbf{5}$ |
| $-5+12i$ | $-5$ | $12$ | $25+144=169$ | $\\sqrt{169}=\\mathbf{13}$ |
| $-3i$ (thuần ảo) | $0$ | $-3$ | $0+9=9$ | $\\sqrt{9}=\\mathbf{3}$ |
| $1+i$ | $1$ | $1$ | $1+1=2$ | $\\sqrt{2}\\approx\\mathbf{1.414}$ |

Lưu ý ví dụ thứ 3: với $z=-3i$, $a=0$ và $b=-3$ → $|z| = \\sqrt{0+(-3)^2} = 3$. Dấu của $b$ **không** ảnh hưởng tới mô-đun vì bị bình phương. Tương tự $|3|=3$ với số thực thuần $z=3+0i$ → trùng giá trị tuyệt đối thông thường (mô-đun là **mở rộng** của trị tuyệt đối lên mặt phẳng).

#### 3.2. Walk-through liên hợp z̄ — 4 ví dụ

| $z$ | $\\bar{z}=a-bi$ | Hình học (lật qua trục thực) |
|-----|----------------|------------------------------|
| $3+4i$ | $3-4i$ | $(3,4)\\to(3,-4)$ |
| $-2+5i$ | $-2-5i$ | $(-2,5)\\to(-2,-5)$ |
| $6i$ ($=0+6i$) | $-6i$ | $(0,6)\\to(0,-6)$ |
| $7$ ($=7+0i$) | $7$ | $(7,0)\\to(7,0)$ — số thực **bất biến** |

Ví dụ cuối quan trọng: liên hợp của một **số thực thuần** là chính nó ($\\bar{z}=z \\iff z$ là số thực). Lý do hình học: điểm nằm sẵn trên trục thực, lật qua trục thực không di chuyển.

#### 3.3. Nghịch đảo $z^{-1} = \\dfrac{1}{z}$ — walk-through 3 ví dụ

💡 **Trực giác**: nghịch đảo của $z$ là số $w$ sao cho $z\\cdot w = 1$. Công thức suy ra trực tiếp từ "$z\\cdot\\bar{z}=|z|^2$": chia cả hai vế cho $|z|^2$ → $z\\cdot\\dfrac{\\bar{z}}{|z|^2}=1$, nên:

$$z^{-1} = \\frac{1}{z} = \\frac{\\bar{z}}{|z|^2} = \\frac{a - bi}{a^2 + b^2}$$

Quy trình: lấy liên hợp $\\bar{z}$ làm tử, mô-đun-bình-phương $a^2+b^2$ làm mẫu (mẫu giờ là số thực).

**Ví dụ 1**: $z = 3 + 4i$. $|z|^2 = 9+16 = 25$, $\\bar{z}=3-4i$.
$$z^{-1} = \\frac{3-4i}{25} = \\frac{3}{25} - \\frac{4}{25}i$$
**Kiểm tra**: $z\\cdot z^{-1} = (3+4i)\\cdot\\dfrac{3-4i}{25} = \\dfrac{9+16}{25} = \\dfrac{25}{25} = 1$ ✓.

**Ví dụ 2**: $z = i$. $|z|^2 = 0^2+1^2 = 1$, $\\bar{z} = -i$.
$$z^{-1} = \\frac{-i}{1} = -i$$
**Kiểm tra**: $i\\cdot(-i) = -i^2 = -(-1) = 1$ ✓. (Khớp với $i^{-1}=i^3=-i$ ở mục 5.)

**Ví dụ 3**: $z = 1 - 2i$. $|z|^2 = 1+4 = 5$, $\\bar{z} = 1+2i$.
$$z^{-1} = \\frac{1+2i}{5} = \\frac{1}{5} + \\frac{2}{5}i$$
**Kiểm tra**: $(1-2i)\\cdot\\dfrac{1+2i}{5} = \\dfrac{(1-2i)(1+2i)}{5} = \\dfrac{1+4}{5} = 1$ ✓.

⚠ **Lỗi thường gặp — tính mô-đun thiếu bình phương hoặc cộng nhầm**. $|a+bi| = \\sqrt{a^2+b^2}$, KHÔNG phải $a + b$ hay $\\sqrt{a+b}$. Phản ví dụ: $|3+4i|$ đúng là $\\sqrt{9+16}=5$; nếu tính $3+4=7$ hay $\\sqrt{3+4}=\\sqrt{7}\\approx 2.65$ đều sai.

⚠ **Lỗi thường gặp — nhầm $\\lvert z\\rvert$ (số thực) với $z$ (số phức)**. Mô-đun $|z|$ là **một số thực** (độ dài), không còn phần ảo. Với $z=3+4i$, $|z|=5$ — không viết $|z|=5+0i$ rồi tiếp tục coi như số phức để cộng phần ảo. Tương tự đừng nhầm $|z|^2$ (số thực $a^2+b^2$) với $z^2$ (số phức $(a+bi)^2$): với $z=3+4i$, $|z|^2=25$ nhưng $z^2 = 9+24i-16 = -7+24i$ — khác hoàn toàn.

❓ **Câu hỏi tự nhiên của người đọc**

- *"Liên hợp $\\bar{z}$ có ý nghĩa hình học gì?"* Là **ảnh qua gương** của $z$ qua trục thực (trục hoành): điểm $(a, b) \\to (a, -b)$. Giữ phần thực, lật dấu phần ảo.
- *"Vì sao $z\\cdot\\bar{z}$ luôn là số thực không âm?"* Vì $= a^2 + b^2 = |z|^2$. Đây chính là mẹo để "khử ảo" ở mẫu khi chia (mục 4.3).
- *"Số phức nào KHÔNG có nghịch đảo?"* Chỉ **$z = 0$** — vì $|z|^2 = 0$ làm mẫu bằng 0. Mọi $z \\neq 0$ đều có nghịch đảo duy nhất. (Đây là tính chất "trường" — field — của $\\mathbb{C}$, giống $\\mathbb{R}$.)
- *"Khi nào $\\bar{z} = z^{-1}$?"* Khi $|z|^2 = 1$, tức $z$ nằm trên **đường tròn đơn vị** (mô-đun bằng 1). Vd $z=i$: $\\bar{z}=-i=z^{-1}$ ✓.

🔁 **Dừng lại tự kiểm tra**

1. Cho $z = -1 + 2i$. Tính $|z|$ và $\\bar{z}$.
2. $z\\cdot\\bar{z}$ của $z = 5i$ bằng mấy?
3. Tính nghịch đảo của $z = 2 + i$, rồi kiểm tra $z\\cdot z^{-1} = 1$.

<details><summary>Đáp án</summary>

1. $|z| = \\sqrt{(-1)^2+2^2} = \\sqrt{5}$. $\\bar{z} = -1 - 2i$.
2. $z = 0 + 5i$, $\\bar{z} = -5i$ → $z\\cdot\\bar{z} = 25$ (= $|z|^2 = 5^2 = 25$).
3. $|z|^2 = 4+1 = 5$, $\\bar{z}=2-i$ → $z^{-1} = \\dfrac{2-i}{5} = \\dfrac{2}{5} - \\dfrac{1}{5}i$. Kiểm tra: $(2+i)\\dfrac{2-i}{5} = \\dfrac{4+1}{5} = 1$ ✓.

</details>

### 📝 Tóm tắt mục 3

- $z = a+bi \\leftrightarrow$ điểm $(a, b)$ trên mặt phẳng Argand (trục x thực, trục y ảo); cũng là vector $OM$.
- $|z| = \\sqrt{a^2+b^2}$ (độ dài vector, Pythagoras); $\\bar{z} = a - bi$ (lật gương qua trục thực).
- $z\\cdot\\bar{z} = |z|^2$ (luôn thực $\\ge 0$) — mẹo khử ảo ở mẫu.
- Nghịch đảo $z^{-1} = \\dfrac{\\bar{z}}{|z|^2}$; mọi $z\\neq 0$ đều có nghịch đảo, chỉ $z=0$ thì không.
- $|z|$ là **số thực**, đừng nhầm với $z$; $|z|^2$ (thực) khác $z^2$ (phức).

---

## 4. Bốn phép toán

💡 **Trực giác / Hình dung**: làm số phức **y hệt làm đa thức** theo biến $i$, với một luật phụ duy nhất: $i^2 = -1$. Cộng/trừ = gộp các hạng tử cùng loại (thực với thực, ảo với ảo). Nhân = phân phối (FOIL) rồi thay $i^2$ bằng $-1$. Chia = "khử ảo ở mẫu" bằng liên hợp, giống hữu tỉ hóa mẫu căn. Không có gì mới ngoài $i^2 = -1$.

### 4.1. Cộng / trừ

$$\\begin{aligned}
(a + bi) + (c + di) &= (a+c) + (b+d)i \\\\
(a + bi) - (c + di) &= (a-c) + (b-d)i
\\end{aligned}$$

**Ví dụ**: $(3+2i) + (1-4i) =$ **$4 - 2i$**.

💡 **Hình học**: Cộng số phức = **cộng vector** (quy tắc hình bình hành — nối hai mũi tên đầu-đuôi). Ví dụ $(3+i)+(1+2i)=4+3i$: đi từ $O$ tới $(3,1)$, rồi tiếp tục đi thêm $(1,2)$ → tới $(4,3)$.

\`\`\`
        Im
         ↑
       3 +              ● 4+3i (tổng)
         |            ╱ ↑
       2 +      ● 1+2i  | (dịch thêm 1+2i từ điểm 3+i)
         |    ╱        |
       1 +  ╱      ●───┘ 3+i
         |╱       ╱
  ───────O───────────────→ Re
         |   1   3   4
\`\`\`

**4 ví dụ số đa dạng (cộng/trừ)**:

| Phép | Phần thực | Phần ảo | Kết quả |
|------|-----------|---------|---------|
| $(3+2i)+(1-4i)$ | $3+1=4$ | $2+(-4)=-2$ | $\\mathbf{4-2i}$ |
| $(-2+5i)+(6-5i)$ | $-2+6=4$ | $5+(-5)=0$ | $\\mathbf{4}$ (thuần thực!) |
| $(7-3i)-(2+4i)$ | $7-2=5$ | $-3-4=-7$ | $\\mathbf{5-7i}$ |
| $(4i)-(4i)$ | $0-0=0$ | $4-4=0$ | $\\mathbf{0}$ |

Ví dụ thứ 2 minh họa: $(z)+(\\bar z$-kiểu) có thể triệt tiêu phần ảo → ra số thực. Cụ thể tổng của một cặp liên hợp luôn thực: $(a+bi)+(a-bi)=2a$.

### 4.2. Nhân

Phân phối (FOIL), dùng $i^2 = -1$:

$$(a+bi)(c+di) = ac + adi + bci + bd\\cdot i^2 = (ac - bd) + (ad + bc)i$$

**Ví dụ**: $(3+2i)(1-4i) = 3 - 12i + 2i - 8i^2 = 3 - 10i + 8 =$ **$11 - 10i$**.

**4 ví dụ số đa dạng (nhân) — bám từng bước FOIL**:

1. $(2+3i)(1+2i) = 2 + 4i + 3i + 6i^2 = 2 + 7i - 6 = \\mathbf{-4 + 7i}$. (Bốn tích F-O-I-L: $2\\cdot1$, $2\\cdot2i$, $3i\\cdot1$, $3i\\cdot2i=6i^2$.)
2. $(1+i)(1-i) = 1 - i + i - i^2 = 1 + 1 = \\mathbf{2}$ (thuần thực — chính là $z\\bar z$ với $z=1+i$, bằng $|z|^2=2$).
3. $(2+3i)^2 = (2+3i)(2+3i) = 4 + 12i + 9i^2 = 4 + 12i - 9 = \\mathbf{-5 + 12i}$ (bình phương: nhớ $9i^2=-9$).
4. $(-1+i)(3-2i) = -3 + 2i + 3i - 2i^2 = -3 + 5i + 2 = \\mathbf{-1 + 5i}$.

⚠ **Lỗi thường gặp — quên $i^2 = -1$**. Để nguyên $8i^2$ ở ví dụ đầu → ra sai $3 - 10i$ thay vì $11 - 10i$. Bước "thay $i^2=-1$" làm thay đổi **phần thực** (chuyển $+bd\\cdot i^2$ thành $-bd$), nên quên là sai luôn cả phần thực. Phản ví dụ ở $(2+3i)^2$: nếu giữ $9i^2$ thì ra $4+12i+9i^2$ và đọc nhầm là $4+9=13$ cộng $12i$ → sai; đúng phải là $4-9=-5$.

### 4.3. Chia

**Mẹo**: Nhân tử và mẫu với **liên hợp của mẫu** (để mẫu thành số thực — đúng cơ chế "khử ảo" giống hữu tỉ hóa mẫu căn ở Tier 1).

$$\\frac{a+bi}{c+di} = \\frac{(a+bi)(c-di)}{(c+di)(c-di)} = \\frac{(a+bi)(c-di)}{c^2+d^2}$$

**Ví dụ (mẫu)**: $\\dfrac{3+2i}{1+i}$.
- Nhân tử & mẫu với liên hợp mẫu $(1-i)$:
- Tử: $(3+2i)(1-i) = 3 - 3i + 2i - 2i^2 = 3 - i + 2 = 5 - i$.
- Mẫu: $(1+i)(1-i) = 1^2 + 1^2 = 2$.
- → **$\\dfrac{5-i}{2} = \\dfrac{5}{2} - \\dfrac{1}{2}i$**.

**4 ví dụ số đa dạng (chia) — luôn nhân liên hợp mẫu**:

1. $\\dfrac{1}{2+i}$: liên hợp mẫu $2-i$. Tử $1\\cdot(2-i)=2-i$; mẫu $(2+i)(2-i)=4+1=5$ → $\\dfrac{2-i}{5} = \\mathbf{\\dfrac{2}{5} - \\dfrac{1}{5}i}$. (Đây cũng là $z^{-1}$ của $2+i$ — khớp mục 3.3.)
2. $\\dfrac{4+2i}{1-i}$: liên hợp $1+i$. Tử $(4+2i)(1+i)=4+4i+2i+2i^2=4+6i-2=2+6i$; mẫu $(1-i)(1+i)=2$ → $\\dfrac{2+6i}{2} = \\mathbf{1+3i}$.
3. $\\dfrac{5}{i}$: liên hợp của $i$ là $-i$. Tử $5\\cdot(-i)=-5i$; mẫu $i\\cdot(-i)=-i^2=1$ → $\\mathbf{-5i}$. (Nhanh hơn: $\\dfrac{5}{i}=5\\cdot i^{-1}=5\\cdot(-i)=-5i$.)
4. $\\dfrac{2+3i}{3-4i}$: liên hợp $3+4i$. Tử $(2+3i)(3+4i)=6+8i+9i+12i^2=6+17i-12=-6+17i$; mẫu $(3-4i)(3+4i)=9+16=25$ → $\\mathbf{\\dfrac{-6}{25} + \\dfrac{17}{25}i}$.

⚠ **Lỗi thường gặp — nhân tử & mẫu với chính mẫu thay vì LIÊN HỢP**. Nhân với $(c+di)$ (không đổi dấu) thì mẫu thành $(c+di)^2$ — **vẫn còn ảo**, không khử được. Phải nhân với $(c-di)$ để mẫu ra $c^2+d^2$ (thực). Phản ví dụ ở $\\dfrac{1}{2+i}$: nhân $(2+i)$ ra mẫu $(2+i)^2=3+4i$ (còn ảo, vô ích); nhân $(2-i)$ mới ra mẫu $5$ (thực) ✓.

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

- Cộng/trừ: gộp phần thực với thực, ảo với ảo (= cộng vector).
- Nhân: phân phối (FOIL) rồi thay $i^2 = -1$ (đừng quên bước này — nó đổi cả phần thực).
- Chia: nhân tử & mẫu với **liên hợp mẫu** (không phải chính mẫu) để mẫu thành thực $c^2+d^2$.
- Mọi phép toán: làm như đa thức biến $i$ với luật duy nhất $i^2=-1$.

---

## 5. Lũy thừa của i

💡 **Trực giác / Hình dung**: nhân với $i$ = **quay 90° ngược kim đồng hồ** trên mặt phẳng. Bắt đầu từ 1 (hướng phải): quay 90° → $i$ (lên), quay tiếp → $-1$ (trái), quay tiếp → $-i$ (xuống), quay tiếp → $1$ (về chỗ cũ). Cứ 4 lần quay = 1 vòng đầy → lũy thừa của i lặp lại chu kỳ 4.

\`\`\`
              Im
               ↑
            i² = -1 ?  ● i  (= i¹)
                    ↖  ↑  ↗
                      \\ | /  mỗi mũi tên = nhân thêm i (quay 90°)
   -1 ●───────────────O───────────────● 1  (= i⁰)
                      / | \\
                    ↙  ↓  ↘
                       ● -i (= i³)

   i⁰=1 → i¹=i → i²=-1 → i³=-i → i⁴=1 (quay đủ 360°, về 1)
\`\`\`

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

**Quy trình 4 bước** (với $\\Delta = b^2 - 4ac < 0$):

> **Bước 1** — tính $\\Delta = b^2 - 4ac$. Nếu $\\Delta < 0$, viết $\\Delta = -|\\Delta|$.
>
> **Bước 2** — $\\sqrt{\\Delta} = \\sqrt{-|\\Delta|} = \\sqrt{|\\Delta|}\\cdot i$ (lấy căn của **trị tuyệt đối** rồi gắn $i$).
>
> **Bước 3** — áp công thức nghiệm $x = \\dfrac{-b \\pm \\sqrt{|\\Delta|}\\,i}{2a}$.
>
> **Bước 4** — rút gọn về dạng $p \\pm qi$; hai nghiệm là **cặp liên hợp**.

**Ví dụ 1**: $x^2 + 4x + 13 = 0$ ($a=1, b=4, c=13$). $\\Delta = 16 - 52 = -36$.
- $\\sqrt{\\Delta} = \\sqrt{-36} = 6i$.
- $x = \\dfrac{-4 \\pm 6i}{2} =$ **$-2 \\pm 3i$**.

**Kiểm tra**: $(-2+3i)^2 + 4(-2+3i) + 13 = (4 - 12i + 9i^2) + (-8 + 12i) + 13 = (4 - 12i - 9) - 8 + 12i + 13 = 0$ ✓.

**Ví dụ 2** ($a \\neq 1$): $2x^2 - 2x + 5 = 0$ ($a=2, b=-2, c=5$). $\\Delta = (-2)^2 - 4\\cdot2\\cdot5 = 4 - 40 = -36$.
- $\\sqrt{\\Delta} = \\sqrt{-36} = 6i$.
- $x = \\dfrac{-(-2) \\pm 6i}{2\\cdot2} = \\dfrac{2 \\pm 6i}{4} = \\dfrac{1}{2} \\pm \\dfrac{3}{2}i$.

→ **$x = \\dfrac{1}{2} \\pm \\dfrac{3}{2}i$**. **Kiểm tra Vieta**: tổng $= 1 = -\\dfrac{b}{a} = \\dfrac{2}{2}$ ✓; tích $= \\left(\\dfrac12\\right)^2 + \\left(\\dfrac32\\right)^2 = \\dfrac14+\\dfrac94 = \\dfrac{10}{4} = \\dfrac{5}{2} = \\dfrac{c}{a}$ ✓.

**Ví dụ 3** (PT khuyết, $b=0$): $x^2 + 25 = 0$ → $x^2 = -25$ → $x = \\pm\\sqrt{-25} = \\pm 5i$. Hai nghiệm thuần ảo $5i$ và $-5i$ (vẫn là cặp liên hợp với phần thực $=0$).

⚠ **Lỗi thường gặp — viết $\\sqrt{-36} = \\pm 6i$ rồi lại đặt thêm ± trong công thức**. Trong công thức nghiệm đã có sẵn dấu $\\pm$ trước căn: $x = \\dfrac{-b \\pm \\sqrt{|\\Delta|}\\cdot i}{2a}$. Lấy $\\sqrt{36} = 6$ (dương) rồi gắn $i$, dấu ± do công thức lo. Phản ví dụ nếu nhân đôi dấu: dễ tạo 4 "nghiệm" sai thay vì 2.

❓ **Câu hỏi tự nhiên của người đọc**

- *"Vì sao hai nghiệm luôn liên hợp khi hệ số là số thực?"* Vì $\\sqrt{\\Delta}$ đi với $\\pm$, một nghiệm $+$, một $-$ phần ảo → $p + qi$ và $p - qi$. Định lý: đa thức hệ số thực có nghiệm phức thì nghiệm liên hợp cũng là nghiệm.
- *"Tổng và tích hai nghiệm phức có còn theo Vieta không?"* Còn nguyên. Vd ở trên: tổng $(-2+3i)+(-2-3i) = -4 = -\\dfrac{b}{a}$ ✓; tích $(-2)^2+3^2 = 13 = \\dfrac{c}{a}$ ✓.

🔁 **Dừng lại tự kiểm tra**

1. Giải $x^2 + 2x + 5 = 0$ trong $\\mathbb{C}$.
2. Hai nghiệm đó có liên hợp nhau không?
3. Giải $3x^2 + 2x + 1 = 0$ (hệ số $a=3\\neq1$).

<details><summary>Đáp án</summary>

1. $\\Delta = 4 - 20 = -16$ → $\\sqrt{\\Delta} = 4i$ → $x = \\dfrac{-2 \\pm 4i}{2} = -1 \\pm 2i$.
2. Có: $-1+2i$ và $-1-2i$ là cặp liên hợp.
3. $\\Delta = 4 - 12 = -8$ → $\\sqrt{\\Delta} = \\sqrt{8}\\,i = 2\\sqrt{2}\\,i$ → $x = \\dfrac{-2 \\pm 2\\sqrt{2}\\,i}{6} = -\\dfrac{1}{3} \\pm \\dfrac{\\sqrt{2}}{3}i$.

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

**Bài 6**: Tính nghịch đảo $z^{-1}$ của $z = 3 - 4i$, rồi kiểm tra $z\\cdot z^{-1}=1$.

**Bài 7**: Tính $\\dfrac{2 - 3i}{4 + i}$ (đưa về dạng $a+bi$).

**Bài 8**: Giải $x^2 - 6x + 25 = 0$ trong $\\mathbb{C}$, kiểm tra hai nghiệm liên hợp nhau và verify Vieta.

**Bài 9**: Cho $z = -5 + 12i$. Tính $|z|$, $\\bar{z}$, và $z\\cdot\\bar{z}$.

**Bài 10**: Rút gọn $i^7 + i^{16} + i^{-3}$.

### Lời giải

**Bài 1**: $\\operatorname{Re} = 4$, $\\operatorname{Im} = -3$, $|z| = \\sqrt{16+9} =$ **$5$**, $\\bar{z} =$ **$4 + 3i$**.

**Bài 2**: $(2+i)(3-2i) = 6 - 4i + 3i - 2i^2 = 6 - i + 2 =$ **$8 - i$**.

**Bài 3**: Nhân tử mẫu với $(1+i)$:  
- Tử: $(1+i)^2 = 1 + 2i + i^2 = 2i$.  
- Mẫu: $(1-i)(1+i) = 2$.  
- → **$i$**.

**Bài 4**: $x^2 = -9$ → $x = \\pm\\sqrt{-9} =$ **$\\pm 3i$**.

**Bài 5**: $100 = 4\\cdot 25$ → $i^{100} = (i^4)^{25} = 1^{25} =$ **$1$**.

**Bài 6**: $|z|^2 = 3^2 + (-4)^2 = 9 + 16 = 25$, $\\bar{z} = 3 + 4i$.
$$z^{-1} = \\frac{\\bar{z}}{|z|^2} = \\frac{3+4i}{25} = \\frac{3}{25} + \\frac{4}{25}i.$$
Kiểm tra: $(3-4i)\\cdot\\dfrac{3+4i}{25} = \\dfrac{(3-4i)(3+4i)}{25} = \\dfrac{9+16}{25} = 1$ ✓.

**Bài 7**: Nhân tử & mẫu với liên hợp mẫu $(4 - i)$:
- Tử: $(2-3i)(4-i) = 8 - 2i - 12i + 3i^2 = 8 - 14i - 3 = 5 - 14i$.
- Mẫu: $(4+i)(4-i) = 16 + 1 = 17$.
- → **$\\dfrac{5 - 14i}{17} = \\dfrac{5}{17} - \\dfrac{14}{17}i$**.

**Bài 8**: $a=1, b=-6, c=25$. $\\Delta = 36 - 100 = -64$ → $\\sqrt{\\Delta} = 8i$.
$$x = \\frac{6 \\pm 8i}{2} = \\mathbf{3 \\pm 4i}.$$
Hai nghiệm $3+4i$ và $3-4i$ là cặp liên hợp ✓. Vieta: tổng $= 6 = -\\dfrac{b}{a}$ ✓; tích $= 3^2 + 4^2 = 25 = \\dfrac{c}{a}$ ✓.

**Bài 9**: $|z| = \\sqrt{(-5)^2 + 12^2} = \\sqrt{25+144} = \\sqrt{169} = \\mathbf{13}$. $\\bar{z} = \\mathbf{-5 - 12i}$. $z\\cdot\\bar{z} = |z|^2 = \\mathbf{169}$.

**Bài 10**: $i^7 = i^{7\\bmod4} = i^3 = -i$; $i^{16} = i^{16\\bmod4} = i^0 = 1$; $i^{-3} = i^{(-3)\\bmod4} = i^1 = i$ (vì $-3 \\equiv 1 \\pmod 4$). Tổng: $-i + 1 + i = \\mathbf{1}$.

---

## 9. Bài tiếp theo

[Lesson 06 — Dạng lượng giác & Euler](../lesson-06-complex-polar-euler/).

## 📝 Tổng kết

1. **$i^2 = -1$**. $\\mathbb{C} = \\{a + bi : a, b \\in \\mathbb{R}\\}$. Mỗi $z \\leftrightarrow$ điểm/vector $(a,b)$ trên mặt phẳng Argand.
2. **$|z| = \\sqrt{a^2+b^2}$** (số thực, Pythagoras), **$\\bar{z} = a - bi$** (lật gương), $z\\cdot\\bar{z} = |z|^2$. Nghịch đảo $z^{-1} = \\dfrac{\\bar{z}}{|z|^2}$ ($z\\neq 0$).
3. 4 phép toán: cộng/trừ theo phần thực/ảo, nhân phân phối với $i^2 = -1$, chia nhân **liên hợp mẫu**.
4. $\\Delta < 0$: hai nghiệm phức liên hợp $p \\pm qi$; Vieta vẫn đúng trong $\\mathbb{C}$.
5. **Định lý đại số cơ bản**: PT bậc n có đúng n nghiệm trong $\\mathbb{C}$ (đếm cả bội).
`;
