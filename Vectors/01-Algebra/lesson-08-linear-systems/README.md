# Lesson 08 — Hệ phương trình tuyến tính

> Tầng 1 · Algebra · Lesson 08 (bài cuối tầng)

## Mục tiêu học tập

Sau bài này, bạn sẽ:

- Hiểu **hệ phương trình tuyến tính** là gì và biểu diễn được nó dưới 3 dạng: phương trình, bảng số (ma trận mở rộng), hình học.
- Nắm 3 cách giải cơ bản cho hệ nhỏ: **phương pháp thế**, **phương pháp cộng đại số**, **khử Gauss**.
- Phân loại được hệ ra 3 trường hợp: **một nghiệm duy nhất / vô số nghiệm / vô nghiệm** — và nhận ra trường hợp đó cả về hình học lẫn về dạng ma trận sau khi khử.
- Biết ý tưởng **định thức (determinant)** cho hệ 2 ẩn và công thức Cramer (đủ để dùng nhanh, không đi sâu — sẽ học kỹ ở Tầng 4 Linear Algebra).
- Liên hệ được hệ phương trình tuyến tính với bài toán $Ax = b$ và biết tại sao **linear regression closed-form** thực chất là giải một hệ phương trình tuyến tính khổng lồ.
- Cài đặt được **Gauss elimination with partial pivoting** bằng Go.

## Kiến thức tiền đề

- [Lesson 03 — Phương trình bậc 1](../lesson-03-linear-equations/) — vì hệ phương trình tuyến tính chính là tập hợp nhiều phương trình bậc 1 phải đồng thời đúng.
- [Lesson 06 — Hàm bậc 1 và bậc 2](../lesson-06-linear-quadratic/) — vì đồ thị mỗi phương trình $ax + by = c$ chính là một đường thẳng, và giao điểm = nghiệm.

---

## 1. Hệ phương trình tuyến tính là gì?

### 1.1 Trực giác trước — "danh sách điều kiện cùng phải đúng"

Hãy hình dung bạn đang đi tìm hai con số bí ẩn $x$ và $y$. Ai đó cho bạn 2 manh mối:

- Manh mối 1: "Tổng hai số bằng $10$."
- Manh mối 2: "Hiệu hai số bằng $4$."

Mỗi manh mối **một mình** không xác định được hai số (vô số cặp có tổng $10$: $(1, 9), (2, 8), (3, 7), \ldots$). Nhưng khi bạn yêu cầu **cả hai cùng đúng**, chỉ còn đúng một cặp: $(7, 3)$.

Đó chính xác là **hệ phương trình tuyến tính**:

$$\begin{cases} x + y = 10 \\ x - y = 4 \end{cases}$$

**Hệ = danh sách điều kiện cùng phải đúng (constraints).** Nghiệm = bộ giá trị thỏa mọi điều kiện cùng lúc. Nếu mâu thuẫn → vô nghiệm. Nếu các điều kiện trùng lặp (không độc lập) → vô số nghiệm.

> **💡 Trực giác**: Một phương trình = một dòng/mặt phẳng "cắt" không gian. Hệ = giao của nhiều dòng/mặt phẳng. Hỏi "nghiệm ở đâu?" = hỏi "giao điểm nằm chỗ nào?".

### 1.2 Định nghĩa hình thức

Một **phương trình tuyến tính** (linear equation) với các ẩn $x, y, z, \ldots$ là phương trình có dạng:

$$a_1 \cdot x + a_2 \cdot y + a_3 \cdot z + \ldots = b$$

trong đó $a_1, a_2, \ldots$ và $b$ là các hằng số. "Tuyến tính" nghĩa là **mỗi ẩn chỉ xuất hiện với lũy thừa 1, không có $x^2$, không có $xy$, không có $\sin(x)$**.

Một **hệ phương trình tuyến tính** (system of linear equations) là tập **nhiều** phương trình như vậy phải **đồng thời đúng**. Nghiệm của hệ là bộ giá trị $(x, y, z, \ldots)$ sao cho khi thay vào thì **mọi** phương trình đều thỏa.

### 1.3 Năm ví dụ hệ với context đời thường

**Ví dụ A — Mua bán (2 ẩn).** Bạn vào quán cà phê: 2 ly espresso + 1 ly latte hết `90k`; 1 ly espresso + 2 ly latte hết `105k`. Gọi $e$ = giá espresso, $l$ = giá latte:

$$\begin{cases} 2e + 1l = 90 \\ 1e + 2l = 105 \end{cases}$$

Nghiệm $(e, l) = (25, 40)$ — espresso `25k`, latte `40k`.

**Ví dụ B — Pha trộn dung dịch (2 ẩn).** Cần pha 100 ml dung dịch nồng độ 30% từ 2 chai có sẵn: chai A nồng độ 20%, chai B nồng độ 50%. Gọi $a, b$ là số ml lấy từ mỗi chai:

$$\begin{cases} a + b = 100 & (\text{tổng thể tích}) \\ 0.2a + 0.5b = 30 & (\text{tổng chất tan}) \end{cases}$$

Nghiệm: $(a, b) = (200/3, 100/3) \approx (66.7, 33.3)$ ml.

**Ví dụ C — Tuổi tác (2 ẩn).** Bố hơn con $30$ tuổi. Năm năm nữa, tuổi bố sẽ gấp 3 tuổi con. Gọi $f, s$ là tuổi bố/con hiện tại:

$$\begin{cases} f - s = 30 \\ f + 5 = 3 \cdot (s + 5) \quad \to \quad f - 3s = 10 \end{cases}$$

Nghiệm: $f = 40, s = 10$.

**Ví dụ D — Cân bằng phản ứng (3 ẩn).** Bài toán "đếm nguyên tử" trong phản ứng hóa học cho ra một hệ tuyến tính. Ví dụ cân bằng $a\text{H}_2 + b\text{O}_2 \to c\text{H}_2\text{O}$:

$$\begin{cases} 2a = 2c & (\text{H}) \\ 2b = c & (\text{O}) \end{cases}$$

Hệ có **vô số nghiệm** (tỉ lệ): $(a, b, c) = (2, 1, 2)$ là nghiệm nguyên nhỏ nhất.

**Ví dụ E — Phân bổ ngân sách (3 ẩn).** Một startup có $100$ triệu chia cho marketing, sản phẩm, lương. Marketing gấp đôi sản phẩm. Lương gấp 4 lần marketing.

$$\begin{cases} m + p + s = 100 \\ m - 2p = 0 \\ s - 4m = 0 \end{cases}$$

Nghiệm: $(m, p, s) = (200/11, 100/11, 800/11) \approx (18.2, 9.1, 72.7)$ triệu.

> **🔁 Dừng lại tự kiểm tra**: Trong cả 5 ví dụ trên, mỗi câu chữ tiếng Việt được dịch thành **một phương trình** (một dòng ràng buộc). Khi nhìn một bài toán đời thường, kỹ năng quan trọng là **đặt biến và viết ra hệ** — phần "giải" chỉ là máy móc sau đó.

### 1.4 Quy trình "đặt biến → viết hệ" (template chung)

Một mẹo nhỏ để **không bao giờ nhầm** khi gặp bài toán bằng lời:

1. **Đếm số "đại lượng chưa biết"** trong đề → đó là số ẩn. Đặt tên ($x, y$, hoặc $e, l$ cho dễ nhớ).
2. **Mỗi câu mô tả ràng buộc số học = 1 phương trình**. Đọc lại đề, mỗi câu kiểu "tổng/hiệu/gấp X lần/cộng lại bằng..." → ra 1 phương trình.
3. **Kiểm tra: số phương trình ≈ số ẩn?** Nếu thiếu phương trình → bài thiếu dữ kiện. Nếu thừa → có lẽ phương trình thừa chỉ để kiểm tra (hoặc đề có lỗi).
4. Sau khi có hệ — quên đề đi, **giải thuần đại số**.

Áp dụng cho Ví dụ A (cà phê):
- "Espresso" và "Latte" là 2 đại lượng chưa biết → 2 ẩn: $e, l$.
- Câu 1: "2 espresso + 1 latte = 90k" → $2e + l = 90$.
- Câu 2: "1 espresso + 2 latte = 105k" → $e + 2l = 105$.
- 2 phương trình, 2 ẩn — đầy đủ. Giải.

Áp dụng cho Ví dụ C (tuổi):
- 2 đại lượng: tuổi bố $f$, tuổi con $s$.
- Câu 1: "bố hơn con 30 tuổi" → $f - s = 30$.
- Câu 2: "5 năm nữa, tuổi bố gấp 3 tuổi con" → $f + 5 = 3(s + 5)$. Khai triển: $f - 3s = 10$.
- 2 phương trình, 2 ẩn.

> **💡 Trực giác**: bài toán bằng lời 90% khó ở chỗ **dịch câu thành phương trình**, không phải ở chỗ giải. Khi đã có hệ, ta vào "chế độ máy móc": áp dụng thế / cộng / Gauss → ra số.

### Ví dụ 2 ẩn

$$\begin{cases} 2x + 3y = 12 \\ x - y = 1 \end{cases}$$

Bộ $(x, y) = (3, 2)$ thử lại:
- $2 \cdot 3 + 3 \cdot 2 = 6 + 6 = 12$ ✓
- $3 - 2 = 1$ ✓

Vậy $(3, 2)$ là một nghiệm. Mục tiêu của bài này: **học cách tìm nghiệm đó một cách có hệ thống**, không đoán.

### Ví dụ 3 ẩn

$$\begin{cases} x + y + z = 6 \\ 2x - y + 3z = 14 \\ 3x + 2y - z = 4 \end{cases}$$

Sẽ giải ở Mục 6 bằng khử Gauss; nghiệm là $(x, y, z) = (1, 2, 3)$.

### Lưu ý ký hiệu

Ta thường viết dạng tổng quát cho hệ $m$ phương trình $n$ ẩn:

$$\begin{cases} a_{11} x_1 + a_{12} x_2 + \ldots + a_{1n} x_n = b_1 \\ a_{21} x_1 + a_{22} x_2 + \ldots + a_{2n} x_n = b_2 \\ \vdots \\ a_{m1} x_1 + a_{m2} x_2 + \ldots + a_{mn} x_n = b_m \end{cases}$$

Bảng các hệ số $a_{ij}$ gọi là **ma trận hệ số** (coefficient matrix) $A$, cột $b$ là **vế phải**. Đặt $x = (x_1, \ldots, x_n)^{\mathsf{T}}$ thì hệ tương đương với:

$$Ax = b$$

— phương trình quen thuộc bậc nhất trong đại số tuyến tính. Tầng 4 sẽ học rất kỹ. Ở bài này ta chỉ dùng cách viết bảng số để khử Gauss cho gọn.

---

## 2. Ý nghĩa hình học (2 ẩn)

Mỗi phương trình tuyến tính 2 ẩn $ax + by = c$ (với $(a, b) \neq (0, 0)$) là phương trình một **đường thẳng** trên mặt phẳng $Oxy$. Nghiệm của hệ 2 phương trình = **giao** của 2 đường thẳng.

Ba trường hợp:

### (a) Một nghiệm duy nhất — 2 đường cắt nhau tại 1 điểm

$$\begin{cases} 2x + 3y = 12 & (\text{đường thẳng } L_1) \\ x - y = 1 & (\text{đường thẳng } L_2) \end{cases}$$

Hai đường có **hệ số góc khác nhau** ($L_1$: hệ số góc $-2/3$, $L_2$: hệ số góc $1$). Chúng cắt nhau tại đúng 1 điểm — chính là $(3, 2)$.

**ASCII grid** (trục y dọc, trục x ngang, mỗi ô = 1 đơn vị):

```
       y
       ↑
     5 │ L₁
     4 │  ●               (0,4) thuộc L₁
     3 │   ╲
     2 │    ╲   ●         giao điểm (3,2)
     1 │     ╲ ╱  L₂
     0 ┼──────╳──●─────→ x  (6,0) thuộc L₁
    −1 │   L₂╱ ╲          (1,0) thuộc L₂
    −2 │    ╱   ╲
       └──┼──┼──┼──┼──┼──┼──
          1  2  3  4  5  6
```

- $L_1: 2x + 3y = 12$ (dốc xuống, hệ số góc $-2/3$) đi qua $(6, 0)$ và $(0, 4)$.
- $L_2: x - y = 1$ (dốc lên, hệ số góc $+1$) đi qua $(1, 0)$ và $(0, -1)$.
- Vì 2 hệ số góc khác nhau ($-2/3 \neq +1$), 2 đường **chắc chắn** cắt nhau ở đúng 1 chỗ.
- Hai đường cắt nhau tại `●` = $(3, 2)$ — đây chính là nghiệm.

**Kiểm tra trực giác bằng tọa độ**:
- Tại $(3, 2)$: $L_1$ cho $2 \cdot 3 + 3 \cdot 2 = 12$ ✓; $L_2$ cho $3 - 2 = 1$ ✓ → điểm này nằm trên **cả hai** đường.
- Tại $(0, 4)$ (chỉ trên $L_1$): $L_2$ cho $0 - 4 = -4 \neq 1$ → không nằm trên $L_2$.

### (b) Vô số nghiệm — 2 đường trùng nhau

$$\begin{cases} 2x + 3y = 6 \\ 4x + 6y = 12 \end{cases}$$

Phương trình thứ hai chỉ là phương trình thứ nhất **nhân 2** ở cả hai vế. Cùng tập điểm. Mọi $(x, y)$ thỏa $2x + 3y = 6$ đều là nghiệm — vô số.

**ASCII grid** (chỉ vẽ được 1 đường vì 2 đường đè khít lên nhau):

```
       y
       ↑
     3 │
     2 │ ●  ←── (0, 2) thuộc CẢ L₁ lẫn L₂
     1 │  ╲╲   ●  ←── (1.5, 1) cũng thuộc cả 2
     0 ┼───╲╲──●──→ x  ← (3, 0) thuộc cả L₁ và L₂
    −1 │    ╲╲
    −2 │     ╲╲
       └──┼──┼──┼──┼──┼──
          1  2  3  4  5
```

Mọi điểm trên đường này (như $(3, 0), (0, 2), (1.5, 1), (-3, 4), \ldots$) đều là nghiệm. Có vô số.

**Cách nhận ra "trùng nhau" mà không cần vẽ**: tỉ số $2/4 = 3/6 = 6/12 = 1/2$ — **cả ba tỉ số đều bằng nhau**. Nghĩa là phương trình (2) chính là phương trình (1) nhân với cùng một hằng số (ở đây là 2). Hai phương trình mang **cùng một thông tin**, chỉ "viết lại bằng giọng khác".

### (c) Vô nghiệm — 2 đường song song không trùng

$$\begin{cases} 2x + 3y = 6 \\ 4x + 6y = 10 \end{cases}$$

Vế trái thứ hai bằng $2 \times$ vế trái thứ nhất, nhưng vế phải thì $10 \neq 2 \cdot 6 = 12$. Hai đường thẳng có **cùng hướng** (song song) nhưng **không trùng** → không có giao điểm.

**ASCII grid**:

```
       y
       ↑
     3 │
   5/3 │      ●  ←── L₂ qua (0, 5/3) ≈ (0, 1.67)
     2 │ ●╲    ╲       ← L₁ qua (0, 2)
     1 │  ╲╲    ╲╲
     0 ┼───╲╲────╲●──→ x  ← L₂ qua (2.5, 0); L₁ qua (3, 0)
    −1 │    ╲╲    ╲
    −2 │     ╲╲    ╲
       └──┼──┼──┼──┼──┼──┼──
          1  2  3  4  5  6
```

Hai đường **cùng hệ số góc $-2/3$** (vì tỉ số $2/4 = 3/6 = 1/2$) nhưng cắt trục $Ox$ ở 2 điểm khác nhau ($x = 3$ cho $L_1$, $x = 2.5$ cho $L_2$) — luôn cách nhau, không bao giờ gặp.

**Cách nhận ra "song song" mà không cần vẽ**: tỉ số vế trái $2/4 = 3/6 = 1/2$, nhưng tỉ số vế phải $6/10 = 3/5 \neq 1/2$. Hai phương trình mâu thuẫn: phương trình (1) nói "tổng $2x + 3y$ bằng 6", trong khi phương trình (2) — sau khi chia 2 — nói "cùng tổng đó bằng 5". Không thể vừa bằng 6 vừa bằng 5.

> **🔁 Dừng lại tự kiểm tra**: Cả 3 trường hợp trên có thể nhận biết **không cần vẽ** — chỉ qua tỉ số hệ số (bảng dưới). Hình học là "trực giác kiểm chứng", đại số là "công cụ vận hành".

### Tóm tắt phân loại 2 ẩn

| Tỉ số hệ số | Vế phải | Hình học | Số nghiệm |
|---|---|---|---|
| $a_1/a_2 \neq b_1/b_2$ | bất kỳ | 2 đường cắt | **1 nghiệm** |
| $a_1/a_2 = b_1/b_2 = c_1/c_2$ | tỉ số bằng | 2 đường trùng | **vô số** |
| $a_1/a_2 = b_1/b_2 \neq c_1/c_2$ | tỉ số khác | 2 đường song song | **vô nghiệm** |

> **Câu hỏi tự nhiên**: "Vậy hệ 2 ẩn có khi nào có đúng 2 nghiệm không?" — **Không**. Hai đường thẳng trong mặt phẳng chỉ có 3 khả năng: cắt 1 điểm / trùng / song song. Đây là đặc trưng của tuyến tính: số nghiệm luôn là 0, 1, hoặc vô số.

---

## 3. Ý nghĩa hình học (3 ẩn)

Mỗi phương trình $ax + by + cz = d$ (với $(a, b, c) \neq (0, 0, 0)$) là một **mặt phẳng** trong không gian 3D. Hệ 3 phương trình = giao của 3 mặt phẳng.

Các trường hợp:

- **Giao là 1 điểm** → 1 nghiệm. (3 mặt phẳng "đâm vào nhau" tại 1 chỗ — giống 3 tờ giấy đặt nghiêng cắt nhau.)
- **Giao là 1 đường thẳng** → vô số nghiệm (1 tham số tự do).
- **Giao là 1 mặt phẳng** → vô số nghiệm (cả 3 phương trình thực ra là cùng một mặt).
- **Không có giao chung** → vô nghiệm. Có thể 2 mặt song song, hoặc 3 mặt cắt nhau thành "lăng trụ" — đôi một cắt nhưng không có điểm chung của cả 3.

Trực giác: tăng số ẩn thì **không gian nghiệm** càng phong phú. Với $n$ ẩn ta đang giao các **siêu phẳng** trong $n$ chiều — không thể vẽ nhưng đại số vẫn xử được. Khử Gauss ở Mục 6 hoạt động cho **mọi** $n$, không cần tưởng tượng hình.

---

## 4. Phương pháp thế (substitution)

**Ý tưởng**: tách 1 ẩn ra theo các ẩn khác từ 1 phương trình, rồi thay (substitute) vào các phương trình còn lại. Mỗi lần thay làm giảm 1 ẩn → cuối cùng còn 1 ẩn, giải xong rồi thế ngược lên.

### Ví dụ: giải hệ 2 ẩn ở Mục 1

$$\begin{cases} (1) \quad 2x + 3y = 12 \\ (2) \quad x - y = 1 \end{cases}$$

**Bước 1**: Từ (2), tách $x = y + 1$. (Chọn (2) vì hệ số $x$ ở đó là $1$, ít chia.)

**Bước 2**: Thay $x = y + 1$ vào (1):

$$\begin{aligned} 2 \cdot (y + 1) + 3y &= 12 \\ 2y + 2 + 3y &= 12 \\ 5y &= 10 \\ y &= 2 \end{aligned}$$

**Bước 3**: Thay ngược $y = 2$ vào $x = y + 1$:

$$x = 2 + 1 = 3$$

**Kết luận**: $(x, y) = (3, 2)$.

**Kiểm tra**: $2 \cdot 3 + 3 \cdot 2 = 12$ ✓, $3 - 2 = 1$ ✓.

### Ví dụ 2: hệ có phân số

$$\begin{cases} (1) \quad 2x + 5y = 4 \\ (2) \quad 3x - 2y = 25 \end{cases}$$

**Bước 1**: Từ (1), tách $2x = 4 - 5y$ → $x = \frac{4 - 5y}{2} = 2 - 2.5y$.

(Vì hệ số $x$ trong (1) là $2$, không có hệ số $1$, nên chia ra phải chấp nhận phân số.)

**Bước 2**: Thay vào (2):

$$\begin{aligned} 3 \cdot (2 - 2.5y) - 2y &= 25 \\ 6 - 7.5y - 2y &= 25 \\ -9.5y &= 19 \\ y &= \frac{19}{-9.5} = -2 \end{aligned}$$

**Bước 3**: Thay ngược $y = -2$ vào $x = 2 - 2.5 \cdot (-2) = 2 + 5 = 7$.

**Kết luận**: $(x, y) = (7, -2)$.

**Kiểm tra**: $2 \cdot 7 + 5 \cdot (-2) = 14 - 10 = 4$ ✓; $3 \cdot 7 - 2 \cdot (-2) = 21 + 4 = 25$ ✓.

> **Mẹo**: gặp phân số trong bước thế — đừng hoảng. Cứ giữ phân số ($2 - 2.5y$), thay vào tiếp, cuối cùng $y$ thường ra số đẹp vì hệ đã được "thiết kế" cho ra nghiệm hữu hạn.

### Ví dụ 3: hệ 3 ẩn

$$\begin{cases} (1) \quad x + y + z = 6 \\ (2) \quad 2x - y + z = 3 \\ (3) \quad x + 2y - z = 2 \end{cases}$$

**Bước 1**: Từ (1), tách $z = 6 - x - y$. (Chọn (1) vì hệ số $z$ là $1$.)

**Bước 2**: Thay $z = 6 - x - y$ vào (2) và (3):

$$\begin{aligned} (2'): \quad 2x - y + (6 - x - y) &= 3 \\ x - 2y + 6 &= 3 \\ x - 2y &= -3 \\[6pt] (3'): \quad x + 2y - (6 - x - y) &= 2 \\ x + 2y - 6 + x + y &= 2 \\ 2x + 3y - 6 &= 2 \\ 2x + 3y &= 8 \end{aligned}$$

Giờ hệ 2 ẩn:

$$\begin{cases} x - 2y = -3 \\ 2x + 3y = 8 \end{cases}$$

**Bước 3**: Tiếp tục thế. Từ (2'): $x = 2y - 3$. Thay vào (3'):

$$\begin{aligned} 2 \cdot (2y - 3) + 3y &= 8 \\ 4y - 6 + 3y &= 8 \\ 7y &= 14 \\ y &= 2 \end{aligned}$$

**Bước 4**: Thay ngược:
- $x = 2 \cdot 2 - 3 = 1$.
- $z = 6 - 1 - 2 = 3$.

**Kết luận**: $(x, y, z) = (1, 2, 3)$.

**Kiểm tra**: $1+2+3=6$ ✓; $2-2+3=3$ ✓; $1+4-3=2$ ✓.

> **Quan sát**: phương pháp thế cho 3 ẩn = lặp 2 lần (giảm $z$, rồi giảm $x$). Mỗi lần giảm 1 ẩn → cuối cùng 1 phương trình 1 ẩn. Với $n$ ẩn cần $n-1$ lần thế. Đây chính là **ý tưởng đằng sau khử Gauss**, chỉ khác là Gauss làm trên bảng số không cần viết chữ.

### Khi nào dùng phương pháp thế?

- Khi có 1 phương trình mà 1 ẩn đã sẵn dạng "đơn giản" (hệ số $1$ hoặc $-1$).
- Khi số ẩn nhỏ (2 ẩn rất tiện). Với 3+ ẩn dễ rối → chuyển qua khử Gauss.

> **⚠ Lỗi thường gặp khi dùng phương pháp thế**:
> - **Thế nhầm vào chính phương trình vừa tách**. Sau khi tách $x = y + 1$ từ (2), nếu thay lại vào (2) sẽ ra $0 = 0$ vô ích. Luôn thế vào **các phương trình còn lại**.
> - **Quên dấu ngoặc khi thế biểu thức nhiều hạng tử**. Vd thế $x = 2 - 3y$ vào $5x - y$, viết $5 \cdot 2 - 3y - y$ là sai — phải viết $5 \cdot (2 - 3y) - y = 10 - 15y - y$.
> - **Tách biến rồi quên thay ngược**. Tìm được $y = 2$ rồi dừng — nhưng phải thay vào để tính $x$.

### 📝 Tóm tắt Mục 4

| Bước | Việc làm |
|---|---|
| 1 | Tách 1 ẩn từ 1 phương trình (chọn hệ số $\pm 1$ nếu có để tránh phân số). |
| 2 | Thay biểu thức đó vào các phương trình còn lại → giảm 1 ẩn. |
| 3 | Lặp lại cho đến khi còn 1 ẩn → giải. |
| 4 | Thế ngược lên để tính các ẩn đã tách. |
| 5 | Kiểm tra bằng cách thay nghiệm vào hệ gốc. |

---

## 5. Phương pháp cộng đại số (elimination)

### 5.1 Trực giác

**Ý tưởng cốt lõi**: nếu hai phương trình **có cùng độ "đóng góp"** của một ẩn (cùng hệ số), thì khi **trừ chúng cho nhau**, ẩn đó tự triệt tiêu. Ví dụ:

$$\begin{cases} 3x + 2y = 13 \\ 3x - 5y = -8 \end{cases}$$

Cả hai đều có $3x$. Trừ phương trình dưới khỏi phương trình trên: $(3x - 3x) + (2y - (-5y)) = 13 - (-8)$ → $7y = 21$ → $y = 3$. **Ẩn $x$ biến mất** không cần tính.

Còn khi hệ số không bằng nhau? **Nhân** một (hoặc cả hai) phương trình với hằng số sao cho $|\text{hệ số của 1 ẩn}|$ trùng nhau, rồi mới cộng/trừ.

> **💡 Trực giác bằng analogy**: hãy tưởng tượng mỗi phương trình là 1 cái cân. Nhân cả 2 vế của 1 cân với cùng hệ số → cân vẫn cân bằng. Cộng 2 cân vào nhau → tổng vẫn cân bằng. Vậy ta tự do "chế biến" các cân để tạo ra một cân mới mà 1 vật đã bị "trừ sạch" — đó là khử ẩn.

### 5.2 Ví dụ:

$$\begin{cases} (1) \quad 2x + 3y = 12 \\ (2) \quad x - y = 1 \end{cases}$$

**Bước 1**: Để khử $x$, ta nhân (2) với 2:

$$(2') \quad 2x - 2y = 2$$

**Bước 2**: Trừ (2') khỏi (1) (tức $(1) - (2')$):

$$\begin{aligned} (2x + 3y) - (2x - 2y) &= 12 - 2 \\ 5y &= 10 \\ y &= 2 \end{aligned}$$

**Bước 3**: Thay $y = 2$ vào (2): $x - 2 = 1 \to x = 3$.

**Kết luận**: $(x, y) = (3, 2)$.

### Mẹo chọn hệ số nhân

Để khử ẩn $x$ có hệ số $a_1$ và $a_2$ ở 2 phương trình: nhân (1) với $a_2$, nhân (2) với $a_1$ → cả hai phương trình đều có hệ số $x$ là $a_1 \cdot a_2$, rồi trừ. (Hoặc nhân với $-a_1$ để cộng cho gọn.)

Phương pháp cộng là **anh em sinh đôi** của khử Gauss: thực chất khử Gauss = lặp lại "phép cộng có hệ số" một cách có hệ thống.

### 5.3 Ví dụ thứ 2 — cần nhân cả 2 phương trình

$$\begin{cases} (1) \quad 3x + 4y = 26 \\ (2) \quad 5x - 2y = 4 \end{cases}$$

**Mục tiêu**: khử $y$. Hệ số $y$ là $4$ (ở (1)) và $-2$ (ở (2)). Bội chung nhỏ nhất của $|4|, |2|$ là $4$.

**Bước 1**: nhân (2) với 2 để $|y|$ trùng:

$$\begin{cases} (1) \quad 3x + 4y = 26 \\ (2') \quad 10x - 4y = 8 \end{cases}$$

**Bước 2**: cộng (1) + (2') để khử $y$ (dấu ngược nhau nên cộng triệt tiêu):

$$\begin{aligned} (3x + 4y) + (10x - 4y) &= 26 + 8 \\ 13x &= 34 \\ x &= \frac{34}{13} \end{aligned}$$

Hmm, không đẹp. Nhưng đây vẫn là cơ chế đúng — không phải hệ nào cũng có nghiệm nguyên. Thay vào (1):

$$\begin{aligned} 3 \cdot \frac{34}{13} + 4y &= 26 \\ \frac{102}{13} + 4y &= \frac{338}{13} \\ 4y &= \frac{236}{13} \\ y &= \frac{59}{13} \end{aligned}$$

**Kiểm tra (2)**: $5 \cdot \frac{34}{13} - 2 \cdot \frac{59}{13} = \frac{170 - 118}{13} = \frac{52}{13} = 4$ ✓.

**Quan sát**: trong thực hành, **chế đề ngược từ nghiệm ra** giúp tránh phân số. Ví dụ muốn nghiệm $(2, 1)$, đặt 2 phương trình tùy ý đi qua điểm này: $3 \cdot 2 + 4 \cdot 1 = 10$ và $5 \cdot 2 - 2 \cdot 1 = 8$ → hệ $3x + 4y = 10; \ 5x - 2y = 8$ chắc chắn có nghiệm $(2, 1)$.

### 5.4 Ví dụ thứ 3 — khử ẩn rồi quay vòng

$$\begin{cases} (1) \quad 4x + 3y = 25 \\ (2) \quad 2x - 5y = -9 \end{cases}$$

**Bước 1** — khử $x$. Nhân (2) với 2: $(2') \ 4x - 10y = -18$.

**Bước 2** — trừ: $(1) - (2')$:

$$\begin{aligned} (4x + 3y) - (4x - 10y) &= 25 - (-18) \\ 13y &= 43 \end{aligned}$$

Sai — kiểm tra lại: $25 - (-18) = 25 + 18 = 43$. Và $3y - (-10y) = 13y$. Đúng.

Vậy $y = 43/13$. Lại không đẹp. Hãy chế đề lại để nghiệm đẹp: muốn $(x, y) = (4, 3)$, đặt:

$$\begin{cases} (1) \quad 4x + 3y = 4 \cdot 4 + 3 \cdot 3 = 25 & \checkmark \ (\text{đúng đề gốc}) \\ (2) \quad 2x - 5y = 2 \cdot 4 - 5 \cdot 3 = -7 & (\text{không phải} -9) \end{cases}$$

Sửa lại đề:

$$\begin{cases} (1) \quad 4x + 3y = 25 \\ (2) \quad 2x - 5y = -7 \end{cases}$$

Khử $x$: nhân (2) với 2 → $4x - 10y = -14$. Trừ $(1) - (2')$: $13y = 39 \to y = 3$. Thay vào (1): $4x + 9 = 25 \to x = 4$.

**Nghiệm**: $(4, 3)$. ✓

> **⚠ Lỗi thường gặp khi dùng phương pháp cộng**:
> - **Quên đổi dấu khi trừ phương trình**. $(3y) - (-10y) = 13y$, không phải $-7y$ — phải nhớ dấu trừ "lan vào" cả số hạng.
> - **Nhân nhầm hệ số**: chỉ nhân **một bên** của phương trình. Phải nhân cả 2 vế. Ví dụ nhân (2) với 2 thì cả $2x \to 4x$ và $-5y \to -10y$ **và** vế phải $-7 \to -14$.
> - **Cộng dấu nhầm**: khi 2 hệ số trái dấu (vd $+4y$ và $-4y$), ta **cộng** để triệt; khi cùng dấu ($+4y$ và $+4y$), ta **trừ** để triệt. Đừng máy móc "luôn trừ".

### 5.5 📝 Tóm tắt Mục 5

| Bước | Việc làm |
|---|---|
| 1 | Chọn ẩn cần khử (thường chọn ẩn có hệ số nhỏ để nhân ít). |
| 2 | Tìm bội chung nhỏ nhất của 2 hệ số → nhân từng phương trình để có cùng $\lvert\text{hệ số}\rvert$. |
| 3 | Cộng (nếu dấu ngược) hoặc trừ (nếu cùng dấu) → ẩn đó triệt tiêu. |
| 4 | Phương trình mới chỉ có 1 ẩn → giải. |
| 5 | Thay vào 1 phương trình gốc → tìm ẩn còn lại. |
| 6 | Kiểm tra cả 2 phương trình gốc. |

---

### 5.6 ❓ Câu hỏi tự nhiên về số phương trình vs số ẩn

Trước khi đi vào khử Gauss, hãy dừng lại trả lời 3 câu hỏi mà người mới luôn hỏi:

### "Sao phải có cùng số phương trình với số ẩn?"

**Không bắt buộc**. Bạn có thể có 5 phương trình 2 ẩn, hoặc 2 phương trình 5 ẩn — vẫn là hệ tuyến tính hợp lệ. Cái "lý tưởng" là **số phương trình độc lập = số ẩn**, vì khi đó hệ thường có **đúng 1 nghiệm**.

- **$m = n$ và độc lập**: 1 nghiệm duy nhất. Đây là "hệ vuông đẹp".
- **$m < n$ (ít phương trình hơn ẩn)**: thiếu ràng buộc → thường **vô số nghiệm**. Một ẩn "tự do".
- **$m > n$ (nhiều phương trình hơn ẩn)**: thừa ràng buộc → thường **vô nghiệm** (các ràng buộc khó cùng thỏa hết).

Trực giác: mỗi phương trình **giới hạn 1 chiều tự do** của không gian nghiệm. 2 ẩn = 2 chiều tự do, cần 2 phương trình độc lập để "khóa" về 1 điểm. Thiếu phương trình → còn chiều tự do (vô số nghiệm). Thừa phương trình → ràng buộc dư có thể không tương thích.

### "Nếu phương trình ít hơn ẩn — luôn vô số nghiệm hay có khi vô nghiệm?"

**Có thể cả hai**. Ví dụ:

- $x + y + z = 6$ (1 phương trình, 3 ẩn) → vô số nghiệm. Bộ $(1, 2, 3), (0, 0, 6), (-1, 4, 3), \ldots$ đều thỏa.
- $x + y = 5; \ 2x + 2y = 11$ (2 phương trình, 2 ẩn — nhưng phương trình (2) sau khi chia 2 mâu thuẫn (1)) → vô nghiệm.

Quy tắc: nếu **không có hàng mâu thuẫn** $[0 \ \ldots \ 0 \mid k \neq 0]$ sau khử → vô số nghiệm. Có hàng đó → vô nghiệm.

### "Khi 3 phương trình 2 ẩn — bao giờ có nghiệm?"

**Chỉ khi cả 3 đường thẳng cùng đi qua đúng 1 điểm chung**. Trường hợp này hiếm — đa số 3 đường thẳng không đồng quy.

Ví dụ có nghiệm:

$$\begin{cases} x + y = 5 \\ x - y = 1 \\ 2x = 6 \end{cases}$$

Cả 3 đều thỏa $(3, 2)$. Phương trình (3) thực ra là $(1) + (2)$, nên không thêm thông tin (rank vẫn là 2).

Ví dụ vô nghiệm:

$$\begin{cases} x + y = 5 \\ x - y = 1 \\ x + y = 6 \quad (\text{mâu thuẫn (1)}) \end{cases}$$

Khử Gauss sẽ ra hàng $[0 \ 0 \mid 1]$ → vô nghiệm.

> **💡 Trực giác**: hệ overdetermined ($m > n$) trong thực tế (vd linear regression với hàng nghìn điểm dữ liệu, chỉ vài tham số) **gần như chắc chắn vô nghiệm "chính xác"**. Ta không tìm nghiệm chính xác mà tìm nghiệm **gần đúng nhất** theo nghĩa bình phương tối tiểu — Mục 9 sẽ giải thích.

---

## 6. Khử Gauss (Gaussian elimination)

Đây là phương pháp **tổng quát** giải mọi hệ tuyến tính, làm việc trực tiếp trên bảng số mà không cần viết ẩn $x, y, z, \ldots$. Là **tiền thân** của mọi thuật toán đại số tuyến tính sau này.

### 6.1 Ma trận mở rộng (augmented matrix)

Cho hệ:

$$\begin{cases} 2x + 3y = 12 \\ x - y = 1 \end{cases}$$

Ta viết gọn lại thành **bảng số** (ma trận mở rộng), giữ nguyên thứ tự ẩn, mỗi hàng = 1 phương trình:

$$\left[\begin{array}{cc|c} 2 & 3 & 12 \\ 1 & -1 & 1 \end{array}\right]$$

Cột bên trái dấu $\mid$ là hệ số các ẩn (ma trận $A$), cột bên phải là vế phải (vector $b$).

### 6.2 Ba phép biến đổi sơ cấp trên hàng (elementary row operations)

Ba phép sau **không làm thay đổi tập nghiệm**:

1. **Đổi chỗ 2 hàng**. (Đổi thứ tự 2 phương trình → tập nghiệm không đổi.)
2. **Nhân 1 hàng với hằng số $k \neq 0$**. (Nhân cả 2 vế của 1 phương trình với $k$ → vẫn tương đương.)
3. **Cộng vào 1 hàng một bội số của hàng khác**. (Thay $R_i \leftarrow R_i + k \cdot R_j$ — đây là tổ hợp tuyến tính, không mất thông tin.)

> Ký hiệu sẽ dùng: $R_2 \leftarrow R_2 - \frac{1}{2} \cdot R_1$ đọc là "thay hàng 2 bằng hàng 2 trừ một nửa hàng 1".

### 6.3 Mục tiêu: dạng tam giác trên (row echelon form)

Ta muốn dùng 3 phép trên để biến ma trận hệ số $A$ thành **dạng tam giác trên** — tức tất cả các phần tử dưới đường chéo chính đều $= 0$:

$$\left[\begin{array}{ccc|c} * & * & * & * \\ 0 & * & * & * \\ 0 & 0 & * & * \end{array}\right]$$

Khi đó phương trình cuối chỉ còn 1 ẩn → giải được; thế ngược lên phương trình kế cuối có 2 ẩn (1 đã biết) → giải được; v.v. Đây gọi là **back-substitution** (thế ngược).

### 6.4 Ví dụ chi tiết — hệ 2 ẩn

$$\left[\begin{array}{cc|c} 2 & 3 & 12 \\ 1 & -1 & 1 \end{array}\right]$$

**Bước 1**: Khử phần tử $1$ ở vị trí (2,1) — tức làm cho hàng 2 cột 1 thành $0$. Phép: $R_2 \leftarrow R_2 - \frac{1}{2} \cdot R_1$.

$$\begin{aligned} \text{hàng 2 cũ:} \quad & [\ 1, \ -1 \mid 1\ ] \\ \tfrac{1}{2} \times \text{hàng 1:} \quad & [\ 1, \ 3/2 \mid 6\ ] \\ \text{hàng 2 mới:} \quad & [\ 0, \ -5/2 \mid -5\ ] \end{aligned}$$

Ma trận:

$$\left[\begin{array}{cc|c} 2 & 3 & 12 \\ 0 & -5/2 & -5 \end{array}\right]$$

**Bước 2** — back-substitution: phương trình hàng 2 là $-\frac{5}{2} \cdot y = -5$ → $y = 2$. Phương trình hàng 1 là $2x + 3y = 12$ → $2x + 6 = 12$ → $x = 3$.

**Kết luận**: $(3, 2)$. Trùng với 2 phương pháp trên.

### 6.5 Ví dụ chi tiết — hệ 3 ẩn

Đây là phần khó nhất bài. Đọc thật chậm, mỗi bước hiểu rõ "ta đang làm gì và vì sao".

**Hệ cần giải**:

$$\begin{cases} x + y + z = 6 \\ 2x - y + 3z = 14 \\ 3x + 2y - z = 4 \end{cases}$$

**Ma trận mở rộng** — viết gọn 3 phương trình thành bảng số. Mỗi hàng = 1 phương trình; cột bên trái dấu $\mid$ là hệ số (theo thứ tự $x, y, z$), cột bên phải là vế phải.

$$\left[\begin{array}{ccc|c} 1 & 1 & 1 & 6 \\ 2 & -1 & 3 & 14 \\ 3 & 2 & -1 & 4 \end{array}\right] \quad \begin{array}{l} R_1 \leftarrow \text{phương trình (1)} \\ R_2 \leftarrow \text{phương trình (2)} \\ R_3 \leftarrow \text{phương trình (3)} \end{array}$$

**Mục tiêu của khử Gauss**: biến ma trận này về **tam giác trên** (mọi số dưới đường chéo chính = 0):

$$\left[\begin{array}{ccc|c} \bullet & * & * & * \\ 0 & \bullet & * & * \\ 0 & 0 & \bullet & * \end{array}\right] \qquad (* \text{ là số gì cũng được}; \ \bullet \text{ là pivot})$$

Khi đạt được, hàng cuối chỉ còn 1 ẩn ($z$) — giải xong; thay lên hàng giữa có 1 ẩn chưa biết ($y$); thay lên hàng đầu có 1 ẩn chưa biết ($x$). Đây là **back-substitution**.

---

**Bước 1 — khử cột 1 ở $R_2$**.

Mục tiêu: làm cho ô $(R_2, \text{cột 1})$ = 0. Hiện tại ô đó là $2$. Pivot trên đỉnh là $1$ (ô $(R_1, \text{cột 1})$).

**Hỏi**: nhân $R_1$ với hệ số nào, trừ vào $R_2$ để ô đó thành 0?
- Cần $2 - k \cdot 1 = 0$ → $k = 2$. Vậy: $R_2 \leftarrow R_2 - 2 \cdot R_1$.

**Tính từng cột**:

$$\begin{aligned} R_2 \text{ cũ:} \quad & [\ 2, \ -1, \ 3 \mid 14\ ] \\ 2 \cdot R_1: \quad & [\ 2, \ 2, \ 2 \mid 12\ ] \\ R_2 - 2 \cdot R_1: \quad & [\ 0, \ -3, \ 1 \mid 2\ ] \end{aligned}$$

Diễn dịch ngôn ngữ thường: "trừ 2 lần hàng 1 ra khỏi hàng 2 để khử cột 1 ở hàng 2". Số 2 (hệ số nhân) chính là **tỉ số** giữa hệ số cột 1 ở $R_2$ ($= 2$) và pivot ở $R_1$ ($= 1$).

---

**Bước 2 — khử cột 1 ở $R_3$**.

Tương tự: ô $(R_3, \text{cột 1})$ = 3, pivot = 1, hệ số nhân = 3. Phép: $R_3 \leftarrow R_3 - 3 \cdot R_1$.

$$\begin{aligned} R_3 \text{ cũ:} \quad & [\ 3, \ 2, \ -1 \mid 4\ ] \\ 3 \cdot R_1: \quad & [\ 3, \ 3, \ 3 \mid 18\ ] \\ R_3 - 3 \cdot R_1: \quad & [\ 0, \ -1, \ -4 \mid -14\ ] \end{aligned}$$

Sau bước 1 và 2, ma trận thành:

$$\left[\begin{array}{ccc|c} 1 & 1 & 1 & 6 \\ 0 & -3 & 1 & 2 \\ 0 & -1 & -4 & -14 \end{array}\right] \quad \begin{array}{l} R_1 \\ R_2 \text{ mới} \\ R_3 \text{ mới} \end{array}$$

Cột 1 đã sạch (chỉ còn pivot ở $R_1$). Giờ chuyển sang cột 2.

---

**Bước 3 — khử cột 2 ở $R_3$**.

Mục tiêu: ô $(R_3, \text{cột 2})$ = 0. Hiện tại ô đó là $-1$. Pivot mới là $R_2$, cột 2 = $-3$.

**Hỏi**: nhân $R_2$ với hệ số nào, trừ vào $R_3$ để ô đó thành 0?
- Cần $-1 - k \cdot (-3) = 0$ → $-1 + 3k = 0$ → $k = 1/3$. Vậy: $R_3 \leftarrow R_3 - \frac{1}{3} \cdot R_2$.

(Cách khác cho dễ nhớ: hệ số nhân $= \dfrac{\text{hệ số cần khử}}{\text{pivot}} = \dfrac{-1}{-3} = \dfrac{1}{3}$.)

$$\begin{aligned} R_3 \text{ cũ:} \quad & [\ 0, \ -1, \ -4 \mid -14\ ] \\ \tfrac{1}{3} \cdot R_2: \quad & [\ 0, \ -1, \ 1/3 \mid 2/3\ ] \\ R_3 - \tfrac{1}{3} \cdot R_2: \quad & [\ 0, \ 0, \ -4 - \tfrac{1}{3} \mid -14 - \tfrac{2}{3}\ ] \\ &= [\ 0, \ 0, \ -13/3 \mid -44/3\ ] \end{aligned}$$

Tại sao phân số? Pivot $-3$ không chia chẵn cho $-1$ → tỉ số là $1/3$. Đây là chuyện bình thường — cứ giữ phân số, không làm tròn.

Ma trận cuối cùng (dạng tam giác trên):

$$\left[\begin{array}{ccc|c} 1 & 1 & 1 & 6 \\ 0 & -3 & 1 & 2 \\ 0 & 0 & -13/3 & -44/3 \end{array}\right]$$

---

**Bước 4 — back-substitution** (thế ngược từ dưới lên).

Hàng 3 đọc thành phương trình:

$$\begin{aligned} -\tfrac{13}{3} \cdot z &= -\tfrac{44}{3} \\ z &= \frac{-44/3}{-13/3} = \frac{44}{13} \end{aligned}$$

Hàng 2 đọc thành phương trình:

$$\begin{aligned} -3y + 1 \cdot z &= 2 \\ -3y + \tfrac{44}{13} &= 2 \\ -3y &= 2 - \tfrac{44}{13} = \tfrac{26}{13} - \tfrac{44}{13} = -\tfrac{18}{13} \\ y &= \tfrac{6}{13} \end{aligned}$$

Hàng 1 đọc thành phương trình:

$$\begin{aligned} x + y + z &= 6 \\ x + \tfrac{6}{13} + \tfrac{44}{13} &= 6 \\ x &= \tfrac{78}{13} - \tfrac{50}{13} = \tfrac{28}{13} \end{aligned}$$

**Nghiệm**: $(x, y, z) = \left(\frac{28}{13}, \frac{6}{13}, \frac{44}{13}\right) \approx (2.154, 0.462, 3.385)$.

**Kiểm tra** với phương trình gốc:
- (1) $\frac{28}{13} + \frac{6}{13} + \frac{44}{13} = \frac{78}{13} = 6$ ✓
- (2) $2 \cdot \frac{28}{13} - \frac{6}{13} + 3 \cdot \frac{44}{13} = \frac{56 - 6 + 132}{13} = \frac{182}{13} = 14$ ✓
- (3) $3 \cdot \frac{28}{13} + 2 \cdot \frac{6}{13} - \frac{44}{13} = \frac{84 + 12 - 44}{13} = \frac{52}{13} = 4$ ✓

---

> **💡 Trực giác về quy trình**: ta đi **từ trái sang phải, từ trên xuống dưới**, mỗi bước "dập tắt" 1 ô dưới đường chéo. Tổng cộng cần dập $\frac{n(n-1)}{2}$ ô (với hệ 3 ẩn = 3 ô: $(R_2, c_1), (R_3, c_1), (R_3, c_2)$ — khớp với 3 bước trên). Mỗi ô = 1 phép $R_i \leftarrow R_i - k \cdot R_j$. Hết.

> **🔁 Dừng lại tự kiểm tra**: nếu ai đó hỏi "trong bước 3, tại sao chọn $R_2$ (không phải $R_1$) để khử cột 2 ở $R_3$?" — vì **$R_1$ có cột 1 $\neq 0$**, nếu dùng $R_1$ để khử $R_3$ ở cột 2 thì sẽ "phá" cột 1 (vốn đã được dập về 0 ở $R_3$). Quy tắc: **mỗi cột chỉ dùng pivot riêng của nó**, và pivot ở $R_2$ là cho cột 2, ở $R_3$ là cho cột 3, v.v.

> **Ghi chú về nghiệm phân số**: hệ ở trên do user soạn ra để minh họa khử Gauss "trên hệ tổng quát" — nghiệm phân số là chuyện thường. Nếu muốn nghiệm đẹp $(1, 2, 3)$, có thể đổi vế phải (2) thành $9$ (vì $2 \cdot 1 - 2 + 3 \cdot 3 = 9$), khi đó toàn bộ khử Gauss vẫn theo các bước y hệt — chỉ vế phải cuối ra $-13$ thay vì $-44/3$, và $z = 3, y = 2, x = 1$. Bài tập 3 ở Mục 10 giữ đề gốc $= 14$ để bạn luyện cả tính phân số.

### 6.6 Pivoting — vì sao cần và làm thế nào

#### 6.6.1 Tại sao pivot = 0 thì kẹt?

Quy trình khử Gauss ở Mục 6.5 đều giả định ô pivot ($R_1[1], R_2[2], R_3[3], \ldots$) **khác 0**. Vì hệ số nhân là $\frac{\text{hệ số cần khử}}{\text{pivot}}$ — nếu pivot = 0, ta chia cho 0, dừng máy.

**Ví dụ kẹt**:

$$\left[\begin{array}{cc|c} 0 & 1 & 2 \\ 1 & 0 & 3 \end{array}\right]$$

Ô $(R_1, \text{cột 1})$ = 0. Không thể dùng $R_1$ để khử cột 1 ở $R_2$. **Bị kẹt ngay bước đầu**.

**Cứu**: đổi chỗ $R_1$ và $R_2$.

$$\left[\begin{array}{cc|c} 1 & 0 & 3 \\ 0 & 1 & 2 \end{array}\right]$$

Ngay lập tức đã ở dạng tam giác trên → đọc nghiệm: $x = 3, y = 2$. Xong.

> Hệ trên rất tầm thường, nhưng minh họa nguyên tắc: **khi pivot = 0, swap hàng**. Đây gọi là **partial pivoting**.

#### 6.6.2 Pivot gần 0 cũng nguy hiểm (sai số số học)

Trong tính toán bằng máy (`float64`), khi pivot rất nhỏ (vd $10^{-15}$), chia cho nó tạo ra hệ số nhân khổng lồ ($10^{15}$) — bất kỳ sai số làm tròn nhỏ nào trong các phép tính sau cũng bị **khuếch đại lên gấp $10^{15}$ lần**. Kết quả cuối có thể sai hoàn toàn.

**Ví dụ kinh điển** (William Kahan):

$$\left[\begin{array}{cc|c} 10^{-20} & 1 & 1 \\ 1 & 1 & 2 \end{array}\right]$$

Nghiệm chính xác: $(x, y) \approx (1, 1)$. Nhưng nếu **không pivot**, dùng $10^{-20}$ làm pivot ở $(R_1, \text{cột 1})$:
- Hệ số nhân: $1 / 10^{-20} = 10^{20}$.
- $R_2 \leftarrow R_2 - 10^{20} \cdot R_1$: cột 2 thành $1 - 10^{20}$. Với `float64`, kết quả lưu là $-10^{20}$ (vì $1$ quá bé so với $10^{20}$, bị làm tròn).
- Tiếp tục: ra $y \approx 1$, nhưng $x$ tính từ $R_1$: $10^{-20} \cdot x + 1 \cdot 1 = 1 \to 10^{-20} \cdot x = 0 \to x = 0$. Sai (đúng là $x \approx 1$).

Nếu **swap** $R_1$ và $R_2$ trước (vì $|1| > |10^{-20}|$):

$$\left[\begin{array}{cc|c} 1 & 1 & 2 \\ 10^{-20} & 1 & 1 \end{array}\right]$$

Pivot bây giờ là $1$. Hệ số nhân: $10^{-20} / 1 = 10^{-20}$ (nhỏ, an toàn). Không có khuếch đại sai số. Tính ra $(1, 1)$ đúng.

#### 6.6.3 Partial pivoting — luật vàng

**Trước khi khử ở cột $i$**, làm thêm 1 bước:
1. Trong cột $i$, xét các ô từ hàng $i$ xuống cuối (tức $M[i][i], M[i+1][i], \ldots, M[n-1][i]$).
2. **Tìm hàng $j$ có $|M[j][i]|$ lớn nhất**.
3. Swap hàng $i$ với hàng $j$.
4. Sau đó mới làm khử như bình thường.

Tác dụng: pivot luôn có **trị tuyệt đối lớn nhất có thể** → hệ số nhân luôn $\leq 1$ → không có khuếch đại sai số.

**Ví dụ partial pivoting** — cột 1: $\max(|1|, |4|, |2|) = 4$ ở $R_2$ → swap $R_1 \leftrightarrow R_2$:

$$\left[\begin{array}{ccc|c} 1 & 2 & 3 & 6 \\ 4 & 5 & 6 & 15 \\ 2 & 1 & 1 & 4 \end{array}\right]$$

Sau swap:

$$\left[\begin{array}{ccc|c} 4 & 5 & 6 & 15 \\ 1 & 2 & 3 & 6 \\ 2 & 1 & 1 & 4 \end{array}\right] \quad \begin{array}{l} R_1 \ (\text{mới}) \\ \\ \\ \end{array}$$

Giờ pivot = 4, khử cột 1 ở $R_2$ và $R_3$ với hệ số nhân $1/4$ và $2/4 = 1/2$ — đều $\leq 1$, an toàn.

`solutions.go` của bài học cài đặt **đúng pattern này** — luôn swap để chọn pivot lớn nhất trước khi khử.

#### 6.6.4 Khi nào pivot = 0 ở MỌI hàng (không cứu được bằng swap)?

Nếu trong cột $i$, tất cả $M[j][i] = 0$ với $j \geq i$ — không hàng nào có pivot. Trường hợp này: cột $i$ "trống" → ẩn thứ $i$ là **biến tự do** (free variable). Bỏ qua cột này, chuyển sang cột $i+1$.

Đây là dấu hiệu **hệ có vô số nghiệm** (hoặc vô nghiệm — xem Mục 7).

#### 6.6.5 ⚠ Lỗi thường gặp về pivoting

- **Chia cho 0 khi pivot trong khử Gauss**: code naive (không pivoting) sẽ panic hoặc trả NaN. Luôn thêm bước check $|\text{pivot}| > \text{eps}$.
- **Quên swap cột vế phải $b$**: khi swap hàng $i \leftrightarrow j$, phải swap **toàn bộ hàng** trong ma trận mở rộng (kể cả cột $b$). Quên cột $b$ → đáp số sai.
- **Pivoting toàn phần (full pivoting)**: cao cấp hơn — swap cả hàng và cột để chọn $|\max|$ trong cả ma trận con. Ổn định hơn nhưng phải nhớ thứ tự cột đã đổi để "đặt lại" ẩn cuối cùng. Trong bài này chỉ dùng partial pivoting (đủ tốt cho 99% trường hợp).

---

## 7. Các trường hợp đặc biệt sau khử Gauss

Sau khi đưa ma trận về dạng tam giác trên (hoặc xa hơn — dạng bậc thang), ta đọc nghiệm dựa vào các hàng cuối.

### (a) Hàng `[0 0 ... 0 | 0]` → vô số nghiệm

Hàng này tương đương phương trình $0 = 0$ — luôn đúng, không cho thêm thông tin. Số phương trình "thật" (số hàng khác $0$) ít hơn số ẩn → có **biến tự do** → vô số nghiệm.

**Walk-through cụ thể** với hệ:

$$\begin{cases} x + y = 3 \\ 2x + 2y = 6 \end{cases}$$

Phương trình (2) chính là phương trình (1) **nhân 2** → cùng thông tin. Khử Gauss, ma trận đầu:

$$\left[\begin{array}{cc|c} 1 & 1 & 3 \\ 2 & 2 & 6 \end{array}\right]$$

Phép: $R_2 \leftarrow R_2 - 2 \cdot R_1$:

$$\begin{aligned} R_2 \text{ cũ:} \quad & [\ 2, \ 2 \mid 6\ ] \\ 2 \cdot R_1: \quad & [\ 2, \ 2 \mid 6\ ] \\ R_2 - 2 \cdot R_1: \quad & [\ 0, \ 0 \mid 0\ ] \quad (\text{hàng zero!}) \end{aligned}$$

$$\left[\begin{array}{cc|c} 1 & 1 & 3 \\ 0 & 0 & 0 \end{array}\right] \qquad (\text{phương trình } 0 = 0, \text{ luôn đúng})$$

Chỉ còn 1 phương trình thực sự: $x + y = 3$ với 2 ẩn → 1 biến tự do.

**Tham số hóa nghiệm**: đặt $y = t$ (tham số tùy ý) → $x = 3 - t$. Tập nghiệm:

$$\{ (3 - t, \ t) : t \in \mathbb{R} \}$$

Vài nghiệm cụ thể: $t = 0 \to (3, 0)$, $t = 1 \to (2, 1)$, $t = 1.5 \to (1.5, 1.5)$, $t = -5 \to (8, -5)$. **Vô số**.

Ví dụ ngắn hơn:

$$\left[\begin{array}{cc|c} 1 & 2 & 4 \\ 0 & 0 & 0 \end{array}\right]$$

Phương trình duy nhất là $x + 2y = 4$. Đặt $y = t$ (tham số) → $x = 4 - 2t$. Mọi $(4 - 2t, \ t)$ đều là nghiệm.

### (b) Hàng `[0 0 ... 0 | k]` với `k ≠ 0` → vô nghiệm

Hàng này tương đương $0 = k \neq 0$ — **mâu thuẫn**. Hệ không có nghiệm nào cả.

**Walk-through cụ thể** với hệ:

$$\begin{cases} x + y = 3 \\ 2x + 2y = 7 \end{cases}$$

Phương trình (1) nói "tổng = 3"; phương trình (2) — sau khi chia 2 — nói "cùng tổng đó = 3.5". Mâu thuẫn. Khử Gauss:

$$\left[\begin{array}{cc|c} 1 & 1 & 3 \\ 2 & 2 & 7 \end{array}\right]$$

Phép $R_2 \leftarrow R_2 - 2 \cdot R_1$:

$$\begin{aligned} R_2 \text{ cũ:} \quad & [\ 2, \ 2 \mid 7\ ] \\ 2 \cdot R_1: \quad & [\ 2, \ 2 \mid 6\ ] \\ R_2 - 2 \cdot R_1: \quad & [\ 0, \ 0 \mid 1\ ] \quad (\text{hàng mâu thuẫn!}) \end{aligned}$$

$$\left[\begin{array}{cc|c} 1 & 1 & 3 \\ 0 & 0 & 1 \end{array}\right] \qquad (\text{phương trình } 0 = 1, \text{ luôn sai})$$

Hàng 2 đọc thành $0 \cdot x + 0 \cdot y = 1$, tức $0 = 1$ — vô lý. **Hệ vô nghiệm**.

Ví dụ ngắn hơn:

$$\left[\begin{array}{cc|c} 1 & 2 & 4 \\ 0 & 0 & 3 \end{array}\right]$$

Hàng 2 nói $0 \cdot x + 0 \cdot y = 3$, vô lý.

### (c) Số biến > số phương trình (`n > m`) — **underdetermined**

Thường có **vô số nghiệm** (số biến tự do = $n - \text{rank}$). Trong ML, đây là tình huống "có quá nhiều tham số" → cần thêm điều kiện (regularization) để chọn 1 nghiệm.

### (d) Số biến < số phương trình (`n < m`) — **overdetermined**

Thường **vô nghiệm**. Hiếm khi tồn tại điểm chung của quá nhiều ràng buộc. Trong ML, **linear regression với nhiều điểm dữ liệu hơn tham số chính là overdetermined** — ta không tìm nghiệm "chính xác" mà tìm nghiệm **bình phương tối tiểu** (least squares). Xem Mục 9.

### Tóm tắt sơ đồ phân loại

```
Sau khử Gauss → ma trận bậc thang
├── Có hàng [0...0 | k≠0]?  → VÔ NGHIỆM
└── Không có:
    ├── rank = n (số ẩn)?    → 1 NGHIỆM DUY NHẤT
    └── rank < n?            → VÔ SỐ NGHIỆM (n − rank biến tự do)
```

$\text{rank}$ = số hàng khác $0$ sau khử = số phương trình "độc lập tuyến tính". Sẽ học định nghĩa chặt ở Tầng 4.

---

## 8. Định thức và công thức Cramer (giới thiệu)

> **Mục này chỉ giới thiệu trực giác** — Tầng 4 Linear Algebra sẽ học kỹ định thức cho ma trận $n \times n$ và liên hệ với thể tích.

### 8.1 Định thức 2×2

Với hệ:

$$\begin{cases} ax + by = e \\ cx + dy = f \end{cases}$$

**Định thức** của ma trận hệ số $A = \begin{bmatrix} a & b \\ c & d \end{bmatrix}$ là:

$$D = \det(A) = ad - bc$$

Số $D$ quyết định "tính khả nghịch" của hệ:

- $D \neq 0$ → hệ có **nghiệm duy nhất**.
- $D = 0$ → hệ **vô nghiệm hoặc vô số nghiệm** (phải kiểm tra thêm).

### 8.2 Công thức Cramer

Khi $D \neq 0$:

$$x = \frac{\begin{vmatrix} e & b \\ f & d \end{vmatrix}}{D}, \qquad y = \frac{\begin{vmatrix} a & e \\ c & f \end{vmatrix}}{D}$$

tức là:

$$\begin{aligned} x &= \frac{e \cdot d - b \cdot f}{D} \\ y &= \frac{a \cdot f - e \cdot c}{D} \end{aligned}$$

**Ví dụ**: với $2x + 3y = 12; \ x - y = 1$:

- $D = 2 \cdot (-1) - 3 \cdot 1 = -5$.
- $D_x = 12 \cdot (-1) - 3 \cdot 1 = -15$ → $x = -15 / -5 = 3$.
- $D_y = 2 \cdot 1 - 12 \cdot 1 = -10$ → $y = -10 / -5 = 2$.

$(3, 2)$. Khớp.

**Walk-through Cramer 2×2 chi tiết** với hệ khác để luyện kỹ:

Cho hệ:

$$\begin{cases} 2x + 3y = 8 \\ 4x - y = 2 \end{cases}$$

**Bước 1**: tính định thức chính $D$ (định thức của ma trận hệ số $A$):

$$D = \begin{vmatrix} 2 & 3 \\ 4 & -1 \end{vmatrix} = 2 \cdot (-1) - 3 \cdot 4 = -2 - 12 = -14$$

**Bước 2**: tính $D_x$ (định thức khi **thay cột x bằng vế phải**):

$$D_x = \begin{vmatrix} 8 & 3 \\ 2 & -1 \end{vmatrix} = 8 \cdot (-1) - 3 \cdot 2 = -8 - 6 = -14$$

**Bước 3**: tính $D_y$ (định thức khi **thay cột y bằng vế phải**):

$$D_y = \begin{vmatrix} 2 & 8 \\ 4 & 2 \end{vmatrix} = 2 \cdot 2 - 8 \cdot 4 = 4 - 32 = -28$$

**Bước 4**: áp dụng công thức Cramer:

$$\begin{aligned} x &= D_x / D = -14 / -14 = 1 \\ y &= D_y / D = -28 / -14 = 2 \end{aligned}$$

**Nghiệm**: $(x, y) = (1, 2)$.

**Kiểm tra**: $2 \cdot 1 + 3 \cdot 2 = 8$ ✓; $4 \cdot 1 - 2 = 2$ ✓.

> **💡 Trực giác**: định thức $D_x$ = "lấy ma trận $A$, thay cột tương ứng với ẩn $x$ bằng vế phải $b$, rồi tính định thức". Tương tự cho $D_y, D_z$. Quy luật này gọi là **Cramer's rule** — tổng quát cho $n \times n$.

### 8.3 Khi nào dùng Cramer?

- **Hệ rất nhỏ** (2×2 hoặc 3×3) khi cần công thức closed-form. Đặc biệt hữu ích khi cần đạo hàm theo tham số (vd trong vật lý/kinh tế lượng).
- **Phân tích lý thuyết**: dễ nhìn ra điều kiện có nghiệm.
- **Không dùng cho hệ lớn**: Cramer cho $n \times n$ cần tính $n+1$ định thức. Nếu mỗi định thức tính bằng định nghĩa khai triển Laplace thì độ phức tạp là $O(n!)$ — với $n = 10$, đã là $\sim 3.6$ triệu phép toán; với $n = 20$, là $\sim 2.4 \cdot 10^{18}$ (không khả thi). **Khử Gauss $O(n^3)$** nhanh hơn rất nhiều.

**So sánh số phép toán** (xấp xỉ):

| $n$ | Khử Gauss $O(n^3)$ | Cramer $O(n \cdot n!)$ |
|---|---|---|
| 3 | ~27 | ~18 |
| 5 | ~125 | ~600 |
| 10 | ~1000 | ~36 triệu |
| 20 | ~8000 | $\sim 5 \cdot 10^{19}$ (impossible) |

> **Tóm lại**: Cramer **đẹp về mặt công thức** (ai cũng nhớ được công thức 2×2), nhưng **không dùng trong production** cho hệ lớn. Mọi thư viện khoa học (NumPy, BLAS, LAPACK) đều dùng khử Gauss (hoặc LU decomposition, biến tướng tinh tế hơn) chứ không bao giờ dùng Cramer cho hệ lớn.

---

## 9. Liên hệ với ML và các tầng sau

### 9.1 `Ax = b` — bài toán trung tâm của Tầng 4

Hệ phương trình tuyến tính chính là phương trình ma trận $Ax = b$. Tầng 4 sẽ học:

- Khi nào tồn tại nghiệm (rank của $A$, rank của $[A \mid b]$).
- Cách tính $A^{-1}$ (ma trận nghịch đảo) — nếu tồn tại thì $x = A^{-1}b$.
- **LU decomposition**: phân tích $A = L \cdot U$ với $L$ tam giác dưới, $U$ tam giác trên. **Đây chính là khử Gauss được "lưu lại"** — sau khi phân tích xong, giải $Ax = b$ chỉ cần 2 lần thế ngược, nhanh hơn nhiều khi cần giải lặp với nhiều vector $b$.
- **QR decomposition, SVD** — các biến tướng dùng cho overdetermined, ổn định số học hơn.

### 9.2 Linear regression — hệ phương trình tuyến tính khổng lồ

Cho $m$ điểm dữ liệu $(x_i, y_i)$, ta tìm đường thẳng $y = w_1 \cdot x + w_0$ khớp tốt nhất theo bình phương tối tiểu. Tổng quát hơn với $n$ feature: tìm vector trọng số $w = (w_1, \ldots, w_n)^{\mathsf{T}}$ sao cho $Xw \approx y$, trong đó:

- $X$ là ma trận **$m \times n$**: $m$ hàng = $m$ mẫu dữ liệu, $n$ cột = $n$ feature.
- $y$ là vector **$m \times 1$**: nhãn (giá trị thực) tương ứng từng mẫu.
- $w$ là vector **$n \times 1$** ta đang đi tìm.

**Hàm mất mát (loss)** mean squared error:

$$L(w) = \frac{\lVert Xw - y \rVert^2}{m} = \frac{1}{m} \sum_i (X_i \cdot w - y_i)^2$$

Đây là tổng bình phương sai số trên $m$ mẫu, chia trung bình.

**Đạo hàm theo $w$** (sẽ học chi tiết ở Tầng 3 Calculus):

$$\frac{\partial L}{\partial w} = \frac{2}{m} \cdot X^{\mathsf{T}}(Xw - y)$$

**Cực tiểu**: đặt đạo hàm = 0 (vector 0):

$$\begin{aligned} X^{\mathsf{T}}(Xw - y) &= 0 \\ X^{\mathsf{T}} Xw - X^{\mathsf{T}} y &= 0 \\ X^{\mathsf{T}} X \cdot w &= X^{\mathsf{T}} y \end{aligned}$$

Đây là phương trình nổi tiếng **Normal Equation**:

$$(X^{\mathsf{T}}X) \cdot w = X^{\mathsf{T}} y$$

— một **hệ phương trình tuyến tính** với $n$ ẩn (các trọng số $w_1, \ldots, w_n$)! Ma trận hệ số là $X^{\mathsf{T}}X$ (kích thước $n \times n$), vế phải là $X^{\mathsf{T}}y$ (vector $n \times 1$). Đặt:
- $A = X^{\mathsf{T}}X$ (ma trận $n \times n$)
- $b = X^{\mathsf{T}}y$ (vector $n \times 1$)

→ bài toán linear regression trở thành **giải $Aw = b$**. Đây chính xác là dạng quen thuộc trong Mục 1.

**Giải bằng khử Gauss với partial pivoting** → ra $w$ tối ưu. Đây gọi là **closed-form solution** của linear regression — nghiệm "đóng", không cần lặp.

#### Walk-through số cụ thể

Cho 3 điểm dữ liệu: $(1, 2), (2, 3), (3, 5)$ — ta tìm đường $y = w_1 \cdot x + w_0$ khớp tốt nhất.

Đặt feature đầu là bias (cột 1's), feature thứ hai là $x$:

$$X = \begin{bmatrix} 1 & 1 \\ 1 & 2 \\ 1 & 3 \end{bmatrix}, \qquad y = \begin{bmatrix} 2 \\ 3 \\ 5 \end{bmatrix}$$

Tính $X^{\mathsf{T}}X$:

$$X^{\mathsf{T}}X = \begin{bmatrix} 1 & 1 & 1 \\ 1 & 2 & 3 \end{bmatrix} \begin{bmatrix} 1 & 1 \\ 1 & 2 \\ 1 & 3 \end{bmatrix} = \begin{bmatrix} 3 & 6 \\ 6 & 14 \end{bmatrix}$$

Tính $X^{\mathsf{T}}y$:

$$X^{\mathsf{T}}y = \begin{bmatrix} 1 & 1 & 1 \\ 1 & 2 & 3 \end{bmatrix} \begin{bmatrix} 2 \\ 3 \\ 5 \end{bmatrix} = \begin{bmatrix} 10 \\ 23 \end{bmatrix}$$

Hệ cần giải:

$$\left[\begin{array}{cc|c} 3 & 6 & 10 \\ 6 & 14 & 23 \end{array}\right]$$

Khử Gauss: $R_2 \leftarrow R_2 - 2 \cdot R_1$ → $[0, 2 \mid 3]$. Back-sub: $w_1 = 3/2 = 1.5$. Thay vào: $3w_0 + 6 \cdot 1.5 = 10 \to w_0 = 1/3 \approx 0.333$.

**Đường khớp**: $y \approx 0.333 + 1.5 \cdot x$. Kiểm tra: tại $x=1, y_{\text{pred}} = 1.833$ (thực 2); $x=2, y_{\text{pred}} = 3.333$ (thực 3); $x=3, y_{\text{pred}} = 4.833$ (thực 5) — gần đúng theo nghĩa bình phương tối tiểu.

> **Quan sát chính**: linear regression closed-form **=** giải một hệ phương trình tuyến tính. Tất cả những gì ta học trong Lesson này (khử Gauss, pivoting, định thức) được dùng trực tiếp khi train một mô hình ML cơ bản.

### 9.3 Khi nào không giải trực tiếp?

Khi $n$ rất lớn (vd $n = 10^6$ cho neural network với hàng triệu tham số), $X^{\mathsf{T}}X$ là ma trận $10^6 \times 10^6$:
- **Bộ nhớ**: cần $10^{12}$ ô × 8 byte = **8 TB RAM** chỉ để lưu — không khả thi.
- **Tính toán**: khử Gauss $O(n^3) = 10^{18}$ phép toán — với máy hiện đại $10^{10}$ phép/giây, mất **~3000 năm**.

Lúc đó ta dùng **gradient descent**:

$$w \leftarrow w - \eta \cdot \nabla L(w)$$

Mỗi bước chỉ cần tính $\nabla L = \frac{2}{m} \cdot X^{\mathsf{T}}(Xw - y)$ — chỉ là phép nhân ma trận với vector, $O(mn)$ thay vì $O(n^3)$. Không cần lưu $X^{\mathsf{T}}X$. Lặp vài chục/trăm bước → hội tụ về $w$ tối ưu (gần đúng).

**Tóm tắt khi nào dùng gì**:

| $n$ (số feature) | Phương pháp |
|---|---|
| $< 10^4$ | Closed-form (khử Gauss / LU) — chính xác, nhanh |
| $10^4 - 10^6$ | Gradient descent / Stochastic GD — đủ chính xác, vừa RAM |
| $> 10^6$ | Mini-batch SGD, Adam — bắt buộc |

> **Sẽ học ở Tầng 3 (Calculus)** — đạo hàm và gradient descent.
> **Sẽ học ở Tầng 6 (Machine Learning)** — linear regression chi tiết, regularization, evaluation.

> **Tóm tắt liên hệ**:
> - Hệ tuyến tính nhỏ-vừa → khử Gauss / LU.
> - Hệ tuyến tính khổng lồ → iterative methods (conjugate gradient), hoặc gradient descent cho bài toán tối ưu tổng quát.
> - Nhưng **mọi đường** đều bắt đầu từ việc hiểu khử Gauss ở bài này.

---

## 10. Bài tập

### Bài 1 — Phương pháp thế

Giải hệ sau bằng phương pháp thế:

$$\begin{cases} 3x + 2y = 13 \\ x - y = 1 \end{cases}$$

### Bài 2 — Phương pháp cộng đại số

Giải hệ sau bằng phương pháp cộng:

$$\begin{cases} 5x + 3y = 7 \\ 2x - 4y = 12 \end{cases}$$

### Bài 3 — Khử Gauss step-by-step

Giải hệ 3 ẩn sau bằng khử Gauss, ghi rõ từng bước biến đổi sơ cấp:

$$\begin{cases} x + y + z = 6 \\ 2x - y + 3z = 14 \\ 3x + 2y - z = 4 \end{cases}$$

### Bài 4 — Phân tích trường hợp đặc biệt

Mỗi hệ sau có bao nhiêu nghiệm? Phân loại và giải thích bằng đồ thị 2 đường thẳng.

**Hệ A**:

$$\begin{cases} 2x + 3y = 6 \\ 4x + 6y = 12 \end{cases}$$

**Hệ B**:

$$\begin{cases} 2x + 3y = 6 \\ 4x + 6y = 10 \end{cases}$$

### Bài 5 — Word problem

Một cửa hàng bán cà phê với 2 size. Khách A mua 2 size nhỏ + 3 size lớn hết **130k**. Khách B mua 4 size nhỏ + 1 size lớn hết **110k**. Hỏi giá mỗi size?

### Bài 6 — Code Go

Viết hàm:

```go
func solveLinearSystem(A [][]float64, b []float64) ([]float64, string)
```

giải hệ $Ax = b$ bằng khử Gauss với **partial pivoting**. Trả về:
- `(nghiệm, "unique")` nếu hệ có nghiệm duy nhất.
- `(nil, "none")` nếu vô nghiệm.
- `(một_nghiệm, "infinite")` nếu vô số nghiệm (trả về 1 nghiệm partial cũng được).

Test với hệ ở Bài 3.

---

## 11. Lời giải chi tiết

### Lời giải Bài 1

Hệ:

$$\begin{cases} (1) \quad 3x + 2y = 13 \\ (2) \quad x - y = 1 \end{cases}$$

Từ (2), tách: $x = y + 1$.

Thay vào (1):

$$\begin{aligned} 3(y + 1) + 2y &= 13 \\ 3y + 3 + 2y &= 13 \\ 5y &= 10 \\ y &= 2 \end{aligned}$$

Suy ra $x = 2 + 1 = 3$.

**Kiểm tra**: $3 \cdot 3 + 2 \cdot 2 = 9 + 4 = 13$ ✓, $3 - 2 = 1$ ✓.

**Nghiệm**: $(x, y) = (3, 2)$.

### Lời giải Bài 2

Hệ:

$$\begin{cases} (1) \quad 5x + 3y = 7 \\ (2) \quad 2x - 4y = 12 \end{cases}$$

Chọn khử $x$. Bội chung của $|5|$ và $|2|$ là $10$. Nhân (1) với 2, nhân (2) với 5:

$$\begin{cases} (1') \quad 10x + 6y = 14 \\ (2') \quad 10x - 20y = 60 \end{cases}$$

$(1') - (2')$: $26y = -46 \to y = -46/26 = -23/13$.

Hmm — phân số xấu. Kiểm tra lại đề. Đề: $5x + 3y = 7; \ 2x - 4y = 12$. Có lẽ ta dùng phương pháp cộng đúng nhưng nghiệm vốn dĩ là phân số. Tính tiếp:

$y = -23/13$. Từ (1): $5x = 7 - 3y = 7 - 3 \cdot (-23/13) = 7 + 69/13 = 91/13 + 69/13 = 160/13$. Vậy $x = 32/13$.

**Kiểm tra**: $2 \cdot \frac{32}{13} - 4 \cdot \left(-\frac{23}{13}\right) = \frac{64}{13} + \frac{92}{13} = \frac{156}{13} = 12$ ✓.

**Nghiệm**: $(x, y) = (32/13, -23/13)$.

> **Bài học**: hệ "đẹp" không phải lúc nào cũng có nghiệm nguyên. Đây là lý do trong code ta dùng `float64` thay vì `int`.

### Lời giải Bài 3

Ma trận mở rộng:

$$\left[\begin{array}{ccc|c} 1 & 1 & 1 & 6 \\ 2 & -1 & 3 & 14 \\ 3 & 2 & -1 & 4 \end{array}\right] \quad \begin{array}{l} R_1 \\ R_2 \\ R_3 \end{array}$$

**Bước 1** — khử cột 1:

- $R_2 \leftarrow R_2 - 2R_1$: $[0, -3, 1 \mid 2]$.
- $R_3 \leftarrow R_3 - 3R_1$: $[0, -1, -4 \mid -14]$.

$$\left[\begin{array}{ccc|c} 1 & 1 & 1 & 6 \\ 0 & -3 & 1 & 2 \\ 0 & -1 & -4 & -14 \end{array}\right]$$

**Bước 2** — khử cột 2 ở $R_3$ bằng pivot $-3$ ở (2,2). Hệ số: $R_3 \leftarrow R_3 - \frac{-1}{-3} R_2 = R_3 - \frac{1}{3} R_2$.

- $\frac{1}{3} \cdot R_2 = [0, -1, 1/3 \mid 2/3]$
- $R_3 - \frac{1}{3} \cdot R_2 = [0, 0, -4 - 1/3 \mid -14 - 2/3] = [0, 0, -13/3 \mid -44/3]$.

$$\left[\begin{array}{ccc|c} 1 & 1 & 1 & 6 \\ 0 & -3 & 1 & 2 \\ 0 & 0 & -13/3 & -44/3 \end{array}\right]$$

**Bước 3** — back-substitution:

- $-\frac{13}{3} \cdot z = -\frac{44}{3} \to z = \left(-\frac{44}{3}\right) \cdot \left(-\frac{3}{13}\right) = \frac{44}{13}$.
- $-3y + z = 2 \to -3y = 2 - \frac{44}{13} = \frac{26}{13} - \frac{44}{13} = -\frac{18}{13} \to y = \frac{6}{13}$.
- $x + y + z = 6 \to x = 6 - \frac{6}{13} - \frac{44}{13} = \frac{78}{13} - \frac{50}{13} = \frac{28}{13}$.

**Nghiệm**: $(x, y, z) = \left(\frac{28}{13}, \frac{6}{13}, \frac{44}{13}\right) \approx (2.154, 0.462, 3.385)$.

**Kiểm tra**:
- $\frac{28}{13} + \frac{6}{13} + \frac{44}{13} = \frac{78}{13} = 6$ ✓
- $2 \cdot \frac{28}{13} - \frac{6}{13} + 3 \cdot \frac{44}{13} = \frac{56 - 6 + 132}{13} = \frac{182}{13} = 14$ ✓
- $3 \cdot \frac{28}{13} + 2 \cdot \frac{6}{13} - \frac{44}{13} = \frac{84 + 12 - 44}{13} = \frac{52}{13} = 4$ ✓

> **Ghi chú**: nếu muốn hệ có nghiệm nguyên đẹp $(1, 2, 3)$, đổi vế phải (2) thành $9$ (xem Mục 6.5). Bài này giữ đề $14$ để bạn thực hành phân số.

### Lời giải Bài 4

**Hệ A**:

$$\begin{cases} 2x + 3y = 6 \\ 4x + 6y = 12 \end{cases}$$

Tỉ số: $2/4 = 3/6 = 6/12 = 1/2$. Cả 3 tỉ số bằng nhau → **2 đường trùng nhau** → **vô số nghiệm**.

Khử Gauss xác nhận: $R_2 \leftarrow R_2 - 2R_1$ cho $[0, 0 \mid 0]$ (hàng zero).

Tham số hóa: đặt $y = t$, suy ra $x = \frac{6 - 3t}{2} = 3 - 1.5t$. Mọi $(3 - 1.5t, \ t)$ đều là nghiệm.

**Đồ thị**: đường $2x + 3y = 6$ đi qua $(3, 0)$ và $(0, 2)$. Đường $4x + 6y = 12$ cũng đi qua đúng 2 điểm này — **trùng khít**.

**Hệ B**:

$$\begin{cases} 2x + 3y = 6 \\ 4x + 6y = 10 \end{cases}$$

Tỉ số vế trái: $2/4 = 3/6 = 1/2$. Tỉ số vế phải: $6/10 = 3/5$. **Khác nhau** → 2 đường **song song không trùng** → **vô nghiệm**.

Khử Gauss xác nhận: $R_2 \leftarrow R_2 - 2R_1$ cho $[0, 0 \mid -2]$ — hàng mâu thuẫn $0 = -2$.

**Đồ thị**: đường thứ nhất qua $(3, 0), (0, 2)$. Đường thứ hai $4x + 6y = 10$ qua $(2.5, 0), (0, 5/3)$. Cùng hệ số góc $-2/3$, nằm song song, không trùng.

### Lời giải Bài 5

Gọi giá size nhỏ là $s$, size lớn là $l$ (đơn vị: nghìn đồng).

$$\begin{cases} 2s + 3l = 130 & (\text{khách A}) \\ 4s + l = 110 & (\text{khách B}) \end{cases}$$

Cộng đại số: nhân (1) với 1, giữ. Nhân (2) với 3: $12s + 3l = 330$. Trừ (1) khỏi (2'):

$$\begin{aligned} (12s + 3l) - (2s + 3l) &= 330 - 130 \\ 10s &= 200 \\ s &= 20 \end{aligned}$$

Thay vào (2): $4 \cdot 20 + l = 110 \to l = 30$.

**Kiểm tra**: $2 \cdot 20 + 3 \cdot 30 = 40 + 90 = 130$ ✓, $4 \cdot 20 + 30 = 110$ ✓.

**Đáp án**: size nhỏ **20k**, size lớn **30k**.

### Lời giải Bài 6

Xem file [`solutions.go`](./solutions.go) — hàm `solveLinearSystem` cài đặt khử Gauss với partial pivoting, kèm `main()` chạy demo với hệ Bài 3.

**Ý tưởng thuật toán**:

1. Ghép $A$ và $b$ thành ma trận mở rộng $M$ kích thước $n \times (n+1)$.
2. Với mỗi cột $i$ từ $0$ đến $n-1$:
   - **Pivot**: tìm hàng $j \geq i$ có $|M[j][i]|$ lớn nhất; swap với hàng $i$.
   - Nếu $|M[i][i]| < \text{eps}$: cột này không có pivot → kiểm tra phần vế phải để phân biệt vô nghiệm / vô số nghiệm.
   - Nếu có pivot: với mỗi hàng $k > i$, làm $M[k] \leftarrow M[k] - \frac{M[k][i]}{M[i][i]} \cdot M[i]$.
3. Back-substitution từ hàng cuối lên: $x[i] = \dfrac{M[i][n] - \sum_{j > i} M[i][j] \cdot x[j]}{M[i][i]}$.

**Độ phức tạp**: $O(n^3)$ cho phần khử + $O(n^2)$ cho back-sub. Tổng $O(n^3)$.

---

## 12. Tóm tắt và liên kết

- Hệ tuyến tính = nhiều phương trình bậc 1 với nhiều ẩn, phải đồng thời đúng.
- 3 trường hợp nghiệm: **1 / vô số / không** — đặc trưng của tuyến tính.
- 3 phương pháp giải: **thế** (gọn cho 2 ẩn), **cộng** (linh hoạt), **khử Gauss** (tổng quát, nền tảng cho mọi thuật toán đại số tuyến tính).
- Khử Gauss = áp dụng có hệ thống 3 phép biến đổi hàng → ma trận tam giác trên → back-substitution.
- Định thức 2×2 và Cramer = công cụ nhanh cho hệ nhỏ; sẽ học sâu ở Tầng 4.
- Linear regression closed-form là hệ tuyến tính $X^{\mathsf{T}}X \cdot w = X^{\mathsf{T}}y$ — khử Gauss giải được khi $n$ vừa phải.

### File trong lesson

- [solutions.go](./solutions.go) — code Go cho khử Gauss + Cramer + lời giải bài tập.
- [visualization.html](./visualization.html) — viz tương tác: 2-ẩn solver, Gauss stepper, special cases.

### Bài học liên quan

- **Bài trước**: [Lesson 07 — Hàm mũ và hàm log](../lesson-07-exp-log-functions/)
- **Tầng tiếp theo**: Tầng 2 — Trigonometry (góc, sin/cos, tích vô hướng — hình học của không gian).
- **Học tiếp về hệ tuyến tính**: Tầng 4 — Linear Algebra (ma trận, vector space, eigenvalue, SVD).
