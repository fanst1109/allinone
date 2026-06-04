// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: Math/06-Advanced/lesson-04-multivariable-functions/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 04 — Hàm nhiều biến

## Mục tiêu

- Hàm f(x, y), f(x, y, z) — đồ thị mặt cong.
- **Đạo hàm riêng** ∂f/∂x, ∂f/∂y.
- **Gradient** ∇f và ý nghĩa hình học.
- Cực trị 2 biến — định lý Hessian.

## Kiến thức tiền đề

- [Tier 4 — Calculus 1 biến](../../04-Calculus-1var/).

---

## 1. Hàm nhiều biến

💡 **Trực giác / Hình dung**: hàm 1 biến f(x) vẽ ra 1 **đường cong** (mỗi x → 1 độ cao). Hàm 2 biến f(x,y) vẽ ra 1 **mặt cong** trong không gian 3D — như mặt đất đồi núi: tại mỗi tọa độ (x,y) trên bản đồ có 1 độ cao f. Đường mức = các đường nối những điểm cùng độ cao (đúng như đường đồng mức trên bản đồ địa hình).

**Định nghĩa**: f: ℝⁿ → ℝ. Mỗi điểm (x₁, ..., xₙ) gán 1 số f(x₁, ..., xₙ).

**4 ví dụ số đa dạng** (f(x,y) = x² + y²):
- f(0,0) = 0 (đáy "thung lũng").
- f(1,0) = 1; f(0,2) = 4 (cùng dạng theo từng trục).
- f(3,4) = 9 + 16 = 25 (= bình phương khoảng cách tới gốc).
- Đường mức f = 25: vòng tròn bán kính 5 (mọi điểm cách gốc 5).

**Ví dụ dạng khác**:
- f(x, y) = x·y (mặt yên ngựa): f(2,3) = 6, f(2,−3) = −6.
- f(x, y) = sin(x)·cos(y) (sóng 2D).

**Đồ thị**: trong ℝ³, vẽ điểm (x, y, f(x, y)) → mặt cong.

### Đường mức (level curves)

f(x, y) = c (hằng số) → đường cong trong mặt phẳng xy.

⟶ Như **đường đồng mức** trên bản đồ.

❓ **Câu hỏi tự nhiên của người đọc**

- *"Vì sao đường mức của x²+y² là hình tròn?"* Vì x²+y² = c (hằng) chính là phương trình đường tròn bán kính √c. Mọi điểm trên tròn cùng "độ cao" c.
- *"Hàm 3 biến f(x,y,z) vẽ thế nào?"* Không vẽ trực tiếp được (cần 4 chiều). Thay vào đó vẽ **mặt mức** f = c (mặt cong trong 3D), tương tự đường mức.

⚠ **Lỗi thường gặp — nhầm đồ thị với đường mức**. Đồ thị f(x,y) sống trong **3D** (mặt cong). Đường mức sống trong **2D** (mặt phẳng xy), là "lát cắt nằm ngang" của đồ thị chiếu xuống. Vd với f = x²+y²: đồ thị là chén parabol, đường mức là các vòng tròn đồng tâm.

🔁 **Dừng lại tự kiểm tra**

1. f(x,y) = x² − y². Tính f(3,1).
2. Đường mức f = 4 của f(x,y) = x + y là hình gì?

<details><summary>Đáp án</summary>

1. f(3,1) = 9 − 1 = **8**.
2. x + y = 4 → một **đường thẳng** (dốc −1, cắt trục y tại 4).

</details>

### 📝 Tóm tắt mục 1

- f: ℝⁿ → ℝ; hàm 2 biến = mặt cong 3D (như địa hình).
- Đường mức f = c = các điểm cùng "độ cao" (đồng mức trên bản đồ), sống trong mặt phẳng 2D.
- Đồ thị (3D) ≠ đường mức (2D, lát cắt ngang).

---

## 2. Đạo hàm riêng

💡 **Trực giác / Hình dung**: đứng trên mặt đất đồi núi tại điểm (a,b). Đi **chỉ theo hướng đông** (tăng x, giữ y cố định) thì dốc lên/xuống bao nhiêu? Đó là ∂f/∂x. Đi **chỉ theo hướng bắc** (tăng y) thì dốc bao nhiêu? Đó là ∂f/∂y. Đạo hàm riêng = độ dốc khi đi **dọc theo đúng 1 trục**, đóng băng các trục khác.

**Ý tưởng tính**: Khi tính ∂f/∂x, coi y là **hằng**, đạo hàm theo x như bình thường.

\`\`\`
∂f/∂x = lim_{h→0} [f(x+h, y) - f(x, y)] / h
\`\`\`

**4 ví dụ số đa dạng**:
- f = x²·y + 3y: ∂f/∂x = 2x·y, ∂f/∂y = x² + 3.
- f = x³ + y²: ∂f/∂x = 3x², ∂f/∂y = 2y (tách rời, không lẫn).
- f = sin(xy): ∂f/∂x = y·cos(xy), ∂f/∂y = x·cos(xy) (chain rule).
- f = x/y: ∂f/∂x = 1/y, ∂f/∂y = −x/y².

**Đánh giá tại điểm**: f = x²·y + 3y tại (2, 1): ∂f/∂x = 2·2·1 = **4**, ∂f/∂y = 2² + 3 = **7**.

### Ý nghĩa hình học

∂f/∂x tại (a, b) = slope của giao cắt với mặt phẳng y = b.

❓ **Câu hỏi tự nhiên của người đọc**

- *"Vì sao coi biến kia là hằng?"* Vì đạo hàm riêng đo thay đổi **chỉ theo 1 biến**. Cố định biến kia = đi dọc đúng 1 trục. Y như chụp 1 lát cắt của mặt cong rồi lấy đạo hàm đường cong 1 biến quen thuộc.
- *"∂f/∂x và ∂f/∂y có thể khác nhau nhiều không?"* Có. Tại (2,1) ở trên: dốc theo x là 4, theo y là 7 — mặt cong dốc khác nhau tùy hướng đi.

⚠ **Lỗi thường gặp — lẫn ∂ (riêng) với d (toàn phần)**. Khi lấy ∂f/∂x, biến y **bất biến** (đứng yên). Nếu viết d/dx mà coi y = y(x) phụ thuộc x thì khác hẳn (đó là đạo hàm toàn phần, có thêm số hạng ∂f/∂y · dy/dx). Phản ví dụ: f = xy, ∂f/∂x = y (coi y hằng); nhưng nếu y = x thì df/dx của f = x·x = x² là 2x ≠ y.

🔁 **Dừng lại tự kiểm tra**

1. f(x,y) = 3x²y + y³. Tính ∂f/∂x và ∂f/∂y.
2. Đánh giá ∂f/∂x tại (1, 2).

<details><summary>Đáp án</summary>

1. ∂f/∂x = 6xy (coi y hằng); ∂f/∂y = 3x² + 3y² (coi x hằng).
2. ∂f/∂x|(1,2) = 6·1·2 = **12**.

</details>

### 📝 Tóm tắt mục 2

- ∂f/∂x = độ dốc đi dọc trục x (đóng băng y); ∂f/∂y ngược lại.
- Tính bằng cách coi biến kia là hằng số, áp dụng quy tắc đạo hàm thường.
- Phân biệt ∂ (riêng, biến kia cố định) với d (toàn phần, biến kia phụ thuộc).

---

## 3. Gradient

\`\`\`
∇f = (∂f/∂x, ∂f/∂y)
\`\`\`

(Hoặc trong n chiều: ∇f = (∂f/∂x₁, ..., ∂f/∂xₙ).)

💡 **Tính chất quan trọng**:
- ∇f chỉ **hướng tăng nhanh nhất** của f.
- ||∇f|| = tốc độ tăng theo hướng đó.
- ∇f **vuông góc với đường mức** f = c.

**Ví dụ**: f(x, y) = x² + y². ∇f = (2x, 2y). Tại (1, 1): ∇f = (2, 2) — chỉ "ra xa O" — đúng vì f tăng theo bán kính.

### Hướng giảm nhanh nhất

= **-∇f**. Đây là nền tảng của **Gradient Descent** trong ML.

> 📐 **Định nghĩa đầy đủ — Gradient ∇f**
>
> **(a) Là gì**: 1 vector có n thành phần là **n đạo hàm riêng** của f. ∇f tại điểm P chỉ hướng f **tăng nhanh nhất** từ P, độ lớn ||∇f|| = tốc độ tăng theo hướng đó. Vuông góc với mặt đẳng giá trị (đường mức f = c).
>
> **(b) Vì sao cần**: Gradient là **đạo hàm tổng quát hoá** sang nhiều biến. Hầu hết bài toán thực tế có nhiều biến (cost function trong ML có triệu tham số). Để tối ưu (tìm min/max), đi theo hướng −∇f → **Gradient Descent** — thuật toán cốt lõi của: AI/ML (huấn luyện mô hình), kinh tế (tối ưu portfolio), vật lý (Lagrangian, Hamiltonian mechanics), điều khiển (PID). Khi ∇f = 0 → điểm dừng (cực trị hoặc yên ngựa).
>
> **(c) Ví dụ số**: f(x,y) = x² + y² (paraboloid). ∇f = (2x, 2y). Tại (3, 4): ∇f = (6, 8), ||∇f|| = 10 (= 2·√(9+16)). Hướng ra xa O — đúng vì f tăng theo r. f(x,y) = e^(-x²-y²) (chuông Gauss). ∇f = (−2x·e^..., −2y·e^...). Tại (0,0) trên đỉnh: ∇f = (0, 0) — cực đại. Tại (1,0): ∇f = (−2e⁻¹, 0) ≈ (−0.736, 0) — chỉ về tâm. Gradient descent: x ← x − α·∇f đi xuống dốc.

❓ **Câu hỏi tự nhiên của người đọc**

- *"Vì sao ∇f chỉ đúng hướng dốc nhất, không phải hướng nào khác?"* Vì độ dốc theo hướng đơn vị u bằng ∇f·u = ||∇f||·cos θ, lớn nhất khi θ = 0 (u cùng hướng ∇f). Toán cos θ = 1 ⟺ đi đúng hướng gradient.
- *"∇f = 0 nghĩa là gì?"* Mọi hướng đều phẳng → điểm dừng (đỉnh, đáy, hoặc yên ngựa). Đây là điều kiện tìm cực trị (mục 5).
- *"Vì sao gradient vuông góc đường mức?"* Đi dọc đường mức thì f không đổi → độ dốc theo hướng đó = 0 → ∇f·(hướng đường mức) = 0 → vuông góc.

⚠ **Lỗi thường gặp — tưởng ∇f là 1 số**. Gradient là **vector** (gồm các đạo hàm riêng), không phải số. Phản ví dụ: f = x²+y² tại (3,4) cho ∇f = **(6, 8)** (vector 2 thành phần), còn ||∇f|| = 10 mới là số (độ lớn). Lẫn 2 thứ → sai khi áp dụng gradient descent.

🔁 **Dừng lại tự kiểm tra**

1. f(x,y) = x² + 3y². Tính ∇f tại (1, 1) và ||∇f||.
2. Hướng giảm nhanh nhất của f tại (1,1) là hướng nào?

<details><summary>Đáp án</summary>

1. ∇f = (2x, 6y) → tại (1,1): (2, 6). ||∇f|| = √(4+36) = √40 ≈ **6.32**.
2. **−∇f = (−2, −6)** (ngược hướng gradient).

</details>

### 📝 Tóm tắt mục 3

- ∇f = (∂f/∂x, ∂f/∂y) là **vector** chỉ hướng tăng nhanh nhất.
- ||∇f|| = tốc độ tăng theo hướng đó; ∇f ⊥ đường mức.
- −∇f = hướng giảm nhanh nhất (nền tảng Gradient Descent); ∇f = 0 ⟺ điểm dừng.

---

## 4. Đạo hàm riêng bậc 2 & Ma trận Hessian

💡 **Trực giác / Hình dung**: nếu gradient (bậc 1) cho biết mặt cong dốc thế nào, thì Hessian (bậc 2) cho biết mặt cong **cong thế nào** — lõm xuống như cái chén (cực tiểu) hay vồng lên như mái vòm (cực đại) hay vừa lõm vừa vồng như yên ngựa. Đạo hàm bậc 2 = "độ cong" của địa hình.

**Đạo hàm bậc 2**:
- ∂²f/∂x² = (∂/∂x)(∂f/∂x).
- ∂²f/∂x∂y = (∂/∂y)(∂f/∂x).

**Định lý Schwarz**: Nếu f đủ "đẹp" (đạo hàm liên tục), thì ∂²f/∂x∂y = ∂²f/∂y∂x. Thứ tự đạo hàm không quan trọng.

**Ma trận Hessian** (2 biến):
\`\`\`
H = [∂²f/∂x²   ∂²f/∂x∂y]
    [∂²f/∂y∂x ∂²f/∂y² ]
\`\`\`

⟶ H đối xứng (Schwarz).

**Walk-through bằng số** (f = x³ + x²y + y²):
- ∂f/∂x = 3x² + 2xy → ∂²f/∂x² = 6x + 2y; ∂²f/∂x∂y = 2x.
- ∂f/∂y = x² + 2y → ∂²f/∂y² = 2; ∂²f/∂y∂x = 2x.
- Kiểm Schwarz: ∂²f/∂x∂y = 2x = ∂²f/∂y∂x ✓. H = [[6x+2y, 2x],[2x, 2]].

❓ **Câu hỏi tự nhiên của người đọc**

- *"Schwarz luôn đúng?"* Hầu như mọi hàm gặp trong thực tế (đạo hàm bậc 2 liên tục) thì đúng. Chỉ vài hàm bệnh lý hiếm gặp mới vi phạm — không phải lo ở mức này.
- *"Hessian dùng làm gì?"* Phân loại điểm dừng (mục 5) và trong tối ưu (phương pháp Newton dùng nghịch đảo Hessian để hội tụ nhanh).

⚠ **Lỗi thường gặp — nhầm ∂²f/∂x² với (∂f/∂x)²**. ∂²f/∂x² là đạo hàm **hai lần** (lấy đạo hàm của đạo hàm). Phản ví dụ: f = x², ∂f/∂x = 2x. ∂²f/∂x² = 2 (đạo hàm lần nữa), KHÁC (∂f/∂x)² = (2x)² = 4x².

🔁 **Dừng lại tự kiểm tra**

1. f = x²y. Tính ma trận Hessian.

<details><summary>Đáp án</summary>

∂f/∂x = 2xy → ∂²f/∂x² = 2y, ∂²f/∂x∂y = 2x. ∂f/∂y = x² → ∂²f/∂y² = 0, ∂²f/∂y∂x = 2x. H = [[2y, 2x],[2x, 0]] (đối xứng ✓).

</details>

### 📝 Tóm tắt mục 4

- Đạo hàm bậc 2 đo **độ cong** mặt; Hessian gom 4 đạo hàm bậc 2.
- Schwarz: ∂²f/∂x∂y = ∂²f/∂y∂x → H đối xứng (với hàm "đẹp").
- ∂²f/∂x² ≠ (∂f/∂x)²; Hessian dùng để phân loại cực trị.

---

## 5. Cực trị 2 biến

💡 **Trực giác / Hình dung**: tìm đỉnh núi / đáy thung lũng / điểm yên ngựa. Ở những chỗ này mặt đất **phẳng theo mọi hướng** → gradient = 0 (điều kiện cần). Nhưng phẳng chưa đủ biết là đỉnh hay đáy hay yên ngựa — phải xem **độ cong** (Hessian): chén lõm = đáy (cực tiểu), vòm = đỉnh (cực đại), vừa lõm vừa vồng = yên ngựa.

🎯 **Điều kiện cần** (Fermat): Tại cực trị, **∇f = 0**.

⟶ Tìm các điểm (a, b) sao cho ∂f/∂x = 0 và ∂f/∂y = 0. Gọi là **điểm dừng** (critical point).

### Phân loại bằng Hessian (định thức 2nd derivative test)

Tại điểm dừng:
- **det(H) > 0** và **∂²f/∂x² > 0**: **cực tiểu**.
- **det(H) > 0** và **∂²f/∂x² < 0**: **cực đại**.
- **det(H) < 0**: **điểm yên ngựa** (saddle).
- **det(H) = 0**: chưa kết luận.

### Ví dụ

f(x, y) = x² + y² - 4x + 6y.
- ∂f/∂x = 2x - 4 = 0 → x = 2.
- ∂f/∂y = 2y + 6 = 0 → y = -3.
- Điểm dừng: (2, -3).
- H = [[2, 0], [0, 2]]. det = 4 > 0. ∂²f/∂x² = 2 > 0.
- → **Cực tiểu** tại (2, -3). f(2, -3) = 4 + 9 - 8 - 18 = -13.

❓ **Câu hỏi tự nhiên của người đọc**

- *"∇f = 0 chắc chắn là cực trị?"* Không — chỉ là **điều kiện cần**. Điểm yên ngựa cũng có ∇f = 0 nhưng không phải cực trị. Phải dùng Hessian phân loại.
- *"det(H) = 0 thì sao?"* Test thất bại (chưa kết luận). Phải dùng cách khác (xét trực tiếp giá trị quanh điểm, hoặc đạo hàm bậc cao hơn).

⚠ **Lỗi thường gặp — quên kiểm dấu ∂²f/∂x² khi det(H) > 0**. det(H) > 0 chỉ nói "cực trị (không phải yên ngựa)", còn **cực đại hay cực tiểu** phải xem ∂²f/∂x²: > 0 → tiểu, < 0 → đại. Phản ví dụ: f = −x²−y² có H = [[−2,0],[0,−2]], det = 4 > 0 nhưng ∂²f/∂x² = −2 < 0 → **cực đại** (không phải tiểu).

🔁 **Dừng lại tự kiểm tra**

1. f = x² + y². Tìm điểm dừng và phân loại.

<details><summary>Đáp án</summary>

∂f/∂x = 2x = 0, ∂f/∂y = 2y = 0 → (0,0). H = [[2,0],[0,2]], det = 4 > 0, ∂²f/∂x² = 2 > 0 → **cực tiểu** tại (0,0), f = 0.

</details>

### 📝 Tóm tắt mục 5

- Điều kiện cần: ∇f = 0 → điểm dừng (có thể đỉnh/đáy/yên ngựa).
- Phân loại bằng Hessian: det(H) > 0 & ∂²f/∂x² > 0 → tiểu; det(H) > 0 & ∂²f/∂x² < 0 → đại; det(H) < 0 → yên ngựa.
- det(H) = 0 → chưa kết luận.

---

## 6. Ứng dụng

### Gradient Descent
- Hàm cost J(θ) trong ML có nhiều tham số θ = (θ₁, ..., θₙ).
- Cập nhật: θ ← θ - α·∇J(θ) (α = learning rate).
- Tiến dần đến cực tiểu.

### Tối ưu hóa
- Tìm thông số tối ưu của mô hình, mạng nơ-ron, ...

💡 **Trực giác / Hình dung**: Gradient Descent = "lăn bóng xuống dốc". Đứng trên mặt cost J, nhìn hướng dốc xuống nhất (−∇J), bước 1 bước nhỏ (cỡ α), lặp lại. Cuối cùng dừng ở đáy (∇J ≈ 0) = cực tiểu.

❓ **Câu hỏi tự nhiên của người đọc**

- *"α (learning rate) chọn sao?"* Quá nhỏ → học chậm; quá lớn → "nhảy" qua đáy, có thể phân kỳ. Vd α = 0.01–0.1 phổ biến, thường giảm dần.
- *"Gradient descent có chắc tìm cực tiểu toàn cục?"* Không — có thể kẹt ở cực tiểu **địa phương** (đáy thung lũng nhỏ, không phải sâu nhất). Đây là thách thức lớn của tối ưu phi lồi trong ML.

### 📝 Tóm tắt mục 6

- Gradient Descent: θ ← θ − α·∇J, lặp đến khi ∇J ≈ 0.
- α (learning rate): cân bằng tốc độ vs ổn định.
- Cốt lõi huấn luyện ML; rủi ro kẹt cực tiểu địa phương.

---

## 7. Bài tập

### Bài tập

**Bài 1**: f(x, y) = 3x² + 2xy - y². Tính ∂f/∂x, ∂f/∂y.

**Bài 2**: f(x, y) = e^(x²+y²). Tính ∇f tại (1, 1).

**Bài 3**: Tìm cực trị của f(x, y) = x² + xy + y² - 3x - 3y.

**Bài 4**: f(x, y) = x³ - 3xy + y³. Tìm điểm dừng. Phân loại bằng Hessian.

**Bài 5**: f(x, y) = x² - y². Tìm điểm dừng. Phân loại.

### Lời giải

**Bài 1**: ∂f/∂x = 6x + 2y. ∂f/∂y = 2x - 2y.

**Bài 2**: ∇f = (2x·e^(x²+y²), 2y·e^(x²+y²)). Tại (1,1): (2e², 2e²).

**Bài 3**:  
- ∂f/∂x = 2x + y - 3 = 0.  
- ∂f/∂y = x + 2y - 3 = 0.  
- Giải: 2x + y = 3, x + 2y = 3. Trừ: x - y = 0 → x = y. Thay: 3x = 3 → **x = y = 1**.  
- H = [[2, 1], [1, 2]]. det = 3 > 0. ∂²f/∂x² = 2 > 0 → **cực tiểu** tại (1, 1).

**Bài 4**:  
- ∂f/∂x = 3x² - 3y = 0 → y = x².  
- ∂f/∂y = -3x + 3y² = 0 → x = y².  
- Thay: x = (x²)² = x⁴ → x⁴ - x = 0 → x(x³ - 1) = 0 → x = 0 hoặc x = 1.  
- Điểm dừng: (0, 0), (1, 1).  
- H = [[6x, -3], [-3, 6y]]. det = 36xy - 9.  
- Tại (0,0): det = -9 < 0 → **yên ngựa**.  
- Tại (1,1): det = 27 > 0, ∂²f/∂x² = 6 > 0 → **cực tiểu**.

**Bài 5**: ∂f/∂x = 2x = 0, ∂f/∂y = -2y = 0 → (0, 0). H = [[2, 0], [0, -2]]. det = -4 < 0 → **yên ngựa** (mặt yên ngựa kinh điển).

---

## 8. Bài tiếp theo

[Lesson 05 — Tích phân bội](../lesson-05-multiple-integrals/).

## 📝 Tổng kết

1. **Đạo hàm riêng** ∂f/∂x: coi biến khác hằng.
2. **Gradient** ∇f = (∂f/∂x, ∂f/∂y) chỉ hướng tăng nhanh nhất, vuông góc đường mức.
3. **Cực trị**: tại điểm dừng (∇f = 0). Phân loại bằng Hessian.
4. **Yên ngựa** = det(H) < 0 — cao theo 1 hướng, thấp theo hướng khác.
5. **Gradient Descent** cốt lõi ML.
`;
