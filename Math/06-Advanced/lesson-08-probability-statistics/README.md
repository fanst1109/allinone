# Lesson 08 — Xác suất & Thống kê

## Mục tiêu

- Hiểu **xác suất**: định nghĩa, tính chất, công thức Bayes.
- **Biến ngẫu nhiên**, kỳ vọng, phương sai.
- **Phân phối quan trọng**: nhị thức, chuẩn (normal), Poisson.
- Thống kê mô tả: trung bình, độ lệch chuẩn.

## Kiến thức tiền đề

- [T5 L03 — Tổ hợp](../../05-NumberTheory-Combinatorics-Logic/lesson-03-permutations-combinations/), [T6 L05 — Tích phân](../lesson-05-multiple-integrals/).

---

## 1. Xác suất — Khái niệm cơ bản

💡 **Trực giác / Hình dung**: xác suất = **tỉ lệ dài hạn**. Tung xúc xắc 1 lần không đoán được, nhưng tung 6000 lần thì mặt 6 xuất hiện ~1000 lần → tỉ lệ ~1/6. P(A) = "phần thưởng kỳ vọng nếu lặp lại vô số lần". Với kết quả đều khả năng, P = đếm trường hợp thuận lợi / tổng trường hợp.

**Định nghĩa cổ điển**: P(A) = số kết quả thuận lợi / tổng số kết quả (đều khả năng).

**4 ví dụ số đa dạng** (tung 1 xúc xắc):
- P(ra 6) = 1/6 ≈ 0.167.
- P(ra số chẵn) = 3/6 = **1/2** (mặt 2,4,6).
- P(ra ≤ 4) = 4/6 = **2/3**.
- P(ra 7) = 0/6 = **0** (biến cố bất khả thi); P(ra ≤ 6) = 6/6 = **1** (chắc chắn).

### Tính chất

- 0 ≤ P(A) ≤ 1.
- P(∅) = 0, P(Ω) = 1.
- P(A ∪ B) = P(A) + P(B) - P(A ∩ B).
- P(A^c) = 1 - P(A).

### Xác suất có điều kiện

```
P(A | B) = P(A ∩ B) / P(B)
```

"Xác suất A xảy ra biết rằng B đã xảy ra."

**Ví dụ**: Tung 2 xúc xắc, biết tổng là 7. Xác suất 1 con ra 6?
- B = {tổng = 7} = {(1,6), (2,5), (3,4), (4,3), (5,2), (6,1)}. |B| = 6.
- A ∩ B = {(1,6), (6,1)}. |A∩B| = 2.
- P(A|B) = 2/6 = **1/3**.

### Định lý Bayes

```
P(A | B) = P(B | A) · P(A) / P(B)
```

⟶ Cốt lõi của AI, ML, học máy "Naïve Bayes Classifier".

> 📐 **Định nghĩa đầy đủ — Định lý Bayes**
>
> **(a) Là gì**: 1 công thức để **đảo ngược** xác suất có điều kiện. Cho P(B|A), tính P(A|B). Công thức: P(A|B) = P(B|A)·P(A)/P(B). Diễn dịch: P(A) là **prior** (xác suất ban đầu A), P(B|A) là **likelihood** (B có khả năng xảy ra khi A đúng), P(A|B) là **posterior** (cập nhật xác suất A sau khi quan sát B).
>
> **(b) Vì sao cần**: Vì cuộc sống đầy bài toán "ngược": biết triệu chứng, suy bệnh. Biết test dương, suy thật sự bị bệnh. Biết email có từ "khuyến mãi", suy spam hay không. Định lý Bayes là **cốt lõi của**: chẩn đoán y khoa (test screening), classifier ML (Naive Bayes — lọc spam), suy luận Bayes (Bayesian statistics), thị giác máy tính (object recognition), tự lái xe (cảm biến noisy + map → vị trí). Quan trọng: kết quả Bayes thường **phản trực giác** — bệnh hiếm gặp + test 99% chính xác → người test dương chỉ ~50% thật sự bị bệnh.
>
> **(c) Ví dụ số**: Bệnh hiếm 1% dân số. Test 99% chính xác (cả 2 hướng). Test dương — xác suất thật sự bị bệnh? P(B) = 0.01, P(D⁺|B) = 0.99, P(D⁺|B^c) = 0.01. P(D⁺) = 0.99·0.01 + 0.01·0.99 = 0.0198. P(B|D⁺) = 0.99·0.01/0.0198 = **0.5** (chỉ 50%!). Phản trực giác. Túi 3 đồng xu: 2 cân, 1 lệch (đầu xuất hiện 90%). Chọn 1 cái và tung được đầu — xác suất đó là đồng lệch? P(L|H) = (0.9·1/3)/(0.9·1/3 + 0.5·2/3) = 0.3/0.6333 ≈ **0.474**.

❓ **Câu hỏi tự nhiên của người đọc**

- *"Xung khắc (mutually exclusive) khác độc lập (independent) thế nào?"* **Xung khắc**: không xảy ra cùng lúc, P(A∩B) = 0 (vd xúc xắc ra 1 và ra 2). **Độc lập**: biến cố này không ảnh hưởng cái kia, P(A∩B) = P(A)·P(B) (vd 2 lần tung). Hai khái niệm khác hẳn — biến cố xung khắc (có xác suất > 0) KHÔNG độc lập.
- *"P(A|B) có bằng P(B|A) không?"* Nói chung **không**. Đó là lý do cần Bayes để chuyển đổi. Vd P(test dương | bệnh) = 99% nhưng P(bệnh | test dương) = 50%.

⚠ **Lỗi thường gặp — cộng xác suất khi 2 biến cố không xung khắc**. P(A∪B) = P(A) + P(B) − P(A∩B); chỉ bỏ được P(A∩B) khi xung khắc. Phản ví dụ: tung xúc xắc, A = chẵn (1/2), B = ≥4 (1/2). P(A∪B) ≠ 1/2+1/2 = 1; đúng là 1/2 + 1/2 − P(chẵn và ≥4 = {4,6}) = 1 − 2/6 = **2/3**.

🔁 **Dừng lại tự kiểm tra**

1. Tung 2 xúc xắc. P(tổng = 7)?
2. P(A) = 0.3, P(B) = 0.4, A và B độc lập. P(A∩B)?

<details><summary>Đáp án</summary>

1. Có 6 cách ra tổng 7 trên 36 → 6/36 = **1/6**.
2. Độc lập → P(A∩B) = 0.3·0.4 = **0.12**.

</details>

### 📝 Tóm tắt mục 1

- P(A) = thuận lợi/tổng (đều khả năng) = tỉ lệ dài hạn; 0 ≤ P ≤ 1.
- P(A∪B) = P(A)+P(B)−P(A∩B); xung khắc (P(A∩B)=0) ≠ độc lập (P(A∩B)=P(A)P(B)).
- Bayes đảo P(A|B) ↔ P(B|A); kết quả thường phản trực giác (bệnh hiếm).

---

## 2. Biến ngẫu nhiên (Random Variable)

💡 **Trực giác / Hình dung**: biến ngẫu nhiên = "gắn 1 con số cho mỗi kết quả ngẫu nhiên". Kỳ vọng E[X] = giá trị trung bình nếu lặp vô số lần (tâm của phân phối). Phương sai = mức "tản mát" quanh trung bình: nhỏ = các giá trị xúm gần trung bình, lớn = trải rộng. Hình dung 2 lớp cùng điểm trung bình 7, nhưng 1 lớp ai cũng 6-8 (phương sai nhỏ), lớp kia có cả 2 lẫn 10 (phương sai lớn).

**Biến ngẫu nhiên X** = "kết quả" của 1 thí nghiệm, được biểu diễn bằng số.

**Ví dụ**: Tung 2 xúc xắc. X = tổng → X ∈ {2, 3, ..., 12}.

### Hàm phân phối

- **Rời rạc**: P(X = k) cho từng k.
- **Liên tục**: hàm mật độ f(x), P(a ≤ X ≤ b) = ∫_a^b f(x) dx.

### Kỳ vọng & phương sai

**Kỳ vọng (E[X])** = giá trị "trung bình":
```
Rời rạc: E[X] = Σ k·P(X=k)
Liên tục: E[X] = ∫ x·f(x) dx
```

**Phương sai (Var(X))** = "độ phân tán":
```
Var(X) = E[(X - μ)²] = E[X²] - (E[X])²
```

**Độ lệch chuẩn**: σ = √Var.

**Walk-through bằng số** (X = số chấm khi tung 1 xúc xắc):
- E[X] = (1+2+3+4+5+6)/6 = 21/6 = **3.5**.
- E[X²] = (1+4+9+16+25+36)/6 = 91/6 ≈ 15.17.
- Var(X) = 15.17 − 3.5² = 15.17 − 12.25 = **2.917**; σ = √2.917 ≈ **1.71**.

❓ **Câu hỏi tự nhiên của người đọc**

- *"E[X] = 3.5 nhưng xúc xắc đâu có mặt 3.5?"* Kỳ vọng là **trung bình lý thuyết**, không cần là 1 giá trị thực tế. Nó là tâm cân bằng của phân phối, đạt được khi lặp vô số lần.
- *"Vì sao Var = E[X²] − (E[X])², không phải (E[X²] − E[X])²?"* Đây là công thức rút gọn của E[(X−μ)²]. Khai triển (X−μ)² rồi lấy kỳ vọng ra đúng E[X²] − μ². Đừng nhầm thứ tự.

⚠ **Lỗi thường gặp — tính E[X²] bằng (E[X])²**. E[X²] ≠ (E[X])². Phản ví dụ xúc xắc: E[X²] = 15.17 nhưng (E[X])² = 12.25 — khác nhau, hiệu của chúng chính là phương sai (≥ 0 luôn).

🔁 **Dừng lại tự kiểm tra**

1. X nhận giá trị 0 (xác suất 0.5) và 10 (xác suất 0.5). Tính E[X] và Var(X).

<details><summary>Đáp án</summary>

E[X] = 0·0.5 + 10·0.5 = **5**. E[X²] = 0·0.5 + 100·0.5 = 50. Var = 50 − 25 = **25**, σ = 5.

</details>

### 📝 Tóm tắt mục 2

- Biến ngẫu nhiên gắn số cho kết quả; rời rạc (P(X=k)) hoặc liên tục (mật độ f).
- E[X] = trung bình lý thuyết; Var(X) = E[X²] − (E[X])² = độ tản mát; σ = √Var.
- E[X²] ≠ (E[X])²; kỳ vọng không nhất thiết là giá trị thực tế.

---

## 3. Phân phối Nhị thức (Binomial)

💡 **Trực giác / Hình dung**: lặp 1 phép thử "có/không" (tung xu, đậu/rớt) n lần độc lập, đếm số lần "có". C(n,k) đếm số cách chọn k vị trí thành công trong n lần; pᵏ là xác suất k lần thành công đó; (1−p)^(n−k) là xác suất các lần còn lại thất bại. Nhân lại ra xác suất đúng k thành công.

🎯 **Thí nghiệm**: lặp n lần Bernoulli (mỗi lần xác suất thành công p). X = số lần thành công.

```
P(X = k) = C(n, k) · p^k · (1-p)^(n-k)
```

**Kỳ vọng**: E[X] = **n·p**. Phương sai: Var(X) = **n·p·(1-p)**.

**Ví dụ**: Tung 10 đồng xu công bằng. Số mặt ngửa X ~ Binomial(10, 0.5).
- P(X = 5) = C(10, 5)·(0.5)^10 = 252/1024 ≈ 0.246.
- E[X] = 5. σ = √2.5 ≈ 1.58.

**Verify E[X] = np bằng số** (n=3, p=0.5, tung 3 xu): các xác suất P(X=0..3) = 1/8, 3/8, 3/8, 1/8. E[X] = 0·1/8 + 1·3/8 + 2·3/8 + 3·1/8 = (0+3+6+3)/8 = 12/8 = **1.5** = 3·0.5 = np ✓.

❓ **Câu hỏi tự nhiên của người đọc**

- *"Vì sao E[X] = np hợp lý?"* Mỗi lần thử đóng góp trung bình p thành công; n lần → np. Vd tung 10 xu, mỗi xu 0.5 mặt ngửa kỳ vọng → trung bình 5 mặt ngửa.
- *"Khi nào dùng nhị thức?"* Khi: số lần thử **cố định** (n), mỗi lần **độc lập**, xác suất **không đổi** (p), chỉ 2 kết quả. Vi phạm 1 điều (vd rút bài không hoàn lại → không độc lập) thì không dùng được.

⚠ **Lỗi thường gặp — quên hệ số C(n,k)**. P(X=k) phải nhân C(n,k) vì có nhiều **thứ tự** cho k thành công. Phản ví dụ: tung 2 xu, P(đúng 1 ngửa) = C(2,1)·0.5·0.5 = 2·0.25 = **0.5**, KHÔNG phải 0.5·0.5 = 0.25 (bỏ C(2,1) quên 2 thứ tự HT và TH).

🔁 **Dừng lại tự kiểm tra**

1. Tung 4 đồng xu công bằng. P(đúng 2 mặt ngửa)?

<details><summary>Đáp án</summary>

C(4,2)·(0.5)⁴ = 6·(1/16) = 6/16 = **3/8** = 0.375.

</details>

### 📝 Tóm tắt mục 3

- Binomial: n lần thử độc lập, xác suất p cố định, đếm số thành công.
- P(X=k) = C(n,k)·pᵏ·(1−p)^(n−k); E[X] = np, Var = np(1−p).
- Đừng quên hệ số C(n,k) (đếm thứ tự).

---

## 4. Phân phối Chuẩn (Normal / Gaussian)

💡 **Trực giác / Hình dung**: phân phối chuẩn = "đường cong hình chuông" đối xứng. Hầu hết giá trị tụ quanh trung bình μ, càng xa càng hiếm. Quy tắc 68-95-99.7: như "vòng tròn đồng tâm" quanh μ — 1 độ lệch chuẩn ôm 68%, 2 ôm 95%, 3 ôm 99.7%. Xuất hiện khắp nơi vì tổng nhiều yếu tố ngẫu nhiên nhỏ → luôn ra hình chuông (CLT).

🎯 **Liên tục, hàm mật độ**:
```
f(x) = (1/(σ√(2π))) · e^(-(x-μ)²/(2σ²))
```

Hai tham số: μ (trung bình), σ (độ lệch chuẩn).

**Đặc trưng**:
- Đối xứng quanh μ.
- ~68% nằm trong [μ-σ, μ+σ].
- ~95% trong [μ-2σ, μ+2σ].
- ~99.7% trong [μ-3σ, μ+3σ].

💡 **Vì sao chuẩn quan trọng?** **Định lý giới hạn trung tâm** (CLT): tổng nhiều biến ngẫu nhiên độc lập (gần như) luôn tiến về phân phối chuẩn. Đây là lý do phân phối chuẩn xuất hiện khắp nơi: chiều cao, IQ, lỗi đo lường, ...

**4 ví dụ áp dụng quy tắc 68-95-99.7** (IQ ~ N(100, 15²), μ=100, σ=15):
- P(85 ≤ IQ ≤ 115) = P(μ−σ ≤ X ≤ μ+σ) = **68%**.
- P(70 ≤ IQ ≤ 130) = P(μ−2σ ≤ X ≤ μ+2σ) = **95%**.
- P(IQ > 130) = (100% − 95%)/2 = **2.5%** (1 đuôi phải của 2σ).
- P(IQ > 100) = **50%** (đối xứng quanh μ).

❓ **Câu hỏi tự nhiên của người đọc**

- *"P(X = giá trị cụ thể) bằng bao nhiêu?"* Với phân phối **liên tục**, P(X = 1 điểm) = **0** (diện tích bề rộng 0). Chỉ tính được P(a ≤ X ≤ b) = diện tích dưới đường cong. Khác hẳn rời rạc.
- *"z-score là gì?"* z = (x − μ)/σ = "cách μ bao nhiêu độ lệch chuẩn". Chuẩn hóa về N(0,1) để tra bảng. Vd x = 130, μ=100, σ=15 → z = 2.

⚠ **Lỗi thường gặp — chia đôi sai khi tính xác suất 1 đuôi**. P(X > μ+2σ) = (1 − 0.95)/2 = 2.5%, KHÔNG phải 5%. Vùng 5% là **cả 2 đuôi** ngoài 2σ; mỗi đuôi 2.5%. Quên chia đôi → sai gấp 2.

🔁 **Dừng lại tự kiểm tra**

1. X ~ N(50, 10²). P(40 ≤ X ≤ 60)?
2. P(X < 30)?

<details><summary>Đáp án</summary>

1. 40 = μ−σ, 60 = μ+σ → **68%**.
2. 30 = μ−2σ. P(X < μ−2σ) = (1−0.95)/2 = **2.5%**.

</details>

### 📝 Tóm tắt mục 4

- Chuẩn N(μ,σ): hình chuông đối xứng quanh μ; xuất hiện khắp nơi nhờ CLT.
- Quy tắc 68-95-99.7 cho [μ±σ], [μ±2σ], [μ±3σ].
- Liên tục → P(điểm) = 0; tính P khoảng = diện tích; z = (x−μ)/σ; nhớ chia đôi cho 1 đuôi.

---

## 5. Phân phối Poisson

💡 **Trực giác / Hình dung**: đếm số lần 1 sự kiện hiếm xảy ra trong 1 khoảng (thời gian/không gian) khi trung bình là λ. Như "binomial với n rất lớn, p rất nhỏ, np = λ ổn định". Vd tổng đài: mỗi mili-giây xác suất có cuộc gọi cực nhỏ, nhưng cả phút có ~λ cuộc.

🎯 **Đếm sự kiện hiếm** trong khoảng thời gian / không gian.

```
P(X = k) = e^(-λ) · λ^k / k!
```

λ = "tốc độ" (số trung bình).

**Ví dụ + verify** (λ = 2 cuộc gọi/phút):
- P(X=0) = e⁻²·2⁰/0! = e⁻² ≈ **0.135** (không cuộc nào).
- P(X=1) = e⁻²·2¹/1! = 2e⁻² ≈ **0.271**.
- P(X=2) = e⁻²·2²/2! = 2e⁻² ≈ **0.271**.
- Kiểm tổng: P(0)+P(1)+P(2)+... = e⁻²(1+2+2+...) = e⁻²·e² = 1 ✓ (chuỗi Taylor của e²).

**E[X] = Var(X) = λ**.

❓ **Câu hỏi tự nhiên của người đọc**

- *"Vì sao kỳ vọng = phương sai = λ?"* Đặc trưng riêng của Poisson. Khác chuẩn (μ, σ độc lập) — Poisson chỉ 1 tham số λ điều khiển cả tâm lẫn độ tản. σ = √λ.
- *"Khi nào dùng Poisson thay binomial?"* Khi n lớn, p nhỏ, không biết rõ n nhưng biết tốc độ λ (vd số tai nạn/năm, số lỗi/trang). λ = n·p.

⚠ **Lỗi thường gặp — quên e^(−λ) hoặc dùng sai λ cho khoảng khác**. Nếu λ = 2/phút mà hỏi trong 3 phút thì λ' = 6 (nhân theo khoảng). Phản ví dụ: tính P trong 3 phút mà vẫn dùng λ = 2 → sai (phải đổi λ = 6).

🔁 **Dừng lại tự kiểm tra**

1. λ = 3 lỗi/trang. P(1 trang có 0 lỗi)?

<details><summary>Đáp án</summary>

P(X=0) = e⁻³·3⁰/0! = e⁻³ ≈ **0.0498** (~5%).

</details>

### 📝 Tóm tắt mục 5

- Poisson đếm sự kiện hiếm với tốc độ λ: P(X=k) = e⁻λ·λᵏ/k!.
- E[X] = Var(X) = λ (1 tham số điều khiển cả tâm và tản); σ = √λ.
- Đổi λ theo khoảng (λ' = λ × số khoảng); đừng quên e⁻λ.

---

## 6. Thống kê mô tả

💡 **Trực giác / Hình dung**: thống kê mô tả "tóm tắt 1 đống số" bằng vài con số then chốt. Trung bình = "điểm cân bằng" (kéo về phía giá trị lớn). Trung vị = "giá trị chính giữa" (chia đôi số quan sát). Độ lệch chuẩn = "khoảng cách trung bình tới tâm". Khi dữ liệu lệch (vài giá trị cực lớn), trung bình và trung vị **tách nhau**.

Cho mẫu n quan sát x₁, ..., xₙ:

- **Trung bình**: x̄ = (x₁ + ... + xₙ)/n.
- **Phương sai mẫu**: s² = Σ(xᵢ - x̄)² / (n-1).
- **Độ lệch chuẩn**: s = √s².
- **Trung vị**: giá trị giữa khi sắp xếp.
- **Mode**: giá trị xuất hiện nhiều nhất.

**Walk-through bằng số** (mẫu: 2, 4, 4, 6, 9):
- Trung bình x̄ = (2+4+4+6+9)/5 = 25/5 = **5**.
- Trung vị = giá trị giữa khi sắp xếp = **4** (vị trí thứ 3).
- Mode = **4** (xuất hiện 2 lần).
- s² = [(2−5)²+(4−5)²+(4−5)²+(6−5)²+(9−5)²]/(5−1) = (9+1+1+1+16)/4 = 28/4 = **7**; s = √7 ≈ 2.65.

⚠ **Trung bình ≠ Trung vị** khi dữ liệu lệch (skewed). Phản ví dụ: lương {10, 12, 14, 15, 200} (triệu). Trung bình = 251/5 = 50.2; trung vị = 14. 1 giá trị cực lớn kéo trung bình lệch hẳn — trung vị mô tả "người điển hình" tốt hơn.

❓ **Câu hỏi tự nhiên của người đọc**

- *"Vì sao phương sai mẫu chia (n−1) chứ không n?"* Vì dùng x̄ (tính từ chính mẫu) làm "tâm" khiến tổng bình phương hơi nhỏ đi (thiên lệch). Chia (n−1) thay vì n **hiệu chỉnh** thiên lệch (gọi là hiệu chỉnh Bessel). Phương sai **tổng thể** thì chia n.
- *"Khi nào dùng trung vị thay trung bình?"* Khi dữ liệu lệch hoặc có giá trị ngoại lai (lương, giá nhà). Trung vị "miễn nhiễm" với vài giá trị cực trị.

🔁 **Dừng lại tự kiểm tra**

1. Mẫu: 1, 3, 5, 7. Tính trung bình và trung vị.

<details><summary>Đáp án</summary>

Trung bình = (1+3+5+7)/4 = **4**. Trung vị = trung bình 2 giá trị giữa (3 và 5) = **4**. (Dữ liệu đối xứng → trùng nhau.)

</details>

### 📝 Tóm tắt mục 6

- Trung bình (điểm cân bằng), trung vị (giá trị giữa), mode (hay gặp nhất).
- Phương sai mẫu chia (n−1) (hiệu chỉnh Bessel); tổng thể chia n.
- Dữ liệu lệch/ngoại lai → trung vị mô tả tốt hơn trung bình.

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

```
✅ Tier 1 — Arithmetic & Algebra (8/8)
✅ Tier 2 — Geometry (8/8)
✅ Tier 3 — Trig & Complex (8/8)
✅ Tier 4 — Calculus 1-var (8/8)
✅ Tier 5 — NT, Combinatorics, Logic (8/8)
✅ Tier 6 — Advanced (8/8)
```

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
