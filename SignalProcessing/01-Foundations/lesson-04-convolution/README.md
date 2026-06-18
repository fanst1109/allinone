# Lesson 04 — Tích chập (Convolution) & hệ LTI

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Hiểu **vì sao** tích chập (convolution) là phép toán nền tảng của việc **lọc (filtering)** tín hiệu và của **mạng tích chập (CNN)** trong AI.
- Tính được tích chập rời rạc $(x * h)[n] = \sum_k x[k]\,h[n-k]$ bằng tay theo quy trình **lật–trượt–nhân–cộng**.
- Nắm các tính chất: giao hoán, kết hợp, phân phối, và vai trò của **xung đơn vị (unit impulse)** $\delta$.
- Hiểu **hệ tuyến tính bất biến thời gian (LTI system)** và vì sao **đáp ứng xung (impulse response)** $h[n]$ đặc trưng hoàn toàn cho hệ.
- Áp dụng tích chập để **làm mượt (smoothing)**, **phát hiện cạnh (edge detection)**, tạo **tiếng vọng (echo)**.
- Biết liên hệ tới **định lý tích chập** (convolution ↔ nhân trong miền tần số) và tới CNN.

## Kiến thức tiền đề

- [L01 — Tín hiệu cơ bản](../lesson-01-signals-basics/) — khái niệm tín hiệu rời rạc $x[n]$, lấy mẫu.
- [L03 — Tổng hợp sóng](../lesson-03-wave-superposition/) — tính tuyến tính, cộng dồn nhiều thành phần.

## 1. Vì sao học tích chập?

💡 **Trực giác / Hình dung.** Bạn có một tín hiệu nhiễu (noisy) — ví dụ nhịp tim đo bằng cảm biến rẻ tiền, đầy gai lởm chởm. Bạn muốn **làm mịn (smoothing)** nó: mỗi điểm output là **trung bình của vài điểm lân cận**. Câu hỏi đặt ra:

> **Làm mịn một tín hiệu nhiễu — thực chất là phép toán gì?**

Câu trả lời (sẽ chứng minh trong bài): đó **chính là tích chập** của tín hiệu với một "cửa sổ trung bình" (moving average kernel). Không chỉ làm mịn — **mọi bộ lọc tuyến tính bất biến thời gian** (low-pass, high-pass, làm nét, dò cạnh, tạo echo...) đều là một phép tích chập với một dãy số $h$ nào đó.

Vì sao điều này quan trọng:

- **Lọc tín hiệu (Tier 3)**: thiết kế bộ lọc = chọn dãy $h$ phù hợp rồi tích chập.
- **CNN trong AI** ([AI-ML](../../../AI-ML/)): lớp "convolution" trong mạng nơ-ron chính là tích chập 2 chiều của ảnh với các kernel học được — dò cạnh, dò góc, dò texture.
- **Xử lý ảnh**: làm mờ Gaussian, làm nét (sharpen), dò biên Sobel — tất cả là tích chập 2D.

→ Hiểu tích chập = hiểu "bộ máy" chung đứng sau hầu hết mọi thao tác xử lý tín hiệu và thị giác máy tính.

📝 **Tóm tắt mục 1.**
- Làm mịn = lấy trung bình lân cận = tích chập với kernel trung bình.
- Mọi bộ lọc LTI = tích chập với một dãy $h$.
- Tích chập là nền của lọc tín hiệu (Tier 3) và của CNN.

## 2. Tích chập rời rạc — định nghĩa

### 2.1. Định nghĩa 3 phần

**(a) Là gì.** Tích chập rời rạc của hai dãy $x$ và $h$ là một dãy mới $y = x * h$ định nghĩa bởi:

$$y[n] = (x * h)[n] = \sum_{k=-\infty}^{+\infty} x[k]\,h[n-k]$$

Mỗi mẫu output $y[n]$ là tổng của các tích: lấy $x[k]$ nhân với $h$ **đã bị lật và dịch** sao cho gốc của $h$ rơi vào vị trí $n$, rồi cộng tất cả lại.

**(b) Vì sao tồn tại / vì sao cần.** Một hệ LTI (xem §5) biến input thành output. Hóa ra: nếu ta biết hệ phản ứng thế nào với **một xung đơn lẻ** (đáp ứng xung $h$), thì với **bất kỳ** input nào, output luôn tính được bằng đúng công thức trên. Tích chập là **công thức phổ quát** liên kết input – hệ – output. Không cần tích chập thì ta phải mô tả lại hệ cho từng input riêng — bất khả thi.

**(c) Ví dụ trực giác bằng số.** Cho $x = [1, 2, 3]$ (tại $n = 0, 1, 2$) và $h = [1, 1]$ (tại $n = 0, 1$). Đây là kernel "trung bình trượt chưa chuẩn hóa" — cộng mỗi mẫu với mẫu liền trước. Kết quả (tính chi tiết ở §2.2): $y = [1, 3, 5, 3]$. Hãy đọc nó: $y[1] = x[1] + x[0] = 2 + 1 = 3$ — đúng là "tổng 2 mẫu liền kề".

### 2.2. Walk-through đầy đủ: $x = [1,2,3]$, $h = [1,1]$

Độ dài kết quả: nếu $x$ dài $L_x$ và $h$ dài $L_h$ thì $y$ dài $L_x + L_h - 1 = 3 + 2 - 1 = 4$. Vậy $y$ có chỉ số $n = 0, 1, 2, 3$.

Công thức rút gọn (vì $x$ chỉ khác 0 tại $k = 0,1,2$ và $h$ chỉ khác 0 tại $n-k \in \{0,1\}$):

$$y[n] = \sum_{k} x[k]\,h[n-k]$$

**Bước $n = 0$:** cần $h[0-k]$ khác 0 → $0 - k \in \{0,1\}$ → $k \in \{-1, 0\}$. Chỉ $k = 0$ hợp lệ (vì $x[-1] = 0$).
$$y[0] = x[0]\,h[0] = 1 \cdot 1 = 1$$

**Bước $n = 1$:** cần $1 - k \in \{0,1\}$ → $k \in \{0, 1\}$.
$$y[1] = x[0]\,h[1] + x[1]\,h[0] = 1 \cdot 1 + 2 \cdot 1 = 1 + 2 = 3$$

**Bước $n = 2$:** cần $2 - k \in \{0,1\}$ → $k \in \{1, 2\}$.
$$y[2] = x[1]\,h[1] + x[2]\,h[0] = 2 \cdot 1 + 3 \cdot 1 = 2 + 3 = 5$$

**Bước $n = 3$:** cần $3 - k \in \{0,1\}$ → $k \in \{2, 3\}$. Chỉ $k = 2$ hợp lệ.
$$y[3] = x[2]\,h[1] = 3 \cdot 1 = 3$$

**Kết quả:** $y = [1, 3, 5, 3]$.

**Verify bằng cách khác (phân phối từng mẫu của $h$).** Vì $h = \delta_0 + \delta_1$ (một xung tại 0 và một xung tại 1), tích chập với $h$ = "bản gốc" + "bản dịch phải 1 ô" rồi cộng:

```
x dịch 0:   1  2  3
x dịch 1:      1  2  3
-----------------------
cộng:       1  3  5  3   ✓
```

Hai cách cho cùng $y = [1,3,5,3]$ → đúng.

🔁 **Dừng lại tự kiểm tra.** Tính $y[2]$ cho $x = [2, 0, 1]$, $h = [1, 1]$.
<details><summary>Đáp án</summary>

$y[2] = x[1]h[1] + x[2]h[0] = 0\cdot1 + 1\cdot1 = 1$. (Toàn bộ: $y = [2, 2, 1, 1]$.)
</details>

## 3. Trực giác "lật–trượt–nhân–cộng"

💡 **Trực giác.** Tích chập là một thủ tục cơ học gồm 4 động tác, lặp lại cho mỗi vị trí $n$:

1. **Lật (flip)**: đảo ngược dãy $h$ theo thời gian → $h[-k]$. (Đây là khác biệt mấu chốt so với tương quan — xem §3.5.)
2. **Trượt (slide)**: dịch $h$ đã lật tới vị trí $n$ → $h[n-k]$.
3. **Nhân (multiply)**: nhân từng cặp $x[k] \cdot h[n-k]$ tại các chỉ số chồng nhau.
4. **Cộng (sum)**: cộng các tích → ra $y[n]$.

### 3.1. Ví dụ 1 — Xung đơn vị $\delta$ (đối chứng)

$x = [5, 7, 9]$, $h = [1]$ (xung đơn vị $\delta$, dài 1).
- $y[0] = 5\cdot1 = 5$; $y[1] = 7\cdot1 = 7$; $y[2] = 9\cdot1 = 9$.
- $y = [5, 7, 9]$ — **giữ nguyên** input. Tích chập với $\delta$ không đổi gì (xem §4.4).

### 3.2. Ví dụ 2 — Moving average 2 điểm (làm mượt thô)

$x = [4, 8, 0, 8]$, $h = [0.5, 0.5]$ (trung bình 2 mẫu liền kề).
- $y[0] = 4\cdot0.5 = 2$
- $y[1] = 4\cdot0.5 + 8\cdot0.5 = 2 + 4 = 6$
- $y[2] = 8\cdot0.5 + 0\cdot0.5 = 4 + 0 = 4$
- $y[3] = 0\cdot0.5 + 8\cdot0.5 = 0 + 4 = 4$
- $y[4] = 8\cdot0.5 = 4$
- $y = [2, 6, 4, 4, 4]$ — các đỉnh nhọn $[4,8,0,8]$ bị "san phẳng" bớt. Đây chính là smoothing.

### 3.3. Ví dụ 3 — Kernel dò cạnh $[-1, 1]$

$x = [3, 3, 3, 9, 9]$ (một "bậc thang" nhảy từ 3 lên 9), $h = [-1, 1]$.

Tích chập với $[-1,1]$ tính **độ chênh** giữa hai mẫu kề:
- $y[0] = 3\cdot(-1) = -3$
- $y[1] = 3\cdot1 + 3\cdot(-1) = 3 - 3 = 0$
- $y[2] = 3\cdot1 + 3\cdot(-1) = 0$
- $y[3] = 3\cdot1 + 9\cdot(-1) = 3 - 9 = -6$
- $y[4] = 9\cdot1 + 9\cdot(-1) = 0$
- $y[5] = 9\cdot1 = 9$
- $y = [-3, 0, 0, -6, 0, 9]$ — bỏ qua hai mẫu biên ($y[0], y[5]$), giá trị **khác 0** xuất hiện đúng ở chỗ tín hiệu **thay đổi** (tại $n=3$, giá trị $-6$). Vùng phẳng → 0. Đó là "dò cạnh".

### 3.4. Ví dụ 4 — Echo (tiếng vọng)

$x = [1, 0, 0]$ (một tiếng "tách"), $h = [1, 0, 0.5]$ (gốc + bản nhỏ trễ 2 ô).
- $y[0] = 1\cdot1 = 1$
- $y[1] = 0$
- $y[2] = 1\cdot0.5 = 0.5$
- $y = [1, 0, 0.5, 0, 0]$ — âm gốc ở $n=0$, "vọng lại" nhỏ hơn (0.5) ở $n=2$. Đó là echo.

### 3.5. Lật hay không lật?

⚠ **Lỗi thường gặp — quên lật $h$.** Nhiều người tính nhầm tích chập thành **tương quan (cross-correlation)**:
$$\text{corr}: \;\sum_k x[k]\,h[n+k] \quad (\text{KHÔNG lật}) \qquad\text{vs}\qquad \text{conv}: \;\sum_k x[k]\,h[n-k] \;(\text{CÓ lật})$$
- Với kernel **đối xứng** ($h = [1,2,1]$, $h = [0.5,0.5]$) — lật không đổi gì, hai phép trùng nhau, nên dễ tưởng "không cần lật".
- Với kernel **bất đối xứng** ($h = [-1, 1]$) — lật đổi dấu kết quả! Conv dùng $[-1,1]$ cho output ngược dấu so với corr. CNN trong deep learning thực ra dùng **tương quan** (không lật) nhưng vẫn gọi là "convolution" — một quy ước gây nhầm lẫn kinh điển. Tương quan sẽ học kỹ ở [L05 — Tương quan & Năng lượng](../lesson-05-correlation-energy/).

⚠ **Lỗi thường gặp — chỉ số biên (boundary).** Khi $h$ trượt ra ngoài rìa $x$, các mẫu thiếu được coi là 0 ("zero-padding"). Vì thế output dài hơn input ($L_x + L_h - 1$). Nếu muốn output cùng độ dài input, ta cắt ("same" mode) hoặc chỉ giữ phần chồng đầy đủ ("valid" mode). Sai lầm phổ biến: quên rằng biên dùng giá trị 0 → tính thiếu mẫu đầu/cuối.

❓ **Câu hỏi tự nhiên của người đọc.**
- *"Vì sao phải lật?"* — Lật đảm bảo tính chất nhân quả/giao hoán và khớp với cách hệ LTI thực sự cộng dồn các đáp ứng xung trễ (xem §5). Trực giác: mẫu input đến **sớm hơn** đóng góp vào output qua phần **đuôi** của $h$.
- *"Tích chập có đắt không?"* — Trực tiếp tốn $O(L_x \cdot L_h)$ phép nhân. Với $h$ ngắn (kernel 3–5 phần tử) thì rẻ. Với $h$ dài, dùng FFT đưa về $O(N \log N)$ nhờ định lý tích chập (§7).

🔁 **Dừng lại tự kiểm tra.** Tích chập $x = [1, 2]$ với $h = [3, 4]$ cho ra gì?
<details><summary>Đáp án</summary>

$y[0] = 1\cdot3 = 3$; $y[1] = 1\cdot4 + 2\cdot3 = 4 + 6 = 10$; $y[2] = 2\cdot4 = 8$. → $y = [3, 10, 8]$.
</details>

📝 **Tóm tắt mục 3.**
- Quy trình: lật $h$ → trượt tới $n$ → nhân từng cặp chồng nhau → cộng.
- Output dài $L_x + L_h - 1$; biên dùng zero-padding.
- $\delta$ giữ nguyên; trung bình → mượt; $[-1,1]$ → dò cạnh; xung trễ → echo.
- Conv **lật**, correlation **không lật** — khác nhau ở kernel bất đối xứng.

## 4. Tính chất của tích chập

Cho ba dãy $x, h, g$.

### 4.1. Giao hoán (commutative)

$$x * h = h * x$$

**Ví dụ.** $[1,2] * [3,4]$: ở §3 ta được $[3,10,8]$. Đổi vai trò: $[3,4] * [1,2]$:
- $y[0] = 3\cdot1 = 3$; $y[1] = 3\cdot2 + 4\cdot1 = 6 + 4 = 10$; $y[2] = 4\cdot2 = 8$. → $[3,10,8]$ ✓ giống hệt.

→ Hệ quả thực dụng: "tín hiệu qua bộ lọc" và "bộ lọc qua tín hiệu" cho cùng kết quả; ta tự do chọn dãy nào trượt.

### 4.2. Kết hợp (associative)

$$(x * h) * g = x * (h * g)$$

**Ví dụ.** $x = [1,1]$, $h = [1,1]$, $g = [1,1]$.
- $x * h = [1, 2, 1]$. Rồi $(x*h)*g = [1,2,1]*[1,1] = [1, 3, 3, 1]$.
- $h * g = [1,2,1]$. Rồi $x*(h*g) = [1,1]*[1,2,1] = [1, 3, 3, 1]$ ✓.

→ Hệ quả: nối hai bộ lọc nối tiếp = một bộ lọc duy nhất $h*g$. Có thể "gộp" bộ lọc trước để tính nhanh.

### 4.3. Phân phối (distributive) với phép cộng

$$x * (h + g) = x * h + x * g$$

**Ví dụ.** $x = [1,2]$, $h = [1,0]$, $g = [0,1]$ → $h + g = [1,1]$.
- $x * (h+g) = [1,2]*[1,1] = [1, 3, 2]$.
- $x*h = [1,2]*[1,0] = [1,2,0]$; $x*g = [1,2]*[0,1] = [0,1,2]$. Cộng: $[1, 3, 2]$ ✓.

→ Hệ quả: cộng song song hai bộ lọc = bộ lọc tổng. Đây là tính **tuyến tính** (link tới [L03 — Tổng hợp sóng](../lesson-03-wave-superposition/)).

### 4.4. Phần tử đơn vị — xung đơn vị $\delta$

$$x * \delta = x, \qquad \text{với } \delta = [\,\ldots,0,1,0,\ldots\,] \text{ (1 tại } n=0).$$

**Ví dụ 1.** $x = [5,7,9]$, $\delta = [1]$ → $x * \delta = [5,7,9]$ (đã thấy ở §3.1).

**Ví dụ 2 — xung trễ.** $\delta_2 = [0,0,1]$ (1 tại $n=2$). $x * \delta_2 = [0, 0, 5, 7, 9]$ — **dịch phải 2 ô**. → Tích chập với xung trễ = trễ tín hiệu. Đây là "đường trễ (delay line)" — viên gạch của echo/reverb.

**Ví dụ 3.** $x = [2, -1]$, $\delta = [1]$ → $[2, -1]$ (giữ nguyên).

**Ví dụ 4.** $x = [9]$, $\delta_1 = [0, 1]$ → $[0, 9]$ (trễ 1 ô).

❓ **Câu hỏi tự nhiên.** *"$\delta$ giống số 1 trong phép nhân?"* — Đúng. $\delta$ là **phần tử trung hòa (identity)** của tích chập, hệt như 1 với nhân hay 0 với cộng. Mọi tín hiệu là tổng các xung trễ có trọng số: $x = \sum_k x[k]\,\delta_k$ — đây là chìa khóa chứng minh công thức LTI ở §5.

📝 **Tóm tắt mục 4.**
- Giao hoán, kết hợp, phân phối — tích chập "hành xử như phép nhân".
- $\delta$ là phần tử đơn vị: $x * \delta = x$; $x * \delta_m$ = dịch trễ $m$ ô.
- Nối tiếp bộ lọc = $h*g$; song song = $h+g$.

## 5. Hệ tuyến tính bất biến thời gian (LTI)

### 5.1. Định nghĩa 3 phần

**(a) Là gì.** Một **hệ (system)** $T$ nhận input $x[n]$, trả output $y[n] = T\{x\}$. Hệ là **LTI** nếu thỏa 2 tính chất:

- **Tuyến tính (linear)**: $T\{a\,x_1 + b\,x_2\} = a\,T\{x_1\} + b\,T\{x_2\}$ (xếp chồng — superposition).
- **Bất biến thời gian (time-invariant)**: nếu $x[n] \mapsto y[n]$ thì $x[n-m] \mapsto y[n-m]$ — dịch input bao nhiêu thì output dịch bấy nhiêu, hình dạng không đổi.

**(b) Vì sao cần.** Phần lớn bộ lọc thực tế (mạch RC, bộ lọc số FIR, làm mượt ảnh) đều là LTI. Với hệ LTI có một **định lý nền tảng**: chỉ cần biết hệ phản ứng với **một xung** là biết toàn bộ hệ. Điều này biến một hệ "hộp đen" phức tạp thành một dãy số $h$ duy nhất + một phép tích chập.

**(c) Ví dụ trực giác bằng số.** Hệ "lấy trung bình 2 mẫu": $y[n] = \tfrac12(x[n] + x[n-1])$.
- Kiểm tra tuyến tính: gấp đôi input → gấp đôi output ✓; cộng hai input → cộng hai output ✓.
- Kiểm tra bất biến: dịch input phải 1 ô → output cũng dịch phải 1 ô ✓.
→ Đây là hệ LTI, và như §6 sẽ thấy, nó tương đương tích chập với $h = [0.5, 0.5]$.

### 5.2. Đáp ứng xung (impulse response) đặc trưng hoàn toàn cho hệ

**Đáp ứng xung** $h[n] = T\{\delta\}[n]$ là output của hệ khi input là một xung đơn vị $\delta$.

**Định lý (output = input * h).** Với hệ LTI bất kỳ:
$$y[n] = T\{x\}[n] = (x * h)[n] = \sum_k x[k]\,h[n-k]$$

**Chứng minh từng bước** (không bỏ qua bước nào):

1. Mọi tín hiệu viết được thành tổng xung có trọng số: $x[n] = \sum_k x[k]\,\delta[n-k]$. (Vì $\delta[n-k] = 1$ chỉ khi $n=k$, nên vế phải tại $n$ bằng đúng $x[n]$.)
2. Áp $T$ và dùng **tuyến tính** (đưa $T$ vào trong tổng, hằng số $x[k]$ ra ngoài): $y[n] = T\Big\{\sum_k x[k]\,\delta[n-k]\Big\} = \sum_k x[k]\,T\{\delta[n-k]\}$.
3. Dùng **bất biến thời gian**: $T\{\delta\} = h$, nên $T\{\delta[n-k]\} = h[n-k]$ (xung trễ $k$ → đáp ứng trễ $k$).
4. Thay vào: $y[n] = \sum_k x[k]\,h[n-k] = (x*h)[n]$. $\blacksquare$

→ Ý nghĩa: muốn biết hệ làm gì với **bất kỳ** input nào, chỉ cần đo $h$ (gõ một "tiếng tách" vào hệ và ghi lại phản ứng), rồi tích chập.

🔁 **Dừng lại tự kiểm tra.** Hệ "khuếch đại gấp 3 rồi trễ 1 ô": $y[n] = 3x[n-1]$. Đáp ứng xung $h$ là gì?
<details><summary>Đáp án</summary>

Cho $x = \delta = [1]$: $y[n] = 3\delta[n-1]$ → $h = [0, 3]$ (giá trị 3 tại $n=1$). Kiểm tra: $x*[0,3]$ = nhân 3 và trễ 1 ô ✓.
</details>

📝 **Tóm tắt mục 5.**
- LTI = tuyến tính + bất biến thời gian.
- $h = T\{\delta\}$ đặc trưng hoàn toàn hệ.
- Output = input * $h$ — chứng minh từ "tín hiệu = tổng xung có trọng số" + 2 tính chất LTI.

## 6. Ví dụ bộ lọc thực tế

### 6.1. Moving average — làm mượt (low-pass)

Kernel chuẩn hóa $h = [\tfrac13, \tfrac13, \tfrac13]$ (trung bình 3 mẫu). Với $x = [0, 9, 0, 9, 0]$ (răng cưa):
- $y[1] = \tfrac13(0+9+0) = 3$; $y[2] = \tfrac13(9+0+9) = 6$; $y[3] = \tfrac13(0+9+0) = 3$.
- Biên độ dao động giảm từ 9 xuống 3–6 → tín hiệu **mượt** hơn. Kernel càng rộng, càng mượt (nhưng càng "mờ" chi tiết). Đây là bộ lọc **thông thấp (low-pass)** — giữ thành phần biến đổi chậm, bỏ thành phần nhanh.

### 6.2. Phát hiện cạnh — kernel $[-1, 1]$ (high-pass)

Với $x = [2, 2, 2, 8, 8, 8]$:
- $y[3] = x[3]\cdot1 + x[2]\cdot(-1) = 8 - 2 = 6$ — đỉnh đúng tại bậc nhảy.
- Vùng phẳng cho 0. → Giữ chỗ **thay đổi**, bỏ chỗ phẳng — bộ lọc **thông cao (high-pass)**. Trong ảnh, kernel kiểu này (Sobel, Laplacian) dò biên đối tượng.

### 6.3. Làm nét (sharpen) — kernel $[-1, 3, -1]$

Với $x = [4, 4, 9, 4, 4]$ (một đỉnh):
- $y[2] = -1\cdot4 + 3\cdot9 + (-1)\cdot4 = -4 + 27 - 4 = 19$ — đỉnh được **đẩy cao hơn** (9 → 19), tương phản tăng. Đó là sharpen = gốc + đạo hàm bậc hai âm.

### 6.4. Echo — kernel $[1, 0, 0, 0.6]$

Với một "tách" $x = [1]$: $y = [1, 0, 0, 0.6]$ — âm gốc rồi vọng 0.6 sau 3 mẫu. Chồng nhiều bản trễ giảm dần → reverb. Mỗi "phòng" có một $h$ (impulse response của phòng) riêng — thu $h$ thật của một nhà thờ rồi tích chập giọng nói → nghe như hát trong nhà thờ (convolution reverb).

📝 **Tóm tắt mục 6.**
- Trung bình → low-pass (mượt); $[-1,1]$ → high-pass (dò cạnh); $[-1,3,-1]$ → sharpen; xung trễ → echo/reverb.
- Thiết kế bộ lọc = chọn kernel $h$ thích hợp.

## 7. Liên hệ — định lý tích chập & CNN

### 7.1. Định lý tích chập (preview Fourier)

Tích chập trong miền thời gian **đắt** ($O(N^2)$). Định lý tích chập nói:

$$\mathcal{F}\{x * h\} = \mathcal{F}\{x\} \cdot \mathcal{F}\{h\}$$

— tích chập ở miền thời gian = **phép nhân từng điểm** ở miền tần số. Quy trình nhanh: biến đổi Fourier (FFT) cả hai, nhân, rồi biến đổi ngược. Tổng chi phí $O(N \log N)$ — nhanh hơn hẳn khi $N$ lớn. Sẽ học kỹ ở [L03 Tier 2 — Biến đổi Fourier](../../02-Fourier/lesson-03-fourier-transform/).

→ Đây cũng giải thích "vì sao bộ lọc = nhân phổ tần số": làm mượt = **nhân phổ với một hàm chặn tần số cao**, tức là một phép nhân đơn giản trong miền tần số.

### 7.2. CNN trong AI

Lớp **convolution** trong CNN ([AI-ML](../../../AI-ML/)) là tích chập 2D của ảnh với các kernel nhỏ (3×3, 5×5). Khác biệt: kernel **không cố định mà được học** từ dữ liệu. Các kernel tầng đầu thường tự học thành bộ dò cạnh/góc (giống §6.2); tầng sâu hơn ghép lại thành bộ dò hình dạng, vật thể. (Lưu ý quy ước: CNN thực ra dùng **tương quan** — không lật — nhưng vẫn gọi "convolution", xem §3.5.)

📝 **Tóm tắt mục 7.**
- Định lý tích chập: conv (thời gian) ↔ nhân (tần số) → FFT cho $O(N\log N)$.
- CNN = tích chập 2D với kernel học được; nền của thị giác máy tính.

## Bài tập

1. **Tính tay.** Tích chập $x = [1, 2, 1]$ với $h = [1, -1]$. Cho đầy đủ từng bước và độ dài kết quả.
2. **Moving average.** Cho $x = [10, 0, 10, 0]$ và $h = [0.5, 0.5]$. Tính $y$ và nhận xét hiệu ứng làm mượt.
3. **Xung đơn vị.** Chứng minh $x * \delta_3 = x$ dịch phải 3 ô, với $x = [a, b, c]$ bất kỳ. ($\delta_3$ = xung tại $n=3$.)
4. **Giao hoán.** Kiểm chứng $[2, 3] * [1, 4] = [1, 4] * [2, 3]$ bằng cách tính cả hai vế.
5. **Đáp ứng xung.** Hệ $y[n] = x[n] - x[n-2]$. Tìm $h$, rồi dùng $h$ tích chập với $x = [1, 1, 1, 1]$ để kiểm tra khớp với công thức gốc.
6. **Dò cạnh.** Cho $x = [0, 0, 5, 5, 5, 0]$. Tích chập với $h = [-1, 1]$ và chỉ ra các vị trí "cạnh".

## Lời giải chi tiết

**Bài 1.** $L_y = 3 + 2 - 1 = 4$.
- $y[0] = x[0]h[0] = 1\cdot1 = 1$.
- $y[1] = x[0]h[1] + x[1]h[0] = 1\cdot(-1) + 2\cdot1 = -1 + 2 = 1$.
- $y[2] = x[1]h[1] + x[2]h[0] = 2\cdot(-1) + 1\cdot1 = -2 + 1 = -1$.
- $y[3] = x[2]h[1] = 1\cdot(-1) = -1$.
- **$y = [1, 1, -1, -1]$.**

**Bài 2.**
- $y[0] = 10\cdot0.5 = 5$.
- $y[1] = 10\cdot0.5 + 0\cdot0.5 = 5$.
- $y[2] = 0\cdot0.5 + 10\cdot0.5 = 5$.
- $y[3] = 10\cdot0.5 + 0\cdot0.5 = 5$.
- $y[4] = 0\cdot0.5 = 0$.
- **$y = [5, 5, 5, 5, 0]$.** Nhận xét: input dao động mạnh $[10,0,10,0]$ → output gần như hằng số 5 (trừ biên). Trung bình trượt đã "san phẳng" hoàn toàn dao động tần số cao — đúng bản chất low-pass.

**Bài 3.** $\delta_3 = [0,0,0,1]$ (1 tại $n=3$). Theo §4.4, tích chập với $\delta_m$ là dịch trễ $m$. Cụ thể:
$$(x*\delta_3)[n] = \sum_k x[k]\,\delta_3[n-k] = x[n-3]$$
vì $\delta_3[n-k] = 1$ chỉ khi $n - k = 3 \Leftrightarrow k = n-3$. Vậy $x = [a,b,c]$ → $x*\delta_3 = [0,0,0,a,b,c]$ — dịch phải đúng 3 ô. $\blacksquare$

**Bài 4.**
- $[2,3]*[1,4]$: $y[0]=2\cdot1=2$; $y[1]=2\cdot4+3\cdot1=8+3=11$; $y[2]=3\cdot4=12$ → $[2,11,12]$.
- $[1,4]*[2,3]$: $y[0]=1\cdot2=2$; $y[1]=1\cdot3+4\cdot2=3+8=11$; $y[2]=4\cdot3=12$ → $[2,11,12]$.
- Hai vế bằng nhau → giao hoán được kiểm chứng. ✓

**Bài 5.** Đáp ứng xung: cho $x=\delta=[1]$ → $y[n] = \delta[n] - \delta[n-2]$ → **$h = [1, 0, -1]$**.
Kiểm tra với $x = [1,1,1,1]$ ($L_y = 4+3-1 = 6$):
- $y[0] = 1\cdot1 = 1$.
- $y[1] = 1\cdot0 + 1\cdot1 = 1$.
- $y[2] = 1\cdot(-1) + 1\cdot0 + 1\cdot1 = -1 + 0 + 1 = 0$.
- $y[3] = 1\cdot(-1) + 1\cdot0 + 1\cdot1 = 0$.
- $y[4] = 1\cdot(-1) + 1\cdot0 = -1$.
- $y[5] = 1\cdot(-1) = -1$.
- $y = [1, 1, 0, 0, -1, -1]$. Đối chiếu công thức gốc $y[n] = x[n] - x[n-2]$ (coi ngoài biên là 0): $y[0]=1-0=1$, $y[1]=1-0=1$, $y[2]=1-1=0$, $y[3]=1-1=0$, $y[4]=0-1=-1$, $y[5]=0-1=-1$ ✓ khớp hoàn toàn.

**Bài 6.** $x = [0,0,5,5,5,0]$, $h = [-1,1]$ ($L_y = 6+2-1 = 7$):
- $y[0] = 0\cdot(-1) = 0$.
- $y[1] = 0\cdot1 + 0\cdot(-1) = 0$.
- $y[2] = 0\cdot1 + 5\cdot(-1) = -5$.
- $y[3] = 5\cdot1 + 5\cdot(-1) = 0$.
- $y[4] = 5\cdot1 + 5\cdot(-1) = 0$.
- $y[5] = 5\cdot1 + 0\cdot(-1) = 5$.
- $y[6] = 0\cdot1 = 0$.
- $y = [0, 0, -5, 0, 0, 5, 0]$. **Cạnh** xuất hiện ở $n=2$ (giá trị $-5$: cạnh lên 0→5) và $n=5$ (giá trị $5$: cạnh xuống 5→0). Vùng phẳng (trong khối 5 và khối 0) cho 0. Dấu cho biết hướng cạnh (do kernel bất đối xứng — xem §3.5).

## Tham khảo & Bài tiếp theo

- **Bài tiếp:** [L05 — Tương quan & Năng lượng](../lesson-05-correlation-energy/) — tương quan (không lật), năng lượng/công suất tín hiệu, matched filter.
- **Tiền đề liên quan:** [L01 — Tín hiệu cơ bản](../lesson-01-signals-basics/), [L03 — Tổng hợp sóng](../lesson-03-wave-superposition/).
- **Preview sâu hơn:** [Định lý tích chập trong Fourier](../../02-Fourier/lesson-03-fourier-transform/) — vì sao FFT làm tích chập nhanh.
- **Ứng dụng AI:** [AI-ML — CNN](../../../AI-ML/) — tích chập 2D với kernel học được.
- **Minh họa tương tác:** [visualization.html](./visualization.html) — convolution stepper, smoothing demo, thư viện kernel.
