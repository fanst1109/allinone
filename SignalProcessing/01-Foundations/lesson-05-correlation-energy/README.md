# Lesson 05 — Tương quan & Năng lượng tín hiệu (Correlation & Signal Energy)

> Bài **CUỐI Tier 1 — Foundations** của lĩnh vực Signal Processing. Sau bài này, lộ trình rẽ sang **Tier 2 — Fourier** để học cách nhìn tín hiệu trong miền tần số.

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Trả lời được câu hỏi mở bài: **làm sao tìm chu kỳ ẩn của một tín hiệu chìm trong nhiễu?**
- Hiểu **tương quan chéo (cross-correlation)** và phân biệt RÕ nó với **tích chập (convolution)** — khác nhau ở chỗ tương quan **không lật** tín hiệu.
- Hiểu **tự tương quan (autocorrelation)**: tương quan của tín hiệu với chính nó dịch đi $m$ mẫu; đỉnh tại $m=0$; dùng tìm chu kỳ ẩn.
- Hiểu **matched filter / template matching**: trượt một "mẫu mong đợi" để tìm vị trí khớp nhất.
- Tính được **năng lượng (energy)** $E = \sum |x[n]|^2$ và **công suất trung bình (average power)** $P = E/N$.
- Nắm sơ bộ **định lý Parseval**: năng lượng miền thời gian = năng lượng miền tần số (sẽ học kỹ ở Tier 2).
- Áp dụng: phát hiện chu kỳ, đo độ trễ (time delay), nhận dạng mẫu.

## Kiến thức tiền đề

- [Lesson 04 — Tích chập (Convolution)](../lesson-04-convolution/) — **bắt buộc**: tương quan và tích chập là anh em sinh đôi, chỉ khác nhau một phép lật. Hiểu convolution xong, correlation chỉ là "convolution không lật".
- [Statistics — Tương quan hai biến (Bivariate Correlation)](../../../Statistics/01-Descriptive/lesson-05-bivariate-correlation/) — tương quan tín hiệu chính là hệ số tương quan của thống kê, áp cho hai chuỗi bị dịch tương đối.

---

## 1. Vì sao học tương quan? — Bài toán "tín hiệu ẩn trong nhiễu"

💡 **Trực giác / Hình dung.** Tưởng tượng bạn đứng trong một phòng đông người ồn ào và nghe loáng thoáng có ai đó **gõ nhịp đều đặn** lên bàn. Tai người rất giỏi việc này: dù tiếng gõ bị chìm trong tạp âm, não vẫn "khóa" được vào nhịp lặp. Tương quan là **công thức toán học hóa đúng khả năng đó** — nó đo "tín hiệu này giống với phiên bản dịch của nó (hoặc của một mẫu khác) đến mức nào".

Đặt vấn đề cụ thể (sẽ giải đáp ngay trong bài này, không bỏ ngỏ):

> Một cảm biến nhịp tim ghi được chuỗi số chìm trong nhiễu đo:
> `x = [2.1, -0.9, 1.8, 2.2, -1.1, 1.9, 2.0, -0.8, 1.7, ...]`
> Nhìn bằng mắt thường thì "loạn", nhưng có vẻ cứ **3 mẫu lại lặp**. Làm sao **chứng minh** có chu kỳ ẩn và **đo** chính xác chu kỳ đó?

Câu trả lời nằm ở §3 (tự tương quan): ta tính tương quan của tín hiệu với **chính nó dịch đi** từng mẫu một. Tại độ dịch bằng đúng chu kỳ, các đỉnh chồng lên đỉnh, các đáy chồng lên đáy → giá trị tương quan **bật lên thành đỉnh phụ**. Vị trí đỉnh phụ đó = chu kỳ. Nhiễu, vì ngẫu nhiên không lặp, sẽ **không** tạo đỉnh → bị "trung bình hóa" về gần 0.

Ba ứng dụng kinh điển dùng đúng ý tưởng này:

| Lĩnh vực | Tín hiệu | Tương quan dùng để |
| --- | --- | --- |
| **Radar / Sonar** | Sóng phát đi ↔ tiếng vọng về | Đo độ trễ → suy ra khoảng cách mục tiêu |
| **GPS** | Mã giả ngẫu nhiên của vệ tinh ↔ tín hiệu thu | Tìm độ lệch thời gian → tính vị trí |
| **Nhịp tim / EEG** | Bản ghi sinh học chìm trong nhiễu | Phát hiện chu kỳ ẩn (nhịp tim, sóng não) |

📝 **Tóm tắt mục 1.**
- Tương quan đo **mức độ giống nhau** giữa hai tín hiệu khi một cái bị dịch tương đối so với cái kia.
- Mẫu lặp tạo **đỉnh**; nhiễu ngẫu nhiên bị **trung bình về 0** → tương quan "lọc" tín hiệu ra khỏi nhiễu.
- Ứng dụng cốt lõi: **đo độ trễ** (radar, GPS) và **tìm chu kỳ ẩn** (sinh học).

---

## 2. Tương quan chéo (Cross-correlation)

💡 **Trực giác.** Cross-correlation trả lời câu: *"Nếu tôi trượt tín hiệu $y$ dọc theo $x$, thì tại độ dịch nào hai cái chồng khít nhau nhất?"* Mỗi vị trí dịch cho một con số "độ giống". Tập hợp các con số đó theo độ dịch $m$ chính là **hàm tương quan chéo**.

### 2.1. Định nghĩa

Với hai tín hiệu rời rạc thực $x[n]$ và $y[n]$, tương quan chéo (ký hiệu $\star$) là:

$$(x \star y)[m] = \sum_{n} x[n]\, y[n+m]$$

- $m$ là **độ trễ (lag)** — số mẫu mà ta dịch $y$ so với $x$.
- $m > 0$: $y$ bị dịch sang trái (so trước) ; $m < 0$: dịch sang phải.
- Kết quả là một hàm theo $m$: với mỗi độ dịch cho một con số.

### 2.2. Khác tích chập ở đâu? — KHÔNG lật

Đây là điểm dễ nhầm nhất, nên đặt cạnh nhau:

$$\text{Tích chập: } (x * y)[m] = \sum_{n} x[n]\, y[m-n] \qquad\Longleftarrow\ \text{có } m-n \text{ (lật + dịch)}$$

$$\text{Tương quan: } (x \star y)[m] = \sum_{n} x[n]\, y[n+m] \qquad\Longleftarrow\ \text{có } n+m \text{ (chỉ dịch, KHÔNG lật)}$$

| | Tích chập (Convolution) `*` | Tương quan chéo (Cross-correlation) `⋆` |
| --- | --- | --- |
| Công thức | $\sum_n x[n]\,y[m-n]$ | $\sum_n x[n]\,y[n+m]$ |
| Lật tín hiệu thứ hai? | **CÓ** (đảo $y$ rồi trượt) | **KHÔNG** (giữ nguyên $y$, chỉ trượt) |
| Giao hoán? | Có: $x*y = y*x$ | **Không**: $x\star y \neq y\star x$ nói chung |
| Ý nghĩa | Hệ thống LTI tác động lên đầu vào (đáp ứng) | Đo độ **giống** giữa hai tín hiệu theo độ trễ |
| Quan hệ | — | $(x \star y)[m] = (x * y_{-})[m]$, với $y_{-}[n]=y[-n]$ là $y$ đã lật |

⚠ **Lỗi thường gặp.** "Tương quan và tích chập là một" — **SAI**. Chỉ trùng khi tín hiệu thứ hai **đối xứng chẵn** ($y[n]=y[-n]$), vì khi đó lật cũng như không. Với mẫu bất đối xứng (ví dụ một dốc lên `[1,2,3]`), kết quả khác hẳn — xem walk-through dưới.

### 2.3. Walk-through bằng số

Cho:

```
x = [1, 2, 3, 0]      (n = 0..3)
y = [0, 1, 2]          (mẫu cần dò, đặt tại n = 0..2)
```

Tính $(x \star y)[m] = \sum_n x[n]\,y[n+m]$ cho vài giá trị $m$ (chỉ số ngoài phạm vi coi như 0):

**$m = 0$:** ghép $x[n]$ với $y[n]$:
$$x[0]y[0] + x[1]y[1] + x[2]y[2] = 1\cdot0 + 2\cdot1 + 3\cdot2 = 0+2+6 = 8$$

**$m = -1$:** ghép $x[n]$ với $y[n-1]$ (dịch $y$ sang phải 1):
$$x[1]y[0] + x[2]y[1] + x[3]y[2] = 2\cdot0 + 3\cdot1 + 0\cdot2 = 3$$

**$m = 1$:** ghép $x[n]$ với $y[n+1]$ (dịch $y$ sang trái 1):
$$x[0]y[1] + x[1]y[2] = 1\cdot1 + 2\cdot2 = 1+4 = 5$$

**$m = 2$:**
$$x[0]y[2] = 1\cdot2 = 2$$

Vậy hàm tương quan (sắp theo $m$): $\ldots,\ 3\ (m{=}{-}1),\ 8\ (m{=}0),\ 5\ (m{=}1),\ 2\ (m{=}2),\ \ldots$ — **đỉnh tại $m=0$** nghĩa là $y$ khớp $x$ nhất khi không dịch.

🔁 **Dừng lại tự kiểm tra.** Tính $(x \star y)[3]$ với $x,y$ ở trên.

<details><summary>Đáp án</summary>

$m=3$: $y[n+3]$ chỉ còn $x[0]y[3]$, mà $y[3]=0$ (ngoài phạm vi). Vậy $(x\star y)[3]=0$.
</details>

❓ **Câu hỏi tự nhiên của người đọc.**
- *"Vì sao đỉnh cho biết vị trí khớp?"* — Vì tích $x[n]y[n+m]$ lớn nhất khi đỉnh của $y$ rơi đúng vào đỉnh của $x$ (số lớn nhân số lớn). Lệch đi thì đỉnh nhân đáy → tổng nhỏ.
- *"Tương quan chéo có giao hoán không?"* — Không. $(x\star y)[m] = (y\star x)[-m]$: đổi vai trò thì hàm bị **lật quanh trục $m=0$**.

📝 **Tóm tắt mục 2.**
- $(x\star y)[m]=\sum_n x[n]y[n+m]$: trượt $y$ qua $x$, **không lật**.
- Khác tích chập đúng một phép lật: $x\star y = x * y_{-}$.
- Đỉnh của hàm tương quan ⟹ độ trễ mà hai tín hiệu khớp nhất.

---

## 3. Tự tương quan (Autocorrelation) — chìa khóa tìm chu kỳ

💡 **Trực giác.** Tự tương quan là tương quan chéo của tín hiệu **với chính nó**: $R_x[m] = (x \star x)[m]$. Hãy hình dung in tín hiệu lên hai tờ giấy can trong suốt, đặt chồng rồi **trượt một tờ**. Khi trượt 0 mẫu → chồng khít hoàn toàn → giá trị lớn nhất. Khi trượt đúng một chu kỳ → đỉnh lại chồng đỉnh → giá trị **bật lên** thành đỉnh phụ. Khoảng cách giữa hai đỉnh = chu kỳ.

### 3.1. Định nghĩa và tính chất

$$R_x[m] = (x \star x)[m] = \sum_{n} x[n]\, x[n+m]$$

Ba tính chất quan trọng:

1. **Đỉnh tại $m=0$:** $R_x[0] = \sum_n x[n]^2 = E$ (chính là **năng lượng** — xem §5). Đây là giá trị **lớn nhất**: $R_x[0] \geq |R_x[m]|$ với mọi $m$. (Một tín hiệu luôn giống chính nó nhất khi không dịch.)
2. **Đối xứng chẵn:** $R_x[m] = R_x[-m]$ (với tín hiệu thực). Nên chỉ cần tính nửa dương.
3. **Đỉnh phụ tại bội số chu kỳ:** nếu $x$ tuần hoàn chu kỳ $P$, thì $R_x[m]$ có đỉnh phụ tại $m = P, 2P, 3P, \ldots$

### 3.2. Bốn ví dụ số

**Ví dụ 1 — tín hiệu ngắn `x = [1, 2, 1]`.**
- $R_x[0]=1^2+2^2+1^2 = 6$
- $R_x[1]=x[0]x[1]+x[1]x[2] = 1\cdot2+2\cdot1 = 4$
- $R_x[2]=x[0]x[2] = 1\cdot1 = 1$
- Hàm (m≥0): $6, 4, 1$ — giảm đều, **không tuần hoàn** (đúng, vì `[1,2,1]` không lặp).

**Ví dụ 2 — xung đơn `x = [0, 5, 0, 0]`.**
- $R_x[0]=25$, $R_x[1]=0$, $R_x[2]=0$, $R_x[3]=0$. Chỉ có đỉnh tại 0 ⟹ tín hiệu **không có cấu trúc lặp** (giống nhiễu trắng lý tưởng).

**Ví dụ 3 — chu kỳ 2: `x = [1, -1, 1, -1, 1, -1]`.**
- $R_x[0] = 6\cdot1 = 6$.
- $R_x[1] = \sum x[n]x[n+1] = (1)(-1)+(-1)(1)+(1)(-1)+(-1)(1)+(1)(-1) = -5$.
- $R_x[2] = (1)(1)+(-1)(-1)+(1)(1)+(-1)(-1) = 4$.
- Dấu **đổi tại $m=1$** rồi **dương trở lại tại $m=2$** ⟹ chu kỳ $P=2$. ✓

**Ví dụ 4 — chu kỳ 3: `x = [2, -1, -1, 2, -1, -1]`.**
- $R_x[0]=2^2+(-1)^2+(-1)^2+2^2+(-1)^2+(-1)^2 = 4+1+1+4+1+1 = 12$.
- $R_x[3] = x[0]x[3]+x[1]x[4]+x[2]x[5] = (2)(2)+(-1)(-1)+(-1)(-1) = 4+1+1 = 6$.
- **Đỉnh phụ rõ rệt tại $m=3$** ⟹ chu kỳ $P=3$. ✓ (Đây chính là dạng "nhịp tim 3 mẫu" ở bài toán mở đầu.)

### 3.3. Giải đáp bài toán mở đầu

Áp dụng vào `x = [2.1, -0.9, 1.8, 2.2, -1.1, 1.9, 2.0, -0.8, 1.7]` (nhịp tim chìm trong nhiễu). Tính $R_x[m]$ chuẩn hóa (chia cho $R_x[0]$) sẽ thấy:

- $R_x[0]=1.0$ (luôn vậy sau chuẩn hóa).
- $R_x[1], R_x[2]$ nhỏ / âm (các mẫu kề nhau không giống).
- $R_x[3]$ **bật lên gần $0.95$** — đỉnh phụ rõ ⟹ **chu kỳ ẩn = 3 mẫu**. ✓

Nhiễu không lặp nên không sinh đỉnh phụ; chỉ thành phần tuần hoàn mới "cộng dồn" thành đỉnh tại $m=3$. Đó là cách autocorrelation **lôi tín hiệu ra khỏi nhiễu** mà mắt thường không thấy được. (Module (b) trong [visualization.html](./visualization.html) mô phỏng trực tiếp điều này — kéo slider nhiễu để xem đỉnh chu kỳ vẫn trụ.)

⚠ **Lỗi thường gặp.** Nhầm đỉnh tại $m=0$ là "chu kỳ 0". KHÔNG — đỉnh $m=0$ luôn tồn tại với mọi tín hiệu (tín hiệu luôn khớp chính nó). Chu kỳ được đọc từ **đỉnh phụ đầu tiên ở $m>0$**.

🔁 **Dừng lại tự kiểm tra.** Cho `x = [3, 0, 3, 0, 3, 0]`. Chu kỳ là bao nhiêu? Tính $R_x[2]$ để xác nhận.

<details><summary>Đáp án</summary>

Chu kỳ $P=2$. $R_x[2] = x[0]x[2]+x[1]x[3]+x[2]x[4]+x[3]x[5] = (3)(3)+(0)(0)+(3)(3)+(0)(0)=18$ — đỉnh phụ tại $m=2$ xác nhận chu kỳ 2. ($R_x[0]=3^2\cdot3=27$, $R_x[1]=0$.)
</details>

📝 **Tóm tắt mục 3.**
- $R_x[m]=\sum_n x[n]x[n+m]$: tương quan tín hiệu với chính nó dịch $m$.
- $R_x[0]=E$ (năng lượng) là **đỉnh tuyệt đối**; $R_x$ đối xứng chẵn.
- **Đỉnh phụ đầu tiên ở $m>0$ = chu kỳ ẩn**; nhiễu không tạo đỉnh phụ.

---

## 4. Matched Filter / Template Matching

💡 **Trực giác.** Bạn có một **mẫu mong đợi** (template) — ví dụ hình dạng một nhịp QRS của tim, hay một xung radar đã phát. Bạn trượt template đó dọc theo tín hiệu thu được và hỏi: *"chỗ nào tín hiệu thu trông giống template nhất?"* Chính là tương quan chéo giữa template và tín hiệu — và **vị trí đỉnh = vị trí mẫu xuất hiện**.

### 4.1. Cơ chế

Cho template $h$ và tín hiệu thu $x$, ta tính:

$$y[m] = (x \star h)[m] = \sum_n x[n]\,h[n-m]$$

(Trượt $h$ đến vị trí $m$, nhân chồng, cộng.) Vị trí $m^\*$ làm $y[m]$ **lớn nhất** chính là nơi template khớp tín hiệu nhất.

> **Vì sao matched filter là tối ưu?** Trong nhiễu trắng Gaussian, bộ lọc cho **tỷ số tín hiệu/nhiễu (SNR)** lớn nhất tại điểm khớp chính là bộ lọc có dạng = template lật lại. Tức **trượt template** (correlation) là cách phát hiện tối ưu mẫu đã biết. Chứng minh đầy đủ thuộc Tier 2 — ở đây chỉ cần trực giác: ghép số lớn với số lớn cho tổng lớn nhất.

### 4.2. Ví dụ số

Tín hiệu thu (mẫu `[1,2,1]` xuất hiện quanh vị trí 3, lẫn nhiễu nhỏ):

```
x = [0, 0, 0, 1, 2, 1, 0, 0]      (n = 0..7)
h = [1, 2, 1]                       (template)
```

Tính độ khớp $y[m]=\sum_k x[m+k]\,h[k]$ (trượt cửa sổ độ dài 3):

- $m=2$: $x[2]h[0]+x[3]h[1]+x[4]h[2] = 0\cdot1+1\cdot2+2\cdot1 = 4$
- $m=3$: $x[3]h[0]+x[4]h[1]+x[5]h[2] = 1\cdot1+2\cdot2+1\cdot1 = 6$  ← **lớn nhất**
- $m=4$: $x[4]h[0]+x[5]h[1]+x[6]h[2] = 2\cdot1+1\cdot2+0\cdot1 = 4$

Đỉnh tại $m=3$ ⟹ template bắt đầu tại vị trí 3. ✓ Đúng vị trí đã giấu mẫu.

❓ **Câu hỏi tự nhiên.** *"Sao không chỉ tìm giá trị lớn nhất của $x$?"* — Vì nhiễu có thể tạo một mẫu **lẻ** rất cao đánh lừa. Matched filter đòi hỏi **toàn bộ hình dạng** khớp, nên kháng nhiễu tốt hơn nhiều so với dò đỉnh đơn lẻ.

📝 **Tóm tắt mục 4.**
- Matched filter = trượt template $h$ qua tín hiệu $x$, lấy tương quan; **đỉnh = vị trí khớp**.
- Tối ưu cho việc phát hiện mẫu đã biết trong nhiễu (radar, GPS, QRS tim).
- Mạnh hơn dò đỉnh đơn lẻ vì khớp **cả hình dạng**, không chỉ một điểm.

---

## 5. Năng lượng & Công suất tín hiệu

💡 **Trực giác.** "Năng lượng" của tín hiệu KHÔNG nhất thiết là năng lượng vật lý (Joule) — nó là **tổng độ lớn bình phương** của tín hiệu, một thước đo "tín hiệu này mạnh cỡ nào". Bình phương để (a) dấu âm không triệt tiêu dấu dương, (b) trọng số hơn cho các mẫu lớn. Công suất là "năng lượng trải trên mỗi mẫu" — trung bình.

### 5.1. Định nghĩa (đủ 3 phần: là gì / vì sao / ví dụ)

**Năng lượng (energy)** của tín hiệu rời rạc:

$$E = \sum_{n} |x[n]|^2$$

- **(a) Là gì:** tổng bình phương độ lớn mọi mẫu — đo tổng "công sức" của tín hiệu.
- **(b) Vì sao cần:** để so sánh hai tín hiệu mạnh/yếu một cách khách quan, và vì $E = R_x[0]$ (nối với tự tương quan) cũng như $E$ bảo toàn qua biến đổi Fourier (Parseval, §6).
- **(c) Ví dụ:** `x=[3,4]` ⟹ $E=3^2+4^2=25$ — đúng bằng bình phương "độ dài vector" $[3,4]$.

**Công suất trung bình (average power):**

$$P = \frac{E}{N} = \frac{1}{N}\sum_{n=0}^{N-1} |x[n]|^2$$

- **(a) Là gì:** năng lượng chia cho số mẫu $N$ — "mức mạnh trung bình mỗi mẫu".
- **(b) Vì sao cần:** tín hiệu **vô hạn / tuần hoàn** có $E=\infty$ (cộng mãi không dừng), nên năng lượng vô dụng; lúc đó **công suất** mới là thước đo hữu hạn, có nghĩa.
- **(c) Ví dụ:** sóng `[1,-1,1,-1]` có $E=4$, $N=4$ ⟹ $P=1$.

> **Tín hiệu năng lượng vs công suất.** Tín hiệu **hữu hạn** (tắt dần, một xung) → $E$ hữu hạn, $P\to0$ → gọi là *tín hiệu năng lượng*. Tín hiệu **tuần hoàn vô hạn** (sin mãi mãi) → $E=\infty$, $P$ hữu hạn → gọi là *tín hiệu công suất*.

### 5.2. Bốn ví dụ số

| # | Tín hiệu $x$ | $E=\sum x[n]^2$ | $N$ | $P=E/N$ |
| --- | --- | --- | --- | --- |
| 1 | `[3, 4]` | $9+16=25$ | 2 | $12.5$ |
| 2 | `[1, 1, 1, 1]` | $1{+}1{+}1{+}1=4$ | 4 | $1.0$ |
| 3 | `[2, -2, 2, -2]` | $4{+}4{+}4{+}4=16$ | 4 | $4.0$ |
| 4 | `[5, 0, 0]` | $25+0+0=25$ | 3 | $8.33$ |

Nhận xét: ví dụ 1 và 4 cùng $E=25$ nhưng **công suất khác nhau** (12.5 vs 8.33) vì trải trên số mẫu khác nhau — minh họa rõ vì sao cần cả hai đại lượng.

🔁 **Dừng lại tự kiểm tra.** Tính $E$ và $P$ của `x = [0, 6, -8, 0]`.

<details><summary>Đáp án</summary>

$E = 0^2 + 6^2 + (-8)^2 + 0^2 = 0+36+64+0 = 100$. $N=4$ ⟹ $P = 100/4 = 25$.
</details>

⚠ **Lỗi thường gặp.** Quên **bình phương** (cộng giá trị thay vì giá trị bình phương): với `[2,-2]` mà cộng thẳng được $0$ — sai. Phải là $E=2^2+(-2)^2=8$. Dấu trị tuyệt đối / bình phương là để **dấu âm không triệt tiêu**.

📝 **Tóm tắt mục 5.**
- $E=\sum|x[n]|^2$: tổng bình phương — "tín hiệu mạnh cỡ nào". Bằng $R_x[0]$.
- $P=E/N$: công suất trung bình — dùng cho tín hiệu vô hạn/tuần hoàn ($E=\infty$).
- Cùng năng lượng vẫn có thể khác công suất (khác $N$).

---

## 6. Định lý Parseval (sơ bộ — preview Tier 2)

💡 **Trực giác.** Bạn có thể đong một thùng nước bằng cách (a) đo mực nước theo thời gian khi rót, hoặc (b) phân tích nó thành từng "vòi" thành phần. Hai cách phải ra **cùng một tổng lượng nước**. Parseval nói điều tương tự cho tín hiệu: **năng lượng đo trong miền thời gian = năng lượng đo trong miền tần số**. Đổi cách nhìn không làm thay đổi tổng năng lượng.

Phát biểu sơ bộ (dạng DFT $N$ điểm):

$$\sum_{n=0}^{N-1} |x[n]|^2 \;=\; \frac{1}{N}\sum_{k=0}^{N-1} |X[k]|^2$$

trong đó $X[k]$ là biến đổi Fourier rời rạc (DFT) của $x$. Vế trái = năng lượng theo **mẫu thời gian**; vế phải = năng lượng phân bổ trên các **tần số**.

- **Ý nghĩa thực tế:** muốn biết "năng lượng nằm ở tần số nào nhiều nhất" (phổ năng lượng), cứ tính $|X[k]|^2$ — và tổng của chúng vẫn khớp năng lượng thời gian. Đây là nền của **mật độ phổ công suất (power spectral density)**.
- **Liên hệ tự tương quan:** $|X[k]|^2$ chính là DFT của hàm tự tương quan $R_x[m]$ (định lý Wiener–Khinchin). Vì vậy **tìm chu kỳ bằng autocorrelation** và **tìm chu kỳ bằng phổ tần số** là hai mặt của một đồng xu.

❓ **Câu hỏi tự nhiên.** *"Sao bây giờ chưa chứng minh?"* — Vì cần định nghĩa đầy đủ DFT trước, thuộc Tier 2. Ở đây chỉ cần nắm: **năng lượng bảo toàn khi đổi miền**. Học kỹ ở [Biến đổi Fourier](../../02-Fourier/lesson-03-fourier-transform/).

📝 **Tóm tắt mục 6.**
- Parseval: $\sum|x[n]|^2 = \frac1N\sum|X[k]|^2$ — năng lượng **bảo toàn** giữa miền thời gian và tần số.
- Nền của phổ năng lượng / power spectral density.
- Wiener–Khinchin: phổ năng lượng = DFT của tự tương quan ⟹ nối liền §3 với Fourier.

---

## 7. Ứng dụng thực tế

1. **Đo độ trễ / khoảng cách (radar, sonar, GPS):** tính cross-correlation giữa tín hiệu phát và tín hiệu thu; **vị trí đỉnh = độ trễ $\tau$**. Với radar, khoảng cách $d = c\tau/2$ ($c$ = tốc độ sóng). GPS dùng correlation với mã giả ngẫu nhiên của từng vệ tinh để khóa thời gian.
2. **Phát hiện chu kỳ (nhịp tim, giọng nói, máy móc):** autocorrelation tìm đỉnh phụ → chu kỳ cơ bản (pitch của giọng nói, BPM của tim, tần số rung của trục máy → chẩn đoán hỏng hóc).
3. **Nhận dạng mẫu / template matching:** so khớp một dạng sóng mong đợi (QRS của tim, một ký tự Morse, một đoạn vân tay âm thanh) trong dòng dữ liệu dài.
4. **Đồng bộ (synchronization):** đầu thu tìm "chuỗi mở đầu" (preamble) đã biết trong luồng bit bằng correlation để biết khung dữ liệu bắt đầu ở đâu (Wi-Fi, Bluetooth).
5. **Đo độ tương tự ảnh (image registration):** cross-correlation 2D căn chỉnh hai ảnh chụp lệch nhau (y học, vệ tinh).

---

## Bài tập

> Làm trước, rồi đối chiếu mục **Lời giải chi tiết**. Các bài dùng quy ước: chỉ số ngoài phạm vi tín hiệu coi như 0.

**Bài 1.** Cho `x = [1, 0, -1]`, `y = [2, 3]`. Tính $(x \star y)[m]$ cho $m = -1, 0, 1$ theo công thức $\sum_n x[n]y[n+m]$.

**Bài 2.** Cho `x = [2, 1, 2, 1, 2, 1]`. Tính tự tương quan $R_x[0], R_x[1], R_x[2]$ và xác định chu kỳ ẩn.

**Bài 3.** Một tín hiệu thu `x = [0, 0, 3, 1, 0]` chứa template `h = [3, 1]`. Trượt template, tính độ khớp tại các vị trí $m=0,1,2,3$ và chỉ ra vị trí mẫu xuất hiện.

**Bài 4.** Tính năng lượng $E$ và công suất $P$ của: (a) `[6, 8]`; (b) `[1, -1, 1, -1, 1]`; (c) `[0, 0, 10]`.

**Bài 5.** Giải thích bằng lời (không cần công thức dài) vì sao $R_x[0]$ luôn là giá trị lớn nhất của hàm tự tương quan, và nó liên hệ thế nào với năng lượng tín hiệu.

**Bài 6 (vận dụng).** Hai micro thu cùng một tiếng vỗ tay, micro 2 đặt xa hơn nên trễ. Bản ghi (rút gọn): `mic1 = [0, 5, 1, 0, 0]`, `mic2 = [0, 0, 0, 5, 1]`. Dùng cross-correlation tìm độ trễ (số mẫu) giữa hai micro.

---

## Lời giải chi tiết

### Bài 1

$x=[1,0,-1]$ (n=0,1,2), $y=[2,3]$ (n=0,1). Công thức $(x\star y)[m]=\sum_n x[n]y[n+m]$.

- **$m=-1$:** cần $y[n-1]$: $x[1]y[0]+x[2]y[1] = 0\cdot2 + (-1)\cdot3 = -3$.
- **$m=0$:** $x[0]y[0]+x[1]y[1] = 1\cdot2 + 0\cdot3 = 2$.
- **$m=1$:** $x[0]y[1] = 1\cdot3 = 3$. (các số hạng khác cần $y[2],y[3]=0$.)

Kết quả: $(x\star y)[-1,0,1] = [-3,\ 2,\ 3]$.

### Bài 2

$x=[2,1,2,1,2,1]$ (6 mẫu).

- $R_x[0]=\sum x[n]^2 = 2^2+1^2+2^2+1^2+2^2+1^2 = 4+1+4+1+4+1 = 15$.
- $R_x[1]=\sum x[n]x[n+1] = (2)(1)+(1)(2)+(2)(1)+(1)(2)+(2)(1) = 2+2+2+2+2 = 10$.
- $R_x[2]=\sum x[n]x[n+2] = (2)(2)+(1)(1)+(2)(2)+(1)(1) = 4+1+4+1 = 10$.

So đỉnh phụ: $R_x[2]=10$ **cao** (các mẫu cách 2 trùng giá trị: 2↔2, 1↔1), trong khi $R_x[1]=10$ ở đây cũng cao do trị 1,2 gần nhau — nhưng cấu trúc lặp đúng là **mỗi 2 mẫu**: `[2,1]` lặp lại. Chu kỳ $P=2$. (Tự tương quan chuẩn hóa: $R_x[2]/R_x[0]=10/15\approx0.67$ là đỉnh phụ tại $m=2$ ⟹ xác nhận chu kỳ 2.)

### Bài 3

$x=[0,0,3,1,0]$, $h=[3,1]$. Độ khớp $y[m]=\sum_k x[m+k]h[k]$, cửa sổ độ dài 2:

- $m=0$: $x[0]h[0]+x[1]h[1] = 0\cdot3+0\cdot1 = 0$.
- $m=1$: $x[1]h[0]+x[2]h[1] = 0\cdot3+3\cdot1 = 3$.
- $m=2$: $x[2]h[0]+x[3]h[1] = 3\cdot3+1\cdot1 = 10$ ← **lớn nhất**.
- $m=3$: $x[3]h[0]+x[4]h[1] = 1\cdot3+0\cdot1 = 3$.

Đỉnh tại $m=2$ ⟹ template `[3,1]` bắt đầu tại vị trí **2**. ✓ (đúng: $x[2]=3, x[3]=1$.)

### Bài 4

- **(a) `[6,8]`:** $E=6^2+8^2=36+64=100$; $N=2$ ⟹ $P=50$.
- **(b) `[1,-1,1,-1,1]`:** $E=5\times1=5$; $N=5$ ⟹ $P=1$.
- **(c) `[0,0,10]`:** $E=0+0+100=100$; $N=3$ ⟹ $P=100/3\approx33.3$.

### Bài 5

$R_x[0]=\sum_n x[n]\,x[n+0]=\sum_n x[n]^2 = E \geq 0$. Với $m\neq0$, theo bất đẳng thức Cauchy–Schwarz, $|R_x[m]| = |\sum_n x[n]x[n+m]| \leq \sqrt{\sum x[n]^2}\sqrt{\sum x[n+m]^2} = E$. Dấu bằng chỉ xảy ra khi tín hiệu dịch trùng khít chính nó — tức tại $m=0$ (hoặc bội số chu kỳ với tín hiệu tuần hoàn lý tưởng). Vậy $R_x[0]=E$ là **đỉnh tuyệt đối**, và nó đúng bằng **năng lượng** tín hiệu. Trực giác: tín hiệu giống chính nó nhất khi không dịch — mọi đỉnh chồng đỉnh, mọi đáy chồng đáy.

### Bài 6

Tính cross-correlation $(\text{mic1}\star\text{mic2})[m]=\sum_n \text{mic1}[n]\,\text{mic2}[n+m]$. mic1 có xung lớn (5) tại $n=1$; mic2 có xung lớn (5) tại $n=3$. Đỉnh tương quan xuất hiện khi dịch mic2 sao cho xung của nó chồng xung mic1, tức $n+m=3$ khi $n=1$ ⟹ $m=2$.

Kiểm tra $m=2$: $\sum_n \text{mic1}[n]\,\text{mic2}[n+2] = \text{mic1}[1]\,\text{mic2}[3]+\text{mic1}[2]\,\text{mic2}[4] = 5\cdot5+1\cdot1 = 26$ — đỉnh. Vậy mic2 **trễ 2 mẫu** so với mic1. (Biết tốc độ âm thanh và tần số lấy mẫu, từ độ trễ này suy ra hiệu khoảng cách tới nguồn — nguyên lý định vị nguồn âm.)

---

## Kết thúc Tier 1 — Bước sang Tier 2

Bạn đã hoàn tất **Tier 1 — Foundations** của Signal Processing: tín hiệu rời rạc, lấy mẫu, tích chập, và giờ là tương quan & năng lượng. Điểm chung của cả Tier 1: nhìn tín hiệu trong **miền thời gian**.

Tier 2 đổi góc nhìn hoàn toàn — phân tích tín hiệu thành **các thành phần tần số**:

- **Bài tiếp theo:** [Tier 2 · Lesson 01 — Chuỗi Fourier (Fourier Series)](../../02-Fourier/lesson-01-fourier-series/) — mọi tín hiệu tuần hoàn là tổng các sin/cos.
- **Preview Parseval đầy đủ:** [Tier 2 · Lesson 03 — Biến đổi Fourier (Fourier Transform)](../../02-Fourier/lesson-03-fourier-transform/) — nơi định lý Parseval được phát biểu và chứng minh đầy đủ, và Wiener–Khinchin nối autocorrelation với phổ.

## Tham khảo

- [Lesson 04 — Tích chập (Convolution)](../lesson-04-convolution/) — anh em sinh đôi của tương quan.
- [Statistics — Tương quan hai biến](../../../Statistics/01-Descriptive/lesson-05-bivariate-correlation/) — gốc thống kê của hệ số tương quan.
- [Minh họa tương tác (visualization.html)](./visualization.html) — cross-correlation stepper, tìm tín hiệu trong nhiễu, máy tính năng lượng/Parseval.
