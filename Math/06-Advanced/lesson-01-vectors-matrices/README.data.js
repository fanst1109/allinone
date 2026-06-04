// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: Math/06-Advanced/lesson-01-vectors-matrices/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 01 — Vector & Ma trận

## Mục tiêu

- **Vector** trong ℝⁿ: phép toán cộng, nhân vô hướng, tích vô hướng.
- **Ma trận**: cộng, nhân ma trận-vector, nhân ma trận-ma trận.
- Hiểu ma trận như **phép biến đổi tuyến tính**.
- Kết nối với Vectors tier riêng (đã có).

## Kiến thức tiền đề

- [Tier 2 L08 — Biến hình & vector hình học](../../02-Geometry/lesson-08-transformations-vector-geo/).
- Có thể tham khảo [Vectors tier riêng](../../../Vectors/01-Algebra/) cho phần ứng dụng AI/ML.

---

## 1. Vector trong ℝⁿ

💡 **Trực giác / Hình dung**: vector = "**mũi tên có hướng và độ dài**" trong không gian, ghi bằng tọa độ. Trong ℝ² mũi tên đi từ gốc O tới điểm (3, 4). Lên ℝⁿ ta không "vẽ" được nữa nhưng vẫn tính như mũi tên: cộng vector = nối đuôi-đầu (luật hình bình hành), nhân vô hướng c·v = kéo dài/co mũi tên gấp c lần (nếu c < 0 thì quay ngược). Tích vô hướng đo "hai mũi tên cùng hướng tới mức nào".

💡 **Định nghĩa**: Vector n chiều = bộ n số thực, viết theo cột:
\`\`\`
v = (v₁, v₂, ..., vₙ)
\`\`\`

**Phép toán**:
- Cộng: u + v = (u₁+v₁, ..., uₙ+vₙ).
- Nhân vô hướng: c·v = (c·v₁, ..., c·vₙ).
- **Tích vô hướng** (dot product): u · v = u₁v₁ + ... + uₙvₙ (= 1 số).
- **Độ dài (chuẩn)**: ||v|| = √(v · v) = √(v₁² + ... + vₙ²).

**4 ví dụ số đa dạng** (u = (1, 2, 3), v = (4, -1, 2)):
- Cộng: u + v = (5, 1, 5).
- Tích vô hướng (ra dương): u · v = 1·4 + 2·(−1) + 3·2 = 4 − 2 + 6 = **8**.
- Tích vô hướng (ra **0** → vuông góc): (1, 0, 0) · (0, 5, 7) = 0 + 0 + 0 = 0 → 2 vector ⊥.
- Chuẩn: ||u|| = √(1+4+9) = **√14 ≈ 3.74**; nhân vô hướng âm: (−2)·u = (−2, −4, −6).

### Góc giữa 2 vector

\`\`\`
cos θ = (u · v) / (||u||·||v||)
\`\`\`

⟶ u · v = 0 ⟺ u ⊥ v.

**Verify bằng số**: u = (1, 0), v = (1, 1). u·v = 1. ||u|| = 1, ||v|| = √2. cos θ = 1/√2 ≈ 0.707 → θ = 45° ✓ (đúng với hình: mũi tên (1,1) nghiêng 45° so với trục x).

❓ **Câu hỏi tự nhiên của người đọc**

- *"Tích vô hướng ra 1 số, vậy nó 'đo' cái gì?"* Đo mức độ 2 vector cùng hướng. u·v > 0 → góc nhọn (cùng phía); = 0 → vuông góc; < 0 → góc tù (ngược phía). Vd (1,0)·(−1,0) = −1 < 0 vì ngược hẳn.
- *"Vì sao chuẩn lại là √ của tích vô hướng với chính nó?"* Vì v·v = v₁²+...+vₙ² chính là Pytago mở rộng. Trong ℝ²: ||v|| = √(v₁²+v₂²) đúng là độ dài cạnh huyền.

⚠ **Lỗi thường gặp — nhầm tích vô hướng với nhân từng phần tử**. u·v là **1 số** (cộng tất cả các tích), KHÔNG phải vector. Phản ví dụ: (1,2)·(3,4) = 1·3 + 2·4 = **11** (một số), không phải (3, 8). Phép "nhân từng phần tử" (3, 8) tồn tại nhưng gọi là tích Hadamard, khác hẳn.

🔁 **Dừng lại tự kiểm tra**

1. Cho a = (2, −1), b = (1, 2). Tính a·b. Hai vector này có vuông góc không?
2. Tính ||(3, 4)||.

<details><summary>Đáp án</summary>

1. a·b = 2·1 + (−1)·2 = 2 − 2 = **0** → **có**, vuông góc.
2. ||(3,4)|| = √(9+16) = √25 = **5**.

</details>

### 📝 Tóm tắt mục 1

- Vector ℝⁿ = bộ n số = "mũi tên" có hướng + độ dài.
- Cộng/nhân vô hướng làm **từng thành phần**; tích vô hướng u·v cộng các tích → ra **1 số**.
- u·v = 0 ⟺ vuông góc; cos θ = u·v / (||u||·||v||); ||v|| = √(v·v).

---

## 2. Ma trận

💡 **Trực giác / Hình dung**: ma trận = một **cái máy biến đổi không gian**. Đưa vào 1 vector x, máy nhả ra vector mới Ax (đã bị quay/co/giãn/lật/chiếu). Bảng số chỉ là cách "ghi cấu hình" của máy: mỗi cột cho biết vector đơn vị đi về đâu. Vd cột 1 = ảnh của (1,0), cột 2 = ảnh của (0,1). Cộng/nhân vô hướng ma trận = chỉnh cấu hình từng nút; nhân 2 ma trận = **ghép 2 máy** (chạy máy này rồi máy kia).

**Ma trận** m × n = bảng số có m hàng, n cột:
\`\`\`
A = [a₁₁ a₁₂ ... a₁ₙ]
    [a₂₁ a₂₂ ... a₂ₙ]
    [...        ...]
    [aₘ₁ aₘ₂ ... aₘₙ]
\`\`\`

### Cộng / nhân vô hướng

Tương tự vector — cộng từng phần tử, nhân số.

### Nhân ma trận-vector

Nếu A là m×n và x ∈ ℝⁿ:
\`\`\`
y = A·x ∈ ℝᵐ
yᵢ = Σⱼ aᵢⱼ·xⱼ
\`\`\`

Mỗi thành phần y_i = tích vô hướng của hàng i của A với x.

**Ví dụ**: A = [[1,2],[3,4]], x = (5, 6).
- y₁ = 1·5 + 2·6 = 17.
- y₂ = 3·5 + 4·6 = 39.

> 📐 **Định nghĩa đầy đủ — Ma trận**
>
> **(a) Là gì**: Bảng số chữ nhật m×n. KHÔNG chỉ là "lưu trữ data" — ma trận **= phép biến đổi tuyến tính** ℝⁿ → ℝᵐ. Mỗi cột của A là **vector ảnh** của vector đơn vị tương ứng (e₁ → cột 1, e₂ → cột 2, ...). Nhân Ax = "tổ hợp tuyến tính" các cột của A với hệ số là x.
>
> **(b) Vì sao cần**: Ma trận là **ngôn ngữ chung** của hàng trăm bài toán: hệ PT tuyến tính (Ax = b), phép biến hình hình học (quay, đối xứng, vị tự), graph (ma trận liên kết), markov chain, neural network (mỗi layer = nhân ma trận), nén ảnh (SVD), computer graphics (3D rendering = ma trận 4x4). Quan trọng hơn — nhân ma trận = **ghép biến đổi** (composition), cho phép biểu diễn các phép tuyến tính phức tạp = tích các phép đơn giản.
>
> **(c) Ví dụ số**: A = [[1,2],[3,4]], x = (5, 6) → Ax = (17, 39). A·(1,0) = (1,3) = cột 1 của A ✓. A·(0,1) = (2,4) = cột 2 ✓. Ma trận quay 90° R = [[0,-1],[1,0]] biến (1,0) → (0,1), (0,1) → (-1,0). Ghép 2 quay 30° = quay 60°: R(30)·R(30) = R(60). Identity I = [[1,0],[0,1]]: I·x = x (không đổi). Nhân ma trận-ma trận AB: cột j của AB = A·(cột j của B). [[1,2],[3,4]]·[[5,6],[7,8]] = [[19,22],[43,50]].
- y = (17, 39).

### Nhân ma trận-ma trận

A m×n, B n×p → AB là m×p.
\`\`\`
(AB)ᵢⱼ = Σₖ aᵢₖ · bₖⱼ
\`\`\`

= tích vô hướng hàng i của A với cột j của B.

**Verify bằng số** (AB với A = [[1,2],[3,4]], B = [[5,6],[7,8]]):
- (AB)₁₁ = hàng 1 của A · cột 1 của B = 1·5 + 2·7 = **19**.
- (AB)₁₂ = 1·6 + 2·8 = **22**.
- (AB)₂₁ = 3·5 + 4·7 = **43**.
- (AB)₂₂ = 3·6 + 4·8 = **50**. → AB = [[19,22],[43,50]].

⚠ **Lỗi thường gặp 1 — Nhân ma trận KHÔNG giao hoán**: AB ≠ BA (nói chung). Phản ví dụ với A = [[1,2],[3,4]], B = [[0,1],[1,0]]: AB = [[2,1],[4,3]] nhưng BA = [[3,4],[1,2]]. Khác hẳn. Lý do trực giác: "quay rồi lật" ≠ "lật rồi quay".

⚠ **Lỗi thường gặp 2 — nhầm hàng với cột khi nhân**. (AB)ᵢⱼ = **hàng i của A** · **cột j của B**, KHÔNG phải cột i · hàng j. Nếu kích thước không khớp (số cột của A ≠ số hàng của B) thì phép nhân **không tồn tại**: A là 2×3 nhân B là 2×2 → vô nghĩa (3 ≠ 2).

❓ **Câu hỏi tự nhiên của người đọc**

- *"Vì sao quy tắc nhân ma trận 'rối' thế, sao không nhân từng ô như cộng?"* Vì nhân ma trận được **thiết kế để = ghép biến đổi**. Muốn "(A rồi B)·x = A·(B·x)" đúng thì buộc phải dùng quy tắc hàng·cột này. Nhân từng ô không cho tính chất đó.
- *"AB tốn bao nhiêu phép tính?"* Với 2 ma trận n×n: mỗi ô cần n phép nhân, có n² ô → n³ phép nhân. Vd n=2 → 8 phép nhân (khớp 4 ô × 2 tích mỗi ô ở trên).

🔁 **Dừng lại tự kiểm tra**

1. A = [[2,0],[0,3]], x = (1, 1). Tính Ax.
2. A là 3×2, B là 2×4. AB là ma trận cỡ nào? BA có tồn tại không?

<details><summary>Đáp án</summary>

1. Ax = (2·1+0·1, 0·1+3·1) = **(2, 3)** (giãn x gấp 2, y gấp 3).
2. AB là **3×4** (lấy số hàng của A và số cột của B). BA: B là 2×4, A là 3×2 → 4 ≠ 3 → **không tồn tại**.

</details>

### 📝 Tóm tắt mục 2

- Ma trận m×n = bảng số = "máy biến đổi" ℝⁿ → ℝᵐ.
- (Ax)ᵢ = hàng i của A · x; (AB)ᵢⱼ = hàng i của A · cột j của B.
- Nhân ma trận **không giao hoán** (AB ≠ BA) và đòi kích thước khớp (cột A = hàng B).

---

## 3. Ma trận = Phép biến đổi tuyến tính

💡 **Ý tưởng quan trọng**: Ma trận A m×n định nghĩa 1 ánh xạ tuyến tính:
\`\`\`
T: ℝⁿ → ℝᵐ
T(x) = A·x
\`\`\`

**Tính chất tuyến tính**:
- T(x + y) = T(x) + T(y).
- T(c·x) = c·T(x).

### Ví dụ — Phép quay 2D

Ma trận quay góc θ:
\`\`\`
R(θ) = [cos θ  -sin θ]
       [sin θ   cos θ]
\`\`\`

Đã gặp ở [Tier 2 L08](../../02-Geometry/lesson-08-transformations-vector-geo/).

### Ví dụ — Phép vị tự

Ma trận k·I = [[k,0],[0,k]] biến (x, y) → (kx, ky).

**Verify tính tuyến tính bằng số** (T = nhân với [[2,0],[0,3]]):
- T(x+y) = T(x) + T(y)? Lấy x = (1,0), y = (0,1). T(x+y) = T(1,1) = (2,3). T(x)+T(y) = (2,0)+(0,3) = (2,3) ✓.
- T(c·x) = c·T(x)? c = 5, x = (1,0). T(5,0) = (10,0). 5·T(1,0) = 5·(2,0) = (10,0) ✓.

❓ **Câu hỏi tự nhiên của người đọc**

- *"Mọi phép biến đổi đều là ma trận?"* Không — chỉ các phép **tuyến tính** (giữ gốc O cố định, biến đường thẳng thành đường thẳng, giữ tỉ lệ). Vd "dịch chuyển +5 theo x" (tịnh tiến) KHÔNG tuyến tính vì T(0) ≠ 0. (Mẹo: dùng toạ độ thuần nhất 3×3 mới gói được tịnh tiến.)
- *"Sao biết cột ma trận = ảnh của vector đơn vị?"* Vì A·(1,0) = cột 1, A·(0,1) = cột 2 — nhân thử ra đúng. Mọi x = x₁·(1,0) + x₂·(0,1) nên Ax = x₁·cột1 + x₂·cột2.

⚠ **Lỗi thường gặp — tưởng phép quay rồi co bằng phép co rồi quay**. Quay/co riêng lẻ thì tráo thứ tự cho cùng kết quả (vì vị tự đều k·I giao hoán với mọi ma trận), nhưng co **không đều** thì không: co theo x rồi quay ≠ quay rồi co theo x. Liên hệ trực tiếp với AB ≠ BA ở mục 2.

🔁 **Dừng lại tự kiểm tra**

1. Ma trận quay 90° R = [[0,−1],[1,0]] biến (1,0) thành vector nào?
2. T(x) = A·x với A = [[3,0],[0,3]]. Đây là phép gì?

<details><summary>Đáp án</summary>

1. R·(1,0) = (0·1+(−1)·0, 1·1+0·0) = **(0, 1)** — đúng là (1,0) quay 90° ngược chiều kim đồng hồ.
2. **Vị tự** (phóng to đều) hệ số 3: mọi vector dài gấp 3, giữ nguyên hướng.

</details>

### 📝 Tóm tắt mục 3

- Ma trận A định nghĩa ánh xạ tuyến tính T(x) = Ax, thoả T(x+y)=T(x)+T(y) và T(cx)=cT(x).
- Cột thứ j của A = ảnh của vector đơn vị eⱼ.
- Quay, vị tự, chiếu, đối xứng đều là ma trận; tịnh tiến thì **không** (không tuyến tính).

---

## 4. Ma trận đặc biệt

| Tên | Định nghĩa | Ví dụ 2×2 |
|-----|------------|-----------|
| Đơn vị I | aᵢⱼ = 1 nếu i=j, 0 otherwise | [[1,0],[0,1]] |
| Đối xứng | A^T = A | [[1,2],[2,3]] |
| Tam giác trên | aᵢⱼ = 0 khi i > j | [[1,2],[0,3]] |
| Khả nghịch | ∃A⁻¹: A·A⁻¹ = I | det ≠ 0 |
| Trực giao | A^T = A⁻¹ | R(θ) (quay) |

**Chuyển vị** A^T: đổi hàng ↔ cột. (A^T)ᵢⱼ = aⱼᵢ.

💡 **Trực giác / Hình dung**: các ma trận đặc biệt = các "máy biến đổi" có hành vi đặc thù dễ nhận. Đơn vị I = máy "không làm gì" (đầu vào = đầu ra). Trực giao = máy chỉ quay/lật, **không co giãn** (giữ nguyên độ dài, góc). Tam giác trên = hệ phương trình đã "giải sẵn một nửa" (giải ngược được ngay).

**4 ví dụ chuyển vị**: [[1,2],[3,4]]^T = [[1,3],[2,4]]; [[1,2,3]]^T = cột (1,2,3); ma trận đối xứng [[1,2],[2,3]]^T = chính nó; [[0,−1],[1,0]]^T = [[0,1],[−1,0]] (= ma trận quay −90°, đúng vì với ma trận trực giao A^T = A⁻¹).

❓ **Câu hỏi tự nhiên của người đọc**

- *"Ma trận trực giao 'giữ nguyên độ dài' nghĩa là gì?"* ||Ax|| = ||x|| với mọi x. Vd quay 90° không đổi độ dài mũi tên. Kiểm: R = [[0,−1],[1,0]], x = (3,4), Ax = (−4,3), ||Ax|| = 5 = ||x|| ✓.
- *"Vì sao quan tâm ma trận khả nghịch?"* Vì khả nghịch ⟺ máy "có nút undo" — phục hồi được x từ Ax. det ≠ 0 là điều kiện (học kỹ ở Lesson 02).

⚠ **Lỗi thường gặp — tưởng (A^T)ᵢⱼ = aᵢⱼ**. Chuyển vị **tráo chỉ số**: (A^T)ᵢⱼ = aⱼᵢ. Phản ví dụ: A = [[1,2],[3,4]], a₁₂ = 2 nhưng (A^T)₁₂ = a₂₁ = **3**, không phải 2.

🔁 **Dừng lại tự kiểm tra**

1. Viết chuyển vị của [[2,5],[0,7]].
2. Ma trận đối xứng 2×2 tổng quát có dạng nào?

<details><summary>Đáp án</summary>

1. [[2,0],[5,7]] (tráo hàng↔cột).
2. [[a,b],[b,c]] — phần tử ngoài đường chéo bằng nhau (A^T = A).

</details>

### 📝 Tóm tắt mục 4

- I = "không làm gì"; trực giao = chỉ quay/lật (A^T = A⁻¹, giữ độ dài); đối xứng A^T = A.
- Chuyển vị tráo chỉ số: (A^T)ᵢⱼ = aⱼᵢ.
- Khả nghịch ⟺ det ≠ 0 ⟺ máy "undo được".

---

## 5. Quy tắc đại số ma trận

- A + B = B + A (giao hoán cộng).
- (AB)C = A(BC) (kết hợp).
- A(B+C) = AB + AC (phân phối).
- AB ≠ BA (không giao hoán).
- (AB)^T = B^T · A^T (đảo thứ tự).
- I·A = A·I = A.

💡 **Trực giác / Hình dung**: đại số ma trận giống đại số số thực ở **gần như mọi luật** (kết hợp, phân phối, có "số 1" là I), **trừ một điều**: phép nhân không giao hoán. Nhớ điều ngoại lệ này là chìa khoá tránh sai.

**Verify (AB)^T = B^T·A^T bằng số** (A = [[1,2],[3,4]], B = [[0,1],[1,0]]):
- AB = [[2,1],[4,3]] → (AB)^T = [[2,4],[1,3]].
- B^T·A^T = [[0,1],[1,0]]·[[1,3],[2,4]] = [[2,4],[1,3]] ✓ (khớp). Lưu ý thứ tự **đảo**: B^T trước A^T.

❓ **Câu hỏi tự nhiên của người đọc**

- *"Vì sao (AB)^T lại đảo thành B^T·A^T chứ không A^T·B^T?"* Trực giác "mặc áo rồi cởi": mặc áo trong → áo ngoài; cởi thì ngoài trước → trong sau. Chuyển vị "đảo trình tự". Verify số ở trên xác nhận.
- *"(A+B)^T có đảo không?"* Không — cộng giao hoán nên (A+B)^T = A^T + B^T (không cần đảo). Chỉ phép **nhân** mới đảo.

⚠ **Lỗi thường gặp — áp dụng (AB)² = A²B²**. Sai vì (AB)² = ABAB, mà BA ≠ AB nên không gom thành A²B². Chỉ đúng khi A, B giao hoán. Phản ví dụ: A=[[1,1],[0,1]], B=[[1,0],[1,1]] → (AB)² ≠ A²B² (tự nhân kiểm chứng).

🔁 **Dừng lại tự kiểm tra**

1. Rút gọn (ABC)^T.
2. Đúng/sai: A(B+C) = AB + AC?

<details><summary>Đáp án</summary>

1. (ABC)^T = C^T·B^T·A^T (đảo toàn bộ thứ tự).
2. **Đúng** — phân phối luôn đúng (kể cả khi không giao hoán), miễn kích thước khớp.

</details>

### 📝 Tóm tắt mục 5

- Ma trận có kết hợp, phân phối, đơn vị I — giống số thực.
- Ngoại lệ then chốt: **không giao hoán** AB ≠ BA → (AB)² ≠ A²B², cẩn thận khi rút gọn.
- (AB)^T = B^T·A^T (đảo thứ tự); (A+B)^T = A^T+B^T (không đảo).

---

## 6. Bài tập

### Bài tập

**Bài 1**: u = (1, 2, -1), v = (3, 0, 2). Tính u · v và ||u||.

**Bài 2**: A = [[1, 2], [3, 4]], B = [[0, 1], [1, 0]]. Tính AB và BA.

**Bài 3**: Cho A = [[2, 1], [1, 3]], x = (1, 2). Tính Ax.

**Bài 4**: Tính tích vô hướng (1, 2, 3, 4) · (5, 6, 7, 8).

**Bài 5**: Ma trận đối xứng A 2×2 có dạng nào tổng quát?

### Lời giải

**Bài 1**: u·v = 3 + 0 - 2 = **1**. ||u|| = √(1+4+1) = **√6**.

**Bài 2**:  
- AB: hàng 1 nhân cột B: [1·0+2·1, 1·1+2·0] = [2, 1]. Hàng 2: [3·0+4·1, 3·1+4·0] = [4, 3].  
- AB = [[2,1],[4,3]].  
- BA = [[3,4],[1,2]].  
- ≠ → không giao hoán.

**Bài 3**: y₁ = 2·1+1·2 = 4. y₂ = 1·1+3·2 = 7. → **y = (4, 7)**.

**Bài 4**: 5+12+21+32 = **70**.

**Bài 5**: A = [[a, b], [b, c]] với a, b, c bất kỳ. (Đường chéo phụ đối xứng.)

---

## 7. Bài tiếp theo

[Lesson 02 — Định thức & hệ tuyến tính](../lesson-02-determinants-linear-systems/).

## 📝 Tổng kết

1. **Vector ℝⁿ**: cộng, nhân vô hướng, tích vô hướng, chuẩn.
2. **Ma trận**: cộng, nhân, **không giao hoán**.
3. **Nhân ma trận-vector**: y_i = hàng i của A · x.
4. **Ma trận = phép biến đổi tuyến tính** T: ℝⁿ → ℝᵐ.
5. **Quay**, **vị tự**, **chiếu**, ... đều là ma trận.
`;
