// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: Math/02-Geometry/lesson-04-polygons-area/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 04 — Đa giác & Diện tích

## Mục tiêu

- Hiểu khái niệm **đa giác** (lồi vs lõm, đều vs thường) và đối xứng của đa giác đều.
- Tính tổng các **góc trong** $(n-2)\\cdot 180^\\circ$ và **góc ngoài** $360^\\circ$ của đa giác.
- Phân loại **tứ giác** (vuông, chữ nhật, bình hành, thoi, thang) và nhớ công thức diện tích từng loại.
- Biết công thức diện tích các hình phẳng phổ biến: tam giác, hình vuông, hình chữ nhật, hình thoi, hình thang, hình bình hành, lục giác đều, đường tròn.
- Tính **diện tích đa giác bất kỳ** bằng chia tam giác hoặc công thức **Shoelace** từ tọa độ đỉnh.
- Phân biệt **chu vi** (perimeter) và diện tích.

## Kiến thức tiền đề

- [Lesson 02 — Tam giác](../lesson-02-triangles/), [Lesson 03 — Đường tròn](../lesson-03-circles/).

---

## 1. Đa giác

💡 **Trực giác / Hình dung**: đa giác là 1 hàng rào khép kín làm từ các đoạn thẳng — đi dọc hàng rào, mỗi lần tới góc thì rẽ, cuối cùng quay về điểm xuất phát. **Lồi** giống cái đĩa tròn-trịa không lõm vào (mọi góc trong $< 180^\\circ$); **lõm** giống ngôi sao 5 cánh hay chữ L, có chỗ "thụt vào".

**Đa giác** = hình phẳng đóng tạo bởi các đoạn thẳng (gọi là **cạnh — side/edge**) nối nhau tại các **đỉnh — vertex**. Đa giác $n$ cạnh có đúng $n$ cạnh, $n$ đỉnh và $n$ góc trong.

### 1.1. Phân loại

- **Đều (regular)**: mọi cạnh + mọi góc đều bằng nhau. Vd tam giác đều, hình vuông, lục giác đều.
- **Lồi (convex)**: mọi góc trong $< 180^\\circ$. Đường thẳng nối 2 điểm bất kỳ trong đa giác đều nằm bên trong.
- **Lõm (concave)**: có ít nhất 1 góc trong $> 180^\\circ$ (có chỗ "thụt vào").

**Hình dung lồi vs lõm bằng ASCII** — đa giác **lồi** không có đỉnh nào "chĩa vào trong"; đa giác **lõm** có (xem mũi tên):

\`\`\`
   LỒI (convex)               LÕM (concave) — chữ "L"
   ───────────                ─────────────────────────
        •                       •─────────•
       / \\                      │         │
      /   \\                     │         │
     •     •                    │         •─────────•
     │     │                    │                   │
     •─────•                    •───────────────────•
                                      ▲
   mọi góc trong < 180°          góc trong này > 180° (lõm)
\`\`\`

**Mẹo phân biệt nhanh (lồi/lõm)**: kéo căng một sợi dây thun quanh các đỉnh. Nếu dây thun **chạm hết** mọi đỉnh → lồi. Nếu có đỉnh **nằm lọt vào trong** dây (dây không chạm) → lõm. Đỉnh "lọt trong" chính là đỉnh có góc trong $> 180^\\circ$.

### 1.2. Tổng góc trong

Đa giác **n cạnh** có:
$$\\text{Tổng góc trong} = (n - 2) \\cdot 180^\\circ$$

💡 **Vì sao?** Vì n-giác có thể chia thành **$(n-2)$ tam giác** bằng các đường chéo từ 1 đỉnh → tổng góc trong $= (n-2)\\cdot 180^\\circ$.

#### 1.2.1. Walk-through "vì sao $(n-2)$" — chia tam giác bằng ASCII

Chọn **một đỉnh** rồi kẻ tất cả đường chéo từ đỉnh đó tới các đỉnh **không kề** nó. Mỗi tam giác có tổng góc trong $180^\\circ$, các tam giác lấp kín toàn bộ đa giác, nên tổng góc trong đa giác $=$ (số tam giác) $\\times 180^\\circ$. Câu hỏi chỉ còn: **chia được mấy tam giác?**

\`\`\`
   TỨ GIÁC (n=4)              NGŨ GIÁC (n=5)            LỤC GIÁC (n=6)
   2 tam giác                3 tam giác                4 tam giác
   ───────────               ───────────               ───────────
   A●─────────●B             A●─────────●B             A●───────●B
    │ \\       │               │ \\\\      │               │ \\  \\   │
    │   \\     │               │  \\ \\    │              F●   \\  \\  ●C
    │     \\   │               │   \\  \\  │               │ \\   \\ \\ │
    │       \\ │              E●────\\──\\─●C              E●───\\───\\─●D
   D●─────────●C               \\    \\ │                  (chéo từ A: AC, AD, AE)
                                \\    \\│
   chéo: A→C                   D●─────●... (chéo A→C, A→D)
   ⟹ 2 tam giác               ⟹ 3 tam giác              ⟹ 4 tam giác
\`\`\`

**Quy luật**: từ 1 đỉnh, ta KHÔNG kẻ chéo tới chính nó và 2 đỉnh kề (3 đỉnh bị loại), nên có $(n-3)$ đường chéo, chúng cắt đa giác thành $(n-3)+1 = (n-2)$ tam giác. Cộng dồn: $\\text{Tổng góc trong} = (n-2)\\cdot 180^\\circ$.

#### 1.2.2. Walk-through tổng góc trong — 4 ví dụ từng bước

| $n$ | Tên (Anh) | Số tam giác $(n-2)$ | Tổng góc trong | Tính từng bước |
|----|-----------|:---:|:---:|----|
| 3 | tam giác (triangle) | 1 | $180^\\circ$ | $(3-2)\\cdot 180 = 1\\cdot 180 = 180^\\circ$ |
| 4 | tứ giác (quadrilateral) | 2 | $360^\\circ$ | $(4-2)\\cdot 180 = 2\\cdot 180 = 360^\\circ$ |
| 5 | ngũ giác (pentagon) | 3 | $540^\\circ$ | $(5-2)\\cdot 180 = 3\\cdot 180 = 540^\\circ$ |
| 6 | lục giác (hexagon) | 4 | $720^\\circ$ | $(6-2)\\cdot 180 = 4\\cdot 180 = 720^\\circ$ |

**Kiểm chứng bằng hình quen**: hình chữ nhật là tứ giác có 4 góc $90^\\circ$ → tổng $= 4\\cdot 90 = 360^\\circ$, khớp $(4-2)\\cdot 180 = 360^\\circ$ ✓. Tam giác vuông cân có 3 góc $90^\\circ, 45^\\circ, 45^\\circ$ → tổng $= 180^\\circ$, khớp $(3-2)\\cdot 180$ ✓.

> 📐 **Định nghĩa đầy đủ — Tổng góc trong đa giác**
>
> **(a) Là gì**: Quy luật tuyến tính theo số cạnh n. Cộng tất cả n góc trong của 1 đa giác lồi luôn ra đúng $(n-2)\\cdot 180^\\circ$. Không phụ thuộc hình cụ thể — đều, không đều đều như nhau.
>
> **(b) Vì sao cần**: Vì cho phép tính nhanh góc của đa giác mà không cần đo. Ngược lại, dùng để xác định **đa giác đều** mỗi góc bao nhiêu, suy ra n từ số đo góc. Cũng là nền cho bài toán "lát mặt phẳng" (tessellation) — chỉ tam giác, tứ giác, lục giác đều lát được vì góc của chúng chia đều $360^\\circ$.
>
> **(c) Ví dụ số**: Tam giác ($n=3$): $(3-2)\\cdot 180 =$ **$180^\\circ$** ✓. Tứ giác ($n=4$): $2\\cdot 180 =$ **$360^\\circ$** ✓ (4 góc $90^\\circ$ trong hình chữ nhật). Ngũ giác đều: $3\\cdot 180 = 540^\\circ$, mỗi góc $= 540/5 =$ **$108^\\circ$**. Lục giác đều: $4\\cdot 180 = 720^\\circ$, mỗi góc $= 120^\\circ$. Bát giác đều (như đường giao thông STOP): $6\\cdot 180 = 1080^\\circ$, mỗi góc $= 135^\\circ$.

**Đa giác đều n cạnh**: mỗi góc trong $= (n-2)\\cdot 180^\\circ/n$.

| n | Tên | Mỗi góc trong (đều) |
|---|-----|---------------------|
| 3 | Tam giác | $60^\\circ$ |
| 4 | Tứ giác | $90^\\circ$ |
| 5 | Ngũ giác | $108^\\circ$ |
| 6 | Lục giác | $120^\\circ$ |
| 8 | Bát giác | $135^\\circ$ |
| 12 | Thập nhị giác | $150^\\circ$ |
| $\\infty$ | (đường tròn) | $180^\\circ$ (giới hạn) |

**Walk-through "mỗi góc đa giác đều" — 4 ví dụ**: dùng $\\dfrac{(n-2)\\cdot 180^\\circ}{n}$.

- Tam giác đều ($n=3$): $\\dfrac{1\\cdot 180}{3} = \\dfrac{180}{3} = 60^\\circ$.
- Hình vuông ($n=4$): $\\dfrac{2\\cdot 180}{4} = \\dfrac{360}{4} = 90^\\circ$.
- Ngũ giác đều ($n=5$): $\\dfrac{3\\cdot 180}{5} = \\dfrac{540}{5} = 108^\\circ$.
- Bát giác đều ($n=8$): $\\dfrac{6\\cdot 180}{8} = \\dfrac{1080}{8} = 135^\\circ$.

#### 1.2.3. Đối xứng của đa giác đều

💡 **Hình dung**: đa giác đều $n$ cạnh có **$n$ trục đối xứng** (qua mỗi đỉnh/cạnh) và quay được **$n$ lần** trùng chính nó (đối xứng quay góc $\\dfrac{360^\\circ}{n}$). Vì sao? Vì mọi cạnh + góc bằng nhau → xoay nó một "bước" $\\frac{360^\\circ}{n}$ thì mỗi đỉnh nhảy sang vị trí đỉnh kế, hình trông y hệt.

\`\`\`
   TAM GIÁC ĐỀU            HÌNH VUÔNG             LỤC GIÁC ĐỀU
   3 trục đối xứng         4 trục đối xứng        6 trục đối xứng
   quay 120° trùng         quay 90° trùng         quay 60° trùng
   ────────────            ────────────           ────────────
        •                  •─────────•             •───────•
       /│\\                 │\\   :   /│            / \\  :  / \\
      / │ \\                │ \\  :  / │           /   \\ : /   \\
     /  │  \\               │  \\ : /  │          •·····•·····•
    /···•···\\              │···\\:/···│           \\   / : \\   /
   /    │    \\             │   /:\\   │            \\ /  :  \\ /
  •─────┴─────•            │  / : \\  │             •───────•
   (3 trục qua             │ /  :  \\ │           (6 trục: 3 qua
    đỉnh ↔ cạnh)           •─────────•            đỉnh đối, 3 qua
                          (2 chéo + 2              trung điểm cạnh)
                           trung trực)
\`\`\`

| Đa giác đều | Số trục đối xứng | Góc quay nhỏ nhất trùng chính nó |
|-------------|:---:|:---:|
| Tam giác đều ($n=3$) | 3 | $120^\\circ$ |
| Hình vuông ($n=4$) | 4 | $90^\\circ$ |
| Ngũ giác đều ($n=5$) | 5 | $72^\\circ$ |
| Lục giác đều ($n=6$) | 6 | $60^\\circ$ |

### 1.3. Tổng góc ngoài

$$\\text{Tổng góc ngoài (bất kỳ đa giác lồi)} = 360^\\circ$$

**Góc ngoài** tại một đỉnh = góc bù với góc trong: $\\text{ngoài} = 180^\\circ - \\text{trong}$.

💡 **Hình dung "đi bộ quanh hàng rào"**: tưởng tượng bạn đi dọc cạnh đa giác. Tới mỗi đỉnh bạn phải **rẽ** một góc đúng bằng góc ngoài. Đi hết một vòng và quay về hướng ban đầu nghĩa là tổng các lần rẽ $= 360^\\circ$ (một vòng tròn đầy đủ) — bất kể đa giác có bao nhiêu cạnh.

\`\`\`
   Đi theo chiều mũi tên, mỗi đỉnh "rẽ" góc ngoài:

        rẽ ↰                rẽ ↱
         •──────────────────•
        ╱                    ╲
   rẽ ↰•                      •↱ rẽ
        ╲                    ╱
         •──────────────────•
        rẽ ↳                ↳ rẽ

   Tổng các góc rẽ = 360° (đủ 1 vòng, đa giác nào cũng vậy)
\`\`\`

**Walk-through 3 ví dụ (đa giác đều)** — mỗi góc ngoài $= \\dfrac{360^\\circ}{n}$:

- Tam giác đều: $\\dfrac{360}{3} = 120^\\circ$ mỗi đỉnh; kiểm: $180 - 60 = 120^\\circ$ ✓. Tổng $= 3\\cdot 120 = 360^\\circ$.
- Hình vuông: $\\dfrac{360}{4} = 90^\\circ$ mỗi đỉnh; kiểm: $180 - 90 = 90^\\circ$ ✓.
- Lục giác đều: $\\dfrac{360}{6} = 60^\\circ$ mỗi đỉnh; kiểm: $180 - 120 = 60^\\circ$ ✓.

❓ **Câu hỏi tự nhiên của người đọc**

- *"Vì sao chia n-giác được đúng $(n-2)$ tam giác?"* Chọn 1 đỉnh, kẻ đường chéo tới các đỉnh không kề → tách thành các tam giác. Số tam giác luôn = số cạnh trừ 2. Vd ngũ giác (5 cạnh) → 3 tam giác.
- *"Tổng góc ngoài có phụ thuộc số cạnh không?"* Không — luôn $360^\\circ$ bất kể n. Trực giác: đi 1 vòng quanh đa giác, tổng các lần "rẽ" (góc ngoài) đúng bằng 1 vòng $= 360^\\circ$.
- *"Đa giác lõm thì công thức $(n-2)\\cdot 180^\\circ$ còn đúng?"* Tổng góc trong vẫn $= (n-2)\\cdot 180^\\circ$ cho đa giác đơn (không tự cắt), nhưng cách đo góc lõm ($> 180^\\circ$) phải cẩn thận.

⚠ **Lỗi thường gặp**: quên trừ 2, viết "tổng góc trong $= n\\cdot 180^\\circ$". Phản ví dụ: tứ giác ($n=4$) nếu lấy $4\\cdot 180 = 720^\\circ$ là sai; đúng là $(4-2)\\cdot 180 = 360^\\circ$. Lỗi thứ 2: lấy "mỗi góc đa giác đều = tổng/n" mà quên tính tổng trước — ngũ giác đều mỗi góc $= 540/5 = 108^\\circ$, không phải $180/5$.

🔁 **Dừng lại tự kiểm tra**

1. Tổng góc trong của lục giác (6 cạnh) là bao nhiêu? Mỗi góc nếu là lục giác đều?
2. Đa giác đều có mỗi góc trong $150^\\circ$. Đa giác có mấy cạnh?

<details><summary>Đáp án</summary>

1. $(6-2)\\cdot 180 =$ **$720^\\circ$**. Mỗi góc đều $= 720/6 =$ **$120^\\circ$**.
2. $(n-2)\\cdot 180/n = 150$ → $180n - 360 = 150n$ → $30n = 360$ → $n =$ **12** (thập nhị giác).

</details>

### 📝 Tóm tắt mục 1

- Đa giác: lồi (mọi góc $< 180^\\circ$) / lõm (có góc $> 180^\\circ$); đều (mọi cạnh + góc bằng nhau).
- **Tổng góc trong $= (n-2)\\cdot 180^\\circ$** (chia thành $n-2$ tam giác).
- Đa giác đều n cạnh: mỗi góc trong $= (n-2)\\cdot 180^\\circ/n$.
- **Tổng góc ngoài $= 360^\\circ$** với mọi đa giác lồi (không phụ thuộc n).

---

## 2. Diện tích các hình

💡 **Trực giác / Hình dung**: diện tích = "đếm số ô vuông đơn vị lấp đầy hình". Hình chữ nhật $a\\times b = a$ hàng, mỗi hàng b ô → $a\\cdot b$ ô. Mọi công thức khác đều suy ra bằng cách "cắt-ghép" về hình chữ nhật hay tam giác (vd hình bình hành cắt 1 tam giác ở đầu ghép sang đầu kia → thành chữ nhật đáy·cao).

### 2.1. Bảng công thức

| Hình | Diện tích |
|------|-----------|
| Hình vuông cạnh a | **$a^2$** |
| Hình chữ nhật cạnh a, b | **$a \\cdot b$** |
| Tam giác đáy a, cao h | **$\\frac{1}{2} \\cdot a \\cdot h$** |
| Hình bình hành đáy a, cao h | **$a \\cdot h$** |
| Hình thang đáy a, b, cao h | **$\\frac{1}{2}(a + b)\\cdot h$** |
| Hình thoi 2 đường chéo $d_1$, $d_2$ | **$\\frac{1}{2} \\cdot d_1 \\cdot d_2$** |
| Đường tròn bán kính R | **$\\pi \\cdot R^2$** |
| Lục giác đều cạnh a | **$\\frac{3\\sqrt{3}}{2} \\cdot a^2$** |

### 2.1b. Phân loại tứ giác (quadrilateral) — ASCII + đặc trưng

💡 **Cây gia phả tứ giác**: hình vuông là "con cưng" — nó vừa là hình chữ nhật (4 góc vuông), vừa là hình thoi (4 cạnh bằng). Hình chữ nhật và hình thoi đều là **hình bình hành** đặc biệt. Hình bình hành và hình thang đều là tứ giác. Càng xuống dưới càng "tự do" hơn.

\`\`\`
                 TỨ GIÁC (4 cạnh bất kỳ)
                        │
                ┌───────┴────────┐
            HÌNH THANG       HÌNH BÌNH HÀNH
         (1 cặp cạnh //)    (2 cặp cạnh // & =)
                              ┌──────┴──────┐
                        HÌNH CHỮ NHẬT   HÌNH THOI
                        (4 góc vuông)  (4 cạnh =)
                              └──────┬──────┘
                              HÌNH VUÔNG
                          (vuông + 4 cạnh =)
\`\`\`

**Hình vuông (square)** — 4 cạnh bằng, 4 góc $90^\\circ$:

\`\`\`
   •───────•      • = đỉnh,  cạnh a
   │       │      góc trong = 90°
   │   a   │      2 đường chéo bằng nhau, vuông góc
   │       │      Diện tích S = a²
   •───────•
\`\`\`

**Hình chữ nhật (rectangle)** — 4 góc $90^\\circ$, cạnh đối bằng nhau ($a\\ne b$):

\`\`\`
   •───────────────•      cạnh dài a, cạnh ngắn b
   │               │ b    góc trong = 90°
   •───────────────•      Diện tích S = a · b
           a
\`\`\`

**Hình bình hành (parallelogram)** — 2 cặp cạnh đối song song & bằng nhau, góc xiên:

\`\`\`
        •─────────────•          đáy a, CAO h (vuông góc!)
       ╱             ╱  ┊        cạnh xiên KHÔNG phải chiều cao
      ╱             ╱   ┊ h      Diện tích S = a · h
     •─────────────•   ┄┘
            a
\`\`\`

**Hình thoi (rhombus)** — 4 cạnh bằng nhau, 2 đường chéo $d_1, d_2$ vuông góc cắt nhau tại trung điểm:

\`\`\`
          •                 4 cạnh bằng nhau
         ╱│╲                đường chéo d₁ (dọc), d₂ (ngang)
        ╱ │ ╲               chúng ⊥ nhau tại trung điểm
       •──┼──•   d₂         Diện tích S = ½ · d₁ · d₂
        ╲ │ ╱
         ╲│╱
          •     d₁
\`\`\`

**Hình thang (trapezoid)** — đúng 1 cặp cạnh đối song song (2 đáy $a, b$), cao $h$:

\`\`\`
        •─────────•              đáy nhỏ b
       ╱           ╲             đáy lớn a
      ╱             ╲  h         h = khoảng cách 2 đáy (⊥)
     •───────────────•           Diện tích S = ½(a+b)·h
            a
\`\`\`

### 2.2. Diện tích tam giác đều cạnh a

$S = (a \\cdot \\text{cao})/2 = (a \\cdot (a\\sqrt{3}/2))/2 =$ **$\\frac{\\sqrt{3}}{4} \\cdot a^2$**.

### 2.3. Walk-through — Lục giác đều

Lục giác đều cạnh a = **6 tam giác đều** ghép lại (mỗi tam giác cạnh a).
- $S_\\text{lục giác} = 6 \\cdot \\frac{\\sqrt{3}}{4}\\cdot a^2 =$ **$\\frac{3\\sqrt{3}}{2}\\cdot a^2$**.

Cách khác: bán kính đường tròn ngoại tiếp $= a$ (vì 6 tam giác đều có cạnh = bán kính). Hữu ích trong thực tế (mặt cắt tổ ong, bu-lông).

### 2.4. Verify công thức bằng số thật

- **Hình thang** đáy 5 và 11, cao 4: $S = \\frac{1}{2}(5+11)\\cdot 4 = \\frac{1}{2}\\cdot 16\\cdot 4 =$ **32**. Kiểm bằng cắt-ghép: 2 hình thang úp ngược ghép thành hình bình hành đáy $(5+11)=16$, cao 4 → diện tích 64; mỗi hình thang $= 64/2 = 32$ ✓.
- **Hình thoi** 2 đường chéo 6 và 8: $S = \\frac{1}{2}\\cdot 6\\cdot 8 =$ **24**. (Hình thoi $= \\frac{1}{2}$ hình chữ nhật bao quanh nó, cạnh = 2 đường chéo.)
- **Tam giác đều** cạnh 4: $S = \\frac{\\sqrt{3}}{4}\\cdot 4^2 = \\frac{\\sqrt{3}}{4}\\cdot 16 = 4\\sqrt{3} \\approx$ **6.93**.
- **Lục giác đều** cạnh 4: $S = \\frac{3\\sqrt{3}}{2}\\cdot 16 = 24\\sqrt{3} \\approx$ **41.57** $= 6 \\times 6.93$ (6 tam giác đều) ✓.

### 2.4b. ≥4 ví dụ số cho MỖI loại tứ giác

**Hình vuông** ($S = a^2$):

| Cạnh $a$ | Tính | Diện tích |
|:---:|---|:---:|
| 3 | $3^2$ | $9$ |
| 5 | $5^2$ | $25$ |
| 10 | $10^2$ | $100$ |
| 2.5 | $2.5^2$ | $6.25$ |

**Hình chữ nhật** ($S = a\\cdot b$):

| $a$ | $b$ | Tính | Diện tích |
|:---:|:---:|---|:---:|
| 4 | 3 | $4\\cdot 3$ | $12$ |
| 7 | 5 | $7\\cdot 5$ | $35$ |
| 10 | 2 | $10\\cdot 2$ | $20$ |
| 6 | 6 | $6\\cdot 6$ | $36$ (đặc biệt: là hình vuông) |

**Hình bình hành** ($S = a\\cdot h$ — $h$ là chiều cao vuông góc, KHÔNG phải cạnh xiên):

| Đáy $a$ | Cao $h$ | Tính | Diện tích |
|:---:|:---:|---|:---:|
| 6 | 4 | $6\\cdot 4$ | $24$ |
| 8 | 5 | $8\\cdot 5$ | $40$ |
| 10 | 3 | $10\\cdot 3$ | $30$ |
| 5 | 5 | $5\\cdot 5$ | $25$ |

> Lưu ý: nếu chỉ cho đáy 6, cạnh xiên 5, góc giữa chúng $30^\\circ$ thì $h = 5\\cdot\\sin 30^\\circ = 2.5$, nên $S = 6\\cdot 2.5 = 15$ — **dùng $h$, không dùng cạnh xiên 5**.

**Hình thoi** ($S = \\frac{1}{2}d_1 d_2$ — nửa tích 2 đường chéo):

| $d_1$ | $d_2$ | Tính | Diện tích |
|:---:|:---:|---|:---:|
| 6 | 8 | $\\frac{1}{2}\\cdot 6\\cdot 8$ | $24$ |
| 10 | 4 | $\\frac{1}{2}\\cdot 10\\cdot 4$ | $20$ |
| 12 | 5 | $\\frac{1}{2}\\cdot 12\\cdot 5$ | $30$ |
| 7 | 7 | $\\frac{1}{2}\\cdot 7\\cdot 7$ | $24.5$ |

**Hình thang** ($S = \\frac{1}{2}(a+b)\\cdot h$ — trung bình 2 đáy nhân chiều cao):

| Đáy $a$ | Đáy $b$ | Cao $h$ | Tính | Diện tích |
|:---:|:---:|:---:|---|:---:|
| 5 | 11 | 4 | $\\frac{1}{2}(5+11)\\cdot 4$ | $32$ |
| 3 | 7 | 5 | $\\frac{1}{2}(3+7)\\cdot 5$ | $25$ |
| 8 | 12 | 6 | $\\frac{1}{2}(8+12)\\cdot 6$ | $60$ |
| 4 | 4 | 5 | $\\frac{1}{2}(4+4)\\cdot 5$ | $20$ (2 đáy bằng → thành hình bình hành) |

### 2.5. Diện tích đa giác bất kỳ — chia tam giác & công thức Shoelace

💡 **Trực giác**: muốn tính diện tích một đa giác "kỳ dị" (mảnh đất méo mó, vùng trên bản đồ), có 2 cách:
1. **Chia thành tam giác** từ một đỉnh, tính từng tam giác rồi cộng.
2. **Công thức Shoelace (giày buộc dây)** khi biết **tọa độ các đỉnh** — chỉ cần cộng-trừ các tích chéo, không cần đo góc hay chiều cao.

#### 2.5.1. Công thức Shoelace (Gauss)

Cho đa giác có $n$ đỉnh theo thứ tự **ngược chiều kim đồng hồ** $(x_1, y_1), (x_2, y_2), \\ldots, (x_n, y_n)$:

$$S = \\frac{1}{2}\\left| \\sum_{i=1}^{n} (x_i \\cdot y_{i+1} - x_{i+1} \\cdot y_i) \\right|$$

với quy ước "vòng lại" $(x_{n+1}, y_{n+1}) = (x_1, y_1)$.

💡 **Vì sao gọi "buộc dây giày"?** Vì khi viết tọa độ thành 2 cột rồi nhân **chéo xuống** ($x_i y_{i+1}$) trừ **chéo lên** ($x_{i+1} y_i$), các đường nối trông như dây giày đan chéo.

#### 2.5.2. Walk-through Shoelace từng bước — tam giác $(0,0), (4,0), (0,3)$

Tam giác vuông này có diện tích "đã biết" $= \\frac{1}{2}\\cdot 4\\cdot 3 = 6$ — ta dùng Shoelace để **kiểm chứng** công thức.

**Bước 1 — liệt kê đỉnh (ngược chiều kim đồng hồ) và lặp lại đỉnh đầu ở cuối:**

\`\`\`
   i    xᵢ    yᵢ
   1    0     0
   2    4     0
   3    0     3
   1    0     0   ← lặp lại đỉnh đầu
\`\`\`

**Bước 2 — tính từng số hạng $(x_i\\cdot y_{i+1} - x_{i+1}\\cdot y_i)$:**

$$\\begin{aligned}
i=1:\\ & x_1 y_2 - x_2 y_1 = 0\\cdot 0 - 4\\cdot 0 = 0 \\\\
i=2:\\ & x_2 y_3 - x_3 y_2 = 4\\cdot 3 - 0\\cdot 0 = 12 \\\\
i=3:\\ & x_3 y_1 - x_1 y_3 = 0\\cdot 0 - 0\\cdot 3 = 0
\\end{aligned}$$

**Bước 3 — cộng lại, lấy nửa trị tuyệt đối:**

$$S = \\frac{1}{2}\\left|0 + 12 + 0\\right| = \\frac{1}{2}\\cdot 12 = \\mathbf{6}$$

Khớp với $\\frac{1}{2}\\cdot 4\\cdot 3 = 6$ ✓.

#### 2.5.3. Walk-through Shoelace thứ 2 — tứ giác $(0,0), (4,0), (5,3), (1,4)$

\`\`\`
   i    xᵢ    yᵢ        chéo xuống xᵢyᵢ₊₁    chéo lên xᵢ₊₁yᵢ
   1    0     0          0·0 = 0              4·0 = 0
   2    4     0          4·3 = 12             5·0 = 0
   3    5     3          5·4 = 20             1·3 = 3
   4    1     4          1·0 = 0              0·4 = 0
   1    0     0
\`\`\`

Tổng chéo xuống $= 0+12+20+0 = 32$. Tổng chéo lên $= 0+0+3+0 = 3$.

$$S = \\frac{1}{2}\\left|32 - 3\\right| = \\frac{1}{2}\\cdot 29 = \\mathbf{14.5}$$

**Kiểm chứng bằng cách chia tam giác** (chia tứ giác bởi đường chéo từ đỉnh $(0,0)$):
- Tam giác $(0,0),(4,0),(5,3)$: Shoelace $= \\frac{1}{2}|(0\\cdot0-4\\cdot0)+(4\\cdot3-5\\cdot0)+(5\\cdot0-0\\cdot3)| = \\frac{1}{2}|12| = 6$.
- Tam giác $(0,0),(5,3),(1,4)$: $\\frac{1}{2}|(0\\cdot3-5\\cdot0)+(5\\cdot4-1\\cdot3)+(1\\cdot0-0\\cdot4)| = \\frac{1}{2}|20-3| = 8.5$.
- Cộng: $6 + 8.5 = 14.5$ ✓ — đúng kết quả Shoelace cho cả tứ giác.

### 2.6. Chu vi (perimeter)

**Chu vi** $P$ = tổng độ dài tất cả các cạnh — "đi vòng quanh hết một lượt dài bao nhiêu".

- Hình vuông cạnh $a$: $P = 4a$. Vd $a=5$: $P = 20$.
- Hình chữ nhật $a, b$: $P = 2(a+b)$. Vd $a=7, b=3$: $P = 2\\cdot 10 = 20$.
- Đa giác đều $n$ cạnh, cạnh $a$: $P = n\\cdot a$. Vd lục giác đều cạnh 4: $P = 6\\cdot 4 = 24$.
- Đa giác tọa độ: cộng độ dài từng cạnh bằng $\\sqrt{(\\Delta x)^2 + (\\Delta y)^2}$. Vd cạnh từ $(0,0)$ đến $(4,0)$ dài $\\sqrt{16} = 4$.

⚠ **Đừng nhầm chu vi với diện tích**: chu vi đo **độ dài** (đơn vị bậc 1: m, cm) còn diện tích đo **mặt** (đơn vị bậc 2: m², cm²). Hai hình cùng chu vi có thể khác diện tích: hình chữ nhật $1\\times 9$ và $5\\times 5$ đều có chu vi $20$, nhưng diện tích $9$ vs $25$.

❓ **Câu hỏi tự nhiên của người đọc**

- *"Hình bình hành cũng đáy·cao như chữ nhật?"* Đúng — vì cắt 1 tam giác bên này ghép sang bên kia thành chữ nhật cùng đáy, cùng cao. "Cao" là khoảng cách vuông góc giữa 2 đáy, không phải cạnh xiên.
- *"Hình thoi vừa có công thức $\\frac{1}{2}d_1 d_2$ vừa đáy·cao?"* Có — hình thoi là hình bình hành đặc biệt (4 cạnh bằng), nên dùng được cả 2; $\\frac{1}{2}d_1 d_2$ tiện khi biết 2 đường chéo.
- *"Vì sao tam giác đều có $\\sqrt{3}$?"* Vì chiều cao tam giác đều cạnh $a = a\\sqrt{3}/2$ (từ Pythagoras trên nửa tam giác) → diện tích chứa $\\sqrt{3}$.

⚠ **Bốn lỗi thường gặp về diện tích**

**Lỗi 1 — quên hệ số $\\frac{1}{2}$ ở hình thang và hình thoi.** Phản ví dụ: hình thoi đường chéo 6, 8 — nếu tính $6\\cdot 8 = 48$ là sai (đó là diện tích chữ nhật bao quanh), đúng là $\\frac{1}{2}\\cdot 48 = 24$.

**Lỗi 2 — nhầm công thức hình thoi với hình bình hành.** Hình thoi dùng $\\frac{1}{2}d_1 d_2$ (hai **đường chéo**); hình bình hành dùng $a\\cdot h$ (đáy × **chiều cao**). Phản ví dụ: cho hình thoi đường chéo 6 và 8 (cạnh $=5$), nếu lỡ dùng "đáy × cao" với đáy $=5$ và lấy nhầm đường chéo $8$ làm "cao" → $5\\cdot 8 = 40$, **sai**; đúng là $\\frac{1}{2}\\cdot 6\\cdot 8 = 24$. Đường chéo $\\ne$ chiều cao.

**Lỗi 3 — dùng cạnh xiên làm chiều cao của hình bình hành.** Cho đáy $6$, cạnh xiên $5$, nếu viết $S = 6\\cdot 5 = 30$ là **sai** — phải lấy chiều cao vuông góc $h$. Nếu góc nghiêng $30^\\circ$ thì $h = 5\\sin 30^\\circ = 2.5$, $S = 6\\cdot 2.5 = 15$.

**Lỗi 4 — sai đơn vị.** Diện tích luôn là đơn vị **bình phương**. Nếu cạnh đo bằng cm thì diện tích là cm², không phải cm.

🔁 **Dừng lại tự kiểm tra**

1. Hình thang 2 đáy 3 và 7, cao 5. Diện tích?
2. Hình thoi có cạnh 5, một đường chéo 6. Diện tích? (gợi ý: 2 đường chéo vuông góc tại trung điểm)
3. Dùng Shoelace tính diện tích tam giác $(0,0), (6,0), (0,4)$.

<details><summary>Đáp án</summary>

1. $S = \\frac{1}{2}(3+7)\\cdot 5 = \\frac{1}{2}\\cdot 10\\cdot 5 =$ **25**.
2. Nửa đường chéo 1 $= 3$; nửa đường chéo 2 $= \\sqrt{5^2-3^2} = 4$ → đường chéo 2 $= 8$. $S = \\frac{1}{2}\\cdot 6\\cdot 8 =$ **24**.
3. Shoelace: $\\frac{1}{2}|(0\\cdot0-6\\cdot0)+(6\\cdot4-0\\cdot0)+(0\\cdot0-0\\cdot4)| = \\frac{1}{2}|24| =$ **12**. Kiểm: $\\frac{1}{2}\\cdot 6\\cdot 4 = 12$ ✓.

</details>

### 📝 Tóm tắt mục 2

- Diện tích = đếm ô vuông đơn vị; mọi công thức suy từ chữ nhật/tam giác bằng cắt-ghép.
- **Cây gia phả tứ giác**: vuông ⊂ (chữ nhật ∩ thoi) ⊂ bình hành ⊂ tứ giác; thang riêng (1 cặp cạnh //).
- Nhớ hệ số $\\frac{1}{2}$ ở **tam giác, hình thang, hình thoi**.
- Hình bình hành $a\\cdot h$ (chiều cao ⊥) vs hình thoi $\\frac{1}{2}d_1 d_2$ (2 đường chéo) — đừng lẫn.
- Tam giác đều cạnh a: $S = \\frac{\\sqrt{3}}{4}a^2$; lục giác đều $= 6$ tam giác đều $= \\frac{3\\sqrt{3}}{2}a^2$.
- **Shoelace** $S = \\frac{1}{2}|\\sum (x_i y_{i+1} - x_{i+1} y_i)|$ — tính diện tích đa giác từ tọa độ đỉnh.
- **Chu vi** = tổng cạnh (đơn vị bậc 1); diện tích đơn vị bậc 2. Cùng chu vi ≠ cùng diện tích.

---

## 3. Bài tập

### Bài tập

**Bài 1**: Tổng góc trong của bát giác (8 cạnh).

**Bài 2**: Mỗi góc trong của thập giác đều.

**Bài 3**: Hình thang cân, 2 đáy 5 và 11, cao 4. Tính diện tích.

**Bài 4**: Hình thoi 2 đường chéo 6 và 8. Tính diện tích và độ dài cạnh.

**Bài 5**: Sân bóng đá hình chữ nhật $105\\text{m} \\times 68\\text{m}$. Diện tích bao nhiêu m²?

**Bài 6**: Lục giác đều cạnh 4 cm. Tính diện tích.

**Bài 7**: Hình bình hành đáy 8, cạnh xiên 6 nghiêng góc $30^\\circ$ so với đáy. Tính diện tích (cẩn thận: dùng chiều cao, không dùng cạnh xiên).

**Bài 8**: Dùng công thức Shoelace tính diện tích tứ giác có các đỉnh (theo thứ tự ngược chiều kim đồng hồ) $(1,1), (5,1), (6,4), (2,5)$.

**Bài 9**: Tổng góc trong một đa giác lồi là $1260^\\circ$. Đa giác có bao nhiêu cạnh?

**Bài 10**: Một mảnh đất hình chữ nhật $20\\text{m}\\times 15\\text{m}$. Tính (a) diện tích, (b) chu vi, (c) nếu rào quanh giá 50.000 đ/m thì hết bao nhiêu tiền?

### Lời giải

**Bài 1**: $(8-2) \\cdot 180 =$ **$1080^\\circ$**.

**Bài 2**: $(10-2)\\cdot 180/10 = 1440/10 =$ **$144^\\circ$**.

**Bài 3**: $S = \\frac{1}{2}(5 + 11)\\cdot 4 = \\frac{1}{2}\\cdot 16\\cdot 4 =$ **32**.

**Bài 4**: $S = \\frac{1}{2}\\cdot 6\\cdot 8 =$ **24**. Cạnh $= \\sqrt{(6/2)^2 + (8/2)^2} = \\sqrt{9+16} =$ **5** (vì 2 đường chéo cắt nhau $\\perp$ tại trung điểm).

**Bài 5**: $105 \\times 68 =$ **7,140 m²**.

**Bài 6**: $S = \\frac{3\\sqrt{3}}{2}\\cdot 16 = 24\\sqrt{3} \\approx$ **41.57 cm²**.

**Bài 7**: Chiều cao vuông góc $h = 6\\cdot\\sin 30^\\circ = 6\\cdot 0.5 = 3$. Diện tích $S = \\text{đáy}\\cdot h = 8\\cdot 3 =$ **24**. (Lấy $8\\cdot 6 = 48$ là sai — đó là dùng cạnh xiên thay chiều cao.)

**Bài 8**: Liệt kê đỉnh và lặp đỉnh đầu ở cuối:

\`\`\`
   i    xᵢ    yᵢ        chéo xuống xᵢyᵢ₊₁    chéo lên xᵢ₊₁yᵢ
   1    1     1          1·1 = 1              5·1 = 5
   2    5     1          5·4 = 20             6·1 = 6
   3    6     4          6·5 = 30             2·4 = 8
   4    2     5          2·1 = 2              1·5 = 5
   1    1     1
\`\`\`

Tổng chéo xuống $= 1+20+30+2 = 53$. Tổng chéo lên $= 5+6+8+5 = 24$.
$$S = \\frac{1}{2}|53 - 24| = \\frac{1}{2}\\cdot 29 =$$ **14.5**.

**Bài 9**: Giải $(n-2)\\cdot 180 = 1260 \\Rightarrow n-2 = \\dfrac{1260}{180} = 7 \\Rightarrow n =$ **9** (cửu giác/nonagon).

**Bài 10**:
- (a) Diện tích $= 20\\times 15 =$ **300 m²**.
- (b) Chu vi $= 2(20+15) = 2\\cdot 35 =$ **70 m**.
- (c) Tiền rào $= 70\\times 50000 =$ **3.500.000 đ**.

---

## 4. Bài tiếp theo

[Lesson 05 — Hình học không gian](../lesson-05-solid-geometry/).

## 📝 Tổng kết

1. **Đa giác**: lồi (mọi góc $< 180^\\circ$) / lõm (có góc $> 180^\\circ$); đều (mọi cạnh + góc bằng nhau). Mẹo dây thun để phân biệt lồi/lõm.
2. **Tổng góc trong** $= (n-2)\\cdot 180^\\circ$ (chia $n-2$ tam giác từ 1 đỉnh). **Tổng góc ngoài** $= 360^\\circ$ (đi 1 vòng = rẽ đủ $360^\\circ$). Đa giác đều: mỗi góc trong $= \\frac{(n-2)180^\\circ}{n}$, mỗi góc ngoài $= \\frac{360^\\circ}{n}$.
3. **Đa giác đều $n$ cạnh** có $n$ trục đối xứng + đối xứng quay $\\frac{360^\\circ}{n}$.
4. **Tứ giác** (cây gia phả): vuông ⊂ chữ nhật ∩ thoi ⊂ bình hành ⊂ tứ giác; thang riêng. Diện tích: vuông $a^2$, chữ nhật $ab$, bình hành $a\\cdot h$, thoi $\\frac{1}{2}d_1 d_2$, thang $\\frac{1}{2}(a+b)h$.
5. **Diện tích đa giác bất kỳ**: chia tam giác, hoặc **Shoelace** $\\frac{1}{2}|\\sum(x_i y_{i+1} - x_{i+1} y_i)|$ từ tọa độ.
6. **Lục giác đều** = 6 tam giác đều ghép, $S = \\frac{3\\sqrt{3}}{2}a^2$.
7. **Chu vi** (đơn vị bậc 1) ≠ diện tích (đơn vị bậc 2); cùng chu vi không suy ra cùng diện tích.
`;
