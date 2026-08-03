# Lesson 06 — Phối cảnh 1 điểm tụ (One-point perspective)

> Một điểm duy nhất trên đường chân trời "hút" mọi đường lùi vào sâu — đó là toàn bộ bí mật khiến một mặt phẳng giấy trông như có chiều sâu thật.

## Mục tiêu học tập

- Định nghĩa được **đường chân trời (horizon line)**, **tầm mắt (eye level)** và **điểm tụ (vanishing point)** — kèm tọa độ cụ thể.
- Phát biểu được **quy luật vàng**: đường nào hội tụ về điểm tụ, đường nào giữ nguyên phương.
- Dựng được một khối hộp / căn phòng nhìn thẳng (hành lang, đường ray) bằng phối cảnh 1 điểm.
- Giải thích *vì sao* vật **cao hơn** tầm mắt và vật **thấp hơn** tầm mắt trông khác nhau — ta thấy đáy hay thấy nóc.

## Kiến thức tiền đề

- [Lesson 05 — Nguyên lý bố cục](../lesson-05-composition-principles/) (nếu đã có): cân bằng, điểm nhấn. Phối cảnh chính là công cụ tạo **chiều sâu** cho bố cục.
- Chỉ cần hình học phổ thông: tọa độ điểm, đường thẳng, tam giác đồng dạng, `arctan`. Không cần vẽ đẹp — cần vẽ *đúng luật*.

Trong bài này ta quy ước hệ tọa độ **màn hình**: gốc ở góc trên-trái, $x$ tăng sang phải, $y$ **tăng xuống dưới** (đúng như canvas/SVG). Vì thế "trên tầm mắt" nghĩa là $y$ **nhỏ hơn** $y$ của đường chân trời, còn "dưới tầm mắt" nghĩa là $y$ **lớn hơn**.

---

## 1. Trực giác: vì sao vật ở xa trông nhỏ đi?

> 💡 **Trực giác.** Đứng giữa đường ray xe lửa nhìn thẳng ra xa: hai thanh ray *thật sự song song*, cách nhau đúng 1,435 m ở mọi điểm. Nhưng mắt bạn thấy chúng **chụm dần** rồi **gặp nhau tại một chấm** ở tít cuối đường. Chấm đó không có thật trên mặt đất — nó là **điểm tụ**, sinh ra bởi cách mắt chiếu thế giới 3D lên "màn hình" 2D là võng mạc.
>
> Lý do: vật càng xa thì **góc nhìn** nó chiếm càng nhỏ. Một người cao 1,7 m đứng cách 2 m chiếm góc nhìn lớn; đứng cách 200 m chỉ còn một vệt. Khi khoảng cách $\to \infty$, góc nhìn $\to 0$ — vật co về **một điểm**. Mọi đường thẳng cùng chạy ra xa vô tận theo cùng một hướng đều co về **cùng một điểm** đó.

Phối cảnh tuyến tính (linear perspective) là bộ quy tắc hình học để tái tạo hiệu ứng này trên giấy: thay vì đo góc nhìn từng vật, ta chỉ cần **một điểm tụ** và vài đường thẳng.

---

## 2. Ba thành phần cốt lõi

### 2.1 Đường chân trời (horizon line) = tầm mắt (eye level)

**(a) Là gì.** Đường ngang tưởng tượng nằm **đúng ngang tầm mắt người quan sát**. Trong tranh, nó là một đường nằm ngang chạy hết chiều rộng khung.

**(b) Vì sao cần.** Nó là "mốc độ cao" của cả cảnh. Mọi phán đoán "vật này ở trên hay dưới tầm mắt tôi" đều đo so với đường này. Nâng/hạ đường chân trời = người xem đứng cao lên (nhìn từ trên xuống) hay cúi thấp xuống (nhìn từ dưới lên).

**(c) Ví dụ số cụ thể** (khung tranh $800 \times 600$):

| Vị trí đường chân trời | Ý nghĩa | Người xem như đang |
|---|---|---|
| $y = 300$ (giữa khung) | tầm mắt trung tính | đứng nhìn thẳng |
| $y = 120$ (gần đỉnh) | tầm mắt cao | đứng trên ban công nhìn xuống — thấy nhiều mặt sàn |
| $y = 480$ (gần đáy) | tầm mắt thấp | ngồi bệt / trẻ con — thấy nhiều trần, vật vươn cao |
| $y = 0$ (mép trên) | "bird's-eye" cực đoan | nhìn thẳng từ trên đầu |

### 2.2 Điểm tụ (vanishing point, VP)

**(a) Là gì.** Điểm mà **mọi đường thẳng song song chạy vuông góc vào mặt tranh** (các đường "lùi vào sâu") hội tụ về. Trong phối cảnh 1 điểm, chỉ có **đúng một** điểm tụ.

**(b) Vì sao cần.** Nó thay thế việc đo góc cho từng cạnh: chỉ cần nối mỗi điểm về VP là được hướng lùi đúng. Vị trí VP theo chiều ngang quyết định ta thấy cảnh lệch trái/phải bao nhiêu.

**(c) Quy tắc bất di bất dịch:** **VP luôn nằm TRÊN đường chân trời.** Vì các cạnh lùi vào là những đường song song với mặt đất; điểm gặp nhau ở vô tận của chúng phải rơi đúng ngang tầm mắt.

Ví dụ số: đường chân trời $y = 300$. Khi đó VP có thể là $(400, 300)$ (giữa), $(250, 300)$ (lệch trái), $(650, 300)$ (lệch phải) — nhưng **không bao giờ** $(400, 260)$ hay $(400, 340)$: sai vì rời khỏi đường chân trời.

### 2.3 Đường lùi / cạnh trực giao (orthogonal)

**(a) Là gì.** Các cạnh của vật chạy **vuông góc với mặt tranh** (đâm thẳng vào chiều sâu). Trên tranh, chúng là các đường **hội tụ về VP**.

**(b) Ví dụ số — góc nghiêng của cạnh lùi.** Cạnh lùi nối một điểm $P=(x_P, y_P)$ về $VP=(x_V, y_V)$. Góc nghiêng của nó so với phương ngang là:

$$\theta = \arctan\!\left(\frac{|y_P - y_V|}{|x_P - x_V|}\right)$$

Với $VP = (400, 300)$:

| Điểm $P$ | $\Delta x$ | $\Delta y$ | Góc $\theta$ | Nhận xét |
|---|---:|---:|---:|---|
| $(250, 150)$ | $150$ | $150$ (lên) | $\arctan 1 = 45{,}0^\circ$ | góc trên-trái, cạnh dốc xuống VP |
| $(200, 500)$ | $200$ | $200$ (xuống→lên VP) | $\arctan 1 = 45{,}0^\circ$ | góc dưới-trái, cạnh dốc lên VP |
| $(200, 500)$ ↔ $VP(500,300)$ | $300$ | $200$ | $\arctan\frac{200}{300} = 33{,}7^\circ$ | VP lệch phải → cạnh thoải hơn |
| $(150, 300)$ | $250$ | $0$ | $0^\circ$ | $P$ ngay trên đường chân trời → cạnh lùi **nằm ngang** |

Dòng cuối rất đáng nhớ: vật nằm **đúng tầm mắt** thì cạnh lùi của nó gần như biến thành một đường ngang mảnh — đó là lý do một tấm bảng treo ngang tầm mắt trông "mỏng dính".

> ⚠ **Lỗi thường gặp.** Đặt điểm tụ *lệch khỏi* đường chân trời (kéo VP lên trời hoặc xuống đất). Kết quả: sàn nhà "vặn xoắn", các cạnh lùi không nhất quán. VP và đường chân trời **dính chặt** vào nhau theo chiều dọc.

---

## 3. Quy luật vàng: đường nào hội tụ, đường nào giữ nguyên

Trong phối cảnh **1 điểm** (khi ta nhìn *thẳng mặt* vào vật, một mặt của vật song song với mặt tranh), chỉ có **ba nhóm đường**:

| Nhóm đường trong thực tế | Trên tranh vẽ thế nào |
|---|---|
| Song song với mặt tranh, nằm **ngang** (mép bàn ngang, viền cửa ngang) | **giữ nguyên nằm ngang** |
| Song song với mặt tranh, **thẳng đứng** (cạnh tường đứng, chân bàn) | **giữ nguyên thẳng đứng** |
| **Vuông góc** với mặt tranh, chạy vào sâu (cạnh lùi, đường ray, hành lang) | **hội tụ về 1 điểm tụ** |

> 💡 **Trực giác.** Chỉ những đường "chạy ra xa khỏi bạn" mới co lại vì chúng có phần ở gần và phần ở xa. Đường nằm ngang/đứng song song mặt tranh thì mọi điểm của nó **cách bạn đều nhau** → không co → giữ phương.

### 3.1 Walk-through bằng số: dựng một khối hộp

Cho khung, đặt **mặt trước** của hộp là hình chữ nhật vẽ đúng thật (nằm trong mặt tranh):

- $A = (250, 150)$ — trên-trái
- $B = (550, 150)$ — trên-phải
- $C = (550, 450)$ — dưới-phải
- $D = (250, 450)$ — dưới-trái

Điểm tụ $VP = (400, 300)$ (tình cờ đúng tâm mặt trước). Chọn **độ sâu** $t = 0{,}6$ (mỗi cạnh lùi đi 60% quãng đường từ góc tới VP). Góc sau tính theo công thức nội suy:

$$P' = P + t\,(VP - P)$$

Tính từng góc sau:

$$\begin{aligned}
A' &= (250,150) + 0{,}6\,\big[(400,300)-(250,150)\big] = (250+90,\ 150+90) = (340, 240)\\
B' &= (550,150) + 0{,}6\,\big[(400,300)-(550,150)\big] = (550-90,\ 150+90) = (460, 240)\\
C' &= (550,450) + 0{,}6\,\big[(400,300)-(550,450)\big] = (550-90,\ 450-90) = (460, 360)\\
D' &= (250,450) + 0{,}6\,\big[(400,300)-(250,450)\big] = (250+90,\ 450-90) = (340, 360)
\end{aligned}$$

**Kiểm tra ba nhóm đường:**

- Mặt sau $A'B'C'D'$: cạnh trên $A'B'$ có $y = 240$ ở cả hai đầu → **vẫn nằm ngang** ✓. Cạnh trái $A'D'$ có $x = 340$ ở cả hai đầu → **vẫn thẳng đứng** ✓.
- Bốn cạnh lùi $AA', BB', CC', DD'$: nối các góc về phía VP. Ví dụ $AA'$ đi từ $(250,150)$ tới $(340,240)$, kéo dài sẽ chạm đúng $VP(400,300)$ ✓.

**Quy luật thu nhỏ đẹp:** cạnh trước $AB$ dài $550-250 = 300$; cạnh sau $A'B'$ dài $460-340 = 120$. Tỉ lệ $120/300 = 0{,}4 = 1 - t$. Nghĩa là:

$$\text{độ dài mặt ở độ sâu } t = (1 - t)\times\text{độ dài mặt trước}$$

Với $t=0{,}6$ → còn 40%. Nếu đẩy sâu hơn $t = 0{,}8$ → còn 20%; $t \to 1$ → co về đúng VP (bằng 0). Đây chính là "vật ở xa nhỏ đi" được lượng hóa.

> ❓ **Câu hỏi tự nhiên của người đọc.**
> - *"Vì sao mặt sau lại đúng tâm ở VP?"* → Vì mặt trước ở đây tình cờ có tâm $(400,300)$ trùng VP. Nếu mặt trước lệch, mặt sau vẫn co lại nhưng **co về phía VP**, không còn cân giữa.
> - *"Cạnh lùi có phải luôn 45°?"* → Không. 45° chỉ xảy ra khi $|\Delta x| = |\Delta y|$ tới VP. Đổi vị trí góc hoặc VP là góc đổi (xem bảng ở 2.3).
> - *"Vẽ hành lang khác vẽ hộp chỗ nào?"* → Không khác về luật, chỉ khác chỗ ta vẽ mặt trong (tường, sàn, trần) thay vì mặt ngoài. Cùng một VP.

> 📝 **Tóm tắt mục 3.**
> - 1 điểm tụ; đường ngang giữ ngang, đường đứng giữ đứng, chỉ **cạnh vuông góc mặt tranh** hội tụ về VP.
> - Góc sau = góc trước $+\ t\,(VP - \text{góc})$.
> - Mặt ở độ sâu $t$ thu nhỏ theo hệ số $(1-t)$.

---

## 4. Đường ray & hành lang: walk-through bằng số

**Đường ray xe lửa.** Hai thanh ray song song, vuông góc mặt tranh → cùng hội tụ về **một** VP. Đặt điểm gần của ray trái $L_0 = (300, 550)$, ray phải $R_0 = (500, 550)$; $VP = (400, 300)$.

Tại độ sâu $t$ (0 = gần nhất, 1 = tại VP), tọa độ ngang hai ray:

$$x_L(t) = 300 + t\,(400 - 300) = 300 + 100t, \qquad x_R(t) = 500 + t\,(400 - 500) = 500 - 100t$$

Khoảng cách hai ray:

$$g(t) = x_R - x_L = 200 - 200t = 200\,(1 - t)$$

| Độ sâu $t$ | $x_L$ | $x_R$ | Khoảng cách $g$ |
|---:|---:|---:|---:|
| $0$ (sát chân) | $300$ | $500$ | $200$ |
| $0{,}25$ | $325$ | $475$ | $150$ |
| $0{,}5$ (giữa) | $350$ | $450$ | $100$ |
| $0{,}75$ | $375$ | $425$ | $50$ |
| $1$ (tại VP) | $400$ | $400$ | $0$ — gặp nhau |

Đúng như mắt thấy: khoảng cách co tuyến tính về 0 tại điểm tụ.

**Hành lang / căn phòng nhìn thẳng.** Bốn góc của "khung cửa" trước nối về VP cho ta bốn đường: đường trên = mép trần, đường dưới = mép sàn, hai đường bên = chân tường. Vì VP nằm trên đường chân trời (giữa chiều cao), trần **hạ xuống** còn sàn **nâng lên** khi đi vào sâu, cả hai tiến về gặp nhau ở tầm mắt — tạo cảm giác hành lang hun hút.

> 🔁 **Dừng lại tự kiểm tra.**
> 1. Ray trái $(280, 560)$, ray phải $(520, 560)$, $VP=(400,300)$. Khoảng cách hai ray tại độ sâu $t=0{,}5$ là bao nhiêu?
> 2. Ở độ sâu nào thì hai ray cách nhau đúng 60 đơn vị?
>
> <details><summary>Đáp án</summary>
>
> 1. $g(0) = 520 - 280 = 240$. Vì co tuyến tính, $g(0{,}5) = 240\,(1-0{,}5) = \mathbf{120}$.
> 2. Giải $240(1-t) = 60 \Rightarrow 1-t = 0{,}25 \Rightarrow t = \mathbf{0{,}75}$.
> </details>

---

## 5. Vật cao hơn / thấp hơn tầm mắt

Cùng một khối hộp, đặt ở độ cao khác nhau so với đường chân trời sẽ **lộ mặt khác nhau**. Lý do thuần hình học: cạnh lùi luôn kéo về VP (nằm trên đường chân trời), nên hướng "lên hay xuống" của cạnh lùi phụ thuộc điểm ở trên hay dưới VP.

Lấy $VP = (400, 300)$ (đường chân trời $y = 300$):

| Vật | Vị trí mặt trước | Cạnh lùi kéo về VP theo hướng | Ta nhìn thấy |
|---|---|---|---|
| Hộp trên sàn (dưới tầm mắt) | mép trên hộp $y = 430 > 300$ | cạnh lùi đi **lên** ($\Delta y < 0$) | **mặt nóc** (nhìn xuống nắp hộp) |
| Đèn treo cao (trên tầm mắt) | mép dưới đèn $y = 170 < 300$ | cạnh lùi đi **xuống** ($\Delta y > 0$) | **mặt đáy** (nhìn lên bụng đèn) |
| Khung tranh treo đúng tầm mắt | $y = 300$ | cạnh lùi **nằm ngang** | gần như **cạnh mỏng** (không thấy nóc/đáy) |
| Cột nhà xuyên tầm mắt | từ $y=120$ tới $y=500$ | phần trên đi xuống, phần dưới đi lên | thấy **cả mặt bên**, đổi hướng tại tầm mắt |

Ví dụ số cho hộp trên sàn: đỉnh-trước-trái $(250, 430) \to VP(400,300)$: $\Delta x = 150,\ \Delta y = -130$ → cạnh nóc dốc **lên** một góc $\arctan(130/150) \approx 40{,}9^\circ$. Vì hai cạnh nóc chụm lên về VP, ta nhìn thấy toàn bộ mặt nóc hộp.

Ví dụ cho đèn treo: đáy-trước-trái $(250, 170) \to VP(400,300)$: $\Delta x = 150,\ \Delta y = +130$ → cạnh đáy dốc **xuống** $\approx 40{,}9^\circ$. Hai cạnh đáy chụm xuống về VP → ta nhìn thấy mặt đáy.

> 💡 **Trực giác.** Đứng ở ga tàu điện: sàn nhà (dưới chân) mở ra như cái quạt hướng lên tầm mắt — ta thấy mặt sàn. Trần nhà (trên đầu) mở ra hướng xuống tầm mắt — ta thấy mặt trần. Càng gần tầm mắt, cả hai càng "mỏng" lại.

> ⚠ **Lỗi thường gặp.** Vẽ mọi hộp giống hệt nhau bất kể độ cao. Sai: một chiếc hộp *dưới* tầm mắt phải lộ nóc, chiếc *trên* tầm mắt phải lộ đáy. Nếu vẽ cùng kiểu, cảnh trông "dẹt", mất chiều sâu.

> 📝 **Tóm tắt mục 5.**
> - Cạnh lùi luôn kéo về VP trên đường chân trời.
> - Dưới tầm mắt → thấy nóc; trên tầm mắt → thấy đáy; đúng tầm mắt → thấy cạnh mỏng.

---

## 6. Bài tập

**Bài 1 (điểm tụ hợp lệ).** Đường chân trời ở $y = 280$. Trong các điểm sau, điểm nào **được phép** làm điểm tụ 1 điểm, điểm nào không? Giải thích.
(a) $(400, 280)$  (b) $(120, 280)$  (c) $(400, 200)$  (d) $(640, 310)$

**Bài 2 (dựng hộp).** Mặt trước hộp: $A=(300,180)$, $B=(600,180)$, $C=(600,420)$, $D=(300,420)$. $VP = (450, 300)$. Độ sâu $t = 0{,}5$. Tính bốn góc sau $A', B', C', D'$ và cho biết cạnh sau $A'B'$ dài bao nhiêu.

**Bài 3 (đường ray).** Ray trái gần $= (350, 560)$, ray phải gần $= (550, 560)$, $VP = (450, 300)$. (a) Viết công thức khoảng cách $g(t)$. (b) Tại độ sâu nào hai ray cách nhau 40 đơn vị?

**Bài 4 (cao/thấp tầm mắt).** Đường chân trời $y = 300$. Một chiếc hộp có mặt trên tại $y = 250$ và mặt dưới tại $y = 380$ (tức hộp *bắc ngang* qua tầm mắt). Người xem sẽ thấy mặt nóc, mặt đáy, hay không rõ? Giải thích bằng vị trí so với tầm mắt.

---

## 7. Lời giải chi tiết

**Bài 1.** Quy tắc: VP **phải nằm trên** đường chân trời, tức $y = 280$.
- (a) $(400,280)$ — **hợp lệ** (đúng $y=280$, nằm giữa).
- (b) $(120,280)$ — **hợp lệ** ($y=280$, chỉ lệch trái; cảnh sẽ nghiêng thấy nhiều mặt phải).
- (c) $(400,200)$ — **không hợp lệ**: $200 \ne 280$, VP rời khỏi đường chân trời → sàn/trần vặn xoắn.
- (d) $(640,310)$ — **không hợp lệ**: $310 \ne 280$.

**Bài 2.** Dùng $P' = P + t\,(VP - P)$ với $t = 0{,}5$, $VP=(450,300)$:

$$\begin{aligned}
A' &= (300,180) + 0{,}5\,[(450,300)-(300,180)] = (300+75,\ 180+60) = (375, 240)\\
B' &= (600,180) + 0{,}5\,[(450,300)-(600,180)] = (600-75,\ 180+60) = (525, 240)\\
C' &= (600,420) + 0{,}5\,[(450,300)-(600,420)] = (600-75,\ 420-60) = (525, 360)\\
D' &= (300,420) + 0{,}5\,[(450,300)-(300,420)] = (300+75,\ 420-60) = (375, 360)
\end{aligned}$$

Cạnh sau $A'B'$ dài $525 - 375 = 150$. Kiểm tra bằng quy luật: mặt trước $AB = 600-300 = 300$; $(1-t)\times 300 = 0{,}5\times 300 = 150$ ✓.

**Bài 3.**
(a) $x_L(t) = 350 + t(450-350) = 350 + 100t$; $x_R(t) = 550 + t(450-550) = 550 - 100t$.
$g(t) = x_R - x_L = 200 - 200t = 200(1-t)$.
(b) $200(1-t) = 40 \Rightarrow 1-t = 0{,}2 \Rightarrow t = \mathbf{0{,}8}$. (Ở 80% quãng đường tới VP, hai ray còn cách 40.)

**Bài 4.** Cách tiếp cận: xét từng mặt so với tầm mắt $y=300$.
- Mặt trên tại $y=250 < 300$ → nằm **trên** tầm mắt → cạnh lùi của nó đi **xuống** về VP → ta thấy **mặt dưới của mặt nóc** (tức nhìn hơi lên).
- Mặt dưới tại $y=380 > 300$ → nằm **dưới** tầm mắt → cạnh lùi đi **lên** về VP → ta thấy **mặt trên của mặt đáy** (nhìn hơi xuống).
- Vì hộp **bắc ngang** tầm mắt (trên tới $250$, dưới tới $380$, kẹp $300$ ở giữa), ta thấy **chủ yếu mặt bên** (cạnh trước và các cạnh bên lùi), gần như **không thấy rõ nóc lẫn đáy** — chúng gần như biến thành cạnh mỏng khi ngang tầm mắt. Đây là lý do vật cao ngang người (tủ, cột) trông "phẳng mặt" nhất.

---

## Bài tiếp theo

**[Lesson 07 — Phối cảnh 2 điểm & 3 điểm](../lesson-07-two-three-point-perspective/)**: khi ta nhìn vật *chếch góc* (không mặt nào song song mặt tranh) → cần **hai** điểm tụ trên đường chân trời; nhìn lên/xuống mạnh → thêm điểm tụ thứ **ba** ở trên trời hoặc dưới đất.

Minh họa tương tác: [visualization.html](./visualization.html) — kéo điểm tụ, đổi độ cao đường chân trời, thêm/bớt khối và xem các cạnh lùi hội tụ theo thời gian thực.
