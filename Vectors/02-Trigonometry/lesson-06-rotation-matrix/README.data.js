// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: Vectors/02-Trigonometry/lesson-06-rotation-matrix/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 06 — Ma trận xoay 2D/3D (Rotation Matrix)

> Tầng 2 · Trigonometry · Lesson 06 (bài cuối tầng)

## Mục tiêu học tập

Sau bài này, bạn sẽ:

- Hiểu **vector trong mặt phẳng** ở mức đủ dùng (sẽ học sâu ở Tầng 4): một cặp số có thứ tự $(x, y)$ mô tả mũi tên từ gốc $O$ đến điểm $(x, y)$.
- **Dẫn xuất** được công thức xoay điểm/vector quanh gốc bằng góc $\\theta$ — không phải nhớ vẹt, mà từ công thức cộng góc đã học ở Lesson 05.
- Viết và **đọc được ma trận xoay 2D** $R(\\theta)$, biết nhân ma trận với vector bằng tay.
- Liệt kê được **các tính chất quan trọng** của $R(\\theta)$: bảo toàn độ dài, bảo toàn cosine, $R(\\alpha)R(\\beta) = R(\\alpha+\\beta)$, $R(\\theta)^{-1} = R(-\\theta) = R(\\theta)^\\top$, định thức = 1.
- Mở rộng lên **3D**: ba ma trận xoay quanh trục \`Ox, Oy, Oz\`. Hiểu vì sao thứ tự quay quan trọng (KHÔNG giao hoán).
- **Hiểu RoPE (Rotary Position Embedding)** — kỹ thuật được dùng trong Llama, GPT-NeoX, Mistral, DeepSeek: tại sao "xoay" embedding theo vị trí lại khiến attention chỉ phụ thuộc vào **hiệu vị trí** $n - m$.
- Cài đặt được \`rotateVec2\`, \`rotateMatrix3DZ\`, \`multiplyMatVec\` và demo RoPE bằng Go.

## Kiến thức tiền đề

- [Lesson 05 — Identity và định lý cosin](../lesson-05-identities-cosine-law/) — vì công thức xoay dẫn xuất từ công thức cộng góc $\\cos(\\alpha+\\theta), \\sin(\\alpha+\\theta)$.
- [Lesson 03 — Đường tròn đơn vị](../lesson-03-unit-circle/) — để biểu diễn điểm bằng tọa độ cực $(r \\cos \\alpha, r \\sin \\alpha)$.
- [Lesson 02 — Tam giác vuông](../lesson-02-right-triangle/) — vì độ dài vector dùng định lý Pythagoras.
- [Algebra Lesson 08 — Hệ tuyến tính](../../01-Algebra/lesson-08-linear-systems/) — đã làm quen với khái niệm "ma trận", "nhân ma trận", "vế phải". Bài này chỉ dùng ma trận 2×2 và 3×3 đơn giản.

---

## 1. Vector trong mặt phẳng — giới thiệu nhanh

### 1.1 Trực giác — vector là một mũi tên có gốc tại \`O\`

> **💡 Trực giác**: tưởng tượng bạn đứng ở gốc tọa độ $O$ (góc bàn) và phóng một mũi tên đi. Mũi tên đó được mô tả đầy đủ bởi **vị trí đầu mũi tên**. Nếu nó kết thúc ở điểm $(3, 4)$, ta nói "vector $v = (3, 4)$".

Một **vector 2D** là một cặp số có thứ tự:

$$v = (x, y)$$

trong đó $x$ là tọa độ ngang, $y$ là tọa độ dọc. Cặp này biểu diễn cả **hướng** (từ $O$ ra $(x, y)$) lẫn **độ lớn** (khoảng cách từ $O$ đến $(x, y)$).

Cách biểu diễn dạng **cột (column vector)** — cách thường dùng khi đi với ma trận:

$$v = \\begin{bmatrix} x \\\\ y \\end{bmatrix}$$

Đây chỉ là **cách viết khác** của cùng một thứ. $(3, 4)$ viết hàng và $[3; 4]$ viết cột mang cùng thông tin. Sự khác biệt thuần kỹ thuật là khi nhân với ma trận, người ta thường viết dạng cột để công thức $R \\cdot v$ khớp với quy tắc nhân ma trận.

### 1.2 Bốn ví dụ cụ thể

| Vector | Biểu diễn cột | Mô tả |
|---|---|---|
| $(3, 0)$ | $[3; 0]$ | nằm trên trục Ox, dài 3 đơn vị, hướng phải. |
| $(0, 4)$ | $[0; 4]$ | nằm trên trục Oy, dài 4, hướng lên. |
| $(3, 4)$ | $[3; 4]$ | mũi tên chéo lên-phải. |
| $(-2, 1)$ | $[-2; 1]$ | mũi tên chéo lên-trái. |

### 1.3 Hai phép đo cơ bản trên vector

**Độ dài (magnitude)** — dùng Pythagoras (Lesson 02):

$$|v| = \\sqrt{x^2 + y^2}$$

- $|(3, 0)| = \\sqrt{9} = 3$.
- $|(0, 4)| = \\sqrt{16} = 4$.
- $|(3, 4)| = \\sqrt{9 + 16} = \\sqrt{25} = 5$.
- $|(-2, 1)| = \\sqrt{4 + 1} = \\sqrt{5} \\approx 2.236$.

**Góc với trục Ox (argument)** — dùng $\\text{atan2}$ (đã gặp ở Lesson 03):

$$\\theta = \\text{atan2}(y, x)$$

- $(3, 0)$: $\\text{atan2}(0, 3) = 0 \\to$ góc 0 (chỉ ngang).
- $(0, 4)$: $\\text{atan2}(4, 0) = \\pi/2 = 90^\\circ$ (chỉ thẳng lên).
- $(3, 4)$: $\\text{atan2}(4, 3) \\approx 0.9273 \\text{ rad} \\approx 53.13^\\circ$.
- $(-2, 1)$: $\\text{atan2}(1, -2) \\approx 2.6779 \\text{ rad} \\approx 153.43^\\circ$ (góc tù, phía trên-trái).

> **❓ Vì sao không dùng $\\arctan(y/x)$?** Vì $\\arctan$ chỉ trả về giá trị trong $(-\\pi/2, \\pi/2)$, không phân biệt được "phía phải" và "phía trái" mặt phẳng. Ví dụ $(3, 4)$ và $(-3, -4)$ đối xứng qua gốc nhưng tỉ số $y/x$ đều bằng $4/3 \\to \\arctan$ cho cùng kết quả. $\\text{atan2}(y, x)$ đọc cả dấu của $x$ và $y$ riêng biệt nên phân biệt được 4 quadrant.

### 1.4 Tọa độ cực — viết vector bằng (r, α) thay vì (x, y)

Một vector cũng có thể được mô tả bằng **độ dài $r$** và **góc $\\alpha$** với trục $Ox$:

$$\\begin{aligned}
x &= r \\cos \\alpha \\\\
y &= r \\sin \\alpha
\\end{aligned}$$

Walk-through $(3, 4)$:
- $r = 5$, $\\alpha = \\text{atan2}(4, 3) \\approx 0.9273 \\text{ rad}$.
- Kiểm tra ngược: $r \\cos \\alpha = 5 \\cdot \\cos(0.9273) = 5 \\cdot (3/5) = 3$ ✓.
- $r \\sin \\alpha = 5 \\cdot \\sin(0.9273) = 5 \\cdot (4/5) = 4$ ✓.

Đây là **cốt lõi** để dẫn xuất ma trận xoay ở Mục 4 — nên cần nhớ.

> **⚠ Lưu ý**: bài này chỉ giới thiệu vector ở mức "đủ dùng cho ma trận xoay". Phép cộng vector, phép nhân với scalar, tích vô hướng $u \\cdot v$, độc lập tuyến tính... sẽ học chính thức ở **Tầng 4 — Linear Algebra**. Ở đây ta chỉ cần biết: vector = cặp số, có độ dài, có góc — thế là đủ để xoay.

### 1.5 Tích vô hướng — gói gọn, chỉ cần khi nói về RoPE

Để Mục 8 (RoPE) hiểu được, cần biết **tích vô hướng (dot product)** ở mức công thức:

$$\\begin{aligned}
u \\cdot v &= u_1 v_1 + u_2 v_2 && \\text{(cho 2D)} \\\\
u \\cdot v &= u_1 v_1 + u_2 v_2 + u_3 v_3 && \\text{(cho 3D)}
\\end{aligned}$$

Ví dụ $u = (2, 0)$, $v = (0, 3)$: $u \\cdot v = 2 \\cdot 0 + 0 \\cdot 3 = 0$. Tích vô hướng = 0 nghĩa là 2 vector **vuông góc** — điều dễ thấy vì $u$ chạy ngang, $v$ chạy dọc.

Ví dụ $u = (3, 4)$, $v = (1, 2)$: $u \\cdot v = 3 \\cdot 1 + 4 \\cdot 2 = 11$.

Một tính chất quan trọng (chứng minh ở Tầng 4): $u \\cdot v = |u| \\cdot |v| \\cdot \\cos(\\text{góc giữa } u \\text{ và } v)$. Nên dot product mã hóa cả độ dài lẫn góc — đây là lý do nó xuất hiện khắp ML (cosine similarity, attention score).

> **📝 Tóm tắt Mục 1**
> - Vector 2D = cặp $(x, y)$, viết dạng cột khi đi với ma trận: $[x; y]$.
> - Độ dài $|v| = \\sqrt{x^2 + y^2}$, góc $\\theta = \\text{atan2}(y, x)$.
> - Tọa độ cực $(r, \\alpha)$: $x = r \\cos \\alpha$, $y = r \\sin \\alpha$ — sẽ dùng để dẫn xuất ma trận xoay.
> - Dot product $u \\cdot v = u_1 v_1 + u_2 v_2$ — cần ở Mục 8 (RoPE).

---

## 2. Bài toán: xoay điểm/vector quanh gốc \`O\`

### 2.1 Phát biểu

Cho điểm $P = (x, y)$. **Quay** $P$ quanh gốc $O$ một góc $\\theta$ (theo chiều **ngược kim đồng hồ** — quy ước toán học chuẩn), ta được điểm mới $P' = (x', y')$.

**Câu hỏi cốt lõi**: $x', y' = ?$ theo $x, y, \\theta$?

### 2.2 Hình dung trước khi tính

> **💡 Trực giác**: vẽ điểm $P$ lên giấy, đặt 1 đầu compa tại $O$, đầu kia tại $P$. Quay compa ngược kim đồng hồ một góc $\\theta$. Đầu bút sẽ đi đến điểm $P'$. Ta hỏi: tọa độ $P'$ là gì?

Đặc điểm quan trọng:
- **Khoảng cách giữ nguyên**: $|OP| = |OP'|$ (compa giữ độ mở).
- **Góc với trục Ox tăng thêm $\\theta$**: nếu trước đó $OP$ lệch trục Ox một góc $\\alpha$, thì $OP'$ lệch một góc $\\alpha + \\theta$.

### 2.3 Ba ví dụ mở đầu (chưa có công thức tổng quát)

Trước khi đi vào công thức, hãy quan sát 3 trường hợp đơn giản (xoay điểm $(1, 0)$ — nằm trên trục Ox):

| Góc xoay $\\theta$ | $(1, 0)$ quay thành | Vì sao |
|---|---|---|
| $90^\\circ$ | $(0, 1)$ | xoay 1/4 vòng ngược kim → từ Đông sang Bắc. |
| $180^\\circ$ | $(-1, 0)$ | nửa vòng → đảo dấu cả 2 tọa độ. |
| $270^\\circ$ | $(0, -1)$ | 3/4 vòng → từ Đông xuống Nam. |
| $360^\\circ$ | $(1, 0)$ | nguyên 1 vòng → về chỗ cũ. |

Quan sát: tọa độ mới của $(1, 0)$ sau khi xoay $\\theta$ chính là $(\\cos \\theta, \\sin \\theta)$ — nhìn $\\cos 90^\\circ = 0, \\sin 90^\\circ = 1 \\to (0, 1)$; $\\cos 180^\\circ = -1, \\sin 180^\\circ = 0 \\to (-1, 0)$; đúng cả 4 ô.

Đó cũng chính là **định nghĩa cos/sin trên đường tròn đơn vị** (Lesson 03). Mục 4 sẽ tổng quát hóa cho mọi \`(x, y)\`.

---

## 3. Một số ví dụ chạy thử bằng "compa tưởng tượng"

Trước khi dẫn xuất, hãy thử thêm vài ca để có cảm giác:

**Ví dụ 3.1** — Xoay $(2, 0)$ bởi $90^\\circ$.

$(2, 0)$ là điểm trên trục Ox cách $O$ 2 đơn vị. Xoay $90^\\circ$ ngược kim → lên trên trục Oy, vẫn cách $O$ 2 đơn vị → $(0, 2)$.

**Ví dụ 3.2** — Xoay $(0, 5)$ bởi $90^\\circ$.

$(0, 5)$ đang ở trục Oy, dương. Xoay $90^\\circ$ → quay sang trục Ox âm → $(-5, 0)$. (Hãy hình dung kim đồng hồ chạy ngược 1 nấc.)

**Ví dụ 3.3** — Xoay $(1, 1)$ bởi $90^\\circ$.

$(1, 1)$ lệch trục Ox $45^\\circ$. Sau khi xoay thêm $90^\\circ$, lệch $135^\\circ$. Khoảng cách giữ $\\sqrt{2}$. Tọa độ mới: $(\\sqrt{2} \\cos 135^\\circ, \\sqrt{2} \\sin 135^\\circ) = (\\sqrt{2} \\cdot (-\\tfrac{\\sqrt{2}}{2}), \\sqrt{2} \\cdot \\tfrac{\\sqrt{2}}{2}) = (-1, 1)$.

> **🔁 Dừng lại tự kiểm tra**: Xoay $(3, 0)$ bởi $180^\\circ$ ra điểm nào? <details><summary>Đáp án</summary><code>(−3, 0)</code> — đảo dấu hoành độ, tung độ giữ 0.</details>
>
> Xoay $(0, -2)$ bởi $90^\\circ$ ngược kim ra điểm nào? <details><summary>Đáp án</summary><code>(2, 0)</code>. Từ trục Oy âm xoay ngược kim 90° → trục Ox dương.</details>

Quan sát chung: nhìn lâu rồi cảm giác được "nó đi đâu", nhưng để **chương trình hóa**, cần một công thức gọn theo $(x, y, \\theta)$. Đó là Mục 4.

---

## 4. Dẫn xuất công thức xoay (DERIVATION)

### 4.1 Bước 1 — Viết \`P\` ở dạng tọa độ cực

Cho $P = (x, y)$. Đặt:

$$\\begin{aligned}
r &= |OP| = \\sqrt{x^2 + y^2} \\\\
\\alpha &= \\text{atan2}(y, x) && \\text{(góc } OP \\text{ với trục Ox)}
\\end{aligned}$$

Khi đó (Mục 1.4):

$$\\begin{aligned}
x &= r \\cos \\alpha \\\\
y &= r \\sin \\alpha
\\end{aligned}$$

### 4.2 Bước 2 — Sau khi xoay, góc tăng θ, độ dài giữ nguyên

$P'$ cũng cách $O$ đúng $r$ (compa giữ độ mở). Góc của $OP'$ với trục Ox là $\\alpha + \\theta$.

Vậy:

$$\\begin{aligned}
x' &= r \\cos(\\alpha + \\theta) \\\\
y' &= r \\sin(\\alpha + \\theta)
\\end{aligned}$$

### 4.3 Bước 3 — Khai triển bằng công thức cộng góc (Lesson 05)

Từ Lesson 05:
- $\\cos(\\alpha + \\theta) = \\cos \\alpha \\cdot \\cos \\theta - \\sin \\alpha \\cdot \\sin \\theta$.
- $\\sin(\\alpha + \\theta) = \\sin \\alpha \\cdot \\cos \\theta + \\cos \\alpha \\cdot \\sin \\theta$.

Thay vào:

$$\\begin{aligned}
x' &= r \\cdot (\\cos \\alpha \\cdot \\cos \\theta - \\sin \\alpha \\cdot \\sin \\theta) \\\\
   &= (r \\cos \\alpha) \\cdot \\cos \\theta - (r \\sin \\alpha) \\cdot \\sin \\theta \\\\
   &= x \\cdot \\cos \\theta - y \\cdot \\sin \\theta
\\end{aligned}$$

$$\\begin{aligned}
y' &= r \\cdot (\\sin \\alpha \\cdot \\cos \\theta + \\cos \\alpha \\cdot \\sin \\theta) \\\\
   &= (r \\sin \\alpha) \\cdot \\cos \\theta + (r \\cos \\alpha) \\cdot \\sin \\theta \\\\
   &= y \\cdot \\cos \\theta + x \\cdot \\sin \\theta \\\\
   &= x \\cdot \\sin \\theta + y \\cdot \\cos \\theta
\\end{aligned}$$

### 4.4 Kết quả — công thức xoay 2D

> **🎯 Công thức xoay điểm $(x, y)$ quanh gốc $O$ góc $\\theta$ (ngược kim đồng hồ):**
>
> $$\\begin{aligned}
> x' &= x \\cdot \\cos \\theta - y \\cdot \\sin \\theta \\\\
> y' &= x \\cdot \\sin \\theta + y \\cdot \\cos \\theta
> \\end{aligned}$$

Lưu ý dấu trừ chỉ ở dòng trên ($y \\cdot \\sin \\theta$), dòng dưới là dấu cộng ($x \\cdot \\sin \\theta$). **Nhầm dấu = công thức sai hẳn**, hãy nhớ kỹ.

### 4.5 Walk-through verify với các ví dụ Mục 3

**Verify 3.1**: Xoay $(2, 0)$ bởi $90^\\circ$ ($\\cos 90^\\circ = 0, \\sin 90^\\circ = 1$).
- $x' = 2 \\cdot 0 - 0 \\cdot 1 = 0$.
- $y' = 2 \\cdot 1 + 0 \\cdot 0 = 2$.
- → $(0, 2)$ ✓.

**Verify 3.2**: Xoay $(0, 5)$ bởi $90^\\circ$.
- $x' = 0 \\cdot 0 - 5 \\cdot 1 = -5$.
- $y' = 0 \\cdot 1 + 5 \\cdot 0 = 0$.
- → $(-5, 0)$ ✓.

**Verify 3.3**: Xoay $(1, 1)$ bởi $90^\\circ$.
- $x' = 1 \\cdot 0 - 1 \\cdot 1 = -1$.
- $y' = 1 \\cdot 1 + 1 \\cdot 0 = 1$.
- → $(-1, 1)$ ✓.

**Verify 1 ví dụ mới**: Xoay $(3, 4)$ bởi $180^\\circ$ ($\\cos = -1, \\sin = 0$):
- $x' = 3 \\cdot (-1) - 4 \\cdot 0 = -3$.
- $y' = 3 \\cdot 0 + 4 \\cdot (-1) = -4$.
- → $(-3, -4)$ — đúng, $180^\\circ$ đảo dấu cả 2 tọa độ.

> **❓ Câu hỏi tự nhiên**: "Vậy nếu xoay theo chiều kim đồng hồ thì sao?" — Đơn giản là dùng $\\theta < 0$ (hoặc $-\\theta$). Vì $\\cos(-\\theta) = \\cos \\theta$ (hàm chẵn) và $\\sin(-\\theta) = -\\sin \\theta$ (hàm lẻ), ma trận xoay ngược chiều kim:
>
> $$\\begin{aligned}
> x' &= x \\cos \\theta + y \\sin \\theta \\\\
> y' &= -x \\sin \\theta + y \\cos \\theta
> \\end{aligned}$$
>
> (chỉ đổi dấu của $\\sin \\theta$ so với công thức gốc).

> **⚠ Lỗi thường gặp**:
> - **Quên dấu trừ ở dòng $x'$**: viết $x' = x \\cos \\theta + y \\sin \\theta$ là sai. Cách nhớ: "dòng trên trừ, dòng dưới cộng".
> - **Đổi vai trò $\\sin$ và $\\cos$** giữa dòng 1 và dòng 2. Kiểm tra nhanh: với $\\theta = 90^\\circ$ ($\\cos = 0, \\sin = 1$), $(1, 0)$ phải ra $(0, 1)$. Nếu công thức của bạn ra $(0, -1)$ hay $(1, 0)$ → sai dấu hoặc sai vai trò.
> - **Lẫn lộn radian và độ**: trong Go, Python, JS, hàm \`Math.cos/Math.sin\` nhận **radian**. Truyền \`90\` (độ) trực tiếp = sai. Phải chuyển: \`90 * Math.PI / 180\`.

> **📝 Tóm tắt Mục 4**
> - Mọi điểm $(x, y)$ xoay góc $\\theta$ quanh $O$ thành $(x', y') = (x \\cos \\theta - y \\sin \\theta, x \\sin \\theta + y \\cos \\theta)$.
> - Dẫn xuất 3 bước: cực hóa → cộng góc → khai triển.
> - Chiều ngược kim đồng hồ là chiều dương.
> - Hàm $\\cos/\\sin$ nhận radian, không nhận độ.

---

## 5. Ma trận xoay 2D

### 5.1 Đóng gói công thức thành ma trận

Hai phương trình:

$$\\begin{aligned}
x' &= (\\cos \\theta) \\cdot x + (-\\sin \\theta) \\cdot y \\\\
y' &= (\\sin \\theta) \\cdot x + (\\cos \\theta) \\cdot y
\\end{aligned}$$

Đây là dạng **kết hợp tuyến tính** của $x$ và $y$ — chính xác là thứ ma trận sinh ra để biểu diễn:

$$\\begin{bmatrix} x' \\\\ y' \\end{bmatrix} = \\begin{bmatrix} \\cos \\theta & -\\sin \\theta \\\\ \\sin \\theta & \\cos \\theta \\end{bmatrix} \\begin{bmatrix} x \\\\ y \\end{bmatrix}$$

Bảng 2×2 ở giữa được gọi là **ma trận xoay** (rotation matrix), ký hiệu:

$$R(\\theta) = \\begin{bmatrix} \\cos \\theta & -\\sin \\theta \\\\ \\sin \\theta & \\cos \\theta \\end{bmatrix}$$

> **💡 Trực giác**: ma trận là một "máy biến đổi". Bạn nhét vector $v$ vào, nó trả ra vector mới $R(\\theta) v$ = $v$ đã xoay góc $\\theta$.

### 5.2 Phép nhân ma trận với vector — quy tắc đủ dùng cho 2D

Cho:

$$M = \\begin{bmatrix} a & b \\\\ c & d \\end{bmatrix}, \\qquad v = \\begin{bmatrix} x \\\\ y \\end{bmatrix}$$

Khi đó:

$$M \\cdot v = \\begin{bmatrix} a \\cdot x + b \\cdot y \\\\ c \\cdot x + d \\cdot y \\end{bmatrix}$$

Quy tắc nhớ: **hàng × cột**. Hàng 1 của $M$ $(a, b)$ "nhân chấm" với cột $v$ $(x, y)$ cho phần tử đầu của kết quả. Hàng 2 cho phần tử thứ hai.

Tổng quát hóa cho ma trận $n \\times n$ và vector $n \\times 1$ chỉ là làm lại với nhiều hàng hơn. Tầng 4 sẽ học kỹ; ở đây dùng được là đủ.

### 5.3 Walk-through 4 ví dụ xoay \`(1, 0)\`

**Ví dụ 5.3a — $\\theta = 90^\\circ$** ($\\cos 90^\\circ = 0$, $\\sin 90^\\circ = 1$).

$$R(90^\\circ) = \\begin{bmatrix} 0 & -1 \\\\ 1 & 0 \\end{bmatrix}$$

$$R(90^\\circ) \\cdot \\begin{bmatrix} 1 \\\\ 0 \\end{bmatrix} = \\begin{bmatrix} 0 \\cdot 1 + (-1) \\cdot 0 \\\\ 1 \\cdot 1 + 0 \\cdot 0 \\end{bmatrix} = \\begin{bmatrix} 0 \\\\ 1 \\end{bmatrix}$$

→ $(0, 1)$. Tức $(1, 0)$ xoay $90^\\circ$ thành $(0, 1)$ — chuyển từ trục Ox sang trục Oy.

**Ví dụ 5.3b — $\\theta = 180^\\circ$** ($\\cos = -1$, $\\sin = 0$).

$$R(180^\\circ) = \\begin{bmatrix} -1 & 0 \\\\ 0 & -1 \\end{bmatrix}$$

$$R(180^\\circ) \\cdot \\begin{bmatrix} 1 \\\\ 0 \\end{bmatrix} = \\begin{bmatrix} (-1) \\cdot 1 + 0 \\cdot 0 \\\\ 0 \\cdot 1 + (-1) \\cdot 0 \\end{bmatrix} = \\begin{bmatrix} -1 \\\\ 0 \\end{bmatrix}$$

→ $(-1, 0)$. $180^\\circ$ đảo dấu mọi tọa độ.

**Ví dụ 5.3c — $\\theta = 270^\\circ$** ($\\cos = 0$, $\\sin = -1$).

$$R(270^\\circ) = \\begin{bmatrix} 0 & 1 \\\\ -1 & 0 \\end{bmatrix}$$

$$R(270^\\circ) \\cdot \\begin{bmatrix} 1 \\\\ 0 \\end{bmatrix} = \\begin{bmatrix} 0 \\cdot 1 + 1 \\cdot 0 \\\\ -1 \\cdot 1 + 0 \\cdot 0 \\end{bmatrix} = \\begin{bmatrix} 0 \\\\ -1 \\end{bmatrix}$$

→ $(0, -1)$. $270^\\circ$ ngược kim = $90^\\circ$ xuôi kim, đưa $(1, 0)$ xuống $(0, -1)$.

**Ví dụ 5.3d — $\\theta = 45^\\circ$** ($\\cos 45^\\circ = \\sin 45^\\circ = \\tfrac{\\sqrt{2}}{2} \\approx 0.7071$).

$$R(45^\\circ) = \\begin{bmatrix} \\tfrac{\\sqrt{2}}{2} & -\\tfrac{\\sqrt{2}}{2} \\\\ \\tfrac{\\sqrt{2}}{2} & \\tfrac{\\sqrt{2}}{2} \\end{bmatrix} \\approx \\begin{bmatrix} 0.7071 & -0.7071 \\\\ 0.7071 & 0.7071 \\end{bmatrix}$$

$$R(45^\\circ) \\cdot \\begin{bmatrix} 1 \\\\ 0 \\end{bmatrix} = \\begin{bmatrix} \\tfrac{\\sqrt{2}}{2} \\\\ \\tfrac{\\sqrt{2}}{2} \\end{bmatrix}$$

→ $(\\tfrac{\\sqrt{2}}{2}, \\tfrac{\\sqrt{2}}{2}) \\approx (0.7071, 0.7071)$. Đầu mũi tên $(1, 0)$ xoay $45^\\circ$ rơi đúng trên đường phân giác góc Ox-Oy, cách $O$ 1 đơn vị (vì độ dài giữ nguyên).

### 5.4 Walk-through xoay điểm khác \`(0, 0)\`

Xoay $(3, 4)$ bởi $30^\\circ$. Có $\\cos 30^\\circ = \\tfrac{\\sqrt{3}}{2} \\approx 0.8660$, $\\sin 30^\\circ = \\tfrac{1}{2} = 0.5$.

$$R(30^\\circ) = \\begin{bmatrix} 0.8660 & -0.5 \\\\ 0.5 & 0.8660 \\end{bmatrix}$$

$$R(30^\\circ) \\cdot \\begin{bmatrix} 3 \\\\ 4 \\end{bmatrix} = \\begin{bmatrix} 0.8660 \\cdot 3 + (-0.5) \\cdot 4 \\\\ 0.5 \\cdot 3 + 0.8660 \\cdot 4 \\end{bmatrix} = \\begin{bmatrix} 2.598 - 2 \\\\ 1.5 + 3.464 \\end{bmatrix} = \\begin{bmatrix} 0.598 \\\\ 4.964 \\end{bmatrix}$$

→ $(0.598, 4.964)$. Kiểm tra độ dài: $\\sqrt{0.598^2 + 4.964^2} = \\sqrt{0.358 + 24.641} = \\sqrt{24.999} \\approx 5$ ✓ (bằng $|(3, 4)| = 5$).

> **❓ Câu hỏi tự nhiên**: "Tại sao phải đóng gói thành ma trận khi 2 phương trình đã đủ rồi?" — 3 lý do:
> 1. **Tính chất gộp tự nhiên**: xoay 2 lần liên tiếp = nhân 2 ma trận (Mục 6).
> 2. **Tổng quát hóa cho không gian cao chiều**: 3D, n-D đều áp dụng cùng quy tắc, công thức kéo dài tay sẽ cồng kềnh.
> 3. **Hiệu năng**: thư viện (NumPy, BLAS, GPU) tăng tốc rất mạnh cho phép nhân ma trận. Viết bằng matrix → compiler/library biết tối ưu.

> **📝 Tóm tắt Mục 5**
> - $R(\\theta) = \\begin{bmatrix} \\cos \\theta & -\\sin \\theta \\\\ \\sin \\theta & \\cos \\theta \\end{bmatrix}$.
> - Nhân $R \\cdot v$ theo quy tắc hàng × cột.
> - Xoay $(1, 0)$ bởi $90^\\circ, 180^\\circ, 270^\\circ, 45^\\circ$ ra $(0,1), (-1,0), (0,-1), (\\tfrac{\\sqrt{2}}{2}, \\tfrac{\\sqrt{2}}{2})$ — cảm giác trực quan từ đường tròn đơn vị.

---

## 6. Tính chất của ma trận xoay

Mục này phát biểu **5 tính chất**. Mỗi tính chất kèm chứng minh ngắn + walk-through bằng số.

### 6.1 Bảo toàn độ dài: |R(θ) v| = |v|

> **💡 Trực giác**: xoay không kéo giãn, không nén — chỉ "quay" nguyên đai nguyên kiện. Độ dài không đổi là điều hiển nhiên về mặt vật lý; cần chứng minh để biết công thức trên không "phá" tính chất này.

**Chứng minh** (3 bước):

Cho $v = (x, y)$, $R(\\theta) v = (x', y')$ với $x' = x \\cos \\theta - y \\sin \\theta$, $y' = x \\sin \\theta + y \\cos \\theta$. Tính $|R(\\theta) v|^2 = x'^2 + y'^2$:

1. **Khai triển $x'^2$**:
   $$\\begin{aligned}
   x'^2 &= (x \\cos \\theta - y \\sin \\theta)^2 \\\\
        &= x^2 \\cos^2\\theta - 2xy \\cos \\theta \\sin \\theta + y^2 \\sin^2\\theta
   \\end{aligned}$$

2. **Khai triển $y'^2$**:
   $$\\begin{aligned}
   y'^2 &= (x \\sin \\theta + y \\cos \\theta)^2 \\\\
        &= x^2 \\sin^2\\theta + 2xy \\sin \\theta \\cos \\theta + y^2 \\cos^2\\theta
   \\end{aligned}$$

3. **Cộng lại**:
   $$\\begin{aligned}
   x'^2 + y'^2 &= x^2(\\cos^2\\theta + \\sin^2\\theta) + y^2(\\sin^2\\theta + \\cos^2\\theta) + 0 \\\\
               &= x^2 \\cdot 1 + y^2 \\cdot 1 \\\\
               &= x^2 + y^2 \\\\
               &= |v|^2
   \\end{aligned}$$

Hai số hạng chéo $\\pm 2xy \\cos \\theta \\sin \\theta$ triệt tiêu. Bài tận dụng identity Pythagoras $\\cos^2\\theta + \\sin^2\\theta = 1$ từ Lesson 02.

Vậy $|R(\\theta) v|^2 = |v|^2 \\to |R(\\theta) v| = |v|$. ✓

**Walk-through**: $v = (3, 4)$, $\\theta = 30^\\circ$. Mục 5.4 đã tính $R(30^\\circ) v \\approx (0.598, 4.964)$. Độ dài $\\approx \\sqrt{0.598^2 + 4.964^2} \\approx \\sqrt{24.999} \\approx 5 = |v|$ ✓.

### 6.2 Bảo toàn dot product (và do đó bảo toàn cosine similarity)

**Phát biểu**: $(R(\\theta) u) \\cdot (R(\\theta) v) = u \\cdot v$ với mọi $u, v$.

> **💡 Trực giác**: xoay cả 2 vector cùng một góc → tương quan giữa chúng không đổi. Khoảng cách Eucle không đổi, góc giữa chúng cũng không đổi.

**Chứng minh ngắn**: Cho $u = (a, b), v = (c, d)$. Đặt:
- $u' = R(\\theta) u = (a \\cos \\theta - b \\sin \\theta, a \\sin \\theta + b \\cos \\theta)$.
- $v' = R(\\theta) v = (c \\cos \\theta - d \\sin \\theta, c \\sin \\theta + d \\cos \\theta)$.

Tính $u' \\cdot v'$:

$$\\begin{aligned}
u' \\cdot v' &= (a \\cos \\theta - b \\sin \\theta)(c \\cos \\theta - d \\sin \\theta) \\\\
            &+ (a \\sin \\theta + b \\cos \\theta)(c \\sin \\theta + d \\cos \\theta)
\\end{aligned}$$

Khai triển từng tích:

$$\\begin{aligned}
(1) &= ac \\cos^2\\theta - ad \\cos \\theta \\sin \\theta - bc \\sin \\theta \\cos \\theta + bd \\sin^2\\theta \\\\
(2) &= ac \\sin^2\\theta + ad \\sin \\theta \\cos \\theta + bc \\cos \\theta \\sin \\theta + bd \\cos^2\\theta
\\end{aligned}$$

Cộng: các số hạng $\\cos \\theta \\sin \\theta$ triệt tiêu, còn lại:

$$\\begin{aligned}
&ac (\\cos^2\\theta + \\sin^2\\theta) + bd (\\cos^2\\theta + \\sin^2\\theta) \\\\
&= ac \\cdot 1 + bd \\cdot 1 \\\\
&= ac + bd \\\\
&= u \\cdot v \\quad ✓
\\end{aligned}$$

**Hệ quả**: vì $\\cos(\\text{góc giữa } u, v) = \\dfrac{u \\cdot v}{|u| \\, |v|}$ và cả tử số ($u \\cdot v$) lẫn mẫu số ($|u| \\, |v|$) không đổi khi xoay → **cosine similarity không đổi**. Trong các pipeline ML, biến đổi xoay là "biến đổi trung lập" cho tìm kiếm bằng cosine.

**Walk-through**: $u = (2, 0)$, $v = (0, 3)$ → $u \\cdot v = 0$. Xoay cả 2 bởi $60^\\circ$:
- $R(60^\\circ) u = (2 \\cdot 0.5 - 0 \\cdot 0.866, 2 \\cdot 0.866 + 0 \\cdot 0.5) = (1, 1.732)$.
- $R(60^\\circ) v = (0 \\cdot 0.5 - 3 \\cdot 0.866, 0 \\cdot 0.866 + 3 \\cdot 0.5) = (-2.598, 1.5)$.
- $u' \\cdot v' = 1 \\cdot (-2.598) + 1.732 \\cdot 1.5 = -2.598 + 2.598 = 0$ ✓.

### 6.3 Tích 2 ma trận xoay: R(α) · R(β) = R(α + β)

> **💡 Trực giác**: xoay $30^\\circ$ rồi xoay tiếp $60^\\circ$ = xoay $90^\\circ$ một phát. Hiển nhiên về mặt hình học; ta xác nhận nó cũng đúng về mặt đại số.

**Chứng minh** (nhân 2 ma trận 2×2):

$$R(\\alpha) \\cdot R(\\beta) = \\begin{bmatrix} \\cos \\alpha & -\\sin \\alpha \\\\ \\sin \\alpha & \\cos \\alpha \\end{bmatrix} \\cdot \\begin{bmatrix} \\cos \\beta & -\\sin \\beta \\\\ \\sin \\beta & \\cos \\beta \\end{bmatrix}$$

Quy tắc nhân ma trận 2×2: phần tử $(i, j)$ của tích = hàng $i$ của ma trận trái nhân chấm cột $j$ của ma trận phải.

- Phần tử $(1, 1)$: $\\cos \\alpha \\cdot \\cos \\beta + (-\\sin \\alpha) \\cdot \\sin \\beta = \\cos \\alpha \\cos \\beta - \\sin \\alpha \\sin \\beta = \\cos(\\alpha + \\beta)$.
- Phần tử $(1, 2)$: $\\cos \\alpha \\cdot (-\\sin \\beta) + (-\\sin \\alpha) \\cdot \\cos \\beta = -(\\sin \\alpha \\cos \\beta + \\cos \\alpha \\sin \\beta) = -\\sin(\\alpha + \\beta)$.
- Phần tử $(2, 1)$: $\\sin \\alpha \\cdot \\cos \\beta + \\cos \\alpha \\cdot \\sin \\beta = \\sin(\\alpha + \\beta)$.
- Phần tử $(2, 2)$: $\\sin \\alpha \\cdot (-\\sin \\beta) + \\cos \\alpha \\cdot \\cos \\beta = \\cos \\alpha \\cos \\beta - \\sin \\alpha \\sin \\beta = \\cos(\\alpha + \\beta)$.

Gộp lại:

$$R(\\alpha) \\cdot R(\\beta) = \\begin{bmatrix} \\cos(\\alpha+\\beta) & -\\sin(\\alpha+\\beta) \\\\ \\sin(\\alpha+\\beta) & \\cos(\\alpha+\\beta) \\end{bmatrix} = R(\\alpha + \\beta) \\quad ✓$$

Lại dùng công thức cộng từ Lesson 05. Đẹp.

**Walk-through**: $\\alpha = 60^\\circ, \\beta = 30^\\circ$. Tính $R(60^\\circ) R(30^\\circ)$:

$$R(60^\\circ) \\approx \\begin{bmatrix} 0.5 & -0.866 \\\\ 0.866 & 0.5 \\end{bmatrix}, \\qquad R(30^\\circ) \\approx \\begin{bmatrix} 0.866 & -0.5 \\\\ 0.5 & 0.866 \\end{bmatrix}$$

$$\\begin{aligned}
R(60^\\circ) \\cdot R(30^\\circ): \\\\
(1,1) &= 0.5 \\cdot 0.866 + (-0.866) \\cdot 0.5 = 0.433 - 0.433 = 0 \\\\
(1,2) &= 0.5 \\cdot (-0.5) + (-0.866) \\cdot 0.866 = -0.25 - 0.75 = -1 \\\\
(2,1) &= 0.866 \\cdot 0.866 + 0.5 \\cdot 0.5 = 0.75 + 0.25 = 1 \\\\
(2,2) &= 0.866 \\cdot (-0.5) + 0.5 \\cdot 0.866 = -0.433 + 0.433 = 0
\\end{aligned}$$

$$= \\begin{bmatrix} 0 & -1 \\\\ 1 & 0 \\end{bmatrix} = R(90^\\circ) \\quad ✓$$

### 6.4 Nghịch đảo: R(θ)⁻¹ = R(−θ) = R(θ)ᵀ

> **💡 Trực giác**: nếu đã xoay $30^\\circ$ rồi muốn quay lại, chỉ cần xoay $-30^\\circ$ (theo chiều kim). Vậy nghịch đảo của $R(30^\\circ)$ phải là $R(-30^\\circ)$.

**Chứng minh**:

Theo 6.3: $R(\\theta) \\cdot R(-\\theta) = R(\\theta + (-\\theta)) = R(0) = I$ (ma trận đơn vị $\\begin{bmatrix} 1 & 0 \\\\ 0 & 1 \\end{bmatrix}$).
Tương tự $R(-\\theta) \\cdot R(\\theta) = R(0) = I$.

Vậy $R(\\theta)^{-1} = R(-\\theta)$.

Lại có:

$$R(-\\theta) = \\begin{bmatrix} \\cos(-\\theta) & -\\sin(-\\theta) \\\\ \\sin(-\\theta) & \\cos(-\\theta) \\end{bmatrix} = \\begin{bmatrix} \\cos \\theta & \\sin \\theta \\\\ -\\sin \\theta & \\cos \\theta \\end{bmatrix}$$

(vì $\\cos(-\\theta) = \\cos \\theta, \\sin(-\\theta) = -\\sin \\theta$).

Trong khi đó, **ma trận chuyển vị** (transpose) $R(\\theta)^\\top$ = lật ma trận qua đường chéo:

$$R(\\theta)^\\top = \\begin{bmatrix} \\cos \\theta & \\sin \\theta \\\\ -\\sin \\theta & \\cos \\theta \\end{bmatrix}$$

Đây chính là $R(-\\theta)$. ✓

> **🎯 Kết luận quan trọng**: $R(\\theta)^\\top R(\\theta) = I$. Ma trận thỏa tính chất này gọi là **ma trận trực giao (orthogonal matrix)**. Trong ML/DL, ma trận trực giao có khi được dùng để khởi tạo trọng số vì chúng bảo toàn độ dài → giảm vanishing/exploding gradient.

**Walk-through verify**: $R(30^\\circ)^\\top \\cdot R(30^\\circ)$:

$$R(30^\\circ) = \\begin{bmatrix} 0.866 & -0.5 \\\\ 0.5 & 0.866 \\end{bmatrix}, \\qquad R(30^\\circ)^\\top = \\begin{bmatrix} 0.866 & 0.5 \\\\ -0.5 & 0.866 \\end{bmatrix}$$

$$\\begin{aligned}
R(30^\\circ)^\\top \\cdot R(30^\\circ): \\\\
(1,1) &= 0.866 \\cdot 0.866 + 0.5 \\cdot 0.5 = 0.75 + 0.25 = 1 \\\\
(1,2) &= 0.866 \\cdot (-0.5) + 0.5 \\cdot 0.866 = -0.433 + 0.433 = 0 \\\\
(2,1) &= (-0.5) \\cdot 0.866 + 0.866 \\cdot 0.5 = 0 \\\\
(2,2) &= (-0.5) \\cdot (-0.5) + 0.866 \\cdot 0.866 = 0.25 + 0.75 = 1
\\end{aligned}$$

$$= \\begin{bmatrix} 1 & 0 \\\\ 0 & 1 \\end{bmatrix} = I \\quad ✓$$

### 6.5 Định thức det R(θ) = 1

**Phát biểu**: với ma trận 2×2 $\\begin{bmatrix} a & b \\\\ c & d \\end{bmatrix}$, định thức = $ad - bc$ (đã gặp ở Algebra Lesson 08, công thức Cramer).

Cho $R(\\theta)$:

$$\\begin{aligned}
\\det R(\\theta) &= \\cos \\theta \\cdot \\cos \\theta - (-\\sin \\theta) \\cdot \\sin \\theta \\\\
               &= \\cos^2\\theta + \\sin^2\\theta \\\\
               &= 1
\\end{aligned}$$

> **💡 Trực giác về định thức**: định thức là "tỉ lệ phóng/thu diện tích" mà phép biến đổi gây ra. $\\det = 1$ → diện tích không đổi (đúng, xoay không đổi diện tích). $\\det = 2$ → mọi hình bị nhân đôi diện tích. $\\det = -1$ → diện tích như cũ nhưng đảo hướng (phản chiếu).

Tầng 4 sẽ học chi tiết về định thức.

### 6.6 Trường hợp đặc biệt — bảng các ma trận xoay quen thuộc

| $\\theta$ | $R(\\theta)$ |
|---|---|
| $0^\\circ$ | $\\begin{bmatrix} 1 & 0 \\\\ 0 & 1 \\end{bmatrix} = I$ (không xoay). |
| $90^\\circ$ | $\\begin{bmatrix} 0 & -1 \\\\ 1 & 0 \\end{bmatrix}$ |
| $180^\\circ$ | $\\begin{bmatrix} -1 & 0 \\\\ 0 & -1 \\end{bmatrix} = -I$ |
| $270^\\circ$ | $\\begin{bmatrix} 0 & 1 \\\\ -1 & 0 \\end{bmatrix}$ |
| $45^\\circ$ | $\\tfrac{\\sqrt{2}}{2} \\cdot \\begin{bmatrix} 1 & -1 \\\\ 1 & 1 \\end{bmatrix}$ |
| $60^\\circ$ | $\\begin{bmatrix} 0.5 & -0.866 \\\\ 0.866 & 0.5 \\end{bmatrix}$ |

> **🔁 Dừng lại tự kiểm tra**: Tính $R(90^\\circ) \\cdot R(90^\\circ)$. <details><summary>Đáp án</summary><code>[[0,−1],[1,0]] · [[0,−1],[1,0]]</code>. Hàng 1 × cột 1 = 0·0 + (−1)·1 = −1. Hàng 1 × cột 2 = 0·(−1) + (−1)·0 = 0. Hàng 2 × cột 1 = 1·0 + 0·1 = 0. Hàng 2 × cột 2 = 1·(−1) + 0·0 = −1. → <code>[[−1,0],[0,−1]] = R(180°)</code> ✓.</details>

> **📝 Tóm tắt Mục 6**
> - Ma trận xoay **bảo toàn độ dài** và **bảo toàn dot product** (cosine similarity).
> - Nhân tích 2 phép xoay = cộng góc: $R(\\alpha) R(\\beta) = R(\\alpha + \\beta)$. Hệ quả: xoay là phép **giao hoán** trong 2D.
> - Nghịch đảo = transpose = $R(-\\theta)$. Ma trận trực giao.
> - Định thức = 1: bảo toàn diện tích, không lật hướng.

---

## 7. Ma trận xoay 3D

### 7.1 Trực giác — không gian 3D có 3 trục để xoay quanh

> **💡 Trực giác**: trong 2D ta chỉ có "mặt phẳng" và 1 cách xoay (quanh gốc, là tâm). Trong 3D có 3 trục \`Ox, Oy, Oz\`. Xoay quanh mỗi trục là một "loại" xoay khác nhau.

Hãy tưởng tượng một cây bút chì đặt theo trục \`Oz\` (thẳng đứng). Xoay quanh trục \`Oz\` = cầm bút quay quanh trục dọc → mọi điểm trên trục \`Oz\` không đổi, các điểm khác lượn theo. Tương tự cho \`Ox\` và \`Oy\`.

### 7.2 Ba ma trận xoay cơ bản

**Xoay quanh trục Ox** — góc $\\theta$, trục $Ox$ giữ nguyên, mặt phẳng $yz$ xoay:

$$R_x(\\theta) = \\begin{bmatrix} 1 & 0 & 0 \\\\ 0 & \\cos \\theta & -\\sin \\theta \\\\ 0 & \\sin \\theta & \\cos \\theta \\end{bmatrix}$$

Hàng 1 / cột 1 toàn là $[1, 0, 0]$ ngoại trừ vị trí góc — tức $x$ không đổi.

**Xoay quanh trục Oy** — góc $\\theta$, trục $Oy$ giữ nguyên:

$$R_y(\\theta) = \\begin{bmatrix} \\cos \\theta & 0 & \\sin \\theta \\\\ 0 & 1 & 0 \\\\ -\\sin \\theta & 0 & \\cos \\theta \\end{bmatrix}$$

> **⚠ Lưu ý dấu**: trong $R_y$ thì dấu trừ nằm ở **dòng dưới** ($-\\sin \\theta$), khác với $R_x$ và $R_z$. Nguyên nhân là quy ước "ngược kim đồng hồ khi nhìn từ chiều dương về gốc"; với trục Oy thì chiều ngược dẫn đến hoán dấu. Cách dễ nhớ: viết 3 ma trận cạnh nhau, để ý cột-hàng nào toàn 0/1, các chỗ còn lại có dạng $\\cos, \\sin, -\\sin, \\cos$ nhưng vị trí âm trong $R_y$ lệch xuống.

**Xoay quanh trục Oz** — góc $\\theta$, trục $Oz$ giữ nguyên (tương đương xoay 2D trong mặt phẳng $xy$):

$$R_z(\\theta) = \\begin{bmatrix} \\cos \\theta & -\\sin \\theta & 0 \\\\ \\sin \\theta & \\cos \\theta & 0 \\\\ 0 & 0 & 1 \\end{bmatrix}$$

→ $R_z$ là phép mở rộng tự nhiên của $R(\\theta)$ 2D bằng cách "đắp thêm" 1 chiều $z$ cố định.

### 7.3 Walk-through áp dụng

**Áp dụng $R_z(90^\\circ)$ lên vector $(1, 0, 0)$** (nằm trên trục Ox):

$$R_z(90^\\circ) = \\begin{bmatrix} 0 & -1 & 0 \\\\ 1 & 0 & 0 \\\\ 0 & 0 & 1 \\end{bmatrix}$$

$$R_z(90^\\circ) \\cdot \\begin{bmatrix} 1 \\\\ 0 \\\\ 0 \\end{bmatrix} = \\begin{bmatrix} 0 \\cdot 1 + (-1) \\cdot 0 + 0 \\cdot 0 \\\\ 1 \\cdot 1 + 0 \\cdot 0 + 0 \\cdot 0 \\\\ 0 \\cdot 1 + 0 \\cdot 0 + 1 \\cdot 0 \\end{bmatrix} = \\begin{bmatrix} 0 \\\\ 1 \\\\ 0 \\end{bmatrix}$$

→ $(0, 1, 0)$: từ trục Ox xoay $90^\\circ$ quanh Oz → đi sang trục Oy. Phù hợp với 2D ($R(90^\\circ)$ đưa $(1, 0)$ thành $(0, 1)$).

**Áp dụng $R_x(90^\\circ)$ lên $(0, 1, 0)$** (trên trục Oy):

$$R_x(90^\\circ) = \\begin{bmatrix} 1 & 0 & 0 \\\\ 0 & 0 & -1 \\\\ 0 & 1 & 0 \\end{bmatrix}$$

$$R_x(90^\\circ) \\cdot \\begin{bmatrix} 0 \\\\ 1 \\\\ 0 \\end{bmatrix} = \\begin{bmatrix} 1 \\cdot 0 + 0 \\cdot 1 + 0 \\cdot 0 \\\\ 0 \\cdot 0 + 0 \\cdot 1 + (-1) \\cdot 0 \\\\ 0 \\cdot 0 + 1 \\cdot 1 + 0 \\cdot 0 \\end{bmatrix} = \\begin{bmatrix} 0 \\\\ 0 \\\\ 1 \\end{bmatrix}$$

→ $(0, 0, 1)$: từ trục Oy xoay $90^\\circ$ quanh Ox → lên trục Oz. Phù hợp với quy tắc bàn tay phải.

**Áp dụng $R_y(90^\\circ)$ lên $(0, 0, 1)$** (trên trục Oz):

$$R_y(90^\\circ) = \\begin{bmatrix} 0 & 0 & 1 \\\\ 0 & 1 & 0 \\\\ -1 & 0 & 0 \\end{bmatrix}$$

$$R_y(90^\\circ) \\cdot \\begin{bmatrix} 0 \\\\ 0 \\\\ 1 \\end{bmatrix} = \\begin{bmatrix} 0 \\cdot 0 + 0 \\cdot 0 + 1 \\cdot 1 \\\\ 0 \\cdot 0 + 1 \\cdot 0 + 0 \\cdot 1 \\\\ -1 \\cdot 0 + 0 \\cdot 0 + 0 \\cdot 1 \\end{bmatrix} = \\begin{bmatrix} 1 \\\\ 0 \\\\ 0 \\end{bmatrix}$$

→ $(1, 0, 0)$: từ trục Oz xoay $90^\\circ$ quanh Oy → về trục Ox. Hoàn thiện vòng $Ox \\to Oy \\to Oz \\to Ox$.

### 7.4 Góc Euler — ghép 3 xoay tạo mọi orientation

**Định lý** (Euler): mọi orientation trong 3D đều biểu diễn được bằng tích **3 phép xoay** quanh 3 trục, vd:

$$R = R_z(\\gamma) \\cdot R_y(\\beta) \\cdot R_x(\\alpha)$$

Bộ $(\\alpha, \\beta, \\gamma)$ gọi là **góc Euler** (cũng quen tên "roll, pitch, yaw" trong hàng không).

> **❓ Câu hỏi tự nhiên**: "3 phép xoay đó áp dụng theo thứ tự nào?" — Khi nhân ma trận với vector $R v = R_z R_y R_x v$, vector đi qua phép $R_x$ **trước** (vì ma trận sát vector nhất), rồi $R_y$, rồi $R_z$. Quy ước "đọc từ phải sang trái".

### 7.5 CẢNH BÁO: 3D KHÔNG GIAO HOÁN

Trong 2D: $R(\\alpha) R(\\beta) = R(\\beta) R(\\alpha) = R(\\alpha + \\beta)$. Đổi thứ tự không sao.

Trong 3D: **thứ tự rất quan trọng**: $R_x(\\alpha) R_y(\\beta) \\neq R_y(\\beta) R_x(\\alpha)$ thông thường.

**Demo bằng tay** với $\\alpha = \\beta = 90^\\circ$:

$$R_x(90^\\circ) = \\begin{bmatrix} 1 & 0 & 0 \\\\ 0 & 0 & -1 \\\\ 0 & 1 & 0 \\end{bmatrix}, \\qquad R_y(90^\\circ) = \\begin{bmatrix} 0 & 0 & 1 \\\\ 0 & 1 & 0 \\\\ -1 & 0 & 0 \\end{bmatrix}$$

Tính $R_x \\cdot R_y$ (áp $R_y$ trước rồi $R_x$):

$$\\begin{aligned}
\\text{Hàng 1} \\times \\text{cột 1}&: 1 \\cdot 0 + 0 \\cdot 0 + 0 \\cdot (-1) = 0 \\\\
\\text{Hàng 1} \\times \\text{cột 2}&: 1 \\cdot 0 + 0 \\cdot 1 + 0 \\cdot 0 = 0 \\\\
\\text{Hàng 1} \\times \\text{cột 3}&: 1 \\cdot 1 + 0 \\cdot 0 + 0 \\cdot 0 = 1 \\\\
\\text{Hàng 2} \\times \\text{cột 1}&: 0 \\cdot 0 + 0 \\cdot 0 + (-1) \\cdot (-1) = 1 \\\\
\\text{Hàng 2} \\times \\text{cột 2}&: 0 \\cdot 0 + 0 \\cdot 1 + (-1) \\cdot 0 = 0 \\\\
\\text{Hàng 2} \\times \\text{cột 3}&: 0 \\cdot 1 + 0 \\cdot 0 + (-1) \\cdot 0 = 0 \\\\
\\text{Hàng 3} \\times \\text{cột 1}&: 0 \\cdot 0 + 1 \\cdot 0 + 0 \\cdot (-1) = 0 \\\\
\\text{Hàng 3} \\times \\text{cột 2}&: 0 \\cdot 0 + 1 \\cdot 1 + 0 \\cdot 0 = 1 \\\\
\\text{Hàng 3} \\times \\text{cột 3}&: 0 \\cdot 1 + 1 \\cdot 0 + 0 \\cdot 0 = 0
\\end{aligned}$$

$$R_x R_y = \\begin{bmatrix} 0 & 0 & 1 \\\\ 1 & 0 & 0 \\\\ 0 & 1 & 0 \\end{bmatrix}$$

Tính $R_y \\cdot R_x$ (áp $R_x$ trước rồi $R_y$):

$$\\begin{aligned}
\\text{Hàng 1} \\times \\text{cột 1}&: 0 \\cdot 1 + 0 \\cdot 0 + 1 \\cdot 0 = 0 \\\\
\\text{Hàng 1} \\times \\text{cột 2}&: 0 \\cdot 0 + 0 \\cdot 0 + 1 \\cdot 1 = 1 \\\\
\\text{Hàng 1} \\times \\text{cột 3}&: 0 \\cdot 0 + 0 \\cdot (-1) + 1 \\cdot 0 = 0 \\\\
\\text{Hàng 2} \\times \\text{cột 1}&: 0 \\cdot 1 + 1 \\cdot 0 + 0 \\cdot 0 = 0 \\\\
\\text{Hàng 2} \\times \\text{cột 2}&: 0 \\cdot 0 + 1 \\cdot 0 + 0 \\cdot 1 = 0 \\\\
\\text{Hàng 2} \\times \\text{cột 3}&: 0 \\cdot 0 + 1 \\cdot (-1) + 0 \\cdot 0 = -1 \\\\
\\text{Hàng 3} \\times \\text{cột 1}&: -1 \\cdot 1 + 0 \\cdot 0 + 0 \\cdot 0 = -1 \\\\
\\text{Hàng 3} \\times \\text{cột 2}&: -1 \\cdot 0 + 0 \\cdot 0 + 0 \\cdot 1 = 0 \\\\
\\text{Hàng 3} \\times \\text{cột 3}&: -1 \\cdot 0 + 0 \\cdot (-1) + 0 \\cdot 0 = 0
\\end{aligned}$$

$$R_y R_x = \\begin{bmatrix} 0 & 1 & 0 \\\\ 0 & 0 & -1 \\\\ -1 & 0 & 0 \\end{bmatrix}$$

Hai ma trận **khác hẳn nhau**.

**Demo trực quan** — cầm một quyển sách:
1. Xoay 90° quanh trục dài (trục y) → quyển sách lật nghiêng.
2. Xoay 90° quanh trục ngắn (trục x) → quyển sách đè đầu vào người.

Đảo thứ tự (xoay trục x trước rồi trục y) → quyển sách kết thúc ở orientation **khác hẳn**. Thử bằng bàn tay sẽ thấy ngay.

> **📝 Tóm tắt Mục 7**
> - 3 ma trận xoay cơ bản $R_x, R_y, R_z$ quanh 3 trục.
> - $R_z$ chính là $R(\\theta)$ 2D mở rộng thêm chiều $z$.
> - Mọi orientation = tích 3 phép xoay (góc Euler / roll-pitch-yaw).
> - **Thứ tự nhân RẤT quan trọng — 3D không giao hoán** (ngược với 2D).

---

## 8. Liên hệ ML/AI — **RoPE (Rotary Position Embedding)** trong LLM

Đây là **phần wow** của bài. RoPE là kỹ thuật được dùng trong các LLM hiện đại nhất (Llama 1/2/3, GPT-NeoX, PaLM, DeepSeek, Qwen, Mistral, Gemma). Hiểu tới đây thì ma trận xoay không còn là "thứ toán xa lạ" — nó là viên gạch chân của AI hiện đại.

### 8.1 Bối cảnh — Transformer cần "vị trí của token"

> **💡 Trực giác**: Một câu là **chuỗi có thứ tự**. "Mèo ăn cá" khác "cá ăn mèo". Mạng neural nói chung không có ý niệm "thứ tự" — bạn xáo lại các từ, nó vẫn cho cùng đầu ra. Transformer cũng vậy: nếu ta xáo trộn token, \`self-attention\` cho cùng kết quả.
>
> → Cần một cơ chế nhúng **vị trí** vào embedding, để mạng biết "từ này ở đâu trong câu".

Mỗi từ (token) trong câu có một **embedding** — một vector $n$-chiều (vd 4096-D ở Llama 2 7B). Vector này mã hóa "ý nghĩa" của từ.

Vị trí của token trong câu cũng cần được mã hóa. Có nhiều cách:

**Cách 1 — Sinusoidal Position Embedding** (Transformer paper gốc 2017): cộng thẳng vector $(\\sin \\text{pos}, \\cos \\text{pos}, \\sin 2 \\cdot \\text{pos}, \\cos 2 \\cdot \\text{pos}, \\ldots)$ vào embedding. Cách này hoạt động, nhưng:
- Không "đẹp" về mặt toán học — sao lại cộng?
- Hai cách "cộng vị trí" lẫn vào "ý nghĩa" làm rối thông tin.
- Không có tính chất "khoảng cách tương đối" thuần khiết.

**Cách 2 — RoPE** (Rotary Position Embedding, 2021, paper "RoFormer"): thay vì **cộng**, ta **XOAY** embedding theo vị trí.

### 8.2 Ý tưởng RoPE — xoay embedding theo vị trí

Trong Transformer, attention được tính giữa 2 vector:
- $q$ (query) — đại diện cho "tôi đang nhìn token nào, cần tìm gì".
- $k$ (key) — đại diện cho "tôi là token gì, đang được tìm bởi ai".

Cho token ở vị trí $m$, query của nó là $q_m$. Cho token ở vị trí $n$, key của nó là $k_n$. Attention score = $q_m \\cdot k_n$ (dot product).

**Vấn đề**: nếu $q, k$ không chứa thông tin vị trí, attention không phân biệt được "từ ở đầu câu" với "từ ở cuối câu".

**RoPE**: trước khi tính dot product, **xoay** $q$ và $k$ bằng ma trận xoay phụ thuộc vị trí:

$$\\begin{aligned}
q'_m &= R(m \\cdot \\theta) \\cdot q \\\\
k'_n &= R(n \\cdot \\theta) \\cdot k
\\end{aligned}$$

trong đó $\\theta$ là một hằng số nhỏ (thường $\\theta = 10000^{-2i/d}$ cho từng cặp chiều $(2i, 2i+1)$ — chi tiết bỏ qua, nắm ý là đủ).

Attention score sau RoPE: $q'_m \\cdot k'_n$.

### 8.3 Tính chất kỳ diệu — chỉ phụ thuộc hiệu n − m

> **💡 Trực giác**: vì xoay bảo toàn dot product (Mục 6.2), khi xoay cả 2 vector cùng góc, score không đổi. RoPE xoay 2 vector các **góc khác nhau** — nhưng kết quả vẫn chỉ phụ thuộc **hiệu** các góc.

**Chứng minh**:

$$q'_m \\cdot k'_n = (R(m\\theta) q) \\cdot (R(n\\theta) k)$$

Dùng tính chất $u \\cdot v = u^\\top v$ (xem dot product như tích ma trận hàng × cột; chi tiết Tầng 4):

$$\\begin{aligned}
&= (R(m\\theta) q)^\\top (R(n\\theta) k) \\\\
&= q^\\top R(m\\theta)^\\top R(n\\theta) k
\\end{aligned}$$

Theo 6.4: $R(m\\theta)^\\top = R(-m\\theta)$. Theo 6.3: $R(-m\\theta) R(n\\theta) = R(n\\theta - m\\theta) = R((n - m) \\theta)$. Vậy:

$$\\begin{aligned}
q'_m \\cdot k'_n &= q^\\top R((n - m) \\theta) k \\\\
                &= q \\cdot (R((n - m) \\theta) \\cdot k)
\\end{aligned}$$

**Kết quả** (in đậm vì quan trọng):

> Attention score giữa token tại vị trí $m$ và token tại vị trí $n$ qua RoPE **chỉ phụ thuộc vào hiệu vị trí $n - m$**, không phụ thuộc $m$ và $n$ riêng lẻ.

Tức là: dù 2 từ ở đầu câu ($m=1, n=3$) hay cuối câu ($m=99, n=101$), miễn hiệu = 2 thì attention score giống nhau. Đây là tính chất **translation-invariant** rất mong muốn vì:
- Ngôn ngữ tự nhiên: ý nghĩa của "tôi yêu em" giống "anh ấy nói 'tôi yêu em'", dù vị trí trong câu khác nhau.
- Mô hình tổng quát hóa tốt hơn cho câu dài (extrapolation).

### 8.4 Walk-through RoPE với 2D, θ = π/6, m = 3, n = 5

Cho:
- $q = (1, 0)$, vị trí $m = 3$.
- $k = (0, 1)$, vị trí $n = 5$.
- $\\theta = \\pi/6$ (= $30^\\circ$).

**Bước 1** — Xoay $q$:
- $m \\cdot \\theta = 3 \\cdot 30^\\circ = 90^\\circ$. $R(90^\\circ) = \\begin{bmatrix} 0 & -1 \\\\ 1 & 0 \\end{bmatrix}$.
- $q' = R(90^\\circ) \\cdot (1, 0) = (0 \\cdot 1 + (-1) \\cdot 0, \\, 1 \\cdot 1 + 0 \\cdot 0) = (0, 1)$.

**Bước 2** — Xoay $k$:
- $n \\cdot \\theta = 5 \\cdot 30^\\circ = 150^\\circ$. $\\cos 150^\\circ = -\\tfrac{\\sqrt{3}}{2} \\approx -0.866, \\sin 150^\\circ = 0.5$.
- $R(150^\\circ) = \\begin{bmatrix} -0.866 & -0.5 \\\\ 0.5 & -0.866 \\end{bmatrix}$.
- $k' = R(150^\\circ) \\cdot (0, 1) = ((-0.866) \\cdot 0 + (-0.5) \\cdot 1, \\, 0.5 \\cdot 0 + (-0.866) \\cdot 1) = (-0.5, -0.866)$.

**Bước 3** — Dot product $q' \\cdot k'$:
- $q' \\cdot k' = 0 \\cdot (-0.5) + 1 \\cdot (-0.866) = -0.866$.

**Bước 4** — Verify bằng công thức "hiệu vị trí":
- $(n - m) \\cdot \\theta = (5 - 3) \\cdot 30^\\circ = 60^\\circ$. $R(60^\\circ) = \\begin{bmatrix} 0.5 & -0.866 \\\\ 0.866 & 0.5 \\end{bmatrix}$.
- $R(60^\\circ) \\cdot k = R(60^\\circ) \\cdot (0, 1) = (0.5 \\cdot 0 + (-0.866) \\cdot 1, \\, 0.866 \\cdot 0 + 0.5 \\cdot 1) = (-0.866, 0.5)$.
- $q \\cdot (R(60^\\circ) k) = (1, 0) \\cdot (-0.866, 0.5) = 1 \\cdot (-0.866) + 0 \\cdot 0.5 = -0.866$ ✓

Hai cách tính cho **cùng kết quả** $-0.866$. Đó là **bằng chứng số** cho tính chất kỳ diệu ở 8.3.

### 8.5 Vì sao điều này quan trọng?

1. **Mọi LLM lớn năm 2023+** dùng RoPE: Llama 2/3, Mistral, Qwen, DeepSeek, Gemma, Phi-3. Việc bạn vừa hiểu = đã hiểu cốt lõi 1 thành phần quan trọng của những mô hình này.

2. **Extrapolation cho câu dài**: vì attention chỉ phụ thuộc hiệu, mô hình train trên câu 4k token có thể (gần như) generalize cho câu 8k, 32k — đây là cơ sở cho các kỹ thuật như YaRN, NTK-aware scaling.

3. **Không tăng tham số**: RoPE không thêm trọng số học (weights). Ma trận xoay tính từ vị trí, không học. Khác với sinusoidal cộng vào → RoPE elegant hơn.

4. **Mỗi cặp chiều có $\\theta$ riêng**: trong thực tế, embedding cao chiều (vd 128, 4096), RoPE chia làm $d/2$ cặp $(2i, 2i+1)$ và mỗi cặp dùng $\\theta_i = 10000^{-2i/d}$. Cặp đầu xoay nhanh ($\\theta$ lớn), cặp cuối xoay chậm — giống "đồng hồ nhiều kim quay tốc độ khác nhau", mã hóa vị trí ở nhiều "tần số".

> **❓ Câu hỏi tự nhiên**: "Vậy RoPE chỉ hoạt động với embedding 2D? Embedding thật là cao chiều mà." — Đúng, RoPE áp **theo cặp**. Chia 4096 chiều thành 2048 cặp, mỗi cặp được xoay như 2D độc lập. Hiệu năng vẫn tốt vì xoay 2D rất nhẹ (chỉ 4 phép nhân + 2 phép cộng/cặp).

### 8.6 Computer graphics & Robotics — ứng dụng "đời thường"

Ngoài LLM, ma trận xoay xuất hiện ở:

- **Game engine, animation 3D**: mỗi frame, mọi vertex của model được xoay quanh xương (bone) hoặc tâm khối → tổng cộng hàng triệu phép nhân ma trận xoay mỗi giây. GPU được thiết kế tối ưu cho việc này (matrix unit / tensor core).
- **Robotics**: cánh tay robot có 6 khớp → 6 ma trận xoay chuỗi lại tạo forward kinematics. IMU sensor (gia tốc kế + con quay hồi chuyển) đo orientation → trả về dưới dạng góc Euler hoặc quaternion (xem 9.1).
- **AR/VR**: head-tracking → mỗi mili-giây tính lại ma trận xoay của đầu user để render lại scene đúng góc nhìn.
- **Self-driving car**: lidar quét quanh xe → mỗi đám mây điểm cần xoay vào hệ tọa độ chung của bản đồ.

---

## 9. Quaternion — nhắc nhẹ

Trong 3D, có một cách khác để biểu diễn xoay: **quaternion** — bộ 4 số $(w, x, y, z)$. Ưu điểm so với góc Euler:

1. **Không bị "gimbal lock"** — hiện tượng mất 1 bậc tự do khi 2 trục xoay trùng nhau (góc Euler bị bệnh này).
2. **Nội suy mượt** — quan trọng cho animation: trượt từ orientation A sang B mượt qua "slerp".
3. **Tiết kiệm bộ nhớ**: 4 số thay vì ma trận 3×3 (9 số).

Quaternion sẽ KHÔNG được học sâu trong lộ trình này. Ở mức kiến thức cần cho ML, ma trận xoay là đủ. Nếu sau này bạn đi sâu vào computer graphics / robotics thì học thêm.

> **📝 Tóm tắt Mục 8-9**
> - RoPE = xoay embedding $q, k$ theo vị trí → attention chỉ phụ thuộc **hiệu vị trí**.
> - Tính chất này xuất phát từ $R(m\\theta)^\\top R(n\\theta) = R((n-m)\\theta)$ — chính tính chất Mục 6.3, 6.4.
> - Llama, Mistral, DeepSeek, Qwen, Gemma đều dùng RoPE.
> - Quaternion là cách khác để biểu diễn xoay 3D, không học sâu ở đây.

---

## 10. Bài tập

### Bài 1 — Xoay điểm (3, 4) bởi 90° quanh O

Tính tay, không dùng máy tính. Cho biết kết quả $(x', y')$.

### Bài 2 — Xoay điểm (1, 1) bởi 45°

Cho kết quả ở dạng chính xác (dùng $\\sqrt{2}$, không làm tròn). Có nhận xét gì về kết quả?

### Bài 3 — Bảo toàn dot product

Cho 2 vector $u = (2, 0)$, $v = (0, 3)$. Tính $u \\cdot v$. Sau đó xoay cả 2 bởi $60^\\circ$ (cùng góc), gọi là $u', v'$. Tính $u' \\cdot v'$. Có bằng nhau không? Tại sao?

### Bài 4 — Tích 2 ma trận xoay

Chứng minh $R(60^\\circ) \\cdot R(30^\\circ) = R(90^\\circ)$ bằng cách nhân ma trận **tay** (không dùng tính chất $R(\\alpha)R(\\beta) = R(\\alpha+\\beta)$ — phải khai triển trực tiếp).

### Bài 5 — RoPE walk-through

Cho $q = (1, 0)$ tại vị trí $m = 2$, $k = (0, 1)$ tại vị trí $n = 5$, $\\theta_{\\text{base}} = \\pi/6$. Tính:
- $q' = R(m \\cdot \\theta_{\\text{base}}) \\cdot q$.
- $k' = R(n \\cdot \\theta_{\\text{base}}) \\cdot k$.
- Dot product $q' \\cdot k'$.

Sau đó tính trực tiếp $q \\cdot R((n - m) \\cdot \\theta_{\\text{base}}) \\cdot k$. So sánh 2 kết quả.

### Bài 6 — Code Go

Viết các hàm sau bằng Go (trong \`solutions.go\`):
- \`rotateVec2(x, y, theta float64) (xPrime, yPrime float64)\`: xoay vector 2D.
- \`rotateMatrix3DZ(theta float64) [3][3]float64\`: trả về ma trận xoay quanh trục Oz.
- \`multiplyMatrixVec(M [3][3]float64, v [3]float64) [3]float64\`: nhân ma trận 3×3 với vector 3D.

Test: xoay vector $(1, 0, 0)$ bởi $90^\\circ$ quanh trục $Oz$ → kỳ vọng $(0, 1, 0)$.

---

## 11. Lời giải chi tiết

### Lời giải Bài 1

Cho $(x, y) = (3, 4)$, $\\theta = 90^\\circ$. Ta có $\\cos 90^\\circ = 0$, $\\sin 90^\\circ = 1$.

Áp dụng công thức Mục 4.4:

$$\\begin{aligned}
x' &= x \\cos \\theta - y \\sin \\theta = 3 \\cdot 0 - 4 \\cdot 1 = -4 \\\\
y' &= x \\sin \\theta + y \\cos \\theta = 3 \\cdot 1 + 4 \\cdot 0 = 3
\\end{aligned}$$

**Đáp án**: $(-4, 3)$.

**Kiểm tra**: độ dài $|(-4, 3)| = \\sqrt{16 + 9} = 5 = |(3, 4)|$ ✓. Góc ban đầu $\\text{atan2}(4, 3) \\approx 53.13^\\circ$; góc sau $\\text{atan2}(3, -4) \\approx 143.13^\\circ$. Hiệu = $90^\\circ$ ✓.

### Lời giải Bài 2

Cho $(1, 1)$, $\\theta = 45^\\circ$. $\\cos 45^\\circ = \\sin 45^\\circ = \\tfrac{\\sqrt{2}}{2}$.

$$\\begin{aligned}
x' &= 1 \\cdot \\tfrac{\\sqrt{2}}{2} - 1 \\cdot \\tfrac{\\sqrt{2}}{2} = 0 \\\\
y' &= 1 \\cdot \\tfrac{\\sqrt{2}}{2} + 1 \\cdot \\tfrac{\\sqrt{2}}{2} = \\sqrt{2}
\\end{aligned}$$

**Đáp án**: $(0, \\sqrt{2}) \\approx (0, 1.414)$.

**Nhận xét**: $(1, 1)$ ban đầu lệch trục Ox $45^\\circ$, độ dài $\\sqrt{2}$. Sau khi xoay thêm $45^\\circ$, lệch $90^\\circ$ → nằm trên trục Oy dương. Độ dài giữ nguyên $\\sqrt{2}$. Cảm giác trực quan khớp với tính toán.

### Lời giải Bài 3

$u = (2, 0)$, $v = (0, 3)$ → $u \\cdot v = 2 \\cdot 0 + 0 \\cdot 3 = 0$ (vuông góc).

Xoay bởi $60^\\circ$: $\\cos 60^\\circ = 0.5, \\sin 60^\\circ = \\tfrac{\\sqrt{3}}{2} \\approx 0.866$.

$$\\begin{aligned}
u' &= R(60^\\circ) \\cdot (2, 0) = (2 \\cdot 0.5 - 0 \\cdot 0.866, \\, 2 \\cdot 0.866 + 0 \\cdot 0.5) = (1, 1.732) \\\\
v' &= R(60^\\circ) \\cdot (0, 3) = (0 \\cdot 0.5 - 3 \\cdot 0.866, \\, 0 \\cdot 0.866 + 3 \\cdot 0.5) = (-2.598, 1.5)
\\end{aligned}$$

$u' \\cdot v' = 1 \\cdot (-2.598) + 1.732 \\cdot 1.5 = -2.598 + 2.598 = 0$ ✓.

**Bằng nhau** (đều = 0). Lý do: theo Mục 6.2, ma trận xoay bảo toàn dot product. Áp $R(\\theta)$ lên cả 2 vector không thay đổi tích vô hướng của chúng.

### Lời giải Bài 4

Cho ($\\cos 60^\\circ = 0.5, \\sin 60^\\circ = \\tfrac{\\sqrt{3}}{2} \\approx 0.866$; $\\cos 30^\\circ = \\tfrac{\\sqrt{3}}{2} \\approx 0.866, \\sin 30^\\circ = 0.5$):

$$R(60^\\circ) \\approx \\begin{bmatrix} 0.5 & -0.866 \\\\ 0.866 & 0.5 \\end{bmatrix}, \\qquad R(30^\\circ) \\approx \\begin{bmatrix} 0.866 & -0.5 \\\\ 0.5 & 0.866 \\end{bmatrix}$$

Tính $R(60^\\circ) \\cdot R(30^\\circ)$ bằng quy tắc hàng × cột:

$$\\begin{aligned}
\\text{Phần tử } (1,1)&: 0.5 \\cdot 0.866 + (-0.866) \\cdot 0.5 = 0.433 - 0.433 = 0 \\\\
\\text{Phần tử } (1,2)&: 0.5 \\cdot (-0.5) + (-0.866) \\cdot 0.866 = -0.25 - 0.75 = -1 \\\\
\\text{Phần tử } (2,1)&: 0.866 \\cdot 0.866 + 0.5 \\cdot 0.5 = 0.75 + 0.25 = 1 \\\\
\\text{Phần tử } (2,2)&: 0.866 \\cdot (-0.5) + 0.5 \\cdot 0.866 = -0.433 + 0.433 = 0
\\end{aligned}$$

Vậy:

$$R(60^\\circ) \\cdot R(30^\\circ) = \\begin{bmatrix} 0 & -1 \\\\ 1 & 0 \\end{bmatrix}$$

Trong khi $R(90^\\circ) = \\begin{bmatrix} \\cos 90^\\circ & -\\sin 90^\\circ \\\\ \\sin 90^\\circ & \\cos 90^\\circ \\end{bmatrix} = \\begin{bmatrix} 0 & -1 \\\\ 1 & 0 \\end{bmatrix}$.

→ Trùng khớp: $R(60^\\circ) \\cdot R(30^\\circ) = R(90^\\circ)$ ✓.

**Kết quả không dùng công thức $R(\\alpha)R(\\beta) = R(\\alpha+\\beta)$** — đã khai triển trực tiếp. Tuyệt vời ở chỗ các giá trị $\\tfrac{\\sqrt{3}}{2}, \\tfrac{1}{2}$ khi nhân và cộng vào nhau cho ra số nguyên $(0, 1, -1)$ rất gọn — chính vì identity Pythagoras $(\\tfrac{\\sqrt{3}}{2})^2 + (\\tfrac{1}{2})^2 = \\tfrac{3}{4} + \\tfrac{1}{4} = 1$.

### Lời giải Bài 5

$q = (1, 0)$, $m = 2$, $k = (0, 1)$, $n = 5$, $\\theta_{\\text{base}} = \\pi/6 = 30^\\circ$.

**Bước 1** — $q' = R(m \\cdot \\theta_{\\text{base}}) \\cdot q = R(60^\\circ) \\cdot (1, 0)$.
- $\\cos 60^\\circ = 0.5, \\sin 60^\\circ = \\tfrac{\\sqrt{3}}{2} \\approx 0.866$.
- $q' = (0.5 \\cdot 1 - 0.866 \\cdot 0, \\, 0.866 \\cdot 1 + 0.5 \\cdot 0) = (0.5, 0.866)$.

**Bước 2** — $k' = R(n \\cdot \\theta_{\\text{base}}) \\cdot k = R(150^\\circ) \\cdot (0, 1)$.
- $\\cos 150^\\circ = -\\tfrac{\\sqrt{3}}{2} \\approx -0.866, \\sin 150^\\circ = 0.5$.
- $k' = (-0.866 \\cdot 0 - 0.5 \\cdot 1, \\, 0.5 \\cdot 0 + (-0.866) \\cdot 1) = (-0.5, -0.866)$.

**Bước 3** — Dot product $q' \\cdot k'$:
- $q' \\cdot k' = 0.5 \\cdot (-0.5) + 0.866 \\cdot (-0.866) = -0.25 - 0.75 = -1$.

**Bước 4** — Kiểm tra qua "hiệu vị trí":
- $(n - m) \\cdot \\theta_{\\text{base}} = (5 - 2) \\cdot 30^\\circ = 90^\\circ$. $R(90^\\circ) = \\begin{bmatrix} 0 & -1 \\\\ 1 & 0 \\end{bmatrix}$.
- $R(90^\\circ) \\cdot k = R(90^\\circ) \\cdot (0, 1) = (0 \\cdot 0 + (-1) \\cdot 1, \\, 1 \\cdot 0 + 0 \\cdot 1) = (-1, 0)$.
- $q \\cdot (R(90^\\circ) \\cdot k) = (1, 0) \\cdot (-1, 0) = 1 \\cdot (-1) + 0 \\cdot 0 = -1$.

→ Hai cách tính ra **cùng kết quả** $-1$. Xác nhận RoPE chỉ phụ thuộc hiệu $n - m = 3$ (vì $R(3 \\cdot 30^\\circ) = R(90^\\circ)$).

**Quan sát thêm**: nếu thay $(m, n) = (10, 13)$ (hiệu vẫn = 3), kết quả vẫn $-1$. Chính tính chất translation-invariant.

### Lời giải Bài 6

Xem file [\`solutions.go\`](./solutions.go).

**Ý tưởng**:
- \`rotateVec2\`: áp đúng công thức $(x \\cos \\theta - y \\sin \\theta, \\, x \\sin \\theta + y \\cos \\theta)$.
- \`rotateMatrix3DZ\`: trả về ma trận 3×3 với góc 2×2 đầu là $R(\\theta)$ 2D, hàng/cột thứ 3 là $(0, 0, 1)$.
- \`multiplyMatrixVec\`: 3 vòng lặp (i = 0, 1, 2), mỗi vòng $\\text{sum} = \\sum_j M[i][j] \\cdot v[j]$.

Test \`rotateVec2(1, 0, π/2)\` cho $(0, 1)$. Test \`multiplyMatrixVec(rotateMatrix3DZ(π/2), (1, 0, 0))\` cho $(0, 1, 0)$. Cả hai khớp kỳ vọng.

**Độ phức tạp**:
- \`rotateVec2\`: $O(1)$ (4 phép nhân, 2 phép cộng).
- \`multiplyMatrixVec\` cho ma trận $n \\times n$: $O(n^2)$. Với $n = 3$: 9 nhân, 6 cộng.
- $R(\\alpha) R(\\beta)$ (nhân 2 ma trận $n \\times n$): $O(n^3)$.

---

## 12. Tóm tắt và liên kết

### Tóm tắt cốt lõi

- **Vector 2D** là cặp $(x, y)$ có thể viết dạng cột $[x; y]$.
- **Phép xoay** điểm $(x, y)$ góc $\\theta$ quanh $O$ (ngược kim đồng hồ):

  $$\\begin{aligned}
  x' &= x \\cos \\theta - y \\sin \\theta \\\\
  y' &= x \\sin \\theta + y \\cos \\theta
  \\end{aligned}$$
- Dạng ma trận: $R(\\theta) v$ với $R(\\theta) = \\begin{bmatrix} \\cos \\theta & -\\sin \\theta \\\\ \\sin \\theta & \\cos \\theta \\end{bmatrix}$.
- **Tính chất**: bảo toàn độ dài, bảo toàn dot product (→ cosine similarity), $R(\\alpha)R(\\beta) = R(\\alpha+\\beta)$, $R(\\theta)^{-1} = R(-\\theta) = R(\\theta)^\\top$, $\\det = 1$.
- **3D**: 3 ma trận $R_x, R_y, R_z$. Mọi xoay 3D = tích 3 phép quanh trục. KHÔNG giao hoán.
- **RoPE** trong LLM: xoay $q, k$ theo vị trí → attention chỉ phụ thuộc hiệu vị trí. Cơ sở của Llama, Mistral, Gemma, DeepSeek.

### File trong lesson

- [solutions.go](./solutions.go) — code Go: \`rotateVec2\`, các ma trận xoay 2D/3D, verify tính chất, demo RoPE.
- [visualization.html](./visualization.html) — viz tương tác: 2D rotation playground, two-rotation composition, 3D rotation visualizer, RoPE demo.

### Bài học liên quan

- **Bài trước**: [Lesson 05 — Identity và định lý cosin](../lesson-05-identities-cosine-law/) — công thức cộng góc là gốc rễ của dẫn xuất ma trận xoay.
- **Tầng tiếp theo**: **Tầng 3 — Calculus (sắp ra)** — đạo hàm, chain rule, gradient. Sẽ thấy đạo hàm của $\\sin x$ là $\\cos x$, đạo hàm của ma trận xoay theo $\\theta$ là một ma trận khác cũng đẹp.
- **Hẹn gặp lại ở Tầng 4 — Linear Algebra**: ma trận xoay là một loại "biến đổi tuyến tính"; ở Tầng 4 sẽ tổng quát hóa lên mọi ma trận và học eigenvector, SVD.
- **Hẹn gặp lại ở Tầng 6 — AI/ML**: khi bàn tới attention và embedding, sẽ quay lại RoPE chi tiết hơn (tần số $\\theta_i$ cho từng cặp chiều, NTK scaling, YaRN cho long context).

> **Chúc mừng**: bạn vừa hoàn thành **Tầng 2 — Trigonometry**. Đường tròn đơn vị, đồ thị sóng, công thức cộng, định lý cosin, ma trận xoay — đủ để chạm tới RoPE và cosine similarity, hai khái niệm quan trọng bậc nhất trong LLM hiện đại. Sang Tầng 3 (Calculus) để học đạo hàm và bắt đầu tiếp cận gradient descent.
`;
