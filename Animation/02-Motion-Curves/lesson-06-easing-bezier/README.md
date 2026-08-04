# Lesson 06 — Đường cong tốc độ: Easing & Bezier (Easing curves & Cubic-Bezier)

> Chuyển động đẹp không nằm ở việc đi từ A đến B, mà ở việc **đi nhanh chậm thế nào trên đường**. Đường cong easing chính là nơi ta điều khiển điều đó.

## Mục tiêu học tập

- Hiểu **đường cong easing (easing curve)** là đồ thị **giá trị theo thời gian**, và **độ dốc = tốc độ**.
- Phân biệt được **linear**, **ease-in**, **ease-out**, **ease-in-out** qua hình dạng đường cong và qua "cảm giác" chuyển động.
- Đọc và viết được **cubic-bezier(x1, y1, x2, y2)** — biết P0, P1, P2, P3 là gì và điểm điều khiển kéo đường cong ra sao.
- Tính được tọa độ một điểm trên đường Bezier bằng công thức Bernstein, và hiểu vì sao **tham số $t$ không phải là thời gian**.
- Thiết kế được đường cong cho một yêu cầu UI cụ thể (vào nhanh dừng êm, bật nảy overshoot...).

## Kiến thức tiền đề

- [Lesson 05 — Nội suy keyframe (keyframe interpolation)](../lesson-05-keyframe-interpolation/) — easing là **hàm bẻ cong** cái $t \in [0,1]$ mà nội suy dùng.
- [Lesson 01 — Timing & Spacing](../../01-Principles/lesson-01-timing-spacing/) — "spacing" (khoảng cách giữa các frame) chính là biểu hiện trực tiếp của độ dốc đường cong.
- Chỉ cần số học và khái niệm hàm số $y = f(x)$.

---

## 1. Vấn đề: vì sao chuyển động "linear" trông như máy?

> 💡 **Trực giác.** Thả một quả bóng: nó **tăng tốc** khi rơi, **giảm tốc** rồi dừng khi chạm sàn — không bao giờ đi với tốc độ đều. Một cái ô tô rời bến cũng thế: nhích chậm, tăng dần, rồi phanh êm. **Không vật thật nào chuyển động với tốc độ hằng số.** Vì vậy một hộp trượt từ trái sang phải với **tốc độ đều (linear)** trông "chết", như robot — mắt ta nhận ra ngay đó là giả.

Đặt bài toán cụ thể: một khối vuông cần trượt từ `x = 0px` đến `x = 300px` trong `1s`.

- **Cách máy móc (linear):** mỗi frame đi đúng `5px` (giả sử 60fps → 60 frame). Đều tăm tắp. Trông cứng.
- **Cách tự nhiên (ease-out):** frame đầu nhảy `~12px`, rồi giảm dần, frame cuối chỉ `~1px`. Khối "lao ra rồi đỗ êm" — sống động.

Sự khác biệt **không** nằm ở điểm đầu/cuối (cả hai đều 0 → 300px trong 1s) mà ở **phân bố tốc độ dọc đường**. Công cụ để mô tả và điều khiển phân bố đó chính là **đường cong easing** — nội dung cả bài này. Câu hỏi mở bài "làm sao để không giống robot?" được trả lời trọn vẹn ở mục 3–4 (chọn ease-out) và mục 6 (thêm overshoot cho vui mắt).

> 📝 **Tóm tắt mục 1.** Linear = tốc độ đều = phi tự nhiên. Cái quyết định "cảm giác thật" là **tốc độ thay đổi thế nào theo thời gian**, và ta điều khiển nó bằng đường cong easing.

---

## 2. Đường cong easing là gì? (đồ thị giá-trị–thời-gian)

**(a) Là gì.** Đường cong easing là đồ thị của một hàm

$$y = f(x), \qquad x \in [0,1],\; y \in [0,1]$$

trong đó:

- **Trục hoành $x$ = thời gian đã trôi**, chuẩn hóa về $[0,1]$ ($x=0$ lúc bắt đầu, $x=1$ lúc kết thúc animation).
- **Trục tung $y$ = tiến độ / giá trị**, cũng chuẩn hóa về $[0,1]$ ($y=0$ ở trạng thái đầu, $y=1$ ở trạng thái cuối).

Cả điểm đầu và điểm cuối đều bị "ghim": $f(0)=0$ và $f(1)=1$. Nghĩa là **luôn xuất phát từ đầu và luôn về đích đúng lúc** — easing chỉ đổi *cách đi giữa đường*, không đổi đích.

**(b) Vì sao cần đại lượng này.** Vì ta muốn tách bạch hai thứ:
- *Đi đâu* (từ trạng thái A tới B) — do keyframe quy định (Lesson 05).
- *Đi nhanh chậm ra sao* — do đường cong easing quy định.

Nhờ tách bạch, cùng một đoạn đường A→B ta có thể "gắn" bất kỳ tính cách chuyển động nào (mạnh mẽ, nhẹ nhàng, tinh nghịch) chỉ bằng đổi đường cong, không đụng tới keyframe.

**(c) Ý nghĩa của độ dốc — ví dụ số cụ thể.** Điểm mấu chốt:

$$\text{tốc độ tại thời điểm } x \;=\; \text{độ dốc (slope) của đường cong} \;=\; f'(x)$$

- **Dốc đứng** (slope lớn) → giá trị đang tăng nhanh → **chuyển động nhanh**.
- **Thoai thoải** (slope nhỏ) → giá trị tăng chậm → **chuyển động chậm**.
- **Nằm ngang** (slope = 0) → giá trị đứng yên → **vật dừng lại** trong khoảnh khắc đó.

Đọc slope bằng số: nếu trong khoảng thời gian $x: 0.0 \to 0.1$ (10% thời gian đầu) mà giá trị đi từ $y: 0.0 \to 0.30$, thì tốc độ trung bình đoạn đó là $\dfrac{0.30 - 0}{0.1 - 0} = 3.0$ (giá trị/thời gian). Nếu đoạn cuối $x: 0.9 \to 1.0$ giá trị chỉ đi $0.97 \to 1.00$, tốc độ là $\dfrac{0.03}{0.1} = 0.3$ — chậm hơn **10 lần**. Đó chính là "lao ra rồi đỗ êm".

**Linear là đường chéo $y = x$.** Bảng giá trị:

| $x$ (thời gian) | 0.0 | 0.25 | 0.5 | 0.75 | 1.0 |
|---|---|---|---|---|---|
| $y$ (giá trị, linear) | 0.00 | 0.25 | 0.50 | 0.75 | 1.00 |

Mỗi bước thời gian 0.25 → giá trị cũng đi đúng 0.25. Slope = 1 ở mọi nơi → tốc độ hằng → chính là chuyển động "robot" ở mục 1.

> ⚠ **Lỗi thường gặp.** Nhầm **đường cong easing** với **đường đi (path) của vật**. Đường cong easing **KHÔNG** phải quỹ đạo trong không gian. Một hộp trượt thẳng theo trục ngang vẫn có đường cong easing hình chữ S — vì trục tung của đồ thị là *tiến độ* (0→1), không phải *tọa độ y trên màn hình*. Quỹ đạo cong trong không gian là chủ đề [Lesson 07 — Cung chuyển động](../lesson-07-arcs-path/), khác hẳn.

> 🔁 **Dừng lại tự kiểm tra.**
> 1. Một đường cong có đoạn **nằm ngang** ở giữa (slope ≈ 0 quanh $x=0.5$). Vật sẽ làm gì lúc đó?
> 2. Đường cong đi qua điểm $(0.5,\ 0.8)$. Tới nửa thời gian, vật đã đi được bao nhiêu phần đường?
>
> <details><summary>Đáp án</summary>
>
> 1. Vật gần như **đứng khựng** (tốc độ ≈ 0) ở giữa chặng, rồi lại đi tiếp — kiểu "khựng giữa đường".
> 2. Đã đi **80%** quãng đường dù mới hết **50%** thời gian → phần đầu nhanh, phần cuối sẽ chậm lại (đặc trưng ease-out).
> </details>

> 📝 **Tóm tắt mục 2.** Easing curve = đồ thị $y=f(x)$ với $x$ = thời gian, $y$ = tiến độ, ghim $(0,0)$ và $(1,1)$. **Độ dốc = tốc độ.** Linear là đường chéo $y=x$ (tốc độ đều).

---

## 3. Ba họ easing cơ bản: ease-in, ease-out, ease-in-out

> 💡 **Trực giác bằng đời sống.**
> - **ease-in** = "xe rời bến": bắt đầu **chậm**, càng về sau càng nhanh. Đường cong **thoai thoải lúc đầu, dốc lên cuối**.
> - **ease-out** = "xe vào bến": bắt đầu **nhanh**, càng về sau càng chậm để đỗ êm. Đường cong **dốc lúc đầu, thoai thoải cuối**.
> - **ease-in-out** = "cả hành trình": chậm — nhanh — chậm. Đường cong hình **chữ S**.

| Họ | Đầu chặng | Cuối chặng | Hình đường cong | Cảm giác |
|---|---|---|---|---|
| linear | đều | đều | đường chéo | máy móc |
| ease-in | chậm | nhanh | lõm rồi vọt | "hút vào", tăng tốc |
| ease-out | nhanh | chậm | vọt rồi phẳng | "đỗ êm", giảm tốc |
| ease-in-out | chậm | chậm (nhanh ở giữa) | chữ S | tự nhiên nhất cho UI |

**Đọc bằng số — "tới 50% giá trị lúc nào?"** Đây là phép thử nhanh để phân loại (chi tiết cách tính ở mục 5):

| Đường cong | Thời gian đạt $y = 0.5$ | Diễn giải |
|---|---|---|
| linear | $x \approx 0.50$ | đúng giữa |
| ease-in `(.42,0,1,1)` | $x \approx 0.66$ | phải **quá nửa thời gian** mới đi được nửa đường → khởi đầu chậm |
| ease-out `(0,0,.58,1)` | $x \approx 0.34$ | mới **hơn 1/3 thời gian** đã đi nửa đường → khởi đầu nhanh |
| ease-in-out `(.42,0,.58,1)` | $x = 0.50$ | đối xứng, đạt nửa đúng giữa (nhưng lối tới khác linear) |

> ❓ **Câu hỏi tự nhiên của người đọc.**
> - *"Khi nào dùng cái nào?"* Quy tắc UI phổ biến: phần tử **đi vào màn hình** dùng **ease-out** (lao vào rồi đỗ êm — mắt bắt kịp đích ngay); phần tử **rời khỏi màn hình** dùng **ease-in** (chậm rồi vọt đi — không cần thấy nó "đỗ" ở đâu); chuyển động **qua lại trong màn hình** dùng **ease-in-out** (mượt hai đầu).
> - *"ease-in-out có giống linear không, vì cùng đạt 0.5 ở giữa?"* Không. Cùng đi qua $(0.5, 0.5)$ nhưng **lối đi khác**: ease-in-out chậm ở hai đầu, nhanh ở giữa (đường cong chữ S uốn quanh đường chéo), trong khi linear thẳng tưng. "Cảm giác" khác hẳn.

> 🔁 **Dừng lại tự kiểm tra.** Một icon menu **trượt ra từ mép trái** vào màn hình. Nên dùng ease-in hay ease-out? Vì sao?
>
> <details><summary>Đáp án</summary>
>
> **ease-out.** Nó lao vào nhanh (thu hút chú ý ngay) rồi đỗ êm ở vị trí cuối — mắt người dùng thấy đích đến rõ ràng, cảm giác "chắc tay". Dùng ease-in cho phần tử **đi vào** sẽ thấy nó ì ạch lúc đầu rồi biến mất quá nhanh ở cuối — khó chịu.
> </details>

> 📝 **Tóm tắt mục 3.** ease-in = chậm→nhanh (lõm); ease-out = nhanh→chậm (lồi/đỗ êm); ease-in-out = chữ S. UI: vào dùng ease-out, ra dùng ease-in.

---

## 4. Cubic-Bezier: điều khiển đường cong bằng 2 điểm

> 💡 **Trực giác.** Thay vì mô tả đường cong bằng công thức khó, ta **kéo hai cái "tay nắm"**. Tưởng tượng đường cong là một sợi dây thép nối $(0,0)$ tới $(1,1)$; hai điểm điều khiển $P_1, P_2$ như hai nam châm hút sợi dây về phía chúng. Kéo nam châm → dây uốn theo. Đây đúng là cách công cụ animation (CSS, After Effects, Figma) cho bạn chỉnh đường cong.

### 4.1 Bốn điểm của đường cong bậc ba (cubic)

Đường **cubic Bezier** dùng cho easing có **4 điểm**:

- $P_0 = (0, 0)$ — **cố định** (điểm bắt đầu, ghim).
- $P_3 = (1, 1)$ — **cố định** (điểm kết thúc, ghim).
- $P_1 = (x_1, y_1)$ — **điểm điều khiển 1**, kéo được.
- $P_2 = (x_2, y_2)$ — **điểm điều khiển 2**, kéo được.

Trong CSS ta chỉ viết 4 số của **hai điểm kéo được**:

```css
transition-timing-function: cubic-bezier(x1, y1, x2, y2);
/*                                        └P1─┘  └P2─┘        */
```

$P_0$ và $P_3$ không cần ghi vì chúng luôn là $(0,0)$ và $(1,1)$.

**Ràng buộc quan trọng:** $x_1, x_2$ **phải nằm trong $[0,1]$** (thời gian không thể lùi hay vọt quá đích). Còn $y_1, y_2$ **được phép ra ngoài $[0,1]$** — đó là cách tạo hiệu ứng **overshoot / nảy** (mục 6).

### 4.2 Công thức (Bernstein) — và cách tính

Điểm trên đường cong tại tham số $t \in [0,1]$:

$$B(t) = (1-t)^3\,P_0 + 3(1-t)^2 t\,P_1 + 3(1-t)\,t^2\,P_2 + t^3\,P_3$$

Vì đây là điểm 2 chiều, tách thành hai tọa độ. Với $P_0=(0,0),\ P_3=(1,1)$:

$$x(t) = 3(1-t)^2 t\,x_1 + 3(1-t)t^2\,x_2 + t^3$$
$$y(t) = 3(1-t)^2 t\,y_1 + 3(1-t)t^2\,y_2 + t^3$$

> ⚠ **Điểm dễ sai nhất: $t$ KHÔNG phải thời gian.** $t$ chỉ là **tham số vẽ đường cong**. Khi chạy animation, trình duyệt biết **thời gian $x$** (ví dụ đã trôi 40% → $x = 0.4$), rồi phải **giải ngược** $x(t) = 0.4$ tìm $t$, sau đó tính $y(t)$ để ra tiến độ. Bước "cho $t$ đều rồi lấy $y$" là **SAI** vì $t$ đều không cho $x$ (thời gian) đều. Trình duyệt (và viz của bài này) dùng tìm nghiệm (bisection/Newton) để đảo $x(t)=x$.

### 4.3 Bốn preset chuẩn của CSS — tọa độ cụ thể (≥ 4 ví dụ)

| Từ khóa CSS | `cubic-bezier(...)` | $P_1$ | $P_2$ | Ghi chú |
|---|---|---|---|---|
| `linear` | `cubic-bezier(0, 0, 1, 1)` | $(0,0)$ | $(1,1)$ | điểm điều khiển nằm ngay trên đường chéo → $y=x$ |
| `ease` (mặc định) | `cubic-bezier(.25, .1, .25, 1)` | $(0.25,\,0.10)$ | $(0.25,\,1.00)$ | ease-out nhẹ, êm; mặc định của trình duyệt |
| `ease-in` | `cubic-bezier(.42, 0, 1, 1)` | $(0.42,\,0.00)$ | $(1.00,\,1.00)$ | $y_1=0$ → xuất phát nằm ngang → chậm đầu |
| `ease-out` | `cubic-bezier(0, 0, .58, 1)` | $(0.00,\,0.00)$ | $(0.58,\,1.00)$ | về đích nằm ngang → chậm cuối |
| `ease-in-out` | `cubic-bezier(.42, 0, .58, 1)` | $(0.42,\,0.00)$ | $(0.58,\,1.00)$ | đối xứng → chữ S |
| `back`/nảy (bonus) | `cubic-bezier(.68, -.55, .27, 1.55)` | $(0.68,\,-0.55)$ | $(0.27,\,1.55)$ | $y$ ra ngoài $[0,1]$ → lùi lại rồi vọt quá (overshoot) |

**Mẹo đọc tọa độ nhanh:**
- $y_1$ **nhỏ** (gần 0) → khởi đầu **chậm** (ease-in). Ví dụ `ease-in` có $y_1=0$.
- $y_2$ **lớn** (gần 1) và $x_2$ nhỏ → về đích **chậm/êm** (ease-out). Ví dụ `ease-out` có $P_2=(0.58,1)$.
- Hướng xuất phát của đường cong **chỉ về phía $P_1$**: nếu $P_1$ nằm sang phải mà thấp (như $(0.42,0)$) → đường cong "bò ngang" lúc đầu → chậm.

> ❓ **Câu hỏi tự nhiên.** *"Sao `linear` lại là `(0,0,1,1)` chứ không phải cái gì đó?"* Vì khi $P_1=(0,0)$ và $P_2=(1,1)$, cả hai điểm điều khiển nằm **đúng trên** đường chéo $(0,0)\text{–}(1,1)$, nên sợi dây thép không bị "hút" đi đâu → thẳng tưng → $y=x$. Kiểm chứng: thay vào công thức, $x(t) = 3(1-t)t^2 + t^3 = 3t^2 - 2t^3$ và $y(t)$ y hệt → $x(t) = y(t)$ ở mọi $t$ → đồ thị $y$ theo $x$ là đường chéo. ✓

> 📝 **Tóm tắt mục 4.** cubic-bezier = 4 điểm; $P_0(0,0), P_3(1,1)$ cố định, chỉ viết $P_1, P_2$. $x$ ràng buộc $[0,1]$, $y$ tự do (để overshoot). Tham số $t$ ≠ thời gian → phải giải ngược.

---

## 5. Walk-through số: tính điểm trên đường cong

Ta tính trực tiếp bằng công thức mục 4.2. Nhắc lại, với $P_0=(0,0),P_3=(1,1)$:

$$x(t) = 3(1-t)^2 t\,x_1 + 3(1-t)t^2\,x_2 + t^3, \qquad y(t) = 3(1-t)^2 t\,y_1 + 3(1-t)t^2\,y_2 + t^3$$

### 5.1 ease-out `cubic-bezier(0, 0, .58, 1)` tại $t = 0.5$

$P_1=(0,0),\ P_2=(0.58,1)$. Vì $x_1=y_1=0$, số hạng đầu triệt tiêu.

$$\begin{aligned}
x(0.5) &= 3(0.5)^2(0.5)\cdot 0 + 3(0.5)(0.5)^2\cdot 0.58 + (0.5)^3 \\
       &= 0 + 3(0.5)(0.25)(0.58) + 0.125 \\
       &= 0.2175 + 0.125 = \mathbf{0.3425}
\end{aligned}$$

$$\begin{aligned}
y(0.5) &= 0 + 3(0.5)(0.25)\cdot 1 + 0.125 = 0.375 + 0.125 = \mathbf{0.5}
\end{aligned}$$

**Đọc kết quả:** tại thời điểm $x = 0.3425$ (mới ~34% thời gian) thì $y = 0.5$ (đã đi nửa đường). → khởi đầu **nhanh**, đúng chất ease-out. ✓ (khớp với bảng "đạt 0.5 lúc $x\approx 0.34$" ở mục 3).

### 5.2 ease-in `cubic-bezier(.42, 0, 1, 1)` tại $t = 0.5$

$P_1=(0.42,0),\ P_2=(1,1)$.

$$\begin{aligned}
x(0.5) &= 3(0.25)(0.5)(0.42) + 3(0.5)(0.25)(1) + 0.125 \\
       &= 0.1575 + 0.375 + 0.125 = \mathbf{0.6575}
\end{aligned}$$

$$y(0.5) = 3(0.25)(0.5)(0) + 3(0.5)(0.25)(1) + 0.125 = 0 + 0.375 + 0.125 = \mathbf{0.5}$$

**Đọc:** phải tới $x = 0.6575$ (~66% thời gian) mới đi được nửa đường → khởi đầu **chậm** = ease-in. ✓

### 5.3 ease-in-out `cubic-bezier(.42, 0, .58, 1)` tại $t = 0.5$

$P_1=(0.42,0),\ P_2=(0.58,1)$.

$$x(0.5) = 3(0.25)(0.5)(0.42) + 3(0.5)(0.25)(0.58) + 0.125 = 0.1575 + 0.2175 + 0.125 = \mathbf{0.5}$$
$$y(0.5) = 0 + 3(0.5)(0.25)(1) + 0.125 = \mathbf{0.5}$$

Đi qua đúng **tâm $(0.5, 0.5)$** — đối xứng. ✓

### 5.4 Bảng "spacing" — vì sao $t$ đều ≠ thời gian đều

Với ease-out, lấy các mốc $t$ **đều nhau** và tính $(x, y)$ (dùng công thức 5.1):

| $t$ | $x(t)$ (thời gian) | $y(t)$ (giá trị) |
|---|---|---|
| 0.2 | 0.064 | 0.104 |
| 0.4 | 0.231 | 0.352 |
| 0.5 | 0.343 | 0.500 |
| 0.6 | 0.467 | 0.648 |
| 0.8 | 0.735 | 0.896 |

$t$ nhích đều 0.2 nhưng $x$ (thời gian) nhảy không đều (0.064 → 0.231 → 0.467 → 0.735). **Đó là bằng chứng $t \ne$ thời gian.** Muốn giá trị tại thời gian đều (0.25, 0.5, 0.75) ta phải **đảo ngược** — xem bảng spacing thực tế trong Lời giải Bài 4.

> ❓ **Câu hỏi tự nhiên.** *"Tính giải ngược có đắt không?"* Rẻ. Vì $x(t)$ **đơn điệu tăng** khi $x_1,x_2 \in [0,1]$, chỉ cần **bisection** ~20–30 vòng là ra $t$ với sai số $10^{-6}$. Trình duyệt còn dùng Newton-Raphson nhanh hơn. Viz của bài này dùng bisection — bạn kéo tay nắm là thấy chấm chạy realtime.

> 🔁 **Dừng lại tự kiểm tra.** Tính $x(t)$ và $y(t)$ của **linear** `cubic-bezier(0,0,1,1)` tại $t=0.25$, rồi kiểm tra có nằm trên đường chéo không.
>
> <details><summary>Đáp án</summary>
>
> $x_1=y_1=0,\ x_2=y_2=1$. $x(0.25) = 0 + 3(0.75)(0.0625)(1) + (0.25)^3 = 0.140625 + 0.015625 = 0.15625$. $y(0.25)$ y hệt $= 0.15625$. Vì $x = y$ → nằm đúng trên đường chéo $y=x$. ✓ (Lưu ý $t=0.25$ cho $x=0.156$, lại một minh chứng $t\ne$ thời gian, dù đồ thị vẫn là đường thẳng.)
> </details>

> 📝 **Tóm tắt mục 5.** Thay số vào Bernstein là ra $(x,y)$. ease-out đạt $y=0.5$ ở $x\approx0.34$, ease-in ở $x\approx0.66$. Tham số $t$ đều KHÔNG cho thời gian đều → giải ngược $x(t)=x$ bằng bisection.

---

## 6. Overshoot & nảy: khi $y$ ra ngoài $[0,1]$

> 💡 **Trực giác.** Kéo tay nắm $P_2$ **lên trên $y=1$** (ví dụ $y_2 = 1.3$): đường cong **vọt qua đích rồi lùi về** — vật "lố" quá điểm cuối rồi giật lại, y như quả bóng nảy hoặc nút bấm "bật lên". Kéo $P_1$ **xuống dưới $y=0$** ($y_1 < 0$): vật **lùi lại một chút** trước khi lao đi — kiểu "lấy đà".

Ví dụ kinh điển `cubic-bezier(.68, -.55, .27, 1.55)`:
- $P_1 = (0.68, -0.55)$ → $y_1 < 0$: đầu chặng vật **lùi** (undershoot).
- $P_2 = (0.27, 1.55)$ → $y_2 > 1$: cuối chặng vật **vọt quá 1** rồi mới về (overshoot).

Đây là lý do CSS cho phép $y \notin [0,1]$ nhưng **bắt buộc $x \in [0,1]$**: giá trị có thể "lố" (đi quá 100% rồi quay lại) nhưng **thời gian thì không thể chạy ngược**.

> ⚠ **Lỗi thường gặp.** Đặt $x_1$ hoặc $x_2$ ra ngoài $[0,1]$ (ví dụ `cubic-bezier(1.5, 0, .5, 1)`) → CSS **coi là không hợp lệ** và bỏ qua (rơi về mặc định). Overshoot phải làm bằng **$y$**, không phải $x$.

> 📝 **Tóm tắt mục 6.** $y$ ra ngoài $[0,1]$ → overshoot/nảy/lấy đà. $x$ luôn phải trong $[0,1]$ (thời gian không lùi).

---

## 7. Bài tập

**Bài 1 (đọc tọa độ → phân loại).** Không tính toán, chỉ nhìn tọa độ, hãy phân loại mỗi đường cong là linear / ease-in / ease-out / ease-in-out:
- a) `cubic-bezier(.42, 0, 1, 1)`
- b) `cubic-bezier(0, 0, .58, 1)`
- c) `cubic-bezier(.42, 0, .58, 1)`
- d) `cubic-bezier(0, 0, 1, 1)`

**Bài 2 (tính điểm).** Cho `ease` `cubic-bezier(.25, .1, .25, 1)`. Tính $x(t)$ và $y(t)$ tại $t = 0.5$. Điểm này nằm phía trên hay phía dưới đường chéo $y=x$? Điều đó nói gì về tính chất của `ease`?

**Bài 3 (thiết kế).** Bạn cần một hiệu ứng cho **thẻ thông báo (toast)** trượt vào: **lao vào thật nhanh** rồi **đỗ thật êm** (mạnh hơn cả ease-out thường). Hãy đề xuất một bộ 4 số `cubic-bezier(...)` hợp lệ và giải thích vì sao mỗi tọa độ chọn như vậy.

**Bài 4 (spacing).** Với ease-out `cubic-bezier(0,0,.58,1)`, một vật đi từ 0 → 300px. Ở các mốc **thời gian đều** $x = 0,\ 0.25,\ 0.5,\ 0.75,\ 1$, hãy ước lượng vật đang ở đâu (px), rồi tính khoảng cách (spacing) giữa các mốc. Spacing nói gì về tốc độ?

---

## 8. Lời giải chi tiết

**Bài 1.**
- a) `(.42,0,1,1)`: $y_1 = 0$ (xuất phát nằm ngang → chậm đầu), $P_2=(1,1)$ ở góc → cuối dốc đứng. → **ease-in**.
- b) `(0,0,.58,1)`: $P_1=(0,0)$ khiến đầu dốc, $P_2=(0.58,1)$ khiến về đích nằm ngang → chậm cuối. → **ease-out**.
- c) `(.42,0,.58,1)`: $y_1=0$ (chậm đầu) **và** $y_2=1,x_2=0.58$ (chậm cuối), đối xứng qua tâm. → **ease-in-out** (chữ S).
- d) `(0,0,1,1)`: điểm điều khiển nằm trên đường chéo → thẳng. → **linear**.

**Bài 2.** $P_1=(0.25,0.1),\ P_2=(0.25,1)$.

$$x(0.5) = 3(0.25)(0.5)(0.25) + 3(0.5)(0.25)(0.25) + 0.125 = 0.09375 + 0.09375 + 0.125 = \mathbf{0.3125}$$

$$y(0.5) = 3(0.25)(0.5)(0.1) + 3(0.5)(0.25)(1) + 0.125 = 0.0375 + 0.375 + 0.125 = \mathbf{0.5375}$$

Điểm $(0.3125,\ 0.5375)$: tại thời gian $x=0.3125$ đã đi được $y=0.5375$ (> 0.5). So với đường chéo, ở cùng $x=0.3125$ thì linear chỉ cho $y=0.3125$ — điểm của `ease` **nằm phía trên** đường chéo. → `ease` **đi nhanh hơn linear ở nửa đầu** rồi chậm lại ở cuối (nghiêng về ease-out). Đúng như tên "ease" mặc định: êm ái, dứt điểm sớm.

**Bài 3.** Cách tiếp cận: "lao vào nhanh" ⇒ đầu chặng phải rất dốc ⇒ kéo $P_1$ lên cao (tăng $y_1$) với $x_1$ nhỏ; "đỗ thật êm" ⇒ cuối chặng phải phẳng ⇒ $P_2$ có $y_2=1$ và $x_2$ vừa phải. Một đề xuất hợp lệ:

$$\texttt{cubic-bezier(0.16, 1, 0.30, 1)}$$

- $P_1 = (0.16,\ 1)$: $x_1$ nhỏ nhưng $y_1=1$ rất cao → đường cong **vọt lên gần như tức thì** ở đầu (tốc độ đầu cực lớn).
- $P_2 = (0.30,\ 1)$: $y_2=1$, $x_2$ nhỏ → phần lớn thời gian cuối đường cong **áp sát $y=1$**, gần phẳng → đỗ cực êm.
- $x_1=0.16, x_2=0.30$ đều trong $[0,1]$ → hợp lệ.

(Đây chính là dạng "easeOutExpo/easeOutQuint" quen thuộc.) Nhiều đáp án khác cũng đúng miễn: $y_1$ lớn + $x_1$ nhỏ (dốc đầu), $y_2=1$ + $x_2$ nhỏ–vừa (phẳng cuối), và $x_1,x_2\in[0,1]$.

**Bài 4.** Cách tiếp cận: với mỗi thời gian $x$, **giải ngược** $x(t)=x$ tìm $t$ (bằng bisection/nội suy từ bảng 5.4), rồi tính $y(t)$, rồi px $= 300y$.

| Thời gian $x$ | $t$ (giải ngược) | $y$ (giá trị) | Vị trí (px) | Spacing so với mốc trước |
|---|---|---|---|---|
| 0.00 | 0.000 | 0.000 | 0 | — |
| 0.25 | ≈ 0.417 | ≈ 0.377 | ≈ 113 | **113** |
| 0.50 | ≈ 0.625 | ≈ 0.684 | ≈ 205 | **92** |
| 0.75 | ≈ 0.807 | ≈ 0.900 | ≈ 270 | **65** |
| 1.00 | 1.000 | 1.000 | 300 | **30** |

Spacing giảm dần: **113 → 92 → 65 → 30 px**. Khoảng cách giữa các mốc thời gian đều nhau **thu hẹp dần** → vật **chậm dần** về cuối. Đây chính là biểu hiện của ease-out và cũng là "spacing chart" trong nguyên lý [Timing & Spacing](../../01-Principles/lesson-01-timing-spacing/): frame **thưa = nhanh**, frame **dày = chậm**. Bật tùy chọn "dấu vết thời gian đều" trong [visualization.html](./visualization.html) để thấy các chấm này dồn lại ở cuối.

> 📝 **Tóm tắt mục 8.** Đọc tọa độ đủ để phân loại; tính điểm bằng Bernstein; thiết kế easing = đặt tay nắm theo yêu cầu tốc độ; spacing (khoảng cách mốc thời gian đều) chính là hình ảnh của tốc độ.

---

## Code & Minh họa

- **[visualization.html](./visualization.html)** — **trình chỉnh cubic-bezier tương tác**: kéo hai tay nắm $P_1, P_2$ trên ô $[0,1]\times[0,1]$ để bẻ đường cong, xem chuỗi `cubic-bezier(...)` cập nhật realtime, bấm **Play** để một chấm chạy theo đúng easing đó trên thanh ngang (so sánh cạnh chấm linear), và bật "dấu vết thời gian đều" để thấy spacing dồn/giãn theo tốc độ. Có sẵn các preset linear / ease / ease-in / ease-out / ease-in-out / nảy.

---

## Bài tiếp theo

**[Lesson 07 — Cung chuyển động (Arcs & Motion Path)](../lesson-07-arcs-path/)**: easing điều khiển *tốc độ theo thời gian*; bài sau điều khiển *hình dạng quỹ đạo trong không gian* — vì sao vật thật đi theo **cung cong** chứ không đường thẳng, và cách kết hợp motion path với easing để có chuyển động sống động hoàn chỉnh.
