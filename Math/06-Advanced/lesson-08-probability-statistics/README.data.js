// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: Math/06-Advanced/lesson-08-probability-statistics/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 08 — Xác suất & Thống kê

## Mục tiêu

- Hiểu **xác suất**: định nghĩa, tính chất, công thức Bayes.
- **Biến ngẫu nhiên**, kỳ vọng, phương sai.
- **Phân phối quan trọng**: nhị thức, chuẩn (normal), Poisson.
- Thống kê mô tả: trung bình, độ lệch chuẩn.

## Kiến thức tiền đề

- [T5 L03 — Tổ hợp](../../05-NumberTheory-Combinatorics-Logic/lesson-03-permutations-combinations/), [T6 L05 — Tích phân](../lesson-05-multiple-integrals/).

---

## 1. Xác suất — Khái niệm cơ bản

💡 **Định nghĩa cổ điển**: P(A) = số kết quả thuận lợi / tổng số kết quả (đều khả năng).

**Ví dụ**: Tung 1 xúc xắc. P(ra 6) = **1/6**. P(ra số chẵn) = 3/6 = **1/2**.

### Tính chất

- 0 ≤ P(A) ≤ 1.
- P(∅) = 0, P(Ω) = 1.
- P(A ∪ B) = P(A) + P(B) - P(A ∩ B).
- P(A^c) = 1 - P(A).

### Xác suất có điều kiện

\`\`\`
P(A | B) = P(A ∩ B) / P(B)
\`\`\`

"Xác suất A xảy ra biết rằng B đã xảy ra."

**Ví dụ**: Tung 2 xúc xắc, biết tổng là 7. Xác suất 1 con ra 6?
- B = {tổng = 7} = {(1,6), (2,5), (3,4), (4,3), (5,2), (6,1)}. |B| = 6.
- A ∩ B = {(1,6), (6,1)}. |A∩B| = 2.
- P(A|B) = 2/6 = **1/3**.

### Định lý Bayes

\`\`\`
P(A | B) = P(B | A) · P(A) / P(B)
\`\`\`

⟶ Cốt lõi của AI, ML, học máy "Naïve Bayes Classifier".

> 📐 **Định nghĩa đầy đủ — Định lý Bayes**
>
> **(a) Là gì**: 1 công thức để **đảo ngược** xác suất có điều kiện. Cho P(B|A), tính P(A|B). Công thức: P(A|B) = P(B|A)·P(A)/P(B). Diễn dịch: P(A) là **prior** (xác suất ban đầu A), P(B|A) là **likelihood** (B có khả năng xảy ra khi A đúng), P(A|B) là **posterior** (cập nhật xác suất A sau khi quan sát B).
>
> **(b) Vì sao cần**: Vì cuộc sống đầy bài toán "ngược": biết triệu chứng, suy bệnh. Biết test dương, suy thật sự bị bệnh. Biết email có từ "khuyến mãi", suy spam hay không. Định lý Bayes là **cốt lõi của**: chẩn đoán y khoa (test screening), classifier ML (Naive Bayes — lọc spam), suy luận Bayes (Bayesian statistics), thị giác máy tính (object recognition), tự lái xe (cảm biến noisy + map → vị trí). Quan trọng: kết quả Bayes thường **phản trực giác** — bệnh hiếm gặp + test 99% chính xác → người test dương chỉ ~50% thật sự bị bệnh.
>
> **(c) Ví dụ số**: Bệnh hiếm 1% dân số. Test 99% chính xác (cả 2 hướng). Test dương — xác suất thật sự bị bệnh? P(B) = 0.01, P(D⁺|B) = 0.99, P(D⁺|B^c) = 0.01. P(D⁺) = 0.99·0.01 + 0.01·0.99 = 0.0198. P(B|D⁺) = 0.99·0.01/0.0198 = **0.5** (chỉ 50%!). Phản trực giác. Túi 3 đồng xu: 2 cân, 1 lệch (đầu xuất hiện 90%). Chọn 1 cái và tung được đầu — xác suất đó là đồng lệch? P(L|H) = (0.9·1/3)/(0.9·1/3 + 0.5·2/3) = 0.3/0.6333 ≈ **0.474**.

---

## 2. Biến ngẫu nhiên (Random Variable)

**Biến ngẫu nhiên X** = "kết quả" của 1 thí nghiệm, được biểu diễn bằng số.

**Ví dụ**: Tung 2 xúc xắc. X = tổng → X ∈ {2, 3, ..., 12}.

### Hàm phân phối

- **Rời rạc**: P(X = k) cho từng k.
- **Liên tục**: hàm mật độ f(x), P(a ≤ X ≤ b) = ∫_a^b f(x) dx.

### Kỳ vọng & phương sai

**Kỳ vọng (E[X])** = giá trị "trung bình":
\`\`\`
Rời rạc: E[X] = Σ k·P(X=k)
Liên tục: E[X] = ∫ x·f(x) dx
\`\`\`

**Phương sai (Var(X))** = "độ phân tán":
\`\`\`
Var(X) = E[(X - μ)²] = E[X²] - (E[X])²
\`\`\`

**Độ lệch chuẩn**: σ = √Var.

---

## 3. Phân phối Nhị thức (Binomial)

🎯 **Thí nghiệm**: lặp n lần Bernoulli (mỗi lần xác suất thành công p). X = số lần thành công.

\`\`\`
P(X = k) = C(n, k) · p^k · (1-p)^(n-k)
\`\`\`

**Kỳ vọng**: E[X] = **n·p**. Phương sai: Var(X) = **n·p·(1-p)**.

**Ví dụ**: Tung 10 đồng xu công bằng. Số mặt ngửa X ~ Binomial(10, 0.5).
- P(X = 5) = C(10, 5)·(0.5)^10 = 252/1024 ≈ 0.246.
- E[X] = 5. σ = √2.5 ≈ 1.58.

---

## 4. Phân phối Chuẩn (Normal / Gaussian)

🎯 **Liên tục, hàm mật độ**:
\`\`\`
f(x) = (1/(σ√(2π))) · e^(-(x-μ)²/(2σ²))
\`\`\`

Hai tham số: μ (trung bình), σ (độ lệch chuẩn).

**Đặc trưng**:
- Đối xứng quanh μ.
- ~68% nằm trong [μ-σ, μ+σ].
- ~95% trong [μ-2σ, μ+2σ].
- ~99.7% trong [μ-3σ, μ+3σ].

💡 **Vì sao chuẩn quan trọng?** **Định lý giới hạn trung tâm** (CLT): tổng nhiều biến ngẫu nhiên độc lập (gần như) luôn tiến về phân phối chuẩn. Đây là lý do phân phối chuẩn xuất hiện khắp nơi: chiều cao, IQ, lỗi đo lường, ...

---

## 5. Phân phối Poisson

🎯 **Đếm sự kiện hiếm** trong khoảng thời gian / không gian.

\`\`\`
P(X = k) = e^(-λ) · λ^k / k!
\`\`\`

λ = "tốc độ" (số trung bình).

**Ví dụ**: Số cuộc gọi đến tổng đài trong 1 phút (~λ). Số nguyên tử phân rã trong 1 giây.

**E[X] = Var(X) = λ**.

---

## 6. Thống kê mô tả

Cho mẫu n quan sát x₁, ..., xₙ:

- **Trung bình**: x̄ = (x₁ + ... + xₙ)/n.
- **Phương sai mẫu**: s² = Σ(xᵢ - x̄)² / (n-1).
- **Độ lệch chuẩn**: s = √s².
- **Trung vị**: giá trị giữa khi sắp xếp.
- **Mode**: giá trị xuất hiện nhiều nhất.

⚠ **Trung bình ≠ Trung vị** khi dữ liệu lệch (skewed).

---

## 7. Bài tập

### Bài tập

**Bài 1**: Tung 1 xúc xắc 6 mặt. Tính kỳ vọng X.

**Bài 2**: Tung 5 đồng xu công bằng. P(ra đúng 3 mặt ngửa)?

**Bài 3**: Trong 1000 lần tung xúc xắc, ước lượng số lần ra 6.

**Bài 4**: X ~ N(100, 15²). P(85 ≤ X ≤ 115)?

**Bài 5**: 1 bệnh hiếm, 1% dân số mắc. Test có độ chính xác 99% (cả 2 hướng). 1 người test dương — xác suất thật sự bị bệnh?

### Lời giải

**Bài 1**: E[X] = Σ k·(1/6) = (1+2+3+4+5+6)/6 = **3.5**.

**Bài 2**: X ~ Bin(5, 0.5). P(X=3) = C(5,3)·(0.5)^5 = 10/32 = **5/16**.

**Bài 3**: E[Y] = n·p = 1000·(1/6) ≈ **167**.

**Bài 4**: μ = 100, σ = 15. 115 = μ+σ, 85 = μ-σ. → ~**68%**.

**Bài 5** (Bayes — bài toán nổi tiếng):
- A = bị bệnh, B = test dương.
- P(A) = 0.01, P(A^c) = 0.99.
- P(B|A) = 0.99, P(B|A^c) = 0.01.
- P(B) = P(B|A)·P(A) + P(B|A^c)·P(A^c) = 0.99·0.01 + 0.01·0.99 = 0.0198.
- P(A|B) = 0.99·0.01 / 0.0198 = **0.5**.

⟶ **Bất ngờ**: dù test 99% chính xác, xác suất thật sự bị bệnh khi test dương chỉ **50%**. Vì bệnh hiếm. Đây là bài học quan trọng về Bayes.

---

## 8. 🎉 HOÀN THÀNH MATH (48/48)!

\`\`\`
✅ Tier 1 — Arithmetic & Algebra (8/8)
✅ Tier 2 — Geometry (8/8)
✅ Tier 3 — Trig & Complex (8/8)
✅ Tier 4 — Calculus 1-var (8/8)
✅ Tier 5 — NT, Combinatorics, Logic (8/8)
✅ Tier 6 — Advanced (8/8)
\`\`\`

## 📝 Tổng kết Tier 6

1. **Vector & ma trận**: ngôn ngữ tuyến tính tính.
2. **Định thức**: tỉ lệ phóng đại diện tích. Khả nghịch ⟺ det ≠ 0.
3. **Trị riêng**: hướng "bất biến" của ma trận. Cốt lõi PCA.
4. **Hàm nhiều biến**: gradient, Hessian, cực trị 2D.
5. **Tích phân kép/bội**: thể tích, khối lượng.
6. **Chuỗi & Taylor**: xấp xỉ hàm bằng đa thức.
7. **ODE**: ngôn ngữ của khoa học (dao động, tăng trưởng, phóng xạ).
8. **XS-TK**: từ tung xúc xắc đến Bayes, AI/ML.

---

🎉 **Math complete!** Tiếp theo, bạn có thể đi sâu vào các lĩnh vực ứng dụng: [Vectors (AI/ML)](../../../Vectors/), [Physics](../../../Physics/), [Chemistry](../../../Chemistry/).
`;
