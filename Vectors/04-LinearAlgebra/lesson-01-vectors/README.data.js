// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: Vectors/04-LinearAlgebra/lesson-01-vectors/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 01 — Vector chính thức

> "Tới đây chúng ta đã có **số** (Tầng 1), **góc và rotation** (Tầng 2), **đạo hàm và gradient** (Tầng 3). Tất cả đều ngầm dùng tới một đối tượng: **vector** — bộ số có thứ tự. Tầng này nâng vector từ 'một mảng số tiện dụng' lên **công dân hạng nhất** của toán học: định nghĩa rõ, có hai góc nhìn (hình học và đại số), có phép cộng, có scaling, có 8 tiên đề. Sau bài này, bạn sẽ không bao giờ nhìn \`[3, 4]\` chỉ như 'hai số' nữa — đó là **một điểm trong ℝ², một mũi tên có hướng, và là feature vector của một sample dữ liệu** — cùng một lúc."

---

## 1. Mục tiêu học tập

Sau bài này, bạn sẽ:

- Phát biểu được vector là gì theo **hai góc nhìn**: hình học (mũi tên có độ dài + hướng) và đại số (tuple số có thứ tự).
- Hiểu **không gian ℝⁿ** — tập tất cả vector n-thành phần thực — và vì sao ℝ¹ = trục số, ℝ² = mặt phẳng, ℝ³ = không gian thường, ℝⁿ (n lớn) vẫn dùng được dù không vẽ ra được.
- Thực hiện thành thạo **phép cộng vector**, **scalar multiplication**, **phép trừ** trên các vector 2D, 3D, nD bằng cả công thức đại số lẫn dựng hình.
- Thuộc và áp dụng **8 tiên đề của không gian vector** (giao hoán, kết hợp, vector 0, vector đối, scalar phân phối...).
- Định nghĩa được **vector 0**, **vector đối** \`-v\`, và biết tại sao chúng tồn tại duy nhất.
- Hiểu **linear combination** (tổ hợp tuyến tính) \`c₁v₁ + c₂v₂ + ... + cₖvₖ\` — viên gạch dẫn tới span/basis/dimension ở Lesson 04.
- Code được vector trong Go (\`[]float64\`) và biết cách thư viện thật (NumPy) tổ chức \`ndim\`, \`shape\`, \`dtype\`.
- Liên hệ trực tiếp tới ML/AI: **feature vector**, **embedding**, **gradient** đều là vector — Tầng 6 sẽ dùng dày đặc.

### 1.1. Kiến thức tiền đề

- [Algebra Lesson 05 — Functions](../../01-Algebra/lesson-05-functions/) — hàm số \`f: A → B\`, tập xác định, tập giá trị. Phép toán trên vector cũng là một loại hàm: \`+: ℝⁿ × ℝⁿ → ℝⁿ\`.
- [Trigonometry Lesson 06 — Rotation matrix](../../02-Trigonometry/lesson-06-rotation-matrix/) — đã thấy "ma trận tác động lên vector 2D" để xoay. Bài này định nghĩa lại vector chính thức để Lesson 05-06 phía sau định nghĩa ma trận đúng nghĩa.
- [Calculus Lesson 06 — Gradient](../../03-Calculus/lesson-06-partial-gradient/) — gradient \`∇f\` đã được dùng như một "vector gồm các đạo hàm riêng". Bài này làm rõ nó là vector trong ℝⁿ.
- (Hữu ích) [Trigonometry Lesson 02 — sin/cos](../../02-Trigonometry/lesson-02-sin-cos-tan/) — sẽ cần khi nói tới góc giữa hai vector (Lesson 02 LinearAlgebra).

### 1.2. Bài này KHÔNG đề cập

- **Dot product** và **góc giữa hai vector** — dành cho [Lesson 02](../lesson-02-dot-product/).
- **Norm (độ dài)** — chỉ nói trực giác "vector có độ dài", công thức \`‖v‖ = √(v₁² + ... + vₙ²)\` dành cho [Lesson 03](../lesson-03-norm-distance/).
- **Linear independence, basis, dimension** — dành cho [Lesson 04](../lesson-04-linear-independence/). Bài này chỉ giới thiệu khái niệm **linear combination** vì nó là nền cho 3 khái niệm kia.
- **Ma trận** — dành cho [Lesson 05](../lesson-05-matrices/) trở đi.

---

## 2. Hai góc nhìn về vector

> **💡 Trực giác:** Có hai cách nhìn vào CÙNG một đối tượng tên là "vector". Hình học cho ta **trực giác** (mũi tên, hướng, độ dài). Đại số cho ta **khả năng tính toán** (cộng từng thành phần). Hai cách nhìn này không mâu thuẫn — chúng là hai mặt của cùng một đồng xu. Hiểu được chuyển qua chuyển lại giữa hai góc nhìn = hiểu được linear algebra.

### 2.1. Góc nhìn hình học — vector là mũi tên

**Định nghĩa hình học (không hình thức):** Một **vector** là một **mũi tên có hướng và độ dài** trong không gian. Mũi tên có:

- **Điểm đầu (tail)** — gốc của mũi tên.
- **Điểm cuối (head)** — đầu nhọn của mũi tên.
- **Hướng (direction)** — phương mà mũi tên chỉ.
- **Độ lớn (magnitude / length)** — chiều dài của mũi tên.

**Quy ước quan trọng:** trong linear algebra, ta luôn **đặt điểm đầu của vector tại gốc tọa độ O = (0, 0, ..., 0)**. Khi đó mũi tên được xác định hoàn toàn bởi **điểm cuối**.

\`\`\`
        y
        ↑
       3│      ●  ← điểm cuối (3, 2)
       2│     ╱
       1│   ╱
        │ ╱  ← vector v
   ─────O──┼──┼──┼──┼──► x
        │  1  2  3  4
\`\`\`

Vector \`v = (3, 2)\` trong ℝ² là mũi tên từ \`O = (0, 0)\` tới điểm \`(3, 2)\`.

> **❓ Câu hỏi tự nhiên:** "Thế còn mũi tên KHÔNG xuất phát từ gốc thì sao? Ví dụ mũi tên từ A = (1, 1) tới B = (4, 3)?"
>
> Trả lời: Trong **vật lý**, người ta hay coi đó là "vector tự do" — vector chỉ phụ thuộc vào hướng và độ dài, không phụ thuộc nơi đặt. Trong **linear algebra**, ta quy ước MỌI vector đều đặt tail ở O. Mũi tên từ A = (1, 1) tới B = (4, 3) khi đó được biểu diễn bởi vector \`B - A = (4-1, 3-1) = (3, 2)\` — chính là mũi tên \`v = (3, 2)\` đặt ở gốc. Hai mũi tên có cùng hướng và cùng độ dài được **đồng nhất** với nhau.

### 2.2. Góc nhìn đại số — vector là tuple số có thứ tự

**Định nghĩa đại số (hình thức):** Một **vector n chiều** là một **tuple có thứ tự gồm n số thực**:

\`\`\`
v = (v₁, v₂, v₃, ..., vₙ)    với vᵢ ∈ ℝ
\`\`\`

Các số \`v₁, v₂, ..., vₙ\` được gọi là **các thành phần (components)** hoặc **các tọa độ (coordinates)** của vector.

**Hai cách viết phổ biến:**

- **Dạng hàng (row form):** \`v = (3, 2)\` hoặc \`v = [3, 2]\` hoặc \`v = ⟨3, 2⟩\`.
- **Dạng cột (column form):** \`v = [3; 2]\` (kiểu MATLAB) hoặc viết dọc:
  \`\`\`
       ⎡ 3 ⎤
   v = ⎢   ⎥
       ⎣ 2 ⎦
  \`\`\`

> **⚠ Lưu ý:** Trong linear algebra **trang trọng**, vector mặc định viết **dạng cột**. Lý do: khi nhân ma trận \`A\` với vector \`v\` (Lesson 05), công thức \`Av\` đòi hỏi \`v\` là cột. Trong text inline, để cho gọn ta vẫn viết \`v = (v₁, ..., vₙ)\` — phải hiểu ngầm đó là cột.

**"Có thứ tự" nghĩa là gì?** Nghĩa là \`(3, 2) ≠ (2, 3)\`. Đảo thứ tự được vector khác.

\`\`\`
v = (3, 2)  ≠  u = (2, 3)
\`\`\`

Trong ℝ², \`(3, 2)\` chỉ về điểm khác \`(2, 3)\`:

\`\`\`
        y
       3│   ●(2,3)
       2│        ●(3,2)
       1│
   ─────O──┼──┼──┼──► x
           1  2  3
\`\`\`

> **💡 Trực giác:** Vector = "địa chỉ" của một điểm trong không gian. Đổi thứ tự số nhà và tên đường = ra địa chỉ khác.

### 2.3. Hai góc nhìn vào cùng một đối tượng

| | Hình học | Đại số |
|---|---|---|
| Vector là gì? | Mũi tên có hướng + độ lớn | Tuple \`(v₁, ..., vₙ)\` |
| Khi nào dùng? | Vẽ hình, trực giác | Tính toán, code |
| Tốt cho | Hiểu định lý, hình dung | Số liệu cụ thể, máy tính |
| Hạn chế | Chỉ vẽ được n ≤ 3 | Khó hình dung |

**Hai góc nhìn này TƯƠNG ĐƯƠNG hoàn toàn** trong linear algebra. Ta dùng cái nào tiện hơn cho ngữ cảnh.

#### Ví dụ chuyển đổi qua lại

- **Đại số → Hình học:** \`v = (4, 3)\` → vẽ mũi tên từ \`O\` đến \`(4, 3)\`.
- **Hình học → Đại số:** Mũi tên từ \`O\` đến điểm \`(4, 3)\` → ghi vector \`(4, 3)\`.
- **Đại số → Hình học (3D):** \`w = (1, 2, 2)\` → mũi tên từ \`O\` đến điểm \`(1, 2, 2)\` trong không gian 3D.
- **Hình học → Đại số (3D):** Mũi tên từ \`O\` đến \`(1, 2, 2)\` → ghi \`w = (1, 2, 2)\`.

> **❓ Câu hỏi tự nhiên:** "Nếu chỉ vẽ được tới 3D, vector trong ℝ¹⁰⁰⁰ thì hình học là gì?"
>
> Trả lời: Khi \`n > 3\`, **hình học vẫn còn**, nhưng ta không nhìn trực tiếp được — chỉ **suy luận tương tự**. "Mũi tên trong ℝ¹⁰⁰⁰" không vẽ ra được, nhưng các định nghĩa hình học (độ dài, góc, hướng) vẫn áp dụng được nhờ công thức đại số. Cách thực dụng: HÌNH DUNG bằng 2D-3D (lấy trực giác), TÍNH bằng công thức đại số (đúng cho mọi n). Đây là **siêu năng lực** của linear algebra: đưa trực giác hình học lên chiều cao mà não không hình dung nổi.

### 2.4. Ví dụ — 4 vector ở 4 chiều khác nhau

| Vector | Chiều | Hình học | Đại số |
|---|---|---|---|
| \`v = (5)\` | ℝ¹ | Điểm trên trục số ở vị trí 5 | Số thực 5 |
| \`v = (3, 2)\` | ℝ² | Mũi tên O → (3, 2) trong mặt phẳng | Tuple 2 số |
| \`v = (1, 2, 2)\` | ℝ³ | Mũi tên O → (1, 2, 2) trong không gian | Tuple 3 số |
| \`v = (0.1, -0.3, 0.5, 0.2, ..., 0.7)\` | ℝ⁷⁶⁸ | Mũi tên trong không gian 768 chiều (không vẽ được) | Tuple 768 số — embedding của một câu trong BERT |

> **📝 Tóm tắt mục 2:**
> - Vector có **hai góc nhìn**: hình học (mũi tên) và đại số (tuple).
> - Quy ước: tail của vector luôn ở gốc O.
> - "Có thứ tự": \`(3, 2) ≠ (2, 3)\`.
> - Hai góc nhìn TƯƠNG ĐƯƠNG — chọn cái nào tiện hơn cho bài toán.
> - Khi \`n > 3\` ta hình dung bằng 2D/3D nhưng tính bằng công thức.

---

## 3. Không gian ℝⁿ

### 3.1. Định nghĩa

**Không gian ℝⁿ** là **tập tất cả các vector n thành phần thực**:

\`\`\`
ℝⁿ = { (x₁, x₂, ..., xₙ)  |  xᵢ ∈ ℝ với mọi i = 1, 2, ..., n }
\`\`\`

Đọc: "R mũ n bằng tập các bộ n số thực có thứ tự".

> **💡 Trực giác:** Hãy nghĩ ℝⁿ như một "bãi đỗ xe vô hạn" — mỗi điểm trong bãi là một vector. Bãi 1D = trục số. Bãi 2D = mặt sàn. Bãi 3D = cả tòa nhà. Bãi nD = bãi đỗ xe nhiều tầng nhiều chiều, không hình dung trực quan nhưng vẫn có "địa chỉ" rõ ràng cho mỗi vị trí.

### 3.2. Các trường hợp đặc biệt

| Ký hiệu | Tên gọi | Hình ảnh |
|---|---|---|
| **ℝ¹** | Trục số thực | Đường thẳng dài vô tận |
| **ℝ²** | Mặt phẳng tọa độ | Tờ giấy vô hạn |
| **ℝ³** | Không gian 3 chiều | Phòng không có tường |
| **ℝ⁴** | Không gian 4 chiều | Không hình dung, dùng trong relativity (3 chiều không gian + 1 thời gian) |
| **ℝ¹⁰** | Không gian 10 chiều | Một MNIST sample bị thu nhỏ (PCA 10 chiều) |
| **ℝ⁷⁸⁴** | Không gian 784 chiều | Một ảnh MNIST \`28×28\` flatten ra |
| **ℝ⁷⁶⁸** | Không gian 768 chiều | Embedding của BERT base |
| **ℝ¹⁵³⁶** | Không gian 1536 chiều | Embedding của OpenAI \`text-embedding-3-small\` |

### 3.3. Ví dụ — 4 vector thuộc các ℝⁿ khác nhau

- \`(7) ∈ ℝ¹\` — điểm trên trục số ở vị trí 7.
- \`(-2, 5) ∈ ℝ²\` — điểm trên mặt phẳng ở góc phần tư trái-trên.
- \`(0, 0, 0) ∈ ℝ³\` — gốc tọa độ 3D.
- \`(0.5, -0.5, 0.5, -0.5) ∈ ℝ⁴\` — vector trong ℝ⁴ với độ dài 1 (theo norm L2 — Lesson 03).

### 3.4. Quy tắc đếm chiều — kích thước của vector

**Chiều của vector** = **số thành phần** của nó:

- \`v = (3)\` có 1 thành phần → \`v ∈ ℝ¹\`.
- \`v = (3, 4)\` có 2 thành phần → \`v ∈ ℝ²\`.
- \`v = (3, 4, 5)\` có 3 thành phần → \`v ∈ ℝ³\`.
- \`v = (3, 4, 5, 6, 7)\` có 5 thành phần → \`v ∈ ℝ⁵\`.

> **⚠ Lỗi thường gặp:** Nhầm **giá trị** của thành phần với **chiều**. Vector \`(1000, 0.001)\` vẫn là vector 2 chiều (vì có 2 thành phần), không phải vector "lớn" hay "nhỏ". Giá trị từng thành phần thì có thể bất kỳ; chiều thì luôn là số đếm thành phần.

> **🔁 Tự kiểm tra:**
> 1. Vector \`v = (1, 2, 3, 4)\` thuộc ℝⁿ với n bằng bao nhiêu?
> 2. Có bao nhiêu thành phần trong vector \`(0, 0)\` và nó thuộc ℝ?
> 3. Vector \`(7, 7, 7, 7, 7, 7, 7)\` thuộc ℝ?
>
> <details><summary>Đáp án</summary>
>
> 1. \`n = 4\` vì có 4 thành phần.
> 2. 2 thành phần → \`ℝ²\`. (Đây là **vector 0** trong ℝ² — mục 7 sẽ nói.)
> 3. 7 thành phần → \`ℝ⁷\`. (Tất cả thành phần bằng 7 không đổi chiều của vector.)
> </details>

> **📝 Tóm tắt mục 3:**
> - \`ℝⁿ\` = tập mọi vector có \`n\` thành phần thực.
> - \`n\` = chiều của vector = số thành phần (KHÔNG phải giá trị thành phần).
> - ML thực tế: embedding hay nằm trong \`ℝ³⁸⁴\`, \`ℝ⁷⁶⁸\`, \`ℝ¹⁵³⁶\`...

---

## 4. Phép cộng vector

### 4.1. Định nghĩa đại số

Cho hai vector \`u, v ∈ ℝⁿ\` cùng chiều:

\`\`\`
u = (u₁, u₂, ..., uₙ)
v = (v₁, v₂, ..., vₙ)
\`\`\`

**Tổng \`u + v\`** là vector cũng thuộc \`ℝⁿ\`, tính bằng **cộng từng thành phần (component-wise / element-wise)**:

\`\`\`
u + v = (u₁ + v₁,  u₂ + v₂,  ...,  uₙ + vₙ)
\`\`\`

> **⚠ Quan trọng:** Chỉ cộng được vector **cùng chiều**. \`(1, 2) + (1, 2, 3)\` KHÔNG có nghĩa — không đồng nhất chiều.

### 4.2. Định nghĩa hình học — quy tắc tam giác

**Quy tắc tam giác (head-to-tail):**

1. Vẽ vector \`u\` từ gốc \`O\`.
2. Vẽ vector \`v\` bắt đầu từ **đầu** (head) của \`u\`.
3. Vector \`u + v\` là mũi tên từ **gốc** của \`u\` đến **đầu** của \`v\`.

\`\`\`
                ●(7, 5)
              ╱│        ← v đặt tại đầu u
            ╱  │
          ╱    │ (v = (4, 3))
        ●(3, 2)
       ╱│       ← u
     ╱  │ (u = (3, 2))
   ╱    │
  O─────┴──────► x
\`\`\`

**Quy tắc hình bình hành (parallelogram):** Vẽ \`u\` và \`v\` đều từ \`O\`. Dựng hình bình hành có \`u, v\` là hai cạnh kề. Đường chéo từ \`O\` chính là \`u + v\`.

### 4.3. Tại sao hai cách định nghĩa đều ra cùng một vector?

Vì cộng tọa độ theo từng thành phần chính xác là **dịch chuyển** điểm cuối của \`u\` thêm một đoạn \`v\`. Nếu \`u\` kết thúc ở \`(u₁, u₂)\` và ta dịch thêm \`(v₁, v₂)\`, ta tới \`(u₁+v₁, u₂+v₂)\` — chính là công thức đại số.

> **💡 Trực giác:** "Đi từ A theo hướng \`u\`, rồi từ điểm vừa tới đi tiếp theo hướng \`v\` — kết quả là đi thẳng từ A theo hướng \`u + v\`". Giống như đi bộ: 3 bước Đông + 4 bước Bắc = đi xéo "Đông-Bắc" với khoảng cách 5.

### 4.4. Ví dụ tính toán (≥ 4 ví dụ với 2D và 3D)

**Ví dụ 1 (2D, dương):** \`u = (3, 2)\`, \`v = (4, 3)\`. Tính \`u + v\`.

\`\`\`
u + v = (3 + 4,  2 + 3) = (7, 5)
\`\`\`

Verify hình học: từ O đi (3,2), rồi đi tiếp (4,3) → tới (7,5). ✓

**Ví dụ 2 (2D, có âm):** \`u = (5, 1)\`, \`v = (-2, 3)\`. Tính \`u + v\`.

\`\`\`
u + v = (5 + (-2),  1 + 3) = (3, 4)
\`\`\`

Verify: từ O đi (5,1), rồi đi tiếp (-2,3) — tức lùi 2 đơn vị theo x, tiến 3 đơn vị theo y → tới (3,4). ✓

**Ví dụ 3 (2D, phân số):** \`u = (0.5, -1.5)\`, \`v = (2.5, 0.5)\`.

\`\`\`
u + v = (0.5 + 2.5,  -1.5 + 0.5) = (3.0, -1.0)
\`\`\`

**Ví dụ 4 (3D):** \`u = (1, 2, 3)\`, \`v = (4, 5, 6)\`.

\`\`\`
u + v = (1+4,  2+5,  3+6) = (5, 7, 9)
\`\`\`

**Ví dụ 5 (3D, có âm):** \`u = (2, -1, 4)\`, \`v = (-3, 5, -4)\`.

\`\`\`
u + v = (2 + (-3),  -1 + 5,  4 + (-4)) = (-1, 4, 0)
\`\`\`

**Ví dụ 6 (5D — không vẽ được, nhưng tính được):** \`u = (1, 0, 1, 0, 1)\`, \`v = (0, 1, 0, 1, 0)\`.

\`\`\`
u + v = (1, 1, 1, 1, 1)
\`\`\`

> **❓ Câu hỏi tự nhiên:**
> - "Cộng vector có giao hoán không, tức \`u + v = v + u\`?"
>   Có — vì cộng số thực giao hoán theo từng thành phần. Sẽ chứng minh ở mục 6.
> - "Có thể cộng vector của hai chiều khác nhau không?"
>   Không. \`(1, 2) + (1, 2, 3)\` không định nghĩa được.
> - "Nếu cộng \`u + 0\` thì sao?"
>   Bằng \`u\` — vì 0 là vector trung hòa. Mục 7 sẽ định nghĩa vector 0.

> **🔁 Tự kiểm tra:** Tính \`(3, -2, 5) + (-1, 4, -5)\`.
> <details><summary>Đáp án</summary>
> \`(3 + (-1), -2 + 4, 5 + (-5)) = (2, 2, 0)\`.
> </details>

> **📝 Tóm tắt mục 4:**
> - Cộng vector = cộng từng thành phần.
> - Chỉ cộng được vector cùng chiều.
> - Hình học: quy tắc tam giác (head-to-tail) hoặc hình bình hành.

---

## 5. Scalar multiplication (nhân vector với một số)

### 5.1. Định nghĩa đại số

Cho **scalar** \`c ∈ ℝ\` (số thực) và vector \`v = (v₁, ..., vₙ) ∈ ℝⁿ\`. **Tích scalar** \`c·v\` là vector trong ℝⁿ:

\`\`\`
c·v = (c·v₁,  c·v₂,  ...,  c·vₙ)
\`\`\`

> **⚠ Thuật ngữ:** "**Scalar**" = một số thực đơn lẻ, để phân biệt với "vector" = bộ số. Từ "scalar" nghĩa gốc = "thuộc về thang đo (scale)" vì nó làm vector phóng/thu theo tỉ lệ.

### 5.2. Định nghĩa hình học

\`c·v\` là một vector **cùng phương** với \`v\` (cùng đường thẳng qua gốc), nhưng:

- Nếu \`c > 0\`: cùng hướng với \`v\`.
- Nếu \`c < 0\`: ngược hướng với \`v\` (đảo đầu mũi tên).
- Nếu \`c = 0\`: trở thành vector 0 (mũi tên thu về 1 điểm).
- Nếu \`|c| > 1\`: phóng to vector (dài hơn).
- Nếu \`0 < |c| < 1\`: thu nhỏ vector (ngắn hơn).
- Nếu \`|c| = 1\` và \`c = 1\`: giữ nguyên \`v\`. Nếu \`c = -1\`: đảo ngược thành \`-v\`.

\`\`\`
       2v ●
         ╱
        ╱
        v●          ← v
       ╱
      ╱
     O●─────────► x
      ╲
       ╲
       -v●          ← -v: cùng phương, ngược hướng
         ╲
       -2v●
\`\`\`

> **💡 Trực giác:** Scalar multiplication = "kéo căng" hoặc "rút ngắn" mũi tên, có thể kèm "lật ngược".

### 5.3. Ví dụ tính toán (≥ 4 ví dụ)

**Ví dụ 1 (phóng to):** \`c = 2\`, \`v = (3, 2)\`. Tính \`c·v\`.

\`\`\`
2·v = (2·3,  2·2) = (6, 4)
\`\`\`

Hình học: mũi tên dài gấp đôi \`v\`, cùng hướng.

**Ví dụ 2 (thu nhỏ):** \`c = 0.5\`, \`v = (4, 6)\`.

\`\`\`
0.5·v = (0.5·4,  0.5·6) = (2, 3)
\`\`\`

Hình học: mũi tên ngắn còn một nửa.

**Ví dụ 3 (đảo hướng):** \`c = -1\`, \`v = (3, -2)\`.

\`\`\`
(-1)·v = (-1·3,  -1·(-2)) = (-3, 2)
\`\`\`

Hình học: mũi tên cùng độ dài, ngược hướng.

**Ví dụ 4 (đảo + phóng):** \`c = -3\`, \`v = (1, 2)\`.

\`\`\`
(-3)·v = (-3·1,  -3·2) = (-3, -6)
\`\`\`

Hình học: mũi tên dài gấp 3, ngược hướng.

**Ví dụ 5 (số 0):** \`c = 0\`, \`v = (5, -7, 3)\`.

\`\`\`
0·v = (0, 0, 0)
\`\`\`

Mọi vector nhân với scalar 0 đều thành vector 0.

**Ví dụ 6 (3D):** \`c = 4\`, \`v = (1, -1, 2)\`.

\`\`\`
4·v = (4, -4, 8)
\`\`\`

### 5.4. Liên hệ với phép cộng

Có một quan sát đơn giản nhưng quan trọng:

\`\`\`
v + v = (v₁ + v₁, ..., vₙ + vₙ) = (2v₁, ..., 2vₙ) = 2·v
v + v + v = 3·v
\`\`\`

Tức **scalar multiplication với số nguyên dương = cộng nhiều lần**. Đây là nền tảng để mở rộng "cộng nhiều lần" thành "nhân số thực" (kể cả số phân số, âm) cho vector — y hệt cách mở rộng phép nhân số thực từ số nguyên.

> **❓ Câu hỏi tự nhiên:**
> - "Nhân hai vector với nhau có được không?"
>   Có nhiều cách "nhân" vector: **dot product** (Lesson 02) cho ra một số, **cross product** (3D, không học chính ở khóa này) cho ra một vector, **outer product** (Lesson 05) cho ra một ma trận. Component-wise multiplication \`(u₁v₁, u₂v₂, ...)\` được gọi là **Hadamard product** và **không phải** phép nhân vector chuẩn — chỉ dùng trong một số ngữ cảnh ML (vd nhân attention mask).
> - "Tại sao gọi là 'scalar' multiplication mà không phải 'number' multiplication?"
>   Vì trong các không gian vector tổng quát, "số" có thể là số phức, số nguyên modulo, v.v. — "scalar" là từ gọi chung cho phần tử của **trường (field)** mà không gian vector được định nghĩa trên đó. Bài này luôn dùng \`ℝ\` nên scalar = số thực.

> **🔁 Tự kiểm tra:** Tính \`(-2)·(3, -4, 0, 5)\`.
> <details><summary>Đáp án</summary>
> \`(-2·3, -2·(-4), -2·0, -2·5) = (-6, 8, 0, -10)\`.
> </details>

> **📝 Tóm tắt mục 5:**
> - \`c·v = (c·v₁, ..., c·vₙ)\` — nhân scalar vào TỪNG thành phần.
> - Hình học: phóng (\`|c|>1\`), thu (\`|c|<1\`), đảo (\`c<0\`).
> - \`c = 0\` → vector 0.

---

## 6. Tính chất — 8 tiên đề của không gian vector

Cho \`u, v, w ∈ ℝⁿ\` và \`c, d ∈ ℝ\`. Khi đó **8 tiên đề** sau đúng. Đây cũng chính là **định nghĩa hình thức của không gian vector**: bất kỳ tập hợp nào (cùng với phép \`+\` và phép \`·\`) thỏa cả 8 tiên đề này đều được gọi là **không gian vector**, và mọi định lý của linear algebra áp dụng cho nó.

### 6.1. Bốn tiên đề về phép cộng

**(A1) Giao hoán:** \`u + v = v + u\`.

Chứng minh: \`(u + v)ᵢ = uᵢ + vᵢ = vᵢ + uᵢ = (v + u)ᵢ\` với mọi \`i\` (giao hoán của cộng số thực).

**Ví dụ:** \`(3, 2) + (1, 4) = (4, 6) = (1, 4) + (3, 2)\`. ✓

**(A2) Kết hợp:** \`(u + v) + w = u + (v + w)\`.

Chứng minh: \`((u + v) + w)ᵢ = (uᵢ + vᵢ) + wᵢ = uᵢ + (vᵢ + wᵢ) = (u + (v + w))ᵢ\`.

**Ví dụ:** Với \`u = (1, 0)\`, \`v = (2, 1)\`, \`w = (0, 3)\`:
- \`(u + v) + w = (3, 1) + (0, 3) = (3, 4)\`.
- \`u + (v + w) = (1, 0) + (2, 4) = (3, 4)\`. ✓

**(A3) Có phần tử trung hòa (vector 0):** Tồn tại \`0 = (0, ..., 0) ∈ ℝⁿ\` sao cho \`u + 0 = u\` với mọi \`u\`.

**Ví dụ:** \`(5, -3) + (0, 0) = (5, -3)\`. ✓

**(A4) Có phần tử đối:** Với mọi \`u\`, tồn tại \`-u = (-u₁, ..., -uₙ)\` sao cho \`u + (-u) = 0\`.

**Ví dụ:** \`(7, -2) + (-7, 2) = (0, 0)\`. ✓

### 6.2. Bốn tiên đề về scalar multiplication

**(S1) Scalar 1 trung hòa:** \`1·u = u\`.

Chứng minh: \`(1·u)ᵢ = 1·uᵢ = uᵢ\`.

**Ví dụ:** \`1·(3, -4, 5) = (3, -4, 5)\`. ✓

**(S2) Kết hợp với scalar:** \`(c·d)·u = c·(d·u)\`.

Chứng minh: \`((cd)u)ᵢ = (cd)uᵢ = c(d·uᵢ) = c·(d·u)ᵢ\`.

**Ví dụ:** \`c = 2, d = 3, u = (1, 2)\`: \`(2·3)·(1,2) = 6·(1,2) = (6, 12)\`. Và \`2·(3·(1,2)) = 2·(3,6) = (6,12)\`. ✓

**(S3) Phân phối scalar trên cộng vector:** \`c·(u + v) = c·u + c·v\`.

Chứng minh: \`(c·(u+v))ᵢ = c(uᵢ + vᵢ) = cuᵢ + cvᵢ = (cu + cv)ᵢ\`.

**Ví dụ:** \`c = 2, u = (1, 3), v = (4, -1)\`: \`2·((1,3)+(4,-1)) = 2·(5,2) = (10, 4)\`. Và \`2·(1,3) + 2·(4,-1) = (2,6) + (8,-2) = (10, 4)\`. ✓

**(S4) Phân phối cộng scalar trên vector:** \`(c + d)·u = c·u + d·u\`.

Chứng minh: \`((c+d)u)ᵢ = (c+d)uᵢ = cuᵢ + duᵢ = (cu)ᵢ + (du)ᵢ\`.

**Ví dụ:** \`c = 2, d = 3, u = (1, -1)\`: \`(2+3)·(1,-1) = 5·(1,-1) = (5, -5)\`. Và \`2·(1,-1) + 3·(1,-1) = (2,-2)+(3,-3) = (5, -5)\`. ✓

### 6.3. Hệ quả từ 8 tiên đề

- **(H1) \`0·u = 0\` với mọi u.** CM: \`0·u = (0+0)·u = 0·u + 0·u\` (S4). Trừ \`0·u\` hai vế → \`0 = 0·u\`.
- **(H2) \`c·0 = 0\` với mọi c.** CM: \`c·0 = c·(0+0) = c·0 + c·0\` (S3). Trừ \`c·0\` hai vế.
- **(H3) \`(-1)·u = -u\`.** CM: \`u + (-1)·u = 1·u + (-1)·u = (1 + (-1))·u = 0·u = 0\` (theo A4, vector đối là duy nhất).
- **(H4) \`-(- u) = u\`** — đối của đối là chính nó.

> **⚠ Lỗi thường gặp:** Một số bạn nghĩ "đương nhiên các tiên đề đúng, sao phải liệt kê 8 cái cho phiền?". Lý do: ngoài ℝⁿ còn rất nhiều thứ khác cũng là không gian vector — vd tập đa thức, tập hàm liên tục \`C[0,1]\`, ma trận m×n, ... Mỗi khi gặp một cấu trúc mới, ta kiểm tra 8 tiên đề; nếu đủ thì mọi định lý ở Lesson 02-08 áp dụng được ngay (dot product, cosine sim, projection, eigenvector...). 8 tiên đề là **giấy thông hành** vào thế giới linear algebra.

> **📝 Tóm tắt mục 6:**
> - 4 tiên đề về \`+\`: giao hoán, kết hợp, có 0, có đối.
> - 4 tiên đề về \`·\`: 1 trung hòa, kết hợp scalar, 2 phân phối.
> - 8 tiên đề = định nghĩa **không gian vector** (vector space).
> - ℝⁿ thỏa cả 8 → là một không gian vector.

---

## 7. Vector zero và vector đối

### 7.1. Vector zero \`0\`

\`\`\`
0 = (0, 0, ..., 0) ∈ ℝⁿ
\`\`\`

> **⚠ Lưu ý ký hiệu:** Trong text, vector 0 đôi khi viết đậm \`**0**\` hoặc gạch chân \`0̲\` để phân biệt với scalar 0. Ở đây ngữ cảnh sẽ làm rõ — \`u + 0\` nghĩa là vector 0 (cùng chiều với \`u\`).

**Tính chất:** \`0\` là **duy nhất** — nếu có hai vector \`0\` và \`0'\` thỏa A3, thì \`0 = 0 + 0' = 0' + 0 = 0'\`.

**Hình học:** Vector 0 = "mũi tên có độ dài 0", thực chất là một điểm tại gốc. Không có hướng xác định.

**Ví dụ:**
- Trong ℝ²: \`0 = (0, 0)\`.
- Trong ℝ³: \`0 = (0, 0, 0)\`.
- Trong ℝ⁷⁶⁸: \`0 = (0, 0, ..., 0)\` — 768 số 0.

> **❓ Câu hỏi tự nhiên:** "Vector 0 có hướng không?"
>
> Trả lời: KHÔNG. Vector 0 là vector duy nhất không có hướng xác định. Đây là một trong những lý do nhiều định lý phải thêm điều kiện \`v ≠ 0\`. (Ví dụ: hướng của vector \`v/‖v‖\` chỉ định nghĩa khi \`v ≠ 0\`.)

### 7.2. Vector đối \`-v\`

Với \`v = (v₁, ..., vₙ)\`:

\`\`\`
-v = (-v₁,  -v₂,  ...,  -vₙ)
\`\`\`

**Tính chất:** \`v + (-v) = 0\`.

**Tính chất khác:** \`-v = (-1)·v\` (hệ quả H3 ở mục 6).

**Hình học:** \`-v\` là mũi tên **cùng độ dài, ngược hướng** với \`v\`.

**Ví dụ:**
- \`v = (3, -4)\` → \`-v = (-3, 4)\`.
- \`v = (1, 2, 3, 4, 5)\` → \`-v = (-1, -2, -3, -4, -5)\`.
- \`v = (0, 7, 0)\` → \`-v = (0, -7, 0)\`.
- \`v = 0 = (0, 0)\` → \`-v = (0, 0) = 0\` (vector 0 là đối của chính nó).

> **🔁 Tự kiểm tra:** Cho \`v = (5, -3, 0, 2)\`. Tính \`-v\` và \`v + (-v)\`.
> <details><summary>Đáp án</summary>
>
> - \`-v = (-5, 3, 0, -2)\`.
> - \`v + (-v) = (5 + (-5), -3 + 3, 0 + 0, 2 + (-2)) = (0, 0, 0, 0) = 0\`. ✓
> </details>

> **📝 Tóm tắt mục 7:**
> - \`0 = (0, ..., 0)\`, không có hướng, là duy nhất.
> - \`-v\` cùng độ dài, ngược hướng \`v\`. \`v + (-v) = 0\`.
> - \`-v = (-1)·v\`.

---

## 8. Phép trừ vector

### 8.1. Định nghĩa

\`\`\`
u - v ≡ u + (-v) = (u₁ - v₁,  u₂ - v₂,  ...,  uₙ - vₙ)
\`\`\`

Phép trừ **không phải tiên đề mới** — chỉ là tổ hợp của phép cộng và vector đối.

### 8.2. Hình học — "mũi tên từ v tới u"

Trong hình bình hành với cạnh \`u\`, \`v\` đặt tại gốc:

- Đường chéo \`O → \` (đầu xa) = \`u + v\`.
- Đường chéo khác (nối **đầu của v** tới **đầu của u**) = \`u - v\`.

\`\`\`
                   ●(u₁+v₁, u₂+v₂) = u+v
                  ╱ ╲
                 ╱   ╲
              v ╱     ╲ u
               ╱       ╲
        u-v   ╱         ╲
       ●─────●(v)        ●(u)
                ╲       ╱
                  ╲   ╱
                    O
\`\`\`

**Giải thích:** Mũi tên từ \`v\` đến \`u\` chính là vector cần cộng vào \`v\` để được \`u\`. Tức \`v + (u - v) = u\`. ✓

> **💡 Trực giác:** Nếu \`u\` và \`v\` là **vị trí** hai điểm trong không gian, thì \`u - v\` chính là **vector tịnh tiến** từ \`v\` sang \`u\`. Đây là cách dùng nhiều nhất trong hình học: tính vector nối hai điểm = "điểm đầu trừ điểm cuối" (chính xác hơn: \`vector từ A tới B = B - A\`).

### 8.3. Ví dụ (≥ 4)

**Ví dụ 1:** \`u = (5, 3)\`, \`v = (2, 1)\`. \`u - v = (3, 2)\`.
**Ví dụ 2:** \`u = (1, -1)\`, \`v = (4, 2)\`. \`u - v = (-3, -3)\`.
**Ví dụ 3:** \`u = v = (7, 8)\`. \`u - v = (0, 0) = 0\` (luôn đúng cho mọi \`u\`).
**Ví dụ 4 (3D):** \`u = (1, 2, 3)\`, \`v = (4, 5, 6)\`. \`u - v = (-3, -3, -3)\`.
**Ví dụ 5 (đảo dấu):** \`v - u = (3, 3, 3)\` — đối của \`u - v\`. Tức \`u - v ≠ v - u\` nói chung.

> **⚠ Lỗi thường gặp:** Phép trừ vector **không giao hoán**: \`u - v ≠ v - u\` (trừ trường hợp \`u = v\`). Đừng nhầm với cộng. Cụ thể: \`u - v = -(v - u)\`.

> **🔁 Tự kiểm tra:** Cho \`A = (3, 4)\` và \`B = (7, 1)\` là 2 điểm. Tính vector tịnh tiến từ A sang B.
> <details><summary>Đáp án</summary>
>
> \`B - A = (7-3, 1-4) = (4, -3)\`. Tức "đi 4 đơn vị sang phải, 3 đơn vị xuống" từ A sẽ tới B. ✓
> </details>

> **📝 Tóm tắt mục 8:**
> - \`u - v = u + (-v)\`, trừ từng thành phần.
> - Hình học: mũi tên từ \`v\` đến \`u\`. Hoặc: vector tịnh tiến \`B - A\` đi từ A sang B.
> - Không giao hoán: \`u - v ≠ v - u\`.

---

## 9. Linear combination (tổ hợp tuyến tính)

### 9.1. Định nghĩa

Cho \`k\` vector \`v₁, v₂, ..., vₖ ∈ ℝⁿ\` và \`k\` scalar \`c₁, c₂, ..., cₖ ∈ ℝ\`. **Tổ hợp tuyến tính** của chúng là:

\`\`\`
c₁·v₁ + c₂·v₂ + c₃·v₃ + ... + cₖ·vₖ
\`\`\`

Kết quả là **một vector** trong ℝⁿ (vì cộng vector và scalar multiplication đều cho vector trong ℝⁿ).

> **💡 Trực giác:** Tổ hợp tuyến tính = "trộn" các vector với các tỉ lệ \`c₁, ..., cₖ\`. Như pha cocktail: vector là các "loại rượu", scalar là tỉ lệ. Mỗi cách chọn tỉ lệ cho một "ly" khác nhau.

### 9.2. Ví dụ

**Ví dụ 1 (2 vector trong ℝ²):** \`v₁ = (1, 0)\`, \`v₂ = (0, 1)\`. Với \`c₁ = 3, c₂ = 5\`:

\`\`\`
3·v₁ + 5·v₂ = 3·(1,0) + 5·(0,1) = (3,0) + (0,5) = (3, 5)
\`\`\`

Quan sát: bằng cách thay đổi \`c₁, c₂\` ta có thể đạt **mọi điểm** trong ℝ². Tức \`{v₁, v₂}\` "phủ" cả mặt phẳng. Đây là khái niệm **span**, sẽ học sâu ở Lesson 04.

**Ví dụ 2 (3 vector trong ℝ³):** \`e₁ = (1,0,0)\`, \`e₂ = (0,1,0)\`, \`e₃ = (0,0,1)\`. Với \`c₁=2, c₂=-1, c₃=4\`:

\`\`\`
2·e₁ - 1·e₂ + 4·e₃ = (2, 0, 0) + (0, -1, 0) + (0, 0, 4) = (2, -1, 4)
\`\`\`

Với mọi \`(a, b, c) ∈ ℝ³\` ta có \`(a, b, c) = a·e₁ + b·e₂ + c·e₃\`. \`{e₁, e₂, e₃}\` là **basis chuẩn (standard basis)** của ℝ³.

**Ví dụ 3 (vector phụ thuộc):** \`v₁ = (1, 2)\`, \`v₂ = (2, 4) = 2·v₁\`. Tổ hợp \`c₁·v₁ + c₂·v₂ = (c₁+2c₂)·v₁\` — luôn nằm trên đường thẳng qua \`v₁\`. Không phủ được cả mặt phẳng. Hai vector này **phụ thuộc tuyến tính** — sẽ học ở Lesson 04.

**Ví dụ 4 (tổ hợp với scalar 0):** \`c₁ = 0, c₂ = 0, ..., cₖ = 0\` cho mọi tập vector → ra vector 0. Đây là **tổ hợp tầm thường (trivial combination)** — luôn tồn tại.

> **❓ Câu hỏi tự nhiên:** "Có phải mọi tổ hợp tuyến tính của vector trong ℝⁿ đều ở trong ℝⁿ?"
>
> Trả lời: Đúng. Vì phép cộng và scalar multiplication đều "đóng" trong ℝⁿ (kết quả vẫn là vector trong ℝⁿ). Đây là tính chất **đóng (closure)** — bắt nguồn từ 8 tiên đề. Tổng quát hơn: tập tất cả tổ hợp tuyến tính của một số vector cho trước được gọi là **span** của tập đó — Lesson 04.

> **🔁 Tự kiểm tra:** Cho \`v₁ = (1, 1)\`, \`v₂ = (1, -1)\`. Tính \`2·v₁ + 3·v₂\`.
> <details><summary>Đáp án</summary>
>
> \`2·(1,1) + 3·(1,-1) = (2,2) + (3,-3) = (5, -1)\`.
> </details>

> **📝 Tóm tắt mục 9:**
> - Linear combination = \`Σ cᵢ vᵢ\` — kết hợp các vector theo tỉ lệ scalar.
> - Lesson 04 sẽ dùng để định nghĩa **span**, **basis**, **dimension**, **linear independence**.

---

## 10. Vector trong code

### 10.1. Go — \`[]float64\`

Trong Go, vector phổ biến nhất là một slice các số thực:

\`\`\`go
package main

import "fmt"

// Cộng 2 vector cùng chiều. Trả về vector mới, KHÔNG sửa input.
func Add(u, v []float64) []float64 {
    if len(u) != len(v) {
        panic("kích thước không khớp")
    }
    result := make([]float64, len(u))
    for i := range u {
        result[i] = u[i] + v[i]
    }
    return result
}

// Scalar multiplication: c·v
func Scale(c float64, v []float64) []float64 {
    result := make([]float64, len(v))
    for i, x := range v {
        result[i] = c * x
    }
    return result
}

// Vector đối -v
func Neg(v []float64) []float64 {
    return Scale(-1, v)
}

// Hiệu u - v
func Sub(u, v []float64) []float64 {
    return Add(u, Neg(v))
}

// Tổ hợp tuyến tính c₁v₁ + c₂v₂ + ... + cₖvₖ
// Yêu cầu len(coeffs) == len(vecs).
func LinearCombo(coeffs []float64, vecs [][]float64) []float64 {
    if len(coeffs) != len(vecs) || len(vecs) == 0 {
        panic("input không hợp lệ")
    }
    n := len(vecs[0])
    result := make([]float64, n)
    for k, c := range coeffs {
        for i := 0; i < n; i++ {
            result[i] += c * vecs[k][i]
        }
    }
    return result
}

func main() {
    u := []float64{3, 2}
    v := []float64{4, 3}
    fmt.Println("u + v =", Add(u, v))             // [7 5]
    fmt.Println("2·u =", Scale(2, u))             // [6 4]
    fmt.Println("u - v =", Sub(u, v))             // [-1 -1]
    fmt.Println("Combo:",
        LinearCombo([]float64{2, 3}, [][]float64{u, v})) // [18 13]
}
\`\`\`

**Một số lưu ý khi code:**

- **KHÔNG** dùng cùng slice cho input và output trừ khi cố ý: \`Add(u, u)\` đúng (cho ra \`2u\`), nhưng nếu trong loop ghi đè \`u\` sẽ corrupt dữ liệu.
- **Kiểm tra kích thước** trước khi cộng — quên check là một trong những bug khó truy nhất.
- **Không có chiều "vector hàng" vs "vector cột" trong Go primitive** — đó là khái niệm về cách bố trí khi nhân ma trận (Lesson 05). Trong \`[]float64\` đơn thuần, không phân biệt.

### 10.2. Python NumPy — \`np.array\`

\`\`\`python
import numpy as np

u = np.array([3.0, 2.0])
v = np.array([4.0, 3.0])

print(u + v)        # [7. 5.]
print(2 * u)        # [6. 4.]
print(u - v)        # [-1. -1.]
print(2*u + 3*v)    # [18. 13.]

print(u.shape)      # (2,)    -- 1 chiều, 2 phần tử
print(u.ndim)       # 1
print(u.dtype)      # float64
\`\`\`

**Lưu ý ndim và shape:**

- \`np.array([3, 2])\` có \`shape = (2,)\` và \`ndim = 1\` — vector "phẳng".
- \`np.array([[3], [2]])\` có \`shape = (2, 1)\` và \`ndim = 2\` — **vector cột** (ma trận 2×1).
- \`np.array([[3, 2]])\` có \`shape = (1, 2)\` và \`ndim = 2\` — **vector hàng** (ma trận 1×2).

Khi cần phân biệt "hàng/cột" (vd nhân ma trận), phải dùng dạng 2D có shape rõ. Khi chỉ làm phép toán vector cơ bản, dạng 1D là đủ và nhanh hơn.

> **⚠ Lỗi thường gặp:** Broadcast! Trong NumPy \`np.array([1,2,3]) + np.array([10])\` không lỗi mà tự broadcast thành \`[11, 12, 13]\`. Điều này tiện nhưng dễ giấu bug. Khi học, cứ check \`shape\` kỹ.

### 10.3. Tổ chức dữ liệu thực tế

- **Một sample** (1 ảnh, 1 câu, 1 user...) = **một vector** trong ℝⁿ.
- **Một dataset** = nhiều vector → ma trận **shape \`(N, n)\`** với \`N\` = số sample, \`n\` = chiều feature. (Ma trận là chủ đề Lesson 05.)
- **Một batch** trong deep learning = vài chục đến vài nghìn sample → tensor shape \`(B, n)\` hoặc cao hơn (cho ảnh thì \`(B, C, H, W)\`).

> **📝 Tóm tắt mục 10:**
> - Go: \`[]float64\`, không phân biệt hàng/cột ở dạng cơ bản.
> - NumPy: \`np.array(...)\`, để ý \`shape\` và \`ndim\`. 1D là vector phẳng; 2D dạng \`(n,1)\` hay \`(1,n)\` khi cần phân biệt hàng/cột.
> - Một sample = một vector. Một dataset = một ma trận \`(N, n)\`.

---

## 11. Liên hệ Machine Learning / AI

> **💡 Tại sao Linear Algebra quan trọng cho ML?** Vì **mọi dữ liệu trong ML cuối cùng đều biến thành vector**: ảnh (pixel flatten), văn bản (embedding), audio (spectrogram), user behavior (feature vector). Mọi thao tác trên dữ liệu = thao tác trên vector. Hiểu vector = hiểu được "input" và "output" của mọi model.

### 11.1. Feature vector — đại diện số của một sample

**Ví dụ — bài toán dự đoán giá nhà:** Mỗi căn nhà được mô tả bởi:

| Diện tích (m²) | Số phòng ngủ | Tuổi nhà (năm) | Khoảng cách tới trung tâm (km) | ... |
|---|---|---|---|---|
| 80 | 2 | 5 | 8 | ... |

Một căn nhà = một vector \`x = (80, 2, 5, 8, ...) ∈ ℝⁿ\`. Nếu có \`n = 20\` đặc trưng (feature), mỗi nhà là một điểm trong \`ℝ²⁰\`. Dataset \`N\` nhà = \`N\` điểm trong \`ℝ²⁰\` = một ma trận \`(N, 20)\`.

**Ví dụ — MNIST:** Mỗi ảnh chữ số \`28×28\` xám → vector \`784\` chiều (flatten ma trận pixel). Mỗi ảnh = một điểm trong \`ℝ⁷⁸⁴\`.

**Ví dụ — CIFAR-10:** Ảnh màu \`32×32×3\` (3 kênh RGB) → vector \`3072\` chiều.

### 11.2. Embedding — vector học được từ dữ liệu phi cấu trúc

**Word embedding (word2vec, GloVe):** Mỗi từ → vector trong \`ℝ³⁰⁰\` (thường). Các từ ngữ nghĩa giống → vector gần nhau (dùng dot product / cosine similarity — Lesson 02).

**Sentence embedding (BERT, Sentence-Transformers):** Mỗi câu → vector trong \`ℝ³⁸⁴\` hoặc \`ℝ⁷⁶⁸\`.

**Image embedding (ResNet, CLIP):** Ảnh → vector trong \`ℝ⁵¹²\` hoặc cao hơn.

**Multimodal (CLIP):** ảnh + caption cùng đưa về \`ℝ⁵¹²\` — so sánh được trực tiếp giữa hai modality.

**Embedding trong RAG:** Hệ thống Retrieval-Augmented Generation:
1. Document → chia chunk → mỗi chunk → embedding vector (\`ℝ¹⁵³⁶\` chẳng hạn).
2. Lưu vào vector DB.
3. User query → cùng model embedding → vector query.
4. Tìm top-K chunk có **cosine similarity** lớn nhất với query (Lesson 02).
5. Đưa K chunk làm context cho LLM trả lời.

Tức **toàn bộ RAG chạy trên các phép toán vector**: dot product, norm, distance. Không có vector → không có RAG.

### 11.3. Gradient — vector chỉ hướng tăng nhanh nhất

Đã thấy ở [Calculus Lesson 06](../../03-Calculus/lesson-06-partial-gradient/). Gradient \`∇f\` là một vector trong ℝⁿ với \`n\` = số tham số:

\`\`\`
∇L(θ) = (∂L/∂θ₁,  ∂L/∂θ₂,  ...,  ∂L/∂θₙ)
\`\`\`

**Gradient descent:** \`θ_new = θ_old - η·∇L(θ_old)\` — đây chính là một phép trừ vector và scalar multiplication.

**GPT-3 có 175 tỉ tham số** → gradient là một vector trong \`ℝ¹·⁷⁵×¹⁰¹¹\`. Vẫn dùng đúng các quy tắc bài này (cộng, scalar mul) — đó là sức mạnh của trừu tượng hóa.

### 11.4. Mạng nơ-ron — chuỗi biến đổi vector

Lớp neural network cơ bản: \`y = σ(Wx + b)\` với
- \`x ∈ ℝⁿ\` — input vector,
- \`W\` — ma trận (Lesson 05),
- \`b ∈ ℝᵐ\` — bias vector,
- \`σ\` — hàm phi tuyến áp lên từng thành phần (ReLU, sigmoid, ...).

Mỗi lớp **lấy vector → trả vector**. Một mạng nhiều lớp = chuỗi hàm \`x → x₁ → x₂ → ... → y\`. **Hiểu vector là tiền đề để hiểu network.**

> **📝 Tóm tắt mục 11:**
> - Feature vector = đại diện số của một sample.
> - Embedding = vector học được, mã hóa ngữ nghĩa.
> - Gradient = vector các đạo hàm riêng → gradient descent update tham số.
> - Mạng nơ-ron = chuỗi biến đổi vector → vector.

---

## 12. Bài tập

### Bài 1 — Cộng và scalar multiplication cơ bản

Cho \`u = (2, -3, 4)\`, \`v = (-1, 5, 2)\`, \`w = (3, 0, -2)\`. Tính:

(a) \`u + v\`
(b) \`u - v\`
(c) \`2u + 3v - w\`
(d) \`0·u + 1·v + (-1)·w\`

### Bài 2 — Kiểm tra tiên đề

Chứng minh bằng tính trực tiếp: với \`u = (1, 2, 3)\`, \`v = (4, 5, 6)\`, \`c = 2\`, \`d = 3\`:

(a) \`u + v = v + u\` (A1).
(b) \`(c + d)·u = c·u + d·u\` (S4).

### Bài 3 — Vector tịnh tiến giữa 2 điểm

Cho 2 điểm \`A = (1, 2, -1)\` và \`B = (4, 0, 3)\` trong ℝ³.

(a) Tìm vector tịnh tiến từ A sang B.
(b) Nếu di chuyển từ B theo cùng vector đó, sẽ tới điểm nào?

### Bài 4 — Tổ hợp tuyến tính dựng vector cho trước

Cho \`v₁ = (1, 0)\`, \`v₂ = (0, 1)\`. Tìm \`c₁, c₂\` sao cho \`c₁·v₁ + c₂·v₂ = (3, -5)\`.

### Bài 5 — Vector phụ thuộc

Cho \`v₁ = (1, 2)\`, \`v₂ = (2, 4)\`, \`v₃ = (3, 6)\`.

(a) Chứng tỏ \`v₃ = α·v₁ + β·v₂\` với một cách chọn \`α, β\` cụ thể.
(b) Có còn cách chọn khác không? (Gợi ý: thử nhiều \`(α, β)\` khác.)

### Bài 6 — Liên hệ ML

Một sample MNIST là ảnh \`28×28\` xám, mỗi pixel là số nguyên \`0-255\` (mức xám).

(a) Sample đó là vector trong \`ℝⁿ\` với \`n = ?\`.
(b) Nếu dataset có 60,000 ảnh, cần bao nhiêu số thực để lưu toàn bộ?
(c) Embedding BERT-base biến câu thành vector 768 chiều. Một corpus 1 triệu câu khi embedding chiếm bao nhiêu số thực?

---

## 13. Lời giải chi tiết

### Bài 1

(a) \`u + v = (2+(-1), -3+5, 4+2) = (1, 2, 6)\`.

(b) \`u - v = (2-(-1), -3-5, 4-2) = (3, -8, 2)\`.

(c) \`2u = (4, -6, 8)\`, \`3v = (-3, 15, 6)\`, \`-w = (-3, 0, 2)\`.
\`2u + 3v - w = (4-3-3, -6+15+0, 8+6+2) = (-2, 9, 16)\`.

(d) \`0·u = (0,0,0)\`, \`1·v = v = (-1, 5, 2)\`, \`(-1)·w = -w = (-3, 0, 2)\`.
Tổng = \`(0-1-3, 0+5+0, 0+2+2) = (-4, 5, 4)\`.

### Bài 2

(a) \`u + v = (1+4, 2+5, 3+6) = (5, 7, 9)\`.
\`v + u = (4+1, 5+2, 6+3) = (5, 7, 9)\`. ✓ Giống nhau.

(b) \`c + d = 2 + 3 = 5\`.
\`(c+d)·u = 5·(1, 2, 3) = (5, 10, 15)\`.
\`c·u = (2, 4, 6)\`, \`d·u = (3, 6, 9)\`.
\`c·u + d·u = (2+3, 4+6, 6+9) = (5, 10, 15)\`. ✓ Giống nhau.

### Bài 3

(a) Vector từ A sang B = \`B - A = (4-1, 0-2, 3-(-1)) = (3, -2, 4)\`.

(b) Từ B đi tiếp \`(3, -2, 4)\`: \`B + (3, -2, 4) = (4+3, 0-2, 3+4) = (7, -2, 7)\`. Tức tới điểm \`C = (7, -2, 7)\`.

**Quan sát:** A, B, C thẳng hàng (đều trên đường thẳng qua A theo hướng \`(3, -2, 4)\`).

### Bài 4

\`c₁·(1,0) + c₂·(0,1) = (c₁, c₂)\`. Muốn bằng \`(3, -5)\` → \`c₁ = 3, c₂ = -5\`.

**Tổng quát:** Với basis chuẩn \`{e₁, ..., eₙ}\` của ℝⁿ, **các thành phần của vector chính là các hệ số trong tổ hợp tuyến tính theo basis chuẩn**. Đây là cách hiểu lại định nghĩa của tọa độ — sẽ đào sâu ở Lesson 04.

### Bài 5

(a) Chú ý \`v₁ = (1, 2)\`, \`v₂ = (2, 4) = 2·v₁\`, \`v₃ = (3, 6) = 3·v₁\`.

Chọn \`α = 3, β = 0\`: \`3·v₁ + 0·v₂ = (3, 6) = v₃\`. ✓

(b) Có vô số cách. Vì \`v₂ = 2v₁\`, ta có thể đổi: bớt \`1·v₂\` (tức trừ đi \`2v₁\`) và bù lại \`+2·v₁\`:

- \`α = 1, β = 1\`: \`(1, 2) + (2, 4) = (3, 6)\`. ✓
- \`α = -1, β = 2\`: \`(-1, -2) + (4, 8) = (3, 6)\`. ✓
- \`α = 5, β = -1\`: \`(5, 10) + (-2, -4) = (3, 6)\`. ✓

Tổng quát mọi \`(α, β)\` thỏa \`α + 2β = 3\` đều cho \`α·v₁ + β·v₂ = v₃\`.

**Quan sát:** Không có cách BIỂU DIỄN DUY NHẤT vì \`v₁, v₂\` **phụ thuộc tuyến tính** — Lesson 04 sẽ chính thức hóa: khi vector phụ thuộc, biểu diễn không duy nhất.

### Bài 6

(a) \`n = 28 × 28 = 784\`. Mỗi sample là vector trong \`ℝ⁷⁸⁴\`.

(b) \`60,000 × 784 = 47,040,000\` số thực. Nếu mỗi số dùng \`float32\` (4 byte) thì cần \`≈ 188 MB\`.

(c) \`1,000,000 × 768 = 768,000,000 ≈ 7.68 × 10⁸\` số thực. Với \`float32\`: \`≈ 3.07 GB\`. Đây là lý do **vector database** phải tối ưu lưu trữ (quantization, PQ, ...) khi corpus lớn.

---

## 14. Tóm tắt cả bài

1. **Vector có 2 góc nhìn**: hình học (mũi tên O → điểm) và đại số (tuple số có thứ tự). Tương đương hoàn toàn.
2. **Không gian ℝⁿ** = tập mọi vector n thành phần thực. \`n\` = chiều.
3. **Cộng vector**: cộng từng thành phần. Hình học: tam giác / hình bình hành.
4. **Scalar multiplication**: nhân scalar vào từng thành phần. Hình học: phóng/thu/đảo.
5. **8 tiên đề không gian vector**: 4 cho \`+\`, 4 cho \`·\`. Đầy đủ = không gian vector.
6. **Vector 0** và **vector đối** là phần tử trung hòa và phần tử nghịch của phép cộng.
7. **Phép trừ** \`u - v = u + (-v)\`. Hình học: vector từ \`v\` đến \`u\`.
8. **Linear combination** \`Σ cᵢ vᵢ\` — viên gạch dẫn tới span/basis ở Lesson 04.
9. **Code**: Go \`[]float64\`, Python NumPy \`np.array\`, để ý shape.
10. **ML/AI**: feature vector, embedding (BERT, CLIP, RAG), gradient — tất cả đều là vector.

---

## 15. Xem tương tác

- [\`visualization.html\`](./visualization.html) — 4 panel:
  1. 2D vector playground (kéo \`u\`, \`v\`, hiển thị \`u + v\`).
  2. Scalar multiplication slider.
  3. 3D vector visualizer (3 slider x, y, z).
  4. Linear combination demo (hai vector cố định, hai slider \`a, b\`).

---

## 16. Bài tiếp theo

- [Lesson 02 — Dot product + cosine similarity](../lesson-02-dot-product/) — số hóa "góc giữa hai vector", nền của **cosine similarity** dùng khắp RAG/embedding search.
- Sau đó: [Lesson 03 — Norm và khoảng cách](../lesson-03-norm-distance/), [Lesson 04 — Linear independence, basis, dimension](../lesson-04-linear-independence/).
</content>
</invoke>`;
