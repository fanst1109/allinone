# Lesson 02 — Đạo hàm 1 biến (Derivatives)

> **Tầng 3 (Calculus) — Bài 2/8.** Sau khi đã hiểu *giới hạn* ở Lesson 01, ta dùng nó để định nghĩa **đạo hàm** — khái niệm trung tâm của toàn bộ giải tích và là nền móng của gradient descent, backpropagation, optimization, và xác suất liên tục.

---

## 0. Mục tiêu học tập

Sau bài này bạn sẽ:

1. Phát biểu được **đạo hàm tại một điểm** bằng định nghĩa giới hạn.
2. Giải thích được mối liên hệ giữa **cát tuyến** (secant line) và **tiếp tuyến** (tangent line) — và vì sao "h → 0" lại biến cái này thành cái kia.
3. **Tính đạo hàm bằng tay** cho `x²`, `x³`, `1/x`, `√x`, `xⁿ`, `sin x`, `cos x`, `eˣ`, `ln x` — không nhìn bảng.
4. Đọc trôi chảy 4 ký hiệu `f'(x)`, `dy/dx`, `df/dx`, `d/dx[f(x)]` và biết chúng cùng một nghĩa.
5. Nhận diện 3 trường hợp **đạo hàm không tồn tại**: góc nhọn, tiếp tuyến đứng, gián đoạn.
6. Biết **higher-order derivatives** (f'', f''') là gì và chúng đo cái gì trong vật lý / optimization / hình học.
7. Mô tả được vai trò của đạo hàm trong ML (gradient = vector các đạo hàm riêng, sẽ học chi tiết ở Lesson 06).

---

## 1. Kiến thức tiền đề

Bạn cần nắm các nội dung sau trước khi đọc tiếp:

- [Lesson 01 — Giới hạn](../lesson-01-limits/): vì đạo hàm = "một loại giới hạn cụ thể". Đặc biệt cần nhớ:
  - Quy tắc 0/0 đơn giản hóa được sau khi rút gọn đại số.
  - Hai giới hạn đặc biệt: `lim (h→0) (sin h)/h = 1` và `lim (h→0) (eʰ − 1)/h = 1`.
- [Algebra Lesson 06 — Hàm bậc 1 và bậc 2](../../Algebra/lesson-06-linear-quadratic/): vì *slope của đường thẳng* (`y = ax + b`, slope = `a`) là tiền đề trực giác cho *slope của tiếp tuyến*.
- [Trigonometry — sin, cos cơ bản](../../Trigonometry/): công thức cộng `sin(α + β) = sin α cos β + cos α sin β` sẽ dùng để chứng minh `(sin x)' = cos x`.

Nếu chưa vững một trong các điểm trên, đọc lại ngay — toàn bộ phần dưới đứng trên 3 cột này.

---

## 2. Trực giác — đạo hàm là gì?

> 💡 **Trực giác / Hình dung.**  
> Đạo hàm = **tốc độ thay đổi tức thời** của một đại lượng theo một đại lượng khác. Cụm từ then chốt là *"tức thời"*: không phải "trung bình trong 5 giây", mà là *"ngay tại khoảnh khắc này"*.

### 2.1 Analogy xe hơi — vận tốc tức thời

Bạn lái xe từ nhà đến cơ quan. Quãng đường đi được theo thời gian là hàm `s(t)`:

| `t` (giây) | `s(t)` (mét) |
|-----------|--------------|
| 0  | 0     |
| 10 | 120   |
| 20 | 280   |
| 30 | 480   |
| 40 | 720   |

**Vận tốc trung bình** từ giây 0 đến giây 40 = `(720 − 0) / (40 − 0)` = **18 m/s**.

Nhưng nếu cảnh sát giao thông hỏi "ngay tại giây 20 anh đi nhanh bao nhiêu?" thì sao? Tốc kế hiển thị một con số duy nhất — vận tốc *tức thời* tại t = 20. Đó chính là **đạo hàm của s theo t tại t = 20**, viết là `s'(20)`.

Làm sao tính được? Nhìn vào bảng:

- Từ `t = 10` đến `t = 20`: `Δs = 280 − 120 = 160`, `Δt = 10`, vận tốc trung bình = **16 m/s**.
- Từ `t = 20` đến `t = 30`: `Δs = 480 − 280 = 200`, `Δt = 10`, vận tốc trung bình = **20 m/s**.

Cả hai khoảng chứa `t = 20` nhưng cho ra số khác nhau. Vận tốc *tức thời* phải nằm đâu đó giữa 16 và 20. Cách duy nhất để có số chính xác: **thu hẹp khoảng thời gian quanh `t = 20` đến vô cùng nhỏ**, rồi lấy tỷ số `Δs/Δt`. Đây chính là ý tưởng "h → 0" trong định nghĩa đạo hàm.

### 2.2 Analogy 2 — bồn nước

Bồn nước có thể tích `V(t)` lít, bạn đang xả nước ra. Câu hỏi "ngay bây giờ nước chảy ra bao nhiêu lít mỗi giây?" chính là `−V'(t)` (dấu trừ vì V giảm).

### 2.3 Analogy 3 — nhiệt độ cốc cà phê

`T(t)` = nhiệt độ cà phê ở phút thứ t. `T'(t)` < 0 (đang nguội đi), và `|T'(t)|` đo "tốc độ nguội". Khi cà phê nguội về gần nhiệt độ phòng, `T'(t)` → 0 (chậm dần).

> 📌 **Điểm chung**: trong cả 3 ví dụ, đạo hàm trả lời câu hỏi *"ngay bây giờ, đại lượng này đang thay đổi nhanh chậm thế nào, theo hướng nào?"*.

### 2.4 Vì sao cần *"tức thời"* mà không dùng trung bình?

- **Vật lý**: vận tốc trung bình không cho biết bạn có vượt tốc độ tại từng khoảnh khắc hay không.
- **Tài chính**: lợi suất trung bình cả năm = 8% không cho biết tháng này danh mục đang lên hay xuống.
- **ML**: muốn biết loss tăng hay giảm khi tăng weight `w` một chút, ta cần `∂L/∂w` — đạo hàm tức thời. Trung bình `L` qua nhiều giá trị `w` là vô nghĩa cho việc cập nhật mô hình.

> ❓ **Câu hỏi tự nhiên của người đọc**  
> *"Nếu tốc kế xe đo được vận tốc tức thời, tức là đạo hàm đã tồn tại trong đời thực rồi — vậy toán chỉ là cách viết nó lại sao?"*  
> Đúng. Bài toán giải tích thế kỷ 17 (Newton, Leibniz) ra đời để **chính thức hóa** khái niệm "tốc độ tức thời" mà người ta đã dùng từ thời cổ đại nhưng không định nghĩa chặt được. Cái mới của giải tích không phải khái niệm, mà là **công cụ giới hạn** giúp tính được nó.

---

## 3. Slope cát tuyến → slope tiếp tuyến

### 3.1 Cát tuyến (secant line)

> 💡 **Trực giác.** Cát tuyến là đường thẳng **cắt** đồ thị hàm số tại **2 điểm**. Nó cho ta "vận tốc trung bình" trên khoảng giữa 2 điểm.

Cho hàm `f`. Chọn 2 điểm trên đồ thị: `(a, f(a))` và `(a + h, f(a + h))` với `h ≠ 0`. Đường thẳng qua 2 điểm này có slope:

```
slope cát tuyến = [f(a + h) − f(a)] / h
```

Đây là *tỷ số biến thiên trung bình* (average rate of change) trên đoạn từ `a` đến `a + h`.

**Ví dụ.** `f(x) = x²`, `a = 3`, `h = 1`:

- `f(3) = 9`, `f(4) = 16`.
- Slope cát tuyến = `(16 − 9) / 1` = **7**.

**Đường cát tuyến đó là**: đi qua `(3, 9)` với slope 7 → `y − 9 = 7(x − 3)` → `y = 7x − 12`.

### 3.2 Tiếp tuyến (tangent line)

> 💡 **Trực giác.** Tiếp tuyến tại điểm `(a, f(a))` là đường thẳng **"chạm" đồ thị tại đúng điểm đó** và **đi cùng hướng** với đồ thị tại điểm đó. Nó cho ta "vận tốc tức thời" tại `a`.

Cát tuyến chứa 2 điểm. Tiếp tuyến chỉ chứa 1 điểm. Vậy slope của tiếp tuyến tính kiểu gì?

**Ý tưởng then chốt**: kéo điểm thứ hai `(a + h, f(a + h))` **lại gần** `(a, f(a))` bằng cách cho `h → 0`. Khi đó cát tuyến *xoay quanh* `(a, f(a))` và "trượt" về vị trí tiếp tuyến.

Quay lại `f(x) = x²` tại `a = 3`. Xét các cát tuyến với h nhỏ dần:

| `h`     | `f(3+h)`     | Slope cát tuyến = `(f(3+h) − 9)/h` |
|---------|--------------|------------------------------------|
| 1       | 16           | `7`                                |
| 0.5     | 12.25        | `6.5`                              |
| 0.1     | 9.61         | `6.1`                              |
| 0.01    | 9.0601       | `6.01`                             |
| 0.001   | 9.006001     | `6.001`                            |
| −0.001  | 8.994001     | `5.999`                            |
| −0.01   | 8.9401       | `5.99`                             |
| −0.1    | 8.41         | `5.9`                              |

Slope cát tuyến **hội tụ về 6** khi h → 0 (cả 2 phía). Vậy **slope tiếp tuyến tại `x = 3` là 6**, và ta viết `f'(3) = 6`.

> ⚠ **Lỗi thường gặp.**  
> Người mới thường nghĩ "tiếp tuyến chạm 1 điểm, nên không có slope" hoặc "phải nội suy 2 điểm cách nhau bao xa thì hợp lý". Cả hai đều sai. **Slope tiếp tuyến không tính từ 2 điểm trên tiếp tuyến — nó là *giới hạn* của slope cát tuyến.** Đây là lý do toàn bộ giải tích chỉ có thể ra đời sau khi khái niệm giới hạn được chính thức hóa.

### 3.3 Hình dung 5-frame

Vẽ trong đầu (hoặc xem viz):

1. h = 1: cát tuyến cắt parabol khá "lệch".
2. h = 0.5: gần hơn.
3. h = 0.1: gần sát.
4. h = 0.01: gần như trùng tiếp tuyến.
5. h → 0: chỉ còn 1 điểm chạm — tiếp tuyến.

> 🔁 **Dừng lại tự kiểm tra.**  
> Cho `f(x) = x²` tại `a = 5`. Tính slope cát tuyến với `h = 0.01`. Dự đoán `f'(5)` bằng bao nhiêu?
> <details><summary>Đáp án</summary>
>
> - `f(5) = 25`. `f(5.01) = 25.1001`. Slope cát tuyến = `(25.1001 − 25) / 0.01` = `10.01`.
> - Dự đoán `f'(5) = 10`. (Phù hợp với công thức tổng quát ta sẽ chứng minh: `(x²)' = 2x`, nên `f'(5) = 10`.)
> </details>

---

## 4. Định nghĩa hình thức của đạo hàm

### 4.1 Phát biểu

**Định nghĩa.** Cho hàm `f` xác định trong một lân cận của `a`. **Đạo hàm của f tại a** (nếu tồn tại) là giới hạn:

```
f'(a) = lim   [f(a + h) − f(a)] / h
       h → 0
```

Nếu giới hạn này tồn tại (là một số thực), ta nói **f khả vi (differentiable) tại a**.

> 💡 **Đọc lại định nghĩa.**  
> "Lấy tỷ số `(f(a+h) − f(a))/h` — chính là slope cát tuyến qua `(a, f(a))` và `(a+h, f(a+h))` — rồi cho h tiến về 0." Toàn bộ "phép màu" của giải tích nằm gọn trong một dòng này.

### 4.2 Walk-through ví dụ 1 — `f(x) = x²` tại `a = 3`

```
f'(3) = lim   [f(3 + h) − f(3)] / h
       h → 0
       
      = lim   [(3 + h)² − 9] / h
       h → 0
       
      = lim   [9 + 6h + h² − 9] / h            (khai triển bình phương)
       h → 0
       
      = lim   [6h + h²] / h
       h → 0
       
      = lim   [h(6 + h)] / h                    (đặt h làm thừa số chung)
       h → 0
       
      = lim   (6 + h)                           (rút gọn — vì h ≠ 0 trong quá trình tiến)
       h → 0
       
      = 6
```

**Kết luận**: `f'(3) = 6`. Khớp với bảng số ở mục 3.2.

> ⚠ **Lỗi thường gặp.**  
> Ở bước rút gọn `h(6+h)/h = 6+h`, nhiều người ngần ngại "thế h = 0 thì mẫu bằng 0 mà?". Nhớ rằng **trong định nghĩa giới hạn `lim (h→0)`, h luôn khác 0** — ta chỉ quan tâm các giá trị h *gần* 0 mà *không bằng* 0. Sau khi rút gọn ta được biểu thức liên tục `6 + h`, và lấy giới hạn bằng cách thế h = 0.

### 4.3 Walk-through ví dụ 2 — `f(x) = x³` tại `a = 2`

```
f'(2) = lim   [(2 + h)³ − 8] / h
       h → 0
```

Khai triển `(2 + h)³` dùng nhị thức Newton: `(2 + h)³ = 8 + 12h + 6h² + h³`.

```
f'(2) = lim   [8 + 12h + 6h² + h³ − 8] / h
       h → 0
       
      = lim   [12h + 6h² + h³] / h
       h → 0
       
      = lim   [12 + 6h + h²]                    (chia tử mẫu cho h)
       h → 0
       
      = 12
```

**Kết luận**: `f'(2) = 12`. (Sau này dùng công thức `(x³)' = 3x²`: `3·2² = 12` ✓.)

### 4.4 Walk-through ví dụ 3 — `f(x) = 1/x` tại `a = 2`

```
f'(2) = lim   [1/(2 + h) − 1/2] / h
       h → 0
```

Quy đồng tử số: `1/(2+h) − 1/2 = [2 − (2+h)] / [2(2+h)] = −h / [2(2+h)]`.

```
f'(2) = lim   { −h / [2(2+h)] } / h
       h → 0
       
      = lim   −h / [2(2+h) · h]                 
       h → 0
       
      = lim   −1 / [2(2+h)]                     (chia tử mẫu cho h)
       h → 0
       
      = −1 / [2 · 2]                            (thế h = 0)
       
      = −1/4
```

**Kết luận**: `f'(2) = −1/4`. (Sau này dùng công thức `(1/x)' = −1/x²`: `−1/2² = −1/4` ✓.)

### 4.5 Walk-through ví dụ 4 — `f(x) = √x` tại `a = 4`

```
f'(4) = lim   [√(4 + h) − 2] / h
       h → 0
```

Mẹo: nhân tử và mẫu với "liên hợp" `√(4+h) + 2` để khử căn ở tử:

```
       = lim   [√(4+h) − 2][√(4+h) + 2] / { h · [√(4+h) + 2] }
        h → 0
        
       = lim   [(4 + h) − 4] / { h · [√(4+h) + 2] }
        h → 0
        
       = lim   h / { h · [√(4+h) + 2] }
        h → 0
        
       = lim   1 / [√(4+h) + 2]                  (chia tử mẫu cho h)
        h → 0
        
       = 1 / [√4 + 2]                            (thế h = 0)
       
       = 1 / 4
```

**Kết luận**: `f'(4) = 1/4`. (Sau này dùng công thức `(√x)' = 1/(2√x)`: `1/(2·2) = 1/4` ✓.)

> ❓ **Câu hỏi tự nhiên.**  
> *"Mỗi lần tính đạo hàm tại 1 điểm tôi phải qua hết các bước này? Mệt quá."*  
> Đúng là mệt. Vì vậy ở **Lesson 03 — Quy tắc đạo hàm** ta sẽ có **các công thức tổng quát** (như `(xⁿ)' = n·x^(n−1)`) và các quy tắc kết hợp (tổng, tích, thương, chain rule). Khi đó ta chỉ cần tra bảng + áp quy tắc, không phải dùng định nghĩa giới hạn nữa. Định nghĩa chỉ dùng khi **chứng minh** các quy tắc đó, hoặc khi gặp hàm lạ.

### 4.6 Đạo hàm là một *hàm số*, không chỉ là một số

Nếu f khả vi tại **mọi** `a` trong miền, ta có một hàm mới — **hàm đạo hàm** `f'`, định nghĩa bởi:

```
f'(x) = lim   [f(x + h) − f(x)] / h
       h → 0
```

(thay `a` bằng biến `x`).

**Ví dụ.** Với `f(x) = x²`, lặp lại walk-through 4.2 nhưng thay `3` bằng `x`:

```
f'(x) = lim   [(x + h)² − x²] / h
       h → 0
       
      = lim   [2xh + h²] / h
       h → 0
       
      = lim   (2x + h)
       h → 0
       
      = 2x
```

Vậy `(x²)' = 2x`. Đây là đẳng thức giữa **2 hàm số**, không phải giữa 2 số.

> 🔁 **Dừng lại tự kiểm tra.**  
> Dùng định nghĩa để chứng minh `(x²)' = 2x` rồi suy ra `f'(3) = 6` và `f'(5) = 10`. Khớp với 2 số ta tính riêng ở mục 3.2 và 3.3?
> <details><summary>Đáp án</summary>
> Khớp. `f'(3) = 2·3 = 6`. `f'(5) = 2·5 = 10`.
> </details>

---

## 5. Notation — 4 cách viết cùng một thứ

Đạo hàm của hàm `y = f(x)` theo biến `x` được viết bằng nhiều ký hiệu. **Tất cả đều có cùng một nghĩa**:

| Ký hiệu | Đọc | Người dùng phổ biến |
|---------|-----|----------------------|
| `f'(x)` | "f phẩy của x" | Lagrange — gọn cho hàm tổng quát |
| `dy/dx` | "đy trên đêx" | Leibniz — nhấn mạnh biến độc lập, hay dùng trong vật lý / chain rule |
| `df/dx` | "df trên dx" | Leibniz, dạng nhấn mạnh f là biểu thức cụ thể |
| `d/dx [f(x)]` | "đạo hàm theo x của f(x)" | Leibniz, dạng *toán tử* — đọc "lấy đạo hàm cái này" |
| `ẏ` (y chấm) | "y chấm" | Newton — chỉ dùng khi biến là *thời gian* (vật lý) |
| `Df`, `D_x f` | "D của f" | Euler — ít gặp |

**Ví dụ.** Bốn dòng dưới đây nói cùng một điều:

- `f'(x) = 2x` (Lagrange)
- `dy/dx = 2x` (Leibniz, với `y = x²`)
- `(d/dx)(x²) = 2x` (Leibniz toán tử)
- `D(x²) = 2x` (Euler)

> ❓ **Câu hỏi tự nhiên.**  
> *"Vì sao toán dùng nhiều notation mà không thống nhất một?"*  
> Mỗi notation tiện trong một ngữ cảnh:  
> - `f'(x)` rất gọn khi đạo hàm chỉ một biến — viết trên giấy nhanh.  
> - `dy/dx` cực mạnh khi áp **chain rule** (Lesson 04): `dy/dx = (dy/du)(du/dx)` "nhìn" như nhân phân số (mặc dù *về mặt hình thức* không phải phân số).  
> - `d/dx[…]` rõ khi muốn nói "lấy đạo hàm của biểu thức này" mà không cần đặt tên hàm.  
> - `ẏ` chỉ giữ trong vật lý cổ điển vì biến độc lập gần như luôn là `t`.  
> Cả 4 sẽ xuất hiện đan xen trong tài liệu ML. Quen với việc đọc cả 4.

> ⚠ **Lỗi thường gặp.**  
> `dy/dx` **trông** như một phân số nhưng *theo định nghĩa hình thức* nó là một giới hạn, không phải phân số `dy ÷ dx`. May mắn là trong nhiều trường hợp (đặc biệt chain rule, đổi biến tích phân) bạn *có thể* xử lý nó như phân số và vẫn ra kết quả đúng — đó là một trong những phép màu của giải tích. Nhưng nhớ: bản chất là giới hạn.

---

## 6. Đạo hàm vài hàm cơ bản — chứng minh từ định nghĩa

Mục này dài và quan trọng. Mỗi công thức ta đều **chứng minh từng bước**, không "dễ thấy".

### 6.1 `(c)' = 0` — đạo hàm của hằng số

Cho `f(x) = c` (hằng số).

```
f'(x) = lim   [f(x+h) − f(x)] / h
       h → 0
       
      = lim   [c − c] / h
       h → 0
       
      = lim   0 / h
       h → 0
       
      = lim   0
       h → 0
       
      = 0
```

**Trực giác**: hàm hằng có đồ thị là đường nằm ngang, slope ở mọi điểm = 0. Hợp lý.

**Verify ví dụ**:
- `f(x) = 7`, `f'(x) = 0`.
- `f(x) = −π`, `f'(x) = 0`.
- `f(x) = e`, `f'(x) = 0`.
- `f(x) = 1000000`, `f'(x) = 0`.

### 6.2 `(x)' = 1` — đạo hàm của identity

Cho `f(x) = x`.

```
f'(x) = lim   [(x + h) − x] / h
       h → 0
       
      = lim   h / h
       h → 0
       
      = lim   1
       h → 0
       
      = 1
```

**Trực giác**: đồ thị `y = x` là đường thẳng slope 1, nên đạo hàm = 1 mọi nơi.

### 6.3 `(x²)' = 2x`

Đã chứng minh ở 4.6. Tóm lại:

```
(x+h)² − x² = 2xh + h²
[(x+h)² − x²] / h = 2x + h
lim h→0 (2x + h) = 2x
```

**Verify** bằng số:
- `x = 1`: slope ≈ `[(1.001)² − 1²]/0.001 = (1.002001 − 1)/0.001 = 2.001` ≈ 2.
- `x = 3`: slope ≈ `[(3.001)² − 9]/0.001 = (9.006001 − 9)/0.001 = 6.001` ≈ 6.
- `x = −2`: slope ≈ `[(−1.999)² − 4]/0.001 = (3.996001 − 4)/0.001 = −3.999` ≈ −4 = 2·(−2) ✓.
- `x = 0`: slope ≈ `[(0.001)² − 0]/0.001 = 0.001` ≈ 0 = 2·0 ✓.

### 6.4 `(x³)' = 3x²`

```
f(x+h) − f(x) = (x+h)³ − x³ = 3x²h + 3xh² + h³            (nhị thức Newton)
[f(x+h) − f(x)] / h = 3x² + 3xh + h²
lim h→0 (3x² + 3xh + h²) = 3x²
```

**Verify**:
- `x = 1`: `f'(1) = 3`. Số: `(1.001³ − 1)/0.001 ≈ 3.003001` ≈ 3 ✓.
- `x = 2`: `f'(2) = 12`. Khớp với 4.3.
- `x = −1`: `f'(−1) = 3`. Số: `((−0.999)³ − (−1))/0.001 = (−0.997002999 + 1)/0.001 ≈ 2.997` ≈ 3 ✓.
- `x = 0.5`: `f'(0.5) = 3·0.25 = 0.75`. Số: `((0.501)³ − 0.125)/0.001 ≈ 0.7515` ≈ 0.75 ✓.

### 6.5 `(xⁿ)' = n·x^(n−1)` cho n nguyên dương — chứng minh tổng quát bằng nhị thức Newton

Cho `f(x) = xⁿ`, `n ∈ ℕ⁺`.

**Nhị thức Newton**:

```
(x + h)ⁿ = xⁿ + C(n,1)·x^(n−1)·h + C(n,2)·x^(n−2)·h² + … + hⁿ
        = xⁿ + n·x^(n−1)·h + [C(n,2)·x^(n−2) + C(n,3)·x^(n−3)·h + …]·h²
```

Trong đó `C(n, k) = n! / [k!(n−k)!]` là tổ hợp. Đặc biệt `C(n, 1) = n`.

Trừ `xⁿ` và chia cho `h`:

```
[(x + h)ⁿ − xⁿ] / h = n·x^(n−1) + [C(n,2)·x^(n−2) + C(n,3)·x^(n−3)·h + …]·h
```

Cho `h → 0`: mọi số hạng chứa `h` đều biến mất. Còn lại:

```
f'(x) = n·x^(n−1)
```

**∎**

**Verify** với 4 trường hợp:
- `n = 1`: `(x¹)' = 1·x⁰ = 1`. Khớp 6.2 ✓.
- `n = 2`: `(x²)' = 2·x¹ = 2x`. Khớp 6.3 ✓.
- `n = 3`: `(x³)' = 3·x²`. Khớp 6.4 ✓.
- `n = 5`: `(x⁵)' = 5·x⁴`. Số tại `x = 2`: `f'(2) = 5·16 = 80`. Kiểm tra: `(2.001⁵ − 32)/0.001`. `2.001⁵ ≈ 32 + 80·0.001 + … = 32.08010…`. `(32.0801 − 32)/0.001 = 80.1` ≈ 80 ✓.

> ⚠ **Lỗi thường gặp.**  
> Công thức `(xⁿ)' = n·x^(n−1)` **vẫn đúng** cho `n` âm, n hữu tỷ, n thực bất kỳ — nhưng chứng minh khác (cần định nghĩa `xⁿ` qua `eⁿ ln x` rồi dùng chain rule). Chứng minh ở 6.5 *chỉ* hợp lệ cho `n` nguyên dương. Sẽ mở rộng ở Lesson 03.

### 6.6 `(sin x)' = cos x`

Dùng **công thức cộng**: `sin(x + h) = sin x cos h + cos x sin h`.

```
sin(x+h) − sin x = sin x cos h + cos x sin h − sin x
                = sin x (cos h − 1) + cos x sin h
```

Chia cho `h`:

```
[sin(x+h) − sin x] / h = sin x · (cos h − 1)/h  +  cos x · (sin h)/h
```

Cho `h → 0`, dùng **2 giới hạn đặc biệt** từ Lesson 01:

- `lim h→0 (sin h)/h = 1`
- `lim h→0 (cos h − 1)/h = 0`

(Giới hạn thứ 2 có thể chứng minh nhanh: `(cos h − 1)/h = (cos h − 1)(cos h + 1) / [h(cos h + 1)] = (cos² h − 1) / [h(cos h + 1)] = −sin² h / [h(cos h + 1)] = −sin h · [(sin h)/h] · 1/(cos h + 1)`. Cho h → 0: `0 · 1 · 1/2 = 0`.)

Kết quả:

```
(sin x)' = sin x · 0 + cos x · 1 = cos x
```

**∎**

**Verify**:
- `x = 0`: `(sin x)' = cos 0 = 1`. Slope của `sin x` tại 0 là 1.
- `x = π/2`: `(sin x)' = cos(π/2) = 0`. Tại đỉnh sóng sin, slope = 0 ✓.
- `x = π`: `(sin x)' = cos π = −1`. Sóng sin đang đi xuống ✓.
- `x = π/4`: `(sin x)' = cos(π/4) = √2/2 ≈ 0.707`.

### 6.7 `(cos x)' = −sin x`

Tương tự, dùng `cos(x + h) = cos x cos h − sin x sin h`:

```
cos(x+h) − cos x = cos x (cos h − 1) − sin x sin h
[cos(x+h) − cos x] / h = cos x · (cos h − 1)/h − sin x · (sin h)/h
```

`h → 0`:

```
(cos x)' = cos x · 0 − sin x · 1 = −sin x
```

**∎**

**Verify**:
- `x = 0`: `−sin 0 = 0`. Đỉnh sóng cos, slope = 0 ✓.
- `x = π/2`: `−sin(π/2) = −1`. Sóng cos đang đi xuống nhanh nhất ✓.
- `x = π`: `−sin π = 0`. Đáy sóng cos ✓.
- `x = π/4`: `−sin(π/4) = −√2/2 ≈ −0.707`.

> ❓ **Câu hỏi tự nhiên.**  
> *"Tại sao `(sin x)' = cos x` mà `(cos x)' = −sin x` lại có dấu trừ?"*  
> Vẽ 2 sóng `sin` và `cos` lên cùng đồ thị. Bạn sẽ thấy `cos` đi trước `sin` 90°. Lấy đạo hàm (= slope) của `sin` cho ra `cos` — slope dương ở phần đi lên, âm ở phần đi xuống, đúng như sóng `cos`. Còn lấy slope của `cos` cho ra đường ngược dấu của `sin`. Có thể nhớ qua chu kỳ: `sin → cos → −sin → −cos → sin → …` (mỗi lần lấy đạo hàm "tiến" 90° trong "vòng tròn lượng giác đạo hàm").

### 6.8 `(eˣ)' = eˣ`

Đây là **tính chất cốt lõi của số e** — và là lý do hàm mũ tự nhiên xuất hiện khắp ML/AI.

Định nghĩa `e` qua giới hạn (từ Lesson 01):

```
e = lim (n → ∞) (1 + 1/n)ⁿ                       (đầu)
  = lim (h → 0) (1 + h)^(1/h)                    (tương đương)
```

Hoặc, tương đương:

```
lim (h → 0) (eʰ − 1)/h = 1
```

(Đây là **giới hạn đặc biệt thứ 2** từ Lesson 01. Ta dùng làm điểm xuất phát.)

Tính `(eˣ)'`:

```
[e^(x+h) − eˣ] / h = eˣ · (eʰ − 1)/h
```

Cho `h → 0`:

```
(eˣ)' = eˣ · 1 = eˣ
```

**∎**

> 💡 **Tại sao đặc biệt?**  
> `eˣ` là **hàm duy nhất** (sai khác một hằng số nhân) bằng chính đạo hàm của nó. Đặc tính này khiến `eˣ` xuất hiện ở mọi nơi có "tốc độ thay đổi tỷ lệ với giá trị hiện tại" — phân rã phóng xạ, lãi kép liên tục, mô hình tăng dân số, *sigmoid trong neural net*…

**Verify**:
- `x = 0`: `(eˣ)' = e⁰ = 1`. Số: `(e^0.001 − 1)/0.001 ≈ 1.0005` ≈ 1 ✓.
- `x = 1`: `(eˣ)' = e ≈ 2.718`. Số: `(e^1.001 − e)/0.001 ≈ 2.7196` ≈ 2.718 ✓.
- `x = 2`: `(eˣ)' = e² ≈ 7.389`. 
- `x = −1`: `(eˣ)' = e⁻¹ ≈ 0.368`.

### 6.9 `(ln x)' = 1/x`

`ln x` là **hàm ngược** của `eˣ`: nếu `y = ln x` thì `eʸ = x`.

Dùng định nghĩa:

```
(ln x)' = lim (h → 0) [ln(x+h) − ln x] / h
        = lim (h → 0) ln((x+h)/x) / h
        = lim (h → 0) ln(1 + h/x) / h
```

Đặt `u = h/x` (vậy `h = u·x`, và `h → 0 ⇔ u → 0`):

```
        = lim (u → 0) ln(1 + u) / (u·x)
        = (1/x) · lim (u → 0) ln(1 + u) / u
```

Giới hạn còn lại = 1 (giới hạn đặc biệt của ln, suy ra từ `lim (eʰ − 1)/h = 1`; xem Lesson 01).

```
(ln x)' = 1/x
```

**∎**

**Verify**:
- `x = 1`: `(ln x)' = 1`. Số: `(ln 1.001 − 0)/0.001 ≈ 0.9995` ≈ 1 ✓.
- `x = 2`: `(ln x)' = 0.5`. Số: `(ln 2.001 − ln 2)/0.001 ≈ 0.49975` ≈ 0.5 ✓.
- `x = e ≈ 2.718`: `(ln x)' = 1/e ≈ 0.368`.
- `x = 10`: `(ln x)' = 0.1`.

> ⚠ **Lỗi thường gặp.**  
> `ln x` chỉ xác định với `x > 0`, nên `(ln x)' = 1/x` cũng chỉ xét trên miền `x > 0`. Cho `ln|x|` thì `(ln|x|)' = 1/x` đúng cho mọi `x ≠ 0` (sẽ chứng minh ở Lesson 03 bằng chain rule).

---

## 7. Bảng đạo hàm 10 hàm sơ cấp

| # | `f(x)` | `f'(x)` | 4 verify số |
|---|--------|---------|-------------|
| 1 | `c` (hằng) | `0` | `f=5→f'=0`; `f=−2→f'=0`; `f=π→f'=0`; `f=0→f'=0` |
| 2 | `x` | `1` | mọi x ✓ |
| 3 | `xⁿ` (n nguyên ≥ 1) | `n·x^(n−1)` | n=2,x=3→6; n=3,x=2→12; n=4,x=1→4; n=5,x=−1→5 |
| 4 | `x^α` (α thực) | `α·x^(α−1)` | α=½,x=4→1/4; α=−1,x=2→−1/4; α=−2,x=1→−2; α=3.5,x=1→3.5 |
| 5 | `√x = x^½` | `1/(2√x)` | x=1→0.5; x=4→0.25; x=9→1/6≈0.167; x=16→0.125 |
| 6 | `1/x = x⁻¹` | `−1/x²` | x=1→−1; x=2→−0.25; x=−1→−1; x=0.5→−4 |
| 7 | `sin x` | `cos x` | x=0→1; x=π/2→0; x=π→−1; x=π/4→√2/2 |
| 8 | `cos x` | `−sin x` | x=0→0; x=π/2→−1; x=π→0; x=π/4→−√2/2 |
| 9 | `eˣ` | `eˣ` | x=0→1; x=1→e≈2.718; x=2→e²≈7.389; x=−1→1/e≈0.368 |
| 10 | `ln x` (x>0) | `1/x` | x=1→1; x=2→0.5; x=e→1/e; x=10→0.1 |

> 📌 **Cách nhớ**: hai dạng chính — *lũy thừa* (`xⁿ`, hạ bậc nhân hệ số) và *lượng giác / mũ* (`sin↔cos↔−sin↔−cos↔sin`, `eˣ` bất biến, `ln x` chuyển sang `1/x`). 8 trong 10 dòng đã có ở 6.1 → 6.9, riêng dòng 4 (`x^α` cho α thực) và dòng 5 (`√x`) sẽ được chứng minh chặt ở Lesson 03 sau khi có quy tắc chain rule.

> 🔁 **Dừng lại tự kiểm tra.**  
> Không nhìn bảng. Trả lời:  
> a) `(x⁷)'` = ?  
> b) `(1/x)'` tại `x = 3` = ?  
> c) `(sin x)'` tại `x = π` = ?  
> d) `(eˣ + ln x)'` tại `x = 1` = ? (gợi ý: đạo hàm tổng = tổng đạo hàm — sẽ chứng minh chính thức ở Lesson 03, nhưng tin trước được)  
> <details><summary>Đáp án</summary>
>
> a) `7x⁶`  
> b) `−1/9`  
> c) `cos π = −1`  
> d) `e¹ + 1/1 = e + 1 ≈ 3.718`  
> </details>

---

## 8. Khi nào đạo hàm KHÔNG tồn tại?

> ❓ **Câu hỏi tự nhiên của người đọc**: *"Nếu f là hàm số bình thường thì luôn có đạo hàm ở mọi điểm hả?"*  
> **KHÔNG.** Có 3 trường hợp phổ biến đạo hàm tại một điểm *không tồn tại*. Đây là kiến thức quan trọng vì nó liên quan đến vấn đề thực trong ML (ReLU không khả vi tại 0).

### 8.1 Góc nhọn (corner / kink)

**Ví dụ kinh điển**: `f(x) = |x|` tại `x = 0`.

- Slope cát tuyến phía phải (h > 0): `(|0+h| − 0)/h = h/h = 1` → giới hạn = **1**.
- Slope cát tuyến phía trái (h < 0): `(|0+h| − 0)/h = −h/h = −1` → giới hạn = **−1**.

Hai giới hạn 1 phía khác nhau ⇒ giới hạn 2 phía **không tồn tại** ⇒ `f'(0)` không tồn tại.

**Nhìn đồ thị**: tại `x = 0`, hàm `|x|` có "góc V" — không có một đường thẳng *duy nhất* tiếp xúc hàm tại điểm đó. Phía trái có thể vẽ tiếp tuyến slope −1, phía phải slope +1, và bất kỳ slope nào giữa chúng đều "chạm" đúng 1 điểm — nhưng không có cái duy nhất.

> 💡 **Ứng dụng ML**: hàm **ReLU** `f(x) = max(0, x)` cũng là "góc nhọn" tại `x = 0` (giống `|x|` nhưng cắt phía trái về 0). Trong neural net, người ta **gán giá trị quy ước** `ReLU'(0) = 0` (hoặc 1) để gradient descent vẫn chạy được — đây là một *subgradient*.

### 8.2 Tiếp tuyến đứng (vertical tangent / cusp)

**Ví dụ**: `f(x) = x^(1/3)` (căn bậc 3 của x) tại `x = 0`.

Dùng định nghĩa: `[f(0+h) − f(0)] / h = h^(1/3) / h = h^(1/3 − 1) = h^(−2/3) = 1 / h^(2/3)`.

Khi `h → 0`, `h^(2/3) → 0⁺` (luôn dương), nên `1/h^(2/3) → +∞`. Giới hạn là **vô cực**, không phải số thực ⇒ `f'(0)` không tồn tại (theo định nghĩa giới hạn hữu hạn).

**Nhìn đồ thị**: tại `x = 0`, đồ thị `y = x^(1/3)` "dựng đứng" — tiếp tuyến là đường thẳng đứng (slope vô cực). Người ta nói "đạo hàm vô cực" hoặc "tiếp tuyến đứng".

### 8.3 Gián đoạn (discontinuity)

Một **định lý nền tảng**: nếu f không liên tục tại `a`, thì f không khả vi tại `a`.

**Chứng minh ngắn**: nếu f gián đoạn tại `a`, tức `lim (x→a) f(x) ≠ f(a)` (hoặc giới hạn không tồn tại). Khi đó `lim (h→0) [f(a+h) − f(a)]` không bằng 0, nên `[f(a+h) − f(a)]/h` không hội tụ (chia 0 cho 0 thành số ≠ 0/0 thì → ∞). ∎

**Ví dụ**: hàm bậc thang `f(x) = ⌊x⌋` (floor) — gián đoạn tại mọi số nguyên. `f'` không tồn tại tại x = 0, 1, 2, … (nhưng tồn tại = 0 ở mọi nơi khác).

> ⚠ **Mối quan hệ "khả vi → liên tục" là MỘT CHIỀU**:  
> - Khả vi tại a ⟹ liên tục tại a.  
> - Liên tục tại a ⇏ khả vi tại a (ví dụ `|x|` tại 0).

> 🔁 **Dừng lại tự kiểm tra.**  
> a) Hàm `f(x) = |x − 3|` có khả vi tại `x = 3` không?  
> b) Hàm `f(x) = x · sin(1/x)` (với `f(0) = 0`) có liên tục tại 0 không? Khả vi tại 0 không?  
> <details><summary>Đáp án</summary>
>
> a) Không. Góc nhọn tại `x = 3`.  
> b) Liên tục vì `−|x| ≤ x sin(1/x) ≤ |x|` → kẹp về 0 (Squeeze). Không khả vi vì `[f(h) − 0]/h = sin(1/h)` dao động ±1 vô hạn khi `h → 0`, không có giới hạn.
> </details>

---

## 9. Higher-order derivatives — đạo hàm cấp cao

### 9.1 Định nghĩa

Nếu `f'` là một hàm khả vi nữa, ta lấy đạo hàm tiếp được:

```
f''(x) = (f')'(x)         ← đạo hàm cấp 2 (second derivative)
f'''(x) = (f'')'(x)        ← cấp 3
f^(n)(x)                   ← cấp n
```

Notation Leibniz: `d²y/dx²`, `d³y/dx³`, …

### 9.2 Ví dụ tính

`f(x) = x⁴`:
- `f'(x) = 4x³`
- `f''(x) = 12x²`
- `f'''(x) = 24x`
- `f^(4)(x) = 24`
- `f^(5)(x) = 0` (rồi cứ bằng 0 mãi)

`f(x) = sin x`:
- `f'(x) = cos x`
- `f''(x) = −sin x`
- `f'''(x) = −cos x`
- `f^(4)(x) = sin x` ← chu kỳ 4!
- `f^(5)(x) = cos x` (lặp)

`f(x) = eˣ`:
- `f^(n)(x) = eˣ` với mọi n. Bất biến qua đạo hàm vô số lần.

### 9.3 Ý nghĩa vật lý

Cho `s(t)` = vị trí theo thời gian:

| Đạo hàm | Tên gọi | Đơn vị |
|---------|---------|--------|
| `s(t)` | Vị trí | m |
| `s'(t)` | Vận tốc (velocity) | m/s |
| `s''(t)` | Gia tốc (acceleration) | m/s² |
| `s'''(t)` | Jerk (giật) | m/s³ |
| `s^(4)(t)` | Snap | m/s⁴ |

**Ví dụ rơi tự do**: `s(t) = ½ g t²` (g = 9.8 m/s²).
- `s'(t) = g·t` — vận tốc tăng tuyến tính theo thời gian.
- `s''(t) = g` — gia tốc hằng (định luật Newton + lực hấp dẫn).
- `s'''(t) = 0` — không có jerk (lực hấp dẫn không đổi).

### 9.4 Ý nghĩa hình học — convexity (độ lồi)

`f''(x) > 0` trên một khoảng ⟹ f **lồi xuống** (convex) trên khoảng đó — như cái bát hứng nước.  
`f''(x) < 0` ⟹ f **lồi lên** (concave) — như mái vòm.  
`f''(x) = 0` ⟹ điểm uốn (inflection) khả nghi — phải kiểm thêm.

**Ví dụ**: `f(x) = x²`, `f''(x) = 2 > 0` luôn → parabol lồi xuống (bát).  
`f(x) = −x²`, `f''(x) = −2 < 0` luôn → parabol úp ngược (vòm).  
`f(x) = x³`, `f''(x) = 6x`: lồi xuống khi `x > 0`, lồi lên khi `x < 0`, điểm uốn tại 0.

### 9.5 Ý nghĩa trong optimization

Tại điểm cực trị nghi ngờ (chỗ `f'(x) = 0`):
- `f''(x) > 0` ⟹ cực **tiểu** (điểm thấp nhất, đáy bát).
- `f''(x) < 0` ⟹ cực **đại** (đỉnh).
- `f''(x) = 0` ⟹ test không kết luận được; phải dùng đạo hàm cấp cao hơn hoặc khảo sát đồ thị.

Sẽ học chi tiết ở **Lesson 05 — Cực trị 1 biến**.

### 9.6 Ý nghĩa trong ML — Hessian

Khi `f` là hàm nhiều biến (vd `loss(w₁, w₂, …, wₙ)`), "đạo hàm cấp 2" trở thành **ma trận Hessian** — ma trận các đạo hàm riêng cấp 2 chéo nhau. Hessian xuất hiện trong:

- **Newton's method** — phương pháp tối ưu bậc 2 (dùng cả gradient lẫn Hessian, hội tụ nhanh hơn gradient descent thuần nhưng đắt).
- **Phân tích saddle point** — Hessian indefinite ⟹ điểm yên ngựa, không phải min cũng không phải max.
- **Phân tích curvature** của loss landscape — vì sao một số nơi flat, một số nơi steep.

Sẽ học sâu ở Linear Algebra (Tầng 4) và Calculus 2 nâng cao.

> 📌 **Tóm tắt mục 9.**  
> - `f''(x)` đo "đạo hàm của đạo hàm" — tốc độ thay đổi của tốc độ thay đổi.  
> - Vật lý: vị trí → vận tốc → gia tốc → jerk.  
> - Hình học: dấu của `f''` cho biết hàm lồi/lõm.  
> - Optimization: test cấp 2 phân biệt cực đại / cực tiểu.  
> - ML nhiều biến: Hessian thay cho `f''`.

---

## 10. Liên hệ với ML / AI — vì sao toàn bộ bài này quan trọng

### 10.1 Gradient = vector các đạo hàm riêng

Trong ML, hầu hết các hàm bạn quan tâm có **nhiều biến**:

```
loss(w₁, w₂, …, wₙ)              ← loss phụ thuộc n trọng số
```

**Gradient** của loss là *vector* các đạo hàm riêng:

```
∇loss = ( ∂loss/∂w₁ ,  ∂loss/∂w₂ ,  … ,  ∂loss/∂wₙ )
```

Mỗi `∂loss/∂wᵢ` chính là đạo hàm 1 biến của loss khi *giữ cố định* các biến khác — về mặt kỹ thuật vẫn là đạo hàm 1 biến của bài này, chỉ thêm "giữ cố định". Vì vậy **mọi kiến thức của bài Lesson 02 áp dụng nguyên xi cho mỗi thành phần của gradient**. Sẽ học chính thức ở [Lesson 06 — Đạo hàm riêng + gradient](../lesson-06-partial-gradient/).

### 10.2 Gradient descent

Thuật toán train tất cả mạng neural — gồm 1 dòng update:

```
w_new = w_old − η · ∇loss(w_old)
```

(η = learning rate). Ý nghĩa: *"đi ngược hướng gradient để giảm loss"*. Mỗi bước cần tính `∇loss` — tức cần tính các đạo hàm.

### 10.3 Backpropagation = chain rule áp lặp lại

Mạng neural sâu = composition của nhiều hàm: `loss(f_L(f_{L−1}(…f_1(x))))`. Lấy đạo hàm của composition cần **chain rule** — học ở [Lesson 04](../lesson-04-chain-rule/). Backprop chỉ là chain rule chạy ngược từ output về input.

### 10.4 Vì sao `eˣ` và `ln x` xuất hiện khắp ML

- **Sigmoid** `σ(x) = 1/(1 + e⁻ˣ)` — hàm kích hoạt cổ điển. Đạo hàm gọn gàng nhờ tính chất `(eˣ)' = eˣ`.
- **Softmax** xuất phát từ `eˣ`.
- **Cross-entropy loss** chứa `log(p)` — và `(ln x)' = 1/x` làm đạo hàm gọn.
- **Negative log-likelihood**, **KL divergence**, ... tất cả dựa trên ln.

Tóm lại: nắm vững 10 dòng trong bảng ở mục 7 → bạn đã có 90% công cụ đạo hàm cho ML.

> 📌 **Tóm tắt mục 10.**  
> - Bài này cho công cụ tính `f'(x)` cho 10 hàm cơ bản — đủ cho ML.  
> - Trong nhiều biến, gradient = vector đạo hàm riêng → mỗi thành phần là một đạo hàm 1 biến.  
> - Gradient descent dùng `∇loss` để update weight; backprop = chain rule lặp.  
> - `eˣ` và `ln x` xuất hiện khắp activation/loss vì đạo hàm của chúng gọn.

---

## 11. Bài tập

Làm thử trước khi xem lời giải. Tất cả đều có lời giải chi tiết ở mục 12.

**Bài 1.** Dùng định nghĩa giới hạn, chứng minh `(2x + 5)' = 2`.

**Bài 2.** Dùng định nghĩa, tính `f'(a)` cho `f(x) = 1/x²` tại `a = 1` và `a = 2`.

**Bài 3.** Tính `f'(x)` cho:
- a) `f(x) = x⁷`
- b) `f(x) = 1/x³`
- c) `f(x) = x^(2/5)` (chấp nhận công thức `(xⁿ)' = n·x^(n−1)` cho n thực)
- d) `f(x) = √x`
- e) `f(x) = e^x − ln x`

**Bài 4.** Vẽ tay đồ thị `f(x) = x³` trên `[−2, 2]`. Trên cùng đồ thị, vẽ đồ thị `f'(x) = 3x²`. Quan sát: tại đâu f tăng nhanh nhất? f' đạt min ở đâu? Liên hệ điểm uốn của f với cực trị của f'.

**Bài 5.** Cho `f(x) = |x − 2|`. Hỏi:
- a) f có liên tục tại x = 2 không?
- b) f có khả vi tại x = 2 không? Chứng minh.
- c) f có khả vi tại x = 5 không? Nếu có, `f'(5) = ?`

**Bài 6.** Một vật rơi tự do, vị trí theo thời gian là `s(t) = 5t² + 2t` (mét, giây).
- a) Tính `s'(t)` (vận tốc) và `s''(t)` (gia tốc).
- b) Vận tốc tại `t = 3` giây bằng bao nhiêu?
- c) Gia tốc có phụ thuộc thời gian không?
- d) Sau bao lâu vật đạt vận tốc 100 m/s?

---

## 12. Lời giải chi tiết

### Lời giải Bài 1

`f(x) = 2x + 5`.

```
f'(x) = lim (h → 0) [f(x+h) − f(x)] / h
      = lim (h → 0) [2(x+h) + 5 − (2x + 5)] / h
      = lim (h → 0) [2x + 2h + 5 − 2x − 5] / h
      = lim (h → 0) 2h / h
      = lim (h → 0) 2
      = 2
```

∎ `f'(x) = 2` với mọi x.

**Verify trực giác**: `y = 2x + 5` là đường thẳng slope 2, đạo hàm = 2 là hợp lý.

### Lời giải Bài 2

`f(x) = 1/x²`.

**Tại `a = 1`**:

```
f'(1) = lim (h → 0) [1/(1+h)² − 1] / h
```

Quy đồng tử: `1/(1+h)² − 1 = [1 − (1+h)²] / (1+h)² = [1 − 1 − 2h − h²] / (1+h)² = −(2h + h²) / (1+h)²`.

```
[f(1+h) − f(1)] / h = −(2h + h²) / [h·(1+h)²]
                    = −(2 + h) / (1+h)²
```

`h → 0`:

```
f'(1) = −2 / 1 = −2
```

**Tại `a = 2`** (cùng phương pháp):

```
f(2+h) − f(2) = 1/(2+h)² − 1/4
            = [4 − (2+h)²] / [4(2+h)²]
            = [4 − 4 − 4h − h²] / [4(2+h)²]
            = −(4h + h²) / [4(2+h)²]

[f(2+h) − f(2)] / h = −(4 + h) / [4(2+h)²]
                    
h → 0:
f'(2) = −4 / (4·4) = −4/16 = −1/4
```

**Verify công thức tổng quát**: `(1/x²)' = (x⁻²)' = −2·x⁻³ = −2/x³`. Kiểm: `f'(1) = −2/1 = −2 ✓`, `f'(2) = −2/8 = −1/4 ✓`.

### Lời giải Bài 3

- **a)** `f(x) = x⁷` → `f'(x) = 7x⁶`.
- **b)** `f(x) = 1/x³ = x⁻³` → `f'(x) = −3·x⁻⁴ = −3/x⁴`.
- **c)** `f(x) = x^(2/5)` → `f'(x) = (2/5)·x^(2/5 − 1) = (2/5)·x^(−3/5) = 2 / (5·x^(3/5))`.
- **d)** `f(x) = √x = x^(1/2)` → `f'(x) = (1/2)·x^(−1/2) = 1/(2√x)`.
- **e)** `f(x) = eˣ − ln x` → đạo hàm tổng = tổng đạo hàm (sẽ chứng minh ở Lesson 03, tin trước): `f'(x) = eˣ − 1/x`.

**Verify bằng số cho (b)**: tại `x = 2`, `f'(2) = −3/16 = −0.1875`. Số: `(1/(2.001)³ − 1/8)/0.001 ≈ (0.124813 − 0.125)/0.001 ≈ −0.187` ≈ −0.1875 ✓.

### Lời giải Bài 4

Đồ thị `f(x) = x³` trên `[−2, 2]`:
- Đi qua (0, 0), (1, 1), (−1, −1), (2, 8), (−2, −8).
- Lồi lên ở `x < 0`, lồi xuống ở `x > 0`. Điểm uốn tại `x = 0`.
- Tăng đơn điệu (strictly increasing).

Đồ thị `f'(x) = 3x²`:
- Parabol lồi xuống, đỉnh tại (0, 0).
- Giá trị tại `±2` là 12, tại `±1` là 3, tại `0` là 0.
- Luôn ≥ 0.

**Quan sát ghép 2 đồ thị**:
- `f` tăng *nhanh nhất* ở 2 đầu (x = ±2) — phù hợp với `f'` cực đại ở 2 đầu (`f'(±2) = 12`).
- `f'` đạt min tại `x = 0` (`f'(0) = 0`) — phù hợp với đường tiếp tuyến của `x³` tại 0 là *nằm ngang*. Tại điểm này `f` "tạm dừng dốc lên" mặc dù vẫn tăng (do `f'` không đổi dấu — đây là điểm uốn, không phải cực trị).
- **Điểm uốn của `f` ↔ cực trị của `f'`**: tại `x = 0`, `f''(0) = 0` và `f'` đạt cực tiểu địa phương. Đây là quan hệ tổng quát: điểm uốn của f ↔ chỗ `f'` chuyển hướng (cực trị địa phương của `f'`).

### Lời giải Bài 5

`f(x) = |x − 2|`.

**a) Liên tục tại x = 2?**  
`lim (x → 2⁺) |x − 2| = 0`. `lim (x → 2⁻) |x − 2| = 0`. `f(2) = 0`. Cả 3 bằng nhau ⟹ **liên tục**.

**b) Khả vi tại x = 2?**  
Slope cát tuyến:
- `h > 0`: `[|2 + h − 2| − 0]/h = h/h = 1`.
- `h < 0`: `[|2 + h − 2| − 0]/h = −h/h = −1`.

Giới hạn 1 phía: phải = 1, trái = −1, không bằng nhau ⟹ giới hạn 2 phía **không tồn tại** ⟹ **không khả vi**.

**c) Khả vi tại x = 5?**  
Tại `x = 5`, `f(x) = |x − 2| = x − 2` (vì x = 5 > 2, nên `|x − 2| = x − 2` trên một lân cận của 5). Đây là hàm tuyến tính slope 1.

`f'(5) = 1`. **Khả vi**.

### Lời giải Bài 6

`s(t) = 5t² + 2t`.

**a)** Dùng `(t²)' = 2t` và `(c·t)' = c` (sẽ chứng minh formally ở Lesson 03, tin trước):
- `s'(t) = 10t + 2` (m/s).
- `s''(t) = 10` (m/s²).

Hoặc dùng định nghĩa cho `s'`:
```
s(t+h) − s(t) = 5(t+h)² + 2(t+h) − 5t² − 2t
            = 5(t² + 2th + h²) + 2t + 2h − 5t² − 2t
            = 10th + 5h² + 2h

[s(t+h) − s(t)] / h = 10t + 5h + 2

h → 0: s'(t) = 10t + 2  ✓
```

**b)** `s'(3) = 10·3 + 2 = 32` m/s.

**c)** `s''(t) = 10` — **không phụ thuộc t**. Gia tốc hằng (giống vật rơi tự do).

**d)** Giải `s'(t) = 100`: `10t + 2 = 100` ⟹ `t = 9.8` giây.

---

## 13. Tóm tắt cả bài

> 📝 **Take-aways cốt lõi.**
>
> 1. **Đạo hàm = tốc độ thay đổi tức thời** = slope tiếp tuyến tại 1 điểm.
> 2. **Định nghĩa hình thức**: `f'(a) = lim (h→0) [f(a+h) − f(a)] / h`. Hiểu được dòng này, hiểu toàn bộ giải tích.
> 3. **Cát tuyến → tiếp tuyến**: cát tuyến cắt 2 điểm, tiếp tuyến *là giới hạn* của cát tuyến khi 2 điểm trùng nhau.
> 4. **10 đạo hàm cơ bản** phải thuộc: hằng, x, xⁿ, √x, 1/x, sin x, cos x, eˣ, ln x, (và x^α). Mỗi cái đều có chứng minh từ định nghĩa.
> 5. **3 trường hợp đạo hàm không tồn tại**: góc nhọn (như `|x|`), tiếp tuyến đứng (như `x^(1/3)` tại 0), gián đoạn.
> 6. **Đạo hàm cấp cao** `f''`, `f'''` đo gia tốc, độ lồi, curvature. Trong nhiều biến trở thành Hessian.
> 7. **Liên hệ ML**: gradient = vector các đạo hàm riêng (mỗi cái là đạo hàm 1 biến — kiến thức bài này). Gradient descent dùng `∇loss`. Backprop = chain rule lặp.
> 8. **Notation** `f'`, `dy/dx`, `df/dx`, `d/dx[…]` — quen thuộc cả 4.
>
> Bước tiếp theo: **Lesson 03 — Quy tắc đạo hàm** sẽ cho công cụ tính nhanh (sum, product, quotient rule + bảng đạo hàm sơ cấp tổng quát) để không phải dùng định nghĩa giới hạn mỗi lần.

---

## 14. Liên kết

- **Bài trước**: [Lesson 01 — Giới hạn](../lesson-01-limits/) — định nghĩa "tiến gần", giới hạn 0/0, 2 giới hạn đặc biệt dùng trong 6.6 và 6.8.
- **Bài sau**: [Lesson 03 — Quy tắc đạo hàm](../lesson-03-derivative-rules/) — sum, product, quotient rule; bảng đạo hàm sơ cấp.
- **Tiền đề**: [Algebra Lesson 06 — Hàm bậc 1 và bậc 2](../../Algebra/lesson-06-linear-quadratic/) (slope đường thẳng), [Trigonometry](../../Trigonometry/) (sin, cos, công thức cộng).
- **Sẽ gặp lại**: [Lesson 04 — Chain rule](../lesson-04-chain-rule/), [Lesson 05 — Cực trị 1 biến](../lesson-05-optimization-1d/), [Lesson 06 — Gradient](../lesson-06-partial-gradient/), [Lesson 07 — Gradient descent](../lesson-07-gradient-descent/).
- **Visualization**: [visualization.html](./visualization.html) — 4 playground tương tác.
