// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: GameDev/01-Motion/lesson-05-springs-oscillation/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 05 — Springs & Oscillation (lò xo & dao động)

> **Đây là bài CUỐI của Tier 1 — Motion (Chuyển động).** Sau bài này ta có đủ công cụ
> (tích phân số, lực, lò xo) để bước sang Tier 2 — Collision (va chạm).

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Hiểu **định luật Hooke** ($F = -k \\cdot x$) và vì sao dấu âm khiến lò xo luôn "kéo về" vị trí nghỉ.
- Phân biệt **dao động điều hoà** (không damping → nảy mãi) và biết tính **tần số góc** $\\omega = \\sqrt{k/m}$, **chu kỳ** $T$.
- Hiểu **damping (giảm chấn)** với lực cản $-c \\cdot v$, và 3 chế độ: under-damped (nảy giảm dần), critically damped (về nhanh không nảy), over-damped (về chậm).
- Cài đặt **spring toward target** — kỹ thuật nền cho camera đuổi nhân vật mượt và UI nảy đàn hồi.
- Hiểu lò xo nối 2 vật (preview dây/vải ở [L12](../../02-Collision/lesson-01-aabb-circle/)) và vì sao lò xo cứng cần $\\Delta t$ nhỏ để ổn định.

## Kiến thức tiền đề

- [L03 — Integration (Euler/Verlet)](../lesson-03-integration-euler-verlet/) — lò xo chỉ là một loại lực, ta vẫn dùng tích phân số để cập nhật vị trí/vận tốc mỗi frame.
- [L04 — Forces (gravity, drag, friction)](../lesson-04-forces-gravity-drag-friction/) — lực lò xo cộng vào tổng lực $F = ma$ y như trọng lực, drag.
- [Physics — Oscillation & Waves](../../../Physics/01-Mechanics/lesson-08-oscillation-waves/) — lý thuyết vật lý đầy đủ về dao động điều hoà, tần số, chu kỳ. Bài này là góc nhìn **game/lập trình** của cùng hiện tượng đó.

---

## 1. Vì sao học lò xo? — bài toán mở

> 💡 **Trực giác / Hình dung.** Lò xo không phải chỉ là "cái lò xo trong game vật lý". Nó là
> **một công thức kéo-một-giá-trị-về-mục-tiêu một cách mượt mà.** Bất cứ khi nào bạn thấy thứ gì đó
> "đuổi theo", "trượt tới", "nảy về" — đằng sau gần như luôn là một lò xo.

Bốn câu hỏi rất cụ thể mà bài này trả lời:

1. **Camera mượt.** Nhân vật chạy, camera phải đuổi theo. Nếu camera dán cứng vào nhân vật
   (\`camera.x = player.x\`) thì mỗi cú giật của nhân vật làm cả màn hình giật theo — chóng mặt.
   Làm sao để camera **trễ một nhịp rồi bắt kịp mượt mà**?
2. **UI nảy.** Một panel trượt vào màn hình, dừng lại hơi quá đà rồi nảy ngược về vị trí đúng
   (như iOS, như Material Design). Hiệu ứng "bouncy" đó từ đâu ra?
3. **Dây và vải.** Một sợi dây thừng, một lá cờ bay, áo nhân vật phấp phới — đó là chuỗi
   các điểm nối nhau bằng lò xo. Vì sao?
4. **Kết nối vật.** Hai vật được nối bằng "liên kết đàn hồi" trong physics engine — bánh xe và
   khung xe, hai mắt xích — đều là lò xo có chiều dài nghỉ.

Tất cả 4 thứ trên là **cùng một công thức**. Học một lần, dùng khắp nơi. Ta sẽ "đóng" cả 4 câu hỏi
này trong bài: câu 1-2 ở §5, câu 3-4 ở §6.

> ❓ **Câu hỏi tự nhiên.** "Sao không dùng \`lerp\` (nội suy tuyến tính) cho camera, cho UI? Đơn giản hơn mà?"
> — \`lerp\` (vd \`cam.x += (target.x - cam.x) * 0.1\`) đúng là đơn giản và đôi khi đủ. Nhưng \`lerp\`
> **không có quán tính**: nó luôn giảm tốc đều, không bao giờ vọt qua đích rồi nảy lại. Lò xo có khối
> lượng + vận tốc nên cho cảm giác "vật lý thật", và chỉnh được độ nảy. Ta sẽ so sánh \`lerp\` vs spring
> ở §5.4.

---

## 2. Định luật Hooke — \`F = -k·x\`

### 2.1 Định nghĩa tự đủ

> 💡 **Trực giác.** Kéo lò xo ra xa → nó kéo bạn lại. Nén lò xo vào → nó đẩy bạn ra. Càng kéo/nén
> mạnh, lực phản kháng càng lớn — **tỷ lệ thuận** với độ lệch. Đó là toàn bộ định luật Hooke.

**(a) Là gì.** Lực mà lò xo sinh ra tỷ lệ với độ lệch khỏi vị trí nghỉ, và ngược chiều với độ lệch đó:

$$F = -k \\cdot x$$

- $x$ = **độ lệch (displacement)** khỏi vị trí nghỉ (rest position). $x > 0$: lò xo bị kéo dãn;
  $x < 0$: lò xo bị nén; $x = 0$: lò xo ở vị trí nghỉ, không sinh lực.
- $k$ = **độ cứng (stiffness / spring constant)**, đơn vị N/m. $k$ lớn → lò xo "cứng", phản kháng mạnh.
- **Dấu âm** = lực luôn hướng **ngược** với độ lệch, tức là **kéo về vị trí nghỉ**. Đây là điểm cốt lõi:
  dấu âm chính là thứ tạo ra "dao động" (xem ⚠ bên dưới).

**(b) Vì sao tồn tại / vì sao cần.** Ta đã có $F = ma$ (L04). Hooke nói cho ta **cụ thể lực lò xo bằng bao nhiêu**
ở mỗi vị trí — để cộng vào tổng lực rồi tích phân ra chuyển động. Không có Hooke, ta không biết "lò xo
kéo mạnh thế nào khi lệch 0.3m".

**(c) Ví dụ trực giác bằng số.** Lò xo $k = 200$ N/m, kéo dãn $x = 0.1$ m. Lực kéo về:
$F = -200 \\times 0.1 = -20$ N. Dấu âm: lực hướng về phía $x$ giảm (về vị trí nghỉ). 20 N đủ kéo
một vật nhẹ về rất nhanh.

### 2.2 Walk-through số — bốn ví dụ

Cho lò xo độ cứng $k = 50$ N/m, vị trí nghỉ tại $x = 0$:

| # | Độ lệch $x$ (m) | Tính $F = -k \\cdot x$ | Lực $F$ (N) | Hướng |
|---|---|---|---|---|
| 1 | $+0.20$ (kéo dãn) | $-50 \\times (+0.20)$ | $-10.0$ | về âm (kéo lại) ← |
| 2 | $-0.20$ (nén) | $-50 \\times (-0.20)$ | $+10.0$ | về dương (đẩy ra) → |
| 3 | $+0.04$ (lệch nhỏ) | $-50 \\times (+0.04)$ | $-2.0$ | về nghỉ, yếu |
| 4 | $0$ (đúng nghỉ) | $-50 \\times 0$ | $0$ | không lực |

> Đọc kỹ ví dụ #1 và #2: cùng độ lớn lệch $0.20$ m nhưng **dấu ngược nhau** → lực **dương** hay **âm**
> tuỳ phía lệch, và **luôn trỏ về $x = 0$**. Ví dụ #4: ở đúng vị trí nghỉ lực bằng 0 — nhưng vật vẫn
> có thể đang chuyển động (có vận tốc) nên sẽ vọt qua. Đó là lý do nó dao động.

Thêm 4 ví dụ với độ cứng khác để thấy vai trò của $k$ — cùng độ lệch $x = 0.1$ m:

| $k$ (N/m) | $F = -k \\times 0.1$ | Nhận xét |
|---|---|---|
| $10$ (mềm) | $-1.0$ N | lò xo yếu, kéo về chậm |
| $100$ (vừa) | $-10.0$ N | |
| $500$ (cứng) | $-50.0$ N | kéo về rất gắt |
| $2000$ (rất cứng) | $-200.0$ N | gắt tới mức Euler dễ "nổ" — xem §7 |

> ⚠ **Lỗi thường gặp — quên dấu âm.** Nếu code \`F = k * x\` (thiếu dấu âm) thì lực **đẩy ra xa** vị trí
> nghỉ thay vì kéo về → vật bay ra vô cực ngay frame đầu. Đây là bug "vật biến mất" kinh điển. Luôn
> nhớ: **lò xo kéo về → lực ngược chiều lệch → có dấu âm.**

> 🔁 **Dừng lại tự kiểm tra.** Lò xo $k = 80$ N/m bị **nén** $0.05$ m (tức $x = -0.05$). Lực bằng bao nhiêu, hướng nào?
> <details><summary>Đáp án</summary>
> $F = -80 \\times (-0.05) = +4.0$ N. Dấu dương → lực đẩy về phía $x$ dương, tức **đẩy lò xo dãn trở lại vị trí nghỉ**. Đúng: nén thì lò xo đẩy ra.
> </details>

> 📝 **Tóm tắt mục 2.**
> - Hooke: $F = -k \\cdot x$, với $x$ = độ lệch khỏi vị trí nghỉ.
> - Dấu âm = "luôn kéo về nghỉ" — chính là nguồn gốc dao động.
> - $k$ lớn = lò xo cứng = phản kháng mạnh; $k$ quá lớn nguy hiểm với Euler.
> - Tại $x = 0$ lực = 0, nhưng vật có thể đang có vận tốc nên vẫn vọt qua.

---

## 3. Dao động điều hoà — khi không có damping

### 3.1 Vì sao nó dao động mãi?

> 💡 **Trực giác.** Tưởng tượng đẩy một đứa trẻ trên xích đu rồi buông tay (bỏ qua ma sát, sức cản
> không khí). Nó lên — xuống — lên — xuống... mãi mãi. Vì sao? Tại điểm thấp nhất nó chạy nhanh nhất
> (đầy động năng), vọt qua đáy lên phía kia, đổi động năng thành thế năng, dừng lại trên đỉnh, rồi rơi
> lại. Năng lượng chỉ **chuyển qua chuyển lại**, không mất đi → dao động không bao giờ tắt.

Một vật khối lượng $m$ gắn lò xo $k$, **không có lực cản**, sau khi bị kéo lệch rồi buông ra sẽ dao động
**điều hoà (simple harmonic motion)** — vị trí biến thiên theo hàm cos:

$$x(t) = A \\cos(\\omega t + \\varphi)$$

trong đó $A$ = biên độ (độ lệch lớn nhất), $\\varphi$ = pha ban đầu, và:

### 3.2 Tần số góc và chu kỳ

**Tần số góc (angular frequency):**

$$\\omega = \\sqrt{\\dfrac{k}{m}} \\quad (\\text{rad/s})$$

**Chu kỳ (period)** — thời gian một dao động trọn vẹn:

$$T = \\dfrac{2\\pi}{\\omega} = 2\\pi\\sqrt{\\dfrac{m}{k}} \\quad (\\text{s})$$

**Tần số (frequency)** — số dao động mỗi giây:

$$f = \\dfrac{1}{T} = \\dfrac{\\omega}{2\\pi} \\quad (\\text{Hz})$$

> Quan sát quan trọng: $\\omega$ **chỉ phụ thuộc $k$ và $m$, KHÔNG phụ thuộc biên độ $A$.** Kéo lệch
> nhiều hay ít, nó vẫn dao động cùng nhịp. Đây là tính chất "đồng hồ" của lò xo — vì sao đồng hồ
> quả lắc giữ giờ chính xác.

### 3.3 Walk-through số — bốn ví dụ

| # | $k$ (N/m) | $m$ (kg) | $\\omega = \\sqrt{k/m}$ | $T = 2\\pi/\\omega$ | Ý nghĩa |
|---|---|---|---|---|---|
| 1 | $100$ | $1$ | $\\sqrt{100} = 10.0$ rad/s | $2\\pi/10 \\approx 0.628$ s | nhịp nhanh |
| 2 | $100$ | $4$ | $\\sqrt{25} = 5.0$ rad/s | $2\\pi/5 \\approx 1.257$ s | nặng gấp 4 → chậm gấp 2 |
| 3 | $400$ | $1$ | $\\sqrt{400} = 20.0$ rad/s | $2\\pi/20 \\approx 0.314$ s | cứng gấp 4 → nhanh gấp 2 |
| 4 | $50$ | $2$ | $\\sqrt{25} = 5.0$ rad/s | $2\\pi/5 \\approx 1.257$ s | bằng nhịp #2 (cùng tỷ số $k/m$) |

> Đọc kỹ: ví dụ #2 và #4 có $k/m$ bằng nhau ($100/4 = 50/2 = 25$) → **cùng $\\omega$, cùng chu kỳ**, dù
> $k$ và $m$ khác nhau. Chỉ **tỷ số** $k/m$ quyết định nhịp.
>
> Kiểm tra #1: $\\omega = 10$ → trong $1$ giây vật quét $10$ rad pha $\\approx 10/(2\\pi) \\approx 1.59$ chu kỳ.
> Đúng với $T \\approx 0.628$ s ($1/0.628 \\approx 1.59$). ✓

> ❓ **Câu hỏi tự nhiên.**
> - *"Nặng hơn thì dao động nhanh hay chậm?"* — **chậm hơn**. $m$ ở mẫu trong $\\omega = \\sqrt{k/m}$:
>   $m$ tăng 4 lần → $\\omega$ giảm 2 lần → chu kỳ dài gấp đôi (ví dụ #1 vs #2).
> - *"Cứng hơn thì sao?"* — **nhanh hơn**. $k$ tăng 4 lần → $\\omega$ tăng 2 lần (ví dụ #1 vs #3).
> - *"Tại sao là căn bậc hai, không phải tỷ lệ thẳng?"* — vì lực $\\propto k$ nhưng gia tốc $a = F/m$,
>   và tần số liên hệ với gia tốc qua phương trình vi phân bậc 2 → ra căn. Trực giác đủ là "tăng $k$
>   gấp 4 thì nhanh gấp 2".

> ⚠ **Lỗi thường gặp — quên damping → dao động mãi.** Trong game, lò xo **không** có lực cản sẽ
> nảy không bao giờ dừng (như ví dụ §3 này). UI panel của bạn sẽ rung lắc vĩnh viễn, camera sẽ
> dao động quanh nhân vật không bao giờ ổn định. Trong thực tế **luôn cần thêm damping** (§4). Dao
> động điều hoà thuần tuý chỉ là mô hình lý tưởng để hiểu nhịp cơ bản.

> 🔁 **Dừng lại tự kiểm tra.** Lò xo $k = 90$ N/m, vật $m = 10$ kg. Tính $\\omega$ và $T$.
> <details><summary>Đáp án</summary>
> $\\omega = \\sqrt{90/10} = \\sqrt{9} = 3.0$ rad/s. $T = 2\\pi/3 \\approx 2.094$ s. Mỗi dao động mất ~2.1 giây.
> </details>

> 📝 **Tóm tắt mục 3.**
> - Không damping → dao động điều hoà $x(t) = A\\cos(\\omega t + \\varphi)$, nảy mãi.
> - $\\omega = \\sqrt{k/m}$, $T = 2\\pi/\\omega$, $f = 1/T$.
> - Chỉ tỷ số $k/m$ quyết định nhịp; biên độ không ảnh hưởng tần số.
> - Game luôn cần damping để dao động tắt dần (mục 4).

---

## 4. Damping (giảm chấn) — thêm lực cản \`-c·v\`

### 4.1 Vì sao cần

> 💡 **Trực giác.** Xích đu thật **không** đu mãi — vài chục nhịp là dừng. Vì có ma sát ổ trục + sức
> cản không khí "ăn" dần năng lượng. Trong mô phỏng, ta thêm một **lực cản tỷ lệ vận tốc**: vật chạy
> càng nhanh, lực hãm càng lớn. Đó là damping.

Thêm lực cản (damping force):

$$F_{\\text{damp}} = -c \\cdot v$$

- $v$ = vận tốc; $c$ = **hệ số giảm chấn (damping coefficient)**, $c \\ge 0$.
- Dấu âm = luôn **ngược chiều chuyển động** → hãm lại, lấy bớt năng lượng.

Tổng lực lên vật gắn lò xo + damping:

$$F_{\\text{tổng}} = \\underbrace{-k \\cdot x}_{\\text{lò xo, kéo về}} \\;+\\; \\underbrace{(-c \\cdot v)}_{\\text{cản, hãm}}$$

> **(b) Vì sao tồn tại.** Lực lò xo $-kx$ tự nó **bảo toàn năng lượng** → nảy mãi. Damping là cách
> duy nhất để rút năng lượng ra → cho dao động tắt dần và vật **dừng lại được**. Không có damping thì
> không có "ổn định".

### 4.2 Ba chế độ damping

Mức damping so với một ngưỡng gọi là **damping tới hạn (critical damping)**:

$$c_{\\text{crit}} = 2\\sqrt{k \\cdot m}$$

Đặt **tỷ số giảm chấn** $\\zeta = \\dfrac{c}{c_{\\text{crit}}}$ (đọc là "zeta"):

| Chế độ | Điều kiện | Hành vi | Dùng cho |
|---|---|---|---|
| **Under-damped** (thiếu) | $\\zeta < 1$ ($c < c_{\\text{crit}}$) | nảy qua đích vài lần, biên độ giảm dần | UI nảy, hiệu ứng "bouncy" |
| **Critically damped** (tới hạn) | $\\zeta = 1$ ($c = c_{\\text{crit}}$) | về đích **nhanh nhất** mà **không nảy** | camera mượt, snap mượt |
| **Over-damped** (thừa) | $\\zeta > 1$ ($c > c_{\\text{crit}}$) | về đích chậm, ì ạch, không nảy | chuyển động "nặng nề", giảm sốc |

### 4.3 Walk-through 3 chế độ bằng số thật

Dùng chung lò xo $k = 100$ N/m, vật $m = 1$ kg → $c_{\\text{crit}} = 2\\sqrt{100 \\times 1} = 2 \\times 10 = 20$ N·s/m.
Tất cả bắt đầu ở $x = 1.0$ m, $v = 0$, buông tay.

**Chế độ A — Under-damped, $c = 4$** ($\\zeta = 4/20 = 0.2 < 1$):

Mô phỏng Euler $\\Delta t = 0.02$ s, vài bước đầu ($a = F/m = (-kx - cv)/m$):

| $t$ (s) | $x$ (m) | $v$ (m/s) | $F = -100x - 4v$ | $a$ (m/s²) |
|---|---|---|---|---|
| $0.00$ | $1.000$ | $0.000$ | $-100.0$ | $-100.0$ |
| $0.02$ | $1.000$ | $-2.000$ | $-100.0 + 8.0 = -92.0$ | $-92.0$ |
| $0.04$ | $0.960$ | $-3.840$ | $-96.0 + 15.4 = -80.6$ | $-80.6$ |
| $0.06$ | $0.883$ | $-5.452$ | $-88.3 + 21.8 = -66.5$ | $-66.5$ |

Vật tăng tốc về $x = 0$, **vọt qua** sang $x$ âm, rồi quay lại — nảy nhiều lần, mỗi lần biên độ nhỏ hơn
(vì $-cv$ liên tục lấy bớt năng lượng). Đặc trưng under-damped: **dao động tắt dần**.

**Chế độ B — Critically damped, $c = 20$** ($\\zeta = 20/20 = 1.0$):

| $t$ (s) | $x$ (m) | $v$ (m/s) | $F = -100x - 20v$ | $a$ (m/s²) |
|---|---|---|---|---|
| $0.00$ | $1.000$ | $0.000$ | $-100.0$ | $-100.0$ |
| $0.02$ | $1.000$ | $-2.000$ | $-100.0 + 40.0 = -60.0$ | $-60.0$ |
| $0.04$ | $0.960$ | $-3.200$ | $-96.0 + 64.0 = -32.0$ | $-32.0$ |
| $0.06$ | $0.896$ | $-3.840$ | $-89.6 + 76.8 = -12.8$ | $-12.8$ |

So với chế độ A: ở $t = 0.06$, vận tốc $-3.84$ ở B **nhỏ hơn về độ "đà"** so với cách A đang lao — lực
cản $-20v$ hãm mạnh hơn nhiều ($+76.8$ so với $+21.8$ của A). Vật **chậm dần khi tới gần $x = 0$ và
dừng đúng đó, KHÔNG vọt qua**. Đây là chế độ "về đích nhanh nhất mà không nảy" — chuẩn cho camera.

**Chế độ C — Over-damped, $c = 60$** ($\\zeta = 60/20 = 3.0 > 1$):

| $t$ (s) | $x$ (m) | $v$ (m/s) | $F = -100x - 60v$ | $a$ (m/s²) |
|---|---|---|---|---|
| $0.00$ | $1.000$ | $0.000$ | $-100.0$ | $-100.0$ |
| $0.02$ | $1.000$ | $-2.000$ | $-100.0 + 120.0 = +20.0$ | $+20.0$ |
| $0.04$ | $0.960$ | $-1.600$ | $-96.0 + 96.0 = 0.0$ | $0.0$ |
| $0.06$ | $0.928$ | $-1.600$ | $-92.8 + 96.0 = +3.2$ | $+3.2$ |

So sánh ba chế độ ở $t = 0.06$ s: A đang ở $x = 0.883$ và **lao nhanh** ($v = -5.45$, sẽ vọt qua đích);
B ở $x = 0.896$, chậm lại có kiểm soát ($v = -3.84$); C **bò chậm** ($x = 0.928$, $v$ chỉ $-1.60$ và lực
cản $-60v$ lớn tới mức **kéo gia tốc thành dương** ngay từ bước 2 — vật bị hãm gần như tức thì). C về
đích nhưng **chậm nhất**, không nảy. Đó là "over-damped".

> Chốt khác biệt 3 chế độ bằng một câu: cùng buông từ $x = 1$, **A nảy qua lại rồi tắt**, **B về thẳng
> đích nhanh nhất không nảy**, **C bò về chậm chạp**. Khác nhau chỉ ở giá trị $c$: 4, 20, 60.

> ⚠ **Lỗi thường gặp — chọn nhầm $c$.** $c$ quá nhỏ → UI/camera rung lắc khó chịu (under-damped quá mức).
> $c$ quá lớn → camera lờ đờ, "đuổi" mãi không tới (over-damped). Mẹo thực dụng: muốn camera mượt không
> nảy → nhắm $\\zeta \\approx 1$, tức $c \\approx 2\\sqrt{km}$. Muốn UI hơi nảy vui mắt → $\\zeta \\approx 0.3$–$0.5$.

> 🔁 **Dừng lại tự kiểm tra.** Lò xo $k = 64$ N/m, $m = 1$ kg. Hỏi $c$ bằng bao nhiêu để critically damped?
> <details><summary>Đáp án</summary>
> $c_{\\text{crit}} = 2\\sqrt{k m} = 2\\sqrt{64 \\times 1} = 2 \\times 8 = 16$ N·s/m. Chọn $c = 16$ → về nhanh không nảy. $c < 16$ → nảy; $c > 16$ → ì.
> </details>

> 📝 **Tóm tắt mục 4.**
> - Damping = lực cản $-c \\cdot v$, ngược chiều vận tốc, rút năng lượng → dao động tắt dần.
> - $c_{\\text{crit}} = 2\\sqrt{km}$; tỷ số $\\zeta = c/c_{\\text{crit}}$.
> - $\\zeta < 1$: nảy giảm dần (UI bouncy). $\\zeta = 1$: về nhanh không nảy (camera). $\\zeta > 1$: về chậm (nặng nề).
> - Walk-through số: $c = 4$ nảy, $c = 20$ về thẳng, $c = 60$ bò chậm (cùng $k=100, m=1$).

---

## 5. Spring toward target — camera & UI

### 5.1 Ý tưởng

> 💡 **Trực giác.** Thay vì lò xo gắn vào "vị trí nghỉ cố định", ta gắn lò xo giữa **vật** và một
> **điểm đích di động** (vị trí nhân vật, vị trí UI cần tới). Độ lệch $x$ trở thành **khoảng cách
> vật-tới-đích**. Lò xo liên tục kéo vật về đích; đích di chuyển thì lò xo "đuổi theo" mượt mà.

Độ lệch không còn là "lệch khỏi 0" mà là **(vị trí hiện tại − vị trí đích)**:

$$x = \\text{pos} - \\text{target}$$

Lực lò xo + damping y hệt §4, chỉ thay nghĩa của $x$.

### 5.2 Công thức cập nhật mỗi frame (semi-implicit Euler)

\`\`\`text
mỗi frame (bước thời gian dt):
    displacement = pos - target          # độ lệch khỏi đích
    springForce  = -k * displacement     # Hooke: kéo về đích
    dampForce    = -c * vel              # damping: hãm
    accel        = (springForce + dampForce) / m

    vel += accel * dt                    # cập nhật vận tốc TRƯỚC
    pos += vel   * dt                    # rồi cập nhật vị trí (semi-implicit → ổn định hơn)
\`\`\`

> Vì sao cập nhật \`vel\` trước rồi mới \`pos\`? Đó là **semi-implicit (symplectic) Euler** từ
> [L03](../lesson-03-integration-euler-verlet/) — ổn định hơn explicit Euler nhiều với lực lò xo. Nếu
> đổi thứ tự (pos trước, vel sau = explicit Euler) thì lò xo cứng dễ "nổ" hơn. Chi tiết ở §7.

### 5.3 Code mẫu (Go) — camera đuổi nhân vật

\`\`\`go
// Spring1D: một lò xo 1 chiều kéo "pos" về "target".
type Spring1D struct {
    Pos    float64 // vị trí hiện tại (vd camera.x)
    Vel    float64 // vận tốc hiện tại
    K      float64 // độ cứng — lớn = đuổi gắt
    C      float64 // damping  — đặt 2*sqrt(K*m) để mượt không nảy
    M      float64 // khối lượng (thường = 1)
}

// Update đẩy Pos về target một bước thời gian dt (semi-implicit Euler).
func (s *Spring1D) Update(target, dt float64) {
    disp := s.Pos - target          // độ lệch khỏi đích
    force := -s.K*disp - s.C*s.Vel  // Hooke (-k·x) + damping (-c·v)
    accel := force / s.M

    s.Vel += accel * dt             // vận tốc trước
    s.Pos += s.Vel * dt             // rồi vị trí
}

func main() {
    // k=120, m=1 → c_crit = 2*sqrt(120) ≈ 21.9 → đặt c=21.9 cho mượt không nảy
    cam := &Spring1D{Pos: 0, Vel: 0, K: 120, C: 21.9, M: 1}
    playerX := 100.0 // nhân vật nhảy phắt sang x=100

    dt := 1.0 / 60.0 // 60 FPS
    for frame := 0; frame < 90; frame++ {
        cam.Update(playerX, dt)
        // camera.Pos dần tiến về 100 một cách mượt mà, không giật
    }
}
\`\`\`

> Camera 2 chiều = hai \`Spring1D\` độc lập cho \`x\` và \`y\` (hoặc một phiên bản vector). 3 chiều = ba.
> Hoàn toàn dùng lại lực $F = ma$ và tích phân số đã học ở [L03](../lesson-03-integration-euler-verlet/),
> [L04](../lesson-04-forces-gravity-drag-friction/) — lò xo chỉ là **một loại lực** cộng thêm.

### 5.4 Spring vs Lerp — vì sao lò xo "đã" hơn

| | \`lerp\` (\`pos += (target-pos)*0.1\`) | Spring toward target |
|---|---|---|
| Quán tính | Không — giảm tốc đều, dừng "khô" | Có — vọt qua/nảy được |
| Chỉnh "cảm giác" | Chỉ 1 tham số (tốc độ) | 2 tham số ($k$ độ gắt, $c$ độ nảy) |
| Vọt qua đích (overshoot) | Không bao giờ | Có (nếu under-damped) → cảm giác sống động |
| Ổn định khung hình | Phụ thuộc dt thô | Tốt với semi-implicit |

→ Dùng \`lerp\` khi muốn chuyển động đơn giản, đều. Dùng spring khi muốn cảm giác "vật lý", nảy, đàn hồi.

> ❓ **Câu hỏi tự nhiên — "vậy UI panel nảy làm sao?"** Dùng đúng \`Spring1D\` này nhưng đặt **under-damped**
> ($\\zeta \\approx 0.3$): panel trượt tới vị trí đích, vọt qua một chút, nảy ngược, rồi ổn định — hiệu ứng
> "bouncy" của iOS/Material chính là một lò xo under-damped. Câu hỏi 1 & 2 ở §1 đã được "đóng".

> 🔁 **Dừng lại tự kiểm tra.** Camera $k = 120$, $m = 1$. Muốn mượt không nảy thì đặt $c$ bao nhiêu?
> <details><summary>Đáp án</summary>
> $c = 2\\sqrt{120 \\times 1} = 2 \\times 10.954 \\approx 21.9$. (Đúng giá trị dùng trong code §5.3.) Critically damped → đuổi nhanh nhất không vọt qua.
> </details>

> 📝 **Tóm tắt mục 5.**
> - Spring toward target: $x = \\text{pos} - \\text{target}$, lò xo kéo vật về đích di động.
> - Cập nhật mỗi frame bằng semi-implicit Euler (vel trước, pos sau).
> - Camera mượt = critically damped ($c = 2\\sqrt{km}$); UI nảy = under-damped.
> - 2D/3D = nhiều \`Spring1D\` độc lập. Spring "đã" hơn lerp vì có quán tính + overshoot chỉnh được.

---

## 6. Lò xo nối 2 vật — preview dây & vải

### 6.1 Lò xo có chiều dài nghỉ

Cho đến giờ lò xo kéo vật về một điểm. Bây giờ nối **hai vật** A và B bằng lò xo có **chiều dài nghỉ**
$L_0$ (rest length): lò xo muốn giữ khoảng cách A–B đúng bằng $L_0$.

> 💡 **Trực giác.** Hai vật nối bằng dây chun dài tự nhiên $L_0$. Nếu kéo xa hơn $L_0$ → dây chun kéo
> chúng lại gần. Nếu đẩy gần hơn $L_0$ → đẩy ra xa. Độ lệch giờ là (khoảng cách thực − $L_0$).

Gọi $d$ = khoảng cách hiện tại giữa A và B, $\\hat{u}$ = vector đơn vị từ A tới B. Độ lệch
$x = d - L_0$. Lực lò xo lên A:

$$\\vec{F}_A = +k\\,(d - L_0)\\,\\hat{u} \\qquad \\vec{F}_B = -\\vec{F}_A \\;(\\text{ngược chiều, định luật 3 Newton})$$

**Walk-through số.** $L_0 = 2.0$ m, $k = 50$ N/m. Hai vật cách nhau $d = 2.5$ m → độ lệch
$x = 2.5 - 2.0 = 0.5$ m. Độ lớn lực: $|F| = 50 \\times 0.5 = 25$ N, kéo A về phía B và B về phía A
(co lại về $L_0$). Nếu $d = 1.6$ m → $x = -0.4$ → lực $50 \\times 0.4 = 20$ N **đẩy ra** (giãn về $L_0$).

### 6.2 Chuỗi lò xo = dây & vải

Nối nhiều điểm (particle) thành **chuỗi bằng lò xo** → mô phỏng **dây thừng**. Nối thành **lưới 2D**
→ mô phỏng **vải (cloth)**. Đây chính là câu hỏi 3 (dây/vải) ở §1 — và sẽ được mổ xẻ kỹ ở
**[L12 — AABB & Circle / Collision](../../02-Collision/lesson-01-aabb-circle/)** và các bài constraint
sau đó (chuyển sang Tier 2).

> ❓ **Câu hỏi tự nhiên — "vì sao vải hay dùng constraint thay vì lò xo?"** Lò xo cứng (giữ chiều dài
> gần như cố định) cần $k$ rất lớn → mất ổn định với Euler (§7). Nhiều physics engine thay lò xo cứng
> bằng **constraint cứng** (Verlet + position constraint — đã thấy ở [L03](../lesson-03-integration-euler-verlet/)),
> giải lặp nhiều lần mỗi frame để giữ khoảng cách mà không cần $k$ khổng lồ. Lò xo mềm hơn vẫn dùng lò xo.

> 📝 **Tóm tắt mục 6.**
> - Lò xo nối 2 vật giữ khoảng cách = chiều dài nghỉ $L_0$; độ lệch = $d - L_0$.
> - Lực lên 2 vật ngược chiều (Newton 3).
> - Chuỗi/lưới lò xo = dây/vải — học sâu ở Tier 2.
> - Lò xo cứng hay được thay bằng constraint (Verlet) để ổn định.

---

## 7. Ổn định số — lò xo cứng cần Δt nhỏ

### 7.1 Vì sao lò xo cứng "nổ"

> 💡 **Trực giác.** Mỗi bước Euler ta giả định "lực giữ nguyên suốt cả $\\Delta t$". Nhưng lò xo cứng
> đổi lực **cực nhanh** trong khoảng đó. Nếu $\\Delta t$ quá lớn so với nhịp lò xo, vật "vọt quá tay":
> đáng lẽ kéo về thì lại bị đẩy ra **xa hơn lúc đầu** → frame sau lực còn lớn hơn → vọt còn xa hơn →
> bùng nổ thành vô cực (\`NaN\`).

**Walk-through số — explicit Euler nổ.** Lò xo $k = 2000$, $m = 1$, không damping, $\\Delta t = 0.1$ s,
bắt đầu $x = 1$, $v = 0$ (explicit Euler: pos trước, vel sau):

| bước | $x$ | $v$ | $a = -2000x$ | $x$ mới $= x + v\\Delta t$ | $v$ mới $= v + a\\Delta t$ |
|---|---|---|---|---|---|
| 0 | $1.0$ | $0$ | $-2000$ | $1.0$ | $-200$ |
| 1 | $1.0$ | $-200$ | $-2000$ | $1.0 - 20 = -19$ | $-200 - 200 = ...$ |
| 2 | $-19$ | $-400$ | $+38000$ | $-19 - 40 = -59$ | tăng vọt → $...$ |

Biên độ tăng mỗi bước thay vì giảm → **nổ**. Nguyên nhân kép: $k$ quá lớn + $\\Delta t$ quá lớn so với
chu kỳ ($T = 2\\pi/\\sqrt{2000} \\approx 0.14$ s, mà $\\Delta t = 0.1$ s gần bằng cả chu kỳ → lấy mẫu quá thô).

### 7.2 Cách chữa

| Cách | Làm gì |
|---|---|
| **Giảm $\\Delta t$** | Lấy mẫu dày hơn — vd substep: chia 1 frame thành 4–8 bước nhỏ |
| **Semi-implicit Euler** | Cập nhật \`vel\` trước rồi \`pos\` (§5.2) — ổn định hơn explicit nhiều |
| **Verlet** | (L03) tự nhiên ổn định hơn cho lò xo/constraint |
| **Giới hạn $k$** | Đừng đặt $k$ to vô lý; cần "cứng" tuyệt đối thì dùng constraint (§6.2) |

> ⚠ **Lỗi thường gặp — $k$ quá lớn → nổ với Euler.** Đây là một trong những bug khó chịu nhất với
> người mới: tăng $k$ cho "lò xo gắt hơn" rồi đột nhiên vật biến mất / \`NaN\`. Quy tắc: $k$ càng lớn thì
> $\\Delta t$ phải càng nhỏ. Ràng buộc ổn định xấp xỉ: $\\Delta t < 2/\\omega = 2\\sqrt{m/k}$. Với
> $k = 2000, m = 1$: $\\Delta t < 2/\\sqrt{2000} \\approx 0.045$ s — nên $\\Delta t = 0.1$ s ở trên **vi phạm** → nổ.

> 🔁 **Dừng lại tự kiểm tra.** Lò xo $k = 400$, $m = 1$. Ước lượng $\\Delta t$ tối đa để explicit Euler còn ổn định.
> <details><summary>Đáp án</summary>
> $\\Delta t < 2\\sqrt{m/k} = 2\\sqrt{1/400} = 2 \\times 0.05 = 0.1$ s. Tức ở 60 FPS ($\\Delta t \\approx 0.0167$) thì rất an toàn; nhưng nếu game tụt xuống 8 FPS ($\\Delta t = 0.125$) thì có thể nổ — lý do nên dùng fixed timestep + substep (L01/L03).
> </details>

> 📝 **Tóm tắt mục 7.**
> - Lò xo cứng + $\\Delta t$ lớn → explicit Euler bùng nổ (biên độ tăng, \`NaN\`).
> - Điều kiện ổn định xấp xỉ: $\\Delta t < 2\\sqrt{m/k}$.
> - Chữa: giảm/substep $\\Delta t$, dùng semi-implicit Euler hoặc Verlet, hoặc dùng constraint thay lò xo cứng.

---

## 8. Bài tập

**Bài 1.** Lò xo $k = 150$ N/m. Tính lực lò xo khi: (a) kéo dãn $x = 0.2$ m; (b) nén $x = -0.1$ m;
(c) ở nghỉ $x = 0$; (d) kéo dãn $x = 0.5$ m. Nêu rõ hướng từng trường hợp.

**Bài 2.** Vật $m = 2$ kg gắn lò xo $k = 32$ N/m, không damping. Tính tần số góc $\\omega$, chu kỳ $T$,
tần số $f$. Nếu tăng khối lượng lên $m = 8$ kg thì chu kỳ thay đổi thế nào?

**Bài 3.** Lò xo $k = 100$ N/m, vật $m = 4$ kg. Tính hệ số damping tới hạn $c_{\\text{crit}}$. Với mỗi giá
trị $c = 10$, $c = 40$, $c = 80$, xác định chế độ (under/critical/over-damped).

**Bài 4.** Cho lò xo $k = 100$, $m = 1$, $c = 4$ (under-damped), bắt đầu $x = 1.0$, $v = 0$. Dùng
**semi-implicit Euler** $\\Delta t = 0.02$ tính tay $x$ và $v$ sau 3 bước (vel trước, pos sau). Cho biết
sau 3 bước vật còn ở phía dương hay đã vọt qua $x = 0$ chưa.

**Bài 5.** Camera dùng \`Spring1D\` với $m = 1$. Bạn muốn camera đuổi **mượt không nảy** (critically damped)
và đặt $k = 80$. Hỏi $c$ phải bằng bao nhiêu? Nếu sau đó thấy camera "đuổi quá chậm", nên tăng hay giảm
$k$, và phải chỉnh $c$ lại thế nào để vẫn không nảy?

**Bài 6.** Lò xo nối 2 vật, chiều dài nghỉ $L_0 = 3$ m, $k = 40$ N/m. Tính độ lớn và chiều của lực khi
khoảng cách thực giữa hai vật là (a) $d = 4$ m; (b) $d = 2$ m; (c) $d = 3$ m.

**Bài 7.** Lò xo $k = 900$ N/m, $m = 1$ kg, dùng explicit Euler. Ước lượng bước thời gian $\\Delta t$ tối đa
để mô phỏng còn ổn định. Ở 60 FPS có an toàn không? Ở 10 FPS thì sao?

## Lời giải chi tiết

### Bài 1

$F = -k \\cdot x = -150 x$:

- (a) $x = 0.2$: $F = -150 \\times 0.2 = -30$ N. Dấu âm → kéo về phía $x$ giảm (kéo lại vị trí nghỉ).
- (b) $x = -0.1$: $F = -150 \\times (-0.1) = +15$ N. Dấu dương → đẩy về phía $x$ tăng (đẩy lò xo nén ra lại nghỉ).
- (c) $x = 0$: $F = 0$. Không lực.
- (d) $x = 0.5$: $F = -150 \\times 0.5 = -75$ N. Kéo về, mạnh hơn (a) vì lệch xa hơn.

Quan sát: lực luôn trỏ về $x = 0$, độ lớn tỷ lệ độ lệch.

### Bài 2

$\\omega = \\sqrt{k/m} = \\sqrt{32/2} = \\sqrt{16} = 4.0$ rad/s.
$T = 2\\pi/\\omega = 2\\pi/4 \\approx 1.571$ s.
$f = 1/T = \\omega/(2\\pi) = 4/(2\\pi) \\approx 0.637$ Hz.

Tăng $m$ từ 2 lên 8 (gấp 4 lần): $\\omega' = \\sqrt{32/8} = \\sqrt{4} = 2.0$ rad/s (giảm 2 lần) →
$T' = 2\\pi/2 \\approx 3.14$ s. **Chu kỳ dài gấp đôi.** (Khối lượng gấp 4 → chu kỳ gấp $\\sqrt{4} = 2$ lần.)

### Bài 3

$c_{\\text{crit}} = 2\\sqrt{k m} = 2\\sqrt{100 \\times 4} = 2\\sqrt{400} = 2 \\times 20 = 40$ N·s/m.

- $c = 10$: $\\zeta = 10/40 = 0.25 < 1$ → **under-damped** (nảy giảm dần).
- $c = 40$: $\\zeta = 40/40 = 1.0$ → **critically damped** (về nhanh không nảy).
- $c = 80$: $\\zeta = 80/40 = 2.0 > 1$ → **over-damped** (về chậm, không nảy).

### Bài 4

$k = 100$, $m = 1$, $c = 4$, $\\Delta t = 0.02$. Mỗi bước: $a = (-100x - 4v)/1$; rồi $v \\mathrel{+}= a\\,\\Delta t$;
rồi $x \\mathrel{+}= v\\,\\Delta t$ (semi-implicit — vel trước).

**Bước 1** (từ $x = 1.0$, $v = 0$):
- $a = -100(1.0) - 4(0) = -100$.
- $v = 0 + (-100)(0.02) = -2.0$.
- $x = 1.0 + (-2.0)(0.02) = 1.0 - 0.04 = 0.96$.

**Bước 2** (từ $x = 0.96$, $v = -2.0$):
- $a = -100(0.96) - 4(-2.0) = -96 + 8 = -88$.
- $v = -2.0 + (-88)(0.02) = -2.0 - 1.76 = -3.76$.
- $x = 0.96 + (-3.76)(0.02) = 0.96 - 0.0752 = 0.8848$.

**Bước 3** (từ $x = 0.8848$, $v = -3.76$):
- $a = -100(0.8848) - 4(-3.76) = -88.48 + 15.04 = -73.44$.
- $v = -3.76 + (-73.44)(0.02) = -3.76 - 1.4688 = -5.2288$.
- $x = 0.8848 + (-5.2288)(0.02) = 0.8848 - 0.10458 = 0.78022$.

Sau 3 bước $x \\approx 0.780 > 0$ → vật **vẫn ở phía dương**, chưa vọt qua $x = 0$. Vận tốc đang tăng
độ lớn về phía âm ($-5.23$) → đang lao về đích, sẽ vọt qua ở các bước sau (đặc trưng under-damped).

### Bài 5

Critically damped với $m = 1$, $k = 80$: $c = 2\\sqrt{k m} = 2\\sqrt{80} = 2 \\times 8.944 \\approx 17.9$ N·s/m.

"Đuổi quá chậm" → cần **tăng $k$** (lò xo gắt hơn, $\\omega$ lớn hơn, bám đích nhanh hơn). Nhưng khi đổi $k$,
$c_{\\text{crit}}$ đổi theo: phải đặt lại $c = 2\\sqrt{k m}$ với $k$ mới để giữ critically damped (không nảy).
Ví dụ tăng lên $k = 320$: $c = 2\\sqrt{320} \\approx 35.8$. Nếu **không** chỉnh lại $c$, lò xo sẽ thành
under-damped (vì $c$ cũ giờ nhỏ hơn $c_{\\text{crit}}$ mới) → camera bắt đầu nảy.

### Bài 6

$L_0 = 3$, $k = 40$. Độ lệch $x = d - L_0$, độ lớn lực $|F| = k|x|$:

- (a) $d = 4$: $x = 4 - 3 = +1$ → $|F| = 40 \\times 1 = 40$ N, **kéo hai vật lại gần** (đang dãn quá $L_0$).
- (b) $d = 2$: $x = 2 - 3 = -1$ → $|F| = 40 \\times 1 = 40$ N, **đẩy hai vật ra xa** (đang nén dưới $L_0$).
- (c) $d = 3$: $x = 0$ → $|F| = 0$, không lực (đúng chiều dài nghỉ).

### Bài 7

Điều kiện ổn định xấp xỉ explicit Euler: $\\Delta t < 2\\sqrt{m/k} = 2\\sqrt{1/900} = 2 \\times (1/30) \\approx 0.0667$ s.

- **60 FPS**: $\\Delta t = 1/60 \\approx 0.0167$ s $\\ll 0.0667$ → **an toàn** (dư biên).
- **10 FPS**: $\\Delta t = 1/10 = 0.1$ s $> 0.0667$ → **vi phạm**, mô phỏng có thể nổ.

→ Bài học: lò xo cứng + frame rate tụt = nguy hiểm. Dùng **fixed timestep + substep** (xem
[L01 game loop](../lesson-01-game-loop-timestep/), [L03](../lesson-03-integration-euler-verlet/)) để
$\\Delta t$ vật lý luôn nhỏ và cố định, không phụ thuộc FPS hiển thị.

---

## Kết thúc Tier 1 — Motion

Bạn vừa hoàn thành **Tier 1 — Motion (Chuyển động)** của GameDev:

- [L01 — Game loop & timestep](../lesson-01-game-loop-timestep/) — nhịp cập nhật, fixed timestep.
- [L02 — Vectors & kinematics](../lesson-02-vectors-kinematics/) — vị trí, vận tốc, gia tốc.
- [L03 — Integration (Euler/Verlet)](../lesson-03-integration-euler-verlet/) — biến gia tốc thành chuyển động.
- [L04 — Forces (gravity, drag, friction)](../lesson-04-forces-gravity-drag-friction/) — các loại lực.
- **L05 — Springs & Oscillation** (bài này) — lò xo, dao động, damping, camera/UI mượt.

Lò xo khép lại Tier 1 vì nó **tổng hợp** mọi thứ trước: nó là một **lực** (L04) được **tích phân** (L03)
trong **vòng lặp game** (L01) trên các **vector** (L02). Đồng thời nó mở đường cho Tier 2: spring/constraint
là nền của **camera** (theo dõi vật) và **dây/vải** (chuỗi liên kết) — những thứ sẽ gặp lại khi xử lý
va chạm và ràng buộc.

### Bài tiếp theo — sang Tier 2 (Collision)

👉 **[L06 — AABB & Circle (va chạm)](../../02-Collision/lesson-01-aabb-circle/)** — bắt đầu Tier 2:
phát hiện hai vật chạm nhau (hộp bao AABB, hình tròn), nền cho mọi tương tác vật lý.

### Tham khảo

- Lý thuyết vật lý đầy đủ: [Physics — Oscillation & Waves](../../../Physics/01-Mechanics/lesson-08-oscillation-waves/).
- Minh họa tương tác: [visualization.html](./visualization.html) — kéo-thả khối lò xo, camera follow, đồ thị 3 chế độ damping.
`;
