# Lesson 07 — Phối cảnh 2 & 3 điểm tụ (Two & Three-point Perspective)

> Cùng một cái hộp: nhìn thẳng vào **mặt** → 1 điểm tụ; nhìn vào **góc** → 2 điểm tụ; ngẩng đầu / cúi xuống nhìn khối cao → thêm điểm tụ thứ 3.

## Mục tiêu học tập

- Phân biệt **phối cảnh 1, 2, 3 điểm tụ (one/two/three-point perspective)** — mỗi loại dùng khi nào.
- Hiểu **điểm tụ (vanishing point, VP)** là gì và vì sao các cạnh song song trong thực tế lại **hội tụ** về một điểm trên tranh.
- Dựng được một khối hộp theo 2 điểm tụ: hai bộ cạnh ngang hội tụ về 2 VP trên **đường chân trời (horizon line)**, cạnh dọc vẫn **thẳng đứng**.
- Dựng khối theo 3 điểm tụ: thêm VP thứ 3 ở **trên** (nhìn lên — worm's eye) hoặc **dưới** (nhìn xuống — bird's eye) → cạnh dọc cũng hội tụ.
- Đọc được toạ độ điểm tụ và tính điểm hội tụ bằng số cụ thể.

## Kiến thức tiền đề

- [Lesson 06 — Phối cảnh 1 điểm tụ](../lesson-06-one-point-perspective/) — điểm tụ, đường chân trời, tầm mắt (eye level). Bài này mở rộng trực tiếp từ đó.
- Hình học cơ bản: đường thẳng, giao điểm, tỉ lệ. Chỉ cần cộng/trừ/nhân và nội suy tuyến tính.

---

## 1. Bức tranh lớn: vì sao có "điểm tụ"?

> 💡 **Trực giác.** Đứng giữa đường ray tàu nhìn ra xa: hai thanh ray **song song ngoài đời thực** nhưng trên ảnh chúng **chụm dần** rồi gặp nhau ở một điểm tít chân trời. Điểm gặp đó là **điểm tụ**. Quy luật gốc của phối cảnh chỉ có một câu: *mọi bộ đường thẳng song song với nhau (và không song song với mặt tranh) đều hội tụ về đúng MỘT điểm tụ.*

Một khối hộp chữ nhật có **ba bộ cạnh** vuông góc nhau: bộ chạy sang trái–phải, bộ chạy trước–sau (theo chiều sâu), bộ chạy lên–xuống. Số điểm tụ ta vẽ = số bộ cạnh **không** song song với mặt tranh:

| Số VP | Bộ cạnh nào hội tụ? | Ta đang nhìn khối thế nào? |
|:---:|---|---|
| **1** | chỉ bộ chiều sâu hội tụ | nhìn thẳng vào **một mặt** (mặt trước song song mặt tranh) |
| **2** | bộ trái–phải **và** bộ trước–sau | nhìn vào một **góc đứng**, mắt ngang tầm |
| **3** | cả ba bộ, kể cả bộ dọc | nhìn vào góc **và** ngẩng lên / cúi xuống |

> ❓ **Câu hỏi tự nhiên.** *"Tại sao có khi vẽ 1 VP, có khi 2, có khi 3 — con số này do đâu?"* → Do **hướng nhìn** so với khối, không phải do khối. Vẫn cái hộp đó: xoay cho một mặt đối diện mắt → 1 VP; xoay cho một cạnh đứng hướng thẳng vào mắt → 2 VP; rồi ngửa/cúi máy ảnh → cạnh đứng cũng nghiêng → 3 VP.

📝 **Tóm tắt mục 1.** Điểm tụ = nơi một bộ cạnh song song "gặp nhau" trên tranh. Số VP = số bộ cạnh của khối bị nghiêng so với mặt tranh (1, 2 hoặc 3).

---

## 2. Ôn nhanh: phối cảnh 1 điểm tụ

> 💡 **Hình dung.** Nhìn thẳng vào **mặt trước** của cái hộp (như nhìn thẳng vào cửa tủ). Mặt trước là một hình chữ nhật **thật** (cạnh ngang nằm ngang, cạnh dọc thẳng đứng). Chỉ có bộ cạnh **chạy vào chiều sâu** là đâm về **một** điểm tụ duy nhất nằm trên đường chân trời.

**Cấu trúc:**
- Mặt trước: hình chữ nhật, cạnh ngang // ngang, cạnh dọc // dọc — **không** hội tụ.
- Mặt sau: bản thu nhỏ của mặt trước (vì ở xa hơn).
- 4 cạnh nối trước–sau: tất cả đâm về **VP** duy nhất.

**Ví dụ số.** Đặt VP tại $(340, 210)$ trên đường chân trời $y = 210$. Góc trên-trái mặt trước tại $TL = (210, 215)$. Góc trên-trái mặt sau nằm ở **giữa đường** từ $TL$ tới VP với hệ số sâu $t = 0.5$:

$$TL_{\text{sau}} = TL + 0.5\,(VP - TL) = (210 + 0.5\cdot 130,\ 215 + 0.5\cdot(-5)) = (275,\ 212.5)$$

Làm tương tự cho 4 góc với **cùng** $t = 0.5$ → mặt sau là bản thu nhỏ, cạnh nối đâm về VP.

⚠ **Lỗi thường gặp (1 điểm).** Cho cạnh **ngang** hoặc **dọc** của mặt trước cũng nghiêng về VP. Sai: ở phối cảnh 1 điểm, mặt trước song song mặt tranh nên các cạnh của nó vẫn thẳng — chỉ **cạnh chiều sâu** hội tụ.

---

## 3. Phối cảnh 2 điểm tụ (Two-point perspective)

> 💡 **Hình dung.** Đứng ở góc phố nhìn vào **góc** một toà nhà: bạn thấy đồng thời **hai mặt tường** chạy xa về hai phía. Bộ gạch của tường trái chụm về một điểm tụ bên **trái**; bộ gạch tường phải chụm về điểm tụ bên **phải**. Cả hai VP nằm trên đường chân trời. Còn các **cạnh đứng** của toà nhà thì vẫn **thẳng đứng** (vì mắt bạn ngang tầm, không ngửa cũng không cúi).

### 3.1 Ba đặc điểm bắt buộc

**(a) Là gì.** Phối cảnh 2 điểm tụ là cách vẽ khối khi ta nhìn vào một **cạnh đứng** (góc) của khối, thấy hai mặt bên cùng lúc.

**(b) Vì sao cần.** Phối cảnh 1 điểm cho cảnh chính diện (hành lang, đường thẳng trước mặt). Nhưng đồ vật/toà nhà nhìn xiên góc thì mặt trước không còn song song mặt tranh → cần 2 VP để cả hai mặt bên đều hội tụ đúng. Đây là loại **hay dùng nhất** để vẽ vật thể, kiến trúc.

**(c) Ba quy tắc:**
1. **Hai VP nằm trên đường chân trời**, cách nhau khá xa (nếu quá gần → khối bị méo "fish-eye").
2. **Cạnh đứng vẫn thẳng đứng**, không hội tụ.
3. Mỗi bộ cạnh ngang hội tụ về **đúng một** VP: bộ mặt trái → VP-trái, bộ mặt phải → VP-phải.

### 3.2 Dựng khối 2 điểm tụ bằng số cụ thể

Đặt: đường chân trời $y = 210$; $VP_L = (90,\ 210)$, $VP_R = (590,\ 210)$. Cạnh đứng trước (góc gần mắt) ở $x = 330$, từ đỉnh $FT = (330,\ 140)$ tới đáy $FB = (330,\ 360)$.

**Bước 1 — kẻ 4 cạnh ngang từ cạnh trước tới 2 VP:** $FT\to VP_L$, $FB\to VP_L$ (mặt trái); $FT\to VP_R$, $FB\to VP_R$ (mặt phải).

**Bước 2 — chọn cạnh đứng xa của mỗi mặt.** Mặt trái: chọn ở $x_L = 220$. Đỉnh $LT$ = điểm trên $FT\to VP_L$ tại $x = 220$. Hệ số $t = \dfrac{220 - 330}{90 - 330} = \dfrac{-110}{-240} = 0.4583$.

$$LT_y = 140 + 0.4583\,(210 - 140) = 140 + 32.08 = 172.08 \Rightarrow LT = (220,\ 172.1)$$

Đáy $LB$ trên $FB\to VP_L$ tại $x = 220$ (cùng $t = 0.4583$):

$$LB_y = 360 + 0.4583\,(210 - 360) = 360 - 68.75 = 291.25 \Rightarrow LB = (220,\ 291.3)$$

Vì $LT$ và $LB$ **cùng** $x = 220$ nên cạnh đứng xa bên trái **thẳng đứng** ✓.

**Bước 3 — cạnh đứng sau (góc xa nhất)** = giao của (cạnh trên mặt trái kéo về $VP_R$) với (cạnh trên mặt phải kéo về $VP_L$). Điều đẹp đẽ: giao điểm đỉnh $BT$ và giao điểm đáy $BB$ luôn **cùng** $x$ → cạnh sau cũng thẳng đứng. Với ví dụ đối xứng ($x_R = 440$), tính ra $BT = BB.x \approx 334.8$ — đứng thẳng.

> 🔁 **Dừng lại tự kiểm tra.**
> 1. Cạnh trước ở $x=330$, $VP_L=(90,210)$, đỉnh trước $FT=(330,140)$. Điểm trên $FT\to VP_L$ tại $x=170$ có tung độ bao nhiêu?
> 2. Trong 2 điểm tụ, cạnh nào **không** bao giờ hội tụ?
>
> <details><summary>Đáp án</summary>
>
> 1. $t = \dfrac{170-330}{90-330} = \dfrac{-160}{-240} = 0.6667$; $y = 140 + 0.6667(210-140) = 140 + 46.67 = 186.7$. Điểm $(170,\ 186.7)$.
> 2. **Cạnh đứng** (bộ dọc) — luôn thẳng đứng vì mắt ngang tầm.
> </details>

⚠ **Lỗi thường gặp (2 điểm).** Đặt 2 VP quá **gần** nhau (cả hai lọt trong khổ giấy) → góc khối nhọn hoắt, méo như ảnh mắt cá. Quy tắc thực hành: đẩy 2 VP ra **ngoài** mép tranh, càng xa càng "hiền".

📝 **Tóm tắt mục 3.** Nhìn vào góc → 2 VP trên chân trời. Cạnh ngang chụm về 2 VP, **cạnh đứng thẳng đứng**. Cạnh sau (góc xa) là giao của các cạnh chéo, vẫn thẳng đứng.

---

## 4. Phối cảnh 3 điểm tụ (Three-point perspective)

> 💡 **Hình dung.** Đứng sát chân một toà nhà chọc trời **ngửa cổ nhìn lên**: ngoài việc hai mặt tường chụm về hai VP hai bên, các **cạnh đứng** của toà nhà cũng **chụm dần lên trời** — như thể có một điểm tụ thứ 3 ở **trên cao**. Ngược lại, nhìn từ máy bay **xuống** một toà nhà thì cạnh đứng chụm xuống **dưới đất** → VP thứ 3 ở dưới.

### 4.1 Thêm điểm tụ thứ ba

**(a) Là gì.** Phối cảnh 3 điểm tụ = 2 điểm tụ (hai bộ cạnh ngang) **cộng** một VP thứ 3 cho **bộ cạnh đứng**. Cạnh đứng không còn thẳng nữa mà nghiêng về $VP_3$.

**(b) Vì sao cần.** Khi camera **ngửa lên** hoặc **cúi xuống** mạnh, bộ cạnh dọc không còn song song mặt tranh → chúng phải hội tụ. Dùng để diễn tả **độ cao/hùng vĩ**: nhà chọc trời, hẻm núi, cảnh nhìn từ trên xuống.

**(c) Hai kiểu:**
- **Worm's eye (mắt sâu, nhìn lên):** $VP_3$ nằm **phía trên** đường chân trời → cạnh đứng chụm lên → cảm giác vật cao vút.
- **Bird's eye (mắt chim, nhìn xuống):** $VP_3$ nằm **phía dưới** → cạnh đứng chụm xuống → cảm giác nhìn từ trên cao.

### 4.2 Dựng khối 3 điểm tụ — "giao điểm" từng cạnh

Ý tưởng: chọn **một góc gần nhất** $N$, rồi từ $N$ kẻ ba cạnh, mỗi cạnh về một VP. Các góc còn lại là **giao điểm** của các cạnh kéo dài.

**Ví dụ số (worm's eye).** $VP_L=(90,210)$, $VP_R=(590,210)$, $VP_3=(345,\ 40)$ (ở **trên**). Góc gần $N=(330,\ 430)$ (thấp, sát người xem). Chọn ba hệ số $a=b=0.33$ (sang trái/phải) và $c=0.34$ (lên trên):

$$A = N + 0.33\,(VP_L - N) = (330 - 79.2,\ 430 - 72.6) = (250.8,\ 357.4)$$
$$B = N + 0.33\,(VP_R - N) = (330 + 85.8,\ 430 - 72.6) = (415.8,\ 357.4)$$
$$C = N + 0.34\,(VP_3 - N) = (330 + 5.1,\ 430 - 132.6) = (335.1,\ 297.4)$$

- $A$ = góc chạy về trái, $B$ = góc chạy về phải, $C$ = góc chạy **lên** (cạnh đứng đã nghiêng về $VP_3$).
- Góc xa của mặt đáy $AB$ = giao của ($A\to VP_R$) và ($B\to VP_L$) $\approx (335.0,\ 320.8)$.
- Đỉnh của cạnh đứng bên trái $AC$ = giao ($A\to VP_3$) và ($C\to VP_L$) $\approx (275.0,\ 276.0)$.
- Góc trên-xa-nhất $ABC \approx (337.0,\ 263.0)$.

**Kiểm chứng hội tụ:** mọi cạnh của khối, kéo dài ra, đều đi qua đúng VP của nó (sai số $< 10^{-12}$ px trong file kiểm tra hình học). Đó chính là điều mô phỏng bên [visualization.html](./visualization.html) làm trực tiếp: kéo VP hay góc $N$, cả 12 cạnh tự cập nhật để luôn chụm đúng.

> ❓ **Câu hỏi tự nhiên.**
> - *"$VP_3$ đặt gần hay xa thì khác gì?"* → $VP_3$ **càng gần** khối → cạnh đứng nghiêng càng gắt → cảm giác cao/sâu càng cực đoan (dễ méo). Đặt **rất xa** → gần như 2 điểm tụ (cạnh đứng gần thẳng).
> - *"Bird's eye thì đổi gì trong công thức?"* → Chỉ đổi vị trí $VP_3$ xuống **dưới** chân trời và chọn $N$ là góc **trên** (gần mắt hơn). Toàn bộ cách tính giao điểm giữ nguyên.

⚠ **Lỗi thường gặp (3 điểm).** Đặt $VP_3$ **quá gần** khối → toà nhà "đổ" như sắp ngã, méo phi thực tế. Với ảnh hiện thực, để $VP_3$ ra thật xa; chỉ kéo gần khi cố ý cường điệu kịch tính.

> 🔁 **Dừng lại tự kiểm tra.**
> 1. Trong worm's eye, $VP_3$ ở trên hay dưới đường chân trời?
> 2. $N=(330,430)$, $VP_3=(345,40)$, hệ số $c=0.34$. Toạ độ $C$ (đỉnh cạnh đứng gần) là?
>
> <details><summary>Đáp án</summary>
>
> 1. Ở **trên** (nhìn lên → cạnh đứng chụm lên trời).
> 2. $C = (330 + 0.34(345-330),\ 430 + 0.34(40-430)) = (330+5.1,\ 430-132.6) = (335.1,\ 297.4)$.
> </details>

📝 **Tóm tắt mục 4.** 3 điểm tụ = 2 VP ngang (trên chân trời) + 1 VP dọc ($VP_3$). $VP_3$ trên → nhìn lên (worm's eye); dưới → nhìn xuống (bird's eye). Cạnh đứng giờ cũng hội tụ.

---

## 5. So sánh 1 vs 2 vs 3 điểm tụ

| Tiêu chí | 1 điểm | 2 điểm | 3 điểm |
|---|---|---|---|
| Số VP | 1 (trên chân trời) | 2 (trên chân trời) | 3 (2 trên chân trời + 1 trên/dưới) |
| Bộ cạnh hội tụ | chiều sâu | trái–phải + trước–sau | cả ba (kể cả dọc) |
| Cạnh đứng | thẳng đứng | thẳng đứng | **nghiêng** về $VP_3$ |
| Nhìn vào | một **mặt** | một **góc** đứng | góc + ngửa/cúi |
| Dùng cho | hành lang, đường ray, phòng nhìn thẳng | hộp/toà nhà nhìn xiên (phổ biến nhất) | nhà chọc trời, cảnh cao/sâu, drone shot |

**Bốn ví dụ đối chiếu (cùng một cái hộp):**

1. **1 điểm** — đặt hộp úp mặt vào bạn: chỉ thấy mặt trước phẳng + đáy/nóc chạy về 1 VP. (Ví dụ: hộp quà nhìn thẳng.)
2. **2 điểm** — xoay hộp 45° cho một cạnh đứng hướng vào mắt: thấy hai mặt bên chụm về 2 VP, cạnh đứng thẳng. (Ví dụ: toà nhà nhìn từ góc phố.)
3. **3 điểm worm's eye** — vẫn góc đó nhưng cúi thấp ngửa nhìn lên: cạnh đứng chụm lên. (Ví dụ: chân toà nhà chọc trời.)
4. **3 điểm bird's eye** — nhìn từ trên xuống: cạnh đứng chụm xuống. (Ví dụ: ảnh flycam khu phố.)

> 💡 **Chốt trực giác.** Chỉ cần hỏi hai câu: *(i) Tôi nhìn vào MẶT hay vào GÓC?* (1 hay 2 VP) và *(ii) Tôi có NGỬA/CÚI mạnh không?* (thêm VP thứ 3 hay không).

---

## 6. Bài tập

**Bài 1 (nhận diện).** Với mỗi cảnh, cho biết nên dùng mấy điểm tụ:
- a) Chụp thẳng một hành lang dài, các cửa hai bên.
- b) Vẽ chiếc tủ lạnh nhìn xiên từ góc bếp, mắt ngang tầm.
- c) Đứng dưới chân tháp Bitexco ngửa nhìn lên đỉnh.
- d) Ảnh flycam nhìn thẳng xuống một dãy container.

**Bài 2 (dựng 2 điểm — tính toạ độ).** Đường chân trời $y=200$. $VP_L=(60,200)$, $VP_R=(600,200)$. Cạnh đứng trước ở $x=320$, đỉnh $FT=(320,120)$, đáy $FB=(320,320)$. Cạnh đứng xa bên trái đặt ở $x_L=200$.
- a) Tính đỉnh $LT$ (điểm trên $FT\to VP_L$ tại $x=200$).
- b) Tính đáy $LB$ (điểm trên $FB\to VP_L$ tại $x=200$).
- c) Cạnh $LT$–$LB$ có thẳng đứng không? Vì sao?

**Bài 3 (dựng 3 điểm).** $VP_L=(90,210)$, $VP_R=(590,210)$, $VP_3=(345,40)$ (worm's eye). Góc gần $N=(330,430)$, hệ số $a=0.33$ (trái), $b=0.33$ (phải), $c=0.34$ (dọc).
- a) Tính $A$ (cạnh trái), $B$ (cạnh phải), $C$ (cạnh đứng gần).
- b) Nếu muốn chuyển sang **bird's eye**, ta di chuyển $VP_3$ đi đâu và chọn lại $N$ thế nào?

**Bài 4 (vận dụng).** Giải thích bằng lời: vì sao khi kéo $VP_3$ ra **rất xa** phía trên, khối 3 điểm tụ trông gần như khối 2 điểm tụ?

---

## 7. Lời giải chi tiết

**Bài 1.**
- a) **1 điểm** — nhìn thẳng vào mặt, chiều sâu chạy về 1 VP giữa hành lang.
- b) **2 điểm** — nhìn vào góc, mắt ngang tầm nên cạnh đứng thẳng.
- c) **3 điểm (worm's eye)** — nhìn góc + ngửa lên, cạnh đứng chụm lên $VP_3$ ở trên.
- d) **3 điểm (bird's eye)** hoặc gần **1 điểm nhìn xuống** tuỳ độ nghiêng; vì cúi thẳng xuống mạnh nên cạnh đứng chụm xuống $VP_3$ ở dưới → **3 điểm bird's eye** là câu trả lời chuẩn khi thấy cả hai mặt bên.

**Bài 2.** Dùng nội suy tuyến tính theo $x$. Hệ số $t = \dfrac{x_L - x_F}{VP_{L,x} - x_F} = \dfrac{200 - 320}{60 - 320} = \dfrac{-120}{-260} = 0.4615$.
- a) $LT_y = 120 + 0.4615\,(200 - 120) = 120 + 36.9 = 156.9$ → $LT = (200,\ 156.9)$.
- b) $LB_y = 320 + 0.4615\,(200 - 320) = 320 - 55.4 = 264.6$ → $LB = (200,\ 264.6)$.
- c) **Có, thẳng đứng.** Vì cả $LT$ và $LB$ đều có cùng hoành độ $x = 200$; hai điểm cùng $x$ nối lại luôn cho đoạn thẳng đứng. Đây chính là quy tắc "cạnh đứng vẫn thẳng đứng" của phối cảnh 2 điểm.

**Bài 3.**
- a) Nội suy $P = N + k\,(VP - N)$:
  - $A = (330 + 0.33(90-330),\ 430 + 0.33(210-430)) = (330 - 79.2,\ 430 - 72.6) = (250.8,\ 357.4)$.
  - $B = (330 + 0.33(590-330),\ 430 + 0.33(210-430)) = (330 + 85.8,\ 430 - 72.6) = (415.8,\ 357.4)$.
  - $C = (330 + 0.34(345-330),\ 430 + 0.34(40-430)) = (330 + 5.1,\ 430 - 132.6) = (335.1,\ 297.4)$.
- b) Chuyển sang **bird's eye**: đưa $VP_3$ xuống **dưới** đường chân trời (ví dụ $VP_3=(340,\ 450)$) và chọn $N$ là góc **trên** gần mắt (ví dụ $N=(330,\ 70)$). Giữ nguyên cách tính giao điểm; cạnh đứng sẽ chụm **xuống** thay vì lên.

**Bài 4.** Cạnh đứng của khối nghiêng đúng bằng hướng từ khối tới $VP_3$. Khi $VP_3$ ở **rất xa** (toạ độ $y$ tiến ra vô cực phía trên), hướng đó tiến dần về phương **thẳng đứng**, nên mọi cạnh dọc gần như song song và thẳng — đúng bằng định nghĩa 2 điểm tụ (VP dọc "ở vô cực"). Nói cách khác: **2 điểm tụ là trường hợp giới hạn của 3 điểm tụ khi $VP_3 \to \infty$.**

> 📝 **Tóm tắt bài học.**
> - Số VP = số bộ cạnh nghiêng so với mặt tranh (1: nhìn mặt · 2: nhìn góc · 3: nhìn góc + ngửa/cúi).
> - 2 điểm tụ: 2 VP trên chân trời, cạnh ngang hội tụ, **cạnh đứng thẳng**; đặt 2 VP xa nhau để tránh méo.
> - 3 điểm tụ: thêm $VP_3$ **trên** (worm's eye) hay **dưới** (bird's eye) → cạnh đứng cũng hội tụ.
> - Kỹ thuật dựng: nội suy điểm trên cạnh về VP, rồi lấy **giao điểm** các cạnh kéo dài cho các góc xa.
> - 2 điểm tụ = giới hạn của 3 điểm tụ khi $VP_3$ ra vô cực.

---

## Bài tiếp theo

**[Lesson 08 — Tỉ lệ & cấu trúc (Proportion & Structure)](../lesson-08-proportion-structure/)**: sau khi dựng được khối trong không gian, bước kế là chia tỉ lệ chuẩn (đầu–thân, module, lưới) để vật/nhân vật đặt vào phối cảnh trông đúng kích thước.

Minh họa tương tác: [visualization.html](./visualization.html) — bật/tắt 1 · 2 · 3 điểm tụ, **kéo điểm tụ** và **kéo góc khối**, xem cả khối hộp dựng lại tức thì với các cạnh luôn hội tụ đúng; đổi $VP_3$ giữa **trên** (nhìn lên) và **dưới** (nhìn xuống).
