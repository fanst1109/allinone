# Lesson 06 — Mô hình tối ưu (LP, Lagrange)

## Mục tiêu

- Mô hình hóa bài toán "làm sao **tốt nhất** dưới ràng buộc": tối đa lợi nhuận, tối thiểu chi phí.
- **Quy hoạch tuyến tính (Linear Programming)**: hàm mục tiêu + ràng buộc tuyến tính; miền khả thi lồi; nghiệm ở đỉnh; giải bằng đồ thị.
- **Nhân tử Lagrange**: tối ưu có ràng buộc đẳng thức; ∇f = λ∇g; ý nghĩa "giá bóng (shadow price)" của λ.

## Kiến thức tiền đề

- [Lesson 01 — Chu trình mô hình hóa](../lesson-01-modeling-cycle/).
- [T6 L04 — Hàm nhiều biến, gradient, cực trị có ràng buộc](../../06-Advanced/lesson-04-multivariable-functions/).
- [T1 — Hệ bất phương trình bậc nhất](../../01-Arithmetic-Algebra/lesson-05-inequalities/).

---

## 1. Bài toán tối ưu là gì?

💡 **Trực giác.** Rất nhiều quyết định thực tế có dạng: *"chọn phương án làm một đại lượng lớn nhất (hoặc nhỏ nhất), nhưng phải nằm trong giới hạn nguồn lực"*. Sản xuất bao nhiêu mỗi loại để lời nhất *khi* gỗ và công có hạn? Pha khẩu phần rẻ nhất *mà* đủ dinh dưỡng?

Mọi bài toán tối ưu có 3 thành phần:
- **Biến quyết định**: cái ta chọn (số sản phẩm x, y...).
- **Hàm mục tiêu**: cái cần cực đại/cực tiểu (lợi nhuận P).
- **Ràng buộc**: giới hạn (≤ nguồn lực, ≥ yêu cầu, = cân đối).

📝 **Tóm tắt mục 1**: tối ưu = chọn biến quyết định để cực trị hàm mục tiêu thỏa các ràng buộc.

---

## 2. Quy hoạch tuyến tính (LP)

💡 **Trực giác — đẩy thước tới mép.** Khi mục tiêu và ràng buộc đều *tuyến tính*, miền các phương án hợp lệ là một **đa giác lồi**. Hàm mục tiêu là họ đường thẳng song song; tối ưu = đẩy đường đó xa nhất theo hướng tốt mà vẫn chạm miền → luôn chạm tại **một đỉnh**.

> 📐 **Định nghĩa đầy đủ — Quy hoạch tuyến tính & miền khả thi**
>
> **(a) Là gì**: LP = bài toán cực trị một hàm mục tiêu *tuyến tính* dưới các ràng buộc *tuyến tính* (bất phương trình/phương trình bậc nhất). **Miền khả thi** = tập mọi (x, y) thỏa *tất cả* ràng buộc — giao của các nửa mặt phẳng, là một đa giác lồi.
>
> **(b) Vì sao cần**: Vô số bài thực tế (sản xuất, vận tải, khẩu phần, phân bổ vốn) khớp dạng này. LP có lý thuyết đẹp (nghiệm ở đỉnh) và thuật toán hiệu quả (đơn hình — simplex, điểm trong) giải được bài hàng triệu biến — xương sống của *vận trù học (operations research)*.
>
> **(c) Ví dụ số**: Xưởng mộc làm **bàn** (x cái, lời 40 nghìn) và **ghế** (y cái, lời 30 nghìn). Mỗi bàn tốn 2 tấm gỗ + 1 giờ công; mỗi ghế tốn 1 tấm gỗ + 3 giờ công. Trong tuần có 40 tấm gỗ, 45 giờ công. Làm bao nhiêu bàn, bao nhiêu ghế để lời nhất? Mô hình:
> > Cực đại P = 40x + 30y; ràng buộc 2x + y ≤ 40 (gỗ), x + 3y ≤ 45 (công), x ≥ 0, y ≥ 0.

### 2.1 Giải bằng đồ thị (walk-through)

**Tìm các đỉnh của miền khả thi** (giao các đường ràng buộc):
- (0, 0): P = 0.
- (20, 0): chạm gỗ 2x = 40; công 20 ≤ 45 ✓. P = 40·20 = **800**.
- (0, 15): chạm công 3y = 45; gỗ 15 ≤ 40 ✓. P = 30·15 = **450**.
- Giao gỗ ∩ công: 2x + y = 40 và x + 3y = 45. Từ pt1: y = 40 − 2x. Thế: x + 3(40 − 2x) = 45 → x + 120 − 6x = 45 → −5x = −75 → **x = 15, y = 10**. Kiểm gỗ 30+10 = 40 ✓, công 15+30 = 45 ✓. P = 40·15 + 30·10 = 600 + 300 = **900**.

**So các đỉnh**: P = 0, 800, 450, **900** → tối ưu tại **(15, 10), P = 900**. Tức làm **15 bàn + 10 ghế** mỗi tuần thì lời nhất = **900 nghìn**, dùng hết cả 40 gỗ lẫn 45 công (cả hai ràng buộc đều "chặt").

### 2.2 Vì sao nghiệm luôn ở đỉnh?

💡 Hàm mục tiêu tuyến tính tăng đều theo một hướng (gradient không đổi). Trong một đa giác lồi, đi theo hướng tăng sẽ luôn dẫn ra **biên**, rồi dọc biên tới một **đỉnh** — không thể có cực đại ở giữa miền (ở đó còn đi tiếp được). Nên chỉ cần *kiểm tra hữu hạn đỉnh*, không cần quét cả miền vô hạn điểm. (Ngoại lệ: nếu mục tiêu song song một cạnh → cả cạnh tối ưu, nhưng đỉnh vẫn nằm trong số nghiệm.)

❓ **Câu hỏi tự nhiên của người đọc**

- *"Vì sao chỉ xét giao điểm các ràng buộc?"* Vì đỉnh đa giác = nơi *hai* ràng buộc cùng "chặt" (dấu =). Nghiệm tối ưu ở đỉnh → tìm đỉnh = giải các cặp phương trình ràng buộc.
- *"Nhiều biến thì sao, vẽ đồ thị được không?"* Không (4D+ không vẽ nổi). Khi đó dùng **simplex**: đi từ đỉnh này sang đỉnh kề tốt hơn cho tới khi không cải thiện được — chính là khai thác "nghiệm ở đỉnh" một cách có hệ thống.

⚠ **Lỗi thường gặp — quên ràng buộc x, y ≥ 0.** Bỏ ràng buộc không âm → miền khả thi sai, có thể ra nghiệm "sản xuất −5 cái". Luôn kèm x ≥ 0, y ≥ 0 cho biến vật lý.

🔁 **Dừng lại tự kiểm tra**

1. Với bài trên, nếu lời mỗi **bàn** tăng lên 60 (P = 60x + 30y), đỉnh (20,0) cho P bao nhiêu? So với (15,10).

<details><summary>Đáp án</summary>

(20,0): P = 60·20 = **1200**. (15,10): P = 60·15 + 30·10 = 900 + 300 = **1200**. *Hòa nhau* → mục tiêu song song cạnh nối (20,0)–(15,10), cả cạnh đó tối ưu (mọi điểm trên cạnh cho P = 1200). Tăng lời bàn thêm nữa → (20,0) thắng (chỉ làm bàn).

</details>

### 📝 Tóm tắt mục 2

- LP: cực trị mục tiêu tuyến tính dưới ràng buộc tuyến tính; miền khả thi = đa giác lồi.
- Nghiệm tối ưu luôn ở **một đỉnh** → chỉ kiểm tra hữu hạn đỉnh (đồ thị) hoặc dùng simplex (nhiều biến).
- Nhớ ràng buộc không âm.

---

## 3. Nhân tử Lagrange (ràng buộc đẳng thức)

💡 **Trực giác — tiếp xúc đường mức.** Khi ràng buộc là *đẳng thức* g(x,y) = c (đi đúng trên một đường cong), tối ưu f xảy ra ở chỗ **đường mức của f tiếp xúc đường ràng buộc**. Tại đó hai gradient cùng phương: ∇f = λ·∇g. Vì nếu ∇f còn thành phần dọc theo đường ràng buộc, ta đi tiếp được để tăng f.

> 📐 **Định nghĩa đầy đủ — Nhân tử Lagrange λ**
>
> **(a) Là gì**: Để cực trị f(x,y) với ràng buộc g(x,y) = c, giải hệ **∇f = λ∇g** cùng với g = c. Số λ là *nhân tử Lagrange*.
>
> **(b) Vì sao cần — và λ nghĩa là gì**: Nó biến bài toán *có ràng buộc* thành giải hệ phương trình *không ràng buộc*. Quan trọng hơn, λ = **giá bóng (shadow price)**: tốc độ thay đổi giá trị tối ưu khi nới lỏng ràng buộc, df*/dc = λ. Tức "nếu có thêm 1 đơn vị nguồn lực c thì mục tiêu tăng λ" — cực kỳ hữu ích trong kinh tế (giá trị cận biên của tài nguyên).
>
> **(c) Ví dụ số — rào mảnh vườn**: Bạn có **20 m hàng rào**, muốn quây một mảnh vườn hình chữ nhật (cạnh x, y) sao cho **diện tích lớn nhất**. Chu vi 2(x+y) = 20 → ràng buộc g = x + y = 10; mục tiêu f = x·y. ∇f = (y, x), ∇g = (1, 1) → y = λ, x = λ → **x = y = 5** → vườn **vuông 5×5**, diện tích = 25 m². λ = 5 = giá bóng: mua thêm hàng rào để x+y = 11 thì diện tích tối ưu ≈ 30.25 m², tức **thêm 1 m "tổng cạnh" (≈ 2 m rào) cho thêm ~5 m² vườn**. Kiểm: f*(c) = (c/2)² → df*/dc = c/2 = 5 tại c = 10 ✓.

❓ **Câu hỏi tự nhiên của người đọc**

- *"Vì sao tối ưu lại là hình vuông?"* Vì với chu vi cố định, tích x·y lớn nhất khi hai cạnh bằng nhau (bất đẳng thức AM–GM). Lagrange cho ra điều này một cách máy móc qua ∇f = λ∇g.
- *"λ âm/dương nghĩa là gì?"* Dấu cho biết nới ràng buộc làm mục tiêu tăng (λ > 0) hay giảm. Độ lớn |λ| = mức nhạy. λ ≈ 0 → ràng buộc "lỏng", gần như không ảnh hưởng tối ưu.

⚠ **Lỗi thường gặp — quên phương trình ràng buộc g = c.** Hệ Lagrange gồm ∇f = λ∇g *và* g = c (đủ phương trình cho x, y, λ). Chỉ giải ∇f = λ∇g là thiếu, ra vô số nghiệm theo λ.

🔁 **Dừng lại tự kiểm tra**

1. Cực đại f = x·y với x + y = 20. Tìm x, y, diện tích và λ.

<details><summary>Đáp án</summary>

∇f = (y,x) = λ(1,1) → x = y; ràng buộc x + y = 20 → **x = y = 10**, diện tích = 100. λ = x = 10 (giá bóng: nới tổng lên 21 → diện tích ≈ 110.25, tăng ~10).

</details>

### 📝 Tóm tắt mục 3

- Lagrange: cực trị f với g = c → giải ∇f = λ∇g *và* g = c.
- λ = giá bóng = df*/dc: mục tiêu thay đổi bao nhiêu khi nới 1 đơn vị ràng buộc.
- Tại tối ưu, đường mức f tiếp xúc đường ràng buộc.

---

## 4. Bài tập

**Bài 1.** Tiệm bánh làm bánh kem (x) lời 5, bánh mì (y) lời 4. Lò nướng tối đa 10 mẻ/ngày (x + y ≤ 10); bột đủ cho 2x + y ≤ 16. Cực đại P = 5x + 4y với x, y ≥ 0. Liệt kê các đỉnh và tìm tối ưu.

**Bài 2.** Giải thích trong vài câu vì sao nghiệm LP luôn nằm ở một đỉnh của miền khả thi.

**Bài 3.** Cực đại f = x·y với ràng buộc 3x + 2y = 12 (dùng Lagrange). Tìm x, y, f và λ.

**Bài 4.** Diễn giải ý nghĩa thực tế của giá bóng λ trong Bài 3 (nếu ràng buộc là "ngân sách = 12").

**Bài 5.** Một bài LP có ràng buộc không âm bị bỏ quên, cho nghiệm tối ưu x = 8, y = −3. Sai ở đâu và cần thêm gì?

---

## 5. Lời giải chi tiết

**Bài 1.** Đỉnh:
- (0,0): P = 0.
- (8,0): từ 2x ≤ 16 → x ≤ 8; x+y: 8 ≤ 10 ✓. P = 40.
- (0,10): x+y = 10; 2x+y = 10 ≤ 16 ✓. P = 40.
- Giao x+y=10 ∩ 2x+y=16: trừ → x = 6, y = 4. P = 5·6+4·4 = 30+16 = **46**.
→ Tối ưu **(6,4), P = 46**: làm **6 bánh kem + 4 bánh mì**/ngày, lời 46.

**Bài 2.** Hàm mục tiêu tuyến tính có gradient (hướng tăng) không đổi. Trong miền lồi, từ bất kỳ điểm trong nào còn có thể đi theo hướng gradient để tăng mục tiêu → cực đại không thể ở trong miền, phải ở biên; dọc biên (cũng tuyến tính) lại tiếp tục tăng tới một đỉnh. Vậy tối ưu đạt tại đỉnh (nơi hai ràng buộc cùng chặt). Hệ quả: chỉ cần kiểm tra hữu hạn đỉnh.

**Bài 3.** ∇f = (y, x), ∇g = (3, 2) → y = 3λ, x = 2λ. Ràng buộc 3x + 2y = 12 → 3(2λ) + 2(3λ) = 12 → 12λ = 12 → λ = 1 → **x = 2, y = 3**, f = x·y = **6**. λ = **1**.

**Bài 4.** λ = 1 = giá bóng của ngân sách: nếu ngân sách tăng từ 12 lên 13, giá trị tối ưu f tăng thêm ≈ 1 (lên ≈ 7). Nó cho biết "1 đồng ngân sách thêm đáng giá bao nhiêu" — căn cứ quyết định có nên vay/đầu tư thêm nguồn lực không.

**Bài 5.** Bỏ ràng buộc không âm → miền khả thi mở rộng sang vùng vô lý; y = −3 nghĩa "sản xuất âm 3 đơn vị", không có nghĩa vật lý. Cần thêm **x ≥ 0, y ≥ 0** rồi giải lại; nghiệm đúng sẽ nằm ở đỉnh của miền *có* ràng buộc không âm.

---

## 6. Bài tiếp theo

[Lesson 07 — Mô hình ngẫu nhiên (Monte Carlo, Markov)](../lesson-07-stochastic-monte-carlo/): khi hệ có yếu tố *ngẫu nhiên*, ta mô hình bằng xác suất thay vì phương trình tất định.

## 📝 Tổng kết

1. **Tối ưu** = chọn biến quyết định để cực trị mục tiêu thỏa ràng buộc.
2. **LP**: mục tiêu + ràng buộc tuyến tính → miền khả thi lồi; nghiệm ở **đỉnh** (đồ thị/simplex). Nhớ x,y ≥ 0.
3. **Lagrange**: ràng buộc đẳng thức → ∇f = λ∇g *và* g = c.
4. **λ = giá bóng** = df*/dc: giá trị cận biên của nới lỏng ràng buộc.
