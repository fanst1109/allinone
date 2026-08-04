// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: Animation/02-Motion-Curves/lesson-05-keyframe-interpolation/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 05 — Keyframe & Nội suy (Keyframe & Interpolation)

> Họa sĩ chỉ vẽ vài **khung mấu chốt**; máy tính "điền vào chỗ trống" cho tất cả khung ở giữa. Hiểu cách máy tính điền — đó là nội suy (interpolation).

## Mục tiêu học tập

- Phân biệt **keyframe** (khung chính) và **inbetween / tween** (khung giữa).
- Nắm công thức **nội suy tuyến tính (linear interpolation)**: $p(t) = (1-t)\\,A + t\\,B$ và tính được bằng tay.
- Hiểu vì sao **nội suy mượt (smooth / spline)** khác nội suy tuyến tính: đường đi cong, vận tốc liên tục, không có "góc gãy" tại keyframe.
- Nối lại với **timing & spacing** ([Lesson 01](../../01-Principles/lesson-01-timing-spacing/)): khoảng cách giữa các inbetween chính là spacing → quyết định cảm giác nhanh/chậm.

## Kiến thức tiền đề

- [Lesson 01 — Timing & Spacing](../../01-Principles/lesson-01-timing-spacing/): số khung (timing) và khoảng cách giữa khung (spacing).
- Số học: cộng, trừ, nhân với phân số. Không cần gì hơn.

---

## 1. Bức tranh lớn: keyframe và inbetween

> 💡 **Trực giác.** Hình dung bạn muốn một quả bóng bay từ **góc trái dưới** lên **đỉnh** rồi xuống **góc phải dưới**. Bạn *không* vẽ cả 72 khung của một cảnh 3 giây (24 hình/giây). Bạn chỉ vẽ **3 khung quan trọng**: bóng ở trái, bóng ở đỉnh, bóng ở phải. Ba khung đó là **keyframe**. Việc "điền" 69 khung còn lại — bóng ở đâu tại mỗi thời điểm giữa — gọi là **inbetween**. Ngày xưa có cả một nghề "inbetweener" ngồi vẽ tay các khung này; ngày nay máy tính tính chúng bằng **nội suy (interpolation)**.

Nói cách khác, làm animation là bài toán **"cho vài điểm mốc, hãy dựng lại cả chuyển động liên tục"**. Keyframe là dữ liệu bạn cho; inbetween là thứ máy suy ra.

Cả bài này xoay quanh đúng một câu hỏi: *"giữa hai keyframe, đặt vật ở đâu?"* — và có nhiều cách trả lời, cho **quỹ đạo khác nhau**.

> 📝 **Tóm tắt mục 1.**
> - **Keyframe** = khung mốc do người làm chỉ định.
> - **Inbetween / tween** = khung giữa, do máy nội suy ra.
> - Animation = tái dựng chuyển động liên tục từ một vài keyframe.

---

## 2. Keyframe (khung chính) — định nghĩa đầy đủ

**(a) Là gì.** Keyframe là một khung mà bạn **chỉ định tường minh** trạng thái của vật (vị trí, góc xoay, kích thước, màu...) tại **một thời điểm cụ thể**. Nó là một cặp *(thời điểm, giá trị)*: "tại giây 1.5, quả bóng ở tọa độ (320, 90)".

**(b) Vì sao cần khái niệm này.** Vì vẽ tay hoặc chỉ định *mọi* khung là bất khả thi (72 khung cho 3 giây, và một cảnh phim có hàng nghìn cảnh). Keyframe cho phép bạn mô tả chuyển động bằng **rất ít dữ liệu** — chỉ những "cột mốc" thật sự quan trọng — rồi để máy lấp phần còn lại.

**(c) Ví dụ số cụ thể.** Một chuyển động 3 giây, mô tả bằng 3 keyframe:

| Keyframe | Thời điểm $t$ | Vị trí $(x, y)$ | Ý nghĩa |
|:--------:|:------------:|:---------------:|---------|
| $K_1$ | 0.0 s | (80, 280) | xuất phát, góc trái dưới |
| $K_2$ | 1.5 s | (320, 90) | đỉnh, giữa màn hình |
| $K_3$ | 3.0 s | (560, 280) | kết thúc, góc phải dưới |

Chỉ 3 dòng dữ liệu mô tả trọn một cú nhảy vòng cung. Mọi khung khác được **suy ra**.

> ⚠ **Lỗi thường gặp.** Nghĩ "keyframe = mọi khung tôi thấy trên màn hình". Không. Trên timeline, keyframe thường được đánh dấu riêng (hình thoi/chấm đậm); phần lớn khung *không* phải keyframe — chúng là inbetween máy sinh ra. Đặt quá nhiều keyframe = tự tay làm việc của máy, mất luôn lợi ích của nội suy.

---

## 3. Inbetween / Tween — định nghĩa đầy đủ

**(a) Là gì.** Inbetween (hay **tween**, viết tắt) là một khung **nằm giữa** hai keyframe, có giá trị được **tính ra** (nội suy) chứ không do người chỉ định. Nếu keyframe là "điểm neo" thì inbetween là "đường nối" giữa các neo.

**(b) Vì sao cần.** Vì mắt người cần ~24 khung/giây để thấy chuyển động mượt. Giữa hai keyframe cách nhau 1.5 giây có ~36 inbetween. Tự vẽ 36 khung này rất tốn công; để máy nội suy vừa nhanh vừa nhất quán.

**(c) Ví dụ số cụ thể.** Giữa $K_1(0.0\\text{s})$ và $K_2(1.5\\text{s})$, nếu chạy 24 hình/giây thì có 36 inbetween. Khung thứ 9 (tại $t = 9/24 = 0.375$ s, tức 25% quãng đường $K_1 \\to K_2$) sẽ được nội suy — mục 4 tính con số chính xác.

> ❓ **Câu hỏi tự nhiên của người đọc.**
> - *"Máy tính inbetween thế nào?"* → Bằng công thức nội suy — mục 4 (tuyến tính) và mục 5 (mượt).
> - *"Có bắt buộc chia đều thời gian không?"* → Không. Bạn có thể để $K_2$ ở giây 1.0 thay vì 1.5; số inbetween mỗi đoạn thay đổi theo. Đây chính là **timing** (Lesson 01).
> - *"Inbetween có thể cong không, hay chỉ đi thẳng?"* → Tùy kiểu nội suy. Tuyến tính đi thẳng; spline đi cong (mục 5).

---

## 4. Nội suy tuyến tính (Linear Interpolation)

> 💡 **Trực giác.** Nội suy tuyến tính = "đi thẳng đều từ A tới B". Tưởng tượng bạn kéo một sợi dây căng thẳng nối A và B, rồi thả một hạt trượt đều dọc dây. Tại 0% đường, hạt ở A; tại 100%, hạt ở B; tại 40%, hạt ở đúng điểm 40% của đoạn thẳng.

Gọi $t \\in [0, 1]$ là **tiến độ chuẩn hóa** trong đoạn (0 = ở keyframe đầu $A$, 1 = ở keyframe cuối $B$). Vị trí nội suy:

$$p(t) = (1-t)\\,A + t\\,B$$

Đọc công thức: $p(t)$ là **trung bình có trọng số** của $A$ và $B$. Trọng số của $A$ là $(1-t)$ (giảm dần), trọng số của $B$ là $t$ (tăng dần), và $(1-t) + t = 1$ luôn đúng nên kết quả luôn nằm *giữa* $A$ và $B$.

Dạng tương đương hay gặp (khai triển ra):

$$p(t) = A + t\\,(B - A)$$

tức "xuất phát từ $A$, cộng thêm $t$ phần của quãng $(B-A)$".

### 4.1 Bốn ví dụ số (kiểm cả 2 vế)

**Ví dụ 1 — 1 chiều, $A = 0, B = 100$:**

| $t$ | $p(t) = (1-t)\\cdot 0 + t\\cdot 100$ | Kiểm tra |
|:---:|:---:|:---|
| 0 | $1\\cdot 0 + 0\\cdot 100 = 0$ | = $A$ ✓ (ở keyframe đầu) |
| 0.25 | $0.75\\cdot 0 + 0.25\\cdot 100 = 25$ | 1/4 đường ✓ |
| 0.5 | $0.5\\cdot 0 + 0.5\\cdot 100 = 50$ | trung điểm ✓ |
| 1 | $0\\cdot 0 + 1\\cdot 100 = 100$ | = $B$ ✓ (ở keyframe cuối) |

**Ví dụ 2 — 2 chiều, $A = (80, 280), B = (320, 90)$, tại $t = 0.25$:**

$$x = 0.75\\cdot 80 + 0.25\\cdot 320 = 60 + 80 = 140$$
$$y = 0.75\\cdot 280 + 0.25\\cdot 90 = 210 + 22.5 = 232.5$$

Vậy inbetween tại 25% đoạn $K_1 \\to K_2$ là $(140,\\ 232.5)$.

**Ví dụ 3 — số âm, $A = -40, B = 60$, tại $t = 0.3$:**

$$p = 0.7\\cdot(-40) + 0.3\\cdot 60 = -28 + 18 = -10$$

Nội suy hoạt động y hệt với giá trị âm — công thức không quan tâm dấu.

**Ví dụ 4 — trọng số phân số, $A = 10, B = 20$, tại $t = \\tfrac{1}{3}$:**

$$p = \\tfrac{2}{3}\\cdot 10 + \\tfrac{1}{3}\\cdot 20 = \\tfrac{20}{3} + \\tfrac{20}{3} = \\tfrac{40}{3} \\approx 13.33$$

Kiểm bằng dạng thứ hai: $p = 10 + \\tfrac{1}{3}(20 - 10) = 10 + 3.33 = 13.33$ ✓ — hai công thức khớp.

### 4.2 Từ tiến độ toàn cục về $t$ của từng đoạn

Với nhiều keyframe, mỗi đoạn có mốc thời gian riêng. Nếu vật đang ở thời điểm thực $\\tau$, nằm giữa keyframe $i$ (thời điểm $t_i$) và $i{+}1$ (thời điểm $t_{i+1}$), thì:

$$t = \\frac{\\tau - t_i}{t_{i+1} - t_i}$$

**Ví dụ số:** đoạn $K_1(0.0\\text{s}) \\to K_2(1.5\\text{s})$, tại $\\tau = 0.375$ s (khung thứ 9 ở mục 3):

$$t = \\frac{0.375 - 0}{1.5 - 0} = 0.25$$

Rồi thế $t = 0.25$ vào Ví dụ 2 → inbetween $(140,\\ 232.5)$. Đây là con số chính xác của "khung thứ 9".

> ⚠ **Lỗi thường gặp.** Nội suy tuyến tính cho chuyển động **cứng, máy móc**: vật chạy đều tăm tắp rồi *đổi hướng đột ngột* ngay tại keyframe (một "góc gãy" trong quỹ đạo và trong vận tốc). Vật thật không đi vậy — chúng tăng tốc/giảm tốc mượt. Khắc phục hướng đi bằng **nội suy mượt** (mục 5); khắc phục tốc độ bằng **easing** ([Lesson 06](../lesson-06-easing-bezier/)).

> 🔁 **Dừng lại tự kiểm tra.**
> 1. Với $A = 200, B = 500$, tính $p(0.4)$.
> 2. Vật đi từ $K_2(1.5\\text{s})$ tới $K_3(3.0\\text{s})$. Tại $\\tau = 2.25$ s, $t$ của đoạn bằng bao nhiêu?
>
> <details><summary>Đáp án</summary>
>
> 1. $p(0.4) = 0.6\\cdot 200 + 0.4\\cdot 500 = 120 + 200 = 320$.
> 2. $t = (2.25 - 1.5)/(3.0 - 1.5) = 0.75/1.5 = 0.5$ — đúng trung điểm đoạn.
> </details>

> 📝 **Tóm tắt mục 4.**
> - Nội suy tuyến tính: $p(t) = (1-t)A + tB = A + t(B-A)$, $t \\in [0,1]$.
> - Là trung bình có trọng số → luôn nằm giữa $A$ và $B$; $t=0 \\Rightarrow A$, $t=1 \\Rightarrow B$.
> - Đưa thời điểm thực về $t$ đoạn: $t = (\\tau - t_i)/(t_{i+1} - t_i)$.
> - Nhược điểm: quỹ đạo có góc gãy tại keyframe, chuyển động cứng.

---

## 5. Nội suy mượt (Smooth / Spline Interpolation)

> 💡 **Trực giác.** Thay sợi dây thẳng bằng một **thanh tre dẻo** luồn qua tất cả các keyframe. Thanh tre không chịu bẻ gập tại điểm neo — nó cong đều đi qua chúng. Kết quả: vật vẫn **đi đúng qua mọi keyframe**, nhưng giữa các keyframe nó lượn theo đường **cong**, và tại keyframe không còn "góc gãy" — hướng đi đổi *từ từ*. Đó là **spline** (đường cong ghép).

Điểm khác nhau then chốt so với tuyến tính:

| | Tuyến tính (linear) | Mượt (spline) |
|---|---|---|
| Đường giữa 2 keyframe | đoạn thẳng | đoạn cong |
| Tại keyframe | góc gãy (hướng đổi đột ngột) | trơn (hướng đổi liên tục) |
| Đi qua keyframe? | có | có |
| Cảm giác | cứng, robot | tự nhiên, sống động |

> ⚠ **Quan trọng — khi nào hai kiểu *trùng nhau*.** Với **đúng 2 keyframe**, spline đi qua 2 điểm cũng chỉ có thể là... đoạn thẳng — nên **tuyến tính và mượt cho cùng một quỹ đạo**. Sự khác biệt chỉ lộ ra khi có **≥ 3 keyframe**: lúc đó tuyến tính tạo góc gãy ở keyframe giữa, còn mượt bo cong qua nó. (Bạn kiểm chứng được điều này trong [visualization](./visualization.html): đặt 2 keyframe → hai đường chồng khít; thêm keyframe thứ 3 → chúng tách ra.)

### 5.1 Một công thức spline cụ thể: Catmull–Rom

Có nhiều họ spline; loại tiện cho animation là **Catmull–Rom** vì nó **đi qua đúng mọi keyframe** (không "trượt" khỏi điểm neo). Trên đoạn giữa keyframe $P_1$ và $P_2$, nó dùng thêm hai keyframe hàng xóm $P_0$ (trước $P_1$) và $P_3$ (sau $P_2$) để quyết định độ cong, với $u \\in [0,1]$:

$$p(u) = \\tfrac{1}{2}\\Big[\\,2P_1 + (-P_0 + P_2)\\,u + (2P_0 - 5P_1 + 4P_2 - P_3)\\,u^2 + (-P_0 + 3P_1 - 3P_2 + P_3)\\,u^3\\,\\Big]$$

Ý tưởng: hướng đi tại $P_1$ được lấy theo $P_0 \\to P_2$ (nhìn "cả trước lẫn sau"), nhờ vậy đường cong không bẻ gãy khi qua $P_1$. Ở hai đầu mút (không có hàng xóm), ta **nhân đôi** điểm đầu/cuối: $P_0 = P_1$ hoặc $P_3 = P_2$.

### 5.2 Ví dụ số: mượt khác tuyến tính chỗ nào

Lấy tọa độ $x$ của 3 keyframe: $P_1 = 80,\\ P_2 = 320,\\ P_3 = 560$. Xét đoạn đầu $P_1 \\to P_2$ (nên $P_0 = P_1 = 80$), tính tại **giữa đoạn** $u = 0.5$:

$$
\\begin{aligned}
2P_1 &= 160 \\\\
(-P_0 + P_2)\\,u &= (-80 + 320)(0.5) = 240 \\cdot 0.5 = 120 \\\\
(2P_0 - 5P_1 + 4P_2 - P_3)\\,u^2 &= (160 - 400 + 1280 - 560)(0.25) = 480 \\cdot 0.25 = 120 \\\\
(-P_0 + 3P_1 - 3P_2 + P_3)\\,u^3 &= (-80 + 240 - 960 + 560)(0.125) = -240 \\cdot 0.125 = -30 \\\\
\\hline
p(0.5) &= \\tfrac{1}{2}\\,(160 + 120 + 120 - 30) = \\tfrac{1}{2}\\cdot 370 = \\mathbf{185}
\\end{aligned}
$$

So với **tuyến tính** cùng vị trí: $\\;p_\\text{lin}(0.5) = 0.5\\cdot 80 + 0.5\\cdot 320 = \\mathbf{200}$.

Chênh lệch $200 - 185 = 15$ px: spline "kéo" điểm giữa lệch khỏi đoạn thẳng để chuẩn bị cho khúc cua tại $P_2$ — đó chính là độ cong. Với **2 keyframe** (bỏ $P_3$, đặt $P_3 = P_2$), bạn tính lại sẽ ra đúng 200 = tuyến tính (bài tập 3).

> ❓ **Câu hỏi tự nhiên của người đọc.**
> - *"Mượt có làm vật lệch khỏi keyframe không?"* → **Không** với Catmull–Rom: tại $u=0$ ra đúng $P_1$, tại $u=1$ ra đúng $P_2$. Chỉ phần *giữa* mới cong. (Có loại spline khác, như B-spline, *không* đi qua điểm — không dùng khi cần chạm mốc chính xác.)
> - *"Mượt = chậm dần/nhanh dần (easing) đúng không?"* → **Không trộn lẫn**. Mượt (bài này) nói về **hình dạng đường đi trong không gian**. Nhanh/chậm theo thời gian là **easing** — [Lesson 06](../lesson-06-easing-bezier/). Một quỹ đạo có thể cong (mượt) mà vẫn chạy đều tốc độ, hoặc thẳng mà vẫn ease.

> 📝 **Tóm tắt mục 5.**
> - Spline = đường cong ghép đi qua các keyframe, không có góc gãy.
> - Catmull–Rom đi **đúng qua** mọi keyframe; hàng xóm quyết định độ cong.
> - 2 keyframe: mượt ≡ tuyến tính (đều là đoạn thẳng). ≥ 3 keyframe mới khác.
> - Mượt nói về *hình dạng đường đi*, khác với easing (*tốc độ theo thời gian*, Lesson 06).

---

## 6. Nối lại với Timing & Spacing (Lesson 01)

> 💡 **Trực giác.** Nếu bạn sinh inbetween tại các mốc thời gian **cách đều** rồi vẽ dấu vết vật (các "bóng mờ"/ghost), thì **khoảng cách giữa các ghost chính là spacing** ([Lesson 01](../../01-Principles/lesson-01-timing-spacing/)). Ghost xa nhau = vật đi nhanh; ghost sát nhau = vật đi chậm.

Với **nội suy tuyến tính + mốc thời gian đều**, trên mỗi đoạn thẳng các ghost cách đều → tốc độ **hằng** trên đoạn đó, nhưng **đổi đột ngột** khi sang đoạn kế (đó là góc gãy vận tốc). Với **nội suy mượt**, spacing biến thiên trơn hơn ở khúc cua — không có cú giật.

**Ví dụ số (spacing của đoạn thẳng, tuyến tính).** Đoạn $K_1(80,280) \\to K_2(320,90)$, chia đều 4 bước ($t = 0, 0.25, 0.5, 0.75, 1$). Độ dài đoạn:

$$L = \\sqrt{(320-80)^2 + (90-280)^2} = \\sqrt{240^2 + 190^2} = \\sqrt{57600 + 36100} = \\sqrt{93700} \\approx 306\\ \\text{px}$$

Mỗi bước tuyến tính là $0.25$ của quãng → spacing đều $\\approx 306/4 \\approx 76.5$ px giữa mỗi cặp ghost. Đều nhau ⇒ tốc độ hằng trên đoạn. (Muốn spacing *dồn nhẹ ở đầu/cuối* cho tự nhiên → dùng easing, Lesson 06.)

> 📝 **Tóm tắt mục 6.**
> - Ghost cách đều thời gian: khoảng cách ghost = spacing = biểu hiện của tốc độ.
> - Tuyến tính + thời gian đều ⇒ tốc độ hằng mỗi đoạn, giật tại keyframe.
> - Muốn tăng/giảm tốc mượt theo thời gian → easing (Lesson 06), khác với nội suy mượt về không gian.

---

## 7. Bài tập

**Bài 1 (nội suy tuyến tính cơ bản).** Cho $A = 50, B = 250$. Tính $p(t)$ tại $t = 0,\\ 0.2,\\ 0.5,\\ 0.9,\\ 1$. Nhận xét tại $t=0$ và $t=1$.

**Bài 2 (2 chiều + thời điểm thực).** Keyframe $K_2 = (320, 90)$ tại $1.5$ s và $K_3 = (560, 280)$ tại $3.0$ s, nội suy tuyến tính. Vật đang ở $\\tau = 2.4$ s. Tìm $t$ của đoạn rồi tính vị trí $(x, y)$.

**Bài 3 (vì sao 2 keyframe thì mượt ≡ tuyến tính).** Dùng công thức Catmull–Rom cho $x$ với chỉ 2 keyframe $P_1 = 80, P_2 = 320$ (nên $P_0 = P_1 = 80$ và $P_3 = P_2 = 320$). Tính $p(0.5)$ và so với tuyến tính. Giải thích kết quả.

**Bài 4 (spacing & tốc độ).** Một đoạn thẳng dài $200$ px, nội suy tuyến tính, sinh ghost tại $t = 0, 0.25, 0.5, 0.75, 1$. Tính khoảng cách giữa hai ghost liên tiếp. Nếu đổi các mốc thành $t = 0, 0.1, 0.3, 0.6, 1$ thì spacing còn đều không, và điều đó nói gì về tốc độ?

---

## 8. Lời giải chi tiết

**Bài 1.** Áp dụng $p(t) = (1-t)\\cdot 50 + t\\cdot 250$:

| $t$ | Tính | $p(t)$ |
|:---:|:---|:---:|
| 0 | $1\\cdot 50 + 0\\cdot 250$ | 50 |
| 0.2 | $0.8\\cdot 50 + 0.2\\cdot 250 = 40 + 50$ | 90 |
| 0.5 | $0.5\\cdot 50 + 0.5\\cdot 250 = 25 + 125$ | 150 |
| 0.9 | $0.1\\cdot 50 + 0.9\\cdot 250 = 5 + 225$ | 230 |
| 1 | $0\\cdot 50 + 1\\cdot 250$ | 250 |

Nhận xét: $t=0 \\Rightarrow p = A = 50$ và $t=1 \\Rightarrow p = B = 250$ — nội suy **luôn chạm đúng hai keyframe đầu/cuối**, không bao giờ trượt.

**Bài 2.** Cách tiếp cận: đưa thời điểm thực về $t$ đoạn, rồi nội suy từng tọa độ.
- $t = \\dfrac{2.4 - 1.5}{3.0 - 1.5} = \\dfrac{0.9}{1.5} = 0.6$.
- $x = 0.4\\cdot 320 + 0.6\\cdot 560 = 128 + 336 = 464$.
- $y = 0.4\\cdot 90 + 0.6\\cdot 280 = 36 + 168 = 204$.
- Vị trí: $(464,\\ 204)$.

**Bài 3.** Với $P_0 = P_1 = 80,\\ P_2 = P_3 = 320$, $u = 0.5$:

$$
\\begin{aligned}
2P_1 &= 160 \\\\
(-P_0 + P_2)\\,u &= (-80 + 320)(0.5) = 120 \\\\
(2P_0 - 5P_1 + 4P_2 - P_3)\\,u^2 &= (160 - 400 + 1280 - 320)(0.25) = 720\\cdot 0.25 = 180 \\\\
(-P_0 + 3P_1 - 3P_2 + P_3)\\,u^3 &= (-80 + 240 - 960 + 320)(0.125) = -480\\cdot 0.125 = -60 \\\\
\\hline
p(0.5) &= \\tfrac{1}{2}(160 + 120 + 180 - 60) = \\tfrac{1}{2}\\cdot 400 = \\mathbf{200}
\\end{aligned}
$$

Tuyến tính: $0.5\\cdot 80 + 0.5\\cdot 320 = 200$. **Bằng nhau.** Giải thích: khi $P_0 = P_1$ và $P_3 = P_2$, không có "hàng xóm ngoài" kéo cong, spline không có lý do để lệch khỏi đoạn thẳng — nên với đúng 2 keyframe, mượt và tuyến tính là một. Chỉ khi có keyframe thứ ba (một $P_3$ thực) thì số hạng bậc 2, 3 mới kéo đường cong ra (so với mục 5.2 ra 185, không phải 200).

**Bài 4.** Cách tiếp cận: spacing = (độ dài đoạn) × (chênh lệch $t$), vì tuyến tính chạy đều theo $t$.
- Mốc đều $t = 0, 0.25, 0.5, 0.75, 1$: mỗi bước $\\Delta t = 0.25$ → spacing $= 200 \\times 0.25 = 50$ px. **Đều nhau** ⇒ tốc độ hằng.
- Mốc $t = 0, 0.1, 0.3, 0.6, 1$: các $\\Delta t = 0.1,\\ 0.2,\\ 0.3,\\ 0.4$ → spacing $= 20,\\ 40,\\ 60,\\ 80$ px. **Tăng dần** ⇒ vật **tăng tốc** (mỗi khoảng thời gian đi được xa hơn). Đây chính là ý tưởng ease-in — sẽ dựng bằng đường cong ở [Lesson 06](../lesson-06-easing-bezier/).

---

## 9. Code & Minh họa

Minh họa tương tác: [visualization.html](./visualization.html) — kéo 2–3 **keyframe** trên sân khấu, chỉnh **thời điểm** trên timeline, bấm **Play** để xem vật tween qua các keyframe (requestAnimationFrame). Bật/tắt **inbetween (ghost)**, gạt công tắc **tuyến tính ↔ mượt** để thấy quỹ đạo đổi từ *góc gãy* sang *cong trơn*, và **scrub** timeline để dừng vật ở bất kỳ thời điểm nào.

---

## Bài tiếp theo

**[Lesson 06 — Easing & Bezier](../lesson-06-easing-bezier/)**: nếu Lesson 05 lo *đường đi trong không gian* (thẳng hay cong), thì Lesson 06 lo *tốc độ theo thời gian* — ease-in / ease-out và đường cong Bezier điều khiển nhịp nhanh/chậm, biến chuyển động máy móc thành sống động.
`;
