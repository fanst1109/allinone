// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: Vectors/04-LinearAlgebra/lesson-02-dot-product/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 02 — Dot product và Cosine similarity

> **Tầng 4 — Linear Algebra · Bài 2/8**
>
> Đây là bài học **quan trọng nhất** của Tầng 4 nếu bạn quan tâm tới AI/ML. **Cosine similarity** là phép toán cốt lõi của embedding search, vector database, RAG, và là thành phần đầu tiên của cơ chế attention trong Transformer. Học xong bài này, bạn hiểu được "máy tính làm thế nào để biết câu A và câu B có nghĩa giống nhau".

---

## Mục tiêu học tập

Sau bài này, bạn sẽ:

1. **Tính được dot product** $\\mathbf{u} \\cdot \\mathbf{v}$ bằng cả định nghĩa đại số ($\\sum_i u_i v_i$) và định nghĩa hình học ($\\lVert u \\rVert \\lVert v \\rVert \\cos\\theta$).
2. **Chứng minh hai định nghĩa bằng nhau** thông qua định lý cosin (đã học Tầng 2).
3. **Tính cosine similarity** giữa hai vector và đọc đúng ý nghĩa: cùng hướng / vuông góc / ngược hướng.
4. **Tính projection** $\\operatorname{proj}_v(u)$ của vector này lên vector khác.
5. **Hiểu Cauchy-Schwarz**: tại sao $\\lvert \\mathbf{u} \\cdot \\mathbf{v} \\rvert \\leq \\lVert u \\rVert \\lVert v \\rVert$.
6. **Áp dụng cosine similarity** cho embedding 4D, hình dung được pipeline RAG đầu-cuối.
7. **Nối tới Transformer**: hiểu vì sao attention score = scaled dot product $\\mathbf{q} \\cdot \\mathbf{k} / \\sqrt{d}$.

## Kiến thức tiền đề

- [Lesson 01 — Vector chính thức](../lesson-01-vectors/) (Tầng 4): cộng vector, scalar multiply, norm $\\lVert v \\rVert = \\sqrt{\\sum_i v_i^2}$.
- [Tầng 2 Lesson 05 — Identities + Định lý cosin](../../02-Trigonometry/lesson-05-identities-cosine-law/): chính thức công thức $c^2 = a^2 + b^2 - 2ab\\cos C$. Định lý này là cây cầu nối định nghĩa đại số và hình học của dot product.
- [Tầng 2 Lesson 03 — Đường tròn đơn vị](../../02-Trigonometry/lesson-03-unit-circle/): biết $\\cos\\theta \\in [-1, 1]$.

---

## 1. Dot product — Tích vô hướng

### 1.1 Đặt vấn đề

Trong Lesson 01 ta đã có vector, biết cộng và nhân scalar. Nhưng còn một câu hỏi quan trọng chưa trả lời:

> **Hai vector "giống nhau" tới mức nào?**

Ví dụ:
- $\\mathbf{u} = (3, 0)$ và $\\mathbf{v} = (2, 0)$ — rõ ràng cùng hướng (cùng chiều dương trục Ox).
- $\\mathbf{u} = (3, 0)$ và $\\mathbf{v} = (0, 4)$ — vuông góc, "không liên quan".
- $\\mathbf{u} = (3, 0)$ và $\\mathbf{v} = (-2, 0)$ — ngược hướng.

Để **đo độ giống nhau về hướng**, ta cần một phép toán mới: **dot product** (tích vô hướng). Đây là phép toán kết hợp hai vector và cho ra **một số duy nhất** (không phải vector). Con số này mã hoá cả độ lớn lẫn góc giữa hai vector.

> **💡 Trực giác**: Hãy nghĩ dot product như một "máy đo chung hướng". Khi bạn đẩy một chiếc xe (lực $\\mathbf{F}$) đi được quãng đường $d$, công sinh ra là $\\mathbf{F} \\cdot d \\cdot \\cos\\theta$ — đây chính xác là dot product của vector lực và vector dịch chuyển. Nếu đẩy vuông góc với hướng đi ($\\theta = 90°$), công bằng 0 — xe vẫn đi nhưng không phải nhờ lực của bạn. Dot product chính là phép toán đo "bao nhiêu phần của u đi cùng hướng với v".

### 1.2 Định nghĩa đại số

**Cho hai vector $\\mathbf{u}, \\mathbf{v} \\in \\mathbb{R}^n$**:

$$\\mathbf{u} \\cdot \\mathbf{v} = u_1 v_1 + u_2 v_2 + \\cdots + u_n v_n = \\sum_i u_i v_i$$

Kết quả là **một số thực** (scalar), KHÔNG phải vector. Vì vậy còn gọi là **tích vô hướng** (scalar product / inner product).

**Ví dụ tính tay**:

1. $\\mathbf{u} = (3, 4)$, $\\mathbf{v} = (2, 1)$ → $\\mathbf{u} \\cdot \\mathbf{v} = 3 \\cdot 2 + 4 \\cdot 1 = 6 + 4 = 10$.
2. $\\mathbf{u} = (1, 0, 0)$, $\\mathbf{v} = (0, 1, 0)$ → $\\mathbf{u} \\cdot \\mathbf{v} = 1 \\cdot 0 + 0 \\cdot 1 + 0 \\cdot 0 = 0$. (Hai trục Ox, Oy vuông góc → tích bằng 0, sẽ giải thích ngay.)
3. $\\mathbf{u} = (1, 2, 3)$, $\\mathbf{v} = (4, 5, 6)$ → $\\mathbf{u} \\cdot \\mathbf{v} = 4 + 10 + 18 = 32$.
4. $\\mathbf{u} = (2, -1)$, $\\mathbf{v} = (1, 2)$ → $\\mathbf{u} \\cdot \\mathbf{v} = 2 \\cdot 1 + (-1) \\cdot 2 = 2 - 2 = 0$. (Vuông góc!)
5. $\\mathbf{u} = (3, 0)$, $\\mathbf{v} = (-2, 0)$ → $\\mathbf{u} \\cdot \\mathbf{v} = 3 \\cdot (-2) + 0 \\cdot 0 = -6$. (Ngược hướng → âm.)
6. $\\mathbf{u} = (1, 1, 1, 1)$, $\\mathbf{v} = (1, 1, 1, 1)$ → $\\mathbf{u} \\cdot \\mathbf{v} = 1+1+1+1 = 4 = \\lVert u \\rVert^2$. (Tự dot với chính mình = bình phương độ dài.)

> **❓ Câu hỏi tự nhiên**: Tại sao lại nhân từng cặp tọa độ rồi cộng? Có vẻ tùy tiện?
>
> **Đáp**: Định nghĩa này KHÔNG tùy tiện — nó chính là khai triển của công thức hình học $\\lVert u \\rVert \\lVert v \\rVert \\cos\\theta$ (sẽ chứng minh ở mục 1.4). Cách dễ nhớ: dot product là cách rẻ nhất để mã hóa cả độ lớn + góc giữa hai vector mà không phải đo độ dài hay tính $\\arccos$ — chỉ cần nhân-cộng.

### 1.3 Định nghĩa hình học

**Cho hai vector $\\mathbf{u}, \\mathbf{v}$ có góc $\\theta$ giữa chúng ($0 \\leq \\theta \\leq \\pi$)**:

$$\\mathbf{u} \\cdot \\mathbf{v} = \\lVert u \\rVert \\cdot \\lVert v \\rVert \\cdot \\cos\\theta$$

Trong đó:
- $\\lVert u \\rVert$, $\\lVert v \\rVert$ là độ dài (norm) của u và v.
- $\\theta$ là góc giữa u và v.

**Ý nghĩa từng phần**:
- Nếu $\\theta = 0°$ (cùng hướng): $\\cos\\theta = 1$, dot product $= \\lVert u \\rVert \\lVert v \\rVert$ (dương, lớn nhất).
- Nếu $\\theta = 90°$ (vuông góc): $\\cos\\theta = 0$, dot product $= 0$.
- Nếu $\\theta = 180°$ (ngược hướng): $\\cos\\theta = -1$, dot product $= -\\lVert u \\rVert \\lVert v \\rVert$ (âm, nhỏ nhất).

> **💡 Trực giác hình học**: $\\lVert u \\rVert \\cos\\theta$ chính là độ dài "bóng đổ" của u khi chiếu vuông góc xuống đường thẳng chứa v. Nhân với $\\lVert v \\rVert$ → ta được "phần u đi theo hướng v, nhân với độ dài v". Đó là lý do dot product đo "chung hướng".

**Hai ví dụ mở đầu** (vẽ ra giấy để check):

- $\\mathbf{u} = (3, 0)$, $\\mathbf{v} = (2, 0)$. Cả hai cùng hướng Ox, $\\theta = 0$. $\\lVert u \\rVert = 3$, $\\lVert v \\rVert = 2$. $\\mathbf{u} \\cdot \\mathbf{v} = 3 \\cdot 2 \\cdot \\cos 0 = 6 \\cdot 1 = 6$. Verify đại số: $3 \\cdot 2 + 0 \\cdot 0 = 6$. ✓
- $\\mathbf{u} = (3, 0)$, $\\mathbf{v} = (0, 4)$. Vuông góc, $\\theta = 90°$. $\\lVert u \\rVert = 3$, $\\lVert v \\rVert = 4$. $\\mathbf{u} \\cdot \\mathbf{v} = 3 \\cdot 4 \\cdot \\cos 90° = 0$. Verify đại số: $3 \\cdot 0 + 0 \\cdot 4 = 0$. ✓

### 1.4 Chứng minh: hai định nghĩa bằng nhau

Đây là kết quả quan trọng nhất của bài. Ta cần chứng minh:

$$u_1 v_1 + u_2 v_2 + \\cdots + u_n v_n = \\lVert u \\rVert \\cdot \\lVert v \\rVert \\cdot \\cos\\theta$$

**Trường hợp 2D** (tổng quát tương tự, dùng định lý cosin trong $\\mathbb{R}^n$ qua khai triển hình học của 3 điểm bất kỳ).

Cho $\\mathbf{u} = (u_1, u_2)$ và $\\mathbf{v} = (v_1, v_2)$, cả hai đặt gốc tại O. Gọi:
- Điểm $A = \\mathbf{u}$, điểm $B = \\mathbf{v}$ (xem u, v như vector vị trí).
- Vector $B - A = \\mathbf{v} - \\mathbf{u}$ (đi từ A đến B).

Ba điểm O, A, B tạo thành tam giác. Độ dài 3 cạnh:
- $OA = \\lVert u \\rVert$
- $OB = \\lVert v \\rVert$
- $AB = \\lVert v - u \\rVert$

Góc tại đỉnh O chính là $\\theta$ (góc giữa u và v).

**Bước 1 — Áp dụng định lý cosin** (Tầng 2 Lesson 05) cho cạnh AB đối diện góc $\\theta$:

$$\\lVert v - u \\rVert^2 = \\lVert u \\rVert^2 + \\lVert v \\rVert^2 - 2\\lVert u \\rVert \\lVert v \\rVert \\cos\\theta$$

**Bước 2 — Khai triển $\\lVert v - u \\rVert^2$ bằng đại số** (theo công thức norm):

$$\\begin{aligned}
\\lVert v - u \\rVert^2 &= (v_1 - u_1)^2 + (v_2 - u_2)^2 \\\\
&= v_1^2 - 2u_1 v_1 + u_1^2 + v_2^2 - 2u_2 v_2 + u_2^2 \\\\
&= (u_1^2 + u_2^2) + (v_1^2 + v_2^2) - 2(u_1 v_1 + u_2 v_2) \\\\
&= \\lVert u \\rVert^2 + \\lVert v \\rVert^2 - 2(u_1 v_1 + u_2 v_2)
\\end{aligned}$$

**Bước 3 — So sánh hai biểu thức của $\\lVert v - u \\rVert^2$**:

$$\\lVert u \\rVert^2 + \\lVert v \\rVert^2 - 2\\lVert u \\rVert \\lVert v \\rVert \\cos\\theta = \\lVert u \\rVert^2 + \\lVert v \\rVert^2 - 2(u_1 v_1 + u_2 v_2)$$

Khử $\\lVert u \\rVert^2 + \\lVert v \\rVert^2$ ở hai vế, chia cả hai vế cho $-2$:

$$\\lVert u \\rVert \\cdot \\lVert v \\rVert \\cdot \\cos\\theta = u_1 v_1 + u_2 v_2$$

Đây chính là **hai định nghĩa của dot product khớp nhau** trong 2D. ∎

**Mở rộng $\\mathbb{R}^n$**: Lập luận hệt như vậy — vẫn có 3 điểm O, A, B với $A = \\mathbf{u}$, $B = \\mathbf{v}$, định lý cosin vẫn áp dụng được cho **bất kỳ tam giác phẳng nào trong không gian $\\mathbb{R}^n$** (vì 3 điểm luôn nằm trên một mặt phẳng 2D). Khai triển $\\lVert v - u \\rVert^2 = \\sum_i (v_i - u_i)^2$ ra rồi so sánh.

> **⚠ Lỗi thường gặp**: Có người chỉ nhớ một trong hai công thức rồi dùng nhầm. **Cả hai luôn cho cùng kết quả** — chọn công thức nào tùy bối cảnh:
> - Khi biết tọa độ → dùng đại số ($\\sum_i u_i v_i$).
> - Khi biết độ dài và góc → dùng hình học ($\\lVert u \\rVert \\lVert v \\rVert \\cos\\theta$).
> - Khi muốn TÍNH góc → kết hợp cả hai để giải ra $\\cos\\theta$.

### 1.5 Verify cả 2 vế bằng số

Lấy $\\mathbf{u} = (3, 4)$ và $\\mathbf{v} = (4, 0)$:

- Đại số: $\\mathbf{u} \\cdot \\mathbf{v} = 3 \\cdot 4 + 4 \\cdot 0 = 12$.
- Hình học: $\\lVert u \\rVert = \\sqrt{9+16} = 5$, $\\lVert v \\rVert = 4$. Góc $\\theta$: vì v nằm trên trục Ox và u tạo góc $\\arctan(4/3) \\approx 53.13°$ với Ox, ta có $\\theta \\approx 53.13°$. $\\cos\\theta = 3/5 = 0.6$. → $\\lVert u \\rVert \\lVert v \\rVert \\cos\\theta = 5 \\cdot 4 \\cdot 0.6 = 12$. ✓

Lấy $\\mathbf{u} = (1, 1, 1)$ và $\\mathbf{v} = (1, 1, 1)$:

- Đại số: $1 + 1 + 1 = 3$.
- Hình học: $\\lVert u \\rVert = \\lVert v \\rVert = \\sqrt{3}$. Vì $\\mathbf{u} = \\mathbf{v}$, $\\theta = 0$, $\\cos\\theta = 1$. → $\\sqrt{3} \\cdot \\sqrt{3} \\cdot 1 = 3$. ✓

> **🔁 Dừng lại tự kiểm tra**:
>
> *Câu hỏi*: Tính $\\mathbf{u} \\cdot \\mathbf{v}$ với $\\mathbf{u} = (2, -3, 1)$, $\\mathbf{v} = (1, 2, 4)$ bằng cả hai cách (nếu có thể).
>
> <details><summary>Đáp án</summary>
>
> Đại số: $2 \\cdot 1 + (-3) \\cdot 2 + 1 \\cdot 4 = 2 - 6 + 4 = 0$.
>
> Hình học: dot product = 0 → $\\cos\\theta = 0$ → $\\theta = 90°$. Hai vector vuông góc trong $\\mathbb{R}^3$. Ta không cần tính norm và $\\cos\\theta$ ngược lại — đại số đã cho đáp án 0 trực tiếp.
> </details>

### 1.6 Cách viết và ký hiệu

Có nhiều ký hiệu tương đương:

| Ký hiệu | Dùng ở đâu |
|---------|------------|
| $\\mathbf{u} \\cdot \\mathbf{v}$ | Phổ thông, sách giáo khoa |
| $\\langle \\mathbf{u}, \\mathbf{v} \\rangle$ | Toán cao cấp, "inner product" |
| $\\mathbf{u}^\\top \\mathbf{v}$ | Đại số tuyến tính (xem vector cột, u transpose nhân v) |
| $\\operatorname{dot}(\\mathbf{u}, \\mathbf{v})$ | Code (Python/Go/...) |

Trong bài này dùng $\\mathbf{u} \\cdot \\mathbf{v}$ cho thống nhất.

> **📝 Tóm tắt mục 1**:
> - Dot product $\\mathbf{u} \\cdot \\mathbf{v}$ cho ra **một số** (không phải vector).
> - **Đại số**: $\\sum_i u_i v_i$ — nhân từng cặp tọa độ rồi cộng.
> - **Hình học**: $\\lVert u \\rVert \\cdot \\lVert v \\rVert \\cdot \\cos\\theta$ — độ lớn × cosine góc.
> - Hai định nghĩa bằng nhau (chứng minh qua định lý cosin Tầng 2).
> - Dấu của dot product: dương ↔ $\\theta$ nhọn, 0 ↔ vuông góc, âm ↔ $\\theta$ tù.

---

## 2. Cosine similarity

### 2.1 Định nghĩa

Từ công thức hình học, **rearrange**:

$$\\cos\\theta = \\frac{\\mathbf{u} \\cdot \\mathbf{v}}{\\lVert u \\rVert \\cdot \\lVert v \\rVert}$$

Đây chính là **cosine similarity** giữa hai vector:

$$\\operatorname{cos\\_sim}(\\mathbf{u}, \\mathbf{v}) = \\frac{\\mathbf{u} \\cdot \\mathbf{v}}{\\lVert u \\rVert \\cdot \\lVert v \\rVert}$$

Range: $\\operatorname{cos\\_sim} \\in [-1, 1]$ (vì cosine của góc bất kỳ luôn nằm trong khoảng này — đã học Tầng 2 Lesson 03).

| Giá trị | Ý nghĩa |
|---------|---------|
| $+1$ | Hai vector **cùng hướng** ($\\theta = 0°$) |
| $> 0$ | Hai vector **lệch hướng góc nhọn** — vẫn "giống" |
| $0$ | Hai vector **vuông góc** — "không liên quan" |
| $< 0$ | Hai vector **lệch hướng góc tù** — "đối ngược" |
| $-1$ | Hai vector **ngược hướng** ($\\theta = 180°$) |

> **💡 Trực giác**: Cosine similarity là dot product **đã bỏ ảnh hưởng của độ lớn**. Vector $(3, 0)$ và $(300, 0)$ đều cùng hướng — cosine sim của chúng là 1, dù dot product là 900 (rất khác $9 = (3,0) \\cdot (3,0)$). Đây là lý do cosine sim rất phù hợp cho **so sánh ý nghĩa** trong NLP: hai câu cùng nội dung không nên chỉ vì "có nhiều từ hơn" mà bị khác.

### 2.2 Năm ví dụ walk-through

**Ví dụ 1 — 2D, cùng hướng**:
- $\\mathbf{u} = (3, 0)$, $\\mathbf{v} = (5, 0)$.
- $\\mathbf{u} \\cdot \\mathbf{v} = 3 \\cdot 5 + 0 \\cdot 0 = 15$.
- $\\lVert u \\rVert = 3$, $\\lVert v \\rVert = 5$.
- $\\operatorname{cos\\_sim} = 15 / (3 \\cdot 5) = 15/15 = 1$. → **Hoàn toàn cùng hướng**.

**Ví dụ 2 — 2D, vuông góc**:
- $\\mathbf{u} = (1, 0)$, $\\mathbf{v} = (0, 1)$.
- $\\mathbf{u} \\cdot \\mathbf{v} = 0$.
- $\\operatorname{cos\\_sim} = 0$. → **Vuông góc**.

**Ví dụ 3 — 2D, góc 60°**:
- $\\mathbf{u} = (1, 0)$, $\\mathbf{v} = (1, \\sqrt{3})$. (v nằm ở góc 60° vì $\\tan 60° = \\sqrt{3}$.)
- $\\mathbf{u} \\cdot \\mathbf{v} = 1 \\cdot 1 + 0 \\cdot \\sqrt{3} = 1$.
- $\\lVert u \\rVert = 1$, $\\lVert v \\rVert = \\sqrt{1+3} = 2$.
- $\\operatorname{cos\\_sim} = 1 / (1 \\cdot 2) = 0.5$. → Đúng vì $\\cos 60° = 0.5$. ✓

**Ví dụ 4 — 3D**:
- $\\mathbf{u} = (1, 2, 2)$, $\\mathbf{v} = (2, 1, 2)$.
- $\\mathbf{u} \\cdot \\mathbf{v} = 2 + 2 + 4 = 8$.
- $\\lVert u \\rVert = \\sqrt{1+4+4} = 3$, $\\lVert v \\rVert = \\sqrt{4+1+4} = 3$.
- $\\operatorname{cos\\_sim} = 8 / 9 \\approx 0.889$. → Hai vector "khá giống hướng" (góc $\\approx 27.27°$).

**Ví dụ 5 — 4D, embedding giả lập**:

Giả sử ta có "embedding" cho 3 từ (4 chiều, đã chuẩn hoá):

\`\`\`
"cat"  = (0.8, 0.6, 0.0, 0.0)
"dog"  = (0.7, 0.7, 0.1, 0.0)
"car"  = (0.0, 0.0, 0.9, 0.4)
\`\`\`

(Tất nhiên embedding thật là 300D/768D, không có ý nghĩa "trục" như vậy. Đây là toy.)

- **cat vs dog**:
  - $\\mathbf{u} \\cdot \\mathbf{v} = 0.8 \\cdot 0.7 + 0.6 \\cdot 0.7 + 0 + 0 = 0.56 + 0.42 = 0.98$.
  - $\\lVert \\text{cat} \\rVert = \\sqrt{0.64 + 0.36} = 1.0$ (đã normalize). $\\lVert \\text{dog} \\rVert = \\sqrt{0.49 + 0.49 + 0.01} \\approx 0.995$.
  - $\\operatorname{cos\\_sim} \\approx 0.98 / (1 \\cdot 0.995) \\approx 0.985$. → **Rất giống** (động vật).
- **cat vs car**:
  - $\\mathbf{u} \\cdot \\mathbf{v} = 0 + 0 + 0 + 0 = 0$.
  - $\\operatorname{cos\\_sim} = 0$. → **Không liên quan** (chỉ trùng phụ âm đầu — và embedding không quan tâm chính tả).
- **dog vs car**:
  - $\\mathbf{u} \\cdot \\mathbf{v} = 0 + 0 + 0.1 \\cdot 0.9 + 0 = 0.09$.
  - $\\operatorname{cos\\_sim} \\approx 0.09 / (0.995 \\cdot 0.985) \\approx 0.092$. → **Gần như không liên quan**.

### 2.3 Trường hợp đặc biệt: vector đã normalize

Nếu $\\lVert u \\rVert = \\lVert v \\rVert = 1$ (vector đơn vị, "unit vector"), thì:

$$\\operatorname{cos\\_sim}(\\mathbf{u}, \\mathbf{v}) = \\mathbf{u} \\cdot \\mathbf{v}$$

→ **Dot product trực tiếp = cosine similarity**, không cần chia.

Đây là lý do các thư viện embedding (OpenAI, sentence-transformers) thường **L2-normalize** embedding trước khi lưu vào vector database. Khi đó:
- Tính cosine sim = chỉ cần 1 phép dot product (nhanh hơn 2-3 lần).
- FAISS, Pinecone, Weaviate đều có chế độ "inner product" — chính là cos sim khi vector đã normalize.

> **⚠ Lỗi thường gặp**: Nhầm dot product với cosine similarity khi vector CHƯA normalize. $\\mathbf{u} \\cdot \\mathbf{v} = 100$ nghe có vẻ "rất giống nhau", nhưng nếu $\\lVert u \\rVert = \\lVert v \\rVert = 1000$, thực ra $\\operatorname{cos\\_sim} = 100 / (1000 \\cdot 1000) = 0.0001$ — gần như vuông góc. **Luôn check norm trước khi diễn giải dot product**.

> **❓ Câu hỏi tự nhiên**: Có cách nào nhanh hơn cosine sim không?
>
> **Đáp**:
> 1. **Pre-normalize** → giảm cos sim về dot product (đã nói trên).
> 2. **Quantization** (int8 thay vì float32) → giảm tính toán 4x, chấp nhận sai số nhỏ.
> 3. **Approximate nearest neighbor** (HNSW, IVF): không tính cos sim với toàn bộ corpus, chỉ với một subset. Trade-off recall vs speed. Sẽ học sâu hơn ở **Tầng 6 — AI/ML**.

> **🔁 Dừng lại tự kiểm tra**:
>
> *Câu hỏi*: $\\mathbf{u} = (3, 4)$, $\\mathbf{v} = (6, 8)$. Tính $\\mathbf{u} \\cdot \\mathbf{v}$, $\\operatorname{cos\\_sim}(\\mathbf{u}, \\mathbf{v})$. Hai vector có cùng hướng không?
>
> <details><summary>Đáp án</summary>
>
> - $\\mathbf{u} \\cdot \\mathbf{v} = 18 + 32 = 50$.
> - $\\lVert u \\rVert = 5$, $\\lVert v \\rVert = 10$. $\\operatorname{cos\\_sim} = 50/50 = 1$.
> - **Có**, hoàn toàn cùng hướng ($\\mathbf{v} = 2\\mathbf{u}$, scalar dương).
> </details>

> **📝 Tóm tắt mục 2**:
> - $\\operatorname{cos\\_sim}(\\mathbf{u}, \\mathbf{v}) = (\\mathbf{u} \\cdot \\mathbf{v}) / (\\lVert u \\rVert \\lVert v \\rVert)$, range $[-1, 1]$.
> - Nếu đã normalize: cos sim = dot product.
> - Đây là phép toán cốt lõi của embedding search / RAG / attention.

---

## 3. Tính chất dot product

### 3.1 Bốn tính chất cơ bản

Cho $\\mathbf{u}, \\mathbf{v}, \\mathbf{w} \\in \\mathbb{R}^n$ và $c \\in \\mathbb{R}$:

| Tính chất | Công thức | Chứng minh nhanh |
|-----------|-----------|------------------|
| Giao hoán | $\\mathbf{u} \\cdot \\mathbf{v} = \\mathbf{v} \\cdot \\mathbf{u}$ | $\\sum_i u_i v_i = \\sum_i v_i u_i$ (nhân số giao hoán) |
| Phân phối | $\\mathbf{u} \\cdot (\\mathbf{v} + \\mathbf{w}) = \\mathbf{u} \\cdot \\mathbf{v} + \\mathbf{u} \\cdot \\mathbf{w}$ | $\\sum_i u_i(v_i + w_i) = \\sum_i u_i v_i + \\sum_i u_i w_i$ |
| Scalar | $(c\\mathbf{u}) \\cdot \\mathbf{v} = c(\\mathbf{u} \\cdot \\mathbf{v}) = \\mathbf{u} \\cdot (c\\mathbf{v})$ | $\\sum_i (cu_i)v_i = c \\sum_i u_i v_i$ |
| Tự dot | $\\mathbf{u} \\cdot \\mathbf{u} = \\lVert u \\rVert^2 \\geq 0$, dấu = chỉ khi $\\mathbf{u} = 0$ | $\\sum_i u_i^2 \\geq 0$ |

**Verify từng tính chất bằng số cụ thể**:

1. **Giao hoán** với $\\mathbf{u} = (1, 2)$, $\\mathbf{v} = (3, 4)$: $\\mathbf{u} \\cdot \\mathbf{v} = 3 + 8 = 11$. $\\mathbf{v} \\cdot \\mathbf{u} = 3 + 8 = 11$. ✓
2. **Phân phối** với $\\mathbf{u} = (1, 0)$, $\\mathbf{v} = (1, 1)$, $\\mathbf{w} = (2, 3)$:
   - $\\mathbf{v} + \\mathbf{w} = (3, 4)$. $\\mathbf{u} \\cdot (\\mathbf{v}+\\mathbf{w}) = 3 + 0 = 3$.
   - $\\mathbf{u} \\cdot \\mathbf{v} = 1$. $\\mathbf{u} \\cdot \\mathbf{w} = 2$. Tổng = 3. ✓
3. **Scalar** với $c = 5$, $\\mathbf{u} = (1, 2)$, $\\mathbf{v} = (3, 4)$:
   - $c\\mathbf{u} = (5, 10)$. $(c\\mathbf{u}) \\cdot \\mathbf{v} = 15 + 40 = 55$.
   - $c(\\mathbf{u} \\cdot \\mathbf{v}) = 5 \\cdot (3+8) = 5 \\cdot 11 = 55$. ✓
4. **Tự dot** với $\\mathbf{u} = (3, 4)$: $\\mathbf{u} \\cdot \\mathbf{u} = 9 + 16 = 25 = 5^2 = \\lVert u \\rVert^2$. ✓

### 3.2 Hệ quả quan trọng

Từ các tính chất trên ta suy ra:

- $\\lVert u + v \\rVert^2 = \\lVert u \\rVert^2 + 2\\,\\mathbf{u} \\cdot \\mathbf{v} + \\lVert v \\rVert^2$ (khai triển hệt như $(a+b)^2$ cho số thường).
- $\\lVert u - v \\rVert^2 = \\lVert u \\rVert^2 - 2\\,\\mathbf{u} \\cdot \\mathbf{v} + \\lVert v \\rVert^2$ (đây là dạng định lý cosin viết lại bằng dot product).

Chứng minh hệ quả đầu:

$$\\begin{aligned}
\\lVert u + v \\rVert^2 &= (\\mathbf{u} + \\mathbf{v}) \\cdot (\\mathbf{u} + \\mathbf{v}) \\\\
&= \\mathbf{u} \\cdot \\mathbf{u} + \\mathbf{u} \\cdot \\mathbf{v} + \\mathbf{v} \\cdot \\mathbf{u} + \\mathbf{v} \\cdot \\mathbf{v} &&\\text{(phân phối, 2 lần)} \\\\
&= \\lVert u \\rVert^2 + 2(\\mathbf{u} \\cdot \\mathbf{v}) + \\lVert v \\rVert^2 &&\\text{(giao hoán: } \\mathbf{u} \\cdot \\mathbf{v} = \\mathbf{v} \\cdot \\mathbf{u}\\text{)}
\\end{aligned}$$

**Verify**: $\\mathbf{u} = (1, 0)$, $\\mathbf{v} = (0, 1)$. $\\mathbf{u} + \\mathbf{v} = (1, 1)$, $\\lVert u+v \\rVert^2 = 2$. Mặt khác $\\lVert u \\rVert^2 + 2\\,\\mathbf{u} \\cdot \\mathbf{v} + \\lVert v \\rVert^2 = 1 + 0 + 1 = 2$. ✓

> **💡 Trực giác hệ quả**: Đây chính là **định lý Pythagoras tổng quát**. Nếu u và v vuông góc ($\\mathbf{u} \\cdot \\mathbf{v} = 0$), ta có $\\lVert u + v \\rVert^2 = \\lVert u \\rVert^2 + \\lVert v \\rVert^2$ — định lý Pythagoras quen thuộc. Dot product cho phép ta mở rộng Pythagoras sang trường hợp bất kỳ.

> **📝 Tóm tắt mục 3**: 4 tính chất + 2 hệ quả khai triển. Phân phối là tính chất quan trọng nhất, sẽ dùng nhiều ở các bài sau.

---

## 4. Vuông góc (Orthogonal)

### 4.1 Định nghĩa

Hai vector $\\mathbf{u}, \\mathbf{v} \\in \\mathbb{R}^n$ được gọi là **vuông góc** (orthogonal) khi và chỉ khi:

$$\\mathbf{u} \\cdot \\mathbf{v} = 0$$

Ký hiệu: $\\mathbf{u} \\perp \\mathbf{v}$.

**Tại sao định nghĩa này hợp lý?** Từ $\\mathbf{u} \\cdot \\mathbf{v} = \\lVert u \\rVert \\lVert v \\rVert \\cos\\theta = 0$, nếu cả $\\lVert u \\rVert \\neq 0$ và $\\lVert v \\rVert \\neq 0$, thì $\\cos\\theta = 0 \\to \\theta = 90°$. Đây chính là vuông góc theo nghĩa hình học.

> **⚠ Lưu ý mở rộng**: Định nghĩa này áp dụng cho mọi $\\mathbb{R}^n$, kể cả khi không có hình ảnh trực quan (vd $\\mathbb{R}^{1000}$). Trong các không gian cao chiều, "vuông góc" được định nghĩa qua dot product, không phải qua mắt nhìn.

### 4.2 Bốn ví dụ

1. $\\mathbf{u} = (1, 0)$, $\\mathbf{v} = (0, 1)$. $\\mathbf{u} \\cdot \\mathbf{v} = 0$. $\\perp$. (Trục Ox và Oy.)
2. $\\mathbf{u} = (3, 4)$, $\\mathbf{v} = (-4, 3)$. $\\mathbf{u} \\cdot \\mathbf{v} = -12 + 12 = 0$. $\\perp$. (Xoay 90° trong 2D thì luôn cho 1 vector vuông góc — Tầng 2 Lesson 06.)
3. $\\mathbf{u} = (1, 2, 3)$, $\\mathbf{v} = (3, 0, -1)$. $\\mathbf{u} \\cdot \\mathbf{v} = 3 + 0 - 3 = 0$. $\\perp$.
4. $\\mathbf{u} = (1, 1, 1, 1)$, $\\mathbf{v} = (1, -1, 1, -1)$. $\\mathbf{u} \\cdot \\mathbf{v} = 1 - 1 + 1 - 1 = 0$. $\\perp$. (4D — không thể hình dung, nhưng đại số bảo vậy.)

### 4.3 Orthonormal — vuông góc và đơn vị

Một tập vector $\\{e_1, e_2, \\ldots, e_k\\}$ gọi là **orthonormal** nếu:
- $e_i \\cdot e_j = 0$ khi $i \\neq j$ (đôi một vuông góc).
- $e_i \\cdot e_i = 1$ (mỗi vector có độ dài 1).

Tập **chuẩn nhất** trong $\\mathbb{R}^n$ là **basis chuẩn**:

$$e_1 = \\begin{bmatrix} 1 \\\\ 0 \\\\ 0 \\\\ \\vdots \\\\ 0 \\end{bmatrix}, \\quad
e_2 = \\begin{bmatrix} 0 \\\\ 1 \\\\ 0 \\\\ \\vdots \\\\ 0 \\end{bmatrix}, \\quad \\ldots, \\quad
e_n = \\begin{bmatrix} 0 \\\\ 0 \\\\ \\vdots \\\\ 0 \\\\ 1 \\end{bmatrix}$$

Đây là khái niệm trung tâm của **Lesson 04** (basis) và **Lesson 07** (eigenvector + diagonalization).

> **🔁 Dừng lại tự kiểm tra**:
>
> Tìm một vector $\\mathbf{w} \\in \\mathbb{R}^3$ vuông góc với cả $\\mathbf{u} = (1, 0, 0)$ và $\\mathbf{v} = (0, 1, 0)$.
>
> <details><summary>Đáp án</summary>
>
> $\\mathbf{w} = (0, 0, c)$ với $c \\neq 0$ bất kỳ. Vd $(0, 0, 1)$ hoặc $(0, 0, -7)$. Đây chính là phép **cross product** trong $\\mathbb{R}^3$, sẽ thấy ở các bài sau.
> </details>

> **📝 Tóm tắt mục 4**: $\\mathbf{u} \\perp \\mathbf{v} \\iff \\mathbf{u} \\cdot \\mathbf{v} = 0$. Orthonormal = orthogonal + chuẩn hóa. Basis chuẩn là ví dụ orthonormal đẹp nhất.

---

## 5. Projection — Hình chiếu vector

### 5.1 Đặt vấn đề

Cho vector $\\mathbf{u}$. Ta muốn tách u thành 2 phần:
- Phần **đi cùng hướng** v (gọi là $\\mathbf{u}_\\parallel$).
- Phần **vuông góc** với v (gọi là $\\mathbf{u}_\\perp$).

Sao cho $\\mathbf{u} = \\mathbf{u}_\\parallel + \\mathbf{u}_\\perp$. Phần $\\mathbf{u}_\\parallel$ chính là **projection của u lên v**, ký hiệu $\\operatorname{proj}_v(u)$.

> **💡 Trực giác**: Hãy tưởng tượng v là một thanh sắt nằm ngang. Bạn chiếu đèn pin vuông góc xuống vector u. **Bóng** của u trên thanh sắt $= \\operatorname{proj}_v(u)$. Bóng này có cùng hướng v (hoặc ngược hướng nếu góc tù).

### 5.2 Công thức

$$\\operatorname{proj}_v(u) = \\frac{\\mathbf{u} \\cdot \\mathbf{v}}{\\mathbf{v} \\cdot \\mathbf{v}} \\cdot \\mathbf{v} = \\frac{\\mathbf{u} \\cdot \\mathbf{v}}{\\lVert v \\rVert^2} \\cdot \\mathbf{v}$$

**Suy luận công thức**:
- $\\operatorname{proj}_v(u)$ phải cùng hướng v → $\\operatorname{proj}_v(u) = \\alpha \\mathbf{v}$ với scalar $\\alpha$ nào đó.
- Phần dư $\\mathbf{u} - \\alpha \\mathbf{v}$ phải vuông góc với v → $(\\mathbf{u} - \\alpha \\mathbf{v}) \\cdot \\mathbf{v} = 0$.
- Khai triển: $\\mathbf{u} \\cdot \\mathbf{v} - \\alpha(\\mathbf{v} \\cdot \\mathbf{v}) = 0$ → $\\alpha = \\dfrac{\\mathbf{u} \\cdot \\mathbf{v}}{\\mathbf{v} \\cdot \\mathbf{v}}$.
- Suy ra $\\operatorname{proj}_v(u) = \\dfrac{\\mathbf{u} \\cdot \\mathbf{v}}{\\mathbf{v} \\cdot \\mathbf{v}} \\cdot \\mathbf{v}$. ∎

### 5.3 Ba ví dụ walk-through

**Ví dụ 1 — 2D, đơn giản**:
- $\\mathbf{u} = (3, 4)$, $\\mathbf{v} = (1, 0)$.
- $\\mathbf{u} \\cdot \\mathbf{v} = 3 \\cdot 1 + 4 \\cdot 0 = 3$. $\\mathbf{v} \\cdot \\mathbf{v} = 1$. $\\alpha = 3/1 = 3$.
- $\\operatorname{proj}_v(u) = 3 \\cdot (1, 0) = (3, 0)$.
- **Diễn giải**: u chiếu xuống trục Ox → bóng có tọa độ $(3, 0)$. Phần dư $\\mathbf{u} - (3, 0) = (0, 4)$ vuông góc với v. ✓

**Ví dụ 2 — 2D, v không đơn vị**:
- $\\mathbf{u} = (2, 3)$, $\\mathbf{v} = (4, 0)$.
- $\\mathbf{u} \\cdot \\mathbf{v} = 8$. $\\mathbf{v} \\cdot \\mathbf{v} = 16$. $\\alpha = 8/16 = 0.5$.
- $\\operatorname{proj}_v(u) = 0.5 \\cdot (4, 0) = (2, 0)$.
- Verify: $\\mathbf{u} - (2, 0) = (0, 3)$. $(0, 3) \\cdot (4, 0) = 0$. ✓

**Ví dụ 3 — 3D**:
- $\\mathbf{u} = (1, 2, 2)$, $\\mathbf{v} = (0, 0, 3)$.
- $\\mathbf{u} \\cdot \\mathbf{v} = 0 + 0 + 6 = 6$. $\\mathbf{v} \\cdot \\mathbf{v} = 9$. $\\alpha = 6/9 = 2/3$.
- $\\operatorname{proj}_v(u) = (2/3) \\cdot (0, 0, 3) = (0, 0, 2)$.
- Verify: $\\mathbf{u} - (0, 0, 2) = (1, 2, 0)$. $(1, 2, 0) \\cdot (0, 0, 3) = 0$. ✓

### 5.4 Độ dài projection

Từ công thức:

$$\\lVert \\operatorname{proj}_v(u) \\rVert = \\frac{\\lvert \\mathbf{u} \\cdot \\mathbf{v} \\rvert}{\\lVert v \\rVert} = \\lVert u \\rVert \\cdot \\lvert \\cos\\theta \\rvert$$

Đây chính là **"bóng đổ"** của u trên v — đúng như trực giác.

> **⚠ Lỗi thường gặp**: Nhầm $\\operatorname{proj}_v(u)$ với $\\operatorname{proj}_u(v)$. Hai phép chiếu KHÁC nhau:
> - $\\operatorname{proj}_v(u)$ = u chiếu **xuống** v (kết quả nằm trên đường thẳng v).
> - $\\operatorname{proj}_u(v)$ = v chiếu xuống u (kết quả nằm trên đường thẳng u).
> Nhớ: subscript là vector ĐÍCH (đường thẳng để chiếu xuống).

> **📝 Tóm tắt mục 5**:
> - $\\operatorname{proj}_v(u) = ((\\mathbf{u} \\cdot \\mathbf{v})/\\lVert v \\rVert^2) \\cdot \\mathbf{v}$ — vector cùng hướng v.
> - Phần dư $\\mathbf{u} - \\operatorname{proj}_v(u)$ vuông góc với v (phân tích trực giao).
> - Là nền của Gram-Schmidt (Lesson 04), least squares (Lesson 05).

---

## 6. Cauchy-Schwarz inequality

### 6.1 Phát biểu

**Với mọi $\\mathbf{u}, \\mathbf{v} \\in \\mathbb{R}^n$**:

$$\\lvert \\mathbf{u} \\cdot \\mathbf{v} \\rvert \\leq \\lVert u \\rVert \\cdot \\lVert v \\rVert$$

Dấu $=$ xảy ra $\\iff$ u, v cùng phương (tức là $\\mathbf{v} = c\\mathbf{u}$ với scalar $c$ nào đó).

### 6.2 Chứng minh

**Cách 1 — Suy luận từ hình học** (ngắn nhưng cần biết $\\lVert u \\rVert \\lVert v \\rVert \\cos\\theta$):
- $\\mathbf{u} \\cdot \\mathbf{v} = \\lVert u \\rVert \\lVert v \\rVert \\cos\\theta$.
- $\\lvert \\cos\\theta \\rvert \\leq 1$ với mọi góc $\\theta$.
- Vậy $\\lvert \\mathbf{u} \\cdot \\mathbf{v} \\rvert = \\lVert u \\rVert \\lVert v \\rVert \\lvert \\cos\\theta \\rvert \\leq \\lVert u \\rVert \\lVert v \\rVert$. ∎

**Cách 2 — Đại số thuần** (không cần khái niệm góc — quan trọng vì ở $\\mathbb{R}^n$ với n lớn "góc" chỉ có nghĩa qua định nghĩa này):

Xét hàm $f(t) = \\lVert u - t\\mathbf{v} \\rVert^2 \\geq 0$ với mọi $t \\in \\mathbb{R}$.

Khai triển (dùng hệ quả mục 3.2):

$$f(t) = \\lVert u \\rVert^2 - 2t(\\mathbf{u} \\cdot \\mathbf{v}) + t^2 \\lVert v \\rVert^2$$

Đây là **tam thức bậc 2 theo t**. Vì $f(t) \\geq 0$ với mọi t, **discriminant $\\leq 0$**:

$$\\begin{aligned}
\\Delta = (2(\\mathbf{u} \\cdot \\mathbf{v}))^2 - 4\\lVert v \\rVert^2 \\lVert u \\rVert^2 &\\leq 0 \\\\
4(\\mathbf{u} \\cdot \\mathbf{v})^2 &\\leq 4\\lVert u \\rVert^2 \\lVert v \\rVert^2 \\\\
(\\mathbf{u} \\cdot \\mathbf{v})^2 &\\leq \\lVert u \\rVert^2 \\cdot \\lVert v \\rVert^2 \\\\
\\lvert \\mathbf{u} \\cdot \\mathbf{v} \\rvert &\\leq \\lVert u \\rVert \\cdot \\lVert v \\rVert &&\\text{(lấy căn 2 vế, cả 2 vế đều } \\geq 0\\text{)}
\\end{aligned}$$

∎

### 6.3 Verify bằng số

- $\\mathbf{u} = (3, 4)$, $\\mathbf{v} = (1, 0)$. $\\mathbf{u} \\cdot \\mathbf{v} = 3$, $\\lvert \\mathbf{u} \\cdot \\mathbf{v} \\rvert = 3$. $\\lVert u \\rVert \\lVert v \\rVert = 5 \\cdot 1 = 5$. $3 \\leq 5$. ✓
- $\\mathbf{u} = (1, 2)$, $\\mathbf{v} = (2, 4)$ (cùng phương, $\\mathbf{v} = 2\\mathbf{u}$). $\\mathbf{u} \\cdot \\mathbf{v} = 10$, $\\lvert \\mathbf{u} \\cdot \\mathbf{v} \\rvert = 10$. $\\lVert u \\rVert = \\sqrt{5}$, $\\lVert v \\rVert = \\sqrt{20} = 2\\sqrt{5}$. $\\lVert u \\rVert \\lVert v \\rVert = \\sqrt{5} \\cdot 2\\sqrt{5} = 10$. **Dấu =**. ✓
- $\\mathbf{u} = (1, 0)$, $\\mathbf{v} = (0, 1)$. $\\mathbf{u} \\cdot \\mathbf{v} = 0$. $\\lVert u \\rVert \\lVert v \\rVert = 1$. $0 \\leq 1$. ✓

### 6.4 Ý nghĩa

Cauchy-Schwarz là **bất đẳng thức nền** của giải tích và xác suất:

- **Đảm bảo cosine similarity nằm trong $[-1, 1]$** — vì $\\operatorname{cos\\_sim} = (\\mathbf{u} \\cdot \\mathbf{v})/(\\lVert u \\rVert \\lVert v \\rVert)$ và $\\lvert \\mathbf{u} \\cdot \\mathbf{v} \\rvert \\leq \\lVert u \\rVert \\lVert v \\rVert$.
- **Trong xác suất**: $\\lvert \\operatorname{Cov}(X, Y) \\rvert \\leq \\sigma_X \\cdot \\sigma_Y$ (sẽ thấy Tầng 5 Probability) → định nghĩa **hệ số tương quan Pearson** $r \\in [-1, 1]$.
- **Trong giải tích**: cần thiết để chứng minh **bất đẳng thức tam giác** $\\lVert u + v \\rVert \\leq \\lVert u \\rVert + \\lVert v \\rVert$ (Lesson 03).

> **📝 Tóm tắt mục 6**: $\\lvert \\mathbf{u} \\cdot \\mathbf{v} \\rvert \\leq \\lVert u \\rVert \\lVert v \\rVert$. Là điều kiện cho cosine sim hợp lệ, và xuất hiện ở mọi tầng tiếp theo.

---

## 7. Cosine similarity trong embedding / RAG (PHẦN TRỌNG TÂM)

Đây là phần **ứng dụng nóng nhất** của cosine similarity hiện nay. Đây cũng là lý do bài này quan trọng nhất Tầng 4.

### 7.1 Embedding là gì?

**Định nghĩa nông**: Embedding là **một vector trong $\\mathbb{R}^d$** (thường $d = 300, 768, 1536, 3072$) đại diện cho một từ / câu / đoạn / hình ảnh / video.

**Đặc tính kỳ diệu**: Hai thứ có ý nghĩa giống nhau → hai vector embedding của chúng **cùng hướng** trong $\\mathbb{R}^d$.

Ví dụ (giả định embedding 4D — thực tế là 300D+):

\`\`\`
"con mèo"   → (0.81, 0.59, 0.02, 0.03)
"con chó"   → (0.78, 0.62, 0.08, 0.05)
"chiếc xe"  → (0.05, 0.07, 0.88, 0.41)
"ô tô"     → (0.04, 0.09, 0.85, 0.46)
"Paris"     → (0.20, 0.10, 0.30, 0.75)
"thủ đô"   → (0.18, 0.12, 0.33, 0.71)
\`\`\`

Tính cosine similarity pairwise sẽ thấy:
- "con mèo" vs "con chó": ≈ 0.998 (động vật)
- "chiếc xe" vs "ô tô": ≈ 0.999 (đồng nghĩa)
- "Paris" vs "thủ đô": ≈ 0.998 (liên quan ngữ nghĩa)
- "con mèo" vs "chiếc xe": ≈ 0.10 (không liên quan)
- "con chó" vs "Paris": ≈ 0.30 (yếu)

Cụ thể "con mèo" vs "con chó":
- $\\mathbf{u} \\cdot \\mathbf{v} = 0.81 \\cdot 0.78 + 0.59 \\cdot 0.62 + 0.02 \\cdot 0.08 + 0.03 \\cdot 0.05 = 0.6318 + 0.3658 + 0.0016 + 0.0015 \\approx 1.0007$
- $\\lVert u \\rVert \\approx \\sqrt{0.656 + 0.348 + 0.0004 + 0.0009} \\approx \\sqrt{1.005} \\approx 1.0025$
- $\\lVert v \\rVert \\approx \\sqrt{0.608 + 0.384 + 0.0064 + 0.0025} \\approx \\sqrt{1.001} \\approx 1.0005$
- $\\operatorname{cos\\_sim} \\approx 1.0007 / (1.0025 \\cdot 1.0005) \\approx 0.998$. ✓

> **⚠ Đây là toy — không phải embedding thật**: Embedding thật từ OpenAI/SBERT có 768D+, từng tọa độ không tương ứng với "trục" có nghĩa. Mô hình học cách phân phối thông tin qua nhiều trục cùng lúc — không thể đọc trực tiếp từng tọa độ. Ở đây chúng ta dùng 4D để có thể tính tay.

### 7.2 Hai loại embedding chính

| Loại | Kích thước | Ví dụ mô hình | Dùng làm gì |
|------|------------|---------------|-------------|
| **Word embedding** | 50-300D | Word2Vec, GloVe, fastText | Đại diện 1 từ duy nhất |
| **Sentence/Doc embedding** | 384-3072D | Sentence-BERT, OpenAI \`text-embedding-3-*\`, Cohere | Đại diện cả câu/đoạn |

Word embedding xuất hiện trước (2013, Word2Vec). Sentence embedding là tiến hóa — nó "đọc cả câu" và xuất ra 1 vector tóm tắt nghĩa.

### 7.3 Vector database

**Vấn đề thực tế**: Bạn có 1 triệu document. Mỗi document → 1 vector 1536D. Cần trả lời câu hỏi: *"document nào gần nhất với query này?"*

**Naive**: tính cos sim của query với toàn bộ 1 triệu document → $O(N \\cdot d)$ phép tính. Với $N = 10^6$, $d = 1536$, mỗi query → 1.5 tỷ phép nhân-cộng. Quá chậm.

**Vector database** (Pinecone, Weaviate, Qdrant, Milvus, FAISS, pgvector...) làm 3 việc:

1. **Lưu trữ** vector kèm metadata (text gốc, ID, ngày, ...).
2. **Index** bằng cấu trúc dữ liệu đặc biệt (HNSW graph, IVF, ...) để tìm top-K nhanh.
3. **Truy vấn**: cho vector query → trả về top-K nearest neighbor theo cosine similarity (hoặc inner product / L2).

Với HNSW, truy vấn 1M document chỉ mất **~5ms** (so với ~5s nếu naive) — chấp nhận sai số recall < 1%.

### 7.4 RAG — Retrieval Augmented Generation

Đây là kiến trúc **phổ biến nhất** trong các ứng dụng LLM hiện nay (ChatGPT cho doanh nghiệp, Cursor, Notion AI, ...). Pipeline:

\`\`\`
┌─────────────────────────────────────────────────────────────┐
│ INDEXING (offline, chạy 1 lần khi build dataset)          │
│                                                             │
│  documents → chunking → embedding → vector DB              │
│  ("Tài liệu sản phẩm A...") → ["Tài liệu...", "sản phẩm…"] │
│                              → [(0.1, 0.3, ...), ...]      │
│                              → lưu vào Qdrant / Pinecone   │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ QUERY (online, mỗi khi user hỏi)                          │
│                                                             │
│  ❶ user_query: "Sản phẩm A có cài đặt ngoài trời được không?" │
│  ❷ query_embedding = embed(query)  → vector 1536D          │
│  ❸ retrieve = vector_db.top_k(query_embedding, k=5)        │
│      → 5 chunk text liên quan nhất (theo cos sim)          │
│  ❹ prompt = "Dựa vào tài liệu sau, trả lời:\\n" + chunks    │
│      + "\\nCâu hỏi: " + user_query                          │
│  ❺ answer = LLM(prompt)  ← GPT/Claude/Llama đọc context    │
│      đã được retrieve và trả lời                           │
└─────────────────────────────────────────────────────────────┘
\`\`\`

**Cốt lõi của bước ❸** chính là **cosine similarity** — đó là toàn bộ lý do bài học này quan trọng.

> **❓ Câu hỏi tự nhiên**: Tại sao cần RAG mà không cho LLM xem toàn bộ tài liệu?
>
> **Đáp**: Context window của LLM giới hạn (4K → 200K token). Doanh nghiệp có hàng GB tài liệu, không thể nhồi hết. RAG = "chỉ đưa cho LLM 5-20 chunk LIÊN QUAN NHẤT" — tiết kiệm token, giảm chi phí, và (quan trọng nhất) **trả lời chính xác hơn** vì LLM tập trung vào ít context có chất lượng cao.

### 7.5 Tại sao cosine sim chứ không phải Euclidean distance?

Đây là câu hỏi rất quan trọng. So sánh:

| Tiêu chí | Cosine similarity | Euclidean distance |
|----------|-------------------|--------------------|
| Công thức | $(\\mathbf{u} \\cdot \\mathbf{v}) / (\\lVert u \\rVert \\lVert v \\rVert)$ | $\\sqrt{\\sum_i (u_i - v_i)^2}$ |
| Quan tâm | **Hướng** | **Vị trí tuyệt đối** |
| Range | $[-1, 1]$ | $[0, \\infty)$ |
| Ảnh hưởng độ lớn | Không | Có |

**Vì sao embedding nên dùng cosine?**

1. **Embedding mã hóa nghĩa qua HƯỚNG, không phải độ lớn**. Hai vector cùng hướng = cùng nghĩa, độ lớn chỉ phản ánh "confidence" hoặc artifact của mô hình.

2. **Câu dài và câu ngắn cùng ý** — embedding có thể có độ lớn khác nhau (vì tổng hợp nhiều token), nhưng "hướng" thì gần. Euclidean sẽ đánh giá hai câu này khác xa nhau (sai), cosine sẽ đánh giá gần (đúng).

3. **Trong không gian cao chiều**, Euclidean distance bị **curse of dimensionality** — mọi cặp điểm có khoảng cách gần như nhau. Cosine ít bị ảnh hưởng hơn vì chỉ quan tâm góc.

**Ví dụ cụ thể minh họa**:

- Câu A (ngắn): $(0.1, 0.2)$ (norm $\\approx 0.224$)
- Câu B (dài, cùng nghĩa): $(0.5, 1.0)$ (norm $\\approx 1.118$)

Quan sát: A và B **cùng hướng** ($B = 5 \\cdot A$).

- **Euclidean**: $\\sqrt{(0.5-0.1)^2 + (1.0-0.2)^2} = \\sqrt{0.16 + 0.64} = \\sqrt{0.8} \\approx 0.894$. → "Khác nhau", sai.
- **Cosine**: $\\mathbf{u} \\cdot \\mathbf{v} = 0.05 + 0.2 = 0.25$. $\\operatorname{cos\\_sim} = 0.25/(0.224 \\cdot 1.118) = 0.25/0.25 = 1.0$. → "Hoàn toàn giống nghĩa", đúng.

> **⚠ Ngoại lệ**: Nếu embedding đã được **L2-normalize** (toàn bộ có $\\lVert v \\rVert = 1$), thì cosine sim và Euclidean distance **tương đương** thông qua công thức:
>
> $$\\lVert u - v \\rVert^2 = \\lVert u \\rVert^2 + \\lVert v \\rVert^2 - 2\\,\\mathbf{u} \\cdot \\mathbf{v} = 2 - 2 \\cdot \\operatorname{cos\\_sim}(\\mathbf{u}, \\mathbf{v})$$
>
> Nên rank theo cos sim giảm dần = rank theo Euclidean tăng dần. **Đây là lý do hầu hết embedding API auto-normalize đầu ra** — để vector DB có thể dùng inner product hoặc Euclidean tùy chọn.

### 7.6 Ví dụ pipeline RAG bằng tay

Giả sử corpus 4 chunk, đã embed sang 4D, đã normalize:

\`\`\`
chunk_1: "Sản phẩm A chống nước IP68" → (0.6, 0.7, 0.3, 0.2)
chunk_2: "Sản phẩm A bảo hành 2 năm"  → (0.5, 0.4, 0.7, 0.3)
chunk_3: "Cách lắp đặt ngoài trời"     → (0.7, 0.6, 0.2, 0.3)
chunk_4: "Sản phẩm B màu xanh"          → (0.1, 0.2, 0.3, 0.9)
\`\`\`

Query: "Sản phẩm A có cài đặt ngoài trời được không?" → embed → $\\mathbf{q} = (0.65, 0.65, 0.3, 0.2)$. ($\\lVert q \\rVert \\approx \\sqrt{0.4225+0.4225+0.09+0.04} \\approx \\sqrt{0.975} \\approx 0.987$.)

Tính cos sim với từng chunk (đã làm tròn):

- $\\mathbf{q} \\cdot \\mathbf{c_1} = 0.65 \\cdot 0.6 + 0.65 \\cdot 0.7 + 0.3 \\cdot 0.3 + 0.2 \\cdot 0.2 = 0.39 + 0.455 + 0.09 + 0.04 = 0.975$.
  $\\lVert c_1 \\rVert = \\sqrt{0.36+0.49+0.09+0.04} = \\sqrt{0.98} \\approx 0.99$.
  $\\operatorname{cos\\_sim} \\approx 0.975 / (0.987 \\cdot 0.99) \\approx 0.998$.
- $\\mathbf{q} \\cdot \\mathbf{c_2} = 0.65 \\cdot 0.5 + 0.65 \\cdot 0.4 + 0.3 \\cdot 0.7 + 0.2 \\cdot 0.3 = 0.325 + 0.26 + 0.21 + 0.06 = 0.855$.
  $\\lVert c_2 \\rVert = \\sqrt{0.25+0.16+0.49+0.09} = \\sqrt{0.99} \\approx 0.995$.
  $\\operatorname{cos\\_sim} \\approx 0.855 / (0.987 \\cdot 0.995) \\approx 0.871$.
- $\\mathbf{q} \\cdot \\mathbf{c_3} = 0.65 \\cdot 0.7 + 0.65 \\cdot 0.6 + 0.3 \\cdot 0.2 + 0.2 \\cdot 0.3 = 0.455 + 0.39 + 0.06 + 0.06 = 0.965$.
  $\\lVert c_3 \\rVert = \\sqrt{0.49+0.36+0.04+0.09} = \\sqrt{0.98} \\approx 0.99$.
  $\\operatorname{cos\\_sim} \\approx 0.965 / (0.987 \\cdot 0.99) \\approx 0.987$.
- $\\mathbf{q} \\cdot \\mathbf{c_4} = 0.65 \\cdot 0.1 + 0.65 \\cdot 0.2 + 0.3 \\cdot 0.3 + 0.2 \\cdot 0.9 = 0.065 + 0.13 + 0.09 + 0.18 = 0.465$.
  $\\lVert c_4 \\rVert = \\sqrt{0.01+0.04+0.09+0.81} = \\sqrt{0.95} \\approx 0.975$.
  $\\operatorname{cos\\_sim} \\approx 0.465 / (0.987 \\cdot 0.975) \\approx 0.483$.

**Top-2 retrieved**: chunk_1 (0.998), chunk_3 (0.987).

Prompt cuối cùng cho LLM:
\`\`\`
Dựa vào các thông tin sau:
- Sản phẩm A chống nước IP68
- Cách lắp đặt ngoài trời
Trả lời câu hỏi: Sản phẩm A có cài đặt ngoài trời được không?
\`\`\`

LLM trả lời: "Có. Sản phẩm A chống nước theo chuẩn IP68 và tài liệu có hướng dẫn lắp đặt ngoài trời." ← **Câu trả lời này đến từ cosine similarity**.

> **📝 Tóm tắt mục 7**:
> - Embedding = vector đại diện nghĩa của text/image/...
> - Cosine sim đo "giống nghĩa" qua "cùng hướng".
> - Vector DB + ANN index → tìm top-K nhanh.
> - RAG = embed query → retrieve top-K → đưa cho LLM → trả lời.
> - Cosine ưu việt hơn Euclidean vì embedding mã hóa nghĩa qua HƯỚNG.

---

## 8. Liên hệ Transformer — Attention là scaled dot product

Đây là teaser ngắn cho Tầng 6 — AI/ML.

### 8.1 Công thức attention

Trong Transformer (mô hình nền của GPT, Claude, BERT...), cơ chế **Scaled Dot-Product Attention** (Vaswani et al. 2017) là:

$$\\operatorname{Attention}(Q, K, V) = \\operatorname{softmax}\\!\\left(\\frac{Q \\cdot K^\\top}{\\sqrt{d}}\\right) \\cdot V$$

Trong đó:
- $Q$ (query): vector "câu hỏi" tại vị trí hiện tại (kích thước d).
- $K$ (key): các vector "khóa" của những vị trí khác (mỗi vector kích thước d).
- $V$ (value): các vector "nội dung" tương ứng.
- $d$: số chiều của Q, K (thường 64 hoặc 128 cho mỗi head).

**Cốt lõi**: $Q \\cdot K$ chính là **dot product** giữa query và mỗi key. Score cao = "key này liên quan tới query này" → "chú ý nhiều".

### 8.2 Vì sao chia cho $\\sqrt{d}$?

Khi d lớn (thường 64+), dot product của hai vector ngẫu nhiên có **variance tỉ lệ với d**. Giá trị dot product trở nên rất lớn → softmax bão hòa (gradient gần 0) → mô hình khó học. Chia cho $\\sqrt{d}$ để bình thường hóa scale về $O(1)$.

**Verify**: Nếu mỗi tọa độ của Q và K iid với mean 0, var 1, thì $\\operatorname{Var}(Q \\cdot K) = \\sum_i \\operatorname{Var}(Q_i \\cdot K_i) = d$ (vì giả định độc lập). Chia cho $\\sqrt{d}$ → variance về 1.

### 8.3 Liên hệ với cosine similarity

Khi Q, K đã được L2-normalize, $Q \\cdot K = \\operatorname{cos\\_sim}(Q, K)$. Attention thực chất là "**cosine similarity giữa query và các key, sau đó dùng làm trọng số để trộn value**".

Đây là lý do hiểu dot product = bước đầu tiên hiểu Transformer. Tầng 6 sẽ học chi tiết.

> **📝 Tóm tắt mục 8**: Attention = softmax(scaled dot product). Hiểu dot product → hiểu attention.

---

## 9. Bài tập

> Tự làm trước khi xem lời giải. Mỗi bài có lời giải chi tiết ở mục 10.

### Bài 1 — Tính dot product

Tính $\\mathbf{u} \\cdot \\mathbf{v}$ cho các cặp sau:
1. $\\mathbf{u} = (5, -1, 2)$, $\\mathbf{v} = (3, 4, -2)$
2. $\\mathbf{u} = (1, 1, 1, 1)$, $\\mathbf{v} = (1, 2, 3, 4)$
3. $\\mathbf{u} = (-2, 3)$, $\\mathbf{v} = (6, 4)$

### Bài 2 — Cosine similarity

Tính $\\operatorname{cos\\_sim}(\\mathbf{u}, \\mathbf{v})$ cho:
1. $\\mathbf{u} = (1, 2, 2)$, $\\mathbf{v} = (3, 4, 0)$.
2. $\\mathbf{u} = (1, 1)$, $\\mathbf{v} = (-1, 1)$.

### Bài 3 — Vuông góc

Tìm tất cả vector $(a, b)$ vuông góc với $(3, 4)$ (chỉ ra mối quan hệ giữa a và b, đưa 2 ví dụ).

### Bài 4 — Projection

Tính $\\operatorname{proj}_v(u)$ với $\\mathbf{u} = (4, 5, 1)$, $\\mathbf{v} = (2, 0, -1)$. Verify rằng $\\mathbf{u} - \\operatorname{proj}_v(u)$ vuông góc với v.

### Bài 5 — Cosine sim embedding 4D

Cho 3 embedding (đã normalize):
- $\\text{apple} = (0.7, 0.5, 0.5, 0.1)$
- $\\text{banana} = (0.6, 0.6, 0.5, 0.1)$
- $\\text{cat} = (0.1, 0.2, 0.3, 0.92)$

Tính cos sim của (apple, banana), (apple, cat), (banana, cat). Sắp xếp theo độ giống nhau.

### Bài 6 — Suy ra góc từ cos sim

Cho $\\mathbf{u} = (3, 4)$, $\\mathbf{v} = (0, 5)$. Tính $\\operatorname{cos\\_sim}(\\mathbf{u}, \\mathbf{v})$ rồi suy ra góc $\\theta$ giữa chúng (làm tròn 1 chữ số thập phân).

---

## 10. Lời giải chi tiết

### Lời giải bài 1

1. $\\mathbf{u} \\cdot \\mathbf{v} = 5 \\cdot 3 + (-1) \\cdot 4 + 2 \\cdot (-2) = 15 - 4 - 4 = 7$.
2. $\\mathbf{u} \\cdot \\mathbf{v} = 1 + 2 + 3 + 4 = 10$.
3. $\\mathbf{u} \\cdot \\mathbf{v} = (-2) \\cdot 6 + 3 \\cdot 4 = -12 + 12 = 0$. (Vuông góc.)

### Lời giải bài 2

**Phần 1**:
- $\\mathbf{u} \\cdot \\mathbf{v} = 1 \\cdot 3 + 2 \\cdot 4 + 2 \\cdot 0 = 3 + 8 = 11$.
- $\\lVert u \\rVert = \\sqrt{1+4+4} = 3$. $\\lVert v \\rVert = \\sqrt{9+16+0} = 5$.
- $\\operatorname{cos\\_sim} = 11/(3 \\cdot 5) = 11/15 \\approx 0.733$. → Khá giống hướng (góc $\\approx 42.83°$).

**Phần 2**:
- $\\mathbf{u} \\cdot \\mathbf{v} = -1 + 1 = 0$. → Vuông góc.
- $\\operatorname{cos\\_sim} = 0$. (Không cần tính norm vì tử số đã 0.)

### Lời giải bài 3

Điều kiện vuông góc: $(a, b) \\cdot (3, 4) = 0 \\to 3a + 4b = 0 \\to a = -4b/3$.

Vậy mọi vector dạng $(-4t, 3t)$ với $t \\in \\mathbb{R}$ đều vuông góc với $(3, 4)$.

Ví dụ: $t = 1 \\to (-4, 3)$; $t = -1 \\to (4, -3)$; $t = 3 \\to (-12, 9)$.

Kiểm tra $t=1$: $(-4) \\cdot 3 + 3 \\cdot 4 = -12 + 12 = 0$. ✓

### Lời giải bài 4

- $\\mathbf{u} \\cdot \\mathbf{v} = 4 \\cdot 2 + 5 \\cdot 0 + 1 \\cdot (-1) = 8 - 1 = 7$.
- $\\mathbf{v} \\cdot \\mathbf{v} = 4 + 0 + 1 = 5$.
- $\\alpha = 7/5 = 1.4$.
- $\\operatorname{proj}_v(u) = 1.4 \\cdot (2, 0, -1) = (2.8, 0, -1.4)$.

Verify vuông góc:
- $\\mathbf{u} - \\operatorname{proj}_v(u) = (4-2.8, 5-0, 1-(-1.4)) = (1.2, 5, 2.4)$.
- $(1.2, 5, 2.4) \\cdot (2, 0, -1) = 2.4 + 0 - 2.4 = 0$. ✓

### Lời giải bài 5

**apple vs banana**:
- $\\mathbf{u} \\cdot \\mathbf{v} = 0.7 \\cdot 0.6 + 0.5 \\cdot 0.6 + 0.5 \\cdot 0.5 + 0.1 \\cdot 0.1 = 0.42 + 0.30 + 0.25 + 0.01 = 0.98$.
- $\\lVert \\text{apple} \\rVert = \\sqrt{0.49+0.25+0.25+0.01} = \\sqrt{1.00} = 1.0$. $\\lVert \\text{banana} \\rVert = \\sqrt{0.36+0.36+0.25+0.01} = \\sqrt{0.98} \\approx 0.99$.
- $\\operatorname{cos\\_sim} \\approx 0.98 / (1.0 \\cdot 0.99) \\approx 0.990$. → **Rất giống** (cả 2 đều là trái cây).

**apple vs cat**:
- $\\mathbf{u} \\cdot \\mathbf{v} = 0.7 \\cdot 0.1 + 0.5 \\cdot 0.2 + 0.5 \\cdot 0.3 + 0.1 \\cdot 0.92 = 0.07 + 0.10 + 0.15 + 0.092 = 0.412$.
- $\\lVert \\text{cat} \\rVert = \\sqrt{0.01+0.04+0.09+0.8464} = \\sqrt{0.9864} \\approx 0.993$.
- $\\operatorname{cos\\_sim} \\approx 0.412 / (1.0 \\cdot 0.993) \\approx 0.415$. → Yếu (không cùng category).

**banana vs cat**:
- $\\mathbf{u} \\cdot \\mathbf{v} = 0.6 \\cdot 0.1 + 0.6 \\cdot 0.2 + 0.5 \\cdot 0.3 + 0.1 \\cdot 0.92 = 0.06 + 0.12 + 0.15 + 0.092 = 0.422$.
- $\\operatorname{cos\\_sim} \\approx 0.422 / (0.99 \\cdot 0.993) \\approx 0.429$. → Yếu.

**Xếp hạng theo cos sim giảm dần**:
1. apple-banana (0.990) — cùng category trái cây.
2. banana-cat (0.429).
3. apple-cat (0.415).

(Banana và cat sit hơi gần nhau so với apple-cat — toy data, không có ý nghĩa thực.)

### Lời giải bài 6

- $\\mathbf{u} \\cdot \\mathbf{v} = 3 \\cdot 0 + 4 \\cdot 5 = 20$.
- $\\lVert u \\rVert = 5$, $\\lVert v \\rVert = 5$. $\\operatorname{cos\\_sim} = 20/25 = 0.8$.
- $\\theta = \\arccos(0.8) \\approx 36.87°$ (làm tròn 36.9°).

Kiểm tra ngược: u nằm ở góc $\\arctan(4/3) \\approx 53.13°$ so với Ox. v nằm ở 90°. Hiệu $= 90° - 53.13° = 36.87°$. ✓

---

## 11. Liên kết và bài tiếp theo

**Bài tiếp**: [Lesson 03 — Norm và khoảng cách](../lesson-03-norm-distance/) — chính thức hoá $\\lVert v \\rVert$, các loại norm (L1, L2, L∞), khoảng cách giữa hai vector, và **chuẩn hóa** (normalize) để chuẩn bị cho cosine sim hiệu quả.

**Sẽ gặp lại** ở các tầng sau:
- **Tầng 4 Lesson 04** — Linear independence: dùng dot product để chứng minh orthogonal basis độc lập tuyến tính.
- **Tầng 4 Lesson 05** — Ma trận: $(A\\mathbf{x}) \\cdot \\mathbf{y} = \\mathbf{x} \\cdot (A^\\top \\mathbf{y})$ — transpose qua dot product.
- **Tầng 4 Lesson 07** — Eigenvector: ma trận đối xứng có eigenvector orthogonal.
- **Tầng 5** — Probability: covariance là dot product của hai biến đã trừ trung bình, hệ số Pearson là cosine sim.
- **Tầng 6** — AI/ML: cosine sim trong embedding search, scaled dot product attention, contrastive learning loss.

**Reference Tầng 2**:
- [Lesson 05 — Cosine law](../../02-Trigonometry/lesson-05-identities-cosine-law/): cơ sở chứng minh hai định nghĩa dot product.
- [Lesson 03 — Đường tròn đơn vị](../../02-Trigonometry/lesson-03-unit-circle/): $\\cos\\theta \\in [-1, 1]$.

**File đi kèm**:
- [\`visualization.html\`](./visualization.html) — 4 component tương tác: dot product playground, cosine similarity, projection, embedding heatmap.
`;
