# Lesson 08 — Động học & Cân bằng (Kinetics & Equilibrium)

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Định nghĩa **tốc độ phản ứng** và biểu diễn bằng công thức $v = \dfrac{\Delta C}{\Delta t}$.
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

Cho phản ứng tổng quát: $a\text{A} + b\text{B} \rightarrow c\text{C} + d\text{D}$

$$v = -\dfrac{1}{a}\dfrac{d[\text{A}]}{dt} = -\dfrac{1}{b}\dfrac{d[\text{B}]}{dt} = +\dfrac{1}{c}\dfrac{d[\text{C}]}{dt} = +\dfrac{1}{d}\dfrac{d[\text{D}]}{dt}$$

Dấu `−` cho chất phản ứng (giảm theo t), dấu `+` cho sản phẩm (tăng theo t). Chia cho hệ số để có 1 giá trị thống nhất.

Đơn vị: **mol/(L·s)** hoặc **M/s**.

### 1.2. Ba ví dụ số

**Ví dụ 1**: Phản ứng $\text{N}_2 + 3\text{H}_2 \rightarrow 2\text{NH}_3$. Trong 10 giây, $[\text{N}_2]$ giảm từ $1{,}0$ M xuống $0{,}8$ M. Tính rate.
- $\dfrac{\Delta[\text{N}_2]}{\Delta t} = \dfrac{0{,}8 - 1{,}0}{10} = -0{,}02$ M/s.
- $v = -\dfrac{1}{1}(-0{,}02) =$ **0,02 M/s**.
- Đồng thời $[\text{NH}_3]$ tăng với tốc độ: $2 \times 0{,}02 =$ **0,04 M/s** (vì hệ số $\text{NH}_3$ là 2).

**Ví dụ 2**: Phản ứng $2\text{NO}_2 \rightarrow 2\text{NO} + \text{O}_2$. Sau 5 phút, $[\text{NO}_2]$ giảm $0{,}30$ M, $[\text{O}_2]$ tăng $0{,}075$ M. Verify.
- rate theo $\text{NO}_2$ $= \dfrac{1}{2} \cdot \dfrac{0{,}30}{5} = 0{,}030$ M/min.
- rate theo $\text{O}_2$ $= \dfrac{1}{1} \cdot \dfrac{0{,}075}{5} = 0{,}015$ M/min. **Sai!**
- Đúng phải là: theo $\text{NO}_2$ rate $= \dfrac{1}{2} \cdot \dfrac{0{,}30}{5} = 0{,}030$ M/min, theo $\text{O}_2$ rate $= \dfrac{1}{1} \cdot \dfrac{0{,}075}{5} = 0{,}015$ M/min. **2 cái cần bằng nhau**!
- Verify: nếu $[\text{NO}_2]$ giảm $0{,}30$, theo tỉ lệ 2:1, $[\text{O}_2]$ phải tăng $0{,}15$, nhưng đề bài cho $0{,}075$ → 1/2 lượng kỳ vọng. Có sai số hoặc phản ứng chưa hoàn tất.

### 1.3. Thuyết va chạm

Phản ứng xảy ra khi 2 phân tử **va chạm** với:
1. **Năng lượng đủ** $\geq$ năng lượng hoạt hóa $E_a$ (activation energy).
2. **Hướng va chạm đúng** (phù hợp hình học cho liên kết mới hình thành).

→ Không phải va chạm nào cũng tạo phản ứng. Chỉ một phần nhỏ ($1$ trong $10^9 - 10^{13}$) là hiệu quả.

### 📝 Tóm tắt mục 1

- $v = \dfrac{\Delta C}{\Delta t}$, chia cho hệ số stoich.
- Phản ứng = va chạm có đủ năng lượng ($E_a$) và đúng hướng.

---

## 2. 5 yếu tố ảnh hưởng tốc độ

### 2.1. Nồng độ (concentration)

**Tăng nồng độ → tăng số va chạm/đơn vị thời gian → tăng tốc độ.**

Hầu hết phản ứng: $v \propto [\text{A}]^n$ với $n$ là **bậc phản ứng** (xác định bằng thực nghiệm, không từ hệ số stoich).

**Ví dụ**: phản ứng $a\text{A} + b\text{B} \rightarrow \text{C}$ thường có dạng $v = k[\text{A}]^m[\text{B}]^n$.

### 2.2. Nhiệt độ

**Tăng T → tăng tốc độ rất mạnh.** Quy tắc kinh nghiệm: **T tăng 10°C → tốc độ tăng 2-4 lần**.

Lý do: phương trình Arrhenius $k = A \cdot \exp\!\left(-\dfrac{E_a}{RT}\right)$. Khi T tăng, **tỉ lệ phân tử có năng lượng $\geq E_a$ tăng theo hàm mũ**.

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

Cơ chế: **giảm $E_a$** bằng cách cung cấp **đường phản ứng khác** (alternative pathway). $E_a$ giảm → tỉ lệ phân tử vượt qua tăng → rate tăng (có thể tới hàng triệu lần).

**Ví dụ**:
- **Enzyme** trong cơ thể là xúc tác sinh học. Catalase phân hủy $\text{H}_2\text{O}_2$ nhanh gấp $\sim 10^7$ lần không xúc tác.
- **Pt, Pd** trong bộ chuyển đổi xúc tác xe hơi giúp đốt cháy hoàn toàn nhiên liệu.
- **Fe** trong tổng hợp ammonia (Haber-Bosch): $\text{N}_2 + 3\text{H}_2 \rightarrow 2\text{NH}_3$.

**Lưu ý**: xúc tác **không làm thay đổi vị trí cân bằng** — chỉ làm cân bằng đạt nhanh hơn.

### 📝 Tóm tắt mục 2

5 yếu tố: nồng độ, nhiệt độ, áp suất (khí), diện tích bề mặt (chất rắn), xúc tác. Đều tăng rate khi tăng (xúc tác giảm $E_a$).

---

## 3. Cân bằng hóa học

### 3.1. Phản ứng thuận nghịch

Một số phản ứng **không chạy hết** — chúng có thể đi cả 2 chiều:

$$a\text{A} + b\text{B} \rightleftharpoons c\text{C} + d\text{D}$$

Phản ứng **thuận** (forward): $\text{A} + \text{B} \rightarrow \text{C} + \text{D}$.
Phản ứng **nghịch** (reverse): $\text{C} + \text{D} \rightarrow \text{A} + \text{B}$.

Theo thời gian, **rate thuận giảm** (do [A], [B] giảm) và **rate nghịch tăng** (do [C], [D] tăng). Đến khi **rate thuận = rate nghịch** → hệ đạt **cân bằng động**.

### 💡 Trực giác / Hình dung

Tưởng tượng 2 phòng nối nhau bằng cửa. Phòng A đầy người, phòng B trống. Lúc đầu, người từ A sang B nhiều (rate thuận lớn), từ B sang A ít (rate nghịch nhỏ). Theo thời gian, A vơi, B đầy → rate thuận giảm, rate nghịch tăng. Đến khi **số người từ A sang B = số người từ B sang A** mỗi đơn vị thời gian → tổng số ở mỗi phòng KHÔNG đổi, dù từng người vẫn di chuyển.

Đây là **cân bằng động** — không phải "không có ai di chuyển", mà là "tổng không đổi".

### 3.2. Hằng số cân bằng K

Với phản ứng $a\text{A} + b\text{B} \rightleftharpoons c\text{C} + d\text{D}$ ở trạng thái cân bằng:

$$K = \dfrac{[\text{C}]^c \, [\text{D}]^d}{[\text{A}]^a \, [\text{B}]^b}$$

**K = const** ở 1 nhiệt độ xác định (chỉ phụ thuộc T, không phụ thuộc nồng độ ban đầu).

**Ý nghĩa K**:
- **K >> 1**: cân bằng nghiêng về sản phẩm (phản ứng "gần như hoàn tất").
- **K ≈ 1**: cân bằng "ở giữa".
- **K << 1**: cân bằng nghiêng về chất phản ứng.

### 3.3. Ba ví dụ tính K

**Ví dụ 1**: Phản ứng $\text{H}_2 + \text{I}_2 \rightleftharpoons 2\text{HI}$. Tại cân bằng (700 K): $[\text{H}_2] = 0{,}2$ M, $[\text{I}_2] = 0{,}2$ M, $[\text{HI}] = 1{,}4$ M.
- $K = \dfrac{[\text{HI}]^2}{[\text{H}_2][\text{I}_2]} = \dfrac{(1{,}4)^2}{0{,}2 \times 0{,}2} = \dfrac{1{,}96}{0{,}04} =$ **49**.
- $K = 49 > 1$ → cân bằng nghiêng về HI (phản ứng tạo HI tốt).

**Ví dụ 2**: Phản ứng $\text{N}_2\text{O}_4 \rightleftharpoons 2\text{NO}_2$. Tại 25°C: $[\text{N}_2\text{O}_4] = 0{,}04$ M, $[\text{NO}_2] = 0{,}12$ M.
- $K = \dfrac{[\text{NO}_2]^2}{[\text{N}_2\text{O}_4]} = \dfrac{(0{,}12)^2}{0{,}04} = \dfrac{0{,}0144}{0{,}04} =$ **0,36**.
- $K < 1$ → cân bằng nghiêng về $\text{N}_2\text{O}_4$.

**Ví dụ 3**: Tổng hợp ammonia $\text{N}_2 + 3\text{H}_2 \rightleftharpoons 2\text{NH}_3$ (Haber-Bosch). Ở 400°C: $K = 0{,}5$ (rất nhỏ).
- Đó là lý do phải dùng áp suất cao + xúc tác Fe để có hiệu suất ammonia khả quan.

### 📝 Tóm tắt mục 3

- Phản ứng thuận nghịch đến trạng thái cân bằng động ($v_{\text{thuận}} = v_{\text{nghịch}}$).
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

Phản ứng **tỏa nhiệt** (exothermic, $\Delta H < 0$): coi "nhiệt" như sản phẩm.
- Tăng T → cân bằng dịch sang trái (tiêu thụ nhiệt).

Phản ứng **thu nhiệt** (endothermic, $\Delta H > 0$): coi "nhiệt" như chất phản ứng.
- Tăng T → cân bằng dịch sang phải (hấp thụ nhiệt).

Lưu ý: **T thay đổi → K thay đổi** (khác với nồng độ — chỉ dịch chuyển trong cùng K).

#### c) Đổi áp suất (khí)

Tăng P → cân bằng dịch về phía có **ít mol khí** hơn (để giảm P).
Giảm P → dịch về phía nhiều mol khí.

Lưu ý: nếu cả 2 vế có cùng số mol khí, áp suất không ảnh hưởng.

### 4.3. Ví dụ thực tế — Haber-Bosch (Tổng hợp ammonia)

$$\text{N}_2\text{(g)} + 3\text{H}_2\text{(g)} \rightleftharpoons 2\text{NH}_3\text{(g)}, \quad \Delta H < 0 \ (\text{tỏa nhiệt})$$

Đếm mol khí: trái có $1 + 3 = 4$ mol, phải có 2 mol → chênh lệch.

| Tác động | Hệ thống làm gì | Để tạo nhiều $\text{NH}_3$: |
|----------|------------------|---------------------|
| Tăng $[\text{N}_2]$ hoặc $[\text{H}_2]$ | Dịch sang phải | ✓ làm |
| Bớt $\text{NH}_3$ (lấy ra liên tục) | Dịch sang phải | ✓ làm |
| Tăng T | Dịch sang trái (vì tỏa nhiệt) | ✗ giảm hiệu suất, nhưng vẫn cần T cao để rate đủ nhanh |
| Tăng P | Dịch sang phải (4 mol → 2 mol) | ✓ làm (~ 200 atm) |
| Xúc tác Fe | Không dịch, nhưng tăng rate | ✓ làm |

**Compromise thực tế**: 400°C, 200 atm, xúc tác Fe — hiệu suất ~ 15-20% mỗi vòng. Tách $\text{NH}_3$ ra, đưa $\text{N}_2$ + $\text{H}_2$ còn lại quay vòng. Phương pháp này đoạt Nobel cho Fritz Haber (1918).

### ❓ Câu hỏi tự nhiên của người đọc

**Q: Vì sao xúc tác không dịch chuyển cân bằng?**
A: Vì xúc tác giảm $E_a$ cho cả phản ứng thuận và phản ứng nghịch như nhau → rate cả 2 chiều đều tăng cùng tỉ lệ → tỉ số $\dfrac{v_{\text{thuận}}}{v_{\text{nghịch}}}$ không đổi → vị trí cân bằng không đổi. Chỉ thời gian đạt cân bằng ngắn hơn.

**Q: Phản ứng đạt cân bằng có dừng không?**
A: KHÔNG. Đó là cân bằng **động** — phản ứng thuận và nghịch vẫn xảy ra cùng tốc độ → tổng nồng độ không đổi, nhưng từng phân tử vẫn liên tục biến đổi. Có thể chứng minh bằng đồng vị phóng xạ: gắn $^{14}\text{C}$ vào sản phẩm, sẽ thấy $^{14}\text{C}$ xuất hiện ở chất phản ứng theo thời gian.

### 📝 Tóm tắt mục 4

- Le Chatelier: hệ chống lại thay đổi.
- Đổi C: dịch để tiêu thụ chất thêm vào.
- Đổi T: tỏa nhiệt thì T↑ dịch trái, thu nhiệt thì T↑ dịch phải.
- Đổi P: dịch về phía ít mol khí khi P↑.
- Xúc tác: không dịch chuyển, chỉ tăng rate.

---

## 5. Bài tập + Lời giải chi tiết

### Bài tập

**Bài 1**: Cho phản ứng $2\text{H}_2 + \text{O}_2 \rightarrow 2\text{H}_2\text{O}$. Tại $t = 0$, $[\text{H}_2] = 1{,}0$ M; tại $t = 20$ s, $[\text{H}_2] = 0{,}6$ M. Tính rate.

**Bài 2**: Viết biểu thức K cho các phản ứng:
a) $\text{N}_2 + 3\text{H}_2 \rightleftharpoons 2\text{NH}_3$
b) $2\text{SO}_2 + \text{O}_2 \rightleftharpoons 2\text{SO}_3$
c) $\text{H}_2\text{O} \rightleftharpoons \text{H}^+ + \text{OH}^-$

**Bài 3**: Phản ứng $2\text{NO}_2 \rightleftharpoons \text{N}_2\text{O}_4$ ($\Delta H < 0$). Dự đoán hướng dịch chuyển khi:
a) Tăng $[\text{NO}_2]$.
b) Tăng nhiệt độ.
c) Tăng áp suất.
d) Thêm xúc tác.

**Bài 4**: Cho cân bằng $\text{H}_2 + \text{I}_2 \rightleftharpoons 2\text{HI}$ với $K = 49$ (700 K). Cho ban đầu $[\text{H}_2]_0 = [\text{I}_2]_0 = 1{,}0$ M, $[\text{HI}]_0 = 0$. Tính nồng độ tại cân bằng.

**Bài 5**: Vì sao cho bột than vào lò cao chạy nhanh hơn cục than to cùng khối lượng?

**Bài 6**: Để bảo quản thức ăn trong tủ lạnh ở 4°C thay vì 25°C, theo quy tắc 10°C/2-4 lần, tốc độ thối ước lượng giảm bao nhiêu lần?

### Lời giải

**Bài 1**: 
- $\Delta[\text{H}_2] = 0{,}6 - 1{,}0 = -0{,}4$ M trong 20 s.
- $v = -\dfrac{1}{2} \cdot \dfrac{\Delta[\text{H}_2]}{\Delta t} = -\dfrac{1}{2} \cdot \dfrac{-0{,}4}{20} =$ **0,01 M/s**.

**Bài 2**:
a) $K = \dfrac{[\text{NH}_3]^2}{[\text{N}_2][\text{H}_2]^3}$
b) $K = \dfrac{[\text{SO}_3]^2}{[\text{SO}_2]^2[\text{O}_2]}$
c) $K = \dfrac{[\text{H}^+][\text{OH}^-]}{[\text{H}_2\text{O}]}$ (thường viết $K_w = [\text{H}^+][\text{OH}^-] = 10^{-14}$ vì $[\text{H}_2\text{O}]$ gần như const).

**Bài 3**: $2\text{NO}_2 \rightleftharpoons \text{N}_2\text{O}_4$ ($\Delta H < 0$, tỏa nhiệt).
- a) Tăng $[\text{NO}_2]$ → dịch phải (tạo $\text{N}_2\text{O}_4$).
- b) Tăng T (phản ứng tỏa nhiệt) → dịch trái (về $\text{NO}_2$).
- c) Tăng P. Trái có 2 mol khí, phải có 1 mol → P↑ dịch về phía ít mol → dịch phải.
- d) Xúc tác → không dịch (chỉ nhanh hơn).

**Bài 4**: Gọi $x$ = nồng độ $[\text{HI}]$ tại cân bằng $/ 2$ (tức $[\text{H}_2]$ tiêu thụ).
- $[\text{H}_2] = 1 - x$, $[\text{I}_2] = 1 - x$, $[\text{HI}] = 2x$.
- $K = \dfrac{(2x)^2}{(1-x)(1-x)} = \dfrac{4x^2}{(1-x)^2} = 49$.
- $\dfrac{2x}{1-x} = 7$ (lấy căn) → $2x = 7 - 7x$ → $9x = 7$ → $x = 0{,}778$.
- Vậy $[\text{H}_2] = [\text{I}_2] = 1 - 0{,}778 =$ **0,222 M**, $[\text{HI}] =$ **1,556 M**.
- Kiểm tra: $K = \dfrac{(1{,}556)^2}{(0{,}222)^2} = \dfrac{2{,}42}{0{,}0493} =$ **49,1** $\approx 49$ ✓.

**Bài 5**: Bột than có **diện tích bề mặt** lớn hơn cục than nhiều lần (chia nhỏ → tăng S theo $r^{-1}$). Phản ứng cháy là phản ứng dị thể (rắn + khí), chỉ xảy ra ở bề mặt. S lớn → nhiều điểm tiếp xúc đồng thời → rate cao hơn.

**Bài 6**: Chênh lệch $T = 25 - 4 = 21$°C ≈ 2 mức 10°C. Theo quy tắc 2-4 lần/10°C, tốc độ giảm khoảng $(2\text{-}4)^2 =$ **4-16 lần**. Lấy trung bình ~ 8 lần. Đó là lý do trong tủ lạnh thức ăn để được vài ngày thay vì vài giờ ở nhiệt độ phòng.

---

## 6. Liên kết và bài tiếp theo

- **Bài tiếp theo (Tier 2)**: [Lesson 01 — Acid-Base](../../02-Reactions-Thermo/lesson-01-acid-base/) — pH, dung dịch đệm, chuẩn độ.
- **Liên kết Math**: tốc độ phản ứng = đạo hàm theo thời gian → [`Math/04-Calculus-1var/lesson-03`](../../../Math/04-Calculus-1var/lesson-03-derivatives-definition/). Arrhenius là hàm mũ → [`Math/01-Arithmetic-Algebra/lesson-06`](../../../Math/01-Arithmetic-Algebra/lesson-06-powers-roots-logs/).
- **Liên kết Physics**: phản ứng tỏa/thu nhiệt → $\Delta H$ → [`Physics/02-Thermo-Electromagnetism/lesson-01-temperature-heat`](../../../Physics/02-Thermo-Electromagnetism/lesson-01-temperature-heat/) và Tier 2 Lesson 04 nhiệt động hóa.

---

## 📝 Tổng kết Lesson 08

1. **Rate** $= \dfrac{\Delta C}{\Delta t}$, chia cho hệ số stoich.
2. **Thuyết va chạm**: cần năng lượng $\geq E_a$ và hướng đúng.
3. **5 yếu tố ảnh hưởng rate**: nồng độ, T, P, diện tích bề mặt, xúc tác.
4. **Cân bằng động**: $v_{\text{thuận}} = v_{\text{nghịch}}$. K = tích sản phẩm/tích phản ứng (theo hệ số).
5. **K** chỉ phụ thuộc T. $K > 1$: sản phẩm nhiều. $K < 1$: chất phản ứng nhiều.
6. **Le Chatelier**: hệ chống lại thay đổi. $\Delta C$, $\Delta T$, $\Delta P$ dịch theo nguyên tắc trên.
7. **Xúc tác** giảm $E_a$ → rate tăng. KHÔNG dịch chuyển cân bằng.

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
