# Lesson 08 — Ứng dụng tích phân

## Mục tiêu

- Tính **diện tích** giữa 2 đường cong.
- Tính **thể tích vật thể tròn xoay** (đĩa, vỏ trụ).
- **Độ dài cung** đường cong.
- **Giá trị trung bình** của hàm trên $[a, b]$.
- Ứng dụng vật lý: công, momen, khối tâm.

## Kiến thức tiền đề

- [Lesson 07 — Tích phân xác định](../lesson-07-definite-integral/).

---

## 1. Diện tích giữa 2 đường cong

Cho $f(x) \ge g(x)$ trên $[a, b]$:

$$S = \int_a^b [f(x) - g(x)]\,dx$$

💡 **Trực giác — cộng từng dải dọc mỏng**: Mọi ứng dụng tích phân trong bài này đều cùng một ý tưởng: **cắt thành lát mỏng, tính từng lát, cộng dồn**. Mỗi ứng dụng chỉ khác nhau ở chỗ "lát mỏng" trông như thế nào. Với diện tích giữa 2 đường, hãy hình dung cắt vùng cần tính thành **vô số dải dọc mỏng** rộng $dx$. Mỗi dải là một hình chữ nhật cao $f(x) - g(x)$ (từ "sàn" $g$ lên tới "trần" $f$), rộng $dx$ → diện tích dải $= [f(x) - g(x)]\,dx$. Cộng dồn mọi dải từ $x=a$ tới $x=b$ chính là tích phân.

<svg viewBox="0 0 480 285" style="max-width:480px;width:100%;height:auto;display:block;margin:14px auto;background:#f8fafc;border-radius:8px" role="img" aria-label="Diện tích giữa hai đường: trần f(x) và sàn g(x) trên [a, b], chia thành các dải dọc cao f − g rộng dx">
  <defs><marker id="ar1" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#1a202c"/></marker></defs>
  <g stroke="#e2e8f0" stroke-width="1">
<line x1="116.0" y1="230.0" x2="116.0" y2="32.0"/>
<line x1="380.0" y1="230.0" x2="380.0" y2="32.0"/>
</g>
  <line x1="44.0" y1="230.0" x2="468.0" y2="230.0" stroke="#1a202c" stroke-width="1.5" marker-end="url(#ar1)"/>
  <line x1="50.0" y1="236.0" x2="50.0" y2="10.0" stroke="#1a202c" stroke-width="1.5" marker-end="url(#ar1)"/>
  <text x="460.0" y="246.0" fill="#1a202c" font-size="13" text-anchor="start" font-style="italic">x</text>
  <text x="58.0" y="20.0" fill="#1a202c" font-size="13" text-anchor="start" font-style="italic">y</text>
  <line x1="116.0" y1="226.0" x2="116.0" y2="234.0" stroke="#1a202c" stroke-width="1.5"/>
  <text x="116.0" y="246.0" fill="#475569" font-size="11" text-anchor="middle">a</text>
  <line x1="380.0" y1="226.0" x2="380.0" y2="234.0" stroke="#1a202c" stroke-width="1.5"/>
  <text x="380.0" y="246.0" fill="#475569" font-size="11" text-anchor="middle">b</text>
  <path d="M 116.0,84.4 L 120.4,83.2 L 124.8,82.1 L 129.2,81.1 L 133.6,80.1 L 138.0,79.3 L 142.4,78.5 L 146.8,77.9 L 151.2,77.3 L 155.6,76.8 L 160.0,76.5 L 164.4,76.2 L 168.8,76.1 L 173.2,76.0 L 177.6,76.0 L 182.0,76.2 L 186.4,76.4 L 190.8,76.8 L 195.2,77.3 L 199.6,77.8 L 204.0,78.5 L 208.4,79.2 L 212.8,80.1 L 217.2,81.0 L 221.6,82.0 L 226.0,83.1 L 230.4,84.3 L 234.8,85.6 L 239.2,86.9 L 243.6,88.3 L 248.0,89.8 L 252.4,91.3 L 256.8,92.9 L 261.2,94.5 L 265.6,96.2 L 270.0,97.9 L 274.4,99.7 L 278.8,101.5 L 283.2,103.3 L 287.6,105.1 L 292.0,107.0 L 296.4,108.8 L 300.8,110.7 L 305.2,112.5 L 309.6,114.3 L 314.0,116.2 L 318.4,117.9 L 322.8,119.7 L 327.2,121.4 L 331.6,123.1 L 336.0,124.8 L 340.4,126.4 L 344.8,127.9 L 349.2,129.4 L 353.6,130.8 L 358.0,132.2 L 362.4,133.4 L 366.8,134.7 L 371.2,135.8 L 375.6,136.8 L 380.0,137.8 L 380.0,200.8 L 375.6,201.1 L 371.2,201.4 L 366.8,201.7 L 362.4,201.9 L 358.0,202.1 L 353.6,202.3 L 349.2,202.4 L 344.8,202.5 L 340.4,202.5 L 336.0,202.5 L 331.6,202.5 L 327.2,202.4 L 322.8,202.3 L 318.4,202.1 L 314.0,201.9 L 309.6,201.7 L 305.2,201.5 L 300.8,201.2 L 296.4,200.8 L 292.0,200.5 L 287.6,200.1 L 283.2,199.6 L 278.8,199.2 L 274.4,198.7 L 270.0,198.2 L 265.6,197.6 L 261.2,197.0 L 256.8,196.4 L 252.4,195.8 L 248.0,195.2 L 243.6,194.5 L 239.2,193.8 L 234.8,193.1 L 230.4,192.4 L 226.0,191.6 L 221.6,190.9 L 217.2,190.1 L 212.8,189.4 L 208.4,188.6 L 204.0,187.8 L 199.6,187.0 L 195.2,186.2 L 190.8,185.4 L 186.4,184.6 L 182.0,183.8 L 177.6,183.1 L 173.2,182.3 L 168.8,181.5 L 164.4,180.8 L 160.0,180.0 L 155.6,179.3 L 151.2,178.6 L 146.8,177.9 L 142.4,177.2 L 138.0,176.5 L 133.6,175.9 L 129.2,175.3 L 124.8,174.7 L 120.4,174.1 L 116.0,173.6 Z" fill="#93c5fd" stroke="#93c5fd" stroke-width="0" fill-opacity="0.45" stroke-linejoin="round"/>
  <rect x="237.0" y="86.2" width="27.5" height="107.2" rx="0" fill="#1d4ed8" fill-opacity="0.75" stroke="#1e3a8a" stroke-width="1.5"/>
  <path d="M 72.0,99.9 L 76.4,98.1 L 80.8,96.4 L 85.2,94.7 L 89.6,93.1 L 94.0,91.5 L 98.4,89.9 L 102.8,88.5 L 107.2,87.0 L 111.6,85.7 L 116.0,84.4 L 120.4,83.2 L 124.8,82.1 L 129.2,81.1 L 133.6,80.1 L 138.0,79.3 L 142.4,78.5 L 146.8,77.9 L 151.2,77.3 L 155.6,76.8 L 160.0,76.5 L 164.4,76.2 L 168.8,76.1 L 173.2,76.0 L 177.6,76.0 L 182.0,76.2 L 186.4,76.4 L 190.8,76.8 L 195.2,77.3 L 199.6,77.8 L 204.0,78.5 L 208.4,79.2 L 212.8,80.1 L 217.2,81.0 L 221.6,82.0 L 226.0,83.1 L 230.4,84.3 L 234.8,85.6 L 239.2,86.9 L 243.6,88.3 L 248.0,89.8 L 252.4,91.3 L 256.8,92.9 L 261.2,94.5 L 265.6,96.2 L 270.0,97.9 L 274.4,99.7 L 278.8,101.5 L 283.2,103.3 L 287.6,105.1 L 292.0,107.0 L 296.4,108.8 L 300.8,110.7 L 305.2,112.5 L 309.6,114.3 L 314.0,116.2 L 318.4,117.9 L 322.8,119.7 L 327.2,121.4 L 331.6,123.1 L 336.0,124.8 L 340.4,126.4 L 344.8,127.9 L 349.2,129.4 L 353.6,130.8 L 358.0,132.2 L 362.4,133.4 L 366.8,134.7 L 371.2,135.8 L 375.6,136.8 L 380.0,137.8 L 384.4,138.6 L 388.8,139.4 L 393.2,140.1 L 397.6,140.6 L 402.0,141.1 L 406.4,141.5 L 410.8,141.8 L 415.2,141.9 L 419.6,142.0 L 424.0,142.0" fill="none" stroke="#1d4ed8" stroke-width="2.5" stroke-linejoin="round"/>
  <path d="M 72.0,170.0 L 76.4,170.2 L 80.8,170.4 L 85.2,170.7 L 89.6,171.0 L 94.0,171.4 L 98.4,171.7 L 102.8,172.2 L 107.2,172.6 L 111.6,173.1 L 116.0,173.6 L 120.4,174.1 L 124.8,174.7 L 129.2,175.3 L 133.6,175.9 L 138.0,176.5 L 142.4,177.2 L 146.8,177.9 L 151.2,178.6 L 155.6,179.3 L 160.0,180.0 L 164.4,180.8 L 168.8,181.5 L 173.2,182.3 L 177.6,183.1 L 182.0,183.8 L 186.4,184.6 L 190.8,185.4 L 195.2,186.2 L 199.6,187.0 L 204.0,187.8 L 208.4,188.6 L 212.8,189.4 L 217.2,190.1 L 221.6,190.9 L 226.0,191.6 L 230.4,192.4 L 234.8,193.1 L 239.2,193.8 L 243.6,194.5 L 248.0,195.2 L 252.4,195.8 L 256.8,196.4 L 261.2,197.0 L 265.6,197.6 L 270.0,198.2 L 274.4,198.7 L 278.8,199.2 L 283.2,199.6 L 287.6,200.1 L 292.0,200.5 L 296.4,200.8 L 300.8,201.2 L 305.2,201.5 L 309.6,201.7 L 314.0,201.9 L 318.4,202.1 L 322.8,202.3 L 327.2,202.4 L 331.6,202.5 L 336.0,202.5 L 340.4,202.5 L 344.8,202.5 L 349.2,202.4 L 353.6,202.3 L 358.0,202.1 L 362.4,201.9 L 366.8,201.7 L 371.2,201.4 L 375.6,201.1 L 380.0,200.8 L 384.4,200.4 L 388.8,200.0 L 393.2,199.6 L 397.6,199.1 L 402.0,198.6 L 406.4,198.1 L 410.8,197.6 L 415.2,197.0 L 419.6,196.4 L 424.0,195.8" fill="none" stroke="#15803d" stroke-width="2.5" stroke-linejoin="round"/>
  <text x="430.0" y="146.0" fill="#1d4ed8" font-size="12" text-anchor="start" font-weight="700">trần f(x)</text>
  <text x="430.0" y="199.8" fill="#15803d" font-size="12" text-anchor="start" font-weight="700">sàn g(x)</text>
  <line x1="116.0" y1="230.0" x2="116.0" y2="84.4" stroke="#94a3b8" stroke-width="1.2" stroke-dasharray="4 3"/>
  <line x1="380.0" y1="230.0" x2="380.0" y2="137.8" stroke="#94a3b8" stroke-width="1.2" stroke-dasharray="4 3"/>
  <text x="272.5" y="72.2" fill="#1e3a8a" font-size="11" text-anchor="start" font-weight="700">một dải dọc: cao f(x) − g(x), rộng dx</text>
  <text x="250.8" y="260.0" fill="#1e3a8a" font-size="11" text-anchor="middle" font-weight="700">dx</text>
  <text x="240.0" y="272.0" fill="#1a202c" font-size="13" text-anchor="middle" font-weight="700">S = Σ (f − g)·dx  →  ∫ₐᵇ [f(x) − g(x)] dx</text>
</svg>

Diện tích = hiệu giữa diện tích "trần" ($f$) và "sàn" ($g$). **Quy trình 3 bước** áp dụng cho mọi bài:

> **Bước 1 — tìm cận**: giải $f(x) = g(x)$ để tìm các giao điểm → đó là cận tích phân.
>
> **Bước 2 — xác định trần/sàn**: thử một điểm trong khoảng, đường nào có giá trị lớn hơn là trần ($f$), nhỏ hơn là sàn ($g$).
>
> **Bước 3 — tích phân hiệu**: $S = \int (\text{trần} - \text{sàn})\,dx$.

### 1.1. Walk-through 3 ví dụ

**Ví dụ 1 — parabol và đường thẳng**: diện tích giới hạn bởi $y = x^2$ và $y = x$.
- **Bước 1** (cận): $x^2 = x \Rightarrow x^2 - x = 0 \Rightarrow x(x-1) = 0 \Rightarrow x = 0$ hoặc $x = 1$. Cận $[0, 1]$.
- **Bước 2** (trần/sàn): thử $x = 0.5$: $x = 0.5$, $x^2 = 0.25$ → $x > x^2$ → trần $= x$, sàn $= x^2$.
- **Bước 3** (tích phân):
$$S = \int_0^1 (x - x^2)\,dx = \left[\frac{x^2}{2} - \frac{x^3}{3}\right]_0^1 = \frac{1}{2} - \frac{1}{3} = \mathbf{\frac{1}{6}}.$$

**Ví dụ 2 — hai parabol** (cận không phải 0 và 1): diện tích giữa $y = x^2$ và $y = 2x - x^2$.
- **Bước 1** (cận): $x^2 = 2x - x^2 \Rightarrow 2x^2 - 2x = 0 \Rightarrow 2x(x-1) = 0 \Rightarrow x = 0, 1$.
- **Bước 2** (trần/sàn): thử $x = 0.5$: parabol thứ nhất $x^2 = 0.25$; parabol thứ hai $2(0.5) - 0.25 = 0.75$. Vậy $2x - x^2 > x^2$ → trần $= 2x - x^2$, sàn $= x^2$.
- **Bước 3**:
$$S = \int_0^1 \big[(2x - x^2) - x^2\big]\,dx = \int_0^1 (2x - 2x^2)\,dx = \left[x^2 - \frac{2x^3}{3}\right]_0^1 = 1 - \frac{2}{3} = \mathbf{\frac{1}{3}}.$$

**Ví dụ 3 — đường giao 3 lần, phải chia đoạn** (lỗi kinh điển): diện tích giữa $y = x^3$ và $y = x$ trên $[-1, 1]$.
- **Bước 1** (cận): $x^3 = x \Rightarrow x^3 - x = 0 \Rightarrow x(x-1)(x+1) = 0 \Rightarrow x = -1, 0, 1$. **Ba giao điểm** → trần/sàn đổi chỗ tại $x = 0$, phải chia làm 2 đoạn.
- **Bước 2** (trần/sàn từng đoạn):
  - Trên $(-1, 0)$, thử $x = -0.5$: $x^3 = -0.125$, $x = -0.5$ → $x^3 > x$ → trần $= x^3$, sàn $= x$.
  - Trên $(0, 1)$, thử $x = 0.5$: $x^3 = 0.125$, $x = 0.5$ → $x > x^3$ → trần $= x$, sàn $= x^3$.
- **Bước 3** (cộng 2 đoạn):
$$\begin{aligned}
S &= \int_{-1}^0 (x^3 - x)\,dx + \int_0^1 (x - x^3)\,dx \\
  &= \left[\frac{x^4}{4} - \frac{x^2}{2}\right]_{-1}^0 + \left[\frac{x^2}{2} - \frac{x^4}{4}\right]_0^1 \\
  &= \left(0 - \left(\frac{1}{4} - \frac{1}{2}\right)\right) + \left(\frac{1}{2} - \frac{1}{4}\right) = \frac{1}{4} + \frac{1}{4} = \mathbf{\frac{1}{2}}.
\end{aligned}$$
Nếu **không chia đoạn** mà tính thẳng $\int_{-1}^1 (x - x^3)\,dx = 0$ (do hàm lẻ) → ra $0$, **sai hoàn toàn** vì hai phần dương/âm triệt tiêu nhau. Diện tích thật là $\frac{1}{2}$.

⚠ **Nếu 2 đường giao nhau nhiều lần**, phải chia nhỏ tại mỗi giao điểm và trên mỗi đoạn xác định lại trần/sàn (như Ví dụ 3). Cách an toàn nhất: $S = \int_a^b |f(x) - g(x)|\,dx$.

### 1.2. Tích phân theo dy — khi cắt dải ngang gọn hơn

Đôi khi cắt **dải ngang** (rộng $dy$) gọn hơn dải dọc — đặc biệt khi vùng dễ mô tả bằng "đường phải $-$ đường trái" theo biến $y$. Khi đó:

$$S = \int_c^d \big[x_{\text{phải}}(y) - x_{\text{trái}}(y)\big]\,dy.$$

**Ví dụ 4 — chọn $dy$ cho gọn**: diện tích giới hạn bởi $x = y^2$ và $x = y + 2$.
- **Bước 1** (cận theo $y$): $y^2 = y + 2 \Rightarrow y^2 - y - 2 = 0 \Rightarrow (y-2)(y+1) = 0 \Rightarrow y = -1, 2$.
- **Bước 2** (phải/trái): thử $y = 0$: $x = y^2 = 0$, $x = y + 2 = 2$ → đường $x = y+2$ ở **phải**, $x = y^2$ ở **trái**.
- **Bước 3**:
$$S = \int_{-1}^2 \big[(y + 2) - y^2\big]\,dy = \left[\frac{y^2}{2} + 2y - \frac{y^3}{3}\right]_{-1}^2 = \left(2 + 4 - \frac{8}{3}\right) - \left(\frac{1}{2} - 2 + \frac{1}{3}\right) = \mathbf{\frac{9}{2}}.$$
Nếu cố cắt dải dọc ($dx$) thì phải tách $x = y^2$ thành hai nhánh $y = \pm\sqrt{x}$ và chia 2 vùng — dài hơn nhiều. **Mẹo**: nếu giải $x$ theo $y$ gọn hơn giải $y$ theo $x$, hãy tích phân theo $dy$.

❓ **Câu hỏi tự nhiên của người đọc**

- *"Làm sao biết đường nào là 'trần' ($f$) đường nào là 'sàn' ($g$)?"* Trên mỗi khoảng, thử một điểm: đường có giá trị **lớn hơn** là trần. Vd trên $(0,1)$, tại $x=0.5$: $x = 0.5 > x^2 = 0.25 \to y=x$ là trần. Nếu thứ tự đảo trên khoảng khác → phải chia đoạn.
- *"Cận tích phân lấy từ đâu?"* Từ **giao điểm** của hai đường (giải $f = g$). Ở ví dụ: $x^2 = x \to x = 0, 1 \to$ cận $[0,1]$.
- *"Khi nào nên cắt dải dọc ($dx$), khi nào dải ngang ($dy$)?"* Cắt dọc khi mỗi $x$ ứng với một "trần" và một "sàn" rõ ràng (hàm theo $x$). Cắt ngang khi vùng dễ mô tả theo $y$ (vd parabol nằm ngang $x = y^2$). Chọn chiều cắt làm số đoạn ít nhất.
- *"Diện tích có bao giờ phụ thuộc việc cắt dọc hay ngang không?"* Không — diện tích là một con số cố định của vùng. Cắt dọc hay ngang chỉ là **hai cách cộng** ra cùng kết quả; chọn cách nào tính nhanh hơn.

⚠ **Lỗi thường gặp — không xét đường nào trên/dưới, ra diện tích âm**. Nếu lấy $\int(x^2 - x)\,dx$ (sàn trừ trần) trên $[0,1]$ ra $-\frac{1}{6} < 0$ — diện tích không thể âm. Phải lấy trần $-$ sàn $= \int(x - x^2)\,dx = \frac{1}{6}$. Diện tích luôn lấy $|f - g|$ hoặc xác định đúng thứ tự.

⚠ **Lỗi thường gặp — quên chia đoạn khi hai đường giao $\ge 3$ lần**. Như Ví dụ 3: tính thẳng một tích phân từ $-1$ tới $1$ cho $0$ (phần âm triệt tiêu phần dương), trong khi diện tích thật là $\frac{1}{2}$. Luôn giải $f = g$ tìm **hết** giao điểm trong khoảng trước khi đặt cận.

🔁 **Dừng lại tự kiểm tra**

1. Diện tích giữa $y = x$ và $y = x^3$ trên $[0, 1]$ (đường nào trên?).
2. Cận tích phân của diện tích giữa $y = x^2$ và $y = 2x$ là gì? Tính luôn diện tích.
3. Diện tích giữa $y = x^2$ và $y = x^3$ (tự tìm cận).

<details><summary>Đáp án</summary>

1. Tại $x=0.5$: $x=0.5 > x^3=0.125 \to y=x$ trên. $S = \int_0^1 (x - x^3)\,dx = \left[\frac{x^2}{2} - \frac{x^4}{4}\right]_0^1 = \frac{1}{2} - \frac{1}{4} = \frac{1}{4}$.
2. Giao: $x^2 = 2x \to x(x-2)=0 \to x = 0, 2 \to$ cận $[0, 2]$. Thử $x=1$: $2x=2 > x^2=1$ → trần $=2x$. $S = \int_0^2 (2x - x^2)\,dx = \left[x^2 - \frac{x^3}{3}\right]_0^2 = 4 - \frac{8}{3} = \frac{4}{3}$.
3. Giao: $x^2 = x^3 \to x^2(1-x)=0 \to x = 0, 1$. Thử $x=0.5$: $x^2=0.25 > x^3=0.125$ → trần $=x^2$. $S = \int_0^1 (x^2 - x^3)\,dx = \left[\frac{x^3}{3} - \frac{x^4}{4}\right]_0^1 = \frac{1}{3} - \frac{1}{4} = \frac{1}{12}$.

</details>

### 📝 Tóm tắt mục 1

- Diện tích giữa hai đường: $S = \int_a^b (\text{trần} - \text{sàn})\,dx$, cận = giao điểm. **Cộng từng dải dọc** cao $f-g$, rộng $dx$.
- Quy trình 3 bước: (1) giải $f=g$ tìm cận, (2) thử điểm xác định trần/sàn, (3) tích phân hiệu.
- Xác định trần/sàn bằng cách thử điểm; nếu đổi thứ tự giữa chừng (giao $\ge 3$ lần) → **chia đoạn** (Ví dụ 3).
- Có thể cắt dải ngang ($dy$): $S = \int_c^d (x_{\text{phải}} - x_{\text{trái}})\,dy$ — gọn hơn khi giải $x$ theo $y$ dễ.
- Diện tích luôn $\ge 0$; lấy $|f - g|$ để tránh kết quả âm.

---

## 2. Thể tích vật thể tròn xoay — Phương pháp đĩa

🎯 **Bài toán**: Quay đồ thị $y = f(x) \ge 0$ trên $[a, b]$ quanh trục Ox → khối tròn xoay. $V = ?$

💡 **Ý tưởng — cộng từng lát đĩa mỏng**: Vẫn là "cắt lát mỏng, cộng dồn", nhưng lát bây giờ là **khối 3D mỏng**. Cắt vật bằng các mặt phẳng vuông góc trục Ox → mỗi lát là một **đĩa tròn** (như đồng xu) bán kính $f(x)$, độ dày $dx$. Thể tích một đĩa = diện tích mặt tròn × độ dày $= \pi r^2 \cdot dx = \pi f(x)^2\,dx$. Cộng dồn mọi đĩa từ $a$ tới $b$:
- $dV = \pi\cdot f(x)^2 \cdot dx$.
- $V = \int_a^b \pi\cdot f(x)^2\,dx$.

<svg viewBox="0 0 500 265" style="max-width:500px;width:100%;height:auto;display:block;margin:14px auto;background:#f8fafc;border-radius:8px" role="img" aria-label="Phương pháp đĩa: quay vùng dưới y = f(x) quanh Ox tạo khối tròn xoay; mỗi lát là đĩa bán kính f(x) dày dx, thể tích dV = π f(x)² dx">
  <defs><marker id="ar2" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#1a202c"/></marker></defs>
  <g stroke="#e2e8f0" stroke-width="1">
<line x1="76.0" y1="170.0" x2="76.0" y2="38.0"/>
<line x1="148.0" y1="170.0" x2="148.0" y2="38.0"/>
<line x1="220.0" y1="170.0" x2="220.0" y2="38.0"/>
</g>
  <line x1="34.0" y1="170.0" x2="266.0" y2="170.0" stroke="#1a202c" stroke-width="1.5" marker-end="url(#ar2)"/>
  <line x1="40.0" y1="176.0" x2="40.0" y2="16.0" stroke="#1a202c" stroke-width="1.5" marker-end="url(#ar2)"/>
  <text x="258.0" y="186.0" fill="#1a202c" font-size="13" text-anchor="start" font-style="italic">x</text>
  <text x="48.0" y="26.0" fill="#1a202c" font-size="13" text-anchor="start" font-style="italic">y</text>
  <line x1="76.0" y1="166.0" x2="76.0" y2="174.0" stroke="#1a202c" stroke-width="1.5"/>
  <text x="76.0" y="186.0" fill="#475569" font-size="11" text-anchor="middle">a</text>
  <line x1="148.0" y1="166.0" x2="148.0" y2="174.0" stroke="#1a202c" stroke-width="1.5"/>
  <text x="148.0" y="186.0" fill="#475569" font-size="11" text-anchor="middle">x</text>
  <line x1="220.0" y1="166.0" x2="220.0" y2="174.0" stroke="#1a202c" stroke-width="1.5"/>
  <text x="220.0" y="186.0" fill="#475569" font-size="11" text-anchor="middle">b</text>
  <path d="M 52.0,129.8 L 61.0,126.7 L 70.0,123.5 L 79.0,120.4 L 88.0,117.2 L 97.0,114.1 L 106.0,110.9 L 115.0,107.8 L 124.0,104.6 L 133.0,101.4 L 142.0,98.3 L 151.0,95.1 L 160.0,92.0 L 169.0,88.8 L 178.0,85.7 L 187.0,82.5 L 196.0,79.4 L 205.0,76.2 L 214.0,73.1 L 223.0,70.0 L 232.0,66.8" fill="none" stroke="#1d4ed8" stroke-width="2.5" stroke-linejoin="round"/>
  <text x="238.0" y="66.8" fill="#1d4ed8" font-size="12" text-anchor="start" font-weight="700">y = f(x)</text>
  <rect x="148.0" y="96.2" width="14.0" height="73.8" rx="0" fill="#93c5fd" fill-opacity="0.7" stroke="#1d4ed8" stroke-width="1.5"/>
  <text x="168.0" y="126.2" fill="#1d4ed8" font-size="11" text-anchor="start">f(x)</text>
  <text x="155.0" y="200.0" fill="#475569" font-size="11" text-anchor="middle">dx</text>
  <line x1="255.0" y1="90.0" x2="320.0" y2="90.0" stroke="#475569" stroke-width="2" marker-end="url(#ar2)"/>
  <text x="288.0" y="80.0" fill="#475569" font-size="11" text-anchor="middle" font-weight="700">quay quanh Ox</text>
  <path d="M 340,80 L 460,68 A 12,42 0 0 1 460,152 L 340,140 A 12,30 0 0 1 340,80 Z" fill="#dbeafe" stroke="#1d4ed8" stroke-width="2"/>
  <ellipse cx="340" cy="110" rx="12" ry="30" fill="none" stroke="#1d4ed8" stroke-width="1.5" stroke-dasharray="4 3"/>
  <ellipse cx="405" cy="110" rx="12" ry="36" fill="#1d4ed8" fill-opacity="0.75" stroke="#1e3a8a" stroke-width="1.5"/>
  <line x1="325.0" y1="110.0" x2="485.0" y2="110.0" stroke="#1a202c" stroke-width="1.2" stroke-dasharray="4 3" marker-end="url(#ar2)"/>
  <text x="490.0" y="114.0" fill="#1a202c" font-size="12" text-anchor="start">x</text>
  <text x="405.0" y="40.0" fill="#1d4ed8" font-size="12" text-anchor="middle" font-weight="700">khối tròn xoay</text>
  <text x="424.0" y="105.0" fill="#1e3a8a" font-size="11" text-anchor="start" font-weight="700">đĩa b.kính f(x), dày dx</text>
  <text x="150.0" y="232.0" fill="#475569" font-size="12" text-anchor="middle">mỗi lát: đĩa mỏng bán kính f(x), dày dx</text>
  <text x="150.0" y="252.0" fill="#1a202c" font-size="13" text-anchor="middle" font-weight="700">dV = π·f(x)²·dx</text>
  <text x="400.0" y="232.0" fill="#475569" font-size="12" text-anchor="middle">cộng mọi đĩa từ a đến b:</text>
  <text x="400.0" y="252.0" fill="#1a202c" font-size="13" text-anchor="middle" font-weight="700">V = ∫ₐᵇ π f(x)² dx</text>
</svg>

**Ví dụ 1**: Quay $y = \sqrt{x}$ trên $[0, 4]$ quanh Ox.
- $r = f(x) = \sqrt{x}$, nên $r^2 = x$.
- $V = \pi\cdot\int_0^4 (\sqrt{x})^2\,dx = \pi\int_0^4 x\,dx = \pi\cdot\left[\frac{x^2}{2}\right]_0^4 = \pi\cdot 8 =$ **$8\pi \approx 25.13$**.

**Ví dụ 2 — nón** (kiểm bằng công thức quen): Quay $y = x$ trên $[0, 3]$ quanh Ox → nón cao $3$, bán kính đáy $R = 3$.
- $V = \pi\int_0^3 x^2\,dx = \pi\left[\frac{x^3}{3}\right]_0^3 = \pi\cdot 9 = \mathbf{9\pi}$.
- Kiểm công thức nón: $\frac{1}{3}\pi R^2 h = \frac{1}{3}\pi\cdot 9\cdot 3 = 9\pi$ ✓.

> 📐 **Định nghĩa đầy đủ — Thể tích vật tròn xoay (đĩa)**
>
> **(a) Là gì**: Khối được tạo bằng cách quay đường cong $y = f(x)$ (với $f \ge 0$) trên đoạn $[a, b]$ quanh trục Ox tạo nên 1 vật 3D đối xứng. Cắt vật bằng mặt phẳng vuông trục → mỗi lát là **đĩa tròn** bán kính $f(x)$, độ dày $dx$. Tổng các đĩa $= V = \pi\cdot\int f(x)^2\,dx$.
>
> **(b) Vì sao cần**: Vì nhiều hình 3D không có công thức $V$ đơn giản — bình hoa, mặt ly, các bộ phận quay (trục, bánh xe có khía). Trước Calculus, Archimedes đã tính $V$ cầu bằng phương pháp này (thủ công, mất nhiều trang). FTC + nguyên hàm biến nó thành phép tính 5 phút. Cốt lõi của thiết kế cơ khí (mô-men quán tính), hoá học (thể tích bình phản ứng), y học (CT scan = tích phân khúc xạ tia X).
>
> **(c) Ví dụ số**: Quay $y = \sqrt{x}$ trên $[0, 4]$ quanh Ox: $V = \pi\cdot\int_0^4 x\,dx = \pi\cdot 8 =$ **$8\pi$** $\approx 25.13$. Quay $y = x$ trên $[0, 3] \to$ nón cao 3, $R=3$: $V = \pi\cdot\int_0^3 x^2\,dx = \pi\cdot 9 = 9\pi$. Kiểm công thức nón $\frac{1}{3}\pi R^2 h = \frac{1}{3}\pi\cdot 9\cdot 3 = 9\pi$ ✓. Cầu $R = 2$: quay $y = \sqrt{4-x^2}$ trên $[-2, 2]$: $V = \pi\cdot\int_{-2}^2 (4-x^2)\,dx = \pi\cdot\left[4x-\frac{x^3}{3}\right]_{-2}^2 = \pi\cdot\left(\frac{8}{3}-\left(-\frac{8}{3}\right) + 8 - (-8)\right) = \ldots = \frac{32\pi}{3}$. Kiểm $\frac{4}{3}\pi\cdot 8 = \frac{32\pi}{3}$ ✓.

### Hình cầu (ví dụ kinh điển)

Quay nửa đường tròn $y = \sqrt{R^2 - x^2}$ quanh Ox:
- $V = \pi\cdot\int_{-R}^R (R^2 - x^2)\,dx = \pi\cdot\left[R^2 x - \frac{x^3}{3}\right]_{-R}^R = \pi\cdot\left(R^3\cdot 2 - \frac{2R^3}{3}\right) =$ **$\frac{4}{3}\cdot\pi\cdot R^3$** ✓.

Khớp công thức hình cầu — đây là cách Archimedes phát hiện (trước khi có Calculus chính thức).

### Phương pháp vành khuyên (washer) — vùng giữa 2 đường

Khi quay quanh Ox **vùng giữa hai đường** $f(x) \ge g(x) \ge 0$ (chứ không phải vùng từ trục lên đường), mỗi lát là một **vành khuyên** (đĩa khoét lỗ): bán kính ngoài $R = f(x)$, bán kính trong $r = g(x)$.

$$V = \pi\int_a^b \big[f(x)^2 - g(x)^2\big]\,dx$$

<svg viewBox="0 0 480 200" style="max-width:480px;width:100%;height:auto;display:block;margin:14px auto;background:#f8fafc;border-radius:8px" role="img" aria-label="Vành khuyên: hình tròn bán kính ngoài R = f(x) khoét lỗ tròn bán kính trong r = g(x); diện tích πR² − πr²">
  <defs><marker id="ar3" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#1a202c"/></marker></defs>
  <circle cx="120" cy="105" r="80" fill="#93c5fd" fill-opacity="0.6" stroke="#1d4ed8" stroke-width="2"/>
  <circle cx="120" cy="105" r="34" fill="#f8fafc" stroke="#15803d" stroke-width="2"/>
  <line x1="120.0" y1="105.0" x2="200.0" y2="105.0" stroke="#1d4ed8" stroke-width="2"/>
  <text x="165.0" y="98.0" fill="#1d4ed8" font-size="12" text-anchor="middle" font-weight="700">R = f(x)</text>
  <line x1="120.0" y1="105.0" x2="96.0" y2="81.0" stroke="#15803d" stroke-width="2"/>
  <text x="96.0" y="74.0" fill="#15803d" font-size="12" text-anchor="middle" font-weight="700">r = g(x)</text>
  <circle cx="120.0" cy="105.0" r="3" fill="#1a202c"/>
  <text x="250.0" y="70.0" fill="#1a202c" font-size="14" text-anchor="start" font-weight="700">lát cắt = vành khuyên (washer)</text>
  <text x="250.0" y="96.0" fill="#1d4ed8" font-size="12" text-anchor="start">R = f(x): bán kính ngoài</text>
  <text x="250.0" y="116.0" fill="#15803d" font-size="12" text-anchor="start">r = g(x): bán kính trong (lỗ rỗng)</text>
  <text x="250.0" y="146.0" fill="#1a202c" font-size="14" text-anchor="start" font-weight="700">diện tích = πR² − πr²</text>
  <text x="250.0" y="168.0" fill="#dc2626" font-size="13" text-anchor="start" font-weight="700">dV = π(f² − g²)·dx</text>
</svg>

**Ví dụ 3 — vành khuyên**: Quay vùng giữa $y = \sqrt{x}$ và $y = x^2$ quanh Ox.
- Giao điểm: $\sqrt{x} = x^2 \Rightarrow x = x^4 \Rightarrow x(x^3 - 1) = 0 \Rightarrow x = 0, 1$.
- Trên $(0,1)$, thử $x = 0.5$: $\sqrt{0.5} \approx 0.71 > 0.5^2 = 0.25$ → $R = \sqrt{x}$ (ngoài), $r = x^2$ (trong).
$$V = \pi\int_0^1 \big[(\sqrt{x})^2 - (x^2)^2\big]\,dx = \pi\int_0^1 (x - x^4)\,dx = \pi\left[\frac{x^2}{2} - \frac{x^5}{5}\right]_0^1 = \pi\left(\frac{1}{2} - \frac{1}{5}\right) = \mathbf{\frac{3\pi}{10}}.$$

⚠ **Vành khuyên KHÔNG phải $\pi\int(f - g)^2\,dx$**. Đúng là $\pi\int(f^2 - g^2)\,dx$ — **hiệu bình phương**, không phải bình phương hiệu. Vd $f=2, g=1$ trên $[0,1]$: đúng $\pi\int(4-1)\,dx = 3\pi$; sai $\pi\int(2-1)^2\,dx = \pi$. Lý do: diện tích vành $= \pi R^2 - \pi r^2$, hai số hạng bình phương riêng rồi mới trừ.

❓ **Câu hỏi tự nhiên của người đọc**

- *"Vì sao có $f(x)^2$ chứ không phải $f(x)$?"* Vì mỗi lát cắt là **đĩa tròn** bán kính $f(x)$, diện tích đĩa $= \pi\cdot(\text{bán kính})^2 = \pi\cdot f(x)^2$. Bình phương đến từ diện tích hình tròn, không phải nhầm lẫn.
- *"Quay quanh trục Ox và Oy khác nhau ra sao?"* Quay quanh Ox dùng đĩa ($\pi\int f^2\,dx$); quay quanh Oy thường dùng vỏ trụ (mục 3) hoặc đổi sang biến $y$. Chọn sai trục → công thức sai.
- *"Khi nào dùng đĩa, khi nào dùng vành khuyên?"* Đĩa khi vùng quay **chạm trục** (từ $y=0$ lên đường) → lát đặc. Vành khuyên khi vùng nằm **giữa hai đường** không chạm trục → lát có lỗ. Vành khuyên là tổng quát hóa của đĩa (cho $g = 0$ thì $\pi\int(f^2 - 0)\,dx$ về lại đĩa).

⚠ **Lỗi thường gặp — quên bình phương $f(x)$**. Viết $V = \pi\int f(x)\,dx$ (thiếu bình phương) là sai — đó là công thức diện tích, không phải thể tích. Đĩa cần $\pi\cdot f(x)^2$. Vd quay $y=\sqrt{x}$ trên $[0,4]$: đúng $\pi\int_0^4 (\sqrt{x})^2\,dx = \pi\int x\,dx = 8\pi$; nếu quên bình phương ra $\pi\int \sqrt{x}\,dx = \frac{16}{3}\pi$ — sai.

🔁 **Dừng lại tự kiểm tra**

1. Quay $y = x$ trên $[0, 3]$ quanh Ox. $V = ?$ (kiểm bằng công thức nón).
2. Vì sao lát cắt vuông góc Ox lại là hình tròn?
3. Quay $y = x^2$ trên $[0, 2]$ quanh Ox (đĩa). $V = ?$
4. Quay vùng giữa $y = 2$ và $y = x$ trên $[0, 2]$ quanh Ox (vành khuyên). $V = ?$

<details><summary>Đáp án</summary>

1. $V = \pi\int_0^3 x^2\,dx = \pi\left[\frac{x^3}{3}\right]_0^3 = 9\pi$. Nón đáy $R=3$ cao $h=3$: $\frac{1}{3}\pi R^2 h = \frac{1}{3}\pi\cdot 9\cdot 3 = 9\pi$ ✓.
2. Vì quay quanh Ox, mỗi điểm $(x, f(x))$ vạch một đường tròn bán kính $f(x)$ → lát cắt là hình tròn.
3. $V = \pi\int_0^2 (x^2)^2\,dx = \pi\int_0^2 x^4\,dx = \pi\left[\frac{x^5}{5}\right]_0^2 = \frac{32\pi}{5}$.
4. $R = 2$ (ngoài), $r = x$ (trong): $V = \pi\int_0^2 (4 - x^2)\,dx = \pi\left[4x - \frac{x^3}{3}\right]_0^2 = \pi\left(8 - \frac{8}{3}\right) = \frac{16\pi}{3}$.

</details>

### 📝 Tóm tắt mục 2

- Quay $y=f(x)$ quanh Ox: $V = \pi\int_a^b f(x)^2\,dx$ (đĩa, bán kính $f(x)$) — **cộng từng lát đĩa mỏng**.
- Vùng giữa 2 đường (không chạm trục): **vành khuyên** $V = \pi\int_a^b (f^2 - g^2)\,dx$ — hiệu bình phương, KHÔNG phải bình phương hiệu.
- **Đừng quên bình phương** và **đừng quên $\pi$** — bình phương đến từ diện tích hình tròn $\pi r^2$.
- Kiểm bằng công thức quen (nón $\frac{1}{3}\pi R^2 h$, cầu $\frac{4}{3}\pi R^3$).

---

## 3. Thể tích — Phương pháp vỏ trụ (Shell)

Khi quay quanh trục Oy, dùng vỏ trụ thay vì đĩa:

$$V = 2\pi\cdot\int_a^b x\cdot f(x)\,dx$$

💡 **Mỗi vỏ trụ** bán kính $x$, chiều cao $f(x)$, độ dày $dx$ → thể tích $= 2\pi x\cdot f(x)\cdot dx$ (chu vi × cao × dày). "Lát mỏng" lần này là một **ống trụ rỗng** (như lõi giấy vệ sinh), không phải đĩa. Tưởng tượng "lột" vật thành các ống lồng nhau, rồi **trải phẳng** mỗi ống thành một tấm chữ nhật:

<svg viewBox="0 0 540 250" style="max-width:540px;width:100%;height:auto;display:block;margin:14px auto;background:#f8fafc;border-radius:8px" role="img" aria-label="Phương pháp vỏ trụ: vỏ mỏng bán kính x, cao f(x), dày dx; trải phẳng thành tấm rộng 2πx, cao f(x), dày dx">
  <defs><marker id="ar4" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#1a202c"/></marker></defs>
  <path d="M 60,60 A 60,14 0 0 0 180,60 L 180,180 A 60,14 0 0 1 60,180 Z" fill="#dbeafe" stroke="#1d4ed8" stroke-width="2"/>
  <ellipse cx="120" cy="60" rx="60" ry="14" fill="#93c5fd" stroke="#1d4ed8" stroke-width="2"/>
  <ellipse cx="120" cy="60" rx="52" ry="11" fill="#f8fafc" stroke="#1d4ed8" stroke-width="1.5"/>
  <line x1="120.0" y1="60.0" x2="172.0" y2="60.0" stroke="#dc2626" stroke-width="2"/>
  <text x="146.0" y="52.0" fill="#dc2626" font-size="12" text-anchor="middle" font-weight="700" font-style="italic">x</text>
  <circle cx="120.0" cy="60.0" r="3" fill="#1a202c"/>
  <line x1="195.0" y1="60.0" x2="195.0" y2="180.0" stroke="#15803d" stroke-width="1.5" marker-end="url(#ar4)"/>
  <text x="202.0" y="124.0" fill="#15803d" font-size="12" text-anchor="start">cao f(x)</text>
  <text x="120.0" y="205.0" fill="#475569" font-size="11" text-anchor="middle">dày dx (vỏ mỏng)</text>
  <text x="120.0" y="30.0" fill="#1a202c" font-size="13" text-anchor="middle" font-weight="700">vỏ trụ bán kính x</text>
  <line x1="230.0" y1="120.0" x2="275.0" y2="120.0" stroke="#475569" stroke-width="2" marker-end="url(#ar4)"/>
  <text x="252.0" y="110.0" fill="#475569" font-size="11" text-anchor="middle">trải phẳng</text>
  <rect x="290.0" y="90.0" width="190.0" height="60.0" rx="0" fill="#dbeafe" fill-opacity="1" stroke="#1d4ed8" stroke-width="2"/>
  <line x1="290.0" y1="165.0" x2="480.0" y2="165.0" stroke="#dc2626" stroke-width="1.5" marker-end="url(#ar4)"/>
  <text x="385.0" y="182.0" fill="#dc2626" font-size="12" text-anchor="middle" font-weight="700">rộng = chu vi = 2πx</text>
  <line x1="495.0" y1="90.0" x2="495.0" y2="150.0" stroke="#15803d" stroke-width="1.5" marker-end="url(#ar4)"/>
  <text x="500.0" y="124.0" fill="#15803d" font-size="12" text-anchor="start">f(x)</text>
  <text x="385.0" y="125.0" fill="#1d4ed8" font-size="13" text-anchor="middle" font-weight="700">tấm: 2πx × f(x) × dx</text>
  <text x="385.0" y="60.0" fill="#1a202c" font-size="13" text-anchor="middle" font-weight="700">tấm phẳng mỏng</text>
  <text x="270.0" y="230.0" fill="#1a202c" font-size="13" text-anchor="middle" font-weight="700">dV = (2πx)·f(x)·dx  →  V = ∫ₐᵇ 2πx f(x) dx</text>
</svg>

**Ví dụ 1**: Quay $y = x^2$ trên $[0, 2]$ quanh Oy.
- $V = 2\pi\int_0^2 x\cdot x^2\,dx = 2\pi\int_0^2 x^3\,dx = 2\pi\left[\frac{x^4}{4}\right]_0^2 = 2\pi\cdot 4 = \mathbf{8\pi}$.

**Ví dụ 2**: Quay $y = \sqrt{x}$ trên $[0, 4]$ quanh Oy.
- $V = 2\pi\int_0^4 x\cdot\sqrt{x}\,dx = 2\pi\int_0^4 x^{3/2}\,dx = 2\pi\left[\frac{2}{5}x^{5/2}\right]_0^4 = 2\pi\cdot\frac{2}{5}\cdot 32 = \mathbf{\frac{128\pi}{5}}$.
  (Vì $4^{5/2} = (\sqrt{4})^5 = 2^5 = 32$.)

⚖ **So sánh: cùng một vật, đĩa hay vỏ trụ đều ra cùng $V$.** Quay $y = x^2$, $0\le x\le 2$ **quanh Oy**. Bằng vỏ trụ ở trên: $8\pi$. Kiểm bằng đĩa theo biến $y$ (vùng quay là phần bên trái đường cong, từ trục Oy ra tới $x = \sqrt{y}$, với $y$ chạy $0\to 4$; nhưng còn cả khối trụ ngoài bán kính 2)... cách vỏ trụ rõ ràng gọn hơn nhiều — đó là lý do tồn tại của phương pháp này. Hai phương pháp **luôn cho cùng kết quả**, chỉ khác độ tiện.

❓ **Câu hỏi tự nhiên của người đọc**

- *"Vì sao quay quanh Oy lại dùng vỏ trụ thay vì đĩa?"* Vì khi quay quanh Oy, để dùng đĩa ta phải biểu diễn $x$ theo $y$ (đảo hàm) — nhiều khi khó. Vỏ trụ giữ nguyên biến $x$: tưởng tượng "lột" vật thành các ống trụ mỏng lồng nhau, mỗi ống bán kính $x$.
- *"$2\pi x$ ở đâu ra?"* Đó là **chu vi** của vỏ trụ bán kính $x$ (chu vi đường tròn $= 2\pi r$). Trải phẳng vỏ trụ thành tấm: rộng $2\pi x$, cao $f(x)$, dày $dx$ → thể tích $2\pi x\cdot f(x)\cdot dx$.

⚠ **Lỗi thường gặp — lẫn công thức đĩa và vỏ trụ**. Đĩa (quanh Ox): $\pi\int f^2\,dx$. Vỏ trụ (quanh Oy): $2\pi\int x\cdot f(x)\,dx$. Dùng nhầm đĩa cho trục Oy hoặc quên thừa số $2\pi$ đều ra sai. Xác định **trục quay** trước khi chọn công thức.

🔁 **Dừng lại tự kiểm tra**

1. Quay $y = x^2$ trên $[0, 2]$ quanh Oy bằng vỏ trụ. $V = ?$
2. Thừa số $2\pi x$ trong công thức vỏ trụ biểu thị gì?
3. Quay $y = x$ trên $[0, 3]$ quanh Oy bằng vỏ trụ. $V = ?$
4. Một vật quay quanh Ox. Nên dùng đĩa hay vỏ trụ (theo biến $x$)?

<details><summary>Đáp án</summary>

1. $V = 2\pi\int_0^2 x\cdot x^2\,dx = 2\pi\int_0^2 x^3\,dx = 2\pi\left[\frac{x^4}{4}\right]_0^2 = 2\pi\cdot 4 = 8\pi$.
2. Chu vi đường tròn bán kính $x$ ($= 2\pi x$) — bề rộng khi trải phẳng vỏ trụ.
3. $V = 2\pi\int_0^3 x\cdot x\,dx = 2\pi\int_0^3 x^2\,dx = 2\pi\left[\frac{x^3}{3}\right]_0^3 = 2\pi\cdot 9 = 18\pi$.
4. Đĩa/vành khuyên (lát vuông góc Ox là hình tròn, biến tự nhiên là $x$). Vỏ trụ theo $x$ hợp khi quay quanh Oy.

</details>

### 📝 Tóm tắt mục 3

- Quay quanh Oy: $V = 2\pi\int_a^b x\cdot f(x)\,dx$ (vỏ trụ, giữ biến $x$) — **cộng từng ống trụ mỏng**.
- $2\pi x$ = chu vi vỏ trụ; $f(x)$ = chiều cao; $dx$ = độ dày — trải phẳng thành tấm $2\pi x \times f(x) \times dx$.
- Xác định **trục quay** để chọn đúng đĩa/vành khuyên (Ox) vs vỏ trụ (Oy).
- Đĩa và vỏ trụ luôn cho **cùng $V$** cho cùng vật — chọn cái tránh phải đảo hàm.

---

## 4. Độ dài cung đường cong

Cho $y = f(x)$ trên $[a, b]$:

$$L = \int_a^b \sqrt{1 + (f'(x))^2}\,dx$$

💡 **Trực giác — cộng từng đoạn dây nhỏ**: "Lát mỏng" ở đây là một **đoạn thẳng nhỏ** dọc đường cong. Phóng to một đoạn cung cực nhỏ, nó gần như thẳng: đi ngang $dx$, đi dọc $dy$. Theo Pythagoras, độ dài đoạn $= \sqrt{dx^2 + dy^2}$. Vì $dy = f'(x)\,dx$:
$$\sqrt{dx^2 + dy^2} = \sqrt{dx^2\big(1 + (f')^2\big)} = \sqrt{1 + (f'(x))^2}\,dx.$$
Cộng dồn mọi đoạn → tổng độ dài cung.

<svg viewBox="0 0 520 232" style="max-width:520px;width:100%;height:auto;display:block;margin:14px auto;background:#f8fafc;border-radius:8px" role="img" aria-label="Độ dài cung: phóng to một đoạn cung nhỏ thành tam giác vuông cạnh dx, dy = f′(x)dx, cạnh huyền ds = √(dx² + dy²)">
  <defs><marker id="ar5" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#1a202c"/></marker></defs>
  <g stroke="#e2e8f0" stroke-width="1">
</g>
  <line x1="34.0" y1="170.0" x2="254.0" y2="170.0" stroke="#1a202c" stroke-width="1.5" marker-end="url(#ar5)"/>
  <line x1="40.0" y1="176.0" x2="40.0" y2="18.0" stroke="#1a202c" stroke-width="1.5" marker-end="url(#ar5)"/>
  <text x="246.0" y="186.0" fill="#1a202c" font-size="13" text-anchor="start" font-style="italic">x</text>
  <text x="48.0" y="28.0" fill="#1a202c" font-size="13" text-anchor="start" font-style="italic">y</text>
  <path d="M 52.0,149.6 L 56.2,149.3 L 60.4,149.0 L 64.6,148.5 L 68.8,147.9 L 73.0,147.3 L 77.2,146.5 L 81.4,145.7 L 85.6,144.8 L 89.8,143.8 L 94.0,142.7 L 98.2,141.5 L 102.4,140.3 L 106.6,138.9 L 110.8,137.5 L 115.0,135.9 L 119.2,134.3 L 123.4,132.6 L 127.6,130.8 L 131.8,128.9 L 136.0,127.0 L 140.2,124.9 L 144.4,122.8 L 148.6,120.5 L 152.8,118.2 L 157.0,115.8 L 161.2,113.3 L 165.4,110.7 L 169.6,108.0 L 173.8,105.2 L 178.0,102.4 L 182.2,99.4 L 186.4,96.4 L 190.6,93.3 L 194.8,90.1 L 199.0,86.8 L 203.2,83.4 L 207.4,79.9 L 211.6,76.4 L 215.8,72.7 L 220.0,69.0" fill="none" stroke="#1d4ed8" stroke-width="2.5" stroke-linejoin="round"/>
  <text x="226.0" y="69.0" fill="#1d4ed8" font-size="12" text-anchor="start" font-weight="700">y = f(x)</text>
  <circle cx="136.0" cy="127.0" r="3" fill="#dc2626"/>
  <circle cx="154.0" cy="117.5" r="3" fill="#dc2626"/>
  <rect x="136.0" y="117.5" width="18.0" height="9.5" fill="none" stroke="#dc2626" stroke-width="1.2" stroke-dasharray="3 2"/>
  <line x1="162.0" y1="122.2" x2="300.0" y2="110.0" stroke="#94a3b8" stroke-width="1.2" stroke-dasharray="4 3"/>
  <text x="380.0" y="40.0" fill="#1a202c" font-size="13" text-anchor="middle" font-weight="700">phóng to một đoạn cung</text>
  <line x1="300.0" y1="150.0" x2="450.0" y2="150.0" stroke="#15803d" stroke-width="2"/>
  <line x1="450.0" y1="150.0" x2="450.0" y2="60.0" stroke="#15803d" stroke-width="2"/>
  <line x1="300.0" y1="150.0" x2="450.0" y2="60.0" stroke="#dc2626" stroke-width="2.5"/>
  <circle cx="300.0" cy="150.0" r="4" fill="#dc2626"/>
  <circle cx="450.0" cy="60.0" r="4" fill="#dc2626"/>
  <text x="375.0" y="168.0" fill="#15803d" font-size="13" text-anchor="middle" font-weight="700">dx</text>
  <text x="458.0" y="109.0" fill="#15803d" font-size="13" text-anchor="start" font-weight="700">dy = f′(x)·dx</text>
  <text x="361.0" y="99.0" fill="#dc2626" font-size="14" text-anchor="end" font-weight="700" font-style="italic">ds</text>
  <text x="255.0" y="215.0" fill="#1a202c" font-size="13" text-anchor="middle" font-weight="700">ds = √(dx² + dy²) = √(1 + (f′)²)·dx  →  L = ∫ₐᵇ √(1 + f′(x)²) dx</text>
</svg>

**Ví dụ 1 — đường thẳng** (kiểm bằng khoảng cách 2 điểm): độ dài $y = 2x$ trên $[0, 3]$.
- $f'(x) = 2$, hằng.
- $L = \int_0^3 \sqrt{1 + 2^2}\,dx = \int_0^3 \sqrt{5}\,dx = 3\sqrt{5} \approx 6.71$.
- Kiểm: hai đầu $(0,0)$ và $(3,6)$, khoảng cách $= \sqrt{3^2 + 6^2} = \sqrt{45} = 3\sqrt{5}$ ✓.

**Ví dụ 2**: Độ dài cung $y = x^{3/2}$ trên $[0, 1]$.
- $f'(x) = \frac{3}{2}\cdot x^{1/2}$.
- $L = \int_0^1 \sqrt{1 + \frac{9x}{4}}\,dx$.
- $u = 1 + \frac{9x}{4}$, $du = \frac{9}{4}\,dx$.
- $= \frac{4}{9}\cdot\int_1^{13/4} \sqrt{u}\,du = \frac{4}{9}\cdot\frac{2}{3}\cdot u^{3/2}\Big|_1^{13/4} = \frac{8}{27}\cdot\left[\left(\frac{13}{4}\right)^{3/2} - 1\right] \approx$ **$1.44$**.

❓ **Câu hỏi tự nhiên của người đọc**

- *"Công thức $\sqrt{1+(f')^2}$ từ đâu?"* Định lý Pythagoras cho đoạn cung nhỏ: chiều ngang $dx$, chiều dọc $dy = f'(x)dx$, độ dài đoạn $= \sqrt{dx^2 + dy^2} = \sqrt{1 + (f')^2}\cdot dx$. Cộng dồn (tích phân) → tổng độ dài.
- *"Vì sao tích phân độ dài cung thường khó tính?"* Vì $\sqrt{1+(f')^2}$ hiếm khi có nguyên hàm sơ cấp đẹp. Vd đường tròn, parabol cho tích phân phức tạp — thường phải đổi biến khéo hoặc tính số.

⚠ **Lỗi thường gặp — quên số $1$ dưới căn**. Công thức là $\sqrt{1 + (f')^2}$, KHÔNG phải $\sqrt{(f')^2} = |f'|$. Bỏ số 1 sẽ cho kết quả sai (thiếu đóng góp chiều ngang $dx$). Vd $y = 2x$ trên $[0,3]$: đúng $\int\sqrt{1+4}\,dx = 3\sqrt{5}$; quên số 1 ra $\int\sqrt{4}\,dx = 6$ — sai.

🔁 **Dừng lại tự kiểm tra**

1. Độ dài $y = 3x$ từ $x=0$ đến $x=4$ (kiểm bằng khoảng cách hai điểm).
2. Vì sao đoạn cung nhỏ dài $\sqrt{1+(f')^2}\cdot dx$?
3. Lập (không cần tính) tích phân độ dài $y = x^2$ trên $[0, 2]$.

<details><summary>Đáp án</summary>

1. $f'=3$, $L = \int_0^4 \sqrt{1+9}\,dx = \sqrt{10}\cdot4 = 4\sqrt{10} \approx 12.65$. Hai điểm $(0,0),(4,12)$: $\sqrt{16+144} = \sqrt{160} = 4\sqrt{10}$ ✓.
2. Pythagoras: $\sqrt{dx^2 + dy^2}$ với $dy = f'\cdot dx$ → $\sqrt{dx^2(1+(f')^2)} = \sqrt{1+(f')^2}\cdot dx$.
3. $f' = 2x$ → $L = \int_0^2 \sqrt{1 + 4x^2}\,dx$ (tích phân này cần đổi biến lượng giác/hyperbolic, không sơ cấp đơn giản — minh họa "độ dài cung thường khó").

</details>

### 📝 Tóm tắt mục 4

- Độ dài cung $y=f(x)$ trên $[a,b]$: $L = \int_a^b \sqrt{1+(f'(x))^2}\,dx$ — **cộng từng đoạn dây nhỏ**.
- Công thức từ Pythagoras cho đoạn cung nhỏ ($dx$ ngang, $f'dx$ dọc).
- **Đừng quên số 1** dưới căn (đóng góp của $dx$); tích phân này thường khó, có khi phải tính số.

---

## 5. Giá trị trung bình của hàm

$$f_{tb} = \frac{1}{b-a}\cdot\int_a^b f(x)\,dx$$

💡 **Trực giác — san phẳng đồ thị thành hình chữ nhật**: $\int_a^b f\,dx$ là **diện tích** dưới đồ thị. Hỏi: nếu "san phẳng" diện tích đó thành một hình chữ nhật cùng bề rộng $(b-a)$, thì cao bao nhiêu? Chiều cao đó chính là **giá trị trung bình** — mức mà nếu $f$ giữ nguyên (hằng) suốt $[a,b]$ thì cho cùng diện tích. Giống trung bình rời rạc $\frac{\text{tổng}}{\text{số phần tử}}$, đây là $\frac{\text{tổng tích lũy}}{\text{bề rộng}}$.

<svg viewBox="0 0 530 232" style="max-width:530px;width:100%;height:auto;display:block;margin:14px auto;background:#f8fafc;border-radius:8px" role="img" aria-label="Giá trị trung bình: vùng dưới f(x) trên [a, b] san phẳng thành hình chữ nhật cùng diện tích, cao f_tb">
  <defs><marker id="ar6" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#1a202c"/></marker></defs>
  <g stroke="#e2e8f0" stroke-width="1">
<line x1="70.0" y1="170.0" x2="70.0" y2="38.0"/>
<line x1="214.0" y1="170.0" x2="214.0" y2="38.0"/>
</g>
  <line x1="34.0" y1="170.0" x2="266.0" y2="170.0" stroke="#1a202c" stroke-width="1.5" marker-end="url(#ar6)"/>
  <line x1="40.0" y1="176.0" x2="40.0" y2="16.0" stroke="#1a202c" stroke-width="1.5" marker-end="url(#ar6)"/>
  <text x="258.0" y="186.0" fill="#1a202c" font-size="13" text-anchor="start" font-style="italic">x</text>
  <text x="48.0" y="26.0" fill="#1a202c" font-size="13" text-anchor="start" font-style="italic">y</text>
  <line x1="70.0" y1="166.0" x2="70.0" y2="174.0" stroke="#1a202c" stroke-width="1.5"/>
  <text x="70.0" y="186.0" fill="#475569" font-size="11" text-anchor="middle">a</text>
  <line x1="214.0" y1="166.0" x2="214.0" y2="174.0" stroke="#1a202c" stroke-width="1.5"/>
  <text x="214.0" y="186.0" fill="#475569" font-size="11" text-anchor="middle">b</text>
  <path d="M 70.0,120.3 L 72.4,118.4 L 74.8,116.5 L 77.2,114.4 L 79.6,112.2 L 82.0,109.9 L 84.4,107.6 L 86.8,105.1 L 89.2,102.5 L 91.6,99.9 L 94.0,97.3 L 96.4,94.6 L 98.8,91.9 L 101.2,89.2 L 103.6,86.6 L 106.0,84.0 L 108.4,81.5 L 110.8,79.1 L 113.2,76.9 L 115.6,74.8 L 118.0,72.8 L 120.4,71.1 L 122.8,69.5 L 125.2,68.2 L 127.6,67.2 L 130.0,66.4 L 132.4,65.8 L 134.8,65.5 L 137.2,65.5 L 139.6,65.8 L 142.0,66.4 L 144.4,67.2 L 146.8,68.2 L 149.2,69.5 L 151.6,71.1 L 154.0,72.8 L 156.4,74.8 L 158.8,76.9 L 161.2,79.1 L 163.6,81.5 L 166.0,84.0 L 168.4,86.6 L 170.8,89.2 L 173.2,91.9 L 175.6,94.6 L 178.0,97.3 L 180.4,99.9 L 182.8,102.5 L 185.2,105.1 L 187.6,107.6 L 190.0,109.9 L 192.4,112.2 L 194.8,114.4 L 197.2,116.5 L 199.6,118.4 L 202.0,120.3 L 204.4,122.0 L 206.8,123.6 L 209.2,125.0 L 211.6,126.4 L 214.0,127.6 L 214.0,170.0 L 70.0,170.0 Z" fill="#93c5fd" stroke="#93c5fd" stroke-width="0" fill-opacity="0.5" stroke-linejoin="round"/>
  <path d="M 52.0,130.2 L 54.2,129.3 L 56.5,128.3 L 58.8,127.2 L 61.0,126.0 L 63.2,124.8 L 65.5,123.4 L 67.8,121.9 L 70.0,120.3 L 72.2,118.6 L 74.5,116.7 L 76.8,114.8 L 79.0,112.8 L 81.2,110.7 L 83.5,108.5 L 85.8,106.2 L 88.0,103.8 L 90.2,101.4 L 92.5,98.9 L 94.8,96.5 L 97.0,93.9 L 99.2,91.4 L 101.5,88.9 L 103.8,86.4 L 106.0,84.0 L 108.2,81.7 L 110.5,79.4 L 112.8,77.3 L 115.0,75.3 L 117.2,73.4 L 119.5,71.7 L 121.8,70.2 L 124.0,68.9 L 126.2,67.7 L 128.5,66.8 L 130.8,66.2 L 133.0,65.7 L 135.2,65.5 L 137.5,65.6 L 139.8,65.8 L 142.0,66.4 L 144.2,67.1 L 146.5,68.1 L 148.8,69.3 L 151.0,70.7 L 153.2,72.3 L 155.5,74.0 L 157.8,75.9 L 160.0,78.0 L 162.2,80.2 L 164.5,82.5 L 166.8,84.8 L 169.0,87.3 L 171.2,89.7 L 173.5,92.3 L 175.8,94.8 L 178.0,97.3 L 180.3,99.8 L 182.5,102.2 L 184.8,104.6 L 187.0,107.0 L 189.3,109.2 L 191.5,111.4 L 193.8,113.5 L 196.0,115.5 L 198.2,117.4 L 200.5,119.1 L 202.8,120.8 L 205.0,122.4 L 207.2,123.8 L 209.5,125.2 L 211.8,126.4 L 214.0,127.6 L 216.2,128.6 L 218.5,129.6 L 220.8,130.5 L 223.0,131.3 L 225.3,132.0 L 227.5,132.6 L 229.8,133.2 L 232.0,133.7" fill="none" stroke="#1d4ed8" stroke-width="2.5" stroke-linejoin="round"/>
  <text x="136.0" y="55.5" fill="#1d4ed8" font-size="12" text-anchor="middle" font-weight="700">f(x)</text>
  <line x1="230.0" y1="110.0" x2="275.0" y2="110.0" stroke="#475569" stroke-width="2" marker-end="url(#ar6)"/>
  <text x="252.0" y="100.0" fill="#475569" font-size="11" text-anchor="middle">san phẳng</text>
  <g stroke="#e2e8f0" stroke-width="1">
<line x1="330.0" y1="170.0" x2="330.0" y2="38.0"/>
<line x1="474.0" y1="170.0" x2="474.0" y2="38.0"/>
</g>
  <line x1="294.0" y1="170.0" x2="526.0" y2="170.0" stroke="#1a202c" stroke-width="1.5" marker-end="url(#ar6)"/>
  <line x1="300.0" y1="176.0" x2="300.0" y2="16.0" stroke="#1a202c" stroke-width="1.5" marker-end="url(#ar6)"/>
  <text x="518.0" y="186.0" fill="#1a202c" font-size="13" text-anchor="start" font-style="italic">x</text>
  <text x="308.0" y="26.0" fill="#1a202c" font-size="13" text-anchor="start" font-style="italic"></text>
  <line x1="330.0" y1="166.0" x2="330.0" y2="174.0" stroke="#1a202c" stroke-width="1.5"/>
  <text x="330.0" y="186.0" fill="#475569" font-size="11" text-anchor="middle">a</text>
  <line x1="474.0" y1="166.0" x2="474.0" y2="174.0" stroke="#1a202c" stroke-width="1.5"/>
  <text x="474.0" y="186.0" fill="#475569" font-size="11" text-anchor="middle">b</text>
  <rect x="330.0" y="92.1" width="144.0" height="77.9" rx="0" fill="#86efac" fill-opacity="0.6" stroke="#15803d" stroke-width="2"/>
  <line x1="300.0" y1="92.1" x2="498.0" y2="92.1" stroke="#15803d" stroke-width="1.5" stroke-dasharray="5 3"/>
  <text x="502.0" y="96.1" fill="#15803d" font-size="12" text-anchor="start" font-weight="700">f_tb</text>
  <text x="402.0" y="135.1" fill="#15803d" font-size="12" text-anchor="middle" font-weight="700">cùng diện tích</text>
  <text x="265.0" y="215.0" fill="#1a202c" font-size="13" text-anchor="middle" font-weight="700">∫ₐᵇ f(x) dx = f_tb·(b − a)  ⟹  f_tb = (1/(b−a)) ∫ₐᵇ f(x) dx</text>
</svg>

**Ví dụ 1**: Giá trị trung bình của $\sin x$ trên $[0, \pi]$.
- $f_{tb} = \frac{1}{\pi}\cdot\int_0^\pi \sin x\,dx = \frac{1}{\pi}\cdot[-\cos x]_0^\pi = \frac{1}{\pi}\cdot\big((-\cos\pi) - (-\cos 0)\big) = \frac{1}{\pi}\cdot(1 + 1) =$ **$\frac{2}{\pi} \approx 0.637$**.
- ⟶ Giá trị trung bình của sóng sin nửa chu kỳ. Nằm trong $[0,1]$ (khoảng giá trị của $\sin$ trên $[0,\pi]$) — hợp lý.

**Ví dụ 2**: Giá trị trung bình của $f(x) = x^2$ trên $[0, 3]$.
- $f_{tb} = \frac{1}{3-0}\int_0^3 x^2\,dx = \frac{1}{3}\left[\frac{x^3}{3}\right]_0^3 = \frac{1}{3}\cdot 9 = \mathbf{3}$.
- Kiểm hợp lý: $x^2$ trên $[0,3]$ chạy từ $0$ tới $9$, trung bình $3$ nằm giữa — và nhỏ hơn trung bình số học của hai biên ($\frac{0+9}{2} = 4.5$) vì hàm cong lên (phần lớn thời gian giá trị nhỏ).

❓ **Câu hỏi tự nhiên của người đọc**

- *"Vì sao chia cho $(b-a)$?"* Vì $\int_a^b f\,dx$ là **diện tích** (tổng tích lũy), chia cho bề rộng $(b-a)$ cho ra **chiều cao trung bình** — đúng nghĩa "trung bình". Tương tự trung bình rời rạc $\frac{\text{tổng}}{\text{số phần tử}}$.
- *"Giá trị trung bình có nằm trong khoảng giá trị của hàm không?"* Có (định lý giá trị trung bình tích phân): với $f$ liên tục, tồn tại $c \in [a,b]$ mà $f(c) = f_{tb}$. Vd $\sin x$ trên $[0,\pi]$ có $f_{tb} = \frac{2}{\pi} \approx 0.637$, nằm trong $[0,1]$.

⚠ **Lỗi thường gặp — quên chia cho $(b-a)$**. $f_{tb} = \frac{\int_a^b f\,dx}{b-a}$, KHÔNG phải chỉ $\int_a^b f\,dx$. Vd trung bình của $x^2$ trên $[0,2]$: đúng $\frac{1}{2}\int_0^2 x^2\,dx = \frac{1}{2}\cdot\frac{8}{3} = \frac{4}{3}$; quên chia ra $\frac{8}{3}$ — sai (và lớn hơn cả giá trị max $4$, vô lý).

🔁 **Dừng lại tự kiểm tra**

1. Giá trị trung bình của $f(x) = x$ trên $[0, 4]$.
2. Giá trị trung bình của hàm hằng $f(x) = 7$ trên $[2, 9]$?
3. Giá trị trung bình của $f(x) = x^2$ trên $[0, 2]$ (tìm cả điểm $c$ để $f(c) = f_{tb}$).

<details><summary>Đáp án</summary>

1. $\frac{1}{4}\int_0^4 x\,dx = \frac{1}{4}\left[\frac{x^2}{2}\right]_0^4 = \frac{1}{4}\cdot8 = 2$ (đúng bằng trung điểm, vì $x$ tuyến tính).
2. $7$ (trung bình của hằng số luôn bằng chính nó).
3. $f_{tb} = \frac{1}{2}\int_0^2 x^2\,dx = \frac{1}{2}\cdot\frac{8}{3} = \frac{4}{3}$. Điểm $c$: $c^2 = \frac{4}{3} \Rightarrow c = \frac{2}{\sqrt3} \approx 1.15 \in [0,2]$ ✓ (MVT tích phân).

</details>

### 📝 Tóm tắt mục 5

- $f_{tb} = \frac{1}{b-a}\cdot\int_a^b f(x)\,dx$ = diện tích chia bề rộng = chiều cao trung bình (san phẳng đồ thị thành chữ nhật).
- **Đừng quên chia $(b-a)$** — quên chia ra số to vô lý (có thể vượt cả max của hàm).
- Với $f$ liên tục, $f_{tb}$ thực sự đạt được tại một điểm $c \in [a,b]$ (MVT tích phân).

---

## 6. Ứng dụng vật lý

### 6.1. Công cơ học

Lực biến thiên $F(x)$ tác động lên vật từ $a$ đến $b$:

$$W = \int_a^b F(x)\,dx$$

💡 **Trực giác**: "lát mỏng" là một quãng dịch chuyển nhỏ $dx$ mà trên đó lực coi như **hằng** $F(x)$ → công nhỏ $dW = F(x)\,dx$. Cộng dồn → tổng công.

**Ví dụ 1**: Lò xo Hooke $F = kx$. Công kéo lò xo từ 0 đến $x$:
- $W = \int_0^x k\cdot t\,dt = \frac{1}{2}\cdot k\cdot x^2$.

**Ví dụ 2 — số cụ thể**: lò xo $k = 200$ N/m, kéo từ $0$ đến $0.1$ m.
- $W = \int_0^{0.1} 200t\,dt = \left[100t^2\right]_0^{0.1} = 100\cdot 0.01 = \mathbf{1}$ J.
- Nếu nhầm dùng $F\cdot d$ với $F$ tại điểm cuối $= 200\cdot 0.1 = 20$ N: ra $20\cdot 0.1 = 2$ J — **gấp đôi**, sai (vì lực không hằng, trung bình lực chỉ là $10$ N).

### 6.2. Khối tâm thanh

Thanh mỏng có mật độ $\rho(x)$ trên $[a, b]$:

$$x_{cm} = \frac{\int_a^b x\cdot\rho(x)\,dx}{\int_a^b \rho(x)\,dx}$$

### 6.3. Quãng đường khi vận tốc biến thiên

$$s = \int_a^b v(t)\,dt$$

💡 **Trực giác — vì sao tích phân là "tổng tích lũy"**: nhiều đại lượng vật lý = tích của hai thứ (công = lực × quãng đường, quãng đường = vận tốc × thời gian). Khi một thừa số **biến thiên**, không nhân thẳng được — phải chia nhỏ, nhân trên từng mảnh, rồi cộng dồn = tích phân.

**Ví dụ 1 — độ dời**: $v(t) = 3t^2$ m/s, từ $t=0$ tới $t=2$.
- $s = \int_0^2 3t^2\,dt = [t^3]_0^2 = 8$ m.

**Ví dụ 2 — vật đổi chiều (độ dời vs quãng đường)**: $v(t) = t - 2$ m/s trên $[0, 3]$. Vật đi lùi khi $t < 2$ ($v<0$), tiến khi $t > 2$.
- **Độ dời** (có dấu): $\int_0^3 (t-2)\,dt = \left[\frac{t^2}{2} - 2t\right]_0^3 = \left(\frac{9}{2} - 6\right) = -\frac{3}{2}$ m (cuối cùng lùi $1.5$ m so với chỗ xuất phát).
- **Quãng đường thực** (đường đi tổng): $\int_0^3 |t-2|\,dt = \int_0^2 (2-t)\,dt + \int_2^3 (t-2)\,dt = \left[2t - \frac{t^2}{2}\right]_0^2 + \left[\frac{t^2}{2} - 2t\right]_2^3 = 2 + \frac{1}{2} = \frac{5}{2}$ m.
- Hai số khác nhau ($-\frac{3}{2}$ vs $\frac{5}{2}$) — đây là lỗi nhầm phổ biến nhất ở mục này.

### 6.4. Ứng dụng xác suất — hàm mật độ (PDF)

💡 **Là gì**: Với biến ngẫu nhiên **liên tục** $X$ (chiều cao, thời gian chờ...), không có "xác suất tại một điểm" (luôn bằng 0); thay vào đó có **hàm mật độ xác suất (probability density function, PDF)** $f(x) \ge 0$. **Xác suất $X$ rơi vào $[a,b]$ = diện tích dưới $f$ trên đoạn đó**:

$$P(a \le X \le b) = \int_a^b f(x)\,dx.$$

**Vì sao cần tích phân?** Vì xác suất "rải" liên tục trên một khoảng — phải cộng dồn mật độ × bề rộng nhỏ $f(x)\,dx$ (đúng kiểu "cộng lát mỏng"). Hai điều kiện bắt buộc của một PDF: $f(x) \ge 0$ mọi nơi, và $\int_{-\infty}^{\infty} f(x)\,dx = 1$ (tổng xác suất bằng 1).

**Ví dụ — phân phối đều (uniform)** trên $[0, 4]$: $f(x) = \frac{1}{4}$ với $0\le x\le 4$, $0$ ngoài đoạn.
- Kiểm chuẩn hóa: $\int_0^4 \frac14\,dx = \frac14\cdot 4 = 1$ ✓.
- $P(1 \le X \le 3) = \int_1^3 \frac14\,dx = \frac14\cdot 2 = \frac12$.
- **Kỳ vọng** (giá trị trung bình, dùng đúng công thức mục 5 nhưng có trọng số mật độ): $E[X] = \int_0^4 x\cdot\frac14\,dx = \frac14\left[\frac{x^2}{2}\right]_0^4 = \frac14\cdot 8 = 2$ (đúng trung điểm).

**Ví dụ — PDF tam giác**: $f(x) = 2x$ trên $[0,1]$.
- Kiểm chuẩn hóa: $\int_0^1 2x\,dx = [x^2]_0^1 = 1$ ✓.
- $P(X \le 0.5) = \int_0^{0.5} 2x\,dx = [x^2]_0^{0.5} = 0.25$.

⚠ **Lỗi thường gặp — quên kiểm $\int f = 1$ hoặc nghĩ $f(x)$ là xác suất**. $f(x)$ là **mật độ**, không phải xác suất (có thể $> 1$, như $2x$ tại $x=0.9$ bằng $1.8$). Chỉ **diện tích** $\int f\,dx$ mới là xác suất. Sẽ học sâu ở tier xác suất.

❓ **Câu hỏi tự nhiên của người đọc**

- *"Vì sao công lò xo là $\frac{1}{2}kx^2$ chứ không $kx\cdot x$?"* Vì lực $F = kx$ **tăng dần** khi kéo, không phải hằng. Phải tích phân: $W = \int_0^x kt\,dt = \frac{1}{2}kx^2$. Nếu lực hằng thì mới $W = F\cdot d$.
- *"$\int v(t)\,dt$ cho quãng đường hay độ dời?"* Cho **độ dời** (có dấu). Nếu vật đổi chiều, muốn **quãng đường thực** phải lấy $\int|v(t)|\,dt$ (giống diện tích thật vs diện tích có dấu ở L07).

⚠ **Lỗi thường gặp — dùng $W = F\cdot d$ khi lực biến thiên**. Công thức $W = F\cdot d$ chỉ đúng khi $F$ **hằng**. Với $F(x)$ thay đổi (lò xo, hấp dẫn theo độ cao) phải $W = \int F\,dx$. Vd lò xo $F=kx$: dùng $F\cdot d = kx\cdot x = kx^2$ ra **gấp đôi** giá trị đúng $\frac{1}{2}kx^2$.

🔁 **Dừng lại tự kiểm tra**

1. Lực $F(x) = 6x$ N kéo vật từ $x=0$ đến $x=2$ m. Công?
2. Vận tốc $v(t) = 3t^2$. Độ dời từ $t=0$ đến $t=2$?
3. PDF $f(x) = \frac{1}{2}$ trên $[0,2]$. Tính $P(0.5 \le X \le 1.5)$ và kiểm $\int f = 1$.
4. $v(t) = t - 1$ trên $[0,2]$: độ dời và quãng đường thực có bằng nhau không?

<details><summary>Đáp án</summary>

1. $W = \int_0^2 6x\,dx = [3x^2]_0^2 = 12$ J.
2. $s = \int_0^2 3t^2\,dt = [t^3]_0^2 = 8$ m.
3. Chuẩn hóa: $\int_0^2 \frac12\,dx = 1$ ✓. $P(0.5\le X\le 1.5) = \int_{0.5}^{1.5}\frac12\,dx = \frac12\cdot 1 = \frac12$.
4. Không. Độ dời $\int_0^2 (t-1)\,dt = \left[\frac{t^2}{2}-t\right]_0^2 = 0$ (lùi rồi tiến về chỗ cũ). Quãng đường $\int_0^2 |t-1|\,dt = \int_0^1(1-t)\,dt + \int_1^2(t-1)\,dt = \frac12 + \frac12 = 1$ m.

</details>

### 📝 Tóm tắt mục 6

- Tích phân = **tổng tích lũy** khi một thừa số biến thiên: $W=\int F\,dx$, $s=\int v\,dt$.
- Công lò xo $W=\frac{1}{2}kx^2$ (lực $kx$ biến thiên) — KHÔNG dùng $F\cdot d$.
- $\int v\,dt$ = độ dời (có dấu); quãng đường thực = $\int|v|\,dt$ (lấy trị tuyệt đối khi đổi chiều).
- Xác suất liên tục: $P(a\le X\le b) = \int_a^b f\,dx$; PDF cần $f\ge 0$ và $\int_{-\infty}^\infty f = 1$. $f(x)$ là mật độ, không phải xác suất.

---

## 7. Bài tập

### Bài tập

**Bài 1**: Diện tích giới hạn $y = x^2$ và $y = 4$.

**Bài 2**: Thể tích quay $y = \sin x$, $0 \le x \le \pi$ quanh Ox.

**Bài 3**: Độ dài đường thẳng $y = 2x$ từ $x=0$ đến $x=3$.

**Bài 4**: Giá trị trung bình của $x^2$ trên $[0, 2]$.

**Bài 5**: Lực $F(x) = 3x^2$ N tác dụng kéo vật từ $x=0$ đến $x=2$ m. Tính công.

**Bài 6**: Diện tích vùng giữa $x = y^2$ và $x = 2 - y^2$ (gợi ý: tích phân theo $dy$).

**Bài 7**: Quay $y = x^2$ trên $[0, 1]$ quanh **Oy** bằng vỏ trụ. Tính $V$.

**Bài 8**: Thể tích vùng giữa $y = x$ và $y = x^2$ quay quanh Ox (vành khuyên).

**Bài 9**: Vận tốc $v(t) = t^2 - 4$ m/s trên $[0, 3]$. Tính độ dời và quãng đường thực.

**Bài 10**: PDF $f(x) = 3x^2$ trên $[0, 1]$. Kiểm $\int f = 1$, rồi tính $P(X \le 0.5)$.

### Lời giải

**Bài 1**: $x^2 = 4 \to x = \pm 2$. Trên $[-2, 2]$, $4 \ge x^2$. $S = \int_{-2}^2 (4 - x^2)\,dx = \left[4x - \frac{x^3}{3}\right]_{-2}^2 = \left(8 - \frac{8}{3}\right) - \left(-8 + \frac{8}{3}\right) =$ **$\frac{32}{3}$**.

**Bài 2**: $V = \pi\cdot\int_0^\pi \sin^2 x\,dx = \pi\cdot\int_0^\pi \frac{1 - \cos 2x}{2}\,dx = \pi\cdot\left[\frac{x}{2} - \frac{\sin(2x)}{4}\right]_0^\pi =$ **$\frac{\pi^2}{2}$**.

**Bài 3**: $f' = 2$. $L = \int_0^3 \sqrt{1+4}\,dx = \sqrt{5}\cdot3 =$ **$3\sqrt{5} \approx 6.71$**. (Kiểm tra: từ $(0,0)$ đến $(3,6)$, khoảng cách $= \sqrt{9+36} = \sqrt{45} = 3\sqrt{5}$ ✓.)

**Bài 4**: $\frac{1}{2}\cdot\int_0^2 x^2\,dx = \frac{1}{2}\cdot\left[\frac{x^3}{3}\right]_0^2 = \frac{1}{2}\cdot\frac{8}{3} =$ **$\frac{4}{3}$**.

**Bài 5**: $W = \int_0^2 3x^2\,dx = [x^3]_0^2 =$ **$8$ J**.

**Bài 6**: Cắt dải ngang ($dy$). Giao: $y^2 = 2 - y^2 \Rightarrow 2y^2 = 2 \Rightarrow y = \pm 1$. Trên $(-1,1)$ thử $y=0$: $x = 0$ (trái) và $x = 2$ (phải) → phải $= 2 - y^2$, trái $= y^2$.
$$S = \int_{-1}^1 \big[(2 - y^2) - y^2\big]\,dy = \int_{-1}^1 (2 - 2y^2)\,dy = \left[2y - \frac{2y^3}{3}\right]_{-1}^1 = \left(2 - \frac23\right) - \left(-2 + \frac23\right) = \mathbf{\frac{8}{3}}.$$

**Bài 7**: Vỏ trụ quanh Oy: $V = 2\pi\int_0^1 x\cdot x^2\,dx = 2\pi\int_0^1 x^3\,dx = 2\pi\left[\frac{x^4}{4}\right]_0^1 = 2\pi\cdot\frac14 =$ **$\frac{\pi}{2}$**.

**Bài 8**: Giao $x = x^2 \Rightarrow x = 0, 1$. Trên $(0,1)$, $x > x^2$ → ngoài $R = x$, trong $r = x^2$.
$$V = \pi\int_0^1 \big[x^2 - (x^2)^2\big]\,dx = \pi\int_0^1 (x^2 - x^4)\,dx = \pi\left[\frac{x^3}{3} - \frac{x^5}{5}\right]_0^1 = \pi\left(\frac13 - \frac15\right) =$$ **$\frac{2\pi}{15}$**.

**Bài 9**: $v = t^2 - 4 = 0 \Rightarrow t = 2$ (đổi chiều). Trên $[0,2)$: $v < 0$; trên $(2,3]$: $v > 0$.
- **Độ dời**: $\int_0^3 (t^2 - 4)\,dt = \left[\frac{t^3}{3} - 4t\right]_0^3 = (9 - 12) = \mathbf{-3}$ m.
- **Quãng đường**: $\int_0^2 (4 - t^2)\,dt + \int_2^3 (t^2 - 4)\,dt$. Phần 1: $\left[4t - \frac{t^3}{3}\right]_0^2 = 8 - \frac83 = \frac{16}{3}$. Phần 2: $\left[\frac{t^3}{3} - 4t\right]_2^3 = (9-12) - (\frac83 - 8) = -3 + \frac{16}{3} = \frac{7}{3}$. Tổng $= \frac{16}{3} + \frac{7}{3} = \mathbf{\frac{23}{3}}$ m.

**Bài 10**: Chuẩn hóa: $\int_0^1 3x^2\,dx = [x^3]_0^1 = 1$ ✓. $P(X \le 0.5) = \int_0^{0.5} 3x^2\,dx = [x^3]_0^{0.5} = 0.125 = \mathbf{\frac{1}{8}}$.

---

## 8. 🎉 HOÀN THÀNH TIER 4 — CALCULUS 1-VAR (8/8)!

Tiếp theo: **Tier 5 — Số học, Tổ hợp, Logic** (chưa triển khai).

## 📝 Tổng kết Tier 4

1. **Giới hạn**: lim dãy và hàm, định nghĩa $\varepsilon$-N/$\varepsilon$-$\delta$.
2. **Liên tục**: 3 điều kiện, định lý giá trị trung gian.
3. **Đạo hàm**: slope tiếp tuyến = vận tốc tức thời.
4. **Quy tắc**: tổng, tích, thương, chain rule (quan trọng nhất).
5. **Ứng dụng đh**: cực trị, khảo sát, l'Hôpital, tối ưu.
6. **Nguyên hàm**: đảo đạo hàm, đổi biến + từng phần.
7. **Tích phân xác định**: tổng Riemann, FTC: $\int_a^b f = F(b)-F(a)$.
8. **Ứng dụng**: diện tích giữa 2 đường (dải dọc/ngang, chia đoạn), thể tích tròn xoay (đĩa, vành khuyên, vỏ trụ), độ dài cung, giá trị trung bình, công/quãng đường, PDF xác suất — tất cả đều là "cộng lát mỏng".

🎉 Đây là **xương sống của Toán phổ thông cao + năm 1 đại học**. Tier 5+ sẽ học các nhánh khác (NT, combinatorics, ĐSTT, đa biến).
