// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: Math/02-Geometry/lesson-02-triangles/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 02 — Tam giác

## Mục tiêu

- Phân loại tam giác theo cạnh và góc.
- Hiểu các **trường hợp bằng nhau** (SSS, SAS, ASA) và **đồng dạng** (AAA, SAS, SSS) của tam giác.
- Áp dụng **định lý Pythagoras** cho tam giác vuông.
- Tính diện tích tam giác bằng nhiều công thức.

## Kiến thức tiền đề

- [Lesson 01 — Cơ sở Euclid](../lesson-01-euclidean-basics/).

---

## 1. Tam giác là gì?

**Tam giác** = hình 3 cạnh tạo bởi 3 điểm không thẳng hàng.

💡 **Là gì**: hình đa giác đơn giản nhất, với 3 đỉnh, 3 cạnh, 3 góc trong.

\`\`\`
                A
               /\\
              /  \\
          c  /    \\  b
            /      \\
           /        \\
          /__________\\
         B     a      C

 3 đỉnh (vertex): A, B, C
 3 cạnh (side):   a = BC (đối A), b = CA (đối B), c = AB (đối C)
 3 góc trong (interior angle): Â + B̂ + Ĉ = 180°
\`\`\`

> **Quy ước ký hiệu (rất hay dùng)**: cạnh viết **chữ thường**, được đặt tên theo **đỉnh đối diện** nó. Cạnh $a$ đối diện đỉnh $A$, cạnh $b$ đối diện $B$, cạnh $c$ đối diện $C$. Nhờ vậy khi viết $\\frac{a}{\\sin A}$ ta hiểu ngay $a$ và $A$ là cặp "cạnh — góc đối diện".

**Quy tắc cơ bản**:
- **Tổng 3 góc trong $= 180^\\circ$** (hệ quả của tiên đề Euclid 5).
- **Bất đẳng thức tam giác**: cạnh bất kỳ $<$ tổng 2 cạnh còn lại. (Nếu vi phạm → không thể vẽ được tam giác.)

> 📐 **Định nghĩa đầy đủ — Tam giác**
>
> **(a) Là gì**: Hình đóng tạo bởi 3 đoạn thẳng (cạnh) nối 3 điểm không thẳng hàng (đỉnh). Có đúng 3 góc trong tổng cộng đúng $180^\\circ$.
>
> **(b) Vì sao cần**: Tam giác là hình đa giác **đơn giản nhất** (ít cạnh nhất có thể). Đặc biệt **cứng vững** — 3 cạnh xác định duy nhất 1 tam giác (không "vặn vẹo" được như tứ giác). Đó là lý do dùng tam giác trong kết cấu xây dựng (kèo nhà, cầu, giàn giáo) và trong định vị (lưới tam giác đo đạc, GPS).
>
> **(c) Ví dụ số**: Cạnh 3, 4, 5 → kiểm tra bất đẳng thức: $3+4=7 > 5$ ✓, $3+5=8 > 4$ ✓, $4+5=9 > 3$ ✓ → vẽ được. Cạnh 1, 2, 5 → $1+2=3 < 5$ → KHÔNG vẽ được. Cạnh 1, 2, 3 → $1+2=3 = 3$, biên giới (3 điểm thẳng hàng, "tam giác suy biến"). Cạnh 6, 6, 6 → tam giác đều, 3 góc $= 60^\\circ$.

💡 **Trực giác / Hình dung — bất đẳng thức tam giác**: muốn nối A tới C, đi thẳng (cạnh AC) luôn ngắn hơn đi vòng qua B ($AB + BC$). "Đường thẳng là đường ngắn nhất" — đó chính là bất đẳng thức tam giác. Nếu cạnh dài nhất $\\ge$ tổng 2 cạnh kia thì 2 cạnh ngắn "với không tới nhau", không khép kín được thành tam giác.

\`\`\`
          B
         /\\
    AB  /  \\  BC          Đi vòng A→B→C: dài AB + BC
       /    \\             Đi thẳng A→C:   dài AC
      /      \\            ⇒ AC < AB + BC  (luôn đúng)
     A--------C
          AC

 Trường hợp BIÊN — 3 điểm thẳng hàng (suy biến):
     A--------B--------C   ⇒ AC = AB + BC  (không còn là tam giác)

 Trường hợp HỎNG — cạnh dài nhất vượt tổng 2 cạnh kia:
     A------B    C        ⇒ B "với" không tới C, không khép kín
\`\`\`

Phát biểu chính thức bằng công thức cho 3 cạnh $a, b, c$:

$$a < b + c, \\qquad b < a + c, \\qquad c < a + b$$

Thực tế chỉ cần kiểm **cạnh lớn nhất $<$ tổng 2 cạnh còn lại** là đủ (2 bất đẳng thức kia tự đúng vì cạnh nhỏ chắc chắn nhỏ hơn tổng có chứa cạnh lớn nhất).

**4 ví dụ kiểm bất đẳng thức tam giác**:

| Bộ cạnh | Cạnh lớn nhất | Tổng 2 cạnh kia | So sánh | Kết luận |
|---------|:---:|:---:|:---:|----------|
| 3, 4, 5 | 5 | $3+4=7$ | $5 < 7$ | ✓ vẽ được |
| 6, 8, 13 | 13 | $6+8=14$ | $13 < 14$ | ✓ vẽ được (sát biên) |
| 2, 3, 6 | 6 | $2+3=5$ | $6 > 5$ | ✗ KHÔNG vẽ được |
| 1, 2, 3 | 3 | $1+2=3$ | $3 = 3$ | ✗ suy biến (thẳng hàng) |

❓ **Câu hỏi tự nhiên của người đọc**

- *"Vì sao tổng 3 góc luôn đúng $180^\\circ$?"* Kẻ qua đỉnh A 1 đường thẳng song song cạnh BC. Hai góc B, C "chuyển" lên đỉnh A nhờ góc so le trong (Lesson 01), ghép với góc A thành 1 góc bẹt $= 180^\\circ$. Xem chứng minh từng bước ở mục dưới.

💡 **Chứng minh tổng 3 góc $= 180^\\circ$ (từng bước, không "dễ thấy")**

\`\`\`
       x   A   y         Kẻ đường d qua A, SONG SONG với BC.
        \\  |  /          d cắt ra 3 góc tại A: x̂, Â, ŷ — cùng nằm
     d --\\--+--/-- d      trên 1 nửa mặt phẳng ⇒ x̂ + Â + ŷ = 180°
          \\ | /                                  (góc bẹt).
           \\|/
            *  A
           /|\\
          / | \\
         /  |  \\
        /   |   \\
       B---------C
\`\`\`

Bước 1. Kẻ đường thẳng $d$ qua $A$ song song với $BC$. Ba góc tại $A$ là $\\hat{x}$ (bên trái), $\\hat{A}$ (giữa, chính là góc của tam giác), $\\hat{y}$ (bên phải). Chúng tạo thành 1 góc bẹt nên:
$$\\hat{x} + \\hat{A} + \\hat{y} = 180^\\circ$$

Bước 2. Vì $d \\parallel BC$, cạnh $AB$ là **cát tuyến** cắt 2 đường song song ⇒ $\\hat{x}$ và $\\hat{B}$ là **góc so le trong** (alternate interior angles, Lesson 01) ⇒ $\\hat{x} = \\hat{B}$.

Bước 3. Tương tự, cạnh $AC$ là cát tuyến ⇒ $\\hat{y}$ và $\\hat{C}$ là góc so le trong ⇒ $\\hat{y} = \\hat{C}$.

Bước 4. Thay vào đẳng thức ở Bước 1:
$$\\hat{B} + \\hat{A} + \\hat{C} = 180^\\circ \\quad ✓$$

Đây là **hệ quả trực tiếp của tiên đề song song** (Euclid 5). Trong hình học phi-Euclid (mặt cầu), tổng 3 góc $> 180^\\circ$ — đó là vì tiên đề song song không còn đúng.
- *"Bằng nhau ở 2 cạnh, khác cạnh thứ 3 thì sao?"* Vẫn là tam giác miễn thỏa bất đẳng thức. Vd 5, 5, 1 (cân, rất "dẹt") vẫn hợp lệ vì $5+1 > 5$.
- *"3 cạnh có xác định duy nhất 1 tam giác không?"* Có (đó là trường hợp SSS ở mục 3) — khác với tứ giác (4 cạnh không xác định duy nhất, có thể "vặn").

⚠ **Lỗi thường gặp**: chỉ kiểm 1 bất đẳng thức rồi kết luận. Phải kiểm **cạnh lớn nhất $<$ tổng 2 cạnh còn lại** (đủ). Phản ví dụ: cạnh 2, 3, 6 — nếu chỉ xét $3+6=9 > 2$ thì tưởng được, nhưng cạnh lớn nhất 6 so với $2+3=5 < 6$ → **KHÔNG** vẽ được.

🔁 **Dừng lại tự kiểm tra**

1. Bộ cạnh nào tạo được tam giác: (a) 4, 5, 8; (b) 3, 4, 7; (c) 2, 2, 5?
2. Tam giác có 2 góc $50^\\circ$ và $70^\\circ$. Góc thứ 3 bằng bao nhiêu?

<details><summary>Đáp án</summary>

1. (a) $4+5=9 > 8$ ✓ → được. (b) $3+4=7 = 7$ → suy biến (thẳng hàng), không được. (c) $2+2=4 < 5$ → không được.
2. $180 - 50 - 70 =$ **$60^\\circ$**.

</details>

### 📝 Tóm tắt mục 1

- Tam giác = 3 điểm không thẳng hàng nối thành hình kín; 3 đỉnh, 3 cạnh, 3 góc.
- Tổng 3 góc trong **luôn $= 180^\\circ$** (hệ quả tiên đề song song).
- **Bất đẳng thức tam giác**: cạnh lớn nhất $<$ tổng 2 cạnh kia (điều kiện vẽ được).
- Tam giác là đa giác đơn giản nhất và "cứng vững" — dùng trong kết cấu, định vị.

---

## 2. Phân loại tam giác

### Theo cạnh

| Loại | Tính chất |
|------|-----------|
| **Đều** (equilateral) | 3 cạnh bằng nhau → 3 góc bằng nhau $= 60^\\circ$ |
| **Cân** (isosceles) | 2 cạnh bằng → 2 góc đáy bằng |
| **Thường** (scalene) | 3 cạnh khác nhau |

\`\`\`
   ĐỀU (equilateral)      CÂN (isosceles)       THƯỜNG (scalene)
        /\\                     /\\                      /\\
       /  \\                   /  \\                    /  \\
      / 60°\\                 /    \\                  /    \\____
     /      \\               /      \\                /         \\___
    /________\\             /________\\              /______________\\
   60°      60°          đáy: 2 góc =             3 cạnh, 3 góc khác
  3 cạnh =, 3 góc =     2 cạnh bên = nhau         nhau hoàn toàn
\`\`\`

### Theo góc

| Loại | Tính chất |
|------|-----------|
| **Nhọn** (acute) | 3 góc $< 90^\\circ$ |
| **Vuông** (right) | 1 góc $= 90^\\circ$ |
| **Tù** (obtuse) | 1 góc $> 90^\\circ$ |

\`\`\`
   NHỌN (acute)          VUÔNG (right)          TÙ (obtuse)
        /\\                  |\\                    ______
       /  \\                 | \\                   \\     ‾‾---___
      /    \\                |  \\                    \\  >90°     ‾‾--__
     /      \\               |___\\                    \\________________
    /________\\           góc vuông 90°            1 góc > 90°
  cả 3 góc < 90°        ở đỉnh dưới-trái         (góc "mở rộng")
\`\`\`

💡 **Trực giác / Hình dung**: phân loại theo cạnh đo "mức đối xứng" (đều = đối xứng nhất, cân = đối xứng 1 trục, thường = không đối xứng). Phân loại theo góc đo "độ nhọn/tù" của góc lớn nhất. Hai cách phân loại độc lập — 1 tam giác vừa có loại cạnh vừa có loại góc (vd "cân vuông": 2 cạnh bằng + 1 góc vuông).

**Cách kiểm loại theo góc khi chỉ biết 3 cạnh** (không cần đo góc): so sánh $c^2$ với $a^2 + b^2$ trong đó $c$ là cạnh lớn nhất.

$$\\begin{aligned}
c^2 = a^2 + b^2 &\\;\\Rightarrow\\; \\text{vuông} \\\\
c^2 < a^2 + b^2 &\\;\\Rightarrow\\; \\text{nhọn (góc lớn nhất < 90°)} \\\\
c^2 > a^2 + b^2 &\\;\\Rightarrow\\; \\text{tù (góc lớn nhất > 90°)}
\\end{aligned}$$

**6 ví dụ số đa dạng** (kết hợp cả 2 cách phân loại):

| Dữ kiện | Theo cạnh | Theo góc | Kiểm tra |
|---------|-----------|----------|----------|
| Cạnh 5, 5, 5 | đều | nhọn | 3 góc $= 60^\\circ < 90^\\circ$ |
| Cạnh 5, 5, 8 | cân | tù | $8^2 = 64 > 5^2+5^2 = 50$ → tù |
| Cạnh 5, 5, 6 | cân | nhọn | $6^2 = 36 < 5^2+5^2 = 50$ → nhọn |
| Góc $30^\\circ, 60^\\circ, 90^\\circ$ | thường | vuông | có góc $90^\\circ$ |
| Góc $100^\\circ, 40^\\circ, 40^\\circ$ | cân | tù | góc $100^\\circ > 90^\\circ$ |
| Cạnh 3, 4, 5 | thường | vuông | $5^2 = 25 = 3^2+4^2$ → vuông |

Lưu ý ví dụ thứ 2 vs thứ 3: cùng là tam giác **cân** đáy khác nhau (8 vs 6) nhưng một cái **tù**, một cái **nhọn** — phân loại cạnh và góc thực sự độc lập.

❓ **Câu hỏi tự nhiên của người đọc**

- *"Tam giác đều có phải tam giác cân không?"* Có — đều là trường hợp đặc biệt của cân (cân cần $\\ge 2$ cạnh bằng, đều có cả 3 bằng).
- *"Có tam giác vừa vuông vừa tù không?"* Không. Một tam giác có nhiều nhất 1 góc $\\ge 90^\\circ$ (vì tổng $180^\\circ$, nếu 2 góc $\\ge 90^\\circ$ thì tổng $\\ge 180^\\circ$, không còn chỗ cho góc thứ 3).
- *"Tam giác cân thì 2 góc nào bằng nhau?"* Hai góc **đối diện** 2 cạnh bằng nhau (gọi là 2 góc đáy) bằng nhau.

⚠ **Lỗi thường gặp**: nghĩ "tam giác có 1 góc nhọn là tam giác nhọn". Sai — **nhọn** đòi hỏi **cả 3** góc $< 90^\\circ$. Phản ví dụ: tam giác $100^\\circ, 50^\\circ, 30^\\circ$ có 2 góc nhọn nhưng vẫn là tam giác **tù** (vì có góc $100^\\circ$).

🔁 **Dừng lại tự kiểm tra**

1. Tam giác có góc $90^\\circ, 45^\\circ, 45^\\circ$ thuộc loại nào (theo cả cạnh và góc)?
2. Tam giác có thể vừa đều vừa vuông không?

<details><summary>Đáp án</summary>

1. Vuông (có góc $90^\\circ$) + cân (2 góc $45^\\circ$ bằng → 2 cạnh bằng) → "tam giác vuông cân".
2. Không. Đều → 3 góc đều $60^\\circ$ → không có góc $90^\\circ$.

</details>

### 📝 Tóm tắt mục 2

- Theo cạnh: đều (3 cạnh =), cân (2 cạnh =), thường (3 cạnh khác).
- Theo góc: nhọn (3 góc $< 90^\\circ$), vuông (1 góc $= 90^\\circ$), tù (1 góc $> 90^\\circ$).
- Một tam giác có **nhiều nhất 1** góc $\\ge 90^\\circ$.
- Đều là trường hợp đặc biệt của cân; phân loại cạnh và góc độc lập, kết hợp được.

---

## 3. Tam giác bằng nhau (Congruence)

Hai tam giác **bằng nhau** = cùng kích thước và hình dạng (đặt chồng lên nhau khít).

💡 **Trực giác / Hình dung**: 2 tam giác bằng nhau giống 2 bản in cùng 1 khuôn — có thể xoay, lật, dời để chồng khít hoàn toàn. Câu hỏi cốt lõi: cần biết **tối thiểu mấy yếu tố** (cạnh/góc) để chắc chắn 2 tam giác giống hệt? Đáp án: 3 yếu tố, sắp đúng kiểu (SSS, SAS, ASA, AAS).

### 3 trường hợp chứng minh bằng nhau

1. **SSS (Side-Side-Side)**: 3 cạnh tương ứng bằng nhau.
2. **SAS (Side-Angle-Side)**: 2 cạnh + góc kẹp giữa bằng nhau.
3. **ASA (Angle-Side-Angle)**: 2 góc + cạnh kẹp giữa bằng nhau.

\`\`\`
   SSS                    SAS                    ASA
   3 cạnh =               2 cạnh + góc KẸP =     2 góc + cạnh KẸP =
       /\\                     /\\                     /\\
    c /  \\ a              c /∠α\\ a              ∠β /  \\ ∠γ
     /____\\                 /____\\                 /____\\
       b                      b                      b
   biết a,b,c            biết c, ∠α, a          biết ∠β, b, ∠γ
   (∠ ở giữa 2 cạnh)     (cạnh KẸP giữa 2 góc)
\`\`\`

Trong SAS, góc **phải nằm giữa** 2 cạnh đã biết. Trong ASA, cạnh **phải nằm giữa** 2 góc đã biết. "Kẹp giữa" là từ khóa quyết định.

Có thêm: **AAS** (2 góc + 1 cạnh không kẹp giữa — vẫn xác định duy nhất vì biết 2 góc → biết góc thứ 3, từ đó quy về ASA).

**Lưu ý**: SSA (2 cạnh + 1 góc không kẹp) KHÔNG đảm bảo bằng nhau (vì có thể có 2 tam giác khác nhau thỏa mãn — "trường hợp mơ hồ").

\`\`\`
 Vì sao SSA mơ hồ — cạnh "với" tới 2 vị trí:
                C₁      C₂
                 \\      /\\
              a   \\    /  \\  a   (cùng độ dài a)
                   \\  /    \\
            ∠------- \\/------\\-------
            A    cạnh b biết   (cùng góc A, cùng cạnh b)
   ⇒ Hai tam giác AC₁ và AC₂ KHÁC nhau nhưng cùng (b, a, ∠A).
\`\`\`

❓ **Câu hỏi tự nhiên của người đọc**

- *"Vì sao 3 cạnh (SSS) là đủ mà 3 góc (AAA) lại không?"* Vì 3 cạnh khóa chặt cả kích thước lẫn hình dạng. 3 góc chỉ khóa hình dạng — 2 tam giác cùng góc nhưng to nhỏ khác nhau (đó là **đồng dạng**, không phải bằng nhau).
- *"Vì sao SSA không đủ?"* Vì cạnh đối diện góc đã cho có thể "với" tới đường kia ở 2 vị trí khác nhau → 2 tam giác khác. Đây gọi là "trường hợp mơ hồ" (ambiguous case). Ngoại lệ: nếu góc đó là góc vuong/tù thì lại đủ.
- *"AAS có khác ASA không?"* Khác vị trí cạnh: ASA cạnh **kẹp giữa** 2 góc, AAS cạnh **không kẹp**. Cả hai đều đủ vì biết 2 góc thì suy ra góc thứ 3, đưa về ASA.

⚠ **Lỗi thường gặp**: dùng "SSA" để kết luận bằng nhau. Phản ví dụ: 2 tam giác cùng có cạnh 5, cạnh 7 và góc $30^\\circ$ (không kẹp giữa) có thể khác nhau hoàn toàn — cạnh thứ 3 ra 2 giá trị. Phải có góc **kẹp giữa** (SAS) mới chắc.

🔁 **Dừng lại tự kiểm tra**

1. Biết 2 tam giác có 2 cạnh 6 và 8, góc kẹp giữa chúng đều $50^\\circ$. Chúng có bằng nhau không? Theo trường hợp nào?
2. Hai tam giác có 3 cặp góc bằng nhau. Bằng nhau hay chỉ đồng dạng?

<details><summary>Đáp án</summary>

1. Bằng nhau, theo **SAS** (cạnh–góc kẹp–cạnh).
2. Chỉ **đồng dạng** (AAA không xác định kích thước).

</details>

### 📝 Tóm tắt mục 3

- Bằng nhau = chồng khít hoàn toàn (cùng cả kích thước lẫn hình dạng).
- 4 dấu hiệu đủ: **SSS, SAS, ASA, AAS**.
- **SSA** và **AAA** KHÔNG đủ (SSA mơ hồ; AAA chỉ cho đồng dạng).
- Cần đúng 3 yếu tố sắp đúng kiểu; trong đó phải có ít nhất 1 cạnh.

---

## 4. Tam giác đồng dạng (Similarity)

Hai tam giác **đồng dạng** = cùng hình dạng nhưng có thể khác kích thước. Mọi cạnh tương ứng có **tỉ lệ bằng nhau**.

💡 **Trực giác / Hình dung**: đồng dạng giống ảnh và bản phóng to của nó — mọi chi tiết giữ nguyên tỉ lệ, chỉ khác kích thước tổng. Bóng của 1 cây và bóng của cái cọc cùng lúc tạo 2 tam giác đồng dạng (cùng góc nắng) → đo cọc + bóng để tính chiều cao cây (cách Thales đo kim tự tháp).

### 3 trường hợp đồng dạng

1. **AAA** (3 góc bằng): chỉ cần 2 góc bằng nhau (góc thứ 3 tự suy ra) — gọi là **AA**.
2. **SAS**: tỉ lệ 2 cặp cạnh bằng + góc kẹp giữa bằng.
3. **SSS**: tỉ lệ 3 cặp cạnh bằng.

### Hệ quả quan trọng

Nếu tam giác ABC đồng dạng A'B'C' với tỉ số k, thì:
- Mọi cạnh ABC $\\times k =$ cạnh tương ứng A'B'C'.
- Diện tích A'B'C' $= k^2 \\times$ diện tích ABC.
- Chu vi A'B'C' $= k \\times$ chu vi ABC.

**Verify bằng số**: tam giác cạnh 3-4-5 (chu vi 12, diện tích $\\frac{1}{2}\\cdot 3\\cdot 4 = 6$) đồng dạng tỉ số $k=2$ → cạnh 6-8-10, chu vi $24 = 12\\cdot 2$ ✓, diện tích $\\frac{1}{2}\\cdot 6\\cdot 8 = 24 = 6\\cdot 2^2 = 6\\cdot 4$ ✓. Tỉ số diện tích $=$ **$k^2$**, không phải $k$.

\`\`\`
   ABC (nhỏ)            A'B'C' (lớn, k = 2)
       /\\                    /\\
    5 /  \\ 4             10 /  \\ 8       mọi cạnh × 2
     /____\\                /______\\
       3                       6
  S = 6, P = 12          S = 24, P = 24
                         P' = k·P = 2·12  ✓
                         S' = k²·S = 4·6  ✓
\`\`\`

### Walk-through đồng dạng — tìm cạnh thiếu bằng tỉ số

**Ví dụ 1 (bóng cây — kiểu Thales)**: cọc cao 2 m đổ bóng 3 m; cùng lúc cây đổ bóng 12 m. Cây cao bao nhiêu? Hai tam giác (cọc–bóng) và (cây–bóng) **đồng dạng** vì cùng góc nắng (AA).

\`\`\`
   |\\                          |\\
 2m| \\  cọc                    | \\
   |  \\                      h |  \\   cây
   |___\\                       |    \\
    3m                         |      \\
                               |________\\
                                  12m
\`\`\`

Bước 1. Lập tỉ số cạnh tương ứng (chiều cao / bóng giữ nguyên):
$$\\frac{h_{\\text{cây}}}{h_{\\text{cọc}}} = \\frac{\\text{bóng cây}}{\\text{bóng cọc}} = \\frac{12}{3} = 4 = k$$

Bước 2. Suy ra chiều cao cây:
$$h_{\\text{cây}} = k \\cdot h_{\\text{cọc}} = 4 \\cdot 2 = \\textbf{8 m}$$

**Ví dụ 2 (đường nối trung điểm)**: tam giác $ABC$ có $DE \\parallel BC$ với $D$ trên $AB$, $E$ trên $AC$. Biết $AD = 4$, $DB = 6$, $BC = 15$. Tìm $DE$.

Bước 1. $DE \\parallel BC$ ⇒ $\\triangle ADE \\sim \\triangle ABC$ (góc $A$ chung + góc đồng vị bằng nhau → AA).

Bước 2. Tỉ số $k = \\dfrac{AD}{AB} = \\dfrac{AD}{AD + DB} = \\dfrac{4}{4+6} = \\dfrac{4}{10} = 0.4$.

Bước 3. $DE = k \\cdot BC = 0.4 \\cdot 15 = \\textbf{6}$.

❓ **Câu hỏi tự nhiên của người đọc**

- *"Vì sao diện tích nhân $k^2$ chứ không phải $k$?"* Vì diện tích là "2 chiều" — cả chiều dài lẫn chiều rộng đều nhân $k$ → $k\\cdot k = k^2$. Hình dung: phóng to gấp đôi ($k=2$) thì cần 4 ô gạch thay vì 1.
- *"AA và AAA có giống nhau không?"* Giống về kết quả: chỉ cần 2 góc bằng (AA) là đủ, vì góc thứ 3 $= 180 - (2$ góc kia$)$ tự bằng nhau.
- *"Bằng nhau có phải là đồng dạng không?"* Có — bằng nhau là đồng dạng với tỉ số $k = 1$.

⚠ **Lỗi thường gặp**: lấy tỉ số diện tích = tỉ số cạnh. Phản ví dụ: 2 tam giác đồng dạng tỉ số cạnh $k = 3$ thì tỉ số diện tích $=$ **9** ($= 3^2$), không phải 3. Tương tự, tỉ số thể tích của 2 khối đồng dạng $= k^3$.

⚠ **Lỗi thường gặp — nhầm điều kiện ĐỒNG DẠNG với BẰNG NHAU**: nhìn bề ngoài chữ viết tắt giống nhau (SAS, SSS) nên dễ lẫn. Khác biệt cốt lõi:

| Dấu hiệu | Bằng nhau (congruence) | Đồng dạng (similarity) |
|----------|------------------------|------------------------|
| 3 cạnh | **SSS**: cạnh **bằng** nhau | **SSS**: cạnh **tỉ lệ** (cùng $k$) |
| 2 cạnh + góc kẹp | **SAS**: cạnh **bằng** | **SAS**: cạnh **tỉ lệ** + góc bằng |
| Góc | **không** có AAA | **AA**: chỉ cần 2 góc bằng |
| Kết quả | cùng kích thước & hình dạng | cùng hình dạng, kích thước có thể khác |

Phản ví dụ: 2 tam giác cùng 3 góc $\\{40^\\circ, 60^\\circ, 80^\\circ\\}$ là **đồng dạng** (AA) nhưng **không** chắc bằng nhau — một cái có thể cạnh 4-6-8, cái kia 8-12-16. Ngược lại, hễ **bằng nhau** thì luôn **đồng dạng** (với $k = 1$), nhưng đồng dạng KHÔNG suy ra bằng nhau.

🔁 **Dừng lại tự kiểm tra**

1. Hai tam giác đồng dạng, tỉ số cạnh 5:2. Tỉ số diện tích là bao nhiêu?
2. Tam giác có góc $40^\\circ$ và $60^\\circ$, tam giác kia có góc $60^\\circ$ và $80^\\circ$. Đồng dạng không?

<details><summary>Đáp án</summary>

1. $(5/2)^2 =$ **$25/4$** $= 6.25$.
2. Tam giác 1: góc thứ 3 $= 80^\\circ$ → bộ góc {40, 60, 80}. Tam giác 2: thứ 3 $= 40^\\circ$ → {60, 80, 40} = cùng bộ → **đồng dạng** (AA).

</details>

### 📝 Tóm tắt mục 4

- Đồng dạng = cùng hình dạng, khác kích thước; cạnh tương ứng tỉ lệ $k$.
- 3 dấu hiệu: **AA** (đủ), **SAS** (tỉ lệ 2 cạnh + góc kẹp), **SSS** (tỉ lệ 3 cạnh).
- Tỉ số cạnh $= k$ → tỉ số chu vi $= k$, **tỉ số diện tích $= k^2$** (3D: thể tích $= k^3$).
- Bằng nhau = đồng dạng với $k = 1$.

---

## 5. Định lý Pythagoras

Tam giác **vuông** với 2 cạnh góc vuông a, b và cạnh huyền c:

$$a^2 + b^2 = c^2$$

\`\`\`
        |\\
        | \\
      b |  \\  c  (cạnh huyền — đối diện góc vuông, DÀI NHẤT)
        |   \\
        |____\\
          a    └ góc vuông 90°

  a, b = cạnh góc vuông (leg)
  c    = cạnh huyền (hypotenuse) = √(a² + b²)
\`\`\`

💡 **Là gì**: trong tam giác vuông, bình phương cạnh huyền = tổng bình phương 2 cạnh góc vuông.

**Vì sao quan trọng?** Vì:
- Định lý nổi tiếng nhất hình học, biết ~ 4000 năm trước.
- Cơ sở cho **khoảng cách** trong tọa độ: $d = \\sqrt{(x_2-x_1)^2 + (y_2-y_1)^2}$.
- Liên kết hình học và đại số.

> 📐 **Định nghĩa đầy đủ — Pythagore**
>
> **(a) Là gì**: 1 quan hệ số học giữa 3 cạnh tam giác **vuông**. Không phải định nghĩa của tam giác — mà là 1 **định luật** đúng cho mọi tam giác vuông. Cạnh huyền c (đối diện góc vuông) luôn thoả: $c^2 = a^2 + b^2$.
>
> **(b) Vì sao cần**: Trước Pythagore, không có cách tính cạnh huyền từ 2 cạnh kia. Định lý cho **công thức đại số** thay vì phải đo. Quan trọng hơn — nó là cầu nối hình học ↔ đại số (sau này thành nền cho tọa độ Đề-các, khoảng cách trong $\\mathbb{R}^n$, độ dài vector). Mọi công thức khoảng cách trong vũ trụ đều xuất phát từ đây.
>
> **(c) Ví dụ số**: Tam giác vuông $a=3$, $b=4$: $c^2 = 9 + 16 = 25$ → $c = 5$. Tam giác vuông $a=5$, $b=12$: $c^2 = 25 + 144 = 169$ → $c = 13$. Đảo lại: tam giác cạnh 6-8-10 có vuông không? $6^2 + 8^2 = 36+64 = 100 = 10^2$ ✓ → vuông. Tam giác 4-5-6: $16+25 = 41 \\neq 36$ → KHÔNG vuông.

### Chứng minh trực giác — Bằng diện tích

Vẽ hình vuông cạnh $(a+b) \\times (a+b)$, chia thành 4 tam giác vuông + 1 hình vuông cạnh c ở giữa:

\`\`\`
   +--a--+----b----+      Hình vuông lớn cạnh (a+b).
   |    /          |      4 tam giác vuông (cạnh a, b, huyền c)
   b   /           a      xếp ở 4 góc, để lại 1 hình vuông
   |  / c       c  |      NGHIÊNG cạnh c ở chính giữa.
   | /             |
   +     (c×c)     +      Diện tích lớn = 4 tam giác + ô vuông giữa:
   |             \\ |        (a+b)² = 4·(½ab) + c²
   a  c       c    b
   |  \\            |
   |   \\           |
   +----b----+--a--+
\`\`\`

$$\\begin{aligned}
(a+b)^2 &= 4 \\cdot \\left(\\tfrac{1}{2}ab\\right) + c^2 \\\\
a^2 + 2ab + b^2 &= 2ab + c^2 \\\\
a^2 + b^2 &= c^2 \\quad ✓
\\end{aligned}$$

### Ví dụ — Bộ ba Pythagoras nguyên

| a | b | c |
|---|---|---|
| 3 | 4 | 5 |
| 5 | 12 | 13 |
| 8 | 15 | 17 |
| 7 | 24 | 25 |

Bất kỳ bội số nào của bộ Pythagoras cũng là bộ Pythagoras (vd 6-8-10, 9-12-15).

### Walk-through Pythagoras — 3 ví dụ tìm cạnh thiếu

**Ví dụ A — tìm cạnh huyền** (biết 2 cạnh góc vuông $a=9$, $b=12$):
$$\\begin{aligned}
c^2 &= a^2 + b^2 = 9^2 + 12^2 \\\\
    &= 81 + 144 = 225 \\\\
c   &= \\sqrt{225} = \\textbf{15}
\\end{aligned}$$
Kiểm: $9$-$12$-$15 = 3\\times(3$-$4$-$5)$ → đúng là bội của bộ kinh điển.

**Ví dụ B — tìm cạnh góc vuông** (biết cạnh huyền $c=13$, một cạnh $a=5$). Chuyển vế:
$$\\begin{aligned}
b^2 &= c^2 - a^2 = 13^2 - 5^2 \\\\
    &= 169 - 25 = 144 \\\\
b   &= \\sqrt{144} = \\textbf{12}
\\end{aligned}$$
Lưu ý dấu **trừ** vì đang tìm cạnh góc vuông, không phải huyền.

**Ví dụ C — bài toán thực tế (cái thang)**: thang dài $5$ m dựng vào tường, chân thang cách tường $3$ m. Thang chạm tường ở độ cao nào? Thang là cạnh huyền $c=5$, khoảng cách chân $a=3$, chiều cao $b$ cần tìm:
$$b = \\sqrt{c^2 - a^2} = \\sqrt{25 - 9} = \\sqrt{16} = \\textbf{4 m}$$

### Định lý đảo Pythagoras — kiểm tra tam giác có vuông không

Nếu $c^2 = a^2 + b^2$ (với $c$ là cạnh dài nhất) thì tam giác **vuông**. Đây là cách kiểm vuông mà không cần đo góc:

| Bộ cạnh | $c^2$ (cạnh lớn nhất) | $a^2 + b^2$ | So sánh | Kết luận |
|---------|:---:|:---:|:---:|----------|
| 6, 8, 10 | $100$ | $36+64=100$ | $=$ | vuông ✓ |
| 5, 12, 13 | $169$ | $25+144=169$ | $=$ | vuông ✓ |
| 4, 5, 6 | $36$ | $16+25=41$ | $<$ | nhọn |
| 5, 5, 8 | $64$ | $25+25=50$ | $>$ | tù |

❓ **Câu hỏi tự nhiên của người đọc**

- *"Định lý chỉ đúng cho tam giác vuông?"* Đúng. Với tam giác **không** vuông phải dùng định lý cosin: $c^2 = a^2 + b^2 - 2ab\\cdot\\cos(C)$. Khi $C = 90^\\circ$, $\\cos 90^\\circ = 0$ → quay về Pythagoras.
- *"Làm sao biết cạnh nào là cạnh huyền?"* Cạnh huyền luôn là cạnh **dài nhất** và **đối diện góc vuông**. Trong 3-4-5 thì 5 là huyền.
- *"Định lý đảo dùng để làm gì?"* Để **kiểm tra** 1 tam giác có vuông không mà không cần đo góc: nếu $c^2 = a^2 + b^2$ thì vuông. Vd 6-8-10: $36+64 = 100 = 10^2$ → vuông.

⚠ **Lỗi thường gặp**: cộng cạnh thay vì cộng bình phương — viết "$c = a + b$". Phản ví dụ: $a=3$, $b=4$ → $c = 7$ là **sai**, đúng phải $c = \\sqrt{9+16} = 5$. Lỗi thứ 2: gán nhầm cạnh huyền — với $a=6$, $b=8$ mà tính $6^2 + 10^2$ rồi lấy 8 làm huyền là sai (8 không phải dài nhất).

🔁 **Dừng lại tự kiểm tra**

1. Tam giác vuông có 2 cạnh góc vuông 9 và 12. Cạnh huyền bằng bao nhiêu?
2. Tam giác cạnh 7, 24, 25 có vuông không?

<details><summary>Đáp án</summary>

1. $c = \\sqrt{81 + 144} = \\sqrt{225} =$ **15** (bộ 9-12-15 $= 3\\cdot(3$-$4$-$5)$).
2. $7^2 + 24^2 = 49 + 576 = 625 = 25^2$ ✓ → **vuông**.

</details>

### 📝 Tóm tắt mục 5

- Tam giác **vuông**: $a^2 + b^2 = c^2$ (c là cạnh huyền, dài nhất, đối diện góc vuông).
- Chứng minh trực giác bằng diện tích hình vuông $(a+b)^2$.
- **Đảo lại**: $c^2 = a^2 + b^2$ → tam giác vuông (cách kiểm tra vuông).
- Bộ ba nguyên phổ biến: 3-4-5, 5-12-13, 8-15-17, 7-24-25 (và mọi bội số).

---

## 6. Diện tích tam giác

💡 **Trực giác / Hình dung**: tam giác là "nửa hình bình hành". Ghép 2 bản sao tam giác (1 cái lật ngược) → được hình bình hành diện tích đáy·cao → tam giác $= \\frac{1}{2}\\cdot$đáy$\\cdot$cao. Đó là lý do mọi công thức diện tích tam giác đều có hệ số $\\frac{1}{2}$.

\`\`\`
   1 tam giác              ghép 2 bản (1 lật) → hình bình hành
        /\\                       /\\------/
       /  \\           +         /  \\    /
      /    \\                   /    \\  /
     /______\\                 /______\\/
       đáy                       đáy
   S = ½·đáy·cao            S_bình hành = đáy·cao
                           ⇒ tam giác = nửa = ½·đáy·cao
\`\`\`

⚠ **Chiều cao là đường VUÔNG GÓC với đáy**, không phải cạnh bên:

\`\`\`
        A                    "cao" h là đoạn AH ⊥ BC,
       /|\\                   KHÔNG phải cạnh AB hay AC.
      / | \\                  Với tam giác tù, chân đường cao H
     /  |h \\                 có thể nằm NGOÀI đoạn đáy.
    /   |   \\
   B----H----C
        đáy
\`\`\`

3 công thức phổ biến:

### 6.1. Cơ bản

$$S = \\frac{1}{2} \\cdot \\text{đáy} \\cdot \\text{chiều cao}$$

### 6.2. Công thức Heron — chỉ cần 3 cạnh

$$S = \\sqrt{s(s-a)(s-b)(s-c)} \\quad \\text{với } s = \\frac{a+b+c}{2} \\text{ (nửa chu vi)}$$

### 6.3. Công thức SAS

$$S = \\frac{1}{2} \\cdot a \\cdot b \\cdot \\sin(C)$$

trong đó C là góc kẹp giữa 2 cạnh a và b.

### 6.4. Verify cả 3 công thức trên cùng 1 tam giác

Tam giác vuông cạnh 6, 8, huyền 10 (vuông tại góc giữa 2 cạnh 6 và 8):
- **Cơ bản** (đáy 6, cao 8): $S = \\frac{1}{2}\\cdot 6\\cdot 8 =$ **24**.
- **Heron**: $s = (6+8+10)/2 = 12$. $S = \\sqrt{12\\cdot(12-6)\\cdot(12-8)\\cdot(12-10)} = \\sqrt{12\\cdot 6\\cdot 4\\cdot 2} = \\sqrt{576} =$ **24** ✓.
- **SAS** (góc kẹp $= 90^\\circ$, $\\sin 90^\\circ = 1$): $S = \\frac{1}{2}\\cdot 6\\cdot 8\\cdot 1 =$ **24** ✓.

Cả 3 cho cùng 24 — chọn công thức theo dữ kiện đang có (biết cao → dùng cơ bản; chỉ biết 3 cạnh → Heron; biết 2 cạnh + góc kẹp → SAS).

### 6.5. Walk-through Heron — 3 ví dụ (chỉ cần 3 cạnh)

**Heron 1** (tam giác 13-14-15):
$$\\begin{aligned}
s &= \\tfrac{13+14+15}{2} = 21 \\\\
S &= \\sqrt{21(21-13)(21-14)(21-15)} = \\sqrt{21\\cdot 8\\cdot 7\\cdot 6} \\\\
  &= \\sqrt{7056} = \\textbf{84}
\\end{aligned}$$

**Heron 2** (tam giác đều cạnh 6, $a=b=c=6$):
$$\\begin{aligned}
s &= \\tfrac{6+6+6}{2} = 9 \\\\
S &= \\sqrt{9(9-6)^3} = \\sqrt{9\\cdot 3\\cdot 3\\cdot 3} = \\sqrt{243} \\\\
  &= 9\\sqrt{3} \\approx \\textbf{15.59}
\\end{aligned}$$
Khớp với công thức tam giác đều $S = \\frac{\\sqrt3}{4}\\cdot 6^2 = 9\\sqrt3$ ✓.

**Heron 3** (tam giác 7-8-9):
$$\\begin{aligned}
s &= \\tfrac{7+8+9}{2} = 12 \\\\
S &= \\sqrt{12(12-7)(12-8)(12-9)} = \\sqrt{12\\cdot 5\\cdot 4\\cdot 3} \\\\
  &= \\sqrt{720} = 12\\sqrt5 \\approx \\textbf{26.83}
\\end{aligned}$$

### 6.6. Walk-through SAS — 3 ví dụ ($\\frac{1}{2}ab\\sin C$)

**SAS 1** ($a=10$, $b=6$, góc kẹp $C=30^\\circ$, $\\sin 30^\\circ = 0.5$):
$$S = \\tfrac{1}{2}\\cdot 10\\cdot 6\\cdot 0.5 = \\textbf{15}$$

**SAS 2** ($a=8$, $b=5$, góc kẹp $C=90^\\circ$, $\\sin 90^\\circ = 1$):
$$S = \\tfrac{1}{2}\\cdot 8\\cdot 5\\cdot 1 = \\textbf{20}$$
($\\sin 90^\\circ = 1$ ⇒ công thức SAS thu về $\\frac{1}{2}ab$ của tam giác vuông).

**SAS 3** ($a=4$, $b=4$, góc kẹp $C=60^\\circ$, $\\sin 60^\\circ = \\frac{\\sqrt3}{2}\\approx 0.866$):
$$S = \\tfrac{1}{2}\\cdot 4\\cdot 4\\cdot \\tfrac{\\sqrt3}{2} = 4\\sqrt3 \\approx \\textbf{6.93}$$
Đây là tam giác đều cạnh 4 (2 cạnh bằng + góc kẹp $60^\\circ$ ⇒ cạnh thứ 3 cũng $= 4$) — khớp $\\frac{\\sqrt3}{4}\\cdot 4^2 = 4\\sqrt3$ ✓.

❓ **Câu hỏi tự nhiên của người đọc**

- *"Khi nào dùng công thức nào?"* Biết đáy + chiều cao → cơ bản. Chỉ biết 3 cạnh → Heron. Biết 2 cạnh + góc kẹp → $\\frac{1}{2}ab\\cdot\\sin C$.
- *"Heron có cần tam giác vuông không?"* Không — Heron đúng cho **mọi** tam giác, chỉ cần 3 cạnh.
- *"Đơn vị diện tích là gì?"* Luôn là đơn vị **bình phương** (cm², m²...). Nếu cạnh tính bằng cm thì diện tích là cm².

⚠ **Lỗi thường gặp**: quên đơn vị bình phương — viết diện tích là "24 cm" thay vì "24 cm²". Lỗi thứ 2: dùng cạnh bên làm "chiều cao". Chiều cao phải **vuông góc** với đáy, không phải cạnh xiên. Phản ví dụ: tam giác đáy 6, cạnh bên 5 nghiêng — $S \\neq \\frac{1}{2}\\cdot 6\\cdot 5$ trừ khi cạnh 5 đó vuông góc với đáy.

🔁 **Dừng lại tự kiểm tra**

1. Tam giác có 3 cạnh 13, 14, 15. Tính diện tích bằng Heron.
2. Tam giác có 2 cạnh 10 và 6, góc kẹp $30^\\circ$. Diện tích?

<details><summary>Đáp án</summary>

1. $s = (13+14+15)/2 = 21$. $S = \\sqrt{21\\cdot 8\\cdot 7\\cdot 6} = \\sqrt{7056} =$ **84**.
2. $S = \\frac{1}{2}\\cdot 10\\cdot 6\\cdot\\sin 30^\\circ = \\frac{1}{2}\\cdot 10\\cdot 6\\cdot 0.5 =$ **15**.

</details>

### 📝 Tóm tắt mục 6

- **Cơ bản**: $S = \\frac{1}{2}\\cdot$đáy$\\cdot$cao (cao phải vuông góc với đáy).
- **Heron**: $S = \\sqrt{s(s-a)(s-b)(s-c)}$ với $s =$ nửa chu vi — chỉ cần 3 cạnh, dùng cho mọi tam giác.
- **SAS**: $S = \\frac{1}{2}\\cdot a\\cdot b\\cdot\\sin C$ (2 cạnh + góc kẹp).
- Diện tích luôn có đơn vị **bình phương**.

---

## 7. Các đường đặc biệt trong tam giác

Mỗi tam giác có 4 họ "đường đặc biệt", mỗi họ gồm 3 đường (1 ứng với mỗi đỉnh/cạnh). Điểm chung: cả 3 đường cùng họ luôn **đồng quy** (cắt nhau tại 1 điểm) — sẽ học ở mục 8.

💡 **Trực giác / Hình dung**: mỗi loại đường trả lời 1 câu hỏi khác nhau về tam giác — "chia đôi cạnh?", "vuông góc với đáy?", "chia đôi góc?", "cách đều 2 đầu cạnh?". Đừng học vẹt tên — hiểu mỗi đường **đo cái gì** thì nhớ mãi.

### 7.1. Đường trung tuyến (median)

> 📐 **Định nghĩa đầy đủ — Trung tuyến**
>
> **(a) Là gì**: đoạn nối 1 **đỉnh** với **trung điểm cạnh đối diện**. Mỗi tam giác có 3 trung tuyến.
>
> **(b) Vì sao cần**: trung tuyến chia tam giác thành 2 phần **diện tích bằng nhau** (vì cùng đáy nửa cạnh, cùng chiều cao). 3 trung tuyến đồng quy tại **trọng tâm** — điểm cân bằng vật lý của tấm tam giác.
>
> **(c) Ví dụ số**: tam giác đỉnh $B(0,0)$, $C(6,0)$, $A(2,4)$. Trung điểm $M$ của $BC$ là $(3,0)$. Trung tuyến từ $A$ là đoạn $A(2,4)\\to M(3,0)$.

\`\`\`
          A
         /|\\
        / | \\
       /  |  \\         AM = trung tuyến từ A
      /   |   \\        M = trung điểm BC  (BM = MC)
     /    |    \\
    B-----M-----C
       (BM = MC)
\`\`\`

### 7.2. Đường cao (altitude)

> 📐 **Định nghĩa đầy đủ — Đường cao**
>
> **(a) Là gì**: đoạn từ 1 **đỉnh** hạ **vuông góc** xuống cạnh đối diện (hoặc phần kéo dài của nó). Mỗi tam giác có 3 đường cao.
>
> **(b) Vì sao cần**: đường cao chính là "chiều cao" $h$ trong công thức $S = \\frac{1}{2}\\cdot$đáy$\\cdot$cao. Với tam giác tù, chân đường cao có thể nằm **ngoài** cạnh đáy.
>
> **(c) Ví dụ số**: tam giác vuông tại $B$, $B(0,0)$, $C(4,0)$, $A(0,3)$. Đường cao từ $A$ xuống $BC$ chính là cạnh $AB$ (vì $AB \\perp BC$) — độ dài 3.

\`\`\`
          A
         /|\\
        / | \\          AH = đường cao từ A
       /  |  \\         AH ⊥ BC  (góc tại H = 90°)
      /   |h  \\
     /    |    \\
    B-----H-----C
            └ 90°
\`\`\`

### 7.3. Đường phân giác (angle bisector)

> 📐 **Định nghĩa đầy đủ — Phân giác trong**
>
> **(a) Là gì**: tia/đoạn từ 1 **đỉnh** chia **góc tại đỉnh đó** thành 2 góc bằng nhau, cắt cạnh đối diện. Mỗi tam giác có 3 phân giác trong.
>
> **(b) Vì sao cần**: mọi điểm trên phân giác **cách đều 2 cạnh** tạo nên góc đó. 3 phân giác đồng quy tại **tâm đường tròn nội tiếp** (cách đều cả 3 cạnh).
>
> **(c) Ví dụ số (định lý phân giác)**: phân giác từ $A$ cắt $BC$ tại $D$ thì $\\frac{BD}{DC} = \\frac{AB}{AC}$. Nếu $AB=6$, $AC=4$, $BC=5$ thì $BD:DC = 6:4 = 3:2$ ⇒ $BD = 3$, $DC = 2$.

\`\`\`
          A
         /α\\            AD chia góc Â thành 2 nửa bằng nhau
        /α  \\           (góc trái = góc phải = α)
       /     \\          BD/DC = AB/AC  (định lý phân giác)
      /       \\
     B----D----C
\`\`\`

### 7.4. Đường trung trực (perpendicular bisector)

> 📐 **Định nghĩa đầy đủ — Trung trực**
>
> **(a) Là gì**: đường **vuông góc** với 1 cạnh tại **trung điểm** cạnh đó. Khác 3 loại trên — trung trực gắn với **cạnh**, không nhất thiết đi qua đỉnh.
>
> **(b) Vì sao cần**: mọi điểm trên trung trực **cách đều 2 đầu mút** của cạnh. 3 trung trực đồng quy tại **tâm đường tròn ngoại tiếp** (cách đều 3 đỉnh).
>
> **(c) Ví dụ số**: cạnh $BC$ với $B(0,0)$, $C(6,0)$. Trung điểm $(3,0)$, trung trực là đường thẳng đứng $x = 3$. Điểm $(3, 5)$ trên đó cách đều $B$ và $C$: $\\sqrt{3^2+5^2} = \\sqrt{34}$ cho cả hai ✓.

\`\`\`
          ↑ trung trực (⊥ BC tại trung điểm)
          |
    B-----+-----C       Vuông góc với BC
       (trung điểm)      VÀ đi qua trung điểm BC
          |              ⇒ mọi điểm trên nó cách đều B, C
\`\`\`

**Bảng so sánh 4 đường** (rất dễ lẫn):

| Đường | Gắn với | Đặc trưng | Đồng quy tại |
|-------|---------|-----------|--------------|
| Trung tuyến | đỉnh → trung điểm cạnh đối | chia đôi **cạnh** | trọng tâm (G) |
| Đường cao | đỉnh → vuông góc cạnh đối | ⊥ **cạnh đối** | trực tâm (H) |
| Phân giác | đỉnh, chia đôi **góc** | chia đôi **góc** | tâm nội tiếp (I) |
| Trung trực | cạnh | ⊥ + qua trung điểm cạnh | tâm ngoại tiếp (O) |

⚠ **Lỗi thường gặp — nhầm trung tuyến với đường cao**: trung tuyến đi tới **trung điểm** cạnh đối; đường cao đi **vuông góc** xuống cạnh đối. Chúng **trùng nhau chỉ trong tam giác cân** (đường từ đỉnh cân) hoặc tam giác đều (cả 4 đường trùng). Phản ví dụ: tam giác thường $A(2,4)$, $B(0,0)$, $C(6,0)$ — trung tuyến từ $A$ tới $(3,0)$, còn đường cao từ $A$ hạ vuông góc xuống $(2,0)$ — **hai điểm khác nhau**.

🔁 **Dừng lại tự kiểm tra**

1. Đường nào đảm bảo chia tam giác thành 2 phần có **diện tích bằng nhau**?
2. Trong tam giác đều, có bao nhiêu đường đặc biệt khác nhau xuất phát từ 1 đỉnh?

<details><summary>Đáp án</summary>

1. **Trung tuyến** (2 nửa cùng đáy nửa-cạnh, cùng chiều cao → cùng diện tích).
2. Chỉ **1** — trong tam giác đều, trung tuyến, đường cao, phân giác (và cả trung trực cạnh đối) từ 1 đỉnh **trùng làm một**.

</details>

### 📝 Tóm tắt mục 7

- **Trung tuyến**: đỉnh → trung điểm cạnh đối; chia đôi diện tích.
- **Đường cao**: đỉnh → ⊥ cạnh đối; là $h$ trong công thức diện tích.
- **Phân giác**: chia đôi góc; điểm trên nó cách đều 2 cạnh.
- **Trung trực**: ⊥ + qua trung điểm cạnh; điểm trên nó cách đều 2 đỉnh.
- 4 đường này **trùng nhau** trong tam giác đều; trùng từng phần trong tam giác cân.

---

## 8. Bốn điểm đặc biệt (điểm đồng quy)

Mỗi họ đường đặc biệt ở mục 7 đồng quy tại 1 điểm. 4 điểm này là "trung tâm" của tam giác.

💡 **Trực giác trọng tâm = "điểm cân bằng"**: nếu cắt tam giác bằng bìa cứng và đặt đầu bút chì đúng vào **trọng tâm**, tấm bìa cân bằng không đổ — đó là **khối tâm** vật lý của tấm. Trọng tâm chia mỗi trung tuyến theo tỉ lệ **2:1** (phần gần đỉnh dài gấp đôi phần gần cạnh).

### 8.1. Trọng tâm (centroid, G) — giao 3 trung tuyến

**Tính chất 2:1**: $AG : GM = 2 : 1$.

**Công thức tọa độ** (rất hay dùng): trọng tâm là trung bình cộng tọa độ 3 đỉnh:
$$G = \\left(\\frac{x_A + x_B + x_C}{3},\\; \\frac{y_A + y_B + y_C}{3}\\right)$$

**Walk-through**: $A(0,0)$, $B(6,0)$, $C(3,9)$:
$$G = \\left(\\frac{0+6+3}{3},\\frac{0+0+9}{3}\\right) = (3, 3)$$
Kiểm tỉ lệ 2:1 trên trung tuyến từ $C(3,9)$ tới trung điểm $AB = (3,0)$: $G(3,3)$ chia đoạn $C\\to(3,0)$ thành $CG = 6$ và $G\\to(3,0) = 3$ ⇒ $6:3 = 2:1$ ✓.

### 8.2. Trực tâm (orthocenter, H) — giao 3 đường cao

\`\`\`
   Nhọn: H bên TRONG     Vuông: H ≡ đỉnh góc vuông     Tù: H bên NGOÀI
        /\\                    |\\                          H
       / H\\                   |H\\                          \\ ___
      /    \\                  |  \\                      ____\\/   (ngoài tam giác)
     /______\\                 |___\\                    /
\`\`\`
Vị trí $H$ phụ thuộc loại tam giác: trong (nhọn), tại đỉnh vuông (vuông), ngoài (tù).

### 8.3. Tâm đường tròn nội tiếp (incenter, I) — giao 3 phân giác

Cách đều 3 cạnh ⇒ là tâm đường tròn **nội tiếp** (tiếp xúc trong cả 3 cạnh). Bán kính nội tiếp $r$ liên hệ diện tích:
$$S = r \\cdot s \\quad (s = \\text{nửa chu vi}) \\;\\Rightarrow\\; r = \\frac{S}{s}$$
**Walk-through** (tam giác 3-4-5): $S = 6$, $s = 6$ ⇒ $r = 6/6 = \\textbf{1}$.

### 8.4. Tâm đường tròn ngoại tiếp (circumcenter, O) — giao 3 trung trực

Cách đều 3 đỉnh ⇒ là tâm đường tròn **ngoại tiếp** (đi qua cả 3 đỉnh). Bán kính ngoại tiếp:
$$R = \\frac{abc}{4S}$$
**Walk-through** (tam giác 3-4-5): $R = \\frac{3\\cdot4\\cdot5}{4\\cdot 6} = \\frac{60}{24} = \\textbf{2.5}$. Đúng bằng nửa cạnh huyền — vì tam giác vuông luôn có $O$ tại **trung điểm cạnh huyền**.

| Điểm | Giao của | Tính chất | Đường tròn liên quan |
|------|----------|-----------|----------------------|
| Trọng tâm $G$ | 3 trung tuyến | điểm cân bằng, chia 2:1 | — |
| Trực tâm $H$ | 3 đường cao | có thể nằm ngoài | — |
| Tâm nội tiếp $I$ | 3 phân giác | cách đều 3 cạnh | nội tiếp, $r = S/s$ |
| Tâm ngoại tiếp $O$ | 3 trung trực | cách đều 3 đỉnh | ngoại tiếp, $R = abc/4S$ |

❓ **Câu hỏi tự nhiên của người đọc**

- *"Tâm nội tiếp và ngoại tiếp có trùng nhau không?"* Chỉ trùng trong **tam giác đều** (khi đó cả 4 điểm $G, H, I, O$ trùng một). Nói chung là 4 điểm khác nhau.
- *"Đường thẳng Euler là gì?"* Trong mọi tam giác, 3 điểm $G$, $H$, $O$ luôn **thẳng hàng** (đường thẳng Euler), và $G$ chia $OH$ theo tỉ lệ $OG:GH = 1:2$. (Tâm nội tiếp $I$ nói chung không nằm trên đường này.)
- *"Vì sao trọng tâm là trung bình tọa độ?"* Vì khối tâm của 3 điểm khối lượng bằng nhau chính là trung bình cộng vị trí của chúng.

⚠ **Lỗi thường gặp — nhầm trọng tâm với tâm ngoại tiếp**: trọng tâm là trung bình **tọa độ 3 đỉnh** (luôn trong tam giác); tâm ngoại tiếp cách đều **3 đỉnh** (có thể nằm ngoài, vd tam giác tù). Chúng chỉ trùng trong tam giác đều. Phản ví dụ: tam giác vuông 3-4-5 có $O$ tại trung điểm cạnh huyền (trên cạnh), còn $G$ ở bên trong — khác nhau.

🔁 **Dừng lại tự kiểm tra**

1. Trọng tâm của tam giác đỉnh $(0,0)$, $(9,0)$, $(0,6)$ ở đâu?
2. Bán kính đường tròn ngoại tiếp tam giác 6-8-10?

<details><summary>Đáp án</summary>

1. $G = \\left(\\frac{0+9+0}{3}, \\frac{0+0+6}{3}\\right) = (3, 2)$.
2. Tam giác 6-8-10 vuông ($36+64=100$) ⇒ $R = $ nửa cạnh huyền $= 10/2 = \\textbf{5}$. Kiểm bằng công thức: $R = \\frac{6\\cdot8\\cdot10}{4\\cdot 24} = \\frac{480}{96} = 5$ ✓.

</details>

### 📝 Tóm tắt mục 8

- **Trọng tâm $G$** (3 trung tuyến): trung bình tọa độ 3 đỉnh, chia trung tuyến 2:1, điểm cân bằng.
- **Trực tâm $H$** (3 đường cao): vị trí tùy loại tam giác (trong/đỉnh/ngoài).
- **Tâm nội tiếp $I$** (3 phân giác): cách đều 3 cạnh, $r = S/s$.
- **Tâm ngoại tiếp $O$** (3 trung trực): cách đều 3 đỉnh, $R = abc/4S$; với tam giác vuông $O$ là trung điểm cạnh huyền.
- $G$, $H$, $O$ luôn thẳng hàng (**đường thẳng Euler**); cả 4 trùng nhau chỉ ở tam giác đều.

---

## 9. Bài tập

### Bài tập

**Bài 1**: Tam giác có cạnh 3, 4, 5. Đây có là tam giác vuông không?

**Bài 2**: Tam giác đều cạnh 6 có diện tích bao nhiêu?

**Bài 3**: Tam giác ABC có $A = 80^\\circ$, $B = 60^\\circ$. Tìm C.

**Bài 4**: Có 3 đoạn dài 2, 3, 6. Tạo được tam giác không?

**Bài 5**: Tam giác có 3 cạnh 5, 12, 13. Tính diện tích bằng 2 cách.

**Bài 6**: 2 tam giác đồng dạng tỉ số $k = 3$. Tỉ lệ diện tích là bao nhiêu?

**Bài 7**: Tìm trọng tâm của tam giác có đỉnh $A(1,2)$, $B(7,2)$, $C(4,8)$.

**Bài 8**: Phân giác từ $A$ cắt $BC$ tại $D$. Biết $AB = 8$, $AC = 6$, $BC = 7$. Tính $BD$ và $DC$.

**Bài 9**: Tam giác cân cạnh 10, 10, 12. Tính diện tích bằng Heron và cho biết loại theo góc.

**Bài 10**: Tính bán kính đường tròn nội tiếp $r$ và ngoại tiếp $R$ của tam giác 9-12-15.

### Lời giải

**Bài 1**: $3^2 + 4^2 = 9 + 16 = 25 = 5^2$. → **VUÔNG** (Pythagoras đảo).

**Bài 2**: Chiều cao $= (\\text{cạnh} \\times \\sqrt{3})/2 = 3\\sqrt{3}$. $S = \\frac{1}{2} \\cdot 6 \\cdot 3\\sqrt{3} =$ **$9\\sqrt{3} \\approx 15.59$**.

**Bài 3**: $C = 180 - 80 - 60 =$ **$40^\\circ$**.

**Bài 4**: $2 + 3 = 5 < 6$ → vi phạm bất đẳng thức tam giác → **KHÔNG tạo được**.

**Bài 5**: 
- Pythagoras: $5^2 + 12^2 = 25 + 144 = 169 = 13^2$ → tam giác vuông.
- Cách 1: $S = \\frac{1}{2} \\cdot 5 \\cdot 12 =$ **30**.
- Cách 2 (Heron): $s = 15$. $S = \\sqrt{15 \\cdot 10 \\cdot 3 \\cdot 2} = \\sqrt{900} =$ **30** ✓.

**Bài 6**: Tỉ lệ diện tích $= k^2 =$ **9**.

**Bài 7**: $G = \\left(\\frac{1+7+4}{3}, \\frac{2+2+8}{3}\\right) = \\left(\\frac{12}{3}, \\frac{12}{3}\\right) =$ **$(4, 4)$**.

**Bài 8**: Định lý phân giác: $\\frac{BD}{DC} = \\frac{AB}{AC} = \\frac{8}{6} = \\frac{4}{3}$. Mà $BD + DC = BC = 7$. Đặt $BD = 4t$, $DC = 3t$ ⇒ $7t = 7$ ⇒ $t = 1$. Vậy $BD =$ **4**, $DC =$ **3**.

**Bài 9**:
- Heron: $s = (10+10+12)/2 = 16$. $S = \\sqrt{16\\cdot 6\\cdot 6\\cdot 4} = \\sqrt{2304} =$ **48**.
- Loại theo góc: cạnh lớn nhất 12, $12^2 = 144$ so với $10^2 + 10^2 = 200$. Vì $144 < 200$ → góc lớn nhất $< 90^\\circ$ → **nhọn** (và cân).

**Bài 10**: Tam giác 9-12-15 vuông ($81 + 144 = 225 = 15^2$). Diện tích $S = \\frac{1}{2}\\cdot 9\\cdot 12 = 54$. Nửa chu vi $s = (9+12+15)/2 = 18$.
- Nội tiếp: $r = S/s = 54/18 =$ **3**.
- Ngoại tiếp: $R = \\frac{abc}{4S} = \\frac{9\\cdot 12\\cdot 15}{4\\cdot 54} = \\frac{1620}{216} =$ **7.5** (đúng bằng nửa cạnh huyền $15/2$ ✓).

---

## 10. Bài tiếp theo

[Lesson 03 — Đường tròn](../lesson-03-circles/).

## 📝 Tổng kết

1. **Tam giác**: tổng 3 góc $= 180^\\circ$. Bất đẳng thức: cạnh $<$ tổng 2 cạnh kia.
2. **Phân loại**: đều/cân/thường + nhọn/vuông/tù.
3. **Bằng nhau**: SSS, SAS, ASA. Đồng dạng: AA, SAS, SSS.
4. **Pythagoras**: $a^2 + b^2 = c^2$ (vuông). Bộ 3-4-5 phổ biến nhất. Đảo lại để kiểm tra vuông.
5. **Diện tích**: $\\frac{1}{2}\\cdot$đáy$\\cdot$cao $= \\sqrt{s(s-a)(s-b)(s-c)}$ (Heron) $= \\frac{1}{2}\\cdot a\\cdot b\\cdot\\sin(C)$.
6. **4 đường đặc biệt**: trung tuyến (→ trung điểm), đường cao (⊥ cạnh), phân giác (chia đôi góc), trung trực (⊥ + trung điểm cạnh).
7. **4 điểm đồng quy**: trọng tâm $G$ (cân bằng, 2:1), trực tâm $H$, tâm nội tiếp $I$ ($r=S/s$), tâm ngoại tiếp $O$ ($R=abc/4S$). $G,H,O$ thẳng hàng (đường Euler).
`;
