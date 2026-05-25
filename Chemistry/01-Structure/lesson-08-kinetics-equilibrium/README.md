# Lesson 08 — Động học & Cân bằng (Kinetics & Equilibrium)

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Định nghĩa **tốc độ phản ứng** và biểu diễn bằng công thức `rate = ΔC/Δt`.
- Hiểu **thuyết va chạm**: phản ứng chỉ xảy ra khi các phân tử va chạm với năng lượng đủ và hướng đúng.
- Nắm 5 yếu tố ảnh hưởng tốc độ: **nồng độ, nhiệt độ, áp suất (khí), diện tích bề mặt, chất xúc tác**.
- Phân biệt **phản ứng một chiều** và **phản ứng thuận nghịch** (đến cân bằng).
- Hiểu **cân bằng động (dynamic equilibrium)**: rate thuận = rate nghịch, **không** phải "phản ứng dừng".
- Viết được **hằng số cân bằng K** từ phương trình và đọc ý nghĩa (K lớn = thiên về sản phẩm).
- Áp dụng **nguyên lý Le Chatelier** để dự đoán sự dịch chuyển cân bằng khi đổi nồng độ, T, P.

## Kiến thức tiền đề

- [Lesson 06 — Mol & Phản ứng](../lesson-06-mole-stoichiometry/) — biết cân bằng phương trình.
- [Lesson 07 — Dung dịch & Nồng độ](../lesson-07-solutions-concentration/) — biết nồng độ mol.

---

## 1. Tốc độ phản ứng

### 1.1. Định nghĩa

**Tốc độ phản ứng (reaction rate)** = độ biến thiên nồng độ chất phản ứng hoặc sản phẩm theo thời gian.

Cho phản ứng tổng quát: `aA + bB → cC + dD`

```
rate = −(1/a)·d[A]/dt = −(1/b)·d[B]/dt = +(1/c)·d[C]/dt = +(1/d)·d[D]/dt
```

Dấu `−` cho chất phản ứng (giảm theo t), dấu `+` cho sản phẩm (tăng theo t). Chia cho hệ số để có 1 giá trị thống nhất.

Đơn vị: **mol/(L·s)** hoặc **M/s**.

### 1.2. Ba ví dụ số

**Ví dụ 1**: Phản ứng `N₂ + 3H₂ → 2NH₃`. Trong 10 giây, [N₂] giảm từ 1.0 M xuống 0.8 M. Tính rate.
- Δ[N₂]/Δt = (0.8 − 1.0)/10 = −0.02 M/s.
- rate = −(1/1)·(−0.02) = **0.02 M/s**.
- Đồng thời [NH₃] tăng với tốc độ: 2 × 0.02 = **0.04 M/s** (vì hệ số NH₃ là 2).

**Ví dụ 2**: Phản ứng `2NO₂ → 2NO + O₂`. Sau 5 phút, [NO₂] giảm 0.30 M, [O₂] tăng 0.075 M. Verify.
- rate theo NO₂ = (1/2)·0.30/5 = 0.030 M/min.
- rate theo O₂ = (1/1)·0.075/5 = 0.015 M/min. **Sai!**
- Đúng phải là: theo NO₂ rate = (1/2)·0.30/5 = 0.030 M/min, theo O₂ rate = (1/1)·0.075/5 = 0.015 M/min. **2 cái cần bằng nhau**!
- Verify: nếu [NO₂] giảm 0.30, theo tỉ lệ 2:1, [O₂] phải tăng 0.15, nhưng đề bài cho 0.075 → 1/2 lượng kỳ vọng. Có sai số hoặc phản ứng chưa hoàn tất.

### 1.3. Thuyết va chạm

Phản ứng xảy ra khi 2 phân tử **va chạm** với:
1. **Năng lượng đủ** ≥ năng lượng hoạt hóa **Eₐ** (activation energy).
2. **Hướng va chạm đúng** (phù hợp hình học cho liên kết mới hình thành).

→ Không phải va chạm nào cũng tạo phản ứng. Chỉ một phần nhỏ (1 trong 10⁹ - 10¹³) là hiệu quả.

### 📝 Tóm tắt mục 1

- rate = ΔC/Δt, chia cho hệ số stoich.
- Phản ứng = va chạm có đủ năng lượng (Eₐ) và đúng hướng.

---

## 2. 5 yếu tố ảnh hưởng tốc độ

### 2.1. Nồng độ (concentration)

**Tăng nồng độ → tăng số va chạm/đơn vị thời gian → tăng tốc độ.**

Hầu hết phản ứng: `rate ∝ [A]ⁿ` với `n` là **bậc phản ứng** (xác định bằng thực nghiệm, không từ hệ số stoich).

**Ví dụ**: phản ứng `aA + bB → C` thường có dạng `rate = k·[A]ᵐ·[B]ⁿ`.

### 2.2. Nhiệt độ

**Tăng T → tăng tốc độ rất mạnh.** Quy tắc kinh nghiệm: **T tăng 10°C → tốc độ tăng 2-4 lần**.

Lý do: phương trình Arrhenius `k = A·exp(−Eₐ/RT)`. Khi T tăng, **tỉ lệ phân tử có năng lượng ≥ Eₐ tăng theo hàm mũ**.

Ứng dụng đời sống:
- Tủ lạnh làm thức ăn lâu hỏng (rate vi khuẩn phân hủy giảm).
- Nồi áp suất nấu nhanh (T cao hơn 100°C khi áp suất tăng).

### 2.3. Áp suất (khí)

**Chỉ áp dụng cho phản ứng khí.** Tăng P → ép các phân tử lại gần nhau → tăng nồng độ → tăng rate (tương đương tăng nồng độ).

### 2.4. Diện tích bề mặt

**Áp dụng cho phản ứng dị thể (heterogeneous):** chất rắn + chất khác. Bề mặt càng lớn → càng nhiều điểm tiếp xúc → rate càng cao.

Ví dụ:
- Bột Mg phản ứng với HCl nhanh hơn cục Mg.
- Bụi than có thể nổ trong không khí (diện tích bề mặt cực lớn), trong khi cục than chỉ cháy chậm.

### 2.5. Chất xúc tác (catalyst)

**Chất xúc tác** = chất tham gia phản ứng nhưng được **tái sinh** ở cuối → không bị tiêu hao.

Cơ chế: **giảm Eₐ** bằng cách cung cấp **đường phản ứng khác** (alternative pathway). Eₐ giảm → tỉ lệ phân tử vượt qua tăng → rate tăng (có thể tới hàng triệu lần).

**Ví dụ**:
- **Enzyme** trong cơ thể là xúc tác sinh học. Catalase phân hủy H₂O₂ nhanh gấp ~ 10⁷ lần không xúc tác.
- **Pt, Pd** trong bộ chuyển đổi xúc tác xe hơi giúp đốt cháy hoàn toàn nhiên liệu.
- **Fe** trong tổng hợp ammonia (Haber-Bosch): N₂ + 3H₂ → 2NH₃.

**Lưu ý**: xúc tác **không làm thay đổi vị trí cân bằng** — chỉ làm cân bằng đạt nhanh hơn.

### 📝 Tóm tắt mục 2

5 yếu tố: nồng độ, nhiệt độ, áp suất (khí), diện tích bề mặt (chất rắn), xúc tác. Đều tăng rate khi tăng (xúc tác giảm Eₐ).

---

## 3. Cân bằng hóa học

### 3.1. Phản ứng thuận nghịch

Một số phản ứng **không chạy hết** — chúng có thể đi cả 2 chiều:

```
aA + bB ⇌ cC + dD
```

Phản ứng **thuận** (forward): A + B → C + D.
Phản ứng **nghịch** (reverse): C + D → A + B.

Theo thời gian, **rate thuận giảm** (do [A], [B] giảm) và **rate nghịch tăng** (do [C], [D] tăng). Đến khi **rate thuận = rate nghịch** → hệ đạt **cân bằng động**.

### 💡 Trực giác / Hình dung

Tưởng tượng 2 phòng nối nhau bằng cửa. Phòng A đầy người, phòng B trống. Lúc đầu, người từ A sang B nhiều (rate thuận lớn), từ B sang A ít (rate nghịch nhỏ). Theo thời gian, A vơi, B đầy → rate thuận giảm, rate nghịch tăng. Đến khi **số người từ A sang B = số người từ B sang A** mỗi đơn vị thời gian → tổng số ở mỗi phòng KHÔNG đổi, dù từng người vẫn di chuyển.

Đây là **cân bằng động** — không phải "không có ai di chuyển", mà là "tổng không đổi".

### 3.2. Hằng số cân bằng K

Với phản ứng `aA + bB ⇌ cC + dD` ở trạng thái cân bằng:

```
K = ([C]^c × [D]^d) / ([A]^a × [B]^b)
```

**K = const** ở 1 nhiệt độ xác định (chỉ phụ thuộc T, không phụ thuộc nồng độ ban đầu).

**Ý nghĩa K**:
- **K >> 1**: cân bằng nghiêng về sản phẩm (phản ứng "gần như hoàn tất").
- **K ≈ 1**: cân bằng "ở giữa".
- **K << 1**: cân bằng nghiêng về chất phản ứng.

### 3.3. Ba ví dụ tính K

**Ví dụ 1**: Phản ứng `H₂ + I₂ ⇌ 2HI`. Tại cân bằng (700 K): [H₂] = 0.2 M, [I₂] = 0.2 M, [HI] = 1.4 M.
- K = [HI]² / ([H₂][I₂]) = (1.4)² / (0.2 × 0.2) = 1.96 / 0.04 = **49**.
- K = 49 > 1 → cân bằng nghiêng về HI (phản ứng tạo HI tốt).

**Ví dụ 2**: Phản ứng `N₂O₄ ⇌ 2NO₂`. Tại 25°C: [N₂O₄] = 0.04 M, [NO₂] = 0.12 M.
- K = [NO₂]² / [N₂O₄] = (0.12)² / 0.04 = 0.0144 / 0.04 = **0.36**.
- K < 1 → cân bằng nghiêng về N₂O₄.

**Ví dụ 3**: Tổng hợp ammonia `N₂ + 3H₂ ⇌ 2NH₃` (Haber-Bosch). Ở 400°C: K = 0.5 (rất nhỏ).
- Đó là lý do phải dùng áp suất cao + xúc tác Fe để có hiệu suất ammonia khả quan.

### 📝 Tóm tắt mục 3

- Phản ứng thuận nghịch đến trạng thái cân bằng động (rate_thuận = rate_nghịch).
- K = tích sản phẩm / tích phản ứng (theo lũy thừa hệ số).
- K không phụ thuộc nồng độ ban đầu, chỉ phụ thuộc T.

---

## 4. Nguyên lý Le Chatelier

### 4.1. Phát biểu

**Khi một hệ cân bằng bị tác động (đổi C, T, P), cân bằng sẽ dịch chuyển theo hướng "chống lại" tác động đó.**

Đây là cách tự nhiên "thích ứng" với thay đổi.

### 4.2. Ba kiểu tác động

#### a) Đổi nồng độ

Thêm chất A → cân bằng dịch chuyển sang phải (tiêu thụ A).
Bớt sản phẩm C → cân bằng dịch sang phải (tạo thêm C).

#### b) Đổi nhiệt độ

Phản ứng **tỏa nhiệt** (exothermic, ΔH < 0): coi "nhiệt" như sản phẩm.
- Tăng T → cân bằng dịch sang trái (tiêu thụ nhiệt).

Phản ứng **thu nhiệt** (endothermic, ΔH > 0): coi "nhiệt" như chất phản ứng.
- Tăng T → cân bằng dịch sang phải (hấp thụ nhiệt).

Lưu ý: **T thay đổi → K thay đổi** (khác với nồng độ — chỉ dịch chuyển trong cùng K).

#### c) Đổi áp suất (khí)

Tăng P → cân bằng dịch về phía có **ít mol khí** hơn (để giảm P).
Giảm P → dịch về phía nhiều mol khí.

Lưu ý: nếu cả 2 vế có cùng số mol khí, áp suất không ảnh hưởng.

### 4.3. Ví dụ thực tế — Haber-Bosch (Tổng hợp ammonia)

`N₂(g) + 3H₂(g) ⇌ 2NH₃(g)`, ΔH < 0 (tỏa nhiệt).

Đếm mol khí: trái có 1 + 3 = 4 mol, phải có 2 mol → chênh lệch.

| Tác động | Hệ thống làm gì | Để tạo nhiều NH₃: |
|----------|------------------|---------------------|
| Tăng [N₂] hoặc [H₂] | Dịch sang phải | ✓ làm |
| Bớt NH₃ (lấy ra liên tục) | Dịch sang phải | ✓ làm |
| Tăng T | Dịch sang trái (vì tỏa nhiệt) | ✗ giảm hiệu suất, nhưng vẫn cần T cao để rate đủ nhanh |
| Tăng P | Dịch sang phải (4 mol → 2 mol) | ✓ làm (~ 200 atm) |
| Xúc tác Fe | Không dịch, nhưng tăng rate | ✓ làm |

**Compromise thực tế**: 400°C, 200 atm, xúc tác Fe — hiệu suất ~ 15-20% mỗi vòng. Tách NH₃ ra, đưa N₂ + H₂ còn lại quay vòng. Phương pháp này đoạt Nobel cho Fritz Haber (1918).

### ❓ Câu hỏi tự nhiên của người đọc

**Q: Vì sao xúc tác không dịch chuyển cân bằng?**
A: Vì xúc tác giảm Eₐ cho cả phản ứng thuận và phản ứng nghịch như nhau → rate cả 2 chiều đều tăng cùng tỉ lệ → tỉ số `rate_thuận / rate_nghịch` không đổi → vị trí cân bằng không đổi. Chỉ thời gian đạt cân bằng ngắn hơn.

**Q: Phản ứng đạt cân bằng có dừng không?**
A: KHÔNG. Đó là cân bằng **động** — phản ứng thuận và nghịch vẫn xảy ra cùng tốc độ → tổng nồng độ không đổi, nhưng từng phân tử vẫn liên tục biến đổi. Có thể chứng minh bằng đồng vị phóng xạ: gắn ¹⁴C vào sản phẩm, sẽ thấy ¹⁴C xuất hiện ở chất phản ứng theo thời gian.

### 📝 Tóm tắt mục 4

- Le Chatelier: hệ chống lại thay đổi.
- Đổi C: dịch để tiêu thụ chất thêm vào.
- Đổi T: tỏa nhiệt thì T↑ dịch trái, thu nhiệt thì T↑ dịch phải.
- Đổi P: dịch về phía ít mol khí khi P↑.
- Xúc tác: không dịch chuyển, chỉ tăng rate.

---

## 5. Bài tập + Lời giải chi tiết

### Bài tập

**Bài 1**: Cho phản ứng `2H₂ + O₂ → 2H₂O`. Tại t = 0, [H₂] = 1.0 M; tại t = 20 s, [H₂] = 0.6 M. Tính rate.

**Bài 2**: Viết biểu thức K cho các phản ứng:
a) `N₂ + 3H₂ ⇌ 2NH₃`
b) `2SO₂ + O₂ ⇌ 2SO₃`
c) `H₂O ⇌ H⁺ + OH⁻`

**Bài 3**: Phản ứng `2NO₂ ⇌ N₂O₄` (ΔH < 0). Dự đoán hướng dịch chuyển khi:
a) Tăng [NO₂].
b) Tăng nhiệt độ.
c) Tăng áp suất.
d) Thêm xúc tác.

**Bài 4**: Cho cân bằng `H₂ + I₂ ⇌ 2HI` với K = 49 (700 K). Cho ban đầu [H₂]₀ = [I₂]₀ = 1.0 M, [HI]₀ = 0. Tính nồng độ tại cân bằng.

**Bài 5**: Vì sao cho bột than vào lò cao chạy nhanh hơn cục than to cùng khối lượng?

**Bài 6**: Để bảo quản thức ăn trong tủ lạnh ở 4°C thay vì 25°C, theo quy tắc 10°C/2-4 lần, tốc độ thối ước lượng giảm bao nhiêu lần?

### Lời giải

**Bài 1**: 
- Δ[H₂] = 0.6 − 1.0 = −0.4 M trong 20 s.
- rate = −(1/2)·Δ[H₂]/Δt = −(1/2)·(−0.4/20) = **0.01 M/s**.

**Bài 2**:
a) K = [NH₃]² / ([N₂]·[H₂]³)
b) K = [SO₃]² / ([SO₂]²·[O₂])
c) K = [H⁺][OH⁻] / [H₂O] (thường viết Kw = [H⁺][OH⁻] = 10⁻¹⁴ vì [H₂O] gần như const).

**Bài 3**: `2NO₂ ⇌ N₂O₄` (ΔH < 0, tỏa nhiệt).
- a) Tăng [NO₂] → dịch phải (tạo N₂O₄).
- b) Tăng T (phản ứng tỏa nhiệt) → dịch trái (về NO₂).
- c) Tăng P. Trái có 2 mol khí, phải có 1 mol → P↑ dịch về phía ít mol → dịch phải.
- d) Xúc tác → không dịch (chỉ nhanh hơn).

**Bài 4**: Gọi x = nồng độ [HI] tại cân bằng / 2 (tức [H₂] tiêu thụ).
- [H₂] = 1 − x, [I₂] = 1 − x, [HI] = 2x.
- K = (2x)² / [(1−x)(1−x)] = 4x²/(1−x)² = 49.
- 2x/(1−x) = 7 (lấy căn) → 2x = 7 − 7x → 9x = 7 → x = 0.778.
- Vậy [H₂] = [I₂] = 1 − 0.778 = **0.222 M**, [HI] = **1.556 M**.
- Kiểm tra: K = (1.556)²/(0.222)² = 2.42/0.0493 = **49.1** ≈ 49 ✓.

**Bài 5**: Bột than có **diện tích bề mặt** lớn hơn cục than nhiều lần (chia nhỏ → tăng S theo r⁻¹). Phản ứng cháy là phản ứng dị thể (rắn + khí), chỉ xảy ra ở bề mặt. S lớn → nhiều điểm tiếp xúc đồng thời → rate cao hơn.

**Bài 6**: Chênh lệch T = 25 − 4 = 21°C ≈ 2 mức 10°C. Theo quy tắc 2-4 lần/10°C, tốc độ giảm khoảng (2-4)² = **4-16 lần**. Lấy trung bình ~ 8 lần. Đó là lý do trong tủ lạnh thức ăn để được vài ngày thay vì vài giờ ở nhiệt độ phòng.

---

## 6. Liên kết và bài tiếp theo

- **Bài tiếp theo (Tier 2)**: [Lesson 01 — Acid-Base](../../02-Reactions-Thermo/lesson-01-acid-base/) — pH, dung dịch đệm, chuẩn độ.
- **Liên kết Math**: tốc độ phản ứng = đạo hàm theo thời gian → [`Math/04-Calculus-1var/lesson-03`](../../../Math/04-Calculus-1var/lesson-03-derivatives-definition/). Arrhenius là hàm mũ → [`Math/01-Arithmetic-Algebra/lesson-06`](../../../Math/01-Arithmetic-Algebra/lesson-06-powers-roots-logs/).
- **Liên kết Physics**: phản ứng tỏa/thu nhiệt → ΔH → [`Physics/02-Thermo-Electromagnetism/lesson-01-temperature-heat`](../../../Physics/02-Thermo-Electromagnetism/lesson-01-temperature-heat/) và Tier 2 Lesson 04 nhiệt động hóa.

---

## 📝 Tổng kết Lesson 08

1. **Rate** = ΔC/Δt, chia cho hệ số stoich.
2. **Thuyết va chạm**: cần năng lượng ≥ Eₐ và hướng đúng.
3. **5 yếu tố ảnh hưởng rate**: nồng độ, T, P, diện tích bề mặt, xúc tác.
4. **Cân bằng động**: rate thuận = rate nghịch. K = tích sản phẩm/tích phản ứng (theo hệ số).
5. **K** chỉ phụ thuộc T. K > 1: sản phẩm nhiều. K < 1: chất phản ứng nhiều.
6. **Le Chatelier**: hệ chống lại thay đổi. ΔC, ΔT, ΔP dịch theo nguyên tắc trên.
7. **Xúc tác** giảm Eₐ → rate tăng. KHÔNG dịch chuyển cân bằng.

**Tiếp theo**: Tier 2 Lesson 01 — Acid-Base (Reactions & Thermo)

---

🎉 **Hoàn thành Tier 1 — Structure!** Bạn đã nắm:
- Cấu trúc nguyên tử & ion
- Cấu hình electron & bảng tuần hoàn
- Liên kết ion & cộng hóa trị
- Lực liên phân tử (H-bond)
- Hình học phân tử (VSEPR)
- Mol & cân bằng phương trình
- Dung dịch & nồng độ
- Động học & cân bằng

Sẵn sàng vào Tier 2 — Reactions & Thermo!
