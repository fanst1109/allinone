// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: Math/03-Trig-Complex/lesson-06-complex-polar-euler/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 06 — Dạng lượng giác & Công thức Euler

## Mục tiêu

- Hiểu **dạng lượng giác** $z = r(\\cos\\theta + i\\sin\\theta)$.
- Biết **công thức Euler**: $e^{i\\theta} = \\cos\\theta + i\\sin\\theta$.
- Hiểu vì sao Euler là **công thức đẹp nhất toán học**: $e^{i\\pi} + 1 = 0$.
- Nhân/chia số phức dưới dạng lượng giác — nhân mô-đun, cộng argument.

## Kiến thức tiền đề

- [Lesson 05 — Số phức](../lesson-05-complex-numbers/).

---

## 1. Dạng lượng giác (Polar form)

💡 **Hình dung — "độ dài + hướng" thay cho "ngang + dọc"**: Ở [Lesson 05 — Số phức](../lesson-05-complex-numbers/), ta mô tả số phức $z = a + bi$ bằng tọa độ Đề-các (Cartesian): đi **ngang** $a$ rồi **lên** $b$. Dạng lượng giác (polar form) mô tả **cùng điểm đó** bằng cách khác: đi thẳng từ gốc O một **độ dài** $r$ theo một **hướng** (góc) $\\theta$.

Hình dung như chỉ đường: thay vì nói *"đi 3 bước sang phải, 4 bước lên trên"* (Đề-các), ta nói *"đi 5 bước theo hướng 53°"* (cực). Cùng đến một điểm, nhưng cách thứ hai gói gọn thành "đi bao xa + theo hướng nào" — đúng cách con người nghĩ về vị trí.

\`\`\`
        Im (trục ảo)
         ↑
       b +- - - - - •  z = a + bi
         |        ╱ |
         |   r  ╱   |
         |    ╱     |   r = độ dài đoạn Oz  (mô-đun)
         |  ╱       |   θ = góc Oz hợp với trục thực dương
         | ╱ θ      |       (đo ngược chiều kim đồng hồ)
       O •──────────+────→ Re (trục thực)
                    a
\`\`\`

Vì sao gọi là "đẹp"? Vì với cùng một điểm, hai cách mô tả này **trao đổi được** cho nhau, và mỗi cách mạnh ở một việc: Đề-các tiện cho **cộng/trừ**, cực tiện cho **nhân/chia/quay** (xem mục 3, 4).

$$z = r(\\cos\\theta + i\\sin\\theta)$$

trong đó:
- **$r = |z| = \\sqrt{a^2 + b^2}$** — **mô-đun (modulus)**, là độ dài đoạn từ gốc O đến điểm $z$. Luôn $\\geq 0$.
- **$\\theta = \\arg(z)$** — **argument**, là góc đoạn Oz hợp với trục thực dương, đo **ngược chiều kim đồng hồ**, đơn vị **radian**.

> 📐 **Định nghĩa đầy đủ — mô-đun $r$ và argument $\\theta$**
>
> **(a) Là gì**: $r$ đo **z cách gốc O bao xa** (độ lớn); $\\theta$ đo **z nằm theo hướng nào** (góc). Cặp $(r, \\theta)$ xác định duy nhất một điểm trên mặt phẳng (với $r > 0$ và $\\theta$ chọn trong một khoảng độ dài $2\\pi$).
>
> **(b) Vì sao cần**: Dạng Đề-các $a + bi$ giấu mất "độ lớn" và "hướng" — muốn biết z dài bao nhiêu phải tính $\\sqrt{a^2+b^2}$. Dạng cực **đưa hai đại lượng đó ra mặt tiền**. Đặc biệt khi nhân số phức, độ lớn và hướng biến đổi theo quy luật cực kỳ đơn giản (nhân độ lớn, cộng hướng) mà dạng Đề-các che giấu hoàn toàn.
>
> **(c) Ví dụ số**: $z = 3 + 4i$ → $r = \\sqrt{9+16} = \\sqrt{25} = 5$ (z cách O đúng 5 đơn vị), $\\theta = \\operatorname{atan2}(4,3) \\approx 0.927$ rad $\\approx 53.13°$. Vậy $z = 5(\\cos 53.13° + i\\sin 53.13°)$. Kiểm ngược: $5\\cos 53.13° = 5 \\cdot 0.6 = 3$ ✓, $5\\sin 53.13° = 5 \\cdot 0.8 = 4$ ✓.

**Chuyển đổi**:
- Đại số → lượng giác: $r = \\sqrt{a^2+b^2}$, $\\theta = \\operatorname{atan2}(b, a)$.
- Lượng giác → đại số: $a = r\\cos\\theta$, $b = r\\sin\\theta$.

### 1.1. Walk-through đổi đại số → cực (4 ví dụ từng bước)

Quy trình 3 bước cố định: **(1)** tính $r = \\sqrt{a^2+b^2}$; **(2)** xác định **phần tư** của điểm $(a, b)$; **(3)** tính $\\theta$ rồi chỉnh theo phần tư.

**Ví dụ 1** (phần tư I): $z = 1 + i$ → $a = 1, b = 1$.
- (1) $r = \\sqrt{1^2 + 1^2} = \\sqrt{2}$.
- (2) $a > 0, b > 0$ → phần tư I.
- (3) $\\theta = \\arctan\\dfrac{b}{a} = \\arctan\\dfrac{1}{1} = \\arctan 1 = \\dfrac{\\pi}{4}$ (đã ở phần tư I, không chỉnh).
- → $z = \\sqrt{2}\\left(\\cos\\dfrac{\\pi}{4} + i\\sin\\dfrac{\\pi}{4}\\right)$. **Kiểm**: $\\sqrt{2}\\cos\\dfrac{\\pi}{4} = \\sqrt{2}\\cdot\\dfrac{\\sqrt 2}{2} = 1$ ✓, $\\sqrt{2}\\sin\\dfrac{\\pi}{4} = 1$ ✓.

**Ví dụ 2** (trên trục ảo): $z = 2i$ → $a = 0, b = 2$.
- (1) $r = \\sqrt{0^2 + 2^2} = 2$.
- (2) Điểm nằm **thẳng trên trục ảo dương** (trỏ lên).
- (3) Góc trỏ thẳng lên = $\\dfrac{\\pi}{2}$ (90°). (Không dùng $\\arctan(b/a)$ được vì $a = 0$, chia 0 — phải nhìn vị trí trực tiếp.)
- → $z = 2\\left(\\cos\\dfrac{\\pi}{2} + i\\sin\\dfrac{\\pi}{2}\\right)$. **Kiểm**: $2\\cos\\dfrac{\\pi}{2} = 0$ ✓, $2\\sin\\dfrac{\\pi}{2} = 2$ ✓.

**Ví dụ 3** (trên trục thực âm): $z = -3$ → $a = -3, b = 0$.
- (1) $r = \\sqrt{(-3)^2 + 0^2} = 3$.
- (2) Điểm nằm trên **trục thực âm** (trỏ sang trái).
- (3) Góc trỏ thẳng sang trái = $\\pi$ (180°).
- → $z = 3(\\cos\\pi + i\\sin\\pi)$. **Kiểm**: $3\\cos\\pi = -3$ ✓, $3\\sin\\pi = 0$ ✓.

**Ví dụ 4** (phần tư IV, có chỉnh dấu): $z = 1 - \\sqrt{3}\\,i$ → $a = 1, b = -\\sqrt{3}$.
- (1) $r = \\sqrt{1^2 + (\\sqrt 3)^2} = \\sqrt{1+3} = \\sqrt 4 = 2$.
- (2) $a > 0, b < 0$ → phần tư IV (dưới trục thực, bên phải).
- (3) $\\arctan\\dfrac{-\\sqrt 3}{1} = -\\dfrac{\\pi}{3}$. Vì phần tư IV nằm trong khoảng $(-\\frac{\\pi}{2}, 0)$ mà $\\arctan$ cũng cho giá trị âm trong khoảng này → **không cần chỉnh**, $\\theta = -\\dfrac{\\pi}{3}$.
- → $z = 2\\left(\\cos\\left(-\\dfrac{\\pi}{3}\\right) + i\\sin\\left(-\\dfrac{\\pi}{3}\\right)\\right)$. **Kiểm**: $2\\cos(-\\frac{\\pi}{3}) = 2\\cdot\\frac12 = 1$ ✓, $2\\sin(-\\frac{\\pi}{3}) = 2\\cdot(-\\frac{\\sqrt 3}{2}) = -\\sqrt 3$ ✓.

> **Bảng tham chiếu chỉnh góc theo phần tư** (khi dùng $\\arctan(b/a)$, kết quả luôn rơi trong $(-\\frac{\\pi}{2}, \\frac{\\pi}{2})$ — phần tư I và IV; với II và III phải cộng/trừ $\\pi$):
>
> | Phần tư | Dấu $(a, b)$ | Chỉnh từ $\\arctan(b/a)$ |
> |---------|--------------|--------------------------|
> | I | $(+, +)$ | giữ nguyên |
> | II | $(-, +)$ | **cộng $\\pi$** |
> | III | $(-, -)$ | **trừ $\\pi$** (hoặc cộng $\\pi$ rồi đưa về $(-\\pi,\\pi]$) |
> | IV | $(+, -)$ | giữ nguyên |

### 1.2. Walk-through đổi cực → đại số (4 ví dụ)

Chiều ngược dùng $a = r\\cos\\theta$, $b = r\\sin\\theta$ — thay số trực tiếp.

**Ví dụ 1**: $z = 2\\left(\\cos\\dfrac{\\pi}{3} + i\\sin\\dfrac{\\pi}{3}\\right)$ → $a = 2\\cos\\dfrac{\\pi}{3} = 2\\cdot\\dfrac12 = 1$; $b = 2\\sin\\dfrac{\\pi}{3} = 2\\cdot\\dfrac{\\sqrt 3}{2} = \\sqrt 3$. → $z = 1 + \\sqrt 3\\,i$.

**Ví dụ 2**: $z = 4\\left(\\cos\\dfrac{\\pi}{2} + i\\sin\\dfrac{\\pi}{2}\\right)$ → $a = 4\\cdot 0 = 0$; $b = 4\\cdot 1 = 4$. → $z = 4i$.

**Ví dụ 3**: $z = \\sqrt 2\\left(\\cos\\dfrac{3\\pi}{4} + i\\sin\\dfrac{3\\pi}{4}\\right)$ → $a = \\sqrt 2\\cdot\\left(-\\dfrac{\\sqrt 2}{2}\\right) = -1$; $b = \\sqrt 2\\cdot\\dfrac{\\sqrt 2}{2} = 1$. → $z = -1 + i$.

**Ví dụ 4**: $z = 6\\left(\\cos\\pi + i\\sin\\pi\\right)$ → $a = 6\\cdot(-1) = -6$; $b = 6\\cdot 0 = 0$. → $z = -6$.

### 1.3. Ba cách viết cùng một số phức

Một số phức có **ba dạng tương đương** — cùng một điểm, ba ngôn ngữ:

| Dạng | Công thức | Tốt cho | Ví dụ ($z = 1+i$) |
|------|-----------|---------|--------------------|
| **Đại số (Cartesian)** | $a + bi$ | cộng, trừ | $1 + i$ |
| **Lượng giác (polar)** | $r(\\cos\\theta + i\\sin\\theta)$ | hiểu hình học | $\\sqrt 2\\left(\\cos\\frac{\\pi}{4} + i\\sin\\frac{\\pi}{4}\\right)$ |
| **Mũ (exponential)** | $re^{i\\theta}$ | nhân, chia, lũy thừa | $\\sqrt 2\\,e^{i\\pi/4}$ |

Dạng lượng giác và dạng mũ chỉ là **hai cách viết một thứ** (nhờ công thức Euler ở mục 2) — \`$\\cos\\theta + i\\sin\\theta$\` viết gọn thành \`$e^{i\\theta}$\`. Chọn dạng theo phép toán đang làm: gặp \`+\`/\`−\` thì về đại số, gặp \`×\`/\`÷\`/lũy thừa thì về mũ.

❓ **Câu hỏi tự nhiên của người đọc**

- *"Vì sao có dạng này?"* Vì khi nhân/chia số phức, dạng lượng giác **đơn giản hơn nhiều** dạng đại số (xem mục 3) — nhân = cộng góc.
- *"argument có duy nhất không?"* Không — $\\theta$ và $\\theta + 2k\\pi$ cùng chỉ một điểm. Thường chọn **argument chính** trong $(-\\pi, \\pi]$ để tránh nhập nhằng.
- *"Vì sao dùng $\\operatorname{atan2}(b, a)$ mà không phải $\\arctan(b/a)$?"* Vì $\\arctan(b/a)$ không phân biệt phần tư (mất dấu). $\\operatorname{atan2}$ xét dấu cả a và b → cho đúng góc trong cả 4 phần tư.

⚠ **Lỗi thường gặp — tính argument bằng $\\arctan(b/a)$ rồi quên chỉnh phần tư**. Phản ví dụ: $z = -1 - i$ (phần tư III). $\\arctan(b/a) = \\arctan\\left(\\dfrac{-1}{-1}\\right) = \\arctan(1) = \\dfrac{\\pi}{4}$ (phần tư I) — **sai**. Đúng phải cộng π: $\\theta = \\dfrac{\\pi}{4} + \\pi = \\dfrac{5\\pi}{4}$ (hoặc $-\\dfrac{3\\pi}{4}$). Luôn kiểm điểm thực sự nằm ở phần tư nào.

**4 ví dụ số đa dạng (đại số → lượng giác)**:
- $z = 1 + i$: $r = \\sqrt{2}$, $\\theta = \\dfrac{\\pi}{4}$ → $\\sqrt{2}\\left(\\cos\\dfrac{\\pi}{4} + i\\sin\\dfrac{\\pi}{4}\\right)$.
- $z = 2i$: $r = 2$, $\\theta = \\dfrac{\\pi}{2}$ → $2\\left(\\cos\\dfrac{\\pi}{2} + i\\sin\\dfrac{\\pi}{2}\\right)$.
- $z = -3$: $r = 3$, $\\theta = \\pi$ → $3(\\cos\\pi + i\\sin\\pi)$.
- $z = 1 - \\sqrt{3}\\,i$: $r = \\sqrt{1+3} = 2$, $\\theta = -\\dfrac{\\pi}{3}$ (phần tư IV) → $2\\left(\\cos\\left(-\\dfrac{\\pi}{3}\\right) + i\\sin\\left(-\\dfrac{\\pi}{3}\\right)\\right)$.

⚠ **Lỗi thường gặp 2 — nhầm độ và radian khi tính $\\theta$**. Mọi argument trong dạng lượng giác/Euler đều tính bằng **radian**, không phải độ. Phản ví dụ: với $z = 1 + i$, đáp án đúng $\\theta = \\dfrac{\\pi}{4}$ rad ($\\approx 0.785$). Nếu vô ý ghi $\\theta = 45$ (tưởng là độ) rồi cắm vào $e^{i\\cdot 45}$ thì ra một điểm hoàn toàn khác trên đường tròn ($45$ rad $\\approx 7.16$ vòng). Quy đổi khi cần: $180° = \\pi$ rad, nên $45° = \\dfrac{45}{180}\\pi = \\dfrac{\\pi}{4}$.

⚠ **Lỗi thường gặp 3 — lấy nhầm $r$ là một thành phần thay vì độ dài**. $r$ **không phải** $a$ cũng không phải $b$ — nó là **cạnh huyền** $\\sqrt{a^2+b^2}$. Phản ví dụ: $z = 3 + 4i$ có $r = 5$ (không phải 3, không phải 4). Quên căn → sai mọi bước sau.

🔁 **Dừng lại tự kiểm tra**

1. Viết $z = \\sqrt{3} + i$ dưới dạng lượng giác.
2. Mô-đun và argument của $z = -2i$?
3. Đổi $z = 4e^{i\\pi/3}$ về dạng đại số.

<details><summary>Đáp án</summary>

1. $r = \\sqrt{3+1} = 2$, $\\theta = \\arctan\\left(\\dfrac{1}{\\sqrt{3}}\\right) = \\dfrac{\\pi}{6}$ (phần tư I) → $2\\left(\\cos\\dfrac{\\pi}{6} + i\\sin\\dfrac{\\pi}{6}\\right)$.
2. $r = 2$, $\\theta = -\\dfrac{\\pi}{2}$ (trỏ thẳng xuống dưới).
3. $a = 4\\cos\\dfrac{\\pi}{3} = 4\\cdot\\dfrac12 = 2$, $b = 4\\sin\\dfrac{\\pi}{3} = 4\\cdot\\dfrac{\\sqrt 3}{2} = 2\\sqrt 3$ → $z = 2 + 2\\sqrt 3\\,i$.

</details>

### 📝 Tóm tắt mục 1

- Dạng lượng giác: $z = r(\\cos\\theta + i\\sin\\theta)$ với $r = |z|$ (mô-đun = độ dài), $\\theta = \\arg(z)$ (argument = hướng, radian).
- Trực giác: cực = **"độ dài + hướng"**, thay cho Đề-các **"ngang + dọc"** — cùng một điểm, hai cách mô tả.
- Đổi đại số → cực: $r = \\sqrt{a^2+b^2}$; xác định phần tư; $\\theta$ từ $\\arctan(b/a)$ rồi **chỉnh theo phần tư** (II: $+\\pi$, III: $-\\pi$). Điểm trên trục: nhìn vị trí trực tiếp.
- Đổi cực → đại số: $a = r\\cos\\theta$, $b = r\\sin\\theta$.
- argument xác định sai khác $2k\\pi$; chọn argument chính trong $(-\\pi, \\pi]$.

---

## 2. Công thức Euler

$$e^{i\\theta} = \\cos\\theta + i\\sin\\theta$$

⟶ Số phức trên đường tròn đơn vị có argument θ chính là **$e^{i\\theta}$**.

**Tổng quát**: Mọi số phức:

$$z = re^{i\\theta}$$

> 📐 **Định nghĩa đầy đủ — Công thức Euler $e^{i\\theta} = \\cos\\theta + i\\sin\\theta$**
>
> **(a) Là gì**: 1 đẳng thức **gây sốc** — hàm mũ (vốn cho đại lượng tăng/giảm) gặp số phức i thì biến thành **$\\cos + i\\sin$** (vốn cho dao động). Hai khái niệm tưởng khác hoàn toàn lại là 2 mặt của 1 hiện tượng.
>
> **(b) Vì sao cần**: Vì làm cho mọi phép toán số phức trở nên **đơn giản như đại số mũ**: nhân/chia số phức = cộng/trừ argument ($e^{i\\alpha}\\cdot e^{i\\beta} = e^{i(\\alpha+\\beta)}$), lũy thừa = nhân argument (De Moivre). Cốt lõi của **Fourier analysis** (tín hiệu = tổng các $e^{i\\omega t}$), **mạch điện AC** (phasor), **cơ học lượng tử** (hàm sóng $e^{i(kx-\\omega t)}$). Đặc biệt $e^{i\\pi} = -1$ → $e^{i\\pi} + 1 = 0$ liên kết 5 hằng số quan trọng nhất toán ($0, 1, \\pi, e, i$) — được mệnh danh "công thức đẹp nhất toán học".
>
> **(c) Ví dụ số**: $\\theta = 0$: $e^0 = 1 = \\cos 0 + i\\sin 0 = 1 + 0$ ✓. $\\theta = \\dfrac{\\pi}{2}$: $e^{i\\pi/2} = \\cos\\dfrac{\\pi}{2} + i\\sin\\dfrac{\\pi}{2} = 0 + i =$ **$i$** (nhân với i = quay 90°!). $\\theta = \\pi$: $e^{i\\pi} = \\cos\\pi + i\\sin\\pi = -1 + 0 =$ **$-1$**. $\\theta = 2\\pi$: $e^{i\\cdot 2\\pi} = 1$ (tuần hoàn!). $z = 1+i$: $r = \\sqrt{2}$, $\\theta = \\dfrac{\\pi}{4}$ → $z = \\sqrt{2}\\,e^{i\\pi/4}$. $z^2 = 2e^{i\\pi/2} = 2i$ ✓ (kiểm: $(1+i)^2 = 1+2i+i^2 = 2i$ ✓).

💡 **Vì sao đúng?** Khai triển Taylor của $e^x$, $\\sin x$, $\\cos x$:

$$\\begin{aligned}
e^x &= 1 + x + \\frac{x^2}{2!} + \\frac{x^3}{3!} + \\frac{x^4}{4!} + \\ldots \\\\
\\sin x &= x - \\frac{x^3}{3!} + \\frac{x^5}{5!} - \\ldots \\\\
\\cos x &= 1 - \\frac{x^2}{2!} + \\frac{x^4}{4!} - \\ldots
\\end{aligned}$$

Thay $x = i\\theta$ vào $e^x$ và dùng $i^2 = -1$, $i^3 = -i$, $i^4 = 1, \\ldots$:

$$\\begin{aligned}
e^{i\\theta} &= 1 + i\\theta - \\frac{\\theta^2}{2!} - i\\frac{\\theta^3}{3!} + \\frac{\\theta^4}{4!} + i\\frac{\\theta^5}{5!} - \\ldots \\\\
&= \\left(1 - \\frac{\\theta^2}{2!} + \\frac{\\theta^4}{4!} - \\ldots\\right) + i\\left(\\theta - \\frac{\\theta^3}{3!} + \\frac{\\theta^5}{5!} - \\ldots\\right) \\\\
&= \\cos\\theta + i\\sin\\theta \\;\\checkmark
\\end{aligned}$$

**Điểm mấu chốt của chứng minh**: khi thay $x = i\\theta$, lũy thừa của $i$ chạy theo chu kỳ 4 — $i^0 = 1, i^1 = i, i^2 = -1, i^3 = -i, i^4 = 1, \\ldots$ Nhịp $+, +i, -, -i$ này **tách** chuỗi $e^x$ thành hai cụm: các số mũ chẵn (không có $i$) gom thành chuỗi $\\cos$, các số mũ lẻ (có $i$) gom thành chuỗi $\\sin$. Đó là toàn bộ "phép màu".

**Kiểm bằng số** ($\\theta = \\dfrac{\\pi}{2} \\approx 1.5708$), lấy 5 số hạng đầu của chuỗi $e^{i\\theta}$:

$$1 + i(1.5708) - \\frac{1.5708^2}{2} - i\\frac{1.5708^3}{6} + \\frac{1.5708^4}{24} \\approx (1 - 1.2337 + 0.2537) + i(1.5708 - 0.6460) \\approx 0.020 + 0.925\\,i$$

So với đáp án đúng $e^{i\\pi/2} = \\cos\\frac{\\pi}{2} + i\\sin\\frac{\\pi}{2} = 0 + i$: đã gần ($0.02 \\to 0$, $0.925 \\to 1$); thêm số hạng nữa sẽ hội tụ về $i$. ✓ Chuỗi Taylor "đuổi kịp" giá trị thật.

💡 **Trực giác hình học — vì sao "mũ" lại "quay"?** Có một cách hiểu Euler không cần Taylor, dựa trên ý nghĩa của đạo hàm. Xét hàm $f(\\theta) = e^{i\\theta}$ như vị trí của một điểm chuyển động theo thời gian $\\theta$. Vận tốc là đạo hàm:

$$\\frac{d}{d\\theta}e^{i\\theta} = i\\,e^{i\\theta}$$

Nhưng nhân với $i$ nghĩa là **quay 90°** (xem mục 4). Vậy ở mọi thời điểm, **vận tốc luôn vuông góc với vị trí** (hướng từ O đến điểm). Một vật mà vận tốc luôn vuông góc với bán kính thì **không tiến ra xa cũng không lại gần O** — nó **đi vòng tròn**. Tại $\\theta = 0$ điểm bắt đầu ở $e^0 = 1$ (tức $(1,0)$), với tốc độ 1, nên sau "thời gian" $\\theta$ nó đã đi cung dài $\\theta$ trên đường tròn đơn vị → tới đúng điểm $(\\cos\\theta, \\sin\\theta)$. Đó là vì sao $e^{i\\theta} = \\cos\\theta + i\\sin\\theta$ và vì sao $|e^{i\\theta}| = 1$.

\`\`\`
  Vật chạy trên đường tròn đơn vị:
  vận tốc (mũi tên) LUÔN vuông góc bán kính
  → không phình ra, không co vào → quỹ đạo TRÒN

           Im
            ↑
         ___•___        • = e^{iθ}, vị trí
       ╱   ↗   ╲        ↗ = vận tốc i·e^{iθ} (quay 90° so với bán kính)
      |   ╱θ    |
   ───+──•──────+──→ Re
      | (1,0)   |       bắt đầu tại θ=0 ở điểm (1,0)
       ╲_______╱        đi ngược chiều kim đồng hồ
\`\`\`

**Đặc biệt** ($\\theta = \\pi$):

$$e^{i\\pi} = \\cos\\pi + i\\sin\\pi = -1 + 0i = -1$$

⟶ **$e^{i\\pi} + 1 = 0$** — kết nối 5 hằng số quan trọng nhất: $0, 1, \\pi, e, i$. Được mệnh danh "công thức đẹp nhất toán học".

### 2.1. Walk-through đẳng thức Euler eⁱᵖⁱ + 1 = 0 — từng bước & ý nghĩa

Đẳng thức này không phải "phép màu" — nó là một **trường hợp cực kỳ đặc biệt** của công thức tổng quát. Đi từng bước:

> **Bước 1** — Bắt đầu từ công thức Euler: $e^{i\\theta} = \\cos\\theta + i\\sin\\theta$ (đúng với mọi $\\theta$ radian).
>
> **Bước 2** — Thay $\\theta = \\pi$: $e^{i\\pi} = \\cos\\pi + i\\sin\\pi$.
>
> **Bước 3** — Tra giá trị lượng giác: $\\cos\\pi = -1$, $\\sin\\pi = 0$. Vậy $e^{i\\pi} = -1 + i\\cdot 0 = -1$.
>
> **Bước 4** — Chuyển vế: $e^{i\\pi} = -1 \\;\\Rightarrow\\; e^{i\\pi} + 1 = 0$. ∎

**Ý nghĩa hình học**: $e^{i\\pi}$ nghĩa là "bắt đầu tại điểm $1$ trên trục thực, quay ngược chiều kim đồng hồ một góc $\\pi$ (= 180°) trên đường tròn đơn vị". Đi nửa vòng tròn từ $(1, 0)$ → đến đúng $(-1, 0)$, tức số $-1$. Quá hợp lý.

**Vì sao gọi là "đẹp nhất"?** Vì nó gói **năm hằng số nền tảng** của toán học vào một dòng ngắn, mỗi cái đến từ một nhánh khác nhau mà tưởng chừng chẳng liên quan:

| Hằng số | Đến từ | Vai trò |
|---------|--------|---------|
| $0$ | số học | phần tử trung hòa của phép cộng |
| $1$ | số học | phần tử trung hòa của phép nhân |
| $\\pi$ | hình học | tỉ số chu vi / đường kính đường tròn |
| $e$ | giải tích | cơ số tăng trưởng tự nhiên |
| $i$ | đại số | đơn vị ảo, $i^2 = -1$ |

Năm "người lạ" từ năm thành phố khác nhau, vậy mà ráp lại vừa khít thành $= 0$, không thừa không thiếu.

⚠ **Lỗi thường gặp — quên $\\theta$ trong Euler là RADIAN**. $e^{i\\theta} = \\cos\\theta + i\\sin\\theta$ chỉ đúng khi θ tính bằng radian. Phản ví dụ: $e^{i\\pi} = -1$, nhưng nếu hiểu nhầm $\\pi \\approx 3.14$ là "độ" thì $\\cos 3.14^\\circ + i\\sin 3.14^\\circ \\approx 0.9985 + 0.0548i \\neq -1$. Luôn dùng radian.

⚠ **Lỗi thường gặp 2 — viết $e^{i\\theta}$ có mô-đun khác 1**. $|e^{i\\theta}| = \\sqrt{\\cos^2\\theta + \\sin^2\\theta} = 1$ **luôn** — nó nằm trên đường tròn đơn vị. Mọi số phức là $re^{i\\theta}$; phần $r$ mới mang độ lớn, $e^{i\\theta}$ chỉ mang hướng.

❓ **Câu hỏi tự nhiên của người đọc**

- *"Vì sao mũ (tăng trưởng) lại biến thành cos/sin (dao động)?"* Vì nhân với $i$ = quay 90°. Khi mũ "đẩy" theo hướng vuông góc liên tục, quỹ đạo không phình ra mà **cuộn tròn** → ra dao động. Chứng minh chặt là khai triển Taylor ở trên.
- *"$e^{i\\theta}$ có thể bằng số thực không?"* Có, khi $\\sin\\theta = 0$, tức $\\theta = k\\pi$: $e^{i\\cdot 0} = 1$, $e^{i\\pi} = -1$, $e^{i\\cdot 2\\pi} = 1\\ldots$

🔁 **Dừng lại tự kiểm tra**

1. $e^{i\\pi/2}$ bằng số phức nào?
2. $|e^{i\\cdot 1.234}|$ bằng mấy?

<details><summary>Đáp án</summary>

1. $\\cos\\dfrac{\\pi}{2} + i\\sin\\dfrac{\\pi}{2} = 0 + i = i$.
2. Bằng **1** (mọi $e^{i\\theta}$ đều có mô-đun 1).

</details>

### 📝 Tóm tắt mục 2

- $e^{i\\theta} = \\cos\\theta + i\\sin\\theta$ (θ radian); mọi $z = re^{i\\theta}$.
- $|e^{i\\theta}| = 1$ (nằm trên đường tròn đơn vị); chứng minh qua Taylor — chu kỳ 4 của $i$ tách chuỗi thành $\\cos$ (chẵn) + $i\\sin$ (lẻ).
- Trực giác quay: $\\frac{d}{d\\theta}e^{i\\theta} = i\\,e^{i\\theta}$ → vận tốc ⊥ bán kính → quỹ đạo tròn.
- $e^{i\\pi} + 1 = 0$ nối 5 hằng số $0, 1, \\pi, e, i$ — đi nửa vòng tròn từ $1$ tới $-1$.

---

## 3. Nhân / chia số phức dạng lượng giác

Cho $z_1 = r_1 e^{i\\theta_1}$, $z_2 = r_2 e^{i\\theta_2}$.

$$\\begin{aligned}
z_1 \\cdot z_2 &= r_1 r_2 \\, e^{i(\\theta_1 + \\theta_2)} \\\\
\\frac{z_1}{z_2} &= \\frac{r_1}{r_2} \\, e^{i(\\theta_1 - \\theta_2)}
\\end{aligned}$$

💡 **Quy tắc dễ nhớ — "co giãn + quay"**: nhân hai số phức = **nhân hai độ dài** rồi **cộng hai hướng**. Hình dung mỗi số phức là một "lệnh biến hình": *"phóng to gấp $r$ lần và quay $\\theta$"*. Làm hai lệnh liên tiếp thì độ phóng to **nhân lại** ($r_1 \\cdot r_2$) còn các góc quay **cộng dồn** ($\\theta_1 + \\theta_2$) — y như vặn hai lần cùng một núm.
- **Nhân**: mô-đun nhân, argument cộng.
- **Chia**: mô-đun chia, argument trừ.

⟶ Quá đẹp! So với cách nhân đại số $(ac-bd) + (ad+bc)i$ (phải khai triển, dễ sai dấu) thì dạng lượng giác trực quan hơn nhiều.

\`\`\`
  Nhân z₁·z₂ : độ dài NHÂN, góc CỘNG
       Im
        ↑           • z₁·z₂   (dài r₁·r₂, góc θ₁+θ₂)
        |          ╱
        |    • z₂ ╱            θ₁+θ₂ = θ₁ chồng lên θ₂
        |   ╱    ╱
        | •z₁   ╱
        |╱ ╲  ╱  ╲
   ─────+───────────→ Re
        O
\`\`\`

### 3.1. Walk-through nhân/chia dạng cực (4 ví dụ — thấy rõ cộng/trừ góc)

**Ví dụ 1 — nhân** (góc cộng): $z_1 = 2e^{i\\pi/3}$, $z_2 = 3e^{i\\pi/6}$.
- Mô-đun: $r = 2 \\cdot 3 = 6$.
- Argument: $\\theta = \\dfrac{\\pi}{3} + \\dfrac{\\pi}{6} = \\dfrac{2\\pi}{6} + \\dfrac{\\pi}{6} = \\dfrac{3\\pi}{6} = \\dfrac{\\pi}{2}$.
- → $z_1 z_2 = 6e^{i\\pi/2} = 6i$.
- **Kiểm tra đại số**: $z_1 = 2\\left(\\dfrac{1}{2} + i\\dfrac{\\sqrt{3}}{2}\\right) = 1 + i\\sqrt{3}$; $z_2 = 3\\left(\\dfrac{\\sqrt{3}}{2} + \\dfrac{i}{2}\\right) = \\dfrac{3\\sqrt{3}}{2} + \\dfrac{3}{2}i$. Nhân: $(1 + i\\sqrt{3})\\left(\\dfrac{3\\sqrt{3}}{2} + \\dfrac{3}{2}i\\right) = \\left(\\dfrac{3\\sqrt{3}}{2} - \\dfrac{3\\sqrt{3}}{2}\\right) + i\\left(\\dfrac{3}{2} + \\dfrac{9}{2}\\right) = 0 + 6i$ ✓.

**Ví dụ 2 — chia** (góc trừ): chia $z_1$ cho $z_2$ ở ví dụ 1.
- Mô-đun: $r = \\dfrac{2}{3}$.
- Argument: $\\theta = \\dfrac{\\pi}{3} - \\dfrac{\\pi}{6} = \\dfrac{2\\pi}{6} - \\dfrac{\\pi}{6} = \\dfrac{\\pi}{6}$.
- → $\\dfrac{z_1}{z_2} = \\dfrac{2}{3}e^{i\\pi/6}$. Đổi đại số: $\\dfrac{2}{3}\\left(\\cos\\dfrac{\\pi}{6} + i\\sin\\dfrac{\\pi}{6}\\right) = \\dfrac{2}{3}\\left(\\dfrac{\\sqrt 3}{2} + \\dfrac{i}{2}\\right) = \\dfrac{\\sqrt 3}{3} + \\dfrac{1}{3}i$.

**Ví dụ 3 — nhân vượt nửa vòng** (góc cộng quá $\\pi$, đưa về argument chính): $z_1 = e^{i\\cdot 3\\pi/4}$, $z_2 = e^{i\\cdot 3\\pi/4}$ (cùng số).
- Mô-đun: $r = 1\\cdot 1 = 1$.
- Argument thô: $\\theta = \\dfrac{3\\pi}{4} + \\dfrac{3\\pi}{4} = \\dfrac{6\\pi}{4} = \\dfrac{3\\pi}{2}$. Giá trị này $> \\pi$ → đưa về khoảng $(-\\pi, \\pi]$ bằng cách trừ $2\\pi$: $\\dfrac{3\\pi}{2} - 2\\pi = -\\dfrac{\\pi}{2}$.
- → tích $= e^{-i\\pi/2} = -i$. (Đây chính là $z_1^2$: hợp lý vì $(e^{i\\cdot 3\\pi/4})^2$, bình phương = gấp đôi góc.)

**Ví dụ 4 — chia ra góc âm** (góc trừ thành âm): $z_1 = 4e^{i\\pi/6}$, $z_2 = 2e^{i\\pi/2}$.
- Mô-đun: $r = \\dfrac{4}{2} = 2$.
- Argument: $\\theta = \\dfrac{\\pi}{6} - \\dfrac{\\pi}{2} = \\dfrac{\\pi}{6} - \\dfrac{3\\pi}{6} = -\\dfrac{2\\pi}{6} = -\\dfrac{\\pi}{3}$ (âm — hướng xuống dưới, phần tư IV).
- → $\\dfrac{z_1}{z_2} = 2e^{-i\\pi/3} = 2\\left(\\cos\\left(-\\dfrac{\\pi}{3}\\right) + i\\sin\\left(-\\dfrac{\\pi}{3}\\right)\\right) = 2\\left(\\dfrac12 - i\\dfrac{\\sqrt 3}{2}\\right) = 1 - \\sqrt 3\\,i$.

⚠ **Lỗi thường gặp — nhân mô-đun nhưng quên cộng argument (hoặc ngược lại)**. Khi nhân: **mô-đun nhân, argument cộng**. Phản ví dụ: $z_1 = 2e^{i\\pi/3}$, $z_2 = 3e^{i\\pi/6}$. Tích đúng $6e^{i\\pi/2}$; nếu lỡ cộng cả mô-đun ra $5e^{i\\ldots}$ hoặc nhân cả argument ra $6e^{i\\pi^2/18}$ đều sai.

❓ **Câu hỏi tự nhiên của người đọc**

- *"Nếu argument cộng vượt quá 2π thì sao?"* Trừ bớt 2π để đưa về $(-\\pi, \\pi]$. Vd $\\theta = \\dfrac{7\\pi}{4} \\equiv \\dfrac{7\\pi}{4} - 2\\pi = -\\dfrac{\\pi}{4}$. Cùng điểm.
- *"Dạng lượng giác có lợi hơn đại số nhiều không?"* Cho **cộng/trừ** thì dạng đại số tiện hơn (cộng từng phần). Cho **nhân/chia/lũy thừa/căn** thì dạng cực vượt trội. Chọn dạng theo phép toán.

🔁 **Dừng lại tự kiểm tra**

1. $z_1 = 4e^{i\\pi/2}$, $z_2 = 2e^{i\\pi/4}$. Tính $z_1\\cdot z_2$ và $\\dfrac{z_1}{z_2}$ dạng cực.
2. $(3e^{i\\pi/3})\\cdot(e^{i\\cdot 2\\pi/3})$ bằng gì?

<details><summary>Đáp án</summary>

1. $z_1\\cdot z_2 = 8e^{i\\cdot 3\\pi/4}$; $\\dfrac{z_1}{z_2} = 2e^{i\\pi/4}$.
2. Mô-đun $3\\cdot 1 = 3$, argument $\\dfrac{\\pi}{3} + \\dfrac{2\\pi}{3} = \\pi$ → $3e^{i\\pi} = -3$.

</details>

### 📝 Tóm tắt mục 3

- Nhân: **mô-đun nhân, argument cộng** ($r_1 r_2 \\, e^{i(\\theta_1+\\theta_2)}$). Trực giác: "co giãn + quay" gộp lại.
- Chia: **mô-đun chia, argument trừ** ($\\frac{r_1}{r_2}e^{i(\\theta_1-\\theta_2)}$).
- Sau khi cộng/trừ góc, nếu ra ngoài $(-\\pi, \\pi]$ thì ± $2\\pi$ để đưa về argument chính (cùng điểm).
- Dạng cực thắng tuyệt đối ở nhân/chia/lũy thừa; đại số tiện cho cộng/trừ.

---

## 4. Ý nghĩa hình học của nhân số phức

💡 **Nhân z với $e^{i\\theta}$ = quay z đi 1 góc θ quanh O**.

**Đặc biệt**:
- **Nhân với i** ($= e^{i\\pi/2}$) = quay 90° ngược chiều kim đồng hồ.
- **Nhân với -1** ($= e^{i\\pi}$) = quay 180° (đối xứng tâm O).
- **Nhân với $re^{i\\theta}$** = phóng to r lần + quay θ.

⟶ **Số phức = phép biến hình đồng dạng**. Đó là lý do nó hữu ích cho hình học, kỹ thuật.

#### 4.1. Vì sao "nhân = cộng góc"? — chứng minh từng bước

Quy tắc "nhân thì argument cộng" không phải định nghĩa tùy tiện — nó **suy ra được** từ công thức cộng góc của lượng giác (xem [Lesson 03 — Hằng đẳng thức lượng giác](../lesson-03-trig-identities/)). Nhân hai số phức dạng lượng giác:

$$\\begin{aligned}
z_1 z_2 &= r_1(\\cos\\theta_1 + i\\sin\\theta_1)\\cdot r_2(\\cos\\theta_2 + i\\sin\\theta_2) \\\\
&= r_1 r_2\\big[(\\cos\\theta_1\\cos\\theta_2 - \\sin\\theta_1\\sin\\theta_2) + i(\\sin\\theta_1\\cos\\theta_2 + \\cos\\theta_1\\sin\\theta_2)\\big] \\\\
&= r_1 r_2\\big[\\cos(\\theta_1 + \\theta_2) + i\\sin(\\theta_1 + \\theta_2)\\big]
\\end{aligned}$$

Bước cuối dùng đúng hai đẳng thức: $\\cos(\\alpha+\\beta) = \\cos\\alpha\\cos\\beta - \\sin\\alpha\\sin\\beta$ và $\\sin(\\alpha+\\beta) = \\sin\\alpha\\cos\\beta + \\cos\\alpha\\sin\\beta$. Kết quả là một số phức có **mô-đun $r_1 r_2$** và **argument $\\theta_1 + \\theta_2$** — chính xác quy tắc ở mục 3. Với dạng mũ thì gọn hơn nữa: $r_1 e^{i\\theta_1}\\cdot r_2 e^{i\\theta_2} = r_1 r_2\\,e^{i(\\theta_1+\\theta_2)}$, dùng đúng luật mũ $e^x\\cdot e^y = e^{x+y}$ — đây chính là lý do dạng mũ "thắng" cho phép nhân.

**Kiểm bằng số** ($\\theta_1 = \\theta_2 = \\dfrac{\\pi}{4}$, $r_1 = r_2 = 1$): vế trái $(\\cos\\frac{\\pi}{4}+i\\sin\\frac{\\pi}{4})^2 = \\left(\\frac{\\sqrt2}{2}+i\\frac{\\sqrt2}{2}\\right)^2 = \\frac12 + 2\\cdot\\frac12 i + \\frac12 i^2 = \\frac12 + i - \\frac12 = i$; vế phải $\\cos\\frac{\\pi}{2}+i\\sin\\frac{\\pi}{2} = i$ ✓.

**Ví dụ 1 — chỉ quay**: Quay điểm $A(3, 4)$ ($\\equiv 3+4i$) đi 90° quanh O.
- Nhân với i: $(3+4i)\\cdot i = 3i + 4i^2 = -4 + 3i$ → điểm $(-4, 3)$.

Khớp với công thức quay ở L08-T2: $(x,y) \\to (-y, x)$. ✓ Để ý độ dài giữ nguyên: $|3+4i| = 5 = |-4+3i|$ (vì $|i| = 1$).

**Ví dụ 2 — quay + phóng to**: Nhân $z = 1 + i$ với $w = 2i$.
- $w = 2i = 2e^{i\\pi/2}$: mô-đun 2, góc $\\dfrac{\\pi}{2}$ → "phóng to gấp 2 **và** quay 90°".
- Đại số: $(1+i)\\cdot 2i = 2i + 2i^2 = -2 + 2i$.
- **Kiểm bằng độ dài/góc**: $|1+i| = \\sqrt 2$ → sau khi nhân phải dài $2\\sqrt 2$; thật vậy $|-2+2i| = \\sqrt{8} = 2\\sqrt 2$ ✓. Góc $1+i$ là $\\dfrac{\\pi}{4}$ → cộng $\\dfrac{\\pi}{2}$ thành $\\dfrac{3\\pi}{4}$, đúng là góc của $-2+2i$ (phần tư II) ✓.

⚠ **Lỗi thường gặp — nhân với $re^{i\\theta}$ mà quên phần phóng to r**. Nhân với một số phức mô-đun $\\neq 1$ vừa **quay** vừa **co giãn**. Phản ví dụ: nhân z với $2i = 2e^{i\\pi/2}$ không chỉ quay 90° mà còn **phóng to gấp 2**. Nếu chỉ muốn quay (giữ độ lớn), nhân với $e^{i\\theta}$ (mô-đun 1).

❓ **Câu hỏi tự nhiên của người đọc**

- *"Nhân với số thực dương k thì sao?"* $k = ke^{i\\cdot 0}$ → quay 0° (không quay), chỉ **phóng to k lần**. Khớp trực giác: nhân với 2 làm vector dài gấp đôi.
- *"Quay theo chiều kim đồng hồ thì nhân với gì?"* Nhân với $e^{-i\\theta}$ (argument âm). Vd quay −90° = nhân với $-i$.

🔁 **Dừng lại tự kiểm tra**

1. Nhân $z = 2 + i$ với $i$. Kết quả? Ý nghĩa hình học?
2. Muốn quay một điểm 180° quanh O thì nhân với số nào?
3. Nhân $z = 3$ (số thực) với $4i$ thì điểm $z$ biến đổi thế nào (quay + co giãn)?

<details><summary>Đáp án</summary>

1. $(2+i)\\cdot i = 2i + i^2 = -1 + 2i$ → điểm $(2,1)$ quay 90° thành $(-1, 2)$.
2. Nhân với $-1$ ($= e^{i\\pi}$), tức đối xứng qua gốc O.
3. $4i = 4e^{i\\pi/2}$ → **quay 90° và phóng to gấp 4**. Đại số: $3\\cdot 4i = 12i$, tức điểm $(3,0)$ → $(0, 12)$ (dài gấp 4, quay lên trên). ✓

</details>

### 📝 Tóm tắt mục 4

- Nhân với $e^{i\\theta}$ = quay góc θ (giữ độ lớn); nhân với $re^{i\\theta}$ = quay θ + phóng to r.
- Nhân với i = quay 90°; với −1 = quay 180°; với số thực $k>0$ = chỉ phóng to.
- Số phức ≡ phép biến hình đồng dạng (quay + co giãn) trên mặt phẳng.

---

## 5. Bài tập

### Bài tập

**Bài 1**: Viết $z = -1 + i$ dưới dạng lượng giác.

**Bài 2**: Tính $\\left(\\cos\\dfrac{\\pi}{4} + i\\sin\\dfrac{\\pi}{4}\\right)^4$ dùng Euler.

**Bài 3**: Cho $z_1 = 2\\left(\\cos\\dfrac{\\pi}{6} + i\\sin\\dfrac{\\pi}{6}\\right)$, $z_2 = 3\\left(\\cos\\dfrac{\\pi}{3} + i\\sin\\dfrac{\\pi}{3}\\right)$. Tính $z_1\\cdot z_2$ dạng lượng giác.

**Bài 4**: Tính $e^{i\\cdot 2\\pi}$.

**Bài 5**: Quay $z = 1 + i$ đi 60° quanh O.

**Bài 6**: Viết $z = -2 - 2i$ dưới dạng lượng giác (chú ý phần tư).

**Bài 7**: Đổi $z = 3e^{i\\cdot 5\\pi/6}$ về dạng đại số $a + bi$.

**Bài 8**: Cho $z_1 = 6e^{i\\cdot 2\\pi/3}$, $z_2 = 2e^{i\\pi/3}$. Tính $\\dfrac{z_1}{z_2}$ dạng cực và dạng đại số.

**Bài 9**: Tính $e^{i\\cdot 3\\pi/2}$ và giải thích ý nghĩa hình học.

**Bài 10**: Chứng minh $e^{i\\pi} + 1 = 0$ từ công thức Euler, nêu rõ từng bước.

### Lời giải

**Bài 1**: $r = \\sqrt{2}$, $\\theta = \\pi - \\dfrac{\\pi}{4} = \\dfrac{3\\pi}{4}$ (góc phần tư II). → **$z = \\sqrt{2}\\left(\\cos\\dfrac{3\\pi}{4} + i\\sin\\dfrac{3\\pi}{4}\\right) = \\sqrt{2}\\,e^{i\\cdot 3\\pi/4}$**.

**Bài 2**: $(e^{i\\pi/4})^4 = e^{i\\pi} =$ **$-1$**.

**Bài 3**: $r = 2\\cdot 3 = 6$, $\\theta = \\dfrac{\\pi}{6} + \\dfrac{\\pi}{3} = \\dfrac{\\pi}{2}$. → **$6\\left(\\cos\\dfrac{\\pi}{2} + i\\sin\\dfrac{\\pi}{2}\\right) = 6i$**.

**Bài 4**: $e^{2\\pi i} = \\cos 2\\pi + i\\sin 2\\pi = 1 + 0i =$ **$1$**. (Tuần hoàn chu kỳ 2π!)

**Bài 5**: Quay 60° = nhân với $e^{i\\pi/3} = \\dfrac{1}{2} + i\\dfrac{\\sqrt{3}}{2}$.  
$(1+i)\\left(\\dfrac{1}{2} + i\\dfrac{\\sqrt{3}}{2}\\right) = \\dfrac{1}{2} + i\\dfrac{\\sqrt{3}}{2} + \\dfrac{i}{2} + i^2\\dfrac{\\sqrt{3}}{2} = \\left(\\dfrac{1}{2} - \\dfrac{\\sqrt{3}}{2}\\right) + i\\left(\\dfrac{\\sqrt{3}}{2} + \\dfrac{1}{2}\\right) \\approx$ **$-0.366 + 1.366i$**.

**Bài 6**: $a = -2, b = -2$ → cả hai âm → **phần tư III**.
- $r = \\sqrt{(-2)^2 + (-2)^2} = \\sqrt{8} = 2\\sqrt 2$.
- $\\arctan\\dfrac{b}{a} = \\arctan\\dfrac{-2}{-2} = \\arctan 1 = \\dfrac{\\pi}{4}$ — nhưng đây là góc phần tư I, **sai phần tư**. Chỉnh phần tư III: trừ $\\pi$ → $\\dfrac{\\pi}{4} - \\pi = -\\dfrac{3\\pi}{4}$ (hoặc tương đương $\\dfrac{5\\pi}{4}$).
- → **$z = 2\\sqrt 2\\left(\\cos\\left(-\\dfrac{3\\pi}{4}\\right) + i\\sin\\left(-\\dfrac{3\\pi}{4}\\right)\\right)$**. Kiểm: $2\\sqrt 2\\cos(-\\frac{3\\pi}{4}) = 2\\sqrt 2\\cdot(-\\frac{\\sqrt 2}{2}) = -2$ ✓, $2\\sqrt 2\\sin(-\\frac{3\\pi}{4}) = -2$ ✓.

**Bài 7**: $a = 3\\cos\\dfrac{5\\pi}{6} = 3\\cdot\\left(-\\dfrac{\\sqrt 3}{2}\\right) = -\\dfrac{3\\sqrt 3}{2}$; $b = 3\\sin\\dfrac{5\\pi}{6} = 3\\cdot\\dfrac12 = \\dfrac32$. → **$z = -\\dfrac{3\\sqrt 3}{2} + \\dfrac{3}{2}i$**.

**Bài 8**: Chia → mô-đun chia, argument trừ.
- Mô-đun: $\\dfrac{6}{2} = 3$. Argument: $\\dfrac{2\\pi}{3} - \\dfrac{\\pi}{3} = \\dfrac{\\pi}{3}$.
- Dạng cực: **$\\dfrac{z_1}{z_2} = 3e^{i\\pi/3}$**. Dạng đại số: $3\\left(\\cos\\dfrac{\\pi}{3} + i\\sin\\dfrac{\\pi}{3}\\right) = 3\\left(\\dfrac12 + i\\dfrac{\\sqrt 3}{2}\\right) = \\dfrac32 + \\dfrac{3\\sqrt 3}{2}i$.

**Bài 9**: $e^{i\\cdot 3\\pi/2} = \\cos\\dfrac{3\\pi}{2} + i\\sin\\dfrac{3\\pi}{2} = 0 + i\\cdot(-1) =$ **$-i$**. Ý nghĩa: quay điểm $1$ ngược chiều kim đồng hồ $\\dfrac{3\\pi}{2}$ (= 270°) trên đường tròn đơn vị → tới điểm $(0, -1)$, tức $-i$. (Tương đương quay $-90°$ theo chiều kim đồng hồ.)

**Bài 10**: 3 bước.
- Bước 1: công thức Euler $e^{i\\theta} = \\cos\\theta + i\\sin\\theta$.
- Bước 2: thay $\\theta = \\pi$ → $e^{i\\pi} = \\cos\\pi + i\\sin\\pi = -1 + i\\cdot 0 = -1$.
- Bước 3: chuyển vế → $e^{i\\pi} + 1 = 0$ ∎. Hình học: đi nửa vòng tròn đơn vị từ $1$ tới $-1$.

---

## 6. Bài tiếp theo

[Lesson 07 — De Moivre](../lesson-07-de-moivre/) — lũy thừa & căn của số phức.

## 📝 Tổng kết

1. **Dạng lượng giác**: $z = r(\\cos\\theta + i\\sin\\theta) = re^{i\\theta}$ — mô tả "độ dài $r$ + hướng $\\theta$" thay cho "ngang $a$ + dọc $b$". $r = \\sqrt{a^2+b^2}$, $a = r\\cos\\theta$, $b = r\\sin\\theta$.
2. **Đổi đại số ↔ cực**: tính $r$, xác định **phần tư**, lấy $\\theta = \\arctan(b/a)$ rồi chỉnh (II: $+\\pi$, III: $-\\pi$); điểm trên trục nhìn vị trí trực tiếp.
3. **Euler**: $e^{i\\theta} = \\cos\\theta + i\\sin\\theta$ (θ radian, $|e^{i\\theta}| = 1$). Chứng minh qua Taylor (chu kỳ 4 của $i$ tách thành $\\cos + i\\sin$); trực giác: vận tốc $i e^{i\\theta}$ ⊥ bán kính → đi tròn.
4. **Đẳng thức Euler** $e^{i\\pi} + 1 = 0$: nối $0, 1, \\pi, e, i$ — đi nửa vòng tròn từ $1$ tới $-1$.
5. **Nhân**: mô-đun nhân, argument cộng. **Chia**: mô-đun chia, argument trừ. (Đưa góc về $(-\\pi,\\pi]$ bằng $\\pm 2\\pi$.)
6. **Nhân với $e^{i\\theta}$ = quay góc θ**; với $re^{i\\theta}$ = quay θ + phóng to r → số phức ≡ phép biến hình đồng dạng (co giãn + quay).
`;
