# Lesson 03 — Trị riêng & Vector riêng

## Mục tiêu

- Hiểu **trị riêng λ** và **vector riêng v** của ma trận.
- Phương trình đặc trưng: det(A - λI) = 0.
- Áp dụng: chéo hóa ma trận, lũy thừa ma trận nhanh, PCA.

## Kiến thức tiền đề

- [Lesson 02 — Định thức](../lesson-02-determinants-linear-systems/).

---

## 1. Định nghĩa

💡 **Trực giác / Hình dung**: hầu hết vector khi qua máy A vừa bị **xoay hướng** vừa bị co giãn. Nhưng một số "hướng đặc biệt" thì A chỉ kéo dài/co lại mà **không xoay** — đó là vector riêng, hệ số kéo là trị riêng λ. Hình dung tấm cao su bị kéo: theo 2 trục chính, đường kẻ chỉ dài ra/ngắn lại đúng hướng cũ (eigenvector); các đường chéo khác thì bị nghiêng đi.

Vector v ≠ 0 được gọi là **vector riêng** của A nếu A·v = λ·v với λ là 1 số (gọi là **trị riêng**).

```
A·v = λ·v   (v ≠ 0)
```

Ý nghĩa: A biến v thành **bội** của v — **không đổi hướng**, chỉ co/giãn theo hệ số λ.

**4 ví dụ số đa dạng**:
- A = [[3,1],[0,2]], v = (1,0): A·v = (3,0) = 3·v → λ = **3**.
- Vị tự A = [[2,0],[0,2]]: **mọi** vector là eigenvector với λ = 2 (A·v = 2v luôn).
- Chéo A = [[5,0],[0,−1]], v = (0,1): A·v = (0,−1) = −1·v → λ = **−1** (đảo chiều).
- A = [[3,1],[0,2]], v = (1,−1): A·v = (3−1, −2) = (2,−2) = 2·v → λ = **2**.

> 📐 **Định nghĩa đầy đủ — Trị riêng λ và vector riêng v**
>
> **(a) Là gì**: Vector v ≠ 0 thoả Av = λv. Tức A biến v thành **bội** của chính nó — chỉ co/giãn (theo hệ số λ) hoặc đảo chiều (nếu λ < 0), KHÔNG xoay hướng. v gọi là **vector riêng** của A, λ là **trị riêng** tương ứng. Mỗi λ có thể có nhiều v (không gian riêng eigenspace).
>
> **(b) Vì sao cần**: Vector riêng = "**hướng đặc biệt**" mà A đối xử đơn giản. Tìm được chúng thì ma trận trở nên dễ hiểu, dễ tính (chéo hoá A = PDP⁻¹ → A^n = PD^n P⁻¹ tính nhanh). Cốt lõi của: **PCA** (vector riêng của ma trận covariance = trục chính của dữ liệu, dùng giảm chiều), **Google PageRank** (vector riêng của ma trận liên kết web = score trang), **cơ học lượng tử** (trị riêng = mức năng lượng, vector riêng = trạng thái), **dynamical systems** (ổn định ↔ |λ| < 1), **vibration analysis** (mode shapes của cầu, máy bay).
>
> **(c) Ví dụ số**: A = [[2,1],[1,2]]. PT đặc trưng: det(A−λI) = (2−λ)² − 1 = 0 → λ = 1, 3. **λ=3**: (A−3I)v = 0 → −v₁+v₂=0 → v = (1,1). Kiểm A·(1,1) = (3,3) = 3·(1,1) ✓. **λ=1**: v = (1,−1). Kiểm A·(1,−1) = (1,−1) = 1·(1,−1) ✓. Trace A = 4 = 1+3 (tổng trị riêng) ✓. det A = 3 = 1·3 (tích trị riêng) ✓. Ma trận quay 90° = [[0,−1],[1,0]]: λ² + 1 = 0 → λ = ±i (số phức — quay không có "hướng bất biến" thực).

❓ **Câu hỏi tự nhiên của người đọc**

- *"Vì sao yêu cầu v ≠ 0?"* Vì A·0 = 0 = λ·0 đúng với **mọi** λ → vector 0 chẳng cho biết gì. Eigenvector phải khác 0 mới xác định được hướng đặc biệt.
- *"1 vector riêng có 1 trị riêng, nhưng 1 trị riêng có mấy vector riêng?"* Vô số: nếu v là eigenvector thì mọi bội c·v (c ≠ 0) cũng vậy — chúng tạo thành 1 "không gian riêng" (eigenspace). Ta thường lấy 1 đại diện.

⚠ **Lỗi thường gặp — tưởng A·v = λ·v đúng với mọi v**. Chỉ đúng với **vector riêng**. Phản ví dụ: A = [[3,1],[0,2]], lấy v = (1,1) (không phải eigenvector): A·v = (4, 2). Có là bội của (1,1) không? (4,2) = k(1,1) đòi k=4 và k=2 — mâu thuẫn → KHÔNG phải eigenvector.

🔁 **Dừng lại tự kiểm tra**

1. A = [[5,0],[0,3]]. (1,0) có phải eigenvector? Trị riêng?
2. Nếu v là eigenvector của A với λ = 2, thì 3v có phải eigenvector? Trị riêng?

<details><summary>Đáp án</summary>

1. A·(1,0) = (5,0) = 5·(1,0) → **có**, λ = 5.
2. A·(3v) = 3·(Av) = 3·(2v) = 2·(3v) → **có**, vẫn λ = 2 (bội của eigenvector vẫn là eigenvector cùng trị riêng).

</details>

### 📝 Tóm tắt mục 1

- v ≠ 0 là **vector riêng** nếu Av = λv; λ là **trị riêng** (hệ số co/giãn, không xoay hướng).
- Mỗi λ có cả không gian eigenvector (mọi bội c·v).
- Av = λv chỉ đúng cho eigenvector, không phải mọi v.

---

## 2. Tìm trị riêng — Phương trình đặc trưng

Từ A·v = λ·v ⟺ (A - λI)·v = 0 ⟺ v thuộc null space của (A - λI).

⟶ Để có v ≠ 0, cần (A - λI) **không khả nghịch**:
```
det(A - λI) = 0
```

Đây là **phương trình đặc trưng** (characteristic equation), bậc n. Nghiệm = trị riêng.

### Ví dụ 2×2

A = [[2, 1], [1, 2]].

det(A - λI) = det [[2-λ, 1], [1, 2-λ]] = (2-λ)² - 1 = λ² - 4λ + 3 = 0.

⟶ λ = 1 hoặc λ = 3.

### Tìm vector riêng

**Với λ = 1**: (A - I)·v = 0.
- [[1, 1], [1, 1]]·v = 0.
- v₁ + v₂ = 0 → v = (1, -1) (hoặc bội).

**Với λ = 3**: (A - 3I)·v = 0.
- [[-1, 1], [1, -1]]·v = 0.
- v = (1, 1).

💡 **Trực giác / Hình dung**: vì sao det(A−λI) = 0? Av = λv ⟺ (A−λI)v = 0. Muốn có v ≠ 0 thỏa "(A−λI) ép v về 0", máy (A−λI) phải **bẹp** (không khả nghịch) → det của nó = 0. λ làm máy bẹp chính là trị riêng.

**Walk-through tìm vector riêng cho λ = 1** (A = [[2,1],[1,2]]):
- A − 1·I = [[1,1],[1,1]]. Giải [[1,1],[1,1]]·(v₁,v₂) = 0 → v₁ + v₂ = 0 → v₂ = −v₁ → v = (1,−1).
- Kiểm: A·(1,−1) = (2·1+1·(−1), 1·1+2·(−1)) = (1,−1) = 1·(1,−1) ✓.

❓ **Câu hỏi tự nhiên của người đọc**

- *"PT đặc trưng bậc mấy?"* Bậc n với ma trận n×n → đúng n trị riêng (kể bội, có thể phức). 2×2 → bậc 2 → 2 trị riêng.
- *"Tính λ rồi, tìm v thế nào?"* Thế λ vào (A−λI)v = 0 rồi giải hệ (luôn vô số nghiệm vì det = 0) → lấy 1 nghiệm khác 0.

⚠ **Lỗi thường gặp — trừ λ khỏi cả ma trận thay vì chỉ đường chéo**. A − λI chỉ trừ λ ở **đường chéo**, các ô khác giữ nguyên. Phản ví dụ: A = [[2,1],[1,2]], A − λI = [[2−λ, 1],[1, 2−λ]] — ô góc trên-phải vẫn là 1, KHÔNG phải 1−λ.

🔁 **Dừng lại tự kiểm tra**

1. Lập PT đặc trưng của A = [[1,2],[2,1]].
2. (A − λI) tại λ = 3 cho A = [[3,1],[0,2]] là ma trận nào?

<details><summary>Đáp án</summary>

1. det([[1−λ,2],[2,1−λ]]) = (1−λ)² − 4 = 0 → λ = −1, 3.
2. A − 3I = [[0,1],[0,−1]] (trừ 3 ở đường chéo: 3−3=0, 2−3=−1).

</details>

### 📝 Tóm tắt mục 2

- Tìm λ: giải PT đặc trưng det(A−λI) = 0 (bậc n → n trị riêng).
- Tìm v: thế λ, giải (A−λI)v = 0, lấy nghiệm ≠ 0.
- Chỉ trừ λ ở **đường chéo** của A.

---

## 3. Chéo hóa ma trận

💡 **Trực giác / Hình dung**: chéo hóa = "đổi sang hệ trục tọa độ của eigenvector". Trong hệ trục thường, A trộn lẫn các thành phần (ô off-diagonal ≠ 0). Nhưng nhìn theo trục eigenvector thì A chỉ đơn thuần kéo dài mỗi trục độc lập (ma trận đường chéo D). P⁻¹ "dịch" sang hệ eigenvector, D kéo dài, P "dịch" về lại. Nhờ thế A^n = P·Dⁿ·P⁻¹ — chỉ cần lũy thừa các số trên đường chéo.

Nếu A có n trị riêng và n vector riêng độc lập tuyến tính, A "chéo hóa được":
```
A = P · D · P⁻¹
```

trong đó:
- **P** = ma trận có các vector riêng là cột.
- **D** = ma trận đường chéo với trị riêng λ₁, ..., λₙ.

### Lợi ích — Tính A^n nhanh

```
A^n = P · D^n · P⁻¹
```

D^n dễ tính (chỉ cần λᵢ^n trên đường chéo).

**Ví dụ**: A = [[2,1],[1,2]]. Trị riêng λ = 1, 3.
- P = [[1, 1], [-1, 1]]. D = [[1, 0], [0, 3]].
- A^10 = P·D^10·P⁻¹ = P·[[1,0],[0,59049]]·P⁻¹.

⟶ Khỏi nhân ma trận A với chính nó 10 lần.

❓ **Câu hỏi tự nhiên của người đọc**

- *"Ma trận nào cũng chéo hóa được?"* Không. Cần đủ n eigenvector **độc lập tuyến tính**. Vd [[1,1],[0,1]] chỉ có 1 hướng eigenvector (λ=1 bội 2 nhưng eigenspace 1 chiều) → KHÔNG chéo hóa được trên ℝ.
- *"Vì sao A^n tính nhanh hơn?"* Vì Dⁿ chỉ là λᵢⁿ trên đường chéo — n−1 phép nhân ma trận đầy đủ rút còn vài phép lũy thừa số + 2 phép nhân với P, P⁻¹.

⚠ **Lỗi thường gặp — đặt cột P không khớp thứ tự với D**. Cột thứ i của P phải là eigenvector ứng với λᵢ ở vị trí (i,i) của D. Nếu đặt lệch (eigenvector của λ=1 nhưng để 3 vào D) thì A ≠ PDP⁻¹. Luôn ghép đúng cặp (λ, v).

🔁 **Dừng lại tự kiểm tra**

1. A có λ = 2, 4. Tính các trị riêng của A³ (không cần chéo hóa).

<details><summary>Đáp án</summary>

Trị riêng của A³ = λ³ = 2³ = **8** và 4³ = **64** (cùng eigenvector). Vì A³v = λ³v.

</details>

### 📝 Tóm tắt mục 3

- A = PDP⁻¹: P = cột eigenvector, D = đường chéo trị riêng (ghép đúng cặp).
- A^n = P·Dⁿ·P⁻¹ → tính lũy thừa nhanh.
- Cần n eigenvector độc lập tuyến tính mới chéo hóa được.

---

## 4. Áp dụng — PCA (Principal Component Analysis)

💡 **Trực giác / Hình dung**: hình dung đám mây điểm dữ liệu hình elip dài. Trục dài nhất của elip = hướng dữ liệu "trải rộng" nhất = vector riêng lớn nhất của ma trận hiệp phương sai; độ dài trục = trị riêng. PCA = "xoay trục về theo elip rồi bỏ các trục ngắn" → giảm chiều mà giữ phần lớn thông tin.

🎯 **PCA**: giảm chiều dữ liệu trong AI/ML.
1. Tính **ma trận hiệp phương sai** C của dữ liệu.
2. Tìm trị riêng & vector riêng của C.
3. Chọn k vector riêng ứng với k trị riêng lớn nhất.
4. Chiếu dữ liệu lên không gian con này.

⟶ **Vector riêng = trục chính** của dữ liệu. **Trị riêng = độ "rộng"** theo trục đó.

Đây là 1 trong những thuật toán quan trọng nhất ML — cốt lõi của face recognition (Eigenfaces), nén ảnh, ...

❓ **Câu hỏi tự nhiên của người đọc**

- *"Chọn k bao nhiêu thì đủ?"* Thường chọn k sao cho tổng k trị riêng lớn nhất ≥ ~90–95% tổng tất cả trị riêng (giữ 90–95% "phương sai"). Vd 100 chiều, 10 trị riêng đầu chiếm 95% → giảm còn 10 chiều.

⚠ **Lỗi thường gặp — quên chuẩn hóa dữ liệu trước PCA**. Nếu các biến khác đơn vị (vd cm và kg), biến có giá trị lớn sẽ "lấn át" phương sai → trục chính bị lệch. Phải chuẩn hóa (trừ trung bình, chia độ lệch chuẩn) trước.

🔁 **Dừng lại tự kiểm tra**

1. Ma trận hiệp phương sai có trị riêng 8, 1.5, 0.5. Giữ 1 thành phần thì giữ được bao nhiêu % phương sai?

<details><summary>Đáp án</summary>

Tổng = 8 + 1.5 + 0.5 = 10. Giữ trị riêng lớn nhất (8) → 8/10 = **80%** phương sai.

</details>

### 📝 Tóm tắt mục 4

- PCA: tìm eigenvector của ma trận hiệp phương sai = trục chính của dữ liệu.
- Trị riêng lớn = phương sai lớn theo trục đó; giữ k trị riêng lớn nhất để giảm chiều.
- Chuẩn hóa dữ liệu trước; chọn k giữ ~90–95% phương sai.

---

## 5. Một số tính chất

💡 **Trực giác / Hình dung**: trace (tổng đường chéo) và det là 2 con số tóm tắt nhanh về trị riêng — không cần giải PT đặc trưng vẫn biết tổng và tích các λ. det = ∏λ ăn khớp với "det = co giãn thể tích": mỗi trục eigenvector co giãn λᵢ → thể tích nhân ∏λᵢ.

- **Trace** = tổng trị riêng. Tr(A) = Σ λᵢ.
- **Det** = tích trị riêng. det(A) = ∏ λᵢ.
- **Ma trận đối xứng** (A = A^T): trị riêng đều là số thực, vector riêng trực giao nhau.

**Verify bằng số** (A = [[2,1],[1,2]], λ = 1, 3):
- Trace = 2 + 2 = 4 = 1 + 3 ✓.
- det = 2·2 − 1·1 = 3 = 1·3 ✓.
- A đối xứng → eigenvector (1,1) và (1,−1): tích vô hướng = 1·1 + 1·(−1) = 0 → **trực giao** ✓.

❓ **Câu hỏi tự nhiên của người đọc**

- *"Trace, det giúp gì khi đã có thể giải PT đặc trưng?"* Dùng **kiểm tra nhanh**: tìm xong λ, cộng lại phải bằng trace, nhân lại phải bằng det. Sai → tính lỗi đâu đó. Cũng cho biết det ngay (det = 0 ⟺ có 1 λ = 0).

⚠ **Lỗi thường gặp — tưởng eigenvector mọi ma trận đều trực giao**. Chỉ **ma trận đối xứng** mới đảm bảo eigenvector trực giao. Phản ví dụ: A = [[3,1],[0,2]] (không đối xứng) có eigenvector (1,0) và (1,−1); tích vô hướng = 1 ≠ 0 → KHÔNG trực giao.

🔁 **Dừng lại tự kiểm tra**

1. A là 2×2, trace = 7, det = 12. Tìm 2 trị riêng.

<details><summary>Đáp án</summary>

λ₁+λ₂ = 7, λ₁·λ₂ = 12 → nghiệm của x² − 7x + 12 = 0 → x = 3, 4. Trị riêng **3 và 4**.

</details>

### 📝 Tóm tắt mục 5

- Trace = Σλ, det = ∏λ → kiểm tra nhanh kết quả trị riêng.
- Ma trận đối xứng: trị riêng thực, eigenvector trực giao (nền tảng PCA).
- det = 0 ⟺ có ít nhất 1 trị riêng = 0.

---

## 6. Bài tập

### Bài tập

**Bài 1**: Tìm trị riêng của A = [[4, 1], [2, 3]].

**Bài 2**: Tìm vector riêng tương ứng của A ở Bài 1.

**Bài 3**: Cho A = [[5, 0], [0, -2]]. Tính trace và det. So sánh với tổng & tích trị riêng.

**Bài 4**: Ma trận A có trị riêng λ = 2 (bội 1) và λ = -1. Tính det(A).

**Bài 5**: A là ma trận quay 90° R(π/2) = [[0, -1], [1, 0]]. Tính trị riêng. Nhận xét?

### Lời giải

**Bài 1**: det([[4-λ, 1], [2, 3-λ]]) = (4-λ)(3-λ) - 2 = λ² - 7λ + 10 = 0. → λ = 2, 5.

**Bài 2**:  
- λ = 2: (A-2I)·v = 0 → [[2, 1], [2, 1]]v = 0 → 2v₁ + v₂ = 0 → v = (1, -2).  
- λ = 5: (A-5I)·v = 0 → [[-1, 1], [2, -2]]v = 0 → v₁ = v₂ → v = (1, 1).

**Bài 3**: Trace = 5 + (-2) = 3. Det = -10. Trị riêng = 5, -2. Σ = 3 ✓. ∏ = -10 ✓.

**Bài 4**: det = 2·(-1) = -2.

**Bài 5**: det(R - λI) = λ² + 1 = 0 → λ = ±i (số phức!). → R không chéo hóa được trên ℝ, chỉ trên ℂ. Hợp lý: quay 90° không có vector nào "bất biến hướng" trong ℝ².

---

## 7. Bài tiếp theo

[Lesson 04 — Hàm nhiều biến](../lesson-04-multivariable-functions/).

## 📝 Tổng kết

1. **A·v = λ·v** với v ≠ 0. λ = trị riêng, v = vector riêng.
2. **det(A - λI) = 0** → tìm trị riêng. Sau đó giải (A - λI)v = 0 → vector riêng.
3. **Chéo hóa**: A = PDP⁻¹. Tính A^n nhanh.
4. **Trace = Σ λ, Det = ∏ λ**.
5. Ứng dụng: **PCA, Eigenfaces, dynamic systems**.
