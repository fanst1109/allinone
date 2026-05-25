# Lesson 07 — Eigenvector & Eigenvalue

> Tầng 4 — Linear Algebra · Bài 7/8 · Tiền đề: [Lesson 06 — Ma trận là biến đổi](../lesson-06-matrix-as-transform/)

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Hiểu **eigenvector** là hướng "không bị xoay" khi áp ma trận `A`, **eigenvalue** là hệ số kéo dài/co lại trên hướng đó.
- Lập và giải **phương trình đặc trưng** `det(A − λI) = 0` để tìm eigenvalue cho ma trận 2×2 (và 3×3 đơn giản).
- Từ eigenvalue, giải `(A − λI)v = 0` để tìm eigenvector.
- Nắm 2 hệ thức kiểm tra: `λ₁ + λ₂ = trace(A)`, `λ₁ · λ₂ = det(A)`.
- **Diagonalization** `A = P D P⁻¹` và dùng để tính `A^k` cực nhanh.
- Hiểu **định lý phổ (spectral theorem)** cho ma trận đối xứng: luôn có hệ eigenvector trực giao.
- Áp dụng vào: **PageRank** (Google), **PCA** (giảm chiều), **spectral clustering**, **stability** của hệ động học.
- Cài đặt **power iteration** — thuật toán lặp tìm eigenvalue có |λ| lớn nhất, nền của PageRank thuở ban đầu.

## Kiến thức tiền đề

- [Lesson 05 — Ma trận: phép toán](../lesson-05-matrices/) — phép nhân ma trận-vector `Av`, định thức `det(A)`, ma trận đơn vị `I`, ma trận nghịch đảo `A⁻¹`.
- [Lesson 06 — Ma trận là biến đổi](../lesson-06-matrix-as-transform/) — hình dung `A` như **một hàm** kéo, xoay, lật, co không gian.
- [Algebra Lesson 06](../../01-Algebra/lesson-06-linear-quadratic/) — nghiệm phương trình bậc 2 (dùng để giải đặc trưng).
- [Algebra Lesson 08](../../01-Algebra/lesson-08-linear-systems/) — giải hệ phương trình tuyến tính bằng khử Gauss (dùng để tìm eigenvector).

---

## 1. Vì sao phải học cái này?

> **Câu hỏi mở bài**: Khi áp ma trận `A` lên một vector `v`, kết quả `Av` thường **xoay** và **kéo dài** `v` đi đâu đó. Có cách nào "xếp gọn" hành động của `A` thành những thao tác đơn giản nhất — chỉ là **kéo dài** trên một số trục riêng?

Câu trả lời: tìm những **trục đặc biệt** mà `A` chỉ kéo dài/co lại (không xoay). Trên các trục đó, hành động của `A` đơn giản như **nhân với một số**. Đó là ý tưởng eigenvector/eigenvalue.

### 1.1 💡 Trực giác: "trục không bị xoay"

Hình dung tấm cao su `ℝ²` được kéo dãn bởi ma trận `A`. Hầu hết vector mũi tên bị **xoay đi hướng khác** sau khi áp `A`. Nhưng có một số hướng — gọi là **trục riêng** — mà mũi tên sau khi biến đổi vẫn nằm trên **cùng đường thẳng** đi qua gốc, chỉ là dài/ngắn hơn (hoặc đảo chiều).

- Mũi tên trên trục riêng: **eigenvector** (vector riêng).
- Hệ số kéo dài/co lại trên trục đó: **eigenvalue** (giá trị riêng), ký hiệu `λ` (lambda).

Công thức gọn:
```
A · v = λ · v       với v ≠ 0
```

Hai vế cùng vector! Bên trái là phép nhân ma trận-vector, bên phải chỉ là nhân vô hướng. **Nhân ma trận lớn → thu về nhân một số.** Đó là sự "đơn giản hóa" mà ta theo đuổi.

### 1.2 Một ví dụ ngay lập tức để có cảm giác

Lấy `A = [[3, 0], [0, 2]]` (ma trận chéo). Áp lên `v = (1, 0)`:
```
A v = [[3, 0], [0, 2]] · (1, 0) = (3·1 + 0·0, 0·1 + 2·0) = (3, 0) = 3 · (1, 0)
```
→ Vector `(1, 0)` bị kéo dài lên gấp 3 mà **không xoay**. Vậy `(1, 0)` là eigenvector, `λ = 3` là eigenvalue.

Tương tự `(0, 1)` → `(0, 2) = 2 · (0, 1)` → eigenvector, `λ = 2`.

Còn `v = (1, 1)`? Ta có `Av = (3, 2)`, không cùng phương với `(1, 1)` (vì `3/1 ≠ 2/1`). → **không** phải eigenvector.

### 1.3 ❓ Câu hỏi tự nhiên của người đọc

- "Có phải mọi ma trận đều có eigenvector?" → **Không**. Ma trận xoay 90° không có eigenvector thực (sẽ tính ở mục 4.4).
- "Nếu `λ = 0` thì sao?" → `Av = 0`, tức là `v` nằm trong **kernel** của `A`. Có eigenvalue 0 ⇔ `det(A) = 0` ⇔ `A` không khả nghịch.
- "Eigenvector có duy nhất không?" → **Không**. Nếu `v` là eigenvector thì `2v`, `-v`, `c·v` (mọi `c ≠ 0`) đều là eigenvector cùng `λ`. Chúng nằm trên cùng một đường thẳng — gọi là **eigenspace**.
- "Có cần `v` đơn vị (norm 1) không?" → Không bắt buộc trong định nghĩa, nhưng trong thực hành ta thường **chuẩn hóa** `v` về độ dài 1 để báo cáo gọn.

📝 **Tóm tắt mục 1**:
- Eigenvector = hướng không bị xoay khi áp ma trận.
- Eigenvalue = hệ số kéo dài/co trên hướng đó.
- `A v = λ v`, với `v ≠ 0`.
- Eigenvector là đường thẳng (1 chiều) — có vô số đại diện.

---

## 2. Định nghĩa chính xác

**Định nghĩa.** Cho ma trận vuông `A ∈ ℝⁿˣⁿ`. Một **eigenvector** của `A` là một vector `v ∈ ℝⁿ`, `v ≠ 0`, sao cho tồn tại số thực (hoặc phức) `λ` với:
```
A v = λ v
```
Số `λ` được gọi là **eigenvalue** ứng với `v`.

⚠ **Lỗi thường gặp**:
- Quên ràng buộc `v ≠ 0`. Nếu cho phép `v = 0` thì `A·0 = 0 = λ·0` đúng với mọi `λ` — vô nghĩa.
- Nhầm eigenvector và eigenvalue. **Eigenvalue là một số**, **eigenvector là một vector**.
- Quên rằng `A` **phải vuông**. Khái niệm eigen chỉ định nghĩa cho ma trận vuông (`n × n`).

### 2.1 Gốc chữ "eigen"

"Eigen" trong tiếng Đức nghĩa là "riêng, của bản thân, đặc trưng" — David Hilbert dùng từ này đầu thế kỷ 20. Vậy:
- **Eigenvector** = "vector riêng" (vector đặc trưng của `A`).
- **Eigenvalue** = "giá trị riêng" của `A`.
- **Eigenspace** = "không gian riêng" ứng với một `λ` cụ thể.

### 2.2 Eigenspace ứng với một eigenvalue

Với eigenvalue `λ` cố định, tập hợp các eigenvector ứng với `λ` **cùng với vector 0** tạo thành một không gian con của `ℝⁿ`:
```
E_λ = { v ∈ ℝⁿ : A v = λ v } = ker(A − λI)
```
- Nếu `dim(E_λ) = 1`: chỉ có 1 hướng riêng (đường thẳng).
- Nếu `dim(E_λ) ≥ 2`: nhiều hướng cùng eigenvalue (như ma trận `2I` có mọi vector đều là eigenvector với `λ = 2`).

🔁 **Dừng lại tự kiểm tra**:
1. Vector `0` có phải eigenvector không? Vì sao?
2. Cho `A v = 5 v`, hỏi `A (3v) = ?`

<details>
<summary>Đáp án</summary>

1. Không. Theo định nghĩa eigenvector phải khác `0`. Tuy nhiên `0` **thuộc** mọi eigenspace `E_λ`.
2. `A(3v) = 3·Av = 3·(5v) = 15v = 5·(3v)` → `3v` cũng là eigenvector cùng `λ = 5`. (Đây là lý do eigenspace là không gian con — đóng dưới scalar multiplication.)

</details>

📝 **Tóm tắt mục 2**:
- `A v = λ v`, `v ≠ 0`.
- Mỗi eigenvalue đi kèm một **eigenspace** = kernel của `A − λI`.
- Eigenspace luôn chứa `0` (nhưng `0` không gọi là eigenvector).

---

## 3. Phương trình đặc trưng (Characteristic Polynomial)

Làm sao tìm `λ` một cách hệ thống? Viết lại `A v = λ v` thành:
```
A v − λ v = 0
(A − λI) v = 0       (đẩy λI sang trái, I là ma trận đơn vị)
```
Phương trình `(A − λI) v = 0` có **nghiệm `v ≠ 0`** khi và chỉ khi `A − λI` không khả nghịch, tương đương:
```
det(A − λI) = 0
```
Đây là **phương trình đặc trưng**. Vế trái khi khai triển là một đa thức bậc `n` theo `λ` — gọi là **đa thức đặc trưng** `p_A(λ)`.

### 3.1 💡 Trực giác

`det = 0` nghĩa là `(A − λI)` **bóp không gian xuống chiều thấp hơn** (xem Lesson 06). Khi đó có vector `v ≠ 0` bị bóp về `0` — đó chính là eigenvector ta tìm.

### 3.2 Walk-through chi tiết cho ma trận 2×2

Cho `A = [[a, b], [c, d]]`. Tính:
```
A − λI = [[a−λ, b], [c, d−λ]]

det(A − λI) = (a−λ)(d−λ) − bc
            = λ² − (a+d)·λ + (ad − bc)
            = λ² − trace(A)·λ + det(A)
```
→ **Công thức vàng cho 2×2**:
```
p_A(λ) = λ² − T·λ + D    với T = trace(A), D = det(A)
```
Hai nghiệm:
```
λ = ( T ± √(T² − 4D) ) / 2
```

### 3.3 Ví dụ tính trực tiếp

**Ví dụ 1.** `A = [[4, 1], [2, 3]]`. `T = 4 + 3 = 7`, `D = 4·3 − 1·2 = 10`.
```
p_A(λ) = λ² − 7λ + 10 = (λ − 2)(λ − 5)
→ λ₁ = 2, λ₂ = 5
```
Kiểm tra: `λ₁ + λ₂ = 7 = T ✓`; `λ₁ · λ₂ = 10 = D ✓`.

**Ví dụ 2.** `A = [[3, 1], [0, 2]]` (tam giác trên). `T = 5`, `D = 6`.
```
p_A(λ) = λ² − 5λ + 6 = (λ − 2)(λ − 3) → λ₁ = 2, λ₂ = 3
```
Nhận xét: với ma trận **tam giác** (trên hoặc dưới), eigenvalue chính là các phần tử trên đường chéo chính.

**Ví dụ 3.** `A = [[2, 1], [1, 2]]` (đối xứng). `T = 4`, `D = 3`.
```
p_A(λ) = λ² − 4λ + 3 = (λ − 1)(λ − 3) → λ₁ = 1, λ₂ = 3
```

**Ví dụ 4.** `A = [[0, -1], [1, 0]]` (xoay 90°). `T = 0`, `D = 1`.
```
p_A(λ) = λ² + 1 = 0 → λ = ±i
```
**Không có eigenvalue thực** — phù hợp với trực giác: xoay 90° không có hướng nào "bất biến" trong `ℝ²` thật.

### 3.4 ⚠ Lỗi thường gặp

- Quên trừ `λ` trên đường chéo: viết `det(A) = 0` chứ không phải `det(A − λI) = 0`. Sai hoàn toàn.
- Đặt sai dấu trong khử Gauss khi `λ` âm: phải xử lý `λ = -3` cẩn thận, vd `A − (-3)I = A + 3I`.
- Tưởng đa thức đặc trưng phải có nghiệm thực — với ma trận thực vẫn có thể nghiệm phức.

🔁 **Dừng lại tự kiểm tra**:
1. Cho `A = [[5, 2], [-1, 2]]`, lập đa thức đặc trưng.
2. Đoán eigenvalue của `A = [[7, 0, 0], [0, 3, 0], [0, 0, -1]]` không cần tính.

<details>
<summary>Đáp án</summary>

1. `T = 7`, `D = 5·2 − 2·(-1) = 12`. `p_A(λ) = λ² − 7λ + 12 = (λ-3)(λ-4)` → `λ = 3, 4`.
2. Ma trận chéo → eigenvalue là chính các phần tử đường chéo: `7, 3, -1`.

</details>

📝 **Tóm tắt mục 3**:
- Eigenvalue = nghiệm của `det(A − λI) = 0`.
- 2×2: `p_A(λ) = λ² − T·λ + D` với `T = trace`, `D = det`.
- Tam giác/chéo → eigenvalue đọc thẳng trên đường chéo.
- Đa thức đặc trưng bậc `n` có đúng `n` nghiệm (đếm cả phức và bội).

---

## 4. Tìm eigenvector sau khi biết eigenvalue

Sau khi có `λ`, giải hệ:
```
(A − λI) v = 0
```
bằng khử Gauss. Vì `det(A − λI) = 0`, ma trận này **suy biến** → hệ có vô số nghiệm tạo thành một không gian con (eigenspace).

### 4.1 Walk-through Ví dụ 1: `A = [[4, 1], [2, 3]]`

Đã tìm `λ₁ = 2`, `λ₂ = 5`.

**Với `λ = 2`**:
```
A − 2I = [[4−2, 1], [2, 3−2]] = [[2, 1], [2, 1]]
```
Giải `[[2, 1], [2, 1]] · (x, y) = 0`:
- Cả 2 hàng cho `2x + y = 0` → `y = -2x`.
- Đặt `x = 1` → `v₁ = (1, -2)`.

Kiểm tra: `A v₁ = (4·1 + 1·(-2), 2·1 + 3·(-2)) = (2, -4) = 2 · (1, -2) ✓`.

**Với `λ = 5`**:
```
A − 5I = [[-1, 1], [2, -2]]
```
Hàng 1: `-x + y = 0` → `y = x`. Đặt `x = 1` → `v₂ = (1, 1)`.

Kiểm tra: `A v₂ = (4 + 1, 2 + 3) = (5, 5) = 5 · (1, 1) ✓`.

### 4.2 Walk-through Ví dụ 2: `A = [[3, 1], [0, 2]]`

`λ₁ = 3`, `λ₂ = 2`.

**Với `λ = 3`**: `A − 3I = [[0, 1], [0, -1]]`. Hàng 1: `y = 0`. `x` tự do → `v₁ = (1, 0)`.

**Với `λ = 2`**: `A − 2I = [[1, 1], [0, 0]]`. Hàng 1: `x + y = 0` → `y = -x`. `v₂ = (1, -1)`.

Kiểm tra `λ = 2`: `A · (1, -1) = (3·1 + 1·(-1), 0 + 2·(-1)) = (2, -2) = 2·(1, -1) ✓`.

### 4.3 Walk-through Ví dụ 3 (đối xứng): `A = [[2, 1], [1, 2]]`

`λ₁ = 1`, `λ₂ = 3`.

**`λ = 1`**: `A − I = [[1, 1], [1, 1]]`. → `x + y = 0` → `v₁ = (1, -1)`.

**`λ = 3`**: `A − 3I = [[-1, 1], [1, -1]]`. → `-x + y = 0` → `v₂ = (1, 1)`.

Kiểm tra **trực giao** (vì `A` đối xứng): `v₁ · v₂ = 1·1 + (-1)·1 = 0 ✓`.

### 4.4 Ma trận xoay 90° — không eigenvector thực

`A = [[0, -1], [1, 0]]`, eigenvalue phức `λ = ±i`. Với `λ = i`:
```
A − iI = [[-i, -1], [1, -i]]
```
Hàng 2: `x - i·y = 0` → `x = i·y`. Eigenvector phức: `v = (i, 1)`.

Trong thực hành ML thường tránh tình huống này bằng cách làm việc với **ma trận đối xứng** (covariance, Gram matrix...) — luôn có eigenvalue thực.

### 4.5 ⚠ Lỗi thường gặp

- Quên kiểm tra `Av = λv` sau khi giải. Sai dấu hay sai số ở khử Gauss là chuyện thường — luôn verify.
- Báo nghiệm là `v = (0, 0)`. Vector 0 không phải eigenvector. Khi giải hệ, **phải** tìm nghiệm không tầm thường — đó là lý do hệ suy biến (vô số nghiệm) mới đúng.
- Nhân ma trận sai thứ tự: `A · v` chứ không phải `v · A` (sau là phép nhân hàng).

📝 **Tóm tắt mục 4**:
- Sau khi biết `λ`, giải `(A − λI)v = 0` để tìm eigenvector.
- Hệ luôn suy biến → vô số nghiệm → chọn 1 đại diện (thường đẹp số).
- Verify lại bằng `A v = λ v`.

---

## 5. Hai hệ thức kiểm tra: Trace và Determinant

Với ma trận `n × n` có `n` eigenvalue `λ₁, λ₂, ..., λₙ` (đếm cả bội):
```
λ₁ + λ₂ + ... + λₙ = trace(A) = Σ a_ii
λ₁ · λ₂ · ... · λₙ = det(A)
```
Rất hữu ích để **phát hiện lỗi** khi tính tay.

### 5.1 Verify trên các ví dụ trước

| Ma trận `A` | trace | det | eigenvalue | Σλ | Πλ | OK? |
|---|---|---|---|---|---|---|
| `[[4,1],[2,3]]` | 7 | 10 | 2, 5 | 7 | 10 | ✓ |
| `[[3,1],[0,2]]` | 5 | 6 | 2, 3 | 5 | 6 | ✓ |
| `[[2,1],[1,2]]` | 4 | 3 | 1, 3 | 4 | 3 | ✓ |
| `[[2,0],[0,3]]` | 5 | 6 | 2, 3 | 5 | 6 | ✓ |

### 5.2 💡 Vì sao đúng?

Khai triển đa thức đặc trưng:
```
p_A(λ) = (λ − λ₁)(λ − λ₂)...(λ − λₙ)
       = λⁿ − (Σλᵢ)·λⁿ⁻¹ + ... + (-1)ⁿ · (Πλᵢ)
```
So với khai triển `det(λI − A)`: hệ số của `λⁿ⁻¹` là `-trace(A)`, hệ số tự do là `(-1)ⁿ · det(A)`. Đối chiếu hai bên → 2 hệ thức trên.

🔁 **Tự kiểm tra**: Cho `A` có eigenvalue `2, 3, -1`. Tính `trace(A)`, `det(A)`.

<details>
<summary>Đáp án</summary>

`trace = 2 + 3 + (-1) = 4`; `det = 2 · 3 · (-1) = -6`.

</details>

📝 **Tóm tắt mục 5**:
- `Σ λᵢ = trace(A)`, `Π λᵢ = det(A)`.
- Dùng để kiểm tra nhanh khi tính tay.
- Nếu `det(A) = 0` → có ít nhất 1 eigenvalue `= 0`.

---

## 6. Diagonalization — đường chéo hóa

### 6.1 💡 Trực giác

Eigenvector cho ta một **hệ trục mới** mà trên đó `A` chỉ là "kéo dài đơn lẻ". Nếu đổi sang basis eigenvector, ma trận `A` trở thành **ma trận chéo** — đơn giản nhất có thể.

### 6.2 Định lý

Cho `A ∈ ℝⁿˣⁿ`. Nếu `A` có `n` eigenvector độc lập tuyến tính `v₁, ..., vₙ` với eigenvalue `λ₁, ..., λₙ`, thì:
```
A = P D P⁻¹
```
trong đó:
- `P = [v₁ | v₂ | ... | vₙ]` (ma trận có các cột là eigenvector).
- `D = diag(λ₁, λ₂, ..., λₙ)` (ma trận chéo các eigenvalue, cùng thứ tự với cột của `P`).

Tương đương: `A P = P D`.

### 6.3 Chứng minh ngắn (`A P = P D`)

Xét cột thứ `k` của hai vế:
- `A P`: cột `k` = `A · v_k = λ_k · v_k` (theo định nghĩa eigenvector).
- `P D`: cột `k` = `P · (cột k của D)` = `P · (λ_k · e_k)` = `λ_k · v_k`.

Hai cột bằng nhau → hai ma trận bằng nhau. ✓

Khi `P` khả nghịch (eigenvector độc lập tuyến tính), nhân `P⁻¹` bên phải hai vế: `A = P D P⁻¹`.

### 6.4 Khi nào diagonalizable?

`A` diagonalizable ⇔ có đủ `n` eigenvector độc lập tuyến tính.

- **Eigenvalue khác nhau từng đôi** → diagonalizable (eigenvector tương ứng tự khắc độc lập).
- **Có eigenvalue bội** thì cần kiểm tra: eigenspace ứng với `λ` có đủ chiều bằng bội số đại số của `λ` hay không.

### 6.5 Walk-through đầy đủ

Cho `A = [[2, 1], [1, 2]]` (mục 4.3). Eigen: `λ₁ = 1, v₁ = (1, -1)`; `λ₂ = 3, v₂ = (1, 1)`.

**Lập `P` và `D`**:
```
P = [[1, 1], [-1, 1]]
D = [[1, 0], [0, 3]]
```

**Tính `P⁻¹`** (2×2 nghịch đảo: hoán đổi đường chéo, đổi dấu phụ, chia `det`):
```
det(P) = 1·1 − 1·(-1) = 2
P⁻¹ = (1/2) · [[1, -1], [1, 1]] = [[0.5, -0.5], [0.5, 0.5]]
```

**Verify `A = P D P⁻¹`**:
```
P D = [[1, 1], [-1, 1]] · [[1, 0], [0, 3]]
    = [[1·1+1·0, 1·0+1·3], [-1·1+1·0, -1·0+1·3]]
    = [[1, 3], [-1, 3]]

(P D) · P⁻¹ = [[1, 3], [-1, 3]] · [[0.5, -0.5], [0.5, 0.5]]

Hàng 1: (1·0.5 + 3·0.5, 1·(-0.5) + 3·0.5) = (0.5+1.5, -0.5+1.5) = (2, 1) ✓
Hàng 2: (-1·0.5 + 3·0.5, -1·(-0.5) + 3·0.5) = (-0.5+1.5, 0.5+1.5) = (1, 2) ✓
```
Đúng = `A = [[2, 1], [1, 2]]` ban đầu.

### 6.6 Ý nghĩa hình học

Đọc `A x = (P D P⁻¹) x` từ phải sang trái:
1. `P⁻¹ x`: đổi tọa độ `x` từ basis chuẩn `(e₁, e₂)` sang basis eigenvector `(v₁, v₂)`.
2. `D · (...)`: trong basis mới, chỉ là **kéo dài theo từng trục** với hệ số `λ_k`.
3. `P · (...)`: đổi tọa độ ngược trở lại basis chuẩn.

Vậy `A` = "đổi sang basis riêng → kéo dài theo trục riêng → đổi về basis cũ".

⚠ **Lỗi thường gặp**:
- Để `P` và `D` **không cùng thứ tự** (cột thứ `k` của `P` phải là eigenvector của `λ_k` ở vị trí `(k, k)` của `D`). Nếu đổi thứ tự cột `P` thì phải đổi tương ứng trên `D`.
- Quên kiểm tra `det(P) ≠ 0` (eigenvector độc lập). Nếu `det(P) = 0`, không diagonalizable.

📝 **Tóm tắt mục 6**:
- `A = P D P⁻¹` khi có đủ `n` eigenvector độc lập.
- `P` = cột eigenvector, `D` = chéo eigenvalue (cùng thứ tự).
- Ý nghĩa: trong basis eigenvector, `A` chỉ là kéo dài theo trục.

---

## 7. Tính `A^k` cực nhanh

### 7.1 Công thức

Nếu `A = P D P⁻¹` thì:
```
A² = (P D P⁻¹)(P D P⁻¹) = P D (P⁻¹P) D P⁻¹ = P D² P⁻¹
A³ = P D³ P⁻¹
...
A^k = P D^k P⁻¹
```
Và `D^k` rất dễ tính — chỉ cần lũy thừa các phần tử đường chéo:
```
D = diag(λ₁, λ₂, ..., λₙ) → D^k = diag(λ₁^k, λ₂^k, ..., λₙ^k)
```

### 7.2 Walk-through: `A = [[2, 1], [1, 2]]`, tính `A^10`

Đã có `P = [[1, 1], [-1, 1]]`, `D = diag(1, 3)`, `P⁻¹ = [[0.5, -0.5], [0.5, 0.5]]`.
```
D^10 = diag(1^10, 3^10) = diag(1, 59049)

P · D^10 = [[1·1 + 1·0, 1·0 + 1·59049], [-1·1 + 1·0, -1·0 + 1·59049]]
        = [[1, 59049], [-1, 59049]]

A^10 = (P D^10) · P⁻¹

Hàng 1: (1·0.5 + 59049·0.5, 1·(-0.5) + 59049·0.5) = (29525, 29524)
Hàng 2: (-1·0.5 + 59049·0.5, -1·(-0.5) + 59049·0.5) = (29524, 29525)

→ A^10 = [[29525, 29524], [29524, 29525]]
```

### 7.3 Vì sao quan trọng?

- **Markov chain & random walk**: `A^k · p₀` cho phân phối sau `k` bước (PageRank dùng cái này).
- **Hệ động học rời rạc**: `xₖ₊₁ = A xₖ` → `xₖ = A^k x₀`.
- **Tính nhanh fibonacci tổng quát**: viết Fibonacci dưới dạng `A^k` của ma trận đồng hành 2×2.

❓ **Câu hỏi tự nhiên**:
- "Nếu không diagonalizable thì sao?" → Dùng dạng Jordan (`A = P J P⁻¹` với `J` block-diagonal). Phức tạp hơn nhưng vẫn có cách tính `A^k`.
- "`A` không vuông thì sao?" → Không có eigenvalue, dùng **SVD** (Lesson 08).

📝 **Tóm tắt mục 7**:
- `A^k = P · D^k · P⁻¹`, độ phức tạp `O(n³ + n)` thay vì `O(n³·k)`.
- Mở đường cho Markov chain, recurrence relation, dynamical system.

---

## 8. Định lý phổ cho ma trận đối xứng

### 8.1 Phát biểu

Cho `A` là ma trận thực **đối xứng** (`Aᵀ = A`). Khi đó:

1. Mọi eigenvalue của `A` đều là số **thực**.
2. `A` luôn **diagonalizable**, và hơn thế, có thể chọn `n` eigenvector **trực giao đôi một** (sau khi chuẩn hóa thành **trực chuẩn**).
3. `A = Q D Qᵀ` trong đó `Q` trực giao (`Qᵀ = Q⁻¹`), cột của `Q` là eigenvector trực chuẩn.

Dạng `Q D Qᵀ` này được gọi là **phổ phân tích (spectral decomposition)**.

### 8.2 💡 Vì sao quan trọng?

Hầu hết các ma trận quan trọng trong ML là đối xứng:
- **Covariance matrix** `Σ` trong PCA.
- **Gram matrix** `XᵀX` trong least squares.
- **Laplacian** của graph trong spectral clustering.
- **Hessian** của hàm mất mát.

→ Bài toán quy về tìm eigen của ma trận đối xứng — đảm bảo có nghiệm thực, dễ tính, và có cấu trúc trực giao đẹp.

### 8.3 Verify trên ví dụ

`A = [[2, 1], [1, 2]]`. Eigen: `λ₁ = 1, v₁ = (1, -1)`; `λ₂ = 3, v₂ = (1, 1)`.

- `v₁ · v₂ = 1·1 + (-1)·1 = 0` → **trực giao** ✓.
- Chuẩn hóa: `‖v₁‖ = √2`, `q₁ = (1/√2, -1/√2)`. Tương tự `q₂ = (1/√2, 1/√2)`.

```
Q = [[1/√2, 1/√2], [-1/√2, 1/√2]]   (cột q₁, q₂)
D = diag(1, 3)
```

Kiểm tra `Qᵀ Q = I`:
```
Qᵀ = [[1/√2, -1/√2], [1/√2, 1/√2]]
Qᵀ Q: (1,1) = (1/√2)² + (-1/√2)² = 1/2 + 1/2 = 1 ✓
       (1,2) = (1/√2)(1/√2) + (-1/√2)(1/√2) = 0 ✓
       (2,2) = (1/√2)² + (1/√2)² = 1 ✓
```

📝 **Tóm tắt mục 8**:
- `Aᵀ = A` → eigenvalue thực + eigenvector trực giao + `A = Q D Qᵀ`.
- Đây là lý do PCA, spectral clustering, Laplacian eigenmap... tất cả "chạy được mượt".

---

## 9. Ứng dụng

### 9.1 PageRank của Google

**Bài toán**: xếp hạng `n` trang web theo độ "quan trọng".

**Mô hình**: random surfer click link ngẫu nhiên. Xác suất ở trang `i` sau nhiều bước → phân phối ổn định `π = (π₁, ..., πₙ)`.

**Ma trận chuyển trạng thái** `M`: `M[j][i] = 1/k_i` nếu trang `i` có link tới trang `j` (`k_i` = số link ra của trang `i`), `0` ngược lại. Mỗi cột `M` cộng = 1.

**Phương trình bất biến**:
```
M · π = π
```
→ `π` là **eigenvector của `M` với eigenvalue `λ = 1`**.

Với damping factor `d = 0.85`:
```
M' = d · M + (1 - d)/n · J     (J = ma trận toàn 1)
M' · π = π
```

**Vì sao luôn có `λ = 1`?** `Mᵀ · 1 = 1` (mỗi cột `M` cộng = 1, nên ma trận `Mᵀ` có vector toàn 1 là eigenvector với `λ = 1`). Vì `M` và `Mᵀ` cùng đa thức đặc trưng → `M` cũng có `λ = 1`.

### 9.2 Mini ví dụ PageRank

4 trang A, B, C, D với liên kết:
- A → B, C
- B → C
- C → A
- D → C

Ma trận chuyển (cột `i` = phân phối từ trang `i`):
```
         from: A    B    C    D
to:  A [  0    0    1    0  ]
     B [  1/2  0    0    0  ]
     C [  1/2  1    0    1  ]
     D [  0    0    0    0  ]
```

(Lưu ý: D không có link ra. Trong thực tế thêm "dangling node fix" — random teleport.)

Áp dụng power iteration (mục 10) từ `π₀ = (0.25, 0.25, 0.25, 0.25)`:
- Bước 1: `M π₀ = (0.25, 0.125, 0.5, 0)`
- Bước 2: `M π₁ = (0.5, 0.125, 0.25, 0)`
- ... hội tụ về `π ≈ (0.39, 0.20, 0.41, 0)` (chuẩn hóa lại, ignore D).

Hạng: C (0.41) > A (0.39) > B (0.20) > D (0). C cao nhất vì nhiều trang trỏ tới.

### 9.3 PCA (Principal Component Analysis)

(Sẽ học chi tiết ở **Lesson 08**.)

**Bài toán**: giảm chiều dữ liệu — tìm hướng giữ nhiều phương sai (variance) nhất.

**Cách**:
1. Tính ma trận covariance `Σ = (1/n) · XᵀX` (sau khi đã center data).
2. `Σ` đối xứng → eigen-decomposition `Σ = Q D Qᵀ`.
3. **Principal components** = cột của `Q`, sắp xếp theo `λ` giảm dần.
4. Giữ `k` thành phần đầu → giảm chiều từ `d` xuống `k`.

Eigenvalue `λᵢ` = phương sai dữ liệu chiếu lên trục `qᵢ`. Tỷ lệ `λᵢ / Σλⱼ` = % phương sai giữ được.

### 9.4 Spectral Clustering

**Bài toán**: phân cụm điểm dữ liệu khi cluster không có dạng hình tròn (k-means kém).

**Cách**:
1. Lập graph: nút = điểm, cạnh = độ tương đồng (`exp(-‖xᵢ − xⱼ‖² / 2σ²)`).
2. Tính **Laplacian** `L = D - W` (`W` ma trận trọng số, `D` chéo bậc nút).
3. `L` đối xứng PSD → tính eigenvector của `k` eigenvalue nhỏ nhất.
4. Gộp `k` eigenvector thành ma trận `n × k` → k-means trên các hàng.

Eigenvector của `L` mã hóa cấu trúc cluster — đây là một trong những trường hợp eigen "đẹp" và bất ngờ nhất trong ML.

### 9.5 Stability của hệ động học

Hệ rời rạc: `xₖ₊₁ = A xₖ`. Hành vi dài hạn phụ thuộc eigenvalue của `A`:
- `|λ_max| < 1` → mọi `xₖ → 0` (ổn định).
- `|λ_max| > 1` → `xₖ` bùng nổ (không ổn định).
- `|λ_max| = 1` → biên giới (oscillation).

Hệ liên tục: `dx/dt = A x`. Phụ thuộc dấu phần thực của eigenvalue:
- `Re(λ_max) < 0` → ổn định (mọi nghiệm về 0).
- `Re(λ_max) > 0` → không ổn định.

📝 **Tóm tắt mục 9**:
- PageRank: eigenvector của `λ = 1` của ma trận chuyển = ranking ổn định.
- PCA: eigenvector của covariance = trục giữ phương sai (Lesson 08).
- Spectral clustering: eigenvector Laplacian → cluster.
- Stability: dấu/độ lớn eigenvalue → hành vi dài hạn.

---

## 10. Power Iteration — thuật toán tìm eigenvalue lớn nhất

### 10.1 Ý tưởng

Tìm tất cả eigenvalue của ma trận lớn (`n` cỡ triệu — như graph web) quá đắt. Nhưng nhiều khi ta chỉ cần **eigenvalue có |λ| lớn nhất** (gọi là **dominant eigenvalue**) và eigenvector tương ứng. PageRank, PCA top-k, spectral clustering đều cần cái này.

**Thuật toán**:
```
1. Chọn v₀ ngẫu nhiên (không trùng kernel).
2. Lặp:
     w = A · v_k
     v_{k+1} = w / ‖w‖     (chuẩn hóa)
3. Sau nhiều lần lặp, v_k → eigenvector của |λ_max|.
4. Eigenvalue ước lượng: λ ≈ (v_k)ᵀ · A · v_k    (Rayleigh quotient)
```

### 10.2 💡 Vì sao chạy được?

Phân tích `v₀` theo basis eigenvector `v₀ = c₁·u₁ + c₂·u₂ + ... + cₙ·uₙ`:
```
A v₀ = c₁ λ₁ u₁ + c₂ λ₂ u₂ + ... + cₙ λₙ uₙ
A² v₀ = c₁ λ₁² u₁ + ... + cₙ λₙ² uₙ
A^k v₀ = c₁ λ₁^k u₁ + ... + cₙ λₙ^k uₙ
       = λ₁^k · (c₁ u₁ + c₂ (λ₂/λ₁)^k u₂ + ... )
```
Nếu `|λ₁| > |λᵢ|` với `i ≥ 2`, thì `(λᵢ/λ₁)^k → 0`. Hạng tử đầu thống trị, `A^k v₀` chỉ về hướng `u₁`.

Chuẩn hóa mỗi bước để không tràn số.

### 10.3 Walk-through 5 bước

Cho `A = [[2, 1], [1, 2]]` (eigenvalue `1` và `3`, kỳ vọng hội tụ về `λ_max = 3`, eigenvector `(1, 1)/√2`).

Khởi tạo `v₀ = (1, 0)`.

**Bước 1**:
```
w = A v₀ = (2·1 + 1·0, 1·1 + 2·0) = (2, 1)
‖w‖ = √5 ≈ 2.236
v₁ = (2/√5, 1/√5) ≈ (0.894, 0.447)
```

**Bước 2**:
```
w = A v₁ = (2·0.894 + 1·0.447, 1·0.894 + 2·0.447) = (2.236, 1.789)
‖w‖ = √(5.0 + 3.2) = √8.2 ≈ 2.864
v₂ ≈ (0.780, 0.625)
```

**Bước 3**:
```
w = A v₂ ≈ (2·0.780 + 0.625, 0.780 + 2·0.625) = (2.184, 2.030)
‖w‖ ≈ 2.981
v₃ ≈ (0.733, 0.681)
```

**Bước 4**:
```
w ≈ (2·0.733 + 0.681, 0.733 + 2·0.681) = (2.147, 2.095)
‖w‖ ≈ 3.000
v₄ ≈ (0.716, 0.698)
```

**Bước 5**:
```
w ≈ (2·0.716 + 0.698, 0.716 + 2·0.698) = (2.130, 2.112)
‖w‖ ≈ 3.000
v₅ ≈ (0.710, 0.704)
```

So với eigenvector chính xác `(1/√2, 1/√2) ≈ (0.7071, 0.7071)` → hội tụ rất nhanh.

Eigenvalue ước lượng:
```
λ ≈ v₅ᵀ A v₅ = (0.710, 0.704) · (2.130, 2.112)
   ≈ 0.710 · 2.130 + 0.704 · 2.112
   ≈ 1.512 + 1.487 = 2.999 ≈ 3 ✓
```

### 10.4 ⚠ Lỗi thường gặp

- **`v₀` vô tình trực giao với `u₁`** → `c₁ = 0` → không hội tụ về `u₁`. Khắc phục: random `v₀`, thêm vài bước "kick" nhẹ.
- **`|λ₁| = |λ₂|`** (vd `λ₁ = 1, λ₂ = -1`) → không hội tụ (dao động). Khắc phục: dùng shifted power iteration `A + αI`.
- Quên chuẩn hóa → `‖v_k‖` bùng nổ hoặc về 0.

### 10.5 Phiên bản nâng cao

- **Inverse iteration**: áp `A⁻¹` thay vì `A` → tìm eigenvalue |λ| nhỏ nhất.
- **Shifted inverse iteration**: `(A − μI)⁻¹` → tìm eigenvalue gần `μ`.
- **QR algorithm**: tìm tất cả eigenvalue cùng lúc, dùng trong NumPy, LAPACK.

📝 **Tóm tắt mục 10**:
- Power iteration: lặp `v ← A v / ‖A v‖` → eigenvector dominant.
- Tỷ lệ hội tụ phụ thuộc `|λ₂/λ₁|`. Nhỏ → nhanh.
- Là engine ban đầu của PageRank, dùng được cho ma trận triệu nút.

---

## 11. Bài tập

### Bài 1 (cơ bản — tính tay 2×2)

Cho `A = [[5, 4], [1, 2]]`. Tìm tất cả eigenvalue và eigenvector.

### Bài 2 (kiểm tra hệ thức)

Ma trận `A` có `trace(A) = 6` và `det(A) = 8`. Đoán hai eigenvalue.

### Bài 3 (diagonalization)

Cho `A = [[4, -2], [1, 1]]`. Tìm `P`, `D` sao cho `A = P D P⁻¹`. Tính `A^5`.

### Bài 4 (đối xứng + trực giao)

Cho `A = [[3, 1], [1, 3]]` đối xứng. Tìm eigen-decomposition `Q D Qᵀ` với `Q` trực giao.

### Bài 5 (power iteration tay)

Cho `A = [[4, 1], [2, 3]]`. Khởi tạo `v₀ = (1, 0)`. Chạy 4 bước power iteration. So với eigenvector chính xác.

### Bài 6 (PageRank mini)

3 trang: A → B; B → C; C → A, B. Lập ma trận chuyển `M`. Tìm phân phối ổn định `π` (eigenvector của `λ = 1`).

---

## 12. Lời giải chi tiết

### Lời giải Bài 1

`A = [[5, 4], [1, 2]]`. `T = 5 + 2 = 7`, `D = 5·2 − 4·1 = 6`.
```
p_A(λ) = λ² − 7λ + 6 = (λ - 1)(λ - 6) → λ₁ = 1, λ₂ = 6
```
Verify: `1 + 6 = 7 = T ✓`; `1 · 6 = 6 = D ✓`.

**Eigenvector cho `λ = 1`**: `A − I = [[4, 4], [1, 1]]`. → `x + y = 0` → `v₁ = (1, -1)`.

Kiểm tra: `A · (1, -1) = (5 - 4, 1 - 2) = (1, -1) = 1·(1, -1) ✓`.

**Eigenvector cho `λ = 6`**: `A − 6I = [[-1, 4], [1, -4]]`. → `-x + 4y = 0` → `x = 4y` → `v₂ = (4, 1)`.

Kiểm tra: `A · (4, 1) = (5·4 + 4, 4 + 2) = (24, 6) = 6·(4, 1) ✓`.

### Lời giải Bài 2

`λ₁ + λ₂ = 6`, `λ₁ · λ₂ = 8`. Hai số có tổng 6, tích 8 → `λ² - 6λ + 8 = (λ-2)(λ-4) = 0`. Vậy `λ₁ = 2, λ₂ = 4` (hoặc ngược lại).

### Lời giải Bài 3

`A = [[4, -2], [1, 1]]`. `T = 5`, `D = 4·1 − (-2)·1 = 6`.
```
p_A(λ) = λ² − 5λ + 6 = (λ − 2)(λ − 3) → λ₁ = 2, λ₂ = 3
```

**Eigenvector `λ = 2`**: `A − 2I = [[2, -2], [1, -1]]`. → `x = y` → `v₁ = (1, 1)`.
Kiểm tra: `A · (1, 1) = (4 - 2, 1 + 1) = (2, 2) = 2·(1, 1) ✓`.

**Eigenvector `λ = 3`**: `A − 3I = [[1, -2], [1, -2]]`. → `x = 2y` → `v₂ = (2, 1)`.
Kiểm tra: `A · (2, 1) = (8 - 2, 2 + 1) = (6, 3) = 3·(2, 1) ✓`.

```
P = [[1, 2], [1, 1]]    (cột v₁, v₂)
D = [[2, 0], [0, 3]]
det(P) = 1·1 − 2·1 = -1
P⁻¹ = (1/(-1)) · [[1, -2], [-1, 1]] = [[-1, 2], [1, -1]]
```

**Tính `A^5`**: `D^5 = diag(32, 243)`.
```
P · D^5 = [[1, 2], [1, 1]] · [[32, 0], [0, 243]]
       = [[32, 486], [32, 243]]

(P D^5) · P⁻¹ = [[32, 486], [32, 243]] · [[-1, 2], [1, -1]]

Hàng 1: (32·(-1) + 486·1, 32·2 + 486·(-1)) = (454, -422)
Hàng 2: (32·(-1) + 243·1, 32·2 + 243·(-1)) = (211, -179)

→ A^5 = [[454, -422], [211, -179]]
```

Kiểm tra trace/det: `trace(A^5) = 454 + (-179) = 275 = 2^5 + 3^5 = 32 + 243 ✓`. `det(A^5) = (det A)^5 = 6^5 = 7776`.
`det(A^5) = 454·(-179) - (-422)·211 = -81266 + 89042 = 7776 ✓`.

### Lời giải Bài 4

`A = [[3, 1], [1, 3]]`. `T = 6`, `D = 9 - 1 = 8`.
```
λ² − 6λ + 8 = (λ - 2)(λ - 4) → λ₁ = 2, λ₂ = 4
```

**`λ = 2`**: `A - 2I = [[1, 1], [1, 1]]` → `v₁ = (1, -1)`. Chuẩn hóa: `q₁ = (1/√2, -1/√2)`.

**`λ = 4`**: `A - 4I = [[-1, 1], [1, -1]]` → `v₂ = (1, 1)`. Chuẩn hóa: `q₂ = (1/√2, 1/√2)`.

```
Q = [[1/√2, 1/√2], [-1/√2, 1/√2]]
D = [[2, 0], [0, 4]]
Qᵀ = [[1/√2, -1/√2], [1/√2, 1/√2]]
```

Kiểm tra `Qᵀ Q = I`: cả 2 cột của `Q` đơn vị và trực giao ✓.

Kiểm tra `Q D Qᵀ`:
```
Q D = [[1/√2 · 2, 1/√2 · 4], [-1/√2 · 2, 1/√2 · 4]]
    = [[√2, 2√2], [-√2, 2√2]]

(Q D) Qᵀ:
Hàng 1, cột 1: √2 · 1/√2 + 2√2 · 1/√2 = 1 + 2 = 3 ✓
Hàng 1, cột 2: √2 · (-1/√2) + 2√2 · 1/√2 = -1 + 2 = 1 ✓
Hàng 2, cột 1: -√2 · 1/√2 + 2√2 · 1/√2 = -1 + 2 = 1 ✓
Hàng 2, cột 2: -√2 · (-1/√2) + 2√2 · 1/√2 = 1 + 2 = 3 ✓
```
Khớp `A` ban đầu.

### Lời giải Bài 5

`A = [[4, 1], [2, 3]]`. Eigenvalue `λ_max = 5`, eigenvector chính xác `(1, 1)/√2 ≈ (0.707, 0.707)`.

`v₀ = (1, 0)`.

**Bước 1**: `w = (4, 2)`, `‖w‖ = √20 ≈ 4.472`. `v₁ ≈ (0.894, 0.447)`.

**Bước 2**: `w = A v₁ = (4·0.894 + 0.447, 2·0.894 + 3·0.447) = (4.024, 3.130)`. `‖w‖ ≈ √(16.19 + 9.80) ≈ 5.099`. `v₂ ≈ (0.789, 0.614)`.

**Bước 3**: `w = (4·0.789 + 0.614, 2·0.789 + 3·0.614) = (3.770, 3.420)`. `‖w‖ ≈ 5.090`. `v₃ ≈ (0.741, 0.672)`.

**Bước 4**: `w = (4·0.741 + 0.672, 2·0.741 + 3·0.672) = (3.636, 3.498)`. `‖w‖ ≈ 5.046`. `v₄ ≈ (0.721, 0.693)`.

Tiếp tục sẽ tới `(0.707, 0.707)` ≈ `(1, 1)/√2`.

Eigenvalue: `v₄ᵀ A v₄ ≈ 0.721 · 3.636 + 0.693 · 3.498 ≈ 2.622 + 2.424 ≈ 5.046 ≈ 5 ✓`.

### Lời giải Bài 6

Trang: A → B; B → C; C → A, B.

Ma trận chuyển (cột `i` chia đều cho số link ra):
- A có 1 link ra (→ B). Cột A: `B = 1`.
- B có 1 link ra (→ C). Cột B: `C = 1`.
- C có 2 link ra (→ A, B). Cột C: `A = 0.5`, `B = 0.5`.

```
       from: A    B    C
to: A [  0    0    0.5 ]
    B [  1    0    0.5 ]
    C [  0    1    0   ]
```

Phương trình `M π = π` với `π = (a, b, c)`:
```
0.5 c = a
a + 0.5 c = b
b = c
```
Từ phương trình 1: `a = 0.5c`. Từ phương trình 3: `b = c`. Thay vào điều kiện chuẩn hóa `a + b + c = 1`:
```
0.5c + c + c = 1 → 2.5c = 1 → c = 0.4
b = 0.4
a = 0.2
```

→ `π = (0.2, 0.4, 0.4)`. Hạng: B = C > A.

Kiểm tra: `M π = (0.5·0.4, 0.2 + 0.5·0.4, 0.4) = (0.2, 0.4, 0.4) = π ✓`.

---

## 13. Liên kết

- **Bài trước**: [Lesson 06 — Ma trận là biến đổi](../lesson-06-matrix-as-transform/) — kernel, image, rank.
- **Bài tiếp**: [Lesson 08 — PCA và SVD](../lesson-08-pca-svd/) — áp dụng eigen lên covariance matrix để giảm chiều.
- **Tham khảo chéo**:
  - [Algebra Lesson 06](../../01-Algebra/lesson-06-linear-quadratic/) — nghiệm phương trình bậc 2.
  - [Algebra Lesson 08](../../01-Algebra/lesson-08-linear-systems/) — khử Gauss.
  - [Trigonometry Lesson 06](../../02-Trigonometry/lesson-06-rotation-matrix/) — ma trận xoay (ví dụ eigenvalue phức).
- **Tham khảo bên ngoài**:
  - 3Blue1Brown "Essence of Linear Algebra" — chương 10, 14 (eigenvectors, eigenvalues, spectral).
  - Strang "Linear Algebra and Its Applications" — Chapter 5.
  - "The PageRank Citation Ranking" — Brin & Page (1998).

📝 **Tóm tắt cả bài**:
- Eigenvector = hướng không xoay, eigenvalue = hệ số kéo dài.
- `det(A − λI) = 0` cho eigenvalue; `(A − λI)v = 0` cho eigenvector.
- `λ₁ + λ₂ = trace`, `λ₁ · λ₂ = det` — kiểm tra nhanh.
- `A = P D P⁻¹` (đường chéo hóa); `A^k = P D^k P⁻¹` (tính nhanh).
- Đối xứng → eigen-decomposition trực giao `Q D Qᵀ`.
- Ứng dụng: PageRank (`λ = 1`), PCA (covariance eigen), spectral clustering, stability.
- Power iteration: lặp `v ← Av / ‖Av‖` → eigenvector dominant. Engine của PageRank.
