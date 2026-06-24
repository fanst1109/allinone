// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: GameDev/02-Collision/lesson-02-sat-polygons/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 07 — SAT: Separating Axis Theorem (va chạm đa giác lồi)

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Hiểu **vì sao** AABB và circle (đã học ở [L06](../lesson-01-aabb-circle/)) **không đủ** khi vật thể **xoay** hoặc có hình **đa giác** bất kỳ — và AABB báo va chạm **sai** thế nào.
- Phát biểu và dùng được **Định lý trục tách (Separating Axis Theorem - SAT)**: hai đa giác lồi **không** va chạm ⇔ tồn tại **một** trục mà hình chiếu của chúng **không** chồng nhau.
- **Chiếu (projection)** một đa giác lên một trục bằng **dot product** (liên hệ [Vectors/04 dot product](../../../Vectors/04-LinearAlgebra/lesson-02-dot-product/)) để lấy khoảng $[min, max]$.
- Biết **trục nào cần kiểm tra**: pháp tuyến (normal) của mỗi cạnh của cả hai đa giác.
- Tính **độ chồng (overlap)** và **vector tách tối thiểu (Minimum Translation Vector - MTV)** — hướng + độ lún để đẩy hai vật rời nhau (nền cho collision response ở L09).
- Hiểu giới hạn: SAT chỉ đúng cho **đa giác lồi**; hình lõm phải tách (convex decomposition). Circle trong SAT cần thêm một trục đặc biệt.

## Kiến thức tiền đề

- [L06 — AABB & Circle](../lesson-01-aabb-circle/) — kiểm tra va chạm hộp thẳng trục và hình tròn. Bài này tổng quát hoá lên đa giác xoay bất kỳ. **Nếu chưa rõ vì sao AABB nhanh nhưng hạn chế, đọc L06 trước.**
- [Vectors/04 — Dot product](../../../Vectors/04-LinearAlgebra/lesson-02-dot-product/) — tích vô hướng. **Toàn bộ "chiếu một điểm lên một trục" trong SAT chính là dot product.** Đây là tiền đề quan trọng nhất.
- [Vectors/02 — Rotation matrix](../../../Vectors/02-Trigonometry/lesson-06-rotation-matrix/) — ma trận xoay. Dùng để tạo các đa giác **xoay nghiêng** — chính là trường hợp AABB bó tay.

---

## 1. Vì sao cần SAT? — AABB báo va chạm sai khi vật xoay

> 💡 **Trực giác / Hình dung**
> Hãy hình dung hai chiếc thẻ bài (hình chữ nhật) đặt nghiêng trên mặt bàn, mỗi cái xoay một góc khác nhau. Mắt bạn thấy rõ chúng **không** chạm nhau — có một khe hở giữa chúng. Nhưng nếu bạn vẽ quanh mỗi thẻ một **cái khung chữ nhật thẳng đứng vừa khít** (đó chính là AABB), hai cái khung này lại **đè lên nhau**. Máy tính chỉ nhìn vào khung → kết luận "chạm" — **sai**.

Đặt vấn đề cụ thể (sẽ giải đáp ngay trong §3 và §4):

> *"Cho hai hình chữ nhật, một cái xoay 45°. Mắt thấy chúng có một khe hở rõ ràng, không chạm nhau. Nhưng dùng AABB thì báo 'chạm'. AABB sai ở đâu, và làm sao để máy tính kết luận đúng như mắt người?"*

Trả lời ngắn (chi tiết bên dưới): AABB chỉ so **hình bao thẳng trục**, không phản ánh hình thật khi vật xoay. SAT thay vào đó **chiếu hình thật lên một loạt trục thông minh** (pháp tuyến các cạnh); nếu tìm được **một** trục có khe hở thì khẳng định chắc chắn "không chạm".

### 1.1 AABB sai chính xác ở chỗ nào — ví dụ số

Xét một hình vuông cạnh 2, tâm tại gốc, **xoay 45°**. Bốn đỉnh của nó:

\`\`\`
(√2, 0) ≈ (1.41, 0)      đỉnh phải
(0, √2) ≈ (0, 1.41)      đỉnh trên
(-√2, 0) ≈ (-1.41, 0)    đỉnh trái
(0, -√2) ≈ (0, -1.41)    đỉnh dưới
\`\`\`

AABB (hình bao thẳng trục) của nó: $x \\in [-1.41, 1.41]$, $y \\in [-1.41, 1.41]$ — tức một **hộp $2.83 \\times 2.83$**. Nhưng hình vuông thật chỉ chiếm phần **kim cương** bên trong hộp đó — 4 góc của hộp là **vùng trống**. Diện tích hộp ≈ 8.0, diện tích hình vuông thật = 4.0 → **một nửa hộp là không khí.**

Bây giờ đặt một hình vuông thứ hai (không xoay, cạnh 2) ở góc trên-phải, tâm tại \`(2.2, 2.2)\`:

- **AABB nói gì?** Hộp của hình 1 phủ tới \`(1.41, 1.41)\`; hộp của hình 2 bắt đầu từ \`(1.2, 1.2)\`. Hai hộp **chồng nhau** ở vùng $x \\in [1.2, 1.41]$, $y \\in [1.2, 1.41]$ → AABB báo **"chạm"**.
- **Thực tế?** Đỉnh gần nhất của hình kim cương (hình 1) chỉ tới \`(1.41, 0)\` và \`(0, 1.41)\`; góc trên-phải \`(1.41, 1.41)\` của *hộp* không thuộc hình thật. Hình 2 nằm trong vùng trống ở góc. Hai hình **không** chạm → AABB báo **sai**.

> ❓ **Câu hỏi tự nhiên của người đọc**
> - *"Vậy AABB vô dụng à?"* — Không. AABB **cực nhanh** (chỉ so 4 số) và **không bao giờ báo sót** (nếu hai vật chạm thật thì AABB chắc chắn báo chạm). Nó chỉ thỉnh thoảng báo **thừa** (false positive). Vì thế AABB được dùng làm **broad-phase** (lọc thô) — xem [L08](../lesson-03-broadphase-quadtree/) — rồi mới chạy SAT để xác nhận chính xác.
> - *"SAT có nhanh bằng AABB không?"* — Không, SAT tốn O(số cạnh) phép chiếu. Nên ta lọc bằng AABB trước, chỉ chạy SAT cho các cặp "có vẻ chạm".

> 📝 **Tóm tắt mục 1**
> - AABB so hình bao thẳng trục → khi vật xoay, hộp lớn hơn hình thật nhiều → báo va chạm **thừa**.
> - AABB không báo sót nhưng báo thừa → dùng làm bộ lọc thô (broad-phase).
> - SAT làm việc trên **hình đa giác thật**, kết luận chính xác cho mọi đa giác lồi xoay bất kỳ.

---

## 2. Định lý trục tách (Separating Axis Theorem)

> 💡 **Trực giác / Hình dung — "đèn pin chiếu bóng"**
> Tưởng tượng hai vật thể lơ lửng trong không gian. Bạn cầm một cây đèn pin và rọi từ một hướng nào đó, hai vật in **bóng** (hình chiếu) lên bức tường phía sau. Nếu **có một hướng rọi** mà hai cái bóng **tách rời** (có khe hở giữa chúng) → bạn biết chắc hai vật **không** chạm nhau, vì có cả một "lát cắt phẳng" len được vào giữa. Ngược lại, nếu **mọi hướng rọi** đều cho hai bóng **chồng** nhau → hai vật **chạm** nhau. Cái "hướng rọi tách được hai bóng" gọi là **trục tách (separating axis)**.

### 2.1 Phát biểu chính thức

**Định lý:** Hai đa giác **lồi** A và B **không** giao nhau **khi và chỉ khi** tồn tại **một trục** (một đường thẳng theo hướng nào đó) sao cho **hình chiếu** của A và B lên trục đó **không** chồng lên nhau.

Trục đó gọi là **trục tách**. Nói cách khác, dạng phủ định dùng để khẳng định va chạm:

> Hai đa giác lồi **giao nhau** ⇔ trên **mọi** trục cần kiểm tra, hình chiếu của chúng **đều** chồng nhau.

Đây là một "định lý nếu-và-chỉ-nếu" mạnh: chỉ cần **tìm thấy MỘT** trục tách là đủ để **khẳng định** không chạm (dừng sớm). Nếu **dò hết** mọi trục mà **không** trục nào tách được → khẳng định có chạm.

### 2.2 Vì sao chỉ đúng cho đa giác LỒI?

> ⚠ **Lỗi thường gặp — SAT chỉ đúng cho đa giác lồi**
> Với hình **lõm** (concave), định lý **sai**. Hình lõm có thể có một khe hở **bao quanh** một phần hình kia mà không trục thẳng nào "thấy" được khe đó. Ví dụ chữ "C" và một viên bi nằm trong lòng chữ C: chiếu lên bất kỳ trục nào, hai bóng đều chồng (vì viên bi nằm trong khoảng của chữ C theo mọi hướng), SAT sẽ kết luận "chạm" — nhưng thực tế viên bi nằm gọn trong khe, **không** chạm phần thân chữ C. **Giải pháp:** tách hình lõm thành nhiều hình lồi (convex decomposition) rồi chạy SAT cho từng mảnh — xem §6.

> ❓ **Câu hỏi tự nhiên của người đọc**
> - *"Vì sao lồi thì luôn đúng?"* — Vì với hai tập **lồi** rời nhau, theo định lý tách siêu phẳng (separating hyperplane theorem) luôn tồn tại một đường thẳng tách hẳn hai tập. Pháp tuyến của đường thẳng đó chính là một trục tách. Và ta sẽ thấy ở §4: trục tách (nếu có) **luôn** trùng hướng pháp tuyến của một cạnh nào đó → chỉ cần kiểm tra hữu hạn trục.
> - *"Có vô hạn hướng rọi, kiểm tra sao hết?"* — Không cần. §4 chứng minh chỉ cần kiểm tra các pháp tuyến cạnh — hữu hạn.

> 🔁 **Dừng lại tự kiểm tra**
> Cho hai hình vuông cách xa nhau, một bên trái một bên phải. Trục nào dễ thấy là trục tách nhất?
> <details><summary>Đáp án</summary>
> Trục nằm ngang (hướng x). Chiếu cả hai lên trục x: hình trái cho khoảng $[xL_{min}, xL_{max}]$, hình phải cho $[xR_{min}, xR_{max}]$, và $xL_{max} < xR_{min}$ → có khe hở → trục x là trục tách → khẳng định không chạm. Chỉ một trục là đủ.
> </details>

> 📝 **Tóm tắt mục 2**
> - SAT: hai đa giác lồi **không chạm** ⇔ tồn tại **một** trục tách (hình chiếu không chồng).
> - Tìm thấy **một** trục tách → dừng ngay, kết luận "không chạm". Dò hết không thấy → "chạm".
> - Chỉ đúng cho **lồi**. Lõm phải tách thành nhiều mảnh lồi.

---

## 3. Chiếu (projection) một đa giác lên một trục

> 💡 **Trực giác / Hình dung**
> Chiếu một điểm lên một trục giống như thả một quả bóng từ điểm đó **vuông góc** xuống trục, rồi đo nó rơi xuống **vị trí nào** trên trục. Vị trí đó là một con số (toạ độ 1 chiều dọc theo trục). Chiếu cả một đa giác = chiếu **mọi đỉnh** của nó, rồi đa giác "in bóng" thành một **đoạn** $[min, max]$ trên trục.

### 3.1 Công thức: hình chiếu = dot product

Cho một trục là **vector đơn vị** $\\hat{n} = (n_x, n_y)$ (độ dài 1). Hình chiếu vô hướng của một điểm $P = (p_x, p_y)$ lên trục là **dot product**:

$$\\text{proj}(P) = P \\cdot \\hat{n} = p_x \\cdot n_x + p_y \\cdot n_y$$

(Đây chính xác là dot product đã học ở [Vectors/04](../../../Vectors/04-LinearAlgebra/lesson-02-dot-product/) — dot product của một vector với một vector đơn vị **chính là** độ dài hình chiếu của nó lên hướng đó.)

Hình chiếu của **cả đa giác** lên trục là đoạn:

$$\\big[\\min_i (V_i \\cdot \\hat{n}),\\ \\max_i (V_i \\cdot \\hat{n})\\big]$$

với $V_i$ là các đỉnh.

> ⚠ **Lỗi thường gặp — trục phải được chuẩn hoá (normalize) nếu cần đo độ lún**
> Nếu chỉ cần biết **có chạm hay không**, trục không cần là vector đơn vị — chỉ cần so min/max của cùng một trục cho cả A và B, tỉ lệ scale như nhau nên kết quả "chồng/không chồng" vẫn đúng. **Nhưng** nếu muốn tính **độ lún (overlap) bằng đơn vị thật** (cho MTV ở §5), trục **bắt buộc** phải chuẩn hoá về độ dài 1; nếu không, độ overlap sẽ bị nhân với độ dài trục → MTV sai cả độ lớn lẫn (khi so các trục) cả việc chọn trục nhỏ nhất. Chuẩn hoá: $\\hat{n} = \\dfrac{(n_x, n_y)}{\\sqrt{n_x^2 + n_y^2}}$.

### 3.2 Walk-through: chiếu một đa giác lên một trục — bằng số thật

Cho tam giác $T$ với 3 đỉnh:

\`\`\`
V0 = (1, 1)
V1 = (4, 2)
V2 = (2, 5)
\`\`\`

Chiếu lên trục $\\hat{n} = (1, 0)$ (trục x, đã là đơn vị):

- $V_0 \\cdot \\hat{n} = 1 \\cdot 1 + 1 \\cdot 0 = 1$
- $V_1 \\cdot \\hat{n} = 4 \\cdot 1 + 2 \\cdot 0 = 4$
- $V_2 \\cdot \\hat{n} = 2 \\cdot 1 + 5 \\cdot 0 = 2$

→ min = 1, max = 4 → hình chiếu lên trục x là đoạn **[1, 4]**.

Chiếu cùng tam giác đó lên trục $\\hat{n} = (0, 1)$ (trục y):

- $V_0 \\cdot \\hat{n} = 1 \\cdot 0 + 1 \\cdot 1 = 1$
- $V_1 \\cdot \\hat{n} = 4 \\cdot 0 + 2 \\cdot 1 = 2$
- $V_2 \\cdot \\hat{n} = 2 \\cdot 0 + 5 \\cdot 1 = 5$

→ [1, 5].

Chiếu lên một trục **nghiêng**, ví dụ hướng $(1, 1)$. Trục này chưa chuẩn hoá (độ dài $\\sqrt{2}$), chuẩn hoá thành $\\hat{n} = (\\tfrac{1}{\\sqrt2}, \\tfrac{1}{\\sqrt2}) \\approx (0.707, 0.707)$:

- $V_0 \\cdot \\hat{n} = 1(0.707) + 1(0.707) = 1.414$
- $V_1 \\cdot \\hat{n} = 4(0.707) + 2(0.707) = 4.243$
- $V_2 \\cdot \\hat{n} = 2(0.707) + 5(0.707) = 4.950$

→ [1.414, 4.950].

Một ví dụ thứ tư — trục $\\hat{n} = (-1, 0)$ (hướng x âm): dot product của $V_i$ với $(-1, 0)$ là $-p_x$:

- $V_0$: $-1$, $V_1$: $-4$, $V_2$: $-2$ → min = −4, max = −1 → đoạn **[−4, −1]**.

(Lưu ý: trục $(-1,0)$ cho đoạn là "ảnh phản chiếu" của trục $(1,0)$ — đó là lý do ta chỉ cần xét **một** trong hai hướng ngược nhau của mỗi pháp tuyến; xem §4.3.)

### 3.3 Hai đoạn $[minA, maxA]$ và $[minB, maxB]$ có chồng không?

Hai đoạn 1 chiều chồng nhau ⇔ **không** rời nhau. Chúng **rời** nhau khi $maxA < minB$ (A nằm hẳn bên trái B) **hoặc** $maxB < minA$ (B nằm hẳn bên trái A). Vậy:

\`\`\`
chồng  ⇔  maxA ≥ minB  VÀ  maxB ≥ minA
\`\`\`

Độ **chồng (overlap)** khi có chồng:

$$\\text{overlap} = \\min(maxA, maxB) - \\max(minA, minB)$$

Bốn ví dụ số:

| A | B | maxA≥minB? | maxB≥minA? | Kết luận | overlap |
| --- | --- | :---: | :---: | --- | --- |
| [1, 4] | [6, 9] | 4≥6? Không | — | **rời** (gap = 2) | — |
| [1, 4] | [3, 7] | 4≥3? Có | 7≥1? Có | **chồng** | min(4,7)−max(1,3)=4−3=**1** |
| [0, 5] | [2, 3] | 5≥2 Có | 3≥0 Có | **chồng** (B nằm trong A) | 3−2=**1** |
| [1, 4] | [4, 8] | 4≥4 Có | 8≥1 Có | **chạm biên** | 4−4=**0** |

(Trường hợp overlap = 0 là "vừa khít chạm biên" — tuỳ engine coi là chạm hay không; thường coi là chạm.)

> 🔁 **Dừng lại tự kiểm tra**
> A = [2, 9], B = [10, 12]. Có chồng không? Nếu rời, gap bằng bao nhiêu?
> <details><summary>Đáp án</summary>
> $maxA = 9$, $minB = 10$. $9 \\ge 10$? Không → **rời nhau**. Gap = $minB - maxA = 10 - 9 = 1$. Trục này là một trục tách → kết luận không chạm.
> </details>

> 📝 **Tóm tắt mục 3**
> - Chiếu một điểm lên trục đơn vị = **dot product** $P \\cdot \\hat{n}$.
> - Chiếu đa giác = lấy $[min, max]$ của dot product mọi đỉnh.
> - Hai đoạn chồng ⇔ $maxA \\ge minB$ và $maxB \\ge minA$; overlap = $\\min(maxA,maxB) - \\max(minA,minB)$.
> - Muốn đo độ lún thật → **chuẩn hoá** trục về độ dài 1.

---

## 4. Trục nào cần kiểm tra? — Pháp tuyến của các cạnh

> 💡 **Trực giác / Hình dung**
> Nếu hai đa giác lồi tách rời nhau, đường thẳng "len vào giữa" chúng luôn có thể **trượt** cho tới khi **tì sát vào một cạnh** của một trong hai đa giác. Khi đó hướng tách (trục tách) **vuông góc** với cạnh đó. Vì vậy ta không cần thử vô hạn hướng — chỉ cần thử các hướng **vuông góc với từng cạnh**, tức các **pháp tuyến (normal)** của các cạnh.

### 4.1 Pháp tuyến của một cạnh

Cho cạnh nối hai đỉnh liên tiếp $V_i \\to V_{i+1}$. Vector cạnh là $e = (e_x, e_y) = (V_{i+1} - V_i)$. **Pháp tuyến** (vuông góc với cạnh) là:

$$n = (-e_y,\\ e_x) \\quad \\text{(xoay cạnh 90°)}$$

Kiểm tra vuông góc bằng dot product = 0: $e \\cdot n = e_x(-e_y) + e_y(e_x) = 0$ ✓.

Bốn ví dụ:

| Cạnh $e$ | Pháp tuyến $n=(-e_y,e_x)$ | Kiểm tra $e \\cdot n$ |
| --- | --- | --- |
| $(1, 0)$ | $(0, 1)$ | $1\\cdot0 + 0\\cdot1 = 0$ ✓ |
| $(0, 1)$ | $(-1, 0)$ | $0\\cdot(-1)+1\\cdot0 = 0$ ✓ |
| $(3, 4)$ | $(-4, 3)$ | $3\\cdot(-4)+4\\cdot3 = -12+12 = 0$ ✓ |
| $(2, -2)$ | $(2, 2)$ | $2\\cdot2 + (-2)\\cdot2 = 4-4 = 0$ ✓ |

### 4.2 Gộp trục của cả hai đa giác

Tập trục cần kiểm tra = **pháp tuyến mọi cạnh của A** ∪ **pháp tuyến mọi cạnh của B**. Với hai hình chữ nhật, mỗi hình có 4 cạnh nhưng các cạnh đối song song → chỉ có **2 hướng pháp tuyến phân biệt** mỗi hình → tổng **4 trục** (hoặc 2 nếu hai hình thẳng trục cùng hướng).

> ⚠ **Lỗi thường gặp — kiểm tra thiếu trục (chỉ lấy trục của một hình)**
> Một lỗi kinh điển: chỉ kiểm tra pháp tuyến của A, quên B. Khi đó có thể bỏ sót trục tách nằm theo hướng cạnh của B → báo "chạm" sai. **Phải gộp pháp tuyến của CẢ HAI hình.** Ngoại lệ duy nhất: nếu hai hình là chữ nhật thẳng trục, hướng của chúng trùng nhau nên 2 trục (x, y) là đủ — đó chính là... AABB.

### 4.3 Có cần cả hai hướng ngược nhau của mỗi pháp tuyến không?

Không. Trục $\\hat{n}$ và $-\\hat{n}$ cho cùng kết luận "chồng/không chồng" (chỉ là đoạn $[min,max]$ bị lật dấu và đảo — xem ví dụ 4 ở §3.2). Vì vậy mỗi cặp cạnh song song chỉ đóng góp **một** trục.

### 4.4 Walk-through ĐẦY ĐỦ: hai hình chữ nhật, một cái xoay 45°

**Hình A** (chữ nhật thẳng trục), 4 đỉnh:

\`\`\`
A0 = (0, 0),  A1 = (4, 0),  A2 = (4, 2),  A3 = (0, 2)
\`\`\`

**Hình B** (hình vuông cạnh 2, **xoay 45°**, tâm tại \`(6, 1)\`). Đỉnh kim cương:

\`\`\`
B0 = (7.41, 1),  B1 = (6, 2.41),  B2 = (4.59, 1),  B3 = (6, -0.41)
\`\`\`

(B "chạm vào" A từ bên phải; đỉnh trái nhất của B là \`B2 = (4.59, 1)\`.)

**Bước 1 — Liệt kê trục cần kiểm tra.**

- Cạnh của A: $(4,0)$ và $(0,2)$ → pháp tuyến $(0,4)$ và $(-2,0)$. Chuẩn hoá → **trục a1 = (0,1)**, **trục a2 = (1,0)** (lấy hướng dương).
- Cạnh của B: $B0\\to B1 = (-1.41, 1.41)$ → pháp tuyến $(-1.41, -1.41)$, chuẩn hoá → $(-0.707,-0.707)$, lấy hướng dương **trục b1 = (0.707, 0.707)**. Cạnh $B1\\to B2 = (-1.41,-1.41)$ → pháp tuyến $(1.41,-1.41)$ → chuẩn hoá **trục b2 = (0.707, -0.707)**.

→ 4 trục: **a2=(1,0), a1=(0,1), b1=(0.707,0.707), b2=(0.707,-0.707)**.

**Bước 2 — Chiếu và so trên từng trục.**

**Trục a2 = (1, 0)** (trục x):
- A: x-toạ độ {0, 4, 4, 0} → **[0, 4]**.
- B: x-toạ độ {7.41, 6, 4.59, 6} → **[4.59, 7.41]**.
- So: $maxA = 4$, $minB = 4.59$. $4 \\ge 4.59$? **Không** → **RỜI NHAU** → **đây là TRỤC TÁCH!**

→ Vì đã tìm được một trục tách, kết luận ngay: **A và B KHÔNG chạm**. Gap = $minB - maxA = 4.59 - 4 = 0.59$. (Trong cài đặt thật, ta dừng vòng lặp tại đây — không cần kiểm tra a1, b1, b2.)

**Để minh hoạ trường hợp CÓ chạm**, ta **đẩy B sang trái** cho tâm về \`(4.8, 1)\`. Đỉnh mới:

\`\`\`
B0 = (6.21, 1),  B1 = (4.8, 2.41),  B2 = (3.39, 1),  B3 = (4.8, -0.41)
\`\`\`

Giờ kiểm lại từng trục (đầy đủ, vì lần này không tìm thấy gap):

**Trục a2 = (1, 0):** A = [0, 4]; B x-toạ độ {6.21, 4.8, 3.39, 4.8} → [3.39, 6.21].
- $maxA=4 \\ge minB=3.39$? Có. $maxB=6.21 \\ge minA=0$? Có → **chồng**. overlap = $\\min(4,6.21) - \\max(0,3.39) = 4 - 3.39 = 0.61$.

**Trục a1 = (0, 1):** A y-toạ độ {0,0,2,2} → [0, 2]; B y-toạ độ {1, 2.41, 1, −0.41} → [−0.41, 2.41].
- $maxA=2 \\ge minB=-0.41$? Có. $maxB=2.41 \\ge minA=0$? Có → **chồng**. overlap = $\\min(2,2.41) - \\max(0,-0.41) = 2 - 0 = 2$.

**Trục b1 = (0.707, 0.707):** chiếu = $0.707(x+y)$.
- A đỉnh: A0→0, A1→$0.707 \\cdot 4=2.83$, A2→$0.707 \\cdot 6=4.24$, A3→$0.707 \\cdot 2=1.41$ → [0, 4.24].
- B đỉnh: B0→$0.707 \\cdot 7.21=5.10$, B1→$0.707 \\cdot 7.21=5.10$, B2→$0.707 \\cdot 4.39=3.10$, B3→$0.707 \\cdot 4.39=3.10$ → [3.10, 5.10].
- $maxA=4.24 \\ge minB=3.10$? Có. $maxB=5.10 \\ge minA=0$? Có → **chồng**. overlap = $\\min(4.24,5.10) - \\max(0,3.10) = 4.24 - 3.10 = 1.14$.

**Trục b2 = (0.707, −0.707):** chiếu = $0.707(x-y)$.
- A đỉnh: A0→0, A1→$0.707 \\cdot 4=2.83$, A2→$0.707 \\cdot 2=1.41$, A3→$0.707 \\cdot (-2)=-1.41$ → [−1.41, 2.83].
- B đỉnh: B0→$0.707 \\cdot 5.21=3.68$, B1→$0.707 \\cdot 2.39=1.69$, B2→$0.707 \\cdot 2.39=1.69$, B3→$0.707 \\cdot 5.21=3.68$ → [1.69, 3.68].
- $maxA=2.83 \\ge minB=1.69$? Có. $maxB=3.68 \\ge minA=-1.41$? Có → **chồng**. overlap = $\\min(2.83,3.68) - \\max(-1.41,1.69) = 2.83 - 1.69 = 1.14$.

**Bước 3 — Kết luận.** Cả **4 trục** đều chồng → **A và B CHẠM nhau.** Overlap nhỏ nhất là **0.61** trên trục a2 = (1, 0). (Chuyển sang §5 để biến cặp này thành MTV.)

> 🔁 **Dừng lại tự kiểm tra**
> Ở case "không chạm", vì sao ta dừng ngay sau trục a2 mà không cần kiểm tra 3 trục còn lại?
> <details><summary>Đáp án</summary>
> Vì SAT là định lý "nếu-và-chỉ-nếu". Chỉ cần **một** trục tách (một khe hở) là đủ để **khẳng định chắc chắn** hai hình không giao. Ba trục còn lại có chồng hay không cũng không đổi kết luận. Đây là tối ưu **dừng sớm (early exit)** quan trọng.
> </details>

> 📝 **Tóm tắt mục 4**
> - Trục cần thử = pháp tuyến của mỗi cạnh, **của cả hai hình**: $n = (-e_y, e_x)$.
> - Mỗi cặp cạnh song song chỉ cần **một** trục (không cần cả hướng ngược).
> - Tìm thấy một trục có gap → dừng ngay, "không chạm". Dò hết đều chồng → "chạm".

---

## 5. Overlap & MTV — Minimum Translation Vector

> 💡 **Trực giác / Hình dung**
> Khi hai vật đã lún vào nhau, ta muốn đẩy chúng rời ra với **công ít nhất** — tức dịch một quãng **ngắn nhất** có thể. Trong tất cả các hướng (các trục), hướng có **độ lún nhỏ nhất** chính là "lối thoát gần nhất". Vector đẩy theo hướng đó, dài đúng bằng độ lún, gọi là **Minimum Translation Vector (MTV)** — vector tịnh tiến tối thiểu để hai vật vừa rời nhau.

### 5.1 Định nghĩa MTV

- **(a) Là gì:** MTV là một **vector** $= \\hat{n}_{\\min} \\cdot \\text{overlap}_{\\min}$, trong đó $\\hat{n}_{\\min}$ là **trục đơn vị** có overlap nhỏ nhất, và $\\text{overlap}_{\\min}$ là độ lún trên trục đó. Đẩy một vật đi đúng MTV (hoặc chia đôi cho mỗi vật) → hai vật vừa hết chồng.
- **(b) Vì sao cần:** Phát hiện "có chạm" (boolean) chưa đủ cho game — ta cần biết **đẩy thế nào** để vật không xuyên qua tường. MTV cho cả **hướng** (pháp tuyến mặt va chạm) lẫn **độ sâu xuyên** — đầu vào trực tiếp cho **collision response** ([L09](../lesson-03-broadphase-quadtree/), giải phản lực/đẩy ra).
- **(c) Ví dụ trực giác bằng số:** Ở §4.4 case chạm, các overlap là \`{a2: 0.61, a1: 2.0, b1: 1.14, b2: 1.14}\`. Nhỏ nhất = **0.61** trên trục a2 = (1, 0). → MTV = $(1, 0) \\cdot 0.61 = (0.61, 0)$. Nghĩa là: đẩy B sang phải 0.61 (hoặc A sang trái 0.61, hoặc mỗi bên 0.305) → vừa hết chồng. Trực giác đúng: B lún vào A từ bên phải, lối thoát ngắn nhất là... lùi sang phải.

> ⚠ **Lỗi thường gặp — quên normalize trục → MTV sai**
> Nếu so overlap giữa các trục mà các trục **không** cùng độ dài (chưa chuẩn hoá), bạn đang so các con số ở **đơn vị khác nhau** → chọn nhầm trục "nhỏ nhất", và độ lớn MTV sai. **Bắt buộc** chuẩn hoá **mọi** trục về độ dài 1 *trước khi* so overlap. (Đây là lý do ở §4.4 ta chuẩn hoá b1, b2 thành \`(0.707, 0.707)\` chứ không để \`(1, 1)\`.)

### 5.2 Hướng của MTV — đẩy ra hay đẩy vào?

Vector $\\hat{n}_{\\min}$ có thể chỉ "vào" thay vì "ra". Quy ước: cho MTV chỉ từ A **sang** B. Kiểm tra bằng vector tâm $d = \\text{center}(B) - \\text{center}(A)$; nếu $d \\cdot \\hat{n}_{\\min} < 0$ thì lật dấu $\\hat{n}_{\\min}$.

Ví dụ §4.4: $\\text{center}(A) = (2, 1)$, $\\text{center}(B) = (4.8, 1)$ → $d = (2.8, 0)$. $d \\cdot (1,0) = 2.8 > 0$ → giữ nguyên hướng $(1, 0)$: đẩy B theo $+x$. Đúng (B ở bên phải A).

### 5.3 Walk-through MTV đầy đủ (case chạm ở §4.4)

\`\`\`
overlap theo trục:
  a2 = (1, 0)            → 0.61   ← nhỏ nhất
  a1 = (0, 1)            → 2.0
  b1 = (0.707, 0.707)    → 1.14
  b2 = (0.707, -0.707)   → 1.14

minOverlap = 0.61, trục = (1, 0)
d = center(B) - center(A) = (4.8,1) - (2,1) = (2.8, 0)
d · (1,0) = 2.8 > 0  → hướng đúng, không lật
MTV = (1, 0) × 0.61 = (0.61, 0)
\`\`\`

→ Để tách: dịch B \`+= (0.61, 0)\` (hoặc A \`-= (0.61, 0)\`). Sau khi dịch B sang phải 0.61, chiếu lại lên trục x: B mới $[3.39+0.61, 6.21+0.61] = [4.0, 6.82]$, A vẫn $[0,4]$ → $maxA=4$, $minB=4.0$ → overlap = 0 → vừa khít chạm biên, hết lún. ✓

> 🔁 **Dừng lại tự kiểm tra**
> Nếu overlap các trục là \`{(0,1): 3.0, (1,0): 0.5, (0.6,0.8): 1.2}\`, MTV là vector nào?
> <details><summary>Đáp án</summary>
> Nhỏ nhất = 0.5 trên trục $(1, 0)$. MTV = $(1,0) \\times 0.5 = (0.5, 0)$ (giả sử hướng đã đúng). Đẩy theo trục x, quãng 0.5.
> </details>

> 📝 **Tóm tắt mục 5**
> - MTV = $\\text{trục đơn vị overlap nhỏ nhất} \\times \\text{overlap nhỏ nhất}$.
> - Cho **hướng** (pháp tuyến mặt va chạm) + **độ sâu** → đầu vào cho collision response (L09).
> - **Bắt buộc** chuẩn hoá mọi trục trước khi so overlap, nếu không chọn nhầm trục và sai độ lớn.
> - Lật dấu MTV nếu nó không trỏ từ A sang B (dùng dot với vector tâm).

---

## 6. Giới hạn & mở rộng

### 6.1 Chỉ đúng cho đa giác lồi — tách hình lõm (convex decomposition)

SAT **chỉ** đúng cho đa giác lồi (đã giải thích §2.2). Với hình **lõm**, ta **tách (decompose)** thành nhiều mảnh lồi, rồi kiểm tra va chạm cặp đôi giữa các mảnh.

> 💡 **Trực giác**
> Một chữ "L" lõm → cắt thành **2 hình chữ nhật** lồi. Một ngôi sao 5 cánh → cắt thành tam giác. Hai hình va chạm ⇔ **tồn tại một mảnh của hình 1 chạm một mảnh của hình 2**.

Sơ lược các phương pháp tách: **triangulation** (cắt thành tam giác — luôn được, nhưng nhiều mảnh), **ear clipping**, hoặc thuật toán **Hertel–Mehlhorn** (ít mảnh hơn). Chi tiết vượt phạm vi bài này; điểm cần nhớ: **gặp hình lõm → tách lồi trước khi chạy SAT.**

### 6.2 Circle trong SAT — thêm một trục đặc biệt

Hình tròn có **vô hạn** "cạnh" nên không có hữu hạn pháp tuyến. Khi kiểm tra **đa giác vs circle**, ngoài các pháp tuyến cạnh của đa giác, thêm **một** trục: hướng từ **tâm hình tròn tới đỉnh gần nhất** của đa giác.

> 💡 **Trực giác**
> Hình chiếu của một hình tròn (tâm $C$, bán kính $r$) lên trục đơn vị $\\hat{n}$ luôn là đoạn $[C \\cdot \\hat{n} - r,\\ C \\cdot \\hat{n} + r]$ (tâm chiếu xuống, ± bán kính). Trục "nguy hiểm" nhất — nơi hình tròn có thể chạm góc nhọn của đa giác — là hướng nối tâm tới **đỉnh gần nhất**. Thêm trục đó là đủ để SAT đúng với circle.

Ví dụ số: đa giác có đỉnh gần tâm circle nhất là $V = (3, 4)$, tâm $C = (0, 0)$. Trục thêm = $\\widehat{V - C} = \\widehat{(3,4)} = (3,4)/5 = (0.6, 0.8)$. Chiếu circle bán kính $r=2$ lên trục này: tâm chiếu $C \\cdot (0.6,0.8) = 0$ → đoạn $[-2, 2]$. Chiếu đa giác lên cùng trục → so chồng như bình thường.

> ❓ **Câu hỏi tự nhiên của người đọc**
> - *"Circle vs circle có cần SAT không?"* — Không. Hai hình tròn chạm ⇔ $\\text{khoảng cách hai tâm} \\le r_1 + r_2$ — đã học ở [L06](../lesson-01-aabb-circle/), gọn hơn SAT nhiều. Chỉ dùng SAT khi có ít nhất một đa giác.

> 📝 **Tóm tắt mục 6**
> - SAT chỉ cho lồi → hình lõm phải tách thành mảnh lồi (triangulation / ear clipping / Hertel–Mehlhorn).
> - Đa giác vs circle: thêm trục = hướng tâm circle → đỉnh gần nhất. Hình chiếu circle = $[C \\cdot \\hat{n} - r,\\ C \\cdot \\hat{n} + r]$.
> - Circle vs circle dùng công thức khoảng cách tâm (L06), không cần SAT.

---

## 7. Liên hệ tới các bài khác

- **SAT + MTV → collision response:** Boolean "có chạm" và MTV (hướng + độ sâu) là đầu vào trực tiếp cho việc **giải va chạm** (đẩy vật ra, đảo vận tốc, tính xung lực) — học ở [L09](../lesson-03-broadphase-quadtree/).
- **Chi phí O(số cạnh) → cần broad-phase:** SAT phải chiếu mọi đỉnh lên mọi trục, tốn O(cạnh_A + cạnh_B) **cho mỗi cặp**. Với $N$ vật, kiểm tra mọi cặp là $O(N^2)$ — quá chậm. Vì vậy ta dùng **broad-phase** (AABB + [Quadtree, L08](../lesson-03-broadphase-quadtree/)) lọc bớt cặp "chắc chắn không chạm" trước, chỉ chạy SAT cho số ít cặp còn lại.
- **Dot product & rotation matrix:** Mọi phép chiếu là [dot product](../../../Vectors/04-LinearAlgebra/lesson-02-dot-product/); tạo đa giác xoay dùng [rotation matrix](../../../Vectors/02-Trigonometry/lesson-06-rotation-matrix/).

---

## 8. Bài tập

**Bài 1.** Cho tam giác $T$: $V_0=(0,0)$, $V_1=(6,0)$, $V_2=(3,4)$. Chiếu $T$ lên trục $\\hat{n}=(0,1)$ (trục y) và lên trục $\\hat{n}=(1,0)$ (trục x). Cho khoảng $[min, max]$ trên mỗi trục.

**Bài 2.** Cho cạnh nối $(2,1) \\to (5,3)$. Tính vector cạnh $e$, pháp tuyến $n=(-e_y, e_x)$, rồi **chuẩn hoá** pháp tuyến về độ dài 1.

**Bài 3.** Hai đoạn (hình chiếu trên cùng một trục): $A=[2, 7]$, $B=[5, 10]$. (a) Chúng có chồng không? (b) Nếu chồng, tính overlap. (c) Nếu thay $B=[8, 10]$ thì sao — chồng hay tách, gap bao nhiêu?

**Bài 4.** (Tự tìm trục tách) Hai hình vuông thẳng trục: $A$ với góc \`(0,0)\`–\`(2,2)\`; $B$ với góc \`(3,3)\`–\`(5,5)\`. Liệt kê các trục cần kiểm tra, chiếu cả hai lên từng trục, và chỉ ra **một** trục tách (nếu có). Kết luận chạm/không.

**Bài 5.** (Walk-through SAT có chạm + MTV) Hai hình vuông thẳng trục: $A$ góc \`(0,0)\`–\`(4,4)\`; $B$ góc \`(3,1)\`–\`(7,5)\`. (a) Kiểm tra cả 2 trục (x, y), xác nhận chạm. (b) Tính overlap mỗi trục. (c) Tìm MTV (nhớ kiểm tra hướng bằng vector tâm).

**Bài 6.** (Đa giác xoay vs thẳng trục) $A$ là chữ nhật thẳng trục góc \`(0,0)\`–\`(4,2)\`. $B$ là hình thoi (xoay 45°) với đỉnh \`(5,1)\`, \`(4,2)\`, \`(3,1)\`, \`(4,0)\`. Chiếu lên trục x = \`(1,0)\`. Hai hình chạm hay tách trên trục này? Đây có phải trục tách không?

**Bài 7.** (Circle trong SAT) Một đa giác có đỉnh gần tâm hình tròn nhất là $V=(6,8)$; tâm circle $C=(0,0)$, bán kính $r=3$. (a) Tính trục thêm (đơn vị) cho SAT. (b) Cho hình chiếu của hình tròn lên trục đó.

## Lời giải chi tiết

### Bài 1

Trục y = $(0,1)$: dot với $(0,1)$ lấy **toạ độ y**.
- $V_0 \\cdot (0,1) = 0$; $V_1 \\cdot (0,1) = 0$; $V_2 \\cdot (0,1) = 4$ → **[0, 4]**.

Trục x = $(1,0)$: dot lấy **toạ độ x**.
- $V_0 = 0$; $V_1 = 6$; $V_2 = 3$ → **[0, 6]**.

### Bài 2

- $e = (5-2,\\ 3-1) = (3, 2)$.
- $n = (-e_y, e_x) = (-2, 3)$.
- Độ dài $|n| = \\sqrt{(-2)^2 + 3^2} = \\sqrt{4+9} = \\sqrt{13} \\approx 3.606$.
- Chuẩn hoá: $\\hat{n} = (-2/3.606,\\ 3/3.606) \\approx (-0.555,\\ 0.832)$.
- Kiểm: $|\\hat{n}| = \\sqrt{0.555^2 + 0.832^2} = \\sqrt{0.308+0.692} = \\sqrt{1} = 1$ ✓.

### Bài 3

(a) $A=[2,7]$, $B=[5,10]$: $maxA=7 \\ge minB=5$? Có. $maxB=10 \\ge minA=2$? Có → **chồng**.

(b) overlap = $\\min(maxA,maxB) - \\max(minA,minB) = \\min(7,10) - \\max(2,5) = 7 - 5 = 2$.

(c) $B=[8,10]$: $maxA=7 \\ge minB=8$? **Không** → **tách**. Gap = $minB - maxA = 8 - 7 = 1$. Trục này là trục tách → không chạm.

### Bài 4

$A$: \`(0,0)\`–\`(2,2)\` → đỉnh \`(0,0),(2,0),(2,2),(0,2)\`. $B$: \`(3,3)\`–\`(5,5)\` → đỉnh \`(3,3),(5,3),(5,5),(3,5)\`.

Cả hai thẳng trục cùng hướng → trục cần kiểm tra chỉ **2**: x=\`(1,0)\`, y=\`(0,1)\`.

- **Trục x:** A → [0, 2]; B → [3, 5]. $maxA=2 \\ge minB=3$? **Không** → **RỜI** → **trục tách!** Gap = $3 - 2 = 1$.

Tìm thấy trục tách ngay ở trục x → **kết luận: A và B KHÔNG chạm** (không cần kiểm trục y). (Trục y cũng tách: $A=[0,2]$, $B=[3,5]$, cũng gap 1 — nhưng chỉ cần một trục là đủ.)

### Bài 5

$A$: \`(0,0)\`–\`(4,4)\`; $B$: \`(3,1)\`–\`(7,5)\`. Hai trục x, y.

(a) Kiểm tra:
- **Trục x:** A → [0, 4]; B → [3, 7]. $4 \\ge 3$ Có; $7 \\ge 0$ Có → chồng.
- **Trục y:** A → [0, 4]; B → [1, 5]. $4 \\ge 1$ Có; $5 \\ge 0$ Có → chồng.
- Cả hai chồng → **CHẠM**.

(b) overlap:
- Trục x: $\\min(4,7) - \\max(0,3) = 4 - 3 = 1$.
- Trục y: $\\min(4,5) - \\max(0,1) = 4 - 1 = 3$.

(c) minOverlap = **1** trên trục x = $(1,0)$. Hướng: $\\text{center}(A)=(2,2)$, $\\text{center}(B)=(5,3)$, $d=(3,1)$. $d \\cdot (1,0) = 3 > 0$ → giữ hướng $(1,0)$. **MTV = $(1,0) \\times 1 = (1, 0)$** → đẩy B sang phải 1 đơn vị thì hết chồng ($B$ mới $x=[4,8]$, $A=[0,4]$ → overlap 0). ✓

### Bài 6

$A$ góc \`(0,0)\`–\`(4,2)\` → x-toạ độ {0,4,4,0}, trên trục x = **[0, 4]**.

$B$ đỉnh \`(5,1),(4,2),(3,1),(4,0)\` → x-toạ độ {5,4,3,4}, trên trục x = **[3, 5]**.

So: $maxA=4 \\ge minB=3$? Có. $maxB=5 \\ge minA=0$? Có → **chồng** trên trục x (overlap = $\\min(4,5) - \\max(0,3) = 1$).

→ Trục x **không** phải trục tách (vì chồng). Để kết luận cuối cùng cần kiểm thêm trục y và 2 pháp tuyến của hình thoi; nhưng riêng câu hỏi: trên trục x hai hình **chồng**, nên trục x **không** tách được chúng.

### Bài 7

(a) Trục thêm = hướng đơn vị từ $C=(0,0)$ tới $V=(6,8)$:
- $V - C = (6, 8)$, $|V-C| = \\sqrt{36+64} = \\sqrt{100} = 10$.
- $\\hat{n} = (6/10,\\ 8/10) = (0.6,\\ 0.8)$.

(b) Hình chiếu của hình tròn lên trục $\\hat{n}$ = $[C \\cdot \\hat{n} - r,\\ C \\cdot \\hat{n} + r]$:
- $C \\cdot \\hat{n} = 0(0.6) + 0(0.8) = 0$.
- → đoạn $[0 - 3,\\ 0 + 3] = [-3, 3]$.

(Sau đó chiếu đa giác lên cùng trục \`(0.6,0.8)\` và so chồng như SAT thường — đỉnh $V=(6,8)$ chiếu thành $6(0.6)+8(0.8)=3.6+6.4=10$, là đầu xa của đa giác trên trục này.)

---

## Tham khảo và bài tiếp theo

- Bài trước: [L06 — AABB & Circle](../lesson-01-aabb-circle/) — kiểm tra va chạm cơ bản, broad-phase nguyên thuỷ.
- **Bài tiếp theo: [L08 — Broad-phase & Quadtree](../lesson-03-broadphase-quadtree/)** — vì SAT tốn O(cạnh)/cặp và $O(N^2)$ cặp, cần lọc thô bằng AABB + Quadtree trước.
- Tiền đề toán: [Vectors/04 — Dot product](../../../Vectors/04-LinearAlgebra/lesson-02-dot-product/), [Vectors/02 — Rotation matrix](../../../Vectors/02-Trigonometry/lesson-06-rotation-matrix/).
- Minh hoạ tương tác: [visualization.html](./visualization.html) — kéo/xoay hai đa giác lồi, xem các trục pháp tuyến + hình chiếu, trục tách được tô màu, báo chạm/không + MTV; demo "AABB sai vs SAT đúng" khi vật xoay; và mô phỏng đa giác bay va chạm bằng SAT.
`;
